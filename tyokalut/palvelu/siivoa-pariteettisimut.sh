#!/bin/zsh
# Pariteettiajon simulaattoreiden siivous (Pelikoodari 25.9.2026, Fablen levysiivous).
# Oletus = KOEAJO: näyttää koot ja mitä poistettaisiin. Poisto vain lipulla --aja (omistaja ajaa; pysyvä poisto).
#   tyokalut/siivoa-pariteettisimut.sh          koeajo
#   tyokalut/siivoa-pariteettisimut.sh --aja    poistaa sovelluksen (ja sen Documents-välimuistin) jokaisesta
#                                               pariteetti-simulaattorista (xcrun simctl uninstall) ja sammuttaa ne
# Käännöspalvelu asentaa sovelluksen uudelleen seuraavassa proto-kaanna.sh-ajossa.
BUNDLE=app.matkakirja.proto3d
AJA=0; [[ "$1" == "--aja" ]] && AJA=1
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
if (( AJA )) && [[ -d $LUKKO ]] && grep -q -E "A2FD9C9F|993F8873|C1D5E34C|88939C12" $LUKKO/kuka 2>/dev/null; then
  echo "käännöspalvelu asentaa juuri pariteettisimulaattoriin ($(cat $LUKKO/kuka)); aja myöhemmin"; exit 1
fi
yht=0
xcrun simctl list devices | grep -E "pariteetti-" | while read -r rivi; do
  udid=$(print -r -- "$rivi" | grep -oE "[0-9A-F-]{36}")
  nimi=$(print -r -- "$rivi" | sed -E 's/^ *//; s/ \(.*//')
  koko=$(du -sm ~/Library/Developer/CoreSimulator/Devices/$udid 2>/dev/null | cut -f1)
  data=$(xcrun simctl get_app_container $udid $BUNDLE data 2>/dev/null)
  dkoko=$([[ -n $data ]] && du -sm "$data" 2>/dev/null | cut -f1 || echo 0)
  echo "$nimi $udid: laite ${koko} Mt, sovelluksen data ${dkoko} Mt"
  if (( AJA )); then
    xcrun simctl uninstall $udid $BUNDLE 2>/dev/null && echo "  poistettu $BUNDLE"
    xcrun simctl shutdown $udid 2>/dev/null
  fi
done
(( AJA )) || echo "KOEAJO: mitään ei poistettu. Poisto: $0 --aja"
df -g /Users/Shared | awk 'NR==2{print "vapaana " $4 " Gt"}'
