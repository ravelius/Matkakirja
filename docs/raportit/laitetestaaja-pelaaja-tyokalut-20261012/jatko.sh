#!/bin/zsh
# jatko.sh <kohta>: aloitus, 10 s, Sulje linna, Pelit>Keskeneräiset>Olavinlinna>Jatka, loki, 4 askelta
source $SCRATCH/ajo.env
cd $S
sl() { python3 -c "import time; time.sleep($1)"; }
k=$1
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
echo "$(date +%T) JATKO-ALKU $k" >> ajo.log
./aloita.sh $k > logit9/jatko-aloita-$k.txt 2>&1
sl 10
./k.sh tv 1346 38; sl 3
./k.sh tt "Sulje linna" || { echo "EI Sulje linna" >> ajo.log; }
sl 8
./k.sh komento ui-komento.txt "ui kierto vaaka"; sl 6
./k.sh tv 500 300; sl 2
for t in 1 2 3; do ./k.sh tt mk-linssitNappi; sl 3; ./k.sh tt "PELIT" && break; ./k.sh tv 500 300; sl 2; done
sl 2
./k.sh tt "Olavinlinna"
ok=""; for i in {1..60}; do ./k.sh puu lista 2>/dev/null | grep -q -E "Jatka|Pelaa" && { ok=1; break; }; sl 3; done
./k.sh puu lista | grep -E "mk-kortti|mk-nappi__teksti" > logit9/jatko-kortti-$k.txt
./k.sh kuva j9-$k-kortti
n0=$(wc -l < "$D/linssi-loki.txt")
if grep -q "Jatka" logit9/jatko-kortti-$k.txt; then
  ./k.sh tt "Jatka"; sl 50
  tail -n +$((n0+1)) "$D/linssi-loki.txt" | grep -a -E "jatko|aloitus|tallenn" | cut -c1-200 > logit9/jatko-loki-$k.txt
  ./kavele.sh j9-$k 4 1.5 >> ajo.log 2>&1
  echo "$(date +%T) JATKO-LOPPU $k" >> ajo.log
else
  echo "$(date +%T) JATKO-EI-TARJOLLA $k" >> ajo.log
fi
