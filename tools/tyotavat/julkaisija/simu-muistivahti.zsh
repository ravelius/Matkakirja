#!/bin/zsh
# SIMU-MUISTIVAHTI (Julkaisija 10.10.2026 00.2x, PT:n käsky swap-piikin jälkeen 00.13–00.17).
# Vartioi yhden simulaattorin Matkakirja3D-appia: muisti = appin MEM + saman simun SimMetalHostin MEM (top, sisältää pakatun).
# Yli rajan → appi pysäytetään omalla pid:llä (kill, EI pkill -f), rivi lokiin. Vahti päättyy, kun simu sammuu.
# Käyttö: simu-muistivahti.zsh <UDID> [raja_Gt=12]  (PT 10.10.: appi + oma SimMetalHost; raskas simu (Pariisi/Tukholma/Olavinlinna, yksin) 16, kevyt 12)   (aja taustalla vuoron ajaksi; Julkaisija käynnistää SIMULAATTORI NYT -vuorolla)
U=$1; RAJA=${2:-12}; L=/Users/Shared/Claude/julkaisija-tyokalut/simu-muistivahti.log
[ -n "$U" ] || { echo "Käyttö: $0 <UDID> [raja_Gt]" >&2; exit 2; }
gt() { # top-MEM (esim. 6241M, 14G, 512K) → Gt
  local v=$(top -l 1 -pid $1 -stats mem 2>/dev/null | tail -1 | tr -d ' +-')
  case $v in *G) echo ${v%G} ;; *M) echo "scale=2; ${v%M}/1024" | bc ;; *K) echo 0 ;; *) echo 0 ;; esac
}
echo "$(date '+%d.%m. %H.%M.%S') vahti $U raja $RAJA Gt" >> $L
while true; do
  LS=$(pgrep -f "launchd_sim .*$U" | head -1)
  # Simu voi käynnistyä uudelleen ajojen välissä (10.10. 01.12: vahti loppui kesken Siirtosepän 2. ajon) → lopeta vasta 5 min alhaalla.
  if [ -z "$LS" ]; then
    ALAS=$(( ${ALAS:-0} + 1 )); (( ALAS >= 100 )) && { echo "$(date '+%d.%m. %H.%M.%S') $U sammunut 5 min, vahti loppuu" >> $L; exit 0; }
    sleep 3; continue
  fi
  ALAS=0
  APP=$(pgrep -f "/$U/data/Containers/Bundle/Application/.*/Matkakirja3D" | head -1)
  # Saman simun SimMetalHost: launchd:n lapsi, käynnistynyt juuri ennen launchd_simiä (pid LS-10..LS-1)
  MH=""; for p in $(pgrep -x SimMetalHost); do (( p < LS && p >= LS - 10 )) && { MH=$p; break; }; done
  if [ -n "$APP" ]; then
    a=$(gt $APP); m=0; [ -n "$MH" ] && m=$(gt $MH)
    s=$(echo "$a + $m" | bc)
    if (( $(echo "$s > $RAJA" | bc) )); then
      kill $APP && echo "$(date '+%d.%m. %H.%M.%S') $U PYSÄYTETTY appi $APP: $a Gt + metal $m Gt = $s Gt > $RAJA" >> $L
    fi
  fi
  sleep 3
done
