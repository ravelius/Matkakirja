#!/usr/bin/env python3
"""paketoi.py <kaupunki> <työkansio> <pvm>: lataa kuvat (Commons FilePath 1280 px, UA MatkakirjaBot, 1 pyyntö/1,2 s),
rajaa (sips), JPEG q85, kokoaa viennin kansion + json + LAHTEET.md + SHA256SUMS."""
import json, os, sys, hashlib, shutil, subprocess, time, urllib.request, urllib.parse
K, TYO, PVM = sys.argv[1], sys.argv[2], sys.argv[3]
UA = 'MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)'
PK = f'/Users/Shared/Claude/proto-3d/_valmiit/{K}-yksityiskohdat-vienti-{PVM}'
assert not os.path.exists(PK), PK
KUV = f'{PK}/esittely/{K}-v1/kuvat'; os.makedirs(KUV)
rows = json.load(open(f'{TYO}/yhdistetty.json'))
IMG = f'{TYO}/img'; os.makedirs(IMG, exist_ok=True)
def dims(p):
    o = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', p]).decode()
    w = int([l for l in o.split('\n') if 'pixelWidth' in l][0].split()[-1]); h = int([l for l in o.split('\n') if 'pixelHeight' in l][0].split()[-1]); return w, h
ulos = []
for i, r in enumerate(rows):
    f = r['commons_tiedosto'].replace('File:', '')
    nimi = hashlib.sha1(f.encode()).hexdigest()[:16] + '.jpg'
    src = f'{IMG}/{nimi}'
    if not (os.path.exists(src) and os.path.getsize(src) > 5000):
        url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + urllib.parse.quote(f) + '?width=1280'
        for y in range(6):
            try:
                with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60) as v: data = v.read()
                if data[:2] == b'\xff\xd8' or data[:4] == b'\x89PNG' or data[:3] == b'GIF':
                    open(src, 'wb').write(data); break
                print('EI-KUVA', i, f, data[:30]); break
            except Exception as e:
                print('virhe', i, y, e); time.sleep(5 * (y + 1))
        time.sleep(1.2)
    if not os.path.exists(src): print('PUUTTUU', i, f); continue
    w, h = dims(src); tmp = src + '.tmp'
    if r.get('rajaus'):
        x0, y0, x1, y1 = r['rajaus']
        cw = int(round((x1 - x0) * w)); ch = int(round((y1 - y0) * h))
        subprocess.check_call(['sips', '-c', str(ch), str(cw), '--cropOffset', str(int(round(y0 * h))), str(int(round(x0 * w))), src, '--out', tmp], stdout=subprocess.DEVNULL)
    else: shutil.copy(src, tmp)
    dst = f'{KUV}/{nimi}'
    subprocess.check_call(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '85', tmp, '--out', dst], stdout=subprocess.DEVNULL)
    os.remove(tmp)
    w2, h2 = dims(dst)
    r2 = dict(r); r2['media_tiedosto'] = f'esittely/{K}-v1/kuvat/{nimi}'; r2['media_url'] = f'https://media.matkakirja.app/esittely/{K}-v1/kuvat/{nimi}'
    r2['paketti_leveys'] = w2; r2['paketti_korkeus'] = h2; r2['alkuperainen_leveys'] = r2.pop('leveys'); r2['alkuperainen_korkeus'] = r2.pop('korkeus')
    if w2 < 600 or h2 < 350: print('PIENI', i, w2, h2, r['kuvateksti'])
    ulos.append(r2)
json.dump(ulos, open(f'{TYO}/lopullinen.json', 'w'), ensure_ascii=False, indent=1)
json.dump(ulos, open(f'{PK}/esittely/{K}-v1/{K}-yksityiskohdat.json', 'w'), ensure_ascii=False, indent=1)
lah = [f'# {K.capitalize()}n yksityiskohtakuvat, vientipaketti {PVM}', '',
 'Kuvat: Wikimedia Commons (haku ja lataus API:lla, User-Agent MatkakirjaBot/1.0, 1 pyyntö/1,2 s, 1 280 px). Lisenssit: **PD / CC0 / CC BY / CC BY-SA** (ei NC/ND). Kuvat tarkistettu silmin (erillinen tarkistaja) ja rajattu (kenttä `rajaus`); muunnos JPEG q85. CC BY- ja CC BY-SA -kuvissa tekijämaininta on pakollinen (alla).', '',
 '| Tiedosto | Commons | Lisenssi | Tekijä |', '|---|---|---|---|']
for r in ulos: lah.append(f"| {r['media_tiedosto']} | {r['url']} | {r['lisenssi']} | {r['tekija']} |")
open(f'{PK}/LAHTEET.md', 'w').write('\n'.join(lah) + '\n')
rivit = []
for root, _, files in os.walk(PK):
    for fn in files:
        p = os.path.join(root, fn); rel = os.path.relpath(p, PK)
        if rel in ('LAHTEET.md', 'SHA256SUMS'): continue
        rivit.append(f"{hashlib.sha256(open(p,'rb').read()).hexdigest()}  {rel}")
open(f'{PK}/SHA256SUMS', 'w').write('\n'.join(sorted(rivit, key=lambda x: x.split('  ')[1])) + '\n')
print(len(ulos), 'riviä;', len(rivit), 'tiedostoa; paketti', PK)
