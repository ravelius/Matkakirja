/*
 * NYKYMAAKUNTIEN LUONNEHDINNAT — karttatyökalun Maakunnat-tila.
 *
 * Fablen tilaus 21.9.2026, täsmennetty samana iltana (omistajan
 * lisäys): täppä luonnehdinnan vierellä avaa pidemmän version kuvalla.
 * Rakenne per alue on siis alusta asti { lyhyt, pitka, kuva, pulu },
 * mutta VAIN `lyhyt` täytetään tässä ensimmäisessä erässä — loput
 * kentät jätetään pois (ei tyhjiä merkkijonoja), ja testi sallii sen.
 *
 *   lyhyt  — 1-2 virkettä, enintään 160 merkkiä, Livian äänellä
 *            (nykyaika, docs/tarina.md): mitä alue ON NYT, yksi
 *            konkreettinen asia, ei luetteloa, ei vertailua isoisän
 *            1873-aikaan. ERÄ 1 (tämä).
 *   pitka  — 3-5 virkettä Livian äänellä: maisema, ihmiset, yksi
 *            tarina tai erikoisuus, 1873-kytkös jos sellainen löytyy.
 *            ERÄ 2 (tuleva).
 *   kuva   — { osoite, lahde, lisenssi, tekija }, yksi Commons-kuva
 *            alueesta kuvaputken sääntöjen mukaan. ERÄ 2 (tuleva).
 *   pulu   — [{ q, a }, ...], 2-3 pöllön esikirjoitettua kysymystä
 *            vastauksineen (vastaus 2-4 virkettä), sama malli kuin
 *            Ihmisen matka -linssin pulukeskustelussa. ERÄ 3 (tuleva,
 *            oma tiedosto js/packs/maakunnat-pulu.js tai tämä sama
 *            — päätetään erän 3 yhteydessä).
 *
 * Avaimet ovat Karttasepän admin-1-datan tunnuksia TÄSMÄLLEEN
 * (docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/avaimet.md):
 * FRA/ITA/ESP Natural Earthin `region`-kenttä, GBR `geonunit`, POL/AUT
 * `name`. Tunnus EI ole sama kuin kartalle poltettu suomenkielinen
 * nimi (nimiFi) — ks. avaimet.md kummankin vierekkäin.
 */
export const MAAKUNTIEN_LUONNEHDINNAT = {
  FRA: {
    "Hauts-de-France": { lyhyt: "Lillestä pääsee junalla alle tunnissa Brysseliin ja reilussa tunnissa Lontooseen – rajat tuntuvat turhan kaukaisilta." },
    "Grand Est": { lyhyt: "Strasbourgissa istuu Euroopan parlamentti, ja kaupungin joulumarkkinat vetävät väkeä joka puolelta Eurooppaa." },
    "Provence-Alpes-Côte d'Azur": { lyhyt: "Nizzan rantabulevardilla kävelee kesällä koko Eurooppa, ja Cannesin punainen matto rullataan joka toukokuu." },
    "Auvergne-Rhône-Alpes": { lyhyt: "Lyon tunnetaan Ranskan gastronomian pääkaupunkina – täältä ei lähdetä nälkäisenä minnekään!" },
    "Nouvelle-Aquitaine": { lyhyt: "Bordeaux on viinin maailmanpääkaupunki, ja kaupungin raitiovaunut kulkevat kaduilla ilman näkyviä ilmajohtoja." },
    "Occitanie": { lyhyt: "Toulousessa kootaan jättiläismäisiä Airbus-matkustajakoneita – tehtaan vierestä näkee yhden nousevan taivaalle." },
    "Bourgogne-Franche-Comté": { lyhyt: "Comté-juusto kypsyy täällä kalkkikiviluolissa jopa kolme vuotta ennen kuin se päätyy kauppoihin." },
    "Pays de la Loire": { lyhyt: "Nantesin kaduilla kävelee mekaaninen jättiläiselefantti, jonka selkään pääsee kiipeämään ihan oikeasti." },
    "Bretagne": { lyhyt: "Bretagnessa syödään galetteja joka kulmalla – suolainen tattaripannukakku on täällä aivan arkiruokaa." },
    "Normandie": { lyhyt: "Normandiassa omenat päätyvät harvoin vain hillopurkkiin – niistä tislataan väkevää kalvadosia." },
    "Corse": { lyhyt: "Korsikalla vuoret syöksyvät suoraan mereen, ja saaren oma kieli kaikuu toreilla ranskan rinnalla." },
    "Centre-Val de Loire": { lyhyt: "Loiren laaksossa kohoaa yhä satoja linnoja, ja Chambordin katolla riittää torneja ihmeteltäväksi tunneiksi." },
    "Île-de-France": { lyhyt: "Pariisin seudulla asuu yli kaksitoista miljoonaa ihmistä, ja RER-juna vie keskustasta lentokentälle tunnissa." },
  },
  DEU: {
    "Sachsen": { lyhyt: "Leipzig sykkii nyt musiikista ja startupeista, ja kevään kirjamessut täyttävät kadut lukijoista!" },
    "Bayern": { lyhyt: "München yhdistää nykyään pikkujouluhenkisen perinteen ja huipputeknologian – BMW:n tehtaat hurisevat yhä keskustan kupeessa!" },
    "Rheinland-Pfalz": { lyhyt: "Mosel- ja Rheinjoen rinteillä viljellään yhä uskomattoman jyrkkiä viinitarhoja, joista osa vaatii köysiä työntekoon!" },
    "Saarland": { lyhyt: "Saarbrücken tuntuu yhä vähän Ranskalta – täällä syödään croissantteja ja puhutaan murteessa ranskaa sekaan!" },
    "Schleswig-Holstein": { lyhyt: "Kahden meren välissä tuulimyllyt pyörivät joka suuntaan – tuulivoima on täällä arkipäivää, ei erikoisuus!" },
    "Niedersachsen": { lyhyt: "Wolfsburgissa Volkswagenin tehdas on yhä kaupungin sydän – koko kaupunki tuntuu rakentuneen autotehtaan ympärille!" },
    "Nordrhein-Westfalen": { lyhyt: "Ruhrin alueen entiset kaivokset ovat nyt taidemuseoita ja konserttisaleja – teollisuusromantiikka vetää turisteja!" },
    "Baden-Württemberg": { lyhyt: "Stuttgartissa Mercedes-Benzin tehtaat hurisevat yhä keskustan kupeessa – autoteollisuus on täällä lähes uskonto!" },
    "Brandenburg": { lyhyt: "Potsdamin palatsit ja puistot ympäröivät Berliiniä kuin vihreä rengas – Sanssouci vetää päivämatkalaisia yhä täyteen!" },
    "Mecklenburg-Vorpommern": { lyhyt: "Itämeren rannalla on Saksan hiljaisimmat rannat – Rügenin liidukalliot vetävät kesäisin väkeä valokuvaamaan!" },
    "Bremen": { lyhyt: "Pieni Bremen elää yhä satamastaan – konttilaivat kulkevat kaupungin läpi keskellä kirkkojen ja kujien!" },
    "Hamburg": { lyhyt: "Hampurin uusin maamerkki on Elbphilharmonia – aaltoileva konserttitalo kohoaa sataman yllä ja vetää kuulijoita ympäri maailmaa!" },
    "Hessen": { lyhyt: "Frankfurtin pilvenpiirtäjät kohoavat keskellä Saksaa – täällä lyödään Euroopan keskuspankin rahapäätökset!" },
    "Thüringen": { lyhyt: "Thüringenin metsät peittävät suuren osan maakunnasta – siksi sitä kutsutaan Saksan vihreäksi sydämeksi!" },
    "Sachsen-Anhalt": { lyhyt: "Dessaussa Bauhaus-rakennukset seisovat yhä pystyssä – muotoilukoulun perintö näkyy koko kaupunkikuvassa!" },
    "Berlin": { lyhyt: "Berliinin yöelämä on legendaarista yhä – klubit, kuten Berghain, aukeavat vasta puolilta öin ja pyörivät päivään asti!" },
  },
  ITA: {
    "Piemonte": { lyhyt: "Nykyään tunnetaan Barolon ja Barbarescon viinimäistä sekä Bra-kaupungista, josta koko Slow Food -liike sai alkunsa 1980-luvulla." },
    "Lombardia": { lyhyt: "Milano on Italian muoti- ja pörssikeskus, mutta koko Po-tasanko tahkoaa yhä maan vilkkainta teollisuutta." },
    "Sicily": { lyhyt: "Etna kohoaa yhä savuten saaren yllä, ja sen tulinen tuhka pitää rinteiden appelsiiniviljelmät poikkeuksellisen antoisina." },
    "Toscana": { lyhyt: "Chianti-mäkien viinitilat ja agriturismot elävät nyt yhtä paljon matkailijoista kuin rypäleistä." },
    "Emilia-Romagna": { lyhyt: "Parman kinkku ja Modenan balsamico kypsyvät täällä yhä, mutta Maranellon tehtaalta lähtee nykyään myös Ferrari." },
    "Sardegna": { lyhyt: "Ogliastran vuoristokylät ovat yksi maailman harvoista sinisistä vyöhykkeistä, joissa ihmiset elävät poikkeuksellisen pitkään." },
    "Veneto": { lyhyt: "Venetsia kelluu turistivirrassa, mutta maaseudulla mäet täyttyvät nykyään prosecco-viinitarhoista." },
    "Apulia": { lyhyt: "Alberobellon kartiokattoiset trullit ja loputtomat oliivitarhat tekevät Apuliasta Italian nousevan matkailuosavaltion." },
    "Lazio": { lyhyt: "Rooma on yhä Italian pääkaupunki ja hallinnon sydän, ja Vatikaani vetää keskustaan miljoonia kävijöitä vuosittain." },
    "Trentino-Alto Adige": { lyhyt: "Alueella puhutaan yhä saksaa ja italiaa rinnakkain, ja laaja itsehallinto pitää Dolomiittien hiihtokeskukset kukoistavina." },
    "Calabria": { lyhyt: "Reggio Calabrian ympärillä kasvatetaan lähes koko maailman bergamottia, jota käytetään muun muassa Earl Grey -teessä." },
    "Campania": { lyhyt: "Napolista alkanut pizza elää yhä vilkkaana katukeittiöissä ja pizzerioissa savuavan Vesuviuksen juurella." },
    "Abruzzo": { lyhyt: "Abruzzon kansallispuisto suojelee nykyään Euroopan harvinaisinta karhua, Marsican ruskeakarhua, sukupuutolta." },
    "Basilicata": { lyhyt: "Matera muutti luolakaupunkinsa hotelleiksi ja gallerioiksi, ja siitä tuli 2019 Euroopan kulttuuripääkaupunki." },
    "Marche": { lyhyt: "Adrianmeren rannikkokaupungit valmistavat yhä kenkiä ja huonekaluja, jotka päätyvät kauppoihin ympäri Eurooppaa." },
    "Umbria": { lyhyt: "Assisin pyhiinvaeltajavirta jatkuu yhä, ja vihreäksi sydämeksi kutsuttu Umbria on Keski-Italian ainoa maakunta ilman merenrantaa." },
    "Friuli-Venezia Giulia": { lyhyt: "Triesten satama toimii yhä Euroopan suurimpana kahvin tuontiväylänä, vaikka alue ei kasvata papua grammaakaan." },
    "Liguria": { lyhyt: "Cinque Termen kylät ripustautuvat kallioihin turistien iloksi, ja Genovan satamasta lähtee yhä pesto maailmalle." },
    "Molise": { lyhyt: "Toiseksi pienin maakunta tyhjenee hitaasti nuorista, mutta se on yhä ylpeä siitä, ettei se ole olemassa -vitsistä." },
    "Valle d'Aosta": { lyhyt: "Kaksikielinen ranskaa ja italiaa puhuva vuoristoalue elää nykyään Mont Blancin hiihtomatkailusta ja laajasta itsehallinnostaan." },
  },
  ESP: {
    "Castilla y León": { lyhyt: "Salamancan satoja vuosia vanha yliopisto opettaa Kastilja ja Leónissa yhä samoissa keskiaikaisissa kivisaleissa." },
    "Andalucía": { lyhyt: "Andalusia on maailman suurin oliiviöljyn tuotantoalue – oliivipuiden rivit jatkuvat horisonttiin asti." },
    "Castilla-La Mancha": { lyhyt: "Consuegran kylässä pyörivät yhä oikeat tuulimyllyt, jotka tekivät La Manchan tasangosta maailmankuulun." },
    "Aragón": { lyhyt: "Aragonian Pyreneiden rinteet täyttyvät joka talvi laskettelijoista, kun alueen hiihtokeskukset avaavat ovensa." },
    "Extremadura": { lyhyt: "Harvaan asuttu Extremadura on yksi Euroopan parhaista tähtitaivaan katselupaikoista pimeiden, tähtikirkkaiden öidensä ansiosta." },
    "Cataluña": { lyhyt: "Barcelonan entiseen tehdaskortteliin syntynyt 22@-kaupunginosa on tehnyt siitä Espanjan vilkkaimman teknologiakeskuksen." },
    "Galicia": { lyhyt: "Santiago de Compostelaan saapuu yhä satoja tuhansia pyhiinvaeltajia vuosittain pitkin Camino de Santiago -reittiä." },
    "Valenciana": { lyhyt: "Valencian Tiedeteiden kaupungin valkoiset, valaan luita muistuttavat rakennukset ovat nousseet kaupungin tunnusmerkiksi." },
    "Asturias": { lyhyt: "Asturialaisissa siiderikapakoissa siideri kaadetaan yhä perinteisesti korkealta lasiin, jotta juoma saa raikkaan poreensa." },
    "Murcia": { lyhyt: "Murciaa kutsutaan Euroopan vihanneskaapiksi, sillä sen aurinkoiset pellot tuottavat hedelmiä ja vihanneksia ympäri mannerta." },
    "Foral de Navarra": { lyhyt: "Pamplonassa juostaan heinäkuussa yhä sonnien edellä San Fermín -juhlan aikana, joka tunnetaan ympäri maailman." },
    "Madrid": { lyhyt: "Madrid on kasvanut Etelä-Euroopan vilkkaimmaksi startup-keskukseksi, jonne uusia yrityksiä perustetaan joka viikko." },
    "País Vasco": { lyhyt: "Bilbaon Guggenheim-museo muutti savuisen teollisuuskaupungin maailmankuuluksi arkkitehtuuri- ja designkohteeksi." },
    "Canary Is.": { lyhyt: "Kanariansaarten kirkas ja pilvetön taivas tekee Teneriffasta ja La Palmasta maailman arvostetuimpia tähtitieteen tutkimuspaikkoja." },
    "Cantabria": { lyhyt: "Altamiran luolan kalliomaalaukset Kantabriassa tunnetaan lempinimellä esihistorian Sikstuksen kappeli." },
    "La Rioja": { lyhyt: "La Riojan Harossa heitellään kesäkuussa toisia punaviinillä Batalla del Vino -juhlassa, joka värjää koko kaupungin viininpunaiseksi." },
    "Islas Baleares": { lyhyt: "Baleaareilla peritään nykyään matkailijoilta ympäristömaksua, jolla suojellaan saarten luontoa massaturismin paineessa." },
    "Ceuta": { lyhyt: "Ceuta on Espanjan alue Pohjois-Afrikassa – yksi EU:n vain kahdesta maarajasta Afrikkaan, vartioidun raja-aidan takana." },
    "Melilla": { lyhyt: "Melillassa on Barcelonan jälkeen Espanjan toiseksi eniten modernistisia rakennuksia, vaikka kaupunki sijaitsee Pohjois-Afrikassa." },
  },
  GBR: {
    "England": { lyhyt: "Lontoossa kuulee kadulla yli 300 kieltä – kaupunki on yhä maailman vilkkaimpia rahoitus- ja kulttuurikeskuksia!" },
    "Scotland": { lyhyt: "Skotlannissa viski ei ole vain juoma vaan koko identiteetti: tislaamoja on yli sata, ja moni kylä elää niistä." },
    "Wales": { lyhyt: "Walesissa yhä useampi lapsi opiskelee kokonaan kymriksi – kieli elää uudestaan koulujen ja television kautta." },
    "Northern Ireland": { lyhyt: "Belfastin entinen telakka-alue, jossa rakennettiin Titanic, on nyt vilkas kaupunginosa museoineen ja toimistoineen." },
  },
  POL: {
    "Masovian": { lyhyt: "Varsova on nykyään vilkas pääkaupunkiseutu, jossa pilvenpiirtäjät kohoavat Kulttuuripalatsin viereen ja bisnes sykkii ympärivuorokautisesti." },
    "Greater Poland": { lyhyt: "Poznańissa messuhallit täyttyvät vuosittain, sillä kaupunki on yhä Puolan vilkkain kauppa- ja messukaupunki." },
    "Warmian-Masurian": { lyhyt: "Tuhannen järven maakunta elää purjeveneistä ja kesämökkeilijöistä, jotka täyttävät Masurian vesistöt kesäisin." },
    "West Pomeranian": { lyhyt: "Szczecin on satamakaupunki, jonka telakat ja Odra-joen suisto pitävät merenkulun yhä arjen keskiössä." },
    "Lublin": { lyhyt: "Itäinen Lublinin seutu on Puolan vihannestarha: pellot ja hedelmätarhat ulottuvat horisonttiin asti." },
    "Podlachian": { lyhyt: "Podlasiessa villi luonto voittaa: Białowieżan aarnimetsässä vaeltaa Euroopan viimeisiä visenttejä." },
    "Pomeranian": { lyhyt: "Gdańsk elää Itämeren rannasta yhä kiinni, ja vanha telakka-alue on nyt taidetta ja tapahtumia täynnä." },
    "Lower Silesian": { lyhyt: "Wrocławin vanhaakaupunkia kiertäessä kannattaa laskea pronssisia patsaskääpiöitä, niitä piiloutuu satoja kadunkulmiin." },
    "Łódź": { lyhyt: "Entiset tehdashallit ovat Łódźissa nyt ostoskeskuksia ja gallerioita, ja kaupunki tunnetaan yhä elokuvakoulustaan." },
    "Kuyavian-Pomeranian": { lyhyt: "Toruńissa leivotaan yhä perinteisiä piparkakkuja, ja Kopernikuksen syntymäkaupunki elää tiedehistoriastaan." },
    "Subcarpathian": { lyhyt: "Rzeszówin seutua kutsutaan Lentolaaksoksi, sillä ilmailuteollisuus työllistää alueella tuhansia." },
    "Lesser Poland": { lyhyt: "Kraków on Puolan turistimagneetti, jonka vanhakaupunki ja Wawel täyttyvät kävijöistä ympäri vuoden." },
    "Lubusz": { lyhyt: "Zielona Góra on Puolan viinialuetta, ja rajaseutu Saksaan näkyy arjessa ja kaupassa." },
    "Silesian": { lyhyt: "Katowicen ympäristössä hiilikaivokset vaihtuvat hiljalleen kulttuuriin, kuten NOSPR-konserttitaloon." },
    "Świętokrzyskie": { lyhyt: "Kielcen seudulla kohoavat Pyhänristinvuoret, Puolan vanhimmat ja kuluneimmat tunturit." },
    "Opole": { lyhyt: "Opole on Puolan vähäväkisin voivodikunta, hiljainen seutu jossa saksankielinen vähemmistö on yhä näkyvä." },
  },
  AUT: {
    "Niederösterreich": { lyhyt: "Wienin ympärillä leviää Ala-Itävalta, jonka Wachaun jokilaakso on täynnä viinitarhoja aina Tonavan rantaan asti." },
    "Steiermark": { lyhyt: "Steiermarkia kutsutaan Itävallan vihreäksi sydämeksi – täällä kurpitsansiemenöljy on lähes joka ruoan mauste." },
    "Tirol": { lyhyt: "Tirolissa vuoret määräävät arjen: Innsbruckista pääsee hiihtämään tunnissa, ja moni asukas tekee sen töiden jälkeen." },
    "Oberösterreich": { lyhyt: "Linzin tehdaskaupunki on muuttunut digitaalisen taiteen keskukseksi, kun Ars Electronica täyttää kadut valoilla." },
    "Kärnten": { lyhyt: "Kärntenin kirkkaat vuoristojärvet, etenkin Wörthersee, täyttyvät kesäisin uimareista ja purjelautailijoista." },
    "Salzburg": { lyhyt: "Salzburgin vanhakaupunki elää yhä Mozartista: kesän musiikkijuhlat täyttävät torit ja kirkot joka ilta." },
    "Burgenland": { lyhyt: "Burgenland on Itävallan nuorin osavaltio, ja Neusiedler-järven ruovikot ovat nyt Euroopan tärkeimpiä lintualueita." },
    "Vorarlberg": { lyhyt: "Vorarlbergissa tekstiiliteollisuuden perintö näkyy nyt rohkeana arkkitehtuurina, josta Bregenzerwaldin kylät ovat kuuluisia." },
    "Wien": { lyhyt: "Wien nousee joka vuosi maailman parhaiten asuttavien kaupunkien kärkeen – kahvilakulttuuri on siihen yksi syy." },
  },
};
