# J+A (puhdas) + reitit (aukio, sisätila); käyttö: ja_reitit.sh <nimi>
S=$S
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
N=$1; K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko
launch() { pkill -f "device process launch"; sleep 8; (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $1 2>&1 &); sleep 15; }
mkdir -p $K/$N-1ja $K/$N-2reitit
launch $K/$N-1ja/konsoli.txt;     V=$K/$N-1ja zsh $S/yoC.zsh > $S/$N-1.out 2>&1
launch $K/$N-2reitit/konsoli.txt; V=$K/$N-2reitit zsh $S/yoR.zsh > $S/$N-2.out 2>&1
pkill -f "device process launch"; echo "JAR VALMIS $(date +%H.%M)" > $S/$N.done
