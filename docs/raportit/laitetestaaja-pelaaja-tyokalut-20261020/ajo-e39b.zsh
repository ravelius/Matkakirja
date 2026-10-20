#!/bin/zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
APP=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-208-revontulet-yhd-e390358dd-laite/Matkakirja3D.app
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet-208; L=$V/konsoli-e39.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
lk() { laita linssi-komento.txt "$1"; sleep 2.5; }
sleep 25
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
lk "linssi raketti laukaise 0"
t=0; until grep -a -q "raketti: .*nousu\|laukaisu" $L || (( t > 30 )); do sleep 1; (( t++ )); done; sleep 3
lk "linssi raketti ohita"
t=0; until grep -a -q "raketti: cupola\|ilmakehä nollattu" $L || (( t > 300 )); do sleep 2; (( t+=2 )); done; echo "cupola t=$t $(date +%H.%M.%S)"
echo CUPOLASSA
