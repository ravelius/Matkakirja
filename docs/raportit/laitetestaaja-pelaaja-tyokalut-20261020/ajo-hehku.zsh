#!/bin/zsh
# LT 20.10.: VS:n hehku e35e43ee0, iPad Pro 13, siemen 777 jäädytetty: kuvapari H1/H0/H5 + GPU G-H1/G-H0.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
APP=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-208-hehku-e35e43ee0-laite/Matkakirja3D.app
K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/hehku-208; mkdir -p $K; L=$K/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
kuva() { laita komento.txt "kuva $1"; sleep 4; xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$1.png --destination $K/$1.png >/dev/null 2>&1; }
mittaa() { laita komento.txt "mittaus alku $1
odota 10
mittaus loppu"; ui "ui lasi mittaa 10 $1"; sleep 13; xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$1.txt --destination $K/mittaus-$1.txt >/dev/null 2>&1; }
xcrun devicectl device install app --device $U $APP > $K/asennus.log 2>&1
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
ui "ui juoksupeli uudestaan 777"; sleep 12
ui "ui juoksupeli valo jaady 1"; sleep 2
ui "ui juoksupeli valo tila"; sleep 1
ui "ui juoksupeli valo hehku 1"; kuva H1
ui "ui juoksupeli valo hehku 0"; kuva H0
ui "ui juoksupeli valo hehku 1
ui juoksupeli valo hehkuvoima 0.5"; kuva H5
ui "ui juoksupeli valo hehkuvoima 0.35"
mittaa G-H1
ui "ui juoksupeli valo hehku 0"; mittaa G-H0
ui "ui juoksupeli valo hehku 1"
ui "ui juoksupeli valo jaady 0"
echo "HEHKU VALMIS $(date +%H.%M)"
