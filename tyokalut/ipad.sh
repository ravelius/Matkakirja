#!/bin/zsh
# iPad-apu (Natiiviseppä). UDID oletuksena pysyvä testilaite iPad Pro 13 (Fable 24.9.2026); pieni iPad Pro 11
# UDID=00008142-0019686E02F3801C, iPhone UDID=00008150-000A212E1407801C. Kehityskäännöksen App ID
# fi.matkakirja.peli.kehitys (Developer Program -tiimi RCD77XPB7M; Rakennus.LaiteBundleId).
#   tyokalut/ipad.sh asenna                     # Build/dd-laite:n .app laitteelle ja käynnistys
#   tyokalut/ipad.sh kaynnista                  # uudelleenkäynnistys (puhdas ajo)
#   tyokalut/ipad.sh peli <skripti> <s> <kansio># peli-komento.txt, odotus, lokit → kansio
#   tyokalut/ipad.sh hae <kansio> [tiedosto…]   # tiedostonimillä vain ne; ilman nimiä Documentsin
#                                               # ylätason lokit (*.txt). EI KOSKAAN koko konttia
#                                               # (sisältö, äänet, offline, kuvat ~750 Mt/ajo; Fable 24.9.:
#                                               # lokikansioon vain kuvat, videot ja konsoli)
#   tyokalut/ipad.sh konsoli <s> <tiedosto>     # uudelleenkäynnistys ja Unityn loki (stdout) s sekuntia
#   tyokalut/ipad.sh versio                     # laitteen sisältöpaketin polku (välimuistikopioille)
UDID=${UDID:-00008103-001819421413401E}
ID=${ID:-fi.matkakirja.peli.kehitys}
cd "$(dirname "$0")/.."
kopioi_sinne() { xcrun devicectl device copy to --device $UDID --domain-type appDataContainer --domain-identifier $ID --source "$1" --destination "Documents/$2" >/dev/null; }
yksi() { xcrun devicectl device copy from --device $UDID --domain-type appDataContainer --domain-identifier $ID --source "Documents/$2" --destination "$1/$2" >/dev/null 2>&1 || echo "puuttuu: $2"; }
# Documentsin ylätason lokit (*.txt) listauksesta; alikansiot (sisalto, aanet, offline, kuvat…) eivät tule.
lokit() { xcrun devicectl device info files --device $UDID --domain-type appDataContainer --domain-identifier $ID --subdirectory Documents 2>/dev/null \
  | sed -E 's/  +.*//' | grep -E '^[^/ ]+\.txt$'; }
hae() { mkdir -p "$1"; for t in $(lokit); do yksi "$1" "$t"; done; }
case "$1" in
  asenna)
    APP=$(ls -d Build/dd-laite/Build/Products/Release-iphoneos/*.app | head -1)
    xcrun devicectl device install app --device $UDID "$APP" | tail -2
    xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1 ;;
  kaynnista)
    xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1 ;;
  peli)
    kopioi_sinne "$2" peli-komento.txt; sleep "$3"; hae "$4"; cat "$4/peli-loki.txt" 2>/dev/null | tail -60 ;;
  hae)
    if [ $# -gt 2 ]; then
      mkdir -p "$2"
      for t in "${@:3}"; do yksi "$2" "$t"; done
    else hae "$2"; fi ;;
  konsoli)
    timeout "$2" xcrun devicectl device process launch --device $UDID --terminate-existing --console $ID > "$3" 2>&1
    grep -a "MATKAKIRJA" "$3" | tail -40 ;;
  versio)
    curl -s https://media.matkakirja.app/sisalto/1/uusin.json ;;
  *) echo "käyttö: $0 asenna | kaynnista | peli <skripti> <s> <kansio> | hae <kansio> | konsoli <s> <tiedosto> | versio"; exit 1 ;;
esac
