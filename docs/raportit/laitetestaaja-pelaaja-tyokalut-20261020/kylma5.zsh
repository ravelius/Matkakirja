#!/bin/zsh
# 5 kylmäkäynnistystä: app kiinni -> käynnistys -> uusi peli -> juoksupeli -> juoksun alku ohi (OhjausPelaajalle + 10 s). Tulos kaatumisia N/5.
# Käyttö: V=<kansio> zsh kylma5.zsh   (appi asennettu)
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=${V:?}; mkdir -p $V
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
kaat=0
for i in 1 2 3 4 5; do
  L=$V/kylma-$i.txt
  pkill -f "devicectl device process launch" ; sleep 6
  xcrun devicectl device process terminate --device $U --process-identifier 0 >/dev/null 2>&1
  (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &)
  sleep 40
  laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
  ui "ui konsoli pois"
  ui "ui juoksupeli botti 1"
  ui "ui juoksupeli v4"
  t=0; until grep -a -q "avaus: OhjausPelaajalle" $L || grep -a -q "terminated due to signal\|Terminated\|EXC_\|crash" $L || (( t > 120 )); do sleep 2; (( t+=2 )); done
  sleep 12
  if grep -a -q "avaus: OhjausPelaajalle" $L && ! grep -a -q "App terminated due to signal\|terminated by signal" $L; then tulos="OK"; else tulos="KAATUI/EI PÄÄSSYT ($(grep -a -c 'terminated' $L) terminated-riviä)"; (( kaat++ )); fi
  echo "kylmäkäynnistys $i: $tulos $(date +%H.%M.%S)"
done
pkill -f "devicectl device process launch"
echo "KAATUMISIA $kaat/5"
