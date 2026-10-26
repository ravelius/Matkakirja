#!/bin/zsh
# LT 20.10.: VS:n GPU-selvitys vaiheet A-G (varjo-gpu-208), iPad Pro 13, sokkelo siemen 777, jäädytetty. Tulos kansioon $K.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-208-pk-ipad-20261020; mkdir -p $K; L=$K/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/22200b37-4a5b-43ac-ac4a-85980f5b235a/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
vaihe() { # nimi, komennot (rivinvaihdoin erotettuina), jolloin ui lasi mittaa 10 nimi lopuksi
  echo "== $1 $(date +%H.%M.%S)"; echo "VAIHE $1" >> $L
  ui "$2"; sleep 1
  laita komento.txt "mittaus alku $1
odota 10
mittaus loppu"
  ui "ui lasi mittaa 10 $1"; sleep 13
}
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
mittaa() { laita komento.txt "mittaus alku $1
odota $2
mittaus loppu"; ui "ui lasi mittaa $2 $1"; sleep $(( $2 + 3 )); }
ui "ui juoksupeli uudestaan 777"; sleep 11
ui "ui juoksupeli valo jaady 1"; sleep 2
laita komento.txt "kuva P-kohta"; sleep 2
vaihe P-K1 "ui juoksupeli kauko"
vaihe P-K2 "ui juoksupeli kauko kaikki"
ui "ui juoksupeli kauko 1"
vaihe P-S0 "ui juoksupeli valo sumea 0"
ui "ui juoksupeli valo sumea 1"
vaihe P-D0 "ui juoksupeli valo syva 0"
ui "ui juoksupeli valo syva 1"
vaihe P-M1 "ui lampo kuuma"
ui "ui lampo auto"
vaihe P-F4 "ui juoksupeli valo kauko 400"
ui "ui juoksupeli valo kauko 2600"
vaihe P-K1b "ui juoksupeli kauko"
ui "ui juoksupeli valo jaady 0"
for n in P-K1 P-K2 P-S0 P-D0 P-M1 P-F4 P-K1b; do
  xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$n.txt --destination $K/mittaus-$n.txt >/dev/null 2>&1
done
kill $KP 2>/dev/null
echo "IPAD-PK VALMIS $(date +%H.%M)"
