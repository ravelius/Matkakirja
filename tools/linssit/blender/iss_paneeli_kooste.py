# ISS-KYTKINPÖYDÄN KOOSTETARKISTUS (Linnanrakentaja 30.9.2026): kokoaa kerrokset sprites.jsonin ankkureista samoin
# kuin natiivi (pohja vasen + keski toistuen + oikea, ryhmä keskitettynä, osat ja valot "over"), jotta kohdistus
# todennetaan ennen toimitusta. Ajo Blenderin Pythonilla (numpy):
#   /Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P tools/linssit/blender/iss_paneeli_kooste.py \
#     -- <kansio> <asettelu> <leveys_pt> [tila=nopeus-1,nuppi-03,...] [valot=live-vihrea:1,kohde:1]
import json
import os
import sys

import bpy
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from iss_paneeli_render import kirjoita_png  # noqa: E402  (ajaa myös renderöijän alustuksen; ei renderöi ilman lippuja)

A = sys.argv[sys.argv.index('--') + 1:]
KANSIO, ASETTELU, LEVEYS = A[0], A[1], float(A[2])
TILA = dict(x.split('=', 1) for x in A[3:] if '=' in x)
tiedot = json.load(open(os.path.join(KANSIO, 'sprites.json')))['asettelut'][ASETTELU]
S = tiedot['skaala']
H = round(tiedot['korkeus_pt'] * S)
W = round(LEVEYS * S)


def lue(nimi):
    img = bpy.data.images.load(os.path.join(KANSIO, ASETTELU, nimi + '.png'))
    w, h = img.size
    a = np.empty(w * h * 4, np.float32)
    img.pixels.foreach_get(a)
    bpy.data.images.remove(img)
    return a.reshape(h, w, 4)[::-1]


def over(kangas, kuva, x0, y0, paino=1.0):
    h, w = kuva.shape[:2]
    xs, ys = max(0, -x0), max(0, -y0)
    xe, ye = min(w, kangas.shape[1] - x0), min(h, kangas.shape[0] - y0)
    if xe <= xs or ye <= ys:
        return
    k = kangas[y0 + ys:y0 + ye, x0 + xs:x0 + xe]
    p = kuva[ys:ye, xs:xe]
    a = p[..., 3:4] * paino
    k[..., :3] = k[..., :3] * (1 - a) + p[..., :3] * a
    k[..., 3:4] = np.maximum(k[..., 3:4], a)


kangas = np.zeros((H, W, 4), np.float32)
kangas[..., :3] = 0.08
kangas[..., 3] = 1.0
paaty = round(tiedot['pohja']['paaty_pt'] * S)
keski = lue('pohja-keski')
for x in range(paaty, W - paaty, keski.shape[1]):
    over(kangas, keski[:, :min(keski.shape[1], W - paaty - x)], x, 0)
over(kangas, lue('pohja-vasen'), 0, 0)
over(kangas, lue('pohja-oikea'), W - paaty, 0)
ryhma = lue('ryhma')
rx = (W - ryhma.shape[1]) // 2
over(kangas, ryhma, rx, 0)
oletus = {'nopeus': 'nopeus-0', 'pilvet': 'nuppi-00', 'kuukausi': 'nuppi-00', 'kohde': 'kohde-ylos',
          'kuvaa': 'kuvaa-ylos', 'poistu': 'poistu-ylos'}
paikka = {'nopeus': 'nopeus', 'pilvet': 'pilvet', 'kuukausi': 'kuukausi', 'kohde': 'kohde', 'kuvaa': 'kuvaa',
          'poistu': 'poistu'}
for osa, kuva in oletus.items():
    kuva = TILA.get(osa, kuva)
    o = tiedot['osat'][kuva]
    # osakuva on renderöity osan omalle paikalle (keski_pt); sama kuva käy toiselle paikalle siirtämällä ankkuria
    lahde = {'kuukausi': 'pilvet'}.get(osa, paikka[osa])
    dx = tiedot['laatikot'][paikka[osa]]['keski_pt'][0] - tiedot['laatikot'][lahde]['keski_pt'][0]
    img = lue(f'osa-{kuva}')
    over(kangas, img, rx + round((o['keski_pt'][0] + dx - o['koko_pt'][0] / 2) * S),
         round((o['keski_pt'][1] - o['koko_pt'][1] / 2) * S))
for pari in filter(None, TILA.get('valot', '').split(',')):
    nimi, paino = pari.split(':')
    v = lue(f'valo-{nimi}')
    v = np.repeat(np.repeat(v, 2, axis=0), 2, axis=1)
    over(kangas, v, rx, 0, float(paino))
ulos = os.path.join(KANSIO, f'kooste-{ASETTELU}-{int(LEVEYS)}.png')
kirjoita_png(ulos, (np.clip(kangas, 0, 1) * 255 + 0.5).astype(np.uint8))
print('KOOSTE', ulos)
