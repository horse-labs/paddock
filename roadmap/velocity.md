# Velocity & pontuação — backlog estimável (template)

> Artefato **opcional** de planejamento. Snapshot datado — re-pontuar a cada sprint. Estimativa, não profecia.

## Método (sugerido)
Ancorar a escala em itens **reais já entregues** do seu `status.md`, não em chute. Proxy de esforço por item:
churn (±linhas) + nº commits + ciclos de fix + repos tocados + span de dias. Escala Fibonacci.

## Baseline
- Snapshot: **{AAAA-MM-DD}**.
- Velocity de planejamento ≈ **{N} pts/semana** (derivar do seu histórico de commits, não inventar).

## Escala de pontos (âncoras reais)
| Pts | Âncora entregue | Perfil |
|---:|---|---|
| 1 | {item pequeno} | mudança trivial, 1 arquivo |
| 2 | {item} | UI pequena / 1 endpoint |
| 3 | {item} | feature com lógica + testes |
| 5 | {item} | feature 1 repo |
| 8 | {item} | cross-repo / perf |
| 13 | {item} | épico multi-slice |

## Backlog aberto pontuado
| Bloco | Itens | pts | ~semanas |
|---|---|--:|--:|
| A. {tema} | {IDs} | ~{x} | ~{y} |
| B. {tema} | {IDs} | ~{x} | ~{y} |

## Caveats
- Churn ≠ dificuldade (por isso ancorar em itens reais).
- Re-pontuar a cada sprint; backlog cresce.
- Dev assistido por IA comprime calendário — a escala mede **dificuldade relativa**, não horas.
