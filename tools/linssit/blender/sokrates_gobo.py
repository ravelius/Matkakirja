# Sokrateen bysti: projektorin gobokuva (Linnanrakentaja 1.10.2026). Valkoinen teksti mustalla, PIL.
#   python3 sokrates_gobo.py <ulos.png> [--fontti iowan|baskerville] [rivi1 rivi2 ...]
# Kuvan koko sovitetaan tekstiin (reunus 12 %); Blender-skripti lukee kuvasuhteen kuvasta.
# v1: Platon, Puolustuspuhe 38a kreikaksi (Baskerville: polytoninen kreikka; Iowan Old Style ja Georgia eivät sisällä sitä).
# v2 (omistaja 1.10. 21.4x): suomennos pinnoittain pelin lukufontilla Iowan Old Style.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

A = sys.argv[1:]; ULOS = A.pop(0)
FONTTI = 'baskerville'; TYKKI = False
if A and A[0] == '--fontti':
    FONTTI = A[1]; A = A[2:]
if A and A[0] == '--tykki':   # v3: videotykin kuva 16:9 — teksti 62 % leveydestä, musta taso ja halo
    TYKKI = True; A = A[1:]
if A and A[0] == '--kehys':   # v3b: pelkkä projektorin musta taso 16:9 (staattinen; teksti vierii erikseen)
    from PIL import ImageChops
    RL, RK = 1600, 900
    kehys = ImageChops.multiply(Image.new('L', (RL, RK), 7),
                                Image.radial_gradient('L').resize((RL, RK)).point(lambda v: 255 - int(v * 0.35)))
    kehys.save(ULOS); print('KEHYS', ULOS, kehys.size); sys.exit()
NAUHA = False; HALO = True
if A and A[0] == '--nauha':   # v3b: vierivä tekstinauha (yksi rivi, halo), ilman mustaa tasoa
    NAUHA = True; A = A[1:]
if A and A[0] == '--ei-haloa':   # v4 (omistaja 22.1x): vain kirjaimet, ei halokenttää
    HALO = False; A = A[1:]
RIVIT = A or ['ὁ δὲ ἀνεξέταστος', 'βίος οὐ βιωτὸς', 'ἀνθρώπῳ']
POLKU = {'baskerville': ('/System/Library/Fonts/Supplemental/Baskerville.ttc', 0),
         'iowan': ('/System/Library/Fonts/Supplemental/Iowan Old Style.ttc', 1)}[FONTTI]   # Iowan: lihavoitu luettavuuteen
KOKO = 220; F = ImageFont.truetype(POLKU[0], KOKO, index=POLKU[1]); VALI = int(KOKO * 1.3)
lev = max(F.getbbox(r)[2] - F.getbbox(r)[0] for r in RIVIT); kork = VALI * (len(RIVIT) - 1) + KOKO
L, K = int(lev * 1.12) + 40, int(kork * 1.12 + KOKO * 0.5)
im = Image.new('L', (L, K), 0); d = ImageDraw.Draw(im); y0 = K / 2 - VALI * (len(RIVIT) - 1) / 2
for i, r in enumerate(RIVIT):
    d.text((L / 2, y0 + i * VALI), r, font=F, fill=255, anchor='mm')
im = im.filter(ImageFilter.GaussianBlur(2.0))        # projektorin pehmeys
if NAUHA:
    from PIL import ImageChops
    reuna = im.size[1] // 2; n = Image.new('L', (im.size[0] + 2 * reuna, im.size[1] + reuna), 0)
    n.paste(im, (reuna, reuna // 2)); halo = n.filter(ImageFilter.GaussianBlur(im.size[1] / 9)).point(lambda v: int(v * 0.28))
    im = ImageChops.add(n, halo) if HALO else n
if TYKKI:
    # tekstikuva 16:9-ruutuun; halo (linssin sironta) ja projektorin "musta taso" koko ruutuun
    from PIL import ImageChops
    RL = int(im.size[0] / 0.62); RK = max(int(RL * 9 / 16), im.size[1] + 80)
    ruutu = Image.new('L', (RL, RK), 0); ruutu.paste(im, ((RL - im.size[0]) // 2, (RK - im.size[1]) // 2))
    halo = ruutu.filter(ImageFilter.GaussianBlur(RL / 90)).point(lambda v: int(v * 0.28))
    musta = Image.new('L', (RL, RK), 13)                                       # n. 5 % valoa koko ruudussa (lineaarisena)
    vinjetti = Image.radial_gradient('L').resize((RL, RK)).point(lambda v: 255 - int(v * 0.35))
    musta = ImageChops.multiply(musta, vinjetti)
    im = ImageChops.lighter(ImageChops.add(ruutu, halo), musta)
im.save(ULOS); print('GOBO', ULOS, im.size)
if NAUHA and not HALO:   # v4: epätarkka pari projektorin tarkennuksen pehmeyteen (sama koko, sumennettu)
    sumea = ULOS[:-4] + '-sumea.png'; im.filter(ImageFilter.GaussianBlur(im.size[1] / 40)).save(sumea); print('GOBO', sumea)
