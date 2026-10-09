#!/usr/bin/env python3
# KIELIVAHTI (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; Natiivi-UI). Kaksi tarkistusta:
#   1) jokainen koodissa käytetty UI-avain (Kieli.T("…") ja avainmuotoiset literaalit ui.*) on Resources/Tekstit/ui.fi.json:ssa
#      (Siirtosepän muoto: litteä {"avain": "teksti"}; puuttuva avain näkyisi ruudulla avaimena)
#   2) KOHDETIEDOSTOT (Olavinlinnan ja kuumailmapallon näkymät): näkyvän tekstin kutsuissa (Rakenne.Teksti/Nappi, Ohjausnappi.Nappi,
#      Komento, Alanakyma, Takaisin, tooltip, .text, Kysy, KorttiValinta, OpasNappi, Tyhja, Kytkinrivi, placeholder) ei ole
#      kovakoodattua tekstiä. Poikkeus rivin lopun kommentilla // kieli: ei (syy). Testikomentojen ja lokin rivit eivät ole näkyvää UI:ta.
#   python3 tyokalut/kielivahti.py     (exit 1 virheistä; tyokalut/tarkista.sh ajaa)
import re, os, sys, json, glob
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
TAULU = 'Assets/Matkakirja/UI/Resources/Tekstit/ui.fi.json'
KOHTEET = ['Assets/Matkakirja/UI/Linssit/' + n + '.cs' for n in
           ('OpasValikko', 'OpasTapit', 'OpasKuvanosto', 'OpasNimilappu', 'OpasMetrolinja', 'KierrosTaulu', 'LinnaValikko',
            'DioraamaTaulu', 'SeikkailuTapit', 'OlavinlinnaAlku')]
NIELU = re.compile(r'Rakenne\.Teksti\(|Rakenne\.Nappi\(|Ohjausnappi\.Nappi\(|\bKomento\(|\bAlanakyma\(|\bTakaisin\(|tooltip\s*=|\.text\s*=|'
                   r'\bKysy\(|KorttiValinta\(|\bOpasNappi\(|\bKytkin\(|\bTyhja\(|\bKytkinrivi\(|placeholder')
LIT = re.compile(r'(?<![\$@\w])"((?:[^"\\\n]|\\.)*)"')
AVAIN = re.compile(r'"(ui\.[a-z0-9.\-]+)"')
KAYTTO = re.compile(r'Kieli\.T\("(ui\.[^"]+)"')

def kovakoodattu(t):
    return not (re.match(r'^(mk-|tk-|unity-|MATKAKIRJA|<|http|Fontit/|Minikartta/)', t) or 'mk-' in t or 'tk-' in t
                or not re.search(r'[A-Za-zÄÖÅäöå]{2}', t) or re.fullmatch(r'[a-z0-9_.\-]+', t) or re.fullmatch(r'[A-Z][a-z]+[A-Z]\w*', t))

def main():
    taulu = json.load(open(TAULU, encoding='utf-8'))
    virheet, kaytetyt = [], set()
    for p in sorted(glob.glob('Assets/Matkakirja/**/*.cs', recursive=True)):
        for i, rivi in enumerate(open(p, encoding='utf-8'), 1):
            if rivi.strip().startswith('//'): continue
            # Avainmuotoiset literaalit (taulukoiden avaimet), paitsi PlayerPrefs-avaimet ja tiedostonimet.
            epasuora = set() if re.search(r'Avain\s*=|PlayerPrefs|\.(png|jpg|json|mp3|wav)"', rivi) else set(AVAIN.findall(rivi))
            for a in set(KAYTTO.findall(rivi)) | epasuora:
                kaytetyt.add(a)
                if a not in taulu: virheet.append(f'{p}:{i}: avain "{a}" puuttuu {TAULU}:sta')
    for p in KOHTEET:
        for i, rivi in enumerate(open(p, encoding='utf-8'), 1):
            s = rivi.strip()
            if s.startswith('//') or 'Debug.Log' in s or 'Kirjaa(' in s or s.startswith('case "') or 'kieli: ei' in rivi: continue
            koodi = rivi.split(' //')[0]
            if not NIELU.search(koodi): continue
            for m in LIT.finditer(koodi):
                if 'Kieli.T(' in koodi[max(0, m.start() - 9):m.start()]: continue
                if kovakoodattu(m.group(1)): virheet.append(f'{p}:{i}: kovakoodattu UI-teksti "{m.group(1)}" → avain {TAULU}:iin ja Kieli.T')
            for m in re.finditer(r'\$"((?:[^"\\\n]|\\.)*)"', koodi):
                if re.search(r'[A-Za-zÄÖäö]{3}', re.sub(r'\{[^}]*\}', '', m.group(1))): virheet.append(f'{p}:{i}: interpoloitu UI-teksti → Kieli.T(avain, arvot)')
    for v in virheet: print('KIELIVAHTI: ' + v)
    kayttamatta = sorted(set(taulu) - kaytetyt)
    if kayttamatta: print(f'kielivahti: {len(kayttamatta)} käyttämätöntä avainta (varoitus): ' + ', '.join(kayttamatta[:8]) + (' …' if len(kayttamatta) > 8 else ''))
    if virheet: return 1
    print(f'kielivahti ok ({len(taulu)} avainta, {len(KOHTEET)} kohdetiedostoa)')
    return 0

sys.exit(main())
