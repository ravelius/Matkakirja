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
    tausta.inputs['Color'].default_value = (0.05, 0.055, 0.065, 1)
    tausta.inputs['Strength'].default_value = 1.0 if paalla else 0.0


aurinko = bpy.data.lights.new('avain', 'SUN')
aurinko.energy = 3.2
aurinko.angle = math.radians(14)
aurinko.color = (1.0, 0.97, 0.92)
ob_aurinko = bpy.data.objects.new('avain', aurinko)
SC.collection.objects.link(ob_aurinko)
suunta = Vector((0.45, 0.55, -0.7)).normalized()   # Blender: +x oikealle, +y paneeliin, −z alas (valo ylävasemmalta)
ob_aurinko.rotation_euler = suunta.to_track_quat('-Z', 'Y').to_euler()

EMISSIOT = {'legenda': ip.MAT['legenda'], 'valo': ip.MAT['valo']}


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


def kehys(x0, x1, y0, y1, skaala):
    """Ortokamera pöydän alueelle x0…x1 × y0…y1 (pt), skaala px/pt."""
    w, h = x1 - x0, y1 - y0
    kamera.location = ((x0 + x1) / 2, -400, (y0 + y1) / 2)
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


def valaisin(nimi, x, y, z, vari, teho, sade=2.0):
    """Pistevalo pöydän koordinaateissa (pt)."""
    d = bpy.data.lights.new(nimi, 'POINT')
    d.energy, d.color, d.shadow_soft_size = teho, vari, sade
    o = bpy.data.objects.new(nimi, d)
    SC.collection.objects.link(o)
    o.location = ip.B(x, y, z)
    return o


def vain_valo(paalla):
    """Kaikki valot pois paitsi `paalla` (lista objekteja); emissiot pois."""
    aseta_yleisvalo(False)
    for o in SC.objects:
        if o.type == 'LIGHT':
            o.hide_render = o not in paalla


# ---------------------------------------------------------------- testi: tabletti, pohja + LIVE + KOHDE
if '--testi' in ARGS:
    T, G, S = 560 + 2 * ip.PAATY, 560, 2
    t = ip.rakenna(T, G)
    kaikki = t['pohja'] + t['ryhma'] + [o for v in t['osat'].values() for o in v]
    lasi_live = kopioi_materiaali([o for o in kaikki if o.name == 'merkkivalo_lasi'], 'valo', 'valo_live')
    leg_kohde = kopioi_materiaali(t['osat']['kohde'], 'legenda', 'legenda_kohde')
    for m in (ip.MAT['legenda'], leg_kohde):
        m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.32, 0.33, 0.3, 1)
    for m in (ip.MAT['legenda'], ip.MAT['valo'], lasi_live, leg_kohde):
        emissio(m, (0, 0, 0), 0.0)
    lx, ly = t['paikat']['live']
    live = valaisin('live_vihrea', lx, ly, 7, (0.3, 1.0, 0.45), float(os.environ.get('LIVE_W', 6000)), 3.0)
    kx, ky = t['paikat']['kohde']
    kohde = valaisin('kohde', kx, ky, 9, (0.75, 1.0, 0.8), float(os.environ.get('KOHDE_W', 9000)), 12.0)

    kehys(0, T, 0, 168, S)
    aseta_yleisvalo(True)
    for o in SC.objects:
        if o.type == 'LIGHT':
            o.hide_render = o is not ob_aurinko
    pohja = tallenna_kuva('testi-pohja', renderoi('pohja'))

    kehys(0, T, 0, 168, S / 2)
    vain_valo([live])
    emissio(lasi_live, (0.2, 1.0, 0.3), float(os.environ.get('LIVE_E', 3.0)))
    v_live = tallenna_valo('testi-valo-live-vihrea', renderoi('live'))
    emissio(lasi_live, (0, 0, 0), 0.0)
    vain_valo([kohde])
    emissio(leg_kohde, (0.55, 1.0, 0.6), float(os.environ.get('KOHDE_E', 0.9)))
    v_kohde = tallenna_valo('testi-valo-kohde', renderoi('kohde'))

    ylos = lambda a: np.repeat(np.repeat(a, 2, axis=0), 2, axis=1)  # noqa: E731
    koottu = over(over(pohja, ylos(v_live)), ylos(v_kohde))
    tausta_ = np.concatenate([np.full(pohja.shape[:2] + (3,), 0.08), np.ones(pohja.shape[:2] + (1,))], axis=2)
    kirjoita_png(os.path.join(ULOS, 'testi-koottu.png'),
                 (np.concatenate([over(tausta_, pohja), over(tausta_, koottu)], axis=0) * 255 + 0.5).astype(np.uint8))
    print('TESTI valmis:', ULOS)
