#!/bin/zsh
# ajo-suunnat.sh <osa...>: aloitus, 3 askelta eteen, käännös vasen + 3 askelta, käännös 2x oikea + 3 askelta, arkki
source $SCRATCH/ajo.env
cd $S; mkdir -p logit11
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
for k in "$@"; do
  n0=$(wc -l < "$D/linssi-loki.txt")
  echo "$(date +%T) SUUNNAT-ALKU $k" >> ajo.log
  ./aloita.sh $k > logit11/aloita-s-$k.txt 2>&1
  fs=()
  for i in 1 2 3; do ./k.sh vv 120 900 120 800 1.5; ./k.sh kuva s11-$k-e$i; fs+=(kuvat/s11-$k-e$i.png); done
  ./k.sh vv 600 600 900 600 0.5; ./k.sh kuva s11-$k-kv; fs+=(kuvat/s11-$k-kv.png)
  for i in 1 2 3; do ./k.sh vv 120 900 120 800 1.5; ./k.sh kuva s11-$k-v$i; fs+=(kuvat/s11-$k-v$i.png); done
  ./k.sh vv 900 600 400 600 0.6; ./k.sh kuva s11-$k-ko; fs+=(kuvat/s11-$k-ko.png)
  for i in 1 2 3; do ./k.sh vv 120 900 120 800 1.5; ./k.sh kuva s11-$k-o$i; fs+=(kuvat/s11-$k-o$i.png); done
  python3 -I arkki.py kuvat/s11-$k-arkki.jpg $fs
  tail -n +$((n0+1)) "$D/linssi-loki.txt" | grep -a -E "reittipaikka|aloituspaikka|aloitussuunta" | cut -c1-200 > logit11/rivit-s-$k.txt
  echo "$(date +%T) SUUNNAT-LOPPU $k" >> ajo.log
done
echo "$(date +%T) SUUNNAT-KAIKKI" >> ajo.log
