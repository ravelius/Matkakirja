# Riemukaari #2097 — yhden kierroksen arviointierä

Kahdeksan kutsua. QA FAIL. Ei omistajahyväksyntää tai Tripo-toimituslupaa. Tuotanto-PNG:t muuttamattomia alkuperäisiä.

| Kuva | Leveys px | Kokokorkeus px | Maaviiva | Päälista y | Lista maasta | Katon y | Katto maasta | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 566 | 897 | 955 | 213 | 742 | 59 | 896 | 0.632 | 0.448 | 40.90% |
| pohjoinen | 484 | 895 | 954 | 213 | 741 | 60 | 894 | 0.541 | 0.448 | 20.76% |
| ita | 1022 | 916 | 969 | 205 | 764 | 54 | 915 | 1.117 | 0.905 | 23.46% |
| lansi | 1024 | 915 | 968 | 205 | 763 | 54 | 914 | 1.120 | 0.905 | 23.83% |

Korkeussuhde mitataan49.54m kokonaiskorkeuteen (katon yläreuna). Värirajabbox, käsin luettu katon/listan y±4px. Nämä ovat kuvan mittauksia, eivät kalibroitu rakennusmittaus. Vastakkaisleveyksien erot 15.62% / 0.20%. Listan korkeusvaihtelu3.06% keskiarvosta, maaviivojen ero15px.

Yläkuvan bbox[595, 263, 946, 720], lähde[681, 404, 855, 620]; tarkka sijainti/koko FAIL.

Maapohjan jalanjäljessä19626px, nurmenvärisiä385px (1.96%). Tunnistus on väriehto eikä yksin todista kiveystä. Paikallinen jalanjäljestä johdettu skaala0.993m/px. Polkunäytteiden tarkat luvut QA.json:ssa; arvio±2px. Ulkopuolen pikselisamuutta ei väitetä; vastaanottaja käyttää vain maskin sisäosaa.

Lähde- ja ilmansuuntakorjaus #2116 otettu huomioon ennen sivukuvia. Nimeäminen: S=Kléber/SSW ja N=Wagram/NNE ovat kapeat päät; E=Champs-Élysées/ESE ja W=Grande-Armée/WNW ovat suuret kaaret. Katto on180°symmetrinen: viistojen täsmällistä vastakkaisuutta ei voi todentaa pelkästä siluetista; veistosryhmät vaihtuvat, mutta lännen/idän kuva-aiheiden täydellistä veistoshistoriallista vastaavuutta ei hyväksytä. Lounaan promptissa oli ristiriitainen kaakkoinen pääjulkisivumainintaSWkameralle; tämä jää diagnostiikkaan. Molemmat viistot jäävät selvästi65°kulmasta. Yläkuva on ortografinen, mutta koko on noin kaksinkertainen ja sijainti siirtynyt: ei rekisteröintihyväksyntää. Etelän kapealle sivulle tuli virheellisesti pääsivun suuret veistosryhmät; pohjoisessa niitä ei ole. S/N-aukot näyttävät paneeliovilta, vaikka niiden piti olla tummia tyhjiä syvennyksiä. Suuret pääaukot E/W ovat tyhjiä tummia syvennyksiä. Kaikki neljä sivua ovat vaakasuoria ortografisia mutta leveys/korkeussuhde ei vastaa varmennettua rakennusrunkoa. Veistokset ovat liian yksityiskohtaisia tavoiteltuun yksinkertaistukseen. Yksinkertaistettu: nimet ja kaiverrusteksti pois, pieni kattokalusto pois, paksu yhtenäinen kattoparapetti. Runko44,82×22,21×49,54m varmennettiinCMN/CND3D+kaupunginlähteistä; tilauksen51×28×50m poikkeama kirjataan myös vaihtoehtoisena suhteena, jotta lähteen ero ei katoa. Maapohja on tasainen, sisäpuolen aavekorttelit poistettu, kaksitoista liittymäpolkua on näkyvissä ja lännen ulkopuoliset puistot säilyvät visuaalisesti. Alkuperäisen keskisen ympyrän sisärengas vaihtui suuremmaksi kiertopoluksi rakennuksenkiveyksen ympärille; tarkkaa sisäpolkusamuutta ei väitetä. Maskin ulkopuolta ei ole yhdistetty tai jälkikäsitelty: vastaanottajan täytyy leikata vain maskin sisäosa. Ei uusia yrityksiä; koko erä diagnostiseen arviointiin, ei omistajahyväksyntä eikäTripo-lupa.

## Viistokuvamittaus

southwest: {"roofEdgePoints": [[384, 271], [980, 25], [1153, 148]], "measurementMethod": "Two consecutive perpendicular outer roof edges, manually selected ±3px; roof plane proxy, not surveyed ground plane", "uncertaintyDegrees": 3, "pass": false, "estimatedSinElevation": 0.5417188250462353, "estimatedElevationDegrees": 32.80072354007534, "targetSin": 0.9063077870366499, "passTarget": false}

northeast: {"roofEdgePoints": [[383, 271], [980, 24], [1153, 148]], "measurementMethod": "Same roof edge proxy asSW, symmetricoutline;180degreeopposite not independentlyconfirmed", "uncertaintyDegrees": 3, "pass": false, "estimatedSinElevation": 0.544564218730153, "estimatedElevationDegrees": 32.99488889515085, "targetSin": 0.9063077870366499, "passTarget": false}

arkki.jpg ja kolme QA-päällekkäiskuvaa ovat vain arviointia; varsinaisia tuotantokuvia ei jälkikäsitelty.

## Tilauksen muistilukujen erillinen vertailu

Varmennettua runkomittaa käytetään yllä. Jos vertailuna pidetään tilauksen51×28×50m lukua, S/N/E/W W/H-poikkeamat ovat 12.80%, -3.32%, 9.50%, 9.84%. Tämä vaihtoehtoinen vertailu ei korvaa lähteistettyjä rakennusmittoja.

Maskin ulkopuolen tavallinen pikselivertailu: 1484573/1484751 pikseliä muuttui, keskimääräinen kanavaero 6.353/255. Ulkopuoli EI ole pikselilleen sama; käytä vain maskin sisäosaa. Tuotanto-PNG:tä ei tämän vuoksi korjattu tai koostettu.
