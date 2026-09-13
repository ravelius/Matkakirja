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

### 1.8 Karttanostot ja fokusvirta

Karttanostojen ladonta on js/fokuskohteet.js (5 949 riviä). Ladonta
tarvitsee maan ikkunan: *"Ilman lehden ikkunaa (FOKUS_POHJAT) maa ei
lado mitään"* (js/fokuskohteet.js:3237–3242). Ladonta kiertää
`Object.entries(FOKUS_POHJAT)` (js/fokuskohteet.js:3189, 3447).
Naapurimaiden poltetut nostonimet ladataan väistöön
(`naapurienPoltetutVaraukset`, Raamattu "Fokusmoodi" N1).

Raamatun päätös 2.9.2026 (N2) siirsi **kartan omat kohteet** (Akropolis,
Colosseum…) pois pääkartalta kunkin kaupunkilehden omalle
kohdekartalle: 14/16 sai kohdekartan pisteen, `izmir/izmir` ja
`luxor/niili` jäivät pääkartalle. **Tämä on sama liike, jota omistaja
nyt pyytää toiseen suuntaan** — ja siksi kohta 4 alla on nimenomaan
uudelleenjako, ei uusi mekanismi.

### 1.9 Kulkutavat, kassa ja aarre nyt

**Kulkutapoja on neljä: `land`, `sea`, `fly`, `stay`**
(`game.travelModes()`, js/game.js:956–969). **Bussia ja liftausta ei
ole.** Ainoa sukulainen on tapahtumakortin efekti `{ kind: 'kyyti' }`
(js/packs/africa.js:364–366), joka siirtää pelaajan ilmaiseksi
satunnaiseen naapurikaupunkiin (js/game.js:2223–2230) — mutta
maailmankartalla se ei laukea, koska `MAAILMANKARTTA.events` on tyhjä.

Hinnat: `SEA_FARE = 100` (js/game.js:12), `SEA_FEE = 100`
(js/rules.js:5), `FLIGHT_PRICE = 300` (js/rules.js:6),
`START_MONEY = 300` (js/game.js:11).

Reittidata (js/packs/maailmankartta.js): **261 kaupunkia** (62
lentokenttää, 19 aloituskaupunkia), **408 kaarta — 297 `land`, 111
`sea`** (`EDGES`, rivi 533), **71 lentoparia** (`airRoutes`, rivi 1139).
Naapuruus on valmiina: `board.adj` = kaupunki → kaaritunnukset
(js/rules.js:181, 198–199), ja **valmis funktio `rideTarget(player)`
(js/game.js:2282–2292) tekee jo täsmälleen "vierekkäisen kaupungin"
päättelyn**.

Kassa: pelaajan kenttä `money`; **yhtä `addMoney`-funktiota ei ole**,
vaan `p.money +=` on 11 paikassa js/game.js:ssä (mm. kulttuurivisa 25
rivi 1189, lehden minitehtävä 10 rivi 1208, tutkimisvastaus
`EXPLORE_REWARD = 50` rivi 2424, vaikea `HARD_BONUS = 100` rivi 2439,
pääaarre `STAR_PRIZE = 2000` rivi 2885). Lehtitehtävän palkkio UI:sta on
`FOKUS_TEHTAVA_PALKKIO = 50` (js/fokustehtavat.js:111).
Tietäjäpisteillä on yksi portti, `awardXp()` (js/game.js:1017–1023).

Visakysymyksen datarakenne on `{ q, options[4], correct, level 1–3,
hint, fact, source }` (js/packs/europe-questions.js:7, 13–21).

**"Pieni kysymys lopussa" on jo olemassa** lehden sivuilla:
`lehtitehtavat`-taulukko fokusvirtapakassa, muoto
`{ id, sivu, otsake, palkinto: 'piste'|'juliste', juliste?, visa }`,
`visa = { kysymys, vaihtoehdot, oikea, fakta }`
(js/packs/fokusvirta-ateena.js:598–614; piirto
js/fokustehtavat.js:828–960, kirjaus `game.actionMinitehtava`
js/game.js:1202). **Täkynostojen `nosto.kysymykset` sen sijaan EIVÄT ole
visa** vaan pelkkiä chat-avauksia pululle, ilman oikeaa vastausta ja
ilman palkkiota (js/fokusnosto.js:1303–1327).

Aarre: vihreä piste syttyy, kun lehden AARTEEN AVAUS -kysymys on
ratkaistu (`fokusvirtaKohtaamispiste`, js/fokusvirta.js:5440–5457;
`fokusAarreAvattu`), piirto js/fokuspiste.js (osuma-alue r = 22).
**Matkan voi jo nyt jatkaa ilman aarretta**: `travelModes` ei katso
laattaa eikä aarretta lainkaan (js/game.js:956).

Saapuminen: `visitCity(player)` (js/game.js:1072–1088) ja UI-ketju
`render()`issa — `fokusvirtaSaapuminen` (js/fokusvirta.js:1291–1315) →
`renderFact` → `fokusvirtaMerkintaLuettu` → `fokusvirtaSaapumiskupla`
(js/fokusvirta.js:1122) → `naytaEtsiAarreNappi` (js/fokusvirta.js:1226).
**Kaupunkilehti ei aukea itsestään**: `openArrival` (js/ui.js:13765)
ajetaan vain pelaajan omasta valinnasta, yhteinen ovi `avaaTutkinta()`
(js/ui.js:11149–11157).

Pulun ohjekupla: `polloVihje(teksti, kohde)` (js/pollo.js:6732–6734),
lisäkupla `polloLisavihje` (6748), saapumisrepliikki `polloSaapumiskupla`
(6758), monikuplainen `polloPuheenvuoro` (käytössä
js/fokusvirta.js:1214). Ensimmäisellä kaupungilla on jo erityiskohtelu —
Livian tuurauspaljastus kertalipulla `matkakirja-livia-paljastus`
(js/livia.js:496–656).

---

## 2. Toteutettavuus: "vain kohdemaassa värillinen topografia"

### 2.1 Vastaus: KYLLÄ — mutta ei sillä tavalla kuin kysymys olettaa

Kysymys olettaa, että *"pohjana pelissä jo oleva korkeuserolinssi"*
voidaan vain rajata maan muotoon. Se **toimii heti**, mutta vain
maailmannäkymän tarkkuudella (0,30 px/lautayksikkö, luku 1.3) — eli
juuri siinä mittakaavassa, jossa uutta karttaa ei katsota.
*"Mahdollisimman tarkka"* vaatii uuden rasterin.

Kolme reittiä, ja ne eroavat vain siinä, MISTÄ värillinen kuva tulee —
rajaus on kaikissa sama.

**Rajaus on helppo osa, ja sen aineisto on jo pelissä.**
`assets/data/maapolygonit.json` on ISO A3 -avaimellinen, laudan
koordinaateissa, 10m-tarkkuudella ja **mitatusti samassa kohdassa kuin
laattoihin poltettu rajaviiva (mediaani 0,02 lautayksikköä)**
(js/maanaariviivat.js:18–29). Sama polku, jonka js/maatummennus.js jo
piirtää viivana, kelpaa sellaisenaan SVG:n `<clipPath>`-sisällöksi.

Mitattu monimutkaisuus (`assets/data/maapolygonit.json`, 134 maata):

| Maa | renkaita | pisteitä |
| --- | --- | --- |
| ALB | 1 | 458 |
| ITA | 12 | 2 956 |
| ESP | 14 | 2 674 |
| FRA | 16 | 4 264 |
| GRC | 55 | 5 250 |
| IDN | 199 | 17 264 |
| NOR | 117 | 19 114 |
| RUS | 207 | 45 624 |

FRA ja GRC ovat clipPathina kevyitä; RUS, NOR ja IDN eivät ole (45 000
pisteen leikkuri lasketaan jokaisessa maalauksessa). **Suositus:
clipPath rakennetaan `js/maatummennus.js`in tavoin harvennettuna
näkymän tarkkuuteen** — siellä on jo `maanPolku(renkaat, tarkkuus,
leveys)` (js/maatummennus.js:174) juuri tätä varten, ja
polkumuisti (`polkuMuisti`, rivi 213) pitää tuloksen istunnon ajan.

### 2.2 Vaihtoehto (a): clipPath nykyisen reliefikuvan päällä

`assets/linssit/topografia.webp` on **jo Milleriin projisoitu laudan
rajasuorakulmioon** (tools/tee-reliefikartta.mjs:96–104,
`LAUTA = { leveys: 12000, lon0: −175, etela: −58, pohjoinen: 76 }`), eli
se osuu kohdalleen ilman yhtään uutta laskentaa.

- **Työmäärä:** pieni. Yksi `<image>` + yksi `<clipPath>` karttakuoreen.
- **Lataus:** 1,0 Mt kerran, koko maailmalle; jo nyt topografialinssin
  hintana.
- **Tarkkuus:** 0,30 px/lautayksikkö. Ranskan `rajaus` (666 × 553
  yksikköä) on tuosta kuvasta **200 × 166 pikseliä**. Ruudulla se
  venytetään tuhansiin pikseleihin — sumeaa puuroa.
- **Vesien syvyys:** mukana (MERI-asteikko, luku 1.3).

**Tuomio: kelpaa PILOTIN ensimmäiseksi päiväksi ja vain sille** — sillä
näkee viiden minuutin työllä, näyttääkö värillinen maa yhdessä ruskean
naapurin kanssa lainkaan siltä miltä omistaja haluaa. Lopulliseksi se
ei kelpaa.

### 2.3 Vaihtoehto (b): maakohtainen värireliefi rakennusaikana

Tämä on se, mitä uudistus oikeasti tarvitsee, ja **koneisto on jo
olemassa kahteen kertaan**:

1. `tools/fokuskartta/piirto.js` osaa jo piirtää yhden maan lehden
   maskin läpi: `maanMaski = maski(aineisto.maa.renkaat)` (rivi 1107) ja
   maastokerros, joka liitetään maskin läpi (rivit 1135–1170) — ja
   tuntee jo eron kohdemaan ja naapurin välillä (rivi 994: *"Sama kaava
   kuin kohdemaalla (osio 5)"*; rivi 1183: *"6a. VEDET KOHDEMAAN
   ULKOPUOLELLA"*).
2. `tools/tee-reliefikartta.mjs` osaa jo täysvärisen hypsometrian
   varjostuksineen ja meren syvyysasteikon (luku 1.3).

Uutta koodia tarvitaan siis vain **toinen väriasteikkopari** piirto.js:n
`ASTEIKKO`/meriasteikon rinnalle ja kytkin, jolla kohdemaan
maastokerros ja kohdemaan sisäiset vedet käyttävät sitä.

Lisenssi on kunnossa: ETOPO1 on public domain (luku 1.4), ja **uutta
lähdettä ei tarvita**. ETOPO 2022 (15″) olisi saatavilla ja sekin PD,
mutta se on tässä turha: pyramidi ajetaan 3′:llä ja dokumentti
perustelee sen varjostuksen kohinalla
(docs/moduulit/laattapyramidi.md luku 1). **Jos tarkkuutta halutaan,
ensimmäinen askel on `--kaariminuutit 1` samalle ruudukolle, ei uusi
aineisto.**

**Tiedostokoot, laskettuna pyramidin omista mitatuista luvuista**
(tavua/px 0,186–0,226 patinan kanssa; ilman patinaa mitattu trendi
0,307 → 0,061, joten värikerrokselle 0,06–0,08 on realistinen —
patinaa EI kannata piirtää kahteen kertaan, koska värikerros on
patinoidun laatan päällä):

| Maa | `rajaus` | yhtenä kuvana z6 (3,6 px/yks) | yhtenä kuvana z7 (7,2 px/yks) |
| --- | --- | --- | --- |
| GRC | 468 × 292 | 1 684 × 1 053 px = 1,8 Mpx → **0,14–0,37 Mt** | 3 369 × 2 105 = 7,1 Mpx → **0,6–1,5 Mt** |
| FRA | 666 × 553 | 2 398 × 1 992 = 4,8 Mpx → **0,38–1,0 Mt** | 4 795 × 3 984 = 19,1 Mpx → **1,5–4,0 Mt** |
| USA | 2 618 × 1 314 | 9 426 × 4 731 = 44,6 Mpx → **3,6–9,4 Mt** | 178 Mpx → 14–37 Mt |
| RUS | 5 772 × 2 273 | 20 780 × 8 181 = **170 Mpx** → 14–36 Mt | 681 Mpx → **ei mahdollinen** |

**Johtopäätös: yksi kuva per maa toimii Euroopassa mutta ei
maailmanlaajuisesti.** Venäjä, Kanada, USA, Kiina, Brasilia, Intia ja
Australia eivät mahdu yhteen kuvaan siinä tarkkuudessa, jossa niiden
kaupunkeja katsotaan.

### 2.4 Vaihtoehto (c) — SUOSITUS: värilaatat samalle laattaruudukolle

Tehdään värireliefistä **toinen laattajoukko samaan ruudukkoon**:
`pyramidi-vari/z<taso>/<sarake>/<rivi>.webp`. Peli piirtää sen omana
`<image>`-kerroksenaan pyramidin päälle, **clipPath = nykyisen maan
polku**.

Miksi tämä ja ei muu:

- **Peli ei tarvitse uutta latauslogiikkaa.** js/laattapyramidi.js
  valitsee jo tason ruudun tarkkuudesta (rivi 1699), noutaa näkyvän
  alueen ympäriltä ruudun verran (sääntö 1), pitää karkean pohjan alla
  (sääntö 2b) ja poistaa vanhan tason vasta kun uusi on paikallaan
  (sääntö 2). Sama kerros toisella juurella on kopio, ei uusi moottori.
- **Kuorma seuraa ruutua, ei maata.** Pelaaja lataa vain sen, mitä
  näkyy. 1920 × 1080 -ruutu syvimmällä tasolla on ~4 × 3 = 12 laattaa
  à 0,26 Mpx → **0,26–0,7 Mt** riippumatta siitä, onko maa Albania vai
  Venäjä.
- **Rajaus on ilmainen.** ClipPathin ulkopuolelle jäävät laatat voidaan
  jättää **noutamatta**: leikkurin laatikko tunnetaan ennen hakua.
- **Generointi voidaan tehdä maa kerrallaan** ja siis pilotoida
  yhdellä maalla — juuri niin kuin Kustannuskuri vaatii.

Generoinnin hinta (docs/moduulit/laattapyramidi.md luku 3: 1,17 Mpx/s
ilman patinaa, lohko 4 × 4):

| Maa | värilaattoja z4–z7 (arvio, vain polygonin leikkaavat) | Mpx | aika 1 säie |
| --- | --- | --- | --- |
| GRC | ~47 | 12 | ~10 s |
| FRA | ~106 | 28 | ~24 s |
| RUS | ~3 450 | 900 | ~13 min |

Koko pelattavan maailman värikerros on siis suuruusluokaltaan
**muutama tunti yhdellä säikeellä ja alle 0,3 Gt ämpärissä** (patinaton,
vain maa-alueet) — pyramidi itse on jo 1,3 Gt, ja R2:n ilmaisraja on
10 Gt.

### 2.5 Suorituskyky, muisti ja service worker

- **Kontin 2–3 fps ei ole este** — se on ohjelmistorenderöinti ilman
  GPU:ta, ja kartan kaikki liike on jo kompositorilla
  (js/laattapyramidi.js:26–32). Mittaus on silti tehtävä savukkeella,
  ei arvattava.
- **Muisti:** värikerros kaksinkertaistaa DOMissa olevat
  `<image>`-elementit kohdemaan alueella. Pyramidin oma mittari
  `window.__pyramidinMittarit()` (js/laattapyramidi.js:536–543) on
  valmis; sinne lisätään värilaattojen luku ja ensimmäisen erän
  valmiuskriteeri sidotaan siihen.
- **SVG-suodattimet ovat KIELLETTYJÄ.** tests/rules.test.mjs:4510–4522
  valvoo, etteivät kartan isot kerrokset käytä suodatinta: *"iOS:n
  webapp-tilassa maa, rannikko, meren kaiut ja aallot katosivat kartalta
  heti kun sovellus kävi taustalla — kaikki juuri ne kerrokset, joilla
  oli suodatin."* **Tästä seuraa kaksi kovaa rajaa:** värjäystä ei saa
  tehdä ruskeista laatoista `feColorMatrix`/`feComponentTransfer`illa
  (mikä muuten olisi houkutteleva oikotie), eikä `<mask>`-elementtiä
  kannata käyttää rajaukseen — `clipPath` on turvallinen, koska se ei
  vaadi omaa piirtopuskuria, mutta **se on todennettava oikealla
  iPadilla ennen skaalausta**.
- **Service worker:** sw.js esilataa vain repon omat tiedostot
  (CACHE-lista); pyramidin laatat tulevat ämpäristä
  (`https://media.matkakirja.app/`, js/media.js:43) eivätkä ole
  esilatauslistalla. Värilaatat käyttäytyvät samoin — **offline-pelissä
  kohdemaa on ruskea, kunnes laatat on kerran ladattu.** Tämä on
  hyväksyttävä, mutta se on kirjattava (ks. luku 8).

### 2.6 Vedet: batymetria ja "valtion ulkopuoliset vedet ruskeina"

**Batymetria on ETOPO1:ssä mukana** ja peli värittää sen jo
(tools/tee-reliefikartta.mjs:195–205, `MERI`-asteikko −11 000 m → 0 m).
Uutta aineistoa ei tarvita.

Rajaussääntö on ainoa aito päätös. Natural Earthin `admin_0`-polygonit
ovat **maa-alueita**, joten pelkkä maan polygoni jättää rannikkovedet
ruskeiksi — ja *"vedetkin näkyvät sinisenä syyvyyserot huomioiden"*
jäisi toteutumatta rannikolla.

**Ehdotettu yksinkertaisin sääntö: maan polygoni laajennettuna ulospäin
12 meripeninkulmalla (22,2 km).** Se on aluevesiraja eli juuri se raja,
jonka omistajan lause *"valtion ulkopuoliset vedet ja meret"* olettaa,
ja se on lautayksikköinä **6,7 yksikköä** (22,2 km / 111,32 km asteella
× 33,33 yksikköä asteella) eli syvimmällä tasolla 48 px levyinen sininen
rannikkokaistale.

Toteutus **rakennusaikana, ei ajossa**: `tools/generoi-maapolygonit.mjs`
kirjoittaa toisen tiedoston `assets/data/maapolygonit-aluevesi.json`,
jossa renkaat on työnnetty 6,7 yksikköä ulospäin. Silloin ajossa on yhä
vain yksi tavallinen `clipPath` yhdellä polulla — ei `mask`, ei
suodatin, ei puskuria (ks. 2.5).

Sisävedet (järvet, joet) ovat maan polygonin sisällä, joten ne tulevat
mukaan automaattisesti.

**Vaihtoehto pilottiin:** ensimmäinen erä ilman puskuria (leikkuri =
rantaviiva). Silloin Ranskan järvet ja joet ovat sinisiä ja Välimeri
ruskea. Se on halvin tapa nähdä, riittääkö se — mutta Marseillen
kaltaisessa merikaupungissa se todennäköisesti näyttää keskeneräiseltä,
ja siksi suositus on tehdä puskuri heti.

---

## 3. Zoomi ja rajat

### 3.1 "Maa niin suureksi kuin mahdollista"

Laskenta on suoraviivainen ja sen palaset ovat paikoillaan:

1. Maan laatikko on **jo taulussa**: `FOKUS_POHJAT[iso].rajaus`
   (js/packs/fokus-grc.js, 134 maata) — ja jos taulua ei haluta
   ylläpitää käsin, sama laatikko voidaan laskea kerran
   `assets/data/maapolygonit.json`in renkaista.
2. Näkymä on **SVG:n `viewBox`**: `fitViewBox()` (js/kartta.js:558),
   asetus rivillä 633, `ui.viewBoxSize` rivillä 614.
3. Saapumiszoomi on jo olemassa: `saapumisPorras()` (js/kartta.js:881)
   tavoittelee `min(leveys × 0,43, 1500 | 650)` — **tämä on se rivi,
   joka vaihtuu**: tavoitteeksi maan `rajaus` marginaaleineen.
4. Kamera-ajo `ajaKamera(kohde, { kesto, sovita, pehmennys })`
   (js/kartta.js:1965) hoitaa liikkeen; easing on jo Raamatun
   "KAMERA-AJOT"-linjauksen mukainen.

Marginaali: `rajaaKasinPan`in oma sääntö on neljännes **pidemmästä**
sivusta joka reunalle (js/kartta.js:2534–2547) — sama sääntö sopii
tähän, koska se antaa kapealle maalle (Chile, Norja) leveyttä yhtä
paljon kuin korkeutta.

### 3.2 Uloszoomauksen esto

**Tämä on jo toteutettu.** `fokusRajaukset()` palauttaa `uloin`-laatikon
= maan ikkuna × `ULOSZOOMAUS_KERROIN` (= 3), ja *"Kauemmas ei pääse
painikkeella, rullalla, nipistyksellä eikä pelin omalla kamera-ajolla"*
(js/kartta.js:2567–2576).

Omistajan uusi lause *"Pelaaja ei voi itse zoomata ulospäin, ainoastaan
sisäänpäin"* on **tiukennus**: kerroin 3 → 1 (tai lähelle 1).

**RISTIRIITA 2.** Kerroin 3 on omistajan oma päätös 30.8.2026 ja se
tehtiin nimenomaan siksi, että *"Ilman löysennystä kamera oli lukossa
maan omaan laatikkoon, ja omistaja huomasi sen heti laitteella"*
(js/kartta.js:2577–2581). Sääntö 3 samassa lohkossa lisää: jos rajaus
olisi ehdoton, **naapurimaahan osoittava matkakohde jäisi ruudun
ulkopuolelle eikä matkaan pääsisi** (js/kartta.js:2589–2594).

Uusi **Liiku**-nappi (luku 6) ratkaisee tuon: kun matkakohteen valitsee
napista eikä kartalta, kameran ei tarvitse näyttää naapurimaata. Siksi
kerrointa voi laskea — **mutta vain yhdessä Liiku-napin kanssa**, ei
ennen sitä. Suositus: kerroin 1,15 (pieni hengitysvara, ettei kartta
tunnu lukolta) ja `matkakohteidenAlue`-laajennus säilytetään.

### 3.3 Pienet ja suuret maat

- **Pienet** (SGP 52 × 46, LUX 66 × 84 lautayksikköä): maan ikkuna on
  ruutua pienempi, ja `zoomiTasot()`in lähin porras on `ZOOMI_LAHIN = 88`
  (js/kartta.js:93; kapealla ruudulla 58, rivi 110) eli **laudan
  leveytenä 88 yksikköä**. Singapore (52) ja Luxemburg (66) ovat siis jo
  nyt lähemmäs kuin lähin porras: maa ei voi täyttää ruutua enempää
  ilman uutta porrasta. Suositus: `ZOOMI_LAHIN` lasketaan
  `min(88, maan rajaus × 0,8)`, jolloin pikkuvaltio saa oman
  lähiportaansa; värilaattojen z7 (7,2 px/yks) kestää sen — 52
  yksikköä = 374 px natiivia, ruudulla 1200 px eli 3,2× venytys. Jos se
  näyttää pehmeältä, ratkaisu on z8, ei koodi.
  Maltaa ja Monacoa ei ole pelissä kaupunkeina.
- **Suuret** (RUS 5 772 × 2 273): maan ikkuna on lähes puoli lautaa.
  Tässä *"niin suureksi kuin mahdollista"* on käytännössä
  uloszoomauksen pohja, ja kartta on saapuessa hyvin kaukana. Suositus:
  **saapumiszoomi kohdistuu kaupunkiin, ei maahan**, kun maan ikkuna on
  yli jonkin rajan (esim. `rajaus.w > 1500` yksikköä) — muuten pelaaja
  saapuu Vladivostokiin ja näkee Moskovan. Rajaus (uloszoomauksen
  pohja) pysyy silti maan ikkunassa.

### 3.4 Punainen rajaviiva

Paletin punaiset (css/styles.css):

| Väri | Käyttö |
| --- | --- |
| **`--mark: #b03a2b`** | muuttuja rivillä 90; maakäyrät (14153, 14169, 15040, 15109) |
| `#c2452f` | 4 osumaa |
| `#c4321f` | radion live-piste (3235) ja sinettivahan punainen |
| `#a3281c` | live-tekstin väri (3228) |
| `#b0523c` | kiintiöpalkki (16290) |

**Suositus: `--mark: #b03a2b`** — se on ainoa punainen, jolla on oma
muuttujanimi, ja sitä käytetään jo kartan omilla merkintäkerroksilla
(maakäyrät). Toteutus on yhden CSS-rivin muutos:
`.maatummennus-viiva { stroke: rgba(70, 51, 31, 0.6) }` →
`stroke: var(--mark)` (css/styles.css:1702), leveys `TUMMENNUS_VIIVA`
2 → 2,5–3 (js/maatummennus.js:147).

Huom. css/styles.css:5845 muistuttaa: *"Kirkas punainen ja sininen
repisivät kartan ilmeen rikki"*. Se koski etusivun reittiviivoja, ei
maan rajaa — mutta se on sama esteettinen riski, ja siksi kohta 1
"Omistajan päätettäväksi" -listalla on juuri punaisen sävy ja voimakkuus.
