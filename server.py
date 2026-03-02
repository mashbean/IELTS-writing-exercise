#!/usr/bin/env python3
import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
RESPONSES_ENDPOINT = "https://api.openai.com/v1/responses"
DEFAULT_MODEL = "gpt-5.2"
DEFAULT_REASONING_EFFORT = "high"


IELTS_RESPONSE_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "overallBand": {"type": "number"},
        "scores": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "taskAchievement": {"type": "number"},
                "coherence": {"type": "number"},
                "lexical": {"type": "number"},
                "grammar": {"type": "number"},
            },
            "required": ["taskAchievement", "coherence", "lexical", "grammar"],
        },
        "analysis": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "headline": {"type": "string"},
                "reason": {"type": "string"},
                "strengths": {"type": "string"},
                "priorities": {
                    "type": "array",
                    "items": {"type": "string"},
                },
            },
            "required": ["headline", "reason", "strengths", "priorities"],
        },
        "issues": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "type": {"type": "string"},
                    "section": {"type": "string"},
                    "title": {"type": "string"},
                    "reason": {"type": "string"},
                    "advice": {"type": "string"},
                },
                "required": ["type", "section", "title", "reason", "advice"],
            },
        },
        "rewrites": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "sectionKey": {"type": "string"},
                    "newText": {"type": "string"},
                },
                "required": ["sectionKey", "newText"],
            },
        },
    },
    "required": ["overallBand", "scores", "analysis", "issues", "rewrites"],
}


SYSTEM_PROMPT = """You are an IELTS Academic Writing Task 1 examiner and writing coach.

Your job is to grade a student's Task 1 response and improve it.

Rules:
- Grade using IELTS Academic Writing Task 1 criteria.
- Return all analysis in Traditional Chinese.
- Be direct, concrete, and specific.
- Respect the student's intended meaning where possible.
- Rewrites should be around Band 7.5 quality, concise, natural, and data-focused.
- If a section is weak or empty, still provide a usable rewritten sentence for that section.
- Do not mention that you are an AI model.
- Output must match the JSON schema exactly.
"""


def load_dotenv() -> None:
    dotenv_path = ROOT / ".env"
    if not dotenv_path.exists():
        return

    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'").strip('"')
        os.environ.setdefault(key, value)


def extract_output_text(response_json: dict) -> str:
    if isinstance(response_json.get("output_text"), str) and response_json["output_text"].strip():
        return response_json["output_text"]

    parts = []
    for item in response_json.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in {"output_text", "text"} and isinstance(content.get("text"), str):
                parts.append(content["text"])
    return "\n".join(parts).strip()


def build_user_prompt(payload: dict) -> str:
    prompt = payload["prompt"]
    sections = payload["sections"]
    essay = payload["essay"]

    structured_sections = [
        {
            "sectionKey": section["sectionKey"],
            "sectionLabel": section["sectionLabel"],
            "originalText": section["originalText"],
        }
        for section in sections
    ]

    return json.dumps(
        {
            "task": "IELTS Academic Writing Task 1 grading and rewrite",
            "prompt": {
                "id": prompt.get("id"),
                "type": prompt.get("type"),
                "title": prompt.get("title"),
                "question": prompt.get("prompt"),
            },
            "studentEssay": essay,
            "sections": structured_sections,
            "requiredBehavior": {
                "gradingLanguage": "Traditional Chinese",
                "rewriteGoal": "Band 7.5",
                "rewriteGranularity": "section-by-section",
            },
        },
        ensure_ascii=False,
    )


def call_openai(payload: dict) -> dict:
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set.")

    model = os.environ.get("OPENAI_MODEL", DEFAULT_MODEL).strip() or DEFAULT_MODEL
    reasoning_effort = os.environ.get("OPENAI_REASONING_EFFORT", DEFAULT_REASONING_EFFORT).strip() or DEFAULT_REASONING_EFFORT

    request_body = {
        "model": model,
        "reasoning": {
            "effort": reasoning_effort,
            "summary": "concise",
        },
        "instructions": SYSTEM_PROMPT,
        "input": build_user_prompt(payload),
        "text": {
            "format": {
                "type": "json_schema",
                "name": "ielts_task1_feedback",
                "strict": True,
                "schema": IELTS_RESPONSE_SCHEMA,
            }
        },
    }

    request = Request(
        RESPONSES_ENDPOINT,
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=90) as response:
            response_json = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API error: {exc.code} {detail}") from exc
    except URLError as exc:
        raise RuntimeError(f"Network error while calling OpenAI: {exc.reason}") from exc

    text = extract_output_text(response_json)
    if not text:
        raise RuntimeError("OpenAI response did not include any text output.")

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse model JSON output: {text[:400]}") from exc

    parsed["createdAt"] = response_json.get("created_at") or response_json.get("createdAt")
    parsed["model"] = response_json.get("model", model)
    parsed["reasoningEffort"] = reasoning_effort
    return parsed


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        sys.stdout.write("%s - - [%s] %s\n" % (self.client_address[0], self.log_date_time_string(), format % args))

    def do_GET(self):
        if self.path == "/api/health":
            self.send_json(
                {
                    "ok": True,
                    "backend": "python",
                    "ai_configured": bool(os.environ.get("OPENAI_API_KEY", "").strip()),
                    "model": os.environ.get("OPENAI_MODEL", DEFAULT_MODEL),
                    "reasoning_effort": os.environ.get("OPENAI_REASONING_EFFORT", DEFAULT_REASONING_EFFORT),
                }
            )
            return

        super().do_GET()

    def do_POST(self):
        if self.path != "/api/grade":
            self.send_json({"error": "Not found"}, status=404)
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json({"error": "Invalid content length"}, status=400)
            return

        try:
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
        except json.JSONDecodeError:
            self.send_json({"error": "Invalid JSON payload"}, status=400)
            return

        if not isinstance(payload, dict):
            self.send_json({"error": "Request body must be an object"}, status=400)
            return

        essay = str(payload.get("essay", "")).strip()
        if not essay:
            self.send_json({"error": "Essay content is required."}, status=400)
            return

        if not payload.get("prompt") or not payload.get("sections"):
            self.send_json({"error": "Prompt and sections are required."}, status=400)
            return

        try:
            result = call_openai(payload)
        except ValueError as exc:
            self.send_json({"error": str(exc)}, status=400)
            return
        except RuntimeError as exc:
            self.send_json({"error": str(exc)}, status=502)
            return

        self.send_json(result)

    def send_json(self, payload: dict, status: int = 200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def main():
    load_dotenv()
    port = int(os.environ.get("PORT", "8787"))
    server = ThreadingHTTPServer(("127.0.0.1", port), AppHandler)
    print(f"Serving IELTS Writing Studio at http://127.0.0.1:{port}")
    print(f"AI grading model: {os.environ.get('OPENAI_MODEL', DEFAULT_MODEL)}")
    server.serve_forever()


if __name__ == "__main__":
    main()
