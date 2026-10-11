import json,sys
# puu.py lista | puu.py hae <teksti> [n]  -> tulostaa "x y" keskipiste (vaakapisteet)
d=json.load(open(sys.argv[1])); els=d['elementit']; mode=sys.argv[2]
def txt(e): return e.get('teksti') or ''
if mode=='lista':
    for e in els:
        if txt(e) or 'mk-nappi' in e.get('luokat','') or 'mk-ohjausnappi' in e.get('luokat',''):
            print(f"{int(e['x']+e['w']/2)},{int(e['y']+e['h']/2)}\t{txt(e)[:60]}\t{e.get('luokat','').split()[-1]}")
elif mode=='hae':
    q=sys.argv[3]; n=int(sys.argv[4]) if len(sys.argv)>4 else 0
    m=[e for e in els if q.lower() in txt(e).lower() or q in e.get('luokat','')]
    if not m: print('EI'); sys.exit(1)
    # täsmäosuma ensin
    ex=[e for e in m if txt(e).lower()==q.lower()]; m=ex or m
    m.sort(key=lambda e:-e['kerros']) if False else None
    e=m[n if n>=0 else len(m)+n]; print(int(e['x']+e['w']/2), int(e['y']+e['h']/2))
elif mode=='ui':
    print(len(els))
