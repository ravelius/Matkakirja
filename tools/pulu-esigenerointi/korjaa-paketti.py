# KK:n lukukorjaukset (MUUTOKSET-KK.md-muoto) json-tiedostoihin (PK 10.11.2026). Korvaus json-koodatusta tekstistä, joten
# tiedoston muu sisältö ja muotoilu säilyvät tavulleen.
#   python3 tools/pulu-esigenerointi/korjaa-paketti.py <muutokset.md> [--tarkka] <tiedosto.json> [...]
# --tarkka (paketti): jokaisen kohdan osumamäärä = suluissa odotettu (tai lähteessä jo korjattu: JÄLKEEN-muotoa vähintään
# odotettu määrä) ja ENNEN-muotoa ei jää; muuten exit 1.
# Ilman (lähteiden vaihe*.json): korvataan löytyvät. Tiedosto kirjoitetaan vain, jos jotain muuttui; json tarkistetaan.
import json, os, re, sys

md, args = sys.argv[1], sys.argv[2:]
tarkka = '--tarkka' in args
tiedostot = [a for a in args if a != '--tarkka']
koodaa = lambda s: json.dumps(s, ensure_ascii=False)[1:-1]
kohdat = [(m.group(1), int(m.group(2)), koodaa(m.group(3)), koodaa(m.group(4)))
          for m in re.finditer(r'^- (.+?) \((\d+)\)\n  ENNEN: (.+)\n  JÄLKEEN: (.+)$', open(md, encoding='utf-8').read(), re.M)]
osumat = [0] * len(kohdat)
valmiina = [0] * len(kohdat)
virhe = 0
for p in tiedostot:
    s = open(p, encoding='utf-8').read()
    u = s
    for i, (_, _, a, b) in enumerate(kohdat):
        n = u.count(a)
        if n:
            osumat[i] += n; u = u.replace(a, b)
    if u != s:
        json.loads(u)
        open(p + '.tmp', 'w', encoding='utf-8').write(u); os.replace(p + '.tmp', p)
        print(f'muutettu {p}')
    for i, (_, _, a, b) in enumerate(kohdat):
        valmiina[i] += u.count(b)
    if tarkka:
        for nimi, _, a, _ in kohdat:
            if a in u:
                print(f'VIRHE jäi: {nimi} ({os.path.basename(p)})'); virhe = 1
for (nimi, odotus, _, _), n, v in zip(kohdat, osumat, valmiina):
    tila = 'OK' if n == odotus else 'OK (lähteessä korjattu)' if n == 0 and v >= odotus else ('VIRHE' if tarkka else '-')
    virhe |= tila == 'VIRHE'
    print(f'{tila} {n}/{odotus} {nimi}')
print(f'kohtia {len(kohdat)}, osumia {sum(osumat)}')
sys.exit(virhe)
