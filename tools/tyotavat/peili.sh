#!/bin/bash
# TYÖTAPOJEN PEILI (Päätoimittaja 14.10.2026, kylmäkäynnistystesti): Macin vain-paikalliset ohjeet ja skriptit
# kopioidaan gittiin kansioon tools/tyotavat/, jotta uusi tili tai kone löytää ne. Mac-polku on totuus.
# Käyttö (repon juuresta tai mistä tahansa):
#   bash tools/tyotavat/peili.sh --tarkista   # listaa erot, ei kopioi (exit 1, jos eroja)
#   bash tools/tyotavat/peili.sh              # kopioi Macin versiot peiliin (sitten commit + push)
# Ennen kopiointia tarkistetaan, ettei tiedostossa ole avaimia; osuma pysäyttää kopioinnin.
KOHDE="$(cd "$(dirname "$0")" && pwd)"
ASEMA="$(cd "$KOHDE/../asemataulu" && pwd)"
S=/Users/Shared/Claude
F=$S/Matkakirja-fable/scratchpad
PARIT=(
  "$F/jonokierros-teksti.md|$KOHDE/jonokierros-teksti.md"
  "$S/Matkakirja-posti/KIERROS.md|$KOHDE/KIERROS.md"
  "$S/Matkakirja-posti/NOLLAUS.md|$KOHDE/NOLLAUS.md"
  "$S/Matkakirja-posti/codex-odottaa.py|$KOHDE/codex-odottaa.py"
  "$S/hooks/odottajat-vahti.py|$KOHDE/odottajat-vahti.py"
  "$F/asemataulu/ASEMATAULU-ROOLI.md|$KOHDE/ASEMATAULU-ROOLI.md"
  "$S/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py|$KOHDE/unity-julkaisut.py"
  "$F/asemataulu/kulutus.py|$ASEMA/kulutus.py"
  "$F/asemataulu/laitteet.py|$ASEMA/laitteet.py"
  "$F/asemataulu/paivita.py|$ASEMA/paivita.py"
  "$F/asemataulu/synkka.py|$ASEMA/synkka.py"
  "$F/asemataulu/kone.py|$ASEMA/kone.py"
  "$F/asemataulu/syke.py|$ASEMA/syke.py"
)
EROJA=0
for pari in "${PARIT[@]}"; do
  lahde="${pari%%|*}"; kohde="${pari##*|}"
  if [ ! -f "$lahde" ]; then echo "PUUTTUU Macilta: $lahde"; EROJA=1; continue; fi
  if cmp -s "$lahde" "$kohde"; then continue; fi
  EROJA=1
  if [ "$1" = "--tarkista" ]; then echo "ERO: $lahde -> $kohde"; continue; fi
  if grep -q -E 'sk-ant-|ghp_|github_pat_|AKIA[0-9A-Z]{12}|xi-api-key|Bearer [A-Za-z0-9]' "$lahde"; then
    echo "AVAINEPÄILY, ei kopioitu: $lahde"; continue
  fi
  cp "$lahde" "$kohde" && echo "päivitetty: $kohde"
done
[ "$1" = "--tarkista" ] && exit $EROJA
exit 0
