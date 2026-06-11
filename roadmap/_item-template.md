# Template de item de backlog

Item bem-formado no `status.md` = **uma linha**:

`| <ID> | <título curto> | <status> | <evidência> | <nota: prioridade · blocked-by · débito> |`

Exemplo:
`| E4 | Notificações por e-mail | ❌ | — | P1 · blocked-by: E1 |`

Regras:
- Trivial → critério de aceite cabe na própria nota. Não-trivial → criar `specs/<data>-<slug>-design.md`
  com o critério e linkar na evidência/nota.
- Passou no **DoR** (FRAMEWORK) antes de virar 🔵. Só ✅ quando bate o **DoD**.
- Prioridade na nota: `P0` (agora) · `P1` (próximo) · `P2` (depois). Dependência: `blocked-by: <ID>`.
