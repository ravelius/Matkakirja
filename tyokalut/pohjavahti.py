#!/usr/bin/env python3
# POHJAVAHTI (omistaja 1.10.2026, UI-pohjat kohta 8; Natiivi-UI): uusi pinta käyttää vain tyylikirjan arvoja ja pohjia.
# Laskee UI:n tyylitiedostoista ja C#:sta pohjien ohi menevät arvot ja vertaa niitä hyväksyttyyn lähtötasoon
# (tyylikirja/pohjavahti.json = omistajan hyväksymä poikkeuslista: nykyiset pinnat siirtymäaikana). Määrä saa vain pienentyä.
#   - USS: kovakoodatut värit (#hex, rgb/rgba) ja fonttikoot (font-size: Npx) Tyylikirja.uss:n ulkopuolella
#   - USS: UI-siirtymät yli 250 ms (transition-duration; tarkennus 11.37: koskee vain UI-siirtymiä, ei jatkuvia
#     sisältöanimaatioita, joita USS ei aja)
#   - C# (Assets/Matkakirja/UI): uudet värivakiot (new Color(…), new Color32(…), ColorUtility) muualla kuin Tyylikirja.cs:ssä
#   python3 tyokalut/pohjavahti.py            tarkista (exit 1, jos jokin tiedosto ylittää lähtötasonsa)
#   python3 tyokalut/pohjavahti.py --kirjaa   kirjoita lähtötaso (vain omistajan päätöksellä: uusi poikkeus tai siirron jälkeen)
import json, os, re, sys, glob
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
POHJA = 'tyylikirja/pohjavahti.json'
VARI = re.compile(r'#[0-9a-fA-F]{3,8}\b|rgba?\(')
FONTTI = re.compile(r'font-size:\s*[\d.]+px')
SIIRTYMA = re.compile(r'transition-duration:\s*([^;]+);')
CSVARI = re.compile(r'new Color(32)?\(|ColorUtility\.')

def kesto_yli(arvo):
    for osa in arvo.split(','):
        m = re.match(r'\s*([\d.]+)(ms|s)', osa)
        if m and float(m.group(1)) * (1 if m.group(2) == 'ms' else 1000) > 250: return True
    return False

def laske():
    t = {}
    for p in sorted(glob.glob('Assets/Matkakirja/UI/Resources/MatkakirjaUI/**/*.uss', recursive=True)):
        if p.endswith('Tyylikirja.uss'): continue
        s = re.sub(r'/\*.*?\*/', '', open(p, encoding='utf-8').read(), flags=re.S)
        t[p] = {'vari': len(VARI.findall(s)), 'fontti': len(FONTTI.findall(s)),
                'siirtyma': sum(1 for a in SIIRTYMA.findall(s) if kesto_yli(a))}
    for p in sorted(glob.glob('Assets/Matkakirja/UI/**/*.cs', recursive=True)):
        if p.endswith('Tyylikirja.cs'): continue
        s = re.sub(r'//[^\n]*', '', open(p, encoding='utf-8').read())
        n = len(CSVARI.findall(s))
        if n: t[p] = {'vari': n}
    return t

def main():
    nyt = laske()
    if '--kirjaa' in sys.argv:
        json.dump({'_ohje': 'Pohjavahdin lähtötaso (tyokalut/pohjavahti.py). Määrät saavat vain pienentyä; kasvu = uusi pinta pohjien ohi '
                   '→ kysy Päätoimittajalta (omistaja). Päivitys --kirjaa vain omistajan päätöksellä tai siirron jälkeen.', 'tiedostot': nyt},
                  open(POHJA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
        print(f'kirjattu {len(nyt)} tiedostoa'); return 0
    pohja = json.load(open(POHJA, encoding='utf-8'))['tiedostot']
    virheet = []
    for p, arvot in nyt.items():
        sallittu = pohja.get(p, {})
        for k, v in arvot.items():
            if v > sallittu.get(k, 0): virheet.append(f'{p}: {k} {v} > lähtötaso {sallittu.get(k, 0)}')
    for v in virheet: print('POHJAVAHTI: ' + v)
    if virheet:
        print('Uusi pinta käyttää tyylikirjan arvoja (var(--tk-…), Tyylikirja.*) ja pohjia; puuttuva arvo → Päätoimittajalle.')
        return 1
    pienentyneet = sum(1 for p, a in pohja.items() for k, v in a.items() if nyt.get(p, {}).get(k, 0) < v)
    print(f'pohjavahti ok ({len(nyt)} tiedostoa{", " + str(pienentyneet) + " pienentynyt: aja --kirjaa" if pienentyneet else ""})')
    return 0

sys.exit(main())
