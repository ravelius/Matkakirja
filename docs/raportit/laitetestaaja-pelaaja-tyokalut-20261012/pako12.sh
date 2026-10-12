#!/bin/zsh
source $SCRATCH/ajo.env
cd $S
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
./aloita.sh pako > logit12/aloita-pako.txt 2>&1
./k.sh kuva p12-0
n0=$(wc -l < "$D/linssi-loki.txt")
./k.sh tv 1322 872
fs=(kuvat/p12-0.png)
for i in {1..14}; do python3 -c 'import time; time.sleep(20)'; ./k.sh kuva p12-$i; fs+=(kuvat/p12-$i.png); done
tail -n +$((n0+1)) "$D/linssi-loki.txt" | grep -a -E "köysi|koysi|lasku|ulos|vene|pako|laituri|KIINNI|valmis" | cut -c1-170 > logit12/rivit-pako.txt
python3 -I arkki.py kuvat/p12-arkki.jpg $fs
echo "$(date +%T) PAKO-KAIKKI" >> ajo.log
