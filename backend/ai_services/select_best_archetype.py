from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text


load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def select_best_archetype(job_description: str, archetypes_list: list) -> str:
    """
    archetypes_list: list of archetype dicts (each with at least "name" and "trigger_keywords")
    Returns the name of the best matching archetype, or "NONE".
    """
    jd_trunc = truncate_text(job_description, max_chars=3000)
    archetypes_json = json.dumps(archetypes_list, indent=2)
    
    system_msg = "You are an archetype matcher. Output only the name of the chosen archetype or 'NONE'."
    user_prompt = f"""
Job Description:
{jd_trunc}

Archetypes:
{archetypes_json}

Select the single best matching archetype based on the job's required skills and role. Output only the name (e.g., "Entry Level Full Stack Developer"). If none matches well, output "NONE".
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
        chosen = response.choices[0].message.content.strip() #type: ignore
        return chosen
    except Exception as e:
        print(f"Error in select_best_archetype: {e}")
        return "NONE"
