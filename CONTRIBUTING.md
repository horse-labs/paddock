# Contributing to Paddock

Thanks for your interest. Paddock is a small, opinionated, **zero-dependency** framework — contributions
that keep it simple and sharp are very welcome.

## Ways to help
- **Use it** on a real project and open an issue with what worked / what didn't (the most valuable feedback).
- **Report bugs** or rough edges (use the issue templates).
- **Propose improvements** to the methodology, the docs, or the tooling.
- **Fix** typos, broken links, or scripts.

## Ground rules
- Keep the **zero-dependency** ethos: `bash` + `git` + `gh` + POSIX (`awk`/`grep`/`sed`). No node/python runtime.
- Keep it **simple**. Paddock fights bloat; a feature that adds a manual step or a dependency needs a strong case.
- Cross-OS: scripts run on Linux/macOS natively and on Windows via **Git Bash/WSL** — don't add GNU-only flags.

## Dev workflow (we dogfood Paddock's own git stance)
1. **Branch** off `main`: `feat/<slug>` or `fix/<slug>` (short-lived).
2. Make the change. Run the checks:
   ```bash
   bash tools/lint-status.sh                 # status integrity
   shellcheck tools/*.sh setup.sh            # if you touched scripts
   ```
3. **Open a PR** (the PR template has a short checklist). CI runs shellcheck + lint + link-check.
4. Squash-merge once green.

## Definition of Done (for a PR)
- [ ] Change works and is verified (not "should work").
- [ ] Docs updated if behavior/usage changed.
- [ ] `tools/lint-status.sh` passes; scripts pass `shellcheck`; no broken links.
- [ ] No new dependency or required manual step (or it's justified in the PR).

## Commit messages
Short, imperative, conventional-ish: `feat: …`, `fix: …`, `docs: …`. Reference an issue/PR where relevant.

## Code of Conduct
By participating you agree to the [Code of Conduct](.github/CODE_OF_CONDUCT.md).

## Security
Found a vulnerability? Don't open a public issue — see [SECURITY.md](SECURITY.md).
