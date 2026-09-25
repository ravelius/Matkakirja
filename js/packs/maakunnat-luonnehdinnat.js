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
    "Hauts-de-France": {
      lyhyt: "Lillestä pääsee junalla alle tunnissa Brysseliin ja reilussa tunnissa Lontooseen – rajat tuntuvat kadonneen.",
      pitka: "Alueen maisemaa hallitsevat yhä teolliset kummut, terrilit – vanhojen hiilikaivosten kasat, jotka nousevat tasaisesta maakunnasta kuin keinotekoiset vuoret. 1870-luvulla seudun kaivokset kävivät jo täydellä höyryllä, ja hiili teki Pohjois-Ranskasta maan teollisen sydämen. Nykyään moni terril on vihertynyt ulkoilumaasto, ja koko kaivosalue on Unescon maailmanperintöä; entisten kaivostyöläisten kaupunkeihin on noussut myös Louvre-Lens, Pariisin kuuluisan museon sisarmuseo. Rivitalokortteleiden välissä elää yhä sitkeä kaivosseudun yhteisöllisyys, vaikka viimeinen kaivos suljettiin jo vuosikymmeniä sitten.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-hauts-de-france-1fb14423.jpg',
          lahde: 'JackyM59, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'JackyM59',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Terril_Saint_Roch_de_Monchecourt_-_Hiver_sur_la_prairie.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-hauts-de-france-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Grand Est": {
      lyhyt: "Strasbourgissa istuu Euroopan parlamentti, ja kaupungin joulumarkkinat vetävät väkeä joka puolelta Eurooppaa.",
      pitka: "Alsace on kahden kulttuurin risteyskohta: ristikkoseinäiset talot, viinitiet ja saksankin kaikuva murre elävät rinta rinnan ranskan kanssa. Vuonna 1871 alue irrotettiin Ranskasta osaksi Saksan keisarikuntaa, ja kaksi vuotta myöhemmin, isoisän kulkiessa halki Euroopan, Strasbourg oli yhä osa Saksaa – kaupunki palasi Ranskalle vasta ensimmäisen maailmansodan jälkeen 1918. Katedraalin juurelta alkavat kanavat kiertävät Petite Francen ristikkotaloja, joiden alakerroissa toimi ennen parkitsijoita ja mylläreitä. Nykyään alueen viinitie kulkee kylästä toiseen Vogeesien juurella, ja moni kylä pitää kylttiinsä yhä sekä ranskan- että saksankielisen nimen.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-grand-est-3c65764f.jpg',
          lahde: 'Gzen92, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Gzen92',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponts_couverts_et_cathédrale_(Strasbourg)_(3).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-grand-est-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    /*
     * AVAIN KORJATTU 22.9.2026 (Karttatyökalun Maakunnat-runko): tunnus
     * on Natural Earthin `region`-kentän kirjainkanta TÄSMÄLLEEN
     * (avaimet.md + docs/raportit/…/nykyalueet-fra-deu.json), eli
     * väliviiva myös d'Azurin edellä — nimiFi (kartan teksti) sen sijaan
     * käyttää välilyöntiä. Avain oli aiemmin nimiFi-muodossa, jolloin
     * karttatyökalun tuleva vektoritaso ei olisi löytänyt luonnehdintaa
     * lainkaan tälle alueelle.
     */
    "Provence-Alpes-Côte-d'Azur": {
      lyhyt: "Nizzan rantabulevardilla kävelee kesällä koko Eurooppa, ja Cannesin punainen matto rullataan joka toukokuu.",
      pitka: "Alppien rinteet syöksyvät täällä suoraan Välimereen, ja rannikon kaupungeissa Marseillesta Cannesiin eletään edelleen meren tuomasta vilkkaudesta ja matkailusta. Brittiläinen yläluokka löysi Nizzan talvikohteeksi jo 1800-luvun alussa, ja se rahoitti kaupunkiin rantabulevardin, Promenade des Anglais'n, joka kantaa yhä heidän nimeään. Sisämaassa laventelipellot maalaavat kesällä kokonaisia laaksoja violetiksi, ja kalliokylät kuten Gordes kiipeävät yhä vuorenrinteille keskiajalta asti lähes muuttumattomina. Meri ja vuoret asuvat täällä niin lähekkäin, että aamulla voi hiihtää Alpeilla ja iltapäivällä uida Välimeressä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-provence-alpes-cote-d-azur-a612865c.jpg',
          lahde: 'Txllxt TxllxT, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Txllxt TxllxT',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nice_-_Promenade_des_Anglais_-_View_WSW.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-provence-alpes-cote-d-azur-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Auvergne-Rhône-Alpes": {
      lyhyt: "Lyon tunnetaan Ranskan gastronomian pääkaupunkina – täältä ei lähdetä nälkäisenä minnekään!",
      pitka: "Alue yhdistää kaksi äärilaitaa: pohjoisessa Mont Blancin lumihuiput ja etelämpänä Auvergnen sammuneet tulivuoret, joiden pyöreät huiput – puyt – kohoavat vihreästä ylängöstä kuin jättiläisten jäljiltä. Lyon on ollut vuosisatoja silkinkutojien kaupunki, ja sen vanha kutomokortteli Croix-Rousse kiertyy jyrkkää mäkeä pitkin täynnä kapeita sisäpihakäytäviä, joita kutojat käyttivät kangaspakkojen kuljetukseen sateelta suojassa. Nykyään samat käytävät, traboulit, ovat suosittu retkikohde, ja entisten kutomoiden tilalla on kahviloita ja ateljeita. Alppien rinteillä hiihtokeskukset täyttyvät talvisin, mutta Auvergnen puolella maisema on rauhallisempi: laidunlehmiä, laavakivikyliä ja lähteitä, joiden kivennäisvesi pullotetaan ympäri maailmaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-auvergne-rhone-alpes-e33614e8.jpg',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
          tekija: 'Dennis G. Jarvis',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lyon_cityscape_from_Notre-Dame_de_Fourvière_-_from_Flickr.jpg',
          lisenssi: 'CC BY-SA 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-auvergne-rhone-alpes-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Nouvelle-Aquitaine": {
      lyhyt: "Bordeaux on viinin maailmanpääkaupunki, ja kaupungin raitiovaunut kulkevat kaduilla ilman näkyviä ilmajohtoja.",
      pitka: "Bordeaux'n ympärillä leviävät maailman kuuluisimmat viinitilat, kuten Haut-Brion, ja Atlantin rannikolla kohoaa Euroopan korkein hiekkadyyni, Dune du Pilat, lähes 110 metrin korkeuteen. Juuri silloin, 1870-luvulla, alueen viinitarhoja koetteli vakava kriisi: Amerikasta levinnyt lehtitäi phylloxera tuhosi köynnöksiä juurista asti, ja koko Bordeaux'n viininviljely oli vaarassa kadota kokonaan, ennen kuin pelastus löytyi amerikkalaisiin juurakkoihin varttamisesta. Etelämpänä Baskimaan vuoret laskeutuvat suoraan surffirannoille, ja Biarritzin aallot vetävät nykyään lautailijoita ympäri maailmaa. Ostereita kasvatetaan Arcachonin lahdella samaan tapaan kuin sata vuotta sitten, vain veneet ovat vaihtuneet moottorikäyttöisiksi.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-nouvelle-aquitaine-75575635.jpg',
          lahde: 'Gilles Guillamot, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Gilles Guillamot',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vignoble_de_Haut_Brion.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-nouvelle-aquitaine-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Occitanie": {
      lyhyt: "Toulousessa kootaan jättiläismäisiä Airbus-matkustajakoneita – tehtaan vierestä näkee yhden nousevan taivaalle.",
      pitka: "Toulousen vaaleanpunaiset tiilitalot antoivat kaupungille lempinimen ville rose, ja pohjoisessa alkaa Ranskan vanha kanavaverkosto, Canal du Midi, joka yhdisti Atlantin ja Välimeren jo 1600-luvulla. Etelässä keskiaikainen Carcassonnen linnoituskaupunki kantaa nimensä vanhasta legendasta: piiritetty Dame Carcas soitti tarun mukaan voitonkelloja antautumisen sijaan, ja ilmauksen 'Carcas sonne' – Carcas soittaa kelloa – kerrotaan jääneen elämään kaupungin nimessä. Nykyään Carcassonnen kaksinkertaiset muurit ja 52 tornia näkyvät kauas Aude-joen laaksoon, ja illalla valaistu linnoitus näyttää suoraan satukirjasta pudonneelta. Pyreneiden rinteillä ja Välimeren rannalla eletään yhä leppoisaa eteläistä elämänmenoa, jossa oksitaanin kieli kuuluu yhä toreilla ranskan rinnalla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-occitanie-d3620138.jpg',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Diego Delso',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ciudadela,_Carcasona,_Francia,_2023-01-07,_DD_216-218_HDR.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-occitanie-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Bourgogne-Franche-Comté": {
      lyhyt: "Comté-juusto kypsyy täällä kalkkikiviluolissa jopa kolme vuotta ennen kuin se päätyy kauppoihin.",
      pitka: "Bourgognen kukkuloilla kasvaa maailman arvostetuimpia viinitarhoja, ja idempänä Jura-vuorten metsäiset ylängöt ruokkivat karjaa, jonka maidosta seudun juustomestarit valmistavat kuuluisia juustojaan. Besançonin kaupunkia suojaa jokikäänteeseen rakennettu Vaubanin linnoitus, ja tammikuussa 1871, pari vuotta ennen kuin isoisä itse saapui seudulle, juuri täältä kulki Ranskan itäisen armeijan katkera vetäytyminen: kenraali Bourbakin nälkiintyneet joukot pakenivat lopulta Sveitsiin, saksalaisjoukkojen ajamina pakkasessa. Kaupungin toinen maine liittyy tarkkuuteen: Besançon on ollut 1700-luvulta asti Ranskan kellosepäntaidon keskus, ja perinne elää yhä pienissä verstaissa. Maaseudulla lehmät laiduntavat samoilla niityillä, jotka ovat ruokkineet juustomestareita sukupolvien ajan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-bourgogne-franche-comte-dccc23c7.jpg',
          lahde: 'Erkethan, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Erkethan',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Citadel_of_Besançon_over_the_Doubs_river.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-bourgogne-franche-comte-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Pays de la Loire": {
      lyhyt: "Nantesin kaduilla kävelee mekaaninen jättiläiselefantti, jonka selkään pääsee kiipeämään ihan oikeasti.",
      pitka: "Nantesista tuli 1800-luvulla maailmankirjailija Jules Vernen kotikaupunki, ja hänen seikkailuromaaninsa Maailman ympäri 80 päivässä ilmestyi juuri vuonna 1873 – samana vuonna, kun isoisä itse oli matkalla maailmalla. Kaupungin vanha satama hiljeni vuosikymmenten mittaan, kun Loire-joki alkoi liettyä, ja telakat siirtyivät joen suulle Saint-Nazaireen, missä yhä rakennetaan valtavia risteilyaluksia. Rannikolla, Vendéen hiekkarannoilla ja dyyneillä, kesät kuluvat purjelautailijoiden ja lomalaisten parissa, ja Île d'Yeu häämöttää merellä horisontissa. Sisämaassa Loiren jokilaakso jatkuu vielä vehmaana viinialueena, ennen kuin maisema muuttuu itään päin linnojen kivimuureiksi.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-pays-de-la-loire-599bd11b.jpg',
          lahde: "Pom' from France, European Union, Wikimedia Commons (CC BY-SA 4.0)",
          tekija: "Pom' from France, European Union",
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St-Hilaire-de-Riez,_Vendée,_France_-_Flickr_-_pom%27..jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-pays-de-la-loire-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Bretagne": {
      lyhyt: "Bretagnessa syödään galetteja joka kulmalla – suolainen tattaripannukakku on täällä aivan arkiruokaa.",
      pitka: "Rannikko on täynnä graniittikallioita ja pieniä satamakyliä, joissa kalastajaveneet tuovat yhä päivittäin saaliin suoraan torille. Carnacin lähellä seisoo yli kolmetuhatta esihistoriallista seisovaa kiveä riveissä, joiden tarkoitusta ei tiedetä varmasti vieläkään – osa kivistä painaa yli kolmekymmentä tonnia, ja niiden pystyttämiseen tarvittu työmäärä hämmästyttää arkeologeja yhä. Bretagnen rannikolla on enemmän majakoita kuin missään muualla Ranskassa, ja aallokon runtelemalla Finistèren kärjellä ne opastavat yhä laivoja kivikkoisten saarten ja karien välistä. Nykyään Bretagnen oma kieli ja musiikki elävät vahvana, ja galettien lisäksi alueen ylpeys on sen ranskasta erillinen kelttiläinen identiteetti.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-bretagne-ee3d42bb.jpg',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Zairon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carnac_Alignement_de_Menec_4.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-bretagne-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Normandie": {
      lyhyt: "Normandiassa omenat päätyvät harvoin vain hillopurkkiin – niistä tislataan väkevää kalvadosia.",
      pitka: "Liitukalliot putoavat suoraan mereen Étretat'n ja Fécampin kohdalla, ja niiden luonnolliset kaariportaalit ovat inspiroineet taiteilijoita sukupolvien ajan. Juuri tällä rannikolla ja Le Havren satamassa syntyi 1870-luvulla kokonainen taidesuuntaus: Claude Monet maalasi vuonna 1872 Le Havressa teoksen Impression, auringonnousu, joka antoi nimen koko impressionismille – ja Monet palasi Étretat'n kallioille yhä uudelleen seuraavina vuosina. Sisämaassa omenatarhat ja ristikkotalot leimaavat maisemaa, ja karjalaidunten vihreys näkyy jopa alueen juustoissa, kuten Camembertissa. Rouenin vanhassa kaupungissa puiset ristikkotalot kallistuvat kujien yllä, ja katedraalin torni oli valmistuessaan 1876 hetken aikaa maailman korkein rakennus.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-normandie-fb1567cc.jpg',
          lahde: 'Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Raimond Spekking',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cliffs_of_Étretat,_Normandy-8289.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-normandie-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Corse": {
      lyhyt: "Korsikalla vuoret syöksyvät suoraan mereen, ja saaren oma kieli kaikuu toreilla ranskan rinnalla.",
      pitka: "Saaren sisäosissa tuoksuva pensaikko, maquis, peittää kesäisin rinteet niin vahvana, että tuoksu kantautuu merelle asti – Napoleonin kerrotaan tunnistaneen kotisaarensa hajusta jo ennen kuin sitä näki. Bonifacion vanha kaupunki on rakennettu kalkkikivijyrkänteen reunalle niin tarkasti, että osa taloista näyttää roikkuvan tyhjän päällä; kaupungin alle louhitut Aragonian kuninkaan portaat johtivat aikoinaan makean veden lähteelle asti. Korsika on Napoleon-suvun alkukoti, ja suvun viimeinen hallitsija, keisari Napoleon III, oli kaatunut vallasta vuonna 1870 – vain kolme vuotta ennen isoisän omaa matkaa – ja saaren bonapartistinen ylpeys eli silti pitkään sen jälkeenkin. Vuoristokylissä paimentolaisperinne ja kastanjaviljely muovaavat yhä arkea, vaikka rannikon lomakaupungit täyttyvät kesäisin purjeveneistä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-corse-219a9288.jpg',
          lahde: 'Isiwal, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Isiwal',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Corsica_Bonifacio_Ville_haute.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-corse-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Centre-Val de Loire": {
      lyhyt: "Loiren laaksossa kohoaa yhä satoja linnoja, ja Chambordin katolla riittää torneja ihmeteltäväksi tunneiksi.",
      pitka: "Loiren jokilaakso on täynnä satoja linnoja, mutta Chambord on niistä suurin ja oudoin: sen kaksoiskierreportaikko on suunniteltu niin, että ylös ja alas kulkevat eivät koskaan kohtaa, ja legendan mukaan idean takana oli itse Leonardo da Vinci. Linnan ympärillä levittäytyy yksi Euroopan suurimmista aidatuista metsäpuistoista, jossa yhä liikkuu villejä hirviä ja kauriita. Jokivarren pienemmät kaupungit, kuten Chinon ja Amboise, elävät edelleen viinistä ja historiasta – alueen valkoviinit, Vouvray ja Sancerre, tunnetaan ympäri maailmaa. Kesäisin laakson kirkkaassa valossa maalarit ja valokuvaajat kokoontuvat samoille joen rannoille, joilta kuninkaat aikoinaan katselivat linnojensa peilikuvia vedestä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-centre-val-de-loire-c65d0b2d.jpg',
          lahde: 'Carsten Steger, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Carsten Steger',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Château_de_Chambord_(view_from_the_southeast).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-centre-val-de-loire-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Île-de-France": {
      lyhyt: "Pariisin seudulla asuu yli kaksitoista miljoonaa ihmistä, ja RER-juna vie keskustasta lentokentälle tunnissa.",
      pitka: "Vuonna 1873 Pariisi oli vasta toipumassa: kaupunki oli juuri kestänyt preussilaisten piirityksen ja Pariisin kommuunin verisen kukistamisen 1871, tasavallan ensimmäinen presidentti Adolphe Thiers oli juuri eronnut ja valtaa piti marsalkka MacMahon – nuori tasavalta oli yhä hauras. Keskustan leveät bulevardit ovat edelleen paroni Haussmannin 1850–60-luvuilla suunnittelemia, ja niiden kahviloissa istutaan yhä samaan tyyliin kuin silloin. Versailles'n palatsi seisoo muutaman junapysäkin päässä pääkaupungista, ja sen peilisali muistuttaa ajasta, jolloin kuninkaat hallitsivat koko Eurooppaa täältä käsin. Pariisin ympärille kasvanut esikaupunkien rengas on nykyään yksi Euroopan moninaisimmista alueista, täynnä kieliä ja keittiöitä ympäri maailmaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/fra-maakunta-ile-de-france-d1f10ccc.jpg',
          lahde: 'Myrabella, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Myrabella',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:01_vue_Paris_depuis_Notre-Dame.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/FRA-ile-de-france-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  DEU: {
    "Sachsen": {
      lyhyt: "Leipzig sykkii nyt musiikista ja startupeista, ja kevään kirjamessut täyttävät kadut lukijoista!",
      pitka: "Dresden kylpee Elben rannalla barokkihuviloiden keskellä, ja kaupunkia kutsuttiin sen upean arkkitehtuurin ansiosta jo 1800-luvulla \"Elbin Firenzeksi\". Vuonna 1873 Sachsen oli yhä oma kuningaskuntansa uuden Saksan keisarikunnan sisällä, ja kuningas Johann hallitsi juuri tästä kaupungista. Toisen maailmansodan pommitukset polttivat Frauenkirchen kirkon raunioiksi vuonna 1945, ja mustuneet kivet lojuivat kasassa lähes viisikymmentä vuotta ennen kuin kirkko rakennettiin uudelleen samoista kivistä 2005. Tumman ja vaalean kiven kuvio seinässä näkyy yhä matkailijoille todisteena siitä, mikä selvisi ja mikä rakennettiin uudestaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-sachsen-924f99ca.jpg',
          lahde: 'PantheraLeo1359531, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'PantheraLeo1359531',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elbe_mit_Frauenkirche_Dresden_20180810_DSC01210_RAW-Export.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-sachsen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Bayern": {
      lyhyt: "München yhdistää nykyään Oktoberfest-perinteen ja huipputeknologian – BMW:n tehtaat hurisevat keskustan kupeessa.",
      pitka: "Etelässä Alpit kohoavat Baijerin taustalla, ja kuningas Ludvig II rakennutti satulinnaansa Neuschwansteinia vuoresta toiseen 1870-luvulla. Juuri silloin, kun isoisä kulki Baijerissa, linnan portti valmistui, ja kuningas asui siellä jo ennen kuin koko linna oli valmis. Nykyään linna on Saksan suosituin nähtävyys, ja sen tornit ovat innoittaneet muun muassa Disneyn satulinnojen ulkonäköä. Baijerilaisuus näkyy yhä ylpeänä omana identiteettinä – murre, oluttarhat ja valkosinivalkoinen lippu erottavat sen selvästi muusta Saksasta.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-bayern-5a2ccc82.jpg',
          lahde: 'Thomas Wolf, www.foto-tw.de, Wikimedia Commons (CC BY-SA 3.0 de)',
          tekija: 'Thomas Wolf, www.foto-tw.de',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_Neuschwanstein_2013.jpg',
          lisenssi: 'CC BY-SA 3.0 de',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-bayern-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Rheinland-Pfalz": {
      lyhyt: "Mosel- ja Rheinjoen rinteillä viljellään uskomattoman jyrkkiä viinitarhoja, joista osa vaatii köysiä työntekoon.",
      pitka: "Trier on Saksan vanhin kaupunki, ja sen mustunut roomalainen kaupunginportti Porta Nigra on seissyt paikallaan lähes kaksituhatta vuotta. Kaupungissa syntyi myös Karl Marx vuonna 1818, ja hänen lapsuudenkotinsa on nykyään museo, jossa joka kolmas kävijä saapuu Kiinasta. Vuonna 2018 Kiina lahjoitti kaupungille yli viisi metriä korkean pronssipatsaan Marxista syntymän 200-vuotispäivän kunniaksi – lahja herätti kaupungissa kiivasta väittelyä. Mosel-joki mutkittelee Trieristä pohjoiseen niin jyrkkien viinirinteiden välissä, että osa tarhoista joudutaan yhä hoitamaan pienillä raiteilla kulkevilla junilla, koska rinne on liian jyrkkä traktorille.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-rheinland-pfalz-998d00c4.jpg',
          lahde: 'Thomas Wolf, www.foto-tw.de, Wikimedia Commons (CC BY-SA 3.0 de)',
          tekija: 'Thomas Wolf, www.foto-tw.de',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porta_Nigra_morgens.jpg',
          lisenssi: 'CC BY-SA 3.0 de',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-rheinland-pfalz-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Saarland": {
      lyhyt: "Saarbrücken tuntuu vähän Ranskalta – täällä syödään croissantteja ja puhutaan murteessa ranskaa sekaan.",
      pitka: "Saarin joki kiemurtelee jyrkän silmukan Mettlachin kohdalla – Saarschleife on alueen tunnetuin näköalapaikka ja vetää nykyään patikoijia joka puolelta Saksaa. Alue on pinta-alaltaan Saksan pienimpiä osavaltioita, mutta hiili ja teräs tekivät siitä 1900-luvulla yllättävän vauraan teollisuusseudun, jonka kaivoskuilut ulottuivat kilometrikaupalla Ranskan rajan alle. Saarland liittyi nykyisessä muodossaan Saksaan vasta 1957, kansanäänestyksen jälkeen – ennen sitä alue oli sekä Kansainliiton hallinnassa että osa Ranskan talousaluetta. Siksi Saarbrückenissä tuntuu yhä ranskalaiselta, vaikka raja on nykyään vain viivalla kartalla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-saarland-28400314.jpg',
          lahde: 'Pascal Dihé, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Pascal Dihé',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saarschleife_panorama.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-saarland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Schleswig-Holstein": {
      lyhyt: "Kahden meren välissä tuulimyllyt pyörivät joka suuntaan – tuulivoima on täällä arkipäivää, ei erikoisuus.",
      pitka: "Vain yhdeksän vuotta ennen isoisän matkaa, vuonna 1864, Preussi ja Itävalta kävivät sotaa Tanskaa vastaan juuri Schleswigistä ja Holsteinista, ja alue liitettiin Preussiin 1867. Kiista oli niin sekava, että Britannian pääministeri lordi Palmerston vitsaili myöhemmin, että vain kolme ihmistä maailmassa oli koskaan ymmärtänyt koko asian – ja yksi heistä oli kuollut, toinen tullut hulluksi, ja hän itse oli unohtanut kaiken. Nykyään maakunta lepää rauhallisesti kahden meren, Pohjanmeren ja Itämeren, välissä, ja rannikkokaupungit elävät yhä purjehduksesta ja kalastuksesta. Kielin viikko on nykyään maailman suurin purjehdustapahtuma ja kokoaa kesäisin tuhansia veneitä kaupungin edustalle.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-schleswig-holstein-bbd487d9.jpg',
          lahde: 'Siegbert Brey, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Siegbert Brey',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kiel_Week_2023-06-24_(17).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-schleswig-holstein-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Niedersachsen": {
      lyhyt: "Wolfsburgissa Volkswagenin tehdas on kaupungin sydän – koko kaupunki tuntuu rakentuneen autotehtaan ympärille.",
      pitka: "Lüneburgin nummi on laaja kanervikko, jolla harmaat nummilammaslaumat laiduntavat yhä syksyisin kanervan kukkiessa violettina silmänkantamattomiin. Kun isoisä kulki näillä main, Hannover oli vasta äskettäin liitetty Preussiin – kuningas Yrjö V menetti valtaistuimensa 1866 eikä koskaan hyväksynyt tappiotaan, vaan eli loppuelämänsä maanpaossa väittäen yhä olevansa Hannoverin laillinen hallitsija. Preussi takavarikoi kuninkaan omaisuuden niin sanottuun Welfenfondsiin, josta rahoitettiin salaa vastavakoilua Euroopassa vuosikymmeniä. Nykyään Hannover on messukaupunki ja Niedersachsenin pääkaupunki, ja nummen rauha ja tehtaiden humina elävät maakunnassa rinnakkain.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-niedersachsen-2fc45d88.jpg',
          lahde: 'RalphTo, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'RalphTo',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lueneburger_Heide_bei_Wilsede.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-niedersachsen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Nordrhein-Westfalen": {
      lyhyt: "Ruhrin alueen entiset kaivokset ovat nyt taidemuseoita ja konserttisaleja – teollisuusromantiikka vetää turisteja.",
      pitka: "Kölnin tuomiokirkko oli yhä rakenteilla 1870-luvulla – työt olivat olleet pysähdyksissä vuosisatoja, kunnes ne käynnistettiin uudelleen 1842 ja jatkuivat läpi koko vuosikymmenen. Kirkko valmistui lopulta vasta 1880, yhteensä 632 vuoden rakennustyön jälkeen, ja siitä tuli hetkeksi maailman korkein rakennus. Nykyään kaksitorninen jättiläinen hallitsee yhä Kölnin siluettia, ja sen edustalla junat pysähtyvät suoraan päärautatieasemalle keskelle kaupunkia. Ruhrin alueella teollisuushistoria ja tuomiokirkon keskiaikainen kunnianhimo elävät rinnakkain saman osavaltion sisällä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-nordrhein-westfalen-09dd98ea.jpg',
          lahde: 'CEphoto, Uwe Aranas, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'CEphoto, Uwe Aranas',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cologne_Germany_Exterior-view-of-Cologne-Cathedral-05.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-nordrhein-westfalen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Baden-Württemberg": {
      lyhyt: "Stuttgartissa Mercedes-Benzin tehtaat hurisevat keskustan kupeessa – autoteollisuus on täällä lähes uskonto.",
      pitka: "Mustametsä eli Schwarzwald peittää osavaltion lounaiskulman, ja sen kylistä ovat lähtöisin sekä käkikellot että Schwarzwälder Kirschtorte -kakku, joka tunnetaan maailmalla nimellä Black Forest -kakku. Heidelbergissä sijaitsee Saksan vanhin yliopisto vuodelta 1386, ja kaupungin yllä kohoava linnaraunio on yksi maan romanttisimmista näkymistä – amerikkalainen kirjailija Mark Twain ihastui kaupunkiin niin, että omisti sille kokonaisen luvun matkakertomuksessaan. Bodenjärvi rajaa osavaltiota etelässä, ja sen rannoilla Sveitsi, Itävalta ja Saksa kohtaavat saman veden äärellä. Autoteollisuuden rinnalla osavaltio on nykyään myös yksi Saksan suurimmista viinintuottajista.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-baden-wurttemberg-1481318b.jpg',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Dietmar Rabich',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sch%C3%B6nwald_im_Schwarzwald,_Ortsansicht_--_2025_--_7885.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-baden-wurttemberg-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Brandenburg": {
      lyhyt: "Potsdamin palatsit ja puistot ympäröivät Berliiniä kuin vihreä rengas – Sanssouci vetää päivämatkalaisia täyteen.",
      pitka: "Spreewaldin metsässä joki haarautuu sadoiksi pieniksi kanaviksi, ja paikalliset kuljettavat postia, ruokaa ja turisteja yhä perinteisillä soutuveneillä kylästä toiseen. Alueella asuu Saksan slaavilainen vähemmistö sorbit, joilla on oma kieli ja omat kaksikieliset tiekyltit kylissä. Brandenburg ympäröi Berliiniä joka suunnalta kuin rengas, mutta ei itse kuulu pääkaupunkiin – kaksi aluetta hallitaan yhä erikseen, vaikka rajaa ei arjessa juuri huomaa. Maakunnan mäntymetsät ja hiekkaperäinen maaperä tekivät siitä pitkään Preussin köyhintä seutua, mutta nykyään Berliinin läheisyys on tuonut uutta elinvoimaa moneen kylään.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-brandenburg-fd0729be.jpg',
          lahde: 'Hoang Minh Thao Mai, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Hoang Minh Thao Mai',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:On_a_canal_near_the_village_Lehde_in_the_biosphere_reserve_Spreewald,_Brandenburg.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-brandenburg-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Mecklenburg-Vorpommern": {
      lyhyt: "Itämeren rannalla on Saksan hiljaisimmat rannat – Rügenin liidukalliot vetävät kesäisin väkeä valokuvaamaan.",
      pitka: "Sisämaassa avautuu tuhannen järven maa, Mecklenburgin järviylänkö, jossa kanoottia voi meloa viikkokausia näkemättä samaa rantaa kahdesti. Rannikolla hansakaupungit Stralsund ja Wismar ovat säilyttäneet punatiiliset kauppiastalonsa niin hyvin, että Unesco otti molemmat maailmanperintölistalleen samalla kertaa vuonna 2002. Alue on Saksan harvimmin asuttuja, ja moni kylä tyhjeni itäblokin aikana – nyt kesäasukkaat ja purjehtijat täyttävät satamat joka kesä uudelleen. Naapurisaaret Usedom ja Hiddensee tarjoavat saman Itämeren rauhallisemmin, ilman Rügenin kesäruuhkia.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-mecklenburg-vorpommern-ba752db4.jpg',
          lahde: 'Mussklprozz, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Mussklprozz',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wismar_Marienkirche_Panorama_Markt.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-mecklenburg-vorpommern-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Bremen": {
      lyhyt: "Bremenin kaupunginmuusikot seisovat raatihuoneen kupeessa, ja Weserin satama on yhä kaupungin elinehto.",
      pitka: "Bremenin satamakaupunki Bremerhaven oli 1800-luvulla Euroopan vilkkaimpia lähtöportteja Amerikkaan – yhteensä noin seitsemän miljoonaa ihmistä nousi täältä laivaan matkalla uuteen elämään vuosien 1830 ja 1971 välillä. Lähtijöiden määrä oli suurimmillaan juuri 1870-luvulla, kun Saksasta pakeni sekä köyhyyttä että sotien jälkiä. Nykyään entisen odotussalin paikalla toimii Saksan siirtolaismuseo, jossa voi hakea tietoja Amerikkaan lähteneistä sukulaisista tietokannoista. Bremenin ja Bremerhavenin satamat elävät yhä ulkomaankaupasta, vaikka matkustajat ovat vaihtuneet konteiksi.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-bremen-44fd3670.jpg',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Dietmar Rabich',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bremerhaven,_Neuer_Hafen_--_2024_--_2272.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-bremen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Hamburg": {
      lyhyt: "Hampurin uusin maamerkki on Elbphilharmonia – aaltoileva konserttitalo kohoaa sataman yllä ja vetää kuulijoita ympäri maailmaa!",
      pitka: "Hampuri piti itsepintaisesti kiinni vapaakaupungin asemastaan vielä pitkään isoisän matkan jälkeenkin – kaupunki liittyi Saksan tulliliittoon vasta 1888, kun suurin osa maasta oli ollut sen sisällä jo vuosikymmeniä. Vapaasatama-alue sai pitää erioikeutensa neuvottelemalla, ja se vaikutti siihen, millaiseksi koko satama-alue myöhemmin rakennettiin. Nykyään entisten tullivarastojen tilalla kohoaa punatiilinen Speicherstadt, maailman suurin yhtenäinen varastorakennusten alue, joka on nykyään Unescon maailmanperintöä. Elben suulla sijaitseva satama on yhä Euroopan vilkkaimpia, ja rahtilaivat kulkevat päivittäin ohi kaupungin keskustan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-hamburg-fdf690e7.jpg',
          lahde: 'Thomas Wolf, www.foto-tw.de, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Thomas Wolf, www.foto-tw.de',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Speicherstadt_abends.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-hamburg-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Hessen": {
      lyhyt: "Frankfurtin pilvenpiirtäjät kohoavat keskellä Saksaa – täällä lyödään Euroopan keskuspankin rahapäätökset.",
      pitka: "Frankfurt oli vielä vuoteen 1866 asti oma itsenäinen vapaakaupunkinsa, kunnes Preussi valtasi sen sotilaallisesti Saksan sisäisen sodan jälkeen – kaupungin vapaa lehdistö oli ärsyttänyt Preussia, ja tilaisuus tuli käyttöön. Frankfurtilaiset ovat juoneet omenaviiniä eli Apfelweinia niin uskollisesti, että perinteisiä kapakoita kutsutaan yhä nimellä Apfelwein-Wirtschaft, ja juomaa tarjoillaan harmaista kivikannuista. Satuja keränneet Grimmin veljekset kasvoivat Hessenissä, ja heidän kirjaamansa kansansadut – muun muassa Punahilkka ja Tuhkimo – tunnetaan nykyään ympäri maailmaa. Nykyisin Frankfurtin pilvenpiirtäjien varjossa Hessenin pienemmät kaupungit, kuten kylpyläkaupunki Wiesbaden, elävät rauhallisempaa elämää viinitarhojen keskellä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-hessen-f7d7cc9a.jpg',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Berthold Werner',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wiesbaden_Kurhaus_BW_2017-04-24_18-03-23.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-hessen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Thüringen": {
      lyhyt: "Thüringenin metsät peittävät suuren osan maakunnasta – siksi sitä kutsutaan Saksan vihreäksi sydämeksi.",
      pitka: "Wartburgin linnassa Martti Luther käänsi Uuden testamentin saksaksi piileskellessään siellä 1500-luvulla, ja linna kohoaa yhä metsäisen mäen laella Eisenachin yllä. Weimarissa puolestaan Goethe ja Schiller loivat saksalaisen klassismin kulta-ajan, ja kaupungin pieni koko tekee sen kirjallisesta perinnöstä entistäkin vaikuttavamman. Thüringenin oma erikoisuus, Thüringer Rostbratwurst, on niin arvostettu, että sen valmistusohje mainitaan paikallisissa asiakirjoissa jo 1400-luvulta lähtien, ja EU myönsi makkaralle suojatun alkuperänimityksen vuonna 2003. Nykyinen osavaltio syntyi vasta 1920, kun alueen pienet ruhtinaskunnat yhdistyivät yhdeksi Thüringeniksi.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-thuringen-1393c42b.jpg',
          lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Krzysztof Golik',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Outside_view_of_Wartburg_Castle_(4).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-thuringen-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Sachsen-Anhalt": {
      lyhyt: "Dessaussa Bauhaus-rakennukset seisovat pystyssä – muotoilukoulun perintö näkyy koko kaupunkikuvassa.",
      pitka: "Wittenbergissä Martti Luther naulasi perinteen mukaan 95 teesiään kirkon oveen vuonna 1517, ja koko kaupunki elää yhä tästä hetkestä – kadut, kirkot ja museot on nimetty uskonpuhdistuksen mukaan. Harzin vuoristossa kohoaa Brocken, Pohjois-Saksan korkein huippu, jonka ympärille on kudottu satoja vuosia noitasatuja – huippua sanotaan yhä paikaksi, jonne noidat kokoontuivat valpurinyönä. Bauhaus-koulun rakennukset Dessaussa muistuttavat, että sama osavaltio on tuottanut sekä uskonpuhdistuksen että 1900-luvun modernin muotoilun. Nykyään Sachsen-Anhalt on yksi Saksan väkiluvultaan eniten pienenevistä osavaltioista, mutta sen historiallinen painoarvo on suhteettoman suuri.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-sachsen-anhalt-a864473c.jpg',
          lahde: 'Toniklemm, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Toniklemm',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_und_Schlosskirche_Wittenberg_Luftbild_2024_Toni_Klemm.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-sachsen-anhalt-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Berlin": {
      lyhyt: "Berliinin yöelämä on legendaarista – klubit, kuten Berghain, aukeavat vasta puolilta öin ja pyörivät päivään asti!",
      pitka: "Berliinistä tuli 1871 tuoreen Saksan keisarikunnan pääkaupunki, ja seuraavat pari vuotta kaupunki eli railakasta rakennus- ja pörssibuumia, jota kutsutaan nimellä Gründerzeit – rahaa virtasi kaupunkiin Ranskalta saaduista sotakorvauksista. Samana vuonna kun isoisä matkusti Eurooppaan, buumi romahti pörssikriisiin, jota kutsutaan Gründerkrachiksi: toukokuussa 1873 osakekurssit vaipuivat joka puolella Eurooppaa, ja moni äkkirikastunut menetti omaisuutensa yhtä nopeasti kuin oli sen saanut. Nykyään entisistä tehdaskortteleista on tullut klubeja ja galleria-alueita, ja kaupungin yöelämä elää edelleen samasta rajattomasta energiasta. Berliini on ainoa osavaltio, joka on samalla myös kokonainen kaupunki – ja koko Saksan pääkaupunki jo toista kertaa historiassa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/deu-maakunta-berlin-8be6fb1a.jpg',
          lahde: 'Norbert Nagel, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Norbert Nagel',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brandenburg_Gate_-_Brandenburger_Tor_-_Berlin_-_Germany_-_02.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/DEU-berlin-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  ITA: {
    "Piemonte": {
      lyhyt: "Nykyään tunnetaan Barolon ja Barbarescon viinimäistä sekä Bra-kaupungista, josta koko Slow Food -liike sai alkunsa 1980-luvulla.",
      pitka: "Torino ei ole enää Italian pääkaupunki, mutta kaupunki ei ole koskaan lakannut rakentamasta itseään uudelleen: entiset tehdasalueet ovat nyt gallerioita, ja alppimaisema ympäröi katuja joka suunnasta. Keskustassa kohosi vuosikymmenten ajan keskeneräisenä Mole Antonelliana – aiottu synagoga, jonka torni venyi vuosi vuodelta korkeammaksi kuin kukaan oli alun perin suunnitellut, ja rakennustyöt jatkuivat aina vuoteen 1889 asti. Nykyään sama torni on kaupungin tunnusmerkki ja elokuvamuseo, ja sen huipulta näkee koko Alppien kaaren. Piemontelaisilla on säilynyt sama itsepäinen tarkkuus, jolla Cavour aikoinaan rakensi yhtenäistä Italiaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-piemonte-fa3b365d.jpg',
          lahde: 'Neq00, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Neq00',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_da_San_Michele_di_Costigliole_d%27Asti.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-piemonte-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lombardia": {
      lyhyt: "Milano on Italian muoti- ja pörssikeskus, mutta koko Po-tasanko tahkoaa maan vilkkainta teollisuutta.",
      pitka: "Milanon tuomiokirkko on ollut rakennustyömaa jo yli 600 vuotta: Napoleonin aikanaan tilaama julkisivu valmistui jo 1800-luvun alussa, mutta tornit ja huiput nousivat vielä hitaasti vuosikymmenten ajan, ja viimeiset yksityiskohdat valmistuivat vasta 1960-luvulla. Como-järven rannoilla kehrätään yhä silkkiä, perinne joka teki Lombardiasta 1800-luvulla Euroopan silkkiteollisuuden sydämen. Po-joen tasangolla kasvatetaan nykyään valtaosa Italian riisistä, ja moni tuttu risotto lähtee liikkeelle juuri näiltä pelloilta. Lombardialaisilla on maine sitkeästä työn kunnioituksesta, joka näkyy yhtä lailla tehtaissa kuin viljelysmailla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-lombardia-d211df69.jpg',
          lahde: 'Daniel Case, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Daniel Case',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bellagio_and_Lake_Como_from_Menaggio-Varenna_ferry.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-lombardia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Sicily": {
      lyhyt: "Etna kohoaa savuten saaren yllä, ja sen tulinen tuhka pitää rinteiden appelsiiniviljelmät poikkeuksellisen antoisina.",
      pitka: "Sisilia liittyi Italian kuningaskuntaan vasta 1860, ja kun isoisä kulki saarella, haava oli yhä tuore: kuusi vuotta aiemmin Palermossa oli puhjennut viikon mittainen kapina uutta hallintoa vastaan, sillä moni sisilialainen koki Roomasta johdetun Italian yhtä vieraaksi kuin aiemman kuningaskunnan. Nykyään saarella eletään toisin: Agrigenton kreikkalaistemppelit ja Taorminan antiikin teatteri, jonka näyttämön takaa Etna kohoaa kuin kulissi, vetävät miljoonia matkailijoita vuosittain. Etnan juurella asuvat ihmiset ovat tottuneet elämään tulivuoren armoilla – kylät on rakennettu uudelleen useaan kertaan laavavirtojen jäljiltä, mutta kukaan ei haluaisi muuttaa pois. Saaren oma kieli ja ruokakulttuuri, arabivaikutteinen kuskus mukaan lukien, muistuttavat siitä, että Sisilia on aina katsonut yhtä paljon merelle kuin manner-Italiaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-sicily-3ba0eb8b.jpg',
          lahde: 'Nicolas Chadeville, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Nicolas Chadeville',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Taormina_-_the_greek_theater,_with_mount_Etna_in_the_background.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-sicily-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Toscana": {
      lyhyt: "Chianti-mäkien viinitilat ja agriturismot elävät nyt yhtä paljon matkailijoista kuin rypäleistä.",
      pitka: "Firenze oli Italian pääkaupunki vuosina 1865–1871 – vain pari vuotta ennen isoisän matkaa se luovutti asemansa Roomalle, ja kaupunki oli juuri ehtinyt purkaa keskiaikaisia muurejaan ja rakentaa leveitä bulevardeja hallitusväen tarpeisiin. Jäljet siitä lyhyestä pääkaupunkikaudesta näkyvät yhä katukuvassa, vaikka Firenze tunnetaan nykyään ennen kaikkea renessanssin taideaarteistaan. Uffizin galleriaan jonotetaan tunteja, ja Ponte Vecchion kultasepänliikkeet ovat pysyneet samalla paikalla vuosisatoja. Toscanan maaseudulla elämäntahti on toinen: kylät elävät käsityöläisistä ja viininviljelystä, joka ulottuu kauas Chiantin ulkopuolelle aina Val d'Orcian aaltoileville savikummuille asti.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-toscana-04262477.jpg',
          lahde: 'Anna.Massini, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Anna.Massini',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tramonto_sulla_Val_d%27Orcia_da_Pienza_-_Patrimonio_Unesco.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-toscana-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Emilia-Romagna": {
      lyhyt: "Parman kinkku ja Modenan balsamico kypsyvät täällä edelleen, mutta Maranellon tehtaalta lähtee nykyään myös Ferrari.",
      pitka: "Bolognan yliopisto on maailman vanhin: opetusta on annettu keskeytyksettä vuodesta 1088, ja kaupunkia kutsutaan yhä 'oppineeksi Bolognaksi' punaisen ja lihavan rinnalla. Via Emilian varrella Maranellon lisäksi myös Sant'Agata Bolognesen Lamborghini-tehdas ja Modenan Pagani-verstas tekevät kaistaleesta koko maailman tiiviimmän moottoriurheilun keskittymän – paikalliset kutsuvat sitä yksinkertaisesti Motor Valleyksi. Ruoka ja moottorit eivät ole sattumaa vaan saman tarkkuuden kahta puolta: sama pikkutarkkuus, jolla parmesaania kypsytetään vuosia, näkyy myös koneenosien viimeistelyssä. Emilia-Romagnalaiset ovat ylpeitä sekä pöydästään että konepajoistaan, eivätkä pidä kumpaakaan toistaan tärkeämpänä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-emilia-romagna-9bb992c7.jpg',
          lahde: 'Dimitris Kamaras, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Dimitris Kamaras',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Piazza_Galvani,_Bologna_(26655414786).jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-emilia-romagna-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Sardegna": {
      lyhyt: "Ogliastran vuoristokylät ovat yksi maailman harvoista sinisistä vyöhykkeistä, joissa ihmiset elävät poikkeuksellisen pitkään.",
      pitka: "Sardiniaa hallitsevat maisemassa yli kolmetuhatta nuraghea, ainutlaatuisia pronssikautisia kivitorneja, joita ei löydy mistään muualta maailmasta – parhaiten säilynyt kokonaisuus on Baruminissa, UNESCON maailmanperintökohteessa. Saaren lounaisosassa, Iglesiasin seudulla, oli 1800-luvun jälkipuoliskolla käynnissä toisenlainen mullistus: kasvanut sinkin ja lyijyn kysyntä Euroopassa käynnisti kaivosbuumin, joka toi tuhansia työläisiä aiemmin syrjäisille vuorille. Nykyään vanhat kaivosalueet on muutettu geologis-historialliseksi puistoksi, jossa kävellään samoja tunneleita kuin 1800-luvun kaivosmiehet. Saarella puhutaan yhä omaa sardin kieltä, joka eroaa mantereen italiasta niin paljon, että moni pitää sitä pikemminkin latinan omana sisarkielenä kuin murteena.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-sardegna-1afc0031.jpg',
          lahde: 'Norbert Nagel, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Norbert Nagel',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nuraghe_Su_Nuraxi_-_Barumini_-_Sardinia_-_Italy_-_05.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-sardegna-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Veneto": {
      lyhyt: "Venetsia kelluu turistivirrassa, mutta maaseudulla mäet täyttyvät nykyään prosecco-viinitarhoista.",
      pitka: "Veneto oli itävaltalaista aluetta vielä 1866, jolloin se liitettiin osaksi uutta Italian kuningaskuntaa kansanäänestyksellä; isoisän saapuessa alueelle siirtymästä oli kulunut vasta muutama vuosi. Yksi jäänne siitä ajasta elää yhä joka baaripöydässä: tapa lisätä paikalliseen viiniin roiske soodavettä syntyi 1800-luvulla, kun alueella liikkuneet itävaltalaiset upseerit pitivät venetolaisia viinejä liian raskaina – tästä kehittyi vuosikymmenten saatossa nykyinen spritz. Verona vetää nykyään rakastavaisia Julian parvekkeelle Shakespearen näytelmän innoittamana, vaikka tarina on täysin kuvitteellinen. Padovan ja Vicenzan ympäristössä seisoo yhä satoja Palladion suunnittelemia huviloita, jotka ovat innoittaneet arkkitehtuuria ympäri maailmaa aina Yhdysvaltain Valkoiseen taloon asti.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-veneto-552f7b59.jpg',
          lahde: 'Valentina Sardone, Wikimedia Commons (CC0)',
          tekija: 'Valentina Sardone',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Villa_Almerico_Capra_Andrea_Palladio_Vicenza_giugno_2017.jpg',
          lisenssi: 'CC0',
          lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-veneto-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Apulia": {
      lyhyt: "Alberobellon kartiokattoiset trullit ja loputtomat oliivitarhat tekevät Apuliasta Italian nousevan matkailuosavaltion.",
      pitka: "Etelämpänä Salenton niemimaalla kaupunkeja hallitsee toisenlainen tyyli kuin Alberobellon trullit: Leccen kellertävä hiekkakivi on veistetty niin runsaaksi barokiksi, että kaupunkia kutsutaan Etelän Firenzeksi. Salento on ainoa paikka Italiassa, jossa seisoo yhden niemimaan kärjellä ja näkee sekä Adrianmeren että Joonianmeren saman päivän aikana. Alueen kansanperinteeseen kuuluu pizzica, alun perin tarantellan puremaa vastaan tanssittu kiihkeä tanssi, joka elää nykyään kesäisin festivaaleilla ympäri Salentoa. Apulialaiset elävät edelleen läheisessä suhteessa mereen ja maahan – kalastajakylät ja loputtomat oliivilehdot vuorottelevat rannikolla kilometri kilometriltä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-apulia-b7b3d4c4.jpg',
          lahde: 'Francisco Anzola, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Francisco Anzola',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porta_San_Biagio,_Lecce.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-apulia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lazio": {
      lyhyt: "Rooma on Italian pääkaupunki ja hallinnon sydän, ja Vatikaani vetää keskustaan miljoonia kävijöitä vuosittain.",
      pitka: "Kun isoisä saapui Roomaan, kaupunki oli ollut Italian pääkaupunki vasta pari vuotta: se liitettiin kuningaskuntaan 1870, kun Porta Pian muurinsärkijät avasivat tien paavin valtion viimeiseen linnakkeeseen, ja pääkaupunki siirtyi Firenzestä Roomaan 1871. Vatikaani jäi silti paavin omaksi alueeksi, eikä paavi tunnustanut uutta Italian valtiota vuosikymmeniin. Rooman ulkopuolella Lazion maaseutu, Tuscia, kätkee muun muassa Bolsena-järven ja hiljaisia kyliä, jotka elävät viinistä ja hasselpähkinöistä kaukana turistivirroista. Nykyään suurin osa Lazion asukkaista asuu pääkaupunkiseudulla, mutta maaseudun rauhallisempi tahti on säilynyt lähes koskemattomana.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-lazio-66d9ffe3.jpg',
          lahde: 'Nicola Quirico, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Nicola Quirico',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lago_di_Bolsena_00.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-lazio-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Trentino-Alto Adige": {
      lyhyt: "Alueella puhutaan saksaa ja italiaa rinnakkain, ja laaja itsehallinto pitää Dolomiittien hiihtokeskukset kukoistavina.",
      pitka: "Kun isoisä kulki näillä main, koko alue kuului vielä Itävalta-Unkariin, ei Italiaan – raja kulki tuolloin aivan toisin, ja Trentino sekä Etelä-Tiroli liitettiin Italiaan vasta ensimmäisen maailmansodan jälkeen, Saint-Germainin rauhansopimuksella 1919. Se selittää, miksi saksa on täällä yhä arkikieli eikä vain matkailujuttu. Vuonna 1991 jäätiköltä löytyi Ötzi, yli 5300 vuotta vanha muumioitunut mies, joka oli maannut jäässä juuri nykyisen Italian ja Itävallan rajan tuntumassa – hänet on nähtävissä Bolzanon arkeologisessa museossa. Dolomiittien hammastetut huiput ovat UNESCOn maailmanperintökohde, ja alueen erillinen historia näkyy yhä kylissä, joiden nimet vaihtuvat saksasta italiaksi kunnasta toiseen.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-trentino-alto-adige-df1b68e1.jpg',
          lahde: 'Olga1969, Wikimedia Commons (CC BY 4.0)',
          tekija: 'Olga1969',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Dolomites_in_South_Tyrol,_Italy.jpg',
          lisenssi: 'CC BY 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-trentino-alto-adige-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Calabria": {
      lyhyt: "Reggio Calabrian ympärillä kasvatetaan lähes koko maailman bergamottia, jota käytetään muun muassa Earl Grey -teessä.",
      pitka: "Vuoret peittävät lähes koko Kalabrian: Pollino, Sila ja Aspromonte kohoavat suoraan kahden meren, Joonianmeren ja Tyrrhenanmeren, väliin. Vuoristokylissä kuulee yhä kreikkaa ja albaniaa – Bovesian grecanicit ja arbëreshe-yhteisöt periytyvät vuosisatojen takaisista pakolaisista Bysantista ja Balkanilta. Reggio Calabrian ympäristön kapealla rannikkokaistaleella kasvatetaan lähes koko maailman bergamotti, sitrushedelmä, jonka tuoksuöljyä käytetään sekä Earl Grey -teessä että hienoimmissa hajuvesissä. Silkkiäistoukkien kasvatus ja mulperipuut olivat pitkään monelle vuoristoperheelle tärkein elinkeino, aivan kuten Bysantin ajoista lähtien.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-calabria-86f93811.jpg',
          lahde: 'Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Benjamin Smith',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tropea_-_Porto_al_tramonto.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-calabria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Campania": {
      lyhyt: "Napolista alkanut pizza elää vilkkaana katukeittiöissä ja pizzerioissa savuavan Vesuviuksen juurella.",
      pitka: "Rooman aikaan Campania felix tarkoitti hedelmällistä maata, ja se pitää yhä paikkansa: alue on Italian ykkönen tomaatin- ja pähkinäntuotannossa, ja rannikolla kimaltavat Capri, Ischia ja Procida. Napoli oli vuonna 1873 jo rautatiekaupunki – ensimmäinen rautatie koko Italian niemimaalla avattiin sinne jo 1839, joten isoisän aikalainen matkustaja pääsi kaupunkiin junalla, ei enää pelkällä laivalla tai kärryillä. Napolin seutu oli tuolloin vasta vähän aikaa liittynyt uuteen kuningaskuntaan Bourbonien Kahden Sisilian kukistuttua 1861. Kreikkalaisten, roomalaisten, espanjalaisten ja ranskalaisten kerrostumat näkyvät yhä kaupunkikuvassa ja tekevät Campaniasta yhden Italian kirjavimmista risteysasemista.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-campania-215d322e.jpg',
          lahde: 'Mайкл Гиммельфарб, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Mайкл Гиммельфарб',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amalfi_Coast,_Italy_Panoramic.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-campania-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Abruzzo": {
      lyhyt: "Abruzzon kansallispuisto suojelee nykyään Euroopan harvinaisinta karhua, Marsican ruskeakarhua, sukupuutolta.",
      pitka: "Abruzzon maisema vaihtuu nopeasti: Gran Sasson 2912-metriset huiput kohoavat sisämaassa, ja rannikolla on sekä hiekka- että kivikkorantoja Adrianmerta vasten. Alueen tunnuslause 'forte e gentile', vahva ja lempeä, kuvaa hyvin keskiaikaisissa kukkulakylissä eläviä ihmisiä. Noin kolmannes Abruzzon pinta-alasta on suojeltua luontoa, ja Apenniinien rinteillä elää vielä muutama kymmenen marsikankarhua, alalajia jota ei tavata missään muualla maailmassa. Karhujen ja kylien rinnakkaiselo näkyy arjessa yhä: paimenet ja karhut ovat jakaneet samat vuoristopolut sukupolvien ajan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-abruzzo-2fa822e5.jpg',
          lahde: 'Rabih Omeiri, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Rabih Omeiri',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gran_sasso_visto_da_Rocca_Calascio.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-abruzzo-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Basilicata": {
      lyhyt: "Matera muutti luolakaupunkinsa hotelleiksi ja gallerioiksi, ja siitä tuli 2019 Euroopan kulttuuripääkaupunki.",
      pitka: "Basilicata on Italian saappaan kaarre – vuoret peittävät lähes puolet alueesta, ja maaperä on niin altista sortumille, että kylät on usein rakennettu jyrkkien rinteiden suojaan. Asukkaita kutsutaan lukanialaisiksi, ja perinteinen arpa viggianese -harppu soi yhä paikallisissa juhlissa. Vielä 1870-luvun alussa alue oli toipumassa verisestä jälkiselkkauksesta: vuoden 1861 jälkeen Basilicatassa käytiin todellista sissisotaa, kun Carmine Croccon johtamat rosvojoukot vastustivat asein uutta Italian valtiota ja kirkko sekä syrjäytetyt Bourbonit lietsoivat talonpoikien vastarintaa. Materan luolakaupunki oli vuonna 1873 vielä tavallinen, köyhä asuinalue – ei matkailunähtävyys, joksi siitä tuli vasta vuosikymmeniä myöhemmin.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-basilicata-44b90702.jpg',
          lahde: 'Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Jules Verne Times Two',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sassi_di_Matera_seen_from_Belvedere_di_Piazza_Giovanni_Pascoli,_Matera,_Italy_(PPL3-Altered)_julesvernex2.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-basilicata-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Marche": {
      lyhyt: "Adrianmeren rannikkokaupungit valmistavat kenkiä ja huonekaluja, jotka päätyvät kauppoihin ympäri Eurooppaa.",
      pitka: "Marchen kukkulat kohoavat rannikolta sisämaahan, ja seudulta ovat kotoisin niin Raffael Urbinosta, säveltäjä Gioachino Rossini kuin kasvatusajattelija Maria Montessorikin. Ancona, Pesaro ja Urbino olivat keskiajalla ja renessanssissa vilkkaita kauppa- ja taidekeskuksia, ja tuo perintö näkyy yhä kaupunkien kaduilla. Fabrianon kaupunki on valmistanut vesileimattua paperia 1200-luvulta lähtien, ja sen paperitehtaat toimittavat yhä arvopapereihin ja seteleihinkin käytettyä paperia ympäri maailman. Ascoli Picenon täytetyt oliivit, olive all'ascolana, ovat puolestaan Marchen tunnetuin ruokaperinne, ja niitä paistetaan yhä samalla reseptillä toreilla ja ravintoloissa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-marche-ef9801c7.jpg',
          lahde: 'Terragio67, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Terragio67',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Urbino_-_Comune_di_Urbino_-_Panorama_-_2024-09-24_19-35-54_001.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-marche-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Umbria": {
      lyhyt: "Assisin pyhiinvaeltajavirta jatkuu yhä, ja vihreäksi sydämeksi kutsuttu Umbria on Keski-Italian ainoa maakunta ilman merenrantaa.",
      pitka: "Umbrian vihreitä laaksoja halkoo Tiber-joki aina Trasimeno-järveltä Marmore-putouksille asti, ja siksi seutua kutsutaan Italian vihreäksi sydämeksi. Perugia, Orvieto, Spoleto ja Gubbio ovat säilyttäneet keskiaikaisen ilmeensä lähes koskemattomana kukkuloillaan. Gubbion kukkuloilta löydettiin 1400-luvulla seitsemän pronssitaulua, Eugubine-taulut, joihin on kaiverrettu pisin säilynyt teksti muinaisella umbrialla – ne ovat yhä kaupungin museon pääaarre. Norcian kaupunki puolestaan on antanut koko Italian kielelle sanan norcino, sianlihan käsittelyn mestari, sillä seudun makkarat ja tryffelit tunnetaan koko maassa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-umbria-6884a111.jpg',
          lahde: 'Gunnar Bach Pedersen, Wikimedia Commons (Public domain)',
          tekija: 'Gunnar Bach Pedersen',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Assisi_panorama.jpg',
          lisenssi: 'Public domain',
          lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-umbria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Friuli-Venezia Giulia": {
      lyhyt: "Triesten satama toimii Euroopan suurimpana kahvin tuontiväylänä, vaikka alue ei kasvata papua grammaakaan.",
      pitka: "Alppien ja Adrianmeren välissä kuullaan yhä neljää kieltä: friulia, venetoa, sloveenia ja saksaa, ja jokainen kertoo omaa versiotaan seudun historiasta. Vuonna 1873 alue oli vielä kahtia jaettu: Udinen seutu Friulissa oli liittynyt Italiaan vasta 1866, mutta Triest ja Gorizia kuuluivat yhä Itävalta-Unkarin keisarikuntaan eivätkä liittyneet Italiaan ennen vuotta 1918. Matkustaessaan Udinesta Triestiin isoisä olisi siis joutunut ylittämään oikean valtakunnanrajan, vaikka nykykartalla molemmat ovat samaa Italiaa. Triest oli tuolloin Habsburgien tärkein satama, ja sen kautta virtasi Keski-Eurooppaan enemmän tavaraa kuin mistään muualta.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-friuli-venezia-giulia-7723971a.jpg',
          lahde: 'NamiMurasaki78, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'NamiMurasaki78',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_harbor_in_Trieste.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-friuli-venezia-giulia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Liguria": {
      lyhyt: "Cinque Termen kylät ripustautuvat kallioihin turistien iloksi, ja Genovan satamasta lähtee pesto maailmalle.",
      pitka: "Liguria on kapea rantakaistale vuorten ja meren välissä, ja koko alueen elämä on aina kietoutunut merenkulkuun. Genova oli 1870-luvun alussa vielä tuoreessa muistissa Italian yhdistymisen näyttämönä: Giuseppe Garibaldi lähti Tuhannen retkelleen Quarton kalliolta Genovan liepeiltä toukokuussa 1860, ja ligurialaiset Giuseppe Mazzini ja Goffredo Mameli olivat molemmat keskeisiä kansallisen herätyksen hahmoja. Satama oli tuohon aikaan jo kasvamassa Pohjois-Italian teollistumisen tärkeimmäksi tuontiväyläksi, ja juuri sellaisena isoisä sen matkallaan näki. Rannikon kalastajakylät elivät samaan aikaan yhä vaatimattomasti merestä, kaukana siitä turistikohteesta, joksi Cinque Terre myöhemmin muuttui.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-liguria-b0b61da0.jpg',
          lahde: 'Timothy A. Gonsalves, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Timothy A. Gonsalves',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Manarola_NW_Corniglia_Monterosso_Cinque_Terre_Sep23_A7C_06838.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-liguria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Molise": {
      lyhyt: "Toiseksi pienin maakunta tyhjenee hitaasti nuorista, mutta se on ylpeä 'Molisea ei ole olemassa' -vitsistään.",
      pitka: "Molise on vuoristoista seutua, jossa 55 prosenttia maasta on vuorten peitossa ja rannikkoa on vain reilut 30 kilometriä. Agnonen kaupungissa jouluaattona kuljetettava tulisoihtukulkue, 'Ndocciata, juontaa esikristillisiin perinteisiin, ja seudulla asuu yhä pieni kroaatteja puhuva vähemmistö, jonka juuret ovat 1400-luvun pakolaisissa Balkanilta. Samassa Agnonessa toimii Marinellin kellovalimo, joka on valanut kirkonkelloja jo yli tuhat vuotta ja jolle paavi on myöntänyt oikeuden käyttää Vatikaanin vaakunaa. Paimentolaisuus – lampaiden vuotuinen siirto vuorilta rannikon laitumille ja takaisin – oli pitkään köyhien vuoristokylien tärkein elinkeino, ja samoja polkuja käytetään monin paikoin yhä nykyään.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-molise-779637a1.jpg',
          lahde: 'aledm90, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'aledm90',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alto_Molise.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-molise-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Valle d'Aosta": {
      lyhyt: "Kaksikielinen ranskaa ja italiaa puhuva vuoristoalue elää nykyään Mont Blancin hiihtomatkailusta ja laajasta itsehallinnostaan.",
      pitka: "Mont Blanc kohoaa Valle d'Aostan rajalla Euroopan unionin korkeimpana huippuna, ja laakson pohjalla asuu kaksikielinen väestö, joka puhuu italian ja ranskan lisäksi omaa frankoprovensaalista murrettaan. Alppikiipeily oli vuonna 1873 aivan uutta intoa täynnä: vain kahdeksan vuotta aiemmin englantilainen Edward Whymper oli tehnyt ensimmäisen nousun Matterhornille, joka kohoaa laakson länsirajalla – juuri sellaisiin huippuihin viktoriaanisen ajan seikkailijat, isoisä mukaan lukien, alkoivat suunnata. Valle d'Aosta oli liittynyt Sardinian kuningaskuntaan jo kauan ennen varsinaista Italian yhdistymistä, joten se oli tuolloin yksi valtakunnan vanhimmista osista. Vuoristokylät elivät siihen aikaan karjanhoidosta ja kausittaisesta muuttoliikkeestä laaksoon ja pois, aivan toisenlaista elämää kuin nykypäivän matkailuvilske.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ita-maakunta-valle-d-aosta-51fe910f.jpg',
          lahde: 'Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Ximonic (Simo Räsänen)',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont_Blanc_from_Aosta_Valley.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ITA-valle-d-aosta-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  ESP: {
    "Castilla y León": {
      lyhyt: "Salamancan satoja vuosia vanha yliopisto opettaa Kastilja ja Leónissa samoissa keskiaikaisissa kivisaleissa.",
      pitka: "Kastilja ja León tunnetaan 'linnojen maana' – Ávilan täydellisesti säilyneet keskiaikaiset muurit kiertävät koko vanhankaupungin, ja Segoviassa roomalaisten rakentama vesijohtosilta kantaa yhä vettä ilman tippaakaan laastia liitoksissaan. Alueen laaja ylätasanko on myös viinimaata: Duero-joen varren Ribera del Duero -viinitilat tuottavat joitain Espanjan arvostetuimmista punaviineistä korkealla, viileällä ylängöllä. Kylät ovat harvassa ja etäisyydet pitkiä, mutta juuri se hiljaisuus on tehnyt alueesta suosikin niille, jotka etsivät Espanjasta jotain muuta kuin rantalomaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-castilla-y-leon-edf4e8e1.jpg',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Carlos Delgado',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Murallas_de_%C3%81vila_-_01.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-castilla-y-leon-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Andalucía": {
      lyhyt: "Andalusia on maailman suurin oliiviöljyn tuotantoalue – oliivipuiden rivit jatkuvat horisonttiin asti.",
      pitka: "Andalusian sydämessä kohoaa Granadan Alhambra, maurien rakentama linna- ja puutarhakokonaisuus, jonka kaiverretut seinät ja viileät sisäpihat vetävät puoleensa miljoonia kävijöitä vuosittain. Alueen kaupungit – Sevilla, Córdoba, Cádiz – kantavat yhä näkyvissä kerroksia maurien, juutalaisten ja kristittyjen yhteisestä historiasta. Isoisän matkavuonna 1873 Espanja oli lyhyeksi aikaa tasavalta, ja juuri Andalusiassa se horjui pahiten: Cádiz julistautui heinäkuussa omaksi 'kantonikseen' ja vaati täyttä itsehallintoa Madridin keskushallinnolta. Kapina levisi useisiin muihinkin andalusialaisiin kaupunkeihin ennen kuin hallitus sai järjestyksen palautettua.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-andalucia-ad1644ba.jpg',
          lahde: 'Slaunger, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Slaunger',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-andalucia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Castilla-La Mancha": {
      lyhyt: "Consuegran kylässä pyörivät yhä oikeat tuulimyllyt, jotka tekivät La Manchan tasangosta maailmankuulun.",
      pitka: "Toledo, alueen entinen pääkaupunki, tunnetaan 'kolmen kulttuurin kaupunkina', sillä sen kapeilla kujilla seisovat yhä rinnakkain kristittyjen, juutalaisten ja muslimien rakentamat rakennukset satojen vuosien takaa. La Manchan aavat pellot eivät kasvata vain tuulimyllyjen näkymää, vaan myös maailman arvostetuinta safrania ja lampaanmaidosta tehtyä Manchego-juustoa, jolla on suojattu alkuperänimitys. Kesät ovat täällä polttavan kuumia ja talvet yllättävän kylmiä – juuri se äärimmäinen mannerilmasto tekee sekä viineistä että juustosta niin voimakkaita.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-castilla-la-mancha-a53e8977.jpg',
          lahde: 'Misburg3014, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Misburg3014',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Toledo_cyl-panorama-mirador.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-castilla-la-mancha-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Aragón": {
      lyhyt: "Aragonian Pyreneiden rinteet täyttyvät joka talvi laskettelijoista, kun alueen hiihtokeskukset avaavat ovensa.",
      pitka: "Aragonian pääkaupungissa Zaragozassa kohoaa Pilarin basilika, jonka mukaan legenda kertoo neitsyt Marian ilmestyneen apostoli Jaakobille pylvään päällä – siitä koko rakennuksen nimi. Kaupungin vanhat tornit ja kirkot yhdistävät goottilaista ja mudéjar-tyyliä, kristittyjen ja maurien käsityöläisten satojen vuosien yhteistyön jälkiä, jotka UNESCO on nostanut maailmanperintöluetteloon. Ebro-joki halkoo koko aluetta pohjoisesta etelään ja on kastellut Aragonian viljelyksiä jo roomalaisajoista lähtien.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-aragon-58e265db.jpg',
          lahde: 'Willtron, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Willtron',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilica_del_Pilar_(Zaragoza,_Aragon).jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-aragon-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Extremadura": {
      lyhyt: "Harvaan asuttu Extremadura on yksi Euroopan parhaista tähtitaivaan katselupaikoista pimeiden, tähtikirkkaiden öidensä ansiosta.",
      pitka: "Extremadura on harvaan asuttu, mutta historiallisesti yllättävän painava alue: sekä Hernán Cortés että Francisco Pizarro, jotka kaatoivat atsteekkien ja inkojen valtakunnat, syntyivät täällä pienissä kylissä. Roomalaiskaupunki Méridan rauniot – teatteri, amfiteatteri ja silta – ovat parhaiten säilyneitä koko entisen Rooman valtakunnan alueella Italian ulkopuolella. Laajoilla tammimetsäisillä dehesa-laidunmailla kulkevat mustat iberialaissiat syövät talvisin pelkkiä tammenterhoja, mikä antaa alueen kuuluisalle jamón ibéricolle sen pähkinäisen maun.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-extremadura-9de6143c.jpg',
          lahde: 'Lmbuga (Luis Miguel Bugallo Sánchez), Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Lmbuga (Luis Miguel Bugallo Sánchez)',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Teatro_romano_de_M%C3%A9rida._Espa%C3%B1a-2.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-extremadura-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Cataluña": {
      lyhyt: "Barcelonan entiseen tehdaskortteliin syntynyt 22@-kaupunginosa on tehnyt siitä Espanjan vilkkaimman teknologiakeskuksen.",
      pitka: "Barcelonan kaupunkikuvaa hallitsee Antoni Gaudín keskeneräinen Sagrada Família -basilika, jota on rakennettu jo yli 140 vuotta ja jonka on määrä valmistua vasta 2020-luvulla. Katalonian kieli ja kulttuuri elävät vahvoina koulussa, kadulla ja mediassa, ja alueen identiteetti on aina ollut vahvasti omaehtoinen. Vuonna 1873 – samana vuonna kun isoisä matkasi maassa – tuo omaehtoisuus nousi Espanjan huipulle asti: barcelonalainen Francesc Pi i Margall toimi lyhytaikaisen ensimmäisen tasavallan presidenttinä ja ajoi koko maalle liittovaltiomallia, jossa Katalonia olisi saanut laajan itsehallinnon. Hänen hallituksensa kaatui vielä saman vuoden aikana, mutta ajatus elää yhä katalonialaisessa politiikassa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-cataluna-3236b9ba.jpg',
          lahde: 'Alvesgaspar, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Alvesgaspar',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sagrada_Familia_March_2015-10a.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-cataluna-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Galicia": {
      lyhyt: "Santiago de Compostelaan saapuu satoja tuhansia pyhiinvaeltajia vuosittain pitkin Camino de Santiago -reittiä.",
      pitka: "Galician rannikkoa pilkkovat syvät ría-lahdet, joissa kasvatetaan simpukoita ja saadaan mustekalaa niin runsaasti, että ne ovat alueen ruokakulttuurin ydin. 1800-luvun jälkipuoliskolla köyhyys ajoi valtavia joukkoja galicialaisia siirtolaisiksi meren taakse, erityisesti Kuubaan ja Argentiinaan; niin moni päätyi Buenos Airesiin, että argentiinalaiset kutsuvat yhä tänäkin päivänä kaikkia espanjalaisia yleisnimellä 'gallegos'. Mantereen luoteisin niemi, Fisterra, tunnettiin roomalaisille maailman läntisimpänä reunana – nimikin tarkoittaa 'maan loppua', vaikka rannikko jatkuu sen ohi vielä pitkälti pohjoiseen.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-galicia-387335eb.jpg',
          lahde: 'Enrique Dans, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Enrique Dans',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%ADa_de_Vigo_Galicia.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-galicia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Valenciana": {
      lyhyt: "Valencian Tiedeteiden kaupungin valkoiset, valaan luita muistuttavat rakennukset ovat nousseet kaupungin tunnusmerkiksi.",
      pitka: "Aidon paellan syntysija on Valencian eteläpuolella siintävä Albufera-järvi, jonka ranta-asukkaat keittivät riisiä, etanoita ja kanaa isossa matalassa pannussa jo vuosisatoja ennen kuin ruoasta tuli koko maan tunnetuin vientituote. Kaupunkia ympäröivät appelsiinitarhat tuoksuvat keväisin makealta kukinnalta, ja hedelmää viedään täältä ympäri Eurooppaa. Maaliskuussa koko kaupunki juhlii Las Fallas -festivaalia, jossa kadunkulmiin rakennetaan jättimäisiä pahvi- ja vahapatsaita – ja poltetaan ne yhtenä yönä poroksi satojen vuosien perinteen mukaisesti.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-valenciana-e563c92d.jpg',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Diego Delso',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lago_del_Pujol,_parque_natural_de_la_Albufera,_Valencia,_Espa%C3%B1a,_2022-12-18,_DD_16.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-valenciana-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Asturias": {
      lyhyt: "Asturialaisissa siiderikapakoissa siideri kaadetaan perinteisesti korkealta lasiin, jotta juoma saa raikkaan poreensa.",
      pitka: "Asturian vuoristo Picos de Europa on jyrkkää kalkkikiveä ja syviä rotkoja, ja sen suojissa elää yhä parisataa ruskeakarhua – yksi Länsi-Euroopan harvoista elinvoimaisista kannoista. Samalla vuoristoalueella sijaitsee Covadongan luola, kristityille pyhä paikka: sinne sijoitetaan vuoden 718 taistelu, josta kahdeksan vuosisataa kestänyt Reconquista sai alkunsa ja josta koko Espanjan kristillinen kuningaskunta lopulta kasvoi. Alue oli 1800-luvulla myös Espanjan hiilikaivosteollisuuden sydän, ja mustat kaivosmontut ja vihreät vuoret elävät yhä rinnakkain maisemassa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-asturias-cfc720f3.jpg',
          lahde: 'JavierOlivares, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'JavierOlivares',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lagos_de_Covadonga.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-asturias-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Murcia": {
      lyhyt: "Murciaa kutsutaan Euroopan vihanneskaapiksi, sillä sen aurinkoiset pellot tuottavat hedelmiä ja vihanneksia ympäri mannerta.",
      pitka: "Murcian rannikolla makaa Mar Menor, Euroopan suurin rannikkolaguuni, jonka lämmin ja suolainen vesi houkuttelee sekä lomailijoita että flamingoja. Alueen kaivoskaupunki Cartagena kaivoi vuosisatojen ajan hopeaa, lyijyä ja sinkkiä, ja raskas työ synnytti oman musiikkilajinsa, cante de las minas -kaivoslaulun. Vuonna 1873 juuri Cartagena nousi koko Espanjan tasavallan vastarinnan symboliksi: kaupunki julistautui omaksi itsenäiseksi 'kantonikseen' ja kesti hallituksen joukkojen piirityksen puoli vuotta, kunnes antautui vasta tammikuussa 1874 – pisimpään kestänyt kapinapesäke koko maassa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-murcia-f8924728.jpg',
          lahde: 'Anidae, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Anidae',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mar_Menor_desde_Villananitos.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-murcia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Foral de Navarra": {
      lyhyt: "Pamplonassa juostaan heinäkuussa sonnien edellä San Fermín -juhlan aikana, joka tunnetaan ympäri maailman.",
      pitka: "Navarra kätkee sisäänsä kaksi täysin erilaista maisemaa: pohjoisessa vihreät Pyreneiden rinteet ja etelässä Bardenas Realesin kuiva, tuulen kuluttama aavikko, jonka savikukkulat muistuttavat kuunpintaa. Nykyisin aluetta kuvataan usein ilmasta käsin – Bardenasin autiomaa toimi kuvauspaikkana muun muassa Game of Thrones -sarjassa. Vuonna 1873 Navarra oli aivan toisenlaisessa myrskyssä: kun Espanja julistautui tasavallaksi, kuningasmieliset karlistit nostivat kapinan ja tekivät Estellasta saman vuoden elokuussa oman \"pääkaupunkinsa\" – sota riehui juuri näillä main vuosia. Nykyään rauha on palannut, ja maaseudun kylät elävät viinistä, lampaanjuustosta ja vaelluksista Pyreneiden poluilla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-navarra-6008db2e.jpg',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Diego Delso',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bardenas_Reales,_Navarra,_Espa%C3%B1a,_2015-01-06,_DD_01.JPG',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-foral-de-navarra-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Madrid": {
      lyhyt: "Madrid on kasvanut Etelä-Euroopan vilkkaimmaksi startup-keskukseksi, jonne uusia yrityksiä perustetaan joka viikko.",
      pitka: "Madrid on Espanjan maantieteellinen ja hallinnollinen sydän: Puerta del Solin aukiolla on pieni laatta, \"Kilometri 0\", josta kaikki maan valtatiet lasketaan alkavaksi. Aukio ja sen tuntumassa oleva parlamentin talo, Cortes, ovat nähneet vuosisatojen käänteet, ja kaupunki elää myöhään – Pradon museon Velázquezit ja Goyat vetävät miljoonia kävijöitä Retiro-puiston kupeeseen. Juuri silloin, 11. helmikuuta 1873, tuossa Cortesin salissa tapahtui mullistus: espanjalaiset kansanedustajat julistivat maan tasavallaksi kuningas Amadeon luovuttua kruunusta, ja lyhytikäinen Ensimmäinen tasavalta kesti vajaat kaksi vuotta ennen kuin monarkia palasi. Nykyään madridilaiset kokoontuvat samalle aukiolle joka uudenvuodenyö syömään kaksitoista onnenrypälettä kellon lyödessä keskiyötä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-madrid-8ee540cb.jpg',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Carlos Delgado',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puerta_del_Sol_-_02.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-madrid-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "País Vasco": {
      lyhyt: "Bilbaon Guggenheim-museo muutti savuisen teollisuuskaupungin maailmankuuluksi arkkitehtuuri- ja designkohteeksi.",
      pitka: "Baskimaan rannikkokaupunki San Sebastián eli Donostia tunnetaan pintxos-baareistaan, joissa tiskit notkuvat pieniä suupaloja ja paikalliset kiertävät illalla baarista toiseen kuin ruokareitillä. Baskin kieli, euskera, on Euroopan vanhimpia yhä puhuttuja kieliä eikä sitä ole voitu yhdistää mihinkään muuhun tunnettuun kielikuntaan – se on säilynyt vuoristoisten laaksojen suojassa vuosituhansien ajan. Kolmas karlistisota toi Baskimaahan verisen piirityksen: kapinalliset saartoivat Bilbaon joulukuusta 1873 toukokuuhun 1874, ja kaupunki kesti raskaan pommituksen antautumatta ennen kuin piiritys lopulta murrettiin. Nykyään rauha on palannut, ja vihreät, lammaslaitumien pilkkomat kukkulat laskeutuvat suoraan Biskajanlahden kalastajasatamiin, joissa yhä lastataan tonnikalaa ja sardiinia.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-pais-vasco-f5a00242.jpg',
          lahde: 'Mariordo (Mario Roberto Durán Ortiz), Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Mariordo (Mario Roberto Durán Ortiz)',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:San_Sebastian_Playa_de_La_Concha_06_2012_2505.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-pais-vasco-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Canary Is.": {
      lyhyt: "Kanariansaarten kirkas ja pilvetön taivas tekee Teneriffasta ja La Palmasta maailman arvostetuimpia tähtitieteen tutkimuspaikkoja.",
      pitka: "Kanariansaaret ovat tulivuorisaaristo, joka sijaitsee lähempänä Länsi-Saharan rannikkoa kuin Manner-Espanjaa – vain reilun sadan kilometrin päässä Afrikasta. Teneriffan Teide kohoaa 3 715 metriin ja on paitsi Espanjan korkein huippu, myös maailman kolmanneksi korkein tulivuori mitattuna valtameren pohjasta lukien, sillä suurin osa sen massasta piileskelee veden alla. Ikivihreä subtrooppinen ilmasto sallii banaanien ja viinin viljelyn ympäri vuoden, ja maisema vaihtuu mustista laavarannoista sumuisiin laurisilva-metsiin muutaman kilometrin matkalla. Saarilla kasvaa myös harvinainen lohikäärmepuu, drago, jonka kuuluisin yksilö Icod de los Vinosin kaupungissa Tenerifellä on paikallisten mukaan lähes tuhat vuotta vanha ja yhä täydessä lehdessä; nykyään samoihin satamiin saapuu risteilyaluksia, jotka tuovat saarille miljoonia kävijöitä joka vuosi.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-canarias-81cd1ab3.jpg',
          lahde: 'Christoph Strässler, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Christoph Strässler',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:El_Teide,_Tenerife,_Spain.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-canary-is-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Cantabria": {
      lyhyt: "Altamiran luolan kalliomaalaukset Kantabriassa tunnetaan lempinimellä esihistorian Sikstuksen kappeli.",
      pitka: "Kantabria on Espanjan vihreä, sateinen kaista Biskajanlahden rannalla – paikalliset kutsuvat aluetta usein \"Espanjan luonnolliseksi puutarhaksi\". Picos de Europan jyrkät kalkkikivihuiput kohoavat lähes 2 600 metriin vain parinkymmenen kilometrin päässä rannikosta, ja niiden rinteillä laiduntavat lehmät tuottavat maitoa alueen tunnettuihin juustoihin. Comillasin pikkukaupungissa seisoo El Capricho, ainoa Antoni Gaudín suunnittelema rakennus Kantabriassa – satumainen, keraamisin auringonkukkalaatoin koristeltu huvila 1880-luvulta. Nykyään Santanderin satamakaupunki elää yhä kalastuksesta ja täyttyy kesäisin surffareista, jotka hakevat Atlantin aaltoja pitkin hiekkarantoja.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-cantabria-ae1f9ebc.jpg',
          lahde: 'Bikerhiker75, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Bikerhiker75',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Picos_de_Europa,_Cantabria.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-cantabria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "La Rioja": {
      lyhyt: "La Riojan Harossa kastellaan kesäkuussa toisiaan punaviinillä Batalla del Vino -juhlassa, joka värjää koko kaupungin viininpunaiseksi.",
      pitka: "La Rioja on Espanjan tunnetuin viinialue: Ebro-joen laakson rinteillä kasvaa tempranillo-rypälettä lähes yhtenäisenä mattona, ja sadonkorjuun aikaan syyskuussa koko maakunta tuoksuu käyvälle rypälemehulle. 1870-luvun alussa, samoihin aikoihin kun isoisän matka vei häntä halki Espanjan, Ranskan viinitarhat tuhoutuivat filloksera-kirvan tuhoisasta iskusta, ja ranskalaiset viinikauppiaat siirtyivät ostamaan ja tuottamaan viiniä Riojasta – he toivat mukanaan tammitynnyrit ja pitkän kypsytyksen tavat, jotka muokkasivat koko alueen viininvalmistusta pysyvästi. Haron rautatieaseman ympärille noussut Barrio de la Estación on yhä täynnä satavuotiaita viinitiloja, jotka ranskalaiset tuolloin perustivat. Nykyään Rioja Alta, Rioja Alavesa ja Rioja Oriental muodostavat yhdessä alueen, jonka viinit tunnetaan ympäri maailmaa laadukkaasta tammileimastaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-la-rioja-e1729cdd.jpg',
          lahde: 'Nicolás Pérez Gimilio, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Nicolás Pérez Gimilio',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vi%C3%B1edos_en_Rodezno,_La_Rioja.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-la-rioja-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Islas Baleares": {
      lyhyt: "Baleaareilla peritään nykyään matkailijoilta ympäristömaksua, jolla suojellaan saarten luontoa massaturismin paineessa.",
      pitka: "Baleaarit koostuvat neljästä hyvin erilaisesta saaresta: vilkas Mallorca, rauhallisempi Menorca, juhliva Ibiza ja pieni Formentera. Menorcalla on yli tuhat esihistoriallista talayot-kivirakennelmaa – pylväitä, torneja ja hautakammioita pronssikaudelta – ja koko saari on nimetty Unescon maailmanperintökohteeksi niiden ansiosta. Rannikko koostuu sadoista pienistä calas-poukamista, joiden turkoosi vesi ja valkoinen hiekka ovat tehneet saarista yhden Euroopan suosituimmista kesäkohteista aina 1950-luvun matkailubuumista lähtien. Ibizan ja Formenteran välistä merta peittävät laajat posidonia-merikasvustot, jotka pitävät veden poikkeuksellisen kirkkaana ja on itsessään nimetty Unescon maailmanperintökohteeksi; nykyään saaret täyttyvät joka kesä miljoonista turisteista, jotka hakevat juuri tätä kirkasta vettä ja valkoista hiekkaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-baleares-29af55ce.jpg',
          lahde: 'Roger green, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Roger green',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cala_Turqueta_-_Menorca.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-islas-baleares-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Ceuta": {
      lyhyt: "Ceuta on Espanjan alue Pohjois-Afrikassa – yksi EU:n vain kahdesta maarajasta Afrikkaan, vartioidun raja-aidan takana.",
      pitka: "Ceuta on pieni, tiiviisti asuttu kaupunki Gibraltarinsalmen etelärannalla, ja sen yllä kohoava Monte Hacho tunnettiin antiikin aikana yhtenä Herakleen pylväistä yhdessä Gibraltarin kalliovuoren kanssa. Kaupungissa elää rinnakkain neljä uskontokuntaa – kristityt, muslimit, juutalaiset ja hindut – ja paikalliset kutsuvat tätä sopuisaa rinnakkaineloa \"neljän kulttuurin\" kaupungiksi. Kirkko, moskeija, synagoga ja hindutemppeli sijaitsevat kaikki muutaman korttelin sisällä toisistaan. Nykyään Ceuta elää satamastaan ja rajakaupasta, ja sen kaduilla kuulee espanjaa ja arabiaa sekaisin samassa keskustelussa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-ceuta-4ff32d13.jpg',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Diego Delso',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puerto_de_Ceuta,_Espa%C3%B1a,_2015-12-10,_DD_61.JPG',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-ceuta-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Melilla": {
      lyhyt: "Melillassa on Barcelonan jälkeen Espanjan toiseksi eniten modernistisia rakennuksia, vaikka kaupunki sijaitsee Pohjois-Afrikassa.",
      pitka: "Melillan vanha kaupunginosa, Melilla la Vieja, on kokonainen linnoitettu niemi, jonka muurit, bastionit ja kaivetut käytävät rakennettiin 1500–1600-luvuilla puolustamaan kaupunkia meren ja maan puolelta. Espanja on hallinnut Melillaa vuodesta 1497 lähtien, mikä tekee siitä yhden Euroopan pisimpään yhtäjaksoisesti saman vallan hallitseman kaupungin. Kaupunki on nykyään yhtä monikulttuurinen kuin Ceuta: kristityt, muslimit, juutalaiset ja hindut elävät samalla pienellä niemimaalla, ja jokaisella yhteisöllä on omat pyhäkkönsä katujen varsilla. Vanhan linnoituksen kivimuurien sisällä toimii nykyään museoita ja kahviloita, ja maan alta paljastuu yhä uusia holvattuja käytäviä arkeologisissa kaivauksissa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/esp-maakunta-melilla-ac6bf9b5.jpg',
          lahde: 'AbdellahMJ93, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'AbdellahMJ93',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Melilla_la_vieja.JPG',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/ESP-melilla-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  GBR: {
    "England": {
      lyhyt: "Lontoossa kuulee kadulla yli 300 kieltä – kaupunki on yhä maailman vilkkaimpia rahoitus- ja kulttuurikeskuksia!",
      pitka: "Englannin etelärannikolla kohoaa yhä kymmeniä viktoriaanisia huvilaitureita, kuten Eastbournen lähes tuhatmetrinen laituri, joka houkuttelee kävijöitä ympäri vuoden. Cotswoldsin kaltaisissa maaseutukylissä hunajanväriset kivitalot ja lammaslaitumet näyttävät samoilta kuin postikorteissa sata vuotta sitten, vaikka kylän pubi tarjoilee nykyään yhtä hyvin intialaista currya kuin perinteistä paistia. Pohjois-Englannin entiset tehdaskaupungit, kuten Manchester ja Leeds, ovat muuttaneet savupiippunsa konserttisaleiksi ja gallerioiksi, mutta rautatieasemien kellotornit muistuttavat yhä höyryn ajasta. Kesäisin rantakaupunkien laitureilla soi karuselli ja tuoksuu friteerattu kala – huvi, joka on pysynyt suosittuna sukupolvesta toiseen.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/gbr-maakunta-england-88f805e8.jpg',
          lahde: 'Mrfinch, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Mrfinch',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Broadway-02.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/GBR-england-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Scotland": {
      lyhyt: "Skotlannissa viski ei ole vain juoma vaan koko identiteetti: tislaamoja on yli sata, ja moni kylä elää niistä.",
      pitka: "St Andrewsin Vanhalla radalla kävelee edelleen golffareita ympäri maailmaa, ja juuri täällä pelattiin vuonna 1873 ensimmäistä kertaa Open Championship, kun kisa siirtyi pois Prestwickista – tulvivilla väylillä voittanut Tom Kidd sai ensimmäisenä käteensä kuuluisan Claret Jug -pokaalin, samana vuonna kun isoisä lähti omalle matkalleen. Ylängöillä lampaat ja kauriit laiduntavat yhä samoilla rinteillä, mutta moni entinen tila on löytänyt uuden elannon retkeilijöistä ja luontovalokuvaajista. Edinburghin elokuu kuuluu koko maailmalle, kun Fringe-festivaali täyttää Vanhankaupungin kadut esiintyjistä joka kolkasta. Skotlantilaiset ovat ylpeitä maastaan tavalla, joka näkyy pienissäkin asioissa – vaikka vain siinä, miten intohimoisesti golfista tai jalkapallosta väitellään pubissa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/gbr-maakunta-scotland-caf1f6d0.jpg',
          lahde: 'Hikideas, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Hikideas',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Scottish_Highlands_Mountains.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/GBR-scotland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Wales": {
      lyhyt: "Walesissa aiempaa useampi lapsi opiskelee kokonaan kymriksi – kieli elää uudestaan koulujen ja television kautta.",
      pitka: "Etelä-Walesin laaksot kuhisivat 1870-luvulla hiilikaivoksista, ja Cardiffin satama oli nousemassa maailman vilkkaimmaksi hiilenvientisatamaksi juuri silloin kun isoisä kirjasi matkapäiväkirjaansa vuonna 1873. Nykyään entiset kaivosyhteisöt ovat vehreitä laaksoja, ja Blaenavonin Big Pit -museossa entiset kaivosmiehet opastavat vierailijoita satojen metrien syvyyteen maan alle asti. Snowdonian eli Yr Wyddfan vuoristossa vaeltajat ja lampaanpaimenet jakavat samat polut, ja paimenkoira saattaa yhä ohjata laumaa reitin poikki kesken vaelluksen. Walesilaiset rakastavat rugbya intohimoisesti: kun maajoukkue pelaa Cardiffin Principality-stadionilla, koko kaupunki kaikuu laulusta jo tuntia ennen ottelun alkua.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/gbr-maakunta-wales-1f96a7e7.jpg',
          lahde: 'Bill Harrison, Wikimedia Commons (CC BY-SA 2.0)',
          tekija: 'Bill Harrison',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Snowdonia_glacial_landscape_-_geograph.org.uk_-_7576667.jpg',
          lisenssi: 'CC BY-SA 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/GBR-wales-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Northern Ireland": {
      lyhyt: "Belfastin entinen telakka-alue, jossa rakennettiin Titanic, on nyt vilkas kaupunginosa museoineen ja toimistoineen.",
      pitka: "Antrimin rannikolla kohoaa Pohjois-Irlannin ainoa Unescon maailmanperintökohde, Giant's Causeway eli Pirunpengertie, jonka noin 40 000 kuusikulmaista basalttipylvästä on vetänyt matkailijoita puoleensa jo viktoriaaniselta ajalta lähtien – ensimmäinen Causeway-hotelli avasi ovensa jo vuonna 1836. Nykyään rannikkotietä kutsutaan Causeway Coastal Routeksi, ja sen mutkittelevat tiet houkuttelevat pyöräilijöitä ja moottoripyöräilijöitä ympäri vuoden. Moni tunnistaa alueen metsät ja lahdet myös suosituista tv-sarjoista, sillä Pohjois-Irlannin rannikko on toiminut kuvauspaikkana useille kansainvälisille tuotannoille. Pienissä satamakylissä paikalliset oppaat kertovat yhä tarinaa jättiläinen Finn MacCoolista, joka legendan mukaan rakensi pengertien päästäkseen Skotlantiin asti.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/gbr-maakunta-northern-ireland-52b0e387.jpg',
          lahde: 'Chmee2, Wikimedia Commons (CC BY 3.0)',
          tekija: 'Chmee2',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Giant%27s_Causeway_(14).JPG',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/GBR-northern-ireland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  POL: {
    "Masovian": {
      lyhyt: "Varsova on nykyään vilkas pääkaupunkiseutu, jossa pilvenpiirtäjät kohoavat Kulttuuripalatsin viereen ja bisnes sykkii ympärivuorokautisesti.",
      pitka: "Varsovan vanhakaupunki näyttää satoja vuosia vanhalta, mutta suurin osa siitä on rakennettu uudelleen tiiliä myöten toisen maailmansodan raunioista - yksi Euroopan kunnianhimoisimmista jälleenrakennusprojekteista, ja Unesco listasi sen juuri siksi maailmanperintöön. Kaupungin läpi virtaava Veikselinjoki on yhä hiekkarantoineen villi ja säännöstelemätön, mitä varsovalaiset kesäisin arvostavat uimapaikkoina keskellä miljoonakaupunkia. Keskustan pilvenpiirtäjien joukossa kohoaa yhä Kulttuurin ja tieteen palatsi, Neuvostoliiton 1950-luvulla lahjoittama jättirakennus, jota moni varsovalainen vieroksuu mutta jonka näköalatasanteelta näkee koko kaupungin kerralla. Nykyään kaupungissa asuu myös kymmeniätuhansia Ukrainasta paenneita, ja Varsova on jälleen risteysasema idän ja lännen välillä, aivan kuten se on ollut vuosisatojen ajan Euroopan itä- ja länsiosien rajamailla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-masovian-81d45576.jpg',
          lahde: 'Chris Olszewski, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Chris Olszewski',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Town_Market_Square_in_Warsaw,_2022,_01.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-masovian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Greater Poland": {
      lyhyt: "Poznańissa messuhallit täyttyvät vuosittain, sillä kaupunki on yhä Puolan vilkkain kauppa- ja messukaupunki.",
      pitka: "Poznańin raatihuoneen kellotapulissa kaksi mekaanista vuohta mättää sarvet yhteen joka päivä tasan kello kaksitoista - legendan mukaan ne palkittiin kaupungin juhlapadan pelastamisesta 1500-luvulla, ja turistit kerääntyvät torille joka ikinen keskipäivä katsomaan esitystä. Ostrów Tumskin saarella seisoo katedraali, jonka kryptassa lepäävät Puolan ensimmäiset hallitsijat - paikka, josta koko valtio sai alkunsa yli tuhat vuotta sitten. Vuonna 1873 mistään tästä ei saanut muistuttaa ääneen: Poznań kuului Preussille, ja juuri silloin Bismarckin niin sanotut toukokuun lait kavensivat katolisen kirkon ja puolan kielen asemaa kouluissa kaikkialla Preussin Puolassa. Nykyään kaupunki puhuu puolaa yhtä äänekkäästi kuin vuohet raatihuoneen kellossa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-greater-poland-8f39554f.jpg',
          lahde: 'Maksym Kozlenko, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Maksym Kozlenko',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2023-01-12_55_Old_Market_Square_in_Pozna%C5%84.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-greater-poland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Warmian-Masurian": {
      lyhyt: "Tuhannen järven maakunta elää purjeveneistä ja kesämökkeilijöistä, jotka täyttävät Masurian vesistöt kesäisin.",
      pitka: "Mazurian tuhannen järven maiseman lisäksi alueella on jotain vielä oudompaa: Elblągin kanava, jossa laivat eivät kulje vain vettä pitkin vaan myös kuivaa maata - kiskoille asetetut vaunut vetävät aluksen viiden nousun yli, kun korkeusero järvien välillä on liian jyrkkä sulkuporteille. Kanavaa rakennettiin vuosikymmenten ajan 1800-luvun puolivälistä lähtien, ja se kuului rakennusaikanaan Preussin Itä-Preussiin, kaukana mistään Puolan alueesta. Nykyään kanavalla risteilee enää turistiveneitä, mutta tekniikka toimii yhä samoilla periaatteilla kuin sen rakentajat aikoinaan suunnittelivat. Rannoilla asuu edelleen sekä katolisia varmialaisia että protestanttisia masuureja, kaksi eri väestöä samalla järviseudulla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-warmian-masurian-6b772946.jpg',
          lahde: 'Mkulikowski, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Mkulikowski',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jezioro_Dadaj_by_RecDronepl.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-warmian-masurian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "West Pomeranian": {
      lyhyt: "Szczecin on satamakaupunki, jonka telakat ja Odra-joen suisto pitävät merenkulun arjen keskiössä.",
      pitka: "Samana vuonna kun isoisä matkasi Euroopan halki, 1873, Szczecinin telakoilla rakennettiin sota-aluksia keisarilliselle Saksan laivastolle - kaupungin Vulcan-telakka oli tuolloin yksi koko Preussin suurimmista, eikä ajoitus ole sattumaa: Saksa oli juuri yhdistynyt, ja rautavaltiaiden rahat virtasivat uusiin telakoihin ja rautateihin. Nykyisin telakka-alueet ovat suurelta osin hiljentyneet, mutta Odran suistoon rakennetut kanavat ja sillat tekevät Szczecinistä yhä veden pilkkoman kaupungin, jota paikalliset kutsuvat leikillään Puolan Venetsiaksi. Jasne Błonian laaja niitty kaupungin keskustassa täyttyy kesäisin lenkkeilijöistä ja markkinoista, aivan toisenlaisesta elämästä kuin telakoiden meluisa arki. Alueen väestö vaihtui lähes kokonaan toisen maailmansodan jälkeen, kun saksalaiset asukkaat lähtivät ja tilalle muutti puolalaisia idästä - Szczecin on siis nuorempi puolalaiskaupunki kuin miltä se maisemaltaan näyttää.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-west-pomeranian-f5597750.jpg',
          lahde: 'Andrzej Otrębski, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Andrzej Otrębski',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szczecin_aerial_3a.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-west-pomeranian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lublin": {
      lyhyt: "Itäinen Lublinin seutu on Puolan vihannestarha: pellot ja hedelmätarhat ulottuvat horisonttiin asti.",
      pitka: "Lublinin linna kohoaa vanhankaupungin yllä kukkulalla, ja sen historia on synkempi kuin uusromanttinen ulkoasu antaa ymmärtää: 1800-luvulla se toimi Venäjän vankilana, jonne teljettiin muun muassa Tammikuun kansannousun osallistujia sen kukistamisen jälkeen. Linnan kappelissa säilyneet keskiaikaiset freskot ovat harvinainen näyte bysanttilaisesta maalaustaiteesta näin kaukana idässä. Nykyään linnassa on museo, ja Lublinin vanhakaupunki on täynnä kahviloita ja opiskelijoita - kaupungissa toimii useita yliopistoja, jotka tekevät siitä nuorekkaan vastapainon ympäröiville peltoaukeille. Puolan ja Ukrainan raja on lähellä, ja sen huomaa kaupungin kaduilla kuultavasta kielten kirjosta.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-lublin-7da761d2.jpg',
          lahde: 'Max Dziekański, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Max Dziekański',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lublin_Old_Town_Skyline.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-lublin-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Podlachian": {
      lyhyt: "Podlasiessa villi luonto voittaa: Białowieżan aarnimetsässä vaeltaa Euroopan viimeisiä visenttejä.",
      pitka: "Białowieżan visentit eivät ole aina olleet luonnonsuojelun ylpeys - Venäjän tsaarit pitivät metsää yksityisenä metsästysmaanaan, ja alue kuului vuosikymmenten ajan tsaarin henkilökohtaisiin metsästystiloihin, joissa hoviväki ampui visenttejä huvikseen samalla kun laji ajautui hitaasti sukupuuttoa kohti. Vasta 1900-luvulla, kun villit visentit oli jo metsästetty loppuun, laji palautettiin metsään eläintarhoista säilyneistä yksilöistä - nykyiset laumat polveutuvat kourallisesta selviytyjistä. Podlasien tasangolla asuu yhä myös Puolan suurin tataarivähemmistö, jonka esi-isät asettuivat seudulle jo 1600-luvulla ja joiden puiset moskeijat erottuvat kylämaisemasta. Metsän reunakylissä elanto tulee yhä pääosin maataloudesta ja matkailusta, jonka ainoa suuri vetonaula on juuri se sama eläin, jota täällä kerran melkein hävitettiin.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-podlachian-2b38eba0.jpg',
          lahde: 'Charles J. Sharp, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Charles J. Sharp',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:European_bison_(Bison_bonasus)_male_Bia%C5%82owieza.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-podlachian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Pomeranian": {
      lyhyt: "Gdańsk elää Itämeren rannasta kiinni, ja vanha telakka-alue on nyt taidetta ja tapahtumia täynnä.",
      pitka: "Gdańskin telakkahistoria ei ala Solidaarisuudesta, vaan paljon aiemmin: kaupunkiin perustettiin 1871 Saksan keisarillinen laivastotelakka, ja kaksi vuotta myöhemmin, 1873, se oli yhä vasta nuori, kiireinen rakennustyömaa keskellä muuten vanhaa hansakaupunkia. Motławan rantakadulla kohoavat porttikraanat ja kauppiastalot muistuttavat siitä, että Gdańsk eli meripuolen kaupasta jo kauan ennen mitään telakoita. Nykyään entiset telakka-alueet ovat täynnä museoita ja tapahtumia, ja juuri siellä, missä 1980-luvulla syntyi ammattiyhdistysliike joka lopulta mursi kommunistisen Puolan, käy nyt turisteja ottamassa valokuvia. Kaupungin saksankielinen nimi Danzig hävisi kartoilta vasta toisen maailmansodan jälkeen, kun koko asukaskunta vaihtui.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-pomeranian-160ae026.jpg',
          lahde: 'Andrzej Otrębski, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Andrzej Otrębski',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gdansk_Motlawa_6.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-pomeranian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lower Silesian": {
      lyhyt: "Wrocławin vanhaakaupunkia kiertäessä kannattaa laskea pronssisia patsaskääpiöitä, niitä piiloutuu satoja kadunkulmiin.",
      pitka: "Wrocławin sydän ei ole tori vaan Ostrów Tumski, Oderjoen saarelle rakennettu tuomiokirkkokortteli, jonka kaasulyhdyt sytytetään yhä käsin joka ilta - yksi harvoista paikoista Euroopassa, jossa katuvalaistus on jätetty tarkoituksella vanhanaikaiseksi. 1873 kaupunki tunnettiin nimellä Breslau ja oli Preussin Sleesian pääkaupunki, saksankielinen ja protestanttisenemmistöinen suurkaupunki. Toisen maailmansodan jälkeen lähes koko väestö vaihtui, kun saksalaiset karkotettiin ja tilalle muutti puolalaisia, monet menetetyiltä itäisiltä alueilta - Wrocław on siis kaupunki, joka rakennettiin uudelleen paitsi kivistä myös ihmisistä. Oderjoki kuljettaa yhä rahtia kaupungin läpi, aivan kuten isoisän aikaan, jolloin joki oli Sleesian tärkein kauppaväylä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-lower-silesian-ffd26beb.jpg',
          lahde: 'Maksym Kozlenko, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Maksym Kozlenko',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2019-07-02_Market_Square_in_Wroc%C5%82aw.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-lower-silesian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Łódź": {
      lyhyt: "Entiset tehdashallit ovat Łódźissa nyt ostoskeskuksia ja gallerioita, ja kaupunki tunnetaan elokuvakoulustaan.",
      pitka: "Juuri tuolloin, 1873, Łódź oli Euroopan nopeimmin kasvava kaupunki - vielä vuosisadan alussa parin tuhannen asukkaan kylä oli parissa vuosikymmenessä paisunut kymmeniksituhansiksi, kun puuvillatehtaat imivät työväkeä ympäri Venäjän keisarikuntaa. Puolalaiset, juutalaiset, saksalaiset ja venäläiset elivät ja kilpailivat samassa kaupungissa, ja juuri tästä sekamelskasta syntyi myöhemmin Władysław Reymontin romaani \"Luvattu maa\", joka kuvaa kaupungin raakaa rahanhimoa. Tehtailijoiden Karol Scheiblerin ja Izrael Poznańskin palatsit seisovat yhä keskustassa muistutuksena siitä, kuinka suunnattomia omaisuuksia puuvillasta kerättiin samalla kun tehtaiden työläiset asuivat ahtaissa korttelitaloissa. Nykyään kaupunki hakee uutta identiteettiä muotoilun ja kulttuurin kautta, mutta sen kadunkulmat kertovat yhä tarinaa siitä äkkirikastumisen ja kurjuuden kaupungista, jonka isoisä olisi nähnyt.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-lodz-f8954c5a.jpg',
          lahde: 'Mietek Ł, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Mietek Ł',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Manufaktura_-_panoramio.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-lodz-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Kuyavian-Pomeranian": {
      lyhyt: "Toruńissa leivotaan perinteisiä piparkakkuja, ja Kopernikuksen syntymäkaupunki elää tiedehistoriastaan.",
      pitka: "Vuonna 1873 Toruń juhli jotain hyvin täsmällistä: kaupungin kuuluisimman pojan, Mikołaj Kopernikuksen, syntymästä tuli kuluneeksi tasan 400 vuotta, ja juhlallisuudet keräsivät tiedemiehiä ja juhlijoita ympäri Eurooppaa keskiaikaiseen tiilikaupunkiin. Toruń kuului tuolloin Preussin Länsi-Preussiin, mutta kaupungin goottilaiset tiilikirkot ja porvaristalot olivat pystyssä jo silloin lähes muuttumattomina - toisin kuin monet muut alueen kaupungit, Toruń selvisi molemmista maailmansodista suhteellisen ehjänä. Veikselin rantaa pitkin kulkivat vielä 1870-luvulla viljalastit satamiin, ja joki oli kaupungin elinehto kauan ennen rautateitä. Nykyään opiskelijakaupunki elää yliopistostaan ja tiedehistoriastaan, mutta juuri se pyöreä vuosiluku 1873 muistuttaa, kuinka tarkkaan isoisän matka-ajan ihmiset osasivat laskea juhlavuosiaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-kuyavian-pomeranian-88f987f8.jpg',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Jakub Hałun',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Widok_z_wie%C5%BCy_ratuszowej_w_Toruniu_na_wsch%C3%B3d,_20210908_1551_2750.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-kuyavian-pomeranian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Subcarpathian": {
      lyhyt: "Rzeszówin seutua kutsutaan Lentolaaksoksi, sillä ilmailuteollisuus työllistää alueella tuhansia.",
      pitka: "Tämä seutu ei 1800-luvun jaetussa Puolassa kuulunut Preussille eikä Venäjälle vaan Itävalta-Unkarille, Galitsian maakuntana - ja se teki ihmisten arjesta yllättävän erilaista kuin muualla jaetussa Puolassa. Wienin hallitsijat sallivat puolan kielen kouluissa ja virastoissa, ja Galitsialla oli oma maapäivä Lwówissa, kun taas Venäjän ja Preussin puolella puolan kieltä ajettiin systemaattisesti alas. Toisaalta Galitsia oli Euroopan köyhimpiä maakuntia, ja moni Rzeszówin seudun talonpoika lähti juuri noihin aikoihin siirtolaiseksi Amerikkaan nälän ja tilattomuuden vuoksi. Nykyään sama seutu tunnetaan päinvastaisesta: lentokoneiden moottoreita ja siipiä valmistavista tehtaista, jotka työllistävät insinöörejä ympäri Puolaa - köyhästä maakunnasta on tullut yksi maan teknologisimmista.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-subcarpathian-961c5658.jpg',
          lahde: 'Silar, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Silar',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:02024_0170_Old_Town_in_Rzeszow.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-subcarpathian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lesser Poland": {
      lyhyt: "Kraków on Puolan turistimagneetti, jonka vanhakaupunki ja Wawel täyttyvät kävijöistä ympäri vuoden.",
      pitka: "1800-luvun jälkipuoliskolla Wawelin linnamäki ei ollut mikään kansallispyhäkkö, vaan Itävallan armeijan varuskunta: linnan saleissa majaili sotilaita ja osa rakennuksista toimi sairaalana, eikä kukaan vielä puhunut sen palauttamisesta puolalaisille. Vasta 1900-luvun alussa Wawel vapautettiin sotilaskäytöstä ja aloitettiin sen hidas muuttaminen siksi kansalliseksi symboliksi, jollaisena se nykyään tunnetaan. Kraków oli silti jo tuolloin Galitsian merkittävin kulttuurikaupunki, koska Itävallan valtaa lievempi sensuuri salli Jagellonian yliopiston opettaa puolaksi silloinkin, kun se oli muualla Puolassa lähes mahdotonta. Nykyään linnanmäelle nousee vuosittain miljoonia kävijöitä, jotka harvoin arvaavat, että sama paikka haisi aikoinaan enemmän hevoselta ja asehuoltamolta kuin historialta.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-lesser-poland-5fe4e2d8.jpg',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Jakub Hałun',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20200826_Widok_na_Wawel_znad_Wis%C5%82y_w_Krakowie_1749_1331.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-lesser-poland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Lubusz": {
      lyhyt: "Zielona Góra on Puolan viinialuetta, ja rajaseutu Saksaan näkyy arjessa ja kaupassa.",
      pitka: "Zielona Górassa on juhlittu viininkorjuuta Winobranie-nimisillä juhlilla jo 1800-luvun puolivälistä lähtien: kaupunki - silloiselta saksankieliseltä nimeltään Grünberg - tunnettiin jo tuolloin koko Preussin pohjoisimpana viinialueena. Seutu kuului tuolloin kokonaan Saksaan, eikä siellä juuri asunut puolankielistä väestöä; nykyinen puolalaisuus tuli vasta toisen maailmansodan jälkeen rajojen siirryttyä. Viinitarhat kärsivät 1900-luvulla sodista ja tuholaisista lähes sukupuuttoon, mutta harrastajat elvyttivät viininviljelyn uudelleen vuosikymmeniä sitten. Nykyään syyskuinen Winobranie on yhä kaupungin suurin juhla, ja se yhdistää saksalaisen viinikaupungin perinteen puolalaiseen nykyasukkaaseen tavalla, joka olisi 1800-luvulla tuntunut täysin mahdottomalta.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-lubusz-aa56ddc3.jpg',
          lahde: 'Dguendel, Wikimedia Commons (CC BY 3.0)',
          tekija: 'Dguendel',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zielona_G%C3%B3ra,_vineyard.jpg',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-lubusz-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Silesian": {
      lyhyt: "Katowicen ympäristössä hiilikaivokset vaihtuvat hiljalleen kulttuuriin, kuten NOSPR-konserttitaloon.",
      pitka: "Keväällä 1873 koko Euroopan talous horjui, kun Wienin pörssiromahdus päätti Saksan ja Itävallan yhdistymisen jälkeisen villin sijoitusbuumin, ja se tuntui rajusti myös Yläsleesian hiili- ja terästeollisuudessa, jonka tehtaisiin oli juuri kaadettu valtavia summia lainarahaa. Katowicen ympäristö oli tuolloin nopeasti kasvava teollisuusseutu, jonka työväestö tuli kylistä kaivoksiin ja masuuneihin - aivan toisenlaista elämää kuin nykyisen kaupungin toimistotornit ja konserttitalot. NOSPR-konserttitalon vieressä sijaitsee yhä vanha kaivostorni, jonka ympärille on rakennettu Sleesian museo maan alle louhittuihin tiloihin. Nykyään alueen hiilikaivoksia suljetaan yksi kerrallaan, ja Katowice yrittää tehdä samaa siirtymää kohti uutta taloutta, jota koko Eurooppa yritti epätoivoisesti löytää samana keväänä 1873.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-silesian-6ee921be.jpg',
          lahde: 'Aliceinthealice, Wikimedia Commons (CC0)',
          tekija: 'Aliceinthealice',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Spodek_and_the_International_Congress_Centre_in_Katowice_01.jpg',
          lisenssi: 'CC0 1.0',
          lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-silesian-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Świętokrzyskie": {
      lyhyt: "Kielcen seudulla kohoavat Pyhänristinvuoret, Puolan vanhimmat ja kuluneimmat tunturit.",
      pitka: "Pyhänristinvuorten juurella, Nowa Słupian kylän liepeillä, on löydetty satoja muinaisia rautasulattouuneja, joissa jo roomalaisajalla poltettiin suoperäistä rautamalmia - alue oli antiikin Euroopan yksi suurimmista raudantuotantokeskuksista kauan ennen Puolan syntyä. Sama rautaperinne jatkui vuosisatoja, ja 1800-luvun alussa seutua kutsuttiin Vanhaksi Puolan teollisuusalueeksi, kun sinne rakennettiin valtion tuella masuuneja ja rautatehtaita. Vuosisadan jälkipuoliskolla tämä vanha teollisuusalue oli kuitenkin jo taantumassa, koska uudet, tehokkaammat hiili- ja terästehtaat Yläsleesiassa veivät investoinnit ja työvoiman - alue kuului Venäjän Puolaan, jossa teollistuminen keskittyi nyt muualle. Nykyään entiset sulatot ovat museoita, ja vuoret houkuttelevat vaeltajia enemmän kuin kaivosmiehiä.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-swietokrzyskie-55a3b13a.jpg',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Jakub Hałun',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie,_20210402_1603_6159.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-swietokrzyskie-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Opole": {
      lyhyt: "Opole on Puolan vähäväkisin voivodikunta, hiljainen seutu jossa saksankielinen vähemmistö on näkyvä.",
      pitka: "Samat toukokuun lait, jotka isoisä olisi kohdannut Poznańin seudullakin, ulottuivat vuonna 1873 myös Opolen maaseudulle, missä kyläkoulujen opetuskieli vaihdettiin väkisin saksaksi - täällä ne kuitenkin iskivät köyhään maalaisväestöön, joka puhui kotonaan sleesian murretta, ei aivan puolaa eikä aivan saksaa. Kaupunkilaiselämä oli tuolloin vaatimatonta verrattuna Poznańin messuvilinään; Opole eli enemmän ympäröivän maaseudun tahdissa kuin suurkaupunkina. Tuo kaksikielinen menneisyys näkyy yhä osassa kyliä, joissa kadunnimet on kirjoitettu kahdella kielellä. Nykyisin hiljaisuutta rikkoo kesäisin Puolan suurin iskelmäfestivaali, joka on kokoontunut Opoleen jo vuosikymmenten ajan ja tuo kaupunkiin enemmän väkeä kuin koskaan isoisän aikaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/pol-maakunta-opole-94ec309c.jpg',
          lahde: 'Daviidos, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Daviidos',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1_Market_Square_in_Opole_Fuerstenhaus_2019.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/POL-opole-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  AUT: {
    "Niederösterreich": {
      lyhyt: "Wienin ympärillä leviää Ala-Itävalta, jonka Wachaun jokilaakso on täynnä viinitarhoja aina Tonavan rantaan asti.",
      pitka: "Ala-Itävalta ulottui vuonna 1873 aina Wienin ytimeen asti, sillä pääkaupunki irtautui omaksi osavaltiokseen vasta vuonna 1922 – siihen saakka Wien oli virallisesti tämän maakunnan hallintokeskus. Nykyisin maakunnan oma pääkaupunki on St. Pölten, mutta komein rakennus löytyy silti muualta – Melkin barokkiluostari kohoaa jyrkällä kalliolla Tonavan yllä, ja sen kultainen kirjastosali hämmästyttää kävijöitä yhä kuten munkkeja vuosisatoja sitten. Etelämpänä Semmeringin rautatie kiemurtelee Alppien yli niin taidokkaasti, että vuonna 1854 valmistunut rata on koko Euroopan ensimmäinen vuoristorautatie ja nykyään UNESCOn maailmanperintökohde. Ala-Itävalta on siis maakunta, jossa keisarikunnan pääkaupunki ja hiljaiset kylät jakoivat pitkään saman osoitteen.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-niederosterreich-cc3700ff.jpg',
          lahde: 'Vitold Muratov, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Vitold Muratov',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Danube_as_seen_from_Abbey_Melk.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-lower-austria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Steiermark": {
      lyhyt: "Steiermarkia kutsutaan Itävallan vihreäksi sydämeksi – täällä kurpitsansiemenöljy on lähes joka ruoan mauste.",
      pitka: "Steiermarkia kutsutaan Itävallassa lempinimellä 'vihreä maakunta', sillä yli 60 prosenttia sen pinta-alasta on metsää – enemmän kuin missään muussa osavaltiossa. Pohjoisessa maisemaa hallitsee silti toisenlainen jättiläinen: Erzbergin rautavuori Eisenerzin kupeessa on tuottanut malmia yli 1300 vuotta, ja vuodesta 1890 louhinta on muovannut siitä valtavan portaikkomaisen pyramidin, joka näkyy kauas ympäristöön. Graz tunnetaan nykyään muotoilun kaupunkina, mutta rautavuori muistuttaa siitä, mistä koko Steiermarkin vauraus aikanaan kasvoi. Kurpitsansiemenöljyn rinnalla malmi on siis se toinen, raskaampi aine, joka on muovannut aluetta vuosisatojen ajan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-steiermark-a030f180.jpg',
          lahde: 'DerGraueWolf, Wikimedia Commons (CC BY 3.0)',
          tekija: 'DerGraueWolf',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Erzberg_ip1005.jpg',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-styria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Tirol": {
      lyhyt: "Tirolissa vuoret määräävät arjen: Innsbruckista pääsee hiihtämään tunnissa, ja moni asukas tekee sen töiden jälkeen.",
      pitka: "Rajat olivat vuonna 1873 toisenlaiset: Tirol ulottui tuolloin Brennerin solan yli aina Bolzanoon ja Trentoon asti, kunnes ensimmäisen maailmansodan jälkeinen Saint-Germainin rauha 1919 luovutti eteläisen puoliskon Italialle. Innsbruckin kupeessa kohoava Bergisel-mäki on nähnyt kumpaakin Tirolin aikakautta: vuonna 1809 talonpoikaiskapinallinen Andreas Hofer taisteli täällä Baijerin ja Ranskan joukkoja vastaan, ja sama rinne on nykyään moderni mäkihyppyrinne, jolla Innsbruck isännöi talviolympialaiset sekä 1964 että 1976. Hiihto on tänään arkipäivää, mutta vuori on aina ollut myös rajalinja ja taistelupaikka. Puolet vanhasta Tirolista jäi siis rajan taakse – toinen puoli näkyy yhä Etelä-Tirolina Italian kartalla.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-tirol-00a94eaa.jpg',
          lahde: 'Andrew Bone, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Andrew Bone',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Innsbruck_Altstadt_panorama_(32059977993).jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-tyrol-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Oberösterreich": {
      lyhyt: "Linzin tehdaskaupunki on muuttunut digitaalisen taiteen keskukseksi, kun Ars Electronica täyttää kadut valoilla.",
      pitka: "Ylä-Itävallan tunnetuin aarre ei ole Linzin digitaide vaan suola: Hallstattin kaivos Salzkammergutin järvialueella on maailman vanhin yhä toimiva suolakaivos, ja siellä on louhittu suolaa lähes 7000 vuoden ajan. Pieni puutalokylä on niin kuvankaunis, että se on viime vuosina hukkunut omaan suosioonsa – aasialaisten televisiosarjojen innoittamat matkailijalaumat täyttävät rannan niin tiiviisti, että paikalliset ovat vaatineet risteilybussien määrän rajoittamista. Linzin teollisuuskaupunki ja Hallstattin idyllinen kylä ovat saman maakunnan kaksi ääripäätä: toinen katsoo tulevaisuuteen valoteoksin, toinen kantaa nimessään koko esihistoriallista Hallstatt-kulttuuria, joka sai alkunsa juuri täältä. Kumpikin vetää väkeä puoleensa syistä, jotka eivät voisi olla erilaisempia.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-oberosterreich-6c333129.jpg',
          lahde: 'Kevin Poh, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Kevin Poh',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hallstatt_-_8856135370.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-upper-austria-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Kärnten": {
      lyhyt: "Kärntenin kirkkaat vuoristojärvet, etenkin Wörthersee, täyttyvät kesäisin uimareista ja purjelautailijoista.",
      pitka: "Klagenfurtin torilla lojuu outo hirviö: pronssinen Lindwurm-lohikäärme, jonka pää valettiin vuonna 1590 keskiajalla löydetyn kallon muotoiseksi. Aikalaiset pitivät kalloa todisteena lohikäärmeestä, mutta 1800-luvun tutkijat tunnistivat sen lopulta jääkauden villakarvaisen sarvikuonon fossiiliksi – yksi varhaisimmista tieteellisistä eläinrekonstruktioista. Legendan mukaan kaupunki sai nimensäkin tästä hirviöstä: ritarit onkivat sen joesta härkää syöttinä käyttäen, ja \"Klagenfurt\" viittaa siihen valituksen täyttämään kahlaamoon. Kesäisin järvien rannoilla uivien kärntenläisten arkeen mahtuu siis yhä tämä keskiaikainen kauhutarina, joka katsoo torilta ohikulkijoita silmästä silmään.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-karnten-85a85d1a.jpg',
          lahde: 'Carsten Steger, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Carsten Steger',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_W%C3%B6rthersee_(view_from_the_southeast).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-carinthia-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Salzburg": {
      lyhyt: "Salzburgin vanhakaupunki elää yhä Mozartista: kesän musiikkijuhlat täyttävät torit ja kirkot joka ilta.",
      pitka: "Kaupungin nimi tulee suolasta, ei musiikista: Salzburg tarkoittaa suolalinnaa, ja keskiajalla juuri suolakauppa teki paikallisista arkkipiispoista niin rikkaita, että he rakensivat kalliolle Hohensalzburgin linnoituksen – yhden Euroopan suurimmista ja parhaiten säilyneistä keskiaikaisista linnoista. Linnoitusta ei koskaan vallattu taistelussa; ainoa kerta kun se antautui, oli vuonna 1800, jolloin se luovutettiin ranskalaisille ilman taistelua kaupungin säästämiseksi. Mozart-kesäjuhlien ja vanhankaupungin kahviloiden alla kolkuttaakin siis varsin toisenlainen historia – valtaa ja vaurautta, joka rakennettiin suolan, ei nuottien, päälle. Linnoitus kohoaa yhä kaupungin yllä muistuttamassa, että Salzburg oli ennen kaikkea kauppapaikka jo kauan ennen Mozartia.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-salzburg-74edb5a4.jpg',
          lahde: 'Jiuguang Wang, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Jiuguang Wang',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Town_Salzburg_across_the_Salzach_river.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-salzburg-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Burgenland": {
      lyhyt: "Burgenland on Itävallan nuorin osavaltio, ja Neusiedler-järven ruovikot ovat nyt Euroopan tärkeimpiä lintualueita.",
      pitka: "Vuonna 1873 Burgenlandia ei ollut olemassa edes kartalla: koko alue kuului tuolloin Unkarin kuningaskuntaan, eikä isoisä olisi löytänyt sitä Itävallan puolelta ollenkaan. Vasta ensimmäisen maailmansodan jälkeen, vuonna 1921, entinen Länsi-Unkari liitettiin uuteen Itävaltaan ja sai nimensä Burgenland – siksi se on maan nuorin osavaltio. Alueen musiikkihistoria on silti vanhaa: säveltäjä Joseph Haydn toimi lähes koko työuransa, vuosina 1761–1803, Esterházyn ruhtinassuvun kapellimestarina Eisenstadtissa, ja suuri osa hänen sinfonioistaan syntyi juuri siellä. Neusiedler-järven lintuparvien lisäksi Burgenlandissa kaikuu siis yhä 1700-luvun hovimusiikki – vaikka koko maakunta puuttui vielä tuolloin kartalta kokonaan.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-burgenland-6381c7b9.jpg',
          lahde: 'LitterART, Wikimedia Commons (CC BY 2.0)',
          tekija: 'LitterART',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:NEUSIEDLERSEE_._LAKE_NEUSIEDL.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-burgenland-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Vorarlberg": {
      lyhyt: "Vorarlbergissa tekstiiliteollisuuden perintö näkyy nyt rohkeana arkkitehtuurina, josta Bregenzerwaldin kylät ovat kuuluisia.",
      pitka: "Vuonna 1919 Vorarlbergin asukkaat äänestivät kansanäänestyksessä yllättävän selvästi: 80,7 prosenttia halusi liittää maakunnan Sveitsiin eikä jäädä Itävaltaan. Suurvallat eivät kuitenkaan antaneet asialle tilaa Saint-Germainin rauhansopimuksessa, joten Vorarlberg jäi Itävaltaan – ajatus elää silti yhä paikallisena vitsinä ja pienenä identiteettikysymyksenä. Kesäisin Bregenzin järvifestivaalilla nähdään maailman suurin vedenpäällinen näyttämö, jolla oopperoita lavastetaan keskellä Bodenjärveä satojen tuhansien katsojien edessä. Vuorten eristämä Vorarlberg on siis aina katsonut länteen vähintään yhtä usein kuin itään, kohti muuta Itävaltaa.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-vorarlberg-29106fd2.jpg',
          lahde: 'Asurnipal, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Asurnipal',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bregenz-Lake_Constance-Ship_Vorarlberg-02ASD.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-vorarlberg-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
    "Wien": {
      lyhyt: "Wien nousee joka vuosi maailman parhaiten asuttavien kaupunkien kärkeen – kahvilakulttuuri on siihen yksi syy.",
      pitka: "Isoisä saapui Wieniin täydellisenä vuonna: 1873 kaupunki isännöi maailmannäyttelyn, johon saapui yli seitsemän miljoonaa kävijää ja 53 000 näytteilleasettajaa 35 maasta – ensimmäistä kertaa mukana oli myös Japani. Näyttelyalue sijaitsi Praterin puistossa, ja sen keskellä kohosi Rotunda, tuolloin maailman suurin kupolirakennus, kaksi kertaa Pietarinkirkkoa leveämpi; se paloi lopulta 1937, mutta Prater on yhä Wienin suosituin huvipuisto. Hallinnollisesti kaupunki oli tuolloin yhä osa Ala-Itävaltaa – omaksi osavaltiokseen se irtautui vasta 1922. Isoisän päiväkirja ja nykyinen huvipuisto kohtaavat siis juuri Praterissa: sama maaperä, mutta täysin eri vuosisadan ihmeet.",
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/aut-maakunta-wien-21260241.jpg',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Dietmar Rabich',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wien,_Prater,_Riesenrad_--_2018_--_3161.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260922/AUT-vienna-1873.jpg',
          lahde: 'Matkakirjan havainnekuva vuodelta 1873',
          tekija: 'Matkakirja',
          lisenssi: 'Matkakirjan oma kuvitus',
          havainnekuva: true,
          vuosi: 1873,
        },
      ],
    },
  },
  /*
   * GRC (Sisältökirjuri 25.9.2026, Fablen tilaus löydös 115:n
   * yhteydessä — omistaja pelaa Kreikkaa). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.GRC:n tunnuksia
   * (Natural Earthin `name`-kenttä latinaistettuna). Vain `lyhyt`
   * tässä erässä, kuten muillakin mailla. `pikkukuva` (löydös 115)
   * odottaa kuvaputken toimitusta erikseen.
   */
  GRC: {
    Attiki: {
      lyhyt: 'Ateenan Akropolis kohoaa yhä keskustan yllä, mutta rannikolla Ateenan Riviera houkuttelee uimaan aivan kaupungin kupeessa.',
      pitka: 'Ateena on nykyään yli kolmen miljoonan asukkaan metropoli, mutta kun siitä tehtiin pääkaupunki 1834, se oli sodan runtelema noin 4000 asukkaan pikkukaupunki Akropoliin juurella. Isoisän aikaan 1873 Akropoliin laella seisoi yhä keskiaikainen frankkitorni, joka purettiin vasta 1874–1875 Heinrich Schliemannin rahoilla, jotta kukkula näyttäisi taas antiikkiselta. Samoihin aikoihin koko maa kuohui Lavrionin kaivoksista: ranskalais-italialainen yhtiö rikastui antiikin kaivosmiesten jättämästä kuonasta, ja kiista valtion kanssa ratkesi vasta helmikuussa 1873 tehdyllä sopimuksella. Sounionin niemellä Poseidonin temppelin pylväät katsovat yhä merelle Attikan eteläkärjessä.',
    },
    'Kentriki Makedonia': {
      lyhyt: 'Thessaloniki on Kreikan toiseksi suurin kaupunki, ja sen rantabulevardilla Valkoinen torni katsoo yhä Thermaisenlahdelle.',
      pitka: 'Thessalonikissa bysanttilaiset kirkot, osmanien kylpylät ja 1900-luvun kerrostalot seisovat samoilla kaduilla, ja kaupungin yllä näkyy kirkkaalla säällä Olymposvuori. Vuonna 1873 kaupunki oli osmanien Selanik eikä kuulunut Kreikkaan – se liitettiin Kreikkaan vasta Balkanin sodassa 1912. Rantabulevardin tornia kutsuttiin silloin vielä Veritorniksi, sillä se oli pahamaineinen vankila; valkoiseksi sen kalkitsi vasta 1890 vanki, joka sai työstä vapautensa. Kaupungin suurin väestöryhmä olivat 1400-luvun lopulla Espanjasta karkotettujen juutalaisten jälkeläiset, jotka puhuivat juutalaisespanjaa – yhteisö tuhottiin lähes kokonaan, kun natsit karkottivat sen Auschwitziin 1943.',
    },
    Kriti: {
      lyhyt: 'Kreeta on Kreikan suurin saari, ja sen vuoristoisella Samarian rotkolla vaeltaa tuhansia retkeilijöitä joka kesä.',
      pitka: 'Kreeta on kuin oma pieni mantereensa: Valkoisten vuorten huiput, oliivilehdot ja oma murre, jolla lauletaan yhä improvisoituja mantinades-säkeitä lyyran säestyksellä. Vuonna 1873 saari kuului vielä Osmanivaltakuntaan, ja suuren kapinan muisto oli tuore: 1866 Arkadin luostarin puolustajat räjäyttivät ruutivarastonsa mieluummin kuin antautuivat, ja uutinen herätti myötätuntoa kaikkialla Euroopassa. Kreeta sai itsehallinnon 1898 ja liitettiin Kreikkaan vasta 1913. Knossoksen palatsi odotti isoisän aikaan vielä maan alla – ensimmäiset kaivaukset tehtiin 1878 ja suuret Arthur Evansin johdolla vasta vuodesta 1900.',
    },
    Peloponnisos: {
      lyhyt: 'Korinton kanava halkaisee Peloponnesoksen niemimaan kapeasta kannaksesta, ja sillalta autoilijat katsovat yli 70 metriä alas.',
      pitka: 'Peloponnesos on vuorten, oliivitarhojen ja pienten satamien niemimaa, jonka eteläkärjessä Manin kivitorneissa asui aikoinaan sukuja, jotka kävivät verikostoa keskenään sukupolvesta toiseen. Täällä on myös itsenäisen Kreikan ensimmäinen pääkaupunki Nafplio, jonka kirkon portailla maan ensimmäinen valtionpäämies Ioannis Kapodistrias murhattiin 1831. Isoisän kulkiessa 1873 laivalla ei vielä päässyt Korintin kannaksen läpi, sillä kanavaa alettiin kaivaa vasta 1881. Myös Mykenen kuninkaanhaudat olivat löytämättä: leijonaportti oli näkyvissä, mutta Heinrich Schliemann kaivoi kultaiset kuolinnaamiot esiin vasta 1876.',
    },
    Thessalia: {
      lyhyt: 'Thessalian pystyjen kalliopylväiden laella kohoavat Meteoran luostarit, joihin munkit kiipesivät ennen tikapuilla ja köysillä.',
      pitka: 'Thessalia on Kreikan viljakamari: laaja, tasainen tasanko, jota vuoret kiertävät joka puolelta ja jonka keskellä Larisa on kasvanut maakunnan suurimmaksi kaupungiksi. Vuonna 1873 isoisä ei olisi löytänyt täältä Kreikkaa lainkaan, sillä Thessalia kuului yhä Osmanivaltakuntaan ja siirtyi Kreikalle vasta Konstantinopolin sopimuksella 1881. Itärannikolla Volosin sataman yllä kohoaa Pelionin vuori, jonka rinteillä tarun mukaan asuivat kentaurit ja jonka kylissä on yhä kivikattoisia kartanoita. Volosin seudulta myyttinen Iason lähti Argo-laivallaan etsimään kultaista taljaa.',
    },
    Ipeiros: {
      lyhyt: 'Epeiroksen Vikosin rotko on maailman syvimpiä suhteessa leveyteensä, ja sen reunoilla vanhat kivikylät ovat yhä asuttuja.',
      pitka: 'Epeiros on Kreikan vuoristoisin kolkka: Pindoksen harjanteita, jyrkkiä rotkoja ja Zagorin kylien kivisiä kaarisiltoja, joita pitkin muulit kulkivat ennen teiden aikaa. Alueen pääkaupunki Ioannina lepää Pamvotisjärven rannalla, ja järven saarella tapettiin 1822 mahtava Ali-pasa, joka oli hallinnut Epeirosta lähes kuin omaa valtakuntaansa. Vuonna 1873 koko Epeiros kuului vielä Osmanivaltakuntaan; Artan seutu siirtyi Kreikalle 1881, mutta Ioannina vasta helmikuussa 1913 Balkanin sodassa. Ioanninan hopeasepät jatkavat yhä vuosisataista taitoaan vanhan linnoituksen kujilla.',
    },
    'Dytiki Makedonia': {
      lyhyt: 'Kastorian kaupunki kiertää turkiskaupasta vaurastuneen järven ympäri, ja talvisin sen kapea niemi peittyy usein usvaan.',
      pitka: 'Länsi-Makedonia on Kreikan ainoa maakunta, jolla ei ole rantaviivaa: korkeiden vuorten ja järvien ylänkö, jossa talvet ovat kylmiä ja lumisia. Kastorian turkkurit toimittivat jo Bysantin hoville hermeliininnahkoja, ja kaupungissa on yhä yli 50 bysanttilaista tai keskiaikaista kirkkoa. Vuonna 1873 alue kuului Osmanivaltakuntaan, ja Kastoria liitettiin Kreikkaan vasta 1912. Pohjoisessa Prespajärvet ovat kolmen maan rajalla, ja niiden kaislikoissa pesii kiharapelikaaneja; Kozanin ja Ptolemaidan avolouhoksista taas on kaivettu ruskohiiltä, joka oli pitkään Kreikan tärkein sähkönlähde.',
    },
    'Dytiki Ellada': {
      lyhyt: 'Rio–Antirrion silta yhdistää Peloponnesoksen manner-Kreikkaan, ja Patran karnevaali on koko maan suurin katujuhla.',
      pitka: 'Länsi-Kreikka ulottuu Patraksen satamasta Messolonkin laguuneille ja Olympian laaksoon, jossa antiikin kisoja pidettiin yli tuhannen vuoden ajan. Isoisän kulkiessa 1873 alue kuului jo Kreikkaan, mutta Olympia oli yhä jopa kahdeksan metrin maakerroksen alla: saksalaiset aloittivat järjestelmälliset kaivaukset vasta 1875. Patras vaurastui tuohon aikaan korintinrusinoiden viennistä, ja baijerilainen Gustav Clauss oli perustanut kaupungin yläpuolelle viinitilan jo 1861 – sen makeaa mavrodafni-viiniä valmistetaan yhä. Messolongissa taas muistetaan lordi Byronia, joka kuoli siellä kuumeeseen 1824 kesken Kreikan vapaussodan.',
    },
    'Stereá Elláda': {
      lyhyt: 'Delfoin oraakkelin rauniot kohoavat Parnassosvuoren rinteellä – antiikin kreikkalaiset pitivät paikkaa maailman napana.',
      pitka: 'Keski-Kreikka kuului itsenäiseen Kreikkaan alusta asti, ja se ulottuu Parnassoksen rinteiltä Termopylain solaan ja Euboian suurelle saarelle. Isoisän aikaan Delfoissa ei vielä näkynyt Apollonin pyhäkköä, sillä raunioiden päällä seisoi Kastrin kylä noin 400 taloineen; kylä siirrettiin pois vasta 1892, kun ranskalaiset aloittivat suuren kaivauksensa. Termopylain kapeaa solaa, jossa spartalaiset taistelivat 480 eaa., ei enää ole, sillä rantaviiva on siirtynyt jokien kerrostumien myötä paikoin jopa yhdeksän kilometriä kauemmas. Boiotian vuorilla Hosios Loukasin luostarin tuhatvuotiaat kultamosaiikit hohtavat yhä kupolien alla.',
    },
    'Anatoliki Makedonia kai Thraki': {
      lyhyt: 'Traakiassa asuu Kreikan suurin muslimivähemmistö, ja rajajoki Evros erottaa alueen naapurimaasta Turkista.',
      pitka: 'Itä-Makedonia ja Traakia ulottuu Kavalan satamasta Rodopivuorten kautta Evrosjoelle, ja sen kylissä voi kuulla kreikan lisäksi turkkia ja pomakkia. Vuonna 1873 koko seutu kuului Osmanivaltakuntaan: Kavala liitettiin Kreikkaan Balkanin sotien jälkeen 1913, ja Länsi-Traakia oli välillä Bulgarian hallussa ja siirtyi Kreikalle vasta 1920. Kavalassa varttui Muhammad Ali, josta tuli Egyptin hallitsija, ja hänen kotikaupungilleen 1813 rakennuttamansa imaret on nykyään hotelli. Myöhemmin Kavala vaurastui tupakasta, jonka lehtiä kuivattiin ja lajiteltiin sataman suurissa varastoissa.',
    },
    'Ionioi Nisoi': {
      lyhyt: 'Korfun venetsialaistyylinen vanhakaupunki on Unescon listalla, ja Joonianmeren saaristo makaa Kreikan läntisimpänä.',
      pitka: 'Joonianmeren saaret ovat vihreämpiä kuin muu Kreikka, ja niiden kaupungeissa näkyy vuosisatojen venetsialaisvalta: kellotornit, holvikäytävät ja italialaisvaikutteinen musiikki. Isoisän käydessä 1873 saaret olivat olleet osa Kreikkaa vasta yhdeksän vuotta – Britannia oli hallinnut niitä protektoraattina 1815–1864 ja luovuttanut ne lahjaksi Kreikan uudelle kuninkaalle Yrjö I:lle. Brittien perintönä Korfun keskusaukiolla Spianadalla pelataan yhä krikettiä, jota muualla Kreikassa tuskin tunnetaan. Kefalonian vanhoista kaupungeista taas ei ole paljon jäljellä, sillä vuoden 1953 maanjäristys tuhosi lähes kaiken.',
    },
    'Notio Aigaio': {
      lyhyt: 'Etelä-Egean saariin kuuluvat sekä Santorinin tulivuorikaldera että Rodoksen keskiaikainen ritarilinnoitus.',
      pitka: 'Etelä-Egeaan kuuluu kaksi saariryhmää, joiden historia on aivan erilainen: Kykladit, valkoisten kylien ja tuulimyllyjen saaret, sekä idempänä Turkin rannikon tuntumassa Dodekanesia. Kun isoisä matkusti 1873, Kykladit olivat jo Kreikkaa, ja Syroksen Ermoupoli oli koko maan vilkkain satama- ja telakkakaupunki, kunnes Pireus ohitti sen 1800-luvun lopulla. Santorinin kalderassa Nea Kamenin tulivuori oli juuri purkautunut 1866–1870, joten sen laava oli isoisän aikaan vielä tuoretta. Rodos ja muut Dodekanesian saaret taas kuuluivat osmaneille vuoteen 1912, sitten Italialle, ja liitettiin Kreikkaan vasta vuoden 1947 rauhansopimuksen jälkeen.',
    },
    'Voreio Aigaio': {
      lyhyt: 'Lesboksen saaren kivettynyt metsä on 17–20 miljoonaa vuotta vanha, ja saari tunnetaan yhä anisviina ouzon tislauksesta.',
      pitka: 'Pohjois-Egean saaret – Lesbos, Khios, Samos, Ikaria ja Limnos – ovat lähempänä Turkin rannikkoa kuin Ateenaa, ja kirkkaalla säällä niiden satamista näkyvät Anatolian vuoret. Vuonna 1873 saaret eivät kuuluneet Kreikkaan: Lesbos ja Khios olivat osmanien saaria, ja Samos oli erikoinen ruhtinaskunta, jolla oli oma lippu ja sulttaanin nimittämä kristitty ruhtinas ja joka maksoi Konstantinopoliin vuotuista veroa. Saaret liittyivät Kreikkaan Balkanin sodan aikana 1912–1913. Lesboksella syntynyt kansanmaalari Theofilos kiersi myöhemmin saaren kyliä ja maalasi kahviloiden ja kauppojen seiniä usein pelkkää ruokaa vastaan.',
    },
    'Ayion Oros': {
      lyhyt: 'Athosvuoren munkkitasavaltaan pääsee vain erityisluvalla, eivätkä naiset saa astua sen maaperälle lainkaan.',
      pitka: 'Athoksen niemimaa on metsäinen, jyrkkä vuorenharjanne, jonka rannoilla ja rinteillä on 20 luostaria sekä lukuisia pienempiä munkkiyhteisöjä ja erakkomajoja. Munkkitasavallan juuret ovat vuodessa 963, jolloin Athanasios perusti Suuren Lavran luostarin Bysantin keisarin tuella, ja itsehallinto on säilynyt kaikkien valtojen alla. Vuonna 1873 niemimaa kuului muodollisesti Osmanivaltakuntaan, mutta munkit hallitsivat itse itseään kuten nykyäänkin; Kreikan hallintaan Athos siirtyi Balkanin sodassa 1912. Isoisän aikaan vuorelle virtasi munkkeja erityisesti Venäjältä, ja Pyhän Panteleimonin luostarissa asui 1900-luvun alussa jo lähes 1500 venäläistä munkkia.',
    },
  },
  /*
   * NLD (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.NLD:n tunnuksia
   * (12 maakuntaa + Karibian erityiskunnat Bonaire, Saba ja
   * St. Eustatius). Vain `lyhyt` tässä erässä, kuten GRC:llä.
   *
   * Lähteet (Fablen vaatimus 25.9.2026): faktat tarkistettu
   * en-Wikipediasta 25.9.2026, artikkelit:
   *   Bonaire          — Bonaire (Pekelmeer, flamingojen pesimäalue 1969, ei pääsyä)
   *   Drenthe          — Drenthe (53/54 dolmenia, n. 3500 eaa.)
   *   Zuid-Holland     — South Holland (Port of Rotterdam, Haag hallituksen kotipaikka)
   *   Flevoland        — Flevoland (uusin maakunta 1986, kuivatus 1950–60-luvuilla)
   *   Friesland        — Elfstedentocht (lähes 200 km, luonnonjää, viimeksi 1997)
   *   Gelderland       — De Hoge Veluwe National Park (ilmaiset pyörät, Kröller-Müller)
   *   Groningen        — Groningen gas field (järistykset, tuotanto loppui 1.10.2023)
   *   Limburg          — Limburg (Netherlands) (Vaalserberg 322,4 m, kolmen maan piste)
   *   Overijssel       — Giethoorn (ei teitä vanhassa kylässä, 176 siltaa)
   *   Noord-Brabant    — Efteling (avattu 1952, suurin NL:ssä), Kaatsheuvel (N-Brabant)
   *   Noord-Holland    — North Holland (Amsterdam, Schiphol Euroopan 3. vilkkain)
   *   Saba             — Juancho E. Yrausquin Airport (400 m, lyhyin reittikiitorata)
   *   St. Eustatius    — Sint Eustatius (First Salute 16.11.1776, Fort Oranje)
   *   Utrecht          — Dom Tower of Utrecht (112 m, 465 askelmaa, korkein kirkontorni)
   *   Zeeland          — Zeeland ("Sealand", tulva 1953, Deltatyöt)
   */
  NLD: {
    Bonaire: {
      lyhyt: 'Bonairen Pekelmeerin suolajärvellä on flamingojen pesimärauhoitusalue, jonne ihmiset eivät saa astua lainkaan.',
    },
    Drenthe: {
      lyhyt: 'Drenthessä seisoo 53 Alankomaiden 54 dolmenista – kivipaadet kasattiin haudoiksi jo noin 3500 vuotta ennen ajanlaskun alkua.',
    },
    'Zuid-Holland': {
      lyhyt: 'Rotterdamin satama on Euroopan vilkkain, ja maakunnan pääkaupunki Haag on koko Alankomaiden hallituksen kotipaikka.',
    },
    Flevoland: {
      lyhyt: 'Flevoland on Alankomaiden nuorin maakunta, perustettu 1986, ja lähes koko sen maa kuivattiin entisestä merenpohjasta.',
    },
    Friesland: {
      lyhyt: 'Lähes 200 kilometrin Elfstedentocht-luistelu ajetaan vain, kun luonnonjää kestää koko reitillä – viimeksi niin kävi 1997.',
    },
    Gelderland: {
      lyhyt: 'Hoge Veluwen kansallispuistossa ajellaan ilmaisilla puistopyörillä, ja metsän keskellä odottaa Kröller-Müller-museon Van Gogh -kokoelma.',
    },
    Groningen: {
      lyhyt: 'Groningenin kaasukenttä oli maailman suurimpia, mutta sen aiheuttamat maanjäristykset saivat valtion lopettamaan tuotannon 2023.',
    },
    Limburg: {
      lyhyt: 'Vaalserberg kohoaa 322 metriin, Manner-Alankomaiden korkeimmaksi kohdaksi, ja sen laella kohtaavat Alankomaat, Belgia ja Saksa.',
    },
    Overijssel: {
      lyhyt: 'Giethoornin vanhassa kylässä ei ollut teitä lainkaan, vaan kaikki kulki veneillä kanavia pitkin – siltoja on 176.',
    },
    'Noord-Brabant': {
      lyhyt: 'Kaatsheuvelin Efteling avattiin 1952 satumetsänä, ja nyt se on Alankomaiden suurin huvipuisto ja yksi maailman vanhimmista.',
    },
    'Noord-Holland': {
      lyhyt: 'Amsterdam on Alankomaiden pääkaupunki ja suurin kaupunki, ja sen kupeessa Schiphol on Euroopan kolmanneksi vilkkain lentoasema.',
    },
    Saba: {
      lyhyt: 'Saban lentokentän kiitorata on vain 400 metriä, maailman lyhyin reittiliikenteessä, ja sen molemmissa päissä jyrkänne putoaa mereen.',
    },
    'St. Eustatius': {
      lyhyt: 'Fort Oranjen tykit vastasivat 1776 amerikkalaisprikin tervehdykseen – varhainen kansainvälinen tunnustus kapinallisten lipulle.',
    },
    Utrecht: {
      lyhyt: 'Utrechtin Dom-tornin 465 askelmaa vievät 112 metrin korkeuteen – se on Alankomaiden korkein kirkontorni.',
    },
    Zeeland: {
      lyhyt: 'Zeelandin nimi tarkoittaa merimaata, ja vuoden 1953 tuhotulvan jälkeen sen saaria suojaavat Deltatyöt, jättimäiset padot ja sulut.',
    },
  },
  /*
   * BEL (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.BEL:n tunnuksia
   * (Natural Earthin englanninkielinen `name`, esim. "Liege" ilman
   * aksenttia). Vain `lyhyt` tässä erässä, kuten GRC:llä.
   *
   * LÄHTEET (en-Wikipedia, tarkistettu 25.9.2026):
   *   Antwerp         — Antwerp Province (satama Euroopan 2. suurin)
   *   Brussels        — Brussels (EU:n toimielimet, Nato, "capital of
   *                     the comic strip")
   *   Flemish Brabant — Flemish Brabant (ympäröi Brysselin, Belgian
   *                     päälentoasema Halle-Vilvoordessa)
   *   Hainaut         — Hainaut Province (Tournai, frankkien
   *                     valtakunnan ensimmäinen pääkaupunki)
   *   East Flanders   — East Flanders (Schelde ja Leie yhtyvät
   *                     Gentissä, Gentin yliopisto)
   *   Liege           — Liège Province (ainoa kolmeen maahan rajautuva
   *                     provinssi, saksankielinen Eupen-Malmedy)
   *   Limburg         — Limburg (Belgium) (Tongeren, provinssin ainoa
   *                     roomalaiskaupunki ja Belgian vanhin)
   *   Luxembourg      — Luxembourg (Belgium) (suurin pinta-ala, pienin
   *                     väkiluku, n. 80 % Ardenneja)
   *   West Flanders   — West Flanders + Coast Tram (De Panne–Knokke-
   *                     Heist, 67 km, maailman pisin metrin raideleveyden
   *                     raitiolinja)
   *   Namur           — Dinant + Adolphe Sax (syntyi Dinantissa 1814,
   *                     saksofonipatentti 28.6.1846; Dinantin linnoitus
   *                     kallion laella)
   *   Walloon Brabant — Walloon Brabant (Waterloon taistelu kesäkuu
   *                     1815, Belgian vaurain provinssi)
   */
  BEL: {
    Antwerp: {
      lyhyt: 'Antwerpenin satama on Euroopan toiseksi suurin, ja provinssi on koko Belgian väkirikkain – täällä asuu yli 1,9 miljoonaa ihmistä.',
    },
    Brussels: {
      lyhyt: 'Brysselissä istuvat EU:n tärkeimmät toimielimet ja Naton päämaja, mutta kaupunkia kutsutaan myös sarjakuvan pääkaupungiksi.',
    },
    'Flemish Brabant': {
      lyhyt: 'Flanderin Brabant kiertää renkaana Brysselin ympäri, ja Belgian päälentoasema sijaitsee sen puolella eikä pääkaupungissa.',
    },
    Hainaut: {
      lyhyt: 'Scheldejoen varren Tournai on Belgian vanhimpia kaupunkeja – se oli aikanaan frankkien valtakunnan ensimmäinen pääkaupunki.',
    },
    'East Flanders': {
      lyhyt: 'Gent sijaitsee Schelde- ja Leiejoen yhtymäkohdassa, ja sen vanhoja katuja täyttävät nykyään Gentin yliopiston opiskelijat.',
    },
    Liege: {
      lyhyt: 'Liège on Belgian ainoa provinssi, joka rajautuu kolmeen maahan, ja sen itälaidalla Eupenin ja Malmedyn seudulla puhutaan saksaa.',
    },
    Limburg: {
      lyhyt: 'Limburgin Tongerenia pidetään Belgian vanhimpana kaupunkina – se on provinssin ainoa roomalaisten aikainen kaupunki.',
    },
    Luxembourg: {
      lyhyt: 'Luxembourg on Belgian suurin mutta harvimmin asuttu provinssi, ja noin 80 prosenttia siitä kuuluu Ardennien tiheisiin metsiin.',
    },
    'West Flanders': {
      lyhyt: 'Rannikkoraitiovaunu kulkee koko rannikon Ranskan rajalta Alankomaiden rajalle – 67 kilometriä, maailman pisin laatuaan.',
    },
    Namur: {
      lyhyt: 'Dinantin jyrkän kallion laella seisoo linnoitus, ja kaupunki muistaa poikaansa Adolphe Saxia, joka patentoi saksofonin 1846.',
    },
    'Walloon Brabant': {
      lyhyt: 'Waterloon taistelu käytiin täällä kesäkuussa 1815, ja nykyään Vallonian Brabant on Belgian vaurain provinssi.',
    },
  },
  /*
   * DNK (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.DNK:n tunnuksia
   * TÄSMÄLLEEN (myös kirjoitusasu "Sjaælland"). Vain `lyhyt` tässä
   * erässä. Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Nordjylland  — Grenen; North Jutland Region (Frederikshavnin kunta)
   *   Midtjylland  — ARoS Aarhus Kunstmuseum (Your rainbow panorama 2011)
   *   Hovedstaden  — Øresund Bridge (Amager–Peberholm-tunneli + silta)
   *   Sjaælland    — Møns Klint (120 m, Unesco 13.7.2025); Region Zealand
   *   Syddanmark   — Billund, Denmark; Billund (Billundin kunta, Syddanmark)
   */
  DNK: {
    Nordjylland: {
      lyhyt: 'Skagenin Grenenillä voi seistä hiekkasärkän kärjessä, jossa Skagerrakin ja Kattegatin aallot törmäävät – uiminen siellä on kielletty.',
    },
    Midtjylland: {
      lyhyt: 'Aarhusin ARoS-taidemuseon katolla kiertää sateenkaaren värinen lasikäytävä, josta kaupunki näkyy joka askeleella eri sävyssä.',
    },
    Hovedstaden: {
      lyhyt: 'Kööpenhaminasta Malmöhön ajetaan ensin tunnelissa, noustaan Peberholmin tekosaarelle ja jatketaan lähes kahdeksan kilometrin siltaa.',
    },
    'Sjaælland': {
      lyhyt: 'Mønin saaren liitukalliot putoavat paikoin 120 metriä suoraan mereen, ja vuonna 2025 Møns Klint pääsi Unescon maailmanperintölistalle.',
    },
    Syddanmark: {
      lyhyt: 'Pienessä Billundissa on Legon pääkonttori ja maailman ensimmäinen Legoland, joka avasi porttinsa jo vuonna 1968.',
    },
  },
  /*
   * SVK (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.SVK:n tunnuksia
   * TÄSMÄLLEEN (myös "Prešov" ja "Trenciansky" ilman háčekia). Vain
   * `lyhyt` tässä erässä. Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Banskobystrický — Banská Štiavnica (kaldera, Unesco 1993)
   *   Bratislavský    — Bratislava ("only national capital that borders
   *                     two countries")
   *   Košický         — Cathedral of St. Elizabeth (Košice)
   *   Nitriansky      — Nitra Region (lämpimin alue; 2021 väestöstä
   *                     160 584 / 677 900 unkarilaisia)
   *   Prešov          — Gerlachovský štít (2 654 m); Prešov Region
   *   Trenciansky     — Trenčín; Trenčín Castle (Laugaricio, 179 jKr.)
   *   Trnavský        — Trnava ("Little Rome", Malý Rím)
   *   Žilinský        — Orava Castle (Nosferatu 1922); Oravský Podzámok
   *                     (Dolný Kubínin piiri, Žilinan alue)
   */
  SVK: {
    'Banskobystrický': {
      lyhyt: 'Banská Štiavnican kaivoskaupunki on rakennettu muinaisen, romahtaneen tulivuoren kalderan keskelle, ja se on Unescon maailmanperintöä.',
    },
    'Bratislavský': {
      lyhyt: 'Bratislava on maailman ainoa pääkaupunki, joka rajautuu kahteen valtioon: Itävalta ja Unkari alkavat aivan kaupungin laidalta.',
    },
    'Košický': {
      lyhyt: 'Košicen Pyhän Elisabetin katedraali on Slovakian suurin kirkko ja yksi Euroopan itäisimmistä goottilaisista katedraaleista.',
    },
    Nitriansky: {
      lyhyt: 'Nitran seutu on Slovakian lämpimin kolkka, jonka pelloilla kasvaa vehnää, ja lähes joka neljäs asukas on kansallisuudeltaan unkarilainen.',
    },
    'Prešov': {
      lyhyt: 'Korkeiden Tatrain Gerlachovský štít kohoaa 2 654 metriin – se on koko Karpaattien korkein huippu, ja sen laki katoaa usein pilviin.',
    },
    Trenciansky: {
      lyhyt: 'Trenčínin linnan alla kalliossa on roomalaisten sotilaiden vuonna 179 kaivertama kirjoitus, joka kutsuu paikkaa nimellä Laugaricio.',
    },
    'Trnavský': {
      lyhyt: 'Trnavaa kutsutaan Pikku-Roomaksi, koska vanhankaupungin muurien sisälle on mahtunut niin monta kirkkoa.',
    },
    'Žilinský': {
      lyhyt: 'Oravan linna kohoaa korkealla kalliolla joen yllä, ja moni vuoden 1922 kauhuklassikon Nosferatun kohtaus kuvattiin sen muureilla.',
    },
  },
};
