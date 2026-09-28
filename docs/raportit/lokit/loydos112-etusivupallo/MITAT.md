# Löydös 112 — etusivun pallo, kone ja punainen viiva: tarkat mitat

Kerätty 2026-09-25 WEB ON MALLI -linjauksella Natiiviseppää varten.
Isoisän valokuvat (etusivupallo-reittikuva) on JÄTETTY POIS tästä
mittauksesta tilauksen mukaisesti — ne käsitellään omana aiheenaan
tarvittaessa.

Lähteet (repo `/Users/Shared/Claude/Matkakirja-pelikoodari`,
`origin/main`, sama sisältö kuin nykyisessä työhaarassa
`pelikoodari-tyo-20260923` näiden kolmen tiedoston osalta — tarkistettu
`git diff origin/main` ei näytä muutoksia js/etusivupallo.js,
tools/tee-etusivupallo.mjs eikä css/styles.css:n etusivupallo-osioon):

- `js/etusivupallo.js` (1410 riviä)
- `tools/tee-etusivupallo.mjs` (poltto-ohjelma)
- `css/styles.css` rivit 6620–6820 (`.etusivupallo*`-säännöt)
- ämpärin luettelo: `https://media.matkakirja.app/julisteet/etusivu/2026-09-07a/etusivu.json`
  (tallennettu tähän kansioon: `etusivu.json`)
- omat laskelmat (Node-skriptit, tulokset alla): reitin jaksot/nopeudet
  ja `pallonSovitus`-mitat kahdelle ruudulle
- Playwright-mittaukset oikeasta https://matkakirja.app/ -sivusta
  (headless Chromium, `/opt/pw-browsers/chromium`, `NODE_USE_ENV_PROXY=1`)

`PEILI_JUURI` = `js/media.js:51` (`R2_JUURI = 'https://media.matkakirja.app/'`),
`js/media.js:52`. Ämpäripolku kootaan `js/etusivupallo.js:187-189`
(`ETUSIVUPALLO_VERSIO = '2026-09-07a'`).

---

## 1. Reitti (kaupungit järjestyksessä, koordinaatit)

Lähde: `js/etusivupallo.js:213-216` (`ETUSIVUN_REITTI`, kaupunkitunnukset)
ja ämpärin luettelo `etusivu.json` → `reitti` (todelliset lat/lon-asteet,
pituusaste JATKUVANA — ks. `js/etusivupallo.js:317-344` `reitinPisteet`).

| # | Tunnus | Nimi | lat | lon (jatkuva) |
|---|--------|------|-----|-----|
| 1 | lontoo | Lontoo | 51.50509 | −0.115 |
| 2 | pariisi | Pariisi | 48.8451 | 2.333 |
| 3 | kairo | Kairo | 29.99996 | 31.226 |
| 4 | mumbai | Mumbai | 19.10125 | 72.899 |
| 5 | kolkata | Kolkata | 22.60107 | 88.400 |
| 6 | singapore | Singapore | 1.79962 | 103.601 |
| 7 | hongkong | Hongkong | 22.80061 | 113.999 |
| 8 | tokio | Tokio | 35.70035 | 139.700 |
| 9 | sanfrancisco | San Francisco | 37.90002 | 237.800 |
| 10 | newyork | New York | 40.89944 | 285.800 |
| 11 | lontoo | Lontoo (paluu) | 51.50509 | 359.885 |

Lontoo on listassa kahdesti (lähtö ja paluu) — juuri se tekee
kierroksesta tasan 360° (`js/etusivupallo.js:203-219`, `KIERROKSEN_ASTEET = 360`).
Reitti kulkee itään: Länsi-Eurooppa → Suez → Intia → Kaakkois-Aasia →
Itä-Aasia → Tyynimeri → Pohjois-Amerikka → Atlantti → takaisin Lontooseen.

## 2. Ajoitus: jaksot, nopeus, kokonaiskesto

Kaava: `js/etusivupallo.js:243-244` — `JAKSON_POHJA_S = 1.0` (pohja-aika
per jakso), `JAKSON_ASTE_S = 0.115` (s / kaariaste). Jakson kesto =
`JAKSON_POHJA_S + matka(°) × JAKSON_ASTE_S` (`js/etusivupallo.js:353-370`
`reitinJaksot`). Matka lasketaan isoympyräetäisyytenä (`kaarietaisyys`,
`js/etusivupallo.js:285-289`). Lopuksi Lontoon PYSÄHDYS
`LOPPU_PITO_S = 2.6` s (`js/etusivupallo.js:251`) ilman matkaa, jonka
aikana punainen viiva sulkee ympyrän; sen jälkeen SVG-kerros (viiva +
kone, EI video) häivytetään `HAIVYTYS_S = 1.1` s aikana
(`js/etusivupallo.js:253`).

Lasketut jaksot (oma Node-laskelma isoympyräkaavalla `etusivu.json`:n
koordinaateista, sama kaava kuin `js/etusivupallo.js:285-312`):

| Jakso | Matka (°) | Kesto (s) | Alkaa (s) | Nopeus matkan aikana (°/s) |
|---|---|---|---|---|
| Lontoo → Pariisi | 3.09 | 1.355 | 0.000 | 2.28 |
| Pariisi → Kairo | 28.90 | 4.324 | 1.355 | 6.68 |
| Kairo → Mumbai | 39.21 | 5.509 | 5.679 | 7.12 |
| Mumbai → Kolkata | 14.89 | 2.713 | 11.187 | 5.49 |
| Kolkata → Singapore | 25.51 | 3.933 | 13.900 | 6.49 |
| Singapore → Hongkong | 23.30 | 3.680 | 17.833 | 6.33 |
| Hongkong → Tokio | 25.75 | 3.961 | 21.513 | 6.50 |
| Tokio → San Francisco | 74.44 | 9.561 | 25.474 | 7.79 |
| San Francisco → New York | 36.75 | 5.226 | 35.035 | 7.03 |
| New York → Lontoo | 50.10 | 6.762 | 40.261 | 7.41 |
| **Lontoon pysähdys (pito)** | 0 | **2.6** | 47.023 | 0 (kone paikallaan) |

Kokonaiskesto (laskettu) ≈ **49.623 s**, täsmää ämpärin luetteloon:
`etusivu.json` → `"kesto": 49.6228`. Keskinopeus matkan aikana
(322°/47.02 s) ≈ **6.85 °/s**; koko kierros mukaan lukien pysähdys
(360°/49.62 s) ≈ **7.25 °/s** (nimellinen, ei tasainen — kone hidastaa/
kiihdyttää joka jaksolla `JAKSON_POHJA_S`:n vaikutuksesta ja pysähtyy
kokonaan lopussa).

**Julisteen (poster-kuvan) hetki**: `tools/tee-etusivupallo.mjs:200`
`JULISTE_AIKA = reitti.jaksot[5]?.alku` = jakso 5 (Singapore→Hongkong)
alku = **17.833 s** — täsmää `etusivu.json` → `"julisteAika": 17.833`.

**Video**: `etusivu.json` → `"fps": 14.993122`, `"kehyksia": 744` →
kehyksen kesto 1/14.993 ≈ **0.0667 s**. `saumaton: true` — video looppaa
ilman häivytystä poltossa (`tools/tee-etusivupallo.mjs:20-33`); vain
viiva+kone häivytetään DOM:ssa kierroksen saumassa.

## 3. Kone: koko, muoto, väri, suunta

Lähde: `js/etusivupallo.js:930-933` ja `css/styles.css:6720-6725`.

- **SVG-polku** (`KONEEN_POLKU`, `js/etusivupallo.js:930-931`):
  ```
  M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z
  M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z
  ```
  Kaksi osaa: runko+siivet ("nuoli") ja pieni häntäsiipi.
  Mitattu bounding box (Playwright `getBBox()`): **x −15…14 (29 yks.), y −9…9 (18 yks.)**
  videon pikseliyksiköissä (SVG-viewBox on `0 0 1200 1200`, sama kuin
  `mitat.leveys × mitat.korkeus`).
- **Skaala**: `KONEEN_SKAALA = 1.15` (`js/etusivupallo.js:933`), lisäksi
  jaettuna `lisaysNyt`-kertoimella (pallon ylizoomaus), joten koneen
  todellinen näyttökoko pysyy VAKIONA suhteessa `cover`-skaalaan
  (`js/etusivupallo.js:1275-1277`, transform `scale(KONEEN_SKAALA / lisaysNyt)`).
- **Väri**: runko `fill: #2e2114; stroke: #2e2114; stroke-width: 1.4`
  (tumma ruskeanmusta, sama väri täytöllä ja ääriviivalla) —
  `css/styles.css:6720-6725`.
- **Suunta**: SVG `rotate(kulma)` laskettu koneen liikesuunnasta
  (`atan2`, `js/etusivupallo.js:1265-1277`); nokka osoittaa aina
  lentosuuntaan, kääntyy pehmeästi.
- **Koneen ylin sallittu kohta**: `KONEEN_MARGINAALI = 34` kerroksen
  pikseliä (`js/etusivupallo.js:552`), kommentti arvioi koneen piirron
  ruudulla ~60×47 px:ksi (`js/etusivupallo.js:549-551`) — tämä on
  ruutukokoinen arvio, ei videon SVG-yksikkö.

**Mitattu (Playwright, oikea sivu, koneen `<g>`-elementin bounding box
ruudulla, sisältää kiertokulman vaikutuksen laatikkoon):**

| Ruutu | koneG bbox (CSS px) | Fyysiset px (× dpr) | SVG transform-esimerkki |
|---|---|---|---|
| iPhone 393×852 @3x | 25.6 × 23.7 | ~76.8 × 71.1 | `translate(586.8 316.8) rotate(35.6) scale(0.961)` |
| iPad 834×1194 @2x | 36.5 × 34.1 | ~73.0 × 68.2 | `translate(593.6 325.7) rotate(36.8) scale(0.863)` |

(bbox on isompi kuin suora 29×18-koon skaalaus, koska kone on
diagonaalissa kulmassa — laatikko mittaa kiertyneen muodon reunat.
Lähde: `mitatut-dom-arvot.json` tässä kansiossa, kentät
`koneGBBoxRuudulla` ja `koneTransform`.)

## 4. Punainen viiva

Lähde: `css/styles.css:6707-6718` ja `js/etusivupallo.js:1146,1165` (leveyden jako).

- **Väri**: `stroke: #c2452f` → mitattu `rgb(194, 69, 47)` (tiilenpunainen/
  ruostepunainen).
- **Peittävyys**: `opacity: 0.92` (koko SVG-kerros, `.etusivupallo-viiva`),
  lisäksi koko `.etusivupallo-reitti`-kerros häivytetään
  kierroksen saumassa `HAIVYTYS_S`:n ajan.
- **Leveys**: perusarvo `VIIVAN_LEVEYS = 11` (videon pikseliä,
  `js/etusivupallo.js:1146`), jaettuna `lisaysNyt`-zoomauskertoimella
  joka kehyksellä (`js/etusivupallo.js:1165`) — pysyy siis VAKIOKOKOISENA
  ruudulla riippumatta pallon ylizoomauksesta.
  - Mitattu ruudulla: **9.2 px (iPhone)**, **8.26 px (iPad)** — CSS-pikseliä
    (attribuutti `stroke-width`, `mitatut-dom-arvot.json`).
- **Muoto**: yhtenäinen viiva (ei katkoviivaa, ei `stroke-dasharray`-
  määrittelyä), `fill: none`.
- **Päät ja kulmat**: `stroke-linecap: round; stroke-linejoin: round`
  (pyöreät päät ja nivelet).
- **Kasvu/häviäminen**: viiva PIIRRETÄÄN uudelleen joka kehyksellä
  `jaljenPisteet`-funktion (`js/etusivupallo.js:645-659`) palauttamista
  näytepisteistä isoympyrää pitkin (~`JALJEN_ASKEL_ASTE = 1.5°` välein,
  `js/etusivupallo.js:255`) — jälki kasvaa koneen mukana lähtöpisteestä
  nykyhetkeen. Kun kone on pallon näkymättömällä puolella, viiva
  katkeaa (`M`-komento, `irti`-lippu, `js/etusivupallo.js:1256-1263`).
  Lontoon pysähdyksessä viiva sulkee ympyrän (alku = loppu); sitten koko
  SVG-kerros häivytetään `HAIVYTYS_S` (1.1 s) ja piirto alkaa taas
  tyhjästä loopin alussa.

## 5. Pallo: pyöriminen, kamera, video, sovitus ruudulle

### Poltto (miten video on tehty)

Lähde: `tools/tee-etusivupallo.mjs:94-123` (oletusarvot) ja
`js/etusivupallo.js:181-186` (tuotantoversion 2026-09-07a parametrit,
kommenttina); todelliset arvot vahvistettu ämpärin `etusivu.json`:sta.

| Parametri | Arvo (tuotanto, 2026-09-07a) | Lähde |
|---|---|---|
| fps | 14.993122 (murtoluku = kehykset/kesto) | `etusivu.json` |
| kehyksiä | 744 | `etusivu.json` |
| kesto (yksi silmukka) | 49.6228 s | `etusivu.json` |
| laattataso (`--taso`) | 6 | `etusivu.json` `laattataso`; oletus koodissa 5 (`tools/tee-etusivupallo.mjs:119`) |
| lava (renderöity kangas) | 1400 px | `etusivu.json` `mitat.lava`; oletus 900 (`tools/tee-etusivupallo.mjs:116`) |
| kuva (video-frame, rajattu lavan keskeltä) | 1200 × 1200 px | `etusivu.json` `mitat.leveys/korkeus`; oletus 800 (`tools/tee-etusivupallo.mjs:117`) |
| sumennus (CSS blur, poltettu videoon) | 6 | `etusivu.json` `sumennus`; oletus 6 (`tools/tee-etusivupallo.mjs:118`) |
| fov (pystykulma) | 50° | `etusivu.json` `mitat.fov` |
| paperitausta (rajauksen alla) | `#efdcb4` | oletus `tools/tee-etusivupallo.mjs:123` |
| saumaton looppi | kyllä (360° tasan) | `etusivu.json` `saumaton: true` |

### Kamera

Lähde: `js/etusivupallo.js:227-236` (`ETUSIVUN_KAMERA`), vahvistettu
`etusivu.json` → `kamera`-kentästä (sama arvot):

| Kenttä | Arvo | Selitys |
|---|---|---|
| korkeus | 1.55 (pallon säteinä) | kameran etäisyys pallon keskipisteestä = 1 + 1.55 = 2.55 säteen päässä |
| fov | 50° | pystykulma (three.js/Globe.gl) |
| latKerroin | 0.62 | kameran leveysaste = kerroin × koneen silotettu leveysaste |
| latMin / latMax | 2° / 38° | kameran kallistus puristetaan tälle välille |
| silotusS | 3.4 s | liukuva keskiarvo (9 näytettä ±3.4 s) koneen paikasta kameraa varten, `js/etusivupallo.js:411-426` |

Kamera SEURAA konetta silotettuna (ei suoraan), joten pallo pyörii
tasaisesti eikä nykäise jokaisen kaupungin kohdalla.

### Pallon pinnan projektio ja kiekon koko

Lähde: `js/etusivupallo.js:440-453` (`pallonPiste`, perspektiiviprojektio)
ja `js/etusivupallo.js:528-535` (`kiekonSade`).

- Pallon näkyvän kiekon säde (video-px, laskettu kaavalla D=1+korkeus,
  f=(lava/2)/tan(fov/2)): **≈ 639.9 px** (lava 1400, fov 50°, D 2.55).
- Kiekon halkaisija ≈ 1280 px eli **1.07 × videon sivu** (1200 px) —
  tästä syystä pelkkä `object-fit: cover` ei riitä täyttämään nurkkia
  (`js/etusivupallo.js:495-521`, perustelu).

### KIEKON_YLITYS ja pallonSovitus — pallo yli ruudun reunojen

Lähde: `js/etusivupallo.js:545` (`KIEKON_YLITYS = 1.15`),
`js/etusivupallo.js:599-629` (`pallonSovitus`).

Sääntö: kiekon säde ≥ `KIEKON_YLITYS` (1.15) × etäisyys kiekon
keskeltä kauimpaan näkymän nurkkaan — pallo peittää siis kaikki neljä
nurkkaa ja vielä vähän ylikin, joten pallon reunaviiva ei koskaan näy.
Lisäksi kiekon keskipiste voi LASKEA (`lasku`) sen verran, että koneen
ylin lentokohta (`koneenYlin`, `js/etusivupallo.js:561-571`, laskettu
≈ 346.6 video-px) mahtuu näkymään margin verran (`KONEEN_MARGINAALI = 34`
kerroksen px).

**Kotelo = todellinen `.intro`-paneeli (Playwrightilla mitattu), EI koko
viewport** — paneelissa on omat marginaalinsa (turvamarginaalit,
otsikkotila):

| Ruutu | Viewport | `.intro`-paneeli (mitattu) | Video/SVG-laatikko ruudulla | Kiekon halkaisija ruudulla (CSS px) | Kiekon halkaisija fyysisinä px (× dpr) |
|---|---|---|---|---|---|
| iPhone 393×852 @3x | 393 × 852 | 376.6 × 785.0 px | **938.9 × 938.9 px** | 1001.3 px | 3004.0 px |
| iPad 834×1194 @2x | 834 × 1194 | 812.8 × 1121.1 px | **1493.1 × 1493.1 px** | 1592.4 px | 3184.8 px |

(Video/SVG-laatikon koko on suoraan Playwrightin mittaama `<video>`-
elementin `getBoundingClientRect()`-leveys/korkeus — nämä ovat
todelliset, oikealta sivulta mitatut CSS-pikseliarvot, tarkin lähde.
Kiekon halkaisija = video-laatikon sivu × (2×639.9/1200) ≈
video-laatikon sivu × 1.0665, koska kiekon säde on 639.9/1200 = 0.5333 ×
videon sivu. Tarkat lähdeluvut: `mitatut-dom-arvot.json` tässä
kansiossa, kentät `video.width`/`video.height` per ruutu.)

**Videolaatikon asemointi (CSS `left`/`top`, negatiivinen = ulottuu ruudun
ulkopuolelle, `asetaKehykset`, `js/etusivupallo.js:1149-1166`):**

| Ruutu | left | top | width=height |
|---|---|---|---|
| iPhone 393×852 @3x | −272.8 px | −18.2 px | 938.9 px |
| iPad 834×1194 @2x | −329.4 px | −123.7 px | 1493.1 px |

Lähde: `mitatut-dom-arvot.json` (`video.x`, `video.y`, `video.width`).

### Video-lähdetiedostot ja koot

Lähde: `etusivu.json` → `tiedostot`, `koot`.

| Tiedosto | Koko |
|---|---|
| `pallo.webm` (VP9) | 294 714 tavua (~288 kt) |
| `pallo.mp4` (H.264) | 1 280 101 tavua (~1,22 Mt) |
| `juliste.jpg` (poster) | 44 035 tavua (~43 kt) |

Playwright latasi headless-Chromiumissa **webm**-lähteen
(`video.currentSrc` = `.../pallo.webm`), `readyState 4`, video toisti
itsestään (`paused: false`) — video LATAUTUU ja TOISTUU headless-tilassa
myös ilman käyttäjän vuorovaikutusta (muted+autoplay+playsinline).

## 6. Yhteenveto keskeisistä vakioista (tiedosto:rivi)

| Vakio | Arvo | Tiedosto:rivi |
|---|---|---|
| `ETUSIVUPALLO_VERSIO` | `'2026-09-07a'` | `js/etusivupallo.js:187` |
| `ETUSIVUN_REITTI` | 11 kaupunkia | `js/etusivupallo.js:213-216` |
| `KIERROKSEN_ASTEET` | 360 | `js/etusivupallo.js:219` |
| `ETUSIVUN_KAMERA` | korkeus 1.55, fov 50, latKerroin .62, latMin 2, latMax 38, silotusS 3.4 | `js/etusivupallo.js:227-236` |
| `JAKSON_POHJA_S` | 1.0 | `js/etusivupallo.js:243` |
| `JAKSON_ASTE_S` | 0.115 | `js/etusivupallo.js:244` |
| `LOPPU_PITO_S` | 2.6 | `js/etusivupallo.js:251` |
| `HAIVYTYS_S` | 1.1 | `js/etusivupallo.js:253` |
| `JALJEN_ASKEL_ASTE` | 1.5 | `js/etusivupallo.js:255` |
| `KIEKON_YLITYS` | 1.15 | `js/etusivupallo.js:545` |
| `KONEEN_MARGINAALI` | 34 | `js/etusivupallo.js:552` |
| `KONEEN_SKAALA` | 1.15 | `js/etusivupallo.js:933` |
| `KONEEN_POLKU` | SVG-polku (2 osaa) | `js/etusivupallo.js:930-931` |
| `VIIVAN_LEVEYS` | 11 (video-px) | `js/etusivupallo.js:1146` |
| `.etusivupallo-viiva` (stroke, width, opacity) | `#c2452f`, 11, `round`/`round`, 0.92 | `css/styles.css:6711-6718` |
| `.etusivupallo-koneen-runko` (fill/stroke) | `#2e2114`, width 1.4 | `css/styles.css:6720-6725` |
| `KERROKSEN_ILMESTYS_MS` | 900 | `js/etusivupallo.js:927` |

## 7. Kansion sisältö

- `MITAT.md` — tämä tiedosto
- `etusivu.json` — ämpärin luettelo sellaisenaan
- `mitatut-dom-arvot.json` — Playwrightin mittaamat DOM-arvot (rect,
  transform, computed style) molemmille ruuduille
- `iphone393x852dpr3-kuva1..4.png` — 4 kuvakaappausta, 2 s välein,
  aloitusnäkymä ilman tallennetta, viewport 393×852, dpr 3
- `ipad834x1194dpr2-kuva1..4.png` — sama iPadin mitoilla (834×1194, dpr 2)
- `klippi-iphone393x852dpr3-10s.webm` / `klippi-ipad834x1194dpr2-10s.webm`
  — n. 10 s videoklipit Playwrightin `recordVideo`-ominaisuudella
- `iphone393x852dpr3-video-tila.json` / `ipad834x1194dpr2-video-tila.json`
  — `<video>`-elementin tila (src, readyState, videoWidth/Height,
  currentTime, paused)
- `*-konsolivirheet.txt` — yksi 404-konsolivirhe kummallakin ruudulla
  (ei liity etusivupalloon — ei estänyt videon latautumista/toistoa)

## 8. Huomiot Natiiviseppää varten

- Pallo ITSE on ESIRENDERÖITY VIDEO (Globe.gl-poltto headless-
  Chromiumissa), ei reaaliaikainen 3D-pallo verkkopelissä. Natiivissa
  pallo lienee järkevä toteuttaa oikeana 3D-pallona (Unity), jolloin
  kamera-kaava (`kameranNakyma`, `pallonPiste`, perspektiiviprojektio
  D=1+korkeus, fov 50°) on suoraan käytettävissä 3D-kameran asetteluun
  — ei tarvitse jäljitellä videota.
- Kone ja viiva ovat AINA 2D-laskettuja (ei WebGL) ja piirretään SVG:llä
  suoraan videon päälle — reitti, ajoitus (jaksot) ja projektiokaava
  ovat siis suoraan siirrettävissä natiiviin riippumatta siitä, tehdäänkö
  pallo videona vai oikeana 3D-pallona.
- `pallonSovitus`/`KIEKON_YLITYS`-logiikka on WEB-SPESIFI ratkaisu
  ongelmaan "neliömäinen esirenderöity video peittää suorakulmaisen
  ruudun nurkkiin asti" — natiivissa 3D-pallolla tätä ongelmaa ei ole
  (kamera voidaan zoomata suoraan), joten KIEKON_YLITYS-kerrointa ei
  tarvitse kopioida sellaisenaan; sen SISÄLTÖ (pallon on peitettävä
  ruudun nurkat asti, kone ei saa mennä otsikon yläpuolelle) on silti
  linjaus, joka kannattaa säilyttää.
- Isoisän kuvat (`.etusivupallo-reittikuva`) on tässä mittauksessa
  jätetty kokonaan pois tilauksen mukaisesti — ne ovat oma erillinen
  kerroksensa (`js/etusivupallo.js:701-917`), jos niitä joskus tarvitaan.
