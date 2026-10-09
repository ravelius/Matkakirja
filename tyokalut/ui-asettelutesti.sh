#!/bin/zsh
# UITK-ASETTELUTESTI (Päätoimittaja 9.10.2026, Natiivi-UI): Assets/Matkakirja/Editor/AsetteluTesti.cs käännöspalvelun kopiossa
# (Unity tarvitsee Libraryn; omissa työpuissa sitä ei ole). Sama lukko kuin proto-kaanna.sh:lla (käännökset ja tämä vuorotellen,
# junan käännös aina edellä: tämä odottaa lukkoa), sama pohja: master + annetut haarat mergettynä irrotettuun HEADiin.
#
#   tyokalut/ui-asettelutesti.sh <haara|SHA>[+<haara|SHA>…]
#
# Unity -batchmode (ilman -nographicsia: paneelit piirtyvät laitteen kokoiseen tekstuuriin, kuten KoriKoosteTesti) -executeMethod
# Matkakirja.Editori.AsetteluTesti.Aja; testi lopettaa Unityn itse (EditorApplication.Exit). Aikaraja 20 min.
# Tulos: viimeinen rivi "ASETTELUTESTI LÄPI" tai "ASETTELUTESTI n VIKAA" (+ VIKA-rivit), koko loki proto-3d/lokit/asettelutesti/.
setopt pipe_fail
KOPIO=/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
LOKIT=/Users/Shared/Claude/proto-3d/lokit/asettelutesti
[[ $# -ge 1 ]] || { sed -n 2,11p "$0"; exit 2; }
HAARAT=$1
mkdir -p $LOKIT
LOKI=$LOKIT/$(date +%Y%m%d-%H%M%S)-$(print -r -- $HAARAT | tr '/+' '-_' | cut -c1-60).log
vika() { print -r -- "VIKA $1" | tee -a $LOKI; exit 1; }

oma=0
for i in {1..360}; do
  if mkdir $LUKKO 2>/dev/null; then oma=1; break; fi
  p=$(cat $LUKKO/pid 2>/dev/null); [[ -n $p ]] && ! kill -0 $p 2>/dev/null && { rm -rf $LUKKO; continue; }
  [[ $i == 1 ]] && echo "jonossa: $(cat $LUKKO/kuka 2>/dev/null)"
  sleep 10
done
(( oma )) || vika "jono: lukko ei vapautunut tunnissa"
echo $$ > $LUKKO/pid; echo "asettelutesti $HAARAT $(date +%H:%M)" > $LUKKO/kuka
cd /
TMPDIR=$(mktemp -d /tmp/mka.XXXXXX) && export TMPDIR
source /Users/Shared/Claude/proto-3d/tyokalut/burst-jit.sh && burst_jit_pois
trap "burst_jit_palauta; rm -rf $LUKKO $TMPDIR" EXIT

cd $KOPIO || vika "kopio puuttuu: $KOPIO"
{
  echo "== $(date '+%d.%m. %H:%M') asettelutesti $HAARAT"
  git merge --abort 2>/dev/null; git reset -q --hard; git clean -fdq Assets/ Packages/ ProjectSettings/
  git checkout -q --detach master || vika "checkout master"
  for h in ${(s:+:)HAARAT}; do
    git rev-parse -q --verify "$h^{commit}" >/dev/null || vika "tuntematon haara $h"
    git -c user.name=Kaannospalvelu -c user.email=kaannospalvelu@localhost merge --no-ff -q "$h" -m "Asettelutesti: $h" || vika "merge $h"
  done
  echo "pohja $(git rev-parse --short HEAD)"
} >> $LOKI 2>&1
rm -f tulokset/asettelutesti.txt
UNITY_BURST_DISABLE_COMPILATION=1 "$UNITY" -batchmode -projectPath . -executeMethod Matkakirja.Editori.AsetteluTesti.Aja \
  -logFile tulokset/asettelutesti-unity.log &
upid=$!
for s in {1..1200}; do kill -0 $upid 2>/dev/null || break; sleep 1; done
kill -0 $upid 2>/dev/null && { kill $upid; sleep 5; kill -9 $upid 2>/dev/null; vika "aikaraja 20 min (loki tulokset/asettelutesti-unity.log)"; }
wait $upid; koodi=$?
cp tulokset/asettelutesti-unity.log $LOKI.unity.log 2>/dev/null
grep "error CS" tulokset/asettelutesti-unity.log | sort -u | head >> $LOKI
[[ -f tulokset/asettelutesti.txt ]] || vika "tulosta ei syntynyt (exit $koodi; $(grep -m1 'error CS\|Aborting\|Exception' tulokset/asettelutesti-unity.log))"
cat tulokset/asettelutesti.txt >> $LOKI
grep "^VIKA\|ASETTELUTESTI" tulokset/asettelutesti.txt
echo "loki $LOKI"
exit $koodi
