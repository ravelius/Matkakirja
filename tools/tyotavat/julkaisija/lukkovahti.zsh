#!/bin/zsh
# Tulostaa rivin aina kun linjan 1 tai 2 lukon tila (kuka) muuttuu.
typeset -A ed
while true; do
  for n in "" "-2"; do
    f=/tmp/matkakirja-kaannospalvelu$n.lukko/kuka
    if [[ -f $f ]]; then v=$(cat $f 2>/dev/null); else v=VAPAA; fi
    if [[ "${ed[$n]}" != "$v" ]]; then
      [[ -n "${ed[$n]}" ]] && echo "$(date +%H.%M) linja ${n:-1}${n:+} : $v"
      ed[$n]=$v
    fi
  done
  sleep 5
done
