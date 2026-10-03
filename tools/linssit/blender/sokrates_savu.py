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
N = int(KESTO * FPS); TUMMUUS = 0.50           # Päätoimittaja 3.10.: kiekuran ydin tummentaa projektorin valoa ~35–50 %
PEHMEYS = KOKO * (0.002 + 0.03 * ETAISYYS)   # reuna pehmenee muutaman kuvapisteen matkalla      # reunan sumeus kuvapisteinä: lähellä pintaa terävämpi


def nauha(t):
    """Savunauhan keskiviiva (u, v) ja paksuus pisteittäin; t 0–1 silmukka. Nousee alhaalta ylös, kiertyy yhden
    kiemuran kerrallaan (kiemura nousee kuva-alan läpi yhden silmukan aikana = 8 s)."""
    w = 2 * math.pi; pts = []
    for i in range(240):
        s = i / 239                                   # 0 alhaalla → 1 ylhäällä
        v = 1.05 - 1.1 * s
        # saumaton silmukka: ajan kertoimet kokonaislukuja (t = 0 ja t = 1 sama kuva)
        u = (0.5 + 0.13 * math.sin(w * (0.9 * s - t)) + 0.035 * math.sin(w * (2.3 * s - 2 * t) + 0.3)
             + 0.02 * math.sin(w * (t + 0.6 * s)))
        # kiekura: selvä silmukka, joka nousee kuva-alan läpi yhden kierron aikana (ääripäissä nauha on ohut)
        ds = ((s - t + 0.5) % 1.0) - 0.5; kiemura = math.exp(-(ds * 5.0) ** 2)   # jaksollinen: ei hyppyä saumassa
        fii = w * 5.0 * ds   # yksi täysi kierros kiemuran leveydellä: säde 0,06 > nousunopeus → nauha kiertyy silmukaksi
        u += 0.08 * kiemura * math.sin(fii); v += 0.08 * kiemura * (math.cos(fii) - 1.0)   # iso, selvä kiekura
        paksuus = (0.030 + 0.020 * math.sin(w * (1.7 * s - t)) ** 2)   # yksi selvä nauha (~1–1,4 cm pinnalla: muoto erottuu kaikuhahmon päällä) * (0.35 + 0.65 * math.sin(math.pi * s))
        pts.append((u, v, paksuus))
    return pts


YN = 4   # ylinäytteistys: sileä reuna (ei karvaisuutta)
for k in range(N):
    t = k / N; K_ = KOKO * YN; kuva = Image.new('L', (K_, K_), 0); d = ImageDraw.Draw(kuva)
    p = nauha(t)
    for j in range(len(p) - 1):   # nauha nelikulmioina keskiviivan normaalin suuntaan (silmukka saa mennä päällekkäin)
        (u0, v0, p0), (u1, v1, p1) = p[j], p[j + 1]
        du, dv = u1 - u0, v1 - v0; l_ = math.hypot(du, dv) or 1e-9; nu, nv = -dv / l_, du / l_
        q = [(u0 + nu * p0 / 2, v0 + nv * p0 / 2), (u1 + nu * p1 / 2, v1 + nv * p1 / 2),
             (u1 - nu * p1 / 2, v1 - nv * p1 / 2), (u0 - nu * p0 / 2, v0 - nv * p0 / 2)]
        d.polygon([(x * K_, y * K_) for x, y in q], fill=int(255 * TUMMUUS))
        d.ellipse([((u1 - p1 / 2) * K_, (v1 - p1 / 2) * K_), ((u1 + p1 / 2) * K_, (v1 + p1 / 2) * K_)], fill=int(255 * TUMMUUS))
    kuva = kuva.resize((KOKO, KOKO), Image.LANCZOS).filter(ImageFilter.GaussianBlur(PEHMEYS))
    kuva.point(lambda x: 255 - x).save(os.path.join(ULOS, f'savu-{k + 1:04d}.png'))
print('SAVU', ULOS, N, 'kuvaa', KOKO, 'px, pehmeys', round(PEHMEYS, 1), 'px')
