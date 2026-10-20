#!/bin/zsh
# kangas-ENNEN: c4afeb850
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
APP=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-208-revontulet-c4afeb850-laite/Matkakirja3D.app
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet-208; L=$V/konsoli-c4kangas.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
lk() { laita linssi-komento.txt "$1"; sleep 3; }
xcrun devicectl device install app --device $U $APP > $V/asennus-c4.log 2>&1
sleep 10
xcrun devicectl device process launch --device $U --terminate-existing $B >/dev/null 2>&1; sleep 8
pkill -f "devicectl device process launch"; sleep 8
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"; sleep 3
lk "museo maa ranska"; lk "museo elama 0"; lk "linssi taidemuseo"; sleep 16; lk "museo lahestyminen nappi"; sleep 12
ui "ui napautaklik 575 498"; sleep 2
ui "ui napautaklik 221 404"; t=0; until grep -a -q "museo: saapui" $L || (( t > 90 )); do sleep 2; (( t+=2 )); done; echo saapui t=$t; sleep 2
lk "museo autozoom 0"; lk "museo teos louvre-inv-71"; t=0; until grep -a -q "louvre-inv-71 katseluasento" $L || (( t > 40 )); do sleep 2; (( t+=2 )); done; echo katselu t=$t; sleep 4
laita komento.txt "kuva kangas-ENNEN"; sleep 4
xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/kangas-ENNEN.png --destination $V/kangas-ENNEN.png >/dev/null 2>&1
echo "KANGAS VALMIS $(date +%H.%M)"
