# saapumislento 2x, kuten 210af-3saapumis; käyttö: saap.sh <nimi>
S=$S
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
N=$1; K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko; D=$K/$N; mkdir -p $D $S/ipad
for i in 1 2; do
  pkill -f "device process launch"; sleep 8
  (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $D/konsoli-$i.txt 2>&1 &); sleep 30
  printf "uusi-peli 5 amsterdam\n" > $S/ipad/peli-komento.txt
  xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/ipad/peli-komento.txt --destination Documents/peli-komento.txt >/dev/null 2>&1
  sleep 60
  grep -a "nykäysvahti:" $D/konsoli-$i.txt > $D/nykaysvahti-rivit-$i.txt; grep -a "| syyt:" $D/konsoli-$i.txt > $D/syyt-rivit-$i.txt
done
pkill -f "device process launch"; echo "SAAP VALMIS $(date +%H.%M)" > $S/$N.done
