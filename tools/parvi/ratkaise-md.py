import re,sys
p=sys.argv[1]; s=open(p).read()
s2=re.sub(r'<<<<<<< [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n', lambda m: m.group(1)+m.group(2), s, flags=re.S)
assert '<<<<<<<' not in s2 and '>>>>>>>' not in s2
open(p,'w').write(s2)
