#!/bin/bash
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko
V1=$K/kierros34; V2=$K/kierros34-maali; V3=$K/kylma5-kierros34; mkdir -p $V1 $V2 $V3
launch() { pkill -f "device process launch"; sleep 8; (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $1 2>&1 &); sleep 15; }
launch $V1/konsoli.txt
V=$V1 zsh $S/yo30.zsh > $S/ketju34-yo30.out 2>&1
grep -a "hyppysuoja pehmensi\|KAMERAHYPPY\|KÄÄNNÖSNYKÄYS" $V1/konsoli.txt > $V1/hyppysuoja-rivit.txt
launch $V2/konsoli.txt
V=$V2 zsh $S/yo34.zsh > $S/ketju34-maali.out 2>&1
for i in 1 2 3 4 5; do
  pkill -f "device process launch"; sleep 8
  (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $V3/kylma-$i.txt 2>&1 &)
  sleep 12
  grep -a -q "Built from" $V3/kylma-$i.txt || { echo "kylmäkäynnistys $i: konsoli ei kiinnittynyt" >> $S/ketju34-kylma.out; continue; }
  zsh $S/kylma-askel.zsh $i $V3 >> $S/ketju34-kylma.out 2>&1
done
pkill -f "device process launch"
echo "KETJU31 VALMIS $(date +%H.%M)" > $S/ketju34.done
