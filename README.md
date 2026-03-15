# IELTS Writing Studio

本專案是一個本機可執行的 IELTS Writing 練習頁面，前端與本機後端都在同一個 repo，重點功能如下：

- 每日指定時間提醒練習
- 內建 `20` 題 IELTS Writing Task 1 與 `20` 題 Task 2 題庫
- Task 1 可隨機抽題並顯示本地示意圖表
- 依照 `Introduction / Overview / Body 1 / Body 2` 的直向句子流程寫作
- 每個欄位提供可直接插入的句型起手式
- 完成後可用本機後端呼叫 OpenAI API，進行 AI 批改
- 若未設定 API key，會自動退回本地規則引擎批改
- 匯出可匯入 Anki 的 TSV 卡片
- API key 只放在本機 `.env`，不進前端，也不應提交到 GitHub

## 如何執行

先準備本機環境變數：

```bash
git clone https://github.com/mashbean/IELTS-writing-exercise.git
cd IELTS-writing-exercise
cp .env.example .env
```

在 `.env` 裡填入你的 OpenAI API key。預設模型是 `gpt-5.2`，並使用 `reasoning.effort=high`。這裡的「thinking」是透過 reasoning 參數控制，不是另外一個前端可見的模型代號。

然後啟動本機後端：

```bash
python3 ielts_writing_server.py
```

如果你在 macOS 上遇到 SSL 憑證錯誤，這個後端會優先使用 `certifi` 提供的 CA bundle。你目前的 Python 環境若沒有 `certifi`，再額外安裝即可：

```bash
python3 -m pip install certifi
```

如果你的本機 Python 憑證鏈還是有問題，可以先用這個方式強制指定 CA bundle：

```bash
SSL_CERT_FILE=$(python3 -c "import certifi; print(certifi.where())") python3 ielts_writing_server.py
```

若你只是要先確認 OpenAI 路徑有沒有通，最後才使用這個僅限本機除錯的暫時方案：

```bash
OPENAI_ALLOW_INSECURE_SSL=1 python3 ielts_writing_server.py
```

這會關閉 TLS 驗證，不建議長期使用。

最後在瀏覽器打開：

```text
http://127.0.0.1:8787
```

## 目前版本的限制

- 自動提醒依賴瀏覽器通知與頁面內計時器。頁面沒有開著時，不能保證準時跳出。
- Task 2 目前先提供題庫、句型提示與自由寫作區，主評分流程仍集中在 Task 1。
- 若 `OPENAI_API_KEY` 未設定、網路不可用或 OpenAI API 呼叫失敗，系統會退回本地規則引擎。

## 下一步可擴充

- 導入你之後提供的 `error / correction` 資料，讓評分與改寫規則更貼近你的常見錯誤。
- 補完整的 Task 2 評分與模板系統。
- 若你要真正做到「即使沒開頁面也能定時跳提醒」，建議把這個前端包成 Electron 或 Tauri 桌面版。
