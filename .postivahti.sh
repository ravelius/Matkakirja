#!/bin/bash
# Postivahdin kierros: uudet commitit postilaatikkohaarassa viimeksi nähdyn jälkeen.
cd "$(dirname "$0")" || exit 1
git fetch -q origin claude/postilaatikko 2>&1
BASELINE=$(cat .postivahti-viimeksi 2>/dev/null)
KARKI=$(git rev-parse --short origin/claude/postilaatikko)
if [ -n "$BASELINE" ] && [ "$BASELINE" != "$KARKI" ]; then
  git log --oneline --name-only "$BASELINE..origin/claude/postilaatikko" | grep -v '^posti/fable-' | grep -v '^$' > .postivahti-uudet
  if grep -q '^posti/' .postivahti-uudet; then
    echo "UUSIA VIESTEJÄ FABLELLE:"
    git log --oneline "$BASELINE..origin/claude/postilaatikko"
    for f in $(grep '^posti/' .postivahti-uudet | sort -u); do
      printf -- '- %s: %s\n' "$f" "$(git show "origin/claude/postilaatikko:$f" 2>/dev/null | head -1)"
    done
  else
    echo "EI UUTTA (vain Fablen omia viestejä)"
  fi
else
  echo "EI UUTTA"
fi
echo "$KARKI" > .postivahti-viimeksi
