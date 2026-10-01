# MYLLYN LAUDAT OIKEINA ESINEINÄ (Linnanrakentaja 1.10.2026; omistajan hyväksymä lautavalikoima klo 21.0x,
# Päätoimittajan tilaus). Kolme lautaa samalla kameralla ja samoilla 24 pisteellä (pisteet.json yhteinen):
#   majatalo      Majatalo 1873: pähkinälauta vaalein vaahteraupotuksin, sorvatut vaahtera- ja pähkinänappulat
#   luostari      Luostari 1200-l.: Ten Duinen -luostarin poltettu tiili (Abdijmuseum Ten Duinen, inv. 033880), lauta
#                 painettu märkään saveen: urat koholle nousevin reunoin, yliviedyt viivat, ei pistekuoppia; luu- ja savikiekot
#   viikinkilaiva Viikinkilaiva n. 900: haalistunut tammilauta, terävästi kaiverretut viivat (Gokstadin pelilauta),
#                 sarvikuvut (Birka, hauta 581) ja tummanvihreät lasikuvut (Birka, hauta 750)
# Esikuvat ja lähteet: docs/raportit/mylly-laudat-20261001.md.
# Tekstuurit Poly Haven, CC0: wood_table_worn (Dimitrios Savva, Rico Cilliers), rock_surface (Amal Kumar),
# grey_oak_veneer_02 (Jenelle van Heerden). Nappulat, upotus, savilaikut ja kirveenjäljet proseduraalisia.
# Koordinaatit: lauta 1 × 1 (= L), keskipiste origossa, yläpinta z = 0; kamera ortografinen ylhäältä (ortho_scale 1).
#   Blender -b -P mylly_lauta.py -- --tyyli <majatalo|luostari|viikinkilaiva> --malli <ulos.png> [--koko 2048] [--naytteita 128]
#   Blender -b -P mylly_lauta.py -- --tyyli <...> --kerros <lauta|hehku|vaalea|tumma|varjo|valittu|poistettava|kohde> <ulos.png>
import math, os, random, sys
import bpy, bmesh
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
PH = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven'
VALI = (1 - 0.18) / 6                  # Siirtoseppä 1.10.: marginaali 9 %, ruutuväli (1 − 0,18) / 6
NELIOT = (3 * VALI, 2 * VALI, VALI)    # sisäkkäisten neliöiden puolisivut (0,41 / 0,273 / 0,137)
NAPPULA_R = 0.049                      # nappulan säde (Siirtoseppä: halkaisija 0,098 laudasta)
NAPPULA_KOKO, RENGAS_KOKO, LAUTA_KOKO = 256, 320, 2048

TYYLIT = {
    'majatalo':      dict(paksuus=0.06, viiste=0.012, viiste_os=4, ura_lev=0.0085, ura_syv=0.004, kapenee=1.0,
                          kuoppa_r=0.017, kuoppa_syv=0.004, heilunta=0.0, yli=(0.0, 0.0), vino=0.0, upotus=-0.0006,
                          nappula='sorvattu', hehku=1.1),
    # Ten Duinen: viivat painettu tikulla märkään saveen → leveä U-ura, reunat nousevat; ulkoneliön ja keskilinjojen
    # vedot jatkuvat pitkälle yli (kuvassa lähes tiilen reunaan), viivat hieman vinossa
    'luostari':      dict(paksuus=0.12, viiste=0.014, viiste_os=3, ura_lev=0.018, ura_syv=0.006, kapenee=0.6,
                          kuoppa_r=0.0, kuoppa_syv=0.0, heilunta=0.0012, yli=(0.004, 0.06), vino=0.005, upotus=None,
                          nappula='kiekko', reunat=True, murtuma=True),
    # Gokstad: siisti, ammattimainen kaiverrus (terävä V-ura), ei pistekuoppia
    'viikinkilaiva': dict(paksuus=0.05, viiste=0.006, viiste_os=1, ura_lev=0.012, ura_syv=0.005, kapenee=0.2,
                          kuoppa_r=0.0, kuoppa_syv=0.0, heilunta=0.0004, yli=(0.0, 0.006), vino=0.0015, upotus=None,
                          nappula='kupu'),
}
NIMI = A[A.index('--tyyli') + 1] if '--tyyli' in A else 'majatalo'
T = TYYLIT[NIMI]


def pisteet():
    """24 pistettä järjestyksessä: neliö ulkoa sisään, kussakin vasen ylä → myötäpäivään (8 kpl)."""
    p = []
    for a in NELIOT:
        p += [(-a, a), (0, a), (a, a), (a, 0), (a, -a), (0, -a), (-a, -a), (-a, 0)]
    return p


def myllyt():
    """16 myllyä pisteindekseinä: kunkin neliön sivut (4 × 3) ja keskilinjat neliöiden yli (4)."""
    m = []
    for k in range(3):
        b = 8 * k
        m += [(b + 0, b + 1, b + 2), (b + 2, b + 3, b + 4), (b + 4, b + 5, b + 6), (b + 6, b + 7, b + 0)]
    for j in (1, 3, 5, 7):
        m.append((j, 8 + j, 16 + j))
    return m


# ---------- materiaalit ----------

def _solmut(nimi):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree
    return m, nt, nt.nodes['Principled BSDF']


def _kuvat(nt, aineisto, skaala):
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (skaala, skaala, skaala); nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    k = {}
    for osa in ('diff', 'rough', 'nor'):
        t = nt.nodes.new('ShaderNodeTexImage')
        t.image = bpy.data.images.load(os.path.join(PH, aineisto, f'{aineisto}_{osa}_4k.jpg'))
        if osa != 'diff': t.image.colorspace_settings.name = 'Non-Color'
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector']); k[osa] = t
    return k, tc


def _ao_kerto(nt, vari_ulos, b, vahvuus=0.85, etaisyys=0.006):
    """Kaiverrus tummuu: AO kerrotaan perusväriin (urat ja kuopat)."""
    ao = nt.nodes.new('ShaderNodeAmbientOcclusion'); ao.inputs['Distance'].default_value = etaisyys; ao.samples = 16
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = vahvuus
    nt.links.new(vari_ulos, mx.inputs['A']); nt.links.new(ao.outputs['AO'], mx.inputs['B'])
    nt.links.new(mx.outputs['Result'], b.inputs['Base Color'])


def _hsv(nt, ulos, s=1.0, v=1.0, h=0.5):
    n = nt.nodes.new('ShaderNodeHueSaturation'); n.inputs['Hue'].default_value = h
    n.inputs['Saturation'].default_value = s; n.inputs['Value'].default_value = v
    nt.links.new(ulos, n.inputs['Color']); return n.outputs['Color']


def _karheus(nt, k, b, lo, hi):
    rr = nt.nodes.new('ShaderNodeMapRange'); rr.inputs['To Min'].default_value = lo; rr.inputs['To Max'].default_value = hi
    nt.links.new(k['rough'].outputs['Color'], rr.inputs['Value']); nt.links.new(rr.outputs['Result'], b.inputs['Roughness'])


def _normaali(nt, k, voima):
    nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = voima
    nt.links.new(k['nor'].outputs['Color'], nm.inputs['Color']); return nm.outputs['Normal']


def lauta_majatalo():
    """Öljytty pähkinä, vaalennettu (tummat nappulat erottuvat iPhonella)."""
    m, nt, b = _solmut('lauta'); k, _ = _kuvat(nt, 'wood_table_worn', 1.6)
    _ao_kerto(nt, _hsv(nt, k['diff'].outputs['Color'], s=0.95, v=1.55), b)
    _karheus(nt, k, b, 0.25, 0.55); nt.links.new(_normaali(nt, k, 0.6), b.inputs['Normal'])
    b.inputs['Coat Weight'].default_value = 0.35; b.inputs['Coat Roughness'].default_value = 0.25
    return m


def lauta_luostari():
    """Poltettu tiili: rock_surface harmaanbeigeksi + oranssinpunaiset polttolaikut (kohina) kuten Ten Duinen -tiilessä."""
    m, nt, b = _solmut('lauta'); k, tc = _kuvat(nt, 'rock_surface', 1.4)
    pinta = _hsv(nt, k['diff'].outputs['Color'], s=0.75, v=1.9, h=0.5)
    no = nt.nodes.new('ShaderNodeTexNoise'); no.inputs['Scale'].default_value = 2.2; no.inputs['Detail'].default_value = 7
    no.inputs['Roughness'].default_value = 0.62; nt.links.new(tc.outputs['Object'], no.inputs['Vector'])
    ra = nt.nodes.new('ShaderNodeMapRange'); ra.inputs['From Min'].default_value = 0.50; ra.inputs['From Max'].default_value = 0.68
    nt.links.new(no.outputs['Fac'], ra.inputs['Value'])
    tiili = nt.nodes.new('ShaderNodeMix'); tiili.data_type = 'RGBA'; tiili.blend_type = 'MULTIPLY'
    tiili.inputs['B'].default_value = (1.0, 0.55, 0.33, 1)
    nt.links.new(ra.outputs['Result'], tiili.inputs['Factor']); nt.links.new(pinta, tiili.inputs['A'])
    _ao_kerto(nt, tiili.outputs['Result'], b, vahvuus=0.55, etaisyys=0.007)
    _karheus(nt, k, b, 0.75, 0.95); nt.links.new(_normaali(nt, k, 1.0), b.inputs['Normal'])
    return m


def lauta_viikinkilaiva():
    """Haalistunut tammilauta: harmaa tammi + tummuneet laikut (kohina) + kirveenjäljet (venytetty Voronoi kuhmuna)."""
    m, nt, b = _solmut('lauta'); k, tc = _kuvat(nt, 'grey_oak_veneer_02', 1.3)
    puu = _hsv(nt, k['diff'].outputs['Color'], s=2.2, v=0.55, h=0.48)
    no = nt.nodes.new('ShaderNodeTexNoise'); no.inputs['Scale'].default_value = 3.5; no.inputs['Detail'].default_value = 6
    nt.links.new(tc.outputs['Object'], no.inputs['Vector'])
    ra = nt.nodes.new('ShaderNodeMapRange'); ra.inputs['From Min'].default_value = 0.45; ra.inputs['From Max'].default_value = 0.70
    nt.links.new(no.outputs['Fac'], ra.inputs['Value'])
    tk = nt.nodes.new('ShaderNodeMath'); tk.operation = 'MULTIPLY'; tk.inputs[1].default_value = 0.45
    nt.links.new(ra.outputs['Result'], tk.inputs[0])
    terva = nt.nodes.new('ShaderNodeMix'); terva.data_type = 'RGBA'; terva.inputs['B'].default_value = (0.045, 0.030, 0.018, 1)
    nt.links.new(tk.outputs['Value'], terva.inputs['Factor']); nt.links.new(puu, terva.inputs['A'])
    _ao_kerto(nt, terva.outputs['Result'], b, vahvuus=1.0, etaisyys=0.006)
    # karheus: puu kuiva, terva kiiltävämpi
    kr = nt.nodes.new('ShaderNodeMix'); kr.data_type = 'FLOAT'; kr.inputs['A'].default_value = 0.8; kr.inputs['B'].default_value = 0.42
    nt.links.new(tk.outputs['Value'], kr.inputs['Factor']); nt.links.new(kr.outputs['Result'], b.inputs['Roughness'])
    # kirveenjäljet: syyn poikki matalat kourut
    vm = nt.nodes.new('ShaderNodeMapping'); vm.inputs['Scale'].default_value = (11.0, 3.5, 1.0)
    vm.inputs['Rotation'].default_value = (0, 0, 0.06)
    nt.links.new(tc.outputs['Object'], vm.inputs['Vector'])
    vo = nt.nodes.new('ShaderNodeTexVoronoi'); vo.feature = 'F1'; vo.distance = 'EUCLIDEAN'
    vo.inputs['Randomness'].default_value = 0.8; nt.links.new(vm.outputs['Vector'], vo.inputs['Vector'])
    bu = nt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.35; bu.inputs['Distance'].default_value = 0.008
    nt.links.new(vo.outputs['Distance'], bu.inputs['Height']); nt.links.new(_normaali(nt, k, 0.9), bu.inputs['Normal'])
    nt.links.new(bu.outputs['Normal'], b.inputs['Normal'])
    return m


def puu_proseduraali(nimi, vari1, vari2, karheus=0.35, skaala=9, coat=0.5):
    """Sorvattu puu: renkaat (Wave, rings) akselin ympäri + kohina."""
    m, nt, b = _solmut(nimi)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    w = nt.nodes.new('ShaderNodeTexWave'); w.wave_type = 'RINGS'; w.rings_direction = 'Z'
    w.inputs['Scale'].default_value = skaala; w.inputs['Distortion'].default_value = 6.0; w.inputs['Detail'].default_value = 4
    nt.links.new(tc.outputs['Object'], w.inputs['Vector'])
    cr = nt.nodes.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].color = (*vari1, 1); cr.color_ramp.elements[1].color = (*vari2, 1)
    cr.color_ramp.elements[0].position = 0.35; cr.color_ramp.elements[1].position = 0.95
    nt.links.new(w.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = karheus; b.inputs['Coat Weight'].default_value = coat; b.inputs['Coat Roughness'].default_value = 0.2
    return m


def kivi_proseduraali(nimi, vari1, vari2, karheus, sss=0.0, skaala=60):
    """Luu tai liuskekivi: hienojakoinen kohina + kevyt kuhmu."""
    m, nt, b = _solmut(nimi)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    no = nt.nodes.new('ShaderNodeTexNoise'); no.inputs['Scale'].default_value = skaala; no.inputs['Detail'].default_value = 8
    no.inputs['Roughness'].default_value = 0.6; nt.links.new(tc.outputs['Object'], no.inputs['Vector'])
    cr = nt.nodes.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].color = (*vari1, 1); cr.color_ramp.elements[1].color = (*vari2, 1)
    cr.color_ramp.elements[0].position = 0.3; cr.color_ramp.elements[1].position = 0.75
    nt.links.new(no.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    bu = nt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.15
    nt.links.new(no.outputs['Fac'], bu.inputs['Height']); nt.links.new(bu.outputs['Normal'], b.inputs['Normal'])
    b.inputs['Roughness'].default_value = karheus
    if sss:
        b.inputs['Subsurface Weight'].default_value = sss; b.inputs['Subsurface Radius'].default_value = (0.004, 0.003, 0.002)
    return m


def lasi(nimi, vari):
    """Birkan lasinappula: lähes läpinäkymätön tumma lasi kiiltävällä pinnalla. Ei läpäisyä: läpinäkyvä materiaali
    näyttäisi irrallisessa nappulakuvassa taustan harmaana renkaana laudan päällä."""
    m, nt, b = _solmut(nimi)
    b.inputs['Base Color'].default_value = (*vari, 1); b.inputs['Roughness'].default_value = 0.14
    b.inputs['Coat Weight'].default_value = 1.0; b.inputs['Coat Roughness'].default_value = 0.12; b.inputs['IOR'].default_value = 1.52
    return m


def emissio(nimi, vari, voima):
    m, nt, b = _solmut(nimi)
    b.inputs['Base Color'].default_value = (*vari, 1); b.inputs['Emission Color'].default_value = (*vari, 1)
    b.inputs['Emission Strength'].default_value = voima
    return m


# ---------- geometria ----------

def _kohina(rnd):
    """Pehmeä käsivedon heilunta t ∈ [0, 1] → [-1, 1]: kaksi siniaaltoa satunnaisin vaihein + pieni nykiminen."""
    f1, f2, p1, p2 = rnd.uniform(1.2, 2.2), rnd.uniform(4, 7), rnd.uniform(0, 6.3), rnd.uniform(0, 6.3)
    nyk = [rnd.uniform(-1, 1) for _ in range(41)]
    def f(t):
        i = min(int(t * 40), 39); u = t * 40 - i
        return (0.6 * math.sin(2 * math.pi * f1 * t + p1) + 0.3 * math.sin(2 * math.pi * f2 * t + p2)
                + 0.1 * (nyk[i] * (1 - u) + nyk[i + 1] * u))
    return f


def viivat():
    """Laudan 16 viivaa myllyjen järjestyksessä (neliöiden sivut 12 + keskilinjat 4): (alku, loppu)."""
    v = []
    for a in NELIOT:
        v += [((-a, a), (a, a)), ((a, a), (a, -a)), ((a, -a), (-a, -a)), ((-a, -a), (-a, a))]
    s, t = NELIOT[0], NELIOT[2]
    v += [((0, s), (0, t)), ((s, 0), (t, 0)), ((0, -s), (0, -t)), ((-s, 0), (-t, 0))]
    return v


def veto_polku(p0, p1, rnd, heilunta, yli, vino, n=48, yli_loppu=None):
    """Vedon keskiviiva: suora + käsivedon heilunta, vinous (päiden sivusiirto) ja yliveto päistä.
    Palauttaa (koko veto, pisteiden välinen osa myllyn hehkulle)."""
    (x0, y0), (x1, y1) = p0, p1; L = math.hypot(x1 - x0, y1 - y0); tx, ty = (x1 - x0) / L, (y1 - y0) / L
    nx, ny = -ty, tx; f = _kohina(rnd); a0, a1 = -rnd.uniform(*yli), L + rnd.uniform(*(yli_loppu or yli))
    v0, v1 = rnd.uniform(-vino, vino), rnd.uniform(-vino, vino)
    pts, sis = [], []
    for i in range(n + 1):
        s = a0 + (a1 - a0) * i / n; o = heilunta * f(i / n) + v0 + (v1 - v0) * (s / L)
        q = (x0 + tx * s + nx * o, y0 + ty * s + ny * o); pts.append(q)
        if 0 <= s <= L: sis.append(q)
    return pts, sis


def siirra(polku, d):
    """Polku siirrettynä sivulle d (normaalin suuntaan)."""
    q = []
    for i, (x, y) in enumerate(polku):
        a = polku[max(i - 1, 0)]; c = polku[min(i + 1, len(polku) - 1)]
        tx, ty = c[0] - a[0], c[1] - a[1]; l = math.hypot(tx, ty); q.append((x - ty / l * d, y + tx / l * d))
    return q


def nauha(nimi, polku, lev, z_ala, z_yla, kapenee=1.0, lev_f=None):
    """Umpinainen nauha keskiviivaa pitkin (yläleveys lev, pohja lev·kapenee): V-ura tai suora ura."""
    bm = bmesh.new(); V = []
    for i, (x, y) in enumerate(polku):
        a = polku[max(i - 1, 0)]; c = polku[min(i + 1, len(polku) - 1)]
        tx, ty = c[0] - a[0], c[1] - a[1]; l = math.hypot(tx, ty); nx, ny = -ty / l, tx / l
        w = lev * (lev_f(i / (len(polku) - 1)) if lev_f else 1.0) / 2; wk = w * kapenee
        V.append([bm.verts.new((x + nx * w, y + ny * w, z_yla)), bm.verts.new((x - nx * w, y - ny * w, z_yla)),
                  bm.verts.new((x - nx * wk, y - ny * wk, z_ala)), bm.verts.new((x + nx * wk, y + ny * wk, z_ala))])
    for i in range(len(V) - 1):
        a, c = V[i], V[i + 1]
        for j in range(4):
            bm.faces.new((a[j], a[(j + 1) % 4], c[(j + 1) % 4], c[j]))
    bm.faces.new(tuple(reversed(V[0]))); bm.faces.new(tuple(V[-1]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(nimi); bm.to_mesh(me); bm.free()
    return bpy.data.objects.new(nimi, me)


def _tiilen_muoto(rnd, P):
    """Murtunut tiilenpala: pitkät sivut (ylä/ala) valetut ja suorat, vasen ja oikea pää rosoisia murtopintoja."""
    bm = bmesh.new(); ylin = 0.492
    oik = [(0.5 - rnd.uniform(0.0, 0.035), ylin - (2 * ylin) * i / 5) for i in range(6)]
    vas = [(-0.5 + rnd.uniform(0.0, 0.035), -ylin + (2 * ylin) * i / 5) for i in range(6)]
    vy = [bm.verts.new((x, y, 0.0)) for x, y in oik + vas]
    f = bm.faces.new(vy[::-1]); bmesh.ops.recalc_face_normals(bm, faces=[f])
    if f.normal.z < 0: f.normal_flip()
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    for v in r['geom']:
        if isinstance(v, bmesh.types.BMVert): v.co.z = -P
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new('lauta'); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('lauta', me); bpy.context.scene.collection.objects.link(o)
    return o


def lauta(mat):
    rnd = random.Random({'majatalo': 3, 'luostari': 1250, 'viikinkilaiva': 900}[NIMI])
    P = T['paksuus']
    if T.get('murtuma'):
        o = _tiilen_muoto(rnd, P)
    else:
        bpy.ops.mesh.primitive_cube_add(size=1); o = bpy.context.object; o.name = 'lauta'
        o.scale = (1.0, 1.0, P); o.location = (0, 0, -P / 2); bpy.ops.object.transform_apply(scale=True)
    md = o.modifiers.new('viiste', 'BEVEL'); md.width = T['viiste']; md.segments = T['viiste_os']
    # urat ja kuopat erillisinä leikkaajina kokoelmassa (yksi päällekkäinen leikkaaja tyhjensi laudan EXACT-ratkaisijalla)
    kok = bpy.data.collections.new('leikkaajat'); bpy.context.scene.collection.children.link(kok)
    polut, vedot = [], []
    for j, (p0, p1) in enumerate(viivat()):
        pitka = j < 4 or j >= 12                               # ulkoneliö ja keskilinjat: pitkä yliveto
        yli = T['yli'] if pitka else (T['yli'][0], T['yli'][1] * 0.35)
        sisa = (T['yli'][0], T['yli'][1] * 0.12)               # keskilinjan sisäpää ei mene sisäneliöön
        pol, sis = veto_polku(p0, p1, rnd, T['heilunta'], yli, T['vino'], yli_loppu=sisa if j >= 12 else None)
        lf = (lambda g: (lambda t: 0.92 + 0.16 * g(t)))(_kohina(rnd)) if T['heilunta'] else None
        kok.objects.link(nauha('ura', pol, T['ura_lev'], -T['ura_syv'], 0.01, T['kapenee'], lf))
        polut.append(sis); vedot.append(pol)
    if T['kuoppa_r']:
        for x, y in pisteet():
            bm = bmesh.new()
            c = bmesh.ops.create_cone(bm, cap_ends=True, segments=40, radius1=T['kuoppa_r'], radius2=T['kuoppa_r'], depth=0.02)
            for v in c['verts']:
                v.co.x += x; v.co.y += y; v.co.z = (-T['kuoppa_syv'] if v.co.z < 0 else 0.01)
            me = bpy.data.meshes.new('kuoppa'); bm.to_mesh(me); bm.free(); kok.objects.link(bpy.data.objects.new('kuoppa', me))
    if T.get('murtuma'):
        # lohkeamat murtopäissä ja kulmissa
        for _ in range(14):
            sx = rnd.choice((-1, 1)); bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=rnd.uniform(0.015, 0.05),
                location=(sx * rnd.uniform(0.48, 0.53), rnd.uniform(-0.5, 0.5), rnd.uniform(0.012, 0.03)))
            c = bpy.context.object; c.scale = (1, rnd.uniform(1, 2.2), rnd.uniform(0.4, 0.8))
            for kk in c.users_collection: kk.objects.unlink(c)
            kok.objects.link(c)
    bo = o.modifiers.new('kaiverrus', 'BOOLEAN'); bo.operation = 'DIFFERENCE'; bo.operand_type = 'COLLECTION'; bo.collection = kok
    bo.solver = 'EXACT'
    o.modifiers.move(len(o.modifiers) - 1, 0)                 # leikkaus ennen viistettä
    kok.hide_render = True; kok.hide_viewport = True
    o.data.materials.append(mat)
    if T.get('reunat'):
        # märkään saveen painetun uran reunat nousevat: matala harjanne uran molemmin puolin, urat leikkaavat ristikohdat
        for pol in vedot:
            for puoli in (-1, 1):
                h = nauha('reuna', siirra(pol, puoli * (T['ura_lev'] / 2 + 0.0016)), 0.0012, -0.003, 0.0011, 4.0)
                bpy.context.scene.collection.objects.link(h); h.data.materials.append(mat)
                hb = h.modifiers.new('leikkaus', 'BOOLEAN'); hb.operation = 'DIFFERENCE'; hb.operand_type = 'COLLECTION'
                hb.collection = kok; hb.solver = 'EXACT'
                h.modifiers.new('sileys', 'SUBSURF').levels = 1
    if T['upotus'] is not None:
        # vaahteraupotus: ohut levy laudan sisällä; näkyy vain urissa ja kuopissa (muualla puu peittää)
        bpy.ops.mesh.primitive_cube_add(size=1); u = bpy.context.object; u.name = 'upotus'
        u.scale = (0.96, 0.96, T['ura_syv']); u.location = (0, 0, T['upotus'] - T['ura_syv'] / 2)
        u.data.materials.append(puu_proseduraali('upotus', (0.62, 0.45, 0.24), (0.55, 0.38, 0.19), 0.3, skaala=40, coat=0.35))
    return o, polut


def nappula(nimi, x, y, mat, nosto=0.0):
    """Nappula profiilista Screw-muokkaimella: sorvattu (majatalo), kiekko (luostari), kupu (viikinkilaiva)."""
    R = NAPPULA_R
    prof = {
        'sorvattu': [(0, 0.0), (R * 0.92, 0.0), (R, 0.004), (R, 0.012), (R * 0.97, 0.015), (R * 0.90, 0.016),
                     (R * 0.88, 0.018), (R * 0.93, 0.020), (R * 0.90, 0.026), (R * 0.70, 0.031), (R * 0.35, 0.034), (0, 0.035)],
        'kiekko':   [(0, 0.0), (R * 0.95, 0.0), (R, 0.003), (R, 0.011), (R * 0.97, 0.014), (R * 0.85, 0.0165),
                     (R * 0.5, 0.018), (0, 0.0185)],
        'kupu':     [(0, 0.0), (R * 0.97, 0.0), (R, 0.003), (R * 0.97, 0.011), (R * 0.88, 0.020), (R * 0.72, 0.028),
                     (R * 0.50, 0.034), (R * 0.25, 0.037), (0, 0.038)],
    }[T['nappula']]
    me = bpy.data.meshes.new(nimi); me.from_pydata([(r, 0, z) for r, z in prof], [(i, i + 1) for i in range(len(prof) - 1)], [])
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o)
    sc = o.modifiers.new('sorvi', 'SCREW'); sc.steps = 64; sc.render_steps = 64; sc.use_merge_vertices = True
    o.modifiers.new('sileys', 'SUBSURF').levels = 1
    pohja = T['upotus'] if T['upotus'] is not None else -T['kuoppa_syv'] * 0.15 + (0.0008 if T.get('reunat') else 0.0)
    o.location = (x, y, pohja + nosto); o.data.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.shade_smooth()
    return o


def ura_hehku(polku, mat, nimi='hehku'):
    """Myllyn hehku urassa: ohut emissiivinen nauha uran pohjalla vedon keskiviivaa pitkin."""
    pohja = T['upotus'] if T['upotus'] is not None else -T['ura_syv'] * 0.55
    o = nauha(nimi, polku, T['ura_lev'] * (0.8 if T['upotus'] is not None else 0.4), pohja + 0.0002, pohja + 0.0012)
    bpy.context.scene.collection.objects.link(o); o.data.materials.append(mat)
    return o


def rengas(nimi, x, y, r, vari, voima):
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=0.0011, location=(x, y, 0.0005))
    t = bpy.context.object; t.name = nimi; t.data.materials.append(emissio(nimi, vari, voima))
    return t


def valot():
    sc = bpy.context.scene
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.30, 0.26, 0.22, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
    d = bpy.data.lights.new('avain', 'AREA'); d.energy = 42; d.size = 1.2; d.color = (1.0, 0.92, 0.82)
    o = bpy.data.objects.new('avain', d); sc.collection.objects.link(o)
    o.location = (-0.9, 0.9, 1.6); o.rotation_euler = (Vector((0, 0, 0)) - o.location).to_track_quat('-Z', 'Y').to_euler()


def kamera(koko_px, ala=1.0):
    sc = bpy.context.scene
    cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; cd.ortho_scale = ala; cd.clip_end = 10
    k = bpy.data.objects.new('k', cd); sc.collection.objects.link(k); sc.camera = k; k.location = (0, 0, 3)
    sc.render.resolution_x = sc.render.resolution_y = koko_px; sc.render.resolution_percentage = 100


def materiaalit():
    if NIMI == 'majatalo':
        return {'vaalea': puu_proseduraali('vaahtera', (0.66, 0.48, 0.28), (0.52, 0.36, 0.19), 0.35),
                'tumma': puu_proseduraali('pahkina', (0.11, 0.06, 0.035), (0.05, 0.028, 0.016), 0.3)}
    if NIMI == 'luostari':   # luukiekko ja pelkistävästi poltettu tumma savikiekko
        return {'vaalea': kivi_proseduraali('luu', (0.88, 0.83, 0.70), (0.78, 0.71, 0.56), 0.45, sss=0.15),
                'tumma': kivi_proseduraali('savi', (0.075, 0.062, 0.055), (0.040, 0.034, 0.030), 0.7, skaala=30)}
    return {'vaalea': kivi_proseduraali('hirvensarvi', (0.80, 0.73, 0.58), (0.66, 0.57, 0.42), 0.4, sss=0.15),
            'tumma': lasi('lasi', (0.006, 0.032, 0.014))}   # Birka 750: tummanvihreä lasi


def lauta_materiaali():
    return {'majatalo': lauta_majatalo, 'luostari': lauta_luostari, 'viikinkilaiva': lauta_viikinkilaiva}[NIMI]()


def rakenna(naytteita):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for dv in pr.devices: dv.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.cycles.samples = naytteita; sc.cycles.use_denoising = True
    sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
    valot()
    return materiaalit()


N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 128
KULTA, PUNA = (1.0, 0.50, 0.08), (0.9, 0.12, 0.06)
KOHDE_R = max(T['kuoppa_r'], 0.013) + 0.004

if '--malli' in A:
    ULOS = A[A.index('--malli') + 1]; KOKO = int(A[A.index('--koko') + 1]) if '--koko' in A else LAUTA_KOKO
    M = rakenna(N); kamera(KOKO); bpy.context.scene.render.film_transparent = True
    _, polut = lauta(lauta_materiaali()); P = pisteet()
    # Mallitilanne: vaalea mylly ulkoneliön yläsivulla (0, 1, 2) hehkuu; tummat 9, 11, 21, 12; valittu vaalea 15
    # (nostettu); poistettava tumma 12 (punainen rengas); kohde tyhjä piste 13 (kultainen rengas kuopassa).
    for i in (0, 1, 2, 7): nappula(f'v{i}', *P[i], M['vaalea'])
    for i in (9, 11, 21, 12): nappula(f't{i}', *P[i], M['tumma'])
    nappula('v15', *P[15], M['vaalea'], nosto=0.012)
    ura_hehku(polut[0], emissio('kulta', KULTA, T.get('hehku', 0.55)))
    rengas('valittu', *P[15], NAPPULA_R + 0.005, KULTA, 0.8)
    rengas('poistettava', *P[12], NAPPULA_R + 0.005, PUNA, 0.8)
    rengas('kohde', *P[13], KOHDE_R, KULTA, 0.8)
    bpy.context.scene.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('MYLLY: malli', NIMI, ULOS)

if '--kerros' in A:
    i = A.index('--kerros'); KERROS, ULOS = A[i + 1], A[i + 2]
    M = rakenna(N); sc = bpy.context.scene; sc.render.film_transparent = True
    if KERROS in ('lauta', 'hehku'):
        kamera(LAUTA_KOKO)
        o, polut = lauta(lauta_materiaali())
        if KERROS == 'hehku':
            # kaikkien 16 myllyviivan hehku; lauta piiloon kamerasta → pelkkä hehku alfana (koodi rajaa myllyn suorakaiteella)
            mat = emissio('kulta', KULTA, T.get('hehku', 0.55))
            for k, pol in enumerate(polut): ura_hehku(pol, mat, f'hehku{k}')
            for ob in bpy.data.objects:
                if ob.type == 'MESH' and not ob.name.startswith('hehku'): ob.visible_camera = False
    elif KERROS in ('vaalea', 'tumma'):
        kamera(NAPPULA_KOKO, ala=NAPPULA_KOKO / LAUTA_KOKO); nappula(KERROS, 0, 0, M[KERROS])
    elif KERROS == 'varjo':
        # nappulan varjo varjonsieppaajalle (nappula itse ei näy); alfa = varjon tummuus
        kamera(NAPPULA_KOKO, ala=NAPPULA_KOKO / LAUTA_KOKO); o = nappula('varjo', 0, 0, M['tumma']); o.visible_camera = False
        bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, o.location.z)); bpy.context.object.is_shadow_catcher = True
    else:
        kamera(RENGAS_KOKO, ala=RENGAS_KOKO / LAUTA_KOKO)
        r = KOHDE_R if KERROS == 'kohde' else NAPPULA_R + 0.005
        rengas(KERROS, 0, 0, r, PUNA if KERROS == 'poistettava' else KULTA, 0.8)
    sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('MYLLY: kerros', NIMI, KERROS, ULOS)

if '--json' in A:
    # pisteet.json (Siirtoseppä 1.10.): 24 pistettä normalisoituna 0–1 (x oikealle, y alas) Mylly.Paikat-järjestyksessä,
    # nappulan halkaisija laudan osuutena, myllyt pisteindekseinä ja kerrostiedostot laudoittain
    import json
    ULOS = A[A.index('--json') + 1]
    d = {'pisteet': [[round(0.5 + x, 6), round(0.5 - y, 6)] for x, y in pisteet()],
         'nappula_halkaisija': round(2 * NAPPULA_R, 4), 'myllyt': [list(m) for m in myllyt()],
         'koot_px': {'lauta': LAUTA_KOKO, 'nappula': NAPPULA_KOKO, 'rengas': RENGAS_KOKO},
         'laudat': {t: {'nimi': n, 'lauta': f'lauta-{t}.png', 'hehku': f'hehku-{t}.png',
                        'vaalea': f'nappula-vaalea-{t}.png', 'tumma': f'nappula-tumma-{t}.png', 'varjo': f'nappula-varjo-{t}.png'}
                    for t, n in (('majatalo', 'Majatalo 1873'), ('luostari', 'Luostari 1200-l.'), ('viikinkilaiva', 'Viikinkilaiva n. 900'))},
         'renkaat': {k: f'rengas-{k}.png' for k in ('valittu', 'poistettava', 'kohde')},
         'hehku_rajaus': 'myllyn suorakaide = sen kolmen pisteen rajat ± 0,03 laudasta (ristiviivojen vuoto jää nappuloiden alle)'}
    with open(ULOS, 'w') as f: json.dump(d, f, ensure_ascii=False, indent=1)
    print('MYLLY: json', ULOS)
