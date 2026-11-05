# Panthéon #2096 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Kärjen y | Kärki maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 1246 | 889 | 944 | 648 | 296 | 56 | 888 | 1.403 | 1.349 | 3.98% |
| pohjoinen | 1249 | 890 | 944 | 648 | 296 | 55 | 889 | 1.405 | 1.349 | 4.12% |
| ita | 982 | 893 | 944 | 648 | 296 | 52 | 892 | 1.101 | 1.024 | 7.50% |
| lansi | 1142 | 973 | 996 | 648 | 348 | 24 | 972 | 1.175 | 1.024 | 14.73% |

Korkeussuhde mitataan 83 m kokonaiskorkeuteen ylimpään ristiin asti. Siluettibbox sisältää harmaan ristin; käsin varmistetut kärjen/listan y±4 px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 0.24% / 15.07%. Listan korkeusvaihtelu 16.83% keskiarvosta, maaviivojen ero 52 px.

Yläkuvan bbox [366, 228, 1099, 780], lähde [624, 387, 912, 637]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä 44 274 px, nurmenvärisiä 0 px (0.00%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala 0.998 m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio ±2 px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

Toteutunut toimitus on yhden kierroksen diagnostinen arviointierä, QA FAIL. Kaikki 8 natiivia PNG:tä ovat 1536×1024 RGB; tuotantopikseleitä ei rajattu, skaalattu, korjattu tai uudelleenpakattu. Etelä/pohjoinen ovat pitkät 112 m julkisivut; itä/länsi lyhyet 85 m julkisivut. Kokokorkeus 83 m mitataan maaviivasta ylimpään ristiin, ei alemman harjan korkeuteen. Bbox-poiminta sisällyttää myös harmaan kärkiristin (värierotus >10 TAI vähimmäiskanava <180), ei vain kellertävää seinää. Yksinkertaistettu kivisaumoja, koristeita ja ikkuna-aukkoja; portiikin kuusi etupylvästä, kupolin korkea pylväsrumpu, lyhty ja kärkiristi säilyvät. Länsiportiikki on Rue Soufflot'n puolella. Suunta tarkistettiin lähdepostin #2116 jälkeen Rue Soufflot/Luxembourg- ja Bibliothèque Sainte-Geneviève/Rue d'Ulm -ankkureista; ensimmäisen yläkuvapromptin virheellinen ortokuvan portiikkiselite säilyy auditointihistoriassa, kuvaa ei uusittu. Maapohjan jälkikäsittelyä ei tehty; sen ulkopuoliset pikselit ovat muuttuneet, joten vain maskin sisäosa on tarkoitettu Karttasepän koostamiseen. Vasen Luxembourg-puisto säilyy maantieteellisesti silmämääräisesti, mutta ei pikselitarkkana. Polkunäytteet kattavat kolme kohtaa, eivät kaikkia polkuja; reunaepävarmuus ±2 px. Ei omistajahyväksyntää, vastaanottajan hyväksyntää, Tripo-toimitusta, R2-siirtoa, peli-integraatiota tai julkaisua. 8/8 kutsun kiintiö käytetty, ei automaattista uusintaa.

## Viistokuvamittaus

southwest: {"roofEdgePoints": [[794, 585], [894, 690], [1138, 602]], "measurementUncertaintyPixels": 4, "uncertaintyDeg": 3, "method": "Kahden rakennuksessa kohtisuoran, saman päälistatason reunavektorin kulmakertoimet; sin(elev)=sqrt(abs(m1*m2)). Kuvasta arvioitu, ei kamerametatietoa.", "description": "Lounas näyttää länsiportiikin ja eteläisen pitkän sivun.", "estimatedSinElevation": 0.6153767338713448, "estimatedElevationDegrees": 37.97929954428616, "targetSin": 0.9063077870366499, "passTarget": false}

northeast: {"roofEdgePoints": [[688, 567], [832, 698], [1146, 569]], "measurementUncertaintyPixels": 4, "uncertaintyDeg": 3, "method": "Kahden rakennuksessa kohtisuoran, saman päälistatason reunavektorin kulmakertoimet; sin(elev)=sqrt(abs(m1*m2)). Kuvasta arvioitu, ei kamerametatietoa.", "description": "Koillinen näyttää itäisen takaosan ja pohjoissivun; portiikki takana oikealla. Vastapuoli toteutuu visuaalisesti, mutta täsmälleen 180 asteen kameralukitusta ei voi varmentaa kuvapikseleistä.", "exact180OppositionVerified": false, "estimatedSinElevation": 0.6113422807959117, "estimatedElevationDegrees": 37.68662201282911, "targetSin": 0.9063077870366499, "passTarget": false}


Yhteisen px/m-skaalan vaihtelu 9.23 %. Maskin ulkopuolelta 1418372/1418403 pikseliä muuttunut; vastaanottaja koostaa maskilla.

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.

## Muodon poikkeamat

- Yläkuva on pystysuora, mutta rakennus suurennettiin eikä se rekisteröidy jalanjäljen pikselikoordinaatteihin.
- Viistojen laskettu korkeuskulma jää noin 38 asteeseen tavoitellun 65 asteen sijaan.
- Länsijulkisivu on eri mittakaavassa ja maaviivalla. Itä–länsiparin leveys ja osa korkeus/leveystavoitteista ylittävät 5 prosentin toleranssin.
- Viistot ja yläkuva pyöristävät itäisen takaosan; suorat sivut eivät säilytä tätä muotoa yhdenmukaisesti. Takasivun muodon aitoutta ei hyväksytä.
- Lounaan portiikin katolle syntyi pyöreitä nuppeja, joita koillisessa tai sivukuvissa ei ole. Pieniä kattolaatikoita jäi ylä- ja viistokuviin.
- Varsinaiset kuvat ovat ehjiä alkuperäisiä; diagnostinen toimitus ei ole geometriahyväksyntä eikä Tripo-syöte.

Viistomittaukset.png näyttää kulmakertoimiin käytetyt saman korkeustason reunapisteet. Niiden värimerkinnät ovat vain QA-arkissa, eivät tuotannossa. Polkunäytteet ovat noin 5.99, 5.99 ja 9.98 mallimetriä, mittausepävarmuus noin ±2 m; kaksi alarajan näytettä ovat rajatapauksia, eivät kaikkien polkujen kelpoisuuden todiste.
