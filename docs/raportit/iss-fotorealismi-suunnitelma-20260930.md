# ISS:n maapallonäkymä fotorealistiseksi: suunnitelma (Linssiseppä 30.9.2026)

Tilaaja: omistaja Päätoimittajan kautta ("Miten ISS:n maapallonäkymästä saisi vielä fotorealistisemman?", "Tee ne
ilmaiset"). Suunta on hyväksytty. Pinta on BMNG; Sentinel-2 on pidossa (EOX:n lupa tai osto). Toteutus aloitetaan
horisonttierän jälkeen haarassa `linssiseppa/iss-fotorealismi` (protossa `linssiseppa/iss-paneeli-3d`:n päällä).

## Lähtötilanne (kartoitus 30.9.)

- Pinta: Cesium-tileset (oma quantized-mesh GLO-30/90) + ETOPO-reliefi (leivottu rinnevarjostus) + BMNG 0,75.
  Valona on kameraan kiinnitetty suuntavalo, joten oikeaa aurinkoa laatoissa ei ole. Korkeuskerroin 2 jää päälle myös kyydissä.
- Päivä/yö, terminaattori, sunglint (Beckmann + Schlick, vesimaski) ja kaupunkien valot (Black Marble) piirtää Yokuori-kuori
  (R + 76 km), joka säteenleikkaa maan.
- Ilmakehä on analyyttinen (Ilmakaari.shader): raja exp(−h / 22 km), hämärän oranssi, airglow 95 km:ssä, "Usva"-passi
  exp(−polku / 900 km). Ei Rayleigh- eikä Mie-sirontaa, ei LUT:eja.
- Pilvet: GIBS:n päivän pilvet (≈ 4096 px) kuoressa 8 km:ssä, terävät reunat kohinalla. Ei varjoja, ei valaistusta.
- Jälkikäsittely: kyydissä ei mitään. HDR-puskuri on päällä, mutta sävytystä ei ole (Filmipino vain aloituslennolla).
  Tämä on yksittäisistä syistä suurin: kirkkaat kohdat leikkautuvat eikä bloomia ole.
- NASA-kuvien metatiedot paketissa: vain päivämäärä. Gateway to Astronaut Photography (eol.jsc.nasa.gov) antaa kellonajan,
  nadirin, korkeuden, polttovälin ja auringon korkeuden, joten vertailukulma saadaan tarkasti.

## Järjestys ja arviot (ms iPhone 16 / iPad Pro 12.9, renderScale 0,8; tarkistetaan laitteella)

| # | Osa | Tekniikka | ms-arvio | Kevennys ≤ iPhone 15 Pro |
|---|---|---|---|---|
| 0 | Filminen sävytys | URP Volume kyytiin: AgX-tyylinen (URP ACES/Neutral + värikorjaus), valotus auringon mukaan, bloom LQ 3 kierrosta puolikoossa | 0,8 / 0,6 | bloom pois |
| 1 | Ilmakehä | Hillaire 2020 (UE "A Scalable and Production Ready Sky and Atmosphere"): transmittance-LUT 256×64 ja monisironta-LUT 32×32 kerran käynnistyksessä, sky-view-LUT 192×108 joka ruutu, aerial perspective laatan pikselivarjostimessa 8 askeleella transmittance-LUT:sta; korvaa Ilmakaaren kaaren ja usvan | 0,7 / 0,5 (nettona noin +0,4) | sky-view 96×54, AP 4 askelta |
| 2 | Meri ja maasto | Oikea aurinko laattavarjostimeen (Lambert + terminaattori laatan normaalista), sunglint Yokuorista laattaan (aaltokarheus σ tuulesta vakiona, Fresnel), DEM-korkeusvarjostus laatan normaalista (korkeuskerroin kyydissä 1) | 0,3 / 0,2 | normaali pois kaukaa |
| 3 | Pilvet | Varjot: pilvikuvan toinen näyte siirrettynä auringon suuntaan (8 km / tan(aurinko)), pilven valaistus (auringon puoli, terminaattorin punerrus, paksuus alfasta), korkeusparallaksi kuoren korkeudesta | 0,3 / 0,2 | varjo puolikkaalla tarkkuudella |
| 4 | Yöpuoli | Kuunvalo Yokuorin yötummennukseen (Kuun vaihe ja korkeus, jo laskettu KyydinTaivaassa), kuunvalossa hohtavat pilvet, airglow Hillairen LUT:n rinnalle (vihreä 95 km, punainen 250 km heikkona) | 0,1 / 0,1 | – |

Yhteensä noin 2,2 ms iPhone 16:lla. Cupola on nyt 30 fps:n katossa (33 ms), joten tila riittää. Mittaan laitteella
per osa A/B-kytkimin (`astro kyyti savytys|ilmakeha2|pinta|pilvivarjo|kuunvalo 0|1`), vierekkäisinä ABAB-pareina.

## Laaduntarkistus

- Kolme NASA-kuvaa (PD) samasta paikasta, hetkestä ja suunnasta: `astro kyyti vertailu <nadir> <km> <keskipiste> <mm> <UTC>`
  (proto 86f90ed7).
  1. ISS037-E-18864: Italia yöllä, 2013-10-23 19:20:01 UTC, nadir 31,3 N 20,1 E, 413 km, 50 mm. Yöpuoli, airglow ja kaupungit.
  2. Päivän laaja horisonttikuva Välimereltä, ≤ 50 mm, High Oblique: haetaan EOL:sta. Tämä tarkistaa ilmakehän, usvan ja sävytyksen.
  3. Sunglint-kuva Välimereltä tai Atlantilta. Tämä tarkistaa meren.
- Lähtötaso: kuvapari "NASA | nykyinen" otetaan horisonttierän simulaattorikierroksella. Ensimmäinen varsinainen pari
  Päätoimittajalle on "NASA | nykyinen | ilmakehä ja sävytys", heti kun osat 0–1 ovat paikallaan.
- Omistajan linja: täysi laatu kaikilla laitteilla, kevennys vain ≤ iPhone 15 Pro (SystemInfo.deviceModel ≤ iPhone16,x).

## Riskit

- Cesiumin laattavarjostin on generoitu (tee_tileset.py). Muutokset tehdään generaattoriin, ei käsin shadergraphiin.
  Aurinko laattoihin koskee myös muita linssejä: se kytketään vain kyydissä (globaali avain).
- Sky-view-LUT tarvitsee RenderTexture-kierroksen joka ruudussa. Se tehdään CommandBufferilla ennen kameraa, kuten
  CupolaValot tekee kerran tilan muuttuessa.
- Sävytys muuttaa kaikkien kyydin kerrosten kirkkautta, joten Cupola-kehys ja paneeli (UI) pysyvät sävytyksen ulkopuolella
  (UI Toolkit piirtyy jälkikäsittelyn jälkeen).
