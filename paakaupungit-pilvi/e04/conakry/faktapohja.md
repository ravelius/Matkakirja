# Conakry — faktapohja, vaihe A

Kaupunki `conakry`, maa `GIN`, erä `e04`. Koottu 11.10.2026. Tämä on lähteistetty työaineisto vaiheille B–E, ei valmis sisalto.json eikä toimituksen hyväksyntä. Kirjoitusoikeus on rajattu tähän faktapohjaan ja saman kaupungin muistiinpanoihin. Peliä, säädataa, muita kaupunkeja tai git-tilaa ei ole muutettu.

Luettu AGENTS.md, CODEX.md, PILVIOHJE-paakaupungit.md luvut 3, 4, 7, 8A ja 13 sekä LISÄSÄÄNTÖ; lehtityo-resepti.md:n faktakuri ja mitat; kaupunkilehti.md:n mitat, kuvat ja toistuvat virheet; spec-mantereet.md:n yhteiset linjaukset; Nairobi-faktapohjan rakenne; kaupungin konteksti.json ja saa.json. Myös e04/kuvaoikeuksien-tulkinta.md luettu: valokuvan lisenssi, kuvatun teoksen suoja ja muut rajoitukset ovat eri portteja. Sen Algeriaa ja Kap Verdeä koskevia maakohtaisia tuloksia ei sovelleta Guineaan.

Kaikki verkkolähteet noudettiin yhteisellä `valiaikainen/sallittu_haku.py`-työkalulla. Se tarkistaa robots-säännöt Claude-Userille ja Matkakirja-agentille, myös ohjauksissa, ja käyttää yhteistä yhden sekunnin hakuväliä. Omistajan hyväksymät tavalliset `/wiki/`-sivut korvasivat kielletyt raaka-/API-reitit. Wikidatassa käytettiin sallittua `/wiki/Special:EntityData/Q*.json`-reittiä. A ei tehnyt Commons-kuvahakuja.

Raakalähteet, tekstipoiminnat ja pieni lukuskripti ovat NAS-kansiossa `sessio-72-20261011/valiaikainen/conakry-A/`. URL:t, robots-tarkistukset, HTTP-tulos, aika ja SHA-256 ovat yhteisessä `valiaikainen/sallitut-haut.jsonl`:ssä. Alla ajat EEST, 11.10.2026. Jokaisen faktaryhmän hakupäivä on tämä päivä; hakuaika löytyy lähdetaulukosta.

## 0. Luetut lähteet ja 1873-kehys

Lähdetunnukset tarkoittavat vain tässä työssä avattuja ja luettuja sivuja. Samaan Wikipedia-lähteeseen perustuva kieliversio, Wikidata-tuonti tai uudelleenohjaus ei ole itsenäinen toinen varmennus tarkalle vuosiluvulle.

| Tunnus | Luettu sivu ja kieli | Osat | Hakuaika / revisio |
|---|---|---|---|
| E | [Conakry, en-Wikipedia](https://en.wikipedia.org/wiki/Conakry) | johdanto, History, Geography, Climate-taulukon otsikko, Government and administration, Economy, Transport, kulttuuri- ja paikkaluettelot | 20.48.57 / 1379002361 |
| F | [Conakry, fr-Wikipedia](https://fr.wikipedia.org/wiki/Conakry) | Géographie, Histoire, Langues, Économie, Culture, Transports | 20.49.08 / 239109307 |
| H | [Timeline of Conakry, en-Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_Conakry) | kaupungin kronologia; erityisesti Prior to 20th century ja 20th century | 20.50.00 / 1371877301 |
| T | [Tombo Island, en-Wikipedia](https://en.wikipedia.org/wiki/Tombo_Island) | koko lyhyt artikkeli ja koordinaatit | 20.49.14 / 1376064094 |
| K | [Kaloum, en-Wikipedia](https://en.wikipedia.org/wiki/Kaloum) | johdanto, sijainti ja paikalliset instituutiot; hallintolukuja ei siirretty kaupunkiluvuiksi | 20.49.13 / 1377401137 |
| L | [Îles de Los, en-Wikipedia](https://en.wikipedia.org/wiki/%C3%8Eles_de_Los) | johdanto, Geography, Tamara, Kassa, Geology, History | 20.49.12 / 1369180324 |
| LF | [Îles de Loos, fr-Wikipedia](https://fr.wikipedia.org/wiki/%C3%8Eles_de_Loos) | Géographie, saarten luettelo, Moyens de transport, Géologie, Faune et flore, Histoire | 20.50.59 / 237112585 |
| KA | [Île de Kassa, fr-Wikipedia](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Kassa) | johdanto, Géographie, Histoire, rantamaininta; saari ja saariston käsittävä kommuuni erotettu | 20.50.08 / 239404694 |
| R | [Île de Roume, fr-Wikipedia](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Roume) | johdanto, Différence et origines des noms, Géographie, Histoire | 20.50.10 / 218697404 |
| TA | [Île de Tamara, fr-Wikipedia](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Tamara) | johdanto, Géographie, Histoire; rakennusten kohdalla epävarmat luvut erotettu | 20.50.13 / 240156470 |
| P | [Port de Conakry, fr-Wikipedia](https://fr.wikipedia.org/wiki/Port_de_Conakry) | johdanto, koordinaatit, Histoire ja historiallisten näkymien ajoitus; nykypoliittisia/riitaoikeudellisia kohtia ei käytetä | 20.50.39 / 217588308 |
| G | [Conakry Botanical Garden, en-Wikipedia](https://en.wikipedia.org/wiki/Conakry_Botanical_Garden) | koko lyhyt artikkeli, kapokit, naapurit, koordinaatit | 20.50.06 / 1339638015 |
| GF | [Jardin botanique de Camayenne, fr-Wikipedia](https://fr.wikipedia.org/wiki/Jardin_botanique_de_Camayenne) | koko lyhyt artikkeli, sijainti ja Histoire | 20.50.07 / 236333252 |
| GR | [Jardin botanique de Conakry, fr-Wikipedia](https://fr.wikipedia.org/wiki/Jardin_botanique_de_Conakry) | sivu ohjaa Camayennen puutarhaan, ei erillinen puutarha eikä toinen lähde | 20.50.41 / sama 236333252 |
| M | [Sandervalia National Museum, en-Wikipedia](https://en.wikipedia.org/wiki/Sandervalia_National_Museum) | johdanto, Location, History, Collection | 20.50.05 / 1363438435 |
| A | [Ahmed Sékou Touré International Airport, en-Wikipedia](https://en.wikipedia.org/wiki/Ahmed_S%C3%A9kou_Tour%C3%A9_International_Airport) | johdanto, IATA, vanhat nimet ja sijainti; lentolistaa/poikkeustapahtumia ei käytetä | 20.50.14 / 1379527927 |
| V | [Conakry, en-Wikivoyage](https://en.wikivoyage.org/wiki/Conakry) | Get in, Get around, See, Do, Buy, Eat; Stay safe luettu mutta vanhentunut, ei käytetty nykytilan lähteenä | 20.49.10 / 5368248 |
| C | [Guinean cuisine, en-Wikipedia](https://en.wikipedia.org/wiki/Guinean_cuisine) | Major ingredients, Notable dishes, Sauces, Beverages | 20.50.44 / 1364284019 |
| BC | [Conakry, Encyclopaedia Britannica](https://www.britannica.com/place/Conakry) | paikallinen asutus, satama, nimitausta, museon ajoituksen riippumaton tarkistus | 20.50.17; sivun päivitys 23.8.2026 |
| BL | [Los Islands, Encyclopaedia Britannica](https://www.britannica.com/place/Los-Islands) | saaristo, historia, vanha kaivostoiminta; Factory-nimen ristiriita kirjattu | 20.50.18 |
| U0 | [UM, Guinea-maapolku](https://um.fi/matkustustiedote/-/c/GN) | saatiin yleinen sivupohja ilman Guinea-tiedotetta | 20.50.16 |
| U1 | [UM, matkustustiedotteet A–Ö](https://um.fi/matkustustiedotteet-a-o) | ajantasainen luettelo; Guinea puuttui, Papua-Uusi-Guinea on eri maa | 20.51.10 |
| U2 | [UM, muiden maiden matkustustiedotteet](https://um.fi/muiden-maiden-matkustustiedotteet) | linkit muiden maiden tiedotteisiin, Britannia mukana | 20.51.38 |
| UK0 | [FCDO, Guinea: Warnings and insurance](https://www.gov.uk/foreign-travel-advice/guinea) | turvallisuustilanteen ajantasaisuuspäivä ja yleiset matkustusohjeet | 20.51.42; current 11.10.2026, updated 12.8.2026 |
| UK1 | [FCDO, Guinea: Safety and security](https://www.gov.uk/foreign-travel-advice/guinea/safety-and-security) | etukäteen sovittu kuljetus, yöliikkuminen, kuvaamisrajoitukset, Road travel; ei uutisosiota peliin | 20.51.46 |
| UK2 | [FCDO, Guinea: Entry requirements](https://www.gov.uk/foreign-travel-advice/guinea/entry-requirements) | luettu soveltamisraja: tiedot Britannian passille; ei siirretty Suomen passin säännöiksi | 20.51.48 |

Luettu Wikidata: [Conakry Q3733](https://www.wikidata.org/wiki/Special:EntityData/Q3733.json) 20.49.07; [Tombo Q1572991](https://www.wikidata.org/wiki/Special:EntityData/Q1572991.json) 20.51.16; [satama Q17332858](https://www.wikidata.org/wiki/Special:EntityData/Q17332858.json) 20.51.13; [puutarha Q5158067](https://www.wikidata.org/wiki/Special:EntityData/Q5158067.json) 20.51.00; [Kassan saari Q24854585](https://www.wikidata.org/wiki/Special:EntityData/Q24854585.json) 20.51.04; [Roume Q28041192](https://www.wikidata.org/wiki/Special:EntityData/Q28041192.json) 20.51.19; [Tamara Q110544217](https://www.wikidata.org/wiki/Special:EntityData/Q110544217.json) 20.51.24. P625:t ja niiden viitteet luettiin; yksikään valittu piste ei ole kunnantalo tai toisen paikan koordinaatti. Tarkkuus ja rinnakkaiset pisteet ovat kohdassa 5.

### Vuosi 1873

- **Nykyistä pääkaupunkia edeltävä aika.** T, E ja BC sijoittavat ranskalaisen siirtomaakaupungin muodostumisen 1800-luvun loppuun, 1873:n jälkeen. Conakryn nimi liittyy paikalliseen kylään (BC); F kertoo alueen Baga- ja Susu-asutuksesta. Turvallinen kehys: ”Isoisän matkavuonna 1873 nykyinen pääkaupunki oli vielä tulevaisuutta: Conakryn vanha ydin kasvoi myöhemmin Tombon saarelle.” Ei väitettä saaren asumattomuudesta.
- **Kyläkuva vuonna 1873 jää tarkentamatta.** E:n kyläkuva koskee 1885:tä, F:n kyläluettelo 1887:ää. Niistä ei päätellä kylien määrää, asukaslukua tai rakennuskantaa juuri 1873. Asutuksen historia kerrotaan ilman tuota täsmällistä tilannekuvaa.
- **Saaristo oli olemassa ja asuttu ennen kaupunkia.** L:n History kertoo Baga-asutuksesta ennen eurooppalaista kauppapaikkaa; L ja BL sijoittavat Britannian saaristovallan 1800-luvun alkuun ja Ranskaan siirtymisen 1904:ään. Historiallinen johtopäätös vuoden 1873 kehyksessä: saaristo kuului silloin Britannian hallintaan. Tämä ei merkitse, että Tombo ja koko edustan saaristo olisivat sama saari tai sama luovutustapahtuma.
- **Ei isoisän käyntikertomusta.** Ei keksittyä rantautumista, päiväkirjamerkintää, reittiä, junamatkaa, repliikkiä tai paikallista kohtaamista.
- **Rakennuskohtainen aikaraja.** Camayennen puutarhan lähteissä esitetyt perustamisvuodet ovat 1873:n jälkeen; museo on 1900-luvun puolivälin instituutio. Sataman nykyisten rakenteiden olemassaoloa 1873 ei ole varmennettu. Näistä ei tehdä vanhoja nähtävyyksiä isoisän silmin.

## 1. Perusfaktat ja artikkelin suunta

| Aihe | Käytettävä fakta | Lähde ja tarkennus |
|---|---|---|
| Asema | Conakry on Guinean pääkaupunki ja Atlantin satamakaupunki. Se on maan talouden ja kulttuurin keskus. | E, johdanto; BC. ”Suurin” vain lähteen mukaan, jos tarpeen. |
| Sijainti | Vanha kaupunki kasvoi Tombon saarelle Kaloumin niemimaan kärkeen. Kasvu suuntautui niemimaata pitkin koilliseen. | T; E, History/Geography. |
| Nimi | Conakryn nimi tuli paikallisesta Susu-kylästä. Konteksti antaa Susu-muodon Kɔnakiri. | BC, alku; E, johdanto. Ei etymologista tarinaa puusta tai henkilön nimestä ilman uutta lähdettä. |
| Synty | Siirtomaakaupunki kehittyi 1800-luvun lopulla; eri lähteiden perustamis- ja alueenluovutusvuodet eivät ole yhteneviä. | E/F/T/H/BC; ristiriidat kohta 8. |
| Nykyinen väestöluku | **3 407 327 asukasta vuonna 2025, Conakryn erityisvyöhykkeen 13 kommuunin laajuisella alueella**, alustava väestönlaskentatulos. | Vain konteksti.json → kevytSisalto.asukkaat. Ei rajata tätä Tombon saareen, vanhaan keskustaan tai vanhaan viiden kommuunin kaupunkiin. Kontekstin linkki citypopulation.de ei ole tässä A:ssa noudettu tai uusi varmennus. |
| Laajuus | Nykyisen erityisvyöhykkeen väestöalue on vanhaa keskustaa laajempi. | Konteksti; E, Government and administration tukee alueiden erottamista. Ei pinta-alalukua tähän lehteen. |
| Satama | Keskustan kaupallinen satama sekä Boulbinetin kalasatama kuuluvat kaupungin rannikkoympäristöön. | E, Economy; K; BC. Ne ovat eri kohteita, eivät keskenään korvattavia kuvateksteissä. |
| Saaristo | Îles de Los / Îles de Loos sijaitsee kaupungin edustalla. Kassa, Roume ja Tamara ovat sen keskeisiä saaria; niiden rannoista ja metsäisestä sisäosasta on lähdetietoa. | L, johdanto/Geography; LF. |
| Käytännön kieli ja valuutta | Ranska on Guinean virallinen kieli; Guinean frangi, GNF. | Konteksti.json → maanPerustiedot; F, Langues paikallisen kielikirjon taustaksi. Ei väitettä kaikkien asukkaiden samasta kielestä. |
| Pelin tunnisteet | wiki-ehdotus `Conakry`, ambience-ehdotus `satama`, pallo lat 9.5092 / lon −13.7122. | Konteksti; kaupunkipallo säilyy sellaisenaan. Q3733 P625 9.509166… / −13.712222… ei määritä nähtävyyskartan koko rajausta. |

**Artikkelin johdatusaihio:** Conakry on kaupungin ja meren rajapinta: Tombon vanha ydin, pitkälle niemimaalle levinnyt pääkaupunki, sataman liikenne, kalastajien Boulbinet ja edustan saaristo. 1873-kehys erottaa vanhan rannikon myöhemmästä pääkaupungista. Artikkeli voi edetä saarelta niemimaalle, kaupallisesta satamasta kalasatamaan ja Camayennen puutarhasta merelle. Tähän ei tarvita poliittista historiaa tai rakennussuperlatiiveja. Kaikki aiheen faktat E/F/T/K/L/BC/G/M.

**Kirjoittajan mitat:** artikkelin intro 7–10 virkettä, 700–1100 merkkiä, 2–3 kappaletta ja 1–3 lihavointia; Lue lisää -teksti 3 kappaletta, 600–1100 merkkiä. Seuraavat johdannot ovat 1–2 virkkeen sivujohdantoja, eivät tämän intron korvikkeita.

## 2. Kansi — Conakry

**Johdantoehdotus:** ”Conakryn vanha ydin syntyi saarelle, ja ympärillä meri jatkaa kaupungin tarinaa. Sataman ja kalastajien rantojen vastapainona edustalla odottavat kiviset saaret ja metsäiset sisäosat.” Lähteet T/E/BC/L; ”odottavat” on johdannon kielikuva, ei turvallisuusarvio tai lupaus käyntimahdollisuudesta.

Neljä nostoaihetta, kustakin 4–8 faktayksikköä. Lopullisen noston mitta 440–660 merkkiä. Sama fakta saa taustoittaa kohdeartikkelia, mutta sama tarina ei saa muodostaa myös teemasivun nostoa.

### N1. Saari jäi kaupungin sisään

Wiki: `Tombo Island` / `Conakry`.

1. Tombon saari on Kaloumin niemimaan kärjessä Atlantilla. [T, johdanto]
2. Nykyisen Conakryn vanha kaupunki rakennettiin saarelle. [T, johdanto]
3. Saari on yhdistetty niemimaahan pengeryhteydellä. [T, johdanto; BC]
4. Kaupunki laajeni saaren ulkopuolelta niemimaalle. [E, History/Geography]
5. Ranskalainen siirtomaakaupunki muodostui 1800-luvun lopulla. [E/F/T; tarkka vuosi pois, kohta 8]
6. Kaupungin nimi liittyy siellä olleeseen Susu-kylään. [BC]
7. Nykyinen pääkaupunkirakenne oli 1873:ssa vasta tulevaisuutta; paikallista asutusta ei pidä pyyhkiä tästä pois. [T/E/BC/F; kohta 0]

Kuvatarve: laaja näkymä vanhan Tombon/Kaloumin ranta- tai katutilaan; moderni muistomerkki ei pääaiheeksi. Kuvan pitää todella esittää vanhaa ydintä, ei niemimaan kaukaista uutta esikaupunkia.

### N2. Boulbinet elää veneiden tahdissa

Wiki: `Conakry`; tarkka Boulbinet-paikka-artikkeli ei löytynyt käytetystä Wikipedia-aineistosta, eikä punalinkkiä käytetty lähteenä.

1. Boulbinet on yksi Conakryn erillisistä kaupunginosista. [BC, viimeinen kappale]
2. Siihen liittyy kalastussatama. [BC, sama kohta]
3. E:n History mainitsee alkuasutuksen kylän muodossa Boubinet; F:n Histoire käyttää nimeä Boulbinet. [E/F; ei automaattisesti identtistä kirjoitusasua kuvatekstiin, kohta 8]
4. Kaloumissa ovat sekä kaupungin kaupallinen satama että kalastussatama. [K, johdanto]
5. Wikivoyage kertoo veneiden saaristoon lähtevän keskustan kalatorin suunnalta. [V, Do; tarkkaa nykyistä hotelliviitettä/lähtöpistettä ei luvata]
6. Saaristoyhteys on meriyhteys, ei katu kaupungin halki. [L, johdanto; LF, Moyens de transport]

Kirjoituksen ydin on kalastuspaikan ja keskustan rinnakkaisuus. Ei kalastajien työpäivän kellonaikoja, veneiden tyypillisiä lasteja, tulotasoja tai tunnelmaselityksiä lähteen ulkopuolelta. Kohde ei saa omaa karttapistettä, koska paikalle osuvaa WP/WD-koordinaattia ei tässä varmennettu.

### N3. Lasti liikkuu kahteen suuntaan

Wiki: `Port de Conakry` / `Conakry`.

1. Conakryn satama sijaitsee Kaloumissa Atlantilla. [P, infolaatikko; K]
2. Se käsittelee kontteja. [P, johdanto]
3. Sataman lähdeartikkeli kertoo bauksiitin viennistä. [P, johdanto]
4. E:n Economy mainitsee alumiinioksidin ja banaanien kuljetuksia sataman kautta. [E; ei sama tuote kuin jalostamaton bauksiitti]
5. F:n Transports maritimes kuvaa elintarvikkeiden, teollisuustuotteiden ja energiatuotteiden tuontia sekä mineraalien vientiä. [F]
6. Historiallinen rata yhdisti Conakryn Kankaniin. [E, History; H, 20th century; BC; tarkka avausvuosi pois ilman alkuperäisvarmennusta]
7. P sisältää sataman historiallisia näkymiä 1900-luvun alkupuolelta. [P, Histoire; tarkka kuvavuosi on B:n metadatatyötä]

Syy-yhteys rajattuna lähteen väitteeseen: E sanoo rautatien avanneen sisämaata maapähkinän viennille. Jos tätä käytetään, esitetään nimenomaan lähteeseen perustuvana historiallisena kuvaajana, ei kirjoittajan oletuksena koko kaupungin syntysyystä. Sataman tehokkuusranking, yritysten oikeusriidat ja nykypoliittiset käyttöoikeudet jäävät pois.

### N4. Sandervaliassa monta Guineaa

Wiki: `Sandervalia National Museum`.

1. Sandervalia on Guinean kansallismuseo Conakryssa. [M, johdanto]
2. Se sijaitsee Sandervalian kaupunginosassa Kaloumissa, Ignace Deen -sairaalan lähellä. [M, Location]
3. Museo perustettiin **1960**. Kaksi riippumatonta näyttöä: M:n History (taustalähde Histories of Anthropology Annual) ja BC:n museota/kirjastoa/arkistoja koskeva kappale. H ja V tukevat, mutta niitä ei lasketa itsenäiseksi kolmanneksi alkuperäislähteeksi.
4. Kokoelmissa on ollut eri puolilta Guineaa peräisin olevia kulttuuriesineitä. [M, Collection]
5. Artikkeli mainitsee naamiot ja soittimet. [M, Collection; ei väitettä kaikkien olevan parhaillaan näytteillä]
6. Näyttelyssä on kuvattu maan eri alueiden taloja esittävää mallia. [M, Collection]
7. Paikkaa on käytetty myös näyttelyihin ja kulttuuritapahtumiin. [M, History]
8. Artikkelin monet kokoelmahavainnot ovat vanhoja. Nykyisiä aukioloaikoja, huoneiden määrää tai esineiden saatavuutta ei luvata. [M, ajoitetut havainnot; V:n See päivitetty 2020]

Instituutio ei ole automaattisesti suojattu taideteos, mutta sen esineet, veistokset ja rakennuksen arkkitehtuuri tarvitsevat kohdekohtaisen kuvaportin. Tämä on kansinostoaihe, ei valittu suojattu teos tai ehdotettu taideteoskarttapiste. B voi hakea sallittua dokumentaarista ympäristökuvaa; pelkkä kuvan CC-lisenssi ei riitä kuvattuihin teoksiin. Jos kuva ei selviä, nosto voidaan vaihtaa Camayennen puutarhaan (kohdan 5.3 faktoilla), jolloin puutarhan toisto opas-/kohdekuvissa perustellaan.

## 3. Teemasivu — `luonto`: Saariston kivinen kaari

**Johdantoehdotus:** ”Conakryn edustan saarissa merimaisema kaartuu kiviseksi renkaaksi. Kassa, Roume ja Tamara näyttävät saman saariston eri puolet: kaivosjäljet, keskellä olevan saaren ja pitkän ulkokaaren.” [L, Geography/Geology; KA, Histoire; R, Géographie; TA, Géographie]

### T1. Kallio kaartuu renkaaksi

Wiki: `Îles de Los`.

1. Roume on saariston keskellä, Kassa ja Tamara ympäröivät sitä kaaren tavoin. [L, Geography]
2. LF kuvaa saariston muodon renkaaksi. [LF, Géologie]
3. Saariston kiviin kuuluu syeniitti. [L, Geology]
4. LF täsmentää nefeliinisyeniitin sekä kiveä leikkaavat fonoliittijuonet. [LF, Géologie]
5. L yhdistää saariston syntyhistorian Atlantin avautumisen aikaiseen magmakivitoimintaan. [L, Geology; LF tukee yleistä mesotsooista kehystä]
6. LF tulkitsee muodon todennäköisesti kuluneen vulkaanisen rakenteen magmasäiliöön liittyväksi. Säilytä **todennäköisesti**; ei varmaa ”meren tulivuorikraatteria”. [LF, Géologie]
7. L mainitsee kallioperän vertailukohteina muitakin syeniittialueita. Niitä ei tarvita nostoihin eikä lähipelikaupungin vuoritarinaa toisteta. [L, Geology]

Ei kiven tarkkaa ikää miljoonina vuosina, kivikoostumusprosentteja tai näkemättömän geologisen poikkileikkauksen selityksiä. Geologinen makrohypoteesi kuuluu lähteen tulkinnaksi.

### T2. Kassa kantaa kaivosten jälkiä

Wiki: `Île de Kassa` / `Îles de Los`.

1. Kassa kuuluu saariston pääsaariin. [KA, johdanto; L, Geography]
2. Kassa-nimen esitetään tulevan portugalin sanasta casa, talo. Tämä on lähteiden etymologia, ei tämän A:n kielihistoriallinen tutkimustulos. [KA, Histoire; L, Kassa]
3. Kassa tunnettiin myös nimellä Factory Island. [KA, johdanto/Histoire; L, Kassa; BL antaa tästä ristiriitaisen saarinimen, kohta 8]
4. Saarella oli 1700-luvulla kauppapaikka, jonka toimintaan kuului laivojen korjaajia ja jokireittien luotseja. [KA, Histoire; L, History; tarkka vuosi pois]
5. Saarella louhittiin bauksiittia 1900-luvulla. [KA, Histoire; BL]
6. Keskiosissa on kaivostoiminnasta jääneitä avolouhoksia. [KA, Histoire]
7. KA mainitsee pohjoisosan kivilouhoksen, josta otettiin rakennuskiveä Conakryn sataman suojapengertä varten. Syy-yhteys on artikkelin nimenomainen väite. [KA, Histoire]
8. Rannat ja metsäinen saaristoympäristö ovat toinen puoli maisemaa. [L, johdanto; KA, rantamaininta]

Tarkat kaivostoiminnan aloitusvuodet ovat ristiriitaiset; käytetään 1900-lukua. Ei ”ensimmäinen bauksiittitehdas” -superlatiivia, tuotantomääriä tai teollisuusraunion rakennusaikaa.

### T3. Keskisaarella on monta nimeä

Wiki: `Île de Roume`.

1. Roume on saariston keskellä. [R, Géographie; L, Geography]
2. Se on asuttu saari. [R, Géographie]
3. Artikkeli antaa vanhoiksi nimiksi Room ja Crawford Island. [R, johdanto]
4. Nykyinen Roume-kirjoitusasu liittyy ranskalaisen siirtomaahallinnon Ernest Roumeen. [R, Différence et origines des noms; hänen tarkkoja virkavuosiaan ei käytetä]
5. Room-muoto liittyy artikkelissa englanninkielisten asukkaiden käyttämään nimeen. [R, sama osio]
6. R mainitsee saaren kukkulalla 1800-luvun alussa rakennetun brittiläisen linnakkeen. [R, Histoire; rakennelman nykyisestä säilymisestä ei väitettä]
7. Plage du Gouverneur on artikkelissa nimetty ranta. [R, Géographie/kuvateksti; kuvan vastine varmennettava B:ssa]

Stevensonin Aarresaaren oletettua inspiraatiota ei nosteta tarinaksi: sama artikkeli sanoo väitteen historiallisen näytön puuttuvan. ”Pienin asutuista saarista” jätetään pois ilman riippumatonta varmennusta.

### T4. Tamara tekee ulkokaaren

Wiki: `Île de Tamara` / `Îles de Los`.

1. Tamara kuuluu saariston pääsaariin. [TA, johdanto; L, Geography]
2. Saaren toinen nimi on Fotoba. [TA, johdanto; L, Geography käyttää Fortoba-muotoa; nimi-ero kirjattu]
3. TA kuvaa saaren kaarevaksi. [TA, Géographie]
4. L:n Geography yhdistää Tamaran ja Kassan Roumea ympäröiväksi kaareksi. [L]
5. TA paikantaa Tamaran saariston läntiselle laidalle. [TA, Géographie; ei kaupallista ”paras auringonlasku” -väitettä]
6. Saaristossa on rantoja ja metsäistä sisäosaa. [L, johdanto]
7. Tamaran historiassa oli 1900-luvun kaivostoimintaa. [BL; tarkat alku-/loppuvuodet pois yhden riippumattoman lähteen vuoksi]
8. Saaren majakka on lähteissä mainittu merenkulun maamerkki. [TA, Le phare; L, Tamara]. Majakka ei ole tämän kartan oma kohde eikä kuvan automaattisesti sallittu pääaihe; sen aika-/mittatiedot ja oikeudet ovat avoimia.

**Minitehtäväaihio (ei sama aihe kuin kaupungin viisassa):** ”Mikä saari jää Kassan ja Tamaran muodostaman kaaren keskelle?” Vaihtoehdot Roume / Tombo / Kassa / Tamara; oikea 0. Vastauksen tuki T1 ja T3. Faktaehdotus: ”Roume sijaitsee saariston sisemmässä osassa, ja muut pääsaaret kaartuvat sen ympärillä.” [L, Geography; R, Géographie]. Fakta on eri virkemuodossa kuin nosto. Ei palkkiomainintaa.

## 4. Matkailijalle — viisi jaksoa

Nykykäytännön tiedot ovat rajattuja: V:n yksittäiset päivitykset ovat usein vuosilta 2020–2024. Käytä paikkojen olemassaoloa ja kaupungin rakennetta; älä siirrä lentovuoroja, junan aikataulua, hintaa, hotellikohtaista lähtölaituria tai vanhaa turvallisuuskuvausta nykyiseksi lupaukseksi.

### O1. Perille ja liikkeelle

- Lentoasemaehdotus: **Ahmed Sékou Touré International Airport (CKY)**. Tunnetaan myös nimillä Conakry International Airport ja Gbessia International Airport. [A, johdanto/IATA; F, Transport aérien]
- Se palvelee Conakrya; tarkka etäisyys keskustasta jätetään pois lähde-eron takia. [A/F/BC; kohta 8]
- V kuvaa Conakrya pitkäksi ja kapeaksi niemimaakaupungiksi, jonka monet nähtävyydet ovat Tombon vanhassa ytimessä. [V, Get around]
- Ennalta sovittu luotettava kuljetus on käytännöllinen tapa liikkua. Etenkin pimeän jälkeen saapuvan lentokenttäkuljetus sovitaan ennen matkaa. [UK1, Vehicle crime / Road travel; sisältöön vain kuljetusohje, ei rikoskuvausta]
- V:n taksisuosituksen rinnalle UK1 tuo varauksen: jaettuja takseja ja mototakseja ei suositella. Oppaan ei pidä ohjata turisteja satunnaiseen yhteistaksiin. [V, Get around; UK1, Road travel]

Kuva: jokin sallittu tuore kuva kaupungin tavanomaisesta katuliikenteestä. Lentoaseman kuvaamista ei pyydetä, sillä UK1 mainitsee lentoasemia koskevan kuvaamisrajoituksen.

### O2. Vanha ydin ja museopysähdys

- Tombo ja Kaloum muodostavat vanhan keskustan lähtökohdan. [T/K/V]
- Sandervalia-museo sijaitsee Kaloumissa Ignace Deenin sairaalan läheisyydessä. [M, Location]
- Museo esittelee Guinean kulttuurien esineistöä; historiallisissa kuvauksissa mainitaan naamiot, soittimet ja alueiden taloja kuvaava malli. [M, Collection]
- Näyttelyiden tämänhetkinen laajuus, palvelut ja vierailun järjestyminen varmistetaan paikallisesti. Tämä on toimituksellinen käytäntövaraus, koska luetut näyttelykuvaukset ovat vanhoja, ei väite museon sulkemisesta.
- Puutarha on luontoaiheinen vaihtoehto, jos museon kuva tai vierailutieto ei ole käyttökelpoinen. [G/GF; ympäristön faktat kohta 5.3]

Kuva: Kaloum/Tombo-ympäristö tai museo ulkoa vain B:n oikeusportin läpi. Ei museon veistoksia tai teosta pääaiheeksi.

### O3. Meri ja saaristo

- Boulbinet on kalasataman kaupunginosa. [BC]
- Îles de Los on kaupungin edustalla ja sillä on rantoja sekä metsäisiä sisäosia. [L, johdanto]
- V ja LF kertovat meriyhteydestä kaupungista saarille. [V, Do; LF, Moyens de transport]
- Meriretki ei kuulu samaan kävelyreittiin keskustan kanssa. Tämä on reittirakenteen toimituksellinen seuraus meriyhteydestä, ei tarkka matka-aika.
- Kuljetuksen nykyinen saatavuus ja toimijan luotettavuus on varmistettava ennen lähtöä. Älä anna venetyyppiä, kellonaikaa, matkan kestoa tai uinnin turvallisuutta koskevaa lupausta näistä lähteistä.
- Roume, Kassa ja Tamara ovat eri saaria, eivät saman rannan vaihtoehtoisia nimiä. [L, Geography]

Kuva: saariston luonnonranta tai yleinen veneympäristö ilman luettavia kasvoja. Ei majakkaa, linnaketta tai modernia rakennusta pääaiheeksi ilman kohteen oikeusvarmennusta.

### O4. Mitä täällä syödään

- Guinealaisen keittiön tavallisia aineksia ovat maniokki, keittobanaani, okra, maapähkinä ja hibiskus. [C, Major ingredients]
- Fouti on artikkelissa okraa ja riisiä sisältävä ruoka. [C, Notable dishes]
- Kansiyé on maapähkinäpohjainen kastike; lähde luettelee myös tomaattia, chiliä, valkosipulia ja sipulia. [C, Sauces]
- Konkoé on savustetusta monnista ja kasviksista tehtävä pata. [C, Notable dishes]
- Bissap on hibiskusjuoma. [C, Notable dishes/Beverages]
- Nämä ovat Guinean ruokaperinteen esimerkkejä, eivät varmennettuja Conakryn erikoisruokalistan tuotteita tai lupaus saatavuudesta tietyssä ravintolassa. Kaupungin ruokaoppaaseen riittää 2–3 esimerkkiä; maanlaajuisia alkuperäselityksiä ei tarvita.

Kuva: tunnistettava ruoka-annos tai hibiskusjuoma ilman mainosta, pakkausta tai kuvan päälle lisättyä tekstiä. Kuvatekstissä ei nimetä ruokaa pelkän ulkonäön perusteella, jos B ei pysty tunnistamaan sitä.

### O5. Milloin kannattaa tulla

Kaikki luvut vain kaupungin **saa.json**-tiedostosta, ei V:n tai E:n leipätekstin eri taulukosta.

- Keskilämpö on koko vuoden noin 26–28 °C: tiedoston pienin kuukausikeskiarvo 25,7 (elokuu), suurin 28,4 (huhtikuu). Lopulliseen oppaaseen pyöristys ”noin 26–28 astetta”.
- Joulukuusta maaliskuuhun taulukon sademäärät ovat hyvin pienet (6, 3, 1, 3 mm). Näistä voidaan sanoa ”vuoden alku on huomattavasti kuivempi”.
- Sateisin jakso osuu keskikesään: heinä- ja elokuu ovat taulukossa kumpikin yli 1000 mm. Oppaan ilmaisu ”keskikesän sateet ovat runsaita” riittää.
- Päivän ylimmät normaalit ovat 28–32 °C ja alimmat 22–25 °C. Lähdetiedoston keskilämpö on aidosti Daily mean, ei (ylin + alin) / 2.
- Sateisuutta ei verrata muihin pääkaupunkeihin eikä ”Afrikan sateisin” -superlatiivia käytetä.

Kuva: kapokki tai tavallinen luontoympäristö. Kuvan säätila ei ole ilmastoluvun todistus.

### Parasta — viisi toimitettavaa riviä

Tähdet ovat toimituksellisia arvioita, eivät lähdefaktoja tai käyntisuosituksen turvallisuusluokitus.

| Mitä | Tähdet ehdotus | Selityksen faktapohja |
|---|---:|---|
| Tombon vanha ydin | 3 | Kaupunki kasvoi tälle saarelle; saari liittyy niemimaahan. T/E. |
| Boulbinetin kalasatama | 2 | Kalastussataman kaupunginosa. BC/K. |
| Camayennen puutarha | 2 | Kapokeista tunnettu kasvitieteellinen puutarha. G/GF. |
| Sandervalia-museo | 2 | Guinean kulttuuriesineistö ja alueiden talomalli historiallisissa kokoelmakuvauksissa. M; saatavuusvaraus. |
| Îles de Los -saariston rannat | 3 | Rannat ja metsäiset sisäosat. L; kuljetus järjestettävä nykytilanteen mukaan. |

### Hyvä tietää — neljä riviä

1. **Kuljetus:** sovi luotettava kuljetus etukäteen; etenkin pimeällä lentoasemalta saavuttaessa. [UK1]
2. **Yöliikkuminen:** älä suunnittele yksin tehtävää iltakävelyä hiljaisille kaduille; lähde neuvoo välttämään yksin kävelyä yöllä. [UK1; ei nykyistä rikosuutista peliin]
3. **Kuvaaminen:** viranomaisrakennusten, sotilas-/poliisikohteiden ja strategisten kohteiden, kuten lentoasemien ja siltojen, kuvaaminen on rajoitettua. [UK1, Using cameras in secure areas]. Ei päätelmää kaiken rannikon/luonnon kuvauskiellosta.
4. **Retket ja asiakirjat:** varmista venekuljetuksen, museokäynnin sekä oman passisi viisumi- ja terveysvaatimukset ennen lähtöä. UK2 koskee Britannian passia, joten sen määräaikoja ei siirretä suomalaiseen oppaaseen. Tämä rivi on toimituksellinen tarkistusohje, ei uusi maahantuloväite.

### Ajantasainen turvallisuus — poikkeama UM-lähteeseen

UM:n GN-maapolku palautti 11.10.2026 yleisen sivupohjan ilman maakohtaista sisältöä. UM:n A–Ö-luettelossa ei ollut Guineaa; Papua-Uusi-Guinea on eri maa. Tämän vuoksi **Guinealle ei ole tässä lähdeaineistossa varmennettua UM-turvallisuusluokitusta**. Ei lausetta ”UM kehottaa välttämään…” eikä ”Guinea on turvallinen”.

UM:n muiden maiden tiedotteet -sivu tarjoaa Britannian neuvon. Sieltä seurattua FCDO Guinea -kokonaisuutta luettiin 11.10.2026; etusivu merkitsee sen current 11 October 2026, updated 12 August 2026. Oppaaseen nostetaan vain käytännön ohjeet yllä. Lähteiden poliittiset, rikollisuus- ja väkivaltakuvaukset jäävät pois. V:n vanha Stay safe ei ole ajantasainen lähde. Matkailijalle-kappaleen lyhyt varaus voidaan kirjoittaa ilman viranomaisviittausta: ”Sovi kuljetukset etukäteen ja vältä yksin liikkumista pimeällä. Tarkista myös kuvaamisrajoitukset ja saaristoretken järjestelyt ennen lähtöä.” Tämä sisältää vain UK1:n ja O3:n tukemaa käytäntötietoa.

### Säätausta säilytettävä

- Artikkeli: Conakry; revisio 1379002361.
- Taulukko: Climate data for Conakry (1991–2020).
- Lähde saa.json:ssa: en-Wikipedia, ilmastotaulukko; kausi 1991–2020.
- Alkuperäisviite tausta.lahteet: Source: NOAA (humidity, sun 1961–1990).
- Keskilämpö: Daily mean °C (°F); sade: Average precipitation mm (inches).
- Vuosisade taustassa 3731 mm; sade[12]-summa sama 3731. Taustamerkintää ei kopioida sisalto.json:n saatiedot-olioon.
- saa.json:n lat 9.51 / lon −13.71 ja kaikki neljä 12 luvun sarjaa kopioidaan muuttamatta. Ilmastoluvut ovat tilauksen erikseen sallimaa valmista säädataa; niiden määrää ei ratkaista noutamalla toista ilmastotaulukkoa.

## 5. Kohdekartta — vanha ydin, satamaympäristö ja edustan saaret

**Kuusi paikankohdetta.** Kartan ankkuri on Tombon/Kaloumin historiallinen ydin, ei Q3733:n hallintopiste itsessään. Saaristo on vanhaan meriyhteyteen kuuluva laajennus, ei esikaupunkien hallinnollinen lista. Camayenne on lähellä niemimaan vanhaa kaupunkialuetta. Tämä ei käytä pienen pääkaupungin poikkeusta. Kohteet ovat luonnonpaikkoja tai satamapaikka; ei veistoksia, esineitä, henkilöitä, tapahtumia tai suojattuja moderneja teoksia.

**Esittelyaihio (≤400 merkkiä):** ”Conakryn vanha kaupunki kasvoi Tombon saarelle, ja satama pitää sen yhteydessä Atlanttiin. Camayennen puutarha ja edustan Kassa, Roume ja Tamara tuovat samaan kaupunkiretkeen toisen maiseman: suuret puut, kiviset saaret ja rannat.” [T/P/G/L]. Veneellä tehtävä osuus erottuu oppaassa kävelyosuudesta.

**Rajausehdotus:** pohjoinen **9.53500**, etelä **9.44000**, länsi **−13.84500**, itä **−13.68100**. Tämä on tietoisesti riittävä luonnonpaikkojen laajuuden kattava työrajaus: saaren koko alue ei ole sama asia kuin sen P625-piste. Lopullinen karttapiirto tarkistaa rantaviivan sekä noin 300 m näkyvyysvaran uloimpien saarten ympärillä. Ei uutta sijaintia näiden rajojen kautta eikä pois jätettyjen paikkojen piilopisteitä.

| # | Kartan suomenkielinen nimi | Tyyppi | lat | lon | Koordinaatin luettu lähde / luonne |
|---:|---|---|---:|---:|---|
| 1 | Tombon saari | luonto | 9.51000 | −13.71000 | T, koordinaatti 9°30′36″N 13°42′36″W; Q1572991 P625 sama. Saaren aluepiste, ei erillisen nähtävyyden sisäänkäynti. |
| 2 | Conakryn satama | rakennus (ei tyyppi-kenttää JSONiin) | 9.51440 | −13.71930 | Q17332858 P625; P:n infolaatikko 9°30′52″N 13°43′09″W tukee samaa satama-aluetta. Sataman paikka, ei Kaloumin kunnantalo. WD:n precision 0.009108… on karkea; viisi desimaalia on formaatti, ei senttimetrivarmuus. |
| 3 | Camayennen kasvitieteellinen puutarha | luonto | 9.53070 | −13.68592 | Q5158067 P625 9.530702 / −13.685918; fr-infolaatikon pyöristetyt sekunnit ja V:n paikka tukevat. Puutarhan oma piste. |
| 4 | Kassan saari | luonto | 9.47500 | −13.74944 | KA, infolaatikon 9°28′30″N 13°44′58″W muunnettuna. Q24854585:ssä kaksi rinnakkaista saaren P625-pistettä, ks. alla. Ei koko Kassa-kommuunin väestöpisteeksi nimetty. |
| 5 | Roumen saari | luonto | 9.46333 | −13.79306 | R, 9°27′48″N 13°47′35″W muunnettuna. Saaren aluepiste. Q28041192:n P625 on eri aluepiste, ks. alla. |
| 6 | Tamaran saari | luonto | 9.48547 | −13.82338 | Q110544217 P625 9.485469444… / −13.823380555…; TA:n 9°29′08″N 13°49′24″W on lähellä samaa saaren aluetta. Ei majakan koordinaatti. |

Kaikki koordinaattihakujen päivät 11.10.2026, tarkat ajat kohdassa 0. P625:ssa ei ollut näille valituille pisteille kohde- tai ajanqualifiereita. Wikipedian sekuntikoordinaatit muunnettiin aritmeettisesti ja pyöristettiin viiteen desimaaliin.

**Rinnakkaispisteet:** Kassa Q24854585: normal-rank 9.48056 / −13.75306 (tuotu cebuano-Wikipediasta) ja normal-rank 9.4749687 / −13.7495613 (tuotu fr-Wikipediasta). Jälkimmäinen on lähellä KA:n nykyisiä sekuntikoordinaatteja; käytetään artikkelin suoraan luettua saaren koordinaattia, ei keskiarvoa. Roume Q28041192: 9.463888888… / −13.795833333…, viite GeoNames; R:n piste poikkeaa muutaman sadan metrin. Molemmat ovat koko saaren aluepisteitä, eivät eri nimisiä laitureita. Valittu R:n piste säilytetään näkyvän artikkelin mukaan. Camayennen G:n koordinaatti on pyöristetty 9.531 / −13.686; WD antaa tarkemman saman puutarhan pisteen. Tamaran WP/WD-ero on vain sekuntipyöristyksen tasoa.

### 5.1 Tombon saari

**Aika:** luonnonpaikka; kaupunkikehitys 1800-luvun lopulta. Nykyisen maayhteyden tarkka rakennusaika jää pois.

1. Saari sijaitsee Atlantilla Kaloumin niemimaan kärjessä. [T, johdanto]
2. Vanhan Conakryn paikka on saarella. [T, johdanto]
3. Se on yhdistetty niemimaahan pengeryhteydellä. [T; BC]
4. Kaupungin laajeneminen jatkui Kaloumin niemimaalle. [E, History/Geography]
5. Alueen asutushistoriaan kuuluu Baga- ja Susu-yhteisöjä. [F, Histoire; ei yksittäisen kylän tarkkaa 1873-väkilukua]
6. Conakryn nimi liittyy Susu-kylään. [BC]
7. Tombon Ranskaan liittyminen ja kaupungin synty ovat lähteissä 1800-luvun lopun vaiheita. [T/E/F/H; tarkat ristiriitaiset vuodet kohta 8]
8. Îles de Los -saaristo on saaren länsipuolella, eikä Tombo ole sama paikka kuin Kassa, Roume tai Tamara. [T, johdanto; L, Geography; ei etäisyyslukua]

**1873:** nykyistä siirtomaa-/pääkaupunkia ei vielä ollut; saaren paikallista asutusta ei silti saa kutsua olemattomaksi. Tarkka kylätilanne puuttuu. **Kuva:** saaren vanhan ytimen rannikko-/katutila tai kunnollinen historiallinen vedos, ei modernia suojattua teosta pääaiheeksi.

### 5.2 Conakryn satama

**Aika:** siirtomaakaudella kehittynyt satamaympäristö–nykyaika; tarkka ensimmäisen laiturin tai nykyisten terminaalien rakennusvuosi varmentamatta.

1. Satama on Kaloumissa, vanhan keskustan alueella. [P, infolaatikko; K]
2. Se on Atlantin satama. [P, infolaatikko]
3. Konttiliikenne kuuluu sen toimintoihin. [P, johdanto]
4. P kuvaa bauksiitin vientisataman. [P, johdanto]
5. E kuvaa sataman lastinkäsittely- ja varastointitoimintoja. [E, Economy]
6. Tuontiin kuuluu elintarvikkeita, teollisuustuotteita ja energiaan liittyviä tuotteita. [F, Transports maritimes]
7. Historiallinen ratayhteys johti Kankaniin. [E, History; H, 20th century; BC]
8. Satamasta on lähdeartikkelissa 1900-luvun alkupuolen näkymiä. [P, Histoire]

**1873:** näillä lähteillä ei kuvata nykyisiä terminaaleja tai tiettyä laituria silloin olemassa oleviksi. **Kuva:** satamaympäristö, alukset tai historiallinen yleisvedos; kuvaamisrajoitus ja mahdolliset suojatut rakenteet eroteltava B:ssa. Ei luotua kuvaa eikä yritysten mainos-/logoaihetta.

### 5.3 Camayennen kasvitieteellinen puutarha

**Aika:** 1800-luvun loppu; perustamisvuosissa 1894/1897-ero, ks. kohta 8.

1. Kyseessä on kasvitieteellinen puutarha Conakryssa. [G/GF, johdanto]
2. Se sijaitsee Camayennen kaupunginosassa. [G/GF]
3. Ambroise Paré -sairaala on sen eteläpuolella. [G/GF]
4. Suuri moskeija on sen pohjoispuolella. [G/GF]. Tämä on sijaintifakta, ei suojatun moskeijarakennuksen valinta kohteeksi.
5. Puutarha tunnetaan kapokkipuista. [G/GF; sama Lonely Planet -taustalähde, ei kaksi riippumatonta näyttöä]
6. Britannica kuvaa puutarhan ranskalaisten perustamaksi. [BC, kulttuuri-/koulutuskohtainen kappale]
7. GF sijoittaa perustamisen 1800-luvun loppuun; F antaa saman vuosisadan sisällä eri vuoden. [GF, Histoire; F, Culture]
8. GF kertoo puutarha-alueen pienentyneen kaupungin kasvun yhteydessä. Säilytä lähdekohtainen rajaus; pinta-alaluvut pois ilman toista varmennusta. [GF, Histoire]

**1873:** luettujen perustamiskertomusten ajoitus on matkavuoden jälkeen. Ei keksittyjä isoisän kapokkihavaintoja. **Kuva:** puut ja puutarhan luontoympäristö; ei viereinen moskeija pääaiheeksi, ei mausoleumia. Kasvitieteellinen puutarha ei tarkoita kaikkien sen sisällä olevien rakennelmien vapaata kuvitusoikeutta.

### 5.4 Kassan saari

**Aika:** vanha luonnon- ja asutuspaikka; kauppapaikka 1700-luvulla, kaivostoiminta 1900-luvulla.

1. Kassa on yksi Îles de Los -saariston pääsaarista. [KA, johdanto; L, Geography]
2. Kassa ja Tamara muodostavat Roumen ympärille kaartuvan saariston osan. [L, Geography]
3. Kassa-nimen lähteissä esitetty pohja on portugalin casa, talo. [KA, Histoire; L, Kassa]
4. Factory Island on saaren historiallinen englanninkielinen nimi. [KA/L; ristiriita BL:n luettelossa]
5. Saaren kauppapaikkaan liittyivät laivojen korjaajat ja jokien luotsit. [KA, Histoire; L, History]
6. Saarella louhittiin bauksiittia. [KA, Histoire; BL]
7. Saaren keskiosissa on entisiä louhoksia. [KA, Histoire]
8. Pohjoisessa louhittiin kiveä sataman suojarakenteeseen. [KA, Histoire; syy-yhteys lähteen väite]
9. Saarella on rantoja; käytettävän kuvan rannan identiteetti pitää tarkistaa. [KA, rantamaininta; L, johdanto]
10. Saaren ja koko saariston kattavan Kassa-kommuunin tiedot eivät ole samat. KA:n hallinto- ja väestöosio ei kelpaa saaren väestö-/pinta-alakuvaukseksi ilman laajuustarkistusta. [KA; L, johdanto]

**1873:** saaristo oli Britannian hallinnassa, kauppapaikan historia oli jo alkanut; bauksiittikaivoksia ei siirretä 1873:een. [L/BL/KA]. **Kuva:** saaren luonnonranta, metsä tai louhosmaasto; teollisuusrakennelmaa/taidetta ei pääaiheeksi ilman erillistä tarkistusta.

### 5.5 Roumen saari

**Aika:** vanha luonnon- ja asutuspaikka; nimeämiskerrostumat 1800–1900-luvuilta. Nykyinen Roume-muoto ei ole automaattisesti vuoden 1873 paikallinen nimiasu.

1. Roume on saariston keskellä. [R, Géographie; L, Geography]
2. Se on asuttu. [R, Géographie]
3. Kassa ja Tamara muodostavat sen ympärillä lähes sulkeutuvan kaaren. [L, Geography]
4. Room on artikkelissa mainittu vanha nimimuoto. [R, johdanto/nimiosio]
5. Crawford Island on toinen historiallinen nimi. [R, johdanto]
6. Roume-nimi liittyy Ernest Roumeen. [R, nimiosio]
7. R kuvaa brittiläisen linnakkeen 1800-luvun alusta saaren kukkulalla. [R, Histoire; nykyisiä raunioita ei ole tässä varmennettu]
8. R nimeää Plage du Gouverneur -rannan. [R, Géographie/kuvateksti]

**1873:** saari kuului Britannian hallitsemaan saaristoon. Ei väitettä isoisän linnakekäynnistä eikä tätä päivää koskevaa säilyneisyyslupausta. **Kuva:** saaren luonnonranta tai yleismaisema; linnake ei oma kuvavalinta. Aarresaari-anekdootti pois lähteen oman epävarmuuden vuoksi.

### 5.6 Tamaran saari

**Aika:** vanha luonnon- ja asutuspaikka; kaivostoimintaa 1900-luvulla. Majakan ja vankilan rakennusaikoja ei tarvita luontokohteen aikakenttään.

1. Tamara kuuluu saariston pääsaariin. [TA, johdanto; L, Geography]
2. TA käyttää myös nimeä Fotoba. [TA, johdanto]
3. L käyttää sulkeissa Fortoba-muotoa; kirjoitetaan ensisijaisesti Tamara. [L, Geography; kohta 8]
4. TA sijoittaa saaren saariston läntiselle laidalle. [TA, Géographie]
5. Saari muodostaa pitkän kaaren. [TA, Géographie]
6. Se osallistuu Roumea ympäröivään saaristokehään. [L, Geography]
7. Saariston rannat ja metsäinen sisämaa ovat luontokehys; ei uinnin turvallisuusväitettä. [L, johdanto]
8. Saarella oli bauksiittikaivostoimintaa 1900-luvulla. [BL; tarkat vuodet pois]
9. Majakka ja Fotoban entinen vankila kuuluvat saaren historiaan, mutta eivät tämän työn valittuihin erilliskohteisiin. [TA, Histoire; L, Tamara]

**1873:** saaristo oli Britannian hallinnassa. Lähteiden myöhempiä rakennuksia tai kaivoksia ei projisoida saarelle vuoden 1873 kertomukseen. **Kuva:** luonnonranta, kallio tai metsäinen yleismaisema ilman suojattua rakennelmaa pääaiheeksi.

Nähtävyysjuttujen kirjoitusmitat: kukin 700–1400 merkkiä, 2–3 kappaletta, mitä paikka on + historia + 1873-raja. Luontosaarelle ei keksitä rakennusvuotta. Kuva 1–2 vain B:n hyväksytyistä; samat tiedostonimet eivät toistu kaupungin eri kohdissa.

## 6. Viisi kysymystä ja kolme tietoa

Vastausten aiheet on katettu tässä faktapohjassa ja tarkoitettu lehden teksteihin. Tasot 1–3 ovat mukana; oikeat vastaukset indeksissä 0. Hienostumattomia superlatiiveja tai yhden lähteen täsmällisiä vuosilukuja ei kysytä. Oikea vastaus ei ole toisen pelikaupungin nimi.

| # / taso | Kysymys ja vaihtoehdot | Vihjeaihio | Faktapohja / source |
|---|---|---|---|
| Q1 / 1 | Minkä valtameren rannalla Conakry sijaitsee? **Atlantin** / Tyynenmeren / Intian valtameren / Pohjoisen jäämeren | Katso, mihin suuntaan Guinean rannikko avautuu. | Conakry on Guinean Atlantin satamakaupunki. E, johdanto; https://en.wikipedia.org/wiki/Conakry |
| Q2 / 2 | Mille saarelle Conakryn vanha ydin kasvoi? **Tombolle** / Kassalle / Roumelle / Tamaralle | Osa kaupungin alkupaikasta liittyy nykyään pengeryhteydellä niemimaahan. | Tombo on vanhan kaupungin paikka. T; https://en.wikipedia.org/wiki/Tombo_Island |
| Q3 / 2 | Mistä puista Camayennen puutarha tunnetaan? **Kapokeista** / Oliivipuista / Eukalyptuksista / Seetritarhoista | Kyse on puutarhan suurista trooppisista puista. | Kapokit mainitaan G/GF. https://en.wikipedia.org/wiki/Conakry_Botanical_Garden |
| Q4 / 3 | Mihin portugalin sanaan Kassa-nimi lähteissä yhdistetään? **Casa, talo** / Praia, ranta / Porto, satama / Pedra, kivi | Saaren nimitausta liittyy aiempaan eurooppalaiseen nimikerrostumaan. | L:n Kassa-osio ja KA:n Histoire antavat casa-etymologian; nimitausta esitetään lähteen tulkintana. https://en.wikipedia.org/wiki/%C3%8Eles_de_Los |
| Q5 / 3 | Minkä magmakivilajin Îles de Los -artikkeli nimeää saaristossa? **Syeniitin** / Basaltin / Dioriitin / Graniitin | Saariston kaartuva muoto liittyy vanhaan magmakiviseen rakenteeseen. | L:n Geology nimeää syeniitin; LF täsmentää nefeliinisyeniitin. https://en.wikipedia.org/wiki/%C3%8Eles_de_Los |

Vaihtoehtojen pituus ja yksiselitteisyys tarkistetaan C:ssa; Q5 pyytää artikkelin nimeämää kiveä, ei väitä muiden kivien varmasti puuttuvan koko alueelta.

**Kolme tiesitkö-aihioita ilman isoisän ääntä:**

1. ”Tombon saari on nykyisen Conakryn vanhan kaupungin paikka. Pengeryhteys liittää sen Kaloumin niemimaahan.” [T; source https://en.wikipedia.org/wiki/Tombo_Island]
2. ”Camayennen kasvitieteellinen puutarha tunnetaan kapokeista. Sen vierellä kaupunki jatkuu sairaalan ja moskeijan suuntaan.” [G/GF; source https://en.wikipedia.org/wiki/Conakry_Botanical_Garden]
3. ”Roumen nimistä löytyvät sekä Room että Crawford Island. Nykyinen nimi on yksi saariston historiallisista nimikerroksista.” [R; source https://fr.wikipedia.org/wiki/%C3%8Ele_de_Roume]

Minitehtävä kysyy Roumen asemaa kaaren keskellä; visa kysyy valtamerta, Tombon ydintä, kapokkeja, Kassa-etymologiaa ja kivilajia. T3:n nimiaihe ei ole minitehtävä eikä erillinen visakysymys.

## 7. Sanalliset kuvatarpeet B-agentille

Ei kuvavalintoja, lisenssipäätöksiä eikä valmiita kuvatekstejä. Noin 22 kuvan sijasta tämä täysi 6-kohteinen runko tuottaa **24 tarvepaikkaa**: 3 + 8 + 1 + 5 + 6 + 1. Yksi tiedosto vain kerran; kaksi kuvaa samasta puutarhasta tai saaresta tarvitsee selvästi eri tarkoituksen ja aihetoiston perustelun. Kuvia ei täytetä summittaisilla maan yleiskuvilla.

| Paikka | Mitä kuvan pitää esittää | Hakusanat / aihe B:lle |
|---|---|---|
| Kansi 1 | Vanhan Tombon/Kaloumin laaja kaupunki- tai rannikkonäkymä | Conakry Kaloum Tombo panorama waterfront |
| Kansi 2 | Boulbinetin kalasataman laaja ympäristö, veneet sivuaiheena, ei kasvolähikuvaa | Conakry Boulbinet fishing port harbour |
| Kansi 3 | Kaupungin edustan saariston laaja luonnonmaisema | Îles de Los Îles de Loos panorama beach |
| N1 | Vanhan ytimen historiallinen tai nykyinen yleisnäkymä | Tombo Conakry old town historical |
| N2 | Kalastussataman vene- ja rantaympäristö eri tiedostosta kuin kansi | Boulbinet fishing boats Conakry |
| N3 | Conakryn kaupallinen satama tai historiallinen satamanäkymä | Port de Conakry harbour historical |
| N4 | Sandervalia-instituutio dokumentaarisesti; suojattuja teoksia ei pääaiheeksi | Musée national Sandervalia exterior courtyard; vaihtoehtona Camayenne kapok |
| T1 | Saariston rengasmaisema tai luonnon kalliopinta | Îles de Los syenite rocks archipelago |
| T2 | Kassan luonnonranta tai vanha louhosmaasto | Île de Kassa beach quarry bauxite landscape |
| T3 | Roumen saaren/rannan tunnistettava luontoympäristö | Île de Roume Room island Plage du Gouverneur |
| T4 | Tamaran luonnonranta tai metsäinen ulkokaari | Île de Tamara Fotoba coast forest |
| Matkailijalle | Maltillinen tuore pysty, kaupungin oma luonto- tai veneympäristö; suhde 0,60–0,85 | Conakry kapok fishing boat vertical; ei lentokenttää |
| O1 | Tuore tavallisen kadun liikenne-/liikkumisympäristö | Conakry Kaloum street transport |
| O2 | Vanhan keskustan paikkakuva tai puutarhan kasvillisuus | Tombo Kaloum street Camayenne garden |
| O3 | Saaristoretken meri-/rantaympäristö | Îles de Los beach boat sea |
| O4 | Varmasti nimetty ruoka-annos tai hibiskusjuoma, ei pakkaus | Guinea fouti konkoé kansiyé bissap |
| O5 | Kapokki tai luontoympäristö, eri tiedosto kuin muut puutarhakuvat | Conakry botanical garden kapok tree |
| Kohde 1 | Tombon vanhan kaupungin paikka tunnistettavasti | Tombo Island Kaloum old Conakry |
| Kohde 2 | Conakryn satama tunnistettavasti | Port de Conakry harbor ships |
| Kohde 3 | Camayennen puutarha ja sen puut, ei viereinen moskeija pääaiheeksi | Jardin botanique de Camayenne kapok |
| Kohde 4 | Kassan saaren ranta tai metsä, ei koko saariston yleiskuva | Île de Kassa beach coast |
| Kohde 5 | Roumen saaren luonnonpaikka | Île de Roume beach |
| Kohde 6 | Tamaran saaren luonnonpaikka | Île de Tamara coast forest |
| Matkakirjan valokuva | Nykyinen kaupungin/saariston dokumentaarinen kuva tai ≤1900 PD-vedos, jos aidosti löytyy | Conakry Tombo historical photograph 1890 1900 |

**Ennen–nyt:** ei oletusarvoa. Isoisän ajan ≤1900 ja ≥1200 px PD-vedos pitää löytää, esikatsella ja ajoittaa B:ssa. P:n vanhat satamanäkymät on kuvailtu noin 1900–1910: niitä ei siirretä automaattisesti ≤1900-päätiedostoksi. Jos vanhaa kelvollista kuvaa ei löydy, käytetään nykyistä matkakirjan valokuvaa ilman uusi-kenttää ja ennenNyt-paria.

**B:n erilliset portit:** ≥1200 px leveys, tekijä sanatarkasti, commercial-kelpoinen PD/CC0/CC BY/CC BY-SA, kuva silmin tarkistettu, yksi tiedosto kerran, ei pelissä jo käytettyä tiedostoa. Nykyisten kuvien sisältö, kuvatun teoksen oikeus, henkilöiden näkyvyys ja muut rajoitukset arvioidaan erikseen. Luontosaari, kallio, kapokki ja tavallinen vene eivät muutu suojatuiksi taideteoksiksi pelkän FOP-puutteen vuoksi. Toisaalta museon, sataman tai puutarhan nimi ei vapauta kaikkea sen sisällä kuvattua. Modernit suojatut muistomerkit, mausoleumi, moskeija ja tuntemattomat uudet veistokset eivät ole tämän A:n valittuja kuva- tai kartta-aiheita.

## 8. Ristiriidat, epävarmat ja ratkaisut

| Aihe | Luettu ero / puute | Kirjoitusratkaisu |
|---|---|---|
| Kaupungin perustaminen / Tombon siirtyminen | E: Britannia luovutti Tombon 1887, kaupunki muodostui tämän jälkeen. T: Ranskan protektoraatti 1880 ja hankinta 1889. F: maata luovutettiin 1885, Britannia tunnusti Ranskan aseman 1887. BC: ranskalainen perustaminen 1884. Nämä koskevat myös eri toimia. | ”1800-luvun lopulla”; ei yhtä tarkkaa perustamis- tai luovutusvuotta eikä eri toimien yhdistämistä. Kontekstin 1887-kertomus kirjattava toimituksen ristiriidaksi. |
| Siirtomaapääkaupungin vuosi | E: French Guinea -pääkaupunki 1904. H: Rivières du Sud -pääkaupunki 1891, French Guinea 1893; H:n 1904 tarkoittaa kunnan perustamista. BC tukee 1891/1893-kehystä. F antaa Rivières du Sud -vaiheeksi 1889. | Pääkaupunkiasema kehittyi siirtomaakaudella; tarkat eri hallintomuotojen vuodet pois nostoista. Ei 1904:a yksiselitteisenä pääkaupungin perustamisvuotena. |
| 1873 kylätilanne | Lähteet antavat vanhan asutuksen ja 1800-luvun lopun kylätilanteita, eivät tarkkaa vuoden 1873 kuvakaappausta. | Nykyinen pääkaupunki oli tulevaisuutta; ei saaren asumattomuusväitettä tai vuoden 1873 väkilukua. |
| Tombon yhteys niemimaahan | T/BC: pengeryhteys; F ajoittaa sen 1950-luvulle. | Yhteys todettavissa, tarkka valmistumisaika ja väite ”saari ei enää ole saari” jätetään pois. Ei isoisän kävelyä nykyisen yhteyden yli. |
| Niemimaan pituus ja väestö | Konteksti/E antavat 36 km; ei tässä riippumatonta saman rajatun niemimaan mittavarmennusta. Väestöluku kuvaa erityisvyöhykettä, ei niemimaata. | ”Pitkä ja kapea niemimaa”. Väestö vain kontekstin vuosi-/alueilmaisulla; ei asukastiheyttä tai pinta-alaa. |
| Puutarhan vuosi | F, Culture: 1894. GF, Histoire: 1897. G ei anna vuotta. GR on saman GF:n ohjaus, ei toinen lähde. | ”1800-luvun lopun puutarha”; tarkka vuosi pois. Vanhin-superlatiivi ja aluepinta-alat pois. |
| Puutarhan koordinaatit | G 9.531/−13.686 pyöristetty; WD 9.530702/−13.685918; GF sekuntikoordinaatit lähellä. | WD:n oma puutarhapiste 5 desimaalilla, ei viereisen moskeijan piste. |
| Kassa: saari / kommuuni | KA sekoittaa infolaatikkoon saaren ja koko saaristokommuunin hallintoa. WD kaksi normal-rank P625-pistettä, ei qualifiereita. | Nimi ”Kassan saari”, saaren suoraan luettu WP-piste. Ei kommuunin väestölukua/pinta-alaa saaren luvuksi. |
| Roume: WP/WD | R:n sekuntipiste ja GeoNamesiin viittaava WD-piste eivät ole identtisiä. | Valittu R:n aluepiste nimetty lähteineen; ei vaihdeta venelaiturin sijainniksi tai pisteiden keskiarvoksi. |
| Kassa / Factory | L ja KA liittävät Factory Island -nimen Kassaan. BL:n luettelo liittää sen Tamaraan. | Päätekstiin lähteen mukaan Kassan vanha nimi tai jätetään nimi pois; ei tietovisaa Factory-nimellä. Kuva-/arkistometadata ei vaihdu toisen saaren nimeksi. |
| Kassan kaivoksen alku | KA: louhinta 1952; BL: 1949. Historialliset hankkeet/etsintä voivat olla eri vaiheita, mutta sitä ei varmistettu. | ”1900-luvun kaivostoiminta”. Tarkat alku-/loppuvuodet ja ”ensimmäinen tehdas” pois. |
| Fotoba / Fortoba | TA käyttää Fotoba, L sulkeissa Fortoba. | Karttanimi Tamaran saari. Toista nimeä voi käyttää lähdemerkinnällä, ei eri saareksi. |
| Tamaran majakka | TA:n korkeus-/kantamaluvut ja vuosi ovat ilmeisen ongelmallisia (mm. 1000 merimailin ja 100 km:n rinnastus). Riippumatonta oikeus-/mitta-/aikavarmennusta ei tehty. | Majakka ei oma kohde eikä valittu kuva. Ei korkeus-, kantama-, vanhin-/ensimmäinen-lukuja; pelkkä historiassa mainittu majakka erotettuna luontosaaresta. |
| Roume / Aarresaari | R sanoo turistitarinan historialliselta pohjalta näyttämättömäksi. | Ei anekdoottia, ei väitettä Stevensonin inspiraatiosta. |
| Saariston geologia | L esittää magmakivisen syntytulkinnan, LF sanoo rengasmuodon magmasäiliökytkentää todennäköiseksi. | Syeniitti ja rengasmuoto; hypoteesia ei muuteta varmaksi kraatteriselitykseksi. Tarkka miljoonien vuosien ikä pois. |
| Saariston suojelualue | LF:n pinta-ala/saaripinta-alateksti ja eläinluettelo vaativat alkuperäisselvityksen. | Ei suojelualueen hehtaarilukua, simpanssiretkeä, delfiinilupausta tai erityisesti vihreiden kilpikonnien lajisekaannusta. |
| Sataman vienti | P mainitsee bauksiitin; E alumiinioksidin. | Tuoteryhmät erotetaan tai käytetään ”mineraalivienti”; ei jalostettujen aineiden samastamista raaka-aineeseen. |
| Boulbinet / Boubinet | E:n historiallinen Boubinet ja F/BC:n Boulbinet. Oma Wikipedia-paikka-artikkeli oli punalinkki, eikä kohdekoordinaattia ole varmennettu. | Boulbinet nykyisen paikan lähteiden mukaan. Ei tarkkaa kylän ikää eikä omaa karttapistettä; kuvan identiteetti B:ssa. |
| Museo nyt | M:n monet kokoelma-/huone-/aukiolohavainnot ovat vuosilta 2007–2016; V:n museokohta 2020. | Kerrotaan instituutiosta ja dokumentoidusta kokoelmatyypistä, ei nykyisestä tyhjyydestä tai täsmällisestä näyttelymäärästä. Käynnin järjestyminen tarkistetaan. |
| Lentoaseman etäisyys | A mainitsee noin 5 km niemimaan kärjestä; F noin 13 km keskustasta; BC noin 15 km koilliseen. Alku-/loppupisteet ja A:n väite eivät vastaa toisiaan. | Nimi ja CKY; ”palvelee Conakrya”. Ei kilometrilukua tai tarkkaa ajoaikaa. |
| UM ja turvallisuus | U0:ssa ei maasisältöä; U1-luettelossa ei Guineaa. V:n turvallisuusteksti vanha. UK0/UK1 nykyisiä. | UM-luokituksen puute avoimesti raporttiin; UM:n linkkaamasta FCDOsta rajatut nykykäytäntöohjeet. Ei turvallinen/vaarallinen-kokonaisarviota ilman näyttöä. |
| Säätaulukot | E/V:n leipätekstissä ja graafissa on eri normaalikauden lukuja. | Kaikki ilmastoluvut vain annettu saa.json. Ei sadetaulukon korvaamista tai tausta-kentän siirtoa peliin. |
| Kuvat ja arkkitehtuurioikeudet | A ei hae Commonsia eikä todista suojattujen rakennusten oikeuksia. | Kuvatarpeet sanallisia. FOP ei yksin tarkoita kaikkien luonnon-/paikkakuvien kieltoa eikä CC yksin kaikkien kuvattujen teosten vapautta. B tekee kuvan hyväksynnän. |

Tarkkoja lähteissä luettuja vuosilukuja esiintyy yllä ristiriidan dokumentointina; niitä **ei** saa kopioida leipätekstiin pelkän faktapohjassa esiintymisen vuoksi. Tarkka 1960 museon perustamisvuosi on erikseen kahdella riippumattomalla lähteellä tuettu; kontekstin 2025 väkiluku ja valmiin säätyökalun luvut ovat tilauksen erillisiä sallittuja aineistoja. Koordinaatit ovat nimenomaisesti sallittua WP/WD-paikkadataa, eivät historiallisten mittojen kaksilähdeportin korvike.

## 9. Poisjätetyt aiheet ja toistot

- Nykypolitiikka, vaalit, vallankaappaukset, hallinnon vastakkainasettelut, nykyinen rikollisuus ja väkivaltatapahtumien uutiskuvaukset jätetty pois. Nykyoppaassa säilyy vain käytännön liikkumis-/kuvaamisvaraus UK1:stä.
- Camp Boiro, nykyisten poliittisten henkilöiden muistopaikat, mausoleumi, modernit voitto-/uhrimuistomerkit sekä Operation Green Sea eivät ole nosto-, kuva- tai kartta-aiheita tässä työssä.
- Suuri moskeija, Palais du Peuple ja modernit teokset eivät ole karttakohteita/kuva-aiheita. Moskeija saa esiintyä vain puutarhan naapurina sijaintifaktassa; kuvassa sitä ei valita pääaiheeksi. Sainte-Marie-katedraalin teos-/tekijäasema ei ole tässä varmennettu, joten sitä ei täytetä karttaan vain kevyen pisteen luettelon perusteella.
- Matkakirjan isoisän käyntiä tai muistiinpanoja ei ole kirjoitettu. Kaikkien paikkojen 1873-kulma on lähteistetty ajallinen rajaus tai näkyvä epävarmuus.
- Saariston orjakauppa, sen tuomioistuinvaiheet, vapaaksi päästettyjen ihmisryhmien historiat ja Freetown-yhteydet jätetään pois sivun nostoista. Kontekstin lähikaupunki **Sierra Leone** kertoo jo ”Vapautettujen kaupunki” -teemasta, orjasaaresta, vapauden portista, orjalaivoja jahtaavista laivoista ja orjalaivasta piispaksi -tarinasta. Sama tarina Conakryn kuvalla olisi toisto. Saariston brittihallinnan lyhyt ajallinen rajaus ei toista tätä tarinaa.
- Sierra Leonen puu, vanha korkeakoulu, lääkäri-kartantekijä ja Leijonavuorten satama eivät muutu Conakryn nostoiksi. Conakryn satamakohdassa paino on omassa lastiliikenteessä ja Tombon ytimessä, ei Freetownin samassa satamatarinassa.
- Koko Guinean itsenäistymishistoria, joenlähteet Fouta Djallonissa, valtakunnallinen bauksiittitalous, kaikki kansalliskielet ja maan nykyhallinto eivät ole tämän kaupunkilehden teemasivu. `maalehti: null` ei ole lupa kirjoittaa maalehteä kaupungin tilalle.
- Kevyen pisteen Tombo/Kaloum/satama/saaristo-esittely on lähtötieto, ei sellaisenaan uusi kansinosto. Tässä sitä täydennetään paikkahistorialla, rantarakenteella ja saariston geologialla. Kevyen pisteen 1887-lause ja puutarhan ajoitukset on kirjattu ristiriidoiksi.
- Eri osioiden tarkoitus pidetään erillisenä: kansi kuvaa kaupunkia ja instituutioita; luontosivu saariston kalliota ja nimikerrostumia; opas käytännön reittiä; kohdejuttu paikkaa ja aikarajaa. Kuvatarpeissa puutarhan, sataman ja saarten aihetoisto perustellaan tai vähennetään C:ssa.
- Pois jätettyjä kohteita ei palauteta kartan piilopisteiksi, loppurajauksen koordinaateiksi tai kuvatekstien sivuaiheiksi. Jos B ei löydä soveltuvaa kuvaa, siitä syntyy kuvan puute, ei automaattisesti uusi historiallinen tai oikeudellinen väite.

**Vaiheen A toimitettava tila:** osiot 0–9 kirjoitettu; pääartikkeli, historiakronologia ja kaikkien kuuden paikan Wikipedia-artikkelit luettu; kuudelle paikalle WP/WD-piste ja 6–10 faktayksikköä; kansi ja luontoteema neljine nostoineen; opas viisine jaksoineen, parasta 5 ja hyvä tietää 4; kysymykset 5 ja tiedot 3; 24 kuvatarvepaikkaa. Aidot jatkoportit: B:n kaupalliset kuvalähteet ja esikatselut; C:n leipätekstit ja mitat; riippumaton tarkistus; UM-maatiedotteen puutteen hyväksytty raportointi; kartan rantaviivarajaus ja ilmoitettujen koordinaattitarkkuuksien säilyttäminen. Kokonaisen kaupungin valmistumisesta ei tässä anneta kuittausta.
