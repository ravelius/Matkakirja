# Alger — faktapohja (vaihe A)

Kaupunki `alger`, maa DZA, erä e04. Valmis kirjoittajan ja kuvatoimittajan aineisto, haettu **11.10.2026**. Tähän tiedostoon ei sisälly kuvien hyväksyntää eikä pelisisällön kytkentää. Nimet ja väitteet ovat alla luetuista lähteistä. Tarkkaa vuosilukua käytetään vain erikseen varmennetussa tapauksessa; muut rakennusajat ilmaistaan vuosisatoina. Koordinaatit ovat ohjeen edellyttämät lähdekoordinaatit, eivät omia paikannuksia.

## 0. Luetut lähteet ja 1873-kehys

Kaikkien alla mainittujen verkkolähteiden hakupäivä on 11.10.2026. Haku tehtiin pääsession `sallittu_haku.py`-apurilla, joka tarkistaa robots.txt:n sekä Claude-Userille että Matkakirja-käyttäjätunnukselle ennen lähdepolkua ja tarkistaa myös uudelleenohjaukset. Omistajan hyväksymän poikkeuksen nojalla Wikipedia luettiin tavallisilta `/wiki/`-sivuilta; `/w/`- tai `/api/`-polkuja ei haettu. Raakasivut ja tekstipoiminnat: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/alger-A/`. Commons-hakuja ei tehty vaiheessa A.

| Tunnus | Otsikko ja kieli | URL | Luetut / käytettävät osiot |
|---|---|---|---|
| AL | Algiers, en | https://en.wikipedia.org/wiki/Algiers | johdanto, Toponymy and name origin, History, Geography, Climate (vain laadullinen teksti), Landmarks, Transport |
| FI | Alger, fi | https://fi.wikipedia.org/wiki/Alger | johdanto ja historia; otsikon varmistus, ei itsenäinen toinen vuosilukulähde |
| TL | Timeline of Algiers, en | https://en.wikipedia.org/wiki/Timeline_of_Algiers | 1800-luvun tapahtumat; ei lasketa AL-artikkelista riippumattomaksi vuosilukuvarmistukseksi |
| CAS | Casbah of Algiers, en | https://en.wikipedia.org/wiki/Casbah_of_Algiers | Etymology, Toponymy, Location and topography, Hydrogeology, History, Urban fabric, Domestic architecture, Typology of the medina, Palaces and residences, Mosques, Madrasas and mausoleums, Citadel and defensive structures, The role of water |
| UN | Kasbah of Algiers, UNESCO World Heritage Centre, en | https://whc.unesco.org/en/list/565/ | Brief synthesis, Criteria, Integrity, Authenticity, inscription-tieto |
| KE | Ketchaoua Mosque, en | https://en.wikipedia.org/wiki/Ketchaoua_Mosque | johdanto, History, Architecture; virheelliset / ristiriitaiset kohdat rajattu pois osiossa 8 |
| AZ | Dar Aziza, en | https://en.wikipedia.org/wiki/Dar_Aziza | History, Architecture |
| HA | Dar Hassan Pacha, en | https://en.wikipedia.org/wiki/Dar_Hassan_Pacha | koko lyhyt artikkeli; kohde jätetty pois, ks. 9 |
| DJ | Djamaa el Djedid, en | https://en.wikipedia.org/wiki/Djamaa_el_Djedid | History, Architecture |
| DK | Djamaa el Kebir, en | https://en.wikipedia.org/wiki/Djamaa_el_Kebir | History, Architectural features, Interior, Exterior, The minbar |
| DE | Palace of the Dey, en | https://en.wikipedia.org/wiki/Palace_of_the_Dey | johdanto, History, Architecture, Condition |
| MU | Dar Mustapha Pacha, en | https://en.wikipedia.org/wiki/Dar_Mustapha_Pacha | johdanto ja rakennuksen kuvaus |
| RA | Palais des Rais, en | https://en.wikipedia.org/wiki/Palais_des_Rais | johdanto, History, Colonial period, After independence; ristiriitainen aikajana rajattu pois |
| SI | Zawiya Thaalibia (Algiers), en | https://en.wikipedia.org/wiki/Zawiya_Thaalibia_%28Algiers%29 | Presentation, Compartments, koordinaatti; `Mausoleum of Sidi Abderrahmane Et-Thaalibi` ohjautuu tähän artikkeliin |
| ND | Notre-Dame d'Afrique, en | https://en.wikipedia.org/wiki/Notre-Dame_d%27Afrique | History, Location, Importance |
| NO | Origines, Basilique Notre-Dame d'Afrique, fr, kirkon oma historia | https://notre-dame-afrique.org/un-patrimoine-exceptionnel/origines/ | rakentaminen, valmistuminen, 1800-luvun historia |
| HG | Botanical Garden Hamma, en | https://en.wikipedia.org/wiki/Botanical_Garden_Hamma | johdanto, History; pinta-alat ja lajimäärät jätetty pois |
| VO | Algiers, Wikivoyage, en | https://en.wikivoyage.org/wiki/Algiers | Get in, Airport transfer, Get around, On foot, See, Eat; ei hintoja eikä aukioloaikoja |
| AP | Houari Boumediene Airport, en | https://en.wikipedia.org/wiki/Houari_Boumediene_Airport | johdanto, IATA-tunnus |
| ME | Algiers Metro, en | https://en.wikipedia.org/wiki/Algiers_Metro | johdanto, asemaluettelo ja linjan kuvaus; ei valmistumisvuosia eikä verkon määriä |
| MA | Dar ‘Aziza Bint al-Bay, Museum With No Frontiers / Discover Islamic Art, en | https://islamicart.museumwnf.org/database_item.php?id=monument;ISL;dz;Mon01;10;en | Date of Monument, Description, How Monument was dated |
| MJ | Djama’a al-Djedid (New Mosque), Museum With No Frontiers / Discover Islamic Art, en | https://islamicart.museumwnf.org/database_item.php?id=monument;ISL;dz;Mon01;12;en | Date of Monument, Patron(s), Description; myytti rajattu pois |
| MM | Dar Mustafa Pasha, Museum With No Frontiers / Discover Islamic Art, en | https://islamicart.museumwnf.org/database_item.php?id=monument;ISL;dz;Mon01;13;en | Date of Monument, Description, How Monument was dated |
| BO | Bourek (Algerian cuisine), en | https://en.wikipedia.org/wiki/Bourek_%28Algerian_cuisine%29 | johdanto, valmistustavat, tarjoilu |
| AC | Algerian cuisine, en | https://en.wikipedia.org/wiki/Algerian_cuisine | Starters and appetizers, Main dishes, Soups; käytetään vain oppaan lyhyeen ruokajaksoon |
| CH | Chorba, en | https://en.wikipedia.org/wiki/Chorba | johdanto; liian laaja aihe omaksi Alger-nostoksi, ei oteta nostoihin |
| UM | Algeria: matkustustiedote, Ulkoministeriö, fi | https://um.fi/matkustustiedote/-/c/DZ | Turvallisuustaso, Yleinen turvallisuustilanne, Casbahia koskeva opassuositus, Maan lait ja käytännöt, Maahantulosäännökset |
| WD | Wikidata-entiteetit, json | https://www.wikidata.org/wiki/Special:EntityData/Q3561.json | P625 ja en-/fi-artikkelien tunnukset; kohteiden entiteetit listattu osiossa 5 |
| K | `konteksti.json`, paikallinen | `paakaupungit-pilvi/e04/alger/konteksti.json` | nykyinen kuvaus, tunnusrakennukset, ONS-pohjainen väkiluku, maalehden ja lähinoston toistot |

**Lähteiden riippumattomuus:** AL, FI, TL ja CAS ovat Wikipedian artikkeleita; kahden Wikipedia-artikkelin yhtäpitävää vuosilukua ei käsitellä itsenäisenä kaksoisvarmistuksena. Museum With No Frontiers on asiantuntijalähde, mutta DJ/AZ/MU käyttävät sitä myös omissa viitteissään: tältä lähdeparilta ei väitetä saatavan kahta toisistaan riippumatonta vuosilukutodistetta. Näissä käytetään vuosisataa. Notre-Dame d'Afriquen valmistumisvuosi **1872** on erikseen varmennettu ND:n historiasta (sen viite World Digital Libraryn historiallinen aineisto) ja kirkon omalta NO-historiasivulta. Casbahin maailmanperintöasema varmennettiin UN:stä; kirjoittaja voi jättää tarkankin listausvuoden pois, koska se ei ole kertomuksen kannalta tarpeellinen.

**1873-kehys:**

- Alger oli jo vanha Välimeren satamakaupunki, Ranskan siirtomaavallan alainen; se ei syntynyt isoisän matkavuoden jälkeen. Antiikin sataman ja 900-luvun medinan historia edeltää sitä. [AL, History; CAS, History]
- Casbahin linnoitus, palatsit, kujat ja vanhat moskeijat olivat olemassa. Ranskan aikana alkanut alemman kaupungin muuttaminen sekä uusien rantabulevardien rakentaminen olivat jo muuttaneet kaupunkia. Älä kuvaa koko nykyistä rantaa muuttumattomaksi vuoden 1873 näkymäksi. [AL, French rule ja Landmarks; CAS, Urban fabric; TL, 1800-luku]
- Ketchaouan kohdalla oli vuonna 1873 Saint-Philippen katolinen katedraali. Nykyinen moskeijarakennus rakennettiin katedraaliksi 1800-luvun puolivaiheilla; nykyinen nimi ei tarkoita, että se olisi ollut moskeijakäytössä 1873. [KE, History ja Modern period]
- Notre-Dame d'Afrique oli avattu **1872**, siis ennen vuoden 1873 kehystä. Rakennuksen tämänpäiväisiä sisämaalauksia ei saa siirtää tuohon vuoteen. [ND, History; NO, Origines]
- Hamma-koepuutarha oli perustettu 1800-luvun alkupuolella ja kasvanut taimitarhaksi ennen 1873:a. Nykyisten puiden ikää, nykyistä näyttely- tai eläinkokoelmaa tai nykyistä puistosuunnitelmaa ei samasteta tuon vuoden puutarhaan. [HG, History]
- Metro, nykyinen lentoasema ja palatsien nykyiset museotoiminnot kuuluvat nykyoppaan puolelle. Isoisälle ei keksitä käyntiä, reittiä, puhetta tai päiväkirjamerkintää. [ME; AP; MU; RA]

## 1. Perusfaktat

- **Nimi:** suomeksi Alger; kaupungin arabiankielinen nimi al-Jazāʾir / El Djazaïr, ranskaksi Alger. Arabiankielinen nimi tarkoittaa saaria ja viittaa rannikon vanhoihin saariin. Saarien täsmällistä määrää tai yhdistämisvuotta ei käytetä. [AL, Toponymy and name origin; VO, Understand]
- **Asema:** Algerian pääkaupunki ja Välimeren satamakaupunki maan pohjoisrannikolla Algerin lahden äärellä. Kaupunki ulottuu usean kunnan alueelle. [AL, johdanto; FI, johdanto]
- **Paikan synty:** antiikin aikana samalla paikalla oli Ikosim / Icosium; nykyisen vanhankaupungin alku liittyy Buluggin / Bologhin ibn Ziriin ja 900-luvun ziridikauteen. Tarkkaa perustamisvuotta ei käytetä, ks. 8. [AL, Early history ja Medieval history; CAS, The Zirid period]
- **Kaupungin ilme:** valkeaksi kalkitut rakennukset, meren ylle nouseva vanha kaupunki ja rannan myöhemmät bulevardit. Valkoisiin rakennuksiin liittyy nimitys Alger la Blanche. [AL, Toponymy and name origin; CAS, Location and topography]
- **Casbah:** nimi merkitsi alun perin linnoitusta ja laajeni tarkoittamaan vanhaakaupunkia. Kyse on edelleen asutusta kaupunginosasta, ei vain museosta. [CAS, Toponymy; UN, Brief synthesis ja Integrity]
- **Väestö:** käytettävä muoto **Alger-wilayassa noin kolme miljoonaa asukasta vuoden 2008 laskennassa**. K:n tarkistettu arvo 2 988 145 koskee wilayaa, ei Algerin erillistä kuntaa eikä pelkkää taajamaa. K antaa erikseen Grand Alger -taajaman luvun mutta sitä ei sekoiteta wilayan lukuun. Lähdeketju: ONS, RGPH 2008, *Armature urbaine* (julkaistu 2011), K:n asukaslukumuistio. [K, kevytSisalto.asukkaat; alkuperäisen julkaisun osoite https://www.ons.dz/IMG/pdf/armature_urbaine_2008.pdf on kontekstista, sitä ei haettu A-vaiheessa uudelleen]
- **Pallokoordinaatti:** käytetään K:n `lat:36.7764, lon:3.0586`-arvoja. WD/Q3561:n P625 tukee samaa kaupungin yleispistettä; kohdekartta keskitetään Casbahiin eikä tähän yleispisteeseen. [K; WD]
- **Artikkeliavain:** `Alger` (fi-Wikipedian otsikko). **Ambience-ehdotus:** `satama` tai `basaari`; ensimmäinen vastaa lehden rannikon painotusta. [FI; K; valinta on toimituksellinen]

## 2. Kansi — johdanto ja neljä nostoaihetta

**Johdantoehdotus:** Alger nousee valkeina taloina Välimeren ylle, mutta rannalta näkyvä julkisivu on vasta kaupungin ulkokuori. Casbahin kujilla vanha linnoitus, palatsit ja sisäpihat paljastavat toisen Algerin. [AL; CAS; UN]

### K1 — Saaret, jotka jäivät nimeen

Wiki-otsikko `Algiers`. Lähde: AL, Toponymy and name origin sekä Early modern history; CAS, Location and topography ja The Zirid period.

1. Arabiankielinen al-Jazāʾir tarkoittaa saaria.
2. Nimi viittaa kaupungin rannikon vanhoihin saariin, ei kaupungin nykyiseen sijaintiin saarella.
3. Saaret liittyivät varhaisen sataman paikkaan ja laivojen suojaan.
4. Rannikon saaria yhdistettiin myöhemmin sataman yhteyteen; tarkkaa määrää tai vuosilukua ei tarvita.
5. Antiikin nimet Ikosim ja Icosium edelsivät nykyistä nimeä.
6. Valkoiseksi kalkitut talot puolestaan ovat nimityksen Alger la Blanche taustalla. Älä johda valkeudesta ilmastovaikutusta tai omaa syyselitystä.

### K2 — Kaupunki, joka nousee portaita

Wiki-otsikko `Casbah of Algiers`. Lähteet: CAS, Toponymy, Location and topography, Urban fabric; AL, Ottoman rule; UN, Brief synthesis.

1. Casbah muodostaa Algerin historiallisen ytimen jyrkässä merenrantamaastossa.
2. Linnoitus sijaitsee vanhankaupungin yläosassa; sen nimitys laajeni koko medinaan.
3. Kujat ovat kapeita ja mutkittelevia; mukana on umpikujia ja holvattuja käytäviä, joita kutsutaan nimellä *sabat*.
4. Yläkaupunki oli asuinaluetta, alakaupunki hallinnon, kaupan ja sataman lähellä.
5. Casbah ei ole autolla läpiajettava kortteliverkko; toimituksia ja jätteenkuljetusta on tehty aaseilla. Älä kuvaa jokaista nykyistä toimitusta tällä tavalla. [CAS, Location and topography / Urban fabric]
6. UNESCO pitää vanhaa kaupunkia asuttuna perinnekaupungin esimerkkinä, jossa talot, palatsit, hammamit, moskeijat ja soukit liittyvät samaan kaupunkirakenteeseen.
7. Vuoden 1873 kehykseen kuuluu jo siirtomaakauden muokkaama alakaupunki. [CAS, Urban fabric; AL, French rule]

### K3 — Kortteli, jonka meri vielä löytää

Wiki-otsikko `Palais des Rais`. Lähteet: RA, johdanto, History, Colonial period; CAS, Citadel and defensive structures.

1. Palais des Rais tunnetaan myös nimellä Bastion 23.
2. Kokonaisuus on rannalla ja muodostuu historiallisista palatseista sekä vanhoista kalastajien taloista.
3. Se on säilynyt esimerkki alemman Casbahin merenrantakorttelista. Superlatiivia "viimeinen" ei tarvita ilman lähdemainintaa.
4. Alueella oli puolustusrakennus jo 1500-luvulla.
5. Ranskan ajan alakaupungin uudelleenjärjestely irrotti kokonaisuuden vanhasta kortteliympäristöstä. Tämä syy-yhteys on RA-artikkelin nimenomainen väite.
6. Rakennuksia käytettiin siirtomaakaudella eri tarkoituksiin; lähde mainitsee muun muassa konsulaatin ja kirjaston. Näitä käyttövaiheita ei ajoiteta vuoteen 1873.
7. Nykyisin kokonaisuus toimii taiteen ja kulttuurin keskuksena. [RA, After independence]

### K4 — Puutarha, jossa kokeiltiin

Wiki-otsikko `Botanical Garden Hamma`. Lähde HG, History; perustamisen varhainen 1800-luku myös TL, 1800-luku.

1. Puutarhan ranskankielinen nimi on Jardin d'essai du Hamma; *essai* merkitsee kokeilua.
2. Puutarha perustettiin 1800-luvun alkupuolella Hammaan, nykyisen Belouizdadin alueelle.
3. Sen alkuun liittyi suomaan kuivaaminen ja malliviljelmän sekä koepuutarhan perustaminen. [HG, History]
4. Se kehittyi hallinnon taimitarhaksi, joka tuotti puita julkisiin istutuksiin ja siirtomaakauden uudisasukkaille. Historiallinen käyttötarkoitus kerrotaan neutraalisti.
5. Puutarha laajeni useassa vaiheessa ennen 1873:a.
6. Auguste Hardy toimi sen johtajana 1800-luvulla; hän ei ollut yksin se henkilö, joka perusti puutarhan. [HG, History; AL:n lyhennysvirhe ks. 8]
7. Puutarha on nykyisin vierailukohde. Lajimääriä, pinta-alaa, Tarzan-anekdoottia tai kaikkien puiden ikää ei käytetä.

## 3. Teemasivu — Casbahin talojen sisällä

Vakioaihe `historia`. Sivun nimi **Casbahin talojen sisällä**. Teema käsittelee kaupungin omaa asumista ja rakennustapoja, ei Algerian maalehden musiikkia, kirjailijoita tai ruokahistoriaa.

**Johdantoehdotus:** Casbahin talo ei kerro kaikkea kadulle. Sisäänkäyntihalli, avoin sisäpiha ja katujen ylle ulottuvat huoneet jakavat niukan tilan monella tavalla. [CAS, Domestic architecture; MA; MM]

### T1 — Isossa ovessa pieni ovi

Wiki-otsikko `Dar Mustapha Pacha`. Lähteet MU, rakennuksen kuvaus; MM, Description.

1. Dar Mustapha Pachan pääoven suuressa ovilehdessä on pieni kulkuovi.
2. Ovea kehystävät pronssiniitein koristellut osat.
3. Ovesta kuljetaan *sqifa*-sisäänkäyntihalliin; palatsissa sisäänkäyntitilat jatkuvat ennen varsinaista sisäpihaa.
4. Eteisessä on holveja ja seinäsyvennyksiin sijoitettuja penkkejä (*dukkana*).
5. Oviaukoissa käytetään marmoria; palatsin sisäpihaa reunustavat marmorisarakkeiden kannattamat kaaret.
6. Gallerioiden katoissa näkyy pieniä puupalkkeja ja seinissä kaakelikoristelua.
7. Älä päättele omin päin, että mutka suojasi varkailta, verolta, tuulelta tai katseelta; näitä syitä ei luetuissa lähteissä väitetä.

### T2 — Talon keskellä on taivas

Wiki-otsikko `Dar Aziza`. Lähteet AZ, Architecture; MA, Description; CAS, Domestic architecture.

1. *Wast ad-dar* tarkoittaa talon keskustaa ja viittaa sisäpihaan.
2. Dar Azizan huoneet ja kaarikäytävät avautuvat sisäpihan ympärille.
3. Käytävien kaaria kannattavat marmorisarakkeet.
4. Koristeisiin kuuluu kaakeleita, veistettyä stukkoa, ristikkopintaisia ikkunoita ja suihkulähde.
5. Palatsi rakennettiin rinteeseen; sen alkuperäisiin alimpiin tiloihin kuului varastoja, keittiöitä ja talleja.
6. Suuri portaikko yhdisti pihan pienempään *douira*-sivurakennukseen, jota purettiin 1800-luvulla.
7. Tavallisten Casbah-talojen sisäpihat olivat perheiden yhteistä tilaa ja vastaanottopaikkoja; valoa tuli tyypillisesti pihan kautta. [CAS, Domestic architecture]

### T3 — Talolla on lupa kurottaa

Wiki-otsikko `Casbah of Algiers`. Lähde CAS, Domestic architecture ja Typology of the medina.

1. Casbahin perinteiset talot ovat usein kiinni naapurirakennuksissa ja kääntyvät sisäänpäin.
2. *Alaoui*-talossa ei ole sisäpihaa; valoa ja ilmaa tulee ikkunoista.
3. Alaoui sopii pieneen tonttiin; alimmissa tiloissa voi olla kauppaa tai varastointia.
4. Ylemmät huoneet voivat ulottua katujen ylle ulokkeina. Lähde mainitsee tilan maksimoimisen tämän talotyypin yhteydessä.
5. *Chebk*-talo on usein suuremman talon pieni liite, jonka kapea piha sijaitsee yläkerrassa.
6. *Kbou* on huoneen kohdalta kadulle ulottuva rakennusosa portiikkotalossa.
7. Palatsit ovat samaan sisäpihan ympärille järjestymisen perinteeseen kuuluva suurempi talotyyppi; kaikki Casbah-talot eivät silti sisällä pihaa.

### T4 — Kaivosta kujan vesipisteeseen

Wiki-otsikko `Casbah of Algiers`. Lähde CAS, Hydrogeology, Domestic architecture ja The role of water.

1. Vanhan kaupungin vesihuolto yhdisti akvedukteja, säiliöitä, kaivoja ja julkisia vesipisteitä.
2. Akveduktien vesi kulki kaupungin porttien lähellä olevien säiliöiden kautta eri vesipisteisiin.
3. Talojen pihoilla oli omia kaivoja; katon sadevesiä kerättiin myös maanalaisiin säiliöihin.
4. Julkiseen juomavesipisteeseen liittyy sana *sabil*, Algerin paikannimissä usein *sebala*; lähde yhdistää vesipisteiden rakentamisen julkiseen anteliaisuuteen.
5. Vesipisteiden nimissä elää kaupungin paikallista muistia, vaikka kaikki vanhat vesipisteet eivät enää toimi.
6. Vanhan kaupungin alla oli tiilirakenteinen viemäriverkosto, jonka putkissa käytettiin yhteen sovitettavia keramiikkaosia. [CAS, Domestic architecture]
7. Ei määrälukuja akvedukteista, kaivoista, vesipisteistä tai niiden syvyyksistä; ei parantavia vaikutuksia tosiasioina.

**Minitehtävän aihe:** mikä Casbahin talotyyppi saa valoa ja ilmaa ikkunoista, koska sillä ei ole sisäpihaa? Oikea `alaoui`, vääriksi esimerkiksi `chebk`, `portiikkotalo`, `palatsi`. Tieto löytyy T3:sta. Selitys ei kopioi nostovirkettä: "Alaoui-talossa sisäpihan tehtävä jää ikkunoille, kun rakennus sovitetaan pieneen tonttiin." [CAS, Domestic architecture] Viimeisen lauseen ei pidä väittää, että tontin pienuus olisi yksin syy pihan puuttumiseen; turvallisempi valmis fakta on "Alaoui-talossa valo ja ilma kulkevat ikkunoista, kun sisäpihaa ei ole."

## 4. Matkaopas — viisi jaksoa

Opas on nykytietoa. Hinnat, aukioloajat, matkustusajat, lentoreitit ja kaluston määrät jätetään pois.

### O1 — Perille ja liikkeelle

- Algerin lentoasema on **Houari Boumediene Airport (ALG)**. [AP, johdanto / infolaatikko; VO, By plane]
- Lentoasemalta on takseja ja lähijunayhteys Algerin seudulle. Reittien ja vuorojen tämänhetkistä tiheyttä ei luvata. [VO, Airport transfer]
- Kaupungissa on metro, raitiovaunu, bussit ja taksit. [VO, Get around; ME]
- Place des Martyrs -metroasema on Casbahin alareunan lähellä; raitiovaunu palvelee itäisempiä kaupunginosia eikä kierrä vanhankaupungin kujia. [VO, By metro ja By tram; ME, asemaluettelo]
- Casbahin vanhoja kujia tutkitaan kävellen. Rinne ja portaat on syytä ottaa huomioon reittiä suunnitellessa. [CAS, Location and topography; VO, On foot]

### O2 — Casbah sisäänkäynnistä sisäpihaan

- Historiallinen ydin yhdistää vanhoja moskeijoita, palatseja ja edelleen asuttuja katuja. [UN, Brief synthesis]
- Ketchaoua on Casbahin alareunassa; Dar Aziza on sen lähellä. Dar Mustapha Pachan palatsissa toimii miniatyyri-, illuminointi- ja kalligrafiamuseo. [KE, johdanto; AZ, History; MU, johdanto]
- Casbahin linnoitus kohoaa vanhankaupungin yläosassa. [CAS, Citadel and defensive structures]
- Paikallisen oppaan käyttö on Casbahissa perusteltu käytännön suositus; se esiintyy UM:n ajantasaisessa matkustustiedotteessa. [UM, Casbahia koskeva kappale]
- Muotoile kohta opassuositukseksi, ei väitteeksi koko kaupungin vaarallisuudesta. Vanha kaupunki on myös asukkaiden koti; kuvat ja yksityispihoihin meneminen edellyttävät paikallisten ohjeiden ja lupien kunnioittamista. Jälkimmäinen on toimituksellinen käytännön neuvo, ei tiettyä lainsäädäntöä koskeva väite.

### O3 — Merenranta ja vihreä Hamma

- Palais des Rais liittyy vanhan kaupungin merenrantahistoriaan ja toimii nykyisin taiteen ja kulttuurin keskuksena. [RA, johdanto ja After independence]
- Jardin d'essai du Hamma on kaupungin kasvitieteellinen puutarha, joka perustettiin jo 1800-luvulla. [HG]
- Puutarha sijaitsee Casbahin eteläpuolella Belouizdadin kaupunginosassa; sitä ei sisällytetä pieneen Casbah-kohdekarttaan. [HG, johdanto; karttarajaus toimituksellinen]
- Notre-Dame d'Afrique kohoaa kaupungin pohjoispuolen kukkulalla meren ylle ja tarjoaa näkymän Algerin lahteen. [ND, Location]
- Kirkko valmistui 1872 ja oli siten olemassa jo 1873. [ND, History; NO, Origines]
- Kirkon kaapelihissin toiminnasta lähteissä on eri-ikäisiä tietoja; opas ei lupaa toimivaa hissiyhteyttä. [AL, district-kuvaus; ND, Location]

### O4 — Mitä täällä syödään

- *Bourek* on ohueen *dyoul*-taikinalevyyn tehty suolainen täytetty leivonnainen. [BO, johdanto]
- Täytteet vaihtelevat; lähde mainitsee muun muassa perunaa, sipulia, lihaa, kanaa, katkarapuja ja juustoa. Näitä ei esitetä yhtenä pakollisena reseptinä. [BO]
- Bourekia syödään alkupalana tai välipalana; sitä on ruokapaikoissa ja katuruoassa eri puolilla Algeriaa. [BO, tarjoilu]
- Chorba on keittoperhe; Algerian ruokaperinteessä keittoa tarjoillaan usein aterian alussa. [AC, Starters and appetizers ja Soups]
- Algerialaisissa salaateissa käytetään esimerkiksi paahdettua paprikaa, tomaattia, sipulia ja oliiviöljyä. [AC, Starters and appetizers]
- Tämä on lyhyt käytännön ruokavalinta, ei maalehden kuskusjyvien pyörittämisen, juhla-nuudelien, taatelien tai viinihistorian uusinta. Älä väitä kaikkia näitä ruokia Algerissa syntyneiksi. [K]

### O5 — Milloin kannattaa tulla

- Algerin ilmasto on välimerellinen. [AL, Climate, laadullinen luonnehdinta]
- Sateet painottuvat syksystä kevääseen. [AL, Climate, laadullinen teksti]
- Kuumuus voi rasittaa kävelyä; mukana kannattaa pitää juomavettä. [VO, On foot]
- Oppaaseen voi ottaa nämä laadulliset havainnot, mutta **ei lämpötila-, sade- tai ilmastoäärilukuja**, koska hyväksyttyä `saa.json`:ia ei ole.
- Aikataulun joustavuus on oma käytännön suositus; kevättä tai syksyä ei julisteta lähteettömästi kaupungin ainoaksi tai parhaaksi matkustusajaksi.

**Parasta (viisi toimituksellista valintaa, tähdet eivät ole lähdefaktoja):**

1. Casbahin kujat — 3 tähteä: asuttu vanha kaupunki rinteessä. [CAS; UN]
2. Dar Mustapha Pacha — 3 tähteä: historiallinen palatsi ja nykyinen kalligrafian / miniatyyrien museo. [MU; MM]
3. Palais des Rais — 3 tähteä: vanhan kaupungin merenrantakorttelin säilynyt kokonaisuus. [RA]
4. Hamma-puutarha — 2 tähteä: 1800-luvun koepuutarhasta kehittynyt nykyinen kasvitieteellinen vierailukohde. [HG]
5. Notre-Dame d'Afrique — 2 tähteä: historiallinen kukkulakirkko ja näkymä lahdelle. [ND; NO]

**Hyvä tietää (neljä riviä):**

1. **Kujilla oppaan kanssa:** Casbahissa kannattaa käyttää paikallista opasta; kävelyretket päiväsaikaan. [UM]
2. **Portaat ja rinne:** vanhankaupungin kapeat reitit vaativat kävelyä; eivät muodosta esteetöntä autolla kierrettävää keskustaa. [CAS, Location and topography; VO, On foot]
3. **Pukeutuminen ja kuvaaminen:** peittävä pukeutuminen sopii vierailuun; noudata paikallisia kuvauskieltoja ja pyydä ihmisiltä lupa. UM mainitsee kuvausrajoitukset sekä olkapäiden ja polvien peittämisen suosituksen. Älä kirjoita yleistä kieltoa tavallisten historiallisten rakennusten kuvaamiselle. [UM, Maan lait ja käytännöt]
4. **Matkan valmistelu:** varmista maahantuloehdot ennen matkaa ja tarkista ajantasainen matkustustiedote; Algeriaa koskeva taso luettaessa oli erityinen varovaisuus. [UM, Turvallisuustaso ja Maahantulosäännökset]

**Turvallisuus:** UM:n 11.10.2026 luettu tiedote sanoo "Noudata erityistä varovaisuutta". Sen Casbah-kappale suosittelee paikallista opasta. Pelaajalle sopiva muoto: "Algerissa matkailu edellyttää tavallista huolellisempaa suunnittelua; Casbahissa kannattaa kulkea päiväsaikaan paikallisen oppaan kanssa." Ei rikoslukuja, nykypolitiikkaa, sisämaan tilanteen yksityiskohtia tai yleistä väitettä koko kaupungin matkustuskiellosta.

**Säärivi:** `saatiedot: null`. Pääagentin alkuperäinen `tyokalu.mjs saa` -ajo hylkäsi Algerin ilmastotaulukon, koska kuukausien summa ei vastannut vuosisaraketta; `saa.json` ei syntynyt. A ei kopioinut taulukkolukuja käsin eikä käyttänyt korvaavaa sääpalvelua. Jos pääsessio saa myöhemmin hyväksytyn `saa.json`:in alkuperäisellä työkalulla, sen tausta ja ilmastotekstit tarkistetaan uutena vaiheena.

## 5. Kohdekartta — seitsemän kohdetta historiallisesta ytimestä

Rajaus ankkuroitu Casbahiin, ei K:n kaupungin yleispisteeseen. **Ehdotus:** pohjoinen `36.79120`, etelä `36.78170`, länsi `3.05150`, itä `3.06770`. Rajat kattavat alla olevat lähdepisteet ja niiden ympärille suunnilleen 300 metrin marginaalin. Hamma-puutarha ja Notre-Dame d'Afrique ovat oppaan kohteita tämän rajauksen ulkopuolella.

**Esittelyehdotus:** Casbahissa Algerin historia näkyy sekä kadulla että rakennusten sisällä. Linnoituksesta rannalle kulkeva vanha kaupunki yhdistää moskeijat, palatsit ja asuinkorttelit. [CAS; UN]

| # | Täsmällinen suomenkielinen nimi | Tyyppi | lat | lon | Koordinaattilähde | Aika-kenttä |
|---|---|---|---|---|---|---|
| 1 | Casbahin linnoitus | rakennus | 36.78444 | 3.05500 | WD/Q12232990, P625, Palace of the Dey | 1500-luku |
| 2 | Ketchaoua-moskeija | rakennus | 36.78500 | 3.06056 | WD/Q2471799, P625; KE:n koordinaatti yhtäpitävä | 1600-luku; nykyinen rakennus 1800-luvulta |
| 3 | Dar Mustapha Pacha | rakennus | 36.78566 | 3.06084 | MU:n artikkelikoordinaatti; WD/Q30624915 antaa saman arvon | 1700-luvun loppu |
| 4 | Djamaa el Djedid | rakennus | 36.78490 | 3.06301 | WD/Q12192958, P625; DJ:n artikkelipiste | 1600-luku |
| 5 | Djamaa el Kebir | rakennus | 36.78528 | 3.06417 | WD/Q2386475, P625; DK:n artikkelipiste | 1000-luku; myöhempiä lisäyksiä |
| 6 | Raïsien palatsi | rakennus | 36.78840 | 3.06410 | RA:n artikkelin koordinaatti; WD/Q3361082:ssa läheisiä eri pisteitä, ks. 8 | 1500–1700-luvut |
| 7 | Sidi Abderrahmanen mausoleumi | rakennus | 36.78846 | 3.05956 | SI:n artikkelikoordinaatti; WD/Q53673328:ssa läheinen eri piste, ks. 8 | 1400-luvun hautapaikka; mausoleumi 1600-luvulta |

Koordinaattien lähdehaun osoitteet: `https://www.wikidata.org/wiki/Special:EntityData/<Q-tunnus>.json`. Jokainen yllä mainittu entiteetti haettiin erikseen 11.10.2026. Pisteitä ei ole siirretty kartalla oletetun rakennuskeskuksen perusteella. Dar Mustapha Pachan koordinaatin Wikidata-tarkkuusmerkintä on karkea; arvo valittiin artikkelin koordinaatista, ja mahdollinen myöhempi paikkatietokorjaus on kirjattava, ei pääteltävä.

### 5.1 Casbahin linnoitus

Wiki `Palace of the Dey`; täydentävä CAS, Citadel and defensive structures. Juttu 700–1400 merkkiä, kuva historiallisesta rakennuskokonaisuudesta.

1. Linnoitus sijaitsee vanhankaupungin korkealla puolella ja antoi Casbahille sen nimen. [CAS, Toponymy ja Citadel and defensive structures]
2. Kokonaisuus rakennettiin osmanikaudella 1500-luvulla. Tarkka valmistumisvuosi on ristiriitainen. [DE, johdanto; CAS]
3. Deyt siirsivät hallintonsa ja asuinpaikkansa linnoitukseen 1800-luvun alkupuolella aiemmasta Djenina-palatsista. Tarkka siirtymisvuosi jätetään pois. [DE, History; CAS, The regency of Algiers]
4. Kompleksiin kuului hallitsijan palatsin lisäksi moskeijoita, kylpytiloja, puutarhoja ja puolustusrakennuksia. [CAS, Citadel and defensive structures]
5. Palatsin huoneet, keittiöt ja hammamit liittyivät sisäpihan ympärille rakentuvaan kokonaisuuteen. [DE, Architecture]
6. Koristelussa käytettiin keramiikkaa; lähde kuvaa maurilaisen, osmanisen ja eurooppalaisen arkkitehtuurin yhdistelmää. [DE, Architecture]
7. Ranskan siirtomaakaudella tie halkaisi linnoituskokonaisuuden. Tien rakentamisvuotta tai tätä muutosta juuri ennen 1873:a ei väitetä. [CAS, Citadel and defensive structures]
8. **1873:** linnoitus oli olemassa, mutta Alger oli jo Ranskan siirtomaavallan alainen. Nykyistä museokäyntiä ei kuvailla isoisän reittinä. [DE; AL, French rule]

### 5.2 Ketchaoua-moskeija

Wiki `Ketchaoua Mosque`; CAS, Mosques. Juttu erottaa paikan alkuperäisen moskeijan, 1800-luvun katedraalin ja nykykäytön.

1. Ketchaoua sijaitsee Casbahin alareunassa, sen portaiden lähtöalueella. [KE, johdanto]
2. Moskeijan dokumentoitu alku kuuluu 1600-luvulle; tarkkaa alkuvuotta ei käytetä. [KE, Origins]
3. Ranskan siirtomaakauden alussa moskeija muutettiin Saint-Philippen katedraaliksi. [KE, Modern period]
4. Vanhaa rakennusta purettiin ja paikalle tehtiin nykyisen ulkoasun perustana oleva katedraali 1800-luvun puolivaiheilla. [KE, Modern period]
5. Nykyisin rakennus toimii jälleen moskeijana. [KE, johdanto]
6. Julkisivun sisäänkäyntiin noustaan portaita; sisäänkäyntiä kehystävät minareetit. Portaiden ja minareettien määriä ei tarvitse käyttää. [KE, Architecture]
7. Marmorisarakkeet ja maurilaisia sekä bysanttilaisia piirteitä yhdistävä koristelu kuuluvat lähteen rakennuskuvaukseen. Älä samasta koko nykyistä julkisivua alkuperäiseen 1600-luvun moskeijaan. [KE, Architecture]
8. **1873:** rakennus oli katolinen katedraali, ei moskeijakäytössä. Tämä on jutun keskeinen ajallinen ero. [KE, Modern period]

### 5.3 Dar Mustapha Pacha

Wiki `Dar Mustapha Pacha`; MM, Description ja How Monument was dated.

1. Palatsi sijaitsee Casbahissa ja rakennettiin Mustapha Pachalle 1700-luvun lopulla. [MU; MM]
2. Rakennuksessa toimii nykyisin miniatyyrien, illuminoinnin ja kalligrafian kansallismuseo. Älä kuvaa suojattuja nykyteoksia; rakennuksen historiallinen sisäpiha tai sisäänkäynti sopii. [MU, johdanto]
3. Suuren sisäänkäyntioven sisään on sovitettu pienempi ovi, ja ovessa on pronssiniittikoristelua. [MM, Description]
4. Sisäänkäyntihalleissa on holveja ja penkkisyvennyksiä. [MU; MM]
5. Sisäpihaa ympäröivät marmorisarakkeiden kannattamat kaarikäytävät. [MU; MM]
6. Seinissä on kaakeleita ja ovissa marmorikehyksiä; gallerioiden katoissa puupalkkeja. [MU; MM]
7. Sisäpihan ympärillä olevista gallerioista avautuu suuria huoneita. [MM, Description]
8. **1873:** palatsi oli jo olemassa; sen nykyinen museo ei kuulu vuoden 1873 kuvaukseen. [MU; CAS, Museums and cultural institutions, nykyinen museotoiminta]

### 5.4 Djamaa el Djedid

Wiki `Djamaa el Djedid`; MJ, Description.

1. Nimi tarkoittaa Uutta moskeijaa; kyseessä on silti osmanikauden 1600-luvun rakennus. [DJ, History; MJ]
2. Rakennus sijaitsee Place des Martyrs -aukion merenpuoleisessa laidassa. [DJ, Architecture]
3. Sitä kutsuttiin kalastajien moskeijaksi sataman yhteyden vuoksi. [DJ, Architecture; MJ, Also known as]
4. Keskellä on suuri kupoli ja sen ympärillä pienempiä kupoleita sekä holvattuja osia. [DJ; MJ]
5. Kupolien osmaniset piirteet yhdistyvät nelikulmaiseen pohjoisafrikkalaiseen minareettiin. [DJ, Architecture]
6. Sisäkoristelu yhdistää eri arkkitehtuuriperinteitä; lähde mainitsee andalusialaisen rukoussyvennyksen ja italialaisen marmorin saarnatuolissa. [DJ, Architecture]
7. Minareetin kello oli lähteen mukaan peräisin Djenina-palatsista. Kellon siirtovuotta ei käytetä. [DJ, Architecture]
8. **1873:** tämä moskeija oli jo olemassa. Arkkitehdin kristillinen ristisymboli esitetään lähteessä myyttinä, joten se jätetään jutusta kokonaan pois. [DJ, History; MJ, Description]

### 5.5 Djamaa el Kebir

Wiki `Djamaa el Kebir`. Nimeä ei lyhennetä epämääräiseksi "Suureksi moskeijaksi", koska kaupungissa on myös moderni Djamaa el Djazaïr.

1. Djamaa el Kebir on keskiaikainen moskeija sataman lähellä, Casbahin historiallisessa ytimessä. [DK, johdanto ja Geography]
2. Alkuperäinen rakennus kuuluu almoravidikaudelle ja 1000-luvun loppuun. [DK, History]
3. Saarnatuolin kirjoitus todistaa rakennuksen varhaisesta vaiheesta; tarkkaa valmistumisvuotta ei käytetä. [DK, History ja The minbar]
4. Moskeijan osia on rakennettu uudelleen eri aikoina; minareetti on keskiaikainen myöhempi lisäys. [DK, History ja Exterior]
5. Rukoussalin valkoiset pilarit ja hevosenkenkäkaaret jakavat tilan pitkittäisiin käytäviin. [DK, Interior]
6. Ulkopuolelle lisättiin kaarikäytävä Ranskan siirtomaakauden alkupuolella; siinä hyödynnettiin puretun al-Sa'ida-moskeijan marmorisarakkeita. [DK, Exterior]
7. Alkuperäinen puinen minbar liikkui pyörillä, ja se on nykyään Algerin antiikin ja islamilaisen taiteen museossa; paikan nykyistä saarnatuolia ei samasteta alkuperäiseen. [DK, Interior ja The minbar]
8. **1873:** moskeija ja sen 1800-luvun alkupuolen kaarikäytävä olivat jo olemassa. [DK, History ja Exterior]

### 5.6 Raïsien palatsi

Wiki `Palais des Rais`; CAS, Citadel and defensive structures.

1. Palais des Rais / Bastion 23 on historiallisten rakennusten kokonaisuus aivan merenrannalla. [RA, johdanto]
2. Kompleksiin sisältyy palatseja ja vanhoja kalastajien taloja; niiden tarkkoja määriä ei käytetä. [RA]
3. Alueen puolustusrakenteen historia alkaa 1500-luvulta; palatsiosat ovat nuorempia. [RA, History]
4. Kokonaisuus kuuluu alemman Casbahin merenrantaperintöön, jota rantakortteleiden uudelleenjärjestely muutti. [RA, johdanto]
5. Siirtomaakaudella rakennusten käyttötavat vaihtelivat asuin-, konsulaatti- ja kirjastokäytöstä muihin tarkoituksiin. [RA, Colonial period]
6. Palatsien numerointi ja Bastion 23 -nimi liittyvät Ranskan ajan kartoitukseen ja puolustusrakenteisiin. [RA, History]
7. Restauroinnin jälkeen kokonaisuus toimii nykyään taiteen ja kulttuurin keskuksena. Tarkkaa avausvuotta ei käytetä. [RA, After independence]
8. **1873:** vanha merenrantakokonaisuus oli olemassa, mutta jonkin tietyn rakennuksen käyttötapaa juuri tuona vuonna ei ole tässä aineistossa varmistettu. [RA, History ja Colonial period]

### 5.7 Sidi Abderrahmanen mausoleumi

Wiki `Zawiya Thaalibia (Algiers)`; CAS, Madrasas and mausoleums. Nimi avaimena **Sidi Abderrahmanen mausoleumi**; kuvan täytyy näyttää hautarakennus tai sen rakennuskokonaisuus, ei vain viereisen madrassan julkisivua.

1. Kohde liittyy Sidi Abd al-Rahman al-Tha'alibiin, jota Algerissa pidetään kaupungin suojeluspyhimyksenä. [CAS, Madrasas and mausoleums]
2. Hautapaikan ja uskonnollisen yhteisön juuret ovat 1400-luvulla; nykyisen historiallisen mausoleumin arkkitehtuuri liittyy myöhempään 1600-luvun vaiheeseen. Tarkka kuolin- tai perustamisvuosi jätetään pois lähderistiriitojen vuoksi. [SI, Presentation; CAS]
3. Zawiya-kokonaisuus käsittää mausoleumin ohella moskeijan ja hautausmaata. [SI, Compartments; CAS]
4. Mausoleumin sisustukseen kuuluu koristeellisia kalligrafisia tekstiaiheita. [CAS, Madrasas and mausoleums]
5. Kompleksiin liittyvässä moskeijassa on kupoleita ja koristeltu minareetti. [CAS, Mosques]
6. Hautausmaalle on haudattu myös muita Algerin historian henkilöitä. Nimiä tai lukumääriä ei tarvitse luetella. [CAS, Madrasas and mausoleums]
7. Vieressä oleva Thaâlibiyya-madrassa on myöhempi, 1900-luvun alun rakennus; sitä ei siirretä vuoteen 1873 eikä käytetä mausoleumin kuvatekstin kohteena. [CAS, Madrasas and mausoleums]
8. **1873:** hautapaikka, mausoleumi ja moskeijakokonaisuuden vanhat osat olivat olemassa. Myöhempi madrassa ja mahdolliset nykyiset lisärakenteet erotetaan niistä. [CAS; SI]

## 6. Kysymysaiheet ja tiedot

Kaikkien vastausten pitää löytyä lopullisesta artikkelista, kannesta, oppaasta tai kohdejutusta. Alla vain aiheet ja oikeat vastaukset; kirjoittaja laatii uskottavat, suunnilleen yhtä pitkät väärät vaihtoehdot.

| # | Taso | Kysymysaihe / oikea vastaus | Lähde | Missä vastauksen tulee esiintyä |
|---|---|---|---|---|
| 1 | 1 | Minkä meren rannalla Alger on? → Välimeren | AL, johdanto | artikkeli / K1 |
| 2 | 1–2 | Mitä al-Jazāʾir tarkoittaa? → saaria | AL, Toponymy and name origin | K1 |
| 3 | 2 | Mihin Casbah-nimi alun perin viittasi? → linnoitukseen | CAS, Toponymy; UN, Brief synthesis | K2 / artikkeli |
| 4 | 2 | Mikä Hamma oli alkujaan? → koepuutarha ja malliviljelmä | HG, History | K4 |
| 5 | 3 | Missä käytössä Ketchaouan rakennus oli 1873? → katolisena katedraalina | KE, Modern period | O2 ja kohdejuttu 5.2 |

**Kolme tiesitkö-aihetta:**

1. Djamaa el Djedidin kupolit ovat osmanityylisiä, mutta sen minareetti noudattaa pohjoisafrikkalaista nelikulmaista perinnettä. [DJ, Architecture]
2. Dar Mustapha Pachan suureen sisäänkäyntioveen on sovitettu pieni kulkuovi. [MM, Description]
3. Djamaa el Kebirin vanha puinen saarnatuoli oli pyörillä liikuteltava; nykyään sitä säilytetään museossa. [DK, The minbar]

Näihin ei kirjoiteta isoisän ääntä. Minitehtävä käsittelee alaoui-talon ikkunavaloa eikä kysy näistä visa-aiheista yhtäkään.

## 7. Kuvatarpeet kuvatoimittajalle

Tämä on aihelista, ei Commons-kuvien valinta tai lisenssihyväksyntä. B tarkistaa tiedostot, kaupallisen käytön, teostyypin panoraamavapauden tai historiallisen rakennuksen vapautumisen, tekijän, vähintään 1200 pikselin leveyden sekä sisällön silmin. Suojatut modernit teokset, uudenaikaiset moskeijat, muistomerkit, näyttelyteokset ja kirkon myöhemmät sisämaalaukset eivät kuulu valintoihin. Sama tiedosto vain yhteen käyttöön.

| Kohta | Aihe / hakuavain | Rajaus |
|---|---|---|
| Kansi 1 | Casbah / Algiers white city panorama | laaja näkymä valkeaan vanhaankaupunkiin; rakennukset ympäristössään |
| Kansi 2 | Palais des Rais waterfront / Algiers harbour old city | laaja rannikon historiallinen näkymä; ei yksityiskohta eikä kuvan selitteessä viereisen rakennuksen historia |
| Kansi 3 | Notre Dame d'Afrique exterior panorama | kirkko ympäristössään ja meren suhde; historiallinen ulkoarkkitehtuuri, ei modernia sisämaalausta |
| K1 nosto | Algiers old harbour islands / historical map | vanhan sataman historiallinen kuva tai kartta; ei keksitä saarien nykyistä erillisyyttä |
| K2 nosto | Casbah Algiers stairs sabat alley | kujat / portaat / holvikäytävä; ei tunnistettavia kasvoja |
| K3 nosto | Palais des Rais exterior or historic courtyard | eri tiedosto kuin kansi, kertoo samasta rakennuskokonaisuudesta; aihetoisto perusteltu kokonaiskuvan ja rakennusjutun eri tarkoituksella |
| K4 nosto | Jardin d'essai du Hamma old garden / botanical avenue | historiallinen puutarha tai kasvillisuus; ei kuvatekstiä kaikista nykyisistä puista 1800-luvun istutuksina |
| T1 nosto | Dar Mustapha Pacha entrance door sqifa | historiallinen sisäänkäynti / eteinen; ei suojattua museoteosta |
| T2 nosto | Dar Aziza patio | sisäpiha, suihkulähde tai marmorigalleria |
| T3 nosto | Casbah Algiers overhanging house kbou | rakennusuloke tai perinteinen talo; nimeä juuri kuvassa tunnistettava rakenne, ei arvaa alaoui-tyyppiä pelkän kuvan perusteella |
| T4 nosto | Casbah old fountain well Sidi Mhamed Cherif | historiallinen kaivo tai juomavesipiste; varmista nimi, älä kirjoita juomakelpoisuutta tai toimivuutta näkemättä |
| Matkailijalle | Casbah Algiers vertical alley palace | tuore maltillinen pystykuva, w/h 0,60–0,85 |
| O1 jakso | Algiers historic railway station exterior / old-city metro entrance without artwork | tuore liikkumista selittävä kuva; historiallinen asemarakennus tai arkinen katunäkymä mieluummin kuin moderni tekijänoikeudellinen arkkitehtuuri |
| O2 jakso | Ketchaoua exterior / Casbah street | tuore kuva; sama tiedosto ei käy kohdejuttuun |
| O3 jakso | Jardin d'essai du Hamma current vegetation | tuore puutarhakuva ilman suojattua veistosta |
| O4 jakso | Algerian bourek on plate | ruoka ilman pakkausta, mainosta tai tunnistettavaa syöjää; kuvateksti kertoo bourekista |
| O5 jakso | Algiers coast or historic-city landscape | tarvittaessa kuvaton; enintään kaksi oppaan jaksoa saa jäädä kuvattomiksi |
| Kohde 1 | Palace of the Dey Algiers citadel | vanha linnoitus / historiallinen piha |
| Kohde 2 | Ketchaoua Mosque exterior | nykyinen moskeijakäyttö ja historiallinen rakennus; ei kuvatekstiä alkuperäisenä 1600-luvun julkisivuna |
| Kohde 3 | Dar Mustapha Pacha courtyard | historiallinen piha ilman näyttelyteoksia |
| Kohde 4 | Djamaa el Djedid | kupolimoskeija ja nelikulmainen minareetti |
| Kohde 5 | Djamaa el Kebir | vanha keskiaikainen moskeija; ei Djamaa el Djazaïr |
| Kohde 6 | Palais des Rais Bastion 23 | rakennuskokonaisuuden historiallinen arkkitehtuuri |
| Kohde 7 | Sidi Abderrahmane mausoleum Algiers | mausoleumi tai sen vanha moskeijakokonaisuus; viereinen madrassa on eri rakennus |
| Valokuva | Algiers photochrom 1890s Casbah harbour / Notre Dame Afrique | ensisijaisesti PD-vedos ≤1900 ja ≥1200 px; vaihtoehtona nykykuva |
| Ennen–nyt | sama tarkasti tunnistettava Casbah/ranta/kirkko | vain jos kelvollinen vanha vedos löytyy; vastinparin täytyy näyttää sama paikka, nykykuva eri tiedosto kuin muissa kohdissa |

Lisätyt piirrokset, tekstit, arkistoleimat, kehykset ja vesileimat hylätään reseptin mukaan. Historian kuvien ja oppaan tuoreiden kuvien roolit pidetään erillään.

## 8. Ristiriidat, epävarmat ja ratkaisut

1. **Nykyisen medinan perustaminen:** AL antaa 972; CAS antaa johdannossa 944 sekä historiaosissa 960. Ratkaisu **900-luku / 10. vuosisata**, ei yhden vuoden hiljaista valintaa. Antiikin sataman tarkka alku on myös epävarma; puhutaan antiikin satamasta ilman täsmällistä vuosisataa.
2. **Casbahin linnoitus:** AL:n kohdekuvauksessa / aikajanassa esiintyy 1500-luvun eri vuosia; CAS:ssa on 1516–1592 ja muualla 1597, DE sanoo 1500-luvun. Hallinnon siirrossa CAS antaa 1817, DE 1818. Ratkaisu **1500-luku** ja **1800-luvun alku**, ei tarkkaa rakennus- tai siirtymisvuotta.
3. **Ketchaoua:** KE:n johdanto liittää 1600-luvun rakentamisen Hayreddin Barbarossaan, mikä on artikkelin henkilökronologian kanssa mahdoton; tätä tekijää ei käytetä. Alkuperäisen moskeijan vuosi esiintyy eri yhteyksissä 1611/1612, jälleenrakennus 1793/1794. Nykyisen katedraalirakennuksen rajaus vaihtelee artikkelissa 1844/1845–1860. Ratkaisu **1600-luvun moskeija; nykyinen rakennus 1800-luvun puolivaiheilta; 1873 katedraali**. Artikkelin väkivalta- ja rahasummavirheitä ei käytetä.
4. **Djamaa el Djedid:** CAS:n ja MJ:n tilaajanimen / DJ:n sisäänkäynti-inskription hallitsijanimen tiedot eivät ole yhtäpitäviä; nimi jätetään nostosta pois. Vuosi DJ:ssä 1659/1660; MJ:ssä 1660, mutta DJ viittaa MJ:hin, joten ei riippumatonta kaksoisvarmistusta. Ratkaisu **1600-luku**. Ristinmuotoisen pohjakaavan kristittyä arkkitehtia koskeva kertomus on MJ:n mukaan myytti ja jätetään pois.
5. **Djamaa el Kebirin minareetti:** AL:n vanha yhteenveto antaa 1324; DK:n infolaatikko ja historian teksti 1322, mutta eräs kuvan teksti 1332. Ratkaisu **1300-luku**, ei tarkkaa vuotta. Portiikin AL/CAS/DK-vuosissa on myös eroa; **1800-luvun alkupuoli** riittää.
6. **Hamma-puutarha:** HG:n johdanto sanoo 32 ha, samassa virkkeessä 38 ha puutarhaa + 20 ha arboretumia; AL sanoo 80 ha. Lajien määrät ja varhaiset yksittäiset perustajanimet eivät ole luotettava tiivistelmä. Ratkaisu **ei pinta-alaa eikä lajimäärää**; perustaminen **1800-luvun alkupuolella**, Hardy **myöhempi johtaja**, ei perustaja.
7. **Raïsien palatsi:** RA:n varsinainen teksti, johdanto ja erillinen aikajana antavat eri tulkintoja tietyn palatsin rakentajasta, rakennusajasta sekä suojeluvuodesta. Ratkaisu **alueen puolustushistoria 1500-luvulta, palatsikokonaisuudessa myöhempiä osia**; ei täsmällisiä palatsimääriä, tekijöitä, suojeluvuotta tai tarkkaa käyttötapaa 1873.
8. **Sidi Abderrahmane:** SI:n perustamis- ja kuolinvuosi eroavat CAS:n henkilöluettelosta; hautapaikan syntyä ja nykyisen historiallisen mausoleumin rakentamista ei samasteta. Ratkaisu **1400-luvun hautapaikka, 1600-luvun mausoleumivaihe**, myöhempi madrassa erotetaan. Kuningatar Victorian kattokruunulahja jätetty pois ilman riippumatonta varmennusta.
9. **Koordinaatit:** DJ:n WD:ssä on läheisiä rinnakkaisia P625-pisteitä; valittu artikkelia vastaava `36.78490,3.06301`. RA:n artikkelipiste `36.78840,3.06410` eroaa hieman WD:n `36.78840,3.06398` ja `36.78833,3.06389` -arvoista; valittu artikkelin koordinaatti. SI:n artikkelin `36.78846,3.05956` ja WD:n `36.78792,3.05998` eroavat; valittu artikkelipiste. Molemmat vaihtoehdot on kirjattu, mitään keskipistettä ei laskettu. MU:n artikkeli ja WD ovat yhtäpitäviä, mutta WD:n tarkkuusmerkintä on karkea.
10. **Kontekstin väkiluku:** 2 988 145 / 2008 on **wilayan**, ei kaupungin erillisen kunnan eikä Grand Alger -taajaman luku. Lopputekstissä noin kolme miljoonaa, laajuus ja laskentavuosi mukana. Väkilukuun ei sekoiteta AL:n vuoden 2025 taajama-arviota.
11. **Kontekstin Notre-Dame d'Afrique (1872):** varmennettu ND+NO; ei ristiriitaa. **Kontekstin Grande Poste:** jää sivukohteeksi / pois kartalta, sen tarkkaa rakennusvuotta ei käytetä. Kuvien oikeusraja säilyy: kohteesta vain historiallista arkkitehtuuria, ei mahdollisia myöhempiä suojattuja teoksia.
12. **Säädata:** pääagentti ilmoitti alkuperäisen työkalun hylänneen taulukon kuukausisumman ja vuosisarakkeen eron vuoksi. Saatiedot `null`; ei käsin poimittuja lukuja. Laadullinen välimerellinen ilmasto on AL:n tekstistä, ei hylättyjen normaalilukujen laskelma.
13. **Kaapelihissi Notre-Dame d'Afriquelle:** AL sanoo linjan olevan pois käytöstä; ND kertoo aiemmasta yhteydestä. Ratkaisu **ei luvattua hissiyhteyttä**.
14. **Erillinen historia-artikkeli:** `History of Algiers` palautti Algiers-artikkelin, ei erillistä sisältöä. Kaupungin historia luettiin AL:n History-osiosta, CAS:n historiasta ja TL-aikajanasta.
15. **Epäonnistuneet lähdepolut:** `Palais des Raïs` ja `Jardin d'Essai du Hamma` eivät ole en-Wikipedian oikeat artikkeliotsikot; käytetty RA/HG. Muut väärät ruokanimien polut antoivat 404; niitä ei käytetä. Hamma-puutarhan oma www-domain ei ratkennut; Raïsien keskuksen robots-pyyntö antoi 301-virheen apurissa. Näitä viralliseksi ajateltuja sivuja ei luettu eikä käytetä lähteenä. Koska vuosilukuja ei tarvita, kieltoja tai epäonnistumisia ei kierretty.

## 9. Poisjätetyt aiheet ja toistot

- **Kärpäsviuhka 1827 / Bakri–Busnach:** olemassa oleva lähinosto `skandaali:karpasviuhka-1827`; ei uutta kertomusta linnoituksen jutussa eikä kannessa. [K]
- **Maalehden historia-aiheet:** toisinajattelijoita vastaanottava imaamivaltio, hallitsijan valinnut merikaupunki, sodan keskelle rakennettu emiirin valtio, itsenäistymisen kansanäänestykset ja päivämäärä — jätetään maalehteen. Algerin omat palatsit ja asuminen kantavat tämän lehden. [K]
- **Maalehden ruoka:** käsin pyöritetty kuskus, taateli, juhlan nuudeli ja viinihistoria — ei samoja nostotarinoita. Oppaassa bourek, alkupalat ja keitot ilman laajaa kansallista historiaa. [K]
- **Maalehden kirjallisuus ja musiikki:** Camus, kirjailijoiden elämäkerrat, raï, chaâbi ja laulujen kiertomatkat — ei uutta samaa nostoa. Casbahin rakennuskulttuuri on erillinen aihe. [K]
- **Koko maan eläimet, Sahara ja kansallispuistot:** eivät ole Algerin kaupungin omia aiheita. [K]
- **Nykypolitiikka, nykykonfliktit, vaalit ja rikollisuustarinat:** eivät kuulu tähän aineistoon. UM:n yleinen turvallisuus ja paikallinen opassuositus ovat vain käytännön opastietoa.
- **Maqam Echahid / Marttyyrien muistomerkki, moderni Djamaa el Djazaïr, modernit museoteokset ja muistoveistokset:** jätetty kohteista ja kuvatilauksesta pois suojattujen teosten rajan vuoksi.
- **Dar Hassan Pacha:** artikkeli on lyhyt, ja palatsikertomusten määrä olisi kasvanut suhteessa muihin kohteisiin. Dar Aziza toimii teeman sisäpihakohteena ja Dar Mustapha Pacha kartan palatsikohteena; ei keinotekoista kuuden faktan täytettä samaan pieneen alueeseen.
- **Dar Aziza karttapisteenä:** käytetään T2-noston aiheena, ei kartan lisäpisteenä Ketchaouan ja Dar Mustapha Pachan vieressä. Saman naapuruston palatseja ei kasata vain kohdemäärän vuoksi.
- **Notre-Dame d'Afrique ja Hamma kartalla:** oppaan ja kansikuvien aiheita, mutta eivät pienen Casbah-kartan historiallisessa ytimessä. Näin kartta säilyy yhtenäisenä.
- **Cervantesin vankeus, merirosvot ja sotien yksityiskohdat:** eivät ole valitun rakennus- ja asumisteeman ydintä eikä niitä tarvita maalehden rinnalle.
- **Tarzan- ja elokuva-anekdootit:** ei käytetä ilman riippumatonta varmennusta; puutarhan koetoiminta riittää kaupungin omaksi yllätykseksi.
- **Kuningatar Victorian kattokruunut sekä parantavat vesipisteet:** jätetään pois varmentamattomina anekdootteina tai uskomuksina; vesipisteiden käytännön historia riittää.

**A-vaiheen valmius:** osiot 0–9, kannen 4 ja teeman 4 faktaryhmää, oppaan 5 jaksoa / 5 parasta / 4 hyvä tietää, kartan 7 kohdetta koordinaatteineen ja 8 faktan ryhmineen, 5 kysymysaihetta / 3 tiedonaihetta sekä kuvatarpeet ovat valmiit. Sääluvut eivät kuulu hyväksyttyyn aineistoon. Vaihe B valitsee kuvat ja vaihe C kirjoittaa lopulliset mittoihin sovitetut tekstit tämän lähdepohjan rajoissa.
