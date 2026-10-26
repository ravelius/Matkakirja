# Myllyn laudat, jälkikäsittely (Linnanrakentaja 1.10.2026): Blenderin kerrokset → toimituskansio (suora alfa).
#   python3 mylly_jalki.py <renderikansio> <ulos> [<malli-kansio> <kuvat-ulos>]
# - lauta, nappulat: alfa ≥ 240 → 255 (vuotava 245–254-alfa näkyy UI:ssa reunana)
# - varjo: alfa × 0,6, alle 4 → 0 (varjonsieppaajan kohina)
# - hehku: Blenderin AgX haalistaa emission, joten hehku kootaan alfasta: kultainen ydin + pehmeä halo (suora alfa)
# - mallikuvat: myllyn (0, 1, 2) hehku lasketaan mallin päälle samalla rajauksella kuin koodissa
import json, os, shutil, sys
from PIL import Image, ImageChops, ImageFilter

R, U = sys.argv[1], sys.argv[2]
os.makedirs(U, exist_ok=True)
YDIN, HALO = (255, 200, 110), (255, 150, 40)


def taysi_alfa(im, raja=240):
    r, g, b, a = im.split(); return Image.merge('RGBA', (r, g, b, a.point(lambda v: 255 if v >= raja else v)))


def hehku(im):
    a = im.getchannel('A')
    ydin = a.point(lambda v: min(255, int(v * 1.1)))
    halo = a.filter(ImageFilter.GaussianBlur(9)).point(lambda v: min(255, int(v * 1.6)))
    alfa = ImageChops.lighter(ydin, halo)
    # väri: ytimessä vaalea kulta, halossa syvempi oranssinkulta (suora alfa: väri ei riipu alfasta)
    v = Image.composite(Image.new('RGB', im.size, YDIN), Image.new('RGB', im.size, HALO), ydin)
    return Image.merge('RGBA', (*v.split(), alfa))


for f in sorted(os.listdir(R)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(R, f)).convert('RGBA')
    if f.startswith('hehku-'):
        im = hehku(im)
    elif f.startswith('nappula-varjo-'):
        r, g, b, a = im.split(); im = Image.merge('RGBA', (r, g, b, a.point(lambda v: 0 if v < 4 else int(v * 0.6))))
    elif f.startswith(('lauta-', 'nappula-')):
        im = taysi_alfa(im)
    im.save(os.path.join(U, f), optimize=True)
    print(f, im.size)

if len(sys.argv) > 4:
    M, K = sys.argv[3], sys.argv[4]
    P = json.load(open(os.path.join(U, 'pisteet.json')))['pisteet']
    for t in ('majatalo', 'luostari', 'viikinkilaiva'):
        m = Image.open(os.path.join(M, f'malli-{t}.png')).convert('RGBA'); S = m.size[0]
        h = Image.open(os.path.join(U, f'hehku-{t}.png')).resize(m.size, Image.LANCZOS)
        xs = [P[i][0] for i in (0, 1, 2)]; ys = [P[i][1] for i in (0, 1, 2)]
        laatikko = tuple(int(round(v * S)) for v in (min(xs) - 0.03, min(ys) - 0.03, max(xs) + 0.03, max(ys) + 0.03))
        maski = Image.new('L', m.size, 0); maski.paste(255, laatikko)
        # natiivissa hehku piirretään nappuloiden alle; mallikuvassa nappulat ovat jo kuvassa → ympyrät pois maskista
        from PIL import ImageDraw
        d = ImageDraw.Draw(maski); r = 0.049 * S
        for i in (0, 1, 2):
            cx, cy = P[i][0] * S, P[i][1] * S; d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=0)
        h.putalpha(ImageChops.multiply(h.getchannel('A'), maski))
        m.alpha_composite(h); m.save(os.path.join(K, f'malli-{t}.png')); print('malli', t)
