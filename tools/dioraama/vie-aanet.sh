#!/bin/zsh
# DIORAAMAN ÄÄNET ÄMPÄRIIN (Linnanrakentaja 30.9.2026; OMISTAJA AJAA, kuten vie-blender.sh). mp3:t eivät ole repossa
# (VARTIO), vaan ne viedään polkuun dioraama/<rakennus>/aanet/v<versio>/<id>.mp3, johon rakennus.json:n aanet[].tiedosto
# viittaa (tools/dioraama/rakenna.mjs). Versio luetaan js/dioraama/pankit/aanet.js:stä ääni kerrallaan.
#
# Turvallisuus: olemassa olevaa tiedostoa EI ylikirjoiteta (natiivi välimuistittaa URL:n mukaan, uusintaotto = uusi
# versio pankissa). Vain pankissa olevat id:t viedään. Lopuksi tarkistetaan julkinen URL (200).
#
# Käyttö:  tools/dioraama/vie-aanet.sh [--kuiva] [--rakennus olavinlinna] <kansio, jossa <id>.mp3-tiedostot>
#   esim.  tools/dioraama/vie-aanet.sh --kuiva /Users/Shared/Claude/proto-3d/_valmiit/linna-aanet/vienti-v1
# Avaimet VAIN ympäristöstä: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AMPARI (tai R2_BUCKET), PAATE (tai R2_ACCOUNT_ID).
set -euo pipefail
KUIVA=0; RAKENNUS=olavinlinna; KANSIO=""
while [ $# -gt 0 ]; do
  case "$1" in
    --kuiva) KUIVA=1; shift ;;
    --rakennus) RAKENNUS="$2"; shift 2 ;;
    AWS_*|--avain*|--salaisuus*) echo "Avaimia ei anneta argumentteina — vain ympäristöstä." >&2; exit 2 ;;
    -*) echo "Tuntematon valinta: $1" >&2; exit 2 ;;
    *) KANSIO="$1"; shift ;;
  esac
done
[ -d "$KANSIO" ] || { echo "Anna mp3-kansio (esim. proto-3d/_valmiit/linna-aanet/vienti-v1)" >&2; exit 2; }
REPO=${0:A:h:h:h}
# id → versio pankista (vain kansiossa olevat ja pankissa olevat).
LISTA=$(node --input-type=module -e "
import { AANET } from '$REPO/js/dioraama/pankit/aanet.js';
import { readdirSync } from 'node:fs';
for (const f of readdirSync(process.argv[1]).filter((x) => x.endsWith('.mp3')).sort()) {
  const id = f.slice(0, -4);
  if (!AANET[id]) { console.error('EI PANKISSA (ohitetaan): ' + id); continue; }
  console.log(id + ' ' + (AANET[id].versio ?? 1));
}" "$KANSIO")
N=$(echo "$LISTA" | grep -c . || true)
YHT=$(du -ck "$KANSIO"/*.mp3 | tail -1 | cut -f1)
echo "== Äänivienti: $RAKENNUS, $N ääntä ($((YHT / 1024)) Mt) → dioraama/$RAKENNUS/aanet/v<versio>/"
[ "$KUIVA" = 1 ] && { echo "$LISTA" | sed 's/^/   /'; echo "   (kuiva-ajo: ei latausta)"; exit 0; }
AMPARI=${AMPARI:-${R2_BUCKET:-}}; PAATE=${PAATE:-${R2_ACCOUNT_ID:+https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com}}
for v in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AMPARI PAATE; do [ -n "${(P)v:-}" ] || { echo "Ympäristöstä puuttuu $v" >&2; exit 1; }; done
JULKINEN=${JULKINEN:-https://media.matkakirja.app}
vietiin=0; ohitettiin=0; virheet=0
echo "$LISTA" | while read -r id ver; do
  [ -n "$id" ] || continue
  kohde="dioraama/$RAKENNUS/aanet/v$ver/$id.mp3"
  if aws s3 ls "s3://$AMPARI/$kohde" --endpoint-url "$PAATE" >/dev/null 2>&1; then
    echo "   = $kohde (on jo, ei ylikirjoiteta)"; ohitettiin=$((ohitettiin + 1)); continue
  fi
  aws s3 cp "$KANSIO/$id.mp3" "s3://$AMPARI/$kohde" --endpoint-url "$PAATE" --no-progress --only-show-errors \
    --content-type audio/mpeg --cache-control 'public, max-age=31536000, immutable'
  koodi=$(curl -s -o /dev/null -w '%{http_code}' "$JULKINEN/$kohde")
  if [ "$koodi" = "200" ]; then echo "   + $kohde"; vietiin=$((vietiin + 1)); else echo "   ! $kohde → $koodi" >&2; virheet=$((virheet + 1)); fi
done
echo "== Valmis: viety $vietiin, jo ämpärissä $ohitettiin, virheitä $virheet"
[ "$virheet" = 0 ]
