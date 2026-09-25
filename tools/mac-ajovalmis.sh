#!/usr/bin/env bash
#
# MAC-RUNNERIN ESIVALMISTELU (self-hosted, macOS).
#
# Raamattu, MAC GITHUBIN AJOKONEENA (omistaja 6.9.2026 ilta) ja
# tarkennus 7.9.2026 aamu ("kaikki ytimet"; "Macilla voi tehdä
# lyhyempiäkin nyt kun työnkulku automatisoitu"): pitkät renderöinnit
# ja poltot ajetaan omistajan Mac Studiolla, joka on repon
# self-hosted-runner. Tämä skripti tekee sen, minkä ubuntu-ajokoneella
# tekevät actions/setup-node ja apt: varmistaa työkalut ja kertoo
# työnkululle ytimien määrän.
#
# Käyttö työnkulun askeleessa (ei muualla):
#
#   tools/mac-ajovalmis.sh [--chromium] [--ffmpeg] [--sharp]
#
#   (ilman lippuja)  node@22 ja awscli polkuun (NODE=<polku>, PATH),
#                    ytimet YTIMET-muuttujaan
#   --chromium       Playwrightin Chromium (asennetaan jos puuttuu) → PW_CHROMIUM
#   --ffmpeg         ffmpeg ja sen VP9/H.264-enkooderit
#   --sharp          npm install --no-save sharp (kuvankäsittely)
#
# Skripti KIRJOITTAA GITHUB_ENViin (NODE, PATH, YTIMET, PW_CHROMIUM),
# jos se on olemassa; muuten se vain tulostaa löydökset, joten sen voi
# ajaa myös käsin Macilla tarkistuksena. GITHUB_PATHia se ei käytä —
# ks. "NODE KIINNITETÄÄN YKSIKÄSITTEISESTI" alempana.
#
# Avaimia tämä skripti ei koskaan lue eikä tulosta: ne tulevat
# työnkulun secreteistä ympäristömuuttujina.
set -euo pipefail

JUURI="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROMIUM=0
FFMPEG=0
SHARP=0
while [ $# -gt 0 ]; do
  case "$1" in
    --chromium) CHROMIUM=1 ;;
    --ffmpeg) FFMPEG=1 ;;
    --sharp) SHARP=1 ;;
    *) echo "VIRHE: tuntematon valitsin $1" >&2; exit 2 ;;
  esac
  shift
done

vaadi () {
  command -v "$1" >/dev/null 2>&1 || {
    echo "::error::$1 puuttuu Macin polusta. $2"; exit 1; }
}

# ── NODE KIINNITETÄÄN YKSIKÄSITTEISESTI ────────────────────────────
#
# VIKA 7.9.2026 (tee-etusivupallo, ajo 34096032581): askel "Kuiva ajo"
# kaatui heti riville
#   dyld: Library not loaded: /opt/homebrew/opt/simdutf/lib/…dylib
#   Referenced from: /opt/homebrew/Cellar/merve/…/libmerve.1.2.2.dylib
# vaikka tämä skripti oli edellisessä askeleessa raportoinut
# "node v22.23.2". Syy: `node` ratkesi seuraavissa askelissa
# Homebrewin omaan (rikkinäiseen) node-binääriin, koska GITHUB_PATH
# lisää rivinsä polun ETEEN eikä lisäysjärjestys ole se, missä rivit
# kirjoitettiin — /opt/homebrew/bin päätyi node@22:n eteen. Sama Mac
# poltti silti onnistuneesti polta-macilla.yml:llä, jossa PATH
# kirjoitetaan kokonaisena GITHUB_ENViin node@22 ensimmäisenä.
#
# Siksi tässä: (1) etsitään node@22:n binääri polusta riippumatta,
# (2) koestetaan että se ylipäänsä käynnistyy, (3) viedään sekä
# NODE=<polku> että koko PATH GITHUB_ENViin (ei GITHUB_PATHia), jolloin
# jokainen myöhempi askel saa saman noden — kutsuipa se "$NODE"
# tai pelkkää `node`.
etsi_node () {
  local p pref
  for p in /opt/homebrew/opt/node@22/bin/node /usr/local/opt/node@22/bin/node; do
    if [ -x "$p" ]; then echo "$p"; return 0; fi
  done
  if command -v brew >/dev/null 2>&1; then
    pref="$(brew --prefix node@22 2>/dev/null || true)"
    if [ -n "$pref" ] && [ -x "$pref/bin/node" ]; then echo "$pref/bin/node"; return 0; fi
  fi
  return 1
}

NODE="$(etsi_node)" || {
  echo "::error::node@22 ei löydy (etsitty /opt/homebrew/opt/node@22/bin/node," \
    "/usr/local/opt/node@22/bin/node ja brew --prefix node@22). Asenna: brew install node@22"
  exit 1
}
# Homebrewin node@22 on keg-only, joten sen bin ei ole polussa oletuksena.
export PATH="$(dirname "$NODE"):/opt/homebrew/bin:/usr/local/bin:$PATH"

# EHJYYSKOE ENNEN KAIKKEA MUUTA: rikkinäinen jaettu kirjasto kaataa
# noden jo latausvaiheessa (Abort trap: 6), eikä vikaa näkisi ennen kuin
# jokin myöhempi askel kaatuu ilman selitystä.
if ! "$NODE" -e 'require("node:buffer"); Buffer.from("ä").toString("utf8");' >/dev/null 2>&1; then
  echo "::error::$NODE ei käynnisty — todennäköisesti rikkinäinen Homebrew-kirjasto" \
    "(dyld: Library not loaded, esim. libsimdutf). Korjaa Macilla:" \
    "brew update && brew upgrade && brew reinstall simdutf"
  { "$NODE" -e '0' 2>&1 | head -n 5 >&2; } || true
  exit 1
fi

vaadi aws "Asenna: brew install awscli"
NODE_MAJOR="$("$NODE" -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "::error::node $NODE_MAJOR — työkalut vaativat vähintään 22 (brew install node@22)"
  exit 1
fi

# Ytimet: macOSissa ei ole nprocia (sama kaava kuin
# tools/polta-paikallisesti.sh:n ytimia-funktiossa).
if sysctl -n hw.ncpu >/dev/null 2>&1; then
  YTIMET="$(sysctl -n hw.ncpu)"
elif command -v nproc >/dev/null 2>&1; then
  YTIMET="$(nproc)"
else
  YTIMET=4
fi

etsi_chromium () {
  # Sama etsintä kuin tools/polta-paikallisesti.sh:ssä (kaksi kopiota
  # tarkoituksella: polttoskripti on omistajan oma komentorivityökalu,
  # tämä on työnkulun askel, eikä kumpikaan saa rikkoutua toisen
  # muutoksesta). Playwright 1.5x asentaa macOS:lle "Chrome for
  # Testing" -sovelluksen, vanhemmat Chromium.app.
  local p f
  for p in "$HOME/Library/Caches/ms-playwright" "$HOME/.cache/ms-playwright" /opt/pw-browsers; do
    [ -d "$p" ] || continue
    f="$(find "$p" -maxdepth 6 -type f \
      \( -name 'Chromium' -o -name 'Google Chrome for Testing' -o -name 'chrome' \) \
      2>/dev/null | grep -v -i 'headless' | head -1)"
    [ -n "$f" ] || f="$(find "$p" -maxdepth 6 -type f -name 'chrome-headless-shell' 2>/dev/null | head -1)"
    if [ -n "$f" ]; then echo "$f"; return 0; fi
  done
  if [ -x /opt/pw-browsers/chromium ]; then echo /opt/pw-browsers/chromium; fi
  return 0
}

if [ "$CHROMIUM" -eq 1 ]; then
  if [ ! -d "$JUURI/node_modules/playwright" ]; then
    echo "· npm install (playwright)"
    (cd "$JUURI" && npm install --no-save --no-fund --no-audit playwright)
  fi
  KROMI="${PW_CHROMIUM:-}"
  if [ -z "$KROMI" ] || [ ! -x "$KROMI" ]; then KROMI="$(etsi_chromium)"; fi
  if [ -z "$KROMI" ]; then
    echo "· npx playwright install chromium"
    (cd "$JUURI" && npx playwright install chromium)
    KROMI="$(etsi_chromium)"
  fi
  [ -n "$KROMI" ] || { echo "::error::Chromiumia ei löydy eikä asennus tuottanut sitä"; exit 1; }
  echo "· chromium $KROMI"
fi

if [ "$FFMPEG" -eq 1 ]; then
  vaadi ffmpeg "Asenna: brew install ffmpeg"
  # Enkooderit tarkistetaan ENNEN kuin poltetaan satoja kehyksiä:
  # ilman libvpx-vp9:ää tai libx264:ää ajo kaatuisi vasta lopussa.
  if ! ffmpeg -hide_banner -encoders 2>/dev/null | grep -q 'libvpx-vp9'; then
    echo "::error::ffmpegistä puuttuu libvpx-vp9 (brew install ffmpeg)"; exit 1
  fi
  if ! ffmpeg -hide_banner -encoders 2>/dev/null | grep -q 'libx264'; then
    echo "::error::ffmpegistä puuttuu libx264 (brew install ffmpeg)"; exit 1
  fi
  echo "· ffmpeg $(ffmpeg -version 2>/dev/null | head -1 | cut -d' ' -f3)"
fi

if [ "$SHARP" -eq 1 ]; then
  echo "· npm install (sharp)"
  (cd "$JUURI" && npm install --no-save --no-fund --no-audit sharp)
fi

echo "· node $("$NODE" -v) ($NODE), aws $(aws --version 2>&1 | cut -d' ' -f1), ytimiä $YTIMET"

# GITHUB_PATHia EI käytetä (ks. NODE KIINNITETÄÄN -kohta): sen rivit
# menevät polun eteen järjestyksessä, jota tämä skripti ei hallitse.
# Koko PATH GITHUB_ENVin kautta on yksikäsitteinen ja sama kaava kuin
# polta-macilla.yml:ssä.
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "NODE=$NODE" >> "$GITHUB_ENV"
  echo "PATH=$PATH" >> "$GITHUB_ENV"
  echo "YTIMET=$YTIMET" >> "$GITHUB_ENV"
  # HUOM: ei `[ ... ] && echo` -muotoa. set -e kaataisi skriptin siihen,
  # kun ehto on epätosi eikä Chromiumia pyydetty.
  if [ "$CHROMIUM" -eq 1 ]; then echo "PW_CHROMIUM=$KROMI" >> "$GITHUB_ENV"; fi
fi
