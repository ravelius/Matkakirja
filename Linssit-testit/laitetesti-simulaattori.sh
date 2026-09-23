#!/bin/zsh
# LINSSIEN LAITETESTI SIMULAATTORISSA (Laitetestaaja 23.9.2026).
#
# laitetesti.sh käyttää devicectl:ää, joka toimii vain oikealla laitteella —
# tämä on sen simulaattorikaksonen, samalla komentokaavalla (linssi-komento.txt,
# komento.txt, ui-komento.txt), mutta tiedostot kirjoitetaan suoraan
# `xcrun simctl get_app_container`-polkuun devicectl-kopioinnin sijaan.
#
#   ./laitetesti-simulaattori.sh astronautti [ulos]
#   ./laitetesti-simulaattori.sh keksinnot [ulos]
#   ./laitetesti-simulaattori.sh maat [ulos]
#   ./laitetesti-simulaattori.sh kontakti [ulos]   (topografia+vesistöt+astro+keksinnöt,
#                                                    samat kiinteät näkymät kuin laitetesti.sh:n
#                                                    kontakti-haara)
#
# UDID=<simulaattorin UDID> (oletus: booted-laite)
set -e
UDID=${UDID:-$(xcrun simctl list devices booted -j | python3 -c 'import json,sys; d=json.load(sys.stdin)["devices"]; print(next(v["udid"] for k in d for v in d[k]))' 2>/dev/null)}
ID=app.matkakirja.proto3d
D=$(xcrun simctl get_app_container $UDID $ID data)/Documents
ULOS=${2:-/tmp/linssit-laitetesti-$(date +%Y%m%d-%H%M%S)}
mkdir -p "$ULOS"

linssi() { print -l "$@" > $D/linssi-komento.txt; }
kartta() { print -l "$@" > $D/komento.txt; }
ui() { print -l "$@" > $D/ui-komento.txt; }
kuva() { kartta "kuva $1"; sleep 3; cp "$D/$1.png" "$ULOS/$1.png" 2>/dev/null || echo "EI KUVAA: $1"; }
portti() { ui "ui aloita"; sleep ${1:-3}; }

osascript -e 'set volume output muted true' 2>/dev/null
trap 'osascript -e "set volume output muted false" 2>/dev/null' EXIT

case "$1" in
  astronautti)
    portti
    linssi "tila" "linssi satelliitti"; sleep 12; kuva linssitesti-astro-avaus
    sleep 15; kuva linssitesti-astro-27s
    sleep 20; kuva linssitesti-astro-47s
    linssi "tila" "linssi pois"; sleep 3 ;;
  keksinnot)
    portti
    linssi "linssi keksinnot"; sleep 8; linssi "keksinnot tila"; kuva linssitesti-keks-alku
    sleep 20; linssi "keksinnot tila"; kuva linssitesti-keks-28s
    linssi "keksinnot 11"; sleep 5; linssi "keksinnot tila"; kuva linssitesti-keks-1873
    linssi "keksinnot 25"; sleep 5; linssi "keksinnot tila"; kuva linssitesti-keks-1928
    linssi "keksinnot jatka"; sleep 12; linssi "keksinnot tila"; kuva linssitesti-keks-loppu
    linssi "linssi pois"; sleep 3 ;;
  maat)
    portti
    linssi "linssi vertailu"; sleep 4; linssi "kamera 60 15 5000"; sleep 5; kuva kontakti-vertailu-fin
    linssi "maa SWE" "maa NOR"; sleep 3; kuva linssitesti-vertailu-3
    linssi "maa DNK"; sleep 3; kuva kontakti-vertailu
    linssi "maa DEU" "vertaa"; sleep 2
    linssi "linssi maatiedot"; sleep 4; linssi "kamera 36 138 4000"; sleep 5; kuva linssitesti-maatiedot-alku
    linssi "maa JPN"; sleep 3; kuva kontakti-maatiedot
    linssi "linssi pois"; sleep 3 ;;
  kontakti)
    portti
    linssi "linssi topografia"; sleep 8; linssi "kamera 45 10 8000"; sleep 8; kuva kontakti-topografia
    linssi "linssi vesistot"; sleep 8; linssi "kamera 0 20 9000"; sleep 8; kuva kontakti-vesistot
    linssi "linssi satelliitti"; sleep 15; kuva kontakti-satelliitti
    linssi "linssi keksinnot"; sleep 6; linssi "keksinnot 11"; sleep 6; kuva kontakti-keksinnot-1873
    linssi "keksinnot 25" "keksinnot jatka"; sleep 12; kuva kontakti-keksinnot-loppu
    linssi "linssi pois"; sleep 3 ;;
  *) echo "käyttö: $0 astronautti|keksinnot|maat|kontakti [ulos]"; exit 1 ;;
esac
cp "$D/linssi-loki.txt" "$ULOS/linssi-loki.txt" 2>/dev/null
echo "Valmis: $ULOS"
