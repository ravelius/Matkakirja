"""Kierros 9 = KK 15.11. 12.00 päätös A (kimput): arkki p5, p9, p11, p12, l3 (vasen kierros 8 UUSI, oikea kierros 9 UUSI) + p5 palan nousu 0 | 0.5 | 1
+ luvut lokista (Mac-ajo ja laiteajo). python3 -I arkki9.py [pariisi9] [lontoo9] [laite-pariisi] [laite-lontoo]"""
import os, re, sys
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arkki6 import F, L
from arkki8 import luvut
ULOS = f'{L}/valoseppa-tyyppimallit9-koonti'
KUVAT = ['p5', 'p9', 'p11', 'p12', 'l3']

def laite(ajo):
    r = []
    for p in ('ruutuaika.txt', 'unity.log', 'loki.txt', 'laite.log', 'device.log'):
        f = f'{ajo}/{p}'
        if not os.path.exists(f): continue
        virheet = 0
        for rivi in open(f, encoding='utf-8', errors='replace'):
            if 'Shader error' in rivi: virheet += 1
            if 'lasi: ruutuaika' in rivi or ('kartan elämä' in rivi and 'tyyppimallit' in rivi):
                rivi = rivi.strip()
                if rivi not in r: r.append(rivi)
        r.append(f'{p}: Shader error {virheet}')
    return r

def pienenna(polku, w):
    a = Image.open(polku).convert('RGB'); return a.resize((w, int(a.height * w / a.width)))

if __name__ == '__main__':
    a = sys.argv[1:] + [None] * 4
    PA = a[0] or f'{L}/valoseppa-tyyppimallit9-pariisi'; LO = a[1] or f'{L}/valoseppa-tyyppimallit9-lontoo'
    LPA = a[2] or f'{L}/valoseppa-tyyppimallit9-laite-pariisi'; LLO = a[3] or f'{L}/valoseppa-tyyppimallit9-laite-lontoo'
    P8, L8 = f'{L}/valoseppa-tyyppimallit8-pariisi', f'{L}/valoseppa-tyyppimallit8-lontoo'
    os.makedirs(ULOS, exist_ok=True)
    rivit = []
    for t in KUVAT:
        vanha, uusi = (L8, LO) if t.startswith('l') else (P8, PA)
        x, y = f'{vanha}/{t}-uusi.png', f'{uusi}/{t}-uusi.png'
        if not (os.path.exists(x) and os.path.exists(y)): print('puuttuu', t); continue
        rivit.append((t, pienenna(x, 900), pienenna(y, 900)))
    nousu = [(q, pienenna(f'{PA}/p5-{q}.png', 600)) for q in ('q0', 'q50', 'q100') if os.path.exists(f'{PA}/p5-{q}.png')]
    H = sum(x.height + 40 for _, x, _ in rivit) + 70 + (nousu[0][1].height + 50 if nousu else 0)
    im = Image.new('RGB', (1820, H), (246, 242, 234)); dr = ImageDraw.Draw(im)
    dr.text((10, 14), 'Kierros 9 (VS 15.11., KK 12.00 päätös A: kimput). Vasen kierros 8 UUSI, oikea kierros 9 UUSI. EI JUNAAN', fill=(40, 34, 28), font=F(24))
    y = 70
    for t, x, z in rivit:
        dr.text((10, y + 8), f'{t}  kierros 8', fill='black', font=F(20)); dr.text((930, y + 8), f'{t}  kierros 9', fill='black', font=F(20))
        im.paste(x, (10, y + 40)); im.paste(z, (920, y + 40)); y += x.height + 40
    for i, (q, x) in enumerate(nousu):
        dr.text((10 + i * 605, y + 10), f'p5 palan nousu {dict(q0="0", q50="0,5", q100="1")[q]}', fill='black', font=F(20))
        im.paste(x, (10 + i * 605, y + 45))
    im.save(f'{ULOS}/tyyppimallit9-k8-k9.jpg', quality=86)
    with open(f'{ULOS}/luvut.txt', 'w', encoding='utf-8') as f:
        for k, ajo in (('pariisi', PA), ('lontoo', LO)): f.write(f'## {k}\n' + '\n'.join(luvut(ajo)) + '\n')
        for k, ajo in (('laite pariisi', LPA), ('laite lontoo', LLO)): f.write(f'## {k}\n' + '\n'.join(laite(ajo)) + '\n')
    print(ULOS, len(rivit), 'paria,', len(nousu), 'nousukuvaa'); print(open(f'{ULOS}/luvut.txt', encoding='utf-8').read())
