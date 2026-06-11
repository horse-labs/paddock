# 🐴 Paddock

**Git-native memory & roadmap for AI-assisted teams.**

> Um paddock é o cercado onde o cavalo é preparado antes de correr. Aqui é onde o **projeto** é
> preparado e governado: a memória viva, o status canônico e o ritual que mantêm humano + IA no mesmo
> mapa — versionado no git, ligado ao código por evidência.

Paddock é um **template de repositório** (não um produto, não uma dependência pesada). Você clica em
*"Use this template"*, preenche o esqueleto, e ganha:

- **Status canônico** (`roadmap/status.md`) — a fonte única do que está feito / em andamento / pendente,
  cada linha com **evidência** (link de PR/commit/ADR). Sem evidência, não é status — é alegação.
- **Ritual de sessão** (`FRAMEWORK.md`) — protocolo curto que mantém o status acurado a cada sessão de
  trabalho (com pessoas ou com agentes de IA tipo Claude Code, Cursor, Aider…).
- **Memória estruturada** — `specs/`, `plans/`, `decisions/`, `audits/` linkados pelo status, não
  duplicados. O contexto do projeto para de viver só na cabeça de alguém (ou na janela de contexto do agente).
- **Panorama visual** sob demanda (`tools/report.sh`) + **lint de integridade** (`tools/lint-status.sh`).

## Por que existe

Trabalho assistido por IA gera muito contexto que **se perde** entre sessões: decisões, roadmap, o "porquê".
Drive/Notion desatualizam e a IA não lê/escreve neles nativamente. Paddock põe a memória **dentro do git** —
diffável, revisável por PR, lida e escrita pelo agente, e amarrada ao código por evidência. É **governança
do seu desenvolvimento**, leve.

## Workspace (o modelo mental — leia antes)
Paddock não é ilha: vive numa **raiz de trabalho** ao lado dos repos e do material bruto. O agente roda
da raiz e cruza memória + código + matéria-prima de uma vez.
```
  ~/workspace/                 ← raiz; o agente roda daqui
  ├── paddock/                 ← MEMÓRIA estruturada (este framework)
  ├── repo-a/  repo-b/         ← repos de código do projeto
  └── _knowledge/              ← INTAKE bruto: pdf, transcrições, drawio… (privado, não-versionado)
```
Paddock vira **refinaria**: destila o entulho de `_knowledge/` em estrutura (`specs/`/`decisions/`/`status.md`).
O `setup.sh` gera um **`AGENTS.md`** na raiz (adapter lido por **GitHub Copilot, Cursor, Codex**; copie p/
`CLAUDE.md` no Claude Code). Funciona com qualquer agente — o core é markdown+git.
Setup completo + ritual de ingest + matriz de ferramentas: **[`docs/workspace-setup.md`](docs/workspace-setup.md)**.

## Quickstart

```bash
# Linux/macOS: terminal nativo. Windows: rode no Git Bash (vem com o Git) ou WSL.
# 1. "Use this template" no GitHub  →  seu-org/seu-projeto-workbench
# 2. clone e rode o setup
git clone <seu-repo> && cd <seu-repo>
bash setup.sh                  # aplica o nome do projeto, chmod nos scripts, valida (lint)
# 3. abra roadmap/status.md, registre seus primeiros itens
# 4. a cada sessão, siga o FRAMEWORK.md
```
> Os scripts (`setup`/`report`/`lint`) são **opcionais** — o core é markdown + git e funciona em qualquer
> SO sem rodar nada. No Windows, rode os scripts via **Git Bash**/WSL.

Detalhe em [`docs/getting-started.md`](docs/getting-started.md).

## Dependências
`bash` · `git` · `gh` (GitHub CLI, p/ linkar PRs) · `grep`/`sed` (POSIX). **Zero runtime** (sem node/python).
Ver [`docs/tooling.md`](docs/tooling.md).

## O que NÃO é
- Não é spec-driven dev (tipo GitHub Spec Kit) — é mais amplo: **memória + status + roadmap + ritual**,
  spec é só uma das pastas.
- Não é um CLI/produto a instalar — é estrutura + metodologia + scripts opcionais.
- Não amarra a um agente — o core é markdown+git; há um *adapter* opcional pra Claude Code.

## Mapa
| Caminho | O quê |
|---|---|
| [`docs/workspace-setup.md`](docs/workspace-setup.md) | ★ **leia primeiro** — topologia do workspace + ritual de ingest |
| [`FRAMEWORK.md`](FRAMEWORK.md) | o ritual de sessão + DoR/DoD + git + taxonomia + convenções |
| [`roadmap/status.md`](roadmap/status.md) | ★ status canônico (você preenche) |
| [`roadmap/status-report-template.md`](roadmap/status-report-template.md) | molde do panorama visual |
| [`docs/`](docs/) | manual (getting-started, convenções, ritual, tooling) |
| [`tools/`](tools/) | `report.sh` (panorama) · `lint-status.sh` (integridade) |
| `specs/ plans/ decisions/ audits/ product/` | memória estruturada (linkada pelo status) |

---
_By [HorseLabs](https://github.com/horse-labs). Template privado em validação — feedback bem-vindo._
