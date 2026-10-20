#!/bin/zsh
# ROOLIEN KOTIKANSIOT AJAN TASALLE MAINIIN (omistajan päätös 20.10.2026 klo 22.24, karsinta B3; loki #5071).
# Sovellus lataa projektin CLAUDE.md:n session kansiosta, joten jäljessä oleva kotikansio antaa vanhat ohjeet.
#
#   zsh tools/paivita-kotikansiot.sh          kuiva-ajo (oletus): kertoo, mitä tehtäisiin, ei muuta mitään
#   zsh tools/paivita-kotikansiot.sh --aja    päivittää (PT päättää ajon)
#
# Jokainen /Users/Shared/Claude/Matkakirja-* -kansio, jossa on git: fetch, sitten
#  - AJAN TASALLA: HEAD sisältää jo origin/mainin.
#  - PÄIVITETÄÄN: työpuu puhdas (seuratut tiedostot) eikä haarassa ole mergeämätöntä sisältöä. Haara main → fast-forward;
#    muu haara jätetään ennalleen ja kansio siirtyy haaraan koti/<kansio> = origin/main (vanha haara säilyy).
#  - JÄLJESSÄ|kansio|n committia|syy: muutoksia työpuussa tai haarassa sisältöä, jota mainissa ei ole → ei kosketa.
# Mergeämätön sisältö = tiedosto, jota haara on muuttanut (merge-base..HEAD) ja jonka sisältö eroaa origin/mainista.
# Squash-mergetyt PR:t eivät siis estä päivitystä, mutta mainissa myöhemmin muuttunut tiedosto estää (varovainen).
emulate -L zsh
setopt null_glob
AJA=0; [[ "$1" == "--aja" ]] && AJA=1
for k in /Users/Shared/Claude/Matkakirja-*(/); do
  [[ -e $k/.git ]] || continue
  n=${k:t}
  if ! git -C $k fetch -q origin 2>/dev/null; then print -r -- "JÄLJESSÄ|$n|?|fetch epäonnistui"; continue; fi
  jalj=$(git -C $k rev-list --count HEAD..origin/main)
  if (( jalj == 0 )); then print -r -- "AJAN TASALLA|$n"; continue; fi
  haara=$(git -C $k branch --show-current)
  muutokset=$(git -C $k status --porcelain --untracked-files=no | wc -l | tr -d ' ')
  if (( muutokset > 0 )); then print -r -- "JÄLJESSÄ|$n|$jalj committia|työpuussa $muutokset muutettua tiedostoa"; continue; fi
  kanta=$(git -C $k merge-base HEAD origin/main)
  omat=0
  for f in ${(f)"$(git -C $k diff --name-only $kanta HEAD)"}; do
    git -C $k diff --quiet HEAD origin/main -- "$f" 2>/dev/null || (( omat++ ))
  done
  if (( omat > 0 )); then print -r -- "JÄLJESSÄ|$n|$jalj committia|haarassa ${haara:-irrotettu} $omat tiedostoa, joiden sisältö puuttuu mainista"; continue; fi
  if [[ "$haara" == main ]]; then toimi="main fast-forward"; else toimi="haara koti/$n = origin/main (vanha ${haara:-irrotettu} säilyy)"; fi
  if (( AJA )); then
    if [[ "$haara" == main ]]; then git -C $k merge -q --ff-only origin/main || { print -r -- "JÄLJESSÄ|$n|$jalj committia|fast-forward epäonnistui"; continue; }
    else git -C $k switch -q -C "koti/$n" origin/main || { print -r -- "JÄLJESSÄ|$n|$jalj committia|haaran vaihto epäonnistui"; continue; }
    fi
    print -r -- "PÄIVITETTY|$n|$jalj committia|$toimi"
  else
    print -r -- "PÄIVITETTÄISIIN|$n|$jalj committia|$toimi"
  fi
done
(( AJA )) || print -r -- "(kuiva-ajo: mitään ei muutettu; --aja päivittää)"
