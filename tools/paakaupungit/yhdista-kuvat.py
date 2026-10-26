# Pääkaupunkikuvat (batch-0073) sisalto.json-tiedostoihin: vain SK:n hyväksymät (hyvaksytty_per_era), runtime-payload
# targetTokens-polkuun, runtimeRemoveMediaKeys pois. Käyttö: yhdista-kuvat.py <b0073.json> <hyvaksytyt.json> <pilvi-kansio>
import json, sys, os
b = json.load(open(sys.argv[1])); h = json.load(open(sys.argv[2])); juuri = sys.argv[3]
ok = {i for v in h['hyvaksytty_per_era'].values() for i in v}
def tunnukset(v):
    if isinstance(v, dict): return {i for x in v.values() for i in tunnukset(x)}
    if isinstance(v, list): return {x['id'] if isinstance(x, dict) else x for x in v}
    return set()
# Kaikki muut listat (v1: odottaa, hylatty; v2: poistettu_esineslotit, hylatty) ovat poissulkuja.
pois = set().union(*[tunnukset(v) for k, v in h.items() if k not in ('hyvaksytty_per_era', 'huom')])
assert not (ok & pois), 'hyväksytty ja odottaa/hylätty päällekkäin'
tiedostot, n, ohi, muu = {}, 0, [], 0
for a in b['qualifiedAssets']:
    if a['assetID'] not in ok: continue
    if not os.path.isdir(os.path.join(juuri, a['era'])): muu += 1; continue  # erä ei mukana tässä kytkennässä
    p = os.path.join(juuri, a['era'], a['city'], 'sisalto.json')
    if p not in tiedostot: tiedostot[p] = json.load(open(p, encoding='utf-8'))
    o = tiedostot[p]
    try:
        tt = a['targetTokens']
        for j, t in enumerate(tt):
            # Nähtävyyden tyhjä kuvat-lista: kuvat[0] lisätään (Codexin polku osoittaa ensimmäiseen paikkaan).
            if isinstance(o, list) and isinstance(t, int) and t == len(o) and j == len(tt) - 1: o.append({})
            o = o[t]
    except (KeyError, IndexError, TypeError):
        ohi.append((a['assetID'], a['targetJsonPath'])); continue
    if not isinstance(o, dict): ohi.append((a['assetID'], 'ei objekti')); continue
    for k in a.get('runtimeRemoveMediaKeys', []): o.pop(k, None)
    o.update(a['runtimeMediaFieldPayload']); n += 1
# Havainnekuvan kuvateksti ei saa kutsua kuvaa kuvitukseksi (tests/havainnekuva-sanasto.test.mjs, omistaja 27.9.).
KUVITUS = [(', yleiskuvitus. Havainnekuva.', '. Havainnekuva.'), (' museotyön yleiskuvituksena.', ' museotyössä.'),
           ('Rannan aamukäyttö, Labadin aiheen yleiskuvitus.', 'Rannan aamukäyttö Labadissa.')]
# Myös avaimeton {} on tyhjä paikka: Codexin tehtävä 118 jätti QA-pidosta poistetut kansikuvat sellaisiksi (Monrovia).
def tyhja(x): return isinstance(x, dict) and not any(x.get(k) for k in ('tiedosto', 'osoite', 'ampari'))
korjattu, karsittu = 0, 0
def siivoa(o):
    # Codexin tyhjät kuvapaikat (hylätty, esineslot tai satelliitti ilman hyväksyntää) pois kuvalistoista.
    global korjattu, karsittu
    if isinstance(o, list):
        for x in o: siivoa(x)
    elif isinstance(o, dict):
        for k, v in list(o.items()):
            if k in ('kansikuvat', 'kuvat', 'galleria', 'avauskuvat') and isinstance(v, list):
                uusi = [x for x in v if not tyhja(x)]; karsittu += len(v) - len(uusi); o[k] = v = uusi
            elif k in ('lyhyt', 'selite') and isinstance(v, str) and 'kuvitu' in v:
                for a, b in KUVITUS:
                    if a in v: o[k] = v = v.replace(a, b); korjattu += 1
            siivoa(v)
import glob
for p in glob.glob(os.path.join(juuri, 'e*', '*', 'sisalto.json')):
    if p not in tiedostot: tiedostot[p] = json.load(open(p, encoding='utf-8'))
for p, d in tiedostot.items():
    siivoa(d)
    with open(p + '.uusi', 'w', encoding='utf-8') as f: json.dump(d, f, ensure_ascii=False, indent=2); f.write('\n')
    os.replace(p + '.uusi', p)
print(f'yhdistetty {n}/{len(ok) - muu} kuvaa (muut erät {muu}) {len(tiedostot)} tiedostoon; ohitettu {len(ohi)}')
for x in ohi[:20]: print('  OHI', *x)
print(f'tyhjiä kuvapaikkoja karsittu {karsittu}, kuvitus-sana korjattu {korjattu} kenttään')
