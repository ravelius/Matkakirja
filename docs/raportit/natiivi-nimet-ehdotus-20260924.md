# Natiivin paikannimet: mitä web näyttää ja miten natiivi saa samat

Karttaseppä 24.9.2026 klo 17.30 Fablelle (LÖYDÖS 38). Tämä on selvitys ja
ehdotus: mitään ei poltettu, ämpäriin ei kirjoitettu eikä proto-3d:tä
muutettu. Web-viitteet ovat repon juuresta. Natiivin viitteissä **A** =
`/Users/Shared/Claude/proto-3d/Matkakirja-proto/Assets/Matkakirja`; luettu
proto-haarasta `testi/b10d`. Ämpäristä luettiin `pyramidi.json`, pallon
`laatat.json` ja sisältöpaketti v54/v55.

## Tiivistelmä

- **Webissä vain yksi nimiryhmä on poltettu lähizoomin laattoihin**: nimiötaso
  `2026-09-22g-nimiot` (erillinen läpinäkyvä Miller-pyramidi z4–z8). Siinä on
  195 riviä: 65 maakuntaa (CHAMPAGNE), 86 nykyaluetta (Grand Est), 29 merta,
  7 rajaviivaa ja 8 kuvakoristetta. Kaupungit ja kaikki nostojen nimet
  (Verdun, Reims) ovat **eläviä**.
- **Natiivin pohjasarjat on poltettu Mercatoriksi pyramidista ilman
  nimiötasoa.** `tools/tee-pallolaatat.mjs` yhdistää vain pohjan, rannan,
  viivat ja nostot, ei nimiötasoa. Tästä syystä CHAMPAGNE ja Grand Est
  puuttuvat natiivista. Verdun ja Reims ovat natiivin nostokerroksen
  (`karttavalot`) asioita, eikä niiden puuttuminen johdu poltosta (ks.
  kysymys N1).
- **Nimiötason data on jo julkisesti olemassa lon/lat-muodossa**:
  `pyramidi.json` → `nimiotaso.nimiot`, jossa on teksti, luokka, lon, lat,
  iso, koko ja ladottu laatikko tasoittain. Paketissa on siitä vain osa:
  `nimisto-1873` sisältää 121 riviä, ei nykyalueita.
- **Suositus: b (elävät nimet samasta vektoridatasta)**, samalla
  billboard-kaavalla, jolla natiivin kaupunkinimiöt jo toimivat kallistuksessa
  ja pyörityksessä. Poltettu nimisarja (c) ei käänny eikä skaalaudu, ja se
  vie Cesiumin viimeisen raster-paikan.

---

## a) Webin nimikerrokset

### a1. Poltetut

| Kerros | Sisältö | Tasot | Tyyli | Lähde |
|---|---|---|---|---|
| **Pohjalaatta: valtameret** | 7 valtamerta (TYYNIMERI, ATLANTIN VALTAMERI …) | vain px ≤ 0,5 eli z0–z3 (pallon Z1–Z4) | Liberation Serif kursiivi, koko 34–49, harvennus 0,34 × koko, `rgba(112,99,76,.62)`, ei haloa | `tools/generoi-laattapyramidi.mjs:292-300` (MERET), piirto `tools/fokuskartta/maailmapiirto.js:1598-1610`, raja `:1566-1567` |
| **Pohjalaatta: kartussi** | "MATKAKIRJA / Unohdettu aarre", painajanrivi | arkin reuna | italic 25/21 | `generoi-laattapyramidi.mjs:244-248`, `maailmapiirto.js:2241-2306`. Pallo rajaa tämän pois (`js/pallolaatat.js:291-300`) |
| **Nimiötaso (nimiöshardi)** `2026-09-22g-nimiot` | 195 riviä: maakunta 65, nykyalue 86, meri 29, raja 7, kuva 8 | z4–z8 (rivin `tasot`) | ks. alla | `generoi-laattapyramidi.mjs:649-659`, ladonta `:2161-2300`, piirto `maailmapiirto.js:4256-4323`, `:4652-4783`; poltto `tools/polta-paikallisesti.sh:290-295`, `:912-918`, `:1417-1431` |
| **Nostotaso** `nostotasot[ISO]` 2026-09-23a-nostot | vain merkit, kaikilla 112 maalla `nimiot:false` | z5–z8 | — | `generoi-laattapyramidi.mjs:1342-1362`. Kohdemaan nostolaattoja ei edes ladata (`js/laattapyramidi.js:440-464`) |
| Viivataso, rantataso, pohjan joet | ei tekstiä | | | `maailmapiirto.js:1929-1966` (omistajan päätös 30.8.: kaupunkien, vuorten ja järvien nimet eivät kuulu laattoihin) |

**Nimiötason tyyli** (`maailmapiirto.js:4256-4323`):

- Fontti on `"Liberation Serif","FreeSerif",serif`, paino normaali, ei kursiivia eikä haloa.
- Maakunnat ja meret ovat versaalia, harvennus 0,32 em. Nykyalueet ovat pienkapiteeleja: sanan alkukirjain täysikokoinen, muut kirjaimet 0,78.
- Kirjainkorkeus px laattatasoittain (`NIMION_KOOT`):

| luokka | z4 | z5 | z6 | z7 | z8 |
|---|---|---|---|---|---|
| meri | 14 | 18 | 24 | 34 | 46 |
| maakunta (suuri) | – | 13 | 17 | 24 | 32 |
| maakunta (pieni) | – | – | – | 18 | 26 |
| nykyalue | – | – | – | 16 | 22 |
| nykyalue (pieni) | – | – | – | – | 18 |

- Värit: meri `rgba(58,66,84,.62)` ja sen alla aaltomerkki. Maakunta `rgba(70,48,29,.58)`. Nykyalueilla on muste ruoste `.60`, ruoste-vahva `rgba(128,44,20,.95)` tai sepia `.36` (rivin kenttä `muste`).
- Raja-rivit ovat viivoja (leveys 1,0/1,5/2,2 z6–z8), eivät nimiä. Kuva-rivit ovat koristeita (kompassi, laiva).
- Ladonta tapahtuu polttohetkellä:
  - Esteinä ovat laudan kaupungit, poltettavat nostot (z ≥ 5), joet (z ≥ 6) ja jo ladotut nimiöt.
  - Kukin nimiö kokeilee 17 siirtoaskelta (`NIMION_VAISTO_ASKELIA`).
  - Pudotus: koriste aina, maakunta z ≤ 5 ja nykyalue z7, jos tilaa ei ole.
  - Leveysarvio on 0,66 × korkeus × merkkimäärä.
- Tuotannon nimistö-JSON (222 riviä ennen `aika=pysyva`-suodatusta) **ei ole repossa**, vaan ajokansiossa (`ajo-20260922/nimiot-poltto-4.json`). Lähin repokopio on `docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/nimiot-vedos4.json`. Luettelon `nimiotaso.nimiot` on kuitenkin ämpärissä julkinen, ja siinä on jokaisesta rivistä id, luokka, teksti, lon, lat, iso, meri, koko ja `laatikot[z]` (ladottu ala asteina).

### a2. Elävät

| Kerros | Sisältö | Näkyvyys | Tyyli | Lähde |
|---|---|---|---|---|
| **Laudan kaupungit** | `maailmankartta.js` CITIES | budjetti 6–40 nimeä korkeuden mukaan, piste ruudulla | "Iowan Old Style", Palatino, Georgia. Pääkaupunki/lentokenttä 15 px, muut 13,5 px × karttakerroin. `small-caps`, harvennus 0,14 em, `rgba(103,88,73,.92)`, ei haloa | `js/pallolauta/nimet.js:149-223`, `js/karttanimet.js:234`, `:293-305`, `:388`, `:433`; GL `js/pallonimiot-gl.js`, `js/pallolauta/nimiorasterit.js:60-95` |
| **Karttanostot ja maastonimet** (vuori, meri, joki, järvi, historia …) | `maastokohteet-*`, `hahmotelma-*`, `maalehtinostot-fra`, `nakyvat-kaupungit-fra` jne., koottuna `js/fokuskohteet.js`:ssä | vain kohdemaan nostot ja vasta kun maan lehti täyttää näkymän. Elävien katto 120. Merinosto ohitetaan, jos nimiötaso jo nimeää meren | `--font-atlas` (Liberation Serif) italic, `rgba(74,52,33,.92)`. Koko 11 × mitta, katto 16 px, lähizoomissa 22 px. Taso 1 × 1,3 ja muste `rgba(46,30,14,.98)`. Meri versaalia, harvennus 0,28 em, `rgba(120,108,84,.72)` | `js/pallolauta/nostot.js:96`, `:480`, `:928`, `:1963-1970`; `js/fokusnosto-symbolit.js:1667-1725`, `:1859-1870`; `css/styles.css:25319-25338` |
| **Nostojen ikonit** | viivamerkit piirretään koodissa (`NOSTOSYM_PIIRTAJAT`); tason 1 kuvamerkit `assets/nostotyypit/merkki-<laji>.png` | kuten yllä | | `js/fokusnosto-symbolit.js:2526-2556` |
| Kaupunkiliuskan rivit, turisti-info | Nähtävyydet, Turistiopas | kaupunkinäkymä | | `js/kaupunkiliuska-nimiot.js:15-17`, `js/kaupunkinosto.js` |

- **Törmäys (elävät):**
  - Kaupungit ladotaan `ladoRuutunimet`-funktiolla: pelinappula varataan ensin, sitten kokeillaan ehdokaskehää ja paikka lukitaan.
  - Nostolaput sovitellaan tiedostossa `js/pallolauta/sovittelu.js`: kahdeksan asentoa ja häivytys, prioriteettijärjestys kaupunki > taso 1 > taso 2 > taso 3, hystereesi 6 px.
- **Nimiölukko** (v2142, `docs/raamattu-loki/paatokset-2026-09.md:1675`, `:1687`): ruudulla oleva nimiö ei vaihda puolta panoroinnissa eikä zoomissa. Jos kylki on tukossa, nimiö häipyy paikallaan. Mittari: `tools/savukkeet/savuke-nimiolukko-veto.mjs`.
- **Tunnettu puute webissä:** elävä sovittelu ei tunne poltetun nimiötason laatikoita. Reims tai Verdun voi siis osua CHAMPAGNEn tai Grand Estin päälle.

### a3. Champagnen kohta (49,0°N 4,0°E) webissä

| Nimi | Kerros | Lähde | Näkyvyys |
|---|---|---|---|
| CHAMPAGNE | poltettu nimiötaso, maakunta suuri | `js/packs/nimisto-1873.js:101` (4,5 / 48,9) | z5–z8, 13/17/24/32 px |
| Grand Est | poltettu nimiötaso, nykyalue, ruoste-vahva | nykyalue-JSON (4,9 / 48,95) | z7 jos mahtuu, z8 aina, 16/22 px |
| Verdun | elävä nosto (`douaumont`, `nimio: 'Verdun'`) | `js/packs/maastokohteet-fra.js:885-908` (5,42 / 49,21) | kun Ranska on kohdemaa |
| Reims | elävä hahmotelmanosto (`lahi: true`) | `js/packs/hahmotelma-fra.js:594-630`, ankkuri `nostoankkurit-fra.js:81` | kuten Verdun |

Lisäksi alueella näkyvät nimiötasolta LORRAINE, PICARDIE ja ÎLE-DE-FRANCE (z7+). Jokien nimiä (Marne, Meuse) ei ole: joet ovat pohjassa nimettöminä.

---

## b) Elävät nimet natiivissa samasta vektoridatasta

### b1. Mitä natiivissa on nyt

- **Kaupunkinimiöt** (`A/Kartta/KaupunkiMerkit.cs`):
  - Tekniikka: TextMeshPro 3D-maailmassa, `CesiumGeoreference`n lapsina. Sijainti on lon/lat → ECEF → Unity (`:279-314`).
  - Kallistus ja pyöritys: nimiö kääntyy joka kehys kameraan päin (`:459`), ja koko pysyy vakiona näytön pisteinä (`:458`). **Toimii siis jo kallistuksessa ja pyörityksessä.**
  - Horisonttipiilotus: `dot > 0.12` (`:448-450`).
  - Törmäys: ahne harvennus joka `LateUpdate`ssa järjestyksessä tarkeys 3→0 (`:355`, `:462-477`).
  - Tyyli: EB Garamond 13/15 pt, väri (0.20, 0.15, 0.10) ja outline-halo.
  - Kaikki 266 kaupunkia ovat aina olemassa. Nimiöille ei ole mittausta eikä budjettia.
- **Nostojen nimiöt** (`A/UI/NostotKartalla.cs`):
  - Tekniikka: UI Toolkit -overlay, `WorldToScreenPoint` → `ScreenToPanel`.
  - Törmäys: union-find-ryhmittely 44 px:n säteellä (`:153-188`).
  - Tyyli: 11/13,5 px (`A/UI/Resources/MatkakirjaUI/Kartta.uss:1663-1673`).
  - Portti: `NostoKerros` avautuu, kun maan fokuspohja täyttää näkymästä ≥ 0,5 (`A/Kartta/NostoKerros.cs:156-214`). Katto 120.
- **Linssien 3D-nimet** noudattavat samaa kaavaa:
  - Isoisä 1873 (`A/Linssit/Unity/IsoisaKerros.cs`, `A/Linssit/Ydin/Isoisa/Isoisa1873.cs:116-157`) lukee jo `nimisto-1873`:n, ja siinä on korkeusrajat ja törmäys arvojärjestyksessä. **Tämä on lähin valmis malli.**
  - Lisäksi maiden nimet ja vesistöt.
- **Raster-paikat:** Cesiumissa on kolme paikkaa, jotka ovat kaikki käytössä: 0 pohja, 1 lento/linssi, 2 kermahuntu/linssi (`A/Kartta/KarttaKerrokset.cs:162-191`, `A/Kartta/Varitaso.cs`).
- **Fontit:** `A/Fontit/EBGaramond.ttf` (SDF) ja `Assets/TextMesh Pro/Fonts/LiberationSans.ttf`. **Liberation Serif puuttuu.** UI Toolkit käyttää järjestelmäfontteja (`A/UI/Kirjasimet.cs:31-50`).

### b2. Data: mitä on ja mitä puuttuu paketista

| Aineisto | Missä nyt | Muoto | Natiivissa |
|---|---|---|---|
| Kaupungit (266) | paketti `kokoelmat/kaupungit.json` | lat, lon, tarkeys 0–3, `nimionAnkkuri` | käytössä (`nimionAnkkuri` käyttämättä) |
| Nostot (2960, joista 2736 nimiöllistä) | paketti `karttavalot` | nimi, nimio, lat/lon, aihe, tarkeys, taso, lahizoom | käytössä |
| Maastonimet (213: joet, järvet, vuoret) | paketti `kokoelmat/maastonimet.json` | lat/lon, tarkeys 1–3, jokien `viiva` | **ei käytössä** (webissäkin vain tasokartalla) |
| Maakunnat 1873 + meret (121) | paketti `moduulit/js/packs/nimisto-1873.json` | teksti, luokka, lon, lat, iso, koko, aika | vain isoisän linssi |
| **Nykyalueet (86)**, rajarivit (7), kuvat (8) | **vain** tuotannon polttokansion JSON ja julkinen `pyramidi.json` `nimiotaso.nimiot` | kuten yllä + `muste`, `laatikot[z]` | **puuttuu paketista** |
| Valtameret (7) | `generoi-laattapyramidi.mjs` MERET | nimi, lon, lat, koko | poltettuna pallon pohjaan Z1–Z4 (riittää) |
| Nimiötyyli (koko/väri/harvennus tasoittain) | koodissa `maailmapiirto.js` | — | puuttuu (vientiin taulukkona) |

### b3. Työ

**Karttaseppä ja Siirtoseppä: vienti, noin 1 päivä**

1. Tuodaan tuotannon nimistö-JSON (`nimiot-poltto-4.json`, 222 riviä) repoon, jotta se on toistettava lähde. Ehdotettu polku on `assets/data/karttanimet.json` tai `js/packs/`. Myös seuraava web-nimiöpoltto lukee sitä.
2. Siirtoseppä lisää kokoelman `karttanimet`:
   - rivit: `{ id, teksti, luokka: meri|maakunta|nykyalue, koko, iso, lon, lat, tasot, muste, kulma?, laatikot? }`
   - `tyylit`-taulukko: luokka → fontti, versaali/pienkapiteeli, harvennus em, väri rgba, koko tasoittain `NIMION_KOOT`-taulukosta. Aika-suodatus `pysyva` on tehtävä samoin kuin poltossa.
   - Skeemaan tarvitaan uusi versio, skeemasopimus ja validointi.
3. Laattatasot muunnetaan natiivin korkeudeksi. Tasolla z on 30 · 2^(z−4) px/aste (z4 = 30, z8 = 480). Muunnos kaavalla px/aste = H / (2 · h · tan(fov/2)) · 111,32 km antaa, kun H = 1024 pt ja fov = 60°, noin seuraavat korkeudet: z4 ≈ 3 300 km, z5 ≈ 1 650 km, z6 ≈ 820 km, z7 ≈ 410 km ja z8 ≈ 205 km. Vientiin kirjataan tasot eikä korkeuksia, ja muunnos tehdään natiivissa, koska fov ja resoluutio ovat sen tietoa.

**Natiiviseppä: piirto, arviolta 3–4 päivää**

- **NimiKerros.** Yleistetään `KaupunkiMerkit` / `IsoisaKerros`-kaava: TMP-billboard, vakiokoko pisteinä ja koko- ja näkyvyyskaistat korkeuden mukaan. Rivit ovat meret, maakunnat, nykyalueet ja maastonimet. Arvio 1–1,5 päivää.
- **Yhteinen ruututörmäys** kaupungeille, nostoille ja aluenimille. Nyt kaupungit ja nostot ovat kaksi erillistä järjestelmää, jotka eivät tunne toisiaan. Webin puute F1 kannattaa välttää heti.
  - Ehdotettu prioriteetti: kaupunki tarkeys 3 > nosto taso 1 > meri > maakunta > nykyalue > muut kaupungit > nostot 2–3 > maastonimet.
  - Nimiölukko: puoli ei vaihdu, törmäyksessä häivytys.
  - Arvio 1 päivä.
- **Tyyli.**
  - Liberation Serif SDF (SIL OFL, sallittu) tai päätös käyttää EB Garamondia.
  - TMP `characterSpacing` harvennukseen ja `<smallcaps>` nykyalueisiin.
  - Aaltomerkki merille: sprite tai jätetään pois.
  - Arvio 0,5 päivää.
- **iPad-mittaus** kehysmittarilla (`A/Kartta/KehysMittari.cs`) liikkeessä ja levossa. Arvio 0,5 päivää.

### b4. Riskit

- **Törmäys:**
  - Nykyinen O(n·k) joka kehys ei skaalaudu, jos nimiä on satoja.
  - Ratkaisuksi korkeuskaistan esisuodatus (näkyvillä tyypillisesti alle 150), ruutuhila ja ladonta vain kameran muuttuessa tai 50–120 ms välein. Isoisän linssissä on jo jarru 0,15 s.
  - Nimiölukko vaatii tilan (puoli per nimi).
- **Fontit:**
  - Dynaaminen SDF-atlas 1024² ja merkit Î, É, Ä, Ö, ô. Esilämmitys tarvitaan, koska OpenType-taulujen luku vie noin 11 ms.
  - Toinen fontti (Liberation Serif) tarkoittaa toista atlasta.
- **Suorituskyky:**
  - Jokainen TMP-olio on oma mesh. 800 oliota olemassa ja noin 150 näkyvissä on luultavasti kunnossa, mutta se on mitattava.
  - Varasuunnitelmana yksi yhdistetty tekstimesh tai GPU-instansoitu SDF.
- **Kallistus ja pyöritys:**
  - Billboard pysyy luettavana, mutta aluenimi kelluu pystyssä eikä ole painettuna kartalle kuten webissä. Se on hyväksyttävää ja sama kuin kaupungeilla.
  - Vakiokoko pisteinä tihentää nimiä horisontin suunnassa. Tämä korjataan kaistalla, joka laskee etäisyyden eikä pelkkää kameran korkeutta, tai häivyttämällä kaukaiset nimet kallistuksessa.
- **Sijainti:**
  - Nimiötason `lon/lat` on nimen keskipiste.
  - Webin poltetut laatikot on ladottu Millerissä polttohetken esteitä vasten, joten niitä ei kannata käyttää sellaisenaan. Keskipiste ja elävä törmäys riittävät.
- **Kaksoispiirto:** jos jokin tuleva pohjasarja poltetaan nimien kanssa, sama nimi näkyy kahdesti. Pohjasarjat on pidettävä nimettöminä, kuten nyt.

### b5. Kysymykset Natiivisepälle

- **N1.** Miksi Verdun (`douaumont`) ja Reims (hahmotelma) eivät näy Champagnen lähizoomissa? Onko `NostoKerros`-portti (fokuspohjan osuus ≥ 0,5) kiinni lähizoomissa, vai puuttuvatko hahmotelmat `karttavalot`-kokoelmasta?
- **N2.** Laajennetaanko `KaupunkiMerkit`iä vai rakennetaanko `IsoisaKerros`-pohjalta yleinen `NimiKerros`? Siirretäänkö nostojen nimiöt samaan ruututörmäykseen, vai jäävätkö ne UI Toolkitiin?
- **N3.** Mikä on iPadin budjetti samanaikaisesti näkyville TMP-nimiöille? Onko yhdistetty tekstimesh tarpeen?
- **N4.** Kumpaa fonttia käytetään aluenimiin: Liberation Serif (web on oletus, vaatii uuden SDF-atlaksen) vai EB Garamond?
- **N5.** Riittävätkö korkeuskaistat (z → km, taulukko b3), vai halutaanko näkyvyys näytön px/aste-mittana (fov ja kallistus huomioiden)?
- **N6.** Miten nimet käyttäytyvät kallistuksessa: häivytetäänkö kaukaiset, ja millä etäisyydellä?
- **N7.** Tarvitaanko nimiölukko (puoli ei vaihdu) natiivissa heti vai toisessa vaiheessa?
- **N8.** Otetaanko `kaupungit.nimionAnkkuri` (tasaus, dx, dy) käyttöön, jotta nimen puoli vastaa webiä?
- **N9.** Kaupungit ovat nyt ainoa 3D-nimiö ilman korkeusrajaa. Pitääkö aluenimet ja kaupungit tasapainottaa samalla budjetilla?

---

## c) Vaihtoehto: oma poltettu nimisarja natiiville

### c1. Työkalupolku

1. **Nimiötason sisältö.** Nykyinen nimiötaso kattaa vain maakunnat, nykyalueet ja meret. Webin kaltainen kokonaisuus vaatii:
   - kaupunkien nimet laattaan. Tämä on koodimuutos, koska kaupunkinimet ovat nimiötasolla vain esteitä, ja se kumoaa päätöksen 30.8. natiivin osalta.
   - nostojen nimet ilman lippua `--nostot-ilman-nimioita` (nostotaso maittain),
   - maastonimet.
2. **Polttoaikataulu.** Nimiöshardi on nyt **yksi prosessi** (`polta-paikallisesti.sh:912-918`), joten se pitäisi jakaa shardeihin.
3. **Mercator-muunnos.** `tools/tee-pallolaatat.mjs` ei tunne nimiötasoa, ja se kirjoittaa vain jpg-kuvia ilman alfaa. Tarvitaan uusi tila, joka kokoaa vain läpinäkyvät kerrokset (nimiöt ja nostot) RGBA-webp- tai png-sarjaksi. Koodityö on arviolta 0,5–1 päivää.
4. **Natiivissa ei ole vapaata raster-paikkaa.** Vaihtoehdot:
   - Poltetaan nimet pohjasarjan versioon "pohja+nimet". Tällöin nimiä ei voi kytkeä pois, ja lennolle ja linsseille tarvitaan nimetön rinnakkaissarja.
   - Poltetaan nimet kermahuntuun. Se kattaa vain Z5–Z8 ja on maakohtainen.
   - Lisätään Cesiumin materiaaliin neljäs paikka (shadergraph-muutos).

### c2. Kesto

- **Miller-nimiötaso** z4–z8 kaupunkeineen ja nostonimineen: kattavuus on noin viivatason luokkaa, eli 76 + 402 + 1 116 + 2 982 + 7 349 ≈ 12 000 laattaa (nykyinen nimiötaso 640).
  - Läpäisy on noin 25 laattaa/s kaikilla 16 ytimellä, eli noin 1,6 laattaa/s ydintä kohden.
  - Päivällä 4 rinnakkaisella shardilla noin 6 laattaa/s → **noin 35 min**. Nykyisellä yhden shardin ajolla noin **2 h**.
- **Mercator-sarja:** noin 4 Mercator-laattaa kutakin Miller-laattaa kohden, harvaa nimisisältöä. Arvio 15 000–25 000 laattaa.
  - Pallon sarja on mitattu noin 8 laattaa/s prosessia kohden, ja noudot ovat tahditettuja.
  - 4 rinnakkaisella **noin 15–30 min**.
- **Lähizoomi Z9–Z11** (natiivin syvä sarja, Ranska) vaatii omat nimitasot, koska Z8:n teksti venyisi 2–8-kertaiseksi. Miller z9–z10 on noin 3 800 laattaa ja Mercator Z9–Z11 noin 10 000 → **noin 1 h lisää**.
- **Yhteensä:** noin 2–3 h konetta per nimiversio päiväsäännöllä, sekä 2–3 päivää koodia (kaupunkinimien poltto, shardijako, RGBA-Mercator-tila ja natiivin raster-paikka).

### c3. Haitat

- **Kallistus.** Teksti on painettu maastoon. Kallistuksessa se lyhenee ja vääristyy Cesiumin maastolla, joka on korotettu.
- **Pyöritys.** Kun suunta on noin 180°, kaikki nimet ovat ylösalaisin. Tämä on ristiriidassa löydösten 30–31 kanssa.
- **Skaalaus.**
  - Teksti kasvaa 1–2-kertaiseksi tasojen välillä ja hyppää tasonvaihdossa.
  - Kallistetussa näkymässä Cesium valitsee eri tasot eri etäisyyksille. Laatan rajan ylittävä nimi voi silloin näkyä puoliksi z7:nä ja puoliksi z8:na (katkennut nimi).
  - Lähellä nimet ovat suuria, kaukana pieniä ja sumeita.
- **Törmäys.** Poltettu taso ei väistä eläviä kaupunkeja eikä nostoja. Tämä on sama vika kuin webissä (a2).
- **Vuorovaikutus.** Ei napautusta, ei nimiölukkoa eikä korostusta. Kielen tai nimen muutos vaatii uuden polton ja uuden version.
- **Ämpäri.**
  - Nimiölaatat ovat 3–10 kt (webp). Miller noin 12 000 × 6 kt ≈ 70 Mt ja Mercator noin 20 000 × 4 kt ≈ 80 Mt, jokaiselle versiolle erikseen (muuttumaton välimuisti).
  - Offline-paketti kasvaa samassa suhteessa.
- **Raster-paikka.** Nimisarja vie paikan linsseiltä tai huntuun yhdistettynä sitoo huntu- ja nimiversiot yhteen.

### c4. Mihin poltto kelpaa

Valtamerten nimet ovat jo pallon pohjassa Z1–Z4. Ne näkyvät vain pallotasolla, ja siellä litteä teksti on luonteva: se kannattaa pitää. Raja-rivit (7 historiallista rajaviivaa) ovat viivoja eivätkä nimiä. Jos ne halutaan natiiviin, ne kuuluvat vektoreiksi maakuntarajojen tapaan.

---

## Suositus

**b, elävät nimet.** Fablen suositus pitää.

- Natiivin kaupunkinimiöt todistavat, että billboard-TMP toimii jo kallistuksessa ja pyörityksessä. Aluenimet ovat saman kaavan laajennus eivätkä uusi tekniikka.
- Data on olemassa. Puuttuvat nykyalueet saadaan pakettiin noin päivän vientityöllä.
- c ei täytä löydösten 30–31 ehtoja (ylösalaisin, katkenneet nimet, venyminen). Se vaatisi lisäksi raster-paikan, jota ei ole, sekä oman polton jokaiseen nimimuutokseen ja jokaiselle syvälle tasolle.
- Rehellinen varaus: b:n riski on iPadin suorituskyky ja törmäyksen laatu satojen nimien kanssa. Kumpaakaan ei ole mitattu. Ensimmäinen erä kannattaa rajata Ranskaan (CHAMPAGNE, Grand Est ja naapurit) ja mitata ennen maailmanlaajuista käyttöönottoa.

**Ehdotettu järjestys:**

1. Karttaseppä vie nimistö-JSONin repoon.
2. Siirtoseppä tekee kokoelman `karttanimet` ja tyylitaulukon.
3. Natiiviseppä tekee NimiKerroksen ja yhteisen törmäyksen Ranskaan ja mittaa iPadilla.
4. Laajennetaan maailmaan.

## Päätöstä vaativat kohdat

1. **b vai c** (suositus b).
2. **Fontti natiivin aluenimiin:** Liberation Serif kuten webissä (uusi SDF, OFL) vai EB Garamond.
3. **Nimistö-JSONin kotipaikka repossa** ja se, että sama tiedosto on sekä web-polton että natiivin viennin lähde.
4. **Ovatko maastonimet (213) natiivin kartalla,** vaikka webissä ne ovat vain tasokartalla?
5. **Aluenimien ulkoasu kallistuksessa:** billboard pystyssä (suositus) vai maahan painettu 3D-teksti (monimutkaisempi).
6. **Yhteinen törmäys ja prioriteettijärjestys** kaupungeille, nostoille ja aluenimille (ehdotus b3). Sama korjaus kannattaisi tehdä webiin (puute a2).
