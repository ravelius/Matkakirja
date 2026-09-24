# Ateena: Akropolis — kalliotasanne, Parthenon (kattoton raunio, pylväät ja päätykolmiot), Erekhtheion,
# Propylaia ja Athena Niken temppeli, oliivipuita rinteillä. Oma työ, CC0.
# Kallio todellisessa mittakaavassa (tasanne noin 300 × 140 m, 70 m jalan yläpuolella); temppelit
# liioiteltu 1,4-kertaisiksi, jotta ne erottuvat kallion päältä kaukaa. Karttakehys: X itä, Y pohjoinen.
import math
import numpy as np
import mm_kirjasto as mk

NIMI = "Ateena"

KALLIO, RINNE, HELMA, MUURI, TASANNE, MARMORI, PYLVAS, PAATY, LATTIA, KASVI, RAUNIO = range(1, 12)

PAINOT = {KALLIO: 0.5, RINNE: 0.12, HELMA: 0.02, MUURI: 0.8, TASANNE: 0.35, MARMORI: 1.6, PYLVAS: 1.6,
          PAATY: 2.0, LATTIA: 0.8, KASVI: 0.4, RAUNIO: 0.6}
AO_ETAISYYS = 18.0
MAAN_VARI = "#d9c9a0"

S = 1.4                         # temppelien liioittelu
YLA_Z = 70.0                    # tasanteen korkeus jalasta
PARTHENON = (35.0, -20.0)
ERE = (0.0, 38.0)
PROPYLAIA = (-128.0, -2.0)
NIKE = (-140.0, -34.0)

NAKYMAT = [
    ("etuviisto", (-260.0, -760.0, 300.0), (0.0, 0.0, 55.0), 40, (1200, 800)),
    ("ylaviisto", (320.0, -760.0, 800.0), (0.0, 0.0, 50.0), 42, (1200, 800)),
    ("kaukaa", (-420.0, -1350.0, 930.0), (0.0, 0.0, 45.0), 60, (320, 200)),
]

def suorakaide(cx, cy, hx, hy):
    return [(cx - hx, cy - hy), (cx + hx, cy - hy), (cx + hx, cy + hy), (cx - hx, cy + hy)]

# ---------------------------------------------------------------------------------------------
def tasanteen_reuna(n=48, siemen=7):
    """Tasanteen ääriviiva: pitkulainen (itä-länsi), länsipää kapeampi, satunnainen reuna."""
    rs = np.random.RandomState(siemen)
    a, b, p = 152.0, 72.0, 2.6
    pts, suunnat = [], []
    for j in range(n):
        th = 2 * math.pi * j / n
        c, s = math.cos(th), math.sin(th)
        r = (abs(c / a) ** p + abs(s / b) ** p) ** (-1 / p)
        x, y = r * c, r * s
        if x < -60: y *= 1 - 0.35 * ((-x - 60) / 92)
        if y < 0 and x > 0: y *= 1.08          # eteläreuna pullistuu Parthenonin kohdalla
        r_j = 1 + rs.uniform(-0.025, 0.025)
        x, y = x * r_j, y * r_j
        d = np.array([x / a ** 2, y / b ** 2]); d /= np.linalg.norm(d)
        pts.append((x, y)); suunnat.append(d)
    return np.array(pts), np.array(suunnat)

def rakenna_kallio(v):
    reuna, suunta = tasanteen_reuna()
    n = len(reuna)
    rs = np.random.RandomState(11)
    # (korkeus, siirto ulos, satunnaisuus, osa ylempään väliin)
    renkaat = [(YLA_Z, 0.0, 0.0), (YLA_Z - 13.0, 2.5, 1.2), (YLA_Z - 30.0, 13.0, 4.0), (YLA_Z - 52.0, 42.0, 9.0),
               (0.0, 92.0, 12.0), (-30.0, 98.0, 0.0)]
    osat = [MUURI, KALLIO, KALLIO, RINNE, HELMA]
    idx = []
    for k, (z, siirto, sat) in enumerate(renkaat):
        rivi = []
        for j in range(n):
            s = siirto + (rs.uniform(-sat, sat) if sat else 0.0)
            if k and reuna[j][0] < -110 and k >= 2: s *= 0.8      # länsirinne loivempi ja lyhyempi
            p = reuna[j] + suunta[j] * s
            zz = z + (rs.uniform(-0.4, 0.4) if k == 0 else rs.uniform(-sat, sat) * 0.35 if 0 < k < 5 else 0.0)
            rivi.append(v.piste((p[0], p[1], zz)))
        idx.append(rivi)
    for k in range(len(renkaat) - 1):
        for j in range(n):
            j1 = (j + 1) % n
            q = [idx[k][j], idx[k + 1][j], idx[k + 1][j1], idx[k][j1]]
            ulos = np.array([*(suunta[j] + suunta[j1]), 0.0])
            # kaksi kolmiota erikseen: tasainen (flat) sävytys antaa kallion särmät
            v.taho([q[0], q[1], q[2]], osat[k], None, False, ulos)
            v.taho([q[0], q[2], q[3]], osat[k], None, False, ulos)
    v.taho(idx[0], TASANNE, None, False, (0, 0, 1))
    return reuna, suunta, idx

def pylvas(v, cx, cy, z0, korkeus, r0, r1, n=8, kapiteeli=True):
    v.lierio(cx, cy, z0, z0 + korkeus, r0, r1, n, PYLVAS, kulma0=math.pi / n, yla=False, smooth=True)
    if kapiteeli:
        h = r0 * 1.1
        v.laatikko(cx - h, cy - h, z0 + korkeus, cx + h, cy + h, z0 + korkeus + r0 * 0.75, MARMORI, yla=False)

def rakenna_parthenon(v):
    px, py = PARTHENON
    hx, hy = 69.5 * S / 2, 30.9 * S / 2           # stylobaatti
    # krepidoma: kolme askelmaa (alin ulottuu kallion sisään)
    v.laatikko(px - hx - 1.4, py - hy - 1.4, YLA_Z - 4.0, px + hx + 1.4, py + hy + 1.4, YLA_Z + 0.75, MARMORI, osa_yla=LATTIA)
    v.laatikko(px - hx - 0.7, py - hy - 0.7, YLA_Z + 0.75, px + hx + 0.7, py + hy + 0.7, YLA_Z + 1.5, MARMORI, osa_yla=LATTIA)
    v.laatikko(px - hx, py - hy, YLA_Z + 1.5, px + hx, py + hy, YLA_Z + 2.24, MARMORI, osa_yla=LATTIA)
    zs = YLA_Z + 2.24
    kork, r0, r1 = 10.43 * S - 1.0, 0.95 * S, 0.75 * S
    ax, ay = hx - 1.7, hy - 1.7
    zk = zs + kork + r0 * 0.75                    # kapiteelin yläpinta
    for i in range(17):
        x = px - ax + 2 * ax * i / 16
        for y in (py - ay, py + ay):
            pylvas(v, x, y, zs, kork, r0, r1)
    for i in range(1, 7):
        y = py - ay + 2 * ay * i / 7
        for x in (px - ax, px + ax):
            pylvas(v, x, y, zs, kork, r0, r1)
    # palkisto (arkkitraavi + friisi) kehänä pylväiden päällä
    h = r0 * 1.1
    ze = zk + 3.3 * S
    v.laatikko(px - ax - h, py - ay - h, zk, px + ax + h, py - ay + h, ze, MARMORI, ala=True)
    v.laatikko(px - ax - h, py + ay - h, zk, px + ax + h, py + ay + h, ze, MARMORI, ala=True)
    v.laatikko(px - ax - h, py - ay + h, zk, px - ax + h, py + ay - h, ze, MARMORI, ala=True)
    v.laatikko(px + ax - h, py - ay + h, zk, px + ax + h, py + ay - h, ze, MARMORI, ala=True)
    # päätykolmiot itä- ja länsipäässä
    for sx in (-1, 1):
        x0, x1 = sorted((px + sx * (ax - h), px + sx * (ax + h + 0.4)))
        v.harja(x0, py - ay - h - 0.4, x1, py + ay + h + 0.4, ze, ze + 3.45 * S, PAATY, 'x')
    # sella: rauniomuurit (länsiseinä täysi, sivuseinät matalia) ja sisäpylväikköjen pylväät
    cx0, cx1 = px - 29.0 * S, px + 29.0 * S
    cy = 10.85 * S
    t = 1.2 * S
    v.laatikko(cx0 + 5.0 * S, py - cy, zs, cx1 - 5.0 * S, py - cy + t, zs + 5.5, MARMORI)
    v.laatikko(cx0 + 5.0 * S, py + cy - t, zs, cx1 - 5.0 * S, py + cy, zs + 7.0, MARMORI)
    v.laatikko(cx0 + 5.0 * S, py - cy + t, zs, cx0 + 5.0 * S + t, py + cy - t, zk, MARMORI)
    v.laatikko(px + 7.0 * S, py - cy + t, zs, px + 7.0 * S + t, py + cy - t, zs + 4.0, MARMORI)
    for sx in (-1, 1):
        x = px + sx * (29.0 * S - 1.5 * S)
        for i in range(6):
            y = py - cy + 0.8 * S + (2 * cy - 1.6 * S) * i / 5
            pylvas(v, x, y, zs, kork * 0.92, r0 * 0.85, r1 * 0.85, 6, kapiteeli=False)

def rakenna_muut(v):
    # Erekhtheion: pääosa, loiva harjakatto, itäportiko (6 joonialaista pylvästä), karyatidiportiko
    ex, ey = ERE
    hx, hy = 23.5 * S / 2, 11.6 * S / 2
    zt = YLA_Z + 0.8
    v.laatikko(ex - hx - 1, ey - hy - 1, YLA_Z - 3, ex + hx + 1, ey + hy + 1, zt, MARMORI, osa_yla=LATTIA)
    v.laatikko(ex - hx, ey - hy, zt, ex + hx - 4.0, ey + hy, zt + 9.0 * S, MARMORI, yla=False)
    v.harja(ex - hx, ey - hy, ex + hx - 4.0, ey + hy, zt + 9.0 * S, zt + 9.0 * S + 2.6, PAATY, 'x', osa_paaty=MARMORI)
    for i in range(6):
        y = ey - hy + 0.9 + (2 * hy - 1.8) * i / 5
        pylvas(v, ex + hx - 1.0, y, zt, 9.0 * S - 0.9, 0.6 * S, 0.5 * S, 6, kapiteeli=False)
    v.laatikko(ex + hx - 4.0, ey - hy, zt + 9.0 * S - 0.9, ex + hx + 0.2, ey + hy, zt + 9.0 * S + 1.0, MARMORI, ala=True)
    # karyatidiportiko eteläsivulla (länsipäässä)
    kx, ky = ex - hx + 6.0, ey - hy - 3.2
    for sx in (-1, 1):
        for sy in (-1, 1):
            v.lierio(kx + sx * 3.2, ky + sy * 1.6, zt, zt + 4.5, 0.55, 0.45, 4, PYLVAS, yla=False, smooth=False)
    v.laatikko(kx - 4.0, ky - 2.3, zt + 4.5, kx + 4.0, ky + 3.2, zt + 5.8, MARMORI, ala=True)

    # Propylaia: keskirakennus, länsiportiko (6 dooralaista pylvästä) ja päätykolmio, sivusiivet
    qx, qy = PROPYLAIA
    zt = YLA_Z - 2.0
    v.laatikko(qx - 12.0, qy - 16.0, zt - 3, qx + 10.0, qy + 16.0, zt, MARMORI, osa_yla=LATTIA)
    v.laatikko(qx - 2.0, qy - 12.0, zt, qx + 9.0, qy + 12.0, zt + 13.0, MARMORI, yla=False)
    v.harja(qx - 11.0, qy - 12.0, qx + 9.0, qy + 12.0, zt + 13.0, zt + 16.5, PAATY, 'x', osa_paaty=PAATY)
    for i in range(6):
        y = qy - 10.0 + 20.0 * i / 5
        pylvas(v, qx - 9.5, y, zt, 12.0, 1.1, 0.9, 8)
    v.laatikko(qx - 11.0, qy - 12.0, zt + 12.0 + 0.8, qx - 2.0, qy + 12.0, zt + 13.0, MARMORI, ala=True)
    v.laatikko(qx - 8.0, qy + 12.0, zt, qx + 6.0, qy + 24.0, zt + 9.0, MARMORI)
    # Athena Niken pieni temppeli lounaisbastionilla
    nx, ny = NIKE
    v.laatikko(nx - 9.0, ny - 7.0, YLA_Z - 12.0, nx + 9.0, ny + 7.0, YLA_Z - 1.0, MUURI)
    v.laatikko(nx - 4.2, ny - 2.8, YLA_Z - 1.0, nx + 4.2, ny + 2.8, YLA_Z + 5.5, MARMORI, yla=False)
    v.harja(nx - 4.6, ny - 3.2, nx + 4.6, ny + 3.2, YLA_Z + 5.5, YLA_Z + 7.2, PAATY, 'x')

def rakenna_puut_ja_rauniot(v, reuna, suunta, idx):
    rs = np.random.RandomState(23)
    n = len(reuna)
    P = np.array(v.v)
    for _ in range(34):
        j = rs.randint(n); t = rs.uniform(0.15, 0.95)
        a = P[idx[3][j]]; b = P[idx[4][j]]
        c = a + (b - a) * t
        r = rs.uniform(3.5, 6.0); h = rs.uniform(6.0, 9.0)
        zc = c[2] + h * 0.35
        kuusi = [(c[0] + r * math.cos(k * math.pi / 3 + 0.3), c[1] + r * math.sin(k * math.pi / 3 + 0.3)) for k in range(6)]
        v.pyramidi(kuusi, zc, (c[0], c[1], zc + h * 0.65), KASVI)
        v.pyramidi(kuusi, zc, (c[0], c[1], c[2] - 1.0), KASVI)
    # marmorilohkareita tasanteella
    for (x, y, s) in ((-70, -30, 4.0), (-60, 22, 3.0), (-95, 30, 3.5), (-30, 5, 2.5), (95, 20, 3.0), (100, -40, 2.8),
                      (-40, -45, 3.2), (65, 30, 2.6), (-85, -12, 2.4), (20, 12, 2.2)):
        a = rs.uniform(0, math.pi)
        pts = [(x + s * 1.6 * math.cos(a + k * math.pi / 2) - s * math.sin(a + k * math.pi / 2) * 0.0,
                y + s * 1.6 * math.sin(a + k * math.pi / 2)) for k in range(4)]
        v.prisma(pts, YLA_Z - 1.0, YLA_Z + s * 0.7, RAUNIO)

def rakenna(v):
    reuna, suunta, idx = rakenna_kallio(v)
    rakenna_parthenon(v)
    rakenna_muut(v)
    rakenna_puut_ja_rauniot(v, reuna, suunta, idx)

# ---------------------------------------------------------------------------------------------
def maalaa(g):
    P, N, OSA, PAR = g["P"], g["N"], g["OSA"], g["PAR"]
    x, y, z = P[..., 0], P[..., 1], P[..., 2]
    ylos = N[..., 2] > 0.7
    jyrkka = N[..., 2] < 0.45
    vaihtelu = mk.fbm(P, 0.08, 1.0, 3)
    hieno = mk.fbm(P, 0.7, 2.0, 2)
    vari = np.zeros(P.shape, np.float32) + mk.hexa("#b8a98b")

    def osa(*k):
        m = np.zeros(OSA.shape, bool)
        for kk in k: m |= OSA == kk
        return m

    # ---- Kallio: kalkkikivi, rautaläikät, kerrokset; rinteillä kuivaa ruohoa ja pensaikkoa ----
    kallio = osa(KALLIO, RINNE, HELMA)
    kv = mk.hexa("#b5a384") * (0.82 + 0.3 * vaihtelu[..., None]) * (0.93 + 0.12 * hieno[..., None])
    ruoste = np.clip((mk.fbm(P, 0.05, 3.0, 3) - 0.5) * 3, 0, 1)
    kv = kv * (1 - 0.35 * ruoste[..., None]) + mk.hexa("#a57a58") * (0.35 * ruoste[..., None])
    kerros = mk.viiva(mk.jakso(z + 2 * mk.kohina(P, 0.05, 4.0), 3.2), 0.35)
    kv = kv * (1 - 0.12 * kerros[..., None])
    kv = np.where(jyrkka[..., None], kv * 0.92, kv)
    kasvit = np.clip((mk.fbm(P, 0.06, 6.0, 3) - 0.42) * 4, 0, 1) * np.clip((45 - z) / 25, 0, 1) * np.clip((N[..., 2] - 0.3) * 4, 0, 1)
    ruoho = mk.hexa("#8e8a5a") * (0.85 + 0.3 * hieno[..., None])
    kv = kv * (1 - kasvit[..., None]) + ruoho * kasvit[..., None]
    pensas = (mk.fbm(P, 0.18, 8.0, 2) > 0.6) & (kasvit > 0.4)
    kv = np.where(pensas[..., None], mk.hexa("#5d6a3c"), kv)
    vari = np.where(kallio[..., None], kv, vari)
    # ---- Muurit tasanteen reunalla: vaaleampi kiviladonta ----
    muuri = osa(MUURI)
    mv = mk.hexa("#c9b890") * (0.88 + 0.22 * vaihtelu[..., None])
    mv = mv * (1 - 0.18 * mk.viiva(mk.jakso(z, 1.1), 0.12))[..., None]
    vari = np.where(muuri[..., None], mv, vari)
    # ---- Tasanne: pölyinen kallio, polku Propylaialta Parthenonille ----
    tas = osa(TASANNE)
    tv = mk.hexa("#d2c4a3") * (0.86 + 0.24 * vaihtelu[..., None]) * (0.95 + 0.1 * hieno[..., None])
    laikku = mk.fbm(P, 0.1, 12.0, 3) > 0.62
    tv = np.where(laikku[..., None], mk.hexa("#bba986"), tv)
    polku = np.abs(y - (-2 + (x + 128) * (-18 / 150))) < 5.0
    tv = np.where((polku & (x > -125) & (x < 5))[..., None], mk.hexa("#e0d6bd"), tv)
    vari = np.where(tas[..., None], tv, vari)
    # ---- Marmori: lämmin valkoinen, hunajainen patina alaosissa ----
    marmori = mk.hexa("#f0e7d2")
    patina = mk.hexa("#d9c19a")
    p = np.clip(0.25 + 0.5 * (mk.fbm(P, 0.15, 14.0, 3) - 0.5) + np.clip((YLA_Z + 8 - z) / 20, 0, 0.35), 0, 1)
    mv = marmori * (1 - p[..., None]) + patina * p[..., None]
    mv = mv * (0.95 + 0.08 * hieno[..., None])
    m = osa(MARMORI, PYLVAS, PAATY, RAUNIO)
    vari = np.where(m[..., None], mv, vari)
    # pylväiden uurteet (20 uurretta)
    a = PAR[..., 0]
    uurre = 0.5 + 0.5 * np.cos(a * 20 * 2 * math.pi)
    vari = np.where(osa(PYLVAS)[..., None], vari * (0.9 + 0.1 * uurre)[..., None], vari)
    # friisin triglyfit Parthenonin palkistossa
    zs = YLA_Z + 2.24
    zk = zs + 10.43 * S - 1.0 + 0.95 * S * 0.75
    friisi = (z > zk + 1.4 * S) & (z < zk + 3.0 * S) & (np.abs(N[..., 2]) < 0.5) & osa(MARMORI) & \
             (np.abs(x - PARTHENON[0]) < 50) & (np.abs(y - PARTHENON[1]) < 23)
    uf = mk.pinta_u(P, N, PARTHENON)
    trig = np.abs(mk.jakso(uf, 2.1 * S / 2, 0.0)) < 0.35 * S
    vari = np.where((friisi & trig)[..., None], vari * 0.78, vari)
    vari = np.where(((z > zk + 3.0 * S) & (z < zk + 3.3 * S) & osa(MARMORI) & (np.abs(N[..., 2]) < 0.5))[..., None], vari * 1.04, vari)
    # päätykolmion syvennys (tympanon) varjoisampi
    paaty = osa(PAATY) & (np.abs(N[..., 0]) > 0.7)
    vari = np.where(paaty[..., None], vari * 0.86, vari)
    vari = np.where((osa(PAATY) & (N[..., 2] > 0.3))[..., None], mk.hexa("#c9bfae") * (0.9 + 0.2 * hieno[..., None]), vari)
    # lattiat: laattajako
    lat = osa(LATTIA)
    lv = mk.hexa("#dccfb2") * (0.9 + 0.15 * vaihtelu[..., None])
    sauma = np.maximum(mk.viiva(mk.jakso(x, 1.6 * S), 0.12), mk.viiva(mk.jakso(y, 1.6 * S), 0.12))
    lv = lv * (1 - 0.2 * sauma)[..., None]
    vari = np.where(lat[..., None], lv, vari)
    # oliivipuut
    puu = osa(KASVI)
    pv = mk.hexa("#58673a") * (0.75 + 0.45 * mk.fbm(P, 0.5, 21.0, 2)[..., None])
    vari = np.where(puu[..., None], pv, vari)
    return vari
