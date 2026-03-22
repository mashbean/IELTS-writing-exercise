#!/bin/bash
# IELTS Two Week Sprint #1 — Create GitHub Issues
# Run: cd tools/ielts-writing && bash create-issues.sh

REPO="mashbean/IELTS-writing-exercise"
MILESTONE="IELTS Two Week Sprint #1"

echo "Creating issues for $REPO..."
echo ""

# ── Completed Issues (close immediately) ──────────────────────

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Frontend rewrite: single-file app.html with 5-tab layout" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
Complete rewrite of the frontend as a single HTML file (`app.html`) with embedded CSS and JS.

## Delivered
- 5-tab navigation: Task 1 / Task 2 / Speaking / Error Bank / Daily Review
- Three-column responsive layout (left sidebar 220px, workspace, right sidebar 280px)
- Compact header (single-row with inline stats)
- Warm color palette (#1f6d67 teal, #bd5d38 terracotta, #bd8a2e gold, #f8f3ed cream)
- Auto-save drafts to localStorage
- Mobile-responsive breakpoints

## Files
- `app.html` (125KB, single file, no external dependencies)

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 1 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Python backend with SQLite + Claude/OpenAI API" \
  --label "enhancement,backend" \
  --body "$(cat <<'BODY'
## Summary
New Python backend (`server.py`) replacing the old `ielts_writing_server.py`.

## Delivered
- `http.server` based, zero pip dependencies
- SQLite database with 3 tables: `practice_sessions`, `error_bank`, `daily_prompts`
- Anthropic Claude API integration (preferred) + OpenAI fallback
- Structured JSON schema for LLM analysis prompts
- Thread-safe database access with `threading.Lock`
- CORS support, graceful error handling
- DB path auto-detection (same dir → home dir → /tmp fallback)

## API Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check |
| GET | `/api/daily-prompts` | Daily prompt IDs |
| POST | `/api/analyze` | LLM sentence analysis |
| GET | `/api/errors` | Error bank query |
| GET | `/api/review` | Daily review + AI summary |
| GET | `/api/stats` | Practice statistics |
| GET | `/api/anki-export` | TSV download |

## Files
- `server.py` (~800 lines)
- `.env.example` (updated)

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 2 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] 60-prompt question bank (Task1 + Task2 + Speaking)" \
  --label "enhancement,content" \
  --body "$(cat <<'BODY'
## Summary
Built-in question bank with 60 prompts across all three task types.

## Delivered
- **20 Task 1** prompts: Bar Chart, Line Graph, Pie Chart, Map, Table, Process Diagram, Mixed Charts
  - Each with: id, type, title, prompt, restatement, overview ×2, focusA, focusB, visual data
- **20 Task 2** prompts: Discussion+Opinion, Agree/Disagree, Advantages/Disadvantages, Causes/Solutions, Direct Question
  - Each with: id, mode, title, prompt
- **20 Speaking Part 2** prompts covering: Hometown, Hobby, Teacher, Travel, Technology, etc.
  - Each with: id, topic, prompt, thinkTime (60s), speakTime (120s)
- Date-seeded deterministic daily rotation (same 3 prompts per calendar day)
- ID convention: `t1-{type}-{topic}`, `t2-{topic}`, `sp-{topic}`

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 3 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Structured writing flow (Task1: 9 steps, Task2: 13 steps)" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
Structured step-by-step writing interface with sentence starter chips.

## Delivered

### Task 1 — 9 Steps
1. Introduction (restatement)
2. Overview Sentence 1
3. Overview Sentence 2
4. Body 1 Topic Sentence
5. Body 1 Detail A
6. Body 1 Detail B
7. Body 2 Topic Sentence
8. Body 2 Detail A
9. Body 2 Detail B

### Task 2 — 13 Steps (with section headers)
**Introduction**: Hook/Background → Thesis Statement
**Body 1**: Topic → Explanation → Example
**Body 2**: Topic → Explanation → Example
**Body 3**: Topic → Explanation → Example
**Conclusion**: Restate Position → Final Thought

### Speaking — 5-point prep + paste area
Opening → Main Point 1 → Main Point 2 → Example/Story → Closing → Full Response input

### Features
- 2-3 clickable starter chips per step (e.g. "Overall,...", "In contrast,...")
- Per-step word count
- Section header labels for Task 2 (color-coded tags)

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 4 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] SVG chart rendering for Task 1 visuals" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
Inline SVG chart generation for all Task 1 visual data types.

## Delivered
| Chart Type | Renderer | Notes |
|------------|----------|-------|
| Bar Chart | `renderBarChart()` | Grouped bars, labeled axes, value labels, legend |
| Line Graph | `renderLineChart()` | Dots at data points, labeled axes, legend |
| Pie Chart | `renderPieCharts()` | Side-by-side comparison (e.g. 1995 vs 2025), percentage labels |
| Table | `renderTable()` | Styled HTML table with headers, alternating row colors |
| Process Diagram | `renderProcessFlow()` | Horizontal flow with arrow connectors |
| Map | `renderMapDiagram()` | Abstract Before→After block diagram with zone labels |
| Mixed | `renderMixedChart()` | Bar + Pie side-by-side |

### Bug fixes during sprint
- Fixed `renderTable()`: was reading `visual.rows` instead of `visual.data`
- Fixed `renderMixedChart()`: data format mismatch (series[].categories vs top-level categories)
- Replaced Map placeholder text with actual SVG diagram

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 5 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Countdown timers + Change Topic button" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
Practice timers matching IELTS exam conditions, plus topic switching.

## Delivered

### Timers
- Task 1: 20 minutes
- Task 2: 40 minutes
- Speaking: 3 minutes (1 min think + 2 min speak)
- Play / Pause / Reset controls
- Visual warnings: yellow < 5 min, red pulse < 1 min

### Change Topic
- "↻ Change Topic" button on all three tabs
- Cycles through prompts using date+offset seeding
- Updates sidebar, main display, and progress map

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 6 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Essay Progress Map widget" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
Right sidebar widget showing the user's current position in the essay structure.

## Delivered
- Tracks all steps per task type (Task 1: 9, Task 2: 13, Speaking: 6)
- Visual states: grey dot (empty), teal dot + check (completed), orange dot with glow (active/current)
- Section labels (Introduction, Body 1, Body 2, etc.)
- Clickable — clicking a step scrolls to and focuses that textarea
- Updates in real-time as user types (via `saveDraft()` → `updateProgressMap()`)
- Updates on tab switch and topic change

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 7 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] LLM sentence-level analysis + Band 7.5 rewrite" \
  --label "enhancement,backend,ai" \
  --body "$(cat <<'BODY'
## Summary
Core analysis feature: submit writing → get per-sentence feedback + full Band 7.5 reference.

## Delivered

### Analysis Pipeline
1. User submits essay sections via POST `/api/analyze`
2. Server sends structured prompt to Claude (Sonnet) or GPT
3. LLM returns JSON with:
   - `overallBand` + `scores` (4 dimensions)
   - `sentenceAnalysis[]`: per-sentence original, corrected, errorType, explanation, cue
   - `priorities[]`: top 3-5 issues to fix
   - `band75Version`: complete rewritten essay at Band 7.5
   - `overallFeedback`: Chinese-language summary

### Frontend Display
- Band score card with 4-dimension breakdown
- Scrollable sentence-by-sentence error cards with type badges
- Band 7.5 reference panel
- Loading state during API call

### Error Types Supported
grammar, collocation, sentence_pattern, awkward_phrasing, task_response, coherence, lexical, pronunciation_note

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 8 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Error database + Anki TSV export + Daily review" \
  --label "enhancement,backend" \
  --body "$(cat <<'BODY'
## Summary
Persistent error accumulation with export and review features.

## Delivered

### Error Database (SQLite)
- Every analysis automatically saves errors to `error_bank` table
- Fields: original, corrected, error_type, explanation, severity, section, task_type
- SRS-ready columns: `review_count`, `next_review_date` (not yet wired to SRS logic)

### Error Bank UI
- Filterable by error type and task type
- Error cards with original → corrected, type badge, review count
- Export to Anki button

### Anki Export
- GET `/api/anki-export` downloads TSV file
- Format: `[type] original\tcorrected + explanation\tielts task_type error_type`
- Ready for Anki import (3-column: Front, Back, Tags)

### Daily Review
- GET `/api/review` returns recent errors + AI-generated summary
- Review tab shows items with review count
- Export review set button

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 9 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] Compact layout optimization" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Summary
UI compaction to maximize writing workspace, especially for non-fullscreen browsers.

## Delivered
- Header: 3 rows → 1 row (title + stats inline), ~36px height
- Left sidebar: 280px → 220px, card padding reduced
- Right sidebar: 360px → 280px
- Timer font: 42px → 32px
- Card padding: 1.5rem → 0.75rem
- Container height: `calc(100vh - 76px)` (was 280px offset)
- Settings panel compacted

## Commit
`3e97880`
BODY
)"
echo "✓ Issue 10 created"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] HANDOFF.md for agent continuity" \
  --label "documentation" \
  --body "$(cat <<'BODY'
## Summary
Comprehensive handoff document enabling any future agent to pick up development.

## Contents
- Architecture diagram and file map
- Feature inventory (completed vs planned)
- Full database schema (3 tables)
- API endpoint reference with response formats
- Prompt ID convention
- Known issues and tech debt
- Next session priorities
- Environment setup instructions

## File
- `HANDOFF.md`

## Commit
`c3bb65c`
BODY
)"
echo "✓ Issue 11 created"

# ── Future Issues (leave open) ──────────────────────

gh issue create --repo "$REPO" \
  --title "[Sprint #1] TODO: Import quality IELTS prompts from web" \
  --label "enhancement,content" \
  --body "$(cat <<'BODY'
## Description
Search reputable IELTS sites for high-quality Task 1, Task 2, and Speaking prompts. Curate and add to the existing prompt banks.

## Acceptance Criteria
- [ ] Research 3-5 quality IELTS prompt sources
- [ ] Add at least 20 new Task 1 prompts with visual data
- [ ] Add at least 20 new Task 2 prompts covering all essay types
- [ ] Add at least 10 new Speaking prompts
- [ ] Maintain ID convention: `t1-{type}-{topic}`, `t2-{topic}`, `sp-{topic}`
- [ ] Update both `app.html` and `server.py` ID arrays

## Priority
HIGH — user explicitly requested this
BODY
)"
echo "✓ Issue 12 created (open)"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] TODO: Spaced repetition (SRS) for error review" \
  --label "enhancement,backend" \
  --body "$(cat <<'BODY'
## Description
Wire up the existing `review_count` and `next_review_date` columns in `error_bank` to a proper SRS algorithm.

## Schema Ready
- `error_bank.review_count` — already tracks review count
- `error_bank.next_review_date` — already exists, not yet computed

## Acceptance Criteria
- [ ] Implement SM-2 or similar interval algorithm
- [ ] Auto-compute `next_review_date` after each review
- [ ] Daily Review tab shows only items due today
- [ ] "Mark as Reviewed" button updates the review schedule

## Priority
MEDIUM
BODY
)"
echo "✓ Issue 13 created (open)"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] TODO: Personalized cue bank from user history" \
  --label "enhancement,ai" \
  --body "$(cat <<'BODY'
## Description
Surface the user's successful sentence patterns as cue/chip options in future practice sessions.

## Concept
- Track which sentence starters the user uses well (from LLM analysis)
- Store as a "cue bank" in SQLite
- Show personalized chips alongside default chips in writing steps
- Prioritize cues the user has used correctly before

## Acceptance Criteria
- [ ] New `cue_bank` table in SQLite
- [ ] LLM analysis extracts good sentence patterns
- [ ] Chips UI shows personalized cues alongside defaults
- [ ] Cues weighted by success frequency

## Priority
MEDIUM
BODY
)"
echo "✓ Issue 14 created (open)"

gh issue create --repo "$REPO" \
  --title "[Sprint #1] TODO: Practice history & progress charts" \
  --label "enhancement,frontend" \
  --body "$(cat <<'BODY'
## Description
Visualize practice history and band score progression over time.

## Data Available
- `practice_sessions` table already stores date, task_type, overall_band, scores_json
- `error_bank` tracks error counts over time

## Acceptance Criteria
- [ ] New "History" tab or section
- [ ] Band score trend line chart
- [ ] Error type distribution over time
- [ ] Practice streak visualization
- [ ] Per-task-type breakdown

## Priority
MEDIUM
BODY
)"
echo "✓ Issue 15 created (open)"

echo ""
echo "Done! All 15 issues created."
echo "Issues 1-11 are completed work from Sprint #1."
echo "Issues 12-15 are open TODOs for future sprints."
echo ""
echo "To close completed issues, run:"
echo '  for i in $(gh issue list --repo mashbean/IELTS-writing-exercise --label "Sprint #1" --state open --json number -q ".[0:11].number"); do gh issue close $i --repo mashbean/IELTS-writing-exercise; done'
