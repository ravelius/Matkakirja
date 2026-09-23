#!/bin/zsh
# LINSSIEN LAITETESTI iPadilla ilman käännöstä (Linssiseppä 23.9.2026).
#
# Käyttää asennettua sovellusta (Natiiviseppä asentaa: tyokalut/ipad.sh asenna).
# Sisältö: koepaketin linssitiedostot kopioidaan koekansioon Documents/sisalto-koe/<polku>,
# jonka Sisalto ja LinssiSisalto lukevat ennen versiopolkua (Natiiviseppä 705fc50), joten
# osoittimen vaihtuminen ei riko kokeita. devicectl ei osaa poistaa: kopiot ovat voimassa,
# kunnes ne korvataan. Vanhempi asennus ilman koekansiota: KOEKANSIO=0 (versiopolku).
#
#   ./laitetesti.sh sisalto [koepaketti]   linssiaineisto + maat (+ MAARAJAT=1) koekansioon,
#                                          uudelleenkäynnistys ja aloitusportin ohitus
#   ./laitetesti.sh portti                 aloitusportin ohitus (ui aloita pariisi)
#   ./laitetesti.sh astronautti <kansio>   kuvasarja ja loki
#   ./laitetesti.sh keksinnot <kansio>     kuvasarja ja loki
#   ./laitetesti.sh maat <kansio>          vertailu ja maatiedot: valinnat, täysi lista, lehti
#   ./laitetesti.sh radio <kansio> [radiot.json]
#                                          radiokokoelma koekansioon, uudelleenkäynnistys, asemat
#                                          RADIOT (oletus "CHE DEU UGA FIN") ~12 s kukin äänellä 0
#                                          (vanha käännös ohittaa "radio aani 0" kanavattomana maana)
#   ./laitetesti.sh kontakti <kansio>      kontaktiarkin natiivikuvat (samat näkymät kuin webin
#                                          kuvissa, ks. docs/raportit/linssit-kontaktiarkki-*.md)
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
ui() { print -l "$@" > $TMP/u.txt; sinne $TMP/u.txt ui-komento.txt; }
# Aloitusportin ohitus (Natiivi-UI): muuten Jatka matkaa / Uusi matka jää linssien päälle.
portti() { sleep ${1:-20}; ui "ui aloita pariisi"; sleep 6; }
kuva() { kartta "kuva $1"; sleep 3; }
kaynnista() { xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1; }

case "$1" in
  sisalto)
    # maarajat.json vain pyydettäessä (MAARAJAT=1): Natiiviseppä on voinut kopioida
    # polkuun oman versionsa, jota ei ylikirjoiteta.
    TIEDOSTOT="kokoelmat/linssiaineisto.json kokoelmat/maat.json"
    [ "$MAARAJAT" = 1 ] && TIEDOSTOT="$TIEDOSTOT kokoelmat/maarajat.json"
    for f in ${=TIEDOSTOT}; do
      if [ "${KOEKANSIO:-1}" = 1 ]; then sinne "$KOE/$f" "sisalto-koe/$f" && echo "koekansioon: $f"
      else sinne "$KOE/$f" "sisalto/$VERSIO/$f" && echo "välimuistiin: $VERSIO/$f"; fi
    done
    kaynnista; portti ;;
  portti)
    portti 0 ;;
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
  maat)
    linssi "linssi vertailu"; sleep 4; linssi "kamera 60 15 5000"; sleep 5; kuva kontakti-vertailu-fin
    linssi "maa SWE" "maa NOR"; sleep 3; kuva linssitesti-vertailu-3
    linssi "maa DNK"; sleep 3; kuva kontakti-vertailu
    linssi "maa DEU" "vertaa"; sleep 2
    linssi "linssi maatiedot"; sleep 4; linssi "kamera 36 138 4000"; sleep 5; kuva linssitesti-maatiedot-alku
    linssi "maa JPN"; sleep 3; kuva kontakti-maatiedot
    linssi "lehti" "maa KOR"; sleep 3; kuva linssitesti-maatiedot-kor
    linssi "linssi pois"; sleep 4; hae "$2"; tail -20 "$2/linssi-loki.txt" ;;
  radio)
    sinne "${3:-/Users/Shared/Claude/proto-3d/lokit/radio-koe/kokoelmat/radiot.json}" sisalto-koe/kokoelmat/radiot.json && echo "koekansioon: kokoelmat/radiot.json"
    kaynnista; portti
    linssi "tila" "linssi radio"; sleep 6; linssi "radio aani 0"; sleep 1
    for m in ${=RADIOT:-CHE DEU UGA FIN}; do
      linssi "radio $m"; sleep 12; linssi "radio tila"; sleep 1; kuva linssitesti-radio-$m
    done
    linssi "radio stop" "linssi pois"; sleep 3; hae "$2"; grep -a "radio" "$2/linssi-loki.txt" | tail -30 ;;
  kontakti)
    # Kiinteät näkymät (lat lon korkeus km); keksinnöt, ihmisen matka ja astronautti
    # ohjaavat kameraa itse, joten niistä otetaan linssin oma näkymä.
    linssi "linssi topografia"; sleep 8; linssi "kamera 45 10 8000"; sleep 8; kuva kontakti-topografia
    linssi "linssi vesistot"; sleep 8; linssi "kamera 0 20 9000"; sleep 8; kuva kontakti-vesistot
    linssi "linssi satelliitti"; sleep 15; kuva kontakti-satelliitti
    linssi "linssi keksinnot"; sleep 6; linssi "keksinnot 11"; sleep 6; kuva kontakti-keksinnot-1873
    linssi "keksinnot 25" "keksinnot jatka"; sleep 12; kuva kontakti-keksinnot-loppu
    linssi "linssi ihmisen-matka"; sleep 20; linssi "esitys levantti"; sleep 6; linssi "esitys tauko"; sleep 2; kuva kontakti-ihmisen-matka-levantti
    linssi "linssi pois"; sleep 4; hae "$2"; tail -12 "$2/linssi-loki.txt" ;;
  *) echo "käyttö: $0 sisalto [koepaketti] | portti | astronautti <kansio> | keksinnot <kansio> | maat <kansio> | kontakti <kansio>"; exit 1 ;;
esac
rm -rf $TMP
