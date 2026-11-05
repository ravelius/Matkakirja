# Opéra Garnier #2095 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Katonharja y | Katto maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 1155 | 795 | 921 | 306 | 615 | 161 | 760 | 1.520 | 1.804 | -15.74% |
| pohjoinen | 1109 | 678 | 934 | 435 | 499 | 291 | 643 | 1.725 | 1.804 | -4.37% |
| ita | 1367 | 528 | 877 | 463 | 414 | 374 | 503 | 2.718 | 2.661 | 2.14% |
| lansi | 1362 | 508 | 876 | 475 | 401 | 383 | 493 | 2.763 | 2.661 | 3.83% |

Korkeussuhde mitataan noin 56 m pääkattoon, kärki erikseen. Värirajabbox, käsin luettu katon/listan y±4px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 4.06% / 0.37%. Listan korkeusvaihtelu 44.38% keskiarvosta, maaviivojen ero 58 px.

Yläkuvan bbox[480, 82, 1055, 953], lähde[664, 384, 872, 640]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä 34000 px, nurmenvärisiä 920 px (2.71%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala 0.993 m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio±2px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

Koko erä on DIAGNOSTIIKKA, ei valmis Tripo-syöte. Katon harjan korkeus56m on tilauksen ja Yetim–Kavraz2021:n likimääräinen tavoite. Mittaus jätetään erilleen pienestä kivisestä harjakorokkeesta. Yhteinen listapiste on näyttämötornin päälista pyöreiden aukkojen yläpuolella, ei matalien siipien erikorkuinen lista. Etelän ja pohjoisen kapeiden sivujen suhdeportti sekä kaikkien sivujen mittakaavan yhtenäisyys eivät läpäise. Itäkuvassa kattopääty on väärin ja rotundien akseli siirtyy. Kolme vihreää kupolia, eteläjulkisivun kultaiset kulmaryhmät ja korkea näyttämötorni tunnistuvat; pieniä yksityiskohtia yksinkertaistettiin, mutta yläkuvaan jäi kattoikkunoita. Pohjoisen ylös -periaate ja eteläinen pääjulkisivu ovat oikeat, tarkka yläkuvan kierto/koko ei. Maapohjassa lähdealueella ei ollut säilytettävää nurmipuistoa; ympäröivät puistot ovat maskin ulkopuolella. Rakennuksen paikka on kiveystä, mutta kattavuus ja rajan kadut tarkastettava maskissa.8/8 kutsua, ei uusintaa eikä tuotantokuvien skaalausta, leikkausta tai pikselimuokkausta.

## Viistokuvamittaus

southwest: {"roofEdgePoints": [[346, 246], [686, 737], [1202, 622]], "method": "Two approximately perpendicular roof-terrace edges treated as horizontal coplanar directions; true ground is occluded. Orthographic proxy sqrt(abs(slope1*slope2)), not calibrated camera solve.", "uncertaintyDegreesApprox": 5, "reason": "Visible side walls are too tall for 65 degrees; proxy below target. Not a certified footprint measurement.", "estimatedSinElevation": 0.5673164242436476, "estimatedElevationDegrees": 34.56330306031418, "targetSin": 0.9063077870366499, "passTarget": false}

northeast: {"roofEdgePoints": [[719, 765], [837, 780], [1188, 169]], "method": "Two perpendicular rear/side cornice directions used as coplanar horizontal proxy. Some cornice heights may differ; not calibrated ground solve.", "uncertaintyDegreesApprox": 5, "reason": "Opposite rear/east view is correct, but camera is much lower than 65 degrees and metric agreement with southwest is unverified.", "estimatedSinElevation": 0.4704047221664923, "estimatedElevationDegrees": 28.060571131877097, "targetSin": 0.9063077870366499, "passTarget": false}

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.

## Mittakaava ja näkyvät rakennevirheet

Leveyksistä lasketut mittakaavat etelä/pohjoinen/itä/länsi: 11.436 px/m, 10.980 px/m, 9.174 px/m, 9.141 px/m. Vaihtelu 22.54 % keskiarvosta: FAIL.

- Southern rotundas float about190px above the main ground level; side views are not a shared zero-degree orthographic set.
- North-south height scale differs strongly. Same physical stage-tower cornice varies across all4views.
- East flytower shows a triangular gable on the long side, unlike source roofplan and west image. Topology is not consistent.
- East and west rotundas shift north of the auditorium dome axis; same-building condition fails.
- Top image is too large and shifted relative to jalanjalki.png. Approximate long-axis80deg versus target74deg, manual estimate only.
- Small rooflights remain in top image. Stone roof caps are retained; roof-ridge ratio excludes caps.
- Oblique views do not achieve65degree elevation; actual footprint compressed factor is not directly recoverable because the ground is hidden.
- Background is a neutral gray gradient rather than perfectly flat gray; no cast shadows or external scenery.
- Ground image changes pixels outside edit mask; receiver must composite mask-only. Inside-mask street/path exactness requires receiver overlay review.

Nurmenväristen pikselien osuus 2,71 % vastaa reunojen näkyvää vihreää: kiveys ei kata jalanjälkeä kokonaan. Kahden polkunäytteen leveys 11 px, paikallisen mittakaavan mukaan noin 10,9 m (epävarmuus ±2 px). Pohjoisen W/H-portti on laskennallisesti alle 5 % mutta lähellä rajaa, eikä se poista sarjan muita rakennevirheitä.
