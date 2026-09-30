# Olavinlinnan ympäristö aikakerrokseen n1500 (Linnanrakentaja 1.10.2026; omistaja: "Linnan ympäristö saisi mukailla
# linnan kultakauden aikaa", Päätoimittajan suunnitelma hyväksytty klo 00.5x). Nykykaupunki pois: rakennukset, tiet,
# rautatie, rakennetut ja pihamaat, pellot ja puistot (MML:n maastotietokanta 2024, CC BY 4.0, lehti N5311L), ja
# lisäksi ortokuvan perusteella vaalea kova pinta (asfaltti, sora, katot), jota maastotietokanta ei rajaa.
#   <python numpy> ymparisto_n1500.py <mtk-kansio> <orto.png> <ulos.npz> [--sade 2000]
# Tulos: kaupunki-maski 1 m:n ruudussa (rivi 0 = etelä, sarake 0 = länsi, E0/N0 = ORIGO − SADE), sama kuin
# ymparisto_puut.py:n latvusmallissa. Maskia käyttävät ymparisto.py (tekstuuri), ymparisto_puut.py (puut).
import math, os, struct, sys
import numpy as np
A = sys.argv[1:]; MTK, ORTO, ULOS = A[:3]
SADE = float(A[A.index('--sade') + 1]) if '--sade' in A else 2000.0
ORIGO = (599993.0, 6860483.0); LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0)
E0, N0 = ORIGO[0] - SADE, ORIGO[1] - SADE; R = 1.0; n = int(2 * SADE / R)
# Tien leveys (m) luokan mukaan: 121xx maantiet, 1213x kadut, 12141 ajotie, 123xx polut ja pyörätiet, 14112 rautatie.
LEVEYS = {'12112': 12, '12121': 10, '12122': 9, '12131': 8, '12132': 7, '12141': 5, '12313': 3, '12314': 3, '12316': 3, '14112': 8}
PINTA = lambda l: l.startswith('32') or l.startswith('33') or l.startswith('38') or l.startswith('39')  # rakennettu/pelto/puisto

def lue(shp):
    b = open(shp, 'rb').read(); d = open(shp[:-4] + '.dbf', 'rb').read()
    nr, hl, rl = struct.unpack('<IHH', d[4:12]); k = []; p = 32
    while d[p] != 0x0d: k.append((d[p:p + 11].split(b'\0')[0].decode(), d[p + 16])); p += 32
    ki = [x for x, _ in k]; off = sum(l for x, l in k[:ki.index('LUOKKA')]); L = dict(k)['LUOKKA']
    o = 100; i = 0; out = []
    while o < len(b):
        rn, cl = struct.unpack('>II', b[o:o + 8]); s = b[o + 8:o + 8 + cl * 2]; o += 8 + cl * 2
        luokka = d[hl + i * rl + 1 + off:hl + i * rl + 1 + off + L].decode().strip(); i += 1
        st = struct.unpack('<i', s[:4])[0]
        if st in (3, 5, 13, 15, 23, 25):
            np_, npt = struct.unpack('<ii', s[36:44]); osat = list(struct.unpack(f'<{np_}i', s[44:44 + 4 * np_])) + [npt]
            pts = np.frombuffer(s[44 + 4 * np_:44 + 4 * np_ + 16 * npt], np.float64).reshape(npt, 2)
            out.append((luokka, st % 10, [pts[osat[j]:osat[j + 1]] for j in range(np_)]))
    return out

M = np.zeros((n, n), bool)
def polku(pts):  # metreistä ruutuihin (x → sarake, y → rivi etelästä)
    return np.stack([(pts[:, 0] - E0) / R, (pts[:, 1] - N0) / R], 1)

def tayta(renkaat):  # even-odd -monikulmiotäyttö rivikeskipisteillä (reiät mukana)
    kaikki = [polku(r) for r in renkaat]; yy = np.concatenate(kaikki)
    y0, y1 = max(int(yy[:, 1].min()), 0), min(int(yy[:, 1].max()) + 1, n)
    for y in range(y0, y1):
        yc = y + 0.5; xs = []
        for r in kaikki:
            a, b = r[:-1], r[1:]; m = (a[:, 1] > yc) != (b[:, 1] > yc)
            xs.append(a[m, 0] + (yc - a[m, 1]) * (b[m, 0] - a[m, 0]) / (b[m, 1] - a[m, 1]))
        xs = np.sort(np.concatenate(xs))
        for x0, x1 in zip(xs[0::2], xs[1::2]):
            c0, c1 = max(int(math.ceil(x0 - 0.5)), 0), min(int(math.floor(x1 - 0.5)) + 1, n)
            if c1 > c0: M[y, c0:c1] = True

def viiva(pts, lev):
    p = polku(pts); r = max(1, int(math.ceil(lev / 2 / R)))
    for a, b in zip(p[:-1], p[1:]):
        k = int(np.hypot(*(b - a))) + 1
        for t in np.linspace(0, 1, k + 1):
            x, y = a + (b - a) * t; ix, iy = int(x), int(y)
            if -r <= ix < n + r and -r <= iy < n + r:
                M[max(iy - r, 0):min(iy + r + 1, n), max(ix - r, 0):min(ix + r + 1, n)] = True

def nimi(etu): return os.path.join(MTK, f'{etu}_N5311L_{"p" if etu in "rmn" else "v"}.shp')
maara = {}
for luokka, tyyppi, osat in lue(os.path.join(MTK, 'r_N5311L_p.shp')): tayta(osat); maara['rakennukset'] = maara.get('rakennukset', 0) + 1
for f in ('m_N5311L_p.shp', 'n_N5311L_p.shp'):
    for luokka, tyyppi, osat in lue(os.path.join(MTK, f)):
        if PINTA(luokka): tayta(osat); maara['alueet'] = maara.get('alueet', 0) + 1
for luokka, tyyppi, osat in lue(os.path.join(MTK, 'l_N5311L_v.shp')):
    if luokka in LEVEYS:
        for o in osat: viiva(o, LEVEYS[luokka])
        maara['tiet'] = maara.get('tiet', 0) + 1
# Rakennusten ympärille 4 m (pihat, pysäköinti), sitten ortokuvan kova vaalea pinta 30 m:n säteellä maskista.
def laajenna(m, k):
    for _ in range(k):
        q = np.pad(m, 1); m = np.logical_or.reduce([q[a:a + n, b:b + n] for a in range(3) for b in range(3)])
    return m
M = laajenna(M, 4)
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
o = Image.open(ORTO); OR = (LEHTI[2] - LEHTI[0]) / o.size[0]
ox0 = int((E0 - LEHTI[0]) / OR); oy0 = int((LEHTI[3] - (N0 + 2 * SADE)) / OR)
kuva = o.crop((ox0, oy0, ox0 + int(2 * SADE / OR), oy0 + int(2 * SADE / OR))).resize((n, n), Image.BOX)
a = np.asarray(kuva).astype(np.float32)[::-1]  # rivi 0 = etelä
kirk = a.mean(-1); vih = a[..., 1] - (a[..., 0] + a[..., 2]) / 2; kyl = a.max(-1) - a.min(-1)
kova = (kirk > 95) & (vih < 6) & (kyl < 45)  # vaalea harmaa/ruskea, ei vihreä: asfaltti, sora, betoni, katot
lahella = laajenna(M, 30)
M |= kova & lahella
# Sulkeuma (12 m): pihat ja puutarhat korttelien välissä mukaan, jolloin kaupunki korvautuu yhtenäisenä metsänä.
def kavenna(m, k):
    for _ in range(k):
        q = np.pad(m, 1, constant_values=True); m = np.logical_and.reduce([q[a:a + n, b:b + n] for a in range(3) for b in range(3)])
    return m
M = kavenna(laajenna(M, 12), 12)
M = laajenna(M, 1)
np.savez_compressed(ULOS, maski=M, e0=E0, n0=N0, res=R)
print(f'N1500: kaupunkimaski {M.mean():.3f} ruuduista ({int(M.sum()) / 1e6:.2f} km²), kohteita {maara}', ULOS)
