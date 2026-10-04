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
         ulkokuori-hamara-4k.jpg ulkokuori-hamara-2k.jpg ulkokuori-4k.jpg ulkokuori-2k.jpg; do lisaa "ulkokuori/$f" "ulkokuori/$f"; done
# 8k-atlakset (laatusuunnitelma 30.9.: Real-ESRGAN ×4 → 8k täyden laadun laitteille), mukaan jos lähteessä on.
for f in ulkokuori-8k-4x4.astcm ulkokuori-hamara-8k-4x4.astcm ulkokuori-hamara-8k.jpg ulkokuori-8k.jpg; do
  if [ -f "$LAHDE/ulkokuori/$f" ]; then lisaa "ulkokuori/$f" "ulkokuori/$f"; fi
done
# Hybridi-PBR (laatusuunnitelma 30.9., menetelmä B): materiaalimaski + kirjaston 4 materiaalia (diff + nor_gl), maskin
# kanavajärjestyksessä R graniittilohkomuuri, G paanukatto, B kivilaatta, A kallio. Mukaan, jos lähteissä on.
KIRJASTO=${KIRJASTO:-/Users/Shared/Claude/proto-3d/_kirjasto/valmiit}
if [ -f "$LAHDE/ulkokuori/hybridi/kuori-materiaali-2k.png" ]; then
  lisaa "ulkokuori/hybridi/kuori-materiaali-2k.png" "ulkokuori/hybridi/kuori-materiaali-2k.png"
  for id in graniittilohkomuuri paanukatto kivilaatta kallio; do
    for k in diff.jpg nor_gl.jpg; do
      [ -f "$KIRJASTO/materiaali/$id/${id}_$k" ] || { echo "PUUTTUU: $KIRJASTO/materiaali/$id/${id}_$k" >&2; exit 1; }
      LISTA+=("kirjasto/materiaali/$id/${id}_$k|@$KIRJASTO/materiaali/$id/${id}_$k")
    done
    for k in diff-4x4.astcm nor_gl-4x4.astcm; do  # ASTC (1.10.), jos kirjastossa
      if [ -f "$KIRJASTO/materiaali/$id/${id}_$k" ]; then LISTA+=("kirjasto/materiaali/$id/${id}_$k|@$KIRJASTO/materiaali/$id/${id}_$k"); fi
    done
  done
fi
# Ympäristö (vaihe 5, aikakerros n1500, 1.10.2026): tools/dioraama/blender/ymparisto_putki.sh → $LAHDE/ymparisto/.
# Mukaan, jos lähteessä on (koko lista, tai ei mitään).
if [ -f "$LAHDE/ymparisto/ymparisto_huippu.glb" ]; then
  for f in ymparisto_huippu.glb ymparisto_normaali.glb ymparisto_kevyt.glb puut.json puukortit.png puukortit-hamara.png \
           puukortit.json horisontti.glb horisontti-1k.jpg horisontti-hamara-1k.jpg syvyys.png \
           ymparisto-8k-4x4.astcm ymparisto-4k-4x4.astcm ymparisto-2k-4x4.astcm \
           ymparisto-hamara-8k-4x4.astcm ymparisto-hamara-4k-4x4.astcm ymparisto-hamara-2k-4x4.astcm; do
    lisaa "ymparisto/$f" "ymparisto/$f"
  done
  # Lähimaasto (kerrosmaskit + CC0-kerrokset) ja aluskasvit, jos lähteessä (1.10.2026).
  if [ -f "$LAHDE/ymparisto/splat-0.png" ]; then
    for f in splat-0.png splat-1.png splat-normaali-0.png aluskasvit.png aluskasvit-hamara.png aluskasvit.json aluskasvit-lista.json; do
      lisaa "ymparisto/$f" "ymparisto/$f"
    done
    for f in "$LAHDE"/ymparisto/maasto/*_1k.jpg "$LAHDE"/ymparisto/maasto/*_1k-4x4.astcm(N); do lisaa "ymparisto/maasto/${f:t}" "ymparisto/maasto/${f:t}"; done
  fi
  # Puukorttien normaalikartta (v3), jos lähteessä.
  [ -f "$LAHDE/ymparisto/puukortit-normaali.png" ] && lisaa ymparisto/puukortit-normaali.png ymparisto/puukortit-normaali.png
  # Taivas (LDR-equirect päivä + hämärä, 1.10.2026), jos lähteessä.
  if [ -f "$LAHDE/ymparisto/taivas-2k.jpg" ] && [ -f "$LAHDE/ymparisto/taivas-hamara-2k.jpg" ]; then
    lisaa ymparisto/taivas-2k.jpg ymparisto/taivas-2k.jpg; lisaa ymparisto/taivas-hamara-2k.jpg ymparisto/taivas-hamara-2k.jpg
  fi
  # ASTC-mipketjut kuville (Siirtoseppä 1.10., ensilataus v2), jos lähteessä; png/jpg jäävät rinnalle.
  for f in puukortit puukortit-hamara puukortit-normaali horisontti-1k horisontti-hamara-1k taivas-2k taivas-hamara-2k \
           aluskasvit aluskasvit-hamara; do
    if [ -f "$LAHDE/ymparisto/$f-4x4.astcm" ]; then lisaa "ymparisto/$f-4x4.astcm" "ymparisto/$f-4x4.astcm"; fi
  done
fi
# Skinnatut hahmot (omistaja 2.10. 18.0x, Quaternius CC0; tools/dioraama/blender/hahmo_skin.py): hahmot/<henkilo>.glb, jos lähteessä.
for f in "$LAHDE"/hahmot/*.glb(N); do lisaa "hahmot/${f:t}" "hahmot/${f:t}"; done
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
  p=${r%%|*}; l=${r#*|}; [[ $l == @* ]] && f=${l#@} || f="$LAHDE/$l"; s=$(shasum -a 256 "$f" | cut -d' ' -f1); b=$(stat -L -f %z "$f")  # -L: symlinkatun tiedoston koko, ei linkin (4.10.: 55 tiedostoa oli kirjattu ~90 tavuksi)
  YHT=$((YHT + b)); echo "$p $s $b" >> "$TMP/rivit"; echo "$p $f" >> "$TMP/lahteet"
done
sort -o "$TMP/rivit" "$TMP/rivit"
# 2b. Siirtopakkaus (5.10.2026, Päätoimittaja: Brotli; muoto Siirtosepän ja Natiivisepän kanssa, tools/dioraama/pakkaus.mjs): .astcm/.glb/.json → <polku>.br,
# jos vähintään 5 % pienempi. Välimuisti sisällön sha256:n mukaan (sama lähde = sama pakattu, ei uudelleenpakkausta).
M=${PAKKAUS:-br}; [ "$M" = zst ] || M=br   # Brotli (.br, kenttä "br", Päätoimittaja 5.10.); PAKKAUS=zst mittauksiin
ZV=${PAKKAUS_VALIMUISTI:-/Users/Shared/Claude/proto-3d/_valmiit/pakkaus-valimuisti}; mkdir -p "$ZV"; : > "$TMP/zst"
while read -r p s b; do
  case "$p" in *.astcm|*.glb|*.json) ;; *) continue ;; esac
  if [ ! -f "$ZV/$s.$M.info" ]; then
    f=$(awk -v p="$p" '$1 == p { print $2; exit }' "$TMP/lahteet")
    PAKKAUS=$M nice -n 15 node "$REPO/tools/dioraama/pakkaus.mjs" tiedosto "$f" "$ZV/$s.$M" > "$ZV/$s.$M.info"
  fi
  read -r zs zb < "$ZV/$s.$M.info"; [ "$zs" = ohita ] || echo "$p $zs $zb" >> "$TMP/zst"
done < "$TMP/rivit"
# hash kattaa myös pakatut tiedostot: pakattu paketti saa oman muuttumattoman kansionsa
HASH=$( { cut -d' ' -f1,2 "$TMP/rivit"; awk -v m="$M" '{ print $1 "." m " " $2 }' "$TMP/zst"; } | shasum -a 256 | cut -c1-16)
N=$(wc -l < "$TMP/rivit" | tr -d ' ')
node -e '
const fs = require("fs"); const [, rivit, rakennus, hash, ulos, zst, muoto] = process.argv.slice(1);
const Z = Object.fromEntries(fs.readFileSync(zst, "utf8").trim().split("\n").filter(Boolean).map((l) => { const [p, s, t] = l.split(" "); return [p, { sha256: s, tavuja: Number(t) }]; }));
const tiedostot = fs.readFileSync(rivit, "utf8").trim().split("\n").map((l) => { const [polku, sha256, t] = l.split(" "); return Z[polku] ? { polku, sha256, tavuja: Number(t), [muoto]: Z[polku] } : { polku, sha256, tavuja: Number(t) }; });
fs.writeFileSync(ulos, JSON.stringify({ rakennus, hash, kansio: `dioraama/${rakennus}/blender/${hash}/`, tiedostot }, null, 2) + "\n");
' _ "$TMP/rivit" "$RAKENNUS" "$HASH" "$ULOS_JSON" "$TMP/zst" "$M"
cp "$ULOS_JSON" "$TMP/blender.json"
KOHDE="dioraama/$RAKENNUS/blender/$HASH"
echo "== Blender-vienti: $RAKENNUS → $KOHDE/"
NZ=$(wc -l < "$TMP/zst" | tr -d ' '); ZYHT=$(awk '{ s += $3 } END { print s + 0 }' "$TMP/zst")
echo "   tiedostoja $N (+ blender.json), yhteensä $((YHT / 1048576)) Mt; $M-tiedostoja $NZ ($((ZYHT / 1048576)) Mt)"
echo "   PUT-arvio: $((N + NZ + 1)) PUT-pyyntöä (R2 luokka A), ei poistoja; kansio on muuttumaton"
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
    i=$((i + 1)); f=$(awk -v p="$p" '$1 == p { print $2; exit }' "$TMP/lahteet")
    case "$p" in *.glb) ct=model/gltf-binary ;; *.jpg) ct=image/jpeg ;; *.png) ct=image/png ;; *.json) ct=application/json ;; *) ct=application/octet-stream ;; esac
    printf '   [%d/%d] %s (%d Mt)\n' $i $N "$p" $((b / 1048576))
    aws s3 cp "$f" "s3://$AMPARI/$KOHDE/$p" --endpoint-url "$PAATE" --no-progress --only-show-errors \
      --content-type "$ct" --cache-control 'public, max-age=31536000, immutable'
  done < "$TMP/rivit"
  while read -r p zs zb; do
    s=$(awk -v p="$p" '$1 == p { print $2; exit }' "$TMP/rivit")
    # EI Content-Encoding-otsaketta: pakattu tiedosto ladataan sellaisenaan ja natiivi purkaa (HTTP-asiakas ei saa purkaa itse)
    [ "$M" = br ] && ct=application/octet-stream || ct=application/zstd
    aws s3 cp "$ZV/$s.$M" "s3://$AMPARI/$KOHDE/$p.$M" --endpoint-url "$PAATE" --no-progress --only-show-errors \
      --content-type $ct --cache-control 'public, max-age=31536000, immutable'
  done < "$TMP/zst"
  aws s3 cp "$TMP/blender.json" "s3://$AMPARI/$KOHDE/blender.json" --endpoint-url "$PAATE" --only-show-errors \
    --content-type application/json --cache-control 'public, max-age=31536000, immutable'
fi
JULKINEN=${JULKINEN:-https://media.matkakirja.app}
koodi=$(curl -s -o /dev/null -w '%{http_code}' "$JULKINEN/$KOHDE/blender.json")
[ "$koodi" = 200 ] || { echo "VIRHE: $JULKINEN/$KOHDE/blender.json vastasi $koodi" >&2; exit 1; }
echo "== Valmis: $JULKINEN/$KOHDE/ (blender.json 200). Seuraavaksi: commit $ULOS_JSON mainiin (PR), CI vaihtaa osoittimen."
