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
