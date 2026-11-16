"""Julkisivujen lopputaulu (Valoseppä 17.11.): koe-rw/<k>/merkit-<k>.json → markdown stdoutiin. Sarake 'lähde' = käsitaulu / OSM entrance=main / sääntö 3.
Käyttö: python3 -I julkisivu-taulu.py [vanha-merkit-kansio] (vertailu: muuttuneet sivut merkitään ←)."""
import json, os, sys
TY = os.path.dirname(os.path.abspath(__file__))
SUUNTA = ['pohjoinen', 'koillinen', 'itä', 'kaakko', 'etelä', 'lounas', 'länsi', 'luode']
def ilma(atsi, sivu): return SUUNTA[int(((atsi + {'+x': 0, '-x': 180, '+z': -90, '-z': 90}[sivu]) % 360 + 22.5) // 45) % 8]
vanha = sys.argv[1] if len(sys.argv) > 1 else None
print('| kaupunki | osm | nimi | sivu | ilmansuunta | lähde | avoimuus | epävarma |')
print('|---|---|---|---|---|---|---|---|')
for k in [k for k in ('rooma', 'wien', 'amsterdam') if os.path.exists(f'{TY}/koe-rw/{k}/merkit-{k}.json')]:
    ms = json.load(open(f'{TY}/koe-rw/{k}/merkit-{k}.json'))['merkit']
    ennen = {}
    if vanha and os.path.exists(f'{vanha}/{k}/merkit-{k}.json'):
        for m in json.load(open(f'{vanha}/{k}/merkit-{k}.json'))['merkit']:
            p = m.get('parametrit') or {}; s = p.get('julkisivu') if m['tyyppi'] == 'palatsi' else p.get('julkisivu_paa')
            if s: ennen[m['osm']] = ilma(m['akseli'], s)
    for m in ms:
        p = m.get('parametrit') or {}
        if 'avoimuus' not in p: continue
        s = p.get('julkisivu') if m['tyyppi'] == 'palatsi' else p.get('julkisivu_paa')
        i = ilma(m['akseli'], s); mu = f' ← oli {ennen[m["osm"]]}' if m['osm'] in ennen and ennen[m['osm']] != i else ''
        avo = ' '.join(f'{a}{v:.0f}' for a, v in p['avoimuus'].items())
        print(f"| {k} | {m['osm']} | {(m['nimi'] or '')[:40]} | {s} | {i}{mu} | {p.get('julkisivu_lahde', '')} | {avo} | {p.get('julkisivu_epavarma') or ''} |")
