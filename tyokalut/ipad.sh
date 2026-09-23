#!/bin/zsh
# iPad-apu (Natiiviseppä). UDID oletuksena jaettu iPad Pro 11".
#   tyokalut/ipad.sh asenna                     # Build/dd-laite:n .app laitteelle ja käynnistys
#   tyokalut/ipad.sh kaynnista                  # uudelleenkäynnistys (puhdas ajo)
#   tyokalut/ipad.sh peli <skripti> <s> <kansio># peli-komento.txt, odotus, Documents → kansio
#   tyokalut/ipad.sh hae <kansio>               # Documents → kansio
#   tyokalut/ipad.sh konsoli <s> <tiedosto>     # uudelleenkäynnistys ja Unityn loki (stdout) s sekuntia
#   tyokalut/ipad.sh versio                     # laitteen sisältöpaketin polku (välimuistikopioille)
UDID=${UDID:-00008142-0019686E02F3801C}
ID=app.matkakirja.proto3d
cd "$(dirname "$0")/.."
kopioi_sinne() { xcrun devicectl device copy to --device $UDID --domain-type appDataContainer --domain-identifier $ID --source "$1" --destination "Documents/$2" >/dev/null; }
hae() { mkdir -p "$1"; xcrun devicectl device copy from --device $UDID --domain-type appDataContainer --domain-identifier $ID --source Documents --destination "$1" >/dev/null; }
case "$1" in
  asenna)
    APP=$(ls -d Build/dd-laite/Build/Products/Release-iphoneos/*.app | head -1)
    xcrun devicectl device install app --device $UDID "$APP" | tail -2
    xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1 ;;
  kaynnista)
    xcrun devicectl device process launch --device $UDID --terminate-existing $ID | tail -1 ;;
  peli)
    kopioi_sinne "$2" peli-komento.txt; sleep "$3"; hae "$4"; cat "$4/peli-loki.txt" 2>/dev/null | tail -60 ;;
  hae) hae "$2" ;;
  konsoli)
    timeout "$2" xcrun devicectl device process launch --device $UDID --terminate-existing --console $ID > "$3" 2>&1
    grep -a "MATKAKIRJA" "$3" | tail -40 ;;
  versio)
    curl -s https://media.matkakirja.app/sisalto/1/uusin.json ;;
  *) echo "käyttö: $0 asenna | kaynnista | peli <skripti> <s> <kansio> | hae <kansio> | konsoli <s> <tiedosto> | versio"; exit 1 ;;
esac
