#!/bin/zsh
# KS 10.11.2026 04.3x: koe6:n vaihe 3 uudelleen T-liitoskorjauksen katkolokilla (KATOT_KATKOLOKI). Käyttö: zsh tämä N (koe6 tai s742). Ei junaan.
K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko; P=/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot; PY=/opt/homebrew/opt/python@3.14/bin/python3
N=$1; L=$K/pariisi/katkoloki-$N.txt; rm -f $L
if [ $N = koe6 ]; then EI=""; PJ=pohjat-koe6; RJ=ranka-koe6; else EI="$(tr "\n" " " < $K/pariisi/talot-$N.txt)"; PJ=pohjat-koe6-$N; RJ=ranka-koe6-$N; fi
UL=$K/pariisi/palat-v23-katot-koe6-loki-$N
[ -d $UL ] || cp -Rp $K/pariisi/palat-v23-katot-koe6 $UL
export KATOT_KATKOLOKI=$L KATOT_EI_YKSINK="$EI" KATOT_KOSKETUS=1 KATOT_YKSINK=0.3 KATOT_KAKSIP=1 KATOT_ALUE=48.8630,48.87199,2.3330,2.34668 KATOT_POHJAT=$K/pariisi/$PJ.json KATOT_RANKA=$K/pariisi/$RJ.json
KATOT_VAIHE=rakenna KATOT_LISAPALA="16600 11271" nice -n 10 $PY $K/skriptit/tee-palat-luuranko.py $P $UL $P/palat-v22-lahi-syote/korvaus.json $P/palat-v22-lahi-syote/siisti.json > $K/pariisi/vaihe3-loki-$N.log 2>&1 || { echo "VIRHE vaihe3"; exit 3; }
echo "valmis $N: $(wc -l < $L 2>/dev/null || echo 0) katkoa"; cat $L 2>/dev/null
