#!/bin/zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/kierros6
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
mittaa() { n=$1; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota 10
mittaus loppu"; ui "ui lasi mittaa 10 $n"; sleep 13; hae $V/mittaus-$n.txt mittaus-$n.txt; }
freeze() { ui "ui juoksupeli uudestaan 777"; sleep 11.5; ui "ui juoksupeli valo jaady 1"; sleep 2; }
ui "ui juoksupeli valo skaala 1
ui juoksupeli valo msaa 4"
for v in P0a P7 P8 P9 P0b; do
  freeze
  case $v in
    P7) ui "ui juoksupeli valo liike kamera";;
    P8) ui "ui juoksupeli valo sumea 0";;
    P9) ui "ui juoksupeli valo mv 0";;
  esac
  mittaa G6-$v
  ui "ui juoksupeli valo jaady 0"
  ui "ui juoksupeli valo liike kappaleet
ui juoksupeli valo sumea 1
ui juoksupeli valo mv 1"
done
ui "ui juoksupeli valo skaala auto
ui juoksupeli valo msaa auto"
echo "P79 VALMIS $(date +%H.%M)"
