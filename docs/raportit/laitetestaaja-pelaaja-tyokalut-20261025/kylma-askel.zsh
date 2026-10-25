#!/bin/zsh
# yksi kylmäkäynnistyksen askel (app jo käynnistetty --console -> $L). Args: i V
i=$1; V=$2; L=$V/kylma-$i.txt
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
S=$S/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
sleep 25
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois"
ui "ui juoksupeli botti 1"
ui "ui juoksupeli v4"
t=0; until grep -a -q "avaus: OhjausPelaajalle" $L || grep -a -q "terminated due to signal" $L || (( t > 120 )); do sleep 2; (( t+=2 )); done
sleep 12
if grep -a -q "avaus: OhjausPelaajalle" $L && ! grep -a -q "App terminated due to signal" $L; then echo "kylmäkäynnistys $i: OK $(date +%H.%M.%S)"; else echo "kylmäkäynnistys $i: KAATUI/EI PÄÄSSYT $(date +%H.%M.%S)"; fi
