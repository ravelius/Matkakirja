"""LS2 9.10.: kaukomaan kopio kaupunkikohtaisella paikallisjaolla (Cesiumin oma tiling scheme): <polku>/{id}/{L}/{i}/{j}.jpg,
L = z − 11, i = x − x0·2^L, j = y − y0·2^L (y pohjoisesta), x0/y0 = z11:n minimit. Sisältö tavulleen sama.
Käyttö: python3 kaukomaa-v1p.py <paketti> <lähde: laatat-v | yo> <polku: v1p | yo-v1p> <id1,id2>"""
import os, sys, json, shutil, hashlib
K = '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/kaukomaa'
P, LAH, POL, ids = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4].split(',')
assert not os.path.exists(P), P
ix = {'versio': POL, 'osoite': f'kaukomaa/{POL}/{{id}}/{{L}}/{{i}}/{{j}}.jpg', 'jako': 'L = z − 11 (0–2), i = x − x0·2^L, j = y − y0·2^L (y pohjoisesta); juuri = kaupungin z11-ruudukko (x0, y0, nx, ny), Web Mercator',
      'sisalto': f'tavulleen sama kuin kaukomaa/{"v1" if LAH == "laatat-v" else "yo-v1"}', 'kaupungit': []}
rivit = []
for i in ids:
    T = json.load(open(f'{K}/{i}/paikka.json')); t11 = [v for v in T['tasot'].values() if v['z'] == 11][0]; x0, y0 = t11['x'][0], t11['y'][0]; n = 0
    for z in sorted(os.listdir(f'{K}/{i}/{LAH}'), key=int):
        L = int(z) - 11
        for x in os.listdir(f'{K}/{i}/{LAH}/{z}'):
            for f in os.listdir(f'{K}/{i}/{LAH}/{z}/{x}'):
                y = int(f[:-4]); rel = f'kaukomaa/{POL}/{i}/{L}/{int(x) - x0 * 2 ** L}/{y - y0 * 2 ** L}.jpg'
                os.makedirs(os.path.dirname(f'{P}/{rel}'), exist_ok=True); shutil.copyfile(f'{K}/{i}/{LAH}/{z}/{x}/{f}', f'{P}/{rel}')
                rivit.append((hashlib.sha256(open(f'{P}/{rel}', 'rb').read()).hexdigest(), rel)); n += 1
    ix['kaupungit'].append({'id': i, 'x0': x0, 'y0': y0, 'nx': t11['x'][1] - x0 + 1, 'ny': t11['y'][1] - y0 + 1, 'laattoja': n,
        'tasot': {str(v['z'] - 11): {'i': [v['x'][0] - x0 * 2 ** (v['z'] - 11), v['x'][1] - x0 * 2 ** (v['z'] - 11)], 'j': [v['y'][0] - y0 * 2 ** (v['z'] - 11), v['y'][1] - y0 * 2 ** (v['z'] - 11)]} for v in T['tasot'].values()}})
json.dump(ix, open(f'{P}/kaukomaa/{POL}/index.json', 'w'), ensure_ascii=False, indent=1)
rivit.append((hashlib.sha256(open(f'{P}/kaukomaa/{POL}/index.json', 'rb').read()).hexdigest(), f'kaukomaa/{POL}/index.json'))
open(f'{P}/SHA256SUMS', 'w').write(''.join(f'{h}  {r}\n' for h, r in sorted(rivit, key=lambda t: t[1])))
open(f'{P}/LAHTEET.md', 'w').write(f"""# Kaukomaa {POL}: vientipaketin lähteet

Paketin laati Karttaseppä 9.10.2026 (LS2: Cesiumin oma tiling scheme, ei 404-pyyntöjä bboxin ulkopuolelle). Sisältö on tavulleen sama kuin kaukomaa/{"v1" if LAH == "laatat-v" else "yo-v1"}:ssä. Vain osoitteet ovat paikallisia (index.json).
Lähteet ja lisenssit kuten alkuperäisessä: {"Contains modified Copernicus Sentinel data 2022–2025 (Copernicus-säädös (EU) N:o 1159/2013)" if LAH == "laatat-v" else "NASA Black Marble 2016 (public domain); ESA WorldCover 2021 (CC BY 4.0)"}.

## Äänet ja mallit

Paketissa ei ole ääniä eikä 3D-malleja.
""")
print('valmis', P, len(rivit))
