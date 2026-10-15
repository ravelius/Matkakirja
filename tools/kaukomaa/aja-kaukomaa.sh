#!/bin/zsh
# Karttaseppä 9.10.: kaukomaan S2-kesälaatat Pariisille ja Tukholmalle (PT: pallokierros)
cd "/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat" || exit 1
for p in pariisi tukholma; do
  KAUKOMAA=1 PAIKAT=$p nice -n 10 node --max-old-space-size=8000 kuvauspaikat-v2.mjs >> kaukomaa-$p.log 2>&1 || echo "$(date '+%H:%M') VIRHE $p" >> kaukomaa-$p.log
done
echo "$(date '+%H:%M') KAUKOMAA AJO VALMIS" >> kaukomaa-tukholma.log
