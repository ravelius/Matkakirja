#!/bin/zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=${V:?}; L=$V/konsoli.txt
S=$S/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
kuva() { laita komento.txt "kuva $1"; sleep 3.5; hae $V/$1.png $1.png; }
sleep 25
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
ui "ui juoksupeli v4"
echo "juoksu alkoi $(date +%H.%M.%S)"
t=0; until grep -a -q "juoksupeli: maali\|loppukortti\|tuloskortti\|juoksu päättyi" $L || (( t > 420 )); do sleep 3; (( t+=3 )); done
echo "maali/loppu-rivi t=$t $(date +%H.%M.%S)"; grep -a "juoksupeli: maali\|loppukortti\|tuloskortti\|juoksu päättyi" $L | head -3 | cut -c1-160
txt=""; for k in $(seq 1 24); do txt="${txt}kuva Maali-pysty-$k
odota 1
"; done
laita komento.txt "$txt"; sleep 70; for k in $(seq 1 24); do hae $V/Maali-pysty-$k.png Maali-pysty-$k.png; done
grep -a "loppukortti" $L | head -2 | cut -c1-160
echo "YO33 VALMIS $(date +%H.%M)"
