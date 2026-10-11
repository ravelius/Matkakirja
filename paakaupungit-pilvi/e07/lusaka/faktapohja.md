# Lusaka — faktapohja 0–9, vaihe A

Erä e07, id `lusaka`, maa ZMB. Luettu **12.10.2026**. **A partial:** neljä kansiaihetta, neljä tiedeaihetta, viisi nykyopasjaksoa ja kuvatarpeet koottu. Kuuden–kahdeksan historiallisen ytimen kohteen karttaportti jäi auki. Kolmella keskustan rakennusehdokkaalla on omat WP-pisteet, mutta rakennusten tekijäketjut sekä muiden ydinpaikkojen omat pisteet ja riittävät paikkafaktat puuttuvat. Lusakalle ei perustella pienen pääkaupungin poikkeusta.

**Sääpoiminta varmennettu:** alkuperäinen NOAA/WMO-aineisto on **LUSAKA CITY AIRPORT, WMO 67666, 1991–2020**. Kaikki 48 valittua kuukausiarvoa täsmäävät poimintaan sen pyöristyksellä. Kyse ei ole Kenneth Kaundan kansainvälisen lentoaseman 67665-sarjasta. `tausta.vuosisade: 759` on pyöristettyjen kuukausien summa; lähteen vuosisumma on 757,5 mm. Vuosisummaa ei käytetä lukijatekstissä. `saa.json`:ia ei muutettu.

Kuvia ei valittu, sisältö-JSONia tai Git-operaatioita ei tehty. A on lähdepaketti, ei kuvalupa, valmis kartta tai julkaisu.

## 0. Luetut lähteet, toisto ja 1873-kehys

Alkuperäiset sivut, tekstipoiminnat, revisiot, WD-JSONit ja SHA:t ovat NAS-kansiossa `valiaikainen/lusaka-A/`; koonti `lahteet.json` sisältää 44 onnistunutta lähde-/entiteettitallennetta. Oman hakukierroksen epäonnistumiset on erotettu alempana. Käytettiin yhteistä `sallittu_haku.py`:ta, sen robots-tarkistusta, 1 pyyntö/s -lukkoa ja lähdevälimuistia. Omistajan sallimat tavalliset alkuperäiset Wikipedia-sivut korvaavat estettyjä rajapintoja. Ei `/w/`-/`/api/`-hakuja, User-Agent-vaihtoa, estettyjen lähteiden kiertoa tai varmenteen tarkistuksen poistamista.

### Wikipedia

| Tunnus | Alkuperäinen sivu | Revisio | Luettu osuus / rooli |
|---|---|---|---|
| S1 | [Lusaka](https://en.wikipedia.org/wiki/Lusaka) | en 1379007878 | History, Geography, Cityscape, Climate ja viitteet, Languages, Culture, Economy/Retail, Transport; ei nykyisiä poliittisia henkilöitä |
| S2 | [Timeline of Lusaka](https://en.wikipedia.org/wiki/Timeline_of_Lusaka) | en 1371878276 | varhainen rautatie-/hallintokehitys ja Playhouse; tarkkoja vuosia ei pidetä toisella WP-sivulla automaattisesti riippumattomasti todistettuina |
| S3 | [Cairo Road](https://en.wikipedia.org/wiki/Cairo_Road) | en 1166812708 | kaupallinen pääkatu, rautatien rinnakkaisuus, oma katupiste; lisäviitteiden tarvetta koskeva varoitus |
| S4 | [Lusaka National Museum](https://en.wikipedia.org/wiki/Lusaka_National_Museum) | en 1306719681 | historia, kokoelmat, **oma koordinaatti myös ulkoisten linkkien alapuolella**; galleriakerroksista ristiriita O1:n kanssa |
| S5 | [Cathedral of the Holy Cross, Lusaka](https://en.wikipedia.org/wiki/Cathedral_of_the_Holy_Cross,_Lusaka) | en 1212145328 | anglikaaninen instituutio, Cathedral Hill, oma piste, rakennusvaihe |
| S6 | [Zambia Railways](https://en.wikipedia.org/wiki/Zambia_Railways) | en 1379767482 | main line, Njanji Commuter Service / Mulungushi Railway, historiallinen kalusto; nykyisiä aikatauluja ei julkaista ilman operaattorin vahvistusta |
| S7 | [Zambian cuisine](https://en.wikipedia.org/wiki/Zambian_cuisine) | en 1360407199 | nshima ja lisukkeet; alueiden ruokaa ei väitetä Lusakassa keksityksi, lääkintä-/ravitsemuslupaukset pois |
| S8 | [Barbra Banda](https://en.wikipedia.org/wiki/Barbra_Banda) | en 1376867372 | Early life, jalkapallo/nyrkkeily, Tokion turnaus; terveydentila, henkilön sukupuolta koskevat väitteet, kohut ja sotilasrooli pois |
| S9 | [Chewa language](https://en.wikipedia.org/wiki/Chewa_language) | en 1376712434 | **Town Nyanja (Zambia)** ja Sample phrases; `Town Nyanja` ohjautuu tähän aitoon otsikkoon |
| S10 | [Karst](https://en.wikipedia.org/wiki/Karst) | en 1376842602 | karstin synty, liukenevat kivilajit, maanalainen valunta; yleinen käsite erotetaan Lusakan paikallisesta S1-tiedosta |
| S11 | [Aquifer](https://en.wikipedia.org/wiki/Aquifer) | en 1378966346 | pohjavettä kantava huokoinen/rakoillut materiaali ja täyttyminen; ei koko kaupungin juomaveden nykylaatua koskevia päätelmiä |
| S12 | [Kenneth Kaunda International Airport](https://en.wikipedia.org/wiki/Kenneth_Kaunda_International_Airport) | en 1375286025 | nimi/LUN, siviililentojen kenttä; hinnat/lentoyhtiölistat/reittien nykyisyys pois |
| S13 | [Lusaka City Airport](https://en.wikipedia.org/wiki/Lusaka_City_Airport) | en 1363055407 | erillinen sotilas-/valtion kenttä, FLLC; ei matkailijan kansainväliseksi lentoasemaksi |
| S14 | [State House, Lusaka](https://en.wikipedia.org/wiki/State_House,_Lusaka) | en 1371813415 | Government House -nimi, 1930-luvun rakennus, oma piste, attribuutio; nykyisen presidentin asunto ja turvallisuus-/tunnelitarinat pois |
| S15 | [William Walcot](https://en.wikipedia.org/wiki/William_Walcot) | en 1364899164 | henkilön arkkitehtirooli ja kuolinvuosi; tämä sivu ei itsessään todista Lusakan rakennuksen attribuutiota |
| S16 | [Chilenje House 394](https://en.wikipedia.org/wiki/Chilenje_House_394) | en 1363276981 | oma piste, talomuseon rakennusroolit ja palautus aiempaan asuun; vanhoja aukioloaikoja ei lupaukseksi |
| S17 | [Chilenje](https://en.wikipedia.org/wiki/Chilenje) | en 1333791602 | asuinalue ja eri osat; aluepistettä ei käytetä yksittäisen talon kohdalla |
| S18 | [Monuments and Historic Sites of Zambia](https://en.wikipedia.org/wiki/Monuments_and_Historic_Sites_of_Zambia) | en 1358970474 | Lusakan nimetyt perintökohteet, Central Offices / Old Secretariat, Twickenham Road -kaivauspaikka; luettelon nimi ei ole oma paikallinen piste |
| S19 | [Independence Stadium (Zambia)](https://en.wikipedia.org/wiki/Independence_Stadium_(Zambia)) | en 1372205642 | oma piste ja vanhan/uuden stadionin ero; nykytilan vanhat remonttiväitteet eivät pääsylupauksia |
| S20 | [Woodlands Stadium (Lusaka)](https://en.wikipedia.org/wiki/Woodlands_Stadium_(Lusaka)) | en 1372252561 | oikea Lusakan stadion, oma piste, niukka historia; yleisotsikon Singapore-artikkeli erotettu |
| S21 | [Lusaka National Park](https://en.wikipedia.org/wiki/Lusaka_National_Park) | en 1372763357 | puisto kaakossa Kafue Districtissä, oma karkea aluepiste ja entinen metsäalue; **ei vanhan keskustan kartan täytteeksi** |
| S22 | [Agricultural show](https://en.wikipedia.org/wiki/Agricultural_show) | en 1373627104 | yleinen messutyyppi; ei Lusakan vuosikohtaisen ohjelman tai Showgrounds-pisteen todiste |

### Nykyopas ja alkuperäiset lisälähteet

| Tunnus | Lähde | Luettu osuus / raja |
|---|---|---|
| O1 | [Lusaka, Wikivoyage](https://en.wikivoyage.org/wiki/Lusaka) | en 5353253; Get in/Get around, See, Buy, Eat; vanhat hinnat, aikataulut, lentoyhtiökiellot ja arvottavat museokomiikat jätetään pois |
| O2 | [UM: Sambia, matkustustiedote](https://um.fi/matkustustiedote/-/c/ZM) | fi **13.7.2026**, luettu 12.10.2026: tavanomainen varovaisuus, liikkuminen, sähkö/vesi, alueelliset vesistörajoitukset, maahantulo/kuvaus |
| P1 | [Zambia Airports Corporation: Kenneth Kaunda International Airport](https://www.zacl.co.zm/airport-section/airports/kkia) sekä [virallinen etusivu](https://www.zacl.co.zm/) | nykyinen operaattori ja lentoaseman nimi/rooli; KKIA-sivun laajennustyöstä kertova vanha tulevaisuuslause ei kuvaa nykyvalmistumista |
| P2 | [Cathedral of the Holy Cross: About the Cathedral](https://www.anglicancathedraloflusaka.com/about-us) | instituution oma nimi, Cathedral Hill, hiippakunta ja parish/mother church -roolit; sama lähde kuin S5:n historiallinen viite, ei riippumaton vuosivahvistus |
| P3 | [Orlando Pride acquires Zambian International Barbra Banda](https://www.orlandocitysc.com/pride/news/orlando-pride-acquires-zambian-international-barbra-banda) | seuran tiedote 7.3.2024: Lusaka-syntymäpaikka, hyökkääjä, urapolku ja Tokion kaksi hattutemppua; vanha pelinumero/nykytilan ennusteet pois |
| P4 | [FIFA: The stars illuminating Tokyo 2020](https://inside.fifa.com/tournaments/womens/womensolympic/tokyo2020/news/the-stars-illuminating-tokyo-2020) | turnauksen aikainen alkuperäinen raportti, Bandan kuusi maalia kahden ottelun aikana; ei artikkelin tulevan uran ennusteita faktaksi |
| P5 | [TRID: Njanji Commuter Brings Zambians to Work](https://trid.trb.org/View/409432) | O. Simumbra, *Developing Metros 1994*, s. 44–45: **luettu tietue ja abstrakti**, ei koko maksumuurin takaisen artikkelin sisältöä; ZCCM/Mulungushi ja vanha yhteys vahvistuvat abstraktista |
| P6 | [NOAA: LusakaCity_67666.csv](https://www.nodc.noaa.gov/archive/arc0216/0253808/2.2/data/0-data/Region-1-WMO-Normals-9120/Zambia/CSV/LusakaCity_67666.csv) | alkuperäinen station header, period, parametrien 1/3/4/5 kuukausirivit ja NOY-rivit; `noaa-normal.html` on alkuperäinen **CSV**, ei HTML-tekstilähde |

**Wikidata:** omien WP-sivujen `wgWikibaseItemId` luettiin ennen EntityData-hakua. Raakaentiteetit, revisiot ja P625/P84/P170/P570 tallennettu. Q3267774 (museo): P625 puuttuu, mutta **S4:n oma WP-piste löytyy**. Q8342874 (katedraali): P625 −15.4188, 28.3037, P84 puuttuu. Q135213923 (State House): P625 −15.42891583, 28.32744081, lähellä S14:n omaa WP-pistettä; P84 puuttuu. Q17007582 (Chilenje): P625 −15.44397, 28.33229. Q5017786 (Cairo Road): katupiste, ei aukio-/rakennus-/luontopiste. Q201307 (Independence Stadium): oma stadionpiste keskustan pohjoispuolella. Q8032968 (Woodlands): oma stadionpiste, WD-tarkkuus karkea. Q1784088 (National Assembly): **instituutio, ei P625:ttä**, ei lainata katedraalin tai Manda Hill -ostoskeskuksen pistettä. Q4103082 (Walcot): P570 vuosi 1943; eri tarkkuuksiset päivä/vuositiedot eivät todista rakennuksen tekijäketjua.

### Epäonnistuneet haut ja väärät lähderoolit

- En-WP `Lusaka Playhouse`, `Lusaka railway station`, `Lusaka City Market`, `Chakeluka`, `Lusaka Boys School`, `Agricultural and Commercial Show`, `Cathedral of the Child Jesus, Lusaka`, `Munda Wanga` ja `Munda Wanga Environmental Park` palauttivat 404. Ei väitetä löytyneiksi omiksi artikkeleiksi.
- `Woodlands Stadium` oli **Singapore**, ei Lusaka. Se luettiin tunnistuksen varmistamiseksi, korjattiin oikeaan S20-otsikkoon eikä Singapore-pistettä käytetä.
- Lusaka City Councilin www-sivujen varmenne oli vanhentunut; suora `lcc.gov.zm`-yritys aikakatkaisi. Lusakan maakuntahallinnon, State Housen virallisen sivun, Zambia Railwaysin sekä kahden PDF-lähteen varmenne ei vahvistunut. Tarkistusta ei kytketty pois. Hakutuloksessa näkyvä teksti ei ole täällä onnistunut alkuperäislähteen luku.
- NHCC:n East-Central Region -sivu palautti 403. Marrapodi-/vanhan koulun tai Chakelukan tekijä-/historiaketju ei tämän perusteella ratkennut.
- BGR:n vanha projektisivu ja BGS Earthwise -sivu pysähtyivät uudelleenohjaustilanteeseen yhteisen robots/hakuketjun aikana. Niistä ei poimita paikallisia vedenlaatu-, osuus- tai tutkimuslukuja tähän lähdepakettiin.
- Minpakun `nl2019.pdf` ja ministeriön `ASCZ-2025-Catalogue.pdf` eivät latautuneet varmennevirheen vuoksi. **Niitä ei ole luettu PDF:inä**, eikä tutkimusosasto-/messuohjelmatietoa väitetä niistä varmennetuksi.
- ZACL:n linkki `…/local-cuisine` antoi todellisuudessa **Landing and Parking Charges** -sivun. Sen sisältö ei tue ruokafaktoja. Arvattu `…/index.php/airports/kenneth-kaunda-international-airport` palautti 404; P1 on oikea lopulta luettu sivu.
- O1:n karttapisteet tai karttapalvelun sijainnit eivät korvaa sopimuksen vaatimia oman WP:n tai WD:n pisteitä.

### 1873-kehys

- S1 kuvaa Lenje- ja Soli-yhteisöjen historiaa alueella jo **ennen modernin rautatietaajaman** syntyä. Ei sanota, että ennen eurooppalaista pysäkkiä paikalla olisi ollut asumaton alue.
- Nykyinen rautatien vesipysäkistä kasvanut taajama syntyi **1900-luvun alussa**, pääkaupungin hallintoalue rakennettiin **1930-luvulla**. Vuonna 1873 ei ollut tätä pääkaupunkia, Cairo Roadin nykyistä liikekeskustaa, uusia katedraaleja, kansallismuseota tai lentokenttiä. [S1/S2; yksittäisten rakennusten historia S4/S5/S12–S16]
- S1:n hyvin vanhojen asutusten vuosisadat ovat taustatietoa, eivät nykyisen talon rakennusikää. Tässä ei varmennettu asutuksen rajaa, tarkkaa päällikön kyläpistettä tai Chakelukan ja jonkin nykyisen tontin suhdetta juuri vuonna 1873.
- Lusaaka-nimi liitetään S1:ssä Lenje-päällikköön; eri paikallishallinnon hakutulos nimeää Soli-yhteyden ja Olympia Parkin. Jälkimmäistä alkuperäistä ei saatu luettua, joten tarkka yhteisö/tontti jätetään lukijatekstistä pois. Ei päällikön kuvitteellista sitaattia, elämäkertaa tai määriteltyä asuinaluetta.
- Maaperän geologia ei ole todiste nimetystä luontopolusta tai luolasta nykyisessä ytimessä. Ei keksittyä 1873 luolakohdetta, vesipistettä tai kävelykierrosta.
- Ei isoisän vierailua, ääntä, muistiinpanoa, reittiä tai vuoropuhelua.

**Toisto:** `konteksti.json` luettu; `maalehti: null`, `lahiKaupungit: []`, `lahiNostot: []`. Kevyt kuvaus jo kertoo rautatien vesipysäkistä, pääkaupunkiudesta, Cairo Roadista ja COMESAsta. Kansi ei kopioi sitä: uusi näkökulma on keskustan sijainti kiskojen suhteen, kaupunkikielen rakenne, aterian lisukkeiden rooli ja Lusakassa syntynyt urheilija. Museo-teema käsittelee esineisiin perustuvaa tiedon kokoamista eikä vain tunnusrakennuksen nimeä.

## 1. Perusfaktat

- Lusaka on **Sambian pääkaupunki** eteläisessä Afrikassa, maan eteläisen keskiosan ylängöllä. Ei Victoria-putousten kaupunki eikä valtameren rantakaupunki. [S1]
- Sijainti pelin peruspisteessä **−15.41670, 28.28330**, Q3881; tämä on kaupungin yleispiste, ei karttakohteen sisäänkäynti. [konteksti]
- Moderni taajama syntyi rautatieyhteyden ympärille **1900-luvun alussa**. Nimi juontuu alueen päällikön nimestä. Historiallinen etninen attribuutio ja kylän tarkka tontti ovat avoimia, joten ei niiden yksityiskohtia lopulliseen introon. [S1, ristiriita yllä]
- Pääkaupungin tehtävät siirtyivät Livingstonesta Lusakaan **1930-luvulla**. Sambiaan itsenäistymisen jälkeen Lusaka säilyi pääkaupunkina. [S1/S2]
- Asukasluku käytetään **vain kontekstista**: 2 212 301, **Lusaka District**, vuosi 2022, ZamStatsin eritelty piiriluku. Lukijamuoto **noin 2,2 miljoonaa asukasta Lusakan piirissä vuoden 2022 väestönlaskennassa**. S1:n 2 204 059 poikkeaa; ei syy-arvausta tai epäselvää 3,3 miljoonan taajamalukua.
- Englanti palvelee virallista asiointia; Bemba ja Nyanja kuuluvat kaupungin kieliympäristöön. Town Nyanja on paikallinen kaupunkimuoto, **ei Sambian virallinen kieli**. [S1 Languages; S9]
- Valuutta **Sambian kwacha, ZMW**. Ei summia, hintoja tai valuuttakurssia tähän pakettiin. [konteksti/O1]
- Tarkka 1 279/1 280 metrin korkeusero ei tuo introon lisäarvoa; käytetään ylänköä. Yksittäinen lentoaseman mittauskorkeus ei ole kaupungin koko korkeustaso. [S1/P6]

## 2. Kansi — johdantoehdotus ja 4 aihetta

**Johdantoaihio:** Lusakan kaupallinen keskus kulkee rautatien vieressä, mutta pääkaupungin hallintoalue sijaitsee siitä idässä. Kaupunki kuului rautateiden verkostoon ennen kuin siitä tuli pääkaupunki. Sen arkea voi lukea myös puhutuista kielistä, aterian lisukkeista ja jalkapallokentältä maailmalle lähteneestä pelaajasta. Tämä on nykykaupungin näkökulma; 1800-luvun reittiä ei rakenneta sen pohjalta. [S1/S3/S7–S9]

### K1 — Liikekeskusta kiskojen vieressä

**Wiki:** `Cairo Road`. Faktat [S1 Cityscape/Retail/Economy; S3]:

1. Cairo Road on ydinkeskustan pohjois–eteläsuuntainen kaupallinen pääväylä.
2. Rautatien päärata kulkee sen rinnalla idässä; vanha kaupallinen ydin on radan länsipuolella.
3. Cairo Roadin varressa on kauppoja, palveluita ja toimistoja, eikä koko katu ole yksi nähtävyysrakennus.
4. Hallintoalue ministeriöineen sijaitsee kaupallisesta ytimestä itään Cathedral Hillin ja Ridgewayn suunnalla.
5. S1 nimeää Central Marketin ja New City Marketin Cairo Roadin länsipuolella. Ne eivät tarkoita automaattisesti yhtä ja samaa torirakennusta tai Soweto-nimen täsmällistä vastinetta.
6. Lusakan taloudessa palvelut sekä tukku- ja vähittäiskauppa ovat keskeisiä; ympäröivän maan kuparikaivokset eivät tee keskustasta kaivosmonttua.

**Imu:** keskustan voi tunnistaa rakenteesta: kiskot ja pääkatu ovat vierekkäisiä, hallintoalue erillään. Ei kadun täsmäpituutta tai korkeimman tornin sijoitusta. Katu ei ole tässä rakennus-/aukio-/luontokarttakohde.

### K2 — Hattutemppu kahdesti peräkkäin

**Wiki:** `Barbra Banda`. Faktat [S8 Early life/International career/Other work; P3/P4]:

1. Barbra Banda syntyi Lusakassa; kaupunkisidos on vahvistettu myös seuran alkuperäisessä henkilötiedossa P3.
2. Hän on jalkapallohyökkääjä ja on edustanut Sambian naisten maajoukkuetta.
3. Hän pelasi lapsena myös poikien kanssa. Tarkka aloittamisikä jätetään pois.
4. Banda kilpaili myös nyrkkeilyssä ennen keskittymistä jalkapalloon. Ottelujen lukumäärää tai kaikkien ottelujen voittamissarjaa ei tarvita nostoon.
5. Tokion olympiaturnauksessa hän teki hattutempun Alankomaita vastaan ja toisen Kiinaa vastaan. P3 nimeää molemmat vastustajat; P4 vahvistaa kuusi maalia kahden ottelun aikana.
6. Hattutemppu tarkoittaa tässä kolmea saman pelaajan maalia yhdessä ottelussa: kuusi kahdessa ei tarkoita kuutta yhdessä ottelussa.
7. Hänen uransa on vienyt myös Espanjaan, Kiinaan ja Yhdysvaltoihin. Käytetään urapolkua, ei väitettä tämän päivän pelikunnosta, siirtosumman ennätyksestä tai seuraavasta ottelusta.

**Imu:** kahden eri lajin kokemuksesta kaksi peräkkäistä kolmen maalin ottelua. Ei sitaattia, sukupuolikohua, lääkintätietoa, fyysistä ominaisuutta koskevaa arvelua tai sotilasarvoa. Nimi ei ole päällikkö Lusaaka eikä toisen maan Banda-niminen johtaja. Kuvan on esitettävä oikeaa urheilijaa ja oltava B:n oikeuksiltaan hyväksymä.

### K3 — Nshima tarvitsee vierelleen makuja

**Wiki:** `Zambian cuisine`. Faktat [S7 Food; O1 Eat]:

1. Nshima on Sambian ruoan keskeinen paksu maissijauhopuuro; Lusakassa sitä saa ruokapaikoissa, ei vain kotona.
2. Sen kanssa syödään lisukkeita, joita englanninkieliset lähteet kutsuvat nimellä *relish*.
3. Lisuke voi sisältää kasviksia, kalaa tai lihaa; nshima ei itse tarkoita yhtä tiettyä lihaa tai kastiketta.
4. *Chibwabwa* tarkoittaa ruokaosuudessa kurpitsan lehtiä, ei kurpitsan hedelmästä valmistettua juomaa.
5. *Ifisashi* yhdistää vihreitä kasviksia ja maapähkinöitä; ruokalajiin voidaan myös lisätä lihaa.
6. Puuron pala voi toimia käsin syödessä lisukkeen ottamisen välineenä. Ei ehdotonta väitettä kaikkien nykyisten lusakalaisten pöytätavoista.

**Imu:** aterian maku ei ratkea pelkän puuron nimestä. Ei maissin paikallista keksimisvuotta, kaikkien heimojen lukumäärää, rohtovaikutuksia tai harvinaisten orkideoiden keruuohjeita. Kuva ei esitä Malawi-ateriaa Lusakan ravintolaksi; yleinen annos voidaan nimetä Sambian ruoaksi vain kuva-/lähdetodisteen mukaan.

### K4 — Kaupunkikieli on muutakin kuin lainasanoja

**Wiki:** `Chewa language`, osio **Town Nyanja (Zambia)**; `Town Nyanja` on ohjaus tähän. Faktat [S9; S1 Languages]:

1. Town Nyanja on Lusakassa puhuttu Nyanjan/Chichewan kaupunkimuoto ja kieliryhmien välisen viestinnän kieli.
2. Sen pohja on Nyanjassa, mutta sanastossa on vaikutteita englannista ja Sambian muista kielistä, myös Bembasta.
3. Siinä on Nsengan piirteitä; lähde ei rajaa sitä vain kahden kielen yhteenliimaukseksi.
4. Kaupunkimuodolla ei ole virallisen kielen asemaa.
5. Se eroaa koulussa käytetystä standardimuodosta myös kieliopillisissa kongruensseissa, ei vain sanoissa.
6. S9 torjuu päätelmän, että runsaiden lainojen vuoksi kyse olisi rakenteettomasta slangista. Nosto voi selittää tämän arvottamatta puhujia.
7. *Zikomo* esiintyy S9:n esimerkkitaulukossa kiitoksena sekä Chewassa että Town Nyanjassa. Ei arvata ääntämistä, pakollista fraasia tai oman oppaan kuvitteellista keskustelua.

**Imu:** kaupungin kieli uudistuu, mutta rakenne ei katoa. Tarkkoja kielten puhujamääriä ja opetuspolitiikan vuosia ei tarvita. C voi käyttää kuutta ensimmäistä faktaa ilman kielinäytettä.

## 3. Teemasivu — tiede, 4 aihetta ja minitehtävä

**Vakioaihe/id:** `tiede`. **Nimi:** ”Kiviä, kiskoja ja mittauksia”. Lyhyt johdantoaihio: Lusakan alla vesi kulkee kivessä, vanhassa lähijunakokeilussa bussin kori sai uuden alustan ja sääluvut riippuvat siitä, missä ne on mitattu. Museon esineet puolestaan avaavat aikaa, josta ei ole nykyisiä katuvalokuvia. [S1/S4/S6/S10–S13/P6]

### H1 — Vesi voi kadota maan pinnalta

**Wiki:** `Karst`. Faktat [S1 Geography; S10 johdanto/hydrology; S11 Properties]:

1. Lusakan eteläosien kallioperässä on karbonaattikiveä, kalkkikiveä ja dolomiittista marmoria. Kaikkia kaupungin kiviä ei kutsuta samaksi kivilajiksi.
2. Karsti syntyy liukenevaan kallioperään, tavallisesti karbonaattikiviin; vesi voi käyttää siinä rakoja ja liukenemisen avaamia reittejä.
3. S1 yhdistää Lusakan karstiin pintavesien imeytymisen ja suurten jokien vähäisyyden paikallisella ylängöllä. Ei väitettä, ettei kaupungissa olisi yhtäkään uomaa.
4. Pohjavettä kantava kerros ei automaattisesti ole tyhjä valtava maanalainen järvi: vettä voi olla huokosissa ja raoissa. [S11]
5. S1 erottaa koillisosan valunnan Chongwen suuntaan ja länsi-/eteläosan Kafuen valuma-alueelle; molemmat ovat Zambezin vesistöä. Niiden jokien kaukaisia suita ei sijoiteta keskustaan.
6. Näkymätön valunta ei itsessään takaa veden puhtautta. Nykyoppaassa noudatetaan O2:n juomavesiohjetta, ei tämän yleisen geologian pohjalta tehtyä turvallisuusarviota.

**Raja:** ei paikallista luolaa, karstireikää, luonnonlähdettä tai karttapistettä ilman sen omaa paikkalähdettä. Ei BGR:n lukematta jääneitä vedenlaatu- tai prosenttilukuja. Ei terveys-/saastumisuutista tiedetarinaksi.

### H2 — Bussin kori sai rautatiekiskot alleen

**Wiki:** `Zambia Railways`, Njanji Commuter Service / Mulungushi Railway. Faktat [S6; P5]:

1. Lusakassa kokeiltiin edullista lähijunayhteyttä **1990-luvulla**. Se oli eri palvelu kuin nykyinen kansallinen pitkän matkan päärata.
2. Palvelun aikaisempi nimi oli Mulungushi Railway; Njanji Commuter Service kuuluu saman paikallisen kokeilun historiaan.
3. ZCCM rakensi yhteyden valtiolle, ja sen tytäryhtiö Mulungushi Investments toimi alkuvaiheen operaattorina. [P5:n abstrakti; S6]
4. Yhteys kulki Chilenjen suunnalta keskustan päärautatieaseman kautta George Townshipin/teollisuusalueen suuntaan. Osa käytetyistä raiteista oli jo olemassa. [S6]
5. S6:n mukaan vaunuja tehtiin liittämällä **Tata-bussien koreja kaivosvaunujen alustoihin**. Bussin kori ei tarkoita, että sama bussi olisi ajanut tieltä sellaisenaan kiskoille.
6. Tähän käytettiin samaa kalustotyyppiä kuin kaivosyhtiön työntekijäkuljetuksissa. S6:n Nkana-kuva on kalustotyypin vertaus, ei valokuva Lusakan reitiltä.
7. Kokeilu päättyi saman vuosikymmenen lopulla; myöhemmät elvytyssuunnitelmat eivät ole todiste nykyisestä liikenteestä.

**Raja:** täsmällistä avaamis-/sulkemisvuotta, kilometrimäärää, matka-aikaa tai kuljetettujen henkilöiden lukua ei julkaista tämän lähdekierroksen perusteella. P5:n abstrakti ei yksin todista Tata-koriyksityiskohtaa; se on S6:n lähdeketjuun nojaava, näkyvästi yksilöity tieto. B:n on löydettävä Lusakan todellinen historiallinen kuva tai käyttää oikein nimettyä kalustotyyppiä, ei antaa Nkana-kuvalle Lusaka-kuvatekstiä.

### H3 — Esine on historian havainto

**Wiki:** `Lusaka National Museum`. Faktat [S4 History/Galleries; O1 See]:

1. Kansallismuseo käsittelee Sambian historiaa ja kulttuuria, ei vain Lusakan kaupunkikuvaa.
2. Sen arkeologis-historiallisessa aineistossa on työkaluja, keramiikkaa ja koriste-esineitä. Ei yksittäisen kuvatun esineen ikää ilman esinelähdettä.
3. Näyttelyn ajallinen ulottuvuus kulkee kivikaudesta nykyiseen Sambiaan; täsmällinen miljoonien vuosien luku jätetään pois.
4. Museossa on myös nykytaiteen esittelyä, johon kuuluu maalauksia ja veistoksia. Tämä ei anna oikeutta toistaa nykytaideteoksia kuvissa.
5. Museo avattiin yleisölle **1990-luvulla**; suunnittelussa aiemmin painottunut itsenäistymishistoria laajeni kulttuurihistoriaksi.
6. S4 kertoo Sambian ja Kiinan yhteistyöstä museon valmistelussa. Se ei nimeä museorakennuksen arkkitehtia.
7. Galleriatilojen kerrosjärjestys on S4:ssä ja O1:ssä päinvastainen; teksti kertoo aineistotyypeistä **ilman kerrosopastusta**.

**Imu:** arkinen saviastia ja työkalu voivat säilyttää tietoa ajasta, josta ei ole valokuvia. Ei valmistajien arvailua, arkeologista esinettä vuodesta 1873 tai kuviteltua tutkimuslaboratoriota. Alkuperäinen museon nykyinen kokoelma-/rakennussivu jäi tässä saamatta; näyttelyiden vaihtuminen on B/D:n nykykuvatarkistus.

### H4 — Samassa kaupungissa kaksi eri sääasemaa

**Wiki:** `Lusaka` (Climate) tai `Lusaka City Airport` (aseman paikkarooli). Faktat [S1 Climate/viitteet; S12/S13; P6]:

1. Lusakan lähdesivulla on erilliset ilmastotaulukot kaupunkilentokentälle ja Kenneth Kaundan kansainväliselle lentoasemalle.
2. Molempien otsikossa on 1991–2020, mutta taulukot kuvaavat eri asemia ja niiden kuukausiarvot eroavat.
3. Tämän kaupungin poiminta tulee **Lusaka City Airportin** sarjasta, jonka alkuperäinen NOAA/WMO-asematunnus on **67666**.
4. Matkailijan kansainvälinen lentoasema on Kenneth Kaunda, ei tämä toinen kenttä. Kentän matkailurooli ja ilmastomittauksen lähderooli ovat eri asioita.
5. Pitkän kauden kuukausikeskiarvo ei ole saapumispäivän sääennuste eikä luvattu päivittäinen lämpötila.
6. Vuorokauden keskilämpö, keskimääräinen päivän ylin ja keskimääräinen yön alin ovat eri suureita. Valittu sarja sisältää oikean vuorokauden keskilämmön, ei tässä laskettua `(ylin + alin) / 2` -arviota.
7. Ennen lukujen yhdistämistä tarkistetaan paikka, suure ja kausi. Esimerkiksi muiden taulukoiden kosteus-/aurinkotuntiviitteitä ei liitetä tämän sarjan 48 valittuun kuukausiarvoon.

**Raja:** kaikki mahdolliset lukijatekstin aste-/millimetriluvut vain alkuperäisestä `saa.json`:sta. Ei raakamuotoisen toisen aseman lukuja uuteen sääriviin eikä WP-johdannon ristiriitaista 14,9 °C arvoa. Kuvatarpeessa meteorologinen mittaus voidaan nimetä yleiseksi, ei esitellä sotilaslentokentän kuvaa siviilikenttänä.

### Minitehtävän pohja

**Aihe:** H1:n karsti ja pintaveden maanalainen reitti. Vastaus löytyy tästä teemasivusta.

- Kysymysaihio: ”Mikä Lusakan kallioperän piirre auttaa selittämään, miksi osa vedestä valuu pinnan alta?”
- Oikea: **liukeneva karbonaattikallio ja sen raot**.
- Muut eri vaihtoehdot: merenpinnan vuorovesi / jäätikön päällä kulkeva puro / kaupungin tekosaarten väliset salmet.
- Oikean vastauksen ymmärtämiseen ei tarvita ilmastolukuja, ulkopuolista lähdesivua tai käsittelemätöntä kaupungin historiaa. Ei toista alla olevien viiden visa-aiheen vastausta. C viimeistelee neljä suunnilleen samankokoista vaihtoehtoa; vääristä vaihtoehdoista ei tehdä Lusakan faktaväitteitä.

## 4. Nykyopas — 5 jaksoa

Pelaajateksti tehdään nykyhetkeen. UM:n **13.7.2026** tiedotteen taso on **Noudata tavanomaista varovaisuutta**. Kaupunkia ei kuvata suljetuksi tai sota-alueeksi. Käytännön rajat ilmaistaan lyhyesti, ilman rikostapausten kertomuksia. Vanhan verkko-oppaan hintojen tai turvallisuusluokitusten varaan ei rakenneta palvelulupausta.

### O1 — Perille ja liikkeelle

- Lentoasema **Kenneth Kaunda International Airport**, **LUN**. Nimi ja siviili-/kansainvälinen rooli on luettu P1/S12:sta, IATA S12/O1:stä. Erillinen Lusaka City Airport on pääasiassa valtion/sotilaskenttä, eikä sen sääaseman nimestä johdeta matkailijan saapumisohjetta. [S12/S13/P1]
- Siirtyminen kentältä kaupunkiin sovitaan luotettavan kuljettajan/majoituksen kanssa; ei taksihintaa, ajomatkan täsmäminuutteja tai luvattua kenttäjunaa.
- Liikenne on vasemmanpuoleista. UM varoittaa huonokuntoisista ajoneuvoista ja puuttuvista turvavöistä: turvavyöllisen kuljetuksen valinta on olennaisempaa kuin mainittu halvimmaksi väitetty taksi. [O2]
- Kansallinen rautatie kulkee Lusakan kautta; vanha Njanji-tarina ei ole nykyinen lähijunaohje. Operaattorin sivua ei saatu varmennetusti luettua, joten ei lähtöpäiviä, junanimiä tai vaihtolupausta Kapiri Mposhissa. [S1/S6/O1]
- Kaupunkien ulkopuolella pimeällä ajamista UM kehottaa välttämään kokonaan. Myös kaupungissa pimeän jälkeen käytännöllinen opas suosii järjestettyä kuljetusta. [O2]

### O2 — Cairo Roadin kaupallinen keskusta

- Keskustan hahmottamiseen sopii Cairo Roadin ja rautatien rinnakkaisuus; kadulla on toimistoja, kauppoja ja arkipäiväisiä palveluita. [S1/S3]
- Torin ja ostoskeskuksen palvelut ovat eri ympäristöjä. Central Market, New City Market, Soweto Market ja City Market eivät tässä muodosta yhden rakennuksen varmennettua nimiketjua. [S1/O1]
- Lyhyt kävelyosuus tehdään valoisaan aikaan. Arvoesineet pidetään huomaamattomasti ja asiakirjoista säilytetään kopiot erillään alkuperäisistä. [O2; lyhyt käytännön ohje, ei rikostarinaa]
- Ei kierroksen tarkkaa reittiä tai väitettä, että koko katu tai jokainen tori on aina turvallinen, esteetön tai avoin.

### O3 — Historiaa museossa, luontoa erillisellä retkellä

- Lusakan kansallismuseo antaa näkökulman Sambian historiaan, arkeologiaan ja kulttuuriin. Ovet, näyttelyiden nykyinen sijoittelu ja kuvaussäännöt tarkistetaan paikan ylläpitäjältä; vanhat verkko-oppaan hinnat eivät käy nykyhinnaksi. [S4/O1]
- Holy Cross on anglikaaninen katedraali Cathedral Hillissä, eri instituutio kuin katolinen Child Jesus. Mahdollinen käynti sovitetaan kirkon toimintaan; P2 ei ole lupaus jatkuvasta turistisisäänpääsystä. [S1/S5/P2]
- State House on toimiva hallintoalue, ei avoimen puiston tai museon nimike. Ei käynti-/kuvauslupausta. [S14/O2]
- Munda Wanga ja Lusaka National Park ovat keskustan ulkopuolisia luonto-/päiväretkikohteita; niitä ei niputeta historialliseen ydinkarttaan. Tässä ei varmennettu Munda Wangan tämänhetkisiä eläinkokoelmia tai aukioloa. [S1/O1/S21]
- UM:n vesistörajoitukset koskevat **nimettyä Mwambashi-joen aluetta** sekä kalastusta Kafuen Copperbeltin/Centralin osuuksilla. Niitä ei yleistetä koko Lusakan jokiverkon tai koko Sambian kalastuskielloksi. Retkeä suunnitellessa tarkistetaan nykyinen aluekohtainen ohje; ei kaivosonnettomuuden uutiskertomusta. [O2]

### O4 — Mitä syödään ja mitä aterian nimi kertoo

- Nshima tarjotaan lisukkeiden kanssa; kasvis-, kala- tai lihalisuke muuttaa kokonaisuutta. Ifisashi ja kurpitsan lehdet ovat sopivia ruokasanaston esimerkkejä. [S7/O1]
- Kaupungin ruoka heijastaa myös eri puolilta Sambiaa muuttaneiden ihmisten taustoja; yksi annos ei edusta kaikkia alueita tai jokaista ravintolaa. [S1/S7]
- Ei ravintolasuosituksia, hintaa, pakollista paikallista juomaa tai ravitsemusväitettä ilman ajantasaista omaa lähdettä.
- Juomaveden osalta UM neuvoo käyttämään pullotettua vettä. Geologinen pohjavesiaihe ei kumoa tätä ohjetta. [O2]

### O5 — Milloin tulla ja miten varautua

- `saa.json` on varmennettu **City Airport 1991–2020** -normaaliksi. Sen perusteella sateet keskittyvät loppuvuodesta alkuvuoteen ja keskivuosi on kuiva. Viileämpi keskivuosi ja kuumempi loppukuivan kauden jakso erottuvat; ei yhtenäistä tropiikin hellekuvausta ympäri vuoden. [P6 / poiminta]
- Tarvittaessa luvut: kesäkuun keskilämpö pyöristettynä **17 °C**, lokakuun **25 °C**; tammikuun sade **210 mm**. Vain poiminnan arvoja, ei manuaalista uutta sarjaa. Nollaksi pyöristetty kuukausisade ei lupaa, ettei jokaisena kyseisen kuukauden päivänä voisi sataa.
- UM:n mukaan sadekaudella tiet voivat tulvia ja sivuteiden kulku vaikeutua. Kuivan kauden sähkökatkot ja veden saatavuus voivat vaikuttaa majoitukseen; varajärjestelyt selvitetään etukäteen. [O2]
- Maahantulon, kuvausrajoitusten ja matkavakuutuksen ajantasaisuus tarkistetaan viranomaisilta. Sotilaskohteista tai lentokentistä ei anneta omaa kuvauslupaa. Ei yksittäistä rokotus-/lääkitysohjetta. [O2]

**Parasta — 5 lyhyttä ehdotusta:**

1. Cairo Roadin ja rautatien avulla hahmottuva kaupallinen keskusta (2 tähteä).
2. Kansallismuseon historian ja kulttuurin aineisto, nykykäynti varmistaen (2).
3. Nshima erilaisine lisukkeineen (2).
4. Town Nyanjan näkökulma kaupungin kieliarkeen (1).
5. Erillinen luontopäiväretki keskustan ulkopuolelle, ylläpitäjän nykyohjeen mukaan (1).

**Hyvä tietää — 4 kohtaa:**

- Saapumiskenttä LUN ja City Airportin sääasema ovat eri paikkoja.
- Liikenne kulkee vasemmalla; valitse turvavyöllinen kuljetus ja suunnittele ajaminen valoisaan aikaan.
- Sähkön ja veden varajärjestelyt sekä pullotettu juomavesi kuuluvat valmistautumiseen.
- Aukiolo, pääsy ja kuvaus tarkistetaan kohteelta; aluekohtainen matkustus-/vesistöohje tarkistetaan ennen retkeä.

### Sääauditoinnin todistus

`valiaikainen/lusaka-A/saa-auditointi.json` tallentaa P6:n station headerin ja neljä kuukausirivivertailua. Parametri 1 = Precipitation_Total, 3 = Daily_Maximum_Temperature, 4 = Daily_Minimum_Temperature, 5 = Daily_Mean_Temperature. **48/48 täsmää** poiminnan käytetyllä pyöristyksellä; keskilämpö on omana mitattuna suureenaan.

NOAA:n 1991–2020-otsikko on alkuperäisessä aineistossa, ei vain WP:n taulukon otsikossa. Sateen NOY on 30 kaikille kuukausille, lämpötilariveissä **22–28 havaintovuotta kuukaudesta ja suureesta riippuen**: normaalikausi ei tarkoita, että joka mittaus olisi keskeytymättömästi 30 vuotta täydellinen. Aineisto on silti kyseisen 1991–2020-kauden raportti. P6:n aseman header on 15|25|S, 28|19|E, korkeustieto 1252 m; näitä ei vaihdeta pelin sijainniksi tai kentän sisäänkäyntipisteeksi.

S1:n ilmastojohdannon heinäkuu 14,9 °C ei täsmää kumpaankaan näkyvään 1991–2020-taulukkoon. Poiminnan City-sarjassa kesäkuu on kuukausikeskiarvon viilein, eikä tekstissä oteta johdannosta vastakkaista arvoa. S1:n toisen (Kenneth Kaunda) taulukon joissakin muissa suureissa on 1961–1990-viite; se **ei koske valittua P6:n City-sarjan parametrien 1/3/4/5 aineistoa**.

`tausta.vuosisade: 759` vastaa pyöristettyjen kuukausien summaa; alkuperäisen P6-rivin Annual = 757,5. Ei 759 mm lukijatekstiin lähteen vuosisummana. Poiminnan SHA ennen/jälkeen **6c6f28333b016ad40bc5eafd30d6cfadcc7bbe1024f1561884c4a3ac6dac1639**; tiedostoa ei muutettu. Havainto ja ristiriidat ilmoitettu pääsessiolle.

## 5. Kohdekartta — osittainen paikka-/lähdepaketti

**Kartan portti ei täyty.** Alle olevat N1–N3 ovat keskustan rakennusehdokkaita omine WP-pisteineen, eivät oikeuksiltaan hyväksytty lopullinen kolmikko. N4–N7 ovat todellisia ydinpaikkoja/paikkanimiehdokkaita, joiden vaadittuja pisteitä tai paikallisia faktoja ei saatu suljettua. N8 on erillinen historiallinen talomuseo ydinalueen ulkopuolella. Ei pienten pääkaupunkien poikkeusta, kadun muuttamista aukioksi tai kaukaisen puiston siirtämistä keskustaan.

### N1 — Lusakan kansallismuseo

**Tyyppi:** rakennus. **Oma WP-piste:** **−15.42200, 28.29130**, S4:n ulkoisten linkkien jälkeinen koordinaatti, revisio 1306719681. WD Q3267774 ei sisällä P625:ttä; oma WP riittää pistelähteeksi. **Pisteen rooli:** museo/rakennus, ei varmennettu ovi. **Aika:** nykyinen museo avattiin 1990-luvulla; ei ollut 1873. **Tila:** piste valmis, rakennuksen tekijäketju ja kuvattavat modernit teokset avoimia.

Faktat [S4, S1 Culture, O1 See]:

1. Kansallismuseo on Lusakassa, Independence Avenuen hallintoalueen yhteydessä.
2. Se esittelee Sambian historiaa ja kulttuuria.
3. Historiallinen osuus sisältää arkeologiaa ja esineistöä kivikaudelta myöhempään historiaan.
4. S4 luettelee keramiikkaa, työkaluja ja koristeita; yksittäisen esineen alkuperää ei arvata kuvasta.
5. Museossa on myös nykytaidetta, maalauksia ja veistoksia; niiden kuvalupa arvioidaan teoskohtaisesti.
6. Museohankkeen valmistelu alkoi S4:n mukaan aiemmin Sambian ja Kiinan yhteistyössä; teksti käyttää yleistä vuosikymmenkehystä.
7. Alkuperäinen painotus itsenäistymishistoriaan laajeni kulttuurihistoriaksi ennen yleisöavaamista.
8. Kerrosjärjestys on kahdessa lähteessä ristiriitainen; ei väitetä näyttelyn olevan tietyssä kerroksessa.

**1873:** ei tätä rakennusta tai laitosta. Vanhan esineistön ikä ei tee museotalosta 1800-luvun kohdetta. Tekijä puuttuu P84:stä ja luetuista rakennuslähteistä; tuntematon tekijä ei tarkoita vapaata rakennusta. B/D ratkaisee rakennuksen ja mahdollisten näyttelyteosten oikeudet erikseen.

### N2 — Pyhän Ristin katedraali

**Tyyppi:** rakennus. **Oma WP/WD-piste:** **−15.41880, 28.30370**, S5 / Q8342874. **Rooli:** katedraalin paikka, ei sisäänkäyntivahvistus. **Aika:** 1960-luvun rakennus, ei ollut 1873. **Tila:** oikea paikka ja oma piste; suojatun rakennuksen tekijä/kuolinvuosi puuttuu.

Faktat [S5/P2; S1 Places of worship; O1 See]:

1. Kirkko on **anglikaaninen** katedraali Lusakassa.
2. Se sijaitsee **Cathedral Hill** -nimisellä alueella.
3. Se on Lusakan anglikaanisen hiippakunnan katedraali ja mother church.
4. P2 kuvaa sitä myös seurakuntakirkkona (*parish church*), ei pelkkänä matkailumonumenttina.
5. P2 sijoittaa rakennuksen kaupungin ylle näkymän avaavalle paikalle; ei väitettä koko Lusakan korkeimmasta pisteestä.
6. Rakennus kuuluu 1960-luvun kaupungin kasvuun. S5:n 1962-viite on sama kuin P2, joten käytetään vuosikymmentä.
7. P2 kuvaa instituutiota rukouksen ja sovinnon paikkana; tämä on kirkon oma roolikuvaus, ei oma väite kaikkien kansalaisten uskonnosta.
8. Se ei ole Lusakan katolinen Child Jesus -katedraali, jonka S1 erottaa omana laitoksenaan.

**Raja:** ei kuvata rakennusta sallituksi sillä perusteella, että kukkula tai kirkon instituutio on vanha. Cathedral Hillin nimi ei ole tämän rakennuksen tilalle luotu luontokohde. P84 puuttuu; B ei voi päätellä tekijän kuolleen yli 70 vuotta sitten. Nykykäynnin ja kuvaamisen ehdot erilliset.

### N3 — State House, entinen Government House

**Tyyppi:** rakennus. **Oma WP-piste:** **−15.42889, 28.32722**, S14. WD Q135213923:n piste −15.42891583, 28.32744081 on lähellä, ei kuitenkaan sisäänkäyntitodiste. **Aika:** 1930-luku; ei ollut 1873. **Tila:** historialliseen hallintoalueeseen sopiva paikka, attribuutio-/muutosketju ja pääsyn/kuvaamisen ehdot avoimia.

Faktat [S14; S1 Designation as capital/Cityscape; S15]:

1. Rakennuksen aiempi nimi oli **Government House**.
2. Se liittyi Lusakan rakentamiseen Pohjois-Rhodesian hallintokeskukseksi 1930-luvulla.
3. Government House oli siirtomaa-ajan kuvernöörin virka-asunto.
4. Itsenäisen Sambian aikana se sai State House -roolin, presidentin virka-asunnon ja työpaikan.
5. Se sijaitsee Independence Avenuen suunnalla, kaupallisen Cairo Road -ytimen itäpuolisessa hallintoalueessa.
6. S14 kuvaa alkuperäistä rakennusta uusklassiseksi; nykyisen kokonaisuuden kaikki osat eivät automaattisesti ole samaa rakennusvaihetta.
7. S14 nimeää William Walcotin arkkitehdiksi. S15/WD vahvistavat Walcotin kuolinvuoden **1943**, mutta eivät itsenäisesti Lusakan suunnittelutehtävää.
8. S1 käsittelee Government Housen monen arkkitehdin suunnitteluvaihetta ja suunnitelman myöhempää yksinkertaistamista. Tämä tekee tekijäketjun varmennuksesta tarpeellisen, ei perusteetonta yhden nimen vapautusta.

**Raja:** Walcotin kuolemasta on yli 70 vuotta, mutta rakennuksen attribuutio ja nykykuvan osien tekijät eivät tämän kierroksen perusteella ole suljettuja. Uudempia Nkwazi-/muita lisäosia ei väitetä Walcotin teoksiksi. Virallinen alkuperäissivu jäi varmennevirheeseen. Ei tunnelia, turvatoimia, nykyisen presidentin kotia tai poliittista tapahtumaa tarinaksi. Ei avoimen puiston käyntilupausta.

### N4 — Lusakan päärautatieasema

**Tyyppi:** rakennus, jos juuri asemarakennus varmennetaan. **Oma WP/WD-piste puuttuu** tässä kierroksessa; oma en-artikkeli palautti 404. **Tila:** ei tuotantokarttaan.

Luettu paikkarooli [S1 Transport; S3; S6 Njanji]: asema liittyy Lusakan kansalliseen päärataan, päärata on Cairo Roadin itäpuolella ja vanha Njanji-yhteys kulki keskustan pääaseman kautta. Pohjoisen/etelän reittiluettelo tai koko kaupungin rautatien historia ei anna kuutta itsenäistä faktaa nykyisen asemarakennuksen iästä, rakenteesta ja tekijästä. **1873:** moderni rautatiepaikka ei vielä ollut, mutta nykyisen asematalon rakentamisvuosi ja identiteetti ovat erikseen avoimia.

Ei Cairo Roadin, Chilenjen pysäkin, kaupungin yleispisteen tai TAZARA:n Kapiri Mposhin pisteen lainausta. Tarvitaan oma WP/WD-piste, oikean nykyisen/vanhan asematalon tunnistus ja rakennus-/kuvaoikeusketju.

### N5 — Central Market / New City Market -paikkojen tunnistus

**Tyyppi:** rakennus tai aukio vain todellisen paikkarakenteen mukaan. **Oma piste puuttuu. Tila:** ei tuotantokarttaan.

S1 erottaa kaksi keskustan torinimeä Cairo Roadin länsipuolella; O1 käyttää lisäksi City Market- ja Soweto Market -nimiä, joiden käytössä on eri paikkakuvauksia. Toritoiminta, minibus-/kauppapaikka ja tietty kattava rakennus eivät ole sama asia. Oma en-artikkeli `Lusaka City Market` puuttui. Paikallinen kunta-/torihistorialähde jäi varmennevirheeseen.

Tarvitaan yhden yksilöidyn paikan nimiketju, oma WP/WD-piste, oikea tyyppi, vähintään kuusi paikkafaktaa ja mahdollisen nykyaikaisen katoksen/rakennuksen oikeudet. Ei mielivaltaista Soweto-nimen käyttämistä kaikkien markkinoiden vastineena eikä O1:n koordinaatin kopiointia.

### N6 — Lusaka Playhouse

**Tyyppi:** rakennus. **Oma piste puuttuu. Tila:** ei tuotantokarttaan.

S1 Culture nimeää Playhousen teatteriksi; S2 ajoittaa rakentamisen 1900-luvun puoliväliin. Tämä on kaksi historiatietoa, ei riittävä paikallinen kuuden–kymmenen faktan rakennuspaketti. Oma en-artikkeli palautti 404. Ei tekijätietoa tai näytelmän/esityksen kuvalupaa. **1873:** ei tätä modernia teatterirakennusta. Tarvitaan oma piste, rakennuksen historia ja tekijän/nykyisten osien ketju; näyttelijä-/julistekuvat arvioidaan erikseen.

### N7 — Old Secretariat / Central Offices

**Tyyppi:** rakennus. **Oma piste puuttuu. Tila:** ei tuotantokarttaan.

S18 nimeää Independence Avenuella sijaitsevat vanhat keskushallinnon toimistot, myöhemmän Cabinet Office -roolin ja 1930-luvun rakentamisen. S1 kertoo hallintoalueen rakentamisesta, mutta ei yksilöi kaikkia nykyisiä toimistorakennuksia tähän yhdeksi kohteeksi. Luettelon täsmällistä vuotta ei julkaista ilman riippumatonta lisälähdettä. **1873:** ei nykyistä hallintorakennusta.

Kuuden paikallisen faktan, tekijäketjun ja oman WP/WD-pisteen vaatimukset avoimia. Ei State Housen, museon tai hallinnollisen piirin yleispisteen lainausta. ”Old”-sana ei tee uudempien lisärakennusten kuvaoikeutta vapaaksi.

### N8 — Chilenjen talomuseo 394, erillinen lisäehdokas

**Tyyppi:** rakennus. **Oma WP/WD-piste:** **−15.44397, 28.33229**, S16 / Q17007582. **Rooli:** talomuseon paikka, ei koko Chilenjen asuinalue. **Tila:** historiallisen keskustan ulkopuolinen lisäehdokas, ei venytä ydinkarttaa; rakennuksen alkuperä/tekijäketju avoin.

Faktat [S16/S17/S18]:

1. Kyse on Chilenjen asuinalueella sijaitsevasta talomuseosta, ei suuresta presidentin virkapalatsista.
2. Kenneth Kaunda asui talossa itsenäistymistä edeltäneen 1960-luvun alussa.
3. Talo 394 on pieni asuintalo, jossa S16 kuvaa makuuhuoneita, olohuoneen ja keittiön.
4. Museokokonaisuuteen liittyy kolme eri taloroolia; ne eivät ole kaikki saman näyttelyn yksi rakennus.
5. Talon 394 sisustus ja henkilökohtaisia esineitä pyrittiin palauttamaan aiemman asumisvaiheen mukaisiksi.
6. Talo 395 sisältää Lusakan historiaa käsittelevää näyttelyä; talo 393 on lähteen mukaan hoitajan asuintalo.
7. Kokonaisuudesta tehtiin kansallinen muistomerkki ja museo 1960-luvun lopulla.
8. Alkuperäisen asuintalon rakentamisvuosi, tekijä ja myöhemmän restauroinnin tekijät eivät ratkea näistä tiedoista. Vuoden 1873 rakennusta ei väitetä.

Ei nykyisen poliittisen henkilön tarinaa, museon perustamisvuosivisaa, päivittäistä pääsylupausta tai restauroinnin käyttöä koko rakennuksen tekijäsuojan todisteena. **Ei ehdotettuun ydinkarttarajaukseen.**

### Muut luetut paikkaehdokkaat ja kartan rajaus

- **Cairo Road:** oma piste −15.41661, 28.28168 on **kadun** piste. Katua ei merkitä rakennukseksi, aukioksi tai luontokohteeksi. Nimettyä erillistä aukio-/tonttipistettä ei löytynyt.
- **National Assembly:** WD Q1784088 kuvaa instituutiota eikä sisällä P625:ttä; ei konkreettisen parlamenttirakennuksen omaa pistettä/tekijäketjua. Manda Hillin kukkulalle ei lainata kauppakeskuksen tai parlamentin oletettua pistettä.
- **Chakeluka/Twickenham Road/Olympia Park:** kaupungin varhaisen asutuksen taustaa ja S18:n kaivauspaikkanimi, mutta oma paikkapiste, nykyinen kohderakenne ja historian suhde toisiin nimimuotoihin puuttuvat. Ruina-/luontotyyppiä ei valita arvaamalla.
- **Independence Stadium:** oma WP −15.37111, 28.26972 ja WD −15.371064, 28.269631; toiminnallinen urheilupaikka, mutta vanhan keskustan pohjoispuolella. Läheinen uudempi National Heroes on eri rakennus. Vanha stadionin kunto-/remonttiteksti ja tekijäketju auki; ei 6 kohteen täytteeksi.
- **Woodlands Stadium (Lusaka):** oma WP −15.44590, 28.34750; oikea Lusakan paikka, niukka historia, ydinkeskustan ulkopuolella. Ei Singaporen stadionikuvaa, pistettä tai avaamisvuotta.
- **Munda Wanga, kansallispuisto, Kalimba, Lilayi ja Monkey Pools:** todellisia retkipaikkoja tai ehdokkaita lähteissä, mutta eivät ydinkeskustan luontokohteita. Ei nimiä tai eläinlistoja nykyiseksi palvelulupaukseksi ilman ylläpitäjää. Ei parkki-/golfalueen kutsumista ikivanhaksi luonnonmetsäksi.

**Ehdollinen rajaus vain N1–N3:n pisteiden geometrian tarkasteluun:** länsi **28.28850**, itä **28.33010**, pohjoinen **−15.41610**, etelä **−15.43160** (noin 300 m marginaali). Tämä ei ole julkaistava kolmen kohteen kartta eikä kata muita ehdokkaita. Lopullinen rajaus lasketaan vasta, kun oikea 6–8 kohteen ydinkokonaisuus on hyväksytty.

## 6. Viisi visa-aihetta, tasot ja kolme taustatietoa

C muotoilee lopulliset kysymykset ja neljä samankaltaista vaihtoehtoa. Väärät vaihtoehdot eivät jää kertovaan tekstiin faktaväitteiksi. Minitehtävän karstivastaus ei esiinny näissä.

| Aihe / taso | Oikea tieto | Kolme lähdetietoa | Vaihtoehtojen periaate |
|---|---|---|---|
| V1: minkä maan pääkaupunki, 1 | Sambia | Lusaka on Sambian pääkaupunki; se on maan sisäosien ylängöllä; maalla ei ole merenrantaa. [S1/konteksti] | Neljä eteläisen Afrikan maata; ei kaupunki kolmen maan seassa |
| V2: nshiman pääraaka-aine, 1 | maissijauho | nshima on paksu puuro; sitä tehdään maissijauhosta; makuja tuovat erilliset kasvis-/kala-/lihalisukkeet. [S7] | Neljä viljaa/raaka-ainetta; kysymys tämän Sambian ruoan tavanomaisesta muodosta, ei kaikkien Afrikan puurojen reseptistä |
| V3: pääkaupungin edeltäjä, 2 | Livingstone | Lusaka kehittyi rautatien yhteyteen; hallintokeskus siirtyi Livingstonesta; siirto tapahtui 1930-luvulla. [S1/S2] | Neljä oikeaa Sambian kaupunkinimeä, ei Harare maan seassa; ei yksittäisen päivän muistamista |
| V4: kaksi kolmen maalin ottelua, 2 | Barbra Banda | hän syntyi Lusakassa; hän on Sambian jalkapallohyökkääjä; hän teki Tokion turnauksessa hattutempun sekä Alankomaita että Kiinaa vastaan. [S8/P3/P4] | Neljä jalkapalloilijan nimeä, nimet varmistettava; ei samannimisten poliitikkojen sekoitusta |
| V5: vanhan Njanji-kaluston korit, 3 | bussien korit | kyse oli Lusakan 1990-luvun lähijunakokeilusta; rakentajana ZCCM; S6:n mukaan Tata-koreja liitettiin kaivosvaunujen alustoihin. [S6/P5] | Neljä kulkuneuvon korityyppiä; ei epämääräistä ”ajoneuvoja” oikeaksi vastaukseksi eikä nykyisen palvelun oletusta |

Jos V5:n Tata-yksityiskohta halutaan erityisesti kahdesti alkuperäislähteistettynä, lisätodiste tarvitaan; P5:n koko artikkelia ei tässä luettu. Vaihtoaiheeksi voidaan ottaa **LUN = Kenneth Kaunda International Airport**, mutta vaihtoehtoiset IATA-koodit tarkistetaan erikseen. Ei tuo julkaisun tarkistamatta jääneitä urheilu-/kuljetusmääriä piilofaktoiksi.

## 7. Kuvatarpeet — vain aiheet, ei kuvia valittu

B:n tehtävä on löytää todellinen tiedosto, lukea tekijä/lähde/lisenssi/ikä/kaupallinen käyttö, katsoa jokainen kuva ja tarkistaa sama tiedosto pelissä. Alla hakusanat eivät ole Commons-hakuja tai kuvalupia. Moderneja rakennuksia/teoksia ei hyväksytä yleiskuvan varjolla; tuntematon tekijä ei ole vapaa tekijä.

| Kohta | Tarve / sanat | Kuva-/paikkaraja |
|---|---|---|
| Kansikuva 1 | `Lusaka Cairo Road cityscape railway` | laaja nykyinen kaupallinen ydin, ei yhden pilvenpiirtäjän yksityiskohta; näkyvien rakennusten oikeudet arvioitava |
| Kansikuva 2 | `Lusaka city street panorama central district` | eri puoli keskustaa, laaja yleiskuva; ei toista samaa tiedostoa tai väitä vanhaa kuvaa tuoreeksi |
| Kansikuva 3 | `Lusaka Cathedral Hill city panorama` | paikkatodiste ja suojattujen rakennusten ketjut ennen hyväksyntää; ei kirkon korvaamista ”kukkulaluonnoksi” |
| K1 | `Lusaka Cairo Road railway commercial district` | kaupallisen kaupungin rakenne; katukuva ei ole ydinaukion todistus |
| K2 | `Barbra Banda Zambia football` | oikea henkilö, lisenssi ja kuvaajan oikeudet; ei vapaaksi oletettua seuran pressikuvaa |
| K3 | `Zambia nshima relish ifisashi` | annoksen oikea tunnistus; kuva muualla voidaan nimetä yleisesti Sambian ateriaksi, ei Lusakan ravintolaksi |
| K4 | `Lusaka market conversation street signs` | kaupunkikielen konteksti ilman lavastettua sitaattia; kyltti ei yksin todista puhekieltä |
| H1 | `Lusaka limestone dolomite karst` | paikallinen todistus; yleistä karstia vain selvästi yleisenä, ei toisen maan luola Lusakaksi |
| H2 | `Njanji Mulungushi commuter train Lusaka` | historiallinen Lusakan kalusto ensisijainen; Nkana-kaivosjunaa ei nimetä Lusakan liikenteeksi |
| H3 | `Lusaka National Museum archaeology pottery tools` | esineiden omat lähteet/ikä ja näyttelykuvan oikeudet; nykytaiteen toisto ei hyväksytty |
| H4 | `weather station thermometer climatology Zambia` | mittauksen idea; sääinstrumentti ei tee sotilaslentokentän kuvaamisesta sallittua, ei KKIA-kuvaa City-mittauspaikaksi |
| Matkailijalle | `Lusaka recent street portrait orientation` | tuore maltillinen pysty, w/h 0,60–0,85; ei vanha postikortti |
| Opas perille | `Kenneth Kaunda International Airport exterior` | LUN, nykyinen kenttä, rakennus-/kuvausrajoitteet erikseen; ei FLLC |
| Opas keskusta | `Lusaka Central Market Cairo Road daytime` | tarkka torinimike ja paikka B:n kuvassa; ei tilapäisen kojun nimeämistä markkinahalliksi |
| Opas nähtävä | `Lusaka National Museum exterior historic objects` | oikeudet ja nykyinen tunnistus ennen hyväksyntää |
| Opas ruoka | `nshima Zambia vegetables meal` | eri tiedosto kuin K3, ei kuvaajalta lupaa arvaamalla |
| Opas sää | `Lusaka dry season streets` | nykyinen kaupunkikuva, ei väitettä kuvan kuukaudesta ilman päiväystä |
| Kartta N1–N3 | paikan oma nimi | vain jos kohdeportti ja teosketju sulkeutuvat; yhden rakennuksen kuva ei vastaa koko hallintoalueen oikeuksia |
| Kartta N4–N7 | asema / yksilöity tori / Playhouse / Old Secretariat | haku vasta paikkaidentiteetin ja oman pisteen varmistuttua |
| Valokuva | `Lusaka old railway settlement archival` | ennen vuotta 1900 oleva Lusakan nykytaajamakuva ei oletus: taajama syntyi myöhemmin. Jos sopivaa vanhaa alkuperäistä ei löydy, nykykuva ilman kuvitteellista isoisän valokuvaa |
| Ennen–nyt | `Lusaka Cairo Road historical panorama` | vain sama todellinen paikka, vanhan kuvan päiväys/oikeudet ja nykykuvan rakennusketju varmennettuna; muuten pari jätetään pois |

Kartta- ja ennen–nyt-kuvien määrä on ehdollinen; uusia yli kahden vuosikymmenen takaisia pressi-/museokuvia ei nimetä tuoreiksi. H1/H4 voivat jäädä ilman kuvaa, mutta oppaan kuvattomuuden enimmäisraja tarkistetaan erikseen C:ssä. Koko teemasivulle ei valita neljää pelkkää yleistä tieteen arkistokuvaa, jos paikallista aihetta voi todistaa.

## 8. Ristiriidat ja epävarmat — ratkaisut

1. **Population scope/value:** kontekstin Lusaka District 2 212 301 vuonna 2022 vs S1:n 2 204 059. Kontekstin omistajan vahvistamaa lukua ei korvata; lukijamuoto noin 2,2 miljoonaa ja piiri/vuosi. Eroa ei selitetä ilman alkuperäisten taulukoiden vertailua.
2. **Nimen yhteisö/tontti:** S1 Lenje-päällikkö vs paikallishallinnon hakutuloksen Soli/Olympia Park. Jälkimmäisen alkuperäistä ei saatu luettua. Intro käyttää päällikön nimiperinnettä ilman yhteisö- ja tonttitäsmennystä; ei Manda Hill -ostoskeskuksen pistettä vanhaksi kyläksi.
3. **Cairo Roadin pituus:** S1 kertoo noin neljä kilometriä, S3 1,8 km ja kunnan hakutulos 1,6 km. Rajaus voi selittää eron, mutta sitä ei tässä todistettu. Lukija saa suunnan ja rakenteen, ei pituuslukua.
4. **Museon kerrokset:** S4 sijoittaa arkeologian alas/nykytaiteen ylös; O1 päinvastoin. Ei kerrosopastusta. S4:n oma koordinaatti löytyy **References/External links -osion jälkeen**; artikkelin keskeyttäminen See also -kohtaan olisi virheellinen pistepuutepäätelmä.
5. **Ilmastojohdanto vs sarja:** 14,9 °C heinäkuu ei kumpikaan näkyvä 1991–2020-taulukko. Käytetään vain varmennettua valittua City-sarjaa ja sen kesäkuun viileintä kuukausikeskiarvoa.
6. **Kaksi lentoasemaa:** City Airport/FLLC/67666 ei LUN/Kenneth Kaunda/67665. Ajankohtaisten lentojen nimi, sääasema ja historiallinen kenttärooli erotetaan.
7. **Vuosisade:** 759 on pyöristettyjen kuukausien summa, P6 Annual 757,5. Ei 759:n esittämistä lähteen täsmällisenä vuosinormaalina. Poimintaan ei tehty käsin korjausta.
8. **NOY:** normaalikausi on oikea, mutta lämpötilojen käytettyjen vuosien määrä vaihtelee. Ei ”täydellinen 30 vuoden havaintosarja joka kuukaudelle” -väitettä.
9. **State Housen tekijä:** S14 nimeää Walcotin, S1 kertoo useiden arkkitehtien suunnitteluvaiheesta; S15 todistaa henkilön kuolinvuoden, ei kaikkia toteutettuja osia. Attribuution ja muutosketjun portti avoin. Nykyinen turva-/vierailuehto erillinen.
10. **Njanji ja nykyliikenne:** paikallisen 1990-luvun kokeilun historia, myöhempi samanniminen palvelu, pitkän matkan Zambia Railways ja nykyiset elvytyssuunnitelmat eivät ole yksi jatkuva nykyinen lähijunayhteys. Ei O1:n vanhoja lähtöaikoja nykyoppaaseen.
11. **Tata-korit:** S6:n yksityiskohta, P5:n luettu abstrakti tukee rakentaja-/järjestelytaustaa mutta ei yksin korikohtaa. Tarvittaessa toinen varsinainen kalustolähde ennen visan V5 hyväksyntää; ei kokotekstin lukemisen väitettä.
12. **Tori-identiteetti:** Central Market / New City Market / City Market / Soweto Market -alias ei suljettu. Eri koordinaatti-/myyntialuekuvausta ei yhdistetä automaattisesti.
13. **Rantapaikka/luonto:** paikallisen karstin ja valuma-alueen kuvaus ei anna kaupungin keskustan joenrantapistettä. Munda Wanga, kansallispuisto ja muut retkipaikat jäävät erillisiksi; suojattua kirkkoa tai parlamenttia ei nimetä kukkulaksi kuvasääntöjen kiertämiseksi.
14. **Nykyopas:** O1:n EU-lentoyhtiökieltoja, museon leimaavia kommentteja, hintoja ja kenttämatkan eri kilometrejä ei julkaista. P1:n vanha laajennuslause ei uusi rakentamisuutinen. UM:n oikeat nykyiset käytännön ohjeet on luettu, rajattu ja päivätty.
15. **Kaksi PDF-yritystä:** kumpikaan ei latautunut. Ei lähteitä näyttelytutkijoiden osastoluetteloon tai vuoden 2025 messuohjelmaan, vaikka hakutulos näkyi.

## 9. Pois jätetyt aiheet ja avoimet portit

### Pois tästä paketista

- Nykyinen puoluepolitiikka, vaalit, edustajaluettelot, presidentin yksityinen koti, turvallisuustunnelit, pidätys-/rikosjutut ja sodan tapahtumakertomukset.
- Kaivosonnettomuuden numerot ja tapahtumadraama. Virallinen aluekohtainen vesistörajoitus mainitaan vain nykyretken käytännön ohjeena.
- Bandan sukupuolta tai terveydentilaa koskevat kohut, loukkaantumisuutiset, testit, sotilasarvo ja julkaisemattomat arvailut. Urheilun source-backed rooli säilyy.
- Tarkat siirtosummat, yleisökapasiteetit, korkeiden tornien paremmuuslistat, suurimpien kauppakeskusten määrät, historiallinen väestöprosentti ja heimojen määrät.
- Suojatut nykyiset veistokset, Freedom Statue -pääaihe, moderneja taideteoksia karttakohteiksi tai niiden päällisen kuvalisenssin perusteella vapauttaminen.
- Tuntemattoman arkkitehdin rakennukset ”vapaina”, Walcotin henkilösivun käyttäminen kaikkien State Housen lisäosien tekijäketjuna ja Cathedral Hillin muutto kirkon oikeudet ohittavaksi luontopaikaksi.
- Chakelukan arkeologinen vuosiluku ja tonttipiste ilman paikan omaa todistetta; päällikkö Lusaakan kuviteltu elämäkerta tai vuoden 1873 katu-/rautatienäkymä.
- Katupiste, kaupungin yleispiste, kaivauskohteen listan koordinaattiarvaus, karttapalvelun piste, kaukainen kansallispuisto tai Manda Hill -ostoskeskus väärän ydinpaikan korvikkeena.
- Nsima/nsima-perinteen Malawi-listausvuosi Sambian ruoaksi, kaikkien paikallisten ruokalajien yhteinen alkuperä, terveys-/rohtolupaukset tai suojellun kasvin hankintaohje.

### Ennen A valmis / B–D-ketjun jatkoa tarvittavat ratkaisut

1. **Ydinkartta 6–8:** todellinen paikkaidentiteetti, oma WP/WD-piste ja kuusi–kymmenen paikallista faktaa N4–N7:lle tai muille aidosti ytimeen sopiville rakennus-/aukio-/luontopaikoille. Alle kuusi ei kuittaudu väestöltään suuren pääkaupungin poikkeuksella.
2. **Rakennusten tekijät:** N1/N2 ja N3:n toteutus-/lisäosat, sekä uusien ehdokkaiden nykyiset rakennukset. Vain nimeämätön tai vanha instituutio ei ratkaise suojaa. A ei anna lupia.
3. **Nykykuvien tunnistus:** oikeat rakennukset/torit/urheilija/kalusto/esineet, kuvat katsottava ja teoskohtaiset oikeudet tarkistettava. Nykyopas ei lupaa julkista pääsyä suljetulle hallintoalueelle.
4. **Tarvittaessa Njanji V5:** toinen riippumaton korikaluston alkuperäislähde tai visan vaihto lentokenttäaiheeseen; yleinen TRID-abstrakti ei ole koko artikkeli.
5. **Valokuva/ennen–nyt:** vain todennettava aikainen kuva; isoisän ajalta ei keksitä modernia Lusakaa.
6. **C ja D:** teksti-/minitehtävä-/visamuodot, suomen luettavuus, faktaväitteiden lopullinen rajaus ja kuvat. A:ssa ei sisältö-JSONia, tarkistimen koko sisältöajoa tai julkaisua.

**Luovutus:** hyödyllinen A partial; 0–9 sekä 4 + 4 ja nykyopas on koottu, ilmastosarja alkuperäisesti varmennettu. Kartta-/tekijäportit jäävät näkyvästi auki. Lopullinen kohdemäärä, kuvahyväksyntä ja paketin valmistuminen ovat pääsession erillisiä päätöksiä.
