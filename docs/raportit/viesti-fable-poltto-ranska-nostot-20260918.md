# Viesti Fablelle: Ranskan nostot nostotasolle — lukitut ankkurit (PAATOKSET 33 TARKENNUS 2 kohta 5)

Opus-agentti 18.9.2026 klo 9.30 Suomen aikaa. Haara
`claude/bold-ride-vow4ki-poltto-ranska-nostot` origin/mainin (v1936)
päältä. Aikakatto 45 min; laattoja ei ajettu (ks. luku 5), Actions-
työnkulkua ei käynnistetty, ämpäriin ei viety.

**Tiivistelmä yhdellä rivillä:** poltetun pisteen paikkaongelma on
ratkaistu ja mitattu — ankkuri on nyt DATAA eikä näkymän tilaa — mutta
polttoketju (`tools/fokuskartta/nostot.mjs`) ei vielä lue sitä, ja
siinä on kaksi erillistä vikaa, jotka on korjattava ennen laattojen
ajoa. Ne on eritelty luvussa 4 ja ne ovat seuraavan erän työ.

## 1. Selvitys: kaksi ladontaa, jotka eivät voi osua yhteen

### 1.1 Miten nostotaso sijoittaa nostot nyt

`tools/fokuskartta/nostot.mjs` `keraaNostot` → `nostoladontaMerkit`
kutsuu **pelin omia passeja** laudan datasta kootulla tynkä-`ui`:lla:

| passi | funktio |
| --- | --- |
| merkkirivit | `js/fokuskohteet.js kohdeKarttarivit` |
| kasaus ja viivat | `js/fokusniput.js niputaFokusmerkit` |
| erottelusiirto | `js/fokuskohteet.js eritteleKohdeRyhmat` |
| nimiöiden väistö | `js/fokuskohteet.js paivitaKohdeNimiot` |
| merkkiportti | `js/pallolauta/nostot.js merkkiPortti` (`lahella = false`) |

Tulos on **laudan koordinaateissa** (`x`, `y` + `ankkuriX/Y`), ja koko
ketju on ruudusta riippumaton — se on sen ansio.

### 1.2 Miten peli sijoittaa ne nyt

`js/pallolauta/nostot.js` `ankkuroi` ajaa PAATOKSET 32:n ankkuroinnin
NÄIDEN passien tuloksen **päälle**: saapumiskehyksessä (ruutupiste ×
`uloinOsuus`) merkit levitetään erilleen (`levitaMerkit`), tulos
käännetään asteiksi ja talletetaan varastoon. Varaston tunnus on
`js/pallolauta/nostoankkurit.js`:ssä sanatarkasti **ruutukoko**:

```js
tunnus(_avaimet, ruutu) {
  return `${Math.round(ruutu?.leveys ?? 0)}x${Math.round(ruutu?.korkeus ?? 0)}`;
}
```

### 1.3 Ongelma

Levitys mittaa nimiö- ja symbolilaatikoita, jotka ovat PAATOKSET 32
kohdan 4 jälkeen **ruutuvakioita**. Saapumiskehyksen maantieteellinen
laajuus sen sijaan on ruudun kokoinen. Siksi 390 px puhelin ja 1400 px
työpöytä saavat **eri ankkurin samalle nostolle** — ja poltettu piste
on laatassa vain yhdessä paikassa. Kumpi tahansa ruutu valittaisiin
poltolle, toisella elävä nimiö ja osumapinta karkaisivat musteesta.

## 2. Päätös (kirjattu, ei kysytty — omistaja ei ollut tavoitettavissa)

1. **Poltto käyttää puhelimen saapumiskehyksen ankkuria**
   (390 × 844, dpr 2 — omistajan pääalusta).
2. **Peli ei enää laske ankkuria poltetulle nostolle**, vaan lukee sen
   datasta. Lukittu ankkuri ohittaa levityksen kokonaan, myös
   `esteenAlla`-uudelleenladonnan. Näin *kaikilla* ruuduilla elävä
   nimiö ja osuma ovat poltetun pisteen kohdalla.
3. **Aihenostoa ei lukita.** Se syntyy vasta ryhmityksessä jäsentensä
   keskiarvona, joten sen paikan määräävät jäsenten lukitut ankkurit.
4. **Kaupungin sisäiset eivät ole taulussa lainkaan** (PAATOKSET 34:
   ne ovat liuskassa eivätkä polta pistettä kartalle). Ne eivät
   myöskään ole `osumat()`-listalla, joten vienti sulkee ne pois
   itsestään — ei omaa sääntöä.

## 3. Mitä tässä erässä tehtiin

### 3.1 Uusi työkalu `tools/vie-nostoankkurit.mjs`

Avaa pelin Playwrightilla 390 × 844 -ruudussa, ajaa saapumisen loppuun
ja lukee `ui.pallolauta.nostot.osumat()` — **ne samat rivit, jotka
ankkurointi on juuri kirjoittanut**, ei omaa kopiota laskennasta
(Raamatun ehto: yksi ladonta, yksi lähde). Vienti ajetaan lipulla
`?lukitutankkurit=0`, ettei toinen ajo lukisi omaa edellistä
tulostaan. Kirjoittaa `js/packs/nostoankkurit-<iso>.js`.

`--tarkista` avaa saman pelin **kahdessa ruudussa** lukittu taulu
päällä ja vertaa jokaisen noston lat/lng:tä tauluun.

### 3.2 Uusi data `js/packs/nostoankkurit-fra.js`

**33 ankkuria**, viety 18.9.2026 Pariisin saapumisnäkymästä 390 × 844.
Avain on nostokerroksen rivin avain (`nosto:<id>`).

### 3.3 Pelikoodi

- `js/pallolauta/nostoankkurit.js`: `lukittuAnkkuri(avain)`,
  `lukittujaAnkkureita()`, vastakoe `?lukitutankkurit=0`.
- `tests/nostoankkurit-lukitut.test.mjs`: taulu on dataa, jota peli
  uskoo suoraan, joten sen kelpoisuus vartioidaan (avaimen muoto,
  koordinaatti Ranskan laatikossa, `lukittuAnkkuri` lukee taulun
  sellaisenaan, tuntematon avain ei saa ankkuria).
- `js/pallolauta/nostot.js` `ankkuroi`: lukitut ankkurit asetetaan
  varastoon sellaisenaan ennen levitystä, eikä niitä anneta
  levitykselle. Levitys väistää niitä silti, koska varastoon asetettu
  ankkuri on `kiinteat`-listan "jo ankkuroitu" -haara. **Muutos on
  `nostoankkurit.js`:n ja `ankkuroi`n puolella; kaupunkiliuskan
  asemointiin ei koskettu.**

### 3.4 Mitta (yksi Playwright-kohdemittaus)

`node tools/vie-nostoankkurit.mjs --iso FRA --tarkista`, Pariisi,
ruudut 390 × 844 ja 1400 × 900, dpr 2, Chrome for Testing:

| | 390 × 844 | 1400 × 900 |
| --- | --- | --- |
| lukittuja ankkureita ruudulla | 33 / 33 | 32 / 33 (yksi kameran ulkopuolella) |
| suurin ero tauluun | **4,17 · 10⁻⁷°** | **4,17 · 10⁻⁷°** |
| samat merkit, sama ero kummallakin ruudulla | kyllä | kyllä |

**Tulos: 65/65 läpi.** Ero on taulun oman pyöristyksen (6 desimaalia)
kokoinen, **≈ 0,05 m** eli kolme kertaluokkaa alle vaaditun 2 px:n —
ja se on **täsmälleen sama luku kummallakin ruudulla**, mikä on koko
väite: ankkuri ei enää riipu ruutukoosta. Vastakokeeksi sama ajo
ilman lukitusta (`?lukitutankkurit=0`, vienti-ajo) antaa 390 px:llä ja
1400 px:llä eri ankkurit.

Huomaa, että tämä mitta todistaa **ankkurin vakauden**, ei sitä että
poltettu muste osuu siihen — sitä ei voi mitata ennen kuin luvun 4
korjaukset on tehty ja laatat ajettu.

### 3.5 Pariisin savuke ja kaappaukset

`tools/savukkeet/savuke-pariisi-lahizoom.mjs` ajettiin muutoksen
päällä: **0 FAIL**, limittyviä nimiöpareja rykelmässä 0 saapuen ja 0
lähizoomissa. Kaappaukset `docs/raportit/kuvat/poltto-ranska-20260918/`
— `pariisi-lahizoom-390/1400.png` (Ranska lähizoomissa) ja
`pariisi-liuska-auki-390/1400.png` (saapumisnäkymä liuska auki).
Savukkeen muut kaappaukset on karsittu: kansio oli 27 Mt, ja nämä
neljä riittävät (10 Mt).

Kaksi silmämääräistä havaintoa, kun kuvia vertaa mainin omiin
(`docs/raportit/kuvat/paikallaan-20260918/`, sama savuke ennen tätä
erää):

1. **Kaksi *Kaulanauhajuttu*-nimiötä on MAINISSA JO ENNESTÄÄN** —
   täsmälleen samoissa paikoissa kummassakin kuvassa, vaikka
   `js/packs/skandaalit.js`:ssä on vain yksi tietue. **Ei siis tämän
   erän vika, mutta se on vika**, ja kannattaa selvittää erikseen.
2. **Lähizoomissa oli kaksi *Loire*-nimiötä, nyt yksi.** Lukittu
   ankkuri siirsi noston 0,81 yksikköä, ja nimiö osuu nyt yhteen
   kartan oman jokinimen kanssa. Tämä on todennäköisesti parannus
   (kaksoiskuva poistui), mutta sitä ei ole mitattu — jos omistaja
   haluaa jokinimiön näkyviin, se on väistön eikä ankkurin asia.

## 4. Kaksi vikaa polttoketjussa — korjattava ennen laattoja

Nämä löytyivät mittaamalla `keraaNostot`ia suoraan (18.9.2026).
**Kumpikaan ei ole tässä erässä korjattu**, koska korjaus muuttaa
poltettavaa musteta ja vaatii oman mittansa.

**Mitattu:** Ranskassa on polttoketjussa **78 merkkiä**, joista
**20 on tällä hetkellä poltettavia** (`estot` on tyhjä — Ranskan
täkyehto ei siis enää estä polttoa). Ankkuritaulussa on 33 avainta.
Leikkaus on **8**.

### 4.1 Polttoketju ei tunne lukittua ankkuria

`nostoladontaMerkit` sijoittaa merkin laudan koordinaatteihin
(`r.nippu?.x ?? r.x + r.sx`). Lukittu ankkuri on asteina. Muunnos on
olemassa: **`js/pulu-paikka.js asteetLaudalle(lauta, lat, lon)`**.
Korjaus on yhden kohdan asia: kun merkillä on lukittu ankkuri,
`x`/`y` (ja `ankkuriX`/`ankkuriY`) tulevat siitä eikä ladonnasta.
Ilman tätä poltettu piste on siinä, missä vanha ladonta sen jätti —
eli **eri paikassa kuin elävä nimiö**, ja koko erän hyöty menetetään.

**Mitattu ero (18.9.2026, `keraaNostot` vs. ankkuritaulu,
`asteetLaudalle` — pelkkää dataa, ei selainta).** Niistä 8:sta, joilla
on sekä poltto että ankkuri:

| tunnus | ero (laudan yksikköä) |
| --- | ---: |
| avignonin-paavinpalatsi | **3,10** |
| mont-saint-michel | **2,74** |
| loire | 0,81 |
| viisi muuta (carcassonne, chartres, lascaux, pont-du-gard, vignemale) | 0,00 |

Viisi kahdeksasta osuu jo nyt täsmälleen — ne ovat ne, joita levitys
ei siirtänyt. Kolme ei osu. Saapumisnäkymässä mitattu mittakaava on
~2,1 px/yksikkö (PAATOKSET 32 -erän mitta), joten pahin ero on
**noin 6–7 px** eli moninkertaisesti yli vaaditun 2 px:n.
`asteetLaudalle(pack, lat, lng)` toimii sellaisenaan Nodessa, joten
korjaus on testattavissa **ilman selainta ja ilman laattoja**: sama
vertailu, vaatimuksena 0,00.

**Varoitus korjaajalle — siirtoviiva seuraa merkkiä.** `keraaNostot`
polttaa merkin lisäksi sen **siirtoviivan**, jonka päät laskee
`js/fokusniput.js nippuViivanJana` kasauspassin tuloksesta
(`r.nippu`). Jos merkin `x`/`y` vaihdetaan lukittuun ankkuriin mutta
viiva jätetään ennalleen, viiva osoittaa paikkaan, jossa merkkiä ei
ole — ja se on laatassa pysyvästi. Viivan pää on siirrettävä samalla,
tai lukitulta nostolta on jätettävä viiva polttamatta. **Tätä ei ole
tässä erässä ratkaistu, ja se on syy, miksi korjausta ei tehty
kiireessä.**

### 4.2 Polttoketju ei tunne PAATOKSET 34:ää

Poltettavien 20:n joukossa on **7 `nakyva-kaupunki-*`-merkkiä**
(Bordeaux, Lille, Lyon, Nantes, Nizza, Strasbourg, Toulouse) ja
`elaintaky-FRA`. Kaupunkien sisäiset nostot eivät saa polttaa pistettä
kartalle. Polttoketju latoo yhä kaikki 78 riviä, koska se ei tunne
liuskajakoa.

### 4.3 Vienti näkee vain kameran näyttämät nostot

Neljä poltettavaa Ranskan nostoa (`biskajanlahti`,
`carnacin-kivirivit`, `chambord`, `montblanc`) **ei saanut ankkuria**:
ne eivät olleet Pariisin saapumisnäkymän merkkijoukossa. Vienti on
siis ajettava **kerran jokaisesta Ranskan fokuskaupungista** ja
tulokset yhdistettävä, tai kamera vedettävä niin kauas, että koko maa
on joukossa. Työkalu ottaa jo `--kaupunki`-valitsimen; yhdistäminen on
seuraavan erän työ (nyt uusi ajo korvaa taulun).

## 5. Miksi laattoja EI ajettu

Kaksi syytä, kumpikin riittävä:

1. **Luvun 4 viat.** Laatat, jotka poltettaisiin vanhalla ladonnalla,
   olisivat väärässä paikassa — ja koska luettelo `nostotaso.nostot`
   ei ole tasokohtainen, väärä muste jäisi kartalle pysyvästi.
2. **Versiovahti.** `js/pallolaatat.js lepokerroksenKerrokset`
   sammuttaa **koko laattakerroksen**, jos `pyramidi.json`:n
   nostoversio ei täsmää pallon sarjan kanssa
   (`docs/raportit/viesti-fable-poltto-ranska-20260914.md` luku 5).
   Uusi nostoversio vaatii siis pallon Mercator-sarjan uudestaan ja
   `js/pallo.js`:n osoittamaan siihen — eli versionoston, joka on
   tässä tehtävänannossa kielletty.

## 6. Valmiit komennot (ÄLÄ aja ennen luvun 4 korjauksia)

**Paikallinen koepoltto koekansioon** (liput tarkistettu
`tools/generoi-laattapyramidi.mjs`:n alusta; `--paikkaus` vaatii
lähdeversion ja `--alue`):

```
node tools/generoi-laattapyramidi.mjs <koekansio>/poltto-ranska \
  --nostotaso --nostoversio 2026-09-18-fra \
  --paikkaus 2026-09-08a-nostot \
  --alue -5,41,10,52 --tasot 5-7
```

**Actions-työnkulku** (inputit luettu `.github/workflows/generoi-pyramidi.yml`
riveiltä 132–192; versiot `viesti-fable-poltto-ranska-20260914.md`
luvun 5 taulukosta — tarkista ne ämpäristä juuri ennen ajoa):

```
gh workflow run generoi-pyramidi.yml \
  -f tasot=paikkaus \
  -f versio=2026-09-07a \
  -f nostoversio=2026-09-18-fra \
  -f lahdeversio=2026-09-08a-nostot \
  -f alue=-5,41,10,52 \
  -f vie_luettelo=false
```

Huom: `tasot=vain-nostotaso` polttaa **koko maailman** nostotason
uudelleen; Ranskan rajattu paikkaus on `tasot=paikkaus` +
`lahdeversio` + `alue`. Kumpi valitaan, on Fablen päätös — koko
maailman uusinta on siistimpi (ei paikkauslohkojen saumoja) mutta
kalliimpi.

**Manifestin päivitys** tulee vasta julkaisuketjun lopussa
(`vie_luettelo=true` tai pelkkä luettelojobi), sen jälkeen kun
pallon sarja ja `js/pallo.js` osoittavat samaan nostoversioon.

## 7. Mitä Fablelta tarvitaan

1. **Vahvistus päätökselle 2.1** (poltto puhelimen kehyksestä). Jos
   omistaja haluaa työpöydän kehyksen, vaihto on yhden ajon mittainen:
   `--leveys 1400 --korkeus 900`.
2. **Kumpi polttotapa** (koko maailman nostotaso vai Ranskan paikkaus).
3. **Luvun 4 korjaukset omana eränään** ennen mitään laattojen ajoa.
   Järjestys: 4.3 (vienti kaikista Ranskan kaupungeista) → 4.2
   (PAATOKSET 34: kaupungin sisäiset pois poltosta) → 4.1 (lukittu
   ankkuri polttoketjuun, siirtoviiva mukana) → laattojen koepoltto
   paikallisesti → luvun 6 komennot.
4. **Päätös kaupungin sisäisistä** (4.2) on sisältöpäätös, ei
   tekninen: poltettu muste on pysyvää, joten en tehnyt sitä itse.

---

# Erä 2 — polttoketju lukee lukitun ankkurin (18.9.2026 klo 10.15)

Opus-agentti, sama haara. Aikakatto 45 min. Actions-työnkulkua **ei**
käynnistetty, ämpäriin **ei** viety, PR:ää **ei** avattu.

## E2.1 Ankkurit: Marseille mukaan, 36 ankkuria

`tools/vie-nostoankkurit.mjs` sai lipun **`--yhdista`**: uudet rivit
lisätään tauluun eivätkä korvaa sitä, ja ensin ajettu kaupunki voittaa
(muuten taulu muuttuisi ajojärjestyksestä). Ajo Marseillesta (390 ×
844) toi **kolme uutta ankkuria**: `hahmotelma-ajaccio`,
`hahmotelma-verdon` ja **`montblanc`** — viimeinen on yksi luvun 4.3
neljästä puuttujasta. Taulussa on nyt **36 ankkuria**.

Työkalu ei enää kovakoodaa konttiselainta: ilman `CHROMIUM`-muuttujaa
ja ilman `/opt/pw-browsers/chromium`-polkua se kysyy polun
Playwrightilta (Macilla `chrome-mac-arm64/Google Chrome for Testing`).

**Ranskan fokuskaupunkeja on laudalla kaksi** — Pariisi ja Marseille
(Cayenne ja Nouméa ovat Ranskan tunnuksella mutta lehden ikkunan
`-5,41,10,52` ulkopuolella, eivätkä voi tuoda Ranskan ankkureita).
`nakyva-kaupunki-*`-rivit **eivät ole laudan kaupunkeja** eikä niihin
voi saapua, joten vientiä ei voi ajaa niistä. Kumpikin ajo on siis
tehty, ja **kolme nostoa jäi silti ilman ankkuria**:
`biskajanlahti`, `carnacin-kivirivit`, `chambord`.

**JUURISYY MITATTU** (uusi lippu `--erittely` tulostaa kerroksen
kaikki rivit, myös aihemerkit). Pariisin saapumisnäkymässä on **42
riviä**, ja niiden joukossa on kolme aihemerkkiä — yksi niistä on
sanatarkasti:

```
RIVI aihemerkki:nosto:chambord | Chambordin linna… | 47.572,1.213
```

Syy ei siis ole kamera, vaan **aihenosto (PAATOKSET 27)**: nämä kolme
ovat aihemerkin sisällä, ja aihemerkki on listalla YHTENÄ rivinä —
jäsenet eivät ole omina riveinään. Aihenostoa taas **ei saa lukita**
(erän 1 päätös 3: sen jäsenyys on kaupungin nostojoukon funktio ja se
syntyy vasta ryhmityksessä). **Nämä kolme jäävät siis eläviksi
tarkoituksella, eivätkä polta laattaan mitään** — väärää mustetta ei
synny. Jos Fable haluaa ne laattaan, ratkaisu on aihenoston purku tai
jäsenen oma vienti, ja se on sisältöpäätös.

## E2.2 Polttoketju (tools/fokuskartta/nostot.mjs)

Kolme muutosta, kaikki `nostoladontaMerkit`-funktiossa:

1. **Lukittu ankkuri on merkin paikka.** `x`/`y` ja
   `ankkuriX`/`ankkuriY` tulevat taulusta `asteetLaudalle`-muunnoksella.
2. **Siirtoviivaa ei polteta** lukitulle nostolle (`viiva: null`) —
   Fablen rajaus kohta b. Luvun 4.1 varoitus on siis ratkaistu
   poistamalla viiva, ei siirtämällä sen päätä.
3. **Taulullisen maan merkki ilman ankkuria ei pala lainkaan.**
   Uusi `onLukittuMaa(iso)` (js/pallolauta/nostoankkurit.js,
   `LUKITUT_MAAT = ['FRA']`) rajaa säännön niihin maihin, joilla taulu
   on; muut maat palavat kuten ennen. Ilman tätä ankkuriton Ranskan
   merkki jäisi laatassa siihen, minne vanha levitys sen jätti.

**TIIVISTE LASKETAAN ENNEN SIIRTOA, ladonnan pisteestä.** Tämä on erän
tärkein yksityiskohta: tiiviste on merkin TUNNISTE, jolla peli päättää
onko merkki laatassa (js/fokuskohteet.js `kohteenNostotiiviste` →
js/pallo.js `pallonNostoOnPoltettu`), ja pelin puoli laskee sen omasta
ladonnastaan. Jos poltettu tiiviste laskettaisiin siirretystä
pisteestä, se ei täsmäisi pelin laskemaan ja merkki piirtyisi elävänä
musteen päälle — **kaksoiskuva jokaisesta lukitusta nostosta**.
Ladonta on kummallakin puolella sama, joten ladonnan pisteestä
laskettu tiiviste täsmää ja merkki vaikenee oikein.

**Kaupungin sisäiset pois poltosta** (PAATOKSET 34, rajaus kohta a):
suodatus käyttää pelin omaa `onKaupunginSisainen`-funktiota
(js/pallolauta/kaupunkiliuska.js) eikä tools-puolen kopiota; noston
laudan piste käännetään asteiksi `laudaltaAsteiksi`-funktiolla.
`nakyva-kaupunki-*` ja `elaintaky-*` palavat kuten ennen (rajaus
kohta a) — edellinen ON kaupungin piste, jälkimmäinen ei kulje
kohdekerroksen läpi lainkaan.

## E2.3 Mitta ilman selainta (18.9.2026)

`keraaNostot(pack)` vs. ankkuritaulu, `asteetLaudalle` — pelkkää dataa:

| | ennen erää 2 | erän 2 jälkeen |
| --- | ---: | ---: |
| Ranskan poltettavia | 20 | **17** |
| niistä lukitussa ankkurissa (ero 0,00) | 5 / 12 | **9 / 9** |
| väärässä paikassa (ero > 0) | 3 | **0** |
| ilman ankkuria poltettavana | 4 | **0** |
| kaupunkipisteitä + eläintäky (palavat kuten ennen) | 8 | 8 |

**Kaikki lukitut Ranskan merkit osuvat ankkuriin, ero 0,00 laudan
yksikköä.** Ennen erää suurimmat erot olivat Avignon 3,10 ja
Mont-Saint-Michel 2,74 yksikköä (~6-7 px).

**Koko maailman tilasto samasta ajosta:** 1857 merkkiä 112 maasta,
poltetaan **1612** · 82 monen maan merkkiä eläväksi · 109 eläintäkyä ·
88 merkkiä merkkiportin taakse · **32 kaupungin sisäistä eläväksi** ·
**3 ilman lukittua ankkuria eläväksi**.

**VAROITUS FABLELLE — kaupungin sisäisten suodatus on GLOBAALI.**
PAATOKSET 34 on pelin sääntö kaikille maille, ja elävä kerros ajaa sen
jo nyt globaalisti, joten suodatus on tässä sama. Seuraus on kuitenkin
polttotavan valinnassa: **jos ajetaan Ranskan paikkaus**
(`tasot=paikkaus` + `alue`), luettelosta putoaa 32 sisäistä nostoa koko
maailmasta, mutta laattoja maalataan uudelleen vain Ranskasta — muiden
maiden 32 - (Ranskan osuus) sisäistä jäisi vanhaan laattaan musteena,
jota kerros ei piilota (polttovelkaa). **Koko maailman nostotason
uusinta (`tasot=vain-nostotaso`) ei jätä tätä velkaa.** Suositus:
`vain-nostotaso`.

## E2.4 Koepoltto paikallisesti — laatat ajettu ja luettu

`node tools/generoi-laattapyramidi.mjs <scratch>/poltto-ranska
--nostotaso --nostoversio 2026-09-18-fra --paikkaus 2026-09-08a-nostot
--alue -5,41,10,52 --tasot 5-7`

| | |
| --- | --- |
| laattoja | **47** (z5 6 · z6 18 · z7 23), 8 lohkoa à 4×4 |
| kokoa | **0,38 Mt** (keski z5 10,5 kt · z6 8,5 kt · z7 6,7 kt) |
| kokonaisaika | 2,8 s (16,4 Mpx/s) |
| luettelo | `pyramidi.json` 66 006 tavua, `nostotaso.versio` **2026-09-18-fra**, **1612 nostoa** |

Generaattori kovakoodasi selaimen konttipolkuun; Macilla ajo vaatii
`PW_CHROMIUM=<Chrome for Testing>`. (Vientityökalu ei enää kovakoodaa,
ks. E2.1; generaattoriin ei koskettu.)

**Read-tarkistus, kaksi laattaa** (webp → png `sips`):

1. **z7/83/33** (Pariisin pohjoispuoli, Lillen seutu): merkit
   *Lille*, *Deltatyöt*, *Delftin linssit*. **Yhtään siirtoviivaa ei
   näy** ja pisteet ovat nimiöidensä vieressä. Pariisin oma laatta
   z7/83/34 ei ollut tässä ajossa mukana (47 laattaa kattaa vain osan
   alueesta), joten kaupungin sisäisten poissaolo on mitattu datasta
   (E2.3) eikä tästä laatasta.
2. **z6/40/17** (Bretagne): *Mont-Saint-Michel* ja *Nantes*, ei
   siirtoviivoja. **Carnacin kivirivit ei ole laatassa** — se on niitä
   kolmea, joilta puuttuu lukittu ankkuri, ja jää siksi eläväksi (E2.1).

Kumpikin laatta on kansiossa `docs/raportit/kuvat/poltto-ranska-20260918/`
(`koelaatta-z7-83-33.png`, `koelaatta-z6-40-17.png`) — **laattoja
itseään ei committoitu**, vain nämä kaksi luettua kuvaa.

**Musteen paikka mitattu laatasta:** Mont-Saint-Michelin lukittu
ankkuri (48,502711 N / −1,504295 E) osuu laatassa z6/40/17 kohtaan
(339,5 · 299,9) px, ja laatan piste on siinä. **Poltettu muste on
lukitussa ankkurissa.**

## E2.5 Vartio (uusi testi)

`tests/poltto-lukitut-ankkurit.test.mjs` — viisi väitettä, mitta ilman
selainta ja ilman laattoja: jokainen poltettava Ranskan nosto on TASAN
lukitussa ankkurissaan (`x`, `y`, `ankkuriX`, `ankkuriY`, ero 0 — ei
sietoa), lukitulta ei polteta siirtoviivaa, kaupungin sisäisiä on
suodattunut pois, ja luettelon tiiviste on merkin oma. **Koko sarja:
3600 pass, 0 fail.**

## E2.6 Pelin puoli: mitä uusi nostoversio vaatii (selvitetty, EI tehty)

Kysymys oli: *mitä manifestiin/luetteloon pitää kirjoittaa, ettei
nostotaso sammu.* Vastaus on luettu koodista, ja se on **kolme
tiedostoa, jotka on vaihdettava samassa julkaisussa**:

**1. `pyramidi.json` — tasokartan luettelo.** Generaattori kirjoittaa
kentän itse (todennettu koepoltosta, E2.4):

```json
"nostotaso": { "versio": "2026-09-18-fra", "nostot": { "<tunnus>": "<tiiviste>" } }
```

Ämpäriin se menee lipulla `-f vie_luettelo=true` (tai erillisellä
luettelojobilla). Tunnus→tiiviste-taulussa on **1612 riviä** ja siitä
puuttuvat nyt kaupungin sisäiset ja ankkurittomat (E2.3).

**2. Pallon oma sarja `laatat.json`.** Pallo EI lue pyramidin
tiivisteitä vaan oman sarjansa `nostotaso.nostot`-kenttää
(js/pallo.js `pallonNostoOnPoltettu`). `tools/tee-pallolaatat.mjs
--nostot` kopioi sen pyramidista ja kirjoittaa samalla
**`"nostot": "2026-09-18-fra"`** (rivi 786). Ilman tätä ajoa pallon
sarjassa lukee yhä vanha nostoversio.

**3. `js/pallo.js` — sarjan nimi.** Kansio on
`PALLO_LAATTAVERSIO`-`nostot`-`PALLO_LAATTATUNNISTE`, nyt
`2026-09-07a-nostot-f` (rivit 112, 142–143). Uusi nostosarja on uusi
kansio, eli **`PALLO_LAATTATUNNISTE` nousee `'f'` → `'g'`**.

**MIKSI KAIKKI KOLME SAMASSA JULKAISUSSA.**
`js/pallolaatat.js lepokerroksenKerrokset` (rivit 351–359) palauttaa
**null — eli EI KERROSTA LAINKAAN** heti kun
`pallonLuettelo.nostot !== pyramidi.nostotaso.versio`. Vahti on
ehdoton, eikä sitä voi ohittaa kytkimellä: jos pallon sarja jää
vanhaan ja pyramidiin viedään uusi nostoversio, **koko laattakerros
sammuu** ja pallo putoaa takaisin pohjalaattoihin.

**`?nostoversio=…`-KYTKINTÄ EI TEHTY, EIKÄ SITÄ KANNATA TEHDÄ.**
Kytkin ohittaisi juuri sen vahdin, joka estää sekatilan (osa merkeistä
laatassa, osa elävänä) — ja koska luettelo `nostotaso.nostot` ei ole
tasokohtainen, sekatila näkyisi kaksoiskuvina ja kadonneina merkkeinä.
Oikea järjestys on versionosto, joka on tässä tehtävänannossa
kielletty. **Tämä on siis Fablen päätös ja seuraavan julkaisun työ.**

**PLAYWRIGHT-MITTAA PELIN PUOLELTA EI AJETTU.** Se vaatisi valelun
sekä `pyramidi.json`:sta että pallon `laatat.json`:sta ja koelaattojen
tarjoilun route-välityksellä — eli juuri sen sekatilan rakentamisen,
jonka vahti on tehty estämään. Ketju on silti suljettu mittaamalla,
kolmessa osassa samasta taulusta:

1. **Elävä ankkuri = taulu** — erä 1, luku 3.4: 65/65, suurin ero
   4,17·10⁻⁷° (≈ 0,05 m) ja **sama luku 390 px:llä ja 1400 px:llä**.
2. **Poltettava merkki = taulu** — E2.3: ero **0,00** laudan yksikköä,
   9/9 (vartiona `tests/poltto-lukitut-ankkurit.test.mjs`).
3. **Laatan muste = taulu** — E2.4: Mont-Saint-Michelin piste laatassa
   z6/40/17 kohdassa (339,5 · 299,9) px, joka on ankkurin oma piste.

Elävä nimiö ja osumapinta ovat siis poltetun pisteen kohdalla ≈ 0,05 m
tarkkuudella kaikilla ruuduilla. **Silmämääräinen tarkistus pelissä on
silti erän 3 työ**, koska tuplapistettä ja nimiön väistöä ei voi mitata
datasta.

## E2.7 Mitä EI ehditty (erä 3)

Kolme asiaa jäi, ja kaikki kolme ovat Fablen päätöksen takana:

1. **Versionosto** (E2.6): `tools/tee-pallolaatat.mjs --nostot`,
   `PALLO_LAATTATUNNISTE` `'f'` → `'g'` ja `vie_luettelo=true` samassa
   julkaisussa. **Kielletty tässä tehtävänannossa, ei tehty.**
2. **Kolmen ankkurittoman noston** (`biskajanlahti`,
   `carnacin-kivirivit`, `chambord`) juurisyy — epäilys: aihenoston
   jäseniä, jolloin ne eivät ole `osumat()`-listalla omina riveinään.
   Ne jäävät nyt eläviksi eivätkä polta mitään, joten **laattaan ei
   tule väärää mustetta** — mutta ne eivät myöskään hyödy poltosta.
3. **Silmämääräinen tarkistus pelissä** (tuplapiste, nimiön väistö)
   uusilla laatoilla, kun versionosto on tehty.

## E2.8 Komennot (ÄLÄ aja — Fablen päätös)

Actions-työnkulku — **koko maailman nostotaso**, ks. E2.3:n varoitus:

```
gh workflow run generoi-pyramidi.yml \
  -f tasot=vain-nostotaso \
  -f versio=2026-09-07a \
  -f nostoversio=2026-09-18-fra \
  -f vie_luettelo=false
```

Ranskan rajattu paikkaus (jos Fable valitsee sen velasta huolimatta):

```
gh workflow run generoi-pyramidi.yml \
  -f tasot=paikkaus \
  -f versio=2026-09-07a \
  -f nostoversio=2026-09-18-fra \
  -f lahdeversio=2026-09-08a-nostot \
  -f alue=-5,41,10,52 \
  -f vie_luettelo=false
```

**Manifestin päivitysaskel** (vasta kun laatat ovat ämpärissä ja
koepoltto hyväksytty):

1. Aja luettelojobi tai sama työnkulku lipulla `-f vie_luettelo=true`
   — se kirjoittaa `pyramidi.json`:iin kentän `nostotaso` (`versio:
   '2026-09-18-fra'` ja `nostot: { tunnus → tiiviste }`).
2. Aja `tools/tee-pallolaatat.mjs --nostot` pallon Mercator-sarjalle
   samasta nostoversiosta — pallo lukee OMAN luettelonsa
   `nostotaso.nostot`-kenttää (js/pallo.js `pallonNostoOnPoltettu`),
   ei pyramidin.
3. Osoita `js/pallo.js`:n sarja uuteen versioon **samassa julkaisussa**:
   `js/pallolaatat.js lepokerroksenKerrokset` sammuttaa koko
   laattakerroksen, jos pallon sarja ja nostoversio eivät täsmää.
   Tämä on versionosto, eikä sitä tehty tässä erässä.

---

# Erä 3 — koko maailman nostotaso poltettu Macilla (18.9.2026 klo 10.50)

Opus-agentti, sama haara. Aikakatto 45 min. Ämpäriin **ei** viety
(Fable vie), Actions-työnkulkua **ei** ajettu, PR:ää **ei** avattu.
Laattoja ei committoitu; kaksi luettua laattaa on kuvina.

**Tiivistelmä yhdellä rivillä:** koko maailman nostotaso
`2026-09-18-nostot` on poltettu paikallisesti (1977 laattaa, 9,26 Mt,
91 s) Fablen päätöksen e mukaisesti, pelin puoli on valmis samassa
haarassa (pallon sarja **g**), ja matkalla löytyi **julkaisua uhkaava
vika luettelon kokoamisessa** — luku E3.3 on luettava ennen vientiä.

## E3.1 Poltto

```
PW_CHROMIUM="$HOME/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
node tools/generoi-laattapyramidi.mjs <kansio> \
  --nostotaso --nostoversio 2026-09-18-nostot \
  --versio 2026-09-07a --patina kevyt --tasot 5-7
```

`--versio 2026-09-07a` on ÄMPÄRIN NYKYINEN POHJAVERSIO (luettu
`julisteet/pyramidi/pyramidi.json`:sta; peli lukee pohjan polun
`js/laattapyramidi.js laattaUrl` → `<versio>/z…`). Nostolaatta asuu
oman versionsa alla: `<nostoversio>/nostot/z<taso>/<sarake>/<rivi>.webp`.

| | |
| --- | --- |
| laattoja | **1977** (z5 251 · z6 575 · z7 1151), 394 lohkoa à 4×4 |
| kokoa | **9,26 Mt** (keski z5 4,6 kt · z6 5,1 kt · z7 4,3 kt) |
| piirtoaika | 90,8 s (19,3 Mpx/s, 21,8 laattaa/s), kokonaisaika **91,4 s** |
| pikseleitä | 518,3 Mpx |
| luettelo | `pyramidi.json` 65 780 tavua, `nostotaso.versio` **2026-09-18-nostot**, tasot **[5,6,7]**, sääntö `v11-limitys` |
| nostoja luettelossa | **1612** (ämpärissä nyt 1609) |

Polttoketjun oma tilasto on sama kuin erässä 2 — ketju ei muuttunut:
1857 merkkiä 112 maasta, poltetaan 1612 · 2 maata estetty (täky) · 82
monen maan merkkiä eläväksi · 109 eläintäkyä · 88 merkkiä merkkiportin
taakse · **32 kaupungin sisäistä eläväksi** · **3 ilman lukittua
ankkuria eläväksi** (Fablen rajaus f: aihemerkin sisällä olevat jäävät
eläviksi).

**Nostotaulun muutos ämpärin luetteloon nähden** (tiiviste = merkin
tunniste, js/fokuskohteet.js `kohteenNostotiiviste`): **70 uutta**,
**67 poistunutta**, **198 tiiviste muuttunut**. Poistuneissa ovat mm.
kaupungin sisäiset (PAATOKSET 34); muuttuneet tiivisteet ovat lukitun
ankkurin ja uuden ladonnan tulos. Tämä taulu on se, jolla peli päättää
kumpi merkki vaikenee ja kumpi piirtyy elävänä.

**Patina mitattiin, koska ämpärin pohja on `kevyt` ja generaattorin
oletus on `taysi`.** Koko maailman ajo tehtiin molemmilla, ja tulos on
**1977/1977 laattaa tavulleen samat** (`diff -rq`): patina ei kosketa
läpinäkyvää nostotasoa, jolle ei piirretä paperia lainkaan. Fablelle
viedään silti `--patina kevyt` -ajo, koska luettelon `patina`-kenttä
kuvaa pohjaa. (Sivuhuomio samasta kokeesta: `--alue`-rajattu ajo antaa
z5:llä muutaman tavun eri laatan kuin koko maailman ajo — lohkon
reunan piirtoero, ei patina. Sillä ei ole tässä merkitystä, koska
Fablen päätös e oli koko maailman poltto.)

## E3.2 Read-tarkistus, kaksi laattaa

`docs/raportit/kuvat/poltto-ranska-20260918/` (webp → png, `sips`):

1. **`maailmapoltto-z7-83-33.png`** (Lillen seutu, z7): *Lille*,
   *Deltatyöt*, *Delftin linssit* — piste ja nimiö vierekkäin,
   **yhtään siirtoviivaa ei näy** (lukitulta nostolta viivaa ei
   polteta, erä 2 kohta 2), ei tuplapisteitä.
2. **`maailmapoltto-z6-40-17.png`** (Bretagne, z6):
   *Mont-Saint-Michel* (piste ~339 · 300 px eli sama kohta kuin erän 2
   mitassa = lukittu ankkuri) ja *Nantes*. **Carnacin kivirivit ei ole
   laatassa** — se on niitä kolmea aihemerkin sisällä olevaa, jotka
   jäävät eläviksi.
3. **Pariisin oma laatta z7/83/34 EI OLE OLEMASSA tässä poltossa.**
   Harvassa pyramidissa tyhjää laattaa ei kirjoiteta, joten kaupungin
   sisäisten poissaolo näkyy vahvimmassa muodossaan: Pariisin ruudussa
   ei ole yhtään mustepikseliä.

## E3.3 VIKA, JOKA ON LUETTAVA ENNEN LUETTELON VIENTIÄ

**Työnkulun luettelojobi kirjoittaisi ämpärin luettelon yli.**

`.github/workflows/generoi-pyramidi.yml` pohjustaa ajokansion ämpärin
`pyramidi.json`:lla juuri siksi, että luettelo TÄYDENTYISI eikä
korvautuisi — jobin oma kommentti luettelee, mitä muuten katoaisi.
**Mitattu 18.9.2026: pohjustus ei vaikuta mihinkään.**
`tools/generoi-laattapyramidi.mjs` kirjoittaa `--vain-luettelo`-haarassa
`teeLuettelo()`:n suoraan tiedostoon eikä kutsu `yhdistaLuettelo`a
lainkaan (`if (lippu('vain-luettelo'))`); yhdistäminen tapahtuu vasta
piirtoajon lopussa.

Koe paikallisesti: ämpärin luettelo kansioon, sitten luettelojobin oma
komento (`--tasot 0-7 --versio 2026-09-07a --nostoversio … --vain-luettelo`).
Tulos olisi viety ämpäriin, ja siitä olisivat kadonneet:

| kenttä | ämpärissä | luettelojobin tulos |
| --- | --- | --- |
| `rantataso` | 2026-09-07a-ranta | **null** |
| `varitasot` | **27 maata** | **null** |
| `viivataso` | 2026-09-08a-viivat | 2026-09-07a (ajopäivän oletus) |
| `tasot` | z0–z8 laatastoineen | z0–z7 ilman ämpärin laatastoja |
| `erat`, `korkeus`, `alue` | täydet | tyhjät tai puuttuvat |

Peli ei näkisi 404:ää eikä virhettä — rantaviiva ja 27 maan väritasot
vain katoaisivat kartalta. Sama hiljainen vika, josta
`docs/raportit/viesti-fable-laattapolku-20260914.md` varoittaa.

**Korjaus tähän julkaisuun (tehty):** uusi
`tools/yhdista-nostoluettelo.mjs` kokoaa vietävän luettelon pelin omalla
yhdistämissäännöllä (`tools/pyramidiluettelo.mjs yhdistaLuettelo`, ehto
`merkkitaso: true` = "tämä ajo ei polttanut yhtään pohjalaattaa").
Skripti kantaa `viivataso`n, `rantataso`n ja `patina`n ämpäristä
(nostoajon oma luettelo keksisi niille ajopäivän arvot — mitattu: se
olisi vaihtanut viivatason `2026-09-08a-viivat` → `2026-09-07a`, eli
viivakerros olisi osoittanut polkuun, jota ei ole ajettu) ja
**pysähtyy virheeseen, jos tulos eroaisi ämpäristä muualta kuin
`nostotaso`- ja `erat`-kentistä**. Ajettu tässä erässä:

```
nostotaso 2026-09-08a-nostot (1609 nostoa) → 2026-09-18-nostot (1612 nostoa), tasot 5,6,7
pohja 2026-09-07a · viivataso 2026-09-08a-viivat · rantataso 2026-09-07a-ranta
· väritasot 27 maata · tasot z0 z1 z2 z3 z4 z5 z6 z7 z8
```

**Korjaus itse `--vain-luettelo`-haaraan on Fablen päätös** (se on
jaettu polku, jota ajavat myös pohja- ja väriajot), eikä sitä tehty
tässä erässä.

**Toinen huomio Fablelle: z8.** Ämpärin luettelossa nostotason tasot
ovat [5,6,7,**8**] (z8:lla 2089 laattaa), mutta sekä työnkulun shardi
(`generoi-pyramidi.yml`: `"nimi":"nostotaso","tasot":"5-7"`) että
`tools/polta-paikallisesti.sh` polttavat nostotason **vain z5–z7**, ja
generaattorin oma kommentti sanoo saman ("TASOT VAIN z5–z7"). Tämä ajo
noudattaa sitä, ja seuraus on kirjattava: uuden luettelon jälkeen
**nostokerrosta ei ole syvimmällä laattatasolla z8**, toisin kuin nyt.
Jos z8 halutaan säilyttää, sama komento lipulla `--tasot 5-8` (~2100
laattaa lisää, arvio 5–8 min Macilla); kaikki muu tästä ohjeesta pätee
sellaisenaan.

## E3.4 Pelin puoli tehty samaan haaraan

| tiedosto | muutos |
| --- | --- |
| `js/pallo.js` | `PALLO_LAATTATUNNISTE` **'f' → 'g'** ja perustelu (kansio `2026-09-07a-nostot-g`) |
| `sw.js` | `LAATTAKANSIO` samaan kansioon (tahallinen kaksoiskappale, jota `tests/sw.test.mjs` vartioi) |
| `tests/pallo.test.mjs` | kolme vartiota uuteen kansioon |
| `tools/yhdista-nostoluettelo.mjs` | uusi, ks. E3.3 |

**Pallon `laatat.json`:n nostot-tiivisteitä EI VOI vielä ajaa.**
`tools/tee-pallolaatat.mjs` lukee sekä luettelon että lähdelaatat
**ämpäristä** (`JULKINEN_JUURI julisteet/pyramidi/pyramidi.json`, vakio
tiedostossa), joten ajo ennen vientiä kokoaisi pallon sarjan vanhasta
nostotasosta ja kirjaisi `nostot: "2026-09-08a-nostot"` — juuri sen
sekatilan, jonka versiovahti on tehty estämään. Pallon sarja poltetaan
siis vasta, kun nostolaatat ja luettelo ovat ämpärissä (järjestys
E3.5). Silloin `laatat.json` saa ajosta kentät `nostot:
"2026-09-18-nostot"` ja `nostotaso.nostot` = luettelon 1612 tiivistettä
(`pallonNostotaso`, `kirjoitaLuettelo`) — ne eivät ole käsin
kirjoitettavia.

**Tämän haaran koodi ei saa mennä mainiin ennen pallon sarjaa.**
Tunniste `g` osoittaa kansioon, jota ämpärissä ei vielä ole; yksin
julkaistuna pallo putoaisi z4-varatekstuuriin.

## E3.5 Vientikomennot Fablelle ja julkaisun tarkistuslista

Polkukaava on luettu `js/laattapyramidi.js`:stä (`laattaUrl`:
`pyramidiUrl('<nostoversio>/nostot/z<taso>/<sarake>/<rivi>.webp')`,
`pyramidiUrl` = `julisteet/pyramidi/`), ja polttokansion rakenne on
sama: `<kansio>/nostot/z5|z6|z7/<sarake>/<rivi>.webp`. **Nostoversio on
polussa ENNEN `nostot`-osaa**, ei sen jälkeen.

**1. Nostolaatat ämpäriin** (ikuinen välimuisti, osoite on uusi):

```
aws s3 cp <kansio>/nostot/ \
  "s3://$AMPARI/julisteet/pyramidi/2026-09-18-nostot/nostot/" \
  --recursive --endpoint-url "$PAATE" \
  --content-type image/webp \
  --cache-control 'public, max-age=31536000, immutable' --no-progress
```

Tarkista: `aws s3 ls "s3://$AMPARI/julisteet/pyramidi/2026-09-18-nostot/nostot/"
--recursive --endpoint-url "$PAATE" | wc -l` = **1977**.

**2. Luettelo** (lyhyt välimuisti — tämä on julkaisuhetki):

```
aws s3 cp "s3://$AMPARI/julisteet/pyramidi/pyramidi.json" ampari.json \
  --endpoint-url "$PAATE" --no-progress
node tools/yhdista-nostoluettelo.mjs \
  --ampari ampari.json --poltto <kansio>/pyramidi.json --ulos pyramidi.json
aws s3 cp pyramidi.json "s3://$AMPARI/julisteet/pyramidi/pyramidi.json" \
  --endpoint-url "$PAATE" --content-type application/json \
  --cache-control 'public, max-age=300' --no-progress
```

**ÄLÄ vie `<kansio>/pyramidi.json`:ia sellaisenaan** — se on
nostotasoajon oma luettelo, ks. E3.3.

**3. Pallon Mercator-sarja** (vasta kun 1 ja 2 ovat ämpärissä):

```
node tools/tee-pallolaatat.mjs --nostot --tunniste g --max 8 --ulos pallolaatat-ulos
```

— tai työnkulku `tee-pallolaatat` samoilla arvoilla. Sarja menee
kansioon `julisteet/pallo/laatat/2026-09-07a-nostot-g/`, ja sen
`laatat.json` saa kentän `nostot: 2026-09-18-nostot`.

**4. Asiakas mainiin:** tämän haaran `js/pallo.js` (tunniste g), `sw.js`
ja testit. Vaatii versionoston (ei ajettu tässä erässä).

### Tarkistuslista (järjestys on osa julkaisua)

1. `git fetch origin main`, versionumero vasta tässä kohtaa.
2. Nostolaatat ämpärissä (1977 kpl), **luetteloa ei vielä viety** —
   tässä tilassa peli näkyy pelaajalle ennallaan.
3. Luettelo viety `yhdista-nostoluettelo.mjs`:n tuloksena. **Tästä
   hetkestä pallon laattakerros on pimeänä**, kunnes kohta 4 ja 5 ovat
   valmiit (`js/pallolaatat.js lepokerroksenKerrokset` → null, kun
   pallon sarjan `nostot` ≠ `pyramidi.nostotaso.versio`). Tasokartta
   toimii normaalisti ja näyttää uuden nostotason heti.
4. Pallon sarja `2026-09-07a-nostot-g` ämpärissä.
5. Asiakas mainissa (tunniste g) → versiovahti päästää kerroksen.
6. Silmämääräinen tarkistus pelissä: Ranskaan saapuminen ja Pariisin
   lähizoomi 390 px:llä — elävä nimiö ja osumapinta poltetun pisteen
   kohdalla, ei tuplapistettä, ei irrallista siirtoviivaa.

Kohtien 3–5 väli kannattaa pitää lyhyenä (tai tehdä 4 valmiiksi ennen
3:a), koska siinä välissä pallo on sumea.

## E3.6 Mitä EI tehty

1. **Playwright-mittaa uusilla laatoilla ei ajettu.** Se vaatisi
   route-välityksen sekä nostolaatoille, manifestille ETTÄ pallon
   `laatat.json`:lle — eli juuri sen sekatilan rakentamisen, jonka
   versiovahti estää. Aika meni patinan varmistukseen ja luettelovian
   (E3.3) mittaamiseen; kumpikin arvioitiin tärkeämmäksi, koska
   ämpäriin viety väärä muste tai luettelon yli kirjoittaminen on
   pysyvä vahinko, kun taas silmämääräinen tarkistus on tarkistuslistan
   kohta 6. Ketju on mitattu erissä 1–2 kolmessa osassa (elävä ankkuri
   = taulu, poltettava merkki = taulu, laatan muste = taulu), ja tämän
   erän laatat on luettu kuvina (E3.2).
2. **Pallon `laatat.json`** — syy E3.4 (ämpäririippuvuus).
3. **`--vain-luettelo`-haaran korjaus** — syy E3.3 (jaettu polku,
   Fablen päätös).
4. **Versionosto** — kielletty tässä tehtävänannossa.
