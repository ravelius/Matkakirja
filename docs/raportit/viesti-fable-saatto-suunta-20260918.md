# Viesti Fablelle: saatto liikkuu nappulan suuntaan (PAATOKSET 43 kohta 11)

**Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-saatto-suunta`,
pohja `claude/bold-ride-vow4ki-v1947` (72e775e9).**

Omistaja sanatarkasti (v1946, iPad/iPhone): *"Kun nappula liikkuu
liftauksen aikana, kartta panoroi vaaraan suuntaan."*

---

## 1. Juurisyy — MITATTU, ei arvattu

Mittaus ajettiin savuke-siirtozoomin pohjalla: Marseille → maasiirto
silmällä 3 (määränpää reitin pohjoispäässä Pariisin suuntaan,
lat 47,566 / lon 3,005), ruudut 390 × 844 ja 1400 × 900, dpr 2, pallolauta.
Saaton ajalta poimittiin näyte 100 ms:n välein: kameran keskipiste
(`kameranTila` → lat/lng ja laudan x/y) ja liikkuvan nappulan ruutupiste.

**Vika ei ollut ennakkozoomissa eikä pituusasteen merkissä vaan saaton
MAALISSA: saatto ajoi määränpään SAAPUMISASENTOON.**

Saapumisasento (js/saapumisasento.js `saapumisenPallonKohta`) siirtää
kameran kaupungin **pohjois- ja itäpuolelle** poikkeamalla
`{ x: −0,08, y: +0,28 }` **NÄKYMÄSTÄ** — eli siirto kasvaa näkyvän kaaren
mukana. Mitatut luvut:

| | näkyvä leveys | = kaari | itäsiirto | pohjoissiirto |
|---|---|---|---|---|
| 390 × 844 | 177,0 yks | 5,31° | **+0,67°** | **+3,07°** |
| 1400 × 900 | 396,0 yks | 11,88° | **+1,49°** | **+1,98°** |

Koko matkan pituusaste-ero on vain **−2,38°** (5,381° → 3,005°, länteen).
Siksi:

**1400 × 900 — kamera panoroi ITÄÄN nappulan kulkiessa LÄNTEEN.**
Mitattu kameran pituusaste saaton aikana: `4,4535 → 4,4700` (kasvaa),
kun nappula kulki `5,381 → 3,005`. Kameran maali oli siis
lähtöpisteensä **itäpuolella**, vaikka matka meni länteen.

**390 × 844 — kamera liikkui länteen vain kolmanneksen nappulan matkasta
ja ohitti määränpään 1,3-kertaisesti pohjoisessa.** Kameran pituusaste
`4,4535 → 3,6815` (−0,77°, kun nappula kulki −2,38°) ja leveysaste
`44,996 → 50,59` (+5,6°, kun määränpää on 47,57°). Nappula valui
ruudulla 234 px → 155 px (80 px vasemmalle) ja 487 px → 580 px
(93 px alas).

### Pistetulot ENNEN korjausta

Kameran ja nappulan liikevektorin pistetulo laudan yksiköissä,
100 ms:n näytevälit saaton ajalta:

| ruutu | pistetulo > 0 | pistetulo ≤ 0 |
|---|---|---|
| 390 × 844 | **0/28** | 28/28 |
| 1400 × 900 | **0/28** | 28/28 |

(Ensimmäisessä ajossa nappulan maantieteellinen paikka luettiin
globe.gl:n `toGeoCoords`illa, joka odottaa 3D-koordinaatteja eikä
ruutupistettä → NaN. Toinen ajo laski nappulan paikan laudan
yksiköissä kameran keskipisteestä ja ruutupoikkeamasta samalla
mittakaavalla; siitä ovat kaikki yllä olevat luvut.)

Epäilyt, jotka mittaus **sulki pois**: saaton maali EI ollut matkan
laatikon keskipiste (`saatonKohde.x/y` oli määränpään piste),
antimeridiaania ei ylitetä, alku- ja loppupiste eivät olleet vaihtuneet,
ennakkozoomin tavoite oli oikea (askelen mediaani, vartio 7 vihreä
0,1 %:n tarkkuudella), eikä pallolla ajettu "lautakoordinaateissa
asteiden sijaan" — `kameranKohde` muuntaa laudan pisteen asteiksi
oikein.

---

## 2. Korjaus

`js/ui.js` `aloitaSaattavaKamera(path, kesto, from)` — **saaton maali on
nappulan SIIRTYMÄ, ei määränpään asento**:

```
siirtyma = pixelOf(määränpää) − pixelOf(from)
maali    = kameran nykyinen keskipiste + siirtyma      (leveys = ennakon tavoite)
```

Kamera ajaa siis siitä, missä se on, sen verran ja siihen suuntaan kuin
nappula kulkee. Kameran liikevektori on määritelmän mukaan nappulan
liikkeen suuntainen, ja nappula pysyy koko matkan siinä kohdassa ruutua,
johon ennakkozoomi sen jätti. **Kesto (3 160 ms), käyrä
(`SAATON_PEHMENNYS`) ja ennakkozoomin mittakaava ovat ennallaan —
muuttui vain maali.**

Kaksi asiaa, jotka korjaus säilyttää:

* **Saapumisasento ei katoa.** Maitse ja bussilla kaupunkiin päättyvä
  matka ajaa perillä `palaaMaanRajaukseen` → `lauta.saavu`, ja SE
  asettaa kaupungin alimpaan kolmannekseen (`saapuminen: true`,
  js/pallolauta/kamera.js). Kun saatto teki saman asennon jo matkan
  aikana, asento tehtiin kahdesti — ja ensimmäinen kerta maksoi koko
  panoroinnin suunnan.
* **Laiva ja tuntematon kulkutapa ennallaan.** Niillä ennakkozoomi rajaa
  koko matkan (`MATKARAJAUKSEN_MARGINAALI` sea 0,5; PAATOKSET 40:
  *"LAIVA PITÄÄ MATKARAJAUKSENSA"*), jolloin kamera ei ole nappulan
  päällä vaan matkan keskellä eikä puhdas siirtymä osuisi mihinkään.
  Ehto on sama `siirtozoominLeveys`, joka erottaa askelmittakaavan
  muista jo kynnyksessä — noilla saatto ajaa yhä `saapuminen: true`.

Kynnys (`SAATON_VAHIN_PX`) mittaa askelmittakaavalla nyt matkan oman
pituuden (|siirtymä| × mittakaava), mikä on täsmälleen se panorointi,
jonka kamera tekee.

---

## 3. Pistetulot JÄLKEEN

| ruutu | pistetulo > 0 | nappula keskimmäisellä 60 %:lla |
|---|---|---|
| 390 × 844 | **24/24** | 201/201 |
| 1400 × 900 | **23/23** | 201/201 |

Kameran pituusaste kulkee nyt nappulan mukana: 390 px `4,4535 → 2,2320`,
1400 px `4,4535 → 2,2549` (molemmilla länteen, kuten matka).
Nappulan ruutupaikka pysyi 390 px:llä välillä x 215–245 / y 435–515
(ruutu 374 × 771) ja 1400 px:llä x 735–785 / y 503–634 (1379 × 821) —
ei enää 80 px:n valumista reunaa kohti.

---

## 4. Savuke

`tools/savukkeet/savuke-siirtozoomi.mjs`: uusi **vartio 8 "saatto
liikkuu nappulan suuntaan"** molemmille ruuduille. Se poimii näytteen
100 ms:n välein saaton ajalta (nappula liikkeessä) ja vaatii, että
kameran ja nappulan liikevektorin pistetulo on > 0 JOKAISESSA
näytevälissä ja että nappula on samaan aikaan ruudun keskimmäisellä
60 %:lla. Molemmat vektorit luetaan laudan yksiköissä samasta
näytteestä, joten vertailu on yhdessä koordinaatistossa.

**Yksi ajo, PORTTI=8832: 16/16 vartiota läpi** (vartiot 1–7 entisillään
molemmilla ruuduilla, 8 uusi).

```
OK    8 390: saatto liikkuu nappulan suuntaan (pistetulo > 0 24/24, nappula keskialueella 201/201)
OK    8 1400: saatto liikkuu nappulan suuntaan (pistetulo > 0 23/23, nappula keskialueella 201/201)
16/16 vartiota läpi
```

Kaappaus saaton keskeltä 390 px:
`tools/savukkeet/kaappaukset/siirtozoomi/saatto-suunta-390.png` —
nappula on Marseillen ja Pariisin välisellä katkoviivalla suunnilleen
ruudun keskellä, molemmat päät näkyvissä. Vanhat kaappaukset
(`ennakko-390.png`, `saatto-390.png`, `saatto-1400.png`) päivittyivät
samalla ajolla.

---

## 5. Muut tarkistukset

* `node --test tests/*.test.mjs`: **# pass 3628 / # fail 0** (3641 testiä).
  `tests/siirtoajoitus.test.mjs` "saattoajo ei enää zoomaa itse eikä
  palaa perillä" päivitettiin: se luki metodin allekirjoituksella
  `aloitaSaattavaKamera(path, kesto)` ja vartioi nyt myös, että maali
  on nappulan siirtymä ja että kutsu välittää lähtöpaikan.
* `node tools/build-standalone.mjs`: dist/matkakirja.html 32 761 kt, ok
  (dist/ ei committoida).
* Versionumeroa ei nostettu, PR:ää ei avattu.

## 6. Avoinna / velat

* Vartio 8 vertaa vakiosuuntaista kamera-ajoa askelkohtaiseen nappulan
  liikkeeseen. Tällä reitillä kaikki askelvälit osoittavat samaan
  puoliavaruuteen, joten pistetulo on reilusti positiivinen; reitillä,
  jossa yksi askel kääntyy lähes kohtisuoraan matkan suuntaan nähden,
  pistetulo voisi mennä nollan tuntumaan. Jos omistaja haluaa taatun
  marginaalin, saatto pitäisi ajaa nappulan paikasta kehyksittäin — se
  muuttaisi kameran käyrän, mitä tämä erä ei saanut tehdä.
* Vartion 2 raja 1400 px:llä osuu tasan (205 px ≥ 205 px,
  `ASKELEN_SIETO` 0,99) — sama velka kuin PAATOKSET 40:n TILA 2:ssa.
* `aloitaSaattavaKamera`n johdantokommentin lause *"perillä kamera JÄÄ
  SIIHEN"* pitää enää laivalla ja tuntemattomalla kulkutavalla;
  maasiirrossa `palaaMaanRajaukseen` ajaa perään. Kommentti on
  korjattu metodin sisällä, mutta osion SAATTAVA KAMERA johdanto
  (js/ui.js ~rivi 140) puhuu yhä vanhasta järjestyksestä.
