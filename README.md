# IELTS Writing Studio

本專案是一個純前端、本機可執行的 IELTS Writing 練習頁面，重點功能如下：

- 每日指定時間提醒練習
- 內建 IELTS Writing Task 1 歷屆風格題庫，可隨機抽題並顯示本地示意圖表
- 依照 `Introduction / Overview / Body 1 / Body 2` 的直向句子流程寫作
- 每個欄位提供可直接插入的句型起手式
- 完成後以本地規則引擎產生中文 Band Score 分析、修正建議、逐區塊差異對比
- 匯出可匯入 Anki 的 TSV 卡片

## 如何執行

建議用本機伺服器開啟，因為瀏覽器通知在 `file://` 下通常不可用：

```bash
cd /Users/mashbean/Codex/IELTS\ Writing
python3 -m http.server 8787
```

然後在瀏覽器打開：

```text
http://127.0.0.1:8787
```

## 目前版本的限制

- 自動提醒依賴瀏覽器通知與頁面內計時器。頁面沒有開著時，不能保證準時跳出。
- 評分與 Band 7.5 範本目前是本地規則引擎生成，不是雲端 AI 批改。
- Task 2 目前先提供解鎖流程與自由寫作區，主評分流程先集中在 Task 1。

## 下一步可擴充

- 導入你之後提供的 `error / correction` 資料，讓評分與改寫規則更貼近你的常見錯誤。
- 補完整的 Task 2 評分與模板系統。
- 若你要真正做到「即使沒開頁面也能定時跳提醒」，建議把這個前端包成 Electron 或 Tauri 桌面版。
