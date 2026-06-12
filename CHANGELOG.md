# Changelog

## v1.1.0 — 2026-06-12
Protocolo de **sessões paralelas** (multi-agente / multi-dev).
- `current_sessions/` — estado vivo, 1 arquivo por sessão (dono único → zero colisão no `status.md`);
  README + `_template.md` + `_archive/`.
- FRAMEWORK: ritual abrir/durante/fechar atualizado (registrar claim → branch/worktree → arquivar) +
  seção *Sessões paralelas* (dois planos vivo×durável).
- Regra dura **sem commit direto na `main`** com enforcement: branch protection server-side (público) ou
  git hook local `tools/hooks/pre-push` + `tools/install-guard.sh` (instala no workspace; `setup.sh` já roda).
- Doc dedicada `docs/parallel-sessions.md` (lifecycle + enforcement) + adapter `AGENTS.md` atualizado.

## v1.0.0 — 2026-06-11
Primeira versão pública oficial.
- Status canônico evidência-ou-nada + ritual de sessão (FRAMEWORK).
- Guardrails de entrega: DoR / DoD + git stance (trunk-based) + templates.
- Memória estruturada: specs / plans / decisions / audits / product.
- Tooling bash near-zero-dep: `report.sh` (panorama) + `lint-status.sh` (integridade).
- Topologia de workspace (`~/workspace/` + `_knowledge/` intake) + ritual de ingest (refinaria).
- Adapter cross-agent `AGENTS.md` (Copilot/Cursor/Codex/Claude) gerado pelo `setup.sh`.
- Cross-OS (Linux/macOS nativo; Windows via Git Bash/WSL).
- Apache-2.0.
