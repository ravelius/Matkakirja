#!/bin/zsh
# LT: PK:n kuvapari P0/P7 juoksussa (liikkeessä): P0 = oletus, P7 = liike kamera; kuva samasta juoksun hetkestä (14 s alusta, 3 toistoa/asetus).
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-208-liikekuva-ipad-20261020; mkdir -p $K; L=$K/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
KP=$!
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1
ui juoksupeli v4"
sleep 25
for a in P0 P7; do for i in 1 2 3; do
  [[ $a == P7 ]] && ui "ui juoksupeli valo liike kamera" || ui "ui juoksupeli valo liike kappaleet"
  ui "ui juoksupeli uudestaan 777"; sleep 11
  laita komento.txt "kuva L-$a-$i"; sleep 6
  xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/L-$a-$i.png --destination $K/L-$a-$i.png >/dev/null 2>&1
done; done
ui "ui juoksupeli valo liike kappaleet"
echo "LIIKEKUVA VALMIS $(date +%H.%M)"
