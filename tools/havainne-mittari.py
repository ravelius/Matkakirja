"""Havainnemittari (OMISTAJAN PÄÄTÖS 24.10.2026 22.42: tekijät sovittavat työn havainnekuvaan itse ennen tarkistusta; pohja PT:n
varivertailu.py). Mittaa havainnekuvasta ja omasta kuvasta samat luvut ja tulostaa ne rinnakkain (havainne | oma | ero).

Ajo:  python3 tools/havainne-mittari.py <havainne.png> <oma.png> [--kuvat etuliite]
      python3 tools/havainne-mittari.py --pari <kuvapari.png>      (vasen puolisko = havainne, oikea = oma; kuvatekstiraita ja HUD pois)
  --kuvat etuliite: tekee myös etuliite-rinnakkain.png ja etuliite-paallekkain.png (50 %).

Mittarit (osuudet kuvan korkeudesta ylhäältä, 0 = yläreuna, 1 = alareuna):
  keisari     keltaisen viitan alue kuvan alaosan keskellä: yläreuna, alareuna, korkeus (810: ~0,26), keskikohdan x
  horisontti  taivaan alaraja kuvan keskikaistalla (kujan pää / aukion takareuna; 810: ~0,15)
  räystäs     kultaisen katon alin rivi vasemmassa ja oikeassa neljänneksessä (räystäslinja kameraan nähden)
  lattia      lattian kirkkauden mediaani (alakeskiosa ilman keisaria, 0–255)
  mustat      lähes mustien (< 25) osuus koko kuvasta
  kylläisyys  värikylläisyyden keskiarvo ja p90 (0–1)
  varjo       varjossa olevan lattian osuus (kirkkaus < 0,6 · lattian p90)
  punainen    punaisten pintojen kylläisyys ja kirkkaus
"""
import sys
from PIL import Image


def osuudet(arvot, pisteet):
    arvot = sorted(arvot); n = len(arvot)
    return [arvot[min(n - 1, int(p / 100 * n))] for p in pisteet] if n else [0] * len(pisteet)


def mittaa(kuva):
    k = kuva.convert('RGB'); k = k.resize((480, round(480 * k.height / k.width))); W, H = k.size
    rgb = k.load(); hsv = k.convert('HSV').load()
    luma = lambda x, y: 0.2126 * rgb[x, y][0] + 0.7152 * rgb[x, y][1] + 0.0722 * rgb[x, y][2]
    def keltainen(x, y):
        h, s, v = hsv[x, y]; return 24 <= h <= 46 and s > 110 and v > 120   # h 0–255 (≈ 34–65°): viitta ja keisarimerkki
    def kulta(x, y):
        h, s, v = hsv[x, y]; return 15 <= h <= 40 and s > 60 and v > 100   # myös renderöinnin vaaleat kultakatot
    def taivas(x, y):
        h, s, v = hsv[x, y]; return 125 <= h <= 180 and s > 60 and v > 150   # sininen taivas (ei sinertävää lattiaa tai varjoa)
    tulos = {}
    # keisari: keltaiset pikselit alueella x 0,30–0,70, y 0,40–1,0; rivit, joilla ≥ 3 pikseliä
    rivit = [y for y in range(int(H * 0.40), H) if sum(keltainen(x, y) for x in range(int(W * 0.30), int(W * 0.70))) >= 3]
    if rivit:
        y0, y1 = min(rivit), max(rivit); xs = [x for y in rivit for x in range(int(W * 0.30), int(W * 0.70)) if keltainen(x, y)]
        tulos['keisari yläreuna'] = y0 / H; tulos['keisari alareuna'] = y1 / H; tulos['keisari korkeus'] = (y1 - y0) / H
        tulos['keisari keskikohta x'] = sum(xs) / len(xs) / W
    # horisontti: keskikaistan (x 0,45–0,55) alin rivi, jolla yli puolet taivasta
    hor = [y for y in range(int(H * 0.5)) if sum(taivas(x, y) for x in range(int(W * 0.45), int(W * 0.55))) > 0.5 * int(W * 0.10)]
    tulos['horisontti (taivaan alaraja)'] = (max(hor) / H) if hor else 0.0
    for nimi, (a, b) in (('räystäs vasen', (0.0, 0.25)), ('räystäs oikea', (0.75, 1.0))):
        # ylhäältä alkava yhtenäinen kattokaista (aukot ≤ 3 riviä): sen alin rivi = räystäslinja (lattia ja viitta eivät kuulu kaistaan)
        viim, aukko = None, 0
        for y in range(int(H * 0.75)):
            if sum(kulta(x, y) for x in range(int(W * a), int(W * b))) > 0.15 * W * (b - a): viim, aukko = y, 0
            elif viim is not None:
                aukko += 1
                if aukko > 3: break
        tulos[nimi] = (viim / H) if viim is not None else 0.0
    lattia = [luma(x, y) for y in range(int(H * 0.85), H) for x in range(int(W * 0.25), int(W * 0.75)) if not keltainen(x, y)]
    tulos['lattia mediaani'] = osuudet(lattia, [50])[0]
    kaikki = [luma(x, y) for y in range(H) for x in range(W)]
    tulos['mustat (<25) %'] = 100 * sum(1 for v in kaikki if v < 25) / len(kaikki)
    sat = [hsv[x, y][1] / 255 for y in range(H) for x in range(W)]
    tulos['kylläisyys keskim.'] = sum(sat) / len(sat); tulos['kylläisyys p90'] = osuudet(sat, [90])[0]
    alue = [luma(x, y) for y in range(int(H * 0.6), H) for x in range(int(W * 0.2), int(W * 0.8)) if not keltainen(x, y)]
    p90 = osuudet(alue, [90])[0]; tulos['varjo-osuus lattiasta %'] = 100 * sum(1 for v in alue if v < 0.6 * p90) / max(1, len(alue))
    pun = [(hsv[x, y][1] / 255, hsv[x, y][2] / 255) for y in range(H) for x in range(W) if (hsv[x, y][0] < 12 or hsv[x, y][0] > 245) and hsv[x, y][1] > 90 and hsv[x, y][2] > 40]
    tulos['punainen kylläisyys'] = sum(s for s, _ in pun) / max(1, len(pun)); tulos['punainen kirkkaus'] = sum(v for _, v in pun) / max(1, len(pun))
    pp = osuudet(kaikki, [5, 50, 95]); tulos['kirkkaus p5/p50/p95'] = '%.0f / %.0f / %.0f' % tuple(pp)
    return tulos


def main(a):
    if a and a[0] == '--pari':
        k = Image.open(a[1]).convert('RGB'); W, H = k.size; ala = int(H * 0.925)
        hav, oma = k.crop((0, 0, int(W * 0.495), ala)), k.crop((int(W * 0.505), int(H * 0.07), W, ala))
    elif len(a) >= 2:
        hav, oma = Image.open(a[0]), Image.open(a[1])
    else:
        print(__doc__); return 2
    if '--kuvat' in a:
        e = a[a.index('--kuvat') + 1]; o = oma.convert('RGB'); h = hav.convert('RGB').resize(o.size)
        Image.blend(h, o, 0.5).save(e + '-paallekkain.png')
        r = Image.new('RGB', (o.width * 2 + 10, o.height), (255, 255, 255)); r.paste(h, (0, 0)); r.paste(o, (o.width + 10, 0)); r.save(e + '-rinnakkain.png')
    th, to = mittaa(hav), mittaa(oma)
    print(f"{'mittari':32s} {'havainne':>12s} {'oma':>12s} {'ero':>8s}")
    for nimi in th:
        vh, vo = th[nimi], to.get(nimi, '–')
        if isinstance(vh, float) and isinstance(vo, float):
            print(f'{nimi:32s} {vh:12.2f} {vo:12.2f} {vo - vh:+8.2f}')
        else:
            print(f'{nimi:32s} {str(vh):>12s} {str(vo):>12s}')
    for nimi in to:
        if nimi not in th: print(f"{nimi:32s} {'–':>12s} {to[nimi]:12.2f}" if isinstance(to[nimi], float) else f'{nimi:32s} – {to[nimi]}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
