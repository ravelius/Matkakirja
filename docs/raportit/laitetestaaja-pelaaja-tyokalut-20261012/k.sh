#!/bin/zsh
# k.sh tv xv yv [kesto] (vaakakoord. ${W}x${H}) | vv x1 y1 x2 y2 [dur] | tap/veto (pysty) | kuva nimi [selite] | komento <tiedosto> <teksti> | loki [n]
source $SCRATCH/ajo.env
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
O=$(cat $S/orient 2>/dev/null || echo L)
a=$1; shift
case $a in
 tap|veto) $SK $U $a "$@" ;;
 tv) case $O in L) $SK $U tap $(( ${H} - $2 )) $1 ${3:-0.1};; R) $SK $U tap $2 $(( ${W} - $1 )) ${3:-0.1};; P) $SK $U tap $1 $2 ${3:-0.1};; esac ;;
 vv) case $O in L) $SK $U veto $(( ${H} - $2 )) $1 $(( ${H} - $4 )) $3 ${5:-0.3};; R) $SK $U veto $2 $(( ${W} - $1 )) $4 $(( ${W} - $3 )) ${5:-0.3};; P) $SK $U veto $1 $2 $3 $4 ${5:-0.3};; esac ;;
 kuva) xcrun simctl io $U screenshot $S/kuvat/$1.raaka.png >/dev/null 2>&1
   s=P; echo P > $S/orient
   case $s in L) r=270;; R) r=90;; *) r=0;; esac
   sips --rotate $r -Z 1500 $S/kuvat/$1.raaka.png --out $S/kuvat/$1.png >/dev/null 2>&1; echo "$(date +%T) $1 [$s] $2" >> $S/kuvat/aika.txt ;;
 tt) xy=$($0 puu hae "$@") || { echo "EI LÖYTYNYT: $*"; exit 1; }; set -- ${=xy}; $0 tv $1 $2 ;;
 komento) f=$1; shift; print -r -- "$*" > "$D/.$f.tmp" && mv "$D/.$f.tmp" "$D/$f" ;;
 puu) rm -f "$D/ui-puu.json"; print -r -- "ui puu" > "$D/.ui-komento.txt.tmp" && mv "$D/.ui-komento.txt.tmp" "$D/ui-komento.txt"; for i in {1..20}; do [[ -s "$D/ui-puu.json" ]] && break; sleep 0.4; done; sleep 0.3; python3 -I $S/puu.py "$D/ui-puu.json" "$@" ;;
 loki) tail -n ${1:-15} "$D/peli-loki.txt" | cut -c1-200; ;;
esac
