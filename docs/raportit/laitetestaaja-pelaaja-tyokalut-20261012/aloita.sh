#!/bin/zsh
# aloita.sh <kohta>: lähettää aloituskomennon ja odottaa valmis-rivin, kuva
source $SCRATCH/ajo.env
cd $S
D="$(xcrun simctl --set '/Volumes/T7 4TB/Simulaattorit/Sarja' get_app_container $U app.matkakirja.proto3d data)/Documents"
k=$1
N=$(grep -c "aloitus $k valmis" "$D/linssi-loki.txt")
./k.sh komento linssi-komento.txt "poikki seikkailu aloitus $k"
for i in {1..80}; do
  [[ $(grep -c "aloitus $k valmis" "$D/linssi-loki.txt") -gt $N ]] && break
  grep -q "aloitus $k ei onnistu" <(tail -3 "$D/linssi-loki.txt") && { echo "EI ONNISTU"; break; }
  python3 -c 'import time; time.sleep(2)'
done
python3 -c 'import time; time.sleep(4)'
./k.sh kuva v12-a-$k
grep "aloitus $k" "$D/linssi-loki.txt" | tail -1 | cut -c1-120
