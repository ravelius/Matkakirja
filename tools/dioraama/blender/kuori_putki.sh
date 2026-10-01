#!/bin/zsh
# OLAVINLINNAN KUOREN KOKO KETJU YHDELLÄ AJOLLA (Linnanrakentaja 30.9.2026, kuori v16 = romusiivous + laatusuunnitelman
# vaihe 4). Senaatin OBJ (CC BY 4.0) → siivottu kuori (kuori_siivous.py) → laatutasot (kuori_lod.py) → 8k-albedo
# (Real-ESRGAN x4plus, 16k → 8k) → hämärä (kuori_hamara.py --tavoite --albedo: 4k-valo × 8k-albedo) → ikkunat
# (kuori_ikkunat.py) → ASTC 4×4 (astc-mip.swift) → materiaalimaski ja AO (kuori_maski_ao.py). Tulos uuteen kansioon;
# nykyinen ulkokuori/ säilyy, kunnes tulos on todennettu ja vaihdettu (ks. ulkokuori/LAHDE.md).
#   nice -n 15 tools/dioraama/blender/kuori_putki.sh <ulos-kansio> [rakennus.json] [--alkaen vaihe]
#   vaiheet: kuori lod esrgan hamara ikkunat astc maski
# Raskas (noin 1–2 h Mac Studiolla): odottaa, jos omistaja on laittanut koneen kevyeen tilaan (tools/gpu-vapaa.sh).
set -euo pipefail
ULOS=${1:?anna ulos-kansio}; shift
RAK=/Users/Shared/Claude/proto-3d/_valmiit/linna-kertoja/paketti/olavinlinna/rakennus.json
[ $# -gt 0 ] && [ "$1" != --alkaen ] && { RAK=$1; shift; }
ALKAEN=kuori; [ "${1:-}" = --alkaen ] && ALKAEN=$2
B=/Applications/Blender.app/Contents/MacOS/Blender
H=${0:A:h}; REPO=${H:h:h:h}
OBJ=/Users/Shared/Claude/proto-3d/_lahteet/olavinlinna-senaatti/source/Olavinlinna_vedessa2.obj
ESRGAN=/Users/Shared/Claude/proto-3d/_lahteet/realesrgan
ASTC=/Users/Shared/Claude/proto-3d/tyokalut/astc-mip.swift
U=$ULOS/ulkokuori; mkdir -p $U $ULOS/raaka $ULOS/hamara
VAIHEET=(kuori lod esrgan hamara ikkunat astc maski); ajo=0
vaihe() {  # vaihe <nimi>: tosi, jos vaihe ajetaan (--alkaen); odottaa kevyen tilan ohi
  [ "$1" = "$ALKAEN" ] && ajo=1
  [ $ajo = 1 ] || { echo "== ohitetaan $1"; return 1; }
  while ! "$REPO/tools/gpu-vapaa.sh" >/dev/null; do echo "   kevyt tila, odotetaan 5 min"; sleep 300; done
  echo "== $1 $(date +%H.%M)"
}
bl() { nice -n 15 $B -b --factory-startup -P "$@" 2>&1 | grep -E '^(KUORI|SIIVOUS|LOD|HAMARA|IKKUNAT|MASKI|AO|Error|Traceback)' || true; }

if vaihe kuori; then
  bl $H/ulkokuori.py -- $OBJ $ULOS/raaka --siivoa
  cp $ULOS/raaka/ulkokuori_huippu.glb $U/
  sips -s format jpeg -s formatOptions 90 $ULOS/raaka/tekstuuri_siivottu.png --out $U/ulkokuori-4k.jpg >/dev/null
  sips -Z 2048 -s format jpeg -s formatOptions 90 $ULOS/raaka/tekstuuri_siivottu.png --out $U/ulkokuori-2k.jpg >/dev/null
fi
if vaihe lod; then
  bl $H/kuori_lod.py -- $U/ulkokuori_huippu.glb $ULOS/raaka/ulkokuori_normaali.glb $U/ulkokuori_normaali.glb 80000
  bl $H/kuori_lod.py -- $U/ulkokuori_huippu.glb $ULOS/raaka/ulkokuori_kevyt.glb $U/ulkokuori_kevyt.glb 40000
fi
if vaihe esrgan; then
  # Häviöttömästä PNG:stä (laatusuunnitelman vaihe 1), ei JPEG:stä.
  (cd $ESRGAN && nice -n 15 ./realesrgan-ncnn-vulkan -i $ULOS/raaka/tekstuuri_siivottu.png -o $ULOS/raaka/albedo-16k.png \
     -n realesrgan-x4plus -s 4 -t 256 -f png 2>&1 | tail -1)
  sips -Z 8192 $ULOS/raaka/albedo-16k.png --out $ULOS/raaka/albedo-8k.png >/dev/null
  sips -s format jpeg -s formatOptions 90 $ULOS/raaka/albedo-8k.png --out $U/ulkokuori-8k.jpg >/dev/null
  rm -f $ULOS/raaka/albedo-16k.png
fi
if vaihe hamara; then
  bl $H/kuori_hamara.py -- $U/ulkokuori_huippu.glb $RAK $ULOS/hamara 128 4096 --tavoite --albedo $ULOS/raaka/albedo-8k.png \
    --tasoita $ULOS/raaka/siivousmaski.png
fi
if vaihe ikkunat; then
  bl $H/kuori_ikkunat.py -- $U/ulkokuori_huippu.glb $U/ulkokuori-4k.jpg $ULOS/hamara/ulkokuori-hamara-8k.jpg $U \
    --luettelo $H/olavinlinna-ikkunat.json --kaikki
  cp $ULOS/hamara/ulkokuori-valokartta-4k.exr $U/
fi
if vaihe astc; then
  for o in ulkokuori-8k ulkokuori-4k ulkokuori-2k ulkokuori-hamara-8k ulkokuori-hamara-4k ulkokuori-hamara-2k; do
    (cd ${ASTC:h} && nice -n 15 swift ${ASTC:t} $U/$o.jpg $U/$o-4x4.astcm 4 2>&1 | tail -1)
  done
fi
if vaihe maski; then
  bl $H/kuori_maski_ao.py -- $U/ulkokuori_huippu.glb $U/hybridi --koko 2048 --ao-naytteita 64
fi
echo "== valmis $(date +%H.%M): $U"; ls -la $U
