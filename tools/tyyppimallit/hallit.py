"""ASEMAHALLIT POHJAN SISÄÄN (KK 15.11. 06.20 PÄÄTÖS B, yleinen sääntö; aiempi ehto 14.11. 23.34 "malli pohjan sisällä").

Kaikki lasketaan OSM-pohjasta, ei asemakohtaisia käsilukuja:
1. Julkisivu (mallin −x) kohti kaupungin keskustaa (pelin origo). Hallien akseli haetaan pohjan pienimmän suorakaiteen akselista ± KULMA°
   (askel 0,5°) ja kaistojen määrä halleja…5: valitaan yhdistelmä, jolla hallien yhteispinta-ala pohjan sisällä on suurin (tasatilanteessa pienin poikkeama).
2. Kulman kehyksessä pohjan rajat → keskipiste (merkki siirretään siihen), pituus L ja leveys W. W jaetaan kaistoihin (halleja = merkin
   parametri; kaista = W / halleja). Jokaisesta kaistasta pisin yhtenäinen pätkä pitkin akselia, jonka KOKO kaistan leveys on pohjan sisällä
   (rasteri 1 m). PUDONNUT KAISTA (KK 15.11. 07.25 kohta 1): jos pätkä < kaistan leveys, kaista yritetään kerran uudelleen KAHTENA PUOLILEVEÄNÄ
   kaistana samalla säännöllä; puolikas jää pois vasta, jos sen pätkä < puolikkaan leveys. Valinnan pinta-alaan lasketaan puolikkaatkin.
3. Julkisivu (vain kokonaiset kaistat): aikaisimmin alkavasta kaistasta viereisiin kaistoihin, joiden alku on enintään RYHMA m myöhemmin. Julkisivun etupinta = ryhmän
   alkujen suurin; ryhmän hallit alkavat siitä JULKISIVU m myöhemmin (rakennus 16 m + kellopääty 1,5 m). Jos hallille jää < kaistan leveys,
   ryhmää kavennetaan reunasta. Muut hallit (myös puolikkaat) alkavat omasta pätkästään (lasipääty molemmissa päissä).

Tiedostoon (vie.py, MK01 tyyppi 7, MUOTO 2; KK 07.25: kaistoja voi olla > 5, joten hallitavut jatkuvat JATKORIVILLE):
  a = kaistoja h (bitit 0–2) | julkisivukaistat << 3 (bitti 3 + k, vain kokonaiset kaistat); p0 = L, p1 = W, p2 = kattoväri;
  b | c << 8 = KAISTAKARTTA: bitti 15 = muoto 2 (aina 1), kaistan k tila bitit 3k…3k+2: 0 ei hallia, 1 kokonainen, 2 vain 1. puolikas (pienempi z),
  3 vain 2. puolikas, 4 molemmat puolikkaat. Hallit järjestyksessä (kaista, puolikas) → kunkin alku ja loppu u8:na tavujonossa
  H = [p3:n 4 raakaa tavua, varattu-kentän 4 tavua, JATKORIVIN tavut 1…23] (LE). Jatkorivi = seuraava mallirivi, tyyppi 11 (ei merkkejä).
  x = −L/2 + q · L / 255 (alku ylöspäin, loppu alaspäin pyöristettynä: aina pohjan sisään); halli kirjoitetaan vain, jos loppu > alku.
  Kaikki b c p3 varattu 0 = vanha malli (TyyppiAsema, ei leikkausta; tavulleen ennallaan, tiiviste).
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


def _pisin(ok, minimi):
    best, run = None, 0
    for i, o in enumerate(ok + [False]):
        if o: run += 1
        else:
            if run and (best is None or run > best[1] - best[0]): best = (i - run, i)
            run = 0
    return None if best is None or best[1] - best[0] < minimi else best


def _kaistat(R, a, h):
    """Kulman a kehyksessä: L, W, keskipiste ja kaistat. pat[k] = kokonaisen kaistan pätkä (x0, x1) tai None; puolet[k] = [p1, p2]
    puolikkaiden pätkät (vain pudonneelle kaistalle; None = puolikas pois)."""
    Q = [[paikallinen(a, e, n) for e, n in r] for r in R]
    xs = [x for r in Q for x, _ in r]; zs = [z for r in Q for _, z in r]
    x0, x1, z0, z1 = min(xs), max(xs), min(zs), max(zs)
    L, W = x1 - x0, z1 - z0
    nx, nz = int(math.ceil(L)) + 1, int(math.ceil(W)) + 1
    im = Image.new('L', (nx, nz), 0); d = ImageDraw.Draw(im)
    for r in Q: d.polygon([(x - x0, z - z0) for x, z in r], fill=255)
    px = im.load()
    # Pikseli (i, j) = solu [i, i+1) × [j, j+1); PIL täyttää reunat mukaan, joten vaaditaan solun kaikki neljä kulmapikseliä.
    def patka(za, zb, minimi):
        j0, j1 = int(math.floor(za)), min(nz - 1, int(math.ceil(zb)))
        ok = [all(px[i, j] and px[i + 1, j] for j in range(j0, j1 + 1)) for i in range(nx - 1)]
        b = _pisin(ok, minimi)
        return None if b is None else (x0 + b[0], x0 + b[1])
    hl = W / h; pat, puolet = [], []
    for k in range(h):
        p = patka(k * hl, (k + 1) * hl, hl)
        pat.append(p)
        puolet.append(None if p else [patka(k * hl, (k + 0.5) * hl, hl / 2), patka((k + 0.5) * hl, (k + 1) * hl, hl / 2)])
    return dict(cx=(x0 + x1) / 2, cz=(z0 + z1) / 2, L=L, W=W, pat=pat, puolet=puolet, hl=hl)


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


def laske(m, kohti, puolikkaat=True):
    """puolikkaat=False = kierroksen 5 sääntö (pudonnut kaista pois), vain vertailuun (raportin 'ennen')."""
    R = renkaat(m); h0 = int(m['parametrit']['halleja'])
    pohja = akseli_kohti(m['akseli'], kohti)
    paras = None
    n = int(round(KULMA / KULMA_ASKEL))
    for h, i in sorted(((h, i) for h in range(h0, (h0 if m['parametrit'].get('halleja_lista') else HALLEJA_MAX) + 1) for i in range(-n, n + 1)), key=lambda t: (t[0] - h0, abs(t[1]))):
        a = (pohja + i * KULMA_ASKEL) % 360
        k = _kaistat(R, a, h)
        if not puolikkaat: k['puolet'] = [None] * h
        ryhma, etu = _julkisivu(k['pat'], k['hl'])
        ala = 0.0
        for j, p in enumerate(k['pat']):
            if p: ala += ((p[1] - etu) if j in ryhma else (p[1] - p[0])) * k['hl']
            elif k['puolet'][j]: ala += sum(q[1] - q[0] for q in k['puolet'][j] if q) * k['hl'] / 2
        if paras is None or ala > paras[0] * KYNNYS: paras = (ala, a, k, ryhma, etu, h)
    ala, a, k, ryhma, etu, h = paras
    L, W, cx, hl = k['L'], k['W'], k['cx'], k['hl']

    def q(x0, x1):
        qa = max(0, min(255, int(math.ceil((x0 - cx + L / 2) / L * 255 - 1e-9))))
        ql = max(0, min(255, int(math.floor((x1 - cx + L / 2) / L * 255 + 1e-9))))
        return (qa, ql) if ql > qa else None

    # Hallit järjestyksessä (kaista, puolikas): (kaista, puolikas tai None, qa, ql)
    hallit_ = []; tila = [0] * h
    for j in range(h):
        p = k['pat'][j]
        if p:
            r = q(etu if j in ryhma else p[0], p[1])
            if r: hallit_.append((j, None) + r); tila[j] = 1
            continue
        osat = [q(*o) if o else None for o in (k['puolet'][j] or [None, None])]
        for s, r in enumerate(osat):
            if r: hallit_.append((j, s) + r)
        tila[j] = {(True, False): 2, (False, True): 3, (True, True): 4}.get((bool(osat[0]), bool(osat[1])), 0)
    ryhma = [j for j in ryhma if tila[j] == 1]
    kartta = 0x8000 | sum(t << (3 * j) for j, t in enumerate(tila))
    H = [v for _, _, qa, ql in hallit_ for v in (qa, ql)]
    assert len(H) <= 8 + 23
    H += [0] * (31 - len(H))
    jbit = sum(1 << j for j in ryhma)
    siirto = maailmaan(a, k['cx'], k['cz'])
    x = lambda qq: -L / 2 + qq * L / 255.0
    kaistat = []
    for j in range(h):
        hs = [(s, x(qa), x(ql)) for jj, s, qa, ql in hallit_ if jj == j]
        kaistat.append(None if not hs else [round(hs[0][1], 1), round(hs[0][2], 1)] if hs[0][0] is None
                       else {('1.' if s == 0 else '2.'): [round(a_, 1), round(b_, 1)] for s, a_, b_ in hs})
    return dict(akseli=a, poikkeama=round(((a - pohja + 180) % 360) - 180, 1), siirto=siirto, pituus=L, leveys=W, halleja=h,
                a=h | (jbit << 3), b=kartta & 255, c=kartta >> 8, p3_bitit=int.from_bytes(bytes(H[0:4]), 'little'),
                varattu=int.from_bytes(bytes(H[4:8]), 'little'), jatko=bytes(H[8:31]), kaistat=kaistat, julkisivu=ryhma,
                hallimaara=len(hallit_), ala=round(ala))


def pura(L, W, a, b, c, p3_bitit, varattu, jatko=bytes(23)):
    """Tiedoston rivistä kuten peli (MalliAsema): hallit [(z0, z1, x0, x1, julkisivu)], julkisivu (x0, x1, z0, z1) tai None. x0 julkisivukaistalla
    = alku − 1 (holvi alkaa metrin julkisivun sisältä)."""
    h, jb, kartta = a & 7, a >> 3, b | (c << 8)
    assert kartta & 0x8000, 'ei muotoa 2'
    H = list(p3_bitit.to_bytes(4, 'little')) + list(varattu.to_bytes(4, 'little')) + list(jatko)
    hl = W / h; hallit_ = []; js = []; i = 0
    for k in range(h):
        t = (kartta >> (3 * k)) & 7
        osat = {1: [(0.0, 1.0)], 2: [(0.0, 0.5)], 3: [(0.5, 1.0)], 4: [(0.0, 0.5), (0.5, 1.0)]}.get(t, [])
        for u0, u1 in osat:
            qa, ql = H[2 * i], H[2 * i + 1]; i += 1
            x0, x1 = -L / 2 + qa * L / 255.0, -L / 2 + ql * L / 255.0
            j = t == 1 and bool(jb >> k & 1)
            hallit_.append((-W / 2 + (k + u0) * hl, -W / 2 + (k + u1) * hl, x0 - (1.0 if j else 0.0), x1, j))
            if j: js.append((k, x0))
    jul = None
    if js:
        k0, k1 = min(k for k, _ in js), max(k for k, _ in js); etu = js[0][1]
        jul = (etu - JULKISIVU, etu, -W / 2 + k0 * hl, -W / 2 + (k1 + 1) * hl)
    return hallit_, jul


def kattavuus(m, akseli, siirto, hallit_, jul, askel=0.5):
    """KATETTU OSUUS (KK 07.25 kohta 1): (hallit + julkisivu) ∩ OSM-pohja / OSM-pohja, rasteri askel m mallin kehyksessä (keskipiste = merkki).
    Renkaat parillisuussäännöllä (sisärenkaat = reiät)."""
    R = renkaat(m); cx, cz = paikallinen(akseli, *siirto)
    Q = [[(x - cx, z - cz) for x, z in (paikallinen(akseli, e, n) for e, n in r)] for r in R]
    xs = [x for r in Q for x, _ in r]; zs = [z for r in Q for _, z in r]
    x0, z0 = min(xs), min(zs); nx, nz = int((max(xs) - x0) / askel) + 2, int((max(zs) - z0) / askel) + 2
    im = Image.new('1', (nx, nz), 0)
    for r in Q:
        ri = Image.new('1', (nx, nz), 0); ImageDraw.Draw(ri).polygon([((x - x0) / askel, (z - z0) / askel) for x, z in r], fill=1)
        from PIL import ImageChops
        im = ImageChops.logical_xor(im, ri)
    pe = Image.new('1', (nx, nz), 0); dp = ImageDraw.Draw(pe)
    laat = [(a0, a1, b0, b1) for b0, b1, a0, a1, _ in hallit_] + ([jul] if jul else [])
    for a0, a1, b0, b1 in laat:
        dp.rectangle([(a0 - x0) / askel, (b0 - z0) / askel, (a1 - x0) / askel - 1, (b1 - z0) / askel - 1], fill=1)
    from PIL import ImageChops
    pohja = sum(1 for v in im.getdata() if v); kat = sum(1 for v in ImageChops.logical_and(im, pe).getdata() if v)
    return kat / pohja if pohja else 0.0
