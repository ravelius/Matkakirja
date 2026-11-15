"""Kierros 6 arkki KK:lle (KK 15.11. 07.25): Nyt | Uusi -parit Pariisi (p*) + Lontoo (l*) yhdeksi arkiksi, kattavuuskuva perään.
python3 -I arkki6.py [pariisi-ajo] [lontoo-ajo]
Värin mittaus: python3 -I arkki6.py vari <kuva.png> x0 y0 x1 y1  (mediaaniväri suorakaiteesta, kuvan omissa pikseleissä)"""
import os, sys, glob, statistics
from PIL import Image, ImageDraw, ImageFont
L = '/Users/Shared/Claude/proto-3d/lokit'; ULOS = f'{L}/valoseppa-tyyppimallit6-koonti'
F = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)

def vari(p, x0, y0, x1, y1):
    im = Image.open(p).convert('RGB').crop((x0, y0, x1, y1)); px = list(im.getdata())
    m = tuple(int(statistics.median(c[i] for c in px)) for i in range(3)); return '#%02X%02X%02X' % m

def parit(ajo, kirjain):
    nyt = sorted(glob.glob(f'{ajo}/{kirjain}*-nyt.png'), key=lambda p: int(os.path.basename(p)[1:].split('-')[0]))
    r = []
    for p in nyt:
        u = p.replace('-nyt.png', '-uusi.png')
        a = Image.open(p).convert('RGB'); b = Image.open(u).convert('RGB') if os.path.exists(u) else Image.new('RGB', a.size, 'gray')
        k = 900 / a.width; r.append((os.path.basename(p).split('-')[0], a.resize((900, int(a.height * k))), b.resize((900, int(b.height * k)))))
    return r

if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == 'vari':
        print(vari(sys.argv[2], *map(int, sys.argv[3:7]))); sys.exit()
    PA = sys.argv[1] if len(sys.argv) > 1 else f'{L}/valoseppa-tyyppimallit6-pariisi'
    LO = sys.argv[2] if len(sys.argv) > 2 else f'{L}/valoseppa-tyyppimallit6-lontoo'
    os.makedirs(ULOS, exist_ok=True)
    rivit = parit(PA, 'p') + parit(LO, 'l')
    if not rivit: print('ei kuvia', PA, LO); sys.exit(1)
    kat = f'{L}/valoseppa-tyyppimallit6-koonti/kattavuus.png'
    kk = Image.open(kat).convert('RGB') if os.path.exists(kat) else None
    if kk: kk = kk.resize((1800, int(kk.height * 1800 / kk.width)))
    H = sum(a.height + 40 for _, a, _ in rivit) + 70 + (kk.height + 50 if kk else 0)
    im = Image.new('RGB', (1820, H), (246, 242, 234)); dr = ImageDraw.Draw(im)
    dr.text((10, 14), 'Kierros 6 (VS 15.11.): puolikaistat + poisOsm poistotauluihin + Lontoo KC/St Pancras. Vasen NYT, oikea UUSI. EI JUNAAN', fill=(40, 34, 28), font=F(24))
    y = 70
    for t, a, b in rivit:
        dr.text((10, y + 8), f'{t}  NYT', fill='black', font=F(20)); dr.text((930, y + 8), f'{t}  UUSI', fill='black', font=F(20))
        im.paste(a, (10, y + 40)); im.paste(b, (920, y + 40)); y += a.height + 40
    if kk: dr.text((10, y + 10), 'Kattavuus ennen → jälkeen', fill='black', font=F(20)); im.paste(kk, (10, y + 45))
    im.save(f'{ULOS}/tyyppimallit6-nyt-uusi.jpg', quality=86); print(ULOS, len(rivit), 'paria')
