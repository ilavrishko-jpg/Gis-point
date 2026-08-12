# Google Workspace Connector (MCP)

Конектор (MCP-сервер), через який AI-асистент **читає та редагує** ваші
Google Документи і Google Таблиці, а також шукає й створює файли на Диску.

На відміну від стандартного read-only конектора Google Drive, цей сервер
має **інструменти запису**: заміна тексту, вставка/видалення, оновлення
клітинок, форматування тощо.

## Можливості (інструменти)

**Google Docs**
- `docs_read_document` — прочитати заголовок і текст
- `docs_replace_text` — знайти й замінити текст
- `docs_insert_text` — вставити текст на позиції
- `docs_append_text` — дозаписати в кінець
- `docs_delete_range` — видалити діапазон
- `docs_batch_update` — довільні запити Docs API (форматування, таблиці, стилі)

**Google Sheets**
- `sheets_list_sheets` — список аркушів
- `sheets_read_range` — прочитати діапазон (A1)
- `sheets_write_range` — записати значення
- `sheets_append_rows` — додати рядки
- `sheets_clear_range` — очистити діапазон
- `sheets_batch_update` — довільні запити Sheets API (форматування, сортування…)

**Google Drive**
- `drive_find_files` — знайти файли за назвою/типом
- `drive_create_document` — створити новий Документ
- `drive_create_spreadsheet` — створити нову Таблицю

## Налаштування

### 1. Google Cloud
1. Створіть проєкт у [Google Cloud Console](https://console.cloud.google.com/).
2. Увімкніть API: **Google Docs API**, **Google Sheets API**, **Google Drive API**.
3. Створіть OAuth-клієнт типу **Desktop app** → завантажте JSON
   (це ваш `credentials.json`).
4. У розділі OAuth consent screen додайте себе в **Test users**.

> Для сервера/автоматизації замість OAuth можна використати **service account**
> (див. `.env.example`).

### 2. Встановлення

```bash
cd google-workspace-connector
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # і пропишіть шляхи до credentials.json
```

### 3. Перша авторизація (OAuth)

```bash
export GOOGLE_OAUTH_CLIENT_SECRETS=./credentials.json
export PYTHONPATH=src
python -m google_workspace_connector.server
```

Відкриється браузер — підтвердьте доступ. Токен збережеться у `token.json`
і надалі оновлюватиметься автоматично.

### 4. Підключення до клієнта

Скопіюйте `mcp-config.example.json` у конфіг вашого MCP-клієнта
(наприклад, Claude Desktop `claude_desktop_config.json`) і замініть шляхи
на абсолютні. Перезапустіть клієнт — інструменти `docs_*`, `sheets_*`,
`drive_*` стануть доступні.

## Безпека

- `credentials.json`, `token.json`, `service-account*.json` і `.env` **у
  `.gitignore`** — не комітьте їх.
- Права доступу (scopes) дозволяють редагування ваших Docs/Sheets/Drive.
  Відкликати доступ можна в
  [налаштуваннях акаунта Google](https://myaccount.google.com/permissions).

## ID документів

- Google Doc: з URL `.../document/d/<DOCUMENT_ID>/edit`
- Google Sheet: з URL `.../spreadsheets/d/<SPREADSHEET_ID>/edit`
- Діапазони Sheets — нотація A1, напр. `Аркуш1!A1:D20`.
