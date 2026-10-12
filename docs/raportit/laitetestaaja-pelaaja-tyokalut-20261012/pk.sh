#!/bin/zsh
# pk.sh <rivi...>: kirjoittaa rivit peli-komento.txt:hen (atominen)
source $SCRATCH/ajo.env
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
print -l -- "$@" > "$D/.pk.tmp" && mv "$D/.pk.tmp" "$D/peli-komento.txt"
