#!/bin/zsh
# OHJEIDEN AJANTASAISUUS POSTIVAHDIN KIERROKSELLE (omistajan päätös 20.10.2026 klo 22.24, karsinta C1; loki #5071).
# Vain luku: tulostaa yhden rivin per löydös, ei korjaa mitään. Tyhjä tuloste (paitsi yhteenveto) = kaikki kunnossa.
#
#   zsh tools/tarkista-ohjeet.sh
#
#  JÄLJESSÄ|kansio|n committia           roolin kotikansio (/Users/Shared/Claude/Matkakirja-*) yli RAJA committia origin/mainista
#                                        (sovellus lataa CLAUDE.md:n kansiosta → vanhat ohjeet; korjaus tools/paivita-kotikansiot.sh)
#  VANHA ID|muistiinpano|local_xxxxxxxx  muistiinpano (/Users/koodaus/.claude/projects/*/memory/*.md, ei arkisto/) viittaa sessio-
#                                        id:hen, jota ei ole osoitekirjassa /Users/Shared/Claude/osoitekirja.md (8 merkin etuliite)
emulate -L zsh
setopt null_glob
RAJA=50
OSOITEKIRJA=/Users/Shared/Claude/osoitekirja.md
typeset -A haettu
loydot=0
for k in /Users/Shared/Claude/Matkakirja-*(/); do
  [[ -e $k/.git ]] || continue
  yhteinen=$(git -C $k rev-parse --git-common-dir 2>/dev/null) || continue
  [[ $yhteinen == /* ]] || yhteinen=$k/$yhteinen
  if [[ -z ${haettu[$yhteinen]} ]]; then git -C $k fetch -q origin main 2>/dev/null; haettu[$yhteinen]=1; fi   # worktreet jakavat haun
  jalj=$(git -C $k rev-list --count HEAD..origin/main 2>/dev/null) || continue
  if (( jalj > RAJA )); then print -r -- "JÄLJESSÄ|${k:t}|$jalj committia"; (( loydot++ )); fi
done
tunnetut=" ${(j: :)${(u)${(f)"$(grep -oE 'local_[0-9a-f]{8}' $OSOITEKIRJA 2>/dev/null)"}}} "
for m in /Users/koodaus/.claude/projects/*/memory/*.md; do
  for id in ${(u)${(f)"$(grep -oE 'local_[0-9a-f]{8}' $m)"}}; do
    [[ -n $id && $tunnetut != *" $id "* ]] || continue
    print -r -- "VANHA ID|${m#/Users/koodaus/.claude/projects/}|$id"; (( loydot++ ))
  done
done
print -r -- "(tarkista-ohjeet: $loydot löydöstä; raja $RAJA committia)"
