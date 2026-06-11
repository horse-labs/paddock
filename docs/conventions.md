# Convenções

## Marcadores de status
✅ feito (verificado) · 🟡 parcial (dizer o que falta) · 🔵 feito-divergente (explicar) · ❌ não-iniciado · ⏸ adiado.

## IDs
Todo item tem ID estável pra amarrar trabalho↔status↔código. Prefixos sugeridos (adapte):
- herdados de um roadmap: ID original (`E1`, `H2.1`, `V-3`…);
- item novo (fora do plano): `X-` + sequencial (`X-01`), com nota de origem;
- fase posterior (pós-lançamento/escala): prefixo próprio (`PM-01`), specs em pasta dedicada.

## Evidência-ou-nada
Todo ✅/🟡/🔵 carrega evidência linkada: `#PR`, `repo#PR`, commit SHA, ou caminho de ADR/spec.
Sem evidência → é alegação. `tools/lint-status.sh` reprova.

## Linhas enxutas
1 linha por item no `status.md`. Detalhe gordo (decisões, trade-offs, logs) mora no PR/spec **linkado**,
nunca inline. O status incha rápido se virar ensaio — resista.

## Arquivamento
Sprint/épico 100% concluído → mover as linhas pra `roadmap/status-archive.md` (criar quando precisar).
Mantém o `status.md` vivo pequeno e barato de ler (por humano e por agente).

## Commits no workbench
Mensagem curta referenciando o ID: `status: E1 ✅ deployado (#16)`. Facilita a trilha.
