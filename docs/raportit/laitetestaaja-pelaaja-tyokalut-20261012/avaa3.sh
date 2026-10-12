#!/bin/zsh
# avaa3.sh: peli käyntiin (uusi-peli lontoo), mykistys, linna auki, Pelaa
source $SCRATCH/ajo.env
cd $S
sl() { python3 -c "import time; time.sleep($1)"; }
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
print -l -- "odota-tila Aloitus 60" "uusi-peli 5 lontoo" "odota-tila Kartta 60" "aani mykistys" > "$D/.pk.tmp" && mv "$D/.pk.tmp" "$D/peli-komento.txt"
for i in {1..60}; do grep -q "aani mykistys → ok" "$D/peli-loki.txt" 2>/dev/null && break; sl 4; done
./k.sh komento ui-komento.txt "ui kierto vaaka"; sl 6
./k.sh komento linssi-komento.txt "kehittaja 1"; sl 5
./k.sh tv 500 300; sl 2
./k.sh tt mk-linssitNappi; sl 3
./k.sh tt "PELIT"; sl 2
./k.sh tt "Olavinlinna"
for i in {1..120}; do ./k.sh puu lista 2>/dev/null | grep -q "Pelaa" && break; sl 3; done
./k.sh kuva u00-kortti
./k.sh tt "Pelaa"; echo "$(date +%T) Pelaa painettu" >> ajo.log
sl 45
./k.sh kuva u01-laituri
echo "$(date +%T) AVAA KAIKKI" >> ajo.log
