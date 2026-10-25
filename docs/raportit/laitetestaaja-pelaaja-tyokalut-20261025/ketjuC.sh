# täysi kierros puhtaalla järjestyksellä; käyttö: ketjuC.sh <nimi>
S=$S
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
N=$1; K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko
launch() { pkill -f "device process launch"; sleep 8; (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $1 2>&1 &); sleep 15; }
mkdir -p $K/$N-1ja $K/$N-2alku $K/$N-4reitit $K/$N-5maali $K/$N-6kylma $K/$N-7varina
# 1 J + A
launch $K/$N-1ja/konsoli.txt;     V=$K/$N-1ja zsh $S/yoC.zsh > $S/$N-1.out 2>&1
# 2 alkulento
launch $K/$N-2alku/konsoli.txt;   V=$K/$N-2alku zsh $S/alku.zsh > $S/$N-2.out 2>&1
# 3 saapumislento (2 kylmää avausta)
D=$K/$N-3saapumis; mkdir -p $D $S/ipad
for i in 1 2; do
  launch $D/konsoli-$i.txt; sleep 15
  printf "uusi-peli 5 amsterdam\n" > $S/ipad/peli-komento.txt
  xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/ipad/peli-komento.txt --destination Documents/peli-komento.txt >/dev/null 2>&1
  sleep 60
  grep -a "nykäysvahti:" $D/konsoli-$i.txt > $D/nykaysvahti-rivit-$i.txt; grep -a "| syyt:" $D/konsoli-$i.txt > $D/syyt-rivit-$i.txt
done
# 4 reitit (käännösnykäykset, latauskuvat pysty)
launch $K/$N-4reitit/konsoli.txt; V=$K/$N-4reitit zsh $S/yoR.zsh > $S/$N-4.out 2>&1
# 5 maali + loppukortti
launch $K/$N-5maali/konsoli.txt;  V=$K/$N-5maali zsh $S/yo34.zsh > $S/$N-5.out 2>&1
# 6 viisi kylmäkäynnistystä
V3=$K/$N-6kylma
for i in 1 2 3 4 5; do
  pkill -f "device process launch"; sleep 8
  (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $V3/kylma-$i.txt 2>&1 &); sleep 12
  grep -a -q "Built from" $V3/kylma-$i.txt || { echo "kylmäkäynnistys $i: konsoli ei kiinnittynyt" >> $S/$N-6.out; continue; }
  zsh $S/kylma-askel.zsh $i $V3 >> $S/$N-6.out 2>&1
done
# 7 värinä, kuva- ja jäädytyssarjat viimeiseksi
launch $K/$N-7varina/konsoli.txt; V=$K/$N-7varina zsh $S/yoVar.zsh > $S/$N-7.out 2>&1
pkill -f "device process launch"
echo "KETJUC VALMIS $(date +%H.%M)" > $S/$N.done
