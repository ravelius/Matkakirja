# Sokrateen savukiekura (Linnanrakentaja 3.10.2026; omistaja 08.2x): projektorin ja kipsin väliin yksi ohut, hitaasti
# liekkuva savunauha, jonka varjo elävöittää projektorin kuvaa. Varjo lasketaan valmiiksi silmukoituvaksi maskiksi
# (harmaasävy-PNG-sarja, 1 = täysi valo, tumma = savun varjo), jolla jokainen projektorin kuva kerrotaan (Blender,
# web ja natiivi samasta sarjasta, ei reaaliaikaista simulaatiota). Koordinaatit = projektorin kuva-ala (u, v 0–1).
#   python3 sokrates_savu.py <ulos-kansio> [--kesto 8] [--fps 30] [--koko 512] [--etaisyys 0.07]
# Terävyys geometriasta: pistemäinen projektori → savun varjon reuna pehmenee vain savun oman pehmeyden ja etäisyyden
# mukaan; --etaisyys (m, savu kipsistä) skaalaa varjon pehmeyttä (5 cm terävämpi, 10 cm pehmeämpi).
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter

A = sys.argv[1:]; ULOS = A[0]; os.makedirs(ULOS, exist_ok=True)
arg = lambda k, o: type(o)(A[A.index(k) + 1]) if k in A else o
KESTO, FPS, KOKO, ETAISYYS = arg('--kesto', 8.0), arg('--fps', 30), arg('--koko', 512), arg('--etaisyys', 0.07)
N = int(KESTO * FPS); TUMMUUS = 0.85           # savun varjo päästää 15 % valosta läpi paksuimmasta kohdasta (tiheä nauha)
PEHMEYS = KOKO * (0.003 + 0.04 * ETAISYYS)      # reunan sumeus kuvapisteinä: lähellä pintaa terävämpi


def nauha(t):
    """Savunauhan keskiviiva (u, v) ja paksuus pisteittäin; t 0–1 silmukka. Nousee alhaalta ylös, kiertyy yhden
    kiemuran kerrallaan (kiemura nousee kuva-alan läpi yhden silmukan aikana = 8 s)."""
    w = 2 * math.pi; pts = []
    for i in range(240):
        s = i / 239                                   # 0 alhaalla → 1 ylhäällä
        v = 1.05 - 1.1 * s
        # saumaton silmukka: ajan kertoimet kokonaislukuja (t = 0 ja t = 1 sama kuva)
        u = (0.5 + 0.10 * math.sin(w * (0.9 * s - t)) + 0.035 * math.sin(w * (2.3 * s - 2 * t) + 0.3)
             + 0.02 * math.sin(w * (t + 0.6 * s)))
        # kiekura: selvä silmukka, joka nousee kuva-alan läpi yhden kierron aikana (ääripäissä nauha on ohut)
        ds = ((s - t + 0.5) % 1.0) - 0.5; kiemura = math.exp(-(ds * 5.0) ** 2)   # jaksollinen: ei hyppyä saumassa
        fii = w * 5.0 * ds   # yksi täysi kierros kiemuran leveydellä: säde 0,06 > nousunopeus → nauha kiertyy silmukaksi
        u += 0.06 * kiemura * math.sin(fii); v += 0.06 * kiemura * (math.cos(fii) - 1.0)
        paksuus = (0.026 + 0.018 * math.sin(w * (1.7 * s - t)) ** 2) * (0.35 + 0.65 * math.sin(math.pi * s))
        pts.append((u, v, paksuus))
    return pts


for k in range(N):
    t = k / N; kuva = Image.new('L', (KOKO, KOKO), 0); d = ImageDraw.Draw(kuva)
    p = nauha(t)
    for (u0, v0, p0), (u1, v1, p1) in zip(p, p[1:]):
        d.line([(u0 * KOKO, v0 * KOKO), (u1 * KOKO, v1 * KOKO)], fill=int(255 * TUMMUUS), width=max(1, int((p0 + p1) / 2 * KOKO)))
    kuva = kuva.filter(ImageFilter.GaussianBlur(PEHMEYS))
    kuva.point(lambda x: 255 - x).save(os.path.join(ULOS, f'savu-{k + 1:04d}.png'))
print('SAVU', ULOS, N, 'kuvaa', KOKO, 'px, pehmeys', round(PEHMEYS, 1), 'px')
