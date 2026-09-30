# ISS-KYTKINPÖYTÄ 3D-MALLINA (Linnanrakentaja 30.9.2026, Päätoimittajan erä, omistaja: "oikean avaruusmoduulin näköinen,
# umpinainen, koko alareunan kattava, paneelin muotoinen, omat valonlähteet"). Linssiseppä kytkee Unityssä
# (DioraamaGlb.Lue, Resources Linssit/Resources/IssPaneeli/iss-paneeli.glb).
#
# SOPIMUS (Linssiseppä 30.9.): yksi glb, 1 yksikkö = 1 pt, glTF +X oikealle, +Y ylös, +Z katsojaa kohti (paneelin etupinta
# z = 0, takapinta z = −16). Blenderissä pt (x, y, z) = (x, −z, y). Solmut ilman hierarkiaa, origo = pivot:
#   paneeli_vasen (x −24…0), paneeli_keski (x 0…1, venytetään X:ssä), paneeli_oikea (x 0…24); y 0…168 (128 pt kytkimiin
#   + 40 pt turvaväli), jakolevy_1…5, kierto_runko/_nuppi (48, akseli Z, osoitin +Y), nuppi_runko/_korkki (48),
#   painike_runko/_kansi/_legenda (46×40, painuu −Z 3), vipu_runko/_varsi (pivot varren juuressa, X ±35°)/_suojakansi
#   (sarana yläreunassa, X 0→110°), merkkivalo_runko/_lasi (Ø16), lukema_kehys_vasen/_keski/_oikea + lukema_lasi (30 korkea,
#   keski ja lasi 1 pt, venytetään).
# Materiaalit nimillä: anodisoitu, maali_harmaa, maali_punainen, kumi, lasi, metalli_kirkas, legenda, valo.
# COLOR_0: R = leivottu AO, G = B = 0, A = 1. Ei UV:itä eikä tekstuureja. Kolmiot < 15 000.
# Lähteet (NASA, PD): docs/raportit/iss-paneeli-lahteet-20260930.md.
#
# Geometria; renderöinti kerroksiksi: iss_paneeli_render.py (Päätoimittaja 30.9.: kuvakerrokset, ei elävää 3D:tä).
import math
import bmesh
import bpy
from mathutils import Matrix, Vector

SC = bpy.context.scene

# ---------------------------------------------------------------- materiaalit (baseColor lineaarinen)
# Pintarae: (kuopan voima, kohinan mittakaava 1/pt, [venytys x, y, z Blenderissä])
RAE = {'maali_harmaa': (0.18, 1.6), 'anodisoitu': (0.12, 0.8, (0.08, 1, 6)), 'maali_punainen': (0.12, 1.6),
       'kumi': (0.25, 2.5), 'metalli_kirkas': (0.05, 0.6, (0.1, 1, 8))}
MAT = {}
def materiaali(nimi, vari, metalli, karheus, emissio=None, voima=0.0):
    m = bpy.data.materials.new(nimi)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*vari, 1)
    b.inputs['Metallic'].default_value = metalli
    b.inputs['Roughness'].default_value = karheus
    if emissio:
        b.inputs['Emission Color'].default_value = (*emissio, 1)
        b.inputs['Emission Strength'].default_value = voima
    # Cycles-renderöintiin: pyöristetyt reunat (Bevel-solmu antaa terävillekin särmille valokorostuksen) ja hieno
    # pintarae (maalin jauhemaali / anodisoinnin harjaus) kohinakuoppana.
    nt = m.node_tree
    bev = nt.nodes.new('ShaderNodeBevel')
    bev.samples = 8
    bev.inputs['Radius'].default_value = 0.45
    kuoppa = nt.nodes.new('ShaderNodeBump')
    kuoppa.inputs['Strength'].default_value = RAE.get(nimi, (0.0, 1.0))[0]
    kuoppa.inputs['Distance'].default_value = 0.05
    tk = nt.nodes.new('ShaderNodeTexCoord')
    kartta = nt.nodes.new('ShaderNodeMapping')
    kartta.inputs['Scale'].default_value = RAE.get(nimi, (0.0, 1.0, (1, 1, 1)))[2] if len(RAE.get(nimi, ())) > 2 else (1, 1, 1)
    kohina = nt.nodes.new('ShaderNodeTexNoise')
    kohina.inputs['Scale'].default_value = RAE.get(nimi, (0.0, 1.0))[1]
    kohina.inputs['Detail'].default_value = 6
    nt.links.new(tk.outputs['Object'], kartta.inputs['Vector'])
    nt.links.new(kartta.outputs['Vector'], kohina.inputs['Vector'])
    nt.links.new(kohina.outputs['Fac'], kuoppa.inputs['Height'])
    nt.links.new(bev.outputs['Normal'], kuoppa.inputs['Normal'])
    nt.links.new(kuoppa.outputs['Normal'], b.inputs['Normal'])
    MAT[nimi] = m


materiaali('anodisoitu', (0.045, 0.047, 0.05), 0.85, 0.42)
materiaali('maali_harmaa', (0.04, 0.042, 0.045), 0.0, 0.62)
materiaali('maali_punainen', (0.42, 0.025, 0.02), 0.0, 0.4)
materiaali('kumi', (0.018, 0.018, 0.02), 0.0, 0.85)
materiaali('lasi', (0.02, 0.025, 0.022), 0.0, 0.08)
materiaali('metalli_kirkas', (0.75, 0.74, 0.72), 1.0, 0.28)
materiaali('legenda', (0.9, 0.88, 0.8), 0.0, 0.5, (1.0, 0.93, 0.78), 3.0)
materiaali('valo', (0.03, 0.07, 0.04), 0.0, 0.12)
MNIMET = list(MAT)


def B(x, y, z):
    """pt (x, y ylös, z ulos) → Blender (x, −z, y)."""
    return Vector((x, -z, y))


class Solmu:
    """Yksi glb-solmu: bmesh, johon primitiivit lisätään paikallisissa pt-koordinaateissa (origo = pivot)."""

    def __init__(self, nimi):
        self.nimi = nimi
        self.bm = bmesh.new()

    def _merkitse(self, uudet, mat):
        i = MNIMET.index(mat)
        for f in uudet:
            f.material_index = i

    def _viiste(self, kasvot, leveys, osat, mat):
        if leveys <= 0:
            return
        reunat = list({e for f in kasvot for e in f.edges})
        r = bmesh.ops.bevel(self.bm, geom=reunat, offset=leveys, segments=osat, affect='EDGES', profile=0.5,
                            clamp_overlap=True)
        self._merkitse(r['faces'], mat)

    def laatikko(self, x0, x1, y0, y1, z0, z1, mat, viiste=0.0, osat=2):
        r = bmesh.ops.create_cube(self.bm, size=1.0)
        v = r['verts']
        m = Matrix.Translation(B((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)) @ Matrix.Diagonal(
            (x1 - x0, z1 - z0, y1 - y0, 1))
        bmesh.ops.transform(self.bm, matrix=m, verts=v)
        kasvot = list({f for q in v for f in q.link_faces})
        self._merkitse(kasvot, mat)
        self._viiste(kasvot, min(viiste, (x1 - x0) / 2.01, (y1 - y0) / 2.01, (z1 - z0) / 2.01), osat, mat)

    def sylinteri(self, x, y, z0, z1, r1, mat, r2=None, n=32, viiste=0.0, osat=2, kulma=0.0, akseli='z'):
        """Sylinteri/kartio akselilla z (ulos) tai x; r2 = yläpään säde."""
        r = bmesh.ops.create_cone(self.bm, cap_ends=True, cap_tris=False, segments=n, radius1=r1,
                                  radius2=r1 if r2 is None else r2, depth=z1 - z0)
        v = r['verts']
        if akseli == 'z':   # Blender Z → −Y (pt +z), keskikohta
            m = Matrix.Translation(B(x, y, (z0 + z1) / 2)) @ Matrix.Rotation(math.radians(90), 4, 'X') @ \
                Matrix.Rotation(kulma, 4, 'Z')
        else:               # akseli pt x: Blender Z → X; tässä z0/z1 = x-alue, (x, y) = (pt y, pt z)
            m = Matrix.Translation(B((z0 + z1) / 2, x, y)) @ Matrix.Rotation(math.radians(90), 4, 'Y')
        bmesh.ops.transform(self.bm, matrix=m, verts=v)
        kasvot = list({f for q in v for f in q.link_faces})
        self._merkitse(kasvot, mat)
        if viiste > 0:
            reunat = [e for e in {e for f in kasvot for e in f.edges} if len(e.link_faces) == 2 and
                      e.calc_face_angle(0) > 0.6]
            rr = bmesh.ops.bevel(self.bm, geom=reunat, offset=viiste, segments=osat, affect='EDGES', profile=0.5,
                                 clamp_overlap=True)
            self._merkitse(rr['faces'], mat)

    def profiili(self, pisteet, x0, x1, mat, matit=None, paadyt=True):
        """Profiili [(y, z)] pursotettuna x0…x1:een (keski venyy: vain X-suuntaiset reunat)."""
        a = [self.bm.verts.new(B(x0, y, z)) for y, z in pisteet]
        b = [self.bm.verts.new(B(x1, y, z)) for y, z in pisteet]
        for i in range(len(pisteet) - 1):
            f = self.bm.faces.new((a[i], a[i + 1], b[i + 1], b[i]))
            f.material_index = MNIMET.index((matit or {}).get(i, mat))
        if paadyt:
            for rivi in (a, b[::-1]):
                f = self.bm.faces.new(rivi[::-1] if rivi is a else rivi)
                f.material_index = MNIMET.index(mat)
        return a, b

    def valmis(self, sijainti=(0, 0, 0), skaala=(1, 1, 1)):
        bmesh.ops.recalc_face_normals(self.bm, faces=self.bm.faces)
        me = bpy.data.meshes.new(self.nimi)
        self.bm.to_mesh(me)
        self.bm.free()
        for n in MNIMET:
            me.materials.append(MAT[n])
        for p in me.polygons:
            p.use_smooth = False
        ob = bpy.data.objects.new(self.nimi, me)
        SC.collection.objects.link(ob)
        ob.location = B(*sijainti)
        ob.scale = (skaala[0], skaala[2], skaala[1])
        return ob


def ruuvi(s, x, y, z=0.0, r=2.6):
    """Kiinnitysruuvi: upotettu aluslaatta + ristiurainen kanta."""
    s.sylinteri(x, y, z - 0.4, z + 0.25, r + 1.0, 'anodisoitu', n=16, viiste=0.2, osat=1)
    s.sylinteri(x, y, z + 0.25, z + 1.3, r, 'metalli_kirkas', r2=r * 0.85, n=16, viiste=0.25, osat=1)
    s.laatikko(x - r * 0.75, x + r * 0.75, y - 0.35, y + 0.35, z + 1.25, z + 1.4, 'kumi')
    s.laatikko(x - 0.35, x + 0.35, y - r * 0.75, y + r * 0.75, z + 1.25, z + 1.4, 'kumi')


# ---------------------------------------------------------------- pohja: profiili (y, z), alhaalta ylös
PROF = [(0, -16), (0, -4.5), (1, -3), (38, -3), (39.5, -5), (42.5, -5), (44, -1.5), (45.5, 0), (158.5, 0), (160, -1.5),
        (161, -1.5), (163, -0.6), (165.5, -1.2), (168, -5), (168, -16)]
PROF_MAT = {3: 'anodisoitu', 4: 'anodisoitu', 5: 'anodisoitu', 9: 'anodisoitu', 10: 'anodisoitu', 11: 'anodisoitu'}
PAATY = 24.0


def paaty(nimi, suunta):
    """Päätykappale: profiili 20 pt + 4 pt viiste sivulle, kädensija, ruuvit. suunta −1 = vasen (x −24…0)."""
    s = Solmu(nimi)
    sisa, ulko = 0.0, suunta * (PAATY - 4)
    a, b = s.profiili(PROF, min(sisa, ulko), max(sisa, ulko), 'maali_harmaa', PROF_MAT, paadyt=False)
    reuna = b if suunta > 0 else a
    sisareuna = a if suunta > 0 else b
    xr = suunta * PAATY
    viiste = [s.bm.verts.new(B(xr, y, max(z - 3.5, -16) if 0 < y < 168 else z)) for y, z in PROF]
    for i in range(len(PROF) - 1):
        q = (reuna[i], reuna[i + 1], viiste[i + 1], viiste[i])
        f = s.bm.faces.new(q if suunta > 0 else q[::-1])
        f.material_index = MNIMET.index('maali_harmaa')
    f = s.bm.faces.new(viiste if suunta > 0 else viiste[::-1])
    f.material_index = MNIMET.index('maali_harmaa')
    f = s.bm.faces.new(sisareuna[::-1] if suunta > 0 else sisareuna)
    f.material_index = MNIMET.index('maali_harmaa')
    xc = suunta * 11
    for y in (24, 150):
        ruuvi(s, xc, y)
    # Kädensija (ISS-laitteiden U-kahva): jalat + vaakaputki pystyssä
    for y in (66, 124):
        s.sylinteri(xc, y, 0, 1.2, 5.2, 'anodisoitu', n=16, viiste=0.4, osat=1)
        s.sylinteri(xc, y, 1.2, 9.5, 2.6, 'anodisoitu', n=12, viiste=0.8, osat=2)
    s.sylinteri(66, 9.5, xc - 2.8, xc + 2.8, 2.9, 'anodisoitu', akseli='x', n=12)   # nivel alhaalla (koristus)
    s.sylinteri(124, 9.5, xc - 2.8, xc + 2.8, 2.9, 'anodisoitu', akseli='x', n=12)
    s.laatikko(xc - 2.4, xc + 2.4, 66, 124, 7.4, 11.6, 'anodisoitu', viiste=1.6, osat=3)
    return s


def keski():
    s = Solmu('paneeli_keski')
    s.profiili(PROF, 0.0, 1.0, 'maali_harmaa', PROF_MAT, paadyt=False)
    return s


def jakolevy(nimi):
    s = Solmu(nimi)
    s.laatikko(-1.8, 1.8, -34, 34, 0, 1.2, 'anodisoitu', viiste=0.5, osat=1)
    for y in (-28, 28):
        ruuvi(s, 0, y, 1.2, r=1.5)
    return s


# ---------------------------------------------------------------- kytkimet (origo = pivot paneelin pinnassa)
def kierto():
    r = Solmu('kierto_runko')
    r.laatikko(-22, 22, -22, 22, 0, 1.6, 'anodisoitu', viiste=3.5, osat=3)
    r.sylinteri(0, 0, 1.6, 2.4, 15.5, 'metalli_kirkas', n=32, viiste=0.3, osat=1)
    for k in (-60, -20, 20, 60):   # asentojen merkit (LIVE 10× 100× 1000×)
        a = math.radians(k)
        x, y = 18.5 * math.sin(a), 18.5 * math.cos(a)
        r.sylinteri(x, y, 1.6, 2.0, 1.1, 'legenda', n=8)
    for x, y in ((-18, -18), (18, -18), (18, 18), (-18, 18)):
        ruuvi(r, x, y, 1.6, r=1.4)
    n = Solmu('kierto_nuppi')
    n.sylinteri(0, 0, 2.4, 5.5, 13.0, 'kumi', r2=12.2, n=32, viiste=0.6, osat=2)
    n.laatikko(-4.5, 4.5, -12.5, 12.5, 5.5, 15.5, 'kumi', viiste=2.2, osat=3)
    n.laatikko(-0.8, 0.8, 3, 11.5, 15.45, 15.75, 'legenda')         # osoitinviiva +Y
    return r, n


def nuppi():
    r = Solmu('nuppi_runko')
    r.sylinteri(0, 0, 0, 1.4, 21, 'anodisoitu', n=40, viiste=0.8, osat=2)
    for i in range(11):   # asteikko −135…135
        a = math.radians(-135 + 27 * i)
        L = 3.0 if i % 5 == 0 else 1.8
        rr = 18.2
        cx, cy = rr * math.sin(a), rr * math.cos(a)
        s = Solmu('_tmp')
        s.laatikko(-0.45, 0.45, -L / 2, L / 2, 1.4, 1.7, 'legenda')
        bmesh.ops.transform(s.bm, matrix=Matrix.Translation(B(cx, cy, 0)) @ Matrix.Rotation(-a, 4, 'Y'),
                            verts=s.bm.verts)
        me = bpy.data.meshes.new('_t'); s.bm.to_mesh(me); s.bm.free()
        r.bm.from_mesh(me); bpy.data.meshes.remove(me)
    k = Solmu('nuppi_korkki')
    k.sylinteri(0, 0, 1.4, 3.2, 13.5, 'metalli_kirkas', r2=13.0, n=36, viiste=0.4, osat=1)   # hame
    k.sylinteri(0, 0, 3.2, 12.0, 11.2, 'kumi', r2=10.6, n=36, viiste=1.2, osat=2)
    for i in range(18):   # tartuntaurat
        a = 2 * math.pi * i / 18
        s = Solmu('_tmp')
        s.laatikko(-0.9, 0.9, -0.9, 0.9, 3.6, 11.2, 'kumi', viiste=0.4, osat=1)
        bmesh.ops.transform(s.bm, matrix=Matrix.Translation(B(11.3 * math.sin(a), 11.3 * math.cos(a), 0)) @
                            Matrix.Rotation(-a, 4, 'Y'), verts=s.bm.verts)
        me = bpy.data.meshes.new('_t'); s.bm.to_mesh(me); s.bm.free()
        k.bm.from_mesh(me); bpy.data.meshes.remove(me)
    k.sylinteri(0, 0, 11.9, 12.3, 7.5, 'metalli_kirkas', n=32, viiste=0.15, osat=1)
    k.laatikko(-0.7, 0.7, 3.5, 10.2, 12.0, 12.45, 'legenda')          # osoitin +Y
    return r, k


def painike():
    r = Solmu('painike_runko')
    r.laatikko(-23, 23, -20, 20, -1.0, 0.6, 'anodisoitu', viiste=2.5, osat=3)          # laippa
    for x0, x1, y0, y1 in ((-20, 20, 15, 18), (-20, 20, -18, -15), (-20, -17, -15, 15), (17, 20, -15, 15)):
        r.laatikko(x0, x1, y0, y1, 0.6, 4.5, 'metalli_kirkas', viiste=0.7, osat=2)       # kehys
    r.laatikko(-17, 17, -15, 15, -3.0, -2.6, 'kumi')                                    # kuilun pohja
    k = Solmu('painike_kansi')
    k.laatikko(-16.2, 16.2, -14.2, 14.2, -2.6, 6.0, 'lasi', viiste=1.4, osat=3)
    l = Solmu('painike_legenda')
    l.laatikko(-13.5, 13.5, -11, 11, 5.98, 6.08, 'legenda')
    return r, k, l


def vipu():
    r = Solmu('vipu_runko')
    r.laatikko(-19, 19, -21, 21, 0, 1.5, 'anodisoitu', viiste=2.5, osat=3)
    r.sylinteri(0, -4, 1.5, 5.0, 5.2, 'metalli_kirkas', n=6, viiste=0.4, osat=1, kulma=math.radians(30))   # mutteri
    r.sylinteri(0, -4, 5.0, 6.2, 3.4, 'metalli_kirkas', n=16, viiste=0.3, osat=1)
    for x in (-12.5, 12.5):   # saranan korvakkeet
        r.laatikko(x - 1.4, x + 1.4, 11, 17, 1.5, 5.2, 'anodisoitu', viiste=0.6, osat=1)
    r.sylinteri(14, 3.4, -14, 14, 1.2, 'metalli_kirkas', akseli='x', n=10)            # saranatappi
    for x, y in ((-15, -17), (15, -17)):
        ruuvi(r, x, y, 1.5, r=1.4)
    v = Solmu('vipu_varsi')   # origo varren juuressa (0, −4, 6.2 kytkimen koordinaatistossa)
    v.sylinteri(0, 0, 0, 12.0, 1.5, 'metalli_kirkas', r2=2.1, n=14, viiste=0.2, osat=1)
    v.sylinteri(0, 0, 11.6, 13.6, 2.3, 'metalli_kirkas', r2=1.4, n=14, viiste=0.5, osat=2)
    c = Solmu('vipu_suojakansi')   # origo saranassa (0, 14, 3.4); kansi kytkimen päällä
    kx, y0, y1, zt = 11.0, -20.5 - 14, 1.5 - 14, 15.5 - 3.4
    c.laatikko(-kx, kx, y0, y1 + 2, zt - 1.6, zt, 'maali_punainen', viiste=0.9, osat=2)                 # kansi
    for x in (-kx, kx - 1.6):
        c.laatikko(x, x + 1.6, y0, y1 + 2, -2.2, zt - 1.2, 'maali_punainen', viiste=0.6, osat=1)        # sivut
    c.laatikko(-kx, kx, y0, y0 + 1.6, -2.2, zt - 1.2, 'maali_punainen', viiste=0.6, osat=1)             # alareuna
    c.sylinteri(0, 0, -kx + 1.8, kx - 1.8, 2.0, 'maali_punainen', akseli='x', n=12)                       # saranaputki
    c.laatikko(-6, 6, y0 - 2.5, y0 + 1, zt - 2.5, zt - 1.0, 'maali_punainen', viiste=0.7, osat=2)       # nostolippa
    return r, v, c


def merkkivalo():
    r = Solmu('merkkivalo_runko')
    r.sylinteri(0, 0, 0, 1.0, 8.0, 'anodisoitu', n=24, viiste=0.35, osat=1)
    r.sylinteri(0, 0, 1.0, 3.2, 7.4, 'metalli_kirkas', r2=6.9, n=24, viiste=0.5, osat=2)
    l = Solmu('merkkivalo_lasi')
    l.sylinteri(0, 0, 2.6, 4.8, 5.6, 'valo', r2=5.0, n=24, viiste=1.4, osat=3)
    return r, l


LK, LR = 30.0, 5.0   # lukeman korkeus ja kehyksen leveys (y 0…30, origo alareunan tasolla keskellä: y −15…15)


def lukema():
    prof = [(-15, -16 + 16), (-15, 1.2), (-14.2, 2.2), (-10.6, 2.2), (-10, 0.4), (-10, -2.4)]
    def kehys_osa(s, x0, x1):
        for merkki in (1, -1):
            pts = [(merkki * y, z) for y, z in prof]
            a, b = s.profiili(pts, x0, x1, 'anodisoitu', {3: 'anodisoitu', 4: 'kumi'}, paadyt=False)
    kv = Solmu('lukema_kehys_vasen')
    kv.laatikko(-8, -3, -15, 15, 0, 2.2, 'anodisoitu', viiste=0.8, osat=2)
    kehys_osa(kv, -3, 0)
    kv.laatikko(-3, 0, -10, 10, -2.6, -2.4, 'lasi')
    kk = Solmu('lukema_kehys_keski')
    kehys_osa(kk, 0, 1)
    ko = Solmu('lukema_kehys_oikea')
    ko.laatikko(3, 8, -15, 15, 0, 2.2, 'anodisoitu', viiste=0.8, osat=2)
    kehys_osa(ko, 0, 3)
    ko.laatikko(0, 3, -10, 10, -2.6, -2.4, 'lasi')
    la = Solmu('lukema_lasi')
    la.laatikko(0, 1, -10, 10, -2.6, -2.4, 'lasi')
    return kv, kk, ko, la


# ---------------------------------------------------------------- asettelu
# T = pöydän leveys, G = kytkinryhmän leveys (keskellä). Palauttaa {rooli: [objektit]}: pohja (päädyt + keski venytettynä),
# ryhma (paikallaan pysyvät rungot), osat {nimi: [objektit]} (liikkuvat) ja paikat {nimi: (x, y)} pöydän vasemmasta
# alakulmasta (pt). Pöydän koordinaatit: x 0…T, y 0…168.
RIVI2, RIVI1 = 86.0, 141.0


def rakenna(T, G, rungot=True):
    g0 = (T - G) / 2
    askel = G / 6
    kx = [g0 + askel * (i + 0.5) for i in range(6)]
    tulos = {'pohja': [], 'ryhma': [], 'osat': {}, 'paikat': {}}
    tulos['pohja'] += [paaty('paneeli_vasen', -1).valmis((PAATY, 0, 0)),
                       keski().valmis((PAATY, 0, 0), (T - 2 * PAATY, 1, 1)),
                       paaty('paneeli_oikea', 1).valmis((T - PAATY, 0, 0))]
    if not rungot:
        return tulos
    for i in range(5):
        tulos['ryhma'].append(jakolevy(f'jakolevy_{i + 1}').valmis(((kx[i] + kx[i + 1]) / 2, RIVI2, 0)))
    lx = g0 + 18
    mr, ml = merkkivalo()
    tulos['ryhma'] += [mr.valmis((lx, RIVI1, 0)), ml.valmis((lx, RIVI1, 0))]
    kv, kk, ko, la = lukema()
    a, b = lx + 18 + 8, g0 + G - 6 - 8
    tulos['ryhma'] += [kv.valmis((a, RIVI1, 0)), kk.valmis((a, RIVI1, 0), (b - a, 1, 1)), ko.valmis((b, RIVI1, 0)),
                       la.valmis((a, RIVI1, 0), (b - a, 1, 1))]
    tulos['paikat'].update(live=(lx, RIVI1), lukema=((a + b) / 2, RIVI1, b - a + 16, LK))
    kr, kn = kierto()
    tulos['ryhma'].append(kr.valmis((kx[0], RIVI2, 0)))
    tulos['osat']['nopeus'] = [kn.valmis((kx[0], RIVI2, 0))]
    for j, nimi in ((1, 'pilvet'), (2, 'kuukausi')):
        nr, nk = nuppi()
        nr.nimi, nk.nimi = f'nuppi_runko_{nimi}', f'nuppi_korkki_{nimi}'
        tulos['ryhma'].append(nr.valmis((kx[j], RIVI2, 0)))
        tulos['osat'][nimi] = [nk.valmis((kx[j], RIVI2, 0))]
    for j, nimi in ((3, 'kohde'), (5, 'poistu')):
        pr, pk, pl = painike()
        pr.nimi, pk.nimi, pl.nimi = f'painike_runko_{nimi}', f'painike_kansi_{nimi}', f'painike_legenda_{nimi}'
        tulos['ryhma'].append(pr.valmis((kx[j], RIVI2, 0)))
        tulos['osat'][nimi] = [pk.valmis((kx[j], RIVI2, 0)), pl.valmis((kx[j], RIVI2, 0))]
    vr, vv, vc = vipu()
    tulos['ryhma'].append(vr.valmis((kx[4], RIVI2, 0)))
    tulos['osat']['vipu'] = [vv.valmis((kx[4], RIVI2 - 4, 6.2))]
    tulos['osat']['kansi'] = [vc.valmis((kx[4], RIVI2 + 14, 3.4))]
    for nimi, j in (('nopeus', 0), ('pilvet', 1), ('kuukausi', 2), ('kohde', 3), ('oma', 4), ('poistu', 5)):
        tulos['paikat'][nimi] = (kx[j], RIVI2)
    return tulos


if __name__ == '__main__':
    t = rakenna(560 + 2 * PAATY, 560)
    kaikki = t['pohja'] + t['ryhma'] + [o for v in t['osat'].values() for o in v]
    kolmioita = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in kaikki)
    print(f'ISS-PANEELI: {len(kaikki)} solmua, {kolmioita} kolmiota')
