"""Автентифікація до Google Workspace API.

Підтримує два режими (обирається через змінні оточення):

1. OAuth (звичайний користувач) — редагування ваших власних Docs/Sheets.
   GOOGLE_OAUTH_CLIENT_SECRETS  шлях до client secrets JSON (OAuth "Desktop app").
   GOOGLE_OAUTH_TOKEN_PATH      куди кешувати виданий токен (типово token.json).

2. Service account (сервер/автоматизація, спільні диски, domain-wide delegation).
   GOOGLE_SERVICE_ACCOUNT_FILE  шлях до JSON ключа сервісного акаунта.
   GOOGLE_IMPERSONATE_SUBJECT   (необов'язково) email користувача для делегування.

Якщо задано GOOGLE_SERVICE_ACCOUNT_FILE — використовується service account,
інакше OAuth.
"""

from __future__ import annotations

import os
from functools import lru_cache

from googleapiclient.discovery import build

# Права доступу. documents/spreadsheets — редагування вмісту,
# drive — пошук і створення файлів.
SCOPES = [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]


def _oauth_credentials():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow

    token_path = os.environ.get("GOOGLE_OAUTH_TOKEN_PATH", "token.json")
    secrets_path = os.environ.get("GOOGLE_OAUTH_CLIENT_SECRETS", "credentials.json")

    creds = None
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(secrets_path):
                raise RuntimeError(
                    f"Не знайдено client secrets: {secrets_path}. "
                    "Створіть OAuth-клієнт типу 'Desktop app' у Google Cloud Console "
                    "і вкажіть шлях у GOOGLE_OAUTH_CLIENT_SECRETS."
                )
            flow = InstalledAppFlow.from_client_secrets_file(secrets_path, SCOPES)
            # Відкриє браузер для одноразового підтвердження доступу.
            creds = flow.run_local_server(port=0)
        with open(token_path, "w", encoding="utf-8") as fh:
            fh.write(creds.to_json())

    return creds


def _service_account_credentials():
    from google.oauth2 import service_account

    path = os.environ["GOOGLE_SERVICE_ACCOUNT_FILE"]
    creds = service_account.Credentials.from_service_account_file(path, scopes=SCOPES)
    subject = os.environ.get("GOOGLE_IMPERSONATE_SUBJECT")
    if subject:
        creds = creds.with_subject(subject)
    return creds


@lru_cache(maxsize=1)
def get_credentials():
    """Повертає (кешовані) креденшели за обраним режимом."""
    if os.environ.get("GOOGLE_SERVICE_ACCOUNT_FILE"):
        return _service_account_credentials()
    return _oauth_credentials()


@lru_cache(maxsize=1)
def docs_service():
    return build("docs", "v1", credentials=get_credentials(), cache_discovery=False)


@lru_cache(maxsize=1)
def sheets_service():
    return build("sheets", "v4", credentials=get_credentials(), cache_discovery=False)


@lru_cache(maxsize=1)
def drive_service():
    return build("drive", "v3", credentials=get_credentials(), cache_discovery=False)
