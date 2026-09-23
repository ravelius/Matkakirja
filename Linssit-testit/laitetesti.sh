#!/bin/zsh
# LINSSIEN LAITETESTI iPadilla ilman käännöstä (Linssiseppä 23.9.2026).
#
# Käyttää asennettua sovellusta (Natiiviseppä asentaa: tyokalut/ipad.sh asenna).
# Sisältö: paikallisen koepaketin linssitiedostot kopioidaan sovelluksen
# sisältövälimuistiin sen versiopolun alle, jota osoitin nyt näyttää
# (Documents/sisalto/<versiopolku>/…); LinssiSisalto ja Sisalto lukevat välimuistin
# ennen verkkoa. devicectl ei osaa poistaa, joten kopiot jäävät välimuistiin —
# ne ovat käyttämättömiä heti, kun osoitin vaihtaa versiota.
#
#   ./laitetesti.sh sisalto [koepaketti]   v11:n linssiaineisto + maat välimuistiin
#   ./laitetesti.sh astronautti <kansio>   kuvasarja ja loki
#   ./laitetesti.sh keksinnot <kansio>     kuvasarja ja loki
#
# Komennot: linssi-komento.txt (LinssiOhjain) ja komento.txt (Kartta/Komennot: kuva).
UDID=${UDID:-00008142-0019686E02F3801C}
ID=app.matkakirja.proto3d
KOE=${2:-/Users/Shared/Claude/sisalto-koe/v11}
# Laitteen välimuistin versiopolku = osoittimen polku (esim. "sisalto/1/v3/").
VERSIO=${VERSIO:-$(curl -s https://media.matkakirja.app/sisalto/1/uusin.json | python3 -c 'import json,sys; print(json.load(sys.stdin)["polku"].rstrip("/"))')}
TMP=$(mktemp -d)

sinne() { xcrun devicectl device copy to --device $UDID --domain-type appDataContainer --domain-identifier $ID --source "$1" --destination "Documents/$2" >/dev/null; }
hae() { mkdir -p "$1"; xcrun devicectl device copy from --device $UDID --domain-type appDataContainer --domain-identifier $ID --source Documents --destination "$1" >/dev/null; }
linssi() { print -l "$@" > $TMP/l.txt; sinne $TMP/l.txt linssi-komento.txt; }
kartta() { print -l "$@" > $TMP/k.txt; sinne $TMP/k.txt komento.txt; }
kuva() { kartta "kuva $1"; sleep 3; }
kaynnista() { xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1; }

case "$1" in
  sisalto)
    for f in kokoelmat/linssiaineisto.json kokoelmat/maat.json; do
      sinne "$KOE/$f" "sisalto/$VERSIO/$f" && echo "välimuistiin: $VERSIO/$f"
    done
    kaynnista ;;
  astronautti)
    linssi "tila" "linssi satelliitti"; sleep 12; kuva linssitesti-astro-avaus
    sleep 15; kuva linssitesti-astro-27s
    sleep 20; kuva linssitesti-astro-47s
    linssi "tila" "linssi pois"; sleep 4; hae "$2"; tail -25 "$2/linssi-loki.txt" ;;
  keksinnot)
    linssi "linssi keksinnot"; sleep 8; linssi "keksinnot tila"; kuva linssitesti-keks-alku
    sleep 20; linssi "keksinnot tila"; kuva linssitesti-keks-28s
    linssi "keksinnot 11"; sleep 5; linssi "keksinnot tila"; kuva linssitesti-keks-1873
    linssi "keksinnot 25"; sleep 5; linssi "keksinnot tila"; kuva linssitesti-keks-1928
    linssi "keksinnot jatka"; sleep 12; linssi "keksinnot tila"; kuva linssitesti-keks-loppu
    linssi "linssi pois"; sleep 4; hae "$2"; tail -25 "$2/linssi-loki.txt" ;;
  *) echo "käyttö: $0 sisalto [koepaketti] | astronautti <kansio> | keksinnot <kansio>"; exit 1 ;;
esac
rm -rf $TMP
