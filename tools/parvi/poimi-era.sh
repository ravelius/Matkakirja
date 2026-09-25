#!/bin/bash
# Cherry-pick a nostot batch commit and resolve the standard conflicts.
set -u
C=$1
git cherry-pick "$C" >/dev/null 2>&1 && { echo "$C puhdas"; exit 0; }
U=$(git diff --name-only --diff-filter=U)
echo "$C konfliktit: $U"
for f in $U; do
  case "$f" in
    js/packs/elaintakyt.js|js/packs/skandaalit.js)
      git checkout --ours "$f" && python3 tools/parvi/liita-loppuun.py "$f" "$C" ;;
    tests/elaintakyt.test.mjs|tests/skandaalit.test.mjs)
      git checkout --ours "$f" ;;
    *)
      python3 tools/parvi/ratkaise-md.py "$f" ;;
  esac
  git add "$f"
done
for f in $U; do case "$f" in *.js|*.mjs) node --check "$f" || exit 1;; esac; done
git -c core.editor=true cherry-pick --continue >/dev/null 2>&1 && echo "$C valmis" || { echo "$C EPÄONNISTUI"; git status --short | head; exit 1; }
