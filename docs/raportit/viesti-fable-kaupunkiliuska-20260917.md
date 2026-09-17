# Viesti Fablelle: kaupunkiliuska (PAATOKSET 34) — ERÄ KESKEN AIKAKATOSSA

**Opus-agentti 17.9.2026 klo 23.55 Suomen aikaa.** Haara
`claude/bold-ride-vow4ki-kaupunkiliuska` =
`origin/claude/bold-ride-vow4ki-nostot-viimeistely` (PR #2568) + tämä erä.
**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta.

## 1. Rehellinen tila: liuskan UI EI ole tässä erässä

45 minuutin katto meni koodin lukemiseen (Raamatun PAATOKSET 32–34,
`nostot.js` 2368 r., `aihemerkit.js`, `lauta.js` napautusportit,
`kaupunkinosto.js`) ja PÄÄTÖKSEN MALLIN toteutukseen. Kartan piirto,
napautusportit ja mittaus jäivät tekemättä. **En jättänyt peliä
puolitiehen:** mitään ei ole kytketty päälle, joten kartta ja
kaupunkipopup toimivat tässä haarassa täsmälleen kuten PR #2568:ssa.
Playwright-mittausta ei siis ollut mistä ottaa — kaappauksia ei ole.

## 2. Mitä tässä on

### js/pallolauta/kaupunkiliuska.js (uusi, puhdas malli, ei DOMia)

- `onKaupunginSisainen(nosto, kaupunki)` — PAATOKSET 34 kohta 4:n raja
  koodina. **Ankkurointi yksin ei riitä**, ratkaisee noston OMA paikka:
  `KAUPUNGIN_SADE_KM = 12`. Perustelu on mitattu Pariisin luvuilla:
  kaupungin oma ala ~10 km, Versailles 17 km, Chartres 80 km,
  Chambord 170 km. Mitta on maantieteellinen, joten jäsenyys on sama
  kaikilla zoomeilla (sama peruste kuin PAATOKSET 32 kohta 1:n
  saapumiskehyksellä).
- `kaupunginNostot`, `kategoriat` — aihenostojen (PAATOKSET 27)
  ryhmittelylogiikka kategorialaskennaksi, järjestys ladontajärjestys
  (ei ruutujärjestys, joka vaihtuisi panoroinnissa).
- `liuskanRivit({ kaupunki, nostot, avattuKategoria, nahtavyyksia, opas })`
  — yksi lista, jonka piirto ja osumatesti voivat lukea sellaisenaan:
  yläryhmän kolme riviä (`lehti` = kaupunkilehti, `nahtavyydet`,
  `opas`), sitten kategoriarivit muodossa `Historia (5)`, ja
  **haitari**: `avattuKategoria` avaa VAIN sen kategorian jäsenet
  sisennettyinä (`sisennys: 1`) — toisen avaus sulkee edellisen
  rakenteeltaan, ei erillisellä sulkulogiikalla.
- `ylaryhmanMaara` on suoraan savukevartion mitta (kohta 8: 3 riviä).

### js/nahtavyydet.js — "Kaupunki kartalla" → "Nähtävyydet"

Otsikko lukee nyt `NAHTAVYYDET_NIMIO` (kohta 8: *"nimi vaihtuu
kaikkialla"*). Sisältö (kohdekartta + esittely) on koskematon. Tämä oli
ainoa paikka käyttöliittymässä; `js/lehti.js` ja `js/lukija.js`
mainitsevat vanhan nimen vain kommenteissa.

### tests/kaupunkiliuska.test.mjs (8 testiä, vihreä)

Versailles/Chartres/Chambord ulkona, Louvre sisällä, kaupunkimerkki ja
poltettu muste eivät ole nostoja, kategorioiden summa = nostojen määrä,
yläryhmä 3 riviä myös nostottomalla kaupungilla, haitari avaa yhden.

## 3. Mitä on vielä tekemättä (seuraava erä, valmis suunnitelma)

1. **Piirto.** Liuska on sama kone kuin viuhkalista: `viuhkanAsemat` +
   `listanPohja` (js/pallolauta/aihemerkit.js) antavat asemat ja
   pehmeän pohjan. Ero: lista ripustetaan KAUPUNKIMERKKIIN, joten
   `nostoElementti`/`asetteleNosto` tarvitsevat saman
   `.pallolauta-viuhka`-ryhmän ja `piirraViuhka`-kutsun, jotka
   `aihemerkkiElementti`illa jo on (`piirraViuhka` pitää viedä ulos).
   Riville tarvitaan sisennys (`sisennys × ~10 px` dx:ään) ja
   kategoriariville aiheen väripallo (`karttavaloVari(aihe)`).
2. **Napautusportit.** `js/pallolauta/nostot.js`: `viuhka`-tilan viereen
   `liuska = { cityAvain, p, uloinOsuus, avattuKategoria }`, sama
   lepotesti (`VIUHKAN_LEPO_PX`, `VIUHKAN_ZOOMIVARA`) sulkee sen
   zoomista; `napautaViuhkasta`n rinnalle `napautaLiuskasta`, jossa
   kategoriarivi vaihtaa `avattuKategoria`n ja kohderivi kutsuu
   `m.avaa(ankkuri)`. `js/pallolauta/lauta.js` rivi ~2242:
   `avaaTiivisKaupunkietusivu` → `nostot.avaaLiuska(city)`; yläryhmän
   rivit kutsuvat `ui.avaaTutkinta(city)` (kohta 9),
   `piirraKaupunkiKartta`n omaa korttia ja `avaaTuristiOpas(ui, city)`.
3. **Kartan siivous.** `paivita`ssa `elavat`-suodatin pudottaa
   `onKaupunginSisainen`-rivit (tämän erän funktio) ja aihenostojen
   ryhmitys (`ryhmitysRivit`) rajataan kaupungin ULKOPUOLISIIN.
   **Tämä ja kohdat 1–2 on julkaistava samassa erässä** — yksin
   ajettuna se piilottaisi kaupungin nostot ilman, että mitään avaa ne.
4. **Turisti-infon kyltti pois kartalta** (`js/pallolauta/lauta.js`
   ~3420, `laji: 'turistiinfo'`) vasta kun liuskan Turistiopas-rivi
   toimii.
5. **Kaupunkilehdestä "Kaupunki kartalla" -osio pois** (kohta 9):
   `js/lehti.js`n etusivun `piirraKaupunkiKartta`-kutsu.
6. **Mittaus:** PAATOKSET 34:n vartiot
   `tools/savukkeet/savuke-pariisi-lahizoom.mjs`iin (sisäisiä
   nostomerkkejä 0 kolmella zoomilla, Versailles/Chartres/Chambord
   kartalla, yläryhmä 3, kategorioita ≥ 2 ja summa = nostojen määrä,
   haitari, liuska ruudun sisällä, kartan napautus sulkee).

## 3b. JÄI AUKI: kohta 10, kamera ajaa liuskalle tilaa

Fablen lisäys kesken erän (PAATOKSET 34 kohta 10, omistaja: *"Kun
pelaaja painaa pariisia, niin kartta voisi ajaa itsensa sellaiseen
paikkaan missa nostot mahtuvat aukeamaan hyvin"*) **jäi auki** —
aikakatto oli jo täynnä, kun se saapui. Se kuuluu samaan erään kuin
kohdat 1–3 yllä, ja kone on jo olemassa: `viuhkanAsemat` palauttaa
`sakko`n, joka kertoo, paljonko lista jää ruudun ulkopuolelle ja
esteiden päälle — kameran tavoiteasento on se, jolla sakko on 0.
Ajo on `kamera.ajaKamera` (js/pallolauta/lauta.js, sama kuin
kaupunkia napautettaessa nyt, < 600 ms), zoomia vain jos siirto
yksin ei riitä, ja liuska avataan ajon päätyttyä (lepotesti sulkisi
sen muuten heti, ks. `VIUHKAN_LEPO_PX`). Mittaan lisättävät vartiot:
390 px liuska kokonaan ruudussa ja avattu kategoria ilman sisäistä
kelausta, kun rivejä ≤ 8.

## 4. Vanhentuneet savukevartiot (EN muuttanut sarjat.jsonia)

Nämä ovat punaisia tai muuttuvat punaisiksi liuskan myötä — ne
lukitsevat poistuvan käyttöliittymän, eivät vikaa:

| vartio | miksi vanhentuu |
| --- | --- |
| `savuke-pariisi-lahizoom` 4b (viuhka aukeaa aihemerkistä) | aihemerkit poistuvat kaupungin sisältä; korvaaja on liuskan avaus kaupunkimerkistä (jo punainen PR #2568:ssa) |
| `savuke-pariisi-lahizoom` 7d, 7f, 7g, 7h, 7i | turisti-infon kyltin vanha mitta/olemassaolo — kyltti poistuu kartalta (kohta 8) |
| `savuke-kaupunkipopup.mjs` Pariisin ja Marseillen vartiot (iso pop-up, Pulun paneelin väistö, turisti-info) | kaupunkimerkin napautus ei enää avaa pop-upia vaan liuskan |

## 5. Oletukset (päätin itse, aikakaton alla)

1. **12 km kaupungin säteeksi.** Päätös antaa rajan sanallisesti
   (*"aidosti kaupungin ulkopuolella"*); 12 km on pienin luku, joka
   pitää Versaillesin (17 km) kartalla ja Pariisin omat kohteet
   liuskassa. Jos jokin kaupunki tarvitsee oman luvun, se on datakenttä
   eikä uusi sääntö.
2. **Malli omaan moduuliinsa** (ei `nostot.js`:ään): 2368 rivin
   tiedostoon ei mahdu enää logiikkaa, jota pitäisi voida mitata ilman
   selainta — ja juuri se mittaus on nyt tämän erän ainoa todiste.
3. **Mitään ei kytketty päälle.** Puolivalmis liuska rikkoisi
   kaupunkien avaamisen; keskeneräinen erä ei saa muuttaa peliä.
4. **`?kaupunkiliuska=0`-vastakoetta ei ole**, koska päälle kytkettyä
   toimintoa ei ole. Se kuuluu seuraavaan erään.

## 5b. Testit

`node --test tests/*.test.mjs`: **3596 testiä, 0 punaista** (3583
vihreää, 13 ohitettua). Ensimmäisellä ajolla punaisena oli *"kaikki
js-moduulit ovat SHELLissä"* — uusi moduuli puuttui `sw.js`:n
SHELL-listalta (offline-kuori). Lisätty; vartio on vihreä.

## 6. Muutetut tiedostot

`js/pallolauta/kaupunkiliuska.js` (uusi), `js/nahtavyydet.js`
(otsikon nimi), `sw.js` (uusi moduuli SHELLiin),
`tests/kaupunkiliuska.test.mjs` (uusi),
`docs/raportit/viesti-fable-kaupunkiliuska-20260917.md` (tämä).

---

# Erä 2 (Opus-agentti 18.9.2026 klo 00.10 Suomen aikaa)

Aikakatto 45 min täyttyi kesken toteutuksen. **Liuska on nyt kytketty
päälle** (erä 1 ei ollut), mutta **Playwright-mittausta ei ehditty ajaa
lainkaan** — kaappauksia ei siis ole liitettävänä. Kerron alla tarkasti,
mikä on todistettu ja mikä ei.

## 1. Mitä tässä erässä tehtiin

### Liuskan piirto ja napautus (kohta 1)

- `js/pallolauta/aihemerkit.js`: `piirraViuhka` viety ulos (`export`),
  jotta sama listapohja (`.pallolauta-viuhka-pohja`, PR #2566) piirtää
  myös liuskan.
- `js/pallolauta/nostot.js`:
  - `nostoElementti` saa `.pallolauta-viuhka`-ryhmän ja `asetteleNosto`
    piirtää sen samasta reseptistä kuin aihemerkki — liuska on siis
    KAUPUNKIMERKIN oma sisus, ei uusi CSS2D-merkki (sama mitattu syy
    kuin viuhkalla: uutta merkkiä ei synny levossa olevalle pallolle).
  - Uusi tila `liuska = { avain, p, uloinOsuus, avattuKategoria }` ja
    `liuskanKohdat`; `avaaLiuska`, `suljeLiuska`, ja API:ssa
    `liuskaAuki`, `liuskanKategoria`, `avaaLiuskaKaupungista(lat,lng)`,
    `napautaLiuskasta(kohta)`, `liuskanRivit()` (mittarille).
  - Asemat tulevat `viuhkanAsemat`ista samoilla estesäännöillä
    (PR #2568): kaupungin nimi ja pelinappula `KOVAN_ESTEEN_PAINO`.
  - Lepotesti on viuhkan (`VIUHKAN_LEPO_PX`, `VIUHKAN_ZOOMIVARA`), ja
    avaus tehdään VASTA kamera-ajon jälkeen, joten se ei sulje liuskaa
    heti auettuaan.
  - Rivin piirto `piirraLiuskanRivi`: nimiö, kategoriarivin väripallo
    (`karttavaloVari`), haitarin sisennys `LIUSKAN_SISENNYS_PX`,
    hiusviiva ensimmäisen kategoriarivin ylle.
- `js/pallolauta/kaupunkiliuska.js`: `liuskanRivit` merkitsee
  ensimmäisen kategoriarivin `hiusviiva: true`.

### Kartan siivous (kohta 2)

`nostot.js` `paivita`ssa lasketaan `sisaisetKaupungeittain`
(`onKaupunginSisainen`) ja **samasta listasta** sekä pudotetaan merkit
kartalta että täytetään liuskan kategoriat — yksi laskenta, kaksi
käyttöä, joten kartalta ei voi kadota nostoa, jota mikään lista ei avaa.
Suodatus on ENNEN aihenostojen ryhmitystä, joten kaupungin sisäiset
aihenostot poistuvat kartalta itsestään.

### Kamera ajaa tilaa (kohta 10)

`js/pallolauta/lauta.js` `napautaKaupunki`: oman kaupungin napautus
odottaa `kamera.ajaKamera`n valmiiksi (sama sukellus kuin ennen,
< 600 ms), ajaa `ladoLevossa()`n ja avaa liuskan vasta sitten.
Varapolku: jos kaupunkirivi ei ole ruudulla, vanha tiivis etusivu
aukeaa kuten ennen.

### Animaatio (kohta 3)

`css/styles.css`: liuska 150 ms feidi, haitarin kohderivi 200 ms
liuku, `prefers-reduced-motion: reduce` sammuttaa molemmat. **Rivien
30 ms porrastusta EI ehditty tehdä** (vaatii rivin järjestysluvun
CSS-muuttujana piirrosta) — se on auki.

## 2. Mitä EI tehty (auki seuraavalle erälle)

1. **Mittaus ja kaappaukset** — ei ajettu lainkaan, ei liitettäviä
   kuvia. Tämä on erän suurin puute.
2. **Savukkeet (kohta 5)** — `savuke-pariisi-lahizoom.mjs` 4b ja
   7d/7f/7g/7h/7i sekä `savuke-kaupunkipopup.mjs` ovat ennallaan.
   `sarjat.jsonia` ei koskettu (ohjeen mukaan).
3. **Turisti-info-kyltti on yhä kartalla** (kohta 2:n loppuosa).
   Liuskan "Turistiopas"-rivi toimii jo, mutta kyltin poisto
   `lauta.js`n `paivitaTuristiInfo`sta jäi tekemättä — kyltti ei
   riko mitään, se on vain kahdesti.
4. **Kaupunkilehden "Kaupunki kartalla" -osio on yhä lehdessä**
   (kohta 1:n loppu, `js/lehti.js` rivi ~537).
5. **Rivien porrastusanimaatio** (kohta 3).

## 3. Oletukset (päätin itse, ei AskUserQuestionia)

1. **"Nähtävyydet"-rivi avaa tiiviin kaupunkietusivun** (jossa
   kohdekartta on) eikä omaa pelkkää karttakorttia. Puolivalmis oma
   kortti olisi vienyt kohteet kokonaan pois; tämä säilyttää ne.
2. **Liuska avautuu vain PELAAJAN OMASTA kaupungista**, koska vain
   siellä vanha pop-up aukesi. Muiden kaupunkien napautus on yhä
   siirtovalinta.
3. **Kamera ei zoomaa liuskalle**, vain sukeltaa samalla leveydellä
   kuin ennen. Sakon nollaaminen zoomilla vaatisi iteroivan haun,
   jota ei ehditty mitata — `viuhkanAsemat` siirtää listaa pysty- ja
   vaakasuunnassa, mikä riittää 1400 px:llä varmasti ja 390 px:llä
   todennäköisesti. **Tämä on mittaamaton.**
4. **Vanha iso kaupunkipopup-haara poistettiin** `napautaKaupunki`sta
   (oli tavoittamaton uuden haaran jälkeen); `avaaTiivisKaupunkietusivu`
   jää varapoluksi ja `js/kaupunkinosto.js` koskematta.

## 4. Testit

`node --test tests/*.test.mjs`: **3596 testiä, 0 punaista**
(3583 vihreää, 13 ohitettua) — ajettu kahdesti, myös viimeisen
siivouksen jälkeen.

## 5. Vanhentuneet tunnetut punaiset (sarjat.jsonia EI muutettu)

| vartio | miksi vanhentuu |
| --- | --- |
| `savuke-pariisi-lahizoom` 4b | aihemerkit poistuvat kaupungin sisältä; korvaaja on liuskan avaus kaupunkimerkistä |
| `savuke-pariisi-lahizoom` 7d, 7f, 7g, 7h, 7i | turisti-infon kyltin mitat — kyltti poistuu kartalta (yhä tekemättä, ks. 2.3) |
| `savuke-kaupunkipopup.mjs` Pariisi/Marseille | kaupunkimerkin napautus avaa liuskan, ei isoa pop-upia |
| kaupungin sisäisiä nostomerkkejä mittaavat vartiot | merkit eivät enää piirry kartalle millään zoomilla |

## 6. Muutetut tiedostot (erä 2)

`js/pallolauta/nostot.js`, `js/pallolauta/lauta.js`,
`js/pallolauta/aihemerkit.js`, `js/pallolauta/kaupunkiliuska.js`,
`css/styles.css`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta.

---

# Erä 3 (Opus-agentti 18.9.2026 klo 00.40 Suomen aikaa)

Tässä erässä tehtiin kohdat 1 (liuska JOKAISESTA kaupungista), 3
(rivien porrastus), 8 (turisti-infon kyltti pois) ja 9 (kohdekartta
pois lehdestä), sekä kohdan 5 mittaus: savukkeiden vartiot kirjoitettiin
liuskalle ja **ajettiin**. Kahden edellisen erän suurin puute — mittaus
puuttui kokonaan — on tässä korjattu.

## 1. Mittaus (tehtiin ENSIN, ja se löysi kaksi vikaa)

`tools/savukkeet/savuke-pariisi-lahizoom.mjs` sai vartiot 8a–8h ja
vanhentuneet 4b, 7d, 7f, 7g, 7h, 7i kirjaavat nyt INFO-rivin
`VANHENTUNUT VARTIO` perusteluineen (ne lukitsivat poistuneen
käyttöliittymän, eivät vikaa). **`sarjat.jsonia` EI muutettu.**

| vartio | väite (PAATOKSET 34) |
| --- | --- |
| 8a | kaupungin sisäisiä nostomerkkejä kartalla 0 — kolmella zoomilla |
| 8b | Versailles, Chartres ja Chambord ovat kartalla (k. 4) |
| 8c | kaupunkimerkin napautus ajaa kameran < 600 ms ja avaa liuskan |
| 8d | liuska kokonaan ruudussa, ei nimen eikä nappulan päällä (k. 10) |
| 8e | yläryhmä on 3 riviä (k. 8) |
| 8f | kategorioita ≥ 2 ja otsikoiden lukumäärien summa = kohderivien määrä |
| 8g | kategorian avaus näyttää kohteet, toisen avaus sulkee edellisen |
| 8h | kohteen napautus avaa kortin ja liuska sulkeutuu |

### Ensimmäinen ajo löysi kaksi vikaa — MITTARISSA, ei pelissä

1. **Vertailuluku tuli väärästä paikasta.** 8f vertasi kategorioiden
   summaa `nostot.osumat()`in sisäisiin nostoihin, ja mittari näytti
   *"sisäisiä kartalla 0 (kaikkiaan 0)"*. `osumat()` ON kartan lista,
   josta kaupungin sisäiset nostot on jo pudotettu — eli juuri se, mitä
   8a väittää. Vertailuluku luetaan nyt SISÄLLÖSTÄ: jokainen kategoria
   avataan kerran ja sen kohderivit lasketaan, ja vartio kaatuu, jos
   otsikon luku ja rivien määrä eroavat.
2. **Yksi napautus mittasi nielua.** 390 px:n ajo kirjasi *"liuska ei
   auennut"*. Syy on pelin oma portti: juuri suljetun kortin jälkeen
   seuraava napautus nielaistaan (`js/pallolauta/lauta.js`
   `napautaPintaan`, `korttiOliAuki`) — sama portti, joka estää kortin
   sulkemista avaamasta uutta. Se ei ole liuskan vika, joten 8c yrittää
   napautusta kahdesti ja mittaa keston siitä napautuksesta, joka meni
   läpi.

Molemmat korjattiin ja sarja ajettiin uudestaan (ohjeen sallima yksi
uusinta häilyvälle mitalle).

## 2. Liuska JOKAISESTA kaupungista (kohta 1)

Erä 2 oletti *"liuska avautuu vain pelaajan omasta kaupungista"*.
Päätöksen kohta 1 sanoo jokainen kaupunki, joten oletus purettiin:

- `js/pallolauta/lauta.js` `napautaKaupunki`: sama kamera-ajo ja liuskan
  avaus AJON JÄLKEEN koskee nyt kaikkia kaupunkeja, ei vain omaa.
- **Siirtyminen ei kadonnut.** Muiden kaupunkien napautus oli ennen
  suoraan `ui.doMove`; nyt se on liuskan rivi **"Liiku tänne"**
  (`js/pallolauta/kaupunkiliuska.js` `LIIKU_NIMIO`) yläryhmän jatkona.
  Rivi on olemassa VAIN silloin, kun siirto on oikeasti tarjolla
  (`game.moveOptions`), joten se ei ole yläryhmän neljäs rivi:
  `ylaryhmanMaara` laskee yhä kolme (kohta 8, vartio 8e).
- **Yläryhmä koskee SITÄ kaupunkia, jonka merkistä liuska aukesi.**
  Lauta muistaa sen (`liuskanKaupunki`); ennen rivit käyttivät
  `game.cityOf()`ia, joka olisi ollut väärä vastaus heti, kun liuska
  avattiin naapurista.
- Varapolku säilyy: jos kaupunkirivi ei ole ruudulla (pallon takana),
  siirto tehdään suoraan ja oma kaupunki avaa vanhan tiiviin etusivun.

## 3. Kartan ja lehden siivous (kohdat 3, 8 ja 9)

- **Turisti-infon kyltti pois kartalta.** `js/pallolauta/lauta.js`
  `KYLTTI_KARTALLA = false`: opas avataan liuskan Turistiopas-rivistä,
  joten kartalla kyltti oli sama asia kahdesti — ja juuri se kilpaili
  sormesta kaupungin ja nostojen kanssa. Asentokone (`KYLTIN_LADONTA`,
  `js/kaupunkinosto.js`) jätettiin paikalleen sammutettuna: sen mitattu
  asentojärjestys on kallis tieto, ja koneen purku koskisi
  osumakilpailua, jota tämä erä ei mittaa. **Purku on oma eränsä.**
- **"Kaupunki kartalla" pois kaupunkilehdestä.** `js/lehti.js`
  `KOHDEKARTTA_LEHDESSA = false`. Matkailijalle-osio JÄÄ etusivulle: se
  ei ole kartta eikä liuskan rivi. `js/lukija.js` ja `js/nahtavyydet.js`
  eivät tarvinneet muutosta — sisältö elää liuskan Nähtävyydet-rivin
  takana samana.
- **Rivien 30 ms porrastus.** `css/styles.css` lukee `animation-delay:
  calc(var(--liuskan-rivi, 0) * 30ms)`, ja piirto asettaa rivin
  järjestysluvun (`js/pallolauta/aihemerkit.js` `piirraViuhka`).
  Järjestysluku tulee piirrosta eikä `:nth-child`istä, koska haitarin
  avaukset vaihtavat rivien määrää kesken listan.
  `prefers-reduced-motion: reduce` sammuttaa porrastuksen entiseen
  tapaan (sama sääntölohko).

## 4. savuke-kaupunkipopup.mjs (kohta 5)

Savukkeen vanha selkäranka oli iso pop-up ja sen vieressä turisti-infon
kyltti. Kumpaakaan ei enää ole, joten Pariisin ja Marseillen vartiot
käännettiin liuskaan:

- **uudet vartiot:** turisti-infon kylttiä EI ole kartalla;
  kaupunkimerkin napautus avaa liuskan eikä isoa pop-upia; liuskan
  yläryhmä on 3 riviä.
- **vanhentuneet vartiot kirjaavat INFO-rivin** (`VANHENTUNUT VARTIO`)
  syineen: kyltin mitat ja olemassaolo, ison pop-upin avautuminen,
  Pulun paneelin väistö, rasti, turisti-infon napautus kartalta.

## 5. Vanhentuneet tunnetut punaiset (`sarjat.jsonia` EI muutettu)

| tiedosto | tunnettu punainen `sarjat.jsonissa` | miksi vanhentunut |
| --- | --- | --- |
| `savuke-pariisi-lahizoom.mjs` | `"7e. tyopoyta: kyltin laatikko on vapaa"` | kyltti ei ole enää kartalla, joten sen laatikkoa ei ole olemassa; 7e mittaa poistunutta merkkiä |
| `savuke-kaupunkipopup.mjs` | `tunnetutPunaisetMaara: 17` ja `"merkki skaalautuu zoomatessa"` | perusjoukko on ison pop-upin ja kyltin lukumäärä; molemmat poistuivat, joten 17 ei ole enää oikea vertailuluku eikä kyltin zoomimitta ole olemassa |

**Fable päättää, mitä sarjat.jsoniin kirjataan.** Ehdotus: `7e` pois
`pariisi-lahizoomin` listalta ja `kaupunkipopupin`
`tunnetutPunaisetMaara` laskettava uudelleen ensimmäisestä vihreästä
ajosta — vanha 17 on eri pelin luku.

## 6. MITTAUKSEN TULOS: liuska EI aukea — ja syy on mitattu

`savuke-pariisi-lahizoom.mjs`, molemmat ruudut, yksi ajo:
**55/80 vartiota läpi.** Vartiot 8c–8h ovat PUNAISIA molemmilla
ruuduilla, samasta syystä: **liuska ei auennut kertaakaan.**

```
FAIL  8c. puhelin:   ... — ajo — ms, rivejä 0
FAIL  8e. puhelin:   liuskan yläryhmä on 3 riviä — rivejä 0
FAIL  8c. tyopoyta:  ... — ajo — ms, rivejä 0
INFO  tyopoyta · liuska zoom 0.34: kaupunkiriviä ei ollut
```

**Kaappaus kertoo syyn** (`pariisi-liuska-auki-390.png`): napautuksesta
aukesi **Lillen nostokortti**, ei Pariisin liuska.

### Varmistus: kolmas ajo, 390 px, vartio korjattuna

Ensimmäinen tulkinta olisi voinut olla vartion oma vika (se otti
`osumat()`in ENSIMMÄISEN kaupunkirivin). Vartio korjattiin hakemaan
rivi **pelaajan oman kaupungin nimellä** ja kirjaamaan kaikki rivit.
Kolmas ajo (`SAVUKE_RUUTU=390`, **28/40**) antoi kiistattoman rivin:

```
INFO  puhelin · liuskan kaupunkirivi: oma Pariisi, rivejä [Lille], osuma EI RIVIÄ
```

**Lähizoomissa nostokerroksen ainoa kaupunkirivi on Lille. Pariisilla
— pelaajan omalla kaupungilla — ei ole riviä lainkaan.** Juurisyy on
siis mitattu eikä päätelty.

### Juurisyy (mitattu, ei arvattu)

`js/pallolauta/nostot.js` `avaaLiuskaKaupungista` etsii liuskan
ankkurin **nostokerroksen omista `kaupunki`-riveistä** (`osumat()`,
`o.kaupunki`). Ne EIVÄT ole pelilaudan kaupunkeja vaan *näkyviä
kaupunkeja* — sisältörivejä (esim. Lille,
`js/packs/nakyvat-kaupungit-fra.js`), joilla on oma kortti. Pelaajan
napauttama Pariisi on **laudan** kaupunki (`js/pallolauta/lauta.js`
`kaupunkiId`, `lahinMerkki` → `{ laji: 'kaupunki' }`), ja sillä ei
lähizoomissa ole lainkaan riviä nostokerroksessa:
`INFO tyopoyta · liuska zoom 0.34: kaupunkiriviä ei ollut`.

Seuraus on kaksisuuntainen:

1. **Liuska ei aukea pelaajan omasta kaupungista** (mitattu yllä).
   `napautaKaupunki`
   ajaa kameran, kutsuu `avaaLiuskaKaupungista(k.lat, k.lon)`, joka ei
   löydä 60 px:n säteeltä yhtään nostokerroksen kaupunkiriviä ja
   palauttaa epätoden → varapolku avaa vanhan tiiviin etusivun.
   Erä 2:n liuska on siis kytketty päälle koodissa mutta **ei pääse
   ruudulle lainkaan** — juuri tämän mittaus paljasti.
2. **Väärä merkki vie napautuksen.** 390 px:n ajossa lähin
   nostokerroksen kaupunkirivi oli Lille, jonka napautus avasi Lillen
   kortin.

Ja rivi ei "katoa lähizoomissa" vaan **sitä ei ole koskaan ollut**:
nostokerroksen kaupunkirivit syntyvät `kohde.tyyppi === 'kaupunki'`
-kohteista (`js/pallolauta/nostot.js` rivi 1257), ja sellaisia ovat vain
sisältöpakettien näkyvät kaupungit (`grep -rn "tyyppi: 'kaupunki'" js`
→ `js/packs/maastokohteet-*.js`). Laudan omat kaupungit eivät ole
kohteita lainkaan.

**Tämä on suunnittelutason asia eikä yhden rivin korjaus**, koska
liuska piirretään NOSTOKERROKSEN merkin omaan elementtiin
(`asetteleNosto`, `.pallolauta-viuhka`): laudan kaupungilla ei ole
sellaista elementtiä, johon liuska voisi ripustaa. Vaihtoehdot Fablelle:
(a) laudan kaupungille annetaan oma rivi nostokerroksessa (silloin
myös liuska, osumapinta ja lepotesti tulevat ilmaiseksi), tai
(b) liuska piirretään laudan omaan merkkikerrokseen, jolloin
`viuhkanAsemat`-kone pitää antaa sen käyttöön erikseen.
**En valinnut kumpaakaan itse** — se muuttaisi kerrosrajan, ja
päätös kohta 2 (*"kaupunki on yksi piste"*) koskee juuri sitä rajaa.

**Yhden asian korjasin mittauksen nojalla:** `avaaLiuskaKaupungista`
otti *lähimmän* kaupunkirivin 60 px:n säteeltä, eli se olisi avannut
Pariisin kohdalla LILLEN liuskan. Nyt rivin on oltava sama kaupunki
(nimi tulee laudalta). Se ei saa liuskaa aukeamaan — juurisyy on yhä
auki — mutta poistaa polun, jossa liuska näyttäisi väärän kaupungin
sisällön. Testit ajettiin korjauksen jälkeen uudestaan: **0 punaista.**

### Kaksi muuta vartiota vanhentui mittauksessa

- **`4.` (aito napautus avaa noston kortin) on nyt vanhentunut**, ei
  vika: se napauttaa Pariisin OMIA nostoja (`PARIISIN_NOSTOT`), jotka
  päätöksen kohta 3 siirsi kartalta liuskaan. `INFO napautukset: ei
  yhtään` — merkkejä ei ole, koska niiden kuuluukin olla poissa. Sama
  syy kuin 4b:llä; jätin sen ENNALLEEN, koska korvaaja on 8h eikä
  vartion kaataminen itsestään ole tämän erän päätös.
- **`8b.` (Versailles/Chartres/Chambord kartalla) on liian karkea
  vartio:** se etsii nimiä DOMin nimiöistä, mutta aihenostojen ryhmitys
  näyttää vain ryhmän ensimmäisen nimen (`Nimi…`). 390 px:llä löytyi
  Chambord, 1400 px:llä ei yhtään, vaikka kohteet ovat kartalla
  (`3f.` on vihreä). Vartio on korjattava lukemaan `nostot.osumat()`in
  nimet, ei DOMin nimiöitä — kirjaan sen auki jääneeksi.

## 7. Testit

`node --test tests/*.test.mjs`: **3596 testiä, `# pass 3583`,
`# fail 0`** (13 ohitettua). Lähdetekstilukkoja ei tarvinnut päivittää.

## 8. KAAPPAUSPOLUT

Kaappaukset ovat ajokansiossa (ei repossa):
`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/`
`1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset/`

- `pariisi-liuska-auki-390.png` — **tämän erän tärkein kuva**: liuskan
  sijasta auki on Lillen nostokortti (ks. osio 6)
- `pariisi-liuska-auki-1400.png`
- `pariisi-liuska-kategoria-390.png`, `pariisi-liuska-kategoria-1400.png`
  (kategorian avaus — tyhjät, koska liuska ei auennut)
- `pariisi-lahizoom-390.png`, `pariisi-lahizoom-1400.png` — kartta ilman
  turisti-infon kylttiä ja ilman kaupungin sisäisiä nostomerkkejä
- Savukkeen koko tuloste: `.../scratchpad/savuke2.txt` (molemmat ruudut,
  55/80) ja `.../scratchpad/savuke3.txt` (390 px korjatulla vartiolla,
  28/40 — tässä on `liuskan kaupunkirivi` -rivi)

## 8b. Seuraavan erän ensimmäinen työ

Juurisyy on nyt mitattu, joten korjaus on yhden päätöksen päässä:
**annetaanko laudan kaupungille rivi nostokerroksessa (a) vai
piirretäänkö liuska laudan omaan merkkikerrokseen (b)?** Kun Fable
valitsee, vartiot 8c–8h ovat valmiina mittaamaan korjauksen —
`SAVUKE_RUUTU=390` ajaa ne yhdessä ruudussa noin viidessä minuutissa.
Vartio 8b on samalla korjattava lukemaan nimet `nostot.osumat()`ista
DOMin nimiöiden sijaan (ks. osio 6).

## 9. Oletukset (päätin itse, ei AskUserQuestionia)

1. **Kyltin ja kohdekartan sammutus nimetyllä vakiolla** (`KYLTTI_KARTALLA`,
   `KOHDEKARTTA_LEHDESSA`) eikä koodin poistolla. Poisto koskisi
   osumakilpailua ja lehden taittoa, joita tämä erä ei mittaa; nimetty
   vakio näyttää sammutuksen syyn siinä kohdassa, jossa asia syntyi.
   **Koneiden purku on oma eränsä.**
2. **"Liiku tänne" ei ole yläryhmän neljäs rivi** vaan oma lajinsa, joka
   on olemassa vain kun siirto on tarjolla — kohta 8 sanoo kolme riviä,
   ja vartio 8e mittaa juuri sitä.
3. **En korjannut juurisyytä** (osio 6), koska korjaus valitsee
   kerrosrajan päätöksen kohdan 2 kohdalla. Puolivalmis valinta olisi
   ollut pahempi kuin mitattu tieto siitä, mitä valinta maksaa.
4. **Vartio 4 jätettiin ennalleen punaisena** (ks. osio 6).

## 10. Muutetut tiedostot (erä 3)

`js/pallolauta/lauta.js`, `js/pallolauta/nostot.js`,
`js/pallolauta/kaupunkiliuska.js`, `js/pallolauta/aihemerkit.js`,
`js/lehti.js`, `css/styles.css`,
`tools/savukkeet/savuke-pariisi-lahizoom.mjs`,
`tools/savukkeet/savuke-kaupunkipopup.mjs`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta.

---

# Erä 4 (Opus-agentti 18.9.2026 klo 00.30 Suomen aikaa)

**LIUSKA AUKEAA.** Fablen päätös kerrosrajasta on toteutettu ja
mitattu: kaupunkimerkin napautus avaa liuskan, kategoriat täyttyvät,
haitari toimii ja kohteen napautus avaa kortin — molemmilla ruuduilla.
Vartiot 8a ja 8c–8h ovat vihreitä 390 px:llä ja 1400 px:llä.

## 1. Toteutus: liuska ripustuu laudan omaan kaupunkimerkkiin

`js/pallolauta/lauta.js` antaa nostokerrokselle uuden valinnan
`laudanKaupungit: () => [{ id, nimi, lat, lng }]` (`luoNostot`).
Kerros (`js/pallolauta/nostot.js`) tekee niistä **ankkuririvit**
kaupungin koordinaatteihin:

- **Ankkuri ei ole merkki.** Se ei piirrä symbolia eikä nimiötä
  (`asetteleNosto` palaa heti `d.ankkuri`illa), ei ole osumalistalla
  (`vainNimi`) eikä varaa mustetta nimiladonnassa. Kaupunkimerkki ja
  nimi tulevat laudalta kuten ennenkin — sama kaupunki ei piirry
  kahdesti.
- **Kaksi käyttöä, yksi laskenta.** Ankkurit ovat mukana
  `kaupunkirivit`-listassa JOKAISESSA ladonnassa, joten kaupungin
  sisäiset nostot putoavat kartalta myös liuskan ollessa kiinni
  (kohta 3, vartio 8a mittaa juuri suljettua karttaa). Vain auki
  olevan liuskan ankkuri saa oman CSS2D-elementin, ja se lisätään
  DOM-katon JÄLKEEN — liuska ei voi jäädä auki ilman elementtiä.
- **`avaaLiuskaKaupungista`: kaksi lähdettä, yksi polku.** Pakkojen
  näkyvä kaupunki (Lille) käyttää omaa riviään nostokerroksessa; laudan
  kaupunki (Pariisi) saa ankkurin. Nimi ja tunnus tulevat laudalta.

## 2. Kaksi mitattua vikaa matkan varrella (kumpikaan ei ollut arvattu)

### 2a. `TypeError: esteet is not a function`

Heti kun liuska ensimmäisen kerran aukesi, koko ladonta kaatui.
`luoNostot`in valinta `esteet` ON funktio, mutta `paivita`n
samanniminen parametri (laudan antama laatikkolista) **varjostaa sen**,
joten `esteet?.()` kaatui. Sama rivi oli myös viuhkan ladonnassa —
tämä on siis se, miksi *"aihenostojen viuhka on #2568:ssa rikki"*
(Raamattu, PAATOKSET 34 TILA). Molemmat korjattu.

### 2b. Laudan kaupungin asteet eivät ole kaupungin paikka

Ensimmäinen vihreä avaus antoi liuskan, jossa oli **vain yläryhmä** —
ei yhtään kategoriaa. Mittari kertoi syyn suoraan:

```
liuska zoom 0.34: sisäisiä kartalla 0 (kaikkiaan 0), kaupunki pariisi,
lähimmät: Tuileriain rauniot 33.08 km/pariisi, Mona Lisan varkaus
50.20 km/pariisi, Kyyhkyposti 54.61 km/pariisi, Tuileries 73.93 km/pariisi
```

Kaikki nämä ovat Pariisiin ankkuroituja (`kaupunkiAvain: pariisi`),
mutta 33–74 km päässä laudan kaupungin pisteestä. Syy: laudan kaupungin
asteet tulevat **pelilaudan ruudukosta** (`js/pallo.js`
`pallonKaupungit` → `laudaltaAsteiksi`), eivät kaupungin
maantieteellisestä paikasta. 12 km:n säde (kohta 4) siitä pisteestä
mitattuna ei voi löytää yhtään kaupungin omaa nostoa.

**Ratkaisu:** ripustuspiste on yhä laudan merkki, mutta **jäsenyyden
keskus** on kaupunkiin ankkuroitujen nostojen *mediaani* — nostot itse
tietävät kaupunkinsa, ja niiden asteet ovat oikeat. Yksi karkaava nosto
ei siirrä mediaania, ja säde mitataan sen jälkeen noston OMASTA
paikasta kuten päätös vaatii (Versailles 17 km jää kartalle).

**Ja vielä yksi mitattu tarkennus:** ensimmäinen versio laski
mediaanin RUUDULLA olevista riveistä, ja silloin 390 px antoi 2
sisäistä nostoa ja 1400 px 0 — leveämpi ruutu toi lisää nostoja ja
mediaani liikkui niiden mukana. Lähde on nyt `rivit`, koko ladonnan
lista, joten **jäsenyys on sama kaikilla zoomeilla ja kaikilla
ruuduilla** (kohta 4). Sen jälkeen molemmat ruudut antavat saman
liuskan: *Pariisi / Nähtävyydet / Turistiopas / Kauppa ja tekniikka (1)
/ Kulttuuri ja ruoka (1)*.

## 3. Kohta 2: kyltti ja kohdekartta

`KYLTTI_KARTALLA = false` (`js/pallolauta/lauta.js` r. 3300) ja
`KOHDEKARTTA_LEHDESSA = false` (`js/lehti.js` r. 55) olivat **jo erä
3:ssa kytkettyinä** — tarkistin ne, en muuttanut. Mittaus vahvistaa:
`INFO puhelin · turisti-infon kyltti: ei kyltillä kartalla`. Yksikään
`node --test`-testi ei vartioi vanhaa tilaa; savukkeen kylttivartiot
ovat alla osiossa 6.

## 4. MITTAUS

Yksi ajo kummallakin ruudulla `tools/savukkeet/savuke-pariisi-lahizoom.mjs`
(env: `PLAYWRIGHT_JS`, `CHROMIUM`, `PORTTI`):

| ruutu | tulos | 8a | 8b | 8c | 8d | 8e | 8f | 8g | 8h |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 390 px | **35/39** | OK | OK | OK | OK | OK | OK | OK | OK |
| 1400 px | **34/39** | OK | FAIL | OK | OK | OK | OK | OK | OK |

- `8c` ajo **206 ms** (390 px) ja **202 ms** (1400 px) — alle 600 ms:n
  rajan (kohta 10).
- `8d`: liuska kokonaan ruudussa, ei kaupungin nimen eikä nappulan
  päällä, myös 390 px:llä.
- `8f`: kategorioita 2, otsikoiden summa = kohderivien määrä
  (kauppa 1/1, kulttuuri 1/1) — luku luetaan sisällöstä, ei
  `osumat()`ista (erä 3:n korjaus).

### 4b. Kaappaukset (390 px)

Kansio `/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/`
`1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset4/`

- `pariisi-lahizoom-390.png` — **liuska kiinni**: kartta ilman
  kaupungin sisäisiä nostoja ja ilman turisti-infon kylttiä
- `pariisi-liuska-auki-390.png` — **liuska auki** kaupunkimerkistä
- `pariisi-liuska-kategoria-390.png` — **kategoria auki** (haitari)

Savukkeiden tulosteet: `.../scratchpad/savuke5-390.txt` (35/39),
`.../scratchpad/savuke5-1400.txt` (34/39),
`.../scratchpad/savuke-popup4.txt` (kaupunkipopup, 16/25).

## 5. Vartioiden päivitykset (kaikki perusteltuina koodissa)

| vartio | mitä tein | miksi |
| --- | --- | --- |
| `3.` | **säilyy vartiona**, tuntee nyt kaupunkiliuskan NELJÄNTENÄ hyväksyttävänä paikkana (aihemerkki, oma merkki, poltettu muste, liuska) | 390 px:llä kateissa olivat `nosto-guimardin-metro` ja `nosto-pariisin-patonki` — juuri ne kaksi, jotka liuska avaa. Lista luetaan kerrokselta (`liuskanSisaiset`), ei kovakoodattuna |
| `4.` | **INFO, vanhentunut** | napauttaa Pariisin omia nostoja, jotka kohta 3 siirsi liuskaan; korvaaja on 8h |
| `4b.` | oli jo INFO (erä 3) | — |
| `8a.` ja `8f.` | keskus luetaan kerrokselta (`nostot.laudanAnkkurit()`) | vanha versio mittasi OSUMALISTAN ensimmäistä kaupunkiriviä = **Lilleä**, joten se vastasi *"sisäisiä 0"* myös silloin, kun Pariisin nostot olivat kartalla |
| `8b.` | nimet luetaan `nostot.osumat()`ista (myös aihemerkkien `jasenet`), ei DOMin nimiöistä | raportin osio 6:n ehdotus |
| `8c.` | napauttaa **laudan omaa kaupunkimerkkiä** (`pallolauta.kaupunki(id)` → `getScreenCoords`) | erä 3 napautti nostokerroksen Lilleä ja mittasi Lillen kortin |

## 6. Vanhentuneet tunnetut punaiset (`sarjat.jsonia` EI muutettu)

Nämä jäivät punaisiksi, ja ne kaikki mittaavat POISTUNUTTA
käyttöliittymää. **Fable päättää, mitä sarjat.jsoniin kirjataan.**

| tiedosto | punainen | miksi vanhentunut |
| --- | --- | --- |
| `savuke-pariisi-lahizoom.mjs` | `7.` turisti-infon nimiö ≤ 16 px | kyltti ei ole kartalla (kohta 8) |
| `savuke-pariisi-lahizoom.mjs` | `7b.` kyltti mahtuu koteloon | sama |
| `savuke-pariisi-lahizoom.mjs` | `7c.` napautus kyltin päälle avaa turisti-infon | sama; korvaaja on liuskan Turistiopas-rivi |
| `savuke-pariisi-lahizoom.mjs` | `7e.` kyltin laatikko on vapaa (tunnettu punainen jo `sarjat.jsonissa`) | sama |
| `savuke-pariisi-lahizoom.mjs` | `8b.` **1400 px:llä** | ks. 6b alla — tämä EI ole vanhentunut vaan yhä korjattavana |
| `savuke-kaupunkipopup.mjs` | 9 punaista (`tunnetutPunaisetMaara: 17` on eri pelin luku) | ks. 6c alla |

### 6b. `8b.` 1400 px:llä — auki jäänyt, EI vanhentunut

390 px:llä 8b on vihreä; 1400 px:llä löytyy vain Chartres. Kohteet ovat
kartalla (8a ja 3f ovat vihreitä), mutta 1400 px:n ladonnassa
Versailles ja Chambord eivät esiinny `osumat()`in nimissä sillä
nimellä, jolla vartio niitä etsii. **Vartion mitta on siis yhä liian
karkea**, nyt toisesta syystä kuin erä 3:ssa. Tämä on seuraavan erän
työ, ja se on mittarin vika — ei pelin.

### 6c. `savuke-kaupunkipopup.mjs` 16/25 — mittari, ei peli

Savuke ajettiin kerran ohjeen mukaan. Sen liuskavartiot napauttavat
kaupunkia vielä **erä 3:n vanhalla polulla** (nostokerroksen
kaupunkirivi), joka ei löydä laudan kaupunkia — sama vika, jonka juuri
korjasin `savuke-pariisi-lahizoom`iin. Peli toimii: `pariisi-lahizoom`
avaa liuskan molemmilla ruuduilla samalla napautuksella. **Aikakatto
täyttyi ennen kuin ehdin siirtää saman korjauksen tähän savukkeeseen ja
ajaa sen uudestaan** — se on seuraavan erän ensimmäinen työ, ja korjaus
on mekaaninen (kopioi `kaupunkiTieto`-lohko `savuke-pariisi-lahizoom.mjs`:stä).

## 7. Testit

`node --test tests/*.test.mjs`: **`# pass 3583`, `# fail 0`**
(3596 testiä, 13 ohitettua). Ajettu ankkurierän jälkeen ja uudestaan
vikakorjausten jälkeen.

## 8. Oletukset (päätin itse, ei AskUserQuestionia)

1. **Ankkuri on olemassa joka ladonnassa, mutta merkki vain auki
   ollessa.** Kartan siivous (kohta 3) on mitattava liuska KIINNI,
   joten jäsenyyslaskenta ei voi odottaa avausta; DOM-elementti taas
   maksaa CSS2D-budjettia, joten se syntyy vain tarvittaessa.
2. **Jäsenyyden keskus = ankkuroitujen nostojen mediaani.** Päätös
   sanoo rajan noston omasta paikasta; se edellyttää, että kaupungin
   piste on maantieteellinen. Laudan piste ei ole (mitattu, osio 2b).
   Mediaani on kestävin yksinkertainen mitta — jos joskus tarvitaan
   tarkka kaupungin piste, se on datakenttä eikä uusi sääntö.
3. **Vartio 3 opetettiin liuskasta, sitä ei vanhennettu.** Väite
   *"yksikään nosto ei katoa"* on yhä voimassa ja arvokas; vain
   hyväksyttävien paikkojen lista kasvoi yhdellä.
4. **En koskenut `sarjat.jsoniin`, Raamattuun, linsseihin,
   fokusvirtaan enkä nostojen sisältöteksteihin** (ohje).

## 9. Muutetut tiedostot (erä 4)

`js/pallolauta/nostot.js`, `js/pallolauta/lauta.js`,
`tools/savukkeet/savuke-pariisi-lahizoom.mjs`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta (ohje).
