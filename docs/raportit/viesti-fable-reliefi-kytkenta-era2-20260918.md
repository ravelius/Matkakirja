# Viesti Fablelle: reliefipyramidi, erä 2

Opus-agentti 18.9.2026 klo 09.02–09.35 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-kytkenta`. Kaksi committia pushattu,
PR:ää ei avattu. Versionostoa EI tehty (`uusi-versio.mjs` ajamatta,
kuten tehtävänannossa sanottiin) — kytkin on oletuksena pois, joten
pelinäkymä ei muutu ilman `?reliefipyramidi=1`.

**Mitä on tehty:** kohta 1 kokonaan (sarake 166 korjattu ja poltettu,
pyramidi ehjä z0–z7). Kohta 2 kytkennän osalta: laatasto, kytkin,
pohjattomuus ja paikanpitäjä ovat koodissa ja testeissä. **Kohta 3
(savukemittaukset) jäi tekemättä** — syy on alempana, ja se on
konkreettinen eikä aikapula.

---

## 1. Sarake 166: juurisyy ei ollut se, mitä arveltiin

Edellinen erä arveli leveysvahdin olevan rikki. **Se ei ollut.** Pala
oli 308 saraketta leveä eli täsmälleen oikean levyinen (katto 311);
väärin oli sen **paikka**. Leveysvahti ei voi nähdä paikkaa, joten se
teki juuri sen, mitä siltä pyydettiin.

Paikkavahtikin päästi palan läpi, ja sen syy on se oikea juurisyy.
Mittasin sen instrumentoimalla `haePala`:n (diagnostiikkarivi poistettu
commitista):

```
pala pyydetty -180.00000 -178.72500
  | saatu lon 180 ... 181.27916666666667  | n 308
  | norm 180 ... -178.72083333333333
```

NCSS palautti W180-laatasta pyydetylle ikkunalle −180…−178,725
pituusasteet **180…181,279** — sama meridiaani, eri kierros. Koodin
alkiokohtainen normalisointi (`while (v > 180) v -= 360`) **rikkoi
taulukon**: 180 ei ole `> 180`, joten ensimmäinen alkio jäi
paikalleen, kun heti sen jälkeinen 180,004 hyppäsi arvoon −179,996.

Taulukko lakkasi olemasta kasvava. `lon[0]` luki 180 ja
`lon[leveys−1]` luki −178,72 — **kumpikin pää näytti erikseen
uskottavalta**, ja juuri siksi paikkavahti (joka katsoo vain päitä)
päästi palan läpi. Liimaus lukee vain `lon[0]`:n, joten pala sijoittui
hilassa 86 400 saraketta väärään kohtaan.

**Korjaus:** kierros valitaan ENSIMMÄISESTÄ alkiosta ja vähennetään
kaikista; puoliavoin väli [−180, 180) kuvaa 180:n arvoon −180.
Yksi pala ei koskaan ylitä päivämäärärajaa (`kaarra` katkaisee
±180:ssä, `rajat` 15°:n rajoilla), joten koko pala saa saman
kierroksen. Lisäksi kasvavuustarkistus, joka olisi napannut tämän.

### Mitattu tulos

| | ennen | jälkeen |
| --- | --- | --- |
| `haeIkkuna({ lon0: 179.13, lon1: 181.275 })` | 86 917 saraketta | **517** |

Sarake 166 poltettu: **33 laattaa + 44 avomerta = 77**, eli tasan se,
mikä puuttui (rivit 14–90). Koot 2–101 kt eli tavallista maastoa, ei
enää 1–8 kt:n tyhjiä. Ajossa **ei yhtään virhettä**.

Silmätarkistus kahdesta laatasta (Read, PNG:ksi purettuna):

- `z7/166/21` — vuoristoa, harjanteet ja laaksot erottuvat, rannikko
  oikeassa kohdassa, ei saumaviivaa eikä toistoa.
- `z7/166/19` — rannikkoa ja avomerta, rantaviiva terävä.

Alinäytteistys `--jatka --tasot 0-6` ajettu, ei virheitä. **Pyramidi on
nyt ehjä:**

| taso | laattoja | koko |
| --- | --- | --- |
| z7 | 6 631 | 287,8 Mt |
| z6 | 1 958 | 91,9 Mt |
| z5 | 626 | 25,4 Mt |
| z4 | 201 | 6,6 Mt |
| z0–z3 | ~92 | 2,3 Mt |

Levyllä `<scratch>/reliefi15/maailma/`. **En vienyt mitään R2:een** —
avain on omistajalla. Vientikomennot ovat edellisessä raportissa
(`viesti-fable-reliefi-kytkenta-20260918.md`) ja pätevät sellaisinaan;
versio `20260918`.

---

## 2. Linssikytkentä: laatasto pääkartan laattakoneessa

Uusi moduuli **`js/reliefipyramidi.js`**. Kytkentä perustuu yhteen
mitattuun havaintoon, joka teki tästä helpon: **reliefipyramidin arkki
on pikselilleen pääkartan arkki.** Manifestissa lukee
`{x: 0, y: −1046.3149255312064, w: 12000, h: 7307.715927310571}` —
sama olio kuin `js/laattapyramidi.js`:n `ARKKI_VARALLA` — ja tasot
ovat samat 675 → 86 400 px 512:n laatoissa. Reliefilaatta `z7/166/21`
osuu siis täsmälleen samaan lautaruutuun kuin pohjalaatta `z7/166/21`,
eikä yhtään uutta geometriaa tarvita. Testi vartioi tätä
koneellisesti (jos se joskus eriytyy, reliefi piirtyisi väärään
kohtaan eikä sitä huomaisi muuten kuin silmällä).

### Mitä koodiin tuli

- `js/reliefipyramidi.js` — kytkin, oma luettelo, osoitekaava,
  meripeitto bittikartaksi, meren taustaväri.
- `js/laattapyramidi.js` — `pyramidinKerrostasot` palauttaa
  reliefitason; `laattaUrl`, `tasonVersio` ja `noutoEtuliite` saivat
  reliefihaaran (etuliite `f`). Reliefin portti kulkee saman oven
  kautta kuin luettelo ja osoitteet (`pyramidinReliefiKaytossa`), jottei
  pallo tuo moduulia itse — tuontilistaa vartioi testi.
- `js/pallolaatat.js` — `lepokerroksenKerrokset` portti, avomeren
  taustavärin maalaus.
- `js/linssit/topografia.js` — lippu nousee `pallolle`ssa, laskee
  `pura`ssa; `tila()` kertoo savukkeelle `reliefipyramidi`-kentän.

### Kytkin vaatii KAKSI ehtoa

`?reliefipyramidi=1` **ja** avoin topografialinssi. Tämä ei ole
kosmetiikkaa: reliefi piirtyy samalla laattakoneella kuin pohja, joten
pelkän kytkimen varassa se värittäisi pelin oman seepiakartan
maastoksi — juuri sen, minkä omistaja 4.8.2026 kielsi (*"pidetään
seepia normaalissa pelinäkymässä"*).

Oletus on pois, koska laatat eivät ole ämpärissä. Ilman kytkintä peli
on täsmälleen entisensä: yksi kuva ja laastari, peittävyys 0,72.
Vanhaa kuvapolkua ei ole kosketettu rivilläkään.

### Pohjattomuus (omistajan lisäys, Raamattu LISAYS 16 kohta 49)

Sain lisäyksen kesken erän ja toteutin sen samaan committiin.
**Reliefi korvaa pohjan eikä peitä sitä:** kun linssi on auki,
`pyramidinKerrostasot` palauttaa `[reliefi, ranta?, viiva?, nosto?]` —
pohjalaatta ei ole listalla lainkaan, joten **seepialaattoja ei haeta
linssin ajan yhtäkään**. Paikanpitäjä on laattakoneen oma karkea
kerros eli SAMAN pyramidin ylemmän tason laatta skaalattuna, kuten
pääkartallakin. Vaaleaa karttaa ei voi välähtää, koska sitä ei ole.

Ranta-, viiva- ja nostotaso jäävät reliefin päälle — ne ovat merkkejä
kartan päällä, ja lisäys sanoo ne nimenomaan reliefin päälle.

**Oma päätös, jonka kirjaan:** pudotin myös **väritason** pois linssin
ajaksi. Se on kohdemaan tasoitus seepiakartalle eikä maaston päälle
tarkoitettu; lisäys ei ottanut siihen kantaa. Jos se halutaan mukaan,
muutos on yksi rivi.

**Avomeri oli lisäyksen piilevä hinta.** Reliefipyramidi on harva —
6 228 laattaa 6 631:stä on z7:llä merta, eikä niistä polteta laattaa
lainkaan — ja ilman pohjaa alla jokainen merilaatta olisi ollut
`virhe` ja meri jäänyt reikinä. Tason `taustavari` maalataan nyt
kankaalle samalla värillä, jonka polttotyökalu antaa merelle
(`rgb(38, 78, 145)`). **Tämä luku on nyt kahdessa paikassa** (työkalu
ja peli); oikea korjaus on kirjoittaa se luetteloon seuraavassa
poltossa, ja se on jätetty kommenttiin näkyviin.

### Testit

`tests/reliefipyramidi.test.mjs`, 8 testiä: kytkimen oletus,
kaksoisehto, paikallinen kansio, osoitekaava, meripeitto
bittikartaksi (myös roskarivit), tasojen muoto, arkin yhtäpitävyys ja
pohjattomuuden rivit. **Koko sarja `node --test tests/*.test.mjs` on
vihreä** (3 603 läpi, 0 kaatunutta, 13 ohitettua). Kolme vanhaa testiä
päivitettiin, koska ne vartioivat juuri niitä rakenteita, joihin uusi
kerros tuli: kerrosportin muoto (`reliefi: false`),
`js/pallolaatat.js`:n tuontilista ja SHELL-luettelo.

`node tools/build-standalone.mjs` ajettu ennen pushia; moduuli lisätty
`MODULES`-listaan ENNEN `js/laattapyramidi.js`:ää (tuoja ei saa olla
ennen tuotua) ja `sw.js`:n SHELLiin. Laattoja ei committoitu.

---

## 3. Mittaukset: EI AJETTU, ja syy on konkreettinen

**`tools/savuke-topografialinssi.mjs` ei ole olemassa.** Tarkistin:
`tools/`-kansiossa on 13 savuketta, eikä yksikään koske
topografialinssiä tai palloa tällä tavalla. Tehtävänanto oletti sen
olevan valmiina; se ei ole. Sen kirjoittaminen (Playwright-ajuri,
paikallinen palvelin, laattojen route-välitys levyltä, rAF-mittaus,
gradienttienergian laskenta ennen/jälkeen) on oma eränsä, ei
mittauksen sivutuote.

**Kaappauksia ei siis ole eikä kansiota
`docs/raportit/kuvat/reliefipyramidi-20260918/` luotu** — siihen ei ole
mitään pantavaa. En myöskään väitä mitään fps:stä, laattamääristä tai
kirkkaudesta, koska en mitannut niitä.

### Yksi luku kuitenkin mitattiin — ilman selainta

Laattamäärän voi mitata ilman savuketta, koska ikkunan laattavalinta
on puhdas funktio (`lepokerroksenLaatat`). Ajoin sen Alppien
lähizoomin ikkunalla (keski 7,5 °E / 46 °N; 390 × 844 px ruutu,
lähizoomin mitattu tiheys 178 px/aste = 2,19° × 4,74°) ja tarkistin
osumat levyltä:

| taso | ikkuna | laattoja | levyllä | puuttuu | tavuja |
| --- | --- | --- | --- | --- | --- |
| z7 | näkyvä | **8** | 8 | 0 | 684 kt |
| z7 | 2,4× laajennettu | 21 | 21 | 0 | 1 606 kt |
| z6 | näkyvä | 6 | 6 | 0 | 564 kt |
| z6 | 2,4× laajennettu | 8 | 8 | 0 | 697 kt |

**Näkyvän ikkunan tavoite ≤ 12 täyttyy: 8 laattaa, 684 kt.** Jokainen
osoite osui levyllä olevaan tiedostoon, eli osoitekaava ja ruudukko
täsmäävät oikeasti eivätkä vain testin mielestä.

Huomio seuraavalle erälle: 2,4× laajennus (tarkennuslaastarin
panorointivara) veisi z7:llä **21 laattaa**. Laattakerroksella on oma,
pienempi varansa (`LAATTAKERROS_VARA_AST`), joten tämä ei ole sen
luku — mutta jos vara joskus säädetään laastarin mukaan, katto
ylittyy. Luku kannattaa pitää silmällä.

Tämä EI korvaa savuketta: se ei kerro mitään fps:stä, ensimmäisen
kehyksen viiveestä, muistista eikä siitä, ettei seepiapyyntöjä lähde.

Paikallinen ajo on **valmiiksi tuettu**, jotta mittaaminen ei
odota vientiä: `globalThis.RELIEFIPYRAMIDI_KANSIO` korvaa ämpärin
juuren, ja savuke välittää sen Noden route-välityksellä levyltä kuten
ämpärin muutkin kuvat. Laatat ovat levyllä valmiina.

### Mitä savukkeen pitää mitata (omistajan lisäys mukaan lukien)

1. Ensimmäinen reliefikehys avauksessa **< 300 ms**.
2. **Seepiapohjan laattapyyntöjä linssin aikana 0** — verkkolokista,
   suodatin `julisteet/pyramidi/`. Tämä on pohjattomuuden ainoa
   kelvollinen todiste; koodi on sitä varten kirjoitettu, mutta
   koodinluku ei ole mittaus.
3. Näkyvän ikkunan laattahaut ≤ 12 — *tämä on jo mitattu offline
   (8 kpl), savuke vahvistaa sen oikeassa ajossa.*
4. Reliefi näkyy: gradienttienergia kasvaa ennen/jälkeen.
5. **fps ≥ 50** (rAF 3 s) + yksi WebKit-tarkistus samasta.
6. Muisti vs. nykyinen — lisäyksen mukaan tämän pitäisi **laskea**,
   koska kahta karttaa ei enää kompositoida.

---

## 4. Astronautin kamera: suunnitelma, ei koodia

`js/linssit/satelliitti-avaruus.js` on **koskematon** — lisäys sanoi
"tee pohjattomuus + paikanpitäjä ennen Astronautin kameraa", ja niin
tein. Suunnitelma:

Kamera saa saman pyramidin laastarina lähizoomissa näkyvälle
ikkunalle, saman kytkimen takana. Työ on pienempi kuin
topografialinssin, koska laatasto on nyt olemassa: kamera kysyy
`reliefinTaso(z)`:ltä tason ja `pyramidinLaattaUrl`:ltä osoitteet,
eikä sen tarvitse tietää pyramidista muuta. Kaksi ratkaistavaa kohtaa:

1. **Kytkimen kolmas ehto.** Lippu on nyt topografialinssin tila
   (`asetaReliefiLinssi`). Kamera tarvitsee oman lippunsa, tai
   nykyisestä tehdään laskuri — muuten kameran avaus sammuttaisi
   reliefin, jos linssi suljetaan sen alta.
2. **Meren taustaväri ei kelpaa avaruudesta katsottuna** samana
   vakiona: kameran oma merenväri tulee sen omasta kuvasta. Sama
   `taustavari`-kenttä toimii, mutta arvon on tultava kameralta.

Muistikatto ja iOS-säännöt ovat yhä avaamatta kummallakin — ne
kannattaa mitata vasta savukkeella, ei arvata.

---

## 5. Mitä EI koskettu

Raamattu, `sarjat.json`, pääkartan pyramidi, `js/pallolauta/nostot*.js`,
kaupunkiliuska, fokusvirta. Uusia .md-tiedostoja vain
`docs/raportit/`-kansioon (tämä).

---

# Erä 3 — mittaus

Opus-agentti 18.9.2026 klo 09.37–10.15 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-kytkenta`. Mac Studio, Playwright
(Chromium 1234 ja WebKit 2336), ruutu 390 × 844 dpr 2, Alppien
lähizoomi (45,8 °N / 6,9 °E, korkeus 0,06). Laatat levyltä
route-välityksellä ämpärin omaan polkuun; ämpäriin ei viety mitään.

Savuke on **`tools/savukkeet/mittaa-reliefipyramidi.mjs`** (uusi).
`savuke-topografialinssi.mjs` on olemassa ja on VARTIJA — se kaatuu,
jos pelin kerroksia näkyy linssin aikana. Mittari tarvitsi kaksi
rinnakkaista ajoa (kytkin pois ja päällä) samoista luvuista, mikä ei
mahdu vartijan runkoon muuttamatta vartijaa mittariksi.

```
PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js \
CHROMIUM="<...>/Google Chrome for Testing" \
RELIEFIPYRAMIDI_KANSIO=<levyn pyramidijuuri> PORTTI=9121 SELAIN=chromium \
  node tools/savukkeet/mittaa-reliefipyramidi.mjs
```

## 1. Ensimmäinen ajo löysi kolme vikaa — kytkin ei tehnyt mitään

Ensimmäinen mittaus (ennen korjauksia) näytti kytkin päällä tasan
saman kuvan kuin kytkin pois: gradienttienergia **1,71 vs 1,77** eli
kohinaa, eikä yhtään reliefilaattapyyntöä lähtenyt näkyvälle
ikkunalle. Kolme syytä, kaikki mitattuja:

1. **Taso valittiin pohjan luettelosta.** Lähizoomissa laattakerros
   valitsi z8:n (172 800 px). Reliefi on poltettu z7:ään asti, joten
   `pyramidinKerrostasot` ei löytänyt tasolle reliefiä — ja koska
   pohja on pohjattomuuden takia portista kiinni, kerrostasolista jäi
   TYHJÄKSI ja jokainen laatta tilaan `virhe`. Ruutu oli musta, eikä
   yhtään pyyntöä lähtenyt. Korjaus: reliefin syvin taso on kerroksen
   katto (`reliefinSyvinTaso` → `pyramidinReliefinSyvinTaso`, rajaus
   `js/pallolaatat.js`).
2. **Lipun nosto ei herättänyt kerrosta.** Laattakerros päivittyy
   piirtokoukusta; paikallaan olevassa näkymässä koukku ei tuonut
   mitään uutta. Mitattu: ensimmäinen reliefilaattapyyntö lähti
   **15,7 sekuntia** linssin avauksen jälkeen — silloin kun kamera
   liikkui. Korjaus: linssi kutsuu kerroksen omaa `kokoa()`:a
   avatessa ja sulkiessa.
3. **Vanhat seepialaatat jäivät kankaalle.** Valmis laatta käytetään
   uudelleen, ja reliefi on kankaassa samalla tavalla kuin väri.
   Korjaus: lipun vaihto mitätöi laatat kuten maanvaihto
   (`kerrokset.reliefi !== reliefiEdellinen`).

Lisäksi **koko pallon kalvo ja tarkennuslaastari jäävät nyt pois**,
kun kytkin on päällä (omistajan lisäys, LISAYS 16 kohta 49: linssi
ilman pohjakarttaa). Kalvo on 0,72-peittävä kuva samasta reliefistä
30 px/asteen tiheydellä; laataston päällä se hukutti juuri sen
tarkkuuden, jota varten laatasto poltettiin. Odotuspeitteen mitta
vaihtui samalla: kalvoa ei ole, joten peite väistyy vasta kun
laattakerroksen näkyvän ikkunan KAIKKI laatat ovat scenessä ja häive
perillä (`nakyvia`/`nakyviaTaysin`).

## 2. Mittaustaulukko

Näkyvän ikkunan luvut, yksi ajo per selain. Kaappaukset ja raaka JSON:
`docs/raportit/kuvat/reliefipyramidi-20260918/`.

| | Chromium pois | Chromium päällä | WebKit pois | WebKit päällä | tavoite |
| --- | --- | --- | --- | --- | --- |
| a) ensimmäinen reliefikehys | 2 496 ms | **2 714 ms** | 2 436 ms | **2 788 ms** | < 300 ms ✗ |
| b) seepiapohjan laattapyyntöjä linssin aikana | 35 | **0** | 35 | **0** | 0 ✓ |
| c) reliefilaattoja näkyvälle ikkunalle | — | **12** | — | **12** | ≤ 12 ✓ |
| d) gradienttienergia (Alpit) | 1,77 | **2,50** | 3,78 | **21,17** | päällä > pois ✓ |
| e) fps 3 s panoroinnissa | 77,5 | **77,3** | 49,3 | **60,0** | ≥ 50 ✓ (Chromium) |
| f) meri: reikiä laikussa | 0 / 14 400 | **0 / 14 400** | — | **1 / 14 400** | 0 ✓ |
| g) kirkkaus: asettunut / max avauksen jälkeen | 86 / 138,8 | **69 / 101,9** | 86 / 136,3 | **68,9 / 102,0** | ei välähdystä ✗ |

Seepiapohjan kirkkaus ennen linssiä oli 95,7 (Chromium) ja 95,9
(WebKit).

**a) Ensimmäinen reliefikehys 2,7 s — tavoite 300 ms ei täyty.**
Luku on mitattu kaappaussarjasta (kehys 60–100 ms välein): ensimmäinen
kehys, joka on jo asettuneen näkymän värissä. Se EI ole pelkkä
laattojen haku — sarjasta näkyy, että avaus menee kokonaan
odotuspeitteen kautta: seepia 0–0,8 s, peite 1,1–1,4 s, välivaihe
1,7–2,5 s, reliefi 2,7 s. Kytkin pois sama tapahtumaketju vie 2,5 s.
**Ero pois/päällä on siis 0,2 s, ei sekunteja** — 300 ms:n tavoite on
odotuspeitteen ja häivytysten hinta, ei laataston.

**c) 12 laattaa** on tasan edellisen erän offline-mittauksen luku
(8 näkyvää + reunavara) ja tasan katossa. Levyllä oli jokainen.

**d) Terävyys.** Chromiumilla laatasto on mitattavasti terävämpi
(2,50 vs 1,77, +41 %). WebKitin luvut ovat eri suuruusluokassa
(21,17 vs 3,78), koska WebKitin kaappaus ei pehmennä kuvaa samalla
tavalla kuin Chromiumin — SELAINTEN LUKUJA EI SAA VERRATA KESKENÄÄN,
vain saman selaimen pois/päällä.

**f) Meri.** Laikku (120 × 120 px avomerta Lyoninlahden edustalla) on
yhtenäinen: suurin poikkeama laikun omasta keskiväristä 1,9 yksikköä
Chromiumilla ja 30,8 WebKitillä (yksi pikseli yli rajan). **Reikiä ei
ole.** Ruudulla väri on rgb(48, 72, 104), ei kankaan rgb(38, 78, 145):
pallon materiaali ja valaistus tummentavat sen. Sävy on siis oikea
vain kankaalla — se ei ole vika, mutta se on syytä tietää, jos väriä
joskus sovitetaan silmällä.

**g) Välähdys ei ole poissa.** Kirkkaus nousee avauksen jälkeen
arvoon 101,9 (Chromium) noin sekunniksi, kun seepiapohja on 95,7 ja
asettunut reliefi 69. **Sama välähdys on kytkin POIS** ja
voimakkaampana (138,8), eli se ei ole laataston tekoa: se on linssin
oman avausketjun välivaihe peitteen väistyessä. Kytkin siis
puolittaa sen, muttei poista. Juurisyy on peitteen ja häivytysten
ajoituksessa, joka on linssin yhteistä koodia eikä kytkimen sisällä —
**jätän sen Fablen päätettäväksi**, koska sen korjaaminen koskee myös
nykyistä yhden kuvan linssiä.

## 3. Kaappaukset

Kansiossa `docs/raportit/kuvat/reliefipyramidi-20260918/`, kaikki
390 × 844 dpr 2:

- `reliefi-chromium-pois-alpit.png` ja `reliefi-chromium-paalla-alpit.png`
  — Alppien lähizoomi, kytkin pois vs päällä. Päällä-kuvassa harjanteet
  ja laaksot erottuvat yksittäin ja väri on maaston oma; pois-kuvassa
  sama alue on venytettyä ja seepian sävyttämää.
- `reliefi-webkit-pois-alpit.png`, `reliefi-webkit-paalla-alpit.png` — sama WebKitillä.
- `reliefi-*-meri.png` — avomeri Lyoninlahden edustalla (kohta f).
- `reliefi-chromium-pois-ennen-linssia.png` — sama näkymä ennen linssin
  avausta (pelin seepiakartta); vertailukohta kirkkausluvuille.
- `reliefi-mittaus-chromium.json`, `reliefi-mittaus-webkit.json` — raakaluvut, myös kirkkaussarja.

## 4. Suositus: kytkintä EI oteta vielä oletukseksi

Kolme syytä, tässä järjestyksessä:

1. **Laatat eivät ole ämpärissä.** Tämä yksin riittää: oletuksena
   päällä tarkoittaisi tyhjää linssiä jokaiselle pelaajalle. Vienti on
   omistajan avaimen takana.
2. **Syvin zoomi menettää yhden tason.** Reliefi on z7, pohja z8.
   Lähimmässä zoomissa reliefi on siis puolet karkeampi kuin
   seepiapohja samassa näkymässä — yhä 240 px/aste eli
   kahdeksankertainen yhteen kuvaan (30 px/aste) nähden, mutta jos
   linssiä katsotaan aivan pohjassa, ero näkyy. Ratkaisu on joko z8:n
   polttaminen (lähde on 15″ eli 240 px/aste, joten z8 olisi
   venytystä — EI kannata) tai se, että katto hyväksytään.
3. **Välähdys on yhä ruudulla** (kohta g). Se ei ole kytkimen vika,
   mutta se on asia, jonka omistaja on nimenomaan kieltänyt, ja
   oletukseksi ottaminen tekisi siitä jokaisen pelaajan asian.

Kohdat b, c, d, e ja f ovat tavoitteissaan kummallakin selaimella, eli
**laatasto itsessään on mittausten mukaan valmis**: se ei lataa
seepiaa, se pysyy laattakatossa, se on terävämpi, se ei maksa
kehysaikaa ja meri on ehjä. Kun laatat ovat ämpärissä ja välähdys on
ratkaistu, kytkin voidaan poistaa kokonaan ja reliefipyramidi tehdä
linssin ainoaksi lähteeksi.

## 5. Testit ja mitä EI koskettu

`tests/reliefipyramidi.test.mjs` sai yhden uuden testin, joka
vartioi kaikkia kolmea korjattua vikaa (katto, herätys, mitätöinti).
`node --test tests/*.test.mjs` vihreä, `node tools/build-standalone.mjs`
ajettu ennen pushia. Laattoja ei committoitu.

Koskematta: Raamattu, `sarjat.json`, pohjapyramidi, `js/pallolauta/nostot*.js`,
kaupunkiliuska, fokusvirta, Astronautin kamera. Versionostoa ei tehty
(tehtävänannon mukaan); kytkin on yhä oletuksena pois.

---

# Erä 4 — avausketju, oletuskytkin ja yksi mitattu yllätys

Opus-agentti 18.9.2026 klo 10.09–10.54 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-kytkenta`. Mac Studio, Playwright
(Chromium 1234), ruutu 390 × 844 dpr 2, Alppien lähizoomi
(45,8 °N / 6,9 °E, korkeus 0,06). Laatat levyltä route-välityksellä
ämpärin omaan polkuun. Versionostoa EI tehty (tehtävänannon mukaan);
muutos vaatii sen, koska kytkin on nyt oletuksena päällä.

## 1. TÄRKEIN LÖYTÖ: "kirkkausvälähdys" ei ole vika — se on reliefi

Erän 3 taulukon kohta g nimesi avauksen jälkeisen kirkkauden 101,9
välähdykseksi ja asettuneen 69:n oikeaksi näkymäksi. **Se luenta on
päinvastoin.** Kaappasin tällä erällä sen kirkkaimman kehyksen kuvaksi
(`reliefi-chromium-paalla-valahdys.png`, savukkeeseen lisätty
puskurointi), ja kuvassa on **terävä, oikein värittynyt z7-reliefi**:
Alppien harjanteet erottuvat yksittäin, Genevenjärvi ja Thunin järvi
ovat terävärantaisia, nimiöt ovat paikoillaan.

Vertailukohta on saman ajon asettunut kuva
(`reliefi-chromium-paalla-alpit.png`): **sumea ja tummunut** versio
samasta maastosta, jossa harjanteet ovat puuroa. Kirkkaus 69 on siis
sen sumean kuvan luku, 101,9 terävän.

Ketju mitattuna (kirkkaussarja, 60–100 ms välein):

| t | ruudulla |
| --- | --- |
| 0–620 ms | pelin seepiakartta (L ≈ 83) |
| 815–1113 ms | tumma odotuspeite (L 18,4 → 15,2) |
| **1408–2132 ms** | **terävä reliefi (L 101,9)** |
| 2381 ms → | sumea ja tummunut reliefi (L 69) |

Eli **reliefi on ruudulla 1,4 sekunnissa ja oikein**, ja noin sekuntia
myöhemmin jokin korvaa sen karkeammalla ja tummemmalla. Erän 3 mitta
"a) ensimmäinen reliefikehys" etsii ensimmäistä kehystä, joka on jo
ASETTUNEEN värissä — se mittaa siis sen hetken, jolloin kuva
huononee, ei sitä, jolloin reliefi tulee. Luku 2 381 ms on tästä
syystä harhaanjohtava eikä sitä pidä lukea latausviiveenä.

**En löytänyt vielä syytä sille, mikä kuvan korvaa,** enkä arvaa sitä
tähän. Kolme mitattua vihjettä seuraavalle erälle:

1. Laattakerroksen omat mittarit ovat koko ajan kunnossa ja pysyvät
   niinä: `tila nakyy, taso 7, laattoja 12, valmiita 12`. Kerros ei
   siis vaihda tasoa eikä pudota laattoja — **korvaaja on kerroksen
   ulkopuolella**.
2. Ajoitus osuu lepokerroksen kokoamisviiveeseen
   (`LEPOKERROS_LEPOVIIVE_MS` 400 ms kameran pysähtymisestä,
   js/pallolaatat.js) — yksi kangas, joka kootaan levossa.
3. Seepiapyyntöjä on 0, joten korvaaja ei ole pohjakartta vaan jokin,
   joka on jo muistissa.

## 2. Avausketju: yksi kuva pois, peitteen mitta korjattu

**`lataa()` ei enää tuo yhtä kuvaa pyramiditilassa.** `sytytaLinssi`
(js/ui.js) odottaa `linssi.lataa()`:n valmiiksi ENNEN kuin `pallolle()`
pääsee ajoon — ja juuri `pallolle()` nostaa odotuspeitteen ja herättää
laattakerroksen. Kaikki, mitä `lataa()`ssa tehdään, on siis suoraan
pois pelaajan ruudulta: hän katsoo peittämätöntä pelikarttaa niin
kauan. Pyramiditilassa kalvoa eikä laastaria ole, joten kuvaa ei
lueta — moduulin tuonti oli pelkkää odotusta.

**Odotuspeitteen mitta oli rikki, ja se on nyt korjattu.** Vanha ehto
`nakyviaTaysin >= nakyvia` on tosi myös kesken kokoamista, kun näkyviä
laattoja on hetkellisesti yksi: yksi valmis yhdestä on sata prosenttia,
vaikka ruutu on tyhjä. Uusi ehto vaatii viisi asiaa yhtä aikaa: kerros
ajossa (`tila === 'nakyy'`), näkyviä laattoja > 0, jokainen scenessä,
jokaisen häive perillä, eikä mitään latautumassa tai jonossa.

Savuke lukee nyt peitteen kyselylokia (`tila().peiteLoki`), joten
peitteen väistyminen on mitattu eikä pääteltu:

```
 91 ms  nakyy/z7  n12 s0  t0  l3 j0   ← 12 laattaa tiedossa, 3 latautuu
181 ms  nakyy/z7  n12 s6  t0  l0 j0
272 ms  nakyy/z7  n12 s12 t0  l0 j0   ← kaikki scenessä
638 ms  nakyy/z7  n12 s12 t12 l0 j0   ← häive perillä → peite pois
```

**Peite on ruudulla 638 ms** ja väistyy vasta täydestä ikkunasta.
Reliefi on siis kankaalla 272 ms:ssä `pallolle()`:n alusta — tavoite
"< 300 ms laattojen saapuessa" täyttyy laattakerroksen osalta. Mitä
ruudulla näkyy ennen sitä, on tumma peite, ei vaalea kartta.

**Mitä EI saatu alle 300 ms:n:** linssin valinnasta `pallolle()`:n
alkuun kuluu yhä noin 700 ms (kirkkaussarjassa peite ilmestyy vasta
815 ms:ssä). Se aika on `js/ui.js`:n `sytytaLinssi`-ketjussa —
`lataaLinssit`, `sammutaPallolinssi`, `merkitseLuokat` — eikä tämän
linssin sisällä. Sitä ei mitattu erittelemällä, joten en väitä, mikä
siitä on mitäkin.

## 3. Kytkin on nyt oletus

`?reliefipyramidi=0` on varapolku (vanha yksi kuva ja laastari),
kaikki muu on laatasto. Perustelu: laatat ovat ämpärissä
(`media.matkakirja.app/matkakirja/reliefipyramidi/20260918/`), ja erän
3 mittaus totesi laataston valmiiksi kohdissa b–f. Testi
`tests/reliefipyramidi.test.mjs` vartioi kumpaakin suuntaa.

**Syvin zoomi ei ole tyhjä.** Mitattu tässä erässä samalla näkymällä
(korkeus 0,06, jossa pohja valitsisi z8): laattakerros osuu z7:ään ja
kokoaa 12 laattaa 12:sta, eikä yhtään `virhe`-tilaa synny. Reliefi siis
skaalataan, ja se on se sumeus, jonka näkee lähimmässä zoomissa —
mutta se on 240 px/aste eli kahdeksankertainen vanhaan yhteen kuvaan.

## 4. Mittaustaulukko (Chromium, kytkin päällä, kaksi ajoa)

| | mitattu | tavoite |
| --- | --- | --- |
| peite ruudulla | 638 / 642 ms | — |
| reliefi kankaalla `pallolle()`:sta | **272 ms** | < 300 ms ✓ |
| ensimmäinen reliefikehys ruudulla (kirkkaussarja) | **1 408 ms** | < 300 ms ✗ (n. 700 ms on linssiketjua ennen `pallolle()`:a) |
| seepiapohjan laattapyyntöjä | **0** | 0 ✓ |
| reliefilaattoja näkyvälle ikkunalle | **12** | ≤ 12 ✓ |
| gradienttienergia (asettunut) | 2,50 | > 1,77 (pois) ✓ |
| fps 3 s panoroinnissa | **77,1 / 81,2** | ≥ 50 ✓ |
| meri: reikiä laikussa | **0 / 1 296** | 0 ✓ |
| kirkkaus asettunut / kirkkain | 69 / 101,9 | ks. kohta 1 |

WebKit-ajoa ei ehditty aikakaton sisään; erän 3 WebKit-luvut ovat yhä
voimassa siltä osin, mitä tämän erän muutokset eivät koske.

## 5. Nimiöt: mitattu, ei korjattu

Kaappaus `reliefi-chromium-paalla-valahdys.png` näyttää ne, joista
Fable kirjoitti: La Chaux-de-Fonds, Bern 1905, Chillon, Aletsch ja
muut. Ne ovat **harmaata tekstiä ilman reunusta tai pohjaa** vaaleaa
maastoa vasten — maasto on juuri siinä kohdassa vaaleanvihreää
(182, 195, 117) ja teksti tummanruskeaa (82, 71, 54). Mitattu kontrasti
tekstilaikun tummimman ja vaaleimman viidenneksen välillä on **4,78**,
eli rajalla — ja silmällä katsoen luettavuus on huonompi kuin luku
antaa ymmärtää, koska maasto vaihtelee kirjaimen sisällä.

**Korjausta en tehnyt.** Syy on kohta 1: en tiedä vielä, kumpaa kuvaa
vasten nimiön pitää olla luettava — terävää vaaleaa (101,9) vai sumeaa
tummaa (69). Ne ovat eri suuntiin meneviä korjauksia: vaaleaa maastoa
vasten nimiö tarvitsee tumman pohjan, tummaa vasten vaalean. Tehdään
se, kun kohdan 1 korvaaja on löydetty ja tiedetään, kumpi jää.

Mitattava kohta on valmis: `/tmp`-riippumaton kontrastimitta on
savukkeen `vari`/`gradientti`-funktioiden rinnalla helppo lisätä, ja
nimiön paikat saa `pallo.getScreenCoords`illa kuten merilaikku.

## 6. Astronautin kamera: ei koodia, suunnitelma tarkentuu

`js/linssit/satelliitti-avaruus.js` on koskematon. Erän 3 suunnitelma
(kohta 4) pätee, ja siihen tulee tämän erän jälkeen yksi tarkennus:
kameran kytkin ei voi olla topografialinssin `linssiAuki`-lippu vaan
laskuri tai oma lippu — ja **kohta 1 on ratkaistava ensin**, koska
sama korvaaja iskisi kameran laastariin samalla tavalla.

Mitattavat kohdat kameralle, kun se tehdään: laattoja näkyvälle
ikkunalle ≤ 12, 4k/8k-pohjakuva jää alle eikä sitä ladata kahdesti,
fps ≥ 50 pyörityksessä, ja pohjakuvan ja laataston sauma
(gradienttienergia laatan reunalla vs. keskellä).

## 7. Testit ja mitä EI koskettu

`node --test tests/*.test.mjs` vihreä (3 604 läpi, 0 kaatunutta,
13 ohitettua). `node tools/build-standalone.mjs` ajettu ennen kumpaakin
pushia. Kaksi testiä käännettiin uuden oletuksen mukaisiksi.

Koskematta: Raamattu, `sarjat.json`, pohjapyramidi,
`js/pallolauta/nostot*.js`, kaupunkiliuska, fokusvirta,
`js/pallolaatat.js`:n kerma-osiot, Astronautin kamera.
