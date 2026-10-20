#!/bin/zsh
# VANHAT LUOVUTUKSET ARKISTOON (omistajan päätös 20.10.2026 klo 22.24, karsinta B4; loki #5071): docs/raportit/viesti-<rooli>-
# luovutus-* paitsi roolin uusin → docs/arkisto/luovutukset/ (arkisto ei ole ohje, CLAUDE.md "Arkisto"). Uusin = viimeisin
# commit-aika (tiedostonimien päiväyksen jälkiliitteet aamu/ilta/yo/1750 eivät järjesty aakkosjärjestyksessä).
#
#   zsh tools/arkistoi-vanhat.sh          kuiva-ajo (oletus): määrät per rooli ja säilyvä uusin
#   zsh tools/arkistoi-vanhat.sh --aja    git mv (commit ja PR erikseen; PT päättää ajon)
emulate -L zsh
setopt null_glob
cd "${0:A:h}/.." || exit 1
AJA=0; [[ "$1" == "--aja" ]] && AJA=1
KOHDE=docs/arkisto/luovutukset
typeset -A uusin uusinAika maara
tiedostot=(docs/raportit/viesti-*-luovutus*)
for f in $tiedostot; do
  r=${${f:t}#viesti-}; r=${r%%-luovutus*}
  t=$(git log -1 --format=%ct -- $f 2>/dev/null); t=${t:-0}
  (( maara[$r]++ ))
  if (( t >= ${uusinAika[$r]:-0} )); then uusinAika[$r]=$t; uusin[$r]=$f; fi
done
siirrettavia=0
(( AJA )) && mkdir -p $KOHDE
for r in ${(ko)maara}; do
  n=$(( maara[$r] - 1 ))
  print -r -- "$r: $n arkistoon, säilyy ${uusin[$r]:t}"
  (( siirrettavia += n ))
done
if (( AJA )); then
  for f in $tiedostot; do
    r=${${f:t}#viesti-}; r=${r%%-luovutus*}
    [[ $f == ${uusin[$r]} ]] && continue
    git mv -k "$f" "$KOHDE/${f:t}"
  done
  print -r -- "(siirretty $siirrettavia tiedostoa → $KOHDE; tarkista git status ja commitoi)"
else
  print -r -- "(kuiva-ajo: $siirrettavia / ${#tiedostot} tiedostoa siirtyisi → $KOHDE; --aja siirtää)"
fi
