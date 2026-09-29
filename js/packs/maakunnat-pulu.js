/*
 * MAAKUNTIEN PULU-KYSYMYKSET — Karttatyökalun Maakunnat-tila, erä 3.
 *
 * Fablen päätös 22.9.2026: oma tiedosto (ei js/packs/maakunnat-
 * luonnehdinnat.js:ssä), jotta luonnehdinnat pysyy kevyenä — tuoja
 * (Pelikoodari) tuo tämän vasta dynaamisesti kun pelaaja avaa pulun
 * maakuntakortilla. Avaimet ovat TÄSMÄLLEEN samat kuin
 * MAAKUNTIEN_LUONNEHDINNAT:ssa (js/packs/maakunnat-luonnehdinnat.js).
 *
 * Rakenne: { ISO: { 'alueen avain': [ { q, a }, ... ] } }. 2-3 paria
 * per alue, vastaus enintään 400 merkkiä (tests/maakunnat-pulu.test.mjs
 * vartioi molempia sekä avainten täsmäystä luonnehdintoihin).
 */
export const MAAKUNTIEN_PULU = {
  FRA: {
    "Hauts-de-France": [
      { q: "Miksi täällä on niin paljon noita keinotekoisia kukkuloita, terrilejä?", a: "Terrilit ovat hiilikaivosten sivukiveä, joka kasattiin vuosikymmenten ajan kaivosten viereen. Osa niistä on nykyään vihertynyt luontoalueeksi, ja koko kaivosalue Nord-Pas-de-Calais'ssa hyväksyttiin Unescon maailmanperintöön vuonna 2012." },
      { q: "Miksi Louvre-Lens rakennettiin juuri tänne, kauas Pariisista?", a: "Museo avattiin vuonna 2012 tuomaan työpaikkoja ja uutta elinvoimaa alueelle, jota kaivosten sulkeminen oli koetellut pahoin. Se rakennettiin entisen kaivoksen tontille keskelle entistä kaivostyöläisten kaupunkia." },
      { q: "Milloin viimeinen kaivos täällä lopulta suljettiin?", a: "Nord-Pas-de-Calais'n kaivosalueen viimeinen kaivos suljettiin vuonna 1990 Oignies'ssa. Se päätti yli 250 vuotta kestäneen hiilenlouhinnan perinteen seudulla." },
    ],
    "Grand Est": [
      { q: "Miksi juuri Strasbourgissa istuu Euroopan parlamentti?", a: "Kaupunki valittiin symboliseksi paikaksi Ranskan ja Saksan sodan jälkeisen sovinnon merkiksi – samasta kaupungista, josta alue riistettiin Saksalle 1871 ja palautettiin 1918. Euroopan neuvosto perustettiin sinne jo 1949, ja parlamentti sai istuntopaikakseen Strasbourgin virallisesti 1992." },
      { q: "Kuinka monesti Alsace vaihtoi omistajaa noin 70 vuoden aikana?", a: "Alue siirtyi Ranskalta Saksalle 1871, takaisin Ranskalle 1918, uudelleen Saksalle natsimiehityksessä 1940 ja lopulta Ranskalle 1945. Neljä omistajanvaihdosta yhden ihmiselämän aikana selittää, miksi moni kylä käyttää yhä sekä ranskan- että saksankielistä nimeään." },
      { q: "Kuinka vanhoja Strasbourgin joulumarkkinat oikein ovat?", a: "Christkindelsmärik-markkinat on järjestetty jo vuodesta 1570 lähtien, joten ne ovat yksi Euroopan vanhimmista joulumarkkinoista. Perinne on säilynyt käytännössä keskeytyksettä yli 450 vuotta." },
    ],
    "Provence-Alpes-Côte-d'Azur": [
      { q: "Miksi Cannesissa alettiin järjestää elokuvafestivaalia?", a: "Festivaali perustettiin 1946 vastapainoksi Venetsian festivaalille, jota fasistinen Italia oli alkanut käyttää propagandaan. Se oli tarkoitettu riippumattomaksi, kansainväliseksi elokuvajuhlaksi, ja punainen matto on kuulunut siihen alusta asti." },
      { q: "Miksi laventelia viljellään juuri täällä?", a: "Provencen kuiva kalkkikivimaaperä ja korkeat ylängöt Vaucluse'ssa sopivat laventelille erinomaisesti. Sato korjataan heinäkuussa, ja suuri osa siitä päätyy läheisen Grassen hajuvesiteollisuuden raaka-aineeksi." },
      { q: "Mikä tekee Grassesta erityisen kaupungin?", a: "Grasse on tunnettu maailman hajuvesipääkaupunkina jo 1500-luvulta lähtien, jolloin nahanparkitsijat alkoivat valmistaa myös tuoksuöljyjä. Kaupungissa toimii yhä useita maailman johtavia hajuvesitaloja." },
    ],
    "Auvergne-Rhône-Alpes": [
      { q: "Miten Lyonista tuli Ranskan gastronomian pääkaupunki?", a: "Silkkiteollisuuden tuoma vauraus loi 1800-luvulla pohjan kaupungin ruokakulttuurille, ja niin sanotut mères lyonnaises -naiskokit tekivät perinneruoista kuuluisia. Myöhemmin huippukokki Paul Bocuse vahvisti Lyonin maineen ruoan pääkaupunkina koko maailmalle." },
      { q: "Miksi Auvergnen tulivuoret ovat pyöreitä eivätkä teräviä?", a: "Ne ovat sammuneita tulivuoria, joiden viimeisimmät purkaukset tapahtuivat noin 6000–7000 vuotta sitten. Chaîne des Puys -ketju hyväksyttiin Unescon maailmanperintöön 2018 juuri ainutlaatuisen, tasaisesti pyöristyneen muotonsa vuoksi." },
      { q: "Mikä kuuluisa kivennäisvesi tulee juuri tältä alueelta?", a: "Volvic-vesi pullotetaan samannimisessä kylässä Puy-de-Dômen alueella, tulivuoristosta suodattuneesta pohjavedestä. Vettä viedään nykyään kymmeniin maihin ympäri maailmaa." },
    ],
    "Nouvelle-Aquitaine": [
      { q: "Miten Bordeaux'n raitiovaunut oikein kulkevat ilman ilmajohtoja?", a: "Historiallisessa keskustassa käytetään maahan upotettua virranjakojärjestelmää (APS), joka syöttää sähköä vain raitiovaunun alta kiskojen välistä. Ratkaisu kehitettiin 2000-luvun alussa juuri siksi, ettei kaupunkikuvaa haluttu sotkea johdoilla." },
      { q: "Kasvaako Dune du Pilat yhä?", a: "Kyllä – tuuli ja meren virtaukset työntävät hiekkaa jatkuvasti sisämaahan päin, useita metrejä vuodessa. Dyyni etenee hitaasti kohti sen takana olevaa mäntymetsää." },
      { q: "Miten surffaus tuli Biarritziin?", a: "Amerikkalainen käsikirjoittaja Peter Viertel toi ensimmäisen lautansa mukanaan vuonna 1957 elokuvakuvauksia varten. Hänen pidetään usein koko Euroopan surffikulttuurin isänä, ja Biarritzistä tuli nopeasti mantereen suosituin surffikaupunki." },
    ],
    "Occitanie": [
      { q: "Mikä tekee Canal du Midista niin merkittävän?", a: "Insinööri Pierre-Paul Riquet suunnitteli kanavan 1600-luvulla, ja se yhdisti Atlantin ja Välimeren ilman yhtään pumppua – vesi virtaa painovoiman avulla Montagne Noiren vuoristojärvistä. Kanava hyväksyttiin Unescon maailmanperintöön 1996 aikansa insinööritaidon mestarinäytteenä." },
      { q: "Miksi Airbus rakentaa koneensa juuri Toulousessa?", a: "Kaupungilla on pitkä ilmailuhistoria jo 1900-luvun alusta, muun muassa Aéropostale-postilentoyhtiöstä lähtien. Airbusin kokoonpanolinjat perustettiin sinne 1970-luvulla, ja osaava työvoima on pitänyt teollisuuden paikallaan siitä asti." },
      { q: "Mitä oksitaani oikein on?", a: "Se on oma romaaninen kielensä, jota on puhuttu Etelä-Ranskassa vuosisatojen ajan ja joka on sukua katalaanille. Kieli näkyy yhä paikoin kaksikielisissä kylteissä, vaikka nykyään sitä puhuu äidinkielenään enää harva." },
    ],
    "Bourgogne-Franche-Comté": [
      { q: "Miksi Comté-juustoa kypsytetään juuri kalkkikiviluolissa?", a: "Luolien tasainen viileys ja kosteus sopivat täydellisesti juuston hitaaseen kypsymiseen. Osa kypsytysluolista on entisiä linnoitusten kellareita tai louhoksia, joita on käytetty tähän tarkoitukseen jo pitkään." },
      { q: "Mitä kenraali Bourbakin joukoille kävi Sveitsissä?", a: "Noin 87 000 nälkiintynyttä ja paleltunutta ranskalaissotilasta riisuttiin aseista ja internoitiin Sveitsiin helmikuussa 1871. Tapahtuma on ikuistettu Luzernissa yhä nähtävissä olevaan valtavaan Bourbaki-panoraamamaalaukseen." },
      { q: "Miksi Besançonista tuli Ranskan kellosepäntaidon keskus?", a: "Vallankumouksellinen hallitus antoi vuonna 1793 asetuksen, joka perusti kaupunkiin kellosepäteollisuuden hyödyntäen Sveitsistä paenneiden kellosepien osaamista. Perinne juurtui niin syvälle, että Besançonia kutsutaan yhä Ranskan kellojen kaupungiksi." },
    ],
    "Pays de la Loire": [
      { q: "Mistä idea mekaaniseen jättiläiselefanttiin tuli?", a: "Elefantti on osa Les Machines de l'Île -taideprojektia, joka avattiin 2007 entisen telakka-alueen paikalle. Sen innoittajina olivat sekä Jules Vernen mielikuvitukselliset koneet että telakan omat jättimäiset nosturit." },
      { q: "Mitä Saint-Nazairen telakoilla rakennetaan nykyään?", a: "Chantiers de l'Atlantique -telakka on yksi maailman suurimpia, ja siellä on rakennettu useita maailman suurimmista risteilyaluksista. Samat telakat, jotka aikoinaan rakensivat siirtolaislaivoja, tekevät nykyään valtamerilaivoja globaaleille varustamoille." },
      { q: "Miksi Jules Vernea pidetään tieteiskirjallisuuden edelläkävijänä?", a: "Hän kuvasi kirjoissaan tekniikkaa, joka keksittiin vasta vuosikymmeniä myöhemmin, kuten sukellusveneet teoksessa Merten alla sukeltaen. Moni hänen ideoistaan piti myöhemmin todella paikkansa, mikä teki hänestä genren pioneerin." },
    ],
    "Bretagne": [
      { q: "Mitä Carnacin kivet oikein tarkoittavat?", a: "Kukaan ei tiedä varmasti – kivet pystytettiin noin 4500–3300 eaa., ja teorioita on monia tähtitieteellisestä kalenterista uskonnollisiin riitteihin. Yli 3000 kiven rivistöt ovat silti pysyneet paikoillaan tuhansia vuosia ilman lopullista selitystä." },
      { q: "Miksi Bretagnen rannikolla on niin paljon majakoita?", a: "Rannikko on täynnä kareja, voimakkaita vuorovesivirtoja ja usein sumua, mikä on aiheuttanut lukemattomia haaksirikkoja historian aikana. Siksi Ranskan Atlantin rannikolla, erityisesti Finistèressä, majakoita on tiheämmässä kuin missään muualla maassa." },
      { q: "Mistä bretagnelaisten kelttiläinen identiteetti juontaa juurensa?", a: "Kelttiläiskieliset pakolaiset muuttivat Britanniasta nykyiselle Bretagnen alueelle 400–600-luvuilla paetessaan anglosaksien hyökkäyksiä. He toivat mukanaan kielensä ja kulttuurinsa, jotka elävät yhä ja antoivat koko alueelle sen nimen." },
    ],
    "Normandie": [
      { q: "Mitä D-Day tarkoittaa Normandian historiassa?", a: "Liittoutuneiden joukot nousivat maihin Normandian rannoille 6. kesäkuuta 1944 operaatio Overlordissa, historian suurimmassa merivoimin toteutetussa maihinnousussa. Rannat tunnetaan yhä koodinimillään Utah, Omaha, Gold, Juno ja Sword, ja alueella on lukuisia sotamuseoita ja hautausmaita." },
      { q: "Miten Camembert-juusto sai alkunsa?", a: "Perimätiedon mukaan maanviljelijä Marie Harel kehitti juuston vuonna 1791 Camembertin kylässä. Nimi sai suojatun alkuperämerkinnän vasta 1983, ja aito Camembert de Normandie valmistetaan yhä käsittelemättömästä maidosta." },
      { q: "Mikä yhdistää Rouenin ja Jeanne d'Arcin?", a: "Jeanne d'Arc tuomittiin ja poltettiin roviolla Rouenin torilla vuonna 1431. Paikka on merkitty yhä nykyään, ja kaupungissa toimii hänelle omistettu museo ja moderni kirkko." },
    ],
    "Corse": [
      { q: "Missä Napoleon oikein syntyi?", a: "Napoleon syntyi Ajacciossa, Korsikan pääkaupungissa, vuonna 1769. Hänen lapsuudenkotinsa toimii nykyään museona, Maison Bonapartena." },
      { q: "Miksi Korsikalla puhutaan omaa kieltä?", a: "Korsikan kieli on läheistä sukua Toscanan italialaismurteille, koska saari oli genovalaisten hallinnassa vuosisatojen ajan ennen kuin Genova myi sen Ranskalle 1768. Kieltä puhutaan ja opetetaan yhä, vaikka ranska on virallinen kieli." },
      { q: "Miksi Korsikaa kutsutaan 'kauneuden saareksi'?", a: "Lempinimi l'Île de Beauté juontuu saaren äärimmäisen vaihtelevasta maisemasta, jossa vuoristo laskeutuu suoraan kirkkaaseen mereen. Ranskalainen ja italialainen kulttuuriperintö sekoittuvat saarella toisiinsa ainutlaatuisella tavalla." },
    ],
    "Centre-Val de Loire": [
      { q: "Miksi Chambord rakennettiin niin suureksi, jos kuningas ei asunut siellä pysyvästi?", a: "Kuningas François I rakennutti linnan pääasiassa metsästysmajaksi ja vallan symboliksi, ja siinä on yli 400 huonetta. Hän itse yöpyi siellä vain harvoin koko rakennustyön aikana." },
      { q: "Missä Leonardo da Vinci vietti elämänsä viimeiset vuodet?", a: "Hän asui lähellä sijaitsevassa Clos Lucén kartanossa Amboisessa, jonne François I kutsui hänet vuonna 1516. Da Vinci kuoli siellä 1519, ja perimätieto liittää hänet yhä Chambordin oudon kaksoisportaikon suunnitteluun." },
      { q: "Mikä tekee Sancerresta erityisen viinin?", a: "Sancerre valmistetaan Sauvignon Blanc -rypäleistä Loiren laakson itäosan kalkki- ja piikivimaaperällä. Sen raikas, kivinen maku on tehnyt siitä yhden maailman tunnetuimmista valkoviineistä." },
    ],
    "Île-de-France": [
      { q: "Oliko Eiffel-torni jo pystyssä, kun isoisä kulki Pariisissa 1873?", a: "Ei ollut – torni rakennettiin vasta vuosina 1887–1889 vuoden 1889 maailmannäyttelyä varten, siis 16 vuotta isoisän matkan jälkeen. Pariisin siluetti näytti 1873 aivan erilaiselta ilman sitä." },
      { q: "Miksi Versailles alun perin rakennettiin?", a: "Ludvig XIV laajensi isänsä metsästysmajan valtavaksi palatsiksi voidakseen hallita aatelistoa lähempää ja keskittää valtaa itselleen. Hovi ja hallitus muuttivat sinne vuonna 1682, ja Versailles pysyi vallan keskuksena aina Ranskan vallankumoukseen 1789 asti." },
    ],
  },
  DEU: {
    "Sachsen": [
      { q: "Miksi Leipzigiä sanotaan joskus rauhan kaupungiksi?", a: "Syksyllä 1989 Leipzigin Nikolaikirchen ympärillä alkoi rauhanomaisia maanantaimielenosoituksia, joihin osallistui lopulta kymmeniätuhansia ihmisiä. Ne olivat yksi tärkeimmistä sysäyksistä DDR:n hallinnon murtumiseen ja Saksojen yhdistymiseen 1990." },
      { q: "Mistä Sachsenin kuuluisa posliini tulee?", a: "Meissenin kaupungissa, aivan Dresdenin kupeessa, perustettiin 1710 Euroopan ensimmäinen kova posliinitehdas. Sen siniset miekka-merkit tunnistetaan yhä maailmalla laadun takeeksi, ja resepti pidettiin aikoinaan tarkoin vartioituna valtiosalaisuutena." },
    ],
    "Bayern": [
      { q: "Mistä koko Oktoberfest sai alkunsa?", a: "Juhla alkoi vuonna 1810 kuninkaallisista häistä, kun kruununprinssi Ludvig meni naimisiin prinsessa Theresen kanssa ja münchenläiset kutsuttiin juhlimaan mukaan. Hevoskilpailuista kasvoi vuosikymmenten myötä nykyinen kahden viikon olutfestivaali, joka vetää nykyään yli kuusi miljoonaa kävijää." },
      { q: "Mikä on Baijerin oluen puhtaussääntö?", a: "Reinheitsgebot-laki vuodelta 1516 salli oluen valmistukseen alun perin vain veden, ohran ja humalan. Se on maailman vanhimpia yhä osittain voimassa olevia elintarvikelakeja, ja baijerilaiset ovat siitä yhä ylpeitä." },
    ],
    "Rheinland-Pfalz": [
      { q: "Mikä on Speyerin tuomiokirkon erikoisuus?", a: "Speyerin Kaiserdom on maailman suurin säilynyt romaanisen tyylin kirkko, rakennettu 1000-luvulla. Sen kryptaan on haudattu useita keskiajan Saksan-Rooman keisareita, ja se on nykyään Unescon maailmanperintökohde." },
      { q: "Mikä on Deutsches Eck ja missä se sijaitsee?", a: "Koblenzissa Rein ja Mosel yhtyvät kärjessä, jota kutsutaan Saksan kulmaksi eli Deutsches Eckiksi. Paikalla kohoaa jättimäinen ratsastajapatsas keisari Vilhelm I:stä, joka pystytettiin alun perin 1897 muistuttamaan Saksan yhdistymisestä." },
    ],
    "Saarland": [
      { q: "Kuinka pieni Saarland oikeastaan on?", a: "Saarland on pinta-alaltaan Saksan toiseksi pienin osavaltio, vain Bremen on pienempi. Silti sen hiili- ja terästeollisuus teki siitä 1900-luvulla suhteettoman merkittävän talousalueen." },
      { q: "Mikä on Völklingenin rautatehdas?", a: "Völklinger Hütte oli toiminnassa vuodesta 1873 aina 1980-luvulle asti, ja se on säilynyt lähes kokonaisena masuuneineen. Unesco otti sen maailmanperintölistalle 1994 ainoana kokonaisena rautatehtaana, joka edustaa koko läntisen maailman rautateollisuuden kulta-aikaa." },
    ],
    "Schleswig-Holstein": [
      { q: "Mikä tekee Lübeckistä erityisen?", a: "Lübeck oli keskiajalla Hansaliiton johtava kaupunki ja sitä kutsuttiin Hansan kuningattareksi. Sen tiilistä rakennettu vanhakaupunki on Unescon maailmanperintöä, ja kirjailija Thomas Mann kasvoi siellä perheensä kauppiastalossa." },
      { q: "Mikä on Vattimeri eli Wattenmeer?", a: "Pohjanmeren rannikolla vuoroveden paljastama matala mutakenttä ulottuu satoja kilometrejä Alankomaista Tanskaan, ja Schleswig-Holsteinin osuus siitä on Unescon suojelema luonnonperintökohde. Alueella lepää ja ruokailee miljoonia muuttolintuja joka vuosi." },
    ],
    "Niedersachsen": [
      { q: "Mikä teki Goslarista aikoinaan rikkaan?", a: "Goslarin lähellä sijaitseva Rammelsbergin vuori tuotti hopeaa, kuparia ja muita metalleja yhtäjaksoisesti yli tuhat vuotta, aina 1988 asti. Kaivos ja keskiaikainen Goslarin kaupunki ovat nykyään yhdessä Unescon maailmanperintökohteena." },
      { q: "Millainen puisto Herrenhausen on?", a: "Hannoverin Herrenhausenin puutarhat rakennettiin 1600-luvulla Hannoverin kuurfyrstien kesäasunnoksi, ja niiden barokkityylinen suurpuutarha on yksi Euroopan parhaiten säilyneistä. Puutarhassa järjestetään yhä kesäisin suuria vesisuihkunäytöksiä ja konsertteja." },
    ],
    "Nordrhein-Westfalen": [
      { q: "Mikä on Zeche Zollverein?", a: "Essenissä sijaitseva Zollvereinin kaivos oli aikanaan yksi maailman suurimmista ja teknisesti kehittyneimmistä hiilikaivoksista. Se suljettiin 1986, mutta punatiilinen kaivosalue on nykyään Unescon maailmanperintökohde täynnä museoita ja design-näyttelyitä." },
      { q: "Miksi Aachen on niin historiallisesti tärkeä?", a: "Kaarle Suuri teki Aachenista valtakuntansa pääkaupungin 800-luvulla ja rakennutti sinne palatsikappelin, joka seisoo yhä tuomiokirkon sydämessä. Se oli Saksan ensimmäinen Unescon maailmanperintökohde jo vuonna 1978." },
    ],
    "Baden-Württemberg": [
      { q: "Miksi Ulmin kirkontorni on niin kuuluisa?", a: "Ulmer Münsterin torni on 161,5 metriä korkea ja se on maailman korkein kirkontorni. Rakennustyöt kestivät vuosisatoja, ja torni valmistui vasta 1890, vaikka kirkkoa alettiin rakentaa jo 1377." },
      { q: "Millainen kaupunki Tübingen on?", a: "Tübingen on vanha yliopistokaupunki Neckar-joen rannalla, ja sen värikkäät ristikkotalot kapeine katuineen ovat säilyneet lähes koskemattomina. Yliopisto on perustettu jo 1477, ja opiskelijat muodostavat yhä ison osan kaupungin väestöstä." },
    ],
    "Brandenburg": [
      { q: "Kuka rakennutti Sanssoucin palatsin ja miksi?", a: "Preussin kuningas Fredrik Suuri rakennutti Sanssoucin kesäpalatsikseen 1747 paikkaan, jossa hän saattoi vetäytyä hovielämästä – nimi tarkoittaa ranskaksi 'huoletta'. Rokokootyylinen palatsi puutarhoineen on nykyään Unescon maailmanperintöä." },
      { q: "Mitä Cecilienhofin palatsissa tapahtui?", a: "Potsdamin Cecilienhofissa pidettiin heinä-elokuussa 1945 Potsdamin konferenssi, jossa Stalin, Truman ja Churchill sopivat sodanjälkeisen Euroopan ja Saksan jaosta. Englantilaistyylinen puolisorvirakennus toimii nykyään osittain hotellina ja osittain museona." },
    ],
    "Mecklenburg-Vorpommern": [
      { q: "Kuka teki Rügenin liidukalliot kuuluisiksi taiteessa?", a: "Romantiikan ajan maalari Caspar David Friedrich, joka syntyi läheisessä Greifswaldissa, maalasi 1800-luvun alussa kuuluisan teoksensa liidukallioista. Hänen maalauksensa teki maisemasta tunnetun kaukana Saksan rajojen ulkopuolellakin." },
      { q: "Mitä Peenemündessä tapahtui toisen maailmansodan aikana?", a: "Usedomin saarella sijaitsevassa Peenemündessä natsi-Saksa kehitti ja testasi V2-rakettia, ensimmäistä pitkän kantaman ballistista ohjusta. Paikalla toimii nykyään historiamuseo, joka käsittelee sekä teknistä kehitystä että pakkotyön käyttöä hankkeessa." },
    ],
    "Bremen": [
      { q: "Miksi Bremenin aasin sorkka kiiltää?", a: "Grimmin veljesten sadun mukaan aasi, koira, kissa ja kukko lähtivät yhdessä Bremeniin muusikoiksi karkotettuaan rosvot talostaan. Raatihuoneen edustalla seisovan patsaan aasin etujalkoja on hierottu niin paljon onnea toivoen, että pronssi on kiiltävän kirkas." },
      { q: "Mikä on Bremenin Roland-patsas?", a: "Torilla seisova yli 5,5-metrinen kivipatsas pystytettiin 1404 symboloimaan kaupungin markkina- ja kauppaoikeuksia keisarivallasta riippumatta. Se on yksi Saksan vanhimmista Roland-patsaista ja kuuluu Unescon maailmanperintöön." },
    ],
    "Hamburg": [
      { q: "Milloin Hampurin satama perustettiin?", a: "Perimätiedon mukaan keisari Fredrik Barbarossa myönsi Hampurille tullivapauden 1189, ja tätä päivää juhlitaan yhä toukokuussa satamansyntymäpäivänä. Juhla on nykyään yksi maailman suurimmista satamatapahtumista." },
      { q: "Mikä yhdistää Beatlesin ja Hampurin?", a: "Beatles soitti nuorena ja tuntemattomana yhtyeenä Hampurin Reeperbahnin klubeilla, muun muassa Kaiserkellerissä, vuosina 1960–1962. Bändi itse on sanonut, että se 'kasvoi aikuiseksi' juuri Hampurissa ennen maailmanmainettaan." },
    ],
    "Hessen": [
      { q: "Mikä on Frankfurtin kirjamessu?", a: "Frankfurter Buchmesse on maailman suurin kustannusalan messu, ja sen juuret ulottuvat 1400-luvulle Gutenbergin kotiseudulla. Nykyään messu kokoaa syksyisin kustantajia ja tekijöitä yli sadasta maasta." },
      { q: "Mikä on documenta-näyttely Kasselissa?", a: "Kassel muuttuu joka viides vuosi yhdeksi maailman tärkeimmistä nykytaiteen näyttämöistä, kun documenta-näyttely valtaa museot ja julkiset tilat. Tapahtuma perustettiin 1955 ja se on kasvanut kansainväliseksi taidemaailman kiintopisteeksi." },
    ],
    "Thüringen": [
      { q: "Mistä Weimarin tasavallan nimi tulee?", a: "Ensimmäisen maailmansodan jälkeen Saksan uusi perustuslaki laadittiin ja hyväksyttiin Weimarissa 1919, koska levoton Berliini ei ollut turvallinen kokouspaikka. Koko sotienvälistä Saksan valtiomuotoa alettiin siksi kutsua Weimarin tasavallaksi." },
      { q: "Mikä on Buchenwald?", a: "Weimarin lähellä sijaitseva Buchenwald oli yksi natsi-Saksan suurimmista keskitysleireistä vuosina 1937–1945. Paikalla toimii nykyään muistomerkki ja museo, joka muistuttaa siitä, kuinka lähellä kulttuurikaupunkia julmuudet tapahtuivat." },
    ],
    "Sachsen-Anhalt": [
      { q: "Mikä oli Magdeburgin puolipallokoe?", a: "Vuonna 1657 Magdeburgin pormestari ja tiedemies Otto von Guericke osoitti kuuluisalla kokeellaan ilmanpaineen voiman: kaksi metallista puolipalloa, joiden välistä ilma oli imetty pois, eivät irronneet toisistaan edes hevosten vetäessä eri suuntiin. Koe on yhä yksi fysiikan historian tunnetuimpia havainnollistuksia." },
      { q: "Mikä tekee Naumburgin tuomiokirkosta erityisen?", a: "Naumburger Domin kuoritilassa seisoo 1200-luvulta peräisin oleva kivipatsassarja, josta kuuluisin on lahjoittajapatsas Uta von Naumburg. Patsaan on sanottu olevan yksi keskiajan realistisimmista ihmiskuvista, ja tuomiokirkko liitettiin Unescon maailmanperintöön 2018." },
    ],
    "Berlin": [
      { q: "Kuinka pitkään Berliinin muuri seisoi?", a: "Itä-Saksa pystytti muurin elokuussa 1961 estääkseen asukkaiden pakenemisen länteen, ja se jakoi kaupungin kahtia lähes 28 vuoden ajan. Muuri murtui marraskuussa 1989, ja pieni pätkä siitä on säilytetty maalattuna East Side Galleryna." },
      { q: "Mitä Berliinin museosaarella on?", a: "Spreen keskellä sijaitseva Museumsinsel kokoaa yhteen viisi merkittävää museota, muun muassa Pergamon-museon valtavine antiikin rakennelmineen. Koko saari otettiin Unescon maailmanperintölistalle 1999 ainutlaatuisena museokompleksina." },
    ],
  },
  ITA: {
    "Piemonte": [
      { q: "Miksi Slow Food syntyi juuri täältä?", a: "Slow Food perustettiin vuonna 1986 Bra-kaupungissa Carlo Petrinin johdolla, alun perin vastalauseena McDonald's-ravintolan avaamiselle Rooman Piazza di Spagnan lähelle. Liike puolusti paikallista ruokaperinnettä ja hidasta valmistusta pikaruoan sijaan. Nykyään Slow Food toimii jo yli 160 maassa." },
      { q: "Mistä Nutella oikein sai alkunsa?", a: "Napoleonin mannermaasulku katkaisi 1800-luvun alussa kaakaon tuonnin, joten torinolaiset suklaanvalmistajat alkoivat venyttää suklaata paikallisilla hasselpähkinöillä – näin syntyi gianduiotto. Sama perinne johti lopulta Nutellaan, jonka Ferrero-yhtiö kehitti Alban seudulla 1940-luvun lopulla. Piemonten hasselpähkinät ovat siis suoraan Nutellan juurilla." },
      { q: "Onko Torinon käärinliina yhä tallessa?", a: "Kyllä, se säilytetään Torinon tuomiokirkossa, ja monet uskovat sen olevan Jeesuksen käärinliina. Vuoden 1988 hiiliajoitus viittasi kuitenkin keskiaikaiseen alkuperään. Liinaa näytetään yleisölle vain harvoin, useiden vuosien väliajoin." },
    ],
    "Lombardia": [
      { q: "Onko Leonardon Viimeinen ehtoollinen yhä Milanossa?", a: "On, se on maalattu 1495–1498 Santa Maria delle Grazien luostarin ruokasalin seinään. Maalaus säilyi ihmeen kaupalla toisen maailmansodan pommituksissa, kun ympäröivä rakennus tuhoutui mutta suojattu seinä pysyi pystyssä. Nykyään sitä pääsee katsomaan vain pienissä ryhmissä ajanvarauksella, muutamaksi minuutiksi kerrallaan." },
      { q: "Mikä tekee La Scalasta niin arvostetun?", a: "Milanon oopperatalo La Scala avattiin vuonna 1778 ja siitä tuli nopeasti yksi maailman merkittävimmistä oopperanäyttämöistä. Talossa kantaesitettiin lukuisia Verdin ja Puccinin teoksia. Sotapommitukset tuhosivat rakennuksen 1943, mutta se rakennettiin uudelleen jo vuoteen 1946 mennessä." },
    ],
    "Sicily": [
      { q: "Miksi Sisiliassa on niin paljon kreikkalaisia raunioita?", a: "Kreikkalaiset perustivat Sisiliaan siirtokuntia 700-luvulta eaa. alkaen osana Magna Graeciaa. Agrigenton kreikkalaiskaupunki Akragas perustettiin 582 eaa. ja oli aikanaan yksi antiikin rikkaimmista kaupungeista. Temppelit säilyivät poikkeuksellisen hyvin, koska osa niistä muutettiin myöhemmin kirkoiksi ja jäi siten tuhoutumatta." },
      { q: "Kuinka aktiivinen tulivuori Etna oikeastaan on?", a: "Etna on yksi maailman aktiivisimmista tulivuorista ja purkautuu lähes jatkuvasti pienimuotoisesti. UNESCO lisäsi sen maailmanperintölistalle vuonna 2013. Vuoren korkeus vaihtelee purkausten myötä vuodesta toiseen, ja se on tällä hetkellä noin 3 300 metriä." },
    ],
    "Toscana": [
      { q: "Miksi nykyinen kirjakieli-italia pohjautuu juuri Toscanaan?", a: "Nykyinen standardi-italia perustuu 1300-luvun firenzeläiseen toscanan murteeseen. Ratkaisevaa oli, että Dante, Petrarca ja Boccaccio kirjoittivat pääteoksensa juuri tällä murteella. Sen arvostus teki siitä myöhemmin koko yhdistyneen Italian kirjallisen ja kansallisen kielen perustan." },
      { q: "Mikä on Palio di Siena?", a: "Palio on Sienan keskiaikaisilta ajoilta periytyvä hevoskilpailu, jota ajetaan kahdesti vuodessa, heinä- ja elokuussa, kaupungin simpukankuoren muotoisella pääaukiolla. Kymmenen kaupungin 17 kaupunginosasta eli contradasta kilpailee satulattomilla hevosilla aukion ympäri. Kilpailu herättää yhä valtavia paikallisia intohimoja ja rivaliteetteja." },
    ],
    "Emilia-Romagna": [
      { q: "Mistä Bolognan pitkät pylväskäytävät tulevat?", a: "Bolognassa on yli 40 kilometriä katettuja pylväskäytäviä eli portikoita. Ne syntyivät keskiajalla, kun kaupunki salli talojen yläkerrosten laajentua kadun ylle pylväiden varaan, jotta tilaa saatiin lisää. Käytävistä tuli kaupungin tunnusomainen piirre, ja UNESCO lisäsi ne maailmanperintölistalle vuonna 2021." },
      { q: "Miksi Ravennassa on niin kuuluisia mosaiikkeja?", a: "Ravenna toimi Länsi-Rooman valtakunnan pääkaupunkina vuosina 402–476, sitten ostrogoottien ja lopulta Bysantin vallan keskuksena. Kaupungin 400–500-luvun kirkkojen, kuten San Vitalen, mosaiikit heijastavat tätä bysanttilaista keisarillista yhteyttä. Kirkot ovat nykyään UNESCOn maailmanperintökohteita." },
    ],
    "Sardegna": [
      { q: "Kuinka vanhoja nuraghet oikein ovat?", a: "Nuraghet ovat pronssikautisia kivitorneja, jotka rakennettiin noin 1900–730 eaa. ja joita esiintyy vain Sardiniassa. Niitä on säilynyt yli 7000, mutta tutkijat väittelevät yhä siitä, olivatko ne asuntoja, puolustusrakennelmia vai vallan keskuksia. Barumini kuuluu parhaiten säilyneisiin ja on UNESCOn maailmanperintökohde." },
      { q: "Miksi Sardiniasta tuli rikkaiden lomasaari?", a: "Costa Smeraldan eli Smaragdirannikon kehitti 1960-luvulta alkaen sijoittajaryhmä, jota johti Aga Khan IV. Aiemmin syrjäinen rannikko muutettiin ylellisiksi lomakohteiksi kuten Porto Cervo. Alue houkuttelee yhä kansainvälistä jet set -matkailua." },
    ],
    "Veneto": [
      { q: "Miten Venetsia pysyy pystyssä veden päällä?", a: "Kaupunki on rakennettu yli sadalle pienelle saarelle laguunissa, ja sen perustukset lepäävät miljoonien puupaalujen varassa, jotka on lyöty savipohjaan ja päällystetty kivellä. Hapeton muta on vuosisatojen aikana kivettänyt puun ja säilyttänyt sen. Kaupunki kuitenkin painuu yhä ja kärsii tulvista, joita vuodesta 2020 on hillitty MOSE-sulkujärjestelmällä." },
      { q: "Mistä prosecco tulee?", a: "Prosecco valmistetaan pääasiassa glera-rypäleestä Conegliano-Valdobbiadenen kukkuloilla Venetsian pohjoispuolella. Rinteiden viinitarhamaisema lisättiin UNESCOn maailmanperintölistalle vuonna 2019. Alue on Italian tunnetuin kuohuviinialue." },
    ],
    "Apulia": [
      { q: "Miksi trullien katot voidaan purkaa nopeasti?", a: "Trullit rakennettiin kuivamuuraustekniikalla ilman laastia. Perimätiedon mukaan paikalliset talonpojat pystyivät purkamaan katot nopeasti verontarkastajien lähestyessä, koska veroa maksettiin vain pysyvistä rakennuksista. Alberobellon trullit ovat olleet UNESCOn maailmanperintökohde vuodesta 1996." },
      { q: "Kuinka paljon Apulia tuottaa oliiviöljyä?", a: "Apulia on Italian suurin oliiviöljyn tuottajamaakunta ja vastaa noin 40 prosentista maan kokonaistuotannosta. Alueella kasvaa enemmän oliivipuita kuin lähes missään muualla maassa, joukossa yli tuhatvuotiaita puita. Oliivilehdot ja kalastajakylät vuorottelevat rannikolla kilometrikaupalla." },
    ],
    "Lazio": [
      { q: "Milloin paavi lopulta tunnusti Italian valtion?", a: "Niin sanottu Rooman kysymys ratkesi vasta vuonna 1929 Lateraanisopimuksella Mussolinin hallituksen ja paavi Pius XI:n välillä. Sopimus loi itsenäisen Vatikaanivaltion ja päätti paavin vuosikymmeniä kestäneen kieltäytymisen tunnustaa Rooman menetys Italialle. Ennen tätä paavi oli pitänyt itseään ikään kuin Vatikaanin vankina." },
      { q: "Mistä Trevin suihkulähteen kolikkoperinne tulee?", a: "Perinteen mukaan kolikon heittäminen olan yli Trevin suihkulähteeseen takaa paluun Roomaan. Lähteestä kerätään vuosittain noin 1,5 miljoonaa euroa, jotka lahjoitetaan Caritas-järjestölle Rooman vähäosaisten auttamiseen. Perinne on peräisin jo antiikin ajoista, jolloin veden lähteille uhrattiin." },
    ],
    "Trentino-Alto Adige": [
      { q: "Miksi alueella on niin laaja itsehallinto?", a: "Ensimmäisen maailmansodan jälkeen alueen saksankieliset asukkaat joutuivat fasismin aikana pakkoitalialaistamisen kohteeksi, mikä kärjistyi 1960-luvulla separatistien pommi-iskuiksi. Konflikti ratkesi vuoden 1972 autonomiastatuutilla, joka takasi laajan itsehallinnon, kielioikeudet ja verotulot alueelle. Järjestely toimii nykyään mallina vähemmistöjen suojelulle Euroopassa." },
      { q: "Missä Ötzi on nykyään esillä?", a: "Ötzi on esillä Bolzanon arkeologisessa museossa erityisessä jäähdytetyssä huoneessa, joka jäljittelee jäätikön olosuhteita. Jäämuumio on noin 5300 vuotta vanha ja kuoli nuolen aiheuttamaan haavaan. Se on yksi maailman vanhimmista ja parhaiten säilyneistä ihmismuumioista." },
    ],
    "Calabria": [
      { q: "Mistä ne kuuluisat pronssipatsaat Reggio Calabriassa oikein löytyivät?", a: "Sukeltaja Stefano Mariottini bongasi elokuussa 1972 käsivarren hiekasta Riacen rannan edustalta ja luuli ensin löytäneensä ruumiin. Kädet kuuluivatkin kahdelle noin 2500 vuotta vanhalle kreikkalaiselle pronssiveistokselle, jotka nostettiin merestä ja seisovat nyt omassa ilmastoidussa salissaan Reggio Calabrian arkeologisessa museossa." },
      { q: "Miksi juuri Tropean sipulit ovat niin ylistettyjä?", a: "Tropean rannikon hiekkainen, magnesium- ja kaliumpitoinen maaperä sekä meren tuulet tekevät punasipuleista poikkeuksellisen makeita, eivätkä ne juuri pistele silmiä. Vain tietyllä rannikkokaistaleella Capo Vaticanon ja Palmin välillä kasvatettu sipuli sai suojatun IGP-aseman vuonna 2007." },
      { q: "Onko Pollinon vuorilla mitään todella vanhaa?", a: "Kyllä – Pollinon kansallispuiston jyrkällä rinteellä kasvaa Italus-niminen kreikanmänty, joka on lustonäytteiden ja radiohiiliajoituksen mukaan yli 1200 vuotta vanha. Se on tiettävästi Euroopan vanhin tunnettu puu, ja se on viime vuosikymmeninä jopa kasvanut entistä reippaammin." },
    ],
    "Campania": [
      { q: "Onko Vesuvius yhä oikeasti vaarallinen?", a: "Kyllä, Vesuvius on aktiivinen tulivuori, joka purkautui viimeksi vuonna 1944, ja se luokitellaan yhdeksi maailman vaarallisimmista juuri siksi, että miljoonat ihmiset asuvat sen rinteillä ja ympäristössä. Viranomaisilla on valmiina laaja evakuointisuunnitelma niin sanotulle punaiselle vyöhykkeelle." },
      { q: "Mikä on se veri-ihme, josta Napolissa puhutaan?", a: "Napolin tuomiokirkossa säilytetään ampullia, jossa on kaupungin suojeluspyhimyksen Gennaron kuivunutta verta, ja uskovien mukaan se muuttuu nestemäiseksi kolmesti vuodessa: syyskuussa, joulukuussa ja toukokuussa. Väkijoukot kokoontuvat yhä seuraamaan hetkeä, ja perimätiedon mukaan veren pysyminen kiinteänä ennustaisi onnettomuutta." },
      { q: "Mistä Napolin pikkukujan seimifiguurit ovat kuuluisia?", a: "Via San Gregorio Armenon käsityöläiskatu on valmistanut seimihahmoja käsin vuosisatoja, ja perinne elää yhä vahvana joka joulun alla. Nykyään verstaissa muovataan perinteisten pyhien hahmojen rinnalle myös ajankohtaisia julkkiksia ja poliitikkoja." },
    ],
    "Abruzzo": [
      { q: "Mitä dramaattista Campo Imperatoren ylängöllä tapahtui vuonna 1943?", a: "Syyskuussa 1943 saksalaiset laskuvarjojääkärit ja upseeri Otto Skorzeny lensivät liitokoneilla vuorelle ja vapauttivat sinne vangitun Benito Mussolinin hotellista dramaattisessa iskussa. Mussolini lennätettiin pienellä Storch-koneella pois vuorelta ja edelleen Wienin kautta Saksaan." },
      { q: "Mistä L'Aquilan seudun kallis mauste tulee?", a: "Navelli-tasangon pelloilla kasvatetaan sahramia, jota myydään nimellä zafferano dell'Aquila, ja sitä pidetään yhtenä maailman parhaista laaduista. Jokainen kukka poimitaan ja lajitellaan yhä käsin, mikä selittää mausteen korkean hinnan." },
      { q: "Mistä nimi 'spaghetti alla chitarra' tulee?", a: "Abruzzolainen pastatyyppi leikataan puisella kitara-nimisellä telineellä, jonka yli on pingotettu metallilankoja kuin kitaran kielet: taikinalevy painetaan lankojen läpi, ja syntyy neliskulmaista, paksuhkoa spagettia. Väline ja resepti ovat säilyneet lähes muuttumattomina 1800-luvulta lähtien." },
    ],
    "Basilicata": [
      { q: "Miksi elokuvantekijät rakastavat Materan kaupunkia?", a: "Materan tuhansia vuosia vanhat luolakorttelit muistuttavat monen mielestä muinaista Jerusalemia, ja siksi niissä on kuvattu muun muassa Pasolinin Evankeliumi Matteuksen mukaan (1964), Mel Gibsonin Passio (2004) ja James Bond -elokuva Ei aikaa kuolla (2021). Kaupunki on nykyään yksi maailman käytetyimmistä kuvauspaikoista juuri ajattoman ulkonäkönsä ansiosta." },
      { q: "Mikä on Craco, ja miksi se on tyhjä?", a: "Craco on keskiaikainen kukkulakylä, joka evakuoitiin yhdessä yössä vuonna 1963 maanvyörymän jälkeen, ja myöhemmät tulva ja maanjäristys tekivät paluun mahdottomaksi. Nykyään täysin autio kylä on suosittu kuvauspaikka, muun muassa Bond-elokuvassa Quantum of Solace." },
      { q: "Milloin Materan Sassit tunnustettiin maailmanperinnöksi?", a: "Vielä 1950-luvulla Sassien asukkaat siirrettiin pois epäterveellisinä pidetyistä luolataloista, mutta vuonna 1993 Unesco listasi korttelit maailmanperintökohteeksi. Siitä lähtien vanhat asunnot on kunnostettu vähitellen hotelleiksi, ravintoloiksi ja gallerioiksi." },
    ],
    "Marche": [
      { q: "Mikä maanalainen ihme löytyi Marchen sisältä 1970-luvulla?", a: "Speleologit löysivät vuonna 1971 Frasassin luolaston, jonka päähuone Grotta Grande del Vento on niin valtava, että sen sisään mahtuisi kokonainen Milanon tuomiokirkko. Luolasto on nykyään yksi Euroopan suurimmista matkailuluolista, ja sinne on rakennettu opastettuja kävelyreittejä." },
      { q: "Mikä on Loreton pyhiinvaelluskohde?", a: "Loreton basilika on rakennettu kolmen kiviseinän ympärille, joiden uskotaan perimätiedon mukaan olevan enkelien vuonna 1294 Nasaretista Loretoon kantama Neitsyt Marian koti. Pyhäkkö on ollut suosittu pyhiinvaelluskohde jo keskiajalta lähtien, ja basilikaa rakennettiin sen ympärille vuosina 1469–1587." },
      { q: "Onko Marchen naapurissa oma pieni valtio?", a: "Kyllä – San Marinon mikrovaltio on kokonaan Italian ympäröimä ja rajautuu osin Marcheen, ja sen väitetään olevan maailman vanhin yhä olemassa oleva tasavalta, perustuslegendan mukaan jo vuodelta 301. Alle 25 neliökilometrin valtiolla on oma hallitus, lippu ja jopa jalkapallomaajoukkue." },
    ],
    "Umbria": [
      { q: "Mikä kaivo kätkeytyy Orvieton kallion sisään?", a: "Paavi Klemens VII:n käskystä 1500-luvulla rakennettu Pozzo di San Patrizio -kaivo on hyvin syvä, ja sen seinillä kiertää kaksi erillistä kierreporrasta, jotta muulit pääsivät kantamaan vettä ylös ja alas törmäämättä vastaantulijoihin. Kaivo on osa laajaa tuffikiveen louhittua tunneliverkostoa Orvieton alla." },
      { q: "Mikä musiikkitapahtuma täyttää Perugian joka kesä?", a: "Umbria Jazz -festivaali on järjestetty vuodesta 1973 lähtien, ja se on noussut yhdeksi maailman arvostetuimmista jazzfestivaaleista. Kaupungin keskiaikaiset kadut ja aukiot täyttyvät kymmeneksi päiväksi konserteista, joilla on esiintynyt muun muassa Miles Davis ja Sting." },
      { q: "Mitä Norcialle tapahtui vuonna 2016?", a: "Lokakuussa 2016 voimakas maanjäristys tuhosi lähes koko Norcian Pyhän Benedictuksen basilikan, ja vain 1300-luvulta peräisin oleva julkisivu jäi pystyyn raunioiden keskelle. Basilikan jälleenrakennus alkoi vasta vuosia myöhemmin ja on kestänyt lähes vuosikymmenen." },
    ],
    "Friuli-Venezia Giulia": [
      { q: "Mikä on Miramaren linna, ja kuka sen rakennutti?", a: "Itävallan arkkiherttua Maximilian rakennutti Miramaren linnan vuosina 1856–1860 kalliokielekkeelle Triestin lahden rannalle itselleen ja puolisolleen Charlottelle. Maximilianista tuli myöhemmin lyhytaikainen Meksikon keisari, ja linna toimii nykyään museona." },
      { q: "Mistä San Danielen kaupunki on kuuluisa?", a: "San Daniele del Friulissa kypsytetään suojattua San Danielen kinkkua, jonka erityismaku syntyy Alppien ja Adrianmeren väliin puristuvista ilmavirtauksista. Kinkkuja on valmistettu samalla menetelmällä sukupolvien ajan, ja tuote on saanut EU:n alkuperäsuojan." },
      { q: "Mikä antiikin kaupunki Aquileiassa on Unescon suojeluksessa?", a: "Aquileia oli aikoinaan yksi Rooman valtakunnan suurimmista kaupungeista, ja sen basilikan lattiamosaiikit ovat säilyneet poikkeuksellisen hyvin. Koko arkeologinen alue on Unescon maailmanperintökohde." },
    ],
    "Liguria": [
      { q: "Kuka kuuluisa merenkulkija syntyi Genovassa?", a: "Christopher Columbus syntyi Genovassa vuonna 1451 villakauppiaan poikana, ja kaupungissa seisoo yhä 1700-luvulla jälleenrakennettu talo, jonka väitetään olevan hänen lapsuudenkotinsa paikalla. Genova osti talon 1887 ja teki siitä nähtävyyden." },
      { q: "Mikä musiikkitapahtuma järjestetään Sanremossa joka vuosi?", a: "Sanremon musiikkifestivaali on järjestetty vuodesta 1951 lähtien ja on maailman pisimpään jatkunut vuosittainen kansallinen musiikkikilpailu televisiossa. Se toimi mallina koko Euroopan laulukilpailulle, joka perustettiin sen innoittamana 1956." },
      { q: "Mistä pieni Reccon kaupunki on kuuluisa?", a: "Reccossa valmistetaan focaccia di reccoa, kahdesta paperinohuesta taikinalevystä ja sulavasta stracchino-juustosta koostuvaa täytettyä leipää. Resepti on peräisin jo ristiretkien ajalta, ja se sai EU:n suojatun maantieteellisen merkinnän 2012." },
    ],
    "Molise": [
      { q: "Milloin Molisesta tuli oma itsenäinen maakunta?", a: "Molise oli vuoteen 1963 asti osa yhdistettyä Abruzzi e Molise -maakuntaa, kunnes Campobasson maakunta erotettiin omaksi alueekseen. Siitä tuli Italian nuorin maakunta, mikä selittää osaltaan sisäpiirivitsiä siitä, ettei Molisea muka ole olemassa." },
      { q: "Mikä roomalainen kaupunki löytyy Molisesta lähes koskemattomana?", a: "Sepinon kylän liepeillä sijaitseva antiikin Saepinum on yksi Italian parhaiten säilyneistä roomalaiskaupungeista: muurit, portit, tori ja noin 3000 katsojan teatteri ovat yhä pystyssä. Toisin kuin Pompeijissa, paikalla käy tuskin turisteja." },
      { q: "Mikä on Tintilia?", a: "Tintilia on Moliselle omaleimainen tumma viinirypäle, joka lähes katosi sodan jälkeen huonon satoisuutensa vuoksi. Muutama viinitilallinen elvytti lajikkeen 1990-luvulla, ja siitä tuli oma suojattu Tintilia del Molise -viinialue vuonna 2011." },
    ],
    "Valle d'Aosta": [
      { q: "Mikä on Gran Paradiso, ja miksi se perustettiin?", a: "Kuningas Vittorio Emanuele II teki vuorista kuninkaallisen metsästysreviirin jo 1856 suojellakseen alppikauriita sukupuutolta, ja hänen pojanpoikansa Vittorio Emanuele III lahjoitti alueen valtiolle vuonna 1922. Siitä syntyi Gran Paradiso, Italian ensimmäinen kansallispuisto." },
      { q: "Miksi laaksossa on niin paljon linnoja?", a: "Valle d'Aostassa on Italian tiheimpiä keskiaikaisten linnojen keskittymiä, sillä laakso oli tärkeä kauppareitti alppisolien yli kohti Ranskaa ja Sveitsiä. Fénisin linna kaksine muurirenkaineen on yksi parhaiten säilyneistä ja suosituimmista." },
      { q: "Onko laaksolla erityisasema Italiassa?", a: "Valle d'Aostalla on ollut laaja itsehallinto vuodesta 1948, oma parlamentti ja poikkeuksellisen suuri osuus alueen omista verotuloista jää maakunnalle itselleen. Kaksikielisyys ranskan ja italian välillä on kirjattu suoraan sen erityisstatuuttiin." },
    ],
  },
  ESP: {
    "Castilla y León": [
      { q: "Onko tämä Espanjan suurin maakunta?", a: "Kyllä, Kastilja ja León on pinta-alaltaan Espanjan suurin autonominen alue, noin 94 000 neliökilometriä – isompi kuin moni Euroopan valtio. Väkeä on silti vähän, sillä suuri osa alueesta on harvaan asuttua ylätasankoa." },
      { q: "Miksi Burgosin nimi tulee usein esiin?", a: "Burgosin goottilainen katedraali on UNESCOn maailmanperintökohde, ja sinne on haudattu keskiaikainen sotasankari El Cid. Lähellä sijaitsee myös Atapuercan luolasto, josta on löytynyt Euroopan vanhimpia tunnettuja ihmisen jäänteitä, jopa yli 800 000 vuoden takaa." },
      { q: "Kulkeeko pyhiinvaellusreitti tämän alueen kautta?", a: "Kyllä, Camino de Santiagon suosituin reitti, Camino Francés, halkoo koko maakuntaa lännestä itään Burgosin ja Leónin kaupunkien kautta. Leónin katedraalin värikkäät, laajat lasimaalaukset ovat yksi reitin nähtävyyksistä." },
    ],
    "Andalucía": [
      { q: "Mistä flamenco on kotoisin?", a: "Flamenco syntyi juuri Andalusiassa, erityisesti Sevillan, Cádizin ja Jerezin seudulla, romanikulttuurin ja alueen maurilais-, juutalais- ja kristillisten perinteiden sekoituksesta 1700–1800-luvuilla. UNESCO listasi sen ihmiskunnan aineettomaksi kulttuuriperinnöksi vuonna 2010." },
      { q: "Onko Andalusiassa Espanjan korkein vuori?", a: "Kyllä, Sierra Nevadan Mulhacén kohoaa 3479 metriin ja on koko Manner-Espanjan korkein huippu. Vuoristossa on hiihtokeskus, vaikka juuri sen eteläpuolella rannikko on jo täyttä Aurinkorannikon lämpöä." },
      { q: "Mitä erikoista Doñanan kansallispuistossa on?", a: "Doñana on Euroopan tärkeimpiä kosteikkoja ja elinympäristö erittäin uhanalaiselle iberianilvekselle, maailman harvinaisimmalle kissaeläimelle. Alueen suot ja hiekkadyynit ovat myös keskeinen levähdyspaikka miljoonille muuttolinnuille Afrikan ja Euroopan välillä." },
    ],
    "Castilla-La Mancha": [
      { q: "Liittyykö tämä alue johonkin kuuluisaan kirjaan?", a: "Kyllä, Miguel de Cervantesin Don Quijote seikkailee juuri La Manchan tasangoilla, ja monet kirjan tapahtumapaikat, kuten tuulimyllykylät, ovat todellisia. Siksi hahmo ja alue kulkevat espanjalaisessa mielikuvituksessa aina käsi kädessä." },
      { q: "Onko Cuencassa jotain erikoista arkkitehtuuria?", a: "Cuencan roikkuvat talot, Casas Colgadas, on rakennettu suoraan kalliojyrkänteen reunalle niin, että parvekkeet leijuvat rotkon yllä. Vanhakaupunki on UNESCOn maailmanperintökohde juuri tämän ainutlaatuisen sijainnin ansiosta." },
      { q: "Onko tämä oikeasti maailman suurin viinialue?", a: "Pinta-alaltaan kyllä – La Manchan viinialue on maailman laajin yhtenäinen viinitarha-alue, vaikka tuotanto keskittyy enemmän määrään kuin huippulaatuun. Kuivat, aurinkoiset tasangot sopivat erityisesti Airén-rypäleelle." },
    ],
    "Aragón": [
      { q: "Oliko Aragonilla joskus oma valtakuntansa?", a: "Kyllä, keskiajalla Aragonian kuningaskunta ja sen liittouma Katalonian kanssa, Aragonian kruunu, hallitsi laajaa Välimeren aluetta – muun muassa Sisiliaa, Napolia ja Sardiniaa. Se yhdistyi Kastiliaan vasta 1400-luvun lopulla kuningatar Isabellan ja kuningas Ferdinandin avioliiton myötä." },
      { q: "Onko Pyreneiden korkein huippu täällä?", a: "Kyllä, Aneto nousee 3404 metriin ja on koko Pyreneiden vuoriston korkein kohta. Sen laella on myös vuoriston suurin jäätikkö, vaikka se sulaa nopeasti ilmaston lämmetessä." },
      { q: "Miksi Teruelista puhutaan usein erikseen?", a: "Teruelin maakunta on niin harvaan asuttu, että espanjalaiset käyttävät siitä usein sanontaa 'Teruel existe' eli 'Teruel on olemassa', muistutuksena syrjäseutujen unohtamisesta. Kaupungissa elää myös keskiaikainen rakkaustarina, Los Amantes de Teruel, jonka mystiset muumiot ovat yhä nähtävillä." },
    ],
    "Extremadura": [
      { q: "Onko Cáceresin vanhakaupungilla erityisasemaa?", a: "Kyllä, Cáceresin keskiaikainen vanhakaupunki on UNESCOn maailmanperintökohde, sillä sen kivitalot, tornit ja palatsit ovat säilyneet lähes koskemattomina 1400–1500-luvuilta. Kaupunki on niin ajaton kulisseiltaan, että siellä on kuvattu useita historiallisia elokuvia ja tv-sarjoja." },
      { q: "Onko täällä hyvä paikka bongata lintuja?", a: "Monfragüen kansallispuisto on yksi Euroopan parhaista paikoista nähdä isoja petolintuja: siellä pesii muun muassa Euroopan suurin mustan korppikotkan kanta. Kalliojyrkänteet Tajo-joen yllä tarjoavat linnuille turvallisia pesäpaikkoja." },
      { q: "Miksi juuri Trujillo mainitaan usein Amerikan valloittajien yhteydessä?", a: "Pieni Trujillon kaupunki synnytti poikkeuksellisen monta 1500-luvun konkistadoria, Francisco Pizarron lisäksi useita muitakin Etelä-Amerikkaan lähteneitä seikkailijoita. Kaupungin pääaukiolla seisoo yhä Pizarron ratsastajapatsas muistona tästä historiasta." },
    ],
    "Cataluña": [
      { q: "Onko Katalonialla yhteyttä kuuluisiin taiteilijoihin?", a: "Kyllä, surrealisti Salvador Dalí syntyi Figueresin kaupungissa, jossa hänen suunnittelemansa Dalí-teatterimuseo on yksi Espanjan suosituimmista taidemuseoista. Myös Pablo Picasso vietti nuoruusvuosiaan Barcelonassa, ja kaupungissa on hänelle omistettu museo." },
      { q: "Mikä on Montserrat?", a: "Montserrat on omalaatuinen, pylväsmäisistä kallioista koostuva vuori Barcelonan lähellä, jonka rinteellä sijaitsee vuosisatoja vanha benediktiiniluostari. Luostarin mustaksi Madonnaksi kutsuttu patsas on yksi Katalonian tärkeimmistä pyhiinvaelluskohteista." },
      { q: "Miksi Barcelona tunnetaan teollisuuskaupunkina?", a: "1800-luvulla Barcelonasta tuli Espanjan johtava tekstiiliteollisuuden keskus, ja kaupunki kasvoi nopeasti tehtaiden ja maahanmuuton myötä. Vuoden 1992 olympialaiset uudistivat kaupungin rantaviivan ja infrastruktuurin ja tekivät siitä nykyisen matkailukohteen." },
    ],
    "Galicia": [
      { q: "Onko A Coruñassa jotain todella vanhaa nähtävää?", a: "A Coruñan Torre de Hércules on roomalaisten rakentama majakka, joka on yhä käytössä – vanhin toimiva majakka maailmassa. UNESCO lisäsi sen maailmanperintöluetteloon sen ainutlaatuisen, lähes 1900-vuotisen historian vuoksi." },
      { q: "Miksi Galiciassa soitetaan säkkipilliä?", a: "Galician oma säkkipilli, gaita, kertoo alueen kelttiläisistä juurista, joita galicialaiset korostavat mielellään verrattuna muuhun Espanjaan. Gaita soi yhä perinnejuhlissa ja on tärkeä osa alueen musiikillista identiteettiä." },
      { q: "Miksi Galiciaa kutsutaan 'vihreäksi Espanjaksi'?", a: "Atlantin vaikutuksesta Galiciassa sataa huomattavasti enemmän kuin muualla Espanjassa, mikä pitää maiseman ympäri vuoden vehreänä. Sama sademäärä selittää myös alueen rehevät metsät ja runsaan karjatalouden." },
    ],
    "Valenciana": [
      { q: "Onko Valenciassa jotain erikoista oikeuslaitosta?", a: "Kyllä, Tribunal de las Aguas eli vesituomioistuin kokoontuu joka torstai Valencian katedraalin edessä ratkomaan maanviljelijöiden kastelukiistoja, ja perinne juontaa juurensa maurien aikaan. UNESCO on listannut sen aineettomaksi kulttuuriperinnöksi, sillä se on yksi Euroopan vanhimmista yhä toimivista oikeusinstituutioista." },
      { q: "Onko rannikolla pilvenpiirtäjiä?", a: "Benidormin kaupunki Costa Blancalla on tunnettu poikkeuksellisen korkeista hotellitorneistaan, joita on rakennettu tiiviisti kapealle rantakaistaleelle jo 1960-luvulta lähtien. Siluettia verrataan usein pienoiskokoiseen Manhattaniin." },
      { q: "Mikä juoma liitetään erityisesti Valenciaan?", a: "Horchata eli orxata on Valencian oma perinnejuoma, joka valmistetaan maakuolan mukuloista eli chufasta. Sitä juodaan kylmänä usein fartons-nimisten pitkien makeiden leivonnaisten kanssa." },
    ],
    "Asturias": [
      { q: "Onko totta, ettei tätä aluetta koskaan valloitettu?", a: "Kyllä, Asturia oli ainoa osa Iberian niemimaata, jota maurit eivät koskaan pysyvästi valloittaneet 700-luvulla. Siitä syntyi vanha sanonta 'Asturia on Espanja, loput on takaisinvallattua maata', joka viittaa Reconquistan alkuun juuri täältä." },
      { q: "Onko Oviedossa jotain arkkitehtonisesti ainutlaatuista?", a: "Oviedon ympäristössä säilyneet 800–900-luvun esiromaaniset kirkot edustavat omaa, muualla Euroopassa harvinaista tyylisuuntaa. UNESCO on listannut ne maailmanperintökohteiksi niiden ainutlaatuisuuden vuoksi." },
      { q: "Onko täällä kuuluisaa juustoa?", a: "Cabrales on voimakas, luolissa kypsytetty sinihomejuusto, jota valmistetaan Picos de Europan vuoristokylissä lehmän-, lampaan- ja vuohenmaidosta. Sillä on suojattu alkuperänimitys, ja se tunnetaan yhtenä maailman pistävimmistä juustoista." },
    ],
    "Murcia": [
      { q: "Mistä Cartagenan nimi juontaa juurensa?", a: "Cartagena perustettiin karthagolaisten toimesta noin 220 eaa. nimellä Qart Hadasht eli 'Uusi Karthago', josta nykyinen nimi periytyy suoraan. Sen luonnonsatama on tehnyt kaupungista tärkeän laivastotukikohdan roomalaisista nykypäivään asti." },
      { q: "Mikä erottaa Mar Menorin avomerestä?", a: "La Manga on kapea, noin 22 kilometrin pituinen hiekkakaistale, joka erottaa Mar Menor -laguunin Välimerestä lähes kokonaan. Kaistaleelle on rakennettu tiiviisti lomahotelleja ja kesäasuntoja aivan veden äärelle." },
      { q: "Miksi Murciaa pystytään viljelemään näin tehokkaasti?", a: "Alueen huerta-kastelujärjestelmät juontavat juurensa maurien aikaan, jolloin rakennettiin kanavaverkosto Segura-joen veden ohjaamiseksi kuiville pelloille. Sama periaate on käytössä yhä nykyään, vaikka vesi onkin ajoittain niukkaa." },
    ],
    "Foral de Navarra": [
      { q: "Miksi Navarran nimessä on sana 'foral'?", a: "Navarra sai keskiaikaisena kuningaskuntana omat erioikeutensa eli fuerot, ja ne säilyivät osittain vielä silloinkin kun alue liitettiin Espanjaan. Karlistisotien jälkeenkin Navarra piti erityisaseman, ja tänäänkin sillä on oma sopimus verotuksesta Madridin kanssa. Siksi virallinen nimi on yhä 'Navarran foraalinen yhteisö', ei tavallinen autonominen alue." },
      { q: "Kulkeeko pyhiinvaellusreitti Navarran kautta?", a: "Kyllä – suosituin Santiago de Compostelan reitti, Camino Francés, ylittää Pyreneet Roncesvallesin solan kautta juuri Navarraan. Samassa solassa käytiin vuonna 778 legendaarinen taistelu, josta syntyi ranskalainen Rolandin laulu. Nykyään reitti tuo Navarraan kymmeniätuhansia vaeltajia joka vuosi." },
    ],
    "Madrid": [
      { q: "Miksi juuri Madridista tuli Espanjan pääkaupunki?", a: "Kuningas Filip II siirsi hovinsa Madridiin vuonna 1561, koska kaupunki sijaitsi lähes tarkalleen Espanjan maantieteellisessä keskipisteessä eikä kuulunut minkään vanhan kuningaskunnan alueeseen. Ennen sitä Madrid oli vain pieni linnakaupunki ilman erityisasemaa. Ratkaisu teki siitä pysyvän vallan keskuksen, vaikka rannikkokaupungit olivat tuolloin rikkaampia." },
      { q: "Kuinka vanha Madrid oikeastaan on?", a: "Madrid syntyi 800-luvulla maurien linnakkeena nimeltä Mayrit, jonka perusti Córdoban emiiri Muhammad I suojaamaan aluetta kristittyjen hyökkäyksiltä pohjoisesta. Nimi juontuu arabian sanasta, joka viittaa vedenalaisiin kanaviin – samoja, jotka toivat kaupungille juomavettä. Kristityt valtasivat linnakkeen 1000-luvulla, kauan ennen kuin siitä tuli pääkaupunki." },
    ],
    "País Vasco": [
      { q: "Mikä on Guernica ja miksi se on niin kuuluisa?", a: "Guernica on pieni baskikaupunki, jonka Saksan ja Italian ilmavoimat pommittivat raunioiksi vuonna 1937 Espanjan sisällissodan aikana, tappaen satoja siviilejä. Tapahtuma järkytti maailmaa, ja Pablo Picasso maalasi sen kunniaksi saman nimisen maailmankuulun teoksen. Se on yhä yksi 1900-luvun tunnetuimmista sodanvastaisista taideteoksista." },
      { q: "Onko Baskimaalla erityisasema Espanjassa?", a: "Kyllä – Baskimaan kolmella provinssilla on oma sopimus verojen keräämisestä, niin sanottu 'concierto económico', joka periytyy vanhoista fueroista. Alue kerää itse verot ja maksaa niistä sovitun osan Madridille, toisin kuin useimmat muut Espanjan alueet. Tämä juontuu samasta perinteestä kuin Navarran erityisasema." },
    ],
    "Canary Is.": [
      { q: "Keitä olivat saarten alkuperäisasukkaat ennen espanjalaisia?", a: "Kanariansaarilla asui ennen 1400-luvun espanjalaisvalloitusta guanchit, berberitaustainen kansa, joka oli elänyt saarilla eristyksissä vuosisatoja. He balsamoivat vainajiaan muumioiksi samaan tapaan kuin muinaiset egyptiläiset, vaikka kulttuurit eivät olleet yhteydessä toisiinsa. Nykyään heidän perintöään näkee saarten museoissa ja osassa paikallisia sukunimiä." },
      { q: "Pysähtyikö Kolumbus Kanariansaarilla?", a: "Kyllä – Kristoffer Kolumbus teki viimeisen pysähdyksensä La Gomeran saarella ennen kuin lähti ylittämään Atlanttia vuonna 1492. Saaret olivat espanjalaisille luonnollinen viimeinen tukikohta, koska niiltä oli lyhin matka länteen tuulien avulla. Monet myöhemmät löytöretket toistivat saman reitin." },
    ],
    "Cantabria": [
      { q: "Taistelivatko kantabrialaiset roomalaisia vastaan?", a: "Kyllä, ja hyvin sitkeästi – niin sanotut kantabrialaissodat vuosina 29–19 eaa. olivat Rooman viimeinen suuri valloitussota Iberian niemimaalla. Vuoristoiset kantabrialaisheimot vastustivat legioonia vuosia, ja osa taistelijoista surmasi mieluummin itsensä kuin antautui. Rooma tarvitsi lopulta itse keisari Augustuksen johtamaan sotaretkeä alueen kukistamiseksi." },
      { q: "Onko Kantabria ollut aina oma alueensa?", a: "Ei – Kantabria kuului pitkään Santanderin maakuntaan osana Vanhaa Kastiliaa, eikä siitä tullut omaa itsehallintoaluetta ennen vuotta 1982. Se on siis yksi Espanjan nuorimmista nykyisistä autonomisista yhteisöistä. Nimi Kantabria otettiin käyttöön vasta tuolloin, muinaisen kantabrialaisheimon mukaan." },
    ],
    "La Rioja": [
      { q: "Mistä La Riojan nimi tulee?", a: "Nimi juontuu pienestä Río Oja -joesta, joka laskee alueen halki Ebro-jokeen. Vaikka Río Oja on vaatimaton puro verrattuna Ebroon, se antoi nimensä koko maakunnalle ja myöhemmin maailmankuululle viinialueelle. Ebro-joki itse on Riojan viininviljelyn todellinen selkäranka." },
      { q: "Mikä on San Millán de la Cogolla?", a: "San Millán de la Cogollan kaksi luostaria Riojassa ovat Unescon maailmanperintökohde, koska niistä on löydetty 900-luvulta peräisin olevat Glosas Emilianenses -merkinnät – vanhimmat tunnetut kirjoitetut sanat espanjan kielellä. Munkit kirjoittivat ne latinankielisen tekstin marginaaliin selittääkseen vaikeita kohtia. Siksi paikkaa kutsutaan joskus espanjan kielen kehdoksi." },
    ],
    "Islas Baleares": [
      { q: "Mistä Baleaarien nimi juontuu?", a: "Nimen uskotaan juontuvan kreikan sanasta, joka viittaa heittämiseen – saarilla asui antiikin aikana kuuluisia linkoojia, joita sekä Kartago että Rooma palkkasivat palkkasotureiksi armeijoihinsa. Baleaarien linkoojat tunnettiin poikkeuksellisen tarkoista heitoistaan taistelukentällä. Nimi on säilynyt saariryhmän nimenä yli kahdentuhannen vuoden ajan." },
      { q: "Puhutaanko saarilla omaa kieltä espanjan lisäksi?", a: "Kyllä – saarilla on kolme omaa katalaanin murretta, mallorquí, menorquí ja eivissenc, jotka ovat espanjan rinnalla virallisia kieliä. Ne periytyvät 1200-luvun katalaanivalloituksesta ja elävät yhä arjessa, kylteissä ja kouluissa. Monet paikalliset pitävät murteita tärkeänä osana saarikohtaista identiteettiä." },
    ],
    "Ceuta": [
      { q: "Vaatiiko Marokko Ceutaa itselleen?", a: "Kyllä – Marokko pitää Ceutaa ja Melillaa siirtomaa-ajan jäänteinä ja vaatii niitä osaksi omaa aluettaan, samaan tapaan kuin Espanja vaatii Gibraltaria Britannialta. Espanja puolestaan pitää kaupunkeja vanhempina kuin nykyinen Marokon valtio ja kieltäytyy neuvottelemasta niiden asemasta. Kiista on pysynyt ratkaisematta vuosikymmenten ajan." },
      { q: "Miten Ceutasta tuli espanjalainen eikä portugalilainen?", a: "Portugali valtasi Ceutan jo vuonna 1415, ja se pysyi portugalilaisena yli 150 vuotta. Kun Espanja ja Portugali olivat yhdessä kuningaskunnassa vuosina 1580–1640, Ceuta siirtyi tosiasiallisesti Espanjan vaikutuspiiriin. Portugalin itsenäistyttyä kaupunki halusi jäädä Espanjalle, ja asia vahvistettiin virallisesti Lissabonin rauhassa 1668." },
    ],
    "Melilla": [
      { q: "Kuka suunnitteli Melillan modernistiset rakennukset?", a: "Suurin osa Melillan modernistisista taloista on katalaanilaisen arkkitehti Enrique Nieton käsialaa 1900-luvun alusta. Nieto oli osa samaa Barcelonan arkkitehtipiiriä, josta myös Antoni Gaudí nousi tunnetuksi, ja toi tyylin mukanaan Pohjois-Afrikkaan. Hänen töitään on kaupungissa yhä kymmeniä, ja moni niistä on suojeltu." },
      { q: "Onko Melillan rajalla erityistä vartiointia?", a: "Kyllä – Melillaa ympäröi kaksinkertainen, useiden metrien korkuinen aita, joka on rakennettu estämään laitonta rajanylitystä Marokosta EU:n alueelle. Aita on yksi harvoista paikoista, joissa Euroopan unionin maaraja kohtaa Afrikan mantereen suoraan. Raja on ajoittain ollut myös kansainvälisten kiistojen ja pakolaisliikkeiden keskiössä." },
    ],
  },
  GBR: {
    "England": [
      { q: "Kulkeeko Lontoon maanalainen jo isoisän ajalta?", a: "Lontoon metro, Underground, avasi ensimmäisen osuutensa jo vuonna 1863 – kymmenen vuotta ennen isoisän matkaa – ja se on maailman vanhin maanalainen rautatie. Ensimmäiset junat kulkivat höyryveturien vetäminä, ja tunnelit täyttyivät savusta ennen sähköistystä 1900-luvun alussa. Isoisä olisi siis hyvinkin voinut matkustaa samoja Metropolitan-linjan tunneleita pitkin." },
      { q: "Näkyivätkö Doverin valkoiset kalliot jo isoisän matkalla?", a: "Doverin liitukalliot ovat muodostuneet miljoonien vuosien aikana meren pohjaan kertyneestä liidusta, ja ne ovat pitkään olleet ensimmäinen näky Englannista mantereelta saapuville. Isoisän aikaan lauttayhteys Calais'sta Doveriin oli jo vilkas reitti, joten hän todennäköisesti näki kalliot juuri saapuessaan. Kalliot ovat säilyneet Englannin tunnetuimpana maamerkkinä tähän päivään asti." },
      { q: "Onko jalkapallo aina ollut yhtä suuri juttu Englannissa?", a: "Englannin jalkapalloliitto perustettiin Lontoossa 1863, ja se on maailman vanhin – samoihin aikoihin syntyivät ensimmäiset yhtenäiset säännöt, jotka erottivat jalkapallon rugbysta. FA Cup, vanhin cup-kilpailu, käynnistyi 1871, vain kaksi vuotta ennen isoisän matkaa. Peli oli siis jo tuolloin järjestäytynyttä, vaikka suurten stadionien ja miljoonayleisöjen aika oli vasta edessä." },
    ],
    "Scotland": [
      { q: "Onko Loch Ness -hirviö vanha tarina vai uusi keksintö?", a: "Vaikka Loch Ness on tunnettu jo vuosisatoja, nykyinen hirviöbuumi käynnistyi vasta 1930-luvulla, kun rantaa kiertävä uusi maantie toi ensi kertaa paljon liikennettä ja katselijoita järven rannalle. Isoisän aikaan 1873 kukaan ei vielä puhunut Nessiestä. Silti järvi houkuttelee nykyään satojatuhansia matkailijoita vuodessa, vaikka tiedemiehet eivät ole löytäneet mitään todisteita hirviöstä." },
      { q: "Oliko Forth-silta jo pystyssä, kun isoisä matkusti?", a: "Ei ollut – kuuluisa Forth Bridge, joka kannattelee rautatietä yli Forth-lahden, valmistui vasta 1890, siis 17 vuotta isoisän matkan jälkeen. Ennen siltaa matkustajat ylittivät lahden lautalla. Nykyään jättiläismäinen konsolisilta on Unescon maailmanperintökohde ja yksi Skotlannin tunnetuimmista maamerkeistä." },
      { q: "Miksi ylämaa muuttui muodikkaaksi juuri 1800-luvulla?", a: "Kuningatar Victoria osti Balmoralin kartanon Ylämaalta 1852 ja rakastui seutuun, mikä teki koko Highlandsista muodikkaan matkakohteen brittiläiselle yläluokalle. Kirjailija Walter Scott oli jo aiemmin romantisoinut ylämaan maisemia ja klaanihistoriaa kirjoissaan. Isoisän matkan aikaan 1870-luvulla ylämaaromantiikka oli jo täydessä vauhdissa." },
    ],
    "Wales": [
      { q: "Miksi Walesissa on niin paljon linnoja?", a: "Englannin kuningas Edward I rakennutti 1200-luvun lopulla Walesiin ketjun järeitä linnoja – Conwyn, Caernarfonin ja Harlechin – kukistaakseen walesilaisten vastarinnan ja hallitakseen aluetta. Niitä pidetään keskiajan Euroopan kehittyneimpänä sotilasarkkitehtuurina, ja ne on listattu Unescon maailmanperintöön. Wales onkin yhä tunnettu linnojensa määrästä suhteessa pinta-alaan." },
      { q: "Mikä on eisteddfod?", a: "Eisteddfod on walesilainen kulttuurijuhla, jossa kilpaillaan runoudessa, laulussa ja musiikissa kymriksi, ja sen juuret ulottuvat keskiajalle asti. Nykymuotoinen National Eisteddfod vakiintui 1860-luvulla, siis juuri ennen isoisän matkaa, kielen ja kulttuurin harrastajien aloitteesta. Juhla elää yhä vahvana ja on yksi syy siihen, miksi kymri ei ole kadonnut kielenä." },
      { q: "Onko Walesin lohikäärmelippu tosi vanha?", a: "Y Ddraig Goch, punainen lohikäärme, periytyy legendojen mukaan jo kuningas Arthurin ajan tarinoista ja walesilaisesta Myrddin-tietäjästä. Se on yksi maailman vanhimmista käytössä olevista kansallislipun kuva-aiheista, vaikka virallisen asemansa se sai vasta 1959. Lippu liehuu nykyään lähes joka kylässä ja on yksi vahvimmista walesilaisen identiteetin symboleista." },
    ],
    "Northern Ireland": [
      { q: "Miksi juuri Belfastissa rakennettiin Titanic?", a: "Belfastin Harland & Wolff -telakka oli 1900-luvun alussa yksi maailman suurimmista ja moderneimmista laivanrakentamoista. Se rakensi Titanicin, joka laskettiin vesille Belfastissa 1911 ja upposi ensimmäisellä matkallaan 1912. Vanha telakka-alue on nykyään Titanic Quarter, jossa museo kertoo sekä laivan että kaupungin laivanrakennushistorian tarinaa." },
      { q: "Oliko Belfast tunnettu jostain muusta kuin laivoista?", a: "1800-luvun lopulla Belfastia kutsuttiin lempinimellä Linenopolis, sillä kaupunki oli maailman suurin pellavakankaan eli liinan tuottaja. Isoisän matkan aikaan 1873 pellavateollisuus työllisti kymmeniätuhansia, erityisesti naisia kutomoissa ja kehräämöissä. Laivanrakennus nousi liinan rinnalle kaupungin toiseksi suureksi elinkeinoksi vasta hieman myöhemmin." },
      { q: "Näkyykö Pohjois-Irlannin levoton historia yhä kaupungissa?", a: "Belfastissa seisoo yhä niin sanottuja rauhanmuureja, jotka rakennettiin erottamaan protestanttisia ja katolisia asuinalueita toisistaan 1900-luvun lopun konfliktin eli The Troublesin aikana. Vaikka rauhansopimus solmittiin 1998, osa muureista on yhä pystyssä ja jotkut portit suljetaan öisin. Monet paikalliset pitävät niitä sekä muistona menneestä että vielä keskeneräisenä rauhanprosessina." },
    ],
  },
  POL: {
    "Masovian": [
      { q: "Onko Varsova aina ollut Puolan pääkaupunki?", a: "Ei aivan - pitkään pääkaupunki oli Kraków, ja Varsova nousi asemaan vasta kun kuningas Sigismund III Vasa siirsi hovin sinne vuonna 1596. Sijainti lähempänä silloista unionia Liettuan kanssa oli yksi syy siirtoon. Sen jälkeen Varsova on pysynyt pääkaupunkina lähes koko ajan, myös Puolan jakojen jälkeenkin palautuneena." },
      { q: "Syntyikö tältä seudulta kuuluisia taiteilijoita?", a: "Kyllä - säveltäjä Fryderyk Chopin syntyi Żelazowa Wolan kylässä parikymmentä kilometriä Varsovasta länteen vuonna 1810. Hänen sydämensä on säilytetty pylväässä Pyhän Ristin kirkossa Varsovan keskustassa, vaikka hän itse kuoli ja on haudattu Pariisiin. Kesäisin kylän puistossa järjestetään ilmaisia Chopin-konsertteja." },
    ],
    "Greater Poland": [
      { q: "Kuinka vanhoja Poznańin messut oikeastaan ovat?", a: "Poznańin kansainväliset messut perustettiin vuonna 1921, ja ne ovat yksi Keski-Euroopan vanhimmista messuorganisaatioista. Messualueen maamerkki on korkea messutorni, joka nousee alueen keskeltä. Nykyään messuilla käy vuosittain satojatuhansia kävijöitä eri aloilta autoista ruokaan." },
      { q: "Onko Poznańissa iso yliopisto?", a: "Kyllä, Adam Mickiewicz -yliopisto perustettiin vuonna 1919 ja se on yksi Puolan suurimmista ja arvostetuimmista. Se tekee Poznańista paitsi kauppa- myös opiskelijakaupungin, jossa nuorten osuus väestöstä on huomattava. Yliopisto on nimetty Puolan kansallisrunoilijan mukaan." },
    ],
    "Warmian-Masurian": [
      { q: "Onko alueella toisen maailmansodan historiaa?", a: "Kyllä - Hitlerin itärintaman päämaja 'Susiluola' (Wolfsschanze) sijaitsi Kętrzynin lähellä nykyisessä Warmiassa-Masuriassa. Sieltä käsin johdettiin muun muassa hyökkäystä Neuvostoliittoon, ja paikalla tehtiin heinäkuussa 1944 epäonnistunut salamurhayritys Hitleriä vastaan. Raunioituneet betonibunkkerit ovat nykyään metsän keskellä avoinna kävijöille." },
      { q: "Mikä on alueen suurin järvi?", a: "Śniardwy on Puolan suurin järvi, yli sata neliökilometriä, ja se sijaitsee juuri Mazurian järviylängöllä. Kanavat yhdistävät järviä toisiinsa, mikä tekee viikkoja kestävistä purjehdusristeilyistä suosittuja. Aluetta kutsutaan myös Puolan vihreiksi keuhkoiksi vähäisen teollisuuden vuoksi." },
    ],
    "West Pomeranian": [
      { q: "Onko rannikolla suosittuja lomakaupunkeja?", a: "Kyllä, Międzyzdroje ja Świnoujście Wolinin saarella ovat suosittuja rantalomakohteita; Świnoujścielle pääsee vain lautalla tai sillan kautta, ja sieltä lähtee laivayhteys Ruotsiin. Lähellä sijaitsee Wolinin kansallispuisto, jonne on palautettu villieurooppalaisia biisoneita. Międzyzdrojessa on jopa oma julkkiskäsijälkien promenadi." },
      { q: "Kuinka lähellä Saksan raja on?", a: "Szczecin sijaitsee vain noin 15 kilometrin päässä Saksan rajasta ja on Puolan läntisimpiä suuria kaupunkeja - sitä ympäröi lännestä lähes kokonaan saksalainen alue. Monet berliiniläiset käyvät kaupungissa päivämatkalla, ja alueelle on muuttanut myös saksalaisia halvempien asuntojen perässä." },
    ],
    "Lublin": [
      { q: "Miksi Lublinilla on erityinen asema Puolan ja Liettuan historiassa?", a: "Lublinin unioni allekirjoitettiin kaupungissa vuonna 1569, ja se yhdisti Puolan kuningaskunnan ja Liettuan suuriruhtinaskunnan yhdeksi valtioksi. Tapahtuma on yksi Puolan historian merkittävimmistä, ja siitä muistuttavat yhä kaupungin monumentit. Liitto kesti yli kaksisataa vuotta, kunnes Puola jaettiin naapurivaltioiden kesken 1700-luvun lopulla." },
      { q: "Onko lähellä toisen maailmansodan historiapaikkoja?", a: "Kyllä, Lublinin laitamilla sijaitsee Majdanekin entinen natsien keskitys- ja tuhoamisleiri, joka säilyi sodan lopussa poikkeuksellisen ehjänä ja on nykyään museo. Se oli yksi ensimmäisistä leireistä, jotka liittoutuneet vapauttivat vuonna 1944. Paikka on yhä käytössä historiaopetuksessa ja muistotilaisuuksissa." },
    ],
    "Podlachian": [
      { q: "Kuka kuuluisa keksijä on syntynyt Podlasiessa?", a: "Białystokissa syntyi vuonna 1859 Ludwik Zamenhof, silmälääkäri joka loi kansainvälisen keinokielen esperanton. Hän halusi kielen, joka yhdistäisi kaupungin monikielistä väestöä - puolalaisia, juutalaisia, venäläisiä ja saksalaisia. Białystokissa on nykyään hänelle omistettu puisto ja museo." },
      { q: "Onko alueella muita vähemmistöjä kuin tataarit?", a: "Kyllä, Podlasiessa asuu Puolan suurin ortodoksinen ja valkovenäläinen vähemmistö, ja monissa kylissä kuulee yhä valkovenäjän murteita. Grabarkan pyhä mäki on ortodoksisen kirkon tärkein pyhiinvaelluskohde Puolassa, jonne kannetaan elokuussa tuhansia ristejä. Kylämaisemassa sipulikupolikirkot ja puiset moskeijat elävät rinnakkain." },
    ],
    "Pomeranian": [
      { q: "Alkoiko toinen maailmansota juuri täältä?", a: "Kyllä - saksalainen sota-alus Schleswig-Holstein ampui ensimmäiset laukaukset Westerplattelle Gdańskin edustalla 1. syyskuuta 1939 aamulla, ja sitä pidetään toisen maailmansodan alkuna Euroopassa. Puolalainen varuskunta puolusti niemekettä viikon ajan ylivoimaa vastaan. Westerplattella on nykyään muistomerkki ja bunkkerien raunioita." },
      { q: "Kuka Solidaarisuus-liikkeen johtaja oli?", a: "Lech Wałęsa, Gdańskin telakan sähköasentaja, nousi Solidaarisuuden johtajaksi vuoden 1980 telakkalakon aikana ja sai myöhemmin Nobelin rauhanpalkinnon. Hänestä tuli Puolan ensimmäinen demokraattisesti valittu presidentti vuonna 1990. Telakan portti numero 2, jonka luona lakko alkoi, on yhä Solidaarisuuden symboli." },
    ],
    "Lower Silesian": [
      { q: "Mikä Wrocławin rakennus on Unescon listalla?", a: "Centennial Hall (Hala Stulecia) valmistui vuonna 1913 juhlistamaan Leipzigin taistelun satavuotispäivää, ja sen betonikupoli oli valmistuessaan maailman suurin teräsbetonirakennelma. Rakennus on Unescon maailmanperintökohde ja edelleen käytössä konsertteihin ja tapahtumiin. Sen edessä oleva puisto ja suihkulähde ovat suosittu kokoontumispaikka." },
      { q: "Miksi kaupunki tuhoutui niin pahasti sodan lopussa?", a: "Natsi-Saksa julisti Breslaun 'linnoituskaupungiksi', ja neuvostojoukot piirittivät sitä lähes kolme kuukautta talvella ja keväällä 1945. Kaupunki antautui vasta 6. toukokuuta 1945, vain kaksi päivää ennen Saksan lopullista antautumista, ja suuri osa keskustasta tuhoutui piirityksessä. Tämä selittää, miksi niin paljon jouduttiin rakentamaan uudelleen sodan jälkeen." },
    ],
    "Łódź": [
      { q: "Mitä Łódźissa tapahtui juutalaisväestölle sodan aikana?", a: "Natsit perustivat Łódźiin vuonna 1940 gheton, jota kutsuttiin Litzmannstadtin gheton nimellä ja johon suljettiin kymmeniätuhansia juutalaisia - yksi suurimmista ghetoista koko Euroopassa. Ghetton johtajaksi natsit asettivat kiistanalaisen Chaim Rumkowskin, joka yritti pelastaa väkeä tekemällä ghetosta natseille tuottavan työleirin. Suurin osa asukkaista surmattiin tai kuoli vuoteen 1944 mennessä." },
      { q: "Ketä kuuluisia ohjaajia elokuvakoulusta on valmistunut?", a: "Łódźin elokuvakoulusta, joka perustettiin vuonna 1948, ovat valmistuneet muun muassa ohjaajat Roman Polanski ja Andrzej Wajda, molemmat kansainvälisesti tunnettuja puolalaisen elokuvan nimiä. Koulusta tuli nopeasti yksi Euroopan arvostetuimmista elokuva-alan oppilaitoksista. Monet sen opiskelijat ovat jääneet kaupunkiin valmistumisen jälkeenkin." },
    ],
    "Kuyavian-Pomeranian": [
      { q: "Kuinka pitkälle piparkakkuperinne juontaa juurensa?", a: "Toruńin piparkakkuperinne ulottuu jo 1300-luvulle, kun hansakaupunki sai kauppareittejä pitkin käyttöönsä idän mausteita ja hunajaa. Kaupungissa toimi keskiajalla omia piparkakkumestareiden kiltoja, ja resepti pysyi osin salaisena vuosisatoja. Nykyään Toruńissa on piparkakkumuseo, jossa voi leipoa omia piparkakkuja perinteisillä puumuoteilla." },
      { q: "Onko kaupungissa Kopernikuksen nimeä kantavaa yliopistoa?", a: "Kyllä, Toruńin yliopisto - Nikolaus Kopernikuksen yliopisto - perustettiin vuonna 1945 sodan jälkeen, kun osa wilnolaisista akateemikoista siirtyi kaupunkiin rajojen muuttuessa. Se on nykyään yksi Puolan arvostetuimmista yliopistoista ja pitää yllä kaupungin tiedehistoriallista mainetta." },
    ],
    "Subcarpathian": [
      { q: "Onko alueella villiä luontoa?", a: "Kyllä, Bieszczadyn vuoret kaakossa ovat Puolan syrjäisintä ja harvimmin asuttua seutua, jossa liikkuu susia, karhuja ja ilveksiä enemmän kuin muualla maassa. Solinan tekojärvi, Puolan suurin, syntyi 1960-luvulla padon rakentamisen myötä ja on nykyään suosittu purjehduskohde. Toisen maailmansodan jälkeen alueen ukrainalaisväestö karkotettiin pakkosiirroin, mikä selittää osin seudun autioitumista." },
      { q: "Mistä lentokoneteollisuus sai alkunsa alueella?", a: "Juuret ulottuvat 1930-luvulle, jolloin Puolan hallitus rakensi tarkoituksella teollisuutta tälle köyhälle mutta rajoista kauas jäävälle ja siksi turvalliseksi katsotulle seudulle. Silloin perustettu lentokonetehdas Rzeszówissa on nykyisen ilmailuklusterin juurilla. Alueella toimii nykyään kansainvälisiä konepajoja, jotka valmistavat moottoreiden osia eri puolille maailmaa." },
    ],
    "Lesser Poland": [
      { q: "Onko lähellä toisen maailmansodan historiapaikkoja?", a: "Kyllä, Auschwitz-Birkenau, natsi-Saksan suurin keskitys- ja tuhoamisleiri, sijaitsee Oświęcimissä vain runsaan tunnin ajomatkan päässä Krakówista samassa voivodikunnassa. Leirillä murhattiin sodan aikana yli miljoona ihmistä, valtaosa juutalaisia eri puolilta Eurooppaa. Alue on nykyään museo ja Unescon maailmanperintökohde." },
      { q: "Oliko Kraków ennen Puolan pääkaupunki?", a: "Kyllä, Kraków oli Puolan pääkaupunki keskiajalta aina vuoteen 1596, jolloin hallitsija siirsi hovin Varsovaan. Puolan kuninkaat kruunattiin silti pitkään Wawelin katedraaliin vielä pääkaupungin vaihduttuakin, ja monarkian symboliikka säilyi kaupungissa. Tämä selittää osaltaan, miksi Wawel on Puolalle niin tärkeä kansallinen symboli." },
    ],
    "Lubusz": [
      { q: "Onko alueella tunnettua luontoa lintuharrastajille?", a: "Ujście Warty -kansallispuisto Lubuszin pohjoisosassa on yksi Puolan tärkeimmistä lintukosteikoista, jonne pysähtyy syys- ja kevätmuuton aikana kymmeniätuhansia hanhia ja muita vesilintuja. Puisto perustettiin vuonna 2001 suojelemaan Warta- ja Odra-jokien yhtymäkohdan tulvaniittyjä. Alue on suosittu lintubongareiden keskuudessa ympäri Eurooppaa." },
      { q: "Onko Lubusz Puolan suurimpia vai pienimpiä voivodikuntia asukasluvultaan?", a: "Lubusz on väkiluvultaan Puolan pienimpiä voivodikuntia, alle miljoona asukasta, ja se yhdistettiin nykyiseen muotoonsa vasta hallintouudistuksessa vuonna 1999. Suuri osa maakunnasta on metsää, yksi Puolan metsäisimmistä alueista. Zielona Góra ja Gorzów Wielkopolski jakavat alueen hallinnolliset toiminnot kahden kaupungin kesken - harvinainen järjestely Puolassa." },
    ],
    "Silesian": [
      { q: "Onko Katowicen seutu yksi ainoa kaupunki vai monta?", a: "Katowicen ympärillä on Puolan ainoa virallisesti tunnustettu suurkaupunkialue, johon kuuluu yli 40 kuntaa ja lähes kaksi miljoonaa asukasta. Kaupungit kuten Katowice, Gliwice, Zabrze ja Sosnowiec ovat käytännössä kasvaneet yhteen ilman selkeitä rajoja. Alue on Puolan tiheimmin asuttu ja teollistunein seutu, vaikka kaivosten sulkeminen on hidastanut kasvua." },
      { q: "Kokevatko sleesialaiset itsensä omaksi kansanryhmäkseen?", a: "Osa alueen asukkaista pitää itseään sleesialaisina, omana etnisenä ryhmänään puolalaisten sijaan, ja he puhuvat sleesian murretta, joka eroaa kirjapuolasta. Puola ei virallisesti tunnusta sleesialaisia kansallisena vähemmistönä, mikä on aiheuttanut kiistoja väestönlaskennoissa. Viimeisimmissä laskennoissa satojatuhannet ovat ilmoittaneet sleesialaisuuden ensisijaiseksi identiteetikseen." },
    ],
    "Świętokrzyskie": [
      { q: "Mistä alueen nimi 'Pyhäristi' juontuu?", a: "Nimi juontuu vuorten laella sijaitsevasta luostarista, jonne keskiajan legendan mukaan tuotiin pieni pala Kristuksen ristiä - relikvion vuoksi paikasta tuli yksi Puolan tärkeimmistä pyhiinvaelluskohteista jo 1300-luvulla. Luostari on yhä toiminnassa, ja sinne vaeltaa kävijöitä ympäri vuoden." },
      { q: "Ovatko nämä vuoret erityisen vanhoja?", a: "Kyllä, Pyhänristinvuoret ovat yksi Euroopan vanhimmista vuoristoista, syntyneet jo yli 500 miljoonaa vuotta sitten, kauan ennen Alppeja tai Karpaatteja. Vuosimiljoonien kuluminen on tehnyt niistä matalia - korkein huippu kohoaa vain reilut 600 metriä - mutta ne ovat säilyttäneet kvartsiittisen kallioperänsä, joka näkyy paikoin jyrkkinä kivivyöhykkeinä rinteillä." },
    ],
    "Opole": [
      { q: "Milloin iskelmäfestivaali sai alkunsa ja miksi se oli erityinen?", a: "Opolen laulufestivaali järjestettiin ensimmäisen kerran vuonna 1963, ja kommunismin aikana se oli poikkeuksellisen vapaa tila, jossa artistit saattoivat vihjailla yhteiskuntakritiikkiä sanoituksissa sensuurin siitä juuri huomaamatta. Festivaali televisioitiin koko maahan ja siitä tuli kesän suurin populaarikulttuurin tapahtuma. Perinne jatkuu yhä." },
      { q: "Miksi juuri Opolessa saksalainen vähemmistö on niin näkyvä?", a: "Opolen voivodikunnassa asuu Puolan suurin tunnustettu saksalainen vähemmistö, joka jäi alueelle toisen maailmansodan jälkeen rajan siirryttyä. Osa kylistä on saanut pystyttää kaksikieliset kyltit 2000-luvulla EU:n vähemmistölainsäädännön ansiosta - laajimmin juuri täällä. Alueen pieni väkiluku selittyy osin siitä, että moni muutti Saksaan rajojen avauduttua 1990-luvulla." },
    ],
  },
  AUT: {
    "Niederösterreich": [
      { q: "Miksi maakunnan pääkaupunki St. Pölten on niin vaatimaton, vaikka Niederösterreich on Itävallan suurin osavaltio?", a: "St. Pölten valittiin maakunnan pääkaupungiksi vasta vuonna 1986 kansanäänestyksellä, sillä sitä ennen alueella ei ollut omaa hallintokeskusta – Wien hoiti sen roolin. Kaupungissa asuu silti vain noin 55 000 ihmistä, mikä tekee siitä yhden Euroopan pienimmistä osavaltion pääkaupungeista suhteessa maakunnan kokoon. Niederösterreich itse on pinta-alaltaan Itävallan suurin osavaltio." },
      { q: "Onko Wachaun laakson lisäksi muita kuuluisia linnoja Tonavan varrella?", a: "Dürnsteinin linnan raunioissa pidettiin vuosina 1192–1193 vangittuna Englannin kuningas Rikhard Leijonamieli, kun hän palasi kolmannelta ristiretkeltä. Legendan mukaan hänen minstrelinsä Blondel löysi hänet lopulta laulamalla linnan muurien alla. Linna kohoaa yhä jyrkän kalliokielekkeen päällä pienen viinikylän yllä." },
      { q: "Onko Wienin lähellä oikeaa erämaata?", a: "Wienerwald eli Wienin metsä julistettiin UNESCOn biosfäärialueeksi vuonna 2005, ja se ulottuu suurelta osin Niederösterreichin puolelle. Alue yhdistää poikkeuksellisen tiiviisti asuttua kaupunkiseutua ja laajoja lehtimetsiä. Metsä on ollut wieniläisten suosikkiretkikohde jo 1800-luvulta lähtien." },
    ],
    "Steiermark": [
      { q: "Mistä Wienin kuuluisan Espanjalaisen ratsastuskoulun valkoiset hevoset oikeastaan tulevat?", a: "Lipizzanerhevosia kasvatetaan nykyään Piberin valtion hevostilalla Steiermarkissa, jonne kasvatustoiminta siirrettiin vuonna 1920 ensimmäisen maailmansodan jälkeen. Varsat syntyvät tummina ja vaalenevat vasta vuosien mittaan valkoisiksi. Vain parhaat oriit lähetetään aikuisina Wieniin koulutettaviksi." },
      { q: "Miksi Grazia kutsutaan sekä maailmanperintökaupungiksi että muotoilukaupungiksi?", a: "Grazin vanhakaupunki on ollut UNESCOn maailmanperintökohde vuodesta 1999, koska sen keskiaikainen ja barokkiajan rakennuskanta on säilynyt poikkeuksellisen ehjänä. Vuonna 2011 UNESCO nimesi Grazin lisäksi muotoilun kaupungiksi luovien kaupunkien verkostossaan. Kaupunki kantaa siis kahta UNESCO-titteliä samaan aikaan, mikä on harvinaista." },
    ],
    "Tirol": [
      { q: "Mikä on se kultainen katto, josta Innsbruckin vanhakaupunki tunnetaan?", a: "Goldenes Dachl eli Kultainen katto on parveke, jonka keisari Maximilian I rakennutti vuonna 1500 seuratakseen sen alta toriaukion turnajaisia ja esityksiä. Katto on päällystetty yli 2600 kullatulla kuparilaatalla, jotka kimaltavat yhä keskellä vanhaakaupunkia. Se on nykyään Innsbruckin tunnetuin maamerkki." },
      { q: "Onko Tirolissa muuta kuin vuoria ja hiihtoa?", a: "Wattensin kylässä toimii Swarovski Kristallwelten, jonka taiteilija André Heller suunnitteli vuonna 1995 yhtiön 100-vuotisjuhlaan. Sisäänkäynti on jättiläismäisen ruohopeitteisen kasvonaamion suun kautta, ja näyttelytiloissa on esillä muun muassa maailman suurin leikattu kristalli. Museo on yksi Itävallan suosituimmista maksullisista nähtävyyksistä." },
    ],
    "Oberösterreich": [
      { q: "Mikä ihmeen rautatie kiipeää Linzin yllä olevalle vuorelle?", a: "Pöstlingbergbahn on maailman jyrkin raiteillaan kulkeva ratikka, ja se on kulkenut Linzin keskustasta Pöstlingbergin huipulle vuodesta 1898. Jyrkimmillään rata nousee lähes 12 prosentin kaltevuudessa ilman hammasratasta. Huipulla odottaa barokkikirkko ja näköala koko kaupunkiin." },
      { q: "Milloin Ars Electronica sai alkunsa?", a: "Ars Electronica -festivaali järjestettiin ensimmäisen kerran vuonna 1979, ja siitä on kasvanut yksi maailman vanhimmista mediataidetapahtumista. Sen koti on Ars Electronica Center, jonka LED-valoin peitetty julkisivu vaihtaa väriään Tonavan rannalla joka ilta. Rakennus avattiin nykyisessä laajennetussa muodossaan vuonna 2009, samana vuonna kun Linz oli Euroopan kulttuuripääkaupunki." },
    ],
    "Kärnten": [
      { q: "Onko Kärntenissä muuta kuin järviä?", a: "Kärntenin ja Salzburgin rajalla kohoaa Grossglockner, Itävallan korkein vuori 3798 metrin korkeudessaan. Sen yli kiemurteleva Grossglocknerin suurtunturitie valmistui vuonna 1935 ja on yhä yksi Alppien näyttävimmistä vuoristoteistä. Tieltä avautuu näköala myös Pasterzelle, Itävallan pisimmälle jäätikölle, joka sulaa nykyään nopeasti." },
      { q: "Mikä outo puisto sijaitsee Klagenfurtin rannalla Lindwurm-lohikäärmepatsaan lisäksi?", a: "Klagenfurtin Wörthersee-rannalla sijaitsee Minimundus, puisto jossa yli 150 maailmankuulua rakennusta – Eiffel-tornista Sydneyn oopperataloon – on pienoismallinnettu mittakaavassa 1:25. Puisto avattiin vuonna 1958, ja sitä laajennetaan yhä uusilla pienoismalleilla. Se on yksi Itävallan suosituimmista perhekohteista." },
    ],
    "Salzburg": [
      { q: "Onko Salzburg tunnettu muustakin kuin Mozartista ja suolasta?", a: "Vuonna 1965 Salzburgissa ja sen ympäristössä kuvattiin Hollywood-musikaali The Sound of Music, joka voitti viisi Oscaria. Elokuvan kohtauksia näkyy yhä Mirabellin puutarhoissa ja Nonnbergin luostarissa, ja niin sanotut Sound of Music -kiertoajelut houkuttelevat yhä turisteja kaupunkiin. Moni itävaltalainen tuntee elokuvan silti huonommin kuin ulkomaiset matkailijat." },
      { q: "Missä talossa Mozart oikeastaan syntyi?", a: "Wolfgang Amadeus Mozart syntyi vuonna 1756 keltaisessa talossa osoitteessa Getreidegasse 9, kapealla kauppakadulla Salzburgin vanhassakaupungissa. Talo on nykyään museo, jossa on esillä muun muassa hänen lapsuudenaikainen viulunsa. Perhe asui talossa Mozartin ensimmäiset noin 17 elinvuotta." },
    ],
    "Burgenland": [
      { q: "Miksi Neusiedler-järvi on niin erikoinen järvi?", a: "Neusiedler See on Keski-Euroopan ainoa aroluontoinen järvi, ja sen keskisyvyys on vain runsas metri. Järvi jakautuu Itävallan ja Unkarin kesken, ja sen etelä- ja itärannat kuuluvat Unkarin puolelle. Matala vesi ja laajat ruovikot tekevät siitä myös poikkeuksellisen lämpimän uimapaikan kesäisin." },
      { q: "Miksi Burgenlandin viinit ovat niin makeita?", a: "Neusiedler-järven ympäristön kostea mikroilmasto suosii jalohomeen syntyä rypäleissä, mikä mahdollistaa makeat Ruster Ausbruch -viinit Rustin ympärillä. Perinne on niin vanha ja arvostettu, että Rust sai jo 1600-luvulla oikeuden kutsua itseään vapaaksi kuninkaalliseksi kaupungiksi juuri viinintuotantonsa ansiosta. Burgenland tuottaa nykyään suurimman osan Itävallan makeista viineistä." },
    ],
    "Vorarlberg": [
      { q: "Miksi vorarlbergiläiset puhuvat niin eri tavalla kuin muut itävaltalaiset?", a: "Vorarlbergin murre kuuluu alemannien kielihaaraan, samaan ryhmään kuin sveitsinsaksa – toisin kuin muun Itävallan baijerilaispohjaiset murteet. Moni muualta Itävallasta tuleva ei meinaa ymmärtää paikallista puhetta lainkaan. Kielellinen ero selittää osaltaan, miksi alue on aina tuntenut vetoa länteen, Sveitsiin päin." },
      { q: "Mitä Bregenzerwaldin vuoristokylissä syödään?", a: "Bregenzerwaldissa on pitkä juustonvalmistusperinne, ja aluetta risteilee merkitty juustoreitti, joka esittelee paikallisia alppimeijereitä. Alueen Bergkäse-juusto valmistetaan yhä usein käsityönä pienissä kyläjuustoloissa. Perinne kytkeytyy samaan karjatalouteen, joka aikoinaan ruokki myös tekstiiliteollisuuden työväestöä." },
    ],
    "Wien": [
      { q: "Mikä on se iso vanha maailmanpyörä Praterissa?", a: "Praterin kuuluisa Riesenrad-maailmanpyörä valmistui vuonna 1897 keisari Frans Joosef I:n 50-vuotisen hallituskauden kunniaksi. Se selvisi juuri toisesta maailmansodasta, vaikka suuri osa sen vaunuista tuhoutui pommituksissa ja korjattiin sodan jälkeen. Pyörä on yhä käytössä ja yksi Wienin tunnetuimmista maamerkeistä, vaikka se rakennettiinkin vasta isoisän vierailun jälkeisellä vuosikymmenellä." },
      { q: "Miksi Wienin keskustaa kiertää niin leveä bulevardi?", a: "Keisari Frans Joosef I määräsi vuonna 1857 keskiaikaiset kaupunginmuurit purettavaksi, ja niiden paikalle rakennettiin 1860-luvulla Ringstrasse, komea bulevardi jonka varrelle nousivat muun muassa oopperatalo, parlamentti ja useita museoita. Katu valmistui vain muutamaa vuotta ennen isoisän vierailua ja maailmannäyttelyä 1873. Ringstrasse on yhä Wienin arkkitehtoninen selkäranka." },
    ],
  },
  /*
   * GRC (Sisältökirjuri 25.9.2026). Avaimet TÄSMÄLLEEN kuin
   * MAAKUNTIEN_LUONNEHDINNAT.GRC:ssä. 1873-kytkennät tarkistettu
   * en-Wikipediasta: vuonna 1873 Kreikkaan kuuluivat vain Attika,
   * Keski-Kreikka, Peloponnesos, Länsi-Kreikka, Kykladit ja (vuodesta
   * 1864) Joonianmeren saaret; muut alueet olivat osmanien hallussa.
   */
  GRC: {
    Attiki: [
      { q: "Pidettiinkö Ateenassa olympialaisia jo ennen vuotta 1896?", a: "Tavallaan kyllä: kauppias Evangelos Zappaksen rahoittamat Zappaksen olympialaiset pidettiin muinaisella Panathinaikon stadionilla 1870 ja 1875. Isoisän käydessä 1873 stadion oli siis juuri kaivettu esiin. Nykyisen asunsa, kokonaan marmorisena, se sai vuoden 1896 ensimmäisiä nykyolympialaisia varten." },
      { q: "Miksi Lavrionin hopea oli antiikin Ateenalle niin tärkeää?", a: "Lavrionin kaivoksista löytyi 480-luvulla eaa. runsas hopeasuoni, ja Themistokles sai ateenalaiset käyttämään tuoton sotalaivoihin. Sillä laivastolla Ateena voitti persialaiset Salamiin meritaistelussa 480 eaa. Kun kaivoksia avattiin uudelleen 1800-luvulla, muinainen kuona osoittautui niin arvokkaaksi, että siitä syntyi kansainvälinen riita." },
      { q: "Mitä kuuluisa arkeologi Schliemann toi Ateenaan vuonna 1873?", a: "Heinrich Schliemann löysi toukokuussa 1873 Troijan kaivauksilta kulta-aarteen, jonka hän nimesi Priamoksen aarteeksi, ja salakuljetti sen Osmanivaltakunnasta Ateenaan. Asia paljastui, kun hänen kreikkalainen vaimonsa Sophia esiintyi julkisesti aarteen koruissa. Nykyään suurin osa aarteesta on Moskovan Puškin-museossa." },
    ],
    'Kentriki Makedonia': [
      { q: "Mitä Verginan kummun alta löytyi?", a: "Arkeologi Manolis Andronikos kaivoi 1977 Verginan suuresta kummusta neljä hautaa, joista kaksi oli koskemattomia. Yhdestä löytyi 24 karaatin kullasta tehty, 11 kilon arkku, jonka uskotaan kätkeneen Aleksanteri Suuren isän Filippos II:n luut. Museo rakennettiin kummun sisään niin, että haudat ovat yhä alkuperäisillä paikoillaan." },
      { q: "Kuka kiipesi ensimmäisenä jumalten vuorelle Olympokselle?", a: "Nykyaikana huipulle nousivat ensimmäisinä sveitsiläiset Frédéric Boissonnas ja Daniel Baud-Bovy paikallisen metsästäjän Christos Kakkaloksen opastamina 2. elokuuta 1913. Korkein huippu Mytikas kohoaa noin 2918 metriin, ja se on Kreikan korkein kohta. Olymposvuoresta tehtiin maan ensimmäinen kansallispuisto 1938." },
      { q: "Onko totta, että Turkin perustaja syntyi Thessalonikissa?", a: "On: Mustafa Kemal Atatürk syntyi kaupungissa vuonna 1881, kun se kuului vielä Osmanivaltakuntaan. Hänen syntymäkotinsa on nykyään museo Turkin konsulaatin alueella. Kaupunki siirtyi Kreikalle vain 31 vuotta hänen syntymänsä jälkeen, vuonna 1912." },
    ],
    Kriti: [
      { q: "Miksi Samarian rotkon kylä on tyhjä?", a: "Rotkon keskellä ollut Samarian kylä hylättiin 1962, kun alueesta tehtiin kansallispuisto. Suojelun tärkein syy oli kri-kri, Kreetan villivuohi, jota elää luonnossa lähinnä tällä alueella. Rotko on noin 16 kilometriä pitkä, ja kapeimmassa kohdassa, Porteilla, noin 300-metriset seinämät ovat vain neljän metrin päässä toisistaan." },
      { q: "Oliko Knossoksen labyrintti oikeasti olemassa?", a: "Minotauroksen labyrinttia ei ole löydetty, mutta Knossoksen pronssikautinen palatsi on niin sokkeloinen, että moni pitää sitä tarun lähteenä. Arthur Evans kaivoi palatsia vuodesta 1900 ja antoi koko kulttuurille nimen minolainen tarun kuningas Minoksen mukaan. Hän myös rakensi osia palatsista uudelleen betonista, mistä arkeologit kiistelevät yhä." },
      { q: "Miksi Arkadin luostari on kreetalaisille niin tärkeä paikka?", a: "Marraskuussa 1866 luostariin oli paennut 964 ihmistä, enimmäkseen naisia ja lapsia, kun osmanien joukot piirittivät sitä. Kun hyökkääjät murtautuivat sisään, puolustajat räjäyttivät ruutivaraston, ja 846 luostarissa ollutta kuoli. Tapahtuma herätti huomiota koko Euroopassa ja teki Kreetan vapaustaistelusta kansainvälisen asian." },
    ],
    Peloponnisos: [
      { q: "Kuuluuko Epidauroksen teatterissa todella kuiskaus ylimmälle riville?", a: "Teatteria pidetään antiikin Kreikan akustisesti täydellisimpänä, ja näyttämöllä pudotetun kolikon kerrotaan kuuluvan ylimmille penkeille asti. Noin 340–300 eaa. rakennettuun teatteriin mahtuu 13 000–14 000 katsojaa. Siellä on esitetty antiikin draamaa joka kesä vuodesta 1955 lähtien." },
      { q: "Mistä malvasia-viini on saanut nimensä?", a: "Nimi tulee Monemvasian linnoituskaupungista, joka oli keskiajalla yksi Itä-Välimeren tärkeimmistä kauppasatamista ja vei viiniä ympäri Eurooppaa. Italiaksi kaupungin nimi taipui muotoon Malvasia. Monemvasia tarkoittaa yhtä sisäänkäyntiä, koska kalliosaarelle pääsee vain kapeaa kannasta pitkin." },
      { q: "Kuinka kapea Korintin kanava oikein on?", a: "Kanava on 6,3 kilometriä pitkä mutta merenpinnan kohdalla vain noin 24,6 metriä leveä, joten nykyiset suuret alukset eivät mahdu siitä lainkaan. Sen rakentaminen kesti 1881–1893. Jo keisari Nero yritti kaivaa kanavaa vuonna 67 jaa. ja iski itse ensimmäisen iskun kuokalla, mutta työ keskeytyi hänen kuoltuaan." },
    ],
    Thessalia: [
      { q: "Miten munkit oikein pääsivät Meteoran kallioiden huipulle?", a: "Tarkoituksella vaikeasti: pitkillä yhteen sidotuilla tikkailla tai isoilla verkoilla, joilla vintattiin ylös sekä tavaraa että ihmisiä. Vasta 1920-luvulla kallioon hakattiin portaat. Luostareita oli aikoinaan 24, ja niistä kuusi on yhä pystyssä." },
      { q: "Mikä pieni juna kulkee Pelionin rinteillä?", a: "Pelionin rautatie on raideleveydeltään vain 60 senttiä, ja se rakennettiin 1890-luvulla ja jatkettiin Miliesin kylään 1903. Sen suunnitteli italialainen insinööri Evaristo de Chirico, jonka Volosissa syntynyt poika Giorgio de Chirico tuli myöhemmin kuuluisaksi taidemaalarina. Nykyään radalla kulkee matkailijoiden museojuna." },
      { q: "Miksi Thessalia liitettiin Kreikkaan juuri 1881?", a: "Venäjän ja Turkin sodan jälkeen suurvallat kokoontuivat Berliinin kongressiin 1878 ja kehottivat siirtämään Kreikan rajaa pohjoisemmaksi. Pitkien neuvottelujen jälkeen Osmanivaltakunta luovutti Konstantinopolin sopimuksella 1881 lähes koko Thessalian sekä Artan seudun Epeiroksesta. Elassonan seutu jäi kuitenkin osmaneille vuoteen 1912 asti." },
    ],
    Ipeiros: [
      { q: "Mikä oli Dodonan oraakkeli?", a: "Dodona oli Zeuksen oraakkeli, jota historioitsija Herodotos piti Kreikan vanhimpana, ehkä jo toiselta vuosituhannelta eaa. Papittaret tulkitsivat jumalan tahtoa pyhän tammen lehtien kahinasta. Paikalta on löydetty yli 4200 laattaa, joihin tavalliset ihmiset raapustivat kysymyksiään jumalalle." },
      { q: "Kuka oli Ioanninaa hallinnut Ali-pasa?", a: "Ali-pasa oli albaanitaustainen osmanien käskynhaltija, joka hallitsi Ioanninasta käsin laajaa aluetta 1700-luvun lopulta lähtien lähes itsenäisenä. Hän kävi omaa diplomatiaansa suurvaltojen kanssa, ja lordi Byron vieraili hänen luonaan 1809. Sulttaani kyllästyi lopulta kapinoivaan käskynhaltijaansa, ja Ali-pasa tapettiin 1822 Pamvotisjärven saaren luostarissa." },
      { q: "Miten Ioannina lopulta liitettiin Kreikkaan?", a: "Ensimmäisessä Balkanin sodassa Kreikan armeija piiritti kuukausia Bizanin linnoituksia, jotka suojasivat kaupunkia etelästä. Linnoitukset murtuivat helmikuussa 1913, ja Ioannina siirtyi Kreikalle 21. helmikuuta. Pohjoisempi osa vanhaa Epeirosta jäi myöhemmin Albanialle." },
    ],
    'Dytiki Makedonia': [
      { q: "Mikä sopimus solmittiin Prespajärven rannalla?", a: "Kreikka ja silloinen Makedonian tasavalta allekirjoittivat 17. kesäkuuta 2018 Psaradesin kylässä Prespan sopimuksen, joka päätti lähes 30 vuotta kestäneen nimikiistan. Naapurimaan nimeksi tuli Pohjois-Makedonia. Paikka oli symbolinen, sillä Prespajärvi on Kreikan, Albanian ja Pohjois-Makedonian yhteinen." },
      { q: "Mikä raunio seisoo Pikku-Prespan saarella?", a: "Agios Akhilleioksen saarella ovat Pyhän Akhilleuksen basilikan rauniot. Bulgarian tsaari Samuel rakennutti kirkon ja linnoituksen 900-luvun lopulla ja toi saarelle pyhimyksen jäännökset Larisasta. Saarelle kävellään nykyään pitkää kelluvaa siltaa pitkin." },
      { q: "Miksi Kozanin seudulla on niin valtavia kaivoskuoppia?", a: "Ptolemaidan ja Kozanin ympäristön maaperässä on paksuja ruskohiilikerroksia, joita on louhittu avolouhoksina vuosikymmenten ajan. Ruskohiili oli pitkään Kreikan tärkein sähkönlähde, ja voimalat työllistivät koko seudun. Nyt Kreikka luopuu ruskohiilestä ilmastosyistä, ja entisille louhoksille rakennetaan aurinkovoimaloita." },
    ],
    'Dytiki Ellada': [
      { q: "Missä olympiatuli sytytetään?", a: "Olympiatuli sytytetään muinaisessa Olympiassa Heran temppelin raunioilla koveran peilin kokoamilla auringonsäteillä muutama kuukausi ennen kisoja. Seremonian esittävät antiikin papittariksi pukeutuneet näyttelijät. Perinne otettiin käyttöön Berliinin kisoja 1936 varten, jolloin juostiin myös ensimmäinen soihtuviesti." },
      { q: "Miten Rion–Antirrionin silta kestää maanjäristykset?", a: "Silta on 2880 metriä pitkä, ja sen pylväät lepäävät tasoitetun sorapatjan päällä eivätkä ole kiinni pohjassa, joten ne voivat järistyksessä liukua. Vettä on paikoin 65 metriä, ja salmi levenee hitaasti mannerlaattojen liikkeen vuoksi. Silta avattiin 12. elokuuta 2004, päivää ennen Ateenan olympialaisten avajaisia." },
      { q: "Kuinka vanha Patraksen karnevaali on?", a: "Karnevaali järjestettiin ensimmäisen kerran 1829, ja se kestää joka vuosi Pyhän Antoniuksen päivästä 17. tammikuuta ortodoksisen paaston alkuun, puhtaaseen maanantaihin. Suureen paraatiin osallistuu 35 000–40 000 naamioitunutta ihmistä. Juhla päättyy satamassa, kun karnevaalikuningas poltetaan." },
    ],
    'Stereá Elláda': [
      { q: "Miksi Khalkiksen salmessa virta vaihtaa suuntaa?", a: "Euripoksen salmi Euboian ja mantereen välissä on kapeimmillaan vain 38 metriä, ja sen virtaus kääntyy noin neljä kertaa vuorokaudessa ja kulkee jopa 12 kilometrin tuntinopeutta. Ilmiö ihmetytti jo antiikissa, ja tarun mukaan Aristoteles suri, ettei keksinyt sille selitystä. Arvoituksen ratkaisi lopullisesti Ateenan observatorion johtaja Dimitrios Eginitis 1929." },
      { q: "Miksi Delfoita pidettiin maailman napana?", a: "Tarun mukaan Zeus päästi kaksi kotkaa lentämään maailman itä- ja länsilaidalta, ja niiden reitit kohtasivat Delfoin yllä. Paikan merkiksi pystytettiin omfalos-kivi, jonka nimi tarkoittaa napaa. Marmorinen omfalos on yhä nähtävissä Delfoin museossa." },
      { q: "Mistä nimi Termopylai tulee?", a: "Nimi tarkoittaa kuumia portteja, ja se viittaa solan juurella pulppuaviin kuumiin rikkilähteisiin. Lähteet virtaavat yhä, ja niiden lämpimässä vedessä kylpee matkailijoita aivan valtatien vieressä. Leonidaan ja spartalaisten muistomerkki seisoo samalla tiellä." },
    ],
    'Anatoliki Makedonia kai Thraki': [
      { q: "Mistä Louvren kuuluisa Samothraken Nike on peräisin?", a: "Ranskalainen konsuli Charles Champoiseau löysi siivekkään voitonjumalattaren patsaan Samothraken saarelta huhtikuussa 1863, ja se saapui Pariisiin 1864. Isoisän matkan aikaan patsas oli siis jo Louvressa, mutta suuren portaikon huipulle se nostettiin vasta 1884. Samothrake kuuluu nykyään tähän maakuntaan." },
      { q: "Miksi Dadian metsään tullaan katsomaan korppikotkia?", a: "Dadian–Lefkimin–Souflin kansallispuisto on Balkanin ainoa munkkikorppikotkan pesimäpaikka, ja siellä pesii noin 30–35 paria. Munkkikorppikotka on Euroopan suurin petolintu. Puistossa elävät myös hanhikorppikotka ja pikkukorppikotka, eli kolme Euroopan neljästä korppikotkalajista." },
      { q: "Miksi Traakian muslimit jäivät Kreikkaan väestönvaihdossa?", a: "Kreikka ja Turkki vaihtoivat 1923 Lausannen sopimuksella väestöjään uskonnon perusteella, mutta Länsi-Traakian muslimit ja Istanbulin kreikkalaiset rajattiin vaihdon ulkopuolelle. Traakian muslimeilla on siksi yhä virallinen vähemmistöasema ja omia kouluja. Suurin osa heistä asuu Komotinin ja Ksanthin seuduilla." },
    ],
    'Ionioi Nisoi': [
      { q: "Missä Kreikan kansallislaulu syntyi?", a: "Runoilija Dionysios Solomos kirjoitti Vapauden hymnin Zakynthoksella 1823 keskellä vapaussotaa, ja korfulainen säveltäjä Nikolaos Mantzaros sävelsi sen. Runossa on peräti 158 säkeistöä, mutta tavallisesti lauletaan vain kaksi ensimmäistä. Sama hymni on myös Kyproksen kansallislaulu." },
      { q: "Miksi Kefalonian Fiskardo näyttää vanhemmalta kuin muu saari?", a: "Elokuun 12. päivän 1953 järistys, voimakkuudeltaan 6,8, tuhosi lähes kaikki Kefalonian rakennukset, mutta pohjoiskärjen Fiskardo säästyi. Järistys nosti koko saarta noin 60 senttiä. Tuhon jälkeen moni saarelainen muutti Kanadaan, Yhdysvaltoihin, Australiaan tai Britanniaan." },
      { q: "Kuka rakennutti Korfulle Akhilleion-palatsin?", a: "Itävallan keisarinna Elisabet eli Sisi rakennutti palatsin 1889–1890 pakopaikakseen poikansa kuoleman jälkeen. Myöhemmin sen osti Saksan keisari Vilhelm II, joka vietti siellä kesiä vuoteen 1914. Isoisän käydessä 1873 palatsia ei siis vielä ollut." },
    ],
    'Notio Aigaio': [
      { q: "Miksi Delokselle ei saanut syntyä eikä siellä saanut kuolla?", a: "Delos oli Apollonin ja Artemiin pyhä syntymäsaari, ja ateenalaiset toimittivat 426 eaa. puhdistuksen, jonka jälkeen saarella ei saanut synnyttää eikä haudata ketään. Kuolevat ja synnyttäjät vietiin viereiselle Rheneian saarelle. Ranskalaiset arkeologit aloittivat saaren kaivaukset juuri 1873, isoisän matkavuonna, ja ne jatkuvat yhä." },
      { q: "Seisoiko Rodoksen kolossi todella sataman suun yli jalat harallaan?", a: "Tuskin: noin 33 metriä korkea pronssipatsas olisi romahtanut omaan painoonsa, jos jalat olisivat olleet sataman molemmin puolin. Kuva syntyi vasta keskiajan tulkinnoista. Maanjäristys katkaisi patsaan polvista 226 eaa., ja sen kappaleet makasivat maassa vuosisatoja nähtävyytenä." },
      { q: "Mikä kaupunki löytyi Santorinin tuhkan alta?", a: "Akrotirin pronssikautinen kaupunki hautautui tuhkan alle, kun saaren tulivuori purkautui noin 1600 eaa., ja se säilyi kuin Pompeji. Toisin kuin Pompejista, sieltä ei ole löydetty uhrien ruumiita, joten asukkaat ehtivät luultavasti paeta. Seinämaalaukset ovat säilyneet niin hyvin, että niissä erottuu yhä apinoita, pääskyjä ja kalastajia." },
    ],
    'Voreio Aigaio': [
      { q: "Mitä Khioksen mastiksi oikein on?", a: "Mastiksi on mastiksipistaasin pihkaa, jota saadaan tekemällä puun kuoreen 5–10 viiltoa ja keräämällä kovettuneet pisarat. Sitä tuotetaan Khioksen 24 mastiksikylässä, ja osmanien aikaan pihka oli kultansa arvoista. Sitä käytetään purukumina, likööreissä, leivonnaisissa ja jopa lääkkeissä." },
      { q: "Miksi ikarialaiset elävät niin vanhoiksi?", a: "Ikaria on yksi maailman viidestä niin sanotusta sinisestä vyöhykkeestä, ja joka kolmas ikarialainen elää yli 90-vuotiaaksi. Tutkijoiden mukaan syinä ovat oliiviöljyyn ja vihanneksiin perustuva ruokavalio, vähäinen stressi, liikkuminen vuoristossa ja tiivis yhteisö. Saarella oli myös oma viiden kuukauden valtionsa 1912 ennen liittymistä Kreikkaan." },
      { q: "Miten Samoksen muinainen vesitunneli kaivettiin?", a: "Insinööri Eupalinos kaivatti 1036 metrin tunnelin vuoren läpi 500-luvulla eaa. kahdesta päästä yhtä aikaa. Kaivajat kohtasivat vuoren sisällä vain muutaman kymmenen sentin korkeuserolla, mikä oli aikanaan huikea mittaustaidon näyte. Tunneli johti vettä Samoksen kaupunkiin, ja siinä voi yhä kulkea." },
    ],
    'Ayion Oros': [
      { q: "Mitä kello on Athoksella?", a: "Useimmat luostarit elävät yhä bysanttilaisen ajan mukaan: vuorokausi alkaa auringonlaskusta, joten kellot näyttävät vuodenajasta riippuen useita tunteja eri aikaa kuin muualla Kreikassa. Poikkeus on Iviron, jossa päivä alkaa auringonnoususta. Koko vuori noudattaa lisäksi juliaanista kalenteria, joka on nykyään 13 päivää jäljessä." },
      { q: "Oliko Athoksen kalenteri 1873 yhtä poikkeuksellinen kuin nyt?", a: "Ei ollut: isoisän aikaan koko Kreikka käytti juliaanista kalenteria, joka oli silloin 12 päivää länsimaista jäljessä. Kreikka siirtyi gregoriaaniseen kalenteriin vasta 1923, mutta Athoksen munkit pitivät vanhan. Siksi Athoksen joulu osuu nykyään tammikuun 7. päivälle." },
      { q: "Kaivoiko Persian kuningas todella kanavan Athoksen niemen poikki?", a: "Kyllä: Kserkses I kaivatti kolmen vuoden ajan kanavan niemimaan kapean kannaksen poikki, jotta hänen laivastonsa välttäisi Athoksen myrskyisen kärjen, jossa persialaisten laivasto oli haaksirikkoutunut 492 eaa. Kanava valmistui ennen Kreikkaan hyökkäämistä 480 eaa. Sen jäljet näkyvät yhä maastossa Nea Rodan kylän lähellä." },
    ],
  },
  /*
   * NLD (Sisältökirjuri 27.9.2026). Avaimet TÄSMÄLLEEN kuin
   * MAAKUNTIEN_LUONNEHDINNAT.NLD:ssä (15 aluetta: 12 maakuntaa +
   * Karibian erityiskunnat Bonaire, Saba, St. Eustatius). Eri
   * kulma/faktat kuin samojen alueiden lyhyt/pitka-teksteissä sekä
   * js/packs/nahtavyysjutut.js:n amsterdam-kohteissa ja
   * maa-kategoriat.js/maakartat.js:n NLD-sisällössä (esim. Amsterdamin
   * asema/Anne Frank/Rijksmuseum, Delft/Leeuwenhoek, Kinderdijk,
   * Afsluitdijk, stroopwafel/Gouda, tulppaanimania, Schokland,
   * Barentsz, Zaanse Schans -sahamylly) — faktat tarkistettu
   * en-Wikipediasta 27.9.2026.
   */
  NLD: {
    Bonaire: [
      { q: "Miksi Bonairella maksetaan dollareilla eikä eurolla?", a: "Bonaire on yksi Alankomaiden kolmesta Karibian erityiskunnasta yhdessä Saban ja St. Eustatiuksen kanssa, ja vuodesta 2011 niissä on käytetty Yhdysvaltain dollaria euron sijaan. Mantereen Alankomaissa maksetaan eurolla, mutta täällä raha kulkee samalla valuutalla kuin naapurisaarilla." },
      { q: "Miksi sukeltajat pitävät Bonairea erityisen hyvänä?", a: "Koko saaren ympärillä oleva riutta kuuluu jo 1979 perustettuun merensuojelualueeseen, yhteen maailman vanhimmista. Rannalta pääsee sukeltamaan suoraan ilman venettä lähes missä tahansa saarella, minkä ansiosta Bonairea kutsutaan usein maailman rantasukelluspääkaupungiksi." },
      { q: "Mistä Bonairen jatkuva tuuli on tehnyt saaren kuuluisan?", a: "Tasaiset passaatituulet puhaltavat Lac Bayn matalalla lahdella lähes ympäri vuoden, ja siitä on tullut yksi maailman parhaista windsurffauspaikoista. Lahti on isännöinyt useita nuorten maailmanmestaruuskilpailuja, ja nykyään rannalla on kymmeniä lautakouluja." },
    ],
    Drenthe: [
      { q: "Mistä valtavat dolmenikivet oikein tulivat, kun Drenthessä ei ole kallioita?", a: "Kivet ovat jääkauden aikana mannerjään mukana Skandinaviasta kulkeutuneita siirtolohkareita, jotka jäivät maahan jään sulaessa. Kivikautiset ihmiset käyttivät juuri näitä paikalla valmiina lojuneita järkäleitä hautojensa rakennusaineena noin 3500 eaa." },
      { q: "Miksi moottoripyöräfanit tuntevat Assenin nimeltä?", a: "TT Circuit Assenilla on ajettu huippuluokan moottoripyöräkilpailuja jo vuodesta 1925, mikä tekee siitä yhden maailman vanhimmista yhä käytössä olevista radoista. Rataa kutsutaan kunnioittavasti Nopeuden katedraaliksi, ja Alankomaiden TT kerää yhä kymmeniätuhansia katsojia." },
      { q: "Miksi Drenthe on suosittu tähtien katselijoiden keskuudessa?", a: "Dwingelderveldin kansallispuisto sai 2013 Alankomaiden ensimmäisenä kansainvälisen tumman taivaan puiston statuksen, koska valosaastetta on siellä poikkeuksellisen vähän muuten niin tiheään asutussa maassa. Selkeinä öinä taivaalta erottaa Linnunradan paljain silmin." },
    ],
    "Zuid-Holland": [
      { q: "Miksi Keukenhofin puutarha on auki vain muutaman viikon vuodessa?", a: "Keukenhof Lissessä on maailman suurin kukkapuisto, ja se avataan yleisölle vain maalis-toukokuun tulppaanikukinnan ajaksi, noin kahdeksaksi viikoksi. Puutarhassa on yli seitsemän miljoonaa sipulikasvia, jotka istutetaan joka syksy uudelleen seuraavaa kevättä varten." },
      { q: "Miksi Haagissa ei istu Alankomaiden virallista pääkaupunkia, vaikka hallitus toimii siellä?", a: "Perustuslain mukaan pääkaupunki on aina Amsterdam, vaikka hallitus, parlamentti ja kuningashuone toimivat käytännössä Haagissa. Järjestely juontuu 1800-luvun alusta, jolloin Haagista tuli hallinnon keskus ilman että pääkaupunkiasema koskaan virallisesti siirtyi sinne." },
      { q: "Miksi Rotterdamissa näkee niin paljon rohkeaa nykyarkkitehtuuria muihin hollantilaiskaupunkeihin verrattuna?", a: "Saksan pommitukset tuhosivat Rotterdamin keskustan lähes kokonaan toukokuussa 1940, joten kaupunki jouduttiin rakentamaan uudelleen tyhjästä. Vanhojen kanavatalojen sijaan syntyi tilaa kokeiluille, kuten Piet Blomin 1984 valmistuneille kuutiotaloille ja 2014 avatulle Markthallille." },
    ],
    Flevoland: [
      { q: "Mikä 1600-luvun kauppalaiva rakennettiin uudelleen keskelle nykyistä kuivaa maata?", a: "Lelystadissa rakennettiin vuosina 1985–1995 täysimittainen kopio VOC-kauppalaiva Bataviasta, käyttäen mahdollisimman tarkasti aikakauden työkaluja ja menetelmiä. Laiva purjehti aikanaan juuri sillä merenpohjalla, joka on nyt kuivaa Flevolandin peltomaata." },
      { q: "Mikä maailmanlaajuinen puutarhanäyttely järjestettiin Almeressa?", a: "Floriade-maailmannäyttely, jota Alankomaat isännöi noin kerran vuosikymmenessä, pidettiin Almeressa vuonna 2022. Näyttelyalueesta on tarkoitus kasvaa pysyvästi uusi asuinalue, jossa puutarhat ja rakennukset elävät rinnakkain vielä vuosikymmenten päästä." },
    ],
    Friesland: [
      { q: "Miksi Leeuwarden oli erityisen ylpeä vuonna 2018?", a: "Leeuwarden toimi Euroopan kulttuuripääkaupunkina vuonna 2018, ensimmäisenä friisiläisenä kaupunkina koskaan. Vuoden aikana kaupunki ja koko maakunta täyttyivät sadoista tapahtumista, jotka nostivat esiin nimenomaan friisin kieltä ja paikallista kulttuuria." },
      { q: "Miksi Leeuwardenin vanha kirkontorni kallistuu pahasti?", a: "Oldehove-torni alkoi painua vinoon jo rakennusaikana 1500-luvulla, kun se rakennettiin liian raskaaksi pehmeälle savimaalle. Rakentaminen keskeytettiin kesken, joten torni jäi vajaaksi ja vinoksi eikä sitä koskaan täydennetty alun perin suunnitellulla huipulla." },
      { q: "Mikä friisiläinen laji tarkoittaa kanavan yli hyppäämistä pitkän sauvan varassa?", a: "Fierljeppen on perinteinen laji, jossa kilpailija juoksee vauhtia, tarttuu pitkään alumiinisauvaan ja kiipeää sitä pitkin ylös hypätessään kanavan yli. Nykyaikaiset ennätykset ylittävät jo 22 metriä, ja lajia harrastetaan kesäisin yhä kilpailuissa ympäri maakuntaa." },
    ],
    Gelderland: [
      { q: "Miksi Arnhemin siltaa kutsutaan sillaksi liian kauas?", a: "Syyskuussa 1944 liittoutuneiden Market Garden -operaatio yritti vallata Rein-joen sillan Arnhemissa, mutta laskuvarjojoukot jäivät saarroksiin eivätkä maavoimat ehtineet apuun ajoissa. Silta nimettiin myöhemmin John Frost -sillaksi, ja se seisoo yhä samalla paikalla keskellä kaupunkia." },
      { q: "Mitä eläintä Hoge Veluwen kansallispuistossa saattaa yllättäen kohdata pyörätiellä?", a: "Puistossa elää vapaana muun muassa punahirviä, kauriita ja villisikoja, ja ne liikkuvat usein aivan pyöräteiden tuntumassa. Alue aidattiin riista-aidalla jo 1900-luvun alussa yksityiseksi metsästysmaaksi, ennen kuin siitä tehtiin kansallispuisto vuonna 1935." },
      { q: "Mikä kävelytapahtuma kokoaa Nijmegeniin joka heinäkuu kymmeniä tuhansia kävelijöitä?", a: "Nijmegenin nelipäivämarssit on järjestetty vuodesta 1909, ja se on maailman suurin usean päivän kävelytapahtuma. Osallistujat kävelevät 30–50 kilometriä päivässä neljänä peräkkäisenä päivänä, ja koko kaupunki juhlii heitä iltaisin katukarnevaalin tapaan." },
    ],
    Groningen: [
      { q: "Miksi Groningenin keskustassa näkee tuskin autoja?", a: "Kaupunki jaettiin vuonna 1977 neljään lohkoon, joiden välillä autolla ei pääse suoraan ajamaan keskustan läpi vaan on kierrettävä kehätietä pitkin. Suunnitelma teki pyörästä käytännössä nopeimman kulkuvälineen, ja nykyään yli puolet kaupungin sisäisistä matkoista tehdään polkupyörällä." },
      { q: "Mistä Groningenin lempinimi Martinistad tulee?", a: "Kaupungin maamerkki, 97-metrinen Martinitoren, on kohonnut Martinikerkin kupeessa jo 1400-luvulta lähtien. Tornin huipulle pääsee yhä kiipeämään satoja portaita, ja sieltä avautuu näkymä yli koko tasaisen maakunnan aina rannikolle asti." },
      { q: "Mitä maanjäristysten jäljille tehdään Groningenissa nykyään?", a: "Vaikka kaasuntuotanto loppui vuonna 2023, vanhoja tiilitaloja vahvistetaan yhä tuhansittain järistysten varalta, ja monelle asukkaalle on maksettu korvauksia halkeilleista seinistä. Työ jatkuu koko 2020-luvun, sillä maaperä voi järistä vielä vuosia tuotannon loppumisen jälkeenkin." },
    ],
    Limburg: [
      { q: "Mitä Pietersbergin kalkkikivivuoren sisällä on?", a: "Vuosisatojen kivilouhinta on kaivertanut Sint Pietersbergin sisään yli 20 000 käytävän labyrintin, jota kutsutaan joskus Alankomaiden ainoaksi vuoreksi. Toisen maailmansodan aikana käytäviin piilotettiin muun muassa Rembrandtin Yövartio pommituksilta, ja nykyään niissä käy oppaan johdolla turisteja ympäri vuoden." },
      { q: "Miksi Maastrichtin karnevaali eroaa muun Alankomaiden juhlinnasta?", a: "Limburg kuuluu, toisin kuin suuri osa maasta, katolisen Etelä-Euroopan kulttuuripiiriin, ja siellä karnevaalia vietetään yhtä äänekkäästi kuin Reininmaalla Saksassa. Maastrichtin kaduilla kolme päivää kestävä juhla pysäyttää käytännössä koko kaupungin joka helmikuu." },
      { q: "Miksi Valkenburgissa on Alankomaiden ainoa oikea linnanraunio kukkulalla?", a: "Koska Limburgin eteläosassa maasto todella kohoaa mäkiseksi, keskiajan ritarit saattoivat rakentaa linnansa kalkkikivikukkulan huipulle aivan kuten muualla Euroopassa. Muualla tasaisessa Alankomaissa linnat jouduttiin puolustamaan vesillä ja vallihaudoilla, koska kukkuloita ei yksinkertaisesti ollut." },
    ],
    Overijssel: [
      { q: "Mistä Giethoorn sai kummallisen nimensä?", a: "Perimätiedon mukaan nimi juontaa 1170-luvun suurtulvasta, jonka jäljiltä maasta löytyi paljon vuohensarvia hukkuneilta eläimiltä – siitä geytenhorn, vuohensarvi, joka vähitellen muuntui Giethoorniksi. Nykyään kylässä liikutaan usein äänettömillä sähköveneillä, jotta kanavien rauha säilyy turistivilskeestä huolimatta." },
      { q: "Mikä teki Deventeristä keskiajalla yllättävän tärkeän kaupungin?", a: "Deventer oli 1400-luvulla yksi Pohjois-Euroopan merkittävistä kirjapainokaupungeista ja Hansaliiton solmukohta IJssel-joen varrella. Vanha kauppiastalojen kaupunginosa on säilynyt lähes ennallaan, ja kaupungissa järjestetään yhä syksyisin yksi maan suurimmista kirjamarkkinoista." },
    ],
    "Noord-Brabant": [
      { q: "Mistä Alankomaiden ainoa virallinen trappistiolut tulee?", a: "Koningshoevenin trappistiluostari lähellä Tilburgia on Alankomaiden ainoa luostari, joka saa kutsua oluttaan aidoksi trappistioluksi – koko maailmassa niitä valmistetaan vain reilussa kymmenessä luostarissa. Munkit ovat panneet olutta La Trappe -nimellä jo 1880-luvulta lähtien, ja tuotto ylläpitää yhä luostaria." },
      { q: "Kuka kuuluisa maalari syntyi 's-Hertogenboschissa?", a: "Hieronymus Bosch, tunnettu oudoista ja painajaismaisista maalauksistaan kuten Maallisten ilojen puutarha, syntyi kaupungissa noin 1450 ja eli siellä suurimman osan elämäänsä. Kaupunki juhli hänen 500. kuolinvuottaan suurnäyttelyllä 2016, ja hänen nimeään kantava taidekeskus toimii siellä yhä." },
    ],
    "Noord-Holland": [
      { q: "Miksi Zaanstreekin tuulimyllyt eivät pumpanneet pelkkää vettä?", a: "1600-luvun Zaanstreekissa satoja tuulimyllyjä käytettiin sahaamiseen, öljyn puristukseen, väriaineiden jauhamiseen ja paperin valmistukseen – aluetta pidetään maailman ensimmäisenä tuulivoimalla teollistuneena seutuna. Nykyään Zaanse Schansin kylässä pyörii yhä muutama toimiva mylly matkailijoiden ihasteltavaksi." },
      { q: "Miksi Texelillä laiduntaa lampaita niin paljon?", a: "Saari on Länsi-Friisian saarista suurin ja tunnetaan omasta lammasrodustaan, texelinlampaasta, jonka villaa ja lihaa on jalostettu saarella vuosisatoja. Saaren dyynit ja hiekkarannat ovat samalla tärkeä pesimäalue kymmenille lintulajeille, joten lampaat ja linnut jakavat saman maiseman." },
      { q: "Mikä maailman suurin meripatosulku avattiin äskettäin Noord-Hollannissa?", a: "IJmuidenin uusi merisulku valmistui vuonna 2022, ja se on maailman suurin meriveden sulku, 500 metriä pitkä ja 70 metriä leveä. Se korvasi vuonna 1929 valmistuneen vanhan sulun ja päästää entistä suurempia laivoja Amsterdamin satamaan." },
    ],
    Saba: [
      { q: "Kuka rakensi Saban tien, jota insinöörit sanoivat mahdottomaksi?", a: "Hollantilaiset ja sveitsiläiset insinöörit totesivat 1900-luvun alussa, ettei jyrkkään tulivuoreen voi rakentaa autotietä. Paikallinen mies Josephus Lambert Hassell opetteli tierakennusta kirjekurssilla ja johti työn, joka valmistui 1958 – tietä kutsutaan yhä nimellä tie, jota ei voitu rakentaa." },
      { q: "Miten Saballe pääsee, jos ei lennä saaren lyhyelle kiitoradalle?", a: "Vaihtoehto on saapua laivalla tai kalastajaveneellä Fort Bayn pieneen satamaan, joka on saaren ainoa kunnollinen laituri. Moni matkustaja valitsee silti lentokoneen, sillä meri voi olla saaren jyrkkien rantojen edustalla hyvin levoton, eikä laivayhteys kulje joka päivä." },
    ],
    "St. Eustatius": [
      { q: "Mikä yhteisö kukoisti St. Eustatiuksella 1700-luvun kauppavuosina?", a: "Saarella toimi kukoistava juutalaisyhteisö, joka rakensi Honen Dalim -synagogan 1739 – yksi läntisen pallonpuoliskon vanhimmista synagogarakennuksista. Kauppakaupungin kulta-ajan loputtua yhteisö hajosi, ja synagogan rauniot seisovat yhä keskellä nykyistä Oranjestadia." },
      { q: "Mitä St. Eustatiuksen taloudessa tapahtuu nykyään?", a: "Vapaasataman kulta-aika on kaukainen muisto, ja nykyään saaren tärkein tulonlähde on rannikon öljyn varastointi- ja siirtoterminaali. Rinnalle on hitaasti kasvanut ekomatkailu, sillä sammuneen tulivuoren De Quillin sademetsä ja koskemattomat sukelluspaikat houkuttelevat yhä enemmän kävijöitä." },
    ],
    Utrecht: [
      { q: "Missä sijaitsee maailman suurin pyörien pysäköintitalo?", a: "Utrecht Centraalin vieressä avattiin 2019 kolmikerroksinen pyöräparkki, johon mahtuu yli 12 500 polkupyörää – se on maailman suurin. Se kertoo, kuinka keskeinen osa pyöräily on nykyisin Utrechtin arkea, ei vain matkailijoiden ihmettelemä erikoisuus." },
      { q: "Mikä on Utrechtin kaksitasoinen katujärjestelmä?", a: "Vanhan kaupungin kanavien varsilla kulkee kaksi tasoa: yläkatu ihmisille ja alempi taso, werf, aivan vedenpinnan tasolla – keskiaikaiset kellarit toimivat aikanaan varastoina ja nykyään usein kahviloina ja ravintoloina. Järjestelmä on ainutlaatuinen koko Alankomaissa." },
    ],
    Zeeland: [
      { q: "Miksi Oosterscheldekering ei ole kiinteä pato vaan liikkuvien porttien sarja?", a: "Insinöörit halusivat alun perin sulkea lahden kokonaan tulvien varalta, mutta simpukan- ja osterinviljelijät sekä ympäristönsuojelijat vastustivat, koska suolainen merivesi piti säilyttää. Ratkaisuksi rakennettiin 1986 valmistunut 9 kilometrin sulkuporttien sarja, joka pidetään auki ja suljetaan vain myrskyn uhatessa." },
      { q: "Miksi osa Zeelandin asukkaista muistaa vuoden 1953 tulvan yhä hyvin tarkasti?", a: "Yön aikana 31. tammikuuta ja 1. helmikuuta 1953 myrskyvuoksi mursi patoja yllättäen pimeässä, eikä tuolloin ollut puhelimia tai sähköä varoittamaan monia kyliä. Selviytyjien tarinoita on tallennettu muun muassa Watersnoodmuseumiin, joka rakennettiin osittain samoihin betonikaisloihin, jotka lopulta pysäyttivät tulvan." },
    ],
  },
  /*
   * CHE (Sisältökirjuri 27.9.2026, maakunta-erä 3). Faktat eri kulmasta
   * kuin js/packs/maakunnat-luonnehdinnat.js:n CHE-pitka-tekstit — ei
   * toisteta samoja tarinoita. Lähteet: en-Wikipedia + WebSearch
   * tarkistettu 27.9.2026 (mm. weforum.org, iwc.com, victorinox.com,
   * artbasel.com, whc.unesco.org, admin.ch, swissinfo.ch).
   */
  CHE: {
    Aargau: [
      { q: "Miksi Aarau oli hetken koko Sveitsin pääkaupunki?", a: "Vuonna 1798 perustettu Helvetian tasavalta julisti Aaraun ensimmäiseksi pääkaupungikseen, ja kansalliskokous kokoontui kaupungintalolla huhtikuussa. Ilo jäi lyhyeksi: jo syyskuussa pääkaupunki siirrettiin Luzerniin, joten Aarau ehti olla koko maan keskus vain muutaman kuukauden." },
      { q: "Mitä Villigenissä tutkitaan nykyään?", a: "Aaren rannalla sijaitseva Paul Scherrer -instituutti on Sveitsin suurin luonnontieteiden ja tekniikan tutkimuslaitos, jossa työskentelee yli 2300 ihmistä. Siellä tutkitaan hiukkasfysiikkaa, materiaaleja, energiaa ja terveyttä suurten hiukkaskiihdyttimien avulla." },
    ],
    "Appenzell Ausserrhoden": [
      { q: "Milloin Ausserrhoden antoi naisille äänioikeuden?", a: "Ausserrhoden hyväksyi naisten äänioikeuden kantonin asioissa omalla äänestyksellään jo 1989, kaksi vuotta ennen kuin naapurikantoni Innerrhoden pakotettiin siihen liittovaltion tuomioistuimen päätöksellä. Ausserrhoden oli siis huomattavasti nopeampi." },
      { q: "Mikä on Appenzellerin juuston salaisuus?", a: "Juuston kuorta hierotaan kypsytyksen aikana mausteliemellä, jossa on yli 25 yrttiä, juurta ja maustetta liuotettuna alkoholiin. Tarkka resepti on lukkojen takana, ja sen tuntee koko maailmassa vain kaksi ihmistä." },
    ],
    "Appenzell Innerrhoden": [
      { q: "Missä Sveitsin ainoa pyörivä ravintola sijaitsee?", a: "Hoher Kastenin huipulla, 1795 metrin korkeudessa, ravintolan lattia pyörähtää kokonaan ympäri kerran tunnissa, ja näkymä avautuu Alpsteinilta aina Bodenjärvelle asti. Köysirata vie sinne Brülisausta alle kymmenessä minuutissa." },
      { q: "Kuinka pieni Innerrhoden oikein on?", a: "Innerrhoden on Sveitsin väkiluvultaan pienin kantoni, ja koko sen asukasmäärä mahtuisi moneen kertaan yhteen suurkaupungin kaupunginosaan. Silti sillä on oma hallitus, oma Landsgemeinde ja täysi äänivalta liittovaltiossa siinä missä isommillakin kantoneilla." },
    ],
    "Basel-Landschaft": [
      { q: "Miksi Baselbieteria kutsutaan kirsikkamaaksi?", a: "Kantonin lempeät rinteet ovat täynnä kirsikkapuita, ja monissa kylissä juhlitaan yhä syksyisin Chriesitagia, kirsikkapäivää. Osa sadosta tislataan kirsikkaviinaksi, jota kutsutaan kirschiksi, ja sitä poltetaan yhä pienillä maatiloilla." },
      { q: "Kuinka moni Baselbieteri käy nykyään töissä Baselissa?", a: "Vaikka kantonit erosivat toisistaan jo 1833, arki on yhä tiiviisti kietoutunut yhteen: kymmenettuhannet Baselbieterit matkustavat päivittäin junalla tai autolla naapurikaupunkiin töihin, moni lääketeollisuuden pariin." },
    ],
    "Basel-Stadt": [
      { q: "Miksi Art Basel on niin merkittävä tapahtuma?", a: "Kolme baselilaista galleristia perusti messun 1970, ja siitä kasvoi nykyaikaisen taiteen maailman tärkein messu – ensimmäisenä vuonna paikalla oli jo 90 galleriaa kymmenestä maasta. Nykyään Art Basel järjestää sisarmessuja myös Miamissa, Hongkongissa ja Pariisissa." },
      { q: "Mikä on Sveitsin korkein rakennus?", a: "Lääkeyhtiö Rochen 205-metrinen torni Baselissa valmistui 2022 ja on nykyään koko maan korkein rakennus, jossa työskentelee noin 3200 ihmistä. Se seisoo aivan Reinin rannalla, kaupungin lääketeollisuuden ytimessä." },
    ],
    Bern: [
      { q: "Miksi Bernin vaakunaeläin on karhu?", a: "Tarun mukaan kaupungin perustaja herttua Berthold V lupasi nimetä kaupungin ensimmäisen metsästämänsä eläimen mukaan 1191, ja se osui olemaan karhu. Kaupungin laidalla asuu nykyään eläville karhuille rakennettu puisto, jossa niitä pääsee katsomaan ilmaiseksi." },
      { q: "Mitä Zytglogge-kellotorni näyttää joka tunti?", a: "Keskiaikainen astronominen kello käynnistää joka tunti pienen mekaanisen näytöksen: kukko kiekaisee, karhut marssivat ja hovinarri soittaa kelloja. Näytelmä on toistunut samalla koneistolla vuosisatoja, ja turistiryhmät pysähtyvät yhä katsomaan sitä joka tunti." },
    ],
    Fribourg: [
      { q: "Miksi Gruyère-juusto on niin arvostettua?", a: "Gruyères-kylän ympäristössä juustoa on valmistettu samalla reseptillä satoja vuosia, ja nimi sai suojatun alkuperämerkinnän 2001. Juustoloissa käy nykyään paljon matkailijoita katsomassa, miten valtavat 35-kiloiset kiekot kypsyvät kellareissa." },
      { q: "Mistä Sveitsin vanhin yhä toimiva suklaatehdas löytyy?", a: "Brocin kylässä toimiva Maison Cailler on Sveitsin vanhin yhä toimiva suklaatehdas, perustettu 1898 – merkki itse syntyi jo 1819 Vevey'ssä. Nykyään tehdas on suosittu vierailukohde, jossa pääsee haistelemaan kaakaopapuja ja maistelemaan tuoretta suklaata." },
    ],
    "Genève": [
      { q: "Kuinka korkealle Geneven suihkulähde Jet d'Eau nousee?", a: "Järven rannalla sykkivä vesisuihku ampuu vettä jopa 140 metrin korkeuteen, ja se näkyy koko kaupunkiin ja usein myös lentokoneen ikkunasta. Suihkusta on tullut Geneven tunnusmerkki, vaikka se syntyi alun perin vahingossa 1880-luvulla tehtaan paineen purkamiseksi." },
      { q: "Miksi Geneve on yhä kelloteollisuuden keskus?", a: "Kaupunkiin pakeni 1500-luvulla protestanttisia kultaseppiä, joille kirkko kielsi korujen tekemisen, ja he siirtyivät kellonvalmistukseen. Perinne elää yhä: monet maailman arvostetuimmista kellomerkeistä pitävät päämajaansa Genevessä tänäkin päivänä." },
    ],
    Glarus: [
      { q: "Mikä on Schabziger, ja miksi se on vihreä?", a: "Glarusin oma juusto Schabziger saa vihreän värinsä mausteapila-nimisestä yrtistä, jota on lisätty juustoon jo vuosisatoja. Se on yksi Sveitsin vanhimmista tavaramerkeistä, ja sitä raastetaan yhä perunoiden ja pastan päälle." },
      { q: "Miksi Wisconsinissa on kylä nimeltä New Glarus?", a: "Glarusin kantoni oli 1840-luvulla niin köyhä, että se rahoitti 131 asukkaan siirtolaisryhmän matkan Amerikkaan 1845. He perustivat New Glarusin, joka mainostaa yhä itseään 'pieneksi Sveitsiksi' ja juhlii sveitsiläistä perintöään juustoineen ja festivaaleineen." },
    ],
    "Graubünden": [
      { q: "Miksi maailman talousjohtajat kokoontuvat juuri Davosiin?", a: "Saksalainen taloustieteilijä Klaus Schwab perusti Maailman talousfoorumin 1971 ja järjesti ensimmäisen kokouksen Davosin kongressikeskuksessa. Tammikuinen huippukokous on siitä lähtien tuonut lumiseen vuoristokaupunkiin vuosittain satoja johtajia ja päättäjiä ympäri maailmaa." },
      { q: "Miksi Berninan rautatie on Unescon listalla?", a: "Albulan ja Berninan rataosuudet, jotka valmistuivat 1900-luvun alussa, ylittävät Alpit satojen siltojen ja tunnelien kautta ilman hammasratasta. Unesco lisäsi radan maailmanperintöön 2008 poikkeuksellisen rohkean vuoristoinsinööritaidon vuoksi." },
    ],
    Jura: [
      { q: "Miksi osa vanhaa Juraa jäi lopulta Berniin?", a: "Kesäkuussa 1974 koko vanha Jura äänesti erosta Bernistä, mutta eteläiset ranskankieliset alueet halusivat pysyä Bernissä ja saivat äänestää siitä erikseen. Bernin Jura jäi näin Bernin kantoniin, ja raja, joka siitä syntyi, näkyy kartalla yhä tänäkin päivänä." },
      { q: "Mikä on Marché-Concours Saignelégier'ssä?", a: "Joka elokuu tuhannet ihmiset kokoontuvat Saignelégier'hen katsomaan Franches-Montagnes-hevosia esittelyssä ja kilpailuissa – perinne on jatkunut vuodesta 1897. Se on nykyään yksi Sveitsin suurimmista hevostapahtumista, täynnä paraateja ja karkeloita." },
    ],
    Lucerne: [
      { q: "Mikä on Luzernin Leijonapatsas?", a: "Kallioon veistetty kuoleva leijona muistaa 1792 Pariisissa kuolleita sveitsiläisiä palkkasotilaita, jotka puolustivat Ranskan kuningasta vallankumouksen aikana. Kirjailija Mark Twain kutsui sitä maailman surullisimmaksi ja koskettavimmaksi kiveksi, ja se vetää yhä matkailijoita." },
      { q: "Voiko Luzernin järvellä yhä risteillä höyrylaivalla?", a: "Kyllä – Vierwaldstättersee'llä liikennöi useita 1900-luvun alun höyrylaivoja, jotka on huolellisesti kunnostettu ja pidetään käynnissä museolaivoina. Matkustajat pääsevät katsomaan alkuperäisiä höyrykoneita samalla kun laiva kiertää vuoristomaisemissa." },
    ],
    "Neuchâtel": [
      { q: "Miksi kaksi kaupunkia rakennettiin kellotehtaita varten?", a: "La Chaux-de-Fonds ja Le Locle rakennettiin 1800-luvun alussa suoriksi ruutukaavan kaduiksi, joissa asunnot ja kellopajat vuorottelevat samassa rakennuksessa. Unesco liitti kaupunkiparin maailmanperintöön 2009 ainutlaatuisena esimerkkinä yhden teollisuuden ympärille suunnitellusta kaupungista." },
      { q: "Mitä Neuchâtelin vaaleanpunainen viini on?", a: "Oeil-de-Perdrix, 'peltopyyn silmä', on kantonin oma vaalea rosee, joka puristetaan Pinot Noir -rypäleistä hyvin lyhyellä kuoriutumisajalla. Se on säilynyt suosittuna paikallisena erikoisuutena, vaikka moni muu alue tekee nykyään samantyylistä viiniä." },
    ],
    Nidwalden: [
      { q: "Mitä Bürgenstockilla tapahtui kesällä 2024?", a: "Ylellinen Bürgenstockin hotelli vuoren laella isännöi kesäkuussa 2024 kansainvälistä Ukrainan rauhankokousta, johon osallistui edustajia yli 90 maasta. Vuosikymmenten ajan julkkiksia, kuten Audrey Hepburnia, majoittanut hotelli nousi hetkeksi maailmanpolitiikan keskiöön." },
      { q: "Miksi Nidwalden houkuttelee nykyään niin paljon yrityksiä?", a: "Pieni kantoni kilpailee Zugin tapaan alhaisilla veroprosenteilla, ja monet kansainväliset yhtiöt ovat siirtäneet päätoimipaikkansa sinne. Samaan aikaan Stanserhornin avokattoinen köysirata houkuttelee ihan toisenlaisia vierailijoita – matkailijoita, ei veroneuvojia." },
    ],
    Obwalden: [
      { q: "Miksi Obwaldenin verotus kohautti 2006?", a: "Kantoni otti käyttöön verojärjestelmän, jossa suurituloiset maksoivat suhteessa vähemmän kuin pienituloiset, houkutellakseen varakkaita muuttajia. Liittovaltion tuomioistuin kumosi mallin puolentoista vuoden kuluttua perustuslain vastaisena, ja tilalle tuli tasaverokanta, jonka äänestäjät hyväksyivät ylivoimaisesti." },
      { q: "Käykö Flüeli-Ranftissa yhä pyhiinvaeltajia?", a: "Kyllä – Sveitsin suojeluspyhimyksen Niklaus von Flüen erakkomaja on säilynyt Ranftin rotkossa, ja paikalla käy edelleen tuhansia pyhiinvaeltajia ja matkailijoita vuosittain. Hän vetäytyi sinne 1467 jättäen perheensä, ja tarina kiehtoo yhä sveitsiläisiä." },
    ],
    Schaffhausen: [
      { q: "Mikä maailmankuulu kellomerkki syntyi Schaffhausenissa?", a: "Amerikkalainen kelloseppä Florentine Ariosto Jones perusti IWC:n kaupunkiin 1868 yhdistääkseen amerikkalaisen sarjatuotannon sveitsiläiseen käsityöhön, ja Reinin vesivoima pyöritti tehtaan koneita. Merkki tekee yhä lentäjänkelloja samassa kaupungissa." },
      { q: "Kuka soittaa Munotin linnoituksen kelloa joka ilta?", a: "Munotin vartija asuu yhä linnoituksen tornissa ja soittaa käsin kelloa joka ilta kello yhdeksältä, aivan kuten vuodesta 1589 lähtien. Perinteen mukaan soitto muistuttaa kaupunkilaisesta, joka hukkui myrskyssä ristiretkeltä palatessaan." },
    ],
    Schwyz: [
      { q: "Mistä linkkuveitsi Victorinox on kotoisin?", a: "Kelloseppä Karl Elsener perusti pienen veistämön Ibachin kylään 1884, ja nimi Victorinox syntyi hänen äitinsä Victorian ja ruostumattoman teräksen sanan inox yhdistelmästä. Yhtiö on valmistanut jo yli 500 miljoonaa sveitsiläistä linkkuveistä ja toimii yhä samassa kylässä." },
      { q: "Miksi Einsiedelniin virtaa niin paljon pyhiinvaeltajia?", a: "Einsiedelnin luostarikirkossa säilytetään mustaa Madonna-patsasta, jonka ympärille pyhiinvaellusperinne on kasvanut jo keskiajalta lähtien. Kirkolla käy nykyään satoja tuhansia kävijöitä vuosittain, osa heistä yhä perinteisiä pyhiinvaellusreittejä kävellen." },
    ],
    Solothurn: [
      { q: "Mikä on Solothurnin elokuvajuhla?", a: "Solothurnin Filmtage on järjestetty vuodesta 1966, ja tammikuisin kaupunki täyttyy sveitsiläisen elokuvan tekijöistä ja yleisöstä – vuosittain paikalla on yli 60 000 kävijää. Se on maan tärkein näyteikkuna kotimaiselle elokuvalle." },
      { q: "Keitä olivat Solothurnin suojeluspyhimykset?", a: "Legendan mukaan roomalaiset legioonalaiset Urs ja Viktor teloitettiin Solothurnissa 200-luvun lopulla, koska he kieltäytyivät luopumasta kristillisestä uskostaan. Kaupungin päätuomiokirkko on nimetty heidän mukaansa, ja tarina elää yhä kaupungin nimissä ja vaakunassa." },
    ],
    "Sankt Gallen": [
      { q: "Mikä on Olma, ja miksi se on niin suosittu?", a: "Olma-messu on järjestetty vuodesta 1943, ja lokakuussa se täyttää St. Gallenin maatalouden, ruoan ja perinteiden juhlalla – suosituin yleisötapahtuma koko Sveitsissä. Yksi katsotuimmista ohjelmanumeroista on vuodesta 1997 järjestetty possujen juoksukilpailu." },
      { q: "Miksi St. Gallenin yliopisto on niin arvostettu?", a: "HSG-yliopisto on Euroopan johtavia kauppakorkeakouluja, ja sen tutkintopaikoista kilpaillaan kovasti ympäri maailmaa. Kaupungin vanha tekstiiliteollisuuden osaaminen ja kansainvälinen kauppahenki elävät nykyään yliopiston kautta uudessa muodossa." },
    ],
    Thurgau: [
      { q: "Miksi Thurgauta kutsutaan siiderin Intiaksi?", a: "Kantonin lempinimi 'Mostindien' viittaa sen valtaviin omena- ja päärynätarhoihin, joiden sato puristetaan syksyisin siideriksi. Peltojen ja järven väliin jäävät kylät elävät yhä hedelmänviljelystä samaan tapaan kuin sata vuotta sitten." },
      { q: "Mikä on Kartause Ittingen nykyään?", a: "Entinen kartusiaaniluostari Warthin kylän liepeillä toimii nykyään kulttuurikeskuksena, jossa on taidemuseo, hotelli ja yhä toimiva maatila viinitarhoineen. Munkkien vaikenemisen sijaan pihalla kuuluu nykyään konserttien ja näyttelyjen ääntä." },
    ],
    Ticino: [
      { q: "Miksi Locarnon elokuvajuhlat kokoontuvat torille?", a: "Locarnon festivaali on järjestetty vuodesta 1946, ja sen suurin näyttämö on Piazza Grande, jonne mahtuu iltaisin kahdeksantuhatta katsojaa avotaivaan alle. Torinäytännöt tulivat mukaan ohjelmaan 1971, ja niistä tuli nopeasti festivaalin tunnusmerkki." },
      { q: "Mikä on grotto, jossa Ticinossa käydään syömässä?", a: "Grotto on perinteinen, usein kallioon tai metsän siimekseen rakennettu ravintola, jossa tarjoillaan paikallista polentaa, kastanjoita ja salamia kivipöydillä. Monet grotot ovat toimineet samoissa paikoissa sukupolvien ajan, ja ne ovat yhä suosittuja kesäisin." },
    ],
    Uri: [
      { q: "Näytelläänkö Wilhelm Telliä yhä Altdorfissa?", a: "Kyllä – Tellspiele-näytelmäseura on esittänyt Schillerin näytelmää Wilhelm Tellistä Altdorfissa vuodesta 1899, yleensä muutaman vuoden välein. Se on yksi Sveitsin vanhimmista harrastajateattereista, ja Tellin patsas seisoo yhä kaupungin torilla." },
      { q: "Miksi vanhan Gotthard-tunnelin rakentaminen vei niin monta henkeä?", a: "Työ alkoi Urin puolella Göschenenissä 1872, ja louhijat kärsivät malariasta, pölykeuhkosta ja onnettomuuksista vuoristoisissa oloissa. Satoja työmiehiä kuoli ennen kuin tunneli lopulta murtui läpi 1880, kaksi vuotta ennen junaliikenteen alkua." },
    ],
    Valais: [
      { q: "Mikä on bisse eli suoni?", a: "Bisset ovat 1200-luvulta lähtien rakennettuja avokanavia, jotka johtavat sulavesiä vuorenrinteitä pitkin kuiviin laaksoihin viinitarhoja ja niittyjä varten. Osa niistä on yhä käytössä kastelussa, ja niiden vierellä kulkevat polut ovat nykyään suosittuja vaellusreittejä." },
      { q: "Mistä Mundin kylän kallis mauste tulee?", a: "Mund on Sveitsin ainoa paikka, jossa kasvatetaan sahramia, ja perinne juontaa 1300-luvulle. Kukat poimitaan käsin loka-marraskuussa, ja koko kylän vuotuinen sato on vain muutaman kilon luokkaa." },
    ],
    Vaud: [
      { q: "Miksi Montreux'n rannalla seisoo patsas Freddie Mercurysta?", a: "Montreux'n jazzfestivaali on järjestetty vuodesta 1967, ja Queen-yhtye rakastui kaupunkiin niin paljon, että se perusti sinne oman äänitysstudionsa. Laulaja Freddie Mercuryn muistopatsas seisoo yhä järven rannalla, ja fanit kokoontuvat sinne edelleen." },
      { q: "Missä Charlie Chaplin vietti elämänsä viimeiset vuodet?", a: "Chaplin muutti perheineen Corsier-sur-Vevey'hin 1953 ja asui siellä Manoir de Ban -kartanossa kuolemaansa 1977 asti. Talo on nykyään Chaplin's World -museo, jossa vahanuket ja hänen oma studionsa esittelevät hänen elämäänsä." },
    ],
    Zug: [
      { q: "Mikä sveitsiläinen kakku on nimetty Zugin mukaan?", a: "Zuger Kirschtorte on mantelipohjainen, kirsikkaviinalla maustettu kerroskakku, joka syntyi kaupungissa 1915 ja on nykyään suojattu alkuperämerkintä. Se on yhä yksi Sveitsin tunnetuimmista leivonnaisista, ja kirsikkapuita kasvaa kantonissa runsaasti." },
      { q: "Miksi maailman suurimmat raaka-ainekauppiaat pitävät toimistoaan Zugissa?", a: "Pieni Zug on yksi maailman johtavista raaka-ainekaupan keskuksista, ja esimerkiksi jättiläisyhtiö Glencore on pitänyt päämajaansa kantonissa yli viisikymmentä vuotta. Alhaiset verot ja keskeinen sijainti ovat houkutelleet satoja kaupankäyntiyhtiöitä pieneen kaupunkiin." },
    ],
    "Zürich": [
      { q: "Mikä on Street Parade?", a: "Matematiikan opiskelija Marek Krynski perusti kulkueen 1992 parintuhannen ihmisen tapahtumana, ja nykyään elokuinen Street Parade kerää sadattuhannet tanssijat Zürichin kaduille – yksi maailman suurimmista technojuhlista. Kaupunki muuttuu yhdeksi valtavaksi ulkoilmabileeksi." },
      { q: "Miksi jalkapallon maailmanjärjestö FIFA pitää päämajaansa Zürichissä?", a: "FIFA perustettiin Pariisissa 1904, mutta se siirsi päämajansa Zürichiin jo 1930-luvulla, ja siellä se toimii yhä. Kaupungin vakaa pankki- ja liike-elämä sekä keskeinen sijainti Euroopassa ovat pitäneet monet kansainväliset järjestöt siellä vuosikymmenten ajan." },
    ],
  },
  CZE: {
    'Jihočeský': [
      { q: "Miksi jouluna syödään juuri tästä alueesta tuotua karppia?", a: "Etelä-Böömin satojen lampien verkosto, joista suurin on 1500-luvulla kaivettu Rožmberkin lampi, on ollut vuosisatoja maan tärkein karpinkasvatusalue. Nykyään alue tuottaa valtaosan tšekkiläisten jouluateriaan päätyvistä karpeista." },
      { q: "Mistä nimi 'Budweiser' oikeasti tulee?", a: "České Budějovicen saksankielinen nimi oli Budweis, ja kaupungille myönnettiin panimo-oikeudet jo 1265. Nimi levisi maailmalle oluen mukana, ja siitä riideltiin vuosikymmeniä amerikkalaisen Budweiser-panimon kanssa." },
    ],
    'Jihomoravský': [
      { q: "Miksi Brnon Orloj-veistos pudottaa marmorikuulan puolelta päivin?", a: "Kuulaa pudottava mustan graniitin torni rakennettiin 2010 muistoksi siitä, kun Brno onnistui 1645 puolustautumaan ruotsalaisia vastaan – kaupunkitarinan mukaan kello ehti lyödä keskipäivää vasta yhdeltätoista, mikä huijasi hyökkääjät luopumaan. Nykyinen torni toistaa tempun leikkimielisesti joka päivä." },
      { q: "Kuinka suuri Lednice-Valticen puistoalue oikein on?", a: "Liechtensteinin suvun 1700–1800-luvuilla rakentama linnojen, temppelien ja puistojen kokonaisuus kattaa lähes 200 neliökilometriä, ja se on Euroopan laajin yhtenäinen ihmisen suunnittelema maisema. Unesco lisäsi sen maailmanperintöluetteloon 1996." },
    ],
    'Karlovarský': [
      { q: "Mitä ovat kylpylävieheet, joita Karlovy Varyssa myydään jokaisella kadulla?", a: "Lázeňské oplatky -kylpylävieheet ovat ohuita, makeita vaahtokeksejä, joita on paistettu kaupungissa 1800-luvulta lähtien lähdeveden juonnin välipalaksi. Ne myydään yhä tuoreina suoraan kadun kojuista, usein vielä lämpimänä." },
      { q: "Miksi Dianan näkötornille kannattaa nousta funikkelilla?", a: "1900-luvun alussa rakennettu funikkeli vie kylpyläkaupungin yläpuolelle metsäiselle kummulle Dianan näkötornin juurelle, josta avautuu näkymä koko laaksoon ja sen kylpyläpylväikköihin. Matka funikkelilla kestää vain muutaman minuutin, mutta näkymä palkitsee." },
    ],
    'Královéhradecký': [
      { q: "Mitä Kuksin patsaat oikeastaan esittävät?", a: "Kuvanveistäjä Matyáš Bernard Braun veisti 1700-luvun alussa kivestä sarjan hyveitä ja paheita kuvaavia allegorisia hahmoja entisen kylpylän puistoon. Patsaat seisovat yhä paikoillaan ja ovat yksi Keski-Euroopan merkittävimmistä barokkiveistossarjoista." },
      { q: "Miksi Hradec Králové tunnetaan funktionalistisesta arkkitehtuurista?", a: "Arkkitehti Josef Gočár suunnitteli kaupungille 1920–30-luvuilla useita moderneja rakennuksia, ja kaupunkia on sittemmin kutsuttu 'tasavallan salongiksi' niiden ansiosta. Rakennukset ovat säilyneet ja houkuttelevat arkkitehtuurin ystäviä yhä." },
    ],
    'Liberecký': [
      { q: "Miksi Liberecin eläintarha on erityinen?", a: "Vuonna 1919 perustettu Liberecin eläintarha on Tšekin vanhin, ja se on erikoistunut muun muassa harvinaisiin kissaeläimiin. Se sijaitsee kaupungin laidalla kävelymatkan päässä keskustasta." },
      { q: "Mikä on Böömin paratiisi?", a: "Český ráj -alue rajautuu Liberecin seutuun ja on täynnä hiekkakivikallioita, kallioasutuksia ja linnanraunioita. Se oli 2005 ensimmäinen Unescon geopark-verkostoon hyväksytty alue Tšekissä." },
    ],
    'Moravskoslezský': [
      { q: "Mistä Štramberkin 'korvat' ovat saaneet nimensä?", a: "Štramberské uši on kartionmuotoinen, kanelinmakuinen piparkakkuherkku, jonka muoto muistuttaa perinteen mukaan tataarien hyökkäyksen uhrien korvia 1200-luvulta. Herkkua paistetaan pienessä Štramberkin kaupungissa yhä käsin avotulella." },
      { q: "Mikä on Colours of Ostrava?", a: "Vuodesta 2002 järjestetty Colours of Ostrava on kasvanut yhdeksi Keski-Euroopan suurimmista musiikkifestivaaleista, ja osa sen lavoista pystytetään suoraan entisen rautatehtaan teollisuusmaisemaan. Festivaali kerää vuosittain kymmeniätuhansia kävijöitä." },
    ],
    'Olomoucký': [
      { q: "Miksi Olomoucin tähtitieteellinen kello näyttää erilaiselta kuin Prahan?", a: "Toisen maailmansodan lopulla vaurioitunut kello rakennettiin 1955 uudelleen sosialistisen realismin tyyliin, ja perinteisten pyhimysten tilalle tulivat urheilijoita ja työläisiä esittävät mosaiikkihahmot. Se on Euroopan ainoa laatuaan oleva tähtitieteellinen kello." },
      { q: "Kuinka laaja Olomoucin vanhakaupunki oikein on?", a: "Olomoucin historiallinen keskusta on Prahan jälkeen maan toiseksi laajin suojeltu kaupunkialue. Torien, kirkkojen ja pylväiden tiiviys tekee siitä suositun kohteen, joka jää usein turistien reiteillä Prahan varjoon." },
    ],
    'Pardubický': [
      { q: "Mikä tekee Taxis-ojasta niin pelätyn?", a: "Velká pardubická -esteratsastuksen Taxisin oja on syvä ja leveä vesieste, jonka yli monet hevoset ja ratsastajat ovat kaataneet radan koko historian ajan aina 1874 ensimmäisestä kilpailusta lähtien. Se on tehnyt kilpailusta yhden Euroopan pelätyimmistä esteradoista." },
      { q: "Mistä Pardubicen perník-piparkakku tunnetaan?", a: "Kaupungissa on leivottu mausteista hunajaperníkkiä ainakin 1600-luvulta lähtien, ja perinne jatkuu yhä paikallisissa leipomoissa ja piparkakkumuseossa. Kanelin, neilikan ja hunajan sekoitus tekee siitä muista piparkakuista poikkeavan." },
    ],
    'Plzeňský': [
      { q: "Mikä on Techmania?", a: "Plzeňin tiedekeskus Techmania toimii osittain entisen Škoda-tehtaan hallissa, ja siellä pääsee kokeilemaan satoja fysiikan ja tähtitieteen ilmiöitä käytännössä. Se avattiin 2008 osaksi kaupungin teollista perintöä." },
      { q: "Kuinka pitkät kellarit Plzeňin oluttehtaan alla oikein kulkevat?", a: "Pilsner Urquellin panimon alla kulkee yhdeksän kilometriä historiallisia hiekkakivikäytäviä, joissa olutta kypsytettiin ennen jäähdytystekniikan keksimistä. Osa käytävistä on avoinna opastetuilla kierroksilla yhä nykyään." },
    ],
    Prague: [
      { q: "Miksi John Lennon -muuri on täynnä graffiteja Prahassa?", a: "Kommunistihallinnon aikana nuoret maalasivat Lennonin kuvia ja rauhanaiheisia tekstejä muuriin vastarinnan merkkinä, vaikka viranomaiset maalasivat sen yhä uudelleen valkoiseksi. Muuri on säilynyt suosittuna graffitikohteena vallanvaihdon jälkeenkin." },
      { q: "Miksi Prahan linna on Guinnessin ennätyskirjassa?", a: "Yli 570 metriä pitkänä kokonaisuutena Prahan linna on Guinnessin mukaan maailman suurin yhtenäinen muinainen linnoitusalue. Sen sisällä on kirkkoja, palatseja ja puutarhoja usealta eri vuosisadalta." },
    ],
    'Středočeský': [
      { q: "Mitä Karlštejnin linnassa säilytettiin keskiajalla?", a: "Keisari Kaarle IV rakennutti linnan 1348 erityisesti valtakunnan kruununjalokivien ja pyhäinjäännösten turvasäilytystä varten. Kalleuksia vartioitiin useilla peräkkäisillä lukoilla ja avainten haltijoilla." },
      { q: "Miksi Křivoklátin metsät ovat säilyneet niin koskemattomina?", a: "Alue oli vuosisatoja kuninkaiden yksityistä metsästysmaata, minkä ansiosta laajat vanhat metsät säästyivät hakkuilta. Nykyään Křivoklátsko on suojeltu Unescon biosfäärialue." },
    ],
    'Ústecký': [
      { q: "Kuinka Mostin keskiaikainen kirkko siirrettiin syrjään avolouhokselta?", a: "Vuonna 1975 koko kivikirkko nostettiin erityisille raiteille ja siirrettiin 841 metrin matka hitaasti syrjään, jotta se säästyisi laajenevalta ruskohiilikaivokselta. Siirto ylitti aikanaan maailmanennätyksen siirretyn rakennuksen painossa." },
      { q: "Mitä vanhoille avolouhoksille on tehty hiilenlouhinnan päätyttyä?", a: "Useita entisiä ruskohiilen avolouhoksia on täytetty vedellä ja muutettu virkistysjärviksi, kuten Milada-järvi lähellä Ústí nad Labemia. Uimarannat ja veneily ovat korvanneet kaivinkoneet samoilla alueilla." },
    ],
    'Vysočina': [
      { q: "Mikä on Pelhřimovin ennätysfestivaali?", a: "Pieni Pelhřimovin kaupunki on järjestänyt 1994 lähtien vuosittaisen ennätysten festivaalin, jossa yritetään rikkoa Guinnessin ja paikallisia ennätyksiä kaikesta mahdollisesta. Kaupunkia kutsutaankin leikkimielisesti ennätysten pääkaupungiksi." },
      { q: "Miksi bramborák on Vysočinan oma herkku?", a: "Karulla ylängöllä peruna on kasvanut viljaa varmemmin, ja siitä valmistettu maustettu perunaletty bramborák on alueen tunnetuin katuruoka. Sitä myydään yhä toreilla ja kahviloissa ympäri Vysočinaa." },
    ],
    'Zlínský': [
      { q: "Miksi Zlínissä järjestetään lastenelokuvafestivaalia?", a: "Zlín Film Festival on järjestetty vuodesta 1961, ja se on yksi maailman vanhimmista lasten- ja nuortenelokuville omistetuista festivaaleista. Baťan aikana kaupunkiin rakennettu elokuvastudio teki Zlínistä luonnollisen kodin tapahtumalle." },
      { q: "Mikä on Baťan kanava?", a: "Baťův kanál on 1930-luvulla rakennettu jokikanava, joka yhdisti Zlínin tehtaat Tonavan vesireitteihin raaka-aineiden kuljetusta varten. Nykyään sillä risteilevät enää huvipurjehtijat ja matkailuveneet." },
    ],
  },
  HUN: {
    "Bács-Kiskun": [
      { q: "Miksi Kecskemét tunnetaan aprikoosipaloviinasta?", a: "Kecskemét on Unkarin kuuluisin barackpálinka- eli aprikoosipaloviinakaupunki: hedelmätarhat ympäröivät kaupunkia, ja perinteinen tislaustaito on osa kaupungin identiteettiä yhä nykyäänkin." },
      { q: "Kuka kuuluisa säveltäjä syntyi Kecskemétissä?", a: "Säveltäjä ja musiikkikasvattaja Zoltán Kodály syntyi Kecskemétissä 1882, ja hänen mukaansa on nimetty maailmalla tunnettu Kodály-menetelmä, jota käytetään musiikin opetuksessa yhä ympäri maailmaa." },
    ],
    "Baranya": [
      { q: "Mistä Pécs tunnetaan keramiikkamaailmassa?", a: "Pécsissä on toiminut 1850-luvulta lähtien Zsolnay-posliinitehdas, joka kehitti kuuluisan eosin-lasitteen – metallinhohtoisen, sateenkaaren väreissä hohtavan pinnan, joka teki tehtaasta maailmankuulun 1800-luvun lopulla." },
      { q: "Mitä Zsolnay-tehtaan jäljiltä näkyy Pécsin katukuvassa yhä?", a: "Zsolnay-posliinitehtaan värikkäät keramiikkakoristeet peittävät useiden Pécsin rakennusten kattoja ja julkisivuja, ja tehtaan vanha alue toimii nykyään kulttuurikorttelina täynnä museoita ja työpajoja." },
    ],
    "Békés": [
      { q: "Mikä tekee Gyulan linnasta ainutlaatuisen Euroopassa?", a: "Gyulan linna on Keski-Euroopan ainoa säilynyt keskiaikainen tiililinna alavalla maalla: se rakennettiin 1400-luvun alussa tammipaalujen päälle suohon, ja kaksi alkuperäistä paalua on jopa säilynyt tutkijoiden nähtäväksi." },
      { q: "Miten kauan Gyulan linna oli turkkilaisten hallussa?", a: "Vuonna 1566 yhdeksän viikkoa kestäneen piirityksen jälkeen Gyulan linna joutui turkkilaisten haltuun peräti 129 vuodeksi. Nykyään sen 24 näyttelysalissa pääsee tutustumaan lähes seitsemän vuosisadan historiaan." },
    ],
    "Borsod-Abaúj-Zemplén": [
      { q: "Mikä piilee Aggtelekin maan alla?", a: "Aggtelekin Baradla-luola on osa yli 25 kilometrin pituista luolajärjestelmää, joka ulottuu Slovakian puolelle asti, ja koko alue julistettiin Unescon maailmanperintökohteeksi vuonna 1995." },
      { q: "Kuinka pitkän matkan Baradla-luolassa voi kävellä?", a: "Aggtelekin ja Jósvafőn väliin jäävä pääkäytävä on 6,65 kilometriä pitkää tippukiviluolaa, ja alue tunnetaan yhtenä Euroopan merkittävimmistä karstialueista." },
    ],
    "Budapest": [
      { q: "Miksi Budapestin metron 1-linja on erikoinen?", a: "Budapestin M1-metro avattiin 1896 ja on mantereisen Euroopan ensimmäinen maanalainen rautatie sekä maailman ensimmäinen sähkövetureilla kulkenut metro. Se rakennettiin muutamassa vuodessa valmiiksi vuosituhannen juhlavuoteen." },
      { q: "Kuinka nopeasti alkuperäisellä metrolla pääsi perille?", a: "Vörösmartyn aukiolta Városligetiin kulkeva alkuperäinen reitti vei matkustajan perille vain kymmenessä minuutissa, mikä oli 1800-luvun lopulla huikean nopeaa." },
    ],
    "Csongrád": [
      { q: "Mikä yhdistää Szegedin paprikaa Nobel-palkintoon?", a: "Szegedin tutkija Albert Szent-Györgyi eristi paprikasta C-vitamiinia ja sai löydöksestään lääketieteen Nobel-palkinnon 1937. Kansa alkoi tämän jälkeen kutsua palkintoa leikkimielisesti \"paprikapalkinnoksi\"." },
      { q: "Miksi paprika sopi C-vitamiinin tutkimiseen paremmin kuin appelsiini?", a: "Paprikassa on runsaasti C-vitamiinia mutta vähemmän sokeria kuin monissa hedelmissä, joten vitamiinin eristäminen laboratoriossa oli helpompaa – pieni yksityiskohta, joka johti maailmanluokan löytöön Szegedissä." },
    ],
    "Fejér": [
      { q: "Mikä salaisuus piilee Tácin peltojen alla?", a: "Tácin kylän liepeillä sijaitsee Gorsium, laaja roomalaiskaupungin raunioalue, jonka juuret ulottuvat 1. vuosisadalle. Paikka toimi aikanaan Pannonian keisarikultin ja maakuntakokousten keskuksena." },
      { q: "Ketkä kävivät Gorsiumissa roomalaisaikaan?", a: "Gorsiumin kaduilla kulkivat aikanaan muun muassa keisarit Traianus, Septimius Severus ja Caracalla, ja kaivauksissa on paljastunut kylpylöitä, temppeleitä ja teatteri sata hehtaarin alueelta." },
    ],
    "Győr-Moson-Sopron": [
      { q: "Miksi Sopronia kutsutaan \"leghűségesebb\" kaupungiksi?", a: "Vuoden 1921 kansanäänestyksessä sopronilaiset äänestivät Itävallan sijaan Unkarin puolesta, ja tästä uskollisuudesta kaupunki sai kunnianimen Civitas Fidelissima – uskollisin kaupunki." },
      { q: "Mistä Uskollisuuden portti Sopronissa kertoo?", a: "Soproniin rakennettiin äänestyksen muistoksi niin kutsuttu Uskollisuuden portti osaksi 61 metriä korkeaa tulitornia, ja kaupungin liittäminen takaisin Unkariin astui voimaan tammikuussa 1922." },
    ],
    "Hajdú-Bihar": [
      { q: "Miksi Debreceniä kutsutaan \"kalvinistiseksi Roomaksi\"?", a: "Debrecen muuttui 1500-luvun puolivälissä kokonaan protestanttiseksi kaupungiksi, ja siksi sitä on vuosisatoja kutsuttu leikkimielisesti kalvinistiseksi Roomaksi." },
      { q: "Milloin Debrecenistä tuli Unkarin väliaikainen pääkaupunki?", a: "Debrecen toimi Unkarin pääkaupunkina kahdesti: vuonna 1849 vallankumouksen aikana, kun Kossuth julisti siellä Habsburgien vallan päättyneeksi, ja uudelleen vuonna 1944 sodan jälkimainingeissa." },
    ],
    "Heves": [
      { q: "Mikä yllättävä rakennus Egerin keskustassa muistuttaa turkkilaisvallasta?", a: "Egerin minareetti on Ottomaanien valtakunnan pohjoisin säilynyt muistomerkki Euroopassa. Se rakennettiin 91 vuotta kestäneen turkkilaisvallan aikana, ja sen 98 porrasta johtaa 26 metrin korkeuteen." },
      { q: "Montako minareettia Egerissä oli aikanaan?", a: "Turkkilaiskaudella Egeriin pystytettiin kaikkiaan kymmenen minareettia, mutta ajan saatossa niistä on säilynyt jäljellä vain tämä yksi ainoa." },
    ],
    "Jász-Nagykun-Szolnok": [
      { q: "Mikä legendaarinen esine löytyy Jászberényn museosta?", a: "Jászberényn Jász-museossa säilytetään Lehel-torvea, koristeellista norsunluutorvea, joka liitetään legendaariseen sotapäällikkö Lehelin tarinaan ja joka on todennäköisesti peräisin 900–1100-luvuilta." },
      { q: "Mistä jászit, alueen väestö, alunperin polveutuvat?", a: "Jászit olivat alunperin iranilaista alkuperää oleva kansanryhmä, jotka asettuivat Unkarin Alföldille 1200-luvulla, ja torvi on kasvanut heidän yhteisönsä yhtenäisyyden symboliksi." },
    ],
    "Komárom-Esztergom": [
      { q: "Missä Unkarin ensimmäinen kuningas Pyhä István perimätiedon mukaan syntyi?", a: "Vanhojen legendojen mukaan Unkarin valtion perustaja, kuningas Pyhä István, syntyi Esztergomin linnassa noin 970-luvulla, vaikka tarkkaa syntymäpaikkaa ei historiantutkimuksessa voida täysin varmistaa." },
      { q: "Mikä silta yhdistää Esztergomin Slovakiaan?", a: "Esztergomista pääsee Mária Valéria -sillan yli suoraan Slovakian puolelle Štúrovoon. Silta tuhoutui toisessa maailmansodassa, mutta se rakennettiin uudelleen ja avattiin vasta vuonna 2001." },
    ],
    "Nógrád": [
      { q: "Mitä ainutlaatuista löytyy Ipolytarnócin luonnonsuojelualueelta?", a: "Ipolytarnócista on löytynyt noin 17 miljoonan vuoden ikäisiä eläinten jalanjälkiä hiekkakiveen kivettyneinä, ja alue on yksi Euroopan tärkeimmistä paleontologisista löytöpaikoista." },
      { q: "Kuinka suuri kivettynyt puu Ipolytarnócista on löytynyt?", a: "Yksi maailman suurimmista tunnetuista kivettyneistä puunrungoista löytyi Ipolytarnócista: sen ympärysmitta on noin 8 metriä ja alkuperäinen pituus arviolta lähes 100 metriä." },
    ],
    "Pest": [
      { q: "Miksi Gödöllön linna oli keisarinna Sisin lempipaikka?", a: "Gödöllön kuninkaallinen linna annettiin häälahjaksi Ferenc Józsefille ja Erzsébetille (Sisille), ja Sisille se oli pako Wienin tiukoista hovietiketeistä sekä paikka, jossa hän sai ratsastaa vapaasti rakastamillaan hevosilla." },
      { q: "Mikä väri liitetään Gödöllön linnassa Sisin muistoon?", a: "Sisin huoneiden seinät maalattiin hänen lempivärillään, violetilla, ja violetti kukka liitetään yhä hänen muistoonsa linnan kävijöiden mielissä." },
    ],
    "Somogy": [
      { q: "Missä sijaitsee yksi Euroopan ensimmäisistä tähtitaivaspuistoista?", a: "Somogyn Zselicin alueella sijaitseva Zselici Csillagpark sai kansainvälisen pimeän taivaan puiston nimityksen vuonna 2009 – ensimmäisenä koko Euroopassa, yhdessä Skotlannin Gallowayn puiston kanssa." },
      { q: "Mikä tekee Zselicin yötaivaasta erityisen?", a: "Zselicin metsäalueella on niin vähän valosaastetta, että kesäisin linnunrata näkyy paikan päällä paljain silmin, ja alueella voi osallistua opastettuihin tähtienkatselukierroksiin." },
    ],
    "Szabolcs-Szatmár-Bereg": [
      { q: "Kuka rakennutti Nyírbátorin komean goottilaisen kirkon?", a: "Erdélyin vojvodi Báthori István rakennutti Nyírbátoriin minoriittakirkon 1400-luvun lopulla lupauksensa mukaisesti voitettuaan turkkilaiset Kenyérmezőn taistelussa, ja hänet haudattiin kirkkoon vuonna 1493." },
      { q: "Mitä erikoista Nyírbátorin kirkoissa on kaksi kappaletta?", a: "Báthori István rakennutti kiitollisuudesta peräti kaksi myöhäisgoottilaista kirkkoa Nyírbátoriin samaan aikaan, ja molemmat lasketaan Unkarin merkittävimpiin goottilaisen arkkitehtuurin muistomerkkeihin." },
    ],
    "Tolna": [
      { q: "Mistä viinilajikkeesta Szekszárd on kuuluisa?", a: "Szekszárdin viinialueen tunnusomainen rypäle on kadarka, jonka toivat alueelle Turkkia paenneet serbit. Viinialue palkittiin arvonimellä \"Viinin ja rypäleen kaupunki\" vuonna 1987." },
      { q: "Mikä punaviini yhdistää kadarkaa ja kékfrankosia Szekszárdissa?", a: "Szekszárdin Bikavér on paikallinen punaviinikuutio, jonka pohjana on kadarka ja kékfrankos täydennettynä muilla tummilla rypälelajikkeilla, ja se on yksi alueen tunnetuimmista vienneistä." },
    ],
    "Vas": [
      { q: "Miksi pieni Kőszeg piti puolensa sulttaani Suleimania vastaan?", a: "Vuonna 1532 Kőszegin linnankapteeni Jurisics Miklós puolusti kaupunkia vain noin 46 sotilaan ja 700 pakolaistalonpojan voimin sulttaani Suleimanin valtavaa armeijaa vastaan peräti 25 päivän ajan." },
      { q: "Miksi Kőszegin kellot soivat yhä keskellä päivää?", a: "Piirityksen lopussa sulttaani tarjosi Jurisicsille mahdollisuuden säilyttää linna, kunhan tämä nostaisi symbolisesti Ottomaanien lipun. Turkkilaiset vetäytyivät kello 11, ja tapahtumaa muistetaan Kőszegissä kellonsoitolla joka päivä samaan aikaan." },
    ],
    "Veszprém": [
      { q: "Mikä muinainen asiakirja kirjoitettiin Tihanyssa vuonna 1055?", a: "Tihanyn luostarin perustamiskirja vuodelta 1055 sisältää 58 unkarinkielistä sanaa latinankielisen tekstin seassa, ja sitä pidetään vanhimpana säilyneenä unkarin kielen kirjallisena todisteena." },
      { q: "Millaisia sanoja perustamiskirjasta löytyy?", a: "Asiakirjasta löytyvät muun muassa unkarin sanojen \"fa\" (puu), \"kút\" (kaivo) ja \"vár\" (linna) varhaisimmat kirjatut muodot, minkä ansiosta se on kielihistorioitsijoille aarreaitta." },
    ],
    "Zala": [
      { q: "Missä sijaitsee Unkarin öljyteollisuuden kehto?", a: "Bázakerettyen kylän lähellä alkoi vuonna 1937 geologi Simon Pappin johdolla Unkarin ensimmäinen teollisen mittakaavan öljynporaus, kun Budafa-2-kaivo alkoi tuottaa raakaöljyä." },
      { q: "Kuinka paljon öljyä ensimmäinen kaivo tuotti päivässä?", a: "Budafa-2-kaivo tuotti alkuun noin 62–65 kuutiometriä öljyä päivässä, ja ensimmäinen öljyjuna lähti Bázakerettyeltä Budapestiin joulukuussa 1937." },
    ],
  },
  PRT: {
    Aveiro: [
      { q: "Miksi Aveiron rannikolla näkee raidallisia taloja?", a: "Costa Novan kalastajakylässä talot maalattiin perinteisesti räikeän värikkäillä raidoilla, jotta kalastajat erottivat oman kotinsa merelle sumussa. Nykyään värikkäät \"palheiros\"-talot ovat suosittu nähtävyys." },
      { q: "Mitä Aveiron suolalammikoilla tehdään?", a: "Ria de Aveiron matalissa altaissa on kerätty merisuolaa käsin jo satojen vuosien ajan. Perinteinen keräystapa on säilynyt lähes muuttumattomana keskiajalta näihin päiviin." },
    ],
    Azores: [
      { q: "Mikä on Azorien kaksoisjärvi?", a: "São Miguelin saarella sijaitseva Sete Cidades syntyi tulivuorikraatteriin, ja järviparin toinen puoli näyttää vihertävältä ja toinen sinertävältä, vaikka niitä erottaa vain kapea kannas." },
      { q: "Miten Furnasissa kypsennetään ruokaa maan lämmöllä?", a: "Furnasin kylässä padat lasketaan tulivuoren lämmittämiin maakuoppiin, ja perinteinen \"cozido das Furnas\" -pata kypsyy siellä hitaasti useita tuntia maan omalla höyryllä." },
    ],
    Beja: [
      { q: "Mikä laulutapa on kotoisin Alentejon seudulta, jonka keskus Beja on?", a: "Alentejon \"cante\" on soittimettomia, kaksiäänisiä kuorolauluja, joita maaseudun työläiset ovat perinteisesti laulaneet yhdessä. Unesco listasi sen ihmiskunnan aineettomaan kulttuuriperintöön vuonna 2014." },
      { q: "Miksi cante-laulua lauletaan aina yhdessä?", a: "Cante syntyi maatyöläisten yhteislaulusta pelloilla, ja sitä esittävät edelleen harrastajakuorot ilman soittimia: yksi äänet aloittaa ja muut vastaavat samaan tahtiin." },
    ],
    Braga: [
      { q: "Mikä on Portugalin vanhin katedraali?", a: "Bragan tuomiokirkko Sé de Braga on Portugalin vanhin katedraali. Sen rakentaminen alkoi 1000-luvun lopulla, ja se vihittiin käyttöön vuonna 1089 — ennen kuin Portugalista oli edes tullut itsenäinen kuningaskunta." },
      { q: "Kuka on haudattu Bragan katedraaliin?", a: "Katedraalin kuninkaiden kappeliin on haudattu Portugalin ensimmäisen kuninkaan vanhemmat, kreivi Henrik ja Teresa, jotka hallitsivat aluetta ennen maan itsenäistymistä 1100-luvulla." },
    ],
    Bragança: [
      { q: "Mikä rakennus Bragançassa on ainutlaatuinen koko Iberian niemimaalla?", a: "Domus Municipalis on romaanisen ajan kunnantalo, jonka kaltaista maallista romaanista rakennusta ei tunneta muualta Iberian niemimaalta. Se rakennettiin 1200-luvun alkupuolella epäsäännöllisen viisikulmion muotoiseksi." },
      { q: "Mihin Domus Municipalista alun perin käytettiin?", a: "Rakennuksen tarkkaa alkuperäistä käyttötarkoitusta ei tiedetä varmasti, mutta sen alla on vedellä täytetty säiliö, ja ylätasanteella kaupungin \"hyvät miehet\" kokoontuivat päättämään asioista." },
    ],
    "Castelo Branco": [
      { q: "Mistä käsityöstä Castelo Branco on kuuluisa?", a: "Castelo Brancon perinteiset \"colchas\" ovat käsin silkkilangalla kirjailtuja pellavapeittoja, joiden kuvioissa toistuvat linnut, kukat ja elämän puu -aiheet. Perinnettä on vaalittu vuosisatoja." },
      { q: "Kuinka kauan yhden colcha-peitteen kirjailu voi kestää?", a: "Suuren, tiheäkuvioisen peitteen kirjailuun voi kulua ompelijalta kuukausia, sillä koko kuvio tehdään käsin pistoin ilman koneita." },
    ],
    Coimbra: [
      { q: "Miten Coimbran fado eroaa Lissabonin fadosta?", a: "Coimbran fadoa laulavat perinteisesti vain yliopisto-opiskelijat mustissa akateemisissa viitoissaan, ja sävelmät ovat juhlallisempia kuin Lissabonin fado. Myös kitara on erilainen ja viritetty matalammalle." },
      { q: "Mistä Coimbran opiskelijoiden mustat viitat tulevat?", a: "Mustat viitat ovat osa Coimbran yliopiston perinteistä akateemista pukua. Fadonlaulajat esiintyvät niissä kaduilla ja toreilla iltaisin, ylläpitäen vuosisatoja vanhaa opiskelijaperinnettä." },
    ],
    Évora: [
      { q: "Mikä antiikin rakennus seisoo yhä Évoran keskustassa?", a: "Roomalaisajan Dianan temppeli on yksi parhaiten säilyneistä roomalaisrakennuksista Iberian niemimaalla. Se rakennettiin arviolta 1.–2. vuosisadalla ja on seisonut kaupungin keskustassa lähes kaksi vuosituhatta." },
      { q: "Miksi Dianan temppeli säilyi tuhoutumatta vuosisatojen ajan?", a: "Keskiajalla temppeliä käytettiin muun muassa linnoituksen osana ja teurastamona, mikä auttoi sen pysymään pystyssä, vaikka alkuperäinen käyttötarkoitus unohtui pitkäksi aikaa." },
    ],
    Faro: [
      { q: "Mikä on Ria Formosa?", a: "Faron edustalla on Ria Formosa, laaja matalien laguunien ja hiekkasaarten verkosto, joka suojaa rannikkoa ja tarjoaa elinympäristön sadoille lintulajeille." },
      { q: "Miksi Ria Formosa on tärkeä linnuille?", a: "Laguunin matalat vedet ja hiekkasärkät toimivat muuttolintujen levähdyspaikkana Euroopan ja Afrikan välillä, ja alue on suojeltu luonnonpuistona vuodesta 1987." },
    ],
    Guarda: [
      { q: "Mikä kaupunginosa Guardassa muistuttaa keskiaikaisesta juutalaisyhteisöstä?", a: "Guardan vanha Judiaria-kortteli oli keskiajalla yksi Portugalin vanhimmista juutalaisyhteisöistä. 1400-luvun lopulla siellä asui satoja ihmisiä, ennen kuin karkotukset ja pakkokäännytykset hajottivat yhteisön." },
      { q: "Mitä ammatteja Guardan juutalaisyhteisössä harjoitettiin?", a: "Yhteisössä toimi muun muassa räätäleitä, kultaseppiä, parkitsijoita ja lääkäreitä, ja korttelissa oli oma synagoga, vesimylly ja kaivo asukkaiden käyttöön." },
    ],
    Leiria: [
      { q: "Mikä keskeneräinen mestariteos löytyy Leirian alueelta?", a: "Batalhan luostari on goottilais-manueliinilaista mestariarkkitehtuuria, mutta sen \"Keskeneräiset kappelit\" jäivät katottomiksi 1500-luvulla, kun kuninkaan huomio siirtyi merentakaisiin löytöretkiin." },
      { q: "Miksi Batalhan luostari rakennettiin?", a: "Luostari rakennettiin kiitokseksi voitosta Aljubarrotan taistelussa 1385, joka varmisti Portugalin itsenäisyyden Kastiliaa vastaan. Rakennustyö kesti lähes kaksi vuosisataa." },
    ],
    Lisboa: [
      { q: "Kuka suunnitteli Lissabonin kuuluisan rautahissin?", a: "Santa Justan hissi on vuonna 1902 valmistunut neogoottinen rautarakennelma, jonka suunnitteli Raoul Mesnier de Ponsard. Hänen kerrotaan opiskelleen Gustave Eiffelin piirissä, vaikka yhteyttä ei ole täysin varmistettu." },
      { q: "Miksi hissi rakennettiin Lissabonin keskustaan?", a: "Hissi yhdistää alakaupungin Baixan ja korkeammalla sijaitsevan Carmon aukion, koska kaupunginosien välillä on jyrkkä korkeusero. Hissin tornista avautuu näköala koko kaupungin ylle." },
    ],
    Madeira: [
      { q: "Miksi Funchal tunnetaan uudenvuoden ilotulituksesta?", a: "Funchalin satama-alueelle ammuttiin vuoden 2006 uudenvuodenyönä noin 20 000 ilotulitusraketin näytös, joka kirjattiin Guinnessin ennätyskirjaan maailman suurimpana ilotulituksena." },
      { q: "Mistä pisteistä Funchalin ilotulitus ammutaan?", a: "Nykyisin näytös laukaistaan kymmenistä pisteistä ympäri Funchalin satamaa ja vuorenrinteitä, ja kahdeksan minuutin spektaakkelia seuraa vuosittain yli sata tuhatta katsojaa." },
    ],
    Portalegre: [
      { q: "Mikä käsityöperinne teki Portalegrestä kuuluisan?", a: "Portalegren seinätekstiilipaja perustettiin vuonna 1946, ja siellä kehitettiin ainutlaatuinen käsinompelutekniikka, jolla taidemaalarien maalauksia voidaan toistaa kangaspinnalle pistolta pistolle." },
      { q: "Miksi Portalegren kirjontatekniikka on erikoinen?", a: "Tavallisesta kutomisesta poiketen kuvio ommellaan käsin erillisiin pystylankoihin, jolloin yhdessä teoksessa voi olla tuhansia värisävyjä. Tekniikka tunnetaan kansainvälisesti juuri Portalegren nimellä." },
    ],
    Porto: [
      { q: "Kuka suunnitteli Porton kaksikerroksisen rautasillan?", a: "Dom Luís I -sillan suunnitteli belgialaisinsinööri Théophile Seyrig, joka oli työskennellyt Gustave Eiffelin toimistossa. Silta valmistui 1886, ja sen kaari oli aikanaan yksi maailman pisimmistä metallikaarista." },
      { q: "Miten sillan kahta tasoa käytetään nykyään?", a: "Alempaa kantta käyttävät autot ja jalankulkijat joen tasalla, ylempää kantta metro ja kävelijät korkealla joen yllä. Molemmilta tasoilta avautuu näkymä Douro-joen laaksoon." },
    ],
    Santarém: [
      { q: "Miten portugalilainen tauriäisottelu eroaa espanjalaisesta?", a: "Portugalilaisessa corridassa sonnia ei surmata arenalla, ja lopuksi kahdeksan miehen \"forcados\"-ryhmä painaa sonnin paljain käsin ilman aseita. Santarémin seutu on Portugalin tauriäiskulttuurin keskeisimpiä alueita." },
      { q: "Mitä forcados-ryhmä tekee ottelun lopuksi?", a: "Miehet asettuvat riviin, ja yksi kerrallaan hyökkää sonnia vastaan tarttuen sitä sarvista tai niskasta, kunnes koko ryhmä saa eläimen hallintaan paljain käsin." },
    ],
    Setúbal: [
      { q: "Mikä viinitalo Setúbalin seudulla on Portugalin vanhimpia?", a: "José Maria da Fonseca -viinitalo perustettiin vuonna 1834 Azeitãossa, ja se on Portugalin vanhin pullotetun pöytäviinin ja makean Moscatel de Setúbal -viinin valmistaja." },
      { q: "Mikä tekee Moscatel de Setúbalista erikoisen?", a: "Muskottirypäleistä tehty makea viini kypsyy tammitynnyreissä usein vuosikausia, ja osa vuosikerroista tuodaan myyntiin vasta vuosikymmenten kuluttua valmistuksesta." },
    ],
    "Viana do Castelo": [
      { q: "Mistä juhlasta Viana do Castelo on kuuluisa?", a: "Elokuisessa Senhora d'Agonia -juhlassa satoja naisia kulkee kaduilla perinteisissä Minhon puvuissa raskaan kultafiligreenikorun kanssa. Tapahtumaa kutsutaan maailman suurimmaksi ulkoilmakultanäytökseksi." },
      { q: "Mistä perinne kultakorujen keräämiseen syntyi?", a: "Perinteisesti tytöt saivat filigreenikultahelmiä lahjaksi syntymästä, syntymäpäivistä ja jouluista, ja aikuisena naisella saattoi olla koossa kokonainen korunauha juhlapukuun." },
    ],
    "Vila Real": [
      { q: "Mikä on Fisgas de Ermelo?", a: "Vila Realin Alvãon luonnonpuistossa sijaitseva Fisgas de Ermelo on yksi Portugalin suurimmista putouksista. Vesi syöksyy useassa porrastasossa kvartsiittikallion yli satoja metrejä alaspäin." },
      { q: "Missä Fisgas de Ermelo sijaitsee?", a: "Putous sijaitsee Mondim de Bastonin kunnassa Ermelon kylän lähellä, ja sinne pääsee vain vaeltamalla — mikä on säästänyt paikan rauhalliseksi verrattuna suosituimpiin nähtävyyksiin." },
    ],
    Viseu: [
      { q: "Kuka oli Grão Vasco?", a: "Vasco Fernandes, lempinimeltään \"Grão Vasco\" (Suuri Vasco), oli 1500-luvun alun merkittävimpiä portugalilaisia renessanssimaalareita. Hänen teoksiaan on koottu Viseun kaupungin taidemuseoon." },
      { q: "Missä Grão Vascon teoksia voi nähdä nykyään?", a: "Viseun Grão Vasco -museo sijaitsee entisessä piispanpalatsissa vanhan tuomiokirkon vierellä, ja esillä on hänen suurikokoisia alttaritauluja, jotka hän maalasi alun perin Viseun katedraaliin." },
    ],
  },
  SWE: {
    Blekinge: [
      { q: "Miksi Brömsebron rauha vuonna 1645 oli niin merkittävä Ruotsille?", a: "Blekingen rajalla solmittu rauha päätti sodan Tanskaa vastaan, ja Ruotsi sai haltuunsa Gotlannin, Hallannin ja Jämtlannin – siitä alkoi Ruotsin suurvalta-aika." },
      { q: "Mikä tekee Ronnebystä erikoisen kylpyläkaupungin?", a: "Ronneby on ollut kylpyläkaupunki jo 1600-luvulta lähtien – parantavaksi uskottu lähdevesi houkutteli väkeä ympäri Ruotsia terveyttä hakemaan." },
    ],
    Dalarna: [
      { q: "Miten Falun kuparikaivoksen suuronnettomuus muutti maisemaa?", a: "Juhannuspäivänä 1687 kaivoksen katto romahti ja syntyi Stora Stöten, syvä ja laaja kuilu – onneksi kaivosmiehet olivat sattumalta vapaapäivällä juhlimassa." },
      { q: "Mistä Dalan puuhevonen on peräisin?", a: "Perinteinen käsin veistetty ja maalattu puuhevonen syntyi Nusnäsin kylässä 1800-luvulla ja siitä tuli Ruotsin tunnetuin matkamuistosymboli." },
    ],
    Gotland: [
      { q: "Mitä raukat ovat ja mistä ne johtuvat?", a: "Raukat ovat meren vuosituhansien saatossa muotoilemia kalkkikivipatsaita Gotlannin rannoilla – Digerhuvudin alue pohjoisrannikolla on niistä suurin kenttä." },
      { q: "Missä gotlanninponit elävät nykyään lähes puolivillinä?", a: "Gotlanninponi on Ruotsin vanhin alkuperäinen hevosrotu, ja Lojsta Hedin nummella laumat laiduntavat edelleen luonnontilan kaltaisissa oloissa." },
    ],
    Gävleborg: [
      { q: "Mikä tekee Hälsingegårdar-taloista maailmanperintökohteen?", a: "UNESCO nimesi 2012 seitsemän 1800-luvun hälsinkiläistalota maailmanperinnöksi – talonpojat rakensivat kokonaisia juhlahuoneita täyteen maalauksia ja koristeita." },
      { q: "Miten Gävlen vanha kaupunginosa Gamla Gefle säilyi tähän päivään?", a: "Puutalokortteli selvisi vuoden 1869 tuhoisasta tulipalosta, joka poltti suuren osan Gävleä – nykyään se on yksi Ruotsin parhaiten säilyneistä puukaupunginosista." },
    ],
    Halland: [
      { q: "Miksi Tjolöholmin linna näyttää enemmän englantilaiselta kuin ruotsalaiselta?", a: "Linna rakennettiin 1898–1904 Dickson-suvun kesähuvilaksi, ja arkkitehti sai vaikutteita englantilaisesta Tudor-tyylistä ja taideteollisuusliikkeestä." },
      { q: "Mikä tekee Laholmin joesta kuuluisan?", a: "Lagan-joki Laholmissa on ollut arvostettu lohijoki jo keskiajalta lähtien, ja kuninkailla oli aikoinaan omat kalastusoikeutensa sen koskiin." },
    ],
    Jämtland: [
      { q: "Mitä Frösön riimukivi kertoo?", a: "Noin vuonna 1050 pystytetty kivi on Jämtlannin ainoa säilynyt riimukivi ja ainoa tunnettu kivi, joka kertoo kokonaisen maakunnan kristinuskoon kääntymisestä." },
      { q: "Miksi Åre on yksi Pohjoismaiden suosituimmista laskettelupaikoista?", a: "Åressa yhdistyvät korkeat tunturit, luotettava lumitilanne ja pitkä hiihtokeskusperinne, mikä on tehnyt siitä yhden Skandinavian suurimmista laskettelukeskuksista." },
    ],
    Jönköping: [
      { q: "Mistä Huskvarnan tehtaat saivat alkunsa?", a: "Vuonna 1689 Huskvarnaan perustettiin asetehdas Vättern-järven putouksien äärelle – samasta tehtaasta kasvoi myöhemmin myös ompelukoneita ja moottoripyöriä valmistava Husqvarna." },
      { q: "Mikä tekee Habon kirkosta erikoisen?", a: "Habon puukirkko on yksi Euroopan suurimmista puukirkoista, ja sen sisätilat on maalattu 1700-luvulla lattiasta kattoon raamatullisin kuvin." },
    ],
    Kalmar: [
      { q: "Mitä Kalmarin linnassa sovittiin vuonna 1397?", a: "Kalmarin linnassa solmittiin Kalmarin unioni, jolla Tanska, Norja ja Ruotsi yhdistyivät saman hallitsijan alle – sopimuksen allekirjoitti kymmeniä aatelisia ja kirkonmiehiä." },
      { q: "Miksi Stora Alvaret Öölannissa on maailmanperintökohde?", a: "Tämä laaja kalkkikivikangas on yksi Euroopan suurimmista alvareista, ja sen ainutlaatuinen kasvillisuus on syntynyt vuosituhansien laidunnuksen tuloksena." },
    ],
    Kronoberg: [
      { q: "Mikä on Glasriket ja miksi se syntyi juuri tänne?", a: "Smoolannin lasiteollisuusalueella toimii useita lasitehtaita, kuten 1742 perustettu Kosta – seudun metsät tarjosivat polttopuuta ja hiekka raaka-ainetta lasinpuhallukseen." },
      { q: "Miksi Växjötä kutsutaan Euroopan vihreimmäksi kaupungiksi?", a: "Växjö on saanut kansainvälistä tunnustusta ilmastotyöstään – kaupunki tavoittelee fossiilivapautta ja sen energiantuotanto perustuu suurelta osin bioenergiaan." },
    ],
    Norrbotten: [
      { q: "Miksi koko Kirunan kaupunki siirretään uuteen paikkaan?", a: "Maailman suurin maanalainen rautakaivos syö vuori vuodelta maaperää kaupungin alta, ja siksi keskusta rakennetaan kokonaan uudelleen muutaman kilometrin päähän." },
      { q: "Mikä tekee Gammelstadin kirkkokylästä ainutlaatuisen?", a: "Luulajan liepeillä sijaitseva Gammelstad on maailman suurin ja parhaiten säilynyt kirkkokylä satoineen pienine mökkeineen kaukaisia kirkkomatkalaisia varten – UNESCO-kohde vuodesta 1996." },
    ],
    Skåne: [
      { q: "Miten Öresundin silta muutti liikkumista Ruotsin ja Tanskan välillä?", a: "Vuonna 2000 avattu silta ja tunneli yhdistivät Skoonen ja Kööpenhaminan – matka, joka ennen vaati lauttaa, kestää nyt autolla vain kymmenisen minuutin." },
      { q: "Mitä Kivikin kuninkaanhaudassa on erikoista?", a: "Pronssikautinen, noin 3500 vuotta vanha hauta on Pohjoismaiden suurimpia, ja sen kivissä on harvinaislaatuisia hautakammion sisäpuolisia kuvakaiverruksia." },
    ],
    Stockholm: [
      { q: "Mitä Vaasa-laivalle tapahtui neitsytmatkallaan?", a: "Sotalaiva kaatui ja upposi Tukholman satamassa elokuussa 1628 vain lyhyen matkan jälkeen – se nostettiin pintaan vasta 1961, upean hyvin säilyneenä." },
      { q: "Missä Nobel-palkintojen juhlaillallinen järjestetään?", a: "Joulukuun 10. päivä juhlaillallinen pidetään Tukholman kaupungintalon Sinisessä salissa, joka on punatiilinen sali – arkkitehti muutti mielensä sinisestä värityksestä kesken rakennustöiden." },
    ],
    Södermanland: [
      { q: "Mitä Ramsundsbergetin kalliokaiverrus kuvaa?", a: "Sigurdinkaiverrus 1000-luvulta kertoo sankari Sigurd Lohikäärmeentappajan tarinan – se on yksi Pohjoismaiden merkittävimmistä viikinkiaikaisista kuvakaiverruksista." },
      { q: "Mikä tekee Gripsholmin linnasta erityisen?", a: "Mälaren-järven rannalla kohoava linna toimii Ruotsin valtion muotokuvakokoelman kotina – siellä on satoja kuninkaallisten ja merkkihenkilöiden muotokuvia 1500-luvulta nykypäivään." },
    ],
    Uppsala: [
      { q: "Miksi Uppsalan yliopisto on erityisen merkittävä?", a: "Vuonna 1477 perustettu yliopisto on koko Pohjoismaiden vanhin, ja se on kouluttanut tutkijoita ja virkamiehiä yli 500 vuoden ajan." },
      { q: "Mikä tekee Uppsalan tuomiokirkosta erikoisen?", a: "Se on Skandinavian korkeimpia kirkkorakennuksia, ja sen kryptaan on haudattu kuningas Kustaa Vaasa, Ruotsin Vaasa-suvun ensimmäinen hallitsija." },
    ],
    Värmland: [
      { q: "Kuka oli Selma Lagerlöf ja mihin hän liittyy Värmlantiin?", a: "Nobelin kirjallisuuspalkinnon ensimmäinen naisvoittaja vuonna 1909 kasvoi Mårbackan tilalla Värmlannissa, ja lapsuudenkoti on nykyään museona yleisölle avoinna." },
      { q: "Kuka oli John Ericsson ja mitä hän keksi?", a: "Filipstadissa syntynyt insinööri suunnitteli 1800-luvulla mm. laivapotkurin ja Yhdysvaltain sisällissodassa kuuluisaksi tulleen sota-alus Monitorin panssaroidun tornin." },
    ],
    Västerbotten: [
      { q: "Miksi Uumajaa kutsutaan koivujen kaupungiksi?", a: "Vuoden 1888 tulipalo tuhosi suuren osan kaupungista, ja jälleenrakennuksessa kaduille istutettiin koivukujia palokaistaleiksi – nimitys Björkarnas stad on säilynyt siitä lähtien." },
      { q: "Mikä tekee Skellefteån Sara-kulttuuritalosta poikkeuksellisen?", a: "Vuonna 2021 avattu 20-kerroksinen, 80 metriä korkea rakennus on yksi Euroopan korkeimmista puutaloista – hotelli, teatteri ja museo saman puurungon sisällä." },
    ],
    Västernorrland: [
      { q: "Miten Sundsvallista tuli 'Kivikaupunki'?", a: "Vuoden 1888 suurpalo tuhosi kaupungin puukorttelit muutamassa tunnissa, ja jälleenrakennuksessa keskusta määrättiin rakennettavaksi kivestä – siitä syntyi lempinimi Stenstan." },
      { q: "Mitä tapahtui Ådalenissa vuonna 1931?", a: "Sotilaat avasivat tulen lakkoilevia sahatyöläisiä kohti Kramforsin seudulla, ja viisi ihmistä kuoli – tapaus järkytti koko maata ja muutti Ruotsin työmarkkinasuhteita pysyvästi." },
    ],
    Västmanland: [
      { q: "Mikä on Anundshög ja mitä sen ympärillä on?", a: "Se on Ruotsin suurin muinainen hautakumpu Västeråsin liepeillä, ja sitä ympäröi kymmenkunta pienempää kumpua sekä pitkä kivistä ladottu laivasettaus." },
      { q: "Mitä Engelsbergin rautaruukissa säilyi ennallaan?", a: "1600–1800-luvun rautaruukki koneineen ja työläisasuntoineen on niin hyvin säilynyt, että UNESCO nimesi sen maailmanperintökohteeksi vuonna 1993." },
    ],
    "Västra Götaland": [
      { q: "Miksi Göteborgin keskustassa on kanaaleja kuin Amsterdamissa?", a: "Kaupunki perustettiin 1621 hollantilaisten asiantuntijoiden avulla, ja he suunnittelivat kanavat ja katuverkon Amsterdamin mallin mukaan – Stora Hamnkanalen on yhä keskeinen näky." },
      { q: "Miten Liseberg-huvipuisto syntyi?", a: "Puisto avattiin 1923 osana Göteborgin 300-vuotisjuhlanäyttelyä, ja se oli tarkoitettu väliaikaiseksi – suosion ansiosta siitä tuli pysyvä ja nykyään Pohjoismaiden suosituin huvipuisto." },
    ],
    Orebro: [
      { q: "Mitä Örebrossa päätettiin vuonna 1810?", a: "Valtiopäivät valitsivat Örebrossa ranskalaisen marsalkka Bernadotten Ruotsin kruununperijäksi – hänestä tuli myöhemmin kuningas Kaarle XIV Juhana, nykyisen kuningashuoneen kantaisä." },
      { q: "Mikä on Örebron linnan erityispiirre?", a: "Keskiaikainen linna kohoaa saarella keskellä Svartån-jokea kaupungin sydämessä, ja sen muurien sisällä on pidetty useita historiallisia valtiopäiviä." },
    ],
    Östergötland: [
      { q: "Kuka perusti Vadstenan luostarin ja miksi?", a: "Pyhä Birgitta suunnitteli luostarin yksityiskohtia myöten, ja se vihittiin käyttöön 1384 – Birgitta itse julistettiin pyhäksi vuonna 1391." },
      { q: "Miten Göta-kanava rakennettiin Motalan kautta?", a: "Kanavatyöt alkoivat Motalassa ja Forsvikissa 1810, ja 22 vuoden urakan jälkeen 1832 valmistunut kanava yhdisti Itämeren ja Pohjanmeren sisävesireittiä pitkin." },
    ],
  },
  NOR: {
    Akershus: [
      { q: "Mistä Akershus-maakunnan nimi on peräisin?", a: "Nimi juontuu Oslossa sijaitsevasta Akershusin linnasta ja linnoituksesta, jonka rakentaminen alkoi vuonna 1299 kuningas Håkon V:n aikana. Linnoitus antoi aikanaan nimensä koko sitä ympäröivälle läänille." },
      { q: "Mikä on Raknehaugen, ja miksi se hämmentää arkeologeja?", a: "Raknehaugen Ullensakerissa on Norjan suurin muinainen maakumpu, halkaisijaltaan 77 metriä. Kaivauksissa ei ole löytynyt hautaa eikä ihmisen jäänteitä, joten se saattaa olla 500-luvun katastrofin muistomerkki, ei kuninkaan hauta." },
    ],
    "Aust-Agder": [
      { q: "Miksi Arendalia kutsuttiin joskus \"Pohjolan Venetsiaksi\"?", a: "1700–1800-luvuilla Arendal rakennettiin useille saarille kanavien ympärille, ja se oli laivanvarustuksen ansiosta yksi Pohjois-Euroopan vauraimmista kaupungeista. Suuren tulipalon jälkeen kanavat täytettiin ja muutettiin leveiksi kaduiksi." },
      { q: "Mitä erikoista Arendalin Tyholmenin puutalokorttelissa on?", a: "Tyholmenin 1700-luvun puutalot ovat yksi parhaiten säilyneistä puutalokokonaisuuksista Pohjois-Euroopassa, ja alue palkittiin arvostetulla Europa Nostra -palkinnolla vuonna 1992." },
    ],
    "Bouvet Island": [
      { q: "Mikä mysteeri löytyi Bouvetinsaarelta vuonna 1964?", a: "Brittiläinen laiva löysi saaren lagunista hylätyn, osittain uponneen pelastusveneen sekä tynnyrin ja airoja – kukaan ei ollut ilmoittanut haaksirikosta. Myöhemmin neuvostoasiakirjoista selvisi veneen jääneen jälkeen myrskyn keskeyttämältä valaanpyyntiretkikunnalta vuodelta 1958." },
      { q: "Milloin ja miten Bouvetinsaaresta tuli osa Norjaa?", a: "Ranskalainen löysi saaren vuonna 1739, mutta se pysyi vuosisatoja käytännössä kenenkään maana. Norja liitti sen viralliseksi alueekseen vuonna 1930, ja nykyään se on luonnonsuojelualue vailla pysyvää väestöä." },
    ],
    Buskerud: [
      { q: "Mikä on Spiralen Drammenissa?", a: "Spiralen on vuorenläpäisevä kiertotie, joka nousee kuudessa lenkissä Bragernesåsen-vuoren laelle. Se kaivettiin alun perin 1950-luvulla graniitin louhintaa varten, ja kuningas Olav V avasi sen yleisölle vuonna 1961." },
      { q: "Miksi Spiralenista tuli suosittu nähtävyys eikä vain louhostie?", a: "Kaupungininsinööri halusi vähentää louhinnan haittoja ja ehdotti tunnelia, joka toimisi samalla matkailukohteena. Vuosina 2019–2020 tunneliin lisättiin värillinen valaistus, joka muuttuu vuorokaudenajan mukaan." },
    ],
    Finnmark: [
      { q: "Miksi Nordkapp tuli suosituksi matkailukohteeksi juuri 1870-luvulla?", a: "Kuningas Oscar II vieraili Nordkapilla heinäkuussa 1873 ja pystytti paikalle muistokiven käyntinsä kunniaksi. Vierailu teki kalliosta tunnetun, ja pian sen jälkeen brittiläinen matkatoimisto Thomas Cook alkoi järjestää matkoja Nordkapille." },
      { q: "Onko Nordkapp oikeasti Euroopan mantereen pohjoisin piste?", a: "Ei aivan – vaikka Nordkapp on suosituin ja tunnetuin kohde, todellinen pohjoisin niemi on vieressä sijaitseva Knivskjellodden, joka työntyy mereen noin 1 450 metriä Nordkappia pohjoisemmaksi." },
    ],
    Hedmark: [
      { q: "Miksi Hedmarkia kutsutaan Norjan hirvimaakunnaksi?", a: "Hedmarkin metsät ovat niin hirvirikkaita, että maakunnasta kaadetaan noin viidesosa koko Norjan vuosittaisesta hirvisaaliista. Alueella on yli 25 000 rekisteröityä metsästäjää." },
      { q: "Kuinka tiheä hirvikanta Hedmarkissa parhaimmillaan on?", a: "Kaakkois-Norjan metsäalueilla, erityisesti Hedmarkissa, hirvitiheys voi nousta jopa 2,5 eläimeen neliökilometrillä – yksi Euroopan suurimmista." },
    ],
    Hordaland: [
      { q: "Mikä Trolltunga on, ja missä se sijaitsee?", a: "Trolltunga on Oddan lähellä Hordalandissa sijaitseva litteä kalliokieleke, joka työntyy noin 700 metrin korkeudessa Ringedalsvatnetin järven yllä. Siitä on tullut yksi Norjan tunnetuimmista valokuvauskohteista." },
      { q: "Kuinka suosittu Trolltunga-vaellus on nykyään?", a: "Vielä 2010-luvun alussa Trolltungalla vieraili alle 800 kävijää vuodessa, mutta vuonna 2016 luku oli jo noin 80 000. Vaellus on noin 27 kilometriä edestakaisin ja kestää yleensä 10–12 tuntia." },
    ],
    Svalbard: [
      { q: "Mikä on Global Seed Vault, ja miksi se rakennettiin Huippuvuorille?", a: "Huippuvuorten kylmyys ja ikirouta suojaavat maailman kasvilajikkeiden siemenvarastoja kriisin varalta. Holvi louhittiin syvälle vuoreen, ja se avattiin vuonna 2008 satojen miljoonien siementen voimin." },
      { q: "Kuinka monesta maasta siemeniä on tallennettu Svalbardin holviin?", a: "Avajaisissa vuonna 2008 holviin tuotiin yli 100 miljoonaa siementä yli sadasta maasta, ja kokoelma on kasvanut siitä lähtien merkittävästi. Holvi toimii varmuuskopiona maailman siemenpankeille." },
    ],
    "Møre og Romsdal": [
      { q: "Miksi Ålesund näyttää niin erilaiselta kuin muut Norjan rannikkokaupungit?", a: "Tuhoisa tulipalo tammikuussa 1904 tuhosi suurimman osan puukaupungista yhdessä yössä ja jätti yli 10 000 ihmistä kodittomiksi. Kaupunki rakennettiin uudelleen aikansa muotisuuntauksen, jugendtyylin, mukaisesti vain muutamassa vuodessa." },
      { q: "Mitä erikoista Ålesundin jugendarkkitehtuurissa on?", a: "Yli 50 arkkitehtia ympäri Norjaa osallistui jälleenrakennukseen, ja rakennuksiin yhdisteltiin kansainvälistä jugendtyyliä viikingiaikaisiin koristeaiheisiin, lohikäärmeisiin ja kasvikuvioihin." },
    ],
    "Nord-Trøndelag": [
      { q: "Miksi Namsenia kutsutaan \"jokien kuningattareksi\"?", a: "Namsen on yksi maailman parhaista lohijoista, ja siellä on saatu vuosien varrella useita yli 20-kiloisia lohia. Suurin koskaan saatu yksilö painoi peräti 68 naulaa, noin 31 kiloa." },
      { q: "Millä tekniikalla Namsenin lohta perinteisesti pyydetään?", a: "Leveällä joella käytetään usein \"harling\"-menetelmää, jossa vieheitä vedetään hitaasti liikkuvan veneen perässä rannalta rannalle. Ylävirtaan uiva lohi kohtaa vieheen tällä tavalla luonnollisesti." },
    ],
    Nordland: [
      { q: "Mikä tekee Vegan saariryhmästä UNESCOn maailmanperintökohteen?", a: "Vegan saarilla asukkaat ovat yli 1 500 vuoden ajan eläneet kalastuksella ja haahkansulan keruulla ankarissa oloissa. Kohde otettiin maailmanperintölistalle vuonna 2004 Norjan ensimmäisenä kulttuurimaisemana." },
      { q: "Millaisia ovat Vegan saarten haahkantalot?", a: "Karuille ulkoluodoille rakennettiin pieniä kivisiä pönttömäisiä taloja, joissa haahkanaaraat pesivät suojassa. Untuvaa kerättiin pesän tyhjennyttyä, ja siitä valmistettiin arvostettuja untuvapeittoja jopa kuninkaallisille asiakkaille." },
    ],
    Oppland: [
      { q: "Mitä Lillehammerissa tapahtui helmikuussa 1994?", a: "Lillehammer isännöi talviolympialaisia 12.–27. helmikuuta 1994, ja siitä tuli pohjoisin kaupunki, joka on koskaan järjestänyt olympialaiset. Kisat levittäytyivät kymmeneen paikkaan Opplandin ja Hedmarkin alueella." },
      { q: "Mitä pysyvää hyötyä Lillehammerin olympialaisista jäi alueelle?", a: "Kisoja varten rakennettu kansainvälinen lähetyskeskus mahdollisti Storhoven korkeakoulun kasvun; opiskelijamäärä nousi noin 600:sta yli 6 000:een parissa vuosikymmenessä." },
    ],
    Oslo: [
      { q: "Mikä tekee Vigelandin puistosta ainutlaatuisen?", a: "Frognerpuistossa sijaitseva Vigelandin puisto on maailman suurin yhden taiteilijan tekemä veistospuisto: siinä on yli 200 Gustav Vigelandin veistosta pronssista, graniitista ja raudasta. Puistoa rakennettiin pääosin vuosina 1939–1949." },
      { q: "Mitä Vigelandin veistokset kuvaavat?", a: "Veistokset esittävät ihmiselämän kiertokulkua vauvasta vanhuuteen ja kaikkia niiden väliin mahtuvia tunteita. Puisto on ilmainen, ja siellä vierailee vuosittain yli miljoona kävijää." },
    ],
    Rogaland: [
      { q: "Miksi Stavangeria kutsutaan Norjan öljypääkaupungiksi?", a: "Joulukuussa 1969 Ekofisk-kentältä Pohjanmereltä löytyi valtava öljy- ja kaasuesiintymä, joka muutti koko Norjan talouden suunnan. Stavangeriin keskittyi nopeasti öljy-yhtiöiden pääkonttoreita ja palveluyrityksiä." },
      { q: "Kuinka suuri vaikutus Ekofiskin löydöllä oli Norjaan?", a: "Ennen löytöä Norja oli öljyn tuoja ja velkaantunut maa, mutta löydön jälkeen siitä kehittyi vuosikymmenten kuluessa yksi maailman vauraimmista valtioista valtavan öljyrahaston ansiosta." },
    ],
    "Sogn og Fjordane": [
      { q: "Miksi Flåmin rautatietä pidetään yhtenä maailman upeimmista?", a: "Flåmsbana on yksi maailman jyrkimmistä normaaliraiteisista rautateistä: 80 % matkasta kulkee 5,5 % nousussa Myrdalin ja Flåmin välillä. Radan rakentaminen kesti vuodesta 1923 vuoteen 1940." },
      { q: "Kuinka monta tunnelia Flåmsbanan radalla on?", a: "Radalla on 20 tunnelia, ja 18 niistä louhittiin käsin ilman nykyaikaisia koneita. Rata laskee 866 metriä matkalla, joka on vain 20,2 kilometriä pitkä." },
    ],
    "Sør-Trøndelag": [
      { q: "Mikä on Fosenin tuulipuisto, ja miksi se on kiistanalainen?", a: "Fosenin niemimaalla sijaitsee Euroopan suurin manner-tuulipuisto, mutta Norjan korkein oikeus totesi vuonna 2021 sen loukkaavan saamelaisten poronhoitajien oikeuksia. Turbiinit häiritsevät perinteisiä poronhoitoreittejä." },
      { q: "Ratkaistiinko Fosenin kiista lopulta?", a: "Vuonna 2024 hallitus ja saamelaiset pääsivät sopimukseen, jonka mukaan tuulivoimalat saavat jäädä käyntiin, mutta poronhoitokulttuurin suojaamiseksi otettiin käyttöön uusia toimenpiteitä." },
    ],
    Telemark: [
      { q: "Miksi hiihtotekniikkaa kutsutaan \"telemarkiksi\"?", a: "Tekniikka on saanut nimensä Telemarkin maakunnasta, jossa Morgedalin kylästä kotoisin oleva Sondre Norheim kehitti 1800-luvulla vapaakantaisen siteen ja käännöstekniikan. Hän esitteli tyylinsä julkisesti Kristianiassa vuonna 1868." },
      { q: "Mikä tekee telemark-hiihdosta erilaista kuin alppihiihdosta?", a: "Telemark-siteessä vain kärki on kiinni suksessa, kantapää nousee vapaasti irti, mikä mahdollistaa polvea koukistavan käännösliikkeen. Norheimia pidetään nykyaikaisen hiihdon isänä." },
    ],
    Troms: [
      { q: "Miksi valaita voi bongata Tromssan seudulla juuri talvella?", a: "Marraskuusta tammikuuhun miekkavalaat ja ryhävalaat kerääntyvät Skjervøyn ja Kvænangenin vesille syömään silliparvia. Ilmiö on kasvattanut suosiotaan talviristeilyjen ja retkien myötä 2010-luvulta lähtien." },
      { q: "Kuinka kaukana Skjervøy on Tromssasta?", a: "Skjervøy sijaitsee noin 250 kilometrin päässä Tromssasta, ja retket sinne yhdistävät usein bussi- tai minibussikyydin veneellä tehtävään valaidenkatseluun." },
    ],
    "Vest-Agder": [
      { q: "Miksi Kristiansandin kaupunkisuunnitelma on niin poikkeuksellinen?", a: "Kuningas Christian IV perusti kaupungin vuonna 1641 ja määräsi sille tiukan ruudukkomuotoisen katusuunnitelman renessanssi-ihanteiden mukaan. Kadut tehtiin poikkeuksellisen leveiksi tulipalojen leviämisen estämiseksi." },
      { q: "Miksi Kvadraturen-alue on vielä nykyään tunnistettavissa?", a: "Alkuperäinen 1600-luvun ruudukko seitsemine pohjois-eteläkatuineen ja kymmenine itä-länsikatuineen on säilynyt lähes muuttumattomana yli 380 vuotta, ja se tunnetaan nykyään nimellä Kvadraturen." },
    ],
    Vestfold: [
      { q: "Miksi Sandefjordia kutsuttiin maailman valaanpyyntipääkaupungiksi?", a: "1900-luvun alusta toisen maailmansodan jälkeiseen aikaan asti suurin osa maailman valaanpyyntilaivojen omistajista ja miehistöstä tuli Sandefjordista, mikä teki kaupungista Norjan rikkaimman." },
      { q: "Mitä Sandefjordin valaanpyyntimuseossa voi nähdä?", a: "Museo on Euroopan ainoa täysin valaisiin ja valaanpyyntiin keskittynyt museo, ja siellä roikkuu katosta 21 metriä pitkä täysikokoinen sinivalaan jäljitelmä." },
    ],
    Østfold: [
      { q: "Mitä tapahtui Fredriksten linnoituksessa Haldenissa vuonna 1718?", a: "Ruotsin kuningas Kaarle XII kaatui piiritystä johtaessaan, kun luoti osui häneen linnoitusta tarkastaessa. Hänen kuolemansa päätti Ruotsin valloitusyritykset Norjaan." },
      { q: "Miksi Kaarle XII:n kuolemalla oli laajempi historiallinen merkitys?", a: "Tapahtuma vauhditti Ruotsin suurvalta-aseman päättymistä ja niin kutsutun vapauden ajan alkua, kun rauha solmittiin muutaman vuoden kuluttua Uudenkaupungin rauhassa." },
    ],
  },
  DNK: {
    Nordjylland: [
      { q: "Mitä Lindholm Højen viikinkikalmistossa löytyy?", a: "Aalborgin liepeillä sijaitseva Lindholm Høje on yli 700 haudan hautausmaa rautakaudelta ja viikinkiajalta, ja monet haudat on merkitty kivillä laivan muotoisiksi. Tuulen kuljettama hiekka peitti paikan vuosisatoja, mikä säilytti sen poikkeuksellisen hyvin." },
      { q: "Miksi laivanmuotoiset kivilatomukset olivat viikingeille tärkeitä?", a: "Kivistä ladottu laivan hahmo symboloi vainajan matkaa tuonpuoleiseen, ja koko yli sata laivasettausta paikassa tekee siitä yhden Skandinavian suurimmista viikinkiaikaisista kalmistoista." },
    ],
    Midtjylland: [
      { q: "Kuka on Tollundin mies ja mistä hänet löydettiin?", a: "Silkeborgin lähellä suosta löytyi 1950 rautakautinen suomuumio, jonka kasvot ja ilme ovat säilyneet niin hyvin, että hänet on ajoitettu yli 2 300 vuoden ikäiseksi. Hänen kaulassaan oli yhä köysi, joka viittaa väkivaltaiseen kuolemaan." },
      { q: "Miksi suo säilytti Tollundin miehen niin täydellisesti?", a: "Suon hapettomat, happamat olosuhteet estävät bakteerien toiminnan ja voivat säilyttää ihon ja kasvonpiirteet vuosituhansiksi, vaikka luusto usein liukenee samalla pois." },
    ],
    Hovedstaden: [
      { q: "Miksi Tivoli on niin merkittävä huvipuistojen historiassa?", a: "Kööpenhaminan Tivoli avattiin 1843 ja on yksi maailman vanhimmista yhä toimivista huvipuistoista. Walt Disneyn kerrotaan saaneen siitä inspiraatiota vieraillessaan puistossa ennen Disneylandin suunnittelua." },
      { q: "Mitä Tivolin puutarhoissa on säilynyt alkuperäisestä asusta?", a: "Puiston satumaiset puutarhat, itämaisvaikutteiset rakennukset ja ilotulitukset ovat osa perustajan Georg Carstensenin alkuperäistä visiota, ja puisto on uudistunut jatkuvasti menettämättä tunnelmaansa." },
    ],
    Sjaælland: [
      { q: "Ketkä on haudattu Roskilden tuomiokirkkoon?", a: "Roskilden tuomiokirkko on toiminut Tanskan kuninkaiden hautapaikkana keskiajalta lähtien, ja siellä lepää yli 40 kuningasta ja kuningatarta. Kirkko on Unescon maailmanperintökohde." },
      { q: "Miksi Roskilden tuomiokirkko oli aikanaan arkkitehtoninen uutuus Pohjolassa?", a: "1100–1200-luvulla rakennettu tiilikirkko oli ensimmäisiä goottilaisia tiilirakennuksia Skandinaviassa, ja se toimi mallina monille myöhemmille Pohjois-Euroopan tiilikirkoille." },
    ],
    Syddanmark: [
      { q: "Missä Hans Christian Andersen syntyi ja vietti lapsuutensa?", a: "Satukirjailija Hans Christian Andersen syntyi Odensessa 1805 köyhään suutariperheeseen, ja hänen lapsuudenkotinsa on nykyään osa kaupungin Andersen-museokokonaisuutta." },
      { q: "Miksi Odensen H. C. Andersenin museo uudistettiin kokonaan 2021?", a: "Uusi maanalainen museorakennus avattiin 2021 kertomaan Andersenin elämästä ja saduista immersiivisin näyttelyin, ja se yhdistyy vanhaan kaupunginosaan puutarhojen ja käytävien verkolla." },
    ],
  },
  FIN: {
    "South Karelia": [
      { q: "Miksi Saimaan kanava oli merkittävä hanke jo 1800-luvulla?", a: "Vuonna 1856 avattu Saimaan kanava yhdisti Saimaan vesistön Suomenlahteen Viipurin kautta, ja se helpotti valtavasti Itä-Suomen puu- ja muun tavaraliikennettä. Kanava on toiminnassa yhä nykyään, osin Venäjän alueen kautta." },
      { q: "Mikä tekee Lappeenrannan linnoituksesta erityisen?", a: "1700-luvulla rakennettu Linnoitus-kaupunginosa on yksi harvoista säilyneistä venäläisajan linnoitusalueista Suomessa, ja sen vanhat muurit ja kasarmit ovat nykyään museoiden ja käsityöläisten käytössä." },
    ],
    "Southern Ostrobothnia": [
      { q: "Missä arkkitehti Alvar Aalto syntyi?", a: "Alvar Aalto syntyi 1898 Kuortaneella Etelä-Pohjanmaalla, ennen kuin perhe muutti Jyväskylään. Hänestä tuli myöhemmin yksi maailman vaikutusvaltaisimmista arkkitehdeista ja muotoilijoista." },
      { q: "Mistä Etelä-Pohjanmaan 'puukkojunkkarit' saivat maineensa?", a: "1800-luvun puolivälissä alueella riehui puukkoja käyttävien häjyjen väkivaltainen alakulttuuri, joka teki Etelä-Pohjanmaasta pelätyn seudun – ilmiö hälveni vasta vuosisadan loppua kohti." },
    ],
    "Southern Savonia": [
      { q: "Milloin Olavinlinna Savonlinnassa rakennettiin ja miksi?", a: "Olavinlinna perustettiin 1475 puolustamaan Ruotsin itärajaa Novgorodia vastaan, ja se on Pohjoismaiden pohjoisin ja itäisin keskiaikainen kivilinna. Linnassa järjestetään nykyään kesäisin oopperajuhlat." },
      { q: "Kuinka pitkään Savonlinnan oopperajuhlia on järjestetty?", a: "Oopperajuhlat on järjestetty linnan pihalla vuodesta 1912 lähtien (nykyisessä muodossaan vuodesta 1967), ja ne ovat yksi Pohjoismaiden arvostetuimmista oopperatapahtumista." },
    ],
    Kainuu: [
      { q: "Mitä Paltaniemen kirkossa on erikoista?", a: "Kajaanin liepeillä sijaitsevan 1700-luvun puukirkon sisäkatto ja seinät on maalattu täyteen kansanomaisia raamatunaiheisia maalauksia, jotka maalasi taidemaalari Emanuel Granberg 1778–1781." },
      { q: "Miksi Vuokatti on tunnettu urheilupaikkakuntana?", a: "Vuokatin tunturi- ja hiihtokeskus on Suomen tärkeimpiä huippu-urheilun harjoituspaikkoja, ja sen maanalainen hiihtotunneli mahdollistaa hiihtoharjoittelun ympäri vuoden lämpötilasta riippumatta." },
    ],
    "Tavastia Proper": [
      { q: "Kuka syntyi Hämeenlinnassa vuonna 1865?", a: "Säveltäjä Jean Sibelius syntyi Hämeenlinnassa 1865, ja hänen lapsuudenkotinsa on nykyään museona. Hämeenlinnaa markkinoidaan yhä Sibeliuksen kaupunkina." },
      { q: "Mikä on Hämeen linna ja milloin se rakennettiin?", a: "Keskiaikainen tiilinen Hämeen linna Vanajaveden rannalla rakennettiin 1200–1300-luvuilla, ja se toimi myöhemmin myös vankilana 1800- ja 1900-luvuilla ennen museoksi muuttumistaan." },
    ],
    "Central Ostrobothnia": [
      { q: "Mikä tekee Kaustisen kansanmusiikkijuhlista niin merkittävät?", a: "Vuodesta 1968 järjestetty Kaustisen kansanmusiikkijuhla on yksi maailman suurimmista ja arvostetuimmista kansanmusiikkifestivaaleista, ja se kokoaa joka heinäkuu pelimanniyhtyeitä ympäri maailmaa." },
      { q: "Miksi Kaustinen tunnetaan pelimannimusiikin keskuksena?", a: "Seudulla on ollut poikkeuksellisen elinvoimainen viulunsoitto- ja pelimanniperinne sukupolvien ajan, ja monet Suomen tunnetuimmista kansanmuusikoista ovat kotoisin juuri Kaustiselta." },
    ],
    "Central Finland": [
      { q: "Miksi Jyväskylää kutsutaan Alvar Aallon kaupungiksi?", a: "Alvar Aalto vietti lapsuutensa ja nuoruutensa Jyväskylässä ja suunnitteli kaupunkiin myöhemmin lukuisia rakennuksia, kuten yliopiston kampuksen. Kaupungissa on tämän ansiosta poikkeuksellisen paljon hänen arkkitehtuuriaan." },
      { q: "Mikä on Päijänne ja miksi se on tärkeä Keski-Suomelle?", a: "Päijänne on Suomen toiseksi suurin järvi, ja se on ollut vuosisatoja tärkeä uitto- ja liikennereitti Keski-Suomen metsäteollisuudelle. Se toimii nykyään myös pääkaupunkiseudun raakavesilähteenä tunnelin kautta." },
    ],
    Kymenlaakso: [
      { q: "Mikä tekee Verlan tehdasalueesta maailmanperintökohteen?", a: "Verlan puuhiomo ja pahvitehdas Jaalassa toimi 1880-luvulta 1960-luvulle, ja koko tehdasalue rakennuksineen ja työläisasuntoineen on säilynyt niin hyvin, että Unesco nimesi sen maailmanperinnöksi 1996." },
      { q: "Miksi Kotka rakennettiin alun perin linnoituskaupungiksi?", a: "Venäjä rakensi Kotkan seudulle linnoituksia 1700-luvun lopulla vahvistaakseen uutta rajaansa Ruotsia vastaan Haminan rauhan 1809 jälkeen, ja kaupunki kasvoi myöhemmin sahateollisuuden ympärille." },
    ],
    Lapland: [
      { q: "Miksi Rovaniemi rakennettiin sotien jälkeen kokonaan uudelleen?", a: "Saksalaiset joukot polttivat Rovaniemen käytännössä maan tasalle vetäytyessään 1944, ja arkkitehti Alvar Aalto suunnitteli kaupungille uuden asemakaavan, jonka pääkatuverkosto muistuttaa ylhäältä poronpäätä." },
      { q: "Mistä Joulupukin virallinen kotikylä löytyy?", a: "Rovaniemellä napapiirin kohdalla sijaitseva Joulupukin Pajakylä on rakennettu 1985 alkaen, ja se houkuttelee nykyään satojatuhansia matkailijoita vuodessa ympäri maailmaa." },
    ],
    Pirkanmaa: [
      { q: "Miksi Tamperetta kutsuttiin aikoinaan 'Suomen Manchesteriksi'?", a: "Tampereen koskien voimalla toimi 1800-luvulta lähtien laajoja tekstiili- ja metalliteollisuuslaitoksia, kuten Finlaysonin pumpulitehdas, ja teollistuminen muistutti englantilaista teollisuuskaupunkia." },
      { q: "Mikä on Näsinneula ja mistä sen näkee?", a: "168 metriä korkea Näsinneulan näkötorni valmistui 1971 Särkänniemen huvipuiston yhteyteen, ja sen huipulta näkee selkeällä säällä kymmenien kilometrien päähän." },
    ],
    Ostrobothnia: [
      { q: "Miksi Vaasa on Suomen ruotsinkielisin suurempi kaupunki?", a: "Pohjanmaan rannikkoseudulla on ollut ruotsinkielistä asutusta keskiajalta lähtien, ja Vaasan seudulla ruotsia puhuu yhä huomattava osa väestöstä – kaksikielisyys näkyy katukuvassa ja kouluissa." },
      { q: "Mikä teki Vaasan kaupasta merkittävän 1700–1800-luvulla?", a: "Vaasa oli tärkeä laivanvarustuksen ja tervakaupan keskus, ja kaupungin porvarit rikastuivat purjelaivoilla käydystä ulkomaankaupasta ennen kuin höyrylaivat ja rautatiet muuttivat kauppareitit." },
    ],
    "North Karelia": [
      { q: "Miksi Ilomantsi on erityinen kunta Suomen kartalla?", a: "Ilomantsi on Suomen ja koko Euroopan unionin itäisin kunta, ja alueella on vahva ortodoksinen ja karjalainen perinne, joka näkyy muun muassa kylien kirkoissa ja ruokakulttuurissa." },
      { q: "Mikä on runonlaulun perinne Pohjois-Karjalassa?", a: "Alueen kylissä kerättiin 1800-luvulla runsaasti kansanrunoutta, jota Elias Lönnrot hyödynsi Kalevalan koostamisessa, ja runolaulun perinnettä vaalitaan yhä muun muassa Ilomantsin Parppeinvaaran runokylässä." },
    ],
    "Northern Ostrobothnia": [
      { q: "Miksi Oulu oli 1600–1800-luvulla kansainvälisesti tärkeä kaupunki?", a: "Oulu oli maailman johtava tervanvientikaupunki, ja sen satamasta lähti purjelaivojen rakennusaineeksi käytettyä tervaa ympäri Eurooppaa – tervanpoltto teki alueen talonpojista aikanaan varakkaita." },
      { q: "Miten Oulusta tuli merkittävä teknologiakaupunki?", a: "Nokian matkapuhelinteollisuus ja Oulun yliopiston tietotekniikan tutkimus loivat 1990-luvulla alueelle vahvan teknologiaklusterin, jota kutsutaan yhä 'Oulu-ilmiöksi'." },
    ],
    "Northern Savonia": [
      { q: "Mikä on Puijon näkötorni ja mitä sen huipulta näkee?", a: "Kuopion Puijon vaaralla kohoava näkötorni tarjoaa näkymän kymmenien kilometrien päähän järvien ja metsien mosaiikkiin, ja tornissa on myös pyörivä ravintola." },
      { q: "Miksi savusauna on erityisen tärkeä osa Pohjois-Savon perinnettä?", a: "Alueella on säilynyt poikkeuksellisen paljon perinteisiä savusaunoja, joissa tuli lämmittää kiukaan kivet ilman hormia, ja Pohjois-Savon savusaunakulttuuri on ehdolla Unescon aineettomaan kulttuuriperintöön." },
    ],
    "Päijät-Häme": [
      { q: "Miksi Lahti on tunnettu muotoilukaupunkina?", a: "Lahdessa on vahva huonekalu- ja teollisen muotoilun perinne 1900-luvun alusta lähtien, ja kaupungissa toimii muun muassa muotoiluun erikoistunut ammattikorkeakoulu ja useita designyrityksiä." },
      { q: "Mikä on Vesijärvi ja mihin sitä on aikoinaan käytetty?", a: "Lahden kupeessa sijaitseva Vesijärvi toimi 1900-luvulla vilkkaana uittoväylänä ja teollisuuden jätevesien vastaanottajana, mikä rehevöitti sen pahoin – järveä on sittemmin kunnostettu vuosikymmenten ajan." },
    ],
    Satakunta: [
      { q: "Miksi Pori Jazz on niin arvostettu festivaali?", a: "Vuodesta 1966 järjestetty Pori Jazz on yksi Euroopan vanhimmista ja tunnetuimmista jazzfestivaaleista, ja sen lavoilla on esiintynyt lukuisia kansainvälisiä jazz- ja populaarimusiikin suurnimiä." },
      { q: "Mikä teki Porista aikoinaan merkittävän kauppakaupungin?", a: "Porin satama oli 1800-luvulla vilkas puutavaran vientisatama, ja kaupungin porvaristo vaurastui purjelaivakaupasta – monet aikakauden komeat puutalot ovat säilyneet keskustassa tähän päivään." },
    ],
    Uusimaa: [
      { q: "Miksi Suomenlinna on Unescon maailmanperintökohde?", a: "Ruotsi alkoi rakentaa Helsingin edustan saarille Suomenlinnan merilinnoitusta 1748 puolustamaan itärajaa, ja linnoitus on säilynyt poikkeuksellisen hyvin – nykyään siellä asuu myös vakituisia asukkaita." },
      { q: "Mikä teki Helsingistä Suomen pääkaupungin vuonna 1812?", a: "Venäjän keisari Aleksanteri I siirsi pääkaupungin Turusta Helsinkiin, koska se sijaitsi lähempänä Pietaria ja oli helpompi puolustaa mereltä – kaupunki rakennettiin sen jälkeen uudelleen empiretyyliin." },
    ],
    "Finland Proper": [
      { q: "Miksi Turkua pidetään Suomen vanhimpana kaupunkina?", a: "Turku syntyi keskiajalla Aurajoen varrelle ja toimi Suomen hallinnollisena ja kirkollisena keskuksena satojen vuosien ajan, kunnes pääkaupunki siirrettiin Helsinkiin 1812." },
      { q: "Mikä on Turun linna ja milloin se rakennettiin?", a: "Turun linna perustettiin 1280-luvulla Aurajoen suulle, ja se on yksi Pohjoismaiden suurimmista säilyneistä keskiaikaisista linnoista – sen kivimuurien sisällä on eletty seitsemän vuosisadan ajan." },
    ],
  },
  BEL: {
    Antwerp: [
      { q: "Miksi Antwerpenia kutsutaan maailman timanttipääkaupungiksi?", a: "Antwerpenin pieni timanttikorttelin alue käsittelee jopa noin 80–85 % maailman raakatimanteista – kauppa juontaa yli 500 vuoden taakse, Intiasta tuotuihin ensimmäisiin kiviin." },
      { q: "Kuka oli Antwerpenin kuuluisin maalari?", a: "Barokkimestari Peter Paul Rubens asui ja työskenteli Antwerpenissa, ja kaupungin Notre Damen katedraalissa on edelleen useita hänen suurteoksiaan nähtävillä." },
    ],
    Brussels: [
      { q: "Mikä pieni patsas on Brysselin symboli?", a: "Manneken Pis, pissivä poikapatsas, on ollut kaupungin suihkulähteenä 1300-luvulta lähtien; nykyinen pronssiversio on vuodelta 1619, ja sille puetaan tuhansia erilaisia asuja." },
      { q: "Mihin tilaisuuteen Atomium rakennettiin?", a: "Atomium pystytettiin Brysselin maailmannäyttelyyn Expo 58:aan symboloimaan rauta-atomin kidehilaa – siitä tuli pysyvä nähtävyys, joka seisoo edelleen paikallaan." },
    ],
    "Flemish Brabant": [
      { q: "Miksi Leuven on Belgian yliopistokaupunkien kärjessä?", a: "Leuvenin katolinen yliopisto perustettiin vuonna 1425 paavi Martin V:n luvalla, ja se on Alankomaiden historiallisen alueen vanhin yliopisto." },
      { q: "Mistä Stella Artois -olut on kotoisin?", a: "Panimoperinne juontaa Leuvenista, jossa Den Hoornin panimo toimi jo 1360-luvulla; Artois-suku otti panimon haltuunsa 1700-luvun alussa." },
    ],
    Hainaut: [
      { q: "Mikä juhla Monsissa on Unescon listalla?", a: "Monsin Doudou-juhla ja siihen kuuluva lohikäärmetaistelu Lumeçon on merkitty Unescon aineettoman kulttuuriperinnön listalle vuonna 2005, ja perinne juontaa 1300-luvulle." },
      { q: "Miksi Charleroita kutsutaan katutaiteen kaupungiksi?", a: "Entinen kaivos- ja teollisuuskaupunki Charleroi on täynnä suurikokoisia seinämaalauksia; Urban Dream -hanke on tuonut kaupunkiin kymmeniä monumentaalisia freskoja vuodesta 2014." },
    ],
    "East Flanders": [
      { q: "Mikä maalaus tekee Gentin Pyhän Baavon katedraalista kuuluisan?", a: "Van Eyckin veljesten vuonna 1432 valmistunut Gentin alttaritaulu on historian varastetuin taideteos – yksi sen paneeleista on edelleen kadoksissa vuosikymmenten takaa." },
      { q: "Kuinka pitkä Gentin kesäjuhla on?", a: "Gentse Feesten valtaa koko vanhankaupungin heinäkuussa noin kymmeneksi päiväksi ja kerää noin miljoona kävijää – yksi Euroopan suurimmista ilmaisista katujuhlista." },
    ],
    Liege: [
      { q: "Kuka kuuluisa kirjailija syntyi Liègessä?", a: "Komisario Maigret -dekkarien luoja Georges Simenon syntyi Liègessä 1903 ja on yksi maailman luetuimmista belgialaiskirjailijoista, yli 500 miljoonaa myytyä kirjaa." },
      { q: "Mikä on Montagne de Bueren?", a: "374 porrasaskelman rappu Liègen keskustassa nousee jyrkkää rinnettä ylös linnoitukselle; se rakennettiin 1880-luvulla muistoksi kaupunkia 1400-luvulla puolustaneille sotureille." },
    ],
    Limburg: [
      { q: "Mikä on Bokrijk?", a: "Bokrijk on Euroopan suurimpia ulkoilmamuseoita: yli 140 vanhaa flaamilaista rakennusta on siirretty samaan puistoon Genkin lähelle kertomaan maaseudun elämästä ennen teollistumista." },
      { q: "Miksi Hasselt on Belgian katajaviinan kaupunki?", a: "Hasselt on ollut jenever-katajaviinan valmistuksen keskus 1600-luvulta lähtien, ja kaupungin Jenevermuseumissa toimii yhä oikea, käyvä tislaamo." },
    ],
    Luxembourg: [
      { q: "Mitä tapahtui Bastognessa joulun 1944 alla?", a: "Saksalaiset vaativat piiritetyn Bastognen amerikkalaisjoukkoja antautumaan Ardennien hyökkäyksen aikana; kenraali McAuliffe vastasi yhdellä sanalla: 'Nuts!' – suunnilleen 'painukaa hiiteen'." },
      { q: "Mikä pieni kaupunki väittää olevansa maailman pienin?", a: "Durbuy on markkinoinut itseään 'maailman pienimpänä kaupunkina' aina 1300-luvulta asti, vaikka virallisesti tittelin omistaa Belgiassa nykyään Mesen." },
    ],
    "West Flanders": [
      { q: "Miksi Brugge on saanut lisänimen 'Pohjolan Venetsia'?", a: "Bruggen keskiaikaiset kanaalit, kellotorni ja ehjä vanhakaupunki ovat Unescon maailmanperintökohde – kaupunki säilyi lähes koskemattomana, kun kauppareitit siirtyivät muualle 1500-luvulla." },
      { q: "Mikä ikivanha muistoseremonia toistuu Ypresissä joka ilta?", a: "Menin Gate -muistoportilla on soitettu Last Post -iskukutsu joka ilta vuodesta 1928 (saksalaismiehitystä lukuun ottamatta) muistoksi ensimmäisessä maailmansodassa kaatuneista." },
    ],
    Namur: [
      { q: "Mitä Grottes de Han -luolissa pääsee näkemään?", a: "Hanin luolat Namurin maakunnassa ovat Belgian suosituimpia nähtävyyksiä maan alla: Lesse-joki on kaivertanut vuosituhansien saatossa käytäviä ja saleja, joita kierretään opastetulla retkellä." },
      { q: "Kuinka suuri Namurin linnoitus on?", a: "Namurin sitadelli sijaitsee Sambre- ja Meuse-jokien yhtymäkohdassa ja on yksi Euroopan laajimmista linnoituksista – maanalaisia käytäviä siellä on yli 7 kilometriä." },
    ],
    "Walloon Brabant": [
      { q: "Miksi Louvain-la-Neuve on Belgian nuorin kaupunki?", a: "Louvain-la-Neuve rakennettiin tyhjästä 1970-luvulla, kun Leuvenin yliopisto jaettiin kielikiistojen seurauksena – ranskankielinen osa muutti kokonaan uuteen kaupunkiin." },
      { q: "Mikä rauniokohde kertoo alueen luostarihistoriasta?", a: "Villersin luostarin rauniot Villers-la-Villessa ovat yksi Belgian vaikuttavimmista keskiaikaisista kohteista; sistanssilaisluostari perustettiin 1146, ja parhaimmillaan siellä asui noin 400 munkkia." },
    ],
  },
  IRL: {
    Carlow: [
      { q: "Miksi Carlow oli sähkövalaistuksen edelläkävijä?", a: "Carlow'n kaupunki alkoi valaista katujaan sähköllä kesäkuussa 1891 – Milfordin myllyn vesivoimalla tuotettu virta teki siitä ensimmäisen sisämaan kaupungin Irlannissa tai Britanniassa, jossa oli sähköiset katuvalot." },
      { q: "Mikä on Carlow Collegen erikoisuus?", a: "Piispa James Keeffen vuonna 1782 perustama Carlow College on Irlannin toiseksi vanhin korkeakoulu – se toimi vuosikymmeniä sekä maallikko-oppilaitoksena että papinseminaarina." },
    ],
    Cavan: [
      { q: "Miksi Cavania kutsutaan järvien maakunnaksi?", a: "Cavanissa on perimätiedon mukaan 365 järveä, yksi joka päivälle vuodessa – siksi maakuntaa kutsutaan Lakeland Countyksi, vaikka tarkkaa lukua kukaan ei ole koskaan varmistanut." },
      { q: "Mitä Cavan Burren Puistosta löytyy?", a: "Cavanin oma 'Burren', kalkkikivitasanne Cuilcagh-vuoren juurella, kätkee kivikautisia dolmeneja ja porttihautoja – alue on osa Marble Arch Cavesin Unescon geoparkkia." },
    ],
    Clare: [
      { q: "Missä elokuvissa Moherin kalliot ovat esiintyneet?", a: "Moherin kalliot toimivat kuvauspaikkana Harry Potter ja Puoliverinen prinssi -elokuvassa, kun Harry ja Dumbledore etsivät kammiota luolasta, ja klassikkokomediassa Prinsessa Bride niistä tuli 'Hulluuden kalliot'." },
      { q: "Mitä Bunrattyn linnassa voi kokea?", a: "1400-luvulla rakennettu Bunrattyn linna on yksi Irlannin parhaiten säilyneistä tornitaloista, ja sen suuressa salissa on järjestetty keskiaikaisia illallisjuhlia vuodesta 1963." },
    ],
    Cork: [
      { q: "Mitä Blarneyn kivi lupaa suutelijalleen?", a: "Blarneyn linnan muuriin kiinnitetyn kiven suuteleminen tuo perinteen mukaan puhelahjan – matkailijat kumartuvat vuosittain vaarallisen näköiseen asentoon saadakseen 'irlantilaisen suulaudan'." },
      { q: "Miksi kuningatar Elisabet II vieraili Corkin English Marketissa?", a: "Vuonna 1788 perustettu English Market on yksi maailman vanhimmista toimivista kauppahalleista, ja kuningatar Elisabet II vieraili siellä valtiovierailullaan 2011 tutustuen paikallisiin kauppiaisiin." },
    ],
    Donegal: [
      { q: "Missä elokuvassa Malin Head esiintyi?", a: "Irlannin pohjoisin piste Malin Head Donegalissa toimi kuvauspaikkana Tähtien sota: Viimeinen jedi -elokuvassa vuonna 2016, kun jyrkät kalliot muuttuivat planeetta Ahch-Toksi." },
      { q: "Mikä majakka Donegalissa on tunnettu kaunottareksi?", a: "Fanad Headin majakka Donegalin niemellä on toistuvasti nimetty yhdeksi maailman kauneimmista majakoista sen dramaattisen sijainnin ja punavalkoisen tornin ansiosta." },
    ],
    Dublin: [
      { q: "Mikä on Kellsin kirja?", a: "Trinity Collegen kirjastossa säilytettävä Kellsin kirja on noin vuonna 800 tehty koristeltu evankeliumikäsikirjoitus, jonka mutkikkaat kuvitukset houkuttelevat puoli miljoonaa kävijää vuosittain." },
      { q: "Mistä Ha'penny Bridge sai nimensä?", a: "Liffey-joen ylittävä rautasilta avattiin 1816, ja sen rakentaja sai kerätä puolen pennyn tullimaksun ylittäjiltä sata vuotta – siitä juontuu lempinimi 'Puolipennysilta', joka jäi elämään virallisen nimen unohduttua." },
    ],
    "Dún Laoghaire–Rathdown": [
      { q: "Mikä yhdistää Sandycoven martellotornin ja James Joycen?", a: "James Joyce yöpyi Sandycoven martellotornissa syksyllä 1904, ja sama torni on myös näyttämönä hänen romaaninsa Ulysses avausluvulle – nykyään tornissa toimii pieni Joyce-museo." },
      { q: "Miksi Killineyn lahtea verrataan Napolinlahteen?", a: "Killineyn lahden pehmeä kaari ja Sugarloafin huippu muistuttavat niin paljon Napolinlahtea ja Vesuviusta, että 1800-luvun varakkaat dublinilaiset nimesivät alueen tiet Vicon ja Sorrenton mukaan." },
    ],
    Fingal: [
      { q: "Kuinka pitkään Talbotin suku asui Malahiden linnassa?", a: "Talbotin suku asui Malahiden linnassa yhtäjaksoisesti melkein 800 vuotta, vuodesta 1185 vuoteen 1973 – ainoa katkos oli Cromwellin aikaan, kun linna vaihtoi hetkeksi omistajaa." },
      { q: "Mikä tekee Skerries Millsistä ainutlaatuisen Euroopassa?", a: "Skerries Millsin alueella Fingalissa on Euroopan ainoa paikka, jossa on kaksi kunnostettua myllyä, vesimylly ja leipomo samassa pihapiirissä – vanhin mylly juontaa juurensa 1400-luvulle." },
    ],
    Galway: [
      { q: "Mistä Claddaghin sormus on peräisin?", a: "Perinteinen Claddaghin sormus – sydän, kruunu ja kädet – syntyi Galwayn kalastajakylä Claddaghissa 1600-luvulla, ja tarinan mukaan sen suunnitteli orjuudesta paennut kultaseppä Richard Joyce." },
      { q: "Mikä on Dún Aonghasa?", a: "Aranin saarilla sijaitseva Dún Aonghasa on esihistoriallinen kivilinnake, joka kohoaa sata metriä meren yläpuolella olevalla kalliolla ilman minkäänlaista suojakaidetta – sitä käytettiin jo noin 1100 eaa." },
    ],
    Kerry: [
      { q: "Miksi Skellig Michael tunnetaan munkeista?", a: "Ankaralla kalliosaarella Skellig Michaelilla asui 500-luvulta lähtien munkkeja lähes 600 vuoden ajan mehiläispesän muotoisissa kivimajoissa – nykyään saari tunnetaan myös Star Wars -elokuvien kuvauspaikkana." },
      { q: "Kuka oli Fungie?", a: "Fungie oli Dinglen lahdella vuosikymmenten ajan asustanut yksinäinen pullokuonodelfiini, joka ilmestyi ensin 1983 ja katosi jäljettömiin 2020 – Guinnessin ennätyskirja nimesi sen pisimpään eläneeksi yksinäiseksi delfiiniksi maailmassa." },
    ],
    Kildare: [
      { q: "Kuka suunnitteli Kildaren japanilaisen puutarhan?", a: "Irlannin kansallisen hevossiitoslaitoksen japanilaisen puutarhan Tullyssa suunnitteli japanilainen Tassa Eida poikansa kanssa 1900-luvun alussa – neljäkymmentä työntekijää rakensi sen neljässä vuodessa." },
      { q: "Mikä on Castletown House?", a: "Celbridgessä sijaitseva Castletown House on Irlannin suurin ja komein palladiolaistyylinen kartano, rakennettu 1720-luvulla maan tuolloin rikkaimmalle yksityishenkilölle William Conollylle." },
    ],
    Kilkenny: [
      { q: "Kuinka vanha Smithwick's-panimo on?", a: "John Smithwick perusti Kilkennyyn panimon vuonna 1710 fransiskaaniluostarin raunioille, ja siitä tuli sulkemiseensa 2013 asti Irlannin vanhin toimiva panimo." },
      { q: "Kuka oli Alice Kyteler?", a: "Kilkennyläinen Dame Alice Kyteler tuomittiin noituudesta vuonna 1324 – yksi Euroopan ensimmäisistä kirjatuista noitaoikeudenkäynneistä – ja hänen kotinsa toimii nykyään Kyteler's Inn -ravintolana." },
    ],
    Laoighis: [
      { q: "Mikä on Dunamasen kallio?", a: "Dunamasen kalliolla Laoisissa kohoavat normanniaikaisen linnan rauniot, jotka periytyvät varhaiskristilliseltä linnoitukselta – viikingit ryöstivät paikan jo vuonna 843." },
      { q: "Kuka suunnitteli Emo Courtin?", a: "Emo Courtin uusklassisen kartanon Laoisissa suunnitteli 1790 James Gandon, Dublinin Custom Housen ja Four Courtsin arkkitehti – harvoja hänen suunnittelemiaan yksityiskartanoita." },
    ],
    Leitrim: [
      { q: "Kuka oli Seán MacDiarmada?", a: "Leitrimissä syntynyt Seán MacDiarmada oli yksi seitsemästä miehestä, jotka allekirjoittivat Irlannin itsenäisyysjulistuksen pääsiäiskapinassa 1916 – hänet teloitettiin kapinan kukistamisen jälkeen." },
      { q: "Mikä yhdistää joen Shannonin ja Ernen?", a: "63 kilometrin pituinen Shannon-Erne-kanava kulkee Leitrimin läpi ja yhdistää kuusitoista sulkua käyttäen Shannon-joen Erne-järveen Pohjois-Irlannissa." },
    ],
    Limerick: [
      { q: "Mikä on Limerickin sopimuskivi?", a: "Thomondin sillan päässä oleva karkea kivilohkare muistuttaa vuoden 1691 sopimuksesta, joka päätti Limerickin piirityksen – sopimusta ei koskaan täysin kunnioitettu, minkä takia kaupunkia kutsutaan 'rikotun sopimuksen kaupungiksi'." },
      { q: "Miksi Adare on Limerickin kauneimpia kyliä?", a: "Olkikattoiset kivimökit ja Adare Manorin komea kartano tekevät Adaresta yhden Irlannin valokuvatuimmista kylistä, ja se mainitaan usein maan kauneimpien joukossa." },
    ],
    Longford: [
      { q: "Kuka oli Maria Edgeworth?", a: "Edgeworthstownissa varttunut Maria Edgeworth kirjoitti 1800-luvun alussa Irlannin maaseudun elämästä romaanin Castle Rackrent, jota pidetään yhtenä ensimmäisistä historiallisista romaaneista englanniksi." },
      { q: "Missä Oliver Goldsmith syntyi?", a: "Kirjailija Oliver Goldsmithin syntymäpaikka on kiistanalainen, mutta paikallinen perinne ja perheen omat merkinnät asettavat sen Pallasin kylään Longfordissa lähellä Ballymahonia." },
    ],
    Louth: [
      { q: "Mikä tekee Monasterboicesta erikoisen?", a: "Monasterboicen luostariraunioilla Louthissa seisoo Muiredachin risti, jota pidetään Irlannin hienoimpana korkeana ristinä, sekä 35-metrinen pyöreä torni 900-luvulta." },
      { q: "Mikä myytti liittyy Cooleyn niemimaahan?", a: "Louthin Cooleyn niemimaa on näyttämönä muinaiselle Táin Bó Cúailnge -taruepokselle, jossa sankari Cú Chulainn puolustaa aluetta yksin vihollisarmeijaa vastaan." },
    ],
    Mayo: [
      { q: "Miksi ihmiset kiipeävät Croagh Patrickille paljain jaloin?", a: "Perimätiedon mukaan Pyhä Patrick paastosi 400-luvulla neljäkymmentä päivää Croagh Patrickin huipulla, ja heinäkuun viimeisenä sunnuntaina tuhannet pyhiinvaeltajat kiipeävät vuorelle – osa yhä perinteen mukaan paljain jaloin." },
      { q: "Mikä on Céide Fields?", a: "Mayon suomaan hautautuneet Céide Fieldsin kivimuurit ovat maailman vanhimpia tunnettuja peltojärjestelmiä, noin 5500–6000 vuotta vanhoja – ne löydettiin vasta, kun turvetta leikattiin 1930-luvulla." },
    ],
    Meath: [
      { q: "Kuinka vanha Newgrangen hautakumpu on?", a: "Newgrange rakennettiin noin 3200 eaa., mikä tekee siitä vanhemman kuin Egyptin pyramidit ja Stonehenge – talvipäivänseisauksen aamuna aurinko valaisee sen sisäkammion hetken ajan." },
      { q: "Mitä tapahtui Boynen taistelussa?", a: "Boynen joen rannalla lähellä Droghedaa käytiin 1. heinäkuuta 1690 taistelu, jossa Oranssin Vilhelmin joukot voittivat kuningas Jaakko II:n armeijan – tapahtuma muutti Irlannin ja Britannian valtahistoriaa." },
    ],
    Monaghan: [
      { q: "Mistä Clonesin pitsi syntyi?", a: "Clonesin virkattu pitsi syntyi suuren nälänhädän aikana 1840-luvulla, kun paikallinen pappilan vaimo opetti tekniikan naapurustolle elannoksi – pitsistä tuli pian koko perheen tulonlähde ja sitä myytiin Pariisiin ja New Yorkiin asti." },
      { q: "Kuka on Patrick Kavanagh?", a: "Yksi Irlannin arvostetuimmista runoilijoista, Patrick Kavanagh, syntyi 1904 Inniskeenin kylässä Monaghanissa ja kuvasi runoissaan rehellisesti maaseudun köyhää arkea." },
    ],
    Offaly: [
      { q: "Kuka perusti Clonmacnoisen luostarin?", a: "Pyhä Ciarán perusti Clonmacnoisen luostarin Shannon-joen varrelle vuonna 544, ja siitä kasvoi keskiajalla Euroopan merkittävä oppimiskeskus opiskelijoineen ympäri mannerta." },
      { q: "Miksi Charleville Forest Castle on tunnettu?", a: "Tullamoressa sijaitseva goottilaisrevival-linna Charleville Forest Castle on yksi Irlannin mainituimmista 'kummituslinnoista', ja sen synkät tornit ja käytävät houkuttelevat yhä paranormaalien tutkijoita." },
    ],
    Roscommon: [
      { q: "Mitä Strokestown Parkin kansallinen nälänhätämuseo kertoo?", a: "Strokestown Parkista lähti 1847 kävelymatkalle Dubliniin 1490 nälänhädän runtelemaa siirtolaista, jotka toivoivat pääsevänsä laivalla Amerikkaan – kartanon arkistoista löytyi yli 50 000 asiakirjaa tästä ajasta." },
      { q: "Mikä on Boyle Abbey?", a: "Boylen luostari perustettiin 1161 ensimmäiseksi menestyneeksi sistersiläisluostariksi Connachtin maakunnassa, ja sen kivirauniot muistuttavat yhä keskiaikaisesta munkkiyhteisöstä." },
    ],
    Sligo: [
      { q: "Miksi Carrowmore on merkittävä?", a: "Sligon Carrowmoren megaliittinen hautausmaa on vanhempi kuin Newgrange, noin 700 vuotta, ja se on Irlannin suurin ja vanhin kivikautisten hautakumpujen kokonaisuus." },
      { q: "Mikä saari inspiroi W.B. Yeatsia?", a: "Lough Gill -järven pieni Innisfree-saari innoitti runoilija W.B. Yeatsia kirjoittamaan tunnetun runon 'The Lake Isle of Innisfree', vaikka hän ei koskaan itse asunut saarella." },
    ],
    "South Dublin": [
      { q: "Mitä Tallaghtin nimi tarkoittaa?", a: "Tallaghtin nimi juontuu irlanninkielisestä sanasta Tamhlacht, 'ruttohauta' – legendan mukaan paikalle haudattiin muinoin yhdessä viikossa kuolleet tuhannet ruttoon menehtyneet." },
      { q: "Kuka rakennutti Rathfarnhamin linnan?", a: "Dublinin arkkipiispa Adam Loftus rakennutti Rathfarnhamin linnan vuonna 1583 – tornitalo yhdisti aikansa uusimmat puolustusratkaisut arkkipiispan asemaan sopivaan loistoon." },
    ],
    "North Tipperary": [
      { q: "Miksi Nenaghin linnan pyöreä torni on erikoinen?", a: "Nenaghin linnan yli 30 metriä korkea pyöreä päätorni 1200-luvun alusta on monien mielestä Irlannin hienoin säilynyt normannityylinen kivilinnake, ja Butlerin suku käytti sitä pääasumuksenaan." },
      { q: "Kuinka suuri Lough Derg -järvi on?", a: "Tipperaryn, Claren ja Galwayn rajalla sijaitseva Lough Derg on Irlannin kolmanneksi suurin järvi ja Shannon-joen suurin järvilaajentuma – suosittu veneily- ja kalastuskohde." },
    ],
    "South Tipperary": [
      { q: "Mikä yhdistää Cashelin kallion ja Pyhän Patrickin?", a: "Legendan mukaan Pyhä Patrick kastoi Munsterin kuninkaan Aenghusin Cashelin kalliolla 400-luvulla – vahingossa hän lävisti sauvallaan kuninkaan jalan, jonka tämä kesti hiljaa uskoen sen kuuluvan kasteen menoihin." },
      { q: "Mikä on Cahirin linna?", a: "Suurin osa Suir-joen saarella sijaitsevasta Cahirin linnasta on säilynyt lähes ennallaan 1100-luvulta, ja se on yksi Irlannin suurimmista ja parhaiten säilyneistä linnoista." },
    ],
    Waterford: [
      { q: "Milloin Waterford Crystal perustettiin?", a: "Penrose-veljekset avasivat ensimmäisen kristallilasitehtaan Waterfordiin 1783, ja sen kirkas, puhdas lasi tunnettiin nopeasti kaupungin ylpeydenaiheena kautta Euroopan." },
      { q: "Mikä on Reginald's Tower?", a: "Waterfordin Reginald's Tower on Irlannin vanhin yhä käytössä oleva siviilirakennus, ja se on ainoa kaupunkimuistomerkki maassa, joka on säilyttänyt viikinkiperäisen nimensä." },
    ],
    Westmeath: [
      { q: "Mitä ovat Foren seitsemän ihmettä?", a: "Foren luostarin ympärille Westmeathissa on kertynyt seitsemän kansantarun 'ihmettä', kuten vettä joka ei kiehu ja puu joka ei pala – tarinat kietoutuvat 600-luvulla toimineen luostarin historiaan." },
      { q: "Mitä tapahtui Athlonen piirityksessä 1691?", a: "Athlonen linnaan Shannon-joen varrella kohdistettiin 1691 yksi Irlannin historian raskaimmista tykistöpommituksista, kun williamilaiset ampuivat kaupunkiin noin 12 000 tykinkuulaa ennen sen valtausta." },
    ],
    Wexford: [
      { q: "Missä normannit nousivat ensin maihin Irlannissa?", a: "Ensimmäinen suuri normannijoukko nousi maihin Bannow Bayssa Wexfordissa toukokuussa 1169, ja tästä alkoi normannien vuosisatoja jatkunut vaikutus Irlannin historiaan." },
      { q: "Mikä yhdistää Wexfordin ja presidentti Kennedyn?", a: "JFK:n isoisoisä Patrick Kennedy syntyi Dunganstownin maatilalla Wexfordissa ennen siirtolaisuutta Amerikkaan, ja presidentti itse vieraili sukutilalla 1963 kutsuen sitä elämänsä parhaaksi matkaksi." },
    ],
    Wicklow: [
      { q: "Kuka perusti Glendaloughin luostarin?", a: "Pyhä Kevin perusti Glendaloughin luostarin kahden järven laaksoon 500-luvulla erakkoelämää etsien, ja paikan pyöreä torni on yksi Irlannin parhaiten säilyneistä." },
      { q: "Mihin Wicklowin vankilan vangit saattoivat päätyä?", a: "Wicklowin historiallisesta vankilasta kuljetettiin 1790-luvulta lähtien vankeja pitkälle laivamatkalle Australian rangaistussiirtokuntiin – matka oli raskas, ja moni ei selvinnyt perille." },
    ],
  },
  HRV: {
    "Bjelovarsko-bilogorska": [
      { q: "Miksi Bjelovarin kadut ovat niin suoraviivaisia ja ruudukkomaisia?", a: "Bjelovar perustettiin 1756 keisarinna Maria Teresian määräyksestä sotilaskaupungiksi Habsburgien rajalle, ja se rakennettiin harvinaisen tarkkaan ruudukkoon linnoituksen ympärille — kaavan näkee kadulla yhä." },
      { q: "Mikä on Terezijana?", a: "Terezijana on Bjelovarin vuosittainen historiajuhla, joka kunnioittaa kaupungin perustajaa Maria Teresiaa; kaduilla nähdään aikalaisasuja ja kulkueita perustamisen muistoksi." },
    ],
    "Brodsko-Posavska": [
      { q: "Ketä kutsutaan Kroatian Andersenin, ja mitä hänellä on tekemistä Slavonski Brodin kanssa?", a: "Kirjailija Ivana Brlić-Mažuranić muutti aviomiehensä myötä Slavonski Brodiin ja kirjoitti täällä suosituimmat satunsa; häntä kutsutaan Kroatian Andersenin vertaansa vailla olevan sadunkerronnan takia." },
      { q: "Mikä tekee slavonialaisesta kulen-makkarasta erityisen?", a: "Slavonski kulen on paprikalla maustettu kuivamakkara, jota on valmistettu samalla perinteellä yli 200 vuotta; EU myönsi sille suojatun maantieteellisen merkinnän vuonna 2017." },
    ],
    "Dubrovacko-Neretvanska": [
      { q: "Mikä tekee Stonin suolapadoista niin erikoisia?", a: "Stonin suolapadot ovat Euroopan vanhimmat yhä toimivat suolalammikot; niiden yli 5 kilometrin pituiset suojamuurit rakennettiin 1300–1400-luvuilla ja lasketaan maailman pisimpien linnoitusmuurien joukkoon." },
      { q: "Miksi Dubrovnikin vanhakaupunki näyttää monelle tutulta televisiosta?", a: "Dubrovnikin muurien ympäröimä vanhakaupunki toimi kuvauspaikkana Game of Thrones -sarjan kuvitteelliselle King's Landingin kaupungille, ja se houkuttelee edelleen sarjan faneja kiertokäynneille." },
    ],
    Istarska: [
      { q: "Miksi Pulan amfiteatteria pidetään yhtenä maailman parhaiten säilyneistä?", a: "Pulan Arena on Roomalaisvaltakunnan kuudenneksi suurin amfiteatteri, mutta se on ainoa, jonka kaikki neljä kulmatornia ovat säilyneet ehjinä — siksi sitä pidetään parhaiten säilyneenä." },
      { q: "Mitä herkkua Istrian metsistä etsitään koirien avulla syksyisin?", a: "Istria on kuuluisa valkoisista tryffeleistään, joita etsitään koulutettujen koirien kanssa erityisesti Motovunin ympäristön tammimetsistä; alueella järjestetään niille omistettuja syysjuhlia." },
    ],
    "Karlovacka": [
      { q: "Mistä lähtien Karlovacissa on pantu tynnyriin olutta?", a: "Karlovačka-panimo perustettiin Karlovaciin vuonna 1854, ja sen Karlovačko-olut on yhä yksi Kroatian tunnetuimmista — vuonna 2005 se voitti kultaa arvostetussa Münchenin olutkilpailussa." },
      { q: "Missä sijaitsee Kroatian 'pieni Plitvice'?", a: "Slunjin kylässä Rastokessa Slunjčica-joki jakautuu lukuisiin pieniin putouksiin vanhojen puisten myllyrakennusten lomassa — maisemaa verrataan usein pienimuotoisena Plitvicen järviin." },
    ],
    "Koprivničko-Križevačka": [
      { q: "Miksi Križevci on merkittävä maatalouden historiassa?", a: "Križevciin perustettiin 1860 Kaakkois-Euroopan ensimmäinen maatalous- ja metsäopisto, ja opetus tapahtui poikkeuksellisesti kroaatin kielellä silloisessa Itävalta-Unkarin monarkiassa." },
      { q: "Mitä jäljellä on Koprivnican vanhoista linnoitusmuureista?", a: "Koprivnica linnoitettiin 1500-luvun jälkipuoliskolla osmanien hyökkäyksiä vastaan, ja osa renessanssiaikaisista puolustusmuureista on säilynyt — niiden kunniaksi kaupungissa järjestetään Kroatian suurin renessanssijuhla." },
    ],
    "Krapinsko-Zagorska": [
      { q: "Miten keskiaikaisesta vartiolinnasta tuli satumainen linna järvenrannalla?", a: "Trakošćanin linna rakennettiin 1200-luvun lopulla vartiotorniksi, mutta 1800-luvulla Drašković-suvun Juraj muutti sen romanttiseksi uusgoottilaiseksi linnaksi ja patosi puron järveksi linnan ympärille." },
      { q: "Mikä kolkko tarina liittyy Veliki Taborin linnaan?", a: "Legendan mukaan 1400-luvulla nuori Veronika Desinićistä rakastui linnanherran poikaan, mutta isä tuomitsi hänet noituudesta ja hukutti hänet linnan pihalla — tarina elää yhä suullisena perinteenä." },
    ],
    "Licko-Senjska": [
      { q: "Mikä on Kroatian vanhin ja suurin kansallispuisto?", a: "Plitvicen järvien kansallispuisto perustettiin vuonna 1949 ja se on Kroatian vanhin kansallispuisto; sen turkoosit terassijärvet ja vesiputoukset ovat kuuluneet Unescon maailmanperintöluetteloon vuodesta 1979." },
      { q: "Mitä erikoista löytyy Velebitin vuoriston laella olevasta puutarhasta?", a: "Zavižanin kasvitieteellinen puutarha 1480 metrin korkeudessa on Kroatian ainoa vuoristopuutarha; se perustettiin 1960-luvulla ja siellä kasvaa Velebitille ainutlaatuisia endeemisiä kasvilajeja." },
    ],
    Medimurska: [
      { q: "Kuka omisti Čakovecin vanhan linnan viisi sukupolvea peräkkäin?", a: "Zrinski-suku hallitsi Čakovecin linnaa 1546 alkaen viiden sukupolven ajan ja teki siitä alueen kulttuurikeskuksen; nykyään linnan päärakennuksessa toimii Međimurjen maakuntamuseo." },
      { q: "Mikä međimurjelainen lauluperinne on päässyt Unescon listalle?", a: "Međimurska popevka -kansanlauluperinne, jonka nuottikuvia tunnetaan 1500-luvulta, lisättiin Unescon aineettoman kulttuuriperinnön listalle vuonna 2018 sen ainutlaatuisen pentatonisen sävelasteikon ansiosta." },
    ],
    "Osjecko-Baranjska": [
      { q: "Miksi Đakovon hevostila on Euroopan mittakaavassa merkittävä?", a: "Đakovon valtion hevostila perustettiin vuonna 1506, ja lipizzanerhevosia on kasvatettu siellä 1800-luvun alusta — tila on 74 vuotta vanhempi kuin kuuluisa Lipican tila Sloveniassa." },
      { q: "Mikä on Tvrđa, ja miksi se rakennettiin Osijekiin?", a: "Tvrđa on 1712–1722 rakennettu tähdenmuotoinen barokkilinnoitus, joka pystytettiin osmanien karkottamisen jälkeen; se on Kroatian suurin ja parhaiten säilynyt barokkirakennusten kokonaisuus." },
    ],
    "Primorsko-Goranska": [
      { q: "Miksi Opatijaa kutsuttiin joskus 'Itävalta-Unkarin Rivieraksi'?", a: "1800-luvulla rikennettiin Villa Angiolina 1844, ja pian ylhäisö Wienistä ja Budapestista teki Opatijasta muodikkaan terveyskylpylän; 12 kilometrin pituinen Lungomare-rantapromenadi valmistui vuonna 1889." },
      { q: "Mikä ennätys Krkin sillalla oli valmistuessaan?", a: "Vuonna 1980 avattu Krkin silta yhdistää saman nimisen saaren mantereeseen, ja sen 390 metrin pituinen kaari oli valmistuessaan maailman pisin betoninen kaari, kunnes ennätys siirtyi myöhemmin Kiinaan." },
    ],
    "Šibensko-Kninska": [
      { q: "Mikä tekee Krkan kansallispuiston putouksista poikkeuksellisia?", a: "Skradinski buk Krkan kansallispuistossa on Euroopan suurin travertiinikivestä muodostunut putoussarja; kalkkipitoinen vesi kerrostaa kasveihin travertiinia, joka kasvattaa uusia kynnyksiä vuosien mittaan." },
      { q: "Miksi Kninia kutsuttiin 'kuninkaiden kaupungiksi'?", a: "Kninin linnoitus on Kroatian suurin linnoitusmonumentti, ja se toimi 1000-luvulla Kroatian kuninkaiden — muun muassa kuningas Zvonimirin — hallintokeskuksena, minkä ansiosta kaupunkia kutsuttiin kuninkaiden kaupungiksi." },
    ],
    "Sisacko-Moslavacka": [
      { q: "Miksi Sisakin vanha linna on kolmion muotoinen?", a: "1500-luvulla rakennettu Sisakin linnoitus on kolmiomainen renessanssilinnake Kupan ja Savan yhtymäkohdassa; se rakennettiin torjumaan osmanien hyökkäyksiä, ja vuonna 1593 siellä käytiin ratkaiseva taistelu." },
      { q: "Mikä roomalaiskaupunki sijaitsi nykyisen Sisakin paikalla?", a: "Roomalainen Siscia oli merkittävä kaupunki ja rahapajan sijaintipaikka, joka löi kolikoita legioonien palkanmaksuun jopa 400-luvulle asti — kolikot tunnetaan yhä numismaatikkojen keskuudessa." },
    ],
    "Splitsko-Dalmatinska": [
      { q: "Miten Roomasta tuli osa nykyistä Splitiä?", a: "Diokletianuksen palatsi rakennettiin noin vuonna 305 keisari Diokletianuksen eläkepäivien asunnoksi, ja se on niin hyvin säilynyt, että ihmiset asuvat ja käyvät kauppaa sen muurien sisällä yhä tänään." },
      { q: "Missä sijaitsee Euroopan vanhin yleinen teatteri?", a: "Hvarin kaupunginteatteri avattiin vuonna 1612 kaikille kansalaisille säädystä riippumatta, mikä oli aikanaan poikkeuksellista — sitä pidetään Euroopan vanhimpana kunnallisena teatterina." },
    ],
    "Varaždinska": [
      { q: "Miksi Varaždinin hautausmaata kutsutaan Euroopan kauneimmaksi?", a: "Puutarhamestari Hermann Haller muotoili Varaždinin hautausmaan vuodesta 1905 alkaen leikattujen sypressien ja lehtomaisten käytävien puistoksi; monet pitävät sitä yhtenä Euroopan kauneimmista hautausmaista." },
      { q: "Mikä musiikkijuhla on järjestetty Varaždinissa vuodesta 1971?", a: "Varaždinin barokki-illat -festivaali tuo joka syksy kaupungin barokkipalatseihin ja kirkkoihin vanhan musiikin konsertteja aidoilla soittimilla; se on yksi Euroopan arvostetuimmista barokkimusiikin juhlista." },
    ],
    "Viroviticko-Podravska": [
      { q: "Mikä Viroviticaa hallitsevaa linnaa ympäröi vallihauta?", a: "Pejačević-linna rakennettiin vuosina 1800–1804 keskiaikaisen rauniolinnan paikalle, ja sitä ympäröi vielä nykyään vallihauta; linnan puistoon johtaa kuusi teemallista siltaa, joista yksi soi kävellessä." },
      { q: "Miksi Voćinin kirkko on tuhottu ja rakennettu uudelleen kahdesti?", a: "1400-luvulta peräisin oleva goottilainen Voćinin kirkko tuhoutui toisessa maailmansodassa ja jälleen räjäytettynä vuonna 1991, mutta se on molemmilla kerroilla rakennettu uudelleen ja koroitettu 2022 pienoisbasilikaksi." },
    ],
    "Vukovarsko-Srijemska": [
      { q: "Mikä on Kroatian itäisin kaupunki, ja mistä se on kuuluisa?", a: "Ilok on Kroatian itäisin kaupunki Tonavan rannalla, ja sen viinikellarit Iločki podrumi tuottavat maan palkituimpia Graševina-valkoviinejä yli tuhatvuotisen viininviljelyperinteen jatkona." },
      { q: "Mikä esine yhdistää Vukovarin ja vanhan 20 kunan setelin?", a: "Vučedolin kyyhky on noin 5000 vuotta vanha keraaminen riittiastia, joka löytyi Vukovarin läheltä; sen kuva painettiin aikanaan Kroatian 20 kunan setelin kääntöpuolelle." },
    ],
    Zadarska: [
      { q: "Kuinka moni saari kuuluu Kornatin kansallispuistoon?", a: "Kornatin kansallispuisto koostuu 89 asumattomasta saaresta, saarekkeesta ja kalliosta keskellä Adrianmerta; koko Kornatin saariryhmä on laajempi, mutta vain tämä osa on suojeltu kansallispuistona." },
      { q: "Mikä valoteos on Zadarissa Meriurkujen vieressä?", a: "Arkkitehti Nikola Bašić suunnitteli Zadariin vuonna 2008 valmistuneen 'Tervehdys auringolle' -teoksen, jonka 300 aurinkopaneelilasilevyä lataa energiaa päivällä ja loistaa värikkäänä valoshow'na illalla." },
    ],
    Zagrebacka: [
      { q: "Mikä on Jastrebarskon vanhin rakennus?", a: "Erdödy-linna Jastrebarskossa rakennettiin 1483–1489, ja Erdödy-suku omisti sen aina vuoteen 1922 asti; linnaa ympäröivä englantilaistyylinen puisto on suojeltu puutarhataiteen muistomerkkinä." },
      { q: "Mikä harvinainen sikarotu asustaa yhä Turopoljen tammimetsissä?", a: "Turopoljen sika on keskiajalla syntynyt kroatialainen alkuperäisrotu, joka on sopeutunut elämään Turopoljen tulva-alueen tammimetsissä; rotu on nykyään erittäin uhanalainen." },
    ],
    "Grad Zagreb": [
      { q: "Kuinka lyhyt on Zagrebin funikulaari?", a: "Zagrebin funikulaari on vain 66 metriä pitkä ja matka kestää 64 sekuntia, mikä tekee siitä yhden maailman lyhyimmistä julkisista funikulaareista; se on toiminut vuodesta 1890." },
      { q: "Mikä keskiaikainen linna kohoaa Zagrebin yllä Medvednican rinteellä?", a: "Medvedgrad-linna rakennettiin 1249–1254 Zagrebin piispan käskyllä tataarien hyökkäyksen jälkeen; sitä ei koskaan valloitettu taistelussa, mutta maanjäristys jätti sen raunioiksi vuonna 1590." },
    ],
  },
  ROU: {
    Alba: [
      { q: "Miksi Roșia Montană on kuuluisa?", a: "Roomalaiset louhivat siellä kultaa jo pari vuosituhatta sitten, ja nykyaikainen kaivoshanke alueella on herättänyt vuosikausia kiivasta keskustelua ympäristön ja historiallisten kaivostunnelien suojelusta." },
      { q: "Mistä Alban lääni tunnetaan viininviljelyssä?", a: "Jidveiin viinitilat ovat Romanian laajimmat, ja alueen raikkaat valkoviinit kuuluvat maan arvostetuimpiin." },
    ],
    Arad: [
      { q: "Millainen on Aradin linnoitus?", a: "Kaupungin keskellä kohoava tähdenmuotoinen linnoitus rakennettiin 1700-luvulla, ja osa siitä on edelleen puolustusvoimien käytössä." },
      { q: "Mistä Arad on tunnettu urheilussa?", a: "Kaupungin jalkapalloseura UTA Arad on yksi Romanian historiallisimmista, ja se voitti useita mestaruuksia 1900-luvun puolivälin jälkeen." },
    ],
    Arges: [
      { q: "Mikä yhteys Vlad Seivästäjällä on Argeșiin?", a: "Hänen todellinen linnansa, Poenarin raunio, kohoaa jyrkän 1480 portaan päässä vuorenrinteellä — toisin kuin turisteille markkinoitu Bran-linna, joka ei liity häneen historiallisesti." },
      { q: "Mikä oli Argeșin ensimmäinen ruhtinaskaupunki?", a: "Câmpulung toimi Wallachian ensimmäisenä pääkaupunkina 1300-luvulla, ennen kuin ruhtinaan istuin siirrettiin Curtea de Argeșiin." },
    ],
    Bacau: [
      { q: "Mikä on Slănic Moldova?", a: "Bacăun vuoristossa sijaitseva kylpyläkaupunki tunnetaan kivennäislähteistään, joita on käytetty parantavina kylpyinä 1800-luvun puolivälistä lähtien." },
      { q: "Mitä Târgu Ocnan suolakaivoksessa voi tehdä?", a: "Maan alle louhittuun saliin on rakennettu kappeli ja hengityssairauksien hoitoon käytetty parantola, joihin matkailijat voivat tutustua opastetuilla kierroksilla." },
    ],
    Bihor: [
      { q: "Mikä on Baile Felix?", a: "Oradean liepeillä sijaitseva kuuluisa kylpyläalue, jonka lämpöiset lähteet pysyvät ympäri vuoden yli 20-asteisina ja houkuttelevat kylpijöitä myös talvella." },
      { q: "Millainen on Oradean linnoitus nykyään?", a: "Transilvanian suurimpiin kuuluva linnoitus on kunnostettu museoksi ja tapahtumapaikaksi, ja sen muurien sisällä voi nykyään yöpyä hotellissa." },
    ],
    "Bistrita-Nasaud": [
      { q: "Mikä on Colibița?", a: "Vuonna 1972 padottu tekojärvi Bistrița-Năsăudissa, jonka rannalla hukkunut kylä paljastuu joskus kuivina kausina veden pinnan laskiessa." },
      { q: "Miksi Rodnan vuoret ovat suojeltuja?", a: "Alue on kansallispuisto ja biosfäärialue, jossa elää karhuja, susia ja Karpaattien harvinaista kasvistoa." },
    ],
    Botosani: [
      { q: "Missä kolme valtiota kohtaavat Botoșanin läänin liepeillä?", a: "Romanian, Moldovan ja Ukrainan rajapyykki sijaitsee Botoșanin läänin pohjoisosassa Prut-joen tuntumassa — yksi harvoista paikoista Euroopassa, jossa kolme rajaa yhtyy." },
      { q: "Mikä on Botoșanin suuri synagoga?", a: "Vuonna 1834 rakennettu 'Hoihe Sil' on yksi Moldovan alueen vanhimmista ja koreimmin koristelluista synagogista, muistona kaupungin ennen sotaa vilkkaasta juutalaisyhteisöstä." },
    ],
    Braila: [
      { q: "Millaisia jälkiä Brăilan kansainvälisestä kauppiasyhteisöstä näkyy kaupungissa nykyään?", a: "1800-luvulla kaupunkiin asettuneet kreikkalaiset, italialaiset ja ranskalaiset kauppiaat rakensivat sen keskustaan eurooppalaistyylisiä palatseja, joista monet on nykyään entisöity." },
      { q: "Mikä on Brăilan pieni saari?", a: "Tonavan haarojen väliin jäävä suojeltu Insula Mică a Brăilei on tärkeä vesilintujen elinalue, ja sinne pääsee tutustumaan veneretkillä kaupungin läheltä." },
    ],
    Brasov: [
      { q: "Mikä yhdistää Brașovin lähistön Draculaan?", a: "Läheinen Bran-linna tunnetaan 'Draculan linnana', vaikka Bram Stoker ei koskaan käynyt siellä — yhteys syntyi vain ulkonäön ja sijainnin perusteella." },
      { q: "Mikä on Poiana Brașov?", a: "Romanian suosituin hiihtokeskus sijaitsee vain parin kymmenen minuutin ajomatkan päässä kaupungin keskustasta vuoristorinteillä." },
    ],
    Bucharest: [
      { q: "Mikä on yksi maailman painavimmista rakennuksista Bukarestissa?", a: "Parlamentin palatsi on yksi maailman suurimmista hallintorakennuksista — se rakennettiin 1980-luvulla Ceaușescun aikana, ja sen alle louhittiin osia kaupungin metrolinjastosta." },
      { q: "Miksi Bukarestia on kutsuttu 'Pieneksi Pariisiksi'?", a: "1900-luvun alun ranskalaisvaikutteinen arkkitehtuuri ja leveät bulevardit toivat kaupungille lempinimen, joka elää edelleen matkailumainonnassa." },
    ],
    Buzau: [
      { q: "Mikä on 'elävä tuli' Buzăussa?", a: "Lopătarin kylän lähellä maankamarasta purkautuva metaani syttyy itsestään ja palaa pienenä liekkinä vuosisatoja jatkuneena ilmiönä." },
      { q: "Mistä Buzăun lääni tunnetaan viinintutkimuksessa?", a: "Pietroasan viinitutkimusasema perustettiin 1893 rypäletuhotautia vastaan, ja se on yhä yksi Romanian tärkeimmistä viininviljelyn tutkimuskeskuksista." },
    ],
    Calarasi: [
      { q: "Mikä on Brăilan suursaari (Insula Mare a Brăilei)?", a: "Tonavan pääuoman ja Borcea-sivuhaaran välissä sijaitseva saari on yksi Euroopan suurimpia jokisaaria; se kuivatettiin ja otettiin maatalouskäyttöön 1960-luvulla." },
      { q: "Mistä Călărașin kaupungin nimi juontuu?", a: "Nimi liittyy romanian sanaan ratsumies (călăraș) — seudulla toimi aikoinaan ratsuväen ja kirjeenkuljetuksen välitysasemia kauppareittien varrella." },
    ],
    "Caras-Severin": [
      { q: "Mikä on Cheile Nerei-Beușnița?", a: "Kansallispuisto Caraș-Severinissä suojelee Nera-joen kanjoneita ja Beușnițan vesiputousta, joka on yksi Romanian kauneimpia." },
      { q: "Mistä Semenicin vuoret tunnetaan?", a: "Alueella sijaitsee yksi Romanian vanhimmista hiihtokeskuksista, ja lähistön kalkkikivimaastossa on useita pitkiä luolajärjestelmiä." },
    ],
    Cluj: [
      { q: "Miksi Clujia kutsutaan Romanian teknologiakeskukseksi?", a: "Kaupunkiin on keskittynyt runsaasti IT-yrityksiä ja startup-yhtiöitä, ja sitä kutsutaan usein Romanian piilaaksoksi." },
      { q: "Mikä on Untold-festivaali?", a: "Cluj-Napocassa elokuussa järjestettävä sähköisen musiikin festivaali on kasvanut yhdeksi Euroopan suurimmista, ja sen lavarakenteet ovat tunnettuja spektaakkelimaisuudestaan." },
    ],
    Constanta: [
      { q: "Kuka roomalaisrunoilija makasi maanpaossa juuri tässä kaupungissa?", a: "Ovidius karkotettiin keisari Augustuksen määräyksestä Tomikseen (nyk. Konstanza) vuonna 8 jaa. Kaupunki pystytti hänelle pronssipatsaan, joka seisoo yhä Ovidiu-aukiolla vanhankaupungin sydämessä." },
      { q: "Mikä rakennus hallitsee Konstanzan rantabulevardia mutta on ollut vuosia tyhjillään?", a: "Vuonna 1910 valmistunut art nouveau -kasino oli aikanaan Mustanmeren rannikon hienoin huvipaikka. Se on kunnostuksen kohteena, mutta pysyy yhä kaupungin tunnetuimpana maamerkkinä." },
    ],
    Covasna: [
      { q: "Mikä luontokohde piilottelee Covasnan ja Harghitan rajalla?", a: "Vârghiș-rotkon kalkkikivimuodostumat kätkevät lähes 130 luolaa, joista neljä on avoinna kävijöille — rotkolaakso on noin neljä kilometriä pitkä ja ylittyy yksitoista kertaa siltaa pitkin." },
      { q: "Miksi Covasnan kylien vanhat kirkot on ympäröity paksuilla muureilla?", a: "Kylissä kuten Turiassa keskiaikaiset kirkot linnoitettiin korkeilla puolustusmuureilla, joiden suojiin asukkaat pakenivat tataarien ja turkkilaisten ryöstöretkiltä." },
    ],
    "Dâmbovita": [
      { q: "Missä lepää legendaarisen valakialaisruhtinas Mihai Viteazulin pää?", a: "Se on haudattuna Dealun luostariin Târgoviștejen liepeillä. Ruhtinas murhattiin 1601 nykyisen Itävallan alueella, ja pää tuotiin takaisin kotimaahan lepäämään pyhään maahan." },
      { q: "Minkä legendan mukaan ottomaanien lähettiläät kohtasivat kohtalonsa Târgoviștejen Chindia-tornissa?", a: "Perimätiedon mukaan Vlad Seivästäjä kutsui 1400-luvulla turkkilaislähettiläitä torniin ja rankaisi heitä, kun he kieltäytyivät nostamasta turbaania hänen edessään. Tarina on epäilemättä liioiteltu, mutta torni on yhä kaupungin tunnusmerkki." },
    ],
    Dolj: [
      { q: "Mikä yhdistää Doljin Calafatin suoraan Bulgariaan?", a: "Vuonna 2013 avattu Uusi Eurooppa -silta yhdistää Calafatin Tonavan yli Vidiniin. Se on vasta toinen kiinteä yhteys Romanian ja Bulgarian välillä koko historiassa." },
      { q: "Miksi Craiovaa kutsuttiin joskus 'pieneksi Pariisiksi'?", a: "1800-luvun lopun vaurastuminen toi kaupunkiin ranskalaisvaikutteista arkkitehtuuria ja leveitä bulevardeja, ja lempinimi elää yhä paikallisessa ylpeydessä." },
    ],
    Galati: [
      { q: "Mitä kaikkea löytyy Galațin luonnontieteellisen museokompleksin saman katon alta?", a: "Akvaario, kasvitieteellinen puutarha, eläintarha ja planetaario – jonka tähtitorni on yksi Romanian nykyaikaisimmista julkisista observatorioista." },
      { q: "Mikä Galațin synagogoista on selvinnyt 1930-luvun kolmestakymmenestä hengissä?", a: "Vain 1875 rakennettu käsityöläisten synagoga on säilynyt pystyssä ja toiminnassa. Se kunnostettiin perusteellisesti ja avattiin uudelleen 2014." },
    ],
    Giurgiu: [
      { q: "Minkä luostarin Vlad Seivästäjä perusti Giurgiun seudulle?", a: "Comanan luostarin vuonna 1461. Se on nykyisin Comanan luonnonpuiston sydän – Tonavan suiston jälkeen Romanian toiseksi suurin kosteikkoalue." },
      { q: "Miksi Giurgiun edustalla Tonavan saarella on yhä vanhoja linnoitusraunioita?", a: "Giurgiu oli osmanien suoraan hallitsema raja-linnoituskaupunki lähes neljä vuosisataa, ennen kuin siitä 1800-luvulla tuli osa Valakiaa." },
    ],
    Gorj: [
      { q: "Miksi Gorjia kutsutaan Romanian energiapiirikunnaksi?", a: "Alueen laajat ruskohiili- eli ligniittikaivokset ja niiden ympärille rakennetut voimalaitokset, kuten Rovinarin ja Turcenin laitokset, tuottavat ison osan Romanian sähköstä." },
      { q: "Mikä luonnonnähtävyys tarjoaa Gorjissa jyrkkiä kalkkikivirotkoja ja luolamaalauksia?", a: "Sohodolin rotko länsi-Gorjissa on suosittu vaellus- ja kiipeilykohde. Sen suulla sijaitsevan luolan seiniltä on löydetty tummia ihmishahmoja esittäviä kalliomaalauksia." },
    ],
    Harghita: [
      { q: "Mistä Harghitan Corund-kylä on kuuluisa jo 1600-luvulta?", a: "Korundin savenvalajakylä on yksi Euroopan tärkeimmistä perinnekeramiikan keskuksista. Elokuun ensimmäisenä viikonloppuna sen keramiikkamarkkinat tuovat paikalle satoja kädentaitajia." },
      { q: "Mikä on 'székely-portti' ja mistä sen tunnistaa?", a: "Se on raskaasti veistetty puinen porttirakenne, jolla sekeliperheet ovat perinteisesti merkinneet talonsa rajaa. Kirvesmiehet koristelivat porttien kaaret suvun tunnuskuvioin ja lauselmin." },
    ],
    Hunedoara: [
      { q: "Missä sijaitsi muinaisen Daakian pääkaupunki, ennen kuin Rooma valloitti sen?", a: "Sarmizegetusa Regia kohosi Orăștie-vuorten huipulla – se oli daakialaisten kuninkaiden linnoitettu poliittinen ja uskonnollinen keskus, ja nykyään se on osa Unescon maailmanperintölistan daakialaislinnoituksia." },
      { q: "Mikä on Romanian vanhin kansallispuisto ja missä se sijaitsee?", a: "Retezatin kansallispuisto perustettiin 1935 Retezat-vuoristoon. Sen alueella on yli 80 jäätikköjärveä ja yli kolmasosa koko Romanian kasvilajistosta." },
    ],
    Ialomita: [
      { q: "Kuka Ialomițan Ogradan kylässä syntynyt mies johti aikanaan New Yorkin Metropolitan-oopperaa?", a: "Kapellimestari ja säveltäjä Ionel Perlea (s. 1900) teki kansainvälisen uran Euroopassa ja Yhdysvalloissa – syntymäkylässä on hänelle omistettu muistomuseo." },
      { q: "Mikä silta oli valmistuessaan 1895 Euroopan pisin?", a: "Insinööri Anghel Salignyn suunnittelema silta Fetești–Cernavodă-välillä ylitti Tonavan sivuhaaroineen yli neljän kilometrin matkalla ja pysyi käytössä lähes vuosisadan." },
    ],
    Iasi: [
      { q: "Missä kylässä tehty löytö antoi nimensä koko esihistorialliselle kulttuurille?", a: "Iașin lähellä sijaitsevassa Cucuteni-kylässä löydettiin 1884 kivikautisia maalattuja saviastioita. Yli 6000 vuotta vanha Cucuteni-kulttuuri tunnetaan yhä upeasta, geometrisesti kuvioidusta keramiikastaan." },
      { q: "Missä puussa runoilija Mihai Eminescu istui kirjoittamassa runojaan?", a: "Copou-puiston vanhan lehmuksen alla, joka on yli 400-vuotias ja tunnetaan nykyään 'Eminescun lehmuksena' – romanialaisten runouden ystävien pyhiinvaelluskohteena." },
    ],
    Ilfov: [
      { q: "Mikä on Romanian vilkkain lentokenttä ja missä se sijaitsee?", a: "Henri Coandă -kansainvälinen lentokenttä Otopenissa, Ilfovin piirikunnassa, palvelee yli 17 miljoonaa matkustajaa vuodessa ja on maan kansallisen lentoyhtiön tukikohta." },
      { q: "Miksi Buftea tunnetaan 'Romanian Hollywoodiksi'?", a: "Vuonna 1959 valmistuneet Buftean elokuvastudiot ovat Itä-Euroopan suurin ja pitkäikäisin elokuvatuotantokompleksi, ja sadat kotimaiset ja ulkomaiset elokuvat on kuvattu sen lavasteissa." },
    ],
    Maramures: [
      { q: "Miksi Vaser-laakson kapearaiteista höyryjunaa kutsutaan Euroopan viimeiseksi?", a: "'Mocănița' on yksi viimeisistä säännöllisesti liikennöivistä metsätalouden höyryjunista Euroopassa. Se kulkee 1930-luvulta periytyvällä 60 kilometrin radalla, joka rakennettiin alun perin tukkien kuljetukseen." },
      { q: "Mitä maramureșläiset polttavat perinteisesti luumuista?", a: "Pălincaa, vahvaa hedelmäpaloviinaa, jonka tislaamisen taito kulkee suvussa sukupolvelta toiselle ja jota tarjotaan vieraille tervetulotuomana." },
    ],
    Mehedinti: [
      { q: "Kuinka suuri Rautaporttien vesivoimalaitos on Tonavalla?", a: "Vuosina 1964–1972 Romanian ja Jugoslavian yhteisvoimin rakennettu Rautaportti I on yksi Tonavan suurimmista vesivoimalaitoksista ja padoista." },
      { q: "Miksi Rautaporttien luonnonpuisto on Romanian suurin?", a: "Porțile de Fier -luonnonpuisto suojelee Tonavan dramaattista kanjonimaisemaa kalliokotkineen ja harvinaisine kasvilajeineen laajalla alueella joen molemmin puolin." },
    ],
    Mures: [
      { q: "Miksi Praidin suolakaivos on niin suosittu nähtävyys?", a: "Praidin suolaesiintymä on yksi Euroopan suurimmista, ja kaivoksen sisään on rakennettu kokonainen maanalainen kylpylä leikkipaikkoineen ja kappeleineen — suolaista ilmaa käydään hengittämässä hengitysteiden hoidoksi." },
      { q: "Mikä on Teleki-Bolyai-kirjasto ja miksi se on erikoinen?", a: "Târgu Mureșissa sijaitseva kirjasto perustettiin vuonna 1802, ja siellä säilytetään harvinaisia vanhoja kirjoja ja käsikirjoituksia, muun muassa yksi maailman vanhimmista painetuista teoksista Transilvaniassa." },
    ],
    Neamt: [
      { q: "Miksi Ceahlăun vuorta kutsutaan Moldovan Olympokseksi?", a: "Ceahlău on yksi Romanian vaikuttavimmista vuorimassiiveista, ja sen huipuille liittyy vanhoja jumaltarustoja ja legendoja — paikalliset pitivät sitä pyhänä, jumalten asuinsijana." },
      { q: "Miksi Agapian luostarissa asuu niin paljon nunnia?", a: "Agapia ja lähellä sijaitseva Văratecin luostari ovat Romanian suurimpia naisluostareita, joissa asuu satoja nunnia; Agapiassa vaikutti myös kuuluisa maalari Nicolae Grigorescu." },
    ],
    Olt: [
      { q: "Mikä on Corabia ja miksi se sijaitsee juuri Tonavan rannalla?", a: "Corabia on Oltin vanha Tonava-satama, joka kukoisti 1800-luvulla viljan ja muiden maataloustuotteiden vientipaikkana; nykyään se on rauhallinen pikkukaupunki, mutta satamahistoria näkyy keskustan arkkitehtuurissa." },
      { q: "Miksi Caracalin kaupunki on niin vanha?", a: "Caracal syntyi roomalaisen Sucidavan linnoituksen ja kauppareitin risteyskohtaan, ja se on säilynyt asutettuna lähes koko ajan roomalaisajasta nykypäivään — yksi Oltin vanhimmista jatkuvasti asutuista paikoista." },
    ],
    Prahova: [
      { q: "Miksi Sinaia valittiin Romanian kuninkaiden kesäasunnoksi?", a: "Kuningas Carol I ihastui Sinaian vuoristomaisemaan 1860-luvun lopulla ja rakennutti alueelle luostarin lähelle kesäresidenssinsä; siitä kehittyi hienostuneiden vuoristolomien keskus, jota kutsutaan yhä Karpaattien helmeksi." },
      { q: "Mitä Buștenin köysirata tarjoaa nykyään?", a: "Buștenin köysirata nousee Bucegin vuorille lähes 2000 metrin korkeuteen muutamassa minuutissa; ylhäältä avautuu näkymä Prahovan laaksoon, ja alueella vaeltaa nykyään paljon retkeilijöitä ja hiihtäjiä." },
    ],
    Salaj: [
      { q: "Miksi Meseșin tunneli on merkittävä?", a: "Sălajin läpi kulkeva Meseșin tietunneli on yksi Romanian pisimmistä maantietunneleista; se avattiin 2020-luvulla ja lyhensi matkaa, joka ennen kiersi hitaasti vuorten yli." },
      { q: "Mikä yhdistää Sălajin puukirkot muuhun Transilvaniaan?", a: "Sălajin kylissä on säilynyt vanhoja ortodoksisia puukirkkoja, jotka on rakennettu kokonaan hirsistä ja katettu paanuilla; monet niistä ovat satoja vuosia vanhoja ja edelleen käytössä." },
    ],
    "Satu Mare": [
      { q: "Miksi Oașin alueen perinteiset portit ovat niin koristeellisia?", a: "Oașin kylissä veistetyt puuportit on koristeltu perinteisin kansankuvioin, ja niitä pystytetään yhä uusiin taloihin; alueen kansanpuvut ja tanssit ovat säilyneet elävänä perinteenä nykypäivään asti." },
      { q: "Mikä on Careiin linnan eläinpuisto?", a: "Careiin barokkilinnan ympärille istutettu puisto tunnetaan Euroopan suurimpana tammimetsässä sijaitsevana hirvieläintarhana; siellä kasvaa satoja vuosia vanhoja tammia ja liikkuu vapaana kauriita." },
    ],
    Sibiu: [
      { q: "Mikä on Valheiden silta ja mistä nimi tulee?", a: "Sibiun vanhassa kaupungissa oleva rautasilta tunnetaan Valheiden siltana; tarinan mukaan se romahtaisi, jos sillä valehdeltaisiin — silta on yksi Romanian ensimmäisistä valuraudasta tehdyistä silloista." },
      { q: "Mikä on ASTRA-museo ja mitä sinne on koottu?", a: "Sibiun laitamilla sijaitseva ASTRA-ulkomuseo on yksi Euroopan suurimmista avoimista museoista; sinne on siirretty kokonaisia maalaistaloja, myllyjä ja työpajoja ympäri Transilvaniaa." },
    ],
    Suceava: [
      { q: "Mikä on Suceavan linna ja mikä sen merkitys oli keskiajalla?", a: "Cetatea de Scaun -linna Suceavassa oli keskiaikaisen Moldovan ruhtinaskunnan pääkaupunki ja hallitsijoiden asuinpaikka; se on kunnostettu, ja siellä voi nykyään kiertää muurien ja tornien sisällä." },
      { q: "Miksi Bukovinan koristellut pääsiäismunat ovat niin kuuluisia?", a: "Bukovinan alueella, myös Suceavassa, on vahva perinne koristella pääsiäismunia vahamaalauksella ja kaiverruksella; taito on periytynyt sukupolvelta toiselle, ja monet mestarit tekevät sitä yhä käsityönä." },
    ],
    Teleorman: [
      { q: "Miksi Turnu Măgurele on tärkeä satamakaupunki?", a: "Turnu Măgurele sijaitsee Tonavan rannalla ja oli 1900-luvulla merkittävä kemianteollisuuden keskus; se on myös lähellä muinaisen roomalaisen linnoituksen jäänteitä joen rannalla." },
      { q: "Mitä haikaroita näkee Teleormanin lakeudella kesäisin?", a: "Teleormanin avoimet maatalousmaisemat ja kylien katot ovat suosittuja pesimäpaikkoja valkohaikaroille, joita saapuu alueelle keväisin suuria määriä pesimään." },
    ],
    Timis: [
      { q: "Miksi Timișoaraa kutsutaan vuoden 1989 vallankumouksen syntykaupungiksi?", a: "Timișoarassa alkoivat joulukuussa 1989 mielenosoitukset, jotka levisivät nopeasti muualle Romaniaan ja johtivat Ceaușescun hallinnon kaatumiseen; kaupungin keskustassa on tapahtumille omistettuja muistomerkkejä." },
      { q: "Mikä on Began kanava ja miksi se on tärkeä Timișoaralle?", a: "Bega-kanava kulkee kaupungin läpi ja oli 1700-luvulta lähtien tärkeä kauppareitti Tonavalle; nykyään sen rannat ovat suosittuja kävely- ja pyöräilyalueita kaupunkilaisten keskuudessa." },
    ],
    Tulcea: [
      { q: "Miksi Tulcean seudulla asuu paljon lipovaanivenäläisiä?", a: "Lipovaanit ovat vanhauskoisia venäläisiä, jotka pakenivat uskonnollista vainoa Venäjältä ja asettuivat Tonavan suiston kylille vuosisatoja sitten; heidän perinteensä ja kielensä elävät yhä alueella." },
      { q: "Mikä tekee Măcinin vuorista erikoisia?", a: "Măcinin vuoret Tulcean alueella ovat geologisesti Euroopan vanhimpia, satojen miljoonien vuosien ikäisiä, ja aikanaan paljon korkeampia — nykyään ne ovat matalia, pyöristyneitä kukkuloita eroosion jäljiltä." },
    ],
    Vaslui: [
      { q: "Mitä Vasluin alueella viljellään nykyään laajalti?", a: "Vasluin maakunta on yhä vahvasti maatalousvaltainen: pelloilla kasvatetaan viljaa ja aurinkokukkaa, ja alueen kumpuilevilla rinteillä on myös perinteisiä viinitarhoja." },
      { q: "Miksi Bârlad-joki on tärkeä Vasluille?", a: "Bârlad-joki virtaa Vasluin maakunnan läpi ja on antanut nimensä alueen toiselle merkittävälle kaupungille; joenvarret ovat perinteisesti tarjonneet viljavaa maata viljanviljelylle." },
    ],
    "Vâlcea": [
      { q: "Mikä on Cozian luostari ja kuka on haudattu sinne?", a: "Cozian luostari Oltin rannalla on 1300-luvulta peräisin, ja sinne on haudattu Valakian ruhtinas Mircea Vanhus; luostarikirkko on yksi Romanian tärkeimmistä keskiaikaisista rakennuksista." },
      { q: "Miksi Oltin jokilaakso on täynnä patoaltaita?", a: "Olt-joki on padottu Vâlcean alueella useaan kertaan vesivoiman tuottamiseksi, ja patojen väliin on syntynyt sarja kapeita tekojärviä, joita reunustavat jyrkät vuorenrinteet." },
    ],
    Vrancea: [
      { q: "Miksi Odobeștin seutu on kuuluisa viinistä?", a: "Odobeștin viinialue Vrancean maakunnassa on yksi Romanian vanhimmista ja tunnetuimmista, ja siellä on viljelty viiniä jo satoja vuosia; nykyään alueen viinitilat houkuttelevat matkailijoita maistelukierroksille." },
      { q: "Mitä Vrancean vuoristossa Lepșan alueella voi tehdä nykyään?", a: "Lepșa on Vrancean vuoristossa sijaitseva pieni lomakohde, jonne mennään vaeltamaan, hiihtämään ja nauttimaan raikkaasta vuoristoilmasta kaukana kaupungeista." },
    ],
  },
  UKR: {
    Cherkasy: [
  { q: "Miksi Umaniin kerääntyy syksyisin kymmeniätuhansia pyhiinvaeltajia?", a: "Kaupungissa on haudattu rabbi Nachman Breslovilainen, hasidismin perustajan Baal Shem Tovin pojanpojanpoika, joka kuoli Umanissa 1810. Hänen seuraajansa uskovat, että haudalla rukoileminen juuri juutalaisena uutena vuotena tuo hengellistä puhdistumista, ja perinne on jatkunut sodankin aikana kiertoteitse." },
  { q: "Mistä nimi Cherkasy juontaa juurensa?", a: "Nimi liittyy 1400-luvulla syntyneisiin Keski-Dneprin kasakkayhteisöihin, joita kutsuttiin tšerkasseiksi – termin alkuperästä on useita teorioita, yleisimmin sen arvellaan tulevan turkkilaisperäisestä kansannimestä. Cherkasyn ja Kanivin linnoituksista tuli varhaisten kasakkojen keskuksia." },
  { q: "Miksi Sofijivkan puisto rakennettiin Umaniin?", a: "Puolalainen kreivi Stanisław Potocki rakennutti sen 1796 lahjaksi vaimolleen Zofialle, jonka mukaan puisto on nimetty. Nykyään se on yksi Ukrainan suosituimmista dendrologisista puistoista vesiputouksineen ja keinotekoisine luolineen." },
],
    Chernihiv: [
  { q: "Miksi Chernihiviä pidetään yhtenä Ukrainan vanhimmista kaupungeista?", a: "Kaupungista on kirjallinen maininta jo vuodelta 907, ja se oli Kiovan Rusin aikana toiseksi tärkein kaupunki heti Kiovan jälkeen. Tuolta ajalta on säilynyt poikkeuksellisen paljon kivikirkkoja, muun muassa 1030-luvulla aloitettu Kirkastumisen katedraali." },
  { q: "Mikä on Antoniuksen luola?", a: "Munkki Antonius kaivoi luolan 1000-luvulla, ja se laajentui vuosisatojen kuluessa kokonaiseksi maanalaiseksi luostarikompleksiksi käytävineen, kappeleineen ja hautoineen. Osa tutkijoista pitää sitä jopa vanhempana kuin Kiovan luostariluolia." },
  { q: "Mitä Detynetsin mäellä on nähtävissä nykyään?", a: "Entinen linnanmäki on nykyään puisto, jonka alueella seisoo useita Kiovan Rusin ajan kivirakennuksia sekä myöhempiä pyhäkköjä. Se on kaupungin historiallinen ydin ja suosittu kävelykohde." },
],
    Chernivtsi: [
  { q: "Miksi Tšernivtsiä kutsuttiin joskus 'pikku-Wieniksi'?", a: "Kaupunki oli Itävallan keisarikunnan Bukovinan pääkaupunki 1774–1918, ja sen keskusta rakennettiin keisarikunnan tyyliin. Ennen toista maailmansotaa siellä eli tiiviisti rinnakkain ukrainalaisia, romanialaisia, juutalaisia, saksalaisia ja puolalaisia." },
  { q: "Kuka oli Paul Celan?", a: "Hän syntyi Tšernivtsissä 1920 ja kirjoitti runonsa saksaksi, vaikka selvisi hengissä natsimiehityksestä juutalaisena, kun hänen vanhempansa eivät selvinneet. Hänestä tuli yksi 1900-luvun merkittävimmistä saksankielisistä runoilijoista, ja hän kuoli Pariisissa 1970." },
  { q: "Miksi Tšernivtsissä pidettiin tärkeä jiddišin kielen kokous 1908?", a: "Kaupunki oli ennen sotia yksi Itä-Euroopan merkittävistä juutalaisen kulttuurin keskuksista, ja lähes kolmasosa asukkaista oli juutalaisia. Vuoden 1908 konferenssissa keskusteltiin jiddišin asemasta juutalaisten kansallisena kielenä." },
],
    "Dnipropetrovs'k": [
  { q: "Miksi kaupungin nimi vaihtui Dnipropetrovskista Dniproksi?", a: "Ukrainan 2016 dekommunisointilaki vaati poistamaan kaduilta ja kaupunkien nimistä neuvostojohtajien muiston. Dnipropetrovsk oli nimetty bolševikkijohtaja Grigori Petrovskin mukaan, joten kaupunki lyhennettiin yksinkertaisesti joen nimeksi Dnipro." },
  { q: "Mikä oli Pivdenmaš eli Juzhmaš?", a: "Tehdas perustettiin 1944 ja siirtyi 1951 valmistamaan ballistisia ohjuksia, muun muassa mahtavaa R-36-ohjusta. Neuvostoaikana kaupunki oli tehtaan vuoksi ulkomaalaisilta suljettu alue, ja nykyään tehdas on osittain siviilikäytössä." },
  { q: "Mikä on Menora-keskus?", a: "Vuonna 2012 avattu kompleksi koostuu seitsemästä eri korkuisesta tornista, jotka symboloivat juutalaista seitsenhaaraista kynttilänjalkaa. Se on maailman suurin juutalaisyhteisön keskus, ja sen rahoittivat paikalliset juutalaiset liikemiehet." },
],
    "Donets'k": [
  { q: "Kuka oli John Hughes ja miksi Donetskia kutsuttiin ennen Juzovkaksi?", a: "Walesilainen teollisuusmies John Hughes perusti kaupungin paikalle rautatehtaan ja hiilikaivoksia 1869, ja hän toi mukanaan satoja työläisiä Etelä-Walesista. Kaupunki nimettiin hänen mukaansa Juzovkaksi (venäjän ääntämys hänen nimestään), ennen kuin se sai myöhemmin nimet Stalino ja lopulta Donetsk." },
  { q: "Mikä on Slovjanskin suolajärvien tarina?", a: "Slovjanskin järvien rannalla on parannettu ihmisiä mutakylvyillä jo 1830-luvulta lähtien, ja seutu oli aikanaan koko imperiumin tunnettu kylpyläkaupunki. Alueella louhittiin aiemmin myös suolaa, mutta tuotanto lopetettiin jo 1700-luvulla kannattamattomana." },
  { q: "Miksi Svjatohirskin luostari on rakennettu juuri liitukallion päälle?", a: "Luostari on kaiverrettu Siverskyi Donetsin jyrkkiin liitukallioihin, mikä tarjosi munkeille sekä luonnollisen suojan että eristäytyneen paikan rukoukselle. Perinne muistuttaa Kiovan luostariluolia, ja luostarista on kirjallinen maininta jo vuodelta 1627." },
],
    "Ivano-Frankivs'k": [
  { q: "Mikä on Bukovel ja miksi se on niin suosittu?", a: "Bukovel on Ukrainan ja koko Itä-Euroopan suurimpia hiihtokeskuksia, ja se avattiin vuonna 2000 Karpaattien rinteille lähelle Polianytsjan kylää. Rinteitä on yhteensä noin 68 kilometriä, ja keskusta on kuvattu maailman nopeimmin kasvaneeksi hiihtokohteeksi." },
  { q: "Keitä hutsuulit ovat?", a: "Hutsuulit ovat Karpaattien vuoristossa asuva kansanryhmä, joka tunnetaan värikkäistä kansanpuvuistaan, puuveistostaan ja paimentolaisperinteestään. Heidän musiikkinsa ja käsityönsä elävät yhä alueen kylissä." },
  { q: "Miksi seudun puukirkot ovat Unescon suojelemia?", a: "Yhteensä 16 Karpaattien puukirkkoa Ukrainassa ja Puolassa otettiin maailmanperintöluetteloon 2013 ainutlaatuisen paikallisen puurakennusperinteen vuoksi. Osa niistä on hutsuulien, osa boikkien rakentamia, ja perinteisesti ne pystytettiin ilman nauloja." },
],
    Kharkiv: [
  { q: "Miksi Harkovan yliopisto on niin merkittävä?", a: "Se perustettiin 1804 kasvattaja V. N. Karazinin aloitteesta ja on Ukrainan vanhin yhä toimiva yliopisto. Sen yhteydessä toimii myös maan vanhin kasvitieteellinen puutarha vuodelta 1804 ja yksi maailman vanhimmista yliopistomuseoista vuodelta 1807." },
  { q: "Miksi Harkovasta tuli neuvosto-Ukrainan pääkaupunki eikä Kiovasta?", a: "Bolševikit eivät onnistuneet saamaan jalansijaa Kiovassa vallankumouksen jälkimainingeissa, joten teollinen ja työväenluokkainen Harkova valittiin pääkaupungiksi 1919. Pääkaupunki siirrettiin takaisin Kiovaan vasta 1934." },
  { q: "Mikä on Deržprom?", a: "Deržprom on konstruktivistinen hallintorakennuskompleksi, joka valmistui 1928 ja jota pidetään ensimmäisenä neuvostoliittolaisena pilvenpiirtäjänä. Se seisoo yhä Vapaudenaukiolla, joka on yksi Euroopan suurimmista kaupunkiaukioista." },
],
    Kherson: [
  { q: "Miksi Herson perustettiin juuri tälle paikalle?", a: "Katariina Suuri antoi 1778 käskyn perustaa Herson uuden Mustanmeren laivaston tukikohdaksi ja telakaksi. Ensimmäinen suuri sotalaiva, 66-tykkinen linjalaiva, laskettiin telakalta vesille jo 1783." },
  { q: "Miksi Hersonin vesimeloni on niin kuuluisa?", a: "Alueen hiekkainen maaperä, runsas aurinko ja Dneprin alajuoksun lämmin ilmasto sopivat vesimelonin viljelyyn erinomaisesti. Hersonin alueesta on tullut Ukrainan tärkein vesimelonintuotantoalue, ja nimestä on tullut käytännössä oma laatumerkkinsä." },
  { q: "Miten Euroopan toiseksi suurin aavikko syntyi Ukrainaan?", a: "Oleškin hiekat ovat jääkauden aikaisia hiekkakerrostumia, jotka pysyivät kasvillisuuden peittäminä vuosisatoja. Vasta 1800-luvun liiallinen laiduntaminen ja metsien hakkuu paljastivat hiekan tuulen vietäväksi, ja alueesta muodostui laaja dyynialue, joka suojeltiin kansallispuistoksi 2010." },
],
    "Khmel'nyts'kyy": [
  { q: "Miksi Kamjanets-Podilskyissa järjestetään ilmapallofestivaali?", a: "Kaupungissa nähtiin Itä-Euroopan ensimmäinen kuumailmapallolento jo 1784. Perinnettä juhlitaan nykyään kahdesti vuodessa, touko- ja lokakuussa, kun parikymmentä ilmapalloa kohoaa Smotrytšin kanjonin ja linnan yläpuolelle." },
  { q: "Mitä Bakotan lahdelle tapahtui?", a: "Keskiaikainen Bakotan kylä, josta on maininta jo vuodelta 1024, jäi tekoaltaan alle vuonna 1981, kun Dnestrille rakennettiin vesivoimala. Ainoa säilynyt jäänne on kalliolle 1000-luvulla kaiverrettu luolaluostari, joka kohoaa yhä lahden yllä." },
  { q: "Kuka oli Bohdan Hmelnytski?", a: "Hän oli kasakkahetmani, joka johti 1648 suuren kapinan Puolan-Liettuan valtakuntaa vastaan ja perusti kasakkavaltion. Häntä pidetään yhtenä Ukrainan valtiollisuuden perustajahahmoista, ja hänen mukaansa maakunnan keskuskaupunki nimettiin uudelleen 1954." },
],
    Kiev: [
  { q: "Missä Tšornobyl sijaitsee ja miksi se yhä kiinnostaa matkailijoita?", a: "Tšornobyl sijaitsee noin 90 kilometriä Kiovasta pohjoiseen, Kiovan maakunnan alueella lähellä Valko-Venäjän rajaa. Vuoden 1986 ydinonnettomuuden jälkeen alue eristettiin, ja siitä tuli ennen täysimittaista sotaa yksi maailman tunnetuimmista niin sanotun pimeän matkailun kohteista." },
  { q: "Mikä on Perejaslavin liitto?", a: "Vuonna 1654 kasakkahetmani Bohdan Hmelnytski solmi Perejaslavissa liiton Venäjän tsaarin kanssa, jolla kasakkavaltio asetettiin Venäjän suojelukseen. Sopimuksen tulkinnasta ja seurauksista kiistellään historiantutkimuksessa yhä." },
  { q: "Mikä on Kiovan meri?", a: "Kiovan tekoallas rakennettiin Dneprille 1960-luvulla pääkaupungista pohjoiseen, ja se on niin laaja, että sitä kutsutaan leikkisästi Kiovan mereksi. Se on suosittu veneily- ja kalastuskohde kiovalaisille." },
],
    'Kiev City': [
  { q: "Miksi kastanja on Kiovan symboli?", a: "Puulaji tuotiin kaupunkiin 1842 keisari Nikolai I:n vierailun kunniaksi, ja se istutettiin ensin nykyiselle Ševtšenkon bulevardille. Kastanjat levisivät sittemmin kaikkialle kaupunkiin, ja niiden valkoinen kukinta toukokuussa on yhä yksi Kiovan tunnetuimmista näyistä." },
  { q: "Mikä on Pyhän Sofian katedraali?", a: "Se rakennettiin 1000-luvulla ruhtinas Jaroslav Viisaan aikana Konstantinopolin Hagia Sofian innoittamana. Sen alkuperäiset mosaiikit ja freskot ovat säilyneet poikkeuksellisen hyvin, ja se on ollut Unescon maailmanperintöä vuodesta 1990." },
  { q: "Mitä Maidanilla on tapahtunut 2000-luvulla?", a: "Aukio oli vuoden 2004 oranssin vallankumouksen ja vuosien 2013–2014 Euromaidan-mielenosoitusten näyttämö, jotka molemmat muuttivat Ukrainan politiikan suuntaa. Siitä on tullut maan tärkein paikka suurille kansalaisliikkeille." },
],
    Kirovohrad: [
  { q: "Miksi kaupunki on nimeltään Kropyvnytskyi mutta maakunta Kirovohrad?", a: "Kaupunki nimettiin 2016 dekommunisointilain nojalla uudelleen näytelmäkirjailija Marko Kropyvnytskyin mukaan, kun neuvostojohtaja Sergei Kirovin nimi haluttiin pois kaduilta. Maakunta kantaa yhä vanhaa Kirovohrad-nimeä, koska sen virallinen muuttaminen vaatisi oman erillisen parlamentin päätöksensä." },
  { q: "Miksi lokakuu 1882 on tärkeä päivä ukrainalaiselle teatterille?", a: "Marko Kropyvnytskyin johtama ryhmä esitti tuolloin Jelisavetgradissa ensimmäisen ammattimaisen ukrainankielisen näytelmän. Tapahtumaa pidetään yhä koko ukrainalaisen ammattiteatterin syntymäpäivänä, ja ryhmä yhdistyi pian toisen näytelmäkirjailijan, Mihailo Staritskyin, ryhmän kanssa." },
  { q: "Mikä oli kaupungin alkuperäinen nimi ja tehtävä?", a: "Kaupunki perustettiin 1754 nimellä Jelisavetgrad linnoituskaupungiksi suojaamaan aroa tataarien hyökkäyksiltä. Siitä kasvoi vuosisatojen myötä alueen kaupallinen ja kulttuurinen keskus." },
],
    "L'viv": [
  { q: "Miksi Lviv poikkeaa arkkitehtuuriltaan muusta Ukrainasta?", a: "Kaupunki kuului pitkään Puolalle ja vuodesta 1772 Itävalta-Unkarille osana Galitsiaa aina vuoteen 1918 asti, eikä koskaan Venäjän keisarikunnalle. Siksi sen arkkitehtuuri ja kaupunkikuva muistuttavat enemmän Keski-Euroopan kuin Itä-Ukrainan kaupunkeja." },
  { q: "Mistä legenda Lvivin ja Wienin kahvikulttuurin yhteydestä kertoo?", a: "Legendan mukaan lvivilaissyntyinen Jerzy Franciszek Kulczycki avasi Wienin ensimmäisen kahvilan 1683 käyttäen kahvipapuja, jotka piiritystä paenneet ottomaanit olivat jättäneet jälkeensä. Tarinan historiallisesta paikkansapitävyydestä kiistellään yhä, mutta se elää yhä osana molempien kaupunkien kahvikulttuuria." },
  { q: "Miksi Lvivin ooppera on rakennettu joen päälle?", a: "Rakennus valmistui 1900 paikalle, jossa aiemmin virtasi Poltva-joki katujen alla. Arkkitehti Zygmunt Gorgolewski ohjasi joen kulkemaan maan alla rakennuksen perustusten läpi ja käytti tuolloin uutuutena teräsbetoniperustaa." },
],
    "Luhans'k": [
  { q: "Miksi Striltsivskyin arolla suojellaan juuri aromurmelia?", a: "Aromurmeli eli bobak oli aikoinaan yleinen koko eteläisellä arovyöhykkeellä, mutta peltojen raivaus hävitti sen elinympäristön lähes kokonaan. Striltsivskyin suojelualue perustettiin 1900-luvulla juuri viimeisen jäljellä olevan aropalan ja sen murmelikannan turvaksi, ja se on yhä yksi harvoista paikoista, jossa koskematon aro on säilynyt." },
  { q: "Mikä Derkulin hevostila on ja miksi se on tunnettu?", a: "Derkulin hevostila lähellä Danylivkan kylää perustettiin 1765 keisarinna Katariina II:n käskystä kasvattamaan ratsuja armeijalle. Tilalla jalostettiin 1900-luvulla myös oma rotu, ukrainalainen ratsuhevonen, ja tila toimii yhä hevoskasvattamona, vaikka eläinten määrä on vuosien varrella pienentynyt huomattavasti." },
  { q: "Mistä nimi Donbas oikein tulee?", a: "Donbas on lyhenne sanoista Donetsin kivihiiliallas, ja se viittaa maaperän laajoihin hiilivarantoihin. Alue teollistui voimakkaasti jo 1800-luvun jälkipuoliskolla, kun kaivoksia ja tehtaita nousi sekä nykyiselle Donetskin että Luhanskin alueelle." },
],
    Mykolayiv: [
  { q: "Miksi kaupunki sai nimekseen Mykolajiv eli Nikolajev?", a: "Ruhtinas Potjomkin nimesi uuden telakkakaupungin Pyhän Nikolauksen mukaan muistoksi siitä, että Venäjän joukot valtasivat Otšakivin linnoituksen juuri pyhimyksen nimipäivänä joulukuussa 1788. Nikolaus on myös merenkulkijoiden suojeluspyhimys, mikä sopi hyvin uudelle laivanrakennuskaupungille." },
  { q: "Mitä Mykolajivin telakoilla on rakennettu vuosien varrella?", a: "Telakat rakensivat 1700-1800-luvuilla purjelaivoja ja myöhemmin höyrylaivoja Venäjän Mustanmeren laivastolle, ja Neuvostoliiton aikana samoilla telakoilla valmistui muun muassa lentotukialuksia. Perinne teki Mykolajivista yhden koko imperiumin ja myöhemmin Neuvostoliiton tärkeimmistä laivanrakennuskeskuksista." },
  { q: "Mikä Olbia oli ja mitä sille tapahtui?", a: "Olbia oli antiikin kreikkalaisten Miletoksesta perustama kauppasiirtokunta 600-luvulla eaa. Etelä-Bugin suistoon, ja se kävi kauppaa viljalla ja käsitöillä ympäri Mustaamerta. Kaupunki hiipui vähitellen ja autioitui viimeistään 300-luvulla, ja sen rauniot ovat nykyään arkeologinen kohde Parutynen kylän lähellä." },
],
    Odessa: [
  { q: "Kuinka pitkät Odessan katakombit oikein ovat?", a: "Katakombeja on kartoitettu noin 2500 kilometrin verran, mikä tekee niistä maailman pisimmän kaupungin alla kulkevan käytäväverkoston – viisi kertaa pidemmän kuin Pariisin katakombit. Suurin osa käytävistä syntyi, kun kaupungin rakennuskivi eli kalkkikivi louhittiin suoraan maan alta 1800-luvulla." },
  { q: "Miksi Odessaa kutsutaan huumorin pääkaupungiksi?", a: "Kaupungilla on pitkä perinne terävästä, itseironisesta huumorista, joka syntyi sen monikansallisesta ja vilkkaasta satamakaupunkikulttuurista. Perinnettä juhlitaan joka vuosi huhtikuun alussa Humoryna-karnevaalilla, jolloin kaduilla kulkee klovneja ja koomikkoja." },
  { q: "Mikä tekee Odessan oopperatalosta erityisen?", a: "Talo valmistui 1887 wieniläisten arkkitehtien suunnitelmien mukaan wieniläisbarokin tyyliin, ja se oli aikanaan ensimmäinen teatteri koko alueella, jossa oli sähkövalot ja keskuslämmitys. Se on säilynyt yhtenä Itä-Euroopan komeimmista teattereista." },
],
    Poltava: [
  { q: "Mikä on Eneida ja miksi se on niin tärkeä?", a: "Poltavassa syntynyt Ivan Kotljarevskyi julkaisi 1798 Eneidan, ensimmäisen kokonaan ukrainankielisellä puhekielellä kirjoitetun kaunokirjallisen teoksen. Hänen poltavalainen murteensa muovasi pitkälti nykyisen ukrainan kirjakielen perustaa, minkä vuoksi häntä pidetään modernin ukrainalaisen kirjallisuuden isänä." },
  { q: "Mitä Poltavan taistelussa 1709 tapahtui?", a: "Venäjän tsaari Pietari Suuri kukisti taistelussa Ruotsin kuningas Kaarle XII:n joukot, mikä murskasi Ruotsin suurvalta-aseman Itä-Euroopassa lopullisesti. Taistelukentällä toimii nykyään historiallinen museo ja muistomerkkejä molempien osapuolten kaatuneille." },
  { q: "Miksi Opišnja tunnetaan keramiikasta?", a: "Kylän savimaa sopii erinomaisesti keramiikkaan, ja siellä on valmistettu koristeltuja saviastioita perinteisin menetelmin jo 1800-luvulta lähtien. Nykyään paikkakunnalla toimii Ukrainan kansallinen keramiikkamuseo, ja perinnettä jatkavat yhä paikalliset savenvalajasuvut." },
],
    Rivne: [
  { q: "Miksi Ostrohin akatemiaa pidetään niin merkittävänä?", a: "Akatemia perustettiin 1576, ja sitä pidetään koko itäslaavilaisen maailman ensimmäisenä korkeakouluna. Se ehti taantua jo 1600-luvulla ruhtinassuvun sammuttua, mutta nykyinen Ostrohin kansallinen yliopisto jatkaa sen perintöä samalla paikalla." },
  { q: "Miten Rivnen basalttipatsaat syntyivät?", a: "Patsaat syntyivät satojen miljoonien vuosien takaisesta laavavirrasta, joka jäähtyi hitaasti ja halkeili säännöllisiksi, kuusikulmaisiksi pylväiksi. Ne löydettiin vasta 1700-luvulla, kun paikallinen talonpoika iski lapionsa kiveen kaivoa kaivaessaan, ja löytöpaikan kylä sai siitä nimekseen Basaltove." },
  { q: "Mistä Rakkauden tunnelin vihreä holvi on peräisin?", a: "Kyseessä on tavallinen, yhä käytössä oleva teollisuusrata Klevanin lähellä, jonka varrella kasvavat puut ovat vuosikymmenten aikana kasvaneet yhteen vihreäksi holviksi junien yläpuolelle. Paikasta tuli suosittu valokuvauskohde vasta 2000-luvulla, kun kuvat alkoivat levitä verkossa." },
],
    Sumy: [
  { q: "Kuka oli Harytonenko ja miksi hänen sukunsa on Sumyssa niin näkyvä?", a: "Ivan Harytonenko rakensi Sumyhin 1869 suuren sokeritehtaan, josta kasvoi yksi Venäjän keisarikunnan johtavista. Suku vaurastui nopeasti yhdeksi imperiumin rikkaimmista ja rahoitti kaupunkiin kouluja, sairaaloita ja komeita rakennuksia, jotka seisovat yhä keskustassa." },
  { q: "Mikä teki Hluhivista niin merkittävän 1700-luvulla?", a: "Hluhiv toimi kasakkahetmanaatin pääkaupunkina vuosina 1708–1764, jolloin Ukrainan kasakkavaltion johto istui siellä. Kaupunkiin perustettiin 1730 Venäjän keisarikunnan ensimmäinen laulukoulu, joka koulutti muun muassa hovilaulajia Pietariin." },
  { q: "Mitä Sumyssa tehdään nykyään elannokseen?", a: "Kaupunki on pitkälti yliopisto- ja teollisuuskaupunki, jossa koneenrakennus, muun muassa pumppujen ja teollisuuslaitteiden valmistus, työllistää yhä paljon ihmisiä. Sumyn valtionyliopisto tuo kaupunkiin joka vuosi tuhansia opiskelijoita ympäri Ukrainaa." },
],
    "Ternopil'": [
  { q: "Miksi Optymistytšna on maailman pisin kipsiluola?", a: "Luola on syntynyt, kun vesi on vuosituhansien aikana liuottanut kalkkikiven alla olevaa kipsikerrostumaa, ja tulokseksi on syntynyt poikkeuksellisen laaja, tiheä käytäväverkosto. Käytäviä on kartoitettu noin 264 kilometriä, mikä tekee siitä maailman pisimmän tunnetun kipsiluolan." },
  { q: "Mikä on Potšaivin luostari ja miksi se on niin tärkeä?", a: "Potšaivin luostari on yksi ortodoksisen kirkon tärkeimmistä pyhiinvaelluskohteista, ja legendan mukaan sen perustivat 1240-luvulla Kiovan luostarista mongolihyökkäystä paenneet munkit. Sen 65-metrinen kellotorni on yksi Ukrainan korkeimmista, ja luostariin saapuu yhä tuhansia pyhiinvaeltajia joka vuosi." },
  { q: "Miksi Ternopilin alue tuntuu erilaiselta kuin Itä-Ukraina?", a: "Alue kuului 1800-luvulla Venäjän sijaan Itävalta-Unkarin Galitsiaan, mikä toi mukanaan kreikkalaiskatolisen kirkon ja keskieurooppalaisia rakennustapoja. Vaikka alue on nykyään osa yhtenäistä Ukrainaa, murre ja monet perinteet muistuttavat yhä läntisiä naapureita." },
],
    Transcarpathia: [
  { q: "Miksi Transkarpatiassa asuu niin paljon unkarilaisia?", a: "Alue kuului satoja vuosia Unkarin kuningaskuntaan ja siis myös Itävalta-Unkariin, aina ensimmäisen maailmansodan päättymiseen asti. Vaikka raja siirtyi sodan jälkeen, unkarinkielinen vähemmistö jäi asumaan alueelle, ja sillä on yhä omat koulunsa ja lehtensä." },
  { q: "Mistä Narsissien laakson kukat tulevat?", a: "Kyseessä on villi narsissilaji, joka on säilynyt alueella erityisen kosteassa niittyilmastossa jääkaudesta lähtien. Laakso rauhoitettiin luonnonsuojelualueeksi, jotta harvinainen kasvusto ei häviäisi niityn kuivumisen tai muokkaamisen myötä." },
  { q: "Mikä tekee Užhorodin linnasta erityisen?", a: "Linna on rakennettu keskiajalla kukkulalle kaupungin ylle, ja sen ulkoasu on saanut vahvoja vaikutteita Unkarin ja Itävallan arkkitehtuurista vuosisatojen hallinnan aikana. Nykyään linnassa toimii alueellinen historiamuseo." },
],
    Vinnytsya: [
  { q: "Miksi Pirogovin ruumis on säilytetty Vinnytsjan lähellä?", a: "Kirurgi Nikolai Pirogov halusi testamentissaan, että hänen ruumiinsa balsamoidaan hänen kuolemansa jälkeen 1881. Toive toteutettiin, ja ruumis lepää yhä lasikannen alla hänen kotikartanonsa kirkon kryptassa Vinnytsjan liepeillä." },
  { q: "Mikä tekee Vinnytsjan suihkulähteestä Euroopan suurimman?", a: "Etelä-Bugin rannalla sijaitseva kelluva suihkulähde ampaisee vettä 60 metrin korkeuteen ja levittäytyy 140 metrin matkalle joen pinnalla. Talveksi koko rakennelma lasketaan joen pohjaan suojaan jäätymiseltä ja nostetaan taas keväällä esiin." },
  { q: "Kuka sävelsi tunnetun joululaulun Carol of the Bells?", a: "Säveltäjä Mykola Leontovytš työskenteli opettajana Tultšynissa, kun hän sovitti 1914 vanhan ukrainalaisen kansanlaulun Štšedrykiksi. Melodia levisi myöhemmin Yhdysvaltoihin, jossa siitä tuli tunnettu joululauluna nimellä Carol of the Bells." },
],
    Volyn: [
  { q: "Miksi Svitjaz-järvi on niin kuuluisa?", a: "Svitjaz on Ukrainan syvin järvi ja yksi kirkasvetisimmistä, sillä sen ravinnepitoisuus on hyvin alhainen. Se on osa Šatskin kansallispuiston yli kolmenkymmenen järven ryhmää, ja kesäisin sen rannoille kerääntyy tuhansia kylpijöitä." },
  { q: "Miksi Lubartin linna on painettu Ukrainan seteliin?", a: "Lutskin Lubartin linna on yksi maan parhaiten säilyneistä keskiaikaisista linnoista, ja sen 1300-luvulla rakennettu porttitorni on kansallisesti tunnistettava maamerkki. Siksi se valittiin 200 hryvnian setelin kuva-aiheeksi." },
  { q: "Kuinka paljon lintuja Šatskin järvillä lepää muuttoaikana?", a: "Parhaimpina muuttopäivinä alueen järvillä ja niiden rannoilla voi levätä samanaikaisesti kymmeniätuhansia lintuja. Alueen monipuoliset kosteikot houkuttelevat yli 240 lintulajia, minkä vuoksi se on suosittu lintubongareiden kohde." },
],
    Zaporizhzhya: [
  { q: "Miksi Hortytsjan saaresta tuli kasakoiden tukikohta?", a: "Ennen 1930-lukua Dneprin uomassa oli saaren kohdalla useita koskia ja putouksia, jotka tekivät joesta lähes mahdottoman ylittää vihollisjoukoille. Tämä luonnollinen este teki saaresta turvallisen paikan kasakkojen linnoitukselle, sitšille, joka sijaitsi historian aikana useaan otteeseen juuri täällä." },
  { q: "Mitä koskille tapahtui, kun ne peitettiin veden alle?", a: "Neuvostoliiton ensimmäisiin suuriin teollisuushankkeisiin kuulunut Dneprogesin voimalapato valmistui 1932, ja sen tekoallas hukutti koko koskijakson pysyvästi. Samalla joesta tuli ensimmäistä kertaa laivaliikenteelle kelpoinen koko matkaltaan." },
  { q: "Mitä Hortytsjan elävän historian museossa tehdään?", a: "Saarella toimii rekonstruoitu kasakkalinnoitus, jossa oppaat pukeutuvat 1500–1700-lukujen kasakka-asuihin ja esittelevät ajan käsitöitä, aseita ja elämäntapaa. Museo järjestää vuosittain suuria juhlia, kuten pääsiäisjuhlan ja syksyn Pokrova-juhlan, jotka vetävät paikalle tuhansia kävijöitä." },
],
    Zhytomyr: [
  { q: "Miksi Balzac meni naimisiin juuri Berdytšivissä?", a: "Kirjailija Honoré de Balzacin kihlattu, puolalainen kreivitär Ewelina Hańska, asui perheineen lähellä sijaitsevassa Verhivnjan kartanossa. Pariskunta oli kirjeenvaihtanut lähes 18 vuotta ennen kuin he vihittiin 1850 kaupungin Pyhän Barbaran kirkossa." },
  { q: "Kuka oli Sergei Koroljov ja miksi hän on niin tärkeä?", a: "Koroljov syntyi Žytomyrissa 1907 ja hänestä tuli myöhemmin Neuvostoliiton avaruusohjelman johtava suunnittelija. Hän vastasi muun muassa ensimmäisen satelliitin Sputnikin ja ensimmäisen ihmisen avaruuslennon teknisestä toteutuksesta." },
  { q: "Kuka oli Vasili Grossman?", a: "Grossman syntyi Berdytšivissä 1905 ja työskenteli myöhemmin sotakirjeenvaihtajana toisessa maailmansodassa. Hänen kirjoituksiaan pidetään yhtenä ajan tärkeimmistä silminnäkijäkuvauksista, ja hänen myöhempi romaaninsa Elämä ja kohtalo on yksi 1900-luvun merkittävimmistä venäjänkielisistä teoksista." },
],
  },
  BGR: {
    Blagoevgrad: [
      { q: "Miksi Blagoevgradissa opiskelee niin paljon ulkomaalaisia nuoria?", a: "Kaupungissa toimii Amerikan yliopisto Bulgariassa, joka perustettiin 1991 kommunismin kaatumisen jälkeen ensimmäisenä amerikkalaistyylisenä liberaalien taiteiden yliopistona Itä-Euroopassa. Nykyään siellä opiskelee yli tuhat opiskelijaa yli neljästäkymmenestä maasta ympäri maailmaa." },
      { q: "Milloin Banskon jazzfestivaalia vietetään ja kuinka pitkään sitä on järjestetty?", a: "Festivaali järjestetään joka elokuu kaupungin torilla, ja se on Bulgarian suurin kesäinen musiikkitapahtuma. Sitä on järjestetty jo lähes 30 vuoden ajan, ja moni ulkoilmakonsertti on ilmainen." },
      { q: "Miksi Melnikin viiniä pidetään erityisenä?", a: "Melnikin seudulla on viljelty viiniä yli 8000 vuoden ajan, ja alueen oma Shiroka Melnishka -rypäle ei kasva juuri missään muualla. Viini oli suosittua jo eurooppalaisten hovien pöydissä 1700–1800-luvuilla, ja muun muassa Winston Churchill piti siitä." },
    ],
    Burgas: [
      { q: "Milloin Burgasin Merenrantapuisto rakennettiin ja millainen paikka siellä oli aiemmin?", a: "Ensimmäiset puut istutti sotilasrykmentti jo 1889, mutta varsinaisen puiston suunnitteli arkkitehti Georgi Duhtev vuodesta 1910 alkaen. Paikalla oli aiemmin rannan ja kaupungin välinen suoalue, josta hän loi yhden Bulgarian kauneimmista puistoista." },
      { q: "Mistä hiekkaveistoksiin käytetty hiekka ja veistäjät tulevat?", a: "Veistäjät saapuvat Burgasiin joka kesä eri puolilta maailmaa, ja he työskentelevät Ezero-puistossa vain hiekalla ja vedellä. Festivaali järjestetään heinä-elokuussa, kun sää pitää patsaat parhaiten pystyssä." },
      { q: "Miksi Burgas haluaa Euroopan kulttuuripääkaupungiksi?", a: "Kaupunki on ehdolla arvonimeen vuonna 2032 ja käyttää muun muassa hiekkaveistosfestivaalia ja muita kesätapahtumia osoittaakseen kulttuurista tarjontaansa. Arvonimi toisi kaupungille näkyvyyttä ja matkailijoita ympäri Eurooppaa." },
    ],
    Dobrich: [
      { q: "Mitä Kaliakran niemellä oikein tapahtui?", a: "Legendan mukaan 1300-luvun lopulla, kun hyökkääjät murtautuivat niemen linnoitukseen, neljäkymmentä bulgarialaista neitoa sitoi hiuksensa yhteen palmikkoon ja hyppäsi mieluummin mereen kuin antautui vangeiksi. Niemen portilla seisoo yhä obeliski heidän muistokseen." },
      { q: "Miksi Dobrudžaa kutsutaan Bulgarian viljavarastoksi?", a: "Alueen tumma, syvä maaperä ja kuiva ilmasto sopivat erinomaisesti vehnälle, auringonkukalle ja maissille. Dobrudžan maatalousinstituutin kehittämiä vehnälajikkeita on kylvetty jopa yli 80 prosentilla Bulgarian vehnäpelloista." },
    ],
    Gabrovo: [
      { q: "Mitä Etaran ulkoilmamuseossa voi nähdä?", a: "Museo esittelee Gabrovon seudun elämää 1700–1800-lukujen taitteessa: kivetyllä kadulla toimii käsityöläisten verstaita, joissa voi katsoa metallin, nahan, puun ja villan käsittelyä paikan päällä. Museo avattiin 1964 ja sijaitsee noin 9 kilometrin päässä Gabrovon keskustasta." },
      { q: "Miten Sivek-joki liittyy museon toimintaan?", a: "Joen vesi ohjataan kanavaa pitkin peräkkäin kymmeneen eri laitokseen, kuten vesimyllyihin, huopatehtaaseen ja sahaan. Näin sama vesi pyörittää montaa konetta ennen kuin se palaa jokeen." },
    ],
    'Grad Sofiya': [
      { q: "Miten Sofian roomalaiset rauniot löytyivät?", a: "Ne paljastuivat metrotyömaalla vuosina 2010–2012, kun Serdika-asemaa kaivettiin keskustan alle. Esiin tuli lähes 9000 neliömetrin alue vanhoja katuja, kylpylöitä ja varhaiskristillinen basilika, jotka ovat pääosin 300–600-luvuilta." },
      { q: "Kuinka lähellä Sofian keskustaa pääsee laskettelemaan?", a: "Vitosha-vuoren hiihtokeskukseen pääsee keskustasta noin puolessa tunnissa autolla tai hissillä Sofian Simeonovon kaupunginosasta. Vuorella on rinteitä sekä aloittelijoille että kokeneille laskijoille, ja osa rinteistä on valaistu iltahiihtoa varten." },
    ],
    Haskovo: [
      { q: "Miksi tupakka oli Haskovolle niin tärkeä elinkeino?", a: "Ottomaanien vallan päätyttyä 1878 alueen ilmasto ja maaperä osoittautuivat erinomaisiksi laatutupakalle, ja Haskovosta tuli 1900-luvun alkuun mennessä Bulgarian johtava tupakanviljelyalue. Tupakkateollisuus työllisti kaupungissa eniten väkeä ja pääomaa vuosikymmenten ajan." },
      { q: "Onko Haskovossa enää tupakkateollisuutta?", a: "Ei juurikaan – kaupungin suuri tupakkayhtiö Haskovo-BT suljettiin 2005, eikä alueella valmisteta enää savukkeita. Nykyään suurimmat työnantajat toimivat elintarvike-, kone- ja tekstiiliteollisuudessa." },
      { q: "Mitä Kenanan puistossa voi tehdä?", a: "Puisto on Haskovon suurin, yli 230 hehtaaria, ja siellä on tekojärvi, kävelyreittejä ja pieni eläintarha. Paikalliset käyttävät sitä ulkoiluun, uintiin ja urheiluun – muun muassa tennistähti Grigor Dimitrov aloitti uransa juuri Kenanan kentillä." },
    ],
    Yambol: [
      { q: "Mikä Kabile oikein oli?", a: "Kabile oli traakialaisten kuninkaiden Spartokoksen ja Skostokoksen residenssikaupunki jo ennen ajanlaskun alkua, ja sillä oli oma rahapajansa – harvinaista aikansa kaupungeille. Se oli yksi Traakian tärkeimmistä poliittisista ja uskonnollisista keskuksista 1. vuosituhannella eaa." },
      { q: "Milloin Kabilesta tuli suojelualue ja mitä siellä voi nähdä nykyään?", a: "Alue rauhoitettiin arkeologiseksi reservaatiksi 1965, ja se kattaa noin 65 neliökilometriä. Paikan museossa on esillä muun muassa lähes 2400 vuotta sitten haudatun traakialaissoturin pronssikypärä ja rautainen suomupanssari." },
    ],
    Kardzhali: [
      { q: "Miksi Paholaisen siltaa kutsutaan juuri niin?", a: "Kansanperinteen mukaan paikalle rakennetut sillat sortuivat kerta toisensa jälkeen ennen kuin mestarirakentaja Dimitar sai lopulta valmiiksi kestävän sillan – uskottiin, että paikkaa vaivasi kirous. Nykyinen kolmikaarinen kivisilta valmistui 1515–1518 sulttaani Selim I:n käskystä, ja se palveli tärkeällä kauppareitillä Egeanmereltä Traakiaan." },
      { q: "Miksi Kardžali on Bulgarian ainutlaatuinen kunta väestöltään?", a: "Se on maan ainoa maakuntakeskuksen kunta, jossa muslimit muodostavat enemmistön – suuri osa heistä etnisiä turkkilaisia, osa taas bulgariankielisiä muslimeja eli pomakkeja. Kaupungissa moskeijat ja kirkot toimivat rinnakkain, ja alueen politiikkaa hallitsee usein turkkilaisvähemmistön oma puolue." },
      { q: "Mihin Kardžalin tekojärveä käytetään?", a: "Arda-jokeen 1957–1963 rakennettu pato tuottaa vesivoimaa koko seudulle ja on osa kolmen padon ketjua joella. Tekojärvi on suosittu myös kalastuksesta, veneilystä ja retkeilystä nauttiville." },
    ],
    Kyustendil: [
      { q: "Miksi Kyustendiliä kutsutaan Bulgarian hedelmätarhaksi?", a: "Seudun ilmasto ja maaperä sopivat erinomaisesti hedelmäpuille, erityisesti kirsikoille, ja alueella korjataan vuosittain tuhansia tonneja satoa. Ensimmäinen kansallinen hedelmänviljelynäyttely järjestettiin Kyustendilissä jo 1896, ja kesäkuun kirsikkafestivaali jatkaa perinnettä yhä." },
      { q: "Mistä Pautalia-nimi tulee ja miksi roomalaiset arvostivat paikkaa?", a: "Pautalia oli kaupungin roomalaisaikainen nimi, ja se tunnettiin kuumista mineraalilähteistään jo antiikin ajalta. Jopa keisarit, kuten Traianus ja Septimius Severus, matkustivat sinne hoitamaan vaivojaan kylpylöiden lähteillä." },
    ],
    Lovech: [
      { q: "Kuka rakensi Lovechin katetun sillan ja miksi?", a: "Rakennusmestari Kolyu Ficheto sai tehtäväkseen rakentaa uuden sillan, kun edellinen tuhoutui tulvassa 1872. Hän rakensi 84 metriä pitkän katetun puusillan vuosina 1874–1876, ja sillalle mahtui 64 kauppakojua." },
      { q: "Mitä alkuperäiselle sillalle tapahtui?", a: "Silta kesti yllättävän hyvin – se selvisi ehjänä Venäjän–Turkin sodasta 1877–78 ja vuoden 1897 suurtulvasta. Lopulta tulipalo tuhosi rakennuksen elokuussa 1925, ja nykyinen betoninen silta rakennettiin 1927–1931 alkuperäisen näköiseksi." },
    ],
    Montana: [
      { q: "Miksi Montana on vaihtanut nimeään niin monta kertaa?", a: "Kaupungin nimi on seurannut Bulgarian historian käänteitä: se sai nimen Ferdinand ruhtinaan kunniaksi vuonna 1891, sitten kommunistijohtaja Hristo Mihaylovin mukaan Mihaylovgrad vuonna 1945. Kommunismin päätyttyä kaupunki valitsi 1993 nimekseen Montanan roomalaisen linnoituksen Castra ad Montanesium mukaan." },
      { q: "Mitä Ogosta-järven alta joskus paljastuu?", a: "Kun tekojärven vedenpinta laskee kuivina kausina, veden alle jääneiden kylien raunioita on noussut näkyviin rannalle. Järvi on pinta-alaltaan Bulgarian toiseksi suurin, ja sen pato valmistui 1986 kaksikymmentä vuotta kestäneen rakennustyön jälkeen." },
    ],
    Pazardzhik: [
      { q: "Mitä Batakissa tapahtui vuonna 1876?", a: "Huhtikuun kansannousun kukistuessa osmanien apujoukot surmasivat kaupungissa arvioiden mukaan 3000–5000 asukasta, monet heistä Sveta Nedelja -kirkkoon piiloutuneina. Tapahtuma on yksi tunnetuimmista esimerkeistä kansannousun julmasta tukahduttamisesta." },
      { q: "Mikä Sveta Nedelja -kirkosta tuli myöhemmin?", a: "Kirkosta, joka rakennettiin alun perin paikallisten voimin jo 1813, on nykyään muistomerkki ja osaruumishuone tapahtumien uhreille. Se on yhä tärkeä käyntikohde, kun bulgarialaiset muistelevat huhtikuun kansannousua." },
      { q: "Miksi Velingradia kutsutaan Balkanin kylpyläpääkaupungiksi?", a: "Kaupungissa ja sen ympärillä pulppuaa yli 90 mineraalilähdettä Rodopien pohjoisrinteillä. Lähteiden ympärille on rakennettu lukuisia kylpylähotelleja, jotka houkuttelevat vierailijoita eri puolilta Eurooppaa." },
    ],
    Pernik: [
      { q: "Mikä Surva-festivaali on?", a: "Se on kansainvälinen naamiaisperinteiden festivaali, jota on järjestetty Pernikissä vuodesta 1966 ja kansainvälisenä vuodesta 1985. Se on suurin tapahtumansa laatuinen koko Balkanilla ja kokoaa yli 5000 osallistujaa noin 90 ryhmästä." },
      { q: "Mitä kukeri-naamioilla ja kelloilla tavoitellaan?", a: "Perinteen mukaan suurilla kelloilla ja pelottavilla naamioilla karkotetaan pahat henget ja houkutellaan hyvä sato ja onni tulevalle vuodelle. Tavat juontuvat vanhoista maatalousriiteistä, jotka ovat säilyneet Pernikin seudulla sukupolvien ajan." },
      { q: "Milloin festivaali järjestetään?", a: "Surva järjestetään joka vuosi tammikuun viimeisenä viikonloppuna, ja sen ydin on kaksipäiväinen naamiaisryhmien paraati ja kilpailu. Mukana on ryhmiä myös Euroopan, Aasian ja Afrikan ulkopuolelta." },
    ],
    Pleven: [
      { q: "Mitä erikoista Kaylakan puiston kallioista löytyy?", a: "Puiston kalkkikivijyrkänteet paljastavat miljoonien vuosien takaisia muinaisten vedeneliöiden fossiileja, jotka näkyvät paljain silmin kallion pinnassa. Kalliot kertovat myös siitä, miten muinaiset merten pinnat ovat vuosituhansien saatossa laskeneet." },
      { q: "Mikä Storgosia oli?", a: "Storgosia oli roomalaisaikainen linnoitus, jonka rauniot sijaitsevat Kaylakan laaksossa. Se oli osa laajempaa roomalaista puolustusverkostoa alueella, joka tunnettiin myöhemmin Pleveniksi." },
      { q: "Milloin Kaylakasta tuli puisto?", a: "Alue julistettiin kansanpuistoksi 1946 entisen metsästysalueen, Sokol-puiston, tilalle. Sittemmin puistoa on laajennettu lähes nelinkertaiseksi ja sinne on rakennettu altaita, uimaranta ja muita vapaa-ajan palveluita." },
    ],
    Plovdiv: [
      { q: "Onko totta, että Plovdiv on Euroopan vanhin yhtäjaksoisesti asuttu kaupunki?", a: "Tarkkaa 'vanhin'-titteliä ei voi todistaa, mutta Plovdiv on yksi vahvimmista ehdokkaista: asutusjäljet ulottuvat kuudennelle vuosituhannelle eaa. asti. Myös Kreikan Argos ja Italian Matera kilpailevat samasta tittelistä omilla löydöillään." },
      { q: "Miten roomalainen teatteri löytyi keskeltä nykyistä kaupunkia?", a: "Teatteri oli vuosisatoja maan alla, kunnes se paljastui arkeologikaivauksissa 1968–1979 kaupungin kukkulan rinteeltä. Keisari Trajanuksen ajalta peräisin oleva teatteri mahtuu nykyään 5 000–7 000 katsojaa, ja siellä järjestetään yhä kesäisin konsertteja." },
      { q: "Mikä teki Kapanasta niin suositun kaupunginosan?", a: "Kapana oli aikoinaan käsityöläisten ja kauppiaiden mutkitteleva kortteli, joka rappeutui 1900-luvulla. 2010-luvulla se herätettiin henkiin kahviloiden, gallerioiden ja katutaiteen avulla, ja siitä tuli Plovdivin trendikkäin alue etenkin kulttuuripääkaupunkivuonna 2019." },
    ],
    Razgrad: [
      { q: "Mitä erikoista Sveshtarin haudassa on?", a: "Haudan keskikammiossa on kymmenen naishahmoista veistettyä pylvästä, puoliksi ihmisiä ja puoliksi kasveja, jollaisia ei tunneta mistään muualta traakialaisesta taiteesta. Hauta rakennettiin 300-luvun ensimmäisellä neljänneksellä eaa. ja löytyi vasta 1982, minkä jälkeen Unesco otti sen maailmanperintöluetteloonsa 1985." },
      { q: "Kuka oli Demir Baba, jolle Sboryanovoon rakennettiin pyhäkkö?", a: "Demir Baba oli 1500-luvulla elänyt alevimuslimien pyhä mies, jonka uskotaan haudatun kalliolähteen äärelle. Samaa paikkaa on palvottu pyhänä jo traakialaisajoista lähtien, ja pyhiinvaeltajia käy siellä yhä nykyään." },
      { q: "Mitä Abrituksen luona tapahtui vuonna 251?", a: "Goottien joukot kukistivat siellä Rooman armeijan, ja keisari Decius kaatui taistelussa – ensimmäinen Rooman keisari, joka kuoli taistelukentällä vihollista vastaan. Raunioalue on nykyään avoinna kävijöille Razgradin liepeillä." },
    ],
    Ruse: [
      { q: "Miksi Rusea kutsutaan pieneksi Wieniksi?", a: "Kaupungin bulevardit ja aukiot rakennettiin 1800-luvun lopulla uusklassiseen ja art nouveau -tyyliin, osin samojen arkkitehtien suunnittelemina kuin Wienissä. Rakennukset erottuivat selvästi muusta tuolloin osmanivallan alaisesta Bulgariasta, ja lempinimi on säilynyt tähän päivään." },
      { q: "Kuka oli Elias Canetti ja mitä tekemistä hänellä on Rusen kanssa?", a: "Canetti syntyi Rusessa 1905 sefardijuutalaiseen kauppiasperheeseen ja vietti siellä lapsuutensa ensimmäiset vuodet. Hän muutti myöhemmin useisiin Euroopan maihin ja sai Nobelin kirjallisuuspalkinnon 1981, muun muassa Rusen monikielistä lapsuuttaan kuvaavista muistelmistaan." },
      { q: "Miksi Ystävyyden silta oli niin pitkään ainoa siltayhteys Bulgarian ja Romanian välillä?", a: "Silta valmistui 1954 neuvostoinsinöörien suunnitelmien mukaan ja oli vuosikymmeniä ainoa kiinteä yhteys maiden välillä, vaikka Tonava erottaa ne toisistaan satoja kilometrejä. Toinen silta, Uusi Eurooppa -silta, avattiin vasta 2013 kaukana ylävirtaan Vidinin kohdalla." },
    ],
    Silistra: [
      { q: "Miksi Silistran roomalaishauta on niin erikoinen?", a: "Se on ainoa Bulgariasta löydetty roomalaisajan hauta, jonka kaikki seinät ja katto on maalattu freskoin metsästys- ja perheaiheilla. Hauta löytyi vahingossa 1942 kaupungin laidalta, ja yllättäen se osoittautui tyhjäksi – kukaan ei koskaan haudattu sinne." },
      { q: "Miksi Srebarnan järvi on niin tärkeä linnuille?", a: "Järvi on yksi harvoista paikoista Euroopassa, joissa kiharapelikaani vielä pesii luonnossa. Suojelualue liitettiin Unescon maailmanperintöluetteloon 1983, ja alueella on havaittu satoja lintulajeja." },
      { q: "Mikä Durostorum oikein oli?", a: "Durostorum oli roomalaisen XI legioonan tukikohta ja myöhemmin tärkeä kaupunki Alatonavan varrella – nykyisen Silistran suora edeltäjä. Se toimi vuosisatoja Rooman valtakunnan rajavartiona." },
    ],
    Sliven: [
      { q: "Miksi Sliveniä kutsutaan sadan vojvodan kaupungiksi?", a: "Kaupungin yllä kohoavat jyrkät kalliot tarjosivat 1800-luvulla piilopaikkoja osmanivaltaa vastustaneille kapinallisjohtajille eli vojvodoille. Moni heistä käytti aluetta tukikohtanaan ennen hyökkäyksiään, ja lempinimi on säilynyt kaupungin maineessa tähän päivään." },
      { q: "Kuka oli Hadži Dimitar?", a: "Hän oli yksi tunnetuimmista Bulgarian vapaustaistelijoista, syntynyt Slivenissä 1840. Hän kaatui taistelussa osmanijoukkoja vastaan 1868, ja hänen lapsuudenkotinsa on nykyään museona keskustassa." },
      { q: "Miksi juuri Sliveniin perustettiin Bulgarian ensimmäinen tehdas?", a: "Dobri Zhelyazkov oli oppinut kutomatekniikkaa Venäjällä ja toi mukanaan koneita, kun hän perusti 1834 Sliveniin villakangastehtaan – koko Osmanivaltakunnan ensimmäisen. Tehdas valmisti kangasta muun muassa armeijalle, ja sen historiaa esittelee nykyään kaupungin tekstiilimuseo." },
    ],
    Smolyan: [
      { q: "Kuinka moni Smoljanin järvistä on enää jäljellä?", a: "Alun perin järviä oli parikymmentä, mutta nykyään niistä on jäljellä enää seitsemän, loput ovat muuttuneet soiksi. Jäljellä olevia kutsutaan Rodopien smaragdisilmiksi niiden kirkkaan vihreän veden vuoksi." },
      { q: "Onko Smolyan oikeasti Bulgarian korkein kaupunki?", a: "Kyllä, Smolyan on maan korkeimmalla sijaitseva kaupunki, ja se levittäytyy useiden jokilaaksojen ja mäkien päälle Rodopien vuoristossa. Näköalapaikalle Snežanka-huipulle pääsee nykyään tuolihissillä." },
      { q: "Miksi Pamporovo on suosittu hiihtokeskus?", a: "Pamporovo on Bulgarian eteläisin hiihtokeskus, ja sen rinteet sopivat leppoisaan hiihtoon Rodopien männiköiden keskellä. Se houkuttelee talvisin hiihtäjiä eri puolilta Balkania ja Eurooppaa." },
    ],
    Sofia: [
      { q: "Mikä teki Samokovista niin tärkeän ikonimaalauksen kannalta?", a: "Samokovissa toimi 1700–1800-luvuilla merkittävä ikonimaalauskoulu, joka kasvatti taiteilijoita kuten Zahari Zografin. Koulun perinne vaikutti myöhemmin koko Bulgarian modernin taiteen syntyyn." },
      { q: "Miten Borovetsista tuli hiihtokeskus?", a: "Ruhtinas Ferdinand rakennutti alueelle kesäasuntonsa ja metsästysmajansa 1896, minkä jälkeen aatelisto seurasi perässä rakentamalla omia huviloitaan. Borovets on siitä lähtien ollut Bulgarian vanhin ja yksi tunnetuimmista hiihtokeskuksista." },
      { q: "Miksi Pirdopin ja Zlatitsan välissä on niin suuri tehdas?", a: "Alueen kuparinsulatto on Kaakkois-Euroopan suurin, ja se jalostaa kuparimalmia katodikupariksi vientiin ympäri maailmaa. Seutu on ollut kaivos- ja metalliteollisuuden keskus jo vuosisatojen ajan." },
    ],
    'Stara Zagora': [
      { q: "Miksi Stara Zagoran kivikautiset talot ovat niin merkittäviä?", a: "Talot ovat lähes 8 000 vuotta vanhoja ja yksi Euroopan parhaiten säilyneitä kivikautisia asumuksia, sillä tulipalo hiillytti ja säilytti rakenteet. Kaivauksista löytyi yli 1800 esinettä, muun muassa keittiövälineitä ja jyvänjauhinkiviä." },
      { q: "Miksi Kazanlakin laaksoa kutsutaan ruusulaaksoksi?", a: "Laakson ilmasto ja maaperä sopivat erinomaisesti Bulgarian ruusun viljelyyn, ja suuri osa maailman ruusuöljystä tislataan sieltä. Joka kesäkuun ensimmäisenä viikonloppuna laaksossa juhlitaan Ruusujuhlaa satokauden kunniaksi." },
      { q: "Mistä Stara Zagora sai lempinimensä lehmusten kaupunki?", a: "Kaupungin leveät puistokadut on istutettu täyteen lehmuspuita, jotka tuoksuvat voimakkaasti kesäkuun kukinta-aikaan. Lempinimi on ollut käytössä jo vuosikymmeniä, ja puut ovat osa kaupungin identiteettiä." },
    ],
    Shumen: [
      { q: "Miksi Tombul-moskeija on niin erityinen?", a: "Se on Bulgarian suurin moskeija ja yksi Balkanin suurimmista, valmistunut 1757. Sen 25 metriä korkea kupoli ja koraanijakeilla koristellut seinät tekevät siitä yhä toimivan rukoushuoneen ja suositun nähtävyyden." },
      { q: "Mitä Pliska ja Preslav olivat?", a: "Ne olivat ensimmäisen ja toisen Bulgarian valtakunnan pääkaupunkeja Šumenin liepeillä. Pliskassa kristinusko julistettiin valtionuskonnoksi 800-luvulla, ja molempien kaupunkien rauniot ovat nykyään avoinna kävijöille." },
      { q: "Miksi Šumenin ylängölle rakennettiin niin valtava muistomerkki?", a: "Muistomerkki avattiin 1981 juhlistamaan Bulgarian valtion perustamisen 1300-vuotispäivää vuonna 681. Se on yksi maan suurimmista muistomerkeistä, ja siitä avautuu näkymä kohti muinaisia pääkaupunkeja." },
    ],
    Targovishte: [
      { q: "Mikä Misionis oli?", a: "Misionis oli bysanttilainen linnoitus, jonka keisari Justinianus I perusti 500-luvulla vartioimaan kauppareittiä Mustaltamereltä sisämaahan. Se tunnettiin kauppapaikkana jo 1100-luvulla, ja sen rauniot ovat nykyisen Targovišten suora edeltäjä." },
      { q: "Mitä Targovišten nimi tarkoittaa?", a: "Nimi juontuu bulgarian sanasta kauppa, ja se viittaa kaupungin pitkään historiaan kauppareittien solmukohtana. Sama rooli näkyy yhä kaupungin nykyisessä lasiteollisuudessa, joka vie tuotteitaan ympäri Eurooppaa." },
      { q: "Milloin Misionisin linnoitus tuhoutui?", a: "Linnoitus tuhoutui osmanien valloituksessa 1300-luvun lopulla, satoja vuosia sen jälkeen kun se oli rakennettu bysanttilaisajan puolustuslinjaksi. Rauniot ovat nykyään avoinna kävijöille Parkan-alueella lähellä kaupunkia." },
    ],
    Varna: [
      { q: "Mikä tekee Varnan kultalöydöstä maailman vanhimman?", a: "Vuonna 1972 löydetty hautausmaa sisälsi lähes 3 000 kultaesinettä, jotka on ajoitettu noin 4600–4200 eaa. – vanhimmaksi tunnetuksi työstetyksi kullaksi maailmassa. Yksi ainoa hauta sisälsi enemmän kultaa kuin koko muu tunnettu maailma samalta ajalta yhteensä." },
      { q: "Miten kultahauta löytyi?", a: "Kaivinkoneen kuljettaja törmäsi esineisiin vahingossa tehtaan rakennustyömaalla 1972. Löytö paljasti aiemmin tuntemattoman, kehittyneen kalkoliittisen kulttuurin, joka osasi työstää sekä kuparia että kultaa." },
      { q: "Miksi Varnaa kutsutaan Bulgarian meripääkaupungiksi?", a: "Varna on maan suurin satamakaupunki Mustallamerellä ja kolmanneksi suurin kaupunki väkiluvultaan. Kesäisin sen rannat ja festivaalit täyttyvät kotimaisista ja ulkomaisista matkailijoista." },
    ],
    'Veliko Tarnovo': [
      { q: "Kuinka kauan Veliko Tarnovo oli Bulgarian pääkaupunki?", a: "Se toimi toisen Bulgarian valtakunnan pääkaupunkina vuosina 1185–1393, yli 200 vuoden ajan. Kaupungin sanottiin aikanaan kilpailevan loistollaan Konstantinopolin kanssa." },
      { q: "Mitä Samovodskan käsityöläiskadulla myydään?", a: "Kadulla on toiminut käsityöläisten työpajoja yhtäjaksoisesti yli 500 vuoden ajan. Nykyään siellä näkee kuparinseppiä, savenvalajia ja kutojia työssään samoin menetelmin kuin markkinapäivinä satoja vuosia sitten." },
      { q: "Miksi Tsarevetsin linnoitus valaistaan iltaisin?", a: "Valo- ja äänishow kertoo linnoituksen historiasta väriprojisoinneilla ja musiikilla muurien päällä. Esitys on suosittu tapa kokea kaupungin keskiaikainen menneisyys nykypäivän tekniikalla." },
    ],
    Vidin: [
      { q: "Mitä erikoista Belogradchikin kallioissa on?", a: "Tuuli ja vesi ovat muovanneet punaisesta hiekkakivestä 200 metriä korkeita, oudon näköisiä torneja ja hahmoja miljoonien vuosien aikana. Kalliot olivat 2011 finalistina luonnon seitsemän uuden ihmeen äänestyksessä." },
      { q: "Miten Kaleton linnoitus hyödyntää kallioita?", a: "Linnoitus rakennettiin suoraan kallioiden lomaan niin, että luonnolliset kivimuodostelmat toimivat osana muureja. Roomalaiset aloittivat rakentamisen, ja bulgarialaiset sekä osmanit laajensivat sitä myöhemmin." },
      { q: "Miksi Vidiniin rakennettiin uusi silta Romaniaan 2013?", a: "Uusi Eurooppa -silta helpotti liikennettä, sillä aiemmin ainoa Tonavan ylittävä silta Bulgarian ja Romanian välillä oli kaukana etelämpänä Rusen kohdalla. Silta yhdistää Vidinin Romanian puolella sijaitsevaan Calafatiin." },
    ],
    Vratsa: [
      { q: "Miksi Vratsata-solakuru on suosittu kiipeilijöiden keskuudessa?", a: "Kurun pystyt kalkkikivijyrkänteet tarjoavat haastavia kiipeilyreittejä aivan kaupungin kupeessa. Alue on yksi Bulgarian suosituimmista kalliokiipeilykohteista." },
      { q: "Kuka oli Hristo Botev ja miksi häntä muistetaan Vratsassa?", a: "Botev oli runoilija ja vallankumouksellinen, joka kaatui taistelussa lähellä Vratsaa sijaitsevalla Okolčican huipulla huhtikuun kapinassa 1876. Häntä muistetaan yhä vuosittain kesäkuun alussa, kun tuhannet kokoontuvat vuorelle." },
      { q: "Milloin Ledenika-luola avattiin yleisölle?", a: "Luola avattiin kävijöille 1961, ja sen tippukivimuodostelmat ja jäätävän kylmät holvit tekivät siitä nopeasti suositun retkikohteen. Infrastruktuuri uudistettiin kokonaan 2005." },
    ],
  },
  SRB: {
    'Grad Beograd': [
      { q: "Miksi Nikola Tesla haudattiin juuri Belgradiin eikä esimerkiksi New Yorkiin, missä hän teki suurimman osan työstään?", a: "Tesla kuoli New Yorkissa 1943, mutta hänen tuhkansa tuotiin Serbiaan, koska hän oli syntyperältään serbi ja hänen kotimaahansa haluttiin perustaa museo; uurna on nykyään esillä Tesla-museossa Belgradissa." },
      { q: "Mitä Skadarlijan kadulla tapahtuu nykyään?", a: "Kujan kivetyillä raiteilla toimii yhä perinteisiä kafana-ravintoloita, joissa soi elävä musiikki; se on Kalemegdanin jälkeen Belgradin toiseksi suosituin nähtävyys." },
    ],
    Borski: [
      { q: "Miksi ranskalaiset viininvalmistajat matkasivat aikanaan juuri Rajaciin asti?", a: "Kun tuhohyönteinen tuhosi suuren osan Euroopan viinitarhoista 1800-luvun lopulla, Negotinin seutu jäi vahingoittumatta, ja ulkomaiset ostajat tulivat hakemaan sieltä viiniä jopa kultarahalla maksaen." },
      { q: "Mikä tekee Rajacin kellareista erikoisia?", a: "Yli 270 kivistä pivnica-kellaria on louhittu kylän rinteeseen: alaosa on kaivettu maan sisään viinin kypsyttämistä varten, yläkerta toimi majapaikkana sadonkorjuun aikaan." },
    ],
    Branicevski: [
      { q: "Miksi Golubacin linnoituksesta taisteltiin niin kauan?", a: "Linnoitus hallitsi Tonavan kapeinta kohtaa Rautaportin solan suulla, joten se antoi haltijalleen vallan sekä joki- että maareiteille; Unkari, Serbia ja Osmanit vaihtoivat sen omistajaa vuosisatojen ajan." },
      { q: "Missä kunnossa linnoitus on nykyään?", a: "Euroopan unioni rahoitti vuosina 2014–2019 laajan restauroinnin, ja kymmenen torneineen linnoitus on nyt turvallinen ja suosittu käyntikohde Đerdapin kansallispuiston portilla." },
    ],
    'Južno-Backi': [
      { q: "Mikä yhdistää Sremski Karlovcin kansainväliseen diplomatiaan?", a: "Vuoden 1699 rauhanneuvotteluissa käytettiin ensimmäistä kertaa pyöreää pöytää, jotta yksikään osapuoli ei istuisi toista arvokkaammalla paikalla; sopimus tunnetaan Karlovcin rauhana." },
      { q: "Kuinka pitkä viininviljelyn historia kaupungissa on?", a: "Perimätiedon mukaan viiniköynnökset tuotiin seudulle jo antiikin Rooman aikaan keisari Probuksen toimesta, ja nykyään kaupungin ytimessä toimii noin viisitoista viinitilaa." },
    ],
    Jablanicki: [
      { q: "Miksi keisari Justinianus rakennutti kaupungin juuri tänne?", a: "Justinianus I syntyi tällä seudulla, ja hän halusi pystyttää synnyinseudulleen kaupungin, joka kantaisi hänen nimeään ja toimisi arkkihiippakunnan keskuksena." },
      { q: "Kuinka kauan Justiniana Prima oli olemassa?", a: "Kaupunki eli vain noin 80 vuotta: se rakennettiin 530-luvulla ja tuhoutui avaarien ja slaavien hyökkäyksissä 600-luvun alussa, minkä jälkeen se hylättiin lopullisesti." },
    ],
    'Srednje-Banatski': [
      { q: "Kuka soitti pianoa Kaštel Ečkan avajaisissa?", a: "Vuonna 1820 avajaisjuhlassa esiintyi yhdeksänvuotias pianonero, josta kasvoi myöhemmin yksi 1800-luvun kuuluisimmista säveltäjistä ja pianisteista, Franz Liszt." },
      { q: "Miksi kartano rakennettiin juuri tänne Begej-joen varrelle?", a: "Alue ostettiin huutokaupassa 1781, ja uusi omistajasuku perusti tänne asutuksen ja kartanon; joen läheisyys ja metsäinen maasto tekivät paikasta suositun aateliston kesänvietto- ja metsästyskohteen." },
    ],
    Kolubarski: [
      { q: "Miten lukumäärältään alivoimainen Serbian armeija pystyi voittamaan Kolubaran taistelussa?", a: "Serbialla oli vain noin 250 000 sotilasta itävalta-unkarilaisten 450 000 vastaan, mutta tuttu maasto, puolustusasemat ja päättäväinen vastahyökkäys joulukuussa 1914 ajoivat hyökkääjän takaisin rajan yli." },
      { q: "Millä alueella taistelu käytiin?", a: "Taistelu levisi laajalle Kolubara-joen varrelle, Valjevon, Ub:n ja Lajkovacin kunnista aina Belgradin liepeille asti, ja se sai nimensä juuri tästä joesta, joka antaa nimen koko piirille." },
    ],
    'Zapadno-Backi': [
      { q: "Kuinka vanha Apatinin panimo on?", a: "Panimo perustettiin vuonna 1756 keisarillisena laitoksena, mikä tekee siitä yhden Serbian vanhimmista yhä toimivista panimoista — lähes kolmen vuosisadan takaa." },
      { q: "Kuinka paljon panimon tuotanto on kasvanut sen historian aikana?", a: "1700-luvulla vuosituotanto oli noin 12 000 hehtolitraa; nykyään panimon kapasiteetti on noin neljä miljoonaa hehtolitraa vuodessa, ja olutta viedään useisiin Euroopan maihin." },
    ],
    Macvanski: [
      { q: "Miksi Cerin taistelua pidetään historiallisesti niin merkittävänä?", a: "Se oli elokuussa 1914 liittoutuneiden ensimmäinen voitto koko ensimmäisessä maailmansodassa: alivoimainen Serbian armeija löi itävalta-unkarilaiset takaisin Drina-joen taakse." },
      { q: "Mitä ainutlaatuista taistelussa tapahtui ilmassa?", a: "Cerin taistelun aikana käytiin sodan ensimmäinen kahden lentokoneen välinen ilmataistelu, mikä teki siitä myös ilmasodankäynnin historian virstanpylvään." },
    ],
    Moravicki: [
      { q: "Miksi Ovčar-Kablarin rotkoa kutsutaan Serbian Athosvuoreksi?", a: "Rotkoon on rakennettu yli 30 ortodoksista luostaria 1300-luvulta lähtien, mikä tekee siitä poikkeuksellisen tiheän hengellisen keskittymän — vertaus kreikkalaiseen Athosvuoreen on siitä peräisin." },
      { q: "Montako luostaria rotkossa toimii vielä nykyään?", a: "Alkuperäisistä yli 30 luostarista on säilynyt noin kymmenen, muun muassa Blagoveštenje ja Sretenje, sekä yksi luolakirkko." },
    ],
    'Nišavski': [
      { q: "Miksi komentaja Sinđelić räjäytti itsensä taistelun lopussa?", a: "Vuoden 1809 Čegarin taistelussa hän valitsi kuoleman mieluummin kuin joutuisi turkkilaisten vangiksi ja teloitetuksi seivästämällä; hän ampui pistoolilla ruutivarastoon ja tappoi itsensä ja ympärillään olleet." },
      { q: "Miten torni sai nimensä ja mitä sille tapahtui myöhemmin?", a: "Torniin muurattiin lähes tuhat kaatuneen kalloa pelotteeksi. Kun serbit valtasivat Nišin 1878, torni katettiin kunnioituksesta ja ympärille rakennettiin kappeli; noin 60 kalloa on yhä näkyvissä." },
    ],
    'Severno-Banatski': [
      { q: "Mistä ja miten mammutin luuranko löytyi?", a: "Kika löytyi joulukuussa 1996 tiilitehtaan savenottokuopasta noin 20 metrin syvyydestä rutiininomaisten kaivutöiden yhteydessä; luusto osoittautui poikkeuksellisen hyvin säilyneeksi." },
      { q: "Miksi Kika-mammuttia pidetään erityisen arvokkaana löytönä?", a: "Noin 90 prosenttia sen luista on säilynyt, mikä tekee siitä yhden parhaiten säilyneistä mammuttilöydöistä Euroopassa; se on nyt nähtävillä Kikindan luonnontieteellisessä museossa." },
    ],
    Pcinjski: [
      { q: "Miksi Vranjen asukkaat suuttuivat omalle kuuluisimmalle kirjailijalleen?", a: "Bora Stanković kuvasi 1900-luvun alun romaaneissaan ja näytelmissään kaupungin asukkaiden intohimoja, avioliittoja ja skandaaleja niin suoraan, että moni tunnisti itsensä tai sukulaisensa tarinoista — eikä pitänyt siitä." },
      { q: "Miksi Vranje on Unescon musiikkikaupunki?", a: "Kaupungissa elää vahva romanimusiikin perinne, erityisesti puhaltajaorkesterit, jotka soittavat häissä ja juhlissa yhä samalla tavalla kuin sata vuotta sitten." },
    ],
    Pirotski: [
      { q: "Kuinka korkea Midžor on, ja miksi se on erityinen?", a: "Midžor kohoaa 2169 metriin ja on Serbian korkein huippu alueilla, joista ei käydä kiistaa — huipulla kulkee myös valtakunnanraja Bulgariaan." },
      { q: "Mitä huipulla näkee?", a: "Betonipylväs merkitsee tarkan rajapisteen, ja selkeällä säällä näköala ulottuu kauas yli Stara Planinan rotkojen ja laaksojen." },
    ],
    Podunavski: [
      { q: "Mitä Radovanjski lugissa tapahtui vuonna 1817?", a: "Serbian ensimmäisen kansannousun johtaja Karađorđe Petrović murhattiin siellä poliittisen vastustajansa käskystä, ja hänen päänsä lähetettiin lahjaksi Istanbuliin osoituksena uskollisuudesta sulttaanille." },
      { q: "Mitä paikalla voi nähdä nykyään?", a: "Muistomerkkialueella on kirkko, Karađorđen ensimmäinen hautapaikka ja museo, jossa on aseita, asiakirjoja sekä suurikokoinen muotokuva kansallissankarista." },
    ],
    'Severno-Backi': [
      { q: "Miksi Subotican synagoga on ainutlaatuinen koko maailmassa?", a: "Se on ainoa jäljellä oleva unkarilaista Art Nouveau -tyyliä edustava juutalainen temppeli maailmassa, suunniteltu 1900-luvun alussa Jakabin ja Komorin toimesta." },
      { q: "Missä kunnossa rakennus on tänään?", a: "Se oli 2000-luvun alussa maailman uhanalaisimpien monumenttien listalla, mutta on sittemmin restauroitu perusteellisesti ja toimii nyt konsertti- ja kulttuuritilana." },
    ],
    Pomoravski: [
      { q: "Mitä Horreum Margi tarkoittaa ja mikä sen tehtävä oli?", a: "Nimi tarkoittaa Margi-joen (nykyisen Velika Moravan) viljavarastoa; paikka oli roomalainen varuskuntakaupunki, aseiden valmistuskeskus ja koko alueen viljan säilytyspaikka." },
      { q: "Miksi paikka oli strategisesti tärkeä?", a: "Se sijaitsi Via Militariksella, Rooman ja Konstantinopolin välisellä pääväylällä, ja toimi hetken jopa Ylä-Mesian provinssin pääkaupunkina sekä seitsemännen legioonan tukikohtana." },
    ],
    'Raški': [
      { q: "Miksi Pešterin ylänkö tunnetaan Sandžakin Siperiana?", a: "Yli tuhannen metrin korkeudessa sijaitseva tasanko kokee poikkeuksellisen ankaria talvia, ja lämpötilat voivat pudota rajusti — nimitys kuvaa juuri tätä äärimmäistä ilmastoa." },
      { q: "Mikä tekee Sjenican juustosta erikoisen?", a: "Se on perinteinen lampaanmaidosta suolavedessä kypsytetty juusto, jota valmistetaan yhä paimentolaisperinteen mukaisesti — ehdolla Unescon aineettoman kulttuuriperinnön listalle." },
    ],
    'Južno-Banatski': [
      { q: "Kuinka laaja Vršacin viinialue on?", a: "Pelkästään Vršacin rinteillä kasvaa yli 1700 hehtaaria viiniköynnöksiä, koko alueella noin 2100 hehtaaria — Serbian suurin yhtenäinen viinitarha-alue." },
      { q: "Mikä rypälelaji on alueella yleisin?", a: "Italialainen riesling kattaa yli puolet viljelystä; muita lajikkeita ovat muun muassa chardonnay, traminer ja muskottiotoneli." },
    ],
    Sremski: [
      { q: "Miksi Sirmium oli niin merkittävä Rooman valtakunnalle?", a: "Se oli yksi valtakunnan neljästä pääkaupungista keisari Diocletianuksen tetrarkia-järjestelmässä 290-luvulta lähtien, ja sieltä oli kotoisin useita Rooman keisareita." },
      { q: "Mitä Sirmiumista on säilynyt nykypäivään?", a: "Sremska Mitrovican alla ja keskustassa on kaivettu esiin keisarillisen palatsin, kylpylöiden ja foorumin raunioita, jotka ovat nähtävillä osana kaupunkia ja paikallista museota." },
    ],
    'Šumadijski': [
      { q: "Mitä Kragujevacissa tapahtui lokakuussa 1941?", a: "Saksalaiset miehitysjoukot teloittivat kahden päivän aikana arviolta noin 2800 kaupungin ja lähialueen siviiliä, myös koululaisia, kostoksi partisaanien hyökkäyksestä saksalaisjoukkoja vastaan." },
      { q: "Mitä Šumaricen puistossa on nähtävillä nykyään?", a: "Alueella on 30 joukkohautaa ja kymmenen taiteellista muistomerkkiä 352 hehtaarin puistossa, joka on pystytetty uhrien muistoksi vuodesta 1953 alkaen." },
    ],
    Toplicki: [
      { q: "Mikä löytö Pločnikista teki siitä maailmanlaajuisesti merkittävän?", a: "Vuonna 2007 sieltä löytyi maailman toiseksi vanhin todiste kuparinsulatuksesta, noin 5500–5000 eaa., mikä siirsi koko kuparikauden alkua satoja vuosia aiemmaksi." },
      { q: "Mitä muuta erikoista Pločnikista on löytynyt?", a: "Paikalta kaivettiin esiin myös maailman vanhin tunnettu tinapronssiesine, noin 4650 eaa. valmistettu foliopala, sekä kehittyneitä savupiipuilla varustettuja sulatusuuneja." },
    ],
    Zajecarski: [
      { q: "Kuinka monta viinikellaria Rajacin kylässä on ja miksi ne on rakennettu osittain maan alle?", a: "Kellareita on noin 270, ja ne on kaivettu osittain maan sisään, jotta lämpötila pysyisi tasaisena vuodenajasta riippumatta — ihanteellinen olosuhde viinin kypsyttämiseen." },
      { q: "Mikä on Rajacin ja Rogljevon kellareiden asema nykyään?", a: "Noin kuusikymmentä kellaria on yhä aktiivisessa käytössä, ja koko kellarikylien kokonaisuus on ehdolla Unescon maailmanperintölistalle." },
    ],
    Zlatiborski: [
      { q: "Miten Drina-joen talo syntyi ja miksi se on tuhoutunut niin monta kertaa?", a: "Ryhmä nuoria uimareita rakensi sen käsin vuonna 1968 rantautumissuojaksi kalliolle; tulvavesi on tuhonnut sen seitsemän kertaa vuoteen 2019 mennessä, mutta se on aina rakennettu uudelleen." },
      { q: "Miten talolle pääsee?", a: "Ainoa keino on uida tai soutaa Drina-joen virran yli — siltaa ei ole koskaan rakennettu, mikä tekee talosta entistä salaperäisemmän nähtävyyden." },
    ],
  },
  BIH: {
    'Banja Luka': [
      { q: "Kuka rakennutti Ferhadija-moskeijan ja milloin?", a: "Moskeijan rakennutti Gazi Ferhad-paša Sokolović vuonna 1579. Suunnittelun taustalla arvellaan olleen legendaarisen arkkitehti Mimar Sinanin oppilaita, ja rakennus edustaa 1500-luvun ottomaaniarkkitehtuurin huippua Balkanilla." },
      { q: "Mikä moskeijan minareetissa on erikoista?", a: "Minareetti kohoaa 43 metrin korkeuteen ja sen sisällä kiertyy kierreporras huipulle. Ulkopintaa koristavat geometriset kuvioinnit, jotka ovat tyypillisiä ajan ottomaanikäsityölle." },
      { q: "Mitä muuta moskeijan pihapiiriin kuului?", a: "Pihalla on turkkilaisbarokkia henkivä šadrvan-suihkulähde ja kolme perheen turbea eli hautakammiota. Koko kompleksia ylläpidettiin yli 30 kylän tuloilla, joten se toimi myös torin ja hammamin tapaan yhteisön keskuksena." },
    ],
    Bijeljina: [
      { q: "Mikä on Semberija ja miksi se on tärkeä?", a: "Semberija on Bijeljinan ympärillä levittäytyvä tasainen, hedelmällinen tasanko, alueen tuottavin maatalousalue. Sen pellot tuottavat vuosittain kymmeniätuhansia tonneja vihanneksia, erityisesti kaalia, sekä satoja tuhansia tonneja viljaa." },
      { q: "Kuinka paljon Semberija tuottaa viljaa vuodessa?", a: "Alueen viljasiilot käsittelevät yli 320 000 tonnia viljaa ja öljykasveja vuosittain. Lisäksi karjatalous tuottaa noin 45 miljoonaa litraa maitoa jalostukseen joka vuosi." },
      { q: "Mille vihannekselle Semberija on erityisen tunnettu?", a: "Alue tunnetaan etenkin kaalinviljelystä, jolle ilmasto ja hedelmällinen maaperä sopivat erinomaisesti. Pellot tuottavat myös laajasti paprikaa ja tomaattia." },
    ],
    'Bosnian Podrinje': [
      { q: "Mistä nimi Podrinje tulee?", a: "Podrinje tarkoittaa slaavilaisittain 'Drinan vartta' ja viittaa koko joen valuma-alueeseen. Goražde on tämän Bosnian puoleisen Drina-laakson keskus." },
      { q: "Mitä ulkoiluaktiviteetteja Goraždessa voi harrastaa?", a: "Drina-joella ja sen ympäristössä voi melvoida koskia, kalastaa, pyöräillä ja vaeltaa. Joen kanjonimainen laakso tarjoaa näköalapaikkoja ja rauhallisia reittejä ympäri vuoden." },
      { q: "Mistä Drina-joki saa alkunsa?", a: "Drina syntyy, kun kaksi vuoristojokea yhtyy kauempana etelässä alueen vuoristossa. Yhdessä ne muodostavat yhden Balkanin vaikuttavimmista jokilaaksoista, jota Goraždekin osaltaan edustaa." },
    ],
    'Brčko Distrikt': [
      { q: "Mikä rakennuskausi muovasi Brčkon katukuvaa eniten?", a: "Itävalta-Unkarin hallintokausi 1878-1918 toi kaupunkiin merkittävää arkkitehtuuria. Muun muassa vuoden 1892 kaupungintalo edustaa tätä ajan pseudomauriaista tyyliä." },
      { q: "Mistä kaupasta Brčko tunnettiin historiallisesti?", a: "Sava-joen satamakaupunkina Brčko oli jo 1400-luvulta lähtien merkittävä luumujen ja lihan vientipaikka. Kaupunki tunnettiin pitkään erityisesti kuivattujen luumujen kaupasta." },
      { q: "Mikä on Trg Mladih?", a: "Trg Mladih on Brčkon keskusaukio, jota reunustavat 1800-luvun lopun Itävalta-Unkarin ajan rakennukset. Aukio on edelleen kaupungin sosiaalinen keskus." },
    ],
    'Central Bosnia': [
      { q: "Mikä on Plava Voda?", a: "Plava Voda on Travnikin vanhassa kaupungissa sijaitseva karstilähde, joka pulppuaa esiin linnan juurelta. Se on kaupungin tärkein juomavesilähde, ja sen ympäristö on suojeltu kansallismuistomerkkinä." },
      { q: "Mistä Vlašićin juusto on peräisin?", a: "Vlašićin juusto on suolattu lampaanmaitojuusto, joka on saanut nimensä Travnikin yläpuolella kohoavasta Vlašić-tunturista. Tunturin laidunmailla juustoa on valmistettu perinteisin menetelmin sukupolvien ajan." },
      { q: "Mitä muuta Vlašićin tunturilla voi tehdä?", a: "Lähes 2000 metriin kohoava Vlašić on suosittu talvihiihtokohde ja retkeilyalue. Kesäisin sen ylängöt toimivat lampaiden ja lehmien laidunmaina." },
    ],
    Doboj: [
      { q: "Kuinka kauan Banja Vrućican lähteitä on käytetty?", a: "Lähteiden parantavia ominaisuuksia on hyödynnetty jo antiikin Rooman ajoista lähtien, ja myöhemmin myös ottomaanikaudella niitä arvostettiin suuresti. Vesi on koko ajan pulssunut samasta paikasta Usoran laaksossa." },
      { q: "Millaista Banja Vrućican vesi on?", a: "Vesi on hiilihapollista ja lievästi hapanta, lämpötilaltaan noin 32 astetta. Sitä käytetään perinteisesti sydän- ja verisuonivaivojen sekä reumaattisten oireiden hoidossa." },
      { q: "Kuinka suuri kylpylä nykyään on?", a: "Banja Vrućicassa toimii neljän hotellin kokonaisuus, jossa on yli tuhat vuodepaikkaa. Se on tällä hetkellä maan suurin lämminvesikylpyläkeskus." },
    ],
    'Foča': [
      { q: "Miksi Tara-jokea kutsutaan Euroopan kyyneleeksi?", a: "Nimitys viittaa joen poikkeuksellisen kirkkaaseen, jopa juomakelpoiseen veteen. Joki virtaa yli 1300 metriä syvässä kanjonissa, joka on yksi Euroopan syvimmistä." },
      { q: "Mitä koskimelonnassa Taralla kohtaa?", a: "Reitillä on noin 50 koskea, joiden vaikeusaste vaihtelee luokkien 2 ja 4 välillä. Reitit sopivat sekä perheille että kokeneemmille melojille vedenkorkeuden mukaan." },
      { q: "Mikä tekee Aladža-moskeijasta erityisen?", a: "Se rakennettiin vuonna 1549 ensimmäisenä puhtaasti klassista ottomaanityyliä edustavana moskeijana Bosniassa. Sen värikäs, koristeellinen sisustus antoi sille lempinimen 'kirjava moskeija'." },
    ],
    'Herzegovina-Neretva': [
      { q: "Missä Hertsegovinan viinialueen sydän sijaitsee?", a: "Viinialueen keskus on Čitlukin ympärille kohoava Brotnjon karstiylänkö, jota kutsutaan koko maan viininviljelyn kehdoksi. Kuiva kalkkikivimaaperä ja aurinkoinen ilmasto tekevät siitä ihanteellisen viinitarhoille." },
      { q: "Kuinka pitkään alueella on viljelty viiniä?", a: "Viininviljelyn juuret ulottuvat yli 2000 vuoden taakse, aina illyyrien aikaan asti. Monissa Brotnjon suvuissa viininvalmistusperinne on jatkunut yhtäjaksoisesti yli 300 vuotta." },
      { q: "Mitkä rypäleet ovat alueen omia lajikkeita?", a: "Alueen omat lajikkeet ovat valkoinen Žilavka ja punainen Blatina, jotka kasvavat parhaiten Brotnjon punaisessa, hyvin vettä läpäisevässä maaperässä. Lähes jokaisella perheellä on oma pieni viinitarha ja kellari." },
    ],
    Posavina: [
      { q: "Miksi Posavinan maaperä on niin hedelmällistä?", a: "Saava-joki on vuosituhansien aikana jättänyt rantamaille paksuja hienojakoisia tulvamaakerroksia. Nämä alluviaalikerrostumat tekevät kantonin peltomaasta poikkeuksellisen viljavaa." },
      { q: "Missä Posavinan kaupungit sijaitsevat?", a: "Kantonin pääkaupunki Orašje ja suurin kaupunki Odžak sijaitsevat molemmat Saava-joen varrella, aivan Kroatian rajan tuntumassa. Joki muodostaa luontaisen rajan ja samalla elinehdon koko alueen maataloudelle." },
    ],
    Sarajevo: [
      { q: "Mikä Vrelo Bosne on?", a: "Ilidžan kaupunginosassa sijaitseva 603 hehtaarin puisto ja luonnonmuistomerkki, jossa Bosna-joki syntyy kymmenistä lähteistä Igman-vuoren juurella. Alueella on lampia, saaria ja rikas kasvi- ja eläinlajisto." },
      { q: "Mikä on fiaker?", a: "Avonainen hevosvaunu, jolla vieraat kuljetetaan pitkin 3,5 kilometrin pituista Velika Aleja -puistokujaa. Samanlaiset vaunut palvelivat aikanaan myös Wienin ja Budapestin katukuvassa." },
      { q: "Milloin puistokuja istutettiin?", a: "Velika Aleja, kastanja- ja plataanipuiden reunustama kuja, istutettiin vuonna 1892 Itävalta-Unkarin aikana. Se on säilynyt Sarajevon suosituimpana kävelyreittinä tähän päivään asti." },
    ],
    'Sarajevo-romanija': [
      { q: "Mikä Mokranjska Miljacka on?", a: "Bosnia ja Hertsegovinan pisimmäksi tunnettu luola Romanijan ylängöllä lähellä Mokron kylää. Sen suulta purkautuu maanalainen joki, joka on saanut luolalta nimensä." },
      { q: "Kuinka pitkä luola on?", a: "Kartoitettua käytävää on yli seitsemän kilometriä, eikä luolan koko laajuutta tunneta vieläkään. Sukeltajat ovat tutkineet sitä vuodesta 2007 lähtien italialais-bosnialaisessa yhteistyössä." },
      { q: "Mitä luolasta on löytynyt?", a: "Tutkijat ovat löytäneet luolan kylmästä vedestä ja pimeistä käytävistä tieteelle täysin uusia eliölajeja. Veden lämpötila pysyttelee ympäri vuoden vain noin viidessä asteessa." },
    ],
    Trebinje: [
      { q: "Mikä Tvrdošin luostari on?", a: "Ortodoksiluostari Trebišnjica-joen rannalla lähellä Trebinjeä, perustettu 1200-luvun lopulla vanhan roomalaisen kirkon paikalle. Se tunnetaan erityisesti pitkästä viininviljelyperinteestään." },
      { q: "Kuinka vanha luostarin viinikellari on?", a: "Kivikellari louhittiin 1500-luvulla, ja se on ollut yhtäjaksoisesti käytössä siitä lähtien. Sen holveissa viini kypsyy yhä satavuotiaissa tammitynnyreissä." },
      { q: "Mitä viinejä luostarissa tehdään?", a: "Munkit valmistavat muun muassa Vranac- ja Žilavka-viinejä sekä kansainvälisiä lajikkeita kuten chardonnayta. Perinteinen kellari ja moderni painovoimatehdas toimivat aivan vierekkäin." },
    ],
    Tuzla: [
      { q: "Mikä Šarena džamija on?", a: "Tuzlan vanhin moskeija, alun perin 1500-luvun alusta, joka tunnetaan koristeellisista väriseinistään – nimi tarkoittaa suomeksi suunnilleen 'kirjava moskeija'." },
      { q: "Miksi sitä kutsutaan myös Atik Behram-begin moskeijaksi?", a: "Sen edessä sijaitsi Behram-begin perustama medresa eli koraanikoulu, jonka mukaan koko rakennus sai nimensä. Molemmat rakennukset kuuluivat samaan vakifiin eli uskonnolliseen säätiöön." },
      { q: "Milloin moskeija rakennettiin uudelleen?", a: "Tulipalo tuhosi rakennusta, ja se kunnostettiin vuonna 1888 Itävalta-Unkarin hallintokaudella. Samaan aikaan kaupunkiin nousi myös uutta eurooppalaistyylistä arkkitehtuuria." },
    ],
    'Una-Sana': [
      { q: "Mikä Ostrožacin linna on?", a: "Unan joen rannalla Bihaćin lähellä sijaitseva linna, jonka vanhin osa mainitaan jo vuonna 1286. Se sai nykyisen uusgoottilaisen ilmeensä 1900-luvun alun laajassa uudisrakennuksessa." },
      { q: "Mikä on bihacit?", a: "Alueelta louhittava kivilaji, josta kuvanveistäjät ovat vuodesta 1967 asti veistäneet monumentaalisia teoksia Ostrožacin taiteilijakoloniassa. Alueella on nykyään yli 130 valmista veistosta." },
      { q: "Miksi linna rakennettiin uudelleen 1900-luvun alussa?", a: "Linnan viimeinen ottomaanikapteeni myi sen vuonna 1896 itävaltalaiselle kreiville, Bihaćin silloiselle pormestarille, joka rakennutti tilalle uusgoottilaisen linnan vuosina 1900–1902." },
    ],
    Vlasenica: [
      { q: "Mitä stećci ovat?", a: "Keskiaikaisia, 1100–1500-luvuilla veistettyjä kalkkikivisiä hautakiviä, joita on Bosnian ja Hertsegovinan lisäksi Serbiassa, Montenegrossa ja Kroatiassa. Ne on merkitty Unescon maailmanperintöluetteloon." },
      { q: "Kuinka paljon hautakiviä on löydetty Vlasenican seudulta?", a: "Sošarin kylän alueelta on laskettu 71 nekropolia ja 1595 hautakiveä, joista 65:ssä on koristekaiverrus. Yksi kivistä sisältää myös kirjoituksen." },
      { q: "Mitä hautakivien pintaan on kaiverrettu?", a: "Kivissä nähdään muun muassa tanssi- ja metsästyskohtauksia, geometrisia kuvioita ja kyrillisiä kirjoituksia. Kuvakieli yhdistää yleiseurooppalaisia aiheita paikallisiin perinteisiin." },
    ],
    'West Bosnia': [
      { q: "Mikä Buško jezero on?", a: "Livnon ja Tomislavgradin kuntien alueella sijaitseva tekojärvi, joka on pinta-alaltaan Euroopan suurin: lähes 56 neliökilometriä ja yli 780 miljoonaa kuutiometriä vettä." },
      { q: "Miten järvi syntyi?", a: "Järvi patoutui vuonna 1974, kun alueelle rakennettiin vesivoimalaitos hyödyntämään karstipoljen keräämiä sade- ja sulamisvesiä. Ennen patoamista alue oli kausittain tulviva kalkkikivilaakso." },
      { q: "Kuinka korkealla järvi sijaitsee?", a: "Buško jezero lepää 716 metrin korkeudessa merenpinnasta, Dinaarien vuoriston karstiylängöllä. Korkeus ja tyyni vesi tekevät siitä suositun kalastus- ja uimapaikan kesäisin." },
    ],
    'West Herzegovina': [
      { q: "Mikä žilavka on?", a: "Länsi-Hertsegovinassa, erityisesti Ljubuškin seudulla, viljelty valkoviinirypäle, jota on kasvatettu samoilla poljilla jo 1300-luvulta lähtien. Se antaa raikkaan ja hapokkaan viinin." },
      { q: "Milloin žilavka sai virallisen suojan?", a: "Rypäleen nimi suojattiin vuonna 1970, ja vuonna 1973 sen paras laatu sai oman erityisaseman. Se oli yksi entisen Jugoslavian ensimmäisistä nimisuojatuista viineistä." },
      { q: "Mikä on žilavkan pari Hertsegovinan viinikartalla?", a: "Punaviinilajike Blatina on žilavkan perinteinen vastinpari – yhdessä ne ovat olleet seudun kaksi tärkeintä viiniä vuosisatojen ajan." },
    ],
    'Zenica-Doboj': [
      { q: "Mikä Kraljeva Sutjeska on?", a: "Kaknjin lähellä sijaitseva kylä, jonka nimi tarkoittaa 'kuninkaan kanjonia'. Täällä sijaitsi keskiaikaisen Bosnian kuningaskunnan hovi 1300-luvulta lähtien." },
      { q: "Mitä Grgurevon kummulla on?", a: "Kummulla ovat näkyvissä keskiaikaisen kuninkaanlinnan rauniot vuodelta 1330, aivan fransiskaaniluostarin vieressä. Paikka on Bosnian kansallismonumentti." },
      { q: "Mitä luostarin kirjastossa säilytetään?", a: "Kirjastossa on noin 11 000 teosta, joiden joukossa 31 inkunaabelia eli 1400-luvun painettua kirjaa sekä bosniankielisiä kyrillisiä käsikirjoituksia." },
    ],
  },
  ISL: {
    Austurland: [
      { q: "Miksi Stuðlagilin kanjoni näkyy vasta nyt, vaikka basalttipylväät ovat tuhansia vuosia vanhoja?", a: "Kanjoni oli aiemmin piilossa Jöklan joen alla. Kun Kárahnjúkarin voimalaitos valjastettiin 2006–2009, suurin osa vedestä ohjattiin patoaltaaseen ja joen pinta laski 7–8 metriä – silloin tiiviit basalttipylväät paljastuivat ensi kertaa ihmisten nähtäväksi." },
      { q: "Mistä Islannin villit peurat oikein tulivat?", a: "Norjalaisia peuroja tuotiin saarelle neljässä erässä 1770–80-luvuilla eri puolille maata. Vain Vopnafjörðuriin Austurlandille päästetty lauma selvisi hengissä, ja kaikki nykyiset noin 6 000–7 000 villipeuraa polveutuvat siitä." },
      { q: "Miksi Petra alkoi kerätä kiviä?", a: "Petra Sveinsdóttir aloitti kivien keräämisen jo seitsemänvuotiaana ja jatkoi sitä koko elämänsä ajan patikoiden syrjäisilläkin seuduilla. Vuonna 1974 hän avasi kotinsa yleisölle, ja kokoelma on nykyään yksi maailman suurimmista yksityisistä kivikokoelmista." },
    ],
    'Höfuðborgarsvæði': [
      { q: "Miksi Hafnarfjörðuria kutsutaan Islannin haltiapääkaupungiksi?", a: "Kaupungin keskustan laavakedot ja varsinkin 1923 avattu Hellisgerðin puisto tunnetaan kansanperinteessä piilokansan – haltioiden ja peikkojen – asuinsijoina. Kyselyjen mukaan yli puolet hafnarfjörðurilaisista pitää haltioita ainakin mahdollisina, ja aiheesta järjestetään nykyään opastettuja kierroksia." },
      { q: "Kuinka suuri osa islantilaisista asuu pääkaupunkiseudulla?", a: "Nykyään lähes kaksi kolmasosaa koko maan reilusta 380 000 asukkaasta asuu pääkaupunkiseudun kunnissa. Loppu maa on sitäkin harvemmin asuttua, mikä tekee alueesta ylivoimaisesti tiheimmin asutun osan Islantia." },
      { q: "Kuka Bessastaðirissa asui ennen kuin siitä tuli presidentin virka-asunto?", a: "1200-luvulla paikan omisti valtiomies ja saagakirjailija Snorri Sturluson, yksi Islannin historian vaikutusvaltaisimmista hahmoista. Presidentin virka-asunnoksi Bessastaðir vakiintui vasta 1941, ja sitä ennen se toimi muun muassa kuninkaan käskynhaltijan residenssinä." },
    ],
    'Vestfirðir': [
      { q: "Miksi Ísafjörðurin yläpuolelle rakennettiin isot betoniset vallit?", a: "1990-luvulla lumivyöryt tappoivat kymmeniä ihmisiä Vestfirðirin kylissä, muun muassa Flateyrissa 1995. Onnettomuuksien jälkeen useisiin kaupunkeihin, myös Ísafjörðuriin, rakennettiin suuria ohjausvalleja, jotka pakottavat vyöryt kääntymään pois asutuksen kohdalta." },
      { q: "Miksi juuri Vestfirðir sai maineen noituuden keskuksena?", a: "1600-luvun \"poltettujen vuosisadalla\" Strandirin alueella tuomittiin ja poltettiin roviolla 21 ihmistä noituudesta – enemmän kuin missään muualla Islannissa. Hólmavíkin Strandagaldur-museo kertoo nykyään tästä historiasta ja ajan taikamerkeistä." },
      { q: "Mistä Dynjandin nimi tulee?", a: "Dynjandi tarkoittaa suomeksi suunnilleen \"jylisevää\" tai \"kumisevaa\", ja nimi viittaa putouksen voimakkaaseen ääneen. Se on Vestfirðirin suurin putous, ja sen leveys kasvaa yläosan 30 metristä alaosan 60 metriin." },
    ],
    'Norðurland eystra': [
      { q: "Miksi Akureyrin liikennevaloissa on sydämiä?", a: "Sydämenmuotoiset valot ilmestyivät kaupungin liikennevaloihin 2008, vain kuukausia ennen kuin Islannin pankkijärjestelmä romahti finanssikriisissä. Kriisin jälkeen sydämistä tuli symboli positiiviselle ajattelulle ja yhteisöllisyydelle, ja ne ovat säilyneet kaupungissa siitä lähtien." },
      { q: "Miksi juuri Húsavíkin edustalla nähdään niin paljon valaita?", a: "Skjálfandin lahden ravinteikkaat, matalat vedet houkuttelevat useita valaslajeja ruokailemaan lähelle rannikkoa lähes ympäri vuoden. Kaupungista on tullut sen ansiosta Islannin tunnetuin valaidenkatselukohde." },
      { q: "Mikä tekee Akureyrin kasvitieteellisestä puutarhasta erikoisen?", a: "Se on yksi maailman pohjoisimmista kasvitieteellisistä puutarhoista, vain noin 50 kilometrin päässä napapiiristä. Silti siellä kasvaa nykyään yli 7 000 kasvilajia, joista suurin osa on tuotu muualta maailmasta." },
    ],
    'Norðurland vestra': [
      { q: "Mitä Glaumbæjrin turvetaloissa oikein näkee?", a: "Kompleksi koostuu kolmestatoista toisiinsa käytävillä yhdistetystä pienestä rakennuksesta – muun muassa keittiöstä, ruokavarastosta ja pajasta – jotka on rakennettu turpeesta ja kivestä puurungon varaan. Taloissa asuttiin aina vuoteen 1947 asti, jolloin kansallismuseo hankki paikan museoksi." },
      { q: "Kuka oli Grettir ja miksi hän liittyy Drangeyn saareen?", a: "Grettir Ásmundarson on Islannin tunnetuimpia saagasankareita, lainsuojaton mies, joka joutui pakenemaan vuosikausiksi asumattomille seuduille. Grettis sagan mukaan hän vietti viimeiset vuotensa piilossa Drangeyn jyrkällä saarella ennen kuin vihamiehet lopulta löysivät hänet." },
      { q: "Miksi juuri Skagafjörður tunnetaan hevoskasvatuksesta?", a: "Alueen laajat, ravinteikkaat laaksoniityt ja pitkä kasvatusperinne ovat tehneet siitä yhden Islannin tärkeimmistä islanninhevosten kasvatusalueista. Hevosnäyttelyjä ja -kilpailuja järjestetään seudulla nykyään säännöllisesti ympäri vuoden." },
    ],
    'Reykjavík': [
      { q: "Mitä Hallgrímskirkjan torni matkii?", a: "Arkkitehti Guðjón Samúelsson suunnitteli kirkon 1930-luvulla niin, että sen harjakatto ja pylväsmäiset seinät muistuttavat Islannin luonnossa esiintyviä basalttipatsaita. Kirkko valmistui lopulta vasta 1986, yli 40 vuotta suunnittelun aloittamisen jälkeen." },
      { q: "Mitä Sólfar-veistos oikeastaan esittää?", a: "Teos on tekijänsä Jón Gunnar Árnasonin mukaan \"unelmalaiva\" ja auringon ja toivon symboli, ei historiallinen viikinkilaiva. Teräksinen veistos paljastettiin 1990 Reykjavíkin 200-vuotisjuhlan kunniaksi." },
      { q: "Miksi Harpa rakennettiin juuri satamaan?", a: "Konserttitalon rakentaminen aloitettiin ennen vuoden 2008 finanssikriisiä osana laajempaa satama-alueen uudistusta. Hanke jäi kriisin myötä hetkeksi kesken, mutta valtio ja kaupunki päättivät rahoittaa sen loppuun, ja Harpa avattiin 2011." },
    ],
    'Suðurland': [
      { q: "Mitä Reynisfjaralle tapahtui helmikuussa 2026?", a: "Viikkoja jatkuneet voimakkaat aallot ja itätuulet kuluttivat rantaa niin pahasti, että osa rannan kuuluisista basalttipylväsmuureista sortui mereen. Tapaus muistutti, miten altis eroosiolle tämä Atlantin avomerelle avautuva ranta on." },
      { q: "Miksi Eyjafjallajökullin purkaus 2010 pysäytti lentoliikenteen kaukana Euroopassa?", a: "Purkaus tapahtui jäätikön alla, ja jää suli äkillisesti kuumaan laavaan koskettaessaan, mikä hienonsi tuhkan poikkeuksellisen pieneksi ja nosti sen korkealle ilmakehään. Hieno tuhka ajautui tuulten mukana laajalle Euroopan ylle ja pysäytti yli 100 000 lentoa noin viikossa." },
      { q: "Miksi Seljalandsfossin putouksen takaa voi kävellä?", a: "Putous putoaa entiseltä merenrantajyrkänteeltä, jonka juurelle on ajan mittaan syntynyt onkalo putouksen taakse. Kallioseinämän ja vesiverhon väliin jää juuri sen verran tilaa, että sieltä pääsee kulkemaan ympäri, joskin täysin kastuen." },
    ],
    'Suðurnes': [
      { q: "Miten Sininen lagúuni oikeastaan syntyi?", a: "Se ei ole luonnollinen allas, vaan Svartsengin geotermisen voimalan käytetyn veden kertymä, joka alkoi muodostua 1976. Veden korkea piidioksidipitoisuus tiivisti altaan pohjan vedenpitäväksi, ja vasta myöhemmin ihmiset huomasivat, että kylpeminen vedessä tuntui miellyttävältä iholle." },
      { q: "Mitä Grindavíkissa tapahtui vuodesta 2023 alkaen?", a: "Reykjanesin niemimaan uusi purkaussarja alkoi uhata kaupunkia, ja sen noin 3 800 asukasta evakuoitiin marraskuussa 2023. Useita purkauksia on tapahtunut sen jälkeen, ja kaupunkia suojaamaan on rakennettu kilometrien pituisia laavavalleja." },
      { q: "Miksi Reykjanesviti on Islannin vanhin majakka?", a: "Ensimmäinen majakka paikalla valmistui jo 1878, mutta maanjäristys vaurioitti sen pahoin vain kahdeksan vuotta myöhemmin. Nykyinen, yhä käytössä oleva betonimajakka rakennettiin 1907–1908 ja on säilynyt siitä lähtien lähes alkuperäisenä." },
    ],
    Vesturland: [
      { q: "Miksi Deildartunguhverin vesi riittää lämmittämään kokonaisia kaupunkeja?", a: "Lähde pulppuaa 180 litraa lähes kiehuvaa vettä sekunnissa, mikä tekee siitä Euroopan voimakkaimman kuuman lähteen. Vesi johdetaan putkia pitkin muun muassa Borgarnesiin ja 64 kilometrin päähän Akranesiin, mikä on Islannin pisin kaukolämpöputki." },
      { q: "Miksi Hraunfossarin vesi näyttää tulevan tyhjästä?", a: "Vesi ei virtaa maanpäällisestä joesta, vaan on suodattunut hitaasti läheisen laavakentän huokoisen kiven läpi. Se purkautuu lukemattomina pieninä putouksina suoraan kivien raoista Hvítá-jokeen usean sadan metrin matkalla." },
      { q: "Mitä hákarl oikein on?", a: "Se on perinteinen islantilaisherkku, joka valmistetaan mätättämällä ja kuivattamalla jäämerihain lihaa useiden kuukausien ajan – tuore liha on myrkyllistä ilman tätä käsittelyä. Bjarnarhöfnin tilan museo Vesturlannissa esittelee valmistusprosessin ja tarjoaa maistiaisia." },
    ],
  },
  ALB: {
    "Berat": [
      { q: "Mikä Onufrin punainen oikein on?", a: "Onufri maalasi Beratissa 1500-luvulla, ja hänen tunnusmerkkinsä on hehkuva punainen, jota kutsutaan hänen mukaansa. Hän varmisti signeerauksensa vuoden 1547 kirjoituksella: Olen Onufri, Beratin kaupungista." },
      { q: "Miksi Osumin kanjoni on niin kapea?", a: "Kanjonissa on kuusi ahdasta kohtaa, joissa seinät ovat joen pohjalla vain 1,5 metrin päässä toisistaan. Tutkijat arvelevat, että maanalaisen joen katto romahti ja paljasti rotkon 2–3 miljoonaa vuotta sitten." },
      { q: "Mitä Beratista on Albanian kolikoissa?", a: "Linnoituksen kuva on 10 lekin kolikossa. Linnan alueella oli aikanaan noin 20 kirkkoa mutta vain yksi moskeija, joka rakennettiin turkkilaiselle varuskunnalle." },
    ],
    "Dibër": [
      { q: "Miksi Peshkopin lähteillä ei saa pitää koruja?", a: "Vesi on niin rikkipitoista, että se tummentaa ja syövyttää useimmat metallit. Kerrotaan, että vain kulta kestää. Rikki tulee Korabin kipsikerrostumista, ja lähteet tuottavat noin 14 litraa sekunnissa." },
      { q: "Mistä Peshkopi on saanut nimensä?", a: "Nimi tulee sanasta piispa. Alue liitettiin Ohridin arkkipiispakuntaan 1019, ja vuotta myöhemmin siitä tuli oma piispakunta. Ottomaanien aikaan paikkaa kutsuttiin nimellä Debre-i Zir eli Ala-Debre." },
    ],
    "Durrës": [
      { q: "Miksi Durrës oli kerran Albanian pääkaupunki?", a: "Vuosina 1914–1920 Durrës toimi maan pääkaupunkina Vlorën jälkeen, ennen kuin Tirana sai aseman." },
      { q: "Miksi kaupungin vanha nimi on Dyrrhachium?", a: "Kreikkalaiset perustivat kaupungin nimellä Epidamnos. Roomalaiset antoivat sille nimen Dyrrhachium sen jälkeen, kun heistä tuli alueen isäntiä 229 eaa." },
      { q: "Onko Durrësissa ottomaanien jälkiä?", a: "On. Ottomaanit valtasivat kaupungin 1501, ja Fatih-moskeija rakennettiin jo 1502. Nykyinen Suuri moskeija on vuodelta 1931 ja seisoo aiemman ottomaanimoskeijan paikalla." },
    ],
    "Elbasan": [
      { q: "Mitä Elbasan-nimi tarkoittaa?", a: "Nimen arvellaan tarkoittavan albaniaksi tasaista linnoitusta tai turkiksi tasaista maakuntaa. Tasainen viittaa Shkumbinin laaksoon Skanderbegin vuorten ja Myzeqen tasangon välissä." },
      { q: "Mikä oli Puolueen teräs?", a: "Se oli 1970-luvulla kiinalaisten avulla rakennettu valtava metallurginen kombinaatti. Sen pohjalta toimii nyt Kurumin terästehdas, joka kattaa noin 85 prosenttia Albanian rautatuotteiden markkinoista. Alue on myös yksi Balkanin saastuneimmista." },
      { q: "Onko Elbasanissa pelattu maajoukkueen otteluita?", a: "On. Vuonna 2014 kunnostettu Elbasan Arena nousi Albanian jalkapallomaajoukkueen kotikentäksi, joten kansallisen tason otteluita nähtiin kaupungissa eikä vain pääkaupungissa." },
    ],
    "Fier": [
      { q: "Miksi Apolloniassa ei ole enää satamaa?", a: "Maanjäristys 200-luvulla jKr. muutti Vjosan uomaa, satama liettyi umpeen ja ympäristö muuttui malariasuoksi. Kaupunki autioitui vähitellen." },
      { q: "Miksi Karavastan laguunilla käy lintuharrastajia?", a: "Laguunilla pesii harvinainen kiharapelikaani, jopa 300 paria. Se on noin 5 prosenttia koko maailman kannasta, ja siksi kansallispuisto on kansainvälisesti tärkeä lintualue." },
      { q: "Miksi Ardenican luostari on tunnettu Skanderbegistä?", a: "Kansallissankari Skanderbeg vihittiin siellä 21. huhtikuuta 1451 Andronika Arianitin kanssa, ja häihin osallistuivat Lezhën liiton ruhtinaat." },
    ],
    "Gjirokastër": [
      { q: "Miksi talot on rakennettu kuin pienet linnat?", a: "Sukujen välinen verikosto, rosvot ja levottomat ajat tekivät kotien linnoittamisesta järkevää. Paksut kiviseinät, pienet alaikkunat ja talon oma vesihuolto pitivät perheen turvassa." },
      { q: "Miksi linnoituksessa on ollut vankila?", a: "Vankilatiloja laajennettiin 1932 kuningas Zogin aikaan, ja myöhemmin siellä pidettiin poliittisia vankeja. Nykyään linnoitus on museo ja yksi kaupungin suosituimmista nähtävyyksistä." },
      { q: "Miksi linnan pihalla on lentokone?", a: "Siellä on esillä vangittu Yhdysvaltain ilmavoimien lentokone, joka muistuttaa hallinnon kylmän sodan ajan kannasta. Linnassa on viisi tornia, ja sen länsipään laajennus on Ali Pashan käsialaa vuoden 1812 jälkeen." },
    ],
    "Korçë": [
      { q: "Mikä on Mirahorin moskeija ja miksi se on niin vanha?", a: "Sen rakennutti 1494–95 sulttaani Bayezid II:n tallimestari Iljaz bej Mirahori, ja se on yksi Albanian vanhimmista säilyneistä ottomaanirakennuksista. Moskeijan ympärille kasvoi kaupungin alkuperäinen ydin." },
      { q: "Miksi Birra Korça maistuu Korçëlta?", a: "Panimo perustettiin 1928, ja vetensä se ottaa Moravan vuoren lähteistä. Olut on yksi Albanian tunnetuimmista tuotemerkeistä." },
      { q: "Miksi Korçën ortodoksinen katedraali on vasta 1990-luvulta?", a: "Edellinen Pyhän Yrjön katedraali purettiin 1968. Nykyinen Kristuksen ylösnousemuksen katedraali rakennettiin uudelleen ja valmistui 1992, ja se on kaupungin pääkirkko." },
    ],
    "Kukës": [
      { q: "Miksi Kukësia ehdotettiin Nobelin rauhanpalkinnon saajaksi?", a: "Kosovon sodan aikana 1999 noin 16 000 asukkaan kaupunki otti vastaan satojatuhansia pakolaisia telttoihin ja koteihin. Kaupunkia ehdotettiin rauhanpalkinnon saajaksi vuonna 2000." },
      { q: "Miksi Valbonan solan yli kävellään yhä vanhaa muulipolkua Thethiin?", a: "Reitti Valbonasta Thethiin nousee noin 1 800 metriin ja on vanha muulipolku, jota pitkin kylien väki kulki markkinoille ja sukulaisten luo ennen teitä. Nyt sen kävelee moni retkeilijä yhdessä päivässä kesäkuukausina, punavalkoisten merkkien opastamana." },
      { q: "Mikä on flija, ja miksi sen valmistus vie tuntikausia?", a: "Flija on pohjois-Albanian ja Kosovon ruoka, jossa ohutta taikinaa levitetään kerros kerrokselta kuumalle rautaiselle saç-kannelle hiillosten päällä ja voidellaan. Kukësissa sen paistoon voi mennä useita tunteja, ja alueella järjestetään flija-festivaaleja." },
    ],
    "Lezhë": [
      { q: "Kuka perusti Lezhën antiikin Lissoksen?", a: "Diodoroksen mukaan Syrakusan hallitsija Dionysios I perusti Lissoksen 385 eaa. turvaamaan kauppareittejä Adrianmerellä. Linnoitus rakennettiin kukkulalle, joka kohoaa yhä kaupungin päällä." },
      { q: "Miksi Lezhëä sanotaan myös Alessioksi?", a: "Se on kaupungin italialainen nimi, jonka Venetsian 1400-luvun hallinto jätti historiakirjoihin. Nimi elää yhä vanhoissa kartoissa ja historiakirjoissa." },
    ],
    "Shkodër": [
      { q: "Miksi Shkodërin sanotaan pyöräkaupungiksi?", a: "Kaupunki on tasainen, ja pyöräily on ollut arkea vuosikymmeniä. Vuokrapyörällä pääsee kaupungista Rozafan linnalle, Mesin sillalle ja järven rantaan, esimerkiksi Shirokan kylään." },
      { q: "Mitä lintuja Shkodërjärvellä näkee?", a: "Järvellä on noin 270 lintulajia, muun muassa kiharapelikaaneja, joita on Euroopassa enää harvassa. Noin 35 prosenttia järvestä kuuluu Albanialle ja loput Montenegrolle." },
      { q: "Mitä Komanin järven lautalla näkee?", a: "Lautta kulkee Komanista Fierzaan noin kaksi ja puoli tuntia kapeissa rotkoissa, joiden jyrkät seinämät nousevat suoraan vedestä. Pienemmät veneet kuljettavat ihmisiä ja tavaraa kyliin, joihin ei pääse tietä pitkin." },
    ],
    "Tiranë": [
      { q: "Miksi Tiranan pyramidi on nyt portaikko?", a: "Pyramidi avattiin 1988 museona, ja sitä käytettiin myöhemmin muun muassa konferenssikeskuksena. Hollantilainen MVRDV muutti sen 2023 nuorten teknologiakeskus TUMOksi, ja katolle johtavat portaat saavat kiipeämään sinne kuten paikalliset ennenkin." },
      { q: "Kuinka nopeasti pääsee vuorelle Tiranasta?", a: "Dajti Ekspres -köysirata nousee 15 minuutissa noin 1 613 metrin korkeuteen Dajtin parvekkeelle. Se valmistui 2005, ja ylhäältä näkee koko Tiranan tasangon." },
    ],
    "Vlorë": [
      { q: "Miksi Muradien moskeija on tärkeä?", a: "Se rakennettiin 1537–1542 ja sen suunnitteli Mimar Sinan, joka teki myös Süleymaniyen moskeijan Istanbulissa. Moskeija on Albanian kulttuurimonumentti ja edelleen käytössä." },
      { q: "Miksi Narta-laguuni on niin matala?", a: "Sen keskisyvyys on vain noin 0,7 metriä, koska Vjosa-joki on kasannut siihen sedimenttiä tuhansien vuosien ajan. Matala vesi on kuin suunniteltu suolalammikoille ja lintujen ruokapaikaksi." },
      { q: "Kuinka suuri Sazanin saari on?", a: "Sazan on Albanian suurin saari, noin 4,8 kilometriä pitkä ja 2,7 leveä. Se kuuluu Karaburun-Sazanin meripuistoon, jonka vesillä uivat delfiinit ja sukeltajien löytämät hylyt." },
    ],
  },
  MKD: {
    "Eastern": [
      { q: "Mitä ovat Vinican terrakottaikonit?", a: "Savilaattoja, jotka löytyivät Viničko Kalen linnavuoren raunioilta ja ajoittuvat 500–600-luvuille. Ne on valettu muoteilla, ja niissä on kristillisiä kuvia sekä latinankielisiä rukoustekstejä. Suuri osa on nykyään Skopjen museossa." },
      { q: "Mikä on Lesnovon luostari?", a: "Probištipin lähellä Osogovon rinteellä oleva luostari perustettiin vuonna 1341 despootti Jovan Oliverin toimesta. Pyhän Mikaelin kirkon freskot maalattiin 1346–1347, ja ne ovat keskiaikaisen serbialais-bysanttilaisen maalaustaiteen merkittäviä esimerkkejä." },
    ],
    "Southeastern": [
      { q: "Miksi Dojranin kalastajat pyytävät kalaa merimetsojen avulla?", a: "Talvella kalastajat rakentavat ruokoaidoista pyydyksen, mandran, ja merimetsot ajavat kalat sinne. Tapa on harvinainen, ja kausi alkaa lokakuussa ja kestää maaliskuuhun." },
      { q: "Milloin Končen luostari rakennettiin?", a: "Radovišin eteläpuolella Konče-vuoren juurella oleva Pyhän Tapanin kirkko rakennettiin vuonna 1366. Luostari oli keskiajalla tärkeä hengellinen keskus, ja sen ympärille kohosi asuinrakennuksia." },
    ],
    "Northeastern": [
      { q: "Mitä ovat Kuklican kivinuket?", a: "Kratovon lähellä, Kriva-joen laaksossa olevat noin 0,3 neliökilometrin alueen kivipilarit ovat eroosion veistämiä: kova tulivuorikivi suojaa alla olevaa pehmeää tuffia. Legendan mukaan ne ovat kirouksen kivettämä häävieraiden joukko." },
      { q: "Mikä on Osogovon luostari?", a: "Kriva Palankan lähellä, kymmenen kilometrin päässä Bulgarian rajasta oleva luostari, jossa on kaksi kirkkoa. Suuri Pyhän Joakimin kirkko rakennettiin 1847–1851, ja freskoissa on Kriva Palankan kansallispukua. Pieni Neitsyt Marian kirkko on 1300-luvulta." },
    ],
    "Southwestern": [
      { q: "Miksi Vevčanin kylällä on oma 'tasavalta'?", a: "Vuonna 1987 kyläläiset vastustivat suunnitelmaa johtaa heidän lähdevetensä Strugaan, ja leikillinen 'Vevčanin tasavalta' sai alkunsa. Kylällä on oma ličnik-rahansa, ja sen karnevaali juhlii vuodenvaihdetta juliaanisen kalenterin mukaan." },
      { q: "Milloin Kaneon kirkko on rakennettu?", a: "Tarkkaa vuotta ei tiedetä. Asiakirjojen mukaan kirkko oli olemassa ennen vuotta 1447, ja arkeologit arvioivat sen rakennetun 1200-luvulla. Ristin muotoisen kirkon kupolin freskot löytyivät vuoden 1964 entisöinnissä." },
      { q: "Miksi Plaošnik on tärkeä paikka?", a: "Kliment saapui Ohridiin 893 ja rakensi varhaiskristillisen basilikan perustuksille Pyhän Panteleimonin kirkon, jonne hänet on haudattu. Hänen kirjallista koulutustaan pidetään usein Euroopan vanhimpana yliopistona." },
    ],
    "Pelagonia": [
      { q: "Miksi Golem Grad on 'käärmesaari'?", a: "Prespanjärven Golem Grad on 600 metriä pitkä ja 350 metriä leveä asumaton saari, jossa elää muun muassa sarvikyitä ja vesikäärmeitä sekä noin tuhat ihmisen tuomaa Hermannin kilpikonnaa, ja saari avattiin turisteille elokuussa 2008." },
      { q: "Miksi Kruševon Makedonium näyttää avaruusalukselta?", a: "Makedonium on vuonna 1974 avattu muistomerkki, jonka suunnittelivat Jordan ja Iskra Grabuloski. Pyöreässä rakennuksessa on ovaalit lasimaalausikkunat, ja se muistaa vuoden 1903 Ilinden-kansannousua sekä toisen maailmansodan vastarintaa." },
      { q: "Miksi Manaki-festivaalin palkinto on 'Kultainen kamera 300'?", a: "Nimi viittaa veljesten Yanakin ja Miltonin Manakin kameraan: Yanaki osti Lontoosta 35 mm:n Urban Bioscope -kameran, jonka sarjanumero oli 300. Festivaali on pidetty Bitolassa vuodesta 1979." },
    ],
    "Polog": [
      { q: "Miksi Galičnikin häät ovat kuuluisat?", a: "Kylässä järjestetään heinäkuun 12. päivää, Pietarin ja Paavalin päivää, lähinnä oleva viikonloppu. Ennen häät kestivät viisi päivää. Nykyään valittu pari vihitään perinteisin menoin, ja miehet tanssivat Teškoto-tanssin, joka muistuttaa työhön ulkomaille lähtevistä miehistä." },
      { q: "Mikä tekee Bigorskin luostarin ikonostaasista erikoisen?", a: "Pähkinäpuusta 1829–1835 kaiverretussa Mijak-mestareiden teoksessa on satoja ihmishahmoja ja eläimiä, jotka kuvaavat Vanhaa ja Uutta testamenttia. Se lasketaan yhdeksi Balkanin kauneimmista." },
    ],
    "Skopje": [
      { q: "Miksi Kuršumli An on 'lyijyinen'?", a: "Vanhan basaarin karavaanisarai rakennettiin 1400- tai 1500-luvulla, ja sen pyramidimaiset kupolit olivat alun perin lyijypeitteiset. Nimi tulee turkin lyijyä tarkoittavasta sanasta." },
      { q: "Miten pääsee Vodnon huipulle ilman kävelyä?", a: "Gondolihissi otettiin käyttöön 3. kesäkuuta 2011. Se nousee 1 600 metrin matkan ja 480 metriä ylöspäin Sredno Vodnosta Millennium-ristille, joka on rakennettu vuonna 2002 ja on 66-metrisenä yksi maailman korkeimmista risteistä." },
      { q: "Milloin Mustafa-pashan moskeija rakennettiin?", a: "Vuonna 1492 Çoban Mustafa Pasha rakennutti moskeijan tasanteelle vanhan basaarin yläpuolelle. Se on yksi Skopjen vanhimmista säilyneistä moskeijoista." },
    ],
    "Vardar": [
      { q: "Mikä on stanušina-rypäle?", a: "Tikvešin harvinainen punainen viinirypälelajike, jota ei kasva missään muualla maailmassa. Siitä tehty viini on vaalean värinen ja kuivan lehden ja mansikan sävyinen. Lajike on uhanalainen, ja viinitilat yrittävät elvyttää sitä." },
      { q: "Miksi Veles nousi kansainvälisiin uutisiin vuonna 2016?", a: "Toimittajat paljastivat, että kaupungista käsin pyöritettiin yli sataa sivustoa, jotka julkaisivat Yhdysvaltain vaaleista ja Donald Trumpin kampanjasta usein virheellisiä juttuja. Motiivi oli raha." },
    ],
  },
  MNE: {
    "Andrijevica": [
      { q: "Mistä Andrijevica on saanut nimensä?", a: "Perimätiedon mukaan nimi tulee Andrijevina-kirkosta, jonka rakennutti Nemanjić-suvun jälkeläinen Andrija. Osmanit tuhosivat kirkon vuonna 1765, ja myöhemmin uuden kirkon ympärille kasvoi asutus, josta tuli nykyinen kaupunki." },
      { q: "Mikä tunnettu romaani on peräisin Andrijevican seudulta?", a: "Kirjailija Mihailo Lalić syntyi vuonna 1914 lähellä Andrijevicaa, Trepčan kylässä. Hänen pääteoksensa Lelejska gora ilmestyi 1957, ja se kertoo toisen maailmansodan ajan Montenegrosta." },
    ],
    "Bar": [
      { q: "Mitä Marconi teki Barissa vuonna 1904?", a: "Italialainen Guglielmo Marconi rakensi Barin (silloin Antivari) ja italialaisen Barin välille kaupallisen radiosähkeyhteyden, joka avattiin elokuussa 1904. Marconi kävi itse tarkastamassa Montenegron puoleisen aseman." },
      { q: "Miksi Stari Bar on nykyään raunio?", a: "Vanha kaupunki vaurioitui vuonna 1878, kun Montenegro valtasi sen taistelujen jälkeen, ja vuoden 1979 maanjäristys vaurioitti sitä lisää. Jäljellä on satoja rakennuksia: kirkkoja, moskeijoita, hamam ja vesijohto." },
      { q: "Mikä oli Montenegron ensimmäinen rautatie?", a: "Vuonna 1908 avattu kapearaiteinen Bar–Virpazar, 43 kilometriä pitkä ja 750 millimetrin raiteella. Se yhdisti Barin sataman Skadarjärven Virpazarin satamaan, ja se lopetettiin vasta 1959, kun normaaliraiteinen rata Podgoricaan avattiin." },
    ],
    "Berane": [
      { q: "Miksi Berane oli 43 vuotta nimeltään Ivangrad?", a: "Vuosina 1949–1992 kaupunki kantoi nimeä Ivangrad kansansankari Ivan Milutinovićin mukaan. Vanha nimi Berane palautettiin vuonna 1992, ja se on ollut käytössä siitä lähtien." },
      { q: "Mitä nimeä seutu kantoi keskiajalla?", a: "Seutu tunnettiin nimellä Budimlja. Se kuului laajempaan Raškan alueeseen, kunnes ottomaanit valtasivat sen vuonna 1455." },
      { q: "Mitä Kaludran kylän lähellä on?", a: "Noin kymmenen kilometriä Beranesta kaakkoon ovat Ćelijen luostarikompleksin rauniot. Museon arkeologit tutkivat paikkaa 1991 ja löysivät Pyhän Luukkaan kirkon jäänteet sekä luostarin asuinrakennuksen perustukset." },
    ],
    "Bijelo Polje": [
      { q: "Miksi amerikkalaistutkijat tulivat Bijelo Poljeen 1930-luvulla?", a: "Milman Parry ja Albert Lord nauhoittivat seudulla 1935 guslari Avdo Međedovićin, jonka eepos Smailagić Meho -häistä on noin 12 300 säettä pitkä. Tallenteet auttoivat selittämään, miten suullinen runous syntyy ja miten Homeroksen eepokset ehkä on sävelletty." },
      { q: "Mikä on Ratkovićin runoillat?", a: "Vuosittainen runofestivaali, joka on nimetty Bijelo Poljessa syntyneen kirjailijan Risto Ratkovićin mukaan. Festivaalilla jaetaan palkinto parhaalle runokirjalle ja palkintoja nuorille runoilijoille." },
    ],
    "Budva": [
      { q: "Mikä on Sveti Nikola?", a: "Montenegron suurin saari, noin kilometrin päässä Budvan vanhakaupungista ja pituudeltaan noin kaksi kilometriä. Saari on autoton ja suurelta osin rakentamaton, ja sinne pääsee vesitaksilla; paikalliset kutsuvat sitä Montenegron Havaijiksi." },
      { q: "Mitä Budvan muinaishaudoista löytyi?", a: "Vuoden 1979 maanjäristyksen jälkeen kaupungin länsipuolelta löytyi laaja hellenistis-roomalainen hautausmaa. Esineet konservoitiin Cetinjessä ja palasivat Budvaan 2003. Kokoelmaan kuuluu kultakoruja, muun muassa korvakorut, joissa on kotka ja poika, joita on tulkittu Zeuksen ja Ganymedeen myytiksi." },
    ],
    "Cetinje": [
      { q: "Miksi Biljarda on saanut nimensä?", a: "Vuonna 1838 valmistunut Njegošin asuinrakennus kantaa nimeään talon biljardipöydän mukaan, joka oli Montenegron ensimmäinen ja jonka Njegoš toi Italiasta. Nykyään talo on Njegoš-museo." },
      { q: "Miksi Vlaška-kirkon aita on tehty kivääreistä?", a: "Kirkko rakennettiin noin vuonna 1450 keskiaikaisen hautausmaan paikalle, jossa oli noin 150 stećci-hautakiveä. Sen pihaa kiertävä aita on tehty kivääreistä, jotka Montenegro sai sotasaaliina Osmanien valtakuntaa vastaan." },
      { q: "Mitä pyhäinjäännöksiä Cetinjen luostarissa säilytetään?", a: "Luostarissa säilytetään Kastajan Johanneksen oikeaa kättä, Pyhän Ristin palasta ja Pietari Cetinjeläisen jäännöksiä." },
    ],
    "Danilovgrad": [
      { q: "Mistä Zeta-joki oikeasti nousee?", a: "Zeta kulkee Nikšićin kautta, uppoaa maan alle ja nousee uudelleen Danilovgradissa Glava Zeten lähteinä. Joki jatkaa Bjelopavlićin tasangon läpi Moračaan." },
      { q: "Kuinka kuumaksi Danilovgradin seutu käy?", a: "Montenegron lämpöennätys 44,8 °C mitattiin Podgoricassa elokuussa 2007, ja sama lukema toistui Danilovgradissa elokuussa 2012. Tasangon kesät ovat poikkeuksellisen kuumia." },
    ],
    "Herceg Novi": [
      { q: "Mitä Kanli Kula tarkoittaa, ja mitä sen seinillä on?", a: "Kanli Kula tarkoittaa Verinen torni. Linnakkeen vesisäiliö muutettiin vankikoppiin, ja sen seinillä on yhä piirroksia kaleereista, kaloista, risteistä sekä nimiä ja vuosilukuja. Nykyään tornin sisäpihalla on kesäisin ulkoilmaesityksiä." },
      { q: "Miksi Igaloon tullaan hoitoihin?", a: "Herceg Novin kyljessä olevan Igalon rannoilta ja lähteistä saadaan parantavaksi katsottua meriliejua ja kivennäisvettä. Sen ympärille on kasvanut kylpylä- ja kuntoutuspaikkakunta." },
      { q: "Kuinka vanha Savinan luostarin pieni kirkko oikeasti on?", a: "Perinne ajoittaa Neitsyt Marian kuolleeksi nukkumisen pienen kirkon vuoteen 1030, mutta tyylintutkimus viittaa 1400-lukuun ja Kosačojen aikaan. Kirkko on vain kymmenen metriä korkea ja kuusi leveä." },
    ],
    "Kolašin": [
      { q: "Mitä erikoista Morača-luostarin seinillä on?", a: "Luostarin 1200-luvun freskoihin kuuluu kolmetoista kohtausta profeetta Eliaan elämästä. Osmanit hävittivät luostarin 1505, ja se oli autiona noin seitsemän vuosikymmentä, kunnes kunnostus alkoi vuonna 1574." },
      { q: "Miksi Belgrad–Bar-rata on kuuluisa?", a: "Rata valmistui 1976, ja sen Kolašinin läheinen Mala Rijeka -viadukti oli valmistuessaan maailman korkein rautatiesilta. Rata kulkee kymmenien tunneleiden ja siltojen kautta Montenegron vuoristojen läpi." },
    ],
    "Kotor": [
      { q: "Onko Kotorinlahti oikea fjordi?", a: "Ei ole. Vaikka lahtea kutsutaan usein Etelä-Euroopan fjordiksi, se on veden peittämä jokilaakso eli ria. Se on yksi Adrianmeren mutkikkaimmista rannikkokohdista." },
      { q: "Miksi Kotorin yllä kiemurtelee tie, jossa on kymmeniä mutkia?", a: "Serpentiinitie yhdistää rannikon Njegušin kylään ja Lovćenin kansallispuiston suuntaan. Se rakennettiin 1800-luvun lopulla Itävalta-Unkarin aikana, ja siinä on noin 25 hiusneulamutkaa, joista jokainen avaa uuden näkymän lahdelle." },
    ],
    "Mojkovac": [
      { q: "Miksi Mojkovacin taistelua kutsutaan verisen joulun taisteluksi?", a: "Taistelu osui ortodoksiseen jouluun tammikuussa 1916. Montenegrolaiset torjuivat hyökkäyksen ja saivat Serbian armeijan perääntymisen turvattua." },
      { q: "Mikä Brskovo oli?", a: "Keskiajalla Brskovo oli kaivos- ja rahapajakaupunki, jonka saksilaiset kaivosmiehet tekivät vilkkaaksi 1280-luvulla. Siellä lyötiin Grossi de Brescova -rahoja, ja Dubrovnikilla oli paikalla konsuli." },
    ],
    "Nikšic": [
      { q: "Mitä Bedem tarkoittaa, ja millainen linnoitus se oli?", a: "Bedem tarkoittaa vallia tai muuria. Osmanien aikana linnoitus oli alueen vahvin linnake." },
      { q: "Miksi Krupacia kutsutaan Nikšićin mereksi?", a: "Krupac on tekojärvi, jonka nikšiläiset ovat ristineet leikillään mereksi. Kesäisin sen rannoilla uidaan ja harrastetaan vesiurheilua." },
    ],
    "Plav": [
      { q: "Miksi Hridsko-järvelle kävellään monta tuntia?", a: "Hridsko-järvi on jäätikköjärvi noin 1 970 metrin korkeudessa Prokletijen kansallispuistossa. Polku alkaa Plavin yläpuolelta, ja yhteen suuntaan kävelyyn menee noin 4–5 tuntia." },
      { q: "Minne Plavin järven vesi lopulta päätyy?", a: "Järvestä lähtevä Lim virtaa Drinaan ja sieltä Savan ja Tonavan kautta Mustallemerelle." },
    ],
    "Pljevlja": [
      { q: "Mikä on häkkimalja, ja miksi Pljevlja on sillä kuuluisa?", a: "Roomalainen diatretum on lasiastia, jonka ulkopinta on veistetty verkkomaiseksi häkiksi. Kominin nekropolista Pljevljan lähellä löytynyt, 300-luvulle ajoitettu malja on harvinaisen ehjä, ja se on esillä Pljevljan kotiseutumuseossa." },
      { q: "Kuka maalasi Pljevljan luostarin freskot?", a: "Pappi Strahinja Budimljesta maalasi kirkon ja esikirkon freskot vuosina 1592–1595. Alimmalla vyöhykkeellä ovat pyhät ja Nemanjić-suvun jäsenet, ylempänä suuret kirkkojuhlat ja Kristuksen kärsimys." },
    ],
    "Plužine": [
      { q: "Mitä tapahtuu Šćepan Poljessa, Plužinen kunnan rajaseudulla?", a: "Siellä Tara ja Piva yhtyvät ja muodostavat Drina-joen. Šćepan Polje on myös Taran koskenlaskun päätepiste." },
      { q: "Mikä Pivanjärvi oikeastaan on?", a: "Se ei ole luonnonjärvi vaan Mratinjen padon 1970-luvulla kanjoniin nostama tekojärvi. Sen pinta-ala on noin 12 neliökilometriä, ja se on yksi Montenegron suurimmista järvistä." },
    ],
    "Podgorica": [
      { q: "Mikä on Doclea, ja miksi sinne kannattaa mennä?", a: "Doclea oli roomalainen kaupunki, jonka rauniot ovat noin kolmen kilometrin päässä Podgorican pohjoispuolella. Niistä erottuvat foorumi, basilika, temppeleitä ja kylpylä." },
      { q: "Mitä kaupungin nimi tarkoittaa?", a: "Nimi tulkitaan suunnilleen muotoon 'Gorican alla'. Goricalla tarkoitetaan keskustan viereistä kukkulaa." },
      { q: "Onko Podgorica sateinen?", a: "On: vuosisadanta on noin 1 650 millimetriä, ja sateet tulevat pääosin syksyllä ja talvella. Kesät ovat kuivia ja kuumia." },
    ],
    "Rožaje": [
      { q: "Mistä Ibar-joki saa alkunsa?", a: "Ibarin lähde, Vrelo Ibra, on tiheän havumetsän keskellä lähellä Rožajea. Joki virtaa lopulta 272 kilometrin matkan ja laskee Länsi-Moravaan Kraljevon lähellä Serbiassa." },
      { q: "Mikä Hajla on?", a: "Hajla on vuorijono, jonka huiput ylittävät 2 000 metriä. Korkein huippu on 2 403 metriä, ja se sijaitsee valtionrajalla." },
    ],
    "Šavnik": [
      { q: "Miksi Nevidio-kanjonia sanotaan yhdeksi Euroopan viimeisistä valloitetuista kanjoneista?", a: "Komarnica-joen Nevidio-kanjoni on noin kaksi kilometriä pitkä ja paikoin vain metrin levyinen. Sen läpi kerrotaan päästyn ensimmäisen kerran 1965, kun vuoristokiipeilijät kulkivat sen sukellusvarusteissa." },
      { q: "Missä Montenegron ensimmäinen tuulipuisto on?", a: "Krnovon ylätasangolla Nikšićin ja Šavnikin välisen tien varrella. Puisto käynnistyi 2017, ja siinä on 26 tuuliturbiinia, yhteensä 72 megawattia." },
    ],
    "Tivat": [
      { q: "Mikä sukellusvene Tivatissa voi käydä katsomassa?", a: "Se on P-821 Heroj, vuonna 1968 valmistunut noin 50-metrinen sukellusvene, jonka miehistö oli 28. Sitä pääsee kiertämään meriperinnemuseon yhteydessä, entisen laivastoarsenaalin tiloissa." },
      { q: "Mikä on Kukkasaari Tivatin edustalla?", a: "Se on pieni saari, joka on yhdistetty mantereeseen kapealla hiekkakannaksella. Sen vanhempi nimi Miholjska prevlaka viittaa arkkienkeli Mikaelin luostariin." },
      { q: "Kuinka suuri Porto Montenegro on?", a: "Satamassa on noin 480 venepaikkaa, joista noin 350 on tarkoitettu superjahdeille, ja se mainostaa olevansa Euroopan suurin superjahtisatama." },
    ],
    "Ulcinj": [
      { q: "Miksi Ulcinjia sanotaan merirosvojen kaupungiksi?", a: "Ottomaanien valloituksen 1571 jälkeen kaupungista tuli Adrianmeren korsaarien tukikohta, ja merirosvoilu jatkui 1700-luvun alkuun. Legenda liittää kaupunkiin myös Cervantesin, mutta useimpien lähteiden mukaan hänen vankeutensa oli Algerissa." },
      { q: "Miten Ada Bojana -saari syntyi?", a: "Tarinan mukaan Bojana-joen suulle 1858 haaksirikkoutunut laiva sitoi jokisedimenttiä, ja siitä kasvoi saari. Nykyinen kolmionmuotoinen saari on noin 4,8 neliökilometrin kokoinen ja matala." },
      { q: "Kuka kuoli Ulcinjissa 1676?", a: "Sabbatai Zevi, itseään messiaaksi julistanut juutalainen, kuoli maanpaossa Ulcinjissa 1676." },
    ],
    "Žabljak": [
      { q: "Kuinka syvä Taran kanjoni on?", a: "Noin 1 300 metriä ja 80 kilometriä pitkä, mikä tekee siitä yhden Euroopan syvimmistä kanjoneista." },
      { q: "Miksi Durmitorin järviä sanotaan vuorten silmiksi?", a: "Alueella on 18 jäätikköjärveä, joita kutsutaan nimellä Gorske oči eli vuorten silmät. Niistä suurin ja lähin on Mustajärvi." },
      { q: "Kuka rakensi Taran sillan?", a: "Sillan suunnitteli insinööri Mijat Trojanović, ja se valmistui 1937–1940. Se on viisikaarinen betonisilta korkealla joen yläpuolella, ja sitä on käytetty muun muassa elokuvassa Force 10 from Navarone 1978." },
    ],
  },
  CYP: {
    "Famagusta": [
      { q: "Mitä Ayia Napan nimi tarkoittaa?", a: "\"Ayia\" on pyhä ja \"napa\" metsäinen laakso. Perimätiedon mukaan metsästäjä löysi luolasta koiransa etsiessään Neitsyt Marian ikonin, ja paikasta tuli pyhiinvaelluskohde." },
      { q: "Miksi vedenalaiset veistokset upotettiin juuri merisuojelualueelle?", a: "MUSANin teokset on tehty myös keinotekoiseksi riutaksi, jolle kasvaa merieliöitä. Veistokset sijaitsevat Pernera-rannan merisuojelualueella, ja niihin pääsee snorklaamalla tai sukeltamalla." },
      { q: "Miksi muinainen Salamis hylättiin?", a: "Maanjäristykset tuhosivat kaupunkia 300-luvun alussa, ja se rakennettiin uudelleen Constantiana. Lopulta se autioitui 600-luvulla arabien hyökkäysten jälkeen." },
    ],
    "Larnaca": [
      { q: "Miksi Zenobia upposi?", a: "Uusi, 172-metrinen lautta kaatui 7. kesäkuuta 1980 neitsytmatkallaan. Yleisimmän selityksen mukaan painolastin ohjausjärjestelmän vika sotki lastin tasapainon. Kyydissä oli 108 rekkaa, eikä ketään kuollut." },
      { q: "Mistä Lefkaran pitsi on kuuluisa?", a: "Lefkaran kylän käsityö on Unescon aineetonta kulttuuriperintöä vuodesta 2009. Tarun mukaan Leonardo da Vinci toi täältä pitsiliinan Milanoon." },
      { q: "Kuka oli Zenon Kitionilainen?", a: "Stoalaisen filosofian perustaja, joka syntyi Kitionissa eli nykyisessä Larnacassa. Hän opetti Ateenassa, ja \"stoalainen\" tulee hänen koulunsa kokoontumispaikasta, pylväshallista." },
    ],
    "Limassol": [
      { q: "Miksi Englannin kuningatar kruunattiin Limassolissa?", a: "Richard Leijonasydän valloitti Kyproksen vuonna 1191 matkalla ristiretkelle, ja hän meni naimisiin Berengarian kanssa Limassolin linnan kappelissa 12. toukokuuta. Berengaria kruunattiin samana päivänä, eikä hän koskaan käynyt Englannissa." },
      { q: "Mitä Kolossin linnan vieressä tehtiin keskiajalla?", a: "Linnan vieressä oli sokeriruokoa jalostava sokeritehdas, ja sokeri oli tuolloin yksi Kyproksen tärkeimmistä vientituotteista. Sokeritehtaan rauniot näkyvät yhä linnan vieressä." },
      { q: "Onko Kourionin teatteria vielä käytössä?", a: "On. Teatteri rakennettiin 100-luvulla eaa. ja laajennettiin 100-luvulla jaa., ja siellä esitetään yhä näytelmiä, esimerkiksi antiikin draamaa." },
    ],
    "Nicosia": [
      { q: "Mistä Nikosian muurien bastionit ovat saaneet nimensä?", a: "Kunkin bastionin nimi tulee yhdestä yhdestätoista aatelissuvusta, jotka rahoittivat rakentamista. Muurit suunnittelivat insinöörit Giulio Savorgnano ja Francesco Barbaro." },
      { q: "Millaisia Troodoksen maalatut kirkot ovat?", a: "Kivikirkon päällä on jyrkkä, laattakattoinen puukatto. Sisällä seiniä peittävät maalaukset ovat 1000–1500-luvuilta." },
      { q: "Miksi Kyproksen museo perustettiin?", a: "Se perustettiin vuonna 1882 saaren asukkaiden vetoomuksen jälkeen, ja nykyiseen uusklassiseen rakennukseensa se muutti vuonna 1924. Kokoelma on laaja kyproslaisen antiikin esineistö." },
    ],
    "Paphos": [
      { q: "Miksi Afroditea palvottiin Kouklian pyhäkössä kivenä eikä patsaana?", a: "Palaipaphosin pyhäkössä, joka perustettiin noin vuonna 1200 eaa., jumalatarta esitti kartiomainen kivi. Se on nyt esillä Kouklian museossa." },
      { q: "Mitä Lara-rannalla tehdään merikilpikonnien hyväksi?", a: "Lara on Välimeren tärkeimpiä caretta- ja vihreän merikilpikonnan pesimärantoja. Kalastusosasto on pitänyt siellä hautomoa vuodesta 1978 ja siirtää vaarassa olevat munat suojaan." },
      { q: "Miksi Kuninkaiden haudat on nimetty kuninkaiden mukaan?", a: "Nimi tulee hautojen komeudesta: kuninkaita niihin ei haudattu, vaan Paphosin aatelisia ja korkeita virkamiehiä 200-luvulle jaa. asti. Osassa haudoista on dorilaisia pylväitä ja seinämaalauksia." },
    ],
  },
  MLT: {
    "Southern Harbour": [
      { q: "Miksi Caravaggion Johannes Kastajan mestaus on Vallettassa niin erikoinen?", a: "Se on ainoa maalaus, johon Caravaggio on kirjoittanut nimensä – Johannes Kastajan kaulasta valuvaan vereen. Työ valmistui 1608 St. John's Co-Cathedralin oratorioon, ja ritarikunta erotti taiteilijan saman vuoden joulukuussa." },
      { q: "Missä ritarit asuivat ennen Vallettaa?", a: "Ritarikunta asettui Birguun vuonna 1530 ja piti sitä keskuspaikkanaan vuoteen 1571, jolloin se muutti uuteen Vallettaan. Birgu on nykyään yksi Suuren sataman toisella rannalla olevista Kolmesta kaupungista." },
    ],
    "Northern Harbour": [
      { q: "Mitä Sliema tarkoittaa?", a: "Maltaksi sliema on \"rauha\", ja sanaa käytettiin myös tervehdyksenä. Pienestä kalastajakylästä kasvoi kaupunki, kun Vallettan varakkaat alkoivat rakentaa rantaan kesähuviloita ja kulkivat niille lautalla." },
      { q: "Miksi Maltan yliopiston historia alkaa Vallettasta eikä Msidasta?", a: "Jesuiitat perustivat Collegium Melitensen paavin luvalla 1592, ja sen oma rakennus valmistui Vallettaan vuosina 1595–1597. Msidan kampus on paljon nuorempi: se otettiin käyttöön vasta 1900-luvun jälkipuoliskolla." },
    ],
    "South Eastern": [
      { q: "Miksi Mnajdran temppelit ovat kuuluisia auringosta?", a: "Päiväntasauksena aamuaurinko valaisee pääoven läpi koko käytävän perimmäiseen apsikseen, ja päivänseisauksina valo osuu sisään vain kapeana säteenä. Temppelin rakentajat näyttävät siis tunteneen auringon vuotuisen kierron yli 5 000 vuotta sitten." },
      { q: "Mitä Marsaxlokk tarkoittaa?", a: "Nimessä yhdistyvät sanat marsa, \"satama\", ja xlokk, kaakkoistuuli eli sirocco, joten se on suunnilleen \"kaakon satama\". Lahti tarjoaa suojaisen ankkuripaikan saaren kaakkoisrannalla." },
    ],
    "Western": [
      { q: "Miksi Mdina näyttää televisiosarjan kuninkaankaupungilta?", a: "Koska se esitti sitä: Game of Thrones -sarjan ensimmäisellä kaudella linnoitettu Mdina oli Westerosin pääkaupunki King's Landing. Keskiaikaiset muurit ja hiekkakiviset kujat kelpasivat lavasteiksi lähes sellaisenaan." },
      { q: "Mikä Verdalan palatsi on?", a: "Suurmestari Hugues Loubenx de Verdalle rakennutti sen vuonna 1586 ritarikunnan kesäasunnoksi Rabatin liepeille Buskettin metsän kupeeseen." },
    ],
    "Northern": [
      { q: "Miksi pohjoisrannikolla on värikäs puukylä, Popeye Village?", a: "Kylä rakennettiin Anchor Bayn rannalle 1979 Robin Williamsin tähdittämän Popeye-elokuvan lavasteeksi: 19 puurakennusta ja aallonmurtaja. Kuvausten jälkeen se jäi paikalleen, ja nykyään se on ympärivuotinen turistikohde." },
      { q: "Mistä St Paul's Bay on saanut nimensä?", a: "Perimätiedon mukaan apostoli Paavali haaksirikkoutui lahdelle noin vuonna 60 matkalla Roomaan; tapahtumasta kertovat Apostolien teot. Kristinuskon tulon Maltalle katsotaan alkaneen juuri tästä." },
    ],
    "Gozo and Comino": [
      { q: "Miksi Ġgantija-temppelit ovat niin kuuluisia?", a: "Xagħran temppelit ovat noin 5 500 vuotta vanhoja, siis vanhempia kuin Gizan pyramidit. Nimi tulee sanasta ġgant, jättiläinen: myöhemmät sukupolvet uskoivat, että vain jättiläisnainen saattoi nostaa niin suuria kiviä." },
      { q: "Miksi Dwejran Fungus Rockille ei saanut kiivetä?", a: "Kalliolla kasvaa haiseva loiskasvi, jota ritarit pitivät lääkkeenä. Suurmestari Pinto julisti kallion 1746 kielletyksi alueeksi, ja luvaton keräilijä saattoi joutua kolmeksi vuodeksi keittiöorjaksi." },
      { q: "Mikä Kalypson luola on?", a: "Xagħran lähellä Ramlan lahden reunalla oleva luola yhdistetään Homeroksen Ogygiaan, jonne nymfi Kalypso piti Odysseusta vankinaan seitsemän vuotta. Todisteita ei ole, mutta legenda on pitänyt paikkaa kartalla." },
    ],
  },
  LUX: {
    "Diekirch": [
      { q: "Miksi Diekirchin kirkontornia kruunaa aasi kukon sijaan?", a: "Legendan mukaan aasit raatoivat Herrenbergin jyrkillä viinitarhoilla, koska vain ne pärjäsivät rinteessä. Niistä tuli kaupungin tunnus: Laurentius-kirkon tornissa on aasi, ja karnevaalikulkueissa se on vieläkin päätähti." },
      { q: "Mikä on The Family of Man, ja miksi se on juuri Clervaux'ssa?", a: "Se on 503 valokuvan näyttely 273 kuvaajalta 68 maasta, jonka Edward Steichen kokosi New Yorkiin 1955. Luxemburgilaissyntyinen Steichen halusi sen pysyvästi kotimaahansa, ja Clervaux'n linnassa se on ollut vuodesta 1994. Unesco liitti sen Memory of the World -luetteloon 2003." },
      { q: "Mitä Viandenin pumppuvoimalaitoksessa tapahtuu öisin?", a: "Kun sähkön kysyntä on pieni, vettä pumpataan Our-joen alaaltaasta ylös vuorella olevaan altaaseen. Päivällä huippukulutuksen aikaan vesi lasketaan takaisin turbiinien läpi." },
    ],
    "Grevenmacher": [
      { q: "Mitä Echternachin hyppykulkueessa tapahtuu?", a: "Helluntaitiistaina tuhannet pyhiinvaeltajat ja katsojat etenevät kaupungin läpi hyppien, valkoiset nenäliinat käsissä ja torvisoittokuntien soittaessa. Perinne juontaa 1400-luvun lopulta, ja Unesco lisäsi sen aineettoman perinnön luetteloonsa 2010." },
      { q: "Mikä tekee Mullerthalista Luxemburgin Pikku-Sveitsin?", a: "Alue on nimetty maisemansa mukaan, ei korkeuden: siellä on hiekkakivikallioita, kapeita rotkoja ja luolia. Mullerthal Trail kiertää seutua kolmena reittinä, yhteensä noin 112 kilometriä." },
      { q: "Miksi Luxemburgin viinit ovat lähinnä kuivia valkoviinejä ja kuohuvia?", a: "Viileän ilmaston viinialueen erikoisuutta ovat kuivat, Alsacen tyyliä muistuttavat valkoviinit, ja perinteisellä menetelmällä tehtyä kuohuviiniä myydään nimellä Crémant de Luxembourg. Yleisimpiä lajikkeita ovat Rivaner, Auxerrois, Pinot gris ja Riesling." },
    ],
    "Luxembourg": [
      { q: "Mistä Luxemburgin nimi tulee?", a: "Nimi juontuu sanasta Lucilinburhuc, 'pieni linnoitus'. Kreivi Siegfried vaihtoi Bock-kalliolla sijainneen linnan omiin maihinsa Feulenissa Trierin apotin kanssa 7. huhtikuuta 963." },
      { q: "Mikä on Gëlle Fra?", a: "Se on kultapintainen naisveistos 21-metrisen obeliskin huipulla Perustuslaintorilla, ja se muistuttaa kaatuneista luxemburgilaissotilaista. Claus Citon veistämä monumentti paljastettiin 1923, ja natsit tuhosivat sen 1940." },
      { q: "Mitä EU-toimintaa Kirchbergin tasangolla on?", a: "Siellä toimii EU:n tuomioistuin, joka perustettiin 1952 ja jonka kotipaikka on Luxemburg. Kaupungissa ovat myös EU:n tilintarkastustuomioistuin ja Euroopan parlamentin sihteeristö." },
    ],
  },
  MDA: {
    "Anenii Noi": [
      { q: "Miksi Euroopan johtajat kokoontuivat pieneen moldovalaiskylään?", a: "Castel Mimi isännöi Bulboacassa 1. kesäkuuta 2023 Euroopan poliittisen yhteisön toista huippukokousta. Linnassa on kongressitilat ja hotelli, ja tapahtuma nosti pienen kylän hetkeksi Euroopan uutisiin." },
      { q: "Mikä on Euroopan poliittinen yhteisö?", a: "Se on vuonna 2022 perustettu foorumi, jossa EU-maat ja muut Euroopan valtiot keskustelevat yhteisistä kysymyksistä kuten turvallisuudesta ja energiasta. Ensimmäinen kokous pidettiin Prahassa ja toinen Moldovassa." },
    ],
    "Bălţi": [
      { q: "Miksi Bălția sanotaan Moldovan pohjoiseksi pääkaupungiksi?", a: "Se on pohjoisen suurin kaupunki ja tärkeä teollisuus-, kauppa- ja liikennekeskus. Rautatie- ja linja-autoyhteydet johtavat sieltä sekä Chișinăuhun että Romaniaan ja Ukrainaan." },
      { q: "Mikä on Vasile Alecsandrin kansallisteatteri?", a: "Bălțin teatteri perustettiin 1957, ja sen nimi tulee romanialaisesta runoilijasta ja näytelmäkirjailijasta Vasile Alecsandrista." },
      { q: "Mitä Pyhän Konstantinin ja Helenan katedraalin vihkiäisissä tapahtui?", a: "Kulmakivi laskettiin 1924, rakennus valmistui 1934 ja se vihittiin 2. kesäkuuta 1935. Uusromanialaisen tyylin katedraalin vihkiäisissä olivat läsnä kuningas Carol II ja hänen poikansa, tuleva kuningas Mikael I." },
    ],
    "Basarabeasca": [
      { q: "Miksi 1,2 kilometrin pituinen rataosuus on niin tärkeä?", a: "Berezyne–Basarabeasca-radasta vain 1,2 kilometriä kulkee Moldovassa, mutta se avasi ukrainalaiselle rahdille reitin Tonavan satamiin." },
      { q: "Miksi Basarabeasca-piirin väkiluku on puolittunut?", a: "Piirissä oli vuonna 1989 noin 31 600 asukasta, mutta vuonna 2025 enää noin 15 700. Piiri on pieni, 295 neliökilometriä, ja siihen kuuluvat kaupungin lisäksi yhdeksän kylää, muun muassa Abaclia, Sadaclia ja Carabetovca." },
    ],
    "Bender": [
      { q: "Mitä Benderissä hyväksyttiin huhtikuussa 1710?", a: "Kasakkahetmani Pylyp Orlyk ja kasakkaeliitti hyväksyivät 5. huhtikuuta 1710 perustuslain, joka erotti lainsäädäntö-, toimeenpano- ja tuomiovallan lähes 40 vuotta ennen Montesquieun tunnettua teosta. Ruotsin kuningas Kaarle XII vahvisti asiakirjan." },
      { q: "Missä Orlykin perustuslaki on nykyään?", a: "Ukrainankielinen alkuperäinen ja Ruotsin kuninkaan diplomi löytyivät vuonna 2008 Moskovan Venäjän muinaisten asiakirjojen valtionarkistosta. Latinankielinen versio säilytetään Ruotsin kansallisarkistossa." },
    ],
    "Briceni": [
      { q: "Mikä Lipcani on ja miksi se on tärkeä paikka?", a: "Lipcani on Briceni-piirin kaupunki Prut-joen rannalla ja rajanylityspaikka Moldovan ja Romanian välillä." },
      { q: "Mitä Briceni-kaupungin itäpuolella on?", a: "Siellä on Bricenin juutalainen hautausmaa. Juutalaisyhteisö oli aikoinaan kaupungin väestöenemmistö, ja se kärsi toisessa maailmansodassa raskaita menetyksiä." },
    ],
    "Cahul": [
      { q: "Miksi Cahulin seutu on Moldovan lämpimin?", a: "Cahulin piirin ilmasto on maan kuivin ja lämpimin: keskilämpötilat ovat 2–3 astetta muuta maata korkeammat ja sadetta tulee vain 400–550 millimetriä vuodessa." },
      { q: "Missä Moldovan suurimmat luonnonjärvet ovat?", a: "Cahulin piirissä Prutin alajuoksun tulvatasangolla ovat Beleu ja Manta, jotka luetaan Moldovan suurimpiin luonnonjärviin. Piiri ulottuu pohjoisen kukkulaseudun 230–240 metristä Tonavan tasangon 5–10 metriin." },
    ],
    "Călărași": [
      { q: "Mikä on Luostarien risti?", a: "Călărașin piirissä sijaitsevat Hîrjauca, Hîrbovăț, Frumoasa ja Răciula, neljä luostaria, jotka muodostavat ylhäältä katsottuna ristin. Niiden yhdistämä pyhiinvaellusreitti tunnetaan nimellä Luostarien risti." },
      { q: "Mitä Hîrbovățin luostarille tapahtui neuvostoaikana?", a: "Bojaari Constantin Carpuzin 1730 perustama luostari toimi vuoteen 1962, jolloin neuvostoviranomaiset sulkivat sen. Ortodoksinen kirkko sai sen takaisin vuonna 1992." },
      { q: "Mistä Călărași-nimi tulee?", a: "Sana călărași tarkoitti historiallisesti ratsumiehiä. Paikallisen legendan mukaan Stefan Suuri määräsi ratsurykmentin vartioimaan seutua ottomaaneja vastaan." },
    ],
    "Camenca": [
      { q: "Ketkä Camencassa asuvat?", a: "Vuoden 2004 laskennassa moldovalaisia oli 51,3 %, ukrainalaisia 33,7 % ja venäläisiä 12,6 %. Pienempiä ryhmiä olivat muun muassa valkovenäläiset, puolalaiset, bulgarialaiset, gagauzit, saksalaiset, armenialaiset ja romanit." },
      { q: "Mitä Camencan juutalaisyhteisölle tapahtui?", a: "Vuonna 1939 kaupungissa asui 1 283 juutalaista, 17,4 % väestöstä. Kun Romanian joukot saapuivat heinäkuussa 1941, kaupungissa ja sen ympäristössä surmattiin yli tuhat juutalaista." },
    ],
    "Cantemir": [
      { q: "Miksi Cantemirin piirissä on bulgarialaisia kyliä?", a: "Esimerkiksi Stoianovcan kylän perustivat vuonna 1902 Bessarabian bulgarialaiset, jotka muuttivat sinne muun muassa Cortenin, Ceadîr-Lungan ja Valea Perjein kylistä. Kylässä asuu edelleen enimmäkseen bulgarialaisia." },
      { q: "Mikä joki kulkee Cantemirin piirin läpi?", a: "Piirin pääjoki on Prut, joka virtaa sen länsiosassa ja on samalla Moldovan ja Romanian välinen raja." },
      { q: "Mitä Cantemirin piirissä viljellään?", a: "Maatalous hallitsee: noin 57 prosenttia alasta on viljelyssä. Pääkasveja ovat vilja, auringonkukka, rypsi ja soija, ja viinirypäleitä kasvatetaan noin 6,5 prosentilla piirin maasta." },
    ],
    "Causeni": [
      { q: "Kuka maalasi Căușenin kirkon seinät?", a: "Sisäseinät maalasivat vuonna 1763 valakialaiset taiteilijat Radu ja Voicu Stanciul. Kreikankielinen kirjoitus kirkossa kertoo työn ajankohdan, ja tyylissä yhdistyvät bysanttilainen ja romanialainen perinne." },
      { q: "Miksi kirkko on niin matala?", a: "Paikallisen legendan mukaan tataarit sallivat kirkon rakentamisen vain, jos se ei olisi keihäällä varustetun ratsumiehen korkeampi. Kyseessä on legenda, ei todistettu tosiasia." },
      { q: "Mitä kirkolle tapahtui neuvostoaikana?", a: "Rakennus muutettiin varastoksi ja hedelmien savustus- ja kuivauslaitokseksi, mikä vaurioitti maalauksia. Suojelukohteeksi se julistettiin vuonna 1983." },
    ],
    "Chişinău": [
      { q: "Mistä Chișinăun nimi tulee?", a: "Yhden selityksen mukaan nimi tulee vanhasta romanian sanasta chișla, lähde, ja sanasta nouă, uusi. Selitys on kuitenkin vain yksi tulkinta." },
      { q: "Mikä on Klassikkojen kuja?", a: "Se on Ștefan cel Mare -puiston reitti, jonka peruskivi muurattiin vuonna 1958. Alussa siinä oli 12 pronssista rintakuvaa; nykyään kirjailijoiden ja muiden merkkihenkilöiden rintakuvia on noin 29." },
      { q: "Milloin Valea Morilor -puisto perustettiin?", a: "Puisto perustettiin vuonna 1952. Sen keskellä on suuri järvi, jota kiertää kävelyreitti." },
    ],
    "Cimişlia": [
      { q: "Mikä joki virtaa Cimișlian läpi?", a: "Cogâlnic, piirin pääjoki, on 183 kilometriä pitkä. Se virtaa Cimișlian kautta ja laskee lopulta Sasyk-järveen Ukrainan puolella." },
      { q: "Mitä Cimișlian seudulla viljellään ja tuotetaan?", a: "Maatalousmaata on noin 60 prosenttia piirin alasta. Alueella tuotetaan lihaa, maitoa, hedelmiä ja viljaa, ja viinintuotanto on merkittävä osa taloutta." },
    ],
    "Comrat": [
      { q: "Mistä Comratin nimi tulee?", a: "Nimen arvellaan tulevan turkkilaisesta sanaparista kömür at, musta hevonen. Toisen selityksen mukaan se viittaa alueelle asettuneisiin konrat-nogaitatarilaisiin heimoihin. Tarkkaa alkuperää ei tiedetä." },
      { q: "Mikä oli Comratin tasavalta vuonna 1906?", a: "Talonpoikaislevottomuuksien aikana sosialistivallankumouksellinen Andrei Gălățeanu julisti Comratissa itsehallinnollisen, mutta ei itsenäisen, tasavallan. Se kesti vain noin viisi päivää, ja Gălățeanu karkotettiin Siperiaan." },
      { q: "Mikä on Hıdırlez ja miten sitä vietetään Gagauziassa?", a: "Hıdırlez on kevään tulon juhla, jota vietetään 5.–6. toukokuuta. Perinteen mukaan silloin uhrataan karitsa tai kukko, jonka liha keitetään bulgurin kanssa: puolet jaetaan köyhille tai naapureille ja puolet syödään perheen kesken." },
    ],
    "Criuleni": [
      { q: "Mikä oli Criulenin ensimmäinen maininta?", a: "Paikka mainitaan ensimmäisen kerran vuonna 1607 Moldavian ruhtinas Mihail Movilăn asiakirjassa nimellä Criveni. Nykyinen nimi on kehittynyt siitä." },
      { q: "Kuka kuuluisa shakkimestari on syntynyt Criulenissä?", a: "Suurmestari Viktor Gavrikov syntyi Criulenissä 29. heinäkuuta 1957. Hän jakoi Neuvostoliiton mestaruuden vuonna 1985 ja voitti Sveitsin mestaruuden vuonna 1996. Hän kuoli vuonna 2016." },
    ],
    "Donduseni": [
      { q: "Mitä nimi Dondoșani-Gară tarkoitti?", a: "Nimen loppuosa Gară tarkoittaa romaniaksi asemaa. Paikka oli siis alun perin Dondoșanin asema, jonka ympärille asutus kasvoi rautatien mukana." },
      { q: "Kuka perusti Țaulin puiston kartanon ympärille?", a: "Puiston perusti Pommerin suku noin vuonna 1900, ja maisema-arkkitehtina toimi insinööri Ipolit Vladislavski-Padalka. Puisto on 46,2 hehtaarin kokoinen, ja siellä kasvaa lehti- ja havupuita eri puolilta maailmaa." },
    ],
    "Drochia": [
      { q: "Mikä lintu on dropie?", a: "Dropie on isotrappi, yksi Euroopan painavimmista lentävistä linnuista. Drochian nimen kerrotaan tulevan tästä paikallisesta linnusta." },
      { q: "Millainen on Drochian piirin maisema?", a: "Piirin eteläosassa on Bălțin arojen tasankoa ja pohjoisessa Moldovan ylängön jäänteitä. Pinta-alaa on noin tuhat neliökilometriä, ja vesistöinä ovat Răut ja sen sivujoet, kuten Cubolta." },
    ],
    "Edineţ": [
      { q: "Mikä Cupcini on ja miksi sillä on ollut toinenkin nimi?", a: "Cupcini on Edineţin piirin toinen kaupunki, pikkukaupunki Ciuhur-joen laaksossa. Neuvostoaikana, vuosina 1958–1990, sitä kutsuttiin nimellä Kalininsk." },
      { q: "Mistä Edineţin nimi on peräisin ja milloin se mainitaan ensi kerran?", a: "Vuonna 1431 Moldavian ruhtinas Aleksanteri Hyvä vahvisti bojaari Cupcicin maat, ja asiakirjan kylien joukossa esiintyy Edineţin edeltäjä, jota kutsuttiin nimellä Vedinţi." },
    ],
    "Făleşti": [
      { q: "Mikä on Moldovan kaikkien aikojen kuumin mitattu lukema ja missä se mitattiin?", a: "Fălestissä mitattiin 7. elokuuta 2012 peräti 42,4 astetta, mikä on Moldovan korkein koskaan rekisteröity lämpötila." },
      { q: "Kuka oli Lazăr Dubinovschi, jonka mukaan museo on nimetty?", a: "Dubinovschi (1910–1982) oli Fălestissä syntynyt kuvanveistäjä, joka opiskeli Bukarestin taideakatemiassa. Museolle hän lahjoitti 13 veistostaan vuonna 1979." },
    ],
    "Floreşti": [
      { q: "Mikä Răut on ja miksi se on Moldovalle tärkeä?", a: "Răut on 286 kilometriä pitkä joki, joka on Moldovan pisin kokonaan maan sisällä virtaava joki ja Dnestrin suurin sivujoki. Se kulkee Bălţin, Floreştin ja Orheiin kaupunkien kautta." },
      { q: "Ketkä Moldovan presidenteistä ovat kotoisin Floreştin piiristä?", a: "Petru Lucinschi syntyi Rădulenii Vechin kylässä ja Mircea Snegur Trifăneştin kylässä, molemmat nykyisessä Floreştin piirissä." },
    ],
    "Glodeni": [
      { q: "Mitä Glodenin pelloilla kasvaa?", a: "Piirin maasta noin kolme neljäsosaa on maatalouskäytössä. Tärkeimpiä viljelykasveja ovat auringonkukka, sokerijuurikas ja tupakka." },
      { q: "Mikä on Glodenin piirin vanhin asiakirjoihin merkitty asuinpaikka?", a: "Cobanin kylä, joka mainitaan asiakirjoissa jo vuonna 1374. Se sijaitsee Prutin lähellä, Pădurea Domnească -suojelualueen kupeessa." },
    ],
    "Grigoriopol": [
      { q: "Mistä Grigoriopolin nimi tulee?", a: "Nimen loppuosa polis tarkoittaa kaupunkia, ja alkuosa viittaa Armenian kirkon perustajaan, pyhään Gregorius Valistajaan." },
      { q: "Mistä armenialaiset tulivat Grigoriopoliin?", a: "Lähteiden mukaan asutus koostui Kiliasta, Cetatea Albăsta ja muualta Mustanmeren rannikolta tulleista armenialaisista. Kaupunki perustettiin vuonna 1792 Dnestrin kauppapaikaksi." },
    ],
    "Hîncesti": [
      { q: "Mikä Petrocub on ja miksi se on tehnyt Hînceştin tunnetuksi?", a: "FC Petrocub Hînceşti voitti Moldovan Super Liga -mestaruuden 18. toukokuuta 2024, kun se voitti Zimbru Chişinăun 4–1." },
      { q: "Mitä Manuc Beille nimetyssä kartanossa on nykyään?", a: "Kartanokompleksissa toimii historia- ja etnografiamuseo, joka perustettiin 1979. Rakennukset restauroitiin 2014–2015, ja kompleksi avattiin uudelleen joulukuussa 2015." },
    ],
    "Ialoveni": [
      { q: "Miksi Surucenin luostarin kirkko on vaaleanpunainen?", a: "Sen seinät on verhoiltu vaaleanpunaisella armenialaisella tuffilla. Luostari perustettiin 1785, kivikirkko rakennettiin 1825–1832, ja luostari palautettiin uskovaisille 1991." },
      { q: "Miksi Ialovenin väkiluku kasvaa, vaikka monessa pikkukaupungissa se laskee?", a: "Kaupunki on aivan pääkaupungin vieressä, ja Chişinăun läheisyys houkuttelee asukkaita. Vuosien 2014 ja 2024 välillä väkiluku kasvoi 12 515:stä 14 665:een." },
    ],
    "Leova": [
      { q: "Kuka oli Idel Ianchelevici ja mikä yhteys hänellä oli Leovaan?", a: "Ianchelevici syntyi Leovassa 1909, muutti Belgiaan 1920-luvun lopulla ja asettui 1950 Ranskaan, jossa hän kuoli 1994. Hänestä tuli kuvanveistäjä ja Romanian akatemian ulkomainen kunniajäsen vuonna 1992." },
      { q: "Mikä on Lebăda albă?", a: "Se on noin 30 hehtaarin vesiekosysteemialue Leovan kaupungissa, jonka nimi tarkoittaa Valkoista joutsenta. Alue on suojeltu luontokohde kaupungin sisällä." },
    ],
    "Nisporeni": [
      { q: "Miksi Vărzărești'n luostaria sanotaan alueen vanhimmaksi?", a: "Sen ensimmäinen asiakirjamaininta on vuodelta 1420, kun ruhtinas Aleksanteri Hyvän läänityskirja vahvistaa erään maa-alueen rajat luostarin maiden kanssa. Sitä pidetään vanhimpana luostarina Prutin ja Dnestrin välisellä alueella." },
      { q: "Mitä Codru tarkoittaa viininviljelijälle?", a: "Codru on Moldovan suurin viinialue, tunnettu raikkaista, kukkaisista valkoviineistä kuten chardonnaysta, rieslingistä ja sauvignon blancista. Nisporenin piirissä viinitarhoja on noin 6 100 hehtaaria." },
    ],
    "Ocniţa": [
      { q: "Mikä on \"Kolmenkymmenenkolmen kahlaamon\" suojelualue?", a: "La 33 de Vaduri on Chisărău-joen laaksossa Naslavcean lähellä sijaitseva maisemansuojelualue. Sen tunnetaan olevan tasavallan pohjoisin ja siellä on vaaleanpunaisesta mustaan vaihtelevia piikivikerrostumia sekä vanhojen vesimyllyjen kahlaamoita." },
      { q: "Miksi Clocușnan pikkukylässä on elokuvamuseo?", a: "Siellä syntyi 6.11.1936 ohjaaja Emil Loteanu, jonka elokuvat Lăutarii ja Tabor ukhodit v nebo saivat kansainvälistä huomiota. Museo avattiin 2006, hänen 70-vuotispäivänään." },
    ],
    "Orhei": [
      { q: "Mitä Orheiul Vechin kalliolla oli 1300-luvulla?", a: "1300-luvun alkupuoliskolla Kultaisen Ordan johtajat perustivat sinne Şehr al-Jedidin, \"Uuden kaupungin\", jossa oli moskeija, karavaanisaarai ja kolme kylpylää. Tutkijat ovat kartoittaneet yli 300 rakennetta, ja kaupunki jäi asukkaistaan tyhjäksi 1300-luvun lopulla." },
      { q: "Miksi Curchin luostari avattiin uudelleen vasta vuonna 2005?", a: "Neuvostoaikana sen tiloissa toimi psykiatrinen sairaala, ja rakennukset vaativat sen jälkeen mittavan korjauksen. Luostarin kirkon kupolin kerrotaan olevan Moldovan korkein." },
    ],
    "Rezina": [
      { q: "Mikä Țipovan luolaluostari on?", a: "Kallioon hakattu luolaluostari sijaitsee korkealla Dnestrin yläpuolella. Lähteet ajoittavat luostarin 1000–1100-luvuille." },
      { q: "Kuka perusti Saharnan luostarin?", a: "Munkki Vartolomeu Ciungulin mainitaan perustaneen Pyhän Kolminaisuuden luostarin vuonna 1776 kolmen kukkulan juurelle. Luostari säilyttää autuaan Macarien pyhäinjäännöksiä." },
    ],
    "Rîşcani": [
      { q: "Mitä Duruitoarea Vechen luolasta on löytynyt?", a: "Kolmiosaisesta luolasta on kaivettu esiin biisonin, sarvikuonon ja jalohirven luita, työkaluja, koruja sekä mammutinluusta ja poron hampaista tehtyjä riipuksia. Vanhimman kerroksen arvioidaan olevan kymmeniä tuhansia vuosia vanha." },
      { q: "Paljonko sähköä Costești–Stâncan pato tuottaa?", a: "Voimalan yhteisteho on 32 megawattia, josta 16 megawattia kuuluu Moldovalle ja 16 Romanialle." },
    ],
    "Sîngerei": [
      { q: "Voiko Răut-jokea kulkea veneellä?", a: "Joki on 286 kilometriä pitkä, ja sen valuma-alue on noin 7 760 neliökilometriä. Se oli yleensä kulkukelpoinen aina 1700–1800-luvuille asti, mutta nykyään sillä liikkuu vain pieniä huviveneitä." },
      { q: "Mikä on Bălțin aro?", a: "Se on Pohjois-Moldovan laaja, pehmeästi kumpuileva tasanko, jonka mustamultainen maaperä on erittäin hedelmällistä. Sîngerein piirissä sen korkeimmat kohdat ovat 190–240 metrissä." },
    ],
    "Şoldăneşti": [
      { q: "Mikä Vadul-Rașcovin juutalaishautausmaa on?", a: "Kukkulan rinteellä Dnestrin rannan tuntumassa oleva hautausmaa on yli 300 vuotta vanha. Sen kivet on veistetty paikallisesta kivestä, ja sitä pidetään yhtenä Moldovan suurimmista juutalaishautausmaista." },
      { q: "Kuka oli Dumitru Matcovschi?", a: "Matcovschi (1939–2013) oli runoilija ja näytelmäkirjailija, jonka talomuseo on Vadul-Rașcovin kylässä Dnestrin rannalla." },
    ],
    "Soroca": [
      { q: "Mikä on Sorocan romanikukkula?", a: "Kaupungin rinteellä kohoaa romaniyhteisön ylellisiä taloja, joissa yhdistyvät itämaiset, barokkiset ja klassiset tyylit. Kauempaa katsottuna kukkula näyttää satukaupungilta." },
      { q: "Mikä on Sorocan Kiitollisuuden kynttilä?", a: "Kynttilän muotoinen, noin 30 metrin korkuinen muistomerkki ja kappeli avattiin 2004. Se on omistettu tuntemattomille kulttuurin säilyttäjille, ja idean esitti kirjailija Ion Druță." },
    ],
    "Ștefan Vodă": [
      { q: "Mikä Ștefan Vodă -kaupungin nimi oli ennen?", a: "Kaupunki tunnettiin ensin nimellä Chizil ja neuvostoaikana nimellä Suvorovo. Nykyinen nimi, joka viittaa Moldovan ruhtinaaseen Tapani Suureen, otettiin käyttöön 22. toukokuuta 1990." },
      { q: "Miksi Palancan rajanylityspaikka on Ukrainan puolella, vaikka kylä on Moldovassa?", a: "Moldova ja Ukraina sopivat maa-alueiden vaihdosta: Moldova luovutti Ukrainalle noin 7,7 kilometrin pituisen Odesa–Reni-tien alla olevan maan, ja sai vastineeksi pienen Tonavan rantatontin Giurgiulești'ssa, jonne se halusi satamansa." },
    ],
    "Stîngă Nistrului": [
      { q: "Miten Cocierin ja Molovata Nouăn kylistä pääsee Nistrun toiselle puolelle?", a: "Molovatan lautalla. Sen varassa on noin kymmenen kylää ja noin 10 000 asukasta Cocierin ylätasangolla." },
      { q: "Mikä tekee Dubăsarin piiristä erikoisen Moldovan kartalla?", a: "Se on Moldovan ainoa piiri, jossa ei ole yhtään kaupunkia: kaikki asutukset ovat kyliä. Suurimpia ovat Cocieri ja Coșnița, joista jälkimmäisessä asui väestölaskennan mukaan runsaat 5 000 ihmistä." },
    ],
    "Străşeni": [
      { q: "Kuka lepää Căprianan luostarin kirkossa?", a: "Metropoliitta Gavriil Bănulescu-Bodoni, Bessarabian arkkipiispakunnan ensimmäinen johtaja vuodesta 1814. Hän kuoli 1821 ja haudattiin Căprianaan, jonka entisöintiin hän oli osallistunut." },
      { q: "Mistä Străşenin nimi tulee?", a: "Erään selityksen mukaan nimi juontuu romanian sanasta strașnic, joka tarkoittaa pelottavaa tai kauheaa, koska seutu oli ennen tiheän metsän peitossa. Nimen alkuperästä kerrotaan kuitenkin useampia tarinoita." },
    ],
    "Taraclia": [
      { q: "Mitä Taraclian nimi tarkoittaa?", a: "Nimen uskotaan tulevan nogaitataarien Tarak-kylästä, jonka nimi tarkoittaa harjua tai kampaa, tai paikallisesta Tarakly-suvusta. Varmaa selitystä ei ole." },
      { q: "Kuinka moni piirin oppilas opiskelee bulgariaa?", a: "Noin 3 000 oppilasta eli noin 80 prosenttia piirin oppilaista opiskelee bulgariaa. Opetusta annetaan kymmenessä koulussa ja kymmenessä päiväkodissa." },
    ],
    "Teleneşti": [
      { q: "Mitä Hora Sânzienelor tarkoittaa?", a: "Se on Teleneștin perinnefestivaali, jossa esiintyy kansantanssiryhmiä Moldovasta ja Romaniasta ja jossa nähdään käsitöitä ja perinneruokia. Romanialaisessa kansanperinteessä sânziene ovat juhannuksen aikaan liittyviä keijuhahmoja, ja samaa nimeä kantavat myös keltaiset kesäkukat." },
      { q: "Mistä Verejenin kylän nimi tulee?", a: "Kansantarun mukaan nimi tulee parantaja Verasta. Kylä mainitaan asiakirjoissa 1627–1628, kun maata annettiin Istrățel-nimiselle verejeniläiselle, ja sen kivikirkko valmistui 1901." },
      { q: "Miksi Teleneștin piirissä on niin paljon lampia?", a: "Piirissä on 99 vesialuetta, joiden yhteispinta-ala on noin 1 350 hehtaaria. Niitä käytetään kasteluun, virkistykseen ja kalanviljelyyn, ja suuria kalatiloja on Verejenissä, Mândreștissä ja Ghilicenissä." },
    ],
    "Transnistria": [
      { q: "Mistä Tiraspolin nimi tulee?", a: "Nimi yhdistää kreikan sanat Tyras, Nistrun antiikin aikainen nimi, ja polis eli kaupunki. Se tarkoittaa siis suunnilleen Nistrun kaupunkia." },
      { q: "Miksi Tiraspolin jalkapalloseura Sheriff on tunnettu Euroopassa?", a: "Sheriff on voittanut Moldovan mestaruuden lukuisia kertoja, ja syksyllä 2021 se yllätti voittamalla Real Madridin 2–1 Mestarien liigassa kotikentällään Tiraspolissa." },
    ],
    "Ungheni": [
      { q: "Mikä on Plaiul Fagului?", a: "Rădenii Vechin kylän luona sijaitseva metsäsuojelualue, joka perustettiin 12. maaliskuuta 1992 ja kattaa noin 5 642 hehtaaria Codrun metsää. Kuusi kasvilajia tunnetaan Moldovassa vain sieltä." },
      { q: "Mikä on Pietari I:n pöytä Zagarancean Semenin kylässä?", a: "Paikallisen perimätiedon mukaan Semenissä ruhtinas Dimitrie Cantemir tapasi tsaari Pietari I:n, ja bojaarit kokoontuivat kaiverretun pöydän ääreen maljoja nostamaan. Zagarancean kylässä on lisäksi 2016 avattu ulkoilmamuseo." },
    ],
  },
  BLR: {
    "Brest": [
      { q: "Miksi junan pyörästöt vaihdetaan Brestissä?", a: "Valko-Venäjällä ja sen itäpuolella raideleveys on 1520 millimetriä, Puolassa ja muualla Euroopassa 1435. Brestissä vaunut nostetaan ilmaan ja telit vaihdetaan sopiviksi, joten juna voi jatkaa rajan yli." },
      { q: "Mikä on Kamjanjecin torni?", a: "Se on punatiilinen vartiotorni, joka rakennettiin 1200-luvun lopulla. Torni on noin 30 metriä korkea ja sen seinät ovat useita metrejä paksut, ja se on harvoja jäljellä olevia tällaisia torneja maassa." },
      { q: "Miksi Pinskin jesuiittakollegio näyttää melkein linnalta?", a: "Kollegio rakennettiin 1600-luvulla muinaisen linnakkeen paikalle, ja sen seinät ovat paksut. Silti se oli koulu: siellä opetettiin kieliä, logiikkaa, historiaa ja fysiikkaa." },
    ],
    "Gomel": [
      { q: "Miksi Vetkan museossa on niin paljon vanhoja käsinkirjoitettuja kirjoja?", a: "Vetka oli vanhauskoisten keskus, eli niiden uskovien, jotka pitivät kiinni vanhoista kirkollisista tavoista ja teksteistä. Museon kokoelmissa on 1500-luvun ja 1800-luvun alun välisiä käsikirjoituksia ja evankeliumeja." },
      { q: "Kuka oli Kirill Turaulainen?", a: "Kirill (1100-luvulla elänyt) oli Turaun piispa, joka tunnetaan yhtenä varhaisimmista itäslaavilaisista teologeista, runoilijoista ja saarnaajista. Hänet on kanonisoitu, ja Turaun linnakukkulalla on hänen muistomerkkinsä." },
      { q: "Mitä tarinoita Turaun kivirististä kerrotaan?", a: "Paikallisen legendan mukaan kymmenkunta ristiä ajelehti Kiovasta joen vastavirtaan Turaun rantaan, jossa ne nostettiin pystyyn." },
    ],
    "Grodno": [
      { q: "Miksi Grodnon Uusi linna mainitaan historiankirjoissa?", a: "Siellä kokoontui vuonna 1793 Puola-Liettuan viimeinen valtiopäivä, venäläisen sotaväen läsnä ollessa. Valtiopäivä hyväksyi Puolan toisen jaon." },
      { q: "Mikä on Grodnon vanhin säilynyt rakennus?", a: "Kalozan kirkko, joka valmistui ennen vuotta 1183 Njemenin jyrkälle rannalle. Sen seiniin on upotettu sinisiä, vihreitä ja punaisia kiviä. Etelämuuri romahti 1853 joen puolelta, ja korjaustöissä löytyi 1100-luvun freskojen jäänteitä." },
      { q: "Miksi Navahrudakin linnamäen vieressä on kumpu?", a: "Kumpu on runoilija Adam Mickiewiczin muistoksi 1900-luvun alkupuolella kasattu 'kuolemattomuuden kumpu'. Mickiewicz syntyi vuonna 1798 Navahrudakissa tai sen läheisellä sukutilalla." },
    ],
    "Mogilev": [
      { q: "Miksi Mogilevin raatihuone on uusi, vaikka näyttää vanhalta?", a: "Alkuperäinen kivinen raatihuone rakennettiin 1600-luvun lopulla, ja sen kahdeksankulmainen torni nousi noin 46 metriin. Nykyinen rakennus on rekonstruktio, joka avattiin 2008 samalle paikalle, ja siellä toimii Mogilevin historian museo." },
      { q: "Mikä on Babruiskin linnoitus?", a: "Tsaari Aleksanteri I määräsi rakennustyöt aloitettavaksi 1810, ja linnoitus valmistui 1836 Berezinan ja Babruikan yhtymäkohtaan. Keskellä oli linnake bastioneineen, ja ympärillä vesikanavia." },
    ],
    "Minsk": [
      { q: "Mikä on Dudutki?", a: "Dudutki on noin 40 kilometrin päässä Minskistä Ptitš-joen rannalla sijaitseva ulkoilmamuseo, jossa esitellään perinteisiä käsitöitä: puusepäntöitä, saviastioita, metallityötä ja juustonvalmistusta." },
      { q: "Miksi Valožynin kaupunki on tunnettu?", a: "Siellä perusti rabbi Chaim Volozhiner 1803 Etz Chaim -jeshivan. Sitä pidetään ensimmäisenä nykyaikaisena jeshivana, ja 1800-luvulla se oli Itä-Euroopan tärkeimpiä laitoksiaan." },
      { q: "Miksi Zaslauljen Kirkastumisen kirkko on ollut kolmen kirkkokunnan käytössä?", a: "Kirkko rakennettiin 1500-luvun lopulla kalvinistiseksi seurakuntakirkoksi. Vuonna 1626 se vihittiin katoliseksi Pyhän Mikaelin kirkoksi, ja vuoden 1839 jälkeen se muuttui ortodoksiseksi Kirkastumisen kirkoksi." },
    ],
    "City of Minsk": [
      { q: "Mikä on Kyynelten saari?", a: "Se on pieni saari Svislatš-joessa Troitskoje-esikaupungin vieressä, jonne johtaa kaarisilta. Siellä on Afganistanin sodassa palvelleiden valkovenäläisten muistomerkki, joka paljastettiin 1996 ja jota kutsutaan myös Rohkeuden ja surun saareksi." },
      { q: "Milloin Minskin metro avattiin?", a: "Rakentaminen alkoi 16. kesäkuuta 1977, ja liikenne käynnistyi 30. kesäkuuta 1984." },
    ],
    "Vitebsk": [
      { q: "Mikä on Polatskin Pyhän Sofian katedraali?", a: "Se rakennettiin vuosina 1044–1066 Polatskin ruhtinas Vseslavin aikana, ja 1700-luvun puolivälissä se uudistettiin vilnalaisbarokkityyliin. Nykyään se toimii museon osana ja konserttisalina, jossa on urut." },
      { q: "Mikä on Eufrosynen risti?", a: "Polatskin Eufrosyne (1100-luvulla elänyt) lahjoitti kuusihaaraisen kultaisen ristin, jota koristivat emalit ja jalokivet, Vapahtajan kirkolle 1161. Alkuperäinen risti katosi toisen maailmansodan aikana." },
      { q: "Miksi Francysk Skarynaa pidetään ensimmäisenä valkovenäläisenä kirjapainajana?", a: "Polatskissa vuoden 1490 tienoilla syntynyt Skaryna painoi Prahassa Raamatun vanhalla valkovenäjän kirjakielellä 1517. Häntä pidetään maan kirjapainotaidon uranuurtajana." },
    ],
  },
  SVK: {
    "Banskobystrický": [
      { q: "Miksi Banská Štiavnican ympäristössä on kymmeniä pieniä tekojärviä keskellä vuoria?", a: "Ne ovat hopeakaivosten vesivarastoja, tajcheja: huippuaikana niitä oli noin 60, ja yli 100 km kanavia ja tunneleita johti veden kaivosten vesipyörille. Nykyään 24 on jäljellä uimapaikkoina, ja järjestelmä kuuluu Unescon perintökohteeseen." },
      { q: "Mikä on fujara, ja miksi sitä soitetaan vain Keski-Slovakiassa?", a: "Fujara on 160–200 cm pitkä paimenten huilu, jossa on vain kolme sormireikää: korkeat sävelet syntyvät ylipuhaltamalla. Se tunnetaan Podpoľanien seudulta, ja syvä, mumiseva soundi on Unescon aineettoman perinnön luettelossa." },
      { q: "Onko totta, että Kremnicassa lyödään yhä rahaa?", a: "On: Kremnican rahapaja sai kuninkaalliset etuoikeutensa vuonna 1328 ja on yksi maailman vanhimmista yhä toimivista rahapajoista." },
    ],
    "Bratislavský": [
      { q: "Miksi Bratislavan Sininen kirkko on kokonaan sininen, jopa katto?", a: "Kirkon suunnitteli Ödön Lechner, ja se vihittiin käyttöön 1913 unkarilaisen jugendin tyyliin. Ulko- ja sisäseinät on maalattu vaaleansinisiksi, koristeena on sinistä majolikaa ja katto on sinistä lasitettua keramiikkaa." },
      { q: "Mikä Petržalka on, ja miksi siitä puhutaan Bratislavassa jatkuvasti?", a: "Petržalka on Tonavan eteläpuolella sijaitseva paneelitalokaupunginosa, joka on yksi Keski-Euroopan suurimmista. Rakennustyöt alkoivat 1970-luvulla, ensimmäinen talo valmistui 1977, ja nykyään siellä asuu yli 100 000 ihmistä." },
      { q: "Miksi Bratislavan Pyhän Martinin katedraalin huipulla on kultainen kruunu?", a: "Se on noin 300 kilon painoinen kullattu jäljennös Unkarin kuninkaankruunusta, asetettu torniin 1847. Katedraalissa kruunattiin vuosina 1563–1830 Unkarin kuninkaita ja kuningattaria." },
    ],
    "Košický": [
      { q: "Missä on Euroopan vanhin maraton, ja milloin se juostiin ensimmäisen kerran?", a: "Košicen rauhanmaraton juostiin ensimmäisen kerran lokakuussa 1924, ja sitä pidetään Euroopan vanhimpana maratonina. Ensimmäisen voiton vei paikallinen juoksija Karol Halla." },
      { q: "Onko totta, että Slovakiassa on kylmävesigeysir?", a: "On: Herľanyn geysir purkautuu noin 34–36 tunnin välein, suihku nousee parhaimmillaan noin 20 metriin ja kestää noin 25 minuuttia. Vesi on vain 14–18-asteista, ja se sai alkunsa 1870-luvulla tehdyistä syväporauksista." },
      { q: "Miksi Dobšinán luolassa on jäätä kesälläkin?", a: "Dobšinán jääluolaan tulvii kylmää ilmaa talvella, ja se jää loukkuun: jäätä on arviolta noin 110 000 kuutiometriä. Luola löytyi 1870, ja 1887 se valaistiin sähköllä ensimmäisten joukossa maailmassa." },
    ],
    "Nitriansky": [
      { q: "Miksi Nitrassa valmistetaan Land Rovereita?", a: "Jaguar Land Rover avasi Nitrassa lokakuussa 2018 noin 1,4 miljardin euron tehtaan, jonka vuosikapasiteetti on 150 000 autoa. Se oli ensimmäinen brittiläisen autovalmistajan tehdas Slovakiassa." },
      { q: "Mikä Komárnon linnoitus on, ja miksi se on niin iso?", a: "Komárnon linnoitusjärjestelmä on Keski-Euroopan laajimpia: Vanha linnake alkoi nousta 1546, Uusi linnake tuli 1600-luvulla ja Napoleonin sotien aikaan järjestelmää laajennettiin niin, että siihen piti mahtua suuri sotajoukko." },
      { q: "Onko Slovakiassa valkoisia lipizzanereita, ja missä niitä kasvatetaan?", a: "On, Topoľčiankyn kansallisessa ori- ja tammatallissa, joka perustettiin 1921. Siellä kasvatetaan useita hevosrotuja, muun muassa lipizzanereita ja shagya-arabeja." },
    ],
    "Prešov": [
      { q: "Miksi Andy Warholilla on museo pienessä itäslovakialaisessa kaupungissa?", a: "Warholin vanhemmat olivat kotoisin läheisestä Mikován kylästä. Medzilaborcen Andy Warhol -nykytaidemuseo perustettiin 1. syyskuuta 1991 hänen veljensä John Warholan ja slovakialaisten kulttuurivaikuttajien aloitteesta." },
      { q: "Mikä on yksi maailman korkeimmista puisista goottilaisista alttareista?", a: "Se on Levoča Pyhän Jaakobin kirkossa: mestari Paavalin verstaan limepuusta veistämä alttari valmistui 1507–1517, ja sen korkeus on 18,62 metriä. Levoča on nykyään Unescon perintökohde Spišin linnan kanssa." },
      { q: "Miksi Spišin linna on niin valtava?", a: "Spišský hrad kohoaa travertiinikukkulalla Spišské Podhradiessa ja kattaa yli neljä hehtaaria, joten se on Keski-Euroopan suurimpia linnakomplekseja. Kohde on Unescon listalla vuodesta 1993." },
    ],
    "Trenciansky": [
      { q: "Miksi Trenčínin lentokentällä kuuluu joka kesä musiikkia?", a: "Siellä järjestetään Pohoda, Slovakian suosituin monikulttuurinen festivaali. Se alkoi 1997 yhden päivän tapahtumana kaupungin stadionilla, ja lentokentällä sitä on pidetty vuodesta 2004." },
      { q: "Kuka syntyi samassa talossa Uhrovecissa, ja miksi se on kansallismonumentti?", a: "Uhrovecin talossa syntyivät sekä slovakin kirjakielen kodifioija Ľudovít Štúr (1815) että myöhempi valtiomies Alexander Dubček (1921). Talo on Trenčínin museon hoidossa ja se julistettiin kansalliseksi kulttuurimonumentiksi 1965." },
      { q: "Mikä Čachticen linna on, ja miksi se on suojeltu luonnonsuojelualueena?", a: "Čachticen linna on kalliolla sijaitseva 1200-luvulla rakennettu raunio, jossa kreivitär Elizabeth Báthory vietti viimeiset vuotensa vankina. Linnavuoren kalkkikivirinteellä kasvaa harvinaisia kasveja, joten alue on kansallinen luonnonsuojelualue." },
    ],
    "Trnavský": [
      { q: "Onko Skalican trdelník sama asia kuin Prahan turistien trdelník?", a: "Skalický trdelník on EU:n maantieteellisesti suojattu tuote, rekisteröity joulukuussa 2007 Slovakian ensimmäisenä. Taikina kierretään puukeppi trdlon ympärille ja paistetaan hiilloksen säteilylämmössä pyörittäen. Tuloksena on ontto lieriö." },
      { q: "Miksi Piešťanyn kylpyläsaaren sillan luona seisoo mies, joka katkaisee kainalosauvaansa?", a: "Patsas on kylpylän symboli: pronssiveistos kertoo, että rikkipitoinen lieju ja kuuma lähdevesi auttavat tuki- ja liikuntaelinvaivoihin. Se seisoo Emil Belluksen suunnitteleman katetun Kolonaadisillan luona." },
      { q: "Miksi Gabčíkovon vesivoimalaitos on niin tärkeä?", a: "Gabčíkovo on suuri Tonavan pato, joka otettiin käyttöön lokakuussa 1992. Voimalassa on kahdeksan turbiinia ja yhteensä 720 megawatin teho." },
    ],
    "Žilinský": [
      { q: "Miksi Vlkolínecissa asuu enää kourallinen ihmisiä, vaikka kylä on koko ajan kunnossa?", a: "Vlkolínec Ružomberokin kupeessa on Unescon kohde vuodesta 1993: noin 45 rakennusta hirsitaloineen on säilynyt lähes ehjänä Veľká Fatran rinteellä. Vakituisia asukkaita on nykyään vain noin kolmisenkymmentä, ja kylä toimii elävänä museona." },
      { q: "Kuka oli Jánošík, ja miksi Terchovassa vietetään hänen mukaansa nimettyä festivaalia?", a: "Juraj Jánošík (1688–1713) oli Terchovassa syntynyt rosvo, josta kasvoi slovakkien kansansankari, eräänlainen paikallinen Robin Hood. Terchovassa järjestetään vuosittain hänen nimeään kantava Jánošíkove dni -kansanmusiikkifestivaali." },
      { q: "Mikä on Demänovan Vapauden luola?", a: "Demänovská jaskyňa slobody Matalan Tatran alla on yli 8 400 metrin mittainen luolaverkosto, joka on osa laajaa karstijärjestelmää. Sen naapurissa on Demänovan jääluola." },
    ],
  },
};
