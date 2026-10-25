# raketin yölaukaisu: J/A-tyyppiset ruutuajat T+20 s asti + taivas tila
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
N=$1; V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/$N; mkdir -p $V; L=$V/konsoli.txt
S=$S/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
pkill -f "device process launch"; sleep 8
(xcrun devicectl device process launch --device $U --terminate-existing --console $B > $L 2>&1 &); sleep 30
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"
laita linssi-komento.txt "linssi raketti gpu tila"; sleep 3
echo "TILA ENNEN: $(grep -a 'taivas' $L | tail -1 | cut -c1-200)"
[[ -n "$CMD" ]] && { laita linssi-komento.txt "$CMD"; sleep 3; }
laita linssi-komento.txt "linssi raketti gpu tila"; sleep 3
laita linssi-komento.txt "linssi raketti laukaise 1 auto"; sleep 3
t=0; until grep -a -q "raketti: laukaisu alkaa" $L || (( t > 90 )); do sleep 1; (( t++ )); done; echo "laukaisu alkoi t=$t $(date +%H.%M.%S)"
laita linssi-komento.txt "linssi raketti taivas tila"; sleep 2
laita komento.txt "mittaus alku R20
odota 20
mittaus loppu
kuva rak-t20"
ui "ui lasi mittaa 20 R20"; sleep 24; hae $V/mittaus-R20.txt mittaus-R20.txt; hae $V/rak-t20.png rak-t20.png
laita linssi-komento.txt "linssi raketti gpu tila"; sleep 3
echo "TILA: $(grep -a 'taivas' $L | tail -2 | cut -c1-240)"
for k in 40 60; do sleep 8; laita komento.txt "kuva rak-t$k"; sleep 3.5; hae $V/rak-t$k.png rak-t$k.png; done
pkill -f "device process launch"; echo "RAKETTI VALMIS $(date +%H.%M)"
