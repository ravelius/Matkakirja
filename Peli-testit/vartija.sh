#!/bin/sh
# PAKETTIVARTIJA: sisältöpaketti vs natiivin lukijat (Testit/Pakettivartija.cs, PakettivartijaTestit.cs).
# Käyttö: ./vartija.sh [--hae] [--paivita] [--koe [kansio]] [--raaka-kielletty]
#   (ei lippuja)       tuotantopaketin paikallinen kopio Kultaiset/tuotanto, ei verkkoa
#   --hae              tuore tuotantopaketti osoittimesta media.matkakirja.app/sisalto/1/uusin.json
#                      (curl, rakennus/paketit/tuotanto); kertoo, onko paikallinen kopio vanhentunut
#   --paivita          kuten --hae, mutta kirjoittaa paikallisen kopion (commitoi Kultaiset/tuotanto)
#   --koe [kansio]     myös koepaketti (oletus /Users/Shared/Claude/sisalto-koe, uusin.json → v<N>/)
#   --raaka-kielletty  vaiheen 2 esikatselu: Paataso.RaakaKielletty päälle (data.*-luvut punaisiksi)
# Poistumiskoodi = epäonnistuneiden testien määrä (0 = vihreä). Sama kuin: ./kaanna.sh PakettivartijaTestit
set -e
cd "$(dirname "$0")"
while [ $# -gt 0 ]; do
  case "$1" in
    --hae) VARTIJA_HAE=1; export VARTIJA_HAE ;;
    --paivita) VARTIJA_HAE=1; VARTIJA_PAIVITA=1; export VARTIJA_HAE VARTIJA_PAIVITA ;;
    --koe)
      VARTIJA_KOE=1
      case "$2" in ""|--*) ;; *) VARTIJA_KOE="$2"; shift ;; esac
      export VARTIJA_KOE ;;
    --raaka-kielletty) VARTIJA_RAAKA_KIELLETTY=1; export VARTIJA_RAAKA_KIELLETTY ;;
    *) echo "vartija.sh: tuntematon lippu $1" >&2; exit 100 ;;
  esac
  shift
done
exec ./kaanna.sh PakettivartijaTestit
