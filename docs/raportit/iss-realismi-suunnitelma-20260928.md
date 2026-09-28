# ISS-realismi: kaupunkien valot ja kohdat 1–4 (Linssiseppä 28.9.2026)

*Omistaja 28.9.2026 klo 12.3x (loki "ISS-REALISMI", Fablen kautta): kaupunkien valot yöpuolelle ja kortilla kaikki neljä
realismikohtaa. Tavoite: ISS-näkymä näyttää siltä, mitä astronautti juuri nyt näkee. Natiivi tehdään ensin (lupa poiketa
webistä erän ajan). Web siirtää arvot: kaupunkien valot Pelikoodari, kohdat 1–4 Siirtoseppä. Kustakin kohdasta kuvapari
Fablelle. Lähteet vain PD tai CC.*

Proto-haara on `linssiseppa/iss-kyyti`. Kaikki kerrokset näkyvät vain kyydissä (seuranta ja ikkuna); kaukonäkymä pysyy
ennallaan.

## Tila

| kohta | natiivi | data | web |
|---|---|---|---|
| Kaupunkien valot | 8d791254 | ämpärissä | Pelikoodari |
| 1 Heijastus ja varjostus | 34a5a5d5 | ämpärissä | Siirtoseppä |
| 2 Tämän päivän pilvet | renderöijä tekeillä | Julkaisijan ajastettu haku (alla) | Siirtoseppä |
| 3a Hämärä ja ilmahehku | 4e7f3b1d | ei dataa | Siirtoseppä |
| 3b Revontulet | renderöijä tekeillä | Julkaisijan ajastettu haku (alla) | Siirtoseppä |
| 4a Kuukauden pinta | Karttasepän poltto | Blue Marble NG (alla) | Siirtoseppä |
| 4b Kuu | tekeillä | laskenta | Siirtoseppä |
| 4c Tähdet | tekeillä | Yale Bright Star -luettelo ämpäriin | Siirtoseppä |

Laitteella todentamatta ovat vielä kaupunkien valot, kohta 1 ja kohta 3a. Laiteajo on seuraava, kun kevyt tila päättyy
klo 17.

## Kaupunkien valot (natiivi 8d791254)

- **Data:** NASA Black Marble (PD), Karttasepän sarja `julisteet/pallo/yovalot/2026-09-25/{z}/{x}/{y}.jpg` (XYZ).
  Koottuna yhdeksi kuvaksi kumpaankin:
  - `linssit/astronautin-kamera/iss-yovalot-2026-09-28/eurooppa-2048.jpg`: Z6, x 27–39 ja y 13–25 eli lon
    −28,125…45 ja Web Mercator -rivit 13/64…26/64, 3328² → 2048², noin 2,5 km/px 50°:ssa
  - `…/maailma-2048.jpg`: Z3, koko maailma, 2048², noin 20 km/px
- **Varjostin** (Yokuori.shader, yökuori R × 1,012):
  - Kuoren fragmentin katsesäde leikataan maan pintaan: ellipsoidi pallotilassa (napa-akselin komponentti × a/b), sitten
    geodeettinen leveys ja pituus → Web Mercator.
  - Ilman leikkausta kuoren 76 km:n korkeus siirtäisi valoja 60–200 km.
- **Näkyvyys:** valot syttyvät hämäräkaistassa pinnan pisteen auringon korkeuden mukaan (−6° … +2°, sama kuin yö).
- **Kaava ja vakiot:**
  - l = luminanssi; Eurooppa maailman päälle rajalla 3 %:n liu'ulla; maailman kuvan lisävoima 2,2
  - l' = 0,6 l² + 0,4 l
  - sävy = lerp((1, 0,52, 0,2), (1, 0,88, 0,7), saturate(1,6 l'))
  - lisätään esikerrottuna: väri + sävy · l' · 1,6 · yö. Yön peitto 0,82 ei himmennä valoja.
- **Testit:**
  - A/B `astro kyyti valot 0|1`
  - testikello `astro kyyti kello yo-eurooppa`: seuraava hetki, jolloin ISS on Euroopan yllä (lat 42–60, lon −5…30) ja
    aurinko sen alapisteessä alle −12°

## 1. Auringon heijastus ja pinnan valaistus (natiivi 34a5a5d5)

- **Vesimaski:** reliefipyramidin (`matkakirja/reliefipyramidi/20260924/pallo`) vesiväristä.
  - Luokitus: vettä, kun b − max(r, 0,92 g) > 12; täysi 34:ssä; mediaani 3 × 3.
  - Samat rajat ja koot kuin valoilla: `linssit/astronautin-kamera/iss-vesi-2026-09-28/{eurooppa,maailma}-2048.png`.
  - Järvet ovat mukana (Suomen järvet, Laatokka).
- **Kiilto:**
  - Beckmann D = exp(−tan²θh / m²) / (π m² cos⁴θh), m² = 0,02 (aallokko, Cox–Munk-luokkaa)
  - Schlick F = 0,02 + 0,98 (1 − v·h)⁵
  - kiilto = vesi · min(D F / (4 max(n·v, 0,08)), 40) · 6 (HDR) · saturate(12 n·l)
  - sävy lerp((1, 0,55, 0,25), (1, 0,96, 0,88), saturate(4 n·l)): matalalla auringolla oranssimpi
- **Päiväpuolen varjostus:**
  - matala = saturate(1 − sin(korkeus) / 0,5); varjo = 0,55 · matala² · (1 − yö), väri (0,02, 0,018, 0,016)
  - Alle 30°:n auringolla pinta tummuu pehmeästi, ja yön kaista jatkaa siitä.
- **Testit:**
  - A/B `astro kyyti kiilto 0|1` ja `varjo 0|1`
  - testikello `astro kyyti kello kiilto`: ikkunan katsekohde on vettä, ja aurinko on edessä radan suunnassa ±25°,
    korkeudella 25–70°

## 2. Tämän päivän pilvet (Julkaisija: ajastettu haku, Linssiseppä: renderöijä)

- **Lähde:** NASA GIBS (PD), `VIIRS_NOAA20_CorrectedReflectance_TrueColor`, eilinen päivä.
  - WMTS EPSG:4326, taso 2 = 4096 × 2048 (noin 10 km/px).
  - Varalla `VIIRS_SNPP_CorrectedReflectance_TrueColor` ja `MODIS_Terra_CorrectedReflectance_TrueColor`.
- **Pilvialfa:** pilvi on kirkkaampi kuin saman kuukauden pilvetön Blue Marble NG (kohta 4a), joten lumi ja jää kumoutuvat:
  - alfa = saturate((L_päivä − L_bmng − 0,08) / 0,25) · saturate((0,35 − värikylläisyys) / 0,2)
  - L = luminanssi 0…1
  - Kaistojen väliset aukot (musta, L < 0,02) täytetään edellisen päivän kuvasta. Jos sitä ei ole, alfa on 0.
- **Toimitus ämpäriin:**
  - `data/pilvet/uusin.png`: 4096 × 2048, 8-bit harmaa = alfa, tasakulmainen, lon −180…180 vasemmalta, lat 90…−90
    ylhäältä
  - `data/pilvet/uusin.json`: `{ "paiva": "YYYY-MM-DD", "lahde": "…", "haettu": "…" }`
  - Kerran päivässä noin klo 06 UTC, samaan tapaan kuin iss-tle.yml.
- **Natiivi:** Pilvikuori lukee `uusin.png`:n, ja vanha `matkakirja/linssit/pilvet-bluemarble-2048.jpg` jää varalle.

## 3b. Revontulet (Julkaisija: ajastettu haku, Linssiseppä: renderöijä)

- **Lähde:** NOAA SWPC OVATION Prime, `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json` (PD).
  - 360 × 181 pistettä [pituus 0…359, leveys −90…90, todennäköisyys 0…100 %], päivittyy 5 minuutin välein.
- **Toimitus:**
  - `data/revontulet/uusin.png`: 360 × 181, 8-bit harmaa = todennäköisyys × 2,55, tasakulmainen; sarake 0 = pituus 0°
    (itään), rivi 0 = leveys 90° (pohjoinen)
  - `data/revontulet/uusin.json`: havainto- ja ennusteaika
  - 30 minuutin välein
- **Natiivi:** kuori R + 110 km yöpuolella.
  - emissio vihreä (0,3, 1, 0,45) · p², yläreunassa punertava (1, 0,25, 0,3) · 0,2
  - hidas kohinaverho (Ei monotoniaa: nopeus vaihtelee)
  - p = todennäköisyys / 100; näkyy, kun aurinko on alle −12°

## 4. Vuodenaika, Kuu ja tähdet

- **4a Kuukauden pinta (Karttaseppä):**
  - Lähde: NASA Blue Marble Next Generation, 12 kuukausikuvaa (PD).
  - Poltto kyydin pohjaksi: Web Mercator Z0–Z7 JPEG, `julisteet/pallo/bmng/<kk>/{z}/{x}/{y}.jpg`. Ensin kuluva kuukausi,
    sitten seuraava ennen kuunvaihdetta.
  - Kyyti vaihtaa astronautin reliefipohjan kuukauden kuvaan. Kohta 2 käyttää samaa kuvaa pilvialfan vertailuun
    (tasakulmainen 4096 × 2048 per kuukausi: `data/bmng/<kk>-4096.jpg`).
- **4b Kuu (natiivi):**
  - Paikka Meeusin lyhennetyllä sarjalla (noin 0,3°), ECI → ECEF tähtiajasta (GMST), vaihe auringon ja Kuun kulmasta.
  - Kamerakeskeinen kiekko, 0,52° todellisessa koossa, maa-ilmakehän varjostus ja hento hehku. Proseduraalinen pinta (ei
    kuvaa).
- **4c Tähdet (natiivi, data ämpäriin):**
  - Yale Bright Star Catalogue (BSC5, PD), noin 5 000 tähteä (magnitudi ≤ 6).
  - Kamerakeskeinen pallo (ei parallaksia), ECI → ECEF tähtiajasta, koko ja kirkkaus magnitudista, väri B−V:stä.
  - Päivällä himmeinä (kuten nyt 0,3).
  - Nykyinen satunnainen tähtikenttä jää kaukonäkymään (webin kaltainen).
