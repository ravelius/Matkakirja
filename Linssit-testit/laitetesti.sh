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
#   ./laitetesti.sh portti                 aloitusportin ohitus (ui aloita ${KAUPUNKI:-pariisi})
#   ./laitetesti.sh astronautti <kansio>   kuvasarja ja loki
#   ./laitetesti.sh keksinnot <kansio>     kuvasarja ja loki
#   ./laitetesti.sh maat <kansio>          vertailu ja maatiedot: valinnat, täysi lista, lehti
#   ./laitetesti.sh radio <kansio> [radiot.json]
#                                          radiokokoelma koekansioon, uudelleenkäynnistys, asemat
#                                          RADIOT (oletus "CHE DEU UGA FIN") ~12 s kukin äänellä 0
#                                          (vanha käännös ohittaa "radio aani 0" kanavattomana maana);
#                                          lopuksi relaunch (tapa + käynnistä) ja ensimmäinen asema uudelleen
#   ./laitetesti.sh isoisa <kansio> [isoisa-1873.json]
#                                          striimattava 1873-aineisto koekansioon (sisalto-koe/virta/),
#                                          uudelleenkäynnistys, linssi Euroopan ja Balkanin yllä
#   ./laitetesti.sh regressio <kansio>     kaikki linssit (RADIO=1: myös radio), KAUPUNKI oletus lontoo
#   ./laitetesti.sh tutkimus <kansio>      ihmisen matka suoraan tutkimusvaiheeseen
#   ./laitetesti.sh vu <kansio>            VU-mittarin kuvasarja: asemat VU_ASEMAT (oletus "DEU NLD") äänellä
#                                          AANI (oletus 0,005: tappi mittaa ennen voimakkuutta, 0 lepuuttaa neulan),
#                                          4 kuvaa + "radio tila" per asema, lopuksi vaiennus → lepo
#   ./laitetesti.sh keksinnotpari <kansio> keksinnöt pysäkillä 0 (1769 Glasgow) ja 2, kuten webin
#                                          pariteettikuva linssi-karuselli-* (WEB ON MALLI, MITATTUNA)
#   ./laitetesti.sh iss <kansio>           astronautin kamera: 16 kuvaa 0,25 s:n välein sovelluksen sisältä
#                                          (komento.txt odota), kehysajat mittaus-iss.txt, video iss.mp4 (ffmpeg)
#   ./laitetesti.sh astropulu <kansio>     astronautin kuva (KOHDE, oletus etna) ja minipulun kortti; PULU_X/PULU_Y
#                                          (pt) napauttaa ensimmäistä valmista kysymystä, vastaus 20 s
#   ./laitetesti.sh radiokontakti <kansio> radio auki ja Lontoo äänettömänä (kontakti-web.mjs KIINTEA=radio)
#   ./laitetesti.sh huippuvuoret <kansio>  vertailu FIN + NOR, kamera 76/18/2500 km (kontakti-web.mjs KIINTEA=huippuvuoret)
#   ./laitetesti.sh piikit <kansio>        kehyspiikit vaiheittain (Development-käännös, ui piikit)
#   ./laitetesti.sh kontakti <kansio>      kontaktiarkin natiivikuvat (samat näkymät kuin webin
#                                          kuvissa, ks. docs/raportit/linssit-kontaktiarkki-*.md)
#
# Komennot: linssi-komento.txt (LinssiOhjain) ja komento.txt (Kartta/Komennot: kuva).
UDID=${UDID:-00008103-001819421413401E}
ID=${ID:-fi.matkakirja.peli.kehitys}
KOE=${2:-/Users/Shared/Claude/sisalto-koe/v11}
# Laitteen välimuistin versiopolku = osoittimen polku (esim. "sisalto/1/v3/").
VERSIO=${VERSIO:-$(curl -s https://media.matkakirja.app/sisalto/1/uusin.json | python3 -c 'import json,sys; print(json.load(sys.stdin)["polku"].rstrip("/"))')}
TMP=$(mktemp -d)

sinne() { xcrun devicectl device copy to --device $UDID --domain-type appDataContainer --domain-identifier $ID --source "$1" --destination "Documents/$2" >/dev/null; }
# Vain lokit ja tämän ajon kuvat (Fable 24.9.: koko Documents = sisältö ja äänet ~700 Mt/ajo täytti levyn).
hae() {
  mkdir -p "$1"
  for f in linssi-loki.txt ui-loki.txt $(cat $TMP/kuvat.txt 2>/dev/null); do
    xcrun devicectl device copy from --device $UDID --domain-type appDataContainer --domain-identifier $ID \
      --source "Documents/$f" --destination "$1/$f" >/dev/null 2>&1 || echo "ei laitteella: $f"
    # Kuvat pienennettyinä (Fable 24.9.): pitkä sivu 1200 px riittää vertailuun.
    [[ $f == *.png && -f "$1/$f" ]] && sips -Z 1200 "$1/$f" >/dev/null 2>&1
  done
}
linssi() { print -l "$@" > $TMP/l.txt; sinne $TMP/l.txt linssi-komento.txt; }
kartta() { print -l "$@" > $TMP/k.txt; sinne $TMP/k.txt komento.txt; }
ui() { print -l "$@" > $TMP/u.txt; sinne $TMP/u.txt ui-komento.txt; }
# Aloitusportin ohitus (Natiivi-UI): muuten Jatka matkaa / Uusi matka jää linssien päälle.
portti() { sleep ${1:-20}; ui "ui aloita ${KAUPUNKI:-pariisi}"; sleep 6; }
kuva() { kartta "kuva $1"; sleep 3; print "$1.png" >> $TMP/kuvat.txt; }
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
    linssi "linssi vertailu"; sleep 5; linssi "kamera 60 15 5000"; sleep 6; kuva kontakti-vertailu-fin
    linssi "maa SWE" "maa NOR"; sleep 3; kuva linssitesti-vertailu-3
    linssi "maa DNK"; sleep 3; kuva kontakti-vertailu
    linssi "maa DEU" "vertaa"; sleep 2
    linssi "linssi maatiedot"; sleep 4; linssi "kamera 36 138 4000"; sleep 5; kuva linssitesti-maatiedot-alku
    linssi "maa JPN"; sleep 3; kuva kontakti-maatiedot
    linssi "lehti" "maa KOR"; sleep 3; kuva linssitesti-maatiedot-kor
    linssi "linssi pois"; sleep 4; hae "$2"; tail -20 "$2/linssi-loki.txt" ;;
  tutkimus)
    # Ihmisen matka suoraan tutkimusvaiheeseen (linssi-komento "ihminen tutkimus"): nostot ja virtanapit.
    linssi "ihminen tutkimus"; sleep 25; kuva kontakti-ihmisen-tutkimus
    linssi "linssi pois"; sleep 3; hae "$2"; grep -a "ihminen tutkimus\|tutkimus:" "$2/linssi-loki.txt" | tail -4 ;;
  regressio)
    # Kaikki linssit yhdellä kierroksella (Fable 24.9.): kontakti (topografia, vesistöt, satelliitti,
    # keksinnöt, ihmisen matka), maat (vertailu, maatiedot), isoisä, tutkimus; RADIO=1 lisää radion.
    KAUPUNKI=${KAUPUNKI:-lontoo}; export KAUPUNKI
    "$0" kontakti "$2"; "$0" maat "$2"; "$0" isoisa "$2"
    kaynnista; portti; "$0" tutkimus "$2"
    [ "$RADIO" = 1 ] && "$0" radiokontakti "$2"
    ls "$2" | grep -c png ;;
  vu)
    kaynnista; portti
    linssi "linssi radio"; sleep 6; linssi "radio aani ${AANI:-0.005}"; sleep 1
    for m in ${=${VU_ASEMAT:-DEU NLD}}; do
      linssi "radio $m"; sleep 12
      for i in 1 2 3 4; do linssi "radio tila"; kuva vu-$m-$i; done
    done
    linssi "radio aani 0"; sleep 3; linssi "radio tila"; kuva vu-vaiennettu
    linssi "radio stop" "linssi pois"; sleep 2; hae "$2"; grep -a "radio" "$2/linssi-loki.txt" | tail -16 ;;
  keksinnotpari)
    kaynnista; portti
    linssi "linssi keksinnot"; sleep 8; linssi "keksinnot 0"; sleep 10; kuva pari-keksinnot-1769
    linssi "keksinnot 2"; sleep 12; kuva pari-keksinnot-1796
    linssi "linssi pois"; sleep 2; hae "$2"; grep -a "keksinnöt" "$2/linssi-loki.txt" | tail -4 ;;
  iss)
    kaynnista; portti
    linssi "linssi satelliitti"; sleep 22
    rivit=("mittaus alku iss")
    for n in $(seq -w 1 16); do rivit+=("kuva iss-$n" "odota 0.25"); print "iss-$n.png" >> $TMP/kuvat.txt; done
    rivit+=("mittaus loppu"); kartta "${rivit[@]}"; sleep 12
    print "mittaus-iss.txt" >> $TMP/kuvat.txt
    linssi "linssi pois"; sleep 2; hae "$2"
    ffmpeg -loglevel error -y -framerate 4 -pattern_type glob -i "$2/iss-*.png" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p "$2/iss.mp4" && echo "video: $2/iss.mp4"
    awk '{ s+=$1; if ($1>m) m=$1; n++ } END { if (n) printf "kehyksiä %d, ka %.1f ms, pisin %.1f ms\n", n, s/n, m }' "$2/mittaus-iss.txt" 2>/dev/null ;;
  astropulu)
    kaynnista; portti
    linssi "linssi satelliitti"; sleep 20
    ui "ui linssi kuva ${KOHDE:-etna} pulu"; sleep 8; kuva astropulu-kortti
    if [[ -n "$PULU_X" ]]; then ui "ui napauta $PULU_X $PULU_Y"; sleep 20; kuva astropulu-vastaus; fi
    linssi "linssi pois"; sleep 2; hae "$2"; grep -a "pulu\|chat\|Livia" "$2/ui-loki.txt" | tail -6 ;;
  radiokontakti)
    # Samat näkymät kuin kontakti-web.mjs KIINTEA=radio: auki 50/10/6000 km, sitten Lontoo äänettömänä.
    # Puhdas käynnistys: edellisen testin maalehti tai linssi ei saa jäädä kuvien päälle.
    kaynnista; portti
    linssi "linssi radio"; sleep 6; linssi "radio aani 0"; sleep 1; linssi "kamera 50 10 6000"; sleep 5; kuva kontakti-radio-auki
    linssi "radio kaupunki lontoo"; sleep 12; linssi "kamera 50 10 6000"; sleep 2; linssi "radio tila"; sleep 1; kuva kontakti-radio-lontoo
    linssi "radio stop" "linssi pois"; sleep 2; hae "$2"; grep -a "radio" "$2/linssi-loki.txt" | tail -8 ;;
  radio)
    sinne "${3:-/Users/Shared/Claude/proto-3d/lokit/radio-koe/kokoelmat/radiot.json}" sisalto-koe/kokoelmat/radiot.json && echo "koekansioon: kokoelmat/radiot.json"
    kaynnista; portti
    linssi "tila" "linssi radio"; sleep 6; linssi "radio aani 0"; sleep 1
    RADIOT=${RADIOT:-CHE DEU UGA FIN}
    for m in ${=RADIOT}; do
      linssi "radio $m"; sleep 12; linssi "radio tila"; sleep 1; kuva linssitesti-radio-$m
    done
    linssi "radio stop" "linssi pois"; sleep 2
    # Relaunch → radio soi (Laitetestaajan simulaattorilöydös 23.9.): tapa, käynnistä, viritä uudelleen.
    echo "— relaunch —"; kaynnista; portti
    linssi "linssi radio"; sleep 6; linssi "radio aani 0"; sleep 1
    linssi "radio ${RADIOT%% *}"; sleep 12; linssi "radio tila"; sleep 1; kuva linssitesti-radio-relaunch
    linssi "radio stop" "linssi pois"; sleep 3; hae "$2"; grep -a "radio\|auki" "$2/linssi-loki.txt" | tail -30 ;;
  isoisa)
    sinne "${3:-/Users/Shared/Claude/proto-3d/lokit/isoisa-1873/isoisa-1873.json}" sisalto-koe/virta/isoisa-1873.json && echo "koekansioon: virta/isoisa-1873.json"
    kaynnista; portti
    linssi "tila" "linssi isoisa-1873"; sleep 4
    linssi "kamera 50 12 6000"; sleep 8; linssi "isoisa tila"; kuva linssitesti-isoisa-eurooppa
    linssi "kamera 44 22 1500"; sleep 8; linssi "isoisa tila"; kuva linssitesti-isoisa-balkan
    linssi "kamera 48.5 7 700"; sleep 8; linssi "isoisa tila"; kuva linssitesti-isoisa-elsass
    linssi "kamera 20 30 20000"; sleep 8; linssi "isoisa tila"; kuva linssitesti-isoisa-pallo
    linssi "linssi pois"; sleep 3; hae "$2"; grep -a "isoisä\|auki" "$2/linssi-loki.txt" | tail -12 ;;
  kontakti)
    # Sovellus käyntiin ja aloitusportin ohi (muuten komennot jäävät käsittelemättä, 24.9.).
    kaynnista; portti
    # Kiinteät näkymät (lat lon korkeus km); keksinnöt, ihmisen matka ja astronautti
    # ohjaavat kameraa itse, joten niistä otetaan linssin oma näkymä.
    linssi "linssi topografia"; sleep 8; linssi "kamera 45 10 8000"; sleep 8; kuva kontakti-topografia
    linssi "linssi vesistot"; sleep 8; linssi "kamera 0 20 9000"; sleep 8; kuva kontakti-vesistot
    linssi "linssi satelliitti"; sleep 15; kuva kontakti-satelliitti
    # Samat siirrot ja odotukset kuin webin kuvissa (kontakti-web.mjs): kuva vasta ajon jälkeen (12 s).
    linssi "linssi keksinnot"; sleep 6; linssi "keksinnot 10"; sleep 12; linssi "keksinnot 11"; sleep 12; kuva kontakti-keksinnot-1873
    linssi "keksinnot 25" "keksinnot jatka"; sleep 12; kuva kontakti-keksinnot-loppu
    linssi "linssi ihmisen-matka"; sleep 45; linssi "esitys levantti"; sleep 12; linssi "esitys tauko"; sleep 2; kuva kontakti-ihmisen-matka-levantti
    linssi "linssi pois"; sleep 4; hae "$2"; tail -12 "$2/linssi-loki.txt" ;;
  huippuvuoret)
    kaynnista; portti
    linssi "linssi vertailu"; sleep 5; linssi "maa NOR"; sleep 4; linssi "kamera 76 18 2500"; sleep 8
    kuva kontakti-vertailu-huippuvuoret
    linssi "linssi pois"; sleep 2; hae "$2"; grep -a "vertailu\|auki" "$2/linssi-loki.txt" | tail -4 ;;
  piikit)
    # Linssien kehyspiikit (Fable 24.9.: ei yli 16 ms kehyksiä avauksessa ja pysäkinvaihdossa). Vaatii
    # Development-käännöksen (MATKAKIRJA_KEHITYS=1, ProfilerRecorderit). Unityn loki konsolista taustalla;
    # vaiheet erotetaan lokiin tuntemattomilla komennoilla "vaihe-<nimi>". KYNNYS ms (oletus 20).
    mkdir -p "$2"; LOKI="$2/konsoli.txt"
    timeout ${KESTO:-420} xcrun devicectl device process launch --device $UDID --terminate-existing --console $ID > "$LOKI" 2>&1 &
    portti
    linssi "linssi pois"; sleep 2
    ui "ui piikit ${KESTO:-420} ${KYNNYS:-20}"; sleep 2
    linssi "vaihe-lepo"; sleep 8
    for l in topografia vesistot; do
      linssi "vaihe-$l-avaus" "linssi $l"; sleep 8
      linssi "vaihe-$l-hyppy" "kamera 0 20 9000"; sleep 8
      linssi "vaihe-$l-sulku" "linssi pois"; sleep 4
    done
    linssi "vaihe-satelliitti-avaus" "linssi satelliitti"; sleep 20
    linssi "vaihe-satelliitti-sulku" "linssi pois"; sleep 4
    linssi "vaihe-keksinnot-avaus" "linssi keksinnot"; sleep 10
    for p in 5 11 25; do linssi "vaihe-keksinnot-pysakki-$p" "keksinnot $p"; sleep 12; done
    linssi "vaihe-keksinnot-sulku" "linssi pois"; sleep 4
    linssi "vaihe-ihminen-avaus" "linssi ihmisen-matka"; sleep 30
    linssi "vaihe-ihminen-levantti" "esitys levantti"; sleep 12
    linssi "vaihe-ihminen-sulku" "linssi pois"; sleep 4
    linssi "vaihe-vertailu-avaus" "linssi vertailu"; sleep 6
    linssi "vaihe-vertailu-maat" "maa SWE" "maa NOR"; sleep 4
    linssi "vaihe-vertailu-arkki" "vertaa"; sleep 4
    linssi "vaihe-maatiedot-avaus" "linssi maatiedot"; sleep 6
    linssi "vaihe-maatiedot-maa" "maa JPN"; sleep 4
    linssi "vaihe-maatiedot-lehti" "lehti"; sleep 4
    linssi "vaihe-maatiedot-sulku" "linssi pois"; sleep 4
    linssi "vaihe-radio-avaus" "linssi radio" "radio aani 0"; sleep 8
    linssi "vaihe-radio-lontoo" "radio kaupunki lontoo"; sleep 10
    linssi "vaihe-radio-sulku" "radio stop" "linssi pois"; sleep 4
    linssi "vaihe-loppu"; sleep 3
    ui "ui piikit pois"; sleep 2; kill %1 2>/dev/null; wait
    # Vaiheittain: piikkien määrä ja pisin kehys.
    awk '/tuntematon komento: vaihe-/ { v=$0; sub(/.*vaihe-/, "", v); sub(/[^a-z0-9-].*/, "", v); next }
         /MATKAKIRJA piikit: kehys/ { if (v == "") v = "alku"; n[v]++; ms=$0; sub(/.*kehys /, "", ms); ms+=0; if (ms>mx[v]) mx[v]=ms; if (!(v in o)) { o[v]=++k; j[k]=v } }
         END { for (i=1;i<=k;i++) printf "%-28s %3d piikkiä, pisin %6.1f ms\n", j[i], n[j[i]], mx[j[i]] }' "$LOKI" ;;
  *) echo "käyttö: $0 sisalto [koepaketti] | portti | astronautti <kansio> | keksinnot <kansio> | maat <kansio> | kontakti <kansio> | piikit <kansio>"; exit 1 ;;
esac
rm -rf $TMP
