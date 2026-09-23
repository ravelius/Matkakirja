#!/bin/sh
# Luo erä-worktreen oikeaan paikkaan: /Users/Shared/Claude/wt/<rooli>-<aihe>
# Käyttö: tools/uusi-worktree.sh <rooli> <aihe> [pohjahaara, oletus origin/main]
# Haara: <rooli>-<aihe>. Poista mergen jälkeen: tools/uusi-worktree.sh --poista <rooli>-<aihe>
set -e
JUURI=/Users/Shared/Claude/wt
PAA=/Users/Shared/Claude/Matkakirja-fable
if [ "$1" = "--poista" ]; then git -C "$PAA" worktree remove "$JUURI/$2"; git -C "$PAA" worktree prune; exit 0; fi
[ -n "$2" ] || { echo "käyttö: $0 <rooli> <aihe> [pohja]"; exit 1; }
mkdir -p "$JUURI"
git -C "$PAA" fetch -q origin
git -C "$PAA" worktree add -b "$1-$2" "$JUURI/$1-$2" "${3:-origin/main}"
echo "$JUURI/$1-$2"
