# Matkakirja: maamerkkien yhteinen kirjasto (oma työ, CC0). Kutsutaan maamerkit.py:stä Blenderin sisällä.
#
# Koordinaatit: KARTTAKEHYS = X itä, Y pohjoinen, Z ylös, metreinä; origo = rakennelman jalka maan
# tasossa kaupunkipisteen kohdalla. Vienti kääntää mallin 180° pystyakselin ympäri, jotta
# FBX-asetuksilla (Forward -Z, Up Y, Apply Transform; sama kuin DC-3) Unityssä +X = itä, +Z = pohjoinen.
#
# Putki: 1) geometria Verkko-luokalla (tahoilla osa-tunnus ja kulmakohtainen param), 2) UV-atlas
# (smart_project → average_islands_scale → osakohtainen painotus → pack_islands), 3) leivonta Cyclesillä
# CPU:lla: sijainti, normaali, osa, param (EMIT) ja peittävyys (AO), 4) maalaus numpylla kaupungin
# maalaa(g)-funktiolla, AO kerrotaan albedoon, 5) esikatselu Cyclesillä CPU:lla, 6) FBX-vienti.
import bpy, bmesh, math, os, sys, time, zlib, struct
import numpy as np
from mathutils import Vector, Matrix

T0 = time.time()
def loki(*a): print("[maamerkit %6.1f s]" % (time.time() - T0), *a, flush=True)

# ---------------------------------------------------------------------------------------------
# Alustus: VAIN CPU (Cycles Metal kaatoi Blender 5.2.1:n taustatilassa 24.9.2026 ja avasi ikkunan).
def alusta(saikeet=8):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    try:
        bpy.context.preferences.addons['cycles'].preferences.compute_device_type = 'NONE'
    except Exception as e:
        loki("cycles-asetus ohitettu:", e)
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = max(1, min(8, saikeet))
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    return scene

def hexa(h):
    """'#rrggbb' → lineaarinen RGB (numpy)."""
    r, g, b = (int(h[i:i + 2], 16) / 255.0 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return np.array([f(r), f(g), f(b)], np.float32)

# ---------------------------------------------------------------------------------------------
# Verkonrakentaja
class Verkko:
    """Kärjet, tahot, tahon osa-tunnus (maalaukselle) ja kulmakohtainen param (esim. kellotaulun
    koordinaatit, pylvään kulma). Jokainen primitiivi tekee omat kärkensä; tahon kiertosuunta
    korjataan ulos-vektorin mukaan, joten normaalit osoittavat aina ulospäin."""

    def __init__(self, nimi):
        self.nimi = nimi
        self.v = []; self.f = []; self.osa = []; self.par = []; self.smooth = []

    def piste(self, p):
        self.v.append((float(p[0]), float(p[1]), float(p[2]))); return len(self.v) - 1

    def normaali(self, idx):
        P = np.array([self.v[i] for i in idx]); n = np.zeros(3)
        for k in range(len(idx)):
            n += np.cross(P[k], P[(k + 1) % len(idx)])   # Newellin menetelmä
        return n

    def keskipiste(self, idx):
        return np.mean([self.v[i] for i in idx], axis=0)

    def taho(self, idx, osa, par=None, smooth=False, ulos=None):
        idx = list(idx)
        par = list(par) if par is not None else [(0.0, 0.0)] * len(idx)
        if ulos is not None and np.dot(self.normaali(idx), ulos) < 0:
            idx = idx[::-1]; par = par[::-1]
        self.f.append(idx); self.osa.append(int(osa)); self.par.append(par); self.smooth.append(bool(smooth))

    @property
    def tila(self):
        return (len(self.v), len(self.f))

    def muunna(self, alku, M):
        """Muuntaa kohdasta alku = self.tila lähtien tehdyt kärjet 4×4-matriisilla (numpy)."""
        M = np.asarray(M, float)
        for i in range(alku[0], len(self.v)):
            p = M @ np.array([*self.v[i], 1.0]); self.v[i] = tuple(p[:3])
        if np.linalg.det(M[:3, :3]) < 0:
            for k in range(alku[1], len(self.f)):
                self.f[k] = self.f[k][::-1]; self.par[k] = self.par[k][::-1]

    def monista(self, alku, M):
        """Kopioi kohdasta alku lähtien tehdyt kärjet ja tahot muunnettuna (peilaus kääntää tahot)."""
        v0, f0 = alku; v1, f1 = self.tila
        M = np.asarray(M, float)
        siirto = len(self.v) - v0
        for i in range(v0, v1):
            p = M @ np.array([*self.v[i], 1.0]); self.v.append(tuple(p[:3]))
        kaanna = np.linalg.det(M[:3, :3]) < 0
        for k in range(f0, f1):
            idx = [i + siirto for i in self.f[k]]; par = list(self.par[k])
            if kaanna: idx = idx[::-1]; par = par[::-1]
            self.f.append(idx); self.osa.append(self.osa[k]); self.par.append(par); self.smooth.append(self.smooth[k])

    # ---- Primitiivit ----
    def prisma(self, pohja, z0, z1, osa, yla=True, ala=False, osa_yla=None, osa_ala=None, smooth=False,
               par_kulma=False, z1_pohja=None):
        """Pystysuora prisma monikulmion (x, y) päälle z0..z1. z1_pohja = yläreunan oma monikulmio
        (sama pistemäärä; kartiomainen prisma). Toimii myös koverille monikulmioille."""
        pohja = [(float(x), float(y)) for x, y in pohja]
        ylapohja = [(float(x), float(y)) for x, y in (z1_pohja or pohja)]
        n = len(pohja)
        ala_i = [self.piste((x, y, z0)) for x, y in pohja]
        yla_i = [self.piste((x, y, z1)) for x, y in ylapohja]
        ala_ = sum(pohja[j][0] * pohja[(j + 1) % n][1] - pohja[(j + 1) % n][0] * pohja[j][1] for j in range(n))
        s = 1.0 if ala_ > 0 else -1.0   # vastapäivään: ulkonormaali (dy, -dx)
        for j in range(n):
            j1 = (j + 1) % n
            (x0, y0), (x1, y1) = pohja[j], pohja[j1]
            ulos = np.array([(y1 - y0) * s, -(x1 - x0) * s, 0.0])
            par = [(j / n, 0.0), (j / n, 1.0), ((j + 1) / n, 1.0), ((j + 1) / n, 0.0)] if par_kulma else None
            self.taho([ala_i[j], yla_i[j], yla_i[j1], ala_i[j1]], osa, par, smooth, ulos)
        if yla: self.taho(yla_i, osa if osa_yla is None else osa_yla, None, False, (0, 0, 1))
        if ala: self.taho(ala_i, osa if osa_ala is None else osa_ala, None, False, (0, 0, -1))
        return ala_i, yla_i

    def laatikko(self, x0, y0, z0, x1, y1, z1, osa, yla=True, ala=False, osa_yla=None):
        return self.prisma([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], z0, z1, osa, yla, ala, osa_yla)

    def lierio(self, cx, cy, z0, z1, r0, r1, n, osa, kulma0=0.0, yla=True, ala=False, smooth=True, osa_yla=None):
        """Monikulmiolieriö tai katkaistu kartio; param a = kulman osuus (pylvään uurteet)."""
        p0 = [(cx + r0 * math.cos(kulma0 + 2 * math.pi * j / n), cy + r0 * math.sin(kulma0 + 2 * math.pi * j / n)) for j in range(n)]
        p1 = [(cx + r1 * math.cos(kulma0 + 2 * math.pi * j / n), cy + r1 * math.sin(kulma0 + 2 * math.pi * j / n)) for j in range(n)]
        return self.prisma(p0, z0, z1, osa, yla, ala, osa_yla, None, smooth, True, p1)

    def pyramidi(self, pohja, z0, huippu, osa, ala=False, smooth=False):
        """Monikulmio z0:ssa ja huippu (x, y, z). Kupera pohja."""
        pohja = [(float(x), float(y)) for x, y in pohja]
        n = len(pohja)
        idx = [self.piste((x, y, z0)) for x, y in pohja]
        h = self.piste(huippu)
        c = np.array([np.mean([p[0] for p in pohja]), np.mean([p[1] for p in pohja]), z0])
        for j in range(n):
            j1 = (j + 1) % n
            fc = self.keskipiste([idx[j], idx[j1], h])
            ulos = fc - c; ulos[2] = max(ulos[2], 0.0) * 0.1
            self.taho([idx[j], idx[j1], h], osa, [(j / n, 0.0), ((j + 1) / n, 0.0), ((j + 0.5) / n, 1.0)], smooth, ulos)
        if ala: self.taho(idx, osa, None, False, (0, 0, -1))
        return idx, h

    def harja(self, x0, y0, x1, y1, z0, z1, osa, pitkin='x', paadyt=True, osa_paaty=None):
        """Harjakatto (kolmioprisma) suorakaiteen päälle: harja pitkin x- tai y-akselia."""
        if pitkin == 'x':
            ym = (y0 + y1) / 2
            a = [self.piste(p) for p in ((x0, y0, z0), (x0, y1, z0), (x0, ym, z1))]
            b = [self.piste(p) for p in ((x1, y0, z0), (x1, y1, z0), (x1, ym, z1))]
            self.taho([a[0], b[0], b[2], a[2]], osa, None, False, (0, -1, 0.3))
            self.taho([a[1], a[2], b[2], b[1]], osa, None, False, (0, 1, 0.3))
            if paadyt:
                self.taho(a, osa if osa_paaty is None else osa_paaty, None, False, (-1, 0, 0))
                self.taho(b, osa if osa_paaty is None else osa_paaty, None, False, (1, 0, 0))
        else:
            xm = (x0 + x1) / 2
            a = [self.piste(p) for p in ((x0, y0, z0), (x1, y0, z0), (xm, y0, z1))]
            b = [self.piste(p) for p in ((x0, y1, z0), (x1, y1, z0), (xm, y1, z1))]
            self.taho([a[0], a[2], b[2], b[0]], osa, None, False, (-1, 0, 0.3))
            self.taho([a[1], b[1], b[2], a[2]], osa, None, False, (1, 0, 0.3))
            if paadyt:
                self.taho(a, osa if osa_paaty is None else osa_paaty, None, False, (0, -1, 0))
                self.taho(b, osa if osa_paaty is None else osa_paaty, None, False, (0, 1, 0))

    def kiekko(self, keski, normaali, sade, syvyys, n, osa, osa_reuna=None):
        """Ohut kiekko (kellotaulu): etupinnan param = taulun koordinaatit (-1..1). Ei takapintaa."""
        nn = np.asarray(normaali, float); nn /= np.linalg.norm(nn)
        apu = np.array([0, 0, 1.0]) if abs(nn[2]) < 0.9 else np.array([1.0, 0, 0])
        e1 = np.cross(apu, nn); e1 /= np.linalg.norm(e1)   # taulun "oikea" katsojalle
        e2 = np.cross(nn, e1)                               # taulun "ylös"
        k = np.asarray(keski, float)
        takana = [self.piste(k + (e1 * math.cos(2 * math.pi * j / n) + e2 * math.sin(2 * math.pi * j / n)) * sade) for j in range(n)]
        edessa = [self.piste(k + nn * syvyys + (e1 * math.cos(2 * math.pi * j / n) + e2 * math.sin(2 * math.pi * j / n)) * sade) for j in range(n)]
        for j in range(n):
            j1 = (j + 1) % n
            ulos = (e1 * math.cos(2 * math.pi * (j + 0.5) / n) + e2 * math.sin(2 * math.pi * (j + 0.5) / n))
            self.taho([takana[j], takana[j1], edessa[j1], edessa[j]], osa if osa_reuna is None else osa_reuna, None, False, ulos)
        par = [(math.cos(2 * math.pi * j / n), math.sin(2 * math.pi * j / n)) for j in range(n)]
        self.taho(edessa, osa, par, False, nn)

    def palkki(self, polku, leveys, korkeus, osa, smooth=False):
        """Suorakaideputki 3D-polkua pitkin (ketjut, ripustimet). Poikkileikkaus: leveys y-suunnassa
        polun tason normaalin mukaan, korkeus polun tasossa. Päätyjä ei suljeta."""
        P = np.asarray(polku, float); m = len(P)
        renkaat = []
        for i in range(m):
            t = (P[min(i + 1, m - 1)] - P[max(i - 1, 0)]); t /= np.linalg.norm(t)
            sivu = np.cross(t, np.array([0, 0, 1.0]))
            if np.linalg.norm(sivu) < 1e-6: sivu = np.array([0, 1.0, 0])
            sivu /= np.linalg.norm(sivu)
            yl = np.cross(sivu, t); yl /= np.linalg.norm(yl)
            renkaat.append([self.piste(P[i] + sivu * sx * leveys / 2 + yl * sy * korkeus / 2)
                            for sx, sy in ((1, 1), (-1, 1), (-1, -1), (1, -1))])
        for i in range(m - 1):
            for j in range(4):
                j1 = (j + 1) % 4
                idx = [renkaat[i][j], renkaat[i + 1][j], renkaat[i + 1][j1], renkaat[i][j1]]
                c = (P[i] + P[i + 1]) / 2
                self.taho(idx, osa, None, smooth, self.keskipiste(idx) - c)

    # ---- Blender-olioksi ----
    def olio(self, scene, mat):
        me = bpy.data.meshes.new(self.nimi)
        me.from_pydata(self.v, [], [tuple(f) for f in self.f])
        uv_osa, uv_par = [], []
        for osa, par, f in zip(self.osa, self.par, self.f):
            for a, b in par:
                uv_osa.append((osa, 0.0)); uv_par.append((a, b))
        for nimi, data in (("UVMap", [(0.0, 0.0)] * len(uv_osa)), ("tunnus", uv_osa), ("param", uv_par)):
            uv = me.uv_layers.new(name=nimi)
            uv.data.foreach_set("uv", np.asarray(data, np.float32).ravel())
        me.uv_layers.active = me.uv_layers["UVMap"]
        me.uv_layers["UVMap"].active_render = True
        me.polygons.foreach_set("use_smooth", np.asarray(self.smooth, bool))
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.triangulate(bm, faces=bm.faces[:], quad_method='BEAUTY', ngon_method='BEAUTY')
        bm.to_mesh(me); bm.free()
        me.update()
        o = bpy.data.objects.new(self.nimi, me)
        scene.collection.objects.link(o)
        me.materials.append(mat)
        return o

# ---------------------------------------------------------------------------------------------
# UV-atlas
def _osat_silmukoittain(me):
    t = np.zeros(len(me.loops) * 2, np.float32); me.uv_layers["tunnus"].data.foreach_get("uv", t)
    return np.rint(t.reshape(-1, 2)[:, 0]).astype(int)

def uv_atlas(scene, o, painot, marginaali=0.006):
    """painot: {osa: pinta-alan paino} (1 = tavallinen, < 1 = harvempi, esim. maan alla olevat reunat)."""
    for x in scene.objects: x.select_set(False)
    o.select_set(True); bpy.context.view_layer.objects.active = o
    me = o.data
    me.uv_layers.active = me.uv_layers["UVMap"]
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(55), island_margin=0.0, area_weight=0.0,
                             correct_aspect=True, scale_to_bounds=False)
    bpy.ops.uv.select_all(action='SELECT')
    bpy.ops.uv.average_islands_scale()
    bpy.ops.object.mode_set(mode='OBJECT')
    # Osakohtainen tekselitiheys: saman saaren tahoilla on sama osa (saaret eivät ylitä primitiivejä),
    # ja eri kertoimen saaret irtoavat toisistaan, jolloin pakkaus käsittelee ne erikseen.
    osat = _osat_silmukoittain(me)
    uv = np.zeros(len(me.loops) * 2, np.float32); me.uv_layers["UVMap"].data.foreach_get("uv", uv)
    uv = uv.reshape(-1, 2)
    kerroin = np.array([math.sqrt(painot.get(int(k), 1.0)) for k in osat], np.float32)
    uv *= kerroin[:, None]
    me.uv_layers["UVMap"].data.foreach_set("uv", uv.ravel())
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.select_all(action='SELECT')
    try:
        bpy.ops.uv.pack_islands(udim_source='CLOSEST_UDIM', rotate=True, rotate_method='CARDINAL', scale=True,
                                merge_overlap=False, margin_method='FRACTION', margin=marginaali, pin=False,
                                shape_method='CONCAVE')
    except TypeError as e:
        loki("pack_islands oletusasetuksin:", e)
        bpy.ops.uv.pack_islands(rotate=True, margin=marginaali)
    bpy.ops.object.mode_set(mode='OBJECT')

def tekselitiheys(o, K):
    """Mediaani tekseliä/metri atlaksessa (tahoittain: sqrt(UV-ala / pinta-ala))."""
    me = o.data
    uv = np.zeros(len(me.loops) * 2, np.float32); me.uv_layers["UVMap"].data.foreach_get("uv", uv); uv = uv.reshape(-1, 2)
    osat = _osat_silmukoittain(me)
    tulos = {}
    for p in me.polygons:
        if p.area < 1e-4 or p.loop_total != 3: continue
        a, b, c = (uv[p.loop_start + i] for i in range(3))
        uva = abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2
        tulos.setdefault(int(osat[p.loop_start]), []).append(math.sqrt(uva / p.area) * K)
    return {k: float(np.median(v)) for k, v in tulos.items()}

# ---------------------------------------------------------------------------------------------
# Leivonta (EMIT-kierrokset + AO), kuten DC-3:n dc3_maalaus.leivo
def _kuva(nimi, K):
    img = bpy.data.images.new(nimi, K, K, alpha=True, float_buffer=True)
    img.colorspace_settings.name = 'Non-Color'
    return img

def _numpy(img, K):
    arr = np.empty(K * K * 4, np.float32); img.pixels.foreach_get(arr)
    return arr.reshape(K, K, 4)

def leivo(scene, o, K, ao_etaisyys=10.0, ao_naytteet=32):
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 1
    scene.cycles.use_denoising = False
    if scene.world is None: scene.world = bpy.data.worlds.new("Leivontamaailma")
    scene.world.light_settings.distance = ao_etaisyys

    mat = bpy.data.materials.new("Leivonta"); mat.use_nodes = True
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs["Strength"].default_value = 1.0
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    kuvasolmu = nt.nodes.new('ShaderNodeTexImage'); nt.nodes.active = kuvasolmu
    uvt = nt.nodes.new('ShaderNodeUVMap'); uvt.uv_map = "tunnus"
    uvp = nt.nodes.new('ShaderNodeUVMap'); uvp.uv_map = "param"
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    st = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uvt.outputs["UV"], st.inputs[0])
    sp = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uvp.outputs["UV"], sp.inputs[0])
    yhd = nt.nodes.new('ShaderNodeCombineXYZ')    # (osa, param a, param b)
    nt.links.new(st.outputs["X"], yhd.inputs["X"]); nt.links.new(sp.outputs["X"], yhd.inputs["Y"]); nt.links.new(sp.outputs["Y"], yhd.inputs["Z"])
    muunnos = nt.nodes.new('ShaderNodeVectorMath'); muunnos.operation = 'MULTIPLY_ADD'
    nt.links.new(muunnos.outputs[0], em.inputs["Color"])

    alkup = o.data.materials[0]
    o.data.materials[0] = mat
    for x in scene.objects: x.select_set(False)
    o.select_set(True); bpy.context.view_layer.objects.active = o

    valmiit = {}
    for nimi, lahto, kerroin, siirto in (("P", geo.outputs["Position"], 0.001, 0.5), ("N", geo.outputs["Normal"], 0.5, 0.5),
                                         ("T", yhd.outputs[0], 0.01, 0.5)):
        img = _kuva("leivonta_" + nimi, K); kuvasolmu.image = img
        for l in list(muunnos.inputs[0].links): nt.links.remove(l)
        nt.links.new(lahto, muunnos.inputs[0])
        muunnos.inputs[1].default_value = (kerroin,) * 3
        muunnos.inputs[2].default_value = (siirto,) * 3
        bpy.ops.object.bake(type='EMIT', margin=8, margin_type='EXTEND', use_clear=True, target='IMAGE_TEXTURES')
        arr = _numpy(img, K)
        valmiit[nimi] = (arr[..., :3] - siirto) / kerroin
        if nimi == "P": valmiit["kattavuus"] = arr[..., 3] > 0.5
        bpy.data.images.remove(img)
        loki("leivottu", nimi)
    img = _kuva("leivonta_AO", K); kuvasolmu.image = img
    scene.cycles.samples = ao_naytteet
    bpy.ops.object.bake(type='AO', margin=8, margin_type='EXTEND', use_clear=True, target='IMAGE_TEXTURES')
    valmiit["AO"] = _numpy(img, K)[..., 0].copy()
    bpy.data.images.remove(img)
    scene.cycles.samples = 1
    o.data.materials[0] = alkup
    bpy.data.materials.remove(mat)
    loki("leivottu AO (%d näytettä, etäisyys %.0f m)" % (ao_naytteet, ao_etaisyys))
    N = valmiit["N"]; N /= np.maximum(np.linalg.norm(N, axis=-1, keepdims=True), 1e-6)
    T = valmiit.pop("T")
    valmiit["OSA"] = np.rint(T[..., 0]).astype(int)
    valmiit["PAR"] = T[..., 1:3]
    return valmiit

# ---------------------------------------------------------------------------------------------
# Maalausapuja (kaikki taulukot (K, K) tai (K, K, 3))
def _hash(ix, iy, iz, siemen):
    h = np.sin(ix * 127.1 + iy * 311.7 + iz * 74.7 + siemen * 19.19) * 43758.5453
    return h - np.floor(h)

def kohina(P, taaj, siemen=0.0, venytys=(1.0, 1.0, 1.0)):
    """Arvokohina 0..1 (kolmilineaarinen), P (..., 3) metreinä."""
    q = P * (np.asarray(venytys) * taaj)
    i = np.floor(q); f = q - i
    f = f * f * (3 - 2 * f)
    tulos = 0.0
    for dx in (0, 1):
        wx = f[..., 0] if dx else 1 - f[..., 0]
        for dy in (0, 1):
            wy = f[..., 1] if dy else 1 - f[..., 1]
            for dz in (0, 1):
                wz = f[..., 2] if dz else 1 - f[..., 2]
                tulos = tulos + wx * wy * wz * _hash(i[..., 0] + dx, i[..., 1] + dy, i[..., 2] + dz, siemen)
    return tulos

def fbm(P, taaj, siemen=0.0, oktaavit=3, venytys=(1.0, 1.0, 1.0)):
    s = 0.0; a = 0.5; w = 0.0
    for k in range(oktaavit):
        s = s + a * kohina(P, taaj * 2 ** k, siemen + k * 7.3, venytys); w += a; a *= 0.5
    return s / w

def viiva(d, leveys):
    """Pehmeä viiva: 1 viivan kohdalla, 0 kaukana (d = etäisyys, leveys = puolileveys)."""
    return np.clip(1.0 - np.abs(d) / max(leveys, 1e-6), 0.0, 1.0)

def jakso(x, jako, alku=0.0):
    """Etäisyys lähimpään viivaan joukosta alku + k*jako."""
    q = (x - alku) / jako
    return (q - np.round(q)) * jako

def peitto(sd, pehmeys):
    """Peitto merkitystä etäisyydestä (negatiivinen = sisällä)."""
    return np.clip(0.5 - sd / max(pehmeys, 1e-6), 0.0, 1.0)

def sekoita(vari, maski, uusi):
    """vari (K,K,3) ← uusi (3,) tai (K,K,3) maskin (K,K) verran."""
    m = maski[..., None]
    return vari * (1 - m) + np.asarray(uusi, np.float32) * m

def pinta_u(P, N, keski):
    """Pystypinnan vaakakoordinaatti (m) keskiakselin (x, y) suhteen: u kasvaa oikealle katsottaessa pintaa."""
    t = np.stack([-N[..., 1], N[..., 0]], axis=-1)
    tl = np.maximum(np.linalg.norm(t, axis=-1, keepdims=True), 1e-6)
    t = t / tl
    return (P[..., 0] - keski[0]) * t[..., 0] + (P[..., 1] - keski[1]) * t[..., 1]

def kaari_ikkuna(u, z, u0, z0, leveys, korkeus):
    """Suippokaari-ikkunan merkitty etäisyys (negatiivinen sisällä): suorakaide + suippokaari yläosassa."""
    du = np.abs(u - u0); r = leveys / 2
    # suippokaari: kahden ympyrän leikkaus, säde R = 1.6 r, keskipisteet ±(R − r) keskiviivasta
    R = r * 1.6
    zk = z0 + korkeus - math.sqrt(R * R - (R - r) ** 2)
    sd_suora = np.maximum(du - r, np.maximum(z0 - z, z - zk))
    sd_kaari = np.maximum(np.hypot(du + (R - r), z - zk) - R, zk - z)
    return np.minimum(sd_suora, sd_kaari)

# ---------------------------------------------------------------------------------------------
# PNG (oma kirjoitin, kuten DC-3: värit eivät kulje Blenderin värinhallinnan läpi)
def kirjoita_png(polku, kuva, srgb_merkki=True):
    """kuva: uint8 (H, W, C), rivi 0 = ylin rivi."""
    H, W, C = kuva.shape
    x = kuva.astype(np.int16)
    a = np.zeros_like(x); a[:, 1:] = x[:, :-1]
    b = np.zeros_like(x); b[1:] = x[:-1]
    c = np.zeros_like(x); c[1:, 1:] = x[:-1, :-1]
    p = a + b - c
    pa, pb, pc = np.abs(p - a), np.abs(p - b), np.abs(p - c)
    paeth = np.where((pa <= pb) & (pa <= pc), a, np.where(pb <= pc, b, c))
    parhaat = None
    for tyyppi, f in ((0, x), (1, x - a), (2, x - b), (4, x - paeth)):
        f8 = (f & 0xFF).astype(np.uint8)
        hinta = np.abs(f8.astype(np.int8).astype(np.int32)).sum(axis=(1, 2))
        if parhaat is None:
            parhaat = f8.copy(); tyypit = np.full(H, tyyppi, np.uint8); pienin = hinta
        else:
            v = hinta < pienin
            parhaat[v] = f8[v]; tyypit[v] = tyyppi; pienin = np.minimum(pienin, hinta)
    raaka = np.concatenate([tyypit[:, None], parhaat.reshape(H, W * C)], axis=1).tobytes()
    def pala(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    with open(polku, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(pala(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, {1: 0, 2: 4, 3: 2, 4: 6}[C], 0, 0, 0)))
        if srgb_merkki and C >= 3: f.write(pala(b"sRGB", b"\x00"))
        f.write(pala(b"IDAT", zlib.compress(raaka, 9)))
        f.write(pala(b"IEND", b""))
    return os.path.getsize(polku)

def srgb(lin):
    lin = np.clip(lin, 0.0, 1.0)
    return np.where(lin <= 0.0031308, lin * 12.92, 1.055 * np.power(lin, 1 / 2.4) - 0.055)

def tallenna_albedo(polku, albedo_lin, AO, kattavuus, ao_voima=0.6):
    """Albedo × AO (leivottu albedoon), peittämätön alue täytetään keskivärillä (mipmapit)."""
    ao = np.clip(AO, 0, 1) ** 0.8
    vari = albedo_lin * ((1 - ao_voima) + ao_voima * ao)[..., None]
    if kattavuus.any():
        vari[~kattavuus] = vari[kattavuus].mean(axis=0)
    u8 = np.clip(np.rint(srgb(vari)[::-1] * 255), 0, 255).astype(np.uint8)
    koko = kirjoita_png(polku, u8)
    loki("tallennettu %s (%.2f Mt)" % (polku, koko / 1e6))
    return polku

# ---------------------------------------------------------------------------------------------
# Esikatselu: Cycles CPU, pieni näytemäärä (EEVEE ja Workbench vaativat GPU-kontekstin).
def esikatselu(scene, o, albedo_polku, kansio, etuliite, nakymat, maan_vari="#d9cba5", naytteet=24):
    os.makedirs(kansio, exist_ok=True)
    mat = o.data.materials[0]
    mat.use_nodes = True
    nt = mat.node_tree
    b = nt.nodes.get("Principled BSDF")
    img = bpy.data.images.load(albedo_polku); img.colorspace_settings.name = 'sRGB'
    tx = nt.nodes.new("ShaderNodeTexImage"); tx.image = img; tx.interpolation = 'Linear'
    uvn = nt.nodes.new("ShaderNodeUVMap"); uvn.uv_map = "UVMap"
    nt.links.new(uvn.outputs["UV"], tx.inputs["Vector"]); nt.links.new(tx.outputs["Color"], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = 0.85
    mat.use_backface_culling = True   # kuten Unityssä: väärin päin olevat tahot näkyisivät reikinä

    # Karttamainen maa (ei vientiin) ja taivas
    me = bpy.data.meshes.new("Maa"); s = 20000.0
    me.from_pydata([(-s, -s, -0.3), (s, -s, -0.3), (s, s, -0.3), (-s, s, -0.3)], [], [(0, 1, 2, 3)])
    maa = bpy.data.objects.new("Maa", me); scene.collection.objects.link(maa)
    mm = bpy.data.materials.new("Maa"); mm.use_nodes = True
    mm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*hexa(maan_vari), 1.0)
    mm.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 1.0
    me.materials.append(mm)
    w = bpy.data.worlds.new("Taivas"); w.use_nodes = True
    bg = w.node_tree.nodes["Background"]; bg.inputs[0].default_value = (0.55, 0.66, 0.82, 1); bg.inputs[1].default_value = 0.9
    scene.world = w
    valo = bpy.data.objects.new("Aurinko", bpy.data.lights.new("Aurinko", 'SUN'))
    valo.data.energy = 3.2; valo.data.angle = math.radians(2.0)
    valo.rotation_euler = (math.radians(48), 0, math.radians(-35))
    scene.collection.objects.link(valo)
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = naytteet
    scene.cycles.use_denoising = True
    try: scene.cycles.denoiser = 'OPENIMAGEDENOISE'
    except Exception: pass
    scene.view_settings.view_transform = 'Standard'
    scene.render.image_settings.file_format = 'PNG'
    scene.render.film_transparent = False
    kam = bpy.data.objects.new("Kamera", bpy.data.cameras.new("Kamera")); scene.collection.objects.link(kam)
    kam.data.clip_start = 1.0; kam.data.clip_end = 100000.0
    scene.camera = kam
    polut = []
    for nimi, sij, kohde, mm_, (lev, kor) in nakymat:
        kam.location = Vector(sij)
        kam.rotation_euler = (Vector(kohde) - kam.location).to_track_quat('-Z', 'Y').to_euler()
        kam.data.lens = mm_
        scene.render.resolution_x, scene.render.resolution_y = lev, kor
        scene.render.resolution_percentage = 100
        scene.render.filepath = os.path.join(kansio, "%s-%s.png" % (etuliite, nimi))
        bpy.ops.render.render(write_still=True)
        polut.append(scene.render.filepath)
        loki("esikatselu:", scene.render.filepath)
    bpy.data.objects.remove(maa); bpy.data.objects.remove(valo); bpy.data.objects.remove(kam)
    nt.nodes.remove(tx); nt.nodes.remove(uvn)
    return polut

# ---------------------------------------------------------------------------------------------
# Vienti
def vie_glb(scene, o, albedo_polku, polku):
    """Sisältöpaketin GLB (Pelikoodari 24.9.2026; natiivin GlbLukija): kopio mallista ilman apukanavia, yksi
    materiaali, jonka baseColorTexture on upotettu atlas (PNG). EI kääntöä: glTF-vienti +Y ylös antaa
    karttakehyksestä (+X itä, +Y pohjoinen, +Z ylös) glTF-kehyksen (+X itä, +Y ylös, −Z pohjoinen), ja
    GlbLukija peilaa z:n → Unity +X itä, +Y ylös, +Z pohjoinen (sama kuin vie_fbx:n FBX). Ajetaan ennen
    vie_fbx:ää, koska se muuttaa verkkoa ja poistaa muut oliot. Palauttaa (tavuja, sha256)."""
    import hashlib
    kopio = o.copy(); kopio.data = o.data.copy(); kopio.name = o.name + "_glb"
    scene.collection.objects.link(kopio)
    for nimi in ("tunnus", "param"):
        uv = kopio.data.uv_layers.get(nimi)
        if uv: kopio.data.uv_layers.remove(uv)
    m = bpy.data.materials.new(o.name + "_glb"); m.use_nodes = True
    nt = m.node_tree
    bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    bsdf.inputs["Roughness"].default_value = 0.9
    bsdf.inputs["Metallic"].default_value = 0.0
    tx = nt.nodes.new("ShaderNodeTexImage")
    tx.image = bpy.data.images.load(albedo_polku); tx.image.colorspace_settings.name = 'sRGB'
    nt.links.new(tx.outputs["Color"], bsdf.inputs["Base Color"])
    kopio.data.materials.clear(); kopio.data.materials.append(m)
    for x in scene.objects: x.select_set(False)
    kopio.select_set(True)
    bpy.context.view_layer.objects.active = kopio
    bpy.ops.export_scene.gltf(filepath=polku, export_format='GLB', use_selection=True, export_yup=True,
                              export_apply=False, export_texcoords=True, export_normals=True,
                              export_tangents=False, export_materials='EXPORT', export_image_format='AUTO',
                              export_animations=False, export_extras=False, export_cameras=False, export_lights=False)
    bpy.data.objects.remove(kopio)
    data = open(polku, "rb").read()
    sha = hashlib.sha256(data).hexdigest()
    loki("vienti:", polku, "(%.2f Mt, sha256 %s)" % (len(data) / 1e6, sha))
    return len(data), sha

def vie_fbx(scene, o, polku):
    """Kääntää mallin 180° pystyakselin ympäri (karttakehys → Unity: +X itä, +Z pohjoinen) ja vie FBX:n
    ilman ylimääräisiä UV-kanavia ja tekstuuriviitteitä."""
    o.data.transform(Matrix.Rotation(math.pi, 4, 'Z'))
    for nimi in ("tunnus", "param"):
        uv = o.data.uv_layers.get(nimi)
        if uv: o.data.uv_layers.remove(uv)
    for x in list(scene.objects):
        if x is not o: bpy.data.objects.remove(x)
    for x in scene.objects: x.select_set(False)
    o.select_set(True)
    bpy.ops.export_scene.fbx(filepath=polku, use_selection=True, apply_scale_options='FBX_SCALE_UNITS',
                             axis_forward='-Z', axis_up='Y', bake_space_transform=True,
                             object_types={'MESH'}, mesh_smooth_type='FACE', add_leaf_bones=False,
                             path_mode='STRIP', embed_textures=False, use_tspace=False, use_mesh_modifiers=False)
    loki("vienti:", polku, "(%.2f Mt)" % (os.path.getsize(polku) / 1e6))
