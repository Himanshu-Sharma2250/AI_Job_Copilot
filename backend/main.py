from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from resume_parser import parse_resume
from ai_service import (
    generate_tailored_resume,
    generate_email,
    generate_fit_score
)

import tempfile

app = FastAPI()

# Allow frontend (Next.js) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate_application(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        content = await resume.read()
        tmp.write(content)
        tmp_path = tmp.name

    # Parse resume
    resume_text = parse_resume(tmp_path)

    # Generate outputs
    tailored_resume = generate_tailored_resume(resume_text, job_description)
    email = generate_email(resume_text, job_description)
    fit_score = generate_fit_score(resume_text, job_description)

    return {
        "resume": tailored_resume,
        "email": email,
        "fit_score": fit_score
    }