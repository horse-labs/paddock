# Security Policy

## Reporting a vulnerability
Please **do not open a public issue** for security problems.

Report privately via **[GitHub Security Advisories](https://github.com/horse-labs/paddock/security/advisories/new)**
(Report a vulnerability). We aim to acknowledge within a few business days and will coordinate a fix and
disclosure with you.

## Supported versions
Paddock is a template repository on a rolling `main`. Security fixes land on `main` and the latest release.

| Version | Supported |
|---|:--:|
| `main` / latest release | ✅ |
| older tags | ❌ |

## Threat model (what Paddock is, and isn't)
Paddock has a deliberately **tiny attack surface**:
- **No server, no database, no secrets, no runtime dependencies.** It's markdown + a few `bash` scripts you
  run locally, plus a static landing page.
- The scripts (`tools/report.sh`, `tools/lint-status.sh`, `setup.sh`) run **on your machine, on your own files** —
  they don't `eval`, fetch-and-execute, or process untrusted network input.
- The GitHub Actions workflows use **least-privilege permissions** and pin actions to **commit SHAs**
  (supply-chain hardening) — which also protects every repo created from this template.
- The landing site is static; its only external resource is the Google Fonts stylesheet.

## What to report
- A script doing something unexpected/unsafe on a user's machine.
- A workflow misconfiguration (excessive permissions, unpinned/compromisable action, injection).
- Anything in the template that could expose a downstream adopter.

## Hardening notes for adopters
- Your Paddock instance is a private repo — **never paste secrets/credentials in markdown**; reference them by link.
- Keep `_knowledge/` (raw intake) out of version control; it's local and may be sensitive.
