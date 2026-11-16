#!/bin/sh
# Pulun esigeneroinnin data: sisältöpaketin uusimman version kokoelmat julkisesta ämpäristä (ei avaimia) kansioon pulu-esigenerointi/data/.
# (v625 poistui ämpäristä; versio luetaan nyt osoittimesta sisalto/1/uusin.json, PK 9.11.2026.)
# Käyttö (repon juuresta): sh tools/pulu-esigenerointi/lataa-data.sh [iso3 pienellä, oletus fra]
set -e
R=https://media.matkakirja.app
V=$(curl -sSf "$R/sisalto/1/uusin.json" | sed -n 's/.*"polku": *"\(sisalto\/1\/v[0-9]*\/\)".*/\1/p')
[ -n "$V" ] || { echo "uusin.json: polku puuttuu" >&2; exit 1; }
M=${1:-fra}
D=pulu-esigenerointi/data
mkdir -p "$D"
echo "$V" > "$D/VERSIO"
for k in karttavalot takynostot kaupungit kaupunkilehdet maalehdet nahtavyydet kohdekartat fokusvirrat maat; do
  curl -sSf -o "$D/$k.json" "$R/${V}kokoelmat/$k.json"
done
for m in fokuskohteet maastokohteet hahmotelma; do
  curl -sSf -o "$D/$m-$M.json" "$R/${V}moduulit/js/packs/$m-$M.json" || rm -f "$D/$m-$M.json"
done
ls -la "$D"
