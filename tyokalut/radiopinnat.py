#!/usr/bin/env python3
"""RADIOPANEELIN PINNAT (Linssiseppä 24.9.2026, radiouudistus build 12; suunnitelma luku 2).

Leipoo kuvaputken tekstuurit (2048 px, saumattomat, PD/CC0) UI Toolkitin kuviksi. UI Toolkit ei valaise
kuvia, joten normal- ja roughness-kartta leivotaan värikuvaan kiinteällä valolla vasemmalta ylhäältä:

    väri' = väri × (ambient + diffuusi · max(0, N·L)) + kiilto · (1 − roughness) · max(0, N·H)^16
    L = normalize(−0,4, 0,6, 0,7), ambient 0,55, diffuusi 0,6, kiilto 0,25

Syötteet kansiossa (nimi.png pakollinen, nimi-normal.png ja nimi-roughness.png jos lähde tarjoaa):
    puu, messinki, lasi, paperi
Tulosteet (Assets/Matkakirja/UI/Resources/Radio/ tai --ulos):
    radio-kotelo.png   1024 × 320  (9-slice, puu)
    radio-kehys.png     128 × 128  (9-slice, messinki, keskellä reikä)
    radio-lasi.png      512 × 128  (heijastus + naarmut alfana)
    radio-vu-levy.png   256 × 180  (paperi)
    radio-viivain.png   512 ×  64  (paperi, toistuva vaakasuunnassa)

Käyttö:
    python3 tyokalut/radiopinnat.py <syötekansio> [--ulos kansio]
    python3 tyokalut/radiopinnat.py --koe <kansio>   # proseduraaliset sijaissyötteet testiin
Vain Pillow (ei numpyä). ASTC-pakkaus tehdään Unityn tuonnissa (TextureImporter), ei täällä.
"""
import math
import os
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageMath

VALO = (-0.4, 0.6, 0.7)
# Kuvaputki toimitti harjatun alumiinin (ambientCG Metal009): messingin sävy kerrotaan päälle.
MESSINKI = (1.0, 0.80, 0.46)
# Sävyt ja kirkkaus kotelon webin liukuvärin (#8f5f2f → #33200f) ja webin asteikkopaperin (#efdcb4) suuntaan.
SAVYT = {'puu': (1.45, 1.30, 1.15), 'messinki': MESSINKI, 'paperi': (1.08, 1.0, 0.80)}
# Lähteet (kuvaputki 24.9.2026, posti/kuvatoimitus-radiopaneeli-20260924.json; CC0, attribuutio vapaaehtoinen).
LAHTEET = {
    'puu': 'ambientCG Wood027 (CC0) https://ambientcg.com/view?id=Wood027',
    'messinki': 'ambientCG Metal009 (CC0) https://ambientcg.com/view?id=Metal009, messingin sävy',
    'lasi': 'ambientCG Plastic013B (CC0) https://ambientcg.com/view?id=Plastic013B',
    'paperi': 'ambientCG Paper006 (CC0) https://ambientcg.com/view?id=Paper006',
}
AMBIENT, DIFFUUSI, KIILTO = 0.55, 0.6, 0.25

_n = math.sqrt(sum(c * c for c in VALO))
L = tuple(c / _n for c in VALO)
_h = (L[0], L[1], L[2] + 1.0)
_hn = math.sqrt(sum(c * c for c in _h))
H = tuple(c / _hn for c in _h)

KOOT = {
    'radio-kotelo': ('puu', (1024, 320)),
    'radio-kehys': ('messinki', (128, 128)),
    'radio-lasi': ('lasi', (512, 128)),
    'radio-vu-levy': ('paperi', (256, 180)),
    'radio-viivain': ('paperi', (512, 64)),
}


def lue(kansio, nimi, tila='RGB'):
    p = os.path.join(kansio, nimi + '.png')
    return Image.open(p).convert(tila) if os.path.exists(p) else None


def leivo(vari, normaali=None, karheus=None):
    """Valo leivottuna väriin. Ilman normal-karttaa pinta on tasainen (N = (0, 0, 1))."""
    if normaali is None:
        nl, nh = L[2], H[2]
        kerroin = AMBIENT + DIFFUUSI * nl
        kanavat = [ImageMath.lambda_eval(lambda a: a['c'] * kerroin, c=c.convert('F')) for c in vari.split()]
        kiilto = None
    else:
        nr, ng, nb = (c.convert('F') for c in normaali.resize(vari.size).split())
        # OpenGL-normaalit: 0…255 → −1…1 (Unity-tyyli, Y ylös).
        nl = ImageMath.lambda_eval(
            lambda a: a['max']((a['r'] / 127.5 - 1) * L[0] + (a['g'] / 127.5 - 1) * L[1] + (a['b'] / 127.5 - 1) * L[2], 0),
            r=nr, g=ng, b=nb)
        nh = ImageMath.lambda_eval(
            lambda a: a['max']((a['r'] / 127.5 - 1) * H[0] + (a['g'] / 127.5 - 1) * H[1] + (a['b'] / 127.5 - 1) * H[2], 0),
            r=nr, g=ng, b=nb)
        kanavat = [ImageMath.lambda_eval(lambda a: a['c'] * (AMBIENT + DIFFUUSI * a['n']), c=c.convert('F'), n=nl)
                   for c in vari.split()]
        k = karheus.resize(vari.size).convert('F') if karheus is not None else None
        # max(0, N·H)^16 neljällä neliöinnillä (ImageMathissa ei ole potenssia).
        p = nh
        for _ in range(4):
            p = ImageMath.lambda_eval(lambda a: a['p'] * a['p'], p=p)
        if k is not None:
            kiilto = ImageMath.lambda_eval(lambda a: a['p'] * (1 - a['k'] / 255) * (255 * KIILTO), p=p, k=k)
        else:
            kiilto = ImageMath.lambda_eval(lambda a: a['p'] * (255 * KIILTO * 0.5), p=p)
    if kiilto is not None:
        kanavat = [ImageMath.lambda_eval(lambda a: a['c'] + a['s'], c=c, s=kiilto) for c in kanavat]
    return Image.merge('RGB', [c.convert('L') for c in kanavat])


def rajaa(kuva, koko):
    """Keskeltä rajattu ja skaalattu tekstuurin pala (saumaton lähde, joten mikä tahansa kohta kelpaa)."""
    w, h = koko
    s = max(w / kuva.width, h / kuva.height, 0.5)
    k = kuva.resize((max(w, int(kuva.width * s)), max(h, int(kuva.height * s))), Image.LANCZOS)
    x, y = (k.width - w) // 2, (k.height - h) // 2
    return k.crop((x, y, x + w, y + h))


def reunavarjo(kuva, sade, voima=0.35, pyoristys=18):
    """Kotelon reunan tummennus ja pyöristetty alfa (9-slicen kulmat)."""
    w, h = kuva.size
    maski = Image.new('L', (w, h), 0)
    ImageDraw.Draw(maski).rounded_rectangle((0, 0, w - 1, h - 1), pyoristys, fill=255)
    sisa = Image.new('L', (w, h), 0)
    ImageDraw.Draw(sisa).rounded_rectangle((sade, sade, w - 1 - sade, h - 1 - sade), pyoristys, fill=255)
    sisa = sisa.filter(ImageFilter.GaussianBlur(sade / 2))
    tumma = Image.new('RGB', (w, h), (0, 0, 0))
    varjo = Image.eval(sisa, lambda v: int(255 - (255 - v) * voima))
    tulos = Image.composite(kuva, tumma, varjo).convert('RGBA')
    tulos.putalpha(maski)
    return tulos


def kehys(messinki, koko=128, reika=96):
    w = koko
    k = rajaa(messinki, (w, w)).convert('RGBA')
    m = Image.new('L', (w, w), 255)
    r = (w - reika) // 2
    ImageDraw.Draw(m).rounded_rectangle((r, r, w - 1 - r, w - 1 - r), 6, fill=0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, w - 1), 10, outline=255)
    ulko = Image.new('L', (w, w), 0)
    ImageDraw.Draw(ulko).rounded_rectangle((0, 0, w - 1, w - 1), 10, fill=255)
    k.putalpha(ImageChops.multiply(m, ulko))
    return k


def savyta(kuva, savy):
    return Image.merge('RGB', [c.point(lambda v, k=k: min(255, int(v * k))) for c, k in zip(kuva.split(), savy)])


def _lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def lineaarinen_alfa(a8, tausta=0.08):
    a = a8 / 255
    lb = _lin(tausta)
    return int(round(255 * max(0.0, (_lin(a + (1 - a) * tausta) - lb) / (1 - lb))))


def lasi(naarmut, koko):
    """Heijastus viistona kaistana ja naarmut alfana (valkoinen päällyskuva)."""
    w, h = koko
    n = rajaa(naarmut.convert('RGB'), koko).convert('L')
    pehmea = n.filter(ImageFilter.GaussianBlur(3))
    ylipaasto = ImageChops.subtract(n, pehmea, scale=1, offset=0)
    naarmualfa = Image.eval(ylipaasto, lambda v: min(46, v))
    heijastus = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(heijastus)
    for y in range(h):
        a = max(0.0, 1 - y / (h * 0.38))
        d.line([(0, y), (w, y - h * 0.1)], fill=int(34 * a))
    alfa = ImageChops.add(heijastus, naarmualfa)
    # LINEAARINEN VÄRIAVARUUS (Natiivi-UI:n oppi): Unity sekoittaa alfan lineaarisena, joten valkoinen päällyskuva
    # vaalentaisi tummaa LCD-lasia moninkertaisesti selaimen sRGB-sekoitukseen nähden. Alfa muunnetaan niin, että
    # tulos tummalla lasilla (B = 0,08) on sama kuin sRGB-sekoituksessa: a' = (lin(a + (1 − a)B) − lin(B)) / (1 − lin(B)).
    alfa = alfa.point(lineaarinen_alfa)
    tulos = Image.new('RGBA', (w, h), (255, 255, 255, 0))
    tulos.putalpha(alfa)
    return tulos


def koe(kansio):
    """Proseduraaliset sijaissyötteet: työkalun testi ennen kuvaputken toimitusta."""
    os.makedirs(kansio, exist_ok=True)
    s = 512
    puu = Image.new('RGB', (s, s))
    d = ImageDraw.Draw(puu)
    for x in range(s):
        v = 0.5 + 0.25 * math.sin(x * 0.11) + 0.15 * math.sin(x * 0.037 + 1.3)
        d.line([(x, 0), (x, s)], fill=(int(120 * v + 40), int(70 * v + 20), int(30 * v + 8)))
    puu.save(os.path.join(kansio, 'puu.png'))
    normaali = Image.new('RGB', (s, s))
    d = ImageDraw.Draw(normaali)
    for x in range(s):
        nx = 0.3 * math.cos(x * 0.11)
        d.line([(x, 0), (x, s)], fill=(int((nx + 1) * 127.5), 128, int((math.sqrt(1 - nx * nx) + 1) * 127.5)))
    normaali.save(os.path.join(kansio, 'puu-normal.png'))
    Image.new('L', (s, s), 90).save(os.path.join(kansio, 'puu-roughness.png'))
    Image.new('RGB', (s, s), (190, 150, 80)).save(os.path.join(kansio, 'messinki.png'))
    Image.effect_noise((s, s), 40).convert('RGB').save(os.path.join(kansio, 'lasi.png'))
    Image.new('RGB', (s, s), (232, 214, 170)).save(os.path.join(kansio, 'paperi.png'))


def main(argv):
    if len(argv) >= 2 and argv[0] == '--koe':
        koe(argv[1])
        argv = [argv[1]] + argv[2:]
    if not argv:
        print(__doc__)
        return 2
    lahde = argv[0]
    ulos = argv[argv.index('--ulos') + 1] if '--ulos' in argv else os.path.join(
        os.path.dirname(__file__), '..', 'Assets', 'Matkakirja', 'UI', 'Resources', 'Radio')
    os.makedirs(ulos, exist_ok=True)
    leivotut = {}
    for nimi in ('puu', 'messinki', 'paperi'):
        v = lue(lahde, nimi)
        if v is None:
            print(f'puuttuu: {nimi}.png')
            return 1
        if nimi in SAVYT:
            v = savyta(v, SAVYT[nimi])
        leivotut[nimi] = leivo(v, lue(lahde, nimi + '-normal'), lue(lahde, nimi + '-roughness', 'L'))
    naarmut = lue(lahde, 'lasi', 'RGBA')
    if naarmut is None:
        print('puuttuu: lasi.png')
        return 1
    for tiedosto, (lahdenimi, koko) in KOOT.items():
        if tiedosto == 'radio-kotelo':
            kuva = reunavarjo(rajaa(leivotut['puu'], koko), 22)
        elif tiedosto == 'radio-kehys':
            kuva = kehys(leivotut['messinki'], koko[0])
        elif tiedosto == 'radio-lasi':
            kuva = lasi(naarmut, koko)
        else:
            kuva = rajaa(leivotut['paperi'], koko)
        p = os.path.join(ulos, tiedosto + '.png')
        kuva.save(p, optimize=True)
        print(f'{tiedosto}.png {kuva.size[0]} × {kuva.size[1]} {os.path.getsize(p) // 1024} kt')
    # Tekijätiedot (Raamattu: attribuutio ambientCG) samaan kansioon; Natiivi-UI:n tekijäsivu lukee tämän.
    with open(os.path.join(ulos, 'radio-pinnat-lahteet.txt'), 'w', encoding='utf-8') as f:
        f.write('Radiopaneelin pinnat (tyokalut/radiopinnat.py, valo leivottu vasemmalta ylhäältä)\n')
        for nimi, rivi in LAHTEET.items():
            f.write(f'{nimi}: {rivi}\n')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
