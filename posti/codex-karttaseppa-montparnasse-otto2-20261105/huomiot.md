# Tour Montparnasse 24h #2124 — toisen oton arviointierä

7 kirjattua generointikutsua, 7 valittua rakennuskuvaa. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t ovat muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Bbox-korkeus px | Maaviiva | Päälista y | Lista maasta | Ylin taso y | Kokonaiskorkeus px | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 236 | 816 | 920 | 111 | 809 | 105 | 815 | 0.290 | 0.295 | -1.92% |
| pohjoinen | 236 | 817 | 920 | 111 | 809 | 104 | 816 | 0.289 | 0.295 | -2.04% |
| ita | 132 | 816 | 920 | 112 | 808 | 105 | 815 | 0.162 | 0.186 | -12.79% |
| lansi | 156 | 817 | 920 | 111 | 809 | 104 | 816 | 0.191 | 0.186 | 2.94% |

Korkeus mitataan maaviivasta ylimpään rakennustasoon, 210 m ilman antenneja. Kuvan reuna- ja korkeusmittauksen epävarmuus ±4 px. Tumma neutraali torni poimitaan myös sävyn tummuuden perusteella; mahdolliset bboxOverrides on kirjattu QA.json:iin. Nämä ovat kuvamittauksia, eivät kalibroitu rakennusmittaus.

Vastakkaisleveyksien erot 0.00% / 16.67%. Päälistan korkeusvaihtelu 0.12%, maaviivojen ero 0 px ja yhteisen px/m-skaalan vaihtelu 0.12%.

Yläkuvan bbox [672, 405, 860, 608], lähteen bbox [668, 408, 868, 616]; tarkka sijainti/koko FAIL.

Seitsemän uutta kokonaista generointia, ei koon korjausyrityksiä eikä uutta maapohjaa. 24h:n 210 m mitataan ylimpään tasoon ilman antenneja, pitkä sivu 62 m ja kapea 39 m. Pohjois- ja eteläsivut vastaavat luodetta/kaakkoa, kapeat koillista/lounasta; suunta 129° säilytetty. Kaikissa neljässä sivussa mitattu sama yläparapetin ALAREUNA (ei kerrosviivaa); yläreuna mitataan erikseen ylimpänä tasona. Kaarevan idän parapetin keskikohdan mitta ±4 px. Oikea 210 m korkeus kahdesta riippumattomasta ensisijaisesta lähteestä; 62×39 m tilaajan mitat. 177×111 m mallijalanjälkeä ei muutettu. Omistaja hyväksyi otto1:n massan, katon, suunnan ja jalanjäljen, mutta tämä uusi sarja odottaa arviota. Vanhaa hyväksyntää ei siirretä uusille pikseleille. Ei Tripo-siirtoa, runtime-kytkentää tai pelijulkaisua. Maapohjana Karttasepän oma pohja, ei tämän erän tuotantoa. Kolmas laatuyritys vaatii uuden omistajapäätöksen.

## Viistokuvamittaus

viisto-lounas: {"targetElevationDegrees": 65, "passTarget": false, "calibrated": false, "estimatedElevationDegrees": 58.3, "uncertaintyDegrees": 10, "roofEdgeSegments": [[[655, 250], [800, 110]], [[647, 362], [691, 395]]], "method": "Straight-middle tangent proxy: asin(sqrt(abs(m1*m2))). Roof edges are curved, so not exact; 65 degrees not verified.", "cameraSide": "south-west requested; long side right, short end left"}

viisto-koillinen: {"targetElevationDegrees": 65, "passTarget": false, "calibrated": false, "estimatedElevationDegrees": 60.7, "uncertaintyDegrees": 10, "roofEdgeSegments": [[[777, 140], [912, 295]], [[852, 445], [920, 400]]], "method": "Same approximate tangent proxy, curved edge uncertainty; 65 degrees not verified.", "oppositeCameraVerified": false, "cameraSide": "north-east requested; long side left, short end right, but symmetric roof has no unique opposite-face marker"}

## Muodon ja kuvan poikkeamat

- Tummentunut, hieman pronssiin vivahtava lasi ja ohuet pystylinjat toteutuvat; paksut vaaleat rivat/kerrosnauhat poistuivat. Kerrosviivoja näkyy silti tummana hentona ruudukkona.
- Idän kapea sivu on liian kapea suhteessa 210 m korkeuteen ja lännen sivuun; lopulliset prosentit taulukossa.
- Yläkuvan 21692 torni-pikselistä 3076 (14,18 %) on lähteen jalanjäljen ulkopuolella. Jalanjäljestä peittyy 93,55 %. Pelkkä lähellä oleva bbox ei siis tarkoita maskiin osumista.
- Kapeat päädyt pyöristyivät liikaa etenkin yläkuvassa. Pitkien sivujen haluttu loiva kuperuus ei erotu yhtä selvästi kuin liian pyöreät päädyt.
- Viistojen 65° ja täsmällinen vastakkaisuus eivät ole kalibroidusti varmennettuja; katon kaarevuus rajoittaa viivakulmamittausta.
- Harmaassa taustassa on hyvin hentoa paperimaista vaihtelua; se ei ole täysin tasainen väri.

arkki.jpg ja kaksi QA-päällekkäiskuvaa ovat arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty. Valitsemattomien yritysten tiedostot ja tilat säilyvät historiassa.

Jalanjalki-maskit-QA.png: vain QA-leike; punainen on lähdemaskin raja, sininen sen ulkopuolelle jäävät torni-pikselit. Tuotanto-PNG ei ole rajattu eikä muokattu.
