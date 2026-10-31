#!/bin/bash
# Asentaa KONTEKSTIVAHDIN kaikille rooleille käyttäjätasolle (~/.claude/settings.json), jolloin se koskee jokaista
# roolikansiota ja worktreetä. Omistaja ajaa itse tilinvaihdossa (omistaja 31.10.2026 klo 22.17; sessiot eivät muuta
# asetuksia). Rajat roolin kansion mukaan: tools/hooks/kontekstivahti.py (Raamattu 7.37). Matkakirja-fable ohitetaan
# (PT:n ja KK:n oma vahti). Idempotentti: ajo uudelleen ei lisää kaksoismerkintöjä.
# Käyttö: bash tools/hooks/asenna-kontekstivahti-hook.sh [--tarkista]
set -euo pipefail
juuri="$(cd "$(dirname "$0")/../.." && pwd)"
lahde="$juuri/tools/hooks/kontekstivahti.py"
kohde_kansio=/Users/Shared/Claude/hooks
kohde="$kohde_kansio/kontekstivahti.py"
asetukset="$HOME/.claude/settings.json"
komento="[ -f $kohde ] && python3 -I $kohde || true"

if [ "${1:-}" = "--tarkista" ]; then
  ok=1
  [ -f "$kohde" ] && cmp -s "$lahde" "$kohde" || { echo "PUUTTUU/VANHA: $kohde"; ok=0; }
  for ev in PostToolUse UserPromptSubmit; do
    jq -e --arg ev "$ev" '.hooks[$ev][]? | .hooks[] | select(.command | test("kontekstivahti"))' "$asetukset" >/dev/null 2>&1 \
      || { echo "PUUTTUU: $ev-hook tiedostosta $asetukset"; ok=0; }
  done
  [ $ok = 1 ] && echo "kontekstivahti OK ($asetukset)"; [ $ok = 1 ]; exit
fi

mkdir -p "$kohde_kansio"
cp "$lahde" "$kohde.uusi" && chmod 755 "$kohde.uusi" && mv "$kohde.uusi" "$kohde"
[ -f "$asetukset" ] || echo '{}' > "$asetukset"
tmp="$(mktemp "$asetukset.XXXXXX")"
jq --arg komento "$komento" '
  def lisaa(ev; m): .hooks[ev] = (
    ((.hooks[ev] // []) | map(select(((.hooks // []) | map(.command // "") | any(test("kontekstivahti"))) | not)))
    + [(if m == "" then {} else {matcher: m} end) + {hooks: [{type: "command", command: $komento, timeout: 10}]}]);
  lisaa("PostToolUse"; "*") | lisaa("UserPromptSubmit"; "")' "$asetukset" > "$tmp"
jq -e . "$tmp" >/dev/null
chmod --reference="$asetukset" "$tmp" 2>/dev/null || chmod 600 "$tmp"
mv "$tmp" "$asetukset"
echo "Asennettu: $kohde + hookit PostToolUse/UserPromptSubmit tiedostoon $asetukset"
