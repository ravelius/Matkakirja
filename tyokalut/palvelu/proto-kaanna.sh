#!/bin/zsh
# KÄÄNNÖSPALVELU (omistaja 24.9.2026 klo 22.2x, Raamattu "TYÖTAVAN NELJÄ PARANNUSTA"; Natiiviseppä).
# Kääntää proto-gitin haaran (tai useamman yhdistettynä) omassa Unity-projektikopiossaan ja asentaa .app:n
# nimettyihin simulaattoreihin. Kuka tahansa sessio saa kutsua; Natiivisepän editori ei lukitse tätä.
#
#   proto-kaanna.sh <haara|SHA>[+<haara|SHA>…] [UDID …]
#   esim. proto-kaanna.sh natiivi-ui/tyyppikuvake FB234D08-4693-4496-9C7A-6C7C15B03963
#         proto-kaanna.sh natiiviseppa/radio-mastot+natiivi-ui/radio-mastonimi 503000D1-34AC-4C42-BDF8-7E36753A87CD
#
# Kopio: /Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos = proto-gitin worktree (irrotettu HEAD), oma
# Library ja Build. Haarat näkyvät heti ilman pushia (sama git). Pohja on aina master; annetut haarat
# mergetään sen päälle (--no-ff, ei tallennu mihinkään haaraan). Jono: yksi käännös kerrallaan, seuraava odottaa
# lukkoa (/tmp/matkakirja-kaannospalvelu.lukko). Unity -batchmode -nographics.
# Vaiheet: merge → tyokalut/tarkista.sh → LuoPallo → IosSimulaattori → xcodebuild → simctl install (+ käynnistetty
# simulaattori). Loki: proto-3d/lokit/kaannospalvelu/<aika>-<nimi>.log; tulos viimeisellä rivillä:
#   KÄÄNNETTY <SHA> <haarat> → asennettu <UDID…>    tai    VIKA <vaihe>: <syy>
# Unityn luomat/täydentämät .metat kopioidaan ennen nollausta kansioon <loki>-metat/ (polut säilyvät).
# Toisten simulaattoreihin asennetaan vain niiden omistajan pyynnöstä (Raamattu, SIMULAATTORIEN OMISTUS).
setopt pipe_fail
KOPIO=/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
LOKIT=/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu
[[ $# -ge 1 ]] || { sed -n 2,17p "$0"; exit 2; }
HAARAT=$1; shift; SIMS=("$@")
mkdir -p $LOKIT
NIMI=$(print -r -- $HAARAT | tr '/+' '-_' | cut -c1-60)
LOKI=$LOKIT/$(date +%Y%m%d-%H%M%S)-$NIMI.log
vika() { print -r -- "VIKA $1" | tee -a $LOKI; exit 1; }

# Jono: odota vuoroa (enintään 60 min), sitten lukko omaksi.
oma=0
for i in {1..360}; do
  if mkdir $LUKKO 2>/dev/null; then oma=1; break; fi
  # Kaatuneen ajon lukko: prosessia ei enää ole.
  p=$(cat $LUKKO/pid 2>/dev/null); [[ -n $p ]] && ! kill -0 $p 2>/dev/null && { rm -rf $LUKKO; continue; }
  [[ $i == 1 ]] && echo "jonossa: $(cat $LUKKO/kuka 2>/dev/null)"
  sleep 10
done
(( oma )) || vika "jono: lukko ei vapautunut tunnissa ($(cat $LUKKO/kuka 2>/dev/null))"
echo $$ > $LUKKO/pid; echo "$HAARAT $(date +%H:%M)" > $LUKKO/kuka
trap "rm -rf $LUKKO" EXIT

df_g=$(df -g /Users/Shared | awk 'NR==2{print $4}')
(( df_g >= 25 )) || vika "levy: vain $df_g Gt vapaana (raja 25)"

cd $KOPIO || vika "kopio puuttuu: $KOPIO"
{
  echo "== $(date '+%d.%m. %H:%M') $HAARAT → ${SIMS[*]:-ei asennusta}"
  git merge --abort 2>/dev/null; git reset -q --hard; git clean -fdq Assets/ Packages/ ProjectSettings/
  git checkout -q --detach master || exit 11
  for h in ${(s:+:)HAARAT}; do
    git rev-parse -q --verify "$h^{commit}" >/dev/null || { echo "tuntematon haara $h"; exit 12; }
    git -c user.name=Kaannospalvelu -c user.email=kaannospalvelu@localhost merge --no-ff -q "$h" -m "Käännöspalvelu: $h" \
      || { git diff --name-only --diff-filter=U; exit 13; }
  done
  echo "pohja $(git rev-parse --short HEAD)"
  ./tyokalut/tarkista.sh || exit 14
  "$UNITY" -batchmode -nographics -quit -projectPath . -executeMethod Matkakirja.Editori.Rakennus.LuoPallo -logFile tulokset/luo.log || exit 15
  ! grep -q "error CS\|Aborting batchmode" tulokset/luo.log || { grep "error CS" tulokset/luo.log | sort -u | head; exit 15; }
  "$UNITY" -batchmode -nographics -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosSimulaattori -logFile tulokset/sim.log || exit 16
  ! grep -q "error CS\|Aborting batchmode" tulokset/sim.log || { grep "error CS" tulokset/sim.log | sort -u | head; exit 16; }
  ./aja.sh xcode-sim || exit 17
} >> $LOKI 2>&1
r=$?
SHA=$(git rev-parse --short HEAD)
case $r in
  0) ;; 11) vika "master: checkout";; 12|13) vika "merge: $(tail -3 $LOKI | tr '\n' ' ')";;
  14) vika "tarkista: $(grep -E 'error CS|virheitä' $LOKI | tail -3 | tr '\n' ' ')";;
  15) vika "luo: $(grep 'error CS' $LOKI | head -2 | tr '\n' ' ') (tulokset/luo.log)";;
  16) vika "unity-sim: $(grep 'error CS' $LOKI | head -2 | tr '\n' ' ') (tulokset/sim.log)";;
  17) vika "xcode: $(grep 'error:' $LOKI | head -2 | tr '\n' ' ')";;
  *) vika "tuntematon ($r)";;
esac
APP=$(ls -d Build/dd-sim/Build/Products/Release-iphonesimulator/*.app | head -1)
ok=()
# simctl install vaatii käynnissä olevan simulaattorin. Asennuksen jälkeen sammutetaan ne, jotka eivät olleet käynnissä
# ennen ajoa (Fable 25.9. klo 10.2x: käännösvahti jätti 8 simulaattoria muistiin); käynnissä olleet jäävät ennalleen.
kaynnissa=(${(f)"$(xcrun simctl list devices booted | grep -oE '[0-9A-F]{8}-[0-9A-F-]{27}')"})
for s in $SIMS; do
  xcrun simctl boot $s 2>/dev/null
  xcrun simctl install $s "$APP" >> $LOKI 2>&1 && ok+=($s) || echo "asennus epäonnistui: $s" | tee -a $LOKI
  if (( ! ${kaynnissa[(Ie)$s]} )); then xcrun simctl shutdown $s 2>/dev/null; echo "sammutettu: $s" >> $LOKI; fi
done
# Unityn luomat tai täydentämät .metat talteen ennen nollausta (kirjoittaja commitoi ne omaan haaraansa).
METAT=${LOKI%.log}-metat
for f in ${(f)"$(git status --porcelain --untracked-files=all | awk '{print $2}' | grep '\.meta$')"}; do
  mkdir -p $METAT/${f:h}; cp "$f" $METAT/$f
done
[[ -d $METAT ]] && echo "metat talteen: $METAT" | tee -a $LOKI
# Kopio takaisin puhtaaksi masteriksi (Library ja Build säilyvät).
git reset -q --hard; git clean -fdq Assets/ Packages/ ProjectSettings/; git checkout -q --detach master
print -r -- "KÄÄNNETTY $SHA $HAARAT → asennettu ${ok[*]:-–} ($(date +%H:%M), loki $LOKI)" | tee -a $LOKI
