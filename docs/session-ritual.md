# Ritual de sessão (referência rápida)

Resumo operacional do [`../FRAMEWORK.md`](../FRAMEWORK.md).

## Abrir
1. Ler `README.md` + `roadmap/status.md` (bloco "AGORA" primeiro) **+ `current_sessions/`** (sessões ativas).
2. Escolher o(s) ID(s) que vai tocar (não-reservados por outra sessão). Trabalho novo sem ID → criar a linha antes.
3. Registrar a sessão em `current_sessions/<session-id>.md` + abrir branch/worktree.

## Durante
- Todo trabalho amarrado a um ID, em branch/worktree própria (nunca direto na `main`). Decisão de design →
  spec em `specs/`. Plano → `plans/`.

## Fechar
1. PR da branch → `main`. Atualizar a linha: status + evidência (PR/commit/ADR) + nota curta.
2. Atualizar o bloco "AGORA" se a prioridade mudou.
3. Commit/PR referenciando o ID; arquivar o session-file em `current_sessions/_archive/`.

## Adapter Claude Code (opcional)
No `CLAUDE.md` do seu projeto, adicione algo como:
> "Hub de status = `<este-repo>/roadmap/status.md` (fonte canônica). Ler `FRAMEWORK.md` no início de
> sessões de trabalho; atualizar `status.md` (status + evidência) ao fim."

O mesmo padrão serve pra Cursor (`.cursorrules`), Aider, ou qualquer agente que leia/escreva arquivos.
O core do Paddock é agnóstico — markdown + git.

## Concorrência (multi-sessão)
Vários agentes/devs ao mesmo tempo: cada sessão usa **branch/worktree própria** + registra um claim em
**`current_sessions/`** (1 arquivo por sessão, dono único → zero colisão no `status.md`). `main` só por PR
(branch protection server-side onde der; senão o hook `bash tools/install-guard.sh`). Protocolo completo:
[`parallel-sessions.md`](parallel-sessions.md).
