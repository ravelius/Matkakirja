# Atlaslehti-vedos: Stieler 1875 pallon päällä (Karttaseppä 21.9.2026)

Tilaus (Fable 21.9.2026, omistajan päätös; Linssikatalogi osa Q2): rasterinen
linssi, jossa isoisän aikainen atlaslehti näkyy sellaisenaan pallon päällä —
yksi lehti georeferoituna, kolme kaappausta, ei julkaisuun. Tämä on vedos:
kytkin `?atlas=1`, ei linssi, ei valitsinta.

## Lehti ja lisenssi

- **Stieler's Hand-Atlas, 6. laitos (1875), No. 33 "Frankreich und die
  Schweiz"**, bearbeitet von Hrm. Berghaus, Gotha: Justus Perthes 1874.
  Mittakaava 1:3 700 000, kartioprojektio, asteverkko 2° välein (Ferro-
  pituudet alareunassa, Pariisin pituudet yläreunassa).
- Wikimedia Commons: `File:Frankreich und die Schweiz bearbeitet von Hrm.
  Berghaus. Gest. v. W. Alt, Terrain v. W. Weiler. Stieler's Hand-Atlas No.
  33. (IA dr frankreich-und-die-schweiz-bearbeitet-von-hrm-berghaus-gest-v-w-alt-t-13563041).jpg`
  — **Public domain** (David Rumsey Map Collection, kuvaryhmä 13563.000;
  Commonsin lisenssikenttä "Public domain"). Skanni 15 876 × 12 892 px,
  35,0 Mt JPEG.
- Muut Ranska-vaihtoehdot samassa laitoksessa: Frankreich in 4 Blättern
  (No. 34–37, 1:1 500 000, tarkempi mutta neljä lehteä) ja Paris und Umgebung.

## Georeferointi (tools/atlaslehti/)

Ei kontrollipisteitä kaupungeista vaan lehden OMASTA asteverkosta:

1. Harmaasävyraakadata; Hough-tyyppinen ohuiden suorien haku 500 px:n
   kaistoissa (kulmat ±9°, 0,1°:n askel): meridiaanit 12°–28° Ferro
   seitsemässä kaistassa, leveyspiirit 42°–50° N kahdeksassa sarakkeessa
   (`viivat.mjs`, tulokset merid.json/paral.json).
2. Meridiaanit suorina (jäännös ≤ 3 px) leikkaavat kartion kärjessä
   (7739, −49164); kartiovakio n ≈ 0,676; leveyspiirit kaarina, säde
   lineaarinen leveysasteesta (949,6 px/aste). Kärjen ympäri sovitettu
   puhdas kartio jätti järjestelmällisen ±60 px:n virheen (paperin
   vääristymä), joten päälle sovitettiin 2. asteen korjauspolynomi
   36 leikkauspisteestä: **jäännös keskimäärin 4,3 px, enintään 7,4 px**
   (≈ 0,4–0,8 km). Tarkistus kaupungeilla: Brest 10 px, Bastia 20 px
   (lehden reunalla) skannissa.
3. Ferro = 20° länteen Pariisista = 17,6628° W Greenwich (Pariisin
   meridiaani on lehden keskimeridiaani ja Pariisi osuu siihen).
4. Vääntö (`vaanna.mjs`): tasavälinen (equirectangular) RGBA-kuva ikkunaan
   lat 41,5–51,25, lon −6,65–11,35; bilineaarinen näytteistys; kehyksen
   sisäreunan 420 px:n (≈ 0,45°) pehmeä häivytys läpinäkyväksi. Kehyksen
   ulkopuoli (reunus, profiilikuva) läpinäkyvä; otsikko ja Seine-
   departementin sisäkartta jäävät (ne ovat lehden ilmettä).

## Pallolla

`js/atlaslehti.js` + kutsu js/pallolauta/lauta.js:ssä linssimoottorin
luonnin jälkeen: `lauta.linssit.kalvo('atlaslehti', { kuva, peittavyys,
ikkuna, sade: 1.002, jarjestys: 2 })` — sama ikkunakalvo kuin topografian
tarkennuslaastari. Peittävyys oletuksena linssien katto 0,72
(`?atlaspeitto=0.95` vertailuun), kuvan koko `?atlaskoko=4096`.

| kuva | koko px | WebP | purku (createImageBitmap) | texImage2D | GPU RGBA |
|---|---|---|---|---|---|
| 8192 (oletus) | 8192 × 4437 (455 px/aste) | 7,6 Mt | 447 ms (työsäie) | 27 ms | 145 Mt |
| 4096 | 4096 × 2219 (228 px/aste) | 2,5 Mt | 138 ms | 8 ms | 36 Mt |

Siirtoaika ämpäristä tällä koneella ~10 Mt/s → 8192-kuva ≈ 0,8 s, 4G:llä
(2,5 Mt/s) ≈ 3 s; kuva on näkyvissä noin 1,5 s avauksesta. Lähizoomin
tarve ruudulla on 178 px/aste, joten 8192-kuva riittää Pariisin
lähizoomiin (kaappaus), 4096 on siinä pehmeä. Chromiumin
MAX_TEXTURE_SIZE = 8192, joten 8192 on yhden kuvan katto.

Kuvat ovat ämpärissä (omistajan lupa kortilla 21.9.2026):
`matkakirja/linssit/atlaslehti-stieler33-ranska-{8192,4096}-20260921.webp`,
mitattu lataus 8192-kuvalle 0,52 s, 4096-kuvalle 0,28 s. Kaappaukset
tehtiin ennen vientiä paikallisella reitityksellä (sama tiedosto).

## Kaappaukset (docs/raportit/kaappaukset/atlas-vedos-20260921/)

Chromium 1600 × 1000, `?lauta=pallo&atlas=1`, peli aloitettu Marseillesta:

- `saapuminen-1600.jpg` — laudan saapumisnäkymä (Ranska, alt 0,20):
  lehti asettuu pelin rantaviivalle (Bretagne, Gironde, Korsika),
  reunahäivytys pehmeä, otsikkokartussi ja departementtitaulu näkyvät.
- `pariisi-1600.jpg` — Pariisi alt 0,06: pelin Pariisi-piste osuu lehden
  Pariisiin, Rouen, Reims, Chartres, Amiens päällekkäin.
- `gironde-1600.jpg` — Gironde alt 0,04: suisto ja Médoc yksi yhteen pelin
  rantakorostuksen kanssa; vanha kaiverrus lukukelpoinen.
- `pariisi-peitto95-1600.jpg` — vertailu peittävyydellä 0,95.

## Paljonko Eurooppa vaatisi

Stieler 1875:n maalehdet samassa mittakaavaluokassa (1:3,7 M – 1:1,5 M)
Commonsissa (Rumsey 13563): Frankreich & Schweiz, Grossbritannien N+S,
Ireland, Niederlande & Belgien, Deutschland Übersicht, Österreich-Ungarn,
Italien (tai Ober-/Mittel- + Süd-Italien), Spanien & Portugal Übersicht,
Dänemark, Russland & Skandinavien, Ost-Europa 6 lehteä, Europäische
Türkei, Griechenland → **noin 16–18 lehteä** koko Eurooppaan, kukin
35–40 Mt skanni → 8192-kuvina ≈ 7–8 Mt/lehti eli ~130 Mt kuvia, ~1 päivä
työtä/lehti kaavalla (asteverkon haku on ajettava lehtikohtaisesti, sillä
projektio ja Ferro/Paris-jako vaihtelevat). Lehdet limittyvät, joten
saumat on ratkaistava (peittojärjestys tai yhteinen laatasto).

## Suositus, jos vedos hyväksytään

- Tuotantoon EI yksi 145 Mt:n tekstuuri per lehti vaan **laatasto**:
  väännetystä kuvasta z3–z8 laatat samaan `pallo/laatat/…`-muotoon kuin
  reliefipyramidi (kerros `atlas`, omat laatat, sama laattakone); silloin
  puhelin lataa vain näkyvän ikkunan ja koko Eurooppa on yksi kerros.
- Tekstuuri/laatat webp q80, alfa reunahäivytykseen; sepia-sävyä ei
  tarvitse lisätä — paperi on jo oikean värinen.
- Peittävyys: 0,72 näyttää pelin kartan läpi ja lehti jää sameaksi;
  linssinä lehti ansaitsisi poikkeuksen (0,9–0,95), koska sen
  koko idea on "kartta sellaisenaan" — reitit voi piirtää lehden päälle.
- Linssiksi (Q2): kerros `true`, laudat `['maailmankartta']`, lähde
  Commons/Rumsey PD, avaus vain Euroopan alueella.

## Haara

`karttaseppa-atlaslehti` (origin/v1973-prep 31be5993 pohjana): js/atlaslehti.js,
js/pallolauta/lauta.js (kutsu), sw.js (esilataus), tests/sw.test.mjs
(NIPUTTAMATTOMAT), tools/atlaslehti/ (kaava + malli), kaappaukset, tämä
raportti. Testit: 3781 pass / 3 fail — kaikki kolme tools/arabia/trim-
narration.test.mjs:ssä, jotka ovat punaisia myös pohjahaarassa.
