"""Інструменти редагування Google Таблиць (Sheets API v4)."""

from __future__ import annotations

from typing import Any

from googleapiclient.errors import HttpError

from .auth import sheets_service


def register(mcp) -> None:
    @mcp.tool()
    def sheets_list_sheets(spreadsheet_id: str) -> dict[str, Any]:
        """Список аркушів таблиці: назва, sheetId, розмір сітки."""
        try:
            meta = (
                sheets_service()
                .spreadsheets()
                .get(spreadsheetId=spreadsheet_id)
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        sheets = []
        for sh in meta.get("sheets", []):
            props = sh.get("properties", {})
            grid = props.get("gridProperties", {})
            sheets.append(
                {
                    "title": props.get("title"),
                    "sheet_id": props.get("sheetId"),
                    "rows": grid.get("rowCount"),
                    "columns": grid.get("columnCount"),
                }
            )
        return {"spreadsheet_id": spreadsheet_id, "sheets": sheets}

    @mcp.tool()
    def sheets_read_range(spreadsheet_id: str, range: str) -> dict[str, Any]:
        """Прочитати значення з діапазону в нотації A1, напр. "Аркуш1!A1:D20"."""
        try:
            resp = (
                sheets_service()
                .spreadsheets()
                .values()
                .get(spreadsheetId=spreadsheet_id, range=range)
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"range": resp.get("range"), "values": resp.get("values", [])}

    @mcp.tool()
    def sheets_write_range(
        spreadsheet_id: str,
        range: str,
        values: list[list[Any]],
        value_input_option: str = "USER_ENTERED",
    ) -> dict[str, Any]:
        """Записати значення у діапазон (перезаписує клітинки).

        values — двовимірний масив рядків.
        value_input_option: "USER_ENTERED" (як ввід користувача, формули працюють)
        або "RAW" (без інтерпретації).
        """
        try:
            resp = (
                sheets_service()
                .spreadsheets()
                .values()
                .update(
                    spreadsheetId=spreadsheet_id,
                    range=range,
                    valueInputOption=value_input_option,
                    body={"values": values},
                )
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {
            "spreadsheet_id": spreadsheet_id,
            "updated_range": resp.get("updatedRange"),
            "updated_cells": resp.get("updatedCells"),
        }

    @mcp.tool()
    def sheets_append_rows(
        spreadsheet_id: str,
        range: str,
        values: list[list[Any]],
        value_input_option: str = "USER_ENTERED",
    ) -> dict[str, Any]:
        """Додати рядки в кінець таблиці (append) у межах діапазону/аркуша."""
        try:
            resp = (
                sheets_service()
                .spreadsheets()
                .values()
                .append(
                    spreadsheetId=spreadsheet_id,
                    range=range,
                    valueInputOption=value_input_option,
                    insertDataOption="INSERT_ROWS",
                    body={"values": values},
                )
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        updates = resp.get("updates", {})
        return {
            "spreadsheet_id": spreadsheet_id,
            "updated_range": updates.get("updatedRange"),
            "updated_rows": updates.get("updatedRows"),
        }

    @mcp.tool()
    def sheets_clear_range(spreadsheet_id: str, range: str) -> dict[str, Any]:
        """Очистити значення в діапазоні (форматування лишається)."""
        try:
            resp = (
                sheets_service()
                .spreadsheets()
                .values()
                .clear(spreadsheetId=spreadsheet_id, range=range, body={})
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"spreadsheet_id": spreadsheet_id, "cleared_range": resp.get("clearedRange")}

    @mcp.tool()
    def sheets_batch_update(
        spreadsheet_id: str, requests: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """Виконати довільний масив запитів Sheets API batchUpdate.

        Для форматування, умовного форматування, сортування, вставки/видалення
        рядків і стовпців тощо. requests — згідно з документацією Sheets API.
        """
        try:
            resp = (
                sheets_service()
                .spreadsheets()
                .batchUpdate(spreadsheetId=spreadsheet_id, body={"requests": requests})
                .execute()
            )
        except HttpError as exc:
            return {"error": str(exc)}
        return {"spreadsheet_id": spreadsheet_id, "replies": resp.get("replies", [])}
