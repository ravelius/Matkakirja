#!/bin/zsh
# JU 11.11. 13.0x (PT): lukkovahti. /tmp/*.lukko, jonka pid-tiedoston prosessi ei elä kahdella peräkkäisellä
# tarkistuksella (60 s väli) → siirretään /tmp/lukko-arkisto/:iin (ei poistoa) ja rivi jonolokiin.
# Syy: pysäytetty NS laattamuisti-ipad-2 (12.22) jätti molemmat käännöslukot → Mac-jono seisoi ~40 min.
# Käynnistys: nohup zsh lukkovahti.zsh > lukkovahti.log 2>&1 &   (yksi kerrallaan; tarkista pgrep -f lukkovahti.zsh)
exec </dev/null
J=/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt; A=/tmp/lukko-arkisto
mkdir -p $A
typeset -A epaily
while true; do
  for d in /tmp/*.lukko(N/); do
    [[ -f $d/pid ]] || continue
    p=$(<$d/pid); [[ $p == <-> ]] || continue
    if kill -0 $p 2>/dev/null; then unset "epaily[$d]"; continue; fi
    if [[ -n ${epaily[$d]} ]]; then
      k=$(head -1 $d/kuka 2>/dev/null)
      mv $d $A/${d:t}-$(date +%H%M%S) && print "$(date +%H.%M) JU LUKKOVAHTI vapautti ${d:t} (pid $p kuollut; $k)" >> $J
      unset "epaily[$d]"
    else
      epaily[$d]=1
    fi
  done
  sleep 60
done
