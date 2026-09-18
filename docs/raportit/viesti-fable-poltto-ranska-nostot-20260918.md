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
