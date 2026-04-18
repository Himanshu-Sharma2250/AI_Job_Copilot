from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text


load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def generate_linkedin_message(resume_text: str, job_description: str, message_type: str = "connection") -> str:
    """
    message_type: "connection" (short, for connection request) or "inmail" (slightly longer)
    """
    resume_summary = truncate_text(resume_text, max_chars=1000)
    jd_summary = truncate_text(job_description, max_chars=1500)

    if message_type == "connection":
        system_msg = (
            "You are a professional networking coach. Write a LinkedIn connection request note (under 300 characters). "
            "Rules: specific opening, mention 1 relevant skill or project, polite, no generic phrases. Output only the message."
        )
        user_prompt = f"""
Job description summary: {jd_summary}
Your background (key skill/project): {resume_summary}

Write a LinkedIn connection request note (under 300 characters) to a recruiter at that company.
"""
    else:  # inmail
        system_msg = (
            "You are a professional networking coach. Write a LinkedIn InMail (under 500 characters). "
            "Rules: greeting, mention role and 1-2 skills, show interest, soft call to action. Output only the message."
        )
        user_prompt = f"""
Job Description: {jd_summary}
Resume summary: {resume_summary}

Write a LinkedIn InMail (under 500 characters) to a hiring manager.
"""

    try:
        response: ChatCompletion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content #type: ignore
    except Exception as e:
        print(f"Groq API error in generate_linkedin_message: {e}")
        return f"Error generating LinkedIn message: {e}"
