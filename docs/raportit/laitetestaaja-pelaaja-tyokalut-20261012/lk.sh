#!/bin/zsh
# lk.sh <n>: peli-lokin loppu
source $SCRATCH/ajo.env
D="$(xcrun simctl get_app_container $U app.matkakirja.proto3d data)/Documents"
tail -n ${1:-10} "$D/peli-loki.txt" | cut -c1-220
