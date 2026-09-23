#!/usr/bin/env python3
# Projektin omat asmdefit (Assets/Matkakirja/**) riippuvuusjärjestyksessä
# unity-tarkistus.sh:lle. Rivi: nimi<TAB>kansio<TAB>noEngineReferences(0/1)<TAB>omat viitteet pilkulla.
# Pakettien viitteet (Cesium, TMP …) tulevat Library/ScriptAssemblies-kansiosta erikseen.
# Toinen argumentti = kansio, johon kirjoitetaan tiedostolistat <nimi>.lst (lähimmän
# asmdefin mukaan) ja Assembly-CSharp.lst (asmdefittömät, ei Editor-kansioita).
import json, os, sys
juuri = sys.argv[1] if len(sys.argv) > 1 else '../Assets/Matkakirja'
asm = {}
for kansio, _, tiedostot in os.walk(juuri):
    for t in tiedostot:
        if t.endswith('.asmdef'):
            d = json.load(open(os.path.join(kansio, t), encoding='utf-8-sig'))
            asm[d['name']] = (kansio, bool(d.get('noEngineReferences')), d.get('references', []))
jarj, tila = [], {}
def kay(n):
    if tila.get(n) == 2: return
    if tila.get(n) == 1: sys.exit('asmdef-kehä: ' + n)
    tila[n] = 1
    for r in asm[n][2]:
        if r in asm: kay(r)
    tila[n] = 2; jarj.append(n)
for n in sorted(asm): kay(n)
for n in jarj:
    k, ne, refs = asm[n]
    print('\t'.join([n, k, '1' if ne else '0', ','.join(r for r in refs if r in asm)]))

if len(sys.argv) > 2:
    ulos = sys.argv[2]; os.makedirs(ulos, exist_ok=True)
    kansiot = sorted(((os.path.normpath(v[0]), n) for n, v in asm.items()), key=lambda x: -len(x[0]))
    listat = {n: [] for n in asm}; listat['Assembly-CSharp'] = []
    for kansio, _, tiedostot in os.walk(juuri):
        for t in tiedostot:
            if not t.endswith('.cs'): continue
            p = os.path.normpath(os.path.join(kansio, t))
            oma = next((n for k, n in kansiot if p.startswith(k + os.sep)), None)
            if oma is None:
                if os.sep + 'Editor' + os.sep in p: continue
                oma = 'Assembly-CSharp'
            listat[oma].append(p)
    for n, l in listat.items():
        open(os.path.join(ulos, n + '.lst'), 'w').write('\n'.join(sorted(l)) + '\n')
