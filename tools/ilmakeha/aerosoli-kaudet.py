import json, sys
A = json.load(open(sys.argv[1]))
K = {'talvi': [12, 1, 2], 'kevat': [3, 4, 5], 'kesa': [6, 7, 8], 'syksy': [9, 10, 11]}
def kk(lahteet, m):
    for s in lahteet:
        d = A[s].get(str(m))
        if d and d['vuosia'] >= 5: return d, s
    return None, None
T = {'pariisi': (['Paris'], 0.90), 'tukholma': (['Helsinki', 'Toravere'], 0.93)}
out = {}
for c, (lahteet, ssa) in T.items():
    out[c] = {}
    for k, mm in K.items():
        v = [kk(lahteet, m) for m in mm]
        out[c][k] = {'aod550': round(sum(d['aod550'] for d, _ in v) / 3, 3), 'angstrom': round(sum(d['angstrom'] for d, _ in v) / 3, 2), 'ssa': ssa,
                     'asemat': sorted({s for _, s in v}), 'kuukaudet': mm}
    print(c, {k: (v['aod550'], v['angstrom'], v['asemat']) for k, v in out[c].items()})
json.dump(out, open(sys.argv[2], 'w'), indent=1, ensure_ascii=False)
