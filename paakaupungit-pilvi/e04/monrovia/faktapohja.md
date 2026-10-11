# Monrovia — faktapohja, vaihe A

Kirjoitusalue: vain tämä kaupungin faktapohja. Kaupunkitunnus `monrovia`, maa LBR, erä e04. Työaineisto NASilla `valiaikainen/monrovia-A`. Tämä on lähteistetty kirjoitusaineisto, ei valmis lehti eikä B–F-vaiheen hyväksyntä. Sääaineistoa, kontekstia, pelitiedostoja tai muiden kaupunkien aineistoa ei muutettu. Lähteet luettu 11.10.2026.

## 0. Luetut lähteet ja 1873-kehys

Lähdekanavapoikkeus: omistaja hyväksyi robots-sallitut tavalliset lähdesivut estettyjen rajapintareittien sijaan. Poikkeuksen tarkoitus ulottuu alkuperäisen tilauksen Wikipediaan, Wikivoyageen ja Commonsiin; A:ssa ei tehty Commons-hakuja. Wikipedia `/w/`- ja `/api/`-reitit eivät ole käytössä. Wikidata Special:EntityData on sallittu. Jokainen varsinainen haku ja uudelleenohjaus tarkistettiin `sallittu_haku.py`-apurilla. Raakavastaukset NASilla, URL/polku/robots/SHA-jälki `valiaikainen/sallitut-haut.jsonl`-lokissa. Hakuosumat toimivat vain otsikko-/Q-tunnuspaikantimina; alla käytetty teksti luettiin varsinaisilta sivuilta.

Luettu lisäksi konteksti.json, valmis saa.json sekä e04/kuvaoikeuksien-tulkinta.md. Ohjeiden 0–9-rakenne ja Nairobi-malli koskevat tätä aineistoa. Tarkat historialliset vuodet/lukumäärät vaativat kaksi toisistaan riippumatonta lähdettä. Wikipedia, sen toinen kieliversio ja sama Wikipedian viittaama alkuperäisteksti eivät automaattisesti ole kolme riippumatonta lähdettä. Siksi leipätekstien ehdotuksissa pääosin vuosisadat ja laadulliset tiedot. Koordinaatit sekä työaineiston lähde-/revisio-/normaalikausitunnisteet säilytetään täsmällisinä metadatana.

| Tunnus | Luettu lähde | Käyttö ja rajat |
| --- | --- | --- |
| S1 | [Monrovia, en-Wikipedia](https://en.wikipedia.org/wiki/Monrovia) | Kaupungin pääartikkeli: niemimaa, Mesurado, Bushrod, Broad Street, Waterside, alueet, historia, kulttuuri, liikenne. Väestön otsikointi virheellinen suhteessa kontekstin aluejakoon; ilmastoleipäteksti ei numeroiden lähde. |
| S2 | [Timeline of Monrovia](https://en.wikipedia.org/wiki/Timeline_of_Monrovia) | Aikajana: oikeustalo, kirkko, college, valokuvaus, lehdet, satama. Lähdeluettelo luettu; museon perustaminen ja yliopiston avaamisvaiheet eivät kaikilta osin samat kuin omissa artikkeleissa. |
| S3 | [Liberian National Museum](https://en.wikipedia.org/wiki/Liberian_National_Museum) | Museon tehtävä, paikanvaihdot, vanha Supreme Court -talo ja kokoelmien lajit. Esineiden ikä/lukumäärä, näyttelyiden nykytila ja teoskohtaiset oikeudet eivät varmennettuja. |
| S4 | [Providence Baptist Church](https://en.wikipedia.org/wiki/Providence_Baptist_Church) | Vanha 1800-luvun pyhäkkö ja viereinen 1900-luvun modernistinen pyhäkkö ovat eri rakennuksia. Historiallinen asiakirjakäyttö, seurakunnan alku ja vanhan tilan jatkuva käyttö. |
| S5 | [Providence Island, Liberia](https://en.wikipedia.org/wiki/Providence_Island,_Liberia) | Oikea saari; nimivaiheet, historiallinen paikkakäyttö, UNESCO-ehdotus, oma koordinaatti. Ei samanniminen disambiguation-sivu. |
| S6 | [Providence Island, UNESCO Tentative List 6247](https://whc.unesco.org/en/tentativelists/6247/) | Liberian valtion toimittama ehdotus, ei maailmanperintöluettelon hyväksyntä. Saari, vesi, mangrove, kaivo, puu ja myöhemmät rakennelmat. Tekstissä sisäisiä päiväys-/kirjoitusvirheitä; puun tarkkaa ikää, pinta-alaa tai rantautumispäivää ei nosteta leipätekstiin. |
| S7 | [Bushrod Island](https://en.wikipedia.org/wiki/Bushrod_Island) | Saaren ympäröivät vedet, asuinalueet, nykyinen satama, Dei-yhteisöjen vanha käyttö ja nimitausta. Vanhoja väestölukuja ei nykytilaksi. |
| S8 | [West Point, Monrovia](https://en.wikipedia.org/wiki/West_Point,_Monrovia) | Paikallinen niemeke/asuinalue ja kalastukseen liittyvä synty 1900-luvulla, oma koordinaatti. Tarkat vanhat alue-/väestöluvut, sairaus- ja rikostarinat pois. |
| S9 | [Mesurado Wetlands, Ramsar RSIS 1631](https://rsis.ramsar.org/ris/1631) | Mangrove, lintujen ravinnonhaku, rantaviivan vakauttaminen ja sedimentin pidättäminen. Sivun viimeisin RIS-aineisto 2006: lajitiedot ovat dokumentoitua taustaa, eivät lupaus nykyisestä havaintoretkestä tai nykyinen hoitosuunnitelma. |
| S10 | [Liste des sites Ramsar au Liberia, fr-Wikipedia](https://fr.wikipedia.org/wiki/Liste_des_sites_Ramsar_au_Liberia) | Mesurado-rivin oma koordinaatti; aluepiste, ei joen suu eikä vierailun lähtölaituri. Muu kieliversio käytetty dokumentoituna täydentävänä Wiki-kanavana. |
| S11 | [Augustus Washington](https://en.wikipedia.org/wiki/Augustus_Washington) | Monroviassa toimineen daguerreotypistin työ, tilaajat, muotokuvien rakentaminen ja siirtyminen muuhun työhön. Nykyinen politiikka ei aihe. Historiallisia kuvia ei hyväksytä A:ssa. |
| S12 | [Liberia Herald](https://en.wikipedia.org/wiki/Liberia_Herald) | Varhainen sanomalehti, Charles Force, John B. Russwurm ja museossa säilyneet varhaiset toimitustekstit. Perustamiskertomuksen sisäinen ristiriita kirjataan. |
| S13 | [University of Liberia](https://en.wikipedia.org/wiki/University_of_Liberia) | Liberia Collegen 1800-luvun vaihe, lahjoitetut kirjat/rakennusaineet ja opetuksen alat. Vanhaa collegea ei samasteta nykyisiin kampusrakennuksiin. Ei nykyisiä opiskelijalukuja tai hallinnon henkilötietoja. |
| S14 | [Monrovia, Wikivoyage](https://en.wikivoyage.org/wiki/Monrovia) | Opas: kaupunkialueet, torin tavarat, cook shops, liberialainen/lebanonilainen ruoka, lentoasema ja liikkuminen. Ravintola-, hinta-, lentoreitti- ja pääsytiedot osin vanhoja; ei lupauksia vuoden 2026 tarjonnasta. Ilmastoluvut hylätään. |
| S15 | [Cape Mesurado](https://en.wikipedia.org/wiki/Cape_Mesurado) | Niemi ja majakan sijaintitausta. Otsikon ja infolaatikon koordinaatit eri paikkoja; ei karttakohteen lähteeksi tässä A:ssa. |
| S16 | [Lighthouses of Liberia, Russ Rowlett / UNC](https://www.ibiblio.org/lighthouse/lbr.htm) | Majakka-aseman ja nykyisen tornin eri iät. Nykyinen Cape Mesurado (2) ajoitettu sivulla noin vuoteen 1900, asemavuosi 1855 ei tornin rakennusvuosi. Tarkka torni-/tekijäoikeus ja WP/WD-kohdepiste puuttuvat; ei kuvan päämotiiviksi tai kartalle. |
| S17 | [Roberts International Airport](https://en.wikipedia.org/wiki/Roberts_International_Airport) | Kansainvälisen lentoaseman sijainti ja tunnus ROB; ei nykyisten lentoyhtiöiden/reittien tai rakennuksen oikeuksien lähde. |
| T1 | [FCDO Liberia: safety and security](https://www.gov.uk/foreign-travel-advice/liberia/safety-and-security) | Ajantasainen virallinen matkaturvallisuuden tausta: kuljetuksen varaaminen, pimeällä liikkuminen, raha, meri ja tien kunto. Tarkistettu 11.10.2026. |
| T2 | [FCDO Liberia: entry requirements](https://www.gov.uk/foreign-travel-advice/liberia/entry-requirements) | Britannian kansalaisille osoitettu ohje; ei sellaisenaan suomalaisen viisumipäätös. Keltakuumerokotustodistuksen ja omien asiakirjojen tarkistus ennen matkaa. |
| T3 | [FCDO Liberia: health](https://www.gov.uk/foreign-travel-advice/liberia/health) | Matkaterveys ja vakuutuksen/evakuointiturvan tarve. Ei hoito-ohjetta tai muuttuvia tapausmääriä pelaajatekstiin. |
| WD1 | [Monrovia Q3748](https://www.wikidata.org/wiki/Special:EntityData/Q3748.json) | Kaupunki ja nimitausta; kontekstin pyöristetty kaupunkipiste säilyy. |
| WD2 | [Museo Q1345859](https://www.wikidata.org/wiki/Special:EntityData/Q1345859.json) | Museoidentiteetti. P625 poikkeaa S3:n rakennuspisteestä: hylätty kartalla. |
| WD3 | [Providence Baptist Church Q140606260](https://www.wikidata.org/wiki/Special:EntityData/Q140606260.json) | Oma kirkkopaikka, P625 sama kuin S4. Piste ei erillinen sisäänkäynti eikä modernin pyhäkön kuvan oikeutus. |
| WD4 | [Providence Island Q27459317](https://www.wikidata.org/wiki/Special:EntityData/Q27459317.json) | Saari Liberiassa. Preferred P625 sama kuin S5, normaaleja hienompia pisteitä ei keskiarvoteta. |
| WD5 | [Bushrod Island Q2093421](https://www.wikidata.org/wiki/Special:EntityData/Q2093421.json) | Saariidentiteetti; WP/WD:n paikantavat saaripisteet poikkeavat hieman. S7:n oma WP-piste käytössä, ei satamalaiturin koordinaatti. |
| WD6 | [West Point Q1449164](https://www.wikidata.org/wiki/Special:EntityData/Q1449164.json) | Sama nimetty paikallinen alue kuin S8; P625 sama. Ei niemen kärjen tai uimarannan erillispiste. |
| WD7 | [Mesurado River Q1107151](https://www.wikidata.org/wiki/Special:EntityData/Q1107151.json) | Koko joen P625 ilman suuqualifieria. Ei käytetä jokisuun pisteenä eikä kartan kosteikon pisteenä. |
| WD8 | [Cape Mesurado Q1479922](https://www.wikidata.org/wiki/Special:EntityData/Q1479922.json) | S15:n otsikkopiste, ei infolaatikon piste. Ristiriita ei ratkea kahden saman Wiki-ketjun avulla; ei kartalle. |

Epäonnistuneet/lähderajaan pysähtyneet haut: `Providence Island (Liberia)` en-Wikipediassa ja kokeillut Trinity Cathedral -otsikot sekä Waterside Market -oma artikkeli 404. Oikea Providence-otsikko löytyi myöhemmin. Pelkkä `Providence Island` on samannimisten paikkojen luettelo Q7252446, ei tämän kaupungin saari. Suomen UM:n `https://um.fi/matkustustiedote/-/c/LR` palautti vain yleisen sivurungon, ei Liberian maakohtaista ohjetta. UM-luokkaa ei keksiä: T1–T3 on erikseen nimetty virallinen vaihtoehtoinen kanava. Library of Congressin historiareitti antoi 403; UNESCO:n museoraportin PDF-reitti robots-kielto; Metropolitan Museumin Washington-viite 429. Niiden sisältöä ei väitetä luetuksi eikä rajoituksia kierretty.

### 1873-kehys

- Vuonna 1873 Monrovia on jo 1800-luvun alussa syntynyt pääkaupunki ja satamakaupunki. S1:n/S2:n kaupunkitausta riittää kehykseen ilman täsmällistä perustamispäivää.
- Kaupunkiseutu oli kalastuksen, viljelyn ja kaupankäynnin paikka jo ennen Amerikan uudisasukkaita. S1 mainitsee Dey/Dei-, Kru-, Bassa-, Gola- ja Vai-yhteisöjä; kertomusta ei aloiteta tyhjästä maasta eikä kuvitella kaikkia paikallisia samanlaiseksi ryhmäksi.
- Providence Baptistin historiallinen pyhäkkö, vanha oikeustalo, varhaiset sanomalehdet ja Liberia College kuuluvat jo 1800-luvun kehykseen. Kansallismuseo laitoksena, nykyinen yliopiston kampusrakenne, moderni kirkko ja nykyinen suurportti ovat myöhempiä vaiheita.
- Augustus Washington oli elänyt ja työskennellyt Monroviassa ennen vuotta 1873, mutta S11 kertoo hänen luopuneen valokuvauksesta. Isoisälle ei luvata tämän studion aktiivista kuvauspäivää vuonna 1873 eikä keksitä tapaamista.
- Saarten ja rannikon luonnonmaisema sopii kehykseen yleisesti. Nykyinen rantaviiva, saman yksittäisen puun/kaivon ikä, West Pointin nykyinen asuinalue ja Ramsar-status eivät siirry sellaisinaan vuoteen 1873.
- Isoisän reitti, käynti, ostos, henkilötuttavuus ja suora lainaus ovat erikseen tarinakirjoittajan tehtävä ja niiden on pysyttävä lähteistetyssä mahdollisessa ympäristössä. A ei väitä historiallista vierailua tapahtuneeksi.

## 1. Perusfaktat

| Kenttä | Vahvistettu kirjoitusaineisto | Lähde/raja |
| --- | --- | --- |
| Nimi ja tunnus | Monrovia, `monrovia`, LBR, e04 | konteksti; S1; WD1 |
| Maa/rooli | Liberian pääkaupunki, tärkeä kaupan/sataman keskus | S1 |
| Sijainti | Atlantin rannikolla Cape Mesuradon niemimaalla, Mesuradojoen äärellä | S1 Geography |
| Kaupunkipiste | Kontekstissa 6.3106, −10.8047; tämä on kaupungin yleispiste, ei nähtävyys tai säähavaintoasema | konteksti; WD1:n P625 |
| Nimi | James Monroen mukaan; sitä ennen Christopolis | S1 Etymology/History; WD1 P138 |
| Vanha keskusta | Broad Street -alue niemimaan länsipäässä; Waterside sen pohjoispuolella satamaveden äärellä | S1 Neighborhoods |
| Pohjoinen saari | Bushrod Island erotetaan keskustan niemimaasta; nykyinen Freeport on saarella | S1; S7 |
| Etelä/itä | Sinkor on kaupungin myöhempi vilkas alue; Paynesville kuuluu laajempaan kaupunkiseutuun | S1 |
| Väestö | Kontekstin noin 1,8 miljoonaa tarkoittaa Montserradon piirikunnan kaupunkiväestöä vuoden 2022 laskennassa, ei yksin Monrovian kaupunginhallinnon aluetta | kontekstin LISGIS-taustaselvitys; S1:n otsikon ristiriita kirjattu |
| Historiallinen alku | Kaupunki kasvoi 1800-luvun alun uudisasutuksesta alueella, jolla oli jo paikallisia asukkaita ja kauppaa | S1; S15 |
| Teema | Historia: kaupungin muisti painettuna, kuvattuna ja rakennusten käytössä | S2–S4; S11–S13; maalehden aihetoistot tarkistettu |

Väestön metadatana kontekstissa 1 761 032 / 2022 / LISGIS Table A4: Montserrado URBAN, mukaan lukien Paynesville, Gardnersville, New Georgia ja Caldwell. Tämä ei ole Monrovia City Corporationin luku. S1:n otsikointi ja Wv:n eri vuosien likiarvot eivät itsenäinen vahvistus. Julkaisuun mieluummin luku pois tai selvästi nimetty, pyöristetty kaupunkiseudun/laajemman Montserradon kaupunkiväestön arvio; ei sanatonta aluevaihtoa.

## 2. Kansi ja neljä nostoaihetta

Kansiin B:lle kolme eri laajaa paikkakuvaa: meri + keskustan yleisnäkymä, Mesuradon vesi/luontoympäristö ja vanhan keskustan katutila. Ei moderni hotelliraunio, nimetty nykyinen hallintorakennus, rauha-veistos tai uusi silta kuvan pääteoksena. Neljä nostoa eivät toista maalehden valan/lipun/merimiesten/laivarekisterin, kansallisruoan, naamioiden, tilkkutöiden, laulajien tai Vai-kirjoituksen tarinoita.

### K1 — Rantametsä pitää maata paikallaan

1. Mesuradon kosteikot sijaitsevat Monroviassa ja Montserradon alueella (S9).
2. Mangrove on kosteikon keskeistä kasvillisuutta, ei kaupungin ulkopuolelle siirretty geneerinen sademetsäkuva (S9).
3. Rantakasvillisuus auttaa vakauttamaan rantaviivaa (S9).
4. Kosteikko pidättää sedimenttiä; vesi ja maa muuttuvat yhdessä, eivät toimi pelkkänä postikortin taustana (S9).
5. Linnut käyttävät aluetta ravinnonhakuun (S9).
6. Kalat ja äyriäiset liittävät kosteikon kaupungin ruokaan ja elinkeinoihin (S9).
7. Hiilen/polttopuun keruu on dokumentoitu mangroven paineeksi; yksittäisen vuoden metsämäärää ei anneta (S9:n historiallinen RIS-tausta).

**Havainto:** kaupungin rinnalla on elävää rantakasvillisuutta, jolla on tehtävä. Luontoa voi kuvata ymmärrettävästi juurina, veden ja maan rajana sekä lintujen ruokapaikkana. Ei ajantasaista uhanalaisuusluokkaa vanhasta RISistä, tarkkaa laji-/hehtaarimäärää, luvattua krokotiilitapaamista tai retken turvallisuusarviota. Nosto ei ole maalehden kansallispuisto-yleistys vaan nimetty kaupunkikosteikko.

### K2 — Torikäytävä on keskustan toinen katu

1. Waterside on suuren markkina-alueen nimi aivan historiallisen keskustan pohjoispuolella (S1).
2. Alue katsoo kaupungin satamaveteen (S1).
3. Wv kuvaa markkinaa sisä- ja ulkotilojen yhdistelmänä (S14).
4. Kojut ja kapeat kulkuväylät rytmittävät asiointia (S14).
5. Keskustan katukaupassa myydään esimerkiksi käytettyjä vaatteita ja kodin tavaroita (S14); ei päätellä jokaisen kuvan kojun sisältöä.
6. Torin rinnalla on myös tuontitavaroita myyviä supermarketteja, joten kaupungin kauppaa ei kuvata vain yhtenä markkinamuotona (S14).

**Havainto:** kaupunkia voi lukea myös ihmisten käytössä olevina kulkuväylinä. Nimi Waterside säilyy paikantavana nimenä, mutta sen syntytarina ei ole todistettu. Tori tulee oppaaseen ja kuvarooliin, ei kartalle pelkällä Wv-listing-pisteellä. Ei tarkkoja hintoja, aukioloaikoja, maailman-/maan suurinta -väitettä tai modernin markettihallin tekijänoikeusolettamaa.

### K3 — Oikeustalosta tuli muistin talo

1. Kansallismuseon nykyisen paikan historiallinen rakennus oli vanha Supreme Court -talo (S3).
2. Aikajana ajoittaa rakennuksen 1800-luvulle; museolaitos on myöhempi (S2; S3).
3. Museon tehtävä on hankkia, säilyttää ja näyttää Liberian kulttuurista/historiasta kertovia aineistoja (S3).
4. Aineistossa on asiakirjoja, karttoja ja valokuvia (S3).
5. Arkiseen aineistoon kuuluvat myös huonekalut ja käyttöesineet (S3).
6. Museon paikat ovat vaihtuneet: aiempi Executive Mansion, Providence Island ja vanha oikeustalo eivät ole sama osoite (S3).
7. Kokoelmassa on myös nykytaidetta, jonka oikeudet eivät synny talon iästä (S3; oikeusmuistio).

**Havainto:** rakennuksen käyttö muuttui, mutta molemmat käyttötavat käsittelevät asiakirjoja ja muistia. Viimeinen yhteys on kirjoittajan havainto, ei lähteeseen keksitty tunnuslause. Ei tarkkaa museon perustamis-/muuttovuotta ristiriitaisista lähteistä, esinemäärää, kuningattaren pöydän tarkkaa ikää tai tämän päivän näyttelylupausta. Kuvaksi hyväksyttävä vanha ulko-osa, ei oletuksena mikä tahansa sisäesine.

### K4 — Samassa kaupungissa on myös falafelia

1. Wv erottaa Monroviassa liberialaisia ja lebanonilaisia ruokapaikkoja (S14 Eat).
2. Kaupungin cook shops -ruokapaikoissa tarjotaan liberialaista ruokaa (S14).
3. Riisi ja mausteiset kastikkeet ovat Wv:n kuvauksessa tavallisia kaupunkiruokailun aineksia (S14).
4. Wv:n ravintolalistassa on myös lebanonilaisia voileipiä ja falafelia (S14:n ohjeessa, päivitysmerkintä 2024; ei nykyisen ravintolan lupaus).
5. Torit ja kaupunkikaupat tarjoavat kasviksia/hedelmiä, ja Sinkorin suunnalla Wv kuvaa tuoreen kalan myyntiä (S14 Self-catering).
6. Monroviassa on myös kansainvälisen ruoan tarjontaa ja tuontitavaroita myyviä kauppoja (S14).

**Havainto:** ruokapaikkojen kirjo kertoo satamakaupungin arjesta. Tästä ei tehdä väitettä tietyn annoksen monrovialaisesta keksijästä tai maahanmuuton ajoituksesta. Ei maalehden palmunöljyliemi-/fufu-/meleguettapippuri-/kahvipuutarinoiden uusintaa. Ei hintatasovertailua tai nimettyä vuoden 2026 ruokalistaa. Kuvateksti vain kuvasivun tunnistamasta ruoasta; geneerinen riisi tai falafel ei yksin paikallinen Monrovia-annos.

## 3. Teemasivu: historia

Teema kokoaa neljä erilaista kaupungin muistia: lehti, valokuvan pinta, opiskelu ja vanhan pyhäkön asiakirjat. Se ei kertaa kaupungin nimeämisen/pääkaupungiksi synnyn yleisesittelyä tai Providence Islandin valmiin lähinoston rantautumis-/ACS-/Stockton-kertomusta.

### H1 — Toimitusteksti päätyi museoon

1. Liberia Herald kuuluu Monrovian varhaiseen 1800-luvun sanomalehtihistoriaan (S1 Culture; S2; S12).
2. Charles Force nimetään lehden perustajaksi (S12).
3. John B. Russwurm toimi sen toimittajana varhaisessa vaiheessa (S12).
4. Russwurm oli ennen muuttoaan mukana New Yorkin Freedom’s Journalissa (S12).
5. Liberia Heraldin varhaisia toimitustekstejä kuuluu kansallismuseon aineistoon (S12; S3).
6. Museon asiakirja- ja lehtiaineisto ei ole sama asia kuin museorakennuksen oma ikä (S3).

**1873:** lehti ja varhainen painettu julkisuus kuuluvat jo ympäristöön; museon myöhempi säilytyspaikka kerrotaan nykyhetken lisänä. Ei väitettä jokaisen vanhan numeron saatavuudesta, levikistä tai lehden nykyisestä ilmestymisestä. S12 sanoo ensin Forcen perustajaksi ja myöhemmin Russwurmin perustaneen lehden: toimitusvaiheita ei tiivistetä yhdeksi tarkaksi päiväksi. Ei hänen etniseen taustaansa liittyvää vanhentunutta luokittelutermiä. Kuvaksi luvallinen vanha lehti/paikkakuva, ei toisen lehden tunnus tai moderni lehtisivu.

### H2 — Valokuva rakensi kaupunkikuvaa

1. Augustus Washington oli daguerreotypisti, joka siirtyi Yhdysvalloista Liberiaa kohti 1800-luvun puolivälissä (S11).
2. Hän avasi valokuvausstudion Monroviaan (S11; S2).
3. Hän kuvasi kauppiaita sekä kaupungin/nationaalisten laitosten edustajia (S11; historialliset henkilöt ilman nykypolitiikkaa).
4. Kuvissa pukeutuminen, asento, huonekalut ja esineet olivat huolellisesti valittuja (S11).
5. American Colonization Society tilasi hänen kuviaan myös yhdysvaltalaisia yleisöjä varten (S11).
6. Muotokuvat rakensivat mielikuvaa uudesta maasta; ne eivät olleet läpileikkaus koko kaupungin väestöstä (S11:n kuva-analyysin referaatti).
7. Washington siirtyi myöhemmin sokeriruokoviljelyyn Saint Paul -joen rannalle ja muuhun julkiseen työhön (S11); yksittäisiä toimikausia ei kirjoiteta.

**1873:** valokuvaus oli jo osa kaupungin muistia, mutta aktiivista Washington-studiota tai isoisän valokuvausta hänen luonaan ei oleteta. Ei virallista sankarikuvaa uudisasutuksesta tai kuvien tilaajien mainoslupauksia faktaksi. Daguerreotyypin tekniikan tarkka materiaali/menetelmä ei tässä lähteessä varmennettu; ei teknistä reseptiä tai muistista täydennettyä materiaalifaktaa. B:ssä historiallinen paikkakuva tai sopiva riittävän laaja alkuperäinen Washington-aineisto; henkilön tekijäkuolema, aineiston aitous ja tarkka lisenssi erikseen. Ei nimeämätöntä lähimuotokuvaa väitettynä Monrovian asukkaaksi.

### H3 — Kirjat tulivat rakennusaineiden mukana

1. Liberia College perustettiin Monroviaan 1800-luvulla; se on nykyisen University of Liberian edeltäjä (S13).
2. Paikaksi valittiin pääkaupunki vaihtoehtoisten sijoituspaikkojen sijaan (S13).
3. Rahoitusta tuli yhdysvaltalaisilta organisaatioilta (S13).
4. Myös kirjat, tiilet ja puutavara tulivat lahjoituksina (S13).
5. Opetukseen kuului retoriikkaa ja latinaa, tavallisia tuon ajan yhdysvaltalaisen college-mallin aineita (S13).
6. College-valtuutuksen, vihkimisen ja ensimmäisten oppituntien ajankohdat olivat eri vaiheita (S13).
7. Nykyinen yliopisto toimii usealla kampuksella; varhaisen collegen historia ei todista nykyisten talojen ikää (S13).

**1873:** college ja opetuksen alku ovat jo olemassa; kampusten myöhempi laajeneminen kuuluu selvästi myöhempään kertoja-aikaan. Ei tarkkoja ensimmäisen luokan/kirjaston määriä, opiskelijoiden rituaaleja tai “Afrikan ensimmäinen/vanhin” -superlatiivia yhden artikkelin pohjalta. Kuvaksi varmennettu vanha college-/kirjastohistoria tai kuvaton nosto; nykyinen moderni kampusrakennus ei vanhan perustamisen nojalla vapaa kuvan pääteos. Ei kohdekartalle yliopiston yleispisteellä väitettynä varhaisen rakennuksen sijainniksi.

### H4 — Pieni pyhäkkö jäi suuren viereen

1. Providence Baptistin seurakunta syntyi 1800-luvun alun uudisasutusvaiheessa (S4).
2. Seurakunnan historiallinen pyhäkkö rakennettiin 1800-luvulla ja artikkelin mukaan se on yhä käytössä (S4).
3. Siellä hyväksyttiin itsenäisyysjulistukseen ja perustuslakiin liittyvät historialliset asiakirjat (S4).
4. Hilary Teage osallistui historiallisen julistuksen kirjoittamiseen ja oli seurakunnan pastori (S4); nykyinen politiikka ei aihe.
5. Seurakunnan kasvu johti paljon suuremman viereisen pyhäkön rakentamiseen 1900-luvun jälkipuolella (S4).
6. Uusi pyhäkkö on artikkelissa modernistinen rakennus; sitä ei samasteta historialliseen taloon (S4).
7. Paikan historiallinen merkitys ei takaa UNESCO-maailmanperintöstatusta, sisäänpääsyä tai kaikkien nykyisten osien kuvavapautta (S4; oikeusmuistio).

**1873:** pieni historiallinen pyhäkkö kuuluu kehykseen, viereinen modernistinen rakennus ei. Ei “vanhin Afrikassa” -väitettä, paikkamäärää tai tarkkoja rakennusvuosia yhden lähdeketjun varassa. Kuvaksi vain vanhan rakennuksen tunnistettu hyväksyttävä osa; uuden rakennuksen kuva ei vanhan pyhäkön artikkelin kuvitus. Historiallisten valtiollisten asiakirjojen maininta neutraalisti, ei nykyisen poliittisen johtajan/vaalien/instituutioiden esittelyä.

## 4. Opas

### Jakso 1 — Perille ja liikkeelle

- Roberts International Airport (ROB) on Monroviaa palveleva kansainvälinen lentoasema Harbelin suunnalla kaupungin itäpuolella (S1 Transport; S17; S14). Keskustan sijaan lentokenttä on noin 60 kilometrin päässä, ei sama paikka kuin Sinkorin Spriggs Payne.
- Varaa nouto etukäteen ja jätä siirtymiseen joustoa. T1 kertoo lentoasematiellä olevista töistä, liikenteestä ja vaarallisistakin oloista. Wv:n vanhaa ajoaika-/taksihintaa ei vuoden 2026 lupaukseksi.
- Kaupungissa on takseja ja muuta paikallisliikennettä (S1; S14). Oppaaseen majoituksen järjestämä tai etukäteen sovittu kuljettaja, ei lupaus jokaisen jaetun taksin turvallisuudesta.
- Sateet heikentävät tieoloja; T1:n mukaan pimeäajo ja moottoripyörätaksit ovat ongelmallisia. Ei neuvota omaa iltareittiä rannoille tai raunioihin.
- Tarkista suomalaisen omat viisumi-, passi- ja rokotustodistusvaatimukset viranomaiselta ennen varausta. T2 koskee Britannian kansalaisia, joten sen hakupaikka/raja-arvot eivät ole Suomen kansalaisen ohje sellaisenaan.

### Jakso 2 — Niemimaa ja vanha keskusta

- Broad Street kuuluu vanhan keskustan pääakseliin niemimaan päässä (S1).
- Waterside on keskustan pohjoispuolen markkina-alue; Bushrod Island on eri saari veden toisella puolella (S1; S7).
- Museo ja Providence Baptistin historiallinen paikka kertovat rakennusten käytöstä, eivät pelkästään niiden julkisivuista (S3; S4).
- Mamba Point on keskustan länsi-/lounaispuolella, Sinkor taas idempänä; paikkoja ei sekoiteta saman kävelykadun varrelle (S1).
- Varaa paikallinen opastus tai sovittu kuljetus tarpeen mukaan. T1 suosittelee välttämään kävelyä Monroviassa pimeän jälkeen. Päiväkäynti, nykyinen pääsy ja paikallinen ohje tarkistetaan erikseen.

### Jakso 3 — Vesi ja kaupungin muisti

- Providence Islandin kiinnostava nykyinen kerros on saaren suhde veteen, kasvillisuuteen ja vanhoihin fyysisiin jälkiin (S5; S6), ilman jo valmiin lähinoston saapumistarinaa.
- Bushrodin saaripiste ei ole Freeportin sisäänkäynti; kaupalliseen satamaan ei luvata vapaata kävelyä (S7).
- Mesurado Wetlands on laaja nimetty kosteikkoalue kaupungin ympäristössä. Karttapiste osoittaa aluetta, ei valmista retkeilyreittiä, veneilypalvelua tai havaintolavaa (S9; S10).
- Museolla on historiallisen, etnografisen ja taideaineiston kerroksia, mutta nykyinen näyttely/pääsy ja yksittäisen esineen tekijäoikeus tarkistetaan ennen vierailua/kuvausta (S3).
- Rantoja ei esitellä turvallisina uimapaikkoina. T1 varoittaa voimakkaista virtauksista ja keskustan veden laadusta; paikallinen ajantasainen neuvo tarvitaan. T1 ei suosittele kanootteja/kalastusveneitä matkustajakuljetuksiksi.

### Jakso 4 — Ruokapaikka löytyy arjen ääreltä

- Kaupungin cook shops -paikat tarjoavat liberialaista ruokaa; Wv kuvaa riisiä ja mausteisia kastikkeita (S14).
- Monroviassa on myös lebanonilaista ja muuta kansainvälistä ruokaa, joten oppaan ruokaosaa ei rajata yhden kansallisruoan reseptiksi (S14).
- Kasvisten/hedelmien kauppa ja tuoreen kalan myynti kuuluvat Wv:n kaupunkikuvaukseen (S14). Yksittäinen vanha osoite tai puhelinnumero ei vuoden 2026 asiointiohje.
- Käytä tunnistettavaa ruokakuvaa ja kuvatekstissä vain kuvasivun tukemaa nimeä. Ei väärän maan annosta Monroviassa kuvattuna eikä geneeriselle riisille keksittyä paikallista annosnimeä.
- Raha-asioissa varaudu käteiseen. T1 kuvaa korttien rajallista hyväksyntää ja automaattien/käteisen epävarmaa saatavuutta. Valuuttakurssia tai ruoan hintaa ei anneta.

### Jakso 5 — Sateeseen on varattava aikaa

Kaikki ilmastotekstin numerot vain valmiista `saa.json`-tiedostosta. Kaupunkilehden kuvaaja ja tekstin asteet eivät käytä S1:n leipätekstiä, S14:n vanhempaa kaaviota tai S15:n niemen kaaviota.

Kirjoitusaineisto: lämmintä on läpi vuoden, eikä viileää talvikautta ole. Valmiin tiedoston kuukausikeskiarvot pysyvät noin 25–28 asteessa. Loppu- ja alkuvuosi ovat vuoden sadehuippuja kuivempia; runsaat sateet rytmittävät etenkin touko–lokakuun kautta. Syyskuu on tiedoston sateisin kuukausi. Vuoden sade on noin 4 600 millimetriä, mutta tätä ei nimetä keskus-Monroviassa mitatuksi vuosiluvuksi. Kuivempana kautenakin sataa. Aikatauluun, jalkineisiin ja kuljetuksiin varataan sadevara; ei säälupausta tietylle matkapäivälle.

**Aseman käytännöllinen huomio:** taulukko edustaa Roberts International Airportin havaintoasemaa noin 60 kilometriä kaupungista itään. Se kuvaa seudun vuodenaikaisuutta; merenrantaisen keskustan yksittäisen kadun sää voi erota. Kaupunkipiste ei ole asemakoordinaatti. Sääosan pelaajatekstissä ei tarvitse luetella lähdejärjestelmiä, mutta paikan edustavuus ei saa muuttua vääräksi keskustan mittausväitteeksi.

**Säätaustan tarkistusmetadata:**

- Tiedosto `paakaupungit-pilvi/e04/monrovia/saa.json`, alkuperäisen `tyokalu.mjs saa`-ajon valmis tulos hyväksytyllä lähdesivusovituksella; A ei muuttanut sitä.
- Lähde: en-Wikipedian Monrovia-artikkelin ilmastotaulukko, revisio `1379469768`, luettu `2026-10-11`.
- Taulukko: `Climate data for Roberts International Airport, 37 miles (60 km) east of Monrovia, Liberia (1991-2020)`.
- Normaalikausi `1991–2020`. Lähdeviitteet taulukossa Deutscher Wetterdienst (average temperature and extremes only) ja Danish Meteorological Institute. Tämä on taulukon lähdeketju, ei kaksi A:ssa erikseen luettua riippumatonta raakadataa.
- `keskilampo`: `Daily mean °F (°C)` -rivi, työkalun yksikkömuunnos; ei käsin laskettu ylä-/alalämpöjen keskiarvo.
- `ylin`/`alin`: taulukon keskimääräisten päivittäisten ylä-/alalämpöjen rivit, työkalun pyöristys. Ei ennätyslämpöjä eikä ennusteita.
- `sade`: `Average rainfall inches (mm)` -rivi; huomio `sade = vain vesisade (Average rainfall)`. Ei kokonaisprecipitation-/lumisarjaa.
- Valmiin tiedoston `vuosisade` 4562 on työkalun sarjasta tallentama arvo. S1:n taulukon painettu vuosirivi 4561 mm ja yksittäisten solujen yksikköpyöristykset eroavat hieman; julkaisu käyttää saa.json:ia eikä A korjaa/laske tai yhdistä sarjoja käsin. Vuositeksti pyöristetty noin 4 600 millimetriin.
- Tallennetut `lat: 6.31`, `lon: −10.8` paikantavat kaupungin. Niitä ei ilmoiteta Roberts International Airportin havaintoaseman koordinaatteina.
- Normaalikauden keskiarvot eivät tämän vuoden sää, ilmastonmuutosväite, sääennuste tai päivittäinen vaaratilannearvio. “Maailman sateisin pääkaupunki” -superlatiivi pois, koska asemien/kausien vertailua ei tehty.

### Parasta (5)

1. Vanhan keskustan Broad Street -ympäristö ja Watersiden arjen kauppa päivänvalossa (S1; S14; T1).
2. Kansallismuseon rakennuksen aiemman käytön tunnistaminen, nykyinen pääsy tarkistettuna (S2; S3).
3. Providence Baptistin vanhan ja modernin pyhäkön ero, historiallista rakennusta kunnioittaen (S4).
4. Kaupungin saarten, niemimaan ja veden suhteiden ymmärtäminen Providence Islandin/Bushrodin avulla (S5–S7).
5. Cook shops -ruokailun ja kaupungin muun ruokatarjonnan kirjo (S14), tämän päivän paikka paikallisesti tarkistettuna.

### Hyvä tietää (4)

1. **Turvallisuus:** varaa kuljetukset etukäteen, vältä pimeällä kävelyä ja syrjäisiä rantoja. T1:n ajantasaiset käytännön ohjeet 11.10.2026, ei keksitty UM:n luokitus tai lupaus turvallisuudesta.
2. **Raha:** käteinen on tärkeä; kortti ja automaatti eivät aina toimi. T1:n mukaan myös pankkien käteistilanne voi vaihdella. Ei tarkkaa valuuttakurssia.
3. **Terveys ja asiakirjat:** tarkista oman kansalaisuuden matka-asiakirjat/rokotustodistukset, varaa matkaterveysneuvonta ja vakuutus evakuointiturvalla. T2 on UK-kansalaisohje, T3 kertoo rajallisista terveyspalveluista.
4. **Vesi ja pääsy:** uiminen ja veneen kyyti eivät automaattisesti turvallisia; satama, kirkko/museo ja historialliset paikat vaativat nykyisen pääsyn ja kuvausluvan erillisen tarkistuksen. Virtuaalinen karttajuttu ei ole fyysisen retken lupaus (T1; S3–S10).

## 5. Kohdekartta: kuusi nimettyä paikallista paikkaa

Suurelle Monrovia-kokonaisuudelle kuusi kohdetta: kaksi historiallisen rakennuspaikan juttua sekä saari- ja rannikkopaikkoja. Pienen kaupungin poikkeusta ei käytetä. Kohteita ei kasvateta kuuteen modernien hotellien, sillan, monumenttien tai arvattujen pisteiden avulla. Nimetyt laajat luontopaikat kuvataan alueina; ne eivät ole sisäänkäyntejä, uimarantoja, tarkkoja niemenkärkiä tai veneiden lähtölaitureita. Kohteiden todellinen kuvaoikeus/pääsy B:ssä erikseen. Koordinaatit pyöristetty lähteestä viiteen desimaaliin, tarkkuus ei muutu viidellä desimaalilla lähteen todellista tarkkuutta suuremmaksi.

| Kohde | lat | lon | Täsmällinen koordinaattilähde ja merkitys |
| --- | ---: | ---: | --- |
| Kansallismuseon vanha oikeustalo | 6.31580 | −10.80400 | S3:n omat Wikipedia-koordinaatit 6.3158, −10.804. Wv:n museo-listing tukee samaa paikkaa; WD2 poikkeava piste ei käytössä. |
| Providence Baptist Church, historiallinen pyhäkkö | 6.31680 | −10.80440 | S4:n oma kirkkopaikka; WD3 P625 sama, precision 0.0001. Kirkkoalueen lähdepiste, ei erillinen vanhan oven mittaus. |
| Providence Island | 6.32000 | −10.80200 | S5:n oma saaripiste ja WD4 preferred P625, precision 0.001. Muut WD4-pisteet eivät keskiarvon aineksia. |
| Bushrod Island | 6.35750 | −10.78556 | S7:n oma WP-koordinaatti 6°21′27″N 10°47′8″W. Saari, ei Freeport-laituri. WD5:n pitkäaste poikkeaa; ei sen hiljaista vaihtoa. |
| West Point | 6.32730 | −10.80640 | S8:n oma aluepiste ja WD6 P625. Paikallinen niemekkeen asuinalue, ei niemekkeen kärki/uimapaikka. |
| Mesuradon kosteikkoalue | 6.30000 | −10.75000 | S10:n taulukon nimenomaan Mesurado-rivi 6°18′N 10°45′W. S9:n RSIS sama aluekoordinaatti. Ei Mesurado River Q1107151:n jokipiste eikä jokisuu. |

### 1 — Kansallismuseon vanha oikeustalo

**Tyyppi/rajattu pääaihe:** historiallinen rakennus ja muuttunut käyttö. Ei nykytaidenäyttely tai limusiini. S3:n museo sijaitsee vanhassa Supreme Court -talossa; vanha talo erotetaan museolaitoksen synnystä ja nykyosista.

1. Paikka on Monrovian kansallismuseo (S3).
2. Rakennuksen aiempi tehtävä oli Supreme Court -oikeustalo (S3).
3. Vanha rakennus ajoittuu 1800-luvulle, museolaitos myöhemmäksi (S2; S3).
4. Museon tehtävänä on säilyttää ja esitellä Liberian kulttuurista/historiasta kertovaa aineistoa (S3).
5. Asiakirjat ja kartat kuuluvat esiteltyihin aineistolajeihin (S3).
6. Valokuvat ja arkiset käyttöesineet tuovat muun kuin rakennushistorian kerroksen (S3).
7. Museo on sijainnut aiemmin muualla, myös Providence Islandilla (S3).
8. Historiallisen talon, museon kokoelmien ja nykytaiteen käyttöoikeudet ovat eri asioita (S3; oikeusmuistio; viimeinen toimituksellinen raja, ei kohdejutun täyte).

**1873:** vanha oikeustalo kuuluu kehykseen; kansallismuseona vierailu ei. Ei tarkkaa vuoden 1862 julkaisua ilman riippumatonta varmennusta; S2:n UNESCO-viite ei luettu robots-kiellon vuoksi. Rakennuksen B-oikeusportti: tunnista vanha rakenne ja mahdolliset myöhemmät suojatut muutokset, tekijäketju/lisenssi; museon ikä ei lupa sisäesineille. Nykyisestä aukiolosta ei lähdevarmistusta.

### 2 — Providence Baptist Church, historiallinen pyhäkkö

**Tyyppi/rajattu pääaihe:** 1800-luvun vanha kirkkorakennus ja historiallinen asiakirjapaikka. Viereinen modernistinen kirkkorakennus pois kuvan pääteoksesta. Lähdepiste paikantaa kirkon kokonaisuuden; kuvan rakennustunnistus ei ratkea vain koordinaatilla.

1. Kirkko on Broad/Center/Ashmun-katujen ympäristössä Monroviassa (S4).
2. Seurakunta on lähtöisin 1800-luvun alun asutusvaiheesta (S4).
3. Historiallinen pyhäkkö on 1800-luvun rakennus (S4).
4. Artikkeli kertoo vanhan pyhäkön olevan yhä käytössä (S4; nykykäynti erikseen).
5. Se on paikka, jossa Liberian historialliset itsenäisyys-/perustuslakiasiakirjat hyväksyttiin (S4).
6. Hilary Teage kytkeytyy sekä historiallisten asiakirjojen kirjoittamiseen että pastorin tehtävään (S4).
7. Seurakunnan kasvu synnytti viereisen suuremman pyhäkön myöhemmin (S4).
8. Modernistinen viereinen rakennus ei sama teos kuin vanha pyhäkkö (S4).

**1873:** vanha pyhäkkö kuuluu aikakauteen, moderni pyhäkkö ei. Seurakunnan perustamisvuosi ja Liberiaan saapuminen eivät sama päivä: lähteissä 1821/1822-erottelu, pelaajalle 1800-luvun alku. Vuotta 1839 käsitellään lähdemetadatana, ei yksin julkaistavana tarkkana rakennusvuotena. Ei Afrikka-superlatiiveja, sanottua UNESCO-hyväksyntää tai vapaata sisäkuvauslupaa. B tarkistaa kuvan vanhan rakennuksen tunnistuksen, nykyosat, PD/FOP ja valokuvaajan lisenssin.

### 3 — Providence Island

**Tyyppi/rajattu pääaihe:** paikallinen jokisaari luonnonmaisemineen ja vanhoine fyysisine jälkineen. Olemassa olevan lähinoston saapumis-/ACS-/Stockton-kertomusta ei uusita isona nostona.

1. Saari on Mesuradojoen vesialueella Monroviassa (S5; S6; WD4).
2. Historiallisia nimiä ovat Dozoa/Darzoe ja Perseverance (S5).
3. S6 kuvaa saaren yhteyden Mesuradoon ja Stockton Creekiin (S6).
4. Saaren kaakkoisosassa on dokumentoitu mangrovea (S6); ei tämän päivän kasvillisuuskarttaa.
5. Paikalla kuvataan vanha kaivo ja historiallisen rantautumislaiturin jälkiä (S6; kaivon kuva myös S5).
6. Saaren suurikokoinen puu on osa paikkakuvauksen muistikohteita, mutta tarkkaa ikää ei tässä hyväksytä (S6).
7. Saaren nykyiset rakennelmat sisältävät alkuperäistä tyyliä jäljitteleviä myöhempiä majoja ja palaveritilan; rekonstruktio ei alkuperäinen 1800-luvun rakennus (S6).
8. Saari on Liberian UNESCO-ehdotuslistalla, ei tällä perusteella hyväksytty maailmanperintökohde (S5; S6).

**1873:** saari ja vanha paikankäyttö sopivat kehykseen. Nykyistä metallipuuta, amfiteatteria, siltaa tai rekonstruktiomajoja ei sijoiteta vuoteen 1873 eikä valita modernina pääteoksena. Yksittäisen kaivon/puun 1873 olemassaoloa/ikää ei vahvistettu riittävästi; ei isoisän käyntiä tai keskustelua niiden juurella. B:n kuva luonnosta/vanhasta hyväksyttävästä jäljestä, ei suojattu nykyveistos. Paikan nimetyn historian sopimus- ja päivämääräkiistat erikseen, ei sankarikertomusta.

### 4 — Bushrod Island

**Tyyppi/rajattu pääaihe:** saari, sen vedet ja kaupunkisuhde. Saari ei nykyinen porttirakennus, terminaali tai satamalaituri.

1. Bushrod on Monrovian pohjoispuolen saari (S1; S7).
2. Sitä ympäröivät Atlantti, Saint Paul -joki, Mesuradojoki ja Stockton Creek (S7).
3. Stockton Creek yhdistää jokien vesialueita vuorovesikanavana (S7).
4. Saaren sijainti erottaa keskustan niemimaasta mutta liittää sen samaan kaupunkiseutuun (S1; S7).
5. Dei-yhteisöt käyttivät saarta ennen 1800-luvun uudisasutusvaihetta (S7).
6. Saaren nimitausta liittyy Bushrod Washingtoniin; häntä ei sekoiteta valokuvaaja Augustus Washingtoniin (S7; S11).
7. Saaren asuinalueita ovat Vai Town, New Kru Town, Logan Town ja Clara Town (S7); ei tarkkaa määräkysymystä.
8. Nykyinen Freeport of Monrovia ja muuta kaupallista toimintaa sijaitsee saarella (S7); rakennusten uudet oikeudet erikseen.

**1873:** saari, paikalliset yhteisöt ja vesireitit kuuluvat kehykseen yleisesti. Nykyinen Freeport ja nimettyjen nykykaupunginosien tämän päivän rajat eivät vuoden 1873 satamakuvaus. S7:n vuoden 1878 yksittäistä väestö-/Vai Town -havaintoa ei siirretä viisi vuotta taaksepäin. Kuvaksi veden ja saaren laaja maisema; ei nykyinen nimetty terminaali pääteokseksi tai sisäänkäyntilupaus. Ei vanhaa saariväestöä nykytilaksi.

### 5 — West Point

**Tyyppi/rajattu pääaihe:** nimetty paikallinen rannikon asuinalue niemekkeellä, kalastuksen ja kaupungin välinen suhde. Point-nimi ei karttapisteen tarkka niemenkärkisijainti eikä turvallinen uimaranta. Ei moderni rakennus/taideteos kohteena.

1. West Point on Monrovian paikallinen asuinalue/township (S8; WD6).
2. Se sijaitsee Atlanttiin työntyvällä niemekkeellä (S8).
3. Paikkakuvaus sijoittaa sen Mesuradon ja Saint Paul -joen välisten vesien yhteyteen (S8).
4. Kalastajien asettuminen liittyy alueen 1900-luvun syntyyn (S8).
5. Kalastus, pienkauppa ja palvelutyö yhdistävät aluetta keskustan arkeen (S8).
6. Rannan eroosio on muuttanut niemekkeen reunaa, joten rannikon muotoa ei käsitellä muuttumattomana (S8).
7. S1 sijoittaa alueen Watersiden luoteispuolelle, erilleen Mamba Pointista (S1).
8. Vesi ja asutus ovat samassa paikkakuvassa; kaupunginosan nimi ei vapaa lupa kuvata lähikasvoja tai kotien sisätiloja (toimituksellinen kuvausraja, ei kahdeksannen faktan täyte).

**1873:** nykyinen West Pointin asuinalue syntyi vasta 1900-luvulla. Rannikon luontoa voi käsitellä historiallisessa maisemakehyksessä, mutta nykyistä kalastajakaupunginosaa, rantaviivan tarkkaa muotoa tai nimettyä paikallista kotia ei kirjoiteta isoisän vierailuksi 1873. Kohde toimii nykyoppaan paikannettavana rannikkopaikkana, ei väitteenä että kaikki lehtijutut ovat aikamatkan ajan rakennuksia. Ei slummi-/kurjuuskatsetta, taudin/rikoksen kertomusta, tarkkaa väestö-/pinta-alalukua tai uimaretkeä. B:ssä laaja kunniallinen paikkakuva ilman lähikasvoja/suojattua nykyteosta.

### 6 — Mesuradon kosteikkoalue

**Tyyppi/rajattu pääaihe:** laaja nimetty kaupunkikosteikko, sen mangrove ja ekologinen tehtävä. WP-aluepiste voi olla yleiskartan merkki; se ei yksilöi vierailijan lähtöpaikkaa eikä jokisuun rantaa.

1. Mesurado Wetlands on nimetty kosteikko Monrovian/Montserradon alueella (S9; S10).
2. Alueella on mangrovekasvillisuutta (S9).
3. Rhizophora- ja Avicennia-sukujen puita on kuvattu RIS-aineistossa (S9; vanhan lajiston tarkka nykyinen tieteellinen nimistö ei varmennettu).
4. Kosteikko tarjoaa linnuille ruokailuympäristöä (S9).
5. Rantaviivan vakauttaminen on yksi dokumentoitu tehtävä (S9).
6. Sedimentin pidättäminen sitoo kosteikon rantaan ja veden liikkeeseen (S9).
7. Kalastus ja äyriäiset yhdistävät kosteikon kaupunkilaisten elinkeinoihin (S9).
8. Polttopuun/hiilen keruu ja teollinen kuormitus on dokumentoitu luontoympäristön paineiksi; vanhaa RISiä ei tämän päivän hoito-/saastetilanneraportiksi (S9).

**1873:** rannikon luonnon ympäristö kuuluu yleiseen maantieteelliseen kehykseen, mutta nykyinen Ramsar-suojelustatus, tarkat rajat/lajit ja nykyinen käyttö eivät vuoden 1873 havaintoja. Ei luvattuja eläinkohtaamisia, krokotiiliretkeä, varmistamatonta vene-/kävelyreittiä tai reitin lähtöpistettä. B:ssä täsmällisesti paikannettu aluekuva; geneerinen mangrove voidaan vain yleiseksi havainnollistukseksi merkittynä, ei nimeämättä Mesuradoksi.

Kohteisiin voidaan liittää yksi minitehtävä: tunnista, mikä rakennus toimi aiemmin oikeustalona (S3). Vihje ei sano “museo” sellaisenaan; tehtävä ei edellytä nykyistä sisäänpääsyä. Historiallisia vuosilukuja tai vanhaa opastusmaksua ei tehtäväksi.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Monrovia on? | Liberian | S1; WD1 |
| 1 | Minkä valtameren rannikolla kaupunki on? | Atlantin | S1 Geography |
| 2 | Minkä vanhan käytön rakennuksessa kansallismuseo toimii? | Oikeustalon | S3 |
| 2 | Millä varhaisella kuvausmenetelmällä Augustus Washington työskenteli Monroviassa? | Daguerreotypialla | S11 |
| 3 | Miksi vanha pyhäkkö ja viereinen moderni kirkko pitää erottaa historiallisessa kuvassa? | Ne ovat eri aikakausien rakennuksia | S4 |

Vihje ei käytä oikeaa vastausta eikä maan/meren nimeä sellaisenaan. Väärät vaihtoehdot uskottavia ja samanmittaisia. Ei toisen pelissä olevan kaupungin nimeä oikeaksi, tarkkaa numero-/vuosikysymystä, nykyisen valtionjohtajan kysymystä tai turvallisuusohjeen visaa. Museokysymys ja minitehtävä eivät molemmat lopulliseen samaan kohtaamiseen samana sanamuotona.

Kolme tiedot-aihetta ilman isoisää:

1. Monrovian vesiympäristö muodostuu niemimaasta, saarista, joista ja Atlantista; Bushrod on eri paikka kuin keskustan niemimaa (S1; S7).
2. Kansallismuseon talo oli olemassa eri käytössä ennen museolaitosta (S2; S3).
3. Providence Baptistin pieni historiallinen pyhäkkö säilyi myöhemmän suuremman rakennuksen rinnalla (S4).

Tietojen pelaajamuotoon ei lisätä lähdekanava-/tekijäoikeusmetaehdotuksia. Tiedot ovat lähteistettyjä huomioita, eivät isoisän kertomia keksittyjä muistoja.

## 7. Kuvatarpeet B:lle

A ei valinnut/hyväksynyt kuvia eikä hakenut Commonsista. Liberian FOP, teoksen suoja-aika/PD, mahdollinen erikseen todistettava perinne-/PD-erityisehto ja paikan käytännön kuvaus-/pääsyehdot ovat eri kerroksia. Algerian/Kap Verden ehtoja ei siirretä Liberiaan ilman lähdettä. Kaupallisen FOPin puute ei herätä vanhan teoksen päättynyttä oikeutta uudelleen; vanha rakentamisen/paikan aloitusvuosi ei yksin todista jokaista nykyistä osaa vapaaksi. CC-valokuvaajan lupa ei kata automaattisesti suojattua kuvattua rakennusta/taidetta. Ei NC/ND/Fair use -kuvia. Teosten tekijän alle 70 vuoden kuolema-aika ei tämän tilauksen kohteeksi.

| Kohta | Aiheet/hakusanat | Rajaus |
| --- | --- | --- |
| Kansi 1 | Monrovia Atlantic coast broad city panorama | Meri ja kaupunki laajasti, ei Ducor Hotel / nykyinen nimetty hallintoteko päämotiivina. |
| Kansi 2 | Monrovia Mesurado river island landscape | Aito paikallinen vesi/saari, ei väärä joen yläjuoksu tai naapurimaa. |
| Kansi 3 | Monrovia historic downtown Broad Street panorama | Kaupunkitila laajana, mainospinnat/lähikasvot pois; moderni yksittäinen teos ei pääaihe. |
| K1 | Mesurado Wetlands mangrove shoreline | Mieluiten nimenomaan Mesurado. Muun paikan juuret vain avoimesti yleisenä havainnollistuksena, ei kuvan väitetty Monrovia-sijainti. |
| K2 | Waterside Market Monrovia street stalls | Oikea markkina; ei pelkkä kauppa toisen kaupungin nimellä, luettavat lähikasvot/mainokset pois. |
| K3 | Liberian National Museum old Supreme Court exterior | Vanha hyväksyttävä rakenne. Modernit sisäteokset/esineet eivät rakennuksen vanhuuden perusteella vapaita. |
| K4 | Monrovia Liberian cook shop food / rice / falafel | Kuvasivun todellinen nimi ja paikka; geneerinen annos selvästi yleiseksi ruokakuvaksi. Ei pakkauksia/ravintolan logoa pääaiheeksi. |
| H1 | Liberia Herald historical newspaper archive | Varmennettu vanha lehti/paikkakuva; author/date/PD-ketju, ei moderni lehden numero tai väärän lehden logo. |
| H2 | Augustus Washington Monrovia historical photography | Aito lähdeaineisto; tarvittaessa laaja vanha Monrovia-paikkakuva. Yleinen daguerreotyyppiväline vain havainnollistukseksi. Ei lähikasvoa tai väärää henkilöllisyyttä; Washingtonin teoksen oikeudet ja arkistovedos erikseen. |
| H3 | Liberia College nineteenth century historical view | Alkuperäinen vanha paikkakuva riittävällä koolla/oikeusketjulla; nykyinen moderni kampus ei kuva vanhasta collegesta. Kuva voi puuttua, jos varmaa ei löydy. |
| H4 | Providence Baptist Church historical sanctuary | Vanha 1800-luvun pyhäkkö, ei viereinen modernistinen suuri rakennus. Tunnistus ja nykyiset osat kuvatarkistuksessa. |
| Matkailijalle | Monrovia coast palm street vertical | Tuore maltillinen pysty, w/h 0,60–0,85, paikan konteksti näkyviin; ei nykyteos päämotiivina. |
| Opas 1 | Monrovia road vehicles transport landscape | Tuore kulkuneuvo/katutila. Ei moderni lentoasemarakennus pääteokseksi tai vanhan lentoreitin lupaus. |
| Opas 2 | Broad Street Monrovia daytime street | Eri tiedosto kuin kansi/nosto, ei nykyisestä kuvasta tarkkaa 1873 talo-ikää. |
| Opas 3 | Providence Island nature / Mesurado water | Ei metallipuuta, amfiteatteria, uutta siltaa tai rekonstruktiota vanhana teoksena. |
| Opas 4 | Cook shop rice vegetables plate | Vain kuvan tukema annosnimi/paikka. Geneerinen riisi ei Monroviassa kuvattu ateria ilman paikkatukea. |
| Opas 5 | Sää | Voi kuvaton; taulukko vain saa.json. |
| Kohde 1 | National Museum Monrovia separate exterior | Oma vanha rakennus; ei ristiriitaisen WD-pisteen lähellä oleva muu talo. |
| Kohde 2 | Providence Baptist historical building separate view | Nimenomaan vanha pyhäkkö; kirkkokompleksin koordinaatti ei riitä modernin talon nimeämiseen vanhaksi. |
| Kohde 3 | Providence Island shoreline old well tree | Luonto/vanha hyväksyttävä jälki; ei puun tarkka ikä eikä moderni metallitaideteos päämotiivina. |
| Kohde 4 | Bushrod Island water landscape | Saari/sen vesiyhteys, ei nimetty nykyinen Freeport-terminaali tai sataman sisäänpääsylupaus. |
| Kohde 5 | West Point Monrovia coastline panorama | Kunnioittava laaja paikallinen maisema, ei lähikasvot/kotien sisätilat/kurjuusnäytös; ei niemenkärkikuva väärän pisteen lupauksena. |
| Kohde 6 | Mesurado Wetlands vegetation landscape | Oma alue, ei yleinen jokipiste tai ulkomaisen kosteikon kuvan väärä nimi. |
| Valokuva | Monrovia nineteenth century river town photograph | PD-ketjultaan varmennettu enintään vuoden 1900 vanha valokuva, leveys vähintään 1200 px. Piirros/kaiverrus ei muutu valokuvaksi. Muuten eri nykyinen yleinen luontokuva ja ennen–nyt-pari pois. |

Sama tiedosto kerran paitsi valokuva/ennen–nyt-nimenomainen poikkeus. B/C/D katsovat kuvat; lisenssi ja täsmällinen Artist sallitulta lähdesivulta. Ei vesileimaa/arkistoleimaa, mainosta tai luettavia lähikasvoja. Kosteikon/saarten/veden aihetoistot erotetaan näkökulmalla ja eri tiedostolla. Kuvaton parempi kuin väärä teos/oikeusketju. Vanhan nykyisen talon tai arkistovedoksen B-oikeusportti voi jättää kuvapaikan avoimeksi ilman A:n faktatyön keskeytystä.

## 8. Ristiriidat ja epävarmuudet

1. **Väestön laajuus:** kontekstin LISGIS-2022 määrä on Montserradon kaupunkiväestöä, ei Monrovia City Corporationin väkeä. S1:n Capital city -otsikko ja Wv:n luvut eivät tämän aluejaon korjausta. Lukua ei julkaista kaupungin yksilukuna.
2. **Kaupungin synty:** paikkakunnalla oli kalastusta, viljelyä ja kauppaa ennen uudisasukkaita. Kaupungin perustamispäivä ei koko alueen historian ensimmäinen päivä; paikallisyhteisöjä ei poisteta kertomuksesta.
3. **Providence-nimihaku:** `Providence Island (Liberia)` 404; pelkkä nimi disambiguation Q7252446. Oikea S5/WD4 on Liberian jokisaari. Väärän saaren piste/kuva ei korvaa sitä.
4. **Saaren sopimus/nimet:** S5 kertoo Dozoa/Bushrod/Providence-identiteettiä koskevasta tutkijakiistasta. Nykyinen nimetty saari ja kaikki historialliset nimet eivät automaattisesti sama sopimusmaapalsta. Kertomusta ei puristeta yhdeksi varmaksi saarekeksi/omistajaksi/päiväksi.
5. **UNESCO-ehdotusteksti:** S6 sisältää eri rantautumispäiviä ja myös ilmeisen 1882-kirjoitusvirheen 1822-kontekstissa. Kyse on valtion Tentative List -ehdotuksesta, ei UNESCO:n hyväksymästä maailmanperintöasemasta. Tarkka saapumispäivä, puun ikä/area/poikkeuksellisuus pois.
6. **Museon synty ja paikka:** S2 sanoo perustamisvaiheen Providence Islandilla 1962, S3 lain mukainen perustaminen 1958 ja eri paikanvaihdot. Perustaminen, muutto ja uudelleenavaus ovat eri tapahtumia; pelaajalle 1900-luvun laitos ja 1800-luvun vanha oikeustalo.
7. **Museokoordinaatti:** WD2 P625 6.31685, −10.80394 ei sama kuin S3 6.3158, −10.804. Kartalla S3:n oman rakennusartikkelin piste, Wv:n listing vain paikan rinnakkainen tuki; ei näiden keskiarvoa. WD:n viiden desimaalin tarkkuus ei tee ristiriidasta olematonta.
8. **Vanha ja moderni kirkko:** S4:n seurakunta/saapuminen, vanha pyhäkkö ja modernistinen pyhäkkö eri vaiheita. Kirkkopaikan piste ei erillinen vanhan sisäänkäynnin mittaus. B:n kuvatunnistus vanha rakennus tai hylkäys, ei “kirkko”-nimen alle automaattisesti kumpikin teos.
9. **Trinity ja Waterside:** kokeillut Cathedral-otsikot eivät antaneet omaa artikkelia/paikkapistettä. Aikajanan Trinity-vihkimistieto ei takaa nykyisen kuvassa olevan rakennuksen samaa ikää. Waterside faktoihin/kuvarooliin S1/S14:stä, ei kartalle Wv-pisteen lähdepoikkeamaa naamioiden WP/WD:ksi.
10. **Cape Mesurado:** S15:n otsikko 6.31333, −10.80778 ja infolaatikko 6.307998768, −10.804663448 poikkeavat; WD8 toistaa otsikkopisteen. Ei tarkkaa niemen kärjen/toisen kohteen pisteen tukea. Ei lähteiden keskiarvoa tai kartalle arvattua rantapistettä.
11. **Majakka-asema ja torni:** S15:n 1855 on aseman alku; S16 erottaa nykyisen toisen tornin noin vuoden 1900 vaiheeksi, tarkka rakennusvuosi tuntematon. Aseman vuosi ei nykyisen fyysisen tornin PD/perustamisvuosi. Ei nykyisestä tornista 1873 kuvaa tai kuvaoikeuspäätelmää.
12. **Bushrodin pisteet:** S7:n −10.78556 ja WD5:n −10.78333 poikkeavat paikantavina saaripisteinä. S7:n oma piste käytössä samannimiselle saarelle; ei sitä Freeportin laiturin sijaintina tai näennäisenä sisäänkäyntinä.
13. **Joki ja kosteikko:** WD7/Sen jokipisteessä ei suuqualifieria. Se ei Monrovian jokisuun koordinaatti. S10:n omalla Mesurado Wetlands -rivillä oleva aluepiste sen sijaan koskee nimettyä kosteikkoa; Ramsar tukee identiteettiä/aluetta. Tarkka retkipaikka/pääsy puuttuu edelleen eikä aluepiste ratkaise niitä.
14. **West Pointin aikataso:** asuinalue syntyi 1900-luvulla ja rannikko muuttuu eroosiossa. Nykyinen niemeke/alue on paikannettava, mutta nykyistä asutusta ja rantaviivaa ei siirretä 1873:een. Ei kohteen nimessä “niemen kärki” tai turvallinen uimaranta.
15. **Kosteikon ikä ja nykytila:** S9:n viimeisin RIS 2006. Lajit, keruu-/kalastuskäyttö ja uhkatekstit ovat dokumentoitua taustaa, eivät nykyinen laskenta, nykylajitakuu tai nykyhoitosuunnitelman puute. Lajimäärät, hehtaarit ja suojelupäivä eivät julkaisun exact-faktoiksi ilman riippumatonta varmennusta.
16. **Liberia Herald:** Charles Force perustajana ja Russwurmin perustamisväite artikkelin myöhemmässä kappaleessa ristiriidassa. Käytetään Forcen varhaista vaihetta ja Russwurmin toimitustyötä ilman tarkkaa päivää, levikkiä tai katkeamatonta nykyjulkaisuväitettä.
17. **College:** valtuutus, kulmakivi, vihkiminen ja oppituntien alku eri vuosina. Ei yhden vuoden muuttamista kaikkien nykyisten kampusrakennusten iäksi. Nykyisen kampuksen arkkitehtuurissa myöhempi suunnittelu, ei suojan päättymisen oletusta vanhasta institutionaalisesta historiasta.
18. **Washington:** varhainen valokuvaus ja myöhempi muun alan työ erotetaan. Hän ei automaattisesti toimi studioisäntänä 1873; muotokuvat eivät edusta koko väestöä. Vanha henkilökuva ei yksin aitouden tai käytön lupa.
19. **Ruoan opastiedot:** S14:n paikkatiedot osin 2020/2024. Nimetyt ravintolat, hinnat, menusisällöt ja aukiolo eivät tämän päivän lupaus. Yleinen liberialainen/lebanonilainen tarjonta on dokumentoitua, mutta kuvattu annos tunnistetaan B:ssä.
20. **Sääasema:** noin 60 km itään keskustasta Roberts International Airportissa. Kaupungin tallennetut lat/lon eivät asemakoordinaatti. S1/S14/S15 käyttävät eri sarjoja; vain valmis saa.json julkaisunumeroille. Taulukon ja työkalun yksikköpyöristys eroaa hieman; A ei muokkaa sääaineistoa.
21. **Virallinen matkaneuvo:** UM-LR palautti vain rungon. FCDO luettiin erikseen virallisena kanavana ja päiväys kirjattu; sen UK-asiakirjaohjeita ei suomalaiselle sellaisenaan. Ei yleistä UM-luokkaa tai muuttuvaa viisumihintaa, lentoreittiä, tartuntatapauslukua.
22. **Oikeuskerrokset:** A:n vanhat fakta-aiheet eivät tee kuvia hyväksytyiksi. FOP, päättyneen suojan PD, mahdollinen erikseen osoitettava lisenssi/maksu ja ei-tekijänoikeudellinen pääsy erillisiä. Naapurimaan lakia ei Liberian faktaksi. Vanha saari/museotalo ei vapauta metallipuuta, limusiinia, modernia majaa, sisäteosta tai arkiston myöhempää teosta.

## 9. Poisjätöt ja loppurajat

- Maalehden valan vannoneen kauppiaan, lipun ompelijoiden, merimiesten, laivarekisterin, kansallisruokien, meleguettapippurin, kahvipuun, tilkkutöiden/naamioiden, laulajien/rapin, kansallislaulun, Vai-kirjoituksen ja romaanitarinoiden uusinnat pois. Kontekstin Providence Island -lähinosto on jo olemassa: sen ACS/Stockton/saapumistarinaa ei uutena nostona.
- Nykypolitiikka, vaalit, nykyiset valtionjohtajat, sodat, rikollisuustapaukset ja epidemioiden tarinat eivät lehtijuttujen sisältöä. Ajantasainen matkaturvallisuus/terveys käsitellään oppaan käytännöllisinä ohjeina ilman dramaattista tarinakehystä.
- Ducor Hotel, nykyinen Masonic Temple ilman täsmällistä rakennus-/tekijäketjua, Centennial Pavilion, nykyinen Capitol/Executive Mansion/Temple of Justice, monumentit/veistokset ja uudet sillat pois kartoista/kuvapääteoksista. Aikajanan vanha temppeli ja nykyinen kuvattu temppeli eivät automaattisesti sama rakennus.
- Providence Baptistin modernistinen suuri pyhäkkö, museon suojatut sisäteokset, Providence Islandin metallipuu/amfiteatteri/rekonstruktiot ja majakan nykyinen torni eivät vapaita vanhan paikan/alkuvuoden perusteella.
- Väärät Providence-otsikot, WD-museopiste, Cape Mesuradon ristiriitainen piste, koko Mesuradojoen yleispiste jokisuuna, Wv-markkinalisting WP/WD-pisteenä ja yliopiston yleispiste alkuperäisen rakennuksen sijaintina pois. Koordinaatteja ei arvata tai keskiarvoteta.
- Saaren/West Pointin/kosteikon yleispiste ei sisäänkäynti, veneilypalvelu, retken lähtöpaikka tai turvallinen uimapaikka. Kuusi kohdetta lähteistettyjen nimettyjen paikkojen joukko, ei luvattu kuuden fyysisen sisävierailun ohjelma.
- Tarkat historialliset vuodet/lukumäärät, alkuperäisen talon koko/paikkamäärä, levikit, vanhat väestöarviot, satamavolyymit ja “maailman sateisin”/“Afrikan vanhin” ilman riippumatonta vertailua pois. Metadatan päivät/koordinaatit eivät tällaisia julkaistavia tilastoja.
- Vapaa pääsy Ducorin raunioon vanhalla maksulla, satamaan, kirkkoon tai luonnonalueelle ei opastieto. Samoin epävarmat nykyiset lentoreitit/lentoaikataulut ja hintalupaukset pois.
- RAPORTTI.md:hen pääkoordinaattien WP/WD-valinnat/ristiriidat, kuuden nimetyn paikan rajaus, West Pointin aikataso, sääaseman 60 km etäisyys ja rainfall/pyöristyshuomio, väestön Montserrado-aluejako, UM/FCDO-poikkeama, museon/kirkon rakennusvaiheet ja lopulliset B-oikeusratkaisut. A:n faktatyö ei sisalto.json-, kuva-, integraatio- tai julkaisuhyväksyntä.
