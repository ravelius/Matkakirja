# "Yhdistä kolme": lisätyypit c, f, i, Lontoo (SK 16.11.2026, KK:n tilaus)

Dataluonnokset samassa muodossa kuin Pariisin (docs/raportit/yhdista-kolme-lisatyypit-pariisi-20261112.md, PR 6669). VAIN DOCS: ei pelidataa, ei latauksia. Kolmikot eivät toista Lontoon osan A rakennuksia (yhdista-kolme-lontoo-20261113.md). Lähteet: pelin omat jutut (js/packs/nahtavyysjutut.js, merkintä P), en-Wikipedia (WebFetch 16.11.) ja hakutulosten toinen lähde; kuvien lisenssi Commonsin rajapinnasta (imageinfo, Restrictions tyhjä kaikilla). Wikipedian kieliversiot ovat yksi lähde (2L = kaksi riippumatonta). Kuvalinkki: https://commons.wikimedia.org/wiki/File: + tiedosto (välilyönnit alaviivoiksi). Kuvat katsottu silmin ja lisenssit luettu uudelleen Commonsin rajapinnasta 17.11. (kuvaraportti tiedoston lopussa).

**Yhteenveto KK:lle (päivitetty 17.11., KK:n kolme kohtaa tehty):** c 3 paria, f 3 paria, i 3 paria. Kuvia puuttuu pelistä 9 kpl (kaikki uusia; ei yhtään jo pelissä); 1 kuva CC BY 4.0 (Newgate, Wellcome), loput PD; kaikki 9 katsottu silmin ja lisenssi luettu Commonsin rajapinnasta 17.11. (raportti alla). Monet-taulu: National Gallery (NG6399), 2L. Purkuvuodet: vain 2L-vuodet tekstiin (Greenwich "1600-luvulla", Newgate suljettu 1902 ilman purkuvuotta, Euston Arch 1962). Rivillä ei ole avoimia "tarkistettavaa"-kohtia; Wikipedian kieliversiot ovat yksi lähde.

## (c) Kadonnut ↔ mikä seisoo paikalla nyt

Ylärivi kadonnut (KUVA; kadonneilla ei 3D-mallia), lappu = nykyisen paikan nimi (teksti).

| # | Kadonnut | Nyt paikalla (lappu) | Malli nykyisellä | Lähde | Var. |
|---|---|---|---|---|---|
| 1 | Greenwichin palatsi (Placentia; Henrik VII rakensi n. 1500, Henrik VIII s. 1491, Maria I 1516, Elisabet I 1533; purettu 1600-luvulla; paikalle rakennettiin sairaala 1694) | Old Royal Naval College | 3D (OhjelmaKohteet) | ORNC "Greenwich Palace (1498 – 1694)" (ornc.org/our-history/greenwich-palace/): Henrik VII rakensi palatsin n. 1500, Charles II:n uusi palatsi jäi kesken ja muutettiin sairaalaksi; RMG "Greenwich Palace and the Tudors": Placentia rappeutui sisällissodassa ja "was eventually demolished", uusi palatsi muutettiin merisairaalaksi; pelin ORNC-juttu (P) | 2L: "purettiin 1600-luvulla" (ORNC, RMG); tarkka purkuvuosi (1660/1661/1694) lähteissä eri: EI vuotta tekstiin |
| 2 | Newgaten vankila (suljettu 1902; viimeinen julkinen teloitus 1868) | Old Bailey (Central Criminal Court, E. W. Mountford) | EI mallia (kuva) | theprison.org.uk ("The prison closed in 1902 … The new Central Criminal Court, known as the Old Bailey, was then erected on the site") + prisonguide.co.uk (aikajana: "1902 Newgate closes"); old-bailey.com ("The Old Bailey was built on the site of the old Newgate Prison"); en-Wikipedia "Old Bailey" (jail's 1902 closure) | 2L: suljettu 1902 ja Old Bailey paikalla. **Purkuvuosi ristiriidassa (old-bailey.com 1902; theprison.org.uk 1904; prisonguide 1903–04) ja Old Bailey -avauksen vuosi 1907 vain yhdessä avattavassa lähteessä (old-bailey.com): EI vuosia tekstiin paitsi "suljettiin 1902"**; Historic England kieltää ClaudeBotin (ei avattu), History Today 403 (ei kierretty) |
| 3 | Euston Arch (Hardwick 1837; purettu 1962) | Euston-asema | EI mallia (kuva) | en-Wikipedia "Euston Arch" ("demolished in 1962 during the rebuilding of the station"); camdenguides.com/euston-station ("the Arch was demolished by 1962"); buildingconservation.com "Saving a Century" ("finally brought it down in 1962") | 2L+ (3 itsenäistä): purettu 1962 (purkutyö alkoi joulukuussa 1961, 1L: ei tekstiin). Uuden aseman valmistumisvuosi 1968 vain en-Wikipediassa (1L): EI tekstiin. Ei pelin omaa juttua → oma faktarivi kortille |

Varalla: Vanha London Bridge → nykyinen London Bridge (valmis 1973; ei tässä erässä), Whitehallin palatsi → Banqueting House (säilyi; ei "korvaaja").

### Kuvat (c)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| c1 | `Greenwich Palace (anonymous).jpg` | tuntematon | maalaus, Henrik VIII:n aika (Commons-kuvaus) | PD | 1218×880 |
| c2 | `Newgate Gaol in the City of London; a long building with arc Wellcome V0041199.jpg` | Wellcome Collection (kaiverrus) | tuntematon | CC BY 4.0 (tekijä/lähderivi pakollinen) | 4753×1470 |
| c3 | `Euston Arch 1896.jpg` | tuntematon | 1896, valokuva | PD | 593×414 (matala) |

```js
{ id: 'lontoo-kadonneet-1', tyyppi: 'kadonnut-nyt',
  parit: [
    { kohde: { kuva: { tiedosto: 'Greenwich Palace (anonymous).jpg',
        lahde: { tekija: 'tuntematon', teos: 'Greenwich Palace', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Greenwich_Palace_(anonymous).jpg' } } },
      nimi: 'Greenwichin palatsi', lappu: { teksti: 'Old Royal Naval College' } },
    { kohde: { kuva: { tiedosto: 'Newgate Gaol in the City of London; a long building with arc Wellcome V0041199.jpg',
        lahde: { tekija: 'Wellcome Collection', teos: 'Newgate Gaol in the City of London', lisenssi: 'CC BY 4.0', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Newgate_Gaol_in_the_City_of_London;_a_long_building_with_arc_Wellcome_V0041199.jpg' } } },
      nimi: 'Newgaten vankila', lappu: { teksti: 'Old Bailey' } },
    { kohde: { kuva: { tiedosto: 'Euston Arch 1896.jpg',
        lahde: { tekija: 'tuntematon', teos: 'Euston Arch (1896)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Euston_Arch_1896.jpg' } } },
      nimi: 'Euston Arch', lappu: { teksti: 'Euston-asema' } },
  ] }
```

## (f) Taulu ↔ maalari

Taulut Lontoon museossa; ylärivi KUVA (taulu), lappu = maalarin nimi.

| # | Taulu | Maalari | Museo (lähde) | Pelissä jo | Lisenssi / Var. |
|---|---|---|---|---|---|
| 1 | The Fighting Temeraire (maalattu 1838–39, esillä Royal Academyssä 1839) | J. M. W. Turner | National Gallery, Room 40, NG524, Turner Bequest 1856 (nationalgallery.org.uk: "Date made 1839"; Temeraire hinataan Rotherhitheen purettavaksi) + Web Gallery of Art ("1838-39 … National Gallery, London") | juttu Westminsterin palatsi mainitsee Turnerin; kuvaa EI pelissä | PD; 2L (museo + vuosi 1839): kuvan vuosi "1839" |
| 2 | The Stonemason's Yard (n. 1725) | Canaletto | National Gallery, Room 33, NG127, Sir George Beaumont Gift 1823 (nationalgallery.org.uk: "Date made About 1725"; kuvaa Venetsiaa) + en-Wikipedia ("museum: National Gallery", Campo San Vidal Venetsiassa) | Canaletto-nosto (Lontoo 1746–1755) ja Venetsian lehti; tämä kuva ei pelissä | PD; 2L. Huom.: Lontoon museossa mutta kuvaa Venetsiaa: tehtävä "kuka maalasi" toimii pelin omalla Canaletto-jutulla |
| 3 | The Thames below Westminster (n. 1871) | Claude Monet | **National Gallery, Room 41, NG6399**, Lord Astor of Hever -testamenttilahjoitus 1971 (nationalgallery.org.uk/paintings/claude-monet-the-thames-below-westminster: "about 1871"; "Acquired from Dr. Alfred Gold, Berlin, by Tooth's, who sold it in 1936 to The Hon. J. J. Astor") + Web Gallery of Art ("c. 1871, Oil on canvas, 47 x 63 cm, National Gallery, London") | Monet esiintyy Pariisin jutussa (Monet 1874) | PD; 2L: museo National Gallery ja vuosi "n. 1871" (signeeraus "Claude Monet 71" kuvassa). Constable-vaihto ei tarvita |

### Kuvat (f)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| f1 | `The Fighting Temeraire, JMW Turner, National Gallery.jpg` | J. M. W. Turner | 1839 | PD | 5684×4223 |
| f2 | `Canaletto - The Stonemason's Yard.jpg` | Canaletto (Giovanni Antonio Canal) | 1725 | PD | 6000×4640 |
| f3 | `Claude Monet - The Thames below Westminster.jpg` | Claude Monet | 1871 | PD | 17139×11054 (iso, pienennä) |

```js
{ id: 'lontoo-taulut-1', tyyppi: 'taulu-maalari',
  parit: [
    { kohde: { kuva: { tiedosto: 'The Fighting Temeraire, JMW Turner, National Gallery.jpg',
        lahde: { tekija: 'J. M. W. Turner', teos: 'The Fighting Temeraire (1839), National Gallery', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg' } } },
      nimi: 'The Fighting Temeraire', lappu: { teksti: 'J. M. W. Turner' } },
    { kohde: { kuva: { tiedosto: "Canaletto - The Stonemason's Yard.jpg",
        lahde: { tekija: 'Canaletto', teos: "The Stonemason's Yard (n. 1725), National Gallery", lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Stonemason%27s_Yard.jpg' } } },
      nimi: "The Stonemason's Yard", lappu: { teksti: 'Canaletto' } },
    { kohde: { kuva: { tiedosto: 'Claude Monet - The Thames below Westminster.jpg',
        lahde: { tekija: 'Claude Monet', teos: 'The Thames below Westminster (1871)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Thames_below_Westminster.jpg' } } },
      nimi: 'The Thames below Westminster', lappu: { teksti: 'Claude Monet' } },
  ] }
```

## (i) Henkilö ↔ rakennus

Pelin jutuista (nahtavyysjutut.js, P) nimetyt arkkitehdit. Ylärivissä rakennus (3D pyörii), lappu = henkilön muotokuva + nimi. Triviaalit (Big Ben/Barry: nimi ei rakennuksessa, mutta Barry ja Pugin jaettu) jätetty varalle.

| # | Rakennus | Henkilö | Malli | Lähde (pelin juttu) |
|---|---|---|---|---|
| 1 | Pyhän Paavalin katedraali | Christopher Wren | 3D | juttu: "Uuden suunnitteli Christopher Wren, koulutukseltaan tähtitieteilijä" (P) |
| 2 | British Museum | Robert Smirke | 3D | juttu: "Robert Smirke rakensi nykyisen kreikkalaistyylisen pylväsjulkisivun 1823–1852" (P; 1873-taulukko V en-Wikipedia) |
| 3 | Natural History Museum | Alfred Waterhouse | 3D | juttu: "Alfred Waterhousen suunnittelema museo avattiin 1881" (P; taulukko V) |
| varalla | Westminsterin palatsi | Charles Barry (+ Augustus Pugin) | 3D | juttu (P); kaksi nimeä, ei yhtä oikeaa vastausta |

### Kuvat (i)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| i1 | `Christopher Wren by Godfrey Kneller 1711.jpg` | Godfrey Kneller | 1711 maalaus | PD | 1206×1536 |
| i2 | `WP Robert Smirke.jpg` | George Dance (1741–1825) | 1809 | PD | 1517×2083 |
| i3 | `Waterhouse by Copeland.jpg` | Arthur Stockdale Cope | ennen 1886, maalaus | PD | 648×801 |

```js
{ id: 'lontoo-arkkitehdit-1', tyyppi: 'henkilo-rakennus',
  parit: [
    { kohde: { malli: '<St Paul\'s-avain, PK liittää>' }, nimi: 'Pyhän Paavalin katedraali',
      lappu: { kuva: { tiedosto: 'Christopher Wren by Godfrey Kneller 1711.jpg',
        lahde: { tekija: 'Godfrey Kneller', teos: 'Christopher Wren (1711)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Christopher_Wren_by_Godfrey_Kneller_1711.jpg' } }, nimi: 'Christopher Wren' } },
    { kohde: { malli: '<British Museum -avain, PK liittää>' }, nimi: 'British Museum',
      lappu: { kuva: { tiedosto: 'WP Robert Smirke.jpg',
        lahde: { tekija: 'George Dance', teos: 'Robert Smirke (1809)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:WP_Robert_Smirke.jpg' } }, nimi: 'Robert Smirke' } },
    { kohde: { malli: '<NHM-avain, PK liittää>' }, nimi: 'Natural History Museum',
      lappu: { kuva: { tiedosto: 'Waterhouse by Copeland.jpg',
        lahde: { tekija: 'Arthur Stockdale Cope', teos: 'Alfred Waterhouse', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Waterhouse_by_Copeland.jpg' } }, nimi: 'Alfred Waterhouse' } },
  ] }
```

## Mitä uutta tuotava / varmistettava
- Uusia kuvia kaikki 9 (c1–c3, f1–f3, i1–i3); BY-vaatimus vain c2 (Wellcome, CC BY 4.0: tekijä, teos, lisenssi, linkki teoskortissa). Katsottava silmin ennen käyttöä (rajapinnan tiedot eivät riitä): erityisesti c1 (palatsimaalauksen aihe), c2 (rakennuksen julkisivu), i2 (piirros 1809).
- Faktaa tarvitaan: Old Bailey, Euston-asema ja (jos halutaan) Greenwichin palatsin syntymäfaktat eivät ole pelin jutuissa; riville lähde en-Wikipedia + toinen (yllä).
- (KK:n kolme kohtaa 17.11. tehty: Monet-museo, purkuvuodet, kuvaraportti.)
- PK liittää avaimet: St Paul's, British Museum, NHM ja ORNC -mallit.
- Hakuja: noin 12 (6 hakutulosta, 6 WebFetch + Commonsin rajapinta); yksi hakutuloksen otteessa oli tekoälylle osoitettu kehote, ohitettu.

## Kuvaraportti (SK 17.11.2026, Pariisin mallin mukaan #6669, #6670)

Lisenssit luettu Commonsin rajapinnasta (`action=query&prop=imageinfo&iiprop=extmetadata`, 17.11.): kaikilla `Restrictions` tyhjä; mikään ei ole pelissä jo. Kuvat ladattu 960 px:n esikatseluina ja katsottu silmin; alkuperäiset (koot alla) vasta datavaiheessa. Katsojan huomio = mitä kuvassa näkyy ja sopiiko tehtävään.

| Id | Tiedosto | Lisenssi (API) | Koko | Silmin katsottu 17.11. |
|---|---|---|---|---|
| c1 | `Greenwich Palace (anonymous).jpg` | PD | 1218×880 | Joenrantanäkymä: pitkä kaksikerroksinen tiilipalatsi torneineen ja savupiippuineen Thamesin rannalla, etualalla purjevene, soutuvene ja kaksimastoinen laiva; keltainen, vanhentunut maalauspinta. Sopii "Greenwichin palatsi" -kuvaksi; ei vääristymiä. |
| c2 | `Newgate Gaol … Wellcome V0041199.jpg` | CC BY 4.0 (tekijä, teos, lisenssi ja linkki näkyviin) | 4753×1470 | Kaiverrettu julkisivupiirros "NEW NEWGATE … Published according to Act of Parliament, August 1st 1771": pitkä kolmikerroksinen rakennus, keskellä korotettu osa ja kolme holvikaarta alakerrassa. **Arkkitehtuuripiirros, ei maisemakuva; leveä (3,2:1) joten rajaus tarvitaan**; sopii Newgaten tunnistamiseen (1770-luvun uusi Newgate, sama vankila joka suljettiin 1902). |
| c3 | `Euston Arch 1896.jpg` | PD | 593×414 | Mustavalkoinen valokuva: dooriset pylväät ja pääty "EUSTON"-kirjoituksella, hevoskärryt ja kaasulyhdyt; selkeä ja tunnistettava, mutta **matala resoluutio (593 px), ei suurenna hyvin**. |
| f1 | `The Fighting Temeraire, JMW Turner, National Gallery.jpg` | PD | 5684×4223 | Turnerin taulu: haamunvalkea purjelaiva ja höyrytukialus, laskeva aurinko oikealla, kultaiset ja siniset sävyt; tunnistettava, ei vääristymiä. |
| f2 | `Canaletto - The Stonemason's Yard.jpg` | PD | 6000×4640 | Venetsialainen kivenhakkaajan piha, kampanile ja kanaali taustalla, punaiset talot oikealla; tunnistettava Canaletto; kuvaa Venetsiaa (ei Lontoota). |
| f3 | `Claude Monet - The Thames below Westminster.jpg` | PD | 17139×11054 | Sumuinen Thames, Westminster-silta ja parlamentin torni (Big Ben) oikealla, laituri etualalla, signeeraus "Claude Monet 71" oikealla alhaalla; tunnistettava. Valtava alkuperäinen: pienennettävä. |
| i1 | `Christopher Wren by Godfrey Kneller 1711.jpg` | PD | 1206×1536 | Pitkätukkainen mies samettitakissa ja punaisessa nojatuolissa, piirros kirkon pohjakaavasta ja harpit kädessä; kulmassa kirjoitus "Sir Chr: Wren … died … aged 91" ja signeeraus "G. Kneller p. 1711". Sopii; teksti kuvassa on myöhempi lisäys (kuolinvuosi). |
| i2 | `WP Robert Smirke.jpg` | PD | 1517×2083 | Profiilikuva etsauksena, valkoinen kaulus ja takki, alla "Robert Smirke Jun.r", vuosi 1809; vaalea paperi; tunnistettava mutta **kuva on kopion (1809 etsaus) tuntuinen ja paperin reunat näkyvät**, rajaus tarvitaan. |
| i3 | `Waterhouse by Copeland.jpg` | PD | 648×801 | Soikea maalausmuotokuva valkopartaisesta miehestä profiilissa, ruskea tausta, signeeraus "1888"; **matala resoluutio (648 px)**; Commonsin kuvauksessa "ennen 1886" ja kuvassa signeeraus näyttää 1888: vuotta ei käytetä kuvatekstissä. |

**Kuvien tila:** yhdeksästä kaikki käyttökelpoisia; rajattavia: c2 (leveä), i2 (paperin reunat), i3 (matala). Matalat (c3 593 px, i3 648 px) kelpaavat vain pieneen näyttöön. BY-vaatimus: vain c2.
