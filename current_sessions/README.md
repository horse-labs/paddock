# current_sessions/ — estado vivo das sessões

Plano **vivo** de coordenação entre sessões paralelas (vários devs e/ou agentes de IA no mesmo projeto).
Complementa o `roadmap/status.md` (durável). **Quem lê o `status.md` lê este diretório junto** — um diz o
que *foi entregue*, o outro diz o que está *em voo agora*.

Existe pra resolver duas dores de trabalho paralelo: **colisão no `status.md`** (arquivo único, vários
escritores) e **atropelo de edições**. Aqui cada sessão tem o **próprio arquivo** (dono único) → zero
conflito no claim.

## Regras

1. **Antes de alterar repos**, a sessão cria aqui o próprio `current_sessions/<session-id>.md` (PR
   fast-path → merge). É o **claim** do que ela vai fazer.
2. **`session-id` = `YYYYMMDD-HHMMSS-<slug>`** — único por sessão. Nome de arquivo livre de colisão.
3. **Dono único:** a sessão só edita o **próprio** session-file. Nunca o de outra.
4. **Pegar tarefa nova fora do escopo** → `git pull` + reler este diretório (alguém pode ter reservado o
   ID) + atualizar o próprio session-file **antes** de avançar.
5. **Ao fechar:** atualizar o session-file com o status final das tarefas → mover pra
   `_archive/YYYY-MM/<session-id>.md` (pré-requisito: o `status.md` já atualizado).
6. **IDs reservados** por uma sessão ativa **não** são puxados por outra. Conferir aqui antes de reservar.

Projeto solo de uma sessão só? O custo é um arquivo trivial — e o histórico em `_archive/` vira trilha de
quem-fez-o-quê-quando. Modelo, escopo e enforcement em [`../docs/parallel-sessions.md`](../docs/parallel-sessions.md).

## Template

Copie [`_template.md`](_template.md) pra `<session-id>.md` e preencha. Estrutura:

```markdown
---
session-id: YYYYMMDD-HHMMSS-<slug>
ator: <nome do dev ou agente de IA>
aberta: <ISO timestamp>
repos: [<repos-alvo>]
status: ativa            # ativa | encerrada
---

## IDs reservados
- <ID> — <título>

## Worktrees / branches
- <repo> → branch `<branch>` @ <worktree path>

## Checklist
- [ ] tarefa 1

## Notas
(decisões, débitos, evidências por tarefa)
```
