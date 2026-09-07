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
#   (ilman lippuja)  node ≥ 22 ja awscli polkuun, ytimet YTIMET-muuttujaan
#   --chromium       Playwrightin Chromium (asennetaan jos puuttuu) → PW_CHROMIUM
#   --ffmpeg         ffmpeg ja sen VP9/H.264-enkooderit
#   --sharp          npm install --no-save sharp (kuvankäsittely)
#
# Skripti KIRJOITTAA GITHUB_ENV- ja GITHUB_PATH-tiedostoihin, jos ne
# ovat olemassa; muuten se vain tulostaa löydökset, joten sen voi ajaa
# myös käsin Macilla tarkistuksena.
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

# Homebrewin node@22 ei ole polussa oletuksena (keg-only).
export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

vaadi () {
  command -v "$1" >/dev/null 2>&1 || {
    echo "::error::$1 puuttuu Macin polusta. $2"; exit 1; }
}

vaadi node "Asenna: brew install node@22"
vaadi aws "Asenna: brew install awscli"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
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

echo "· node $(node -v), aws $(aws --version 2>&1 | cut -d' ' -f1), ytimiä $YTIMET"

if [ -n "${GITHUB_PATH:-}" ]; then
  printf '%s\n' "/opt/homebrew/opt/node@22/bin" "/opt/homebrew/bin" >> "$GITHUB_PATH"
fi
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "YTIMET=$YTIMET" >> "$GITHUB_ENV"
  # HUOM: ei `[ ... ] && echo` -muotoa. set -e kaataisi skriptin siihen,
  # kun ehto on epätosi eikä Chromiumia pyydetty.
  if [ "$CHROMIUM" -eq 1 ]; then echo "PW_CHROMIUM=$KROMI" >> "$GITHUB_ENV"; fi
fi
