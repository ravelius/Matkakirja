#!/bin/zsh
# DIORAAMAN BLENDER-TUOTOKSET ÄMPÄRIIN (Linnanrakentaja 30.9.2026; Päätoimittaja: omistaja ajaa, kuten kartta-viennit).
# TF 1.0.61 näytti Poikkileikkaus-linssissä proseduraalisen palikkalinnan, koska fotogrammetriakuori, leivotut tilat ja
# päivä-/hämäräatlakset olivat vain paikallisessa _valmiit-kansiossa (Siirtosepän peili), eivät julkaistussa paketissa.
#
# Mitä tekee:
#   1. Kokoaa natiivin käyttämät tiedostot (kuori 3 laatutasoa + astcm, leivotut tilat, valoatlakset astc + jpg).
#   2. Laskee sisältöhashin ja kirjoittaa committoitavan js/dioraama/rakennukset/<rakennus>/blender.json:n.
#   3. Lataa tiedostot MUUTTUMATTOMAAN kansioon s3://$AMPARI/dioraama/<rakennus>/blender/<hash>/ (immutable-välimuisti),
#      blender.json viimeisenä valmiusmerkiksi, ja tarkistaa julkisen URL:n.
#   Osoitin (uusin.json) EI vaihdu tässä: kun blender.json on mainissa, vie-dioraama.yml kopioi kansion palvelimella
#   uuteen paketin hash-kansioon (<hash>/blender/) ja vaihtaa osoittimen vasta sitten.
#
# PEILI EI OLE JULKAISU (sääntö kaikille dioraamoille): jokainen _valmiit/<rakennus>-blender-muutos (uusi leivonta,
# kuori, atlas) vaatii uuden ajon tällä skriptillä (uusi hash) ja blender.json-commitin mainiin. Ilman sitä julkaistu
# paketti jää vanhaan tai on proseduraalinen palikkamalli. Koko putki (leivonta → vienti → merge → CI-kopio →
# todennus puhtaalla asennuksella): tools/dioraama/rakenna.mjs:n alkukommentti BLENDER-PUTKI ja docs/moduulit/linssit.md
# osio 12. tests/dioraama-blender.test.mjs hylkää paketin, josta puuttuu ulkokuori, kun blender.json on olemassa.
#
# Käyttö:  tools/dioraama/vie-blender.sh [--kuiva] [--lahde <kansio>] [--rakennus olavinlinna]
#   --kuiva  vain lista, koko, PUT-arvio ja blender.json, ei latausta.
# Avaimet VAIN ympäristöstä: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AMPARI (tai R2_BUCKET), PAATE (tai R2_ACCOUNT_ID).
set -euo pipefail
KUIVA=0; RAKENNUS=olavinlinna; LAHDE=/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender
while [ $# -gt 0 ]; do
  case "$1" in
    --kuiva) KUIVA=1; shift ;;
    --lahde) LAHDE="$2"; shift 2 ;;
    --rakennus) RAKENNUS="$2"; shift 2 ;;
    AWS_*|--avain*|--salaisuus*) echo "Avaimia ei anneta argumentteina — vain ympäristöstä." >&2; exit 2 ;;
    *) echo "Tuntematon valinta: $1" >&2; exit 2 ;;
  esac
done
REPO=${0:A:h:h:h}
ULOS_JSON="$REPO/js/dioraama/rakennukset/$RAKENNUS/blender.json"
[ -d "$LAHDE" ] || { echo "Lähdekansio puuttuu: $LAHDE" >&2; exit 1; }

# 1. Tiedostolista: "paketin-polku lähdetiedosto" (vain natiivin viittaamat; ei senaatti-alkup, ei ulkokuori-4k.jpg).
typeset -a LISTA
lisaa() { [ -f "$LAHDE/$2" ] || { echo "PUUTTUU: $LAHDE/$2" >&2; exit 1; }; LISTA+=("$1|$2"); }
for t in huippu normaali kevyt; do lisaa "ulkokuori/ulkokuori_$t.glb" "ulkokuori/ulkokuori_$t.glb"; done
for f in ulkokuori-4k-4x4.astcm ulkokuori-2k-4x4.astcm ulkokuori-hamara-4k-4x4.astcm ulkokuori-hamara-2k-4x4.astcm \
         ulkokuori-hamara-4k.jpg ulkokuori-hamara-2k.jpg; do lisaa "ulkokuori/$f" "ulkokuori/$f"; done
# 8k-atlakset (laatusuunnitelma 30.9.: Real-ESRGAN ×4 → 8k täyden laadun laitteille), mukaan jos lähteessä on.
for f in ulkokuori-8k-4x4.astcm ulkokuori-hamara-8k-4x4.astcm ulkokuori-hamara-8k.jpg; do
  if [ -f "$LAHDE/ulkokuori/$f" ]; then lisaa "ulkokuori/$f" "ulkokuori/$f"; fi
done
for g in "$LAHDE"/tilat/*.glb; do
  id=${g:t:r}; lisaa "tilat/$id.glb" "tilat/$id.glb"
  for v in "" "-hamara"; do
    [ -f "$LAHDE/valot/$id$v.jpg" ] || continue
    for f in "$id$v.jpg" "$id$v-2k.jpg" "$id$v-4x4.astcm" "$id$v-2k-4x4.astcm"; do lisaa "valot/$f" "valot/$f"; done
  done
done

# 2. sha256, koko, sisältöhash ja blender.json (aakkosjärjestys, ei aikaleimoja → sama sisältö = sama hash).
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
YHT=0
for r in "${LISTA[@]}"; do
  p=${r%%|*}; l=${r#*|}; s=$(shasum -a 256 "$LAHDE/$l" | cut -d' ' -f1); b=$(stat -f %z "$LAHDE/$l")
  YHT=$((YHT + b)); echo "$p $s $b" >> "$TMP/rivit"
done
sort -o "$TMP/rivit" "$TMP/rivit"
HASH=$(cut -d' ' -f1,2 "$TMP/rivit" | shasum -a 256 | cut -c1-16)
N=$(wc -l < "$TMP/rivit" | tr -d ' ')
node -e '
const fs = require("fs"); const [, rivit, rakennus, hash, ulos] = process.argv.slice(1);
const tiedostot = fs.readFileSync(rivit, "utf8").trim().split("\n").map((l) => { const [polku, sha256, t] = l.split(" "); return { polku, sha256, tavuja: Number(t) }; });
fs.writeFileSync(ulos, JSON.stringify({ rakennus, hash, kansio: `dioraama/${rakennus}/blender/${hash}/`, tiedostot }, null, 2) + "\n");
' _ "$TMP/rivit" "$RAKENNUS" "$HASH" "$ULOS_JSON"
cp "$ULOS_JSON" "$TMP/blender.json"
KOHDE="dioraama/$RAKENNUS/blender/$HASH"
echo "== Blender-vienti: $RAKENNUS → $KOHDE/"
echo "   tiedostoja $N (+ blender.json), yhteensä $((YHT / 1048576)) Mt"
echo "   PUT-arvio: $((N + 1)) PUT-pyyntöä (R2 luokka A), ei poistoja; kansio on muuttumaton"
echo "   blender.json kirjoitettu: $ULOS_JSON"
[ "$KUIVA" = 1 ] && { echo "   (kuiva-ajo: ei latausta)"; exit 0; }

# 3. Lataus.
AMPARI=${AMPARI:-${R2_BUCKET:-}}; PAATE=${PAATE:-${R2_ACCOUNT_ID:+https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com}}
for v in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AMPARI PAATE; do [ -n "${(P)v:-}" ] || { echo "Ympäristöstä puuttuu $v" >&2; exit 1; }; done
if aws s3 ls "s3://$AMPARI/$KOHDE/blender.json" --endpoint-url "$PAATE" >/dev/null 2>&1; then
  echo "   Kansio on jo ämpärissä (blender.json löytyi) — ei ladata uudelleen."
else
  i=0
  while read -r p s b; do
    i=$((i + 1)); l=$p
    case "$p" in *.glb) ct=model/gltf-binary ;; *.jpg) ct=image/jpeg ;; *) ct=application/octet-stream ;; esac
    printf '   [%d/%d] %s (%d Mt)\n' $i $N "$p" $((b / 1048576))
    aws s3 cp "$LAHDE/$l" "s3://$AMPARI/$KOHDE/$p" --endpoint-url "$PAATE" --no-progress --only-show-errors \
      --content-type "$ct" --cache-control 'public, max-age=31536000, immutable'
  done < "$TMP/rivit"
  aws s3 cp "$TMP/blender.json" "s3://$AMPARI/$KOHDE/blender.json" --endpoint-url "$PAATE" --only-show-errors \
    --content-type application/json --cache-control 'public, max-age=31536000, immutable'
fi
JULKINEN=${JULKINEN:-https://media.matkakirja.app}
koodi=$(curl -s -o /dev/null -w '%{http_code}' "$JULKINEN/$KOHDE/blender.json")
[ "$koodi" = 200 ] || { echo "VIRHE: $JULKINEN/$KOHDE/blender.json vastasi $koodi" >&2; exit 1; }
echo "== Valmis: $JULKINEN/$KOHDE/ (blender.json 200). Seuraavaksi: commit $ULOS_JSON mainiin (PR), CI vaihtaa osoittimen."
