K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/$1
for i in 1 2; do head -1 $K/konsoli-$i.txt | cut -c1-30; cut -c1-170 $K/nykaysvahti-rivit-$i.txt; wc -l < $K/syyt-rivit-$i.txt; done
for i in 1 2; do echo "== $i"; sed 's/MATKAKIRJA kamera: pitkä ruutu //' $K/syyt-rivit-$i.txt | awk '$1+0>=60' | cut -c1-300; done
