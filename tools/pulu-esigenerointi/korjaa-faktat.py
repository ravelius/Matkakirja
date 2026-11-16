# Lähdetarkistuksen (faktat-*.md, KK:n muoto) korjausehdotukset vaihe1.json/vaihe2.json:iin (PK 10.11.2026).
#   python3 tools/pulu-esigenerointi/korjaa-faktat.py <kansio> <faktat.md> [<faktat.md> …]
# Löydös: "- Väite: "…"" ja "- Korjausehdotus: "…"". Sovelletaan, kun löydöksessä on yksi väite ja yksi ehdotus ja väite löytyy
# täsmälleen yhdestä vastauksesta tai jatkokysymyksestä. Muut → KASIN-listaan. Muutokset ennen/jälkeen → <kansio>/MUUTOKSET-FAKTAT.md.
import json, os, re, sys

kansio, tiedostot = sys.argv[1], sys.argv[2:]
pol = {t: os.path.join(kansio, t + '.json') for t in ('vaihe1', 'vaihe2')}
d = {t: json.load(open(p)) for t, p in pol.items()}
lainaus = re.compile(r'"((?:[^"\\]|\\.)+)"')
muutokset, kasin = [], []
for f in tiedostot:
    for lohko in re.split(r'\n(?=### )', open(f).read()):
        if not lohko.startswith('### '):
            continue
        otsikko = lohko.splitlines()[0][4:]
        v = re.search(r'^- Väite: (.*)$', lohko, re.M)
        k = re.search(r'^- Korjausehdotus: (.*)$', lohko, re.M)
        if not v or not k:
            kasin.append(f'{otsikko}: ei väite/ehdotus-riviä'); continue
        va, ko = lainaus.findall(v.group(1)), lainaus.findall(k.group(1))
        if len(va) != 1 or len(ko) != 1:
            kasin.append(f'{otsikko}: {len(va)} väitettä / {len(ko)} ehdotusta'); continue
        a, b = va[0], ko[0]
        osumat = [(t, i, kenttä) for t in d for i, e in enumerate(d[t])
                  for kenttä in ('vastaus', 'jatkot')
                  if (a in e['vastaus'] if kenttä == 'vastaus' else a in e['jatkot'])]
        if len(osumat) != 1 or (osumat[0][2] == 'vastaus' and d[osumat[0][0]][osumat[0][1]]['vastaus'].count(a) != 1):
            kasin.append(f'{otsikko}: osumia {len(osumat)}'); continue
        t, i, kenttä = osumat[0]; e = d[t][i]
        if kenttä == 'vastaus':
            e['vastaus'] = e['vastaus'].replace(a, b)
        else:
            e['jatkot'][e['jatkot'].index(a)] = b
        muutokset.append(f"- {e['kohde']} / {('Kerro lisää: ' + e['kasite']) if 'kasite' in e else e['kysymys']} ({kenttä}; {os.path.basename(f)})\n  ENNEN: {a}\n  JÄLKEEN: {b}")
for t, p in pol.items():
    open(p + '.tmp', 'w').write(json.dumps(d[t], ensure_ascii=False, indent=1) + '\n'); os.replace(p + '.tmp', p)
with open(os.path.join(kansio, 'MUUTOKSET-FAKTAT.md'), 'a') as o:
    o.write(f"\n## {', '.join(os.path.basename(x) for x in tiedostot)}\n" + '\n'.join(muutokset) + '\n')
print(f'sovellettu {len(muutokset)}, käsin {len(kasin)}')
for x in kasin:
    print('KASIN', x)
