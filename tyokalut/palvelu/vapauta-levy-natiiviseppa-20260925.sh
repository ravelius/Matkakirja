#!/bin/zsh
# Levyn vapautus 25.9.2026 (Fablen pyyntö klo 06.1x; Natiiviseppä). Oletuksena KOEAJO: näyttää mitä poistettaisiin ja
# kuinka paljon. Poisto vain omistajan ajamana: vapauta-levy-natiiviseppa-20260925.sh --aja
# Kohteet (vain Clauden omia väliaikaisia ja generoituja tiedostoja, ei omistajan tiedostoja):
#  1) Natiivisepän vanhojen sessioiden scratchpadit /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-3d-selvittaja/
#     (paitsi nykyinen session kansio NYKYINEN)
#  2) xcrun simctl delete unavailable (poistuneiden iOS-versioiden simulaattorit)
#  3) simulaattoreiden pelin laattavälimuisti <data>/Library/Caches/laatat (iOS saa tyhjentää sen itsekin; peli hakee
#     laatat uudelleen ämpäristä) sovelluksilta app.matkakirja.proto3d ja fi.matkakirja.peli.kehitys
#  4) Matkakirja-proto/Build: laitekäännöksen välitiedostot Build/laite ja Build/dd-laite (syntyvät uudelleen
#     seuraavassa laitekäännöksessä); Build/yo (TestFlight), iOS-sim ja dd-sim jäävät
AJA=0; [[ $1 == --aja ]] && AJA=1
NYKYINEN=e7bbb59f-9659-4634-b733-b5509929a93b
yht=0
koko() { du -sk "$1" 2>/dev/null | awk '{print $1}'; }
pois() {
  local k=$(koko "$1"); [[ -z $k ]] && return
  yht=$((yht + k)); printf "%8.1f Gt  %s\n" $((k / 1048576.0)) "$1"
  (( AJA )) && rm -rf "$1"
}
echo "== 1) vanhat scratchpadit"
for d in /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-3d-selvittaja/*(N/); do
  [[ ${d:t} == $NYKYINEN ]] && continue
  pois $d
done
echo "== 2) poistuneiden iOS-versioiden simulaattorit"
xcrun simctl list devices unavailable | grep -E "\(" | sed 's/^/   /'
(( AJA )) && xcrun simctl delete unavailable
echo "== 3) laattavälimuistit simulaattoreissa"
for c in ~/Library/Developer/CoreSimulator/Devices/*/data/Containers/Data/Application/*/Library/Caches/laatat(N/); do
  pois $c
done
echo "== 4) proto-gitin laitekäännöksen välitiedostot"
pois /Users/Shared/Claude/proto-3d/Matkakirja-proto/Build/dd-laite
pois /Users/Shared/Claude/proto-3d/Matkakirja-proto/Build/laite
tila="(koeajo; poisto: --aja)"; (( AJA )) && tila="vapautettu"
printf "YHTEENSÄ %.1f Gt %s\n" $((yht / 1048576.0)) "$tila"
df -h / | tail -1
