# IELTS Practice Studio

本機可用的 IELTS 每日練習網頁，支援 Writing Task 1、Task 2 與 Speaking 三項練習。

## 功能一覽

- **每日三題**：基於日期自動產生不重複的 Task 1、Task 2、Speaking 題目
- **結構化寫作**：Task 1（9 步）、Task 2（5 步）結構化寫作流程，每步有句型提示 chip
- **口說練習**：Speaking Part 2 結構化準備 + 文字輸入模式
- **倒數計時器**：Task 1（20 分鐘）、Task 2（40 分鐘）、Speaking（3 分鐘）
- **LLM 分析**：逐句結構化分析（句型、錯誤分類、修正、cue 提示）
- **Band 7.5 改寫**：每次分析都生成完整 Band 7.5 參考版本
- **錯誤資料庫**：累積所有練習錯誤，支援篩選與瀏覽
- **Anki 匯出**：一鍵匯出 TSV 格式，可直接匯入 Anki
- **每日複習**：基於錯誤資料庫生成複習清單
- **離線可用**：前端完全本地，後端只在分析時需要網路

## 快速啟動

```bash
cd tools/ielts-writing
cp .env.example .env
```

在 `.env` 填入你的 API key（擇一即可）：

```
ANTHROPIC_API_KEY=sk-ant-...
# 或
OPENAI_API_KEY=sk-...
```

啟動伺服器：

```bash
python3 server.py
```

打開瀏覽器：

```
http://127.0.0.1:8787
```

## 技術架構

| 層 | 技術 | 說明 |
|---|---|---|
| 前端 | HTML + CSS + JS（單一檔案） | `app.html`，無外部依賴 |
| 後端 | Python `http.server` | `server.py`，無需安裝框架 |
| 資料庫 | SQLite | `ielts_practice.db`，自動建立 |
| LLM | Anthropic Claude / OpenAI | 優先 Claude，OpenAI 為 fallback |

## 資料庫 Schema

### practice_sessions
| 欄位 | 型別 | 說明 |
|---|---|---|
| id | INTEGER PK | 自動遞增 |
| date | TEXT | 練習日期 |
| task_type | TEXT | task1 / task2 / speaking |
| prompt_id | TEXT | 題目 ID |
| prompt_title | TEXT | 題目標題 |
| content | TEXT | 使用者輸入內容 |
| overall_band | REAL | 整體分數 |
| scores_json | TEXT | 四維分數 JSON |
| analysis_json | TEXT | 完整分析 JSON |
| created_at | TEXT | 建立時間 |

### error_bank
| 欄位 | 型別 | 說明 |
|---|---|---|
| id | INTEGER PK | 自動遞增 |
| session_id | INTEGER FK | 關聯 practice_sessions |
| task_type | TEXT | task1 / task2 / speaking |
| error_type | TEXT | grammar / collocation / sentence_pattern / awkward_phrasing / task_response / coherence / lexical / pronunciation_note |
| section | TEXT | 來源段落 |
| original | TEXT | 原文 |
| corrected | TEXT | 修正版 |
| explanation | TEXT | 說明 |
| severity | TEXT | low / medium / high |
| review_count | INTEGER | 複習次數 |
| next_review_date | TEXT | 下次複習日期 |
| created_at | TEXT | 建立時間 |

### daily_prompts
| 欄位 | 型別 | 說明 |
|---|---|---|
| date | TEXT PK | 日期 |
| task1_id | TEXT | 當日 Task 1 題目 ID |
| task2_id | TEXT | 當日 Task 2 題目 ID |
| speaking_id | TEXT | 當日 Speaking 題目 ID |

## Anki 匯出格式

TSV（Tab-Separated Values），每行三欄：

```
[error_type] original text    corrected text\n\nexplanation    ielts task_type error_type
```

匯入 Anki 時選擇「Tab」分隔，三欄分別對應 Front、Back、Tags。

## API 端點

| 方法 | 路徑 | 說明 |
|---|---|---|
| GET | `/api/health` | 健康檢查 |
| GET | `/api/daily-prompts?date=YYYY-MM-DD` | 每日題目 |
| POST | `/api/analyze` | 提交分析（主要功能） |
| GET | `/api/errors?type=grammar&limit=50` | 錯誤資料庫查詢 |
| GET | `/api/review` | 每日複習 |
| GET | `/api/stats` | 練習統計 |
| GET | `/api/anki-export` | 匯出 Anki TSV |

## 題庫

- **Task 1**：20 題（Bar Chart、Line Graph、Pie Chart、Map、Table、Process Diagram、Mixed Charts）
- **Task 2**：20 題（Discussion、Agree/Disagree、Advantages/Disadvantages、Causes/Solutions、Direct Question）
- **Speaking**：20 題（Part 2 長題，涵蓋 Hometown、Hobby、Travel、Technology 等主題）

## 今晚做到的

1. 可在本地啟動的完整網頁（`app.html`）
2. Python 後端 + SQLite 錯誤資料庫（`server.py`）
3. 每日三題自動出題（基於日期 seed）
4. 結構化寫作流程（Task 1 九步 / Task 2 五步 / Speaking 五點）
5. 倒數計時器（三種時長）
6. LLM 逐句分析 + Band 7.5 改寫（需 API key）
7. 錯誤累積 + 篩選瀏覽
8. Anki TSV 一鍵匯出
9. 每日複習清單

## 下一步可擴充

- 更完整的 SRS（間隔重複）整合
- 題庫擴充 / LLM 動態生成新題
- 更好的評分模型 / 多模型比較
- 語音辨識整合（目前以文字輸入為主）
- Electron / Tauri 桌面版（支援背景提醒）
- 歷史練習紀錄回顧與進步曲線
