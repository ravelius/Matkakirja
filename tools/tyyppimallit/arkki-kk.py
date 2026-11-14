"""KK:n arkki: rivi per tyyppi (45° | edestä | sivulta), otsikossa kolmiot rajaa vasten. python3 -I arkki-kk.py <kuvat> <mitat.txt> <ulos.jpg>"""
import sys
from PIL import Image, ImageDraw, ImageFont
K, M, U = sys.argv[1:4]
mitat = {}
for r in open(M):
    o = r.rstrip('\n').split('\t')
    if len(o) >= 3: mitat[o[0]] = (o[1], o[2])
RIVIT = [('kirkko-pieni', 'KIRKKO PIENI (kappeli, kyläkirkko)', 'laiva 24 × 11 m, räystäs 7, harja 13; länsitorni pyramidilla 26 m; kuori 3 sivua'),
         ('kirkko-keski', 'KIRKKO KESKI (seurakuntakirkko)', 'laiva 46 × 18 m, räystäs 13, harja 22; länsitorni neulalla 46 m (2,1 × harja); kuori 5 sivua'),
         ('kirkko-suuri', 'KIRKKO SUURI (katedraali)', 'keskilaiva 85 × 14 + sivulaivat, räystäs 24 / 12; poikkilaiva; kaksi länsitornia 57 m; lentotuet; kattoratsastaja 62 m'),
         ('asema', 'ASEMA', 'hallikatto 140 × 60 m kaarena pitkän akselin suuntaan, lasinauha; julkisivu 64 m, keskikaari ja kello, kulmapaviljongit'),
         ('palatsi', 'PALATSI', '100 × 28 m, räystäs 16; mansardi; kulmapaviljongit korkeammalla mansardilla; keskirisaliitti ja pääty; kaarirytmi + 2 ikkunakerrosta'),
         ('kupolikirkko', 'UUSI: KUPOLIKIRKKO (Val-de-Grâce, Institut, St-Paul-St-Louis; KK 23.05)', 'latinalainen risti, laiva 32 × 16 m räystäs 18; rumpu 8 pylvästä 35 m:iin, lyijykupoli, lyhty, huippu 58 m; pylväspääty 4 pylvästä'),
         ('kupolikirkko-ilman', 'KUPOLIKIRKKO ilman pylväspäätyä  +  TORNIN PARAMETRIT (KK 23.05 kohta 2)', 'pylvaspaaty = ei: kaariovi ja sivuovet  |  kirkko pieni: risteys, 2 tornia (kuoritornit), pyramidi  |  kirkko keski: länsi, 1, tasakatto',
          [('kupolikirkko-ilman-45', 'kupolikirkko, pylvaspaaty = ei'), ('kirkko-pieni-risteys-2-pyramidi-45', 'pieni: risteys | 2 | pyramidi'), ('kirkko-keski-lansi-1-tasakatto-45', 'keski: länsi | 1 | tasakatto')]),
         ('kirkko-keski-risteys-1-pyramidi', 'TORNIN PARAMETRIT: torni_paikka | torneja | huippu (sama tyyppi, ei uusia tyyppejä)', 'oletukset: pieni länsi | 1 | pyramidi, keski länsi | 1 | neula; katedraali aina länsi | 2 | tasakatto + kattoratsastaja',
          [('kirkko-keski-risteys-1-pyramidi-45', 'keski: risteys | 1 | pyramidi'), ('kirkko-keski-lansi-2-neula-45', 'keski: länsi | 2 | neula'), ('kirkko-keski-45', 'keski: oletus länsi | 1 | neula')]),
         ('pylvastemppeli', 'UUSI: PYLVÄSTEMPPELI (Madeleine, Palais Brongniart; myöhemmin Wien, Ateena; KK 23.25 työ C)', 'jalusta + etuportaat, cella, pylväskehä (päädyssä 8 / 10, sivuilla sama jako), palkisto; harja kolmiopäätyineen TAI attika + loiva katto; pituus ja leveys pohjasta',
          [('pylvastemppeli-45', 'harja, 8 pylvästä päädyssä (100 × 40 m)'), ('pylvastemppeli-edesta', 'edestä'), ('pylvastemppeli-attika-45', 'attika, 10 päädyssä (70 × 42 m)')])]
NAK = [('45', '45° lounaasta'), ('edesta', 'edestä'), ('sivulta', 'sivulta')]; NAKP = [('45', '45° lounaasta'), ('edesta', 'edestä (pääjulkisivu)'), ('sivulta', 'päädystä')]
cw, ch, v, otsikko, ala = 600, 427, 10, 52, 26
W = v + 3 * (cw + v); H = 70 + len(RIVIT) * (otsikko + ch + v) + ala
a = Image.new('RGB', (W, H), (245, 240, 228)); d = ImageDraw.Draw(a)
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
d.text((v, 12), 'TYÖKALU 2 – tyyppimallien luonnokset, versio 3: kupolikirkko, tornin parametrit, pylvästemppeli (Valoseppä 14.11.2026)', fill=(40, 34, 28), font=fb(26))
d.text((v, 44), 'Tasavärit ja neutraali valo, ortokamera; vieressä tavallinen pariisilainen talo (16 × 12 m, räystäs 18 m) mittakaavaksi. Suorakaidepohja: lopullisessa seinät nousevat OSM-pohjasta.', fill=(70, 62, 52), font=f(17))
y = 70
for t, nimi, kuvaus, *oma in RIVIT:
    kol, raja = mitat.get(t, ('?', '?'))
    d.text((v, y + 4), nimi if oma else f'{nimi}  –  {kol} kolmiota (raja {raja})', fill=(40, 34, 28), font=fb(21))
    d.text((v, y + 29), kuvaus, fill=(80, 70, 60), font=f(16))
    kuvat = oma[0] if oma else [(f'{t}-{n}', o) for n, o in (NAKP if t == 'palatsi' else NAK)]
    for i, (n, o) in enumerate(kuvat):
        im = Image.open(f'{K}/{n}.png').convert('RGB').resize((cw, ch), Image.LANCZOS)
        x = v + i * (cw + v); a.paste(im, (x, y + otsikko))
        if oma and n.endswith('-45'): o += '  –  %s / %s kolmiota' % mitat.get(n[:-3], ('?', '?'))
        d.text((x + 8, y + otsikko + 6), o, fill=(90, 80, 70), font=f(15))
    y += otsikko + ch + v
d.text((v, H - ala + 2), 'Lähde: _tyo/valoseppa/tyyppitalot (oma/Tyyppimallit.cs, kaanna.sh → OBJ → renderoi.py Blender 5.2). Osakirjasto juna-224:stä; ei junaan.', fill=(110, 100, 90), font=f(14))
a.save(U, quality=90); print(U, a.size)
