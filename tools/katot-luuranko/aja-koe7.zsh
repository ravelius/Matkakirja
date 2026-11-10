#!/bin/zsh
# KS 10.11.2026 04.4x: koe7 = koe6 + T-liitoskorjaus ei palauta koko taloa kierteessä (KATOT_KIERRE_OHITA=1). Vain vaihe 3 (pohjat ja ranka koe6:n).
# Pariisi ja Lontoo rinnakkain. Koe, ei junaan.
K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko; PY=/opt/homebrew/opt/python@3.14/bin/python3
P=/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot
D=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/osm-d6; A=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/a
[ -d $K/pariisi/palat-v23-katot-koe7 ] || cp -Rp $K/pariisi/palat-v23-katot-koe6 $K/pariisi/palat-v23-katot-koe7 || exit 1
[ -d $K/lontoo/palat-d11-katot-koe7 ] || cp -Rp $K/lontoo/palat-d11-katot-koe6 $K/lontoo/palat-d11-katot-koe7 || exit 1
rm -f $K/pariisi/katkoloki-koe7.txt $K/lontoo/katkoloki-koe7.txt $K/lontoo/katkoloki-koe6.txt
( export KATOT_KIERRE_OHITA=1 KATOT_KATKOLOKI=$K/pariisi/katkoloki-koe7.txt KATOT_KOSKETUS=1 KATOT_YKSINK=0.3 KATOT_KAKSIP=1 KATOT_ALUE=48.8630,48.87199,2.3330,2.34668 KATOT_POHJAT=$K/pariisi/pohjat-koe6.json KATOT_RANKA=$K/pariisi/ranka-koe6.json
  KATOT_VAIHE=rakenna KATOT_LISAPALA="16600 11271" nice -n 10 $PY $K/skriptit/tee-palat-luuranko.py $P $K/pariisi/palat-v23-katot-koe7 $P/palat-v22-lahi-syote/korvaus.json $P/palat-v22-lahi-syote/siisti.json > $K/pariisi/vaihe3-koe7.log 2>&1 && echo "pariisi valmis" || echo "VIRHE pariisi" ) &
( export PYTHONPATH=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/lontoo-kumpu/palat-rakennus LONTOO_PUUT=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/osm/puut-d7.json LONTOO_RAJA=51.465,51.535,-0.215,0.015 LONTOO_LIDAR="/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari/lontoo-d/lidar"
  export KATOT_KIERRE_OHITA=1 KATOT_KATKOLOKI=$K/lontoo/katkoloki-koe7.txt KATOT_KOSKETUS=1 KATOT_YKSINK=0.3 KATOT_KAKSIP=1 KATOT_ALUE=51.5030,51.5120,-0.1290,-0.1145 KATOT_POHJAT=$K/lontoo/pohjat-koe6.json KATOT_RANKA=$K/lontoo/ranka-koe6.json
  KATOT_VAIHE=rakenna KATOT_LISAPALA="16375 10895" nice -n 10 $PY $K/skriptit/tee-palat-lontoo-luuranko.py $D $K/lontoo/palat-d11-katot-koe7 $A/korvaa-tyhja.json $A/siisti-d6.json > $K/lontoo/vaihe3-koe7.log 2>&1 && echo "lontoo valmis" || echo "VIRHE lontoo" ) &
wait
echo "katkot pariisi $(cat $K/pariisi/katkoloki-koe7.txt 2>/dev/null | wc -l), lontoo $(cat $K/lontoo/katkoloki-koe7.txt 2>/dev/null | wc -l)"
cat $K/pariisi/katkoloki-koe7.txt $K/lontoo/katkoloki-koe7.txt 2>/dev/null
