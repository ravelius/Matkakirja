# Käyttö: python3 liita-loppuun.py <tiedosto> <commit>
# Ottaa oman version (:2) ja lisää commitin OMAAN vanhempaansa nähden
# lisäämät lohkot ennen tiedoston viimeistä "};"-riviä (tai ankkurin kohdalle).
import sys, subprocess, difflib
f, c = sys.argv[1:3]
base = subprocess.check_output(['git','show',f'{c}^:{f}']).decode().splitlines(True)
theirs = subprocess.check_output(['git','show',f'{c}:{f}']).decode().splitlines(True)
ours = subprocess.check_output(['git','show',f':2:{f}']).decode().splitlines(True)
sm = difflib.SequenceMatcher(None, base, theirs, autojunk=False)
blocks=[]
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag in ('insert','replace'): blocks.append((i1,i2,theirs[j1:j2]))
# viimeinen "};" omassa versiossa
last = max(i for i,l in enumerate(ours) if l.rstrip()=='};')
lisays=[]
for i1,i2,blk in blocks:
    ctx = base[i1:i1+2]
    idx=None
    for k in range(len(ours)-len(ctx),-1,-1):
        if ours[k:k+len(ctx)]==ctx: idx=k; break
    if idx is not None and idx<=last: ours[idx:idx]=blk; last+=len(blk)
    else: lisays.extend(blk)
if lisays: ours[last:last]=lisays
open(f,'w').write(''.join(ours))
print(f, 'lohkoja', len(blocks), 'loppuun', len(lisays))
