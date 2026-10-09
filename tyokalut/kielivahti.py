#!/usr/bin/env python3
# KIELIVAHTI (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; Natiivi-UI). Kaksi tarkistusta:
#   1) jokainen koodissa käytetty UI-avain (Kieli.T("…") ja avainmuotoiset literaalit ui.*) on Resources/Tekstit/ui.fi.json:ssa
#      (Siirtosepän muoto: litteä {"avain": "teksti"}; puuttuva avain näkyisi ruudulla avaimena)
#   2) KOHDETIEDOSTOT (Olavinlinnan ja kuumailmapallon näkymät): näkyvän tekstin kutsuissa (Rakenne.Teksti/Nappi, Ohjausnappi.Nappi,
#      Komento, Alanakyma, Takaisin, tooltip, .text, Kysy, KorttiValinta, OpasNappi, Tyhja, Kytkinrivi, placeholder) ei ole
#      kovakoodattua tekstiä. Poikkeus rivin lopun kommentilla // kieli: ei (syy). Testikomentojen ja lokin rivit eivät ole näkyvää UI:ta.
#   3) PELITEKSTIT (Siirtoseppä 9.10.: Olavinlinnan seikkailu ja historia; Linssit/Unity/Seikkailu*.cs, Ydin/Seikkailu, Historiajana):
#      jokainen Kieli.T("olavinlinna.…") / Kielitaulu.Hae("olavinlinna.…") -avain on Linssit/Resources/Tekstit/olavinlinna.fi.json:ssa,
#      eikä koodissa ole kovakoodattua suomenkielistä näkyvää merkkijonoa (lokit, poikkeukset, tekniset nimet ohitetaan; poikkeus
#      // kieli: ei (syy)). Sama sääntö Linssit-testien OlavinlinnaTekstitTestit-testissä.
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

PELI_TAULU = 'Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json'
PELI = sorted(glob.glob('Assets/Matkakirja/Linssit/Unity/Seikkailu*.cs') + glob.glob('Assets/Matkakirja/Linssit/Ydin/Seikkailu/*.cs')
              + ['Assets/Matkakirja/Linssit/Ydin/Dioraama/Historiajana.cs'])
PELI_KAYTTO = re.compile(r'(?:Kieli\.T|Kielitaulu\.Hae)\("(olavinlinna\.[a-z0-9.\-]*[a-z0-9])"')
PELI_LOKI = re.compile(r'kirjaa\?\.Invoke|o\.Kirjaa|Kirjaa\(|Debug\.Log|Exception\(|new GameObject\(|Shader\.Find|PropertyToID|GetType\(|GetMethod\(|GetProperty\(')
PELI_NIMI = re.compile(r'(new GameObject|Shader\.Find|PropertyToID|GetType|GetMethod|GetProperty|Lahde|CompareTag|tag ==)\(?\s*\$?"(?:[^"\\]|\\.)*"')
PELI_LIT = re.compile(r'\$?@?"((?:[^"\\]|\\.)*)"')


def ilman_kommenttia(r):
    sisalla = False
    for i in range(len(r) - 1):
        if r[i] == '"' and (i == 0 or r[i - 1] != '\\'): sisalla = not sisalla
        elif not sisalla and r[i:i + 2] == '//': return r[:i]
    return r


def suomea(x):
    return bool(re.match(r'^[A-ZÄÖ][a-zäö]+$', x) or re.search(r'[äöÄÖ]', x)
                or (re.search(r'[A-ZÄÖa-zäö]{3,} [a-zäö]{2,}', x) and not re.match(r'^[a-z0-9_\-:./ {}]+$', x)))


def pelitekstit(virheet):
    taulu = json.load(open(PELI_TAULU, encoding='utf-8'))
    for p in PELI:
        for i, rivi in enumerate(open(p, encoding='utf-8'), 1):
            s = rivi.strip()
            if s.startswith('//') or s.startswith('*'): continue
            for a in PELI_KAYTTO.findall(rivi):
                if a not in taulu: virheet.append(f'{p}:{i}: avain "{a}" puuttuu {PELI_TAULU}:sta')
            if 'kieli: ei' in rivi: continue
            koodi = ilman_kommenttia(rivi)
            m = PELI_LOKI.search(koodi)
            if m and not PELI_NIMI.search(koodi[m.start():]): koodi = koodi[:m.start()]
            koodi = PELI_NIMI.sub('', koodi)
            for lm in PELI_LIT.finditer(koodi):
                if suomea(lm.group(1)): virheet.append(f'{p}:{i}: kovakoodattu peliteksti "{lm.group(1)}" → avain {PELI_TAULU}:iin ja Kieli.T')
    return len(taulu)


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
    peli_avaimia = pelitekstit(virheet)
    for v in virheet: print('KIELIVAHTI: ' + v)
    kayttamatta = sorted(set(taulu) - kaytetyt)
    if kayttamatta: print(f'kielivahti: {len(kayttamatta)} käyttämätöntä avainta (varoitus): ' + ', '.join(kayttamatta[:8]) + (' …' if len(kayttamatta) > 8 else ''))
    if virheet: return 1
    print(f'kielivahti ok ({len(taulu)} UI-avainta, {len(KOHTEET)} kohdetiedostoa; {peli_avaimia} peliavainta, {len(PELI)} pelin tiedostoa)')
    return 0

sys.exit(main())
