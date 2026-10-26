#!/bin/zsh
# LINNAKIRJASTO ÄMPÄRIIN (Linnanrakentaja 4.10.2026; speksi docs/raportit/linnakirjasto-20260930.md kohta 3).
# Kirjaston assetit (materiaalit, tarrat, hahmot, taivaat, esiasetukset) omaan MUUTTUMATTOMAAN kansioon
# s3://$AMPARI/dioraama/kirjasto/<hash>/, jotta seuraava linna viittaa samoihin tiedostoihin eikä niitä kopioida joka
# rakennuksen pakettiin. Olavinlinnan blender-paketti (vie-blender.sh) kantaa yhä omat kopionsa neljästä hybridi-
# materiaalista; tämä ei muuta sitä eikä mitään osoitinta.
#
# Mitä tekee:
#   1. Lukee js/dioraama/kirjasto/lahteet.json:n tiedostot (+ samassa kansiossa olevat ASTC-johdannaiset *-4x4.astcm)
#      kansiosta proto-3d/_kirjasto/valmiit/ ja tarkistaa jokaisen sha256:n manifestia vasten.
#   2. Laskee sisältöhashin (polku + sha256, aakkosjärjestys) ja kirjoittaa js/dioraama/kirjasto/kirjasto.json:n.
#   3. Lataa kansioon dioraama/kirjasto/<hash>/ (immutable), kirjasto.json viimeisenä valmiusmerkiksi.
#
# Käyttö:  tools/dioraama/vie-kirjasto.sh [--kuiva]
# Avaimet VAIN ympäristöstä (kuten vie-blender.sh): AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AMPARI/R2_BUCKET, PAATE/R2_ACCOUNT_ID.
set -euo pipefail
KUIVA=0; [ "${1:-}" = "--kuiva" ] && KUIVA=1
REPO=${0:A:h:h:h}; V=${KIRJASTO:-/Users/Shared/Claude/proto-3d/_kirjasto/valmiit}
M="$REPO/js/dioraama/kirjasto/lahteet.json"; ULOS="$REPO/js/dioraama/kirjasto/kirjasto.json"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# 1–2. Lista, tarkistus, hash ja kirjasto.json (Node: sama tapa kuin vie-blender.sh).
node - "$M" "$V" "$ULOS" "$TMP" <<'JS'
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const [m, v, ulos, tmp] = process.argv.slice(2);
const M = JSON.parse(fs.readFileSync(m, 'utf8'));
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const rivit = [];
for (const [tunnus, a] of Object.entries(M)) {
  for (const t of a.tiedostot) {
    const p = path.join(v, t.polku);
    if (!fs.existsSync(p)) throw new Error(`PUUTTUU: ${p}`);
    const s = sha(p); if (s !== t.sha256) throw new Error(`sha256 ei täsmää manifestiin: ${t.polku}`);
    rivit.push([t.polku, s, fs.statSync(p).size, p]);
  }
  const k = path.join(v, tunnus);   // ASTC-johdannaiset (Siirtosepän astc-mip.swift), jos kansiossa
  for (const f of fs.readdirSync(k)) if (f.endsWith('-4x4.astcm')) {
    const p = path.join(k, f); rivit.push([`${tunnus}/${f}`, sha(p), fs.statSync(p).size, p]);
  }
}
rivit.sort((a, b) => (a[0] < b[0] ? -1 : 1));
const hash = crypto.createHash('sha256').update(rivit.map((r) => `${r[0]} ${r[1]}\n`).join('')).digest('hex').slice(0, 16);
const json = {
  huom: 'Linnakirjasto (docs/raportit/linnakirjasto-20260930.md). Oma muuttumaton kansio tools/dioraama/vie-kirjasto.sh:lla 4.10.2026; '
    + 'Olavinlinnan blender-paketti kantaa yhä omat kopionsa neljästä hybridimateriaalista. Lähteet ja lisenssit: lahteet.json.',
  hash, kansio: `dioraama/kirjasto/${hash}/`, sisalto: Object.keys(M).sort(),
  tiedostot: rivit.map(([polku, sha256, tavuja]) => ({ polku, sha256, tavuja })),
};
fs.writeFileSync(ulos, JSON.stringify(json, null, 2) + '\n');
fs.writeFileSync(path.join(tmp, 'rivit'), rivit.map((r) => `${r[0]}\t${r[3]}\t${r[2]}`).join('\n') + '\n');
console.log(`== Linnakirjasto → dioraama/kirjasto/${hash}/`);
console.log(`   assetteja ${Object.keys(M).length}, tiedostoja ${rivit.length} (+ kirjasto.json), yhteensä ${Math.round(rivit.reduce((s, r) => s + r[2], 0) / 1048576)} Mt`);
console.log(`   kirjasto.json kirjoitettu: ${ulos}`);
JS
HASH=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).hash)' "$ULOS")
KOHDE="dioraama/kirjasto/$HASH"
[ "$KUIVA" = 1 ] && { echo "   (kuiva-ajo: ei latausta)"; exit 0; }

# 3. Lataus (sama malli kuin vie-blender.sh).
AMPARI=${AMPARI:-${R2_BUCKET:-}}; PAATE=${PAATE:-${R2_ACCOUNT_ID:+https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com}}
for v in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AMPARI PAATE; do [ -n "${(P)v:-}" ] || { echo "Ympäristöstä puuttuu $v" >&2; exit 1; }; done
if aws s3 ls "s3://$AMPARI/$KOHDE/kirjasto.json" --endpoint-url "$PAATE" >/dev/null 2>&1; then
  echo "   Kansio on jo ämpärissä (kirjasto.json löytyi) — ei ladata uudelleen."
else
  N=$(wc -l < "$TMP/rivit" | tr -d ' '); i=0
  while IFS=$'\t' read -r p f b; do
    i=$((i + 1))
    case "$p" in *.glb) ct=model/gltf-binary ;; *.jpg) ct=image/jpeg ;; *.png) ct=image/png ;; *.json) ct=application/json ;;
                 *.hdr) ct=image/vnd.radiance ;; *) ct=application/octet-stream ;; esac
    printf '   [%d/%d] %s (%d Mt)\n' $i $N "$p" $((b / 1048576))
    aws s3 cp "$f" "s3://$AMPARI/$KOHDE/$p" --endpoint-url "$PAATE" --no-progress --only-show-errors \
      --content-type "$ct" --cache-control 'public, max-age=31536000, immutable'
  done < "$TMP/rivit"
  aws s3 cp "$ULOS" "s3://$AMPARI/$KOHDE/kirjasto.json" --endpoint-url "$PAATE" --only-show-errors \
    --content-type application/json --cache-control 'public, max-age=31536000, immutable'
fi
JULKINEN=${JULKINEN:-https://media.matkakirja.app}
koodi=$(curl -s -o /dev/null -w '%{http_code}' "$JULKINEN/$KOHDE/kirjasto.json?t=$(date +%s)")
echo "== Valmis: $JULKINEN/$KOHDE/ (kirjasto.json $koodi). Seuraavaksi: commit js/dioraama/kirjasto/kirjasto.json mainiin (PR)."
