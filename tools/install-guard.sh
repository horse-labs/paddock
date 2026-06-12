#!/usr/bin/env bash
# Paddock — instala o guard pre-push (bloqueia push direto na main/master) em todos os repos git
# de um diretório. Default: a raiz do workspace (parent do paddock), cobrindo os repos de código irmãos.
# Idempotente: re-rodar após clonar um repo novo. Hooks ficam no git-dir comum, então worktrees herdam.
# Deps: bash, git, find (POSIX). Uso: bash tools/install-guard.sh [dir]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$HERE/tools/hooks/pre-push"
TARGET="${1:-$(cd "$HERE/.." && pwd)}"

[ -f "$SRC" ] || { echo "hook não encontrado: $SRC" >&2; exit 1; }
[ -d "$TARGET" ] || { echo "dir alvo não existe: $TARGET" >&2; exit 1; }

installed=0
while IFS= read -r -d '' gitpath; do
  repo="$(dirname "$gitpath")"
  # git-dir comum (cobre worktrees); resolve relativo → absoluto
  common="$(git -C "$repo" rev-parse --git-common-dir 2>/dev/null || true)"
  [ -n "$common" ] || continue
  case "$common" in
    /*) : ;;
    *) common="$repo/$common" ;;
  esac
  # respeita core.hooksPath se setado (ex.: husky)
  hp="$(git -C "$repo" config core.hooksPath 2>/dev/null || true)"
  if [ -n "$hp" ]; then
    case "$hp" in /*) : ;; *) hp="$repo/$hp" ;; esac
  else
    hp="$common/hooks"
  fi
  mkdir -p "$hp"
  cp "$SRC" "$hp/pre-push"
  chmod +x "$hp/pre-push"
  echo "guard instalado: $repo"
  installed=$((installed + 1))
done < <(find "$TARGET" -maxdepth 3 -name .git -print0 2>/dev/null)

echo "---"
echo "$installed repo(s) protegido(s)."
