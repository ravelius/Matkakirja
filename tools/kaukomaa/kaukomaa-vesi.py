"""KAUKOMAAN VESI (Karttaseppä 9.10.2026): avomeren rannikkorampin laikut ja meriväriraja pois kaukomaasta.
Vesi (vesimaski, pehmeä 0–255) yhdellä värillä = keskustan z13-laattojen puhtaan veden (maski ≥ 250) mediaani; maa ennallaan.
Käyttö: python3 kaukomaa-vesi.py <paikka-kansio>   → <kansio>/laatat-v/{z}/{x}/{y}.jpg"""
import os, sys, json
from PIL import Image, ImageFilter
D = sys.argv[1]; L, V, U = f'{D}/laatat', f'{D}/vesi', f'{D}/laatat-v'
assert not os.path.exists(U), U
h = [[0] * 256 for _ in range(3)]
for x in os.listdir(f'{L}/13'):
    for f in os.listdir(f'{L}/13/{x}'):
        im = Image.open(f'{L}/13/{x}/{f}').convert('RGB'); m = Image.open(f'{V}/13/{x}/{f[:-4]}.png').convert('L').point(lambda v: 255 if v >= 250 else 0)
        for c, hh in enumerate(im.split()):
            for i, n in enumerate(hh.histogram(mask=m)): h[c][i] += n
def med(hh):
    t, s = sum(hh), 0
    for i, n in enumerate(hh):
        s += n
        if s >= t / 2: return i
vari = tuple(med(hh) for hh in h)
TERAVA = [0 if v < 150 else 255 if v > 210 else round((v - 150) * 255 / 60) for v in range(256)]  # epävarma (saaret, karikot) jää maaksi
print("vesiväri", vari, 'näytteitä', sum(h[0]))
n = 0
for z in os.listdir(L):
    for x in os.listdir(f'{L}/{z}'):
        os.makedirs(f'{U}/{z}/{x}', exist_ok=True)
        for f in os.listdir(f'{L}/{z}/{x}'):
            im = Image.open(f'{L}/{z}/{x}/{f}').convert('RGB'); m = Image.open(f'{V}/{z}/{x}/{f[:-4]}.png').convert('L').point(TERAVA).filter(ImageFilter.GaussianBlur(0.8))
            Image.composite(Image.new('RGB', im.size, vari), im, m).save(f'{U}/{z}/{x}/{f}', quality=85); n += 1
P = json.load(open(f'{D}/paikka.json')); P['vesivari_rgb'] = list(vari); P['vesi'] = 'vesi (vesimaski) yhdellä värillä: keskustan puhtaan veden mediaani'
json.dump(P, open(f'{D}/paikka.json', 'w'), indent=1, ensure_ascii=False); print('laattoja', n)
