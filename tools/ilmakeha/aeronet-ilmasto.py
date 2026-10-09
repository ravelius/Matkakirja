import sys, json, collections
D = sys.argv[1]
K = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
out = {}
for s in sys.argv[3].split(','):
    L = open(f'{D}/19930101_20261003_{s}.lev20', encoding='latin-1').read().splitlines()
    h = L[6].split(','); ix = {n: i for i, n in enumerate(h)}
    kk = collections.defaultdict(list)
    for r in L[7:]:
        c = r.split(',')
        if len(c) < 56: continue
        y, m = c[0].split('-'); y = int(y)
        a440, a870, al, nd = float(c[ix['AOD_440nm']]), float(c[ix['AOD_870nm']]), float(c[ix['440-870_Angstrom_Exponent']]), float(c[ix['NUM_DAYS[AOD_440nm]']])
        if a440 < 0 or al < -5 or nd < 3 or y < 2010: continue
        kk[K.index(m)].append((a440 * (550 / 440) ** -al, al, nd, y))
    out[s] = {}
    for m in range(12):
        v = kk[m]
        if not v: continue
        w = sum(x[2] for x in v)
        out[s][m + 1] = {'aod550': round(sum(x[0] * x[2] for x in v) / w, 3), 'angstrom': round(sum(x[1] * x[2] for x in v) / w, 2), 'paivia': int(w), 'vuosia': len(v)}
    print(s, ' '.join(f"{m}:{d['aod550']}/{d['angstrom']}({d['vuosia']})" for m, d in out[s].items()))
json.dump(out, open(sys.argv[2], 'w'), indent=1)
