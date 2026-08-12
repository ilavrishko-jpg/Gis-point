"""MCP-сервер google-workspace-connector.

Реєструє інструменти редагування Google Docs, Sheets і Drive та
запускається через stdio (стандартний транспорт MCP для локальних клієнтів).
"""

from __future__ import annotations

from mcp.server.fastmcp import FastMCP

from . import docs_tools, drive_tools, sheets_tools

mcp = FastMCP("google-workspace-connector")

docs_tools.register(mcp)
sheets_tools.register(mcp)
drive_tools.register(mcp)


def main() -> None:
    mcp.run()


if __name__ == "__main__":
    main()
