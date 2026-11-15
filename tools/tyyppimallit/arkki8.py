"""Kierros 8 = KK 15.11. 09.30 vaihe 1: arkki p5, p9, p11, p12, l3 (vasen NYT, oikea UUSI) + luvut lokista.
python3 -I arkki8.py [pariisi-ajo] [lontoo-ajo]"""
import os, re, sys
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arkki6 import F, L
ULOS = f'{L}/valoseppa-tyyppimallit8-koonti'
KUVAT = ['p5', 'p9', 'p11', 'p12', 'l3']

def luvut(ajo):
    r = []
    for p in ('unity.log', 'loki.txt'):
        f = f'{ajo}/{p}'
        if not os.path.exists(f): continue
        for rivi in open(f, encoding='utf-8', errors='replace'):
            if ('tyyppimallit' in rivi and 'kartan elämä' in rivi) or 'piirtotilasto' in rivi and 'merkit-' in rivi:
                rivi = rivi.strip()
                if rivi not in r: r.append(rivi)
    return r

if __name__ == '__main__':
    PA = sys.argv[1] if len(sys.argv) > 1 else f'{L}/valoseppa-tyyppimallit8-pariisi'
    LO = sys.argv[2] if len(sys.argv) > 2 else f'{L}/valoseppa-tyyppimallit8-lontoo'
    os.makedirs(ULOS, exist_ok=True)
    rivit = []
    for t in KUVAT:
        ajo = LO if t.startswith('l') else PA
        a, b = f'{ajo}/{t}-nyt.png', f'{ajo}/{t}-uusi.png'
        if not (os.path.exists(a) and os.path.exists(b)): print('puuttuu', t); continue
        a = Image.open(a).convert('RGB'); b = Image.open(b).convert('RGB'); k = 900 / a.width
        rivit.append((t, a.resize((900, int(a.height * k))), b.resize((900, int(b.height * k)))))
    H = sum(a.height + 40 for _, a, _ in rivit) + 70
    im = Image.new('RGB', (1820, H), (246, 242, 234)); dr = ImageDraw.Draw(im)
    dr.text((10, 14), 'Kierros 8 (VS 15.11., KK 09.30 vaihe 1): lopullinen vienti peliin. Vasen NYT, oikea UUSI. EI JUNAAN', fill=(40, 34, 28), font=F(24))
    y = 70
    for t, a, b in rivit:
        dr.text((10, y + 8), f'{t}  NYT', fill='black', font=F(20)); dr.text((930, y + 8), f'{t}  UUSI', fill='black', font=F(20))
        im.paste(a, (10, y + 40)); im.paste(b, (920, y + 40)); y += a.height + 40
    im.save(f'{ULOS}/tyyppimallit8-nyt-uusi.jpg', quality=86)
    with open(f'{ULOS}/luvut.txt', 'w', encoding='utf-8') as f:
        for k, ajo in (('pariisi', PA), ('lontoo', LO)):
            f.write(f'## {k}\n' + '\n'.join(luvut(ajo)) + '\n')
    print(ULOS, len(rivit), 'paria'); print(open(f'{ULOS}/luvut.txt', encoding='utf-8').read())
