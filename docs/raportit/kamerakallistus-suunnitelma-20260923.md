# Kamerakallistus, vaihe 1 — suunnitelma (Karttaseppä 23.9.2026)

Tilaus: omistaja klo 09.35 Fablen kautta. Kevyt kallistus (≤ 30°) ja orbit-pyöritys
**tehokeinona** (pelaajan liike, animaation seuraaminen, maan esittely), ei vapaana
ohjauksena. Koelippu `?koe=kallistus`, ei oletukseksi.

## Mekanismi: virtuaalinen kamera + kallistuskerros

Koko peli puhuu nyt kolmikolla `pointOfView {lat, lng, altitude}`, ja kamera katsoo
aina pallon keskipisteeseen (pallo.js:3280, pallolaatat.js:1163). Siihen ei kosketa.
Uusi moduuli `js/pallolauta/kallistus.js`:

- **Virtuaalinen pov** = katsepiste P (lat, lng) + korkeus, eli sama kolmikko kuin
  nyt. Kaikki nykyinen koodi (eleet, ajaKamera, liuku, ladonta, nakyvaAlue) lukee
  ja kirjoittaa sitä kuten ennen: `pallo.pointOfView` kääritään kallistuksen ajaksi
  niin, että getter palauttaa virtuaalisen ja setter kirjoittaa virtuaalisen.
- **Todellinen kamera** lasketaan joka kehys virtuaalisesta: P pinnalla, etäisyys
  d = korkeus·R (sama kuin nyt, joten mittakaava ruudun keskellä pysyy), kamera =
  P + d·(cos α·n + sin α·t), jossa n on pinnan normaali, t tangentti atsimuutista
  β (orbit) ja α kallistus pinnan normaalista. `controls.target = P`, min/max-
  etäisyys vapaaksi kallistuksen ajaksi (muuten OrbitControls vetää kameran takaisin).
- **Kulma ja atsimuutti animoidaan** (ease-in-out): `kallista({ kulma, suunta,
  kesto })`, `orbit({ nopeus })`, `suorista({ kesto })`. α = 0 → täsmälleen nykyinen
  kamera (kerros ohitetaan, getter/setter palautetaan).
- **Syöte kumoaa**: pointerdown, rulla tai nipistys → `suorista(250 ms)` ja normaali
  ohjaus. Vaiheessa 1 pelaaja ei kallista itse.
- **Kytkennät** (koelipulla): maan esittely (`saavu`) 25° + hidas orbit ±20°;
  lento `ajaKamera` 15–20° lennon suuntaan; pelaajan liike 15° liikkeen suuntaan.
  Paluu ylhäältä-näkymään jokaisen efektin lopussa. Kehittäjäkytkin
  `window.matkakirja.kallistus` + localStorage `matkakirja-kallistus` (Syötekoe-
  valikon ulkopuolella).

## Laattamoottori

`laattakerroksenOsuma` (pallolaatat.js:1175) laskee ruudun näytteiden osumat
suljetulla kaavalla kallistamattomalle kameralle, ja horisonttikarsinta
(pallolaatat.js:1285) käyttää nadiiria. Molemmat saavat kallistuksen (α, β)
parametrina: säde lasketaan todellisesta kameran kehyksestä (sama toisen asteen
yhtälö, kiertomatriisi lisää). **Horisontti rajataan**: näytteet, joiden
maaetäisyys P:stä on yli K·d, hylätään, ja ruudun yläosaan tulee paperin värinen
usva (CSS-liuku kotelossa), joka peittää rajauksen. **Taso** valitaan katsepisteen
etäisyydestä kuten nyt; kaukaiselle puoliskolle (etäisyys > 1,6·d) yksi karkeampi
taso. K valitaan mittaamalla niin, että laattoja scenessä ≤ 1,3 × kallistamaton
taso 8 -näkymä.

## Mitä piilotetaan ja miksi

| kerros | kallistuksessa | perustelu |
|---|---|---|
| GL-nimiöt ja -merkit (pallonimiot-gl.js) | **näkyvissä** | varjostin projisoi todellisella kameralla ja horisonttitesti on kameran suhteen, joten paikka on oikein |
| CSS2D-nostot ja -nimet | näkyvissä, **ladonta jäädytetty** | CSS2D projisoi oikein; sovittelu ja nostoankkurit olettavat ylhäältä-mittakaavan (kuorenKerroin, uloinOsuus), joten kallistus on "ele": lukko pidetään eikä uutta ladontaa ajeta ennen suoristusta |
| kaukainen puolisko (> K·d) | usvan alla | laattoja ei haeta; nimiöt siellä häivytetään samalla usvalla |
| ruutuun ankkuroidut DOM-kortit (fokuskohde, kaupunkipopup, maapaneeli, liuska) | **suljettu/piilotettu** | ankkuri on ruutupiste, ja efekti on lyhyt; avaaminen suoristaa ensin |
| napautus (pinnanPiste) | ei käytössä | syöte suoristaa ennen osumatestiä |

## Mittarit (WebKit, `__kehysprofiili`)

Ranska tasoilla 6 ja 8, kulmat 0°/15°/30°: laattoja scenessä, drawcallit,
laattavientejä/s, kehysaika p50/p95 orbitin aikana, virheettömyys. Katto: laattoja
≤ 1,3 × (taso 8, 0°). Kaappaukset 390 px ja 1400 px, 6 kuvaa kummastakin.
Vartija: α = 0 tuottaa bitilleen saman kameran kuin nyt (yksikkötesti), ja
koelipun puuttuessa moduulia ei asenneta.

## Riskit

1. globe.gl:n oma `pointOfView`-tween ja OrbitControlsin `update` voivat kirjoittaa
   kameran yli: varmistetaan prototyypin ensimmäisenä asiana, fallback = ohjaimen
   `update` ohitetaan kallistuksen ajaksi.
2. Laattamäärä 30°:ssa: jos K·d-rajaus + karkeampi taso ei riitä kattoon, maksimi
   lasketaan 20°:een tasolla 8 (tai korkeampi usva).
3. Liuku (pallo.js:1447 kytkePallonEnnuste) laskee CSS2D-ennusteen lookAt(0,0,0):lla:
   efekti ei käynnisty liu'un aikana, ja syöte suoristaa.
4. Pelaaja kokee pahoinvointia tai sekavuutta: kulmat maltillisia, reduced motion =
   ei kallistusta.
5. iPhonen GPU-kuorma kasvaa kaukaisesta puoliskosta: mitataan laitteella ennen
   mitään oletusta.

## Prototyypin tulokset (Karttaseppä 23.9.2026)

Toteutus `js/pallolauta/kallistus.js`, kehysmatematiikka `js/pallolaatat.js`
(kameranKehys, kallistettuKehys), mittari `tools/savukkeet/mittaa-kallistus.mjs`,
testit `tests/kallistus.test.mjs`. WebKit, Ranska, katsepiste 47,0 N 2,4 E.

| ruutu | taso | näkyviä laattoja 0°/15°/30° | dc 0°/15°/30° | orbit 30° ±20°: kehys p95, vientejä/s |
|---|---|---|---|---|
| 390 × 844 | 6* | 30 / 31 / 30 | 56 / 83 / 87 | 18 ms, 0 |
| 390 × 844 | 7 | 24 / 25 / 24 | 49 / 77 / 75 | 18 ms, 4,0 |
| 390 × 844 | 8 | 12 / 12 / 15 | 26 / 49 / 54 | 18 ms, 0,7 |
| 1400 × 900 | 6 | 28 / 16 / 16 | 54 / 82 / 90 | 21 ms, 0 |
| 1400 × 900 | 7 | 24 / 18 / 18 | 51 / 78 / 78 | 20 ms, 0 |
| 1400 × 900 | 8 | 28 / 17 / 17 | 51 / 65 / 76 | 21 ms, 0 |

\* Puhelimella Ranskan zoomiraja pitää näkymän tasoilla 7–8 (korkeus 0,046–0,205);
taso 6 on mitattu rajan ulkopuolelta.

Poikkeamat suunnitelmasta:

- **Horisontin raja 0,6 × korkeus** (ei 1,1): 1,1 kaksinkertaisti näkyvät laatat tasolla 7
  (24 → 48), 0,8 antoi +46 %. 0,6:lla kallistus ei lisää laattoja yli 30 %:n
  missään (leveällä ruudulla määrä jopa laskee). Karkeampaa tasoa kaukaiselle
  puoliskolle ei siksi tarvittu. Usva lasketaan rajan projektiosta ruudulle, joten
  rajaus ei näy reunana.
- **Drawcallit kasvavat 25–30** kallistuksessa. Syy on kirjaston oma pohjamoottori
  (`globeTileEngine`, SphereGeometry-palat): se piirtää kaukaisen horisontin karkeat
  palat todellisen kameran mukaan, ja usvan alla se on toivottavaa (ei tyhjää). Kehysaika
  ei muuttunut headless-WebKitissä (p95 18–21 ms, 60 Hz:n katto). iPhonella mitattava
  ennen oletusta.
- **OrbitControlsin `update` ohitetaan** kallistuksen ajaksi (riski 1 toteutui:
  lauta.js kirjoittaa etäisyysrajat pallon keskipisteestä).
- **Kytketty vain maan esittely** (`saavu`, animoitu saapuminen → 25° + orbit ±20°,
  6 s, paluu). Lento ja pelaajan liike ovat seuraava erä samalla API:lla
  (`kallista({ kulma, suunta })`, `suorista()`).

Vartijat: kulma 0 on nykyinen kamera bitilleen (yksikkötesti ja K2), keskipisteen alla
on katsepiste (K4), esittely palaa ylhäältä-näkymään (K6), kosketus suoristaa (K7).
Kaappaukset: `docs/raportit/kaappaukset/kallistus-390-taso678.jpg` ja
`kallistus-1400-taso678.jpg`.

Kehittäjälle: `?koe=kallistus` tai `localStorage.setItem('matkakirja-kallistus', '1')`,
sitten konsolissa `matkakirja.ui.pallolauta.kallistus().kallista({ kulma: 25, suunta: 30 })`,
`.orbit({ kaari: 20, kesto: 6000 })`, `.esittele()`, `.suorista()`.
