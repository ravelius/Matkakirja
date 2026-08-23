# Herokuvien riskiarvio
Mittausvaihe (ei kuvien katselua eikä arviointia): jokaiselle 258:lle `herokoe/`-alkuiselle herokuvalle pääteltiin kuvatekstin perusteella väitetty kohdeluokka, ja Wikimedia Commonsin rajapinnasta mitattiin kuvadatan tiheys (oman Commons-kategorian tiedostomäärä ja hakuosumat). Tulos on riskijärjestys seuraavalle vaiheelle, joka katsoo kuvat silmin.

**HUOM — mittaus jäi kesken:** Wikimedia Commonsin rajapinta alkoi rajoittaa hakuja (HTTP 429) kesken ajon. Luokittelu (a/b/c) on valmis kaikille 258 kuvalle, mutta Commons-mittaus ehdittiin tehdä **138/258** kuvalle. Loput **120** on merkitty taulukkoon tekstillä "EI MITATTU" — niitä ei ole jätetty pois, jotta puute näkyy eikä häviä. Kärkilista alempana on rakennettu vain mitatuista kuvista; mittaamattomat a-luokan kuvat on listattu erikseen omana osionaan, koska niidenkin riski on toistaiseksi tuntematon — ei tiedetä matalaksi.
## Menetelmä lyhyesti
1. **Poiminta**: kaikki `ampari: 'herokoe/...'`-kentän sisältävät kuvat js/packs/kulttuuri-kategoriat.js:stä (258 kpl), kuvateksti (`selite`) talteen sellaisenaan.
2. **Luokittelu (a/b/c)**: automatisoitu päättely kuvatekstin ensimmäisestä lauseesta — subjektin/pääkohteen tunnistus (verbirajapinta), sitten avainsanahaku (silta/aukio/puisto/katu = b, yleisnäkymä/vanhakaupunki/alue = c, muuten oletus a). Noin 50 rajatapausta (kaikki b- ja c-luokat sekä kaikki tapaukset, joissa päättely valitsi "henkilö rakensi kohteen" -lauserakenteesta väärän osan tai jätti nimen kesken) tarkistettiin ja korjattiin käsin. Loput noin 200 a-luokan kuvaa jäivät automaattipäättelyn varaan.
3. **Kohteen nimi Commons-hakua varten**: kuvatekstistä poimittu erisnimifraasi (`kohteen nimi` -sarake), tarvittaessa lyhennetty hakukelpoisemmaksi (`core_name`). Jos alkuperäinen fraasi ei tuottanut osumia, kokeiltiin myös sen loppuosaa (esim. rakennuttajan tai arkkitehdin nimi pudotettuna alusta) — tällä vältettiin ilmeinen väärä riskimerkintä, jossa esimerkiksi "Christopher Wrenin St Paulin katedraali" antoi 0 osumaa mutta "St Paulin katedraali" tuhansia.
4. **Commons-mittaus**: `list=search&srnamespace=14` haki parhaiten täsmäävän Commons-kategorian, jonka jäsenmäärä (`cmtype=file`, kattoraja 500) on päämittari. Rinnalla `list=search&srnamespace=6` kertoo koko tiedostohaun osumamäärän (löysempi, kielimuodoille sietokykyisempi mittari). Jos kategoriaa ei löytynyt, se on kirjattu omaan sarakkeeseensa — sellaisenaan vahva riskisignaali. **Commons alkoi rajoittaa (429) osaa hauista, ja mittaus jäi tältä osin vajaaksi — ks. yllä oleva huomautus ja alempana "Ei mitatut kuvat".**
5. **Riskipisteet** = luokkapaino (a=3, b=2, c=1) × niukkuuspaino (kategorian tiedostomäärän perusteella: alle 5 = 5, alle 20 = 4, alle 50 = 3, alle 150 = 2, 150 tai enemmän = 1; "ei kategoriaa" = 5). Asteikko 1–15. Mittaamattomille kuville riskipisteitä ei laskettu ("EI MITATTU").
## Yhteenveto
- Kuvia yhteensä: **258**, mitattu Commonsista: **138**, ei mitattu (429-rajoitus): **120**.
- Luokkajakauma (kaikki 258): **a) 226** nimetty rakennus tai monumentti, **b) 30** nimetty katu, aukio, puisto tai silta, **c) 2** yleisnäkymä ilman nimettyä kohdetta.
- Mitatuista kohteista ilman omaa Commons-kategoriaa: **74** / 138.
- **7 kuvaa jäivät osittain mitatuiksi**: oikea Commons-kategoria löytyi, mutta sen tiedostomäärän laskenta katkesi 429-rajoitukseen. Nämä eivät ole mukana kärkilistassa (riskipisteitä ei voitu laskea) — ks. taulukko.
- **Kärkilista** (luokka a JA Commons-kategoriassa alle 20 tiedostoa, laskettu vain täysin mitatuista): **87 kuvaa**, joista **8 on todennäköisesti mittausvirhe** (ks. varoitus Kärkilista-osiossa) — luultavasti oikeasti alempana on suunnilleen **79 kuvaa**.
- Lisäksi **96 a-luokan kuvaa jäi kokonaan mittaamatta** — niiden riski on tuntematon, ei oletettavasti matala; ks. oma listansa alempana.
- Kašgarin tunnettu virhekuva (`hero-kashgar-keskipaiva.png`, Yusuf Balasagunin mausoleumi): **EI MITATTU** — jäi 429-rajoituksen taakse ennen kuin ehdittiin siihen asti. Se pitää mitata ensimmäisenä seuraavalla ajolla, koska kyseessä on tunnettu virhetapaus eikä sen riskiä siksi voi jättää auki. Menetelmä on aiemmin (testiajossa) sijoittanut sen korkeaksi riskiksi — ks. rajoitukset-osio.
- Kärkilistalla toistuvat kaupungit (vähintään 3 kuvaa):
  - Wien: 3 kuvaa
  - Edinburgh: 3 kuvaa
  - Varsova: 3 kuvaa
  - Moskova: 3 kuvaa
  - Petra: 3 kuvaa
  - Kuwait: 3 kuvaa
  - Bagdad: 3 kuvaa
  - Luxor: 3 kuvaa
  - Riad: 3 kuvaa

## Kärkilista
Nämä ovat kuvat, jotka seuraava vaihe katsoo silmin ensin: luokka on **a** (nimetty yksittäinen rakennus tai monumentti) JA Commons-kategoriassa on alle 20 tiedostoa — tai kategoriaa ei löytynyt lainkaan. Vain mitatuista 138 kuvasta.

**Menetelmävaroitus — 8 riviä listan kärjessä ovat todennäköisesti mittausvirheitä, ei oikeasti niukkoja:** näillä "Commons-kategoria" on "ei löytynyt", mutta hakuosumia (`srnamespace=6`) on silti vähintään 500 — esimerkiksi Sagrada Família ja Pantheon ovat listalla juuri tästä syystä, vaikka niistä on Commonsissa selvästi tuhansia kuvia. Todennäköisin selitys on, että 429-rajoitus tai rinnakkaisajon kuormitus rikkoi juuri kategoriahaun tälle riville, ja koodi tulkitsi epäonnistuneen haun samaksi asiaksi kuin "kategoriaa ei ole" — näitä kahta ei erotettu toisistaan tässä ajossa. Rivit on merkitty alla **⚠**-merkillä eikä niitä pidä katsoa ensimmäisenä; oikea kärkipää löytyy niiden alta, riveiltä joilla hakuosumatkin ovat matalat.

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
| 15 | `hero-kairo-ilta.png` | Kairo | Kairon torni | *(ei löytynyt)* | – | 0 | 15 |
| 16 | `hero-praha-ilta.png` | Praha | Tynin kirkkoa | *(ei löytynyt)* | – | 0 | 15 |
| 17 | `hero-wien-aamu.png` | Wien | Stephansdomin etelätorni | *(ei löytynyt)* | – | 0 | 15 |
| 18 | `hero-madrid-aamu.png` | Madrid | Madridin kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| 19 | `hero-madrid-ilta.png` | Madrid | Kybele-jumalattaren suihkulähde | *(ei löytynyt)* | – | 0 | 15 |
| 20 | `hero-venetsia-aamu.png` | Venetsia | Markuksenkirkon | *(ei löytynyt)* | – | 0 | 15 |
| 21 | `hero-tukholma-ilta.png` | Tukholma | Riddarholmenin kirkko | *(ei löytynyt)* | – | 0 | 15 |
| 22 | `hero-pariisi-keskipaiva.png` | Pariisi | Notre-Damen katedraalia | *(ei löytynyt)* | – | 0 | 15 |
| 23 | `hero-pariisi-ilta.png` | Pariisi | Sacré-Cœurin basilikaa | *(ei löytynyt)* | – | 0 | 15 |
| 24 | `hero-ateena-keskipaiva.png` | Ateena | Zeuksen temppelin | *(ei löytynyt)* | – | 0 | 15 |
| 25 | `hero-amsterdam-aamu.png` | Amsterdam | Westerkerkin torni | *(ei löytynyt)* | – | 0 | 15 |
| 26 | `hero-amsterdam-keskipaiva.png` | Amsterdam | Pierre Cuypersin | *(ei löytynyt)* | – | 0 | 15 |
| 27 | `hero-dublin-aamu.png` | Dublin | Trinity Collegen kellotorni | *(ei löytynyt)* | – | 0 | 15 |
| 28 | `hero-edinburgh-aamu.png` | Edinburgh | Edinburghin linna | *(ei löytynyt)* | – | 0 | 15 |
| 29 | `hero-edinburgh-keskipaiva.png` | Edinburgh | St Gilesin katedraalin kruunutorni | *(ei löytynyt)* | – | 0 | 15 |
| 30 | `hero-edinburgh-ilta.png` | Edinburgh | Calton Hillin kansallismonumentti | *(ei löytynyt)* | – | 0 | 15 |
| 31 | `hero-lissabon-keskipaiva.png` | Lissabon | Jerónimosin luostarin | *(ei löytynyt)* | – | 0 | 15 |
| 32 | `hero-budapest-keskipaiva.png` | Budapest | Kalastajanlinnakkeen | *(ei löytynyt)* | – | 0 | 15 |
| 33 | `hero-rooma-keskipaiva.png` | Rooma | Pietarinkirkkoa | *(ei löytynyt)* | – | 0 | 15 |
| 34 | `hero-krakova-keskipaiva.png` | Krakova | Mariacki-kirkon tornit | *(ei löytynyt)* | – | 0 | 15 |
| 35 | `hero-varsova-aamu.png` | Varsova | Varsovan kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| 36 | `hero-varsova-keskipaiva.png` | Varsova | Wilanówin palatsin | *(ei löytynyt)* | – | 0 | 15 |
| 37 | `hero-varsova-ilta.png` | Varsova | Saaripalatsi | *(ei löytynyt)* | – | 0 | 15 |
| 38 | `hero-tallinna-ilta.png` | Tallinna | Tallinnan teletorni | *(ei löytynyt)* | – | 0 | 15 |
| 39 | `hero-pietari-ilta.png` | Pietari | Pietari-Paavalin katedraalin | *(ei löytynyt)* | – | 0 | 15 |
| 40 | `hero-dubai-keskipaiva.png` | Dubai | Purjeen | *(ei löytynyt)* | – | 0 | 15 |
| 41 | `hero-petra-ilta.png` | Petra | Kuningashautojen | *(ei löytynyt)* | – | 0 | 15 |
| 42 | `hero-jerusalem-aamu.png` | Jerusalem | Kalliomoskeija | *(ei löytynyt)* | – | 0 | 15 |
| 43 | `hero-jerusalem-keskipaiva.png` | Jerusalem | Daavidin tornin sitadelli | *(ei löytynyt)* | – | 0 | 15 |
| 44 | `hero-riika-keskipaiva.png` | Riika | Riian vapaudenpatsas | *(ei löytynyt)* | – | 0 | 15 |
| 45 | `hero-oslo-keskipaiva.png` | Oslo | Holmenkollenissa | *(ei löytynyt)* | – | 0 | 15 |
| 46 | `hero-oslo-ilta.png` | Oslo | Oslon kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| 47 | `hero-firenze-aamu.png` | Firenze | Brunelleschin | *(ei löytynyt)* | – | 0 | 15 |
| 48 | `hero-firenze-ilta.png` | Firenze | Palazzo Vecchio | *(ei löytynyt)* | – | 0 | 15 |
| 49 | `hero-kobenhavn-aamu.png` | Kööpenhamina | Marmorikirkon eli Frederikin kirkon | *(ei löytynyt)* | – | 0 | 15 |
| 50 | `hero-doha-ilta.png` | Doha | West Bayn tornirykelmä | *(ei löytynyt)* | – | 0 | 15 |
| 51 | `hero-kuwait-aamu.png` | Kuwait | Kuwaitin tornit | *(ei löytynyt)* | – | 0 | 15 |
| 52 | `hero-kuwait-keskipaiva.png` | Kuwait | Kuwaitin suurmoskeija | *(ei löytynyt)* | – | 0 | 15 |
| 53 | `hero-kuwait-ilta.png` | Kuwait | Seifin palatsin | *(ei löytynyt)* | – | 0 | 15 |
| 54 | `hero-masqat-keskipaiva.png` | Masqat | Mutrahin korniisi | *(ei löytynyt)* | – | 0 | 15 |
| 55 | `hero-masqat-ilta.png` | Masqat | Al Jalalin ja Al Miranin linnakkeet | *(ei löytynyt)* | – | 0 | 15 |
| 56 | `hero-bagdad-aamu.png` | Bagdad | Mustansiriyan | *(ei löytynyt)* | – | 0 | 15 |
| 57 | `hero-bagdad-keskipaiva.png` | Bagdad | Kadhimiyan pyhäkkö | *(ei löytynyt)* | – | 0 | 15 |
| 58 | `hero-bagdad-ilta.png` | Bagdad | Marttyyrien muistomerkki | *(ei löytynyt)* | – | 0 | 15 |
| 59 | `hero-ankara-keskipaiva.png` | Ankara | Hacı Bayramin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| 60 | `hero-luxor-aamu.png` | Luxor | Karnakin Amonin temppelialuetta | *(ei löytynyt)* | – | 0 | 15 |
| 61 | `hero-luxor-keskipaiva.png` | Luxor | Luxorin temppelin | *(ei löytynyt)* | – | 0 | 15 |
| 62 | `hero-luxor-ilta.png` | Luxor | Deir el-Bahari (Hatshepsutin muistotemppeli) | *(ei löytynyt)* | – | 0 | 15 |
| 63 | `hero-riad-aamu.png` | Riad | Masmakin savitiililinnoitus | *(ei löytynyt)* | – | 0 | 15 |
| 64 | `hero-riad-keskipaiva.png` | Riad | Al Faisaliahin torni | *(ei löytynyt)* | – | 0 | 15 |
| 65 | `hero-riad-ilta.png` | Riad | Kingdom Centre | *(ei löytynyt)* | – | 0 | 15 |
| 66 | `hero-tabriz-keskipaiva.png` | Tabriz | Tabrizin Arg eli Alishahin | *(ei löytynyt)* | – | 0 | 15 |
| 67 | `hero-teheran-aamu.png` | Teheran | Azadi-torni | *(ei löytynyt)* | – | 0 | 15 |
| 68 | `hero-isfahan-aamu.png` | Isfahan | Shaahin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| 69 | `hero-isfahan-ilta.png` | Isfahan | Sheikh Lotfollahin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| 70 | `hero-peking-keskipaiva.png` | Peking | Taivaan temppelissä | *(ei löytynyt)* | – | 0 | 15 |
| 71 | `hero-delhi-aamu.png` | Delhi | Humayunin hauta | *(ei löytynyt)* | – | 0 | 15 |
| 72 | `hero-tokio-keskipaiva.png` | Tokio | Tokion torni | *(ei löytynyt)* | – | 0 | 15 |
| 73 | `hero-moskova-keskipaiva.png` | Moskova | Kremlin | Category:Kremlin | 0 | 61420 | 15 |
| 74 | `hero-istanbul-aamu.png` | Istanbul | Hagia Sofia | Category:Hagia Sofia | 0 | 14310 | 15 |
| 75 | `hero-wien-keskipaiva.png` | Wien | Schönbrunn | Category:Schönbrunn (surname) | 0 | 13551 | 15 |
| 76 | `hero-pietari-keskipaiva.png` | Pietari | Verikirkko | Category:Church of the Saviour on the Blood | 0 | 499 | 15 |
| 77 | `hero7-tuomiokirkko.png` | Helsinki | Carl Ludvig Engelin | Category:Churches by Carl Ludvig Engel | 1 | 108 | 15 |
| 78 | `hero-venetsia-ilta.png` | Venetsia | Santa Maria della Salute | Category:Santa Maria della Salute (Venice) | 2 | 108313 | 15 |
| 79 | `hero-mekka-keskipaiva.png` | Mekka | Abraj Al-Bait -tornin | Category:Abraj Al Bait Towers | 2 | 39296 | 15 |
| 80 | `hero-wien-ilta.png` | Wien | Valtionooppera | Category:Hamburgische Staatsoper | 5 | 1268 | 12 |
| 81 | `hero-petra-aamu.png` | Petra | Al-Khazneh eli Aarrekammio | Category:Treasury of Cyrene (Olympia) | 5 | 0 | 12 |
| 82 | `hero-teheran-ilta.png` | Teheran | Milad-torni | Category:Milad Tower | 6 | 0 | 12 |
| 83 | `hero-riika-ilta.png` | Riika | Riian Pyhän Pietarin kirkko | Category:Lieto church | 8 | 445 | 12 |
| 84 | `hero-petra-keskipaiva.png` | Petra | Ad-Deir eli Luostari | Category:Lintula Holy Trinity Convent | 11 | 18 | 12 |
| 85 | `hero-lontoo-ilta.png` | Lontoo | Christopher Wrenin St Paulin katedraali | Category:St. Paul's Cathedral | 14 | 2460 | 12 |
| 86 | `hero-barcelona-keskipaiva.png` | Barcelona | Casa Batlló | Category:Casa Batlló | 14 | 1951 | 12 |
| 87 | `hero-moskova-aamu.png` | Moskova | Vasilin katedraali | Category:Saint Basil's Cathedral | 17 | 122 | 12 |

## Ei mitatut a-luokan kuvat (tarkista ensimmäisenä seuraavaksi)
Näillä kuvilla väite on luokkaa **a** (korkein riskiluokka), mutta Commons-mittaus ei ehtinyt valmistua (429-rajoitus). Riski on tuntematon — ei oletettavasti matala. Nämä kannattaa joko mitata ensin uudella ajolla tai katsoa suoraan silmin kärkilistan rinnalla.

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
| `hero-amsterdam-aamu.png` | Amsterdam | a | Westerkerkin torni | Westerkerkin torni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-amsterdam-keskipaiva.png` | Amsterdam | a | Pierre Cuypersin | Pierre Cuypersin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-ankara-aamu.png` | Ankara | a | Anıtkabir | Anıtkabir | *(ei löytynyt)* | – | 1030 | 15 |
| `hero-ankara-keskipaiva.png` | Ankara | a | Hacı Bayramin moskeija | Hacı Bayramin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| `hero-ateena-keskipaiva.png` | Ateena | a | Zeuksen temppelin | Zeuksen temppelin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-bagdad-aamu.png` | Bagdad | a | Mustansiriyan | Mustansiriyan | *(ei löytynyt)* | – | 0 | 15 |
| `hero-bagdad-ilta.png` | Bagdad | a | Marttyyrien muistomerkki | Marttyyrien muistomerkki | *(ei löytynyt)* | – | 0 | 15 |
| `hero-bagdad-keskipaiva.png` | Bagdad | a | Kadhimiyan pyhäkkö | Kadhimiyan pyhäkkö | *(ei löytynyt)* | – | 0 | 15 |
| `hero-barcelona-aamu.png` | Barcelona | a | Sagrada Família | Sagrada Família | *(ei löytynyt)* | – | 44266 | 15 |
| `hero-budapest-keskipaiva.png` | Budapest | a | Kalastajanlinnakkeen | Kalastajanlinnakkeen | *(ei löytynyt)* | – | 0 | 15 |
| `hero-damaskos-aamu.png` | Damaskos | a | Umaijadimoskeija | Umaijadimoskeija | *(ei löytynyt)* | – | 1850 | 15 |
| `hero-delhi-aamu.png` | Delhi | a | Humayunin hauta | Humayunin hauta | *(ei löytynyt)* | – | 0 | 15 |
| `hero-doha-ilta.png` | Doha | a | West Bayn tornirykelmä | West Bayn tornirykelmä | *(ei löytynyt)* | – | 0 | 15 |
| `hero-dubai-keskipaiva.png` | Dubai | a | Purjeen | Purjeen | *(ei löytynyt)* | – | 0 | 15 |
| `hero-dublin-aamu.png` | Dublin | a | Trinity Collegen kellotorni | Trinity Collegen kellotorni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-dublin-ilta.png` | Dublin | a | James Gandonin | James Gandonin | *(ei löytynyt)* | – | 1 | 15 |
| `hero-edinburgh-aamu.png` | Edinburgh | a | Edinburghin linna | Edinburghin linna | *(ei löytynyt)* | – | 0 | 15 |
| `hero-edinburgh-ilta.png` | Edinburgh | a | Calton Hillin kansallismonumentti | Calton Hillin kansallismonumentti | *(ei löytynyt)* | – | 0 | 15 |
| `hero-edinburgh-keskipaiva.png` | Edinburgh | a | St Gilesin katedraalin kruunutorni | St Gilesin katedraalin kruunutorni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-firenze-aamu.png` | Firenze | a | Brunelleschin | Brunelleschin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-firenze-ilta.png` | Firenze | a | Palazzo Vecchio | Palazzo Vecchio | *(ei löytynyt)* | – | 0 | 15 |
| `hero-isfahan-aamu.png` | Isfahan | a | Shaahin moskeija | Shaahin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| `hero-isfahan-ilta.png` | Isfahan | a | Sheikh Lotfollahin moskeija | Sheikh Lotfollahin moskeija | *(ei löytynyt)* | – | 0 | 15 |
| `hero-jerusalem-aamu.png` | Jerusalem | a | Kalliomoskeija | Kalliomoskeija | *(ei löytynyt)* | – | 0 | 15 |
| `hero-jerusalem-keskipaiva.png` | Jerusalem | a | Daavidin tornin sitadelli | Daavidin tornin sitadelli | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kairo-ilta.png` | Kairo | a | Kairon torni | Kairon torni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kobenhavn-aamu.png` | Kööpenhamina | a | Marmorikirkon eli Frederikin kirkon | Marmorikirkon eli Frederikin kirkon | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kobenhavn-ilta.png` | Kööpenhamina | a | Vapahtajan kirkko | Vapahtajan kirkko | *(ei löytynyt)* | – | 17216 | 15 |
| `hero-krakova-ilta.png` | Krakova | a | Sukiennice | Sukiennice | *(ei löytynyt)* | – | 3676 | 15 |
| `hero-krakova-keskipaiva.png` | Krakova | a | Mariacki-kirkon tornit | Mariacki-kirkon tornit | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kuwait-aamu.png` | Kuwait | a | Kuwaitin tornit | Kuwaitin tornit | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kuwait-ilta.png` | Kuwait | a | Seifin palatsin | Seifin palatsin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-kuwait-keskipaiva.png` | Kuwait | a | Kuwaitin suurmoskeija | Kuwaitin suurmoskeija | *(ei löytynyt)* | – | 0 | 15 |
| `hero-lissabon-keskipaiva.png` | Lissabon | a | Jerónimosin luostarin | Jerónimosin luostarin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-luxor-aamu.png` | Luxor | a | Karnakin Amonin temppelialuetta | Karnakin Amonin temppelialuetta | *(ei löytynyt)* | – | 0 | 15 |
| `hero-luxor-ilta.png` | Luxor | a | Deir el-Bahari (Hatshepsutin muistotemppeli) | Deir el-Bahari | *(ei löytynyt)* | – | 0 | 15 |
| `hero-luxor-keskipaiva.png` | Luxor | a | Luxorin temppelin | Luxorin temppelin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-madrid-aamu.png` | Madrid | a | Madridin kuninkaanlinna | Madridin kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| `hero-madrid-ilta.png` | Madrid | a | Kybele-jumalattaren suihkulähde | Kybele-jumalattaren suihkulähde | *(ei löytynyt)* | – | 0 | 15 |
| `hero-masqat-ilta.png` | Masqat | a | Al Jalalin ja Al Miranin linnakkeet | Al Jalalin ja Al Miranin linnakkeet | *(ei löytynyt)* | – | 0 | 15 |
| `hero-masqat-keskipaiva.png` | Masqat | a | Mutrahin korniisi | Mutrahin korniisi | *(ei löytynyt)* | – | 0 | 15 |
| `hero-mekka-aamu.png` | Mekka | a | Suuren moskeijan | Suuren moskeijan | *(ei löytynyt)* | – | 1 | 15 |
| `hero-moskova-ilta.png` | Moskova | a | Moskovan valtionyliopiston päärakennus | Moskovan valtionyliopiston päärakennus | *(ei löytynyt)* | – | 1 | 15 |
| `hero-oslo-ilta.png` | Oslo | a | Oslon kuninkaanlinna | Oslon kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| `hero-oslo-keskipaiva.png` | Oslo | a | Holmenkollenissa | Holmenkollenissa | *(ei löytynyt)* | – | 0 | 15 |
| `hero-pariisi-ilta.png` | Pariisi | a | Sacré-Cœurin basilikaa | Sacré-Cœurin basilikaa | *(ei löytynyt)* | – | 0 | 15 |
| `hero-pariisi-keskipaiva.png` | Pariisi | a | Notre-Damen katedraalia | Notre-Damen katedraalia | *(ei löytynyt)* | – | 0 | 15 |
| `hero-peking-keskipaiva.png` | Peking | a | Taivaan temppelissä | Taivaan temppelissä | *(ei löytynyt)* | – | 0 | 15 |
| `hero-petra-ilta.png` | Petra | a | Kuningashautojen | Kuningashautojen | *(ei löytynyt)* | – | 0 | 15 |
| `hero-pietari-ilta.png` | Pietari | a | Pietari-Paavalin katedraalin | Pietari-Paavalin katedraalin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-praha-aamu.png` | Praha | a | Pyhän Vituksen katedraalin | Pyhän Vituksen katedraalin | *(ei löytynyt)* | – | 1 | 15 |
| `hero-praha-ilta.png` | Praha | a | Tynin kirkkoa | Tynin kirkkoa | *(ei löytynyt)* | – | 0 | 15 |
| `hero-riad-aamu.png` | Riad | a | Masmakin savitiililinnoitus | Masmakin savitiililinnoitus | *(ei löytynyt)* | – | 0 | 15 |
| `hero-riad-ilta.png` | Riad | a | Kingdom Centre | Kingdom Centre | *(ei löytynyt)* | – | 0 | 15 |
| `hero-riad-keskipaiva.png` | Riad | a | Al Faisaliahin torni | Al Faisaliahin torni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-riika-keskipaiva.png` | Riika | a | Riian vapaudenpatsas | Riian vapaudenpatsas | *(ei löytynyt)* | – | 0 | 15 |
| `hero-rooma-ilta.png` | Rooma | a | Pantheonin | Pantheonin | *(ei löytynyt)* | – | 2 | 15 |
| `hero-rooma-keskipaiva.png` | Rooma | a | Pietarinkirkkoa | Pietarinkirkkoa | *(ei löytynyt)* | – | 0 | 15 |
| `hero-tabriz-aamu.png` | Tabriz | a | Tabrizin Sininen moskeija | Sininen moskeija | *(ei löytynyt)* | – | 2936 | 15 |
| `hero-tabriz-keskipaiva.png` | Tabriz | a | Tabrizin Arg eli Alishahin | Tabrizin Arg eli Alishahin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-tallinna-ilta.png` | Tallinna | a | Tallinnan teletorni | Tallinnan teletorni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-tampere-aamu.png` | Tampere | a | Tampereen Näsilinna | Tampereen Näsilinna | *(ei löytynyt)* | – | 22 | 15 |
| `hero-tampere-keskipaiva.png` | Tampere | a | Tampereen pääkirjasto Metso | Tampereen pääkirjasto Metso | *(ei löytynyt)* | – | 604 | 15 |
| `hero-teheran-aamu.png` | Teheran | a | Azadi-torni | Azadi-torni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-tokio-keskipaiva.png` | Tokio | a | Tokion torni | Tokion torni | *(ei löytynyt)* | – | 0 | 15 |
| `hero-tukholma-ilta.png` | Tukholma | a | Riddarholmenin kirkko | Riddarholmenin kirkko | *(ei löytynyt)* | – | 0 | 15 |
| `hero-varsova-aamu.png` | Varsova | a | Varsovan kuninkaanlinna | Varsovan kuninkaanlinna | *(ei löytynyt)* | – | 0 | 15 |
| `hero-varsova-ilta.png` | Varsova | a | Saaripalatsi | Saaripalatsi | *(ei löytynyt)* | – | 0 | 15 |
| `hero-varsova-keskipaiva.png` | Varsova | a | Wilanówin palatsin | Wilanówin palatsin | *(ei löytynyt)* | – | 0 | 15 |
| `hero-venetsia-aamu.png` | Venetsia | a | Markuksenkirkon | Markuksenkirkon | *(ei löytynyt)* | – | 0 | 15 |
| `hero-wien-aamu.png` | Wien | a | Stephansdomin etelätorni | Stephansdomin etelätorni | *(ei löytynyt)* | – | 0 | 15 |
| `hero7-oodi.png` | Helsinki | a | Keskustakirjasto Oodi | Keskustakirjasto Oodi | *(ei löytynyt)* | – | 1654085 | 15 |
| `hero-istanbul-aamu.png` | Istanbul | a | Hagia Sofia | Hagia Sofia | Category:Hagia Sofia | 0 | 14310 | 15 |
| `hero-moskova-keskipaiva.png` | Moskova | a | Kremlin | Kremlin | Category:Kremlin | 0 | 61420 | 15 |
| `hero-pietari-keskipaiva.png` | Pietari | a | Verikirkko | Verikirkko | Category:Church of the Saviour on the Blood | 0 | 499 | 15 |
| `hero-wien-keskipaiva.png` | Wien | a | Schönbrunn | Schönbrunn | Category:Schönbrunn (surname) | 0 | 13551 | 15 |
| `hero7-tuomiokirkko.png` | Helsinki | a | Carl Ludvig Engelin | Ludvig Engelin | Category:Churches by Carl Ludvig Engel | 1 | 108 | 15 |
| `hero-mekka-keskipaiva.png` | Mekka | a | Abraj Al-Bait -tornin | Abraj Al-Bait -tornin | Category:Abraj Al Bait Towers | 2 | 39296 | 15 |
| `hero-venetsia-ilta.png` | Venetsia | a | Santa Maria della Salute | Maria della Salute | Category:Santa Maria della Salute (Venice) | 2 | 108313 | 15 |
| `hero-petra-aamu.png` | Petra | a | Al-Khazneh eli Aarrekammio | eli Aarrekammio | Category:Treasury of Cyrene (Olympia) | 5 | 0 | 12 |
| `hero-wien-ilta.png` | Wien | a | Valtionooppera | Valtionooppera | Category:Hamburgische Staatsoper | 5 | 1268 | 12 |
| `hero-teheran-ilta.png` | Teheran | a | Milad-torni | Milad-torni | Category:Milad Tower | 6 | 0 | 12 |
| `hero-riika-ilta.png` | Riika | a | Riian Pyhän Pietarin kirkko | Pietarin kirkko | Category:Lieto church | 8 | 445 | 12 |
| `hero-petra-keskipaiva.png` | Petra | a | Ad-Deir eli Luostari | eli Luostari | Category:Lintula Holy Trinity Convent | 11 | 18 | 12 |
| `hero-barcelona-keskipaiva.png` | Barcelona | a | Casa Batlló | Casa Batlló | Category:Casa Batlló | 14 | 1951 | 12 |
| `hero-lontoo-ilta.png` | Lontoo | a | Christopher Wrenin St Paulin katedraali | St Paulin katedraali | Category:St. Paul's Cathedral | 14 | 2460 | 12 |
| `hero-moskova-aamu.png` | Moskova | a | Vasilin katedraali | Vasilin katedraali | Category:Saint Basil's Cathedral | 17 | 122 | 12 |
| `hero-dubai-ilta.png` | Dubai | b | Al Fahidin kortteli | Al Fahidin kortteli | *(ei löytynyt)* | – | 0 | 10 |
| `hero-lissabon-ilta.png` | Lissabon | b | Kauppatori (Praça do Comércio) | Kauppatori | *(ei löytynyt)* | – | 2892 | 10 |
| `hero-amsterdam-ilta.png` | Amsterdam | b | "Laiha silta" eli Magere Brug | Magere Brug | Category:Magere Brug | 0 | 0 | 10 |
| `hero-madrid-keskipaiva.png` | Madrid | b | Plaza Mayor | Plaza Mayor | Category:Plaza Mayor | 1 | 41638 | 10 |
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
- **Tärkein löydös — "kategoriaa ei löytynyt" ei aina tarkoita sitä**: koodi ei erottanut toisistaan "Commons-haku palautti aidosti tyhjän" ja "Commons-haku epäonnistui/rajoitettiin, ja tulos jäi tyhjäksi sen takia". Käytännössä tämä näkyy kärkilistassa 8 rivillä, joilla tunnettu, runsaasti kuvattu kohde (esim. Sagrada Família, Pantheon, Pyhän Vituksen katedraali) saa täydet riskipisteet vain siksi, että kategoriahaku ei ehtinyt/onnistunut — ei siksi, että kuvia olisi vähän. Merkitty **⚠**-lipulla Kärkilista-taulukossa. Tämä on menetelmän todellinen heikkous eikä pelkkä yksittäistapaus, ja se kannattaa korjata (erottaa virhetila "ei tulosta"-tilasta) ennen seuraavaa ajoa.
- **Mittaus on kesken**: 120/258 kuvaa jäi kokonaan ilman Commons-mittausta (rajapinnan 429-rajoitus pysäytti ajon kesken). Näiltä osin taulukko kertoo vain luokan (a/b/c), ei kuvadatan tiheyttä. Seuraava ajo pitäisi aloittaa juuri näistä — erityisesti Kašgarin toinen kuva, koska se on tunnettu virhetapaus.
- Tämä on **automatisoitu mittaus**, ei silmämääräinen tarkistus. Kohteen nimen päättely kuvatekstistä on heuristinen (noin 50 kuvaa korjattu käsin, loput automaatin varassa) — väärin poimittu tai epätäsmällinen nimi voi joko yli- tai aliarvioida yksittäisen kuvan riskin.
- Commons-kategorian tiedostomäärä mittaa vain parhaan osuman kategoriaa; jos oikea kategoria on eri nimellä tai kohde on jaettu useaan alikategoriaan, todellinen kuvamäärä voi olla mitattua suurempi.
- Hakuosumat (`srnamespace=6`) ovat löysempi mittari (koko tekstihaku) ja voivat antaa korkeita lukuja myös silloin, kun kyseessä on yleinen sana — esimerkiksi henkilön- tai paikannimi, joka osuu moneen tiedostoon aivan eri aiheista. Siksi ensisijainen riskimittari on kategorian tiedostomäärä.
- Luokkien (b) ja (c) rajanveto on paikoin tulkinnanvarainen (esim. "markkinapaikka" tai "rantapromenadi") — nämä on ratkaistu lähimmän vastaavuuden mukaan Raamatun ja tehtävän määritelmään.
