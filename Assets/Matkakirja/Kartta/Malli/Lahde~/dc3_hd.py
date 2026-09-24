# Matkakirja: yksityiskohtainen DC-3-tyyppinen hopeinen potkurimatkustajakone (oma työ, CC0).
# ELOKUVALLINEN ALOITUSLENTO, erä 1 (Natiiviseppä 24.9.2026): kestää kameran 3–5 m päässä.
#
#   Blender 5.x: blender -b -P dc3_hd.py -- <ulos.fbx> <tekstuurikansio> [esikatselukansio] [--koko 4096]
#
# Vaiheet: 1) geometria (mitat metreinä, DC-3:n mittasuhteet: pituus 19,7 m, kärkiväli 28,96 m),
# 2) UV-atlas (pakataan Blenderin pack_islandsilla; siivet, vakaajat, moottorit, pyörät ja potkurit
# jakavat UV:n peilikuvansa kanssa), 3) leivonta Cyclesillä: pintakoordinaatit, sijainti, normaali ja
# peittävyys (AO) tekstuuriavaruuteen, 4) maalaus numpylla (dc3_maalaus.py): niittirivit, paneelisaumat,
# kulumat, raita ja tunnus → albedo (sRGB), normaali (tangenttiavaruus, OpenGL), maski (R metalli,
# G peittävyys, A sileys), 5) esikatselukuvat EEVEEllä, 6) FBX-vienti ilman tekstuuriviitteitä.
#
# Suunta: nokka Blenderin -Y, ylös +Z, koneen VASEN siipi on +X (FBX-vienti Forward -Z, Up Y,
# Apply Transform → Unityssä nokka +Z, ylös +Y, vasen -X). Potkurit ovat oliot "Potkuri_V"/"Potkuri_O",
# origo navassa, pyörimisakseli Blenderin Y = Unityn paikallinen Z; lavat ovat niiden lapsia "Lapa_*".
# Kaikki paitsi lasi käyttää yhtä atlasmateriaalia (Nappula.cs: "Ikkun*" → ikkunaMateriaali).
# Kehitysapu: DC3_VAIN_GEOMETRIA=1 (vain geometria + harmaat esikatselut), DC3_VALIMUISTI=kansio
# (leivonnan välimuisti, kun vain maalausta muutetaan), DC3_TARKISTUS=1 (lisäkuvakulmat).
# Vanha matalapolyinen malli (1 340 kolmiota) on dc3.py.
import bpy, bmesh, math, sys, os, time
import numpy as np
from mathutils import Vector, Matrix

TAMA = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, TAMA)

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
KOKO = 4096
if "--koko" in argv:
    i = argv.index("--koko"); KOKO = int(argv[i + 1]); del argv[i:i + 2]
ULOS = argv[0] if argv else "/tmp/DC3.fbx"
TEKSTUURIT = argv[1] if len(argv) > 1 else "/tmp/dc3-tekstuurit"
ESIKATSELU = argv[2] if len(argv) > 2 else None
os.makedirs(TEKSTUURIT, exist_ok=True)
T0 = time.time()
def loki(*a): print("[dc3_hd %5.1f s]" % (time.time() - T0), *a, flush=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ---------------------------------------------------------------------------------------------
# Osien tunnukset (leivotaan tekstuuriin; dc3_maalaus.py käyttää samoja numeroita).
RUNKO, SIIPI, VAKAAJA, SIVUVAKAAJA, MOOTTORI, MOOTTORIETU, PAKOPUTKI, NAPA, LAPA, RENGAS, VANNE, \
    SISUS, ANTENNI, VALO_PUN, VALO_VIH, VALO_VAL, SYLINTERI, IMUAUKKO, TUKI = range(1, 20)

def pchip(xs, ys):
    """Monotoninen kuutiollinen interpolointi (Fritsch–Carlson)."""
    xs = np.asarray(xs, float); ys = np.asarray(ys, float)
    h = np.diff(xs); dl = np.diff(ys) / h
    n = len(xs); m = np.zeros(n)
    for i in range(1, n - 1):
        if dl[i - 1] * dl[i] > 0:
            w1 = 2 * h[i] + h[i - 1]; w2 = h[i] + 2 * h[i - 1]
            m[i] = (w1 + w2) / (w1 / dl[i - 1] + w2 / dl[i])
    m[0] = dl[0]; m[-1] = dl[-1]
    def f(x):
        x = np.asarray(x, float)
        i = np.clip(np.searchsorted(xs, x) - 1, 0, n - 2)
        t = np.clip((x - xs[i]) / h[i], 0.0, 1.0)
        t2, t3 = t * t, t * t * t
        return ((2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h[i] * m[i]
                + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h[i] * m[i + 1])
    return f

# ---------------------------------------------------------------------------------------------
# Verkonrakentaja: kärjet, tahot ja kulmakohtaiset UV:t (pinta = pintakoordinaatit metreinä,
# param = osakohtaiset parametrit maalaukselle, tunnus = osan numero, UVMap = atlas ennen pakkausta).
class Verkko:
    def __init__(self, nimi):
        self.nimi = nimi
        self.v = []; self.f = []; self.smooth = []; self.sharp = []
        self.fuv = []   # per taho: (pinta-lista, param-lista, tunnus, tiheys, siirto)

    def piste(self, p):
        self.v.append((float(p[0]), float(p[1]), float(p[2]))); return len(self.v) - 1

    def taho(self, idx, pinta, param, tunnus, tiheys=1.0, smooth=True, siirto=(0.0, 0.0)):
        self.f.append(list(idx)); self.smooth.append(smooth)
        self.fuv.append((list(pinta), list(param), tunnus, tiheys, siirto))

    def kaanna(self, alku, loppu):
        """Kääntää tahojen alku..loppu kiertosuunnan (normaalit toiseen suuntaan)."""
        for k in range(alku, loppu):
            self.f[k] = self.f[k][::-1]
            pin, par, tun, tih, sii = self.fuv[k]
            self.fuv[k] = (pin[::-1], par[::-1], tun, tih, sii)

    def olio(self, mat, vanhempi=None, sijainti=(0, 0, 0)):
        me = bpy.data.meshes.new(self.nimi)
        me.from_pydata(self.v, [], [tuple(f) for f in self.f])
        kerrokset = {"UVMap": [], "pinta": [], "param": [], "tunnus": []}
        for pin, par, tun, tih, sii in self.fuv:
            for (s, t), (a, b) in zip(pin, par):
                kerrokset["pinta"].append((s, t)); kerrokset["param"].append((a, b))
                kerrokset["tunnus"].append((tun, 0.0)); kerrokset["UVMap"].append((s * tih + sii[0], t * tih + sii[1]))
        for nimi in ("UVMap", "pinta", "param", "tunnus"):
            uv = me.uv_layers.new(name=nimi)
            uv.data.foreach_set("uv", np.asarray(kerrokset[nimi], np.float32).ravel())
        me.uv_layers["UVMap"].active = True
        me.uv_layers["UVMap"].active_render = True
        me.polygons.foreach_set("use_smooth", np.asarray(self.smooth, bool))
        if self.sharp:
            avaimet = {tuple(sorted(e.vertices)): e.index for e in me.edges}
            for a, b in self.sharp:
                i = avaimet.get(tuple(sorted((int(a), int(b)))))
                if i is not None: me.edges[i].use_edge_sharp = True
        # Kolmiointi, jotta kolmiomäärä on sama Blenderissä ja Unityssä.
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.triangulate(bm, faces=bm.faces[:], quad_method='BEAUTY', ngon_method='BEAUTY')
        bm.to_mesh(me); bm.free()
        o = bpy.data.objects.new(self.nimi, me)
        scene.collection.objects.link(o)
        me.materials.append(mat)
        o.location = Vector(sijainti)
        if vanhempi is not None: o.parent = vanhempi
        return o

def ruudukko(m, P, S, T, A, B, tunnus, tiheys=1.0, suljettu=True, smooth=True, kaanna=None,
             terava_sarake=None):
    """P: (ni, nj, 3) pisteet; S,T,A,B: (ni, nj+1) jos suljettu rengas (viimeinen sarake = saumasarake), muuten (ni, nj).
    Palauttaa kärki-indeksit (ni, nj). kaanna=None: suunta päätellään niin, että normaali osoittaa renkaan keskeltä ulos."""
    P = np.asarray(P, float); ni, nj = P.shape[:2]
    idx = np.array([[m.piste(P[i, j]) for j in range(nj)] for i in range(ni)])
    if kaanna is None:
        aanet = 0
        for i in range(0, ni - 1, max(1, (ni - 1) // 6)):
            c = P[i].mean(axis=0)
            for j in range(0, nj - (0 if suljettu else 1), max(1, nj // 8)):
                j1 = (j + 1) % nj
                n = np.cross(P[i + 1, j] - P[i, j], P[i, j1] - P[i, j])
                aanet += 1 if np.dot(n, P[i, j] - c) > 0 else -1
        kaanna = aanet < 0
    jmax = nj if suljettu else nj - 1
    for i in range(ni - 1):
        for j in range(jmax):
            j1 = (j + 1) % nj
            vs = [idx[i, j], idx[i + 1, j], idx[i + 1, j1], idx[i, j1]]
            cs = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            if kaanna: vs = vs[::-1]; cs = cs[::-1]
            if len({vs[0], vs[1], vs[2], vs[3]}) < 3: continue
            m.taho(vs, [(S[a, b], T[a, b]) for a, b in cs], [(A[a, b], B[a, b]) for a, b in cs], tunnus, tiheys, smooth)
    if terava_sarake is not None:
        for i in range(ni - 1):
            m.sharp.append((idx[i, terava_sarake], idx[i + 1, terava_sarake]))
    return idx

def viuhka(m, reuna, keski, tunnus, tiheys=1.0, ulos=None, param=(0.0, 0.0), smooth=True):
    """Sulkee renkaan (kärki-indeksit) keskipisteeseen. ulos = suunta, johon kannen normaalin pitää osoittaa.
    Kansi saa tasoprojektion UV:n (oma saari)."""
    c = m.piste(keski)
    n = len(reuna)
    pts = np.array([m.v[v] for v in reuna] + [m.v[c]])
    nn = np.zeros(3)
    for j in range(n):
        nn += np.cross(pts[j] - pts[-1], pts[(j + 1) % n] - pts[-1])
    if np.linalg.norm(nn) < 1e-12: nn = np.array(ulos if ulos is not None else (0, 0, 1), float)
    nn /= np.linalg.norm(nn)
    apu = np.array([0, 0, 1.0]) if abs(nn[2]) < 0.9 else np.array([1.0, 0, 0])
    e1 = np.cross(nn, apu); e1 /= np.linalg.norm(e1); e2 = np.cross(nn, e1)
    uv = [(float(np.dot(p, e1)), float(np.dot(p, e2))) for p in pts]
    for j in range(n):
        j1 = (j + 1) % n
        vs = [reuna[j], reuna[j1], c]; pin = [uv[j], uv[j1], uv[-1]]
        if ulos is not None:
            a, b, cc = (np.array(m.v[v]) for v in vs)
            if np.dot(np.cross(b - a, cc - a), ulos) < 0:
                vs = vs[::-1]; pin = pin[::-1]
        m.taho(vs, pin, [param] * 3, tunnus, tiheys, smooth)

def kaaripituus(P):
    """Renkaan (nj,3) kumulatiivinen kaaripituus suljettuna: palauttaa nj+1 arvoa."""
    Q = np.vstack([P, P[:1]])
    return np.concatenate([[0.0], np.cumsum(np.linalg.norm(np.diff(Q, axis=0), axis=1))])

def pyorahdyspinta(m, profiili, akseli_o, akseli, kulma0, n, tunnus, tiheys=1.0, smooth=True,
                   param_a=None):
    """Pyörähdyspinta: profiili = [(etäisyys akselilla, säde)], akseli yksikkövektori. Palauttaa renkaat."""
    akseli = Vector(akseli).normalized()
    apu = Vector((0, 0, 1)) if abs(akseli.z) < 0.9 else Vector((1, 0, 0))
    e1 = akseli.cross(apu).normalized(); e2 = akseli.cross(e1).normalized()
    P = np.zeros((len(profiili), n, 3))
    for i, (d, r) in enumerate(profiili):
        for j in range(n):
            a = kulma0 + 2 * math.pi * j / n
            p = Vector(akseli_o) + akseli * d + (e1 * math.cos(a) + e2 * math.sin(a)) * max(r, 1e-4)
            P[i, j] = p
    mer = np.concatenate([[0.0], np.cumsum([math.hypot(profiili[i + 1][0] - profiili[i][0], profiili[i + 1][1] - profiili[i][1])
                                            for i in range(len(profiili) - 1)])])
    rmax = max(r for _, r in profiili)
    S = np.repeat(mer[:, None], n + 1, axis=1)
    T = np.repeat((np.arange(n + 1) / n * 2 * math.pi * rmax)[None, :], len(profiili), axis=0)
    A = S.copy() if param_a is None else np.repeat(np.asarray(param_a, float)[:, None], n + 1, axis=1)
    B = np.repeat((np.arange(n + 1) / n)[None, :], len(profiili), axis=0)
    idx = ruudukko(m, P, S, T, A, B, tunnus, tiheys, True, smooth, kaanna=None)
    return idx, P

# ---------------------------------------------------------------------------------------------
# Materiaalit (Blenderissä vain esikatselua varten; Unityssä Nappula.cs vaihtaa URP-materiaalit).
def materiaali(nimi, vari, metalli, karheus):
    m = bpy.data.materials.new(nimi)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*vari, 1)
    b.inputs["Metallic"].default_value = metalli
    b.inputs["Roughness"].default_value = karheus
    m.diffuse_color = (*vari, 1)
    return m

KONE = materiaali("Kone", (0.80, 0.81, 0.83), 0.9, 0.2)
LASI = materiaali("Lasi", (0.02, 0.025, 0.03), 0.25, 0.05)

# =============================================================================================
# 1. RUNKO
Y_NOKKA = -9.80
def _nokka(d, L, a, b):
    d = np.minimum(d, L)
    return a + b * np.sqrt(np.maximum(0.0, 1 - (1 - d / L) ** 2))

def _taulukko(nokka_fn, L, pisteet):
    ds = list(np.linspace(0, L, 14)); vs = list(nokka_fn(np.array(ds)))
    for d, v in pisteet:
        ds.append(d); vs.append(v)
    return pchip(ds, vs)

LEVEYS = _taulukko(lambda d: _nokka(d, 3.6, 0.0, 1.28), 3.6,
                   [(4.5, 1.28), (8.5, 1.28), (10.5, 1.26), (12, 1.20), (13.5, 1.08), (15, 0.90), (16.5, 0.68),
                    (17.6, 0.50), (18.5, 0.33), (19.1, 0.19), (19.35, 0.07)])
POHJA = _taulukko(lambda d: _nokka(d, 3.2, -0.12, -1.23), 3.2,
                  [(4.5, -1.35), (9.0, -1.35), (10.5, -1.30), (12, -1.15), (13.5, -0.90), (15, -0.58), (16.5, -0.22),
                   (17.6, 0.08), (18.5, 0.38), (19.1, 0.60), (19.35, 0.78)])
KATTO = _taulukko(lambda d: _nokka(d, 2.1, -0.12, 0.95), 1.2,
                  [(1.6, 0.80), (2.0, 0.88), (2.3, 1.02), (2.6, 1.17), (2.85, 1.26), (3.2, 1.31), (3.7, 1.33), (4.5, 1.335),
                   (10, 1.335), (12, 1.31), (14, 1.27), (16, 1.21), (18, 1.14), (19.1, 1.09), (19.35, 1.05)])
EKSP = 2.15
RUNKO_L = 19.35

def runko_piste(d, fi):
    """d = etäisyys nokasta, fi = kulma pohjasta (0) kattoon (pi) vasemmalla (+X); negatiivinen fi = oikea puoli."""
    w, zt, zb = float(LEVEYS(d)), float(KATTO(d)), float(POHJA(d))
    zc, h = (zt + zb) / 2, (zt - zb) / 2
    s, c = math.sin(fi), math.cos(fi)
    x = w * math.copysign(abs(s) ** (2 / EKSP), s)
    z = zc - h * math.copysign(abs(c) ** (2 / EKSP), c)
    return Vector((x, Y_NOKKA + d, z))

def runko_normaali(d, fi):
    e = 1e-3
    a = runko_piste(d + e, fi) - runko_piste(d - e, fi)
    b = runko_piste(d, fi + e) - runko_piste(d, fi - e)
    n = b.cross(a) if fi >= 0 else a.cross(b)
    n.normalize()
    # Varmistus: osoittaa ulos keskiviivasta.
    zc = (float(KATTO(d)) + float(POHJA(d))) / 2
    p = runko_piste(d, fi)
    if n.dot(Vector((p.x, 0, p.z - zc))) < 0: n = -n
    return n

def runko_fi_korkeudella(d, z, puoli=1):
    """Kulma fi (0..pi), jolla rungon pinta on korkeudella z asemalla d."""
    lo, hi = 0.0, math.pi
    for _ in range(40):
        mid = (lo + hi) / 2
        if runko_piste(d, mid).z < z: lo = mid
        else: hi = mid
    return puoli * (lo + hi) / 2

def rakenna_runko():
    m = Verkko("Runko")
    asemat = [0.02, 0.06, 0.12, 0.2, 0.3, 0.42, 0.56, 0.72, 0.9, 1.1]
    asemat += list(np.arange(1.3, 4.01, 0.2)) + list(np.arange(4.35, 15.0, 0.35)) + list(np.arange(15.3, RUNKO_L - 0.05, 0.3)) + [RUNKO_L]
    asemat = np.array(sorted(set(round(float(a), 4) for a in asemat)))
    NP = 32  # segmenttiä per puoli
    fis = np.linspace(0, math.pi, NP + 1)
    # Rengas: pohja → vasen kylki (+X) → katto → oikea kylki → pohja.
    rengas_fi = list(fis) + list(-fis[::-1][1:-1])
    nj = len(rengas_fi)
    P = np.array([[tuple(runko_piste(d, fi)) for fi in rengas_fi] for d in asemat])
    ni = len(asemat)
    idx = np.array([[m.piste(P[i, j]) for j in range(nj)] for i in range(ni)])
    KP = [kaaripituus(P[i]) for i in range(ni)]
    OIKEA_SIIRTO = (0.0, 40.0)  # oikean kyljen saari erilleen vasemmasta ennen pakkausta

    def uv(i, j, oikea):
        """Kulman (asema i, rengassarake j = 0..nj) pinta- ja param-arvot. Kummankin kyljen t kasvaa pohjasta ylös."""
        s = float(P[i, j % nj, 1])
        if not oikea:
            return (s, KP[i][j]), (asemat[i], j / NP)
        return (s, KP[i][-1] - KP[i][j]), (asemat[i], (nj - j) / NP)

    for i in range(ni - 1):
        for j in range(nj):
            oikea = j >= NP
            jj = (j + 1) % nj
            vs = [idx[i, j], idx[i + 1, j], idx[i + 1, jj], idx[i, jj]]
            cs = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            pin, par = zip(*[uv(a, b, oikea) for a, b in cs])
            m.taho(vs, pin, par, RUNKO, 1.0, True, OIKEA_SIIRTO if oikea else (0.0, 0.0))
    # Nokan kärki ja pyrstön pää viuhkoina (keskipisteen UV kolmioittain, jotta saaret eivät liity).
    for i, dk, ulos in ((0, -0.005, (0, -1, 0)), (ni - 1, 0.03, (0, 1, 0))):
        d = asemat[i]
        keski = (0.0, Y_NOKKA + d + dk, float(KATTO(d) + POHJA(d)) / 2)
        c = m.piste(keski)
        for j in range(nj):
            oikea = j >= NP
            jj = (j + 1) % nj
            (p0, q0), (p1, q1) = uv(i, j, oikea), uv(i, j + 1, oikea)
            pk = (keski[1], (p0[1] + p1[1]) / 2)
            vs = [idx[i, j], idx[i, jj], c]; pin = [p0, p1, pk]; par = [q0, q1, (d, (q0[1] + q1[1]) / 2)]
            a_, b_, c_ = (np.array(m.v[v]) for v in vs)
            if np.dot(np.cross(b_ - a_, c_ - a_), ulos) < 0: vs = vs[::-1]; pin = pin[::-1]; par = par[::-1]
            m.taho(vs, pin, par, RUNKO, 1.0, True, OIKEA_SIIRTO if oikea else (0.0, 0.0))
    o = m.olio(KONE)
    korjaa_normaalit_ulos(o, runko=True)
    return o

# ---------------------------------------------------------------------------------------------
# Ikkunat: ohjaamon ruudut (d, fi-kulma katosta) ja matkustamon ikkunarivi (d, z).
OHJAAMO_RUUDUT = [  # nelikulmio (d, a) -pisteinä: a = kulma katosta (rad), 0 = katon keskiviiva
    [(2.00, 0.06), (2.10, 0.60), (2.72, 0.60), (2.66, 0.06)],   # tuulilasi (V-tuulilasin puolikas)
    [(2.14, 0.66), (2.36, 1.10), (2.90, 1.08), (2.76, 0.66)],   # kulmaruutu
    [(3.00, 1.28), (3.55, 1.30), (3.55, 0.64), (3.00, 0.64)],   # sivuikkuna
    [(3.63, 1.30), (4.12, 1.30), (4.12, 0.66), (3.63, 0.66)],   # liukuikkuna
]
MATKUSTAMO_IKKUNAT = [(5.55 + i * 1.02, 0.30) for i in range(7)]  # (d-keskipiste, z-keskipiste)
IKKUNA_L, IKKUNA_K, IKKUNA_R = 0.46, 0.40, 0.08
LASI_NOSTO = 0.012

def pyoristetty_suorakaide(l, k, r, n_kulma=4):
    pts = []
    for cx, cy, a0 in ((l / 2 - r, k / 2 - r, 0), (-l / 2 + r, k / 2 - r, 90), (-l / 2 + r, -k / 2 + r, 180), (l / 2 - r, -k / 2 + r, 270)):
        for q in range(n_kulma + 1):
            a = math.radians(a0 + 90 * q / n_kulma)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def rakenna_ikkunat():
    m = Verkko("Ikkunat")
    for puoli in (1, -1):
        for kulmat in OHJAAMO_RUUDUT:
            nu, nv = 6, 6
            P = np.zeros((nu + 1, nv + 1, 3))
            (d00, a00), (d10, a10), (d11, a11), (d01, a01) = kulmat
            for i in range(nu + 1):
                u = i / nu
                for j in range(nv + 1):
                    v = j / nv
                    d = (1 - u) * (1 - v) * d00 + u * (1 - v) * d10 + u * v * d11 + (1 - u) * v * d01
                    a = (1 - u) * (1 - v) * a00 + u * (1 - v) * a10 + u * v * a11 + (1 - u) * v * a01
                    fi = puoli * (math.pi - a)
                    P[i, j] = runko_piste(d, fi) + runko_normaali(d, fi) * LASI_NOSTO
            U = np.repeat((np.arange(nu + 1) / nu)[:, None], nv + 1, axis=1)
            V = np.repeat((np.arange(nv + 1) / nv)[None, :], nu + 1, axis=0)
            ruudukko(m, P, U, V, U, V, 0, 1.0, suljettu=False, smooth=True, kaanna=(puoli > 0))
    o = m.olio(LASI)
    # Suunta tarkistetaan: normaalit ulos.
    korjaa_normaalit_ulos(o, keskiviiva=True)
    m2 = Verkko("Ikkunat_Matkustamo")
    for puoli in (1, -1):
        for dc, zc in MATKUSTAMO_IKKUNAT:
            reuna = []
            for u, v in pyoristetty_suorakaide(IKKUNA_L, IKKUNA_K, IKKUNA_R):
                d, z = dc + u * puoli, zc + v
                fi = runko_fi_korkeudella(d, z, puoli)
                reuna.append(m2.piste(runko_piste(d, fi) + runko_normaali(d, fi) * LASI_NOSTO))
            fi = runko_fi_korkeudella(dc, zc, puoli)
            keski = runko_piste(dc, fi) + runko_normaali(dc, fi) * LASI_NOSTO
            viuhka(m2, reuna, keski, 0, ulos=Vector((puoli, 0, 0)))
    m2.olio(LASI)

def korjaa_normaalit_ulos(o, keskiviiva=False, runko=False):
    me = o.data
    bm = bmesh.new(); bm.from_mesh(me)
    kaannetty = 0
    for f in bm.faces:
        c = f.calc_center_median()
        if runko or keskiviiva:
            d = min(max(c.y - Y_NOKKA, 0.0), RUNKO_L)
            zc = (float(KATTO(d)) + float(POHJA(d))) / 2
            ulos = Vector((c.x, 0, c.z - zc))
            if d <= 0.03: ulos = Vector((0, -1, 0))
            if d >= RUNKO_L - 0.001: ulos = Vector((0, 1, 0))
        else:
            ulos = c
        if f.normal.dot(ulos) < 0:
            f.normal_flip(); kaannetty += 1
    bm.to_mesh(me); bm.free()
    if kaannetty: loki("  %s: käännettiin %d tahoa" % (o.name, kaannetty))

# =============================================================================================
# 2. SIIVET JA VAKAAJAT (NACA 4-numeroinen profiili)
def naca(n, t, m_=0.02, p_=0.4):
    """Suljettu profiili: palauttaa (x, y, ylapuoli) jättöreunasta alapintaa pitkin johtoreunaan ja yläpintaa takaisin."""
    beta = np.linspace(0, math.pi, n + 1)
    xs = (1 - np.cos(beta)) / 2  # 0..1
    yt = 5 * t * (0.2969 * np.sqrt(xs) - 0.1260 * xs - 0.3516 * xs ** 2 + 0.2843 * xs ** 3 - 0.1036 * xs ** 4)
    if m_ > 0:
        yc = np.where(xs < p_, m_ / p_ ** 2 * (2 * p_ * xs - xs ** 2), m_ / (1 - p_) ** 2 * ((1 - 2 * p_) + 2 * p_ * xs - xs ** 2))
    else:
        yc = np.zeros_like(xs)
    ala = [(xs[i], yc[i] - yt[i], 0) for i in range(n, -1, -1)]      # TE → LE
    yla = [(xs[i], yc[i] + yt[i], 1) for i in range(1, n)]           # LE → TE (ilman päätepisteitä)
    return ala + yla

def profiiliverkko(m, P, S, T, A, n_prof, tunnus, tiheys):
    """Profiilirenkaista (NACA-järjestys: alapinta TE→LE, yläpinta LE→TE) tahot; param B = yläpinnan lippu
    tahoittain (ei kulmittain), jotta maalirajat osuvat johto- ja jättöreunaan eivätkä sahaa kolmioissa."""
    ni, nj = P.shape[:2]
    idx = np.array([[m.piste(P[i, j]) for j in range(nj)] for i in range(ni)])
    c = P[0].mean(axis=0)
    n0 = np.cross(P[1, 5] - P[0, 5], P[0, 6] - P[0, 5])
    kaanna = np.dot(n0, P[0, 5] - c) < 0
    for i in range(ni - 1):
        for j in range(nj):
            j1 = (j + 1) % nj
            lippu = 1.0 if j >= n_prof else 0.0
            vs = [idx[i, j], idx[i + 1, j], idx[i + 1, j1], idx[i, j1]]
            cs = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            if kaanna: vs = vs[::-1]; cs = cs[::-1]
            m.taho(vs, [(S[a, b], T[a, b]) for a, b in cs], [(A[a, b], lippu) for a, b in cs], tunnus, tiheys, True)
        m.sharp.append((idx[i, 0], idx[i + 1, 0]))  # jättöreuna terävä
    return idx

def rakenna_pinta(nimi_tai_m, tunnus, asemat, profiili_fn, tiheys=1.0, sulje_karki=None, n_prof=28):
    """Yleinen siipipinta. asemat: lista s-arvoja. profiili_fn(s) → (LE-piste Vector, jänne-suunta Vector,
    paksuussuunta Vector, jänne, t/c, kaarevuus). Palauttaa Verkko-olion ja viimeisen renkaan indeksit."""
    m = nimi_tai_m
    P = []; C = []; U = []
    prof_cache = {}
    for s in asemat:
        le, dvec, nvec, jan, tc, kaari = profiili_fn(s)
        key = (round(tc, 4), round(kaari, 4))
        if key not in prof_cache: prof_cache[key] = naca(n_prof, tc, kaari)
        rengas = []; cf = []; up = []
        for x, y, yl in prof_cache[key]:
            rengas.append(le + dvec * (x * jan) + nvec * (y * jan))
            cf.append(x); up.append(yl)
        P.append([tuple(p) for p in rengas]); C.append(cf); U.append(up)
    P = np.array(P); ni, nj = P.shape[:2]
    S = np.zeros((ni, nj + 1)); T = np.zeros((ni, nj + 1)); A = np.zeros((ni, nj + 1)); B = np.zeros((ni, nj + 1))
    for i in range(ni):
        kp = kaaripituus(P[i])
        for j in range(nj + 1):
            S[i, j] = asemat[i]; T[i, j] = kp[j]
            A[i, j] = C[i][j % nj] if j < nj else 1.0
            # yläpuoli-lippu: taho kuuluu yläpintaan, jos sen alkukärki on LE:n jälkeen
            B[i, j] = 1.0 if (j > n_prof) else 0.0
    # Lippu kulmittain: tahon (j..j+1) lippu = 1, jos j >= n_prof. Kirjoitetaan B niin, että sarakkeen j arvo
    # kuvaa tahoa j; kulmat j+1 saavat saman arvon ruudukko-funktion sisällä → tehdään käsin.
    idx = profiiliverkko(m, P, S, T, A, n_prof, tunnus, tiheys)
    return idx, P, S, T, A

def sulje_karki(m, idx, P, S, T, A, tunnus, tiheys, ulos, i=-1):
    i = len(idx) - 1 if i < 0 else i
    viuhka(m, list(idx[i]), P[i].mean(axis=0), tunnus, tiheys, ulos=Vector(ulos), param=(0.4, 1.0))

# Siiven pohjapiirros: sx = |x|.
SIIPI_TAITE = 4.9
SIIPI_KARKI = 14.48
def siipi_le(sx): return -3.55 + max(0.0, sx - SIIPI_TAITE) * math.tan(math.radians(15.5))
def siipi_te(sx): return 0.75 - max(0.0, sx - SIIPI_TAITE) * 0.028
def siipi_z(sx): return -0.95 + max(0.0, sx - SIIPI_TAITE) * math.tan(math.radians(5.0))
SIIPI_PYOR = 13.9

def siipi_profiili(sx, puoli=1):
    sxx = min(sx, SIIPI_PYOR)
    le, te = siipi_le(sxx), siipi_te(sxx)
    jan = te - le
    e = 1.0
    if sx > SIIPI_PYOR:
        q = min(1.0, (sx - SIIPI_PYOR) / (SIIPI_KARKI - SIIPI_PYOR))
        e = math.sqrt(max(0.0, 1 - q * q))
        mid = le + 0.42 * jan
        le = mid - 0.42 * jan * e; jan = jan * e
    tc = 0.15 - 0.075 * min(1.0, max(0.0, (sx - 1.0) / (SIIPI_KARKI - 1.0)))
    if sx > SIIPI_PYOR: tc = tc * (0.35 + 0.65 * e) / max(e, 0.05)  # paksuus ohenee hitaammin kuin jänne
    tc = min(tc, 0.5)
    kierto = math.radians(2.0 - 3.0 * min(1.0, sx / SIIPI_KARKI))  # kohtauskulma (nokka ylös +)
    z = siipi_z(sx)
    dvec = Vector((0, math.cos(kierto), -math.sin(kierto)))   # jänne: johtoreunasta taakse (+Y), kierto nostaa nokkaa
    nvec = Vector((0, math.sin(kierto), math.cos(kierto)))
    # V-kulma kallistaa paksuussuuntaa hieman (ulkosiivessä)
    if sx > SIIPI_TAITE:
        a = math.radians(5.0)
        nvec = Vector((-puoli * math.sin(a) * nvec.z, nvec.y, math.cos(a) * nvec.z))
    # kierto 30 %:n jänteen ympäri: johtoreuna = kiertopiste - jänne · 0,3
    le_p = Vector((puoli * sx, le + 0.3 * jan, z)) - dvec * (0.3 * jan)
    return le_p, dvec, nvec, jan, tc, 0.02

def rakenna_siipi():
    m = Verkko("Siipi_V")
    asemat = [0.3, 1.0, 1.7, 2.4, 3.0, 3.55, 4.1, 4.5, 4.9]
    asemat += list(np.arange(5.45, 13.9, 0.55)) + [13.9]
    asemat += [SIIPI_PYOR + (SIIPI_KARKI - SIIPI_PYOR) * q for q in (0.25, 0.5, 0.7, 0.85, 0.95)]
    idx, P, S, T, A = rakenna_pinta(m, SIIPI, asemat, lambda s: siipi_profiili(s, 1))
    sulje_karki(m, idx, P, S, T, A, SIIPI, 1.0, (1, 0, 0))
    return m.olio(KONE)

VAKAAJA_Z = 0.64
VAKAAJA_KARKI = 4.1
VAKAAJA_PYOR = 3.6
def vakaaja_profiili(sx, puoli=1):
    sxx = min(sx, VAKAAJA_PYOR)
    le = 7.25 + sxx * 0.30; te = 9.75 - sxx * 0.05
    jan = te - le
    e = 1.0
    if sx > VAKAAJA_PYOR:
        q = min(1.0, (sx - VAKAAJA_PYOR) / (VAKAAJA_KARKI - VAKAAJA_PYOR))
        e = math.sqrt(max(0.0, 1 - q * q))
        mid = le + 0.4 * jan
        le = mid - 0.4 * jan * e; jan *= e
    tc = 0.12 - 0.03 * min(1.0, sx / VAKAAJA_KARKI)
    if sx > VAKAAJA_PYOR: tc = min(0.5, tc * (0.35 + 0.65 * e) / max(e, 0.05))
    return Vector((puoli * sx, le, VAKAAJA_Z)), Vector((0, 1, 0)), Vector((0, 0, 1)), jan, tc, 0.0

def rakenna_vakaaja():
    m = Verkko("Vakaaja_V")
    asemat = [0.2, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.3, 3.6] + [VAKAAJA_PYOR + (VAKAAJA_KARKI - VAKAAJA_PYOR) * q for q in (0.3, 0.55, 0.75, 0.9, 0.97)]
    idx, P, S, T, A = rakenna_pinta(m, VAKAAJA, asemat, lambda s: vakaaja_profiili(s, 1), n_prof=22)
    sulje_karki(m, idx, P, S, T, A, VAKAAJA, 1.0, (1, 0, 0))
    return m.olio(KONE)

# Sivuvakaaja: asemat korkeuden z mukaan.
_EV_z = [0.55, 0.85, 1.10, 1.30, 1.50, 1.9, 2.6, 3.2, 3.55, 3.75, 3.86]
_EV_le = [8.95, 7.20, 5.40, 6.20, 6.95, 7.60, 8.15, 8.65, 9.00, 9.30, 9.55]
_EV_te = [9.92, 9.94, 9.95, 9.96, 9.97, 9.97, 9.96, 9.94, 9.90, 9.84, 9.76]
EV_LE = pchip(_EV_z, _EV_le); EV_TE = pchip(_EV_z, _EV_te)
def sivuvakaaja_profiili(z):
    le, te = float(EV_LE(z)), float(EV_TE(z))
    jan = te - le
    tc = min(0.11, 0.30 / jan)
    # dvec +Y, paksuussuunta +X; profiilin "yläpinta" = vasen kylki
    return Vector((0, le, z)), Vector((0, 1, 0)), Vector((1, 0, 0)), jan, tc, 0.0

def rakenna_sivuvakaaja():
    m = Verkko("Sivuvakaaja")
    asemat = [0.55, 0.85, 1.10, 1.30, 1.50] + list(np.linspace(1.75, 3.55, 9)) + [3.68, 3.78, 3.84]
    idx, P, S, T, A = rakenna_pinta(m, SIVUVAKAAJA, asemat, sivuvakaaja_profiili, n_prof=24)
    sulje_karki(m, idx, P, S, T, A, SIVUVAKAAJA, 1.0, (0, 0, 1))
    sulje_karki(m, idx, P, S, T, A, SIVUVAKAAJA, 1.0, (0, 0, -1), i=0)
    return m.olio(KONE)

# =============================================================================================
# 3. MOOTTORIGONDOLIT (Wright Cyclone -tyyppinen NACA-suojus), MOOTTORIN ETUPINTA, PAKOPUTKI, IMUAUKKO
MX, MZ, MY0 = 3.55, -0.60, -5.55   # moottorin akseli (|x|), korkeus ja suojuksen etureuna (Y)
NAPA_Y = MY0 - 0.45                # potkurin napa

GONDOLI = [  # (dn, puolileveys, yläraja, alaraja, eksponentti) — ympyrä suojuksessa
    (0.34, 0.46, None, None, 2.0), (0.12, 0.47, None, None, 2.0), (0.02, 0.50, None, None, 2.0),
    (-0.02, 0.56, None, None, 2.0), (0.01, 0.62, None, None, 2.0), (0.08, 0.665, None, None, 2.0),
    (0.22, 0.695, None, None, 2.0), (0.45, 0.71, None, None, 2.0), (0.9, 0.71, None, None, 2.0),
    (1.26, 0.70, None, None, 2.0), (1.29, 0.672, None, None, 2.0), (1.45, 0.66, None, None, 2.05),
    (1.9, 0.64, MZ + 0.60, MZ - 0.80, 2.2), (2.5, 0.63, MZ + 0.40, MZ - 0.95, 2.35),
    (3.2, 0.62, MZ + 0.16, MZ - 1.00, 2.45), (4.0, 0.58, MZ + 0.05, MZ - 0.97, 2.45),
    (4.8, 0.48, MZ + 0.01, MZ - 0.88, 2.4), (5.5, 0.34, MZ - 0.02, MZ - 0.74, 2.3),
    (6.0, 0.20, MZ - 0.06, MZ - 0.60, 2.2), (6.35, 0.07, MZ - 0.10, MZ - 0.47, 2.1)]

def gondoli_rengas(dn, w, zt, zb, e, n, puoli):
    if zt is None: zt, zb = MZ + w, MZ - w
    zc, h = (zt + zb) / 2, (zt - zb) / 2
    pts = []
    for j in range(n):
        a = 2 * math.pi * j / n  # 0 = katto, kasvaa ulkosivun kautta (puoli*+X) alas
        s, c = math.sin(a), math.cos(a)
        x = puoli * MX + puoli * w * math.copysign(abs(s) ** (2 / e), s)
        z = zc + h * math.copysign(abs(c) ** (2 / e), c)
        pts.append((x, MY0 + dn, z))
    return pts

def rakenna_moottori():
    m = Verkko("Moottori_V")
    n = 48
    P = np.array([gondoli_rengas(dn, w, zt, zb, e, n, 1) for dn, w, zt, zb, e in GONDOLI])
    ni = len(GONDOLI)
    mer = np.zeros(ni)
    for i in range(1, ni): mer[i] = mer[i - 1] + np.linalg.norm(P[i] - P[i - 1], axis=1).mean()
    S = np.repeat(mer[:, None], n + 1, axis=1); T = np.zeros((ni, n + 1))
    for i in range(ni): T[i] = kaaripituus(P[i])
    A = np.repeat(np.array([g[0] for g in GONDOLI])[:, None], n + 1, axis=1)
    B = np.repeat((np.arange(n + 1) / n)[None, :], ni, axis=1 - 1)
    idx = ruudukko(m, P, S, T, A, B, MOOTTORI, 1.0, True, True, kaanna=None)
    # Huom. etuosan sisäseinä (dn 0.34 → 0.02) osoittaa sisään akselia kohti: suunta tarkistetaan lopuksi
    # olion tasolla (sisäseinän tahot käännetään osoittamaan akselille).
    # Pyrstöpää
    i = ni - 1
    viuhka(m, list(idx[i]), P[i].mean(axis=0), MOOTTORI, 1.0, ulos=Vector((0, 1, 0)), param=(6.4, 0.5))
    # Moottorin etupinta (kampikammio) kiekkona dn=0.34 ja alennusvaihteiston kupu.
    i = 0
    kupu = [(0.34, 0.27), (0.24, 0.265), (0.12, 0.25), (0.0, 0.22), (-0.10, 0.18), (-0.18, 0.14), (-0.24, 0.11)]
    # rengas dn=0.34 säde 0.46 → kupu
    prof = [(0.34, 0.46), (0.345, 0.40), (0.345, 0.32)] + kupu
    ridx, RP = pyorahdyspinta(m, prof, (MX, MY0, MZ), (0, 1, 0), 0.0, 32, MOOTTORIETU, 0.6)
    # pyorahdyspinta käyttää akselin origona (MX, MY0, MZ) ja etäisyyttä d akselilla (+Y taakse)
    ii = len(prof) - 1
    viuhka(m, list(ridx[ii]), RP[ii].mean(axis=0), MOOTTORIETU, 0.6, ulos=Vector((0, -1, 0)))
    # Sylinterit: 9 kpl säteittäin (Cyclone), rivat maalataan tekstuuriin.
    for k in range(9):
        a = 2 * math.pi * k / 9 + math.pi / 9
        suunta = Vector((math.sin(a), 0, math.cos(a)))
        o = Vector((MX, MY0 + 0.22, MZ))
        prof = [(0.22, 0.0), (0.22, 0.075), (0.30, 0.082), (0.40, 0.082), (0.43, 0.07), (0.45, 0.04), (0.455, 0.0)]
        ridx, RP = pyorahdyspinta(m, prof, o, suunta, 0.0, 10, SYLINTERI, 0.6, param_a=[p[0] for p in prof])
    # Pakoputki ulkosivulla alhaalla, suojuksen takana: ontto putki taaksepäin.
    a = math.radians(122)
    pe = Vector((MX + 0.66 * math.sin(a) * 1.02, MY0 + 1.62, MZ + 0.66 * math.cos(a) * 1.05))
    suunta = Vector((0.12, 1.0, -0.10)).normalized()
    prof = [(-0.35, 0.068), (0.0, 0.068), (0.10, 0.07), (0.115, 0.062), (0.11, 0.05), (-0.05, 0.05)]
    ridx, RP = pyorahdyspinta(m, prof, pe, suunta, 0.0, 12, PAKOPUTKI, 1.0, param_a=[0, 0.5, 0.9, 1.0, 1.1, 1.5])
    # Kaasuttimen imuaukko suojuksen päällä (dn 1.30 → 2.0).
    ni2 = 7
    imu = np.zeros((ni2, 16, 3))
    for i2 in range(ni2):
        q = i2 / (ni2 - 1)
        dn = 1.22 + 0.85 * q
        korkeus = 0.15 * (1 - q ** 3)
        lev = 0.11 * (1 - 0.5 * q ** 2)
        pohja_z = MZ + 0.66 - 0.2 * q
        for j in range(16):
            aa = 2 * math.pi * j / 16
            imu[i2, j] = (MX + lev * math.sin(aa), MY0 + dn, pohja_z + korkeus * (0.5 + 0.5 * math.cos(aa)) + 0.02)
    Si = np.repeat(np.linspace(0, 0.85, ni2)[:, None], 17, axis=1)
    Ti = np.repeat((np.arange(17) / 16 * 0.6)[None, :], ni2, axis=0)
    ii = ruudukko(m, imu, Si, Ti, Si, Ti, IMUAUKKO, 1.0, True, True, kaanna=None)
    viuhka(m, list(ii[0]), imu[0].mean(axis=0), IMUAUKKO, 0.3, ulos=Vector((0, -1, 0)), param=(-1.0, 0.0))
    o = m.olio(KONE)
    return o

# =============================================================================================
# 4. POTKURI (Hamilton Standard -tyyppinen, 3 lapaa, halkaisija 3,5 m) — rakennetaan oikealle (O, -X),
# joka pyörii myötäpäivään takaa katsottuna; vasen on peilikuva.
LAPA_R = 1.75
def rakenna_napa():
    m = Verkko("Potkuri_O")
    prof = [(0.21, 0.0), (0.21, 0.09), (0.16, 0.12), (0.12, 0.17), (0.05, 0.19), (-0.05, 0.19), (-0.10, 0.17),
            (-0.14, 0.155), (-0.20, 0.13), (-0.26, 0.09), (-0.30, 0.045), (-0.315, 0.0)]
    pyorahdyspinta(m, prof, (0, 0, 0), (0, 1, 0), 0.0, 24, NAPA, 1.0)
    return m

def lapa_profiili(r):
    """Palauttaa (jänne, t/c, nousukulma rad) säteellä r."""
    jan = float(np.interp(r, [0.14, 0.30, 0.40, 0.55, 0.9, 1.3, 1.55, 1.66, 1.72, 1.75],
                             [0.12, 0.12, 0.20, 0.25, 0.27, 0.25, 0.21, 0.17, 0.11, 0.05]))
    tc = float(np.interp(r, [0.14, 0.30, 0.42, 0.6, 1.75], [0.95, 0.9, 0.22, 0.11, 0.06]))
    beta = math.radians(float(np.interp(r, [0.14, 0.35, 0.6, 1.1, 1.75], [62, 58, 44, 30, 21])))
    return jan, tc, beta

def rakenna_lapa():
    m = Verkko("Lapa_O1")
    rs = [0.14, 0.22, 0.30, 0.36, 0.42, 0.5, 0.62, 0.76, 0.92, 1.08, 1.24, 1.40, 1.52, 1.62, 1.69, 1.73]
    n = 8
    P = []; CF = []; UP = []
    for r in rs:
        jan, tc, beta = lapa_profiili(r)
        D = Vector((-math.cos(beta), -math.sin(beta), 0))      # johtoreunan suunta (pyörimissuunta + eteen)
        Tb = Vector((math.sin(beta), -math.cos(beta), 0))     # selkäpuoli (kaareva, eteenpäin)
        prof = naca(n, tc, 0.03 if r > 0.4 else 0.0, 0.4)
        rengas = []; cf = []; up = []
        for x, y, yl in prof:
            p = Vector((0, 0, r)) + D * ((0.35 - x) * jan) + Tb * (y * jan)
            rengas.append(tuple(p)); cf.append(x); up.append(yl)
        P.append(rengas); CF.append(cf); UP.append(up)
    P = np.array(P); ni, nj = P.shape[:2]
    S = np.zeros((ni, nj + 1)); T = np.zeros((ni, nj + 1)); A = np.zeros((ni, nj + 1)); B = np.zeros((ni, nj + 1))
    for i in range(ni):
        kp = kaaripituus(P[i])
        for j in range(nj + 1):
            S[i, j] = rs[i]; T[i, j] = kp[j]; A[i, j] = rs[i] / LAPA_R
            B[i, j] = 1.0 if (j > n and j < nj) else 0.0
    idx = profiiliverkko(m, P, S, T, A, n, LAPA, 1.0)
    i = ni - 1
    viuhka(m, list(idx[i]), P[i].mean(axis=0) + np.array([0, 0, 0.01]), LAPA, 1.0, ulos=Vector((0, 0, 1)), param=(1.0, 0.5))
    return m

# =============================================================================================
# 5. LASKUTELINEET (sisään vedettyinä pyörät näkyvät osin gondolin alta) JA KANNUSPYÖRÄ (kiinteä)
PYORA_Y, PYORA_Z, PYORA_R, RENGAS_R = MY0 + 2.75, -1.30, 0.57, 0.17
def rengas_verkko(m, keski, R, r, leveys_kerroin, n_iso, n_pieni, tunnus_rengas, tunnus_vanne, tiheys=1.0):
    """Rengas (torus, akseli X) ja vanteen kiekot."""
    P = np.zeros((n_iso, n_pieni, 3))
    for i in range(n_iso):
        a = 2 * math.pi * i / n_iso
        for j in range(n_pieni):
            b = 2 * math.pi * j / n_pieni
            rr = R + r * math.cos(b)
            P[i, j] = (keski[0] + r * math.sin(b) * leveys_kerroin, keski[1] + rr * math.cos(a), keski[2] + rr * math.sin(a))
    P2 = np.vstack([P, P[:1]])
    S = np.zeros((n_iso + 1, n_pieni + 1)); T = np.zeros((n_iso + 1, n_pieni + 1))
    for i in range(n_iso + 1):
        for j in range(n_pieni + 1):
            S[i, j] = i / n_iso * 2 * math.pi * (R + r * 0.7); T[i, j] = j / n_pieni * 2 * math.pi * r
    A = np.repeat((np.arange(n_iso + 1) / n_iso)[:, None], n_pieni + 1, axis=1)
    B = np.repeat((np.arange(n_pieni + 1) / n_pieni)[None, :], n_iso + 1, axis=0)
    # torus: kierretään i:n yli suljettuna → lisätään sulkeva rivi
    idx = np.array([[m.piste(P[i, j]) for j in range(n_pieni)] for i in range(n_iso)])
    for i in range(n_iso):
        for j in range(n_pieni):
            i1, j1 = (i + 1) % n_iso, (j + 1) % n_pieni
            vs = [idx[i, j], idx[i, j1], idx[i1, j1], idx[i1, j]]
            cs = [(i, j), (i, j + 1), (i + 1, j + 1), (i + 1, j)]
            pa = np.array(m.v[vs[0]]); pb = np.array(m.v[vs[1]]); pc = np.array(m.v[vs[3]])
            nn = np.cross(pb - pa, pc - pa)
            # ulos putken keskiympyrästä
            a = 2 * math.pi * (i + 0.5) / n_iso
            kk = np.array([keski[0], keski[1] + R * math.cos(a), keski[2] + R * math.sin(a)])
            if np.dot(nn, pa - kk) < 0: vs = vs[::-1]; cs = cs[::-1]
            m.taho(vs, [(S[a_, b_], T[a_, b_]) for a_, b_ in cs], [(A[a_, b_], B[a_, b_]) for a_, b_ in cs], tunnus_rengas, tiheys)
    # vanne: kiekot molemmin puolin
    for sx in (-1, 1):
        reuna = []
        nr = 20
        for i in range(nr):
            a = 2 * math.pi * i / nr
            reuna.append(m.piste((keski[0] + sx * r * 0.55 * leveys_kerroin, keski[1] + (R - r * 0.6) * math.cos(a), keski[2] + (R - r * 0.6) * math.sin(a))))
        viuhka(m, reuna, (keski[0] + sx * r * 0.2 * leveys_kerroin, keski[1], keski[2]), tunnus_vanne, tiheys,
               ulos=Vector((sx, 0, 0)))

def rakenna_pyora():
    m = Verkko("Pyora_V")
    rengas_verkko(m, (MX, PYORA_Y, PYORA_Z), PYORA_R - RENGAS_R, RENGAS_R, 1.0, 32, 12, RENGAS, VANNE, 0.8)
    return m.olio(KONE)

def rakenna_kannuspyora():
    m = Verkko("Kannuspyora")
    ky, kz = Y_NOKKA + 16.9, -0.52
    rengas_verkko(m, (0, ky, kz), 0.14, 0.075, 0.9, 20, 8, RENGAS, VANNE, 0.7)
    # tuki: haarukka + jalka rungosta
    for sx in (-1, 1):
        prof = [(0.0, 0.0), (0.0, 0.028), (0.34, 0.028), (0.34, 0.0)]
        pyorahdyspinta(m, prof, (sx * 0.1, ky + 0.02, kz), (0, 0.25, 1), 0.0, 6, TUKI, 0.7)
    prof = [(0.0, 0.0), (0.0, 0.05), (0.42, 0.05), (0.42, 0.0)]
    pyorahdyspinta(m, prof, (0, ky + 0.1, kz + 0.3), (0, 0.35, 1), 0.0, 8, TUKI, 0.7)
    return m.olio(KONE)

# =============================================================================================
# 6. ANTENNIT, PITOTPUTKET, VALOT, OHJAAMON SISUS
def rakenna_antennit():
    m = Verkko("Antennit")
    # Maston tyvi katolla (d 4.1) → kärki taakse kallistettuna.
    d0 = 4.1
    tyvi = runko_piste(d0, math.pi)
    karki = Vector((0, tyvi.y + 0.18, tyvi.z + 0.42))
    ns = 6
    P = np.zeros((5, 8, 3))
    for i in range(5):
        q = i / 4
        c = tyvi.lerp(karki, q) + Vector((0, 0, -0.04 if i == 0 else 0))
        jan = 0.20 * (1 - 0.6 * q); pk = 0.035 * (1 - 0.5 * q)
        for j in range(8):
            a = 2 * math.pi * j / 8
            P[i, j] = (c.x + pk * math.sin(a), c.y + jan * 0.5 * math.cos(a), c.z)
    S = np.repeat(np.linspace(0, 0.45, 5)[:, None], 9, axis=1); T = np.repeat((np.arange(9) / 8 * 0.35)[None, :], 5, axis=0)
    ii = ruudukko(m, P, S, T, S, T, ANTENNI, 1.0, True, True)
    viuhka(m, list(ii[-1]), P[-1].mean(axis=0) + np.array([0, 0, 0.01]), ANTENNI, 1.0, ulos=Vector((0, 0, 1)))
    # Lanka maston kärjestä sivuvakaajan kärkeen.
    loppu = Vector((0, 9.2, 3.70))
    suunta = (loppu - karki)
    prof = [(0.0, 0.0), (0.0, 0.006), (suunta.length, 0.006), (suunta.length, 0.0)]
    pyorahdyspinta(m, prof, tuple(karki), tuple(suunta.normalized()), 0.0, 5, ANTENNI, 0.3)
    # Suuntimosilmukan pisaramainen suojus katolla (d 6.2).
    d1 = 6.2
    pohja = runko_piste(d1, math.pi)
    prof = [(-0.30, 0.0), (-0.28, 0.05), (-0.2, 0.10), (-0.05, 0.13), (0.1, 0.12), (0.25, 0.08), (0.36, 0.03), (0.40, 0.0)]
    ridx, RP = pyorahdyspinta(m, prof, (0, pohja.y, pohja.z - 0.01), (0, 1, 0), 0.0, 16, ANTENNI, 1.0)
    # Pitotputket nokan alla molemmin puolin: jalka + putki eteenpäin.
    for sx in (-1, 1):
        d2 = 1.25
        fi = sx * math.radians(52)
        juuri = runko_piste(d2, fi)
        alas = Vector((sx * 0.05, 0, -0.14))
        prof = [(0.0, 0.0), (0.0, 0.016), (alas.length + 0.04, 0.016), (alas.length + 0.04, 0.0)]
        pyorahdyspinta(m, prof, tuple(juuri - alas.normalized() * 0.04), tuple(alas.normalized()), 0.0, 6, ANTENNI, 1.0)
        pk = juuri + alas
        prof = [(-0.14, 0.0), (-0.14, 0.010), (-0.12, 0.013), (0.18, 0.013), (0.18, 0.0)]
        pyorahdyspinta(m, prof, tuple(pk + Vector((0, 0.05, 0))), (0, -1, 0), 0.0, 8, ANTENNI, 1.0)
    # Vatsa-antenni siiven takana.
    d3 = 11.2
    pohja = runko_piste(d3, 0.0)
    prof = [(0.0, 0.0), (0.0, 0.012), (0.34, 0.006), (0.35, 0.0)]
    pyorahdyspinta(m, prof, tuple(pohja + Vector((0, 0, 0.03))), (0, 0.3, -1), 0.0, 6, ANTENNI, 0.5)
    return m.olio(KONE)

def rakenna_valot():
    m = Verkko("Valot")
    for sx, tunnus in ((1, VALO_PUN), (-1, VALO_VIH)):
        le_p, dvec, nvec, jan, tc, _ = siipi_profiili(SIIPI_KARKI - 0.1, sx)
        c = le_p + dvec * (0.25 * jan) + Vector((sx * 0.06, 0, 0))
        prof = [(-0.10, 0.0), (-0.08, 0.035), (0.0, 0.05), (0.12, 0.03), (0.18, 0.0)]
        pyorahdyspinta(m, prof, tuple(c), (0, 1, 0), 0.0, 10, tunnus, 1.0)
    # Peräpeili: valkoinen valo peräsimen jättöreunassa.
    prof = [(-0.06, 0.0), (-0.05, 0.03), (0.02, 0.035), (0.07, 0.0)]
    pyorahdyspinta(m, prof, (0, float(EV_TE(2.2)) + 0.02, 2.2), (0, 1, 0), 0.0, 8, VALO_VAL, 1.0)
    return m.olio(KONE)

def rakenna_sisus():
    """Ohjaamon tumma sisus: sisäkuori (normaalit sisään), takaseinä, kojelauta ja istuimet."""
    m = Verkko("Sisus")
    ds = np.linspace(1.25, 4.3, 9)
    n = 24
    P = np.zeros((len(ds), n, 3))
    for i, d in enumerate(ds):
        for j in range(n):
            fi = -math.pi + 2 * math.pi * j / n
            p = runko_piste(d, fi)
            zc = (float(KATTO(d)) + float(POHJA(d))) / 2
            c = Vector((0, p.y, zc))
            P[i, j] = tuple(c + (p - c) * 0.93)
    S = np.repeat(ds[:, None], n + 1, axis=1); T = np.repeat((np.arange(n + 1) / n * 7.0)[None, :], len(ds), axis=0)
    idx = ruudukko(m, P, S, T, S, T, SISUS, 0.25, True, True, kaanna=None)
    # Käännetään kuoren tahot osoittamaan sisään: merkitään tahojen määrä ja käännetään myöhemmin.
    kuori_tahoja = len(m.f)
    # takaseinä (osoittaa eteen) ja etuseinä (nokan puolella, osoittaa taakse)
    for i, ulos in ((len(ds) - 1, (0, -1, 0)), (0, (0, 1, 0))):
        viuhka(m, list(idx[i]), P[i].mean(axis=0), SISUS, 0.25, ulos=Vector(ulos))
    # kojelauta ja lasisuoja: laatikoita
    def laatikko(c, koko):
        cx, cy, cz = c; lx, ly, lz = koko
        vs = [m.piste((cx + sx * lx / 2, cy + sy * ly / 2, cz + sz * lz / 2)) for sx in (-1, 1) for sy in (-1, 1) for sz in (-1, 1)]
        tahot = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
        for f in tahot:
            pts = [np.array(m.v[vs[k]]) for k in f]
            nn = np.cross(pts[1] - pts[0], pts[2] - pts[0])
            ff = list(f)
            if np.dot(nn, np.mean(pts, axis=0) - np.array(c)) < 0: ff = ff[::-1]
            m.taho([vs[k] for k in ff], [(m.v[vs[k]][0] + m.v[vs[k]][1], m.v[vs[k]][2]) for k in ff], [(0, 0)] * 4, SISUS, 0.25, False)
    laatikko((0, Y_NOKKA + 2.15, 0.25), (1.5, 0.10, 0.40))
    laatikko((0, Y_NOKKA + 2.05, 0.48), (1.1, 0.28, 0.04))
    for sx in (-1, 1):
        laatikko((sx * 0.45, Y_NOKKA + 3.2, -0.05), (0.5, 0.5, 0.12))
        laatikko((sx * 0.45, Y_NOKKA + 3.45, 0.35), (0.5, 0.1, 0.75))
    m.kaanna(0, kuori_tahoja)
    return m.olio(KONE)

# =============================================================================================
def korjaa_moottorin_sisaseina(o):
    """Suojuksen sisäseinän (dn 0.02–0.34, säde < 0.52) tahot osoittamaan akselia kohti."""
    bm = bmesh.new(); bm.from_mesh(o.data)
    uv = bm.loops.layers.uv["tunnus"]
    for f in bm.faces:
        if int(round(f.loops[0][uv].uv[0])) != MOOTTORI: continue
        c = f.calc_center_median()
        dn = c.y - MY0
        r = math.hypot(c.x - MX, c.z - MZ)
        if dn > 0.015 and dn < 0.345 and r < 0.53:
            akselille = Vector((MX - c.x, 0, MZ - c.z))
            if f.normal.dot(akselille) < 0: f.normal_flip()
    bm.to_mesh(o.data); bm.free()

def peilaa(o, nimi, vanhempi=None):
    me = o.data.copy(); me.name = nimi
    bm = bmesh.new(); bm.from_mesh(me)
    bmesh.ops.scale(bm, vec=(-1, 1, 1), verts=bm.verts[:])
    bmesh.ops.reverse_faces(bm, faces=bm.faces[:], flip_multires=False)
    bm.to_mesh(me); bm.free()
    k = bpy.data.objects.new(nimi, me)
    scene.collection.objects.link(k)
    k.location = Vector((-o.location.x, o.location.y, o.location.z))
    if vanhempi is not None: k.parent = vanhempi
    return k

loki("rakennetaan geometria")
runko = rakenna_runko()
rakenna_ikkunat()
sisus = rakenna_sisus()
siipi = rakenna_siipi()
vakaaja = rakenna_vakaaja()
sivuvakaaja = rakenna_sivuvakaaja()
moottori = rakenna_moottori()
korjaa_moottorin_sisaseina(moottori)
pyora = rakenna_pyora()
kannus = rakenna_kannuspyora()
antennit = rakenna_antennit()
valot = rakenna_valot()
napa = rakenna_napa().olio(KONE, sijainti=(-MX, NAPA_Y, MZ))
# napa rakennettiin origoon: siirretään sijaintiin (olion origo navassa)
lapa1 = rakenna_lapa().olio(KONE)
lapa1.parent = napa

ATLAS = [runko, sisus, siipi, vakaaja, sivuvakaaja, moottori, pyora, kannus, antennit, valot, napa, lapa1]

# ---------------------------------------------------------------------------------------------
# UV-pakkaus: kaikki atlasosat yhteen, sen jälkeen peilikopiot ja lapakopiot jakavat UV:n.
loki("UV-pakkaus")
for o in scene.objects: o.select_set(False)
for o in ATLAS: o.select_set(True)
bpy.context.view_layer.objects.active = runko
bpy.ops.object.mode_set(mode='EDIT')
scene.tool_settings.use_uv_select_sync = True
bpy.ops.mesh.select_all(action='SELECT')
try:
    bpy.ops.uv.pack_islands(udim_source='CLOSEST_UDIM', rotate=True, rotate_method='CARDINAL', scale=True,
                            merge_overlap=False, margin_method='FRACTION', margin=0.004, pin=False,
                            shape_method='CONCAVE')
except TypeError as e:
    loki("pack_islands oletusasetuksin:", e)
    bpy.ops.uv.pack_islands(rotate=True, margin=0.004)
bpy.ops.object.mode_set(mode='OBJECT')

# Tekselitiheys rungosta: UV-pituus / pintapituus.
def tekselitiheys(o):
    me = o.data
    uv = np.zeros(len(me.loops) * 2, np.float32); me.uv_layers["UVMap"].data.foreach_get("uv", uv)
    pn = np.zeros(len(me.loops) * 2, np.float32); me.uv_layers["pinta"].data.foreach_get("uv", pn)
    uv = uv.reshape(-1, 2); pn = pn.reshape(-1, 2)
    suhteet = []
    for p in list(me.polygons)[:2000:7]:
        l0, l1 = p.loop_start, p.loop_start + 1
        du = np.linalg.norm(uv[l1] - uv[l0]); dp = np.linalg.norm(pn[l1] - pn[l0])
        if dp > 1e-3: suhteet.append(du / dp)
    return float(np.median(suhteet))
TIHEYS = tekselitiheys(runko) * KOKO   # tekseliä metrille
loki("tekselitiheys %.0f px/m (%.1f mm/teksel)" % (TIHEYS, 1000 / TIHEYS))

# Peilikopiot (vasen/oikea) ja lavat.
siipi_o = peilaa(siipi, "Siipi_O")
vakaaja_o = peilaa(vakaaja, "Vakaaja_O")
moottori_o = peilaa(moottori, "Moottori_O")
pyora_o = peilaa(pyora, "Pyora_O")
napa_v = peilaa(napa, "Potkuri_V")
napa_v.location = Vector((MX, NAPA_Y, MZ))
lavat_o = [lapa1]
for k in (1, 2):
    me = lapa1.data.copy(); me.name = "Lapa_O%d" % (k + 1)
    me.transform(Matrix.Rotation(2 * math.pi * k / 3, 4, 'Y'))
    lo = bpy.data.objects.new(me.name, me); scene.collection.objects.link(lo); lo.parent = napa
    lavat_o.append(lo)
lavat_v = []
for k, lo in enumerate(lavat_o):
    lv = peilaa(lo, "Lapa_V%d" % (k + 1), vanhempi=napa_v)
    lv.location = Vector((0, 0, 0))
    lavat_v.append(lv)

# Juuri "DC3"
juuri = bpy.data.objects.new("DC3", None)
scene.collection.objects.link(juuri)
for o in list(scene.objects):
    if o is not juuri and o.parent is None:
        o.parent = juuri
bpy.context.view_layer.update()

MESHES = [o for o in scene.objects if o.type == 'MESH']
kolmiot = sum(len(o.data.polygons) for o in MESHES)
loki("kolmioita yhteensä:", kolmiot)
for o in sorted(MESHES, key=lambda o: o.name):
    loki("  %-20s %6d" % (o.name, len(o.data.polygons)))

# ---------------------------------------------------------------------------------------------
# Esikatselu (EEVEE): taivasgradientti, aurinko, kamerat koko koneelle ja 3–5 m lähikuville.
NAKYMAT = [  # (nimi, kamera, kohde, polttoväli mm)
    ("koko", (19.0, -23.0, 8.5), (0.0, -0.8, 0.2), 45),
    ("lahi-ohjaamo", (2.6, -12.2, 2.0), (0.4, -8.4, 0.7), 28),
    ("lahi-moottori", (6.4, -8.2, 0.2), (3.7, -5.2, -0.7), 28),
    ("lahi-pyrsto", (4.6, 2.6, 1.3), (1.0, 5.2, 0.6), 28),
]
TARKISTUSNAKYMAT = [
    ("ala-siipi", (7.5, 3.0, -4.2), (5.0, -1.5, -1.2), 28),
    ("siipi-yla", (10.5, 4.5, 4.0), (9.5, -1.0, -0.4), 28),
    ("ala-takaa", (-9.0, 16.0, -4.5), (0.0, -1.0, -0.6), 40),
    ("gondoli-ulko", (6.3, -1.2, -2.3), (4.1, -3.4, -1.1), 28),
]
def esikatsele(kansio, etuliite="dc3", nakymat=None, leveys=1600, korkeus=1000):
    os.makedirs(kansio, exist_ok=True)
    w = bpy.data.worlds.new("Taivas"); w.use_nodes = True
    nt = w.node_tree; nt.nodes.clear()
    tc = nt.nodes.new("ShaderNodeTexCoord"); sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    ramp = nt.nodes.new("ShaderNodeValToRGB"); bg = nt.nodes.new("ShaderNodeBackground"); out = nt.nodes.new("ShaderNodeOutputWorld")
    ma = nt.nodes.new("ShaderNodeMath"); ma.operation = 'MULTIPLY_ADD'; ma.inputs[1].default_value = 0.5; ma.inputs[2].default_value = 0.5
    nt.links.new(tc.outputs["Generated"], sep.inputs[0]); nt.links.new(sep.outputs["Z"], ma.inputs[0]); nt.links.new(ma.outputs[0], ramp.inputs[0])
    nt.links.new(ramp.outputs[0], bg.inputs[0]); nt.links.new(bg.outputs[0], out.inputs[0])
    cr = ramp.color_ramp
    cr.elements[0].position = 0.40; cr.elements[0].color = (0.16, 0.14, 0.11, 1)
    cr.elements[1].position = 1.0; cr.elements[1].color = (0.20, 0.36, 0.72, 1)
    e = cr.elements.new(0.50); e.color = (0.78, 0.82, 0.86, 1)
    e = cr.elements.new(0.62); e.color = (0.52, 0.64, 0.82, 1)
    bg.inputs[1].default_value = 1.0
    scene.world = w
    if "Aurinko" not in bpy.data.objects:
        valo = bpy.data.objects.new("Aurinko", bpy.data.lights.new("Aurinko", 'SUN'))
        valo.data.energy = 3.5; valo.data.angle = math.radians(1.0)
        valo.rotation_euler = (math.radians(50), math.radians(-25), math.radians(35))
        scene.collection.objects.link(valo)
    scene.render.engine = 'BLENDER_EEVEE'
    try: scene.eevee.taa_render_samples = 32
    except Exception: pass
    scene.view_settings.view_transform = 'Standard'
    scene.render.resolution_x, scene.render.resolution_y = leveys, korkeus
    scene.render.image_settings.file_format = 'PNG'
    kam = bpy.data.objects.get("Kamera")
    if kam is None:
        kam = bpy.data.objects.new("Kamera", bpy.data.cameras.new("Kamera")); scene.collection.objects.link(kam)
    kam.data.clip_start = 0.05
    scene.camera = kam
    polut = []
    for nimi, sij, kohde, mm in (nakymat or NAKYMAT):
        kam.location = Vector(sij)
        kam.rotation_euler = (Vector(kohde) - kam.location).to_track_quat('-Z', 'Y').to_euler()
        kam.data.lens = mm
        scene.render.filepath = os.path.join(kansio, "%s-%s.png" % (etuliite, nimi))
        bpy.ops.render.render(write_still=True)
        polut.append(scene.render.filepath)
        loki("esikatselu:", scene.render.filepath, "(etäisyys kohteeseen %.1f m)" % (Vector(kohde) - Vector(sij)).length)
    return polut

if os.environ.get("DC3_VAIN_GEOMETRIA"):
    esikatsele(ESIKATSELU or "/tmp/dc3-esikatselu", "geom", NAKYMAT + [("sivu", (26, -1, 0.5), (0, -1, 0.5), 50),
               ("edesta", (0, -30, 1), (0, 0, 0.3), 50)])
    sys.exit(0)

import dc3_maalaus
KUVAT = dc3_maalaus.aja(globals())

# ---------------------------------------------------------------------------------------------
# Esikatselu tekstuureilla (Blenderin materiaali vastaa URP/Litiä: albedo, normaali, R = metalli, A = sileys).
def tekstuurimateriaali(m):
    nt = m.node_tree
    b = nt.nodes.get("Principled BSDF")
    uvn = nt.nodes.new("ShaderNodeUVMap"); uvn.uv_map = "UVMap"
    def kuva(nimi, vari):
        img = bpy.data.images.load(KUVAT[nimi]); img.colorspace_settings.name = 'sRGB' if vari else 'Non-Color'
        img.alpha_mode = 'CHANNEL_PACKED'
        n = nt.nodes.new("ShaderNodeTexImage"); n.image = img
        nt.links.new(uvn.outputs["UV"], n.inputs["Vector"])
        return n
    v = kuva("DC3_vari.png", True); nt.links.new(v.outputs["Color"], b.inputs["Base Color"])
    nk = kuva("DC3_normaali.png", False)
    nm = nt.nodes.new("ShaderNodeNormalMap"); nm.uv_map = "UVMap"
    nt.links.new(nk.outputs["Color"], nm.inputs["Color"]); nt.links.new(nm.outputs["Normal"], b.inputs["Normal"])
    mk = kuva("DC3_maski.png", False)
    sep = nt.nodes.new("ShaderNodeSeparateColor"); nt.links.new(mk.outputs["Color"], sep.inputs[0])
    nt.links.new(sep.outputs[0], b.inputs["Metallic"])
    inv = nt.nodes.new("ShaderNodeMath"); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0
    nt.links.new(mk.outputs["Alpha"], inv.inputs[1]); nt.links.new(inv.outputs[0], b.inputs["Roughness"])

def tavallinen_materiaali(m):
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type not in ('BSDF_PRINCIPLED', 'OUTPUT_MATERIAL'): nt.nodes.remove(n)

if ESIKATSELU:
    tekstuurimateriaali(KONE)
    for _m in (KONE, LASI): _m.use_backface_culling = True   # kuten Unityssä: väärin päin olevat tahot näkyisivät reikinä
    esikatsele(ESIKATSELU, "dc3", NAKYMAT + (TARKISTUSNAKYMAT if os.environ.get("DC3_TARKISTUS") else []))
    tavallinen_materiaali(KONE)

# ---------------------------------------------------------------------------------------------
# FBX-vienti: vain UVMap (ylimääräiset UV-kanavat pois), ei tekstuuriviitteitä.
for o in MESHES:
    for nimi in ("pinta", "param", "tunnus"):
        uv = o.data.uv_layers.get(nimi)
        if uv: o.data.uv_layers.remove(uv)
for o in list(scene.objects):
    if o.type not in ('MESH', 'EMPTY'): bpy.data.objects.remove(o)
# Korjaus Blenderin FBX-viejään (5.2): Apply Transform (bake_space_transform) antaa väärän paikallismuunnoksen
# lapsille, joiden vanhemmalla on oma muunnos (lavat navan alla saivat 90° kierron ja väärän siirron).
# Oikea paikallismuunnos leivotussa avaruudessa on G · M_paikallinen · G⁻¹.
import importlib
_fu = importlib.import_module("io_scene_fbx.fbx_utils")
_alkup = _fu.ObjectWrapper.fbx_object_matrix
def _korjattu(self, scene_data, rest=False, local_space=False, global_space=False):
    p = self.parent
    if (not local_space and not global_space and self._tag == 'OB' and p is not None and p._tag == 'OB'
            and not self.parented_to_armature and self.use_bake_space_transform(scene_data)
            and p.use_bake_space_transform(scene_data)):
        m = self.matrix_rest_local if rest else self.matrix_local
        return scene_data.settings.global_matrix @ m @ scene_data.settings.global_matrix_inv
    return _alkup(self, scene_data, rest, local_space, global_space)
_fu.ObjectWrapper.fbx_object_matrix = _korjattu
bpy.ops.export_scene.fbx(filepath=ULOS, use_selection=False, apply_scale_options='FBX_SCALE_UNITS',
                         axis_forward='-Z', axis_up='Y', bake_space_transform=True,
                         object_types={'EMPTY', 'MESH'}, mesh_smooth_type='FACE', add_leaf_bones=False,
                         path_mode='STRIP', embed_textures=False, use_tspace=False)
loki("vienti:", ULOS, "(%.1f Mt)" % (os.path.getsize(ULOS) / 1e6), "kolmioita", kolmiot)
