#!/bin/zsh
# OLAVINLINNAN YMPÄRISTÖN KOKO KETJU (Linnanrakentaja 1.10.2026; laatusuunnitelman vaihe 5, aikakerros n1500).
# MML:n aineistot (CC BY 4.0, _lahteet/mml-kyronsalmi/LAHDE.md) → kaupunkimaski → puut → maasto ja ortokuva →
# puulista ja syvyys → horisontti → puukortit (päivä, hämärä) → maaston hämärä → ASTC.
#   nice -n 15 tools/dioraama/blender/ymparisto_putki.sh <ulos-kansio> [--avoin 350]
# Tulos kansioon, jonka vie-blender.sh vie polkuun blender/ymparisto/ (lähde olavinlinna-blender/ymparisto).
set -euo pipefail
ULOS=${1:?anna ulos-kansio}; shift; AVOIN=350; [ "${1:-}" = --avoin ] && AVOIN=$2
B=/Applications/Blender.app/Contents/MacOS/Blender; H=${0:A:h}
L=/Users/Shared/Claude/proto-3d/_lahteet; D=$L/mml-kyronsalmi; PY=$L/venv-laser/bin/python
NI=$L/polyhaven/aerial/aerial_grass_rock_diff_4k.jpg; ASTC=/Users/Shared/Claude/proto-3d/tyokalut/astc-mip.swift
R=/Users/Shared/Claude/proto-3d/_valmiit/linna-kertoja/paketti/olavinlinna/rakennus.json
mkdir -p $ULOS
bl() { nice -n 15 $B -b --factory-startup "$@" 2>&1 | grep -E '^(YMP|PUUT|JALKI|HOR|KORTIT|HAMARA|N1500|Error|Traceback)' || true; }
echo "== n1500 $(date +%H.%M)"; nice -n 15 $PY $H/ymparisto_n1500.py $D/mtk $D/N5311A-orto-2024.png $ULOS/n1500-maski.npz | tail -2
echo "== puut $(date +%H.%M)"; nice -n 15 $PY $H/ymparisto_puut.py $D/laser $D/N5311A-dem2m.raw $D/N5311A-orto-2024.png $ULOS/puut.json \
  --n1500 $ULOS/n1500-maski.npz --avoin $AVOIN | grep -E 'PUUT: [0-9]'
echo "== maasto $(date +%H.%M)"; bl -P $H/ymparisto.py -- $D/N5311A-dem2m.raw $D/N5311A-orto-2024.png $ULOS --latvus $ULOS/puut-chm.npy \
  --latvus-r 440 --n1500 $ULOS/n1500-maski.npz --avoin $AVOIN --niitty $NI
echo "== jälki $(date +%H.%M)"; bl --python $H/ymparisto_jalki.py -- $ULOS/puut.json $D/N5311A-dem2m.raw $ULOS
echo "== horisontti $(date +%H.%M)"; bl -P $H/horisontti.py -- $D/dem10m $ULOS
echo "== puukortit $(date +%H.%M)"; bl -P $H/puukortit.py -- $ULOS 512; bl -P $H/puukortit.py -- $ULOS 512 --hamara
echo "== hämärä $(date +%H.%M)"; mkdir -p $ULOS/hamara; sips -s format png $ULOS/ymparisto-8k.jpg --out $ULOS/hamara/albedo-8k.png >/dev/null
bl -P $H/kuori_hamara.py -- $ULOS/ymparisto_kevyt.glb $R $ULOS/hamara 64 4096 --tavoite --albedo $ULOS/hamara/albedo-8k.png
for k in 8 4 2; do mv $ULOS/hamara/ulkokuori-hamara-${k}k.jpg $ULOS/ymparisto-hamara-${k}k.jpg; done; rm -rf $ULOS/hamara
echo "== astc $(date +%H.%M)"
for o in ymparisto-8k ymparisto-4k ymparisto-2k ymparisto-hamara-8k ymparisto-hamara-4k ymparisto-hamara-2k; do
  (cd ${ASTC:h} && nice -n 15 swift ${ASTC:t} $ULOS/$o.jpg $ULOS/$o-4x4.astcm 4 2>&1 | tail -1)
done
rm -f $ULOS/kortti-*.png
echo "== valmis $(date +%H.%M): $ULOS"
