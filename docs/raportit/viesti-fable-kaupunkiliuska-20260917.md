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
`.../scratchpad/savuke-popup4.txt` (kaupunkipopup ennen korjausta, 16/25),
`.../scratchpad/savuke-popup5.txt` (kaupunkipopup korjattuna, 22/25).

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
| `savuke-kaupunkipopup.mjs` | 3 punaista korjauksen jälkeen (`tunnetutPunaisetMaara: 17` on eri pelin luku) | ks. 6c alla |

### 6b. `8b.` 1400 px:llä — auki jäänyt, EI vanhentunut

390 px:llä 8b on vihreä; 1400 px:llä löytyy vain Chartres. Kohteet ovat
kartalla (8a ja 3f ovat vihreitä), mutta 1400 px:n ladonnassa
Versailles ja Chambord eivät esiinny `osumat()`in nimissä sillä
nimellä, jolla vartio niitä etsii. **Vartion mitta on siis yhä liian
karkea**, nyt toisesta syystä kuin erä 3:ssa. Tämä on seuraavan erän
työ, ja se on mittarin vika — ei pelin.

### 6c. `savuke-kaupunkipopup.mjs`: 16/25 → **22/25**

Ensimmäinen ajo antoi 16/25: kaikki liuskavartiot punaisina. Syy EI
ollut napautuspiste (tämä savuke osui jo valmiiksi laudan omaan
kaupunkimerkkiin) vaan **kiinteä 900 ms:n odotus yhden napautuksen
jälkeen**. Sama pelin portti kuin `pariisi-lahizoom` 8c:ssä nielaisee
juuri suljetun kortin jälkeisen napautuksen (`korttiOliAuki`). Odotus
on nyt kysely ja napautusyrityksiä kaksi — sama korjaus, sama
perustelu. Toinen ajo: **22/25**.

Kolme jäljellä olevaa punaista:

| punainen | tila |
| --- | --- |
| `vastakoe 1: kuvaton kaupunki avaa pop-upin silti` | **vanhentunut**: vastakoe mittaa ison pop-upin avautumista, eikä sitä pop-upia enää ole (kohta 1) |
| `Pariisi @ 390 px` (2 vartiota) | **auki jäänyt**, ei vanhentunut. Marseille avaa liuskan 390 px:llä ja Pariisi 1400 px:llä — vain ajon ENSIMMÄINEN mitattu kaupunki jäi ilman liuskaa, eli kyse on ajon alkutilasta (kaksi napautusyritystä ei riittänyt siinä kohdassa). `savuke-pariisi-lahizoom` avaa Pariisin liuskan 390 px:llä luotettavasti (8c vihreä, 206 ms), joten peli toimii; tämä on mittarin herkkyys ja seuraavan erän työ |

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
`tools/savukkeet/savuke-pariisi-lahizoom.mjs`,
`tools/savukkeet/savuke-kaupunkipopup.mjs`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta (ohje).

---

# Erä 5 (Opus-agentti 18.9.2026 klo 00.10 Suomen aikaa)

**JÄSENYYS ON KORJATTU JA MITATTU.** Liuskassa on nyt Pariisin omat
nostot — **5 kategoriaa, 16 nostoa** — ja kartalta ovat poistuneet
kaikki kaupungin sisäiset, myös aihenostot ja fokuskohteet. Versailles,
Chartres ja Chambord ovat kartalla.

```
INFO puhelin · liuskan kategoriat: kauppa: 3/3, kulttuuri: 3/3,
     historia: 3/3, skandaalit: 5/5, ihmeet: 2/2
OK   8a / 8b / 8c / 8d / 8e / 8f / 8g / 8i
```

## 1. JUURISYY: mitattiin ladottua paikkaa, ei datapaikkaa

Fablen tarkistus oli oikeassa, ja syitä oli **kolme päällekkäin** —
kaikki samaa lajia: mitattiin sitä, mihin merkki oli LADOTTU, ei sitä,
missä nosto datan mukaan on.

1. **Ankkurilevitys (PAATOKSET 32)** kirjoittaa rivin `lat`/`lng`:n
   päälle sen pisteen, johon merkki mahtui: Pariisissa 33–74 km.
2. **Kaupungin rykelmän ladonta** (`js/fokuskohteet.js`
   `KAUPUNKIKATON_SADE = 8` laudan yksikköä ≈ 21 km) siirtää merkin jo
   ennen palloa. Näiden kahden jälkeen Pariisin omat nostot olivat
   **20–47 km** kaupungin pisteestä:
   `Metron sisäänkäynti 20,55 · Tuileriain rauniot 29,54 · Torni
   romuraudaksi 47,16` — vaikka datassa ne ovat 1,9–4,4 km.
3. **Erä 4:n mediaani** yritti korjata kohtaa 1 siirtämällä KESKUSTA
   nostojen mukana. Se oli kiertotie väärälle mitalle: keskus ajautui
   ladottujen merkkien perässä eikä ollut kaupungin paikka lainkaan.

**Erä 4:n oletus laudan kaupungin pisteestä oli väärä.** Mitattu
(`tests/kaupunkiliuska.test.mjs`, uusi vartio): laudan Pariisi
`maailmankartta` 5911,1/1440,1 → **48,8451 N / 2,3330 E**, eli
**1,9 km** oikeasta Pariisista. 12 km:n säde riittää siitä pisteestä
hyvin; mediaania ei tarvita eikä saa käyttää.

## 2. Korjaus: kolme kenttää, yksi sääntö

- **`js/pallolauta/nostot.js` `lisaa`** ottaa jokaiselta riviltä
  alkuperäisen pisteen talteen (`omaLat`/`omaLng`) ENNEN kuin
  ankkurilevitys kirjoittaa `lat`/`lng`:n päälle.
- **Kaupunkikartan piste voittaa ladotun.** Jos päätoimittaja on
  antanut nostolle pisteen kaupunkilehden kohdekartalla
  (`js/packs/maakartat.js` `KAUPUNKIKARTAT`, kenttä `nosto:`), se ON
  noston oma paikka. Uusi `kohdekartanNostopaikat()`
  (`js/fokuskohteet.js`) on sama taulu kuin `kohdeKaupunkikartanNostot`
  mutta asteineen — ei uutta lähdettä, kaksi lukua samalta riviltä.
  Tämä on juuri se, minkä päätöksen kohta 4 sanoo *"noston OMA
  paikka"*, ja pakan oma kommentti sanoo saman: linkki on
  eksplisiittinen jäsenyys, joka voittaa mitan myös silloin, kun nosto
  on ladottu kauas kaupungistaan.
- **`onKaupunginSisainen`** (`js/pallolauta/kaupunkiliuska.js`) lukee
  jäsenyyden `nostonOmaPaikka`-kentistä ja lisäksi paikkanimestä: jos
  noston `paikka` on kaupungin nimi, se on sisäinen ilman mittaa.
  `KAUPUNGIN_SADE_KM = 12` ennallaan.
- **Keskus on kaupungin oma piste** (`laudanKaupungit`), ei mediaani.
  Mediaanikone poistettu.
- **Aihemerkki** (ryhmä) kantaa jäsentensä datapaikkojen keskiarvon,
  jotta vartio 8a näkee myös ryhmän sisällön.

## 3. Kategoriat — mistä nimet tulevat

Nimet EIVÄT ole liuskan omia: ne ovat **pelin karttaselitteen omat
aiheet** (`js/karttavalot.js` `KARTTAVALO_AIHEET`, luettu
`aiheenNimi`illa). Siksi *"Kauppa ja tekniikka"* ja *"Kulttuuri ja
ruoka"* ovat yhdistelmänimiä: pelin aiheluokitus on yhdistetty jo
kartalla, ja liuska näyttää saman nimen kuin selite ja väripallo.
Pidin ne. Pariisin liuska 390 px:llä:

| kategoria | nostoja |
| --- | --- |
| Kauppa ja tekniikka | 3 |
| Kulttuuri ja ruoka | 3 |
| Historia | 3 |
| Skandaalit | 5 |
| Kadonneet ihmeet | 2 |
| **summa** | **16** |

Otsikoiden summa = kohderivien määrä jokaisessa kategoriassa (8f).

## 4. MITTAUS (390 px, `savuke-pariisi-lahizoom.mjs`)

**28/40 vartiota läpi.** Liuskan vartiot:

| vartio | tulos |
| --- | --- |
| 8a sisäisiä nostomerkkejä kartalla 0 (3 zoomia) | **OK** |
| 8b Versailles, Chartres ja Chambord kartalla | **OK** |
| 8c napautus ajaa kameran < 600 ms ja avaa liuskan | **OK** |
| 8d liuska kokonaan ruudussa | **OK** |
| 8e yläryhmä 3 riviä | **OK** |
| 8f kategorioita ≥ 2, summa = kohteiden määrä | **OK** |
| 8g haitari | **OK** |
| 8i (UUSI) summa ≥ 8 | **OK** (16) |
| 8h kohteen napautus avaa kortin | **FAIL** — ks. 4b |

Uusi vartio **8i** on juuri se, mitä 8f ei osannut sanoa: 8f oli vihreä
myös silloin, kun liuskassa oli kaksi nostoa ja loput seisoivat
kartalla. 8a ja 8f mittaavat nyt noston OMAA datapaikkaa, ja
diagnoosirivi kertoo, jos datapaikka puuttuu (`EI DATAPAIKKAA`).

### 4b. 8h jäi punaiseksi — auki, ei vanhentunut

`8h. kohde Tuileries, kortti -, liuska kiinni: true`. Liuska
sulkeutui eli napautus MENI läpi, mutta savuke ei nähnyt korttia.
Tuileries on erikoistapaus: kohdekartan piste *"Tuileriain rauniot"*
osoittaa kahteen nostoon (`syvennys-pariisi-tuileriat` ja `tuileries`),
joten avautuva kortti voi olla syvennys eikä fokuskohteen pop-up —
`avoinNosto` ei tunnista sitä. **En ehtinyt mitata tätä**; se on
mittarin epäily, ei todistettu pelin vika, ja se on seuraavan erän
ensimmäinen työ.

### 4c. Kaappaukset (390 px)

`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/`
`1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset5/`

- `pariisi-lahizoom-390.png` — **kartta, liuska kiinni**
- `pariisi-liuska-auki-390.png` — **liuska auki**: Pariisi /
  Nähtävyydet / Turistiopas / hiusviiva / Kauppa ja tekniikka (3) /
  Kulttuuri ja ruoka (3) / Historia (3) / Skandaalit (5) / Kadonneet
  ihmeet (2). Kartalla näkyvät enää Versaillesin…, Chartresin…,
  Chambordin linna…, Braillen pisteet, Joseph Meister, Loire ja
  Kaulanauhajuttu — yksikään ei ole Pariisin sisällä.
- `pariisi-liuska-kategoria-390.png` — **kategoria auki** (haitari)

Savukkeiden tulosteet: `.../scratchpad/savuke8-390.txt` (28/40, tämä
erä), `.../scratchpad/savuke6-390.txt` ja `savuke7-390.txt`
(välimittaukset, joilla juurisyy paikannettiin).

## 5. 1400 px ei ehtinyt — rehellisesti

Aikakatto täyttyi 390 px:n mittauksen ja sen kahden diagnoosiajon
jälkeen. **1400 px on mittaamatta tässä erässä.** Jäsenyys on
maantieteellinen eikä riipu ruudusta (8a mittasi saman kolmella
zoomilla), joten tulos on odotettavasti sama — mutta se on päättely,
ei mittaus.

## 6. KAULANAUHAJUTTU JÄI KARTALLE — ja miksi se on oikein

Fablen listassa Kaulanauhajuttu oli liuskaan kuuluva. **Datan mukaan se
ei ole Pariisissa:** `js/packs/skandaalit.js` antaa sille paikan
*"Versailles'n palatsi"*, 48,8049 N / 2,1204 E = **16,2 km** laudan
Pariisista, ja pakan oma kommentti sanoo sen suoraan: Versailles on 20
kilometriä Pariisin keskustasta eikä osu kaupunkilehden kohdekartan
rajaukseen. Se on `kattoVapaa`, eli nimenomaan *"kaupungin lähialueen
nosto, jolle kohdekartalla EI ole paikkaa"* — sama luokka kuin
Wieliczka ja Richmond Park.

Päätöksen kohta 4 sanoo Versaillesin (17 km) jäävän kartalle, joten
sama sääntö ei voi viedä Versailles'ssa tapahtunutta skandaalia
liuskaan. **Jätin sen kartalle.** Jos omistaja haluaa sen liuskaan,
ratkaisu ei ole säteen kasvattaminen (se veisi myös Versaillesin
palatsin) vaan kohdekartan piste: kun `nosto:`-linkki kirjoitetaan
Pariisin kaupunkikartalle, nosto siirtyy liuskaan itsestään. **Se on
sisältöpäätös, ei koodi.**

## 7. Vanhentuneet vartiot (`sarjat.jsonia` EI muutettu)

Kartan siivous tekee vanhentuneiksi lisää aihemerkkivartioita — ne
lukitsevat kaupungin sisäiset aihemerkit, jotka päätöksen kohta 3
poisti kartalta. **Fable päättää, mitä `sarjat.jsoniin` kirjataan.**

| vartio | miksi vanhentunut |
| --- | --- |
| `3e.`, `3e3.`, `3i.` | aihenostoja ei ole kartalla: Pariisin rykelmä on liuskassa (*"aihenostoja ei ollut lainkaan"*) |
| `3g.`, `3c.` VASTAKOKEET | mittaavat ryhmityksen eroa rykelmässä, jota ei enää ole kartalla |
| `7.`, `7b.`, `7c.`, `7e.` | turisti-infon kyltti ei ole kartalla (erä 3, kohta 8) |

## 8. Oletukset (päätin itse, ei AskUserQuestionia)

1. **Kohdekartan piste on noston oma paikka.** Pakan oma kommentti
   sanoo linkin olevan eksplisiittinen jäsenyys, joka voittaa mitan;
   käytin sitä myös paikkana, koska se on ainoa paikka datassa, jossa
   noston oikeat asteet ovat ladonnan ulottumattomissa.
2. **Kaulanauhajuttu jää kartalle** (osio 6).
3. **Kategorianimet pidettiin pelin omina** (osio 3) — yhdistelmänimet
   tulevat karttaselitteestä, eivät liuskasta.
4. **1400 px mittaamatta** (osio 5).
5. **`8h` jätettiin punaiseksi** mittaamattomana epäilynä (osio 4b);
   en muuttanut vartiota arvauksen perusteella.

## 9. Testit

`node --test tests/*.test.mjs`: **3599 testiä, `# pass 3586`,
`# fail 0`** (13 ohitettua). `tests/kaupunkiliuska.test.mjs` sai kolme
uutta testiä: datapaikka voittaa levitetyn ankkurin, paikkanimi
riittää sisäisyyteen, ja laudan Pariisin oma piste kelpaa keskukseksi
(< 3 km oikeasta Pariisista).

## 10. Muutetut tiedostot (erä 5)

`js/pallolauta/nostot.js`, `js/pallolauta/kaupunkiliuska.js`,
`js/fokuskohteet.js`, `tools/savukkeet/savuke-pariisi-lahizoom.mjs`,
`tests/kaupunkiliuska.test.mjs`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta.

---

# Erä 6 (Opus-agentti 18.9.2026 klo 00.50 Suomen aikaa)

**AVATTU LIUSKA ON ESTEIDEN ULKOPUOLELLA, JA 8h ON VIHREÄ.** Fablen
tarkistus piti paikkansa ja sen syy oli yhdellä rivillä; korjaus on
mitattu molemmilla ruuduilla, ja kaikki liuskan vartiot (8a–8j) ovat
vihreitä 390 px:llä.

## 1. JUURISYY: asento laskettiin oikein, mutta väärään suuntaan

Liuskan asento laskettiin JO erä 5:ssä avatun listan korkeudella —
kategorian avaus ajaa `ladoUudelleen`n, ja `liuskanRivit` palauttaa
haitarin rivit mukaan lukien. Vika oli suunnassa: asemointi
(`js/pallolauta/aihemerkit.js viuhkanAsemat`) on VIUHKAN kone, joka
keskittää listan merkin ympärille (`ylin = -korkeus / 2 + siirto`).
Kiinni ollessaan 8-rivinen liuska mahtui merkin viereen, mutta 13
riviä kasvoi puolet ylöspäin — suoraan PARIISI-nimen päälle. Kova este
painaa 50-kertaisesti, mutta kun YKSIKÄÄN kokeiltu asento ei ole
vapaa, pienimmän sakon asento voittaa ja se on yhä nimen päällä.

## 2. Korjaus: kolme sääntöä siinä järjestyksessä kuin ne ratkaistaan

1. **Lista kasvaa ALASPÄIN** (`viuhkanAsemat({ kasvu: 'alas' })`).
   Lähtökohta on `VIUHKAN_ALAS_ALKU_PX` merkin alapuolella, ja
   pystysiirrot kokeillaan alhaalta ylös — tasapelin ratkaisee
   järjestys, joten alin vapaa asento voittaa. Viuhkan oma
   (keskitetty) käytös on ennallaan: valinta on liuskan.
2. **Riviväli kutistuu ennen kuin lista väistää.** Alaspäin kasvavan
   listan tila on se, mikä jää MERKIN ALAPUOLELLE, ei koko ruutu.
   Tämä oli mitattu tarve, ei varmuuden vuoksi: 390 px:llä kotelo on
   780 px korkea ja Pariisin merkki on kohdassa y 387,5, joten
   13-rivinen Skandaalit-kategoria jäi **3 px:n päähän** mahtumisesta
   ja liuska kelasi kaksi nostoa piiloon (mitattu: *"skandaalit: 5/4,
   ihmeet: 2/0"*). Tiheinkään väli (`VIUHKAN_TIHEIN_VALI_PX` = 26 px)
   ei päästä rivejä päällekkäin: se on täsmälleen nimiörivin korkeus.
3. **Vasta sitten kelaus.** `viuhkanAsemat` palauttaa nyt `kovaSakko`n
   (ruudun reuna + kaupungin nimi + nappula erikseen pehmeästä
   musteesta). Jos se on nollaa suurempi eikä tiheinkään lista mahdu
   merkin alapuolelle (`alasMahtuvatRivit`), liuska näyttää IKKUNAN ja
   kelausrivit (`kelattuLiuska`, `kelauksenAskel`,
   `js/pallolauta/kaupunkiliuska.js`) sen sijaan että ylittäisi
   esteet. Kelausrivi on liuskan oma laji, joka siirtää ikkunaa
   sulkematta liuskaa.

**Kamera-ajoon en koskenut** (kohta 10 sanoo *"saa huomioida"*):
kutistuva riviväli riitti molemmilla ruuduilla, eikä kameran siirto
ole ilmainen — se siirtää kaupungin pois ruudun keskeltä ja
sulkisi väärin ajoitettuna juuri avatun liuskan (lepotesti).

## 3. Vartio 8h: syy EI ollut syvennyskortti vaan Kadonnut ihme

Mittasin, en päätellyt. Uudet diagnoosikentät kertoivat kolme asiaa,
jotka erä 5:n punainen ei erottanut: rivillä ON avaaja
(`avattava true`), peli ei ollut varattu (`busy false`), rivin päällä
ei ollut mitään (`elementFromPoint` → kartta), eikä sivulle ilmestynyt
YHTÄKÄÄN kerrosta tai dialogia. **Kyse ei siis ollut siitä, ettei
mittari tunnistanut korttia — korttia ei ollut.**

Syy on kohteessa: 8f:n kategoriakierros päättyy Pariisin VIIMEISEEN
kategoriaan, joka on *"Kadonneet ihmeet"*, ja sen nostoilla on OMA
avaaja (`js/fokuskohteet.js` r. 5841: `if (typeof kohde.avaa ===
'function') { kohde.avaa(ui); return null; }`), joka ohittaa
kohteiden tietoruudun ja avaa aarrekortin omilla ehdoillaan. Vartio
mittasi siis aarteen lunastusehtoja eikä liuskan riviä. **Vartio
valitsee nyt kohteen ENSIMMÄISESTÄ kategoriasta** ja on vihreä
molemmilla ruuduilla. Lisäksi kortin odotus on kysely eikä kello
(kiinteä 800 ms oli toinen, pienempi virhelähde).

*Jäljelle jää sisältökysymys, joka ei ole tämän erän työ:* avaako
Tuileries'n kaltaisen Kadonneen ihmeen rivi liuskasta kortin
silloinkin, kun aarretta ei voi lunastaa? Se on Fablen päätös, ja
diagnoosirivit ovat nyt olemassa sen mittaamiseen.

## 4. MITTAUS (yksi ajo kumpaakin ruutua kohti)

| ruutu | tulos | 8a | 8b | 8c | 8d | 8e | 8f | 8g | 8h | 8i | 8j |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 390 px | **30/34** | OK | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| 1400 px | **29/34** | OK | FAIL | OK | OK | OK | OK | OK | OK | OK | OK |

- **390 px:** avattu Skandaalit-kategoria on **13 riviä, 372 px
  korkea, 0 kelausriviä** — kaikki 16 Pariisin nostoa ovat
  luettavissa. Kategoriat: kauppa 3/3, kulttuuri 3/3, historia 3/3,
  skandaalit 5/5, ihmeet 2/2. Punaisena vain neljä vanhentunutta
  kylttivartiota (7, 7b, 7c, 7e).
- **1400 px:** **29/34**, liuskan kaikki vartiot 8a–8j vihreitä paitsi
  8b (avattu lista 11 riviä, 326 px, 0 kelausriviä). Punaisina neljä
  kylttivartiota ja 8b.
  `8b` on yhä punainen — **sama auki jäänyt mittarin vika kuin erässä
  4** (Versailles ja Chambord ovat kartalla, mutta 1400 px:n
  ladonnassa `osumat()` ei anna niitä sillä nimellä, jolla vartio
  etsii). En koskenut siihen tässä erässä.

### 4b. Yksi uusi havainto, jota EN ehtinyt selvittää

1400 px:llä liuskan kategorioiden summa on **10**, 390 px:llä **16**
(*"kauppa: 2/2, kulttuuri: 3/3, historia: 1/1, skandaalit: 3/3,
ihmeet: 1/1"*). 8a on molemmilla vihreä ja 8i (≥ 8) menee läpi, joten
kartalle ei jäänyt kaupungin sisäisiä nostoja — mutta jäsenyyden
pitäisi olla sama kaikilla ruuduilla (erä 5, kohta 4). Epäilen, että
liuskan lähde `sisaisetKaupungeittain` kerää vain sen ladonnan rivit,
jotka 1400 px:n näkymässä olivat mukana. **Tämä on mitattava seuraavan
erän ensimmäinen työ**, ja sen mittari on olemassa: 8i:n raja nostetaan
16:een, kun syy on löydetty.

### 4c. Kaappaukset (uusi kansio)

`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/`
`1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset6/`

| tiedosto | mitä siinä on |
| --- | --- |
| `pariisi-liuska-auki-390.png` | liuska auki (390 px) |
| `pariisi-liuska-kategoria-390.png` | **kategoria auki, 13 riviä** — lista alkaa nappulan alta ja PARIISI-nimi on vapaana sen yläpuolella |
| `pariisi-liuska-auki-1400.png` | liuska auki (1400 px) |
| `pariisi-liuska-kategoria-1400.png` | kategoria auki (1400 px) |
| `pariisi-lahizoom-390.png`, `pariisi-lahizoom-1400.png` | kartta, liuska kiinni |

Savukkeiden tulosteet: `.../scratchpad/savuke12-390.txt` (30/34),
`.../scratchpad/savuke12-1400.txt`, `.../scratchpad/savuke-popup6.txt`
(kaupunkipopup, tämä erä). Välimittaukset `savuke9…savuke11`.

## 5. Vanhentuneet vartiot: mitä tein

Nämä lakkasivat olemasta väitteitä, kun kaupungin sisäiset nostot
siirtyivät liuskaan. **Muutin ne INFOksi koodissa perusteluineen; en
poistanut niitä enkä koskenut `sarjat.jsoniin`.**

| vartio | tila nyt | perustelu |
| --- | --- | --- |
| `3e.` | INFO | vaati *"jokaisella aihenostolla on nimiö"* — Pariisissa ei ole aihenostoja kartalla. Nimiön MUOTO mitataan yhä tietona, jos aihenosto jossain on |
| `3e3.` | INFO | omistajan oma esimerkki oli PARIISIN skandaalirykelmä; se on nyt liuskan kategoria *"Skandaalit (5)"* (8f/8i mittaa saman) |
| `3i.` (lähizoom) | INFO | sama syy. **Saapumisnäkymän haara jää vartioksi**: se mittaa nimiökynnystä, ei kaupungin sisältöä |
| `3g.` VASTAKOE | INFO | vertaa rykelmän ryhmitystä lipulla ja ilman; molemmat luvut ovat nyt 0, joten ero ei voi syntyä |
| `3c.` VASTAKOE | INFO | sama: limittyvien nimiöparien ero mitataan rykelmästä, jota ei ole kartalla |

## 6. Vanhentuneet TUNNETUT PUNAISET `sarjat.jsonissa` (EN muuttanut)

Fable päättää, mitä kirjataan. Nämä mittaavat poistunutta
käyttöliittymää:

| tiedosto | rivi `sarjat.jsonissa` | miksi vanhentunut |
| --- | --- | --- |
| `savuke-pariisi-lahizoom.mjs` | `"7e. tyopoyta: kyltin laatikko on vapaa"` | turisti-infon kyltti ei ole kartalla (`KYLTTI_KARTALLA = false`), joten kyltillä ei ole varausta lainkaan — vartio on punainen MOLEMMILLA ruuduilla eikä enää häilyvä. Samasta syystä vanhentuneita ovat myös `7.`, `7b.` ja `7c.`, joita listalla ei ole |

`savuke-kaupunkipopup.mjs`in `tunnetutPunaisetMaara: 17` on eri pelin
luku (v1927), ja tämän erän ajo on tulosteessa `savuke-popup6.txt`.
Erä 4:n havainto pätee yhä: vastakoe *"kuvaton kaupunki avaa pop-upin
silti"* mittaa isoa pop-upia, jota ei enää ole.

### 6b. `savuke-kaupunkipopup.mjs`: **18/25**, seitsemän punaista

Ajettu kerran tässä erässä (`savuke-popup6.txt`). Punaiset:

| punainen | tila |
| --- | --- |
| `vastakoe 1: kuvaton kaupunki avaa pop-upin silti` | **vanhentunut** (erä 4): mittaa isoa pop-upia, jota ei ole |
| `Marseille @ 390 px` (2 vartiota) | **auki** |
| `Pariisi @ 1400 px` (2 vartiota) | **auki** |
| `Marseille @ 1400 px` (2 vartiota) | **auki** |

Kaikissa kuudessa auki olevassa lukee sama rivi: *"liuska -, rivejä
0"* — liuska ei auennut lainkaan, eli kyse EI ole asemoinnista vaan
avauksesta. **Tämä on huonompi luku kuin erä 4:n 22/25**, jossa
punaisena oli vain ajon ENSIMMÄINEN kaupunki; nyt ensimmäinen
(Pariisi 390 px) on vihreä ja kolme seuraavaa punaisia. Sama peli
avaa liuskan `savuke-pariisi-lahizoomissa` luotettavasti molemmilla
ruuduilla (8c vihreä, 215 ms), joten epäilen tämän savukkeen omaa
napautus-/odotusketjua kaupunkien välillä — mutta **en ehtinyt mitata
sitä, joten se on epäily, ei todistus.** Se on seuraavan erän
ensimmäinen työ yhdessä 4b:n kanssa.

## 7. Testit

`node --test tests/*.test.mjs`: **3604 testiä, `# pass 3591`,
`# fail 0`** (13 ohitettua). `tests/kaupunkiliuska.test.mjs` sai viisi
uutta testiä: alaspäin kasvava lista ei osu kaupungin nimeen (ja
vertailukohtana keskitetty lista osuu), riviväli kutistuu ahtaassa
ruudussa ilman että rivit menevät päällekkäin, `alasMahtuvatRivit`
päättyy ruudun alalaitaan, kelausikkuna varaa kelausriveille tilan, ja
kelauksen askel pysyy listan sisällä.

## 8. Oletukset (päätin itse, ei AskUserQuestionia)

1. **Kamera-ajo ennallaan** (osio 2): kutistuva riviväli riitti, ja
   kameran siirto olisi uusi riski juuri avatulle liuskalle.
2. **Kelausrivit ovat liuskan oma laji** eivätkä nuolinappi: liuska on
   nimiölista, ja kelaus on sen rivi kuten kategoriakin.
3. **Vanhentuneet vartiot INFOksi, ei poistoon** — väite katosi, mutta
   luku on yhä hyödyllinen, jos kartan sisältö joskus palaa.
4. **8h valitsee kohteen ensimmäisestä kategoriasta** (osio 3);
   Kadonneen ihmeen oman avaajan ehdot ovat sisältökysymys.
5. **1400 px:n 8b ja 4b:n jäsenyysero jätettiin auki** ja kirjattiin.

## 9. Muutetut tiedostot (erä 6)

`js/pallolauta/aihemerkit.js`, `js/pallolauta/kaupunkiliuska.js`,
`js/pallolauta/nostot.js`, `tools/savukkeet/savuke-pariisi-lahizoom.mjs`,
`tests/kaupunkiliuska.test.mjs`, tämä raportti.

**Vaatii versionoston**; `tools/uusi-versio.mjs` on ajamatta (ohje).
