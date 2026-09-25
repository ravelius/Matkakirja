#!/usr/bin/env python3
# Testiajurin LAHTEET-lohkon yhdiste: lahteet-union.py <meidän> <yhteinen> <heidän> → kirjoittaa <meidän>.
# Pohjana meidän tiedosto ilman ristiriitamerkkejä; LAHTEET = (meidän ∪ heidän) − (poistettu jommassakummassa yhteisestä).
# Vanha muoto (rivijatkoiset ../Assets/…cs \) muunnetaan LAHTEET-muotoon.
import re, sys
def lue(p):
    try: return open(p, encoding='utf-8').read()
    except FileNotFoundError: return ''
m, o, h = (lue(p) for p in sys.argv[1:4])
cs = lambda s: set(re.findall(r'\.\./Assets/[^\s\\"]+\.cs', s))
A, O, B = cs(m), cs(o), cs(h)
lahteet = (A | B) - ((O - A) | (O - B))
# Pohja: heidän tai meidän versio, kumpi on jo LAHTEET-muodossa ilman merkkejä.
pohja = next((s for s in (m, h) if 'LAHTEET="' in s and '<<<<<<<' not in s), None)
if pohja is None:
    pohja = h if '<<<<<<<' not in h else m
i = pohja.index('$DN "$R/DotNetSdkRoslyn/csc.dll"') if 'LAHTEET="' not in pohja else pohja.index('LAHTEET="')
j = pohja.index('cat > rakennus/')
jarj = sorted(lahteet, key=lambda x: (0 if 'MiniJson' in x else 1, x))
lohko = ('LAHTEET="\n' + '\n'.join(jarj) + '\n"\n'
         '$DN "$R/DotNetSdkRoslyn/csc.dll" -nologo -nowarn:1701,1702 -langversion:9.0 -nullable:disable -target:exe \\\n'
         '  -out:rakennus/' + re.search(r'-out:rakennus/(\S+)', pohja).group(1) + " $VIITTEET $(find Testit -name '*.cs') \\\n"
         "  $(printf '%s\\n' $LAHTEET | sort -u)\n")
alku = pohja[:i].replace('# Lähteet yksi per rivi (juna yhdistää haarojen lisäykset rivien unionina).\n', '')
alku = re.sub(r'<<<<<<<[^\n]*\n|=======\n|>>>>>>>[^\n]*\n', '', alku)
open(sys.argv[1], 'w', encoding='utf-8').write(alku + '# Lähteet yksi per rivi (juna yhdistää haarojen lisäykset rivien unionina).\n' + lohko + pohja[j:])
