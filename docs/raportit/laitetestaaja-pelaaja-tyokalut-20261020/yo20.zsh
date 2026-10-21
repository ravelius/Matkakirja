#!/bin/zsh
# kierros19: autopilotti-ajo (avaus ~40 s + >=130 s juoksu, ei kosketusta) + varjojen GPU. Konsoli kiinnitetty ennen ajoa.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/kierros19; L=$V/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $V/mittaus-$n.txt mittaus-$n.txt; }
sleep 20
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
n0=$(grep -a -c "avaus: LentoAlkaa" $L)
ui "ui juoksupeli v4"
t=0; until (( $(grep -a -c "avaus: LentoAlkaa" $L) > n0 )) || (( t > 90 )); do sleep 1; (( t++ )); done; echo "lento alkaa t=$t $(date +%H.%M.%S)"
mittaa JA 150
echo "autopilotti-ajo päättyi $(date +%H.%M.%S)"
grep -a "juoksupeli mittari" $L > $V/mittari-rivit.txt; wc -l < $V/mittari-rivit.txt
ui "ui juoksupeli uudestaan 777"; sleep 11.5
ui "ui juoksupeli valo jaady 1"; sleep 2
mittaa A
ui "ui juoksupeli valo jaady 0"
mittaa J 25
echo "YO20 VALMIS $(date +%H.%M)"
