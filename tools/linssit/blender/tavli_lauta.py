# TAVLIN LAUDAT (Linnanrakentaja 5.10.2026; Siirtosepän suunnitelma docs/raportit/tavli-suunnitelma-20261005.md,
# Päätoimittaja hyväksyi 01.1x). Avattu puinen taittolauta ylhäältä, 4:3 (2048 × 1536 px), kaksi kenttää à 12 kolmiota,
# keskipalkki saranoineen, reunoilla poistoalueet (oikea: kummankin pelaajan poistolokero; vasen: tyhjä lokero symmetrian vuoksi).
#   kafeneio   Kafeneio 1873: pähkinäkehys, oliivipuukenttä, eebenin- ja puksipuun kolmiot, puksipuinen meanderi-upotus ja
#              helmiäisnapit kehyksessä, messinkisaranat; nappulat sorvattua puksipuuta ja pähkinää.
#   bysantti   Bysantin tabula n. 480 (ei säilynyttä lautaa; uskottava myöhäisantiikin puulauta, piirretty kuvauksen mukaan):
#              tumma öljytty setrikehys, vaalea puukenttä, luunvaaleat ja tummat kolmiot; kehyksessä ja keskipalkissa luuhelat,
#              joihin kaiverrettu ympyrä-piste-kuvio; patinoidut pronssisaranat; nappulat luuta (ympyrä-piste) ja mustaa lasia.
#              Tyylilähteenä vain Gloucester Tabula Set n. 1100–1120 tekstikuvauksena.
#   ottomaani  Ottomaanien tavla, Istanbul 1600-luku (piirretty kuvauksen mukaan; esikuva V&A 861-1907 vain tekstikuvauksena):
#              kilpikonnankilpikehys ja -kolmiot (kultainen pohja hehkuu läpi), luulistat, tumma puukenttä, helmiäiskolmiot
#              (laattamaiset palat) ja helmiäiskypressit kentän keskellä ja keskipalkissa, kultamessinkisaranat;
#              nappulat norsunluuta (helmiäisupotus) ja eebenpuuta (helmiäispiste).
#   Uudet tyylit vaihtavat vain materiaalit ja koristeet: mitat ja kolmioiden geometria ovat samat kuin kafeneiolla.
# Mittakaava: laudan leveys = 1 (x −0,5…0,5), korkeus 0,75; kentän pinta z = 0; kamera ortografinen ylhäältä.
#   Blender -b -P tavli_lauta.py -- --tyyli <kafeneio|bysantti|ottomaani> --kerros <lauta|vaalea|tumma|varjo|malli> <ulos.png> [--naytteita 128]
#   Blender -b -P tavli_lauta.py -- --json <tavli-mitat.json>
# Tekstuurit Poly Haven, CC0: wood_table_worn (Dimitrios Savva, Rico Cilliers), grey_oak_veneer_02 (Jenelle van Heerden).
# Kafeneio: wood_table_worn + grey_oak_veneer_02; bysantti ja ottomaani: samat kaksi tekstuuria väritettyinä.
# Meanderi- ja ympyrä-piste-upotusten maskit piirretään tässä (numpy), muut kuviot (luu, kilpikonnankilpi, helmiäinen,
# patinoitu pronssi) proseduraalisia solmuja.
import math, os, sys, json
import bpy, bmesh
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
PH = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven'
LEV_PX, KOR_PX = 2048, 1536
W, H = 1.0, 0.75
REUNA = 0.03                       # ulkokehys
KENTTA_X = (0.04, 0.40)            # oikean kentän x-väli (vasen peilikuva); keskipalkki ±0,04
LOKERO_X = (0.41, 0.47)            # poistolokero (oikea) ja tyhjä lokero (vasen); välissä kisko 0,40–0,41
KENTTA_Y = 0.345                   # kentän y-raja ±
KANTA = (KENTTA_X[1] - KENTTA_X[0]) / 6          # kolmion kanta 0,06
KOLMIO_K = 0.29                    # kolmion korkeus
NAPPULA_R = 0.92 * KANTA / 2       # Siirtoseppä: halkaisija 0,92 × kanta
KORKO = 0.012                      # kehyksen, palkin ja kiskojen korkeus kentän yläpuolella
NAPPULA_KOKO = 160                 # nappulakerroksen kangas (px), samassa mittakaavassa kuin lauta
NIMI = A[A.index('--tyyli') + 1] if '--tyyli' in A else 'kafeneio'


def kolmiot():
    """24 kolmiota: a0 = oikea alakulma (x 0,37), a0–a5 oikea alakenttä oikealta vasemmalle, a6–a11 vasen alakenttä,
    a12–a17 vasen yläkenttä vasemmalta oikealle, a18–a23 oikea yläkenttä (vastapäivään laudan ympäri)."""
    k = []
    xs_oik = [KENTTA_X[1] - KANTA * (i + 0.5) for i in range(6)]         # 0,37 … 0,07
    xs_vas = [-KENTTA_X[0] - KANTA * (i + 0.5) for i in range(6)]        # −0,07 … −0,37
    for x in xs_oik + xs_vas:                                            # alarivi
        k.append(((x - KANTA / 2, -KENTTA_Y), (x + KANTA / 2, -KENTTA_Y), (x, -KENTTA_Y + KOLMIO_K)))
    for x in list(reversed(xs_vas)) + list(reversed(xs_oik)):            # ylärivi vasemmalta oikealle
        k.append(((x - KANTA / 2, KENTTA_Y), (x + KANTA / 2, KENTTA_Y), (x, KENTTA_Y - KOLMIO_K)))
    return k


def px(x, y):
    return [round((x + W / 2) * LEV_PX, 1), round((H / 2 - y) * LEV_PX, 1)]


# ---------- materiaalit ----------
def _solmut(nimi):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree
    return m, nt, nt.nodes['Principled BSDF']


def _kuvat(nt, aineisto, skaala, venytys=(1, 1, 1), koko='4k'):
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = tuple(skaala * v for v in venytys); nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    k = {}
    for osa in ('diff', 'rough', 'nor'):
        t = nt.nodes.new('ShaderNodeTexImage')
        t.image = bpy.data.images.load(os.path.join(PH, aineisto, f'{aineisto}_{osa}_{koko}.jpg'))
        if osa != 'diff': t.image.colorspace_settings.name = 'Non-Color'
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector']); k[osa] = t
    return k, tc, mp


def _hsv(nt, ulos, s=1.0, v=1.0, h=0.5):
    n = nt.nodes.new('ShaderNodeHueSaturation'); n.inputs['Hue'].default_value = h
    n.inputs['Saturation'].default_value = s; n.inputs['Value'].default_value = v
    nt.links.new(ulos, n.inputs['Color']); return n.outputs['Color']


def _pinta(nt, k, b, vari, kar=(0.3, 0.55), nor=0.5, coat=0.35):
    rr = nt.nodes.new('ShaderNodeMapRange'); rr.inputs['To Min'].default_value = kar[0]; rr.inputs['To Max'].default_value = kar[1]
    nt.links.new(k['rough'].outputs['Color'], rr.inputs['Value']); nt.links.new(rr.outputs['Result'], b.inputs['Roughness'])
    nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = nor
    nt.links.new(k['nor'].outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    nt.links.new(vari, b.inputs['Base Color'])
    b.inputs['Coat Weight'].default_value = coat; b.inputs['Coat Roughness'].default_value = 0.22


def meanderi_kuva():
    """Puksipuinen meanderi-upotus kehykseen (laudan kokoinen maski, valkoinen = upotus). Kreikkalainen avain, jakso 0,03."""
    import numpy as np
    N, M = LEV_PX, KOR_PX
    yy, xx = np.mgrid[0:M, 0:N].astype(np.float32)
    x = xx / LEV_PX - W / 2; y = H / 2 - yy / LEV_PX
    maski = np.zeros((M, N), np.float32)
    nauha_ulko, nauha_sisa = 0.008, 0.024          # nauha kehyksessä (etäisyys laudan reunasta)
    reuna_d = np.minimum(W / 2 - np.abs(x), H / 2 - np.abs(y))
    nauha = (reuna_d > nauha_ulko) & (reuna_d < nauha_sisa)
    # nauhan kulkusuuntainen koordinaatti t ja poikittainen s (0–1); vaaka- ja pystyosuudet erikseen
    pysty = (W / 2 - np.abs(x)) < (H / 2 - np.abs(y))
    t = np.where(pysty, y, x); s = (reuna_d - nauha_ulko) / (nauha_sisa - nauha_ulko)
    P = 0.032; u = np.mod(t, P) / P
    # yksinkertainen avainkuvio 4 × 4 -ruudukossa (yksi jakso)
    kuvio = np.array([[1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 0, 1], [1, 0, 0, 1]], np.float32)
    iu = np.clip((u * 4).astype(int), 0, 3); isv = np.clip((s * 4).astype(int), 0, 3)
    arvo = kuvio[3 - isv, iu]
    maski[nauha] = arvo[nauha]
    # reunaviivat nauhan molemmin puolin
    viiva = (np.abs(reuna_d - (nauha_ulko - 0.0018)) < 0.0007) | (np.abs(reuna_d - (nauha_sisa + 0.0018)) < 0.0007)
    maski[viiva] = 1.0
    kuva = bpy.data.images.new('meanderi', N, M, alpha=False, float_buffer=False)
    rgba = np.repeat(np.flipud(maski)[..., None], 4, axis=2); rgba[..., 3] = 1
    kuva.colorspace_settings.name = 'Non-Color'   # ennen pikseleitä: väriavaruuden vaihto tyhjentää luodun kuvan puskurin
    kuva.pixels.foreach_set(rgba.ravel()); kuva.pack()
    return kuva


def koriste_kuva():
    """Bysantti: luuhelat (kehys ja keskipalkki), joissa kaiverrettu ympyrä-piste. Ottomaani: ohuet luulistat ja -pisteet.
    Laudan kokoinen RGBA-kuva (sRGB, suora alfa; alfa = upotuksen peitto), pehmeät reunat 1 px."""
    import numpy as np
    N, M = LEV_PX, KOR_PX; p1 = 1.0 / LEV_PX
    yy, xx = np.mgrid[0:M, 0:N].astype(np.float32)
    x = (xx + 0.5) / LEV_PX - W / 2; y = H / 2 - (yy + 0.5) / LEV_PX; ax, ay = np.abs(x), np.abs(y)
    reuna_d = np.minimum(W / 2 - ax, H / 2 - ay)
    kulma = (ax > W / 2 - REUNA) & (ay > H / 2 - REUNA)
    pysty = ((W / 2 - ax) < (H / 2 - ay)) & ~kulma & (reuna_d < REUNA)
    vaaka = ~pysty & ~kulma & (reuna_d < REUNA)
    cx0, cy0 = W / 2 - REUNA / 2, H / 2 - REUNA / 2                  # kulmaruudun keskipiste (±0,485, ±0,36)
    Ph, Pv = 2 * cx0 / 40, 2 * cy0 / 30                               # jaksot siten, että kuvio osuu kulmiin
    u = np.where(vaaka, np.mod(x + cx0 + Ph / 2, Ph) - Ph / 2, np.where(pysty, np.mod(y + cy0 + Pv / 2, Pv) - Pv / 2, x - np.sign(x) * cx0))
    v = np.where(kulma, y - np.sign(y) * cy0, reuna_d - REUNA / 2)
    r = np.hypot(u, v)
    peite = lambda d: np.clip(0.5 - d / p1, 0, 1)
    esi = np.zeros((M, N, 3), np.float32); alfa = np.zeros((M, N), np.float32)
    def kerros(a, vari):
        nonlocal alfa
        esi[:] = esi * (1 - a[..., None]) + np.array(vari, np.float32) * a[..., None]; alfa = alfa + a * (1 - alfa)
    palkki_x, palkki_y = np.abs(x) < 0.04, ay < KENTTA_Y
    if NIMI == 'bysantti':
        luu, kaiverrus = (0.82, 0.75, 0.60), (0.20, 0.115, 0.06)
        kaista = peite(np.maximum(0.0065 - reuna_d, reuna_d - 0.0235)) * (reuna_d < REUNA)       # luukaista kehyksessä
        kerros(kaista, luu)
        merkki = np.maximum(peite(np.abs(r - 0.0062) - 0.0010), peite(r - 0.0022)) * np.where(kulma | vaaka | pysty, 1, 0)
        kerros(merkki * kaista, kaiverrus)
        P = 0.0285; k = np.round(y / P); yk = k * P                                              # keskipalkin luukaista
        kaista_p = peite(np.maximum(ax - 0.026, ay - 0.335)) * palkki_x * palkki_y
        kerros(kaista_p, luu)
        r2 = np.hypot(x, y - yk); ok = (np.abs(yk) <= 0.3135) & (np.abs(np.abs(yk) - 0.22) > 0.047)   # ei saranoiden alle
        kerros(np.maximum(peite(np.abs(r2 - 0.0095) - 0.0012), peite(r2 - 0.0030)) * ok * kaista_p, kaiverrus)
    else:
        luu = (0.93, 0.89, 0.77)
        for s in (0.0047, 0.0253): kerros(peite(np.abs(reuna_d - s) - 0.0010) * (reuna_d < REUNA), luu)
        kerros(np.maximum(peite(r - 0.0022) * (vaaka | pysty), peite(r - 0.0036) * kulma), luu)
        kerros(peite(np.abs(ax - 0.0345) - 0.0010) * palkki_x * palkki_y * (ay < 0.335), luu)
    rgb = esi / np.maximum(alfa[..., None], 1e-6)
    rgba = np.concatenate([rgb, alfa[..., None]], axis=2)
    kuva = bpy.data.images.new('koriste', N, M, alpha=True, float_buffer=False)
    kuva.pixels.foreach_set(np.flipud(rgba).astype(np.float32).ravel()); kuva.alpha_mode = 'STRAIGHT'; kuva.pack()
    return kuva


def kehys_materiaali():
    if NIMI in UUDET: return kehys_uusi()
    m, nt, b = _solmut('kehys'); k, tc, _ = _kuvat(nt, 'wood_table_worn', 1.4)
    pahkina = _hsv(nt, k['diff'].outputs['Color'], s=1.05, v=0.62)
    # meanderi: maski objektikoordinaateista (u = x + 0,5, v = (y + 0,375) / 0,75)
    ge = nt.nodes.new('ShaderNodeNewGeometry')   # maailmakoordinaatit (kiskot ovat erillisiä objekteja)
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(ge.outputs['Position'], sep.inputs[0])
    u = nt.nodes.new('ShaderNodeMath'); u.operation = 'ADD'; u.inputs[1].default_value = 0.5; nt.links.new(sep.outputs['X'], u.inputs[0])
    v = nt.nodes.new('ShaderNodeMath'); v.operation = 'MULTIPLY_ADD'; v.inputs[1].default_value = 1 / H; v.inputs[2].default_value = 0.5
    nt.links.new(sep.outputs['Y'], v.inputs[0])
    c = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(u.outputs[0], c.inputs['X']); nt.links.new(v.outputs[0], c.inputs['Y'])
    mt = nt.nodes.new('ShaderNodeTexImage'); mt.image = meanderi_kuva(); mt.interpolation = 'Closest'; mt.extension = 'CLIP'
    nt.links.new(c.outputs['Vector'], mt.inputs['Vector'])
    puksi = _hsv(nt, k['diff'].outputs['Color'], s=0.7, v=2.6, h=0.53)
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
    nt.links.new(mt.outputs['Color'], mx.inputs['Factor']); nt.links.new(pahkina, mx.inputs['A']); nt.links.new(puksi, mx.inputs['B'])
    _pinta(nt, k, b, mx.outputs['Result'], (0.25, 0.5), 0.5, 0.45)
    return m


def _koriste_solmu(nt):
    """Koristekuva laudan koordinaateista (kuten meanderi); palauttaa (alfa, väri)."""
    ge = nt.nodes.new('ShaderNodeNewGeometry'); sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(ge.outputs['Position'], sep.inputs[0])
    u = nt.nodes.new('ShaderNodeMath'); u.operation = 'ADD'; u.inputs[1].default_value = 0.5; nt.links.new(sep.outputs['X'], u.inputs[0])
    v = nt.nodes.new('ShaderNodeMath'); v.operation = 'MULTIPLY_ADD'; v.inputs[1].default_value = 1 / H; v.inputs[2].default_value = 0.5
    nt.links.new(sep.outputs['Y'], v.inputs[0])
    c = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(u.outputs[0], c.inputs['X']); nt.links.new(v.outputs[0], c.inputs['Y'])
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = koriste_kuva(); t.interpolation = 'Linear'; t.extension = 'CLIP'
    nt.links.new(c.outputs['Vector'], t.inputs['Vector']); return t.outputs['Alpha'], t.outputs['Color']


def kehys_uusi():
    if NIMI == 'ottomaani':
        m, nt, b = _solmut('kehys'); v = _kilpikonna_vari(nt, 14)
        al, luu = _koriste_solmu(nt); kohta = _sekoita(nt, al, v, luu)
        musta = nt.nodes.new('ShaderNodeRGB'); musta.outputs[0].default_value = (0, 0, 0, 1)
        nt.links.new(kohta, b.inputs['Base Color']); nt.links.new(_sekoita(nt, al, v, musta.outputs[0]), b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = 0.12; b.inputs['Roughness'].default_value = 0.25
        b.inputs['Coat Weight'].default_value = 0.8; b.inputs['Coat Roughness'].default_value = 0.1
        return m
    m, nt, b = _solmut('kehys'); k, tc, _ = _kuvat(nt, 'wood_table_worn', 1.4)      # bysantti: tumma öljytty setri
    puu = _hsv(nt, k['diff'].outputs['Color'], s=1.15, v=0.40, h=0.49)
    al, luu = _koriste_solmu(nt)
    juova = _ramppi(nt, _kohina(nt, 1.0, (40, 40, 4), 5, 0.6, 0.3), [(0.35, (0.78, 0.76, 0.70)), (0.65, (1, 1, 1))])
    tulo = nt.nodes.new('ShaderNodeMix'); tulo.data_type = 'RGBA'; tulo.blend_type = 'MULTIPLY'; tulo.inputs['Factor'].default_value = 1.0
    nt.links.new(luu, tulo.inputs['A']); nt.links.new(juova, tulo.inputs['B'])
    _pinta(nt, k, b, _sekoita(nt, al, puu, tulo.outputs['Result']), (0.25, 0.5), 0.5, 0.45)
    return m


def kentta_uusi():
    m, nt, b = _solmut('kentta')
    if NIMI == 'bysantti':      # vaalea hunajanvärinen puu
        k, _, _ = _kuvat(nt, 'grey_oak_veneer_02', 1.2, (1, 1.6, 1))
        _pinta(nt, k, b, _hsv(nt, k['diff'].outputs['Color'], s=1.7, v=1.05, h=0.52), (0.35, 0.6), 0.35, 0.3)
    else:                       # ottomaani: tumma puu
        k, _, _ = _kuvat(nt, 'wood_table_worn', 1.0, (1, 1.8, 1))
        _pinta(nt, k, b, _hsv(nt, k['diff'].outputs['Color'], s=1.15, v=0.38, h=0.485), (0.3, 0.55), 0.35, 0.35)
    return m


def kolmio_uusi(nimi, tumma):
    if NIMI == 'ottomaani':
        return kilpikonna_materiaali(nimi, 16, 0.5) if tumma else helmiainen_materiaali(nimi, 70)
    if tumma:
        m, nt, b = _solmut(nimi); k, _, _ = _kuvat(nt, 'wood_table_worn', 2.2, (1, 2.5, 1))
        _pinta(nt, k, b, _hsv(nt, k['diff'].outputs['Color'], s=1.0, v=0.385, h=0.49), (0.3, 0.5), 0.3, 0.4)
        return m
    return luu_materiaali(nimi, 1.08, 0.4, (90, 10, 1))


def nappula_uusi(tumma):
    """Bysantti: luunappula (ympyrä-piste) / musta lasi. Ottomaani: norsunluu (helmiäisupotus) / eebenpuu (helmiäispiste)."""
    R = NAPPULA_R; m, nt, b = _solmut(('tumma' if tumma else 'vaalea') + '-' + NIMI); d = _radiaali(nt)
    if NIMI == 'bysantti' and not tumma:
        f = _kohina(nt, 45, (1, 1, 1), 6, 0.6, 0.3)
        luu = _ramppi(nt, f, [(0.35, (1.20, 1.08, 0.80)), (0.65, (1.40, 1.32, 1.08))])
        merkki = _maksimi(nt, _rengas(nt, d, 0.26 * R, 0.045 * R), _rengas(nt, d, 0.0, 0.10 * R))
        ruskea = nt.nodes.new('ShaderNodeRGB'); ruskea.outputs[0].default_value = (0.09, 0.05, 0.025, 1)
        nt.links.new(_sekoita(nt, merkki, luu, ruskea.outputs[0]), b.inputs['Base Color'])
        b.inputs['Roughness'].default_value = 0.3; b.inputs['Coat Weight'].default_value = 0.4; b.inputs['Coat Roughness'].default_value = 0.15
    elif NIMI == 'bysantti':
        lasi = nt.nodes.new('ShaderNodeRGB'); lasi.outputs[0].default_value = (0.004, 0.005, 0.006, 1)
        merkki = _maksimi(nt, _rengas(nt, d, 0.26 * R, 0.045 * R), _rengas(nt, d, 0.0, 0.10 * R))
        himmea = nt.nodes.new('ShaderNodeRGB'); himmea.outputs[0].default_value = (0.05, 0.06, 0.055, 1)   # kaiverrettu, mattapintainen
        nt.links.new(_sekoita(nt, merkki, lasi.outputs[0], himmea.outputs[0]), b.inputs['Base Color'])
        b.inputs['Roughness'].default_value = 0.05; b.inputs['Coat Weight'].default_value = 1.0; b.inputs['Coat Roughness'].default_value = 0.03
    elif not tumma:
        f = _kohina(nt, 45, (1, 1, 1), 6, 0.6, 0.3)
        luu = _ramppi(nt, f, [(0.35, (1.20, 1.09, 0.84)), (0.65, (1.35, 1.28, 1.05))])
        helmi = nt.nodes.new('ShaderNodeRGB'); helmi.outputs[0].default_value = (0.74, 0.80, 0.84, 1)
        ruskea = nt.nodes.new('ShaderNodeRGB'); ruskea.outputs[0].default_value = (0.20, 0.11, 0.05, 1)
        v = _sekoita(nt, _rengas(nt, d, 0.20 * R, 0.022 * R), luu, ruskea.outputs[0])
        nt.links.new(_sekoita(nt, _rengas(nt, d, 0.0, 0.18 * R), v, helmi.outputs[0]), b.inputs['Base Color'])
        b.inputs['Roughness'].default_value = 0.3; b.inputs['Coat Weight'].default_value = 0.4; b.inputs['Coat Roughness'].default_value = 0.15
    else:
        eeben = nt.nodes.new('ShaderNodeRGB'); eeben.outputs[0].default_value = (0.014, 0.011, 0.010, 1)
        helmi = nt.nodes.new('ShaderNodeRGB'); helmi.outputs[0].default_value = (0.80, 0.82, 0.84, 1)
        nt.links.new(_sekoita(nt, _rengas(nt, d, 0.0, 0.12 * R), eeben.outputs[0], helmi.outputs[0]), b.inputs['Base Color'])
        b.inputs['Roughness'].default_value = 0.2; b.inputs['Coat Weight'].default_value = 0.7; b.inputs['Coat Roughness'].default_value = 0.1
    return m


def kentta_materiaali():
    if NIMI in UUDET: return kentta_uusi()
    m, nt, b = _solmut('kentta'); k, _, _ = _kuvat(nt, 'grey_oak_veneer_02', 1.2, (1, 1.6, 1))
    _pinta(nt, k, b, _hsv(nt, k['diff'].outputs['Color'], s=1.5, v=1.0, h=0.535), (0.35, 0.6), 0.35, 0.3)  # oliivipuu
    return m


def kolmio_materiaali(nimi, tumma):
    if NIMI in UUDET: return kolmio_uusi(nimi, tumma)
    m, nt, b = _solmut(nimi)
    if tumma:
        k, _, _ = _kuvat(nt, 'wood_table_worn', 2.2, (1, 2.5, 1))
        vari = _hsv(nt, k['diff'].outputs['Color'], s=0.9, v=0.28)
    else:
        k, _, _ = _kuvat(nt, 'grey_oak_veneer_02', 2.0, (1, 2.5, 1))
        vari = _hsv(nt, k['diff'].outputs['Color'], s=1.6, v=2.2, h=0.545)  # puksipuu
    _pinta(nt, k, b, vari, (0.3, 0.5), 0.3, 0.4)
    return m


def yksi_vari(nimi, vari, kar=0.3, metalli=0.0, coat=0.0, sheen=0.0):
    m, nt, b = _solmut(nimi); b.inputs['Base Color'].default_value = (*vari, 1)
    b.inputs['Roughness'].default_value = kar; b.inputs['Metallic'].default_value = metalli
    b.inputs['Coat Weight'].default_value = coat; b.inputs['Sheen Weight'].default_value = sheen
    return m


def puu_sorvattu(nimi, vari1, vari2, kar=0.35):
    m, nt, b = _solmut(nimi); tc = nt.nodes.new('ShaderNodeTexCoord')
    w = nt.nodes.new('ShaderNodeTexWave'); w.wave_type = 'RINGS'; w.rings_direction = 'Z'
    w.inputs['Scale'].default_value = 14; w.inputs['Distortion'].default_value = 5.0; w.inputs['Detail'].default_value = 4
    nt.links.new(tc.outputs['Object'], w.inputs['Vector'])
    cr = nt.nodes.new('ShaderNodeValToRGB'); e = cr.color_ramp.elements
    e[0].color = (*vari1, 1); e[1].color = (*vari2, 1); e[0].position = 0.35; e[1].position = 0.95
    nt.links.new(w.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = kar; b.inputs['Coat Weight'].default_value = 0.5; b.inputs['Coat Roughness'].default_value = 0.2
    return m


# ---------- bysantti ja ottomaani: materiaalit ----------
UUDET = ('bysantti', 'ottomaani')
if NIMI not in ('kafeneio',) + UUDET: raise SystemExit(f'tuntematon tyyli: {NIMI}')


def _ramppi(nt, fac, pysaytykset):
    """Värirampi: pysaytykset = [(paikka, (r, g, b)), …] nousevassa järjestyksessä (lineaarinen väri)."""
    cr = nt.nodes.new('ShaderNodeValToRGB'); el = cr.color_ramp.elements
    el[0].position, el[0].color = pysaytykset[0][0], (*pysaytykset[0][1], 1)
    el[1].position, el[1].color = pysaytykset[-1][0], (*pysaytykset[-1][1], 1)
    for p, c in pysaytykset[1:-1]:
        e = el.new(p); e.color = (*c, 1)
    nt.links.new(fac, cr.inputs['Fac']); return cr.outputs['Color']


def _kohina(nt, skaala, venytys=(1, 1, 1), yksityiskohta=4, karheus=0.55, vaiste=0.0):
    """Kohinatekstuuri objektikoordinaateista (venytys säätää suuntaa); palauttaa Fac-ulostulon."""
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = venytys; nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = skaala; n.inputs['Detail'].default_value = yksityiskohta
    n.inputs['Roughness'].default_value = karheus; n.inputs['Distortion'].default_value = vaiste
    nt.links.new(mp.outputs['Vector'], n.inputs['Vector']); return n.outputs['Fac']


def _sekoita(nt, fac, a, b):
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
    nt.links.new(fac, mx.inputs['Factor']); nt.links.new(a, mx.inputs['A']); nt.links.new(b, mx.inputs['B'])
    return mx.outputs['Result']


def _radiaali(nt):
    """Etäisyys nappulan keskipisteestä (objektikoordinaatit, xy)."""
    tc = nt.nodes.new('ShaderNodeTexCoord'); sp = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Object'], sp.inputs[0])
    c = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(sp.outputs['X'], c.inputs['X']); nt.links.new(sp.outputs['Y'], c.inputs['Y'])
    vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'LENGTH'; nt.links.new(c.outputs['Vector'], vm.inputs[0])
    return vm.outputs['Value']


def _rengas(nt, d, keskus, puoli, aa=0.0003):
    """Maski (1 = rengas, jonka säde on keskus ja puolipaksuus puoli); keskus = 0 antaa täyden pisteen."""
    a = nt.nodes.new('ShaderNodeMath'); a.operation = 'SUBTRACT'; a.inputs[1].default_value = keskus; nt.links.new(d, a.inputs[0])
    b = nt.nodes.new('ShaderNodeMath'); b.operation = 'ABSOLUTE'; nt.links.new(a.outputs[0], b.inputs[0])
    cr = nt.nodes.new('ShaderNodeValToRGB'); e = cr.color_ramp.elements
    e[0].position, e[0].color = puoli, (1, 1, 1, 1); e[1].position, e[1].color = puoli + aa, (0, 0, 0, 1)
    nt.links.new(b.outputs[0], cr.inputs['Fac']); return cr.outputs['Color']


def _maksimi(nt, a, b):
    m = nt.nodes.new('ShaderNodeMath'); m.operation = 'MAXIMUM'; nt.links.new(a, m.inputs[0]); nt.links.new(b, m.inputs[1]); return m.outputs[0]


def luu_materiaali(nimi, tummempi=1.0, kar=0.38, venytys=(60, 8, 1)):
    """Luu / norsunluu: hienosyinen raidoitus (Schreger-viivat), lämmin kerma; tummempi < 1 vanhentaa luuta."""
    m, nt, b = _solmut(nimi)
    f = _kohina(nt, 1.0, venytys, 6, 0.6, 0.3)
    v = _ramppi(nt, f, [(0.35, (0.62 * tummempi, 0.52 * tummempi, 0.33 * tummempi)), (0.65, (0.86 * tummempi, 0.77 * tummempi, 0.55 * tummempi))])
    nt.links.new(v, b.inputs['Base Color']); b.inputs['Roughness'].default_value = kar
    b.inputs['Coat Weight'].default_value = 0.3; b.inputs['Coat Roughness'].default_value = 0.2
    return m


def _kilpikonna_vari(nt, skaala, kirkas=1.0):
    """Kilpikonnankilven väri: pehmeä meripihka, jossa epäsäännöllisiä tummia punaruskeita pilviä (vähän vääristymää)."""
    f = _kohina(nt, skaala, (1, 1, 1), 3, 0.55, 0.12)
    return _ramppi(nt, f, [(0.30, (0.018, 0.005, 0.002)), (0.44, (0.060, 0.015, 0.005)), (0.58, (0.155, 0.048, 0.009)), (0.72, (0.273, 0.113, 0.018))] if kirkas == 1.0 else [(0.30, (0.050, 0.014, 0.004)), (0.44, (0.17, 0.050, 0.012)), (0.58, (0.42, 0.155, 0.025)), (0.72, (0.80, 0.36, 0.06))])


def kilpikonna_materiaali(nimi, skaala=16, hehku=0.5):
    """Kilpikonnankilpi: kirjava punaruskea–meripihka; kultainen pohja hehkuu läpi (emissio meripihkaisista kohdista)."""
    m, nt, b = _solmut(nimi); v = _kilpikonna_vari(nt, skaala, 2.0)
    nt.links.new(v, b.inputs['Base Color']); nt.links.new(v, b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = hehku
    b.inputs['Roughness'].default_value = 0.25; b.inputs['Coat Weight'].default_value = 0.8; b.inputs['Coat Roughness'].default_value = 0.1
    return m


def helmiainen_materiaali(nimi, laatta=125):
    """Helmiäinen: pienet laattamaiset palat (Voronoi), laattojen sävy vaihtelee hieman (vaaleanpunainen/vihertävä/sinertävä),
    laattojen välissä tumma rako; kiiltävä pinta (coat + sheen) antaa irisoivan ilmeen."""
    m, nt, b = _solmut(nimi); tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (laatta, laatta, laatta); nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    v1 = nt.nodes.new('ShaderNodeTexVoronoi'); v1.feature = 'F1'; v1.inputs['Scale'].default_value = 1.0; nt.links.new(mp.outputs['Vector'], v1.inputs['Vector'])
    v2 = nt.nodes.new('ShaderNodeTexVoronoi'); v2.feature = 'DISTANCE_TO_EDGE'; v2.inputs['Scale'].default_value = 1.0; nt.links.new(mp.outputs['Vector'], v2.inputs['Vector'])
    pohja = nt.nodes.new('ShaderNodeRGB'); pohja.outputs[0].default_value = (1.11, 1.06, 1.00, 1)
    osuus = nt.nodes.new('ShaderNodeValue'); osuus.outputs[0].default_value = 0.45      # satunnaissävyn osuus
    laatta_v = _sekoita(nt, osuus.outputs[0], pohja.outputs[0], _hsv(nt, v1.outputs['Color'], s=0.5, v=1.15))
    rako = _ramppi(nt, v2.outputs['Distance'], [(0.01, (0.40, 0.30, 0.20)), (0.06, (1, 1, 1))])
    tulo = nt.nodes.new('ShaderNodeMix'); tulo.data_type = 'RGBA'; tulo.blend_type = 'MULTIPLY'; tulo.inputs['Factor'].default_value = 1.0
    nt.links.new(laatta_v, tulo.inputs['A']); nt.links.new(rako, tulo.inputs['B'])
    nt.links.new(tulo.outputs['Result'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.2; b.inputs['Coat Weight'].default_value = 1.0; b.inputs['Coat Roughness'].default_value = 0.08
    b.inputs['Sheen Weight'].default_value = 0.8; b.inputs['Sheen Roughness'].default_value = 0.3
    return m


def pronssi_patinoitu(nimi):
    """Patinoitunut pronssi: ruskea metalli, jossa vihertäviä patinalaikkuja; ei kiiltävä."""
    m, nt, b = _solmut(nimi)
    f = _kohina(nt, 160, (1, 1, 1), 5, 0.6, 0.4)
    v = _ramppi(nt, f, [(0.40, (0.26, 0.15, 0.065)), (0.52, (0.20, 0.17, 0.09)), (0.62, (0.11, 0.21, 0.15))])
    nt.links.new(v, b.inputs['Base Color']); b.inputs['Metallic'].default_value = 0.85; b.inputs['Roughness'].default_value = 0.52
    return m


# ---------- geometria ----------
def laatikko(nimi, x0, x1, y0, y1, z0, z1, mat, viiste=0.0015):
    bpy.ops.mesh.primitive_cube_add(location=((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2))
    o = bpy.context.object; o.name = nimi; o.scale = ((x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if viiste:
        bv = o.modifiers.new('v', 'BEVEL'); bv.width = viiste; bv.segments = 3
    bpy.ops.object.shade_smooth(); o.data.materials.append(mat); return o


def kolmio(nimi, pisteet, mat):
    (x1, y1), (x2, y2), (x3, y3) = pisteet
    if (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1) < 0: pisteet = list(reversed(pisteet))   # vastapäivään → normaali +z
    me = bpy.data.meshes.new(nimi); bm = bmesh.new()
    ala = [bm.verts.new((x, y, 0.0001)) for x, y in pisteet]; yla = [bm.verts.new((x, y, 0.0009)) for x, y in pisteet]
    bm.faces.new(yla); bm.faces.new(list(reversed(ala)))
    for i in range(3):
        j = (i + 1) % 3; bm.faces.new((ala[i], ala[j], yla[j], yla[i]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o); o.data.materials.append(mat); return o


def laatta(nimi, pisteet, z0, z1, mat):
    """Tasainen levy mielivaltaisesta monikulmiosta (vastapäivään), esim. upotettu helmiäispala."""
    me = bpy.data.meshes.new(nimi); bm = bmesh.new()
    ala = [bm.verts.new((x, y, z0)) for x, y in pisteet]; yla = [bm.verts.new((x, y, z1)) for x, y in pisteet]
    bm.faces.new(yla); bm.faces.new(list(reversed(ala))); n = len(pisteet)
    for i in range(n):
        j = (i + 1) % n; bm.faces.new((ala[i], ala[j], yla[j], yla[i]))
    bm.normal_update(); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o); o.data.materials.append(mat); return o


def kypressi(nimi, cx, cy, h, w, z0, mat):
    """Ottomaaninen helmiäiskypressi: kapea liekki, levein kohta 30 % liekin korkeudella pohjasta, siitä tasaisesti
    teräväksi kärjeksi (kärki kaartuu hieman oikealle); pohja leikattu suoraksi, lyhyt ohut runko alla."""
    yla = cy + h / 2; fh = 0.88 * h; pk = 0.0004; T = 0.70           # liekin korkeus; levein kohta t = 0,70 kärjestä
    vas, oik = [], []
    for i in range(1, 41):
        t = i / 40
        hw = w / 2 * ((t / T) ** 0.85 if t <= T else 1 - 0.5 * ((t - T) / (1 - T)) ** 1.6)
        sx = cx + w * 0.10 * (1 - t) ** 2.2                            # kärjen kaarre sivulle
        vas.append((sx - hw, yla - t * fh)); oik.append((sx + hw, yla - t * fh))
    laatta(nimi, [(cx + w * 0.10, yla)] + vas + list(reversed(oik)), z0, z0 + pk, mat)
    sw = w * 0.10; ys = yla - fh
    laatta(nimi + 'v', [(cx - sw / 2, cy - h / 2), (cx + sw / 2, cy - h / 2), (cx + sw / 2, ys + 0.01 * h), (cx - sw / 2, ys + 0.01 * h)], z0, z0 + pk, mat)


def kypressit():
    """Ottomaani: yksi kypressi kunkin kentän keskellä (kolmiorivien välissä), kolme keskipalkissa."""
    helmi = helmiainen_materiaali('helmiainen-kypressi', 150)
    for sx in (-1, 1): kypressi(f'kyp-k{sx}', sx * (KENTTA_X[0] + KENTTA_X[1]) / 2, 0.0, 0.085, 0.022, 0.0003, helmi)
    kypressi('kyp-p0', 0.0, 0.0, 0.11, 0.026, KORKO, helmi)
    for sy in (-1, 1): kypressi(f'kyp-p{sy}', 0.0, sy * 0.12, 0.08, 0.019, KORKO, helmi)


def lauta():
    kehys, kentta = kehys_materiaali(), kentta_materiaali()
    tumma, vaalea = kolmio_materiaali('eeben', True), kolmio_materiaali('puksi', False)
    lokero = yksi_vari('lokero', {'bysantti': (0.05, 0.03, 0.018), 'ottomaani': (0.028, 0.014, 0.008)}.get(NIMI, (0.035, 0.022, 0.014)), 0.6)
    helmi = yksi_vari('helmiaiset', (0.86, 0.84, 0.80), 0.18, coat=1.0, sheen=0.6)
    messinki = yksi_vari('messinki', (0.78, 0.58, 0.27), 0.28, metalli=1.0)
    if NIMI == 'bysantti': messinki = pronssi_patinoitu('pronssi')
    if NIMI == 'ottomaani': messinki = yksi_vari('kultamessinki', (0.95, 0.72, 0.25), 0.25, metalli=1.0)
    laatikko('pohja', -W / 2, W / 2, -H / 2, H / 2, -0.04, 0.0, kentta, 0.004)
    # kehys (ulkoreuna), palkki, kiskot
    Z = (0.0, KORKO)
    for nimi, (x0, x1, y0, y1) in {'yla': (-W / 2, W / 2, KENTTA_Y, H / 2), 'ala': (-W / 2, W / 2, -H / 2, -KENTTA_Y),
                                   'vasen': (-W / 2, -LOKERO_X[1], -KENTTA_Y, KENTTA_Y), 'oikea': (LOKERO_X[1], W / 2, -KENTTA_Y, KENTTA_Y),
                                   'palkki': (-KENTTA_X[0], KENTTA_X[0], -KENTTA_Y, KENTTA_Y),
                                   'kisko_v': (-LOKERO_X[0], -KENTTA_X[1], -KENTTA_Y, KENTTA_Y),
                                   'kisko_o': (KENTTA_X[1], LOKERO_X[0], -KENTTA_Y, KENTTA_Y)}.items():
        laatikko(nimi, x0, x1, y0, y1, *Z, kehys, 0.0025 if nimi in ('yla', 'ala', 'vasen', 'oikea') else 0.0015)
    for sx in (-1, 1):   # lokerot (tummaa puuta, hieman upotettu) ja oikean lokeron väliseinä
        laatikko(f'lokero{sx}', sx * LOKERO_X[0] if sx > 0 else -LOKERO_X[1], LOKERO_X[1] if sx > 0 else -LOKERO_X[0],
                 -KENTTA_Y, KENTTA_Y, -0.004, 0.0002, lokero, 0)
    laatikko('valiseina', LOKERO_X[0], LOKERO_X[1], -0.004, 0.004, 0.0, KORKO * 0.7, kehys, 0.001)
    # kolmiot
    for i, p in enumerate(kolmiot()):
        kolmio(f'a{i}', p, tumma if i % 2 == 0 else vaalea)
    # messinkisaranat palkissa (taittolauta)
    for y in (-0.22, 0.22):
        laatikko(f'sarana{y}', -0.012, 0.012, y - 0.035, y + 0.035, KORKO, KORKO + 0.0015, messinki, 0.0006)
        bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.0035, depth=0.07, location=(0, y, KORKO + 0.0025),
                                            rotation=(math.pi / 2, 0, 0))
        bpy.context.object.data.materials.append(messinki); bpy.ops.object.shade_smooth()
        for dy in (-0.025, 0.0, 0.025):
            for sx in (-0.007, 0.007):
                bpy.ops.mesh.primitive_uv_sphere_add(radius=0.0016, location=(sx, y + dy, KORKO + 0.0016))
                o = bpy.context.object; o.scale = (1, 1, 0.4); o.data.materials.append(messinki)
    if NIMI == 'ottomaani': kypressit()


def nappula(nimi, x, y, mat):
    R = NAPPULA_R
    prof = [(0, 0.0), (R * 0.95, 0.0), (R, 0.002), (R, 0.009), (R * 0.96, 0.011), (R * 0.88, 0.0118), (R * 0.84, 0.0125),
            (R * 0.62, 0.0125), (R * 0.59, 0.0116), (R * 0.42, 0.0116), (R * 0.39, 0.0125), (0, 0.0128)]
    me = bpy.data.meshes.new(nimi); me.from_pydata([(r, 0, z) for r, z in prof], [(i, i + 1) for i in range(len(prof) - 1)], [])
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o)
    s = o.modifiers.new('sorvi', 'SCREW'); s.steps = 64; s.render_steps = 64; s.use_merge_vertices = True
    o.modifiers.new('sileys', 'SUBSURF').levels = 1
    o.location = (x, y, 0.0); o.data.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.shade_smooth(); return o


def valot():
    sc = bpy.context.scene; w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.30, 0.26, 0.22, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
    d = bpy.data.lights.new('avain', 'AREA'); d.energy = 42; d.shape = 'DISK'; d.size = 1.2; d.color = (1.0, 0.92, 0.82)
    o = bpy.data.objects.new('avain', d); sc.collection.objects.link(o)
    o.location = (-0.9, 0.9, 1.6); o.rotation_euler = (Vector((0, 0, 0)) - o.location).to_track_quat('-Z', 'Y').to_euler()


def kamera(lev_px, kor_px, ala):
    sc = bpy.context.scene
    cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; cd.ortho_scale = ala; cd.clip_end = 10
    k = bpy.data.objects.new('k', cd); sc.collection.objects.link(k); sc.camera = k; k.location = (0, 0, 3)
    sc.render.resolution_x, sc.render.resolution_y = lev_px, kor_px; sc.render.resolution_percentage = 100


def rakenna(n):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for dv in pr.devices: dv.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.cycles.samples = n; sc.cycles.use_denoising = True; sc.render.film_transparent = True
    sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
    valot()
    if NIMI in UUDET: return {'vaalea': nappula_uusi(False), 'tumma': nappula_uusi(True)}
    return {'vaalea': puu_sorvattu('puksi-nappula', (0.70, 0.55, 0.33), (0.60, 0.45, 0.25)),
            'tumma': puu_sorvattu('pahkina-nappula', (0.10, 0.055, 0.03), (0.045, 0.025, 0.014), 0.3)}


N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 128
if '--kerros' in A:
    i = A.index('--kerros'); KERROS, ULOS = A[i + 1], A[i + 2]
    M = rakenna(N); sc = bpy.context.scene
    if KERROS in ('lauta', 'malli'):
        kamera(LEV_PX, KOR_PX, W); lauta()
        if KERROS == 'malli':   # alkuasetelma (portes) tarkistuskuvaksi: vaalea liikkuu a23 → a0 (kotialue a0–a5)
            K = kolmiot()
            def pino(ind, lkm, mat, vari):
                b, c, t = K[ind]; ala = b[1] < 0
                for j in range(lkm):
                    y = (-KENTTA_Y + NAPPULA_R + j * 2 * NAPPULA_R) if ala else (KENTTA_Y - NAPPULA_R - j * 2 * NAPPULA_R)
                    nappula(f'{vari}{ind}_{j}', t[0], y, mat)
            for ind, lkm in ((23, 2), (12, 5), (7, 3), (5, 5)): pino(ind, lkm, M['vaalea'], 'v')
            for ind, lkm in ((0, 2), (11, 5), (16, 3), (18, 5)): pino(ind, lkm, M['tumma'], 't')
    elif KERROS in ('vaalea', 'tumma'):
        kamera(NAPPULA_KOKO, NAPPULA_KOKO, NAPPULA_KOKO / LEV_PX); nappula(KERROS, 0, 0, M[KERROS])
    elif KERROS == 'varjo':
        kamera(NAPPULA_KOKO, NAPPULA_KOKO, NAPPULA_KOKO / LEV_PX); o = nappula('varjo', 0, 0, M['tumma']); o.visible_camera = False
        bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); bpy.context.object.is_shadow_catcher = True
    sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('TAVLI: kerros', NIMI, KERROS, ULOS)

if '--json' in A:
    ULOS = A[A.index('--json') + 1]
    K = kolmiot()
    d = {'huom': 'Linnanrakentaja 5.10.2026. Pikselit laudan kuvassa (2048 × 1536, origo vasen yläkulma, y alas). '
                 'Kolmiot a0–a23 vastapäivään: a0 = oikea alakulma, a11 = vasen alakulma, a12 = vasen yläkulma, a23 = oikea yläkulma. '
                 'Siirtoseppä kytkee pelin pistenumeroinnin (vaalean koti a0–a5 alkuasetelmassa).',
         'koko_px': [LEV_PX, KOR_PX], 'nappula_halkaisija_px': round(2 * NAPPULA_R * LEV_PX, 1), 'nappula_kangas_px': NAPPULA_KOKO,
         'kolmiot': [{'id': f'a{i}', 'kanta': [px(*k[0]), px(*k[1])], 'karki': px(*k[2]), 'ala': i < 12} for i, k in enumerate(K)],
         'palkki': {'vasen_yla': px(-KENTTA_X[0], KENTTA_Y), 'oikea_ala': px(KENTTA_X[0], -KENTTA_Y)},
         'kentat': {'vasen': {'vasen_yla': px(-KENTTA_X[1], KENTTA_Y), 'oikea_ala': px(-KENTTA_X[0], -KENTTA_Y)},
                    'oikea': {'vasen_yla': px(KENTTA_X[0], KENTTA_Y), 'oikea_ala': px(KENTTA_X[1], -KENTTA_Y)}},
         'poistoalueet': {'yla': {'vasen_yla': px(LOKERO_X[0], KENTTA_Y), 'oikea_ala': px(LOKERO_X[1], 0.004)},
                          'ala': {'vasen_yla': px(LOKERO_X[0], -0.004), 'oikea_ala': px(LOKERO_X[1], -KENTTA_Y)}},
         'nopat': {'huom': 'nopat pysähtyvät heittäjän puoliskon keskelle vierekkäin (vaalea oikea, tumma vasen)',
                   'oikea_keskus': px((KENTTA_X[0] + KENTTA_X[1]) / 2, 0), 'vasen_keskus': px(-(KENTTA_X[0] + KENTTA_X[1]) / 2, 0),
                   'noppa_sivu_px': round(0.11 * LEV_PX, 1)},
         'laudat': {'kafeneio': {'nimi': 'Kafeneio 1873', 'lauta': 'kafeneio/lauta.png', 'vaalea': 'kafeneio/nappula-vaalea.png',
                                 'tumma': 'kafeneio/nappula-tumma.png', 'varjo': 'kafeneio/nappula-varjo.png'},
                    'bysantti': {'nimi': 'Bysantin tabula n. 480', 'lauta': 'bysantti/lauta.png', 'vaalea': 'bysantti/nappula-vaalea.png',
                                 'tumma': 'bysantti/nappula-tumma.png', 'varjo': 'bysantti/nappula-varjo.png'},
                    'ottomaani': {'nimi': 'Ottomaanien tavla, Istanbul 1600-luku', 'lauta': 'ottomaani/lauta.png', 'vaalea': 'ottomaani/nappula-vaalea.png',
                                  'tumma': 'ottomaani/nappula-tumma.png', 'varjo': 'ottomaani/nappula-varjo.png'}}}
    with open(ULOS, 'w') as f: json.dump(d, f, ensure_ascii=False, indent=1)
    print('TAVLI: json', ULOS)
