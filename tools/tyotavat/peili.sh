#!/bin/bash
# TYÖTAPOJEN PEILI (Päätoimittaja 14.10.2026, kylmäkäynnistystestit 1 ja 2): Macin vain-paikalliset ohjeet ja skriptit
# kopioidaan gittiin kansioon tools/tyotavat/ (ja tools/asemataulu/, tools/hooks/), jotta uusi tili tai kone löytää ne.
# Mac-polku on totuus.
# Käyttö (repon juuresta tai mistä tahansa):
#   bash tools/tyotavat/peili.sh --tarkista   # listaa erot, ei kopioi (exit 1, jos eroja)
#   bash tools/tyotavat/peili.sh              # kopioi Macin versiot peiliin (sitten commit + push)
# Ennen kopiointia tarkistetaan, ettei tiedostossa ole avaimia; osuma pysäyttää kopioinnin.
KOHDE="$(cd "$(dirname "$0")" && pwd)"
ASEMA="$(cd "$KOHDE/../asemataulu" && pwd)"
HOOKS="$(cd "$KOHDE/../hooks" && pwd)"
S=/Users/Shared/Claude
F=$S/Matkakirja-fable/scratchpad
J=$S/julkaisija-tyokalut
PARIT=(
  "$F/jonokierros-teksti.md|$KOHDE/jonokierros-teksti.md"
  "$S/Matkakirja-posti/KIERROS.md|$KOHDE/KIERROS.md"
  "$S/Matkakirja-posti/NOLLAUS.md|$KOHDE/NOLLAUS.md"
  "$S/Matkakirja-posti/codex-odottaa.py|$KOHDE/codex-odottaa.py"
  "$S/hooks/odottajat-vahti.py|$KOHDE/odottajat-vahti.py"
  "$S/hooks/pt-taulu-muistutus.py|$HOOKS/pt-taulu-muistutus.py"
  "$S/osoitekirja.md|$KOHDE/osoitekirja.md"
  "$F/keskustelukanava/aloitus.md|$KOHDE/keskustelukanava-aloitus.md"
  "$S/Matkakirja-fable/.claude/settings.local.json|$KOHDE/settings.local.json.malli"
  "$S/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py|$KOHDE/unity-julkaisut.py"
  "$F/asemataulu/osoitteet.md|$ASEMA/osoitteet.md"
)
# ASEMATAULUN KOODI JA OHJE EIVÄT OLE PEILISSÄ (omistaja 19.10.2026 klo 19.51, docs/moduulit/asemataulu.md luku 1): totuus on
# repossa tools/asemataulu/, ja työkansion kopiot syntyvät komennolla python3 -I tools/asemataulu/asemataulu.py.
# Peilissä vain Asemataulun TILA uuden Macin siemeneksi: osoitteet.md ja tietokannan pohjatiedot data/talo/*.json
for f in "$F"/asemataulu/data/talo/*.json; do
  [ -f "$f" ] && PARIT+=("$f|$ASEMA/data/talo/$(basename "$f")")
done
# Julkaisijan pysyvät työkalut (vahdit, merge, vienti, CDN); kertakäyttöiset ketju-/tf<N>-/merge-<PR>-skriptit eivät kuulu peiliin.
for n in valoseppa-vahti.zsh valoseppa-vahti-kaynnista.zsh lukkovahti.zsh olavinlinna-vahti.zsh simu-muistivahti.zsh \
         merge-vihreana-sha.zsh odota-ja-mergea.zsh tarkista-cdn.zsh vie-indeksi-viimeisena.zsh vie-paketti-uusinta.zsh \
         vie-paketti.sh cesium-tarkistus.zsh aanisivu-julkaise.zsh aanisivu-cf-luo.zsh; do
  PARIT+=("$J/$n|$KOHDE/julkaisija/$n")
done
EROJA=0
for pari in "${PARIT[@]}"; do
  lahde="${pari%%|*}"; kohde="${pari##*|}"
  if [ ! -f "$lahde" ]; then echo "PUUTTUU Macilta: $lahde"; EROJA=1; continue; fi
  if cmp -s "$lahde" "$kohde"; then continue; fi
  EROJA=1
  if [ "$1" = "--tarkista" ]; then echo "ERO: $lahde -> $kohde"; continue; fi
  if grep -q -E 'sk-ant-|ghp_|github_pat_|AKIA[0-9A-Z]{12}|xi-api-key|Bearer [A-Za-z0-9]|"(api_?key|token|secret)" *: *"[^"]+"' "$lahde"; then
    echo "AVAINEPÄILY, ei kopioitu: $lahde"; continue
  fi
  mkdir -p "$(dirname "$kohde")"
  cp "$lahde" "$kohde" && echo "päivitetty: $kohde"
done
[ "$1" = "--tarkista" ] && exit $EROJA
exit 0
