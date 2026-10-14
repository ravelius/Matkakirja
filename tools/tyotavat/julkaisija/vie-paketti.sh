#!/bin/zsh
# VIE-PAKETTI (Julkaisija 2.10.2026, Päätoimittajan tilaus omistajan pysyvää vientilupaa varten).
# Vie yhden _valmiit/*-vienti-*/ -paketin ämpäriin samoille suhteellisille poluille.
#
# Käyttö (aina yksinään, ilman ketjuja, jotta sallintasääntö osuu):
#   /Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh /Users/Shared/Claude/proto-3d/_valmiit/<nimi>-vienti-<pvm>
#   lisälippu --kuiva: tarkistukset ilman latausta
#   lisälippu --osa=I/N: rinnakkaisvienti (aja N prosessia, I = 0..N-1); kaikki tarkistukset ajetaan jokaisessa
#
# Ehdot (kaikki pakollisia, muuten exit != 0 eikä mitään ladata):
#   1) kansio on /Users/Shared/Claude/proto-3d/_valmiit/*-vienti-*/ (realpath, ei symlinkkikiertoa)
#   2) SHA256SUMS on olemassa, jokainen rivi täsmää, polut ovat suhteellisia (ei / alussa, ei ..)
#      ja kansiossa ei ole SHA256SUMS:sta puuttuvia tiedostoja (paitsi SHA256SUMS, LAHTEET.md, MANIFEST.md)
#   3) LAHTEET.md tai MANIFEST.md on olemassa ja mainitsee lisenssin (PD/CC0/CC BY/MIT/oma/lisenssi)
#   4) tunnettu content-type jokaiselle tiedostolle; olemassa olevaa objektia EI ylikirjoiteta
#   5) julkinen URL (?t=) → 200 + access-control-allow-origin + SHA täsmää; tulos lokiin
#   4b) omat-mallit-vienti-*: LS2:n portti omat_mallit_ktx2.py --portti läpäistävä (PT 10.10.2026)
#   4c) mp3/wav-paketit: Pelikoodarin aaniportti.py läpäistävä (PT 10.10.2026)
# Avaimet vain ympäristöstä (~/.zshrc); niitä ei tulosteta.
set -euo pipefail

LOKI=/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.log
JUURI=/Users/Shared/Claude/proto-3d/_valmiit
JULKINEN=https://media.matkakirja.app
KUIVA=0; K=""; OSA=0; OSIA=1
for a in "$@"; do
  case "$a" in
    --kuiva) KUIVA=1 ;;
    --osa=*/*) OSA=${${a#--osa=}%/*}; OSIA=${a#*/}
      [[ "$OSA" == <-> && "$OSIA" == <-> && "$OSIA" -ge 1 && "$OSA" -lt "$OSIA" ]] || { echo "Kelvoton --osa=$a (muoto --osa=I/N, 0 <= I < N)" >&2; exit 2; } ;;
    AWS_*|--avain*|--salaisuus*) echo "Avaimia ei anneta argumentteina." >&2; exit 2 ;;
    -*) echo "Tuntematon valinta: $a" >&2; exit 2 ;;
    *) [ -z "$K" ] || { echo "Anna vain yksi kansio." >&2; exit 2; }; K="$a" ;;
  esac
done
[ -n "$K" ] || { echo "Käyttö: $0 [--kuiva] $JUURI/<nimi>-vienti-<pvm>" >&2; exit 2; }
[ -d "$K" ] || { echo "Ei kansio: $K" >&2; exit 2; }

# 1) Polkurajaus
R=$(cd "$K" && pwd -P)
case "$R" in
  "$JUURI"/*-vienti-*) ;;
  *) echo "HYLÄTTY: vain $JUURI/*-vienti-*/ sallitaan (sain $R)" >&2; exit 3 ;;
esac
case "${R#$JUURI/}" in */*) echo "HYLÄTTY: paketin pitää olla suoraan $JUURI:n alla" >&2; exit 3 ;; esac
NIMI=${R:t}

# 2) SHA256SUMS
[ -f "$R/SHA256SUMS" ] && [ ! -L "$R/SHA256SUMS" ] || { echo "HYLÄTTY: SHA256SUMS puuttuu tai on symlinkki" >&2; exit 4; }
LINKIT=$(find "$R" -type l)
[ -z "$LINKIT" ] || { echo "HYLÄTTY: paketissa on symlinkkejä:"; echo "$LINKIT"; exit 4; } >&2
while read -r h p; do
  [ -n "$h" ] || continue
  # ".." kielletty vain polkusegmenttinä (tiedostonimessä kuten "mumbai..jpg" sallittu, 9.10.2026); lisäksi alla vain tavalliset tiedostot
  case "$p" in /*|..|../*|*/..|*/../*|\**|"") echo "HYLÄTTY: kelvoton polku SHA256SUMS:ssa: '$p'" >&2; exit 4 ;; esac
  [ -f "$R/$p" ] && [ ! -L "$R/$p" ] || { echo "HYLÄTTY: ei tavallinen tiedosto: $p" >&2; exit 4; }
done < "$R/SHA256SUMS"
(cd "$R" && shasum -a 256 -c --quiet SHA256SUMS) || { echo "HYLÄTTY: SHA256SUMS ei täsmää" >&2; exit 4; }
YLIM=$(cd "$R" && find . -type f ! -name SHA256SUMS ! -name LAHTEET.md ! -name MANIFEST.md ! -name '.DS_Store' | sed 's#^\./##' | sort | comm -23 - <(awk '{print $2}' SHA256SUMS | sort))
[ -z "$YLIM" ] || { echo "HYLÄTTY: tiedostoja ilman SHA256SUMS-riviä:"; echo "$YLIM"; exit 4; } >&2

# 3) Lähteet / lisenssi
LAHDE=""
for f in LAHTEET.md MANIFEST.md; do [ -f "$R/$f" ] && LAHDE="$R/$f" && break; done
[ -n "$LAHDE" ] || { echo "HYLÄTTY: LAHTEET.md tai MANIFEST.md puuttuu" >&2; exit 5; }
grep -qiE 'lisenssi|licen[cs]e|public domain|[^A-Za-z]PD[^A-Za-z]|CC0|CC BY|CC-BY|MIT|oma tuotanto|omat luennat|AI-generoitu|havainnekuva' "$LAHDE" \
  || { echo "HYLÄTTY: $LAHDE ei mainitse lisenssiä" >&2; exit 5; }

# 4) Content-typet etukäteen (ei osittaisia vientejä tuntemattoman tyypin takia)
tyyppi() {
  case "${1:l}" in
    *.mp3) echo audio/mpeg ;; *.wav) echo audio/wav ;; *.ogg) echo audio/ogg ;; *.m4a) echo audio/mp4 ;;
    *.json) echo 'application/json; charset=utf-8' ;; *.jpg|*.jpeg) echo image/jpeg ;; *.png) echo image/png ;;
    *.webp) echo image/webp ;; *.avif) echo image/avif ;; *.ktx2) echo image/ktx2 ;; *.glb) echo model/gltf-binary ;;
    *.js|*.mjs) echo 'text/javascript; charset=utf-8' ;; *.txt) echo 'text/plain; charset=utf-8' ;;
    *.bin|*.bytes|*.astc|*.astcm) echo application/octet-stream ;; *.tif|*.tiff) echo image/tiff ;; *.gif) echo image/gif ;; *.mp4) echo video/mp4 ;; *.geojson) echo application/geo+json ;;
    *.ttf) echo font/ttf ;; *.otf) echo font/otf ;; *.woff) echo font/woff ;; *.woff2) echo font/woff2 ;;
    *.terrain) echo application/vnd.quantized-mesh ;;  # KS 12.10. (korjattu 15.5x): gzip-pakattu → Content-Encoding: gzip, kuten maailmanmaasto
    *) echo "" ;;
  esac
}
while read -r h p; do
  [ -n "$h" ] || continue
  [ -n "$(tyyppi "$p")" ] || { echo "HYLÄTTY: tuntematon tiedostotyyppi $p" >&2; exit 6; }
done < "$R/SHA256SUMS"

# 4b) Omien mallien portti (PT 10.10.2026, LS2:n omat_mallit_ktx2.py): pakollinen kaikille omat-mallit-vienti-*-paketeille,
#     myös kuiva-ajossa. Paluuarvo ≠ 0 tai puuttuva portti → hylkäys.
case "$NIMI" in
  omat-mallit-vienti-*)
    PORTTI=/Users/Shared/Claude/proto-3d/tyokalut/linssiseppa2-omat-mallit/omat_mallit_ktx2.py
    [ -f "$PORTTI" ] || { echo "HYLÄTTY: omien mallien portti puuttuu ($PORTTI)" >&2; exit 9; }
    python3 -I "$PORTTI" --portti "$R" >&2 || { echo "HYLÄTTY: omien mallien portti ei läpäissyt ($NIMI)" >&2; exit 9; }
    echo "omien mallien portti: läpi" ;;
esac

# 4c) Ääniportti (PT 10.10.2026, Pelikoodarin aaniportti.py): pakollinen jokaiselle paketille, jossa on mp3/wav, myös kuiva-ajossa.
#     Hylkää: true peak > 0 dBTP, leikkautumat, kovuus > 6 dB perheestä, hiljainen. Paluuarvo = hylättyjen määrä.
if [[ -n $(find "$R" -type f \( -name '*.mp3' -o -name '*.wav' \) -print -quit) ]]; then
  PY=/Users/Shared/Claude/proto-3d/_tyo/venv-aaniluokitin/bin/python; APORTTI=/Users/Shared/Claude/proto-3d/tyokalut/aaniportti.py
  [ -f "$APORTTI" ] && [ -x "$PY" ] || { echo "HYLÄTTY: ääniportti puuttuu ($APORTTI)" >&2; exit 10; }
  "$PY" -I "$APORTTI" "$R" >&2 || { echo "HYLÄTTY: ääniportti ei läpäissyt ($NIMI)" >&2; exit 10; }
  echo "ääniportti: läpi"
fi

N=$(grep -c . "$R/SHA256SUMS")
echo "== $NIMI: $N tiedostoa, lähteet ${LAHDE:t}, tarkistukset ok"
if [ "$KUIVA" = 1 ]; then echo "(kuiva-ajo: ei latausta)"; exit 0; fi

source ~/.zshrc >/dev/null 2>&1 || true
export AWS_DEFAULT_REGION=auto AWS_REQUEST_CHECKSUM_CALCULATION=when_required AWS_RESPONSE_CHECKSUM_VALIDATION=when_supported
AMPARI=${AMPARI:-${R2_BUCKET:-}}; PAATE=${PAATE:-${R2_ACCOUNT_ID:+https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com}}
for v in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AMPARI PAATE; do [ -n "${(P)v:-}" ] || { echo "Ympäristöstä puuttuu $v" >&2; exit 7; }; done

viety=0; oli=0; virhe=0; rivi=-1; p=""; vaihe=""; VALMIS=0
# 12.10.2026 (KS:n vuoristoviennissä 3 osaa katkesi hiljaa): kirjaa keskeytys, paluuarvo ja viimeinen polku lokiin.
trap 'rc=$?; [ "$VALMIS" = 1 ] || echo "$(date "+%Y-%m-%d %H:%M") $NIMI${OSIA:+ (osa $OSA/$OSIA)}: KESKEYTYI paluu $rc, viimeinen ${p:-–} vaiheessa ${vaihe:-–} (viety $viety, oli $oli, virheitä $virhe)" | tee -a "$LOKI" >&2' EXIT
trap 'echo "SIGNAALI TERM" >&2; exit 143' TERM; trap 'echo "SIGNAALI INT" >&2; exit 130' INT; trap 'echo "SIGNAALI HUP" >&2; exit 129' HUP
TMP=$(mktemp -t vie-paketti)
while read -r h p; do
  [ -n "$h" ] || continue
  rivi=$((rivi + 1))
  # --osa=I/N (Julkaisija 7.10.2026): rinnakkainen vienti, tämä prosessi käsittelee rivit joilla rivi % N == I.
  [ $((rivi % OSIA)) -eq "$OSA" ] || continue
  ct=$(tyyppi "$p")
  # Tarkka avain (s3 ls on etuliitehaku: a/b.jpg näyttäisi olevan olemassa, jos a/b.jpg.bak on).
  # Muu virhe kuin 404 (verkko, oikeudet) → lopetus, ettei olemassa olevaa ylikirjoiteta vahingossa.
  vaihe=head-object
  if hv=$(aws s3api head-object --bucket "$AMPARI" --key "$p" --endpoint-url "$PAATE" 2>&1 >/dev/null); then
    echo "= $p (on jo, ei ylikirjoiteta)"; oli=$((oli + 1)); continue
  fi
  case "$hv" in *404*|*"Not Found"*|*NoSuchKey*) ;; *) echo "KESKEYTETTY: head-object $p: $hv" >&2; exit 8 ;; esac
  # Osoittimet (uusin*.json) vaihtuvat myöhemmin käsin → lyhyt välimuisti (9.10.2026: uusin-2.json sai immutable-otsakkeen)
  cc='public, max-age=31536000, immutable'; case "${p:t}" in uusin*.json) cc='public, max-age=60' ;; esac
  # .terrain (KS 12.10.): tavut ovat gzipiä → Content-Encoding: gzip, muuten Cesium saa pakatut tavut (litteät laatat).
  # Tarkistus vertaa purettuun sisältöön (curl --compressed), koska CDN voi pakata uudelleen.
  ce=(); odotus="$h"; pakattu=""
  vaihe=valmistelu
  case "$p" in *.terrain)
    [ "$(head -c 2 "$R/$p" | xxd -p)" = 1f8b ] || { echo "HYLÄTTY: $p ei ole gzip-pakattu" >&2; exit 6; }
    ce=(--content-encoding gzip); pakattu=--compressed; odotus=$(gzip -dc "$R/$p" | shasum -a 256 | cut -d' ' -f1) ;;
  esac
  # 12.10.2026 (KS pilotti-3: kolme osaa kuoli paluuarvoon 139 = segfault kuormassa) → aws-kutsu enintään 3 yritystä;
  # && / || -listassa epäonnistuminen ei laukaise set -e:tä. Kolmen epäonnistumisen jälkeen virhe lasketaan alla (sha ei täsmää).
  vaihe=aws-cp; ok=0
  for y in 1 2 3; do
    aws s3 cp "$R/$p" "s3://$AMPARI/$p" --endpoint-url "$PAATE" --no-progress --only-show-errors \
      --content-type "$ct" --cache-control "$cc" "${ce[@]}" && { ok=1; break; } || { echo "uusinta $y: aws cp $p" >&2; sleep 5; }
  done
  vaihe=curl
  # || true: curl-aikakatkaisu ei saa tappaa osaa hiljaa (set -e + pipefail) – epäonnistuminen lasketaan virheeksi alla.
  : > "$TMP"
  otsakkeet=$(curl -s $pakattu --max-time 60 --retry 2 -o "$TMP" -D - -H 'Origin: https://matkakirja.app' "$JULKINEN/$p?t=$(date +%s)" | tr -d '\r') || true
  koodi=$(echo "$otsakkeet" | awk 'toupper($1) ~ /^HTTP/ {c=$2} END{print c}')
  cors=$(echo "$otsakkeet" | awk 'tolower($1)=="access-control-allow-origin:"{print $2}')
  sha=$(shasum -a 256 "$TMP" | cut -d' ' -f1)
  if [ "$koodi" = 200 ] && [ -n "$cors" ] && [ "$sha" = "$odotus" ]; then
    echo "+ $p"; viety=$((viety + 1))
  else
    echo "! $p → $koodi, CORS '${cors:-puuttuu}', sha ${sha:0:12}/${odotus:0:12}" >&2; virhe=$((virhe + 1))
  fi
done < "$R/SHA256SUMS"
rm -f "$TMP"

OSATEKSTI=""; [ "$OSIA" -gt 1 ] && OSATEKSTI=" (osa $OSA/$OSIA)"
TULOS="$(date '+%Y-%m-%d %H:%M') $NIMI$OSATEKSTI: viety $viety, oli jo $oli, virheitä $virhe (lähteet ${LAHDE:t})"
echo "$TULOS" | tee -a "$LOKI"
VALMIS=1
[ "$virhe" = 0 ]
