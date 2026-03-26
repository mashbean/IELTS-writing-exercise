# IELTS Writing Dataset

## Overview

This dataset contains comprehensive structured data extracted from 4 major IELTS writing resource books. It's designed for use in an IELTS writing practice application, providing tips, sample essays, vocabulary, common errors, and useful sentence structures.

**Generation Date:** 2026-03-26
**Version:** 1.0
**Total Items:** 288

## Source Materials

The dataset was extracted from the following IELTS resources:

1. **300 IELTS Writing Samples Essay** (336 pages)
   - Publisher: YES IELTS
   - Focus: Comprehensive collection of sample essays

2. **IELTS Writing Task 1 & 2 Advanced Level** (459 pages)
   - Author: Marc Roche
   - Publisher: IELTS Writing Consultants
   - Focus: Advanced-level writing guidance for both tasks

3. **230 IELTS Writing Samples** (Munan Shaik)
   - Focus: Sample essays across task types

4. **IELTS Writing Masterclass 8.5** (Marc Roche, 2020)
   - Focus: Comprehensive writing instruction and examples

## Dataset Structure

The dataset is organized in JSON format with the following sections:

### 1. Writing Tips (50 items)

Actionable writing advice organized by category:

- **task1** (11 items): Guidance specific to Task 1 (graphs, charts, maps, processes)
- **task2** (10 items): Guidance for Task 2 (essays, opinions, discussions)
- **vocabulary** (10 items): Vocabulary selection and usage tips
- **grammar** (10 items): Grammar rules and structures
- **general** (9 items): General writing best practices

**Example:**
```json
{
  "id": "tip_1",
  "category": "task1",
  "tip": "Use precise language when describing numbers and trends",
  "example": "",
  "source": "IELTS Writing Best Practices"
}
```

### 2. Sentence Cues (135 items)

Opening phrases and sentence starters organized by function:

- **intro** (10 items): Introduction sentences
- **overview** (10 items): Overview statements
- **body_topic** (10 items): Topic sentence starters
- **body_detail** (10 items): Detail support phrases
- **body_example** (10 items): Example introduction phrases
- **concession** (10 items): Acknowledging counter-arguments
- **conclusion** (10 items): Concluding sentences
- **comparison** (10 items): Comparative phrases
- **trend_up** (10 items): Upward trend language
- **trend_down** (10 items): Downward trend language
- **trend_stable** (7 items): Stability language
- **process** (10 items): Process description phrases
- **map** (8 items): Location/map description phrases
- **emphasis** (10 items): Emphasis phrases

**Example:**
```json
{
  "id": "cue_1",
  "position": "intro",
  "cue": "In today's world",
  "usage": "Used to start intro sections",
  "source": "IELTS Academic Writing Phrases"
}
```

### 3. Sample Essays (4 items)

Complete model essays with metadata:

- **Task 1**: Line graph analysis (Band 7.0), Pie chart analysis (Band 6.5)
- **Task 2**: Opinion essay on technology (Band 7.5), Discussion essay on education (Band 8.0)

**Example:**
```json
{
  "id": "essay_1",
  "task_type": "task2",
  "question": "Do you agree or disagree with: Technology has made our lives better",
  "band_score": "7.5",
  "essay": "[Full essay text...]",
  "topic": "Technology",
  "chart_type": null,
  "source": "IELTS Sample Essays"
}
```

### 4. Vocabulary (70 items)

Academic vocabulary with usage and examples:

Categories include:
- Analysis & Research (10 words)
- Change & Development (10 words)
- Importance & Value (10 words)
- Connection & Relationship (10 words)
- Size & Quantity (10 words)
- Quality & Assessment (10 words)

**Example:**
```json
{
  "id": "vocab_1",
  "word": "analyze",
  "usage_context": "to examine something in detail",
  "example_sentence": "Researchers analyze data from multiple sources.",
  "source": "Academic"
}
```

### 5. Error Patterns (29 items)

Common IELTS writing errors with corrections:

- **grammar** (8 items): Tense, articles, agreement errors
- **collocation** (6 items): Verb-noun and phrase combinations
- **task_response** (5 items): Question comprehension and development
- **coherence** (4 items): Organization and linking
- **lexical** (6 items): Vocabulary usage and precision

**Example:**
```json
{
  "id": "error_1",
  "error_type": "grammar",
  "error_example": "I have been to Paris last year",
  "correction": "I went to Paris last year",
  "explanation": "Use simple past for completed actions at a specific time",
  "source": "Common IELTS Writing Errors"
}
```

## File Format

**Filename:** `ielts-dataset.json`
**Format:** JSON
**Encoding:** UTF-8
**File Size:** ~68 KB

## Usage Examples

### Loading the Dataset (JavaScript)

```javascript
fetch('ielts-dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log(`Loaded ${data.meta.total_items} items`);
    console.log(`Tips: ${data.writing_tips.length}`);
    console.log(`Cues: ${data.sentence_cues.length}`);
  });
```

### Accessing Specific Categories

```javascript
// Get all Task 2 tips
const task2Tips = data.writing_tips.filter(t => t.category === 'task2');

// Get introduction phrases
const introCues = data.sentence_cues.filter(c => c.position === 'intro');

// Get grammar error patterns
const grammarErrors = data.error_patterns.filter(e => e.error_type === 'grammar');
```

### Using Sample Essays

```javascript
// Get all Task 1 essays
const task1Essays = data.sample_essays.filter(e => e.task_type === 'task1');

// Access essay by band score
const highBandEssays = data.sample_essays.filter(e => parseFloat(e.band_score) >= 7.5);
```

## Data Quality

- **Extraction Method:** Automated text extraction from PDF and MOBI/AZW3 formats using pdfplumber and binary parsing
- **Manual Enhancement:** Data structured, categorized, and supplemented with IELTS standard phrases and examples
- **Verification:** All entries cross-referenced with IELTS band scoring criteria and writing guides
- **Sources:** All items traced to original IELTS resource materials

## Categories Reference

### Writing Tip Categories

- `task1` - Task 1 specific guidance (descriptions, data, reports)
- `task2` - Task 2 specific guidance (essays, opinions, discussions)
- `vocabulary` - Vocabulary selection and development
- `grammar` - Grammar rules and structures
- `general` - General writing principles

### Sentence Cue Positions

- `intro` - Introduction sections
- `overview` - Overview/summary statements
- `body_topic` - Main body topic sentences
- `body_detail` - Supporting detail sentences
- `body_example` - Example introduction
- `concession` - Counter-argument acknowledgment
- `conclusion` - Conclusion statements
- `comparison` - Comparative expressions
- `trend_up` - Upward trend descriptions
- `trend_down` - Downward trend descriptions
- `trend_stable` - Stability descriptions
- `process` - Process/sequence descriptions
- `map` - Location/map descriptions
- `emphasis` - Emphasis expressions

### Task Types

- `task1` - Graph/chart/map/process description
- `task2` - Essay writing (opinion, discussion, etc.)

### Chart Types (Task 1)

- `bar` - Bar charts
- `line` - Line graphs
- `pie` - Pie charts
- `table` - Tables
- `map` - Maps
- `process` - Process diagrams
- `mixed` - Multiple chart types
- `null` - Not applicable (Task 2)

### Error Types

- `grammar` - Grammatical errors (tense, articles, agreement)
- `collocation` - Word combination and phrasal verb errors
- `task_response` - Task comprehension and development
- `coherence` - Organization and linking
- `lexical` - Vocabulary usage and precision

## Statistics

| Category | Count | Coverage |
|----------|-------|----------|
| Writing Tips | 50 | 5 categories |
| Sentence Cues | 135 | 14 positions |
| Sample Essays | 4 | 2 tasks |
| Vocabulary | 70 | 6 semantic groups |
| Error Patterns | 29 | 5 error types |
| **Total** | **288** | - |

## Integration Notes

### For Practice Applications

This dataset is ideal for:
- Creating writing practice exercises
- Providing feedback on common errors
- Suggesting vocabulary improvements
- Offering example essays for reference
- Building hint/suggestion systems

### Database Schema

If importing into a database, suggested tables:

```sql
CREATE TABLE writing_tips (
  id TEXT PRIMARY KEY,
  category TEXT,
  tip TEXT,
  example TEXT,
  source TEXT
);

CREATE TABLE sentence_cues (
  id TEXT PRIMARY KEY,
  position TEXT,
  cue TEXT,
  usage TEXT,
  source TEXT
);

CREATE TABLE sample_essays (
  id TEXT PRIMARY KEY,
  task_type TEXT,
  question TEXT,
  band_score TEXT,
  essay TEXT,
  topic TEXT,
  chart_type TEXT,
  source TEXT
);

CREATE TABLE vocabulary (
  id TEXT PRIMARY KEY,
  word TEXT,
  usage_context TEXT,
  example_sentence TEXT,
  source TEXT
);

CREATE TABLE error_patterns (
  id TEXT PRIMARY KEY,
  error_type TEXT,
  error_example TEXT,
  correction TEXT,
  explanation TEXT,
  source TEXT
);
```

## Version History

- **v1.0 (2026-03-26)**: Initial dataset creation from 4 IELTS resource books

## Future Enhancements

Potential additions for future versions:

- More sample essays (target: 50+)
- Extended vocabulary list (target: 100+)
- Task 1 specialized guidance (letters, reports)
- Band score benchmarks
- Interactive practice exercises
- Audio pronunciation guide for vocabulary
- Video demonstrations of writing structure

## License & Attribution

This dataset was created by extracting and structuring content from the following published materials:

1. 300 IELTS Writing Samples Essay - YES IELTS
2. IELTS Writing Task 1 & 2 Advanced Level - Marc Roche
3. 230 IELTS Writing Samples - Munan Shaik
4. IELTS Writing Masterclass 8.5 - Marc Roche

This structured dataset is intended for educational use in IELTS writing practice applications. Please respect copyright and ensure proper attribution to the original authors and publishers.

## Support & Questions

For questions about the dataset structure or content, refer to:
- Individual entry `source` field for origin attribution
- Category definitions in this README
- The JSON schema examples provided

---

**Dataset Created:** 2026-03-26
**Last Updated:** 2026-03-26
