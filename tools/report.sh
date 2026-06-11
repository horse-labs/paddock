#!/usr/bin/env bash
# Paddock — panorama visual do status (terminal). Lê roadmap/status.md, conta marcadores e plota
# banner + status geral (barras) + pendentes. O grid rico por épico é manual (status-report-template.md);
# este script faz o resumo auto-derivável. Deps: bash, awk, grep, sed (POSIX).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS="${1:-$HERE/roadmap/status.md}"
[ -f "$STATUS" ] || { echo "status.md não encontrado: $STATUS" >&2; exit 1; }

# nome do projeto = 1º H1
NAME="$(grep -m1 '^# ' "$STATUS" | sed 's/^# *//')"
DATE="$(date +%Y-%m-%d)"

# tally: conta marcador na 4ª coluna de linhas de tabela (| id | título | STATUS | ev | nota |)
tally() { awk -F'|' -v m="$1" 'NF>=5 && $2 !~ /^[ -]*$/ { s=$4; gsub(/ /,"",s); if (s==m) c++ } END{print c+0}' "$STATUS"; }
DONE=$(tally "✅"); PART=$(tally "🟡"); DIV=$(tally "🔵"); PEND=$(tally "❌"); DEF=$(tally "⏸")
TOTAL=$((DONE+PART+DIV+PEND+DEF))
[ "$TOTAL" -eq 0 ] && TOTAL=1

# barra de N células proporcional
bar() { local n=$1 t=$2 cells=${3:-28} f i; f=$(( t>0 ? n*cells/t : 0 )); printf '['; for((i=0;i<cells;i++)); do [ $i -lt $f ] && printf '#' || printf '.'; done; printf ']'; }
pct() { local n=$1 t=$2; echo $(( t>0 ? n*100/t : 0 )); }

echo
echo "╔══════════════════════════════════════════════════════════════════╗"
printf "║  %-64s║\n" "PANORAMA — ${NAME}"
printf "║  %-64s║\n" "gerado ${DATE} · fonte roadmap/status.md"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo
echo "  STATUS GERAL (${TOTAL} itens rastreados)"
printf "  ✅ feito ...... %3d  %s %d%%\n" "$DONE" "$(bar "$DONE" "$TOTAL")" "$(pct "$DONE" "$TOTAL")"
printf "  🟡 parcial .... %3d  %s %d%%\n" "$PART" "$(bar "$PART" "$TOTAL")" "$(pct "$PART" "$TOTAL")"
printf "  ❌ pendente ... %3d  %s %d%%\n" "$PEND" "$(bar "$PEND" "$TOTAL")" "$(pct "$PEND" "$TOTAL")"
printf "  ⏸  adiado ..... %3d  %s %d%%\n" "$DEF" "$(bar "$DEF" "$TOTAL")" "$(pct "$DEF" "$TOTAL")"
[ "$DIV" -gt 0 ] && printf "  🔵 divergente . %3d\n" "$DIV"
echo
echo "  ❌ PENDENTES"
echo "  ─────────────────────────────────────────────────────────────────"
awk -F'|' 'NF>=5 { s=$4; gsub(/ /,"",s); if (s=="❌") { id=$2; t=$3; gsub(/^ +| +$/,"",id); gsub(/^ +| +$/,"",t); printf "  • %s — %s\n", id, t } }' "$STATUS" | head -20
echo

# ecoa o bloco "AGORA" se existir
if grep -q '## AGORA' "$STATUS"; then
  echo "  AGORA / próximas 2 semanas"
  echo "  ─────────────────────────────────────────────────────────────────"
  awk '/## AGORA/{f=1;next} /^## /{f=0} f && NF' "$STATUS" | sed 's/^/  /' | grep -v '^  <!--' | head -12
  echo
fi
echo "  (panorama rico por épico: ver roadmap/status-report-template.md)"
