# Codexin puuradio yhtenä kuvana peliin (Linssiseppä 2, 29.9.2026; ~/Documents/Codex/2026-09-29/radio-yksikuva/<versio>):
# radio.png:n alfa ≥ 240 → 255 (Codexin "läpinäkymätön" 240–254 päästää taustan läpi), neula sellaisenaan.
# Kangas pysyy koko kokoisena, koska manifestin koordinaatit (neula, näyttö, asteikko, virta) ovat kankaan pikseleinä.
# Käyttö: python3 tyokalut/radio_yksikuva.py <codex-versiokansio, jossa final/ipad ja final/iphone>
import sys, os
from PIL import Image
D = sys.argv[1]
K = 'Assets/Matkakirja/UI/Resources/RadioUusi'
for v in ['ipad', 'iphone']:
    os.makedirs(f'{K}/{v}', exist_ok=True)
    im = Image.open(f'{D}/final/{v}/radio.png').convert('RGBA')
    a = im.getchannel('A')
    h = a.histogram()
    print(v, 'radio', im.size, 'alfa 240–254:', sum(h[240:255]), '→ 255, osittaiset 1–239:', sum(h[1:240]))
    r, g, b, _ = im.split()
    Image.merge('RGBA', (r, g, b, a.point(lambda x: 255 if x >= 240 else x))).save(f'{K}/{v}/radio.png', optimize=True)
    n = Image.open(f'{D}/final/{v}/vu-neula.png').convert('RGBA')
    n.save(f'{K}/{v}/vu-neula.png', optimize=True)
    print(v, 'vu-neula', n.size)
