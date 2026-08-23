# Herokuvien riskiarvio
Mittausvaihe (ei kuvien katselua eikä arviointia): jokaiselle 258:lle `herokoe/`-alkuiselle herokuvalle pääteltiin kuvatekstin perusteella väitetty kohdeluokka, ja Wikimedia Commonsin rajapinnasta mitattiin kuvadatan tiheys (oman Commons-kategorian tiedostomäärä ja hakuosumat). Tulos on riskijärjestys seuraavalle vaiheelle, joka katsoo kuvat silmin.

**HUOM — mittaus jäi kesken JA osa tuloksista on epäluotettavia:** Wikimedia Commonsin rajapinta alkoi rajoittaa hakuja (HTTP 429) kesken ajon. Luokittelu (a/b/c) on valmis kaikille 258 kuvalle, mutta Commons-mittaus yritettiin vain **138/258** kuvalle — loput **120** eivät edes yrittäneet, ja ne on merkitty taulukkoon tekstillä "EI MITATTU". Yritetyistäkin **59 kuvan mittaus epäonnistui kokonaan** (429 rikkoi molemmat osahaut, ei aitoa nollatulosta) ja **7** jäi osittaiseksi. Luotettavasti mitattuja on siis vain **72/258**. Mikään näistä puutteista ei ole jätetty pois taulukosta — kaikki näkyvät omilla merkinnöillään, jotta puute näkyy eikä häviä. Kärkilista alempana on rakennettu vain luotettavasti mitatuista kuvista; sekä mittaamattomat että epäonnistuneet a-luokan kuvat on listattu erikseen, koska niidenkin riski on toistaiseksi tuntematon — ei tiedetä matalaksi.
## Menetelmä lyhyesti
1. **Poiminta**: kaikki `ampari: 'herokoe/...'`-kentän sisältävät kuvat js/packs/kulttuuri-kategoriat.js:stä (258 kpl), kuvateksti (`selite`) talteen sellaisenaan.
2. **Luokittelu (a/b/c)**: automatisoitu päättely kuvatekstin ensimmäisestä lauseesta — subjektin/pääkohteen tunnistus (verbirajapinta), sitten avainsanahaku (silta/aukio/puisto/katu = b, yleisnäkymä/vanhakaupunki/alue = c, muuten oletus a). Noin 50 rajatapausta (kaikki b- ja c-luokat sekä kaikki tapaukset, joissa päättely valitsi "henkilö rakensi kohteen" -lauserakenteesta väärän osan tai jätti nimen kesken) tarkistettiin ja korjattiin käsin. Loput noin 200 a-luokan kuvaa jäivät automaattipäättelyn varaan.
3. **Kohteen nimi Commons-hakua varten**: kuvatekstistä poimittu erisnimifraasi (`kohteen nimi` -sarake), tarvittaessa lyhennetty hakukelpoisemmaksi (`core_name`). Jos alkuperäinen fraasi ei tuottanut osumia, kokeiltiin myös sen loppuosaa (esim. rakennuttajan tai arkkitehdin nimi pudotettuna alusta) — tällä vältettiin ilmeinen väärä riskimerkintä, jossa esimerkiksi "Christopher Wrenin St Paulin katedraali" antoi 0 osumaa mutta "St Paulin katedraali" tuhansia.
4. **Commons-mittaus**: `list=search&srnamespace=14` haki parhaiten täsmäävän Commons-kategorian, jonka jäsenmäärä (`cmtype=file`, kattoraja 500) on päämittari. Rinnalla `list=search&srnamespace=6` kertoo koko tiedostohaun osumamäärän (löysempi, kielimuodoille sietokykyisempi mittari). Jos kategoriaa ei löytynyt, se on kirjattu omaan sarakkeeseensa — sellaisenaan vahva riskisignaali. **Commons alkoi rajoittaa (429) osaa hauista, ja mittaus jäi tältä osin vajaaksi — ks. yllä oleva huomautus ja alempana "Ei mitatut kuvat".**
5. **Riskipisteet** = luokkapaino (a=3, b=2, c=1) × niukkuuspaino (kategorian tiedostomäärän perusteella: alle 5 = 5, alle 20 = 4, alle 50 = 3, alle 150 = 2, 150 tai enemmän = 1; "ei kategoriaa" = 5). Asteikko 1–15. Mittaamattomille kuville riskipisteitä ei laskettu ("EI MITATTU").
## Yhteenveto
- Kuvia yhteensä: **258**. Luotettavasti mitattu Commonsista: **72**. Mittaus yritettiin muttei onnistunut: **59** (429 rikkoi molemmat osahaut). Osittain mitattu: **7**. Ei edes yritetty (429-rajoitus pysäytti ajon ensin): **120**.
- Luokkajakauma (kaikki 258): **a) 226** nimetty rakennus tai monumentti, **b) 30** nimetty katu, aukio, puisto tai silta, **c) 2** yleisnäkymä ilman nimettyä kohdetta.
- Luotettavasti mitatuista kohteista ilman omaa Commons-kategoriaa: **15** / 72.
- **59 kuvan mittaus epäonnistui kokonaan** (josta **58** on a-luokkaa): sekä kategoriahaku että tiedostohaku palauttivat tyhjää samalla rivillä, mikä on tunnusomaista API-kutsun epäonnistumiselle 429-rajoituksen alla — ei aidolle nollatulokselle. Näitä ei lasketa kärkilistaan eikä niille annettu riskipisteitä; ks. oma taulukkonsa alempana.
- **7 kuvaa jäivät osittain mitatuiksi**: oikea Commons-kategoria löytyi, mutta sen tiedostomäärän laskenta katkesi 429-rajoitukseen. Nämä eivät ole mukana kärkilistassa (riskipisteitä ei voitu laskea) — ks. taulukko.
- **Kärkilista** (luokka a JA Commons-kategoriassa alle 20 tiedostoa, laskettu vain täysin mitatuista): **29 kuvaa**, joista **13 on todennäköisesti mittausvirhe** (ks. varoitus Kärkilista-osiossa) — luultavasti oikeasti alempana on suunnilleen **16 kuvaa**.
- Lisäksi **96 a-luokan kuvaa jäi kokonaan mittaamatta** — niiden riski on tuntematon, ei oletettavasti matala; ks. oma listansa alempana.
- Kašgarin tunnettu virhekuva (`hero-kashgar-keskipaiva.png`, Yusuf Balasagunin mausoleumi): **EI MITATTU** — jäi 429-rajoituksen taakse ennen kuin ehdittiin siihen asti. Se pitää mitata ensimmäisenä seuraavalla ajolla, koska kyseessä on tunnettu virhetapaus eikä sen riskiä siksi voi jättää auki. Menetelmä on aiemmin (testiajossa) sijoittanut sen korkeaksi riskiksi — ks. rajoitukset-osio.
- Kärkilistalla toistuvat kaupungit (vähintään 3 kuvaa):
  - Moskova: 3 kuvaa

## Kärkilista
Nämä ovat kuvat, jotka seuraava vaihe katsoo silmin ensin: luokka on **a** (nimetty yksittäinen rakennus tai monumentti) JA Commons-kategoriassa on alle 20 tiedostoa — tai kategoriaa ei löytynyt lainkaan. Vain mitatuista 72 kuvasta.

**Menetelmävaroitus — 13 riviä listan kärjessä ovat todennäköisesti mittausvirheitä, ei oikeasti niukkoja.** Kahdenlaisia tapauksia: (1) "Commons-kategoria" on "ei löytynyt", mutta hakuosumia (`srnamespace=6`) on silti vähintään 500 — esim. Sagrada Família ja Pantheon; (2) kategoria LÖYTYI oikein, mutta sen tiedostomäärä on 0–2 vaikka hakuosumia on satoja tuhansia — esim. Kremlin (Category:Kremlin, 0 tiedostoa, 61 420 hakuosumaa) ja Hagia Sofia (0 tiedostoa, 14 310 hakuosumaa). Molemmissa Commonsissa on tosiasiassa selvästi tuhansia kuvia. Todennäköisin selitys on, että 429-rajoitus tai rinnakkaisajon kuormitus rikkoi joko kategoriahaun tai jäsenmäärän laskennan juuri näillä riveillä, ja koodi tulkitsi epäonnistuneen/typistetyn vastauksen samaksi asiaksi kuin aidon niukan tuloksen — näitä ei erotettu toisistaan tässä ajossa. Rivit on merkitty alla **⚠**-merkillä eikä niitä pidä katsoa ensimmäisenä; oikea kärkipää löytyy niiden alta, riveiltä joilla hakuosumatkin ovat matalat.

| # | Tiedosto | Kaupunki | Kohteen nimi | Commons-kategoria | Kategorian tiedostot | Hakuosumat | Riskipisteet |
|---|---|---|---|---|---|---|---|
| 1 | `hero7-oodi.png` | Helsinki | Keskustakirjasto Oodi ⚠ | *(ei löytynyt)* | – | 1654085 | 15 |
| 2 | `hero-barcelona-aamu.png` | Barcelona | Sagrada Família ⚠ | *(ei löytynyt)* | – | 44266 | 15 |
| 3 | `hero-kobenhavn-ilta.png` | Kööpenhamina | Vapahtajan kirkko ⚠ | *(ei löytynyt)* | – | 17216 | 15 |
| 4 | `hero-krakova-ilta.png` | Krakova | Sukiennice ⚠ | *(ei löytynyt)* | – | 3676 | 15 |
| 5 | `hero-tabriz-aamu.png` | Tabriz | Tabrizin Sininen moskeija ⚠ | *(ei löytynyt)* | – | 2936 | 15 |
| 6 | `hero-damaskos-aamu.png` | Damaskos | Umaijadimoskeija ⚠ | *(ei löytynyt)* | – | 1850 | 15 |
| 7 | `hero-ankara-aamu.png` | Ankara | Anıtkabir ⚠ | *(ei löytynyt)* | – | 1030 | 15 |
| 8 | `hero-tampere-keskipaiva.png` | Tampere | Tampereen pääkirjasto Metso ⚠ | *(ei löytynyt)* | – | 604 | 15 |
| 9 | `hero-tampere-aamu.png` | Tampere | Tampereen Näsilinna | *(ei löytynyt)* | – | 22 | 15 |
| 10 | `hero-rooma-ilta.png` | Rooma | Pantheonin | *(ei löytynyt)* | – | 2 | 15 |
| 11 | `hero-praha-aamu.png` | Praha | Pyhän Vituksen katedraalin | *(ei löytynyt)* | – | 1 | 15 |
| 12 | `hero-dublin-ilta.png` | Dublin | James Gandonin | *(ei löytynyt)* | – | 1 | 15 |
| 13 | `hero-moskova-ilta.png` | Moskova | Moskovan valtionyliopiston päärakennus | *(ei löytynyt)* | – | 1 | 15 |
| 14 | `hero-mekka-aamu.png` | Mekka | Suuren moskeijan | *(ei löytynyt)* | – | 1 | 15 |
| 15 | `hero-moskova-keskipaiva.png` | Moskova | Kremlin ⚠ | Category:Kremlin | 0 | 61420 | 15 |
| 16 | `hero-istanbul-aamu.png` | Istanbul | Hagia Sofia ⚠ | Category:Hagia Sofia | 0 | 14310 | 15 |
| 17 | `hero-wien-keskipaiva.png` | Wien | Schönbrunn ⚠ | Category:Schönbrunn (surname) | 0 | 13551 | 15 |
| 18 | `hero-pietari-keskipaiva.png` | Pietari | Verikirkko | Category:Church of the Saviour on the Blood | 0 | 499 | 15 |
| 19 | `hero7-tuomiokirkko.png` | Helsinki | Carl Ludvig Engelin | Category:Churches by Carl Ludvig Engel | 1 | 108 | 15 |
| 20 | `hero-venetsia-ilta.png` | Venetsia | Santa Maria della Salute ⚠ | Category:Santa Maria della Salute (Venice) | 2 | 108313 | 15 |
| 21 | `hero-mekka-keskipaiva.png` | Mekka | Abraj Al-Bait -tornin ⚠ | Category:Abraj Al Bait Towers | 2 | 39296 | 15 |
| 22 | `hero-wien-ilta.png` | Wien | Valtionooppera | Category:Hamburgische Staatsoper | 5 | 1268 | 12 |
| 23 | `hero-petra-aamu.png` | Petra | Al-Khazneh eli Aarrekammio | Category:Treasury of Cyrene (Olympia) | 5 | 0 | 12 |
| 24 | `hero-teheran-ilta.png` | Teheran | Milad-torni | Category:Milad Tower | 6 | 0 | 12 |
| 25 | `hero-riika-ilta.png` | Riika | Riian Pyhän Pietarin kirkko | Category:Lieto church | 8 | 445 | 12 |
| 26 | `hero-petra-keskipaiva.png` | Petra | Ad-Deir eli Luostari | Category:Lintula Holy Trinity Convent | 11 | 18 | 12 |
| 27 | `hero-lontoo-ilta.png` | Lontoo | Christopher Wrenin St Paulin katedraali | Category:St. Paul's Cathedral | 14 | 2460 | 12 |
| 28 | `hero-barcelona-keskipaiva.png` | Barcelona | Casa Batlló | Category:Casa Batlló | 14 | 1951 | 12 |
| 29 | `hero-moskova-aamu.png` | Moskova | Vasilin katedraali | Category:Saint Basil's Cathedral | 17 | 122 | 12 |

## Epäonnistuneen mittauksen a-luokan kuvat (tarkista ensin)
Näillä kuvilla väite on luokkaa **a** (korkein riskiluokka), ja Commons-mittausta yritettiin, mutta molemmat osahaut palauttivat tyhjää samalla rivillä (429-rajoituksen jälki, ei aito nollatulos). Riski on tuntematon.

| Tiedosto | Kaupunki | Kohteen nimi |
|---|---|---|
| `hero-amsterdam-aamu.png` | Amsterdam | Westerkerkin torni |
| `hero-amsterdam-keskipaiva.png` | Amsterdam | Pierre Cuypersin |
| `hero-ankara-keskipaiva.png` | Ankara | Hacı Bayramin moskeija |
| `hero-ateena-keskipaiva.png` | Ateena | Zeuksen temppelin |
| `hero-bagdad-aamu.png` | Bagdad | Mustansiriyan |
| `hero-bagdad-ilta.png` | Bagdad | Marttyyrien muistomerkki |
| `hero-bagdad-keskipaiva.png` | Bagdad | Kadhimiyan pyhäkkö |
| `hero-budapest-keskipaiva.png` | Budapest | Kalastajanlinnakkeen |
| `hero-delhi-aamu.png` | Delhi | Humayunin hauta |
| `hero-doha-ilta.png` | Doha | West Bayn tornirykelmä |
| `hero-dubai-keskipaiva.png` | Dubai | Purjeen |
| `hero-dublin-aamu.png` | Dublin | Trinity Collegen kellotorni |
| `hero-edinburgh-aamu.png` | Edinburgh | Edinburghin linna |
| `hero-edinburgh-ilta.png` | Edinburgh | Calton Hillin kansallismonumentti |
| `hero-edinburgh-keskipaiva.png` | Edinburgh | St Gilesin katedraalin kruunutorni |
| `hero-firenze-aamu.png` | Firenze | Brunelleschin |
| `hero-firenze-ilta.png` | Firenze | Palazzo Vecchio |
| `hero-isfahan-aamu.png` | Isfahan | Shaahin moskeija |
| `hero-isfahan-ilta.png` | Isfahan | Sheikh Lotfollahin moskeija |
| `hero-jerusalem-aamu.png` | Jerusalem | Kalliomoskeija |
| `hero-jerusalem-keskipaiva.png` | Jerusalem | Daavidin tornin sitadelli |
| `hero-kairo-ilta.png` | Kairo | Kairon torni |
| `hero-krakova-keskipaiva.png` | Krakova | Mariacki-kirkon tornit |
| `hero-kuwait-aamu.png` | Kuwait | Kuwaitin tornit |
| `hero-kuwait-ilta.png` | Kuwait | Seifin palatsin |
| `hero-kuwait-keskipaiva.png` | Kuwait | Kuwaitin suurmoskeija |
| `hero-kobenhavn-aamu.png` | Kööpenhamina | Marmorikirkon eli Frederikin kirkon |
| `hero-lissabon-keskipaiva.png` | Lissabon | Jerónimosin luostarin |
| `hero-luxor-aamu.png` | Luxor | Karnakin Amonin temppelialuetta |
| `hero-luxor-ilta.png` | Luxor | Deir el-Bahari (Hatshepsutin muistotemppeli) |
| `hero-luxor-keskipaiva.png` | Luxor | Luxorin temppelin |
| `hero-madrid-aamu.png` | Madrid | Madridin kuninkaanlinna |
| `hero-madrid-ilta.png` | Madrid | Kybele-jumalattaren suihkulähde |
| `hero-masqat-ilta.png` | Masqat | Al Jalalin ja Al Miranin linnakkeet |
| `hero-masqat-keskipaiva.png` | Masqat | Mutrahin korniisi |
| `hero-oslo-ilta.png` | Oslo | Oslon kuninkaanlinna |
| `hero-oslo-keskipaiva.png` | Oslo | Holmenkollenissa |
| `hero-pariisi-ilta.png` | Pariisi | Sacré-Cœurin basilikaa |
| `hero-pariisi-keskipaiva.png` | Pariisi | Notre-Damen katedraalia |
| `hero-peking-keskipaiva.png` | Peking | Taivaan temppelissä |
| `hero-petra-ilta.png` | Petra | Kuningashautojen |
| `hero-pietari-ilta.png` | Pietari | Pietari-Paavalin katedraalin |
| `hero-praha-ilta.png` | Praha | Tynin kirkkoa |
| `hero-riad-aamu.png` | Riad | Masmakin savitiililinnoitus |
| `hero-riad-ilta.png` | Riad | Kingdom Centre |
| `hero-riad-keskipaiva.png` | Riad | Al Faisaliahin torni |
| `hero-riika-keskipaiva.png` | Riika | Riian vapaudenpatsas |
| `hero-rooma-keskipaiva.png` | Rooma | Pietarinkirkkoa |
| `hero-tabriz-keskipaiva.png` | Tabriz | Tabrizin Arg eli Alishahin |
| `hero-tallinna-ilta.png` | Tallinna | Tallinnan teletorni |
| `hero-teheran-aamu.png` | Teheran | Azadi-torni |
| `hero-tokio-keskipaiva.png` | Tokio | Tokion torni |
| `hero-tukholma-ilta.png` | Tukholma | Riddarholmenin kirkko |
| `hero-varsova-aamu.png` | Varsova | Varsovan kuninkaanlinna |
| `hero-varsova-ilta.png` | Varsova | Saaripalatsi |
| `hero-varsova-keskipaiva.png` | Varsova | Wilanówin palatsin |
| `hero-venetsia-aamu.png` | Venetsia | Markuksenkirkon |
| `hero-wien-aamu.png` | Wien | Stephansdomin etelätorni |

## Ei mitatut a-luokan kuvat (tarkista seuraavana)
Näillä kuvilla väite on luokkaa **a** (korkein riskiluokka), mutta Commons-mittausta ei edes ehditty yrittää (429-rajoitus pysäytti ajon aiemmin). Riski on tuntematon — ei oletettavasti matala. Nämä kannattaa joko mitata ensin uudella ajolla tai katsoa suoraan silmin kärkilistan rinnalla.

| Tiedosto | Kaupunki | Kohteen nimi |
|---|---|---|
| `hero-astana-aamu.png` | Astana | Bayterek |
| `hero-astana-ilta.png` | Astana | Hazrat Sultanin moskeija |
| `hero-astana-keskipaiva.png` | Astana | Khan Shatyr |
| `hero-auckland-aamu.png` | Auckland | Aucklandin Sky Tower |
| `hero-auckland-ilta.png` | Auckland | Maungawhau eli Mount Eden |
| `hero-auckland-keskipaiva.png` | Auckland | Rangitoto |
| `hero-bangkok-aamu.png` | Bangkok | Wat Arun, Aamunkoiton temppeli |
| `hero-bangkok-ilta.png` | Bangkok | Wat Pho |
| `hero-bangkok-keskipaiva.png` | Bangkok | Suuri palatsi |
| `hero-bergen-aamu.png` | Bergen | Bergenin Johanneksen kirkko |
| `hero-bergen-ilta.png` | Bergen | Bergenin Grieghallen |
| `hero-bergen-keskipaiva.png` | Bergen | Bergenin Fløibanen-köysirata |
| `hero-buenosaires-aamu.png` | Buenos Aires | Obelisco de Buenos Aires |
| `hero-buenosaires-ilta.png` | Buenos Aires | Puerto Maderon Puente de la Mujer |
| `hero-buenosaires-keskipaiva.png` | Buenos Aires | Casa Rosada |
| `hero-chennai-aamu.png` | Chennai | Kapaleeshwararin temppelin |
| `hero-chennai-ilta.png` | Chennai | Santhomen basilika |
| `hero-chennai-keskipaiva.png` | Chennai | Madrasin ylioikeus |
| `hero-colombo-aamu.png` | Colombo | Gangaramayan temppeli |
| `hero-colombo-ilta.png` | Colombo | Lotus Tower |
| `hero-colombo-keskipaiva.png` | Colombo | Punavalkoraidallinen Jami Ul-Alfar |
| `hero-delhi-keskipaiva.png` | Delhi | Punainen linnoitus (Lal Qila) |
| `hero-hanoi-aamu.png` | Hanoi | Hoan Kiem eli Palautetun |
| `hero-hanoi-keskipaiva.png` | Hanoi | Yhden pylvään pagodi |
| `hero-hongkong-ilta.png` | Hongkong | Star Ferry |
| `hero-hongkong-keskipaiva.png` | Hongkong | Tian Tan Buddha |
| `hero-jakarta-aamu.png` | Jakarta | Kansallismonumentti Monas |
| `hero-jakarta-ilta.png` | Jakarta | Sunda Kelapan |
| `hero-jakarta-keskipaiva.png` | Jakarta | Istiqlal |
| `hero-jekaterinburg-aamu.png` | Jekaterinburg | Jekaterinburgin Veren kirkko |
| `hero-jekaterinburg-ilta.png` | Jekaterinburg | Iset-torni |
| `hero-jekaterinburg-keskipaiva.png` | Jekaterinburg | Uralmashin Valkoinen torni |
| `hero-kanton-aamu.png` | Kanton (Guangzhou) | Chenin esi-isäintemppeli (Chen Clan Academy) |
| `hero-kanton-ilta.png` | Kanton (Guangzhou) | Canton Tower |
| `hero-kanton-keskipaiva.png` | Kanton (Guangzhou) | Kantonin Pyhän |
| `hero-karachi-aamu.png` | Karachi | Mazar-e-Quaidin |
| `hero-karachi-ilta.png` | Karachi | Masjid |
| `hero-karachi-keskipaiva.png` | Karachi | Empress Market |
| `hero-kashgar-keskipaiva.png` | Kashgar | Yusuf Balasagunin mausoleumi |
| `hero-kathmandu-aamu.png` | Kathmandu | Boudhanathin stupa |
| `hero-kathmandu-ilta.png` | Kathmandu | Swayambhunathin |
| `hero-kioto-aamu.png` | Kioto | Kinkaku-ji |
| `hero-kioto-ilta.png` | Kioto | Kiyomizu-deran |
| `hero-kolkata-aamu.png` | Kolkata | Victoria Memorial |
| `hero-kolkata-ilta.png` | Kolkata | Dakshineswarin Kali-temppeli |
| `hero-lhasa-aamu.png` | Lhasa | Jokhangin temppelin |
| `hero-lhasa-ilta.png` | Lhasa | Norbulingkan |
| `hero-lhasa-keskipaiva.png` | Lhasa | Drepungin luostarin |
| `hero-mandalay-aamu.png` | Mandalay | Atumashin luostari |
| `hero-mandalay-ilta.png` | Mandalay | Kyauktawgyin temppelin |
| `hero-mandalay-keskipaiva.png` | Mandalay | Sandamunin pagodi |
| `hero-manila-aamu.png` | Manila | Fort Santiagon kivilinnoitus |
| `hero-manila-ilta.png` | Manila | Nykyinen Manilan katedraali |
| `hero-manila-keskipaiva.png` | Manila | San Agustinin kirkko |
| `hero-montreal-ilta.png` | Montreal | Montrealin olympiastadionin torni |
| `hero-montreal-keskipaiva.png` | Montreal | Montrealin Biosphère |
| `hero-mumbai-aamu.png` | Mumbai | Gateway of India |
| `hero-mumbai-keskipaiva.png` | Mumbai | Chhatrapati Shivaji Terminus |
| `hero-newyork-ilta.png` | New York | Empire State Building |
| `hero-newyork-keskipaiva.png` | New York | Vapaudenpatsas |
| `hero-rio-aamu.png` | Rio de Janeiro | Corcovadon |
| `hero-rio-keskipaiva.png` | Rio de Janeiro | Sokerileivän |
| `hero-samarkand-aamu.png` | Samarkand | Sherdorin medresa |
| `hero-samarkand-ilta.png` | Samarkand | Bibi-Khanymin moskeijan |
| `hero-samarkand-keskipaiva.png` | Samarkand | Gur-e-Amiria |
| `hero-sanfrancisco-keskipaiva.png` | San Francisco | San Franciscon |
| `hero-sevilla-aamu.png` | Sevilla | Sevillan Giralda |
| `hero-sevilla-ilta.png` | Sevilla | Sevillan Metropol Parasol |
| `hero-shanghai-aamu.png` | Shanghai | Oriental Pearl -torni |
| `hero-singapore-aamu.png` | Singapore | Marina Bay Sands |
| `hero-singapore-ilta.png` | Singapore | Sulttaanin moskeija |
| `hero-singapore-keskipaiva.png` | Singapore | Gardens by the Bayn |
| `hero-soul-aamu.png` | Soul | Gyeongbokgung |
| `hero-soul-ilta.png` | Soul | Namsanin torni (N Seoul Tower) |
| `hero-soul-keskipaiva.png` | Soul | Sungnyemun eli Namdaemun |
| `hero-sydney-aamu.png` | Sydney | Sydneyn oopperatalo |
| `hero-sydney-ilta.png` | Sydney | Bondin |
| `hero-tabriz-ilta.png` | Tabriz | Tabrizin kaupungintalo eli Saat-torni |
| `hero-taipei-aamu.png` | Taipei | Taipei |
| `hero-taipei-ilta.png` | Taipei | Longshanin temppeli |
| `hero-taipei-keskipaiva.png` | Taipei | Chiang Kai-shekin |
| `hero-tokio-ilta.png` | Tokio | Tokion aseman asemapalatsi |
| `hero-tripoli-aamu.png` | Tripoli | Tripolin Punainen linna eli Assai |
| `hero-tripoli-keskipaiva.png` | Tripoli | Marcus Aureliuksen |
| `hero-ulanbator-aamu.png` | Ulan Bator | Gandanin luostari |
| `hero-ulanbator-ilta.png` | Ulan Bator | Zaisanin muistomerkki |
| `hero-vladivostok-keskipaiva.png` | Vladivostok | Vladivostokin |
| `hero-wellington-aamu.png` | Wellington | Beehive (Wellington) |
| `hero-wellington-ilta.png` | Wellington | Wellingtonin vanha |
| `hero-wellington-keskipaiva.png` | Wellington | Uuden-Seelannin kansallismuseo Te Papa Tongarewa |
| `hero-xian-aamu.png` | Xi'an | Suuri villihanhipagoda |
| `hero-xian-ilta.png` | Xi'an | Kellotorni |
| `hero-xian-keskipaiva.png` | Xi'an | Eteläportti |
| `hero-yangon-aamu.png` | Yangon | Shwedagonin |
| `hero-yangon-ilta.png` | Yangon | Karaweik |
| `hero-yangon-keskipaiva.png` | Yangon | Sule-pagodi |

## Kaikki 258 kuvaa (mitatut riskijärjestyksessä, sitten ei-mitatut)
Taulukko sisältää kaikki herokuvat. Sarake `Luokka` on pääteltävä väite (a/b/c, ks. menetelmä). `Kohteen nimi` on Commons-hakuun käytetty erisnimifraasi (ei aina sanasta sanaan kuvatekstin mukainen — ks. menetelmän kohta 3). `Hakukysely` kertoo, mikä versio nimestä lopulta käytettiin (päätökysely tai loppuosa-fallback). Riveillä, joilla Commons-sarakkeet lukevat **EI MITATTU**, mittaus jäi 429-rajoituksen taakse — niitä ei ole arvioitu, ei todettu vähädataisiksi eikä runsasdataisiksi.

<details><summary>Näytä kaikki 258 riviä</summary>

| Tiedosto | Kaupunki | Luokka | Kohteen nimi | Hakukysely | Commons-kategoria | Kategorian tiedostot | Hakuosumat | Riskipisteet |
|---|---|---|---|---|---|---|---|---|
| `hero-ankara-aamu.png` | Ankara | a | Anıtkabir ⚠ | Anıtkabir | *(ei löytynyt)* | – | 1030 | 15 |
| `hero-barcelona-aamu.png` | Barcelona | a | Sagrada Família ⚠ | Sagrada Família | *(ei löytynyt)* | – | 44266 | 15 |
| `hero-damaskos-aamu.png` | Damaskos | a | Umaijadimoskeija ⚠ | Umaijadimoskeija | *(ei löytynyt)* | – | 1850 | 15 |
| `hero-dublin-ilta.png` | Dublin | a | James Gandonin | James Gandonin | *(ei löytynyt)* | – | 1 | 15 |
| `hero-kobenhavn-ilta.png` | Kööpenhamina | a | Vapahtajan kirkko ⚠ | Vapahtajan kirkko | *(ei löytynyt)* | – | 17216 | 15 |
| `hero-krakova-ilta.png` | Krakova | a | Sukiennice ⚠ | Sukiennice | *(ei löytynyt)* | – | 3676 | 15 |
| `hero-mekka-aamu.png` | Mekka | a | Suuren moskeijan | Suuren moskeijan | *(ei löytynyt)* | – | 1 | 15 |
| `hero-moskova-ilta.png` | Moskova | a | Moskovan valtionyliopiston päärakennus | Moskovan valtionyliopiston päärakennus | *(ei löytynyt)* | – | 1 | 15 |
| `hero-praha-aamu.png` | Praha | a | Pyhän Vituksen katedraalin | Pyhän Vituksen katedraalin | *(ei löytynyt)* | – | 1 | 15 |
| `hero-rooma-ilta.png` | Rooma | a | Pantheonin | Pantheonin | *(ei löytynyt)* | – | 2 | 15 |
| `hero-tabriz-aamu.png` | Tabriz | a | Tabrizin Sininen moskeija ⚠ | Sininen moskeija | *(ei löytynyt)* | – | 2936 | 15 |
| `hero-tampere-aamu.png` | Tampere | a | Tampereen Näsilinna | Tampereen Näsilinna | *(ei löytynyt)* | – | 22 | 15 |
| `hero-tampere-keskipaiva.png` | Tampere | a | Tampereen pääkirjasto Metso ⚠ | Tampereen pääkirjasto Metso | *(ei löytynyt)* | – | 604 | 15 |
| `hero7-oodi.png` | Helsinki | a | Keskustakirjasto Oodi ⚠ | Keskustakirjasto Oodi | *(ei löytynyt)* | – | 1654085 | 15 |
| `hero-istanbul-aamu.png` | Istanbul | a | Hagia Sofia ⚠ | Hagia Sofia | Category:Hagia Sofia | 0 | 14310 | 15 |
| `hero-moskova-keskipaiva.png` | Moskova | a | Kremlin ⚠ | Kremlin | Category:Kremlin | 0 | 61420 | 15 |
| `hero-pietari-keskipaiva.png` | Pietari | a | Verikirkko | Verikirkko | Category:Church of the Saviour on the Blood | 0 | 499 | 15 |
| `hero-wien-keskipaiva.png` | Wien | a | Schönbrunn ⚠ | Schönbrunn | Category:Schönbrunn (surname) | 0 | 13551 | 15 |
| `hero7-tuomiokirkko.png` | Helsinki | a | Carl Ludvig Engelin | Ludvig Engelin | Category:Churches by Carl Ludvig Engel | 1 | 108 | 15 |
| `hero-mekka-keskipaiva.png` | Mekka | a | Abraj Al-Bait -tornin ⚠ | Abraj Al-Bait -tornin | Category:Abraj Al Bait Towers | 2 | 39296 | 15 |
| `hero-venetsia-ilta.png` | Venetsia | a | Santa Maria della Salute ⚠ | Maria della Salute | Category:Santa Maria della Salute (Venice) | 2 | 108313 | 15 |
| `hero-petra-aamu.png` | Petra | a | Al-Khazneh eli Aarrekammio | eli Aarrekammio | Category:Treasury of Cyrene (Olympia) | 5 | 0 | 12 |
| `hero-wien-ilta.png` | Wien | a | Valtionooppera | Valtionooppera | Category:Hamburgische Staatsoper | 5 | 1268 | 12 |
| `hero-teheran-ilta.png` | Teheran | a | Milad-torni | Milad-torni | Category:Milad Tower | 6 | 0 | 12 |
| `hero-riika-ilta.png` | Riika | a | Riian Pyhän Pietarin kirkko | Pietarin kirkko | Category:Lieto church | 8 | 445 | 12 |
| `hero-petra-keskipaiva.png` | Petra | a | Ad-Deir eli Luostari | eli Luostari | Category:Lintula Holy Trinity Convent | 11 | 18 | 12 |
| `hero-barcelona-keskipaiva.png` | Barcelona | a | Casa Batlló | Casa Batlló | Category:Casa Batlló | 14 | 1951 | 12 |
| `hero-lontoo-ilta.png` | Lontoo | a | Christopher Wrenin St Paulin katedraali | St Paulin katedraali | Category:St. Paul's Cathedral | 14 | 2460 | 12 |
| `hero-moskova-aamu.png` | Moskova | a | Vasilin katedraali | Vasilin katedraali | Category:Saint Basil's Cathedral | 17 | 122 | 12 |
| `hero-lissabon-ilta.png` | Lissabon | b | Kauppatori (Praça do Comércio) ⚠ | Kauppatori | *(ei löytynyt)* | – | 2892 | 10 |
| `hero-amsterdam-ilta.png` | Amsterdam | b | "Laiha silta" eli Magere Brug | Magere Brug | Category:Magere Brug | 0 | 0 | 10 |
| `hero-madrid-keskipaiva.png` | Madrid | b | Plaza Mayor ⚠ | Plaza Mayor | Category:Plaza Mayor | 1 | 41638 | 10 |
| `hero-mekka-ilta.png` | Mekka | a | Jabal al-Nour (Hiran luola) | Jabal al-Nour | Category:Jabal al-Nour | 21 | 132 | 9 |
| `hero-tokio-aamu.png` | Tokio | a | Sensō-ji | Sensō-ji | Category:Sensoji | 21 | 10379 | 9 |
| `hero-berliini-keskipaiva.png` | Berliini | a | Valtiopäivätalo | Valtiopäivätalo | Category:Gamla riksdagshuset | 24 | 16784 | 9 |
| `hero-dubai-aamu.png` | Dubai | a | Burj Khalifa | Burj Khalifa | Category:Burj Khalifa | 24 | 0 | 9 |
| `hero-praha-keskipaiva.png` | Praha | a | Kaarlensillan | Kaarlensillan | Category:Statues on Charles Bridge | 24 | 12 | 9 |
| `hero-pietari-aamu.png` | Pietari | a | Talvipalatsi | Talvipalatsi | Category:Winter Palace | 32 | 4438 | 9 |
| `hero-tallinna-aamu.png` | Tallinna | a | Tallinnan Oleviste eli Pyhän Olavin kirkko | Pyhän Olavin kirkko | Category:Kalanti Church | 35 | 123 | 9 |
| `hero-kobenhavn-keskipaiva.png` | Kööpenhamina | a | Kolmas Christiansborgin linna | Christiansborgin linna | Category:Christiansborg Palace | 39 | 12707 | 9 |
| `hero-budapest-aamu.png` | Budapest | a | Unkarin parlamenttitalo | Unkarin parlamenttitalo | Category:Hungarian Parliament Building | 40 | 2610 | 9 |
| `hero-ateena-ilta.png` | Ateena | a | Panathinaikon stadion | Panathinaikon stadion | Category:Panathenaic Stadium | 42 | 2215 | 9 |
| `hero-tampere-ilta.png` | Tampere | a | Tampereen Vanha kirkko | Tampereen Vanha kirkko | Category:Tampere Old church | 42 | 33338 | 9 |
| `hero-jerusalem-ilta.png` | Jerusalem | a | Pyhän haudan kirkko | Pyhän haudan kirkko | Category:Metochion of the Holy Sepulchre | 43 | 6632 | 9 |
| `hero-delhi-ilta.png` | Delhi | a | Jama Masjid | Jama Masjid | Category:Jama Masjid | 49 | 18893 | 9 |
| `hero-istanbul-keskipaiva.png` | Istanbul | a | Galatan torni | Galatan torni | Category:Galata Tower | 49 | 702 | 9 |
| `hero-masqat-aamu.png` | Masqat | a | Sulttaani Qaboosin suurmoskeija | Qaboosin suurmoskeija | Category:Sultan Qaboos Grand Mosque | 53 | 286 | 6 |
| `hero-ankara-ilta.png` | Ankara | a | Atakule | Atakule | Category:Atakule | 56 | 184 | 6 |
| `hero-doha-aamu.png` | Doha | a | Dohan islamilaisen taiteen museo | islamilaisen taiteen museo | Category:Benaki Museum of Islamic Art | 69 | 1263 | 6 |
| `hero-berliini-ilta.png` | Berliini | a | Berliinin tuomiokirkko | Berliinin tuomiokirkko | Category:Berlin Cathedral | 73 | 3092 | 6 |
| `hero-lontoo-keskipaiva.png` | Lontoo | a | Westminsterin palatsi | Westminsterin palatsi | Category:Palace of Westminster | 84 | 35240 | 6 |
| `hero-berliini-aamu.png` | Berliini | a | Brandenburgin portti | Brandenburgin portti | Category:Brandenburg Gate | 87 | 5731 | 6 |
| `hero-dublin-keskipaiva.png` | Dublin | a | Pyhän Patrickin katedraali | Pyhän Patrickin katedraali | Category:St Patrick's Cathedral, Melbourne | 87 | 472 | 6 |
| `hero-istanbul-ilta.png` | Istanbul | a | Sulttaani Ahmedin moskeija | Sulttaani Ahmedin moskeija | Category:Sultan Ahmed I Mosque | 91 | 3105 | 6 |
| `hero-kairo-keskipaiva.png` | Kairo | a | Muhammad Alin moskeija (Kairon sitadelli) | Muhammad Alin moskeija | Category:Muhammad Ali Mosque | 95 | 197 | 6 |
| `hero-riika-aamu.png` | Riika | a | Mustapäiden | Mustapäiden | Category:House of the Blackheads (Tallinn) | 107 | 545 | 6 |
| `hero-damaskos-keskipaiva.png` | Damaskos | b | Suq al-Hamidiyya | Suq al-Hamidiyya | Category:Al-Hamidiyah Souq | 112 | 125 | 4 |
| `hero-tallinna-keskipaiva.png` | Tallinna | a | Tallinnan Kadriorgin palatsi | Kadriorgin palatsi | Category:Kadriorg Palace | 152 | 205 | 3 |
| `hero-tukholma-keskipaiva.png` | Tukholma | a | Tukholman kaupungintalo | Tukholman kaupungintalo | Category:Stockholm City Hall | 163 | 0 | 3 |
| `hero-lissabon-aamu.png` | Lissabon | a | Belémin torni | Belémin torni | Category:Torre de Belém | 179 | 0 | 3 |
| `hero-ateena-aamu.png` | Ateena | a | Parthenon | Parthenon | Category:Parthenon | 180 | 13951 | 3 |
| `hero-kairo-aamu.png` | Kairo | a | Gizan suuri pyramidi | Gizan suuri pyramidi | Category:Great Pyramid of Giza | 188 | 1693 | 3 |
| `hero-isfahan-keskipaiva.png` | Isfahan | a | Si-o-se-pol | Si-o-se-pol | Category:Si-o-se Pol | 200 | 819132 | 3 |
| `hero-doha-keskipaiva.png` | Doha | a | Souq Waqif | Souq Waqif | Category:Souq Waqif | 237 | 377 | 3 |
| `hero-krakova-aamu.png` | Krakova | a | Wawelin | Wawelin | Category:Wawel Castle | 327 | 0 | 3 |
| `hero-barcelona-ilta.png` | Barcelona | a | Palau Nacional | Palau Nacional | Category:Palau Nacional (Barcelona) | 356 | 9073 | 3 |
| `hero-oslo-aamu.png` | Oslo | a | Akershusin linnoitus | Akershusin linnoitus | Category:Akershus Fortress | 403 | 1859 | 3 |
| `hero-rooma-aamu.png` | Rooma | a | Colosseum | Colosseum | Category:Colosseum | 500+ | 11157 | 3 |
| `hero-teheran-keskipaiva.png` | Teheran | a | Golestanin palatsi | Golestanin palatsi | Category:Golestan Palace | 500+ | 1180 | 3 |
| `hero-venetsia-keskipaiva.png` | Venetsia | b | Rialton silta | Rialton silta | Category:Ponte di Rialto | 242 | 2466 | 2 |
| `hero-budapest-ilta.png` | Budapest | b | Széchenyin ketjusilta | Széchenyin ketjusilta | Category:Chain Bridge, Budapest | 500+ | 2139 | 2 |
| `hero-lontoo-aamu.png` | Lontoo | b | Tower Bridge | Tower Bridge | Category:Tower Bridge | 500+ | 1162481 | 2 |
| `hero-damaskos-ilta.png` | Damaskos | a | Damaskos | Damaskos | Category:Damasko | EI MITATTU (429) | 0 | EI MITATTU |
| `hero-firenze-keskipaiva.png` | Firenze | a | Ponte Vecchio | Ponte Vecchio | Category:Ponte Vecchio | EI MITATTU (429) | 0 | EI MITATTU |
| `hero-pariisi-aamu.png` | Pariisi | a | Eiffel-torni | Eiffel-torni | Category:Eiffel Tower | EI MITATTU (429) | 9479 | EI MITATTU |
| `hero-peking-aamu.png` | Peking | a | Kielletty kaupunki | Kielletty kaupunki | Category:Forbidden City | EI MITATTU (429) | 13096 | EI MITATTU |
| `hero-peking-ilta.png` | Peking | a | Kesäpalatsi | Kesäpalatsi | Category:Archepiscopal Summer Palace (Bratislava) | EI MITATTU (429) | 12162 | EI MITATTU |
| `hero-tukholma-aamu.png` | Tukholma | a | Tukholman kuninkaanlinna | Tukholman kuninkaanlinna | Category:Royal Palace, Stockholm | EI MITATTU (429) | 65272 | EI MITATTU |
| `hero7-uspenski.png` | Helsinki | a | Uspenskin katedraali | Uspenskin katedraali | Category:Uspenski Cathedral | EI MITATTU (429) | 0 | EI MITATTU |
| `hero-amsterdam-aamu.png` | Amsterdam | a | Westerkerkin torni | Westerkerkin torni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-amsterdam-keskipaiva.png` | Amsterdam | a | Pierre Cuypersin | Pierre Cuypersin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-ankara-keskipaiva.png` | Ankara | a | Hacı Bayramin moskeija | Hacı Bayramin moskeija | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-ateena-keskipaiva.png` | Ateena | a | Zeuksen temppelin | Zeuksen temppelin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-bagdad-aamu.png` | Bagdad | a | Mustansiriyan | Mustansiriyan | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-bagdad-ilta.png` | Bagdad | a | Marttyyrien muistomerkki | Marttyyrien muistomerkki | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-bagdad-keskipaiva.png` | Bagdad | a | Kadhimiyan pyhäkkö | Kadhimiyan pyhäkkö | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-budapest-keskipaiva.png` | Budapest | a | Kalastajanlinnakkeen | Kalastajanlinnakkeen | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-delhi-aamu.png` | Delhi | a | Humayunin hauta | Humayunin hauta | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-doha-ilta.png` | Doha | a | West Bayn tornirykelmä | West Bayn tornirykelmä | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-dubai-keskipaiva.png` | Dubai | a | Purjeen | Purjeen | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-dublin-aamu.png` | Dublin | a | Trinity Collegen kellotorni | Trinity Collegen kellotorni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-edinburgh-aamu.png` | Edinburgh | a | Edinburghin linna | Edinburghin linna | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-edinburgh-ilta.png` | Edinburgh | a | Calton Hillin kansallismonumentti | Calton Hillin kansallismonumentti | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-edinburgh-keskipaiva.png` | Edinburgh | a | St Gilesin katedraalin kruunutorni | St Gilesin katedraalin kruunutorni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-firenze-aamu.png` | Firenze | a | Brunelleschin | Brunelleschin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-firenze-ilta.png` | Firenze | a | Palazzo Vecchio | Palazzo Vecchio | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-isfahan-aamu.png` | Isfahan | a | Shaahin moskeija | Shaahin moskeija | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-isfahan-ilta.png` | Isfahan | a | Sheikh Lotfollahin moskeija | Sheikh Lotfollahin moskeija | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-jerusalem-aamu.png` | Jerusalem | a | Kalliomoskeija | Kalliomoskeija | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-jerusalem-keskipaiva.png` | Jerusalem | a | Daavidin tornin sitadelli | Daavidin tornin sitadelli | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-kairo-ilta.png` | Kairo | a | Kairon torni | Kairon torni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-kobenhavn-aamu.png` | Kööpenhamina | a | Marmorikirkon eli Frederikin kirkon | Marmorikirkon eli Frederikin kirkon | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-krakova-keskipaiva.png` | Krakova | a | Mariacki-kirkon tornit | Mariacki-kirkon tornit | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-kuwait-aamu.png` | Kuwait | a | Kuwaitin tornit | Kuwaitin tornit | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-kuwait-ilta.png` | Kuwait | a | Seifin palatsin | Seifin palatsin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-kuwait-keskipaiva.png` | Kuwait | a | Kuwaitin suurmoskeija | Kuwaitin suurmoskeija | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-lissabon-keskipaiva.png` | Lissabon | a | Jerónimosin luostarin | Jerónimosin luostarin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-luxor-aamu.png` | Luxor | a | Karnakin Amonin temppelialuetta | Karnakin Amonin temppelialuetta | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-luxor-ilta.png` | Luxor | a | Deir el-Bahari (Hatshepsutin muistotemppeli) | Deir el-Bahari | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-luxor-keskipaiva.png` | Luxor | a | Luxorin temppelin | Luxorin temppelin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-madrid-aamu.png` | Madrid | a | Madridin kuninkaanlinna | Madridin kuninkaanlinna | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-madrid-ilta.png` | Madrid | a | Kybele-jumalattaren suihkulähde | Kybele-jumalattaren suihkulähde | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-masqat-ilta.png` | Masqat | a | Al Jalalin ja Al Miranin linnakkeet | Al Jalalin ja Al Miranin linnakkeet | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-masqat-keskipaiva.png` | Masqat | a | Mutrahin korniisi | Mutrahin korniisi | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-oslo-ilta.png` | Oslo | a | Oslon kuninkaanlinna | Oslon kuninkaanlinna | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-oslo-keskipaiva.png` | Oslo | a | Holmenkollenissa | Holmenkollenissa | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-pariisi-ilta.png` | Pariisi | a | Sacré-Cœurin basilikaa | Sacré-Cœurin basilikaa | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-pariisi-keskipaiva.png` | Pariisi | a | Notre-Damen katedraalia | Notre-Damen katedraalia | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-peking-keskipaiva.png` | Peking | a | Taivaan temppelissä | Taivaan temppelissä | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-petra-ilta.png` | Petra | a | Kuningashautojen | Kuningashautojen | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-pietari-ilta.png` | Pietari | a | Pietari-Paavalin katedraalin | Pietari-Paavalin katedraalin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-praha-ilta.png` | Praha | a | Tynin kirkkoa | Tynin kirkkoa | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-riad-aamu.png` | Riad | a | Masmakin savitiililinnoitus | Masmakin savitiililinnoitus | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-riad-ilta.png` | Riad | a | Kingdom Centre | Kingdom Centre | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-riad-keskipaiva.png` | Riad | a | Al Faisaliahin torni | Al Faisaliahin torni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-riika-keskipaiva.png` | Riika | a | Riian vapaudenpatsas | Riian vapaudenpatsas | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-rooma-keskipaiva.png` | Rooma | a | Pietarinkirkkoa | Pietarinkirkkoa | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-tabriz-keskipaiva.png` | Tabriz | a | Tabrizin Arg eli Alishahin | Tabrizin Arg eli Alishahin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-tallinna-ilta.png` | Tallinna | a | Tallinnan teletorni | Tallinnan teletorni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-teheran-aamu.png` | Teheran | a | Azadi-torni | Azadi-torni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-tokio-keskipaiva.png` | Tokio | a | Tokion torni | Tokion torni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-tukholma-ilta.png` | Tukholma | a | Riddarholmenin kirkko | Riddarholmenin kirkko | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-varsova-aamu.png` | Varsova | a | Varsovan kuninkaanlinna | Varsovan kuninkaanlinna | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-varsova-ilta.png` | Varsova | a | Saaripalatsi | Saaripalatsi | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-varsova-keskipaiva.png` | Varsova | a | Wilanówin palatsin | Wilanówin palatsin | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-venetsia-aamu.png` | Venetsia | a | Markuksenkirkon | Markuksenkirkon | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-wien-aamu.png` | Wien | a | Stephansdomin etelätorni | Stephansdomin etelätorni | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-dubai-ilta.png` | Dubai | b | Al Fahidin kortteli | Al Fahidin kortteli | MITTAUS EPÄONNISTUI (429) | MITTAUS EPÄONNISTUI | 0 | EI MITATTU |
| `hero-astana-aamu.png` | Astana | a | Bayterek | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-astana-ilta.png` | Astana | a | Hazrat Sultanin moskeija | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-astana-keskipaiva.png` | Astana | a | Khan Shatyr | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-auckland-aamu.png` | Auckland | a | Aucklandin Sky Tower | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-auckland-ilta.png` | Auckland | a | Maungawhau eli Mount Eden | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-auckland-keskipaiva.png` | Auckland | a | Rangitoto | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bangkok-aamu.png` | Bangkok | a | Wat Arun, Aamunkoiton temppeli | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bangkok-ilta.png` | Bangkok | a | Wat Pho | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bangkok-keskipaiva.png` | Bangkok | a | Suuri palatsi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bergen-aamu.png` | Bergen | a | Bergenin Johanneksen kirkko | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bergen-ilta.png` | Bergen | a | Bergenin Grieghallen | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-bergen-keskipaiva.png` | Bergen | a | Bergenin Fløibanen-köysirata | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-buenosaires-aamu.png` | Buenos Aires | a | Obelisco de Buenos Aires | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-buenosaires-ilta.png` | Buenos Aires | a | Puerto Maderon Puente de la Mujer | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-buenosaires-keskipaiva.png` | Buenos Aires | a | Casa Rosada | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-chennai-aamu.png` | Chennai | a | Kapaleeshwararin temppelin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-chennai-ilta.png` | Chennai | a | Santhomen basilika | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-chennai-keskipaiva.png` | Chennai | a | Madrasin ylioikeus | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-colombo-aamu.png` | Colombo | a | Gangaramayan temppeli | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-colombo-ilta.png` | Colombo | a | Lotus Tower | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-colombo-keskipaiva.png` | Colombo | a | Punavalkoraidallinen Jami Ul-Alfar | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-delhi-keskipaiva.png` | Delhi | a | Punainen linnoitus (Lal Qila) | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hanoi-aamu.png` | Hanoi | a | Hoan Kiem eli Palautetun | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hanoi-keskipaiva.png` | Hanoi | a | Yhden pylvään pagodi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hongkong-ilta.png` | Hongkong | a | Star Ferry | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hongkong-keskipaiva.png` | Hongkong | a | Tian Tan Buddha | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jakarta-aamu.png` | Jakarta | a | Kansallismonumentti Monas | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jakarta-ilta.png` | Jakarta | a | Sunda Kelapan | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jakarta-keskipaiva.png` | Jakarta | a | Istiqlal | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jekaterinburg-aamu.png` | Jekaterinburg | a | Jekaterinburgin Veren kirkko | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jekaterinburg-ilta.png` | Jekaterinburg | a | Iset-torni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-jekaterinburg-keskipaiva.png` | Jekaterinburg | a | Uralmashin Valkoinen torni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kanton-aamu.png` | Kanton (Guangzhou) | a | Chenin esi-isäintemppeli (Chen Clan Academy) | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kanton-ilta.png` | Kanton (Guangzhou) | a | Canton Tower | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kanton-keskipaiva.png` | Kanton (Guangzhou) | a | Kantonin Pyhän | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-karachi-aamu.png` | Karachi | a | Mazar-e-Quaidin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-karachi-ilta.png` | Karachi | a | Masjid | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-karachi-keskipaiva.png` | Karachi | a | Empress Market | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kashgar-keskipaiva.png` | Kashgar | a | Yusuf Balasagunin mausoleumi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kathmandu-aamu.png` | Kathmandu | a | Boudhanathin stupa | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kathmandu-ilta.png` | Kathmandu | a | Swayambhunathin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kioto-aamu.png` | Kioto | a | Kinkaku-ji | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kioto-ilta.png` | Kioto | a | Kiyomizu-deran | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kolkata-aamu.png` | Kolkata | a | Victoria Memorial | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kolkata-ilta.png` | Kolkata | a | Dakshineswarin Kali-temppeli | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-lhasa-aamu.png` | Lhasa | a | Jokhangin temppelin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-lhasa-ilta.png` | Lhasa | a | Norbulingkan | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-lhasa-keskipaiva.png` | Lhasa | a | Drepungin luostarin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mandalay-aamu.png` | Mandalay | a | Atumashin luostari | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mandalay-ilta.png` | Mandalay | a | Kyauktawgyin temppelin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mandalay-keskipaiva.png` | Mandalay | a | Sandamunin pagodi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-manila-aamu.png` | Manila | a | Fort Santiagon kivilinnoitus | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-manila-ilta.png` | Manila | a | Nykyinen Manilan katedraali | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-manila-keskipaiva.png` | Manila | a | San Agustinin kirkko | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-montreal-ilta.png` | Montreal | a | Montrealin olympiastadionin torni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-montreal-keskipaiva.png` | Montreal | a | Montrealin Biosphère | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mumbai-aamu.png` | Mumbai | a | Gateway of India | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mumbai-keskipaiva.png` | Mumbai | a | Chhatrapati Shivaji Terminus | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-newyork-ilta.png` | New York | a | Empire State Building | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-newyork-keskipaiva.png` | New York | a | Vapaudenpatsas | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-rio-aamu.png` | Rio de Janeiro | a | Corcovadon | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-rio-keskipaiva.png` | Rio de Janeiro | a | Sokerileivän | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-samarkand-aamu.png` | Samarkand | a | Sherdorin medresa | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-samarkand-ilta.png` | Samarkand | a | Bibi-Khanymin moskeijan | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-samarkand-keskipaiva.png` | Samarkand | a | Gur-e-Amiria | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sanfrancisco-keskipaiva.png` | San Francisco | a | San Franciscon | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sevilla-aamu.png` | Sevilla | a | Sevillan Giralda | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sevilla-ilta.png` | Sevilla | a | Sevillan Metropol Parasol | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-shanghai-aamu.png` | Shanghai | a | Oriental Pearl -torni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-singapore-aamu.png` | Singapore | a | Marina Bay Sands | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-singapore-ilta.png` | Singapore | a | Sulttaanin moskeija | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-singapore-keskipaiva.png` | Singapore | a | Gardens by the Bayn | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-soul-aamu.png` | Soul | a | Gyeongbokgung | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-soul-ilta.png` | Soul | a | Namsanin torni (N Seoul Tower) | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-soul-keskipaiva.png` | Soul | a | Sungnyemun eli Namdaemun | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sydney-aamu.png` | Sydney | a | Sydneyn oopperatalo | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sydney-ilta.png` | Sydney | a | Bondin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-tabriz-ilta.png` | Tabriz | a | Tabrizin kaupungintalo eli Saat-torni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-taipei-aamu.png` | Taipei | a | Taipei | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-taipei-ilta.png` | Taipei | a | Longshanin temppeli | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-taipei-keskipaiva.png` | Taipei | a | Chiang Kai-shekin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-tokio-ilta.png` | Tokio | a | Tokion aseman asemapalatsi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-tripoli-aamu.png` | Tripoli | a | Tripolin Punainen linna eli Assai | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-tripoli-keskipaiva.png` | Tripoli | a | Marcus Aureliuksen | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-ulanbator-aamu.png` | Ulan Bator | a | Gandanin luostari | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-ulanbator-ilta.png` | Ulan Bator | a | Zaisanin muistomerkki | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-vladivostok-keskipaiva.png` | Vladivostok | a | Vladivostokin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-wellington-aamu.png` | Wellington | a | Beehive (Wellington) | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-wellington-ilta.png` | Wellington | a | Wellingtonin vanha | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-wellington-keskipaiva.png` | Wellington | a | Uuden-Seelannin kansallismuseo Te Papa Tongarewa | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-xian-aamu.png` | Xi'an | a | Suuri villihanhipagoda | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-xian-ilta.png` | Xi'an | a | Kellotorni | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-xian-keskipaiva.png` | Xi'an | a | Eteläportti | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-yangon-aamu.png` | Yangon | a | Shwedagonin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-yangon-ilta.png` | Yangon | a | Karaweik | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-yangon-keskipaiva.png` | Yangon | a | Sule-pagodi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hanoi-ilta.png` | Hanoi | b | Long Bienin terässilta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-hongkong-aamu.png` | Hongkong | b | Victoria Peak | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kashgar-ilta.png` | Kashgar | b | Kašgarin sunnuntaimarkkinat | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kathmandu-keskipaiva.png` | Kathmandu | b | Kathmandun Durbar-aukio | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kioto-keskipaiva.png` | Kioto | b | Fushimi Inarin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kolkata-keskipaiva.png` | Kolkata | b | Howrahin silta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-montreal-aamu.png` | Montreal | b | Montrealin Pyhän Joosefin | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-mumbai-ilta.png` | Mumbai | b | Marine Drive | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-newyork-aamu.png` | New York | b | Brooklynin silta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-rio-ilta.png` | Rio de Janeiro | b | Copacabanan rantapromenadi | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sanfrancisco-aamu.png` | San Francisco | b | Golden Gate -silta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sanfrancisco-ilta.png` | San Francisco | b | Alamo Squaren "Painted Ladies | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sevilla-keskipaiva.png` | Sevilla | b | Sevillan Plaza de España | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-shanghai-ilta.png` | Shanghai | b | Yu-puutarha | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-shanghai-keskipaiva.png` | Shanghai | b | Bundin rantakadun pankkipalatsit | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-sydney-keskipaiva.png` | Sydney | b | Sydney Harbour Bridge | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-ulanbator-keskipaiva.png` | Ulan Bator | b | Sükhbaatarin aukio | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-varanasi-aamu.png` | Varanasi | b | Varanasin ghatit | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-varanasi-ilta.png` | Varanasi | b | Dashashwamedh Ghat | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-varanasi-keskipaiva.png` | Varanasi | b | Dashashwamedh Ghat | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-vladivostok-aamu.png` | Vladivostok | b | Russki-silta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-vladivostok-ilta.png` | Vladivostok | b | Zolotoi-silta | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-kashgar-aamu.png` | Kashgar | c | Kašgarin vanhakaupunki | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |
| `hero-tripoli-ilta.png` | Tripoli | c | Tripolin medina | – | EI MITATTU | EI MITATTU | EI MITATTU | EI MITATTU |

</details>

## Menetelmän rajoitukset
- **Tärkein löydös — "kategoriaa ei löytynyt" ei aina tarkoita sitä**: koodi ei erottanut toisistaan "Commons-haku palautti aidosti tyhjän" ja "Commons-haku epäonnistui/rajoitettiin, ja tulos jäi tyhjäksi sen takia". Käytännössä tämä näkyy kärkilistassa 13 rivillä, joilla tunnettu, runsaasti kuvattu kohde (esim. Sagrada Família, Pantheon, Pyhän Vituksen katedraali) saa täydet riskipisteet vain siksi, että kategoriahaku ei ehtinyt/onnistunut — ei siksi, että kuvia olisi vähän. Merkitty **⚠**-lipulla Kärkilista-taulukossa. Tämä on menetelmän todellinen heikkous eikä pelkkä yksittäistapaus, ja se kannattaa korjata (erottaa virhetila "ei tulosta"-tilasta) ennen seuraavaa ajoa.
- **Mittaus on kesken**: 120/258 kuvaa jäi kokonaan ilman Commons-mittausta (rajapinnan 429-rajoitus pysäytti ajon kesken), ja lisäksi 59/258 yritettiin mutta mittaus epäonnistui (429 rikkoi molemmat osahaut). Näiltä 179 riviltä taulukko kertoo vain luokan (a/b/c), ei kuvadatan tiheyttä. Seuraava ajo pitäisi aloittaa juuri näistä — erityisesti Kašgarin toinen kuva, koska se on tunnettu virhetapaus eikä sitä ehditty mitata lainkaan.
- Tämä on **automatisoitu mittaus**, ei silmämääräinen tarkistus. Kohteen nimen päättely kuvatekstistä on heuristinen (noin 50 kuvaa korjattu käsin, loput automaatin varassa) — väärin poimittu tai epätäsmällinen nimi voi joko yli- tai aliarvioida yksittäisen kuvan riskin.
- Commons-kategorian tiedostomäärä mittaa vain parhaan osuman kategoriaa; jos oikea kategoria on eri nimellä tai kohde on jaettu useaan alikategoriaan, todellinen kuvamäärä voi olla mitattua suurempi.
- Hakuosumat (`srnamespace=6`) ovat löysempi mittari (koko tekstihaku) ja voivat antaa korkeita lukuja myös silloin, kun kyseessä on yleinen sana — esimerkiksi henkilön- tai paikannimi, joka osuu moneen tiedostoon aivan eri aiheista. Siksi ensisijainen riskimittari on kategorian tiedostomäärä.
- Luokkien (b) ja (c) rajanveto on paikoin tulkinnanvarainen (esim. "markkinapaikka" tai "rantapromenadi") — nämä on ratkaistu lähimmän vastaavuuden mukaan Raamatun ja tehtävän määritelmään.
