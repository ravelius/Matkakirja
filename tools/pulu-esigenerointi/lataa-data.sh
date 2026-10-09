#!/bin/sh
# Pulun esigeneroinnin data: sisältöpaketin v625 kokoelmat julkisesta ämpäristä (ei avaimia) kansioon pulu-esigenerointi/data/.
# Käyttö (repon juuresta): sh tools/pulu-esigenerointi/lataa-data.sh [iso3 pienellä, oletus fra]
set -e
M=${1:-fra}
D=pulu-esigenerointi/data
mkdir -p "$D"
for k in karttavalot takynostot kaupungit kaupunkilehdet maalehdet nahtavyydet kohdekartat fokusvirrat maat; do
  curl -sSf -o "$D/$k.json" "https://media.matkakirja.app/sisalto/1/v625/kokoelmat/$k.json"
done
for m in fokuskohteet maastokohteet hahmotelma; do
  curl -sSf -o "$D/$m-$M.json" "https://media.matkakirja.app/sisalto/1/v625/moduulit/js/packs/$m-$M.json" || rm -f "$D/$m-$M.json"
done
ls -la "$D"
