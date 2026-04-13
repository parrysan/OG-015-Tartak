---
title: "OG-015-Tartak — Local Sawmill / Timber Supplier Website"
type: project-bootstrap
created: "2026-04-06"
---

# OG-015-Tartak — Local Sawmill / Timber Supplier Website

> **Bootstrap order — read these in order before doing any work in this project:**
>
> 1. `~/.claude/CLAUDE.md` → `Open-Memory-Vault/system/identity/MASTER-PROMPT.md` — Phil's identity (auto-loaded via symlink in Claude Code; other tools should mirror this).
> 2. `~/AGENT.md` → `agent-config/AGENT.md` — global operating manual (work style, skills routing, secrets policy, layering rules in §2.10).
> 3. `Open-Memory-Vault/AGENTS.md` — vault operating contract (read **only** if you will write to the vault during this session).
> 4. `Open-Memory-Vault/projects/OG-015-Tartak/README.md` — durable project page (status, decisions, recent activity, vault-side context).
> 5. **This file (`CLAUDE.md`)** — project-specific overrides and live operational references (below).
>
> **The project's `CLAUDE.md` is a bootstrap manifest, not a knowledge dump.** It points at everything else. Durable knowledge lives in the vault project page. Do not duplicate.

---

## At a glance

- **Code**: `OG-015`
- **Name**: Local Sawmill / Timber Supplier Website
- **Stakeholder**: Local business (Tartak)
- **Status**: `active`
- **Priority**: `medium`
- **Revenue lane**: `1-service`
- **Purpose** (one sentence): Website for a local timber supplier / sawmill in Poland.
- **Last touched**: `2026-04-13`

---

## Where things live

| Resource | Location |
|---|---|
| **Code root** | this folder (`dev/OG-015-Tartak/`) |
| **Project docs** | `./docs/` |
| **Vault project page** | `Open-Memory-Vault/projects/OG-015-Tartak/README.md` |
| **GitHub repo** | https://github.com/parrysan/OG-015-Tartak |
| **External systems** | none |

---

## Live references

> **Operational facts that should never have to be re-discovered.** Deployed URLs, store handles, theme IDs, API endpoints, credentials *location* (never the credentials themselves — those live in the global `.env`, see global AGENT.md §2.5). Update this section whenever a fact changes — it is the canonical source.

- **Production URL**: TBD
- **Staging / preview URL**: none
- **Platform handle / project ID**: TBD (Firebase project ID)
- **Other identifiers**: none
- **Credentials**: stored in global `.env`
- **Hosting**: Firebase Hosting

---

## Tech stack

Inherits OS-000-Design-System defaults (see global AGENT.md §2.7):
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + OS-000 design tokens
- **Components**: OS-000 shared component library
- **Hosting**: Firebase Hosting
- **Backend**: Firebase (Functions / Firestore as needed)

Overrides: none yet — add project-specific overrides here as they emerge.

---

## Project-specific rules

> Domain rules, naming conventions, "do not" lists. Anything an LLM working in this project must know that isn't true globally.

- Content needs Polish language support — this is a local Polish business.

---

## Skills

> List any project-specific skills in `./.claude/skills/`. If none, the project uses the global library at `agent-config/skills/`. Do not duplicate the global skills inventory here — see global AGENT.md §2.2.

- **Project-local skills**: none — uses global library
- **Most relevant global skills for this project**: `frontend-design`, `ui-ux-pro-max`, `brainstorming`

---

## Notes for the next session

> **Optional, ephemeral.** A 2–3 line free-form scratch pad of "where I left off" — not durable knowledge. Durable decisions belong in the vault project page. Wipe and rewrite freely.

Last action: Migrated CLAUDE.md to canonical template (2026-04-13). Next action: Initialize git repo, confirm build commands, begin development. Open question: Tech stack confirmed as Next.js + Firebase — needs build command verification.
