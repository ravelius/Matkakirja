#!/bin/zsh
# Myllyn laudat: kaikki kerrokset, jälkikäsittely ja mallikuvat yhdellä ajolla (Linnanrakentaja 3.10.2026).
#   tools/linssit/blender/mylly_laudat.sh <toimituskansio, esim. …/_valmiit/mylly-laudat/v2> [naytteita]
# Välivaiheet: <toimituskansio>-renderit/ (Blenderin raakakerrokset ja mallit). Mallikuvat → docs/raportit/kuvat/mylly-lauta-20261001/.
set -e
U=${1:?toimituskansio}; N=${2:-128}
B=/Applications/Blender.app/Contents/MacOS/Blender
D=${0:A:h}; REPO=${D:h:h:h}; R=$U-renderit; K=$REPO/docs/raportit/kuvat/mylly-lauta-20261001
mkdir -p $U $R/mallit
aja() { nice -n 10 $B -b -P $D/mylly_lauta.py -- "$@" 2>&1 | grep -E 'MYLLY|Error|Traceback' || true; }
for t in majatalo luostari viikinkilaiva; do
  aja --tyyli $t --naytteita $N --kerros lauta $R/lauta-$t.png
  aja --tyyli $t --naytteita $N --kerros hehku $R/hehku-$t.png
  for k in vaalea tumma varjo; do aja --tyyli $t --naytteita $N --kerros $k $R/nappula-$k-$t.png; done
  aja --tyyli $t --naytteita $N --malli $R/mallit/malli-$t.png
done
for k in valittu poistettava kohde; do aja --tyyli majatalo --naytteita $N --kerros $k $R/rengas-$k.png; done
aja --json $U/pisteet.json
python3 $D/mylly_jalki.py $R $U $R/mallit $R/mallit
# mallikuvat: iPhone @3x (koko lauta) ja iPad @2x (vasen yläneljännes), otsikkopalkki
python3 - "$R/mallit" "$K" "$U" <<'PY'
import sys
from PIL import Image, ImageDraw, ImageFont
R, K, U = sys.argv[1], sys.argv[2], sys.argv[3]
NIMET = {'majatalo': 'Majatalo 1873', 'luostari': 'Luostari 1200-l.', 'viikinkilaiva': 'Viikinkilaiva n. 900'}
try: F = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 34)
except OSError: F = ImageFont.load_default()
def arkki(koko, rajaus, otsikko, ulos):
    W, P = koko, 60; out = Image.new('RGB', (3 * W + 2 * 12, W + P), (24, 24, 28)); d = ImageDraw.Draw(out)
    for i, t in enumerate(NIMET):
        m = Image.open(f'{R}/malli-{t}.png').convert('RGBA'); S = m.size[0]
        if rajaus: m = m.crop((0, 0, S // 2, S // 2))
        m = m.resize((W, W), Image.LANCZOS); x = i * (W + 12)
        tausta = Image.new('RGBA', (W, W), (24, 24, 28, 255)); tausta.alpha_composite(m)
        out.paste(tausta.convert('RGB'), (x, P)); d.text((x + 6, 12), f'{NIMET[t]} · {otsikko}', fill=(240, 240, 240), font=F)
    out.save(ulos, quality=88); print('kuva', ulos)
arkki(1123, False, 'iPhone @3x', f'{K}/laudat-kolme.jpg')
arkki(976, True, 'iPad @2x, neljännes', f'{K}/laudat-kolme-ipad.jpg')
# kerroskoe: viikinkilaiva koottuna pelkistä toimituskerroksista kuten natiivi (lauta → rajattu hehku → varjo → nappula → rengas)
import json
J = json.load(open(f'{U}/pisteet.json')); P = J['pisteet']; t = 'viikinkilaiva'
k = Image.open(f'{U}/lauta-{t}.png').convert('RGBA'); S = k.size[0]
h = Image.open(f'{U}/hehku-{t}.png'); xs = [P[i][0] for i in (0, 1, 2)]; ys = [P[i][1] for i in (0, 1, 2)]
maski = Image.new('L', h.size, 0); maski.paste(255, tuple(int(round(v * S)) for v in (min(xs) - .03, min(ys) - .03, max(xs) + .03, max(ys) + .03)))
from PIL import ImageChops
h.putalpha(ImageChops.multiply(h.getchannel('A'), maski)); k.alpha_composite(h)
def kuva(nimi, i, dy=0):
    im = Image.open(f'{U}/{nimi}').convert('RGBA'); k.alpha_composite(im, (int(P[i][0] * S - im.size[0] / 2), int(P[i][1] * S - im.size[1] / 2 + dy)))
for i in (0, 1, 2, 7, 15): kuva(f'nappula-varjo-{t}.png', i)
for i in (9, 11, 21, 12): kuva(f'nappula-varjo-{t}.png', i)
for i in (0, 1, 2, 7, 15): kuva(f'nappula-vaalea-{t}.png', i)
for i in (9, 11, 21, 12): kuva(f'nappula-tumma-{t}.png', i)
kuva('rengas-valittu.png', 15); kuva('rengas-poistettava.png', 12); kuva('rengas-kohde.png', 13)
k.convert('RGB').save(f'{K}/kerroskoe-viikinkilaiva.jpg', quality=88); print('kuva kerroskoe')
PY
(cd $U && shasum -a 256 *.png pisteet.json > SHA256SUMS && cp $REPO/docs/raportit/mylly-laudat-20261001.md LAHTEET.md)
echo "MYLLY: valmis $U ($(shasum -a 256 $U/SHA256SUMS | cut -c1-16))"
