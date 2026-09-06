# Käyttö: python3 liita-lisays.py <tiedosto> <base-ref> <theirs-ref>
# Ottaa työpuun (ours) version ja lisää siihen theirs-version base:en nähden
# lisäämät lohkot samaan ankkurikohtaan (viimeinen esiintymä).
import sys, subprocess, difflib
f, base_ref, theirs_ref = sys.argv[1:4]
base = subprocess.check_output(['git','show',f'{base_ref}:{f}']).decode().splitlines(True)
theirs = subprocess.check_output(['git','show',f'{theirs_ref}:{f}']).decode().splitlines(True)
ours = subprocess.check_output(['git','show',f':2:{f}']).decode().splitlines(True)
sm = difflib.SequenceMatcher(None, base, theirs, autojunk=False)
ins = []
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag == 'insert': ins.append((i1, theirs[j1:j2]))
    elif tag == 'replace': ins.append((i1, theirs[j1:j2])); print('HUOM replace', i1, i2, ''.join(base[i1:i2])[:200])
    elif tag != 'equal': print('HUOM delete', i1, i2)
for i1, block in reversed(ins):
    ctx = base[i1:i1+3]
    idx = None
    for k in range(len(ours)-len(ctx), -1, -1):
        if ours[k:k+len(ctx)] == ctx: idx = k; break
    if idx is None:
        ctx = base[i1-3:i1]
        for k in range(len(ours)-len(ctx), -1, -1):
            if ours[k:k+len(ctx)] == ctx: idx = k+len(ctx); break
    assert idx is not None, 'ankkuri ei löydy'
    ours[idx:idx] = block
open(f,'w').write(''.join(ours))
print('lisätty', [(i,len(b)) for i,b in ins])
