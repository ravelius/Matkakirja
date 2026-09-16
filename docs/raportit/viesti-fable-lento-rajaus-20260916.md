# Lento on matka, ei määränpää — juurisyyt, korjaukset ja mittaukset

**Opus → Fable, 16.9.2026.** Haara
`claude/bold-ride-vow4ki-lento-rajaus` (PAATOKSET 29 -haaran päällä).
Ei versionostoa, ei PR:ää, ei Raamattu-muokkausta.

Omistajan kolme havaintoa pelin SISÄISESTÄ lennosta (kaupungista
toiseen; avauslento pallo → lähtökaupunki on ennallaan):

1. lentomatkalla punainen viiva ei piirry
2. kartta zoomaa suoraan kohdemaahan
3. pulu näkyy lennon aikana

Kaikki kolme mitattiin auki, ja niiden takaa löytyi **seitsemän**
erillistä juurisyytä. Mittaukset ovat Chromiumilla 390 × 844 ja
1400 × 900, lento Ateena → Rooma, pelitallenteesta Ateenasta.

---

## 1. Juurisyyt (mitattu, ei arvattu)

### A. Kamera oli kohdemaassa 45 millisekunnin kuluttua

Ensimmäinen mittaus kääri `kamera.ajaKamera`n ja `kamera.kotiin`in
jäljitykseen ja luki kutsupinon:

| t (ms doFly:stä) | kutsu | kohde | kutsupino |
| --- | --- | --- | --- |
| 21 | `ajaKamera` | `bbox 375 × 154`, marginaali 0,35 | `siirto.js` `hyppaa` |
| 45 | `kotiin` | kohdemaan saapumisrajaus | `lauta.js` `saavu` |
| 3130 | `kotiin` | sama | `laske()` (laskeutuminen) |

`game.actionFly` siirtää pelaajan kohdekaupunkiin **jo ennen
animaatiota**, ja `ui.movingPlayerId` asetetaan vasta
`animatePawn`issa. Siinä välissä `ui.run`in oma render osui
js/pallolauta/lauta.js:n *"KAMERA SEURAA TELEPORTTIA"* -haaraan, joka
on tarkoitettu kehittäjäsiirroille ja tallenteen lataukselle. Se ohitti
lennon oman rajausajon 24 ms myöhemmin. Kameran keskipiste oli koko
lennon kohdemaan saapumisnäkymässä (lat 41,045 / lng 12,491,
leveys 205 lautayksikköä).

### B. Rajaus sovitettiin ruudun KORKEUTEEN, ei laatikkoon

Kameran `korkeuteenSovitus` (PÄÄTÖKSET 17) on saapumisen sääntö: kun
maan laatikko on kapealla ruudulla leveämpi kuin ruutu sallii, kuva
sovitetaan korkeuteen ja laatikko saa vuotaa sivuille — maa näkyy
mahdollisimman isona. Lennon laatikkoon sama sääntö on tuhoisa.
Suoraan kameran funktiosta mitattuna (`kameranKohde`, sama laatikko):

| rajaus | korkeus (altitude) | näkyvä leveys | lähtökaupunki ruudulla |
| --- | --- | --- | --- |
| korkeussovitus päällä (vanha) | 0,099 | ~85 yks | x = 299 % (kaukana ulkona) |
| koko laatikko (`kokonaan: true`) | 0,446 | ~385 yks | x = 88 % |

Laatikko on 375 × 154 lautayksikköä; 85 yksikköä on **alle neljännes
matkasta**.

### C. Marginaali 0,35 tarkoitti 20,6 % eikä 12 %

`marginaali` on osuus LAATIKOSTA joka reunalla, joten laatikon pää
päätyy ruudun reunasta `m / (1 + 2m)` päähän. 0,35 → 20,6 %,
0,158 → 12 % (omistajan pyyntö).

### D. Maan uloszoomauskatto puristi kuvan takaisin kesken lennon

`matkaZoomirajat(true)` nollasi vain linssin syrjäytyksen, **ei**
`maanLaatikko`n kattoa. Mittaus korjausten B ja C jälkeen mutta ennen
tätä:

| näyte | näkyvä leveys | lähtö ruudulla |
| --- | --- | --- |
| rajausajon huippu | 385 | x = 0,89 |
| 1,2 s myöhemmin | 205 (kohdemaan katto) | x = 1,21 (ulkona) |

Kamera siis nousi oikeaan rajaukseen ja `tahdistaZoomirajat` veti sen
takaisin. Tämä sama vika teki punaiseksi savuke-liiku.mjs:n vartion
*"lento: koko matka näkyi ruudulla matkan ajan"* — se oli punainen jo
ennen tätä erää.

### E. Punainen viiva oli olemassa mutta vain avauslennolle

`lauta.reitit.jalki` (paksu sinooperi #c2452f, geometria kerran ja
kasvu katkoviivan osuudella) oli js/pallolauta/avaus.js:n oma kutsu.
Pelin oma lento ei koskenut siihen: jäljen datumia ei ollut
viivakerroksessa **yhdelläkään** lennon näytteellä (`jalkiOsuus: null`
kaikissa kymmenessä).

Sivuhavainto: myös hento katkoviivakaari (`arcsData`) katoaa lennon
alussa, koska `matkareittienValinta` ei näytä mitään, kun pelaaja on jo
kohdekaupungissa (`kaaria: 0`). Se jätettiin ennalleen — paksu jälki on
se, mitä omistaja pyysi, ja *"lentoreitit eivät ole viivatasossa"*
pysyy voimassa.

### F. Pulu jäi ruudulle, koska pallolaudan lento ei ole kalvolento

`body.flight-active` vie kelluvan pulunapin ja paneelin — mutta se
asetetaan vain, kun `game.pack.id === 'maailma'`. Pallolauta on pack
`maailmankartta`, joten lento menee doFly:n toiseen, kalvottomaan
haaraan (MANNER_LENTO_MS). Napin laskettu peittävyys oli **1 jokaisessa
lennon näytteessä**.

### G. …ja vielä kahdessa muussa paikassa

Runkoluokan lisäämisen jälkeen mittaus näytti yhä peittävyyden 1:

- `.pollo-nappi.pollo-ilmestyy` ajaa keyframe-animaation. Css-animaatio
  voittaa tavallisen määreen, ja sääntö on tiedostossa väistön JÄLKEEN
  yhtä painavana (0-2-0) — 25 näytettä 27:stä luki peittävyydeksi 1
  leveällä ruudulla.
- Raporttikuvassa pulu seisoi yhä oikeassa alanurkassa, vaikka napin
  peittävyys oli 0: **pulun hahmo on eri elementti**,
  `.livia-kasvot-pinta.livia-lentonayttamo`, bodyn lapsi, 152 × 304 px
  `position: fixed` (js/livia-eleet.js). Sen vieressä jäi myös pulun
  ohjekupla (`.pollo-vihje`).

---

## 2. Muutokset

| tiedosto | muutos |
| --- | --- |
| `js/pallolauta/lauta.js` | teleporttihaara ei laukea, kun `ui.lentoKaari` on päällä; `maanZoomiraja()` palauttaa `null` matkan ajan (`matkallaVapaana` siirtyi ylemmäs, ettei se jää ajalliseen katvealueeseen) |
| `js/pallolauta/kamera.js` | `kameranKohde` tuntee `kokonaan: true` — ohittaa `korkeuteenSovitus`en ja sovittaa koko laatikon |
| `js/pallolauta/siirto.js` | `LENNON_RAJAUKSEN_MARGINAALI` 0,35 → 0,158; `LENNON_KAMERA_MS` 900 → 1100; rajausajo **odotetaan** ennen koneen lähtöä (`.then(lahde, lahde)`); purku ja ohitus ratkaistaan odotuksen aikana (`lentoOdottaa`); kone piirtää punaisen jäljen joka kehys (64 pistettä, paksuus 11 px) ja `laske()` vie sen täyteen ja poistaa |
| `js/ui.js` | runkoluokka `lento-kesken` doFly:n ajaksi, pois `finally`ssä |
| `js/main.js` | `lento-kesken` siivouslistalle |
| `css/styles.css` | `lento-kesken` vie pulunapin, paneelin, paikkamerkin ja paluunapin (peittävyys) sekä pulun hahmon ja ohjekuplan (`visibility`, sama keino kuin linssissä); ilmestymisanimaatio ei enää voita väistöä |
| `tools/savukkeet/savuke-lento-rajaus.mjs` | **uusi** vartio (390 ja 1400) |
| `tests/pallolauta.test.mjs` | kolme väitettä päivitetty uuteen sopimukseen |
| `docs/moduulit/karttapallo.md` | luku 23 |

Mitään avauslennon (`omaKamera`) polkua ei muutettu: se ajaa oman
kameransa ja oman jälkensä kuten ennen.

---

## 3. Mittaukset korjausten jälkeen

390 × 844, Ateena → Rooma:

| mitta | arvo |
| --- | --- |
| lähtökaupunki lennon aikana | x = 88,0 % (12,0 % oikeasta reunasta) |
| kohdekaupunki lennon aikana | x = 14,1 % (14,1 % vasemmasta reunasta) |
| näkyvä leveys | 385 lautayksikköä (matka 375) |
| kameran keskipisteen siirtymä lennon aikana | **0,000** |
| kameran mittakaavan muutos lennon aikana | **0,000** |
| jäljen osuus (viivakerroksen kutsuista) | 0,00 → 0,08 → 0,46 → 0,99 → 1,00 |
| pulunapin peittävyys lennolla / perillä | 0 / 1 |
| pulun hahmon näkyvyys lennolla / perillä | hidden / visible |
| perillä leveys / saapumisrajaus | 205 / 205 (ero 0,0 %) |

1400 × 900: lähtö 88,0 %, kohde 14,1 %, kameran horjunta 0,000, jälki
0 → 1, pulu piilossa ja takaisin.

Vastakokeet:

| koe | tulos |
| --- | --- |
| A: sama laatikko ilman `kokonaan`-lippua | lähtö x = 299,1 % (ruudun ulkopuolella) — lipulla 88,0 % |
| B: saapumisajo käsin kesken lennon | keskipiste siirtyi 38,5 %, mittakaava 46,8 % |
| C: runkoluokka pois kesken lennon | pulunapin peittävyys 1 |

---

## 4. Savukkeet ja testit

| ajo | tulos |
| --- | --- |
| `savuke-lento-rajaus.mjs` (uusi) | **31/31** |
| `savuke-nappula-liike.mjs` | **17/17** |
| `savuke-liiku.mjs` | **41/43** (ennen erää 40/43) |
| `node --test` matkanvaihe, siirtoajoitus, siirtokoreografia, rules, dokumentit, lento-ajoitus | 399/399 |
| `node --test` pallolauta | 27/27 |
| `node --test` aikajana, ihmisen-matka-esitys, pollo, pulu-matkat-tilanteet, ruudutus, satelliitti ×2, lautamigraatio, aloitus-pallolla | 384/384 |

savuke-liiku.mjs: vartio *"lento: koko matka näkyi ruudulla matkan
ajan"* muuttui **punaisesta vihreäksi** (ennen: näkyvä 205 < matkan
laajuus 375). Kaksi jäljelle jäävää punaista ajettiin myös
haarapohjalla (`origin/claude/bold-ride-vow4ki-nappula-liike`) ja ne
ovat **täsmälleen samat esiolemassa**:

- *"uloimmasta matkanapista jää yli puolet vapaaksi"* — leikkaus
  2033 px², sama luku molemmissa; napin asettelu, ei tämän erän asia.
- *"liftauksen nopeusprofiili mitattiin"* — *"liian vähän näytteitä"*
  (6 tässä, 7 pohjalla); kontin ohjelmistopiirron tiheys.

---

## 5. Raporttikuvat

- `docs/raportit/kuvat/lento-rajaus-390-20260916.jpg`
- `docs/raportit/kuvat/lento-rajaus-1400-20260916.jpg`

Molemmat lennon puolivälistä (jäljen osuus 0,40). Playwrightin
kuvankaappaus kestää tässä kontissa 16–28 sekuntia eli monta lentoa,
joten kuvaa varten lento **jäädytetään**: mittaus ottaa rAF:n ja
`performance.now`in haltuun jo ennen lentoa (aluksi ne vain seuraavat
oikeaa aikaa, jottei yksikään jonossa oleva kutsu ehdi oikealla
aikaleimalla) ja pysäyttää kellon, kun jälki on puolivälissä. Kello on
kovassa katossa 1500 ms lennon alusta, jottei siirto voi vahingossa
viedä lentoa loppuun — sen jälkeen paluuta ei ole.

Kuvissa näkyy se, mitä omistaja pyysi: lähtö- ja kohdekaupunki
vastakkaisilla reunoilla, punainen viiva kasvamassa koneen perässä eikä
valmiina, ja pulu poissa.
