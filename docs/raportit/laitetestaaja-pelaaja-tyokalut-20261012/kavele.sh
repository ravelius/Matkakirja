#!/bin/zsh
# kavele.sh nimi n [kesto] [pan_x1 pan_x2]: kävelee n askelta, kuva joka askeleen jälkeen, tekee arkin
source $SCRATCH/ajo.env
cd $S
nimi=$1; n=$2; kesto=${3:-1.5}
if [[ -n $4 ]]; then ./k.sh vv $4 600 $5 600 0.4; fi
fs=()
for i in {1..$n}; do ./k.sh vv 120 900 120 800 $kesto; ./k.sh kuva $nimi-$i; fs+=(kuvat/$nimi-$i.png); done
python3 -I arkki.py kuvat/$nimi-arkki.jpg $fs
