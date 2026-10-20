#!/bin/zsh
# LT 20.10.: PK:n P0–P6 + J (P3) + kuvapari P0/P3, 10e6a5a68, iPad Pro 13, siemen 777 jäädytetty.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-208-psarja-ipad-20261020; mkdir -p $K; L=$K/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
vaihe() { echo "== $1 $(date +%H.%M.%S)"; echo "VAIHE $1" >> $L
  ui "$2"; sleep 1
  laita komento.txt "mittaus alku $1
odota 10
mittaus loppu"
  ui "ui lasi mittaa 10 $1"; sleep 13; }
kuva() { laita komento.txt "kuva $1"; sleep 4; xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$1.png --destination $K/$1.png >/dev/null 2>&1; }
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
ui "ui juoksupeli uudestaan 777"; sleep 14
ui "ui juoksupeli valo jaady 1"; sleep 2
vaihe P0 "ui juoksupeli valo tila"
kuva K-P0
vaihe P1 "ui juoksupeli valo skaala 0.8"
vaihe P2 "ui juoksupeli valo skaala 1
ui juoksupeli valo msaa 2"
vaihe P3 "ui juoksupeli valo skaala 0.8"
kuva K-P3
vaihe P4 "ui juoksupeli valo sumea 0"
ui "ui juoksupeli valo sumea 1"
vaihe P5 "ui juoksupeli valo syva 0"
ui "ui juoksupeli valo syva 1"
vaihe P6 "ui juoksupeli valo liike kamera"
ui "ui juoksupeli valo liike kappaleet"
ui "ui juoksupeli valo jaady 0"
laita komento.txt "mittaus alku P3-J
odota 25
mittaus loppu"
ui "ui lasi mittaa 25 P3-J"; sleep 28
for n in P0 P1 P2 P3 P4 P5 P6 P3-J; do
  xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$n.txt --destination $K/mittaus-$n.txt >/dev/null 2>&1
done
ui "ui juoksupeli valo skaala 1
ui juoksupeli valo msaa 4"
kill $KP 2>/dev/null
echo "PSARJA VALMIS $(date +%H.%M)"
