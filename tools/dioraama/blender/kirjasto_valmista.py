# Linnakirjasto: lähteistä kirjaston tuotokset (Linnanrakentaja 30.9.2026, speksi docs/raportit/linnakirjasto-20260930.md).
#   materiaali: <id>_diff.jpg, <id>_nor_gl.jpg, <id>_arm.png (R = AO, G = karheus, B = metalli)
#   tarra:      <id>_diff.png (RGBA; alfa = opacity tai 1 − harmaa, kun lähteessä ei ole opacity-karttaa), <id>_nor_gl.jpg
# Kirjoittaa repoon js/dioraama/kirjasto/lahteet.json (tunnus, nimi, lähde, tekijät, lisenssi, muokkaukset, toisto_m,
# tiedostot sha256:lla). Vain "paa"-rooli (varat jäävät lähteisiin).
# Ajo: Blender -b --factory-startup -P kirjasto_valmista.py -- <repo-juuri>
import hashlib, json, os, shutil, sys
import bpy
import numpy as np

REPO = sys.argv[sys.argv.index('--') + 1]
L = '/Users/Shared/Claude/proto-3d/_kirjasto/lahteet'
V = '/Users/Shared/Claude/proto-3d/_kirjasto/valmiit'
TOISTO = {'graniittilohkomuuri': 2.4, 'paanukatto': 1.2, 'tervattu-puu': 2.0, 'lankku': 2.0, 'kivilaatta': 2.0,
          'kallio': 3.0, 'kalkkirappaus': 2.5, 'tiili': 1.6, 'liuskekatto': 1.4, 'rauta': 1.0, 'kuparikatto': 2.0,
          'vesijalki': 1.5, 'noki': 1.5, 'sammal': 2.0, 'halkeama': 2.0,
          # Kielletty kaupunki 7.10.: 19 tiiliriviä → rivijako 0,32 m; 11 limitettyä tiiliä leveydellä → tiili 0,50 × 0,25 m
          'lasitettu-tiilikatto': 6.0, 'harmaa-tiilikiveys': 5.5}
m = json.load(open(f'{L}/manifest.json'))


def lue(polku, kanava=None):
    im = bpy.data.images.load(polku); im.colorspace_settings.name = 'Non-Color'
    w, h = im.size; a = np.empty(w * h * 4, np.float32); im.pixels.foreach_get(a)
    bpy.data.images.remove(im)
    a = a.reshape(h, w, 4)
    return (a if kanava is None else a[..., kanava]), (w, h)


def tallenna(polku, rgba, koko, muoto):
    w, h = koko
    im = bpy.data.images.new('_', w, h, alpha=True); im.colorspace_settings.name = 'Non-Color'
    im.pixels.foreach_set(np.ascontiguousarray(rgba, np.float32).ravel())
    im.filepath_raw = polku; im.file_format = muoto
    if muoto == 'JPEG': sc = bpy.context.scene; sc.render.image_settings.quality = 95
    im.save(); bpy.data.images.remove(im)


def sha(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest()


tulos = {}
for tunnus, a in m.items():
    if a.get('rooli') != 'paa':
        continue
    laji, aid = tunnus.split('/')
    lahde = f'{L}/{laji}/{aid}'
    kartat = {t['kartta']: f"{lahde}/{t['tiedosto']}" for t in a['tiedostot']}
    ulos = f'{V}/{laji}/{aid}'; os.makedirs(ulos, exist_ok=True)
    tiedostot, muok = [], []
    diff = kartat.get('diff') or kartat.get('Color') or kartat.get('color')
    nor = kartat.get('nor_gl') or kartat.get('NormalGL') or kartat.get('normal_gl')
    if laji == 'materiaali':
        shutil.copyfile(diff, f'{ulos}/{aid}_diff.jpg')
        if nor: shutil.copyfile(nor, f'{ulos}/{aid}_nor_gl.jpg')
        rough, koko = lue(kartat.get('rough') or kartat.get('Roughness'), 0)
        ao = lue(kartat['ao'], 0)[0] if 'ao' in kartat or 'AmbientOcclusion' in kartat else np.ones_like(rough)
        met = lue(kartat['metalness'], 0)[0] if 'metalness' in kartat else np.zeros_like(rough)
        arm = np.stack([ao, rough, met, np.ones_like(rough)], -1)
        tallenna(f'{ulos}/{aid}_arm.png', arm, koko, 'PNG')
        muok.append('ARM-pakkaus (R AO, G karheus, B metalli)')
    else:
        rgba, koko = lue(diff)
        op = kartat.get('Opacity') or kartat.get('opacity')
        if op:
            rgba[..., 3] = lue(op, 0)[0]
        else:
            rgba[..., 3] = 1.0 - rgba[..., :3].mean(-1)
            muok.append('alfa = 1 − harmaa (lähteessä ei opacity-karttaa)')
        tallenna(f'{ulos}/{aid}_diff.png', rgba, koko, 'PNG')
        if nor: shutil.copyfile(nor, f'{ulos}/{aid}_nor_gl.jpg')
    for f in sorted(os.listdir(ulos)):
        p = f'{ulos}/{f}'
        tiedostot.append({'polku': f'{laji}/{aid}/{f}', 'sha256': sha(p), 'tavuja': os.path.getsize(p)})
    tulos[tunnus] = {'nimi': a['nimi'], 'lahde': a['lahde_url'], 'tekijat': a['tekijat'], 'lisenssi': a['lisenssi'],
                     'palvelu': a['palvelu'], 'muokkaukset': muok, 'toisto_m': TOISTO.get(aid, 2.0),
                     **({'huom': a['huom']} if a.get('huom') else {}), 'tiedostot': tiedostot}
    print('VALMIS', tunnus, len(tiedostot))
os.makedirs(f'{REPO}/js/dioraama/kirjasto', exist_ok=True)
# 4.10.: muut lajit (hahmo, taivas, esiasetus; tools/dioraama/kirjasto_lisaa.py) säilyvät manifestissa
_m = f'{REPO}/js/dioraama/kirjasto/lahteet.json'
if os.path.exists(_m):
    for k_, v_ in json.load(open(_m)).items():
        if not k_.startswith(('materiaali/', 'tarra/')): tulos.setdefault(k_, v_)
with open(f'{REPO}/js/dioraama/kirjasto/lahteet.json', 'w') as f:
    json.dump(dict(sorted(tulos.items())), f, ensure_ascii=False, indent=1)
    f.write('\n')
print('MANIFESTI', len(tulos))
