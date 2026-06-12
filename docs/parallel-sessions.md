# Sessões paralelas (multi-agente / multi-dev)

Quando vários devs e/ou agentes de IA trabalham no mesmo projeto **ao mesmo tempo**, o ritual de sessão
single-thread não basta: o `roadmap/status.md` (arquivo único) vira ponto de colisão e edições se atropelam.
Este é o protocolo que mantém N sessões paralelas sem conflito. Resumo no [`../FRAMEWORK.md`](../FRAMEWORK.md)
› *Sessões paralelas*.

## Dois planos de informação

| | `current_sessions/` | `roadmap/status.md` |
|---|---|---|
| **Papel** | estado **vivo** — quem faz o quê **agora** | registro **durável** — o que foi entregue + evidência |
| **Granularidade** | **1 arquivo por sessão** (dono único) | 1 quadro canônico |
| **Conflito** | nenhum — ninguém edita o arquivo de outra sessão | raro — escrito 1× por sessão |
| **Escrita** | ao abrir + ao pegar tarefa nova fora do escopo | **1× no fechamento** da sessão |
| **Leitura** | **sempre junto** com o `status.md` | nunca consultado sozinho |

O `status.md` continua canônico, mas **deixa de ser ponto único de consulta**: quem olha o status **lê junto**
o `current_sessions/`. Como a escrita no `status.md` migra pro fechamento da sessão, a frequência de escrita
cai → conflito vira raro e, quando ocorre, aparece **visível no PR** (não num clobber silencioso).

## Isolamento: worktree por sessão

- **Uma branch + worktree por sessão/repo.** Nunca editar o clone compartilhado direto.
  `git worktree add -b feat/<id>-slug ../wt-<slug> origin/main`.
- **Sem git destrutivo** (`reset`/`checkout`/`stash`/`clean`) num clone compartilhado — destrói trabalho
  não-commitado de outra sessão.
- **1 branch → 1 PR**; ligue *auto-delete head branch on merge* no repo.
- Limpeza no fechamento: `git worktree remove <path>` + `git branch -d <branch>`.

## Lifecycle

**Abrir** (toda sessão que vai alterar repos):
1. `git pull` + ler `README` + `roadmap/status.md` + **todo `current_sessions/`** (ver o que as outras seguram).
2. Criar `current_sessions/<session-id>.md` (`session-id = YYYYMMDD-HHMMSS-<slug>`) com IDs reservados — só os
   **não-reservados** por outra sessão ativa. PR fast-path → merge. É o claim.
3. Criar worktree(s) + branch(es).

**Durante:**
- Trabalho em worktree + branch, amarrado a `ID(s)`. Tarefa nova fora do session-file → `git pull` + reler
  `current_sessions/` + atualizar o próprio session-file **antes** de avançar.

**Fechar:**
1. Cada repo: PR branch→`main`, checks verdes → merge, branch auto-deletada; `git worktree remove` + branch local.
2. Atualizar `roadmap/status.md` (status + evidência) — **pré-requisito pra arquivar**.
3. Atualizar o session-file com o status final → mover pra `current_sessions/_archive/YYYY-MM/` → PR → merge.

## Regra dura: sem commit direto na `main`

Todo trabalho entra por **branch → PR**. Enforce isso por **mecanismo**, não só disciplina:

- **Branch protection / rulesets no servidor (preferido):** no GitHub, *Settings → Branches → Add rule* (ou
  via API/`gh`) exigindo PR e bloqueando force-push/delete na `main`. **Disponível de graça em repos
  públicos**; em **repos privados exige plano pago** (Free → HTTP 403). Quando der, use isto — é o mais forte.
- **Git hook local (fallback gratuito):** [`../tools/hooks/pre-push`](../tools/hooks/pre-push) rejeita push
  direto em `main`/`master`. Instale em todos os repos do workspace:

  ```bash
  bash tools/install-guard.sh           # default: a raiz do workspace (parent do paddock)
  ```

  Idempotente; worktrees herdam o hook do git-dir comum; re-rode ao clonar um repo novo. Escape consciente:
  `ALLOW_MAIN_PUSH=1 git push ...`. Limitação: cobre só os clones daquele host e é bypassável com
  `--no-verify` — é guarda, não cofre. (O `setup.sh` já instala o hook na própria instância.)

## Quando NÃO precisa

Trabalho estritamente solo, uma sessão de cada vez? O protocolo degrada pra um único session-file trivial —
mantém a trilha de histórico em `_archive/` sem custo real. A regra da `main` (branch + PR) vale sempre: é o
guardrail de rastreabilidade mais barato (ver [`../FRAMEWORK.md`](../FRAMEWORK.md) › *Git*).
