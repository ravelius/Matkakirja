#!/bin/zsh
# LT 20.10.: VS:n GPU-selvitys vaiheet A-G (varjo-gpu-208), iPad Pro 13, sokkelo siemen 777, jäädytetty. Tulos kansioon $K.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
K=/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-208-f861-ipad-20261020; mkdir -p $K; L=$K/konsoli.txt
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
echo "== J juoksu 25 s oletuksella"
ui "ui juoksupeli uudestaan 777"; sleep 3
mittaa F-J 25
echo "== kuvasarja 16 s (raskas kohta 14 s)"
ui "ui juoksupeli uudestaan 777"; sleep 9
laita komento.txt "$(printf 'kuva f%02d\nodota 0.5\n' $(seq 0 31))"
sleep 24
ui "ui juoksupeli uudestaan 777"; sleep 11
ui "ui juoksupeli valo jaady 1"; sleep 2
laita komento.txt "kuva F-kohta"; sleep 2
vaihe F-A "ui juoksupeli valo tila"
vaihe F-kauko "ui juoksupeli kauko"
vaihe F-kaikki "ui juoksupeli kauko kaikki"
vaihe F-kauko1 "ui juoksupeli kauko 1"
vaihe F-B "ui juoksupeli valo varjot 0"
ui "ui juoksupeli valo varjot 1"
vaihe F-C "ui juoksupeli valo varjomatka 24 1"
ui "ui juoksupeli valo varjomatka 140 2"
vaihe F-F "ui juoksupeli valo kauko 400"
ui "ui juoksupeli valo kauko 2600"
vaihe F-H "ui juoksupeli valo jalki 0"
ui "ui juoksupeli valo jalki 1"
vaihe F-A2 "ui juoksupeli valo tila"
ui "ui juoksupeli valo jaady 0"
for n in F-J F-A F-kauko F-kaikki F-kauko1 F-B F-C F-F F-H F-A2; do
  xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/mittaus-$n.txt --destination $K/mittaus-$n.txt >/dev/null 2>&1
done
mkdir -p $K/kuvasarja
for i in $(seq 0 31); do n=$(printf 'f%02d' $i); xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$n.png --destination $K/kuvasarja/$n.png >/dev/null 2>&1; done
xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/F-kohta.png --destination $K/F-kohta.png >/dev/null 2>&1
xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/muisti-tarkka.log --destination $K/muisti-tarkka.log >/dev/null 2>&1
kill $KP 2>/dev/null
echo "IPAD-F861 VALMIS $(date +%H.%M)"
