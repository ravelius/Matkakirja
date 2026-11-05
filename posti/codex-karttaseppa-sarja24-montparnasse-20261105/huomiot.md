# Tour Montparnasse #2094 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Ylin taso y | Katto maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 274 | 842 | 938 | 122 | 816 | 97 | 841 | 0.326 | 0.295 | 10.35% |
| pohjoinen | 274 | 842 | 938 | 122 | 816 | 97 | 841 | 0.326 | 0.295 | 10.35% |
| ita | 187 | 841 | 939 | 125 | 814 | 99 | 840 | 0.223 | 0.186 | 19.87% |
| lansi | 176 | 841 | 938 | 122 | 816 | 98 | 840 | 0.210 | 0.186 | 12.82% |

Korkeussuhde mitataan210m tornin ylimpään tasoon ilman antenneja. Värirajabbox, käsin luettu katon/listan y±4px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 0.00% / 6.06%. Listan korkeusvaihtelu0.25% keskiarvosta, maaviivojen ero1px.

Yläkuvan bbox[672, 401, 861, 609], lähde[668, 408, 868, 616]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä19900px, nurmenvärisiä898px (4.51%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala0.994m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio±2px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

Tunnistettava tumma, pyöristetty ja kapeapäätyinen torni sekä yksinkertaistettu helikopterikansi säilyvät. Pienet antennit ja kattoasennukset sekä viereinen ostoskeskus on jätetty pois tilauksen mukaan. Sivut ovat suorassa ortografiassa ilman näkyvää kattotasoa. Julkisivun tiheä kerrosjako on tyylitelty; kaikkien 59 kerroksen lukumäärää ei väitetä varmennetuksi. Etelä/pohjoinen ovat lähes identtiset; itä/länsi eroavat leveydeltään ja pilariasettelultaan. Kuvia ei ole skaalattu eikä normalisoitu. Viistojen pyöristetty pohja ja katon reunat estävät tarkan 65asteen kalibroinnin; roof-edge-proxy on vain varoitus, ei tarkka kameramittaus. Yläkuvan katon pienet ulkonemat sekä maapohjan muutaman pikselin siirtymä suhteessa maskiin tarkistetaan erillisellä maskiluvulla. Pohjassa ei ole pystyrakenteita; polkunäytteet akselisuunnassa voivat yliarvioida vinoa polkua. Natiivien8kutsun erä toimitetaan diagnostisena, ei käyttöhyväksyntänä.

## Viistokuvamittaus

southwest: {"roofEdgePoints": [[642, 236], [814, 68], [915, 133]], "measurementMethod": "Approximate slopes of straight middle sections of rounded observation-deck edges, extrapolated to common corner; not calibrated ground measurement. Rounded corners/convex facades increase uncertainty.", "uncertaintyDegreesApprox": 8, "targetElevation": 65, "estimatedSinElevation": 0.7928415626689104, "estimatedElevationDegrees": 52.45185855345535, "targetSin": 0.9063077870366499, "passTarget": false}

northeast: {"roofEdgePoints": [[700, 65], [885, 229], [794, 301]], "measurementMethod": "Approximate inner roof-deck straight-edge slopes; rounded facade means this is a diagnostic proxy only. Absolute 180degree camera correspondence not independently verified.", "uncertaintyDegreesApprox": 8, "targetElevation": 65, "estimatedSinElevation": 0.8374938217061075, "estimatedElevationDegrees": 56.876411983108774, "targetSin": 0.9063077870366499, "passTarget": false}

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.

Visuaalinen loppuarvio: jalanjäljen länsiluoteisella pitkällä reunalla jää 898 nurmenväristä pikseliä (4,51 %). Kiveys on hieman oikealle siirtynyt. Päälisätasot ja maaviiva täsmäävät sivujen välillä hyvin, mutta tornin leveyssuhteet ovat liian suuret. Tämä on diagnostinen toimitus, ei käyttöhyväksyntä.
