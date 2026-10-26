#!/bin/zsh
# Julkaisija 14.10.2026: odottaa PR:n tarkistukset nykyiselle kärjelle ja squash-mergeää vihreänä (--match-head-commit).
#   zsh odota-ja-mergea.zsh <PR>        Ei tarkistuksia (docs-polut) → mergeää heti, jos MERGEABLE.
# Kärki vaihtuu kesken → odottaa uudelleen. Punainen/peruttu → tulostaa ja lopettaa mergeämättä.
cd /Users/Shared/Claude/Matkakirja-julkaisija || exit 2
PR=$1
while true; do
  read -r tila karki <<< "$(gh pr view $PR --json state,headRefOid --jq '.state+" "+.headRefOid')"
  [[ $tila != OPEN ]] && { print "PR $PR $tila"; exit 0; }
  s=$(gh pr checks $PR --json bucket --jq '[.[].bucket]|join(",")' 2>/dev/null)
  if [[ -z $s ]]; then
    sleep 20; [[ -n $(gh pr checks $PR --json bucket --jq '.[].bucket' 2>/dev/null) ]] && continue
  elif [[ $s == *pending* ]]; then sleep 45; continue
  elif [[ $s == *fail* || $s == *cancel* ]]; then print "PR $PR PUNAINEN ($s) kärki $karki"; exit 1
  fi
  [[ $(gh pr view $PR --json headRefOid --jq .headRefOid) == $karki ]] || continue
  gh pr merge $PR --squash --match-head-commit $karki >/dev/null 2>&1 || { print "PR $PR merge epäonnistui (kärki $karki)"; exit 1; }
  print "PR $PR MERGETTY $(gh pr view $PR --json mergeCommit --jq '.mergeCommit.oid[0:9]') (tarkistukset ${s:-ei})"
  print "$(date +%-d.%-m.) $(date +%H.%M) MERGETTY #$PR $(gh pr view $PR --json mergeCommit,title --jq '.mergeCommit.oid[0:9]+" "+.title')" >> /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt
  exit 0
done
