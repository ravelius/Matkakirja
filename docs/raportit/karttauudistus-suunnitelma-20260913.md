# Karttauudistus: suunnitelma ja toteutettavuusselvitys (13.9.2026)

*(Opus-työsessio Fablelle. Docs-only, ei versionostoa. Kaikki luvut on
LUETTU koodista tai laskettu koodin luvuista; jokainen väite on sidottu
tiedostoon ja riviin. Ristiriidassa Raamattu (js/tyohuone-raamattu.js)
voittaa tämän raportin.)*

Omistajan idea on siteerattu tehtävänannossa sanatarkasti; tämä raportti
ei tulkitse siitä mitään pois. Kohdat, jotka ovat ristiriidassa
aiempien omistajan päätösten kanssa, on merkitty **RISTIRIITA**-lipulla
ja viety lukuun "Omistajan päätettäväksi".

---

## 1. Nykytila

### 1.1 Kartta piirretään laattapyramidista, ei enää maalehdistä

Pelin **ainoa** karttapohja on maailmanlaajuinen laattapyramidi
(js/laattapyramidi.js:1–24). Omistajan päätös 30.8.2026 sanatarkasti:
*"Ei kun poista kaikki muut vaihtoehdot käytöstä ja kytke peliin vain
tämä uusi kartta, ei mitään muuta."* ja *"Joo, ei pidetä mitään
varajärjestelmiä yllä."* — vanha maakohtainen fokuslehtijärjestelmä
purettiin kokonaan (js/laattapyramidi.js:17–24).

Lukitut mitat (docs/moduulit/laattapyramidi.md luku 1):

| Asia | Arvo |
| --- | --- |
| Projektio | Miller, leveys 12000 = 360°, lon0 −175, pohjoinen 76 |
| Tiheys syvimmällä | **7,2 px / lautayksikkö** (= 4 px/kaariminuutti) |
| Tasoja | 8 (z0 675 px → z7 86 400 × 52 616 px), kerroin 2 |
| Laatta | 512 × 512, webp q0,9 |
| Laattoja | 23 340, **1,16–1,30 Gt** ämpärissä |
| Korkeusdata | 3 kaariminuuttia (0,05°) kaikilla tasoilla |
| Patina | **kolme neljäsosaa koko pyramidin tavuista** |

Laatat ovat `<image>`-elementteinä laudan koordinaateissa, eivät
canvasta (js/laattapyramidi.js:26–32: ruutuavaruuden canvas mitattiin
kahdeksan kertaa hitaammaksi). Taso valitaan ruudun tarkkuudesta
(js/laattapyramidi.js:518–526 `valitseTaso`, kutsu 1699).

Piirtomoottori on jaettu rakennusaikaisten työkalujen kanssa:
tools/fokuskartta/piirto.js (yhden maan lehti, historia) ja
tools/fokuskartta/maailmapiirto.js (pyramidin lohkot). Väriasteikot
asuvat piirto.js:ssä yhtenä kappaleena ja maailmanmoottori tuo ne
sieltä (tools/fokuskartta/piirto.js:80–92) — juuri siksi, ettei kaukoja
lähizoomin väliin välähdä kahta eri karttaa.

### 1.2 Nykyinen väripaletti on ruskea, ei täysväri

Kartan hypsometrinen asteikko (tools/fokuskartta/piirto.js:179–193):
alanko 214,202,168 → 226,212,163 → ruskea 150,90,62 (2900 m) →
128,76,58 (4200 m) → 112,72,62 (5200 m) → lumi 168,158,150 (5500 m) →
232,230,226 (8850 m). Perustelu rivillä 95–98: *"sama väriperhe kuin
pelin seepiakartassa (#e7d2a4 -> #c69257 -> #a2603a)"*.

Meri **ei ole sininen** vaan "viileä paperi, syvyys porrastettuna"
(piirto.js:195–208); matala meri sai oman portaansa −30 m, koska
Persianlahti suli paperiin.

Eli omistajan lause *"Muiden maiden kartat ja valtion ulkopuoliset vedet
ja meret ennallaan ruskean sävyissä"* kuvaa nykytilaa täsmällisesti:
koko maailma on jo ruskeaa.

### 1.3 Täysvärinen reliefi on jo olemassa — mutta vain linssinä

Topografialinssi (js/linssit/topografia.js) on **yksi `<image>`**, joka
venytetään laudan rajasuorakulmioon (rivit 15–21). Kuva on
`assets/linssit/topografia.webp`, **1 043 818 tavua, 3600 px leveä**
(tools/tee-reliefikartta.mjs:120–135). Peittävyys on kova 0,72
(js/linssit/topografia.js:56), koska lento- ja laivareitit ovat linssin
ALLA staattisessa kerroksessa.

Kuvan värit ovat aito hypsometria varjostuksineen
(tools/tee-reliefikartta.mjs:160–185 `MAA`, 195–205 `MERI`):

- **MAA**: 62,110,66 (0 m, tummanvihreä) → 205,196,112 (800 m) →
  182,132,82 (2200 m) → 232,232,235 (6000 m, lumiraja).
- **MERI**: 176,214,240 (0 m, matala rannikkovesi) → 140,190,228
  (−200 m, mannerjalustan reuna) → 62,112,176 (−2500 m) → 22,50,112
  (−6000 m) → 10,28,78 (−11000 m).

**Batymetria on siis jo olemassa ja jo väritetty.** Omistajan kohta
*"vedetkin näkyvät sinisenä syvyyserot huomioiden"* ei vaadi uutta
aineistoa eikä uutta asteikkoa — vain sen käyttöä toisessa paikassa.

Tarkkuus: linssikuva on 3600 px koko maailman leveydelle eli
**0,30 px/lautayksikkö**. Pyramidin syvin taso on 7,2 px/yksikkö.
Linssikuva on siis **24× liian karkea** lähizoomiin; se riittää
maailmannäkymään eikä mihinkään muuhun. Tämä on se, mitä omistaja
tarkoittaa lauseella *"renderöidään se vain mahdollisimman tarkaksi
uudessa versiossa"*.

### 1.4 Korkeusaineisto ja sen tarkkuus

Kaksi lähdettä (tools/hae-korkeusruudukko.mjs:1–16):

- **3′ (0,05°)** repon oma tiedosto `tools/korkeusaineisto/` — ei verkkoa.
  Tämä on se, jolla pyramidi ajetaan.
- **1′ (1/60°)** R2-ämpärin 10°-palat (tools/korkeuspalat-lukija.mjs);
  koko maailma on 1′:llä **466 Mt**, ja `haeKorkeusikkuna()` kokoaa
  pyydetyt sarakkeet ja rivit.

Lähde on **ETOPO1 Global Relief, Ice Surface, 1 kaariminuutti**, NOAA,
Amante & Eakins 2009, doi:10.7289/V5C8276M — **public domain**
(tools/hae-korkeusruudukko.mjs:148–155). Lisenssi on siis kunnossa
kaikkeen mitä alla ehdotetaan; uutta lähdettä ei tarvita.

Huom. pyramidin dokumentti perustelee 3′:n valinnan nimenomaan
varjostuksella: *"ETOPO1:n natiivi 1′ on tässä mittakaavassa kohinaa
varjostuksessa (varjo lasketaan naapuriruutujen EROSTA)"*
(docs/moduulit/laattapyramidi.md luku 1). Tarkempi ajo on *"pelkkä
`--kaariminuutit`-arvon muutos samalle laattaruudukolle"*.

### 1.5 Maamaskit ja maarajadata

Kolme eri aineistoa, kolme eri tehtävää:

1. **assets/data/maapolygonit.json — 1 448 535 tavua.**
   `ne_10m_admin_0_countries`, harvennus 0,006°, avaimena **ISO A3,
   134 maata**, valmiiksi laudan `maailmankartta`-projektiossa
   (js/maanaariviivat.js:18–24). Mitattu samaksi geometriaksi kuin
   laattoihin poltettu rajaviiva: *"mediaani 0,02 lautayksikköä
   poltetusta rajasta"* (js/maanaariviivat.js:26–29). Ladataan laiskasti
   kerran istuntoa kohti (`lataaMaapolygonit`, js/maanaariviivat.js:62–71)
   ja jaetaan tasokartan ja pallon kesken.
   **Tämä on uudistuksen tärkein yksittäinen aineisto.**
2. **js/linssit/ihmisen-matka-maamaski.js** (25 riviä) — 0,5°:n
   ruudukko, tehty pelin omasta datasta (tools/tee-maamaski.mjs:1–20).
   Tarkoitettu Ihmisen matka -linssin kulkulaskentaan, **ei** piirtoon;
   0,5° = 55 km, aivan liian karkea kartan rajaukseen.
3. **tools/fokuskartta/rajat.mjs + rajat-nykyiset.json.gz** —
   Natural Earth viivatasona pyramidin polttoa varten, 0,44 Mt
   gzipattuna (rajat.mjs:36–41). Datana, ei koodina, jotta toisen
   aikakauden rajat ovat uusi tiedosto eikä uutta piirtokoodia.

### 1.6 Maan ääriviiva on jo pelissä — ja punainen on jo kokeiltu

js/maatummennus.js piirtää **nykyisen maan renkaat viivana** kaikissa
mittakaavoissa (rivit 10–17, 35–50). Omistaja 11.9.2026: *"Peli voisi
piirtää vahvemmalla AINA kyseisen valtion rajat jossa pelaaja on"*.
Viivan leveys on 2 ruutupikseliä (`TUMMENNUS_VIIVA`,
js/maatummennus.js:147, `vector-effect: non-scaling-stroke`), väri
`rgba(70, 51, 31, 0.6)` eli seepianruskea (css/styles.css:1700–1706).

**RISTIRIITA 1.** Punainen maan ääriviiva `.country-korostus`
**poistettiin 30.8.2026** omistajan pelitestipalautteen v1095 perusteella:
*"punainen maan ääriviiva on epätarkka → OTETAAN POIS"*
(css/styles.css:5500–5507). Syy oli aineisto, ei väri: viiva piirrettiin
laudan karkeasta 50m-rannikosta, kun laattaan poltettu ranta on tarkkaa
10m-aineistoa, joten *"viiva osui eri kohtaan kuin ranta, jonka se muka
rajaa"*. **Tuo syy on poistunut**: nykyinen ääriviiva tulee samasta
10m-aineistosta kuin poltto (js/maatummennus.js:81–93). Punaisen
palauttaminen on siis nyt teknisesti perusteltua — mutta se on omistajan
aiemman päätöksen kumoaminen, ja se on kirjattava.

Samalla 30.8.2026 poistettiin **maan sävytys** `.country-tint`
(css/styles.css:5490–5499, omistaja iPadilta: *"Valittu maa maalautuu
nyt ohuen harmaalla värillä. Poista väritys."*) — sekin on huomioitava,
koska uusi idea maalaa kohdemaan pinnan uudestaan, tällä kertaa
täysvärillä.

### 1.7 Kamera ja zoomirajat

**js/karttazoom.js ei ole pääkartan zoomi** vaan kohdekartan ja
lippukarttojen widget (rivit 1–7); sen rajat ovat PIENIN 1, SUURIN 3,
ASKEL 1,5 (rivit 46–56).

Pääkartan rajat ovat js/kartta.js:2550–2640 `fokusRajaukset()`.
Kolme laatikkoa:

- **`ikkuna`** — maan oma ikkuna, `FOKUS_POHJAT[iso].rajaus`.
- **`uloin`** — ikkuna × `ULOSZOOMAUS_KERROIN`. *"Loitonnus pysähtyy
  siihen mittakaavaan, jolla maan fokusikkuna kolminkertaisena juuri
  mahtuu ruudulle: maa ja sen naapurit näkyvät, koko maailma ei"*
  (js/kartta.js:2567–2576, omistajan päätös 30.8.2026).
- **`kuva`** — panoroinnin raja, vähintään `uloin`.

Rajaus **on jo olemassa ja jo tiukka**: *"Kauemmas ei pääse
painikkeella, rullalla, nipistyksellä eikä pelin omalla kamera-ajolla"*
(js/kartta.js:2571–2573). Kolme poikkeusta ohittavat sen:
kehittäjän maailmanappi (rivi 2625), aikajanalinssin `kameraVapaa`
(2627) ja yleiskuva ilman `mannerZoom`ia (2636).

Maan ikkunataulu **FOKUS_POHJAT** (js/packs/fokus-grc.js:96–) on
säilynyt, vaikka itse kuvat purettiin: siinä on **134 maata**, kullakin
`bbox` (kuvan ala) ja `rajaus` (maan oma laatikko) lautayksikköinä.
Esimerkkejä:

| Maa | `rajaus` w × h (lautayksikköä) |
| --- | --- |
| LUX | 66,3 × 84,0 |
| SGP | 52,1 × 46,2 |
| CYP | 100,9 × 66,5 |
| ALB | 98,8 × 167,5 |
| GRC | 467,9 × 292,4 |
| FRA | 666,1 × 553,4 |
| USA | 2 618,3 × 1 314,2 |
| CAN | 3 744,9 × 2 340,6 |
| RUS | **5 772,2 × 2 272,5** |

Maltaa ja Monacoa **ei ole taulussa** (eikä maapolygonit.jsonin 134
maassa välttämättä pelattavina) — ne eivät ole pelissä kaupunkeina,
joten ne ovat tämän uudistuksen kannalta teoreettisia. Pienin taulussa
oleva on Singapore 52 × 46 yksikköä.
