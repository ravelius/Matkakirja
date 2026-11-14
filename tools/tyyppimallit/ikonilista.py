"""Pelin koodimallien luettelo automaattisesti (KK 14.11. 23.59: ei käsin ylläpidettävää listaa). Lukee OhjelmaKohteet.cs:n (Unity-repo, sama sha kuin
lahde/LAHDE-SHA) ja kirjoittaa TSV:n: kaupunki, nimi, Lat, Lon, Akseli, SiirtoX, SiirtoZ, Tee. Luonnos.dll ikonit <tsv> <json> ratkaisee vakiot ja
verkot heijastuksella. Lontoo = LontoonKohteet(), Pariisi = KaikkiKohteet() (+ lista.Add). Lambdat (sillat, Concorde) ohitetaan: eivät ole taloja.
python3 -I ikonilista.py <OhjelmaKohteet.cs> <ulos.tsv>"""
import re, sys
src, ulos = sys.argv[1:3]
rivit = open(src, encoding='utf-8').read().split('\n')
def lohko(alku, loppu):
    i = next(n for n, r in enumerate(rivit) if alku in r)
    j = next(n for n in range(i, len(rivit)) if loppu in rivit[n])
    return rivit[i:j + 1]
out = []
for kaupunki, l in (('lontoo', lohko('static Kohde[] LontoonKohteet()', '};')), ('pariisi', lohko('static Kohde[] KaikkiKohteet()', 'return lista'))):
    for r in l:
        if 'new Kohde {' not in r: continue
        g = lambda k: (re.search(r'\b' + k + r' = ([^,}]+)', r) or [None, ''])[1].strip().rstrip('f')
        tee = g('Tee')
        if not tee.startswith('OhjelmaKohdeGeometria.') or '(' in tee: print('ohitetaan', g('Nimi'), tee); continue
        out.append([kaupunki, g('Nimi').strip('"'), g('Lat'), g('Lon'), g('Akseli') or '0', g('SiirtoX') or '0', g('SiirtoZ') or '0', tee])
open(ulos, 'w').write('\n'.join('\t'.join(o) for o in out) + '\n'); print(len(out), 'koodimallia →', ulos)
