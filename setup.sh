#!/usr/bin/env bash
# Paddock — init de uma instância nova (rodar 1x após "Use this template").
# Troca o nome do projeto, torna scripts executáveis, valida o esqueleto. Não-destrutivo.
# Uso: bash setup.sh "Meu Projeto"
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NAME="${1:-}"

if [ -z "$NAME" ]; then
  read -rp "Nome do projeto: " NAME
fi
[ -n "$NAME" ] || { echo "nome vazio, abortando" >&2; exit 1; }

# 1. trocar placeholder do nome no status.md
if grep -q "{NOME DO PROJETO}" "$HERE/roadmap/status.md"; then
  sed -i.bak "s/{NOME DO PROJETO}/${NAME//\//\\/}/g" "$HERE/roadmap/status.md" && rm -f "$HERE/roadmap/status.md.bak"
  echo "✓ nome do projeto aplicado no status.md"
fi

# 2. scripts executáveis
chmod +x "$HERE/tools/"*.sh "$HERE/setup.sh" 2>/dev/null || true
echo "✓ scripts executáveis"

# 3. lembrete de privacidade (a instância é sua e privada — não cole dado sensível em texto puro)
echo "ℹ privacidade: este é o SEU workbench (privado). Não cole secrets/credenciais em markdown;"
echo "  referencie por link. Ver docs/conventions.md."

# 4. validar esqueleto
echo "── lint ──"
bash "$HERE/tools/lint-status.sh" || true

cat <<EOF

Pronto. Próximos passos:
  1. edite roadmap/status.md — bloco "AGORA" + suas primeiras linhas
  2. siga o FRAMEWORK.md a cada sessão
  3. panorama:  bash tools/report.sh
EOF
