# käyttö: ajoJ.sh <nimi> [QA-komento]
S=$S
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V1=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/$1; mkdir -p $V1
export QA="$2"
pkill -f "device process launch"; sleep 8; (xcrun devicectl device process launch --device $U --terminate-existing --console $B > $V1/konsoli.txt 2>&1 &); sleep 15
V=$V1 zsh $S/yoJ.zsh > $S/ajoJ-$1.out 2>&1
pkill -f "device process launch"
echo "VALMIS $1 $(date +%H.%M)" > $S/ajoJ-$1.done
