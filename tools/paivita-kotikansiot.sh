#!/bin/zsh
# ROOLIEN KOTIKANSIOT AJAN TASALLE MAINIIN (omistajan päätös 20.10.2026 klo 22.24, karsinta B3; loki #5071).
# Sovellus lataa projektin CLAUDE.md:n session kansiosta, joten jäljessä oleva kotikansio antaa vanhat ohjeet.
#
#   zsh tools/paivita-kotikansiot.sh          kuiva-ajo (oletus): kertoo, mitä tehtäisiin, ei muuta mitään
#   zsh tools/paivita-kotikansiot.sh --aja    päivittää (PT päättää ajon)
#   … --ohita kansio,kansio                   jättää nimetyt kansiot väliin (rivi OHITETTU), esim. kesken oleva juna
#   … --vain kansio,kansio                    käsittelee vain nimetyt kansiot
#   … --uusi-haara                            (PT 20.10. 23.0x) myös kansio, jonka haarassa on mainista puuttuvaa sisältöä, siirtyy
#                                             haaraan koti/<kansio> = origin/main (git switch -C); vanha haara jää koskemattomaksi
#                                             (rivi kertoo sen nimen), mitään ei poisteta; jos vanha haara on jo koti/<kansio>, ei tehdä
#
# Jokainen /Users/Shared/Claude/Matkakirja-* -kansio, jossa on git: fetch, sitten
#  - AJAN TASALLA: HEAD sisältää jo origin/mainin.
#  - PÄIVITETÄÄN: työpuu puhdas (seuratut tiedostot; .claude/settings.local.json sallitaan – PT 22.4x: muutos säilyy, git kantaa
#    sen mukana eikä tiedostoon kosketa; jos main on muuttanut samaa tiedostoa, git kieltäytyy → JÄLJESSÄ) eikä haarassa ole mergeämätöntä sisältöä. Haara main → fast-forward;
#    muu haara jätetään ennalleen ja kansio siirtyy haaraan koti/<kansio> = origin/main (vanha haara säilyy).
#  - JÄLJESSÄ|kansio|n committia|syy: muutoksia työpuussa tai haarassa sisältöä, jota mainissa ei ole → ei kosketa.
# Mergeämätön sisältö = tiedosto, jota haara on muuttanut (merge-base..HEAD) ja jonka haaran versio (blob) ei ole koskaan ollut
# mainissa merge-basen jälkeen eikä ole mainissa nyt. Squash-mergetyt PR:t ja mainissa myöhemmin muuttuneet tiedostot eivät
# siis estä päivitystä; poistettu tiedosto lasketaan omaksi, jos se on yhä mainissa.
emulate -L zsh
setopt null_glob
AJA=0; UUSI=0; typeset -a OHITA VAIN
while (( $# )); do
  case $1 in --aja) AJA=1 ;; --uusi-haara) UUSI=1 ;; --ohita) shift; OHITA=(${(s:,:)1}) ;; --vain) shift; VAIN=(${(s:,:)1}) ;; esac
  shift
done
SALLITTU=.claude/settings.local.json
for k in /Users/Shared/Claude/Matkakirja-*(/); do
  [[ -e $k/.git ]] || continue
  n=${k:t}
  (( ${#VAIN} == 0 || ${VAIN[(Ie)$n]} )) || continue
  if (( ${OHITA[(Ie)$n]} )); then print -r -- "OHITETTU|$n"; continue; fi
  if ! git -C $k fetch -q origin 2>/dev/null; then print -r -- "JÄLJESSÄ|$n|?|fetch epäonnistui"; continue; fi
  jalj=$(git -C $k rev-list --count HEAD..origin/main)
  if (( jalj == 0 )); then print -r -- "AJAN TASALLA|$n"; continue; fi
  haara=$(git -C $k branch --show-current)
  muutokset=$(git -C $k status --porcelain --untracked-files=no | grep -v " $SALLITTU\$" | wc -l | tr -d ' ')
  if (( muutokset > 0 )); then print -r -- "JÄLJESSÄ|$n|$jalj committia|työpuussa $muutokset muutettua tiedostoa"; continue; fi
  kanta=$(git -C $k merge-base HEAD origin/main)
  typeset -A mainissa; mainissa=()
  for b in ${(f)"$(git -C $k log --raw --no-abbrev --format= $kanta..origin/main | awk '{print $4}')"}; do mainissa[$b]=1; done
  omat=0
  for rivi in ${(f)"$(git -C $k diff --raw --no-abbrev --no-renames $kanta HEAD)"}; do
    osat=(${=rivi}); blob=${osat[4]}; f=${osat[6]}
    if [[ $blob == 0000000000000000000000000000000000000000 ]]; then
      git -C $k cat-file -e "origin/main:$f" 2>/dev/null && (( omat++ ))   # haara poisti, main ei
    elif [[ -z ${mainissa[$blob]} ]] && ! git -C $k diff --quiet HEAD origin/main -- "$f" 2>/dev/null; then
      (( omat++ ))
    fi
  done
  if (( omat > 0 )) && ! (( UUSI )); then print -r -- "JÄLJESSÄ|$n|$jalj committia|haarassa ${haara:-irrotettu} $omat tiedostoa, joiden sisältö puuttuu mainista"; continue; fi
  if (( omat > 0 )) && [[ "$haara" == "koti/$n" ]]; then print -r -- "JÄLJESSÄ|$n|$jalj committia|koti/$n:ssa $omat omaa tiedostoa – ei ylikirjoiteta"; continue; fi
  if [[ "$haara" == main ]] && (( omat == 0 )); then toimi="main fast-forward"
  else toimi="haara koti/$n = origin/main (vanha ${haara:-irrotettu} säilyy$( (( omat > 0 )) && print -n ", siinä $omat mainista puuttuvaa tiedostoa"))"; fi
  # Seuraamattomat tiedostot, jotka mainissa ovat seurattuja: identtinen sisältö saa jäädä (main korvaa samalla sisällöllä),
  # eri sisältöinen SIIRRETÄÄN (mv, ei rm) kansioon /Users/Shared/Claude/arkisto/kotikansiot/<kansio>-<päivä>/<polku>.
  siirrettavat=(); identtiset=(); jaavat=0
  for f in ${(f)"$(git -C $k ls-files --others --exclude-standard)"}; do
    git -C $k cat-file -e "origin/main:$f" 2>/dev/null || continue
    if [[ "$(git -C $k hash-object -- "$k/$f")" == "$(git -C $k rev-parse "origin/main:$f")" ]]; then (( jaavat++ )); identtiset+=("$f"); else siirrettavat+=("$f"); fi
  done
  (( ${#siirrettavat} > 0 )) && toimi="$toimi; seuraamattomia siirretään arkistoon: ${#siirrettavat}"
  (( jaavat > 0 )) && toimi="$toimi; identtisiä seuraamattomia jää: $jaavat"
  if (( AJA )); then
    arkisto=/Users/Shared/Claude/arkisto/kotikansiot/$n-$(date +%Y%m%d); siirretyt=0
    for f in $siirrettavat; do
      mkdir -p "$arkisto/${f:h}" && mv -n -- "$k/$f" "$arkisto/$f" && [[ ! -e "$k/$f" ]] && (( siirretyt++ ))
    done
    (( siirretyt > 0 )) && toimi="$toimi [siirretty $siirretyt tiedostoa: $arkisto]"
    # Asetustiedosto: nykyinen sisältö talteen, seurattu versio takaisin, vaihto, sisältö tavu tavulta takaisin (myös vaihdon epäonnistuessa).
    talteen=""
    if git -C $k ls-files --error-unmatch -- $SALLITTU >/dev/null 2>&1 && ! git -C $k diff --quiet HEAD -- $SALLITTU; then
      talteen=$(mktemp) && cp -p "$k/$SALLITTU" "$talteen" && git -C $k checkout -- $SALLITTU || { print -r -- "JÄLJESSÄ|$n|$jalj committia|asetustiedoston talteenotto epäonnistui"; continue; }
    fi
    # Identtiset seuraamattomat lisätään indeksiin, jotta git ei pidä niitä ylikirjoitettavina; vaihdon jälkeen indeksi on mainin.
    (( ${#identtiset} > 0 )) && git -C $k add -f -- $identtiset
    if [[ "$haara" == main ]] && (( omat == 0 )); then virhe=$(git -C $k merge -q --ff-only origin/main 2>&1); else virhe=$(git -C $k switch -q -C "koti/$n" origin/main 2>&1); fi
    vaihto=$?
    (( vaihto != 0 && ${#identtiset} > 0 )) && git -C $k reset -q -- $identtiset   # peru indeksilisäys, tiedostot jäävät paikalleen
    if [[ -n $talteen ]]; then
      cp -p "$talteen" "$k/$SALLITTU" || print -r -- "VAROITUS|$n|asetustiedoston palautus epäonnistui, sisältö talteen: $talteen"
      toimi="$toimi; $SALLITTU palautettu ennalleen"
    fi
    if (( vaihto != 0 )); then print -r -- "JÄLJESSÄ|$n|$jalj committia|päivitys epäonnistui (haara ${haara:-irrotettu}): ${${(f)virhe}[1]}"; continue; fi
    print -r -- "PÄIVITETTY|$n|$jalj committia|$toimi"
  else
    print -r -- "PÄIVITETTÄISIIN|$n|$jalj committia|$toimi"
  fi
done
(( AJA )) || print -r -- "(kuiva-ajo: mitään ei muutettu; --aja päivittää)"
