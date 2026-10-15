"""Kaukomaan vientipaketti (Karttaseppä 9.10.2026): kaukomaa/v1/<id>/{z}/{x}/{y}.jpg + kaukomaa/v1/index.json + LAHTEET.md + SHA256SUMS.
Käyttö: python3 kaukomaa-paketti.py <paketti> <id1,id2,…>"""
import os, sys, json, shutil, hashlib
K = '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/kaukomaa'
P, ids = sys.argv[1], sys.argv[2].split(',')
assert not os.path.exists(P), P
ix = {'versio': 'v1', 'osoite': 'kaukomaa/v1/{id}/{z}/{x}/{y}.jpg', 'jako': 'XYZ Web Mercator (EPSG:3857), y pohjoisesta, 256 px JPEG q85',
      'krediitti': 'Contains modified Copernicus Sentinel data 2022–2025', 'kaupungit': []}
rivit = []
for i in ids:
    T = json.load(open(f'{K}/{i}/paikka.json')); n = 0
    for z in sorted(os.listdir(f'{K}/{i}/laatat-v'), key=int):
        for x in os.listdir(f'{K}/{i}/laatat-v/{z}'):
            for f in os.listdir(f'{K}/{i}/laatat-v/{z}/{x}'):
                rel = f'kaukomaa/v1/{i}/{z}/{x}/{f}'; os.makedirs(os.path.dirname(f'{P}/{rel}'), exist_ok=True)
                shutil.copyfile(f'{K}/{i}/laatat-v/{z}/{x}/{f}', f'{P}/{rel}'); rivit.append((hashlib.sha256(open(f'{P}/{rel}', 'rb').read()).hexdigest(), rel)); n += 1
    ix['kaupungit'].append({'id': i, 'keskipiste': T['keskipiste'], 'laattoja': n,
        'tasot': {str(v['z']): {'x': v['x'], 'y': v['y'], 'laattoja': v['laattoja']} for v in T['tasot'].values()},
        'z11_z12_bbox': T['reunus_bbox'], 'z13_bbox': T['keskusta_z13_bbox'], 'vesivari_rgb': T['vesivari_rgb'],
        'kuvaus': 'Sentinel-2 L2A -kesämediaani (kesä–elokuu 2022–2025, 10 näkymää / MGRS-ruutu), vesi yhdellä värillä; z11–z12 noin ±100 km, z13 keskusta noin ±28 km'})
json.dump(ix, open(f'{P}/kaukomaa/v1/index.json', 'w'), ensure_ascii=False, indent=1)
rivit.append((hashlib.sha256(open(f'{P}/kaukomaa/v1/index.json', 'rb').read()).hexdigest(), 'kaukomaa/v1/index.json'))
open(f'{P}/SHA256SUMS', 'w').write(''.join(f'{h}  {r}\n' for h, r in sorted(rivit, key=lambda t: t[1])))
open(f'{P}/LAHTEET.md', 'w').write("""# Kaukomaa v1: vientipaketin lähteet ja lisenssit

Paketin laati Karttaseppä 9.10.2026 (PT: pallokierroksen kaukomaa; CesiumKaupunki-aluskerroksen rasteripeite yli 1,2 km:n korkeudella). Kansiorakenne vastaa ämpärin polkuja.

## kaukomaa/v1/<id>/{z}/{x}/{y}.jpg ja index.json

- **Lähde:** Copernicus Sentinel-2 L2A (ESA), Earth Search / sentinel-cogs, kesät (kesä–elokuu) 2022–2025.
- **Lisenssi:** Copernicus Sentinel -datan vapaa ja avoin käyttö (Copernicus-säädös (EU) N:o 1159/2013), myös kaupallinen. Merkintä: **"Contains modified Copernicus Sentinel data 2022–2025"**.
- **Käsittely:** MGRS-ruutukohtainen mediaani (10 vähiten pilvistä näkymää, SCL-pilvimaski, BOA-offset mitattu), sävytys kuten kuvauspaikoissa. Vesi (S2-vesimaski) yhdellä värillä, joka on keskustan puhtaan veden mediaani.
- **Kaupungit:** """ + ', '.join(ids) + """. Web Mercator z11–z12 noin ±100 km keskustasta, z13 noin ±28 km.

## Äänet ja mallit

Paketissa ei ole ääniä eikä 3D-malleja.
""")
print('valmis', P, len(rivit), 'tiedostoa')
