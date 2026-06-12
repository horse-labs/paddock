#!/usr/bin/env bash
# Paddock — init de uma instância nova (rodar 1x após "Use this template").
# Troca o nome do projeto, gera o adapter de agente (AGENTS.md na raiz), torna scripts executáveis,
# valida o esqueleto. Não-destrutivo (nunca sobrescreve adapter existente).
# Uso: bash setup.sh "Meu Projeto"
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NAME="${1:-}"

if [ -z "$NAME" ]; then
  read -rp "Nome do projeto: " NAME
fi
[ -n "$NAME" ] || { echo "nome vazio, abortando" >&2; exit 1; }

# escapa o nome p/ uso seguro no replacement do sed: \ → \\, depois & → \&, depois / → \/
SAFE=${NAME//\\/\\\\}; SAFE=${SAFE//&/\\&}; SAFE=${SAFE//\//\\/}

# 1. trocar placeholder do nome no status.md
if grep -q "{NOME DO PROJETO}" "$HERE/roadmap/status.md"; then
  sed -i.bak "s/{NOME DO PROJETO}/$SAFE/g" "$HERE/roadmap/status.md" && rm -f "$HERE/roadmap/status.md.bak"
  echo "✓ nome do projeto aplicado no status.md"
fi

# 2. scripts executáveis
chmod +x "$HERE/tools/"*.sh "$HERE/setup.sh" 2>/dev/null || true
echo "✓ scripts executáveis"

# 3. adapter de agente na RAIZ do workspace (parent de paddock/) — AGENTS.md, lido por Copilot/Cursor/Codex.
#    Não sobrescreve adapter existente. Pra Claude Code: copie o AGENTS.md p/ CLAUDE.md.
ROOT="$(cd "$HERE/.." && pwd)"
if [ -e "$ROOT/AGENTS.md" ] || [ -e "$ROOT/CLAUDE.md" ] || [ -e "$ROOT/.cursorrules" ]; then
  echo "ℹ adapter de agente já existe na raiz ($ROOT) — não sobrescrevo"
else
  sed "s/{PROJETO}/$SAFE/g" "$HERE/docs/workspace-AGENTS.md.example" > "$ROOT/AGENTS.md"
  echo "✓ adapter gerado: $ROOT/AGENTS.md (AGENTS.md — Copilot/Cursor/Codex; copie p/ CLAUDE.md no Claude Code)"
fi

# 4. guard pre-push: bloqueia push direto na main desta instância (regra dura do FRAMEWORK).
#    Instala no workspace inteiro (parent), cobrindo os repos de código irmãos. Não-fatal se falhar.
if [ -f "$HERE/tools/install-guard.sh" ]; then
  if bash "$HERE/tools/install-guard.sh" "$ROOT" >/dev/null 2>&1; then
    echo "✓ guard pre-push instalado (sem commit direto na main; escape: ALLOW_MAIN_PUSH=1)"
  else
    echo "ℹ guard pre-push não instalado (rode depois: bash tools/install-guard.sh)"
  fi
fi

# 5. lembrete de privacidade (a instância é sua e privada — não cole dado sensível em texto puro)
echo "ℹ privacidade: este é o SEU workbench (privado). Não cole secrets/credenciais em markdown;"
echo "  referencie por link. Ver docs/conventions.md."

# 6. validar esqueleto
echo "── lint ──"
bash "$HERE/tools/lint-status.sh" || true

cat <<EOF

Pronto. Próximos passos:
  1. edite roadmap/status.md — bloco "AGORA" + suas primeiras linhas
  2. siga o FRAMEWORK.md a cada sessão (registre a sessão em current_sessions/ se houver trabalho paralelo)
  3. panorama:  bash tools/report.sh
EOF
