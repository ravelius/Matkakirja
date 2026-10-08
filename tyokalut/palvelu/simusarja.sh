#!/bin/zsh
# SIMULAATTORIEN LAITESARJA T7:LLÄ (omistaja 7.10.2026 klo 23.0x Päätoimittajan kautta: "tee T7:lle se pysyvä siirto"; Natiiviseppä).
# Symlinkki Devices-kansioon EI toimi (kokeiltu 6.10. kahdesti), siksi erillinen --set-laitesarja. T7 PUUTTUU → selvä virhe,
# EI hiljaista paluuta sisäiselle levylle. Vaatii täyden levyn käyttöoikeuden CoreSimulatorService.xpc:lle ja SimulatorTrampoline.xpc:lle
# (omistaja antoi 7.10. 23.2x/23.5x).
#
# KÄYTTÖ SKRIPTEISSÄ (8.10.): lisää zsh-skriptin alkuun
#     source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2
# → jokainen `xcrun simctl …` menee T7-sarjaan (funktio xcrun lisää --set) ja vanhat sisäiset UDID:t käännetään saman nimisen
#   T7-laitteen UDID:ksi (simusarja-udid.tsv). Lisäksi MK_SIMSET, simctl (= xcrun simctl), mk_udid <laitenimi>.
#   HUOM (LS1 8.10.): nohup/xargs/timeout/env ajavat oikean xcrunin funktion ohi → niissä `xcrun simctl --set "$MK_SIMSET" …`
#   ja UDID valmiiksi käännettynä (mk_kaanna).
# sh/bash/python: `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh simctl <simctl-argumentit>` (sama kääntö).
#   simusarja.sh luo   → luo roolien laitteet samoilla nimillä (simusarja-laitteet-sisainen-20261007.tsv) T7-sarjaan, jos puuttuvat,
#                        ja kirjoittaa UDID-taulun simusarja-udid.tsv (nimi<TAB>UDID<TAB>(vanha sisäinen UDID))
#   simusarja.sh lista → T7-sarjan laitteet
#   simusarja.sh udid <nimi|vanha UDID> → T7-UDID
MK_T7="/Volumes/T7 4TB"
MK_SIMSET="$MK_T7/Simulaattorit/Sarja"
MK_SIMTYO=/Users/Shared/Claude/proto-3d/tyokalut
export MK_SIMSET
if [[ ! -d "$MK_SIMSET" ]]; then
  print -u2 "VIKA simusarja: T7-laitesarjaa ei löydy ($MK_SIMSET). Simulaattorit ovat vain T7-sarjassa; liitä T7, älä käytä sisäistä sarjaa."
  return 2 2>/dev/null || exit 2
fi
# Vanha sisäinen UDID tai T7-UDID tai laitenimi → T7-UDID; muu argumentti ennallaan.
mk_kaanna() {
  local a=$1 u
  if [[ $a =~ '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$' ]]; then
    u=$(awk -F'\t' -v x="${a:u}" 'index($3, x) {print $2; exit}' $MK_SIMTYO/simusarja-udid.tsv)
    print -r -- ${u:-$a}
  else print -r -- $a; fi
}
mk_udid() { awk -F'\t' -v n="$1" '$1 == n {print $2; exit}' $MK_SIMTYO/simusarja-udid.tsv; }
xcrun() {
  if [[ $1 == simctl && $2 != --set ]]; then
    shift; local a uudet=()
    for a in "$@"; do uudet+=("$(mk_kaanna "$a")"); done
    command xcrun simctl --set "$MK_SIMSET" "${uudet[@]}"
  else command xcrun "$@"; fi
}
simctl() { xcrun simctl "$@"; }
if [[ ${ZSH_EVAL_CONTEXT} == toplevel ]]; then
  case $1 in
    simctl) shift; simctl "$@"; exit $? ;;
    udid) [[ $2 == *-*-*-*-* ]] && mk_kaanna "$2" || mk_udid "$2" ;;
    luo)
      vika=0
      while IFS=$'\t' read -r nimi tyyppi rt vanha; do
        [[ -n $nimi ]] || continue
        u=$(simctl list devices -j | python3 -c 'import json,sys; n=sys.argv[1]; print(next((x["udid"] for v in json.load(sys.stdin)["devices"].values() for x in v if x["name"]==n), ""))' "$nimi")
        [[ -n $u ]] || u=$(simctl create "$nimi" "$tyyppi" "$rt" 2>/dev/null)
        # 7.10. 23.16: CoreSimulatorService ei saanut kirjoittaa T7:lle (NSCocoaErrorDomain 513, macOS:n tietosuoja ulkoiselle
        # levylle) → create palautti virhetekstin. Hyväksytään vain UDID.
        if [[ ! $u =~ '^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$' ]]; then
          print -u2 "VIKA simusarja luo: $nimi ei luotu T7-sarjaan (katso ~/Library/Logs/CoreSimulator/CoreSimulator.log)"; vika=1; continue
        fi
        print -r -- "$nimi	$u	(vanha sisäinen $vanha)"
      done < $MK_SIMTYO/simusarja-laitteet-sisainen-20261007.tsv > $MK_SIMTYO/simusarja-udid.tsv.uusi
      if (( vika )); then print -u2 "simusarja-udid.tsv EI päivitetty"; rm -f $MK_SIMTYO/simusarja-udid.tsv.uusi; exit 1; fi
      mv $MK_SIMTYO/simusarja-udid.tsv.uusi $MK_SIMTYO/simusarja-udid.tsv; cat $MK_SIMTYO/simusarja-udid.tsv ;;
    lista) simctl list devices ;;
    *) print "käyttö: simusarja.sh luo | lista | udid <nimi|vanha UDID> | simctl <argumentit>   tai   source simusarja.sh" ;;
  esac
fi
