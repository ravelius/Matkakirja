#!/bin/zsh
# LT 20.10. 17.2x: korjaus 10e6a5a68 (e10aebfc9 + msaa-valinta) iPad Pro 13, siemen 777.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-208-korjaus-ipad-20261020; mkdir -p $K; L=$K/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
vaihe() { echo "== $1 $(date +%H.%M.%S)"; echo "VAIHE $1" >> $L
  ui "$2"; sleep 1
  laita komento.txt "mittaus alku $1
odota 10
mittaus loppu"
  ui "ui lasi mittaa 10 $1"; sleep 13; }
laita muisti-tarkka.txt 1000
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
KP=$!
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1
ui juoksupeli v4"
sleep 25
# 1) alun jäätyminen: mittaus käyntiin, sitten juoksun aloitus
laita komento.txt "mittaus alku L-ALKU
odota 20
mittaus loppu"
ui "ui lasi mittaa 20 L-ALKU"
ui "ui juoksupeli uudestaan 777"; sleep 24
# 2) raskas kohta jäädytettynä
sleep 2
ui "ui juoksupeli valo jaady 1"; sleep 2
vaihe L-A "ui juoksupeli valo tila"
vaihe L-M2 "ui juoksupeli valo msaa 2"
vaihe L-M4 "ui juoksupeli valo msaa 4"
vaihe L-A2 "ui juoksupeli valo tila"
ui "ui juoksupeli valo jaady 0"
# 3) juoksu 25 s
laita komento.txt "mittaus alku L-J
odota 25
mittaus loppu"
ui "ui lasi mittaa 25 L-J"; sleep 28
for n in L-ALKU L-A L-M2 L-M4 L-A2 L-J; do
  xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$n.txt --destination $K/mittaus-$n.txt >/dev/null 2>&1
done
kill $KP 2>/dev/null
echo "IPAD-10e6 VALMIS $(date +%H.%M)"
