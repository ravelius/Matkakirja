"""VÄLITASO vaihe 3 (KS 3.11.2026, PT 03.1x): pohjan Z9–Z10 laattoihin päätiet ja joet OSM:stä (pura.py:n npz).
Käyttö: python -I piirra2.py <osm.npz> <pohjakansio> <ulos> <z10-lista.json> [z:x0-x1:y0-y1 …]
Ilman aluetta piirretään kaikki Euroopan Z9-laatat, joihin osuu aineistoa, ja z10-listan (pallo-z10.json) Euroopan laatat.
PT:n ehdot: (1) ei rajauksen reunaa: geometria on koko alueelta, ja Z10-laatikon reunalla primary ja jokiviivat häivytetään
noin 1,5 laatan matkalla, koska laatikon ulkopuolella Z10 = Z9 suurennettuna; (2) Z9:llä vain motorway + trunk ja
leveät joet alueina, Z10:llä lisäksi primary ja jokiviivat; (3) leveydet maastossa samat Z9:llä ja Z10:llä.
Tyyli kuten Lontoon koepalassa (piirra.py, PT kuittasi 03.1x). Laatat XYZ, 256 px, 4× ylinäytteistys."""
import json, math, os, sys, time
import multiprocessing
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import distance_transform_edt, map_coordinates

YN = 4
VESI = (200, 203, 186)
VESI_REUNA = (150, 152, 132)
TIET = {'motorway': ((150, 118, 80), 2.2), 'trunk': ((160, 128, 88), 1.8), 'primary': ((176, 148, 108), 1.2)}
JOKI_LEVEYS = 1.4
HAIVYTYS = 1.5   # Z10-laatikon reunan häivytys laattoina
RAJA = (-32.0, 25.0, 50.0, 72.0)
Z9_VESI_MIN = 15  # px²: Z9:llä pienemmät jokialueen palat pois (osittain kartoitetut joet näkyivät katkoviivana)

D = {}     # luokka -> (pisteet, alut, sisa, rajaukset)
IX = {}    # (luokka, z9x, z9y) -> kohteiden indeksit
Z10SET = set()
HV = None  # Z10-häivytyskenttä: (taulukko, x0, y0, R)


def merc_xy(lon, lat, z):
    n = 2 ** z * 256
    s = np.sin(np.radians(np.clip(lat, -85, 85)))
    return (lon + 180) / 360 * n, (0.5 - np.log((1 + s) / (1 - s)) / (4 * np.pi)) * n


def lataa(npz):
    d = np.load(npz)
    for nimi in list(TIET) + ['joki', 'vesi']:
        p, a, s = d[nimi + '_p'], d[nimi + '_a'], d[nimi + '_s']
        x, y = merc_xy(p[:, 0].astype(np.float64), p[:, 1].astype(np.float64), 9)
        x /= 256; y /= 256
        rx0 = np.minimum.reduceat(x, a[:-1]) if len(p) else x; rx1 = np.maximum.reduceat(x, a[:-1]) if len(p) else x
        ry0 = np.minimum.reduceat(y, a[:-1]) if len(p) else y; ry1 = np.maximum.reduceat(y, a[:-1]) if len(p) else y
        D[nimi] = (p, a, s)
        m = 0.02  # viivan leveyden varaus laatan reunalla
        for i in range(len(a) - 1):
            for tx in range(int(rx0[i] - m), int(rx1[i] + m) + 1):
                for ty in range(int(ry0[i] - m), int(ry1[i] + m) + 1):
                    IX.setdefault((nimi, tx, ty), []).append(i)


def tee_haivytys(z10):
    """Etäisyys lähimpään laattaan, jota EI ole Z10-joukossa (laattoina), R näytettä laattaa kohden."""
    global HV
    xs = [x for x, y in z10]; ys = [y for x, y in z10]
    x0, y0 = min(xs) - 2, min(ys) - 2; w, h = max(xs) - x0 + 3, max(ys) - y0 + 3; R = 16
    sis = np.zeros((h * R, w * R), bool)
    for x, y in z10:
        sis[(y - y0) * R:(y - y0 + 1) * R, (x - x0) * R:(x - x0 + 1) * R] = True
    HV = (distance_transform_edt(sis) / R, x0, y0, R)


def haivytys_maski(x, y):
    t, x0, y0, R = HV
    k = 256 * YN
    jx = (np.arange(k) + 0.5) / k
    gx, gy = np.meshgrid((x - x0 + jx) * R - 0.5, (y - y0 + jx) * R - 0.5)
    a = map_coordinates(t, [gy.ravel(), gx.ravel()], order=1, mode='nearest').reshape(k, k)
    return Image.fromarray((np.clip(a / HAIVYTYS, 0, 1) * 255).astype(np.uint8), 'L')


def ala(pts):
    a = np.asarray(pts)
    return abs(np.dot(a[:, 0], np.roll(a[:, 1], 1)) - np.dot(a[:, 1], np.roll(a[:, 0], 1))) / 2


def kohteet(nimi, z, x, y):
    s = 2 ** (z - 9)
    return IX.get((nimi, x // s, y // s), [])


def pisteet(nimi, i, z, x, y):
    p, a, _ = D[nimi]
    q = p[a[i]:a[i + 1]].astype(np.float64)
    px, py = merc_xy(q[:, 0], q[:, 1], z)
    return list(zip(((px - x * 256) * YN).tolist(), ((py - y * 256) * YN).tolist()))


def piirra_laatta(tyo):
    z, x, y, lahde, kohde = tyo
    im = Image.open(lahde).convert('RGB').resize((256 * YN, 256 * YN), Image.LANCZOS)
    kerroin = 1 if z >= 10 else 0.5
    # leveät joet alueina: maski (ulko 255, sisä 0), väri maskin läpi, reuna renkaista
    vi = kohteet('vesi', z, x, y)
    if vi:
        mk = Image.new('L', im.size, 0); dm = ImageDraw.Draw(mk)
        _, _, sisa = D['vesi']
        for sisarengas in (False, True):
            for i in vi:
                if sisa[i] == sisarengas:
                    pts = pisteet('vesi', i, z, x, y)
                    if len(pts) > 2 and (z >= 10 or sisarengas or ala(pts) >= Z9_VESI_MIN * YN * YN):
                        dm.polygon(pts, fill=0 if sisarengas else 255)
        im.paste(Image.new('RGB', im.size, VESI), (0, 0), mk)
        d = ImageDraw.Draw(im)
        for i in vi:
            pts = pisteet('vesi', i, z, x, y)
            if len(pts) > 2 and (z >= 10 or ala(pts) >= Z9_VESI_MIN * YN * YN): d.line(pts + pts[:1], fill=VESI_REUNA, width=YN, joint='curve')
    # Z10: primary ja jokiviivat omalle kerrokselle, häivytys laatikon reunaan
    if z >= 10 and (x, y) in Z10SET:  # laatikon ulkopuolella häivytys 0
        kerros = Image.new('RGBA', im.size, (0, 0, 0, 0)); dk = ImageDraw.Draw(kerros)
        for i in kohteet('joki', z, x, y):
            dk.line(pisteet('joki', i, z, x, y), fill=VESI + (255,), width=round(JOKI_LEVEYS * YN), joint='curve')
        vari, lev = TIET['primary']
        for i in kohteet('primary', z, x, y):
            dk.line(pisteet('primary', i, z, x, y), fill=vari + (255,), width=round(lev * YN), joint='curve')
        if HV is not None:
            al = kerros.getchannel('A')
            al = Image.fromarray((np.asarray(al, np.float32) * np.asarray(haivytys_maski(x, y), np.float32) / 255).astype(np.uint8))
            kerros.putalpha(al)
        im.paste(kerros, (0, 0), kerros)
    d = ImageDraw.Draw(im)
    for luokka in ('trunk', 'motorway'):
        vari, lev = TIET[luokka]
        for i in kohteet(luokka, z, x, y):
            d.line(pisteet(luokka, i, z, x, y), fill=vari, width=max(YN, round(lev * kerroin * YN)), joint='curve')
    os.makedirs(os.path.dirname(kohde), exist_ok=True)
    im.resize((256, 256), Image.LANCZOS).save(kohde, quality=95, subsampling=0)  # kuten pohjasarja: q95 4:4:4
    return kohde


def onko_aineistoa(z, x, y):
    luokat = ('motorway', 'trunk', 'vesi') + (('primary', 'joki') if (x, y) in Z10SET else ())
    return any(kohteet(n, z, x, y) for n in luokat)


def main():
    npz, pohja, ulos, z10polku = sys.argv[1:5]
    t0 = time.time()
    lataa(npz)
    z10 = [tuple(map(int, s.split('/'))) for s in json.load(open(z10polku))['laatat']]
    ex0, ey1 = merc_xy(np.array(RAJA[0]), np.array(RAJA[1]), 10); ex1, ey0 = merc_xy(np.array(RAJA[2]), np.array(RAJA[3]), 10)
    z10 = [(x, y) for x, y in z10 if ex0 / 256 <= x <= ex1 / 256 and ey0 / 256 <= y <= ey1 / 256]
    tee_haivytys(z10); Z10SET.update(z10)
    print(f'{time.strftime("%H.%M")} ladattu {time.time() - t0:.0f} s, Z10 Euroopassa {len(z10)}', flush=True)
    tyot = []
    if len(sys.argv) > 5:
        for alue in sys.argv[5:]:
            z, xs, ys = alue.split(':'); z = int(z)
            x0, x1 = map(int, xs.split('-')); y0, y1 = map(int, ys.split('-'))
            tyot += [(z, x, y) for x in range(x0, x1 + 1) for y in range(y0, y1 + 1)]
    else:
        # Z10: kaikki pohjasarjan Euroopan Z10-laatat (myös laatikoiden ulkopuoliset, jos natiivi hakee niitä verkosta):
        # laatikon ulkopuolella häivytys on 0, joten sisältö = Z9:n sisältö Z10:n tarkkuudella (saumaton kummin päin).
        tasot = os.environ.get('TASOT', '9,10').split(',')
        tyot = sorted({(9, tx, ty) for (n, tx, ty) in IX}) if '9' in tasot else []
        if '10' in tasot:
            for x in range(int(ex0 // 256), int(ex1 // 256) + 1):
                kansio = os.path.join(pohja, '10', str(x))
                if os.path.isdir(kansio):
                    tyot += [(10, x, int(f[:-4])) for f in os.listdir(kansio)
                             if f.endswith('.jpg') and ey0 / 256 - 1 <= int(f[:-4]) <= ey1 / 256 + 1]
    tyot = [(z, x, y, os.path.join(pohja, str(z), str(x), f'{y}.jpg'), os.path.join(ulos, str(z), str(x), f'{y}.jpg'))
            for z, x, y in tyot if onko_aineistoa(z, x, y)]
    tyot = [t for t in tyot if os.path.exists(t[3])]
    print(f'{time.strftime("%H.%M")} laattoja {len(tyot)}', flush=True)
    with multiprocessing.get_context('fork').Pool(int(os.environ.get('PROSESSEJA', '8'))) as pool:
        for n, _ in enumerate(pool.imap_unordered(piirra_laatta, tyot, chunksize=8), 1):
            if n % 500 == 0: print(f'{time.strftime("%H.%M")} {n}/{len(tyot)}', flush=True)
    print(f'{time.strftime("%H.%M")} VALMIS {len(tyot)} laattaa {time.time() - t0:.0f} s', flush=True)


if __name__ == '__main__':
    main()
