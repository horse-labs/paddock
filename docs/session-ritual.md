# Ritual de sessão (referência rápida)

Resumo operacional do [`../FRAMEWORK.md`](../FRAMEWORK.md).

## Abrir
1. Ler `README.md` + `roadmap/status.md` (bloco "AGORA" primeiro).
2. Escolher o(s) ID(s) que vai tocar. Trabalho novo sem ID → criar a linha antes.

## Durante
- Todo trabalho amarrado a um ID. Decisão de design → spec em `specs/`. Plano → `plans/`.

## Fechar
1. Atualizar a linha: status + evidência (PR/commit/ADR) + nota curta.
2. Atualizar o bloco "AGORA" se a prioridade mudou.
3. Commit referenciando o ID.

## Adapter Claude Code (opcional)
No `CLAUDE.md` do seu projeto, adicione algo como:
> "Hub de status = `<este-repo>/roadmap/status.md` (fonte canônica). Ler `FRAMEWORK.md` no início de
> sessões de trabalho; atualizar `status.md` (status + evidência) ao fim."

O mesmo padrão serve pra Cursor (`.cursorrules`), Aider, ou qualquer agente que leia/escreva arquivos.
O core do Paddock é agnóstico — markdown + git.

## Concorrência (multi-sessão)
Se vários agentes/devs trabalham no mesmo repo simultaneamente, prefira **branch + PR** por sessão (ou
git worktrees) pra evitar atropelo de edições no `status.md`.
