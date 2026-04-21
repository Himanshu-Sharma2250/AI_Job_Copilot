# main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
import json
from dataclasses import dataclass
from pydantic import BaseModel
from typing import List

from resume_parser import parse_resume

# Import all AI services
from ai_services.generate_archetypes import generate_archetypes
from ai_services.extract_keywords import extract_keywords
from ai_services.select_best_archetype import select_best_archetype
from ai_services.generate_optimized_resume import generate_optimized_resume
from ai_services.generate_email import generate_email
from ai_services.generate_linkedin_message import generate_linkedin_message
from ai_services.evaluate_resume_10dim import evaluate_resume_10dim

app = FastAPI()

# Allow frontend (Next.js) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-job-copilot.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OnboardingRequest(BaseModel):
    degree: str
    experience_level: str
    strengths_list: str          # will be comma-separated string or list; adjust as needed
    best_project: str
    target_roles_list: str
    tech_stack: str
    # project_metric is optional; default to empty string
    project_metric: str = ""


# -------------------- ONBOARDING (generate archetypes once) --------------------
@app.post("/onboarding")
async def onboarding(data: OnboardingRequest):
    print("data on onBoarding : ", data)
    """
    Generate archetypes from user questionnaire.
    Returns JSON array of archetypes to be stored on the frontend.
    """
    # Convert string inputs to appropriate types (if needed)
    strengths = [s.strip() for s in data.strengths_list.split(",") if s.strip()]
    target_roles = [r.strip() for r in data.target_roles_list.split(",") if r.strip()]
    tech_stack_list = [t.strip() for t in data.tech_stack.split(",") if t.strip()]

    # Create a simple object to hold user answers
    @dataclass
    class UserInput:
        degree: str
        experience_level: str
        strengths_list: List[str]
        best_project: str
        project_metric: str
        target_roles_list: List[str]
        tech_stack: List[str]
    
    user_input = UserInput(
        degree=data.degree,
        experience_level=data.experience_level,
        strengths_list=strengths,
        best_project=data.best_project,
        project_metric=data.project_metric,
        target_roles_list=target_roles,
        tech_stack=tech_stack_list
    )

    archetypes_json = generate_archetypes(user_input)
    return JSONResponse(content=json.loads(archetypes_json))

# -------------------- GENERATE APPLICATION --------------------

@app.post("/generate")
async def generate_application(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    archetypes_json: str = Form(...)
):
    """
    Generate tailored resume, email, LinkedIn message, and fit score.
    archetypes_json: array of archetype objects (as string)
    """
    # Save uploaded resume temporarily
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        content = await resume.read()
        tmp.write(content)
        tmp_path = tmp.name

    # Parse resume to text
    resume_text = parse_resume(tmp_path)

    # 1. Extract keywords from job description
    keywords_json = extract_keywords(job_description)
    try:
        keywords_list = json.loads(keywords_json)
    except:
        keywords_list = []

    # Convert keywords to weighted list (position = weight, higher is more important)
    weighted_keywords = [(kw, len(keywords_list) - i) for i, kw in enumerate(keywords_list)]

    # 2. Load archetypes
    try:
        archetypes = json.loads(archetypes_json)
    except:
        archetypes = []

    if not archetypes:
        return JSONResponse(status_code=400, content={"error": "No archetypes provided. Please run onboarding first."})

    # 3. Select best archetype for this job
    best_name = select_best_archetype(job_description, archetypes)
    if best_name == "NONE":
        best_archetype = archetypes[0]   # fallback to first
    else:
        best_archetype = next((a for a in archetypes if a["name"] == best_name), archetypes[0])

    # 4. Generate optimized resume
    optimized_resume = generate_optimized_resume(
        job_description=job_description,
        keywords_with_weights=weighted_keywords,
        original_resume=resume_text,
        archetype=best_archetype
    )

    # 5. Generate email
    email = generate_email(resume_text, job_description)

    # 6. Generate LinkedIn message (connection request)
    linkedin_msg = generate_linkedin_message(resume_text, job_description, message_type="connection")

    # 7. Evaluate fit score (10 dimensions)
    fit_score_json = evaluate_resume_10dim(job_description, resume_text)
    try:
        fit_score = json.loads(fit_score_json)
    except:
        fit_score = {"error": "Failed to parse fit score"}

    return {
        "optimized_resume": optimized_resume,
        "email": email,
        "linkedin_message": linkedin_msg,
        "fit_score": fit_score
    }