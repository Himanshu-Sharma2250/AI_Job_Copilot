def truncate_text(text: str, max_chars: int = 8000) -> str:
    """Truncate text to max_chars, cutting at the last space to preserve words."""
    if len(text) <= max_chars:
        return text
    truncated = text[:max_chars]
    last_space = truncated.rfind(' ')
    if last_space > 0:
        truncated = truncated[:last_space]
    return truncated + "..."
