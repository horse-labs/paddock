#!/usr/bin/env bash
# Paddock — lint de integridade do status.md. Pega drift comum:
#  1. linha ✅/🟡/🔵 sem evidência (coluna 5 vazia ou "—")  → viola "evidência-ou-nada"
#  2. ✅ com nota dizendo "falta/pendente/TODO"             → marcador contradiz a nota
#  3. ❌ com evidência preenchida                            → provável marcador stale
# Exit !=0 se houver violação (serve em CI/hook). Deps: bash, awk.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS="${1:-$HERE/roadmap/status.md}"
[ -f "$STATUS" ] || { echo "status.md não encontrado: $STATUS" >&2; exit 1; }

VIOL=$(awk -F'|' '
  function trim(x){ gsub(/^[ \t]+|[ \t]+$/,"",x); return x }
  NF>=6 {
    id=trim($2); st=trim($4); ev=trim($5); note=trim($6)
    if (id=="" || id=="ID" || id ~ /^-+$/) next        # cabeçalho/separador
    isdone = (st=="✅" || st=="🟡" || st=="🔵")
    noev   = (ev=="" || ev=="—" || ev=="-")
    if (isdone && noev)
      printf "  ✗ [%s] %s sem evidência (regra evidência-ou-nada)\n", st, id
    # DoD: evidência deve ser um REF real (PR #, URL, .md/ADR, ou SHA), não texto solto
    reflike = (ev ~ /#[0-9]/ || ev ~ /https?:\/\// || ev ~ /\.md/ || ev ~ /[0-9a-f]{7,}/ || ev ~ /ADR/)
    if (isdone && !noev && !reflike)
      printf "  ✗ [%s] %s evidência não parece link/ref (\"%s\") — use PR#/URL/ADR/commit\n", st, id, ev
    if (st=="✅" && note ~ /falta|pendente|TODO|to-?do/)
      printf "  ✗ [✅] %s marcado feito mas a nota diz pendência: \"%s\"\n", id, note
    if (st=="❌" && !noev)
      printf "  ✗ [❌] %s não-iniciado mas tem evidência (%s) — marcador stale?\n", id, ev
  }
' "$STATUS")

if [ -n "$VIOL" ]; then
  echo "lint-status: violações encontradas"
  echo "$VIOL"
  exit 1
fi
echo "lint-status: OK — status.md íntegro"
