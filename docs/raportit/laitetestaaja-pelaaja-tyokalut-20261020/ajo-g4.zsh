#!/bin/zsh
# LT 20.10.: VS:n GPU-kierros 4, app e35e43ee0 (jo asennettu hehku-ajossa), siemen 777 jäädytetty ~14 s, täysi resoluutio, MSAA 4.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko; L=$K/lt-gpu-konsoli-g4.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$1.txt --destination $K/lt-gpu-mittaus-$1.txt >/dev/null 2>&1; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $n; }
gpu() { grep -a "ruutuaika $1 " $L | sed -E 's/.*GPU ([0-9,]+) ms.*/\1/' | tr ',' '.' | tail -1; }
laita muisti-tarkka.txt 1000
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
KP=$!
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1
ui juoksupeli v4"
sleep 25
ui "ui juoksupeli uudestaan 777"; sleep 12
ui "ui juoksupeli valo jaady 1"; sleep 2
ui "ui juoksupeli valo tila"; sleep 1
mittaa G4-A
ui "ui juoksupeli valo sumea 0"; mittaa G4-S; ui "ui juoksupeli valo sumea 1"
ui "ui juoksupeli valo mv 0"; mittaa G4-V; ui "ui juoksupeli valo mv 1"
ui "ui juoksupeli valo liike kamera"; mittaa G4-K; ui "ui juoksupeli valo liike kappaleet"
ui "ui juoksupeli valo hehku 0"; mittaa G4-H0; ui "ui juoksupeli valo hehku 1"
mittaa G4-A2
ui "ui juoksupeli valo jaady 0"
v=$(gpu G4-V); k=$(gpu G4-K)
if (( ${v:-99} <= 14 )); then P="valo mv 0"; elif (( ${k:-99} <= 14 )); then P="valo liike kamera"; else P="valo sumea 0"; fi
echo "J parhaalla: $P"
ui "ui juoksupeli $P"; mittaa G4-J 25
ui "ui juoksupeli valo mv 1
ui juoksupeli valo liike kappaleet
ui juoksupeli valo sumea 1"
echo "G4 VALMIS $(date +%H.%M)"
