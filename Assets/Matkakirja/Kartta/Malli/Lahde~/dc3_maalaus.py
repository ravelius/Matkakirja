# Matkakirja: DC-3-mallin tekstuurit (oma työ, CC0). Kutsutaan dc3_hd.py:stä Blenderin sisällä.
#
# 1) Leivonta (Cycles, EMIT): jokaiselle atlaksen tekselille pintakoordinaatit (pinta: s, t metreinä),
#    osakohtaiset parametrit (param: esim. jänteen osuus, kulma), osan tunnus, maailman sijainti ja
#    normaali; lisäksi peittävyys (AO, 64 näytettä, potkurit ja lasit piilossa).
# 2) Maalaus numpylla tekstuuriavaruudessa: paneelit (sävy ja sileys paneeleittain), paneelisaumat,
#    niittirivit, kangaspäällysteiset peräsimet (kylkiluunauhat), jäänpoistokumit, kulkutiet, luukut,
#    ovet, punainen raita (#9a3b2c) ja tunnus (fiktiivinen OH-MKJ), häikäisysuoja, pakokaasuvanat,
#    öljyvanat, kuluma. Kirjaimet piirretään omalla viivafontilla (ei ulkopuolisia fontteja).
# 3) Normaalikartta korkeuskentästä (tangenttiavaruus, OpenGL: vihreä = +V, Unityn oletus),
#    maskikartta URP/Litin _MetallicGlossMap-muodossa (R = metallisuus, G = peittävyys, B = 0,
#    A = sileys) ja albedo sRGB:nä. PNG-kirjoitin on oma (numpy + zlib), jotta värit eivät kulje
#    Blenderin värinhallinnan läpi.
import bpy, math, os, time, zlib, struct
import numpy as np

T0 = time.time()
def loki(*a): print("[dc3_maalaus %5.1f s]" % (time.time() - T0), *a, flush=True)

# ---------------------------------------------------------------------------------------------
# PNG
def kirjoita_png(polku, kuva):
    """kuva: uint8 (H, W, C), rivi 0 = ylin rivi. Suodatin valitaan riveittäin (Sub/Up/Paeth)."""
    H, W, C = kuva.shape
    x = kuva.astype(np.int16)
    a = np.zeros_like(x); a[:, 1:] = x[:, :-1]                  # vasen pikseli
    b = np.zeros_like(x); b[1:] = x[:-1]                        # ylä
    c = np.zeros_like(x); c[1:, 1:] = x[:-1, :-1]               # ylävasen
    p = a + b - c
    pa, pb, pc = np.abs(p - a), np.abs(p - b), np.abs(p - c)
    paeth = np.where((pa <= pb) & (pa <= pc), a, np.where(pb <= pc, b, c))
    ehdokkaat = [(0, x), (1, x - a), (2, x - b), (4, x - paeth)]
    parhaat = None; tyypit = None
    for tyyppi, f in ehdokkaat:
        f8 = (f & 0xFF).astype(np.uint8)
        hinta = np.abs(f8.astype(np.int8).astype(np.int32)).sum(axis=(1, 2))
        if parhaat is None:
            parhaat = f8.copy(); tyypit = np.full(H, tyyppi, np.uint8); pienin = hinta
        else:
            valitse = hinta < pienin
            parhaat[valitse] = f8[valitse]; tyypit[valitse] = tyyppi; pienin = np.minimum(pienin, hinta)
    raaka = np.concatenate([tyypit[:, None], parhaat.reshape(H, W * C)], axis=1).tobytes()
    def pala(tyyppi, data):
        return struct.pack(">I", len(data)) + tyyppi + data + struct.pack(">I", zlib.crc32(tyyppi + data) & 0xFFFFFFFF)
    ct = {1: 0, 2: 4, 3: 2, 4: 6}[C]
    with open(polku, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(pala(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, ct, 0, 0, 0)))
        if C in (3, 4) and "vari" in os.path.basename(polku):
            f.write(pala(b"sRGB", b"\x00"))
        f.write(pala(b"IDAT", zlib.compress(raaka, 9)))
        f.write(pala(b"IEND", b""))
    return os.path.getsize(polku)

def srgb(lin):
    lin = np.clip(lin, 0.0, 1.0)
    return np.where(lin <= 0.0031308, lin * 12.92, 1.055 * np.power(lin, 1 / 2.4) - 0.055)

def lin(hexa):
    r, g, b = (int(hexa[i:i + 2], 16) / 255.0 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return np.array([f(r), f(g), f(b)], np.float32)

# ---------------------------------------------------------------------------------------------
# Leivonta
def _kuva(nimi, K):
    img = bpy.data.images.new(nimi, K, K, alpha=True, float_buffer=True)
    img.colorspace_settings.name = 'Non-Color'
    return img

def _numpy(img, K):
    arr = np.empty(K * K * 4, np.float32)
    img.pixels.foreach_get(arr)
    return arr.reshape(K, K, 4)

def leivo(g):
    scene = g["scene"]; K = g["KOKO"]; atlas = g["ATLAS"]
    scene.render.engine = 'CYCLES'
    # CPU: Metal-ytimien käännös kaatoi Blender 5.2.1:n taustatilassa (AO-leivonta, 24.9.2026).
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 1
    scene.cycles.use_denoising = False
    if scene.world is None:
        scene.world = bpy.data.worlds.new("Leivontamaailma")
    scene.world.light_settings.distance = 1.2

    mat = bpy.data.materials.new("Leivonta"); mat.use_nodes = True
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs["Strength"].default_value = 1.0
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    kuvasolmu = nt.nodes.new('ShaderNodeTexImage'); nt.nodes.active = kuvasolmu
    uv = {}
    for n in ("pinta", "param", "tunnus"):
        u = nt.nodes.new('ShaderNodeUVMap'); u.uv_map = n; uv[n] = u
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    sep_p = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv["pinta"].outputs["UV"], sep_p.inputs[0])
    sep_q = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv["param"].outputs["UV"], sep_q.inputs[0])
    sep_t = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv["tunnus"].outputs["UV"], sep_t.inputs[0])
    yhd_a = nt.nodes.new('ShaderNodeCombineXYZ')
    nt.links.new(sep_p.outputs["X"], yhd_a.inputs["X"]); nt.links.new(sep_p.outputs["Y"], yhd_a.inputs["Y"])
    nt.links.new(sep_t.outputs["X"], yhd_a.inputs["Z"])
    yhd_d = nt.nodes.new('ShaderNodeCombineXYZ')
    nt.links.new(sep_q.outputs["X"], yhd_d.inputs["X"]); nt.links.new(sep_q.outputs["Y"], yhd_d.inputs["Y"])
    muunnos = nt.nodes.new('ShaderNodeVectorMath'); muunnos.operation = 'MULTIPLY_ADD'
    nt.links.new(muunnos.outputs[0], em.inputs["Color"])

    valmiit = {}
    alkuperaiset = {}
    for o in atlas:
        alkuperaiset[o.name] = o.data.materials[0]
        o.data.materials[0] = mat
    for o in scene.objects: o.select_set(False)
    for o in atlas: o.select_set(True)
    bpy.context.view_layer.objects.active = atlas[0]

    kierrokset = [("A", yhd_a.outputs[0], 0.01, 0.5), ("B", geo.outputs["Position"], 0.01, 0.5),
                  ("C", geo.outputs["Normal"], 0.5, 0.5), ("D", yhd_d.outputs[0], 0.01, 0.5)]
    for nimi, lahto, kerroin, siirto in kierrokset:
        img = _kuva("leivonta_" + nimi, K); kuvasolmu.image = img
        for l in list(muunnos.inputs[0].links): nt.links.remove(l)
        nt.links.new(lahto, muunnos.inputs[0])
        muunnos.inputs[1].default_value = (kerroin,) * 3
        muunnos.inputs[2].default_value = (siirto,) * 3
        bpy.ops.object.bake(type='EMIT', margin=16, margin_type='EXTEND', use_clear=True, target='IMAGE_TEXTURES')
        arr = _numpy(img, K)[..., :3]
        valmiit[nimi] = (arr - siirto) / kerroin
        bpy.data.images.remove(img)
        loki("leivottu", nimi)

    # Peittävyys: potkurit ja lasit piiloon (pyörivä potkuri ei varjosta), ohjaamon sisus mukana.
    piilo = [o for o in scene.objects if o.type == 'MESH' and (o.name.startswith("Lapa") or o.name.startswith("Potkuri") or o.name.startswith("Ikkun"))]
    for o in piilo: o.hide_render = True
    for o in scene.objects: o.select_set(False)
    ao_osat = [o for o in atlas if o not in piilo]
    for o in ao_osat: o.select_set(True)
    bpy.context.view_layer.objects.active = ao_osat[0]
    img = _kuva("leivonta_AO", K); kuvasolmu.image = img
    scene.cycles.samples = 64
    bpy.ops.object.bake(type='AO', margin=16, margin_type='EXTEND', use_clear=True, target='IMAGE_TEXTURES')
    valmiit["AO"] = _numpy(img, K)[..., 0].copy()
    bpy.data.images.remove(img)
    for o in piilo: o.hide_render = False
    for o in atlas: o.data.materials[0] = alkuperaiset[o.name]
    bpy.data.materials.remove(mat)
    scene.cycles.samples = 1
    loki("leivottu AO")
    return valmiit

# ---------------------------------------------------------------------------------------------
# Apufunktiot maalaukseen
def _hash(ix, iy, iz, siemen):
    h = np.sin(ix * 127.1 + iy * 311.7 + iz * 74.7 + siemen * 19.19) * 43758.5453
    return h - np.floor(h)

def kohina(P, taaj, siemen=0.0, venytys=(1.0, 1.0, 1.0)):
    """Arvokohina 0..1 (kolmilineaarinen, pehmeä), P (n, 3) metreinä."""
    q = P * (np.asarray(venytys) * taaj)
    i = np.floor(q); f = q - i
    f = f * f * (3 - 2 * f)
    ix, iy, iz = i[:, 0], i[:, 1], i[:, 2]
    fx, fy, fz = f[:, 0], f[:, 1], f[:, 2]
    tulos = 0.0
    for dx in (0, 1):
        wx = fx if dx else 1 - fx
        for dy in (0, 1):
            wy = fy if dy else 1 - fy
            for dz in (0, 1):
                wz = fz if dz else 1 - fz
                tulos = tulos + wx * wy * wz * _hash(ix + dx, iy + dy, iz + dz, siemen)
    return tulos

def fbm(P, taaj, siemen=0.0, oktaavit=3, venytys=(1.0, 1.0, 1.0)):
    s = 0.0; a = 0.5; w = 0.0
    for k in range(oktaavit):
        s = s + a * kohina(P, taaj * 2 ** k, siemen + k * 7.3, venytys); w += a; a *= 0.5
    return s / w

def ura(d, w):
    return np.exp(-(d / w) ** 2)

def jaksoetaisyys(x, jako, alku=0.0):
    """Etäisyys lähimpään viivaan joukosta alku + k*jako."""
    q = (x - alku) / jako
    return (q - np.round(q)) * jako

def niittirivi(pitkin, poikki, jako=0.036, r=0.0034):
    u = (pitkin / jako) % 1.0 - 0.5
    return np.exp(-((u * jako) ** 2 + poikki ** 2) / (r * r))

def peitto(sd, tekseli):
    """Antialiasoitu peitto merkitystä etäisyydestä (negatiivinen = sisällä)."""
    return np.clip(0.5 - sd / tekseli, 0.0, 1.0)

def pyor_suorakaide(px, py, puolileveys, puolikorkeus, r):
    qx = np.abs(px) - (puolileveys - r); qy = np.abs(py) - (puolikorkeus - r)
    ulko = np.sqrt(np.maximum(qx, 0) ** 2 + np.maximum(qy, 0) ** 2)
    return ulko + np.minimum(np.maximum(qx, qy), 0) - r

def monikulmio_sd(px, py, kulmat):
    """Kupera monikulmio: likimääräinen merkitty etäisyys (max reunojen etäisyyksistä)."""
    kulmat = np.asarray(kulmat, float)
    # kiertosuunta: positiivinen pinta-ala → vastapäivään
    ala = 0.5 * np.sum(kulmat[:, 0] * np.roll(kulmat[:, 1], -1) - np.roll(kulmat[:, 0], -1) * kulmat[:, 1])
    sd = None
    for k in range(len(kulmat)):
        p0, p1 = kulmat[k], kulmat[(k + 1) % len(kulmat)]
        e = p1 - p0; n = np.array([e[1], -e[0]]) / np.linalg.norm(e)
        if ala < 0: n = -n
        d = (px - p0[0]) * n[0] + (py - p0[1]) * n[1]
        sd = d if sd is None else np.maximum(sd, d)
    return sd

# Oma viivafontti (ruudukko 4 × 6, viivan paksuus ~0.9 yksikköä).
FONTTI = {
    "O": [[(0, 1.2), (0, 4.8), (1.2, 6), (2.8, 6), (4, 4.8), (4, 1.2), (2.8, 0), (1.2, 0), (0, 1.2)]],
    "H": [[(0, 0), (0, 6)], [(4, 0), (4, 6)], [(0, 3), (4, 3)]],
    "-": [[(0.6, 3), (3.4, 3)]],
    "M": [[(0, 0), (0, 6), (2, 2.4), (4, 6), (4, 0)]],
    "K": [[(0, 0), (0, 6)], [(4, 6), (0, 2.1)], [(1.25, 3.2), (4, 0)]],
    "J": [[(4, 6), (4, 1.2), (2.8, 0), (1.2, 0), (0, 1.2), (0, 2.0)]],
    "A": [[(0, 0), (2, 6), (4, 0)], [(0.75, 2.2), (3.25, 2.2)]],
    "T": [[(0, 6), (4, 6)], [(2, 6), (2, 0)]],
    "I": [[(0.6, 0), (0.6, 6)]],
    "R": [[(0, 0), (0, 6), (2.9, 6), (4, 4.9), (4, 4.1), (2.9, 3), (0, 3)], [(2.2, 3), (4, 0)]],
}
LEVEYS = {"I": 1.2, "-": 4.0}

def tekstin_etaisyys(u, v, teksti, paksuus=0.9):
    """Etäisyys (fonttiyksikköinä) tekstin viivoista pisteille (u, v); teksti alkaa u=0, perusviiva v=0."""
    d = np.full(u.shape, 1e9)
    x0 = 0.0
    for merkki in teksti:
        for viiva in FONTTI[merkki]:
            for (ax, ay), (bx, by) in zip(viiva, viiva[1:]):
                ax += x0; bx += x0
                ex, ey = bx - ax, by - ay
                L2 = ex * ex + ey * ey
                tt = np.clip(((u - ax) * ex + (v - ay) * ey) / L2, 0, 1)
                d = np.minimum(d, np.hypot(u - ax - tt * ex, v - ay - tt * ey))
        x0 += LEVEYS.get(merkki, 4.0) + 1.5
    return d - paksuus / 2, x0 - 1.5

# ---------------------------------------------------------------------------------------------
# Maalaus
ALUMIINI = np.array([0.80, 0.805, 0.815], np.float32)
PUNAINEN = lin("#9a3b2c")
MUSTA_MAALI = lin("#161616")
HAIKAISY = lin("#1f211c")
KUMI = np.array([0.022, 0.022, 0.024], np.float32)
KANGAS = np.array([0.56, 0.57, 0.58], np.float32)
KELTAINEN = lin("#e2b224")
NOKI = np.array([0.045, 0.040, 0.035], np.float32)
OLJY = np.array([0.10, 0.075, 0.045], np.float32)

class Osa:
    """Yhden osan tekselit: indeksit ja leivotut arvot."""
    def __init__(self, M, i):
        self.i = i
        self.s = M["A"][i, 0]; self.t = M["A"][i, 1]
        self.a = M["D"][i, 0]; self.b = M["D"][i, 1]
        self.P = M["B"][i]; self.N = M["C"][i] * 2 - 1
        n = len(i)
        self.alb = np.tile(ALUMIINI, (n, 1)); self.met = np.ones(n, np.float32)
        self.smo = np.full(n, 0.85, np.float32); self.h = np.zeros(n, np.float32)
        self.kolo = np.ones(n, np.float32)   # saumojen peittävyys (G-kanavaan)

    def maalaa(self, maski, vari, met, smo):
        m = maski[:, None]
        self.alb = self.alb * (1 - m) + np.asarray(vari, np.float32) * m
        self.met = self.met * (1 - maski) + met * maski
        self.smo = self.smo * (1 - maski) + smo * maski

    def sauma(self, d, leveys=0.0022, syvyys=0.0009, tumma=0.55):
        u = ura(d, leveys)
        self.h -= syvyys * u
        self.alb *= (1 - (1 - tumma) * u)[:, None]
        self.smo -= 0.25 * u
        self.kolo *= 1 - 0.45 * u

    def niitit(self, pitkin, poikki, jako=0.036, korkeus=0.0006, r=0.0034):
        n = niittirivi(pitkin, poikki, jako, r)
        self.h += korkeus * n
        self.alb *= (1 - 0.10 * n)[:, None]
        self.smo -= 0.18 * n

def paneelisavy(o, avain, siemen, smo_min=0.75, smo_max=0.92):
    """Paneelikohtainen sävy ja sileys (0,75–0,92) kokonaislukuavaimesta."""
    h1 = _hash(avain[0], avain[1], avain[2], siemen)
    h2 = _hash(avain[0], avain[1], avain[2], siemen + 3.7)
    savy = 0.90 + 0.12 * h1
    kylma = (h2 - 0.5) * 0.03
    o.alb = o.alb * savy[:, None] * np.stack([1 - kylma, np.ones_like(kylma), 1 + kylma], 1)
    o.smo = smo_min + (smo_max - smo_min) * h2

def aluminiini_kohina(o, siemen):
    n = fbm(o.P, 1.7, siemen, 3)
    o.alb *= (0.97 + 0.06 * n)[:, None]
    o.smo += (n - 0.5) * 0.05
    # hienot hiertojäljet: venytetty kohina (vaakasuunta)
    v = kohina(o.P, 9.0, siemen + 5, (1.0, 0.08, 1.0))
    o.smo -= 0.03 * v

def kangas(o, maski, poikki, jako=0.24, siemen=0.0):
    """Kangaspäällysteinen pinta: hopealakka, kylkiluunauhat jaolla `jako` (poikki = koordinaatti kylkiluita vastaan)."""
    q = (poikki / jako) % 1.0
    nauha = ura(np.minimum(q, 1 - q) * jako, 0.012)
    painuma = -0.0028 * np.sin(np.pi * q) * (1 - nauha)
    o.h = o.h * (1 - maski) + (o.h + painuma + 0.0005 * nauha) * maski
    savy = KANGAS * (0.97 + 0.05 * fbm(o.P, 3.0, siemen, 2))[:, None]
    o.maalaa(maski, savy, 0.35, 0.52)
    o.alb *= (1 - 0.06 * nauha * maski)[:, None]
    o.smo -= 0.1 * nauha * maski

def pakokaasu(g, P, N):
    """Pakokaasuvanan voimakkuus 0..1 (vasen moottori, ulkosivun pakoputki)."""
    MX, MY0, MZ = g["MX"], g["MY0"], g["MZ"]
    a = math.radians(122)
    pe = np.array([MX + 0.66 * math.sin(a) * 1.02, MY0 + 1.62, MZ + 0.66 * math.cos(a) * 1.05])
    suunta = np.array([0.12, 1.0, -0.10]); suunta /= np.linalg.norm(suunta)
    e = pe + suunta * 0.11
    dy = P[:, 1] - e[1]
    xc = e[0] + 0.06 * dy; zc = e[2] - 0.05 * np.maximum(dy, 0)
    rho = 0.12 + 0.18 * np.maximum(dy, 0)
    r = np.hypot(P[:, 0] - xc, P[:, 2] - zc)
    I = np.exp(-(r / rho) ** 2) * np.exp(-np.maximum(dy, 0) / 4.5) * np.clip((dy + 0.03) / 0.12, 0, 1)
    # yläpinnoille vähemmän
    I *= np.where((N[:, 2] > 0.3) & (P[:, 2] > e[2] + 0.1), 0.35, 1.0)
    return np.clip(I * 1.25, 0, 1)

def noki(o, I, siemen):
    juova = 0.55 + 0.45 * kohina(o.P, 5.0, siemen, (1.0, 0.12, 1.0))
    m = np.clip(I * juova * 1.3, 0, 1)
    o.alb = o.alb * (1 - 0.9 * m)[:, None] + NOKI * (0.9 * m)[:, None]
    o.smo *= 1 - 0.6 * m
    o.met *= 1 - 0.75 * m

# ---------------------------------------------------------------------------------------------
def maalaa_runko(g, o, tex):
    Y0 = g["Y_NOKKA"]
    d = o.a; fi_n = o.b; y = o.P[:, 1]; z = o.P[:, 2]; x = o.P[:, 0]
    vasen = x >= 0
    t = o.t
    kulma = np.pi * (1 - fi_n)   # kulma katosta
    # Paneelit
    kehat = 0.508
    kehaindeksi = np.floor((d - 4.2) / (3 * kehat))
    kaistat = np.array([0.0, 0.78, 1.58, 2.38, 3.12, 3.80, 9.0])
    kaista = np.searchsorted(kaistat, t)
    avain = (np.where(d < 0.9, -9, np.where(d < 2.0, -8, np.where(d < 4.2, -7, kehaindeksi))), kaista * 1.0, vasen * 1.0)
    paneelisavy(o, avain, 1.0)
    aluminiini_kohina(o, 11.0)
    # Pehmeä "tyynymäisyys" kehien ja pitkittäisjäykisteiden välissä.
    fy = ((d - 4.2) / kehat) % 1.0; ft = (t / 0.26) % 1.0
    o.h += 0.0010 * np.sin(np.pi * fy) * np.sin(np.pi * ft) * (d > 4.2)
    # Vatsan lika siiven takana ja nokan kuluma.
    vatsa = np.clip((-o.N[:, 2] - 0.15) / 0.5, 0, 1) * np.clip((d - 7.0) / 2.0, 0, 1) * (1 - np.clip((d - 17.0) / 1.5, 0, 1))
    juova = kohina(o.P, 3.0, 4.0, (1.0, 0.1, 1.0))
    o.alb *= (1 - 0.22 * vatsa * (0.5 + 0.5 * juova))[:, None]
    o.smo -= 0.18 * vatsa
    nokka = np.clip((0.7 - d) / 0.5, 0, 1)
    o.smo -= 0.10 * nokka

    # Punainen raita (ikkunarivin kohdalla, kaartuu nokan alle ja suippenee perään) + ohut alaraita.
    # Raita alkaa suippona nokan kärjen takaa (d 0,45): kärjessä UV venyy pituussuunnassa, eikä terävä reuna sovi sinne.
    zc = np.interp(d, [0.45, 1.5, 3.2, 4.4, 12.0, 13.2], [-0.02, 0.05, 0.22, 0.30, 0.30, 0.36])
    hw = np.interp(d, [0.45, 1.3, 3.2, 4.4, 11.6, 13.2], [0.0, 0.13, 0.24, 0.31, 0.31, 0.0])
    hw = np.where(d < 0.45, -1.0, hw)
    sd = np.abs(z - zc) - hw
    raita = peitto(sd, tex) * (d < 13.3)
    alaz = zc - hw - 0.075
    sd2 = np.abs(z - alaz) - 0.018
    ala = peitto(sd2, tex) * (hw > 0.06) * (d < 12.9)
    o.maalaa(np.clip(raita + ala, 0, 1), PUNAINEN, 0.0, 0.62)

    # Nimi yläpuolella (MATKAKIRJA) ja tunnus perässä (OH-MKJ), luettavissa kummaltakin puolelta.
    def teksti(sana, y_alku, z_pohja, korkeus, vari, smo):
        yks = korkeus / 6.0
        _, pituus = tekstin_etaisyys(np.zeros(1), np.zeros(1), sana)
        y_loppu = y_alku + pituus * yks
        alue = (y > y_alku - 0.05) & (y < y_loppu + 0.05) & (z > z_pohja - 0.05) & (z < z_pohja + korkeus + 0.05)
        if not alue.any(): return
        u = np.where(vasen, (y - y_alku) / yks, (y_loppu - y) / yks)[alue]
        v = ((z - z_pohja) / yks)[alue]
        dd, _ = tekstin_etaisyys(u, v, sana)
        m = np.zeros(len(y), np.float32); m[alue] = peitto(dd * yks, tex)
        o.maalaa(m, vari, 0.0, smo)
    teksti("MATKAKIRJA", Y0 + 5.9, 0.70, 0.19, PUNAINEN, 0.62)
    teksti("OH-MKJ", Y0 + 13.75, 0.12, 0.42, MUSTA_MAALI, 0.55)

    # Ohjaamon ikkunoiden tiivisteet ja kehykset (lasi on erillinen verkko 12 mm pinnan yllä).
    R = 1.12
    for kulmat in g["OHJAAMO_RUUDUT"]:
        k = np.array([(dd_, aa * R) for dd_, aa in kulmat])
        sdp = monikulmio_sd(d, kulma * R, k)
        tiiviste = peitto(sdp - 0.03, tex)
        o.maalaa(tiiviste, np.array([0.03, 0.03, 0.032]), 0.0, 0.45)
        o.sauma(np.abs(sdp - 0.03), 0.002, 0.0006, 0.7)
        # kehyksen niitit
        o.niitit(d + kulma * R, sdp - 0.052, 0.035)
    # Matkustamon ikkunat: tiiviste + kiillotettu kehys + niittirengas.
    L, Kk, Rr = g["IKKUNA_L"], g["IKKUNA_K"], g["IKKUNA_R"]
    for dc, zc_i in g["MATKUSTAMO_IKKUNAT"]:
        lahella = np.abs(d - dc) < 0.5
        if not lahella.any(): continue
        sdw = np.full(len(d), 9.0, np.float32)
        sdw[lahella] = pyor_suorakaide(d[lahella] - dc, z[lahella] - zc_i, L / 2, Kk / 2, Rr)
        o.maalaa(peitto(sdw - 0.028, tex), np.array([0.025, 0.025, 0.027]), 0.0, 0.5)
        kehys = peitto(np.abs(sdw - 0.045) - 0.016, tex)
        o.smo = o.smo * (1 - kehys) + 0.93 * kehys
        o.sauma(np.abs(sdw - 0.062), 0.0018, 0.0005, 0.8)
        o.niitit((d - dc) + (z - zc_i), sdw - 0.075, 0.032)
    # Ovet: vasen takaovi (matkustajat), oikea etuovi (rahti). Saumat maalin päälle.
    for dc, zc_d, pl, pk, puoli, kahva in ((13.03, -0.02, 0.43, 0.80, 1, (13.36, 0.08)),
                                           (4.70, -0.05, 0.36, 0.48, -1, (4.95, 0.0))):
        oma = (vasen if puoli > 0 else ~vasen) & (np.abs(d - dc) < 1.0)
        sdo = np.full(len(d), 9.0, np.float32)
        sdo[oma] = pyor_suorakaide(d[oma] - dc, z[oma] - zc_d, pl, pk, 0.10)
        o.sauma(np.abs(sdo), 0.0028, 0.0012, 0.35)
        o.niitit(d + z, sdo + 0.03, 0.04)
        sdk = np.full(len(d), 9.0, np.float32)
        sdk[oma] = pyor_suorakaide(d[oma] - kahva[0], z[oma] - kahva[1], 0.07, 0.025, 0.02)
        o.maalaa(peitto(sdk, tex), np.array([0.05, 0.05, 0.05]), 0.6, 0.6)
        o.h += 0.004 * peitto(sdk, tex)
    # Paneelisaumat ja niittirivit.
    kehaetaisyys = jaksoetaisyys(d, kehat, 4.2)
    rivit = (d > 2.0)
    o.niitit(t, kehaetaisyys + (d < 0.95) * 1.0, 0.034)
    o.niitit(d, jaksoetaisyys(t, 0.26, 0.0) + (~rivit) * 1.0, 0.045, 0.0005)
    poikkisaumat = np.concatenate([[0.9, 2.0, 4.2], 4.2 + 3 * kehat * np.arange(1, 10), [18.55]])
    ds = np.min(np.abs(d[:, None] - poikkisaumat[None, :]), axis=1)
    o.sauma(ds)
    o.niitit(t, ds - 0.014 + (d < 0.95) * 1.0, 0.03)
    pitkasaumat = kaistat[1:-1]
    dt = np.min(np.abs(t[:, None] - pitkasaumat[None, :]), axis=1) + (d <= 0.95) * 1.0
    o.sauma(dt, 0.002, 0.0007)
    o.niitit(d, dt - 0.012, 0.03)
    o.niitit(d, dt + 0.012, 0.03)

def maalaa_siipi(g, o, tex, laji):
    s = o.s; c = o.a; yla = o.b > 0.5
    if laji == "siipi":
        taul = np.linspace(0.3, g["SIIPI_KARKI"], 400)
        jann = np.array([g["siipi_profiili"](v, 1)[3] for v in taul])
        janne = np.interp(s, taul, jann)
        ribjako, paneelijako = 0.46, 1.38
        pitkat = [0.14, 0.30, 0.46, 0.62]
    elif laji == "vakaaja":
        taul = np.linspace(0.2, g["VAKAAJA_KARKI"], 200)
        jann = np.array([g["vakaaja_profiili"](v, 1)[3] for v in taul])
        janne = np.interp(s, taul, jann)
        ribjako, paneelijako = 0.40, 1.2
        pitkat = [0.15, 0.35]
    else:
        taul = np.linspace(0.55, 3.86, 200)
        jann = np.array([float(g["EV_TE"](v) - g["EV_LE"](v)) for v in taul])
        janne = np.interp(s, taul, jann)
        ribjako, paneelijako = 0.42, 1.26
        pitkat = [0.15, 0.40]
    cm = c * janne   # jänteen suuntainen etäisyys johtoreunasta (m)
    avain = (np.floor(s / paneelijako), np.searchsorted(np.array([0.3, 0.62]), c) * 1.0, yla * 1.0)
    paneelisavy(o, avain, 2.0 + len(laji))
    aluminiini_kohina(o, 20.0 + len(laji))
    o.h += 0.0006 * np.sin(np.pi * ((s / ribjako) % 1.0)) * np.sin(np.pi * ((cm / 0.32) % 1.0))

    if laji == "siipi":
        kangasalue = (s > 8.45) & (s < 13.75) & (c > 0.745)
        kangas(o, kangasalue * 1.0, s, 0.24, 3.0)
        o.sauma(np.where((s > 8.40) & (s < 13.80), np.abs(c - 0.745) * janne, 1.0), 0.003, 0.0015, 0.3)
        o.sauma(np.where(c > 0.74, np.minimum(np.abs(s - 8.45), np.abs(s - 13.75)), 1.0), 0.003, 0.0015, 0.3)
        # trimmilevy
        trim = (s > 9.2) & (s < 10.4) & (c > 0.915)
        o.sauma(np.where((s > 9.15) & (s < 10.45), np.abs(c - 0.915) * janne, 1.0) + (c < 0.9) * 1.0, 0.002, 0.001, 0.4)
        o.sauma(np.where(c > 0.91, np.minimum(np.abs(s - 9.2), np.abs(s - 10.4)), 1.0), 0.002, 0.001, 0.4)
        # laipat (alapinta)
        lai = (~yla) & (s > 1.05) & (s < 8.35) & (c > 0.80)
        o.sauma(np.where((~yla) & (s > 1.0) & (s < 8.4), np.abs(c - 0.80) * janne, 1.0), 0.0025, 0.0012, 0.35)
        o.sauma(np.where((~yla) & (c > 0.79), np.min(np.abs(s[:, None] - np.array([1.05, 4.9, 8.35])[None, :]), axis=1), 1.0), 0.0025, 0.0012, 0.35)
        o.niitit(s, np.where(lai, (c - 0.83) * janne, 1.0), 0.05)
        # jäänpoistokumit ulkosiivessä
        raja = np.where(yla, 0.085, 0.05)
        kumi = (s > 5.15) & (s < 13.6)
        sd = np.maximum(c * janne - raja * janne, np.maximum(5.15 - s, s - 13.6))
        mk = peitto(sd, tex)
        o.maalaa(mk, KUMI, 0.0, 0.34)
        o.h += 0.0009 * mk * (0.5 + 0.5 * np.cos(2 * np.pi * cm / 0.045))
        o.kolo *= 1 - 0.1 * mk
        # kulkutie siiven juuressa
        sdk = np.maximum(np.maximum(1.35 - s, s - 1.95), np.maximum((0.14 - c) * janne, (c - 0.52) * janne))
        mk = peitto(sdk, tex) * yla
        rae = kohina(o.P, 180.0, 9.0)
        o.maalaa(mk, np.array([0.07, 0.07, 0.068]) * (0.8 + 0.4 * rae)[:, None], 0.0, 0.2)
        o.h += 0.0006 * mk * rae
        # polttoainekorkit
        for s0, c0 in ((3.1, 0.30), (6.4, 0.27)):
            r = np.hypot(s - s0, (c - c0) * janne)
            o.sauma(np.where(yla, np.abs(r - 0.07), 1.0), 0.002, 0.001, 0.5)
            o.sauma(np.where(yla, np.abs(r - 0.05), 1.0), 0.0015, 0.0006, 0.7)
        # tarkastusluukut (alapinta)
        for s0 in (2.2, 5.6, 7.3, 10.2, 12.4):
            sdl = pyor_suorakaide(s - s0, (c - 0.45) * janne, 0.14, 0.09, 0.02)
            o.sauma(np.where(~yla, np.abs(sdl), 1.0), 0.002, 0.0008, 0.5)
            for dx in (-0.12, 0.12):
                for dy in (-0.07, 0.07):
                    ruuvi = ura(np.hypot(s - s0 - dx, (c - 0.45) * janne - dy), 0.004) * (~yla)
                    o.h -= 0.0005 * ruuvi; o.alb *= (1 - 0.3 * ruuvi)[:, None]
        # siiven liitos (keskiosa/ulkosiipi) ja kärjen sauma
        o.sauma(np.abs(s - 4.9), 0.003, 0.0014, 0.3)
        o.niitit(cm, np.abs(s - 4.9) - 0.02, 0.05, 0.0009, 0.004)
        o.sauma(np.abs(s - 13.9), 0.002, 0.0008, 0.55)
        # etureunan kuluma (ei kumia)
        kulu = np.clip((0.04 - c) / 0.04, 0, 1) * ((s < 5.15) | (s > 13.6))
        o.smo -= 0.2 * kulu * (0.6 + 0.4 * kohina(o.P, 25.0, 12.0, (0.2, 1, 1)))
        # pakokaasu ja siiven juuren lika
        noki(o, pakokaasu(g, o.P, o.N), 31.0)
        juuri = np.clip((1.9 - s) / 0.8, 0, 1) * yla
        o.alb *= (1 - 0.12 * juuri)[:, None]; o.smo -= 0.12 * juuri
        # moottorigondolin takana yläpinnassa lämpövärjäys
    elif laji == "vakaaja":
        kangasalue = (s > 0.40) & (c > 0.60)
        kangas(o, kangasalue * 1.0, s, 0.22, 5.0)
        o.sauma(np.where(s > 0.35, np.abs(c - 0.60) * janne, 1.0), 0.003, 0.0015, 0.3)
        o.sauma(np.where(c > 0.59, np.abs(s - 0.40), 1.0), 0.003, 0.0015, 0.3)
        o.sauma(np.where((s > 0.5) & (s < 1.8), np.abs(c - 0.90) * janne, 1.0) + (c < 0.88) * 1.0, 0.002, 0.001, 0.4)
        o.sauma(np.where(c > 0.9, np.minimum(np.abs(s - 0.55), np.abs(s - 1.75)), 1.0), 0.002, 0.001, 0.4)
        raja = np.where(yla, 0.075, 0.055)
        sd = np.maximum(c * janne - raja * janne, np.maximum(0.8 - s, s - 3.85))
        mk = peitto(sd, tex)
        o.maalaa(mk, KUMI, 0.0, 0.34)
        o.h += 0.0008 * mk * (0.5 + 0.5 * np.cos(2 * np.pi * cm / 0.04))
    else:  # sivuvakaaja ja peräsin
        y = o.P[:, 1]; z = o.P[:, 2]
        perasin = (y > 8.55) & (z > 0.58)
        kangas(o, perasin * 1.0, z, 0.24, 7.0)
        o.sauma(np.where(z > 0.55, np.abs(y - 8.55), 1.0), 0.003, 0.0015, 0.3)
        trim = np.where((z > 0.95) & (z < 2.15), np.abs(y - 9.55), 1.0)
        o.sauma(trim, 0.002, 0.001, 0.4)
        o.sauma(np.where(y > 9.5, np.minimum(np.abs(z - 1.0), np.abs(z - 2.1)), 1.0), 0.002, 0.001, 0.4)
        sd = np.maximum(c * janne - 0.07 * janne, np.maximum(1.75 - s, s - 3.62))
        mk = peitto(sd, tex)
        o.maalaa(mk, KUMI, 0.0, 0.34)
        o.h += 0.0008 * mk * (0.5 + 0.5 * np.cos(2 * np.pi * cm / 0.04))
        o.sauma(np.where(z < 1.6, np.minimum(np.abs(y - 6.2), np.abs(y - 7.3)), 1.0), 0.002, 0.0008, 0.55)
    # yhteiset: kylkiluiden niittirivit ja pitkittäiset rivit, paneelisaumat
    runko_osa = ~((laji == "siipi") & (s > 8.45) & (s < 13.75) & (c > 0.745))
    o.niitit(o.t, jaksoetaisyys(s, ribjako, 0.0) + (~runko_osa) * 1.0, 0.036)
    for cc in pitkat:
        o.niitit(s, (c - cc) * janne, 0.04, 0.0005)
    o.sauma(np.abs(jaksoetaisyys(s, paneelijako, 0.0)) + (c > 0.74) * 1.0, 0.002, 0.0007, 0.6)
    for cc in (0.30, 0.62):
        o.sauma(np.abs(c - cc) * janne, 0.002, 0.0007, 0.6)

def maalaa_moottori(g, o, tex):
    MX, MY0, MZ = g["MX"], g["MY0"], g["MZ"]
    dn = o.a; b = o.b
    r = np.hypot(o.P[:, 0] - MX, o.P[:, 2] - MZ)
    radial = np.stack([o.P[:, 0] - MX, np.zeros_like(r), o.P[:, 2] - MZ], 1) / np.maximum(r, 1e-6)[:, None]
    sisa = (dn > 0.012) & (r < 0.535) & (np.sum(o.N * radial, 1) < 0.2)
    suojus = dn < 1.265
    avain = (np.where(suojus, 0, np.floor((dn - 1.45) / 1.2) + 1), np.floor(b * 4 + 0.5) % 4, np.zeros_like(dn))
    paneelisavy(o, avain, 4.0, 0.78, 0.9)
    aluminiini_kohina(o, 40.0)
    o.smo = np.where(suojus & ~sisa, 0.90 + 0.03 * (o.smo - 0.78) / 0.12, o.smo)
    o.alb = np.where(suojus[:, None] & ~sisa[:, None], o.alb * 1.04, o.alb)
    o.maalaa(sisa * 1.0, np.array([0.10, 0.10, 0.105]), 0.7, 0.4)
    # suojuksen saumat ja Dzus-kiinnikkeet
    o.sauma(np.where(~sisa, np.abs(dn - 0.30), 1.0), 0.0025, 0.001, 0.45)
    o.niitit(o.t, np.where(~sisa, dn - 0.335, 1.0), 0.11, 0.0008, 0.006)
    jako = np.minimum(np.abs(b - 0.25), np.abs(b - 0.75)) * 4.5
    o.sauma(np.where(suojus & ~sisa & (dn > 0.3), jako, 1.0), 0.0025, 0.001, 0.45)
    o.niitit(dn, np.where(suojus & (dn > 0.3), jako - 0.02, 1.0), 0.12, 0.0008, 0.006)
    # jäähdytysläpät
    lappa = (dn > 1.27) & (dn < 1.45)
    lj = jaksoetaisyys(b, 1 / 18.0) * 4.3
    o.sauma(np.where(lappa, np.abs(lj), 1.0), 0.003, 0.0015, 0.3)
    o.alb *= (1 - 0.18 * lappa)[:, None]; o.smo -= 0.15 * lappa
    # gondolin niitit ja saumat
    taka = dn > 1.45
    o.sauma(np.where(dn > 1.3, np.min(np.abs(dn[:, None] - np.array([1.45, 2.45, 3.6, 4.8])[None, :]), 1), 1.0))
    o.niitit(o.t, np.where(taka, jaksoetaisyys(dn, 0.42, 1.45), 1.0), 0.036)
    o.niitit(dn, np.where(taka, np.min(np.abs(b[:, None] - np.array([0.125, 0.375, 0.625, 0.875])[None, :]), 1) * 4.5, 1.0), 0.04)
    o.sauma(np.where(taka, jako, 1.0), 0.002, 0.0007, 0.6)
    # lämpövärjäys jäähdytysläppien takana
    lampo = np.clip(1 - np.abs(dn - 1.75) / 0.45, 0, 1) * taka * (0.6 + 0.4 * kohina(o.P, 6.0, 41.0))
    o.alb *= (1 - lampo[:, None] * np.array([0.02, 0.07, 0.16]))
    o.smo -= 0.1 * lampo
    # pyöräkuilu alapinnassa
    yc = g["PYORA_Y"] - MY0
    sdw = np.hypot((dn - yc) / 0.70, (b - 0.5) * 4.5 / 0.26) - 1.0
    kuilu = peitto(sdw * 0.25, tex)
    o.maalaa(kuilu, np.array([0.03, 0.028, 0.026]), 0.2, 0.2)
    o.kolo *= 1 - 0.7 * kuilu
    # öljyvanat pohjassa
    oljy = np.clip(1 - np.abs(b - 0.5) / 0.12, 0, 1) * np.clip((dn - 1.4) / 0.3, 0, 1) * np.exp(-np.maximum(dn - 1.4, 0) / 2.5)
    oljy *= 0.4 + 0.6 * kohina(o.P, 7.0, 44.0, (1.0, 0.1, 1.0))
    o.alb = o.alb * (1 - 0.6 * oljy)[:, None] + OLJY * (0.6 * oljy)[:, None]
    o.smo = o.smo * (1 - 0.3 * oljy) + 0.7 * 0.3 * oljy
    # Pakokaasuvana gondolin kylkeä pitkin (putki 122° katosta = b 0,34, suu dn ≈ 1,73).
    dy = dn - 1.73
    vana = np.exp(-((b - (0.345 + 0.008 * dy)) / (0.022 + 0.02 * np.maximum(dy, 0))) ** 2)
    vana *= np.exp(-np.maximum(dy, 0) / 4.5) * np.clip((dy + 0.03) / 0.1, 0, 1)
    noki(o, np.maximum(pakokaasu(g, o.P, o.N), vana) * (~sisa), 45.0)
    # huulen kuluma
    huuli = np.clip(1 - np.abs(dn - 0.0) / 0.05, 0, 1)
    o.smo -= 0.15 * huuli

def maalaa_pienet(g, o, tex, tunnus):
    T = g
    if tunnus == T["MOOTTORIETU"]:
        dn = o.P[:, 1] - g["MY0"]
        kupu = dn < 0.33
        o.maalaa(np.ones(len(dn)), np.array([0.075, 0.08, 0.085]), 0.25, 0.45)
        o.maalaa(kupu * 1.0, np.array([0.30, 0.31, 0.32]), 0.7, 0.55)
        o.sauma(np.where(kupu, np.abs(dn - 0.10), 1.0), 0.003, 0.001, 0.5)
    elif tunnus == T["SYLINTERI"]:
        a = o.a
        rivat = 0.5 + 0.5 * np.cos(2 * np.pi * a / 0.011)
        pää = a > 0.40
        o.maalaa(np.ones(len(a)), np.array([0.02, 0.02, 0.022]), 0.5, 0.35)
        o.maalaa(pää * 1.0, np.array([0.28, 0.28, 0.29]), 0.8, 0.45)
        o.h += 0.0016 * rivat * (a < 0.44)
        o.kolo *= 1 - 0.35 * rivat
    elif tunnus == T["PAKOPUTKI"]:
        sisa = o.a > 1.0
        ruoste = fbm(o.P, 30.0, 51.0, 2)
        o.maalaa(np.ones(len(o.a)), np.array([0.13, 0.075, 0.05]) * (0.7 + 0.6 * ruoste)[:, None], 0.45, 0.25)
        o.maalaa(sisa * 1.0, np.array([0.015, 0.013, 0.012]), 0.2, 0.1)
    elif tunnus == T["IMUAUKKO"]:
        o.smo[:] = 0.9
        o.maalaa((o.a < -0.5) * 1.0, np.array([0.01, 0.01, 0.01]), 0.0, 0.1)
    elif tunnus == T["NAPA"]:
        o.smo[:] = 0.9
        o.alb *= 1.03
        o.sauma(np.abs(o.s - 0.30), 0.003, 0.001, 0.5)
    elif tunnus == T["LAPA"]:
        a = o.a; eteen = o.b > 0.5
        o.maalaa(np.ones(len(a)), np.array([0.70, 0.71, 0.72]), 1.0, 0.62)
        o.maalaa((~eteen) * 1.0, np.array([0.025, 0.025, 0.025]), 0.0, 0.3)
        karki = peitto((0.925 - a) * 1.75, tex)
        o.maalaa(karki, KELTAINEN, 0.0, 0.5)
        varsi = a < 0.21
        o.maalaa(varsi * 1.0, np.array([0.78, 0.78, 0.79]), 1.0, 0.85)
        o.smo -= 0.12 * kohina(o.P, 40.0, 61.0, (1, 1, 0.1))
    elif tunnus == T["RENGAS"]:
        b = o.b
        o.maalaa(np.ones(len(b)), KUMI * 1.2, 0.0, 0.32)
        bb = np.minimum(b, 1 - b)
        uurteet = ura(np.minimum(np.abs(bb - 0.0), np.abs(bb - 0.07)), 0.006)
        o.h -= 0.002 * uurteet * (bb < 0.12)
        o.smo += 0.08 * (bb > 0.18)
    elif tunnus == T["VANNE"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.35, 0.35, 0.36]), 0.8, 0.5)
    elif tunnus == T["SISUS"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.03, 0.038, 0.034]), 0.0, 0.18)
    elif tunnus == T["ANTENNI"]:
        o.smo[:] = 0.7
    elif tunnus == T["VALO_PUN"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.55, 0.02, 0.02]), 0.0, 0.95)
    elif tunnus == T["VALO_VIH"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.02, 0.40, 0.06]), 0.0, 0.95)
    elif tunnus == T["VALO_VAL"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.85, 0.85, 0.82]), 0.0, 0.95)
    elif tunnus == T["TUKI"]:
        o.maalaa(np.ones(len(o.s)), np.array([0.30, 0.30, 0.31]), 0.8, 0.5)

def sumenna(x, r):
    """Erotuva laatikkosumennus (2D), säde r pikseliä."""
    for akseli in (0, 1):
        c = np.cumsum(np.pad(x, [(r + 1, r) if a == akseli else (0, 0) for a in range(2)], mode="edge"), axis=akseli)
        if akseli == 0: x = (c[2 * r + 1:] - c[:-2 * r - 1]) / (2 * r + 1)
        else: x = (c[:, 2 * r + 1:] - c[:, :-2 * r - 1]) / (2 * r + 1)
    return x

def maalaa(g, M):
    K = g["KOKO"]
    tex = 1.0 / g["TIHEYS"]
    tunnus = np.rint(M["A"][..., 2]).astype(np.int32).reshape(-1)
    for k in ("A", "B", "C", "D"): M[k] = M[k].reshape(-1, 3)
    alb = np.tile(np.array([0.5, 0.5, 0.5], np.float32), (K * K, 1))
    met = np.zeros(K * K, np.float32); smo = np.full(K * K, 0.5, np.float32)
    h = np.zeros(K * K, np.float32); kolo = np.ones(K * K, np.float32)
    nimet = {v: k for k, v in g.items() if isinstance(v, int) and k.isupper() and 1 <= v <= 19 and k in (
        "RUNKO", "SIIPI", "VAKAAJA", "SIVUVAKAAJA", "MOOTTORI", "MOOTTORIETU", "PAKOPUTKI", "NAPA", "LAPA", "RENGAS",
        "VANNE", "SISUS", "ANTENNI", "VALO_PUN", "VALO_VIH", "VALO_VAL", "SYLINTERI", "IMUAUKKO", "TUKI")}
    for tid in sorted(nimet):
        i = np.nonzero(tunnus == tid)[0]
        if len(i) == 0: continue
        o = Osa(M, i)
        n = nimet[tid]
        if n == "RUNKO": maalaa_runko(g, o, tex)
        elif n == "SIIPI": maalaa_siipi(g, o, tex, "siipi")
        elif n == "VAKAAJA": maalaa_siipi(g, o, tex, "vakaaja")
        elif n == "SIVUVAKAAJA": maalaa_siipi(g, o, tex, "sivu")
        elif n == "MOOTTORI": maalaa_moottori(g, o, tex)
        else: maalaa_pienet(g, o, tex, tid)
        alb[i] = o.alb; met[i] = o.met; smo[i] = o.smo; h[i] = o.h; kolo[i] = o.kolo
        loki("maalattu %-12s %8d tekseliä" % (n, len(i)))
    # Peittävyys: leivottu AO (sumennettu), potkureille 1, saumojen kolot päälle.
    ao = M["AO"].copy()
    ao = sumenna(ao, 2)
    ao = ao.reshape(-1)
    potkuri = (tunnus == g["NAPA"]) | (tunnus == g["LAPA"]) | (tunnus < 1) | (tunnus > 19)
    ao[potkuri] = 1.0
    ao = np.clip(ao, 0.0, 1.0) * kolo
    alb *= (0.62 + 0.38 * ao)[:, None]
    # Normaalikartta korkeuskentästä.
    H2 = h.reshape(K, K).astype(np.float64)
    voimakkuus = 1.6
    dx = (np.roll(H2, -1, 1) - np.roll(H2, 1, 1)) / (2 * tex) * voimakkuus
    dy = (np.roll(H2, -1, 0) - np.roll(H2, 1, 0)) / (2 * tex) * voimakkuus
    nx, ny = -dx, -dy
    nz = np.ones_like(nx)
    L = np.sqrt(nx * nx + ny * ny + nz * nz)
    normaali = np.stack([nx / L, ny / L, nz / L], -1) * 0.5 + 0.5
    # Tallennusmuodot (rivi 0 = V=0 → PNG:ssä käännetään).
    vari = srgb(alb.reshape(K, K, 3))
    maski = np.stack([np.clip(met, 0, 1).reshape(K, K), ao.reshape(K, K), np.zeros((K, K)), np.clip(smo, 0, 1).reshape(K, K)], -1)
    return vari, normaali, maski

def aja(g):
    K = g["KOKO"]
    # Leivonnan välimuisti (vain kehitykseen): DC3_VALIMUISTI=kansio; avain = geometriaosan tiiviste.
    kansio_v = os.environ.get("DC3_VALIMUISTI")
    M = None
    if kansio_v:
        import hashlib
        lahde = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "dc3_hd.py")).read()
        avain = hashlib.sha1((lahde.split("# Esikatselu (EEVEE)")[0] + str(K)).encode()).hexdigest()[:12]
        polku_v = os.path.join(kansio_v, "leivonta-" + avain)
        if os.path.exists(polku_v + "-AO.npy"):
            M = {k: np.load(polku_v + "-%s.npy" % k) for k in ("A", "B", "C", "D", "AO")}
            loki("leivonta välimuistista", polku_v)
    if M is None:
        M = leivo(g)
        if kansio_v:
            os.makedirs(kansio_v, exist_ok=True)
            for k, v in M.items(): np.save(polku_v + "-%s.npy" % k, v.astype(np.float32))
    vari, normaali, maski = maalaa(g, M)
    kansio = g["TEKSTUURIT"]
    polut = {}
    for nimi, arr in (("DC3_vari.png", vari), ("DC3_normaali.png", normaali), ("DC3_maski.png", maski)):
        u8 = np.clip(np.rint(arr[::-1] * 255), 0, 255).astype(np.uint8)
        polku = os.path.join(kansio, nimi)
        koko = kirjoita_png(polku, u8)
        polut[nimi] = polku
        loki("tallennettu %s (%.1f Mt)" % (polku, koko / 1e6))
    return polut
