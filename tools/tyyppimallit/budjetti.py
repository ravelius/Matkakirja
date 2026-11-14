"""KK 14.11. 23.59 BUDJETTI (a): merkit-<k>.json → mallimuunnelmat (tulos/budjetti-muunnelmat.tsv) → Luonnos.dll budjetti → tulos/budjetti-mallit.tsv.
python3 -I budjetti.py muunnelmat   |   python3 -I budjetti.py kooste   (kooste lukee mallit.tsv:n ja tulostaa summat kaupungeittain)."""
import json, sys, collections, os
T = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tulos')
def avain(m):
    t, k, p = m['tyyppi'], m['koko'], m['parametrit'] or {}
    if t == 'kirkko':
        if k == 'suuri': return 'kirkko-suuri', ['kirkko-suuri']
        return f"kirkko-{k}|{m['torni_paikka']}|{m['torneja']}|{m['huippu']}", [f'kirkko-{k}', m['torni_paikka'], str(m['torneja']), m['huippu']]
    if t == 'asema':
        a = ['asema', str(p['halleja']), f"{m['pituus']:.1f}", f"{m['leveys']:.1f}"]; return 'asema|' + (m['nimi'] or m['osm']), a
    if t == 'palatsi':
        a = ['piha', f"{m['pituus']:.1f}", f"{m['leveys']:.1f}", p.get('julkisivu') or '+z', p.get('avoin_sivu') or '']; return 'palatsi|' + m['nimi'], a
    if t == 'kupolikirkko': return 'kupolikirkko|true', ['kupolikirkko', 'true']
    if t == 'pylvastemppeli':
        return ('pylvastemppeli|attika', ['pylvastemppeli', '70', '42', '10', 'false']) if p.get('katto') == 'attika' else ('pylvastemppeli', ['pylvastemppeli', '100', '40', '8', 'true'])
    raise ValueError(t)
def merkit(k): return [m for m in json.load(open(f'{T}/merkit-{k}.json'))['merkit'] if not m.get('ei_sovi')]
if sys.argv[1] == 'muunnelmat':
    rivit = {}
    for k in ('pariisi', 'lontoo'):
        for m in merkit(k): a, r = avain(m); rivit[a] = r
    with open(f'{T}/budjetti-muunnelmat.tsv', 'w') as f:
        for a, r in sorted(rivit.items()): f.write('\t'.join([a] + r) + '\n')
    print(len(rivit), 'muunnelmaa')
else:
    # Pelin talopalojen alue: kaupunkitaulun raja (tee_palat.py rivi 287, keskipiste) ja Pariisissa lisäksi talolähde (natiiviseppa/pariisi-talot/osm.json).
    TAULU = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vaihtelu-20261114/taulu-uusi.json'
    t = json.load(open(TAULU))
    o = json.load(open('/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json')); pid = {w['osm'] for w in o['ways']} | {w['osm'] for w in o['rel']}
    M = {r.split('\t')[0]: r.rstrip('\n').split('\t') for r in open(f'{T}/budjetti-mallit.tsv')}
    tulos = {}
    for k in ('pariisi', 'lontoo'):
        LA0, LA1, LO0, LO1 = t[k]['raja']; ms = merkit(k)
        sis = [m for m in ms if LA0 <= m['keski'][0] <= LA1 and LO0 <= m['keski'][1] <= LO1 and (k != 'pariisi' or m['osm'] in pid)]
        for nimi, joukko in (('kaikki', ms), ('alueella', sis)):
            c = collections.Counter(avain(m)[0] for m in joukko)
            tri = sum(int(M[a][1]) * n for a, n in c.items()); kar = sum(int(M[a][2]) * n for a, n in c.items()); uniq = sum(int(M[a][1]) for a in c)
            tulos[(k, nimi)] = dict(merkkeja=len(joukko), verkkoja=len(c), kolmioita=tri, karkia=kar, jaetut_kolmiot=uniq,
                                    tyypit=dict(collections.Counter(f"{m['tyyppi']}-{m['koko']}" for m in joukko)))
            print(k, nimi, json.dumps(tulos[(k, nimi)], ensure_ascii=False))
        json.dump([m['osm'] for m in sis], open(f'{T}/budjetti-alueella-{k}.json', 'w'))
