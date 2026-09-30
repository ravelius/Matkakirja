# ISS-KYTKINPÖYTÄ, GEOMETRIA (Linnanrakentaja 30.9.2026, Päätoimittajan erä; omistaja: "ei laatikon muotoinen vaan oikean
# paneelin muotoinen", "napeista aidomman oloisia ja visuaalisesti mielenkiintoisempia", omat valonlähteet).
# Renderöinti kuvakerroksiksi: iss_paneeli_render.py (paneeli ei ole elävä 3D, Päätoimittaja 30.9.).
#
# Mallina Cupolan/Destinyn Robotics Work Stationin Display and Control Panel (NASA iss059e021364, iss050e052148: mattamusta
# konsoli, valkoiset ryhmäkehykset, taustavalaistut neliöpainikkeet, harmaat nupit, teräskytkimet lankakaarella) ja Codexin
# 2D-tutkielmat pinnoista (kulunut grafiittimetalli, messinkisaranat, asteikkorengas; vain referenssi).
# Lähteet: docs/raportit/iss-paneeli-lahteet-20260930.md.
#
# Koordinaatit: 1 yksikkö = 1 pt. pt (x oikealle, y ylös, z ulos paneelista) = Blender (x, −z, y). Pöytä x 0…T, y 0…168;
# ruudun alareuna y = 0 (konsoli jatkuu sen yli). Kerrokset: pohja (päädyt + X:ssä tasainen keski), ryhma (kiinteät
# osat: kupu, DCP-moduulit, rungot, kilvet, legendalevyt, valolyhdyt), osat (liikkuvat).
import math

import bmesh
import bpy
from mathutils import Matrix, Vector

SC = bpy.context.scene


# ---------------------------------------------------------------- materiaalit (baseColor lineaarinen)
MAT = {}


def materiaali(nimi, vari, metalli, karheus, rae=(0.0, 1.0), venytys=(1, 1, 1), kuluma=None):
    """Principled + Bevel-reunat + kohinakuoppa. kuluma = (väri, metalli, karheus): kuluneet särmät paljastavat metallin."""
    m = bpy.data.materials.new(nimi)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*vari, 1)
    b.inputs['Metallic'].default_value = metalli
    b.inputs['Roughness'].default_value = karheus
    b.inputs['Emission Strength'].default_value = 0.0
    bev = nt.nodes.new('ShaderNodeBevel')
    bev.samples = 8
    bev.inputs['Radius'].default_value = 0.45
    kuoppa = nt.nodes.new('ShaderNodeBump')
    kuoppa.inputs['Strength'].default_value = rae[0]
    kuoppa.inputs['Distance'].default_value = 0.05
    tk = nt.nodes.new('ShaderNodeTexCoord')
    kartta = nt.nodes.new('ShaderNodeMapping')
    kartta.inputs['Scale'].default_value = venytys
    kohina = nt.nodes.new('ShaderNodeTexNoise')
    kohina.inputs['Scale'].default_value = rae[1]
    kohina.inputs['Detail'].default_value = 8
    nt.links.new(tk.outputs['Object'], kartta.inputs['Vector'])
    nt.links.new(kartta.outputs['Vector'], kohina.inputs['Vector'])
    nt.links.new(kohina.outputs['Fac'], kuoppa.inputs['Height'])
    nt.links.new(bev.outputs['Normal'], kuoppa.inputs['Normal'])
    nt.links.new(kuoppa.outputs['Normal'], b.inputs['Normal'])
    if kuluma:
        # Särmämaski: (1 − pyöristetty normaali · todellinen normaali) + iso kohina → ramppi → kulunut metalli.
        geo = nt.nodes.new('ShaderNodeNewGeometry')
        bev2 = nt.nodes.new('ShaderNodeBevel')
        bev2.samples = 8
        bev2.inputs['Radius'].default_value = 1.2
        piste = nt.nodes.new('ShaderNodeVectorMath')
        piste.operation = 'DOT_PRODUCT'
        nt.links.new(bev2.outputs['Normal'], piste.inputs[0])
        nt.links.new(geo.outputs['Normal'], piste.inputs[1])
        iso = nt.nodes.new('ShaderNodeTexNoise')
        iso.inputs['Scale'].default_value = 0.35
        iso.inputs['Detail'].default_value = 10
        nt.links.new(tk.outputs['Object'], iso.inputs['Vector'])
        kerro = nt.nodes.new('ShaderNodeMath')
        kerro.operation = 'MULTIPLY_ADD'
        nt.links.new(piste.outputs['Value'], kerro.inputs[0])
        kerro.inputs[1].default_value = -9.0
        kerro.inputs[2].default_value = 9.0
        summa = nt.nodes.new('ShaderNodeMath')
        summa.operation = 'ADD'
        nt.links.new(kerro.outputs['Value'], summa.inputs[0])
        nt.links.new(iso.outputs['Fac'], summa.inputs[1])
        ramppi = nt.nodes.new('ShaderNodeMapRange')
        ramppi.inputs['From Min'].default_value = KULUMA[0]
        ramppi.inputs['From Max'].default_value = KULUMA[1]
        nt.links.new(summa.outputs['Value'], ramppi.inputs['Value'])
        for tulo, a, bb in (('Base Color', vari, kuluma[0]), ('Metallic', metalli, kuluma[1]),
                            ('Roughness', karheus, kuluma[2])):
            sek = nt.nodes.new('ShaderNodeMix')
            if tulo == 'Base Color':
                sek.data_type = 'RGBA'
                sek.inputs[6].default_value = (*a, 1)
                sek.inputs[7].default_value = (*bb, 1)
                nt.links.new(sek.outputs[2], b.inputs[tulo])
            else:
                sek.data_type = 'FLOAT'
                sek.inputs[2].default_value = a
                sek.inputs[3].default_value = bb
                nt.links.new(sek.outputs[0], b.inputs[tulo])
            nt.links.new(ramppi.outputs['Result'], sek.inputs[0])
    MAT[nimi] = m
    return m


KULUMA = (0.95, 1.35)   # rampin alku ja loppu (pienempi alku = enemmän kulumaa)
PRONSSI = ((0.42, 0.3, 0.18), 1.0, 0.32)
materiaali('grafiitti', (0.032, 0.033, 0.036), 0.55, 0.52, (0.2, 1.4), kuluma=PRONSSI)
materiaali('maali_musta', (0.011, 0.011, 0.012), 0.0, 0.72, (0.22, 2.2), kuluma=((0.06, 0.06, 0.065), 0.8, 0.4))
materiaali('maali_valkoinen', (0.72, 0.72, 0.69), 0.0, 0.6, (0.1, 3.0))
materiaali('messinki', (0.6, 0.42, 0.18), 1.0, 0.3, (0.08, 1.0), kuluma=((0.28, 0.2, 0.1), 1.0, 0.55))
materiaali('teras', (0.62, 0.62, 0.64), 1.0, 0.26, (0.06, 0.7), (0.1, 1, 8), kuluma=((0.2, 0.2, 0.21), 1.0, 0.5))
materiaali('nuppi_harmaa', (0.13, 0.135, 0.14), 0.0, 0.42, (0.12, 2.0), kuluma=((0.3, 0.3, 0.31), 0.0, 0.3))
materiaali('kumi', (0.014, 0.014, 0.016), 0.0, 0.8, (0.25, 2.5))
materiaali('lasi', (0.006, 0.01, 0.008), 0.0, 0.04)
materiaali('legendalevy', (0.2, 0.2, 0.19), 0.0, 0.3, (0.03, 3.0))
materiaali('legenda_painike', (0.2, 0.27, 0.22), 0.0, 0.22, (0.03, 3.0))
materiaali('valo', (0.025, 0.07, 0.035), 0.0, 0.08)
materiaali('legenda_teksti', (0.05, 0.06, 0.05), 0.0, 0.3)
materiaali('valolista', (0.5, 0.5, 0.47), 0.0, 0.3)
materiaali('kilpi', (0.58, 0.58, 0.57), 1.0, 0.34, (0.05, 0.6), (0.1, 1, 8))
MNIMET = list(MAT)


def B(x, y, z):
    """pt (x, y ylös, z ulos) → Blender (x, −z, y)."""
    return Vector((x, -z, y))


def _kuutio(sx, sy, sz, viiste=0.0, osat=2):
    """Erillinen bmesh-kuutio pt-mitoilla (x, y, z) keskellä origoa, viistettynä."""
    t = bmesh.new()
    bmesh.ops.create_cube(t, size=1.0)
    bmesh.ops.scale(t, vec=(sx, sz, sy), verts=t.verts)
    if viiste > 0:
        bmesh.ops.bevel(t, geom=list(t.edges), offset=min(viiste, sx / 2.01, sy / 2.01, sz / 2.01), segments=osat,
                        affect='EDGES', profile=0.5, clamp_overlap=True)
    return t


class Solmu:
    """Yksi osa (Blender-objekti): bmesh, johon primitiivit lisätään paikallisissa pt-koordinaateissa (origo = pivot)."""

    def __init__(self, nimi):
        self.nimi = nimi
        self.bm = bmesh.new()

    def _merkitse(self, uudet, mat):
        i = MNIMET.index(mat)
        for f in uudet:
            f.material_index = i

    def _viiste(self, reunat, leveys, osat, mat):
        if leveys <= 0 or not reunat:
            return
        r = bmesh.ops.bevel(self.bm, geom=list(reunat), offset=leveys, segments=osat, affect='EDGES', profile=0.5,
                            clamp_overlap=True)
        self._merkitse(r['faces'], mat)

    def liita(self, toinen, matriisi, mat):
        """Liittää erillisen bmeshin (paikalliset Blender-koordinaatit) matriisilla ja materiaalilla."""
        ennen = set(self.bm.faces)
        me = bpy.data.meshes.new('_t')
        toinen.to_mesh(me)
        toinen.free()
        me.transform(matriisi)
        self.bm.from_mesh(me)
        bpy.data.meshes.remove(me)
        self._merkitse([f for f in self.bm.faces if f not in ennen], mat)

    def laatikko(self, x0, x1, y0, y1, z0, z1, mat, viiste=0.0, osat=2):
        self.liita(_kuutio(x1 - x0, y1 - y0, z1 - z0, viiste, osat),
                   Matrix.Translation(B((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)), mat)

    def sylinteri(self, x, y, z0, z1, r1, mat, r2=None, n=32, viiste=0.0, osat=2, kulma=0.0, akseli='z'):
        """Sylinteri/kartio akselilla z (ulos) tai x (silloin (x, y) = (pt y, pt z) ja z0…z1 = x-alue)."""
        t = bmesh.new()
        bmesh.ops.create_cone(t, cap_ends=True, cap_tris=False, segments=n, radius1=r1,
                              radius2=r1 if r2 is None else r2, depth=z1 - z0)
        if viiste > 0:
            bmesh.ops.bevel(t, geom=[e for e in t.edges if e.calc_face_angle(0) > 0.6], offset=viiste, segments=osat,
                            affect='EDGES', profile=0.5, clamp_overlap=True)
        if akseli == 'z':
            m = Matrix.Translation(B(x, y, (z0 + z1) / 2)) @ Matrix.Rotation(math.radians(90), 4, 'X') @ \
                Matrix.Rotation(kulma, 4, 'Z')
        else:
            m = Matrix.Translation(B((z0 + z1) / 2, x, y)) @ Matrix.Rotation(math.radians(90), 4, 'Y')
        self.liita(t, m, mat)

    def putki(self, pisteet, r, mat, n=10):
        """Lanka pisteiden [(x, y, z)] kautta: sylinteri joka välille + pallo jokaiseen niveleen."""
        for a, b in zip(pisteet, pisteet[1:]):
            pa, pb = B(*a), B(*b)
            d = pb - pa
            t = bmesh.new()
            bmesh.ops.create_cone(t, cap_ends=True, segments=n, radius1=r, radius2=r, depth=d.length)
            q = Vector((0, 0, 1)).rotation_difference(d.normalized())
            self.liita(t, Matrix.Translation((pa + pb) / 2) @ q.to_matrix().to_4x4(), mat)
        for p in pisteet:
            t = bmesh.new()
            bmesh.ops.create_uvsphere(t, u_segments=n, v_segments=6, radius=r)
            self.liita(t, Matrix.Translation(B(*p)), mat)

    def levy(self, aariviiva, z0, z1, mat, viiste=0.0, osat=3, ei_viistetta=None):
        """Ääriviiva [(x, y)] (vastapäivään) pursotettuna z0…z1:een; etupinnan särmät viistetään, paitsi
        ei_viistetta(p, q) → True (liitos naapuriin)."""
        taka = [self.bm.verts.new(B(x, y, z0)) for x, y in aariviiva]
        etu = [self.bm.verts.new(B(x, y, z1)) for x, y in aariviiva]
        uudet = [self.bm.faces.new(etu), self.bm.faces.new(taka[::-1])]
        n = len(aariviiva)
        for i in range(n):
            j = (i + 1) % n
            uudet.append(self.bm.faces.new((taka[i], taka[j], etu[j], etu[i])))
        self._merkitse(uudet, mat)
        bmesh.ops.recalc_face_normals(self.bm, faces=uudet)
        reunat = []
        for i in range(n):
            j = (i + 1) % n
            if ei_viistetta and ei_viistetta(aariviiva[i], aariviiva[j]):
                continue
            e = self.bm.edges.get((etu[i], etu[j]))
            if e:
                reunat.append(e)
        self._viiste(reunat, viiste, osat, mat)

    def profiili(self, pisteet, x0, x1, matit):
        """Profiili [(y, z)] pursotettuna x0…x1:een; matit(i) = välin i materiaali (keski venyy: vain X-särmät)."""
        a = [self.bm.verts.new(B(x0, y, z)) for y, z in pisteet]
        b = [self.bm.verts.new(B(x1, y, z)) for y, z in pisteet]
        for i in range(len(pisteet) - 1):
            f = self.bm.faces.new((a[i], a[i + 1], b[i + 1], b[i]))
            f.material_index = MNIMET.index(matit(i))

    def valmis(self, sijainti=(0, 0, 0), skaala=(1, 1, 1)):
        me = bpy.data.meshes.new(self.nimi)
        self.bm.normal_update()
        self.bm.to_mesh(me)
        self.bm.free()
        for n in MNIMET:
            me.materials.append(MAT[n])
        ob = bpy.data.objects.new(self.nimi, me)
        SC.collection.objects.link(ob)
        ob.location = B(*sijainti)
        ob.scale = (skaala[0], skaala[2], skaala[1])
        return ob


def ruuvi(s, x, y, z=0.0, r=2.4, mat='teras'):
    """Kuusiokoloruuvi (Codex-referenssi) upotetussa kauluksessa."""
    s.sylinteri(x, y, z - 0.3, z + 0.3, r + 0.9, 'grafiitti', n=18, viiste=0.25, osat=1)
    s.sylinteri(x, y, z + 0.3, z + 1.3, r, mat, r2=r * 0.88, n=18, viiste=0.3, osat=2)
    s.sylinteri(x, y, z + 0.9, z + 1.35, r * 0.42, 'kumi', n=6)


def dzus(s, x, y, z=0.0, r=3.0):
    """Pikalukitusruuvi (Dzus, neljänneskierto): kupukanta, ura ja kaulus."""
    s.sylinteri(x, y, z - 0.2, z + 0.5, r + 1.2, 'teras', n=20, viiste=0.3, osat=1)
    s.sylinteri(x, y, z + 0.5, z + 2.0, r, 'teras', r2=r * 0.7, n=20, viiste=0.6, osat=3)
    s.laatikko(x - r * 0.8, x + r * 0.8, y - 0.35, y + 0.35, z + 1.6, z + 2.1, 'kumi')


def kilpi(s, x, y, w, h, z=0.0, rivit=2):
    """Pieni niitattu kilpi: harjattu alumiini ja tummat tekstirivit (ilman sanoja)."""
    s.laatikko(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z, z + 0.35, 'kilpi', viiste=0.3, osat=1)
    for i in range(rivit):
        yy = y + h / 2 - (i + 1) * h / (rivit + 1)
        pit = w * (0.72 if i == 0 else 0.5)
        s.laatikko(x - w / 2 + 1.6, x - w / 2 + 1.6 + pit, yy - 0.35, yy + 0.35, z + 0.35, z + 0.42, 'maali_musta')
    for xx in (x - w / 2 + 0.9, x + w / 2 - 0.9):
        s.sylinteri(xx, y, z + 0.35, z + 0.6, 0.45, 'teras', n=8)


def sateittain(s, r, kulmat, mitat, z, mat, viiste=0.0, kallistus=0.0):
    """Laatikko (mitat sx, sy, sz) jokaiseen kulmaan säteellä r (0 = ylös +Y, myötäpäivään), pitkä sivu säteen suuntaan."""
    for a in kulmat:
        t = _kuutio(*mitat, viiste)
        s.liita(t, Matrix.Translation(B(r * math.sin(a), r * math.cos(a), z)) @ Matrix.Rotation(-a, 4, 'Y') @
                Matrix.Rotation(kallistus, 4, 'X'), mat)


# ---------------------------------------------------------------- painatukset (ISS-kilpien tapaan valkoinen isoin kirjaimin)
# Fontti: Barlow Condensed SemiBold, SIL Open Font License 1.1 (Google Fonts, github.com/jpt/barlow), kopio
# proto-3d/_lahteet/fontit/barlow-condensed/ (OFL.txt mukana).
FONTTI = '/Users/Shared/Claude/proto-3d/_lahteet/fontit/barlow-condensed/BarlowCondensed-SemiBold.ttf'
_FONTTI = None


def teksti(s, txt, x, y, z, koko, mat='maali_valkoinen', tasaus='CENTER', valistys=0.06):
    """Painettu teksti moduulin pintaan (pt): keskitetty pisteeseen (x, y), korkeus = em-koko. Palauttaa leveyden (pt)."""
    global _FONTTI
    if _FONTTI is None:
        _FONTTI = bpy.data.fonts.load(FONTTI)
    cu = bpy.data.curves.new('_teksti', 'FONT')
    cu.body, cu.font, cu.size, cu.extrude = txt, _FONTTI, koko, 0.0
    cu.align_x, cu.align_y, cu.space_character = tasaus, 'CENTER', 1.0 + valistys
    cu.resolution_u = 3
    ob = bpy.data.objects.new('_teksti', cu)
    SC.collection.objects.link(ob)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bpy.data.objects.remove(ob)
    bpy.data.curves.remove(cu)
    xs = [v.co.x for v in me.vertices] or [0.0]
    leveys = max(xs) - min(xs)
    t = bmesh.new()
    t.from_mesh(me)
    bpy.data.meshes.remove(me)
    s.liita(t, Matrix.Translation(B(x, y, z + 0.02)) @ Matrix.Rotation(math.radians(90), 4, 'X'), mat)
    return leveys


OTSIKOT = {'nopeus': 'NOPEUS', 'pilvet': 'PILVET', 'kuukausi': 'KUUKAUSI', 'kohde': 'KOHDE', 'oma': 'OMA PAIKKA',
           'poistu': 'POISTU'}
PAINIKE_LEGENDA = {'kohde': 'LENNÄ', 'poistu': 'POISTU'}
OTSIKKO_KOKO, ASTEIKKO_KOKO = 7.2, 5.0


# ---------------------------------------------------------------- pohja: konsolin runko (keski X:ssä tasainen)
YLA = 132.0     # pohjan yläreuna (kupu nousee ryhmän kohdalla 168:aan)
PAATY = 24.0


def _pohjaprofiili():
    p = [(-24, -16), (-24, -3)]
    y = -24.0
    while y < 32:   # tuuletussäleet: konsoli jatkuu ruudun alareunan yli
        p += [(y + 0.6, -3), (y + 1.9, -0.3), (y + 3.8, -0.3), (y + 4.4, -3)]
        y += 4.6
    p += [(y + 0.6, -3), (y + 1.2, -4.2), (y + 3.2, -4.2), (y + 4.2, -1.2), (y + 5.2, 0), (YLA - 4, 0),
          (YLA - 2.5, -0.8), (YLA - 1, -2.4), (YLA, -5), (YLA, -16)]
    return p


PROF = _pohjaprofiili()


def _profiilimat(i):
    (y0, z0), (y1, z1) = PROF[i], PROF[i + 1]
    return 'kumi' if (y1 < 36 and z0 < -2.5 and z1 < -2.5) else 'grafiitti'


def paaty(nimi, suunta):
    """Päätykehys (sivukisko): nousee 2 pt pohjan eteen, viistetty ulkoyläkulma, kahva ja pikalukitusruuvit.
    suunta −1 = vasen (x −24…0), +1 = oikea (x 0…24)."""
    s = Solmu(nimi)
    u = suunta * PAATY
    ari = [(0, -24), (u, -24), (u, YLA - 16), (u - suunta * 12, YLA + 2), (0, YLA + 2)]
    if suunta < 0:
        ari = ari[::-1]
    s.levy(ari, -16, 2, 'grafiitti', viiste=2.2, osat=3, ei_viistetta=lambda p, q: p[0] == 0 and q[0] == 0)
    xc = suunta * 11
    for y in (12, YLA - 14):
        dzus(s, xc, y, 2)
    for y in (46, 106):   # kahva: jalat + putki
        s.sylinteri(xc, y, 2, 3, 4.6, 'grafiitti', n=18, viiste=0.4, osat=1)
        s.sylinteri(xc, y, 3, 10, 2.3, 'teras', n=14, viiste=0.5, osat=1)
    s.putki([(xc, 46, 10), (xc, 50, 12.5), (xc, 102, 12.5), (xc, 106, 10)], 2.3, 'teras', n=14)
    return s


def keski():
    s = Solmu('paneeli_keski')
    s.profiili(PROF, 0.0, 1.0, _profiilimat)
    return s


# ---------------------------------------------------------------- kytkimet (origo = pivot moduulin pinnassa)
def kierto():
    r = Solmu('kierto_runko')
    r.sylinteri(0, 0, 0, 0.8, 21.5, 'grafiitti', n=48, viiste=0.3, osat=1)
    r.sylinteri(0, 0, 0.8, 2.4, 20.0, 'teras', r2=19.2, n=48, viiste=0.5, osat=2)      # asteikkorengas
    r.sylinteri(0, 0, 2.4, 2.6, 14.6, 'kumi', n=48)
    pitkat = [math.radians(k) for k in (-60, -20, 20, 60)]
    lyhyet = [math.radians(k) for k in range(-80, 81, 10) if k not in (-60, -20, 20, 60)]
    sateittain(r, 17.4, pitkat, (0.55, 3.0, 0.3), 2.45, 'maali_musta')
    sateittain(r, 17.8, lyhyet, (0.35, 1.4, 0.3), 2.45, 'maali_musta')
    n = Solmu('kierto_nuppi')     # ISS:n harmaa kartiomainen nuppi, uritettu, valkoinen osoitin +Y
    n.sylinteri(0, 0, 2.6, 5.0, 13.6, 'nuppi_harmaa', r2=13.0, n=48, viiste=0.6, osat=2)
    n.sylinteri(0, 0, 5.0, 13.5, 11.2, 'nuppi_harmaa', r2=8.6, n=48, viiste=1.2, osat=3)
    sateittain(n, 10.6, [2 * math.pi * (i + 0.5) / 8 for i in range(8)], (3.2, 5.0, 8.0), 8.8, 'nuppi_harmaa',
               viiste=1.2, kallistus=math.radians(-12))
    n.laatikko(-0.9, 0.9, 1.2, 8.0, 13.3, 13.8, 'maali_valkoinen', viiste=0.2, osat=1)
    n.laatikko(-0.9, 0.9, 10.2, 12.2, 11.0, 12.6, 'maali_valkoinen', viiste=0.3, osat=1)   # osoitin hameessa
    return r, n


def nuppi():
    r = Solmu('nuppi_runko')
    r.sylinteri(0, 0, 0, 0.9, 20.5, 'grafiitti', n=48, viiste=0.3, osat=1)
    kulmat = [math.radians(-135 + 13.5 * i) for i in range(21)]
    sateittain(r, 17.4, kulmat[::5], (0.5, 3.4, 0.2), 0.95, 'maali_valkoinen')
    sateittain(r, 18.2, [a for i, a in enumerate(kulmat) if i % 5], (0.4, 1.8, 0.2), 0.95, 'maali_valkoinen')
    k = Solmu('nuppi_korkki')
    k.sylinteri(0, 0, 0.9, 2.6, 13.8, 'teras', r2=13.3, n=48, viiste=0.4, osat=2)       # hame
    k.sylinteri(0, 0, 2.6, 11.5, 11.0, 'kumi', r2=10.6, n=48, viiste=1.3, osat=3)
    sateittain(k, 11.0, [2 * math.pi * i / 24 for i in range(24)], (1.3, 1.0, 7.6), 6.9, 'kumi', viiste=0.4)
    k.sylinteri(0, 0, 11.4, 11.9, 8.4, 'kumi', n=40, viiste=0.3, osat=1)
    k.sylinteri(0, 0, 11.9, 12.1, 3.2, 'teras', n=24, viiste=0.1, osat=1)
    k.laatikko(-0.7, 0.7, 4.4, 10.2, 11.85, 12.3, 'maali_valkoinen')
    return r, k


def painike():
    r = Solmu('painike_runko')
    ari = [(-21, -14), (-18, -17), (18, -17), (21, -14), (21, 14), (18, 17), (-18, 17), (-21, 14)]
    r.levy(ari, 0, 1.2, 'grafiitti', viiste=0.8, osat=2)
    for x0, x1, y0, y1 in ((-17.5, 17.5, 12.5, 15), (-17.5, 17.5, -15, -12.5), (-17.5, -15, -12.5, 12.5),
                           (15, 17.5, -12.5, 12.5)):
        r.laatikko(x0, x1, y0, y1, 1.2, 4.2, 'teras', viiste=0.8, osat=2)
    r.laatikko(-15, 15, -12.5, 12.5, -2.0, -1.6, 'kumi')
    for x in (-19.4, 19.4):
        ruuvi(r, x, 0, 1.2, r=1.3)
    k = Solmu('painike_kansi')
    k.laatikko(-14.4, 14.4, -11.9, 11.9, -1.6, 5.4, 'legenda_painike', viiste=1.5, osat=3)
    return r, k


def painikkeen_legenda(k, txt):
    teksti(k, txt, 0, 0, 5.4, 7.0 if len(txt) <= 5 else 5.8, 'legenda_teksti')


def vipu():
    r = Solmu('vipu_runko')
    r.laatikko(-17, 17, -19, 19, 0, 1.4, 'grafiitti', viiste=2.2, osat=3)
    for x, y in ((-13.5, -15.5), (13.5, -15.5), (-13.5, 15.5), (13.5, 15.5)):
        ruuvi(r, x, y, 1.4, r=1.3)
    r.sylinteri(0, 0, 1.4, 4.6, 5.0, 'teras', n=6, viiste=0.35, osat=1, kulma=math.radians(30))   # kuusiomutteri
    r.sylinteri(0, 0, 4.6, 6.0, 3.3, 'teras', n=18, viiste=0.3, osat=1)
    for x in (-11.5, 11.5):   # messinkiset saranakorvakkeet lankakaarelle
        r.laatikko(x - 1.6, x + 1.6, -3.5, 3.5, 1.4, 6.2, 'messinki', viiste=0.8, osat=2)
        r.sylinteri(0, 4.4, x - 2.4, x + 2.4, 1.3, 'messinki', akseli='x', n=12)
    v = Solmu('vipu_varsi')   # origo varren juuressa (moduulin pinnasta z = 6), vipu ulos +Z
    v.sylinteri(0, 0, 0, 14.5, 1.6, 'teras', r2=2.2, n=16, viiste=0.2, osat=1)
    v.sylinteri(0, 0, 14.0, 18.6, 2.9, 'teras', r2=1.9, n=16, viiste=1.0, osat=3)
    c = Solmu('vipu_kaari')   # lankakaari, origo saranalla (z = 4.4), pyörii X:n ympäri
    c.putki([(-11.5, 0, 0), (-11.5, 0, 13), (-10.6, 0, 20), (-7.4, 0, 24), (-2.6, 0, 25.4), (2.6, 0, 25.4),
             (7.4, 0, 24), (10.6, 0, 20), (11.5, 0, 13), (11.5, 0, 0)], 1.0, 'teras', n=10)
    return r, v, c


def merkkivalo():
    r = Solmu('merkkivalo_runko')
    r.sylinteri(0, 0, 0, 1.2, 10.5, 'grafiitti', n=40, viiste=0.4, osat=2)
    r.sylinteri(0, 0, 1.2, 3.0, 8.2, 'messinki', r2=7.8, n=40, viiste=0.5, osat=2)
    for a in (0, math.pi):
        ruuvi(r, 9.3 * math.cos(a), 0, 1.2, r=0.9)
    l = Solmu('merkkivalo_lasi')
    l.sylinteri(0, 0, 2.4, 5.6, 6.6, 'valo', r2=5.6, n=40, viiste=2.2, osat=5)
    return r, l


def lukema(w):
    """Tilanäyttö (Codex-referenssi): teräskehys korvakkein ja ruuvein, tumma lasi. w = kehyksen leveys."""
    s = Solmu('lukema')
    h = 30.0
    ari = [(-w / 2 - 6, -6), (-w / 2, -h / 2), (w / 2, -h / 2), (w / 2 + 6, -6), (w / 2 + 6, 6), (w / 2, h / 2),
           (-w / 2, h / 2), (-w / 2 - 6, 6)]
    s.levy(ari, 0, 1.4, 'teras', viiste=0.8, osat=2)
    for x0, x1, y0, y1 in ((-w / 2 + 2, w / 2 - 2, h / 2 - 5, h / 2 - 2), (-w / 2 + 2, w / 2 - 2, -h / 2 + 2, -h / 2 + 5),
                           (-w / 2 + 2, -w / 2 + 5, -h / 2 + 2, h / 2 - 2), (w / 2 - 5, w / 2 - 2, -h / 2 + 2, h / 2 - 2)):
        s.laatikko(x0, x1, y0, y1, 1.4, 3.2, 'teras', viiste=0.9, osat=2)
    s.laatikko(-w / 2 + 5, w / 2 - 5, -h / 2 + 5, h / 2 - 5, 1.4, 1.8, 'lasi')
    for x in (-w / 2 - 3, w / 2 + 3):
        ruuvi(s, x, 0, 1.4, r=1.3)
    return s


# ---------------------------------------------------------------- ryhmä: kupu, DCP-moduulit, valolyhdyt
MOD_Z = 4.0     # kupu z −2…4, DCP-moduulit 3.5…7, kytkimet moduulin pinnassa z = 7
PINTA = 7.0
RIVI2, RIVI1 = 88.0, 139.0


def kaaren_y(x, g0, G):
    """Kuvun yläreuna: Cupolan ikkunarenkaan kaari, keskeltä 7 pt matalampi."""
    return 161 + 7 * ((x - (g0 + G / 2)) / (G / 2)) ** 2


def kupu(T, G, g0):
    """Instrumenttikupu: nousee ryhmän kohdalla pohjan yläpuolelle, viistot olkapäät, kaareva yläreuna."""
    s = Solmu('kupu')
    sw = min(14.0, g0)
    L, R = g0 - sw, g0 + G + sw
    kaari = [(g0 + G - G * i / 24, kaaren_y(g0 + G - G * i / 24, g0, G)) for i in range(25)]
    ari = [(L + 6, 36), (R - 6, 36), (R, 42), (R, YLA - 2)] + kaari + [(L, YLA - 2), (L, 42)]
    s.levy(ari, -2, MOD_Z, 'grafiitti', viiste=2.6, osat=4)
    return s


def moduuli(s, x0, x1, y0, y1):
    """Kohotettu DCP-moduuli: mattamusta levy, pikalukitusruuvit kulmissa."""
    s.levy([(x0 + 3, y0), (x1 - 3, y0), (x1, y0 + 3), (x1, y1 - 3), (x1 - 3, y1), (x0 + 3, y1), (x0, y1 - 3),
            (x0, y0 + 3)], MOD_Z - 0.5, PINTA, 'maali_musta', viiste=1.2, osat=3)
    for x, y in ((x0 + 5, y0 + 5), (x1 - 5, y0 + 5), (x0 + 5, y1 - 5), (x1 - 5, y1 - 5)):
        dzus(s, x, y, PINTA, r=2.2)


def ryhmakehys(s, x0, x1, y0, y1, aukko=None, z=PINTA, lev=0.7):
    """Maalattu valkoinen ryhmäkehys (ISS DCP); aukko = (xa, xb) yläreunan katkos otsikolle."""
    for a, b in ([(x0, x1)] if not aukko else [(x0, aukko[0]), (aukko[1], x1)]):
        s.laatikko(a, b, y1 - lev, y1, z, z + 0.06, 'maali_valkoinen')
    s.laatikko(x0, x1, y0, y0 + lev, z, z + 0.06, 'maali_valkoinen')
    s.laatikko(x0, x0 + lev, y0, y1, z, z + 0.06, 'maali_valkoinen')
    s.laatikko(x1 - lev, x1, y0, y1, z, z + 0.06, 'maali_valkoinen')


def legendalevy(s, x, y, w, h=9.0, z=PINTA):
    """Taustavalaistu legendalevy (teksti pelistä): ohut kehys + maitomainen levy."""
    s.laatikko(x - w / 2 - 1.2, x + w / 2 + 1.2, y - h / 2 - 1.2, y + h / 2 + 1.2, z, z + 0.8, 'grafiitti', viiste=0.4,
               osat=1)
    s.laatikko(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z + 0.5, z + 0.9, 'legendalevy', viiste=0.2, osat=1)


def valolyhty(s, x, y, z=MOD_Z):
    """Paneelivalon lyhty kuvun yläreunassa: kotelo ja alaspäin katsova maitolasi."""
    s.laatikko(x - 9, x + 9, y - 4.5, y + 4.5, z, z + 5.5, 'grafiitti', viiste=1.6, osat=3)
    s.laatikko(x - 7.5, x + 7.5, y - 4.9, y - 3.2, z + 1.2, z + 4.6, 'valolista', viiste=0.4, osat=1)
    for xx in (x - 6.5, x + 6.5):
        ruuvi(s, xx, y + 1.8, z + 5.5, r=0.9)


VIPU_ALAS, VIPU_YLOS = -35.0, 35.0          # vivun kulma X:n ympäri (+ = kärki ylös)
KAARI_KIINNI, KAARI_AUKI = -62.0, 48.0      # lankakaari: kiinni vivun yllä alaspäin, auki käännettynä ylös


def kaanna(ob, asteet):
    """Kääntää osaa pt-X-akselin ympäri (+ = +Y:tä kohti eli ylös ruudulla)."""
    ob.rotation_euler = (math.radians(asteet), 0, 0)


def rakenna(T, G, rungot=True):
    """T = pöydän leveys, G = kytkinryhmän leveys (keskellä). Palauttaa {'pohja': [...], 'ryhma': [...],
    'osat': {nimi: [...]}, 'paikat': {nimi: (x, y, ...)}, 'valot': {nimi: [(x, y, z)]}} pöydän koordinaateissa (pt)."""
    g0 = (T - G) / 2
    askel = G / 6
    kx = [g0 + askel * (i + 0.5) for i in range(6)]
    tulos = {'pohja': [], 'ryhma': [], 'osat': {}, 'paikat': {}, 'valot': {}}
    tulos['pohja'] += [paaty('paneeli_vasen', -1).valmis((PAATY, 0, 0)),
                       keski().valmis((PAATY, 0, 0), (T - 2 * PAATY, 1, 1)),
                       paaty('paneeli_oikea', 1).valmis((T - PAATY, 0, 0))]
    if not rungot:
        return tulos
    ku = kupu(T, G, g0)
    reuna = 7.0
    moduuli(ku, g0 + reuna, g0 + G - reuna, 124, 154)
    moduuli(ku, g0 + reuna, g0 + G / 2 - 2, 42, 120)
    moduuli(ku, g0 + G / 2 + 2, g0 + G - reuna, 42, 120)
    lev = min(44.0, askel - 16)
    for x, (avain, otsikko) in zip(kx, OTSIKOT.items()):   # ryhmäkehys, otsikko katkoksessa, legendalevy (arvokenttä)
        kp = askel / 2 - (8 if askel > 80 else 4)
        w = teksti(ku, otsikko, x, 116.2, PINTA, OTSIKKO_KOKO)
        tulos['paikat'][f'{avain}-otsikko'] = (x, 116.2, round(w + 4.4, 2), 8.0)
        ryhmakehys(ku, x - kp, x + kp, 60, 116.6, aukko=(x - w / 2 - 2.2, x + w / 2 + 2.2))
        legendalevy(ku, x, 51.5, lev)
    for k, txt in zip((-60, -20, 20, 60), ('LIVE', '10×', '100×', '1000×')):   # NOPEUS-asteikko
        a_ = math.radians(k)
        r_ = 24.0 if abs(k) < 40 else 25.5
        teksti(ku, txt, kx[0] + r_ * math.sin(a_), RIVI2 + r_ * math.cos(a_) - 0.6, PINTA, ASTEIKKO_KOKO - 0.4)
    kilpi(ku, g0 + G / 2, 130.5, 20, 4.6, PINTA)
    lyhdyt = []
    for xx in (g0 + 22, g0 + G - 22):
        yy = kaaren_y(xx, g0, G) - 6.5
        valolyhty(ku, xx, yy)
        lyhdyt.append((xx, yy - 10, MOD_Z + 30))
    tulos['valot']['paneeli'] = lyhdyt
    lx = g0 + reuna + 20
    mr, ml = merkkivalo()
    teksti(ku, 'LIVE', lx, RIVI1 + 13.3, PINTA, 4.6)
    teksti(ku, 'PALAA', lx, RIVI1 - 13.3, PINTA, 4.6)
    tulos['ryhma'].append(ku.valmis())
    tulos['ryhma'] += [mr.valmis((lx, RIVI1, PINTA)), ml.valmis((lx, RIVI1, PINTA))]
    a, b = lx + 22, g0 + G - reuna - 16
    tulos['ryhma'].append(lukema(b - a - 12).valmis(((a + b) / 2, RIVI1, PINTA)))
    tulos['paikat'].update(live=(lx, RIVI1, 16, 16), lukema=((a + b) / 2, RIVI1, b - a - 22, 20))
    kr, kn = kierto()
    tulos['ryhma'].append(kr.valmis((kx[0], RIVI2, PINTA)))
    tulos['osat']['nopeus'] = [kn.valmis((kx[0], RIVI2, PINTA))]
    for j, nimi in ((1, 'pilvet'), (2, 'kuukausi')):
        nr, nk = nuppi()
        nr.nimi, nk.nimi = f'nuppi_runko_{nimi}', f'nuppi_korkki_{nimi}'
        tulos['ryhma'].append(nr.valmis((kx[j], RIVI2, PINTA)))
        tulos['osat'][nimi] = [nk.valmis((kx[j], RIVI2, PINTA))]
    for j, nimi in ((3, 'kohde'), (5, 'poistu')):
        pr, pk = painike()
        pr.nimi, pk.nimi = f'painike_runko_{nimi}', f'painike_kansi_{nimi}'
        painikkeen_legenda(pk, PAINIKE_LEGENDA[nimi])
        tulos['ryhma'].append(pr.valmis((kx[j], RIVI2, PINTA)))
        tulos['osat'][nimi] = [pk.valmis((kx[j], RIVI2, PINTA))]
    vr, vv, vc = vipu()
    tulos['ryhma'].append(vr.valmis((kx[4], RIVI2, PINTA)))
    tulos['osat']['vipu'] = [vv.valmis((kx[4], RIVI2, PINTA + 6.0))]
    tulos['osat']['kaari'] = [vc.valmis((kx[4], RIVI2, PINTA + 4.4))]
    kaanna(tulos['osat']['vipu'][0], VIPU_ALAS)
    kaanna(tulos['osat']['kaari'][0], KAARI_KIINNI)
    for nimi, j in (('nopeus', 0), ('pilvet', 1), ('kuukausi', 2), ('kohde', 3), ('oma', 4), ('poistu', 5)):
        tulos['paikat'][nimi] = (kx[j], RIVI2, 48, 48)
        tulos['paikat'][f'{nimi}-levy'] = (kx[j], 51.5, lev, 9.0)
    tulos['paikat']['live-otsikko'] = (lx, RIVI1, 22.0, 34.0)
    tulos['paikat']['oma-kaari'] = (kx[4], RIVI2 + 6, 30.0, 40.0)
    sw = min(14.0, g0)
    tulos['paikat']['ryhma'] = (g0 - sw, g0 + G + sw)
    tulos['paikat']['kupu'] = (g0 + G / 2, 102.0, G + 2 * sw, 132.0)
    return tulos


if __name__ == '__main__':
    t = rakenna(560 + 2 * PAATY, 560)
    kaikki = t['pohja'] + t['ryhma'] + [o for v in t['osat'].values() for o in v]
    print(f'ISS-PANEELI: {len(kaikki)} osaa, {sum(len(o.data.polygons) for o in kaikki)} tahkoa')
