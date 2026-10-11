#!/bin/zsh
source $SCRATCH/ajo.env
BID=app.matkakirja.proto3d
xcrun simctl boot $U 2>&1 | grep -v "current state: Booted" | tail -1
xcrun simctl bootstatus $U -b >/dev/null 2>&1; sleep 3
xcrun simctl uninstall $U $BID 2>/dev/null
xcrun simctl install $U "$APP" || exit 5
D="$(xcrun simctl get_app_container $U $BID data)/Documents"; mkdir -p "$D"
printf 'hiljaa\n' > "$D/komento.txt"
print -l -- "odota-tila Aloitus 40" "uusi-peli 5 lontoo" "odota-tila Kartta 40" > "$D/peli-komento.txt"
: > $S/konsoli.log
xcrun simctl launch --terminate-running-process --stdout=$S/konsoli.log --stderr=$S/konsoli-err.log $U $BID
echo "D=$D"
$SK $U koko
