"""Kaukomaan yövalojen vientipaketti (Karttaseppä 9.10.2026): kaukomaa/yo-v1/<id>/{z}/{x}/{y}.jpg + index.json + LAHTEET.md + SHA256SUMS.
Käyttö: python3 kaukomaa-yo-paketti.py <paketti> <id1,id2,…>"""
import os, sys, json, shutil, hashlib
K = '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/kaukomaa'
P, ids = sys.argv[1], sys.argv[2].split(',')
assert not os.path.exists(P), P
ix = {'versio': 'yo-v1', 'osoite': 'kaukomaa/yo-v1/{id}/{z}/{x}/{y}.jpg', 'jako': 'sama kuin kaukomaa/v1 (XYZ Web Mercator, y pohjoisesta, 256 px)',
      'arvo': 'harmaa voimakkuus 0–255 (emissio, lineaarisesti valotukseen; sävy natriumoranssi varjostimessa), vesi pimeä',
      'krediitti': 'NASA Earth Observatory (Black Marble 2016, VIIRS); ESA WorldCover 2021 (CC BY 4.0)', 'kaupungit': []}
rivit = []
for i in ids:
    T = json.load(open(f'{K}/{i}/paikka.json')); n = 0
    for z in sorted(os.listdir(f'{K}/{i}/yo'), key=int):
        for x in os.listdir(f'{K}/{i}/yo/{z}'):
            for f in os.listdir(f'{K}/{i}/yo/{z}/{x}'):
                rel = f'kaukomaa/yo-v1/{i}/{z}/{x}/{f}'; os.makedirs(os.path.dirname(f'{P}/{rel}'), exist_ok=True)
                shutil.copyfile(f'{K}/{i}/yo/{z}/{x}/{f}', f'{P}/{rel}'); rivit.append((hashlib.sha256(open(f'{P}/{rel}', 'rb').read()).hexdigest(), rel)); n += 1
    ix['kaupungit'].append({'id': i, 'laattoja': n, 'tasot': {str(v['z']): {'x': v['x'], 'y': v['y']} for v in T['tasot'].values()}, 'z11_z12_bbox': T['reunus_bbox'], 'z13_bbox': T['keskusta_z13_bbox']})
json.dump(ix, open(f'{P}/kaukomaa/yo-v1/index.json', 'w'), ensure_ascii=False, indent=1)
rivit.append((hashlib.sha256(open(f'{P}/kaukomaa/yo-v1/index.json', 'rb').read()).hexdigest(), 'kaukomaa/yo-v1/index.json'))
open(f'{P}/SHA256SUMS', 'w').write(''.join(f'{h}  {r}\n' for h, r in sorted(rivit, key=lambda t: t[1])))
open(f'{P}/LAHTEET.md', 'w').write("""# Kaukomaan yövalot yo-v1: vientipaketin lähteet ja lisenssit

Paketin laati Karttaseppä 9.10.2026 (PT: pallon yö, omistajan pallolista). Kansiorakenne vastaa ämpärin polkuja. Jako on sama kuin kaukomaa/v1:ssä. Kerros täyttää lähiyövalojen (häipyvät 5–12 km) takaisen kaukomaan.

## kaukomaa/yo-v1/<id>/{z}/{x}/{y}.jpg ja index.json

- **Valon voimakkuus:** NASA Black Marble 2016 (Suomi NPP VIIRS Day/Night Band, 500 m), NASA Earth Observatory, public domain (sama lähde kuin linssit/kaupunki/yovalot-2026-10-06).
- **Muoto:** ESA WorldCover 2021 v200, rakennettu alue (luokka 50), © ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium, **CC BY 4.0**.
- **Käsittely:** voimakkuus = 1 − exp(−2,4 · BM^0,8 · (0,04 + 0,96 · rakennettu osuus)), vesi (kaukomaan vesimaski) pimeä.
- **Kaupungit:** """ + ', '.join(ids) + """.

## Äänet ja mallit

Paketissa ei ole ääniä eikä 3D-malleja.
""")
print('valmis', P, len(rivit), 'tiedostoa')
