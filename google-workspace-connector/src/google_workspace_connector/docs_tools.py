"""Інструменти редагування Google Документів (Docs API v1)."""

from __future__ import annotations

from typing import Any

from googleapiclient.errors import HttpError

from .auth import docs_service


def _plain_text(document: dict) -> str:
    """Витягує звичайний текст із структури документа."""
    out: list[str] = []
    for element in document.get("body", {}).get("content", []):
        paragraph = element.get("paragraph")
        if not paragraph:
            continue
        for run in paragraph.get("elements", []):
            text_run = run.get("textRun")
            if text_run:
                out.append(text_run.get("content", ""))
    return "".join(out)


def _end_index(document: dict) -> int:
    """Останній індекс тіла документа (для дозапису в кінець)."""
    content = document.get("body", {}).get("content", [])
    if not content:
        return 1
    return content[-1].get("endIndex", 1)


def register(mcp) -> None:
    @mcp.tool()
    def docs_read_document(document_id: str) -> dict[str, Any]:
        """Прочитати Google Документ: заголовок і звичайний текст.

        document_id — ID документа (з URL /document/d/<ID>/edit).
        Повертає title, text та end_index (для позиціювання правок).
        """
        try:
            doc = docs_service().documents().get(documentId=document_id).execute()
        except HttpError as exc:
            return {"error": str(exc)}
        return {
            "document_id": document_id,
            "title": doc.get("title"),
            "text": _plain_text(doc),
            "end_index": _end_index(doc),
        }

    @mcp.tool()
    def docs_replace_text(
        document_id: str,
        find: str,
        replace: str,
        match_case: bool = False,
    ) -> dict[str, Any]:
        """Знайти й замінити ВЕСЬ збіг тексту в документі (find -> replace).

        Повертає кількість виконаних замін (occurrences_changed).
        """
        requests = [
            {
                "replaceAllText": {
                    "containsText": {"text": find, "matchCase": match_case},
                    "replaceText": replace,
                }
            }
        ]
        try:
            resp = (
                docs_service()
                .documents()
                .batchUpdate(documentId=document_id, body={"requests": requests})
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        changed = 0
        for reply in resp.get("replies", []):
            changed += reply.get("replaceAllText", {}).get("occurrencesChanged", 0)
        return {"document_id": document_id, "occurrences_changed": changed}

    @mcp.tool()
    def docs_insert_text(document_id: str, text: str, index: int = 1) -> dict[str, Any]:
        """Вставити текст у документ на позиції index (1 = початок тіла)."""
        requests = [{"insertText": {"location": {"index": index}, "text": text}}]
        try:
            docs_service().documents().batchUpdate(
                documentId=document_id, body={"requests": requests}
            ).execute()
        except HttpError as exc:
            return {"error": str(exc)}
        return {"document_id": document_id, "inserted": len(text), "at_index": index}

    @mcp.tool()
    def docs_append_text(document_id: str, text: str) -> dict[str, Any]:
        """Дозаписати текст у кінець документа."""
        try:
            doc = docs_service().documents().get(documentId=document_id).execute()
            index = max(1, _end_index(doc) - 1)
            requests = [{"insertText": {"location": {"index": index}, "text": text}}]
            docs_service().documents().batchUpdate(
                documentId=document_id, body={"requests": requests}
            ).execute()
        except HttpError as exc:
            return {"error": str(exc)}
        return {"document_id": document_id, "appended": len(text), "at_index": index}

    @mcp.tool()
    def docs_delete_range(
        document_id: str, start_index: int, end_index: int
    ) -> dict[str, Any]:
        """Видалити вміст у діапазоні індексів [start_index, end_index)."""
        requests = [
            {
                "deleteContentRange": {
                    "range": {"startIndex": start_index, "endIndex": end_index}
                }
            }
        ]
        try:
            docs_service().documents().batchUpdate(
                documentId=document_id, body={"requests": requests}
            ).execute()
        except HttpError as exc:
            return {"error": str(exc)}
        return {"document_id": document_id, "deleted_range": [start_index, end_index]}

    @mcp.tool()
    def docs_batch_update(
        document_id: str, requests: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """Виконати довільний масив запитів Docs API batchUpdate.

        Для складних правок (форматування, стилі, таблиці, зображення).
        requests — список об'єктів згідно з документацією Google Docs API.
        """
        try:
            resp = (
                docs_service()
                .documents()
                .batchUpdate(documentId=document_id, body={"requests": requests})
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"document_id": document_id, "replies": resp.get("replies", [])}
