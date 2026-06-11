# Tooling

Scripts opcionais, **bash puro** (sem runtime extra).

## Dependências
| Ferramenta | Pra quê | Nota |
|---|---|---|
| `bash` | rodar os scripts | ≥4 recomendado |
| `git` | versionamento | — |
| `gh` (GitHub CLI) | criar repo, linkar PRs | opcional, só p/ fluxo GitHub |
| `awk` `grep` `sed` | parsing do status.md | POSIX — já vêm no sistema |

Zero node/python.

## `tools/report.sh`
Panorama visual (ASCII) do status atual: banner + status geral com barras + lista de pendentes + bloco AGORA.
```bash
bash tools/report.sh                 # usa roadmap/status.md
bash tools/report.sh caminho/status.md
```
O **panorama rico por épico** (grids, go/no-go, velocity) é manual — ver `roadmap/status-report-template.md`.
O script faz o resumo auto-derivável dos marcadores.

## `tools/lint-status.sh`
Checa integridade e sai com código !=0 se achar violação (bom em CI / git hook):
- linha ✅/🟡/🔵 **sem evidência** (viola "evidência-ou-nada");
- ✅ com nota dizendo "falta/pendente/TODO" (marcador contradiz nota);
- ❌ com evidência (marcador provavelmente stale).
```bash
bash tools/lint-status.sh
```
Dica: rodar no CI do seu workbench, ou num pre-commit, pra o status não driftar.

## `setup.sh`
Inicializa uma instância nova a partir do template — ver `getting-started.md`.
