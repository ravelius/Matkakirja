# kamerakierros: reitit, alkulento, värinä; käyttö: kamera.sh <nimi>
S=$S
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
N=$1; K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko
launch() { pkill -f "device process launch"; sleep 8; (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $1 2>&1 &); sleep 15; }
mkdir -p $K/$N-reitit $K/$N-alku $K/$N-varina
launch $K/$N-reitit/konsoli.txt; V=$K/$N-reitit zsh $S/yoR.zsh > $S/$N-reitit.out 2>&1
launch $K/$N-alku/konsoli.txt;   V=$K/$N-alku zsh $S/alku.zsh > $S/$N-alku.out 2>&1
launch $K/$N-varina/konsoli.txt; V=$K/$N-varina zsh $S/yoVar.zsh > $S/$N-varina.out 2>&1
pkill -f "device process launch"
echo "KAMERA VALMIS $(date +%H.%M)" > $S/$N.done
