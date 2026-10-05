#!/bin/zsh
# Junan vakiosarja (Pelikoodari 5.10.2026, Päätoimittajan erä): ajaa skenaariot/*.txt todistusajona peräkkäin samalle .appille
# ja kokoaa kuittausrivit → proto-3d/lokit/sarja-<juna>-<aika>/SARJA.md. Laitetestaaja ajaa jokaiselle junalle ennen VIE-pyyntöä,
# vain Julkaisijan SIMULAATTORI NYT -vuorolla.
#   sarja.sh --juna <nimi> --udid <UDID> --app <polku.app> --sha <SHA> [--nyt] [--vain 02,06] [--laite ipad]
set -u
D=${0:A:h}; JUNA= UDID= APP= SHA= VAIN= LISA=()
while (( $# )); do
  case $1 in
    --juna) JUNA=$2; shift 2 ;; --udid) UDID=$2; shift 2 ;; --app) APP=$2; shift 2 ;; --sha) SHA=$2; shift 2 ;;
    --vain) VAIN=$2; shift 2 ;; --nyt) LISA+=(--nyt); shift ;; --laite) LISA+=(--laite $2); shift 2 ;;
    *) echo "tuntematon valitsin $1"; exit 2 ;;
  esac
done
[[ -n $JUNA && -n $UDID && -n $APP && -n $SHA ]] || { sed -n 5p $0; exit 2; }
S=/Users/Shared/Claude/proto-3d/lokit/sarja-$JUNA-$(date +%Y%m%d-%H%M); mkdir -p $S
print -r -- "# Vakiosarja $JUNA ${SHA:0:8} ($(date '+%d.%m. %H.%M'))" > $S/SARJA.md; print >> $S/SARJA.md
puutteita=0
for f in $D/skenaariot/[0-9]*.txt; do
  n=${f:t:r}; [[ -n $VAIN && ",$VAIN," != *",${n%%-*},"* ]] && continue
  rivi=$($D/todistusajo.sh --era $JUNA-$n --udid $UDID --app $APP --sha $SHA --skenaario $f --jata-paalle ${LISA[@]} 2>&1 \
    | tee -a $S/ajo.log | grep -E '^(OK|PUUTE)' | tail -1)
  L=$(ls -dt /Users/Shared/Claude/proto-3d/lokit/todistus-$JUNA-$n-* 2>/dev/null | head -1)
  [[ $rivi == OK* ]] || (( puutteita++ ))
  print -r -- "- **$n**: ${rivi:-AJO KESKEYTYI} — [TODISTUS.md]($L/TODISTUS.md)" >> $S/SARJA.md
  echo "$n: ${rivi:-AJO KESKEYTYI}"
done
xcrun simctl shutdown $UDID 2>/dev/null
sed -i '' "2i\\
**$JUNA ${SHA:0:8}: $( (( puutteita == 0 )) && echo OK || echo "PUUTE — $puutteita skenaariota" )**\\
" $S/SARJA.md
echo "valmis: $S/SARJA.md"
