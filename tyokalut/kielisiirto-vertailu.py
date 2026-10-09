#!/usr/bin/env python3
# KIELISIIRRON VERTAILU (Natiivi-UI 9.10.2026, PT: "tekstit pysyvät merkki merkiltä samoina"). Kun UI-tekstejä siirretään
# Kieli.T-avaimiksi, ruudun tekstin pitää pysyä täsmälleen samana. Tarkistus kahteen suuntaan perusviitettä vasten:
#   1) jokainen uusi tai muuttunut avain ui.fi.json:ssa: arvon kirjaimelliset osat ({0}, {1} … välissä) löytyvät merkki merkiltä
#      perusversion C#-merkkijonoista (sama tiedostojoukko), eli tekstiä ei kirjoitettu uudelleen
#   2) jokainen perusversiosta poistunut suomenkielinen merkkijonoliteraali löytyy nyt joko ui.fi.json:n arvosta (sellaisenaan tai
#      muotoilupohjan osana) tai on edelleen koodissa (siirretty rivi, kieli: ei)
#   Yhdistelmät (vanha nimi + ": " + "päällä" → "{0}: päällä") hyväksytään, kun osa on enintään kolmen kokonaisen merkkijonon
#   peräkkäisjono (ensimmäinen saa olla loppuosa ja viimeinen alkuosa).
#   python3 tyokalut/kielisiirto-vertailu.py <perusviite>     (exit 1 eroista)
import json, os, re, subprocess, sys, warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
PERUS = sys.argv[1] if len(sys.argv) > 1 else 'HEAD~1'
TAULU = 'Assets/Matkakirja/UI/Resources/Tekstit/ui.fi.json'
LIT = re.compile(r'(\$?@?)"((?:[^"\\\n]|\\.)*)"')
MUOTO = re.compile(r'\{\d+(?:[:,][^}]*)?\}')


def git(*a):
    return subprocess.run(['git', *a], capture_output=True, text=True, check=True).stdout


def cs_purku(s):
    return s.encode('latin-1', 'backslashreplace').decode('unicode_escape') if '\\' in s else s


def literaalit(teksti):
    """C#-merkkijonot (myös $-interpoloitujen kiinteät osat) purettuina."""
    tulos = []
    for etu, s in LIT.findall(teksti):
        s = cs_purku(s)
        if '$' in etu: tulos += [o for o in re.split(r'\{[^{}]*\}', s) if o]
        else: tulos.append(s)
    return tulos


def jonona(osa, palat, syvyys=3, alku=True):
    """osa = enintään syvyys palaa peräkkäin (ensimmäinen saa olla palan loppuosa, viimeinen alkuosa)."""
    if not osa: return True
    if syvyys == 0: return False
    for p in palat:
        if not p: continue
        if osa.startswith(p) and jonona(osa[len(p):], palat, syvyys - 1, False): return True
        if alku and any(osa.startswith(p[i:]) and jonona(osa[len(p) - i:], palat, syvyys - 1, False) for i in range(1, len(p))): return True
        if p.startswith(osa): return True
    return False


def suomea(x):
    return bool(re.search(r'[A-ZÄÖÅa-zäöå]{2}', x)) and not re.match(r'^(mk-|tk-|ui\.|<|http|Fontit/|Symbolit/|MATKAKIRJA)', x) \
        and 'mk-' not in x and not re.fullmatch(r'[a-z0-9_.\-:/ ]+', x)


tiedostot = [p for p in git('diff', '--name-only', PERUS, '--', 'Assets/Matkakirja/UI').split() if p.endswith('.cs')]
vanha_koodi = {p: git('show', f'{PERUS}:{p}') for p in tiedostot}
uusi_koodi = {p: open(p, encoding='utf-8').read() for p in tiedostot}
vanhat = set(l for t in vanha_koodi.values() for l in literaalit(t))
vanha_taulu = json.loads(git('show', f'{PERUS}:{TAULU}'))
taulu = json.load(open(TAULU, encoding='utf-8'))
virheet = []

uudet = {k: v for k, v in taulu.items() if vanha_taulu.get(k) != v}
for k, v in uudet.items():
    for osa in [o for o in MUOTO.split(v) if o.strip()]:
        if not any(osa in l for l in vanhat) and not jonona(osa, vanhat):
            virheet.append(f'avain {k}: osa {osa!r} ei löydy perusversion merkkijonoista')

arvot = list(taulu.values())
osat = set(o for v in arvot for o in MUOTO.split(v) if o)
nyt = set(l for t in uusi_koodi.values() for l in literaalit(t))
poistuneet = 0
for p in tiedostot:
    for l in set(literaalit(vanha_koodi[p])) - set(literaalit(uusi_koodi[p])):
        if not suomea(l): continue
        poistuneet += 1
        if l in osat or any(l in v for v in arvot) or l in nyt: continue
        if l.strip() and any(l.strip() == o.strip() for o in osat): continue
        if jonona(l, osat): continue
        virheet.append(f'{p}: {l!r} poistui koodista eikä löydy ui.fi.json:sta')

for v in virheet: print('KIELISIIRTO:', v)
print(f'kielisiirto: {len(tiedostot)} tiedostoa, {len(uudet)} uutta avainta, {poistuneet} siirtynyttä merkkijonoa, '
      f'{"ok" if not virheet else str(len(virheet)) + " eroa"}')
sys.exit(1 if virheet else 0)
