"""Інструменти Drive: пошук файлів і створення нових Docs/Sheets."""

from __future__ import annotations

from typing import Any

from googleapiclient.errors import HttpError

from .auth import drive_service

DOC_MIME = "application/vnd.google-apps.document"
SHEET_MIME = "application/vnd.google-apps.spreadsheet"


def register(mcp) -> None:
    @mcp.tool()
    def drive_find_files(
        name_contains: str = "",
        mime_type: str = "",
        page_size: int = 20,
    ) -> dict[str, Any]:
        """Знайти файли на Диску за частиною назви та/або типом.

        mime_type приклади: "doc" -> Google Doc, "sheet" -> Google Sheet,
        або повний MIME-тип. Повертає id, name, mimeType, посилання.
        """
        alias = {"doc": DOC_MIME, "docs": DOC_MIME, "sheet": SHEET_MIME, "sheets": SHEET_MIME}
        mime = alias.get(mime_type.lower(), mime_type)

        clauses = ["trashed = false"]
        if name_contains:
            escaped = name_contains.replace("'", "\\'")
            clauses.append(f"name contains '{escaped}'")
        if mime:
            clauses.append(f"mimeType = '{mime}'")
        query = " and ".join(clauses)

        try:
            resp = (
                drive_service()
                .files()
                .list(
                    q=query,
                    pageSize=max(1, min(page_size, 100)),
                    fields="files(id, name, mimeType, modifiedTime, webViewLink)",
                    orderBy="modifiedTime desc",
                )
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"query": query, "files": resp.get("files", [])}

    @mcp.tool()
    def drive_create_document(title: str) -> dict[str, Any]:
        """Створити новий порожній Google Документ. Повертає його id і посилання."""
        try:
            file = (
                drive_service()
                .files()
                .create(
                    body={"name": title, "mimeType": DOC_MIME},
                    fields="id, name, webViewLink",
                )
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"document_id": file.get("id"), "name": file.get("name"), "link": file.get("webViewLink")}

    @mcp.tool()
    def drive_create_spreadsheet(title: str) -> dict[str, Any]:
        """Створити нову порожню Google Таблицю. Повертає її id і посилання."""
        try:
            file = (
                drive_service()
                .files()
                .create(
                    body={"name": title, "mimeType": SHEET_MIME},
                    fields="id, name, webViewLink",
                )
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"spreadsheet_id": file.get("id"), "name": file.get("name"), "link": file.get("webViewLink")}
