#!/bin/zsh
# NATIIVI MAC -KÄÄNNÖS (omistaja 6.10.2026: "tehdään seuraavaksi natiivi mac appi … vain joka kolmas tai tarpeen mukaan";
# Natiiviseppä). Kääntää proto-gitin SHA:n macOS-sovellukseksi omassa projektikopiossaan:
#
#   mac-kaanna.sh <haara|SHA> [versio] [build]      esim. mac-kaanna.sh juna/b13 1.1.0 147
#
# Kopio: /Users/Shared/Claude/proto-3d/Matkakirja-proto-mac = proto-gitin worktree (irrotettu HEAD) + oma Library.
# EI käännöspalvelun iOS-kopiota: -buildTarget StandaloneOSX tuo assetit uudelleen Macin muodoille (tekstuurit BC/DXT),
# ja paluu iOS:ään toistaisi saman. Ensimmäinen ajo kloonaa pääkopion Libraryn (APFS cp -c) ja tuo assetit (pitkä),
# seuraavat vain muuttuneet. Jono ja lukko samat kuin käännöspalvelulla (/tmp/matkakirja-kaannospalvelu.lukko):
# yksi Unity-käännös kerrallaan koko Macilla, ja ajo vain Julkaisijan KÄÄNNÖS NYT -luvalla.
# Vaiheet: checkout → LuoPallo → Rakennus.MacOS → tarkistus (.app, kaannos.txt). Allekirjoitus ja lähetys erikseen.
# Loki: proto-3d/lokit/kaannospalvelu/<aika>-mac-<nimi>.log; tulos viimeisellä rivillä:
#   KÄÄNNETTY-MAC <käännös> <SHA> → <.app>    tai    VIKA <vaihe>: <syy>
setopt pipe_fail
PAA=/Users/Shared/Claude/proto-3d/Matkakirja-proto
KOPIO=/Users/Shared/Claude/proto-3d/Matkakirja-proto-mac
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
LOKIT=/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu
[[ $# -ge 1 ]] || { sed -n 2,13p "$0"; exit 2; }
REF=$1; VERSIO=${2:-0.1.0}; BUILD=${3:-1}
mkdir -p $LOKIT
NIMI=$(print -r -- $REF | tr '/+' '-_' | cut -c1-50)
LOKI=$LOKIT/$(date +%Y%m%d-%H%M%S)-mac-$NIMI.log
vika() { print -r -- "VIKA $1" | tee -a $LOKI; exit 1; }
SHA=$(git -C $PAA rev-parse --verify --short=8 "$REF^{commit}" 2>/dev/null) || vika "ref: $REF ei ole proto-gitissä"

# Levy: Mac-kopion ensimmäinen tuonti kirjoittaa Libraryyn useita gigatavuja.
VAPAA=$(df -g /Users/Shared | awk 'NR==2 {print $4}')
(( VAPAA >= 30 )) || vika "levy: vapaana $VAPAA Gi < 30 Gi"

oma=0
for i in {1..360}; do
  if mkdir $LUKKO 2>/dev/null; then oma=1; break; fi
  p=$(cat $LUKKO/pid 2>/dev/null); [[ -n $p ]] && ! kill -0 $p 2>/dev/null && { rm -rf $LUKKO; continue; }
  [[ $i == 1 ]] && echo "jonossa: $(cat $LUKKO/kuka 2>/dev/null)"
  sleep 10
done
(( oma )) || vika "jono: lukko ei vapautunut tunnissa ($(cat $LUKKO/kuka 2>/dev/null))"
echo $$ > $LUKKO/pid; echo "mac $REF $(date +%H:%M)" > $LUKKO/kuka
trap "rm -rf $LUKKO" EXIT
cd /

if [[ ! -d $KOPIO ]]; then
  echo "$(date +%T) kopio: worktree + Library-klooni" >> $LOKI
  git -C $PAA worktree add -q --detach $KOPIO $SHA >> $LOKI 2>&1 || vika "kopio: worktree"
  cp -c -R $PAA/Library $KOPIO/Library >> $LOKI 2>&1 || vika "kopio: Library-klooni"
  rm -f $KOPIO/Library/*.lock $KOPIO/Temp/UnityLockfile 2>/dev/null
else
  git -C $KOPIO reset -q --hard >> $LOKI 2>&1; git -C $KOPIO clean -q -fd Assets >> $LOKI 2>&1
  git -C $KOPIO checkout -q --detach $SHA >> $LOKI 2>&1 || vika "checkout $SHA"
fi
mkdir -p $KOPIO/tulokset
# Laattapaketti ja sisällön tilannekuva pääkopion Buildista (APFS-klooni), ettei Varmista lataa niitä ämpäristä uudelleen.
for k in laattapaketti tilannekuva; do
  [[ -d $PAA/Build/$k && ! -d $KOPIO/Build/$k ]] && { mkdir -p $KOPIO/Build; cp -c -R $PAA/Build/$k $KOPIO/Build/$k; }
done
echo "$(date +%T) $REF = $SHA, versio $VERSIO ($BUILD)" >> $LOKI
# Burstin Mac-työkaluilta puuttuu suoritusbitti jaetussa pakettivälimuistissa (6.10.2026: burst-lld-21-hostmac,
# hostmac/llvm-lipo, hostmac/dsymutil -rw-r--r--; iOS ei linkitä Burstia dylibiksi, joten vika näkyy vain Macilla:
# "AotLinkerException: Non 0 exit code", lld:n oma virhe on "permission denied"). Palautetaan ennen jokaista käännöstä.
for r in $KOPIO/Library/PackageCache/com.unity.burst@*/.Runtime(N); do
  find $r -type f ! -perm -u+x -exec sh -c 'file -b "$1" | grep -q "Mach-O.*executable" && chmod +x "$1" && echo "suoritusbitti: $1"' _ {} \; >> $LOKI
done

export MATKAKIRJA_KANSIO=Build/mac MATKAKIRJA_VERSIO=$VERSIO MATKAKIRJA_BUILD=$BUILD
cd $KOPIO
UNITY_BURST_DISABLE_COMPILATION=1 nice -n 15 "$UNITY" -batchmode -nographics -quit -projectPath . -buildTarget StandaloneOSX \
  -executeMethod Matkakirja.Editori.Rakennus.LuoPallo -logFile tulokset/mac-luo.log || vika "LuoPallo (tulokset/mac-luo.log)"
echo "$(date +%T) LuoPallo valmis" >> $LOKI
nice -n 15 "$UNITY" -batchmode -nographics -quit -projectPath . -buildTarget StandaloneOSX \
  -executeMethod Matkakirja.Editori.Rakennus.MacOS -logFile tulokset/mac.log || vika "MacOS (tulokset/mac.log)"
grep "MATKAKIRJA: " tulokset/mac.log | tail -4 >> $LOKI

APP="$KOPIO/Build/mac/Matkakirja 3D.app"
[[ -d $APP ]] || vika "tarkistus: .app puuttuu ($APP)"
K=$(cat "$APP/Contents/Resources/Data/StreamingAssets/kaannos.txt" 2>/dev/null)
[[ -n $K ]] || vika "tarkistus: kaannos.txt puuttuu .app:sta"
echo "$(date +%T) $(du -sh "$APP" | cut -f1) $(lipo -archs "$APP/Contents/MacOS/"* 2>/dev/null | head -1)" >> $LOKI
print -r -- "KÄÄNNETTY-MAC $K $SHA → $APP" | tee -a $LOKI
