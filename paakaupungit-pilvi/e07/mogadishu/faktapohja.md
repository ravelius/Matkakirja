# Mogadishu — faktapohja 0–9, vaihe A

Erä e07, id `mogadishu`, maa SOM. Luettu **11.10.2026**. **A partial:** kansi- ja teemasivun 4 + 4 aihetta, nykyopas, kysymysaiheet ja kuvatarpeet on lähteistetty. Kartalla on kuusi nimettyä koordinaattiehdokasta, mutta Garesan/nykyisen kansallismuseon sijainti-identiteetti, majakan kaksi WD-pistettä, Ansalotin suppeat paikkafaktat sekä myöhempien rakennusosien oikeudet ovat avoinna. Tämä ei ole hyväksytty kuuden kohteen kartta eikä valmis A-vaihe.

Kuvia ei ole valittu eikä Commons-hakuja tehty. `sisalto.json`, pelitiedostot ja Git ovat koskematta. Sää **null**: alkuperäinen sääpoiminta hylättiin puuttuvan normaalikauden vuoksi; ei aste-/sademäärälukuja.

## 0. Luetut lähteet ja 1873-kehys

Raakalähteet, luettavat tekstipoiminnat, lähdemetat ja linkit tallennettiin NAS-kansioon `valiaikainen/mogadishu-A/`. `lahteet.json` sisältää lähdeosoitteet, revisiot ja SHA256-tiivisteet. Haku käytti yhteistä `sallittu_haku.py`-kuljetusta, robots-tarkistuksia molemmille agenteille, yhteistä 1 pyyntö/s -lukkoa ja välimuistia. Omistajan hyväksymä sallittujen alkuperäisten `/wiki/`-sivujen poikkeus käytössä; ei `/w/`-/`/api/`-kiertoa, estettyjä Special-polkuja tai User-Agent-vaihtoa.

### Wikipedia, Wikivoyage ja viranomaisohje

| Tunnus | Alkuperäinen lähde | Kieli/revisio | Luetut kohdat |
|---|---|---|---|
| S1 | [Mogadishu](https://en.wikipedia.org/wiki/Mogadishu) | en 1377027362 | johdanto, History/Hiraab Imamate ja 1873-havainto, Landmarks, Museums/libraries/theatres, Markets, Culture, Transport; nykypolitiikka/iskut pois |
| S2 | [History of Mogadishu](https://en.wikipedia.org/wiki/History_of_Mogadishu) | en 1355829233 | vanha kaupunki ja siirtomaakauteen siirtyminen; ei jo pelissä olevia keskiaikaisen kaupan tarinoita |
| S3 | [Fakhr al-Din Mosque](https://en.wikipedia.org/wiki/Fakhr_al-Din_Mosque) | en 1366913852 | Overview; luettu päällekkäisyyden tunnistamiseksi, ei uusien nostojen lähteeksi |
| S4 | [Arba'a Rukun Mosque](https://en.wikipedia.org/wiki/Arba%27a_Rukun_Mosque) | en 1366872044 | johdanto, Overview, oma koordinaatti, perustajan/mihrabin tiedot; alkuperäinen keskiaikainen rakennus erotettava korjauksista |
| S5 | [National Museum of Somalia](https://en.wikipedia.org/wiki/National_Museum_of_Somalia) | en 1333691510 | Garesa Museum, New National Museum building, Reopening, Collections; infolaatikon piste ja eri rakennusten ero |
| S6 | [Mogadishu Cathedral](https://en.wikipedia.org/wiki/Mogadishu_Cathedral) | en 1371745069 | johdanto, History, Current situation, oma piste, Vandone-suunnittelu ja Cefalù-vertailu |
| S7 | [Mogadishu Lighthouse](https://en.wikipedia.org/wiki/Mogadishu_Lighthouse) | en 1378817716 | historia, arkkitehtuuri, säilyttäminen, lähdeviitteet; sivulla epäillystä tekoälytekstistä varoittava luokka, joten uuden historian yksityiskohdat eivät kelpaa ilman alkuperäistukea |
| S8 | [Lido Beach, Mogadishu](https://en.wikipedia.org/wiki/Lido_Beach,_Mogadishu) | en 1367986875 | johdanto, History, Present, oma piste; tapahtuma- ja hyökkäysosiot eivät ole lehtiaiheita |
| S9 | [Ansaloti Market](https://en.wikipedia.org/wiki/Ansaloti_Market) | en 1318534373 | johdanto, Overview, oma koordinaatti; suppea lähdepohja kirjattu |
| S10 | [Mogadishu–Villabruzzi Railway](https://en.wikipedia.org/wiki/Mogadishu%E2%80%93Villabruzzi_Railway) | en 1260633848 | johdanto, History, Statistics, Equipment, Railway stations; sisäiset ristiriidat ja lajikuvien väärä käyttötapa kirjattu |
| S11 | [Radio Mogadishu](https://en.wikipedia.org/wiki/Radio_Mogadishu) | en 1342396085 | johdanto, History, digitointi; henkilöstö- ja konfliktihistoria pois |
| S12 | [Antonio Vandone](https://fr.wikipedia.org/wiki/Antonio_Vandone) | fr 229664202 | kuolinvuosi, tekijä ja Mogadishun katedraali teosluettelossa |
| S13 | [Aden Adde International Airport](https://en.wikipedia.org/wiki/Aden_Adde_International_Airport) | en 1378324456 | nimi, IATA MGQ, palveltu kaupunki; ei lentolistojen nykyisyyden lupausta |
| S14 | [Hamar Weyne District](https://en.wikipedia.org/wiki/Hamar_Weyne_District) | en 1378972984 | vanhan kaupunginosan sijainti/olemassaolo; ei omaa rakennuskohteen koordinaattia |
| S15 | [Shangani District](https://en.wikipedia.org/wiki/Shangani_District) | en 1379122763 | kaupunginosa ja historiallinen alue; ei kaupunginosapistettä moskeijan pisteeksi |
| S16 | [Port of Mogadishu](https://en.wikipedia.org/wiki/Port_of_Mogadishu) | en 1337551791 | johdanto, Historical overview ja vanhan/uuden satamainfrastruktuurin ero; ei suojavapaata rakennusväitettä koko satamasta |
| S17 | [Somali architecture](https://en.wikipedia.org/wiki/Somali_architecture) | en 1374325466 | Early modern/colonial, materiaalit, Towers/lighthouses; yleinen somaliarkkitehtuuri erotettu Mogadishun yksittäisistä taloista |
| S18 | [Shaykh Sufi](https://en.wikipedia.org/wiki/Shaykh_Sufi) | en 1364501980 | Life, mausoleumi; henkilön kuolema ei ole moskeijan tekijän kuolema |
| S19 | [Somali maritime history](https://en.wikipedia.org/wiki/Somali_maritime_history) | en 1328397583 | tarkistettu toistoja varten; ei keskiajan Kiina-/Sofala-tarinoita uudelleen |
| O1 | [Mogadishu, Wikivoyage](https://en.wikivoyage.org/wiki/Mogadishu) | en 5385276 | Understand, Get in, See, Stay safe; nykyvaroitus, piste-erot ja vanhentuneet palvelutiedot. Sen pisteet eivät korvaa WP/WD-pisteitä |
| O2 | [UM: Somalia, matkustustiedote](https://um.fi/matkustustiedote/-/c/SO) | fi, **14.9.2026** | turvallisuustaso, konsulipalvelujen puute, liikenne, terveys/evakuointi, maahantulo |

### Alkuperäislähteet

| Tunnus | Lähde | Luettu kohta |
|---|---|---|
| P1 | [UNESCO: Safeguarding the voices that shaped a nation](https://www.unesco.org/en/articles/safeguarding-voices-shaped-nation) | 28.7.2026, päivitetty 25.8.2026; radioarkiston magneettinauhat, aineistotyypit, puhdistus/arviointi/digitointi; ei poliittisia puheita tarinaksi |
| P2 | [UNSOM: Radio Mogadishu – Saving historic audio recordings](https://unsom.unmissions.org/radio-mogadishu-saving-historic-audio-recordings-future-generations-somalis) | radioarkiston pelastaminen; ei nykyhallinnon tarinaa |
| P3 | [FAO: Mogadishun kalatalouden kehittäminen](https://www.fao.org/somalia/news/details/fao-joins-forces-with-japan-and-the-government-of-somalia-in-latest-step-to-boost-under-performing-fishing-industry/en) | päiväys **7.12.2025**, Liido Fish Market -kohdan kalan rantautuminen, kylmäketju, käsittely, pesu ja vedenpoisto; suunnitelma erotettu toteutuneesta muutoksesta |
| P4 | [UNESCO: Illuminating the past – Mogadishu's lighthouse](https://www.unesco.org/en/articles/illuminating-past-mogadishus-lighthouse-leads-heritage-revival-somalia) | 3.6.2025, päivitetty 6.11.2025; osittain sortuneen majakan rakenteiden tutkiminen ja säilyttämissuunnitelma, vanhan kaupungin kohteet |
| P5 | [UNESCO: From ruins to renewal](https://www.unesco.org/en/articles/ruins-renewal-stakeholders-chart-future-mogadishu-lighthouse) | alustavan tutkimusvaiheen valmistuminen ja pitkäaikaisen tuennan/säilyttämisen suunnittelu; ei valmista uudelleen rakennettua majakkaa |
| P6 | [UNESCO:n aieluettelo: Mogadishu Secondo-Lido Lighthouse, 6754](https://whc.unesco.org/en/tentativelists/6754) | SOMASCA:n toimittama esitys 22.1.2025, Description/Integrity; **aieluettelo, ei maailmanperintölistan hyväksytty kohde**. Historialliset ja materiaalikuvauksen epätarkkuudet huomioitu |
| P7 | [UNESCO: Somalia reopens its National Museum](https://www.unesco.org/en/articles/federal-republic-somalia-reopens-its-national-museum-mogadishu) | 2.7.2020, päivitys 20.4.2023; museoinstituution historia ja uudelleenavaus, ei yksittäisten esineiden arkeologisen löytöpaikan todiste |
| P8 | [UNSOM: National Museum – Preserving Somali heritage](https://unsom.unmissions.org/national-museum-preserving-somali-heritage-against-all-odds) | 20.11.2020; **vanha Garesa ja uusi museorakennus eri paikkoina**, kokoelman esineryhmät ja rakennushistoria |
| P9 | [Italian kulttuuriperintövirasto: Antonio Vandone -tekijätieto](https://catalogo.beniculturali.it/detail/HistoricOrArtisticProperty/0100448529) | alkuperäisen teosluettelon tekijätietona **Antonio Vandone (1862/1937), architetto**; tukee kuolinvuotta, ei ole Mogadishun rakennuksen kuva |
| P10 | [CISP: Stories from Girls and Women of Mogadishu](https://www.culture4inclusion.org/resources/Stories_from_Mogadishu-book.pdf) | julkaisu 2017/2; PDF-sivu 3 nimi/tekijät, **PDF-sivut 86–87 / painetut sivut 154–155: The Businesswoman, Dahabo**. Teksti ja kokonaiset sivut katsottu. Tämä on haastattelujulkaisu, **ei kaupungin rakennushistoriateos** |
| P11 | [UNESCO: Somalia Celebrates World Radio Day 2024](https://www.unesco.org/en/articles/somalia-celebrates-world-radio-day-2024) | radioaseman sijainti, perustaminen, kulttuurinen toiminta; poliitikkositaatit ja kansalliset tilastot pois |

P10:n tekstintunnistus tehtiin PDF-taito-ohjeen mukaan; sivut 86–87 renderöitiin NAS:lle ja tarkistettiin kuvina, alaviite Bakaara Marketista luettiin mutta sen superlatiivia ei siirretä peliin. Julkaisun kuvat/teksti ovat tekijänoikeudella suojattuja: **ei kuvia, sivuskannauksia tai haastattelun suoria lainauksia pelisisältöön**. K2 on lyhyt omin sanoin koottu henkilöä koskeva faktavara; yksittäisestä haastattelusta ei tehdä väestötutkimusta tai nykyisen liikkeen palvelulupausta. Wikipedia-ensisijaisuuden tiukassa tulkinnassa K2 voidaan jättää lähdevaihtoehdoksi ja korvata C-vaiheessa, mikä on kirjattava.

UNSDG:n ensimmäinen radioartikkeli palautti 403, eikä sitä käytetä varsinaisena lähteenä. ALIPH:n ensimmäinen hankelinkki palautti 404. UNESCO:n `unesdoc.unesco.org/images/0007/000787/078773eo.pdf` oli robots.txt:n kieltämä: **ei haettu**, eikä sen otsikkoa pidetä luettuna todisteena. Politecnico di Torinon kaksi osoiteyritystä päättyivät 307-virheeseen; tekijätieto varmennettiin P9:stä sen sijaan, ei hakutuloskatkelmasta tai pääsyn ohituksesta.

### Wikidata, sallitut EntityData-tallenteet

| Kohde | Entiteetti/revisio | P625 tai tekijätieto |
|---|---|---|
| Arba'a Rukun | Q15186773 / 2545453853 | 2.03510, 45.34250; oma WP 2.03500, 45.34250. WD:n perustamisvuosi 1260 ei käy tarkaksi korvikkeeksi |
| Kansallismuseo | Q2033310 / 2537661111 | 2.03750, 45.33810; oma WP 2.04300, 45.33717. **Eri pisteet; instituution ja vanhan Garesan identiteetti avoin** |
| Katedraali | Q962672 / 2529912888 | 2.035736, 45.341614; oman WP:n 2.03583, 45.34167 lähellä samaa rakennusta |
| Majakka | Q135438856 / 2553622863 | kaksi samanarvoista normal-pistettä, ei lähdeviitteitä: 2.0323055556, 45.3453055556 ja 2.0386944444, 45.3333055556; ei hiljaista valintaa |
| Liidon ranta | Q25108684 / 2509268324 | 2.039751, 45.363723; oma WP 2.04028, 45.36361. Rannan eri kohdat, ei kuvasta laskettua keskiarvoa |
| Ansaloti | Q18205267 / 2483418865 | 2.04900, 45.32000, sama kuin oma WP; WD:n tarkkuus hyvin väljä, n. yhden kilometrin luokkaa. **Viiden desimaalin muotoilu ei tee mittauksesta metrin tarkkaa** |
| Antonio Vandone | Q2857486 / 2545676321 | P570 **1937**, fr-WP S12 ja Italian alkuperäinen P9 tukevat. Alkuperäisen tekijän kuolemasta yli 70 vuotta; ei nykyisten lisäosien tekijälupaa |

### 1873-kehys

- Mogadishu **oli jo vanha kaupunki vuonna 1873**, toisin kuin eräät saman jonon myöhemmin perustetut pääkaupungit. S1/S2 kuvaavat keskiaikaista kaupunkia ja P6 vanhaa moskeija-/asuintalokokonaisuutta. Ei tarkkaa ensimmäisen perustamisen vuotta tai antikin Sarapion = Mogadishu -samastusta varmana.
- S1 mainitsee John Kirkin alueella tekemän 1873-havainnon viljakuormista Mogadishun ja Mercan edustalla. Tarkka laivamäärä ja vierailun henkilödynamiikka ovat vain yhden luetun lähdeketjun varassa, joten eivät siirry pelaajatekstiin.
- Vuoden 1873 kaupunkikuvaan voi lähteiden perusteella sijoittaa vanhaa moskeija- ja kauppasatamaympäristöä. Nykyistä majakkaa, katedraalia, rataa, radioasemaa tai uudempaa museorakennusta ei ollut.
- Vanhan Garesan rakennusajasta on 1870/1872-ero (S1 vs S5); ei väitetä nykyisen museokuvan olleen olemassa vuonna 1873. Garesan valmistumisen tarkka suhde vuoteen 1873 jää ratkaisematta.
- Ei isoisän vierailua, reittiä, puhetta, muistikirjamerkintää tai kohtaamista.

### Pelin toiston tarkistus

`konteksti.json` ja `js/packs/maastokohteet-som.js` Hamar Weyne -kohta luettiin kokonaan. Pelissä ovat jo Fakhr al-Dinin 1269-piirtokirjoitus, rakennuttaja, mihrab, Pohjois-Intian marmori, kaksi kartiokupolia sekä noin 25 moskeijan väite. **Näitä ei toisteta uusina lehtinostoina.**

Somalian maalehden historia: Mogadishun kangas Kairossa ja vieraan kotiin majoittaminen; lähettiläs Kiinaan; Madagaskar-nimitarina; Sofalan kala-/kultasatamatarina. Lisäksi runous, musiikin balwo/luuttu/pentatoniikka/Aamunkoitto, canjeero/federaatio/xalwo/tee, monsuunivirta/kameli/strutsi/villiaasi. Kaikki nämä nostotarinoina pois tästä paketista. K3 käsittelee **tallenteiden säilyttämistekniikkaa**, ei maalehden musiikkihistoriaa, ja K2 nykyaikaisen vaatekauppiaan ompelutyötä, ei keskiaikaista toob benadir -vientikangasta.

## 1. Perusfaktat

- Suomen nimi ja wiki-avain **Mogadishu**, somaliksi **Muqdisho**, paikallinen **Xamar/Hamar** (S1/O1). Itse nimen alkuperästä ei paineta yhtä kiistatonta etymologiaa.
- Somalian pääkaupunki Intian valtameren rannikolla, Banaadirin alueella (S1, konteksti). Somali Sea -nimityksen käytössä ei tehdä poliittista merialueväitettä; yleinen Intian valtameri riittää.
- Historiallinen kaupunkikohdealue on Hamar Weynen ja Shanganin vanha keskusta, ei koko Banaadirin hallinnollinen alue (S14/S15/P4).
- Asukasluku kontekstista: **3 289 438**, Banaadirin alueen arvio syyskuussa **2025**, IPC:n analyysi 24.2.2026, EUAA lainaa. Tätä ei sanota Mogadishun kunnan laskentatulokseksi. Pelaajatekstiin tarvittaessa **noin 3,3 miljoonaa Banaadirin alueen asukasta vuonna 2025**, laajuus mukana. IPC/EUAA-sivua ei haettu erikseen eikä luvulle väitetä uutta riippumatonta vahvistusta.
- S1:n infolaatikon eri väestösumma ei syrjäytä kontekstia; pinta-alaa ei paineta ilman selkeää alue- ja lähdemääritelmää.
- Kaupungin nykyinen matkailutilanne on rajoitettu: **kaikkea matkustamista vältetään** (O2 14.9.2026). Historia- ja kulttuurilehti ei ole matkakutsu.

## 2. Kansi — johdanto ja neljä uutta aihetta

Johdantoehdotus: Mogadishun kulttuuria voi lukea rannasta, kaupoista ja tallennetuista äänistä. Vanha keskusta on osa asukkaiden elävää kaupunkia; sen historia ei lopu siirtomaarakennuksiin tai matkailijan näkymään.

### K1 — Ranta, jonka nimi on Liido

Wiki **Lido Beach, Mogadishu**, johdanto/History/Present.

1. Liido/Lido on Mogadishun kaupunkiranta (S8).
2. Se sijaitsee kaupungin pohjoisemmalla rannikolla, vanhan ydinkeskustan suunnasta erillisenä rantapaikkana (S8).
3. Nimi tulee italian *lido*-sanasta, joka tarkoittaa rantaa; paikallisessa käytössä kirjoitusasu **Liido** (S8).
4. Nykyinen nimetty ranta- ja palvelualue kehittyi siirtomaakaudella; tarkkaa avaamisvuotta ei paineta yhdellä tukiketjulla (S8).
5. Luonnon hiekkaranta on erotettava sen ääreen rakennetuista hotelleista/ravintoloista (S8/Present). Rakennuksen kuva ei yksin ole suojavapaa luonnonrantakuva.
6. Paikka on kaupungin arkinen rannikkoympäristö; ei luvata uimisen turvallisuutta, auki olevaa ravintolaa tai mahdollisuutta päästä paikalle nyt (O2).

Kuva oikeasta rannasta ilman luettavia kasvoja; nimeä ei päätellä vain Mogadishu-yleiskuvasta. Ei nykyväkivallan tarinaa eikä rannikon kilometrisuperlatiivia.

### K2 — Ompelija kauppiaana — lähdevaihtoehto

Taustawiki **Mogadishu**; henkilökohtaiset faktat ovat **P10**, eivät Wikipediassa. Niitä ei naamioida WP-faktoiksi. C voi käyttää vain lyhyttä omin sanoin tehtyä faktaselitystä tai korvata tämän aiheen, jos Wikipedia-ensisijaisuus tulkitaan vain-WP-vaatimukseksi.

1. CISP:n julkaisuun haastateltu **Dahabo** asui Hamar Weynessä julkaisuhetken kuvauksen mukaan.
2. Hän myi naisten vaatteita.
3. Hän oppi kaupankäyntiä auttamalla äitinsä pientä kauppaa.
4. Työhön kuului tavaran ostamista myytäväksi sekä arkisten kahvin ja suolan myyntiä.
5. Hänellä oli myöhemmin oma liike; tarkat aloitusikä- ja vuosiluvut jätetään pois yhden haastattelun tuella.
6. Hän kertoi myös ompelevansa vaatteita ja lakanoita.

Kyse on **yhdestä todellisesta haastattelusta**, ei kaikkien mogadishulaisten naisten elämäntavasta eikä nykyisen liikkeen osoitteesta. Sodan/debttien yksityiskohdat, perhetragedia, politiikka, tekijän suorat sitaatit ja kirjan valokuva pois. Kuvan mahdollinen ompelukone on yleinen työn havainne eikä siinä väitetä esiintyvän Dahabo.

### K3 — Ääni ei säily itsestään

Wiki **Radio Mogadishu**, History; P1/P2/P11.

1. Radio Mogadishun arkisto on kaupungissa (S11).
2. Tallenteita on magneettinauhakeloilla (S11/P1).
3. Aineisto sisältää musiikin lisäksi radioteatteria, kirjallisuutta ja urheilutapahtumia (P1).
4. Nauhoja uhkaavat ikääntyminen ja kosteus (P1); ei määrällistä ilmastoväitettä.
5. Säilyttämistyöhön kuuluvat puhdistus, kunnon arviointi ja digitointi (P1).
6. Digitoiminen mahdollistaa vanhojen äänten säilyttämisen ja myöhemmän kuuntelun (P1). Ei väitetä koko arkiston olevan jo valmis tai vapaasti verkossa.
7. Asema syntyi 1900-luvun puolivälissä (S11/P11); tarkka vuosiluku voidaan tarkistaa D:ssä, mutta tämän noston ydin ei ole vuosiluku.

Ei poliittisten puheiden sisältöä, nykyhallituksen viestintää tai maalehden balwo-/luuttutarinaa. Kuva keloista tai digitointilaitteesta, ei tunnistettavan toimittajan muotokuvasta tai suojatun levynkannen lähikuvasta.

### K4 — Kalatorin tärkeä osa ei ole vain kala

Taustawiki **Mogadishu**, Markets; tarkat paikalliset toimintafaktat **P3, FAO**, ei väitettä main-articleen sisältymisestä.

1. FAO nimeää **Liido Fish Marketin** Mogadishun kalan rantautumispaikaksi.
2. Torin kehittämisessä käsittely ja hygienia ovat olennaisia.
3. Säilytyksen ja jäähdytyksen parannukset ovat hankkeen osa.
4. Torilla kalan pesu ja alueen puhdistus tuottavat jätevettä.
5. Vedenpoiston järjestäminen on siksi suunnittelun osa; tämä syy-yhteys on FAO:n tekstissä.
6. Hanke on kunnostusta ja laajentamista koskeva **suunnitelma**, ei todiste siitä, että kaikki kylmätilat on jo rakennettu.

Ei tonni-/euro-/työpaikkalukuja, kansallisen rantaviivan superlatiivia, ulkopolitiikkaa tai laitonta kalastusta kertomukseksi. Kuva kalaan/käsittelyyn liittyvästä tavallisesta toiminnasta, oikea toripaikka tarvitaan tarkkaan Liido-kuvatekstiin. Uuden suunnitellun torirakennuksen kuva ei saa historiallista tai suojavapaan rakennuksen statusta tämän avulla.

## 3. Teemasivu — historia, Rakennus vaihtaa tehtävää

Vakioaihe `historia`. Johdantoehdotus: Mogadishun rakennetut kerrokset eivät ole saman ajan tuotteita. Hallintopalatsista tuli museo, majakan raunioista tutkimuskohde, ja vanha rata jäi historialliseksi yhteydeksi.

### H1 — Garesa ei ole sama kuin uusi museo

Wiki **National Museum of Somalia**, History/Garesa/New building; P7/P8.

1. Ensimmäinen museo sijoitettiin **Garesaan**, aiempaan hallitsijan edustajan asuinrakennukseen (S5/P8).
2. Tämä vanha Garesa oli eri rakennus kuin myöhempi kansallismuseo (S5/P8).
3. Museo perustettiin siirtomaakaudella 1900-luvun alkupuolella; 1933/1934-vaihe eroaa lähteissä.
4. Kokoelma siirrettiin uudempaan museorakennukseen 1900-luvun lopulla (S5/P8).
5. Myöhemmin instituutio avattiin uudelleen kunnostusten jälkeen (P7/P8); tämä ei todista kaikkien vanhojen kokoelmien säilyneen.
6. Museon esineryhmiin kuuluvat esimerkiksi vanhat kolikot ja keramiikka (P8).
7. Pelkkä kuva nykyisen museon pihasta ei ole kuva vanhan Garesan sisäpihasta, eikä kolikon näyttelykuva todista sen löytöpaikkaa (S5/P8:n rakennusero).

Ei nykyhallinnon inaugurointitarinaa, aseiden kuvastoa, nykytaiteen teoksia tai kokoelman tarkkaa lukumäärää. Museon nykyisen rakennuksen tekijänoikeudet ja Garesan oikea paikkapiste ovat avoimia.

### H2 — Sortunut majakka ensin tutkitaan

Wiki **Mogadishu Lighthouse**; **P4/P5** ensisijaisina kunnon ja säilyttämisen lähteinä.

1. Al-Munaara / Lido Secondo on vanhan rannikkokaupungin majakkakohde (S7/P4).
2. Sen tehtävänä oli meriliikenteen opastaminen (P4/P6); ei väitetä nykyistä valotunnusta tai toimivaa majakkaa.
3. Rakennus on nykyisin osittain sortunut (P4/P5).
4. Rakenteen kuntoa tutkivat rakennesuunnittelijat, säilyttämisarkkitehdit ja somalialaiset perintöalan ammattilaiset (P4).
5. Työn alkuun kuuluvat dokumentointi ja hätätilanteen tuentatoimet (P4).
6. Tutkimus tähtää suojelun ja mahdollisen myöhemmän restauroinnin suunnitelmaan, **ei osoita valmiiksi kunnostettua rakennusta** (P4/P5).
7. Vanha keskusta on laajempi kokonaisuus, johon kuuluu historiallisia moskeijoita ja markkinapaikkoja (P4).

Ei sankari-/raunioparatiisitarinaa. Nykytila on sanottava rehellisesti. Tarkka rakennusvuosi ja tekijä eivät ratkenneet; vanha ehjä valokuva ei ole nykytilan opaskuva.

### H3 — Rata, jota nykykartta ei lupaa

Wiki **Mogadishu–Villabruzzi Railway**, History/Statistics/Railway stations; S16 satamayhteydestä.

1. Historiallinen rata lähti Mogadishusta Afgooyen kautta sisämaahan (S10).
2. Päätepiste Villabruzzi on nykyinen **Jowhar** (S10).
3. Rata rakennettiin 1900-luvun alkupuolella; se ei ollut vuoden 1873 kulkureitti.
4. Rata kuljetti matkustajia ja maataloustuotteita (S10), ei pelkkiä turisteja.
5. Satamayhteys palveli tavaroiden vientiä (S10/S16).
6. Linja purettiin toisen maailmansodan aikana (S10); ei sotakertomusta osapuolten näkökulmasta.
7. Nykyistä Mogadishu–Jowhar-matkustajajunaa ei luvata. Arkistokuva Eritrean samantyyppisestä veturista ei ole kuva Somaliassa kulkeneesta junasta (S10 kuvatekstit).

Tarkat raideleveys-, pituus-, vuosi-, matkustaja-/tonnimäärä- ja nopeusluvut jätetään pois tässä paketissa; artikkelissa on sisäinen virhe ”after World War I in 1914” sekä 1927/1928-päätepiste-ero.

### H4 — Sisilialainen esikuva Intian valtamerellä

Wiki **Mogadishu Cathedral**, History; S12 tekijästä, P9 kuolinvuodesta.

1. Katedraalin alkuperäisen suunnittelun tekijä oli **Antonio Vandone** (S6/S12).
2. Esikuvana oli Cefalùn katedraali Sisiliassa (S6).
3. Rakennus on 1900-luvun alkupuolen siirtomaakauden rakennus, ei keskiaikainen kirkko Mogadishussa (S6).
4. Alkuperäisessä julkisivussa oli tornit molemmilla sivuilla (S6); ei tarkkaa korkeutta yhdestä ketjusta.
5. Pohjamuoto oli latinalainen risti, sisätilassa laivoja erottavat pilarit ja teräväkaaret (S6).
6. Nykyinen katedraali on raunioitunut (S6); ei toimintaa/korjausten valmistumista lupaavaa väitettä.
7. Vandone kuoli **1937**, S12, WD Q2857486 ja Italian alkuperäinen tekijäluettelo P9. Tästä seuraa alkuperäisen tekijän yli 70 vuoden kuolinaika, ei myöhempien muutosten automaattista vapautta.

Ei siirtomaavallan ”rauhallisen valloituksen” propagandaa, viimeisen piispan väkivaltatarinaa tai nykyisiä hyökkääjiä nostoon. S6 kertoo arkkitehtuurin kolonialistisen tarkoituksen, joten rakennusta ei kuvata kulttuurien ongelmattomana sovun symbolina. C käyttää historiaa neutraalisti.

### Minitehtävä

H3: **millä nykyisellä nimellä Villabruzzi tunnetaan?** Vastaus Jowhar. Tässä ei käytetä vuotta/pituutta eikä samaa aihetta alla olevassa visassa. Vastauksen pitää olla H3:ssa.

## 4. Nykyopas — viisi jaksoa, ei matkakutsua

### O1 — Nykyiset rajoitukset ensin

O2:n 14.9.2026 ohje on **Vältä kaikkea matkustamista**. Pelaajatekstiin lyhyesti: ”Mogadishuun matkustaminen ei ole tällä hetkellä turvallista, ja matkustamista tulee välttää.” Maassa suomalaisille ei voida tarjota tavallista konsulisuojaa (O2). Opas ei lupaa rannalla kävelyä, yleisöpääsyä museoon, turvallista taksia tai johdettua omatoimista päiväreittiä.

### O2 — Vanha kaupunki kuvina ja aineistona

Historialliset alueet Hamar Weyne ja Shangani voi selittää S14/S15/P4:n avulla. S6/S7/P4 osoittavat useiden rakennusten nykyisen vaurioituneen/sortuneen tilan. Tuoreet kuvat erotetaan arkistokuvista; vanhaa ehjää rakennusta ei näytetä nykytilana. Ei omatoimista käyntiä raunioissa eikä moskeijan sisäänpääsylupausta.

### O3 — Radio ja museo

P1:n radioarkistoa ja P7/P8:n museokokoelmia voi käsitellä tapoina tutustua kaupungin historiaan. Digitointityö on kesken eikä koko aineiston avointa verkkokäyttöä tai julkista arkistovierailua ole todistettu. Kansallismuseon viimeisin tässä luettu alkuperäinen palvelutilanteen kuvaus on vuodelta 2020, joten päivittäistä nykyistä sisäänpääsyä ei luvata.

### O4 — Rannikko ja käytännön huolto

Liido on rannikkoa ja kalatalouden ympäristöä (S8/P3), ei nykyinen turvallinen uimasuositus. O2 kertoo liikenne- ja terveyspalvelujen rajallisuudesta; O1:n vuoden 2026 sivu ei kumoa matkustusvaroitusta. Ei rannikkoreittiä, veneen käyttöä tai uimista matkailijan tehtäväksi. **Sää null**, ei lämpö- tai sademäärälukuja, vuoden parasta matkakuukautta eikä yksittäisestä säätaulukosta johdettua ilmastoluonnehdintaa.

### O5 — Lentoasema ja asiakirjat

Nykyinen kaupungin lentoaseman nimi on **Aden Adde International Airport, MGQ** (S13/O1). Se erotetaan hankkeena mainitusta New Mogadishu International Airportista; S13:n infolaatikko palvelee Mogadishua. Ei tämän päivän lentoyhtiö-/lähtölistaa, turvallisuutta takaavaa lentokenttäkuljetusta tai viisumiehtoa. O2: maahantulosäännöt voivat muuttua nopeasti ja ne tarkistetaan kohdemaan viranomaisilta; jos pakollinen matka on tarpeen, vakuutuksen on katettava lentoevakuointi, tavallinen matkailureitti ei riitä.

**Parasta 5 -aihevara, historiaan tutustumista:** vanha rannikkokaupunki; radion ääniperintö; Garesan/museon eri vaiheet; katedraalin ja Cefalùn arkkitehtuurivertailu; historiallinen rata sisämaahan. Tätä ei otsikoida viideksi turvalliseksi nykyvierailuksi.

**Hyvä tietää 4:** matkustamista vältetään; nyky- ja arkistokuva erotettava; palveluiden ajantasaisuutta ei oleteta; Garesa ei ole sama kuin uusi kansallismuseo. Oppaan kolme tuoretta kuvaa voivat olla luontoa, tavallista arkistotekniikkaa ja muuta sallittua kohdetta; ei historiallista kuvaa nykyoppaaseen tai tunnistettavia kasvoja.

## 5. Kartta — kuusi koordinaattiehdokasta, portit avoinna

Historiallinen ydin on Hamar Weyne/Shangani ja niiden lähirannikko. Liido on **ytimen pohjoisempi lähiranta**, Ansaloti taas Hamar Jajab -suunta: ne eivät saa levittää karttaa koko Banaadiriksi. Lopullista `rajat`-suorakulmiota ei aseteta ennen museon/majakan identiteettiratkaisua ja vähimmäiskohteiden hyväksyntää. Kaikille pisteille ei ole metrin tarkkuutta, vaikka luvut kirjoitetaan viidellä desimaalilla.

### N1 — Arba'a Rukun -moskeija — rakennus, myöhemmät osat B:lle

Piste **2.03510, 45.34250**, WD Q15186773 P625; oma WP S4 **2.03500, 45.34250** lähes sama, ei keskiarvoa. Kohde on Shanganin keskiaikaisessa kaupunginosassa (S4).

Faktat (S4): (1) toinen nimi Arba Rucun; (2) muslimien rukouspaikka; (3) lähde luokittelee sen aktiiviseksi moskeijaksi; (4) alkuperäinen rakennus keskiajalta; (5) perustajaksi nimetään Khusra ibn Mubarak al-Shirazi; (6) mihrabin piirtokirjoitus nimeää perustajan; (7) omaa vuoden 1873 rakennustilaa ei kuvata tarkemmin; alkuperäinen moskeija oli silloin jo vanha. Ei 1268/1269/1260-lukua uutena tarkkana rakennusvuotena. Kupolien/minareettien lukua ei paineta ilman kuvan ja alkuperäisen kohteen tarkistusta.

Alkuperäinen keskiaikainen osa ei ole lähivuosikymmeninä kuolleen tekijän uusi teos, mutta nykyisten lisäysten, korjausten ja sisätilan teosten vapautta **ei oleteta**. B tarkistaa kuvan ja D alkuperäislähteen. Fakhr al-Dinin jo käytössä olevaa marmorikupolitarinaa ei lainata tämän moskeijan jutuksi.

### N2 — Mogadishun katedraalin rauniot — rakennus

Piste **2.03574, 45.34161**, WD Q962672; oma S6:n WP-piste **2.03583, 45.34167**, pieni lähde-ero kirjattu.

Faktat S6/S12/P9: (1) katolinen katedraalirakennus; (2) alkuperäisen suunnittelija Vandone; (3) esikuva Cefalù Sisiliassa; (4) normannivaikutteinen historiallistyyli; (5) alkuperäinen pohja latinalainen risti; (6) alkuperäisessä julkisivussa sivutornit; (7) nykyisin rauniokohde; (8) rakennusta ei ollut vuonna 1873, se syntyi 1900-luvun alkupuolella. Tarkat tornikorkeudet ja valmistumisvuodet eivät siirry ilman toista itsenäistä rakennuslähdettä.

Tekijäketjun vanha osa: Vandone **1937**, S12 + WD + alkuperäinen P9. Ei elävien tekijöiden uusia taideteoksia, myöhempiä kunnostuksia tai kuvan luvattomia tunnistettavia henkilöitä hyväksytyksi tämän perusteella. Nykyinen raunio ei ole avoin matkailun sisäänpääsy.

### N3 — Al-Munaara / Mogadishun majakka — rakennus, sijainti- ja tekijäehto

Oma S7:n WP-piste **2.03231, 45.34531**. Sama yksi WD Q135438856:n normal-arvo; toinen yhtä lailla normal-arvo **2.03869, 45.33331** on eri paikka. UNESCO:n aieluettelon piste **2.03433, 45.34411** eroaa molemmista; O1:n piste on jälleen hieman eri. **Ei lopullista pistettä ilman kohteen identiteetin varmistusta**.

Todetut faktat P4/P5/P6: (1) rannikon merimerkki vanhan satamakaupungin yhteydessä; (2) Intian valtameren rannalla; (3) navigoinnin historiallinen tehtävä; (4) osittain sortunut rakenne; (5) rakenteiden arviointi; (6) suunniteltu tuenta ja dokumentointi; (7) paikalliset perintöammattilaiset mukana; (8) ei toimivaksi palautetun majakan näyttöä. Ei nykyistä valotunnusta tai laivojen teknistä turvallisuustakuuta. Vuonna 1873 nykyistä siirtomaakauden majakkaa ei vielä ollut.

**Avoin:** S7:n 1938 vs P6:n ”early 1900s” vs WD:n 1903; P6:n sylinteri/betoni tai kivi -yleiskuva ei todista S7:n yksityiskohtaista kartio-/kahdeksankulmaista muotoa. Alkuperäisen suunnittelijan kuolinvuosi puuttuu. Kyseinen rakenne voi olla toiminnallinen merimerkki, mutta arkaluonteista rakennusteoksen tekijäketjua ei ratkaista sanomalla kaikki majakat vapaiksi. B/D selvittää; kohde vielä ehdollinen.

### N4 — Liidon ranta — luonto

Piste **2.03975, 45.36372**, WD Q25108684. Oman S8:n WP-piste **2.04028, 45.36361** kuvaa saman pidemmän rannan hieman eri kohtaa; ei keskiarvoa eikä rantakuvan GPS:stä laskettua sisäänkäyntiä.

Faktat S8: (1) Mogadishun rannikkopaikka; (2) nimi Lido, paikallisesti Liido; (3) Italian ranta-sana nimessä; (4) luonnon hiekkarantaa; (5) pohjoisempi ranta vanhaan ytimeen verrattuna; (6) rannalla on myöhempiä ravintola-/hotellipalveluja, mutta ne eivät ole luonnonkohteen tekijänoikeuspoikkeus; (7) nimetty nykyinen palveluranta kehittyi 1900-luvulla, eikä nykyisiä palveluita ollut vuoden 1873 rannalla.

Luonnonranta voidaan pitää ehdokkaana nykykartalla modernien palveluiden iästä riippumatta. Ei turvallisen uimisen/pääsyn lupausta eikä teoskuvia/hotellin pääaihetta luonnon nimellä. Rannan 1873-kaaresta, leveydestä, kasvillisuudesta tai nimestä ei keksitä yksityiskohtia.

### N5 — Ansalotin tori — toiminnallinen rakennus/toripaikka, tietopohja vajaa

Oma WP S9 ja WD Q18205267 **2.04900, 45.32000**. WD:n mittatarkkuus on väljä; ei pistettä ”tarkin mahdollinen”. Tekstilähde sijoittaa paikan Hamar Jajabiin. Kohteen tarkan paikan ja kartan ydinrajauksen suhde vaatii vielä varmistuksen; Bakaara on eri tori, joten samankaltaisen pisteen/kuvan perusteella ei vaihdeta nimeä.

Todetut faktat S9: (1) julkinen tori Mogadishussa; (2) paikallinen nimi Suuqa Ansalooti; (3) tekstin mukaan Hamar Jajabin alueella; (4) toiminta keskeytyi 1900-luvun lopulla; (5) kunnostuksia ja uudelleenavaus 2010-luvulla; (6) tekstin väite oli tuon ajankohdan tilanne, ei tämän päivän palvelutakuu. Historiallinen perustamisaika ja vuoden 1873 rakennus/toritilanne puuttuvat.

**Avoin:** 6–10 riittävää paikkafaktaa ja vanhan ytimen yhteys eivät sulkeudu näin suppealla yhdellä uutislähdeketjulla. Tavallinen markkinapaikka ei automaattisesti ole suojattu taideteos, mutta uuden suunnitellun rakennuksen kuvaa ei hyväksytä tekijäketjua ohittaen. Ei valmiiksi hyväksytty N-kohde.

### N6 — Vanha Garesa — rakennus, oma koordinaatti puuttuu

S5/P8 erottavat vanhan Garesan ja uuden kansallismuseon. **S5:n infolaatikon 2.04300, 45.33717 ja WD-museon 2.03750, 45.33810 eivät ilman kohdeidentiteetin todistusta kelpaa vanhan Garesan omaksi pisteeksi.** Oma vanhan rakennuksen it/fr-WP-artikkeliyritykset 404; museoentiteettiä ei käytetä automaattisesti palatsin sijaintina.

Faktat S5/P8: (1) vanha hallitsijan edustajan asuinrakennus; (2) museo toimi siinä siirtomaakaudella; (3) myöhemmin kansallismuseo; (4) kokoelma siirtyi suurempaan uuteen rakennukseen; (5) vanha rakennus tunnettiin Garesa-museona; (6) nykyiset kansallismuseon kuvat voivat kuvata uudempaa rakennusta; (7) museoinstituution kokoelmiin kolikot/keramiikka, mutta niitä ei varmuudella nimetä vanhassa Garesassa nykyisin nähtäviksi.

**Avoin:** S1:n 1870 ja S5:n 1872 ero; suunnittelija/alkuperäiset nykyisin säilyneet osat; museon vuoden 1930-luvun muutosten ja uudempien korjausten oikeudet; oma piste. Ei varmaa nykytilaa vuonna 1873. **Ei vielä karttaan.**

### Lisäehdokkaiden rajattu tarkistus

- **Jama'a/Jameecada/Xamar Weyne -moskeija:** P4 vahvistaa nimeltä tutkimuskäynnin kohteen, mutta omat en/so-sivuyritykset palauttivat 404. Ei omaa P625:tä ja 6–10 luettua kohdefaktaa; Fakhrin pistettä ei lainata.
- **Sheikh Sufin moskeija/mausoleumi:** S18 henkilön artikkeli kertoo mausoleumista ja moskeijasta, mutta oma en/so-moskeijasivu 404; kohdepiste puuttuu. Sufin kuolinvuosi ei ratkaise rakennuksen tekijää. Henkilön runous ei toista maalehden runosivua tässä.
- **Abdul Aziz -moskeija/Almnara-torni:** maininta S1/S17:ssa, oma en-artikkeli ei löytynyt. O1:n medieval tower -piste ei kelpaa WP/WD-pisteeksi. Ei samasteta tätä rakennusta automaattisesti nykyiseen Lido Secondo -majakkaan.
- **Fakhr al-Din:** oma WP-piste 2.03361, 45.33583 löytyy, mutta täydellinen paikkatarina on jo pelin Hamar Weyne -fokuksessa; **ei sisälly tämän uuden kartan määrätäytteeseen ilman Päätoimittajan selkeää integraatioratkaisua**.
- **Port of Mogadishu:** oma WP-piste 2.01700, 45.31700 koskee nykyistä virallista satamaa, ei majakan vieressä ollutta vanhaa purkauspaikkaa tai tiettyä rakennusta. Ei koko sataman muuttamista luontokohteeksi tai vanhan laiturin pisteeksi.
- **Peace Park ja uudet moskeijat/teatteri:** ajantasaisia toiminnallisia tai kulttuuripaikkoja saa käsitellä lähteiden rajoissa, mutta niiden yksittäisten rakennusteosten tekijäketjua ei tässä ratkaistu. Modernius yksin ei kiellä luontoa tai tavallista toimintopaikkaa; karttakohteen oikeus- ja paikkaporttia ei silti ohiteta.

## 6. Viisi kysymysaihetta ja kolme tietoa

1. **Taso 1:** minkä valtameren rannalla Mogadishu sijaitsee? Intian valtameri (S1/S8). Ei vaihtoehdoiksi muita pelikaupunkeja.
2. **Taso 1–2:** millaiselle tallennusvälineelle radioarkiston ääniä säilytettiin? Magneettinauhalle (S11/P1). Kuva ei saa sisältää vastausta kirjoitettuna.
3. **Taso 2:** mihin italialaiseen kaupunkiin katedraalin esikuva liittyy? Cefalù (S6); minitehtävässä ei samaa.
4. **Taso 2–3:** mitä eroa on Garesalla ja myöhemmällä kansallismuseorakennuksella? Ne ovat eri rakennuksia; kokoelmaa siirrettiin (S5/P8).
5. **Taso 3:** miksi kalatorin vedenpoisto on tarpeen? Kalan käsittelyssä/pesussa syntyvien vesien johtamiseksi (P3), ei abstraktia ilmastoselitystä.

C tekee neljä uskottavaa vaihtoehtoa, ei vastausta ainoaksi pitkäksi. Vihje ei mainitse ratkaisun sanaa. Dahabon haastattelun yksityiskohtia ei kysytä tenttinä yhdestä ihmisestä.

Tietojen aiheita:

- Radioarkiston digitoinnissa arvioidaan ja puhdistetaan keloja ennen säilyttämistä; koko aineisto ei ole vielä valmis verkkokirjasto (P1).
- Katedraalin esikuva on Sisiliassa, mutta rakennus itse on Mogadishun 1900-luvun kerrostumaa (S6).
- Museon nimi ja kokoelma voivat jatkua, vaikka rakennus vaihtuu; Garesa ja uudempi museorakennus ovat eri paikkoja (S5/P8).

## 7. Kuvatarpeet, ei valintoja

Vain Commons, todellinen alkuperäinen tekijä/lisenssi, PD/CC0/CC BY/CC BY-SA, leveys vähintään 1 200 px. Luettavat kasvot, lisätyt leimat/signeeraukset/kehykset, mainos/pakkauskuvat hylätään. B/C/D katsovat jokaisen kuvan. Sama tiedosto kerran kaupungissa. Suojattu uuden tekijän rakennus/teos ei vapaudu vain kuvaajan CC-lisenssillä.

| Kohta | Aihe/hakusanat | Raja |
|---|---|---|
| Kansi 1 | Mogadishu coastline panorama | laaja kaupunki/ranta; oikea paikantaminen, ei puhumista uudesta hotellista suojavapaana |
| Kansi 2 | Shangani/Hamar Weyne wide streets | laaja yleiskuva, ei Fakhrin vanhaa jo käytettyä kupolikuvaa |
| Kansi 3 | Mogadishu coastal old harbour | vanha satama erotettava virallisesta uudesta satamasta |
| K1 | Liido beach sand sea | oikea ranta, ilman luettavia kasvoja; nykytilan kuva ei matkailusuositus |
| K2 | sewing machine cloth work | yleinen havainne ei Dahabon muotokuva/oma kone ilman todistetta; P10:n kuva ei kelpaa lisenssillä |
| K3 | Radio Mogadishu archive reels digitisation | nauhat/laite, ei toimittajan kasvot eikä suojattu levynkansi pääkohteena |
| K4 | Mogadishu fish market fish ice drainage | paikan tunnistus; ei mainos, pakkaukset tai luettavat kasvot |
| H1 | old Garesa museum building/courtyard | vanha rakennus tunnistettava, ei uuden museon pihaa Garesaksi |
| H2 | Mogadishu Al-Munaara lighthouse ruined | kuvausvuosi ja kunto sanottava; modernien kunnostusosien oikeudet avoinna |
| H3 | historical Mogadishu railway/carriages | ei Eritrean esimerkkiveturi Somaliassa kuvattuna, tekninen havainne nimettävä |
| H4 | cathedral ruins/original pre-ruin view | Vandone alkuperäinen runko, nyky- ja historiallinen tila erotettava |
| Matkailijalle | tuore maltillinen pysty, rannikon luonnonaihe | 0,60–0,85; ei ääripitkää raunio-/tornikuvaa, kasvoja tai suojattua teosta |
| Opas 3–5 kuvaa | tuore luonto, arkistolaitteisto, soveltuva tavallinen toiminto | enintään kaksi kuvatonta jaksoa; historialliset kuvat nostoon |
| Kohteet | vasta hyväksytyt N-kohteet, oma kuva kullekin | ei kuvasta keksittyä karttakoordinaattia; yksi kuva ei toistu nostossa ja N-jutussa ilman hyväksyttyä poikkeusta |
| Valokuva | historiallinen Mogadishu-kuva tai sallittu nykykuva | kuva vastaa kohdetta/aikaa; ei vanha yleiskuva vuonna 1873 ilman todistetta |
| Ennen–nyt | mahdollinen todellinen 1870-luvun PD-vedos | vain alkuperäislähteessä ajoitettu ≥1 200 px; 1920-luvun postikortti ei isoisän ajan kuva |

## 8. Ristiriidat ja sulkemista odottavat asiat

1. **Nykyinen matkustus:** O1 sisältää houkuttelevia rantaa/hotelleja koskevia palvelukuvauksia, O2 14.9.2026 **Vältä kaikkea matkustamista**. Virallinen nykyohje määrää oppaan sävyn; ei turvallisia reittejä tai rantaelämystä lupauksena.
2. **Sää:** alkuperäinen poiminta hylättiin puuttuvan normaalikauden vuoksi. `saa.json` puuttuu, **saatiedot null**. Ei käsin korjattua taulukkoa, ERA5-ruutua tai O1:n ilmastokaavion lukuja.
3. **Garesa:** S1 fort 1870, S5 old building 1872; varmuudella vain 1800-luvun jälkipuolisko, tarkka vuoden 1873 rakennustila avoin. Vanha Garesa ja uudempi museorakennus eivät ole sama kohde (P8). WP/WD-museopisteitä ei hiljaa jaeta kumpaankin.
4. **Museoinstituution alku:** S5/P7 1933 vs P8 1934; perustaminen, rakentaminen ja yleisölle avaaminen voivat olla eri tapahtumia. Julkaistava **1930-luvulla**, ei hiljaista yhden vuosiluvun valintaa. Uudelleenavaus heinäkuussa 2020 saa kaksi erillistä alkuperäistä UN-julkaisua P7/P8, mutta tarkkaa päivää ei tarvita nostoon.
5. **Majakka:** WP 1938, aieluettelo early 1900s, WD P571 1903; **1900-luvun alkupuoli/siirtomaakausi**. WP:n epäillyn tekoälytekstin luokka lisää tarvetta käyttää P4/P5:tä kunnon/säilyttämisen lähteenä. Ei muoto-/materiaali-/rakennusvuoden yksityiskohtia vain ristiriitaisesta artikkelista.
6. **Majakan piste:** WD kaksi normal-arvoa, toinen oman WP:n kanssa sama, toinen noin eri kaupunkipaikka; aieluettelossa vielä eri piste. Koordinaatti ja fyysinen kohde on varmennettava ennen N3:n sulkemista, ei keskiarvoa tai vähimmäisluvun kannalta sopivan pisteen valintaa.
7. **Arba'a Rukun:** WP 1268/1269 vs WD 1260. **1200-luku**, ei täsmävuotta. Perustajanimen kaksi muotoa kirjataan, ei virheellisesti lainata Fakhrin perustajaa/mihrabia tähän.
8. **Fakhr:** O1 väittää rakennusvuodeksi 969, S3 sanoo 1269; lähinosto jo käyttää S3:n laajaa geometria-/marmoritarinaa. Ei kummankaan vuoden uusi nosto, eikä O1:n ruiniokohdetta varmana aktiivitilana.
9. **Katedraali:** WP rakennekausi 1923–1928, fr-WP teos 1925–1928; **1920-luvulla**. Suunnittelija ja kuolema 1937 saavat S12+WD+P9:n tuen. Tekijäluettelo ei todista kaikkia nykyisiä rakennus- ja koristelisäyksiä.
10. **Rata:** S10 ”after World War I in 1914” sisäisesti mahdoton, päätepiste 1927/1928; ei näitä vuosia. Radan palveluluvut ja nopeudet yksiketjuisia, pois. 1873-ankkuri: ei tätä 1900-luvun rataa.
11. **Liido:** WP/WD eri rannan pisteet; valitaan vasta paikkaroolin tarkistuksessa toinen oma lähdepiste, ei arvioitua sisäänkäyntiä. ”Lido Secondo Lighthouse” ei tarkoita automaattisesti, että nykyisen Liido-rannan jokainen kuva olisi majakkakuva.
12. **Ansaloti:** hyvin suppea uutislähdeketju, vanha palvelutilanne, väljä WD-tarkkuus, paikan historian/tyypin/ydinrajauksen aukot. Ei Bakaaraa Ansalotin tilalle eikä pikkupääkaupunki-poikkeusta suurkaupungille.
13. **Kalatori:** P3 Liido Fish Marketin kunnostuksen suunnittelu ei ole valmiin rakennuksen todistus eikä O1:n nimeämättömän Mogadishu Fish Market -kuvan identiteetti. Yleisluontoinen kuva merkitään yleiseksi, ei tietyn nykyisen torin kuva.
14. **Kirjan K2:** oikea henkilöhaastattelu vuodelta 2017, ei nykyhetken väestötilasto tai WP-kappale. Ei suoraa lainausta, nimeämätöntä keksittyä kauppiasta, kuvasiirtoa tai nykyistä osoitetta. Jos C:n ohje tulkitaan vain-WP-faktoiksi, tämä on vaihdettava ja kirjattava.

## 9. Poisjätöt ja jatkotoimet

- Nykyisten taisteluiden, terrorismin, klaanikiistojen, ase-/väärennöskaupan, hallituksen ja poliitikkojen tarinat pois. Virallinen matkustamisen rajoitus pysyy lyhyesti oppaassa.
- Maalehden kaikki 20 nostoaihetta sekä Hamar Weyne/Fakhr-kohteen valmis marmorikupolitarina pois uusista nostoista. Maalehden Mogadishu-kankaan/majoittamisen/Marco Polon/Sofalan/Kiina-tarinat eivät siirry uuteen tekstiin eri kuvalla.
- Moderni yksittäinen suojattu teos/rakennus ei tule kohteeksi tai kuvaksi pelkän CC-kuvaajaluvan perusteella. Tavallinen luonto/toritoiminto ei silti automaattisesti ole suojattu teos; puuttuva tekijä-/osatieto kirjataan, ei arvata.
- Uudet kansallismuseon/teatterin rakennukset ja korjaukset eivät periytä Garesan vanhaa ikää. Moskeijan rakennuttajan/henkilön kuolinvuosi ei ole kaikkien rakennuksen tekijöiden kuolinvuosi.
- Arkistokelan tai museoesineen kuvalisenssi ei anna lupaa sen sisältämään nykytaiteeseen tai levynkansikuvitukseen; B tarkistaa varsinaisen kuvakohteen.
- Kaksi kaupunginosa-artikkelia eivät ole kaksi rakennus/aukio/luontokohdetta. Satama-alueen yleispiste ei ole vanhan laiturin/majakan/kalatorin lainattava piste.
- Lentoaseman MGQ on nykyinen nimetty kenttä, mutta lennot ja turvapalvelut eivät ole varmistettu saatavuus. Ei hintoja, aukioloaikoja tai lipunmyyntilupauksia.

**A partial -portit:** riittävä historiallista ydintä kuvaava 6–8 hyväksytyn paikan joukko; Garesan oma paikka/nykyinen rakennus erotettuna; majakan sijainti ja tekijäketju; Ansalotin kohdefaktat ja historiallinen rajaus; nykyisten rakennusosien oikeustarkistus. Sää saa jäädä nulliksi. Hyödyllinen lähdepaketti voidaan antaa B/C-valmisteluun, mutta sitä ei lasketa valmiiksi A-vaiheeksi.
