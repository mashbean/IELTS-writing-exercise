# IELTS Practice Studio — Handoff Document

> Last updated: 2026-03-21
> Branch: `codex/ielts-writing-studio-rollout`
> Commit: `3e97880` — IELTS Practice Studio v2

---

## Current State Summary

This is a **local-first IELTS daily practice web app** with 3 practice modes (Writing Task 1, Task 2, Speaking), an error database, and Anki export. It runs as a Python server serving a single HTML file.

**Status: MVP functional, ready for daily use.** Needs API key configured to enable LLM analysis.

---

## Architecture

```
tools/ielts-writing/
├── app.html              ← NEW: Full frontend (single file, ~125KB)
│                            HTML + CSS + JS, no external deps
├── server.py             ← NEW: Python backend (~800 lines)
│                            http.server + SQLite + Anthropic/OpenAI API
├── .env                  ← User's API keys (gitignored)
├── .env.example          ← Template for .env
├── ielts_practice.db     ← SQLite database (auto-created)
│
├── index.html            ← OLD: v1 frontend (preserved, not used)
├── ielts_writing_server.py ← OLD: v1 backend (preserved, not used)
├── ielts-writing-studio.js ← OLD: v1 JS (preserved, not used)
├── ielts-writing-studio.css ← OLD: v1 CSS (preserved, not used)
├── README.md             ← Updated usage docs
└── HANDOFF.md            ← This file
```

### How it runs

```bash
cd tools/ielts-writing
python3 server.py        # Starts on port 8787
# Open http://127.0.0.1:8787
```

### Data flow

```
Browser (app.html)
  ↕ fetch() to localhost:8787
Python server (server.py)
  ↕ SQLite (ielts_practice.db) — error bank, sessions, daily prompts
  ↕ Anthropic/OpenAI API — sentence analysis, scoring, Band 7.5 rewrite
```

---

## Feature Inventory

### Completed (v2)

| Feature | Status | Notes |
|---------|--------|-------|
| **Question bank** | ✅ 60 prompts | 20 Task1 + 20 Task2 + 20 Speaking, all with IDs |
| **Daily rotation** | ✅ | Date-seeded deterministic pick, Change Topic button |
| **Task 1 structured writing** | ✅ 9 steps | Intro → Overview ×2 → Body1 ×3 → Body2 ×3 |
| **Task 2 structured writing** | ✅ 13 steps | Hook, Thesis, 3× (Topic+Explain+Example), Conclusion ×2 |
| **Speaking structured prep** | ✅ 5 points + input | Opening, 2 main points, example, closing + paste area |
| **SVG chart rendering** | ✅ 7 types | Bar, Line, Pie, Table, Process, Map, Mixed |
| **Countdown timers** | ✅ | Task1=20min, Task2=40min, Speaking=3min |
| **Starter chips (cues)** | ✅ | 2-3 per step, clickable to insert |
| **Essay Progress Map** | ✅ | Right sidebar, shows active/completed steps, clickable |
| **LLM sentence analysis** | ✅ | Calls Claude/OpenAI, returns per-sentence errors + scores |
| **Band 7.5 rewrite** | ✅ | Generated alongside analysis |
| **Error database** | ✅ SQLite | Accumulates across sessions, filterable |
| **Anki TSV export** | ✅ | Downloads from /api/anki-export |
| **Daily review** | ✅ | Shows recent errors + AI summary |
| **Auto-save drafts** | ✅ localStorage | Persists across page reloads |
| **Compact layout** | ✅ | Header=1 row, sidebar=220px/280px |

### Not Yet Implemented

| Feature | Priority | Notes |
|---------|----------|-------|
| **Online prompt import** | HIGH | User wants to import good templates from web; search IELTS sites for quality prompts |
| **SRS / spaced repetition** | MEDIUM | error_bank has `next_review_date` and `review_count` columns ready |
| **Cue bank from user history** | MEDIUM | Show user's good sentence patterns as cue options |
| **Audio recording / STT** | LOW | Currently text-only for speaking; schema has `pronunciation_note` field |
| **Progress charts / history** | MEDIUM | practice_sessions table tracks all data; need UI |
| **Dynamic prompt generation** | LOW | Architecture supports it via /api/daily-prompts |
| **Electron/Tauri desktop** | LOW | Currently runs in browser |

---

## Database Schema

### practice_sessions
```sql
id INTEGER PRIMARY KEY AUTOINCREMENT,
date TEXT NOT NULL,                    -- YYYY-MM-DD
task_type TEXT NOT NULL,               -- task1 / task2 / speaking
prompt_id TEXT,
prompt_title TEXT,
content TEXT,                          -- user's full answer
overall_band REAL,
scores_json TEXT,                      -- {"taskAchievement":7, "coherence":7, ...}
analysis_json TEXT,                    -- full LLM response
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

### error_bank
```sql
id INTEGER PRIMARY KEY AUTOINCREMENT,
session_id INTEGER REFERENCES practice_sessions(id),
task_type TEXT NOT NULL,
error_type TEXT NOT NULL,              -- grammar/collocation/sentence_pattern/
                                       -- awkward_phrasing/task_response/coherence/
                                       -- lexical/pronunciation_note
section TEXT,                          -- which essay section
original TEXT NOT NULL,
corrected TEXT NOT NULL,
explanation TEXT,
severity TEXT DEFAULT 'medium',        -- low/medium/high
review_count INTEGER DEFAULT 0,
next_review_date TEXT,                 -- for future SRS
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

### daily_prompts
```sql
date TEXT PRIMARY KEY,
task1_id TEXT NOT NULL,
task2_id TEXT NOT NULL,
speaking_id TEXT NOT NULL
```

---

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Server health + AI config status |
| GET | `/api/daily-prompts?date=YYYY-MM-DD` | Today's 3 prompt IDs |
| POST | `/api/analyze` | Main LLM analysis (body: {taskType, prompt, content, sections}) |
| GET | `/api/errors?type=X&limit=N` | Query error bank |
| GET | `/api/review` | Daily review items + AI summary |
| GET | `/api/stats` | Practice stats (streak, totals, by-type) |
| GET | `/api/anki-export?type=all` | Download TSV file |

### /api/analyze response format
```json
{
  "sessionId": 1,
  "analysis": {
    "overallBand": 6.5,
    "scores": { "taskAchievement": 7, "coherence": 6, "lexical": 7, "grammar": 6 },
    "overallFeedback": "...",
    "sentenceAnalysis": [
      {
        "original": "...",
        "corrected": "...",
        "errorType": "grammar",
        "errorDescription": "...",
        "suggestion": "...",
        "sentenceScore": 6,
        "cue": "Suggested sentence starter..."
      }
    ],
    "priorities": ["Issue 1", "Issue 2", ...],
    "band75Version": "Full rewritten essay at Band 7.5..."
  }
}
```

---

## Prompt ID Convention

- Task 1: `t1-{charttype}-{topic}` — e.g. `t1-bar-library`, `t1-line-commute`, `t1-pie-budget`
- Task 2: `t2-{topic}` — e.g. `t2-education`, `t2-technology`, `t2-environment`
- Speaking: `sp-{topic}` — e.g. `sp-hometown`, `sp-hobby`, `sp-teacher`

Server and frontend must use matching IDs. All IDs are defined in both `server.py` (TASK1_IDS, TASK2_IDS, SPEAKING_IDS arrays) and `app.html` (TASK1_PROMPTS, TASK2_PROMPTS, SPEAKING_PROMPTS arrays).

---

## Known Issues / Tech Debt

1. **Permissions on macOS**: Files created by Cowork VM have `700` permissions. User must run `sudo chmod -R 755 tools/ielts-writing/` from macOS Terminal once.

2. **SQLite on mounted FS**: SQLite can't write to the mounted macOS filesystem from the VM. Server falls back to `~/ielts_practice.db` or `/tmp/ielts_practice.db`. When running natively on macOS, the DB will be in the same directory as server.py.

3. **Old v1 files**: `index.html`, `ielts_writing_server.py`, `ielts-writing-studio.js`, `ielts-writing-studio.css` are the original v1 files. They're preserved but not used by v2. Can be cleaned up later.

4. **Mixed chart rendering**: Uses simplified bar+pie side-by-side. Could be enhanced with proper axis labels and legends.

5. **Map rendering**: Uses abstract block diagrams (Before→After). Not actual geographic maps.

6. **Model string in .env**: User has `OPENAI_MODEL=gpt-5.2` which may need updating depending on their API access.

---

## Next Session Priorities (from user)

1. **Import quality IELTS prompts from the web** — search reputable IELTS sites, curate and add to the prompt banks
2. **First real practice run** — user wants to write a full Task 1 essay and test the LLM analysis flow end-to-end
3. **Iterate on analysis quality** — adjust prompts to Claude/GPT based on actual output quality
4. **Cue bank personalization** — surface user's successful sentence patterns as future cues

---

## Environment Setup

```bash
# .env file (same directory as server.py)
ANTHROPIC_API_KEY=sk-ant-...       # Preferred
OPENAI_API_KEY=sk-proj-...         # Fallback
OPENAI_MODEL=gpt-4o               # or gpt-5.2 if user has access
PORT=8787
```

Python 3.10+ required. No pip dependencies (uses stdlib only: http.server, sqlite3, json, urllib).
