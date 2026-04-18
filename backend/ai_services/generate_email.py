from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def generate_email(resume_text: str, job_description: str) -> str:
    resume_text = truncate_text(resume_text, max_chars=2000)
    job_description = truncate_text(job_description, max_chars=3000)

    system_msg = (
        "You are a professional email writer for job seekers. "
        "Write a short, personalized, human-sounding job application email.\n"
        "Rules:\n"
        "- Less than 150 words.\n"
        "- No generic phrases like 'I am writing to apply...' – start with a strong, specific opening.\n"
        "- Mention 2-3 key skills from the resume that match the job description.\n"
        "- Show enthusiasm for the company/role without being overbearing.\n"
        "- Friendly but professional tone.\n"
        "- Output only the email content (no extra commentary).\n"
        "- Include subject line, greeting, body, and closing.\n"
        "- Address to 'Hiring Manager' unless a name is given in the JD."
    )

    user_prompt = f"""
Job Description:
{job_description}

Resume (summary of relevant skills and experience):
{resume_text}

Write the email now.
"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content #type: ignore
    except Exception as e:
        print(f"Groq API error in generate_email: {e}")
        return f"Error generating email: {e}"
