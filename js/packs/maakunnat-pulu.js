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
};
