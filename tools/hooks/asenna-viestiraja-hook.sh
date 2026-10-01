#!/bin/bash
# Asentaa viestirajan muistutushookin käyttäjätasolle (~/.claude/settings.json), jotta se on
# heti käytössä KAIKISSA tämän Mac-käyttäjän sessioissa riippumatta siitä, mihin haaraan
# roolin checkout osoittaa. Idempotentti: ajo uudelleen ei lisää kaksoismerkintöjä.
# Raamattu: VIESTIRAJA JA VARAKANAVAT (omistaja 30.9.2026). Projektitasolla sama hook on
# .claude/settings.json:ssa; kaksoisajo estyy skriptin mkdir-lukolla.
# Käyttö: bash tools/hooks/asenna-viestiraja-hook.sh [--tarkista]
set -euo pipefail
juuri="$(cd "$(dirname "$0")/../.." && pwd)"
lahde="$juuri/tools/hooks/viestiraja-muistutus.sh"
kohde_kansio=/Users/Shared/Claude/hooks
kohde="$kohde_kansio/viestiraja-muistutus.sh"
asetukset="$HOME/.claude/settings.json"
komento="[ -f $kohde ] && bash $kohde || true"

if [ "${1:-}" = "--tarkista" ]; then
  ok=1
  [ -f "$kohde" ] && cmp -s "$lahde" "$kohde" || { echo "PUUTTUU/VANHA: $kohde"; ok=0; }
  for ev in PostToolUse PostToolUseFailure; do
    jq -e --arg ev "$ev" '.hooks[$ev][]? | select(.matcher == "SendMessage") | .hooks[] | select(.command | test("viestiraja-muistutus"))' "$asetukset" >/dev/null 2>&1 \
      || { echo "PUUTTUU: $ev-hook tiedostosta $asetukset"; ok=0; }
  done
  [ $ok = 1 ] && echo "viestirajahook OK ($asetukset)"; [ $ok = 1 ]; exit
fi

mkdir -p "$kohde_kansio"
cp "$lahde" "$kohde.uusi" && chmod 755 "$kohde.uusi" && mv "$kohde.uusi" "$kohde"
[ -f "$asetukset" ] || echo '{}' > "$asetukset"
tmp="$(mktemp "$asetukset.XXXXXX")"
jq --arg komento "$komento" '
  def lisaa(ev): .hooks[ev] = (
    ((.hooks[ev] // []) | map(select(((.hooks // []) | map(.command // "") | any(test("viestiraja-muistutus"))) | not)))
    + [{matcher: "SendMessage", hooks: [{type: "command", command: $komento, timeout: 10}]}]);
  lisaa("PostToolUse") | lisaa("PostToolUseFailure")' "$asetukset" > "$tmp"
jq -e . "$tmp" >/dev/null
chmod --reference="$asetukset" "$tmp" 2>/dev/null || chmod 600 "$tmp"
mv "$tmp" "$asetukset"
echo "Asennettu: $kohde + hookit PostToolUse/PostToolUseFailure (SendMessage) tiedostoon $asetukset"
