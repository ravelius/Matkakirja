#!/bin/zsh
# LT: VS:n kierros 6, app 8d53e567e (APP=…): GPU 0,8+MSAA 2 vs täysi, kuvapari K-taysi/K-08, hehku lähikuvat, avaus AV1–3 (ajastus lokirivistä LentoAlkaa).
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys; APP=${APP:?app}
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/kierros6; mkdir -p $V; L=$V/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/b288364f-29be-4642-9c35-86d55a00de06/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
kuva() { laita komento.txt "kuva $1"; sleep 3.5; hae $V/$1.png $1.png; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $V/mittaus-$n.txt mittaus-$n.txt; }
xcrun devicectl device install app --device $U $APP > $V/asennus.log 2>&1
laita muisti-tarkka.txt 1000
xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &
KP=$!
sleep 45
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 35
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
# avaus: kuvat 2 / 6 / 9 s LentoAlkaa-rivistä
n0=$(grep -a -c "avaus: LentoAlkaa" $L)
laita ui-komento.txt "ui juoksupeli v4"
until (( $(grep -a -c "avaus: LentoAlkaa" $L) > n0 )); do sleep 0.3; done
t0=$(date +%s); echo "LENTO ALKAA $(date +%H.%M.%S)"
sleep 0.5; kuva AV1                                  # ~ 4 s kuvan lukuviiveen jälkeen: korjataan alla
sleep $(( 6 - ($(date +%s) - t0) )); kuva AV2
sleep $(( 9 - ($(date +%s) - t0) )) 2>/dev/null; kuva AV3
sleep 10
ui "ui juoksupeli uudestaan 777"; sleep 11.5
ui "ui juoksupeli valo jaady 1"; sleep 2
ui "ui juoksupeli valo tila"; sleep 1
mittaa G6-A
ui "ui juoksupeli valo skaala 1
ui juoksupeli valo msaa 4"; mittaa G6-T
ui "ui juoksupeli valo skaala auto
ui juoksupeli valo msaa auto"; mittaa G6-A2
ui "ui juoksupeli valo jaady 0"
mittaa G6-J 25
# kuvapari Puyi + katot (777 ~7 s)
ui "ui juoksupeli uudestaan 777"; sleep 4
ui "ui juoksupeli valo jaady 1"; sleep 1
ui "ui juoksupeli valo skaala 1
ui juoksupeli valo msaa 4"; kuva K-taysi
ui "ui juoksupeli valo skaala auto
ui juoksupeli valo msaa auto"; kuva K-08
ui "ui juoksupeli valo jaady 0"
# hehku lähikuvat (voima 0,5)
for t in 5 8 11 14; do
  ui "ui juoksupeli uudestaan 777"; sleep $(( t - 3 ))
  ui "ui juoksupeli valo jaady 1"; sleep 1
  ui "ui juoksupeli valo hehku 1"; kuva H1-$t
  ui "ui juoksupeli valo hehku 0"; kuva H0-$t
  ui "ui juoksupeli valo hehku 1"; ui "ui juoksupeli valo jaady 0"
done
echo "G6 VALMIS $(date +%H.%M)"
