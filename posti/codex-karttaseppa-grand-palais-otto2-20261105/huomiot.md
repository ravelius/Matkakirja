# Grand Palais otto2 #2111 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Lasikaton y | Katto maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 1174 | 588 | 903 | 705 | 198 | 528 | 375 | 3.131 | 3.533 | -11.40% |
| pohjoinen | 1150 | 589 | 903 | 705 | 198 | 528 | 375 | 3.067 | 3.533 | -13.21% |
| ita | 1454 | 512 | 861 | 705 | 156 | 529 | 332 | 4.380 | 5.333 | -17.88% |
| lansi | 1455 | 511 | 860 | 705 | 155 | 528 | 332 | 4.383 | 5.333 | -17.83% |

Korkeussuhde mitataan45m pääkattoon, kärki erikseen. Värirajabbox, käsin luettu katon/listan y±4px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 2.07% / 0.07%. Listan korkeusvaihtelu24.33% keskiarvosta, maaviivojen ero43px.

Yläkuvan bbox[622, 309, 990, 839], lähde[639, 320, 897, 704]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä95912px, nurmenvärisiä20013px (20.87%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala0.999m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio±2px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

T-pohja, pyöristetyt päädyn lasiholvit, yksi matala kupoli ja kärki säilyvät tässä erässä paremmin. Itä- ja länsijulkisivut eroteltu: idässä poikkilaivan pääty, lännessä jatkuva pylvässivu ja keskisisäänkäynti. Kärki on lyhty, masto ja yksinkertainen lippulevy; lähdekuvan mittaus noin62.5m suhteutettuna45m-holviin, ei tarkka rakennusmittaus. Palais de la Decouverte ja itäpihat jätetty tilauksen mukaan pois. Mittakaava,65asteen kuvakulma ja yläkuvan rekisteröinti eivät täytä sopimusta. Maapohjan kiveys on lähdejalanjälkeä pienempi ja itäpuiston polku yksinkertaistui. Uusi yläkuva on noin368x530px eikä258x384px lähderajaus. Ei tuotannon skaalausta/rajausta tai jälkipaikkausta. Seuraava uusi otto vaatii erillisen lähteen; tämän erän8kutsua käytetty.

## Viistokuvamittaus

southwest: {"roofEdgePoints": [[785, 252], [1007, 155], [1187, 349]], "measurementMethod": "Orthogonal straight roof-edge slope proxy, not a calibrated ground plane; ground corners partly rounded/occluded", "targetElevation": 65, "uncertaintyDegreesApprox": 5, "estimatedSinElevation": 0.6862367819644476, "estimatedElevationDegrees": 43.33295083123369, "targetSin": 0.9063077870366499, "passTarget": false}

northeast: {"pass": false, "reason": "East branch appears front-right rather than expected front-left for stipulated NE camera. Exact180degree counterpart not verified."}

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.
