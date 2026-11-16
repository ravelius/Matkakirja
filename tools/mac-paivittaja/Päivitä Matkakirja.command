#!/bin/zsh
# Päivitä Matkakirja (Mac): hakee uusimman Mac-version asennussivulta, korvaa vanhan Ohjelmat-kansiossa,
# siivoaa levykuvan ja lataustiedoston ja avaa pelin. Ei salasanaa, ei taustapäivitystä.
# Omistaja 16.11.2026 klo 17.07 (KK:n tehtävä, PT); JU teki. Testiin: MATKAKIRJA_KOHDE=<kansio> ohittaa /Applications-kansion.
# Testiin myös MATKAKIRJA_LATAUKSET ja MATKAKIRJA_ROSKA (oletus ~/Downloads ja ~/.Trash), MATKAKIRJA_LOKI.
emulate -L zsh; setopt no_unset pipe_fail
OSOITE=${MATKAKIRJA_OSOITE:-https://samimacstudio2.tail9af251.ts.net}
KOHDE=${MATKAKIRJA_KOHDE:-/Applications}; APP=$KOHDE/Matkakirja.app; TUNNUS=app.matkakirja.proto3d
LATAUKSET=${MATKAKIRJA_LATAUKSET:-$HOME/Downloads}; ROSKA=${MATKAKIRJA_ROSKA:-$HOME/.Trash}
LOKI=${MATKAKIRJA_LOKI:-$HOME/Library/Logs/Matkakirja-paivitys.log}; mkdir -p ${LOKI:h}
sano() { print -r -- "$*"; print -r -- "$(date '+%d.%m. %H.%M.%S') $*" >> $LOKI }
loppu() { print; print "Ikkunan voi sulkea."; exit ${1:-0} }
TMP=""; M=""
siivoa() { [[ -n $M ]] && hdiutil detach -quiet "$M" 2>/dev/null; [[ -n $TMP ]] && rm -rf "$TMP" }
trap siivoa EXIT

sano "Matkakirjan päivitys alkaa ($APP)."
UUSI=$(curl -fsS --max-time 20 "$OSOITE/Matkakirja-mac.versio?t=$(date +%s)" | tr -d '[:space:]') \
  || { sano "Asennussivuun ei saatu yhteyttä. Kokeile hetken päästä uudelleen."; loppu 1; }
[[ $UUSI == 224.* ]] || { sano "Asennussivulla ei ole nyt Mac-versiota ($UUSI)."; loppu 1; }
VANHA=""; [[ -f $APP/Contents/Info.plist ]] && VANHA=$(defaults read "$APP/Contents/Info.plist" CFBundleVersion 2>/dev/null)

# Vanhat käsin ladatut levykuvat Lataukset-kansiosta roskakoriin (vain Matkakirja-mac*.dmg)
for f in $LATAUKSET/Matkakirja-mac*.dmg(N); do mv "$f" $ROSKA/ 2>/dev/null && sano "Siivottu Latauksista: ${f:t}"; done

if [[ $VANHA == $UUSI ]]; then
  sano "Matkakirja on ajan tasalla ($UUSI). Avataan peli."
  open "$APP"; loppu 0
fi
sano "Asennettu: ${VANHA:-ei asennettu}  →  uusi: $UUSI. Ladataan…"

TMP=$(mktemp -d "${TMPDIR:-/tmp}/matkakirja-paivitys.XXXXXX")
curl -f --progress-bar --max-time 1800 -o "$TMP/Matkakirja-mac.dmg" "$OSOITE/Matkakirja-mac.dmg" \
  || { sano "Lataus katkesi. Mitään ei muutettu; kokeile uudelleen."; loppu 1; }
M=$(hdiutil attach -nobrowse -noautoopen -readonly "$TMP/Matkakirja-mac.dmg" | awk -F'\t' '/\/Volumes\//{print $NF}' | tail -1)
[[ -n $M && -d $M/Matkakirja.app ]] || { sano "Levykuvan avaus epäonnistui. Mitään ei muutettu."; loppu 1; }
LV=$(defaults read "$M/Matkakirja.app/Contents/Info.plist" CFBundleVersion 2>/dev/null)
codesign --verify --deep --strict "$M/Matkakirja.app" 2>/dev/null || { sano "Uuden version allekirjoitus ei kelpaa. Mitään ei muutettu."; loppu 1; }

# Käynnissä oleva Matkakirja kiinni
if pgrep -f "$APP/Contents/MacOS/" >/dev/null; then
  sano "Suljetaan käynnissä oleva Matkakirja…"
  osascript -e "tell application id \"$TUNNUS\" to quit" >/dev/null 2>&1
  for i in {1..20}; do pgrep -f "$APP/Contents/MacOS/" >/dev/null || break; sleep 0.5; done
  for p in $(pgrep -f "$APP/Contents/MacOS/"); do kill $p 2>/dev/null; done; sleep 1
fi

# Korvaus: kopio viereen, sitten vaihto (vanha jää, jos kopio epäonnistuu)
if [[ -e $APP && ! -w $APP ]] || [[ ! -w $KOHDE ]]; then
  sano "Ohjelmat-kansion Matkakirjaa ei voi korvata ilman salasanaa. Vedä Matkakirja.app roskakoriin kerran ja aja päivitys uudelleen."; loppu 1
fi
rm -rf "$APP.uusi"
ditto "$M/Matkakirja.app" "$APP.uusi" || { rm -rf "$APP.uusi"; sano "Kopiointi epäonnistui (levy täynnä?). Vanha versio jäi ennalleen."; loppu 1; }
rm -rf "$APP" && mv "$APP.uusi" "$APP" || { sano "Vaihto epäonnistui."; loppu 1; }
hdiutil detach -quiet "$M" && M=""
rm -rf "$TMP"; TMP=""
sano "Valmis: Matkakirja ${LV:-$UUSI} asennettu, levykuva irrotettu ja lataus poistettu. Avataan peli."
open "$APP"
loppu 0
