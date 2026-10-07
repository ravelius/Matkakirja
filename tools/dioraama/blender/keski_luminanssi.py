# Detalji- ja maastokerrosten diff-kuvien keskimääräinen lineaarinen luminanssi (Linnanrakentaja 1.10.2026, Siirtosepän
# pyyntö: natiivi laski sen ennen pakkausta GetPixelsillä, mutta valmiista ASTC:stä ei voi). Kirjoitetaan manifesteihin,
# joista rakenna.mjs vie sen pakettiin kenttänä `keski`:
#   kuoren detalji  js/dioraama/kirjasto/lahteet.json  "materiaali/<id>".keski   painot 0,299 R + 0,587 G + 0,114 B
#   maanpinta       js/dioraama/rakennukset/olavinlinna/ymparisto-maasto.json kerrokset[].keski   0,2126/0,7152/0,0722
# (natiivi käytti kahdessa paikassa eri painoja; sRGB → lineaari ennen painotusta, koko kuva).
#   <python numpy+PIL> keski_luminanssi.py <kirjasto/valmiit> <ymparisto-kansio>
import json, os, sys
import numpy as np
from PIL import Image
KIRJ, YMP = sys.argv[1:3]
JUURI = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..')
DETALJI = ['graniittilohkomuuri', 'paanukatto', 'kivilaatta', 'kallio',
           'lasitettu-tiilikatto', 'harmaa-tiilikiveys', 'kalkkirappaus']   # Kielletty kaupunki 7.10.


def keski(polku, painot):
    x = np.asarray(Image.open(polku).convert('RGB')).astype(np.float64) / 255
    lin = np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
    return round(float((lin @ np.array(painot)).mean()), 5)


p = os.path.join(JUURI, 'js/dioraama/kirjasto/lahteet.json'); L = json.load(open(p))
for id in DETALJI:
    L[f'materiaali/{id}']['keski'] = keski(os.path.join(KIRJ, 'materiaali', id, f'{id}_diff.jpg'), (0.299, 0.587, 0.114))
    print('KESKI detalji', id, L[f'materiaali/{id}']['keski'])
json.dump(L, open(p, 'w'), ensure_ascii=False, indent=1); open(p, 'a').write('\n')
p = os.path.join(JUURI, 'js/dioraama/rakennukset/olavinlinna/ymparisto-maasto.json'); M = json.load(open(p))
for k in M['kerrokset']:
    k['keski'] = keski(os.path.join(YMP, 'maasto', f"{k['lahde']}_diff_1k.jpg"), (0.2126, 0.7152, 0.0722))
    print('KESKI maasto', k['id'], k['keski'])
json.dump(M, open(p, 'w'), ensure_ascii=False, indent=1); open(p, 'a').write('\n')
