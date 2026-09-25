#!/bin/zsh
# Merge junaan ilman worktreetä: juna-merge.sh <haara|SHA> [juna]. Ristiriidassa ei muutoksia, paitsi
# UNION-tiedostoissa (testiajureiden tiedostolistat, joihin jokainen haara lisää rivejä): niille rivien yhdiste
# (git merge-file --union). Muut ristiriidat → kirjoittaja mergeää masterin tai junan omaan haaraansa.
cd /Users/Shared/Claude/proto-3d/Matkakirja-proto
H=$1; J=${2:-$(git for-each-ref --format="%(refname:short)" "refs/heads/juna/b*" | sort -V | tail -1)}
UNION=(Kartta-testit/kaanna.sh Peli-testit/kaanna.sh Linssit-testit/kaanna.sh)
T=$(mktemp -d)
tulos=$(git merge-tree --write-tree "$J" "$H"); rc=$?
puu=$(print -r -- "$tulos" | head -1)
if (( rc != 0 )); then
  ristiin=(${(f)"$(print -r -- "$tulos" | awk 'NF==4 && $1 ~ /^[0-9]+$/ {print $4}' | sort -u)"})
  for f in $ristiin; do (( ${UNION[(Ie)$f]} )) || { echo "RISTIRIITA $H → $J: $ristiin"; rm -rf $T; exit 1; }; done
  export GIT_INDEX_FILE=$T/idx
  git read-tree $puu
  for f in $ristiin; do
    git show "$(git merge-base $J $H):$f" > $T/o 2>/dev/null || : > $T/o
    git show "$J:$f" > $T/a; git show "$H:$f" > $T/b
    if grep -q "csc.dll" $T/a $T/b; then python3 /Users/Shared/Claude/proto-3d/tyokalut/lahteet-union.py $T/a $T/o $T/b; else git merge-file --union -q $T/a $T/o $T/b; fi
    sh -n $T/a || { echo "UNION-tulos ei ole kelvollinen: $f"; rm -rf $T; exit 1; }
    grep -q '^<<<<<<<\|^>>>>>>>' $T/a && { echo "UNION epäonnistui: $f"; rm -rf $T; exit 1; }
    git update-index --cacheinfo 100755,$(git hash-object -w $T/a),$f
    echo "union: $f"
  done
  puu=$(git write-tree); unset GIT_INDEX_FILE
fi
rm -rf $T
c=$(git commit-tree "$puu" -p "$(git rev-parse $J)" -p "$(git rev-parse $H)" -m "Juna: merge $H $(git rev-parse --short $H)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>")
git update-ref refs/heads/$J $c && echo "$J $(git rev-parse --short $J) ← $H $(git rev-parse --short $H)"
