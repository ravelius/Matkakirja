#!/bin/zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
APP=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-208-revontulet-c4afeb850-laite/Matkakirja3D.app
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet-208; L=$V/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
kuva() { laita komento.txt "kuva $1"; sleep 3.5; hae $V/$1.png $1.png; }
mittaa() { n=$1; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota 10
mittaus loppu"; ui "ui lasi mittaa 10 $n"; sleep 13; hae $V/mittaus-$n.txt mittaus-$n.txt; }
astro() { ui "ui linssi astro kyyti $1"; }
laita muisti-tarkka.txt 1000
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui linssi linssi raketti laukaise 0"
t=0; until grep -a -q "laukaisu alkoi" $L || (( t > 60 )); do sleep 1; (( t++ )); done; echo "laukaisu alkoi t=$t"
ui "ui linssi linssi raketti ohita"
t=0; until grep -a -q "raketti: cupola\|ilmakehä nollattu" $L || (( t > 300 )); do sleep 2; (( t+=2 )); done; echo "cupola t=$t $(date +%H.%M.%S)"
sleep 10
astro "revontulet kp6"; astro "revontulet iss"; sleep 16
astro "revontulet tila"; sleep 1
mittaa R5
astro "revontulet _Elava=0"; astro "linnunrata revontulet 1"; sleep 4; mittaa V4
astro "revontulet _Elava=1"; astro "linnunrata revontulet 0.45"; sleep 4; mittaa R5b
astro "revontulet _Elava=0"; astro "linnunrata revontulet 1"; sleep 4; kuva V4
astro "revontulet _Elava=1"; astro "linnunrata revontulet 0.45"; sleep 4; kuva R5
laita komento.txt "kuva R5-t0
odota 3
kuva R5-t3
odota 3
kuva R5-t6
odota 3
kuva R5-t9
odota 2"
sleep 25
for k in t0 t3 t6 t9; do hae $V/R5-$k.png R5-$k.png; done
echo "REV VALMIS $(date +%H.%M)"
