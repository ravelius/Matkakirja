# Lontoo: Elizabeth Tower (Big Ben) ja Parlamenttitalon siiven pätkä + Tower Bridge Thamesin yllä,
# yhdellä matalalla jalustalla (dioraama). Oma työ, CC0. Mitat metreinä todellisen mukaan
# (Elizabeth Tower 96 m, kellotaulut 7 m → 7,8 m, Tower Bridgen tornit 65 m, keskiväli 61 m, kävelysillat 42 m),
# mutta etäisyydet tiivistetty: oikeasti rakennusten väli on 3,4 km. Karttakehys: X itä, Y pohjoinen.
import math
import numpy as np
import mm_kirjasto as mk

NIMI = "Lontoo"

# Osat (tunnus leivotaan tekstuuriin; maalaa() värittää osittain)
MAA, REUNA, VESI, KIVI, KELLOKERROS, KELLO, KELLOREUNA, TAPULI, KATTO, KULTA, PALATSI, PALATSI_KATTO, \
    TB_KIVI, TB_KATTO, TB_PILARI, KAYTAVA, KANSI, KETJU = range(1, 19)

# Pinta-alan painot atlakseen (1 = tavallinen tekselitiheys)
PAINOT = {MAA: 0.10, REUNA: 0.04, VESI: 0.06, KELLO: 10.0, KELLOREUNA: 1.0, KELLOKERROS: 2.5, TAPULI: 2.0,
          KATTO: 2.0, KULTA: 2.0, KIVI: 1.3, KANSI: 0.6, TB_PILARI: 0.5}
AO_ETAISYYS = 14.0
MAAN_VARI = "#d8c9a3"

# Asettelu
MAA_Z = 1.6                       # jalustan yläpinta maaston yläpuolella (joki näkyy maaston päällä)
POHJA_Z = -25.0                   # helma maaston alle (maasto ei ole tasainen)
X0, X1, Y0, Y1, R = -160.0, 152.0, -72.0, 70.0, 22.0
BB = (-135.0, -45.0)              # Elizabeth Tower
TB = (25.0, 30.0)                 # Tower Bridgen keskipiste
JOKI = (-60.0, 110.0)             # Thames (x-väli)
VESI_Z = 0.5

NAKYMAT = [  # (nimi, kamera, kohde, polttoväli mm, (leveys, korkeus))
    ("etuviisto", (-170.0, -540.0, 210.0), (-5.0, 5.0, 38.0), 38, (1200, 800)),
    ("ylaviisto", (260.0, -620.0, 640.0), (0.0, 0.0, 25.0), 42, (1200, 800)),
    ("kaukaa", (-325.0, -1040.0, 715.0), (0.0, 0.0, 40.0), 60, (320, 200)),
]

def pyor_suorakaide(x0, y0, x1, y1, r, n=6):
    pts = []
    for cx, cy, a0 in ((x1 - r, y0 + r, -90), (x1 - r, y1 - r, 0), (x0 + r, y1 - r, 90), (x0 + r, y0 + r, 180)):
        for k in range(n + 1):
            a = math.radians(a0 + 90 * k / n)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def leikkaa(pts, x, pida_pienet):
    """Sutherland–Hodgman: pidä x ≤ raja (pida_pienet) tai x ≥ raja."""
    sisalla = (lambda p: p[0] <= x) if pida_pienet else (lambda p: p[0] >= x)
    ulos = []
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        if sisalla(a): ulos.append(a)
        if sisalla(a) != sisalla(b):
            t = (x - a[0]) / (b[0] - a[0]); ulos.append((x, a[1] + t * (b[1] - a[1])))
    return ulos

def nelio(cx, cy, h):
    return [(cx - h, cy - h), (cx + h, cy - h), (cx + h, cy + h), (cx - h, cy + h)]

def suorakaide(cx, cy, hx, hy):
    return [(cx - hx, cy - hy), (cx + hx, cy - hy), (cx + hx, cy + hy), (cx - hx, cy + hy)]

# ---------------------------------------------------------------------------------------------
def rakenna(v):
    # Jalusta: maa kahdessa osassa joen molemmin puolin + joki
    reuna = pyor_suorakaide(X0, Y0, X1, Y1, R)
    v.prisma(leikkaa(reuna, JOKI[0], True), POHJA_Z, MAA_Z, REUNA, osa_yla=MAA)
    v.prisma(leikkaa(reuna, JOKI[1], False), POHJA_Z, MAA_Z, REUNA, osa_yla=MAA)
    v.prisma(suorakaide((JOKI[0] + JOKI[1]) / 2, 0, (JOKI[1] - JOKI[0]) / 2, Y1), POHJA_Z, VESI_Z, REUNA, osa_yla=VESI)

    # ---- Elizabeth Tower ----
    bx, by = BB
    v.prisma(nelio(bx, by, 7.0), 0, 4.0, KIVI)
    v.prisma(nelio(bx, by, 6.0), 4.0, 53.0, KIVI, yla=False)
    for sx in (-1, 1):
        for sy in (-1, 1):
            v.prisma(nelio(bx + sx * 5.8, by + sy * 5.8, 0.75), 4.0, 53.0, KIVI, yla=False)
    v.prisma(nelio(bx, by, 6.7), 53.0, 55.0, KIVI)
    v.prisma(nelio(bx, by, 7.2), 55.0, 69.0, KELLOKERROS, yla=False)
    for n in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0)):
        v.kiekko((bx + n[0] * 7.2, by + n[1] * 7.2, 62.0), n, 3.9, 0.3, 24, KELLO, KELLOREUNA)
    v.prisma(nelio(bx, by, 7.6), 69.0, 70.2, KIVI)
    for sx in (-1, 1):
        for sy in (-1, 1):   # kellokerroksen kulmapinaakkelit
            v.pyramidi(nelio(bx + sx * 6.8, by + sy * 6.8, 0.8), 70.2, (bx + sx * 6.8, by + sy * 6.8, 76.0), KIVI)
    v.prisma(nelio(bx, by, 5.9), 70.2, 79.0, TAPULI, yla=False)
    for sx in (-1, 1):
        for sy in (-1, 1):   # tapulin kulmatornit
            cx, cy = bx + sx * 5.6, by + sy * 5.6
            v.lierio(cx, cy, 70.2, 80.0, 1.0, 1.0, 6, TAPULI, yla=False, smooth=False)
            v.pyramidi([(cx + 1.0 * math.cos(2 * math.pi * k / 6), cy + 1.0 * math.sin(2 * math.pi * k / 6)) for k in range(6)],
                       80.0, (cx, cy, 84.5), KATTO)
    # Kattotorni: jyrkkä kahden osan huippukatto, lyhty ja kultainen kärki
    v.prisma(nelio(bx, by, 6.0), 79.0, 85.0, KATTO, yla=False, z1_pohja=nelio(bx, by, 4.1))
    v.prisma(nelio(bx, by, 4.1), 85.0, 89.0, KATTO, yla=False, z1_pohja=nelio(bx, by, 2.5))
    v.prisma(nelio(bx, by, 2.1), 89.0, 91.5, KULTA, yla=False)
    v.pyramidi(nelio(bx, by, 2.4), 91.5, (bx, by, 95.5), KATTO)
    v.lierio(bx, by, 95.0, 97.2, 0.4, 0.08, 6, KULTA, yla=False, smooth=False)

    # ---- Parlamenttitalon siipi (Elizabeth Towerin itäpuolella) ----
    v.laatikko(bx + 6.0, by - 6.5, 0, bx + 34.0, by + 9.5, 19.0, PALATSI, yla=False)
    v.harja(bx + 6.0, by - 6.5, bx + 34.0, by + 9.5, 19.0, 26.0, PALATSI_KATTO, 'x', osa_paaty=PALATSI)
    for dx in (12.0, 21.0, 30.0):
        cx, cy = bx + dx, by - 7.2
        v.prisma(nelio(cx, cy, 0.8), 0, 23.0, PALATSI, yla=False)
        v.pyramidi(nelio(cx, cy, 0.8), 23.0, (cx, cy, 28.5), PALATSI_KATTO)

    # ---- Tower Bridge ----
    tx0, ty = TB
    for s in (-1, 1):
        tx = tx0 + s * 40.0
        # veneenmuotoinen pilari (virtaus pohjois-etelä)
        pilari = [(-13, -16), (-9, -21), (0, -25), (9, -21), (13, -16), (13, 16), (9, 21), (0, 25), (-9, 21), (-13, 16)]
        v.prisma([(tx + x, ty + y) for x, y in pilari], POHJA_Z, 5.0, TB_PILARI)
        v.prisma(suorakaide(tx, ty, 9.0, 11.0), 5.0, 47.0, TB_KIVI, yla=False)
        for sx in (-1, 1):
            for sy in (-1, 1):
                cx, cy = tx + sx * 9.0, ty + sy * 11.0
                v.lierio(cx, cy, 5.0, 52.0, 2.6, 2.6, 8, TB_KIVI, kulma0=math.pi / 8, yla=False, smooth=False)
                v.prisma([(cx + 3.0 * math.cos(math.pi / 8 + 2 * math.pi * k / 8), cy + 3.0 * math.sin(math.pi / 8 + 2 * math.pi * k / 8)) for k in range(8)],
                         52.0, 53.0, TB_KIVI, yla=False)
                v.pyramidi([(cx + 3.0 * math.cos(math.pi / 8 + 2 * math.pi * k / 8), cy + 3.0 * math.sin(math.pi / 8 + 2 * math.pi * k / 8)) for k in range(8)],
                           53.0, (cx, cy, 61.0), TB_KATTO)
                v.lierio(cx, cy, 60.5, 62.5, 0.25, 0.05, 4, KULTA, yla=False, smooth=False)
        v.prisma(suorakaide(tx, ty, 9.6, 11.6), 47.0, 48.2, TB_KIVI, yla=False)
        v.pyramidi(suorakaide(tx, ty, 9.6, 11.6), 48.2, (tx, ty, 61.0), TB_KATTO)
        v.lierio(tx, ty, 60.0, 66.0, 0.6, 0.08, 4, KULTA, yla=False, smooth=False)
        # rantatorni (maatuki)
        ax = tx0 + s * 105.0
        v.prisma(suorakaide(ax, ty, 6.0, 9.0), 0, 20.0, TB_KIVI, yla=False)
        v.pyramidi(suorakaide(ax, ty, 6.2, 9.2), 20.0, (ax, ty, 27.0), TB_KATTO)
        for sy in (-1, 1):
            cx, cy = ax - s * 6.0, ty + sy * 9.0
            v.lierio(cx, cy, 0, 22.0, 1.4, 1.4, 6, TB_KIVI, yla=False, smooth=False)
            v.pyramidi([(cx + 1.5 * math.cos(2 * math.pi * k / 6), cy + 1.5 * math.sin(2 * math.pi * k / 6)) for k in range(6)],
                       22.0, (cx, cy, 27.5), TB_KATTO)
        # sivujänteen kansi ja riippuketjut
        xa, xb = tx0 + s * 49.0, tx0 + s * 99.0
        v.laatikko(min(xa, xb), ty - 8.0, 7.5, max(xa, xb), ty + 8.0, 9.5, KANSI, ala=True)
        tm, zmin = 0.6387, 11.0
        A = 25.0 / tm ** 2
        xk = tx0 + s * 101.0
        for yk in (ty - 7.0, ty + 7.0):
            polku = []
            for i in range(13):
                t = i / 12
                polku.append((xa + (xk - xa) * t, yk, zmin + A * (t - tm) ** 2))
            v.palkki(polku, 1.2, 1.8, KETJU)
            for t in (0.14, 0.28, 0.84):
                x = xa + (xk - xa) * t; z = zmin + A * (t - tm) ** 2
                v.laatikko(x - 0.25, yk - 0.25, 9.5, x + 0.25, yk + 0.25, z, KETJU, yla=False)
    # keskijänne: läppäsillan kansi ja kaksi kävelysiltaa
    v.laatikko(tx0 - 31.0, ty - 8.0, 7.5, tx0 + 31.0, ty + 8.0, 9.5, KANSI, ala=True)
    for sy in (-1, 1):
        v.laatikko(tx0 - 31.0, ty + sy * 7.5, 38.0, tx0 + 31.0, ty + sy * 4.0, 43.0, KAYTAVA, ala=True)

# ---------------------------------------------------------------------------------------------
def maalaa(g):
    P, N, OSA, PAR, K = g["P"], g["N"], g["OSA"], g["PAR"], g["K"]
    x, y, z = P[..., 0], P[..., 1], P[..., 2]
    pysty = np.abs(N[..., 2]) < 0.5
    ylos = N[..., 2] > 0.7
    vari = np.zeros(P.shape, np.float32) + mk.hexa("#b0a58f")
    vaihtelu = mk.fbm(P, 0.12, 1.0, 3)          # isot laikut
    hieno = mk.fbm(P, 0.9, 2.0, 2)              # pieni rakeisuus

    def osa(*k):
        m = np.zeros(OSA.shape, bool)
        for kk in k: m |= OSA == kk
        return m

    # ---- Elizabeth Tower ja parlamentti: hunajainen kalkkikivi, goottilainen paneelijako ----
    kivi = osa(KIVI, KELLOKERROS, TAPULI, PALATSI)
    perus = mk.hexa("#cdb683") * (0.88 + 0.22 * vaihtelu[..., None]) * (0.95 + 0.1 * hieno[..., None])
    vari = mk.sekoita(vari, kivi.astype(float), perus)
    ub = mk.pinta_u(P, N, BB)
    # pystylistat 1,5 m välein ja vaakavyöt
    lista = mk.viiva(mk.jakso(ub, 1.5, 0.75), 0.22) * pysty
    vyo = mk.viiva(mk.jakso(z, 6.0, 1.0), 0.35) * pysty
    vari = mk.sekoita(vari, (kivi & osa(KIVI, PALATSI)) * np.maximum(lista * 0.35, vyo * 0.25), mk.hexa("#8e7a52"))
    # kapeat suippokaari-ikkunat varressa
    ikkuna = np.full(OSA.shape, 1e3)
    for u0 in (-3.0, 0.0, 3.0):
        for z0 in range(9, 50, 7):
            ikkuna = np.minimum(ikkuna, mk.kaari_ikkuna(ub, z, u0, z0, 1.1, 4.0))
    varsi = osa(KIVI) & (np.hypot(x - BB[0], y - BB[1]) < 9.0) & pysty & (z > 6) & (z < 52.5)
    vari = mk.sekoita(vari, varsi * mk.peitto(ikkuna, 0.18), mk.hexa("#2b2520"))
    # kellokerros: kullattu neliökehys taulun ympärillä, taulun keskipiste z = 62
    kk = osa(KELLOKERROS) & pysty
    ruutu = np.maximum(np.abs(ub), np.abs(z - 62.0))
    kehys = (ruutu < 5.4) & (np.hypot(ub, z - 62.0) > 3.7)
    vari = mk.sekoita(vari, kk * kehys * (0.75 + 0.25 * hieno), mk.hexa("#c79a3e"))
    vari = mk.sekoita(vari, kk * mk.viiva(ruutu - 5.4, 0.25), mk.hexa("#6f5a33"))
    # tapuli: kolme korkeaa aukkoa sivullaan
    aukot = np.full(OSA.shape, 1e3)
    for u0 in (-3.4, 0.0, 3.4):
        aukot = np.minimum(aukot, mk.kaari_ikkuna(ub, z, u0, 71.2, 2.1, 6.6))
    vari = mk.sekoita(vari, (osa(TAPULI) & pysty & (np.hypot(x - BB[0], y - BB[1]) < 6.3)) * mk.peitto(aukot, 0.2), mk.hexa("#221d19"))
    # parlamentin siipi: kaksi kerrosta suippoikkunoita
    up = x - BB[0]
    pal_ikk = np.full(OSA.shape, 1e3)
    for z0 in (4.0, 11.0):
        for u0 in np.arange(9.0, 34.0, 3.0):
            pal_ikk = np.minimum(pal_ikk, mk.kaari_ikkuna(up, z, u0, z0, 1.3, 4.6))
    vari = mk.sekoita(vari, (osa(PALATSI) & (np.abs(N[..., 1]) > 0.7)) * mk.peitto(pal_ikk, 0.2), mk.hexa("#2e2823"))

    # ---- Kellotaulut: vaalea opaalilasi, tummat tuntimerkit ja viisarit (kello 10.10) ----
    kello = osa(KELLO) & (np.linalg.norm(N[..., :2], axis=-1) > 0.5)
    u, w = PAR[..., 0], PAR[..., 1]
    r = np.hypot(u, w)
    kv = mk.hexa("#f3ecd6") * (0.96 + 0.04 * hieno[..., None])
    th = np.arctan2(u, w)                           # 0 = klo 12, myötäpäivään
    tunti = np.abs(np.sin((th * 6 / math.pi - np.round(th * 6 / math.pi)) * math.pi / 6)) * r
    merkit = (tunti < 0.045) & (r > 0.70) & (r < 0.88)
    rengas = (r > 0.89) | ((r > 0.62) & (r < 0.655))
    def viisari(kulma_h, pituus, leveys):
        dx, dy = math.sin(kulma_h * math.pi / 6), math.cos(kulma_h * math.pi / 6)
        t = np.clip(u * dx + w * dy, -0.08, pituus)
        return np.hypot(u - t * dx, w - t * dy) < leveys
    tumma = merkit | rengas | viisari(10.0 + 10 / 60, 0.50, 0.045) | viisari(2.0, 0.80, 0.03) | (r < 0.06)
    kv = np.where(tumma[..., None], mk.hexa("#1f1c19"), kv)
    vari = np.where(kello[..., None], kv, vari)
    vari = mk.sekoita(vari, osa(KELLO) & ~kello, mk.hexa("#8c7440"))
    vari = mk.sekoita(vari, osa(KELLOREUNA), mk.hexa("#6d5a34"))

    # ---- Katot ja kulta ----
    katto = osa(KATTO)
    kv = mk.hexa("#353b47") * (0.9 + 0.2 * vaihtelu[..., None])
    vari = mk.sekoita(vari, katto, kv)
    uk = mk.pinta_u(P, N, BB)
    rivat = mk.viiva(mk.jakso(uk, 1.3, 0.0), 0.16) * (np.hypot(x - BB[0], y - BB[1]) < 7.0)
    vyot = mk.viiva(mk.jakso(z, 2.0, 0.0), 0.18) * (z > 79.5)
    vari = mk.sekoita(vari, katto * np.maximum(rivat, vyot) * 0.85, mk.hexa("#c9a044"))
    vari = mk.sekoita(vari, osa(KULTA), mk.hexa("#dcb04a") * (0.85 + 0.3 * hieno[..., None]))
    vari = mk.sekoita(vari, osa(PALATSI_KATTO), mk.hexa("#4b515b") * (0.9 + 0.2 * vaihtelu[..., None]))

    # ---- Tower Bridge ----
    tbk = osa(TB_KIVI)
    tv = mk.hexa("#dcd4c2") * (0.9 + 0.16 * vaihtelu[..., None]) * (0.96 + 0.08 * hieno[..., None])
    tv = tv * np.where(z < 10.0, 0.82 + 0.018 * z, 1.0)[..., None]
    vari = mk.sekoita(vari, tbk, tv)
    s = np.sign(x - TB[0]); s[s == 0] = 1
    tcx = TB[0] + s * np.where(np.abs(x - TB[0]) > 75, 105.0, 40.0)
    # tornin oma vaakakoordinaatti: pinta_u tornin keskipisteen suhteen (keskipiste vaihtelee tekseleittäin)
    t2 = np.stack([-N[..., 1], N[..., 0]], -1); t2 /= np.maximum(np.linalg.norm(t2, axis=-1, keepdims=True), 1e-6)
    ut = (x - tcx) * t2[..., 0] + (y - TB[1]) * t2[..., 1]
    tb_ikk = np.full(OSA.shape, 1e3)
    for z0 in (14.0, 22.0, 30.0, 39.0):
        for u0 in (-6.0, -2.0, 2.0, 6.0):
            tb_ikk = np.minimum(tb_ikk, mk.kaari_ikkuna(ut, z, u0, z0, 1.3, 3.2))
    runko = tbk & pysty & (np.abs(np.abs(x - TB[0]) - 40.0) < 9.3) & (np.abs(y - TB[1]) < 11.3)
    vari = mk.sekoita(vari, runko * mk.peitto(tb_ikk, 0.2), mk.hexa("#30343a"))
    # tien holvikaari tornin läpi (itä- ja länsiseinä)
    holvi = mk.kaari_ikkuna(ut, z, 0.0, 9.5, 9.0, 10.5)
    vari = mk.sekoita(vari, runko * (np.abs(N[..., 0]) > 0.7) * mk.peitto(holvi, 0.25), mk.hexa("#26282c"))
    # kulmatornien kapeat ikkunat
    a = PAR[..., 0]
    kapea = (np.abs(mk.jakso(a, 0.25, 0.125)) < 0.035) & (np.abs(mk.jakso(z, 6.0, 3.0)) < 1.3) & (z > 12) & (z < 50)
    vari = mk.sekoita(vari, tbk & ~runko & pysty & (np.abs(np.abs(x - TB[0]) - 40.0) < 12.5) & kapea, mk.hexa("#33373d"))
    vari = mk.sekoita(vari, osa(TB_KATTO), mk.hexa("#434a55") * (0.9 + 0.2 * vaihtelu[..., None]))
    vari = mk.sekoita(vari, osa(TB_KATTO) * mk.viiva(mk.jakso(z, 2.5, 0.0), 0.12) * 0.6, mk.hexa("#c9a044"))
    pv = mk.hexa("#8f8a80") * (0.85 + 0.25 * vaihtelu[..., None])
    pv = np.where((z < 1.4)[..., None], mk.hexa("#4d4a44"), pv)
    vari = mk.sekoita(vari, osa(TB_PILARI), pv)
    # sininen ja valkoinen teräs
    sininen = mk.hexa("#4a88c4"); valkoinen = mk.hexa("#eef0ea")
    kay = osa(KAYTAVA)
    kv = np.zeros_like(vari) + sininen
    dz = z - 38.0
    ristikko = (np.abs(mk.jakso(x + dz, 5.0)) < 0.45) | (np.abs(mk.jakso(x - dz, 5.0)) < 0.45) | (dz < 0.6) | (dz > 4.4)
    kv = np.where((ristikko & (np.abs(N[..., 1]) > 0.7))[..., None], valkoinen, kv)
    kv = np.where(ylos[..., None], mk.hexa("#6f7780"), kv)
    vari = np.where(kay[..., None], kv, vari)
    kansi = osa(KANSI)
    kv = np.zeros_like(vari) + sininen
    kv = np.where((z > 8.9)[..., None] & pysty[..., None], valkoinen, kv)
    tie = np.where((np.abs(y - TB[1]) > 6.2)[..., None], mk.hexa("#a29d92"), mk.hexa("#5a5a5e"))
    kv = np.where(ylos[..., None], tie, kv)
    vari = np.where(kansi[..., None], kv, vari)
    ketju = osa(KETJU)
    kv = np.where((N[..., 2] > 0.5)[..., None], valkoinen, sininen)
    vari = np.where(ketju[..., None], kv, vari)

    # ---- Jalusta: nurmi, kiveys, tie; rantamuurit; Thames ----
    maa = osa(MAA)
    mv = mk.hexa("#7f935d") * (0.85 + 0.3 * vaihtelu[..., None])
    puut = mk.fbm(P, 0.07, 5.0, 3) > 0.6
    mv = np.where(puut[..., None], mk.hexa("#4d6636") * (0.8 + 0.4 * hieno[..., None]), mv)
    kiveys = (np.maximum(np.abs(x - (BB[0] + 13)) - 26, np.abs(y - BB[1]) - 16) < 0) | \
             (np.maximum(np.abs(np.abs(x - TB[0]) - 105) - 12, np.abs(y - TB[1]) - 15) < 0)
    mv = np.where(kiveys[..., None], mk.hexa("#bdb5a3") * (0.92 + 0.12 * hieno[..., None]), mv)
    tie = (np.abs(y - TB[1]) < 8.0) & (np.abs(x - TB[0]) > 105)
    mv = np.where(tie[..., None], mk.hexa("#77746e"), mv)
    ranta = (x > JOKI[0] - 9) & (x < JOKI[1] + 9)
    mv = np.where((ranta & ~tie)[..., None], mk.hexa("#a9a293"), mv)
    vari = np.where(maa[..., None], mv, vari)
    reuna = osa(REUNA)
    muuri = (np.abs(x - JOKI[0]) < 0.5) | (np.abs(x - JOKI[1]) < 0.5)
    rv = np.where(muuri[..., None], mk.hexa("#8b857a") * (0.9 + 0.2 * hieno[..., None]), mk.hexa("#9c8f73") * (0.9 + 0.2 * vaihtelu[..., None]))
    rv = rv * (1 - 0.3 * mk.viiva(mk.jakso(z, 0.8, 0.0), 0.08))[..., None]
    vari = np.where(reuna[..., None], rv, vari)
    vesi = osa(VESI)
    aalto = mk.fbm(P, 0.05, 9.0, 3, (1.0, 0.25, 1.0))
    wv = mk.hexa("#43698a") * (0.85 + 0.3 * aalto[..., None])
    vari = np.where(vesi[..., None], wv, vari)
    return vari
