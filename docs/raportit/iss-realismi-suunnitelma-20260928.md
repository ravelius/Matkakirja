# ISS-realismi: kaupunkien valot ja kohdat 1–4 (Linssiseppä 28.9.2026)

*Omistaja 28.9.2026 klo 12.3x (loki "ISS-REALISMI", Fablen kautta): kaupunkien valot yöpuolelle ja kortilla kaikki neljä
realismikohtaa. Tavoite: ISS-näkymä näyttää siltä, mitä astronautti juuri nyt näkee. Natiivi tehdään ensin (lupa poiketa
webistä erän ajan). Web siirtää arvot: kaupunkien valot Pelikoodari, kohdat 1–4 Siirtoseppä. Kustakin kohdasta kuvapari
Fablelle. Lähteet vain PD tai CC.*

Proto-haara on `linssiseppa/iss-kyyti`. Kaikki kerrokset näkyvät vain kyydissä (seuranta ja ikkuna); kaukonäkymä pysyy
ennallaan.

## Tila (päivitetty 28.9. klo 14.3x laiteajojen cl4 ja cl5 jälkeen)

Proto-haara `linssiseppa/iss-kyyti` 43b37584. Laitekuvat: `/Users/Shared/Claude/proto-3d/lokit/linssiseppa-laite-20260928-cl5/`
(cl4 samalla nimellä -cl4). Kohdan 4 (4a–c) omistaa 28.9. klo 13.3x alkaen Linssiseppä 2.

| kohta | natiivi | data | laitteella | web |
|---|---|---|---|---|
| Kaupunkien valot | 8d791254 + b3186915 | ämpärissä | OK cl5 (valot-pari.png) | Pelikoodari |
| 1 Heijastus | 34a5a5d5 + b3186915 | ämpärissä | kiilto ei vielä kuvassa (testikello korjattu 43b37584) | Siirtoseppä |
| 1 Varjostus | 34a5a5d5 | – | OK cl5 (hämärä, keskikirkkaus −15 %) | Siirtoseppä |
| 2 Tämän päivän pilvet | f81345f0 | ämpärissä (minimikooste #3555) | latautuu; A/B Euroopan päivällä vielä | Siirtoseppä |
| 2b Terävät pilvet kyydissä | pilvet-tarkat cc513896 | – | OK cl14 (pari-pilvet-ikkuna.png, -seuranta.png) | Siirtoseppä |
| 3a Hämärä ja ilmahehku | 4e7f3b1d + d1a3f147 | – | OK cl5 (aamunkoiton kaari, hehku himmeänä) | Siirtoseppä |
| 3b Revontulet | 497c06b8 + b3186915 | ämpärissä | latautuu; ei näkyvää aktiivisuutta testihetkellä | Siirtoseppä |
| 4a–c | Linssiseppä 2 | | | Siirtoseppä |

**Laitteen löydös cl4 (korjattu b3186915), tärkeä myös webille:** varjostimessa pituus laskettiin
`atan2(dot(p, cross(z, x)), dot(p, x))`. Unityn maailma on vasenkätinen (Cesium: itä +X, ylös +Y, pohjoinen +Z), joten
`cross(z, x)` = −Y ja pituus peilautui: valot ja vesimaski näytteistettiin väärältä puolelta. Nyt ECEF Y annetaan C#:sta
(`_Ita`). Webin three.js on oikeakätinen, mutta tarkista sama kohta, jos pituus lasketaan ristitulosta.

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
  - lisätään esikerrottuna: väri + sävy · l' · 0,96 · yö (omistaja 28.9.: 60 % entisestä 1,6:sta, laite cl6 100/80/60). Yön peitto 0,82 ei himmennä valoja.
  - Pilvet himmentävät: valo · (1 − 0,85 · pilven alfa · pilvikuoren peitto); sama heijastukselle.
  - Yöllä vedellä peitto 0,96 (maalla 0,82): reliefin vaalea vesi jäi muuten maata kirkkaammaksi (cl4).
    Lisäys esikerrottuna yön värillä (0,012, 0,02, 0,05): lisä = vesi · yö · max(0, 0,96 − a).
- **Testit:**
  - A/B `astro kyyti valot 0|1`
  - testikello `astro kyyti kello yo-eurooppa`: seuraava syvän yön ylitys Länsi- ja Keski-Euroopan yllä (lat 43–58,
    lon −5…20, aurinko alapisteessä alle −18°, enintään 24 vrk; varalla laajemmat rajat). Syys–lokakuun vaihteessa ISS
    ylittää Euroopan vain iltahämärässä, joten kello hyppää noin 19.10. aamuyöhön (tietorivillä rata-arvio).
  - `astro kyyti kello hamara`: iltahämärä kohti yötä (alapisteessä aurinko +2…+6° ja laskee)

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
  - testikello `astro kyyti kello kiilto`: ikkunan katsekohde on vettä minuutin ajan, ja aurinko on edessä radan
    suunnassa ±40°, korkeudella 25–70° (±25° ei löytänyt yhtään hetkeä vuorokauteen syyskuun lopussa)

## 2. Tämän päivän pilvet (Julkaisija: ajastettu haku, Linssiseppä: renderöijä)

- **Lähde:** NASA GIBS (PD), `VIIRS_NOAA20_CorrectedReflectance_TrueColor`, eilinen päivä.
  - WMTS EPSG:4326, taso 2 = 4096 × 2048 (noin 10 km/px).
  - Varalla `VIIRS_SNPP_CorrectedReflectance_TrueColor` ja `MODIS_Terra_CorrectedReflectance_TrueColor`.
- **Minimikooste (#3555):** NOAA-20 ja Suomi NPP ovat samalla radalla puolen kierroksen päässä, joten auringon kimallus
  on niiden kuvissa eri kohdissa. Pikseli otetaan tummemmasta kuvasta: kimallus putoaa pois, pilvet jäävät.
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

## 2b. Terävät pilvet kyydissä (natiivi linssiseppa/pilvet-tarkat cc513896, Pilvet.shader)

Omistaja 28.9. klo 19.3x Cupolasta: "Vielä liikaa blurrina". Kehyksen sumennus ei ollut ainoa syy. Pilvikuva on 4096 px
(noin 10 km/px), ja Cupolassa (kenttä 65,7°, ISS 420 km) ruudun pikseli vastaa maassa noin 0,2–0,4 km. Yksi tekseli venyy
siis 30–50 px:ksi, ja pilven reuna (kuvassa 0 → 1 yhden tekselin matkalla) näkyi 50–100 px:n liukumana.

- **Vain kyydissä** (`_Tarkkuus` 1 seurannassa ja ikkunassa). Kaukonäkymä ja lennon pilvisumu pysyvät ennallaan.
- **Näyte:** bikuubinen B-splini (Ruijters 2008), neljä bilineaarista näytettä `SampleGrad`-derivaatoilla. Saumassa
  (pituus ±180°) u:n derivaatta on pienempi arvoista `ddx(u)` ja `ddx(frac(u + 0,5))`. Tulos on sileä pohja-alfa a0.
- **Kohina f:** 3D-simplex pisteessä q = normalize(kuoren oliopaikka) · 6371 / 35.
  - 5 oktaavia, taajuus × 2,2 ja amplitudi × 0,5 per oktaavi.
  - Oktaavin paino h = saturate(1,5 − 2 · j · taajuus), jossa j = max(|ddx q|, |ddy q|). Alle kahden pikselin oktaavit
    häipyvät.
  - Normitus f = Σ amp · h · simplex / sqrt(Σ amp² h²) / 0,39.
  - Gradientit kokonaislukuhajautuksesta, ei sin-hashia.
- **Reuna:** kynnys t = 0,5 + 0,36 · tanh(0,8 · f) ja terävä alfa = smoothstep(t − 0,08, t + 0,08, a0). Kynnys liikkuu vain
  välillä 0,14–0,86, joten kirkkaalle alueelle ei tule kohinahiutaleita ja pilvien paikat pysyvät kuvan mukaisina.
  Esikatselussa peitto muuttui 0,439 → 0,429.
- **Sekoitus:** alfa = lerp(a0, terävä, sqrt(Σ amp² h² / Σ amp²)). Kaukaa ja horisontissa tulos palaa kuvaan.
- **Pinta:** kirkkaus × (1 + 0,05 · clamp(f₀₁ / 0,39, ±2,5) · näkyvyys), jossa f₀₁ on kahden alimman oktaavin summa.
- **A/B:** `astro kyyti tarkat 0|1|<km>` (pohja-aallonpituus).
- **Kustannus:** pilvipikselissä 4 tekstuurinäytettä ja 5 simplexiä (noin 500 laskutoimitusta); alle 0,06:n alfa ohitetaan.
  Laitteen kehysaika mitataan TestFlightissä.
- **Web (Siirtoseppä):** sama kaava three.js:n pilvikuoren fragmenttivarjostimeen. q:ksi kelpaa kuoren paikallinen
  sijainti normalisoituna, ja derivaatat tulevat `OES_standard_derivatives`- tai WebGL2-funktioista `dFdx`/`dFdy`.

## 3a. Hämärä ja ilmahehku (natiivi 4e7f3b1d + d1a3f147, Ilmakaari.shader)

- **Kaari:** kuori R + 120 km. Jokaiselle näkösäteelle lasketaan analyyttisesti lähin korkeus h maan pinnasta
  (litistys korjattuna: napa-akselin komponentti × a/b).
  - kirkkaus a = exp(−h / 22 km); sävy lerp((0,12, 0,30, 0,86), (0,72, 0,88, 1), exp(−h / 6 km))
  - a *= max(aurinko sivuamispisteessä, hämärä · 0,8); a = saturate(a · 1,15)
- **Hämärä:** s = n · aurinko sivuamispisteessä.
  - hämärä = exp(−s² / 0,075²) · exp(−h / 9 km); sävy lerp(sävy, (1, 0,42, 0,14), saturate(1,4 · hämärä))
  - Laitteella cl5 näkyy aamunkoiton oranssinpunaisena vyönä horisontissa, kun rata kulkee kohti aamua.
- **Ilmahehku yöllä:** yö = 1 − smoothstep(−0,105, 0, s)
  - hehku = exp(−(h − 95 km)² / (4,5 km)²) · 0,12 · yö, sävy (0,55, 0,95, 0,5)
  - Koostus: yht = a + hehku − a · hehku; väri = (väri · a + hehkusävy · hehku) / (a + hehku)
  - cl4:ssä 0,32 ja σ 6 km piirsivät kirkkaan vihreän viivan, joten arvoja pienennettiin.
- **A/B:** `astro kyyti hehku 0|1` (hämärä ja ilmahehku pois).

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
