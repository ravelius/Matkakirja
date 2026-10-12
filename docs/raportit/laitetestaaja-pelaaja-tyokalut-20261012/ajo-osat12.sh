#!/bin/zsh
# ajo-osat10.sh <osa...>: aloitus + 8 askelta eteen + loki-ote (reittipaikka, vapaus)
source $SCRATCH/ajo.env
cd $S; mkdir -p logit12
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
for k in "$@"; do
  n0=$(wc -l < "$D/linssi-loki.txt")
  echo "$(date +%T) ALKU $k" >> ajo.log
  ./aloita.sh $k > logit12/aloita-$k.txt 2>&1
  ./kavele.sh v12-$k 8 1.5 >> ajo.log 2>&1
  tail -n +$((n0+1)) "$D/linssi-loki.txt" > logit12/loki-$k.txt
  grep -a -E "reittipaikka|aloituspaikka|aloitussuunta" logit12/loki-$k.txt | cut -c1-200 > logit12/rivit-$k.txt
  echo "$(date +%T) LOPPU $k" >> ajo.log
done
echo "$(date +%T) KAIKKI" >> ajo.log
