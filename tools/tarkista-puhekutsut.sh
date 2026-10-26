#!/bin/sh
# Suomi aina pakotettuna (omistaja 18.10.2026 klo 17.55): skannaa proto-3d:n generointiskriptit (repon ulkopuolella, joten tests/ ei yllä niihin).
# Jokainen ElevenLabsin puhepäätettä (text-to-speech / text-to-dialogue) kutsuva .py/.zsh/.sh/.mjs/.js-tiedosto tarvitsee `elevenlabs_kieli`,
# `kieliFi`, `kieli_fi` tai kirjaimellisen language_code-kentän. Lisäksi proto-3d/tyokalut/elevenlabs_kieli.py on oltava identtinen
# tools/elevenlabs_kieli.py:n kanssa (repon kopio on lähde).
# Käyttö: tools/tarkista-puhekutsut.sh [proto-3d-juuri]    Poistumiskoodi = poikkeamien määrä (0 = kunnossa). Postivahti ajaa kierroksellaan.
P3D="${1:-/Users/Shared/Claude/proto-3d}"
TOOLS="$(cd "$(dirname "$0")" && pwd)"
ONGELMIA=0
for juuri in "$P3D/_tyo" "$P3D/tyokalut" "$P3D/_tyokalut"; do
  [ -d "$juuri" ] || continue
  find "$juuri" \( -name 'venv*' -o -name node_modules -o -name site-packages -o -name '.git' \) -prune -o -type f \
    \( -name '*.py' -o -name '*.zsh' -o -name '*.sh' -o -name '*.mjs' -o -name '*.js' \) -print 2>/dev/null |
  while IFS= read -r f; do
    case "$f" in */elevenlabs_kieli.py|*/elevenlabs-kieli.mjs|*/tarkista-puhekutsut.sh) continue;; esac
    grep -qE '/v1/text-to-(speech|dialogue)' "$f" 2>/dev/null || continue
    grep -qE "elevenlabs_kieli|kieliFi|kieli_fi|language_code" "$f" || echo "PUUTTUU language_code: $f"
  done
done > /tmp/tarkista-puhekutsut.$$ 2>&1
cat /tmp/tarkista-puhekutsut.$$
ONGELMIA=$(grep -c '^PUUTTUU' /tmp/tarkista-puhekutsut.$$)
rm -f /tmp/tarkista-puhekutsut.$$
if [ -f "$P3D/tyokalut/elevenlabs_kieli.py" ] && ! cmp -s "$TOOLS/elevenlabs_kieli.py" "$P3D/tyokalut/elevenlabs_kieli.py"; then
  echo "EROAA: $P3D/tyokalut/elevenlabs_kieli.py ei vastaa tools/elevenlabs_kieli.py:tä (kopioi repon versio)"; ONGELMIA=$((ONGELMIA + 1))
fi
[ -f "$P3D/tyokalut/elevenlabs_kieli.py" ] || { echo "PUUTTUU: $P3D/tyokalut/elevenlabs_kieli.py"; ONGELMIA=$((ONGELMIA + 1)); }
echo "tarkista-puhekutsut: $ONGELMIA poikkeamaa"
exit "$ONGELMIA"
