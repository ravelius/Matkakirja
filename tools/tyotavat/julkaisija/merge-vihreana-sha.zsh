#!/bin/zsh
# merge-vihreana-sha.zsh <PR> <täysi head-SHA>: odottaa CI:n, squash-merge vain jos kaikki vihreää ja head ennallaan.
pr=$1; sha=$2
cd /Users/Shared/Claude/Matkakirja-julkaisija || exit 1
sleep 20
until s=$(gh pr checks $pr --json name,bucket 2>/dev/null) && echo "$s" | jq -e 'length>0 and all(.bucket!="pending")' >/dev/null; do sleep 30; done
echo "$s"
if echo "$s" | jq -e 'all(.bucket=="pass" or .bucket=="skipping")' >/dev/null; then
  # "Base branch was modified" (rinnakkainen merge) → uusinta enintään 3 kertaa.
  for y in 1 2 3; do gh pr merge $pr --squash --match-head-commit $sha && break; sleep 15; done
  gh pr view $pr --json state,mergeCommit --jq '.state+" "+.mergeCommit.oid'
else
  echo "PUNAINEN #$pr"
fi
