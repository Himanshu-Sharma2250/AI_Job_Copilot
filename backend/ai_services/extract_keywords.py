from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def extract_keywords(job_description: str, max_keywords: int = 15) -> str:
    """
    Returns a JSON array of keyword strings (e.g. ["React", "Python", ...]).
    """
    truncated_jd = truncate_text(job_description, max_chars=5000)
    system_msg = (
        "You are a keyword extraction assistant for entry-level job applications. "
        "Extract the most important keywords from a job description. "
        "Focus on technical skills, tools, programming languages, frameworks, soft skills, and role-specific terms. "
        "Output only a JSON array of strings (keywords), no extra text. "
        f"Limit to {max_keywords} keywords. Do not include common stopwords."
    )
    user_prompt = f"""
Extract the top {max_keywords} keywords from this entry-level job description:

{truncated_jd}

Return only a JSON array of strings, e.g. ["React", "Python", "teamwork", "API", "Git"].
"""
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
        )
        return response.choices[0].message.content #type: ignore
    except Exception as e:
        print(f"Groq API error in extract_keywords: {e}")
        return json.dumps({"error": str(e)})
