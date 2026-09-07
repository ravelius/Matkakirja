#!/usr/bin/env bash
#
# LAATTAPYRAMIDIN POLTTO PAIKALLISESTI (Mac Studio) — sama lopputulos
# kuin .github/workflows/generoi-pyramidi.yml, ilman 5,5 tunnin kattoa
# ja neljän vCPU:n rajaa.
#
# Työnkulku jakaa polton shardeihin, koska laatta ei koskaan riipu
# naapuristaan: kaikki lasketaan arkin koordinaateista. Sama jako
# toistetaan tässä, mutta shardit eivät ole ajokoneita vaan rinnakkaisia
# prosesseja tällä koneella (xargs -P). Jokainen shardi
#
#   - piirtää OMAAN kansioonsa (ulos/<shardi>/), joten kaksi shardia ei
#     voi kirjoittaa samaan pyramidi.jsoniin yhtä aikaa,
#   - kirjoittaa oman lokinsa (ulos/lokit/<shardi>.log),
#   - vie oman osansa ämpäriin heti valmistuttuaan (kuten työnkulussa:
#     levyllä ei koskaan ole kuin yhden shardin osuus, jos --siivoa),
#   - merkitään valmiiksi (ulos/lokit/<shardi>.valmis), ja valmis shardi
#     ohitetaan seuraavalla ajolla.
#
# LAATTAKOHTAISTA OHITUSTA EI OLE. tools/generoi-laattapyramidi.mjs
# piirtää aina koko työlistansa eikä katso, onko laatta jo levyllä
# (levyltä luetaan vain luettelon bittikartta). Uusinnan tarkkuus on
# siis SHARDI: keskeytynyt shardi ajetaan kokonaan uudestaan
# (`--vain <shardi>`), valmiit ohitetaan.
#
# === MIKSI z8 ======================================================
#
# Raamattu, "PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA": pallon
# lepokerros kootaan litteän pyramidin laatoista, ja pyramidin syvin
# taso on z7 (240 px/aste). Aidosti tarkempi lähikuva vaatii z8:n
# (480 px/aste), jonka lepokerros ottaa käyttöön ilman koodimuutosta
# heti kun se on luettelossa ja ämpärissä.
#
# z8 EI OLE UUSI VERSIO VAAN LISÄ OLEMASSA OLEVAAN. Laattojen polussa
# on versio ja polku on muuttumaton — mutta z8:n polkua ei ole vielä
# kirjoitettu kenellekään, joten sen kirjoittaminen nykyisen version
# alle EI ylikirjoita mitään. Tämä on koko sarjan halvin tie:
#
#   pohja   julisteet/pyramidi/<versio>/z8/…          (uusi, tyhjä polku)
#   viivat  julisteet/pyramidi/<viivaversio>/viivat/z8/…
#   nostot  julisteet/pyramidi/<nostoversio>/nostot/z8/…
#   luettelo julisteet/pyramidi/pyramidi.json          (tasot z0…z8)
#
# ja koska versiot EIVÄT vaihdu, pallon oma Mercator-sarja kelpaa
# entisellään: lepokerroksen versiovahti (js/pallo.js
# lepokerroksenKerrokset) vaatii pallon laatat.json:in versio/viivat/
# nostot = pyramidi.jsonin versio/viivataso/nostotaso. Sarjaa ei siis
# tarvitse polttaa uudestaan eikä js/pallo.js:ää muuttaa.
#
# Jos taas MIKÄ TAHANSA kolmesta versiosta vaihtuu — uusi pohjaversio
# (--sarjat kaikki) tai uusi nosto- tai viivaversio — versiovahti
# sammuttaa lepokerroksen, kunnes pallon sarja on poltettu samoista
# versioista ja js/pallo.js osoittaa siihen kansioon. Silloin `--pallo
# --pallotunniste <kirjain>` on pakollinen ja julkaisussa muuttuu yksi
# koodirivi: PALLO_LAATTATUNNISTE (tai PALLO_LAATTAVERSIO, jos pohjan
# versio vaihtui).
#
# UUSI NOSTOVERSIO POLTTAA KOKO KERROKSEN, EI VAIN z8:AA. Luettelon
# nostot-taulu (tunnus -> tiiviste) lasketaan nykyisestä reposta, ja
# peli vaientaa elävästä kerroksesta jokaisen merkin, jonka se löytää
# siitä — millä tahansa zoomtasolla. Jos repoon on tullut merkkejä sen
# jälkeen kun nykyiset nostolaatat poltettiin, ne katoaisivat kartalta.
# Skripti vertaa uuden luettelon ämpärin luetteloon ja kaatuu ennen
# vientiä, jos ero on muualla kuin z8:ssa.
#
# === PALLON SARJA SHARDEIHIN =======================================
#
# Jokainen poltto jaetaan shardeihin kaikille ytimille; vienti
# rinnakkain (Raamattu KAIKKI YTIMET JA LOPUTKIN MACILLE, omistaja
# 7.9.2026).
#
# Mitattu uusintapoltossa 7.9.2026 (run 34054242743, 7,5 h): pyramidi
# noin 3 h rinnakkaisina shardeina, pallon Mercator-sarja
# (tee-pallolaatat, 87 381 laattaa) noin 3 h YHDELLÄ ytimellä ja lopun
# vienti 55 min. Kumpikaan jälkimmäinen ei ollut työn määrän vika:
#
#   - Pallon sarja ajettiin yhtenä prosessina. Nyt se jaetaan
#     `--pallo-osia` shardiin (tee-pallolaatat `--osa i/n`), jotka
#     ajetaan samalla xargs-rinnakkaisuudella kuin pyramidin shardit:
#     oma kansio, oma loki (lokit/pallo-NNN.log), oma vienti heti
#     valmistuttua ja `.valmis`-merkki, jonka perusteella valmis osa
#     ohitetaan uusinnassa. Yhden prosessin ajo on KIELLETTY monen
#     ytimen koneella (ks. PALLO_OSIA alempana): juuri se söi
#     seitsemästä ja puolesta tunnista kolme.
#   - Vienti ajettiin CLI:n oletuksella (10 yhtaikaista pyyntöä).
#     Nyt `aws_viritys` nostaa sen (max_concurrent_requests), jokainen
#     kutsu saa `--cli-connect-timeout`, ja koska jokainen shardi vie
#     omansa, vienti kulkee polton rinnalla eikä sen perässä.
#
# Pelkän pallon voi polttaa uudestaan ilman pyramidia:
# `--vain-pallo` (työnkulussa `--sarjat pallo`).
#
# === AVAIMET =======================================================
#
# R2:n avaimet luetaan VAIN ympäristöstä (AWS_ACCESS_KEY_ID,
# AWS_SECRET_ACCESS_KEY, AMPARI, PAATE). Skripti kieltäytyy, jos avain
# annetaan argumenttina, eikä kirjoita avainta lokiin missään
# tilanteessa.
#
set -euo pipefail

JUURI="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Oma absoluuttinen polku: xargs käynnistää tämän saman skriptin
# lapsiprosesseina, eikä suhteellinen $0 kelpaa siihen.
ITSE="$JUURI/tools/$(basename "${BASH_SOURCE[0]}")"

# --------------------------------------------------------------- ohje
ohje () {
  cat <<'OHJE'
Käyttö: tools/polta-paikallisesti.sh [valitsimet]

  --sarjat z8|kaikki|z0-z7   mitkä shardit ajetaan (oletus z8)
                             z8      = pohja z8 + viivataso z8 + nostotaso z8
                                       OLEMASSA OLEVIIN versiopolkuihin
                             z0-z7   = työnkulun oma jako (uusi versio)
                             kaikki  = z0-z7 ja z8 (uusi versio)
                             --ilman-rantaviivaa lisää rantataso-shardit
  --versio V                 pohjan versio polussa (oletus: ämpärin luettelosta)
  --viivaversio V            viivatason versio  (oletus: luettelosta)
  --nostoversio V            nostotason versio  (oletus: luettelosta)
  --rantaversio V            rantatason versio  (oletus: luettelosta)
  --ilman-rantaviivaa        polta pohja ILMAN rantaviivaa ja rantaviiva
                             omalle laapinaekyvaelle tasolleen (ranta/z...).
                             Vaatii --sarjat kaikki, uuden --versio,
                             --rantaversio ja --pallo (kaikki versiot
                             vaihtuvat, ks. VERSIOVAHTI).
  --laatu 0.9                webp-laatu         (oletus: luettelosta)
  --patina kevyt             patinataso         (oletus: luettelosta)
  --piirit kylla|ei          erikoispiirit viivatasolle (oletus: luettelosta)
  --korkeus 1|3              syvimmän tason korkeusruudukko (oletus 1)
  --ytimet N                 rinnakkaisia shardeja (oletus: kaikki ytimet)
  --ulos <kansio>            työkansio (oletus <repo>/pyramidi-poltto)
  --koe                      yksi z8-shardi ja aika-arvio, ei vientiä
  --vain <shardi>            aja vain nimetty shardi (uusinta)
  --ei-vie                   pelkkä poltto, ei vientiä ämpäriin
  --siivoa                   poista shardin laatat levyltä onnistuneen
                             viennin jälkeen (levy ei täyty)
  --uudestaan                aja myös valmiiksi merkityt shardit
  --pallo                    polta lopuksi pallon Mercator-sarja
                             (tools/tee-pallolaatat.mjs; pakollinen, jos
                             pohjan, viivatason tai nostotason versio
                             vaihtuu — muuten lepokerroksen versiovahti
                             sammuttaa kerroksen)
  --pallotunniste X          pallon kansion loppuliite (js/pallo.js
                             PALLO_LAATTATUNNISTE); pakollinen --pallon kanssa
  --pallon-ranta             polta rantaviiva MYOES pallon sarjaan
                             (oletus --ilman-rantaviivaa-tilassa: ei —
                             pallolla rantaviiva on vektorina,
                             js/pallovektorit.js)
  --vain-pallo               polta VAIN pallon sarja (ei pyramidia eikä
                             luetteloa); sama kuin --sarjat pallo
  --pallo-osia N             pallon sarjan shardeja (oletus: ytimet × 3;
                             yksi osa on kielletty monen ytimen koneella)
  --pallo-tasot 0-8          pallon Mercator-tasot (oletus 0-8)
  --noutovali MS             pallon shardin noutotahti ms (oletus:
                             15 × rinnakkaiset prosessit; nosta, jos
                             lokissa on HTTP 429)
  --ei-luetteloa             älä koota äläkä vie pyramidi.jsonia
  --pakota-luettelo          vie luettelo, vaikka se eroaisi ämpärin
                             luettelosta muutenkin kuin z8:n osalta
  --lista                    tulosta shardit ja lopeta

Avaimet ympäristöstä (EI argumentteina):
  export AMPARI=<ämpärin nimi>
  export PAATE=https://<tili-id>.r2.cloudflarestorage.com
  export AWS_ACCESS_KEY_ID=… AWS_SECRET_ACCESS_KEY=…
OHJE
}

# ------------------------------------------------- avaimet vain ympäristöstä
#
# Salaisuus komentorivillä päätyy `ps`:ään, näppäinhistoriaan ja tämän
# skriptin omaan lokiin. Siksi se on virhe eikä varoitus.
for a in "$@"; do
  case "$a" in
    AWS_ACCESS_KEY_ID=*|AWS_SECRET_ACCESS_KEY=*|--avain|--avain=*|--salaisuus|--salaisuus=*)
      echo "VIRHE: avaimia ei anneta argumentteina — käytä ympäristömuuttujia" >&2
      exit 2 ;;
  esac
done

# ----------------------------------------------------------- valitsimet
SARJAT=z8
VERSIO=""; VIIVAVERSIO=""; NOSTOVERSIO=""; RANTAVERSIO=""
ILMAN_RANTAVIIVAA=0
LAATU=""; PATINA=""; PIIRIT=""
KORKEUS=1
YTIMET=""
ULOS="$JUURI/pyramidi-poltto"
KOE=0; VAIN=""; VIE=1; SIIVOA=0; UUDESTAAN=0; PALLO=0; PALLOTUNNISTE=""
PALLON_RANTA=0; VAIN_PALLO=0; PALLO_OSIA=""; PALLO_TASOT="0-8"; NOUTOVALI=""
# Yhteysaikakatkaisu jokaiselle aws-kutsulle: jumittunut yhteys kaatuu
# nopeasti ja CLI yrittää uudestaan sen sijaan, että shardi jäisi roikkumaan.
AWS_YHTEYSAIKA="${AWS_YHTEYSAIKA:-30}"
LUETTELO=1; PAKOTA_LUETTELO=0; LISTA=0; LAPSI=0

while [ $# -gt 0 ]; do
  case "$1" in
    --sarjat) SARJAT="$2"; shift 2 ;;
    --versio) VERSIO="$2"; shift 2 ;;
    --viivaversio) VIIVAVERSIO="$2"; shift 2 ;;
    --nostoversio) NOSTOVERSIO="$2"; shift 2 ;;
    --rantaversio) RANTAVERSIO="$2"; shift 2 ;;
    --ilman-rantaviivaa) ILMAN_RANTAVIIVAA=1; shift ;;
    --laatu) LAATU="$2"; shift 2 ;;
    --patina) PATINA="$2"; shift 2 ;;
    --piirit) PIIRIT="$2"; shift 2 ;;
    --korkeus) KORKEUS="$2"; shift 2 ;;
    --ytimet) YTIMET="$2"; shift 2 ;;
    --ulos) ULOS="$2"; shift 2 ;;
    --koe) KOE=1; shift ;;
    --vain) VAIN="$2"; shift 2 ;;
    --ei-vie) VIE=0; shift ;;
    --siivoa) SIIVOA=1; shift ;;
    --uudestaan) UUDESTAAN=1; shift ;;
    --pallo) PALLO=1; shift ;;
    --pallotunniste) PALLOTUNNISTE="$2"; shift 2 ;;
    --pallon-ranta) PALLON_RANTA=1; shift ;;
    --vain-pallo) VAIN_PALLO=1; PALLO=1; shift ;;
    --pallo-osia) PALLO_OSIA="$2"; shift 2 ;;
    --pallo-tasot) PALLO_TASOT="$2"; shift 2 ;;
    --noutovali) NOUTOVALI="$2"; shift 2 ;;
    --ei-luetteloa) LUETTELO=0; shift ;;
    --pakota-luettelo) PAKOTA_LUETTELO=1; shift ;;
    --lista) LISTA=1; shift ;;
    --lapsi) LAPSI=1; shift ;;
    -h|--help) ohje; exit 0 ;;
    *) echo "Tuntematon valitsin: $1" >&2; ohje >&2; exit 2 ;;
  esac
done

[ "$KOE" -eq 1 ] && VIE=0
case "$KORKEUS" in 1|3) ;; *) echo "VIRHE: --korkeus on 1 tai 3" >&2; exit 2 ;; esac

# `--sarjat pallo` on työnkulun tie samaan kuin --vain-pallo: pyramidi on
# jo ämpärissä ja vain pallon Mercator-sarja poltetaan uudestaan.
if [ "$SARJAT" = "pallo" ]; then VAIN_PALLO=1; PALLO=1; fi

PALLO_MIN="${PALLO_TASOT%%-*}"; PALLO_MAX="${PALLO_TASOT##*-}"
for luku in "$PALLO_MIN" "$PALLO_MAX"; do
  case "$luku" in
    ''|*[!0-9]*) echo "VIRHE: --pallo-tasot on muotoa min-max, esim. 0-8" >&2; exit 2 ;;
  esac
done
[ "$PALLO_MIN" -le "$PALLO_MAX" ] || { echo "VIRHE: --pallo-tasot $PALLO_TASOT" >&2; exit 2; }

# RANTATON POHJA ON KOKO PYRAMIDIN UUSINTAPOLTTO.
#
# Pohjalaattojen sisältö muuttuu (rantaviiva pois), joten polku on
# uusi: vanhan version alle ei koskaan kirjoiteta eri sisältöä. Ja
# koska pohjan versio vaihtuu, lepokerroksen versiovahti (js/pallo.js
# lepokerroksenKerrokset) sammuttaa kerroksen, kunnes pallon oma sarja
# on poltettu samasta versiosta — siksi --pallo on pakollinen.
if [ "$ILMAN_RANTAVIIVAA" -eq 1 ]; then
  case "$SARJAT" in
    kaikki|z0-z7) ;;
    *) echo "VIRHE: --ilman-rantaviivaa vaatii --sarjat kaikki (tai z0-z7):" >&2
       echo "pohjan sisältö muuttuu, joten koko pyramidi on poltettava." >&2
       exit 2 ;;
  esac
  [ -n "$RANTAVERSIO" ] || {
    echo "VIRHE: --ilman-rantaviivaa vaatii --rantaversio <v> — rantaviivan" >&2
    echo "muste menee omaan versiopolkuunsa <rantaversio>/ranta/z..." >&2
    exit 2 ; }
  [ -n "$VERSIO" ] || {
    echo "VIRHE: --ilman-rantaviivaa vaatii uuden --versio <v>: rannaton pohja" >&2
    echo "on eri kuva kuin ämpärissä oleva, eikä sitä kirjoiteta sen päälle." >&2
    exit 2 ; }
fi

# ------------------------------------------------------------- esitarkistus
#
# Ytimet: macOSissa ei ole nprocia. sysctl ensin, nproc varalle, ja
# lopuksi neljä — mieluummin hidas ajo kuin kaatuva.
ytimia () {
  if command -v sysctl >/dev/null 2>&1 && sysctl -n hw.ncpu >/dev/null 2>&1; then
    sysctl -n hw.ncpu
  elif command -v nproc >/dev/null 2>&1; then
    nproc
  else
    echo 4
  fi
}
[ -n "$YTIMET" ] || YTIMET="$(ytimia)"

# PALLON SARJAA EI AJETA YHDELLÄ YTIMELLÄ (omistaja 7.9.2026: "Miksi vain
# yksi ydin?"). Osia on oletuksena kolme kertaa ytimet, jotta kuorma
# tasaantuu: pallon laatat ovat eri hintaisia (napojen täytelaatta on
# nopea, mantereen reunalaatta hidas), ja xargs antaa vapautuvalle
# ytimelle aina seuraavan osan.
[ -n "$PALLO_OSIA" ] || PALLO_OSIA=$((YTIMET * 3))
case "$PALLO_OSIA" in
  ''|*[!0-9]*) echo "VIRHE: --pallo-osia on kokonaisluku" >&2; exit 2 ;;
esac
if [ "$PALLO_OSIA" -lt 2 ] && [ "$YTIMET" -gt 1 ]; then
  echo "VIRHE: pallon sarjaa ei ajeta yhtenä prosessina $YTIMET ytimen koneella." >&2
  echo "Se maksoi 7.9.2026 uusintapoltossa kolme tuntia. Anna --pallo-osia N" >&2
  echo "(oletus ytimet × 3) tai --ytimet 1, jos yksi ydin on tarkoitus." >&2
  exit 2
fi

vaadi () {
  command -v "$1" >/dev/null 2>&1 || {
    echo "VIRHE: $1 puuttuu polusta. $2" >&2; exit 1; }
}

tarkista_node () {
  vaadi node "Asenna: brew install node (vähintään 22)."
  local v
  v="$(node -p 'process.versions.node.split(".")[0]')"
  [ "$v" -ge 22 ] || { echo "VIRHE: node $v — pyramidi vaatii vähintään 22." >&2; exit 1; }
}

esitarkistus () {
  tarkista_node
  vaadi curl "Kuuluu macOSiin."

  # Riippuvuudet: sama kuin työnkulussa (npm install + Playwrightin
  # Chromium). Chromium on piirtomoottorin ja patinapassin kangas.
  if [ ! -d "$JUURI/node_modules/playwright" ]; then
    echo "· npm install (playwright)"
    (cd "$JUURI" && npm install --no-fund --no-audit)
  fi
  if [ -z "${PW_CHROMIUM:-}" ] || [ ! -x "${PW_CHROMIUM:-/ei/ole}" ]; then
    PW_CHROMIUM="$(etsi_chromium)"
    if [ -z "$PW_CHROMIUM" ]; then
      echo "· npx playwright install chromium"
      (cd "$JUURI" && npx playwright install chromium)
      PW_CHROMIUM="$(etsi_chromium)"
    fi
  fi
  [ -n "$PW_CHROMIUM" ] || { echo "VIRHE: Chromiumia ei löydy." >&2; exit 1; }
  export PW_CHROMIUM
  echo "· chromium $PW_CHROMIUM"

  # Korkeusaineisto (3′) tulee reposta, ei verkosta — omistajan päätös
  # 30.8.2026, ks. tools/korkeusaineisto/LUEMINUT.md.
  [ -f "$JUURI/tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz" ] \
    || { echo "VIRHE: tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz puuttuu." >&2; exit 1; }

  hae_aineisto
  [ "$KORKEUS" = "3" ] || hae_korkeuspalat
}

etsi_chromium () {
  # macOS: chrome-mac/Chromium.app/Contents/MacOS/Chromium,
  # Linux: chrome-linux/chrome. Funktio palauttaa AINA nollan (tyhjä
  # tuloste = ei löytynyt), koska kutsu on sijoituksen sisällä ja
  # `set -e` kaataisi ajon muuten juuri siinä tilanteessa, jota varten
  # asennusvaihe on olemassa.
  local p f
  for p in "$HOME/Library/Caches/ms-playwright" "$HOME/.cache/ms-playwright" /opt/pw-browsers; do
    [ -d "$p" ] || continue
    # Playwright 1.5x asentaa macOS:lle "Chrome for Testing" -sovelluksen
    # (chromium-NNNN/chrome-mac-arm64/Google Chrome for Testing.app/…) ja
    # erikseen kevyen chrome-headless-shellin; vanhemmat Chromium.app.
    f="$(find "$p" -maxdepth 6 -type f \( -name 'Chromium' -o -name 'Google Chrome for Testing' -o -name 'chrome-headless-shell' -o -name 'chrome' \) 2>/dev/null | grep -v -i 'headless' | head -1)"
    [ -n "$f" ] || f="$(find "$p" -maxdepth 6 -type f -name 'chrome-headless-shell' 2>/dev/null | head -1)"
    if [ -n "$f" ]; then echo "$f"; return 0; fi
  done
  if [ -x /opt/pw-browsers/chromium ]; then echo /opt/pw-browsers/chromium; fi
  return 0
}

# Natural Earth samoista osoitteista kuin työnkulun aineistojobi.
# Välimuisti on ULOS/ne-data, jota ei committoida (.gitignore).
hae_aineisto () {
  mkdir -p "$ULOS/ne-data"
  local f
  for f in ne_10m_ocean ne_10m_lakes; do
    if [ -s "$ULOS/ne-data/$f.geojson" ]; then continue; fi
    echo "· nouda $f.geojson"
    curl -sSL --retry 3 --max-time 600 -o "$ULOS/ne-data/$f.geojson" \
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/$f.geojson"
    [ -s "$ULOS/ne-data/$f.geojson" ] || { echo "VIRHE: $f.geojson jäi tyhjäksi." >&2; exit 1; }
  done
}

# 1′-KORKEUSPALAT KERRAN, EI SHARDIA KOHTI.
#
# Työnkulussa jokainen shardi kopioi omat palansa ämpäristä, koska
# ajokoneet ovat eri koneita. Täällä on yksi kone ja kymmeniä shardeja,
# joten palat noudetaan KERRAN julkisesta osoitteesta (ei avaimia) ja
# jaetaan kaikille `--korkeuspalat`-kansiona: itse poltossa ei ole
# yhtään verkkopyyntöä, aivan kuten työnkulussa.
hae_korkeuspalat () {
  local kansio="$ULOS/korkeuspalat"
  local lista="$ULOS/palat.txt"
  mkdir -p "$kansio"
  if [ ! -s "$lista" ]; then
    node "$JUURI/tools/generoi-laattapyramidi.mjs" "$ULOS/palalista" \
      --tasoja 9 --tasot 8 --kaariminuutit 1 --vain-palat "$lista" >/dev/null
  fi
  # Puuttuvat (tai tyhjät) palat noudetaan; olemassa olevat ohitetaan,
  # joten keskeytynyt nouto jatkuu siitä mihin jäi.
  local puuttuvat="$ULOS/palat-puuttuu.txt"
  : > "$puuttuvat"
  while read -r nimi; do
    [ -s "$kansio/$nimi.bin.gz" ] || echo "$nimi" >> "$puuttuvat"
  done < "$lista"
  if [ -s "$puuttuvat" ]; then
    echo "· nouda 1′-korkeuspalat ($(wc -l < "$puuttuvat" | tr -d ' ') kpl, ~350 kt/kpl)"
    # `xargs -a` on GNU-laajennos, jota macOSin xargs ei tunne — lista
    # tulee siksi vakiosyötteestä. Sama koskee koko ajon xargsia alempana.
    xargs -P 8 -I{} curl -sSL --retry 3 --max-time 300 \
      -o "$kansio/{}.bin.gz" \
      "https://media.matkakirja.app/julisteet/korkeus/1min/{}.bin.gz" \
      < "$puuttuvat"
  fi
  local vika=0
  while read -r nimi; do
    [ -s "$kansio/$nimi.bin.gz" ] || { echo "VIRHE: pala $nimi puuttuu" >&2; vika=1; }
  done < "$lista"
  [ "$vika" -eq 0 ] || exit 1
}

# ------------------------------------------------------- ämpärin luettelo
#
# Oletusasetukset luetaan ÄMPÄRIN NYKYISESTÄ LUETTELOSTA eikä arvata:
# z8 kirjoitetaan olemassa olevien versioiden alle, ja jos laatu tai
# patina eroaisi, uudet laatat erottuisivat silmällä naapureistaan
# (sama perustelu kuin paikkausajolla, generoi-pyramidi.yml).
LUETTELO_URL="https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json"
lue_ampari () {
  local t="$ULOS/ampari-luettelo.json"
  [ -s "$t" ] || curl -sSL --retry 3 --max-time 120 -o "$t" "$LUETTELO_URL" || true
  [ -s "$t" ] || { echo "VIRHE: ämpärin pyramidi.jsonia ei saatu ($LUETTELO_URL)." >&2; exit 1; }
  node -e '
    const j = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    const rivit = [
      ["A_VERSIO", j.versio ?? ""],
      ["A_VIIVAVERSIO", j.viivataso?.versio ?? j.versio ?? ""],
      ["A_NOSTOVERSIO", j.nostotaso?.versio ?? j.versio ?? ""],
      // Tyhjä, jos ämpärissä EI ole rantatasoa: silloin rantaviiva on
      // pohjalaatoissa eikä luetteloon saa kirjoittaa rantataso-kenttää,
      // joka lupaisi pelille laattoja joita ei ole.
      ["A_RANTAVERSIO", j.rantataso?.versio ?? ""],
      ["A_LAATU", j.laatu ?? 0.9],
      ["A_PATINA", j.patina ?? "kevyt"],
      ["A_PIIRIT", (j.viivataso?.piirit ?? true) ? "kylla" : "ei"],
      ["A_TASOT", (j.tasot ?? []).map((t) => t.z).join(" ")],
    ];
    for (const [k, v] of rivit) console.log(`${k}=${JSON.stringify(String(v))}`);
  ' "$t"
}

# ----------------------------------------------------------- shardilista
#
# Sama jako kuin työnkulussa, z8:aan laajennettuna. Kaistarajat ovat
# LOHKORAJOILLA (sarake jaollinen neljällä): aluerajaus asteilla
# katkaisisi lohkon keskeltä, jolloin lohko piirretään kokonaan mutta
# puolet heitetään pois (mitattuna 62 % hukkaa).
#
# z8 on 338 saraketta. Kaista on neljä saraketta eli tasan yksi lohko,
# jolloin shardeja on 85 — enemmän kuin kaksi kertaa ytimet vielä
# 42-ytimisellä koneella, ja kuorma tasaantuu itsestään, koska xargs
# antaa vapautuvalle ytimelle aina seuraavan kaistan.
#
# HUOM `--tasoja 9`. Kaista tulkitaan aina SYVIMMÄN tason sarakkeina,
# joten z8-shardi on ajettava yhdeksällä tasolla; muuten kaistan
# viimeinen z8-sarake jäisi jokaisesta shardista piirtämättä. z0-z7-
# shardit ajetaan ilman sitä eli täsmälleen työnkulun argumenteilla.
Z8_SARAKKEITA=338
Z8_KAISTA=4

shardit () {
  local nostoarg="--nostotaso --nostoversio $NOSTOVERSIO"
  local viivaarg="--viivataso --viivaversio $VIIVAVERSIO"
  [ "$PIIRIT" = "ei" ] && viivaarg="$viivaarg --eipiirit"
  # RANTATASO (omistaja 6.9.2026 ilta): rantaviiva pois pohjasta omalle
  # laapinaekyvaelle tasolleen, jotta pallon vektoriviiva (V1-V3) on
  # ainoa rantaviiva pallolla. Pohjashardit saavat --ilman-rantaviivaa ja
  # rantataso omat shardinsa; jako on sama kuin viivatasolla, koska
  # laattoja on saman verran (z0-z7 4 992, z8 7 104).
  local rantaarg="--rantataso --rantaversio $RANTAVERSIO"
  local pohjaarg=""
  [ "$ILMAN_RANTAVIIVAA" -eq 1 ] && pohjaarg=" --ilman-rantaviivaa"
  # UUSI NOSTO- TAI VIIVAVERSIO POLTTAA KOKO KERROKSEN, EI VAIN z8:AA.
  #
  # Luettelon `nostotaso.nostot` (tunnus -> tiiviste) lasketaan aina
  # NYKYISESTÄ reposta, ja peli vaientaa elävästä kerroksesta jokaisen
  # merkin, jonka se löytää sieltä (js/laattapyramidi.js
  # nostoOnPoltettu) — riippumatta zoomtasosta. Jos repoon on tullut
  # merkkejä sen jälkeen kun nykyiset nostolaatat poltettiin, uusi
  # luettelo lupaisi ne poltetuiksi myös tasoilla z5-z7, joiden
  # laatoissa niitä ei ole: merkit katoaisivat kartalta kokonaan.
  # Siksi uusi nostoversio polttaa z5-z8 yhtenä eränä. Sama koskee
  # viivatasoa (rajat ja reitit).
  case "$SARJAT" in
    z8)
      if [ "$NOSTOVERSIO" != "${A_NOSTOVERSIO:-$NOSTOVERSIO}" ]; then
        echo "nosto-z5-z7|--tasot 5-7 $nostoarg"
      fi
      if [ "$VIIVAVERSIO" != "${A_VIIVAVERSIO:-$VIIVAVERSIO}" ]; then
        echo "viiva-z0-z7|--tasot 0-7 $viivaarg"
      fi
      ;;
  esac
  case "$SARJAT" in
    z0-z7|kaikki)
      echo "z0-z6|--tasot 0-6 --kaariminuutit 3$pohjaarg"
      echo "z7a|--tasot 7 --sarakkeet 0-43 --kaariminuutit $KORKEUS$pohjaarg"
      echo "z7b|--tasot 7 --sarakkeet 44-87 --kaariminuutit $KORKEUS$pohjaarg"
      echo "z7c|--tasot 7 --sarakkeet 88-131 --kaariminuutit $KORKEUS$pohjaarg"
      echo "z7d|--tasot 7 --sarakkeet 132-168 --kaariminuutit $KORKEUS$pohjaarg"
      echo "viiva-z0-z7|--tasot 0-7 $viivaarg"
      echo "nosto-z5-z7|--tasot 5-7 $nostoarg"
      [ "$ILMAN_RANTAVIIVAA" -eq 1 ] && echo "ranta-z0-z7|--tasot 0-7 $rantaarg"
      ;;
  esac
  case "$SARJAT" in
    z8|kaikki)
      local a=0 b n=1
      while [ "$a" -lt "$Z8_SARAKKEITA" ]; do
        b=$((a + Z8_KAISTA - 1))
        [ "$b" -ge "$Z8_SARAKKEITA" ] && b=$((Z8_SARAKKEITA - 1))
        printf 'z8-%03d|--tasoja 9 --tasot 8 --sarakkeet %s-%s --kaariminuutit %s%s\n' \
          "$n" "$a" "$b" "$KORKEUS" "$pohjaarg"
        a=$((b + 1)); n=$((n + 1))
      done
      # Viivataso z8 on 8 680 laattaa ja nostotaso z8 2 075 — pelkkää
      # läpinäkyvää mustetta ilman aineistoa, mutta kaistoitettuna nekin
      # jakautuvat ytimille.
      a=0; n=1
      while [ "$a" -lt "$Z8_SARAKKEITA" ]; do
        b=$((a + Z8_KAISTA * 8 - 1))
        [ "$b" -ge "$Z8_SARAKKEITA" ] && b=$((Z8_SARAKKEITA - 1))
        printf 'viiva-z8-%02d|--tasoja 9 --tasot 8 --sarakkeet %s-%s %s\n' "$n" "$a" "$b" "$viivaarg"
        a=$((b + 1)); n=$((n + 1))
      done
      echo "nosto-z8|--tasoja 9 --tasot 8 $nostoarg"
      if [ "$ILMAN_RANTAVIIVAA" -eq 1 ]; then
        a=0; n=1
        while [ "$a" -lt "$Z8_SARAKKEITA" ]; do
          b=$((a + Z8_KAISTA * 8 - 1))
          [ "$b" -ge "$Z8_SARAKKEITA" ] && b=$((Z8_SARAKKEITA - 1))
          printf 'ranta-z8-%02d|--tasoja 9 --tasot 8 --sarakkeet %s-%s %s\n' "$n" "$a" "$b" "$rantaarg"
          a=$((b + 1)); n=$((n + 1))
        done
      fi
      ;;
  esac
}

# --------------------------------------------------------- yhden ajo
aja_shardi () {
  local nimi="$1"
  local rivi args
  rivi="$(shardit | awk -F'|' -v n="$nimi" '$1 == n { print $2 }')"
  [ -n "$rivi" ] || { echo "VIRHE: tuntematon shardi $nimi" >&2; exit 2; }
  args="$rivi"
  local kansio="$ULOS/$nimi"
  local loki="$ULOS/lokit/$nimi.log"
  mkdir -p "$kansio" "$ULOS/lokit"
  local alkoi
  alkoi="$(date +%s)"
  # `--korkeuspalat` vain kun se on olemassa: nosto- ja viivatason
  # shardit eivät lue ruudukkoa lainkaan.
  local palat=""
  case "$args" in
    *"--kaariminuutit 1"*) [ -d "$ULOS/korkeuspalat" ] && palat="--korkeuspalat $ULOS/korkeuspalat" ;;
  esac
  # shellcheck disable=SC2086
  if node "$JUURI/tools/generoi-laattapyramidi.mjs" "$kansio" \
      --data "$ULOS/ne-data" $args $palat \
      --laatu "$LAATU" --patina "$PATINA" --versio "$VERSIO" >"$loki" 2>&1; then
    local kesto laattoja
    kesto=$(( $(date +%s) - alkoi ))
    laattoja="$(find "$kansio" -name "*.webp" | wc -l | tr -d ' ')"
    echo "$nimi valmis: $laattoja laattaa, ${kesto} s"
    # Epäonnistunut vienti EI merkitse shardia valmiiksi: seuraava ajo
    # ottaa sen uudestaan eikä ämpäriin jää puolikasta tasoa.
    if [ "$VIE" -eq 1 ]; then
      if ! vie_shardi "$nimi" "$kansio"; then
        echo "VIRHE: shardin $nimi vienti epäonnistui" >&2
        return 1
      fi
      if [ "$SIIVOA" -eq 1 ]; then rm -rf "$kansio"; fi
    fi
    printf '%s %s\n' "$laattoja" "$kesto" > "$ULOS/lokit/$nimi.valmis"
    return 0
  fi
  echo "VIRHE shardissa $nimi — loki $loki" >&2
  tail -5 "$loki" >&2 || true
  return 1
}

# ------------------------------------------------------------- vienti
#
# TÄSMÄLLEEN TYÖNKULUN KOMENTO JA POLUT: laatat ovat muuttumattomia
# (versio on polussa), joten ne saavat ikuisen välimuistin. Nosto- ja
# viivataso menevät OMAN versionsa alipolkuun.
#
# VIENTI RINNAKKAIN (7.9.2026). `aws s3 sync` vie oletuksena kymmenen
# yhtaikaista pyyntöä, ja 170 000 pientä tiedostoa kesti sillä 55 min.
# Asetus annetaan kahdella tavalla, koska CLI:n versiot lukevat sen eri
# paikoista: ympäristömuuttujina JA omaan konfiguraatiotiedostoon (sama
# kuin `aws configure set default.s3.max_concurrent_requests 32`).
# Koneen omaan ~/.aws/configiin ei kosketa — jos ympäristössä on jo
# AWS_PROFILE tai AWS_CONFIG_FILE, sitä kunnioitetaan sellaisenaan.
aws_viritys () {
  export AWS_MAX_CONCURRENT_REQUESTS="${AWS_MAX_CONCURRENT_REQUESTS:-32}"
  export AWS_MAX_QUEUE_SIZE="${AWS_MAX_QUEUE_SIZE:-10000}"
  [ -z "${AWS_PROFILE:-}" ] || return 0
  [ -z "${AWS_CONFIG_FILE:-}" ] || return 0
  local asetukset="$ULOS/aws-asetukset.conf"
  mkdir -p "$ULOS"
  printf '[default]\ns3 =\n  max_concurrent_requests = %s\n  max_queue_size = %s\n' \
    "$AWS_MAX_CONCURRENT_REQUESTS" "$AWS_MAX_QUEUE_SIZE" > "$asetukset"
  export AWS_CONFIG_FILE="$asetukset"
}

vaadi_avaimet () {
  [ -n "${AMPARI:-}" ] || { echo "VIRHE: AMPARI puuttuu ympäristöstä." >&2; exit 1; }
  [ -n "${PAATE:-}" ] || { echo "VIRHE: PAATE puuttuu ympäristöstä." >&2; exit 1; }
  [ -n "${AWS_ACCESS_KEY_ID:-}" ] && [ -n "${AWS_SECRET_ACCESS_KEY:-}" ] \
    || { echo "VIRHE: AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY puuttuu ympäristöstä." >&2; exit 1; }
  vaadi aws "Asenna: brew install awscli."
  aws_viritys
}

vie_shardi () {
  local nimi="$1" kansio="$2" taso z
  for taso in "$kansio"/z*; do
    [ -d "$taso" ] || continue
    z="$(basename "$taso")"
    aws s3 sync "$taso" "s3://$AMPARI/julisteet/pyramidi/$VERSIO/$z" \
      --endpoint-url "$PAATE" \
      --exclude '*' --include '*.webp' \
      --content-type image/webp \
      --cache-control 'public, max-age=31536000, immutable' \
      --cli-connect-timeout "$AWS_YHTEYSAIKA" \
      --no-progress >/dev/null
  done
  if [ -d "$kansio/nostot" ]; then
    aws s3 sync "$kansio/nostot" "s3://$AMPARI/julisteet/pyramidi/$NOSTOVERSIO/nostot" \
      --endpoint-url "$PAATE" \
      --exclude '*' --include '*.webp' \
      --content-type image/webp \
      --cache-control 'public, max-age=31536000, immutable' \
      --cli-connect-timeout "$AWS_YHTEYSAIKA" \
      --no-progress >/dev/null
  fi
  if [ -d "$kansio/viivat" ]; then
    aws s3 sync "$kansio/viivat" "s3://$AMPARI/julisteet/pyramidi/$VIIVAVERSIO/viivat" \
      --endpoint-url "$PAATE" \
      --exclude '*' --include '*.webp' \
      --content-type image/webp \
      --cache-control 'public, max-age=31536000, immutable' \
      --cli-connect-timeout "$AWS_YHTEYSAIKA" \
      --no-progress >/dev/null
  fi
  if [ -d "$kansio/ranta" ]; then
    aws s3 sync "$kansio/ranta" "s3://$AMPARI/julisteet/pyramidi/$RANTAVERSIO/ranta" \
      --endpoint-url "$PAATE" \
      --exclude '*' --include '*.webp' \
      --content-type image/webp \
      --cache-control 'public, max-age=31536000, immutable' \
      --cli-connect-timeout "$AWS_YHTEYSAIKA" \
      --no-progress >/dev/null
  fi
  echo "$nimi viety ämpäriin."
}

# ------------------------------------------------ luettelo (pyramidi.json)
#
# Luettelo kuvaa KOKO pyramidin eikä yksikään shardi tunne muiden
# tasoja, joten se tehdään erikseen `--vain-luettelo`-ajolla (pelkkä
# geometria, ei selainta eikä aineistoa) vasta kun kaikki shardit ovat
# valmiit — täsmälleen kuten työnkulun oma luettelojobi.
#
# TURVATARKISTUS: uuden luettelon on erottava ämpärin luettelosta VAIN
# z8:n osalta, kun poltetaan z8 olemassa oleviin versioihin. Jos repo on
# muuttunut sen jälkeen kun nykyiset laatat poltettiin, luettelo
# lupaisi muuttuneita nostoja tai rajoja, joita laatoissa ei ole.
kokoa_luettelo () {
  local kansio="$ULOS/luettelo"
  local tasot="0-7" tasoja=""
  case "$SARJAT" in
    z8|kaikki) tasot="0-8"; tasoja="--tasoja 9" ;;
  esac
  local lisa=""
  [ "$PIIRIT" = "ei" ] && lisa="--eipiirit"
  # RANTATASO LUETTELOON: peite lasketaan rantaviiva-aineistosta, joten
  # luettelojobi tarvitsee --data-kansion (sama Natural Earth kuin
  # shardeilla). Ilman --rantaversiota kenttää ei synny lainkaan, ja
  # vanha peli (ja rantaviivallinen pohja) toimii kuten ennen.
  [ -n "$RANTAVERSIO" ] && lisa="$lisa --rantaversio $RANTAVERSIO"
  [ "$ILMAN_RANTAVIIVAA" -eq 1 ] && lisa="$lisa --ilman-rantaviivaa"
  mkdir -p "$kansio"
  rm -f "$kansio/pyramidi.json"
  # shellcheck disable=SC2086
  node "$JUURI/tools/generoi-laattapyramidi.mjs" "$kansio" \
    --data "$ULOS/ne-data" \
    $tasoja --tasot "$tasot" --versio "$VERSIO" --nostoversio "$NOSTOVERSIO" \
    --viivaversio "$VIIVAVERSIO" --kaariminuutit "$KORKEUS" \
    --laatu "$LAATU" --patina "$PATINA" $lisa --vain-luettelo \
    > "$ULOS/lokit/luettelo.log" 2>&1
  echo "· luettelo koottu: $kansio/pyramidi.json"
}

vertaa_luettelo () {
  # Kolmas argumentti: mitkä kerrokset poltettiin kokonaan uudestaan
  # (niiden ero ämpärin luetteloon on odotettu, ei vika).
  local uudet=""
  [ "$NOSTOVERSIO" != "$A_NOSTOVERSIO" ] && uudet="$uudet nosto"
  [ "$VIIVAVERSIO" != "$A_VIIVAVERSIO" ] && uudet="$uudet viiva"
  node -e '
    const fs = require("fs");
    const vanha = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const uusi = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
    const uudetKerrokset = (process.argv[3] ?? "").split(" ").filter(Boolean);
    const erot = [];
    const kentat = ["versio", "laatta", "muoto", "laatu", "patina", "nimiot"];
    for (const k of kentat) {
      if (JSON.stringify(vanha[k]) !== JSON.stringify(uusi[k])) erot.push(`${k}: ${vanha[k]} -> ${uusi[k]}`);
    }
    if (JSON.stringify(vanha.arkki) !== JSON.stringify(uusi.arkki)) erot.push("arkki");
    if (JSON.stringify(vanha.projektio) !== JSON.stringify(uusi.projektio)) erot.push("projektio");
    // Tasot z0-z7 mitoiltaan samat; z8 saa olla uusi.
    for (const t of vanha.tasot ?? []) {
      const u = (uusi.tasot ?? []).find((x) => x.z === t.z);
      if (!u) { erot.push(`taso z${t.z} katosi`); continue; }
      if (u.leveys !== t.leveys || u.korkeus !== t.korkeus) erot.push(`taso z${t.z} mitat`);
    }
    // Nostot: sama tunnus->tiiviste-joukko. Ero on VIKA, jos nostotasoa
    // ei poltettu uudestaan: luettelo lupaisi poltetuiksi merkkejä,
    // joita nykyisissä z5-z7-laatoissa ei ole, ja peli vaientaisi ne
    // elävästä kerroksesta (js/laattapyramidi.js nostoOnPoltettu) —
    // merkki katoaisi kartalta kokonaan.
    if (!uudetKerrokset.includes("nosto")) {
      const vn = vanha.nostotaso?.nostot ?? {};
      const un = uusi.nostotaso?.nostot ?? {};
      const lisa = Object.keys(un).filter((k) => !(k in vn));
      const pois = Object.keys(vn).filter((k) => !(k in un));
      const muuttui = Object.keys(vn).filter((k) => k in un && un[k] !== vn[k]);
      if (lisa.length || pois.length || muuttui.length) {
        erot.push(`nostot: +${lisa.length} -${pois.length} ~${muuttui.length}`
          + " (nostotaso on poltettava uudestaan: --nostoversio <uusi>)");
      }
      if ((vanha.nostotaso?.versio ?? null) !== (uusi.nostotaso?.versio ?? null)) erot.push("nostotaso.versio");
    }
    if (!uudetKerrokset.includes("viiva")) {
      if ((vanha.viivataso?.piirit ?? null) !== (uusi.viivataso?.piirit ?? null)) erot.push("viivataso.piirit");
      if ((vanha.viivataso?.versio ?? null) !== (uusi.viivataso?.versio ?? null)) erot.push("viivataso.versio");
      const vr = JSON.stringify(vanha.viivataso?.rajat ?? null);
      const ur = JSON.stringify(uusi.viivataso?.rajat ?? null);
      if (vr !== ur) erot.push("viivataso.rajat (viivataso on poltettava uudestaan: --viivaversio <uusi>)");
    }
    if (erot.length) {
      console.error("Luettelo eroaa ämpärin luettelosta muutenkin kuin z8:n osalta:");
      for (const e of erot) console.error("  - " + e);
      process.exit(1);
    }
    console.log("· luettelo täsmää ämpäriin z8:aa lukuun ottamatta");
  ' "$ULOS/ampari-luettelo.json" "$ULOS/luettelo/pyramidi.json" "$uudet"
}

vie_luettelo () {
  aws s3 cp "$ULOS/luettelo/pyramidi.json" \
    "s3://$AMPARI/julisteet/pyramidi/pyramidi.json" \
    --endpoint-url "$PAATE" \
    --content-type application/json \
    --cache-control 'public, max-age=300' \
    --cli-connect-timeout "$AWS_YHTEYSAIKA" \
    --no-progress
  echo "· luettelo viety: versio $VERSIO, tasot z0…z8"
}

# --------------------------------------------------------------- pallo
#
# PALLON SARJA JA VERSIOVAHTI. js/pallo.js lepokerroksenKerrokset vaatii,
# että pallon laatat.json:in versio/viivat/nostot ovat samat kuin
# pyramidi.jsonin versio/viivataso.versio/nostotaso.versio. z8:n lisäys
# olemassa oleviin versioihin EI muuta yhtäkään niistä, joten pallon
# sarjaa ei tarvitse polttaa uudestaan. Uusi pohjaversio muuttaa, ja
# silloin tämä vaihe on pakollinen — ja js/pallo.js:n PALLO_LAATTAVERSIO
# on vaihdettava julkaisussa.
#
# SHARDIEN NIMET. Sama muoto kuin pyramidilla (pallo-001…), jotta
# työnkulun "Kaatuneiden shardien lokit" -askel ja `.valmis`-ohitus
# toimivat niille sellaisenaan.
pallon_shardit () {
  local i=1
  while [ "$i" -le "$PALLO_OSIA" ]; do
    printf 'pallo-%03d\n' "$i"
    i=$((i + 1))
  done
}

# PALLON SHARDIN VIENTI ON `cp --recursive` EIKÄ `sync`: osat ovat
# pistevieraat, joten jokainen shardi kirjoittaa vain omat avaimensa
# eikä kohteen listaus (87 381 avainta shardia kohti) tuottaisi mitään.
vie_pallo_shardi () {
  local kansio="$1" ampariKansio="$2"
  # Tyhjä osa (osia enemmän kuin laattoja) ei ole virhe.
  [ -n "$(find "$kansio" -name '*.jpg' -print -quit)" ] || return 0
  aws s3 cp "$kansio" "s3://$AMPARI/$ampariKansio" --recursive \
    --endpoint-url "$PAATE" --exclude '*' --include '*.jpg' \
    --content-type image/jpeg \
    --cache-control 'public, max-age=31536000, immutable' \
    --cli-connect-timeout "$AWS_YHTEYSAIKA" \
    --no-progress >/dev/null
}

# YKSI PALLON SHARDI: laskee osansa omaan kansioonsa, vie sen ja
# merkitsee itsensä valmiiksi. Ämpärin kansio ja rantavalinta luetaan
# luetteloajon jäljistä ($ULOS/pallolaatat), jotta shardin voi ajaa
# uudestaan yksinään (`--vain pallo-007`).
aja_pallo_shardi () {
  local nimi="$1"
  local i="${nimi#pallo-}"
  case "$i" in ''|*[!0-9]*) echo "VIRHE: tuntematon shardi $nimi" >&2; return 2 ;; esac
  i=$((10#$i))
  [ "$i" -ge 1 ] && [ "$i" -le "$PALLO_OSIA" ] || {
    echo "VIRHE: $nimi ei ole osa 1…$PALLO_OSIA (anna sama --pallo-osia)" >&2; return 2; }
  local luettelokansio="$ULOS/pallolaatat"
  [ -s "$luettelokansio/kansio.txt" ] || {
    echo "VIRHE: $luettelokansio/kansio.txt puuttuu — aja ensin --vain-pallo," >&2
    echo "joka kokoaa luettelon ja kertoo ämpärin kansion." >&2; return 1; }
  local ampariKansio rantalippu=""
  ampariKansio="$(cat "$luettelokansio/kansio.txt")"
  # RANTAVALINTA LUETTELOSTA: shardin on koottava täsmälleen se sarja,
  # jonka luettelo lupaa (laatat.json `ranta`: null = rantaviivaa ei ole
  # laatoissa, koska pallo piirtää sen vektorina).
  if [ -s "$luettelokansio/laatat.json" ]; then
    rantalippu="$(node -e 'const j = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")); process.stdout.write(j.ranta ? "" : "--ilman-rantaa");' "$luettelokansio/laatat.json")"
  fi
  local kansio="$ULOS/$nimi"
  local loki="$ULOS/lokit/$nimi.log"
  mkdir -p "$kansio" "$ULOS/lokit"
  # Yksin ajettu shardi (`--vain pallo-007`) on yksi prosessi: sille
  # kelpaa yhden ajon todistetusti turvallinen tahti.
  local vali="${NOUTOVALI:-40}"
  local alkoi
  alkoi="$(date +%s)"
  # shellcheck disable=SC2086
  if (cd "$JUURI" && node tools/tee-pallolaatat.mjs \
        --min "$PALLO_MIN" --max "$PALLO_MAX" --nostot $rantalippu \
        --tunniste "$PALLOTUNNISTE" --osa "$i/$PALLO_OSIA" \
        --noutovali "$vali" --ulos "$kansio") >"$loki" 2>&1; then
    local kesto laattoja
    kesto=$(( $(date +%s) - alkoi ))
    laattoja="$(find "$kansio" -name '*.jpg' | wc -l | tr -d ' ')"
    echo "$nimi valmis: $laattoja laattaa, ${kesto} s"
    if [ "$VIE" -eq 1 ]; then
      if ! vie_pallo_shardi "$kansio" "$ampariKansio"; then
        echo "VIRHE: shardin $nimi vienti epäonnistui" >&2
        return 1
      fi
      if [ "$SIIVOA" -eq 1 ]; then rm -rf "$kansio"; fi
    fi
    printf '%s %s\n' "$laattoja" "$kesto" > "$ULOS/lokit/$nimi.valmis"
    return 0
  fi
  echo "VIRHE shardissa $nimi — loki $loki" >&2
  tail -5 "$loki" >&2 || true
  return 1
}

polta_pallo () {
  if [ "$VIE" -eq 1 ]; then vaadi_avaimet; fi
  [ -n "$PALLOTUNNISTE" ] || {
    echo "VIRHE: --pallo vaatii --pallotunniste <kirjain>. Pallon laatat ovat" >&2
    echo "vuoden välimuistissa, joten samaan kansioon ei kirjoiteta eri" >&2
    echo "sisältöä: nykyinen tunniste on js/pallo.js PALLO_LAATTATUNNISTE." >&2
    exit 2
  }
  (cd "$JUURI" && npm install --no-save --no-fund --no-audit sharp)
  local rantalippu=""
  # PALLOLLA RANTAVIIVA ON VEKTORI (js/pallovektorit.js), joten sarjaan ei
  # polteta rantatasoa: poltettu muste jäisi vektorin alle venytettynä
  # usvana ja levossa viiva näkyisi kahtena. `--pallon-ranta` palauttaa
  # sen, jos vektorikerros ei vielä ole julkaistu.
  #
  # PÄÄTÖS ON RANTATASON OLEMASSAOLO, ei tämän ajon lippu: rantataso
  # luettelossa tarkoittaa, että pohja on poltettu ILMAN rantaviivaa
  # (uusintapoltto 7.9.2026). Silloin sama valinta kuuluu myös
  # pelkkään pallon polttoon (`--vain-pallo`) ja z8:n lisäykseen —
  # muuten sarja saisi rantaviivan, jonka vektorikerros piirtää
  # toistamiseen. Ilman rantatasoa (vanha pohja) lippu ei tee mitään.
  if [ "$PALLON_RANTA" -eq 0 ] && [ -n "$RANTAVERSIO" ]; then
    rantalippu="--ilman-rantaa"
  fi

  # 1. LUETTELO ENSIN, VIENTI VIIMEISENÄ. Luettelo kuvaa koko sarjan,
  #    joten shardit eivät kirjoita sitä (tee-pallolaatat `--osa`);
  #    kansio.txt kertoo vientipolun jo nyt, mutta laatat.json viedään
  #    vasta, kun kaikki osat ovat ämpärissä — peli koettaa sen
  #    olemassaoloa ennen laattojen käyttöä.
  local luettelokansio="$ULOS/pallolaatat"
  mkdir -p "$luettelokansio"
  # shellcheck disable=SC2086
  (cd "$JUURI" && node tools/tee-pallolaatat.mjs --vain-luettelo \
    --min "$PALLO_MIN" --max "$PALLO_MAX" --nostot $rantalippu \
    --tunniste "$PALLOTUNNISTE" --ulos "$luettelokansio")
  local kansio
  kansio="$(cat "$luettelokansio/kansio.txt")"

  # 2. SHARDIT RINNAKKAIN, sama xargs-logiikka kuin pyramidilla.
  local rinnakkain="$YTIMET"
  if [ "$rinnakkain" -gt "$PALLO_OSIA" ]; then rinnakkain="$PALLO_OSIA"; fi
  # NOUTOTAHTI RINNAKKAISUUDEN MUKAAN (tee-pallolaatat YHTEISTAHTI_MS):
  # 15 ms × rinnakkaiset prosessit on yhteensä noin 66 noutoa sekunnissa.
  # Osia on ytimiä enemmän, joten kerroin on PROSESSIEN eikä osien määrä.
  [ -n "$NOUTOVALI" ] || NOUTOVALI=$((15 * rinnakkain))
  local lista="$ULOS/lokit/pallo-ajossa.txt"
  : > "$lista"
  local nimi
  for nimi in $(pallon_shardit); do
    if [ "$UUDESTAAN" -eq 0 ] && [ -f "$ULOS/lokit/$nimi.valmis" ]; then
      echo "· ohitetaan valmis shardi $nimi"
      continue
    fi
    echo "$nimi" >> "$lista"
  done
  local maara
  maara="$(wc -l < "$lista" | tr -d ' ')"
  echo "· pallon sarja $kansio (tasot $PALLO_MIN–$PALLO_MAX)"
  echo "· pallon shardeja ajossa $maara / $PALLO_OSIA (rinnakkain $rinnakkain,"
  echo "  noutovali $NOUTOVALI ms, ranta ${rantalippu:-mukaan})"
  local alkoi virhe=0
  alkoi="$(date +%s)"
  xargs -P "$rinnakkain" -I{} "$ITSE" --lapsi --vain {} \
    --pallotunniste "$PALLOTUNNISTE" --pallo-osia "$PALLO_OSIA" \
    --pallo-tasot "$PALLO_MIN-$PALLO_MAX" --noutovali "$NOUTOVALI" \
    --ulos "$ULOS" \
    $( [ "$VIE" -eq 1 ] || echo --ei-vie ) \
    $( [ "$SIIVOA" -eq 1 ] && echo --siivoa ) \
    < "$lista" || virhe=1
  local kesto
  kesto=$(( $(date +%s) - alkoi ))
  echo "· pallon laatat: ${kesto} s ($(awk -v k="$kesto" 'BEGIN { printf "%.1f", k / 3600 }') h)"
  if [ "$virhe" -ne 0 ]; then
    echo "VIRHE: yksi tai useampi pallon shardi kaatui. Kesken jääneet:" >&2
    while read -r nimi2; do
      [ -f "$ULOS/lokit/$nimi2.valmis" ] || echo "  $nimi2 (loki $ULOS/lokit/$nimi2.log)" >&2
    done < "$lista"
    echo "Aja uudestaan: tools/polta-paikallisesti.sh --vain-pallo" >&2
    echo "  --pallotunniste $PALLOTUNNISTE --pallo-osia $PALLO_OSIA" >&2
    return 1
  fi

  # 3. LUETTELO VIIMEISENÄ.
  if [ "$VIE" -eq 1 ]; then
    aws s3 cp "$luettelokansio/laatat.json" "s3://$AMPARI/${kansio}laatat.json" \
      --endpoint-url "$PAATE" --content-type application/json \
      --cache-control 'public, max-age=3600' \
      --cli-connect-timeout "$AWS_YHTEYSAIKA" --no-progress
    echo "· pallon sarja viety: $kansio"
  fi
  echo "  MUISTA: js/pallo.js PALLO_LAATTAVERSIO ja PALLO_LAATTATUNNISTE"
  echo "  osoittamaan tähän kansioon, jos ne eivät jo osoita."
}

# ============================================================ pääohjelma

mkdir -p "$ULOS/lokit"

# Oletukset ämpärin luettelosta. Luettelo luetaan AINA (välimuistista
# toisella kerralla), koska shardilista riippuu siitä, vaihtuuko nosto-
# tai viivaversio — vaihtuva versio polttaa koko kerroksen, ei vain z8:aa.
eval "$(lue_ampari)"
VERSIO="${VERSIO:-$A_VERSIO}"
VIIVAVERSIO="${VIIVAVERSIO:-$A_VIIVAVERSIO}"
NOSTOVERSIO="${NOSTOVERSIO:-$A_NOSTOVERSIO}"
RANTAVERSIO="${RANTAVERSIO:-$A_RANTAVERSIO}"
LAATU="${LAATU:-$A_LAATU}"
PATINA="${PATINA:-$A_PATINA}"
PIIRIT="${PIIRIT:-$A_PIIRIT}"

# Rannaton pohja on UUSI versio, ei lisä vanhaan: ämpärin nykyisen
# version alle ei kirjoiteta eri sisältöä (laatat ovat vuoden
# välimuistissa). Ja koska pohjan versio vaihtuu, pallon sarja on
# poltettava samasta versiosta tai lepokerros sammuu.
if [ "$ILMAN_RANTAVIIVAA" -eq 1 ] && [ "$VAIN_PALLO" -eq 0 ]; then
  [ "$VERSIO" != "$A_VERSIO" ] || {
    echo "VIRHE: --versio $VERSIO on ämpärin nykyinen versio. Rannaton pohja" >&2
    echo "tarvitsee oman polkunsa; anna uusi --versio." >&2
    exit 2 ; }
  # KAIKKI KOLME MERKKITASOA UUSIIN VERSIOIHIN. Uusintapoltto ajaa myös
  # viiva- ja nostotason, ja ne kirjoittaisivat oletuksena ämpärin
  # NYKYISIIN versiopolkuihin — polkuihin, jotka ovat selaimissa vuoden
  # välimuistissa. Sama polku, eri sisältö on juuri se virhe, jota
  # versiointi estää.
  for parivi in "viivaversio:$VIIVAVERSIO:$A_VIIVAVERSIO" \
                "nostoversio:$NOSTOVERSIO:$A_NOSTOVERSIO"; do
    nimi="${parivi%%:*}"; loput="${parivi#*:}"
    uusi="${loput%%:*}"; vanha="${loput#*:}"
    [ "$uusi" != "$vanha" ] || {
      echo "VIRHE: --ilman-rantaviivaa polttaa myös viiva- ja nostotason;" >&2
      echo "anna niille uudet versiot: --$nimi <uusi> (nyt $uusi = ämpärin)." >&2
      exit 2 ; }
  done
  if [ "$VIE" -eq 1 ] && [ "$PALLO" -ne 1 ] && [ "$LISTA" -eq 0 ] && [ "$LAPSI" -eq 0 ]; then
    echo "VIRHE: --ilman-rantaviivaa vaatii --pallo --pallotunniste <kirjain>:" >&2
    echo "pohjan versio vaihtuu, ja lepokerroksen versiovahti (js/pallo.js" >&2
    echo "lepokerroksenKerrokset) sammuttaa kerroksen, kunnes pallon sarja on" >&2
    echo "poltettu samasta versiosta." >&2
    exit 2
  fi
fi

if [ "$LISTA" -eq 1 ]; then
  # --vain-pallo ei polta yhtään pyramidin shardia, joten niitä ei listata.
  if [ "$VAIN_PALLO" -eq 0 ]; then
    shardit | awk -F'|' '{ printf "%-14s %s\n", $1, $2 }'
  fi
  if [ "$PALLO" -eq 1 ]; then
    pallon_shardit | awk -v n="$PALLO_OSIA" -v a="$PALLO_MIN" -v b="$PALLO_MAX" \
      '{ printf "%-14s pallon Mercator-sarja z%s-%s, osa %d/%s\n", $1, a, b, NR, n }'
  fi
  exit 0
fi

# Lapsiprosessi (xargs) ajaa yhden shardin ilman esitarkistuksia.
if [ "$LAPSI" -eq 1 ] && [ -n "$VAIN" ]; then
  case "$VAIN" in
    pallo-*) aja_pallo_shardi "$VAIN" ;;
    *) aja_shardi "$VAIN" ;;
  esac
  exit $?
fi

[ "$VIE" -eq 1 ] && vaadi_avaimet
# PALLON SARJA EI TARVITSE SELAINTA EIKÄ AINEISTOA: se lukee valmiit
# laatat ämpäristä ja piirtää sharpilla. Esitarkistus (Natural Earth,
# Chromium, korkeuspalat) ajetaan vain, kun pyramidia poltetaan.
if [ "$VAIN_PALLO" -eq 1 ] || [ "${VAIN#pallo-}" != "$VAIN" ]; then
  tarkista_node
else
  esitarkistus
fi

echo "Paikallinen poltto — sarjat $SARJAT, ytimiä $YTIMET"
echo "  pohja   $VERSIO   viivat $VIIVAVERSIO   nostot $NOSTOVERSIO"
[ "$ILMAN_RANTAVIIVAA" -eq 1 ] \
  && echo "  ranta   $RANTAVERSIO (pohja ILMAN rantaviivaa; pallolla vektori)"
echo "  laatu   $LAATU  patina $PATINA  piirit $PIIRIT  korkeus ${KORKEUS}′"
echo "  ulos    $ULOS"
[ "$VIE" -eq 1 ] && echo "  vienti  s3://$AMPARI/julisteet/pyramidi/ ($PAATE)" \
  || echo "  vienti  EI (--ei-vie tai --koe)"

export PW_CHROMIUM
export NODE_USE_ENV_PROXY="${NODE_USE_ENV_PROXY:-1}"

# ------------------------------------------------------------ yksi shardi
if [ -n "$VAIN" ]; then
  case "$VAIN" in
    pallo-*) aja_pallo_shardi "$VAIN" ;;
    *) aja_shardi "$VAIN" ;;
  esac
  exit $?
fi

# --------------------------------------------------------- pelkkä pallo
#
# `--vain-pallo` (tai `--sarjat pallo`): pyramidi on jo ämpärissä, ja
# vain pallon Mercator-sarja poltetaan uudestaan — esimerkiksi kun sarja
# kaatui kesken tai kun sen piirto muuttuu (uusi --pallotunniste).
if [ "$VAIN_PALLO" -eq 1 ]; then
  polta_pallo
  echo "Valmis."
  exit 0
fi

# ------------------------------------------------------------------ koe
#
# YKSI z8-SHARDI JA AIKA-ARVIO. Kaista on 4 saraketta × 206 riviä eli
# 824 laattaa; koko taso on 338 saraketta eli 85 kaistaa. Arvio kertoo
# koko z8:n keston neljällä, kahdellatoista ja kahdellakymmenelläneljällä
# ytimellä — hukkaa ei ole, koska kaistoja on ytimiä paljon enemmän.
if [ "$KOE" -eq 1 ]; then
  koe="$(shardit | awk -F'|' '/^z8-/ { print $1; exit }')"
  [ -n "$koe" ] || { echo "VIRHE: --koe vaatii z8-sarjan" >&2; exit 2; }
  echo "· koeajo: shardi $koe"
  alkoi="$(date +%s)"
  aja_shardi "$koe"
  kesto=$(( $(date +%s) - alkoi ))
  laattoja="$(find "$ULOS/$koe" -name '*.webp' | wc -l | tr -d ' ')"
  kaistoja="$(shardit | grep -c '^z8-')"
  tavuja="$(find "$ULOS/$koe" -name '*.webp' -exec cat {} + | wc -c | tr -d ' ')"
  echo ""
  echo "KOEAJON TULOS"
  echo "  shardi        $koe: $laattoja laattaa, $kesto s"
  # Koko taso skaalataan SARAKKEISTA eikä shardien lukumäärästä:
  # viimeinen kaista on vajaa (338 = 84 x 4 + 2).
  awk -v k="$kesto" -v l="$laattoja" -v n="$kaistoja" -v t="$tavuja" \
      -v sar="$Z8_SARAKKEITA" -v kai="$Z8_KAISTA" 'BEGIN {
    if (l == 0 || k == 0) { print "  laattoja ei syntynyt"; exit }
    suhde = sar / kai;
    printf "  laattaa/s     %.2f (yksi ydin)\n", l / k;
    printf "  s/laatta      %.2f\n", k / l;
    printf "  keskikoko     %.1f kt\n", t / l / 1024;
    kok = k * suhde;
    printf "  z8 yhteensa   %d kaistaa, %.0f laattaa, %.2f Gt\n", n, l * suhde, t * suhde / 1e9;
    printf "  kesto  4 ydinta  %.1f h\n", kok / 4 / 3600;
    printf "  kesto 12 ydinta  %.1f h\n", kok / 12 / 3600;
    printf "  kesto 24 ydinta  %.1f h\n", kok / 24 / 3600;
  }'
  echo ""
  echo "  (arvio olettaa saman kuormituksen joka kaistalle; merikaistat"
  echo "   ovat nopeampia ja mannerkaistat hitaampia, joten koeajo"
  echo "   kannattaa toistaa yhdellä mannerkaistalla:"
  echo "   tools/polta-paikallisesti.sh --vain z8-047 --ei-vie)"
  exit 0
fi

# --------------------------------------------------------- koko ajo
lista="$ULOS/lokit/ajossa.txt"
: > "$lista"
while IFS='|' read -r nimi _; do
  [ -n "$nimi" ] || continue
  if [ "$UUDESTAAN" -eq 0 ] && [ -f "$ULOS/lokit/$nimi.valmis" ]; then
    echo "· ohitetaan valmis shardi $nimi"
    continue
  fi
  echo "$nimi" >> "$lista"
done <<EOF
$(shardit)
EOF

maara="$(wc -l < "$lista" | tr -d ' ')"
echo "· shardeja ajossa $maara (rinnakkain $YTIMET)"
alkoi="$(date +%s)"
# Jokainen shardi on oma prosessinsa, jotta yhden kaatuminen ei kaada
# muita; xargs palauttaa nollasta poikkeavan koodin, jos yksikin kaatui.
virhe=0
xargs -P "$YTIMET" -I{} "$ITSE" --lapsi --vain {} \
  --sarjat "$SARJAT" --versio "$VERSIO" --viivaversio "$VIIVAVERSIO" \
  --nostoversio "$NOSTOVERSIO" --rantaversio "$RANTAVERSIO" \
  --laatu "$LAATU" --patina "$PATINA" \
  --piirit "$PIIRIT" --korkeus "$KORKEUS" --ulos "$ULOS" \
  $( [ "$ILMAN_RANTAVIIVAA" -eq 1 ] && echo --ilman-rantaviivaa ) \
  $( [ "$VIE" -eq 1 ] || echo --ei-vie ) \
  $( [ "$SIIVOA" -eq 1 ] && echo --siivoa ) \
  < "$lista" || virhe=1

kesto=$(( $(date +%s) - alkoi ))
echo ""
echo "Poltto valmis: ${kesto} s ($(awk -v k="$kesto" 'BEGIN { printf "%.1f", k / 3600 }') h)"
if [ "$virhe" -ne 0 ]; then
  echo "VIRHE: yksi tai useampi shardi kaatui. Kesken jääneet:" >&2
  while read -r nimi; do
    [ -f "$ULOS/lokit/$nimi.valmis" ] || echo "  $nimi (loki $ULOS/lokit/$nimi.log)" >&2
  done < "$lista"
  echo "Aja uudestaan: tools/polta-paikallisesti.sh --vain <shardi>" >&2
  exit 1
fi

if [ "$LUETTELO" -eq 1 ]; then
  kokoa_luettelo
  if [ "$SARJAT" = "z8" ] && [ "$PAKOTA_LUETTELO" -eq 0 ]; then
    vertaa_luettelo
  fi
  [ "$VIE" -eq 1 ] && vie_luettelo
fi

if [ "$PALLO" -eq 1 ]; then polta_pallo; fi

echo "Valmis."
