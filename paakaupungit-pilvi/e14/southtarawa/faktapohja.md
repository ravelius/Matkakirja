# South Tarawa — rajattu A-kooste / C-luonnoksen lähdepohja

Omistus e14/southtarawa, tehtävä 26. Luettu 12.10.2026. Tämä on nopean tekstityön lähdekooste, **ei täyden A-portin läpäisy**. Konteksti luettu; maalehteä, lähikaupunkeja tai lähinostoja ei kontekstissa ole. Kevyen pisteen pääaiheiden pelkkää toistoa vältetään: uudet nostot painottuvat veteen, kopran ketjuun, rannan hoitoon, tiehen, maneabaan, nimeen ja historiallisiin kerroksiin.

## 0. Lähteet ja hakutodisteet

Kaikki alla mainitut sivut haettu yhteisellä `valiaikainen/sallittu_haku.py`-apurilla. Tavalliset robots-sallitut HTML-polut; ei API-, raakateksti-, PDF- tai kuvahakuja. Tallennetut HTML:t ja lukutekstit ovat `valiaikainen/nopea-e14-southtarawa/`-kansiossa. Yhteinen hakuloki sisältää polkutarkistukset ja lähteiden SHA:t, oma lähdeluettelo `lahteet.jsonl` täydentää niitä. www.kiribatitourism.gov.ki/robots.txt palautti 301:n; sitä yritystä ei käytetty lähteenä. Sivut haettiin kanonisesta kiribatitourism.gov.ki-tunnuksesta sen oman robots-tarkistuksen jälkeen.

- S1 [South Tarawa](https://en.wikipedia.org/wiki/South_Tarawa): Geography, History, Environment/Water, Coastal erosion, Land availability, Economy, Visiting. `southtarawa.html/txt`.
- S2 [Tarawa](https://en.wikipedia.org/wiki/Tarawa): Etymology, Geography, Administration, History. `tarawa.html/txt`.
- S3 [Maneaba](https://en.wikipedia.org/wiki/Maneaba): koko lyhyt artikkeli. `maneaba.html/txt`.
- S4 [Tarawa, Wikivoyage](https://en.wikivoyage.org/wiki/Tarawa): Geography, Get in, Sleep. Opas on suppea ja osin vanhentunut; ei reitti-/aikataululupauksia, hintoja tai hotellisuosituksia. `voyage.html/txt`.
- S5 [Copra](https://en.wikipedia.org/wiki/Copra): lead, kopran määritelmä. `copra.html/txt`.
- P1 [Tourism Authority of Kiribati: Journey With Us](https://kiribatitourism.gov.ki/journey-with-us): Bonrikin lentoaseman sijainti ja kansainväliset yhteydet. `journey.html/txt`.
- P2 [Tourism Authority of Kiribati: Things To Do](https://kiribatitourism.gov.ki/things-to-do): matkailun yleiset teemat; ei sellaisenaan South Tarawan ruokafaktalähde. `tourism.html/txt`.
- P3 [ADB/GCF: South Tarawa Water Supply Project](https://www.adb.org/multimedia/adbandgcf/our-projects/kiribati/): maanalaiset makean veden linssit, Bonriki/Buota, kuivuuden ja tulvimisen uhka; suunnitellut vesihuollon ratkaisut. Hankkeen kapasiteetteja tai valmistumista ei väitetä. `water.html/txt`.

## 1. 1873-kehys

S2/History: Gilbert-saarten asutus on vanha; brittiprotektoraatti ja siirtomaahallinnon keskuksen sijoittaminen Tarawaan tapahtuvat vasta 1800-luvun lopulla. S1/History kertoo hallinnon sijainnin vaihtelusta ja paluusta Tarawaan. Turvallinen muoto: vuonna 1873 Tarawa oli asuttu atolli, nykyinen hallintokeskus muodostui myöhemmin. Ei isoisän tekoja, reittiä, kohtaamista eikä lainauksia. Tarkkoja protektoraatti- tai hallintovuosia ei käytetä: kaksi riippumatonta alkuperäislähdettä puuttuu.

## 2. Perusfaktat ja väiteluettelo

| Tekstiin käytetty fakta | Lähde / osio |
|---|---|
| Kiribatin pääkaupunkikeskus, eteläiset Tarawan luodot; laguuni pohjoisessa ja Tyynimeri etelässä | S1 / lead, Geography |
| Luodot yhdistyvät tiehen; päätie Betion ja Bonrikin välillä | S1 / Geography, S2 / Geography, History |
| Päätien kunnostus kansainvälisen kehityshankkeen kautta | S2 / History (World Bank); ei tarkkaa vuotta tai syypäätelmää |
| Ulkosaarten kopra käsitellään Betiossa kookosöljyksi; vienti ja paikalliset tuotteet | S1 / Economy |
| Kopra on kuivattua kookospähkinän ydintä | S5 / lead |
| Kalastus kotitalouksille ja myyntiin; tuonnin taloudellinen merkitys | S1 / Economy, kuvan tekstiselite |
| Makean veden pohjavesilinssit korallimaan alla, Bonriki ja Buota; kuivuus, rajallisuus, saastuminen | S1 / Water; P3 / hankkeen tausta |
| Rannikon tulviminen/suolaantuminen uhkaa vesivarantoja | S1 / Environment; P3 / hankkeen tausta |
| Bonrikissa sekä lentoasema että vesivaranto | S1 / lead, Water, Land availability; P1 / Airports |
| Mangroveistutukset valikoiduissa paikoissa; myös rantamuurit ja hiekan/soran ottaminen vaikuttavat eroosioon; vaikutusten suhteet epäselviä | S1 / Coastal erosion |
| Atolli kapea ja tiheästi asuttu, vetäytymistila rajallinen | S1 / Environment kuvan tekstiselite; ei tarkkoja mitta-/tiheyslukuja |
| Maneaba kokoontumistalo, yhteisö rakentaa, kookospuu/koralli/kookoskuitusidokset/pandanus; symboliset tehtävät | S3 / lead |
| Betiossa maneaba | S3 / artikkelin kohdekuvan tekstiselite; ei karttakohde eikä kuva otettu käyttöön |
| Parlamentin nimi Maneaba ni Maungatabu | S3 / lead |
| Te Rawa/kulkuväylä; luomiskertomuksen Nareau, Karawa/taivas, Marawa/meri, Tarawa/maa | S2 / Etymology, History; kertomus nimetään kertomukseksi |
| Betio Tarawan toisen maailmansodan taistelupaikka; Japanin miehitys, Yhdysvaltain maihinnousu/tukikohdat, puolustusrakenteiden jälkiä | S1 / History, S2 / History ja puolustuslaitteiden tekstiselite, P2 / World War II; ei sotavuotta/uhrilukuja |
| Kookos, pandanus, leipäpuu, papaija ja banaani Tarawalla | S2 / Geography; ei koko Kiribatin kaikkien saarten väite |
| Majoitusta South Tarawalla | S1 / Accommodation; S4 / Sleep; ei yksittäisiä suosituksia |
| South Tarawa / North Tarawa erilliset alueet; Buotaan maayhteys, pohjoisen luotoihin ei sama jatkuva tie | S1 / Administration, S2 / Geography, S4 / Geography |
| Lämmin/kostea, sademäärä vaihteleva, kuivia jaksoja | S1 / Climate; ei kuukausia, asteita, millimetrejä tai kausisuositusta |

## 3. Kansi ja teema

Kansi: makea vesi; ulkosaarten kopra; rannikon mangrovet/eroosio; tieverkko. Historia-teema: maneaba; Tarawan nimi ja kertomus; 1873 ennen hallintokeskusta; Betion historian ja nykyisen työn rinnakkaisuus. Kertovat johdannot eivät lisää lähteettömiä historiallisia tapahtumia tai syy-yhteyksiä.

## 4. Matkailijan opas

Viisi jaksoa: perille/liikkuminen, kokoontumistalot, Betion elinkeinot, ruoka, sää/vesi. Paikallista sopimista ja ennusteen tarkistamista koskevat lauseet ovat toimituksellisia toimintaohjeita, eivät kuvauksia varmennetusta paikallisesta säännöstä. Viranomaisen matkustusvaroituksen nykytila on D-tarkistuksessa avoin; vaarallisuutta tai turvallisuustasoa ei luvata. P1 on ajantasainen ensisijainen lentoaseman sijaintilähde, mutta aikatauluja ei kopioida.

## 5. Kartta / suojatut teokset

Partial: 0 varmennettua yksittäistä karttakohdetta, `rajat:{}`, `kohteet:[]`, `nahtavyydet:{}`. Kaupungin tai Betion kyläpistettä ei lainata museolle, rakennukselle, muistomerkille tai mangrovealueelle. Te Umanibongin, yksittäisen mangrovealueen ja sataman tarkka oma WP/WD-piste ja kohderajaus avoimia. Parlamentti, katedraali ja muistomerkit eivät ole kohteina: tekijän kuolinajan/suojan varmistus puuttuu. Ei taideteosten tai rakennusten nimeämistä luontokohteiksi.

## 6. Kysymykset

Viisi kysymystä: valtio; kopra; maneaba; Bonriki; makean veden linssi. Taso 1 ja 3 mukana. Vastaukset löytyvät kaupungin tekstistä. Minitehtävä kysyy Karawan/Marawan nimiä, joita visa ei kysy; vastaus historian samalta sivulta.

## 7. Kuvaputki

18 kuvaroolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5. Kaikki neljä kenttää tyhjiä. Ei Commons-hakua, kuvatiedostonimen arvausta eikä generointia. Kuvaputken kohteet ja tarkempi briiffi kirjoitusmuistiossa. Tarawan/Buotan vesivarannot tai mangrovealueet eivät saa kuvan perusteella tekaistua karttapistettä.

## 8. Ristiriidat ja rajaukset

- S1:n infolaatikko/lead antaa 73 073 ja vuoden 2026, mutta Population-teksti 63 439/2020; kontekstin hyväksytty luku 63 439/2020 koskee koko South Tarawan saariketjua. Ei väkilukua C-tekstissä. S4:n koko Tarawan noin 70 000/2020 ei ole South Tarawan luku eikä riippumaton väestövarmennus.
- S1, S4 ja P1 sisältävät poikkeavia lentoreittejä ja päiviä. Ei lento-/laiva-aikatauluja eikä lentoyhtiötä koskevia lupauksia.
- Ei tarkkoja mitta-, vuosiluku-, määrä-, kapasiteetti- tai superlatiiviväitteitä. 1873 on annettu tarinakehys; yhteinen sana "koko" maneaban rakentamisessa tulee S3:n kuvauksesta eikä ole lukumääräarvio.
- Sääauditointi 48/48 primäärivarmennusta puuttuu: `saatiedot:null`. Ei säähaun uutta kierrosta eikä saa.json-muokkausta.

## 9. Portit

Rajattu A ja C-luonnos olemassa. B, kartan täysi A-portti, D/E/F, omistajan hyväksyntä, pelikytkentä ja julkaisu avoimia. Alkuperäisen lyhyen tarkistimen tulos talletetaan omaan väliaineistoon; kuva-/karttavirheet säilyvät näkyvinä.
