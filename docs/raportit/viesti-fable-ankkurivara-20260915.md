# Viesti Fablelle: kapean ankkurin vara pulun nokkaan (3,77 E)

Opus-työagentti, 15.9.2026. Haara
`claude/bold-ride-vow4ki-ankkurivara`, pohja main v1905.
Ei versionostoa, ei Raamattua, ei mergeä, ei dist/:iä.

## 1. Mitä tehtiin

Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 19 (omistaja 15.9.2026):
pystypuhelimen (kapean ruudun) maapaneelin ankkuri siirtyy
**42,6 N / 3,9 E → 42,6 N / 3,77 E**. Biskajan ankkuri (leveä ruutu,
PÄÄTÖKSET 9) EI liiku.

- `js/pallolauta/maapaneeli.js`: `MAAPANEELIN_KAPEAT_ANKKURIT`
  `FRA: { lat: 42.6, lng: 3.77 }` + perustelu taulun yhteydessä
  (miksi 3,77 eikä 3,9, ja miksi kauemmas länteen ei mennä).
- `tools/savukkeet/savuke-era12.mjs`: väitteen 8 odotusarvo
  `KAPEA_ANKKURI = { lat: 42.6, lng: 3.77 }`; vertailu päätöksen
  lukuun 0,05°:n varalla on ennallaan.

Muuta ei muutettu: yhtään logiikkariviä ei koskettu, vain ankkurin
piste ja savukkeen odotusarvo.

## 2. Mitta: rako kortin oikean reunan ja pulun nokan väliin

Pulu on Livian ruutuhahmo ruudun oikeassa alanurkassa. Se piirtyy
kanvaalle eikä ole DOM-solmu, joten rako mitataan
**kuvakaappauksen pikseleistä** (Chromium, dpr 1, Fogg Pariisissa,
saapumisnäkymä 9 s levon ja mittakaavan vakiintumisen jälkeen — sama
mittaustapa kuin erän 16 raportissa
`viesti-fable-lyoninlahti-20260915.md`).

Pulun nokka = kuvakaappauksen vasemmanpuoleisin sinertävä pikseli
(b > r + 8, b > 60) alanurkan alueelta; kortin reuna
`getBoundingClientRect()`istä samassa (sivun) koordinaatistossa.

| ruutu | ankkuri | kortin oikea reuna (sivun x) | pulun nokka (sivun x) | **rako** |
|---|---|---|---|---|
| 390 × 844 | 3,9 E (ennen) | 301,63 | 302,0 | **0,37 px** |
| 390 × 844 | **3,77 E (jälkeen)** | **294,29** | 302,0 | **7,71 px** |
| 393 × 852 | 3,9 E (ennen) | 304,19 | 305,0 | **0,81 px** |
| 393 × 852 | **3,77 E (jälkeen)** | **296,78** | 305,0 | **8,22 px** |

Pulu ei liiku ankkurin mukana (se on ruutuun kiinnitetty): nokan
pikseli on tasan sama 302,0 / 305,0 kaikissa kolmessa ajossa. Kortti
siirtyi 0,13°:n verran **7,34 px länteen**, ja koko siirtymä meni
rakoon.

**Tavoite oli noin 10 px, mitattu 7,7 px (390 × 844) ja 8,2 px
(393 × 852).** Aste on karttamitta ja pikseli ruutumitta, joten
0,13° = 7,3 px tällä saapumiskorkeudella — arvio "≈ 10 px" oli erän 16
raportissa suuruusluokka-arvio, ei mittaus. Rako on nyt **21-kertainen**
entiseen (0,37 px) ja kestää sen muutaman prosentin heilahduksen, jonka
saapumiskorkeus ajosta toiseen ottaa. Ankkuria EI viety 3,77:ää
lännemmäs (omistajan raja).

### Pystysuunta, 1 porras sisään (INFO)

Yhden portaan sisään (alt 0,186 → 0,160) kortti laskeutuu pulun
ALAPUOLELLE: kortti y 781,7…814,2, pulu y 722…773 — pystyrako
**8,7 px**, eli leikkausta ei ole vaikka kortin oikea reuna (310,2)
onkin nokan x:n oikealla puolella. Sama pätee entisellä ankkurilla
(318,8). Vaatimus koskee saapumisnäkymää, ja se täyttyy.

## 3. Maaosumat: 25 näytepistettä kortin alueelta

Sama mitta kuin savukkeen väitteessä 2/8: paneelin nelikulmion 25
näytepistettä vs. pelin oma polygoniaineisto
(`assets/data/maapolygonit.json`), kaikki maat mukana (Ranska,
Espanja, Korsika).

| ruutu | ankkuri | kortin ala (lat / lng) | saapuminen | 1 porras sisään |
|---|---|---|---|---|
| 390 × 844 | 3,77 E | 42,24…42,60 N · 3,542…3,998 E | **0 maaosumaa** | **0** |
| 393 × 852 | 3,77 E | 42,24…42,60 N · 3,542…3,998 E | **0** | **0** |
| 844 × 390 | −4,6 E (Biskaja) | ennallaan | **0** | **0** |
| 1400 × 900 | −4,6 E (Biskaja) | ennallaan | **0** | **0** |

Kortin lautamitta kapealla ruudulla on 15,21 × 11,99 yksikköä eli
0,456° × 0,360°, ja ankkuri on kortin YLÄREUNAN KESKIKOHTA. Kortin
länsireuna 3,542 E on yhä selvästi Cap de Creusin (noin 3,32 E)
itäpuolella avovedessä. **3,80:aa ja 3,83:a ei siis tarvittu** — 3,77
mittaa puhtaasti läpi.

## 4. Paneelin osuus, ruudulla pysyminen ja Biskaja

| ruutu | vaihe | kortti (px) | osuus kotelon leveydestä | kokonaan ruudulla |
|---|---|---|---|---|
| 390 × 844 | saapuminen | 35,53 × 28,01 | **9,51 %** (katto 10 %) | **kyllä** |
| 393 × 852 | saapuminen | 35,82 × 28,24 | **9,51 %** | **kyllä** |
| 844 × 390 | saapuminen | **38,62 × 30,45** | 4,69 % | kyllä |
| 1400 × 900 | saapuminen | **85,91 × 67,74** | 6,23 % | kyllä |

**Biskaja on ennallaan pikselilleen:** 844 × 390 → 38,6 px ja
1400 × 900 → 85,9 px, samat luvut kuin erissä 15 ja 16, ja kortin
paikka ruudulla on molemmissa identtinen ennen/jälkeen-ajoissa
(x 220,0…258,6 ja x 263,5…349,4 kotelon koordinaateissa).
Leveä ruutu ei lue kapea-taulua lainkaan.

## 5. Vastakoe

Ankkuri palautettiin hetkeksi 3,9 E:ksi (muutos tarjoiltuun
lähdetekstiin, tiedosto pysyi 3,77:ssä) ja alkuperäinen mittaus
toistettiin samalla mittausketjulla:

| ajo | ankkuri pelissä | kortin oikea reuna | nokka | rako |
|---|---|---|---|---|
| ennen muutosta (tiedosto 3,9) | 3,900 | 301,63 | 302,0 | 0,37 px |
| muutoksen jälkeen (tiedosto 3,77) | 3,770 | 294,29 | 302,0 | 7,71 px |
| **vastakoe: 3,9 takaisin** | 3,900 | **301,63** | 302,0 | **0,37 px** |

Rako palautuu tasan entiselleen ja katoaa taas, eli mitattu ero tulee
nimenomaan ankkurista eikä ajon satunnaisuudesta. Erän 16 raportin
luvut olivat 0,6 px ja 1,0 px; ero (0,37 ja 0,81) on pulun nokkapikselin kynnyksen
valinta, ei liikahdus — nokan sarake on molemmissa mittauksissa sama.

Kuvakaappaus muutoksen jälkeen (390 × 844, saapuminen):
`docs/raportit/kuvat/ankkurivara-390-20260915.jpg`.

## 6. Portit

| portti | tulos |
|---|---|
| `NODE_USE_ENV_PROXY=1 npm test` | **# pass 3427, # fail 0** (3440 testiä, 13 ohitettua) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | kunnossa: 390 moduulia, 4309 top-level-julistusta |
| `node tools/tarkista-savukkeet.mjs` | kunnossa: 1702 ui-viittausta, 407 metodia, 536 kenttää |
| `node tools/savukkeet/savuke-era12.mjs` | **21/21 vartiota läpi** (väite 8 vihreä uudella luvulla, vastakokeet A–H ennallaan) |
| `tests/dokumentit.test.mjs` | läpi |

Uusintoja ei tarvittu: kaikki portit menivät läpi ensimmäisellä
ajolla.

## 7. Mitä Fablen on päätettävä

1. **Riittääkö 7,7 px?** Päätöksen tavoite oli "noin 10 px"; 3,77 E
   antaa mitatusti 7,7 px (390 × 844) ja 8,2 px (393 × 852).
   Kymmenen pikseliä vaatisi noin 3,73 E, mikä on omistajan antaman
   rajan (ei alle 3,77) länsipuolella — siksi sitä EI tehty.
2. Muuta päätettävää ei ole: maaosumia ei ole, paneeli on kokonaan
   ruudulla ja kymmenesosan katto pitää, Biskaja ei liikkunut.
