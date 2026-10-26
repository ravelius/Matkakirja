#!/bin/zsh
# OLAVINLINNAN YMPÄRISTÖN KOKO KETJU (Linnanrakentaja 1.10.2026; laatusuunnitelman vaihe 5, aikakerros n1500).
# MML:n aineistot (CC BY 4.0, _lahteet/mml-kyronsalmi/LAHDE.md) → kaupunkimaski → puut → maasto ja ortokuva →
# pienmuodot → puulista ja syvyys → horisontti → puukortit (päivä, hämärä) → lähimaasto (kerrosmaskit, CC0-kerrokset,
# aluskasvit, makro kerroksista, rantaviiva) → maaston hämärä → ASTC.
#   nice -n 15 tools/dioraama/blender/ymparisto_putki.sh <ulos-kansio> [--avoin 350]
# Tulos kansioon, jonka vie-blender.sh vie polkuun blender/ymparisto/ (lähde olavinlinna-blender/ymparisto).
set -euo pipefail
ULOS=${1:?anna ulos-kansio}; shift; AVOIN=350; [ "${1:-}" = --avoin ] && AVOIN=$2
B=/Applications/Blender.app/Contents/MacOS/Blender; H=${0:A:h}
L=/Users/Shared/Claude/proto-3d/_lahteet; D=$L/mml-kyronsalmi; PY=$L/venv-laser/bin/python
NI=$L/polyhaven/aerial/aerial_grass_rock_diff_4k.jpg; ASTC=/Users/Shared/Claude/proto-3d/tyokalut/astc-mip.swift
R=/Users/Shared/Claude/proto-3d/_valmiit/linna-kertoja/paketti/olavinlinna/rakennus.json
mkdir -p $ULOS
bl() { nice -n 15 $B -b --factory-startup "$@" 2>&1 | grep -E '^(YMP|PUUT|JALKI|HOR|KORTIT|HAMARA|N1500|ALUSKASVIT|Error|Traceback)' || true; }
echo "== n1500 $(date +%H.%M)"; nice -n 15 $PY $H/ymparisto_n1500.py $D/mtk $D/N5311A-orto-2024.png $ULOS/n1500-maski.npz | tail -2
echo "== puut $(date +%H.%M)"; nice -n 15 $PY $H/ymparisto_puut.py $D/laser $D/N5311A-dem2m.raw $D/N5311A-orto-2024.png $ULOS/puut.json \
  --n1500 $ULOS/n1500-maski.npz --avoin $AVOIN | grep -E 'PUUT: [0-9]'
echo "== pienmuodot $(date +%H.%M)"; nice -n 15 $PY $H/maasto_kohouma.py $D/N5311A-dem2m.raw $ULOS --avoin $AVOIN | tail -1
echo "== maasto $(date +%H.%M)"; bl -P $H/ymparisto.py -- $D/N5311A-dem2m.raw $D/N5311A-orto-2024.png $ULOS --latvus $ULOS/puut-chm.npy \
  --latvus-r 440 --n1500 $ULOS/n1500-maski.npz --avoin $AVOIN --niitty $NI --kohouma $ULOS/kohouma.npz
echo "== jälki $(date +%H.%M)"; bl --python $H/ymparisto_jalki.py -- $ULOS/puut.json $D/N5311A-dem2m.raw $ULOS
echo "== horisontti $(date +%H.%M)"; bl -P $H/horisontti.py -- $D/dem10m $ULOS
echo "== puukortit $(date +%H.%M)"; bl -P $H/puukortit.py -- $ULOS 512; bl -P $H/puukortit.py -- $ULOS 512 --hamara
echo "== lähimaasto $(date +%H.%M)"; nice -n 15 $PY $H/maasto_splat.py $D/N5311A-dem2m.raw $ULOS --avoin $AVOIN | tail -2
mkdir -p $ULOS/maasto; rm -f $ULOS/maasto/*_1k.jpg  # vain maasto.json:n kerrokset (vie-blender.sh vie kaikki *_1k.jpg:t)
for l in $(python3 -c "import json; print(' '.join(k['lahde'] for k in json.load(open('$ULOS/maasto.json'))['kerrokset']))"); do
  cp $L/polyhaven/maasto/${l}_diff_1k.jpg $L/polyhaven/maasto/${l}_nor_gl_1k.jpg $ULOS/maasto/; done
bl -P $H/aluskasvit.py -- $ULOS 256; bl -P $H/aluskasvit.py -- $ULOS 256 --hamara
nice -n 15 $PY $H/makro_kerroksista.py $ULOS $L/polyhaven/maasto | cut -c1-60
nice -n 15 $PY $H/makro_ranta.py $ULOS  # märkä rantakaista ja vaahto vesirajaan (1.10.)
echo "== hämärä $(date +%H.%M)"; mkdir -p $ULOS/hamara; sips -s format png $ULOS/ymparisto-8k.jpg --out $ULOS/hamara/albedo-8k.png >/dev/null
bl -P $H/kuori_hamara.py -- $ULOS/ymparisto_kevyt.glb $R $ULOS/hamara 64 4096 --tavoite --albedo $ULOS/hamara/albedo-8k.png
for k in 8 4 2; do mv $ULOS/hamara/ulkokuori-hamara-${k}k.jpg $ULOS/ymparisto-hamara-${k}k.jpg; done; rm -rf $ULOS/hamara
echo "== astc $(date +%H.%M)"
for o in ymparisto-8k ymparisto-4k ymparisto-2k ymparisto-hamara-8k ymparisto-hamara-4k ymparisto-hamara-2k; do
  (cd ${ASTC:h} && nice -n 15 swift ${ASTC:t} $ULOS/$o.jpg $ULOS/$o-4x4.astcm 4 2>&1 | tail -1)
done
rm -f $ULOS/kortti-*.png
echo "== valmis $(date +%H.%M): $ULOS"
