#!/usr/bin/env python3
"""
IELTS Practice Web App Backend Server
Built with Python's built-in http.server
"""

import json
import sqlite3
import os
import sys
import hashlib
import urllib.request
import urllib.parse
import ssl
from datetime import datetime, timedelta
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from threading import Lock
from urllib.error import URLError, HTTPError

# Try to import certifi for SSL verification
try:
    import certifi
    CERTIFI_AVAILABLE = True
except ImportError:
    CERTIFI_AVAILABLE = False

# Database lock for thread safety
db_lock = Lock()

# Configuration
PORT = int(os.getenv("PORT", "8787"))
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "").strip()
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.2")
BASE_DIR = Path(__file__).parent
# DB path: prefer same dir, fall back to home dir, then /tmp
DB_PATH = None
for _candidate in [BASE_DIR / "ielts_practice.db", Path.home() / "ielts_practice.db", Path("/tmp/ielts_practice.db")]:
    try:
        import sqlite3 as _test_sqlite
        _test_conn = _test_sqlite.connect(str(_candidate))
        _test_conn.execute("CREATE TABLE IF NOT EXISTS _ping (x INTEGER)")
        _test_conn.execute("DROP TABLE _ping")
        _test_conn.close()
        DB_PATH = _candidate
        break
    except Exception:
        continue
if DB_PATH is None:
    DB_PATH = Path("/tmp/ielts_practice.db")

# Prompt pools for deterministic selection (must match frontend IDs)
TASK1_IDS = [
    "t1-bar-library", "t1-line-commute", "t1-pie-budget", "t1-map-harbor",
    "t1-table-energy", "t1-process-recycle", "t1-mixed-sales", "t1-line-population",
    "t1-bar-internet", "t1-line-tourism", "t1-table-smartphone", "t1-pie-water",
    "t1-process-coffee", "t1-map-park", "t1-bar-enrolment", "t1-line-energymix",
    "t1-mixed-museum", "t1-table-airline", "t1-process-cement", "t1-map-town",
]
TASK2_IDS = [
    "t2-education", "t2-technology", "t2-environment", "t2-work", "t2-health",
    "t2-transport", "t2-children-screen", "t2-tourism", "t2-crime", "t2-advertising",
    "t2-history", "t2-city-life", "t2-space", "t2-aging", "t2-food",
    "t2-books", "t2-uniform", "t2-sports", "t2-online-learning", "t2-jobsat",
]
SPEAKING_IDS = [
    "sp-hometown", "sp-hobby", "sp-teacher", "sp-travel", "sp-book",
    "sp-technology", "sp-achievement", "sp-place", "sp-friend", "sp-food",
    "sp-skill", "sp-event", "sp-environment", "sp-childhood", "sp-change",
    "sp-building", "sp-music", "sp-challenge", "sp-market", "sp-advice",
]


def load_env_file():
    """Load .env file if it exists"""
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        try:
            with open(env_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#'):
                        continue
                    if '=' in line:
                        key, value = line.split('=', 1)
                        key = key.strip()
                        value = value.strip()
                        if key and key not in os.environ:
                            os.environ[key] = value
        except Exception as e:
            print(f"Warning: Could not load .env file: {e}", file=sys.stderr)


def init_database():
    """Initialize SQLite database with required tables"""
    with db_lock:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()

        # Practice sessions table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS practice_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                task_type TEXT NOT NULL CHECK(task_type IN ('task1','task2','speaking')),
                prompt_id TEXT NOT NULL,
                prompt_title TEXT,
                content TEXT NOT NULL,
                overall_band REAL,
                scores_json TEXT,
                analysis_json TEXT,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)

        # Error bank table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS error_bank (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER REFERENCES practice_sessions(id),
                task_type TEXT NOT NULL,
                error_type TEXT NOT NULL,
                section TEXT,
                original TEXT NOT NULL,
                corrected TEXT NOT NULL,
                explanation TEXT,
                severity TEXT DEFAULT 'medium',
                review_count INTEGER DEFAULT 0,
                next_review_date TEXT,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)

        # Daily prompts table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS daily_prompts (
                date TEXT PRIMARY KEY,
                task1_id TEXT NOT NULL,
                task2_id TEXT NOT NULL,
                speaking_id TEXT NOT NULL
            )
        """)

        conn.commit()
        conn.close()


def get_db_connection():
    """Get a database connection"""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def deterministic_pick(date_str, pool, index):
    """Pick a deterministic item from pool based on date string"""
    hash_obj = hashlib.sha256((date_str + str(index)).encode())
    hash_int = int(hash_obj.hexdigest(), 16)
    return pool[hash_int % len(pool)]


def get_daily_prompts(date_str):
    """Get daily prompts for a given date"""
    with db_lock:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM daily_prompts WHERE date = ?",
            (date_str,)
        )
        row = cursor.fetchone()

        if row:
            conn.close()
            return {
                "date": row["date"],
                "task1_id": row["task1_id"],
                "task2_id": row["task2_id"],
                "speaking_id": row["speaking_id"]
            }

        # Deterministically select prompts
        task1_id = deterministic_pick(date_str, TASK1_IDS, 0)
        task2_id = deterministic_pick(date_str, TASK2_IDS, 1)
        speaking_id = deterministic_pick(date_str, SPEAKING_IDS, 2)

        cursor.execute(
            "INSERT INTO daily_prompts (date, task1_id, task2_id, speaking_id) VALUES (?, ?, ?, ?)",
            (date_str, task1_id, task2_id, speaking_id)
        )
        conn.commit()
        conn.close()

        return {
            "date": date_str,
            "task1_id": task1_id,
            "task2_id": task2_id,
            "speaking_id": speaking_id
        }


def call_anthropic_api(system_prompt, user_message):
    """Call Anthropic Claude API"""
    if not ANTHROPIC_API_KEY:
        return None, "ANTHROPIC_API_KEY not configured"

    try:
        url = "https://api.anthropic.com/v1/messages"
        headers = {
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }

        payload = {
            "model": ANTHROPIC_MODEL,
            "max_tokens": 8000,
            "messages": [
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            "system": system_prompt
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers=headers,
            method='POST'
        )

        # Handle SSL
        if CERTIFI_AVAILABLE:
            context = ssl.create_default_context(cafile=certifi.where())
        else:
            context = ssl.create_default_context()

        with urllib.request.urlopen(req, context=context) as response:
            response_data = json.loads(response.read().decode('utf-8'))

        # Extract text from Claude response
        if response_data.get('content') and len(response_data['content']) > 0:
            text = response_data['content'][0].get('text', '')
            return text, None
        else:
            return None, "Invalid response format from Claude API"

    except (URLError, HTTPError) as e:
        return None, f"API call failed: {str(e)}"
    except Exception as e:
        return None, f"Error calling Claude API: {str(e)}"


def call_openai_api(system_prompt, user_message):
    """Call OpenAI API (fallback)"""
    if not OPENAI_API_KEY:
        return None, "OPENAI_API_KEY not configured"

    try:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": OPENAI_MODEL,
            "max_tokens": 8000,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers=headers,
            method='POST'
        )

        # Handle SSL
        if CERTIFI_AVAILABLE:
            context = ssl.create_default_context(cafile=certifi.where())
        else:
            context = ssl.create_default_context()

        with urllib.request.urlopen(req, context=context) as response:
            response_data = json.loads(response.read().decode('utf-8'))

        # Extract text from OpenAI response
        if response_data.get('choices') and len(response_data['choices']) > 0:
            text = response_data['choices'][0]['message'].get('content', '')
            return text, None
        else:
            return None, "Invalid response format from OpenAI API"

    except (URLError, HTTPError) as e:
        return None, f"API call failed: {str(e)}"
    except Exception as e:
        return None, f"Error calling OpenAI API: {str(e)}"


def build_analysis_prompt(task_type, prompt_obj, content):
    """Build the system prompt for analysis"""
    task_name = {
        "task1": "IELTS Academic Writing Task 1",
        "task2": "IELTS Academic Writing Task 2",
        "speaking": "IELTS Speaking"
    }.get(task_type, task_type)

    system_prompt = f"""You are an IELTS Academic Writing/Speaking examiner and writing coach.

Analyze the student's {task_name} response sentence by sentence.

For each sentence, provide:
1. The original sentence
2. Error type classification (grammar, collocation, sentence_pattern, awkward_phrasing, task_response, coherence, lexical, pronunciation_note)
3. Specific error description
4. Corrected version
5. Improvement suggestion
6. Sentence-level score estimate (1-9)
7. Suggested cue/starter for this sentence position (the first few words that could help frame a better sentence)

Also provide:
- Overall IELTS band score estimate (with sub-scores: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy)
- Top 3-5 priority issues to fix
- A complete Band 7.5 rewritten version of the entire response
- Overall feedback in Traditional Chinese
- For speaking: also note filler words, hesitation markers, and fluency issues

Return as JSON matching this exact schema:
{{
    "overallBand": number,
    "scores": {{
        "taskAchievement": number,
        "coherence": number,
        "lexical": number,
        "grammar": number
    }},
    "sentenceAnalysis": [
        {{
            "original": "string",
            "errorType": "string",
            "errorDescription": "string",
            "corrected": "string",
            "suggestion": "string",
            "sentenceScore": number,
            "cue": "string"
        }}
    ],
    "priorities": ["string"],
    "band75Version": "string",
    "overallFeedback": "string (in Traditional Chinese)",
    "sectionRewrites": [
        {{
            "sectionKey": "string",
            "newText": "string"
        }}
    ]
}}

All feedback text should be in Traditional Chinese.
The band75Version should be a complete rewrite at Band 7.5 level.
Be specific, direct, and constructive."""

    return system_prompt


def analyze_content(task_type, prompt_obj, content, sections):
    """Analyze user content using Claude API"""
    system_prompt = build_analysis_prompt(task_type, prompt_obj, content)
    user_message = f"Please analyze this {task_type} response:\n\n{content}"

    # Try Anthropic first, fall back to OpenAI
    response_text, error = call_anthropic_api(system_prompt, user_message)

    if response_text is None:
        print(f"Anthropic API error: {error}, trying OpenAI...", file=sys.stderr)
        response_text, error = call_openai_api(system_prompt, user_message)

    if response_text is None:
        return None, error

    # Parse the JSON response
    try:
        # Handle potential markdown code blocks
        if response_text.strip().startswith("```"):
            response_text = response_text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            else:
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]

        analysis = json.loads(response_text.strip())
        return analysis, None
    except json.JSONDecodeError as e:
        return None, f"Failed to parse API response as JSON: {str(e)}"


def save_analysis_to_db(task_type, prompt_obj, content, analysis, sections):
    """Save analysis results to database"""
    if analysis is None:
        return None

    with db_lock:
        conn = get_db_connection()
        cursor = conn.cursor()

        date_str = datetime.now().strftime("%Y-%m-%d")

        cursor.execute("""
            INSERT INTO practice_sessions
            (date, task_type, prompt_id, prompt_title, content, overall_band, scores_json, analysis_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            date_str,
            task_type,
            prompt_obj.get("id", ""),
            prompt_obj.get("title", ""),
            content,
            analysis.get("overallBand"),
            json.dumps(analysis.get("scores", {})),
            json.dumps(analysis)
        ))

        session_id = cursor.lastrowid

        # Save errors to error_bank
        for sentence in analysis.get("sentenceAnalysis", []):
            error_type = sentence.get("errorType", "unknown")

            cursor.execute("""
                INSERT INTO error_bank
                (session_id, task_type, error_type, original, corrected, explanation, severity)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                session_id,
                task_type,
                error_type,
                sentence.get("original", ""),
                sentence.get("corrected", ""),
                sentence.get("errorDescription", ""),
                "medium"
            ))

        conn.commit()
        conn.close()

        return session_id


class IELTSRequestHandler(BaseHTTPRequestHandler):
    """HTTP Request handler for IELTS API"""

    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        query_string = urllib.parse.parse_qs(parsed_path.query)

        try:
            if path == "/api/health":
                self.handle_health()
            elif path == "/api/daily-prompts":
                date = query_string.get("date", [datetime.now().strftime("%Y-%m-%d")])[0]
                self.handle_daily_prompts(date)
            elif path == "/api/errors":
                error_type = query_string.get("type", [None])[0]
                limit = int(query_string.get("limit", [50])[0])
                offset = int(query_string.get("offset", [0])[0])
                self.handle_errors(error_type, limit, offset)
            elif path == "/api/review":
                self.handle_review()
            elif path == "/api/stats":
                self.handle_stats()
            elif path == "/api/anki-export":
                export_type = query_string.get("type", ["all"])[0]
                from_date = query_string.get("from", ["2024-01-01"])[0]
                to_date = query_string.get("to", ["2026-12-31"])[0]
                self.handle_anki_export(export_type, from_date, to_date)
            else:
                # Try to serve static files
                self.handle_static_file(path)
        except Exception as e:
            print(f"Error handling {path}: {str(e)}", file=sys.stderr)
            self.send_error(500, f"Internal server error: {str(e)}")

    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept")
        self.end_headers()

    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body) if body else {}

            if path == "/api/analyze":
                self.handle_analyze(data)
            else:
                self.send_json_response(404, {"error": "Endpoint not found"})
        except Exception as e:
            print(f"Error handling POST {path}: {str(e)}", file=sys.stderr)
            self.send_error(500, f"Internal server error: {str(e)}")

    def handle_health(self):
        """GET /api/health"""
        response = {
            "ok": True,
            "ai_configured": bool(ANTHROPIC_API_KEY or OPENAI_API_KEY),
            "model": ANTHROPIC_MODEL if ANTHROPIC_API_KEY else (OPENAI_MODEL if OPENAI_API_KEY else None)
        }
        self.send_json_response(200, response)

    def handle_daily_prompts(self, date):
        """GET /api/daily-prompts?date=YYYY-MM-DD"""
        try:
            result = get_daily_prompts(date)
            self.send_json_response(200, result)
        except Exception as e:
            self.send_json_response(400, {"error": str(e)})

    def handle_analyze(self, data):
        """POST /api/analyze"""
        task_type = data.get("taskType")
        prompt_obj = data.get("prompt", {})
        content = data.get("content", "")
        sections = data.get("sections", [])

        if not task_type or task_type not in ["task1", "task2", "speaking"]:
            self.send_json_response(400, {"error": "Invalid or missing taskType"})
            return

        if not content:
            self.send_json_response(400, {"error": "Content is required"})
            return

        # Analyze content
        analysis, error = analyze_content(task_type, prompt_obj, content, sections)

        if error:
            self.send_json_response(400, {"error": error})
            return

        # Save to database
        session_id = save_analysis_to_db(task_type, prompt_obj, content, analysis, sections)

        response = {
            "sessionId": session_id,
            "analysis": analysis
        }
        self.send_json_response(200, response)

    def handle_errors(self, error_type, limit, offset):
        """GET /api/errors"""
        with db_lock:
            conn = get_db_connection()
            cursor = conn.cursor()

            query = "SELECT * FROM error_bank"
            params = []

            if error_type:
                query += " WHERE error_type = ?"
                params.append(error_type)

            # Get total count
            count_query = query.replace("SELECT *", "SELECT COUNT(*) as count")
            cursor.execute(count_query, params)
            total = cursor.fetchone()["count"]

            # Get paginated results
            query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
            params.extend([limit, offset])
            cursor.execute(query, params)
            errors = [dict(row) for row in cursor.fetchall()]

            conn.close()

        self.send_json_response(200, {"errors": errors, "total": total})

    def handle_review(self):
        """GET /api/review"""
        today = datetime.now().strftime("%Y-%m-%d")

        with db_lock:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Get items due for review
            cursor.execute("""
                SELECT * FROM error_bank
                WHERE (next_review_date IS NULL OR next_review_date <= ?)
                OR review_count < 3
                ORDER BY created_at DESC
                LIMIT 20
            """, (today,))

            review_items = [dict(row) for row in cursor.fetchall()]
            conn.close()

        response = {
            "date": today,
            "reviewItems": review_items,
            "summary": ""
        }

        # Generate summary if API is available
        if ANTHROPIC_API_KEY or OPENAI_API_KEY:
            items_text = "\n".join([
                f"- {item['original']} -> {item['corrected']}"
                for item in review_items[:10]
            ])
            prompt = f"生成一個簡明的複習摘要,包含以下詞語/句式:\n{items_text}"

            summary_text, _ = call_anthropic_api(
                "You are a helpful study assistant. Generate summaries in Traditional Chinese.",
                prompt
            )

            if summary_text:
                response["summary"] = summary_text

        self.send_json_response(200, response)

    def handle_stats(self):
        """GET /api/stats"""
        with db_lock:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Total sessions
            cursor.execute("SELECT COUNT(*) as count FROM practice_sessions")
            total_sessions = cursor.fetchone()["count"]

            # Total errors
            cursor.execute("SELECT COUNT(*) as count FROM error_bank")
            total_errors = cursor.fetchone()["count"]

            # Errors by type
            cursor.execute("""
                SELECT error_type, COUNT(*) as count
                FROM error_bank
                GROUP BY error_type
            """)
            errors_by_type = {row["error_type"]: row["count"] for row in cursor.fetchall()}

            # Recent sessions
            cursor.execute("""
                SELECT id, date, task_type, prompt_title, overall_band
                FROM practice_sessions
                ORDER BY created_at DESC
                LIMIT 10
            """)
            recent_sessions = [dict(row) for row in cursor.fetchall()]

            # Calculate streak (consecutive days with practice)
            cursor.execute("""
                SELECT DISTINCT date FROM practice_sessions
                ORDER BY date DESC
            """)
            dates = [row[0] for row in cursor.fetchall()]

            streak = 0
            if dates:
                today = datetime.now().date()
                for i, date_str in enumerate(dates):
                    date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
                    expected_date = today - timedelta(days=i)
                    if date_obj == expected_date:
                        streak += 1
                    else:
                        break

            conn.close()

        response = {
            "totalSessions": total_sessions,
            "totalErrors": total_errors,
            "errorsByType": errors_by_type,
            "recentSessions": recent_sessions,
            "streakDays": streak
        }
        self.send_json_response(200, response)

    def handle_anki_export(self, export_type, from_date, to_date):
        """GET /api/anki-export"""
        with db_lock:
            conn = get_db_connection()
            cursor = conn.cursor()

            query = "SELECT * FROM error_bank WHERE created_at BETWEEN ? AND ?"
            cursor.execute(query, (from_date, to_date))
            errors = cursor.fetchall()

            conn.close()

        # Generate TSV
        tsv_lines = []
        for error in errors:
            front = f"[{error['error_type']}] {error['original']}"
            back = f"{error['corrected']}\n\n{error['explanation'] or ''}"
            tags = f"ielts {error['task_type']} {error['error_type']}"
            tsv_lines.append(f"{front}\t{back}\t{tags}")

        tsv_content = "\n".join(tsv_lines)

        self.send_response(200)
        self.send_header("Content-Type", "text/tab-separated-values")
        self.send_header("Content-Disposition", f"attachment; filename=ielts-errors-{from_date}-{to_date}.tsv")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(tsv_content.encode('utf-8'))

    def handle_static_file(self, path):
        """Serve static files from the same directory"""
        if path == "/" or path == "/index.html":
            path = "/app.html"

        file_path = BASE_DIR / path.lstrip("/")

        if not file_path.exists():
            self.send_json_response(404, {"error": "File not found"})
            return

        # Security check: ensure file is within BASE_DIR
        try:
            file_path.relative_to(BASE_DIR)
        except ValueError:
            self.send_json_response(403, {"error": "Access denied"})
            return

        # Determine content type
        content_type = "text/html"
        if path.endswith(".js"):
            content_type = "application/javascript"
        elif path.endswith(".css"):
            content_type = "text/css"
        elif path.endswith(".json"):
            content_type = "application/json"

        try:
            with open(file_path, "rb") as f:
                content = f.read()

            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", len(content))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_json_response(500, {"error": f"Error reading file: {str(e)}"})

    def send_json_response(self, status_code, data):
        """Send JSON response"""
        response = json.dumps(data, ensure_ascii=False, indent=2)
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", len(response.encode('utf-8')))
        self.end_headers()
        self.wfile.write(response.encode('utf-8'))

    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):
        """Custom logging"""
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {format % args}", file=sys.stderr)


def main():
    """Start the server"""
    # Load .env file
    load_env_file()

    # Initialize database
    init_database()

    # Create server
    server_address = ("", PORT)
    httpd = ThreadingHTTPServer(server_address, IELTSRequestHandler)

    print(f"IELTS Practice Server starting on port {PORT}")
    print(f"Database: {DB_PATH}")
    print(f"AI Configured: {bool(ANTHROPIC_API_KEY or OPENAI_API_KEY)}")
    if ANTHROPIC_API_KEY:
        print(f"Using Anthropic Claude: {ANTHROPIC_MODEL}")
    elif OPENAI_API_KEY:
        print(f"Using OpenAI: {OPENAI_MODEL}")
    else:
        print("⚠️  No API keys configured. API-dependent endpoints will fail.")
    print(f"Serving static files from: {BASE_DIR}")
    print(f"Starting server... Press Ctrl+C to stop.\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()
        sys.exit(0)


if __name__ == "__main__":
    main()
