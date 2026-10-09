#!/bin/sh
# Pulun esigeneroinnin data: sisältöpaketin v625 kokoelmat julkisesta ämpäristä (ei avaimia) kansioon pulu-esigenerointi/data/.
# Käyttö (repon juuresta): sh tools/pulu-esigenerointi/lataa-data.sh
set -e
D=pulu-esigenerointi/data
mkdir -p "$D"
for k in karttavalot takynostot kaupungit kaupunkilehdet maalehdet nahtavyydet kohdekartat fokusvirrat maat; do
  curl -sSf -o "$D/$k.json" "https://media.matkakirja.app/sisalto/1/v625/kokoelmat/$k.json"
done
for m in fokuskohteet maastokohteet hahmotelma; do
  curl -sSf -o "$D/$m-fra.json" "https://media.matkakirja.app/sisalto/1/v625/moduulit/js/packs/$m-fra.json" || true
done
ls -la "$D"
