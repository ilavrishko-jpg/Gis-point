#!/usr/bin/env python3
"""Provision the GIS-Point Operations project in Plane from a declarative config.

The script is idempotent: it creates what is missing, updates what drifted and
leaves everything else alone, so it is safe to re-run after editing config.json.

Usage:
    export PLANE_API_KEY=plane_api_...          # Profile settings -> API tokens
    export PLANE_BASE_URL=https://api.plane.so  # self-hosted: https://plane.your-domain
    python3 plane_setup.py --dry-run            # show the plan, change nothing
    python3 plane_setup.py                      # apply it

The workspace slug comes from config.json, or from PLANE_WORKSPACE_SLUG.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_BASE_URL = "https://api.plane.so"
STATE_GROUPS = {"backlog", "unstarted", "started", "completed", "cancelled"}
PRIORITIES = {"urgent", "high", "medium", "low", "none"}
ROLES = {"admin": 20, "member": 15, "guest": 5}


class PlaneError(RuntimeError):
    pass


class Plane:
    def __init__(self, base_url: str, api_key: str, dry_run: bool = False):
        self.base = base_url.rstrip("/")
        self.api_key = api_key
        self.dry_run = dry_run

    # --- transport -------------------------------------------------------
    def _request(self, method: str, path: str, body=None, retries: int = 4):
        url = f"{self.base}/api/v1{path}"
        payload = json.dumps(body).encode() if body is not None else None
        for attempt in range(retries + 1):
            req = urllib.request.Request(url, data=payload, method=method)
            req.add_header("X-API-Key", self.api_key)
            req.add_header("Accept", "application/json")
            if payload is not None:
                req.add_header("Content-Type", "application/json")
            try:
                with urllib.request.urlopen(req, timeout=60) as resp:
                    raw = resp.read()
                    return json.loads(raw) if raw else None
            except urllib.error.HTTPError as exc:
                detail = exc.read().decode(errors="replace")
                if exc.code in (429, 500, 502, 503, 504) and attempt < retries:
                    time.sleep(2 ** attempt)
                    continue
                raise PlaneError(f"{method} {url} -> HTTP {exc.code}: {detail}") from None
            except urllib.error.URLError as exc:
                if attempt < retries:
                    time.sleep(2 ** attempt)
                    continue
                raise PlaneError(f"{method} {url} -> {exc.reason}") from None
        raise PlaneError(f"{method} {url} -> exhausted retries")

    def get_all(self, path: str):
        """GET every page of a Plane cursor-paginated collection."""
        items, cursor = [], None
        while True:
            page_path = path
            if cursor:
                sep = "&" if "?" in page_path else "?"
                page_path = f"{page_path}{sep}cursor={urllib.parse.quote(cursor)}"
            data = self._request("GET", page_path)
            if isinstance(data, list):
                items.extend(data)
                break
            items.extend(data.get("results", []))
            if data.get("next_page_results") and data.get("next_cursor"):
                cursor = data["next_cursor"]
            else:
                break
        return items

    def write(self, method: str, path: str, body: dict, what: str):
        if self.dry_run:
            print(f"  [dry-run] {method} {path} :: {what}")
            return {}
        result = self._request(method, path, body)
        print(f"  {method} ok :: {what}")
        return result or {}


# --- provisioning steps --------------------------------------------------

def ensure_project(plane: Plane, slug: str, spec: dict) -> dict:
    projects = plane.get_all(f"/workspaces/{slug}/projects/")
    identifier = spec["identifier"].upper()
    for project in projects:
        if project.get("identifier", "").upper() == identifier or project.get("name") == spec["name"]:
            print(f"Project already exists: {project['name']} ({project.get('identifier')}) id={project['id']}")
            return project
    print(f"Creating project {spec['name']} ({identifier})")
    created = plane.write(
        "POST",
        f"/workspaces/{slug}/projects/",
        {
            "name": spec["name"],
            "identifier": identifier,
            "description": spec.get("description", ""),
            "network": spec.get("network", 2),
        },
        spec["name"],
    )
    if plane.dry_run:
        return {"id": "<dry-run-project-id>", "name": spec["name"], "identifier": identifier}
    return created


def ensure_states(plane: Plane, slug: str, project_id: str, specs: list[dict], prune: bool) -> dict:
    base = f"/workspaces/{slug}/projects/{project_id}/states/"
    existing = {s["name"].casefold(): s for s in plane.get_all(base)} if not _is_placeholder(project_id) else {}
    by_name = {}
    print("States:")
    for index, spec in enumerate(specs):
        if spec["group"] not in STATE_GROUPS:
            raise PlaneError(f"state '{spec['name']}': unknown group '{spec['group']}' (allowed: {sorted(STATE_GROUPS)})")
        current = existing.get(spec["name"].casefold())
        body = {
            "name": spec["name"],
            "group": spec["group"],
            "color": spec.get("color", "#8B8D98"),
            "description": spec.get("description", ""),
            "sequence": (index + 1) * 1000,
        }
        if current is None:
            by_name[spec["name"]] = plane.write("POST", base, body, f"create state '{spec['name']}'").get("id")
        else:
            by_name[spec["name"]] = current["id"]
            drift = {k: v for k, v in body.items() if k != "sequence" and current.get(k) != v}
            if drift:
                plane.write("PATCH", f"{base}{current['id']}/", body, f"update state '{spec['name']}' ({', '.join(drift)})")
            else:
                print(f"  state '{spec['name']}' already correct")
    if prune:
        wanted = {s["name"].casefold() for s in specs}
        for name, state in existing.items():
            if name in wanted:
                continue
            try:
                plane.write("DELETE", f"{base}{state['id']}/", {}, f"remove leftover state '{state['name']}'")
            except PlaneError as exc:
                print(f"  could not remove state '{state['name']}' (it probably still holds work items): {exc}")
    return by_name


def ensure_labels(plane: Plane, slug: str, project_id: str, specs: list[dict]) -> dict:
    base = f"/workspaces/{slug}/projects/{project_id}/labels/"
    existing = {l["name"].casefold(): l for l in plane.get_all(base)} if not _is_placeholder(project_id) else {}
    by_name = {}
    print("Labels:")
    for spec in specs:
        current = existing.get(spec["name"].casefold())
        body = {"name": spec["name"], "color": spec.get("color", "#8B8D98")}
        if current is None:
            by_name[spec["name"]] = plane.write("POST", base, body, f"create label '{spec['name']}'").get("id")
        elif current.get("color") != body["color"]:
            by_name[spec["name"]] = current["id"]
            plane.write("PATCH", f"{base}{current['id']}/", body, f"recolor label '{spec['name']}'")
        else:
            by_name[spec["name"]] = current["id"]
            print(f"  label '{spec['name']}' already correct")
    return by_name


def ensure_members(plane: Plane, slug: str, project_id: str, specs: list[dict]) -> None:
    print("Members:")
    if not specs:
        print("  no members listed in config.json - add them under \"members\" and re-run")
        return
    try:
        workspace_members = plane.get_all(f"/workspaces/{slug}/members/")
    except PlaneError as exc:
        print(f"  cannot read the workspace member list via the API: {exc}")
        _member_fallback(specs)
        return

    by_email = {}
    for entry in workspace_members:
        member = entry.get("member") or entry
        email = (member.get("email") or entry.get("email") or "").casefold()
        if email:
            by_email[email] = member.get("id") or entry.get("member_id") or entry.get("id")

    already_on_project = set()
    if not _is_placeholder(project_id):
        try:
            for entry in plane.get_all(f"/workspaces/{slug}/projects/{project_id}/members/"):
                member = entry.get("member") or entry
                already_on_project.add(entry.get("member_id") or member.get("id") or entry.get("id"))
        except PlaneError:
            pass  # not fatal: the add call below is an upsert

    payload, missing = [], []
    for spec in specs:
        email = spec["email"].casefold()
        role = ROLES.get(str(spec.get("role", "member")).casefold())
        if role is None:
            raise PlaneError(f"member '{spec['email']}': unknown role '{spec.get('role')}' (allowed: {sorted(ROLES)})")
        member_id = by_email.get(email)
        if member_id is None:
            missing.append(spec["email"])
        elif member_id in already_on_project:
            print(f"  {spec['email']} is already on the project")
        else:
            payload.append({"member_id": member_id, "role": role})

    if missing:
        print("  not workspace members yet, invite them first in Plane -> Workspace settings -> Members:")
        for email in missing:
            print(f"    - {email}")
    if payload:
        try:
            plane.write(
                "POST",
                f"/workspaces/{slug}/projects/{project_id}/members/",
                {"members": payload},
                f"add {len(payload)} member(s) to the project",
            )
        except PlaneError as exc:
            print(f"  the API refused the project-member call: {exc}")
            _member_fallback(specs)


def _member_fallback(specs: list[dict]) -> None:
    print("  add them by hand: Plane -> project -> Settings -> Members -> Add member")
    for spec in specs:
        print(f"    - {spec['email']} as {spec.get('role', 'member')}")


def seed_issues(plane: Plane, slug: str, project_id: str, specs: list[dict], states: dict, labels: dict) -> None:
    base = f"/workspaces/{slug}/projects/{project_id}/issues/"
    existing = {i["name"].casefold() for i in plane.get_all(base)} if not _is_placeholder(project_id) else set()
    print("Seed work items:")
    if not specs:
        print("  none configured")
        return
    for spec in specs:
        if spec["name"].casefold() in existing:
            print(f"  work item '{spec['name']}' already exists")
            continue
        priority = str(spec.get("priority", "none")).casefold()
        if priority not in PRIORITIES:
            raise PlaneError(f"work item '{spec['name']}': unknown priority '{priority}' (allowed: {sorted(PRIORITIES)})")
        state_id = states.get(spec["state"]) if spec.get("state") else None
        if spec.get("state") and state_id is None:
            raise PlaneError(f"work item '{spec['name']}': state '{spec['state']}' is not defined in config.json")
        label_ids = []
        for label in spec.get("labels", []):
            if label not in labels:
                raise PlaneError(f"work item '{spec['name']}': label '{label}' is not defined in config.json")
            label_ids.append(labels[label])
        body = {
            "name": spec["name"],
            "description_html": f"<p>{spec.get('description', '')}</p>",
            "priority": priority,
        }
        if state_id:
            body["state"] = state_id
        if label_ids:
            body["labels"] = label_ids
        plane.write("POST", base, body, f"create work item '{spec['name']}'")


def _is_placeholder(project_id: str) -> bool:
    return str(project_id).startswith("<dry-run")


# --- entry point ---------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="Provision a Plane project from config.json")
    parser.add_argument("--config", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.json"))
    parser.add_argument("--dry-run", action="store_true", help="print the plan without writing anything")
    parser.add_argument("--prune-states", action="store_true",
                        help="delete states that are not in config.json (fails safely if they still hold work items)")
    parser.add_argument("--skip-seed", action="store_true", help="do not create the example work items")
    args = parser.parse_args()

    api_key = os.environ.get("PLANE_API_KEY")
    if not api_key:
        print("PLANE_API_KEY is not set. Create one in Plane under Profile settings -> API tokens.", file=sys.stderr)
        return 2

    with open(args.config, encoding="utf-8") as handle:
        cfg = json.load(handle)

    slug = os.environ.get("PLANE_WORKSPACE_SLUG") or cfg.get("workspace_slug", "")
    if not slug or slug == "REPLACE_ME":
        print("Set the workspace slug in config.json or via PLANE_WORKSPACE_SLUG "
              "(it is the part after the host in your Plane URL).", file=sys.stderr)
        return 2

    base_url = os.environ.get("PLANE_BASE_URL", DEFAULT_BASE_URL)
    plane = Plane(base_url, api_key, dry_run=args.dry_run)
    print(f"Plane: {base_url} | workspace: {slug}{' | DRY RUN' if args.dry_run else ''}\n")

    try:
        project = ensure_project(plane, slug, cfg["project"])
        project_id = project["id"]
        states = ensure_states(plane, slug, project_id, cfg["states"], args.prune_states)
        labels = ensure_labels(plane, slug, project_id, cfg["labels"])
        ensure_members(plane, slug, project_id, cfg.get("members", []))
        if not args.skip_seed:
            seed_issues(plane, slug, project_id, cfg.get("seed_issues", []), states, labels)
    except PlaneError as exc:
        print(f"\nFailed: {exc}", file=sys.stderr)
        return 1

    print(f"\nDone. Board: {base_url.replace('api.plane.so', 'app.plane.so')}/{slug}/projects/{project_id}/issues/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
