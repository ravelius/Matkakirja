# Sacré-Cœur #2098 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Katon y | Katto maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 710 | 956 | 988 | 558 | 430 | 33 | 955 | 0.743 | 0.602 | 23.41% |
| pohjoinen | 710 | 959 | 988 | 510 | 478 | 30 | 958 | 0.741 | 0.602 | 23.03% |
| ita | 1419 | 948 | 981 | 609 | 372 | 34 | 947 | 1.498 | 1.157 | 29.55% |
| lansi | 1377 | 949 | 981 | 610 | 371 | 33 | 948 | 1.453 | 1.157 | 25.58% |

Korkeussuhde mitataan 83 m:n keskikupolin lyhdyn yläreunaan; campanile on eri mittari. Värirajabbox, käsin luettu katon/listan y±4px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 0.00% / 3.00%. Listan korkeusvaihtelu25.92% keskiarvosta, maaviivojen ero7px.

Yläkuvan bbox[617, 181, 919, 840], lähde[652, 294, 884, 730]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä84328px, nurmenvärisiä0px (0.00%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala0.998m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio±2px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

Arviointierä, ei Tripo-valmis. Kahdeksan kutsua, ei yhtään uusintaa. Rakennuksen pää- ja sivumittojen taulukko96×50m on tilauksen suunnittelumittari, ei lähdevarmennettu todellinen ulkomitta; muualla esiintyvä85×35m on erillinen vertailu, mittausrajaus avoin. Kupoli83m varmistettu kahdesta lähteestä. Päälistamittari on keskimmäisen suuren kupolin alemman kaari-ikkunallisen rummun alalistan reuna; N:n alaosa peittyy kellotorniin, mutta reuna näkyy sivuilla. Maaviiva on sokkelin alin raja. Kupolin lanterneiden yläreunat mitattu erikseen pohjoisesta campanilesta. Suuntaparit vastaavat etelä/pohjoinen ja itä/länsi, mutta idän eteläjulkisivun projektio on virheellinen. Yläkuvan väärä kulma ja campanilen paikkavaihtelu ovat myös itsenäisiä hylkäysperusteita. Kupolien ja tornin koko/paikat verrattiin lähdekuviin. Pienet ristit ja veistoksen yksityiskohdat poistettu/simplifioitu 3D-mallin kestävyyden vuoksi. Maapohja on tasainen, ilman pystyobjekteja. Jalanjäljen kiveys syrjäyttää sen sisällä olevat alkuperäiset puistot ensisijaisen ohjeen mukaan; muu puistomuoto ei ole pikselintarkka. Ulkopuolinen kartta näyttää samalta rakenteelta, mutta vasta tavutesti ratkaisee pikselisamuuden. Kone liimaa vain maskin sisäosan.

## Viistokuvamittaus

viisto-lounas: {"basalEdgePoints": [[442, 493], [746, 958], [1060, 871]], "method": "Manually selected basal edge proxy: west long-edge / south-front base, adjacent edges assumed orthogonal; no surveyed plane, geometry is stylized. Elevation uncertainty about5degrees.", "oppositeDirectionPlausible": true, "estimatedSinElevation": 0.6510052439806032, "estimatedElevationDegrees": 40.617435905040765, "targetSin": 0.9063077870366499, "passTarget": false}

viisto-koillinen: {"basalEdgePoints": [[914, 895], [985, 966], [1114, 916]], "method": "Manually selected adjacent basal edges of north campanile square plinth; same-plane/orthogonality approximate, not calibrated full footprint. Elevation uncertainty about5degrees.", "oppositeDirectionPlausible": true, "estimatedSinElevation": 0.6225728063646904, "estimatedElevationDegrees": 38.50425880865353, "targetSin": 0.9063077870366499, "passTarget": false}

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.

## Täydentävät tarkistukset

Päälistan mittari on suuren keskikupolin alemman kaari-ikkunarummun alareuna. Pohjoisessa torni peittää keskiosan, mutta listan päät näkyvät. Vertailukuvat eivät kuvaa tätä listaa samalla korkeudella. Virhe ei ratkea pelkällä koko kuvan yhtenäisellä skaalauksella.

Taulukon 96 × 50 m on tilauksen suunnittelumittari; todellinen ulkomitta ei saanut riippumatonta vahvistusta. Vaihtoehtoiset 85 × 35 m poikkeamat S/N/E/W: 76.31%, 75.75%, 46.32%, 41.84%. Tämä vaihtoehtoinen rajaus on epävarma, eikä korvaa pyydettyä mittaria.

Campanilen/kupolin korkeussuhteen poikkeama 84/83-vertailusta pohjoinen/itä/länsi: -13.15%, -1.92%, -1.82%. Pohjoiskuvassa kellotorni on selvästi liian matala suhteessa kupoliin.

Ulkopuolen suora pikselivertailu: 1399225/1399813 pikseliä muuttui; RGB-kanavien keskimääräinen absoluuttinen ero 5.851/255. Ulkopuolta ei ole säilytetty pikselilleen. Vastaanottaja liittää vain maskin sisäosan. Maapohja-QA:n sininen viiva on todellisen kierretyn jalanjäljen sisäreuna; yläkuva-QA:ssa lähdejalanjälki punainen ja ehdokkaan bbox sininen.

Sivukuvien kokoero on eri asia kuin muotovirhe: itäkuvan eteläjulkisivu on avattu sivun tasoon, lännessä se näkyy reunalta. Yläkuva ei ole ortografinen. Campanile vaihtaa paikkaa ja pohjoisessa korkeutta. Lounaan takakatto näyttää avoimelta kuorelta, koillisessa se on suljettu. Nämä pitävät koko erän QA FAIL -tilassa, vaikka vastakkaisten sivujen leveydet läpäisevät viiden prosentin portin.

## Saman listan varmennus

Ensisijaiset y558/510/609/610 mittaavat **suuren keskikupolin alemman kaari-ikkunarummun alalistan alareunaa** S/N/E/W. Ne eivät mittaa eri siipien räystäitä. Tarkistettu natiiveista yksityiskohtaleikkeinä; pohjoisessa kellotorni peittää keskiosan mutta reunat näkyvät.

Riippumaton saman rummun ylemmän yhtenäisen listan tarkistus: y446/403/468/468. Korkeudet maaviivasta 542, 585, 513, 513px, hajonta 13.38% keskiarvosta, ei läpäise5%rajaa. Mittausepävarmuus kummassakin±4px. Kuvapikseleitä ei muutettu.
