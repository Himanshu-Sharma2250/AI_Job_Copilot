from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text


load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def generate_optimized_resume(job_description: str, keywords_with_weights, original_resume: str, archetype: dict) -> str:
    """
    keywords_with_weights: list of (keyword, weight) tuples or a JSON string.
    archetype: dict (from generate_archetypes).
    Returns plain text resume.
    """
    print(f"job Description before trunc : {job_description}")
    print(f"original resume: {original_resume}")
    print(f"archetype : {archetype}")
    print(f"archetype type : {type(archetype)}")

    jd_trunc = truncate_text(job_description, max_chars=5000)
    resume_trunc = truncate_text(original_resume, max_chars=10000)

    print(f"job Description after trunc : {jd_trunc}")
    print(f"trunc resume: {resume_trunc}")

    # Format keyword-weight string
    if isinstance(keywords_with_weights, str):
        kw_string = keywords_with_weights
    else:
        kw_string = ", ".join([f"{kw}(weight {w})" for kw, w in keywords_with_weights])

    # Extract archetype fields
    skills_highlight = ", ".join(archetype.get("emphasis", {}).get("skills_to_highlight", []))
    projects_prioritize = ", ".join(archetype.get("emphasis", {}).get("projects_to_prioritize", []))
    traits_emphasize = ", ".join(archetype.get("emphasis", {}).get("traits_to_emphasize", []))
    section_order = ", ".join(archetype.get("resume_structure", {}).get("section_order", []))
    summary_template = archetype.get("resume_structure", {}).get("summary_template", "")

    system_msg = (
        "You are an expert resume writer for entry-level job seekers. "
        "Your task is to rewrite an existing resume to match a specific job description, following a given archetype configuration. "
        "Rules:\n"
        "- Never fabricate experience, skills, or projects. Only rephrase, reorder, and emphasize existing information.\n"
        "- Inject keywords naturally (no stuffing). Use them in the summary, first bullet of each project, and skills section.\n"
        "- Keep the resume to one page for entry-level (under 5 years experience).\n"
        "- Use action verbs: 'built', 'developed', 'created', 'implemented', 'tested', 'collaborated'.\n"
        "- Output the resume in plain text with clear section headers (Summary, Technical Skills, Projects, Education, Internships if any).\n"
        "- Do not add explanations or commentary – output only the resume text."
    )

    user_prompt = f"""
    Job Description:
    {jd_trunc}

    Extracted Keywords with importance weights (higher weight = more important for this job):
    {kw_string}

    Original Resume:
    {resume_trunc}

    Selected Archetype Configuration (JSON):
    {json.dumps(archetype, indent=2)}

    Instructions based on archetype:
    - Skills to highlight: {skills_highlight}
    - Projects to prioritize: {projects_prioritize}
    - Traits to emphasize: {traits_emphasize}
    - Section order: {section_order}
    - Summary template (use as guide, but adapt to JD): {summary_template}

    Skill Prioritization Rules (MANDATORY):
    1. From the original resume, extract all technical skills.
    2. For each skill, calculate its importance based on:
    - Exact matches to high-weight JD keywords get highest priority.
    - Partial matches (e.g., "React" matches "React.js") get medium priority.
    - Skills not mentioned in JD keywords get lowest priority.
    3. Sort the skills in descending order of importance (most important first).
    4. Present the "Technical Skills" section as a comma-separated list in that exact order.
    5. If two skills have similar importance, preserve their relative order from the original resume.

    Now generate the optimized resume following all rules above. Output only the resume text.
    """
    try:
        response: ChatCompletion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.5,
        )
        return response.choices[0].message.content #type: ignore
    except Exception as e:
        print(f"Groq API error in generate_optimized_resume: {e}")
        return f"Error generating optimized resume: {e}"
