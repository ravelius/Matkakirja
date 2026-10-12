#!/bin/zsh
# kierre.sh <osa...>: aloitus, 3 askelta, käännös oikealle, 4 askelta, arkki
source $SCRATCH/ajo.env
cd $S
for k in "$@"; do
  echo "$(date +%T) KIERRE-ALKU $k" >> ajo.log
  ./aloita.sh $k > logit9/kierre-aloita-$k.txt 2>&1
  fs=()
  for i in 1 2 3; do ./k.sh vv 120 900 120 800 1.5; ./k.sh kuva kr-$k-$i; fs+=(kuvat/kr-$k-$i.png); done
  ./k.sh vv 900 600 600 600 0.5; ./k.sh kuva kr-$k-k; fs+=(kuvat/kr-$k-k.png)
  for i in 4 5 6 7; do ./k.sh vv 120 900 120 800 1.5; ./k.sh kuva kr-$k-$i; fs+=(kuvat/kr-$k-$i.png); done
  python3 -I arkki.py kuvat/kr-$k-arkki.jpg $fs
  echo "$(date +%T) KIERRE-LOPPU $k" >> ajo.log
done
echo "$(date +%T) KIERRE-KAIKKI" >> ajo.log
