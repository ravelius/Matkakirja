"""Pulun kaupunki-/maaerän faktakorjaukset paikallaan (PT:n pistokoe 9.11.2026: ei uusia ottoja).
python3 -I tools/pulu-esigenerointi/korjaa-kaumaa.py <KAUMAA-kansio> <korjaukset.txt> [--kuiva]
Korjaustiedoston muoto (toistuu):
  ### v1-<i> tai v2-<i>
  VANHA: <tarkka katkelma vastauksesta, yhdellä rivillä; \\n = rivinvaihto>
  UUSI: <korvaava katkelma>
  SYY: <lyhyt peruste>
Katkelman on löydyttävä vastauksesta täsmälleen kerran; [[linkit]] eivät saa muuttua (sama joukko ennen ja jälkeen).
Tiedostot kirjoitetaan .tmp + os.replace (oikeudet säilyvät)."""
import json, os, re, shutil, sys

kansio, polku = sys.argv[1], sys.argv[2]
kuiva = '--kuiva' in sys.argv
LINKKI = re.compile(r'\[\[([^\]|]+)\]\]')
data = {'v1': json.load(open(os.path.join(kansio, 'vaihe1.json'), encoding='utf-8')),
        'v2': json.load(open(os.path.join(kansio, 'vaihe2.json'), encoding='utf-8'))}

def lohkot(teksti):
    nyk = None
    for rivi in teksti.splitlines():
        if rivi.startswith('### '):
            if nyk: yield nyk
            nyk = {'id': rivi[4:].strip()}
        elif nyk is not None:
            for kentta in ('VANHA', 'UUSI', 'SYY'):
                if rivi.startswith(kentta + ':'):
                    nyk[kentta] = rivi[len(kentta) + 1:].strip().replace('\\n', '\n')
    if nyk: yield nyk

ok = virhe = 0
for k in lohkot(open(polku, encoding='utf-8').read()):
    try:
        v, i = k['id'].split('-'); i = int(i)
        x = data[v][i]
        t = x['vastaus']
        if k.get('SYY', '').startswith('LINKKI:'):
            print(f"LINKKI (käsin) {k['id']}: {k['SYY']}"); continue
        if 'VANHA' not in k or 'UUSI' not in k: raise ValueError('VANHA tai UUSI puuttuu')
        if t.count(k['VANHA']) != 1: raise ValueError(f"katkelma löytyy {t.count(k['VANHA'])} kertaa")
        u = t.replace(k['VANHA'], k['UUSI'])
        u = re.sub(r'(?<=\S) {2,}(?=\S)', ' ', u).replace(' .', '.').replace(' ,', ',').strip()   # poiston jäljet
        if k.get('SYY', '').startswith('LINKKIMUUTOS'):   # linkin nimi korjataan tarkoituksella (vain V2; V1:n linkeillä lisaa-avain)
            if v != 'v2': raise ValueError('LINKKIMUUTOS vain V2:lle')
            x['linkit'] = list(dict.fromkeys(LINKKI.findall(u)))
        elif set(LINKKI.findall(t)) != set(LINKKI.findall(u)): raise ValueError('linkit muuttuisivat')
        x['vastaus'] = u; ok += 1
    except Exception as e:
        virhe += 1; print(f"HYLÄTTY {k.get('id')}: {e}")
print(f'korjattu {ok}, hylätty {virhe}' + (' (kuiva)' if kuiva else ''))
if not kuiva:
    for v, nimi in (('v1', 'vaihe1.json'), ('v2', 'vaihe2.json')):
        p = os.path.join(kansio, nimi)
        with open(p + '.tmp', 'w', encoding='utf-8') as f:
            json.dump(data[v], f, ensure_ascii=False, indent=1)
        shutil.copymode(p, p + '.tmp'); os.replace(p + '.tmp', p)
