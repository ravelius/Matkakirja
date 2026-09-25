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
  /*
   * FIN (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.FIN:n tunnuksia
   * TÄSMÄLLEEN (Natural Earthin englanninkielinen nimi, esim.
   * "Finland Proper" = Varsinais-Suomi). Vain `lyhyt` tässä erässä.
   * Lähteet (tarkistettu 25.9.2026; en = en-Wikipedia, fi = fi-Wikipedia):
   *   South Karelia         — en Imatrankoski (pato 1929, avataan päivittäin
   *                           kesä–elokuussa klo 18)
   *   Southern Ostrobothnia — en Tangomarkkinat (world's oldest tango
   *                           festival, Seinäjoki, vuodesta 1985)
   *   Southern Savonia      — en Saimaa ringed seal (vain Saimaassa, n. 500
   *                           yksilöä, eristyksissä n. 9 500 vuotta)
   *   Kainuu                — fi Hiljainen kansa (Suomussalmi, vt 5:n
   *                           varressa, turvepäät, puetaan vuodenajan mukaan)
   *   Tavastia Proper       — en Iittala (lasitehdas 1881); fi Iittala
   *                           (taajama kuuluu Hämeenlinnaan)
   *   Central Ostrobothnia  — en Kokkola (Halkokarin kahakka 7.6.1854,
   *                           tykkivene English Parkissa, palautuspyynnöt
   *                           torjuttu)
   *   Central Finland       — en Rally Finland (fastest event in the WRC,
   *                           blind crests and big jumps, Jyväskylä)
   *   Kymenlaakso           — fi Langinkosken keisarillinen kalastusmaja
   *                           (Aleksanteri III, valmis 1889, useana kesänä);
   *                           en Langinkoski (lohikoski, Kotka)
   *   Lapland               — en Inari, Finland (suurin kunta, neljä
   *                           virallista kieltä)
   *   Pirkanmaa             — en Tampere ("Sauna Capital of the World",
   *                           eniten yleisiä saunoja)
   *   Ostrobothnia          — en Kvarken (maannousu lähes 10 mm/v, Unesco
   *                           2006, Mustasaari/Korsholm)
   *   North Karelia         — en Koli National Park (Pielisen länsiranta;
   *                           Sibelius, Aho, Järnefelt)
   *   Northern Ostrobothnia — en Air Guitar World Championships (Oulu, 1996)
   *   Northern Savonia      — fi Eukonkanto (MM-kisat Sonkajärvellä
   *                           vuosittain vuodesta 1992)
   *   Päijät-Häme           — fi Salpausselän hyppyrimäet; en Salpausselkä
   *                           (reunamoreeni 12 250–10 400 v. sitten); en Lahti
   *                           (Salpausselkä UNESCO Global Geopark 2022)
   *   Satakunta             — en Sammallahdenmäki (33 röykkiötä, yli 3 000
   *                           v., Rauma, Unesco 1999)
   *   Uusimaa               — en Porkkala Naval Base (1944–1956, junien
   *                           ikkunat luukuilla, neuvostoveturit)
   *   Finland Proper        — en Archipelago Sea (by some definitions the
   *                           largest archipelago by number of islands, n.
   *                           50 000)
   */
  FIN: {
    'South Karelia': {
      lyhyt: 'Imatrankoski on ollut padottuna vuodesta 1929, mutta kesäiltaisin padon luukut avataan ja vesi ryöppyää taas vanhaan uomaansa.',
    },
    'Southern Ostrobothnia': {
      lyhyt: 'Seinäjoen Tangomarkkinat on maailman vanhin tangofestivaali, ja joka heinäkuu siellä etsitään Suomen parhaita tangolaulajia.',
    },
    'Southern Savonia': {
      lyhyt: 'Saimaannorppa elää vain Saimaassa, eristyksissä muista norpista jo noin 9 500 vuotta – jäljellä on vain noin 500 yksilöä.',
    },
    Kainuu: {
      lyhyt: 'Suomussalmella valtatien varren pellolla seisoo Hiljainen kansa, turvepäisten hahmojen joukko, jonka vaatteet vaihdetaan vuodenajan mukaan.',
    },
    'Tavastia Proper': {
      lyhyt: 'Hämeenlinnaan kuuluvassa Iittalan kylässä on puhallettu lasia vuodesta 1881, ja kylän nimi on nyt maailmalla tunnettu muotoilumerkki.',
    },
    'Central Ostrobothnia': {
      lyhyt: 'Kokkolan Englantilaisessa puistossa on brittien tykkivene, joka kaapattiin 1854 – kaupunki ei ole palauttanut sitä pyynnöistä huolimatta.',
    },
    'Central Finland': {
      lyhyt: 'Keski-Suomen soratiet ajetaan Rally Finlandissa, MM-rallin nopeimmassa osakilpailussa, jossa autot lentävät harjanteilta pitkiä hyppyjä.',
    },
    Kymenlaakso: {
      lyhyt: 'Kotkan Langinkoskella seisoo keisari Aleksanteri III:n kalastusmaja, jossa tsaarin perhe vietti kesiä lohikosken rannalla.',
    },
    Lapland: {
      lyhyt: 'Inari on Suomen suurin kunta, ja siellä on peräti neljä virallista kieltä: suomi sekä pohjois-, inarin- ja koltansaame.',
    },
    Pirkanmaa: {
      lyhyt: 'Tampere on julistettu maailman saunapääkaupungiksi, koska missään muualla maailmassa ei ole yhtä paljon yleisiä saunoja.',
    },
    Ostrobothnia: {
      lyhyt: 'Merenkurkun saaristo kohoaa merestä lähes sentin vuodessa, ja tämän maannousun vuoksi se on vuodesta 2006 ollut Unescon maailmanperintöä.',
    },
    'North Karelia': {
      lyhyt: 'Kolin vaaroilta avautuu näkymä Pielisjärvelle, ja samaa maisemaa ovat ihailleet Sibelius, Juhani Aho ja taidemaalari Eero Järnefelt.',
    },
    'Northern Ostrobothnia': {
      lyhyt: 'Oulussa ratkotaan joka vuosi ilmakitaran maailmanmestaruus: soittimena on pelkkä kuviteltu kitara, ja kisa on pidetty vuodesta 1996.',
    },
    'Northern Savonia': {
      lyhyt: 'Sonkajärvellä kisataan joka vuosi eukonkannon maailmanmestaruudesta, ja voittaja on se, joka kantaa toisen ihmisen esteradan läpi nopeimmin.',
    },
    'Päijät-Häme': {
      lyhyt: 'Lahden hyppyrimäet nousevat Salpausselältä, jääkauden reunalle kasaamalta harjulta – vuodesta 2022 seutu on ollut Unescon geopuisto.',
    },
    Satakunta: {
      lyhyt: 'Rauman Sammallahdenmäellä on 33 yli 3 000 vuotta vanhaa pronssikautista hautaröykkiötä, ja paikka on Unescon maailmanperintökohde.',
    },
    Uusimaa: {
      lyhyt: 'Porkkalan niemi oli 1944–1956 Neuvostoliiton laivastotukikohta, ja sen läpi ajavien suomalaisjunien ikkunat piti sulkea luukuilla.',
    },
    'Finland Proper': {
      lyhyt: 'Saaristomerellä on joidenkin laskutapojen mukaan maailman eniten saaria, noin 50 000, ja moni niistä on vain pieni luoto.',
    },
  },
  /*
   * EST (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.EST:n tunnuksia
   * TÄSMÄLLEEN (Natural Earthin nimi ilman "maa"-päätettä, esim.
   * "Lääne-Viru", "Hiiu"). Vain `lyhyt` tässä erässä. Lähteet
   * (en-Wikipedia, tarkistettu 25.9.2026):
   *   Harju      — Harju County (Tallinn); Tallinn Old Town (1200-luvun
   *                kaupunkirakenne ehjä, Unesco 1997)
   *   Hiiu       — Kõpu Lighthouse (yhtäjaksoisesti käytössä vuodesta
   *                1531, maailman vanhimpia)
   *   Ida-Viru   — Narva; Hermann Castle (Ivangorod vastarannalla 1492,
   *                Narvajoki Viron ja Venäjän raja)
   *   Jõgeva     — Jõgeva (Viron kylmin paikka, −43,5 °C 1940,
   *                Külmasammas-muistomerkki)
   *   Järva      — Paide (Vallitorn: kuusi kerrosta, räjäytettiin 1941,
   *                korjattiin 1990–1993)
   *   Lääne-Viru — Rakvere (Tarvas-alkuhärkä 2002, 7 m pitkä, Baltian
   *                suurin eläinpatsas)
   *   Lääne      — Haapsalu Castle (Valkoinen neito elokuun täydenkuun
   *                öinä, White Lady Days -festivaali)
   *   Põlva      — Taevaskoja (devonikauden hiekkakivipaljastumat
   *                Ahjajoen varrella, Põlvan kunta)
   *   Pärnu      — Pärnu ("Estonia's Summer Capital" vuodesta 1996,
   *                kylpyläperinne 1800-luvun puolivälistä)
   *   Rapla      — Rapla (kirkko romaanista tyyliä, "one of the purest
   *                examples of this style in all of Estonia"); Rapla
   *                County (kirkko rakennettu 1901)
   *   Saare      — Kaali crater (yhdeksän kraatteria, suurin 110 m,
   *                pohjalla Kaalijärvi)
   *   Tartu      — Tartu; University of Tartu (perustettu 1632, maan
   *                vanhin yliopisto)
   *   Valga      — Valga, Estonia (Valga ja Valka yksi kaupunki vuoteen
   *                1920, rajatarkastukset poistuivat 21.12.2007)
   *   Viljandi   — Viljandi (kansanmusiikkifestivaali heinäkuun lopussa,
   *                Viron suurin vuotuinen musiikkifestivaali)
   *   Võru       — Suur Munamägi (318 m, Viron ja Baltian korkein,
   *                näkötorni huipulla, Haanja)
   */
  EST: {
    Harju: {
      lyhyt: 'Tallinnan vanhankaupungin 1200-luvun katuverkko on säilynyt lähes ehjänä muurien sisällä, ja se on ollut Unescon listalla vuodesta 1997.',
    },
    Hiiu: {
      lyhyt: 'Hiidenmaan Kõpun majakka on ollut käytössä yhtäjaksoisesti vuodesta 1531 – se on yksi maailman vanhimmista yhä toimivista majakoista.',
    },
    'Ida-Viru': {
      lyhyt: 'Narvan Hermannin linna ja Ivangorodin linnoitus katsovat toisiaan joen yli, ja Narvajoki on nyt Viron ja Venäjän välinen raja.',
    },
    'Jõgeva': {
      lyhyt: 'Jõgeva on Viron kylmin paikka: siellä mitattiin 1940 maan pakkasennätys, −43,5 astetta, ja kylmyydelle on pystytetty oma muistomerkki.',
    },
    'Järva': {
      lyhyt: 'Paiden linnan kuusikerroksinen Vallitorni räjäytettiin 1941, ja se rakennettiin uudelleen vasta vuosina 1990–1993.',
    },
    'Lääne-Viru': {
      lyhyt: 'Rakveren linnavuoren laidalla seisoo pronssinen alkuhärkä Tarvas, seitsemän metriä pitkä ja Baltian suurimmaksi eläinpatsaaksi sanottu.',
    },
    'Lääne': {
      lyhyt: 'Haapsalun piispanlinnan kappelin seinälle ilmestyy tarun mukaan elokuun täydenkuun öinä Valkoinen neito, ja silloin kaupunki juhlii.',
    },
    'Põlva': {
      lyhyt: 'Taevaskojan kylässä Ahjajoen rannoilla paljastuu devonikauden hiekkakiveä, joka kerrostui satoja miljoonia vuosia sitten.',
    },
    'Pärnu': {
      lyhyt: 'Pärnua kutsutaan Viron kesäpääkaupungiksi, ja sen pitkillä hiekkarannoilla ja kylpylöissä on käyty lomailemassa jo 1800-luvulta asti.',
    },
    Rapla: {
      lyhyt: 'Raplan kirkko valmistui 1901 romaaniseen tyyliin, ja sitä pidetään yhtenä tyylin puhtaimmista esimerkeistä koko Virossa.',
    },
    Saare: {
      lyhyt: 'Saarenmaan Kaalissa on yhdeksän meteoriittikraatteria, ja suurimman, 110 metriä leveän kraatterin pohjalla lepää pyöreä järvi.',
    },
    Tartu: {
      lyhyt: 'Tartun yliopisto perustettiin 1632, ja maan vanhimpana yliopistona se tekee Tartusta Viron henkisen pääkaupungin.',
    },
    Valga: {
      lyhyt: 'Valga ja Latvian Valka olivat yksi kaupunki vuoteen 1920, ja nyt niiden välinen raja ylitetään ilman aitoja ja tarkastuksia.',
    },
    Viljandi: {
      lyhyt: 'Viljandin kansanmusiikkifestivaali on Viron suurin vuotuinen musiikkijuhla, ja heinäkuun lopussa linnanraunioiden kaupunki täyttyy soitosta.',
    },
    'Võru': {
      lyhyt: 'Suur Munamägi eli Iso Munamäki kohoaa 318 metriin, Baltian maiden korkeimmaksi huipuksi, ja sen laella seisoo näkötorni.',
    },
  },
  /*
   * LVA (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.LVA:n tunnuksia
   * TÄSMÄLLEEN (viisi aluetta: neljä historiallista maakuntaa + Riika).
   * Vain `lyhyt` tässä erässä. Lähteet (en-Wikipedia, tarkistettu
   * 25.9.2026):
   *   Kurzeme — Venta Rapid (Kuldīga, Euroopan levein vesiputous
   *             249 m, kevättulvilla 275 m); Courland (Kuldīga)
   *   Latgale — Latgale (Aglona: 15.8. pyhiinvaeltajat, paavit 1993
   *             ja 2018); Aglona
   *   Riga    — Art Nouveau architecture in Riga (noin kolmasosa
   *             keskustan rakennuksista, maailman tihein keskittymä
   *             Krastiņšin mukaan)
   *   Vidzeme — Gaiziņkalns (312 m, Latvian korkein; Suur Munamägeä
   *             korkeampi torni jäi kesken ja purettiin 12/2012)
   *   Zemgale — Rundāle Palace (Rastrelli, Kuurinmaan herttua Biron,
   *             Semigallia; entisöinti 1972–2015)
   */
  LVA: {
    Kurzeme: {
      lyhyt: 'Kuldīgan Ventas rumba on Euroopan levein vesiputous: vain parin metrin korkuinen mutta 249 metriä leveä, keväällä vielä leveämpi.',
    },
    Latgale: {
      lyhyt: 'Katolisen Latgalen Aglonan basilikaan saapuu joka 15. elokuuta tuhansia pyhiinvaeltajia, ja kaksi paavia on vieraillut siellä.',
    },
    Riga: {
      lyhyt: 'Noin kolmasosa Riian keskustan taloista on jugendia – kaupungissa on kenties maailman tihein jugendrakennusten keskittymä.',
    },
    Vidzeme: {
      lyhyt: 'Latvian korkein kohta Gaiziņkalns jää 312 metriin, ja Viron huipun päihittämään rakennettu torni purettiin keskeneräisenä 2012.',
    },
    Zemgale: {
      lyhyt: 'Rundālen barokkipalatsin suunnitteli Bartolomeo Rastrelli Kuurinmaan herttualle, ja sen entisöinti kesti vuodesta 1972 vuoteen 2015.',
    },
  },
  /*
   * LTU (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.LTU:n tunnuksia
   * TÄSMÄLLEEN (liettuan genetiivimuoto ilman diakriitteja, esim.
   * "Kauno", "Klaipedos", mutta "Šiauliai" ja "Telšiai" háčekilla).
   * Vain `lyhyt` tässä erässä. Lähteet (en-Wikipedia, tarkistettu
   * 25.9.2026):
   *   Alytaus      — Grūtas Park (Druskininkain lähellä, Ig Nobelin
   *                  rauhanpalkinto 2001); Alytus County
   *   Kauno        — Kaunas (väliaikainen pääkaupunki 1920–1939,
   *                  Unescon maailmanperintö 2023)
   *   Klaipedos    — Curonian Spit (98 km, dyynit hautasivat kyliä);
   *                  Klaipėda County
   *   Marijampoles — Marijampolė (yksi Euroopan suurimmista
   *                  käytettyjen autojen toreista)
   *   Panevezio    — Biržai (noin 9 000 kipsin liukenemisesta syntynyttä
   *                  vajoamakuoppaa, uusia joka vuosi; Panevėžys County)
   *   Šiauliai     — Hill of Crosses (arviolta 100 000 ristiä 2006,
   *                  ensimmäiset vuoden 1831 kansannousun jälkeen)
   *   Taurages     — Tauragė (Tauroggenin sopimus 30.12.1812, Yorck);
   *                  Tauragė County
   *   Telšiai      — Plokštinė missile base (neuvostoliiton ensimmäinen
   *                  maanalainen ydinohjustukikohta, kylmän sodan museo
   *                  2012); Plungė District Municipality (Telšiai County)
   *   Utenos       — Utena County (1 002 järveä); Aukštaitija National
   *                  Park (Tauragnas, Liettuan syvin järvi 60,5 m)
   *   Vilniaus     — Užupis (itsenäiseksi tasavallaksi 1.4.1997, lipun
   *                  kämmen vaihtaa väriä vuodenajan mukaan)
   */
  LTU: {
    Alytaus: {
      lyhyt: 'Druskininkain lähellä Grūtasin puistoon on koottu kaadettuja neuvostopatsaita, ja puiston perustaja sai 2001 Ig Nobelin rauhanpalkinnon.',
    },
    Kauno: {
      lyhyt: 'Kaunas oli sotien välillä Liettuan väliaikainen pääkaupunki, ja sen modernistinen arkkitehtuuri pääsi Unescon listalle 2023.',
    },
    Klaipedos: {
      lyhyt: 'Kapea, 98 kilometrin Kuurinkynnäs erottaa Kuurin lahden Itämerestä, ja sen vaeltavat dyynit hautasivat aikanaan alleen kokonaisia kyliä.',
    },
    Marijampoles: {
      lyhyt: 'Marijampolė on kaupan ja kevyen teollisuuden keskus, ja siellä toimii yksi Euroopan suurimmista käytettyjen autojen toreista.',
    },
    Panevezio: {
      lyhyt: 'Biržain seudulla on noin 9 000 vajoamakuoppaa, jotka syntyvät kun pohjavesi liuottaa kipsiä maan alta – uusia ilmestyy joka vuosi.',
    },
    'Šiauliai': {
      lyhyt: 'Šiauliain pohjoispuolella Ristien mäellä seisoo arviolta 100 000 ristiä, joita pyhiinvaeltajat ovat tuoneet sinne 1800-luvulta asti.',
    },
    Taurages: {
      lyhyt: 'Tauragėssa preussilainen kenraali Yorck julisti 1812 joukkonsa puolueettomiksi, mikä mursi Preussin ja Napoleonin liiton.',
    },
    'Telšiai': {
      lyhyt: 'Plateliaijärven lähellä metsässä piilee Neuvostoliiton ensimmäinen maanalainen ydinohjustukikohta – nyt kylmän sodan museo, jonka siiloon pääsee.',
    },
    Utenos: {
      lyhyt: 'Utenan seudulla on yli tuhat järveä, ja Aukštaitijan kansallispuistossa lepää Liettuan syvin järvi Tauragnas, 60,5 metriä syvä.',
    },
    Vilniaus: {
      lyhyt: 'Vilnan Užupis julistautui 1. huhtikuuta 1997 omaksi tasavallakseen, ja sen lipun kämmen vaihtaa väriä vuodenajan mukaan.',
    },
  },
  /*
   * SVN (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.SVN:n tunnuksia
   * TÄSMÄLLEEN (tilastoalueet, esim. "Notranjsko-kraška" ja
   * "Spodnjeposavska"). Vain `lyhyt` tässä erässä. Osrednjeslovenskan
   * teksti välttää Ljubljanan fokusvirran aiheet (lohikäärme, linna,
   * Ljubljanica, Kolmisilta, Laibach). Lähteet (en-Wikipedia,
   * tarkistettu 25.9.2026):
   *   Gorenjska             — Lake Bled (99 kiviaskelmaa 1655, toivekello,
   *                           käsin tehdyt pletna-veneet)
   *   Goriška               — Nova Gorica (Euroopan kulttuuripääkaupunki
   *                           2025 yhdessä Gorizian kanssa, Transalpinan /
   *                           Euroopan aukio rautatieasemalla rajalla)
   *   Jugovzhodna Slovenija — Novo Mesto ("City of Situlas", Hallstatt,
   *                           Krkan mutka)
   *   Koroška               — Petzen / Peca (mountain) (Matjažin luola,
   *                           Keršičin pronssipatsas 1958, luolaan 1962)
   *   Notranjsko-kraška     — Lake Cerknica (täytenä maan suurin järvi,
   *                           tyhjenee kesällä maanalaisiin onkaloihin)
   *   Obalno-kraška         — Lipica, Sežana (tila 1580, lipizzanin
   *                           alkukoti, haute école -hevoset)
   *   Osrednjeslovenska     — Ljubljana Marshes Wheel (löydetty 2002,
   *                           5 100–5 350 v, vanhin löydetty puupyörä,
   *                           Ljubljanan kaupunginmuseo)
   *   Podravska             — Maribor (Lentin žametovka yli 400 v,
   *                           Guinness 2004)
   *   Pomurska              — Prekmurje (unkarilaisvalta, Jugoslavian
   *                           joukot 12.8.1919) + Prekmurska gibanica
   *                           (EU:n TSG maaliskuusta 2010)
   *   Savinjska             — Counts of Celje (kolme kultaista tähteä
   *                           sinisellä pohjalla Slovenian vaakunaan 1991)
   *   Spodnjeposavska       — Krško Nuclear Power Plant (Gen Energija +
   *                           HEP, yli neljännes Slovenian sähköstä)
   *   Zasavska              — Trbovlje Power Station (360 m, Euroopan
   *                           korkein savupiippu, 1976, suljettu 2016)
   */
  SVN: {
    Gorenjska: {
      lyhyt: 'Bledinjärven saarelle soudetaan käsin tehdyillä pletna-veneillä, ja kirkolle nousee 99 kiviaskelmaa – perillä voi soittaa toivekelloa.',
    },
    'Goriška': {
      lyhyt: 'Nova Gorica ja italialainen Gorizia olivat yhdessä Euroopan kulttuuripääkaupunki 2025, ja rautatieaseman aukiolla raja kulkee keskeltä.',
    },
    'Jugovzhodna Slovenija': {
      lyhyt: 'Krkan mutkaan rakennettua Novo Mestoa kutsutaan situlojen kaupungiksi, sillä sen maista on kaivettu esiin rautakautisia pronssiastioita.',
    },
    'Koroška': {
      lyhyt: 'Pecan vuoren luolaan on asetettu pronssinen kuningas Matjaž, sillä tarun mukaan hän nukkuu vuoren uumenissa Itävallan rajalla.',
    },
    'Notranjsko-kraška': {
      lyhyt: 'Cerknicanjärvi on täytenä Slovenian suurin järvi, mutta kuivina kesinä sen vesi voi valua kokonaan maanalaisiin onkaloihin.',
    },
    'Obalno-kraška': {
      lyhyt: 'Karstin Lipicaan perustettiin hevostila 1580, ja siellä syntyi lipizzanrotu – tilalla kasvatetaan yhä ratsuja kouluratsastukseen.',
    },
    Osrednjeslovenska: {
      lyhyt: 'Ljubljanan suolta löytyi 2002 yli 5 000 vuotta vanha puupyörä, vanhin koskaan löydetty – sen voi nähdä kaupunginmuseossa.',
    },
    Podravska: {
      lyhyt: 'Mariborin Lentin rannassa kasvaa yli 400 vuotta vanha žametovka-köynnös, jota pidetään maailman vanhimpana viiniköynnöksenä.',
    },
    Pomurska: {
      lyhyt: 'Prekmurje kuului vuosisatoja Unkariin ja liitettiin vasta 1919, ja sen monikerroksinen gibanica-leivos on EU:n suojaama herkku.',
    },
    Savinjska: {
      lyhyt: 'Slovenian vaakunan kolme kultaista tähteä sinisellä pohjalla ovat Celjen keskiaikaisten kreivien perintöä – ne otettiin vaakunaan 1991.',
    },
    Spodnjeposavska: {
      lyhyt: 'Krškon ydinvoimala on Slovenian ja Kroatian yhteinen, ja se tuottaa yli neljänneksen koko Slovenian sähköstä.',
    },
    Zasavska: {
      lyhyt: 'Trbovljen voimalan 360-metrinen savupiippu on Euroopan korkein, ja se seisoo yhä laakson maamerkkinä, vaikka voimala on suljettu.',
    },
  },
  /*
   * ROU (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2A). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.ROU:n tunnuksia
   * TÄSMÄLLEEN (diakriitittömät, paitsi "Dâmbovita" ja "Vâlcea").
   * Vain `lyhyt`. Bukarestin teksti välttää fokusvirran ja
   * europe-kulttuurin aiheet (Parlamenttipalatsi, Colțean torni,
   * Dracula, karhut). Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Alba            — Alba Iulia (Great Union 1.12.1918, kansallispäivä)
   *   Arad            — 13 Martyrs of Arad (teloitettu 6.10.1849)
   *   Arges           — Transfăgărășan (huippu noin 2 042 m, auki kesällä)
   *   Bacau           — Nadia Comăneci (Onești, Montreal 1976, ensimmäinen 10)
   *   Bihor           — Bears' Cave (avattu räjäyttämällä 17.9.1975,
   *                     140 luolakarhun luurankoa)
   *   Bistrita-Nasaud — Dracula (romaani): Bistritz, Borgo Pass = Tihuța
   *   Botosani        — Mihai Eminescu, Ipotești (muistomuseo)
   *   Braila          — Brăila Bridge (avattu 2023, Romanian pisin riippusilta)
   *   Brasov          — Black Church (nimi vuoden 1689 palosta)
   *   Bucharest       — Dimitrie Gusti National Village Museum (1936)
   *   Buzau           — Berca Mud Volcanoes
   *   Calarasi        — Oltenița (Gumelnițan kumpu, 4. vuosituhat eaa.)
   *   Caras-Severin   — Băile Herculane (roomalaiset kylvyt, Herkuleen patsas)
   *   Cluj            — Salina Turda
   *   Constanta       — Port of Constanța, Danube–Black Sea Canal (64 km)
   *   Covasna         — Covasna (mofetit, hiilidioksidihoidot)
   *   Dâmbovita       — Trial and execution of the Ceaușescus (25.12.1989)
   *   Dolj            — Nicolae Romanescu Park (Redont, 1897–1903,
   *                     riippusilta 1901–1902)
   *   Galati          — Liberty Galați (Romanian suurin terästehdas)
   *   Giurgiu         — Giurgiu–Ruse Friendship Bridge (1954, ainoa silta
   *                     Bulgariaan vuoteen 2013)
   *   Gorj            — The Endless Column (Brâncuși, Târgu Jiu)
   *   Harghita        — Lake Sfânta Ana (Romanian ainoa tulivuorijärvi)
   *   Hunedoara       — Corvin Castle
   *   Ialomita        — Lake Amara (sapropeelinen hoitomuta)
   *   Iasi            — Palace of Culture (neljä museota)
   *   Ilfov           — Snagov Monastery (perimätieto Vladin haudasta)
   *   Maramures       — Merry Cemetery (Săpânța)
   *   Mehedinti       — Rock sculpture of Decebalus (55 m, 1994–2004,
   *                     Euroopan korkein kallioreliefi)
   *   Mures           — Sighișoara (Vlad III:n syntymäkaupunki, asuttu
   *                     linnoitus, Unesco)
   *   Neamt           — Neamț Citadel (Mehmed II:n piiritys 1476)
   *   Olt             — Alro (Slatina, suurin alumiinintuottaja Keski- ja
   *                     Itä-Euroopassa IVY-maita lukuun ottamatta)
   *   Prahova         — Peleș Castle (ensimmäinen kokonaan sähkövaloin
   *                     valaistu linna Euroopassa, oma voimala)
   *   Salaj           — Porolissum (Moigrad)
   *   Satu Mare       — Satu Mare: palokunnan torni (47 m, 1904)
   *   Sibiu           — Sibiu (Euroopan kulttuuripääkaupunki 2007)
   *   Suceava         — Voroneț Monastery ("Voronețin sininen")
   *   Teleorman       — Teleorman County (kuumaanin "hullu metsä",
   *                     Zimnicea Romanian eteläisin paikkakunta)
   *   Timis           — Timișoara (sähköinen katuvalaistus 1884)
   *   Tulcea          — Danube Delta (Unesco, pelikaanit)
   *   Vaslui          — Battle of Vaslui (1475)
   *   Vâlcea          — Horezu Monastery + Horezu ceramics (Unesco)
   *   Vrancea         — 1977 Vrancea earthquake (Bukarestin tuhot)
   */
  ROU: {
    Alba: {
      lyhyt: 'Alba Iuliassa julistettiin 1. joulukuuta 1918 Transilvanian liittyminen Romaniaan, ja päivä on yhä maan kansallispäivä.',
    },
    Arad: {
      lyhyt: 'Aradissa teloitettiin lokakuussa 1849 kolmetoista Unkarin vapaussodan kenraalia, ja heitä muistetaan kaupungissa yhä joka syksy.',
    },
    Arges: {
      lyhyt: 'Argeșin laaksosta Transfăgărășan-tie kiemurtelee Făgărașin vuorten yli kahden kilometrin korkeuteen, ja tie on auki vain kesäisin.',
    },
    Bacau: {
      lyhyt: 'Oneștin kaupungissa kasvoi ja harjoitteli Nadia Comăneci, joka sai Montrealissa 1976 voimistelun ensimmäisen täyden kympin.',
    },
    Bihor: {
      lyhyt: 'Chișcăun Karhuluola aukesi 1975, kun louhoksen räjäytys puhkaisi sen suuaukon, ja sisältä löytyi 140 luolakarhun luurankoa.',
    },
    'Bistrita-Nasaud': {
      lyhyt: 'Bram Stokerin Draculassa Jonathan Harker yöpyy Bistritzissa, ja kreivin linnaan vievä Borgon sola on täkäläinen Tihuțan sola.',
    },
    Botosani: {
      lyhyt: 'Kansallisrunoilija Mihai Eminescu vietti lapsuutensa Ipoteștin kylässä, ja hänen kotitalonsa on nykyään muistomuseo.',
    },
    Braila: {
      lyhyt: 'Brăilan kohdalla Tonavan ylittää 2023 avattu riippusilta, Romanian pisin – ennen sitä joen yli pääsi täällä vain lautalla.',
    },
    Brasov: {
      lyhyt: 'Brașovin Musta kirkko sai nimensä vuoden 1689 suurpalosta, joka nokesi sen muurit, ja goottilainen jättiläinen hallitsee yhä vanhaakaupunkia.',
    },
    Bucharest: {
      lyhyt: 'Bukarestin kylämuseoon on vuodesta 1936 siirretty taloja, kirkkoja ja tuulimyllyjä eri puolilta Romaniaa järven rantaan.',
    },
    Buzau: {
      lyhyt: 'Bercan lähellä maasta kuplii harmaata mutaa pieninä tulivuorina, kun maakaasu puskee pintaan – maisema näyttää kuun pinnalta.',
    },
    Calarasi: {
      lyhyt: 'Oltenițassa Argeș laskee Tonavaan, ja kaupungin lähellä on Gumelnițan kumpu, jolla asuttiin jo noin 6 000 vuotta sitten.',
    },
    'Caras-Severin': {
      lyhyt: 'Băile Herculanen kuumia lähteitä käyttivät jo roomalaiset, ja kylpyläkaupungin tunnuksena seisoo Herkuleen patsas.',
    },
    Cluj: {
      lyhyt: 'Turdan vanhaan suolakaivokseen on rakennettu maailmanpyörä, minigolfrata ja soutuvenelampi syvälle maan alle.',
    },
    Constanta: {
      lyhyt: 'Constanțan satama on Mustanmeren suurin, ja 64 kilometrin kanava oikaisee sieltä suoraan Tonavalle.',
    },
    Covasna: {
      lyhyt: 'Covasnan kylpylässä sydänpotilaita hoidetaan hiilidioksidilla, joka pulppuaa maasta niin sanotuissa mofeteissa.',
    },
    'Dâmbovita': {
      lyhyt: 'Târgoviștessa Nicolae ja Elena Ceaușescu tuomittiin ja ammuttiin joulupäivänä 1989, ja varuskunnan rakennus on nyt museo.',
    },
    Dolj: {
      lyhyt: 'Craiovan Romanescu-puiston suunnitteli ranskalainen Édouard Redont, ja sen järven yli kaartuu yli sata vuotta vanha riippusilta.',
    },
    Galati: {
      lyhyt: 'Galațin terästehdas on Romanian suurin, ja Tonavan rannan telakalla rakennetaan yhä laivoja.',
    },
    Giurgiu: {
      lyhyt: 'Giurgiun ja Rusen välinen Ystävyyden silta valmistui 1954, ja se oli vuoteen 2013 ainoa silta Romaniasta Bulgariaan.',
    },
    Gorj: {
      lyhyt: 'Târgu Jiun puistossa kohoaa Constantin Brâncușin Loputon pylväs, lähes 30 metriä päällekkäisiä valurautamoduuleja.',
    },
    Harghita: {
      lyhyt: 'Pyhän Annan järvi täyttää sammuneen tulivuoren kraatterin, ja se on Romanian ainoa tulivuorijärvi.',
    },
    Hunedoara: {
      lyhyt: 'Hunedoaran Corvinin linna on yksi Euroopan suurimmista, ja sen portille johtaa pitkä puusilta korkeiden kivipilarien päällä.',
    },
    Ialomita: {
      lyhyt: 'Amaran suolaisen järven pohjamutaa käytetään kylpylässä reuman ja ihotautien hoitoon.',
    },
    Iasi: {
      lyhyt: 'Iașin kulttuuripalatsi on neogoottinen jättirakennus, jossa toimii nykyään neljä museota.',
    },
    Ilfov: {
      lyhyt: 'Snagovinjärven saarella seisoo luostari, jonne perimätiedon mukaan Vlad Seivästäjä on haudattu.',
    },
    Maramures: {
      lyhyt: 'Săpânțan Iloisella hautausmaalla ristit ovat kirkkaansinisiä, ja niihin on maalattu vainajan elämästä leikillinen kuva ja runo.',
    },
    Mehedinti: {
      lyhyt: 'Rautaportin kallioon on hakattu 55 metriä korkeat daakialaiskuningas Decebaluksen kasvot, Euroopan korkein kallioreliefi.',
    },
    Mures: {
      lyhyt: 'Sighișoaran linnoituksen muurien sisällä asutaan yhä, ja kellotornin lähellä on talo, jossa Vlad Seivästäjän kerrotaan syntyneen.',
    },
    Neamt: {
      lyhyt: 'Neamțin linnoitus kesti 1476 sulttaani Mehmed II:n piirityksen, ja kunnostettu linna kohoaa yhä Târgu Neamțin yllä.',
    },
    Olt: {
      lyhyt: 'Slatinan Alro-tehdas on yksi Euroopan suurimpia alumiinin tuottajia, ja valtaosa sen metallista viedään ulkomaille.',
    },
    Prahova: {
      lyhyt: 'Sinaian Peleșin linna oli ensimmäinen kokonaan sähkövaloin valaistu linna Euroopassa – virran tuotti oma voimala.',
    },
    Salaj: {
      lyhyt: 'Moigradin kukkuloilla ovat Porolissumin rauniot, Rooman Dakian maakunnan luoteisrajan suuren linnoituskaupungin jäänteet.',
    },
    'Satu Mare': {
      lyhyt: 'Satu Maren keskustaa vartioi 1904 rakennettu 47-metrinen palokunnan torni, josta vahdit aikanaan tähyilivät tulipaloja.',
    },
    Sibiu: {
      lyhyt: 'Sibiun kattoikkunat näyttävät silmiltä, jotka seuraavat kulkijaa, ja kaupunki oli Euroopan kulttuuripääkaupunki 2007.',
    },
    Suceava: {
      lyhyt: 'Voronețin luostarin ulkoseinät on maalattu täyteen raamatunkertomuksia, ja niiden syvä sävy tunnetaan Voronețin sinisenä.',
    },
    Teleorman: {
      lyhyt: 'Teleormanin nimi tarkoittaa kumaanien kielellä ”hullua metsää”, ja maakunnan Zimnicea on Romanian eteläisin paikkakunta.',
    },
    Timis: {
      lyhyt: 'Timișoaran kaduilla syttyivät sähkölamput jo 1884, ensimmäisenä kaupunkina Euroopassa.',
    },
    Tulcea: {
      lyhyt: 'Tulcean takana Tonava hajoaa suistoksi, jonka kaislikoissa pesii Euroopan suurin pelikaanikanta.',
    },
    Vaslui: {
      lyhyt: 'Vasluin lähellä Moldavian ruhtinas Tapani Suuri löi tammikuussa 1475 moninkertaisen osmaniarmeijan sumuisessa laaksossa.',
    },
    'Vâlcea': {
      lyhyt: 'Horezun luostari on Unescon maailmanperintöä, ja kylän savenvalajat koristavat astiansa yhä kukko- ja spiraalikuvioin.',
    },
    Vrancea: {
      lyhyt: 'Vrancean vuorten alla syvällä maankuoressa syntyvät Romanian pahimmat maanjäristykset – vuoden 1977 järistys tuhosi osia Bukarestista.',
    },
  },
  /*
   * CZE (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.CZE:n tunnuksia TÄSMÄLLEEN (Prahan tunnus on
   * "Prague"). Vain `lyhyt`. Prahan teksti välttää fokusvirran aiheet
   * (Karlštejn, Kultainen kuja, Klementinum, Tycho Brahe, hevoset).
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Jihočeský       — Český Krumlov Castle (barokkiteatteri,
   *                     alkuperäinen lavakoneisto)
   *   Jihomoravský    — Villa Tugendhat (Mies van der Rohe 1930, Unesco 2001)
   *   Karlovarský     — Karlovy Vary, Vřídlo (noin 73 °C)
   *   Královéhradecký — Sněžka (1 603 m, Tšekin korkein, Puolan raja)
   *   Liberecký       — Ještěd Tower (hotelli + lähetin, 1973)
   *   Moravskoslezský — Dolní Vítkovice (masuunit suljettu 1998)
   *   Olomoucký       — Holy Trinity Column (Unesco 2000)
   *   Pardubický      — Velká pardubická (1874 alkaen, Taxis-oja)
   *   Plzeňský        — Pilsner Urquell (1842)
   *   Prague          — Petřín Lookout Tower (1891, Eiffel-tornin mallinen,
   *                     299 askelmaa)
   *   Středočeský     — Sedlec Ossuary (40 000–70 000 vainajan luut)
   *   Ústecký         — Pravčická brána (Euroopan suurin luonnon
   *                     hiekkakivikaari)
   *   Vysočina        — Telč (Unesco 1992, renessanssiaukio)
   *   Zlínský         — Baťa's Skyscraper (johtajan toimisto hississä)
   */
  CZE: {
    'Jihočeský': {
      lyhyt: 'Český Krumlovin linnan barokkiteatterissa on säilynyt alkuperäinen puinen lavakoneisto kulisseineen, harvinaisuus koko Euroopassa.',
    },
    'Jihomoravský': {
      lyhyt: 'Brnon Tugendhatin huvila valmistui 1930 Mies van der Rohen piirustuksista, ja sen olohuoneen suuret ikkunat voi laskea lattian alle.',
    },
    'Karlovarský': {
      lyhyt: 'Karlovy Varyn kuumin lähde Vřídlo suihkuaa yli 70-asteista vettä, ja kylpylävieraat juovat lähdevettä nokallisista posliinikupeista.',
    },
    'Královéhradecký': {
      lyhyt: 'Krkonošen Sněžka on 1 603 metrillään Tšekin korkein vuori, ja sen huipun poikki kulkee raja Puolaan.',
    },
    'Liberecký': {
      lyhyt: 'Ještědin huipulla seisoo 1973 valmistunut suppilomainen torni, jossa on sekä televisiolähetin että hotelli ja ravintola.',
    },
    'Moravskoslezský': {
      lyhyt: 'Ostravan Dolní Vítkovicessa masuunit sammuivat 1998, ja nyt yhden niistä huipulle pääsee kiipeämään näköalapaikalle.',
    },
    'Olomoucký': {
      lyhyt: 'Olomoucin torilla kohoaa barokkinen Pyhän Kolminaisuuden pylväs, joka on Unescon maailmanperintöä ja kätkee jalustaansa pienen kappelin.',
    },
    'Pardubický': {
      lyhyt: 'Pardubicessa juostaan joka lokakuu Velká pardubická, yksi Euroopan rankimmista estelaukoista, ja sen pelätyin este on Taxis-oja.',
    },
    'Plzeňský': {
      lyhyt: 'Plzeňissä pantiin 1842 ensimmäinen vaalea pohjahiivaolut, ja sen mukaan pils-oluet saivat nimensä ympäri maailman.',
    },
    Prague: {
      lyhyt: 'Petřínin kukkulalla seisoo 1891 rakennettu näkötorni, Eiffel-tornin pienempi sukulainen, jonka huipulle noustaan 299 askelmaa.',
    },
    'Středočeský': {
      lyhyt: 'Kutná Horan Sedlecin luukappelin kattokruunu ja koristeet on koottu kymmenientuhansien vainajien luista.',
    },
    'Ústecký': {
      lyhyt: 'Böömin Sveitsin kansallispuistossa kohoaa Pravčická brána, Euroopan suurin luonnon muovaama hiekkakivikaari.',
    },
    'Vysočina': {
      lyhyt: 'Telčin pitkää toria reunustavat renessanssitalot pastellisävyisine päätyineen, ja koko vanha keskusta on Unescon maailmanperintöä.',
    },
    'Zlínský': {
      lyhyt: 'Zlín on Baťan kenkätehtaan kaupunki, ja sen pilvenpiirtäjässä johtajan työhuone oli hissi, joka liikkui kerroksesta toiseen.',
    },
  },
  /*
   * LUX (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.LUX:n tunnuksia TÄSMÄLLEEN (entiset piirit, jotka
   * lakkautettiin hallintoyksikköinä 2015). Vain `lyhyt`. Luxemburgin
   * teksti välttää fokusvirran aiheen (puretun linnoituksen muuri).
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Diekirch     — Vianden Castle + Victor Hugo House (Hugo 1871)
   *   Grevenmacher — Schengen Agreement (1985, Princesse Marie-Astrid
   *                  Mosel-joella, kolmen maan rajapiste)
   *   Luxembourg   — Transport in Luxembourg (maksuton julkinen liikenne
   *                  29.2.2020 alkaen)
   */
  LUX: {
    Diekirch: {
      lyhyt: 'Viandenin linna kohoaa Our-joen laakson yllä, ja joen varrella on talo, jossa Victor Hugo asui maanpaossa 1871.',
    },
    Grevenmacher: {
      lyhyt: 'Schengenin viinikylän edustalla allekirjoitettiin 1985 rajasopimus laivalla Mosel-joella, jossa Luxemburg, Saksa ja Ranska kohtaavat.',
    },
    Luxembourg: {
      lyhyt: 'Luxemburgissa bussit, junat ja raitiovaunut ovat olleet maksuttomia koko maassa helmikuusta 2020 lähtien.',
    },
  },
  /*
   * MLT (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.MLT:n englanninkielisiä piiritunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Southern Harbourin teksti välttää fokusvirran aiheen
   * (Pjazza Teatru Rjal). Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Southern Harbour — Saluting Battery (Upper Barrakka, laukaus
   *                      keskipäivällä)
   *   Northern Harbour — Malta Railway (1883–1931), Birkirkaran asema:
   *                      Malta Railway Foundation and Tram Museum 2023
   *   South Eastern    — Marsaxlokk, luzzu (silmä keulassa)
   *   Western          — Mdina ("Hiljainen kaupunki", autot vain asukkaille)
   *   Northern         — Rotunda of Mosta (pommi 9.4.1942, ei räjähtänyt)
   *   Gozo and Comino  — Azure Window (romahti 8.3.2017)
   */
  MLT: {
    'Southern Harbour': {
      lyhyt: 'Vallettan Upper Barrakka -puutarhan alla Saluting Battery laukaisee tykin joka päivä keskipäivällä Suuren sataman yli.',
    },
    'Northern Harbour': {
      lyhyt: 'Maltalla kulki 1883–1931 rautatie Vallettasta Mdinaan, ja sen Birkirkaran asemarakennus on nyt rautatiemuseo.',
    },
    'South Eastern': {
      lyhyt: 'Marsaxlokkin satamassa keinuvat kirjavat luzzu-kalastusveneet, joiden keulaan on maalattu suojeleva silmä.',
    },
    Western: {
      lyhyt: 'Muurien ympäröimää Mdinaa kutsutaan Hiljaiseksi kaupungiksi, sillä sen kapeille kujille saavat ajaa vain asukkaiden autot.',
    },
    Northern: {
      lyhyt: 'Mostan kirkon kupolin läpi putosi huhtikuussa 1942 saksalainen pommi, joka ei räjähtänyt – sen kopio on esillä kirkossa.',
    },
    'Gozo and Comino': {
      lyhyt: 'Gozon kuuluisa Azure Window -kivikaari romahti mereen myrskyssä maaliskuussa 2017, ja sen paikalla on nyt vain avomerta.',
    },
  },
  /*
   * BGR (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.BGR:n tunnuksia
   * TÄSMÄLLEEN ("Grad Sofiya" = pääkaupunki, "Sofia" = sitä ympäröivä
   * Sofian alue). Vain `lyhyt`. Teksti välttää Sofian fokusvirran
   * aiheet (Levski, Serdica, Sofia-patsas, eläintarha) ja Pernikin
   * fokuskohteen (Surva, kukerit). Lähteet (en-Wikipedia, tarkistettu
   * 25.9.2026):
   *   Blagoevgrad    — Melnik, Bulgaria (385 as., maan pienin kaupunki;
   *                    Melnik Earth Pyramids)
   *   Burgas         — Atanasovsko Lake (suolaa vuodesta 1906, Via Pontica)
   *   Dobrich        — Balchik Palace (kuningatar Marie; kaktuskokoelma
   *                    ulkona 1 000 m², Euroopan toiseksi suurin)
   *   Gabrovo        — Gabrovo ("international capital of humour and
   *                    satire", House of Humour and Satire)
   *   Grad Sofiya    — Alexander Nevsky Cathedral, Sofia (kullattu kupoli,
   *                    5 000 hengen tilat)
   *   Haskovo        — Haskovo (Jumalanäidin monumentti 32 m, 2003,
   *                    Guinness 2005)
   *   Yambol         — Yambol (Bezisten, 510-vuotisjuhla 2019, museo 2015)
   *   Kardzhali      — Perperikon (Balkanin suurin megaliittikohde,
   *                    jälkiä noin 5000 eaa.)
   *   Kyustendil     — Sapareva Banya (geysir 1957, vesi 103 °C)
   *   Lovech         — Devetashka cave (suu 35 m leveä, lähes 30 000
   *                    lepakkoa, Expendables 2 kuvattiin 2011)
   *   Montana        — Chiprovtsi (kelim-perinne Unescon aineettomaan
   *                    perintöön 2014)
   *   Pazardzhik     — Velingrad ("Spa Capital of the Balkans", yli 90
   *                    mineraalilähdettä)
   *   Pernik         — Pernik (hiilikaivokset 1900-luvulla, Underground
   *                    Mining Museum)
   *   Pleven         — Pleven Panorama (115 × 15 m, avattu 1977)
   *   Plovdiv        — Plovdiv (Euroopan kulttuuripääkaupunki 2019,
   *                    Kapana-kortteli)
   *   Razgrad        — Abritus (arkeologinen puisto; taistelu 251, Decius)
   *   Ruse           — Giurgiu–Ruse Friendship Bridge (1954, 2 223 m;
   *                    ainoa yhteinen silta New Europe Bridgeen asti)
   *   Silistra       — Srebarna Nature Reserve (Unesco, kiharapelikaani)
   *   Sliven         — Sliven Province (Sinite Kamani, yli 1 000
   *                    kasvilajia; bora-tuuli)
   *   Smolyan        — Devil's Throat Cave (Trigradin rotko, heitetyt
   *                    puut katosivat jäljettömiin)
   *   Sofia          — Koprivshtitsa (kansanperinnefestivaali vuodesta
   *                    1965, noin viiden vuoden välein)
   *   Stara Zagora   — Thracian Tomb of Kazanlak (300-luku eaa., Unesco)
   *   Shumen         — Shumen ("Monument to 1300 Years of Bulgaria" 1981;
   *                    Shumen Brewery 1882, maan ensimmäinen)
   *   Targovishte    — Targovishte (yksi Euroopan suurimmista
   *                    lasitehtaista, 1 500 työntekijää)
   *   Varna          — Roman Thermae (Varna) (Balkanin suurimmat, holvit
   *                    20–22 m)
   *   Veliko Tarnovo — Tsarevets (fortress) (ääni- ja valonäytös)
   *   Vidin          — Baba Vida ("the only entirely preserved medieval
   *                    castle in the country")
   *   Vratsa         — Rogozen Treasure (1985, traktorinkuljettaja,
   *                    yli 20 kg; Vratsan museo ja Sofian kansallismuseo)
   */
  BGR: {
    Blagoevgrad: {
      lyhyt: 'Pirinin rinteellä Melnik on Bulgarian pienin kaupunki, alle 400 asukasta, ja sen takana kohoavat sateen ja tuulen veistämät hiekkapyramidit.',
    },
    Burgas: {
      lyhyt: 'Burgasin pohjoispuolella Atanasovskojärvestä nostetaan yhä merisuolaa, ja syksyisin järven yli kulkee lintujen muuttoreitti Via Pontica.',
    },
    Dobrich: {
      lyhyt: 'Baltšikin rannalla on Romanian kuningatar Marian kesäpalatsi, ja sen puutarhassa kasvaa ulkona yksi Euroopan suurimmista kaktuskokoelmista.',
    },
    Gabrovo: {
      lyhyt: 'Gabrovoa kutsutaan huumorin pääkaupungiksi: kaupunkilaisten kitsaudesta kerrotaan vitsejä, ja kaupungissa on oma Huumorin ja satiirin talo.',
    },
    'Grad Sofiya': {
      lyhyt: 'Sofian keskustaa hallitsevat Aleksanteri Nevskin katedraalin kullatut kupolit, ja kirkkoon mahtuu kerralla viisituhatta ihmistä.',
    },
    Haskovo: {
      lyhyt: 'Haskovon kukkulalla seisoo 32-metrinen Jumalanäidin patsas, joka on päässyt Guinnessin ennätysten kirjaan maailman korkeimpana laatuaan.',
    },
    Yambol: {
      lyhyt: 'Jambolin keskustassa seisoo yli viisisataa vuotta vanha katettu kauppahalli Bezisten, joka on nykyään museo.',
    },
    Kardzhali: {
      lyhyt: 'Kardžalin lähellä kalliokukkulalla on Perperikon, Balkanin suurin megaliittikohde, jonka vanhimmat jäljet ovat noin 7 000 vuoden takaa.',
    },
    Kyustendil: {
      lyhyt: 'Rilan juurella Sapareva Banjan keskustassa suihkuaa geysir, jonka mineraalivesi on kuumimmillaan 103-asteista.',
    },
    Lovech: {
      lyhyt: 'Devetaškin luolan suu on 35 metriä leveä, ja sen holveissa elää lähes 30 000 lepakkoa – luolassa on kuvattu myös Hollywood-elokuva.',
    },
    Montana: {
      lyhyt: 'Tšiprovtsissa kudotaan yhä käsin kelim-mattoja, ja kylän mattoperinne otettiin Unescon aineettoman kulttuuriperinnön luetteloon 2014.',
    },
    Pazardzhik: {
      lyhyt: 'Rodopien Velingradia kutsutaan Balkanin kylpyläpääkaupungiksi, sillä kaupungissa ja sen ympärillä on yli 90 mineraalilähdettä.',
    },
    Pernik: {
      lyhyt: 'Pernik kasvoi 1900-luvulla hiilikaivosten varaan, ja kaupungissa voi yhä laskeutua maanalaiseen kaivosmuseoon.',
    },
    Pleven: {
      lyhyt: 'Plevenin panoraamamuseossa 115 metriä pitkä maalaus kiertää katsojan ympäri ja kuvaa kaupungin piiritystä vuodelta 1877.',
    },
    Plovdiv: {
      lyhyt: 'Plovdiv oli Euroopan kulttuuripääkaupunki 2019, ja sen vanhoista Kapanan käsityöläiskujista on tullut kahviloiden ja gallerioiden kortteli.',
    },
    Razgrad: {
      lyhyt: 'Razgradin arkeologisessa puistossa on Abrituksen raunioita; lähistöllä gootit löivät Rooman armeijan vuonna 251, ja keisari Decius kaatui.',
    },
    Ruse: {
      lyhyt: 'Rusesta kulkee Tonavan yli Romaniaan yli kaksikilometrinen Ystävyyden silta, joka oli vuosikymmeniä maiden ainoa yhteinen silta.',
    },
    Silistra: {
      lyhyt: 'Tonavan rannan Srebarnajärvellä pesivät kiharapelikaanit, ja järven luonnonsuojelualue kuuluu Unescon maailmanperintöön.',
    },
    Sliven: {
      lyhyt: 'Slivenin yllä kohoavat Siniset kivet, luonnonpuisto, jossa kasvaa yli tuhat kasvilajia – kaupunki tunnetaan myös puuskaisesta bora-tuulestaan.',
    },
    Smolyan: {
      lyhyt: 'Trigradin rotkossa joki syöksyy vesiputouksena Paholaisen kurkun luolaan, ja veden mukana heitetyt puut ovat kadonneet sinne jäljettömiin.',
    },
    Sofia: {
      lyhyt: 'Koprivštitsan museokaupungissa järjestetään noin viiden vuoden välein Bulgarian kansallinen kansanperinnefestivaali, jo vuodesta 1965.',
    },
    'Stara Zagora': {
      lyhyt: 'Kazanlakin traakialaisen hautakammion seinissä on yli 2 000 vuotta vanhoja maalauksia, ja hauta on Unescon maailmanperintöä.',
    },
    Shumen: {
      lyhyt: 'Šumenin ylängöllä seisoo 1981 rakennettu jättimäinen muistomerkki Bulgarian 1300 vuoden kunniaksi, ja kaupungin panimo on maan vanhin.',
    },
    Targovishte: {
      lyhyt: 'Targovištessa toimii yksi Euroopan suurimmista lasitehtaista, joka työllistää noin 1 500 ihmistä.',
    },
    Varna: {
      lyhyt: 'Varnan keskustassa ovat Balkanin suurimmat roomalaiset kylpylät, joiden holvit kohosivat aikanaan yli 20 metrin korkeuteen.',
    },
    'Veliko Tarnovo': {
      lyhyt: 'Veliko Tarnovon keskiaikainen Tsarevetsin linnoitus herää iltaisin eloon ääni- ja valonäytöksessä, kun muurit valaistaan värein.',
    },
    Vidin: {
      lyhyt: 'Tonavan rannalla Vidinissä seisoo Baba Vida, Bulgarian ainoa kokonaan säilynyt keskiaikainen linna.',
    },
    Vratsa: {
      lyhyt: 'Rogozenin kylästä löytyi 1985 yli 20 kilon traakialainen hopea-aarre, kun traktorinkuljettaja kaivoi puutarhaansa kasteluputkea varten.',
    },
  },
  /*
   * HRV (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.HRV:n tunnuksia TÄSMÄLLEEN (osa ilman diakriittejä,
   * esim. "Dubrovacko-Neretvanska"). Vain `lyhyt`. Dubrovnik-Neretvan
   * teksti välttää Dubrovnikin fokusvirran aiheet (muurit, Lokrum,
   * Sponza, Ragusan veronmaksu) ja Istrian teksti Pulan areenan.
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026, ellei toisin mainita):
   *   Bjelovarsko-bilogorska — Daruvar (tšekkiläisvähemmistön keskus,
   *                            lähteet roomalaisajalta)
   *   Brodsko-Posavska       — Brod Fortress (1715–1780, 4 000 sotilasta,
   *                            150 tykkiä)
   *   Dubrovacko-Neretvanska — Time Out Croatia "Neretva mandarins" ja
   *                            Croatia Week (yli miljoona puuta, 80 %
   *                            Kroatian mandariineista); Opuzen
   *   Istarska               — Hum, Istria County (52 as. 2021, "one of
   *                            the smallest towns in the world")
   *   Karlovacka             — Karlovac ("town on four rivers", Aquatika
   *                            22.10.2016)
   *   Koprivničko-Križevačka — Vegeta (condiment) (Podravka, Koprivnica,
   *                            myynnissä 1959)
   *   Krapinsko-Zagorska     — Krapina (Hušnjakovo 1899, yli 800 fossiilia,
   *                            museo löytöpaikalla)
   *   Licko-Senjska          — Nikola Tesla (syntyi Smiljanissa Gospićin
   *                            lähellä; muistokeskus)
   *   Medimurska             — Međimurje County (pohjoisin; pienin, kun
   *                            Zagrebin kaupunkia ei lasketa)
   *   Osjecko-Baranjska      — Kopački Rit (Draava ja Tonava, noin 260
   *                            lintulajia)
   *   Primorsko-Goranska     — Rijeka (Whiteheadin torpedo 1866; Euroopan
   *                            kulttuuripääkaupunki 2020)
   *   Šibensko-Kninska       — Šibenik (Pyhän Jaakobin katedraali 2000,
   *                            Pyhän Nikolauksen linnoitus 2017)
   *   Sisacko-Moslavacka     — storkvillages.net "Čigoć, Croatia" ja
   *                            Kuwait Times (EuroNatur 1994, yli 300
   *                            haikaraa, enemmän kuin asukkaita)
   *   Splitsko-Dalmatinska   — Sinjska alka (vuodesta 1715, Unesco 2010)
   *   Varaždinska            — Varaždin (pääkaupunki 1756–1776, Špancirfest)
   *   Viroviticko-Podravska  — Papuk (Kroatian ensimmäinen geopuisto,
   *                            Euroopan geopuistoverkostoon 2007)
   *   Vukovarsko-Srijemska   — Vukovar water tower (yli 600 osumaa 1991,
   *                            muistomerkkinä avattu 30.10.2020)
   *   Zadarska               — Sea organ (Nikola Bašić, 15.4.2005)
   *   Zagrebacka             — Samobor (samoborska kremšnita)
   *   Grad Zagreb            — Museum of Broken Relationships (2010;
   *                            Kenneth Hudson -palkinto 2011)
   */
  HRV: {
    'Bjelovarsko-bilogorska': {
      lyhyt: 'Daruvar on Kroatian tšekkiläisvähemmistön keskus, ja kaupungin lämpimissä lähteissä on kylvetty jo roomalaisten aikaan.',
    },
    'Brodsko-Posavska': {
      lyhyt: 'Slavonski Brodissa Savan rannalla on Itävallan 1700-luvulla rakentama tähtilinnoitus, johon mahtui 4 000 sotilasta ja 150 tykkiä.',
    },
    'Dubrovacko-Neretvanska': {
      lyhyt: 'Neretvan suistossa Opuzenin ja Metkovićin tienoilla kasvaa yli miljoona mandariinipuuta, ja niistä tulee valtaosa Kroatian mandariineista.',
    },
    Istarska: {
      lyhyt: 'Istrian kukkuloilla muurien ympäröimää Humia sanotaan yhdeksi maailman pienimmistä kaupungeista – asukkaita on noin viisikymmentä.',
    },
    Karlovacka: {
      lyhyt: 'Karlovacia kutsutaan neljän joen kaupungiksi, ja siellä avattiin 2016 Kroatian ensimmäinen makean veden akvaario Aquatika.',
    },
    'Koprivničko-Križevačka': {
      lyhyt: 'Koprivnicassa on Podravka-elintarvikeyhtiön koti, ja siellä on valmistettu Vegeta-maustetta vuodesta 1959 lähtien.',
    },
    'Krapinsko-Zagorska': {
      lyhyt: 'Krapinan Hušnjakovon mäeltä löytyi 1899 yli 800 neandertalinihmisen fossiilia, ja löytöpaikalle on rakennettu moderni museo.',
    },
    'Licko-Senjska': {
      lyhyt: 'Nikola Tesla syntyi Smiljanin kylässä Gospićin lähellä, ja hänen synnyinkotinsa on nykyään muistokeskus.',
    },
    Medimurska: {
      lyhyt: 'Muran ja Draavan väliin jäävä Međimurje on Kroatian pohjoisin ja pinta-alaltaan pienin maakunta, kun Zagrebin kaupunkia ei lasketa.',
    },
    'Osjecko-Baranjska': {
      lyhyt: 'Draavan ja Tonavan yhtymäkohdassa Kopački Ritin tulvasuolla elää noin 260 lintulajia, merikotkista haikaroihin.',
    },
    'Primorsko-Goranska': {
      lyhyt: 'Rijekassa suunniteltiin ja testattiin 1866 maailman ensimmäinen torpedo, ja kaupunki oli Euroopan kulttuuripääkaupunki 2020.',
    },
    'Šibensko-Kninska': {
      lyhyt: 'Šibenikissä on kaksi Unescon maailmanperintökohdetta: Pyhän Jaakobin katedraali ja satamansuuta vartioiva Pyhän Nikolauksen linnoitus.',
    },
    'Sisacko-Moslavacka': {
      lyhyt: 'Lonjsko poljen Čigoć nimettiin 1994 Euroopan ensimmäiseksi haikarakyläksi – haikaroita oli enemmän kuin kylässä ihmisiä.',
    },
    'Splitsko-Dalmatinska': {
      lyhyt: 'Sinjissä ratsastetaan joka elokuu Alka-kilpailu, jossa laukkaava ratsastaja tähtää keihäällä rautarenkaaseen – perinne alkoi 1715.',
    },
    'Varaždinska': {
      lyhyt: 'Barokkinen Varaždin oli Kroatian pääkaupunki vuoteen 1776, ja nykyään sen kadut täyttää loppukesällä Špancirfest-katufestivaali.',
    },
    'Viroviticko-Podravska': {
      lyhyt: 'Papukin vuoriston geopuisto oli Kroatian ensimmäinen, ja se liitettiin 2007 Euroopan geopuistojen verkostoon.',
    },
    'Vukovarsko-Srijemska': {
      lyhyt: 'Vukovarin vesitorniin osui piirityksessä 1991 yli 600 ammusta, ja se on jätetty reikäiseksi muistomerkiksi, jonka huipulle pääsee.',
    },
    Zadarska: {
      lyhyt: 'Zadarin rannan Meriurut soivat aaltojen tahdissa: kiviportaiden alla putkiin painuva vesi puhaltaa ilmaa ja synnyttää säveliä.',
    },
    Zagrebacka: {
      lyhyt: 'Samobor on zagrebilaisten suosima retkikaupunki, ja sen kuuluisin herkku on samoborska kremšnita, vaniljakermaleivos.',
    },
    'Grad Zagreb': {
      lyhyt: 'Zagrebin Särkyneiden suhteiden museossa on esillä erojen muistoesineitä tarinoineen, ja se sai 2011 eurooppalaisen museopalkinnon.',
    },
  },
  /*
   * MNE (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 2B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.MNE:n tunnuksia TÄSMÄLLEEN (kunnat; "Nikšic" ilman
   * ć-kirjainta kuten datassa). Vain `lyhyt`. Bijelo Poljen tekstissä
   * EI käytetä Miroslavin evankeliumia, koska en-Wikipedian artikkelit
   * ovat sen kirjoituspaikasta ristiriidassa (Bijelo Polje vs. Kotor).
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Andrijevica  — Komovi (Kom Kučki 2 487 m; Kolašin ja Andrijevica)
   *   Bar          — Stara Maslina (yli 2 000 v, Stari Bar)
   *   Berane       — Berane (Đurđevi Stupovi 1100-luvun lopulla, Lim)
   *   Bijelo Polje — Bijelo Polje (Lim; islam 49,1 %, ortodoksit 45,2 %)
   *   Budva        — Sveti Stefan (tombolo, hotelliksi Jugoslavian aikana)
   *   Cetinje      — Cetinje ("Old Royal Capital", Sininen palatsi)
   *   Danilovgrad  — Ostrog Monastery (1–1,2 miljoonaa kävijää vuodessa)
   *   Herceg Novi  — Herceg Novi (mimosajuhla, JUK Herceg-Fest)
   *   Kolašin      — Biogradska Gora (aarniometsä, yli 500-vuotiaita puita)
   *   Kotor        — Kotor (kissat symbolina, kissamuseo, Trg od mačaka)
   *   Mojkovac     — Mojkovac (Sinjajevinan laitumet, lampaat)
   *   Nikšic       — Trebjesa Brewery (1896, maan suurin panimo)
   *   Plav         — Plav Lake (suurin jäätikköjärvi, lähteet)
   *   Pljevlja     — Husein-paša's Mosque (1573–1594, minareetti 42 m)
   *   Plužine      — Piva Monastery (siirretty 1982, yli 1 000
   *                  freskokappaletta)
   *   Podgorica    — Podgorica (Titograd 1946–1992, Ribnica ja Morača)
   *   Rožaje       — Rožaje (noin 1 014 m, Ibarin lähde)
   *   Šavnik       — Šavnik (perustettu 1861, 364 as. 2023, kolme jokea)
   *   Tivat        — Tivat (arsenaali 1889, Porto Montenegro)
   *   Ulcinj       — Velika Plaža (12 km, Montenegron pisin, leijalautailu)
   *   Žabljak      — Žabljak (1 456 m, "the highest situated Balkan town",
   *                  Mustajärvi)
   */
  MNE: {
    Andrijevica: {
      lyhyt: 'Andrijevica jakaa Kolašinin kanssa Komovin vuoriston, jonka korkein huippu Kom Kučki kohoaa 2 487 metriin.',
    },
    Bar: {
      lyhyt: 'Stari Barin lähellä kasvaa oliivipuu Stara maslina, jonka arvellaan olevan yli 2 000 vuotta vanha – yksi maailman vanhimmista.',
    },
    Berane: {
      lyhyt: 'Limin varrella Beranen laidalla kohoaa Đurđevi Stupovin luostari, joka rakennettiin jo 1100-luvun lopulla.',
    },
    'Bijelo Polje': {
      lyhyt: 'Limin varren Bijelo Polje on Pohjois-Montenegron keskus, jonka asukkaista lähes puolet on muslimeja ja lähes puolet ortodokseja.',
    },
    Budva: {
      lyhyt: 'Sveti Stefanin kalastajakylä on pieni saari hiekkakannaksen päässä, ja koko kylä muutettiin Jugoslavian aikana luksushotelliksi.',
    },
    Cetinje: {
      lyhyt: 'Cetinje on virallisesti Montenegron vanha kuninkaallinen pääkaupunki, ja presidentin virka-asunto Sininen palatsi on yhä siellä.',
    },
    Danilovgrad: {
      lyhyt: 'Ostrogin luostari on rakennettu pystysuoraan kallioseinään, ja sinne nousee vuosittain yli miljoona pyhiinvaeltajaa.',
    },
    'Herceg Novi': {
      lyhyt: 'Herceg Novissa keltaiset mimosat kukkivat jo talvella, ja kaupunki juhlii niitä joka vuosi omalla mimosajuhlallaan.',
    },
    'Kolašin': {
      lyhyt: 'Kolašinin Biogradska Gorassa on yksi Euroopan viimeisistä aarniometsistä, ja osa sen puista on yli 500 vuotta vanhoja.',
    },
    Kotor: {
      lyhyt: 'Kotorin vanhassakaupungissa kissoja on niin paljon, että niistä on tullut kaupungin symboli – niillä on oma aukionsa ja museonsa.',
    },
    Mojkovac: {
      lyhyt: 'Mojkovacin yllä leviää Sinjajevinan ylänkö, jonka laajoilla kesälaitumilla paimenet pitävät yhä lampaitaan.',
    },
    'Nikšic': {
      lyhyt: 'Nikšićin Trebjesan panimo on Montenegron suurin, ja kaupungissa on pantu olutta 1800-luvun lopulta asti.',
    },
    Plav: {
      lyhyt: 'Kirottujen vuorten juurella Plavin järvi on Montenegron suurin jäätikköjärvi, ja sitä ruokkivat maan alta pulppuavat lähteet.',
    },
    Pljevlja: {
      lyhyt: 'Pljevljan Husein-pašan moskeija valmistui 1500-luvun lopulla, ja sen 42-metrinen minareetti on Balkanin korkeimpia.',
    },
    'Plužine': {
      lyhyt: 'Pivan luostari siirrettiin kivi kiveltä uuteen paikkaan padon tieltä, ja yli tuhat freskon kappaletta irrotettiin ja kiinnitettiin takaisin.',
    },
    Podgorica: {
      lyhyt: 'Montenegron pääkaupunki Podgorica kantoi 1946–1992 nimeä Titograd, ja se on rakentunut Ribnica- ja Morača-jokien yhtymäkohtaan.',
    },
    'Rožaje': {
      lyhyt: 'Rožaje on noin kilometrin korkeudessa vuorten keskellä, ja kaupungin luota alkava Ibar-joki halkaisee sen kahtia.',
    },
    'Šavnik': {
      lyhyt: 'Kolmen joen yhtymäkohtaan 1861 perustetussa Šavnikissa asuu vain noin 360 ihmistä – se on Montenegron pienimpiä kaupunkeja.',
    },
    Tivat: {
      lyhyt: 'Tivatin vanha, 1889 rakennettu laivastoarsenaali on muutettu Porto Montenegroksi, luksusjahtien satamaksi ja lomakyläksi.',
    },
    Ulcinj: {
      lyhyt: 'Ulcinjin Velika plaža on 12 kilometriä pitkä, Montenegron pisin hiekkaranta, ja kesätuulet tekevät siitä leijalautailijoiden suosikin.',
    },
    'Žabljak': {
      lyhyt: 'Durmitorin juurella 1 456 metrin korkeudessa Žabljak on Balkanin korkeimmalla sijaitseva kaupunki, ja Mustajärvelle pääsee kävellen.',
    },
  },
  /*
   * SRB (Sisältökirjuri 25.9.2026, erä 2C, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.SRB:n tunnuksia
   * TÄSMÄLLEEN (piirit ilman diakriitteja osassa, esim. "Branicevski").
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja matkailusivut, tarkistettu
   * 25.9.2026):
   *   Grad Beograd      — Belgrade Fortress (Kalemegdan, Savan ja Tonavan
   *                       yhtymäkohta)
   *   Borski            — Lepenski Vir (Boljetin, Majdanpekin kunta;
   *                       siirretty 1971 ~100 m alavirtaan ja 30 m ylemmäs
   *                       Rautaportti I:n padon alta)
   *   Branicevski       — Viminacium (Ylä-Moesian pääkaupunki, legioonaleiri,
   *                       Kostolac/Požarevac)
   *   Južno-Backi       — Petrovaradin Fortress (kellon viisarit
   *                       käänteiset: iso viisari = tunnit, kalastajia varten)
   *   Jablanicki        — Leskovac (Roštiljijada syyskuun alussa vuodesta 1989)
   *   Srednje-Banatski  — Carska Bara (17 km Zrenjaninista etelään,
   *                       240 lintulajia, ~50 000 tundrahanhea talvella)
   *   Kolubarski        — Valjevo (Tešnjar, vanha kauppakortteli
   *                       Kolubaran rannalla)
   *   Zapadno-Backi     — Franz Eisenhut: Battle of Senta (7 × 4 m,
   *                       Somborin Županija-talo, Serbian suurin öljymaalaus;
   *                       serbia.com, visitsombor.org)
   *   Macvanski         — Tršić (Loznica; Vuk Karadžićin syntymäkylä)
   *   Moravicki         — Guča Trumpet Festival (Lučani, 1961 alkaen,
   *                       elokuun alussa, 2024 ~150 000 kävijää/päivä)
   *   Nišavski          — Niš / Mediana (Konstantinus Suuren syntymäkaupunki
   *                       Naissus, huvila Mediana)
   *   Severno-Banatski  — Kikinda (sarvipöllöjen talviyöpymät kaupungin
   *                       puistoissa, ennätys 743 lintua 2009, "Serbian
   *                       owl capital")
   *   Pcinjski          — Vranjska Banja (96 °C, Serbian kuumimmat lähteet)
   *   Pirotski          — Pirot carpet (maantieteellinen alkuperäsuoja 2002,
   *                       122 ornamenttia, osuuskunta 1902)
   *   Podunavski        — Smederevo Fortress (Đurađ Branković, 1400-luku)
   *   Severno-Backi     — Subotica City Hall (jugend), Palić
   *   Pomoravski        — Manasija (Despotovac, Stefan Lazarević,
   *                       1407–1418, linnoitusmuurit). HUOM datavirhe:
   *                       maakunnat-nimet.js antaa nimiFi "Rasina", vaikka
   *                       tunnus on Pomoravski (Pomoravlje).
   *   Raški             — Studenica (Kraljevo, perustettu 1190, Unesco 1986)
   *   Južno-Banatski    — Deliblato Sands ("the largest sandy terrain in
   *                       Europe", "European Sahara", Kovin)
   *   Sremski           — Fruška Gora National Park (1960, Serbian vanhin,
   *                       16 toimivaa luostaria)
   *   Šumadijski        — Stellantis Kragujevac (Fiat Grande Panda,
   *                       sähkö/hybridi/bensiini, 2024–)
   *   Toplicki          — Đavolja Varoš (Kuršumlija, ~200 maapyramidia)
   *   Zajecarski        — Gamzigrad / Felix Romuliana (Galerius, Unesco 2007)
   *   Zlatiborski       — Šargan Eight (Mokra Gora, kapearaiteinen museorata)
   */
  SRB: {
    'Grad Beograd': {
      lyhyt: 'Kalemegdanin linnoituksen muureilta keskellä Belgradia näkee kohdan, jossa Sava laskee Tonavaan.',
    },
    Borski: {
      lyhyt: 'Lepenski Virin kivikautinen kylä siirrettiin 1971 ylemmäs rinteeseen, kun Rautaportin pato alkoi nostaa Tonavan pintaa.',
    },
    Branicevski: {
      lyhyt: 'Požarevacin lähellä kaivetaan esiin Viminaciumia, joka oli Rooman Ylä-Moesian maakunnan pääkaupunki ja legioonan leiri.',
    },
    'Južno-Backi': {
      lyhyt: 'Novi Sadin Petrovaradinin linnoituksen kellossa iso viisari näyttää tunnit, jotta Tonavan kalastajat erottivat ajan kaukaa.',
    },
    Jablanicki: {
      lyhyt: 'Leskovacin pääkatu suljetaan joka syyskuun alussa Roštiljijada-grillijuhlille, joita on pidetty vuodesta 1989.',
    },
    'Srednje-Banatski': {
      lyhyt: 'Zrenjaninin eteläpuolella on Carska baran kosteikko, jossa on tavattu noin 240 lintulajia ja talvella kymmeniä tuhansia hanhia.',
    },
    Kolubarski: {
      lyhyt: 'Valjevon Tešnjar on vanha kauppakortteli Kolubara-joen rannalla, ja sen kivetyillä kujilla istutaan yhä kahviloissa.',
    },
    'Zapadno-Backi': {
      lyhyt: 'Somborin maakuntatalon juhlasalissa riippuu Sentan taistelu, seitsemän metriä leveä öljymaalaus – Serbian suurin.',
    },
    Macvanski: {
      lyhyt: 'Tršićin kylässä syntyi Vuk Karadžić, joka uudisti serbian kirjakielen niin, että sitä kirjoitetaan niin kuin puhutaan.',
    },
    Moravicki: {
      lyhyt: 'Gučan kylässä soi joka elokuu trumpettifestivaali, joka alkoi 1961 neljän orkesterin kisana ja vetää nyt satoja tuhansia kuulijoita.',
    },
    'Nišavski': {
      lyhyt: 'Niš oli roomalaisten Naissus, jossa syntyi keisari Konstantinus Suuri – hänen Mediana-huvilansa rauniot ovat kaupungin laidalla.',
    },
    'Severno-Banatski': {
      lyhyt: 'Kikindan puistojen puihin kerääntyy talveksi satoja sarvipöllöjä, ja kaupunkia kutsutaan Serbian pöllöpääkaupungiksi.',
    },
    Pcinjski: {
      lyhyt: 'Vranjska Banjan lähteistä purkautuu 96-asteista vettä, ja ne ovat Serbian kuumimmat.',
    },
    Pirotski: {
      lyhyt: 'Pirotissa kudotaan yhä kilim-mattoja, ja niiden yli sata perinteistä kuviota on suojattu alkuperämerkinnällä vuodesta 2002.',
    },
    Podunavski: {
      lyhyt: 'Smederevon linnoitus rakennettiin Tonavan rantaan 1400-luvulla despootti Đurađ Brankovićin pääkaupungiksi, ja sen tornit seisovat yhä.',
    },
    'Severno-Backi': {
      lyhyt: 'Subotican kaupungintalo on unkarilaista jugendia, ja läheisen Palićjärven rannalla on saman aikakauden kylpyläpaviljonkeja.',
    },
    Pomoravski: {
      lyhyt: 'Despotovacin Manasijan luostaria ympäröivät linnoitusmuurit ja tornit – despootti Stefan Lazarević rakennutti sen 1400-luvun alussa.',
    },
    'Raški': {
      lyhyt: 'Kraljevon lähellä oleva Studenican luostari perustettiin 1100-luvun lopulla, ja sen marmorikirkko on Unescon maailmanperintöä.',
    },
    'Južno-Banatski': {
      lyhyt: 'Deliblaton hiekka-alue on Euroopan suurin sisämaan hiekkakenttä, ja sen dyynejä kutsutaan Euroopan Saharaksi.',
    },
    Sremski: {
      lyhyt: 'Fruška Gora on Serbian vanhin kansallispuisto, ja sen metsäisillä rinteillä toimii yhä kuusitoista ortodoksista luostaria.',
    },
    'Šumadijski': {
      lyhyt: 'Kragujevacin autotehtaalla kootaan nykyään Fiatin Grande Panda -malleja, myös sähköautoina.',
    },
    Toplicki: {
      lyhyt: 'Kuršumlijan lähellä on Đavolja varoš eli Paholaisen kaupunki: parisataa maapyramidia, joiden huipuilla keikkuu kivilohkareita.',
    },
    Zajecarski: {
      lyhyt: 'Zaječarin lähellä on Felix Romuliana, keisari Galeriuksen palatsi, joka on ollut Unescon maailmanperintöä vuodesta 2007.',
    },
    Zlatiborski: {
      lyhyt: 'Mokra Goran Šarganin kasi on kapearaiteinen museorata, joka nousee vuoren rinnettä kahdeksikon muotoisena silmukkana.',
    },
  },
  /*
   * BIH (Sisältökirjuri 25.9.2026, erä 2C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.BIH:n tunnuksia TÄSMÄLLEEN (sekaisin federaation
   * kantoneita, Republika Srpskan alueita ja Brčkon piiri, englanninkieliset
   * tunnukset kuten "Central Bosnia"). Tekstit kuvaavat maisemaa ja
   * kulttuuria, eivät sotaa tai entiteettirajoja. Sarajevon fokusvirran
   * aiheet (Mostarin silta, olympialaiset/Bjelašnica, Livnon villihevoset,
   * haggada) on vältetty. Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Banja Luka          — Banja Luka (Vrbas, Kastel)
   *   Bijeljina           — Stanišići (etnokylä 2003, vanhoja taloja eri
   *                         puolilta entistä Jugoslaviaa)
   *   Bosnian Podrinje    — Goražde printing house (1519–1523, ensimmäinen
   *                         nykyisen BiH:n alueella, kirkkoslaavi)
   *   Brčko Distrikt      — Brčko District (Sava, oma hallinto)
   *   Central Bosnia      — Jajce (Plivan putous Vrbakseen, linnoitus)
   *   Doboj               — Doboj (linnoitus Bosnan laaksossa,
   *                         rautatieristeys)
   *   Foča                — Sutjeska National Park (Perućica, Maglić
   *                         2 386 m, BiH:n korkein)
   *   Herzegovina-Neretva — Blagaj Tekke / Vrelo Bune (~30 m³/s, yksi
   *                         Euroopan suurimmista lähteistä, tekke ~1520)
   *   Posavina            — Posavina Canton (pienin kantoni, 330,85 km²)
   *   Sarajevo            — Sebilj (Baščaršija, paluulegenda)
   *   Sarajevo-romanija   — Jahorina (BiH:n suurin laskettelukeskus,
   *                         Ogorjelica 1 916 m)
   *   Trebinje            — Trebinje (yli satavuotiaat plataanit torilla,
   *                         Trebišnjica)
   *   Tuzla               — Tuzla (Pannonian suolajärvet 2003–2012,
   *                         nimi = turkin 'suolakaivos')
   *   Una-Sana            — Štrbački buk (25 m, Unan kansallispuiston
   *                         korkein putous, Kroatian rajalla)
   *   Vlasenica           — Birač (region); Drina rajajokena. Neutraali
   *                         maisemakuvaus tarkoituksella.
   *   West Bosnia         — Livno cheese (1886, sveitsiläiset juustomestarit,
   *                         gruyèren menetelmä)
   *   West Herzegovina    — Kravica (Trebižat, Ljubuški)
   *   Zenica-Doboj        — Zenica (teräksen tuotanto vuodesta 1892)
   */
  BIH: {
    'Banja Luka': {
      lyhyt: 'Banja Lukan keskustan halki virtaa Vrbas-joki, jonka rannalla seisoo Kastelin linnoitus ja jonka koskissa lasketaan kumiveneillä.',
    },
    Bijeljina: {
      lyhyt: 'Bijeljinan laitaan on koottu Stanišićin etnokylä, jonne on tuotu vanhoja puutaloja ja myllyjä eri puolilta entistä Jugoslaviaa.',
    },
    'Bosnian Podrinje': {
      lyhyt: 'Goražden lähellä toimi 1519–1523 nykyisen Bosnia ja Hertsegovinan ensimmäinen kirjapaino, jossa painettiin kirkkoslaavinkielisiä kirjoja.',
    },
    'Brčko Distrikt': {
      lyhyt: 'Brčko on Sava-joen satamakaupunki, ja piirillä on oma pormestarinsa, parlamenttinsa ja hallintonsa.',
    },
    'Central Bosnia': {
      lyhyt: 'Jajcen keskustassa Pliva-joki syöksyy vesiputouksena Vrbakseen, ja putouksen yllä kohoaa vanhan linnoituksen muuri.',
    },
    Doboj: {
      lyhyt: 'Dobojn linnoitus valvoo mäeltä Bosna-joen laaksoa, ja kaupunki on maan rautateiden tärkeä risteysasema.',
    },
    'Foča': {
      lyhyt: 'Sutjeskan kansallispuistossa kasvaa Perućican aarniometsä, ja sen reunalla kohoaa Maglić, Bosnia ja Hertsegovinan korkein huippu.',
    },
    'Herzegovina-Neretva': {
      lyhyt: 'Blagajssa Buna-joki pulppuaa kallion alta yhtenä Euroopan suurimmista lähteistä, ja sen partaalla seisoo 1500-luvun dervissitalo.',
    },
    Posavina: {
      lyhyt: 'Posavina on maan pienin kantoni, vain 331 neliökilometriä, ja sen pohjoisrajana virtaa Sava-joki.',
    },
    Sarajevo: {
      lyhyt: 'Sarajevon Baščaršijan puinen Sebilj-kaivo on vanhankaupungin tunnus, ja tarun mukaan siitä juonut palaa kaupunkiin.',
    },
    'Sarajevo-romanija': {
      lyhyt: 'Jahorina on Bosnia ja Hertsegovinan suurin laskettelukeskus, ja sen korkein huippu Ogorjelica nousee 1 916 metriin.',
    },
    Trebinje: {
      lyhyt: 'Trebinjen vanhaa toria varjostavat yli satavuotiaat plataanit, ja kaupungin halki virtaa kirkas Trebišnjica-joki.',
    },
    Tuzla: {
      lyhyt: 'Tuzla seisoo suolakerrosten päällä, ja keskustaan on kaivettu suolavetisiä uimajärviä – nimikin tarkoittaa turkiksi suolakaivosta.',
    },
    'Una-Sana': {
      lyhyt: 'Una-joen Štrbački buk syöksyy 25 metrin korkeudelta Kroatian rajalla, ja se on Unan kansallispuiston korkein vesiputous.',
    },
    Vlasenica: {
      lyhyt: 'Vlasenican seutu on metsäistä ylänköä, joka laskeutuu idässä Drinan laaksoon – joki on raja Serbian kanssa.',
    },
    'West Bosnia': {
      lyhyt: 'Livnon juustoa tehdään yhä gruyèren tapaan, samalla menetelmällä, jonka sveitsiläiset juustomestarit opettivat seudulle 1886.',
    },
    'West Herzegovina': {
      lyhyt: 'Trebižat-joen Kravican vesiputous valuu leveänä kaarena altaaseen, jossa kesäisin uidaan.',
    },
    'Zenica-Doboj': {
      lyhyt: 'Zenicassa on tehty terästä vuodesta 1892, ja terästehtaan piiput näkyvät yhä Bosna-joen laakson yli.',
    },
  },
  /*
   * MKD (Sisältökirjuri 25.9.2026, erä 2C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.MKD:n englanninkielisiä tilastoaluetunnuksia
   * TÄSMÄLLEEN ("Eastern", "Southwestern" ym.). Kokinon observatorio
   * hylättiin, koska sen tähtitieteellinen tulkinta on kiistanalainen.
   * Lähteet (en-Wikipedia ja matkailusivut, tarkistettu 25.9.2026):
   *   Eastern      — Kočani Valley (maan suurin riisinviljelyalue)
   *   Southeastern — Strumica Carnival (Evliya Çelebi 1670)
   *   Northeastern — Kratovo (sammuneen tulivuoren kraatteri, kuusi tornia,
   *                  kivisillat)
   *   Southwestern — Lake Ohrid (yli miljoona vuotta, ohridintaimen
   *                  Salmo letnica endeeminen)
   *   Pelagonia    — Heraclea Lyncestis (Filippos II, 2 km Bitolasta,
   *                  basilikoiden mosaiikit)
   *   Polog        — St Nicholas Church, Mavrovo (1850–1857, tekojärvi 1953,
   *                  nousee esiin kuivuudessa)
   *   Skopje       — Matka Canyon (nimi = kohtu, Vrelon luola, Saraj)
   *   Vardar       — Stobi (Vardarin ja Crnan yhtymäkohta, Gradsko)
   */
  MKD: {
    Eastern: {
      lyhyt: 'Bregalnica-joen varren Kočanin laakso on Pohjois-Makedonian suurin riisinviljelyalue, ja sadonkorjuuta juhlitaan joka syksy.',
    },
    Southeastern: {
      lyhyt: 'Strumican karnevaalista kirjoitti jo turkkilainen matkailija Evliya Çelebi 1670, ja naamiaiskulkue täyttää kadut yhä joka kevättalvi.',
    },
    Northeastern: {
      lyhyt: 'Kratovo on rakennettu sammuneen tulivuoren kraatteriin, ja kaupungissa on yhä kuusi vanhaa kivitornia ja kaarevia kivisiltoja.',
    },
    Southwestern: {
      lyhyt: 'Ohridinjärvi on yli miljoona vuotta vanha, ja sen vedessä elää ohridintaimen, jota ei tavata luonnonvaraisena missään muualla.',
    },
    Pelagonia: {
      lyhyt: 'Bitolan laidalla on Heraclea Lyncestis, Makedonian Filippos II:n perustama kaupunki, jonka basilikoiden lattiamosaiikit ovat säilyneet.',
    },
    Polog: {
      lyhyt: 'Mavrovonjärvestä nousee kuivina kesinä esiin Pyhän Nikolaoksen kirkko, joka jäi veden alle, kun tekojärvi padottiin 1950-luvulla.',
    },
    Skopje: {
      lyhyt: 'Skopjen laidalla on Matkan kanjoni – nimi tarkoittaa kohtua – ja sen tekojärveltä pääsee veneellä Vrelon luolaan.',
    },
    Vardar: {
      lyhyt: 'Gradskon lähellä on Stobi, antiikin kaupunki Vardarin ja Crna-joen yhtymäkohdassa, jonka teatterin ja basilikoiden rauniot näkyvät yhä.',
    },
  },
  /*
   * ALB (Sisältökirjuri 25.9.2026, erä 2C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.ALB:n prefektuuritunnuksia TÄSMÄLLEEN (diakriitein,
   * esim. "Dibër", "Tiranë"). Lähteet (en-Wikipedia ja matkailusivut,
   * tarkistettu 25.9.2026):
   *   Berat       — Berat ("tuhannen ikkunan kaupunki")
   *   Dibër       — Korab (2 764 m, Albanian ja Pohjois-Makedonian korkein)
   *   Durrës      — Amphitheatre of Durrës (löydetty 1966, Balkanin
   *                 niemimaan suurin roomalainen amfiteatteri)
   *   Elbasan     — Dita e Verës (14.3., ballokume)
   *   Fier        — Apollonia (Illyria) (Octavianus opiskeli siellä 44 eaa.)
   *   Gjirokastër — Gjirokastër (liuskekivikatot, Ismail Kadaren syntymäkaupunki)
   *   Korçë       — Korçë (ensimmäinen albaniankielinen koulu 1887,
   *                 Birra Korça)
   *   Kukës       — Kukës (vanha kaupunki Fierzan altaan alle 1976)
   *   Lezhë       — Skanderbeg Mausoleum (Pyhän Nikolauksen kirkko, 1468)
   *   Shkodër     — Lake Skadar (Balkanin suurin järvi), Rozafa Castle
   *                 (legenda muuriin muuratusta äidistä)
   *   Tiranë      — Bunk'Art 1 (viisikerroksinen bunkkeri, 106 huonetta)
   *   Vlorë       — Albanian Declaration of Independence (28.11.1912),
   *                 Independence Monument, Flag Square
   */
  ALB: {
    Berat: {
      lyhyt: 'Beratia kutsutaan tuhannen ikkunan kaupungiksi, sillä sen valkoiset talot nousevat rinnettä ikkunarivi ikkunarivin yllä.',
    },
    'Dibër': {
      lyhyt: 'Dibërin itärajalla kohoaa 2 764 metrin Korab, joka on sekä Albanian että Pohjois-Makedonian korkein vuori.',
    },
    'Durrës': {
      lyhyt: 'Durrësin keskustasta löydettiin 1966 talojen alta roomalainen amfiteatteri, Balkanin niemimaan suurin.',
    },
    Elbasan: {
      lyhyt: 'Elbasanissa juhlitaan 14. maaliskuuta Kesän päivää, ja silloin kaupungissa leivotaan ballokume-keksejä.',
    },
    Fier: {
      lyhyt: 'Fierin lähellä on muinainen Apollonia, kreikkalaisten perustama kaupunki, jossa nuori Octavianus – tuleva keisari Augustus – opiskeli.',
    },
    'Gjirokastër': {
      lyhyt: 'Gjirokastërin kivitalojen katot on ladottu harmaista liuskekivistä, ja kaupungissa syntyi kirjailija Ismail Kadare.',
    },
    'Korçë': {
      lyhyt: 'Korçëssa avattiin 1887 ensimmäinen albaniankielinen koulu, ja nykyään kaupungin nimi tunnetaan koko maassa Birra Korça -oluesta.',
    },
    'Kukës': {
      lyhyt: 'Kukësin vanha kaupunki jäi 1976 Fierzan tekojärven alle, ja uusi Kukës rakennettiin järven yläpuoliselle tasanteelle.',
    },
    'Lezhë': {
      lyhyt: 'Lezhën Pyhän Nikolauksen kirkon raunioissa on Skanderbegin muistomerkki, sillä kansallissankari haudattiin sinne 1468.',
    },
    'Shkodër': {
      lyhyt: 'Shkodërjärvi on Balkanin suurin järvi, ja sen rannalla kohoaa Rozafan linna, jonka muuriin tarun mukaan muurattiin nuori äiti.',
    },
    'Tiranë': {
      lyhyt: "Tiranan Bunk'Art on museo Enver Hoxhan viisikerroksisessa maanalaisessa bunkkerissa, jossa on 106 huonetta.",
    },
    'Vlorë': {
      lyhyt: 'Vlorëssa julistettiin Albanian itsenäisyys 28. marraskuuta 1912, ja Lipun aukiolla seisoo itsenäisyyden muistomerkki.',
    },
  },
  /*
   * CYP (Sisältökirjuri 25.9.2026, erä 2C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.CYP:n piiritunnuksia TÄSMÄLLEEN (viisi piiriä,
   * Kyreniaa ei datassa). Tekstit kuvaavat luontoa ja kulttuuria, eivät
   * saaren jakoa; Famagustan teksti on Kap Grecosta. Lähteet
   * (en-Wikipedia, tarkistettu 25.9.2026):
   *   Famagusta — Cape Greco (merenrantaluolat, luonnonkaaret, sukellus)
   *   Larnaca   — Larnaca Salt Lake (flamingot talvella), Hala Sultan Tekke
   *   Limassol  — Commandaria (vanhin yhä valmistettava nimetty viini,
   *               Limassolin piirin viinikylät)
   *   Nicosia   — Kykkos Monastery (Nikosian piiri, Troodos, Luukkaan
   *               maalaamaksi kerrottu ikoni)
   *   Paphos    — Petra tou Romiou (Afroditen syntymäpaikka tarussa)
   */
  CYP: {
    Famagusta: {
      lyhyt: 'Kap Grecon niemellä meri on kovertanut kalkkikiveen luolia ja kallioportteja, ja sen kirkkaassa vedessä sukelletaan.',
    },
    Larnaca: {
      lyhyt: 'Larnakan suolajärvelle saapuu talvisin tuhansia flamingoja, ja sen rannalla seisoo Hala Sultan Tekke -moskeija.',
    },
    Limassol: {
      lyhyt: 'Limassolin vuoristokylissä tehdään makeaa Commandaria-viiniä, jota pidetään maailman vanhimpana yhä valmistettavana nimettynä viininä.',
    },
    Nicosia: {
      lyhyt: 'Troodoksen rinteillä Kykkosin luostari vaalii Neitsyt Marian ikonia, jonka perimätieto sanoo evankelista Luukkaan maalaamaksi.',
    },
    Paphos: {
      lyhyt: 'Paphosin rannikolla Petra tou Romioun kallio on tarun mukaan paikka, jossa Afrodite nousi merenvaahdosta.',
    },
  },
  /*
   * MOLDOVA (MDA) — lisätty 25.9.2026 (Sisältökirjuri, erä 3A), 39 aluetta.
   * Avaimet kopioitu koneellisesti MAAKUNNAT_KAIKKI.MDA:sta: data sekoittaa
   * cedilla-merkit (ş U+015F, ţ U+0163) ja pilkkumerkit (ș U+0219), ja osa
   * avaimista on ilman diakriittejä (Causeni, Donduseni, Hîncesti) — avaimet
   * pidetään datan mukaisina, tekstit käyttävät oikeaa kirjoitusasua.
   * Natural Earthin rajaukset: "Stîngă Nistrului" = Dubăsarin piiri (name_alt
   * Dubăsari), "Transnistria" = pieni alue Dubăsarin kaupungin kohdalla,
   * "Comrat" = koko Gagauzia, "Bender" ulottuu itään Dnestrin yli. Datassa on
   * kaksi "Rezina"-aluetta (toinen on Dnestrin itäpuolinen Rîbnițan seutu);
   * teksti kuvaa Rezinan piiriä. Dnestrin itärannan ja Gagauzian tekstit ovat
   * neutraaleja (luonto, historia, kulttuuri). Vain `lyhyt`. Lähteet
   * (en/ro-Wikipedia, tarkistettu 25.9.2026):
   *   Anenii Noi       — Skirmish at Bender (Kaarle XII:n leiri Varnițassa
   *                      7/1711–1.2.1713); Varnița (Anenii Noin piiri)
   *   Bălţi            — Bălți (nimi = lätäköt; Răuțel laskee Răutiin)
   *   Basarabeasca     — Basarabeasca (Romanovka 1846, nimi 11.9.1957)
   *   Bender           — Tighina Fortress (Süleyman 1538, Sinan, 10
   *                      bastionia, valmis 1541)
   *   Briceni          — Briceni District; Emil Racoviță Cave (Criva, löydetty
   *                      1959, noin 90 km)
   *   Cahul            — Giurgiulești (Tonavaa noin 480 m, ainoa Tonavan satama)
   *   Călărași         — Hîrjauca Monastery (1740, munkit Neamțista)
   *   Camenca          — Dniester Sanatorium (ampeloterapia)
   *   Cantemir         — ro: Cantemir, Cantemir (nimi 6.4.1973, 300 v.)
   *   Causeni          — Căușeni (kirkko yli 0,91 m maan alla, Moldovan ainoa
   *                      keskiaikainen fresko)
   *   Chişinău         — Cricova (winery) (120 km teitä, Chișinăun kunnassa)
   *   Cimişlia         — ro: Râpele de la Cimișlia (fossiilit 1929 alkaen, yli
   *                      40 selkärankaislajia, 8–6 milj. v.)
   *   Comrat           — Gagauzia (turkkilainen kieli, 95,9 % ortodokseja)
   *   Criuleni         — ro: Peștera Surprizelor (1 700 m, toiseksi pisin)
   *   Donduseni        — Dondușeni District (Țaulin puisto, Moldovan suurin,
   *                      5 km Dondușenista)
   *   Drochia          — Drochia (Moldovan suurin sokeritehdas); Drochia
   *                      District (mustamulta noin 80 %)
   *   Edineţ           — Edineț District (toltry 15–20 milj. v., Brînzenin
   *                      riutat ja luolat)
   *   Făleşti          — Gheorghe Vrabie (Făleștin piiristä; vaakuna, leu)
   *   Floreşti         — Japca Monastery (ainoa Bessarabian luostari, jota
   *                      neuvostovalta ei sulkenut)
   *   Glodeni          — Glodeni District (Pădurea Domnească, visentit
   *                      Puolasta 2006, yli 3 500 kumpua)
   *   Grigoriopol      — Grigoriopol (armenialaisten siirtokunta 1792)
   *   Hîncesti         — Manuc Bei (vetäytyi Hînceștiin, poika rakensi palatsin)
   *   Ialoveni         — Mileștii Mici (winery) (Guinness 8/2005, lähes
   *                      2 milj. pulloa)
   *   Leova            — ro: Raionul Leova (Valul lui Traian); Prut rajajokena
   *   Nisporeni        — Bălănești Hill (430 m, Moldovan korkein kohta)
   *   Ocniţa           — Naslavcea (Moldovan pohjoisin kohta)
   *   Orhei            — Orheiul Vechi (luostari, jossa kourallinen munkkeja)
   *   Rezina           — Saharna Monastery (pyhiinvaelluskeskus, jalanjälki-
   *                      taru)
   *   Rîşcani          — Rîșcani District (Costești–Stânca 1978, noin
   *                      1,28 mrd m³)
   *   Sîngerei         — Sîngerei District; Răut (pisin kokonaan Moldovassa)
   *   Şoldăneşti       — Șoldănești District (metsää 19,3 %, susia)
   *   Soroca           — Soroca Fort (ympyrä, viisi bastionia, kivi 1543–46)
   *   Ștefan Vodă      — Purcari (winery) (1827 keisarin asetus)
   *   Stîngă Nistrului — Dubăsari (pato ja voimala 1951–1954, tekojärvi)
   *   Străşeni         — Codru Reserve (1971, 5 177 ha)
   *   Taraclia         — Taraclia (bulgarialaisia 76,3 %, yliopisto 2004)
   *   Teleneşti        — Telenești (Nachum Gutman 1898–1980); Nahum Gutman
   *                      Museum, Tel Aviv
   *   Transnistria     — Dubăsari (nimi sanasta dubăsar = veneentekijä)
   *   Ungheni          — Eiffel Bridge, Ungheni (avattu 21.4.1877)
   */
  MDA: {
    'Anenii Noi': {
      lyhyt: 'Varnițan kylässä Benderin pohjoispuolella leireili Ruotsin kuningas Kaarle XII vuosina 1711–1713, kunnes osmanien joukot hyökkäsivät leiriin.',
    },
    'Bălţi': {
      lyhyt: 'Bălți tarkoittaa romaniaksi lätäköitä – kaupunki sai nimensä kosteikoista mäen juurella, jossa Răuțel-puro laskee Răut-jokeen.',
    },
    Basarabeasca: {
      lyhyt: 'Basarabeasca sai alkunsa 1846 juutalaisesta maanviljelyssiirtokunnasta nimeltä Romanovka, ja nykyisen nimensä kaupunki sai vasta 1957.',
    },
    Bender: {
      lyhyt: 'Benderin linnoituksen Dnestrin rannalla rakennutti uudelleen sulttaani Süleyman Suuri 1500-luvulla, ja sen muureissa on kymmenen bastionia.',
    },
    Briceni: {
      lyhyt: 'Crivan kylän kipsilouhoksesta avautui 1959 Emil Racovițăn luola, jonka maanalaisia käytäviä on kartoitettu noin 90 kilometriä.',
    },
    Cahul: {
      lyhyt: 'Giurgiuleștissa Moldova ulottuu Tonavalle vain noin 480 metrin matkalta, ja siihen on mahtunut maan ainoa Tonavan satama.',
    },
    'Călărași': {
      lyhyt: 'Hîrjaucan luostari Codrun metsissä perustettiin 1740, kun sinne asettui kaksi munkkia Romanian puolella sijaitsevasta Neamțin luostarista.',
    },
    Camenca: {
      lyhyt: 'Camencan Dnestr-parantolassa joen rannalla hoidetaan vieraita ampeloterapialla eli rypälemehulla ja viinillä.',
    },
    Cantemir: {
      lyhyt: 'Cantemirin kaupunki sai nimensä 1973 ruhtinas Dimitrie Cantemirin 300-vuotispäivänä – hän oli Moldovan hallitsija ja oppinut kirjailija.',
    },
    Causeni: {
      lyhyt: 'Căușenin 1600-luvun Neitsyt Marian kirkon lattia on yli 90 senttiä maanpinnan alapuolella, ja seinillä on Moldovan ainoa keskiaikainen fresko.',
    },
    'Chişinău': {
      lyhyt: 'Chișinăun pohjoislaidalla Cricovan viinikellareissa kulkee noin 120 kilometriä maanalaisia teitä entisissä kalkkikivilouhoksissa.',
    },
    'Cimişlia': {
      lyhyt: 'Cimișlian rotkoista on kaivettu 1929 lähtien yli 40 selkärankaislajin fossiileja 6–8 miljoonan vuoden takaa, muun muassa mastodontteja.',
    },
    Comrat: {
      lyhyt: 'Comrat on Gagauzian pääkaupunki, ja gagauusit puhuvat turkkilaista kieltä mutta ovat valtaosin ortodoksikristittyjä.',
    },
    Criuleni: {
      lyhyt: 'Criulenin lähellä Dnestrin rantametsässä on Yllätysten luola, 1 700 metriä pitkä kalkkikiviluola ja Moldovan toiseksi pisin.',
    },
    Donduseni: {
      lyhyt: 'Țaulin kylässä vain viiden kilometrin päässä Dondușenista on puisto, jota pidetään Moldovan suurimpana.',
    },
    Drochia: {
      lyhyt: 'Drochiassa toimii Moldovan suurin sokeritehdas, ja piirin maaperästä noin 80 prosenttia on hedelmällistä mustaamultaa.',
    },
    'Edineţ': {
      lyhyt: 'Edinețin toltry-kukkulat ovat 15–20 miljoonaa vuotta vanhoja muinaisen meren riuttoja, ja Brînzenin kallioihin on syöpynyt luolia.',
    },
    'Făleşti': {
      lyhyt: 'Făleștin piiristä lähtöisin oleva taiteilija Gheorghe Vrabie piirsi Moldovan vaakunan, ja häntä kutsutaan Moldovan leun isäksi.',
    },
    'Floreşti': {
      lyhyt: 'Dnestrin rannalla seisova Japcan luostari oli Bessarabian ainoa luostari, jota neuvostovalta ei koskaan sulkenut.',
    },
    Glodeni: {
      lyhyt: 'Pădurea Domneascăn suojelualueelle tuotiin 2006 Puolasta visenttejä, ja sen metsissä on yli 3 500 arvoituksellista muinaista kumpua.',
    },
    Grigoriopol: {
      lyhyt: 'Grigoriopol perustettiin 1792 armenialaisten siirtokunnaksi Dnestrin vasemmalle rannalle.',
    },
    'Hîncesti': {
      lyhyt: 'Hînceștin tiluksille vetäytyi elämänsä lopulla armenialainen kauppias ja diplomaatti Manuc Bei, ja hänen poikansa rakennutti sinne palatsin.',
    },
    Ialoveni: {
      lyhyt: 'Mileștii Micin viinikellareissa on lähes kaksi miljoonaa pulloa – Guinness kirjasi sen 2005 maailman suurimmaksi viinikokoelmaksi.',
    },
    Leova: {
      lyhyt: 'Leovan seudun halki kulkee Traianuksen valliksi kutsuttu muinainen maavalli, ja piirin länsilaitaa seuraa Romanian rajajoki Prut.',
    },
    Nisporeni: {
      lyhyt: 'Nisporenin piirissä kohoava Bălăneștin kukkula on noin 430 metrin korkeudellaan Moldovan korkein kohta.',
    },
    'Ocniţa': {
      lyhyt: 'Naslavcean kylä Dnestrin rannalla on Moldovan pohjoisin kohta, ja sen kalkkikivirinteiltä avautuu näkymä joen mutkiin.',
    },
    Orhei: {
      lyhyt: 'Răut-joen mutkassa Orheiul Vechin kalkkikivikallioon on kaiverrettu luolaluostari, jossa asuu yhä kourallinen munkkeja.',
    },
    Rezina: {
      lyhyt: 'Saharnan luostari on Moldovan suurimpia pyhiinvaelluspaikkoja, ja tarun mukaan sen yllä kohoavalla kalliolla on Neitsyt Marian jalanjälki.',
    },
    'Rîşcani': {
      lyhyt: 'Prutille Costeștiin valmistui 1978 yhdessä Romanian kanssa rakennettu pato ja vesivoimala, jonka tekojärvessä on noin 1,3 miljardia kuutiota vettä.',
    },
    'Sîngerei': {
      lyhyt: 'Sîngerein piirin halki virtaa Răut, pisin kokonaan Moldovan rajojen sisällä virtaava joki, matkallaan kohti Dnestriä.',
    },
    'Şoldăneşti': {
      lyhyt: 'Șoldăneștin piiristä lähes viidennes on tammi-, saarni- ja lehmusmetsää, jonka kätköissä elää susia ja villisikoja.',
    },
    Soroca: {
      lyhyt: 'Sorocan linnoitus Dnestrin rannalla on täydellinen ympyrä, jossa on viisi tasavälein sijoitettua bastionia; kivisenä se valmistui 1540-luvulla.',
    },
    'Ștefan Vodă': {
      lyhyt: 'Purcarin viinitila sai 1827 keisarin asetuksella Bessarabian ensimmäisen erikoistuneen viinitilan aseman, ja siellä tehdään tummaa Negru de Purcaria.',
    },
    'Stîngă Nistrului': {
      lyhyt: 'Dnestrin itärannalla Dubăsarin pato ja vesivoimala valmistuivat 1954, ja padon taakse syntyi Dubăsarin tekojärvi.',
    },
    'Străşeni': {
      lyhyt: 'Lozovan lähellä Codrun luonnonsuojelualueella on suojeltu vuodesta 1971 yli 5 000 hehtaaria tiheää tammi- ja pyökkimetsää.',
    },
    Taraclia: {
      lyhyt: 'Taraclian asukkaista yli kolme neljäsosaa on bulgarialaisia, ja kaupungin yliopistossa opetetaan bulgariaksi ja romaniaksi.',
    },
    'Teleneşti': {
      lyhyt: 'Teleneștissä syntyi 1898 Nachum Gutman, josta tuli tunnettu israelilainen taidemaalari – hänen taidemuseonsa on Tel Avivissa.',
    },
    Transnistria: {
      lyhyt: 'Dnestrin itärannalla olevan Dubăsarin nimi tulee vanhasta sanasta dubăsar, joka tarkoitti veneentekijää tai lauttamiestä.',
    },
    Ungheni: {
      lyhyt: 'Unghenin rautatiesilta Prutin yli tunnetaan Eiffelin siltana; se avattiin 1877, ja sitä pitkin kulkevat yhä junat Romaniaan.',
    },
  },
  /*
   * UKRAINA (UKR) — lisätty 25.9.2026 (Sisältökirjuri, erä 3A), 25 aluetta
   * (Natural Earthin 24 aluetta + Kiovan kaupunki; Krim ei ole datassa).
   * Tekstit kuvaavat luontoa, kaupunkeja, kulttuuria ja historiaa neutraalisti
   * eivätkä käsittele sotaa. Vain `lyhyt`. Lähteet (en-Wikipedia, tarkistettu
   * 25.9.2026):
   *   Cherkasy         — Taras Hill (Kaniv, Ševtšenko haudattu 1861)
   *   Chernihiv        — Transfiguration Cathedral, Chernihiv (Mstislav k.
   *                      1035/36, pre-Mongol Rus)
   *   Chernivtsi       — Residence of Bukovinian and Dalmatian Metropolitans
   *                      (yliopisto, Unesco 2011)
   *   Dnipropetrovs'k  — Petrykivka painting (Unesco 2013)
   *   Donets'k         — Sviatohirsk Lavra (Siverskyi Donets, maininta 1627)
   *   Ivano-Frankivs'k — Pysanka Museum (Kolomyia, 14 m, yli 10 000 pysankaa)
   *   Kharkiv          — Derzhprom (1928, ensimmäinen pilvenpiirtäjä NL:ssa)
   *   Kherson          — Askania-Nova (Falz-Fein 1898, przewalskinhevoset)
   *   Khmel'nyts'kyy   — Kamianets-Podilskyi Castle (Smotrytš, 88 m silta)
   *   Kiev             — Arboretum Oleksandriya (1793, Branicki, Ukrainan
   *                      suurin dendrologinen puisto)
   *   Kiev City        — Arsenalna (Kyiv Metro) (105,5 m)
   *   Kirovohrad       — Dobrovelychkivka (oletettu maantieteellinen keskipiste)
   *   L'viv            — Market Square (Lviv) (44 taloa, kaivot 1793)
   *   Luhans'k         — Striltsivskyi Steppe Nature Reserve (arosurmeli)
   *   Mykolayiv        — Pontic Olbia (Parutyne, Miletos, 600-luku eaa.)
   *   Odessa           — Odesa Catacombs (jopa 2 500 km, louhoksia)
   *   Poltava          — Opishnia (keramiikka 1800-luvulta)
   *   Rivne            — Tunnel of Love (railway) (Klevan, 3–5 km)
   *   Sumy             — Hlukhiv (hetmanaatin pääkaupunki 1708–1764,
   *                      laulukoulu 1730)
   *   Ternopil'        — Optymistychna Cave (noin 264 km, pisin kipsiluola)
   *   Transcarpathia   — Valley of Narcissi (Kireshi, Khust, 256 ha)
   *   Vinnytsya        — Mykola Leontovych (Tultšyn 1908–1919, Štšedryk 1914)
   *   Volyn            — Lubart's Castle (200 hryvnan seteli)
   *   Zaporizhzhya     — Khortytsia (12,5 km, Dneprin suurin saari)
   *   Zhytomyr         — Sergei Korolev (s. 1907 Žytomyr, museo vastapäätä)
   */
  UKR: {
    Cherkasy: {
      lyhyt: 'Kanivin lähellä Tarasinmäellä Dneprin rannalla lepää runoilija Taras Ševtšenko, jonka maalliset jäännökset siirrettiin sinne Pietarista 1861.',
    },
    Chernihiv: {
      lyhyt: 'Tšernihivin Kirkastumisen katedraalia alettiin rakentaa 1030-luvulla, ja se on harvoja mongolivalloitusta edeltäneen Kiovan Rusin rakennuksia.',
    },
    Chernivtsi: {
      lyhyt: 'Tšernivtsin yliopisto toimii entisessä Bukovinan ja Dalmatian metropoliittojen residenssissä, joka on Unescon maailmanperintöä vuodesta 2011.',
    },
    "Dnipropetrovs'k": {
      lyhyt: 'Petrykivkan kylästä on lähtöisin valkoiselle pohjalle maalattu kukkakoristelu, joka on ollut Unescon aineetonta kulttuuriperintöä vuodesta 2013.',
    },
    "Donets'k": {
      lyhyt: 'Svjatohirskin luostari kohoaa Siverskyi Donetsin jyrkälle oikealle rannalle liitukallioiden keskelle, ja siitä on kirjallinen maininta vuodelta 1627.',
    },
    "Ivano-Frankivs'k": {
      lyhyt: 'Kolomyjassa on pääsiäismunan muotoinen 14-metrinen museo, jonka kokoelmissa on yli 10 000 koristeltua pysankaa.',
    },
    Kharkiv: {
      lyhyt: 'Harkovan Vapaudenaukion laidalla seisova konstruktivistinen Deržprom valmistui 1928 Neuvostoliiton ensimmäiseksi pilvenpiirtäjäksi.',
    },
    Kherson: {
      lyhyt: 'Askania-Novan suojelualueen perusti 1898 Friedrich Falz-Fein, ja se tunnetaan przewalskinhevosistaan ja koskemattomasta arostaan.',
    },
    "Khmel'nyts'kyy": {
      lyhyt: 'Kamjanets-Podilskyin linna seisoo niemellä, jonka ympärille Smotrytš-joki on kaivertanut kanjonin; linnaan johtaa 88-metrinen silta.',
    },
    Kiev: {
      lyhyt: 'Bila Tserkvan Oleksandrija on Ukrainan suurin dendrologinen puisto, jonka kreivi Branicki perusti Ros-joen rannalle 1793.',
    },
    'Kiev City': {
      lyhyt: 'Kiovan metron Arsenalna-asema on 105,5 metrin syvyydessä, ja se on yksi maailman syvimmistä metroasemista.',
    },
    Kirovohrad: {
      lyhyt: 'Kirovohradin alueen pikkukaupunkia Dobrovelytškivkaa pidetään Ukrainan maantieteellisenä keskipisteenä.',
    },
    "L'viv": {
      lyhyt: 'Lvivin Rynok-toria ympäröi 44 vanhaa kaupunkitaloa, ja torin jokaisessa kulmassa on 1790-luvun kaivolähde antiikin tarujen hahmon patsaineen.',
    },
    "Luhans'k": {
      lyhyt: 'Alueen pohjoisosan Striltsivskyin aro otettiin suojeluun arosurmelin vuoksi, ja tuo murmeli on yhä suojelualueen tunnuseläin.',
    },
    Mykolayiv: {
      lyhyt: 'Parutynen kylän lähellä Etelä-Bugin suistossa ovat Olbian rauniot – kaupungin perustivat Miletoksen kreikkalaiset 600-luvulla eaa.',
    },
    Odessa: {
      lyhyt: 'Odessan alla kiemurtelee jopa 2 500 kilometriä katakombeja, enimmäkseen louhoksia, joista kaupungin rakennuskivi aikanaan nostettiin.',
    },
    Poltava: {
      lyhyt: 'Opišnjan kylä on tunnettu keramiikastaan: siellä on valmistettu koristeellisia saviastioita perinteisin menetelmin 1800-luvulta asti.',
    },
    Rivne: {
      lyhyt: 'Klevanin lähellä kulkee Rakkauden tunneli, muutaman kilometrin teollisuusrata, jonka yllä puut kaartuvat vihreäksi holviksi.',
    },
    Sumy: {
      lyhyt: 'Hluhiv oli kasakkahetmanaatin pääkaupunki 1708–1764, ja sinne perustettiin 1730 Venäjän keisarikunnan ensimmäinen laulukoulu.',
    },
    "Ternopil'": {
      lyhyt: 'Korolivkan kylän alla on Optymistytšna, maailman pisin kipsiluola – sen käytäviä on kartoitettu noin 264 kilometriä.',
    },
    Transcarpathia: {
      lyhyt: 'Hustin lähellä on Narsissien laakso, 256 hehtaarin niitty, jolla villit narsissit kukkivat keväisin valkoisena mattona.',
    },
    Vinnytsya: {
      lyhyt: 'Tultšynissa opettanut Mykola Leontovytš sävelsi 1914 Štšedrykin, jonka melodia kiertää maailmaa joululauluna Carol of the Bells.',
    },
    Volyn: {
      lyhyt: 'Lutskin Lubartin linna rakennettiin 1300-luvulla, ja sen porttitorni on painettu 200 hryvnan setelin taakse.',
    },
    Zaporizhzhya: {
      lyhyt: 'Hortytsja on Dneprin suurin saari, 12,5 kilometriä pitkä, ja se on Zaporožjen kasakoiden historian keskeisiä paikkoja.',
    },
    Zhytomyr: {
      lyhyt: 'Žytomyrissa syntyi 1907 rakettisuunnittelija Sergei Koroljov, ja hänen syntymäkotinsa vastapäätä on astronautiikan museo.',
    },
  },
  /*
   * VALKO-VENÄJÄ (BLR) — lisätty 25.9.2026 (Sisältökirjuri, erä 3A),
   * 7 aluetta. Tekstit kuvaavat luontoa ja kulttuuriperintöä neutraalisti.
   * Vain `lyhyt`. Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Brest         — Białowieża Forest (Brestin ja Hrodnan alueet, yli 800
   *                   visenttiä)
   *   Gomel         — Gomel (Rumjantsev–Paskevitš-palatsi, englantilainen
   *                   puisto Sožin rannalla)
   *   Grodno        — Mir Castle Complex (1500-luvun alku, Unesco 2000)
   *   Mogilev       — Mogilev (Pyhän Nikolauksen katedraali 1668,
   *                   alkuperäinen ikonostaasi)
   *   Minsk         — Nesvizh Castle (Radziwiłł, Unesco 2005)
   *   City of Minsk — National Library of Belarus (73,6 m, avattu 16.6.2006)
   *   Vitebsk       — Vitebsk (Chagallin talo Pokrovskaja-kadulla); Marc
   *                   Chagall House Museum
   */
  BLR: {
    Brest: {
      lyhyt: 'Belovežin aarniometsässä, jonka Valko-Venäjä jakaa Puolan kanssa, elää yli 800 visenttiä – Euroopan painavinta maaeläintä.',
    },
    Gomel: {
      lyhyt: 'Homelin palatsin ympärille Sož-joen rannalle perusti ruhtinas Ivan Paskevitš 1800-luvulla englantilaisen puiston, joka on yhä paikallaan.',
    },
    Grodno: {
      lyhyt: 'Mirin linnaa alettiin rakentaa 1500-luvun alussa goottilaiseksi linnoitukseksi, ja se on Unescon maailmanperintöä vuodesta 2000.',
    },
    Mogilev: {
      lyhyt: 'Mahiljoun Pyhän Nikolauksen luostarin katedraali valmistui 1668, ja sen alkuperäinen ikonostaasi on säilynyt.',
    },
    Minsk: {
      lyhyt: 'Njasvižin linna oli vuosisatoja Radziwiłłien suvun kotilinna, ja se on Unescon maailmanperintöä vuodesta 2005.',
    },
    'City of Minsk': {
      lyhyt: 'Minskin kansalliskirjasto on 73,6 metriä korkea rombikuboktaedri, kuin timantiksi hiottu talo, ja se avattiin 2006.',
    },
    Vitebsk: {
      lyhyt: 'Vitsebskin Pokrovskaja-kadulla on talo, jossa Marc Chagall vietti lapsuutensa – nykyään siinä toimii hänen kotimuseonsa.',
    },
  },
  /*
   * ISLANTI (ISL) — lisätty 25.9.2026 (Sisältökirjuri, erä 3A), 9 aluetta.
   * Natural Earthissa Reykjavík ja Höfuðborgarsvæði ovat erillisiä alueita;
   * jälkimmäinen kuvataan Álftanesin Bessastaðirin kautta. Vain `lyhyt`.
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Austurland        — Hallormsstaðaskógur (suojeltu 1905, ensimmäinen
   *                       kansallismetsä)
   *   Höfuðborgarsvæði  — Bessastaðir (presidentin asunto 1941, Snorri)
   *   Vestfirðir        — Látrabjarg (14 km, 440 m, läntisin kohta)
   *   Norðurland eystra — Húsavík (valaiden katselu, Apollo-astronautit)
   *   Norðurland vestra — Hvítserkur (15 m, peikkotaru)
   *   Reykjavík         — Geothermal power in Iceland (Nesjavellirin putki)
   *   Suðurland         — Þingvellir (Alþingi 930, Unesco 2004)
   *   Suðurnes          — Bridge Between Continents (15 m, Visit Reykjanes)
   *   Vesturland        — Snæfellsjökull (1 446 m, Jules Verne)
   */
  ISL: {
    Austurland: {
      lyhyt: 'Hallormsstaðurin koivikko suojeltiin 1905, ja siitä tuli Islannin ensimmäinen kansallismetsä – nyt se on maan suurimpia metsiä.',
    },
    'Höfuðborgarsvæði': {
      lyhyt: 'Bessastaðir Álftanesin niemellä on ollut Islannin presidentin virka-asunto vuodesta 1941; 1200-luvulla sen omisti Snorri Sturluson.',
    },
    'Vestfirðir': {
      lyhyt: 'Látrabjarg on Islannin läntisin kohta: 14 kilometriä pitkä ja paikoin 440 metriä korkea lintuvuori, jonka jyrkänteillä pesii lunneja.',
    },
    'Norðurland eystra': {
      lyhyt: 'Húsavíkin lahdelle tulee usein valaita, ja kaupungin ympäristössä harjoittelivat 1960-luvulla Apollo-lentojen astronautit.',
    },
    'Norðurland vestra': {
      lyhyt: 'Vatnsnesin rannalla seisova Hvítserkur on 15-metrinen kivipaasi; tarun mukaan se on peikko, jonka nouseva aurinko muutti kiveksi.',
    },
    'Reykjavík': {
      lyhyt: 'Reykjavíkin taloja lämmitetään kuumalla maalämpövedellä, jota johdetaan putkia pitkin muun muassa Nesjavellirin voimalasta.',
    },
    'Suðurland': {
      lyhyt: 'Þingvellirin laaksossa kokoontui Islannin Alþingi ensimmäisen kerran 930, ja paikka on Unescon maailmanperintöä vuodesta 2004.',
    },
    'Suðurnes': {
      lyhyt: 'Reykjanesin niemimaalla 15-metrinen kävelysilta ylittää railon, joka erottaa Pohjois-Amerikan ja Euraasian mannerlaatat.',
    },
    Vesturland: {
      lyhyt: 'Snæfellsjökull on 1 446-metrinen jäätikön peittämä tulivuori – Jules Vernen romaanissa matka maan keskipisteeseen alkaa sen kraaterista.',
    },
  },
  /*
   * TUR (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 3B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.TUR:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti — myös lähdedatan kirjoitusvirheet
   * "Kinkkale" (= Kırıkkale) ja "Zinguldak" (= Zonguldak) sekä
   * diakriittiset sekamuodot ("Bartın", "Iğdir", "Çankiri", "K. Maras").
   * Vain `lyhyt` tässä erässä. Istanbulin teksti välttää fokusvirran ja
   * fokuskohteiden aiheet (Kapalıçarşı, Dolmabahçe, hippodromi, muurit,
   * kissat, Yerebatan), ja fokuskohteiden Troija, Efesos, Pamukkale,
   * Kappadokia, Göbekli Tepe, Ararat, Vanjärvi ja Vanin kissa jätettiin
   * maakuntateksteistä pois. Lähteet (en-Wikipedia, tarkistettu
   * 25.9.2026):
   *   Adana          — Taşköprü (Adana) (moottoriliikenne 2007 asti)
   *   Adiyaman       — Mount Nemrut (Antiokhos I, päät irrallaan)
   *   Afyonkarahisar — Afyonkarahisar (maailman suurin lääkeoopiumin
   *                    tuottaja; linna mustalla kalliolla)
   *   Agri           — Ishak Pasha Palace (aloitettu 1685, haaremi 1784)
   *   Aksaray        — Ihlara Valley (15 km, n. 50 kirkkoa)
   *   Amasya         — Amasya (Pontoksen kuninkaiden kalliohaudat)
   *   Ankara         — Anıtkabir (valmis 1953, Rauhanpuisto)
   *   Antalya        — Düden Waterfalls (Ala-Düden 40 m mereen)
   *   Ardahan        — Lake Çıldır (jäätyy talvella; "lake of shadows")
   *   Artvin         — Deriner Dam (249 m, Turkin korkein)
   *   Aydin          — Aydın Province (Turkin suurin viikunantuottaja)
   *   Balikesir      — Kuşcenneti National Park (1959, 2–3 milj. lintua)
   *   Bartın         — Bartın (Turkin ainoa laivakulkukelpoinen joki)
   *   Batman         — Batman, Turkey (Batı Raman, suurin öljykenttä)
   *   Bayburt        — Bayburt Province (asukasluvultaan pienin, 84 241)
   *   Bilecik        — Söğüt (Osmanien pääkaupunki 1281–1335)
   *   Bingöl         — Bingöl ("thousand lakes", ei isoja järviä)
   *   Bitlis         — Nemrut (volcano) (kaldera, 3 kraatterijärveä,
   *                    laavavirta padotti Vanjärven)
   *   Bolu           — Yedigöller National Park (7 maanvyöryjärveä)
   *   Burdur         — Lake Salda (NASA 2021: lähin vastine Jezerolle)
   *   Bursa          — Bursa Uludağ Gondola (8,8 km, maailman pisin)
   *   Çanakkale      — 1915 Çanakkale Bridge (2022, jänne 2 023 m)
   *   Çankiri        — Çankırı (suolaluola, louhittu antiikista asti)
   *   Çorum          — Hattusa (Boğazkale, Unesco 1986)
   *   Denizli        — Denizli (chicken) (kiekaisu 20–25 s, lasiveistos 2013)
   *   Diyarbakir     — Diyarbakır Fortress (basaltti, Unesco 2015 + Hevsel)
   *   Düzce          — Düzce (81. maakunta 1999)
   *   Edirne         — Selimiye Mosque, Edirne (Sinanin mestariteos, 2011)
   *   Elazig         — Lake Hazar (Tigrisin lähde, uponnut kaupunki)
   *   Erzincan       — Karanlık Canyon (25 km, 1 000 m, 10–15 m)
   *   Erzurum        — Cağ kebabı (maantieteellinen merkintä 2010)
   *   Eskisehir      — Sepiolite (merenvaha, Eskişehirin tasanko)
   *   Gaziantep      — Zeugma Mosaic Museum (padon alle jäänyt Zeugma)
   *   Giresun        — Giresun (Kerasous < kerasós "kirsikka", Plinius)
   *   Gümüshane      — Karaca Cave (Torul, tippukivet)
   *   Hakkari        — Hakkari Cilo-Sat Mountains National Park
   *                    (Uludoruk 4 135 m, toiseksi korkein; puisto 2020)
   *   Hatay          — Titus Tunnel (Vespasianus/Titus, tulvasuoja)
   *   Iğdir          — Iğdır Province (lämpimin, puuvilla) + Iğdır
   *                    (puuvilla ja aprikoosit)
   *   Isparta        — Isparta ("City of Roses", bulgarialaispakolaiset)
   *   Istanbul       — Marmaray (Bosporin upotettu tunneli, 2013)
   *   Izmir          — İzmir Clock Tower (1901, Raymond Charles Péré)
   *   K. Maras       — Dondurma (maraş dondurma, salep ja mastiksi)
   *   Karabük        — Safranbolu (sahrami, Unesco 1994)
   *   Karaman        — Karamanoğlu Mehmet Bey (turkin kieli 1277)
   *   Kars           — Ani ("City of 1,001 Churches", Unesco 2016)
   *   Kastamonu      — Taşköprü, Kastamonu (valkosipuli, PDO)
   *   Kayseri        — Erciyes Ski Resort (3 917 m) + Mount Erciyes
   *   Kilis          — Kilis (Ulu-moskeija 1388, Kilis tava)
   *   Kinkkale       — Kırıkkale (Tüpraşin jalostamo 1986)
   *   Kirklareli     — İğneada Floodplain Forests National Park (longoz)
   *   Kirsehir       — Neşet Ertaş (s. 1938 Kırtıllar, Kırşehir)
   *   Kocaeli        — Osman Gazi Bridge (Gebze–Yalova, 2016)
   *   Konya          — Çatalhöyük (Unesco 2012)
   *   Kütahya        — Kütahya (kaakeli- ja keramiikkakeskus)
   *   Malatya        — Malatya ("Kayısı Diyarı")
   *   Manisa         — Manisa + Mesir macunu (maaliskuun juhla, 41 ainesta)
   *   Mardin         — Mor Hananyo Monastery (patriarkaatti 1166–1932)
   *   Mersin         — Kızkalesi (linna pienellä saarella)
   *   Mugla          — İztuzu Beach (Caretta caretta, "Turtle Beach")
   *   Mus            — Muş Province + Muş (tulppaanit, aamusumu)
   *   Nevsehir       — Derinkuyu underground city (85 m, 20 000 ihm.)
   *   Nigde          — Aladağlar National Park (4 huippua yli 3 700 m)
   *   Ordu           — Ordu Province (hasselpähkinä, 88 % viljelymaasta)
   *   Osmaniye       — Karatepe (kaksikielinen piirtokirjoitus)
   *   Rize           — Rize Province + Rize (sateisin, tee 1940-luvulta)
   *   Sakarya        — Lake Sapanca (16 km, päiväretket)
   *   Samsun         — Samsun (19.5.1919)
   *   Sanliurfa      — Balıklıgöl (Nimrod ja Abraham)
   *   Siirt          — Botan Valley National Park (2019)
   *   Sinop          — İnceburun (majakka 1863, pohjoisin kärki)
   *   Sivas          — Kangal Shepherd Dog
   *   Sirnak         — Mount Judi (Cizre, arkin laskeutumispaikka)
   *   Tekirdag       — Tekirdağ (Tekirdağ köftesi)
   *   Tokat          — Zile (Zelan taistelu 47 eaa.)
   *   Trabzon        — Uzungöl (Çaykara)
   *   Tunceli        — Munzur Valley National Park (1971, suurin)
   *   Usak           — Karun Treasure (363 esinettä, palautus 1993)
   *   Van            — Cathedral of the Holy Cross, Aghtamar (915–921)
   *   Yalova         — Yalova (Termalin kuumat lähteet)
   *   Yozgat         — Yozgat Pine Grove National Park (1958, ensimmäinen)
   *   Zinguldak      — Zonguldak + Zonguldak Province (satama 1849)
   */
  TUR: {
    Adana: {
      lyhyt: 'Adanan Taşköprü on roomalaisten Seyhan-joelle rakentama kivisilta, ja autot ajoivat sen yli vielä vuoteen 2007 asti.',
    },
    Adiyaman: {
      lyhyt: 'Nemrut Dağın huipulla Kommagenen kuninkaan Antiokhos I:n hautapyhäkön jättipatsaiden kivipäät lepäävät nyt irrallaan maassa.',
    },
    Afyonkarahisar: {
      lyhyt: 'Afyon tarkoittaa turkiksi oopiumia, ja maakunta onkin maailman suurin lääkeoopiumin tuottaja – kaupungin linna kohoaa mustalla kalliolla.',
    },
    Agri: {
      lyhyt: 'Doğubayazıtin rinteellä seisoo İshak Paşan palatsi, jonka rakentaminen alkoi 1685 ja jonka haaremisiipi valmistui vasta 1784.',
    },
    Aksaray: {
      lyhyt: 'Ihlaran laakso on 15 kilometriä pitkä kanjoni, jonka tuffiseinämiin bysanttilaiset munkit kaivoivat noin 50 kirkkoa.',
    },
    Amasya: {
      lyhyt: 'Amasyassa Pontoksen kuninkaiden hautakammiot on hakattu kallioon Yeşilırmak-joen varren vanhojen puutalojen yläpuolelle.',
    },
    Ankara: {
      lyhyt: 'Atatürkin mausoleumi Anıtkabir valmistui Ankaraan 1953, ja sen ympärille on istutettu Rauhanpuistoksi kutsuttu metsikkö.',
    },
    Antalya: {
      lyhyt: 'Antalyan laidalla Düden-joki syöksyy 40 metriä jyrkänteeltä suoraan Välimereen.',
    },
    Ardahan: {
      lyhyt: 'Çıldırjärvi jäätyy talvisin umpeen, ja georgiaksi sen nimi tarkoittaa varjojen järveä.',
    },
    Artvin: {
      lyhyt: 'Çoruh-joen Deriner-pato on 249 metriä korkea kaksoiskaarinen holvipato ja Turkin korkein pato.',
    },
    Aydin: {
      lyhyt: 'Aydın on Turkin suurin viikunantuottaja, ja kuivattuja Aydın-viikunoita viedään kaikkialle maailmaan.',
    },
    Balikesir: {
      lyhyt: 'Manyasjärven Kuşcenneti eli Lintuparatiisi on ollut kansallispuisto vuodesta 1959, ja siellä käy vuosittain 2–3 miljoonaa lintua.',
    },
    'Bartın': {
      lyhyt: 'Bartınjoki on Turkin ainoa laivoilla kulkukelpoinen joki, ja sitä pitkin pääsee kaupungista Mustallemerelle.',
    },
    Batman: {
      lyhyt: 'Batmanin laitamilla on Turkin suurin öljykenttä Batı Raman, ja öljylöydöt kasvattivat seudusta kaupungin 1940-luvulta alkaen.',
    },
    Bayburt: {
      lyhyt: 'Bayburt on asukasluvultaan Turkin pienin maakunta: koko maakunnassa asuu vain noin 84 000 ihmistä.',
    },
    Bilecik: {
      lyhyt: 'Pikkukaupunki Söğüt oli Osmanien valtakunnan syntysija ja sen ensimmäinen pääkaupunki vuosina 1281–1335.',
    },
    'Bingöl': {
      lyhyt: 'Bingöl tarkoittaa turkiksi tuhatta järveä, mutta maakunnan rajojen sisällä ei ole yhtään mainittavan kokoista järveä.',
    },
    Bitlis: {
      lyhyt: 'Tatvanin yllä uinuvan Nemrut-tulivuoren kalderassa on kolme kraatterijärveä, ja sen muinainen laavavirta padotti Vanjärven.',
    },
    Bolu: {
      lyhyt: 'Bolun Yedigöllerin kansallispuistossa on seitsemän maanvyörymien muodostamaa järveä keskellä rehevää metsää.',
    },
    Burdur: {
      lyhyt: 'NASAn mukaan Saldajärven mineraalit muistuttavat maapallolla eniten Marsin Jezero-kraatteria, jonne Perseverance-mönkijä laskeutui.',
    },
    Bursa: {
      lyhyt: 'Bursasta Uludağille nouseva 8,8 kilometrin gondolirata on maailman pisin, ja sen yläasema on vuoren hotellialueella.',
    },
    'Çanakkale': {
      lyhyt: 'Dardanellien yli kulkeva 1915 Çanakkale -silta avattiin 2022, ja sen 2 023 metrin pääjänne on maailman riippusilloista pisin.',
    },
    'Çankiri': {
      lyhyt: 'Çankırın suolaluola on yksi Turkin suurimmista vuorisuolaesiintymistä, ja suolaa on louhittu sieltä antiikin ajoista asti.',
    },
    'Çorum': {
      lyhyt: 'Boğazkalen lähellä ovat heettiläisten pääkaupungin Hattusan rauniot, jotka ovat olleet Unescon maailmanperintöä vuodesta 1986.',
    },
    Denizli: {
      lyhyt: 'Denizlin kukko voi kiekua 20–25 sekuntia yhteen menoon, ja kaupungin aukiolla seisoo jättimäinen kukko, Turkin suurin lasiveistos.',
    },
    Diyarbakir: {
      lyhyt: 'Diyarbakırin mustat basalttimuurit ja Hevselin puutarhat merkittiin yhdessä Unescon maailmanperintöluetteloon 2015.',
    },
    'Düzce': {
      lyhyt: 'Düzcestä tehtiin vuoden 1999 maanjäristysten jälkeen Turkin 81. maakunta, jotta tuhoutunut seutu saataisiin rakennettua nopeasti uudelleen.',
    },
    Edirne: {
      lyhyt: 'Mimar Sinan piti Edirnen Selimiye-moskeijaa mestariteoksenaan, ja se on ollut Unescon maailmanperintöä vuodesta 2011.',
    },
    Elazig: {
      lyhyt: 'Hazarjärvi Elazığin kaakkoispuolella on Tigrisin lähde, ja sen pohjasta on löydetty jälkiä veden alle jääneestä kaupungista.',
    },
    Erzincan: {
      lyhyt: 'Karanlık eli Pimeä kanjoni on 25 kilometriä pitkä ja kilometrin syvä, mutta pohjaltaan vain 10–15 metriä leveä.',
    },
    Erzurum: {
      lyhyt: 'Erzurumin cağ kebabı paistetaan vaakasuoraan pinotulla, pyörivällä vartaalla, ja sillä on suojattu maantieteellinen merkintä vuodesta 2010.',
    },
    Eskisehir: {
      lyhyt: 'Eskişehirin tasangolta louhitaan merenvahaa eli sepioliittia, josta veistetään kuuluisia merenvahapiippuja.',
    },
    Gaziantep: {
      lyhyt: 'Gaziantepin Zeugma-museoon on siirretty mosaiikit roomalaiskaupungista, joka jäi osittain Eufratin padon altaan alle.',
    },
    Giresun: {
      lyhyt: 'Giresunin nimi juontuu kirsikkaa tarkoittavasta kreikan sanasta, ja Pliniuksen mukaan kirsikka vietiin Eurooppaan juuri täältä.',
    },
    'Gümüshane': {
      lyhyt: 'Torulin lähellä oleva Karacan luola on täynnä tippukiviä, ja sen muodostelmat ovat monen muotoisia ja värisiä.',
    },
    Hakkari: {
      lyhyt: 'Hakkarin Cilo-vuorilla kohoaa Uludoruk, 4 135 metriä, Turkin toiseksi korkein huippu – vuoristo on ollut kansallispuisto vuodesta 2020.',
    },
    Hatay: {
      lyhyt: 'Samandağin lähellä kulkee Titus-tunneli, roomalaisten käsin kallioon louhima vesikanava, joka suojasi Antiokian satamaa tulvilta.',
    },
    'Iğdir': {
      lyhyt: 'Iğdır on Itä-Turkin lämpimin kolkka: Araratin juurella tasangolla kasvaa puuvillaa ja aprikooseja.',
    },
    Isparta: {
      lyhyt: 'Isparta tunnetaan ruusujen kaupunkina, ja sen ruusuvesitaidon toivat mukanaan Bulgariasta tulleet pakolaiset.',
    },
    Istanbul: {
      lyhyt: 'Marmaray-junat sukeltavat Bosporinsalmen alle upotettuun tunneliin, ja vuodesta 2013 raiteet ovat yhdistäneet Euroopan ja Aasian.',
    },
    Izmir: {
      lyhyt: 'İzmirin Konakin aukion kellotorni valmistui 1901, ja sen suunnitteli levantiniranskalainen arkkitehti Raymond Charles Péré.',
    },
    'K. Maras': {
      lyhyt: 'Maraşin jäätelö saa sitkeytensä orkidean mukuloista jauhetusta salepista ja mastiksista, ja se kestää sulamista tavallista paremmin.',
    },
    'Karabük': {
      lyhyt: 'Safranbolu on saanut nimensä sahramista, ja sen osmanitalot ovat olleet Unescon maailmanperintöä vuodesta 1994.',
    },
    Karaman: {
      lyhyt: 'Karamanin ruhtinas Mehmet Bey määräsi 1277, että virastoissa käytetään turkkia persian ja arabian sijaan.',
    },
    Kars: {
      lyhyt: 'Anin rauniokaupunki Armenian rajalla tunnettiin 1001 kirkon kaupunkina, ja se on ollut Unescon maailmanperintöä vuodesta 2016.',
    },
    Kastamonu: {
      lyhyt: 'Kastamonun Taşköprü on valkosipulin pitäjä: Taşköprün valkosipulilla on suojattu alkuperänimitys.',
    },
    Kayseri: {
      lyhyt: 'Kayserin yllä kohoaa 3 917-metrinen Erciyes, uinuva tulivuori, jonka pohjois- ja itärinteillä on hiihtokeskus.',
    },
    Kilis: {
      lyhyt: 'Kilisin keskustan vanhin rakennus on mamelukkiajan Ulu-moskeija vuodelta 1388, ja kaupungin tunnetuin ruoka on Kilis tava -kebab.',
    },
    Kinkkale: {
      lyhyt: 'Kırıkkale on Ankaran itäpuolinen teollisuuskaupunki, jonka laidalla on toiminut Tüpraşin öljynjalostamo vuodesta 1986.',
    },
    Kirklareli: {
      lyhyt: 'İğneadan kansallispuistossa Bulgarian rajalla kasvaa harvinaista longoz-tulvametsää, jota Strandžan vuorilta laskevat purot tulvivat.',
    },
    Kirsehir: {
      lyhyt: 'Bağlaman mestari Neşet Ertaş syntyi 1938 Kırtıllarin kylässä Kırşehirissä.',
    },
    Kocaeli: {
      lyhyt: 'Osman Gazi -silta ylittää İzmitinlahden kapeimmalta kohdalta Gebzestä, ja avattaessa 2016 se oli Turkin pisin riippusilta.',
    },
    Konya: {
      lyhyt: 'Konyan tasangolla on Çatalhöyük, yksi varhaisimmista kivikauden kaupungeista, ja se on ollut Unescon maailmanperintöä vuodesta 2012.',
    },
    'Kütahya': {
      lyhyt: 'Kütahya on vuosisatoja ollut kaakelien ja keramiikan kaupunki, jonka laattoja päätyi moskeijoihin ja kirkkoihin kaikkialla Lähi-idässä.',
    },
    Malatya: {
      lyhyt: 'Malatyaa kutsutaan aprikoosien maaksi, sillä huomattava osa Turkin kuivatuista aprikooseista kasvaa täällä.',
    },
    Manisa: {
      lyhyt: 'Manisa juhlii joka maaliskuu mesir-tahnaa, mausteista makeista, jonka alkuperäisresepti sisältää 41 ainesosaa.',
    },
    Mardin: {
      lyhyt: 'Mardinin lähellä oleva Deyrulzafaranin luostari oli syyrialaisortodoksisen patriarkan istuin vuodesta 1166 vuoteen 1932.',
    },
    Mersin: {
      lyhyt: 'Kızkalesin eli Neitsytlinnan linnoitus seisoo pienellä saarella aivan kylän rannan edustalla.',
    },
    Mugla: {
      lyhyt: 'Dalyanin İztuzun hiekkaranta on yksi Välimeren tärkeimmistä merikilpikonnien pesimärannoista, ja siksi sitä kutsutaan kilpikonnarannaksi.',
    },
    Mus: {
      lyhyt: 'Muşin tasangolla kukkivat keväisin villit tulppaanit, ja aamuisin tasankoa peittää usein sumu.',
    },
    Nevsehir: {
      lyhyt: 'Derinkuyun maanalainen kaupunki ulottuu noin 85 metrin syvyyteen, ja sinne mahtui arviolta 20 000 ihmistä karjoineen.',
    },
    Nigde: {
      lyhyt: 'Niğden Aladağlarin vuoristossa on neljä yli 3 700 metrin huippua, ja sinne tulevat vuorikiipeilijät ja vaeltajat.',
    },
    Ordu: {
      lyhyt: 'Ordu on Turkin suurin hasselpähkinämaakunta, ja pähkinäpensaat peittävät lähes 90 prosenttia sen viljelymaasta.',
    },
    Osmaniye: {
      lyhyt: 'Karatepen ulkoilmamuseossa on 700-luvulta eaa. peräisin oleva kivikirjoitus kahdella kielellä, foinikiaksi ja luvian hieroglyfeillä.',
    },
    Rize: {
      lyhyt: 'Rize on Turkin sateisin kolkka ja maan teen sydän – teepensaat istutettiin rinteille vasta 1940-luvulla.',
    },
    Sakarya: {
      lyhyt: 'Sapancajärvi on 16 kilometriä pitkä makean veden järvi, jonne tullaan päiväretkille ja viikonlopun lomille.',
    },
    Samsun: {
      lyhyt: 'Samsunissa Mustafa Kemal aloitti kansallisen vastarinnan 19.5.1919, ja päivää juhlitaan yhä Turkin nuorison ja urheilun päivänä.',
    },
    Sanliurfa: {
      lyhyt: 'Şanlıurfan Balıklıgöl on pyhä kala-allas, jonne perimätiedon mukaan Nimrod heitti Abrahamin tuleen.',
    },
    Siirt: {
      lyhyt: 'Siirtin Botanin laakso julistettiin kansallispuistoksi 2019, ja sen jyrkät maisemat sopivat koskenlaskuun ja varjoliitoon.',
    },
    Sinop: {
      lyhyt: 'İnceburunin majakka rakennettiin 1863 kallioille Anatolian pohjoisimpaan kärkeen noin 25 kilometriä Sinopista luoteeseen.',
    },
    Sivas: {
      lyhyt: 'Sivasin Kangalista on nimensä saanut kangal, suuri paimenkoira, joka vartioi lammaslaumoja susilta.',
    },
    Sirnak: {
      lyhyt: 'Cizren koillispuolella kohoaa Cudi-vuori, jolle vanhan kristillisen ja islamilaisen perinteen mukaan Nooan arkki laskeutui.',
    },
    Tekirdag: {
      lyhyt: 'Tekirdağin kuuluisin herkku ovat pienet, mausteiset Tekirdağ köftesi -grillipyörykät.',
    },
    Tokat: {
      lyhyt: 'Tokatin Zilessä Caesar voitti taistelun 47 eaa. ja kuittasi voittonsa sanoilla veni, vidi, vici.',
    },
    Trabzon: {
      lyhyt: 'Uzungöl eli Pitkä järvi on vuorilaakson järvi ja kylä Trabzonin eteläpuolella, ja siitä on tullut suosittu matkakohde.',
    },
    Tunceli: {
      lyhyt: 'Munzurin laakson kansallispuisto on Turkin suurin ja lajistoltaan monimuotoisin kansallispuisto, perustettu 1971.',
    },
    Usak: {
      lyhyt: 'Uşakin arkeologisessa museossa on Karunin aarre, 363 lyydialaista esinettä, jotka New Yorkin Metropolitan palautti Turkille 1993.',
    },
    Van: {
      lyhyt: 'Vanjärven Akdamarin saarella seisoo 915–921 punaisesta tuffikivestä rakennettu Pyhän Ristin kirkko, nykyään museo.',
    },
    Yalova: {
      lyhyt: 'Yalovan Termalin kuumat lähteet ovat istanbulilaisten suosima kesäpaikka, ja nimi tulee kreikan lämmintä tarkoittavasta sanasta.',
    },
    Yozgat: {
      lyhyt: 'Yozgatin mäntymetsä perustettiin 1958 Turkin ensimmäiseksi kansallispuistoksi.',
    },
    Zinguldak: {
      lyhyt: 'Zonguldak perustettiin 1849 satamakaupungiksi Ereğlin hiilikaivoksia varten, ja kivihiili on siitä asti ollut sen elinkeino.',
    },
  },
  /*
   * RUS (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 3C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.RUS:n tunnuksia
   * TÄSMÄLLEEN (Natural Earthin nimet, esim. "Maga Buryatdan" = Magadanin
   * alue, "Chita" = Taka-Baikalin aluepiiri, "Altay" = Altain aluepiiri,
   * "Gorno-Altay" = Altain tasavalta, "Yevrey" = Juutalainen autonominen
   * alue, "RUS+99?" = Natural Earthin nimetön pikkusaari Bajdaratskajan-
   * lahdella, 68,8° N 67,3° E). Vain `lyhyt` tässä erässä. Crimea ja
   * Sevastopol kuvaavat vain maisemaa ja kaupunkia. Vältetty Moskovan ja
   * Pietarin fokusvirtojen sekä maastokohteet-rus.js:n aiheet (Baikalin
   * repeämä, Kizhi, Pietarhof, Elbrus, Kazanin kreml, Jasnaja Poljana,
   * Tobolsk, Kolan syväreikä, Tunguska). Lähteet (en-/ru-Wikipedia ja
   * hakutarkistus 25.9.2026), epävarmimmat tarkistettu erikseen:
   *   Altay            — Altai Krai (tattarista 40–60 % Venäjän sadosta,
   *                      alueen maatalousministeriö / FAO)
   *   Buryat           — Selenga River (lähes puolet Baikalin jokivedestä,
   *                      Ramsar-kohde, yli 170 lintulajia)
   *   Chelyabinsk      — Chelyabinsk meteor (654 kg:n kappale nostettiin
   *                      Tšebarkuljärvestä 16.10.2013)
   *   Chita            — Landscapes of Dauria (Toreijärvet, dzeren)
   *   Crimea           — Swallow's Nest (Aurora-kallio 40 m, 1911–1912)
   *   Dagestan         — Sulak Canyon (1 920 m, 63 m Grand Canyonia syvempi)
   *   Kabardin-Balkar  — Baksan Neutrino Observatory (SN1987A)
   *   Kaliningrad      — Kaliningrad Amber Combine (noin 90 % louhittavasta
   *                      meripihkasta Jantarnyin ympäristössä)
   *   Karachay-Cherkess — BTA-6 (first light 1975, suurin 1990 asti)
   *   Karelia          — Petroglyphs of Lake Onega and the White Sea (2021)
   *   Kalmyk           — Elista (Kultainen asumus, Euroopan suurin
   *                      buddhalainen temppeli, 2005)
   *   Chechnya         — Kezenoyam (ru: pinta-alaltaan Kaukasuksen suurin,
   *                      1 854–1 869 m)
   *   Irkutsk          — Irkutsk (72 km Angaran lähtökohdasta)
   *   Ivanovo          — Ivanovo ("city of brides")
   *   Komi             — Manpupuner rock formations (7 pylvästä, 30–42 m)
   *   Kostroma         — Terem Snegurochki (2008, Volgan ranta)
   *   Maga Buryatdan   — Magadan Oblast (462 464 km², 136 085 as. 2021)
   *   North Ossetia    — Dargavs (99 hautaa ja kryptaa)
   *   Rostov           — Tanais (Nedvigovka, arkeologinen museoalue)
   *   RUS+99?          — Baydaratskaya Bay (Gazpromin putket pohjaan 2014)
   *   Saratov          — Saratovskaya garmonika (kaksi kelloa kannessa)
   *   Smolensk         — Smolensk Kremlin (6,5 km, 1595–1602)
   *   City of St. Petersburg — Hermitage cats (50–74 kissaa)
   *   Tambov           — Ivanovka estate (Rahmaninovin kesäkoti 1890–1917)
   *   Tula             — Tula pryanik (kaiverretut puulaudat, täyte)
   *   Tver'            — Volgoverkhovye (kappeli lähteen päällä)
   *   Tyumen'          — Tyumen (1586, ensimmäinen venäläinen asutus
   *                      Siperiassa)
   *   Udmurt           — Buranovskiye Babushki (Euroviisut 2012, 2. sija)
   *   Volgograd        — Lake Elton (Euroopan suurin mineraalijärvi,
   *                      Dunaliella salina -levä)
   *   Voronezh         — Kostenki (26 paleoliittista kohdetta,
   *                      mammutinluurakennelmat)
   *   Yamal-Nenets     — Salekhard (napapiirillä, muistomerkki)
   *   Yevrey           — Birobidzhan (Šolem Aleichemin katu)
   *   Muut             — yleistietoa, tarkistettu vastaavista
   *                      en-Wikipedia-artikkeleista.
   */
  RUS: {
    Adygey: {
      lyhyt: 'Adygea on kokonaan Krasnodarin aluepiirin ympäröimä, ja sen nimeä kantaa adygeanjuusto, pehmeä tuorejuusto, jota syödään kaikkialla Venäjällä.',
    },
    Altay: {
      lyhyt: 'Altain aluepiirin pelloilta korjataan vuosittain noin puolet koko Venäjän tattarista, ja kesällä tattaripellot kukkivat valkoisina.',
    },
    Amur: {
      lyhyt: 'Amurin alueen taigaan on rakennettu Vostotšnyin avaruuskeskus, josta ensimmäinen raketti nousi huhtikuussa 2016.',
    },
    "Arkhangel'sk": {
      lyhyt: 'Arkangelin alueeseen kuuluu myös Frans Joosefin maa, arktinen saaristo, jonka saaret ovat suurelta osin jäätiköiden peitossa.',
    },
    "Astrakhan'": {
      lyhyt: 'Volga laskee Astrahanin alueella Kaspianmereen Euroopan suurimpana jokisuistona, ja kesällä suiston lahdet peittyvät lootuksen kukkiin.',
    },
    Bashkortostan: {
      lyhyt: 'Baškortostanin Šulgan-Tašin eli Kapovan luolan seinillä on kivikautisia maalauksia mammuteista ja hevosista.',
    },
    Belgorod: {
      lyhyt: 'Belgorod tarkoittaa valkoista kaupunkia, ja nimi viittaa seudun vaaleisiin liitu- ja kalkkikiviesiintymiin.',
    },
    Bryansk: {
      lyhyt: 'Brjanskin metsän mänty- ja tammimetsät ja Nerussajoen suot on suojeltu, ja ne kuuluvat Unescon biosfäärialueeseen.',
    },
    Buryat: {
      lyhyt: 'Selenga tuo Burjatiasta lähes puolet Baikaliin laskevien jokien vedestä, ja sen suisto on satojen lintulajien levähdyspaikka.',
    },
    Chelyabinsk: {
      lyhyt: 'Helmikuussa 2013 Tšeljabinskin yllä räjähti meteori, ja sen yli 600 kilon kappale nostettiin myöhemmin Tšebarkuljärven pohjasta.',
    },
    Chita: {
      lyhyt: 'Taka-Baikalin Daurian arot ja Toreijärvet ovat Unescon maailmanperintöä, ja niillä vaeltaa mongoliangaselleja.',
    },
    Crimea: {
      lyhyt: 'Jaltan lähellä Pääskysenpesän pieni linna kyyhöttää 40-metrisen jyrkänteen reunalla Mustanmeren yllä.',
    },
    Dagestan: {
      lyhyt: 'Dagestanin Sulakin kanjoni on lähes kaksi kilometriä syvä, syvempi kuin Coloradon Grand Canyon.',
    },
    'Gorno-Altay': {
      lyhyt: 'Altain tasavallan Beluha, 4 506 metriä, on Altain vuoriston korkein huippu, ja sen jäätiköiltä saa alkunsa Katunjoki.',
    },
    Khakass: {
      lyhyt: 'Hakassiassa Jenisei on padottu Sajano-Šušenskajan voimalaksi, joka on Venäjän suurin sähkövoimala.',
    },
    'Khanty-Mansiy': {
      lyhyt: 'Hanti-Mansijsk on rakennettu Irtyšin ja Obin yhtymäkohdan lähelle, ja alue on nimetty kahden alkuperäiskansan, hantien ja mansien, mukaan.',
    },
    Ingush: {
      lyhyt: 'Inguššian vuoriston rotkoissa seisoo keskiaikaisia kivitorneja, ja Vovnuškin tornit on rakennettu suoraan kallionhuipuille.',
    },
    Irkutsk: {
      lyhyt: 'Angara on ainoa joki, joka virtaa ulos Baikalista, ja Irkutsk on sen rannalla noin 70 kilometriä järveltä.',
    },
    Ivanovo: {
      lyhyt: 'Ivanovo on vanha tekstiilikaupunki, ja koska kutomoissa työskenteli enimmäkseen naisia, sitä kutsutaan morsiamien kaupungiksi.',
    },
    'Kabardin-Balkar': {
      lyhyt: 'Baksanin laakson vuoren alla on neutriinolaboratorio, jonka ilmaisin tallensi vuonna 1987 kaukaisesta supernovasta tulleita neutriinoja.',
    },
    Kaliningrad: {
      lyhyt: 'Kaliningradin alueen Jantarnyissa on maailman suurin meripihkaesiintymä, ja meripihkaa kaivetaan siellä avolouhoksesta.',
    },
    Kalmyk: {
      lyhyt: 'Kalmukian pääkaupungissa Elistassa on Euroopan suurin buddhalainen temppeli, Buddha Šakjamunin kultainen asumus.',
    },
    Kaluga: {
      lyhyt: 'Kalugassa asui avaruuslentojen uranuurtaja Konstantin Tsiolkovski, ja kaupungin kosmonautiikan historian museo kantaa hänen nimeään.',
    },
    Kamchatka: {
      lyhyt: 'Kamtšatkan Kljutševskaja Sopka, noin 4 750 metriä, on Euraasian korkein toimiva tulivuori, ja se purkautuu yhä usein.',
    },
    'Karachay-Cherkess': {
      lyhyt: 'Karatšai-Tšerkessian vuorilla on BTA-6-kaukoputki, jonka kuusimetrinen peili oli valmistuessaan 1975 maailman suurin.',
    },
    Karelia: {
      lyhyt: 'Äänisen ja Vienanmeren rantakallioihin on hakattu tuhansia kivikautisia kalliopiirroksia, ja ne ovat Unescon maailmanperintöä.',
    },
    Kemerovo: {
      lyhyt: 'Kemerovon alue on Kuzbass eli Kuznetskin hiiliallas, Venäjän suurin kivihiilen louhinta-alue.',
    },
    Khabarovsk: {
      lyhyt: 'Habarovskin kohdalla Amurin ylittävä pitkä silta on kuvattu Venäjän 5 000 ruplan setelin kääntöpuolelle.',
    },
    Kirov: {
      lyhyt: 'Kirovin lähellä Dymkovossa muovaillaan yhä savileluja, jotka kalkitaan valkoisiksi ja maalataan kirkkain värein.',
    },
    Komi: {
      lyhyt: 'Komin Manpupunerin ylängöllä seisoo seitsemän 30–42-metristä kivipylvästä, joita kutsutaan seitsemäksi voimamieheksi.',
    },
    Kostroma: {
      lyhyt: 'Kostromaa pidetään Snegurotškan, Pakkasukon lumityttären, kotikaupunkina, ja Volgan rannalla on hänen puinen satutalonsa.',
    },
    Krasnodar: {
      lyhyt: 'Krasnodarin aluepiirin Sotši on subtrooppinen lomakaupunki, jonka yläpuolisilla vuorilla ajettiin 2014 talviolympialaisten alppilajit.',
    },
    Krasnoyarsk: {
      lyhyt: 'Krasnojarskin aluepiiriin kuuluu Tšeljuskininniemi Taimyrin niemimaalla, Euraasian mantereen pohjoisin kärki.',
    },
    Kurgan: {
      lyhyt: 'Kurganissa toimii Ilizarovin keskus, jossa kehitettiin luiden pidentämiseen ja murtumien hoitoon käytetty rengaskehikko.',
    },
    Kursk: {
      lyhyt: 'Kurskin alueen maaperässä on niin paljon rautamalmia, että kompassi näyttää väärin – ilmiö tunnetaan Kurskin magneettisena anomaliana.',
    },
    Leningrad: {
      lyhyt: 'Leningradin alueella on suuri osa Laatokasta, Euroopan suurimmasta järvestä, josta Neva virtaa kohti Pietaria.',
    },
    Lipetsk: {
      lyhyt: 'Lipetskin nimi tulee lehmuksesta, venäjäksi lipa, mutta nykyään kaupunki tunnetaan ennen kaikkea suuresta terästehtaastaan.',
    },
    'Maga Buryatdan': {
      lyhyt: 'Magadanin alue on pinta-alaltaan Saksaa suurempi, mutta asukkaita on vain noin 136 000, ja lähes kaikki asuvat kaupungeissa.',
    },
    'Mariy-El': {
      lyhyt: 'Moni mari harjoittaa yhä vanhaa luonnonuskontoaan, ja yhteisiä rukoushetkiä pidetään pyhissä lehdoissa.',
    },
    Mordovia: {
      lyhyt: 'Mordvassa puhutaan kahta suomalais-ugrilaista kieltä, ersää ja mokšaa, jotka ovat tasavallan virallisia kieliä venäjän rinnalla.',
    },
    Moskva: {
      lyhyt: 'Moskovan Ostankinon televisiotorni kohoaa 540 metriin, ja se on Euroopan korkein vapaasti seisova rakennelma.',
    },
    Moskovskaya: {
      lyhyt: 'Moskovan alueen Sergijev Posadissa on Kolminaisuuden lavra, Venäjän ortodoksisen kirkon tärkeimpiä luostareita.',
    },
    Murmansk: {
      lyhyt: 'Murmansk on maailman suurin kaupunki napapiirin pohjoispuolella, ja talvella aurinko pysyy siellä horisontin alla noin kuusi viikkoa.',
    },
    Nenets: {
      lyhyt: 'Nenetsian tundralla nenetsit paimentavat yhä poroja, ja pääkaupungin Narjan-Marin nimi tarkoittaa nenetsiksi punaista kaupunkia.',
    },
    Nizhegorod: {
      lyhyt: 'Nižni Novgorodin alueen Semjonovissa maalataan hohlomaa, puuastioita, joiden kukkakuviot hohtavat punaisena, mustana ja kultaisena.',
    },
    Novgorod: {
      lyhyt: 'Novgorodin kosteasta maasta on kaivettu esiin yli tuhat keskiaikaista tuohikirjettä, tavallisten kaupunkilaisten arkisia viestejä.',
    },
    Novosibirsk: {
      lyhyt: 'Novosibirskin Akademgorodok on 1950-luvulla metsän keskelle rakennettu tiedekaupunki, jossa toimii kymmeniä tutkimuslaitoksia.',
    },
    Omsk: {
      lyhyt: 'Omsk on rakennettu kohtaan, jossa pieni Om-joki laskee Irtyšiin, ja kaupunki on saanut nimensä pienemmältä joelta.',
    },
    Orel: {
      lyhyt: 'Orjolissa syntyi kirjailija Ivan Turgenev, ja hänen sukunsa kartano Spasskoje-Lutovinovo on nykyään museo.',
    },
    Orenburg: {
      lyhyt: 'Orenburgin untuvahuivit neulotaan vuohenuntuvasta niin ohuiksi, että hienoimman huivin voi pujottaa sormuksen läpi.',
    },
    Penza: {
      lyhyt: 'Penzan alueen Tarhanyssa kasvoi runoilija Mihail Lermontov isoäitinsä kartanossa, joka on nyt hänen museonsa.',
    },
    "Perm'": {
      lyhyt: 'Maapallon historian permikausi on nimetty Permin mukaan, sillä brittigeologi Murchison tutki kauden kerrostumia täällä 1841.',
    },
    'City of St. Petersburg': {
      lyhyt: 'Pietarin Eremitaasissa asuu kymmeniä kissoja, jotka pitävät museon kellarit hiirettöminä, ja niillä on omat hoitajansa.',
    },
    'North Ossetia': {
      lyhyt: 'Pohjois-Ossetian Dargavsin laakson rinteellä on vanha kuolleiden kaupunki, lähes sata kivistä hautahuonetta rivissä.',
    },
    "Primor'ye": {
      lyhyt: 'Primorjen Leopardin maan kansallispuistossa elää suurin osa maailman luonnonvaraisista amurinleopardeista.',
    },
    Pskov: {
      lyhyt: 'Puškinin sukutila Mihailovskoje Pihkovan alueella on museona, ja runoilija on haudattu läheiseen Svjatogorskin luostariin.',
    },
    Rostov: {
      lyhyt: 'Donin suistossa Rostovin lähellä on Tanaisin kaivausalue, antiikin kreikkalaisten kauppakaupungin rauniot, jotka ovat nyt ulkomuseo.',
    },
    'RUS+99?': {
      lyhyt: 'Tämä pieni saari on Karanmeren Bajdaratskajanlahdella, jonka pohjaan laskettiin 2014 kaasuputket Jamalin niemimaalta.',
    },
    "Ryazan'": {
      lyhyt: 'Runoilija Sergei Jesenin syntyi Rjazanin alueen Konstantinovon kylässä Okan rannalla, ja hänen kotitalonsa on museo.',
    },
    'Sakha (Yakutia)': {
      lyhyt: 'Sahan Oimjakonin kylässä on mitattu lähes 68 asteen pakkanen, yksi pohjoisen pallonpuoliskon kylmimmistä koskaan mitatuista lukemista.',
    },
    Sakhalin: {
      lyhyt: 'Anton Tšehov matkusti Sahaliniin 1890 ja kirjoitti saaresta kirjan, jolle on Južno-Sahalinskissa oma museonsa.',
    },
    Samara: {
      lyhyt: 'Samaran alueen Toljatissa on AvtoVAZin tehdas, jonka linjoilta Lada-autoja on vierinyt vuodesta 1970.',
    },
    Saratov: {
      lyhyt: 'Saratovin harmonikan kannessa on kaksi pientä kelloa, jotka helähtävät bassonappien tahdissa tanssikappaleissa.',
    },
    Sevastopol: {
      lyhyt: 'Sevastopolin laidalla antiikin Khersonesoksen rauniot laskeutuvat suoraan Mustanmeren rantaan.',
    },
    Smolensk: {
      lyhyt: 'Smolenskin linnoitusmuuri rakennettiin 1595–1602 yli kuuden kilometrin mittaiseksi, ja pitkiä osuuksia torneineen on yhä pystyssä.',
    },
    "Stavropol'": {
      lyhyt: 'Stavropolin aluepiirin Kislovodskista pulppuaa narzan-kivennäisvettä, ja sen kylpylöihin tullaan yhä parantumaan.',
    },
    Sverdlovsk: {
      lyhyt: 'Jekaterinburgin lähellä Uralilla voi seistä yhtä aikaa Euroopassa ja Aasiassa, rajaa merkitsevän obeliskin kummallakin puolella.',
    },
    Tambov: {
      lyhyt: 'Säveltäjä Sergei Rahmaninov vietti kesiään Tambovin alueen Ivanovkassa, ja kartano on nykyään hänen museonsa.',
    },
    Tatarstan: {
      lyhyt: 'Tatarstanin kesäjuhlassa sabantuissa kiivetään liukkaaseen salkoon ja painitaan perinteistä vyöpainia.',
    },
    Tomsk: {
      lyhyt: 'Tomskia kutsutaan Siperian Ateenaksi, sillä kaupungissa on Siperian vanhin yliopisto ja suuri joukko opiskelijoita.',
    },
    Chechnya: {
      lyhyt: 'Tšetšenian vuoristossa lähes 1 900 metrin korkeudessa on Kezenoi-am, Kaukasuksen vuoriston pinta-alaltaan suurin järvi.',
    },
    'Chukchi Autonomous Okrug': {
      lyhyt: 'Tšukotkan Dežnevinniemi on Euraasian mantereen itäisin kärki, ja Beringinsalmen toisella puolella on Alaska.',
    },
    Chuvash: {
      lyhyt: 'Tšuvassin kieli on ainoa elossa oleva oguurien turkkilaiskieli, ja se eroaa paljon muista turkkilaiskielistä.',
    },
    Tula: {
      lyhyt: 'Tulan prjanikit ovat hunajaisia piparkakkulevyjä, jotka painetaan kaiverrettuihin puumuotteihin ja täytetään usein hillolla.',
    },
    Tuva: {
      lyhyt: 'Tuvassa lauletaan kurkkulaulua, jossa laulaja tuottaa yhtä aikaa matalan pohjasävelen ja sen yllä viheltävän yläsävelen.',
    },
    "Tver'": {
      lyhyt: 'Volgan lähde on Tverin alueen Valdain ylängöllä, ja pienen lähteen päälle on rakennettu kappeli.',
    },
    "Tyumen'": {
      lyhyt: 'Tjumen perustettiin 1586, ja sitä pidetään ensimmäisenä venäläisenä kaupunkina Siperiassa.',
    },
    Udmurt: {
      lyhyt: 'Udmurtialaisen Buranovon kylän mummokuoro lauloi Euroviisuissa 2012 toiseksi, osin udmurtiksi.',
    },
    "Ul'yanovsk": {
      lyhyt: 'Oblomovin kirjoittaja Ivan Gontšarov syntyi nykyisessä Uljanovskissa, ja kaupungissa on hänen museonsa.',
    },
    Vladimir: {
      lyhyt: 'Nerljoen Pokrovan kirkko seisoo yksin tulvaniityn keskellä Bogoljubovon lähellä, ja se on Unescon maailmanperintöä.',
    },
    Volgograd: {
      lyhyt: 'Volgogradin alueen Eltonjärvi on Euroopan suurin mineraalijärvi, ja levät värjäävät sen suolaisen veden punertavaksi.',
    },
    Vologda: {
      lyhyt: 'Vologdan nypläyspitsi on alueen tunnetuin käsityö, ja kaupungissa on sille oma museonsa.',
    },
    Voronezh: {
      lyhyt: 'Voronežin alueen Kostjonkissa on kaivettu esiin kymmeniä kivikautisia asuinpaikkoja, joista osa on rakennettu mammutinluista.',
    },
    'Yamal-Nenets': {
      lyhyt: 'Salehard on rakennettu aivan napapiirille, ja kaupungissa napapiirin kohtaa merkitsee oma muistomerkki.',
    },
    "Yaroslavl'": {
      lyhyt: 'Jaroslavlin vaakunassa on kirvestä kantava karhu, sillä tarun mukaan kaupungin perustaja Jaroslav Viisas kaatoi karhun juuri täällä.',
    },
    Yevrey: {
      lyhyt: 'Juutalaisen autonomisen alueen pääkaupungin Birobidžanin pääkatu on nimetty jiddišiksi kirjoittaneen Šolem Aleichemin mukaan.',
    },
  },
};
