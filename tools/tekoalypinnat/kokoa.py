#!/usr/bin/env python3
"""MATERIAALIKOOSTE (Karttaseppä 9.10.2026, PT: kuparikatot ja aurinkopaneelit säilyvät, sävy kohteeseen).
F-tulos (valokuvamainen) + L-tulos (renderi pohjana, materiaalit säilyvät) → lukitut materiaalit L:stä, muu F:stä (pehmeä reuna 2 px),
sitten sävyn täsmäys materiaaleittain (esim. rappaus → 153,146,131). Materiaalikuva: tasavärit ilman antialiasointia, kartta json
{"#rrggbb": "nimi"} tai {"r,g,b": "nimi"}.
Käyttö: python3 kokoa.py --f F.png --l L.png --materiaali mat.png --kartta mat.json --ulos ulos.png
        [--lukitse kuparikatto,aurinkopaneeli] [--savy rappaus=153,146,131 --savy hiekkakivi=…] [--koko 1600,900]"""
import argparse, json, subprocess, sys, os
from PIL import Image, ImageFilter

def vari(k):
    k = k.strip()
    return tuple(int(k[i:i + 2], 16) for i in (1, 3, 5)) if k.startswith('#') else tuple(int(v) for v in k.split(','))

def maski(mat, varit):
    px = mat.load(); W, H = mat.size; m = Image.new('L', (W, H)); mp = m.load()
    for y in range(H):
        for x in range(W):
            if px[x, y][:3] in varit: mp[x, y] = 255
    return m

def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('--f', required=True); p.add_argument('--l', required=True); p.add_argument('--materiaali', required=True); p.add_argument('--kartta', required=True)
    p.add_argument('--ulos', required=True); p.add_argument('--lukitse', default='kuparikatto,aurinkopaneeli'); p.add_argument('--savy', action='append', default=[])
    p.add_argument('--koko', default='1600,900')
    a = p.parse_args(); W, H = (int(v) for v in a.koko.split(','))
    mat = Image.open(a.materiaali).convert('RGB').resize((W, H), Image.NEAREST)
    kartta = {vari(k): v for k, v in json.load(open(a.kartta)).items()}
    nimet = {}
    for c, n in kartta.items(): nimet.setdefault(n, set()).add(c)
    F = Image.open(a.f).convert('RGB').resize((W, H), Image.LANCZOS); L = Image.open(a.l).convert('RGB').resize((W, H), Image.LANCZOS)
    luk = set(x.strip() for x in a.lukitse.split(',') if x.strip()); lm = Image.new('L', (W, H))
    for n in luk:
        if n in nimet: lm = Image.composite(Image.new('L', (W, H), 255), lm, maski(mat, nimet[n]))
        else: print('ei materiaalia kartassa:', n, file=sys.stderr)
    out = Image.composite(L, F, lm.filter(ImageFilter.GaussianBlur(2)))
    tmp = a.ulos + '.tmp.png'; out.save(tmp)
    savy = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'savy.py')
    for s in a.savy:
        n, kohde = s.split('=')
        if n not in nimet: print('ei materiaalia kartassa:', n, file=sys.stderr); continue
        mp = a.ulos + f'.{n}.png'; maski(mat, nimet[n]).save(mp)
        r = subprocess.run([sys.executable, savy, tmp, tmp, '--kohde', kohde, '--mittaus', mp, '--sovellus', mp, '--koko', a.koko], capture_output=True, text=True)
        print(n, r.stdout.strip() or r.stderr.strip()); os.remove(mp)
    os.replace(tmp, a.ulos)
    print({'ulos': a.ulos, 'lukitut': sorted(luk & set(nimet)), 'materiaalit': sorted(nimet)})

if __name__ == '__main__':
    main()
