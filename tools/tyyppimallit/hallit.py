"""ASEMAHALLIT POHJAN SISÄÄN (KK 15.11. 06.20 PÄÄTÖS B, yleinen sääntö; aiempi ehto 14.11. 23.34 "malli pohjan sisällä").

Kaikki lasketaan OSM-pohjasta, ei asemakohtaisia käsilukuja:
1. Julkisivu (mallin −x) kohti kaupungin keskustaa (pelin origo). Hallien akseli haetaan pohjan pienimmän suorakaiteen akselista ± KULMA°
   (askel 0,5°) ja kaistojen määrä halleja…5: valitaan yhdistelmä, jolla hallien yhteispinta-ala pohjan sisällä on suurin (tasatilanteessa pienin poikkeama).
2. Kulman kehyksessä pohjan rajat → keskipiste (merkki siirretään siihen), pituus L ja leveys W. W jaetaan kaistoihin (halleja = merkin
   parametri; kaista = W / halleja). Jokaisesta kaistasta pisin yhtenäinen pätkä pitkin akselia, jonka KOKO kaistan leveys on pohjan sisällä
   (rasteri 1 m). Halli jää pois, jos pätkä < kaistan leveys.
3. Julkisivu: aikaisimmin alkavasta kaistasta viereisiin kaistoihin, joiden alku on enintään RYHMA m myöhemmin. Julkisivun etupinta = ryhmän
   alkujen suurin; ryhmän hallit alkavat siitä JULKISIVU m myöhemmin (rakennus 16 m + kellopääty 1,5 m). Jos hallille jää < kaistan leveys,
   ryhmää kavennetaan reunasta. Muut hallit alkavat omasta pätkästään (lasipääty molemmissa päissä).

Tiedostoon (vie.py, MK01 tyyppi 7): a = halleja | julkisivukaistat << 3; p0 = L, p1 = W, p2 = kattoväri; kaistan k alku ja loppu u8:na tavuissa
T[2k], T[2k+1], T = [b, c, p3:n 4 tavua, varattu-kentän 4 tavua] (little-endian). x = −L/2 + q · L / 255 (alku ylöspäin, loppu alaspäin
pyöristettynä: aina pohjan sisään). Halli mukana, jos loppu > alku. Kaikki tavut 0 = vanha malli (TyyppiAsema, ei leikkausta).
"""
import math
from PIL import Image, ImageDraw

JULKISIVU = 17.5
RYHMA = 20.0
KULMA, KULMA_ASKEL = 10.0, 0.5
HALLEJA_MAX = 5        # nimilistan halleja (halleja_lista, esim. King's Cross 2; KK) pysyy; kaistoja vähintään merkin halleja, enintään 5 (AsemanHallit); kapeampi kaista vain, jos ala kasvaa yli KYNNYS-kertoimen
KYNNYS = 1.05


def renkaat(m):
    p = m['pohja']
    return p if p and isinstance(p[0][0], list) else [p]


def suunta(akseli):
    a = math.radians(akseli); return math.sin(a), math.cos(a)


def paikallinen(akseli, e, n):
    """(itä, pohjoinen) → mallin (x, z) kuten MerkkiTiedosto.Paikalliseen käänteisenä."""
    ux, uy = suunta(akseli); return e * ux + n * uy, -e * uy + n * ux


def maailmaan(akseli, x, z):
    ux, uy = suunta(akseli); return x * ux - z * uy, x * uy + z * ux


def akseli_kohti(akseli, kohti):
    """+x:n atsimuutti niin, että julkisivu (−x) osoittaa kohti (itä, pohjoinen)."""
    a = akseli % 360; ux, uy = suunta(a)
    return (a + 180) % 360 if ux * kohti[0] + uy * kohti[1] > 0 else a


def _kaistat(R, a, h):
    Q = [[paikallinen(a, e, n) for e, n in r] for r in R]
    xs = [x for r in Q for x, _ in r]; zs = [z for r in Q for _, z in r]
    x0, x1, z0, z1 = min(xs), max(xs), min(zs), max(zs)
    L, W = x1 - x0, z1 - z0
    nx, nz = int(math.ceil(L)) + 1, int(math.ceil(W)) + 1
    im = Image.new('L', (nx, nz), 0); d = ImageDraw.Draw(im)
    for r in Q: d.polygon([(x - x0, z - z0) for x, z in r], fill=255)
    px = im.load()
    # Pikseli (i, j) = solu [i, i+1) × [j, j+1); PIL täyttää reunat mukaan, joten vaaditaan solun kaikki neljä kulmapikseliä.
    hl = W / h; pat = []
    for k in range(h):
        j0, j1 = int(math.floor(k * hl)), min(nz - 1, int(math.ceil((k + 1) * hl)))
        ok = [all(px[i, j] and px[i + 1, j] for j in range(j0, j1 + 1)) for i in range(nx - 1)]
        best, run = None, 0
        for i, o in enumerate(ok + [False]):
            if o: run += 1
            else:
                if run and (best is None or run > best[1] - best[0]): best = (i - run, i)
                run = 0
        pat.append(None if best is None or best[1] - best[0] < hl else (x0 + best[0], x0 + best[1]))
    return dict(cx=(x0 + x1) / 2, cz=(z0 + z1) / 2, L=L, W=W, pat=pat, hl=hl)


def _julkisivu(pat, hl):
    mukana = [k for k, p in enumerate(pat) if p]
    if not mukana: return [], None
    k0 = min(mukana, key=lambda k: pat[k][0]); raja = pat[k0][0] + RYHMA
    ryhma = [k0]
    for s in (-1, 1):
        k = k0 + s
        while 0 <= k < len(pat) and pat[k] and pat[k][0] <= raja: ryhma.append(k); k += s
    ryhma.sort()
    while ryhma:
        etu = max(pat[k][0] for k in ryhma) + JULKISIVU
        huono = [k for k in ryhma if pat[k][1] - etu < hl]
        if not huono: return ryhma, etu
        # kavennetaan reunasta: pois se reunakaista, jolla alku on myöhäisin
        reunat = [ryhma[0], ryhma[-1]]
        ryhma.remove(max(reunat, key=lambda k: pat[k][0]))
    return [], None


def laske(m, kohti):
    R = renkaat(m); h0 = int(m['parametrit']['halleja'])
    pohja = akseli_kohti(m['akseli'], kohti)
    paras = None
    n = int(round(KULMA / KULMA_ASKEL))
    for h, i in sorted(((h, i) for h in range(h0, (h0 if m['parametrit'].get('halleja_lista') else HALLEJA_MAX) + 1) for i in range(-n, n + 1)), key=lambda t: (t[0] - h0, abs(t[1]))):
        a = (pohja + i * KULMA_ASKEL) % 360
        k = _kaistat(R, a, h)
        ryhma, etu = _julkisivu(k['pat'], k['hl'])
        ala = 0.0
        for j, p in enumerate(k['pat']):
            if p: ala += ((p[1] - etu) if j in ryhma else (p[1] - p[0])) * k['hl']
        if paras is None or ala > paras[0] * KYNNYS: paras = (ala, a, k, ryhma, etu, h)
    ala, a, k, ryhma, etu, h = paras
    L, W, cx = k['L'], k['W'], k['cx']
    qa, ql = [0] * h, [0] * h
    alku, loppu = [None] * h, [None] * h
    for j, p in enumerate(k['pat']):
        if not p: continue
        x0 = (etu if j in ryhma else p[0]) - cx; x1 = p[1] - cx
        qa[j] = max(0, min(255, int(math.ceil((x0 + L / 2) / L * 255 - 1e-9))))
        ql[j] = max(0, min(255, int(math.floor((x1 + L / 2) / L * 255 + 1e-9))))
        if ql[j] <= qa[j]: qa[j] = ql[j] = 0; continue
        alku[j] = -L / 2 + qa[j] * L / 255.0; loppu[j] = -L / 2 + ql[j] * L / 255.0
    ryhma = [j for j in ryhma if loppu[j] is not None]
    T = [0] * 10
    for j in range(h): T[2 * j], T[2 * j + 1] = qa[j], ql[j]
    jbit = sum(1 << j for j in ryhma)
    siirto = maailmaan(a, k['cx'], k['cz'])
    return dict(akseli=a, poikkeama=round(((a - pohja + 180) % 360) - 180, 1), siirto=siirto, pituus=L, leveys=W, halleja=h,
                a=h | (jbit << 3), b=T[0], c=T[1], p3_bitit=int.from_bytes(bytes(T[2:6]), 'little'), varattu=int.from_bytes(bytes(T[6:10]), 'little'),
                alku=alku, loppu=loppu, julkisivu=ryhma, ala=round(ala))


def pura(L, W, a, b, c, p3_bitit, varattu):
    """Tiedoston rivistä kuten peli: hallit [(z0, z1, x0, x1, julkisivu)], julkisivu (x0, x1, z0, z1) tai None. x0 julkisivukaistalla
    = alku − 1 (holvi alkaa metrin julkisivun sisältä)."""
    h, jb = a & 7, a >> 3
    T = [b, c] + list(p3_bitit.to_bytes(4, 'little')) + list(varattu.to_bytes(4, 'little'))
    hl = W / h; hallit = []; js = []
    for k in range(h):
        qa, ql = T[2 * k], T[2 * k + 1]
        if ql <= qa: continue
        x0, x1 = -L / 2 + qa * L / 255.0, -L / 2 + ql * L / 255.0
        j = bool(jb >> k & 1)
        hallit.append((-W / 2 + k * hl, -W / 2 + (k + 1) * hl, x0 - (1.0 if j else 0.0), x1, j))
        if j: js.append((k, x0))
    jul = None
    if js:
        k0, k1 = min(k for k, _ in js), max(k for k, _ in js); etu = js[0][1]
        jul = (etu - JULKISIVU, etu, -W / 2 + k0 * hl, -W / 2 + (k1 + 1) * hl)
    return hallit, jul
