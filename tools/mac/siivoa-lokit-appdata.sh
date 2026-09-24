#!/bin/zsh
# Poistaa proto-3d/lokit-kansioista sovelluksen datakopiot (aanet, offline, kuvat,
# sisalto, laatat, maasto, Documents), jotka eivät kuulu lokiin (muistio 24.9.2026:
# lokikansiot = vain kuvat + konsoli). Oletuksena vain listaa; --poista poistaa.
# Ajo: omistaja. Kuvat, videot ja konsolilokit säilyvät.
set -u
JUURI=/Users/Shared/Claude/proto-3d/lokit
LISTA=$(mktemp)
find "$JUURI" -mindepth 2 -maxdepth 4 -type d \
  \( -name aanet -o -name offline -o -name kuvat -o -name sisalto -o -name laatat -o -name maasto -o -name Documents \) \
  -prune 2>/dev/null > "$LISTA"
MAARA=$(wc -l < "$LISTA" | tr -d ' ')
KOKO=$(cat "$LISTA" | xargs du -sk 2>/dev/null | awk '{s+=$1} END {printf "%.1f", s/1024/1024}')
echo "Löytyi $MAARA datakansiota, yhteensä ${KOKO} Gt."
if [[ "${1:-}" == "--poista" ]]; then
  while IFS= read -r d; do
    case "$d" in "$JUURI"/*) rm -rf -- "$d" ;; esac
  done < "$LISTA"
  echo "Poistettu. Vapaana nyt: $(df -h /System/Volumes/Data | awk 'NR==2 {print $4}')"
else
  head -20 "$LISTA"
  echo "… (vain listaus; poista ajamalla: $0 --poista)"
fi
rm -f "$LISTA"
