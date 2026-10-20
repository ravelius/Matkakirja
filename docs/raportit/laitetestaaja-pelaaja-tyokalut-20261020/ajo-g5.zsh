#!/bin/zsh
# LT 20.10.: VS:n kierros 5, app c5f9217ac (APP=…), avaus + hehku + GPU raskaassa kohdassa (777, ~14 s). Käyttö: APP=… zsh ajo-g5.zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys; APP=${APP:?app}
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko; H=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/hehku-208; L=$V/lt-gpu-konsoli-g5.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
kuva() { laita komento.txt "kuva $1"; sleep 3.5; hae $H/$1.png $1.png; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $V/lt-gpu-mittaus-$n.txt mittaus-$n.txt; }
gpu() { grep -a "ruutuaika $1 " $L | sed -E 's/.*GPU ([0-9,]+) ms.*/\1/' | tr ',' '.' | tail -1; }
xcrun devicectl device install app --device $U $APP > $V/lt-gpu-asennus-g5.log 2>&1
laita muisti-tarkka.txt 1000
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
KP=$!
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
# 1) avaus: v4 auki, kuvat ~2 / 6 / 9 s
echo "AVAUS $(date +%H.%M.%S)"; laita ui-komento.txt "ui juoksupeli v4"; sleep 1
kuva AV1; sleep 1.5; kuva AV2; sleep 1.5; kuva AV3
sleep 20
ui "ui juoksupeli uudestaan 777"; sleep 10
ui "ui juoksupeli valo jaady 1"; sleep 2
ui "ui juoksupeli valo tila"; sleep 1
mittaa G5-A
ui "ui juoksupeli valo mv 1"; mittaa G5-M1; ui "ui juoksupeli valo mv 0"
a=$(gpu G5-A)
if (( ${a:-99} > 14 )); then
  ui "ui juoksupeli valo liike kamera"; mittaa G5-K; ui "ui juoksupeli valo liike kappaleet"
  k=$(gpu G5-K)
  if (( ${k:-99} > 14 )); then ui "ui juoksupeli valo sumea 0"; mittaa G5-S; ui "ui juoksupeli valo sumea 1"; fi
fi
ui "ui juoksupeli valo hehku 1"; kuva H1
ui "ui juoksupeli valo hehku 0"; kuva H0
mittaa G5-H0; ui "ui juoksupeli valo hehku 1"
ui "ui juoksupeli valo jaady 0"
mittaa G5-J 25
# lähikuvaparit (VS: kerättävä 5–10 m): jäädytys eri hetkinä juoksusta
for t in 5 8 11; do
  ui "ui juoksupeli uudestaan 777"; sleep $(( t - 3 ))
  ui "ui juoksupeli valo jaady 1"; sleep 1
  ui "ui juoksupeli valo hehku 1"; kuva HL$t-1
  ui "ui juoksupeli valo hehku 0"; kuva HL$t-0
  ui "ui juoksupeli valo hehku 1"; ui "ui juoksupeli valo jaady 0"
done
echo "G5 VALMIS $(date +%H.%M)"
