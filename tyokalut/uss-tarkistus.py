import re,glob,sys
virhe=0
for f in glob.glob('Assets/Matkakirja/UI/Resources/**/*.uss',recursive=True):
    s=re.sub(r'/\*.*?\*/',lambda m:'\n'*m.group(0).count('\n'),open(f,encoding='utf-8').read(),flags=re.S)
    d=0
    for i,l in enumerate(s.split('\n'),1):
        for ch in l:
            if ch=='{':
                if d: print(f'{f}:{i}: sisäkkäinen avaus'); virhe=1
                d+=1
            elif ch=='}': d-=1
    if d: print(f'{f}: {d} sulkematonta'); virhe=1
sys.exit(virhe)
