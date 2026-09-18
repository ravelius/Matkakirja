# Viesti Fablelle: merkkikerroksen koe ja mittaus (18.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-merkkikerros` (origin/mainin
päältä). Tehtävä: Raamattu KARTTAUUDISTUKSEN PAATOKSET 36 kohdat 1–5 —
laattapyramidi kahtena kerroksena, **mittaus ensin**.

**Lyhyt vastaus: ÄLÄ ota käyttöön toisena pintana. Kerrokset ovat jo
olemassa erillisinä laatastoina, ja peli yhdistää ne yhdeksi tekstuuriksi
laattaa kohden — juuri se on halvin tapa, ja mittaus vahvistaa sen.
PAATOKSET 36:n tavoite (merkit voi polttaa uudestaan ilman pohjan ajoa)
TOTEUTUU JO nyt, ilman toista pintaa.**

---

## 1. Selvitys: miten pyramidi annetaan pallolle nyt

**Ei yhtä koottua tekstuuria eikä yhtä laattaa per kerros, vaan yksi
mesh + yksi tekstuuri per LAATTA, johon kaikki kerrokset kompositoidaan.**

Ketju on `js/pallo.js` → `js/pallolaatat.js` `luoLaattakerros` (rivit
1131→, "erä E1"). Laatta kerrallaan:

1. `pyramidinKerrostasot(z)` (`js/laattapyramidi.js:2516`) palauttaa
   järjestyksessä **pohja → väri → ranta → viiva → nosto** — viisi
   erillistä laatastoa, kullakin oma versio ja oma polku ämpärissä
   (`<versio>/z…`, `<variversio>/…`, `<rantaversio>/ranta/z…`,
   `<viivaversio>/viivat/z…`, `<nostoversio>/nostot/z…`).
2. Peli hakee ne rinnakkain (`Promise.all`, `createImageBitmap`) ja
   piirtää `ctx.drawImage`illa **samalle 512²-kankaalle**.
3. Kankaasta tehdään **yksi** `new Texture(kangas)`, yksi
   `BufferGeometry` (laatan oma lat/lon-suorakaide) ja yksi `Mesh`
   säteellä `getGlobeRadius() × LEPOKERROS_KOROTUS` (= 1, täsmälleen
   pinnalla), järjestys `LAATTAKERROS_RENDER_ORDER_POHJA + z`.

Kankaan valinta on jo kertaalleen mitattu ja perusteltu koodissa
(7.9.2026): suora `new Texture(bittikartta)` ilman kangasta kallisti
`renderer.initTexture`in 3,0 → 5,1 ms (p50) ja pahimman viennin
6,7 → 64,2 ms, koska three.js:n `flipY` kääntää bittikartan
keskusmuistissa mutta kankaan yhdellä GPU-kopiolla.

**Missä merkit piirtyvät nyt:**

| merkki | missä |
| --- | --- |
| poltetut nostot | nostotason laatoissa (alfa-webp), kompositoituna pohjalaattaan |
| reittiverkko ja rajat | viivatason laatoissa, samoin |
| rantaviivat | rantatason laatoissa, samoin |
| kohdemaan väri | väritason laatoissa, samoin (+ tasoitus-"kerma" pelin puolella) |
| **kaupunkien nimet** | **EI laatoissa** — pelin elävä ladonta ruutuavaruudessa (`js/karttanimet.js`), CSS2D; luettelon kenttä `nimiot: false` kertoo tämän pelille |
| valittu reitti, askelhelmet, lento, nappula, kohteet | elävinä vektoreina / elementteinä |

Tämä vastaa PAATOKSET 36:n kohtaa 4 jo sellaisenaan.

**Tärkein havainto:** kohdan 2 päähyöty — *"voidaan polttaa uudestaan
ilman pohjan ajoa"* — **on jo olemassa**. Nosto- ja viivatasolla on oma
versio-osa polussa, ja koodin oma perustelu sanoo sen suoraan: *"nostojen
uusintapoltto ei koske pohjan ikuista välimuistia"*. Pohja on jo ilman
nostoja ja viivoja; ne ovat jo erillisiä läpinäkyviä laatastoja. Ainoa
asia, joka PAATOKSET 36:ssa olisi aidosti uutta, on **kaupunkien nimien
poltto** — ja se on eri kysymys kuin kerrosten määrä (luku 5).

---

## 2. Laattojen koot: yhdistetty vs erilliset (Ranska, oikeat laatat)

Mitattu ämpäristä (`media.matkakirja.app/julisteet/pyramidi/`) 18.9.2026,
Ranskan ruutu −5,41 … 10,52, tasot z5–z7. Uutta laatastoa EI ajettu —
nämä ovat tuotannon omat laatat.

| z | kerros | laattoja ruudussa | olemassa | yhteensä kt | ka kt |
| --- | --- | --- | --- | --- | --- |
| 5 | pohja | 6 | 6 | 209 | 34,8 |
| 5 | ranta | 6 | 6 | 123 | 20,5 |
| 5 | viiva | 6 | 6 | 105 | 17,4 |
| 5 | nosto | 6 | 6 | 59 | 9,9 |
| 6 | pohja | 20 | 20 | 681 | 34,0 |
| 6 | ranta | 20 | 17 | 241 | 14,2 |
| 6 | viiva | 20 | 18 | 234 | 13,0 |
| 6 | nosto | 20 | 18 | 155 | 8,6 |
| 7 | pohja | 56 | 56 | 1 924 | 34,4 |
| 7 | ranta | 56 | 30 | 373 | 12,4 |
| 7 | viiva | 56 | 34 | 403 | 11,9 |
| 7 | nosto | 56 | 27 | 158 | 5,8 |

Yhteensä z5–z7 Ranskan ruudussa: **pohja 2 814 kt**, merkit
(viiva + nosto) **1 114 kt**, ranta 737 kt.

**Siirron kannalta erillisyys maksaa jo nyt 40 % pohjan päälle** — ja se
on jo maksettu, koska kerrokset ovat erillisiä. Yhdistetty poltto
(kaikki yhteen webpiin) olisi verkossa halvempi mutta veisi
uusintapoltto-edun. Nykyinen valinta on siis oikea; toinen PINTA ei
muuta siirtoa lainkaan, koska laatat ovat samat — se muuttaa vain
**GPU-muistia ja piirtoa** (luku 3).

Huomaa myös: nosto- ja viivataso ovat **harvoja**. z7:llä 56 laatan
ruudussa nostolaattoja on vain 27 ja viivalaattoja 34. Yhdistettynä ne
eivät maksa mitään ylimääräistä; omana pintana jokainen niistä on oma
mesh ja oma 512²-tekstuuri.

---

## 3. Mittaus: mitä toinen pinta maksaa

Kytkin `?merkkikerros=1` toteutettu tähän haaraan (oletus **pois**,
ei muisteta laitteelle). Päällä ollessaan `js/pallo.js` luo TOISEN
`luoLaattakerros`-ilmentymän, joka lataa vain nosto- ja viivatason
laatat säteelle 1,0015 omalla piirtojärjestyksellään. Pohja jätettiin
kokeessa ennalleen (merkit siis kahtena) — mitattava asia on
**kustannus**, ei ulkoasu.

Mittari: `tools/savukkeet/mittaa-merkkikerros.mjs`. Kotelo 390 × 844
dpr 3, ämpäri Noden fetchin kautta (CORS), service worker estetty.
Yksi ajo per selain per tila. Ranska 46,5° N 2,5° E; saapumisnäkymä
altitude 0,42, lähizoomi 0,12. Kehysnopeus: 5 s:n panorointi
kehysaskelin (kamera siirtyy joka piirretyllä kehyksellä sen verran kuin
60 Hz:n laitteella), fps = 1000 / kehysvälin mediaani.

### Chromium (headless, 390 × 844 dpr 3)

| näkymä | kytkin | tekstuureja | geometrioita | piirtokutsuja | JS-kasa Mt | pohjan laattoja / Mt | merkkien laattoja / Mt | fps | kehys p50 ms | kehys p95 ms | 1. kehys ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| saapuminen | pois | 55 | 67 | 54 | 227,9 | 39 / 44,0 | — | 6,1 | 164,9 | 191,3 | 6,4 |
| saapuminen | **päällä** | **80** | 85 | 71 | **242,2** | 39 / 44,0 | **39 / 37,3** | 5,8 | 173,8 | 200,1 | 6,6 |
| lähizoomi | pois | 56 | 80 | 42 | 227,9 | 44 / 40,0 | — | 8,9 | 112,6 | 244,6 | 13,1 |
| lähizoomi | **päällä** | **85** | 98 | 62 | **242,2** | 44 / 53,3 | **44 / 37,3** | 8,1 | 122,9 | 151,6 | 16,4 |

### WebKit (390 × 844 dpr 3) — tämä on se mittaus, jota PAATOKSET 36 pyysi

| näkymä | kytkin | tekstuureja | geometrioita | piirtokutsuja | pohjan laattoja / Mt | merkkien laattoja / Mt | fps | kehys p50 ms | kehys p95 ms | 1. kehys ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| saapuminen | pois | 473 | 473 | 402 | 39 / 52,0 | — | **58,8** | 17 | 18 | 25 |
| saapuminen | **päällä** | 504 | 483 | 415 | 39 / 52,0 | **39 / 49,3** | **58,8** | 17 | 19 | 23 |
| lähizoomi | pois | 506 | 505 | 380 | 66 / 88,0 | — | **58,8** | 17 | 19 | 13 |
| lähizoomi | **päällä** | 507 | 494 | 385 | 44 / 58,7 | **44 / 37,3** | **58,8** | 17 | 19 | 16 |

WebKitissä ei ole `performance.memory`a, joten muisti luetaan kummankin
kerroksen omasta kirjanpidosta (laatta 512² × 4 B, mipmapit +1/3) ja
kirjaston `renderer.info.memory`sta. WebKit piirtää Macilla oikealla
näytönohjaimella, joten sen kehysluvut ovat aitoja; se pitää myös
kirjastonsa omat laattatekstuurit kirjanpidossa, mistä korkeampi
tekstuurimäärä johtuu.

Huomaa WebKitin lähizoomirivi: pohjan laattamäärä on kytkin PÄÄLLÄ
pienempi (44) kuin pois (66). Se ei ole kokeen ansiota vaan kerroksen
oman LRU-kiintiön ja latausajoituksen vaihtelua yhden ajon tarkkuudella
— tehtävänanto salli yhden ajon per selain per tila, joten pohjan
laattamäärää ei pidä lukea vertailulukuna. **Merkkipinnan oma luku
(37,3…49,3 Mt) on se, mitä koe lisää**, ja se on molemmissa selaimissa
samaa suuruusluokkaa.

**KEHYSNOPEUS EI PUDONNUT.** WebKitillä 58,8 fps ja kehys p50 17 ms
kaikissa neljässä ajossa, kytkin päällä tai pois — PAATOKSET 36:n
ehto "fps ei laske alle 50" **täyttyy**. Kehys p95 nousi 18 → 19 ms
saapumisessa, eli yhden millisekunnin.

Chromiumin 6–9 fps on kontin ohjelmistorasterointi eikä laitteen
nopeus; sieltä vertailukelpoisia ovat vain suhde (−5 % ja −9 %
kehysaikaa) ja JS-kasa, jota WebKit ei kerro. Kaksi selainta ovat siis
eri mittareita samaan asiaan, ja ne sanovat saman: **kehykselle tämä on
halpa, muistille ei.**

### Mitä luvut sanovat

1. **Kehysnopeus kestää.** WebKitillä (oikea näytönohjain) 58,8 fps
   molemmissa tiloissa, p95 +1 ms. PAATOKSET 36:n fps-ehto täyttyy.
2. **Tekstuureja +25…+31 kpl** (Chromium 55 → 80 ja 56 → 85, WebKit
   473 → 504 ja 506 → 507). Karttapallon oma vartija
   (`docs/moduulit/karttapallo.md` luku 6) vaatii **≤ 120 tekstuuria**
   lepotilassa pelin omista laatoista; Chromiumin luvuissa varaa jää,
   mutta se kutistuu 64:stä 35:een — ja Ranska on helppo ruutu.
   Tiheämmässä Euroopassa nosto- ja viivalaattoja on enemmän kuin
   27–34 per 56.
3. **GPU-muistia +37,3…+49,3 Mt** pelkästä merkkipinnasta. Tämä on kokeen
   tärkein luku ja syy suositukseen: **läpinäkyvä laatta maksaa
   täsmälleen saman kuin täysi maastolaatta.** 512² × 4 B × 4/3
   (mipmapit) = 1,4 Mt riippumatta siitä, onko laatassa vuoristo vai
   kaksi ohutta viivaa. Yhdistettynä sama sisältö maksaa **0 Mt**
   ylimääräistä, koska se piirtyy pohjan kankaalle.
4. **JS-kasa +14,3 Mt** (Chromium 227,9 → 242,2). Kankaat, bittikartat
   ja verkon puskurit toisen kerran.
5. **Piirtokutsuja +5…+20 ja geometrioita +10…+18** — jokainen
   merkkilaatta on oma mesh. Läpinäkyvänä se on lisäksi
   `transparent: true`, eli piirretään järjestyksessä ilman
   syvyyskarsintaa.
6. **Ensimmäinen kehys ei muuttunut merkitsevästi** (WebKit 25 → 23 ja
   13 → 16 ms; ero on mittauskohinaa yhden ajon tarkkuudella).

---

## 4. Suositus

**EI KÄYTTÖÖN toisena pintana.** Perustelut järjestyksessä:

1. **Hyöty on jo saatu ilman sitä.** Kohdan 2 päähyöty — merkkien
   uusintapoltto ilman pohjan ajoa — toteutuu jo nosto- ja viivatason
   omilla versiopoluilla. Toinen PINTA ei lisää siihen mitään; se on
   vain eri tapa NÄYTTÄÄ samat laatat.
2. **Hinta on täysi tekstuurihinta.** +37…+49 Mt GPU-muistia ja +14 Mt
   kasaa Ranskan yhdellä ruudulla, siitä ettei tarvitse ajaa yhtä
   `drawImage`ia. Se on huono vaihtokauppa nimenomaan iPhonella, joka
   on koko luvun 6 riskilistan kärki. **Kehysnopeus ei ole este** —
   este on muisti, ja juuri sitä luku 6 varoi.
3. **Kompositointi on jo mitattu parhaaksi.** Kangas + drawImage
   valittiin 7.9.2026 mittauksella; toinen pinta kiertää sen ja
   kaksinkertaistaa juuri sen työn, joka mittauksessa oli halvin.

**Ehdollinen poikkeus, jos toista pintaa vielä halutaan:** se kannattaa
vain, jos merkit pitää voida **piilottaa ja näyttää kehyksen tarkkuudella
ilman laattojen uudelleenlatausta** (esim. "merkit pois" -tila
kartalla). Silloin hinta on tiedossa ja kehysbudjetti kestää sen:
−25…−31 tekstuurin varaa 120:n katosta ja 37…49 Mt GPU-muistia,
fps ennallaan. Ehto: sitä ei oteta käyttöön ennen
kuin sama mittaus on ajettu **oikealla iPhonella** (kontin luvut eivät
kerro WKWebView'n sisältöprosessin katosta mitään — luku 6, riski 1).

Kytkin jää haaraan mittarina. Se on oletuksena pois, sitä ei muisteta
laitteelle, eikä `__merkkikerrosKoe`-kahvaa synny ilman osoitteen
parametria — tavallinen peli on bitilleen ennallaan.

---

## 5. Mitä kaupunkien nimien poltto vaatisi ladonnalta

Tämä on PAATOKSET 36:n kohdan 2 aidosti uusi osa, ja se **estyy eri
syystä kuin kerrosten määrä**.

Nimiä ei jätetty polttamatta siksi, että niiden paikka olisi ollut
auki. Omistajan päätös 30.8.2026 (`js/karttanimet.js` rivit 12–20,
`tools/generoi-laattapyramidi.mjs` rivit 2660–2675) on **pikselitiheys**:

> Asiakas valitsee tason luvusta `skaala × dpr`. Poltettu 10,5 pikselin
> nimi on työpöydällä (dpr 1) 10,5 CSS-pikseliä ja iPadilla (dpr 3) 3,5.

Ja koodin oma jatko: laatta ei voi tietää katsojan pikselitiheyttä
zoomista, koska **sama taso valitaan sekä "dpr 3 ja kaukana" että
"dpr 1 ja kolme kertaa lähempänä"**. Yksi luku laatassa ei voi olla
oikein molemmissa. Sama asia on kirjattu karttapallo.md:n avoimeksi
kysymykseksi 1: *tekstuurissa ne olisivat iPhonella kolmasosan kokoisia*.

**PAATOKSET 34 kohta 13 lukitsi nimien PAIKAN, ei niiden KOKOA.** Paikan
lukitseminen poistaa toisen esteen (törmäysladonta ajonaikana), muttei
tätä. Poltto vaatisi siis ladonnalta yhden kahdesta:

- **(a) dpr-kohtaiset nimilaatastot.** Nimet omaan laatastoonsa, joka
  ajetaan 2–3 kertaa (dpr 1, 2, 3), ja peli valitsee oman. Hinta:
  laatasto ×3, ja jokainen nimilaatta on oma 512²-tekstuuri — eli
  täsmälleen luvun 3 kustannus, uudestaan. Tämä on kallein vaihtoehto.
- **(b) nimien koko irrotetaan tasosta.** Kirjasinkoko poltetaan
  laatan pikseleissä niin, että `koko × dpr / skaala` on vakio CSS-
  pikseleinä — mutta juuri tämä on mahdotonta, koska skaala ja dpr
  eivät ole laatassa tiedossa erikseen, vain niiden tulona. Tämä on se
  este, joka pitää ratkaista ennen kuin polttoa kannattaa edes yrittää.

**Suositus nimiin: pidetään elävä ladonta.** Se on ainoa tapa saada
dpr-tarkat, ei-limittyvät nimet, ja `js/karttanimet.js` tekee sen jo
ruutuavaruudessa 40 nimen katolla. Jos nimien elävä ladonta osoittautuu
kehysmittarissa kalliiksi, halvempi korjaus on laskea kattoa tai
harventaa ladontaa — ei siirtää nimiä tekstuuriin.

---

## Mitä tässä haarassa on

| tiedosto | muutos |
| --- | --- |
| `js/ui-apurit.js` | `merkkikerrosPaalla`, `merkkikerrosMitataan` (kytkin, oletus pois) |
| `js/pallolaatat.js` | `luoLaattakerros`-valinta `merkkikerros`: kerrostasot vain nosto + viiva, säde `MERKKIKERROS_KOROTUS`, oma piirtojärjestys |
| `js/pallo.js` | toinen kerrosilmentymä kytkimen takana, päivitys samasta piirtokoukusta, purku samassa kutsussa, mittarin kahva |
| `tools/savukkeet/mittaa-merkkikerros.mjs` | uusi mittari (Chromium + WebKit) |
| `tests/pallolaatat.test.mjs`, `tests/pallolepokerros.test.mjs` | vartijat sallivat kokeen valinnaisen rivin; oletuspolku yhä vartioitu |

**`tools/generoi-laattapyramidi.mjs`:ään ei koskettu.** Uutta
`--kerros merkit` -tilaa ei tehty, koska nostotaso (`--nostotaso`) ja
viivataso (`--viivataso`) ovat jo täsmälleen se: omalla versiollaan
poltettavia läpinäkyviä alfa-webp-laatastoja. Uusi tila olisi ollut
kolmas nimi samalle asialle. Raamattua ja `sarjat.json`ia ei koskettu,
pohjapyramidin ulkoasua ei muutettu, eikä `js/linssit/`-,
`js/fokusvirta.js`- tai kaupunkiliuska-koodiin koskettu.

`node --test tests/*.test.mjs` läpi. Pelikoodi muuttui kytkimen takana,
joten versionosto tarvitaan julkaisussa (en ajanut `uusi-versio.mjs`).
Uutta laatastoa ei ajettu eikä ämpäriin viety mitään.
