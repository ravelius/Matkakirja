# ISS-KYTKINPÖYTÄ KUVAKERROKSIKSI (Linnanrakentaja 30.9.2026; Päätoimittajan tekniikan muutos: paneeli ei ole elävä 3D,
# vaan Cycles-renderöinnit pikselintarkasti samasta kohtauksesta; Linssiseppä kokoaa UI:ssa, kerrossopimus 30.9.).
#
# Kerrokset (straight alpha, sRGB, PNG):
#   pohja-<a>-vasen/-keski/-oikea   päädyt ja 64 px:n toistuva keskipala, yleisvalo + avainvalo
#   ryhma-<a>                        paikallaan pysyvät rungot varjoineen (varjonsieppaaja), läpinäkyvä
#   osa-<nimi>-<tila>                liikkuvat osat varjoineen, läpinäkyvä (vaihe 2)
#   valo-<a>-<nimi>                  yhden valonlähteen oma valo (hehku + heijastukset), puolikoko. Kokoaminen "over":
#                                    pohja·(1−α) + rgb·α ≈ pohja + valo (rgb·α = valon sRGB-lisä, α = sen suurin kanava).
# Ajo: nice -n 15 /Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup \
#        -P tools/linssit/blender/iss_paneeli_render.py -- <ulos> [--testi] [--naytteita 128]
import math
import os
import struct
import sys
import zlib

import bpy
import numpy as np
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ULOS = ARGS[0] if ARGS and not ARGS[0].startswith('--') else '/Users/Shared/Claude/proto-3d/_valmiit/iss-paneeli'
NAYTTEITA = int(ARGS[ARGS.index('--naytteita') + 1]) if '--naytteita' in ARGS else 128
os.makedirs(ULOS, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import iss_paneeli as ip  # noqa: E402  (luo materiaalit tyhjään kohtaukseen)

SC = bpy.context.scene
SC.render.engine = 'CYCLES'
cy = SC.cycles
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
    cy.device = 'GPU'
except Exception as e:  # noqa: BLE001
    print('GPU ei käytössä:', e)
cy.samples = NAYTTEITA
cy.use_denoising = True
cy.max_bounces = 6
SC.view_settings.view_transform = 'Standard'
SC.view_settings.look = 'None'
SC.render.film_transparent = True
SC.render.image_settings.file_format = 'OPEN_EXR'
SC.render.image_settings.color_depth = '32'

# ---------------------------------------------------------------- valot
maailma = bpy.data.worlds.new('yleisvalo')
maailma.use_nodes = True
tausta = maailma.node_tree.nodes['Background']
SC.world = maailma


def aseta_yleisvalo(paalla):
    tausta.inputs['Color'].default_value = (0.012, 0.016, 0.022, 1)
    tausta.inputs['Strength'].default_value = 1.0 if paalla else 0.0


def aurinkovalo(nimi, suunta, vari, teho, kulma):
    d = bpy.data.lights.new(nimi, 'SUN')
    d.energy, d.color, d.angle = teho, vari, math.radians(kulma)
    o = bpy.data.objects.new(nimi, d)
    SC.collection.objects.link(o)
    o.rotation_euler = Vector(suunta).normalized().to_track_quat('-Z', 'Y').to_euler()
    return o


# Cupolan ikkunasta viileä päivänvalo ylhäältä-edestä (Blender: +y paneeliin, −z alas) + heikko lämmin täyte alhaalta.
ob_aurinko = aurinkovalo('ikkuna', (0.18, 0.55, -0.82), (0.8, 0.89, 1.0), float(os.environ.get('IKKUNA_W', 4.5)), 18)
ob_taytto = aurinkovalo('taytto', (-0.25, 0.9, 0.35), (1.0, 0.85, 0.7), float(os.environ.get('TAYTTO_W', 0.35)), 40)
YLEISVALOT = (ob_aurinko, ob_taytto)

def emissio(mat, vari, voima):
    b = mat.node_tree.nodes['Principled BSDF']
    b.inputs['Emission Color'].default_value = (*vari, 1)
    b.inputs['Emission Strength'].default_value = voima


def kopioi_materiaali(obs, nimi, uusi):
    """Vaihtaa objektien materiaalin `nimi` omaan kopioon (yksi valo = oma emissio)."""
    m = ip.MAT[nimi].copy()
    m.name = uusi
    for o in obs:
        for i, s in enumerate(o.data.materials):
            if s and s.name == nimi:
                o.data.materials[i] = m
    return m


# ---------------------------------------------------------------- kamera ja renderöinti
kamera_data = bpy.data.cameras.new('kamera')
kamera_data.type = 'ORTHO'
kamera = bpy.data.objects.new('kamera', kamera_data)
SC.collection.objects.link(kamera)
SC.camera = kamera
kamera.rotation_euler = (math.radians(90), 0, 0)


KALLISTUS = math.radians(float(os.environ.get('KALLISTUS', 15)))   # katse ylhäältä: kytkimille syvyyttä
YLAVARA = 5.0                                                       # kuvun/lyhtyjen syvyys näkyy yläreunan yli


def nakyma(x, y, z):
    """Pöydän piste (pt) → kuvan koordinaatit (pt) vasemmasta YLÄkulmasta (ortokamera kallistettuna)."""
    v = y * math.cos(KALLISTUS) + z * math.sin(KALLISTUS)
    return x, KORKEUS_PT - v


KORKEUS_PT = float(round(168 * math.cos(KALLISTUS) + YLAVARA))   # kokonaisluku: puolikoko = täsmälleen ½


def kehys(x0, x1, y0, y1, skaala):
    """Ortokamera pöydän alueelle x0…x1 (y0…y1 = 0…168 pt, kallistettu), skaala px/pt."""
    w, h = x1 - x0, KORKEUS_PT
    suunta = Vector((0, math.cos(KALLISTUS), -math.sin(KALLISTUS)))
    # kuvan keskipiste tasossa z = 0: v = h/2 → y = (h/2) / cos
    kp = ip.B((x0 + x1) / 2, (h / 2) / math.cos(KALLISTUS), 0)
    kamera.location = kp - 400 * suunta
    kamera.rotation_euler = (math.pi / 2 - KALLISTUS, 0, 0)
    kamera_data.sensor_fit = 'HORIZONTAL' if w >= h else 'VERTICAL'
    kamera_data.ortho_scale = max(w, h)
    kamera_data.clip_end = 1000
    SC.render.resolution_x = round(w * skaala)
    SC.render.resolution_y = round(h * skaala)
    SC.render.resolution_percentage = 100


def renderoi(nimi):
    polku = os.path.join(ULOS, f'_{nimi}.exr')
    SC.render.filepath = polku
    bpy.ops.render.render(write_still=True)
    img = bpy.data.images.load(polku)
    w, h = img.size
    a = np.empty(w * h * 4, np.float32)
    img.pixels.foreach_get(a)
    bpy.data.images.remove(img)
    os.remove(polku)
    return a.reshape(h, w, 4)[::-1]   # ylärivi ensin


def srgb(x):
    x = np.clip(x, 0, 1)
    return np.where(x <= 0.0031308, 12.92 * x, 1.055 * np.power(x, 1 / 2.4) - 0.055)


def kirjoita_png(polku, rgba8):
    h, w, _ = rgba8.shape
    raaka = b''.join(b'\x00' + rgba8[y].tobytes() for y in range(h))
    def lohko(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    with open(polku, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n' + lohko(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)) +
                lohko(b'IDAT', zlib.compress(raaka, 9)) + lohko(b'IEND', b''))


def tallenna_kuva(nimi, a):
    """Premultiplied lineaarinen RGBA → straight sRGB PNG."""
    al = np.clip(a[..., 3:4], 0, 1)
    rgb = np.where(al > 1e-4, a[..., :3] / np.maximum(al, 1e-4), 0)
    out = np.concatenate([srgb(rgb), al], axis=2)
    kirjoita_png(os.path.join(ULOS, nimi + '.png'), (out * 255 + 0.5).astype(np.uint8))
    return out


def tallenna_valo(nimi, a):
    """Valon lisä (lineaarinen, musta tausta) → straight sRGB: α = suurin kanava, rgb = lisä / α."""
    lisa = srgb(a[..., :3])
    al = np.clip(lisa.max(axis=2, keepdims=True), 0, 1)
    rgb = np.where(al > 1e-4, lisa / np.maximum(al, 1e-4), 0)
    out = np.concatenate([np.clip(rgb, 0, 1), al], axis=2)
    kirjoita_png(os.path.join(ULOS, nimi + '.png'), (out * 255 + 0.5).astype(np.uint8))
    return out


def over(ala, yla, paino=1.0):
    a = yla[..., 3:4] * paino
    rgb = ala[..., :3] * (1 - a) + yla[..., :3] * a
    return np.concatenate([rgb, np.maximum(ala[..., 3:4], a)], axis=2)


def valaisin(nimi, x, y, z, vari, teho, sade=2.0, kohti=None, kartio=100):
    """Piste- tai kohdevalo (kohti = suunta pt-koordinaateissa) pöydän koordinaateissa (pt)."""
    d = bpy.data.lights.new(nimi, 'SPOT' if kohti else 'POINT')
    d.energy, d.color, d.shadow_soft_size = teho, vari, sade
    o = bpy.data.objects.new(nimi, d)
    SC.collection.objects.link(o)
    o.location = ip.B(x, y, z)
    if kohti:
        d.spot_size, d.spot_blend = math.radians(kartio), 0.7
        o.rotation_euler = (ip.B(*kohti) - ip.B(0, 0, 0)).normalized().to_track_quat('-Z', 'Y').to_euler()
    return o


def hehku(a, sade_px, voima):
    """Valon hehku (bloom): kolme laatikkosumennusta ≈ Gauss, lisätään valoon."""
    r = max(1, int(sade_px))

    def laatikko(b, ax):
        b = np.moveaxis(b, ax, 0)
        n = b.shape[0]
        c = np.cumsum(np.concatenate([np.repeat(b[:1], r + 1, 0), b, np.repeat(b[-1:], r, 0)]), axis=0)
        return np.moveaxis((c[2 * r + 1:] - c[:n]) / (2 * r + 1), 0, ax)

    b = a[..., :3].copy()
    for _ in range(3):
        b = laatikko(laatikko(b, 0), 1)
    out = a.copy()
    out[..., :3] += voima * b
    return out


def vain_valo(paalla):
    """Kaikki valot pois paitsi `paalla` (lista objekteja); emissiot pois."""
    aseta_yleisvalo(False)
    for o in SC.objects:
        if o.type == 'LIGHT':
            o.hide_render = o not in paalla


# ---------------------------------------------------------------- testi: tabletti, pohja + KOHDE + paneelivalot
if '--testi' in ARGS:
    T, G, S = 560 + 2 * ip.PAATY, 560, 2
    t = ip.rakenna(T, G)
    kaikki = t['pohja'] + t['ryhma'] + [o for v in t['osat'].values() for o in v]
    leg_kohde = kopioi_materiaali(t['osat']['kohde'], 'legenda_painike', 'legenda_kohde')
    leg_teksti_k = kopioi_materiaali(t['osat']['kohde'], 'legenda_teksti', 'legenda_teksti_kohde')
    lasi_live = kopioi_materiaali([o for o in kaikki if o.name == 'merkkivalo_lasi'], 'valo', 'valo_live')
    kx, ky = t['paikat']['kohde'][:2]
    kohde = valaisin('kohde', kx, ky, ip.PINTA + 10, (0.55, 1.0, 0.6), float(os.environ.get('KOHDE_W', 30000)), 10.0)
    lx, ly = t['paikat']['live'][:2]
    live = valaisin('live', lx, ly, ip.PINTA + 8, (0.25, 1.0, 0.4), float(os.environ.get('LIVE_W', 8000)), 4.0)
    paneeli = [valaisin(f'paneeli_{i}', x, y, z, (1.0, 0.93, 0.82), float(os.environ.get('PANEELI_W', 1000000)), 6.0,
                        kohti=(0, -1, -0.5), kartio=120) for i, (x, y, z) in enumerate(t['valot']['paneeli'])]
    lyhty = kopioi_materiaali(t['ryhma'], 'valolista', 'valolista_paalla')

    kehys(0, T, 0, 168, S)
    aseta_yleisvalo(True)
    for o in SC.objects:
        if o.type == 'LIGHT':
            o.hide_render = o not in YLEISVALOT
    pohja = tallenna_kuva('testi-pohja', renderoi('pohja'))

    kehys(0, T, 0, 168, S / 2)
    vain_valo([kohde])
    emissio(leg_kohde, (0.55, 1.0, 0.6), float(os.environ.get('KOHDE_E', 1.1)))
    emissio(leg_teksti_k, (0.55, 1.0, 0.6), 0.9)
    v_kohde = tallenna_valo('testi-valo-kohde', hehku(renderoi('kohde'), 10, 0.5))
    emissio(leg_kohde, (0, 0, 0), 0.0)
    vain_valo(paneeli)
    emissio(lyhty, (1.0, 0.93, 0.82), 0.45)
    v_paneeli = tallenna_valo('testi-valo-paneeli', hehku(renderoi('paneeli'), 5, 0.08))
    emissio(lyhty, (0, 0, 0), 0.0)
    vain_valo([live])
    emissio(lasi_live, (0.25, 1.0, 0.4), float(os.environ.get('LIVE_E', 4.0)))
    v_live = tallenna_valo('testi-valo-live-vihrea', hehku(renderoi('live'), 8, 0.6))

    ylos = lambda a: np.repeat(np.repeat(a, 2, axis=0), 2, axis=1)  # noqa: E731
    koottu = over(over(over(pohja, ylos(v_paneeli)), ylos(v_kohde)), ylos(v_live))
    tausta_ = np.concatenate([np.full(pohja.shape[:2] + (3,), 0.3), np.ones(pohja.shape[:2] + (1,))], axis=2)
    kirjoita_png(os.path.join(ULOS, 'testi-koottu.png'),
                 (np.concatenate([over(tausta_, pohja), over(tausta_, koottu)], axis=0) * 255 + 0.5).astype(np.uint8))
    print('TESTI valmis:', ULOS)


# ---------------------------------------------------------------- täysi sarja (kerrossopimus Linssisepän kanssa 30.9.)
ASETTELUT = {'puhelin': (402.0, 378.0, 3), 'tabletti': (560.0 + 2 * ip.PAATY, 560.0, 2)}
NOPEUS_KULMAT = (-60, -20, 20, 60)
NUPPI_ASKEL = 15
KAARI_ASENNOT = 6
VALOVARIT = {'vihrea': (0.25, 1.0, 0.4), 'meripihka': (1.0, 0.55, 0.12), 'valkoinen': (1.0, 0.95, 0.85)}


def rajaus(px0, py0, px1, py1):
    """Border-renderöinti pikselialueelle (vasen yläkulma origo)."""
    w, h = SC.render.resolution_x, SC.render.resolution_y
    r = SC.render
    r.use_border, r.use_crop_to_border = True, True
    r.border_min_x, r.border_max_x = max(0, px0) / w, min(w, px1) / w
    r.border_min_y, r.border_max_y = 1 - min(h, py1) / h, 1 - max(0, py0) / h


def ei_rajausta():
    SC.render.use_border = False


def nakyvyys(kamera=(), sieppaaja=(), piiloon=()):
    for o in kamera:
        o.hide_render, o.is_shadow_catcher = False, False
    for o in sieppaaja:
        o.hide_render, o.is_shadow_catcher = False, True
    for o in piiloon:
        o.hide_render = True


VAIN_VALOT = '--vain-valot' in ARGS   # uusii vain valokerrokset (sprites.json ennallaan)


def sarja(nimi, T, G, S):
    ulos = os.path.join(ULOS, nimi)
    os.makedirs(ulos, exist_ok=True)
    tiedot = {'skaala': S, 'korkeus_pt': KORKEUS_PT, 'kallistus_astetta': round(math.degrees(KALLISTUS), 1)}

    # 1) pohjan palat: erillinen kapea kohtaus ilman ryhmää (vasen 24 pt, keski X:ssä tasainen → 64 px:n pala)
    Tp = 2 * ip.PAATY + 64.0
    p = ip.rakenna(Tp, 0, rungot=False)
    aseta_yleisvalo(True)
    for o in SC.objects:
        if o.type == 'LIGHT':
            o.hide_render = o not in YLEISVALOT
    kehys(0, Tp, 0, 168, S)
    if not VAIN_VALOT:
        kuva = renderoi('pohja')
        v = int(ip.PAATY * S)
        tallenna_kuva(f'{nimi}/pohja-vasen', kuva[:, :v])
        tallenna_kuva(f'{nimi}/pohja-oikea', kuva[:, -v:])
        k0 = kuva.shape[1] // 2 - 32
        tallenna_kuva(f'{nimi}/pohja-keski', kuva[:, k0:k0 + 64])
    tiedot['pohja'] = {'paaty_pt': ip.PAATY, 'keski_px': 64}
    for o in p['pohja']:
        bpy.data.objects.remove(o)

    # 2) ryhmä: kiinteät osat, pohja varjonsieppaajana. Pöytä renderöidään 400 pt leveämpänä, jotta päätykehykset
    #    (kahvat) jäävät kuvan ulkopuolelle eivätkä puhkaise ryhmään reikiä; oikeat päädyt tulevat pohja-kuvista.
    T = T + 400
    t = ip.rakenna(T, G)
    osat = [o for v_ in t['osat'].values() for o in v_]
    rx0, rx1 = t['paikat']['ryhma']
    rx0, rx1 = max(0.0, rx0 - 6), min(T, rx1 + 6)   # varjoille tilaa
    kehys(rx0, rx1, 0, 168, S)
    nakyvyys(kamera=t['ryhma'], sieppaaja=t['pohja'], piiloon=osat)
    if not VAIN_VALOT:
        tallenna_kuva(f'{nimi}/ryhma', renderoi('ryhma'))
    leveys = rx1 - rx0
    tiedot['ryhma'] = {'leveys_pt': leveys, 'keskitetty': True}

    def kuvassa(x, y, z=ip.PINTA):
        xx, yy = nakyma(x - rx0, y, z)
        return [round(xx, 2), round(yy, 2)]

    laatikot = {}
    for k, arvo in t['paikat'].items():
        if k in ('ryhma',):
            continue
        x, y = arvo[:2]
        laatikot[k] = {'keski_pt': kuvassa(x, y), 'koko_pt': [arvo[2], round(arvo[3] * math.cos(KALLISTUS), 2)]}
    tiedot['laatikot'] = laatikot
    tiedot['ryhma_pt'] = [round(leveys, 2), KORKEUS_PT]

    # 3) liikkuvat osat: kukin asento omana kuvanaan, muu kohtaus varjonsieppaajana
    def osa_kuva(tunnus, obs, x, y, koko):
        cx, cy = kuvassa(x, y)
        px0, py0 = int((cx - koko / 2) * S), int((cy - koko / 2) * S)
        px1, py1 = int((cx + koko / 2) * S), int((cy + koko / 2) * S)
        rajaus(px0, py0, px1, py1)
        muut = [o for o in osat if o not in obs]
        nakyvyys(kamera=obs, sieppaaja=t['pohja'] + t['ryhma'], piiloon=muut)
        tallenna_kuva(f'{nimi}/osa-{tunnus}', renderoi('osa'))
        ei_rajausta()
        return {'keski_pt': [round((px0 + px1) / 2 / S, 2), round((py0 + py1) / 2 / S, 2)], 'koko_pt': [
            round((px1 - px0) / S, 2), round((py1 - py0) / S, 2)]}

    tiedot['osat'] = {}
    if VAIN_VALOT:
        osa_kuva = lambda *a: {}  # noqa: E731
    ob = t['osat']['nopeus'][0]
    x, y = t['paikat']['nopeus'][:2]
    for i, k in enumerate(NOPEUS_KULMAT):
        ob.rotation_euler = (0, math.radians(k), 0)
        tiedot['osat'][f'nopeus-{i}'] = osa_kuva(f'nopeus-{i}', [ob], x, y, 50)
    ob.rotation_euler = (0, math.radians(NOPEUS_KULMAT[0]), 0)
    ob = t['osat']['pilvet'][0]
    x, y = t['paikat']['pilvet'][:2]
    for i in range(360 // NUPPI_ASKEL):
        ob.rotation_euler = (0, math.radians(i * NUPPI_ASKEL), 0)
        tiedot['osat'][f'nuppi-{i:02d}'] = osa_kuva(f'nuppi-{i:02d}', [ob], x, y, 44)
    ob.rotation_euler = (0, 0, 0)
    for nappi in ('kohde', 'kuvaa', 'poistu'):   # kannessa oma legenda (LENNÄ / KUVAA / POISTU)
        ob = t['osat'][nappi][0]
        x, y = t['paikat'][nappi][:2]
        z0 = ob.location.y
        for tila, dz in (('ylos', 0.0), ('alas', 3.0)):
            ob.location.y = z0 + dz
            tiedot['osat'][f'{nappi}-{tila}'] = osa_kuva(f'{nappi}-{tila}', [ob], x, y, 42)
        ob.location.y = z0
    tiedot['osat_kaytto'] = {'nopeus': 'nopeus-0…3 (LIVE, 10×, 100×, 1000×)', 'pilvet_kuukausi_vuorokausi': 'nuppi-00…23, 15°/askel (renderöity PILVET-paikalle, siirrä ankkuriin)',
                             'kohde_kuvaa_poistu': 'kohde-ylos/alas, kuvaa-ylos/alas, poistu-ylos/alas'}

    # 4) valot: puolikoko, kaikki kappaleet näkyvissä (perusasennot), vain yksi valo kerrallaan
    nakyvyys(kamera=t['pohja'] + t['ryhma'] + osat)
    kaikki = t['pohja'] + t['ryhma'] + osat
    kehys(rx0, rx1, 0, 168, S / 2)
    lx, ly = t['paikat']['live'][:2]
    kx, ky = t['paikat']['kohde'][:2]
    px, py = t['paikat']['poistu'][:2]
    ux, uy = t['paikat']['kuvaa'][:2]
    lasi = kopioi_materiaali(kaikki, 'valo', 'valo_paalla')
    leg_k = kopioi_materiaali(t['osat']['kohde'], 'legenda_painike', 'legenda_kohde')
    leg_p = kopioi_materiaali(t['osat']['poistu'], 'legenda_painike', 'legenda_poistu')
    leg_u = kopioi_materiaali(t['osat']['kuvaa'], 'legenda_painike', 'legenda_kuvaa')
    tek_k = kopioi_materiaali(t['osat']['kohde'], 'legenda_teksti', 'legenda_teksti_kohde')
    tek_p = kopioi_materiaali(t['osat']['poistu'], 'legenda_teksti', 'legenda_teksti_poistu')
    tek_u = kopioi_materiaali(t['osat']['kuvaa'], 'legenda_teksti', 'legenda_teksti_kuvaa')
    levyt = kopioi_materiaali(kaikki, 'legendalevy', 'legendalevy_paalla')
    lyhty = kopioi_materiaali(kaikki, 'valolista', 'valolista_paalla')
    tiedot['valot'] = {}

    def valo(tunnus, valot, emissiot, sade, voima):
        vain_valo(valot)
        for m, vari, e in emissiot:
            emissio(m, vari, e)
        tallenna_valo(f'{nimi}/valo-{tunnus}', hehku(renderoi('valo'), sade * S / 2, voima))
        for m, _, _ in emissiot:
            emissio(m, (0, 0, 0), 0.0)
        for o in valot:
            bpy.data.objects.remove(o)
        tiedot['valot'][tunnus] = {'skaala': S / 2}

    for vari in ('vihrea', 'meripihka'):
        valo(f'live-{vari}', [valaisin('live', lx, ly, ip.PINTA + 8, VALOVARIT[vari], 8000, 4.0)],
             [(lasi, VALOVARIT[vari], 4.0)], 4, 0.6)
    for tunnus, (xx, yy), leg, tek in (('kohde', (kx, ky), leg_k, tek_k), ('kuvaa', (ux, uy), leg_u, tek_u),
                                       ('poistu', (px, py), leg_p, tek_p)):
        valo(tunnus, [valaisin(tunnus, xx, yy, ip.PINTA + 10, (0.55, 1.0, 0.6), 30000, 10.0)],
             [(leg, (0.55, 1.0, 0.6), 1.1), (tek, (0.55, 1.0, 0.6), 0.9)], 5, 0.5)
    for vari in ('valkoinen', 'meripihka'):
        valo(f'legendat-{vari}', [], [(levyt, VALOVARIT[vari], 0.8)], 3, 0.3)
    valo('paneeli', [valaisin(f'paneeli_{i}', x_, y_, z_, (1.0, 0.93, 0.82), 260000, 18.0, kohti=(0, -1, -0.8),
                              kartio=120) for i, (x_, y_, z_) in enumerate(t['valot']['paneeli'])],
         [(lyhty, (1.0, 0.93, 0.82), 0.45)], 5, 0.08)
    for o in kaikki:
        bpy.data.objects.remove(o)
    return tiedot


if '--sarja' in ARGS:
    import json
    kaikki_tiedot = {'versio': 1, 'tekija': 'Linnanrakentaja (Blender Cycles, tools/linssit/blender)',
                     'kokoaminen': 'pohja(vasen, keski toistuen, oikea) → ryhma keskitettynä → osat → valot "over" painoin',
                     'asettelut': {}}
    valitut = [a for a in ASETTELUT if f'--{a}' in ARGS] or list(ASETTELUT)
    for a in valitut:
        kaikki_tiedot['asettelut'][a] = sarja(a, *ASETTELUT[a])
        print('SARJA valmis:', a)
    if not VAIN_VALOT:
        with open(os.path.join(ULOS, 'sprites.json'), 'w') as f:
            json.dump(kaikki_tiedot, f, ensure_ascii=False, indent=1)
