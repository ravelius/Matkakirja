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
   * (Natural Earthin `name`-kenttä latinaistettuna). `pikkukuva`
   * (löydös 115) odottaa kuvaputken toimitusta erikseen.
   *
   * KUVA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
   * yhteydessä): yksi aito Wikimedia Commons -valokuva per alue,
   * ladattu, lisenssi tarkistettu Commonsin API:sta (imageinfo/
   * extmetadata) ennen latausta, suurennettu enintään 1600 px:iin ja
   * viety ämpäriin karttanostot/20260926/. Vain PD/CC0/CC BY/CC BY-SA,
   * ei NC/ND-kuvia. Havainnekuva (1873) tulee myöhemmin erikseen.
   * `pikkukuva` (Fablen täsmennys 26.9.2026, PR #3307:n skeema): GRC ei
   * ollut mukana Codexin kuvitetussa pikkukuva-tilauksessa (löydös 115
   * kattaa vain FRA/ESP/ITA/GBR/DEU/POL/AUT), joten GRC:n pikkukuva
   * kierrättää samat yllä olevat kuva-osoitteet väliaikaisena
   * ratkaisuna Fablen luvalla — ei erillistä latausta.
   * Lähteet (tarkistettu Wikimedia Commons -API:sta 26.9.2026):
   *   Attiki           — File:Acropolis_Parthenon_Athens_Greece.jpg (Jebulon, CC0)
   *   Kentriki Makedonia — File:The_White_Tower_of_Thessaloniki,_Greece.jpg (Annatsach, CC BY-SA 4.0)
   *   Kriti            — File:Samaria_Gorge_03.jpg (Lapplaender, CC BY-SA 3.0 DE)
   *   Peloponnisos     — File:Corinth_Canal_2.jpg (Alterego, CC BY-SA 3.0)
   *   Thessalia        — File:Meteora_Main_Monastery.jpg (AngelikiC, CC BY-SA 4.0)
   *   Ipeiros          — File:Vikos_Gorge_seen_from_Beloi_Viewpoint,_September_2022_02.jpg (Calistemon, CC BY-SA 4.0)
   *   Dytiki Makedonia — File:Lake_of_Kastoria.jpg (Poli.papazoi, CC BY-SA 4.0)
   *   Dytiki Ellada    — File:Charilaos_Trikoupis_Bridge_(Rio-Antirrio)_-_panoramio.jpg (darkobajic, CC BY 3.0)
   *   Stereá Elláda    — File:Temple_of_Apollo_in_Delphi_01.jpg (Bernard Gagnon, CC BY-SA 4.0)
   *   Anatoliki Makedonia kai Thraki — File:Port_of_Kavala.jpg (Politicslover2, public domain;
   *     Evros-joesta ei löytynyt vapaasti lisensoitua aitoa valokuvaa, vain karttoja)
   *   Ionioi Nisoi     — File:The_Old_Fortress_and_the_Old_Town_of_Corfu_-_September_2017.jpg (Martin Falbisoner, CC BY-SA 4.0)
   *   Notio Aigaio     — File:Santorini_caldera_panorama_from_Skaros.jpg (Yanko Malinov, CC BY-SA 4.0)
   *   Voreio Aigaio    — File:Petrified_forest_of_Lesbos_12.jpg (Tomisti, CC BY-SA 4.0)
   *   Ayion Oros       — File:Athos-Berggipfel.jpg (Rosa-Maria Rinkl, CC BY-SA 4.0; kuvattu
   *     mereltä risteilyveneeltä, ei luostareita tai ihmisiä lähikuvassa)
   */
  GRC: {
    Attiki: {
      lyhyt: 'Ateenan Akropolis kohoaa yhä keskustan yllä, mutta rannikolla Ateenan Riviera houkuttelee uimaan aivan kaupungin kupeessa.',
      pitka: 'Ateena on nykyään yli kolmen miljoonan asukkaan metropoli, mutta kun siitä tehtiin pääkaupunki 1834, se oli sodan runtelema noin 4000 asukkaan pikkukaupunki Akropoliin juurella. Isoisän aikaan 1873 Akropoliin laella seisoi yhä keskiaikainen frankkitorni, joka purettiin vasta 1874–1875 Heinrich Schliemannin rahoilla, jotta kukkula näyttäisi taas antiikkiselta. Samoihin aikoihin koko maa kuohui Lavrionin kaivoksista: ranskalais-italialainen yhtiö rikastui antiikin kaivosmiesten jättämästä kuonasta, ja kiista valtion kanssa ratkesi vasta helmikuussa 1873 tehdyllä sopimuksella. Sounionin niemellä Poseidonin temppelin pylväät katsovat yhä merelle Attikan eteläkärjessä.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-attiki-267cf435.jpg',
          lahde: 'Jebulon, Wikimedia Commons (CC0 1.0)',
          tekija: 'Jebulon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Acropolis_Parthenon_Athens_Greece.jpg',
          lisenssi: 'CC0 1.0',
          lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-attiki-267cf435.jpg',
    },
    'Kentriki Makedonia': {
      lyhyt: 'Thessaloniki on Kreikan toiseksi suurin kaupunki, ja sen rantabulevardilla Valkoinen torni katsoo yhä Thermaisenlahdelle.',
      pitka: 'Thessalonikissa bysanttilaiset kirkot, osmanien kylpylät ja 1900-luvun kerrostalot seisovat samoilla kaduilla, ja kaupungin yllä näkyy kirkkaalla säällä Olymposvuori. Vuonna 1873 kaupunki oli osmanien Selanik eikä kuulunut Kreikkaan – se liitettiin Kreikkaan vasta Balkanin sodassa 1912. Rantabulevardin tornia kutsuttiin silloin vielä Veritorniksi, sillä se oli pahamaineinen vankila; valkoiseksi sen kalkitsi vasta 1890 vanki, joka sai työstä vapautensa. Kaupungin suurin väestöryhmä olivat 1400-luvun lopulla Espanjasta karkotettujen juutalaisten jälkeläiset, jotka puhuivat juutalaisespanjaa – yhteisö tuhottiin lähes kokonaan, kun natsit karkottivat sen Auschwitziin 1943.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-kentriki-makedonia-5c601f8c.jpg',
          lahde: 'Annatsach, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Annatsach',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_White_Tower_of_Thessaloniki,_Greece.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-kentriki-makedonia-5c601f8c.jpg',
    },
    Kriti: {
      lyhyt: 'Kreeta on Kreikan suurin saari, ja sen vuoristoisella Samarian rotkolla vaeltaa tuhansia retkeilijöitä joka kesä.',
      pitka: 'Kreeta on kuin oma pieni mantereensa: Valkoisten vuorten huiput, oliivilehdot ja oma murre, jolla lauletaan yhä improvisoituja mantinades-säkeitä lyyran säestyksellä. Vuonna 1873 saari kuului vielä Osmanivaltakuntaan, ja suuren kapinan muisto oli tuore: 1866 Arkadin luostarin puolustajat räjäyttivät ruutivarastonsa mieluummin kuin antautuivat, ja uutinen herätti myötätuntoa kaikkialla Euroopassa. Kreeta sai itsehallinnon 1898 ja liitettiin Kreikkaan vasta 1913. Knossoksen palatsi odotti isoisän aikaan vielä maan alla – ensimmäiset kaivaukset tehtiin 1878 ja suuret Arthur Evansin johdolla vasta vuodesta 1900.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-kriti-30918314.jpg',
          lahde: 'Lapplaender, Wikimedia Commons (CC BY-SA 3.0 DE)',
          tekija: 'Lapplaender',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samaria_Gorge_03.jpg',
          lisenssi: 'CC BY-SA 3.0 DE',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-kriti-30918314.jpg',
    },
    Peloponnisos: {
      lyhyt: 'Korinton kanava halkaisee Peloponnesoksen niemimaan kapeasta kannaksesta, ja sillalta autoilijat katsovat yli 70 metriä alas.',
      pitka: 'Peloponnesos on vuorten, oliivitarhojen ja pienten satamien niemimaa, jonka eteläkärjessä Manin kivitorneissa asui aikoinaan sukuja, jotka kävivät verikostoa keskenään sukupolvesta toiseen. Täällä on myös itsenäisen Kreikan ensimmäinen pääkaupunki Nafplio, jonka kirkon portailla maan ensimmäinen valtionpäämies Ioannis Kapodistrias murhattiin 1831. Isoisän kulkiessa 1873 laivalla ei vielä päässyt Korintin kannaksen läpi, sillä kanavaa alettiin kaivaa vasta 1881. Myös Mykenen kuninkaanhaudat olivat löytämättä: leijonaportti oli näkyvissä, mutta Heinrich Schliemann kaivoi kultaiset kuolinnaamiot esiin vasta 1876.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-peloponnisos-b4f57b8f.jpg',
          lahde: 'Alterego, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Alterego',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Corinth_Canal_2.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-peloponnisos-b4f57b8f.jpg',
    },
    Thessalia: {
      lyhyt: 'Thessalian pystyjen kalliopylväiden laella kohoavat Meteoran luostarit, joihin munkit kiipesivät ennen tikapuilla ja köysillä.',
      pitka: 'Thessalia on Kreikan viljakamari: laaja, tasainen tasanko, jota vuoret kiertävät joka puolelta ja jonka keskellä Larisa on kasvanut maakunnan suurimmaksi kaupungiksi. Vuonna 1873 isoisä ei olisi löytänyt täältä Kreikkaa lainkaan, sillä Thessalia kuului yhä Osmanivaltakuntaan ja siirtyi Kreikalle vasta Konstantinopolin sopimuksella 1881. Itärannikolla Volosin sataman yllä kohoaa Pelionin vuori, jonka rinteillä tarun mukaan asuivat kentaurit ja jonka kylissä on yhä kivikattoisia kartanoita. Volosin seudulta myyttinen Iason lähti Argo-laivallaan etsimään kultaista taljaa.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-thessalia-94962e38.jpg',
          lahde: 'AngelikiC, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'AngelikiC',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Meteora_Main_Monastery.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-thessalia-94962e38.jpg',
    },
    Ipeiros: {
      lyhyt: 'Epeiroksen Vikosin rotko on maailman syvimpiä suhteessa leveyteensä, ja sen reunoilla vanhat kivikylät ovat yhä asuttuja.',
      pitka: 'Epeiros on Kreikan vuoristoisin kolkka: Pindoksen harjanteita, jyrkkiä rotkoja ja Zagorin kylien kivisiä kaarisiltoja, joita pitkin muulit kulkivat ennen teiden aikaa. Alueen pääkaupunki Ioannina lepää Pamvotisjärven rannalla, ja järven saarella tapettiin 1822 mahtava Ali-pasa, joka oli hallinnut Epeirosta lähes kuin omaa valtakuntaansa. Vuonna 1873 koko Epeiros kuului vielä Osmanivaltakuntaan; Artan seutu siirtyi Kreikalle 1881, mutta Ioannina vasta helmikuussa 1913 Balkanin sodassa. Ioanninan hopeasepät jatkavat yhä vuosisataista taitoaan vanhan linnoituksen kujilla.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ipeiros-81904730.jpg',
          lahde: 'Calistemon, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Calistemon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vikos_Gorge_seen_from_Beloi_Viewpoint,_September_2022_02.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ipeiros-81904730.jpg',
    },
    'Dytiki Makedonia': {
      lyhyt: 'Kastorian kaupunki kiertää turkiskaupasta vaurastuneen järven ympäri, ja talvisin sen kapea niemi peittyy usein usvaan.',
      pitka: 'Länsi-Makedonia on Kreikan ainoa maakunta, jolla ei ole rantaviivaa: korkeiden vuorten ja järvien ylänkö, jossa talvet ovat kylmiä ja lumisia. Kastorian turkkurit toimittivat jo Bysantin hoville hermeliininnahkoja, ja kaupungissa on yhä yli 50 bysanttilaista tai keskiaikaista kirkkoa. Vuonna 1873 alue kuului Osmanivaltakuntaan, ja Kastoria liitettiin Kreikkaan vasta 1912. Pohjoisessa Prespajärvet ovat kolmen maan rajalla, ja niiden kaislikoissa pesii kiharapelikaaneja; Kozanin ja Ptolemaidan avolouhoksista taas on kaivettu ruskohiiltä, joka oli pitkään Kreikan tärkein sähkönlähde.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-dytiki-makedonia-10cd285c.jpg',
          lahde: 'Poli.papazoi, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Poli.papazoi',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_of_Kastoria.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-dytiki-makedonia-10cd285c.jpg',
    },
    'Dytiki Ellada': {
      lyhyt: 'Rio–Antirrion silta yhdistää Peloponnesoksen manner-Kreikkaan, ja Patran karnevaali on koko maan suurin katujuhla.',
      pitka: 'Länsi-Kreikka ulottuu Patraksen satamasta Messolonkin laguuneille ja Olympian laaksoon, jossa antiikin kisoja pidettiin yli tuhannen vuoden ajan. Isoisän kulkiessa 1873 alue kuului jo Kreikkaan, mutta Olympia oli yhä jopa kahdeksan metrin maakerroksen alla: saksalaiset aloittivat järjestelmälliset kaivaukset vasta 1875. Patras vaurastui tuohon aikaan korintinrusinoiden viennistä, ja baijerilainen Gustav Clauss oli perustanut kaupungin yläpuolelle viinitilan jo 1861 – sen makeaa mavrodafni-viiniä valmistetaan yhä. Messolongissa taas muistetaan lordi Byronia, joka kuoli siellä kuumeeseen 1824 kesken Kreikan vapaussodan.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-dytiki-ellada-2c0708f5.jpg',
          lahde: 'darkobajic, Wikimedia Commons (CC BY 3.0)',
          tekija: 'darkobajic',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Charilaos_Trikoupis_Bridge_(Rio-Antirrio)_-_panoramio.jpg',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-dytiki-ellada-2c0708f5.jpg',
    },
    'Stereá Elláda': {
      lyhyt: 'Delfoin oraakkelin rauniot kohoavat Parnassosvuoren rinteellä – antiikin kreikkalaiset pitivät paikkaa maailman napana.',
      pitka: 'Keski-Kreikka kuului itsenäiseen Kreikkaan alusta asti, ja se ulottuu Parnassoksen rinteiltä Termopylain solaan ja Euboian suurelle saarelle. Isoisän aikaan Delfoissa ei vielä näkynyt Apollonin pyhäkköä, sillä raunioiden päällä seisoi Kastrin kylä noin 400 taloineen; kylä siirrettiin pois vasta 1892, kun ranskalaiset aloittivat suuren kaivauksensa. Termopylain kapeaa solaa, jossa spartalaiset taistelivat 480 eaa., ei enää ole, sillä rantaviiva on siirtynyt jokien kerrostumien myötä paikoin jopa yhdeksän kilometriä kauemmas. Boiotian vuorilla Hosios Loukasin luostarin tuhatvuotiaat kultamosaiikit hohtavat yhä kupolien alla.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-sterea-ellada-b756c201.jpg',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Bernard Gagnon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Temple_of_Apollo_in_Delphi_01.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-sterea-ellada-b756c201.jpg',
    },
    'Anatoliki Makedonia kai Thraki': {
      lyhyt: 'Traakiassa asuu Kreikan suurin muslimivähemmistö, ja rajajoki Evros erottaa alueen naapurimaasta Turkista.',
      pitka: 'Itä-Makedonia ja Traakia ulottuu Kavalan satamasta Rodopivuorten kautta Evrosjoelle, ja sen kylissä voi kuulla kreikan lisäksi turkkia ja pomakkia. Vuonna 1873 koko seutu kuului Osmanivaltakuntaan: Kavala liitettiin Kreikkaan Balkanin sotien jälkeen 1913, ja Länsi-Traakia oli välillä Bulgarian hallussa ja siirtyi Kreikalle vasta 1920. Kavalassa varttui Muhammad Ali, josta tuli Egyptin hallitsija, ja hänen kotikaupungilleen 1813 rakennuttamansa imaret on nykyään hotelli. Myöhemmin Kavala vaurastui tupakasta, jonka lehtiä kuivattiin ja lajiteltiin sataman suurissa varastoissa.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-anatoliki-makedonia-kai-thraki-c1ab2e80.jpg',
          lahde: 'Politicslover2, Wikimedia Commons (public domain)',
          tekija: 'Politicslover2',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Port_of_Kavala.jpg',
          lisenssi: 'Public domain',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-anatoliki-makedonia-kai-thraki-c1ab2e80.jpg',
    },
    'Ionioi Nisoi': {
      lyhyt: 'Korfun venetsialaistyylinen vanhakaupunki on Unescon listalla, ja Joonianmeren saaristo makaa Kreikan läntisimpänä.',
      pitka: 'Joonianmeren saaret ovat vihreämpiä kuin muu Kreikka, ja niiden kaupungeissa näkyy vuosisatojen venetsialaisvalta: kellotornit, holvikäytävät ja italialaisvaikutteinen musiikki. Isoisän käydessä 1873 saaret olivat olleet osa Kreikkaa vasta yhdeksän vuotta – Britannia oli hallinnut niitä protektoraattina 1815–1864 ja luovuttanut ne lahjaksi Kreikan uudelle kuninkaalle Yrjö I:lle. Brittien perintönä Korfun keskusaukiolla Spianadalla pelataan yhä krikettiä, jota muualla Kreikassa tuskin tunnetaan. Kefalonian vanhoista kaupungeista taas ei ole paljon jäljellä, sillä vuoden 1953 maanjäristys tuhosi lähes kaiken.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ionioi-nisoi-e9284910.jpg',
          lahde: 'Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Martin Falbisoner',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Old_Fortress_and_the_Old_Town_of_Corfu_-_September_2017.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ionioi-nisoi-e9284910.jpg',
    },
    'Notio Aigaio': {
      lyhyt: 'Etelä-Egean saariin kuuluvat sekä Santorinin tulivuorikaldera että Rodoksen keskiaikainen ritarilinnoitus.',
      pitka: 'Etelä-Egeaan kuuluu kaksi saariryhmää, joiden historia on aivan erilainen: Kykladit, valkoisten kylien ja tuulimyllyjen saaret, sekä idempänä Turkin rannikon tuntumassa Dodekanesia. Kun isoisä matkusti 1873, Kykladit olivat jo Kreikkaa, ja Syroksen Ermoupoli oli koko maan vilkkain satama- ja telakkakaupunki, kunnes Pireus ohitti sen 1800-luvun lopulla. Santorinin kalderassa Nea Kamenin tulivuori oli juuri purkautunut 1866–1870, joten sen laava oli isoisän aikaan vielä tuoretta. Rodos ja muut Dodekanesian saaret taas kuuluivat osmaneille vuoteen 1912, sitten Italialle, ja liitettiin Kreikkaan vasta vuoden 1947 rauhansopimuksen jälkeen.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-notio-aigaio-e7a57c69.jpg',
          lahde: 'Yanko Malinov, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Yanko Malinov',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Santorini_caldera_panorama_from_Skaros.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-notio-aigaio-e7a57c69.jpg',
    },
    'Voreio Aigaio': {
      lyhyt: 'Lesboksen saaren kivettynyt metsä on 17–20 miljoonaa vuotta vanha, ja saari tunnetaan yhä anisviina ouzon tislauksesta.',
      pitka: 'Pohjois-Egean saaret – Lesbos, Khios, Samos, Ikaria ja Limnos – ovat lähempänä Turkin rannikkoa kuin Ateenaa, ja kirkkaalla säällä niiden satamista näkyvät Anatolian vuoret. Vuonna 1873 saaret eivät kuuluneet Kreikkaan: Lesbos ja Khios olivat osmanien saaria, ja Samos oli erikoinen ruhtinaskunta, jolla oli oma lippu ja sulttaanin nimittämä kristitty ruhtinas ja joka maksoi Konstantinopoliin vuotuista veroa. Saaret liittyivät Kreikkaan Balkanin sodan aikana 1912–1913. Lesboksella syntynyt kansanmaalari Theofilos kiersi myöhemmin saaren kyliä ja maalasi kahviloiden ja kauppojen seiniä usein pelkkää ruokaa vastaan.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-voreio-aigaio-e6e2026d.jpg',
          lahde: 'Tomisti, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Tomisti',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Petrified_forest_of_Lesbos_12.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-voreio-aigaio-e6e2026d.jpg',
    },
    'Ayion Oros': {
      lyhyt: 'Athosvuoren munkkitasavaltaan pääsee vain erityisluvalla, eivätkä naiset saa astua sen maaperälle lainkaan.',
      pitka: 'Athoksen niemimaa on metsäinen, jyrkkä vuorenharjanne, jonka rannoilla ja rinteillä on 20 luostaria sekä lukuisia pienempiä munkkiyhteisöjä ja erakkomajoja. Munkkitasavallan juuret ovat vuodessa 963, jolloin Athanasios perusti Suuren Lavran luostarin Bysantin keisarin tuella, ja itsehallinto on säilynyt kaikkien valtojen alla. Vuonna 1873 niemimaa kuului muodollisesti Osmanivaltakuntaan, mutta munkit hallitsivat itse itseään kuten nykyäänkin; Kreikan hallintaan Athos siirtyi Balkanin sodassa 1912. Isoisän aikaan vuorelle virtasi munkkeja erityisesti Venäjältä, ja Pyhän Panteleimonin luostarissa asui 1900-luvun alussa jo lähes 1500 venäläistä munkkia.',
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ayion-oros-f8e6edc2.jpg',
          lahde: 'Rosa-Maria Rinkl, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Rosa-Maria Rinkl',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Athos-Berggipfel.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/grc-maakunta-ayion-oros-f8e6edc2.jpg',
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
  /*
   * NLD PITKA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
   * yhteydessä). Lähteet (en-Wikipedia, tarkistettu 26.9.2026):
   *   Bonaire — Bonaire (Cargill-suolatehdas ~400 000 t/v, orjuuden
   *     lakkautus 1862, valtion plantaasimaan myynti 1868)
   *   Drenthe — Drenthe (nummimaa >70 %, drentin murre, pronssikauden
   *     tinahelmikorut)
   *   Zuid-Holland — South Holland (Westland-kasvihuoneet); Nieuwe
   *     Waterweg (kaivettu 1866–1872)
   *   Flevoland — Flevoland (väkiluku 177k→445k); Schokland
   *     (evakuoitu 1859)
   *   Friesland — Friesland (terpit, länsifriisi 54,3 %, siirtolaisuus
   *     Amerikkaan 1870-luvun lopulla)
   *   Gelderland — Gelderland (Veluwe/Betuwe/Achterhoek, Kröller-Müller)
   *   Groningen — Groningen (province) (wierden-kummut, kaasukenttä
   *     1959–2023)
   *   Limburg — Limburg (Netherlands) (Maastrichtin sopimus 1992,
   *     kaivosten sulku 1965–1975)
   *   Overijssel — Overijssel (Twenten puuvilliteollisuus, Hansaliiton
   *     kaupungit)
   *   Noord-Brabant — North Brabant (Philips→ASML/NXP, De Biesbosch)
   *   Noord-Holland — North Holland; North Sea Canal (kaivettu
   *     1865–1876, avattu isoisän matkan jälkeen)
   *   Saba — Saba (island) (Mount Scenery 870 m, "Saba lace")
   *   St. Eustatius — Sint Eustatius (The Quill, vapaasatama 1756,
   *     väestöromahdus 1781 jälkeen)
   *   Utrecht — Utrecht (province) (piispankunta 1024, Rietveld
   *     Schröder -talo)
   *   Zeeland — Zeeland (1953 tulva, Deltatyöt, Westerscheldetunnel 2003)
   *
   * NLD KUVA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
   * jatko GRC:n jälkeen): yksi aito Wikimedia Commons -valokuva per
   * alue, lisenssi tarkistettu Commonsin API:sta ennen latausta,
   * suurennettu enintään 1600 px:iin, viety ämpäriin
   * karttanostot/20260926/. Vain PD/CC0/CC BY/CC BY-SA; kuvista, joissa
   * olisi ollut tunnistettavia yksityishenkilöitä lähikuvassa
   * (alkuperäiset Elfstedentocht-, Giethoorn- ja Efteling-ehdokkaat),
   * valittiin korvaava kuva tai rajattiin ihmiset pois (Efteling,
   * cropBottomFrac 0.32). Lähteet:
   *   Bonaire — File:Pekelmeer_salt_pans_(Bonaire_2014)_(15507258257).jpg (Paul Arps, CC BY 2.0)
   *   Drenthe — File:Grootste_hunebed_van_Nederl.jpg (Gouwenaar, public domain)
   *   Zuid-Holland — File:Rotterdam_port_aerial.jpg (Andrzej Otrębski, CC BY-SA 4.0)
   *   Flevoland — File:Wind_park_A6_Flevoland_2.jpg (Steven Lek, CC BY-SA 4.0)
   *   Friesland — File:20190515 Fries landschap met koeien nabij Boazum.jpg (Gouwenaar, CC BY-SA 4.0)
   *   Gelderland — File:De_Hoge_Veluwe_landscape.jpg (Deb Collins, CC BY 2.0)
   *   Groningen — File:Groningen_Martinitoren_v3.jpg (Rudolphous, CC BY-SA 4.0)
   *   Limburg — File:Vaalserberg.jpg (Ahoerstemeier, CC BY-SA 3.0)
   *   Overijssel — File:Giethoorn_Canal_1.jpg (KarelJanda, CC BY-SA 4.0)
   *   Noord-Brabant — File:Efteling_Entrance.jpg (Stefan Scheer, CC BY 2.5; rajattu)
   *   Noord-Holland — File:Amsterdam_Grachten_2.jpg (Zairon, CC BY-SA 4.0)
   *   Saba — File:Juancho_E_Yrausquin_Airport.JPG (Md2b, CC BY-SA 3.0)
   *   St. Eustatius — File:Fort_Oranje_from_the_Slave_Path_-_panoramio.jpg (SV Zanshin, CC BY-SA 3.0)
   *   Utrecht — File:DomTorenUtrechtNederland.jpg (Massimo Catarinella, CC BY 3.0)
   *   Zeeland — File:Oosterscheldekering,_Netherlands.JPG (Donar Reiskoffer, CC BY 3.0)
   *
   * NLD PIKKUKUVA: NLD ei ollut Codexin kuvitetussa pikkukuva-tilauksessa
   * (löydös 115 kattaa vain FRA/ESP/ITA/GBR/DEU/POL/AUT), joten samoin
   * kuin GRC:llä, pikkukuva kierrättää yllä olevat kuva-osoitteet
   * väliaikaisena ratkaisuna (PR #3307:n skeema).
   */
  NLD: {
    Bonaire: {
      lyhyt: 'Bonairen Pekelmeerin suolajärvellä on flamingojen pesimärauhoitusalue, jonne ihmiset eivät saa astua lainkaan.',
      pitka: `Saaren eteläosaa hallitsevat yhä suola-altaat, joissa merivesi haihtuu auringossa vaaleanpunaisiksi lammikoiksi – juuri niistä flamingot saavat karotenoidivärinsä. Cargillin nykyinen suolatehdas tuottaa vuosittain noin 400 000 tonnia suolaa, ja valkoiset suolapyramidit kohoavat rannalla kymmenien metrien korkuisiksi kasoiksi. Isoisän matkan aikoihin saaren historia oli vasta kääntymässä: orjuus lakkautettiin Bonairella 1862, ja vuodesta 1868 valtion entistä plantaasimaata alettiin myydä yksityisille, mikä siirsi saaren painopistettä suolasta karjatalouteen. Kaduilla ja pensaikoissa harhailee yhä espanjalaisten 1500-luvulla tuomien aasien jälkeläisiä, jotka elävät nykyään puolivilleinä. Ihmisiä on saarella vain reilut 26 000, mutta luonnonsuojelu on tiukkaa: Pekelmeerin flamingoalueelle ei saa astua, ja koko ympäröivä meri on suojeltua riuttaa yli 350 kalalajille.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-bonaire-7f7e7423.jpg',
          lahde: 'Paul Arps, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Paul Arps',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pekelmeer_salt_pans_(Bonaire_2014)_(15507258257).jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-bonaire-7f7e7423.jpg',
    },
    Drenthe: {
      lyhyt: 'Drenthessä seisoo 53 Alankomaiden 54 dolmenista – kivipaadet kasattiin haudoiksi jo noin 3500 vuotta ennen ajanlaskun alkua.',
      pitka: `Toisin kuin suuri osa Alankomaista, Drenthe on lähes joki- ja järvetöntä nummi- ja suomaata, jossa laajat kanervakankaat ja Dwingelderveldin kaltaiset luonnonpuistot leviävät silmänkantamattomiin. Yli 70 prosenttia maakunnasta on yhä maataloutta tai metsää, ja hiljaisuus on tehnyt Drenthesta suositun pyöräilymaakunnan. Puolet asukkaista puhuu yhä drentin murretta, alasaksin sukuista kieltä, jota Alankomaiden valtio suojelee virallisesti. Dolmenien lisäksi maaperästä on kaivettu esiin pronssikautisia tinahelmikoruja, jotka kertovat, että tämä näennäisen syrjäinen seutu kuului jo tuhansia vuosia sitten laajaan kauppaverkostoon. Nykyään maakunnan pääkaupunki Assen on rauhallinen, mutta juuri se hiljaisuus – ei jokia, ei suuria järviä, vain taivas ja kanerva – tekee Drenthesta muusta maasta poikkeavan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-drenthe-2ae631b3.jpg',
          lahde: 'Gouwenaar, Wikimedia Commons (public domain)',
          tekija: 'Gouwenaar',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grootste_hunebed_van_Nederl.jpg',
          lisenssi: 'Public domain',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-drenthe-2ae631b3.jpg',
    },
    'Zuid-Holland': {
      lyhyt: 'Rotterdamin satama on Euroopan vilkkain, ja maakunnan pääkaupunki Haag on koko Alankomaiden hallituksen kotipaikka.',
      pitka: `Maakunnan rannikolla kohoaa maailman suurin yhtenäinen kasvihuonealue, Westland, jossa yli 2 500 lasitaloa tuottaa vihanneksia ja kukkia ympäri vuoden – lähes puolet koko Alankomaiden kasvihuonetuotannosta syntyy täällä. Rotterdamin satamaan pääsee nykyään suoraan avomereltä Nieuwe Waterweg -kanavaa pitkin, joka kaivettiin vuosina 1866–1872 pelastamaan tukkeutumassa ollut satama – juuri kun isoisän matkapäiväkirja alkoi täyttyä, uusi väylä oli vasta valmistunut ja mullisti koko Rotterdamin. Leiden ja Delft ovat säilyneet opiskelijakaupunkeina satojen vuosien takaa, ja täältä ovat kotoisin niin Rembrandt kuin mikroskoopin kehittäjä Antonie van Leeuwenhoek. Nykyään Haagissa istuu paitsi hallitus myös useita kansainvälisiä tuomioistuimia, mikä tekee muuten vaatimattoman näköisestä kaupungista maailmanpolitiikan näyttämön. Tiheimmin asutulla alueella asuu yli 1 400 ihmistä joka neliökilometrillä, mutta silti maakunnasta löytyy vielä tuulimyllyjen ja lehmälaitumien maisemia aivan kaupunkien liepeiltä.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-zuid-holland-14a57793.jpg',
          lahde: 'Andrzej Otrębski, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Andrzej Otrębski',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rotterdam_port_aerial.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-zuid-holland-14a57793.jpg',
    },
    Flevoland: {
      lyhyt: 'Flevoland on Alankomaiden nuorin maakunta, perustettu 1986, ja lähes koko sen maa kuivattiin entisestä merenpohjasta.',
      pitka: `Siellä missä nyt kasvaa vehnää ja seisoo tuulivoimaloita, aaltoili isoisän aikaan vielä avoin meri: Zuiderzeen pohjalta on kaivettu esiin satoja hylkyjä, jotka jäivät makaamaan mudan alle vuosisatojen ajaksi ennen kuin maa kuivattiin niiden ympäriltä. Entinen saari Schokland oli niin köyhä ja tulville altis, että kuningas käski vuonna 1859 sen viimeiset noin 430 asukasta muuttamaan pois – kun isoisä matkusti 1873, Schokland oli jo autio saari keskellä merta, vaikka se nykyään seisoo kuivalla maalla keskellä peltoja. Flevolandin eteläosaan syntyi 1980-luvulla vahingossa yksi maan tärkeimmistä luontoalueista, Oostvaardersplassen, kun tehdasalueeksi varattu suoalue täyttyikin itsestään linnuista ja villihevosista ennen rakentamisen alkua. Maakunnan suurin kaupunki Almere on rakennettu tyhjästä vasta 1970-luvulta lähtien, ja se on nykyään yksi Alankomaiden nopeimmin kasvaneista kaupungeista. Koko maakunnan asukasluku on yli kaksinkertaistunut vuodesta 1986, ja moni asukas tietää yhä tarkalleen, monennenko metrin syvyydessä hänen kotinsa alla lepää entinen merenpohja.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-flevoland-69c6bdb7.jpg',
          lahde: 'Steven Lek, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Steven Lek',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wind_park_A6_Flevoland_2.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-flevoland-69c6bdb7.jpg',
    },
    Friesland: {
      lyhyt: 'Lähes 200 kilometrin Elfstedentocht-luistelu ajetaan vain, kun luonnonjää kestää koko reitillä – viimeksi niin kävi 1997.',
      pitka: `Ennen patoja ja pumppuja friisit rakensivat kotinsa keinotekoisille kummuille, terpeille, jotka nousivat tulvien yläpuolelle jo rautakaudella – monen nykyisen kylän keskusta seisoo yhä tällaisen ikivanhan asuinkummun päällä. Maakunnassa puhutaan edelleen omaa kieltä, länsifriisiä, jota äidinkielenään puhuu yli puolet asukkaista, vaikka sitä osaa kirjoittaa sujuvasti vain harva. Friisiläinen hevonen ja mustavalkoinen friisiläiskarja ovat maailmankuuluja maakunnan omia rotuja, ja vihreillä laitumilla niitä näkee yhä runsaasti. 1870-luvun lopulla alkanut maatalouden lama ajoi vuosikymmenen sisällä kymmeniä tuhansia friisejä siirtolaisiksi Amerikkaan – isoisän matkan jälkeinen aika oli monelle maakunnan asukkaalle käännekohta, josta ei ollut paluuta vanhaan elämään. Nykyään maakunnan tuhannet järvet ja kanavat täyttyvät kesäisin purjeveneistä, ja jäätymisen sattuessa koko maa pysähtyy odottamaan, uskaltaako joku vihdoin luvata Elfstedentochtin ajettavaksi.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-friesland-58839f0f.jpg',
          lahde: 'Gouwenaar, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Gouwenaar',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20190515 Fries landschap met koeien nabij Boazum.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-friesland-58839f0f.jpg',
    },
    Gelderland: {
      lyhyt: 'Hoge Veluwen kansallispuistossa ajellaan ilmaisilla puistopyörillä, ja metsän keskellä odottaa Kröller-Müller-museon Van Gogh -kokoelma.',
      pitka: `Maakunta jakautuu selvästi neljään erilaiseen maisemaan: pohjoisessa mäntymetsäinen Veluwe, lounaassa hedelmätarhojen Betuwe, idässä maalaismainen Achterhoek ja lopuksi Arnhemin ja Nijmegenin kaupunkiseutu. Betuwen omenatarhat kukkivat keväisin niin laajalti vaaleanpunaisina, että alueelle on oma kukkimisreittinsä, ja hedelmänviljely on jatkunut siellä jokivarsien hedelmällisen saven ansiosta vuosisatoja. Nijmegen on Alankomaiden vanhin kaupunki, ja sen roomalaisajan perintö näkyy yhä maan alta löytyvissä kaivauksissa. Hoge Veluwen kansallispuiston keskellä seisova Kröller-Müller-museo kätkee sisäänsä yhden maailman suurimmista Van Gogh -kokoelmista – rikas pariskunta rakensi sen yksityisestä taidekokoelmastaan 1900-luvun alussa keskelle metsää, kaukana kaupungeista. Maakunnassa on yli 5 000 kilometriä pyöräteitä, joten hiekkadyynien ja metsien halki pääsee kulkemaan lähes minne vain kahden pyörän varassa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-gelderland-0110f35a.jpg',
          lahde: 'Deb Collins, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Deb Collins',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:De_Hoge_Veluwe_landscape.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-gelderland-0110f35a.jpg',
    },
    Groningen: {
      lyhyt: 'Groningenin kaasukenttä oli maailman suurimpia, mutta sen aiheuttamat maanjäristykset saivat valtion lopettamaan tuotannon 2023.',
      pitka: `Maakunta on niin tasainen, että sen korkein kohta, Hasseberg Sellingenin lähellä, kohoaa vain reilut 14 metriä merenpinnan yläpuolelle – silti suuri osa Groningenista on itse asiassa merenpinnan alapuolella ja vaatii jatkuvaa pumppausta. Ennen patoja asukkaat rakensivat kylänsä keinotekoisille asuinkummuille, wierdenille, jotka pistivät esiin tulvatasangosta kuin pieniä saaria – monet niistä ovat säilyneet ja näkyvät yhä maaseudulla pyöreinä kyläraitteina. Groningenin yliopisto perustettiin jo 1614, ja kaupunki on säilynyt opiskelijakaupunkina niin, että lähes joka kolmas keskustan asukas on opiskelija. Maan alla lymyillyt valtava maakaasuesiintymä, joka löydettiin Slochterenin lähellä 1959, teki Alankomaista vuosikymmeniksi energiaomavaraisen, mutta kaasunoton aiheuttamat maanjäristykset pakottivat lopulta lopettamaan tuotannon 2023. Nykyään maakunnassa puhutaan yhä omaa murretta, groningeria, ja perinneruokia kuten kaalimuusia tarjoillaan edelleen monessa kodissa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-groningen-f5032554.jpg',
          lahde: 'Rudolphous, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Rudolphous',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Groningen_Martinitoren_v3.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-groningen-f5032554.jpg',
    },
    Limburg: {
      lyhyt: 'Vaalserberg kohoaa 322 metriin, Manner-Alankomaiden korkeimmaksi kohdaksi, ja sen laella kohtaavat Alankomaat, Belgia ja Saksa.',
      pitka: `Toisin kuin suuressa osassa Alankomaita, Limburgin eteläosassa maasto kumpuilee oikeasti – liuskekivikukkulat ja syvät jokilaaksot tekevät maisemasta lähes keskieurooppalaisen, ja moni hollantilainen tulee tänne nimenomaan mäkien vuoksi. Maakunnan halki virtaava Maas-joki on muovannut aluetta vuosituhansien ajan ja yhdistää sen edelleen Belgiaan ja Ranskaan asti. Maastricht on maakunnan pääkaupunki ja yksi maan vanhimmista kaupungeista, ja siellä allekirjoitettiin 1992 Euroopan unionin perustanut Maastrichtin sopimus. 1960- ja 1970-luvuilla suljetut hiilikaivokset veivät alueelta yli 60 000 työpaikkaa, ja valtio yritti paikata iskua siirtämällä muun muassa tilastokeskuksen toimintoja seudulle – kaivosten jäljet näkyvät yhä maisemassa mustina kekoina ja tyhjinä torneina. Alueella puhutaan limburgia, jota äidinkielenään käyttää yli 1,6 miljoonaa ihmistä sekä Alankomaissa että rajan takana Belgiassa ja Saksassa, ja lähes jokaisella kylällä on oma murteensa sävy.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-limburg-dffffab5.jpg',
          lahde: 'Ahoerstemeier, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Ahoerstemeier',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vaalserberg.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-limburg-dffffab5.jpg',
    },
    Overijssel: {
      lyhyt: 'Giethoornin vanhassa kylässä ei ollut teitä lainkaan, vaan kaikki kulki veneillä kanavia pitkin – siltoja on 176.',
      pitka: `Maakunnan itäosassa, Twentessä, savupiiput ja tehdashallit kertovat 1800-luvun teollisesta noususta: puuvillan kehruusta, kutomisesta ja valkaisusta tuli alueen elinkeino, ja jo isoisän matkan aikoihin Twenten tehtaat jyskyttivät täydellä teholla koko Alankomaiden puuvillateollisuuden ytimenä. Zwolle, Deventer ja Kampen olivat keskiajalla vauraita Hansaliiton kauppakaupunkeja, ja niiden vanhat kauppahuoneet ja kaupunginmuurit ovat säilyneet yllättävän hyvin joenvarsimaisemassa. Maaston vaihtelu on suurta: kaakossa on hiekkamaata pieninä jokilaaksoineen, luoteessa taas savitasankoa ja entisiä soita, ja korkeimman kohdan, Tankenbergin, ja alimman kohdan välillä on eroa vain reilut 85 metriä. Staphorstin kylä on säilyttänyt tiukan kalvinistisen elämäntapansa niin, että perinteiset kansallispuvut näkyvät kadulla yhä arkipäivänä, ei vain juhlissa. Giethoornin läheisyydessä koko maakunnan vesistö kertoo samasta asiasta kuin kanavakylä itsekin: täällä ihminen on aina rakentanut elämänsä veden ehdoilla, ei sen vastapainoksi.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-overijssel-06897eee.jpg',
          lahde: 'KarelJanda, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'KarelJanda',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Giethoorn_Canal_1.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-overijssel-06897eee.jpg',
    },
    'Noord-Brabant': {
      lyhyt: 'Kaatsheuvelin Efteling avattiin 1952 satumetsänä, ja nyt se on Alankomaiden suurin huvipuisto ja yksi maailman vanhimmista.',
      pitka: `Maakunnan suurin kaupunki Eindhoven oli 1800-luvulla vielä vaatimaton pikkukaupunki, kunnes Philipsin lamppu- ja myöhemmin elektroniikkatehtaat muuttivat sen 1900-luvulla teknologiakeskukseksi – nykyään alueella toimivat muun muassa ASML, maailman johtava piirilevyjen valmistuslaitteiden valmistaja, ja puolijohdeyhtiö NXP. Katolinen perintö näkyy yhä joka helmikuu, kun karnevaali valtaa kadut ja moni kaupunki vaihtaa väliaikaisesti nimeäkin karnevaalihenkiseksi. Brabantilainen keittiö tunnetaan mehevänä ja runsaana, "burgundialaisena", saksalais-ranskalaisten vaikutteiden ja rikkaiden leivonnaisten sekoituksena – tämä poikkeaa selvästi pohjoisemman Alankomaiden pelkistetystä ruokakulttuurista. De Biesbosch on Länsi-Euroopan suurimpia makeanveden tulva-alueita, yli 7 000 hehtaaria kanavia, ruovikkoa ja pientä saaristoa, joka syntyi keskiajan suurtulvien seurauksena. Maakunta on maan tasaisimpia, mutta poikkeuksellisesti lähes koko sen pinta-ala on merenpinnan yläpuolella, mikä erottaa sen monista muista alavista naapureistaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-noord-brabant-a02068cb.jpg',
          lahde: 'Stefan Scheer, Wikimedia Commons (CC BY 2.5)',
          tekija: 'Stefan Scheer',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Efteling_Entrance.jpg',
          lisenssi: 'CC BY 2.5',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-noord-brabant-a02068cb.jpg',
    },
    'Noord-Holland': {
      lyhyt: 'Amsterdam on Alankomaiden pääkaupunki ja suurin kaupunki, ja sen kupeessa Schiphol on Euroopan kolmanneksi vilkkain lentoasema.',
      pitka: `Amsterdamin satama oli 1800-luvun puolivälissä vaarassa kuivua kokoon, kun luonnolliset väylät tukkeutuivat hiekasta – ratkaisuksi ryhdyttiin kaivamaan Noordzeekanaalia IJmuideniin asti, ja työ oli parhaillaan käynnissä juuri isoisän matkan aikoihin 1873: kanava oli alkanut 1865 ja valmistui vasta 1876, jolloin kuningas itse avasi sen juhlallisesti. Vain vähän ennen sitä, 1855, oli kuivattu valtava Haarlemmermeer-järvi pelloksi, ja nykyään sen pohjalla lentää Schiphol, Euroopan kolmanneksi vilkkain lentokenttä. Rannikolla jatkuu Länsi-Friisian saarten ketju, joista Texel on suurin, ja niiden hiekkarannat ja dyynit ovat säilyneet lähes koskemattomina lintujen levähdyspaikkoina. Amsterdamissa asuu nykyään lähes 900 000 ihmistä, mutta koko maakunnasta yli puolet on edelleen alavaa polderimaata, joka on aikoinaan kuivattu tuulimyllyillä ja nykyään pidetään kuivana sähköpumpuilla. Kaupungin talousvaikutus ulottuu kauas: alueella toimivat niin Heineken, KLM kuin Greenpeacen kansainvälinen päämajakin.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-noord-holland-95453e36.jpg',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Zairon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amsterdam_Grachten_2.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-noord-holland-95453e36.jpg',
    },
    Saba: {
      lyhyt: 'Saban lentokentän kiitorata on vain 400 metriä, maailman lyhyin reittiliikenteessä, ja sen molemmissa päissä jyrkänne putoaa mereen.',
      pitka: `Saaren keskellä kohoaa sammunut tulivuori Mount Scenery, 870 metriä korkea – se on koko Alankomaiden kuningaskunnan korkein kohta, korkeampi kuin mikään paikka Euroopan puoleisessa Alankomaissa. 1800-luvun lopulla, siis pian isoisän matkan jälkeen, saaren naiset alkoivat tehdä "Saban pitsiä", venezuelalaisen nunnan tänne tuomaa neulontatekniikkaa, josta tuli tärkeä tulonlähde ja josta saari sai liikanimen "naisten saari" – suurin osa miehistä oli näet töissä merillä. Pääkylä The Bottom on yhä tavoitettavissa 800 kivestä hakatun portaan kautta, "Tikkaita" pitkin, joita pitkin ennen kannettiin kaikki tavara satamasta ylös. Rantojen edustalla sukeltajat löytävät vedenalaisia tulivuoritorneja, joissa magma on aikoinaan työntynyt merenpohjan läpi, ja alueen suojellut vedet ovat kotia noin 150 kalalajille. Saarella asuu vain runsaat 2 000 ihmistä, mikä tekee siitä väkiluvultaan pienimmän pysyvästi asutun alueen koko Amerikan mantereella.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-saba-235cbd4e.jpg',
          lahde: 'Md2b, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Md2b',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Juancho_E_Yrausquin_Airport.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-saba-235cbd4e.jpg',
    },
    'St. Eustatius': {
      lyhyt: 'Fort Oranjen tykit vastasivat 1776 amerikkalaisprikin tervehdykseen – varhainen kansainvälinen tunnustus kapinallisten lipulle.',
      pitka: `Saaren eteläosaa hallitsee sammunut tulivuori De Quill, 602 metriä korkea, jonka nimi juontuu hollannin sanasta "kuil", kuoppa – kraatterin sisällä kasvaa nykyään sademetsä, joka poikkeaa täysin muusta kuivasta saaresta. 1700-luvun puolivälissä saaresta tuli vapaasatama, jonka kautta kulki niin kauppatavaraa kuin orjakauppaa valtavassa mitassa – brittiläinen valtiomies Edmund Burke kutsui sitä "koko maailman kauppapaikaksi", ja parhaimmillaan saarella toimi yli 70 plantaasia. Isoisän matkan aikoihin 1873 tuo kulta-aika oli jo kaukainen muisto: britit olivat ryöstäneet saaren 1781, ja kauppa siirtyi vähitellen Curaçaolle ja Sint Maartenille, minkä seurauksena väkiluku romahti yli 8 000 asukkaasta muutamaan sataan 1900-luvun puoliväliin mennessä. Fort Oranjen muurien sisällä seisoo yhä tykkejä, jotka muistuttavat siitä hetkestä, jolloin saari tunnusti ensimmäisenä ulkomaisena alueena Yhdysvaltain lipun. Nykyään saarella on hiljaista, ja juuri se hiljaisuus – kadut ilman vilskettä, satama ilman laivoja – kertoo parhaiten siitä, miten paljon saari on menettänyt entisestä vauraudestaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-st-eustatius-f21920fe.jpg',
          lahde: 'SV Zanshin, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'SV Zanshin',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Oranje_from_the_Slave_Path_-_panoramio.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-st-eustatius-f21920fe.jpg',
    },
    Utrecht: {
      lyhyt: 'Utrechtin Dom-tornin 465 askelmaa vievät 112 metrin korkeuteen – se on Alankomaiden korkein kirkontorni.',
      pitka: `Utrecht on pinta-alaltaan Alankomaiden toiseksi pienin maakunta, mutta maasto vaihtelee yllättävän paljon: idässä kohoaa jääkauden muovaama Utrechtse Heuvelrug -harjanne mäntymetsineen, etelässä on jokivarsimaisemaa ja lännessä laajoja niittyjä. Kaupunki oli keskiajalla piispankunnan keskus – piispat saivat 1024 Pyhän saksalais-roomalaisen keisarikunnan ruhtinaan arvon, ja tuosta vallasta muistuttavat yhä kaupungin lukuisat kirkot ja luostarit. Utrecht Centraal on nykyään Alankomaiden vilkkain rautatieasema, josta junat lähtevät joka suuntaan muutaman minuutin välein. Kaupungin laidalla seisoo Rietveldin Schröder-talo, 1920-luvulla rakennettu, väreiltään ja muodoiltaan radikaalin pelkistetty talo, joka on säilynyt lähes muuttumattomana ja on nykyään Unescon maailmanperintökohde. Maakunnan pohjoisosassa entiset turvesuot ovat muuttuneet virkistysjärviksi, joilla kaupunkilaiset viettävät kesäpäivänsä aivan Dom-tornin kupeessa syntyneen historian keskellä.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-utrecht-a1cee564.jpg',
          lahde: 'Massimo Catarinella, Wikimedia Commons (CC BY 3.0)',
          tekija: 'Massimo Catarinella',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:DomTorenUtrechtNederland.jpg',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-utrecht-a1cee564.jpg',
    },
    Zeeland: {
      lyhyt: 'Zeelandin nimi tarkoittaa merimaata, ja vuoden 1953 tuhotulvan jälkeen sen saaria suojaavat Deltatyöt, jättimäiset padot ja sulut.',
      pitka: `Zeeland on käytännössä saarten ja niemien mosaiikki siinä kohtaa, jossa Rein, Maas ja Schelde-joet laskevat yhdessä mereen – vettä on maakunnan pinta-alasta yli kolmasosa, tarkemmin sanottuna reilut 1 150 neliökilometriä yli 2 900:sta. Simpukoiden ja osterien viljely on ollut rannikkoseudun elinkeino vuosisatoja, ja Zeelannin simpukat tunnetaan Alankomaissa herkkuna edelleen. Vuoden 1953 tulva tappoi alueella yli 1 800 ihmistä yhden ainoan yön aikana, kun myrskyvuoksi mursi useita patoja kerralla – katastrofi käynnisti jättimäisen Deltatöiden rakennusohjelman, joka muutti koko maakunnan rantaviivan padoiksi, silloiksi ja tunneleiksi. Vasta 2003 valmistunut Westerscheldetunnel yhdisti vihdoin joen molemmat rannat ilman lauttaa, päättäen vuosisataisen lauttariippuvuuden. Kesäisin monen rannikkokunnan väkiluku moninkertaistuu turistien myötä, vaikka Zeeland on muuten Alankomaiden harvimmin asuttu maakunta vain noin 391 000 asukkaallaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-zeeland-ee570a9e.jpg',
          lahde: 'Donar Reiskoffer, Wikimedia Commons (CC BY 3.0)',
          tekija: 'Donar Reiskoffer',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oosterscheldekering,_Netherlands.JPG',
          lisenssi: 'CC BY 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/nld-maakunta-zeeland-ee570a9e.jpg',
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
  /*
   * BEL PITKA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
   * yhteydessä). Lähteet (en-Wikipedia, tarkistettu 26.9.2026):
   *   Antwerp — Antwerp Province / 1863 in Belgium (Schelden
   *     tullimaksun poisto 1863); Antwerp diamond district
   *   Brussels — Brussels' Comic Book Route; Belgian Comic Strip
   *     Center (Victor Horta); Demographics of Brussels
   *   Flemish Brabant — Flemish Brabant; Catholic University of
   *     Leuven (perustettu 1425)
   *   Hainaut — Borinage; Hainaut Province (Grand-Hornu); Vincent van
   *     Gogh (Borinage 1878–1880); Mons 2015
   *   East Flanders — Ghent; Kouter-kukkatori 1772; Ghent Floralies
   *     1809; Aalst Carnival
   *   Liege — Liège Province; Eupen-Malmedy (osa Saksaa vuoteen 1920);
   *     Val-Saint-Lambert 1826
   *   Limburg — Tongeren (Atuatuca Tungrorum, Ambiorix 54 eaa.);
   *     South Limburg coal mining basin; Hesbaye (Haspengouw)
   *   Luxembourg — Battle of the Bulge; Bouillon Castle / Godfrey of
   *     Bouillon
   *   West Flanders — Royal Galleries of Ostend; Bruges; Battle of
   *     Flanders Fields
   *   Namur — Citadel of Namur; Rocher Bayard; Adolphe Sax
   *     -elämäkertatiedot
   *   Walloon Brabant — Villers Abbey 1146; Catholic University of
   *     Leuven -jako 1968; GSK Belgia (Wavre)
   *
   * BEL KUVA + PIKKUKUVA (Sisältökirjuri 26.9.2026, löydös 158:n jatko
   * NLD:n jälkeen): sama kaava — Commons-kuva lisenssi tarkistettu
   * API:sta, ämpäri karttanostot/20260926/, pikkukuva kierrättää saman
   * osoitteen (BEL ei ole Codexin pikkukuva-tilauksessa). Lähteet:
   *   Antwerp — File:View_of_Antwerp_Cathedral_from_the_Groenplaats.jpg (Rolf Kranz, CC BY-SA 4.0)
   *   Brussels — File:Grand-Place, Brussels - panorama, June 2018.jpg (Celuici, CC BY-SA 4.0)
   *   Flemish Brabant — File:Historic_Leuven_Town_Hall.jpg (Thaler Tamas, CC BY-SA 4.0)
   *   Hainaut — File:Tournai_pan.jpg (Jean-Pol Grandmont, CC BY 2.5)
   *   East Flanders — File:Ghent_3towers.jpg (William Helsen, CC BY 2.0)
   *   Liege — File:Liège skyline early morning.jpg (Dominic Nelson, CC BY-SA 4.0)
   *   Limburg — File:Tongeren_Moerenpoort_2.JPG (Torsade de Pointes, CC0 1.0)
   *   Luxembourg — File:Bouillon_Castle_03.jpg (Ad Meskens, CC BY-SA 4.0)
   *   West Flanders — File:Rozenhoedkaai (canal) and Belfry of Bruges,
   *     Bruges, Belgium (Ank Kumar, Infosys Limited) 07.jpg (Ank Kumar, CC BY-SA 4.0)
   *   Namur — File:Dinant_reflected.jpg (Jiuguang Wang, CC BY-SA 2.0)
   *   Walloon Brabant — File:Butte_du_Lion_de_Waterloo.jpg (Glaurent, CC BY-SA 3.0)
   */
  BEL: {
    Antwerp: {
      lyhyt: 'Antwerpenin satama on Euroopan toiseksi suurin, ja provinssi on koko Belgian väkirikkain – täällä asuu yli 1,9 miljoonaa ihmistä.',
      pitka: `Antwerpenin sydämenlyönti kuuluu satamasta, joka on Euroopan toiseksi vilkkain – ja sen nousu käynnistyi kunnolla vuonna 1863, kun Alankomaat luopui vuosisatoja periytyneestä Schelden tullimaksusta juuri isoisän matkan kynnyksellä, ja satama pääsi vihdoin laajenemaan vapaana merelle. Kaduilla kuulee tänään kymmeniä kieliä, sillä satama ja timanttikauppa ovat vetäneet kaupunkiin väkeä joka puolelta maailmaa. Rautatieaseman kupeessa sijaitseva timanttikortteli näyttää ulkoa vaatimattomalta toimistokorttelilta, mutta sen harmaiden ovien takana käsitellään edelleen valtaosa maailman raakatimanteista. Provinssin yli 1,9 miljoonaa asukasta tekevät siitä Belgian väkirikkaimman, mutta arki tuntuu silti yllättävän rauhalliselta vanhojen kanaalien ja kauppahuoneiden katveessa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-antwerp-0c3c6b28.jpg',
          lahde: 'Rolf Kranz, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Rolf Kranz',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Antwerp_Cathedral_from_the_Groenplaats.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-antwerp-0c3c6b28.jpg',
    },
    Brussels: {
      lyhyt: 'Brysselissä istuvat EU:n tärkeimmät toimielimet ja Naton päämaja, mutta kaupunkia kutsutaan myös sarjakuvan pääkaupungiksi.',
      pitka: `Brysselissä EU:n virkamiehet ja sarjakuvasankarit elävät kirjaimellisesti samoilla kaduilla: kaupungin sarjakuvareitillä on jo yli 50 seinämaalausta, joissa vilahtavat Tintti, Lucky Luke ja Smurffit. Belgian sarjakuvakeskus toimii entisessä tekstiilitukkuliikkeessä, jonka suunnitteli art nouveau -arkkitehti Victor Horta – rakennus itsessään on yhtä katsomisen arvoinen kuin sen kokoelmat. Lähes 40 prosenttia kaupungin asukkaista on muita kuin Belgian kansalaisia, ja kansainvälisyyden näkee ja maistaa parhaiten Matongen kongolaiskorttelissa tai Marollesin kirpputorilla. Isoisän aikaan Bryssel oli vasta kasvava pääkaupunki ilman EU:ta ja sarjakuvamuseoita, mutta samat mutkittelevat kujat kiertävät yhä Grand Placen ympärillä.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-brussels-e793d6ae.jpg',
          lahde: 'Celuici, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Celuici',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grand-Place, Brussels - panorama, June 2018.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-brussels-e793d6ae.jpg',
    },
    'Flemish Brabant': {
      lyhyt: 'Flanderin Brabant kiertää renkaana Brysselin ympäri, ja Belgian päälentoasema sijaitsee sen puolella eikä pääkaupungissa.',
      pitka: `Flanderin Brabant on hallinnollisesti nuori provinssi, syntynyt vasta 1995, kun vanha Brabantin maakunta jaettiin kolmeen osaan – mutta sen pääkaupunki Leuven on kaikkea muuta kuin nuori. Leuvenin katolinen yliopisto perustettiin jo vuonna 1425, ja se on vanhin yhä toimiva katolinen yliopisto maailmassa, mikä näkyy kaupungin nuorekkaassa, opiskelijavaltaisessa tunnelmassa. Provinssin 65 kuntaa jakautuvat kahteen hallintoalueeseen, Leuveniin ja Halle-Vilvoordeen, ja juuri Halle-Vilvoordessa, aivan Brysselin liepeillä, kieliraja on erityisen herkkä puheenaihe, sillä osassa kuntia asuu paljon ranskankielisiä flaamilaisella alueella. Leuvenista pääsee Brysselin kansainväliselle lentokentälle junalla vain noin varttitunnissa, mikä kertoo, miten tiiviisti tämä rengasmainen provinssi kietoutuu pääkaupungin ympärille.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-flemish-brabant-b7391d14.jpg',
          lahde: 'Thaler Tamas, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Thaler Tamas',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Historic_Leuven_Town_Hall.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-flemish-brabant-b7391d14.jpg',
    },
    Hainaut: {
      lyhyt: 'Scheldejoen varren Tournai on Belgian vanhimpia kaupunkeja – se oli aikanaan frankkien valtakunnan ensimmäinen pääkaupunki.',
      pitka: `Hainaut'n maisemaa hallitsee yhä hiilikaivosten perintö: Borinagen alue on saanut nimensä murresanasta, joka tarkoittaa kaivoskuilua, ja seudun Grand-Hornun kaivosyhtiö oli 1800-luvulla yksi vastikään itsenäistyneen Belgian suurimmista. Vain muutama vuosi isoisän matkan jälkeen, vuosina 1878–1880, nuori hollantilaistaiteilija Vincent van Gogh asui täällä protestanttisena saarnaajana kaivostyöläisten keskuudessa ja jakoi heidän köyhyytensä niin tosissaan, että häntä alettiin kutsua "hiilikaivoksen Kristukseksi". Charleroi kasvoi teollistumisen myötä provinssin suurimmaksi kaupungiksi, vaikka hallinnollinen pääkaupunki on pienempi Mons, joka toimi Euroopan kulttuuripääkaupunkina vuonna 2015. Nykyään moni entinen kaivosalue on suojeltua Unescon maailmanperintöä, ja rivitalokortteleiden välissä elää yhä sitkeä kaivosseudun yhteisöllisyys, vaikka viimeinen kaivos suljettiin jo vuosikymmeniä sitten.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-hainaut-129e8bc8.jpg',
          lahde: 'Jean-Pol Grandmont, Wikimedia Commons (CC BY 2.5)',
          tekija: 'Jean-Pol Grandmont',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tournai_pan.jpg',
          lisenssi: 'CC BY 2.5',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-hainaut-129e8bc8.jpg',
    },
    'East Flanders': {
      lyhyt: 'Gent sijaitsee Schelde- ja Leiejoen yhtymäkohdassa, ja sen vanhoja katuja täyttävät nykyään Gentin yliopiston opiskelijat.',
      pitka: `Illaisin Gentin vanhat kivikadut täyttyvät enemmän opiskelijoista kuin turisteista – kaupungissa opiskelee yli 65 000 nuorta, mikä tekee tunnelmasta yllättävän nuorekkaan keskiaikaisten kirkontornien katveessa. Kouterin aukion kukkatori on toiminut vuodesta 1772 lähtien, joten se oli auki jo isoisän matkan aikaan ja on edelleen viikonloppuisin gentiläisten suosituin kohtaamispaikka. Joka neljäs vuosi järjestettävät Gentin Floraliat juontavat juurensa vaatimattomasta vuoden 1809 näyttelystä, ja tapahtuma on nykyään merkitty Flanderin aineettomaksi kulttuuriperinnöksi. Naapurikaupunki Aalstissa taas vietetään Belgian suurinta karnevaalia, jonka huipentumana miehet pukeutuvat naisiksi "Voil Jeanetten" -kulkueessa laskiaistiistaina – perinne, joka hämmästyttää monia ensikertaa paikalla olevia.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-east-flanders-7d0ca0df.jpg',
          lahde: 'William Helsen, Wikimedia Commons (CC BY 2.0)',
          tekija: 'William Helsen',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ghent_3towers.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-east-flanders-7d0ca0df.jpg',
    },
    Liege: {
      lyhyt: 'Liège on Belgian ainoa provinssi, joka rajautuu kolmeen maahan, ja sen itälaidalla Eupenin ja Malmedyn seudulla puhutaan saksaa.',
      pitka: `Liègen itäisin kolkka on kielellinen erikoisuus vielä nykyäänkin: Eupenin ja Malmedyn seudulla puhutaan saksaa, sillä alue kuului Preussille ja Saksan keisarikunnalle aina vuoteen 1920 asti – isoisän matkustaessa seudun läpi vuonna 1873 se oli siis vielä osa Saksaa, ei Belgiaa. Liège itse on Vallonian viimeinen kaupunki, jossa terästeollisuus edelleen toimii, vaikka suuri osa 1800-luvun tehtaista on jo hävinnyt maisemasta. Val-Saint-Lambertin lasitehdas on valmistanut kristallia entisen sistersiläisluostarin mailla vuodesta 1826 lähtien, joten siellä hiottiin hienoa lasia jo isoisänkin matkan aikaan. Joen rannoilla ja mäkien rinteillä kaupunki tuntuu yhä vahvalta työläiskaupungilta, jossa ranska ja saksa sekoittuvat sekä puheessa että ruokapöydässä.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-liege-edaa7ac9.jpg',
          lahde: 'Dominic Nelson, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Dominic Nelson',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Liège skyline early morning.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-liege-edaa7ac9.jpg',
    },
    Limburg: {
      lyhyt: 'Limburgin Tongerenia pidetään Belgian vanhimpana kaupunkina – se on provinssin ainoa roomalaisten aikainen kaupunki.',
      pitka: `Tongeren on Belgian vanhin kaupunki: roomalaisaikoina se tunnettiin nimellä Atuatuca Tungrorum, ja sen ensimmäiselle vuosisadalle ajoittuvien kaupunginmuurien jäänteitä löytää yhä pelloilta keskustan laidalta. Kaupunki oli jo antiikin aikana kapinan näyttämö, kun paikallinen päällikkö Ambiorix nousi roomalaisia vastaan vuonna 54 eaa. Provinssin eteläosassa, hedelmällisessä Haspengouw'n alueella, kasvatetaan yli puolet koko Belgian hedelmäsadosta, ja keväällä omena- ja päärynätarhojen kukinta muuttaa maiseman valkoiseksi mereksi. Pohjoisempana Genkin seudulla taas hiiltä alettiin kaivaa vasta 1900-luvun alussa, vuosikymmeniä isoisän matkan jälkeen – kaivostoiminta tuli Limburgiin paljon myöhemmin kuin Vallonian teollisuusalueille – ja entiset kaivosyhdyskunnat muistuttavat yhä monikulttuurisesta menneisyydestään.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-limburg-339ed4e2.jpg',
          lahde: 'Torsade de Pointes, Wikimedia Commons (CC0 1.0)',
          tekija: 'Torsade de Pointes',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tongeren_Moerenpoort_2.JPG',
          lisenssi: 'CC0 1.0',
          lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-limburg-339ed4e2.jpg',
    },
    Luxembourg: {
      lyhyt: 'Luxembourg on Belgian suurin mutta harvimmin asuttu provinssi, ja noin 80 prosenttia siitä kuuluu Ardennien tiheisiin metsiin.',
      pitka: `Belgian suurin mutta väkiluvultaan pienin provinssi lepää suurelta osin Ardennien synkän metsän alla, ja viime vuosina alueelle on palannut jopa susia peurojen ja villisikojen rinnalle. Bouillonin linna kohoaa jyrkän mutkittelevan Semois-joen yllä; sen juuret ulottuvat 700-luvulle, ja se siirtyi aikanaan ensimmäiselle ristiretkelle lähteneelle Godefroy de Bouillonille, josta tuli myöhemmin Jerusalemin kuningaskunnan ensimmäinen hallitsija. Joulukuussa 1944 juuri tämä metsäinen seutu oli niin sanotun Ardennien offensiivin eli Bulgen taistelun sydäntä, ja monet kylät tuhoutuivat lähes kokonaan ennen kuin saksalaisjoukot vetäytyivät seuraavan tammikuun tienoilla. Nykyään sota näkyy lähinnä museoissa ja muistomerkeissä, ja rauhallisissa kylissä eletään pääosin matkailusta ja metsätaloudesta.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-luxembourg-d666e9ab.jpg',
          lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Ad Meskens',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bouillon_Castle_03.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-luxembourg-d666e9ab.jpg',
    },
    'West Flanders': {
      lyhyt: 'Rannikkoraitiovaunu kulkee koko rannikon Ranskan rajalta Alankomaiden rajalle – 67 kilometriä, maailman pisin laatuaan.',
      pitka: `West-Vlaanderen on Belgian ainoa rantaprovinssi, jonka hiekkarannat vaihettuvat idempänä nopeasti vihertäviksi pelloiksi ja tiilikattoisiksi kyliksi. Rannikon suosituin kaupunki on Ostende, josta kuningas Leopold II teki vuosikymmenten kuluessa isoisän matkan jälkeen Euroopan aateliston suosiman, muodikkaan kylpyläkaupungin – "rantojen kuningattaren". Brugesin keskiaikaiset kanavat ja mutkittelevat kujat ovat tuoneet kaupungille lisänimen "Pohjolan Venetsia", ja pitsinnypläystä harjoitetaan yhä käsityönä monen ikkunan ääressä. Provinssin eteläosassa Ieperin (Ypresin) ympäristö tunnetaan koko maailmassa ensimmäisen maailmansodan Flanders Fields -taistelukentistä, joissa satojatuhansia sotilaita kuoli vain reilut neljä vuosikymmentä isoisän vierailun jälkeen.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-west-flanders-4bd62d5f.jpg',
          lahde: 'Ank Kumar, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Ank Kumar',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rozenhoedkaai (canal) and Belfry of Bruges, Bruges, Belgium (Ank Kumar, Infosys Limited) 07.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-west-flanders-4bd62d5f.jpg',
    },
    Namur: {
      lyhyt: 'Dinantin jyrkän kallion laella seisoo linnoitus, ja kaupunki muistaa poikaansa Adolphe Saxia, joka patentoi saksofonin 1846.',
      pitka: `Namurin linnoitus kohoaa jyrkällä kalliolla juuri kohdassa, jossa Sambre-joki yhtyy Meuseen, ja koko kaupunki tuntuu rakentuneen tämän veden ja kallion vastakkainasettelun ympärille. Vähän etelämpänä Dinantissa tunnetaan nykyisen linnoituksen lisäksi outo kalliomuodostelma, Rocher Bayard: legendan mukaan Aymonin neljän pojan taruhevonen halkaisi kallion yhdellä kavion iskulla, vaikka todellisuudessa sen lohkaisivat Ludvig XIV:n sotilaat raivatakseen tietä joen varteen. Dinant on myös saksofonin keksijän Adolphe Saxin syntymäkaupunki, ja pojan lapsuus oli niin täynnä läheltä piti -tilanteita – putoamisia, myrkytyksiä, hukkumisvaaroja – että naapurit kutsuivat häntä "Dinantin aavelapseksi" eikä hänen äitinsä uskonut pojan elävän aikuiseksi. Meusen jyrkät kalkkikalliot houkuttelevat nykyään kiipeilijöitä ja melojia, ja joenrantakylät elävät edelleen matkailusta kalkkikivilouhosten katveessa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-namur-958776f4.jpg',
          lahde: 'Jiuguang Wang, Wikimedia Commons (CC BY-SA 2.0)',
          tekija: 'Jiuguang Wang',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dinant_reflected.jpg',
          lisenssi: 'CC BY-SA 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-namur-958776f4.jpg',
    },
    'Walloon Brabant': {
      lyhyt: 'Waterloon taistelu käytiin täällä kesäkuussa 1815, ja nykyään Vallonian Brabant on Belgian vaurain provinssi.',
      pitka: `Vallonian Brabant on hallinnollisesti nuori mutta monin paikoin ikivanha: Villers-la-Villen keskiaikainen sistersiläisluostari perustettiin jo vuonna 1146 ja hylättiin Ranskan vallankumouksen pyörteissä 1796, ja sen kivikylmät holvit sekä vanhan panimon rauniot ovat säilyneet yllättävän hyvin. Provinssin nuorin kaupunki taas on Louvain-la-Neuve, joka rakennettiin tyhjälle pellolle vuonna 1968, kun kielikiistat halkaisivat vanhan Leuvenin katolisen yliopiston kahtia ja ranskankielinen osa muutti kokonaan uuteen, sitä varten suunniteltuun kaupunkiin. Waterloon kesäkuun 1815 taistelukentät tunnetaan kaikkialla maailmassa, mutta vähemmän tunnettua on, että pienessä Wavren kaupungissa toimii nykyään maailman suurin rokotetehdas – se työllistää noin 7 000 ihmistä ja lähettää yli kaksi miljoonaa rokoteannosta joka päivä 160 maahan. Peltojen ja metsien vaihtelevassa maisemassa vanha ja uusi Belgia elävät siis rinnakkain: luostarirauniot, taisteluhistoria ja huipputeollisuus samalla kapealla alueella Brysselin eteläpuolella.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-walloon-brabant-fc70f1f9.jpg',
          lahde: 'Glaurent, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Glaurent',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Butte_du_Lion_de_Waterloo.jpg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/bel-maakunta-walloon-brabant-fc70f1f9.jpg',
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
  /*
   * DNK PITKA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
   * yhteydessä). Lähteet (en-Wikipedia, tarkistettu 26.9.2026):
   *   Nordjylland — Råbjerg Mile; Skagen Painters (siirtokunta
   *     1870-luvulta)
   *   Midtjylland — Mols Bjerge National Park; HDMS Jylland (fregatti,
   *     palveluksessa 1873)
   *   Hovedstaden — Tivoli Gardens (avattu 1843); Cycling in
   *     Copenhagen
   *   Sjaælland — Roskilde Cathedral (Fredrik VII); Skuldelev ships /
   *     Viking Ship Museum (nostettu 1962)
   *   Syddanmark — Duchy of Schleswig (Preussin osa 1864–1920);
   *     Battle of Dybbøl; Hans Christian Andersen
   *
   * DNK KUVA + PIKKUKUVA (Sisältökirjuri 26.9.2026, löydös 158:n jatko
   * BEL:n jälkeen): sama kaava — Commons-kuva lisenssi tarkistettu
   * API:sta, ämpäri karttanostot/20260926/, pikkukuva kierrättää saman
   * osoitteen. Lähteet:
   *   Nordjylland — File:Skagen Zusammenfluss von Nordsee & Ostsee 2.JPG (Zairon, CC BY-SA 3.0)
   *   Midtjylland — File:Rainbow_Panorama_Rooftop_Walk_ARoS_Art_Museum_Aarhus.jpg (ThomasLendt, CC BY-SA 4.0)
   *   Hovedstaden — File:Øresund Bridge from the air in September 2015.jpg (Nick-D, CC BY-SA 4.0)
   *   Sjaælland — File:Møns Klint.1.JPG (Erik Christensen, CC BY-SA 3.0)
   *   Syddanmark — File:Lego_House_Billund.jpg (MPhernambucq, CC BY-SA 4.0)
   */
  DNK: {
    Nordjylland: {
      lyhyt: 'Skagenin Grenenillä voi seistä hiekkasärkän kärjessä, jossa Skagerrakin ja Kattegatin aallot törmäävät – uiminen siellä on kielletty.',
      pitka: `Alueen läntinen ranta on jatkuvassa liikkeessä: Råbjerg Mile, Pohjois-Euroopan suurin vaeltava hiekkadyyni, työntyy tuulen voimalla jopa 18 metriä vuodessa ja on jo haudannut allensa metsiä ja teitä. Samasta ilmiöstä kärsi 1700-luvulla Skagenin vanha Pyhän Laurentiuksen kirkko, jonka hiekka pakotti seurakunnan hylkäämään vuonna 1795 – nykyään hiekasta pilkistää enää 18 metriä korkea torni. 1870-luvulla samat rannat alkoivat vetää puoleensa toisenlaista väkeä: taidemaalarit kokoontuivat Skagenin kalastajakylään maalaamaan valoa ja paikallisia, ja pian syntyi kansainvälisesti tunnettu Skagenin maalarien siirtokunta. Nykyään dyynialue on suosittu retkikohde, mutta tuuli jatkaa työtään yhtä hitaasti ja peruuttamattomasti kuin isoisän aikaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-nordjylland-2bba5d12.jpg',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Zairon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skagen Zusammenfluss von Nordsee & Ostsee 2.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-nordjylland-2bba5d12.jpg',
    },
    Midtjylland: {
      lyhyt: 'Aarhusin ARoS-taidemuseon katolla kiertää sateenkaaren värinen lasikäytävä, josta kaupunki näkyy joka askeleella eri sävyssä.',
      pitka: `Djurslandin niemimaalla kohoavat Mols Bjergen kumpuilevat mäet, jääkauden muovaama maisema, jossa nummet, lehdot ja pikkujärvet vuorottelevat ja metsäkauriit liikkuvat vapaana kansallispuistossa. Rannikon toisella puolella Ebeltoftin satamakaupungissa on kuivatelakalla maailman pisin säilynyt puinen sotalaiva, fregatti Jylland – 102-metrinen höyry- ja purjelaivojen välimuoto, joka selvisi vuoden 1864 Helgolannin taistelusta täynnä osumia. Vuonna 1873 alus oli vielä aktiivisessa laivastopalveluksessa, ja vain vuotta myöhemmin siitä tehtiin kuninkaallinen jahti, joka purjehti Kristian IX:n Färsaarille, Islantiin ja Pietariin. Nykyään laiva lepää kuivalla telakalla museona, ja sen pitkä runko muistuttaa siitä, miten höyry ja purje elivät vielä rinnakkain isoisän matkojen aikaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-midtjylland-ac105237.jpg',
          lahde: 'ThomasLendt, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'ThomasLendt',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rainbow_Panorama_Rooftop_Walk_ARoS_Art_Museum_Aarhus.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-midtjylland-ac105237.jpg',
    },
    Hovedstaden: {
      lyhyt: 'Kööpenhaminasta Malmöhön ajetaan ensin tunnelissa, noustaan Peberholmin tekosaarelle ja jatketaan lähes kahdeksan kilometrin siltaa.',
      pitka: `Kaupungin keskellä on yhä auki huvipuisto Tivoli, joka avasi porttinsa vuonna 1843 – kun isoisä kulki Kööpenhaminan läpi vuonna 1873, puisto oli jo kolmekymmentä vuotta vanha nähtävyys. Sen gondolit ja köynnöskujat lumosivat avausvuonna myös sadunkertoja H. C. Andersenia, joka sai niistä innoitusta satuunsa Satakieli. Puiston vanha lampi on osa entistä kaupunginvallihautaa, ja illalla valot syttyvät samalla paikalla kuin isoisän aikaan, vaikka laitteet ovat sittemmin vaihtuneet vuoristoradoiksi ja valoshow'ksi. Ulkopuolella kaupunki on nykyään yksi maailman pyöräilyystävällisimmistä: yli puolet kööpenhaminalaisista pyöräilee töihin tai kouluun, mikä olisi isoisän ajan hevoskaduilla ollut vaikea kuvitella.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-hovedstaden-cf25dfff.jpg',
          lahde: 'Nick-D, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Nick-D',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Øresund Bridge from the air in September 2015.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-hovedstaden-cf25dfff.jpg',
    },
    'Sjaælland': {
      lyhyt: 'Mønin saaren liitukalliot putoavat paikoin 120 metriä suoraan mereen, ja vuonna 2025 Møns Klint pääsi Unescon maailmanperintölistalle.',
      pitka: `Roskilden keskiaikainen tuomiokirkko on ollut Tanskan kuninkaiden hautakirkko jo 1400-luvulta lähtien, ja sen holvien alla lepää yli 40 hallitsijaa – kun isoisä kulki seudulla 1873, viimeisin heistä, kuningas Fredrik VII, oli haudattu sinne reilut kymmenen vuotta aiemmin. Kaupungin liepeillä, Roskilden vuonon pohjassa, makasi vuosisatoja viisi viikinkilaivaa, jotka noin vuonna 1070 oli tarkoituksella upotettu sulkemaan väylä vihollislaivastolta. Ne nostettiin esiin vasta vuonna 1962, kun koko lahdenpoukama padottiin kuivaksi, ja nykyään ne ovat esillä Viikinkilaivamuseossa. Fjordin rannalla samassa kaupungissa kohtaavat näin tuhat vuotta sitten upotetut laivat ja kirkko, jonka torneja on näkynyt yli vainioiden jo isoisänkin aikaan.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-sjaelland-87868893.jpg',
          lahde: 'Erik Christensen, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Erik Christensen',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Møns Klint.1.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-sjaelland-87868893.jpg',
    },
    Syddanmark: {
      lyhyt: 'Pienessä Billundissa on Legon pääkonttori ja maailman ensimmäinen Legoland, joka avasi porttinsa jo vuonna 1968.',
      pitka: `Alueen eteläosassa, Sønderjyllandissa, rajat ovat siirtyneet historian saatossa: kun isoisä matkasi vuonna 1873, seutu ei kuulunut Tanskaan lainkaan, vaan oli osa Saksan keisarikuntaa – Preussi oli liittänyt sen itseensä vuoden 1864 sodan jälkeen, ja alue palasi Tanskalle vasta kansanäänestyksen kautta vuonna 1920. Sønderborgin liepeillä kohoava Dybbølin mylly muistuttaa yhä sodan verisimmästä taistelusta ja oli vuosina 1864–1920 tanskanmielisten etelänjyylantilaisten vastarinnan symboli. Kauempana idässä, Odensen kaupungissa, syntyi vuonna 1805 satukirjailija H. C. Andersen, joka eli edelleen isoisän matkan aikaan ja kuoli vasta kaksi vuotta myöhemmin, vuonna 1875. Odensen mukulakivikadut ovat samat, joilla suutarinpojasta kasvanut satukirjailija haaveili maailmalle lähdöstä – eteläisellä rajaseudulla sen sijaan muistetaan yhä, miten lähellä koko maakunta oli jäädä pysyvästi Saksan puolelle.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-syddanmark-9ab3a946.jpg',
          lahde: 'MPhernambucq, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'MPhernambucq',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lego_House_Billund.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/dnk-maakunta-syddanmark-9ab3a946.jpg',
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
  /*
   * SVK PITKA (Sisältökirjuri 26.9.2026). Lähteet (en-Wikipedia,
   * tarkistettu 26.9.2026):
   *   Banskobystrický — Banská Bystrica Region (Poľana, Nízke Tatry,
   *     kaivosopisto 1762); Museum of the Slovak National Uprising (1944)
   *   Bratislavský — Most SNP/UFO; Bratislava Region (pienin, rikkain);
   *     Devín Castle
   *   Košický — Košice gold treasure (1935); Košice–Bohumín Railway
   *     (1870/1872); Košice Region (kulttuuripääkaupunki 2013)
   *   Nitriansky — Zobor Documents (1111/1113); Zobor; Podhájská (38 °C)
   *   Prešov — Wooden churches of the Slovak Carpathians; Hervartov;
   *     Bardejov
   *   Trenciansky — Trenčín Region (Váh, kylpylät); Bojnice Castle
   *   Trnavský — University of Trnava (1635); Basilica of the Seven
   *     Sorrows, Šaštín
   *   Žilinský — Žilina Region; Painted Village of Čičmany (1977); Kysuce
   *
   * SVK KUVA + PIKKUKUVA (Sisältökirjuri 26.9.2026, löydös 158:n jatko):
   * sama kaava — Commons-kuva lisenssi tarkistettu API:sta, ämpäri
   * karttanostot/20260926/, pikkukuva kierrättää saman osoitteen.
   * Lähteet:
   *   Banskobystrický — File:Banská Štiavnica zhora.jpg (Rudo Mlich, CC BY-SA 4.0)
   *   Bratislavský — File:Panoramic_view_from_Bratislava_castle.jpg (Lukáš Perný, CC BY-SA 4.0)
   *   Košický — File:St_Elisabeth_Cathedral_Kosice.jpeg (Ingo Mehling, CC BY-SA 3.0)
   *   Nitriansky — File:Nitriansky_hrad_1.jpg (Tomáš Bartovič, CC BY-SA 4.0)
   *   Prešov — File:Market_Square_of_Bardejov.jpg (Michał Rawlik, CC BY-SA 4.0)
   *   Trenciansky — File:Trencin_Castle_030.jpg (Ingo Mehling, CC BY-SA 4.0)
   *   Trnavský — File:Trojičné námestie.jpg (Pavel Briatka, CC BY-SA 2.5)
   *   Žilinský — File:Orava_Castle.jpg (Juraj Bednárik, CC BY-SA 4.0)
   */
  SVK: {
    'Banskobystrický': {
      lyhyt: 'Banská Štiavnican kaivoskaupunki on rakennettu muinaisen, romahtaneen tulivuoren kalderan keskelle, ja se on Unescon maailmanperintöä.',
      pitka: `Alue on Slovakian vulkaanisin kolkka: Banská Štiavnican lisäksi täällä kohoaa Poľanan tulivuorimassiivi, laaja metsäinen suojelualue, ja etelämmässä Nízke Tatryn eli Matalan Tatran vuoret houkuttelevat nykyään vaeltajia ja hiihtäjiä. Keskiajalla seudun hopea- ja kultakaivokset tekivät Banská Štiavnicasta yhden Euroopan rikkaimmista kaupungeista, ja täällä toimi vuodesta 1762 yksi maailman vanhimmista kaivosopistoista, kauan ennen isoisän matkaa 1870-luvulla. Toisen maailmansodan aikana alueen pääkaupunki Banská Bystrica nousi vastarinnan keskukseksi: elokuussa 1944 sieltä syttyi Slovakian kansallinen nousu, Euroopan toiseksi suurin natsivastainen kansannousu, jota nykyään muistetaan suurella museolla kaupungin sydämessä. Vuoristokylien välissä elää yhä sitkeä kaivos- ja metsäperinne, ja monet pikkukaupungit tuoksuvat edelleen kylpylävedeltä – Dudincen ja Sklené Teplicen lämpimät lähteet ovat hoitaneet väsyneitä vaeltajia vuosisatoja.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-banskobystricky-a7d04f80.jpg',
          lahde: 'Rudo Mlich, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Rudo Mlich',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Banská Štiavnica zhora.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-banskobystricky-a7d04f80.jpg',
    },
    'Bratislavský': {
      lyhyt: 'Bratislava on maailman ainoa pääkaupunki, joka rajautuu kahteen valtioon: Itävalta ja Unkari alkavat aivan kaupungin laidalta.',
      pitka: `Modernin Bratislavan siluettia hallitsee oudon näköinen Nový most eli Uusi silta, jonka yhden pylvään päällä lepää lentävän lautasen muotoinen näköalatasanne UFO. Kaupungin liepeillä, Tonavan ja Moravan jokien yhtymäkohdassa, seisovat Devínin linnan rauniot, yksi Slovakian vanhimmista linnoista ja muinainen rajapaikka, jota on vartioitu roomalaisajoista lähtien. Pohjoiseen avautuvat Pikku-Karpaattien rinteet, joilla viinitarhat kiertyvät kylästä kylään aina Trnavaan asti – Bratislava on Slovakian viinin sydän. Alue on pinta-alaltaan pienin mutta asukasta kohti rikkain kaikista maan kahdeksasta maakunnasta, ja sen halki soljuva Tonava sitoi kaupungin kauppareitteihin jo isoisän aikaan, kun höyrylaivat kulkivat Wienin ja Budapestin väliä.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-bratislavsky-39e167c3.jpg',
          lahde: 'Lukáš Perný, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Lukáš Perný',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panoramic_view_from_Bratislava_castle.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-bratislavsky-39e167c3.jpg',
    },
    'Košický': {
      lyhyt: 'Košicen Pyhän Elisabetin katedraali on Slovakian suurin kirkko ja yksi Euroopan itäisimmistä goottilaisista katedraaleista.',
      pitka: `Košicen vanhankaupungin kivijalkojen alta löytyi vuonna 1935 lähes 3000 kultakolikon aarre, kätkettynä maan alle jo 1600-luvun kapinoiden aikaan – se on suurin koskaan Slovakiasta löydetty kulta-aarre, ja osa siitä on esillä Itä-Slovakian museossa. Kaupunki on rakentunut Hornád-joen varrelle Slovakian rautavuorten itäreunalla, lähellä sekä Unkarin että Ukrainan rajaa, ja seudulla asuu slovakkien rinnalla unkarilaisia, tšekkejä ja romaneja. Rautatie Košicesta pohjoiseen valmistui juuri isoisän matkan kynnyksellä: Košicen ja Prešovin välinen rata avattiin syksyllä 1870 ja koko yhteys Puolan rajalle asti vuonna 1872, joten vuonna 1873 juna oli vielä aivan uusi ihme näillä main. Nykyään noin kolmasosa koko maakunnan väestä asuu Košicen kaupunkiseudulla, joka valittiin vuonna 2013 Euroopan kulttuuripääkaupungiksi yhdessä Ranskan Marseillen kanssa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-kosicky-e3cee3fc.jpg',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'Ingo Mehling',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St_Elisabeth_Cathedral_Kosice.jpeg',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-kosicky-e3cee3fc.jpg',
    },
    Nitriansky: {
      lyhyt: 'Nitran seutu on Slovakian lämpimin kolkka, jonka pelloilla kasvaa vehnää, ja lähes joka neljäs asukas on kansallisuudeltaan unkarilainen.',
      pitka: `Nitran yllä kohoavan Zobor-vuoren rinteillä toimi keskiajalla benediktiiniläismunkkien luostari, ja sieltä ovat peräisin Slovakian alueen kaksi vanhinta säilynyttä asiakirjaa, vuosilta 1111 ja 1113 – niissä mainitaan yli 150 joen, kylän ja alueen nimeä, monet ensimmäistä kertaa historiassa. Kaupungin juuret ulottuvat vielä kauemmas: Nitra oli 800-luvulla Suur-Määrin valtakunnan keskuksia, ja Zoborin linnavuori oli asutettu jo rautakaudella. Ympäröivä tasanko on Slovakian lämpimintä ja viljavinta seutua, ja sen pelloilta korjataan vehnää siinä missä isoisän aikaankin, joskin sadon kuljettaa nykyään rekka. Alueen eteläosassa maan alta pulppuaa lämmintä kivennäisvettä, ja Podhájskan kylpylässä ihmiset kelluvat 38-asteisessa vedessä, joka koostumukseltaan muistuttaa Kuollutta merta.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-nitriansky-73593719.jpg',
          lahde: 'Tomáš Bartovič, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Tomáš Bartovič',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nitriansky_hrad_1.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-nitriansky-73593719.jpg',
    },
    'Prešov': {
      lyhyt: 'Korkeiden Tatrain Gerlachovský štít kohoaa 2 654 metriin – se on koko Karpaattien korkein huippu, ja sen laki katoaa usein pilviin.',
      pitka: `Korkeiden Tatrojen liepeiltä maisema laskeutuu itään kohti Šarišin seutua, missä kyliin kätkeytyy kymmeniä satojen vuosien takaisia puukirkkoja – kahdeksan niistä on Unescon maailmanperintöä, ja vanhin, Hervartovin Pyhän Fransiskus Assisilaisen kirkko, on peräisin jo 1400-luvulta. Kirkot rakensivat pääosin karpaattien rusiinit, kreikkalaiskatolinen paimen- ja metsästäjäväestö, jonka kieltä ja perinteitä kuulee alueella yhä. Pohjoisempana keskiaikainen Bardejovin kaupunki on säilyttänyt renessanssitorinsa ja muurinsa niin ehjinä, että koko vanhakaupunki on omalla Unesco-listallaan. Vuoristo on tehnyt Prešovin maakunnasta Slovakian suurimman pinta-alaltaan, vaikka isoisän aikaan monet näistä kylistä olivat vielä vaikeakulkuisia ja köyhiä vuoristoseutuja.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-presov-30ab73d3.jpg',
          lahde: 'Michał Rawlik, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Michał Rawlik',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Market_Square_of_Bardejov.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-presov-30ab73d3.jpg',
    },
    Trenciansky: {
      lyhyt: 'Trenčínin linnan alla kalliossa on roomalaisten sotilaiden vuonna 179 kaivertama kirjoitus, joka kutsuu paikkaa nimellä Laugaricio.',
      pitka: `Alueen halki virtaa Slovakian pisin joki Váh, ja sen varrelle on noussut lämpökylpylöitä kuten Trenčianske Teplice ja Nimnica; monet lähteet kuohuivat parantavaa vettä jo isoisän aikaan 1870-luvulla, jolloin kylpymatkailu oli muodissa koko Itävalta-Unkarissa. Pohjoisempana Bojnicen linna kohoaa kuin suoraan sadusta pyöreine torneineen ja koristeellisine kaarikäytävineen – se on Slovakian rakastetuin linna, ja joka kevät sen pihalla juhlitaan kansainvälistä haamujen ja henkien festivaalia. Linnan naapurissa toimii maan vanhin ja suurin eläintarha, joka on viihdyttänyt perheitä 1950-luvulta lähtien. Trenčínin oma linna kohoaa yhä kaupungin yllä kalliolla, jonka juurella roomalaissotilaiden kaiverrus muistuttaa vielä paljon vanhemmasta ajasta, jolloin tämä oli valtakunnan pohjoisin etuvartio.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-trenciansky-cfc2a7c3.jpg',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Ingo Mehling',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trencin_Castle_030.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-trenciansky-cfc2a7c3.jpg',
    },
    'Trnavský': {
      lyhyt: 'Trnavaa kutsutaan Pikku-Roomaksi, koska vanhankaupungin muurien sisälle on mahtunut niin monta kirkkoa.',
      pitka: `Trnavaan perustettiin vuonna 1635 yliopisto, yksi tuon ajan Ylä-Unkarin merkittävimmistä oppilaitoksista, ja se toimi kaupungissa lähes 150 vuotta ennen kuin se siirrettiin Budaan ja lopulta Pestiin – isoisän vieraillessa seudulla 1870-luvulla yliopisto oli jo historiaa, mutta sen tiedekunnat olivat tehneet Trnavasta aikansa oppineisuuden keskuksen. Alue on Slovakian tasaisinta ja viljellyintä maata, Tonavan ja Záhorien tasankojen välissä, ja sen pelloilla ja Pikku-Karpaattien rinteillä kasvaa sekä vehnää että viiniä. Läntisessä Šaštín-Strážen kaupungissa seisoo maan tärkein pyhiinvaelluskohde, barokkinen basilika, jonne on kuljettu Slovakian suojeluspyhimyksen, Seitsemän kivun Neitsyt Marian, juhlaa viettämään jo yli 450 vuoden ajan. Basilikan pihalle kokoontuu syksyisin yhä kymmeniätuhansia pyhiinvaeltajia, aivan kuten isoisänkin aikana.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-trnavsky-4f6d1181.jpg',
          lahde: 'Pavel Briatka, Wikimedia Commons (CC BY-SA 2.5)',
          tekija: 'Pavel Briatka',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trojičné námestie.jpg',
          lisenssi: 'CC BY-SA 2.5',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-trnavsky-4f6d1181.jpg',
    },
    'Žilinský': {
      lyhyt: 'Oravan linna kohoaa korkealla kalliolla joen yllä, ja moni vuoden 1922 kauhuklassikon Nosferatun kohtaus kuvattiin sen muureilla.',
      pitka: `Alue on Slovakian vuoristoisin maakunta, ja sen ympärillä kohoavat niin Länsi- ja Matala-Tatra kuin Malá Fatra ja Kysucen Beskydit – laaksoissa asuu yhä sitkeitä paimen- ja metsästäjäyhteisöjä, joiden perinteet elävät festivaaleissa ja käsityössä. Kysucen kapearaiteinen metsärautatie kiemurtelee yhä samoja jokivarsia, joita pitkin puuta kuljetettiin sahoille jo vuosikymmenten ajan. Yksi seudun kummallisimmista näyistä löytyy Čičmanyn kylästä, jonka tummat hirsitalot on koristeltu valkoisilla, kalkilla maalatuilla geometrisilla kuvioilla ylhäältä alas asti – tapa syntyi, kun kosteudelta suojaava kalkki muuttui vuosikymmenten myötä koristetaiteeksi, ja kylästä tuli vuonna 1977 maailman ensimmäinen suojeltu kansanrakennusreservaatti. Oravan linnan tapaan Čičmany muistuttaa siitä, että Žilinän maakunnan aarteet eivät ole vain vuorissa, vaan myös tavassa, jolla ihmiset ovat tehneet arjestaan kaunista.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-zilinsky-6bf5c376.jpg',
          lahde: 'Juraj Bednárik, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Juraj Bednárik',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orava_Castle.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/svk-maakunta-zilinsky-6bf5c376.jpg',
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
  /*
   * FIN PITKA (Sisältökirjuri 26.9.2026). Avaimet englanniksi (kuten
   * lyhyt-erässä). Lähteet (en-Wikipedia, tarkistettu 26.9.2026):
   *   South Karelia — Imatrankoski (padotus 1929, Katariina Suuri 1772,
   *     Kruununpuisto 1842, Pedro II 1876)
   *   Southern Ostrobothnia — Tangomarkkinat (1985)
   *   Southern Savonia — Saimaa ringed seal (eristys, kanta, Norppalive)
   *   Kainuu — "Hiljainen Kansa" (Reijo Kela, 1994)
   *   Tavastia Proper — Iittala (1881, Aino/Alvar Aalto, Sarpaneva)
   *   Central Ostrobothnia — Kokkola (Halkokarin kahakka 1854)
   *   Central Finland — Rally Finland (1951, MM-sarja 1973)
   *   Kymenlaakso — Langinkoski (Aleksanteri III, 1889, museo 1933)
   *   Lapland — Inari (pinta-ala, neljä kieltä, Inarijärvi)
   *   Pirkanmaa — Tampere saunapääkaupunki 2018, Rajaportti 1906
   *   Ostrobothnia — Kvarken Archipelago (maannousu, Unesco 2006)
   *   North Karelia — Koli National Park (Sibelius/Aho/Järnefelt)
   *   Northern Ostrobothnia — Air Guitar World Championships (1996)
   *   Northern Savonia — Wife-carrying (Sonkajärvi)
   *   Päijät-Häme — Lahti (Salpausselkä, Unesco Geopark 2022)
   *   Satakunta — Sammallahdenmäki (Unesco 1999)
   *   Uusimaa — Porkkala (vuokraus 1944, palautus 1956)
   *   Finland Proper — Archipelago Sea (saarimäärä, maannousu)
   */
  FIN: {
    'South Karelia': {
      lyhyt: 'Imatrankoski on ollut padottuna vuodesta 1929, mutta kesäiltaisin padon luukut avataan ja vesi ryöppyää taas vanhaan uomaansa.',
      pitka: `Imatrankosken pauhu vaientui vuonna 1929, kun voimalaitos valjasti virran sähköksi – mutta kesäiltaisin, keskiviikosta sunnuntaihin kello kuudelta, padon luukut avataan ja koski pääsee hetkeksi takaisin vanhaan uomaansa. Paikka oli kuuluisa jo kauan ennen patoa: Katariina Suuri kävi ihailemassa sitä 1772, ja keisari Nikolai I perusti rannalle Kruununpuiston, Suomen vanhimman luonnonpuiston, vuonna 1842. 1800-luvun lopulla Imatrankoski oli yksi Euroopan tunnetuimmista luontonähtävyyksistä, ja vuonna 1876 siellä kävi jopa Brasilian keisari Pedro II, joka kaiversi nimikirjaimensa kalliolle. Isoisän matkapäiväkirjan aikoihin 1870-luvulla koski oli siis jo täydessä turistiloistossaan, aivan kuten venäläinen ylhäisö sen tunsi.`,
    },
    'Southern Ostrobothnia': {
      lyhyt: 'Seinäjoen Tangomarkkinat on maailman vanhin tangofestivaali, ja joka heinäkuu siellä etsitään Suomen parhaita tangolaulajia.',
      pitka: `Seinäjoella heinäkuu tarkoittaa tangoa: Tangomarkkinat on maailman vanhin tangofestivaali, perustettu 1985 sen jälkeen, kun kaupungin päättäjät saivat idean junamatkalla Helsinkiin. Ensimmäiseen festivaaliin kaupunki uskalsi sijoittaa 60 000 silloista markkaa, ja paikalle saapui yllättävän moni, noin 18 000 kävijää. Nykyään laulukilpailussa etsitään vuosittain Suomen Tangokuningas ja -kuningatar – kilpailijat karsiutuvat maakuntien osakilpailujen ja Raision välierän kautta finaaliin, jossa yleisö äänestää suosikkinsa. Etelä-Pohjanmaan tasaisilla lakeuksilla tango on siis muuttunut paikalliseksi ylpeydenaiheeksi, ei vain tuontitanssiksi Argentiinasta.`,
    },
    'Southern Savonia': {
      lyhyt: 'Saimaannorppa elää vain Saimaassa, eristyksissä muista norpista jo noin 9 500 vuotta – jäljellä on vain noin 500 yksilöä.',
      pitka: `Saimaannorppa on elänyt eristyksissä Saimaan järvialtaassa jo noin 9 500 vuotta, siitä asti kun mannerjää perääntyi ja maa kohosi sen tieltä pois – tuoreen geenitutkimuksen mukaan laji erkani lähisukulaisistaan jopa 60 000 vuotta sitten. Kannan tila oli 1980-luvulla lähes toivoton, vain 100–150 yksilöä, mutta suojelutyö on nostanut määrän noin 500 norppaan; verkkokalastus ja leudot, lumettomat talvet ovat yhä suurimmat uhat. Ihmiset auttavat nykyään kinoksia kolaamalla: kun luonnon lumi ei riitä pesäkuopan kaivamiseen, vapaaehtoiset tekevät norpille keinotekoisia lumikinoksia jäälle. Yksi norppayksilö, Pullervo, tuli koko Suomelle tutuksi Norppalive-verkkokameran kautta, kun sen kuvaa seurasi parhaimmillaan 180 000 katsojaa yhtä aikaa.`,
    },
    Kainuu: {
      lyhyt: 'Suomussalmella valtatien varren pellolla seisoo Hiljainen kansa, turvepäisten hahmojen joukko, jonka vaatteet vaihdetaan vuodenajan mukaan.',
      pitka: `Suomussalmella valtatien varren pellolla seisoo pimeän tullen aavemainen näky: noin tuhat turvepäistä hahmoa, Hiljainen kansa, taiteilija Reijo Kelan teos, joka löysi nykyisen paikkansa vuonna 1994 vaellettuaan sitä ennen Helsingin Lassilasta Senaatintorille asti. Suomussalmen nuorisotyöpaja vaihtaa hahmojen vaatteet kahdesti vuodessa lahjoitetuista vaatteista – joukossa on morsiuspukuja, kumisaappaita ja pukuja, jotka tekevät väkijoukosta yhä uudelleen erilaisen. Kela ei ole koskaan selittänyt, keitä hahmot esittävät, ja kävijät ovatkin nähneet niissä niin talvisodan kaatuneita kuin unohdettua kansaa yleensä. Kainuun hiljaisilla teillä tämä äänetön väkijoukko on tullut yhtä tutuksi kuin alueen metsät ja järvet.`,
    },
    'Tavastia Proper': {
      lyhyt: 'Hämeenlinnaan kuuluvassa Iittalan kylässä on puhallettu lasia vuodesta 1881, ja kylän nimi on nyt maailmalla tunnettu muotoilumerkki.',
      pitka: `Iittalan kylässä Hämeenlinnan liepeillä on puhallettu lasia vuodesta 1881, jolloin ruotsalainen liikemies Peter Magnus Abrahamson perusti sinne lasitehtaan lähdettyään Nuutajärveltä. Pienestä kyläpajasta kasvoi muotoilun suurvalta: Aino Aallon pinottavat lasit 1930-luvulta ja Alvar Aallon aaltoileva Savoy-maljakko 1936 tekivät Iittalasta suomalaisen muotoilun tunnuskuvia jo ennen sotia. Timo Sarpanevan 1956 suunnittelema punainen i-ympyrälogo oli tuotteiden tunnus lähes seitsemänkymmentä vuotta, kunnes se vaihdettiin keltaiseen vuonna 2024. Nykyään Iittala kuuluu Fiskarsiin ja osa tuotannosta on siirtynyt ulkomaille, mutta osa lasista puhalletaan yhä samalla kylällä, jonka nimen koko maailma tuntee kaupan hyllyltä.`,
    },
    'Central Ostrobothnia': {
      lyhyt: 'Kokkolan Englantilaisessa puistossa on brittien tykkivene, joka kaapattiin 1854 – kaupunki ei ole palauttanut sitä pyynnöistä huolimatta.',
      pitka: `Kokkolan Englantilaisessa puistossa lojuu yhä brittiläinen tykkivene, joka jäi paikallisten saaliiksi Halkokarin kahakassa kesäkuussa 1854 – Krimin sodan sivunäyttämöllä metsästyskiväärein ja tykein aseistautuneet kokkolalaiset torjuivat brittilaivaston maihinnousuyrityksen. Vene on ollut kaupungin ylpeys siitä lähtien, eikä Lontoon pormestarinkaan toistuvat palautuspyynnöt ole tehonneet: kaupunginvaltuusto on kieltäytynyt luovuttamasta sitä. Kummallista kyllä, Britannian valtiovarainministeriö maksaa yhä vuosittain pienen summan paikalliselle seurakunnalle kahakassa kaatuneiden yhdeksän merijalkaväen sotilaan hautojen hoidosta. Niin kaukana Lontoosta kuin Kokkola onkin, sen ja Ison-Britannian välillä on siis säilynyt omalaatuinen, yli 170-vuotias side.`,
    },
    'Central Finland': {
      lyhyt: 'Keski-Suomen soratiet ajetaan Rally Finlandissa, MM-rallin nopeimmassa osakilpailussa, jossa autot lentävät harjanteilta pitkiä hyppyjä.',
      pitka: `Keski-Suomen soratiet muuttuvat heinä-elokuun vaihteessa maailman nopeimmaksi ralliradaksi: Rallia on ajettu Jyväskylässä vuodesta 1951, jolloin se tunnettiin nimellä Jyväskylän Suurajot, ja MM-sarjaan se liittyi 1973. Ralli tunnetaan lempinimillä "tuhannen hypyn ralli" ja soran Grand Prix, sillä sileät, leveät tiet ja loivat harjanteet lennättävät autot ilmaan yhä uudelleen. Vuonna 2015 kilpailun keskinopeus oli 125,4 km/h, mikä tekee siitä koko MM-sarjan nopeimman osakilpailun. Kesän kuumimpina viikonloppuina satojatuhansia katsojia asettuu metsäteiden varsille seuraamaan, kun paikalliset kuskit lentävät tutuilla harjanteillaan.`,
    },
    Kymenlaakso: {
      lyhyt: 'Kotkan Langinkoskella seisoo keisari Aleksanteri III:n kalastusmaja, jossa tsaarin perhe vietti kesiä lohikosken rannalla.',
      pitka: `Kotkan Langinkoskella seisoo keisari Aleksanteri III:n kalastusmaja, joka valmistui 1889 sen jälkeen, kun keisari oli ihastunut koskeen jo vuonna 1880. Majan sisustus tilattiin tarkoituksella kotimaisilta valmistajilta – Tampellan kankaita, Arabian astioita, Karhulan lasia – ja perhe eli siellä yllättävän vaatimatonta elämää: keisarinna Maria Fjodorovna muun muassa harrasti ruoanlaittoa, vaikka astianpesusta hän ei pitänyt lainkaan. Suomen itsenäistymisen jälkeen maja rapistui, kunnes yksityiset kotkalaiset perustivat sinne museon 1933 ja pelastivat sen unohdukselta. Nykyään lohikosken rannalla käy vuosittain yli 12 000 kävijää, joista kolmasosa saapuu ulkomailta ihailemaan tsaariperheen kesäidylliä.`,
    },
    Lapland: {
      lyhyt: 'Inari on Suomen suurin kunta, ja siellä on peräti neljä virallista kieltä: suomi sekä pohjois-, inarin- ja koltansaame.',
      pitka: `Inari on Suomen suurin kunta pinta-alaltaan, yli 17 000 neliökilometriä, mutta asukkaita on silti vain reilut 7 000. Täällä puhutaan virallisesti neljää kieltä – suomen lisäksi pohjoissaamea, inarinsaamea ja koltansaamea – enemmän kuin missään muussa Suomen kunnassa, ja saamelaiskulttuuri elää vahvana Siida-museossa ja Sajos-kulttuurikeskuksessa. Inarijärvi, Suomen kolmanneksi suurin järvi, hallitsee maisemaa yli tuhannen neliökilometrin alalla. Ilmasto tekee elämästä ääripäiden peliä: kesällä lämpötila on noussut lähelle 32 astetta, talvella painunut lähelle -49:ää – harva Suomen kolkka näyttää yhtä erilaiselta vuodenajasta toiseen.`,
    },
    Pirkanmaa: {
      lyhyt: 'Tampere on julistettu maailman saunapääkaupungiksi, koska missään muualla maailmassa ei ole yhtä paljon yleisiä saunoja.',
      pitka: `Tampere julistautui vuonna 2018 maailman saunapääkaupungiksi, eikä liioittele: alueella lämpiää vuoden ympäri lähes 70 yleistä saunaa, enemmän kuin missään muualla Suomessa saati maailmassa. Vanhin yhä toimiva julkinen sauna löytyy Pispalan kaupunginosasta: Hermanni ja Maria Lahtinen perustivat Rajaportin saunan jo 1906, ja se lämpiää edelleen samalla paikalla yli sata vuotta myöhemmin. Suomalainen saunakulttuuri sai vuonna 2020 paikan Unescon aineettoman kulttuuriperinnön listalla, ja Tampereella tuo perintö näkyy arjessa: saunassa käydään yhtä luontevasti kuin kahvilla. Höyryn keskellä kaupungin tehdaspiiput ja punatiiliset tehtaat muistuttavat, että Tampereen historia on aina ollut yhtä lailla työn kuin löylynkin kaupunkia.`,
    },
    Ostrobothnia: {
      lyhyt: 'Merenkurkun saaristo kohoaa merestä lähes sentin vuodessa, ja tämän maannousun vuoksi se on vuodesta 2006 ollut Unescon maailmanperintöä.',
      pitka: `Merenkurkun saaristo nousee merestä lähes sentin vuodessa – ilmiö johtuu siitä, että jäätikön aikoinaan painama maankuori ponnahtaa yhä takaisin ylöspäin, ja yhteensä maa on noussut jo 285 metriä viimeisen jääkauden jälkeen. Tämä poikkeuksellisen nopea maannousu teki saaristosta vuonna 2006 osan Unescon maailmanperintöä yhdessä Ruotsin Korkean rannikon kanssa. Alueella on yli 5 600 pientä saarta ja luotoa suurempien Replotin ja Björkön lisäksi, ja tutkijoiden mukaan noin 2000 vuoden kuluttua nousu on erottanut Perämeren omaksi järvekseen Merenkurkun kohdalta. Kalastajakylien ja siirtolohkareiden täyttämä saaristo on siis yhä kirjaimellisesti kesken, muotoutumassa vuosikymmen kerrallaan.`,
    },
    'North Karelia': {
      lyhyt: 'Kolin vaaroilta avautuu näkymä Pielisjärvelle, ja samaa maisemaa ovat ihailleet Sibelius, Juhani Aho ja taidemaalari Eero Järnefelt.',
      pitka: `Kolin Ukko-Kolin laelta avautuu näkymä Pielisjärvelle, jota on ihasteltu jo yli sata vuotta: säveltäjä Jean Sibelius, kirjailija Juhani Aho ja taidemaalari Eero Järnefelt hakivat kaikki maisemasta innoitusta 1890-luvun taiteessaan, ja Järnefeltin Kolilta maalaamat näkymät kuuluvat suomalaisen kansallismaiseman ikoneihin. Alueesta tuli kansallispuisto vasta 1991, mutta perinnemaisemaa vaalitaan yhä vanhoin keinoin: laidunniityillä käy kesäisin lampaita ja perinteisiä suomenkarjan lehmiä. Puisto houkuttelee nykyään lähes 250 000 kävijää vuodessa – yhtä moni ihailee samaa näkymää, joka sata vuotta sitten sai koko sukupolven taiteilijoita tarttumaan sivellintä ja kynää.`,
    },
    'Northern Ostrobothnia': {
      lyhyt: 'Oulussa ratkotaan joka vuosi ilmakitaran maailmanmestaruus: soittimena on pelkkä kuviteltu kitara, ja kisa on pidetty vuodesta 1996.',
      pitka: `Oulussa ratkotaan heinäkuussa ilmakitaransoiton MM-mestaruutta, ja kisa on hurjan vakavasti otettu leikki: soittimena on pelkkä kuviteltu kitara, mutta esiintyminen arvioidaan yhtä tarkasti kuin oikeassa rock-keikalla. Kilpailun keksi muusikko Jukka Takalo osana Oulun musiikkivideofestivaalia vuonna 1996, ja siitä kasvoi vuosien saatossa oma tapahtumansa, jota vuodesta 2011 on järjestänyt Airnest Productions. Kisan tunnuslause "Make Air Not War" ei ole pelkkä sanaleikki: järjestäjät uskovat vakavissaan, että maailma paranisi, jos kaikki soittaisivat ilmakitaraa. Nykyään yli kymmenessä maassa järjestetään omat karsintakilpailut ennen kuin parhaat pääsevät Ouluun mittelemään maailman parhaasta ilmasoolosta.`,
    },
    'Northern Savonia': {
      lyhyt: 'Sonkajärvellä kisataan joka vuosi eukonkannon maailmanmestaruudesta, ja voittaja on se, joka kantaa toisen ihmisen esteradan läpi nopeimmin.',
      pitka: `Sonkajärvellä kisataan heinäkuussa eukonkannon MM-mestaruudesta, laji jonka juuret ulottuvat legendaan 1800-luvun lopun rosvopäälliköstä Herkko "Rosvo-Ronkaisesta" – tarinan mukaan hän joko ryösti ruokaa ja naisia lähikylistä tai harjoitutti miehiään kantamalla painavia säkkejä, joista laji myöhemmin syntyi. Nykyään kilpailussa ei katsota sukupuolta eikä siviilisäätyä: pariskunta juoksee esteradan läpi kolmella sallitulla otteella, joista virolaistyyli tarkoittaa kannettavan roikkumista pää alaspäin kantajan selässä. Voittajapari palkitaan kannettavan painon verran olutta, mikä on tehnyt kisasta suositun myös ulkomaisten joukkueiden keskuudessa. Pohjois-Savon vaatimattomasta pikkupitäjästä on näin tullut yllättävä maailmanurheilun keskus, jonne matkataan Japanista ja Yhdysvalloista asti kilpailemaan säkkien sijaan puolisoista.`,
    },
    'Päijät-Häme': {
      lyhyt: 'Lahden hyppyrimäet nousevat Salpausselältä, jääkauden reunalle kasaamalta harjulta – vuodesta 2022 seutu on ollut Unescon geopuisto.',
      pitka: `Lahden mäet ovat jääkauden jättämä lahja: ensimmäinen Salpausselkä, jääkauden reunamuodostuma, halkoo kaupunkia lännestä itään ja tarjoaa luontevan alustan hyppyrimäille. Vuonna 2022 Salpausselän alue liitettiin Unescon geopuistoverkostoon – yksi neljästä suomalaisesta geopuistosta. Lahti on ainoa kaupunki maailmassa, joka on isännöinyt pohjoismaisen hiihdon MM-kisoja peräti seitsemän kertaa, vuosina 1926, 1938, 1958, 1978, 1989, 2001 ja 2017, ja vuotuiset Lahden Hiihdot pitävät perinnettä yllä joka talvi. Jääkauden muovaama harju ja sen päälle rakennetut mäet ovat siis tehneet tästä lakeuksien kaupungista talviurheilun pysyvän keskuksen.`,
    },
    Satakunta: {
      lyhyt: 'Rauman Sammallahdenmäellä on 33 yli 3 000 vuotta vanhaa pronssikautista hautaröykkiötä, ja paikka on Unescon maailmanperintökohde.',
      pitka: `Rauman Sammallahdenmäellä lepää 33 harmaakivistä hautaröykkiötä, joista vanhimmat on kasattu jo noin 1500 eaa. ja nuorimmat rautakauden alussa – yhteensä lähes 3000 vuoden ajalta. Erikoisin niistä on Kirkonlaattia, 16 metriä pitkä ja 19 metriä leveä suorakulmainen, tasapintainen röykkiö, jonka kaltaista ei tunneta muualta Pohjolasta. Röykkiöiden uskotaan liittyneen pronssikauden aurinkoa palvoneisiin rituaaleihin ja samalla merkinneen viljelijäyhteisöjen aluerajoja rannikolla. Paikka luetteloitiin jo vuonna 1878 ja kaivettiin ensin auki 1891, mutta maailmanperintöasemansa se sai vasta 1999 – yksi Suomen vanhimmista ihmiskäden jäljistä, joka on nyt virallisesti koko ihmiskunnan perintöä.`,
    },
    Uusimaa: {
      lyhyt: 'Porkkalan niemi oli 1944–1956 Neuvostoliiton laivastotukikohta, ja sen läpi ajavien suomalaisjunien ikkunat piti sulkea luukuilla.',
      pitka: `Porkkalan niemi vuokrattiin Neuvostoliitolle laivastotukikohdaksi syyskuussa 1944, ja noin 7 200 asukasta joutui jättämään kotinsa kymmenessä päivässä; parhaimmillaan alueella asui jopa 30 000 neuvostosotilasta ja siviiliä. Helsingin ja Turun välillä kulkeneiden junien piti ajaa 40 kilometrin matka tukikohdan läpi ikkunaluukut suljettuina, eikä matkustajat saaneet valokuvata mitään ohi vilahtavasta maisemasta. Vuoden 1952 olympialaisissakin neuvostojoukkue majoitettiin poikkeuksellisesti omalle tukikohdalleen Porkkalaan, ei olympiakylään muiden maiden tapaan. Alue palautettiin Suomelle jo tammikuussa 1956, yksitoista vuotta ennen sovittua määräaikaa, mutta neuvostojoukot olivat ehtineet tuhota lähtiessään puolet asuinrakennuksista ja neljä viidesosaa liikerakennuksista.`,
    },
    'Finland Proper': {
      lyhyt: 'Saaristomerellä on joidenkin laskutapojen mukaan maailman eniten saaria, noin 50 000, ja moni niistä on vain pieni luoto.',
      pitka: `Saaristomerellä on joidenkin laskutapojen mukaan enemmän saaria kuin missään muualla maailmassa, jopa noin 50 000 – suurempia, yli neliökilometrin saaria on 257, mutta yli puolen hehtaarin luotoja ja kareja lasketaan olevan noin 17 700. Saaret nousivat merestä vasta noin 10 000 vuotta sitten, ja maa kohoaa yhä 4–10 millimetriä vuodessa, kun jääkauden painama kallioperä ponnistaa hitaasti takaisin ylöspäin. Turusta lähtevä Saariston rengastie kiemurtelee 160–190 kilometriä maanteitä ja 30–50 kilometriä lauttavesiä pitkin suurimpien asuttujen saarten läpi. Moni näistä tuhansista saarista on silti vain paljas graniittiluoto, jolla mahtuu istumaan korkeintaan lokki – siinä missä toisilla on kokonaisia kyliä ja kesäasutusta.`,
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
  /*
   * EST PITKA (Sisältökirjuri 26.9.2026). Lähteet (en-Wikipedia,
   * tarkistettu 26.9.2026):
   *   Harju — Harju County; Tallinn Old Town (Unesco 1997)
   *   Hiiu — Hiiu County; Kõpu Lighthouse (1500-l., LED)
   *   Ida-Viru — Ida-Viru County; Kreenholm Manufacturing Company
   *     (kolera/lakko 1872)
   *   Jõgeva — Jõgeva County; Lake Peipus; Kuremaa (1837–1843)
   *   Järva — Järva County; Paide; Türi (kukkamarkkinat 1977/2000)
   *   Lääne-Viru — Lääne-Viru County; Rakvere (linnavuori, Tarvanpea 1226)
   *   Lääne — Haapsalu (Hunnius 1825, Tšaikovski 1867); Vormsi
   *   Põlva — Põlva County; Taevaskoja; Räpina (paperitehdas 1734)
   *   Pärnu — Pärnu County; Pärnu (Pulli-asuinpaikka, kylpylä 1838)
   *   Rapla — Rapla County; Rapla (1241-maininta)
   *   Saare — Kaali crater; List of windmills in Estonia (Angla)
   *   Tartu — Tartu County (1030); University of Tartu (1632)
   *   Valga — Valga County; Otepää (linna 1224, lippu 1884)
   *   Viljandi — Viljandi County; Viljandi (linna 1224, järvisoutu 1928)
   *   Võru — Võru County (võrolaiset/setot, leelo 2009, savusauna 2014)
   */
  EST: {
    Harju: {
      lyhyt: 'Tallinnan vanhankaupungin 1200-luvun katuverkko on säilynyt lähes ehjänä muurien sisällä, ja se on ollut Unescon listalla vuodesta 1997.',
      pitka: `Harjumaahan kuuluu myös Lahemaan kansallispuisto, joka perustettiin 1971 Neuvostoliiton ensimmäisenä kansallispuistona ja jonka rantaniityillä ja metsissä liikkuu nykyään yhtä lailla patikoijia kuin hirviä. Lähes puolet koko Viron väestöstä asuu tällä yhdellä maakunnalla, ja Tallinnan satama tekee siitä maan vilkkaimman solmukohdan mereltä maalle. Kun isoisä kulki 1870-luvulla vanhan kaupungin kujilla, Viro oli osa Venäjän keisarikuntaa, mutta katujen keskiaikainen linjaus ja hansakauppiaiden kivitalot olivat jo tuolloin vuosisatoja vanhoja. Toisen maailmansodan pommitukset tuhosivat maaliskuussa 1944 kymmenesosan vanhan kaupungin rakennuksista, mutta jälleenrakennettu keskusta säilytti tunnelmansa niin hyvin, että Unesco otti sen maailmanperintöluetteloon 1997. Rannikon edustalla pieni Kerin saari sai vuonna 1907 maailman ensimmäisen maakaasulla toimivan majakan – pieni yksityiskohta, joka kertoo Tallinnasta jo tuolloin teknisenä edelläkävijänä.`,
    },
    Hiiu: {
      lyhyt: 'Hiidenmaan Kõpun majakka on ollut käytössä yhtäjaksoisesti vuodesta 1531 – se on yksi maailman vanhimmista yhä toimivista majakoista.',
      pitka: `Hiidenmaata peittää lähes kokonaan metsä – mänty, koivu, kuusi ja leppä vuorottelevat soiden ja rantaniittyjen kanssa, ja saarella elää kolmisenkymmentä nisäkäslajia hirvistä ilveksiin sekä lähes 250 lintulajia. Ihmisiä täällä asuu vain reilut 9 500, mikä tekee Hiidenmaasta Viron pienimmän maakunnan sekä väkiluvultaan että pinta-alaltaan. Kõpun majakka muurattiin 1500-luvun alussa paikallisesta kalkkikivestä ja jättiläislohkareista ilman laastia, ja sen valo kantaa nykyään 26 meripeninkulman päähän – kirkkaampana kuin minkään muun majakan valo maailmassa. Isoisän matkan aikaan 1870-luvulla Kõpu oli ollut käytössä jo lähes 350 vuotta, mutta vasta 2020-luvulla siihen asennettiin maailman tehokkain LED-valo. Pühalepan kirkko, jonka rakentaminen alkoi jo 1225, muistuttaa siitä, että saarella on eletty meren armoilla vuosisatojen ajan.`,
    },
    'Ida-Viru': {
      lyhyt: 'Narvan Hermannin linna ja Ivangorodin linnoitus katsovat toisiaan joen yli, ja Narvajoki on nyt Viron ja Venäjän välinen raja.',
      pitka: `Narvan lisäksi Ida-Virumaata leimaa maan alla lepäävä palavakivi, jonka louhinta ja polttaminen ovat tehneet alueesta Viron energiantuotannon sydämen – savupiiput ja voimalaitokset hallitsevat maisemaa siellä missä muualla Virossa näkee vain metsää ja peltoa. Väestö on tässä maakunnassa poikkeuksellinen: yli kaksi kolmasosaa asukkaista on etnisiltä juuriltaan venäläisiä, ainoana maakuntana koko Virossa. Narvan naapurisaarella toimi 1800-luvulta lähtien Kreenholmin puuvillatehdas, joka työllisti parhaimmillaan yli 10 000 ihmistä ja tuotti kymmenesosan koko Venäjän keisarikunnan puuvillakankaasta. Vuonna 1872, vain vuotta ennen isoisän omaa matkaa, kolera tappoi tehtaalla yli 300 työläistä, ja elokuussa satoja kutojia lakkoili paremman kohtelun puolesta – syksyllä paikalle piti lopulta kutsua kokonainen keisarillinen rykmentti rauhoittamaan tilannetta. Nykyään entisten tehtaiden ja liuskekivilouhosten rinnalle on noussut uutta teollisuutta, mutta hiljentynyt Kreenholmin tehdasalue seisoo yhä joen rannalla muistona ajasta, jolloin Narva oli koko keisarikunnan tehokkain tehdaskaupunki.`,
    },
    'Jõgeva': {
      lyhyt: 'Jõgeva on Viron kylmin paikka: siellä mitattiin 1940 maan pakkasennätys, −43,5 astetta, ja kylmyydelle on pystytetty oma muistomerkki.',
      pitka: `Jõgevamaan itälaitaa reunustaa Peipsijärvi, Euroopan suurin valtioiden välinen järvi, jonka rannoilla kalastus on elättänyt kyliä vuosisatojen ajan. Maakunta on harvaan asuttua ja rauhallista – vain reilut 27 000 ihmistä asuu alueella, joka ulottuu laajalle Keski-Viron tasangolle. Kuremaan kartano rakennettiin vuosina 1837–1843 saksalaissyntyisen von Oettingenin suvun tilalle, ja vaikka päärakennus tuhoutui tulipalossa 1986, se rakennettiin tarkasti samaan asuun uudelleen – nykyään siellä on sekä museo että kokoustiloja järven rannalla. Vanha Põltsamaan linna, jonka juuret ovat 1200-luvulla, muistuttaa siitä, että keskiajalla täälläkin käytiin valtataisteluja, vaikka nykyään rauniot ovat lähinnä kesätapahtumien näyttämö. Kesäisin järven rannalla vietetään vilkasta elämää, muun muassa vuosittaisessa Jõgevatreff-moottoripyöräleirissä, joka kerää yli tuhat kävijää.`,
    },
    'Järva': {
      lyhyt: 'Paiden linnan kuusikerroksinen Vallitorni räjäytettiin 1941, ja se rakennettiin uudelleen vasta vuosina 1990–1993.',
      pitka: `Järvamaa sijaitsee aivan Viron keskellä, ja maan tärkeimmät tie- ja rautatieyhteydet pohjoisesta etelään kulkevat sen halki. Paiden linna sai aikoinaan saksankielisen nimensä Weißenstein, valkoinen kivi, samasta paikallisesta kalkkikivestä, josta koko linnoitus 1200-luvulla muurattiin. Kaupungin tunnetuin lapsi on säveltäjä Arvo Pärt, joka syntyi Paidessa 1935 ja on sittemmin noussut yhdeksi maailman esitetyimmistä nykysäveltäjistä. Naapurikaupunki Türi on juhlinut toukokuista kukkamarkkinaansa vuodesta 1977 ja sai virallisen Viron kevätpääkaupungin arvonimen 2000 – ennen sitä kaupungin maamerkkinä oli 197-metrinen radiomasto, jonka neuvostojoukot räjäyttivät jo 1941. Maaseutu on muuten harvaan asuttua: Türi-Alliku on maakunnan suurin kylä, mutta siinäkin asuu vain reilut 350 ihmistä.`,
    },
    'Lääne-Viru': {
      lyhyt: 'Rakveren linnavuoren laidalla seisoo pronssinen alkuhärkä Tarvas, seitsemän metriä pitkä ja Baltian suurimmaksi eläinpatsaaksi sanottu.',
      pitka: `Rakveren linnavuori on ollut linnoitettuna jo 500–600-luvuilta lähtien, ja vuosisatojen saatossa se on kuulunut vuoroin Tanskan kuninkaille, Liivinmaan ritarikunnalle sekä Ruotsin ja Puolan valtakunnille – puolalaiset joukot vaurioittivat sen pahoin 1605, eikä sitä ole sen jälkeen jälleenrakennettu. Maakunnan pohjoisrannikolla levittäytyy osa Lahemaan kansallispuistoa, jonka Palmsen kartano on entisöity näyttämään 1700-luvun loistoltaan ja avattu yleisölle. Väkeä maakunnassa asuu reilut 58 000, ja lähes yhdeksän kymmenestä on virolaisia – maaseudulla eletään yhä paljolti maataloudesta ja kartanomatkailusta. Rakvere tunnettiin jo vuonna 1226 nimellä Tarvanpea, "härän pää", mistä koko kaupungin nimikin lopulta juontuu. Vaikka vanha linna seisoo raunioina, kaupungin keskiaikainen ydin ja sitä ympäröivä Vallimägi ovat nykyään suosittu kesätapahtumien näyttämö.`,
    },
    'Lääne': {
      lyhyt: 'Haapsalun piispanlinnan kappelin seinälle ilmestyy tarun mukaan elokuun täydenkuun öinä Valkoinen neito, ja silloin kaupunki juhlii.',
      pitka: `Haapsalu nousi 1800-luvulla Venäjän ylhäisön suosituksi kylpyläkaupungiksi, kun lääkäri Carl Abraham Hunnius avasi ensimmäisen mutahoitolan 1825 – tieto parantavasta mudasta levisi nopeasti Pietarin yläluokan keskuuteen, ja Venäjän keisariperhe kävi täällä toistuvasti levolla. Säveltäjä Pjotr Tšaikovski vietti Haapsalussa kesän 1867, vain muutama vuosi ennen isoisän omaa matkaa, ja sävelsi rannalla istuessaan pianosarjan nimeltä Souvenir de Hapsal. Maakuntaan kuuluu myös pieni Vormsin saari, jota asuttivat vuosisatojen ajan rannikkoruotsalaiset – ennen toista maailmansotaa saarella asui noin 3 000 ruotsinkielistä, mutta lähes koko yhteisö joutui pakenemaan tai siirtymään Ruotsiin sodan aikana. Vormsin hautausmaalla erottuvat yhä pyöreät kiviset aurinkoristit, rannikkoruotsalaisten omaperäinen hautamerkkien perinne. Nykyään Lääne maakunta on harvaan asuttu ja rauhallinen, ja Haapsalun vanha rautatieasema – aikanaan rakennettu tsaarien mittasuhteisiin – tunnetaan yhä poikkeuksellisen pitkästä katetusta laituristaan.`,
    },
    'Põlva': {
      lyhyt: 'Taevaskojan kylässä Ahjajoen rannoilla paljastuu devonikauden hiekkakiveä, joka kerrostui satoja miljoonia vuosia sitten.',
      pitka: `Suuri Taevaskoja on lähes 150 metriä pitkä ja paikoin 24 metriä korkea hiekkakivimuuri, joka paljastaa Ahjajoen rannalla devonikauden kerrostumia – ne syntyivät 419–359 miljoonaa vuotta sitten, kauan ennen kuin mitään Viron nimistä maata oli olemassa. Koko Ahjajoen laakso on nykyään suojeltu maisema-alue, jossa vaeltajat kulkevat samoja polkuja kuin sukupolvet ennen heitä. Etelämpänä Räpinan kylässä toimii Viron vanhin yhä käytössä oleva yritys, paperitehdas, joka on valmistanut paperia keskeytyksettä vuodesta 1734 – se oli toiminnassa jo kauan ennen isoisän matkaa ja seisoo yhä samalla paikalla. Maakunta on muuten harvaan asuttua metsä- ja järvimaisemaa, jossa yhdeksän kymmenestä asukkaasta on virolaisia ja elanto tulee yhä paljolti maa- ja metsätaloudesta. Taevaskojan hiekkakivikerrostumat ja Räpinan vanha tehdas muistuttavat kumpikin siitä, kuinka pitkä aika – olipa kyse kivestä tai ihmiskädenjäljestä – tässä maakunnassa yhä näkyy.`,
    },
    'Pärnu': {
      lyhyt: 'Pärnua kutsutaan Viron kesäpääkaupungiksi, ja sen pitkillä hiekkarannoilla ja kylpylöissä on käyty lomailemassa jo 1800-luvulta asti.',
      pitka: `Pärnujoen rannalla sijaitseva Pullin asuinpaikka on Viron vanhin tunnettu ihmisasutus, ajoitettu noin 8500 eaa. eli yli kymmenentuhatta vuotta sitten – pitkä historia yllättävän moderniksi mielletyssä rantakaupungissa. Kun Tarton yliopisto suljettiin sotien jaloista 1699, se toimi vuoteen 1710 asti juuri Pärnussa, ennen kuin palasi takaisin Tartoon. Kaupungin jäätön satama on tehnyt siitä tärkeän kauppapaikan Hansaliiton ajoista lähtien, ja hiekkarannat sekä mutahoidot alkoivat houkutella lomailijoita jo 1838, kun ensimmäinen kylpylaitos avattiin. Maakunnan sisämaassa Soomaa kansallispuisto suojelee laajoja soita ja tulva-alueita, joilla paikalliset ovat perinteisesti liikkuneet keväisin kanooteilla kylästä toiseen. Nykyään Pärnu tunnetaan yhtä lailla rauhallisista rantakävelyistä kuin kesäisin järjestettävästä Pohjoismaiden ja Baltian suurimmasta elektronisen tanssimusiikin festivaalista.`,
    },
    Rapla: {
      lyhyt: 'Raplan kirkko valmistui 1901 romaaniseen tyyliin, ja sitä pidetään yhtenä tyylin puhtaimmista esimerkeistä koko Virossa.',
      pitka: `Raplasta on ensimmäinen kirjallinen maininta jo vuodelta 1241, jolloin se kirjattiin Tanskan maakirjaan – kylästä kasvoi kaupunki kuitenkin vasta 1990-luvulla. Maaperä on maakunnan vaurauden lähde: kalkkikivi-, dolomiitti- ja turveesiintymät ovat ruokkineet paikallista teollisuutta, ja 1800-luvun loppupuolella kirkonkylään nousivat vuoron perään apteekki, koulu, sairaala ja tiilitehdas. Rautatie Viljandiin valmistui 1900, ja se sitoi pienen kirkonkylän osaksi laajempaa Viron rautatieverkkoa. Reilut 33 000 asukasta asuu nykyään harvassa, metsäisessä maisemassa, ja moni tunnettu virolainen – muun muassa näyttelijä Helle Meri ja koomikko Märt Avandi – on kotoisin juuri täältä. Kirkonkylän rauhallisuudesta huolimatta Rapla on aina ollut risteysasema, paikka josta tiet ja radat haarautuvat moneen suuntaan.`,
    },
    Saare: {
      lyhyt: 'Saarenmaan Kaalissa on yhdeksän meteoriittikraatteria, ja suurimman, 110 metriä leveän kraatterin pohjalla lepää pyöreä järvi.',
      pitka: `Kaali kraatteri syntyi pronssikaudella, noin 1500 vuotta ennen ajanlaskumme alkua, kun meteoriitti räjähti muutaman kilometrin korkeudessa ja iski maahan energialla, joka vastasi Hiroshiman pommia – tapahtuma jätti jälkensä myös suomalaiseen Kalevalaan, jossa kerrotaan taivaalta pudonneesta tulesta. Saarenmaan asukkaat, viikinkiaikaiset oeselilaiset, tunnettiin naapurikansojen keskuudessa pelätyistä merirosvoretkistään, ja saari taipui kristityksi vasta 1200-luvun sotien jälkeen. Anglan kylän tuulimyllymäellä seisoo yhä viisi myllyä, joista vanhimmat on rakennettu jo 1800-luvun lopulla ja nuorin 1920-luvulla, ja ne ovat säilyneet osana Saarenmaan maisemaa aina tähän päivään asti. Maakunnassa asuu reilut 31 000 ihmistä, joista lähes kaikki ovat virolaisia, ja saaren rauhallinen maaseutu tuulimyllyineen ja kiviaitoineen on tehnyt siitä suositun kesäkohteen. Kaalin kraatterijärvi on nykyään vaatimaton lampi keskellä peltoja, mutta sen synty muistuttaa siitä, että saarikin on joskus ollut osa suurempaa taivaallista draamaa.`,
    },
    Tartu: {
      lyhyt: 'Tartun yliopisto perustettiin 1632, ja maan vanhimpana yliopistona se tekee Tartusta Viron henkisen pääkaupungin.',
      pitka: `Tarton kaupungista on kirjallinen maininta jo vuodelta 1030, jolloin Kiovan-Venäjän suuriruhtinas Jaroslav Viisas perusti tänne linnoituksen retkellään tšuudien maille – kaupunki on siis yksi koko Baltian vanhimmista. Emajõgi, Viron ainoa purjehduskelpoinen joki, yhdistää kaksi suurta järveä ja virtaa kaupungin halki, mikä teki Tartosta kauppapaikan jo vuosisatoja sitten. 1980-luvun lopulla juuri Tarton opiskelijat olivat käynnistämässä laulavaa vallankumousta, joka johti lopulta Viron itsenäisyyden palauttamiseen 1991. Kaupungissa toimii yli kolmekymmentä museota, joista suurin, vuonna 1909 perustettu Viron kansallismuseo, kertoo koko kansan tarinaa maatalouden työkaluista nykypäivän teknologiaan asti. Kaupungissa asuu paljon opiskelijoita eri puolilta Viroa ja maailmaa, ja yliopistokaupungin nuorekas ilmapiiri erottaa Tarton selvästi hiljaisemmasta maaseudusta sen ympärillä.`,
    },
    Valga: {
      lyhyt: 'Valga ja Latvian Valka olivat yksi kaupunki vuoteen 1920, ja nyt niiden välinen raja ylitetään ilman aitoja ja tarkastuksia.',
      pitka: `Maakunnan itäosassa kohoava Otepää on Viron ylin kaupunki, reilut 170 metriä merenpinnan yläpuolella, ja sen linnanmäelle rakennettiin jo 1224 maan ensimmäinen kivilinnoitus. Kesäkuussa 1884 juuri Otepään Nuustakun kirkossa siunattiin lippu, josta myöhemmin tuli sinimustavalkoinen Viron lippu – vaatimattomasta maalaispitäjästä kasvoi näin koko kansallisen heräämisen symbolinen syntypaikka. Nykyään Otepää tunnetaan Viron talvipääkaupunkina, ja sen hiihtokeskukset ja -ladut houkuttelevat urheilijoita ympäri Eurooppaa. Maakunta on tuottanut myös muita merkkihenkilöitä: painonnostaja Alfred Neuland toi Virolle ensimmäisen olympiakultamitalin 1920, ja täältä kotoisin oleva taidemaalari Konrad Mägi on yksi Viron tunnetuimmista maalareista. Valgan ja Latvian Valkan välinen vanha raja-alue on siis vain yksi osa maakuntaa, jonka metsät, järvet ja mäet tekevät siitä suositun retkeily- ja hiihtoseudun.`,
    },
    Viljandi: {
      lyhyt: 'Viljandin kansanmusiikkifestivaali on Viron suurin vuotuinen musiikkijuhla, ja heinäkuun lopussa linnanraunioiden kaupunki täyttyy soitosta.',
      pitka: `Viljandin linna alkoi nousta jo 1224 Liivinmaan ritarikunnan toimesta, ja parhaimmillaan siitä kasvoi yksi koko Baltian alueen suurimmista linnoituksista – nykyään jäljellä on vaikuttavia raunioita, jotka toimivat kesäisin sekä kansanmusiikkifestivaalin että muiden tapahtumien näyttämönä. Kaupunki liittyi Hansaliittoon jo 1300-luvun alkupuolella ja toimi tärkeänä kauppapysäkkinä matkalla Venäjälle, mutta Liivinmaan sodan tuho 1500-luvulla pysäytti kasvun pitkäksi aikaa – elpyminen alkoi vasta 1700-luvulla Venäjän vallan alla. Kaupungin laidalla siintävä Viljandin järvi on ollut soutajien suosiossa jo vuodesta 1928, jolloin ensimmäinen järven ympäri soudettava kilpailu järjestettiin – nykyään tapahtuma kerää yhä noin 1 300 osallistujaa. Maakunnassa asuu reilut 45 000 ihmistä, joista yli 95 prosenttia on virolaisia, ja maaseudulla Sakalan ylängön loivat mäet vaihtuvat paikoin soihin ja järviin. Näin vanha linnakaupunki ja sen ympärillä avautuva rauhallinen maalaismaisema kertovat yhdessä Etelä-Viron pitkästä historiasta.`,
    },
    'Võru': {
      lyhyt: 'Suur Munamägi eli Iso Munamäki kohoaa 318 metriin, Baltian maiden korkeimmaksi huipuksi, ja sen laella seisoo näkötorni.',
      pitka: `Võrumaa on Viron ainoa maakunta, joka rajautuu sekä Latviaan että Venäjään, ja aivan rajaseudulla elää kaksi omaleimaista kansanryhmää, võrolaiset ja setot, joilla molemmilla on oma kielensä ja perinteensä. Setojen moniäänistä laulua, leeloa, on lauleltu polvesta toiseen ilman nuotteja, ja Unesco lisäsi sen ihmiskunnan aineettoman kulttuuriperinnön listalle 2009. Alueen savusaunaperinne – saunominen ilman piippua, savun täyttäessä koko tuvan ennen kylpyä – pääsi samalle listalle 2014, ja moni perhe lämmittää saunaansa yhä isoisiltaan opituilla tavoilla. Metsätalous, puunjalostus ja huonekaluteollisuus ovat maakunnan tärkeimpiä elinkeinoja, ja rajan läheisyys Pihkovaan ja Riikaan on perinteisesti tehnyt Võrumaasta kauppareittien risteysseutua. Vaikka Suur Munamäki nostaa maakunnan Baltian ylimmäksi kolkaksi, arkea täällä leimaa ennen kaikkea hiljainen metsäseutu ja sitkeä paikalliskulttuuri, joka on säilynyt muusta Virosta poikkeavana vuosisatojen ajan.`,
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
  /*
   * LVA PITKA (Sisältökirjuri 26.9.2026). Lähteet (en-Wikipedia,
   * tarkistettu 26.9.2026):
   *   Kurzeme — Venta Rapid (249 m); Old town of Kuldīga (Unesco 2023);
   *     Kurzeme Planning Region
   *   Latgale — Latgale; Basilica of the Assumption, Aglona; Latgalian
   *     pottery; Latgalian language
   *   Riga — Art Nouveau architecture in Riga; Albert Street, Riga;
   *     Mikhail Eisenstein
   *   Vidzeme — Gaiziņkalns (312 m); Suur Munamägi; Vidzeme Region
   *   Zemgale — Rundāle Palace (Rastrelli); Jelgava
   *
   * LVA KUVA + PIKKUKUVA (Sisältökirjuri 26.9.2026, löydös 158:n jatko):
   * sama kaava — Commons-kuva lisenssi tarkistettu API:sta, ämpäri
   * karttanostot/20260926/, pikkukuva kierrättää saman osoitteen.
   * Lähteet:
   *   Kurzeme — File:Kuldiga_Ventas_rumba_22.JPG (Zairon, CC BY-SA 4.0)
   *   Latgale — File:Aglona_Basilica.jpg (Dainis Matisons, CC BY 2.0)
   *   Riga — File:Riga_Alberta_iela_8.jpg (Pierre André Leclercq, CC BY-SA 4.0)
   *   Vidzeme — File:Gauja near Cīrulīši Nature Trails (2).jpg (AgrisR, CC BY-SA 4.0)
   *   Zemgale — File:Rundāle Palace.JPG (DavidConFran, CC BY-SA 3.0)
   */
  LVA: {
    Kurzeme: {
      lyhyt: 'Kuldīgan Ventas rumba on Euroopan levein vesiputous: vain parin metrin korkuinen mutta 249 metriä leveä, keväällä vielä leveämpi.',
      pitka: `Kurzemen maisemaa hallitsevat honka- ja kuusimetsät sekä tasainen viljelysseutu, jossa peltoja mittaa nykyäänkin ruis, peruna ja pellava aivan kuin isoisän matka-aikaan. Kuldīgan kohdalla Venta-joki levittäytyy koko uomansa leveydeltä matalaksi koskeksi – putous on tuskin ihmisen mittainen mutta ulottuu lähes kolmensadan metrin levyydeltä rannasta rantaan, ja tulva-aikaan reunat katoavat veden alle kokonaan. Jo 1600-luvulla Kuurinmaan herttua Jaakob keksi pyydystää koskessa ylävirtaan hyppäävät kalat suoraan ilmasta koreilla, ja tapa antoi Kuldīgalle lempinimen kaupunkina, jossa kalat napataan lennosta – ilmiötä käydään ihmettelemässä yhä joka kevät ja syksy. Kuldīgan puutalokeskusta, joka säilytti keskiaikaisen katuverkkonsa lähes koskemattomana, pääsi Unescon maailmanperintöluetteloon vasta 2023, ja sen rauhallisilla kujilla kulkee yhä entisen Kuurinmaan herttuakunnan hallintokaupungin tuntu. Liepāja, alueen suurin kaupunki, katsoo edelleen mereen päin, kalastuksen ja telakoiden perinteitä vaalien.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-kurzeme-e5f15942.jpg',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Zairon',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuldiga_Ventas_rumba_22.JPG',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-kurzeme-e5f15942.jpg',
    },
    Latgale: {
      lyhyt: 'Katolisen Latgalen Aglonan basilikaan saapuu joka 15. elokuuta tuhansia pyhiinvaeltajia, ja kaksi paavia on vieraillut siellä.',
      pitka: `Latgale eroaa muusta Latviasta selvästi: seutu on täynnä pieniä järviä ja mäntymetsiä, ja sen halki mutkittelee Daugava-joki idästä länteen. Kun suuri osa Latviasta on luterilaista, Latgale on pysynyt katolisena jo vastauskonpuhdistuksen ajoista lähtien, ja tämä näkyy kylien tienvarsiristeissä ja kirkkojen tornien tiheydessä. Joka vuoden 15. elokuuta Aglonan barokkibasilikaan saapuu tuhansia pyhiinvaeltajia Neitsyt Marian taivaaseenoton juhlaan, ja paikka on niin merkittävä katolinen pyhättö, että sekä paavi Johannes Paavali II (1993) että paavi Franciscus (2018) ovat vierailleet siellä. Alueella puhutaan yhä latgalin kieltä, jota osa kielitieteilijöistä pitää omana kielenään latvian sijasta, ja sen rinnalla elää vuosisataista savenvalajien perinnettä – latgalilainen keramiikka tunnetaan tummista, ruskeista ja mustista lasitteistaan. Daugavpils, alueen suurin kaupunki ja ainoan yliopiston kotipaikka, on tästä huolimatta monikulttuurinen risteysasema Venäjän ja Valko-Venäjän rajan tuntumassa.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-latgale-a66101c1.jpg',
          lahde: 'Dainis Matisons, Wikimedia Commons (CC BY 2.0)',
          tekija: 'Dainis Matisons',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aglona_Basilica.jpg',
          lisenssi: 'CC BY 2.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-latgale-a66101c1.jpg',
    },
    Riga: {
      lyhyt: 'Noin kolmasosa Riian keskustan taloista on jugendia – kaupungissa on kenties maailman tihein jugendrakennusten keskittymä.',
      pitka: `Riika on Latvian pääkaupunki ja koko Baltian suurin kaupunki, ja sen vanha keskusta levittäytyy Väinäjoen suulle keskiaikaisten kirkontornien ja kivikatujen varaan. Kaupungin ydin on kuitenkin yllättävän nuori tyyliltään: noin kolmasosa keskustan taloista on jugendia, ja Riikaa pidetäänkin yhtenä tiheimmän jugendrakennuskannan kaupunkina koko maailmassa. Komeimmat julkisivut löytyvät Alberta iela -kadulta, jonka viisi taloa suunnitteli arkkitehti Mihail Eisenstein 1900-luvun alussa – hänen poikansa Sergei Eisensteinistä tuli myöhemmin yksi elokuvahistorian tunnetuimmista ohjaajista. Isoisän kulkiessa seudulla 1873 tätä katua ja sen koristeellisia julkisivuja ei vielä ollut: suurin osa jugendtaloista nousi vasta vuosina 1904–1914, kun Riika kasvoi huimaa vauhtia Venäjän keisarikunnan viidenneksi suurimmaksi kaupungiksi. Nykyään koko vanhakaupunki jugendkortteleineen kuuluu Unescon maailmanperintöön, ja Alberta iela on edelleen suosituin kävelyreitti tyylin ihailijoille.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-riga-86314b3c.jpg',
          lahde: 'Pierre André Leclercq, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'Pierre André Leclercq',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Riga_Alberta_iela_8.jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-riga-86314b3c.jpg',
    },
    Vidzeme: {
      lyhyt: 'Latvian korkein kohta Gaiziņkalns jää 312 metriin, ja Viron huipun päihittämään rakennettu torni purettiin keskeneräisenä 2012.',
      pitka: `Vidzeme on Latvian pohjoisosan mäkistä ylänköä, jossa pienet moreenijärvet pilkottavat metsien välistä ja Gauja-joki on kaivertanut laaksoonsa niin jyrkkiä hiekkakivijyrkänteitä, että aluetta kutsutaan Latvian Sveitsiksi. Alue on myös maan etnisesti latvialaisin kolkka – noin 85 prosenttia asukkaista on latvialaisia – ja suurin kaupunki Valmiera tunnetaan vilkkaana opiskelijakaupunkina joen rannalla. Ylängön korkein kohta, 312-metrinen Gaiziņkalns, on koko Latvian korkein piste, mutta jäi silti kolme metriä matalammaksi kuin Viron puolen naapurihuippu Suur Munamägi. Kunnianhimo korjata tämä johti 2000-luvulla 45-metrisen näkötornin rakentamiseen mäen laelle, mutta hanke jäi kesken, torni todettiin vaaralliseksi ja purettiin lopulta 2012. Nykyään Gaiziņkalnsille kiipeää silti retkeilijöitä pelkän maiseman vuoksi, ja Gaujan kansallispuiston jyrkänteet, luolat ja keskiaikaiset linnanraunioit tekevät koko Vidzemestä yhden Latvian suosituimmista retkeilyseuduista.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-vidzeme-cca1f570.jpg',
          lahde: 'AgrisR, Wikimedia Commons (CC BY-SA 4.0)',
          tekija: 'AgrisR',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gauja near Cīrulīši Nature Trails (2).jpg',
          lisenssi: 'CC BY-SA 4.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-vidzeme-cca1f570.jpg',
    },
    Zemgale: {
      lyhyt: 'Rundālen barokkipalatsin suunnitteli Bartolomeo Rastrelli Kuurinmaan herttualle, ja sen entisöinti kesti vuodesta 1972 vuoteen 2015.',
      pitka: `Zemgale on Latvian viljakammio: alue on lähes täysin tasaista, mustan ja hedelmällisen maaperän peittämää lakeutta, jota reunustavat vain joenvarsimetsät ja kylätiet. Keskellä lakeutta kohoaa Rundālen palatsi, jonka Pietarin talvipalatsistakin tunnettu arkkitehti Bartolomeo Rastrelli suunnitteli 1700-luvulla Kuurinmaan herttua Ernst Johann von Bironille – rakennus on niin komea, että sitä kutsutaan usein Latvian Versaillesiksi. Palatsin vaiheet eivät ole olleet pelkkää loistoa: neuvostoaikana herttuan valtaistuinsalissa säilytettiin viljaa ja juhlasalista tehtiin koulun liikuntasali, ja koko rakennuksen kunnostus kesti vuodesta 1972 aina vuoteen 2015 asti. Nykyään palatsin ranskalaispuutarhassa kukkii yksi Pohjois-Euroopan suurimmista ruusutarhoista, yli 2 300 lajiketta, ja Jelgava, alueen suurin kaupunki, oli aikoinaan koko Kuurinmaan ja Semgallian herttuakunnan pääkaupunki – muistuma ajasta, jolloin herttuat hallitsivat tätä lakeutta tästä samasta seudusta käsin.`,
      kuva: [
        {
          osoite: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-zemgale-056e13fb.jpg',
          lahde: 'DavidConFran, Wikimedia Commons (CC BY-SA 3.0)',
          tekija: 'DavidConFran',
          lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rundāle Palace.JPG',
          lisenssi: 'CC BY-SA 3.0',
          lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
      ],
      pikkukuva: 'https://media.matkakirja.app/karttanostot/20260926/lva-maakunta-zemgale-056e13fb.jpg',
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
  /*
   * LTU PITKA (Sisältökirjuri 26.9.2026). Lähteet (en-Wikipedia,
   * tarkistettu 26.9.2026):
   *   Alytaus — Dzūkija; Dainava Forest; White Rose Bridge (2016)
   *   Kauno — Kaunas Castle; Ninth Fort / Ninth Fort massacres (1941)
   *   Klaipedos — Klaipėda County (Meripihkatie, hallitsijat, liitos 1923)
   *   Marijampoles — Suvalkija/Sudovia (savimaa, vauraus 1800–1900-l.)
   *   Panevezio — Juozas Miltinis Drama Theatre
   *   Šiauliai — Šiauliai (Saulen taistelu 1236, Tyzenhaus, tulipalo 1872)
   *   Taurages — Panemunė Castle; Convention of Tauroggen (1812)
   *   Telšiai — Telšiai (Mastis-järvi); Samogitian dialect
   *   Utenos — Molėtai Astronomical Observatory (1969, 1,65 m kaukoputki)
   *   Vilniaus — Trakai Island Castle; Trakai Kenesa / Karaite-artikkelit
   */
  LTU: {
    Alytaus: {
      lyhyt: 'Druskininkain lähellä Grūtasin puistoon on koottu kaadettuja neuvostopatsaita, ja puiston perustaja sai 2001 Ig Nobelin rauhanpalkinnon.',
      pitka: `Alytusin ympärillä leviää Dzūkijan mäntymetsien meri: lähistöllä kasvaa Dainavan metsä, Liettuan suurin yhtenäinen ikimetsä, ja koko seutu tuoksuu pihkalta ja sienimetsältä. Hiekkainen maaperä on aina ollut karua viljelijälle, joten paikalliset ovat vuosisatoja täydentäneet satoaan metsän antimilla – vanha sanonta väittää, ettei dzūkkitytöllä olisi vaatteita ilman sieniä ja marjoja. Kaupungin halki virtaa Nemunas-joki, jonka yllä kohoaa Valkoisen ruusun silta, Liettuan korkein kävely- ja pyöräilysilta, 38 metriä korkealla ilmassa. Silta avattiin vasta 2016, joten se on aivan uusi lisä maisemaan, joka on muuten pysynyt mäntyjen ja hiekan hallitsemana ties kuinka kauan.`,
    },
    Kauno: {
      lyhyt: 'Kaunas oli sotien välillä Liettuan väliaikainen pääkaupunki, ja sen modernistinen arkkitehtuuri pääsi Unescon listalle 2023.',
      pitka: `Kaunas kohoaa kahden joen kärjessä, siinä missä Nemunas ja Neris yhtyvät – paikka oli niin strateginen, että tänne nousi jo 1300-luvulla goottilainen Kaunasin linna, yksi Liettuan vanhimmista tiililinnoista ja ainoa, jossa on kaksinkertainen puolustusmuuri. Linnasta on nykyisin pystyssä enää noin kolmasosa, mutta rauniot ja niitä ympäröivä puisto ovat suosittu kohtaamispaikka jokirannassa. Kaupungin toisella laidalla seisoo 1900-luvun alussa valmistunut Yhdeksäs linnake, joka toimi vuodesta 1924 vankilana ja josta tuli natsimiehityksen aikana yksi Euroopan synkimmistä paikoista – siellä surmattiin 45 000–50 000 juutalaista, suurin osa Kaunasin geton asukkaita. Nykyään paikka on museo ja muistomerkki, joka pysäyttää kävijän hiljaisuudellaan, aivan toisenlainen puoli samasta kaupungista, joka 1920-luvulla puki ylleen kevyen modernistisen kasvonsa.`,
    },
    Klaipedos: {
      lyhyt: 'Kapea, 98 kilometrin Kuurinkynnäs erottaa Kuurin lahden Itämerestä, ja sen vaeltavat dyynit hautasivat aikanaan alleen kokonaisia kyliä.',
      pitka: `Klaipėda syntyi kauppasatamana Meripihkatien varrella jo keskiajalla, ja sen historia on yhtä kerroksellinen kuin sen hallitsijoiden luettelo: kaupunkia ovat vuorotellen hallinneet Saksalainen ritarikunta, Preussi ja Saksan keisarikunta, kunnes se liitettiin Liettuaan vasta vuonna 1923. Satama on jäätön ympäri vuoden, ja se on vuosisatoja ollut koko Liettuan tärkein yhteys merelle – sen kautta on kulkenut kaikki meripihkasta puutavaraan. Kaupungin saksalaisaikainen nimi Memel elää yhä monissa vanhoissa kortteleissa, vaikka valtapiirit ovat vaihtuneet moneen kertaan viimeisen sadan vuoden aikana. Nykyisin Liettuan kolmanneksi suurin kaupunki tuntuu satamakaupungilta joka kolkassa: nosturit, laivat ja suolainen tuuli kuuluvat arkeen aivan yhtä lailla kuin Kuurinkynnäänkin hiekkadyynit.`,
    },
    Marijampoles: {
      lyhyt: 'Marijampolė on kaupan ja kevyen teollisuuden keskus, ja siellä toimii yksi Euroopan suurimmista käytettyjen autojen toreista.',
      pitka: `Marijampolė sijaitsee Sūduvan eli Suvalkijan sydämessä, ja jos Aukštaitija tunnetaan järvistään ja Žemaitija metsistään, tämä alue tunnetaan pelloistaan: jääkauden jättämä savimaa on yksi Pohjois-Euroopan hedelmällisimmistä, ja seutu on ollut viljan aittaa sukupolvien ajan. Täkäläiset talonpojat vapautuivat maaorjuudesta muuta Liettuaa aiemmin, ja hyvä maaperä sekä ahkeruus tekivät 1800–1900-lukujen vaihteessa sūduvalaisista maan varakkainta maalaisväestöä. Nykyisin sama yritteliäisyys näkyy toisenlaisessa muodossa kaupungin laidalla, missä yksi Euroopan suurimmista käytettyjen autojen kaupoista vetää ostajia ympäri Itä-Eurooppaa. Pellot jatkuvat silmänkantamattomiin joka suuntaan, ja kesäisin maisema muuttuu keltaisen rapsin ja vihreän vehnän täplittämäksi tilkkutäkiksi.`,
    },
    Panevezio: {
      lyhyt: 'Biržain seudulla on noin 9 000 vajoamakuoppaa, jotka syntyvät kun pohjavesi liuottaa kipsiä maan alta – uusia ilmestyy joka vuosi.',
      pitka: `Panevėžys on tunnettu teatterikaupunkina, ja sen sydämenä sykkii Juozas Miltinis -draamateatteri, jonka maine kantautui aikanaan yli koko Neuvostoliiton. Ohjaaja Miltinis johti teatteria vuodesta 1940 lähtien – välillä ideologisista syistä erotettuna – ja loi siitä niin omaperäisen näyttämötaiteen keskuksen, että katsojat matkustivat sinne kaukaakin pelkän ohjelmiston vuoksi. Kaupunki itse lepää Nevėžis-joen rannalla laakeassa maakunnassa, jonka pellot ja mäntymetsät vaihtelevat rauhallisesti toisikseen. Teatterin rakennus seisoo yhä keskustassa, ja sen katsomo täyttyy edelleen, vaikka Miltinis itse kuoli jo 1994 – teatteri nimettiin hänen mukaansa kunnianosoituksena pian sen jälkeen.`,
    },
    'Šiauliai': {
      lyhyt: 'Šiauliain pohjoispuolella Ristien mäellä seisoo arviolta 100 000 ristiä, joita pyhiinvaeltajat ovat tuoneet sinne 1800-luvulta asti.',
      pitka: `Šiauliain nimi juontuu muinaisesta aurinkojumalatar Saulėsta, ja kaupungin syntyhetkeksi lasketaan usein vuoden 1236 Saulen taistelu, jossa liettualaiset ja liiviläiset kukistivat Miekkaveljien ritarikunnan. Keskiajan jälkeen kaupunki koki toistuvia sotia ja ruttoepidemioita, kunnes 1700-luvun lopulla kreivi Antoni Tyzenhaus suunnitteli sen uudelleen säännölliseksi, klassistiseksi kaupungiksi – sama ruutukaava näkyy keskustassa yhä. Vuoden 1872 suurpalon jälkeen Šiauliaihin nousi tehtaita, jotka valmistivat kaikkea silkistä suklaaseen, ja vuoteen 1897 mennessä kaupunki oli jo Liettuan toiseksi suurin Kaunasin jälkeen. 'Auringon kaupunki' on nykyään Liettuan neljänneksi suurin, ja sen ruutukaavainen keskusta sekä tiiliset tehdasrakennukset kertovat yhä siitä, miten paljon kaupunki nousi tuhkasta juuri isoisän oman ajan kynnyksellä 1870-luvulla.`,
    },
    Taurages: {
      lyhyt: 'Tauragėssa preussilainen kenraali Yorck julisti 1812 joukkonsa puolueettomiksi, mikä mursi Preussin ja Napoleonin liiton.',
      pitka: `Tauragės-maakunnan läpi virtaa Nemunas-joki, ja sen oikealla rannalla Jurbarkassa kohoaa Panemunės linna – 1600-luvun alussa rakennettu renessanssilinnoitus, jonka Eperyaszin aatelissuku rakennutti vuosina 1604–1610 kauppareitin suojaksi. Linna vaihtoi omistajaa vuosisatojen varrella ja siirtyi lopulta 1980-luvulla Vilnan taideakatemialle, joka avasi sinne museon ja näyttelytiloja. Samalla seudulla solmittiin vuonna 1812 niin kutsuttu Tauroggenin sopimus, ja se tunnetaan historiankirjoissa käännekohtana, josta alkoi koko Preussin vapaussota Napoleonia vastaan. Nykyisin rauhallinen raja- ja maatalousmaakunta muistuttaa vanhoilla linnoillaan ja hiljaisilla kylillään siitä, että Nemunas on vuosisatojen ajan ollut sekä kauppareitti että valtakuntien raja.`,
    },
    'Telšiai': {
      lyhyt: 'Plateliaijärven lähellä metsässä piilee Neuvostoliiton ensimmäinen maanalainen ydinohjustukikohta – nyt kylmän sodan museo, jonka siiloon pääsee.',
      pitka: `Telšiai on Žemaitijan eli Samogitian pääkaupunki, ja se lepää kauniisti Mastis-järven rannalla – kaupungin nimikin juontuu vanhasta sanasta telkšoti, joka tarkoittaa veden alle jäämistä tai lammikoitumista. Seudun ihmiset puhuvat žemaičių murretta, joka eroaa yleiskielestä niin paljon, että moni muualta tuleva liettualainen tuskin ymmärtää sitä – murre ja oma identiteetti ovat säilyneet täällä poikkeuksellisen elinvoimaisina. Kaupunki on toiminut katolisen hiippakuntansa keskuksena vuodesta 1926, ja mäellä kohoava tuomiokirkko hallitsee yhä näkymää järven yli. Monelle liettualaiselle Telšiai on Žemaitijan henkinen pääkaupunki siinä missä se on virallinenkin maakuntakeskus.`,
    },
    Utenos: {
      lyhyt: 'Utenan seudulla on yli tuhat järveä, ja Aukštaitijan kansallispuistossa lepää Liettuan syvin järvi Tauragnas, 60,5 metriä syvä.',
      pitka: `Utenan seutu kuuluu Aukštaitijaan, Liettuan järvirikkaimpaan maisemaan, ja samaa pimeää ja kirkasta taivasta hyödyntää myös Molėtain tähtitieteellinen observatorio, joka on toiminut Vilnan yliopiston tutkimusasemana vuodesta 1969. Sen suurin kaukoputki on halkaisijaltaan 1,65 metriä, ja observatorio ottaa vastaan myös yleisöä tähtitornin kierroksilla. Paikka on valittu juuri tälle Kaldiniai-kukkulalle Molėtain lähelle, koska kaupunkien valosaaste ei täällä häiritse tähtien tarkkailua. Päivällä maisema on täynnä kimaltavia vesiä, mutta pimeän tultua sama taivas avautuu tutkijoille yhtä laajana kuin järvet maassa.`,
    },
    Vilniaus: {
      lyhyt: 'Vilnan Užupis julistautui 1. huhtikuuta 1997 omaksi tasavallakseen, ja sen lipun kämmen vaihtaa väriä vuodenajan mukaan.',
      pitka: `Noin 28 kilometrin päässä Vilnasta, Galvė-järven saarella, kohoaa Trakain linna – yksi harvoista saarilinnoista koko Euroopassa. Sen rakentaminen alkoi 1300-luvulla suurruhtinas Kęstutiksen aikana, ja hänen poikansa Vytautas Suuri viimeisteli sen punaisesta goottilaisesta tiilestä 1400-luvun alussa; Vytautas myös kuoli tässä samassa linnassa vuonna 1430. Trakaihin toi vuonna 1392 Vytautas myös toisenlaisen aarteen: joukon karaiimeja Krimiltä, ja heidän jälkeläisensä asuvat kaupungissa yhä, puhuvat omaa turkkilaista kieltään ja pitävät Trakaita koko maailman karaiimiyhteisön keskuksena. Vilnan maakunta kätkee siis pääkaupungin lisäksi keskiaikaisen saarilinnan ja yli 600 vuotta säilyneen ainutlaatuisen vähemmistökulttuurin – aivan eri tarinan kuin Užupiksen huhtikuun pila.`,
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
  /*
   * SVN PITKA (Sisältökirjuri 26.9.2026). Lähteet (en-Wikipedia,
   * tarkistettu 26.9.2026):
   *   Gorenjska — Upper Carniola Statistical Region; Triglav
   *   Goriška — Goriška; GO! 2025; Gorizia (1947-jako)
   *   Jugovzhodna Slovenija — Novo Mesto; Situla
   *   Koroška — Carinthia Statistical Region; King Matjaž
   *   Notranjsko-kraška — Lake Cerknica (Valvasor)
   *   Obalno-kraška — Lipizzan (1580)
   *   Osrednjeslovenska — Ljubljana (Laibach, 1857-rautatie,
   *     Jason-legenda, maanjäristys 1895)
   *   Podravska — Old vine (Maribor, žametovka)
   *   Pomurska — Mura Statistical Region; Prekmurska gibanica (2010)
   *   Savinjska — Counts of Celje (vaakuna 1991)
   *   Spodnjeposavska — Krško Nuclear Power Plant
   *   Zasavska — Trbovlje Power Station (kaivosyhtiö 1872)
   */
  SVN: {
    Gorenjska: {
      lyhyt: 'Bledinjärven saarelle soudetaan käsin tehdyillä pletna-veneillä, ja kirkolle nousee 99 kiviaskelmaa – perillä voi soittaa toivekelloa.',
      pitka: `Alue leviää Slovenian koillisosaan Alpeille, ja sen taivaanrantaa hallitsee Triglav, koko maan korkein huippu ja niin tärkeä kansallissymboli, että se komeilee myös maan lipussa ja vaakunassa. Kranj on alueen suurin kaupunki, mutta yhtä tunnettuja ovat keskiaikainen Škofja Loka ja rautatehtaistaan kasvanut Jesenice aivan Itävallan rajan tuntumassa. Alueella vietetään lähes viidennes koko Slovenian matkailuöistä, ja suurin osa yöpyjistä tulee ulkomailta – harva kolkka tarjoaa yhtä tiivistä pakettia jylhiä huippuja, kirkkaita järviä ja vanhoja kyliä. Melkein koko Gorenjska kuuluu alppimaastoon, ja moni patikoi täällä nimenomaan tavoitellakseen Triglavin huippua, jonne pääsy on pitkään ollut eräänlainen kansallinen kunnia-asia.`,
    },
    'Goriška': {
      lyhyt: 'Nova Gorica ja italialainen Gorizia olivat yhdessä Euroopan kulttuuripääkaupunki 2025, ja rautatieaseman aukiolla raja kulkee keskeltä.',
      pitka: `Alue kulkee Italian rajaa pitkin, ja sen tunnetuimpia maisemia ovat Sočan kirkkaanturkoosi laakso Julian Alppien juurella sekä eteläisempi, viinitarhojen peittämä Vipavan laakso. Isoisän aikaan 1870-luvulla koko seutu kuului yhteen ainoaan Itävalta-Unkarin kaupunkiin, Goriziaan – vasta toisen maailmansodan jälkeen, Pariisin rauhansopimuksessa 1947, raja piirrettiin niin, että vanha Gorizia jäi Italialle ja Jugoslavian puolelle rakennettiin kokonaan uusi kaupunki, Nova Gorica. Vuonna 2025 näistä kahdesta naapurikaupungista tuli historian ensimmäinen yhteinen, rajat ylittävä Euroopan kulttuuripääkaupunki, ja koko juhlavuoden teemana oli rajattomuus. Kivinen raja kulkee yhä kaupunkien halki, mutta nykyisin sen yli kävellään huomaamatta, kahvikupposen tai junan perässä.`,
    },
    'Jugovzhodna Slovenija': {
      lyhyt: 'Krkan mutkaan rakennettua Novo Mestoa kutsutaan situlojen kaupungiksi, sillä sen maista on kaivettu esiin rautakautisia pronssiastioita.',
      pitka: `Krkajoki tekee kaupungin kohdalla jyrkkiä mutkia, ja vanha keskusta kohoaa niiden keskellä kuin saarelle – nimikin, Novo Mesto, tarkoittaa yksinkertaisesti "uutta kaupunkia". Alueen rautakautiset asukkaat olivat täällä kauan ennen keskiaikaista kaupunkia: Novo Mestoa kutsutaan "situlojen kaupungiksi", koska sen ympäristön kalmistoista on kaivettu esiin enemmän koristeltuja pronssiämpäreitä kuin mistään muualta Euroopasta samalta ajalta. Ämpäreiden kylkiin on lyöty kulkueita, eläimiä ja juhlamenoja niin tarkasti, että tutkijat pystyvät niistä lukemaan yli 2000 vuoden takaisen yhteiskunnan arkea. Nykyään kaupunkia elättävät pikemminkin tehtaat kuin pronssiseppien pajat – Novo Mesto on Slovenian autoteollisuuden ja lääketeollisuuden yksi keskus, ja sen vaurauden juuret ovat yhtä lailla liukuhihnoissa kuin muinaisissa kauppareiteissä.`,
    },
    'Koroška': {
      lyhyt: 'Pecan vuoren luolaan on asetettu pronssinen kuningas Matjaž, sillä tarun mukaan hän nukkuu vuoren uumenissa Itävallan rajalla.',
      pitka: `Koroška on Slovenian pohjoisin kolkka, ahdas ja vuoristoinen kaista Itävallan rajaa vasten – niin syrjäinen, että sitä pidetään yhä huonoiten muuhun Sloveniaan yhteydessä olevana alueena. Suurin kaupunki on Slovenj Gradec, mutta laaksoja on vuosisatoja hallinnut raskas teollisuus: Pecan juurella sijaitsevasta Mežican kaivoksesta louhittiin lyijyä ja sinkkiä yli vuosisadan ajan, ja kaivostoiminta muovasi koko seudun maisemaa. Legenda uinuvasta kuningas Matjažista syntyi juuri tässä ahtaudessa: tarinan mukaan hän vetäytyi satapäisine sotureineen Pecan luoliin hävittyään sodan, ja hänen sanotaan heräävän vasta kun hänen partansa on kiertänyt yhdeksän kertaa kivipöydän ympäri. Vaikka moni kaivos on jo sammunut, tarina elää yhä matkailuesitteissä ja lasten iltasaduissa koko Sloveniassa.`,
    },
    'Notranjsko-kraška': {
      lyhyt: 'Cerknicanjärvi on täytenä Slovenian suurin järvi, mutta kuivina kesinä sen vesi voi valua kokonaan maanalaisiin onkaloihin.',
      pitka: `Notranjsko-kraška-alueen sydämessä makaa Cerknicanjärvi, joka ei ole tavallinen järvi lainkaan: se täyttyy sateiden mukana ja tyhjenee jälleen maan alle vievien kuilujen kautta, ja täytenä se voi kasvaa Slovenian suurimmaksi järveksi. Ilmiön kuvasi tieteellisesti jo 1600-luvulla paikallinen luonnontutkija Janez Vajkard Valvasor, jonka havainnot järven ajoittaisesta katoamisesta veivät hänet Lontoon Royal Societyn jäseneksi asti – ja juuri täältä ovat peräisin kansainvälisetkin termit kuten "karst-polje". Isoisän matka-aikana 1870-luvulla Valvasorin kuvaukset olivat jo vakiintunutta lukemistoa Krainin herttuakunnasta kiinnostuneille, joten hän saattoi tuntea järven maineen jo ennen saapumistaan. Kun vesi laskee kesällä, pohjalle jää vehreä niitty laiduneläimille, ja kun sateet palaavat syksyllä, kalat ja linnut ilmestyvät järvelle uudestaan ikään kuin tyhjästä.`,
    },
    'Obalno-kraška': {
      lyhyt: 'Karstin Lipicaan perustettiin hevostila 1580, ja siellä syntyi lipizzanrotu – tilalla kasvatetaan yhä ratsuja kouluratsastukseen.',
      pitka: `Vaikka Obalno-kraška-aluetta hallitsee kalkkikivinen Karst-ylänkö täynnä maanalaisia luolastoja, sen läntinen reuna avautuu mereen: rannalla kohoavat keskiaikainen Piranin niemi ja Koperin satamakaupunki. Lipican hevostilalle tuotiin perustamisvuonna yhdeksän oritta ja 24 tammaa Espanjasta, ja juuri näistä eläimistä polveutuu koko lipizzanerrotu, joka syntyy tummana ja vaalenee vasta vuosien myötä valkoiseksi. Isoisän aikaan 1870-luvulla Lipican hevoset olivat jo vuosisatojen ajan toimittaneet ratsujaan Wienin kuuluisaan espanjalaiseen ratsastuskouluun, joten samojen sukulinjojen edustajat saattoivat esiintyä keisarikunnan pääkaupungin areenalla juuri silloin kun isoisä matkasi Eurooppaa. Tila on kasvattanut samaa hevossukua katkeamatta jo yli neljä vuosisataa, mikä tekee siitä Euroopan vanhimman yhä toimivan hevoskasvattamon.`,
    },
    Osrednjeslovenska: {
      lyhyt: 'Ljubljanan suolta löytyi 2002 yli 5 000 vuotta vanha puupyörä, vanhin koskaan löydetty – sen voi nähdä kaupunginmuseossa.',
      pitka: `Ljubljana, koko Slovenian pääkaupunki, kasvoi kerran roomalaisesta Emona-nimisestä kaupungista Ljubljanica-joen rannalle, siihen kohtaan jossa joki laskee alavalle suoalueelle, Ljubljansko barjelle. Isoisän matkatessa Eurooppaa 1870-luvulla kaupunki tunnettiin vielä saksankielisellä nimellään Laibach ja toimi Krainin herttuakunnan pääkaupunkina osana Itävalta-Unkaria; sen läpi kulki jo tuolloin Wienin ja Triesten välinen rautatie, jonka viimeinenkin osuus valmistui vuonna 1857 ja teki Laibachista tärkeän pysähdyspaikan matkalla etelään kohti Adrianmerta. Kaupungin tunnuksena liehuu yhä lohikäärme, jonka legenda yhdistää kreikkalaiseen sankari Jasoniin: tarun mukaan Argonautit purjehtivat Ljubljanicaa pitkin ja Jason kukisti täällä hirviön, josta myöhemmin tuli kaupungin vaakunaeläin. Suuri maanjäristys tuhosi vuonna 1895 kymmenesosan kaupungin rakennuksista, ja jälleenrakennuksen myötä keskustaan nousi runsaasti art nouveau -julkisivuja, jotka antavat Ljubljanalle yhä sen tunnusomaisen ilmeen.`,
    },
    Podravska: {
      lyhyt: 'Mariborin Lentin rannassa kasvaa yli 400 vuotta vanha žametovka-köynnös, jota pidetään maailman vanhimpana viiniköynnöksenä.',
      pitka: `Podravska-alue seuraa Draava-jokea, ja sen laajoja rinteitä peittää Pohorjen metsäinen vuoristo, mutta maakunnan sydän sykkii Mariborissa, Slovenian toiseksi suurimmassa kaupungissa. Kaupungin vanha köynnös kasvaa yhä samalla paikalla kuin isoisän aikaan 1870-luvulla, sillä se juurtui talon seinustalle jo keskiajan lopulla ottomaanien uhatessa seutua – Guinnessin ennätyskirja tuntee sen nykyään maailman vanhimpana viininä, joka yhä antaa satoa. Joka syksy köynnöksestä korjataan vain 35–55 kiloa rypäleitä, ja niistä puristettu viini pullotetaan pieniin, taiteilija Oskar Kogojin suunnittelemiin 2,5 desilitran pulloihin, joita jaetaan protokollalahjoina – vain sata pulloa vuodessa. Mariborin ympärillä levittäytyy muutenkin viininviljelyn maisema, ja kaupungin oma viinitie kiemurtelee mäkien halki aina Itävallan rajalle asti.`,
    },
    Pomurska: {
      lyhyt: 'Prekmurje kuului vuosisatoja Unkariin ja liitettiin vasta 1919, ja sen monikerroksinen gibanica-leivos on EU:n suojaama herkku.',
      pitka: `Pomurska on Slovenian koillisin kolkka, tasainen Muran ja sen sivujokien muovaama lakeus, jota pohjoisessa reunustavat Goričkon kumpuilevat kukkulat ja etelässä viinitarhat. Isoisän aikaan 1870-luvulla koko seutu kuului Unkarin kuningaskuntaan osana Itävalta-Unkaria eikä Sloveniaan lainkaan – vasta ensimmäisen maailmansodan jälkeen, vuosina 1919–1920, alue irrotettiin Unkarista ja liitettiin uuteen eteläslaavien valtioon. Tuo pitkä unkarilaisvaihe näkyy yhä paikallisessa ruokakulttuurissa: alueen oma monikerroksinen leivos, unikko-, omena-, raejuusto- ja pähkinätäytteillä kerrostettu prekmurska gibanica, sai vuonna 2010 EU:n perinnetuotesuojan, joka vaatii tarkkaa reseptiuskollisuutta. Vaikka pellot tuottavat täällä enemmän viljaa kuin missään muualla Sloveniassa, alue kärsii silti heikoimmasta liikenneyhteydestä ja bruttokansantuotteesta koko maassa – rikkaus kasvaa maasta, mutta ei aina taskuun asti.`,
    },
    Savinjska: {
      lyhyt: 'Slovenian vaakunan kolme kultaista tähteä sinisellä pohjalla ovat Celjen keskiaikaisten kreivien perintöä – ne otettiin vaakunaan 1991.',
      pitka: `Savinjska-alueen sydämessä sijaitseva Celje oli keskiajalla paljon nykyistä merkittävämpi kaupunki: siellä hallitsi Celjen kreivien suku, joka 1400-luvulla kohosi Pyhän saksalais-roomalaisen keisarikunnan ruhtinaiksi asti ja hallitsi maita aina nykyisen Kroatian ja Bosnian alueelle saakka. Suvun viimeinen jäsen, Ulrich II, murhattiin Belgradissa vuonna 1456, ja kun miespuolinen linja sammui, kreivikunnan perintö siirtyi Habsburgeille perintösopimuksen nojalla. Isoisän aikaan 1870-luvulla kreivien vanha vaakuna – kolme kultaista tähteä sinisellä pohjalla – oli enää paikallinen heraldinen kuriositeetti Celjen linnan raunioilla, sillä siitä tuli koko itsenäisen Slovenian kansallistunnus vasta vuonna 1991. Nykyisin samat tähdet loistavat Slovenian lipussa ja vaakunassa, ja Celjen linnan tornista avautuu näkymä koko Savinja-joen laaksoon, joka kerran kuului yhdelle keskiajan mahtavimmista aatelissuvuista.`,
    },
    Spodnjeposavska: {
      lyhyt: 'Krškon ydinvoimala on Slovenian ja Kroatian yhteinen, ja se tuottaa yli neljänneksen koko Slovenian sähköstä.',
      pitka: `Spodnjeposavska on Slovenian toiseksi pienin alue, jota Sava- ja Krka-joet virtaavat kukkuloiden ja viinitarhojen läpi kohti Kroatian rajaa. Suurin kaupunki on Brežice, mutta seudun tunnetuin rakennelma sijaitsee Krškossa: siellä toimii maan ainoa ydinvoimala, jonka Slovenia ja Kroatia rakensivat yhdessä 1970-luvulla silloisen Jugoslavian aikana ja joka tuottaa yhä yli neljänneksen koko Slovenian sähköstä ja viidenneksen Kroatian sähköstä. Maiden hallitukset sopivat vuonna 2020 voimalan käytön jatkamisesta aina vuoteen 2043 saakka, joten rakennus, joka kytkettiin verkkoon jo 1981, on määrä pysyä käynnissä yli kuusi vuosikymmentä. Aivan voimalan liepeillä kylpylävieraat uppoutuvat sen sijaan Čatežin lämpimiin altaisiin, sillä sama Sava-joen laakso tunnetaan yhtä lailla Slovenian suosittuna kylpylä- ja viinimatkailun kolkkana.`,
    },
    Zasavska: {
      lyhyt: 'Trbovljen voimalan 360-metrinen savupiippu on Euroopan korkein, ja se seisoo yhä laakson maamerkkinä, vaikka voimala on suljettu.',
      pitka: `Zasavska on Slovenian pienin ja taloudellisesti köyhin alue, ahdas laakso Savan varrella Ljubljanan ja Celjen välissä. Hiiltä alettiin louhia Trbovljessa vuonna 1804, ja seudusta tuli 1800-luvun puolivälissä koko silloisen alueen hiiliteollisuuden keskus – erityisesti sen jälkeen, kun rautatie Celjestä Trbovljen kautta Ljubljanaan valmistui vuonna 1849 ja avasi hiilelle markkinat. Trbovljen kaivosyhtiö perustettiin Wienissä vuonna 1872, vain vuotta ennen kuin isoisä lähti omalle matkalleen, ja yhtiö johti seudun kaivoksia aina toiseen maailmansotaan asti. Kaivokset ovat jo sammuneet ja viimeinenkin voimala suljettiin 2016, mutta laakson yllä kohoaa yhä 360-metrinen savupiippu, Euroopan korkein – yksi ainoa valettiin 210 päivässä, ja se näkyy koko laaksoon kuin muistomerkki ajalle, jolloin hiili piti seutua hengissä.`,
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
  /*
   * EGY (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4A), 27 aluetta.
   * Avaimet ovat js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.EGY:n
   * tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti (myös gravis-merkit
   * "Al Isma`iliyah", "Bur Sa`id" ja heittomerkit "Janub Sina'",
   * "Shamal Sina'"). Vain `lyhyt`. Fokuskohteiden aiheet (Faroksen
   * majakka, Aleksandrian kirjasto, Gizan pyramidit, Karnak) jätettiin
   * pois. Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Al Fayyum        — Wadi Al-Hitan (Unesco, takajalalliset valaat)
   *   Al Gharbiyah     — Ahmad al-Badawi / Tantan moulid (1–3 milj.)
   *   Al Iskandariyah  — Catacombs of Kom El Shoqafa
   *   Al Minya         — Amarna
   *   Al Qahirah       — Al-Azhar Mosque (970–972) ja yliopisto
   *   Al Bahr al Ahmar — Mons Porphyrites (ainoa keisariporfyyrin lähde)
   *   Al Buhayrah      — Rosetta / Rosetta Stone (British Museum)
   *   Ad Daqahliyah    — Mansoura: Dar Ibn Luqman (Ludvig IX, museo)
   *   Al Minufiyah     — Monufia Governorate (Sadat, Mubarak)
   *   Al Qalyubiyah    — Delta Barrage / El Qanater El Khayreya
   *   Ash Sharqiyah    — Bubastis (Tell Basta, Zagazig)
   *   Al Wadi at Jadid — White Desert (Farafra, liituveistokset)
   *   Aswan            — Aswan High Dam (1970), Lake Nasser
   *   Asyut            — Deir el-Muharraq (6 kk, kesäkuun vaellus)
   *   Bani Suwayf      — Meidum pyramid
   *   Dumyat           — Damietta Furniture City (SIS; ~2/3 tuotannosta)
   *   Al Jizah         — Grand Egyptian Museum (avattu 1.11.2025)
   *   Al Isma`iliyah   — Ismailia (Suez Canal Authority)
   *   Janub Sina'      — Saint Catherine's Monastery
   *   Kafr ash Shaykh  — Lake Burullus (Ramsar 1998, 112 lintulajia)
   *   Luxor            — KV62 (muumio haudassa)
   *   Matruh           — Siwi language
   *   Bur Sa`id        — Port Fuad (ilmainen lautta, Aasian puoli)
   *   Qina             — Dendera Temple complex
   *   Shamal Sina'     — Lake Bardawil (100 m – 1 km hiekkasärkkä)
   *   Suhaj            — Abydos King List
   *   As Suways        — Suez Canal (saattueet)
   */
  EGY: {
    'Ad Daqahliyah': {
      lyhyt: 'Mansouran Dar Ibn Luqman -talossa pidettiin vankina Ranskan kuningasta Ludvig IX:ttä vuonna 1250, ja nyt talo on museo.',
    },
    'Al Bahr al Ahmar': {
      lyhyt: 'Punaisenmeren rannikon vuorilla on Mons Porphyrites, roomalaisten louhos, joka oli keisarillisen purppuraporfyyrin ainoa tunnettu lähde.',
    },
    'Al Buhayrah': {
      lyhyt: 'Rašidin eli Rosettan kaupunki antoi nimensä kivelle, jonka avulla hieroglyfit opittiin lukemaan; itse kivi on nykyään Lontoossa.',
    },
    'Al Fayyum': {
      lyhyt: 'Fajumin autiomaassa Wadi al-Hitanissa lojuu fossiilisia valaanluurankoja, joilla oli vielä pienet takajalat; laakso on Unescon maailmanperintöä.',
    },
    'Al Gharbiyah': {
      lyhyt: 'Tantassa vietetään joka vuosi sufipyhimys Ahmad al-Badawin moulidia, ja juhla tuo kaupunkiin yli miljoona pyhiinvaeltajaa.',
    },
    'Al Iskandariyah': {
      lyhyt: 'Aleksandrian Kom el-Šoqafan katakombeissa egyptiläiset, kreikkalaiset ja roomalaiset kuva-aiheet sekoittuvat samoissa hautakammioissa.',
    },
    'Al Isma`iliyah': {
      lyhyt: 'Ismailia rakennettiin Suezin kanavan työmaakaupungiksi, ja kanavaa hallinnoivan viraston päämaja on siellä yhä.',
    },
    'Al Jizah': {
      lyhyt: 'Gizaan avattiin 2025 Suuri egyptiläinen museo, jossa Tutankhamonin koko hautalöytö on ensimmäistä kertaa esillä yhdessä.',
    },
    'Al Minufiyah': {
      lyhyt: 'Menufian maalaiskylistä ovat kotoisin kaksi Egyptin presidenttiä, Anwar Sadat ja Hosni Mubarak.',
    },
    'Al Minya': {
      lyhyt: 'Minyan maakunnassa Niilin itärannalla ovat Amarnan rauniot – farao Ekhnatonin lyhytikäisen pääkaupungin jäänteet.',
    },
    'Al Qahirah': {
      lyhyt: 'Kairon al-Azhar-moskeija valmistui 970-luvulla, ja sen yhteydessä toimiva yliopisto on yksi maailman vanhimmista.',
    },
    'Al Qalyubiyah': {
      lyhyt: 'Qanater al-Khairiyassa Niili jakautuu Rosettan ja Damiettan haaroiksi, ja vanhan padon puistot ovat kairolaisten suosittu retkikohde.',
    },
    'Al Wadi at Jadid': {
      lyhyt: 'Farafran keitaan pohjoispuolella Valkoisessa aavikossa tuuli on veistänyt liitukivestä valkoisia sieniä ja torneja.',
    },
    'As Suways': {
      lyhyt: 'Suezin kaupunki on kanavan eteläpäässä, ja sen edustalla laivat odottavat vuoroaan kulkea kanavan läpi saattueissa.',
    },
    'Ash Sharqiyah': {
      lyhyt: 'Zagazigin laidalla ovat Bubastiksen rauniot, muinaisen kissajumalatar Bastetin tärkeimmän kulttikaupungin jäänteet.',
    },
    Aswan: {
      lyhyt: 'Aswanin suurpato valmistui 1970, ja sen taakse padottu Nasserinjärvi on yksi maailman suurimmista tekojärvistä.',
    },
    Asyut: {
      lyhyt: 'Asyutin Deir al-Muharraqin luostarissa pyhän perheen kerrotaan asuneen puoli vuotta, ja kesäisin sinne vaeltaa tuhansia koptikristittyjä.',
    },
    'Bani Suwayf': {
      lyhyt: 'Beni Suefin Meidumissa seisoo osittain romahtanut pyramidi, jonka jäljelle jäänyt ydin näyttää autiomaassa tornilta.',
    },
    'Bur Sa`id': {
      lyhyt: 'Port Saidista pääsee ilmaisella lautalla kanavan yli Port Fuadiin, ja kymmenen minuutin matkalla maanosa vaihtuu Afrikasta Aasiaan.',
    },
    Dumyat: {
      lyhyt: 'Damiettan pienissä pajoissa valmistuu noin kaksi kolmasosaa Egyptin huonekaluista.',
    },
    "Janub Sina'": {
      lyhyt: 'Siinainvuoren juurella oleva Pyhän Katariinan luostari on yksi maailman vanhimmista yhä toimivista kristillisistä luostareista.',
    },
    'Kafr ash Shaykh': {
      lyhyt: 'Burullusjärvi on Niilin suiston toiseksi suurin laguuni ja suojeltu kosteikko, jossa on tavattu yli sata lintulajia.',
    },
    Luxor: {
      lyhyt: 'Kuninkaiden laaksossa Tutankhamonin muumio lepää yhä omassa haudassaan, vaikka aarteet on viety museoon.',
    },
    Matruh: {
      lyhyt: 'Siwan keitaalla puhutaan yhä berberikieliin kuuluvaa siwia, vaikka ympärillä on arabiankielinen Egypti.',
    },
    Qina: {
      lyhyt: 'Qinan lähellä Denderan Hathorin temppeli on yksi Egyptin parhaiten säilyneistä, ja sen kattomaalaukset ovat yhä värikkäitä.',
    },
    "Shamal Sina'": {
      lyhyt: 'Pohjois-Siinain rannikolla Bardawilin matalaa ja suolaista laguunia erottaa Välimerestä vain kapea hiekkasärkkä.',
    },
    Suhaj: {
      lyhyt: 'Sohagin maakunnan Abydoksessa Seti I:n temppelin seinään on kaiverrettu luettelo kymmenistä häntä edeltäneistä faaraoista.',
    },
  },
  /*
   * IND (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4A), 36 aluetta
   * (osavaltiot ja liittoalueet). Avaimet kopioitu koneellisesti
   * MAAKUNNAT_KAIKKI.IND:stä. Vain `lyhyt`. Jammu and Kashmir, Ladakh ja
   * Arunachal Pradesh kuvataan neutraalisti maiseman tai paikan kautta.
   * Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Andaman and Nicobar — Barren Island (Etelä-Aasian ainoa aktiivinen)
   *   Andhra Pradesh      — Venkateswara Temple, Tirumala (hiusuhri)
   *   Arunachal Pradesh   — Tawang Monastery (Intian suurin, ~3 000 m)
   *   Assam               — Kaziranga National Park (~2/3 sarvikuonoista)
   *   Bihar               — Mahabodhi Temple
   *   Chandigarh          — Chandigarh (Le Corbusier, sektorit)
   *   Chhattisgarh        — Chitrakote Falls
   *   Dadra ... Diu       — Diu Fort; Portugalin vallan loppu 1961
   *   Delhi               — Qutb Minar (72,5 m)
   *   Goa                 — Basilica of Bom Jesus (näytteille ~10 v välein)
   *   Gujarat             — Gir National Park
   *   Haryana             — Kurukshetra
   *   Himachal Pradesh    — Kalka–Shimla Railway (102 tunnelia käytössä)
   *   Jammu and Kashmir   — Dal Lake
   *   Jharkhand           — Jamshedpur
   *   Karnataka           — Hampi
   *   Kerala              — Literacy in India (2011: ~94 %)
   *   Ladakh              — Leh (~3 500 m)
   *   Lakshadweep         — Lakshadweep (36 saarta, 10 asuttua, lupa)
   *   West Bengal         — Sundarbans
   *   Madhya Pradesh      — Khajuraho Group of Monuments
   *   Maharashtra         — Dabbawala (nyt n. 50 000/pv, ennen 200 000)
   *   Manipur             — Keibul Lamjao National Park
   *   Meghalaya           — Living root bridge
   *   Mizoram             — Cheraw dance
   *   Nagaland            — Hornbill Festival (Kisama, 1.–10.12.)
   *   Odisha              — Konark Sun Temple (24 pyörää)
   *   Puducherry          — Puducherry (de facto siirto 1954)
   *   Punjab              — Golden Temple, langar
   *   Rajasthan           — Jaisalmer Fort
   *   Sikkim              — Sikkim Organic Mission (18.1.2016)
   *   Tamil Nadu          — Meenakshi Temple
   *   Telangana           — Charminar (1591), Laad Bazaar
   *   Tripura             — Neermahal
   *   Uttar Pradesh       — Varanasi ghats (Manikarnika)
   *   Uttarakhand         — Jim Corbett National Park (Hailey NP 1936)
   */
  IND: {
    'Andaman and Nicobar': {
      lyhyt: 'Andamaanien Barren Island on Etelä-Aasian ainoa vahvistetusti toimiva tulivuori, ja sitä pääsee katsomaan vain veneestä.',
    },
    'Andhra Pradesh': {
      lyhyt: 'Tirumalan Venkateswaran temppeliin Tirupatissa saapuu päivittäin kymmeniä tuhansia pyhiinvaeltajia, ja moni uhraa sinne hiuksensa.',
    },
    'Arunachal Pradesh': {
      lyhyt: 'Tawangin luostari noin 3 000 metrin korkeudessa Himalajan rinteillä on Intian suurin buddhalaisluostari.',
    },
    Assam: {
      lyhyt: 'Kazirangan kansallispuistossa elää noin kaksi kolmasosaa kaikista maailman intiansarvikuonoista.',
    },
    Bihar: {
      lyhyt: 'Bodh Gayan Mahabodhi-temppelin viikunapuun juurella Buddhan kerrotaan saavuttaneen valaistumisen, ja paikka on Unescon maailmanperintöä.',
    },
    Chandigarh: {
      lyhyt: 'Chandigarhin suunnitteli sveitsiläissyntyinen arkkitehti Le Corbusier, ja kaupunki on jaettu numeroituihin sektoreihin.',
    },
    Chhattisgarh: {
      lyhyt: 'Chitrakoten vesiputousta Indravati-joella kutsutaan leveytensä vuoksi Intian Niagaraksi.',
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      lyhyt: 'Diun saarella seisoo portugalilaisten 1500-luvulla rakentama linnoitus, ja saari kuului Portugalille vuoteen 1961.',
    },
    Delhi: {
      lyhyt: 'Delhin Qutb Minar on lähes 73 metriä korkea tiilinen minareetti, jonka rakentaminen alkoi 1100-luvun lopulla.',
    },
    Goa: {
      lyhyt: 'Vanhan Goan Bom Jesusin basilikassa lepää Frans Xavierin ruumis, ja se asetetaan pyhiinvaeltajien nähtäväksi kymmenen vuoden välein.',
    },
    Gujarat: {
      lyhyt: 'Girin metsissä elävät maailman ainoat luonnonvaraiset aasianleijonat.',
    },
    Haryana: {
      lyhyt: 'Kurukshetra on Mahabharatan suuren taistelun näyttämö, jossa Krishnan kerrotaan puhuneen Bhagavadgitan Arjunalle.',
    },
    'Himachal Pradesh': {
      lyhyt: 'Kalkasta Shimlaan kiemurteleva kapearaiteinen vuoristorata kulkee yli sadan tunnelin läpi ja on Unescon maailmanperintöä.',
    },
    'Jammu and Kashmir': {
      lyhyt: 'Srinagarin Dal-järvellä kelluu satoja puisia asuntolaivoja, ja kauppiaat kiertävät niitä kapeilla shikara-veneillä.',
    },
    Jharkhand: {
      lyhyt: 'Jamshedpur rakennettiin Tatan terästehtaan ympärille, ja sitä pidetään Intian ensimmäisenä suunniteltuna teollisuuskaupunkina.',
    },
    Karnataka: {
      lyhyt: 'Hampissa Vijayanagaran valtakunnan pääkaupungin temppelirauniot seisovat valtavien graniittilohkareiden keskellä.',
    },
    Kerala: {
      lyhyt: 'Keralan lukutaitoaste on Intian osavaltioiden korkein: yli 90 prosenttia asukkaista osaa lukea.',
    },
    Ladakh: {
      lyhyt: 'Ladakhin pääkaupunki Leh on noin 3 500 metrin korkeudessa, joten tulijan kannattaa ensin totutella ohueen ilmaan.',
    },
    Lakshadweep: {
      lyhyt: 'Lakshadweepin 36 korallisaaresta vain kymmenellä asuu ihmisiä, ja vierailuun tarvitaan aina erillinen lupa.',
    },
    'Madhya Pradesh': {
      lyhyt: 'Khajurahon tuhatvuotiaiden temppeleiden seinät ovat täynnä veistoksia, myös eroottisia, ja temppelit ovat Unescon maailmanperintöä.',
    },
    Maharashtra: {
      lyhyt: 'Mumbain dabbawalat kuljettavat yhä kymmeniä tuhansia kotona tehtyjä lounaita toimistoihin polkupyörillä ja junilla.',
    },
    Manipur: {
      lyhyt: 'Loktakjärvellä kelluu kasvillisuuslauttoja, phumdeja, ja niiden varaan on perustettu maailman ainoa kelluva kansallispuisto.',
    },
    Meghalaya: {
      lyhyt: 'Meghalayan khasit kasvattavat siltoja kumipuiden elävistä juurista, ja sillat vahvistuvat vuosi vuodelta puun kasvaessa.',
    },
    Mizoram: {
      lyhyt: 'Mizoramin cheraw-tanssissa tanssijat hyppelevät yhteen lyötävien bambuseipäiden välissä rytmiä hukkaamatta.',
    },
    Nagaland: {
      lyhyt: 'Kohiman lähellä Kisamassa järjestetään joka joulukuu Hornbill-festivaali, jossa nagaheimot esittelevät tanssejaan ja käsitöitään.',
    },
    Odisha: {
      lyhyt: 'Konarkin aurinkotemppeli on rakennettu jättimäisen kivivaunun muotoon, ja sen kyljissä on 24 veistettyä pyörää.',
    },
    Puducherry: {
      lyhyt: 'Puducherryn vanhassa ranskalaiskorttelissa kadunnimet ovat yhä ranskaksi, ja kaupunki kuului Ranskalle vuoteen 1954.',
    },
    Punjab: {
      lyhyt: 'Amritsarin Kultaisen temppelin keittiö tarjoaa ilmaisen aterian kymmenille tuhansille ihmisille joka päivä.',
    },
    Rajasthan: {
      lyhyt: 'Jaisalmerin hiekkakivilinnoitus on yksi maailman harvoista linnoista, joiden muurien sisällä asuu yhä ihmisiä.',
    },
    Sikkim: {
      lyhyt: 'Sikkim julistettiin vuonna 2016 Intian ensimmäiseksi osavaltioksi, jonka koko maatalous on luonnonmukaista.',
    },
    'Tamil Nadu': {
      lyhyt: 'Maduraissa Meenakshin temppeliä ympäröivät korkeat porttitornit, jotka on peitetty tuhansilla värikkäillä jumalhahmoilla.',
    },
    Telangana: {
      lyhyt: 'Hyderabadin Charminar rakennettiin 1591, ja sen juurella Laad Bazaarissa myydään yhä kimaltelevia rannerenkaita.',
    },
    Tripura: {
      lyhyt: 'Tripuran Neermahal on Rudrasagar-järven keskelle rakennettu kuninkaallinen kesäpalatsi, jonne mennään veneellä.',
    },
    'Uttar Pradesh': {
      lyhyt: 'Varanasin ghateilla Gangesin rannalla vainajia poltetaan yötä päivää, ja aamuisin portaat täyttyvät kylpijöistä.',
    },
    Uttarakhand: {
      lyhyt: 'Jim Corbettin kansallispuisto perustettiin 1936 Intian ensimmäiseksi kansallispuistoksi, ja se on nimetty kirjailija Jim Corbettin mukaan.',
    },
    'West Bengal': {
      lyhyt: 'Sundarbansin mangrovemetsissä Gangesin suistossa elää bengalintiikereitä, jotka ovat tottuneet uimaan jokihaarojen yli.',
    },
  },
  /*
   * ZAF (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4A), 9 provinssia.
   * Avaimet kopioitu koneellisesti MAAKUNNAT_KAIKKI.ZAF:stä. Vain
   * `lyhyt`. Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Eastern Cape  — Qunu (Mandelan lapsuus, hautajaiset 15.12.2013)
   *   Free State    — Bloemfontein, Supreme Court of Appeal
   *   Gauteng       — Johannesburg (Witwatersrandin kultaryntäys 1886)
   *   KwaZulu-Natal — Maloti-Drakensberg Park (san-kalliotaide)
   *   Limpopo       — Golden Rhinoceros of Mapungubwe (löydetty 1932)
   *   Mpumalanga    — Blyde River Canyon, Three Rondavels
   *   North West    — Pilanesberg (rengasjuonikompleksi)
   *   Northern Cape — Big Hole (yksi suurimmista käsin kaivetuista)
   *   Western Cape  — Boulders Beach (afrikanpingviinit)
   */
  ZAF: {
    'Eastern Cape': {
      lyhyt: 'Nelson Mandela vietti lapsuutensa Itä-Kapin Qunun kylässä, ja sinne hänet myös haudattiin vuonna 2013.',
    },
    'Free State': {
      lyhyt: 'Bloemfontein on Etelä-Afrikan oikeudellinen pääkaupunki, ja siellä toimii maan muutoksenhakutuomioistuin, Supreme Court of Appeal.',
    },
    Gauteng: {
      lyhyt: 'Johannesburg syntyi 1886 kultaryntäyksessä, ja vanhojen kaivosten keltaiset jätekasat näkyvät yhä kaupungin laidoilla.',
    },
    'KwaZulu-Natal': {
      lyhyt: 'Drakensbergin vuorten kallioluolissa on tuhansia san-kansan kalliomaalauksia, ja vuoristo on Unescon maailmanperintöä.',
    },
    Limpopo: {
      lyhyt: 'Mapungubwen kukkulan kuninkaallisesta haudasta löytyi 1932 kultalevyin päällystetty pieni sarvikuono, noin 800 vuotta vanha.',
    },
    Mpumalanga: {
      lyhyt: 'Blyde River Canyonin reunalta näkyvät Kolme rondavelia, kalliohuiput, jotka muistuttavat perinteisiä pyöreitä majoja.',
    },
    'North West': {
      lyhyt: 'Pilanesbergin kansallispuisto on muinaisen tulivuoren kehämäisten harjujen sisällä, ja siellä elää sarvikuonoja ja norsuja.',
    },
    'Northern Cape': {
      lyhyt: 'Kimberleyn Big Hole on yksi maailman suurimmista käsin kaivetuista kuopista, entinen timanttikaivos keskellä kaupunkia.',
    },
    'Western Cape': {
      lyhyt: "Simon's Townin Boulders Beachillä pesii afrikanpingviinejä, ja niitä pääsee katsomaan aivan läheltä.",
    },
  },
  /*
   * KEN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4A), 8 aluetta.
   * Avaimet ovat MAAKUNNAT_KAIKKI.KEN:n tunnuksia (vanhat provinssit,
   * jotka korvattiin 47 piirikunnalla 2013). Vain `lyhyt`. Lähteet
   * (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Central       — Baden-Powell grave (Nyeri, kohti Kenianvuorta)
   *   Coast         — Lamu Old Town (aasit, ei juuri autoja)
   *   Eastern       — Meru National Park, Elsa the lioness
   *   North-Eastern — North Eastern Province (somalit, kamelinkasvatus)
   *   Nairobi       — Nairobi National Park
   *   Nyanza        — Kisumu, Lake Victoria (tilapia, niilinahven)
   *   Rift Valley   — Iten (2 400 m)
   *   Western       — Kakamega Forest (Guineo-Kongon sademetsän jäänne)
   */
  KEN: {
    Central: {
      lyhyt: 'Partioliikkeen perustaja Robert Baden-Powell on haudattu Nyeriin, ja hänen hautansa katsoo kohti Kenianvuorta.',
    },
    Coast: {
      lyhyt: 'Lamun vanhassa kaupungissa ei juuri ole autoja, joten kapeilla kujilla kuljetaan jalan tai aasilla.',
    },
    Eastern: {
      lyhyt: 'Merun kansallispuiston seudulla George ja Joy Adamson palauttivat Elsa-leijonan luontoon; tarinasta tuli kirja ja elokuva Born Free.',
    },
    Nairobi: {
      lyhyt: 'Nairobin kansallispuisto on pääkaupungin rajojen sisällä, ja kirahveja voi nähdä pilvenpiirtäjiä vasten.',
    },
    'North-Eastern': {
      lyhyt: 'Koillis-Kenian kuivilla tasangoilla elää enimmäkseen somalipaimentolaisia, joille kameli on tärkein karjaeläin.',
    },
    Nyanza: {
      lyhyt: 'Kisumu on Viktoriajärven rannalla, ja sen kalasatamiin tuodaan järvestä tilapiaa ja niilinahventa.',
    },
    'Rift Valley': {
      lyhyt: 'Itenin pikkukaupunki noin 2 400 metrin korkeudessa on maailman kestävyysjuoksijoiden tunnetuin harjoituspaikka.',
    },
    Western: {
      lyhyt: 'Kakamegan metsä on Kenian ainoa trooppinen sademetsä, viimeinen jäänne vyöhykkeestä, joka ulottui aikoinaan Kongon altaalle asti.',
    },
  },
  /*
   * JPN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.JPN:n tunnuksia
   * TÄSMÄLLEEN (makronit mukana: "Hokkaidō", "Hyōgo", "Kyōto", "Kōchi",
   * "Ōita", "Ōsaka"; "Tokyo" ilman makronia). Vain `lyhyt`. Vältetty
   * maastokohteet-jpn.js:n aiheet (Fuji, Shinanojoki, Himeji, Nikkō
   * Tōshō-gū, Shirakawa-gō, Hiroshiman rauhanmuistomerkki, Hōryū-ji,
   * Iwami, Kumano Kodō, Dejima). Lähteet (en-Wikipedia ja hakutarkistus
   * 25.9.2026), epävarmimmat tarkistettu erikseen:
   *   Fukui     — Sabae (noin 95 % Japanin silmälasinkehyksistä,
   *               Fukuin prefektuurin matkailusivusto / nippon.com)
   *   Ishikawa  — Kanazawa gold leaf (99 % Japanin kultalehdestä,
   *               VISIT KANAZAWA / JNTO)
   *   Tokyo     — Ogasawara Islands (noin 1 000 km, Ogasawara Maru
   *               noin 24 h Takeshiban laiturista)
   *   Tottori   — Tottori Sand Dunes (14 km, kamelit)
   *   Toyama    — Tateyama Kurobe Alpine Route (lumiseinät 15–20 m)
   *   Wakayama  — Mount Kōya (noin 120 temppeliä, moni majoittaa)
   *   Yamagata  — kirsikat (noin 70 % Japanin sadosta, MAFF 2012)
   *   Muut      — yleistietoa, tarkistettu vastaavista
   *               en-Wikipedia-artikkeleista.
   */
  JPN: {
    Aichi: {
      lyhyt: 'Aichin Toyotan kaupunki vaihtoi nimensä 1959 siellä pääkonttoriaan pitävän autotehtaan mukaan.',
    },
    Akita: {
      lyhyt: 'Ogan niemimaalla olkiviittaiset namahage-demonit kiertävät uudenvuodenaattona taloissa etsimässä laiskoja ja tottelemattomia.',
    },
    Aomori: {
      lyhyt: 'Aomorin Nebuta-juhlassa elokuun alussa kaduilla kuljetetaan jättimäisiä, sisältä valaistuja paperisia soturihahmoja.',
    },
    Chiba: {
      lyhyt: 'Tokyo Disneyland ei ole Tokiossa vaan Chiban Urayasussa, ja se avattiin 1983.',
    },
    Ehime: {
      lyhyt: 'Ehimen Imabarista lähtevä Shimanami Kaidō kulkee siltoja pitkin saarelta saarelle Hiroshiman puolelle, ja sen voi ajaa polkupyörällä.',
    },
    Fukui: {
      lyhyt: 'Fukuin Sabaessa valmistetaan valtaosa kaikista Japanissa tehdyistä silmälasinkehyksistä.',
    },
    Fukuoka: {
      lyhyt: 'Fukuokan yatai-katukeittiöissä syödään iltaisin Hakata-ramenia, jonka samea liemi keitetään sianluista.',
    },
    Fukushima: {
      lyhyt: 'Ōuchi-juku on vanha majatalokylä, jonka pääkadun varrella seisoo yhä rivi olkikattoisia taloja.',
    },
    Gifu: {
      lyhyt: 'Gifun Nagarajoella kalastetaan kesäöisin yhä merimetsojen avulla veneiden keulassa palavien soihtujen valossa.',
    },
    Gunma: {
      lyhyt: 'Kusatsun kylpyläkaupungin keskellä höyryää yubatake, jossa kuumaa lähdevettä jäähdytetään pitkissä puukouruissa.',
    },
    Hiroshima: {
      lyhyt: 'Miyajiman Itsukushiman pyhäkön punainen torii-portti seisoo nousuveden aikaan meressä, ja laskuveden aikaan sen luo voi kävellä.',
    },
    Hokkaidō: {
      lyhyt: 'Sapporon lumifestivaaleilla helmikuussa Ōdōrin puisto täyttyy talojen kokoisista lumi- ja jääveistoksista.',
    },
    Hyōgo: {
      lyhyt: 'Takarazukan kaupungissa toimii 1913 perustettu Takarazuka Revue, musiikkiteatteri, jonka kaikki roolit esittävät naiset.',
    },
    Ibaraki: {
      lyhyt: 'Ibarakin pääkaupunki Mito tunnetaan nattōsta, käyneistä soijapavuista, jotka venyvät syödessä tahmeiksi rihmoiksi.',
    },
    Ishikawa: {
      lyhyt: 'Kanazawassa lyödään lähes kaikki Japanin kultalehti, ja sitä ripotellaan täällä jopa jäätelön päälle.',
    },
    Iwate: {
      lyhyt: 'Hiraizumin Chūson-jissa on Konjikidō, vuonna 1124 valmistunut pieni temppelisali, joka on päällystetty kauttaaltaan kullalla.',
    },
    Kagawa: {
      lyhyt: 'Kagawaa kutsutaan udon-maakunnaksi, sillä paksuja sanuki-vehnänuudeleita syödään täällä usein jo aamiaiseksi.',
    },
    Kagoshima: {
      lyhyt: 'Sakurajima-tulivuori purkautuu lahden toisella puolella niin usein, että Kagoshiman asukkaat lakaisevat tuhkaa kaduiltaan.',
    },
    Kanagawa: {
      lyhyt: 'Kamakuran suuri Buddha on noin 11-metrinen pronssipatsas, joka istuu taivasalla temppelin pihalla.',
    },
    Kyōto: {
      lyhyt: 'Fushimi Inarin pyhäkön vuorenrinnettä kiertävät tuhannet oranssinpunaiset torii-portit, jotka yritykset ja yksityiset ovat lahjoittaneet.',
    },
    Kōchi: {
      lyhyt: 'Kōchin tunnetuin ruoka on katsuo no tataki, boniittifilee, jonka pinta ruskistetaan nopeasti oljen liekeissä.',
    },
    Kumamoto: {
      lyhyt: 'Kumamoton maskotti, punaposkinen musta karhu Kumamon, on Japanin tunnetuimpia maakuntahahmoja.',
    },
    Mie: {
      lyhyt: 'Isen suuren pyhäkön päärakennukset puretaan ja rakennetaan uudelleen joka 20. vuosi; edellisen kerran se tehtiin 2013.',
    },
    Miyagi: {
      lyhyt: 'Matsushiman lahdella on satoja mäntyjen peittämiä pikkusaaria, ja maisema lasketaan yhdeksi Japanin kolmesta kauneimmasta.',
    },
    Miyazaki: {
      lyhyt: 'Takachihon rotkossa soudetaan pienillä veneillä basalttiseinämien välissä Manai-vesiputouksen alle.',
    },
    Nagano: {
      lyhyt: 'Matsumoton linna on yksi Japanin harvoista alkuperäisinä säilyneistä linnoista, ja mustan värinsä vuoksi sitä kutsutaan Variksenlinnaksi.',
    },
    Nagasaki: {
      lyhyt: 'Nagasakin edustan Hashima eli Gunkanjima on autioitunut hiilikaivossaari, jonka betonikerrostalot on jätetty rapistumaan.',
    },
    Nara: {
      lyhyt: 'Naran puistossa kulkee vapaana toista tuhatta kesyä peuraa, joita on vanhastaan pidetty jumalten sanansaattajina.',
    },
    Niigata: {
      lyhyt: 'Niigatan edustalla oleva Sadon saari tunnetaan kultakaivoksistaan, jotka merkittiin Unescon maailmanperintölistalle 2024.',
    },
    Ōita: {
      lyhyt: 'Beppun kuumien lähteiden "helvetit" höyryävät toinen kirkkaan sinisenä, toinen verenpunaisena, eikä niissä kylvetä.',
    },
    Okayama: {
      lyhyt: 'Okayaman Kōraku-en lasketaan Japanin kolmen kuuluisimman maisemapuutarhan joukkoon.',
    },
    Okinawa: {
      lyhyt: 'Okinawan Churaumi-akvaarion jättialtaassa uivat valashait ja mantarauskut.',
    },
    Ōsaka: {
      lyhyt: 'Ōsakan Dōtonborin kanavan varrella loistaa kädet ylhäällä juoksevan miehen Glico-valomainos, yksi kaupungin tunnusmerkeistä.',
    },
    Saga: {
      lyhyt: 'Sagan Aritassa on valmistettu posliinia 1600-luvun alusta asti, ja kaupunki elää yhä savesta ja uuneista.',
    },
    Saitama: {
      lyhyt: 'Kawagoeta kutsutaan Pikku-Edoksi, sillä sen vanhalla kauppakadulla seisoo yhä paksuseinäisiä savitalojen rivistöjä.',
    },
    Shiga: {
      lyhyt: 'Biwajärvi on Japanin suurin järvi, ja se peittää noin kuudesosan Shigan pinta-alasta.',
    },
    Shimane: {
      lyhyt: 'Japanilaisen perinteen mukaan kaikki jumalat kokoontuvat kerran vuodessa Izumo Taishan pyhäkköön Shimaneen.',
    },
    Shizuoka: {
      lyhyt: 'Shizuoka on Japanin suurin vihreän teen tuottaja, ja teepensasrivit peittävät sen loivia rinteitä.',
    },
    Tochigi: {
      lyhyt: 'Tochigin pääkaupunki Utsunomiya kutsuu itseään gyōza-kaupungiksi, ja nyyttiravintoloita on siellä kymmenittäin.',
    },
    Tokyo: {
      lyhyt: 'Tokioon kuuluvat myös noin tuhannen kilometrin päässä etelässä olevat Ogasawarasaaret, joille laiva kulkee noin vuorokauden.',
    },
    Tokushima: {
      lyhyt: 'Naruton salmen vuorovesipyörteitä voi katsoa suoraan ylhäältä Ōnaruto-sillan alla kulkevan käytävän lasilattian läpi.',
    },
    Tottori: {
      lyhyt: 'Tottorin hiekkadyynit ulottuvat rannikolla noin 14 kilometrin matkalle, ja niillä voi ratsastaa kamelilla.',
    },
    Toyama: {
      lyhyt: 'Tateyaman vuoristotie aukeaa keväällä lumen keskeltä, ja tien varsilla kohoaa jopa 20-metrisiä lumiseiniä.',
    },
    Wakayama: {
      lyhyt: 'Kōyasanin vuorella on toista sataa buddhalaistemppeliä, ja monessa niistä matkailija voi yöpyä munkkien luona.',
    },
    Yamagata: {
      lyhyt: 'Yamagatan tarhoista tulee noin 70 prosenttia Japanin kirsikoista, ja kesäkuussa niitä pääsee poimimaan itse.',
    },
    Yamaguchi: {
      lyhyt: 'Iwakunin Kintai-kyō on viidestä puukaaresta koottu silta, joka rakennettiin alun perin vuonna 1673.',
    },
    Yamanashi: {
      lyhyt: 'Yamanashi on Japanin tärkein viinimaakunta, ja sen oma koshu-rypäle tuottaa kevyttä valkoviiniä.',
    },
  },
  /*
   * AUS (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.AUS:n tunnuksia TÄSMÄLLEEN (Natural Earthin
   * englanninkieliset nimet; Lord Howe Island ja Macquarie Island ovat
   * omina alueinaan, vaikka hallinnollisesti ne kuuluvat Uuteen
   * Etelä-Walesiin ja Tasmaniaan). Vain `lyhyt`. Vältetty
   * maastokohteet-aus.js:n aiheet (Port Arthur, Ubirr, Parkes, Broken
   * Hill, Mungo, Snowy Mountains, Eureka, Cooktown, Mount Augustus, Iso
   * valliriutta). Lähteet (en-Wikipedia ja hakutarkistus 25.9.2026):
   *   Jervis Bay Territory — Jervis Bay Territory (1915, HMAS Creswell,
   *                          Booderee noin 90 % alueesta)
   *   Lord Howe Island     — Lord Howe Island (enintään 400 matkailijaa,
   *                          Unesco 1982)
   *   Macquarie Island     — Macquarie Island (vaipan kiviä merenpinnan
   *                          yläpuolella, Unesco 1997)
   *   Victoria             — Trams in Melbourne (maailman suurin
   *                          toiminnassa oleva kaupunkiraitiotieverkko)
   *   Muut                 — yleistietoa, tarkistettu vastaavista
   *                          en-Wikipedia-artikkeleista.
   */
  AUS: {
    'Australian Capital Territory': {
      lyhyt: 'Canberra on suunnittelukilpailun pohjalta tyhjästä rakennettu pääkaupunki, ja sen keskellä on padottu tekojärvi, Lake Burley Griffin.',
    },
    'South Australia': {
      lyhyt: 'Opaalikaupunki Coober Pedyssä moni asuu maan alle kaivetussa kodissa, jossa lämpötila pysyy tasaisena aavikon helteellä.',
    },
    'Jervis Bay Territory': {
      lyhyt: 'Jervis Bay erotettiin 1915 liittovaltion alueeksi, jotta sisämaan pääkaupungilla olisi oma rannikko; nyt siellä toimii laivaston upseerikoulu.',
    },
    'Lord Howe Island': {
      lyhyt: 'Lord Howen saarella saa olla kerrallaan enintään 400 matkailijaa, jotta pieni maailmanperintösaari ei kuluisi.',
    },
    'Western Australia': {
      lyhyt: 'Perthin edustan Rottnestin saarella elää kvokkoja, pieniä pussieläimiä, joiden "hymyilevät" selfiet ovat kiertäneet maailmaa.',
    },
    'Macquarie Island': {
      lyhyt: 'Macquariensaarella maan vaipasta peräisin olevaa kiveä nousee merenpinnan yläpuolelle, ja siksi saari on Unescon maailmanperintökohde.',
    },
    'Northern Territory': {
      lyhyt: 'Uluru on anangu-kansalle pyhä, eikä kallion päälle ole saanut kiivetä lokakuun 2019 jälkeen.',
    },
    Queensland: {
      lyhyt: 'Queensland ei siirrä kelloja kesäaikaan, joten kesäisin Brisbanessa kello on tunnin jäljessä Sydneystä.',
    },
    Tasmania: {
      lyhyt: 'Hobartin MONA on uhkapelimiljonääri David Walshin 2011 avaama taidemuseo, jonka salit on louhittu hiekkakivikallion sisään.',
    },
    'New South Wales': {
      lyhyt: 'Sydneyn oopperatalon purjeiksi kutsutut katot on päällystetty yli miljoonalla ruotsalaisvalmisteisella laatalla.',
    },
    Victoria: {
      lyhyt: 'Melbournessa on maailman suurin käytössä oleva kaupunkiraitiotieverkko, ja keskustan raitiovaunuissa matkustaa ilmaiseksi.',
    },
  },
  /*
   * NZL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.NZL:n tunnuksia TÄSMÄLLEEN (Natural Earthin nimet;
   * "Hawke's Bay" tavallisella heittomerkillä, nimiFi kaarevalla).
   * Subantarktiset saariryhmät (Antipodes, Auckland Islands, Campbell,
   * The Snares) ja Kermadec ovat asumattomia luonnonsuojelualueita;
   * Tokelau on Uuden-Seelannin alaisuudessa oleva itsehallintoalue. Vain
   * `lyhyt`. Vältetty maastokohteet-nzl.js:n aiheet (Waitangi,
   * Ruapekapeka, Cape Reinga, Whakarewarewa, Waitomo, Napier, Arrowtown,
   * Denniston, Ruapehu, Taupo, Waikatojoki). Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026), epävarmimmat tarkistettu erikseen:
   *   Antipodes Islands  — Antipodes Islands (nimi: lähellä Lontoon
   *                        vastapistettä, kaksi kotoperäistä papukaijaa)
   *   Auckland Islands   — Auckland Islands (uudenseelanninmerileijonan
   *                        pääasiallinen lisääntymispaikka)
   *   Campbell Islands   — Campbell Island (sitkankuusi 1901–1907,
   *                        lähin puu yli 274 km:n päässä)
   *   Chatham Islands    — Chatham Islands (UTC+12:45, 45 min edellä)
   *   Hawke's Bay        — Mission Estate Winery (1851, vanhin)
   *   Kermadec Islands   — Kermadec Islands (Raoul ja Curtis aktiivisia
   *                        tulivuoria, 800–1 000 km)
   *   Nelson City        — Nelson (Botanical Hillin muistomerkki =
   *                        kolmiomittauksen nollapiste)
   *   Taranaki           — The Last Samurai (Taranaki Fujin sijaisena,
   *                        newzealand.com)
   *   The Snares         — The Snares (jopa kolme miljoonaa
   *                        harmaaliitäjää, maihinnousu vain luvalla)
   *   Three Kings Islands — Pennantia baylisiana (yksi luonnonvarainen
   *                        puu, löydetty 1945)
   *   Tokelau            — 100 % aurinkosähköä lokakuusta 2012
   *   Manawatu-Wanganui  — Te Awa Tupua Act 2017
   *   Muut               — yleistietoa, tarkistettu vastaavista
   *                        en-Wikipedia-artikkeleista.
   */
  NZL: {
    'Antipodes Islands': {
      lyhyt: 'Antipodisaaret saivat nimensä siitä, että ne ovat lähellä Lontoon vastapistettä, ja niillä elää kaksi vain täältä tavattavaa papukaijaa.',
    },
    Auckland: {
      lyhyt: 'Auckland on rakennettu tulivuorikentälle, ja kaupungin keskellä kohoaa kymmeniä vanhoja tulivuorenkartioita.',
    },
    'Auckland Islands': {
      lyhyt: 'Asumattomat Aucklandinsaaret ovat uudenseelanninmerileijonan tärkein lisääntymispaikka, ja sinne pääsee vain luvalla.',
    },
    'Bay of Plenty': {
      lyhyt: 'Bay of Plentyn Te Puke mainostaa itseään maailman kiivipääkaupunkina, ja kaupungin laidalla on jättimäinen kiivihedelmä.',
    },
    'Campbell Islands': {
      lyhyt: 'Campbellinsaarella kasvaa sitkankuusi, jota kutsutaan maailman yksinäisimmäksi puuksi: lähin toinen puu on yli 270 kilometrin päässä.',
    },
    Canterbury: {
      lyhyt: 'Christchurchin maanjäristyksessä tuhoutuneen katedraalin tilalle rakennettiin 2013 väliaikainen kirkko pahviputkista.',
    },
    'Chatham Islands Territory': {
      lyhyt: 'Chathamsaarilla kello käy 45 minuuttia Uuden-Seelannin mantereen edellä, ja asukkaita on vain noin 600.',
    },
    'Gisborne District': {
      lyhyt: 'Gisborne mainostaa olevansa maailman ensimmäinen kaupunki, joka näkee joka aamu uuden päivän auringonnousun.',
    },
    "Hawke's Bay": {
      lyhyt: 'Hawke\'s Bayssa toimii Uuden-Seelannin vanhin yhä toimiva viinitila Mission Estate, jonka lähetyssaarnaajat perustivat 1851.',
    },
    'Kermadec Islands': {
      lyhyt: 'Kermadecsaaret ovat asumattomia subtrooppisia tulivuorisaaria puolimatkassa Tongaan, ja niitä ympäröi laaja merensuojelualue.',
    },
    'Manawatu-Wanganui': {
      lyhyt: 'Whanganuijoki sai vuonna 2017 lain mukaan oikeushenkilön aseman, joten joella on omat oikeutensa kuin ihmisellä.',
    },
    'Marlborough District': {
      lyhyt: 'Marlborough on Uuden-Seelannin suurin viinialue, ja sen sauvignon blanc on tehnyt maan viinit tunnetuiksi maailmalla.',
    },
    'Nelson City': {
      lyhyt: 'Nelsonin Botanical Hillillä on "Uuden-Seelannin keskipisteen" muistomerkki, vaikka se merkitsee oikeasti maanmittauksen nollapistettä.',
    },
    Northland: {
      lyhyt: 'Waipouan metsässä kasvaa Tāne Mahuta, suurin tunnettu elossa oleva kauripuu, jonka runko on yli 15 metriä ympärysmitaltaan.',
    },
    Otago: {
      lyhyt: 'Dunedinin Baldwin Street on Guinnessin mukaan maailman jyrkin asuinkatu; jyrkimmässä kohdassa se nousee 35 prosenttia.',
    },
    Southland: {
      lyhyt: 'Milford Soundin vuonon jyrkiltä seinämiltä syöksyy sadepäivinä satoja tilapäisiä vesiputouksia.',
    },
    Taranaki: {
      lyhyt: 'Taranakin lähes symmetrinen tulivuori esitti Fuji-vuorta elokuvassa Viimeinen samurai.',
    },
    'Tasman District': {
      lyhyt: 'Abel Tasmanin kansallispuisto on Uuden-Seelannin pienin, ja sen kultaisia hiekkarantoja kierretään kajakilla.',
    },
    'The Snares': {
      lyhyt: 'Snaresinsaarilla pesii kesäisin jopa kolme miljoonaa harmaaliitäjää, eikä saarille saa nousta ilman tutkimuslupaa.',
    },
    'Three Kings Islands': {
      lyhyt: 'Kolmen kuninkaan saarilla kasvaa ainoa luonnonvarainen Pennantia baylisiana -puu, jota on pidetty maailman harvinaisimpana.',
    },
    Tokelau: {
      lyhyt: 'Tokelau alkoi 2012 tuottaa kaiken sähkönsä aurinkopaneeleilla ensimmäisenä maana maailmassa.',
    },
    Waikato: {
      lyhyt: 'Matamatan maatilalla on Taru sormusten herrasta -elokuvien Hobittila, jonka kolohobittien oviin matkailijat pääsevät kurkistamaan.',
    },
    Wellington: {
      lyhyt: 'Wellingtonin parlamentin pyöreää toimistorakennusta kutsutaan muotonsa vuoksi Mehiläispesäksi.',
    },
    'West Coast': {
      lyhyt: 'Punakaikin Pancake Rocks ovat pannukakkupinojen näköisiä kalkkikivikallioita, joiden puhallusrei\'istä meri suihkuaa vaahtona.',
    },
  },
  /*
   * CHN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.CHN:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti (Natural Earthin nimet, esim.
   * "Inner Mongol" = Sisä-Mongolia, "Xizang" = Tiibetin autonominen alue,
   * "Paracel Islands" = Paracelsaaret; Hongkong, Macao ja Taiwan eivät
   * kuulu CHN:n aluejoukkoon). Vain `lyhyt` tässä erässä. Xizang, Xinjiang
   * ja Paracel Islands kuvaavat vain maisemaa, rakennusta tai perinnettä,
   * ei politiikkaa. Vältetty fokuskohteet-chn.js:n ja maastokohteet-chn.js:n
   * aiheet (Yuanmingyuan, Taishan, Etelä-Kiinan meri, Jangtse,
   * Keltainenjoki, Mutianyu, terrakotta-armeija, Mogaon luolat,
   * Zhangjiajie, Lijiang, Leshanin Buddha, Pingyao). Lähteet
   * (en-Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Chongqing        — Liziba station (linja 2, 19-kerroksinen talo,
   *                      asema kerroksissa 6–8, avattu 2005)
   *   Guangxi          — Li River (20 juanin setelin kuva, 5. sarja)
   *   Guizhou          — Five-hundred-meter Aperture Spherical Telescope
   *                      (Pingtang, valmis 2016)
   *   Hainan           — Wenchang Space Launch Site (Long March 5)
   *   Jilin            — Jilin rime + Fengman Dam (lämmin vesi, joki ei
   *                      jäädy, huurre rantapuissa)
   *   Paracel Islands  — Paracel Islands + Woody Island (suurin, 2,1 km²)
   *   Qinghai          — Qinghai Lake (Kiinan suurin järvi, suolainen;
   *                      rapsi kukkii heinä–elokuussa)
   *   Shanxi           — Hanging Temple (Hunyuan, Datong; 491, Pohjoinen Wei)
   *   Tianjin          — Tianjin Eye (120 m, Yongle-silta, Haijoki, 2008)
   *   Muut             — yleistietoa, tarkistettu vastaavista
   *                      en-Wikipedia-artikkeleista.
   */
  CHN: {
    Anhui: {
      lyhyt: 'Huangshanin graniittihuippujen kallionrakoihin on juurtunut kiemuraisia mäntyjä, ja aamuisin laaksot täyttyvät usein pilvimerestä.',
    },
    Beijing: {
      lyhyt: 'Pekingin hutongit ovat kapeita kujia, joiden varrella monet perheet asuvat yhä perinteisissä sisäpihataloissa, siheyuaneissa.',
    },
    Chongqing: {
      lyhyt: 'Chongqingin Liziban asemalla yksiraidejuna ajaa 19-kerroksisen kerrostalon läpi, ja ylemmissä kerroksissa asutaan tavalliseen tapaan.',
    },
    Fujian: {
      lyhyt: 'Fujianin vuoristossa seisoo hakka-kansan tulou-taloja, pyöreitä savimuurisia rakennuksia, joissa kokonainen suku saattoi asua saman katon alla.',
    },
    Gansu: {
      lyhyt: 'Zhangyen Danxia-vuorten rinteet ovat raidallisia punaisesta, keltaisesta ja vihertävästä hiekkakivestä, ja värit syvenevät ilta-auringossa.',
    },
    Guangdong: {
      lyhyt: 'Guangzhoussa päivä alkaa usein yum cha -teehetkellä, jolloin pöytään kannetaan höyrykoreissa pieniä dim sum -annoksia.',
    },
    Guangxi: {
      lyhyt: 'Lijoen varren kalkkikivihuiput Guilinin ja Yangshuon välillä ovat niin tunnettu maisema, että ne on painettu 20 juanin seteliin.',
    },
    Guizhou: {
      lyhyt: 'Guizhoun karstivuorten luonnolliseen notkoon on rakennettu FAST, halkaisijaltaan 500-metrinen radioteleskooppi, joka valmistui 2016.',
    },
    Hainan: {
      lyhyt: 'Hainanin saaren Wenchangissa on Kiinan eteläisin avaruuskeskus, josta laukaistaan maan raskaimmat kantoraketit.',
    },
    Hebei: {
      lyhyt: 'Chengden vuoristolomapalatsi oli Qing-keisarien kesäasunto, ja sen laajassa puistossa on järviä, paviljonkeja ja temppeleitä.',
    },
    Heilongjiang: {
      lyhyt: 'Harbinin talvisella jää- ja lumifestivaalilla jäälohkareista rakennetaan kokonaisia linnoja, joita valaisevat sisältä värilliset valot.',
    },
    Henan: {
      lyhyt: 'Songshan-vuoren juurella Dengfengissä on Shaolinin luostari, jonka munkkien kungfu tunnetaan kaikkialla maailmassa.',
    },
    Hubei: {
      lyhyt: 'Wudangin vuorten taolaiset temppelit ovat Unescon maailmanperintöä, ja vuori tunnetaan myös wudang-taistelulajien kotina.',
    },
    Hunan: {
      lyhyt: 'Fenghuangin vanhassa kaupungissa puiset paalutalot kurottuvat Tuojiang-joen ylle, ja joen yli pääsee astinkiviä pitkin.',
    },
    'Inner Mongol': {
      lyhyt: 'Sisä-Mongolian Hulunbuirin ruohoaroilla laiduntavat lammas- ja hevoslaumat, ja kesän naadam-juhlissa kisataan painissa ja ratsastuksessa.',
    },
    Jiangsu: {
      lyhyt: 'Suzhoun klassiset puutarhat on sommiteltu lammista, oudonmuotoisista kivistä ja paviljongeista, ja ne kuuluvat Unescon maailmanperintöön.',
    },
    Jiangxi: {
      lyhyt: 'Jingdezhenissä on poltettu posliinia yli tuhat vuotta, ja kaupunkia kutsutaan yhä Kiinan posliinipääkaupungiksi.',
    },
    Jilin: {
      lyhyt: 'Jilinin kaupungissa Songhuajoki ei jäädy voimalan lämpimän veden takia, ja joesta nouseva usva huurruttaa rantapuut valkoisiksi.',
    },
    Liaoning: {
      lyhyt: 'Shenyangin keisarillinen palatsi rakennettiin Qing-dynastian ensimmäisille hallitsijoille ennen kuin hovi muutti Pekingiin 1644.',
    },
    Ningxia: {
      lyhyt: 'Helanvuorten itärinteillä kasvatetaan viinirypäleitä kuivassa ilmastossa, ja Ningxian viinit ovat pärjänneet kansainvälisissä kilpailuissa.',
    },
    'Paracel Islands': {
      lyhyt: 'Paracelsaaret ovat matalia korallisaaria ja riuttoja avomeren keskellä, ja suurinkin niistä on vain noin kahden neliökilometrin kokoinen.',
    },
    Qinghai: {
      lyhyt: 'Qinghaijärvi on Kiinan suurin järvi, ja heinäkuussa sen suolaisen veden rannoilla kukkivat keltaiset rapsipellot.',
    },
    Shaanxi: {
      lyhyt: "Xi'anin Ming-aikainen kaupunginmuuri on lähes 14 kilometriä pitkä, ja sen harjalla voi pyöräillä vanhan kaupungin ympäri.",
    },
    Shandong: {
      lyhyt: 'Qufussa syntyi Kungfutse, ja hänen temppelinsä, sukunsa kartano ja hautausmaa ovat Unescon maailmanperintöä.',
    },
    Shanghai: {
      lyhyt: 'Shanghai Tower on 632 metriä korkea, Kiinan korkein rakennus, ja sen lasijulkisivu kiertyy ylöspäin mentäessä kuin ruuvi.',
    },
    Shanxi: {
      lyhyt: 'Datongin lähellä Xuankongin riippuva temppeli on kiinnitetty jyrkänteen kylkeen puupalkein, ja sen perustaminen ajoitetaan vuoteen 491.',
    },
    Sichuan: {
      lyhyt: 'Jiuzhaigoun laakson järvet hohtavat turkoosina ja smaragdinvihreinä, ja kirkkaassa vedessä näkyvät pohjaan kaatuneet puunrungot.',
    },
    Tianjin: {
      lyhyt: 'Tianjin Eye on 120 metriä korkea maailmanpyörä, joka on rakennettu Haijoen ylittävän sillan päälle.',
    },
    Xinjiang: {
      lyhyt: 'Turpanin painanteessa rypäleet kuivataan rusinoiksi reikäseinäisissä savimajoissa, joiden läpi aavikon kuuma tuuli puhaltaa.',
    },
    Xizang: {
      lyhyt: 'Lhasan Potala-palatsi kohoaa Punaisen vuoren rinteellä noin 3 700 metrin korkeudessa, ja sen valkoiset ja punaiset seinät näkyvät kauas.',
    },
    Yunnan: {
      lyhyt: 'Yuanyangin vuorenrinteille hani-kansa on rakentanut riisiterasseja yli tuhannen vuoden ajan, ja ne ovat Unescon maailmanperintöä.',
    },
    Zhejiang: {
      lyhyt: 'Hangzhoun Länsijärveä ympäröivillä rinteillä kasvaa Longjing-teetä, joka on Kiinan tunnetuimpia vihreitä teitä.',
    },
  },
  /*
   * USA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 4C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.USA:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: 50 osavaltiota ja "District of
   * Columbia" (jonka nimiFi on maakunnat-nimet.js:ssä "Washington", sama
   * kuin osavaltiolla "Washington"). Vain `lyhyt` tässä erässä; jokaisella
   * alueella eri aihe. Vältetty maastokohteet-usa.js:n aiheet (Mount
   * St. Helens, Crater Lake, Nantucket, Mesa Verde, Cahokia, Chacon
   * kanjoni, Gettysburg, Kill Devil Hills, Promontory, Independence Hall,
   * Mammothin luola). Lähteet (en-Wikipedia ja hakutarkistus 25.9.2026),
   * epävarmimmat erikseen:
   *   California     — Hyperion (tree) (116,22 m, mitattu 2026)
   *   Colorado       —Colorado State Capitol (13. askelma, mitattu 2003)
   *   Idaho          — Idaho Potato Commission / Idaho Capital Sun
   *                    (lähes kolmannes USA:n perunoista)
   *   Iowa           — Butter sculptures at the Iowa State Fair (1911)
   *   Michigan       — Mackinac Island (autokielto 6.7.1898)
   *   Minnesota      — List of lakes of Minnesota (11 842 yli 10 eekkerin)
   *   Nebraska       — Carhenge (39 autoa, 1987)
   *   New Jersey     — Lucy the Elephant (1881, kuusi kerrosta, 19,7 m)
   *   North Carolina — Biltmore Estate (250 huonetta, suurin yksityinen)
   *   Oklahoma       — TravelOK (yli 400 mailia ajettavaa Route 66:ta)
   *   Vermont        — Vermont Agency of Agriculture (yli 50 % siirapista)
   *   Washington     — Hoh Rainforest (noin 140 tuumaa = 3,6 m vuodessa)
   *   Wisconsin      — Wisconsin cheese (suurin tuottaja vuodesta 1910)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  USA: {
    Alabama: {
      lyhyt: 'Huntsvillessä, jota kutsutaan Rakettikaupungiksi, suunniteltiin Saturn V -kantoraketti, ja sellainen on esillä kaupungin avaruusmuseossa.',
    },
    Alaska: {
      lyhyt: 'Denali on 6 190 metriä korkea, Pohjois-Amerikan korkein vuori, ja sen juurelta huipulle on korkeuseroa yli 5 000 metriä.',
    },
    Arizona: {
      lyhyt: 'Grand Canyon on paikoin lähes kaksi kilometriä syvä, ja sen pohjalla virtaa Coloradojoki.',
    },
    Arkansas: {
      lyhyt: 'Crater of Diamonds -puistossa kuka tahansa saa kaivaa timantteja maasta, ja löytäjä saa pitää löytämänsä kiven.',
    },
    California: {
      lyhyt: 'Kalifornian rannikon punapuut ovat maailman korkeimpia puita, ja korkein niistä, Hyperion, kohoaa yli 116 metriin.',
    },
    Colorado: {
      lyhyt: 'Denverin osavaltiontalon portaissa on merkitty askelma, joka on tasan mailin eli noin 1 609 metrin korkeudessa merenpinnasta.',
    },
    Connecticut: {
      lyhyt: 'Mysticin merimuseossa on Charles W. Morgan, maailman viimeinen säilynyt puinen valaanpyyntialus vuodelta 1841.',
    },
    Delaware: {
      lyhyt: 'Delaware ratifioi ensimmäisenä Yhdysvaltain perustuslain vuonna 1787, ja siksi sitä kutsutaan Ensimmäiseksi osavaltioksi.',
    },
    'District of Columbia': {
      lyhyt: 'Tidal Basinin rannan kirsikkapuut ovat Tokion lahja vuodelta 1912, ja niiden kukintaa juhlitaan joka kevät festivaalilla.',
    },
    Florida: {
      lyhyt: 'Evergladesin sahaheinäsoilla alligaattorit ja krokotiilit elävät rinnakkain, eikä sellaista paikkaa ole muualla maailmassa.',
    },
    Georgia: {
      lyhyt: 'Savannahin vanha keskusta on rakennettu ruudukkoon, jonka väleissä on 22 puistoaukiota vanhojen tammien varjossa.',
    },
    Hawaii: {
      lyhyt: 'Mauna Kea on merenpohjasta mitattuna yli 10 000 metriä korkea, ja sen huipulla on maailman suurimpia kaukoputkia.',
    },
    Idaho: {
      lyhyt: 'Idaho kasvattaa lähes kolmanneksen Yhdysvaltain perunoista, ja osavaltion rekisterikilvissä lukee Famous Potatoes.',
    },
    Illinois: {
      lyhyt: 'Chicagossa kaupungin halki virtaava joki värjätään joka pyhän Patrickin päivänä kirkkaan vihreäksi.',
    },
    Indiana: {
      lyhyt: 'Indianapolis 500 -autokilpailun voittaja juo perinteisesti voittajan kehässä pullollisen maitoa.',
    },
    Iowa: {
      lyhyt: 'Iowan osavaltiomessujen kuuluisin nähtävyys on voista veistetty luonnollisen kokoinen lehmä, jollainen on tehty vuodesta 1911.',
    },
    Kansas: {
      lyhyt: 'Yhdysvaltain 48 yhtenäisen osavaltion maantieteellinen keskipiste on Lebanonin pikkukaupungin lähellä Kansasissa.',
    },
    Kentucky: {
      lyhyt: 'Kentucky Derby ajetaan Louisvillessä toukokuun ensimmäisenä lauantaina, ja sitä kutsutaan urheilun kahdeksi hienoimmaksi minuutiksi.',
    },
    Louisiana: {
      lyhyt: 'New Orleansin Mardi Gras -kulkueiden vaunuista heitetään yleisölle värikkäitä helminauhoja.',
    },
    Maine: {
      lyhyt: 'Maine nostaa suurimman osan Yhdysvaltain amerikanhummereista, ja rannikon kylissä hummerirulla on kesän perusruokaa.',
    },
    Maryland: {
      lyhyt: 'Chesapeakenlahden sinirapuja syödään Marylandissa kokonaisina, kuoret puunuijalla rikkoen ja Old Bay -maustetta ripotellen.',
    },
    Massachusetts: {
      lyhyt: 'Bostonin maraton on juostu vuodesta 1897, ja se on maailman vanhin vuosittain järjestettävä maraton.',
    },
    Michigan: {
      lyhyt: 'Mackinacin saarella autot on kielletty vuodesta 1898, ja siellä liikutaan yhä hevosilla, polkupyörillä ja jalan.',
    },
    Minnesota: {
      lyhyt: 'Minnesotaa kutsutaan kymmenentuhannen järven maaksi, vaikka vähintään neljän hehtaarin järviä on todellisuudessa lähes 12 000.',
    },
    Mississippi: {
      lyhyt: 'Mississippin suistoalue on bluesin syntysijoja, ja Clarksdalen kaupungissa on Delta Blues Museum.',
    },
    Missouri: {
      lyhyt: 'St. Louisin Gateway Arch on 192 metriä korkea ruostumattomasta teräksestä tehty kaari, maailman korkein laatuaan.',
    },
    Montana: {
      lyhyt: 'Glacierin kansallispuiston Going-to-the-Sun Road ylittää Kalliovuoret Logan Passin kohdalla, ja lumen vuoksi se on auki vain kesällä.',
    },
    Nebraska: {
      lyhyt: 'Alliancen laitamilla seisoo Carhenge, Stonehengen kopio, joka on koottu 39 harmaaksi maalatusta vanhasta autosta.',
    },
    Nevada: {
      lyhyt: 'Black Rock -aavikolle nousee joka vuosi elokuun lopulla Burning Man -festivaalin tilapäinen kaupunki, joka puretaan viikon päästä jäljettömiin.',
    },
    'New Hampshire': {
      lyhyt: 'Mount Washingtonin huipulla mitattiin 1934 tuulenpuuska, 372 km/h, joka oli vuosikymmeniä maailman kovin mitattu tuuli.',
    },
    'New Jersey': {
      lyhyt: 'Margaten rannalla seisoo Lucy, kuusikerroksinen norsun muotoinen rakennus vuodelta 1881, jonka selkään voi kiivetä sisäportaita.',
    },
    'New Mexico': {
      lyhyt: 'Albuquerquen kansainvälisessä kuumailmapallofestivaalissa nousee lokakuussa ilmaan satoja palloja, ja se on maailman suurimpia.',
    },
    'New York': {
      lyhyt: 'Manhattanin Central Park on 341 hehtaarin puisto, jonka järvet, niityt ja metsiköt on suurelta osin muotoiltu ihmisen käsin.',
    },
    'North Carolina': {
      lyhyt: 'Ashevillen Biltmore-kartano on Yhdysvaltain suurin yksityisomistuksessa oleva talo, ja siinä on 250 huonetta.',
    },
    'North Dakota': {
      lyhyt: 'Theodore Rooseveltin kansallispuiston rapautuneilla karumailla, badlandseilla, laiduntavat biisonit ja villihevoset.',
    },
    Ohio: {
      lyhyt: 'Clevelandissa Erie-järven rannalla on Rock and Roll Hall of Fame, jonka lasipyramidin suunnitteli arkkitehti I. M. Pei.',
    },
    Oklahoma: {
      lyhyt: 'Oklahomassa on enemmän ajettavaa vanhaa Route 66 -tietä kuin missään muussa osavaltiossa, yli 600 kilometriä.',
    },
    Oregon: {
      lyhyt: 'Columbian rotkon Multnomah Falls putoaa kahdessa portaassa yhteensä 189 metriä, ja putousten välissä kulkee kapea kivisilta.',
    },
    Pennsylvania: {
      lyhyt: 'Punxsutawneyssä metsämurmeli Phil ennustaa joka helmikuun toinen päivä, jatkuuko talvi vielä kuusi viikkoa.',
    },
    'Rhode Island': {
      lyhyt: 'Newportin kalliorannalla seisovat miljonäärisukujen kesähuvilat, joita omistajat kutsuivat vaatimattomasti mökeiksi.',
    },
    'South Carolina': {
      lyhyt: 'Charlestonin Rainbow Row on rivi pastellinvärisiä 1700-luvun kauppiastaloja satamanpuoleisen East Bay Streetin varrella.',
    },
    'South Dakota': {
      lyhyt: 'Mount Rushmoren graniittiin on veistetty neljän presidentin kasvot, ja kukin pää on noin 18 metriä korkea.',
    },
    Tennessee: {
      lyhyt: 'Nashvillen Grand Ole Opry on radiossa lähetettävä countrymusiikin konsertti, jota on soitettu joka viikko vuodesta 1925.',
    },
    Texas: {
      lyhyt: 'Big Bendin kansallispuistossa Rio Grande kaartaa jyrkkäseinäisiin kanjoneihin, ja joen toisella rannalla on jo Meksiko.',
    },
    Utah: {
      lyhyt: 'Archesin kansallispuistossa on yli 2 000 luonnon muovaamaa hiekkakivikaarta, joista tunnetuin on Delicate Arch.',
    },
    Vermont: {
      lyhyt: 'Vermont tuottaa yli puolet Yhdysvaltain vaahterasiirapista, ja keväällä sokerimajoissa keitetään vaahteranmahlaa siirapiksi.',
    },
    Virginia: {
      lyhyt: 'Lurayn luolassa on urut, joiden kumivasarat kopauttavat tippukiviä ja soittavat niillä musiikkia.',
    },
    Washington: {
      lyhyt: 'Olympicin niemimaan Hoh-sademetsässä sataa noin 3,5 metriä vuodessa, ja vaahterat ja kuuset ovat sammalen verhoamia.',
    },
    'West Virginia': {
      lyhyt: 'New River Gorgen teräskaarisilta kulkee 267 metriä joen yläpuolella, ja lokakuun Bridge Dayna siltä saa hypätä laskuvarjolla.',
    },
    Wisconsin: {
      lyhyt: 'Wisconsin on Yhdysvaltain suurin juustontuottaja, ja Green Bayn jalkapallofanit pukevat päähänsä juustokolmion muotoisen hatun.',
    },
    Wyoming: {
      lyhyt: 'Yellowstonen Old Faithful -geysir purkautuu noin puolentoista tunnin välein, ja suihku nousee kymmenien metrien korkeuteen.',
    },
  },
  /*
   * CHE (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.CHE:n tunnuksia
   * TÄSMÄLLEEN (26 kantonia, Natural Earthin `name`, esim. "Genève",
   * "Lucerne" ja "Sankt Gallen"). Vain `lyhyt` tässä erässä.
   * Lähteet (en-Wikipedia, tarkistettu 25.9.2026):
   *   Aargau                 — Habsburg Castle (rakennettu n. 1020,
   *                            Habsburgien suvun alkuperäinen kotipaikka)
   *   Appenzell Ausserrhoden — Henry Dunant + Heiden, Switzerland (Heideniin
   *                            1887, kuoli siellä 1910, Nobel 1901)
   *   Appenzell Innerrhoden  — Appenzell Innerrhoden (Landsgemeinde huhtikuun
   *                            viim. sunnuntaina, n. 4000 osallistujaa;
   *                            naisten äänioikeus 1991 liittovaltion
   *                            tuomioistuimen päätöksellä)
   *   Basel-Landschaft       — Augusta Raurica (Alppien pohjoispuolen suurin
   *                            roomalainen teatteri, savustetun sianlihan
   *                            vienti; Augst Basel-Landiin 1833)
   *   Basel-Stadt            — Basel, osio Ferries (neljä virran voimalla
   *                            kulkevaa lossia, ei ulkoista energiaa)
   *   Bern                   — Einsteinhaus (Kramgasse 49, 1903–1905,
   *                            Annus Mirabilis -artikkelit, patenttivirasto)
   *   Fribourg               — Fribourg funicular (1899, jätevesi
   *                            painolastina)
   *   Genève                 — CERN (Meyrin, WWW 1989 Tim Berners-Lee,
   *                            LHC:n 27 km:n tunneli rajan yli)
   *   Glarus                 — Canton of Glarus (äänestysikä 16 v.
   *                            6.5.2007 ensimmäisenä, Landsgemeinde)
   *   Graubünden             — Grisons (ainoa kolmikielinen kantoni, ainoa
   *                            jossa retoromaani virallinen)
   *   Jura                   — Canton of Jura (uusin kantoni, 1979, erosi
   *                            Bernistä)
   *   Lucerne                — Kapellbrücke (Euroopan vanhin katettu
   *                            puusilta, tulipalo 1993, 1600-luvun maalaukset)
   *   Neuchâtel              — Absinthe (syntyi Neuchâtelin kantonissa,
   *                            kielto 1910–2005, Maison de l'Absinthe
   *                            entisessä oikeustalossa Môtiers'ssa) +
   *                            Val-de-Travers
   *   Nidwalden              — Stanserhorn (maailman ensimmäinen "CabriO",
   *                            avokattoinen kaksikerroksinen köysirata 2012)
   *   Obwalden               — Pilatus Railway (Alpnachstad, maailman jyrkin
   *                            hammasrata, enintään 48 %)
   *   Schaffhausen           — Canton of Schaffhausen (pidempi raja Saksan
   *                            kuin muiden kantonien kanssa, Büsingenin
   *                            saareke)
   *   Schwyz                 — Canton of Schwyz + Federal Charter of 1291
   *                            (maan nimi ja lippu, liittokirja museossa)
   *   Solothurn              — Solothurn (Ranskan lähettilään kotipaikka
   *                            1530–1792, autoton barokkivanhakaupunki)
   *   Sankt Gallen           — Abbey library of Saint Gall (maailman
   *                            vanhimpia luostarikirjastoja, rokokoosali,
   *                            muumio Shep-en-Isis)
   *   Thurgau                — Thurgau (omena- ja päärynätarhat, sato
   *                            pääosin siideriksi)
   *   Ticino                 — Monte San Giorgio (Unesco 2003, keskitrias,
   *                            yli 21 000 fossiilia vuoteen 2010 mennessä)
   *   Uri                    — Gotthard Base Tunnel (Erstfeld–Giornico,
   *                            57,09 km, maailman pisin, syvyys 2 450 m)
   *   Valais                 — Hérens cattle (lehmätaistelut, loppuottelu
   *                            vuodesta 1922, "queen of queens")
   *   Vaud                   — Lausanne (maailman pienin kaupunki, jolla on
   *                            metro; KOK:n päämaja)
   *   Zug                    — Canton of Zug (verot bitcoinina tai Etheruminä
   *                            100 000 frangiin asti vuodesta 2021)
   *   Zürich                 — Cabaret Voltaire (Zurich) (dadan syntypaikka
   *                            1916, Spiegelgasse, Lenin samalla kadulla)
   */
  CHE: {
    Aargau: {
      lyhyt: 'Habsburgin kylän kukkulalla seisoo noin 1020 rakennettu linna, josta yksi Euroopan mahtavimmista hallitsijasuvuista sai nimensä.',
    },
    'Appenzell Ausserrhoden': {
      lyhyt: 'Punaisen Ristin perustaja Henry Dunant vietti viimeiset vuotensa Heidenin kylässä, ja siellä asuessaan hän sai ensimmäisen Nobelin rauhanpalkinnon.',
    },
    'Appenzell Innerrhoden': {
      lyhyt: 'Appenzellin aukiolle kokoontuu joka huhtikuu tuhansia kansalaisia päättämään kantonin asioista – naiset pääsivät mukaan vasta 1991.',
    },
    'Basel-Landschaft': {
      lyhyt: 'Augusta Rauricassa oli Alppien pohjoispuolen suurin roomalainen teatteri, ja kaupungista vietiin savustettua sianlihaa ympäri valtakuntaa.',
    },
    'Basel-Stadt': {
      lyhyt: 'Baselin Rein-lossit kulkevat ilman moottoria: lossari kääntää veneen vinoon virtaan, ja virta työntää sen vaijeria pitkin toiselle rannalle.',
    },
    Bern: {
      lyhyt: 'Bernin Kramgassen talossa 49 Albert Einstein kirjoitti 1905 artikkelit, joissa hän esitteli suhteellisuusteoriansa – päivät hän teki töitä patenttivirastossa.',
    },
    Fribourg: {
      lyhyt: 'Fribourgin köysirataa on vuodesta 1899 liikuttanut jätevesi: yläpään vaunuun lasketaan viemärivettä, ja painava vaunu vetää toisen ylös.',
    },
    'Genève': {
      lyhyt: 'Genevessä CERNissä syntyi 1989 World Wide Web, ja 27 kilometrin hiukkaskiihdytin kiertää maan alla Ranskan rajan yli.',
    },
    Glarus: {
      lyhyt: 'Glarus laski äänestysiän 16 vuoteen 2007 ensimmäisenä Sveitsin kantonina, ja asioista päättää yhä Landsgemeinde-kansankokous.',
    },
    'Graubünden': {
      lyhyt: 'Graubünden on Sveitsin ainoa kolmikielinen kantoni ja ainoa, jossa maan neljäs kansalliskieli retoromaani on virallinen kieli.',
    },
    Jura: {
      lyhyt: 'Jura on Sveitsin nuorin kantoni: se irtautui Bernistä pitkän ja paikoin kiivaan kamppailun jälkeen ja liittyi valaliittoon 1979.',
    },
    Lucerne: {
      lyhyt: 'Luzernin Kapellbrücke on Euroopan vanhin katettu puusilta, mutta tulipalo tuhosi 1993 suuren osan siitä ja sen 1600-luvun maalauksista.',
    },
    'Neuchâtel': {
      lyhyt: 'Absintti syntyi Neuchâtelissa, ja Môtiers’n absinttimuseo toimii entisessä oikeustalossa, jossa kiellon aikana tuomittiin tislaajia.',
    },
    Nidwalden: {
      lyhyt: 'Stanserhornille nousevassa köysiradassa on avoin yläkansi – se oli avatessaan 2012 maailman ensimmäinen kaksikerroksinen avokattoinen köysirata.',
    },
    Obwalden: {
      lyhyt: 'Alpnachstadista Pilatukselle kiipeävä hammasrata on maailman jyrkin: jyrkimmässä kohdassa kaltevuus on 48 prosenttia.',
    },
    Schaffhausen: {
      lyhyt: 'Schaffhausenilla on pidempi raja Saksan kuin muiden kantonien kanssa, ja sen kupeessa on Büsingen, Saksalle kuuluva saareke.',
    },
    Schwyz: {
      lyhyt: 'Koko Sveitsi on saanut nimensä ja lippunsa Schwyzin kantonilta, ja vuoden 1291 liittokirja on yhä nähtävillä Schwyzin museossa.',
    },
    Solothurn: {
      lyhyt: 'Solothurn oli 1530–1792 Ranskan Sveitsin-lähettilään kotipaikka, ja sen autoton vanhakaupunki on täynnä barokkirakennuksia.',
    },
    'Sankt Gallen': {
      lyhyt: 'St. Gallenin luostarikirjasto on maailman vanhimpia, ja sen rokokoosalissa lepää keskiaikaisten käsikirjoitusten seassa egyptiläinen muumio.',
    },
    Thurgau: {
      lyhyt: 'Thurgaussa kasvaa omenaa ja päärynää niin paljon, että suurin osa hedelmätarhojen sadosta puristetaan siideriksi.',
    },
    Ticino: {
      lyhyt: 'Luganonjärven yllä kohoavasta Monte San Giorgiosta on kaivettu yli 21 000 fossiilia triaskauden merestä – vuori on Unescon maailmanperintöä.',
    },
    Uri: {
      lyhyt: 'Erstfeldistä alkava Gotthardin pohjatunneli on 57 kilometriä pitkä, maailman pisin rautatietunneli, ja kalliota on enimmillään 2 450 metriä yllä.',
    },
    Valais: {
      lyhyt: 'Valais’n Hérens-lehmät ottelevat keväisin sarvet vastakkain, ja kansallisen loppuottelun voittaja kruunataan kuningattarien kuningattareksi.',
    },
    Vaud: {
      lyhyt: 'Lausanne on maailman pienin kaupunki, jolla on oma metro, ja siellä on myös Kansainvälisen olympiakomitean päämaja.',
    },
    Zug: {
      lyhyt: 'Zugissa veroja voi maksaa bitcoineina: kantoni hyväksyy kryptovaluuttaa 100 000 frangiin asti ja vaihtaa sen itse frangeiksi.',
    },
    'Zürich': {
      lyhyt: 'Zürichin Spiegelgassella avattu Cabaret Voltaire synnytti 1916 dada-taideliikkeen – samalla kadulla asui samaan aikaan Lenin.',
    },
  },
  /*
   * PRT (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.PRT:n tunnuksia
   * (18 manner-Portugalin piiriä + autonomiset alueet Azorit ja
   * Madeira). Vain `lyhyt` tässä erässä, kuten GRC:llä.
   *
   * Lähteet (Fablen vaatimus 25.9.2026): faktat tarkistettu
   * en-Wikipediasta 25.9.2026, artikkelit:
   *   Aveiro           — Aveiro, Portugal ("Portuguese Venice", moliceiro-
   *                      veneet keräsivät moliço-levää, nyt matkailijoita)
   *   Azores           — Mount Pico (2 351 m, Portugalin korkein vuori)
   *   Beja             — Mértola (Matriz oli moskeija, kirkoksi 1238
   *                      valloituksen jälkeen, rakenne säilytettiin)
   *   Braga            — Bom Jesus funicular (25.3.1882, maailman vanhin
   *                      vesipainolla kulkeva köysirata)
   *   Bragança         — Mirandese language (laki 7/99, 29.1.1999; noin
   *                      3 500 puhujaa 2020)
   *   Castelo Branco   — Monsanto (Idanha-a-Nova) (portugalilaisin kylä
   *                      1938, talot lohkareiden väliin)
   *   Coimbra          — Biblioteca Joanina (lepakot syövät hyönteisiä)
   *   Évora            — Capela dos Ossos (noin 5 000 vainajaa, "We bones
   *                      that are here await yours")
   *   Faro             — Cape St. Vincent (Manner-Euroopan lounaisin kärki,
   *                      majakka näkyy 60 km)
   *   Guarda           — Guarda, Portugal (1 056 m, korkein kaupunki,
   *                      viisi F:ää, Fria = kylmä)
   *   Leiria           — Nazaré Canyon (noin 5 000 m syvä, Praia do Norte,
   *                      Steudtnerin 26,2 m ennätys 2020)
   *   Lisboa           — Cabo da Roca (Manner-Euroopan läntisin kärki,
   *                      Sintra, majakka 165 m merenpinnasta)
   *   Madeira          — Levada (Madeira) (yli 2 170 km, kävelyreitit)
   *   Portalegre       — Elvas (maailman suurin kuivien vallihautojen
   *                      bastionijärjestelmä, Unesco 2012)
   *   Porto            — Vila Nova de Gaia (portviinikellarit "caves",
   *                      suuri matkailunähtävyys)
   *   Santarém         — Festa dos Tabuleiros (Tomar, joka 4. vuosi
   *                      heinäkuussa, 30 leipää tarjottimessa)
   *   Setúbal          — Setúbal ("A dolphin colony inhabits the Sado
   *                      River", Arrábidan kukkulat)
   *   Viana do Castelo — Gil Eannes (ship) (sairaalalaiva turskalaivastolle
   *                      1955–1973, museo satamassa)
   *   Vila Real        — Mateus Palace (Nasoni, antaa nimen Mateus-
   *                      roseelle)
   *   Viseu            — Lamego (686 porrasta, Nossa Senhora dos Remédios;
   *                      "Legend holds" ensimmäiset Cortes 1143)
   */
  PRT: {
    Aveiro: {
      lyhyt: 'Aveiroa kutsutaan Portugalin Venetsiaksi: moliceiro-veneet keräsivät ennen kanavilla levää, nyt ne kuljettavat matkailijoita.',
    },
    Azores: {
      lyhyt: 'Azorien Pico-saaren tulivuori kohoaa keskellä Atlanttia 2 351 metriin – se on koko Portugalin korkein vuori.',
    },
    Beja: {
      lyhyt: 'Mértolan pääkirkko oli alun perin moskeija, ja kun kaupunki valloitettiin 1238, rakennus muutettiin kirkoksi muotoaan hävittämättä.',
    },
    Braga: {
      lyhyt: 'Bom Jesus do Monten pyhäkölle nousee vuodesta 1882 köysirata, jota liikuttaa yhä vesipaino – maailman vanhin laatuaan.',
    },
    'Bragança': {
      lyhyt: 'Miranda do Douron seudulla puhutaan omaa mirandeesin kieltä, joka tunnustettiin virallisesti 1999 – puhujia on noin 3 500.',
    },
    'Castelo Branco': {
      lyhyt: 'Monsanton kylän talot on muurattu jättimäisten graniittilohkareiden väliin, ja 1938 se valittiin Portugalin portugalilaisimmaksi kyläksi.',
    },
    Coimbra: {
      lyhyt: 'Coimbran yliopiston barokkikirjastossa Biblioteca Joaninassa asuu lepakoita, jotka syövät öisin kirjoja uhkaavat hyönteiset.',
    },
    'Évora': {
      lyhyt: 'Évoran Luukappelin seinät on vuorattu noin 5 000 vainajan luilla, ja oven yllä lukee: me luut täällä odotamme teidän luitanne.',
    },
    Faro: {
      lyhyt: 'Algarven Cabo de São Vicente on Manner-Euroopan lounaisin kärki, ja sen majakan valo näkyy merelle 60 kilometrin päähän.',
    },
    Guarda: {
      lyhyt: 'Guarda on 1 056 metrissä Portugalin korkeimmalla sijaitseva kaupunki, ja sitä kutsutaan viiden F:n kaupungiksi – yksi niistä on fria, kylmä.',
    },
    Leiria: {
      lyhyt: 'Nazarén edustalla kulkee noin 5 000 metriä syvä merenalainen kanjoni, joka nostaa Praia do Norten jättiaallot – niillä on surffattu maailmanennätyksiä.',
    },
    Lisboa: {
      lyhyt: 'Sintran Cabo da Roca on Manner-Euroopan läntisin kärki, ja sen majakka valaisee Atlanttia 165 metrin korkeudesta.',
    },
    Madeira: {
      lyhyt: 'Madeiran vuorenrinteillä kiemurtelee yli 2 000 kilometriä levada-kastelukanavia, ja niiden vartta pitkin vaelletaan kuin polkuja.',
    },
    Portalegre: {
      lyhyt: 'Elvasin rajakaupunkia kiertää maailman suurin kuivien vallihautojen linnoitusjärjestelmä, ja se on Unescon maailmanperintöä.',
    },
    Porto: {
      lyhyt: 'Douron etelärannalla Vila Nova de Gaian kellareissa kypsyy portviini, ja kellareista on tullut Porton seudun suuri nähtävyys.',
    },
    'Santarém': {
      lyhyt: 'Tomarin Festa dos Tabuleirosissa tytöt kantavat päänsä päällä 30 leivästä pinottuja kukkatarjottimia – juhla pidetään joka neljäs vuosi.',
    },
    'Setúbal': {
      lyhyt: 'Setúbalin Sadojoessa elää delfiiniyhdyskunta, ja kaupungin kupeessa kohoavat Arrábidan luonnonpuiston kukkulat.',
    },
    'Viana do Castelo': {
      lyhyt: 'Viana do Castelon satamassa on sairaalalaiva Gil Eannes, joka saattoi turskanpyytäjiä Newfoundlandiin 1955–1973 – nyt se on museo.',
    },
    'Vila Real': {
      lyhyt: 'Vila Realin barokkipalatsi Mateus on antanut nimensä Mateus-roseeviinille, ja sen suunnitteli 1700-luvulla Nicolau Nasoni.',
    },
    Viseu: {
      lyhyt: 'Lamegossa kiivetään 686 porrasta Nossa Senhora dos Remédiosin barokkikirkolle, ja tarun mukaan Portugalin ensimmäiset säätykokoukset pidettiin täällä 1143.',
    },
  },
  /*
   * HUN (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.HUN:n tunnuksia
   * (19 lääniä + Budapest). Vain `lyhyt` tässä erässä, kuten GRC:llä.
   * Budapest on pelissä jo kaupunkina (kulttuuri-kategoriat.js,
   * europe-artikkelit.js): sen lyhyt välttää olemassa olevien
   * nostojen aiheet (parlamentti, kylpylät, metro, raunioravintolat,
   * Rubik, keskushalli, kaupunkien yhdistyminen 1873).
   *
   * Lähteet (Fablen vaatimus 25.9.2026): faktat tarkistettu
   * en-Wikipediasta 25.9.2026, artikkelit:
   *   Bács-Kiskun           — Kalocsa (Bács-Kiskun, Paprikamuseo,
   *                           "red gold", syyskuun punaiset pellot)
   *   Baranya               — Busójárás (Mohács, naamiot, turkkilaiset
   *                           pelästyivät melua, Unesco 2009)
   *   Békés                 — Szarvas (Unkarin maantieteellinen keskipiste
   *                           ennen Trianonia, tuulimyllymuistomerkki)
   *   Borsod-Abaúj-Zemplén  — Tokaj wine region (Unesco 2002, Ludvig XIV
   *                           "Vinum Regum, Rex Vinorum")
   *   Budapest              — Budapest Children's Railway (10–14-vuotiaat
   *                           hoitavat kaiken paitsi veturinkuljettajan)
   *   Csongrád              — Arrival of the Hungarians (Feszty, lähes
   *                           120 m, Ópusztaszer 1995 alkaen) + Ópusztaszer
   *                           (Csongrád-Csanád)
   *   Fejér                 — Székesfehérvár (43 kuningasta kruunattu,
   *                           basilikan rauniot kaivettu, avoinna)
   *   Győr-Moson-Sopron     — Pan-European Picnic (Sopron 19.8.1989,
   *                           661 ylitti rajan)
   *   Hajdú-Bihar           — Hortobágy National Park (1. kansallispuisto
   *                           1973, Euroopan suurin puoliluonnontilainen
   *                           niitty, csikós-paimenet)
   *   Heves                 — Siege of Eger (1552) (2 100–2 300 puolustajaa,
   *                           35 000–40 000 osmania, puolustus onnistui)
   *   Jász-Nagykun-Szolnok  — Palingenia longicauda (Tiszan kukinta
   *                           kesäkuun puolivälissä, aikuiset elävät
   *                           tunteja) + Jász-Nagykun-Szolnok County
   *                           (Tisza virtaa läänin halki)
   *   Komárom-Esztergom     — Esztergom Basilica (Unkarin suurin kirkko,
   *                           ulkoa 100 m korkea)
   *   Nógrád                — Hollókő ("Raven-stone", palócit, Unesco 1987)
   *   Pest                  — Visegrád, Hungary (kongressi 1335,
   *                           Visegrád-ryhmä 15.2.1991 viittauksena siihen)
   *   Somogy                — Siófok ("capital of Lake Balaton", 17 km
   *                           rantaa, yli 1 000 hotellia, yökerhot)
   *   Szabolcs-Szatmár-Bereg — Szabolcs–Szatmár–Bereg County (luumut:
   *                           tuoreena, kuivattuna, lekvár, paloviinat)
   *   Tolna                 — Gemenc (Szekszárdin ja Bajan välissä,
   *                           saksanhirvien sarvet maailmankuuluja)
   *   Vas                   — Szombathely (Unkarin vanhin kaupunki,
   *                           Savaria 45 jaa., Pyhän Martin syntymäpaikka)
   *   Veszprém              — Herend Porcelain Manufactory (taideposliini
   *                           1839 alkaen, Habsburgien hovin hankkija)
   *   Zala                  — Lake Hévíz (Euroopan suurin uimakelpoinen
   *                           lämpöjärvi, talvella n. 22 °C ja usva)
   */
  HUN: {
    'Bács-Kiskun': {
      lyhyt: 'Kalocsassa on oma paprikamuseo, ja syyskuussa kypsyvät pellot hehkuvat niin punaisina, että maustetta kutsutaan punaiseksi kullaksi.',
    },
    Baranya: {
      lyhyt: 'Mohácsin busójárásissa naamioidut busót meluavat helmikuussa kaduilla – tarun mukaan sama meteli ajoi aikoinaan turkkilaiset pakoon.',
    },
    'Békés': {
      lyhyt: 'Szarvasissa Körös-joen rannalla tuulimyllyn muotoinen muistomerkki näyttää, missä Unkarin keskipiste oli ennen vuoden 1920 rajoja.',
    },
    'Borsod-Abaúj-Zemplén': {
      lyhyt: 'Tokajin viinialue on Unescon listalla, ja sen aszú-viini kelpasi jo Ludvig XIV:lle – hän kutsui sitä kuninkaiden viiniksi.',
    },
    Budapest: {
      lyhyt: 'Budan kukkuloilla kulkee Lastenrata, jonka junissa kaikki työt veturinkuljettajaa lukuun ottamatta hoitavat 10–14-vuotiaat lapset.',
    },
    'Csongrád': {
      lyhyt: 'Ópusztaszerissa Feszty-panoraama kiertää katsojan ympäri: lähes 120 metriä pitkä maalaus unkarilaisten saapumisesta tälle tasangolle.',
    },
    'Fejér': {
      lyhyt: 'Székesfehérvárissa kruunattiin keskiajalla 43 Unkarin kuningasta, ja kaivettujen basilikan raunioiden keskellä voi nyt kävellä.',
    },
    'Győr-Moson-Sopron': {
      lyhyt: 'Sopronin lähellä rajaportti avattiin elokuussa 1989 Pan-Eurooppa-piknikillä, ja 661 itäsaksalaista juoksi samana päivänä Itävaltaan.',
    },
    'Hajdú-Bihar': {
      lyhyt: 'Hortobágy on Euroopan suurin puoliluonnontilainen niitty, ja sen arolla karjaa ja hevosia paimentavat yhä ratsastavat csikós-paimenet.',
    },
    Heves: {
      lyhyt: 'Egerin linnassa muistetaan vuotta 1552, kun runsaat 2 000 puolustajaa kesti moninkertaisen osmaniarmeijan piirityksen.',
    },
    'Jász-Nagykun-Szolnok': {
      lyhyt: 'Kesäkuun puolivälissä Tisza kukkii: valtavat päivänkorentoparvet kuoriutuvat joesta, ja aikuisina ne elävät vain muutaman tunnin.',
    },
    'Komárom-Esztergom': {
      lyhyt: 'Esztergomin basilika on Unkarin suurin kirkko, ja sen kupoli kohoaa Tonavan rannalla ulkoa sadan metrin korkeuteen.',
    },
    'Nógrád': {
      lyhyt: 'Hollókő eli Korppikivi on palócien vanha kylä, jonka puiset talot ja kapea raitti ovat olleet Unescon maailmanperintöä vuodesta 1987.',
    },
    Pest: {
      lyhyt: 'Visegrádissa kolme kuningasta neuvotteli rauhasta 1335, ja siksi Unkarin, Puolan ja Tšekkoslovakian yhteistyö sai 1991 nimen Visegrád-ryhmä.',
    },
    Somogy: {
      lyhyt: 'Siófokia kutsutaan Balatonin pääkaupungiksi: 17 kilometrin rannalla on yli tuhat hotellia, ja kesäöisin yökerhot ovat täynnä.',
    },
    'Szabolcs-Szatmár-Bereg': {
      lyhyt: 'Maakunta on kuuluisa luumuistaan: niitä syödään tuoreina, kuivataan, keitetään lekvár-hilloksi ja tislataan tunnetuiksi paloviinoiksi.',
    },
    Tolna: {
      lyhyt: 'Szekszárdin kupeessa Gemencin tulvametsässä elää saksanhirviä, joiden mahtavat sarvet ovat maailmankuulut.',
    },
    Vas: {
      lyhyt: 'Szombathely on Unkarin vanhin kaupunki: roomalaiset perustivat Savarian vuonna 45, ja täällä syntyi myös Pyhä Martti Toursilainen.',
    },
    'Veszprém': {
      lyhyt: 'Herendin tehtaassa on maalattu posliinia käsin vuodesta 1839, ja 1800-luvulla sen astioita toimitettiin Habsburgien hoville.',
    },
    Zala: {
      lyhyt: 'Hévízin järvi on Euroopan suurin lämmin järvi, jossa voi uida – talvellakin vesi pysyy noin 22-asteisena, ja pinnalla leijuu usva.',
    },
  },
  /*
   * SWE (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.SWE:n tunnuksia
   * (21 lääniä, Natural Earthin `name`; Örebro on avaimena "Orebro"
   * ilman ääkköstä). Vain `lyhyt` tässä erässä, kuten GRC:llä.
   * Stockholm: Tukholman kaupunki on pelissä jo laajasti (Nobel,
   * saaret, Vasa, Gamla stan, saaristo, metrotaide), joten läänin
   * nosto on kaupungin ulkopuolelta (Birka, Ekerö).
   *
   * LÄHTEET (en-Wikipedia, tarkistettu 25.9.2026; sv-Wikipedia
   * mainittu erikseen):
   *   Blekinge        — Naval Port of Karlskrona (Unesco 1998, köysipunomo
   *                     maan pisin puurakennus, tukikohta yhä käytössä)
   *   Dalarna         — Vasaloppet (90 km Berga/Sälen–Mora, 1922 alkaen,
   *                     maailman vanhin ja osallistujamäärältään suurin)
   *   Gotland         — Visby City Wall (n. 3,44 km pystyssä, 27 suurta
   *                     ja 9 pientä tornia jäljellä)
   *   Gävleborg       — Gävle goat (1966 alkaen, 43/60 pukkia tuhottu tai
   *                     vahingoitettu joulukuuhun 2025 mennessä)
   *   Halland         — Bocksten Man (1300-luvun puoliväli, murhattu ja
   *                     paaluttu suohon, vaatteet säilyneet, Hallandin
   *                     kulttuurihistoriallinen museo Varbergissa)
   *   Jämtland        — Storsjöodjuret (maininta 1635, lääni rauhoitti
   *                     uhanalaisena lajina 1986, kumottiin 2005)
   *   Jönköping       — Jönköping (tulitikkuteollisuus 1845–1970,
   *                     Match Museum ensimmäisessä tehtaassa, Vättern)
   *   Kalmar          — Öland Bridge (6 072 m, avattu 30.9.1972, Euroopan
   *                     pisin silta 1972–1998)
   *   Kronoberg       — Älmhult (ensimmäinen IKEA-tavaratalo, IKEA Museum
   *                     avattu 30.6.2016, Kronobergin lääni)
   *   Norrbotten      — Icehotel (Jukkasjärvi) (1990, Torniojoen jää,
   *                     rakennetaan joka talvi ja sulaa keväällä jokeen)
   *   Skåne           — Ale's Stones (59 kiveä, 67 m, laivan muoto,
   *                     Kåseberga n. 10 km Ystadista kaakkoon)
   *   Stockholm       — Birka (Björkö Mälarissa, Ekerön kunta, n. 750–975,
   *                     Unesco 1993, "Sweden's oldest town")
   *   Södermanland    — Nyköping Banquet (10.–11.12.1317, Birger vangitsi
   *                     veljensä Erikin ja Valdemarin, kuolivat tyrmässä)
   *   Uppsala         — Gamla Uppsala (kolme kuningaskumpua, n. 550–625,
   *                     perimätieto Odin, Freyr ja Thor)
   *   Värmland        — Klarälven (uitto päättyi 1991 viimeisenä
   *                     Ruotsissa) + Visit Värmland / Vildmark i Värmland
   *                     (matkailijat rakentavat oman tukkilautan)
   *   Västerbotten    — Västerbottensost (vain Burträskin meijerissä,
   *                     perimätieto karjapiika Ulrika Eleonora Lindström
   *                     1870-luvulla)
   *   Västernorrland  — High Coast (Unesco 2000, maa kohoaa n. 8 mm
   *                     vuodessa, korkein rantaviiva n. 285 m)
   *   Västmanland     — Sala Silver Mine (maanalainen yöpymissviitti) +
   *                     sv: Sala silvergruva (Kaarle IX: "Riksens
   *                     förnämsta Clenodium")
   *   Västra Götaland — Rock Carvings in Tanum (pronssikausi, tuhansia
   *                     kuvia, Vitlyckehällissä lähes 300)
   *   Orebro          — Svampen (sienenmuotoinen vesitorni 1958, 58 m,
   *                     hissi yläkertaan, kahvila terassilla)
   *   Östergötland    — Rök runestone (n. 760 merkkiä, pisin tunnettu
   *                     kiveen hakattu riimukirjoitus, Rökin kirkko)
   */
  SWE: {
    Blekinge: {
      lyhyt: 'Karlskronan laivastotukikohta on Unescon maailmanperintöä ja yhä käytössä, ja sen köysipunomo on Ruotsin pisin puurakennus.',
    },
    Dalarna: {
      lyhyt: 'Maaliskuun ensimmäisenä sunnuntaina tuhannet hiihtävät Sälenistä Moraan: 90 kilometrin Vasaloppet on maailman vanhin hiihtokilpailu.',
    },
    Gotland: {
      lyhyt: 'Visbyn keskiaikaista kaupunginmuuria on yhä pystyssä yli kolme kilometriä, ja sen torneista 36 vartioi edelleen vanhaa kaupunkia.',
    },
    'Gävleborg': {
      lyhyt: 'Gävlen keskustaan pystytetään joka joulu jättimäinen olkipukki, ja vuodesta 1966 lähtien se on poltettu tai rikottu yli 40 kertaa.',
    },
    Halland: {
      lyhyt: 'Varbergin museossa on Bockstenin mies, 1300-luvulla murhattu ja suohon paalutettu, jonka keskiaikaiset vaatteet säilyivät lähes kokonaan.',
    },
    'Jämtland': {
      lyhyt: 'Storsjön-järven hirviöstä on kerrottu jo 1600-luvulta, ja 1986 lääni rauhoitti sen uhanalaisena lajina – päätös kumottiin vasta 2005.',
    },
    'Jönköping': {
      lyhyt: 'Vätternin rannalla Jönköpingin ensimmäisessä tulitikkutehtaassa on nyt tulitikkumuseo – täällä tehtiin turvatikkuja yli sata vuotta.',
    },
    Kalmar: {
      lyhyt: 'Ölannin silta kurottaa Kalmarista saarelle yli kuusi kilometriä, ja valmistuessaan 1972 se oli Euroopan pisin silta.',
    },
    Kronoberg: {
      lyhyt: 'Älmhultiin rakennettiin maailman ensimmäinen Ikea-tavaratalo, ja sen paikalla toimii nyt vuonna 2016 avattu Ikea-museo.',
    },
    Norrbotten: {
      lyhyt: 'Jukkasjärven jäähotelli rakennetaan joka talvi uudelleen Torniojoen jäästä, ja keväällä se sulaa takaisin jokeen.',
    },
    'Skåne': {
      lyhyt: 'Kåsebergan rannikolla Ystadin lähellä seisoo Ales stenar: 59 suurta kiveä, jotka muodostavat 67 metriä pitkän laivan muodon.',
    },
    Stockholm: {
      lyhyt: 'Mälarin Björkön saarella oli viikinkiajan kauppakaupunki Birka, jota pidetään Ruotsin vanhimpana kaupunkina ja joka on nyt Unescon listalla.',
    },
    'Södermanland': {
      lyhyt: 'Nyköpingin linnassa kuningas Birger kutsui veljensä joulupitoihin 1317 ja heitti heidät tyrmään – kumpikaan ei päässyt sieltä elävänä.',
    },
    Uppsala: {
      lyhyt: 'Gamla Uppsalan kolme kuningaskumpua kasattiin yli 1 400 vuotta sitten, ja perimätieto liitti ne aikoinaan Odiniin, Freyriin ja Thoriin.',
    },
    'Värmland': {
      lyhyt: 'Klarälvenin uitto loppui 1991 viimeisenä Ruotsissa, mutta nyt matkailijat rakentavat itse tukkilautan ja lipuvat sillä jokea alas.',
    },
    'Västerbotten': {
      lyhyt: 'Västerbottensjuustoa tehdään vain Burträskin meijerissä, ja tarun mukaan sen keksi siellä 1870-luvulla karjapiika Ulrika Eleonora Lindström.',
    },
    'Västernorrland': {
      lyhyt: 'Korkearannikon maa kohoaa yhä lähes sentin vuodessa jääkauden jäljiltä, ja vanha rantaviiva on nyt noin 285 metrin korkeudessa.',
    },
    'Västmanland': {
      lyhyt: 'Kuningas Kaarle IX kutsui Salan hopeakaivosta valtakunnan kalleimmaksi aarteeksi – nyt sen syvyyksissä voi yöpyä maanalaisessa sviitissä.',
    },
    'Västra Götaland': {
      lyhyt: 'Tanumin kallioihin hakattiin pronssikaudella tuhansia kuvia laivoista, vaunuista ja ihmisistä – Vitlyckessä lähes 300 samaan kallioon.',
    },
    Orebro: {
      lyhyt: 'Örebron sienenmuotoinen vesitorni Svampen valmistui 1958, ja 58 metrin korkeuteen hissi vie kahvilaan ja näköalaterassille.',
    },
    'Östergötland': {
      lyhyt: 'Rökin kirkon vieressä seisoo Rökin riimukivi, jossa on noin 760 riimua – se on pisin tunnettu kiveen hakattu riimukirjoitus.',
    },
  },
  /*
   * NOR (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.NOR:n tunnuksia:
   * Natural Earthin 19 vanhaa (ennen 2020 uudistusta) fylkeä sekä
   * Svalbard (Huippuvuoret) ja Bouvet Island. Jan Mayen ei ole omana
   * avaimenaan. Luonnehdinta kertoo paikan, joka kuului juuri siihen
   * vanhaan fylkeen. Vain `lyhyt` tässä erässä, kuten GRC:llä.
   *
   * Lähteet (Fablen vaatimus 25.9.2026): faktat tarkistettu
   * en-Wikipediasta 25.9.2026, artikkelit:
   *   Akershus          — Eidsvollsbygningen (perustuslaki 17.5.1814,
   *                       kansallismonumentti ja museo, Akershus)
   *   Aust-Agder        — Grimstad Municipality (Ibsen apteekin
   *                       oppipoikana 1844–1847, Catilina 1848/49,
   *                       nuoruusvuosien museo) + Aust-Agder (Grimstad)
   *   Bouvet Island     — Bouvet Island (maailman syrjäisin saari,
   *                       93 % jäätikköä, 1 700 km Kuningatar Maudin maahan)
   *   Buskerud          — Kongsberg Silver Mines (1623–1958, yli 4 000
   *                       työntekijää 1770-luvulla, Norjan suurin
   *                       esiteollinen työpaikka) + Buskerud (Kongsberg)
   *   Finnmark          — Rock carvings at Alta (yli 6 000 piirrosta,
   *                       vanhimmat n. 4200 eaa., Unesco 1985, n. 3 km
   *                       puisia kulkuteitä Jiepmaluoktassa)
   *   Hedmark           — Trysil Municipality (Trysilfjellet Norjan
   *                       suurin talviurheilukeskus, 65 rinnettä;
   *                       kuului historiallisesti Hedmarkiin)
   *   Hordaland         — Bryggen (hansakontori n. 1350, Unesco 1979)
   *                       + Hordaland (Bergen osa läänistä 1972 alkaen)
   *   Svalbard          — Svalbard (jääkarhut suojeltuja, asutuksen
   *                       ulkopuolella karkotusvälineet pakollisia,
   *                       aseen kantamista suositellaan)
   *   Møre og Romsdal   — Atlantic Ocean Road (8,3 km, kahdeksan
   *                       siltaa, "world's best road trip")
   *   Nord-Trøndelag    — Battle of Stiklestad (1030, Olavi II kaatui)
   *                       + Nord-Trøndelag (Saint Olav Drama 1954 alkaen)
   *   Nordland          — Saltstraumen (jopa 400 milj. m³ kuuden tunnin
   *                       välein, pyörteet, Bodø)
   *   Oppland           — Galdhøpiggen (2 469 m, Pohjois-Euroopan
   *                       korkein, Galdhøpiggen Summer Ski Centre
   *                       jäätiköllä) + Oppland (Galdhøpiggen läänissä)
   *   Oslo              — Nobel Peace Prize (ainoa Nobel, jota ei
   *                       ojenneta Tukholmassa, 10.12., Oslon
   *                       kaupungintalo 1990 alkaen, kuninkaan läsnä ollessa)
   *   Rogaland          — Preikestolen (604 m Lysevuonon yllä,
   *                       300 000 kävijää 2024)
   *   Sogn og Fjordane  — Sognefjord (205 km, syvin 1 308 m, "King of
   *                       the Fjords")
   *   Sør-Trøndelag     — Nidaros Cathedral (Olavi II:n hautapaikan
   *                       päällä, maailman pohjoisin keskiaikainen
   *                       katedraali) + Sør-Trøndelag (Trondheim)
   *   Telemark          — Rjukan (ei suoraa auringonvaloa syys–
   *                       maaliskuussa, peilit 2013 heijastavat torille)
   *   Troms             — Tromsø (keskiyön aurinko 19.5.–27.7. eli 71 vrk, kaamos
   *                       28.11.–14.1., 48 vrk)
   *   Vest-Agder        — Lindesnes Lighthouse (majakka paikalla vuodesta
   *                       1656) + Vest-Agder (Lindesnes manner-Norjan
   *                       eteläisin kohta)
   *   Vestfold          — Oseberg ship (hautakumpu Tønsbergin lähellä,
   *                       kaivaus 1904–1905, kaksi naista, hautaus
   *                       syksyllä 834)
   *   Østfold           — Østfold (Glomma Norjan pisin joki, laskee
   *                       mereen Fredrikstadissa) + Fredrikstad
   *                       (Pohjois-Euroopan parhaiten säilynyt
   *                       linnoitettu kaupunki itärannalla)
   */
  NOR: {
    Akershus: {
      lyhyt: 'Eidsvollin kartanossa allekirjoitettiin Norjan perustuslaki 17. toukokuuta 1814, ja talo on nyt museo ja kansallismonumentti.',
    },
    'Aust-Agder': {
      lyhyt: 'Grimstadissa nuori Henrik Ibsen oli apteekin oppipoikana ja kirjoitti ensimmäisen näytelmänsä – kaupungissa on nyt hänen nuoruutensa museo.',
    },
    'Bouvet Island': {
      lyhyt: 'Bouvet’nsaari on maailman syrjäisin saari: jäätikkö peittää 93 prosenttia siitä, ja Etelämantereen rannikolle on 1 700 kilometriä.',
    },
    Buskerud: {
      lyhyt: 'Kongsbergin hopeakaivokset toimivat 1623–1958, ja 1770-luvulla ne olivat yli 4 000 työntekijällään Norjan suurin työpaikka ennen teollista aikaa.',
    },
    Finnmark: {
      lyhyt: 'Altan kallioihin on hakattu yli 6 000 kuvaa, vanhimmat ainakin vuodelta 4200 eaa., ja ulkoilmamuseossa niiden lomassa kulkee puisia polkuja.',
    },
    Hedmark: {
      lyhyt: 'Trysilfjellet on Norjan suurin talviurheilukeskus, ja tunturin rinteillä on 65 hoidettua laskettelurinnettä.',
    },
    Hordaland: {
      lyhyt: 'Bergenin Bryggenin puiset kauppatalot reunustavat satamaa, jossa hansakauppiailla oli konttori jo noin 1350 – nyt ne ovat Unescon listalla.',
    },
    Svalbard: {
      lyhyt: 'Huippuvuorten jääkarhut ovat suojeltuja, ja asutuksen ulkopuolelle lähtevillä on oltava karkotusvälineet – mukaan neuvotaan ottamaan myös ase.',
    },
    'Møre og Romsdal': {
      lyhyt: 'Atlanterhavsveien kiemurtelee 8,3 kilometriä luodolta toiselle kahdeksaa siltaa pitkin, ja sitä on kutsuttu maailman parhaaksi automatkaksi.',
    },
    'Nord-Trøndelag': {
      lyhyt: 'Stiklestadissa kuningas Olavi II kaatui taistelussa 1030, ja vuodesta 1954 paikalla on esitetty taistelusta kertovaa Pyhän Olavin näytelmää.',
    },
    Nordland: {
      lyhyt: 'Bodøn lähellä Saltstraumenin kapeasta salmesta ryöppyää kuuden tunnin välein jopa 400 miljoonaa kuutiota merivettä, ja virtaan syntyy pyörteitä.',
    },
    Oppland: {
      lyhyt: 'Galdhøpiggen on 2 469 metrillään Pohjois-Euroopan korkein vuori, ja sen kupeen jäätiköllä lasketellaan vielä kesälläkin.',
    },
    Oslo: {
      lyhyt: 'Nobelin rauhanpalkinto on ainoa Nobel, jota ei jaeta Tukholmassa: se ojennetaan 10. joulukuuta Oslon kaupungintalolla kuninkaan läsnä ollessa.',
    },
    Rogaland: {
      lyhyt: 'Preikestolen eli Saarnatuoli kohoaa 604 metriä Lysevuonon yläpuolelle, ja sen tasaiselle laelle kiipesi vuonna 2024 noin 300 000 kävijää.',
    },
    'Sogn og Fjordane': {
      lyhyt: 'Vuonojen kuninkaaksi kutsuttu Sognefjord työntyy 205 kilometriä sisämaahan, ja syvimmillään se ulottuu 1 308 metriä merenpinnan alle.',
    },
    'Sør-Trøndelag': {
      lyhyt: 'Trondheimin Nidarosin tuomiokirkko on rakennettu Pyhän Olavin haudan päälle, ja se on maailman pohjoisin keskiaikainen katedraali.',
    },
    Telemark: {
      lyhyt: 'Rjukanin laaksoon ei paista aurinko syyskuusta maaliskuuhun, joten rinteelle rakennettiin 2013 peilejä, jotka heijastavat valoa torille.',
    },
    Troms: {
      lyhyt: 'Tromsøssa keskiyön aurinko pysyy kesällä taivaalla 71 vuorokautta yhtä mittaa, ja talvella kaamos kestää lähes seitsemän viikkoa.',
    },
    'Vest-Agder': {
      lyhyt: 'Lindesnesin majakka seisoo manner-Norjan eteläkärjessä, ja niemellä on näytetty valoa merenkulkijoille jo vuodesta 1656.',
    },
    Vestfold: {
      lyhyt: 'Tønsbergin lähellä hautakummusta kaivettiin 1904 Osebergin viikinkilaiva, johon kaksi naista oli haudattu syksyllä 834.',
    },
    'Østfold': {
      lyhyt: 'Norjan pisin joki Glomma laskee mereen Fredrikstadissa, jonka itärannalla on Pohjois-Euroopan parhaiten säilynyt linnoituskaupunki.',
    },
  },
  /*
   * IRL (Sisältökirjuri 25.9.2026, Fablen tilaus). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.IRL:n tunnuksia
   * (26 kreivikuntaa, Dublinin neljä hallintoaluetta erikseen sekä
   * North ja South Tipperary erikseen = 30). Vain `lyhyt` tässä
   * erässä, kuten GRC:llä. Dublin (kaupunki) välttää pelin olemassa
   * olevien Dublin-nostojen aiheet (Kellsin kirja, Guinness, eläintarha
   * ja Phoenix Park, Ha'penny Bridge, Dublinin linna, Croke Park,
   * Spire, Joyce).
   *
   * Lähteet (Fablen vaatimus 25.9.2026): faktat tarkistettu
   * en-Wikipediasta 25.9.2026, artikkelit:
   *   Carlow                 — Brownshill dolmen (4000–3000 eaa., kattokivi
   *                            n. 150 t, "reputed to be the heaviest in Europe")
   *   Cavan                  — Shannon Pot (Cuilcagh, 16 m leveä, Shannonin
   *                            perinteinen lähde)
   *   Clare                  — The Burren (arktis-alpiiniset ja Välimeren
   *                            kasvit rinnakkain, yli 70 % kukkalajeista)
   *   Cork                   — Cobh (Queenstown 1849–1920, Titanicin viimeinen
   *                            satama 11.4.1912)
   *   Donegal                — Slieve League (601 m, Euroopan korkeimpia
   *                            merijyrkänteitä)
   *   Dublin                 — Bull Island (syntyi Bull Wallin 1820–1825
   *                            jälkeen, Dublin City Council)
   *   Dún Laoghaire–Rathdown — Forty Foot (Sandycove, uitu ympäri vuoden
   *                            n. 250 v, ennen vain miehille) + Sandycove
   *                            (Dún Laoghairen ja Dalkeyn välissä)
   *   Fingal                 — Lambay Island (punakaulavallabit 1950-luvulta,
   *                            lisää Dublin Zoosta 1980-luvulla, n. 100 v. 2017)
   *                            + Portrane (Fingal)
   *   Galway                 — Kylemore Abbey (benediktiiniluostari 1920,
   *                            nunnat pakenivat Belgiasta 1. maailmansodassa)
   *   Kerry                  — Killarney National Park (1. kansallispuisto
   *                            1932, mantereen ainoa saksanhirvilauma)
   *   Kildare                — The Curragh (kaikki viisi klassikkolaukkaa,
   *                            Pyhän Brigidin viittalegenda)
   *   Kilkenny               — Kilkenny GAA (36 All-Ireland-hurlingmestaruutta,
   *                            ennätys)
   *   Laoighis               — Electric Picnic (Stradbally Hall vuodesta 2004,
   *                            "Ireland's version of Glastonbury")
   *   Leitrim                — County Leitrim (lyhyin rantaviiva, Tullaghan
   *                            4,7 km)
   *   Limerick               — Foynes (Irish coffee 1943, Joe Sheridan,
   *                            lentovenemuseo) + Irish coffee
   *   Longford               — Corlea Trackway (tammilankut kaadettu
   *                            148–147 eaa., Karthagon piirityksen aikaan)
   *   Louth                  — County Louth (pienin kreivikunta) + Oliver
   *                            Plunkett (pää Droghedan St Peter's Churchissa
   *                            29.6.1921 alkaen)
   *   Mayo                   — Achill Island (suurin saari, kääntösilta) +
   *                            Croaghaun (Irlannin korkeimmat merijyrkänteet)
   *   Meath                  — Trim Castle (suurin normannilinna, Braveheartin
   *                            York)
   *   Monaghan               — Castle Leslie (Glaslough, McCartneyn häät
   *                            2002, 300 vierasta)
   *   Offaly                 — Leviathan of Parsonstown (maailman suurin
   *                            1845–1917) + Birr Castle (Offaly, entisöity
   *                            1990-luvun lopulla)
   *   Roscommon              — Rathcroghan (Oweynagat, "Cave of the Cats",
   *                            portti Toiseen maailmaan, Samhain)
   *   Sligo                  — Drumcliff (Yeats haudattu 1948, Ben Bulben)
   *   South Dublin           — Montpelier Hill (Hell Fire Club -maja n. 1725,
   *                            South Dublin County Councilin hanke)
   *   North Tipperary        — Devil's Bit (paholaisen purema, Cashelin
   *                            kallio) + North Tipperary (Devil's Bit,
   *                            Templemore)
   *   South Tipperary        — Clonmel (Bulmers eli Magners, tehdas 2 km
   *                            kaupungista itään) + South Tipperary
   *                            (Clonmel pääkaupunki)
   *   Waterford              — Blaa (EU:n PGI 19.11.2013, neliskanttinen,
   *                            jauhotettu) + Waterford (Irlannin vanhin
   *                            kaupunki)
   *   Westmeath              — Hill of Uisneach (lähellä maantieteellistä
   *                            keskipistettä, pyhä keskus, Bealtaine)
   *   Wexford                — Hook Lighthouse (yli 800 v, 2. vanhin toimiva
   *                            Herkuleen tornin jälkeen)
   *   Wicklow                — Powerscourt Waterfall (121 m, 2. korkein) +
   *                            Powerscourt Estate (peurapuisto 1858,
   *                            japaninpeura Irlantiin)
   */
  IRL: {
    Carlow: {
      lyhyt: 'Brownshillin dolmen Carlow’n laidalla on yli 5 000 vuotta vanha hauta, jonka noin 150-tonnista kattokiveä pidetään Euroopan painavimpana.',
    },
    Cavan: {
      lyhyt: 'Cuilcaghvuoren juurella on Shannon Pot, 16 metrin levyinen lähdelampi, josta Shannon-joen katsotaan perinteisesti saavan alkunsa.',
    },
    Clare: {
      lyhyt: 'Burrenin kalkkikivikarstilla kasvavat arktiset tunturikasvit ja Välimeren kasvit rinnakkain – siellä on yli 70 % Irlannin kukkalajeista.',
    },
    Cork: {
      lyhyt: 'Cobhin satamasta, jonka nimi oli silloin Queenstown, Titanic lähti 11. huhtikuuta 1912 viimeiseltä pysähdykseltään kohti Atlanttia.',
    },
    Donegal: {
      lyhyt: 'Slieve Leaguen merijyrkänteet kohoavat 601 metriin suoraan Atlantista, ja ne kuuluvat Euroopan korkeimpiin.',
    },
    Dublin: {
      lyhyt: 'Dublininlahden Bull Island syntyi vahingossa: hiekka alkoi kasautua saareksi, kun satamaan rakennettiin Bull Wall -aallonmurtaja 1820–1825.',
    },
    'Dún Laoghaire–Rathdown': {
      lyhyt: 'Sandycoven Forty Footilla on uitu Irlanninmeressä ympäri vuoden jo noin 250 vuotta – ennen vain miehet, nykyään kaikki.',
    },
    Fingal: {
      lyhyt: 'Fingalin rannikon edustalla Lambayn yksityissaarella hyppii noin sata punakaulavallabia, jotka tuotiin sinne 1950- ja 1980-luvuilla.',
    },
    Galway: {
      lyhyt: 'Connemaran Kylemoren linna on ollut vuodesta 1920 luostari, jonka perustivat ensimmäisen maailmansodan aikana Belgiasta paenneet nunnat.',
    },
    Kerry: {
      lyhyt: 'Killarneyn kansallispuisto oli Irlannin ensimmäinen, ja sen tammimetsissä elää mantereen ainoa saksanhirvilauma.',
    },
    Kildare: {
      lyhyt: 'Curraghin tasangolla ajetaan kaikki viisi Irlannin klassikkolaukkaa – tarun mukaan Pyhä Brigid sai maan peittämällä sen viitallaan.',
    },
    Kilkenny: {
      lyhyt: 'Kilkenny on hurlingin mahtikreivikunta: se on voittanut lajin All-Ireland-mestaruuden 36 kertaa, enemmän kuin kukaan muu.',
    },
    Laoighis: {
      lyhyt: 'Stradbally Hallin kartanon mailla järjestetään joka vuosi Electric Picnic -festivaali, jota on kutsuttu Irlannin Glastonburyksi.',
    },
    Leitrim: {
      lyhyt: 'Leitrim ulottuu mereen vain Tullaghanin kohdalla, ja sen 4,7 kilometrin rantaviiva on Irlannin kreivikunnista lyhyin.',
    },
    Limerick: {
      lyhyt: 'Foynesin lentovenesatamassa kokki Joe Sheridan lorautti 1943 viskiä kohmeisten matkustajien kahviin – näin syntyi Irish coffee.',
    },
    Longford: {
      lyhyt: 'Corlean suolta kaivettiin esiin rautakautinen tammilankkutie, jonka puut kaadettiin 148–147 eaa. – samaan aikaan kun Karthagoa piiritettiin.',
    },
    Louth: {
      lyhyt: 'Louth on Irlannin pienin kreivikunta, ja Droghedan Pyhän Pietarin kirkossa on vuodesta 1921 säilytetty pyhimys Oliver Plunkettin päätä.',
    },
    Mayo: {
      lyhyt: 'Achill on Irlannin suurin saari, ja sen Croaghaunin merijyrkänteet ovat maan korkeimmat – mantereelle pääsee kääntösiltaa pitkin.',
    },
    Meath: {
      lyhyt: 'Trimin linna on Irlannin suurin normannilinna, ja elokuvassa Braveheart se esitti muurien ympäröimää Yorkia.',
    },
    Monaghan: {
      lyhyt: 'Glasloughin Castle Leslien kartanon kirkossa Paul McCartney vihittiin 2002, ja linnan hääjuhlassa oli 300 vierasta.',
    },
    Offaly: {
      lyhyt: 'Birrin linnan puistossa seisoo Leviathan-kaukoputki, joka oli maailman suurin 1845–1917 ja entisöitiin 1990-luvun lopulla.',
    },
    Roscommon: {
      lyhyt: 'Rathcroghanin kapea Oweynagat eli Kissojen luola oli tarujen mukaan portti tuonpuoleiseen, ja siihen liitetään Samhain-juhla.',
    },
    Sligo: {
      lyhyt: 'Runoilija W. B. Yeats lepää Drumcliffin kirkkomaalla Benbulbenvuoren juurella – hänen jäännöksensä tuotiin Ranskasta 1948.',
    },
    'South Dublin': {
      lyhyt: 'Montpelier Hillin laella on 1725 rakennetun metsästysmajan raunio, jossa Hellfire Clubin herrojen kerrotaan juhlineen ja jonka sanotaan kummittelevan.',
    },
    'North Tipperary': {
      lyhyt: 'Devil’s Bit -vuoren harjanteessa on lovi: tarun mukaan paholainen puraisi siitä palan, katkaisi hampaansa ja sylki palasta Cashelin kallion.',
    },
    'South Tipperary': {
      lyhyt: 'Clonmelissa perustettua Bulmers-siideriä, muualla Magnersia, valmistetaan yhä kaupungin laidalla omenatarhojen keskellä.',
    },
    Waterford: {
      lyhyt: 'Waterford on Irlannin vanhin kaupunki, ja aamiaiseksi siellä syödään jauhoisia, neliskanttisia blaa-sämpylöitä, joilla on EU:n suoja.',
    },
    Westmeath: {
      lyhyt: 'Uisneachin kukkula lähellä Irlannin maantieteellistä keskipistettä oli taruissa saaren pyhä keskus, jossa druidit viettivät Bealtainea.',
    },
    Wexford: {
      lyhyt: 'Hook Headin majakka on toiminut yli 800 vuotta, ja maailmassa vain Espanjan Herkuleen torni on sitä vanhempi toimiva majakka.',
    },
    Wicklow: {
      lyhyt: 'Powerscourtin vesiputous putoaa 121 metriä, ja sen ympärille 1858 perustettuun peurapuistoon tuotiin Irlannin ensimmäiset japaninpeurat.',
    },
  },
  /*
   * BRA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5A). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.BRA:n tunnuksia
   * TÄSMÄLLEEN (26 osavaltiota + liittovaltiopiiri "Distrito Federal").
   * Vain `lyhyt` tässä erässä. Vältetty maastokohteet-bra.js:n aiheet
   * (Pico da Neblina, Fernando de Noronha, Itaipu, Serra da Capivara,
   * São Miguel das Missões, Olinda, Congonhas, Pantanal, Lençóis
   * Maranhenses); Brasília mainitaan vain kaupunkina. Lähteet (en-/pt-
   * Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Alagoas            — Braskemin suolakaivokset Maceiósta (viisi
   *                        kaupunginosaa, noin 60 000 siirrettyä)
   *   Amapá              — Estádio Zerão (keskiviiva linjattu Marco Zero
   *                        -muistomerkin mukaan)
   *   Espírito Santo     — Ofício das Paneleiras de Goiabeiras (IPHAN:n
   *                        ensimmäinen aineeton perintö 2002, ei dreijaa)
   *   Piauí              — Teresina (Koillis-Brasilian ainoa ei-rannikon
   *                        pääkaupunki, Parnaíba ja Poti)
   *   Rio Grande do Norte — Cajueiro de Pirangi (7 300–8 400 m²; Piauín
   *                        Cajueiro da Praia kiistää ennätyksen)
   *   Rondônia           — Madeira–Mamoré Railroad (1907–1912, "Devil's
   *                        Railroad", kuolleita arviolta 6 000+)
   *   Sergipe            — Aracaju (uusi pääkaupunki 17.3.1855)
   *   Muut               — yleistietoa, tarkistettu vastaavista
   *                        en-Wikipedia-artikkeleista.
   */
  BRA: {
    Acre: {
      lyhyt: 'Xapurissa voi käydä kumimetsien puolustajan Chico Mendesin kotitalossa, jonka ovella hänet ammuttiin 1988.',
    },
    Alagoas: {
      lyhyt: 'Maceiósta on tyhjennetty viisi kaupunginosaa ja noin 60 000 asukasta, koska maa vajoaa vanhojen vuorisuolakaivosten päällä.',
    },
    'Amapá': {
      lyhyt: 'Macapássa päiväntasaajan kohdalla seisoo Marco Zero -muistomerkki, ja viereisen stadionin keskiviiva on linjattu sen mukaan.',
    },
    Amazonas: {
      lyhyt: 'Manausin lähellä musta Rio Negro ja savenruskea Solimões virtaavat kilometrien matkan rinnakkain sekoittumatta.',
    },
    Bahia: {
      lyhyt: 'Salvadorissa Lacerdan hissi nostaa matkustajat alakaupungista 72 metriä jyrkänteen päälle yläkaupunkiin.',
    },
    'Ceará': {
      lyhyt: 'Cearán rannoilta kalastajat lähtevät yhä merelle jangadoilla, matalilla puisilla purjelautoilla.',
    },
    'Distrito Federal': {
      lyhyt: 'Brasília rakennettiin tyhjälle ylängölle ja vihittiin pääkaupungiksi 1960; ylhäältä sen asemakaava muistuttaa lentokonetta.',
    },
    'Espírito Santo': {
      lyhyt: 'Vitórian Goiabeirasissa naiset muovailevat mustia savipatoja ilman dreijaa, ja niissä keitetään osavaltion kalamoqueca.',
    },
    'Goiás': {
      lyhyt: 'Chapada dos Veadeirosin ylängöllä kanjonit, vesiputoukset ja cerrado-savanni ovat Unescon maailmanperintöä.',
    },
    'Maranhão': {
      lyhyt: 'Alcântarassa on Brasilian rakettien laukaisukeskus, sillä päiväntasaajan läheisyys säästää laukaisuissa polttoainetta.',
    },
    'Mato Grosso': {
      lyhyt: 'Mato Grosso tuottaa soijaa enemmän kuin mikään muu Brasilian osavaltio, ja pellot jatkuvat horisonttiin asti.',
    },
    'Mato Grosso do Sul': {
      lyhyt: 'Boniton joet ovat niin kirkkaita, että niissä snorklataan kalaparvien seassa kuin akvaariossa.',
    },
    'Minas Gerais': {
      lyhyt: 'Brumadinhon Inhotim on valtava ulkomuseo, jossa nykytaide on sijoitettu kasvitieteellisen puutarhan keskelle.',
    },
    'Pará': {
      lyhyt: 'Belémin Ver-o-Peso-torilla myydään açaíta, jonka tummaa sosetta paikalliset syövät paistetun kalan kanssa.',
    },
    'Paraíba': {
      lyhyt: 'João Pessoan kaupungissa oleva Ponta do Seixas -niemi on koko Amerikan mantereen itäisin kohta.',
    },
    'Paraná': {
      lyhyt: 'Iguaçun putoukset jakautuvat noin 275 erilliseen putoukseen Brasilian ja Argentiinan rajajoella.',
    },
    Pernambuco: {
      lyhyt: 'Recifen karnevaaleissa tanssitaan frevoa, nopeaa katutanssia, jossa tanssijat heiluttavat pieniä värikkäitä päivänvarjoja.',
    },
    'Piauí': {
      lyhyt: 'Teresina on Koillis-Brasilian ainoa osavaltion pääkaupunki, joka ei ole rannikolla; se on Parnaíba- ja Potijoen välissä.',
    },
    'Rio de Janeiro': {
      lyhyt: 'Kristus-patsas seisoo Corcovadon noin 700-metrisellä huipulla, ja sen levitetyt kädet näkyvät lähes kaikkialle Rioon.',
    },
    'Rio Grande do Norte': {
      lyhyt: 'Pirangin kylässä Natalin lähellä kasvaa cashewpuu, jonka latvus peittää yli 7 000 neliömetriä; sitä pidetään maailman suurimpana.',
    },
    'Rio Grande do Sul': {
      lyhyt: 'Gaúchot kantavat mukanaan chimarrãota, kuumaa mate-juomaa, jota imetään metallipillillä kurpitsakupista.',
    },
    'Rondônia': {
      lyhyt: 'Porto Velhosta lähti Madeira–Mamoré-rata, jonka rakentaminen viidakkoon vei tuhansia henkiä; sitä kutsutaan paholaisen radaksi.',
    },
    Roraima: {
      lyhyt: 'Roraima-vuori, jyrkkäseinäinen pöytävuori eli tepui, kohoaa Brasilian, Venezuelan ja Guyanan rajojen kohtaamispaikassa.',
    },
    'Santa Catarina': {
      lyhyt: 'Blumenaussa vietetään joka lokakuu Oktoberfestiä, sillä kaupungin perustivat saksalaiset siirtolaiset.',
    },
    'São Paulo': {
      lyhyt: 'Brasiliassa asuu eniten japanilaistaustaisia Japanin ulkopuolella, ja São Paulon Liberdadessa katuja valaisevat japanilaistyyliset lyhdyt.',
    },
    Sergipe: {
      lyhyt: 'Sergipe on Brasilian pienin osavaltio, ja sen pääkaupunki Aracaju rakennettiin ruutukaavaan uudeksi pääkaupungiksi 1855.',
    },
    Tocantins: {
      lyhyt: 'Tocantins on Brasilian nuorin osavaltio, ja sen pääkaupunki Palmas rakennettiin tyhjästä 1989 alkaen.',
    },
  },
  /*
   * MEX (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.MEX:n tunnuksia TÄSMÄLLEEN: "Distrito Federal" =
   * Mexico City, "México" = México-osavaltio (molempien nimiFi on
   * "México"), "MEX+99?" = Natural Earthin nimetön pikkusaari
   * (iso_3166_2 MX-X01~, 22,4° N 89,7° W) = Alacranesin riutta. Vain
   * `lyhyt`. Vältetty maastokohteet-mex.js:n ja fokuskohteet-mex.js:n
   * aiheet (Popocatépetl, Cozumel, Usumacinta, Teotihuacán, Palenque,
   * Chichén Itzá, Monte Albán, El Tajín, Guanajuaton kaupunki,
   * Chihuahuan rata, Templo Mayor). Lähteet (en-/es-Wikipedia ja
   * hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   MEX+99?        — Scorpion Reef / Arrecife Alacranes (CONANP;
   *                    noin 130–140 km Progresosta, Meksikonlahden suurin)
   *   Chihuahua      — Cave of the Crystals (11,4 m, luola täyttyi
   *                    uudelleen vedellä 2015)
   *   Coahuila       — Cuatro Ciénegas (stromatoliitit)
   *   Querétaro      — Peña de Bernal (433 m)
   *   Tamaulipas     — Kemp's ridley sea turtle (Rancho Nuevo, arribadat)
   *   Zacatecas      — Mining in Mexico (Zacatecas 36 % Meksikon hopeasta
   *                    2019; Meksiko maailman suurin tuottaja)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  MEX: {
    Aguascalientes: {
      lyhyt: 'Aguascalientesin San Marcosin messut, Meksikon kansallismessut, täyttävät kaupungin keväisin useaksi viikoksi.',
    },
    'Baja California': {
      lyhyt: 'Tijuanan ja San Diegon välinen San Ysidron raja-asema on läntisen pallonpuoliskon vilkkain maarajan ylityspaikka.',
    },
    'Baja California Sur': {
      lyhyt: 'San Ignacion laguunissa harmaavalaat synnyttävät talvisin, ja uteliaat emot uivat usein aivan veneiden viereen.',
    },
    Campeche: {
      lyhyt: 'Campechen vanhaa kaupunkia kiertävät muurit ja bastionit, jotka rakennettiin aikoinaan suojaksi merirosvoja vastaan.',
    },
    Chiapas: {
      lyhyt: 'Sumideron kanjonin seinämät kohoavat paikoin yli kilometrin korkeuteen Grijalvajoen yläpuolelle.',
    },
    Chihuahua: {
      lyhyt: 'Naican kaivoksen Kristalliluolassa on yli 11 metrin kipsikiteitä, mutta luola on jälleen veden alla.',
    },
    Coahuila: {
      lyhyt: 'Cuatro Ciénegasin aavikkoaltaissa elää stromatoliitteja, syanobakteerien rakentamia kivikumpuja, jotka ovat muualta lähes kadonneet.',
    },
    Colima: {
      lyhyt: 'Colima-tulivuori on Meksikon aktiivisimpia, ja sen savupatsas näkyy usein osavaltion pääkaupunkiin asti.',
    },
    Durango: {
      lyhyt: 'Durangon aavikkomaisemissa on kuvattu kymmeniä lännenelokuvia, ja vanhoja kuvauskyliä voi yhä kiertää.',
    },
    Guanajuato: {
      lyhyt: 'San Miguel de Allenden vaaleanpunainen uusgoottilainen kirkko, Parroquia, on koko kaupungin tunnusmerkki.',
    },
    Guerrero: {
      lyhyt: 'Acapulcon La Quebradan kallioilta hypätään noin 35 metristä mereen, ja hyppy ajoitetaan tulevan aallon mukaan.',
    },
    Hidalgo: {
      lyhyt: 'Pachucassa syödään pastes-piirakoita, jotka toivat mukanaan Cornwallista tulleet kaivosmiehet.',
    },
    Jalisco: {
      lyhyt: 'Tequilan kaupungin ympärillä sinisen agaven rivit peittävät rinteet, ja agavemaisema on Unescon maailmanperintöä.',
    },
    'MEX+99?': {
      lyhyt: 'Tämä pieni saari kuuluu Alacranesin riuttaan noin 130 km Jukatanin rannikosta; se on Meksikonlahden suurin koralliriutta.',
    },
    'México': {
      lyhyt: 'Nevado de Toluca -tulivuoren kraatterissa on kaksi järveä, Aurinko ja Kuu, yli 4 000 metrin korkeudessa.',
    },
    'Distrito Federal': {
      lyhyt: 'Mexico City on rakennettu kuivatun järven pohjalle, ja osa kaupungista vajoaa kymmeniä senttimetrejä vuodessa.',
    },
    'Michoacán': {
      lyhyt: 'Talvisin miljoonat monarkkiperhoset peittävät Michoacánin vuoristometsien kuuset oransseiksi.',
    },
    Morelos: {
      lyhyt: 'Cuernavacaa kutsutaan ikuisen kevään kaupungiksi, ja pääkaupunkilaiset ajavat sinne viikonloppuisin lämpöön.',
    },
    Nayarit: {
      lyhyt: 'Marietassaarten piilotettu ranta on kalliokuopan pohjalla, ja sinne pääsee vain uimalla tunnelin läpi.',
    },
    'Nuevo León': {
      lyhyt: 'Monterreyn yllä kohoaa Cerro de la Silla, jonka kaksi huippua muodostavat satulan muodon.',
    },
    Oaxaca: {
      lyhyt: 'Hierve el Aguassa kallion rinteellä on kivettyneitä vesiputouksia, jotka mineraalilähteet ovat valuttaneet kalkista.',
    },
    Puebla: {
      lyhyt: 'Cholulan suuri pyramidi on tilavuudeltaan maailman suurin, mutta se on kasvanut umpeen, ja huipulla seisoo kirkko.',
    },
    'Querétaro': {
      lyhyt: 'Bernalin kylän yllä kohoaa Peña de Bernal, yli 400 metriä korkea kalliomonoliitti, yksi maailman suurimmista.',
    },
    'Quintana Roo': {
      lyhyt: 'Tulumin maya-rauniot seisovat kalkkikivijyrkänteellä aivan Karibianmeren turkoosin veden yllä.',
    },
    'San Luis Potosí': {
      lyhyt: 'Xilitlan sademetsässä on Las Pozas, brittiläisen Edward Jamesin rakentama surrealistinen betonipuutarha.',
    },
    Sinaloa: {
      lyhyt: 'Sinaloan banda-yhtyeissä pauhaavat vaskipuhaltimet ja tuuba, ja niiden musiikki soi melkein joka juhlassa.',
    },
    Sonora: {
      lyhyt: 'El Pinacaten laavakentällä on valtavia pyöreitä kraattereita keskellä Altarin hiekka-aavikkoa.',
    },
    Tabasco: {
      lyhyt: 'Villahermosan La Venta -puistossa on olmeekkien jättiläispäitä, basaltista hakattuja kasvoja noin 2 500 vuoden takaa.',
    },
    Tamaulipas: {
      lyhyt: 'Harvinainen Kempin merikilpikonna pesii lähes kokonaan Tamaulipasin rannoilla, ja naaraat nousevat maihin joukolla.',
    },
    Tlaxcala: {
      lyhyt: 'Tlaxcala on Meksikon pienin osavaltio, ja Cacaxtlan raunioilla on säilynyt yli tuhatvuotiaita kirkkaita seinämaalauksia.',
    },
    Veracruz: {
      lyhyt: 'Veracruzin ja Pueblan rajalla kohoaa lumihuippuinen Pico de Orizaba, 5 636 metriä, Meksikon korkein vuori.',
    },
    'Yucatán': {
      lyhyt: 'Chicxulubin kylän kohdalla on 66 miljoonan vuoden takainen törmäyskraatteri, jonka isku liitetään dinosaurusten tuhoon.',
    },
    Zacatecas: {
      lyhyt: 'Zacatecas louhii hopeaa enemmän kuin mikään muu Meksikon osavaltio, ja Meksiko on maailman suurin hopeantuottaja.',
    },
  },
  /*
   * CAN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.CAN:n tunnuksia TÄSMÄLLEEN (esim. "Québec"
   * aksentilla, vaikka nimiFi on "Quebec"). Vain `lyhyt`. Vältetty
   * maastokohteet-can.js:n aiheet (Mount Logan, Naha Dehé, Baffininsaari,
   * L'Anse aux Meadows, Craigellachie, Rideaun kanava, Head-Smashed-In,
   * Dinosaur Provincial Park, Vanha Québec, Louisbourg, Dawson City);
   * Québecin teksti koskee Montrealia. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Northwest Territories — Great Slave Lake (614 m, Dettahin jäätie)
   *   Québec         — Underground City, Montreal (32 km)
   *   Yukon          — Yukon River Quest (715 km, Whitehorse–Dawson)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  CAN: {
    Alberta: {
      lyhyt: 'Banff on Kanadan vanhin kansallispuisto, joka perustettiin 1885 Kalliovuorten kuumien lähteiden ympärille.',
    },
    'British Columbia': {
      lyhyt: 'Great Bear -sademetsässä elää henkikarhu, mustakarhun harvinainen muoto, jonka turkki on kermanvalkoinen.',
    },
    'Northwest Territories': {
      lyhyt: 'Iso Orjajärvi on 614 metrin syvyydellään Pohjois-Amerikan syvin järvi, ja talvella sen jäälle aurataan tie.',
    },
    Manitoba: {
      lyhyt: 'Churchillissa jääkarhut kerääntyvät syksyisin Hudsoninlahden rannalle odottamaan meren jäätymistä.',
    },
    'New Brunswick': {
      lyhyt: 'Fundynlahdella on maailman suurimmat vuorovedet, ja Hopewell Rocksin kivipilarien juurella kävellään laskuveden aikaan.',
    },
    'Newfoundland and Labrador': {
      lyhyt: 'Keväisin Grönlannista ajelehtivia jäävuoria lipuu Newfoundlandin rannikon ohi niin läheltä, että ne näkee rannalta.',
    },
    'Nova Scotia': {
      lyhyt: 'Sable Islandin hiekkasaarella elää villihevosia, joita kukaan ei ruoki eikä hoida.',
    },
    Nunavut: {
      lyhyt: 'Nunavut perustettiin 1999 inuiittien alueeksi, ja inuktitut kirjoitetaan siellä omalla tavukirjoituksellaan.',
    },
    Ontario: {
      lyhyt: 'Niagaran hevosenkengän muotoinen putous on suurimmaksi osaksi Ontarion puolella, ja sen vesipöly kastelee katsojat.',
    },
    'Prince Edward Island': {
      lyhyt: 'Cavendishissa voi käydä Vihervaaran talossa, jonka L. M. Montgomeryn Anna-kirjat tekivät kuuluisaksi.',
    },
    'Québec': {
      lyhyt: 'Montrealin maanalainen kaupunki yhdistää 32 kilometrin käytävillä metroasemat ja tuhannet kaupat, joten talvella pärjää ulos menemättä.',
    },
    Saskatchewan: {
      lyhyt: 'Reginassa koulutetaan jokainen Kanadan ratsupoliisin uusi konstaapeli, ja kaupungissa on poliisin perinnekeskus.',
    },
    Yukon: {
      lyhyt: 'Whitehorsesta Dawson Cityyn melotaan joka kesä Yukonjokea pitkin 715 km:n kilpailu, maailman pisin vuosittainen melontakisa.',
    },
  },
  /*
   * CHL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.CHL:n tunnuksia TÄSMÄLLEEN (koko viralliset nimet,
   * esim. "Aisén del General Carlos Ibáñez del Campo"). Vain `lyhyt`.
   * Vältetty maastokohteet-chl.js:n aiheet (Ojos del Salado, Chiloé,
   * Chuquicamata, Humberstone, Chinchorro, Sewell, Paranal, Isla Negra,
   * Valdivian maanjäristys). Lähteet (en-/es-Wikipedia ja hakutarkistus
   * 25.9.2026), epävarmimmat erikseen:
   *   Antofagasta    — Mano del Desierto (11 m, Irarrázabal, 1992)
   *   Arica y Parinacota — Chungará Lake (4 517 m, Parinacotan sortuman
   *                    patoama, chilenflamingo)
   *   Bío-Bío        — Chiflón del Diablo (Lota, meren alle, entiset
   *                    kaivosmiehet oppaina; chile.travel)
   *   Maule          — Radal Siete Tazas National Park (Claro-joki)
   *   Tarapacá       — Atacama Giant (119 m, Cerro Unita, 1000–1400 jaa.)
   *   Valparaíso     — Easter Island (3 512 km mantereelta, Valparaíson
   *                    alue)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  CHL: {
    'Aisén del General Carlos Ibáñez del Campo': {
      lyhyt: 'Kenraali Carreran järven marmoriluolien seinät hehkuvat sinisinä, kun järven vesi heijastuu niihin.',
    },
    Antofagasta: {
      lyhyt: 'Autiomaassa Antofagastan kaakkoispuolella nousee hiekasta 11-metrinen betonikäsi, Mario Irarrázabalin Mano del Desierto.',
    },
    'La Araucanía': {
      lyhyt: 'Pucónin yllä savuaa Villarrica, yksi Chilen aktiivisimmista tulivuorista, jonka kraatterissa on laavajärvi.',
    },
    'Arica y Parinacota': {
      lyhyt: 'Chungaránjärvi on 4 517 metrin korkeudessa Parinacotan tulivuoren juurella, ja sen rannoilla elää flamingoja.',
    },
    Atacama: {
      lyhyt: 'Sateisina vuosina Atacaman autiomaa puhkeaa kukkaan, ja ilmiötä kutsutaan nimellä desierto florido.',
    },
    'Bío-Bío': {
      lyhyt: 'Lotan hiilikaivokset ulottuivat meren alle, ja Chiflón del Diablo -kaivokseen vievät nyt kierroksia entiset kaivosmiehet.',
    },
    Coquimbo: {
      lyhyt: 'Nobel-runoilija Gabriela Mistral kasvoi Elquin laaksossa, ja hänet on haudattu laakson Monte Granden kylään.',
    },
    "Libertador General Bernardo O'Higgins": {
      lyhyt: 'Colchaguan laaksossa viljellään carménèreä, rypälettä jota luultiin kadonneeksi, kunnes se löydettiin Chilen viinitarhoista 1994.',
    },
    'Los Lagos': {
      lyhyt: 'Osornon tulivuoren lähes täydellinen lumikartio kohoaa Llanquihuejärven itärannalla.',
    },
    'Los Ríos': {
      lyhyt: 'Valdivian jokirannan kalatorilla merileijonat odottavat, että kauppiaat heittävät niille kalanperkeitä.',
    },
    'Magallanes y Antártica Chilena': {
      lyhyt: 'Torres del Painen kolme graniittitornia nousevat jyrkkinä Patagonian aroilta ja järviltä.',
    },
    Maule: {
      lyhyt: 'Radal Siete Tazasin puistossa Claro-joki virtaa seitsemän peräkkäisen kallioaltaan ja vesiputouksen läpi.',
    },
    'Ñuble': {
      lyhyt: 'Ñuble erotettiin omaksi alueekseen vasta 2018, ja sen pääkaupungissa Chillánissa syntyi pianisti Claudio Arrau.',
    },
    'Región Metropolitana de Santiago': {
      lyhyt: 'Santiagon Gran Torre on 300 metriä korkea, Latinalaisen Amerikan korkein rakennus, ja sen takana siintävät Andit.',
    },
    'Tarapacá': {
      lyhyt: 'Cerro Unitan rinteessä on Atacaman jättiläinen, 119-metrinen esikolumbiaaninen maahan tehty ihmishahmo.',
    },
    'Valparaíso': {
      lyhyt: 'Pääsiäissaari moai-patsaineen kuuluu hallinnollisesti Valparaíson alueeseen, vaikka se on yli 3 500 km mantereelta.',
    },
  },
  /*
   * THA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.THA:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: 77 aluetta (76 maakuntaa ja
   * Bangkok, avaimella "Bangkok Metropolis"). Vain `lyhyt` tässä
   * erässä; jokaisella alueella eri aihe. Vältetty maastokohteet-tha.js:n
   * aiheet (Ayutthayan ja Sukhothain raunioalueet, Ban Chiang, Phanom
   * Rung, Phimai, Khao Yai, Doi Inthanon, Kuoleman rautatie). Lähteet
   * (en-Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Chachoengsao   — Wat Saman Rattanaram (Ganesha 16 m, matkailulähteet)
   *   Chanthaburi    — Chanthaburi Gem Market (pe–su, GIA/travelfish)
   *   Mae Hong Son   — Su Tong Pae Bridge (yli 500 m, thailand.go.th)
   *   Nakhon Nayok   — Khun Dan Prakan Chon Dam (2 720 m, TAT-hakemisto)
   *   Narathiwat     — Talo Mano Mosque (tiikki, ei nauloja)
   *   Nong Bua Lam Phu — Wat Tham Erawan (600 porrasta)
   *   Pathum Thani   — Talaad Thai (ASEANin suurin, auki 24 h)
   *   Pattani        — Kolae boat (Sai Buri -joen laiturit)
   *   Phatthalung    — Thale Noi (uivat vesipuhvelit, TAT)
   *   Sakon Nakhon   — Sakon Nakhon Natural Indigo Fabric (GI 2006)
   *   Satun          — Satun UNESCO Global Geopark (2018, ensimmäinen)
   *   Songkhla       — Golden Mermaid, Samila (1966, pronssi)
   *   Trang          — Emerald Cave, Ko Muk (tunneli noin 80 m)
   *   Udon Thani     — Red Lotus Sea (kukat ovat lumpeita)
   *   Yala           — Betongin postilaatikko (1924, noin 3,2 m)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  THA: {
    'Amnat Charoen': {
      lyhyt: 'Amnat Charoenissa istuu 20 metriä korkea Phra Mongkhon Ming Mueang -Buddha, jota paikalliset kutsuvat yksinkertaisesti Phra Yaiksi, Isoksi Buddhaksi.',
    },
    'Ang Thong': {
      lyhyt: 'Wat Muangin kultainen Buddha on 92 metriä korkea ja 63 metriä leveä, ja se kohoaa kauas yli Ang Thongin tasaisten riisipeltojen.',
    },
    'Bangkok Metropolis': {
      lyhyt: 'Bangkokin thainkielinen juhlanimi on Guinnessin ennätysten mukaan maailman pisin paikannimi, 168 kirjainta – arjessa kaupunki on vain Krung Thep.',
    },
    'Bueng Kan': {
      lyhyt: 'Bueng Kan on Thaimaan nuorin maakunta vuodelta 2011, ja sen tunnuksen, Phu Tokin hiekkakivivuoren, huipulle kuljetaan puista kävelysiltaa pitkin.',
    },
    'Buri Ram': {
      lyhyt: 'Buriramin kilparadalla ajetaan joka vuosi MotoGP-moottoripyöräsarjan Thaimaan osakilpailu, ja sopimus ulottuu 2030-luvulle asti.',
    },
    Chachoengsao: {
      lyhyt: 'Bang Pakong -joen rannalla Wat Saman Rattanaramissa makaa 16 metriä korkea vaaleanpunainen Ganesha, norsupäinen jumala, käsi siunaukseen nostettuna.',
    },
    'Chai Nat': {
      lyhyt: 'Chai Natin Chao Phraya -pato valmistui 1957, ja sen säätelemä vesi kastelee peltoja seitsemässätoista maakunnassa.',
    },
    Chaiyaphum: {
      lyhyt: 'Pa Hin Ngamin kansallispuistossa kukkii sadekaudella kokonaisia niittyjä dok krachiaota, inkiväärin sukuista kasvia, jota kutsutaan Siamin tulppaaniksi.',
    },
    Chanthaburi: {
      lyhyt: "Chanthaburin jalokivikorttelissa kauppiaat levittävät perjantaista sunnuntaihin pöydilleen vaa'at, laskimet, safiirit ja rubiinit.",
    },
    'Chiang Mai': {
      lyhyt: 'Yi Peng -juhlan öinä Chiang Main taivaalle nousee tuhansia paperilyhtyjä, khom loita, mutta kaupungin keskustassa niiden lennättämistä nyt rajoitetaan.',
    },
    'Chiang Rai': {
      lyhyt: 'Chiang Rain Valkoinen temppeli, Wat Rong Khun, on taiteilija Chalermchai Kositpipatin omin rahoin rakentama, ja sen valkoisissa seinissä kimaltaa peilinsiruja.',
    },
    'Chon Buri': {
      lyhyt: 'Pattayan rannalla seisova Totuuden pyhäkkö on veistetty kokonaan puusta, ja sen rakennustyöt ovat jatkuneet vuodesta 1981.',
    },
    Chumphon: {
      lyhyt: 'Chumphonin kohdalla Malakan niemimaa kapenee Kran kannakseksi: Andamaninmereltä Thaimaanlahdelle on kapeimmillaan vain 44 kilometriä.',
    },
    Kalasin: {
      lyhyt: 'Phu Kum Khaon vuorelta löytyi 1994 Thaimaan suurin kasvissyöjädinosaurusten fossiilipaikka, ja sen luita esitellään nyt Sirindhornin museossa.',
    },
    'Kamphaeng Phet': {
      lyhyt: 'Kamphaeng Phetin ylpeys on kluai khai, pieni, pyöreä ja makea banaani, ja sadon kiitokseksi maakunnassa vietetään joka vuosi banaanijuhlaa.',
    },
    Kanchanaburi: {
      lyhyt: 'Erawanin vesiputous laskee seitsemänä porrasmaisena kerroksena, ja sen vihreänturkoosissa altaissa saa uida.',
    },
    'Khon Kaen': {
      lyhyt: 'Khon Kaenin Chonnabotissa kudotaan mudmee-silkkiä: langat sidotaan ja värjätään kuvioiksi jo ennen kuin ne päätyvät kangaspuihin.',
    },
    Krabi: {
      lyhyt: 'Railayn niemelle ei pääse maitse, koska kalkkikivijyrkänteet katkaisevat tien – perille tullaan pitkähäntäveneellä, ja kallioilla kiipeillään.',
    },
    Lampang: {
      lyhyt: 'Lampangissa hevosvaunut ovat yhä käytössä, ja kaupunkia kutsutaankin nimellä mueang rot ma, hevosvaunujen kaupunki.',
    },
    Lamphun: {
      lyhyt: 'Lamphun on longaanitarhojen maakunta, ja täältä on peräisin kuaitiao lamyai, possunuudelikeitto kuivatuilla longaaneilla.',
    },
    Loei: {
      lyhyt: 'Dan Sain Phi Ta Khon -juhlassa kuljetaan aavenaamioissa, jotka tehdään palmunlehden tupeista ja tahmean riisin höyrytyskoreista.',
    },
    'Lop Buri': {
      lyhyt: 'Lopburissa Phra Prang Sam Yotin temppelin makakeille katetaan joka vuosi apinabuffet, jossa hedelmiä on jäädytetty jopa jääkimpaleiden sisään.',
    },
    'Mae Hong Son': {
      lyhyt: 'Mae Hong Sonin Su Tong Pae on yli 500 metriä pitkä bambusilta, joka kulkee riisipeltojen ja joen yli kylästä meditaatiokeskukseen.',
    },
    'Maha Sarakham': {
      lyhyt: 'Maha Sarakham on Isanin yliopistokaupunki: pelkästään Mahasarakhamin yliopistossa opiskelee kymmeniätuhansia nuoria.',
    },
    Mukdahan: {
      lyhyt: 'Mukdahanista pääsee Mekongin yli Laosin Savannakhetiin toista Thaimaan–Laosin ystävyydensiltaa pitkin.',
    },
    'Nakhon Pathom': {
      lyhyt: 'Nakhon Pathomin Phra Pathommachedi on Thaimaan korkein stupa, noin 120 metriä, ja sen kellonmuotoinen kupoli näkyy kaupungissa joka suuntaan.',
    },
    'Nakhon Phanom': {
      lyhyt: 'Buddhalaisen paaston päättyessä Nakhon Phanomissa lasketaan Mekongille valaistuja veneitä, lai ruea fai, jotka hehkuvat yön pimeydessä.',
    },
    'Nakhon Ratchasima': {
      lyhyt: 'Dan Kwianin kylässä poltetaan keramiikkaa yhä puulla lämmitettävissä anagama-uuneissa, käyttöruukuista savimuraaleihin ja veistoksiin.',
    },
    'Nakhon Sawan': {
      lyhyt: 'Nakhon Sawanissa asuu paljon kiinalaistaustaisia thaimaalaisia, ja kaupungin kiinalaisen uudenvuoden juhlaa on vietetty jo yli sata vuotta.',
    },
    'Nakhon Si Thammarat': {
      lyhyt: 'Wat Phra Mahathatin chedi on Etelä-Thaimaan tärkein buddhalainen muistomerkki, ja se on kuvattu myös maakunnan sinettiin.',
    },
    'Nakhon Nayok': {
      lyhyt: 'Nakhon Nayokin Khun Dan Prakan Chonin betonipato on yli kaksi ja puoli kilometriä pitkä, ja sen harjalla voi kävellä altaan ja laakson välissä.',
    },
    Nan: {
      lyhyt: 'Nanin Wat Phuminin thai lue -seinämaalausten kuuluisimpia kohtauksia on mies, joka kuiskaa jotakin naisen korvaan.',
    },
    Narathiwat: {
      lyhyt: 'Talo Manon moskeija on rakennettu tiikistä ilman ainuttakaan naulaa, ja se on yksi Thaimaan vanhimmista moskeijoista.',
    },
    'Nong Bua Lam Phu': {
      lyhyt: 'Wat Tham Erawanin luolatemppeliin kiivetään 600 porrasta, ja luolan suulla istuva suuri Buddha näkyy kauas riisipelloille.',
    },
    'Nong Khai': {
      lyhyt: 'Nong Khain Mekong-rannoilla väki odottaa lokakuussa naga-tulipalloja, punertavia valoja, joiden uskotaan nousevan joessa asuvasta käärmeestä.',
    },
    Nonthaburi: {
      lyhyt: 'Chao Phraya -joen Ko Kret -saarella asuu mon-kansaa, joka elää yhä saviruukkujen valmistuksesta, ja saarelle kuljetaan lautalla.',
    },
    'Pathum Thani': {
      lyhyt: 'Pathum Thanin Talaad Thai on Kaakkois-Aasian suurin maataloustuotteiden tukkutori, ja se on auki vuorokauden ympäri.',
    },
    Pattani: {
      lyhyt: 'Sai Buri -joen rannoilla keinuvat kolae-kalastusveneet, joiden keula ja perä on maalattu kirjaviksi malaijilaisin, thaimaalaisin ja kiinalaisin kuvioin.',
    },
    Phangnga: {
      lyhyt: 'Phang Ngan lahdella merestä nousee 20-metrinen Ko Tapu -kalliopilari, jota kutsutaan James Bond -saareksi vuoden 1974 elokuvan mukaan.',
    },
    Phatthalung: {
      lyhyt: 'Thale Noin kosteikon vesipuhvelit ovat oppineet uimaan: tulvakaudella ne sukeltavat laiduntamaan veden alla kasvavaa ruohoa.',
    },
    Phayao: {
      lyhyt: 'Kwan Phayao on Pohjois-Thaimaan suurin makeanveden järvi, mutta syvyyttä sillä on vain puolitoista metriä.',
    },
    Phetchabun: {
      lyhyt: 'Phu Thap Boekin rinteillä hmong-viljelijät kasvattavat kaalia, sillä vuoren viileä ilmasto sopii sille paremmin kuin tasangon helle.',
    },
    Phetchaburi: {
      lyhyt: 'Phetchaburi on tunnettu jälkiruoistaan, kuten khanom mo kaeng -vanukkaasta, ja Unesco nimesi sen gastronomian kaupungiksi vuonna 2021.',
    },
    Phichit: {
      lyhyt: 'Bueng Si Fai on Thaimaan viidenneksi suurin makeanveden järvi, ja sen rannalla vartioi jättimäinen krokotiilipatsas Chalawan-tarinan mukaan.',
    },
    Phitsanulok: {
      lyhyt: 'Phitsanulokin Wat Yaissa istuu kullattu Phra Phuttha Chinnarat, jota moni thaimaalainen pitää maan kauneimpana Buddha-kuvana.',
    },
    'Phra Nakhon Si Ayutthaya': {
      lyhyt: 'Ayutthayan kaduilla myydään roti sai maita, ohuita lettuja, joiden sisään kääritään värikästä sokerihattaraa.',
    },
    Phrae: {
      lyhyt: 'Phae Mueang Phi eli aavemaa on eroosion muovaamien sienikivien ja pylväiden kenttä, ja se on ollut suojeltu metsäpuisto vuodesta 1981.',
    },
    Phuket: {
      lyhyt: 'Phuketin kasvisruokajuhlassa meediot lävistävät transsissa poskiaan, ja kasvisruokaa tarjoavat kojut nostavat keltapunaiset jay-liput.',
    },
    'Prachin Buri': {
      lyhyt: 'Prachin Burin sinetissä on bodhipuu, sillä Wat Si Maha Photin puun kerrotaan istutetun noin kaksituhatta vuotta sitten.',
    },
    'Prachuap Khiri Khan': {
      lyhyt: 'Phraya Nakhonin luolassa seisoo vuonna 1890 rakennettu kuninkaallinen paviljonki, ja tiettyinä tunteina sitä valaisee katon aukosta laskeutuva auringonvalo.',
    },
    Ranong: {
      lyhyt: 'Ranong on Thaimaan sateisimpia seutuja, yli 4 500 millimetriä vuodessa, ja sitä kutsutaan kahdeksan sadekuukauden ja neljän aurinkokuukauden kaupungiksi.',
    },
    Ratchaburi: {
      lyhyt: 'Ratchaburi on lohikäärmeruukkujen kaupunki: suuriin kivitavararuukkuihin maalataan kiemurtelevia lohikäärmeitä.',
    },
    Rayong: {
      lyhyt: 'Rayongin rannikon edustalla on Khao Laem Ya–Mu Ko Sametin kansallispuisto, ja sen tunnetuin saari Ko Samet on kuvattu maakunnan sinettiin.',
    },
    'Roi Et': {
      lyhyt: 'Roi Et tarkoittaa kirjaimellisesti sataayhtä, ja kaupungin keskustan järven rannalla nousee 101 metriä korkea näkötorni.',
    },
    'Sa Kaeo': {
      lyhyt: 'Aranyaprathetin Rong Kluea on vilkas rajatori Kambodžan-rajan tuntumassa, ja sen nimi tarkoittaa suolavaraston toria.',
    },
    'Sakon Nakhon': {
      lyhyt: 'Sakon Nakhonin luonnonindigolla värjätty puuvillakangas on suojattu alkuperämerkintä, ja sen sini vaihtelee vaaleasta syvään tummansiniseen.',
    },
    'Samut Prakan': {
      lyhyt: 'Samut Prakanin Erawan-museon jalustalla seisoo 29 metriä korkea ja 250 tonnia painava kolmipäinen pronssinorsu, jonka vatsassa on näyttelysali.',
    },
    'Samut Sakhon': {
      lyhyt: 'Maeklongin rautatie katkeaa Samut Sakhonissa Tha Chin -jokeen, ja matkustajat ylittävät joen lautalla ennen kuin jatkavat seuraavaan junaan.',
    },
    'Samut Songkhram': {
      lyhyt: 'Maeklongin rautatietorilla myyjät vetävät markiisinsa ja vihannesvasunsa pois kiskoilta aina, kun juna lähestyy.',
    },
    Saraburi: {
      lyhyt: 'Wat Phra Phutthabatin kultaisen kotelon alla on puolitoista metriä pitkä kivipainauma, jota pidetään Buddhan jalanjälkenä.',
    },
    Satun: {
      lyhyt: 'Satunista tuli 2018 Thaimaan ensimmäinen Unescon globaali geopark, ja sen kallioista löytyy yli 500 miljoonaa vuotta vanhoja trilobiitteja.',
    },
    'Si Sa Ket': {
      lyhyt: 'Khun Hanin Wat Pa Maha Chedi Kaewiin on muurattu yli puolitoista miljoonaa tyhjää olutpulloa, vihreitä ja ruskeita.',
    },
    'Sing Buri': {
      lyhyt: 'Sing Burin ylpeys on pla chon mae la, käärmepääkala, joka on kotoisin maakunnan läpi virtaavasta Mae La -joesta.',
    },
    Songkhla: {
      lyhyt: 'Samilan rannalla istuu vuonna 1966 valettu pronssinen merenneito kampaamassa hiuksiaan, ja sen koskettamisen sanotaan tuovan onnea.',
    },
    Sukhothai: {
      lyhyt: 'Sukhothain Si Satchanalaissa valmistetaan yhä sangkhalok-keramiikkaa, jota alueen sadat polttouunit tekivät jo 1300-luvulla.',
    },
    'Suphan Buri': {
      lyhyt: 'Tha Chin -joen varren Sam Chukin vanha tori sai 2009 Unescon kulttuuriperintöpalkinnon, kun asukkaat itse kunnostivat sen puiset kauppatalot.',
    },
    'Surat Thani': {
      lyhyt: 'Khao Sokin sademetsässä kukkii Rafflesia kerrii, jonka kukka voi olla lähes metrin levyinen ja haisee mätänevältä lihalta.',
    },
    Surin: {
      lyhyt: 'Surinissa kasvatetaan noin neljännes Thaimaan kesyistä norsuista, ja marraskuun norsujuhlassa norsut kisaavat köydenvedossa ihmisiä vastaan.',
    },
    Tak: {
      lyhyt: 'Umphangin Thi Lo Su -vesiputous on noin 250 metriä korkea ja 450 metriä leveä, ja sitä pidetään Thaimaan suurimpana.',
    },
    Trang: {
      lyhyt: 'Ko Mukin Smaragdiluolaan uidaan 80 metriä pilkkopimeää tunnelia pitkin, ja sen päässä odottaa kallioiden ympäröimä salainen ranta.',
    },
    Trat: {
      lyhyt: 'Ko Chang eli Norsusaari on Thaimaan kolmanneksi suurin saari, ja noin 85 prosenttia siitä kuuluu kansallispuistoon.',
    },
    'Ubon Ratchathani': {
      lyhyt: 'Ubonin kynttiläjuhlassa kaupungin läpi kulkee jättimäisiä vahaveistoksia, joita ei koskaan sytytetä – ne kuljetetaan temppeleihin sadekauden paaston alkaessa.',
    },
    'Udon Thani': {
      lyhyt: 'Nong Han Kumphawapin järvi muuttuu talvella vaaleanpunaiseksi, kun tuhannet lumpeet kukkivat – paikalliset kutsuvat sitä punaisten lootusten mereksi.',
    },
    'Uthai Thani': {
      lyhyt: 'Huai Kha Khaengin luonnonsuojelualue on Unescon maailmanperintöä, ja sen metsissä elää noin 90 luonnonvaraista indokiinantiikeriä.',
    },
    Uttaradit: {
      lyhyt: 'Uttaradit tunnetaan Laplaen durianeista, joilta puuttuu hedelmän tavallinen voimakas haju, ja syyskuussa vietetään langsat-juhlaa.',
    },
    Yala: {
      lyhyt: 'Betongin kellotornin risteyksessä seisoo vuonna 1924 valettu yli kolmemetrinen betoninen postilaatikko, jonka päällä oli aikoinaan radio.',
    },
    Yasothon: {
      lyhyt: 'Yasothonissa ammutaan toukokuun Bun Bang Fai -juhlassa taivaalle kotitekoisia raketteja kutsumaan sadetta riisipelloille.',
    },
  },
  /*
   * PHL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.PHL:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: 17 hallinnollista aluetta
   * (region). Huom. datan nimissä: "Autonomous Region in Muslim Mindanao
   * (ARMM)" on vuodesta 2019 BARMM, ja "Dinagat Islands (Region XIII)"
   * on koko Caragan alue (Dinagat on vain yksi sen maakunnista) —
   * luonnehdinta kertoo siksi Caragan Siargaosta. Vältetty
   * maastokohteet-phl.js:n aiheet (Apo, Mayon, Banaue, Vigan, Chocolate
   * Hills, Tubbataha, maanalainen joki, Callao, Paoay, Corregidor).
   * Lähteet (en-Wikipedia ja hakutarkistus 25.9.2026): Lake Lanao,
   * Donsol, Ivatan people, Taal Volcano, Giant Lantern Festival, Sinulog,
   * Sagada/Hanging coffins, Philippine eagle, Siargao, San Juanico
   * Bridge, Bangui Wind Farm, Coron Island, Jeepney, Cagayan de Oro,
   * T'nalak, Boracay (sulku 26.4.2018 alkaen), Chavacano.
   */
  PHL: {
    'Autonomous Region in Muslim Mindanao (ARMM)': {
      lyhyt: 'Lanao-järvi on Filippiinien syvin ja toiseksi suurin järvi, ja sen rannoilla asuvat maranaot, joiden nimi tarkoittaa järven kansaa.',
    },
    'Bicol (Region V)': {
      lyhyt: 'Sorsogonin Donsolissa voi marras–kesäkuussa uida valashaiden, paikallisittain butandingien, rinnalla valvotuilla retkillä.',
    },
    'Cagayan Valley (Region II)': {
      lyhyt: 'Batanesin saarilla ivatanit asuvat kivitaloissa, joiden metrin paksuiset kalkkikiviseinät ja tiheät heinäkatot kestävät taifuunit.',
    },
    'CALABARZON (Region IV-A)': {
      lyhyt: 'Taal-järven keskellä on Tulivuorisaari, ja sen kraatterijärvessä on vielä Vulcan Point – saari järvessä saaressa järvessä.',
    },
    'Central Luzon (Region III)': {
      lyhyt: 'Pampangan San Fernandossa kaupunginosat kilpailevat joka joulukuu jättimäisillä parol-tähtilyhdyillä Ligligan Parul -juhlassa.',
    },
    'Central Visayas (Region VII)': {
      lyhyt: 'Cebu Cityssä tanssitaan tammikuun kolmantena sunnuntaina sinulogia, rumpujen tahtiin etenevää rukoustanssia Santo Niñon kunniaksi.',
    },
    'Cordillera Administrative Region (CAR)': {
      lyhyt: 'Sagadan Echo Valleyssa arkut roikkuvat kalkkikivijyrkänteillä, sillä vainajat on perinteisesti haudattu kallioille eikä maahan.',
    },
    'Davao (Region XI)': {
      lyhyt: 'Davaon kotkakeskuksessa hoidetaan filippiinienkotkia, ja siellä onnistuttiin ensimmäisen kerran kasvattamaan lajin poikanen tarhassa vuonna 1992.',
    },
    'Dinagat Islands (Region XIII)': {
      lyhyt: 'Caragan alueeseen kuuluvan Siargaon Cloud 9 on Filippiinien tunnetuin surffipaikka, jonka paksut aallot kaartuvat onttoiksi putkiksi.',
    },
    'Eastern Visayas (Region VIII)': {
      lyhyt: 'San Juanicon silta kulkee 2,16 kilometriä salmen yli Leytestä Samariin, ja avattaessa 1973 se oli Filippiinien pisin silta.',
    },
    'Ilocos (Region I)': {
      lyhyt: 'Banguin lahden rannalla seisoo yhdessä rivissä kaksikymmentä 70-metristä tuulivoimalaa, jotka kääntyvät kohti merta, josta tuuli puhaltaa.',
    },
    'MIMAROPA (Region IV-B)': {
      lyhyt: 'Coronin lahden pohjassa lepää toisen maailmansodan japanilaisia laivanhylkyjä, ja niiden luo sukelletaan kuudesta yli neljäänkymmeneen metriin.',
    },
    'National Capital Region': {
      lyhyt: 'Manilan kaduilla kulkevat jeepneyt, värikkäiksi maalatut pikkubussit, joiden esikuvina olivat Yhdysvaltain armeijan jättämät sotilasjeepit.',
    },
    'Northern Mindanao (Region X)': {
      lyhyt: 'Cagayan de Oron kaupungin läpi virtaavalla joella lasketaan koskia kumiveneillä ja kajakeilla, ja kisoja järjestetään joka vuosi.',
    },
    'SOCCSKSARGEN (Region XII)': {
      lyhyt: "Lake Sebun t'boli-naiset kutovat abakakuidusta t'nalak-kangasta kuvioihin, jotka he ovat nähneet unissaan.",
    },
    'Western Visayas (Region VI)': {
      lyhyt: 'Boracayn saari suljettiin turisteilta puoleksi vuodeksi 2018, jotta sen viemäröinti ja rannat saatiin kuntoon.',
    },
    'Zamboanga Peninsula (Region IX)': {
      lyhyt: 'Zamboanga Cityssä puhutaan chavacanoa, Aasian ainoaa espanjapohjaista kreolikieltä, ja se on kaupungin virallinen kieli.',
    },
  },
  /*
   * VNM (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.VNM:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti (Natural Earthin nimet, osa ilman
   * diakriittejä: "Ha Noi", "Can Tho", "Ha Tinh", "Hau Giang", "Lai Chau",
   * "Son La"; "Ðong Tháp" alkaa islannin eth-kirjaimella U+00D0, ja
   * "Quàng Nam" on väärällä sävymerkillä). KOLME NATURAL EARTHIN VIRHETTÄ:
   * kolmella maakunnalla on tunnuksena suuralueen nimi, ja luonnehdinta
   * kuvaa polygonin todellista maakuntaa (tunnistettu keskipisteestä,
   * julisteet/pallo/maakunnat/2026-09-25a/VNM.json):
   *   "Đông Bắc"            (105,85 E 22,24 N) = Bắc Kạn
   *   "Đồng Bằng Sông Hồng" (106,06 E 20,83 N) = Hưng Yên
   *   "Đông Nam Bộ"         (107,20 E 11,06 N) = Đồng Nai
   * Jako on vuoden 2025 uudistusta edeltävä 63 maakuntaa (1.7.2025 alkaen
   * 34), joten tekstit kuvaavat seutua eivätkä hallintoyksikköä. Vältetty
   * maastokohteet-vnm.js:n aiheet (Hội An, Huến linnoitus, Mỹ Sơn, Phong
   * Nha ja Sơn Đoòng, Điện Biên Phủn taistelu, Hồ-linnoitus, Hoa Lư, Po
   * Nagar, Fansipan, Punainenjoki, Hạ Long, Mekong). Vain `lyhyt`.
   * Lähteet (en-Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat:
   *   Bà Rịa - Vũng Tàu — Côn Đảon kansallispuisto (n. 90 % Vietnamin
   *                        vihermerikilpikonnien pesinnästä; hautomot)
   *   Bạc Liêu           — Bac Lieu near-shore wind farm (vuorovesimuta)
   *   Bình Dương         — huonekaluteollisuuden keskittymä (Nam Tân Uyên)
   *   Bình Phước         — Vietnam News: puolet maan cashew-alasta
   *   Bình Thuận         — n. 55 % pitayasadosta 2019; yövalaistus
   *   Cà Mau             — kerrostuminen 25–100 m/v niemen kärjessä
   *   Đắk Nông           — Unesco-geopuisto 2020, n. 50 laavaluolaa, 10 km
   *   Hà Nam             — Tam Chúc, YK:n vesak-päivä 12.–14.5.2019
   *   Hau Giang          — Ngã Bảy, seitsemän kanavan risteys (1915)
   *   Hồ Chí Minh city   — Metro Line 1, avattu 22.12.2024
   *   Kon Tum            — puukirkko 1913–1918, bahnarien paalutalotyyli
   *   Lai Chau           — Lai Châun vesivoimala, vihitty 20.12.2016
   *   Long An            — Nhà trăm cột, 120 pylvästä, 1901–1903
   *   Ninh Thuận         — maan kuivin seutu, suurin rypäleiden tuottaja
   *   Quảng Bình         — Võ Nguyên Giápin hauta, Vũng Chùa (2013)
   *   Thái Bình          — Keon pagodi, kolmikerroksinen kellotorni
   *   Thừa Thiên - Huế   — Tam Giang–Cầu Hai, lähes 70 km
   *   Tuyên Quang        — Thành Tuyên -festivaali (jättilyhdyt)
   *   Muut               — yleistietoa, tarkistettu vastaavista
   *                        en-Wikipedia-artikkeleista.
   */
  VNM: {
    'An Giang': {
      lyhyt: 'Trà Sưn kajaputmetsässä liikutaan tulvakaudella veneillä, ja vettä peittää niin tiheä vihreä kasvimatto, että kanava näyttää niityltä.',
    },
    'Bà Rịa - Vũng Tàu': {
      lyhyt: 'Côn Đảon saarilla munii noin 90 prosenttia Vietnamin vihermerikilpikonnista, ja vartijat siirtävät munat suojaan hautomoihin.',
    },
    'Bắc Giang': {
      lyhyt: 'Lục Ngạnin litsipuutarhoissa kesäkuu on sadonkorjuun aikaa, ja teiden varret täyttyvät punaisista hedelmäkasoista.',
    },
    'Bạc Liêu': {
      lyhyt: 'Bạc Liêun tuulivoimalat seisovat rannikon vuorovesimudassa, ja nousuveden aikaan ne näyttävät kasvavan suoraan merestä.',
    },
    'Bắc Ninh': {
      lyhyt: 'Bắc Ninhin kylissä lauletaan quan họ -vuorolauluja, joissa miesten ja naisten ryhmät vastaavat toisilleen; perinne on Unescon listalla.',
    },
    'Bến Tre': {
      lyhyt: 'Bến Tre on kookospalmujen seutua, ja pienissä perhepajoissa kookosmaidosta keitetään sitkeitä kookoskaramelleja.',
    },
    'Bình Định': {
      lyhyt: 'Bình Định tunnetaan vietnamilaisten perinteisten kamppailulajien kotiseutuna, ja niitä harjoitellaan monessa kylässä yhä.',
    },
    'Bình Dương': {
      lyhyt: 'Bình Dươngin teollisuusalueet Hồ Chí Minhin kaupungin pohjoispuolella ovat Vietnamin huonekaluteollisuuden ydintä.',
    },
    'Bình Phước': {
      lyhyt: 'Bình Phước on Vietnamin suurin cashewpähkinän viljelyseutu, ja sen punamullassa kasvaa noin puolet maan cashewpuista.',
    },
    'Bình Thuận': {
      lyhyt: 'Bình Thuận kasvattaa yli puolet Vietnamin pitayoista, ja viljelmillä palaa öisin lamppuja, jotka saavat kaktukset kukkimaan.',
    },
    'Cà Mau': {
      lyhyt: 'Cà Maun niemen kärjessä mangrovemetsä kasvattaa maata mereen päin kymmeniä metrejä vuodessa, kun juuret pidättävät lietettä.',
    },
    'Can Tho': {
      lyhyt: 'Cần Thơn Cái Răngin kelluvalla torilla kauppa käydään veneistä aamuhämärissä, ja myyjät ripustavat tuotteensa pitkän salon nokkaan.',
    },
    'Cao Bằng': {
      lyhyt: 'Bản Giốcin vesiputous valuu monena portaana Kiinan rajalla, ja bambulautat vievät vierailijoita aivan kuohujen eteen.',
    },
    'Đà Nẵng': {
      lyhyt: 'Đà Nẵngin Lohikäärmesilta syöksee viikonloppuiltaisin suustaan tulta ja vettä, ja katsojat kerääntyvät Hàn-joen rannoille.',
    },
    'Đắk Lắk': {
      lyhyt: 'Buôn Ma Thuộtia kutsutaan Vietnamin kahvipääkaupungiksi, ja ympäröivän ylängön punamullassa kasvaa robustakahvia.',
    },
    'Đắk Nông': {
      lyhyt: 'Đắk Nôngin Unescon geopuistossa on noin 50 laavaluolan järjestelmä, jonka käytäviä on yhteensä yli kymmenen kilometriä.',
    },
    'Điện Biên': {
      lyhyt: 'Maaliskuussa Điện Biênin vuorenrinteet valkenevat ban-puiden kukista, ja kukinnan kunniaksi vietetään omaa juhlaa.',
    },
    'Đông Bắc': {
      lyhyt: 'Ba Bể on Vietnamin suurin luonnollinen makean veden järvi, ja sen rannoilla tày-kansan paalutalot katsovat kalkkivuorten ympäröimälle vedelle.',
    },
    'Đồng Bằng Sông Hồng': {
      lyhyt: 'Hưng Yênin longaneja vietiin aikoinaan lahjaksi keisarin hoviin, ja kesällä puutarhojen puut notkuvat yhä hedelmistä.',
    },
    'Đông Nam Bộ': {
      lyhyt: 'Đồng Nain Cát Tiênin kansallispuiston alankosademetsässä elää keltaposkigibboneja, joiden laulu kaikuu aamuisin latvoista.',
    },
    'Ðong Tháp': {
      lyhyt: 'Đồng Thápin tulvatasangolla lootuslammet kukkivat kesällä vaaleanpunaisina, ja lootuksesta tehdään makeisia ja teetä.',
    },
    'Gia Lai': {
      lyhyt: 'Pleikun laidalla on Biển Hồ, sammuneen tulivuoren kraateriin syntynyt järvi, josta kaupunki saa juomavetensä.',
    },
    'Hà Giang': {
      lyhyt: 'Mã Pí Lèngin sola kiemurtelee jyrkänteen reunalla satoja metrejä Nho Quế -joen yläpuolella, ja tie on Vietnamin huimaavimpia.',
    },
    'Hà Nam': {
      lyhyt: 'Tam Chúcin laaja buddhalainen temppelialue rakennettiin järven ja kalkkivuorten väliin, ja 2019 siellä vietettiin YK:n vesak-päivää.',
    },
    'Ha Tinh': {
      lyhyt: 'Tiên Điền on runoilija Nguyễn Dun suvun kotikylä, ja hänen Kiềun tarinaansa pidetään vietnamilaisen kirjallisuuden kulmakivenä.',
    },
    'Hải Dương': {
      lyhyt: 'Hải Dương tunnetaan mungpapukakuistaan, pienistä makeista paloista, joita syödään vihreän teen kanssa ja viedään tuliaisiksi.',
    },
    'Hải Phòng': {
      lyhyt: 'Cát Bàn saaren kalkkikivikallioilla elää Cát Bàn languri, maailman uhanalaisimpia apinoita, jota ei tavata missään muualla.',
    },
    'Ha Noi': {
      lyhyt: 'Hanoin Hoàn Kiếm -järven ympäristö suljetaan viikonloppuisin autoilta, ja kadut täyttyvät kävelijöistä ja katusoittajista.',
    },
    'Hau Giang': {
      lyhyt: 'Ngã Bảyn kaupungissa seitsemän kanavaa kohtaa samassa risteyksessä, ja nimikin tarkoittaa seitsemän tien risteystä.',
    },
    'Hồ Chí Minh city': {
      lyhyt: 'Hồ Chí Minhin kaupungin ensimmäinen metrolinja avattiin joulukuussa 2024, ja se kulkee Bến Thànhin torilta Suối Tiêniin.',
    },
    'Hòa Bình': {
      lyhyt: 'Mai Châun laaksossa valkoiset thait asuvat paalutaloissa riisipeltojen keskellä, ja moni talo majoittaa matkalaisia.',
    },
    'Thừa Thiên - Huế': {
      lyhyt: 'Tam Giang–Cầu Hain laguuniketju ulottuu lähes 70 kilometriä rannikon suuntaisesti, ja matalassa vedessä seisoo kalastajien bambuaitoja.',
    },
    'Khánh Hòa': {
      lyhyt: 'Khánh Hòan rannikon saarten luolista kerätään salangaanien pesiä, ja niistä keitetty keitto on Vietnamissa arvostettu herkku.',
    },
    'Kiên Giang': {
      lyhyt: 'Phú Quốcin saarella kalakastiketta kypsytetään kuukausia suurissa puutynnyreissä sardelleista ja suolasta.',
    },
    'Kon Tum': {
      lyhyt: 'Kon Tumin puukirkko valmistui 1918, ja siinä eurooppalainen kirkkomalli yhdistyy bahnarien paalutalojen tyyliin.',
    },
    'Lai Chau': {
      lyhyt: 'Lai Châun vesivoimalan pato Đà-joella valmistui 2016, ja se on samalla joella olevien Sơn Lan ja Hòa Bìnhin voimaloiden ketjun ylin.',
    },
    'Lâm Đồng': {
      lyhyt: 'Đà Lạt on noin 1 500 metrin korkeudessa, ja sen viileässä ilmastossa kasvatetaan kasvihuoneissa kukkia koko maan tarpeisiin.',
    },
    'Lạng Sơn': {
      lyhyt: 'Hữu Nghịn raja-asema on yksi Vietnamin ja Kiinan vilkkaimmista, ja rekkajonot sen edessä voivat venyä kilometrien mittaisiksi.',
    },
    'Lào Cai': {
      lyhyt: 'Bắc Hàn sunnuntaitorille tulee vuoristokylistä kirjavasti pukeutuneita kukka-hmongeja, ja torin laidalla käydään kauppaa puhveleista.',
    },
    'Long An': {
      lyhyt: 'Cần Đướcin satapylväinen talo rakennettiin 1900-luvun alussa Huếsta tulleiden puuseppien voimin, ja sen kattoa kannattelee 120 pylvästä.',
    },
    'Nam Định': {
      lyhyt: 'Trầnin temppelissä avataan joka vuosi ensimmäisen kuukauden täydenkuun yönä sinetti, ja siunattuja leimoja tavoittelee valtava väkijoukko.',
    },
    'Nghệ An': {
      lyhyt: 'Kim Liênin kylässä on Hồ Chí Minhin lapsuudenkoti, olkikattoinen puutalo, jota käy katsomassa vierailijoita ympäri maata.',
    },
    'Ninh Bình': {
      lyhyt: 'Tam Cốcin joella soutajat vievät veneitä riisipeltojen ja kalkkivuorten välissä, ja moni heistä soutaa jaloillaan.',
    },
    'Ninh Thuận': {
      lyhyt: 'Ninh Thuận on Vietnamin kuivinta seutua, ja sen paahteessa kypsyy suurin osa maan viinirypäleistä.',
    },
    'Phú Thọ': {
      lyhyt: 'Nghĩa Lĩnh -vuorella ovat Hùng-kuninkaiden temppelit, ja kolmannen kuukauden kymmenentenä päivänä heitä muistetaan koko maassa vapaapäivällä.',
    },
    'Phú Yên': {
      lyhyt: 'Gành Đá Đĩan rannalla musta basaltti on jähmettynyt kuusikulmaisiksi pylväiksi, jotka näyttävät pinotuilta lautasilta.',
    },
    'Quảng Bình': {
      lyhyt: 'Vũng Chùan rannikolla Thọ-vuoren rinteellä on kenraali Võ Nguyên Giápin hauta, jolta avautuu näkymä Etelä-Kiinan merelle.',
    },
    'Quàng Nam': {
      lyhyt: 'Quảng Namin nimi on jokaiselle vietnamilaiselle tuttu mì Quảng -nuudeleista, joiden kulhon pohjalla on vain loraus lientä.',
    },
    'Quảng Ngãi': {
      lyhyt: 'Lý Sơnin tuliperäisellä saarella kasvatetaan valkosipulia, josta saari tunnetaan kaikkialla Vietnamissa.',
    },
    'Quảng Ninh': {
      lyhyt: 'Yên Tửn vuorelle nousee pyhiinvaeltajia, sillä siellä kuningas Trần Nhân Tông perusti vietnamilaisen zenin Trúc Lâm -koulun.',
    },
    'Quảng Trị': {
      lyhyt: 'Hiền Lươngin silta Bến Hải -joen yli merkitsi kahden vuosikymmenen ajan Pohjois- ja Etelä-Vietnamin rajaa, ja nyt se on muistomerkki.',
    },
    'Sóc Trăng': {
      lyhyt: 'Sóc Trăngin khmerit kilpailevat Ok Om Bok -juhlassa pitkillä ghe ngo -veneillä, joissa kymmenet soutajat melovat samaan tahtiin.',
    },
    'Son La': {
      lyhyt: 'Mộc Châun ylätasanko on Vietnamin maidontuotannon keskuksia, ja sen viileillä laitumilla laiduntaa lypsykarjaa.',
    },
    'Tây Ninh': {
      lyhyt: 'Tây Ninhissä on caodaismin pyhä istuin, värikäs temppeli, jossa rukoushetkiä pidetään neljästi vuorokaudessa.',
    },
    'Thái Bình': {
      lyhyt: 'Keon pagodin kolmikerroksinen puinen kellotorni on 1600-luvulta, ja sen jokaisessa kerroksessa riippuu oma pronssikellonsa.',
    },
    'Thái Nguyên': {
      lyhyt: 'Tân Cươngin teeviljelmiltä tulee Vietnamin tunnetuinta vihreää teetä, ja lehdet paahdetaan usein käsin pannuissa.',
    },
    'Thanh Hóa': {
      lyhyt: 'Sầm Sơnin hiekkaranta on Pohjois-Vietnamin suosituimpia, ja kesäviikonloppuisin sinne ajetaan joukolla Hanoista asti.',
    },
    'Tiền Giang': {
      lyhyt: 'Mỹ Thon mukaan nimetty hủ tiếu -keitto on kirkasta lientä ja ohuita riisinuudeleita, ja sitä syödään mielellään aamiaiseksi.',
    },
    'Trà Vinh': {
      lyhyt: 'Ao Bà Omin nelikulmaista lampea reunustavat vanhat puut, joiden juuret kiemurtelevat maan pinnalla kuin veistokset.',
    },
    'Tuyên Quang': {
      lyhyt: 'Tuyên Quangissa keskisyksyn juhlaa vietetään jättimäisten lyhtyjen kulkueella, ja lyhdyt rakennetaan korttelien omin voimin.',
    },
    'Vĩnh Long': {
      lyhyt: 'Mang Thítin joenvarsilla savuavat kupolinmuotoiset tiili- ja keramiikkauunit, ja seutua kutsutaan punaisen saven valtakunnaksi.',
    },
    'Vĩnh Phúc': {
      lyhyt: 'Tam Đảon vuoristokylä noin 900 metrin korkeudessa on hanoilaisten kesäpakopaikka, jossa ilma on laaksoa viileämpää.',
    },
    'Yên Bái': {
      lyhyt: 'Mù Cang Chảin vuorenrinteille hmongit ovat rakentaneet porrasmaisia riisipeltoja, jotka kellastuvat syyskuussa ennen sadonkorjuuta.',
    },
  },
  /*
   * MYS (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.MYS:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti ("Melaka" = Malakka, "Pulau
   * Pinang" = Penang; Kuala Lumpur, Labuan ja Putrajaya ovat
   * liittovaltion alueita). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Johor        — Tanjung Piai (Manner-Aasian eteläisin kohta, Ramsar)
   *   Kuala Lumpur — Petronas Towers (silta 41.–42. kerros, 170 m)
   *   Pahang       — BOH Plantations (1929, Malesian vanhin teetuottaja)
   *   Selangor     — Batu Caves Murugan Statue (42,7 m, 272 porrasta)
   *   Terengganu   — Crystal Mosque (Wan Man, avattu 8.2.2008)
   *   Muut         — yleistietoa, tarkistettu vastaavista
   *                  en-Wikipedia-artikkeleista.
   */
  MYS: {
    Johor: {
      lyhyt: 'Johorin Tanjung Piai on Aasian mantereen eteläisin kohta, ja niemen kärkeen kävellään mangrovemetsän halki pitkospuita pitkin.',
    },
    Kedah: {
      lyhyt: 'Kedahia kutsutaan Malesian riisiaitaksi, ja sen tasaiset riisipellot ulottuvat Gunung Jerain juurelta merenrantaan asti.',
    },
    Kelantan: {
      lyhyt: 'Kelantanissa rakennetaan wau bulan -leijoja, joiden alaosa on kuunsirpin muotoinen, ja niitä lennätetään sadonkorjuun jälkeen pelloilla.',
    },
    'Kuala Lumpur': {
      lyhyt: 'Petronasin kaksoistornien välillä kulkee 170 metrin korkeudessa kaksikerroksinen silta, jolle pääsee lipulla kävelemään.',
    },
    Labuan: {
      lyhyt: 'Labuanin saari on liittovaltion alue ja tullivapaa satama, jonne Borneon puolelta tullaan lautalla ostoksille.',
    },
    Melaka: {
      lyhyt: 'Malakan Stadthuys rakennettiin 1650 hollantilaisten kuvernöörin virkataloksi, ja nykyään sen punaisissa saleissa on museo.',
    },
    'Negeri Sembilan': {
      lyhyt: 'Negeri Sembilanin minangkabau-talojen katot kaartuvat kuin puhvelin sarvet, ja perinteessä maa periytyy äidiltä tyttärelle.',
    },
    Pahang: {
      lyhyt: 'Cameron Highlandsin rinteille perustettiin 1929 BOH-teetila, Malesian vanhin teentuottaja, ja sen pensasrivit peittävät kokonaisia kukkuloita.',
    },
    'Pulau Pinang': {
      lyhyt: 'George Townin seinämaalaukset, kuten polkupyörällä ajavat lapset, houkuttelevat kuvaajia vanhan kaupungin kujille.',
    },
    Perak: {
      lyhyt: 'Ipohin vanhan kaupungin kahviloissa juodaan valkoista kahvia, jonka pavut paahdetaan margariinissa ja joka makeutetaan kondensoidulla maidolla.',
    },
    Perlis: {
      lyhyt: 'Perlis on Malesian pienin osavaltio, ja sen rajakaupungista Padang Besarista kulkevat junat Thaimaan puolelle.',
    },
    Putrajaya: {
      lyhyt: 'Putrajaya on Malesian hallinnollinen pääkaupunki, ja sen tekojärven rannalla seisoo vaaleanpunaisesta graniitista rakennettu Putra-moskeija.',
    },
    Sabah: {
      lyhyt: 'Kinabalu kohoaa Sabahissa 4 095 metriin, ja huipulle kiivetään tavallisesti kahdessa päivässä yöpyen vuoren rinteellä.',
    },
    Sarawak: {
      lyhyt: 'Mulun kansallispuistossa on Sarawakin kammio, yksi maailman suurimmista tunnetuista luolasaleista.',
    },
    Selangor: {
      lyhyt: 'Batu Caves -luolatemppeliin noustaan 272 värikästä porrasta, ja niiden juurella seisoo 42,7-metrinen kullattu Murugan-patsas.',
    },
    Terengganu: {
      lyhyt: 'Kuala Terengganun Wan Manin saarella on vuonna 2008 avattu Kristallimoskeija, joka on rakennettu teräksestä ja lasista.',
    },
  },
  /*
   * SGP (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 5C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.SGP:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: viisi CDC-piiriä (Community
   * Development Council). Kohteet on sijoitettu piireihin polygonien
   * laatikoiden mukaan (julisteet/pallo/maakunnat/2026-09-25a/SGP.json):
   * Changin lentoasema South Eastissa, Mandai North Westissä. Vältetty
   * maastokohteet-sgp.js:n aiheet (Kasvitieteellinen puutarha, Pulau Ubin,
   * Kranji, Rafflesin majakka, Haw Par Villa, Bukit Timah, Sungei Buloh).
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja hakutarkistus 25.9.2026):
   *   Central Singapore — Gardens by the Bay (Supertree Grove)
   *   North East        — Sengkang LRT / Punggol LRT (kuljettajaton)
   *   North West        — Night Safari (avattu 1994, ensimmäinen yöeläintarha)
   *   South East        — Jewel Changi Airport (Rain Vortex, 40 m)
   *   South West        — Jurong Lake Gardens (kolmas kansallispuutarha, 2019)
   */
  SGP: {
    'Central Singapore': {
      lyhyt: 'Marina Bayn Gardens by the Bay -puistossa kohoaa kasvien peittämiä teräksisiä superpuita, jotka syttyvät iltaisin valoesitykseen.',
    },
    'North East': {
      lyhyt: 'Sengkangin ja Punggolin uusissa lähiöissä kulkee kuljettajaton kevytmetro, joka pujottelee korkeiden asuintalojen välissä.',
    },
    'North West': {
      lyhyt: 'Mandain Night Safari avattiin 1994 maailman ensimmäisenä yöeläintarhana, ja eläimiä katsellaan hämärässä pienen junan kyydistä.',
    },
    'South East': {
      lyhyt: 'Changin lentoaseman Jewel-rakennuksen lasikupolista syöksyy 40 metriä alas Rain Vortex, maailman korkein sisävesiputous.',
    },
    'South West': {
      lyhyt: 'Jurong Lake Gardens on Singaporen kolmas kansallispuutarha, ja sen järvenrannalle on ennallistettu makean veden suometsää.',
    },
  },
  /*
   * ARG (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6A). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.ARG:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: 23 provinssia ja pääkaupunki
   * avaimella "Ciudad de Buenos Aires" (nimiFi "Buenos Aires" kuten
   * provinssillakin). Vain `lyhyt`. Vältetty maastokohteet-arg.js:n
   * aiheet (Aconcagua, Río de la Plata, Cueva de las Manos, Quebrada de
   * Humahuaca, Córdoban jesuiittakortteli, La Polvorilla, Península
   * Valdés, Ushuaia, Ischigualasto, Perito Moreno). Lähteet (en-/es-
   * Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Formosa        — Bañado La Estrella (champales, Pilcomayon tulvat)
   *   La Pampa       — Parque Luro (Pedro Luron tuomat saksanhirvet,
   *                    brama maalis–huhtikuussa; turismo.lapampa.gob.ar)
   *   La Rioja       — Cable Carril Chilecito–La Mejicana (noin 35 km,
   *                    valmis 1905; argentina.gob.ar, es-Wikipedia)
   *   San Luis       — Sierra de las Quijadas / Pterodaustro
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  ARG: {
    'Buenos Aires': {
      lyhyt: 'Provinssin pääkaupunki La Plata rakennettiin tyhjästä 1880-luvulla, ja sen ruutukaavaa halkovat vinottaiset diagonaalikadut.',
    },
    'Ciudad de Buenos Aires': {
      lyhyt: 'Avenida 9 de Julio on yksi maailman leveimmistä kaduista, ja sen keskellä kohoaa 67-metrinen valkoinen Obelisco.',
    },
    'Catamarca': {
      lyhyt: 'El Peñónin lähellä Punan ylängöllä levittäytyy Campo de Piedra Pómez, tuulen veistämien vaaleiden hohkakivimuodostelmien kenttä.',
    },
    'Chaco': {
      lyhyt: 'Campo del Cielon kraatterikentältä on löydetty maailman raskaimpiin kuuluvia rautameteoriitteja, kuten kymmenien tonnien El Chaco.',
    },
    'Chubut': {
      lyhyt: 'Gaimanissa elää walesilaisten siirtolaisten perintö: teetaloissa tarjoillaan walesilaista kakkua, ja kappeleissa kuulee yhä kymriä.',
    },
    'Córdoba': {
      lyhyt: 'Villa General Belgranossa, saksalaissiirtolaisten perustamassa vuoristokylässä, vietetään joka lokakuu Argentiinan kansallisia olutjuhlia.',
    },
    'Corrientes': {
      lyhyt: 'Iberán kosteikoille on vuodesta 2021 palautettu jaguaareja, jotka olivat kadonneet maakunnasta yli puoli vuosisataa aiemmin.',
    },
    'Entre Ríos': {
      lyhyt: 'Gualeguaychún karnevaali, Argentiinan suurin, täyttää kaupungin sambakulkueen katsomot joka tammi- ja helmikuun viikonloppuna.',
    },
    'Formosa': {
      lyhyt: 'Bañado La Estrellan tulvakosteikossa vedestä nousee kuolleita puita, joiden rungot köynnökset ovat peittäneet vihreiksi pylväiksi.',
    },
    'Jujuy': {
      lyhyt: 'Salinas Grandesin suola-aavikolla yli 3 400 metrin korkeudessa suolaa lohkotaan yhä käsin, ja keskeltä kulkee maantie.',
    },
    'La Pampa': {
      lyhyt: 'Parque Luron vanhalla metsästystilalla voi maalis–huhtikuussa kuunnella Euroopasta tuotujen saksanhirvien kiima-ääntelyä.',
    },
    'La Rioja': {
      lyhyt: 'Chilecitosta nousee La Mejicanan kaivokselle noin 35 kilometrin köysirata, joka valmistui 1905 ja on nyt kansallinen muistomerkki.',
    },
    'Mendoza': {
      lyhyt: 'Mendoza tuottaa suurimman osan Argentiinan viineistä, ja sen tunnetuin rypäle on malbec.',
    },
    'Misiones': {
      lyhyt: 'Iguazún putouksilla joki syöksyy U:n muotoiseen Garganta del Diablon kurkkuun, ja vesisumu nousee korkealle sademetsän ylle.',
    },
    'Neuquén': {
      lyhyt: 'Villa El Chocónin museossa on esillä Giganotosaurus, yksi suurimmista tunnetuista lihansyöjädinosauruksista, joka löytyi läheltä.',
    },
    'Río Negro': {
      lyhyt: 'San Carlos de Bariloche Nahuel Huapi -järven rannalla tunnetaan suklaapuodeistaan ja alppityylisistä kivi- ja puutaloistaan.',
    },
    'Salta': {
      lyhyt: 'Cafayaten laakson viinitarhoilla viljellään torrontésia, Argentiinan omaa tuoksuvaa valkoista rypälettä.',
    },
    'San Juan': {
      lyhyt: 'Vallecitossa on Difunta Correan pyhäkkö, jonne rekkakuskit ja pyhiinvaeltajat jättävät vesipulloja janoon kuolleen äidin muistoksi.',
    },
    'San Luis': {
      lyhyt: 'Sierra de las Quijadasin kansallispuiston punaisista rotkoista on kaivettu esiin Pterodaustron, suodatinhampaisen lentoliskon, fossiileja.',
    },
    'Santa Cruz': {
      lyhyt: 'El Chaltén on Argentiinan vaellusten pääkaupunki, ja sen yllä kohoaa Fitz Royn jyrkkä graniittihuippu.',
    },
    'Santa Fe': {
      lyhyt: 'Rosariossa Paraná-joen rannalla seisoo lipun kansallismonumentti, koska Manuel Belgrano nosti Argentiinan lipun täällä ensi kertaa 1812.',
    },
    'Santiago del Estero': {
      lyhyt: 'Santiago del Estero perustettiin 1553, ja maan vanhimpana yhä asuttuna kaupunkina sitä kutsutaan kaupunkien äidiksi.',
    },
    'Tierra del Fuego': {
      lyhyt: 'Río Granden kaupungin nimikkojoki houkuttelee perhokalastajia ympäri maailmaa, sillä siihen nousee poikkeuksellisen suuria meritaimenia.',
    },
    'Tucumán': {
      lyhyt: 'San Miguel de Tucumánin Casa Históricassa julistettiin Argentiinan itsenäisyys 9. heinäkuuta 1816, ja talo on nyt museo.',
    },
  },
  /*
   * COL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.COL:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * 32 departementtia, pääkaupunkipiiri "Bogota" (ilman aksenttia) ja
   * "COL+99?" = Natural Earthin nimetön pikkusaari 3,98° N 81,60° W =
   * Malpelon saari (julisteet/pallo/maakunnat/2026-09-25a/COL.json).
   * Vain `lyhyt`. Vältetty maastokohteet-col.js:n aiheet (Pico Cristóbal
   * Colón, Caño Cristales, Ciudad Perdida, San Agustín, Tierradentro,
   * Cartagena, Mompox, Guatavita, Barranquillan karnevaali,
   * kahvimaisema). Lähteet (en-/es-Wikipedia ja hakutarkistus
   * 25.9.2026), epävarmimmat erikseen:
   *   Atlántico      — Statue of Shakira (6,5 m, Gran Malecón, 2023)
   *   Sucre          — Balsam of Tolu (nimi Santiago de Tolún mukaan);
   *                    Santa Cruz del Islote hylätty, se kuuluu Bolívariin
   *   Tolima         — Conservatorio del Tolima (1906), "capital musical"
   *   Vichada        — Maipures (Humboldtin "maailman kahdeksas ihme";
   *                    colombia.travel, The City Paper Bogotá)
   *   Guaviare       — Nukak (Calamar, huhtikuu 1988; Survival)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  COL: {
    'Amazonas': {
      lyhyt: 'Leticia on kasvanut kiinni brasilialaiseen Tabatingaan niin, että kaupungista toiseen kävellään ilman rajatarkastusta.',
    },
    'Antioquia': {
      lyhyt: 'Medellínissä köysiradat on liitetty metroon, ja ne kuljettavat asukkaita jyrkkien rinnekaupunginosien ja keskustan väliä.',
    },
    'Arauca': {
      lyhyt: 'Arauca on Llanos-tasankojen karjamaata, ja sen Caño Limónin öljykentältä kulkee putki Karibian rannikolle asti.',
    },
    'Atlántico': {
      lyhyt: 'Barranquillassa syntyi laulaja Shakira, ja Magdalena-joen rantabulevardilla tanssii hänen kuusimetrinen pronssipatsaansa.',
    },
    'Bogota': {
      lyhyt: 'Bogotássa suljetaan joka sunnuntai yli sata kilometriä katuja autoilta, kun Ciclovía täyttyy pyöräilijöistä ja juoksijoista.',
    },
    'Bolívar': {
      lyhyt: 'San Basilio de Palenquessa, karanneiden orjien perustamassa kylässä, puhutaan yhä espanjaan ja afrikkalaisiin kieliin pohjaavaa palenqueroa.',
    },
    'Boyacá': {
      lyhyt: 'Villa de Leyvan mukulakivitori on yksi Amerikan suurimmista, ja valkoiset siirtomaa-ajan talot reunustavat sitä joka puolelta.',
    },
    'Caldas': {
      lyhyt: 'Manizalesin kaakkoispuolella kohoaa Nevado del Ruiz, yksi Kolumbian aktiivisimmista tulivuorista.',
    },
    'Caquetá': {
      lyhyt: 'Chiribiqueten kansallispuiston pöytävuorten seinämissä on kymmeniätuhansia muinaisia kalliomaalauksia, ja puisto on Unescon maailmanperintöä.',
    },
    'Casanare': {
      lyhyt: 'Casanaren tasangoilla karjaa ajetaan yhä hevosella, ja llanero-paimenten työlaulut ovat Unescon suojeltavaa perintöä.',
    },
    'Cauca': {
      lyhyt: 'Popayánin valkoisen vanhankaupungin pääsiäisviikon kulkueet ovat Unescon aineetonta kulttuuriperintöä.',
    },
    'Cesar': {
      lyhyt: 'Valleduparissa pidetään joka huhtikuu vallenato-festivaali, jossa valitaan harmonikkamusiikin kuningas.',
    },
    'Chocó': {
      lyhyt: 'Nuquín ja Bahía Solanon edustalle saapuu heinä–lokakuussa ryhävalaita synnyttämään poikasensa lämpimään veteen.',
    },
    'COL+99?': {
      lyhyt: 'Malpelon kalliosaarella noin 500 km rannikolta asuu vain pieni sotilasvartiosto, mutta sen vesissä parveilee satoja vasarahaita.',
    },
    'Córdoba': {
      lyhyt: 'Tuchínissa punotaan zenú-kansan sombrero vueltiaota, olkihattua josta on tullut Kolumbian kansallinen symboli.',
    },
    'Cundinamarca': {
      lyhyt: 'Zipaquirán suolakaivokseen on kaiverrettu maanalainen katedraali, jonka ristit ja pylväät on hakattu vuorisuolaan.',
    },
    'Guainía': {
      lyhyt: 'Inírida-joen varrelta kohoavat Mavecuren graniittikalliot, jotka nousevat jyrkkinä suoraan sademetsästä.',
    },
    'La Guajira': {
      lyhyt: 'Punta Gallinas on Etelä-Amerikan mantereen pohjoisin kärki, ja sinne pääsee vain maastoautolla tai veneellä.',
    },
    'Guaviare': {
      lyhyt: 'Guaviaren metsissä elävät nukakit, paimentolaiskansa, joka tuli kosketuksiin ulkomaailman kanssa vasta 1988 Calamarin kylässä.',
    },
    'Huila': {
      lyhyt: 'Tatacoan autiomaa on punaisiksi ja harmaiksi uurtunutta kuivaa maata keskellä vehreää Kolumbiaa, ja sen öinä tähtiä katsellaan observatoriosta.',
    },
    'Magdalena': {
      lyhyt: 'Aracatacassa syntyi Gabriel García Márquez, ja pikkukaupunki innoitti hänen kuvitteellista Macondoaan.',
    },
    'Meta': {
      lyhyt: 'Villavicencio on Llanos-tasankojen portti, ja sen kansainvälisessä turnauksessa tanssitaan joropoa harpun ja cuatron tahdissa.',
    },
    'Nariño': {
      lyhyt: 'Las Lajasin basilika on rakennettu sillaksi Guáitara-joen rotkon ylle Ipialesin lähellä.',
    },
    'Norte de Santander': {
      lyhyt: 'Cúcutan Simón Bolívarin kansainvälinen silta on yksi Kolumbian ja Venezuelan vilkkaimmista rajanylityspaikoista.',
    },
    'Putumayo': {
      lyhyt: 'Sibundoyn laaksossa kamëntšá- ja inga-kansat viettävät ennen paastoa Bëtscnatéa, anteeksiannon ja ystävyyden juhlaa.',
    },
    'Quindío': {
      lyhyt: 'Salenton lähellä Cocoran laaksossa kasvaa vahapalmuja, maailman korkeimpia palmuja ja Kolumbian kansallispuu.',
    },
    'Risaralda': {
      lyhyt: 'Pereiran pääaukiolla ratsastaa alaston Simón Bolívar, Rodrigo Arenas Betancourtin pronssiveistos.',
    },
    'San Andrés y Providencia': {
      lyhyt: 'San Andrésin saarella puhutaan espanjan rinnalla englantipohjaista kreolia, ja ympäröivä meri hohtaa monina sinisen sävyinä.',
    },
    'Santander': {
      lyhyt: 'Santanderissa herkutellaan paahdetuilla hormigas culonas -muurahaisilla, joiden kuningattaret kerätään sadekauden alussa keväällä.',
    },
    'Sucre': {
      lyhyt: 'Santiago de Tolún rantakaupunki on antanut nimensä tolubalsamille, tuoksuvalle puun pihkalle, jota käytetään yskänlääkkeissä.',
    },
    'Tolima': {
      lyhyt: 'Ibaguéta kutsutaan Kolumbian musiikin pääkaupungiksi, ja sen vuonna 1906 perustettu konservatorio on maan vanhimpia.',
    },
    'Valle del Cauca': {
      lyhyt: 'Calia pidetään salsan maailmanpääkaupunkina, ja joulukuun Feria de Calissa kaupunki tanssii kaduilla.',
    },
    'Vaupés': {
      lyhyt: 'Vaupésin jokikansojen perinteessä puoliso otetaan toisesta kieliryhmästä, joten moni lapsi kasvaa jo kotona monikieliseksi.',
    },
    'Vichada': {
      lyhyt: 'El Tuparron kansallispuistossa ovat Orinocon Maipuresin kosket, joita Alexander von Humboldt kutsui maailman kahdeksanneksi ihmeeksi.',
    },
  },
  /*
   * ECU (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.ECU:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * 24 provinssia, osa ilman aksentteja ("Bolivar", "Los Rios", "Manabi",
   * "Sucumbios"). Vain `lyhyt`. Vältetty maastokohteet-ecu.js:n aiheet
   * (Cotopaxi, Quilotoa, Napo-joki, Ingapirca, Cuenca, Guayaquil,
   * Yasuní, Paholaisen nenä, panamahattu, Valdivian kulttuuri,
   * Otavalo). Lähteet (en-/es-Wikipedia ja hakutarkistus 25.9.2026),
   * epävarmimmat erikseen:
   *   Cañar          — Laguna de Culebrillas (3 800 m, kañarien pyhä
   *                    järvi, Qhapaq Ñan; El Mercurio 2024)
   *   Cotopaxi       — Mama Negra (en-Wikipedia, El Universo)
   *   Manabi         — Manta (IPS 2010: "world capital of tuna")
   *   Napo           — Cavernas de Jumandy (4 km Archidonasta; 1578
   *                    kapina, es-Wikipedia Archidona)
   *   Pastaza        — Sápara (Unesco 2001; puhujia enää muutama)
   *   Zamora Chinchipe — Mirador mine (tuotanto 2019, ECSA/CRCC-Tongguan)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  ECU: {
    'Azuay': {
      lyhyt: 'Cajasin kansallispuiston päramolla on satoja pieniä järviä, ja sieltä virtaavat joet antavat Cuencalle sen juomaveden.',
    },
    'Bolivar': {
      lyhyt: 'Salinas de Guarandan vuoristokylä elää osuuskunnistaan, jotka valmistavat juustoa ja suklaata El Salinerito -nimellä.',
    },
    'Cañar': {
      lyhyt: 'Culebrillasin järvi 3 800 metrissä on kañari-kansan pyhä paikka, ja sen rannalta kulkee inkojen kuninkaantie.',
    },
    'Carchi': {
      lyhyt: 'Tulcánin hautausmaalla sypressit on leikattu eläinten, kasvojen ja rakennusten muotoon, ja puutarhaa hoidetaan kuin taideteosta.',
    },
    'Chimborazo': {
      lyhyt: 'Chimborazon huippu on päiväntasaajan pullistuman takia maapallon pinnan kaukaisin kohta maan keskipisteestä.',
    },
    'Cotopaxi': {
      lyhyt: 'Latacungan Mama Negra -kulkueessa ratsastaa mustiin kasvoihin maalattu naiseksi pukeutunut mies ja pirskottaa katsojiin maitoa.',
    },
    'El Oro': {
      lyhyt: 'Machala kutsuu itseään maailman banaanipääkaupungiksi, ja siellä pidetään joka vuosi maailman banaanimessut.',
    },
    'Esmeraldas': {
      lyhyt: 'Esmeraldasin afroecuadorilaisissa juhlissa soi marimba, jonka musiikki ja laulut ovat Unescon aineetonta kulttuuriperintöä.',
    },
    'Galápagos': {
      lyhyt: 'Saaret ovat saaneet nimensä jättiläiskilpikonnistaan: galápago on vanha espanjan sana kilpikonnalle.',
    },
    'Guayas': {
      lyhyt: 'Guayasin kostealla rannikkotasangolla kasvatetaan Nacional-kaakaota, josta saadaan kukkaistuoksuisena arvostettua Arriba-kaakaota.',
    },
    'Imbabura': {
      lyhyt: 'Cotacachi-tulivuoren juurella olevan Cuicochan kraatterijärven keskellä kohoaa kaksi metsäistä saarta.',
    },
    'Loja': {
      lyhyt: 'Vilcabamban laaksoa mainostetaan yhä satavuotiaiden laaksona, vaikka tutkijat ovat osoittaneet pitkäikäisyystarinat liioitelluiksi.',
    },
    'Los Rios': {
      lyhyt: 'Los Ríos on tasaista jokimaata, jonka tulvatasangoilla viljellään suuri osa Ecuadorin riisistä ja banaaneista.',
    },
    'Manabi': {
      lyhyt: 'Manta kutsuu itseään maailman tonnikalapääkaupungiksi, ja sen satamassa puretaan ja säilötään valtavat saaliit.',
    },
    'Morona Santiago': {
      lyhyt: 'Macasista näkyy Sangay, yksi maailman jatkuvimmin purkautuvista tulivuorista, joka on ollut aktiivinen vuosisatoja.',
    },
    'Napo': {
      lyhyt: 'Archidonan lähellä ovat Jumandín luolat, jotka on nimetty espanjalaisia vastaan 1578 kapinoineen kiikos-päällikön mukaan.',
    },
    'Orellana': {
      lyhyt: 'Puerto Francisco de Orellana, tutummin Coca, kasvoi 1970-luvun öljybuumissa sademetsän reunan kylästä vilkkaaksi kaupungiksi.',
    },
    'Pastaza': {
      lyhyt: 'Pastazan sademetsissä elää sápara-kansa, jonka kieltä osaa enää vain kourallinen vanhuksia; Unesco nosti sen kulttuurin esiin 2001.',
    },
    'Pichincha': {
      lyhyt: 'Quiton pohjoispuolella Mitad del Mundo -muistomerkki merkitsee päiväntasaajaa, vaikka todellinen nollaleveys kulkee parinsadan metrin päästä.',
    },
    'Santa Elena': {
      lyhyt: 'Montañita on surffaajien ja reppumatkaajien rantakylä, jonka aallot houkuttelevat lautailijoita ympäri vuoden.',
    },
    'Santo Domingo de los Tsáchilas': {
      lyhyt: 'Tsáchila-miehet värjäävät hiuksensa achioten punaisella väriaineella ja muotoilevat ne kypärämäiseksi.',
    },
    'Sucumbios': {
      lyhyt: 'Cuyabenon suojelualueen tulvametsän mustavesijärvissä voi nähdä vaaleanpunaisia jokidelfiinejä.',
    },
    'Tungurahua': {
      lyhyt: 'Bañosin yläpuolella Casa del Árbolin puukeinu heilahtaa jyrkänteen yli Tungurahua-tulivuorta kohti.',
    },
    'Zamora Chinchipe': {
      lyhyt: 'Mirador on Ecuadorin ensimmäinen suuren mittakaavan kuparikaivos, kiinalaisomisteinen avolouhos, joka aloitti tuotannon 2019.',
    },
  },
  /*
   * BOL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6A). Avaimet ovat
   * MAAKUNNAT_KAIKKI.BOL:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * yhdeksän departementtia ("El Beni" = Beni). Vain `lyhyt`. Vältetty
   * maastokohteet-bol.js:n aiheet (Sajama, Illimani, Desaguadero,
   * Tiwanaku, Cerro Rico, Sucre, Chiquitosin lähetysasemat, Yungas-tie,
   * Salar de Uyuni, Oruron karnevaali, Samaipata). Lähteet (en-/es-
   * Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   El Beni        — Casarabe culture (lidar, Nature 2022)
   *   Pando          — Brazil nut (Bolivia suurin viejä; Pando ja Beni)
   *   Tarija         — viinitarhat noin 1 850–2 400 m (matkailulähteet)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  BOL: {
    'El Beni': {
      lyhyt: 'Benin tasangoilta on laserkeilauksella löydetty Casarabe-kulttuurin kaupunkeja pengerteineen ja kanavineen sademetsän alta.',
    },
    'Chuquisaca': {
      lyhyt: "Cal Orck'on kalkkikiviseinässä on tuhansia dinosaurusten jalanjälkiä, jotka painuivat aikanaan järven rantaliejuun.",
    },
    'Cochabamba': {
      lyhyt: 'Cochabamban kukkulalla seisova Cristo de la Concordia on korkeampi kuin Rion Kristus, ja sen luo pääsee köysiradalla.',
    },
    'La Paz': {
      lyhyt: 'La Pazin ja El Alton välillä kulkee Mi Teleférico, maailman laajin kaupunkiköysirataverkko, joka on osa arkista joukkoliikennettä.',
    },
    'Oruro': {
      lyhyt: 'Poopó-järvi, aiemmin Bolivian toiseksi suurin, kuivui 2015 lähes kokonaan, ja kalastajakylät jäivät autiolle suolapohjalle.',
    },
    'Pando': {
      lyhyt: 'Pandon sademetsissä kerääjät poimivat paraspähkinöitä maahan pudonneista kovista hedelmistä, ja Bolivia on maailman suurin niiden viejä.',
    },
    'Potosí': {
      lyhyt: 'Laguna Coloradan vesi on levien värjäämää punaista, ja järven matalikoilla pesii harvinaisia jamesinflamingoja.',
    },
    'Santa Cruz': {
      lyhyt: 'Santa Cruzin tasangoilla asuu kymmeniätuhansia mennoniitteja, jotka kulkevat hevoskärryillä ja puhuvat plautdietschiä.',
    },
    'Tarija': {
      lyhyt: 'Tarijan laakson viinitarhat ovat lähes 2 000 metrissä maailman korkeimpien joukossa, ja rypäleistä tislataan myös singani-viinaa.',
    },
  },
  /*
   * PER (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6B). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.PER:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: "Lima" = Liman alue (Natural
   * Earthin PER-591, Department, metropolialueen ulkopuoli), "Lima
   * Province" = Liman metropolialue (PER-587, Captial District). Vain
   * `lyhyt`. Vältetty maastokohteet-per.js:n aiheet (Huascarán,
   * Apurímac-joki, Ballestas/Paracas, Nazcan viivat, Chan Chan, Caral,
   * Kuélap, Sipán, Chavín de Huántar, Arequipan kaupunki, Colcan kanjoni)
   * sekä pelikaupunkien Titicaca (Uros) ja Iquitos ydinaiheet. Lähteet
   * (en-/es-Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Amazonas      — Gocta Cataracts (771 m, retkikunta 2002, julki 2006)
   *   Apurímac      — Sayhuite (Curahuasi, yli 200 hahmoa)
   *   Arequipa      — Toro Muerto (noin 2 600 kaiverrettua lohkaretta, wari)
   *   Callao        — Jorge Chávez International Airport (terminaali 1.6.2025)
   *   Huancavelica  — Huancayo–Huancavelica Railway (128,7 km, 5–7 h)
   *   Junín         — Junin grebe (endeeminen Junínjärvelle, EN)
   *   La Libertad   — Huanchaco (World Surfing Reserve 2012)
   *   Lambayeque    — Túcume (26 pyramidia, "Purgatorio")
   *   Lima Province — Huaca Pucllana (200–700 jaa.)
   *   Loreto        — Pacaya-Samiria (SERNANP; 80 % tulvii sadekaudella)
   *   Madre de Dios — Tambopata National Reserve (Chunchon savitörmä)
   *   Moquegua      — Cerro Baúl (noin 2 000 jalkaa ympäristön yläpuolella)
   *   Pasco         — Cerro de Pasco (4 330 m)
   *   Puno          — Candelaria (Unesco 2014, yli 40 000 tanssijaa)
   *   Tacna         — Tacna (tullivapaa vyöhyke, ostajat Aricasta/Iquiquesta)
   *   Ucayali       — kené (Patrimonio Cultural de la Nación, huhtikuu 2008)
   *   Muut          — yleistietoa, tarkistettu vastaavista
   *                   en-Wikipedia-artikkeleista.
   */
  PER: {
    Amazonas: {
      lyhyt: 'Goctan vesiputous syöksyy Bongarán vuorilta kahtena pudotuksena yhteensä 771 metriä, ja laajempi maailma kuuli siitä vasta 2000-luvulla.',
    },
    'Áncash': {
      lyhyt: 'Huarazista kävellään päivässä Laguna 69:lle, turkoosille vuoristojärvelle noin 4 600 metrin korkeudessa, jota Chacrarajun sulamisvesi ruokkii.',
    },
    'Apurímac': {
      lyhyt: 'Curahuasin lähellä Saywitessa on inkojen veistämä lohkare, jonka pintaan on kaiverrettu yli 200 hahmoa, pengerryksiä ja vesikanavia.',
    },
    Arequipa: {
      lyhyt: 'Majesjoen laakson laidalla Toro Muertossa on tuhansia vulkaanisia lohkareita, joihin hakattiin kalliopiirroksia yli tuhat vuotta sitten.',
    },
    Ayacucho: {
      lyhyt: 'Ayacuchon käsityöläiset rakentavat retabloja, puisia lippaita, joiden ovien takana kokonainen kyläjuhla on kuvattu pienin maalatuin hahmoin.',
    },
    Cajamarca: {
      lyhyt: 'Cajamarcan laaksossa Baños del Incan kuumiin lähteisiin tullaan kylpemään, ja höyryävät altaat ovat aivan kaupungin kupeessa.',
    },
    Callao: {
      lyhyt: 'Perun vilkkain lentoasema Jorge Chávez on Callaossa, ja sen uusi matkustajaterminaali avattiin kesäkuussa 2025.',
    },
    Cusco: {
      lyhyt: 'Joka kesäkuun 24. päivä Sacsayhuamánin muurien edustalla esitetään Inti Raymi, inkojen auringonjuhla, tuhansien katsojien edessä.',
    },
    Huancavelica: {
      lyhyt: 'Huancayosta Huancavelicaan ajaa Tren Macho -juna, jonka 129 kilometrin matka vuoristolaaksoissa kestää viidestä seitsemään tuntia.',
    },
    'Huánuco': {
      lyhyt: 'Tingo Maríasta näkyy Bella Durmiente, vuorijono, jonka ääriviiva muistuttaa selällään nukkuvaa naista.',
    },
    Ica: {
      lyhyt: 'Ican kaupungin laidalla Huacachinan keidas on pieni laguuni korkeiden hiekkadyynien keskellä, ja dyyneillä ajetaan hiekkavaunuilla.',
    },
    'Junín': {
      lyhyt: 'Junínjärvellä elää lentokyvytön junínuikku, uhanalainen lintu, jota ei tavata missään muualla maailmassa.',
    },
    'La Libertad': {
      lyhyt: 'Huanchacon kalastajat meloivat yhä caballitos de totora -ruokoveneillään aaltojen yli, ja kylä on ollut surffausreservaatti vuodesta 2012.',
    },
    Lambayeque: {
      lyhyt: 'Túcumen tasangolla kohoaa 26 suurta savitiilipyramidia ja kumparetta, ja paikalliset kutsuvat aluetta nimellä Purgatorio.',
    },
    Lima: {
      lyhyt: 'Cañetejoen laaksossa Lunahuanássa lasketaan koskia kumiveneillä, ja rinteillä viljellään viinirypäleitä piscoa varten.',
    },
    'Lima Province': {
      lyhyt: 'Miraflorisin kerrostalojen keskellä kohoaa Huaca Pucllana, limakulttuurin savitiilipyramidi noin vuosilta 200–700.',
    },
    Loreto: {
      lyhyt: 'Pacaya-Samirian suojelualueella metsä on sadekaudella suurimmaksi osaksi veden alla, ja sen joissa uivat vaaleanpunaiset jokidelfiinit.',
    },
    'Madre de Dios': {
      lyhyt: 'Tambopatan suojelualueen Chunchon savitörmälle kokoontuu aamuisin arapapukaijojen parvia syömään kivennäispitoista savea.',
    },
    Moquegua: {
      lyhyt: 'Moqueguan laaksossa kohoaa pöytävuori Cerro Baúl, jonka laelle wari-kulttuuri rakensi asutuksen noin 600 metriä ympäristöään korkeammalle.',
    },
    Pasco: {
      lyhyt: 'Cerro de Pasco on noin 4 330 metrin korkeudessa yksi maailman korkeimmista kaupungeista, ja se elää kaivoksistaan.',
    },
    Piura: {
      lyhyt: 'Máncoran kalastajakylästä on tullut Perun pohjoisrannikon surffikohde, jonka lämpimillä rannoilla surffataan ympäri vuoden.',
    },
    Puno: {
      lyhyt: 'Punon Candelarian juhlassa helmikuussa tanssii yli 40 000 puvustettua tanssijaa, ja juhla on Unescon aineetonta kulttuuriperintöä.',
    },
    'San Martín': {
      lyhyt: 'Moyobambaa kutsutaan orkideoiden kaupungiksi, sillä sen ympäristön kosteissa vuoristometsissä kasvaa lukuisia orkidealajeja.',
    },
    Tacna: {
      lyhyt: 'Tacna on tullivapaa kauppakaupunki, jonne tullaan rajan yli ostoksille Chilen Aricasta ja Iquiquesta.',
    },
    Tumbes: {
      lyhyt: 'Tumbesin rannikolla on Perun laajin mangrovemetsä, ja sen kanavissa pyydetään mustia simpukoita, conchas negras.',
    },
    Ucayali: {
      lyhyt: 'Ucayalin shipibo-konibo-naiset kirjovat ja maalaavat kankaisiin kené-kuvioita, jotka Peru julisti kansalliseksi kulttuuriperinnöksi 2008.',
    },
  },
  /*
   * VEN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.VEN:n tunnuksia TÄSMÄLLEEN: "Vargas" = La Guairan
   * osavaltio (nimi vaihtui 2019), "VEN+99?" = Natural Earthin nimetön
   * saari (iso_3166_2 VE-X01~, 15,7° N 63,6° W) = Isla de Aves;
   * "Dependencias Federales" kattaa muut liittovaltion saaret. Vain
   * `lyhyt`, neutraali sävy (ei politiikkaa). Vältetty
   * maastokohteet-ven.js:n aiheet (Roraima, Maracaibojärvi ja Catatumbo,
   * Los Roques, Salto Ángel, Coro, Ciudad Bolívar, Guácharon luola,
   * Méridan köysirata, Colonia Tovar, Morrocoy, Ciudad Guayana). Lähteet
   * (en-/es-Wikipedia ja hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Amazonas       — Casiquiare canal (bifurkaatio Orinoco–Rio Negro)
   *   Anzoátegui     — Mochima National Park (32 saarta, Chimana Grande)
   *   Aragua         — Henri Pittier National Park (13.2.1937, vanhin)
   *   Barinas        — Barinas (state): "capital of the rivers"
   *   Bolívar        — Unesco ICH: Carnival of El Callao (2016)
   *   Carabobo       — Puerto Cabello (maan suurin satama)
   *   Cojedes        — Unesco ICH: Venezuela's Dancing Devils (2012,
   *                    Tinaquillo yksi 11 veljeskunnasta)
   *   Dependencias   — La Tortuga Island (156,6 km², asumaton)
   *   Falcón         — Paraguaná Refinery Complex (läntisen pallonpuoliskon
   *                    suurin)
   *   Lara           — Divina Pastora (14.1., Santa Rosa–Barquisimeto)
   *   Mérida         — Humboldtin jäätikkö jääkentäksi 5/2024 (BBC, UPI)
   *   Portuguesa     — Basílica Santuario Nacional de Coromoto (1996)
   *   Distrito Cap.  — Ciudad Universitaria de Caracas (Unesco 2000)
   *   Trujillo       — Monumento a la Virgen de la Paz (46,72 m)
   *   VEN+99?        — Isla de Aves (375 m, tukikohta paaluilla 1978)
   *   Yaracuy        — Cerro María Lionza (Sorte), 12.10.
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  VEN: {
    Amazonas: {
      lyhyt: 'Casiquiare-joki haarautuu Orinocosta ja virtaa Rio Negroon, joten se yhdistää luonnostaan Orinocon ja Amazonin vesistöt.',
    },
    'Anzoátegui': {
      lyhyt: 'Puerto La Cruzin edustalta alkaa Mochiman kansallispuisto, jonka 32 saaresta suurin on Chimana Grande.',
    },
    Apure: {
      lyhyt: 'Apuren tulvasavanneilla laiduntavat kapybarat, maailman suurimmat jyrsijät, joita venezuelalaiset kutsuvat chigüireiksi.',
    },
    Aragua: {
      lyhyt: 'Henri Pittierin kansallispuisto on Venezuelan vanhin, perustettu 1937, ja sen Portachuelon solan kautta muuttaa kymmeniä lintulajeja.',
    },
    Barinas: {
      lyhyt: 'Barinasia kutsutaan Venezuelan jokien pääkaupungiksi, sillä Andeilta laskevat joet halkovat osavaltion tasankoja.',
    },
    'Bolívar': {
      lyhyt: 'El Callaon kaivoskaupungin karnevaalissa soi calypso, ja juhla merkittiin Unescon aineettoman kulttuuriperinnön luetteloon 2016.',
    },
    Carabobo: {
      lyhyt: 'Puerto Cabello on Venezuelan suurin ja vilkkain satama Karibianmeren rannalla.',
    },
    Cojedes: {
      lyhyt: 'Tinaquillon naamioidut paholaiset tanssivat Corpus Christinä, ja perinne kuuluu Unescon 2012 tunnustamaan Venezuelan paholaistanssiin.',
    },
    'Delta Amacuro': {
      lyhyt: 'Orinocon suistossa asuvat warao-intiaanit, "kanoottien kansa", jotka liikkuvat suiston lukemattomissa haaroissa kanooteilla.',
    },
    'Dependencias Federales': {
      lyhyt: 'La Tortuga on liittovaltion saarista suurin, noin 157 neliökilometriä, mutta asumaton: sen rannoilla käyvät vain kalastajat ja veneilijät.',
    },
    'Falcón': {
      lyhyt: 'Paraguanán niemimaalla ovat Amuayn ja Cardónin öljynjalostamot, osa läntisen pallonpuoliskon suurinta jalostamokompleksia.',
    },
    'Guárico': {
      lyhyt: 'San Juan de los Morrosin yllä kohoavat jyrkät Los Morros -kalliot, ja kaupungissa on rikkipitoisia kuumia lähteitä.',
    },
    Vargas: {
      lyhyt: 'Venezuelan päälentoasema on Maiquetíassa La Guairan rannikolla, noin 20 kilometrin päässä Caracasista vuorten takana.',
    },
    Lara: {
      lyhyt: 'Joka tammikuun 14. päivä Divina Pastoran kuvaa kannetaan Santa Rosasta Barquisimetoon kulkueessa, joka on Venezuelan suurin.',
    },
    'Mérida': {
      lyhyt: 'Pico Humboldtin viimeinen jäätikkö kutistui 2024 jääkentäksi, ja Venezuelasta tuli ensimmäinen maa nykyaikana, joka on menettänyt jäätikkönsä.',
    },
    Miranda: {
      lyhyt: 'Barloventon rannikkoseudulla kasvatetaan kaakaota, ja kesäkuun San Juan -juhlissa soivat afrovenezuelalaiset rummut.',
    },
    Monagas: {
      lyhyt: 'Monagasin Morichal Largo -joen rantoja reunustavat tiheät morichepalmujen galleriametsät.',
    },
    'Nueva Esparta': {
      lyhyt: 'Margaritan saaren La Restingan laguunissa ajetaan pienillä moottoriveneillä mangrovekanavien läpi hiekkasärkän rannalle.',
    },
    Portuguesa: {
      lyhyt: 'Guanaren lähellä on Coromoton kansallinen pyhäkkö, Venezuelan suojeluspyhimyksen basilika, jonka avajaismessua johti paavi 1996.',
    },
    'Distrito Capital': {
      lyhyt: 'Caracasin yliopistokaupunki on Unescon maailmanperintökohde, ja sen Aula Magnan katossa leijuvat Alexander Calderin akustiset pilvet.',
    },
    Sucre: {
      lyhyt: 'Arayan niemimaalla suolaa kerätään yhä laguuneista, ja rannalla seisovat 1600-luvulla rakennetun Santiagon linnoituksen rauniot.',
    },
    'Táchira': {
      lyhyt: 'San Cristóbalissa vietetään tammikuussa San Sebastiánin messuja, joiden ohjelmassa on maatalousnäyttelyitä ja konsertteja.',
    },
    Trujillo: {
      lyhyt: 'Trujillon lähellä vuorella seisoo 46,7-metrinen Virgen de la Paz -patsas, jonka silmien korkeudelta avautuu näköala laaksoon.',
    },
    'VEN+99?': {
      lyhyt: 'Isla de Aves on vain noin 375 metriä pitkä hiekkasärkkä Karibianmerellä, ja sen kupeeseen on rakennettu paaluille venezuelalainen tukikohta.',
    },
    Yaracuy: {
      lyhyt: 'Chivacoan lähellä Sorten vuorella kokoontuvat María Lionzan palvojat, ja lokakuun 12. päivänä vuori täyttyy alttareista ja kynttilöistä.',
    },
    Zulia: {
      lyhyt: 'Zulian gaita on joulun ajan kansanmusiikkia, jossa soivat furro-rumpu, cuatro-kitara ja maracas.',
    },
  },
  /*
   * URY (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.URY:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti.
   * Vain `lyhyt`. Vältetty maastokohteet-ury.js:n aiheet (Cerro Catedral,
   * Merínin laguuni, Colonia del Sacramento, Punta del Este, Cabo
   * Polonio, Salto Granden pato, Santa Teresan linnoitus, Quebrada de los
   * Cuervos, Tacuarembón kaupunki ja Patria Gaucha, Riveran
   * kaksoiskaupunki). Lähteet (en-/es-Wikipedia ja hakutarkistus
   * 25.9.2026), epävarmimmat erikseen:
   *   Artigas        — Los Catalanes (IUGS:n 100 geologista kohdetta 2023)
   *   Canelones      — noin 60 % Uruguayn viinistä (Wine-Searcher, Guru'Guay)
   *   Cerro Largo    — Puente Barón de Mauá (1930)
   *   Durazno        — Festival Nacional de Folklore (tammikuu)
   *   Flores         — Grutas del Palacio (Unesco-geopuisto 2013)
   *   Paysandú       — Semana de la Cerveza (vuodesta 1966)
   *   Río Negro      — Fray Bentos Industrial Landscape (Unesco 2015)
   *   Rocha          — Monte de Ombúes (noin 3 000 puuta)
   *   Salto          — Termas del Daymán (2 000 m, 46 °C)
   *   San José       — Teatro Macció (5.6.1912)
   *   Soriano        — Villa Soriano (1624, vuosiluku kiistelty -> "1600-luku")
   *   Tacuarembó     — Museo Carlos Gardel (Valle Edén)
   *   Treinta y Tres — lähes neljännes Uruguayn riisistä (es-Wikipedia)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  URY: {
    Artigas: {
      lyhyt: 'Artigasin Los Catalanesin ametistiesiintymä tunnetaan jättigeodeistaan, joita louhitaan avolouhoksista ja hiotaan pienissä pajoissa.',
    },
    Canelones: {
      lyhyt: 'Canelonesissa tuotetaan noin 60 prosenttia Uruguayn viinistä, ja sen viinitiloille on Montevideosta vain lyhyt ajomatka.',
    },
    'Cerro Largo': {
      lyhyt: 'Río Brancon ja brasilialaisen Jaguarãon välillä kulkee vuonna 1930 avattu Mauán silta, jonka kaaret ylittävät Yaguarón-joen.',
    },
    Colonia: {
      lyhyt: 'Nueva Helvecian perustivat sveitsiläiset siirtolaiset 1862, ja seutu on yhä yksi Uruguayn tärkeimmistä juustoalueista.',
    },
    Durazno: {
      lyhyt: 'Duraznossa pidetään joka tammikuu Yí-joen rannalla kansallinen folkloremusiikin festivaali, yksi Uruguayn suurimmista.',
    },
    Flores: {
      lyhyt: 'Grutas del Palacion luolien kattoa kannattelevat luonnon muovaamat pylväät, ja alue on Uruguayn ensimmäinen Unescon geopuisto.',
    },
    Florida: {
      lyhyt: 'Floridan kaupungin laidalla on Piedra Alta, jonka luona julistettiin 25. elokuuta 1825 irtautuminen Brasilian keisarikunnasta.',
    },
    Lavalleja: {
      lyhyt: 'Minasin lähteistä pullotetaan Salus-kivennäisvettä, ja merkin tunnuksena on legendan puuma, joka joi lähteestä.',
    },
    Maldonado: {
      lyhyt: 'Punta Ballenan kallioilla seisoo Carlos Páez Vilarón valkoinen Casapueblo, jossa auringonlaskua saattelee joka ilta taiteilijan runo.',
    },
    Montevideo: {
      lyhyt: 'Montevideon karnevaali kestää yli 40 päivää, ja sen murga-kuorot ja candombe-rummut soivat tammikuusta maaliskuuhun.',
    },
    'Paysandú': {
      lyhyt: 'Paysandússa vietetään pääsiäisviikolla Semana de la Cervezaa, olutjuhlaa, jota on järjestetty Uruguayjoen rannalla vuodesta 1966.',
    },
    'Río Negro': {
      lyhyt: 'Fray Bentosin entinen lihatehdas, josta lähti lihauutetta ja säilykelihaa Eurooppaan, on Unescon maailmanperintökohde.',
    },
    Rivera: {
      lyhyt: 'Valle del Lunarejon suojellussa laaksossa basalttirinteet, rotkot ja vesiputoukset rikkovat Pohjois-Uruguayn loivan ruohotasangon.',
    },
    Rocha: {
      lyhyt: 'Castillosin laguunin rannalla kasvaa noin 3 000 ombú-puun metsä, jonne mennään veneellä Valizas-puroa pitkin.',
    },
    Salto: {
      lyhyt: 'Daymánin kylpylässä Salton lähellä kuuma vesi kumpuaa Guaraní-akviferista kahden kilometrin syvyydestä.',
    },
    'San José': {
      lyhyt: 'San José de Mayon Teatro Macció avattiin 1912, ja se on kaupungin arkkitehtonisesti merkittävin rakennus.',
    },
    Soriano: {
      lyhyt: 'Villa Soriano Río Negron suulla on Uruguayn vanhin taajama, jonka fransiskaanit perustivat intiaanireduktioksi 1600-luvulla.',
    },
    'Tacuarembó': {
      lyhyt: 'Valle Edénin vanhassa kauppapuodissa on museo, joka esittelee todisteita siitä, että tangolaulaja Carlos Gardel syntyi Tacuarembóssa.',
    },
    'Treinta y Tres': {
      lyhyt: 'Treinta y Tresissa viljellään lähes neljännes Uruguayn riisistä, ja pellot saavat vetensä Olimar-joen valuma-alueelta.',
    },
  },
  /*
   * PRY (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.PRY:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti.
   * Vain `lyhyt`. Vältetty maastokohteet-pry.js:n aiheet (Cerro Tres
   * Kandú, Apa, Tebicuary, Trinidad ja Jesús, San Cosme y Damián, Cerro
   * Corá, Ybycuí, Filadelfia, Yaguarón, Concepciónin kaupunki, Guairán
   * putoukset). Lähteet (en-/es-Wikipedia, visitparaguay.travel ja
   * hakutarkistus 25.9.2026), epävarmimmat erikseen:
   *   Alto Paraná      — Saltos del Monday (40–45 m)
   *   Amambay          — Ojo de Mar (Bella Vista Norte, ABC Color 2025)
   *   Asunción         — Loma San Jerónimo (matkailukaupunginosa 2013)
   *   Boquerón         — Museo Histórico del Fortín Boquerón
   *   Caaguazú         — "Capital de la Madera"
   *   Caazapá          — Parque Nacional Caazapá (16 000 ha)
   *   Canindeyú        — Mbaracayú (64 406 ha, laki 112/91)
   *   Central          — ñandutí (Itauguá)
   *   Concepción       — arroyo Tagatiyá (San Alfredo)
   *   Cordillera       — Caacupé (yli 1,5 milj. pyhiinvaeltajaa)
   *   Guairá           — Colonia Independencia (1919, viinit)
   *   Itapúa           — Encarnación (sambadromi 2012)
   *   Misiones         — Yacyretá (pato noin 65 km)
   *   Ñeembucú         — ruinas de Humaitá (San Carlos Borromeo)
   *   Paraguarí        — Museo Histórico del Ferrocarril de Sapucai (1894)
   *   Presidente Hayes — Laudo Hayes (12.11.1878)
   *   San Pedro        — seesami (ABC Color 2026), pinta-ala 20 002 km²
   *   Muut             — yleistietoa, tarkistettu vastaavista
   *                      en-Wikipedia-artikkeleista.
   */
  PRY: {
    'Alto Paraguay': {
      lyhyt: 'Bahía Negra on Paraguayn pohjoisin satama, ja sen ympärillä levittäytyy Paraguayn osuus Pantanalin kosteikosta.',
    },
    'Alto Paraná': {
      lyhyt: 'Mondayjoki syöksyy Ciudad del Esten lähellä noin 40 metriä alas Saltos del Mondayn putouksina juuri ennen Paranájokea.',
    },
    Amambay: {
      lyhyt: 'Bella Vista Norten maaseudulla on Ojo de Mar, smaragdinvihreä kalkkikivijärvi, jonka syvyyttä ei tiedetä.',
    },
    'Asunción': {
      lyhyt: 'Loma San Jerónimo julistettiin 2013 Asunciónin ensimmäiseksi matkailukaupunginosaksi, ja sen mosaiikkiportaat nousevat näköalapaikalle.',
    },
    'Boquerón': {
      lyhyt: 'Fortín Boquerónissa voi kulkea Chacon sodan 1932 taistelun juoksuhaudoissa, ja paikalla on museo ja molempien armeijoiden hautausmaat.',
    },
    'Caaguazú': {
      lyhyt: 'Caaguazúta kutsutaan puun pääkaupungiksi, sillä sen lukuisissa puusepänverstaissa tehdään huonekaluja ja puukäsitöitä.',
    },
    'Caazapá': {
      lyhyt: 'Caazapán kansallispuisto suojelee noin 16 000 hehtaaria subtrooppista metsää, ja sen poluilla tarkkaillaan lintuja.',
    },
    'Canindeyú': {
      lyhyt: 'Mbaracayún metsäsuojelualue suojelee 64 000 hehtaaria Atlantin sademetsää, ja se oli 1991 Paraguayn ensimmäinen yksityinen suojelualue.',
    },
    Central: {
      lyhyt: 'Itauguán naiset ompelevat ñandutí-pitsiä, jonka ympyräkuviot muistuttavat hämähäkinseittiä – nimikin tarkoittaa guaraniksi seittiä.',
    },
    'Concepción': {
      lyhyt: 'Tagatiyá-puron vesi on kalkkikivipohjan ansiosta niin kirkasta, että siinä snorklataan kalaparvien seassa.',
    },
    Cordillera: {
      lyhyt: 'Caacupén basilikaan vaeltaa joulukuun 7. ja 8. päivänä yli miljoona pyhiinvaeltajaa Paraguayn suojeluspyhimyksen juhlaan.',
    },
    'Guairá': {
      lyhyt: 'Colonia Independencian perustivat saksalaiset siirtolaiset 1919, ja kylä tunnetaan yhä pientuottajien viineistään.',
    },
    'Itapúa': {
      lyhyt: 'Encarnaciónia kutsutaan Paraguayn karnevaalipääkaupungiksi, ja kulkueita varten sen rantakadun varteen valmistui oma sambadromi 2012.',
    },
    Misiones: {
      lyhyt: 'Ayolasin kohdalla Paranájoen patoaa Yacyretán vesivoimala, jonka maapato on yli 60 kilometriä pitkä.',
    },
    'Ñeembucú': {
      lyhyt: 'Humaitássa seisoo tykkitulessa tuhoutuneen San Carlos Borromeon kirkon tornin jäänne, Kolmoisliiton sodan muistomerkki.',
    },
    'Paraguarí': {
      lyhyt: 'Sapucain vanhoissa rautatiekorjaamoissa, jotka englantilaiset rakensivat 1894, on nyt museo höyrykäyttöisine koneineen.',
    },
    'Presidente Hayes': {
      lyhyt: 'Presidente Hayes on nimetty Yhdysvaltain presidentin mukaan, jonka välitystuomio 1878 antoi alueen Paraguaylle.',
    },
    'San Pedro': {
      lyhyt: 'San Pedro on Itä-Paraguayn laajin departementti, ja sen pienviljelijöille seesami on tärkeä vientikasvi.',
    },
  },
  /*
   * IDN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.IDN:n tunnuksia
   * TÄSMÄLLEEN, kopioitu koneellisesti: 33 provinssia vanhan jaon mukaan
   * (ei Pohjois-Kalimantania eikä vuoden 2022 uusia Papuan provinsseja),
   * joten Papua Barat kattaa myös Raja Ampatin ja Papua Baliemin laakson.
   * Vältetty maastokohteet-idn.js:n aiheet (Borobudur, Prambanan,
   * Trowulan, Sangiran, Sawahlunto, Tana Toraja, Bandasaaret, Besakih,
   * Krakatau, Tobajärvi, Komodo). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026):
   *   Aceh                — PLTD Apung 1 (2004 tsunamin kantama voimalalaiva)
   *   Gorontalo           — Botubaranin valashait (n. 100 m rannasta)
   *   Sulawesi Barat      — Sandeq Race (vuodesta 1995, n. 300 mpk)
   *   Sulawesi Tenggara   — Buton Palace Fortress (muuri 2 740 m)
   *   Sulawesi Selatan    — pinisi, Unescon aineeton perintö 2017
   *   Maluku              — Ambon, Unescon musiikkikaupunki 2019
   *   Muut                — yleistietoa, tarkistettu vastaavista
   *                         en-Wikipedia-artikkeleista.
   */
  IDN: {
    Aceh: {
      lyhyt: 'Banda Acehin asuinkorttelien keskellä seisoo yhä voimalalaiva, jonka vuoden 2004 tsunami kantoi kilometrien päähän rannasta.',
    },
    Bali: {
      lyhyt: 'Balilla vietetään Nyepi-päivää hiljaisuudessa: kadut tyhjenevät, valot sammuvat ja jopa saaren lentoasema suljetaan vuorokaudeksi.',
    },
    'Bangka-Belitung': {
      lyhyt: 'Bangkan ja Belitungin saarilla on louhittu tinaa vuosisatoja, ja hylätyt kaivoskuopat ovat täyttyneet kirkkaanvihreiksi järviksi.',
    },
    Banten: {
      lyhyt: 'Ujung Kulonin kansallispuisto Jaavan länsikärjessä on jaavansarvikuonon viimeinen elinpaikka koko maailmassa.',
    },
    Bengkulu: {
      lyhyt: 'Bengkulun sademetsissä kukkii Rafflesia arnoldii, maailman suurin yksittäinen kukka, jonka läpimitta voi olla lähes metri.',
    },
    Gorontalo: {
      lyhyt: 'Botubaranin kylän edustalla uiskentelee nuoria valashaita vain sadan metrin päässä rannasta, joten niitä pääsee katsomaan snorklaten.',
    },
    'Jakarta Raya': {
      lyhyt: 'Jakartan Merdeka-aukion keskellä kohoaa 132-metrinen Monas-muistomerkki, jonka huippua koristaa kullattu liekki.',
    },
    Jambi: {
      lyhyt: 'Batanghari-joen varrella on Muaro Jambi, yksi Kaakkois-Aasian laajimmista muinaisista buddhalaisista temppelialueista.',
    },
    'Jawa Barat': {
      lyhyt: 'Bandungin Gedung Merdekassa pidettiin vuonna 1955 Aasian ja Afrikan maiden konferenssi, ja rakennus on nyt sen muistomuseo.',
    },
    'Jawa Tengah': {
      lyhyt: 'Semarangin Lawang Sewu, "tuhat ovea", rakennettiin hollantilaisen rautatieyhtiön pääkonttoriksi, ja nyt se on museo.',
    },
    'Jawa Timur': {
      lyhyt: 'Bromon tulivuorelle noustaan ennen aamunkoittoa katsomaan, kun aurinko nousee Tenggerin kalderan hiekkameren yllä.',
    },
    'Kalimantan Barat': {
      lyhyt: 'Pontianak on päiväntasaajalla: kun aurinko on päiväntasauksen aikaan suoraan yllä, päiväntasaajamonumentin varjo katoaa hetkeksi.',
    },
    'Kalimantan Selatan': {
      lyhyt: 'Banjarmasinin lähellä Lok Baintanissa käydään aamuisin kauppaa kelluvalla torilla, jossa myyjät meloskelevat hedelmäveneissään.',
    },
    'Kalimantan Tengah': {
      lyhyt: 'Tanjung Putingin kansallispuistoon matkataan klotok-jokiveneellä katsomaan orankeja, jotka tulevat metsästä ruokintapaikoille.',
    },
    'Kalimantan Timur': {
      lyhyt: 'Itä-Kalimantanin metsien keskelle rakennetaan Nusantaraa, kaupunkia, josta on määrä tulla Indonesian uusi pääkaupunki.',
    },
    'Kepulauan Riau': {
      lyhyt: 'Batamin, Rempangin ja Galangin saaria yhdistää kuuden sillan Barelang-ketju, jonka komein osa on vinoköysisilta.',
    },
    Lampung: {
      lyhyt: 'Way Kambasin kansallispuistossa suojellaan sumatranelefantteja, ja puistossa toimii norsujen hoito- ja suojelukeskus.',
    },
    Maluku: {
      lyhyt: 'Ambon nimettiin vuonna 2019 Unescon musiikkikaupungiksi, ja laulu kuuluu kaupungin kirkoista, kaduilta ja kodeista.',
    },
    'Maluku Utara': {
      lyhyt: 'Ternaten saari on käytännössä yksi tulivuori, Gamalama, ja sen rinteillä kasvaa yhä neilikkapuita.',
    },
    'Nusa Tenggara Barat': {
      lyhyt: 'Lombokin Rinjani kohoaa 3 726 metriin, ja sen kalderassa lepää kuunsirpin muotoinen Segara Anak -järvi.',
    },
    'Nusa Tenggara Timur': {
      lyhyt: 'Floresin Kelimutu-tulivuoren huipulla on kolme kraatterijärveä, joiden värit vaihtelevat turkoosista ruskeaan ja lähes mustaan.',
    },
    Papua: {
      lyhyt: 'Baliemin laakson festivaalissa Wamenan lähellä ylänköjen kansat esittävät joka elokuu perinteisiä taistelunäytöksiä ja tansseja.',
    },
    'Papua Barat': {
      lyhyt: 'Raja Ampatin saarten riutoilla on yksi maailman runsaimmista koralli- ja kalalajistoista, ja kalkkikivisaaret nousevat merestä jyrkkinä.',
    },
    Riau: {
      lyhyt: 'Kampar-joella vyöryy vuoroveden mukana Bono-aalto, joka voi kulkea kilometrikaupalla ylävirtaan ja jolla surffaajat ratsastavat.',
    },
    'Sulawesi Barat': {
      lyhyt: 'Mandarilaiset kalastajat purjehtivat kapeilla sandeq-ulokeveneillä, ja joka vuosi niillä kisataan satojen merimailien kilpapurjehdus.',
    },
    'Sulawesi Selatan': {
      lyhyt: 'Bulukumban rannoilla rakennetaan yhä käsin puisia pinisi-purjealuksia, ja niiden rakennustaito on Unescon aineetonta kulttuuriperintöä.',
    },
    'Sulawesi Tengah': {
      lyhyt: 'Badan laakson niityillä seisoo ikivanhoja kivipatsaita, joiden tekijöistä ja tarkoituksesta ei tiedetä varmasti.',
    },
    'Sulawesi Tenggara': {
      lyhyt: 'Butonin saaren Baubaussa on Wolion linnoitus, jonka kivimuuri kiertää kukkulan laen lähes kolmen kilometrin matkalta.',
    },
    'Sulawesi Utara': {
      lyhyt: 'Manadon edustalla Bunakenin meripuiston riutat putoavat jyrkkinä seinäminä syvyyteen, ja sukeltajat uivat niiden vierellä.',
    },
    'Sumatera Barat': {
      lyhyt: 'Minangkabaujen talojen katot kaartuvat ylös kuin puhvelin sarvet, ja suvun maat periytyvät äidiltä tyttärelle.',
    },
    'Sumatera Selatan': {
      lyhyt: 'Palembangin tunnetuin ruoka on pempek, kalasta ja tapiokasta tehty kakku, joka kastetaan makeanhappamaan cuko-kastikkeeseen.',
    },
    'Sumatera Utara': {
      lyhyt: 'Nias-saaren kylissä nuoret miehet hyppäävät yli kaksimetrisen kivimuurin yli; perinteen nimi on hombo batu.',
    },
    Yogyakarta: {
      lyhyt: 'Yogyakarta on Indonesian erityisalue, jonka kuvernöörinä toimii hallitseva sulttaani, ja kraton-palatsi on yhä hänen kotinsa.',
    },
  },
  /*
   * PAK (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.PAK:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti
   * (vanha jako: F.A.T.A. on liitetty Khyber Pakhtunkhwaan 2018,
   * Northern Areas on nykyinen Gilgit-Baltistan). Azad Kashmir ja
   * Northern Areas: neutraali, vain maisema. Vältetty maastokohteet-pak.js:n
   * aiheet (K2, Indus, Mohenjo-daro, Taxila, Makli, Rohtas, Takht-i-Bahi,
   * Khewra, Deosai, Mehrgarh). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026):
   *   Northern Areas — Attabad Lake (maanvyöry 2010)
   *   F.C.T.         — Faisal Mosque (1986, beduiinitelttamainen katto)
   *   Punjab         — Badshahi Mosque (1673)
   *   Muut           — yleistietoa, tarkistettu vastaavista
   *                    en-Wikipedia-artikkeleista.
   */
  PAK: {
    'Azad Kashmir': {
      lyhyt: 'Neelumin laakso kiemurtelee metsäisten vuorten välissä, ja sen joki virtaa kirkkaan vihreänä kylien ohi.',
    },
    Baluchistan: {
      lyhyt: 'Makranin rannikkotien varrella Hingolin kansallispuistossa tuuli on veistänyt kallioon hahmon, jota kutsutaan Toivon prinsessaksi.',
    },
    'F.A.T.A.': {
      lyhyt: 'Entiset heimoalueet liitettiin Khyber Pakhtunkhwaan 2018, ja niiden halki Khyberin sola kiemurtelee Afganistanin rajalle.',
    },
    'F.C.T.': {
      lyhyt: 'Islamabadin Faisal-moskeija valmistui 1986 Margalla-kukkuloiden juurelle, ja sen katon muoto muistuttaa beduiinitelttaa.',
    },
    'K.P.': {
      lyhyt: 'Peshawarin Qissa Khwani -basaarin nimi tarkoittaa tarinankertojien basaaria: sen teehuoneissa kerrottiin ennen tarinoita kauppiaille.',
    },
    'Northern Areas': {
      lyhyt: 'Hunzan laakson Attabadjärvi syntyi vuonna 2010, kun maanvyöry patosi joen, ja sen vesi hohtaa sinivihreänä vuorten välissä.',
    },
    Punjab: {
      lyhyt: 'Lahoren Badshahi-moskeija valmistui 1673 punaisesta hiekkakivestä, ja sen pihalle mahtuu kymmeniä tuhansia rukoilijoita.',
    },
    Sind: {
      lyhyt: 'Sindhissä painetaan yhä ajrak-huiveja puuleimasimilla syvänsinisin ja punaisin kuvioin, ja ajrak on sindhiläisten ylpeyden merkki.',
    },
  },
  /*
   * BGD (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.BGD:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * seitsemän hallintoaluetta ennen Mymensinghin eroamista 2015 (Dinajpur
   * kuuluu Rangpuriin). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026):
   *   Dhaka    — Rickshaws and rickshaw painting in Dhaka (Unesco 2023)
   *   Rajshahi — Somapura Mahavihara, Paharpur
   *   Rangpur  — Kantajew Temple, Dinajpur
   *   Muut     — yleistietoa, tarkistettu vastaavista
   *              en-Wikipedia-artikkeleista.
   */
  BGD: {
    Barisal: {
      lyhyt: 'Dhakasta Barisaliin matkataan usein yön yli suurilla jokilautoilla, jotka lipuvat aamuun mennessä suiston joenhaarojen halki.',
    },
    Chittagong: {
      lyhyt: "Cox's Bazarin hiekkaranta jatkuu yhtäjaksoisesti noin 120 kilometriä, ja se on yksi maailman pisimmistä luonnonrannoista.",
    },
    Dhaka: {
      lyhyt: 'Dhakan kaduilla ajaa satojatuhansia polkupyöräriksoja, ja niiden kirjavat maalaukset lisättiin Unescon listalle 2023.',
    },
    Khulna: {
      lyhyt: 'Sundarbans on maailman laajin mangrovemetsä, ja sen vuorovesikanavien varrella elää bengalintiikereitä.',
    },
    Rajshahi: {
      lyhyt: 'Paharpurissa ovat Somapuran luostarin rauniot, yksi Himalajan eteläpuolen suurimmista buddhalaisista luostareista.',
    },
    Rangpur: {
      lyhyt: 'Dinajpurin lähellä seisoo Kantajewin temppeli, jonka seinät on peitetty tarinoita kuvaavilla terrakottalaatoilla.',
    },
    Sylhet: {
      lyhyt: 'Sreemangalia kutsutaan Bangladeshin teepääkaupungiksi, ja sen kojuissa kaadetaan lasiin kerroksittain moniväristä teetä.',
    },
  },
  /*
   * LKA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.LKA:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * 25 piirikuntaa sinhalan translitteraatiolla diakriitteineen
   * (Kŏḷamba = Colombo, Mahanuvara = Kandy, Yāpanaya = Jaffna). Vältetty
   * maastokohteet-lka.js:n aiheet (Sigiriya, Anuradhapuran ja
   * Polonnaruwan muinaiskaupungit, Yapahuwa, hammastemppeli, Gallen
   * linnoitus, Nuwara Eliyan kaupunki, Yhdeksän kaaren silta, Sri Pada,
   * Mahaweli, Palkinlahti). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * hakutarkistus 25.9.2026):
   *   Badulla     — Dunhinda Falls (64 m)
   *   Kalutara    — Kalutara Chaitya (ontto, 74 seinämaalausta)
   *   Kilinochchi — Iranamadu Tank (pohjoisen maakunnan suurin)
   *   Kurunegala  — Ethagala / Athugala (27 m Buddha-patsas)
   *   Mullaitivu  — Kokkilai Sanctuary (1951)
   *   Muut        — yleistietoa, tarkistettu vastaavista
   *                 en-Wikipedia-artikkeleista.
   */
  LKA: {
    'Ampāra': {
      lyhyt: 'Arugam Bayn aallot vetävät surffaajia ympäri maailmaa etenkin touko–syyskuussa, ja rannan kalastajakylä elää nyt myös lautailijoista.',
    },
    'Anurādhapura': {
      lyhyt: 'Mihintalen vuorelle johtavat pitkät kiviportaat, ja kesäkuun Poson-täysikuulla sinne nousee suuri joukko pyhiinvaeltajia.',
    },
    Badulla: {
      lyhyt: 'Badullan lähellä Dunhindan vesiputous syöksyy 64 metriä, ja sen juurelta nouseva vesiusva on antanut sille nimen.',
    },
    'Gālla': {
      lyhyt: 'Koggalan rannalla kalastajat istuvat meressä pystyyn lyötyjen seipäiden päällä ja onkivat aallokon keskeltä.',
    },
    Gampaha: {
      lyhyt: 'Useimmat matkailijat saapuvat Sri Lankaan Gampahan piirikuntaan, sillä maan päälentoasema on Katunayakessa Negombon kupeessa.',
    },
    'Hambantŏṭa': {
      lyhyt: 'Yalan kansallispuistossa elää yksi maailman tiheimmistä leopardikannoista, ja kissoja etsitään pensaikosta safariautoista.',
    },
    'Kægalla': {
      lyhyt: 'Kitulgalassa lasketaan Kelani-joen koskia kumiveneillä, ja joen rannalla kuvattiin vuonna 1957 elokuva Kwai-joen silta.',
    },
    'Kaḷutara': {
      lyhyt: 'Kalutaran sillan kupeessa seisova valkoinen stupa on sisältä ontto, ja sen seinille on maalattu 74 kuvaa Buddhan elämästä.',
    },
    'Kilinŏchchi': {
      lyhyt: 'Iranamadun tekojärvi on Sri Lankan pohjoisen maakunnan suurin, ja sen vesi kastelee tuhansia hehtaareja riisipeltoja.',
    },
    'Kŏḷamba': {
      lyhyt: 'Colombon Galle Face Greenin merenrantanurmelle kokoonnutaan iltaisin syömään katuruokaa ja lennättämään leijoja.',
    },
    'Kuruṇægala': {
      lyhyt: 'Kurunegalan kaupungin yllä kohoaa Ethagala, norsukallioksi kutsuttu kivimuodostelma, jonka laella istuu suuri Buddha-patsas.',
    },
    'Maḍakalapuva': {
      lyhyt: 'Batticaloan laguunin kerrotaan "laulavan" tyyninä täysikuun öinä, ja kalastajat ovat kuunnelleet ääntä vedestä veneistään.',
    },
    Mahanuvara: {
      lyhyt: 'Peradeniyan kasvitieteellinen puutarha Kandyn laitamilla on Sri Lankan suurin, ja sen orkideahuone houkuttelee kävijöitä.',
    },
    'Mannārama': {
      lyhyt: 'Mannarin saarella kasvaa jättimäinen baobab-puu, jonka arabikauppiaiden arvellaan tuoneen Afrikasta satoja vuosia sitten.',
    },
    'Mātale': {
      lyhyt: 'Dambullan luolatemppelin viisi kallioluolaa ovat täynnä Buddha-patsaita ja kattomaalauksia, ja paikka on Unescon maailmanperintöä.',
    },
    'Mātara': {
      lyhyt: 'Dondra Headin majakka Sri Lankan eteläisimmässä kärjessä on 49 metrillään saaren korkein majakka.',
    },
    'Mŏṇarāgala': {
      lyhyt: 'Buduruvagalan kallioon on hakattu seitsemän hahmoa, joista keskimmäinen seisova Buddha on noin 15 metriä korkea.',
    },
    Mulativ: {
      lyhyt: 'Kokkilain laguuni on ollut lintujensuojelualue vuodesta 1951, ja sen matalikoissa kahlaa pelikaaneja ja flamingoja.',
    },
    'Nuvara Ĕliya': {
      lyhyt: "Horton Plainsin ylätasangolla polku päättyy World's Endiin, jossa jyrkänne putoaa noin 870 metriä alas.",
    },
    'Pŏḷŏnnaruva': {
      lyhyt: 'Minneriyan kansallispuistossa kuivakauden lopulla sadat norsut kokoontuvat tekojärven rannalle laiduntamaan.',
    },
    Puttalama: {
      lyhyt: 'Kalpitiyan laguunilla tuulee tuulikaudella niin tasaisesti, että siitä on tullut Sri Lankan leijalautailun keskus.',
    },
    Ratnapura: {
      lyhyt: 'Ratnapuran nimi tarkoittaa jalokivikaupunkia, ja sen ympäristön mutakuopista huuhdotaan yhä safiireja ja rubiineja.',
    },
    'Trikuṇāmalaya': {
      lyhyt: 'Trincomaleen syvä luonnonsatama on yksi maailman suurimmista, ja sen suulle kohoaa Swami-kallio.',
    },
    'Vavuniyāva': {
      lyhyt: 'Vavuniyaa kutsutaan pohjoisen portiksi: sen kautta kulkevat sekä Jaffnaan vievä A9-valtatie että pohjoisen rautatie.',
    },
    'Yāpanaya': {
      lyhyt: 'Jaffnan Nallurin Kandaswamy-temppelissä vietetään joka kesä 25 päivän juhlaa, johon kerääntyy tamilipyhiinvaeltajia kaukaa.',
    },
  },
  /*
   * NPL (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 6C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.NPL:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti:
   * 14 vanhaa vyöhykettä (lakkautettu 2015). "Bhojpur" vastaa Kosin
   * vyöhykettä; teksti on kirjoitettu Bhojpurin piirikunnasta, joka
   * kuuluu siihen kummin päin tahansa. Vältetty maastokohteet-npl.js:n
   * aiheet ja Kathmandun kohdekartan kohteet (Lumbini, Bhaktapur, Gorkha,
   * Janakpur, Muktinath, Lo Manthang, Nuwakot, Bardiya, Dhaulagiri, Koshi,
   * Rara, Boudhanath, Pashupatinath). Vain `lyhyt`. Lähteet
   * (en-Wikipedia ja hakutarkistus 25.9.2026):
   *   Bagmati     — Langtang National Park (1976, ensimmäinen Himalajan)
   *   Bhojpur     — Bhojpure khukuri
   *   Dhawalagiri — Kushman benjisilta (228 m)
   *   Rapti       — Swargadwari (2 200 m)
   *   Muut        — yleistietoa, tarkistettu vastaavista
   *                 en-Wikipedia-artikkeleista.
   */
  NPL: {
    Bagmati: {
      lyhyt: 'Langtangin laakso Kathmandun pohjoispuolella on suosittu vaellusreitti, ja sen kansallispuisto oli Nepalin ensimmäinen Himalajan puisto.',
    },
    Bheri: {
      lyhyt: 'Nepalgunjin lentoasemalta lähtee pienkoneita Länsi-Nepalin vuoristokylien kiitoradoille, esimerkiksi Simikotiin.',
    },
    Bhojpur: {
      lyhyt: 'Bhojpurin kylissä taotaan kukri-veitsiä, ja Bhojpuren kukri tunnetaan koko Nepalissa ja sen rajojen ulkopuolellakin.',
    },
    Dhawalagiri: {
      lyhyt: 'Kushmassa hypätään benjihyppyjä Kali Gandakin rotkon ylle ripustetulta sillalta, joka kulkee 228 metrin korkeudella.',
    },
    Gandaki: {
      lyhyt: 'Pokharan Phewa-järven tyynestä vedestä heijastuu aamuisin Machhapuchhren terävä, pyhänä pidetty huippu.',
    },
    Janakpur: {
      lyhyt: 'Rolwalingin laaksossa on Tsho Rolpa, yksi Nepalin suurimmista jäätikköjärvistä; sen pintaa laskettiin 2000 tulvavaaran vuoksi.',
    },
    Karnali: {
      lyhyt: 'Dolpan Phoksundo-järvi lepää yli 3 600 metrin korkeudessa, ja sen vesi on syvän sinistä.',
    },
    Lumbini: {
      lyhyt: 'Palpan Tansenissa kudotaan dhaka-kangasta, josta tehdään nepalilaisten miesten tunnettu kuviollinen topi-lakki.',
    },
    Mahakali: {
      lyhyt: 'Shuklaphantan kansallispuiston laajoilla ruohoniityillä laiduntaa suuria barasinga-peuralaumoja.',
    },
    Mechi: {
      lyhyt: 'Taplejungin pohjoisosassa kohoaa Kanchenjunga, maailman kolmanneksi korkein vuori, jonka juurelle vaelletaan viikkoja.',
    },
    Narayani: {
      lyhyt: 'Chitwan perustettiin vuonna 1973 Nepalin ensimmäiseksi kansallispuistoksi, ja sen jokivarsilla viihtyvät kapeakuonoiset gaviaalit.',
    },
    Rapti: {
      lyhyt: 'Pyuthanin Swargadwari, "taivaan portti", on 2 200 metrin kukkulalla oleva temppeli, jolta näkyy Himalajan lumihuippuja.',
    },
    Sagarmatha: {
      lyhyt: 'Namche Bazaar 3 440 metrissä on Everestin reitin sherpakylä, jossa vaeltajat totuttelevat ohueen ilmaan.',
    },
    Seti: {
      lyhyt: 'Khaptadin kansallispuisto on noin 3 000 metrin korkeudessa aaltoileva ylätasanko, jonka niityt kukkivat kesällä.',
    },
  },
  /*
   * DZA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7A), 48 aluetta.
   * Avaimet ovat MAAKUNNAT_KAIKKI.DZA:n tunnuksia TÄSMÄLLEEN, kopioitu
   * koneellisesti (diakriitit "Aïn Témouchent", "Béjaïa", "Naâma" jne.,
   * heittomerkki "M'Sila"). Data on vanha 48 wilayan jako; Adrar,
   * Ghardaïa, Illizi ja Tamanghasset kattavat myös 2019 erotetut
   * wilayat (Timimoun, El Menia, Djanet). Vältetty maastokohteet-dza.js:n
   * aiheet (Tahat, Chelif ja Chlefin järistykset, Timgad, Djémila,
   * Tipasan rauniot, Tassili, Qal'at Bani Hammad, Tlemcenin yleiskuvaus,
   * M'zabin laakso, Constantinen sillat). Vain `lyhyt`. Lähteet
   * (en-Wikipedia ja hakutarkistus 25.9.2026):
   *   Adrar          — Foggara (Touat, Gourara; tuhansia km)
   *   Aïn Defla      — Jeune Afrique / APS: ~40 % Algerian perunasta
   *   Aïn Témouchent — Béni Saf (vilkkain kalasatama, sardiinit)
   *   Alger          — Djamaa el Djazaïr (minareetti 265 m)
   *   Annaba         — Annaba: El Hadjarin terästehdas
   *   Batna          — Medracen
   *   Béchar         — Taghit
   *   Béjaïa         — Béjaïa, Etymology (bougie)
   *   Biskra         — Tolga, Algeria (yli 900 000 palmua)
   *   Blida          — "ville des roses", Mitidjan sitrustarhat
   *   Bordj Bou Arréridj — Condor Electronics
   *   Bouira         — Tikjda (1 600 m)
   *   Boumerdès      — Casbah of Dellys (~250 taloa)
   *   Chlef          — Ténès
   *   Constantine    — Palais Ahmed Bey (1826–1835, museo 2010)
   *   Djelfa         — lammaskanta ~3,2 milj. (maan suurin)
   *   El Bayadh      — Brézina, Rock art of south Oran
   *   El Oued        — FAO GIAHS: Ghout oasis system
   *   El Tarf        — El Kala National Park (Mellah)
   *   Ghardaïa       — El Menia, Charles de Foucauld
   *   Guelma         — Hammam Maskhoutine (98 °C)
   *   Illizi         — Sebiba (Unesco 2014)
   *   Jijel          — Grottes merveilleuses (1917)
   *   Khenchela      — Hammam Essalihine (Aquae Flavianae)
   *   Laghouat       — Hassi R'Mel (putkien lähtöpiste)
   *   M'Sila         — Chott el Hodna (Ramsar 2001)
   *   Mascara        — Coteaux de Mascara (AOG, 7 aluetta 1970)
   *   Médéa          — Médéa (n. 950–1 000 m)
   *   Mila           — Beni Haroun Dam (Algerian suurin)
   *   Mostaganem     — Festival national du théâtre amateur (1967)
   *   Naâma          — Isabelle Eberhardt (Aïn Sefra 1904)
   *   Oran           — Raï
   *   Ouargla        — Hassi Messaoud
   *   Oum el Bouaghi — Garaet Guellif (Ramsar 2004, flamingot)
   *   Relizane       — Mazouna
   *   Saïda          — Eau minérale Saïda (1967)
   *   Sétif          — Ain El Fouara Fountain (1898)
   *   Sidi Bel Abbès — muukalaislegioona 1843–1962
   *   Skikda         — Skikda (jalostamo, GL1K LNG)
   *   Souk Ahras     — Thagaste, Augustine of Hippo
   *   Tamanghasset   — Assekrem (2 726 m)
   *   Tébessa        — Arch of Caracalla (Thebeste)
   *   Tiaret         — National Stud Farm of Chaouchaoua (1877)
   *   Tindouf        — Gara Djebilet (kaivos 2022)
   *   Tipaza         — Royal Mausoleum of Mauretania
   *   Tissemsilt     — Théniet El Had National Park
   *   Tizi Ouzou     — Ath Yennin hopeakorut
   *   Tlemcen        — Mansourah (piiritys 1299–1307)
   */
  DZA: {
    Adrar: {
      lyhyt: 'Adrarin keitaiden alla kulkee tuhansia kilometrejä foggaroita, käsin kaivettuja maanalaisia kanavia, jotka johtavat pohjavettä palmutarhoihin.',
    },
    'Aïn Defla': {
      lyhyt: 'Chelifin laakson pelloilla kasvatetaan perunaa niin paljon, että Aïn Defla on Algerian suurin perunantuottaja.',
    },
    'Aïn Témouchent': {
      lyhyt: 'Beni Safin satama on Algerian vilkkaimpia kalasatamia, ja se tunnetaan erityisesti sardiineistaan.',
    },
    Alger: {
      lyhyt: 'Algerin suurmoskeijan Djamaa el Djazaïrin minareetti kohoaa 265 metriin, ja se on maailman korkein minareetti.',
    },
    Annaba: {
      lyhyt: 'Annaban eteläpuolella El Hadjarissa toimii terästehdas, jota pidetään Afrikan suurimpana.',
    },
    Batna: {
      lyhyt: 'Batnan maakunnassa on Medracen, porrastettu kivikumpu, jonka numidialaiset rakensivat kuninkaidensa haudaksi yli 2 000 vuotta sitten.',
    },
    'Béchar': {
      lyhyt: 'Taghitin keidaskylä palmutarhoineen on painautunut Suuren läntisen ergin korkeiden hiekkadyynien juurelle.',
    },
    'Béjaïa': {
      lyhyt: 'Béjaïasta vietiin keskiajalla Eurooppaan mehiläisvahaa, ja kaupungin nimestä tuli ranskan kynttilää tarkoittava sana bougie.',
    },
    Biskra: {
      lyhyt: 'Biskran maakunnan Tolgassa kasvaa yli 900 000 taatelipalmua, ja sen deglet nour -taatelit viedään maailmalle.',
    },
    Blida: {
      lyhyt: 'Blidaa kutsutaan ruusujen kaupungiksi, ja sitä ympäröivät Mitidjan tasangon appelsiinitarhat.',
    },
    'Bordj Bou Arréridj': {
      lyhyt: 'Bordj Bou Arréridjissa on elektroniikkayhtiö Condorin pääkonttori, ja kaupunkia pidetään Algerian teknologiateollisuuden keskuksena.',
    },
    Bouira: {
      lyhyt: 'Djurdjuran vuoristossa 1 600 metrin korkeudella on Tikjdan hiihtokeskus, josta näkee kirkkaalla säällä Välimerelle asti.',
    },
    'Boumerdès': {
      lyhyt: 'Dellysin rannikkokaupungin vanhassa kasbahissa on noin 250 historiallista taloa, ja sen alapuolella on satama.',
    },
    Chlef: {
      lyhyt: 'Chlefin rannikolla on Ténès, pieni satamakaupunki majakkoineen, jonka juuret ulottuvat foinikialaisiin asti.',
    },
    Constantine: {
      lyhyt: 'Constantinen viimeisen beyn palatsi valmistui 1835, ja nyt sen marmoripylväiden ja kaakelien keskellä toimii perinteisten taiteiden museo.',
    },
    Djelfa: {
      lyhyt: 'Djelfan aroilla laiduntaa yli kolme miljoonaa lammasta, enemmän kuin missään muussa Algerian maakunnassa.',
    },
    'El Bayadh': {
      lyhyt: 'Brézinan keitaan ympäristön kallioihin on kaiverrettu neoliittisella kivikaudella eläinten kuvia.',
    },
    'El Oued': {
      lyhyt: 'El Ouedin keitaissa taatelipalmut istutetaan hiekkaan kaivettuihin kuoppiin, ghouteihin, joista juuret ylettyvät pohjaveteen.',
    },
    'El Tarf': {
      lyhyt: 'El Kalan kansallispuistossa on kuusi järveä, ja niistä Mellahin laguuni on Algerian ainoa, joka on yhteydessä mereen.',
    },
    'Ghardaïa': {
      lyhyt: 'El Menian keitaassa on Pyhän Joosefin kirkko, jonka hautausmaalle on haudattu Saharan erakko, pyhimykseksi julistettu Charles de Foucauld.',
    },
    Guelma: {
      lyhyt: 'Hammam Maskhoutinen lähteiden vesi on jopa 98-asteista, ja se valuu kalkkikerrostumien yli höyryävänä putouksena.',
    },
    Illizi: {
      lyhyt: 'Djanetin keitaassa tuaregit esittävät joka vuosi sebiba-tanssia, joka on Unescon aineetonta kulttuuriperintöä.',
    },
    Jijel: {
      lyhyt: 'Jijelin rannikolta löytyi 1917 tietyömaalla tippukiviluolasto, jota kutsutaan nyt Ihmeellisiksi luoliksi.',
    },
    Khenchela: {
      lyhyt: 'Khenchelan lähellä on Hammam Essalihine, roomalaisten noin vuonna 70 rakentama kylpylä, jonka altaissa kylvetään yhä.',
    },
    Laghouat: {
      lyhyt: 'Hassi R’Melin kaasukentältä lähtevät putket Algerian rannikolle ja Välimeren alitse Eurooppaan.',
    },
    "M'Sila": {
      lyhyt: 'Chott el Hodna on matala suolajärvi M’Silan aroilla, ja sen kosteikoilla talvehtii vesilintuja.',
    },
    Mascara: {
      lyhyt: 'Mascaran kukkuloilla viljellään viiniä, ja Coteaux de Mascara on yksi Algerian seitsemästä viinin alkuperäalueesta.',
    },
    'Médéa': {
      lyhyt: 'Médéa on lähes kilometrin korkeudessa Tell-Atlaksella, ja sitä ympäröivät kukkuloiden hedelmä- ja viinitarhat.',
    },
    Mila: {
      lyhyt: 'Milan maakunnassa on Beni Harounin pato, Algerian suurin, joka juottaa vettä useille ympäröiville maakunnille.',
    },
    Mostaganem: {
      lyhyt: 'Mostaganemissa pidetään vuodesta 1967 alkanutta harrastajateatterin festivaalia, jota sanotaan arabimaailman ja Afrikan vanhimmaksi.',
    },
    'Naâma': {
      lyhyt: 'Aïn Sefrassa on kirjailija Isabelle Eberhardtin hauta; hän kuoli kaupunkiin iskeneessä tulvassa 1904 vain 27-vuotiaana.',
    },
    Oran: {
      lyhyt: 'Oran on raï-musiikin kotikaupunki: laji syntyi sen kabareissa, ja nimi tarkoittaa mielipidettä.',
    },
    Ouargla: {
      lyhyt: 'Ouarglan maakunnassa on Hassi Messaoud, öljykaupunki, jossa on kaikkien suurten öljy-yhtiöiden toimistoja ja tukikohtia.',
    },
    'Oum el Bouaghi': {
      lyhyt: 'Oum el Bouaghin suolajärvi Garaet Guellif on yksi Välimeren alueen tärkeimmistä flamingojen pesimäpaikoista.',
    },
    Relizane: {
      lyhyt: 'Relizanen maakunnan Mazounaa kutsutaan oppineiden kaupungiksi, sillä sen medresa koulutti vuosisatoja uskonoppineita.',
    },
    'Saïda': {
      lyhyt: 'Saïdaa kutsutaan vesien kaupungiksi, ja sen lähdevesi on niin tunnettu, että arkikielessä saïda tarkoittaa mitä tahansa pullovettä.',
    },
    'Sétif': {
      lyhyt: 'Sétifin keskusaukiolla on Aïn El Fouara, vuonna 1898 pystytetty suihkulähde, jonka marmorinen naishahmo on kaupungin tunnuskuva.',
    },
    'Sidi Bel Abbès': {
      lyhyt: 'Sidi Bel Abbès oli Ranskan muukalaislegioonan päämaja vuoteen 1962, jolloin legioona muutti Aubagneen Ranskaan.',
    },
    Skikda: {
      lyhyt: 'Skikdan satamassa on Algerian suurin öljynjalostamo sekä maakaasua nesteyttävä laitos.',
    },
    'Souk Ahras': {
      lyhyt: 'Souk Ahras on antiikin Thagaste, jossa kirkkoisä Augustinus syntyi vuonna 354.',
    },
    Tamanghasset: {
      lyhyt: 'Hoggarin Assekremin ylätasanko nousee noin 2 700 metriin, ja tuaregien kielellä sen nimi tarkoittaa maailman loppua.',
    },
    'Tébessa': {
      lyhyt: 'Tébessan keskustassa seisoo Caracallan kaari, noin vuonna 214 valmistunut roomalainen riemukaari, josta tuli myöhemmin kaupunginportti.',
    },
    Tiaret: {
      lyhyt: 'Tiaretin Chaouchaouan valtiollisella siittolalla on kasvatettu berberi- ja arabihevosia vuodesta 1877.',
    },
    Tindouf: {
      lyhyt: 'Tindoufin maakunnan Gara Djebilet on yksi maailman suurimmista rautamalmiesiintymistä, ja kaivos avattiin 2022.',
    },
    Tipaza: {
      lyhyt: 'Tipazan rannikolla on Mauretanian kuninkaallinen mausoleumi, pyöreä kivirakennelma, jota ranskaksi sanotaan kristityn naisen haudaksi.',
    },
    Tissemsilt: {
      lyhyt: 'Théniet El Hadin kansallispuistossa Ouarsenisin vuoristossa kasvaa yli 3 000 hehtaaria atlasinsetrimetsää.',
    },
    'Tizi Ouzou': {
      lyhyt: 'Kabylian Ath Yennin kylissä tehdään hopeakoruja, joita koristavat siniset, vihreät ja keltaiset emalit sekä punaiset korallit.',
    },
    Tlemcen: {
      lyhyt: 'Tlemcenin laidalla seisoo Mansouran puolittainen minareetti, jäänne leirikaupungista, jonka marinidit rakensivat piirittäessään Tlemceniä.',
    },
  },
  /*
   * MAR (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7A), 16 aluetta.
   * Avaimet ovat MAAKUNNAT_KAIKKI.MAR:n tunnuksia TÄSMÄLLEEN, kopioitu
   * koneellisesti (välilyönti-yhdysmerkki-välilyönti, "Fès", "Laâyoune",
   * "Draâ"). Data on vanha 16 alueen jako (ennen 2015). Länsi-Saharan
   * alueilla (Laâyoune - Boujdour - Sakia El Hamra, Oued el Dahab ja
   * Guelmim - Es-Semara) teksti on neutraali ja kertoo vain maisemasta.
   * Vältetty maastokohteet-mar.js:n aiheet (Toubkal, Drâa, Volubilis,
   * Aït Benhaddou, Essaouira, Chefchaouen, Hassan-torni, Erg Chebbi,
   * El Jadida, Lixus). Vain `lyhyt`. Lähteet (en-Wikipedia ja haku
   * 25.9.2026):
   *   Chaouia - Ouardigha  — OCP Group, Khouribga
   *   Doukkala - Abda      — Safi, Colline des potiers
   *   Fès - Boulemane      — University of al-Qarawiyyin (859, Guinness)
   *   Gharb - Chrarda - Béni Hssen — Stellantis Kenitra plant
   *   Grand Casablanca     — Hassan II Mosque
   *   Guelmim - Es-Semara  — Plage Blanche (40–50 km)
   *   Laâyoune - Boujdour - Sakia El Hamra — Khenifiss National Park
   *   Marrakech - Tensift - Al Haouz — Jemaa el-Fnaa
   *   Meknès - Tafilalet   — Ifrane (−23,9 °C 11.2.1935)
   *   Oriental             — Taforalt (helmet ~82 000 v, PNAS 2007)
   *   Oued el Dahab        — Dakhla Bay
   *   Rabat - Salé - Zemmour - Zaer — Kasbah of the Udayas
   *   Souss - Massa - Draâ — Arganeraie Biosphere Reserve (1998)
   *   Tadla - Azilal       — Ouzoud Falls (110 m)
   *   Tanger - Tétouan     — Tanger Med
   *   Taza - Al Hoceima - Taounate — Friouato Caves
   */
  MAR: {
    'Chaouia - Ouardigha': {
      lyhyt: 'Khouribgan kaivoksista louhitaan fosfaattia, ja Marokon fosfaattivarat ovat maailman suurimmat.',
    },
    'Doukkala - Abda': {
      lyhyt: 'Safin Savenvalajien kukkulalla on yli sata työpajaa ja uunia, joissa tehdään kaupungin tunnettua keramiikkaa.',
    },
    'Fès - Boulemane': {
      lyhyt: 'Fèsin al-Qarawiyyin perustettiin moskeijaksi vuonna 859, ja Guinness pitää sitä maailman vanhimpana yhä toimivana korkeakouluna.',
    },
    'Gharb - Chrarda - Béni Hssen': {
      lyhyt: 'Kenitran autotehtaalla kootaan Peugeot 208 -autoja ja pieniä sähköisiä Citroën Ami -kaupunkiautoja.',
    },
    'Grand Casablanca': {
      lyhyt: 'Casablancan Hassan II:n moskeijasta kolmannes on rakennettu Atlantin päälle, ja sen minareetti nousee 210 metriin.',
    },
    'Guelmim - Es-Semara': {
      lyhyt: 'Guelmimin länsipuolella Atlantin rannalla on Plage Blanche, kymmeniä kilometrejä pitkä luonnontilainen hiekkaranta.',
    },
    'Laâyoune - Boujdour - Sakia El Hamra': {
      lyhyt: 'Khnifissin laguunissa Saharan dyynit kohtaavat Atlantin, ja talvisin sen rannoille kerääntyy noin 20 000 lintua.',
    },
    'Marrakech - Tensift - Al Haouz': {
      lyhyt: 'Marrakechin Jemaa el-Fna -aukiolla esiintyvät iltaisin tarinankertojat, soittajat ja käärmeenlumoojat.',
    },
    'Meknès - Tafilalet': {
      lyhyt: 'Ifranen vuoristokaupungissa mitattiin helmikuussa 1935 −23,9 astetta, Afrikan kylmin koskaan kirjattu lukema.',
    },
    Oriental: {
      lyhyt: 'Taforaltin Kyyhkysluolasta on löydetty noin 82 000 vuotta vanhoja simpukankuorihelmiä, maailman vanhimpiin kuuluvia koruja.',
    },
    'Oued el Dahab': {
      lyhyt: 'Dakhlan kapea niemimaa suojaa noin 40 kilometriä pitkää laguunia, jonka tasainen vesi ja tuuli houkuttelevat leijalautailijoita.',
    },
    'Rabat - Salé - Zemmour - Zaer': {
      lyhyt: 'Rabatin Oudayan kasbah seisoo Bou Regreg -joen suulla, ja sen kujien talot on kalkittu valkoisiksi ja sinisiksi.',
    },
    'Souss - Massa - Draâ': {
      lyhyt: 'Sousin tasangolla kasvaa argan-puita, joiden siemenistä puristetaan arganöljyä; metsä on ollut Unescon biosfäärialue vuodesta 1998.',
    },
    'Tadla - Azilal': {
      lyhyt: 'Ouzoudin putoukset syöksyvät 110 metriä El-Abid-joen rotkoon, ja rinteillä liikkuu vapaana berberimakakeja.',
    },
    'Tanger - Tétouan': {
      lyhyt: 'Tangerin itäpuolella on Tanger Med, Afrikan ja koko Välimeren suurin konttisatama.',
    },
    'Taza - Al Hoceima - Taounate': {
      lyhyt: 'Tazan lähellä on Friouaton luola, jonka suuaukko on sata metriä syvä kuilu ja joka on Afrikan syvimpiä luolia.',
    },
  },
  /*
   * TUN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7A), 23 aluetta.
   * Avaimet ovat MAAKUNNAT_KAIKKI.TUN:n tunnuksia TÄSMÄLLEEN, kopioitu
   * koneellisesti ("Ben Arous (Tunis Sud)", "Kassérine", "Médenine").
   * Arianan kuvernoraatti puuttuu datasta. Vältetty maastokohteet-tun.js:n
   * ja fokuskohteet-tun.js:n aiheet (Jabal ash Shanabi, Medjerda, Dougga,
   * El Jem, Kairouanin altaat, Kerkouane, Soussen ribat, Matmata,
   * Sbeitla, Karthagon satama). Vain `lyhyt`. Lähteet (en-Wikipedia ja
   * haku 25.9.2026):
   *   Béja        — Great Mosque of Testour (vastapäivään käyvä kello)
   *   Ben Arous   — Jebel Boukornine, Boukornine National Park
   *   Bizerte     — Ichkeul National Park (Unesco 1980)
   *   Gabès       — Oasis de Gabès (Unescon alustava lista)
   *   Gafsa       — Roman baths of Gafsa (5 m syvät)
   *   Jendouba    — Bulla Regia
   *   Kairouan    — Great Mosque of Kairouan (minareetti 836, Guinness)
   *   Kassérine   — SNCPA (halfaheinäsellu)
   *   Kebili      — International Festival of the Sahara (Douz)
   *   Le Kef      — Jugurtha Tableland (1 271 m)
   *   Mahdia      — Mahdia (fatimidien pääkaupunki 921)
   *   Manubah     — Tunisian National Military Museum (Ruusupalatsi)
   *   Médenine    — El Ghriba Synagogue
   *   Monastir    — Mausoleum of Habib Bourguiba
   *   Nabeul      — Harissa (Kap Bonin chilit)
   *   Sfax        — Charfia fishing in the Kerkennah Islands (Unesco 2020)
   *   Sidi Bou Zid — Mohamed Bouazizi
   *   Siliana     — Makthar (archaeological site)
   *   Sousse      — Catacombs of Sousse (~15 000 hautaa)
   *   Tataouine   — Ksar Ouled Soltane
   *   Tozeur      — Ouled el Hadef (AramcoWorld 2020)
   *   Tunis       — Bardo National Museum
   *   Zaghouan    — Zaghouan Aqueduct (132 km)
   */
  TUN: {
    'Béja': {
      lyhyt: 'Testourin Suuren moskeijan minareetin kello käy vastapäivään; kaupungin rakensivat Espanjasta karkotetut moriskopakolaiset.',
    },
    'Ben Arous (Tunis Sud)': {
      lyhyt: 'Hammam-Lifin yllä kohoaa Boukornine-vuori, jonka nimi tarkoittaa kaksisarvista ja jonka rinteet ovat kansallispuistoa.',
    },
    Bizerte: {
      lyhyt: 'Ichkeulin järvellä talvehtii satojatuhansia muuttolintuja, ja kansallispuisto on ollut maailmanperintökohde vuodesta 1980.',
    },
    'Gabès': {
      lyhyt: 'Gabèsin keidas on Välimeren ainoa merenrantakeidas: palmutarhat ulottuvat aavikolta aina rantaan asti.',
    },
    Gafsa: {
      lyhyt: 'Gafsan vanhassa kaupungissa on kaksi viiden metrin syvyistä roomalaista allasta, joita lähdevesi täytti vuosisatoja.',
    },
    Jendouba: {
      lyhyt: 'Bulla Regian roomalaiset rakensivat talojensa alle kesähuoneet helteeltä suojaan, ja niiden lattioilla on yhä mosaiikkeja.',
    },
    Kairouan: {
      lyhyt: 'Kairouanin Suuren moskeijan minareetti valmistui 800-luvulla, ja se on maailman vanhin kokonaisena säilynyt minareetti.',
    },
    'Kassérine': {
      lyhyt: 'Kasserinen tehdas valmistaa sellua ja paperia halfaheinästä, jota korjataan Tunisian aroilta.',
    },
    Kebili: {
      lyhyt: 'Douzissa, Saharan portilla, pidetään joka joulukuu Saharan festivaali, jossa kilpaillaan kamelijuoksussa.',
    },
    'Le Kef': {
      lyhyt: 'Jugurthan pöytä on jyrkkäseinäinen pöytävuori, joka kohoaa 1 271 metriin ja jolle noustaan kallioon hakattuja portaita.',
    },
    Mahdia: {
      lyhyt: 'Fatimidikalifi al-Mahdi perusti Mahdian 900-luvulla pääkaupungikseen kapealle niemelle, joka pistää Välimereen.',
    },
    Manubah: {
      lyhyt: 'La Manouban Ruusupalatsi rakennettiin 1790-luvulla beyn kesäasunnoksi, ja nyt siinä toimii Tunisian sotamuseo.',
    },
    'Médenine': {
      lyhyt: 'Djerban saaren El Ghriban synagogaan tehdään joka kevät pyhiinvaellus, johon juutalaisia saapuu myös ulkomailta.',
    },
    Monastir: {
      lyhyt: 'Monastirissa on kultakupolinen mausoleumi, johon on haudattu kaupungissa syntynyt Tunisian ensimmäinen presidentti Habib Bourguiba.',
    },
    Nabeul: {
      lyhyt: 'Nabeulin ympärillä Kap Bonin niemimaalla kasvatetaan chilejä, joista tehdään tulista harissa-tahnaa.',
    },
    Sfax: {
      lyhyt: 'Sfaxin edustan Kerkennah-saarilla kalastetaan yhä charfia-pyydyksillä, merenpohjaan pystytetyillä palmunlehtiaidoilla.',
    },
    'Sidi Bou Zid': {
      lyhyt: 'Sidi Bouzidissa katukauppias Mohamed Bouazizi sytytti itsensä tuleen joulukuussa 2010, ja siitä alkoi Tunisian vallankumous.',
    },
    Siliana: {
      lyhyt: 'Maktharin raunioissa näkyy kerroksittain numidialaista, punilaista ja roomalaista kaupunkia.',
    },
    Sousse: {
      lyhyt: 'Soussen alla on varhaiskristittyjen katakombeja, joiden käytäviin haudattiin noin 15 000 vainajaa.',
    },
    Tataouine: {
      lyhyt: 'Ksar Ouled Soltanessa holvattuja viljavarastoja, ghorfia, on muurattu useaan kerrokseen päällekkäin sisäpihojen ympärille.',
    },
    Tozeur: {
      lyhyt: 'Tozeurin vanhan Ouled el Hadefin korttelin muurit on ladottu vaaleista tiilistä kohokuvioiksi, jotka muistuttavat berberimattoja.',
    },
    Tunis: {
      lyhyt: 'Tunisin Bardon kansallismuseossa on maailman suurin roomalaisten mosaiikkien kokoelma.',
    },
    Zaghouan: {
      lyhyt: 'Zaghouanin vuoren juurella on roomalaisten vesitemppeli, josta lähti 132 kilometriä pitkä akvedukti Karthagoon.',
    },
  },
  /*
   * IRN — nykymaakunnat (31). Faktat en-Wikipediasta 25.9.2026; Persepolis,
   * Damavand, Kaspianmeri, Karun, Pasargadai, Bam, Yazdin kaupunki,
   * Shushtar, Soltaniyeh, Takht-e Soleyman ja Gonbad-e Qabus ovat jo
   * maastokohteina/fokuskohteina, joten niitä ei käytetty.
   *   Alborz      — Alborz province (pienin pinta-ala, Karaj 40 km)
   *   Ardebil     — Sheikh Safi al-Din Khānegāh and Shrine Ensemble (2010)
   *   West Azarb. — Monastery of Saint Thaddeus
   *   East Azarb. — Bazaar of Tabriz
   *   Kohgiluyeh  — Dena (yli 40 huippua yli 4 000 m)
   *   Bushehr     — Bandar Siraf
   *   Chahar M.   — Zayanderud
   *   Esfahan     — Naqsh-e Jahan Square (560 m)
   *   Fars        — Tomb of Hafez (1935)
   *   Golestan    — Golestan National Park (1957, vanhin)
   *   Hamadan     — Ali-Sadr Cave
   *   Hormozgan   — Qeshm Island (~1 500 km²)
   *   Ilam        — Kabir Kuh (175 km, 2 790 m)
   *   Kerman      — Lut Desert (70,7 °C)
   *   Kermanshah  — Behistun inscription
   *   S. Khorasan — Birjand + South Khorasan barberry (valtaosa maailman)
   *   R. Khorasan — Imam Reza Shrine
   *   N. Khorasan — Mofakham's House of Mirrors
   *   Khuzestan   — Chogha Zanbil (1979, ensimmäinen)
   *   Kordestan   — Uraman Takht; Hawraman/Uramanat (Unesco 2021)
   *   Lorestan    — Falak-ol-Aflak
   *   Markazi     — Sarouk carpet
   *   Mazandaran  — Ramsar Convention (1971)
   *   Qazvin      — Alamut Castle (1090)
   *   Qom         — Sohan (confectionery)
   *   Semnan      — Tarikhaneh
   *   Sistan      — Shahr-e Sukhteh (Unesco 2014)
   *   Tehran      — Milad Tower (435 m)
   *   Yazd        — Chak Chak, Yazd (14.–18.6.)
   *   Zanjan      — Chehrabad Saltmen (kuusi, akhaimenidi- ja
   *                 parthialais-sasanidiaika)
   *   Muut        — yleistietoa, tarkistettu vastaavista
   *                 en-Wikipedia-artikkeleista.
   */
  IRN: {
    Alborz: {
      lyhyt: 'Alborz on Iranin pinta-alaltaan pienin maakunta, ja sen pääkaupunki Karaj on Alborz-vuorten juurella vain 40 kilometrin päässä Teheranista.',
    },
    Ardebil: {
      lyhyt: 'Ardabilin keskustassa on sufimestari Safi ad-Dinin hauta- ja luostarikokonaisuus, joka liitettiin Unescon maailmanperintöluetteloon 2010.',
    },
    Bushehr: {
      lyhyt: 'Bandar Sirafin kalastajakaupungin vieressä ovat muinaisen Sirafin rauniot, sataman josta laivat purjehtivat aikoinaan Intiaan asti.',
    },
    "Chahar Mahall and Bakhtiari": {
      lyhyt: 'Iranin ylängön suurin joki Zayanderud saa alkunsa maakunnan Zagros-vuorilta ja virtaa sieltä kohti Isfahania.',
    },
    "East Azarbaijan": {
      lyhyt: 'Tabrizin katettu basaari on yksi Lähi-idän vanhimmista, ja sen holvikäytävät kuuluvat Unescon maailmanperintöön.',
    },
    Esfahan: {
      lyhyt: 'Isfahanin Naqsh-e Jahan -aukio on yli puoli kilometriä pitkä, ja sen etelälaidalla kohoaa sinikaakeloitu Shahin moskeija.',
    },
    Fars: {
      lyhyt: 'Shirazin pohjoislaidalla puutarhassa on runoilija Hafezin marmorinen hauta, jonka nykyinen paviljonki rakennettiin 1935.',
    },
    Gilan: {
      lyhyt: 'Masulehin vuoristokylässä talot nousevat rinnettä ylös niin tiiviisti, että alemman talon katto toimii ylemmän pihana ja kulkutienä.',
    },
    Golestan: {
      lyhyt: 'Golestanin kansallispuisto perustettiin 1957, ja se on Iranin vanhin; sen metsissä elää yhä persianleopardeja.',
    },
    Hamadan: {
      lyhyt: 'Ali-Sadrin luola Hamadanin pohjoispuolella on vesiluola, jonka maanalaisia käytäviä kierretään veneillä.',
    },
    Hormozgan: {
      lyhyt: 'Qeshm on Persianlahden suurin saari, noin 1 500 neliökilometriä, ja mantereesta sen erottaa kapea salmi.',
    },
    Ilam: {
      lyhyt: 'Kabir Kuh -vuorijono kulkee maakunnan halki 175 kilometrin matkan, ja sen korkein huippu kohoaa 2 790 metriin.',
    },
    Kerman: {
      lyhyt: 'Lutin autiomaan hiekasta on mitattu 70,7 asteen pintalämpötila, korkein tunnettu maanpinnan lämpötila maapallolla.',
    },
    Kermanshah: {
      lyhyt: 'Bisotunin kallioseinämään hakattu Dareios Suuren kolmikielinen kirjoitus auttoi tutkijoita avaamaan nuolenpääkirjoituksen.',
    },
    Khuzestan: {
      lyhyt: 'Choga Zanbilin elamilainen zikkurat on harvoja Mesopotamian ulkopuolelle säilyneitä, ja se oli Iranin ensimmäinen maailmanperintökohde.',
    },
    "Kohgiluyeh and Buyer Ahmad": {
      lyhyt: 'Maakunnan laidalla kohoavassa Dena-vuoristossa on yli neljäkymmentä yli 4 000 metrin huippua.',
    },
    Kordestan: {
      lyhyt: 'Uraman Takhtin kylä on rakennettu portaittain jyrkkään rinteeseen, ja Hawramanin vuoriston kylämaisema on Unescon maailmanperintöä.',
    },
    Lorestan: {
      lyhyt: 'Khorramabadin keskustassa kukkulan laella seisoo Falak-ol-Aflakin linna, joka rakennettiin jo sasanidien aikana.',
    },
    Markazi: {
      lyhyt: 'Arakin ja Sarukin kylän seudulla solmitaan Saruk-mattoja, jotka tunnetaan maailmalla omana persialaismattojen tyyppinään.',
    },
    Mazandaran: {
      lyhyt: 'Ramsarin rantakaupungissa allekirjoitettiin 1971 kansainvälinen kosteikkosopimus, joka tunnetaan yhä kaupungin nimellä.',
    },
    "North Khorasan": {
      lyhyt: 'Bojnurdin Mofakhamin kartano on qajar-kaudelta, ja sen julkisivun värikkäät kaakelit kuvaavat ihmisiä ja eläimiä.',
    },
    Qazvin: {
      lyhyt: 'Alamutin laakson kalliolla ovat Kotkanpesäksi kutsutun linnoituksen rauniot; Hasan-i Sabbah johti sieltä nizarilaisia vuodesta 1090.',
    },
    Qom: {
      lyhyt: 'Qomista viedään tuliaisiksi sohania, sahramilla ja kardemummalla maustettua rapeaa makeista, jonka päällä on pistaasia ja mantelia.',
    },
    "Razavi Khorasan": {
      lyhyt: 'Mashhadin imaami Rezan pyhäkkö on islamin vierailluimpia pyhiinvaelluspaikkoja; sinne saapuu vuosittain kymmeniä miljoonia ihmisiä.',
    },
    Semnan: {
      lyhyt: 'Damghanin Tarikhanehin moskeija on yksi Iranin vanhimmista islamilaisista rakennuksista, arviolta 700-luvulta.',
    },
    "Sistan and Baluchestan": {
      lyhyt: 'Shahr-e Sukhteh eli "palanut kaupunki" oli pronssikautinen kaupunki Helmand-joen varrella, ja nyt se on Unescon maailmanperintöä.',
    },
    "South Khorasan": {
      lyhyt: 'Etelä-Khorasan tuottaa valtaosan maailman happomarjoista, joita iranilaiset kutsuvat zereshkiksi ja sirottelevat riisin päälle.',
    },
    Tehran: {
      lyhyt: 'Teheranin Milad-torni kohoaa antennin kärkeen 435 metriin, ja se on Iranin korkein torni.',
    },
    "West Azarbaijan": {
      lyhyt: 'Chaldiranin lähellä vuorilla seisoo armenialainen Pyhän Taddeuksen luostari, jonka kartiokatot näkyvät kauas ja jonne tehdään vuosittain pyhiinvaellus.',
    },
    Yazd: {
      lyhyt: 'Chak Chak eli "tip-tip" on zarathustralaisten pyhin vuoristopyhäkkö Ardakanin lähellä, ja joka kesäkuu sinne saapuu tuhansia pyhiinvaeltajia.',
    },
    Zanjan: {
      lyhyt: 'Chehrabadin suolakaivoksesta on löydetty kuuden kaivosmiehen suolan säilyttämät ruumiit; vanhimmat elivät jo akhaimenidien aikaan.',
    },
  },
  /*
   * IRQ — nykymaakunnat (18). Faktat en-Wikipediasta 25.9.2026; ei sotaa
   * eikä politiikkaa. Babylon, Ishtarin portti, Niniven palatsi, Cheekha
   * Dar, Tigris, Shatt al-Arab, Ur, Uruk, Samarra, Erbilin sitadelli ja
   * Hatra ovat jo maasto-/fokuskohteina.
   *   Al-Anbar      — Al Anbar Governorate (suurin pinta-ala)
   *   Al-Muthannia  — Sawa Lake (kuivunut 2023 mennessä)
   *   An-Najaf      — Wadi-us-Salaam (6 km², yli 6 miljoonaa)
   *   Babil         — Borsippa
   *   Baghdad       — Mutanabbi Street
   *   Al-Basrah     — Basra (kolmanneksi suurin, yli 50 °C)
   *   Dihok         — Amedi (mesa, Great Zab)
   *   Dhi-Qar       — Mudhif; Ahwar of Southern Iraq (Unesco 2016)
   *   Diyala        — Baqubah (appelsiinitarhat)
   *   Arbil         — Geli Ali Beg Waterfall (5 dinaarin seteli)
   *   Karbala'      — Arba'in pilgrimage
   *   At-Ta'mim     — Baba Gurgur (Eternal Fire)
   *   Maysan        — Ezra's Tomb
   *   Ninawa        — Mor Mattai Monastery
   *   Al-Qādisiyyah — Nippur
   *   Sala ad-Din   — Saladin (Tikrit, n. 1137)
   *   As-Sulaym.    — Sulaymaniyah (1784)
   *   Wasit         — Wasit ("keskimmäinen")
   */
  IRQ: {
    "Al-Anbar": {
      lyhyt: 'Anbar on Irakin pinta-alaltaan suurin maakunta, ja lännessä se rajautuu Syyriaan, Jordaniaan ja Saudi-Arabiaan.',
    },
    "Al-Basrah": {
      lyhyt: 'Basra on Irakin kolmanneksi suurin kaupunki ja yksi maailman kuumimmista: kesällä lämpötila nousee säännöllisesti yli 50 asteen.',
    },
    "Al-Muthannia": {
      lyhyt: 'Samawan länsipuolella ollut Sawa-järvi, jolla ei ollut laskujokea, kuivui pohjaveden liikapumppauksen vuoksi kokonaan vuoteen 2023 mennessä.',
    },
    "Al-Qādisiyyah": {
      lyhyt: 'Afakin lähellä ovat Nippurin rauniot; kaupunki oli sumerilaisten ylijumalan Enlilin pyhä paikka.',
    },
    "An-Najaf": {
      lyhyt: 'Najafin Wadi as-Salaam on maailman suurin hautausmaa: se kattaa kuusi neliökilometriä, ja sinne on haudattu yli kuusi miljoonaa ihmistä.',
    },
    Arbil: {
      lyhyt: 'Geli Ali Begin vesiputous kapeassa vuoristorotkossa oli aikoinaan Irakin viiden dinaarin setelin kuva-aiheena.',
    },
    "As-Sulaymaniyah": {
      lyhyt: 'Sulaimaniyan perusti vuonna 1784 babanidiruhtinas Ibrahim Pasha, joka nimesi kaupungin isänsä Sulaiman Pashan mukaan.',
    },
    "At-Ta'mim": {
      lyhyt: 'Kirkukin lähellä Baba Gurgurin öljykentällä palaa "ikuinen tuli", maan raoista purkautuva kaasuliekki.',
    },
    Babil: {
      lyhyt: 'Birs Nimrudin kukkulalla seisoo muinaisen Borsippan zikkuratin rauniotorni, jota myöhemmin luultiin Baabelin torniksi.',
    },
    Baghdad: {
      lyhyt: 'Bagdadin al-Mutanabbi-katu on kaupungin kirjakauppojen vanha keskus, ja sen katukojuilla on väkeä aamusta iltaan.',
    },
    "Dhi-Qar": {
      lyhyt: 'Chibayishin soilla suoarabit rakentavat kaislasta suuria mudhif-vierastaloja, ja Etelä-Irakin suot ovat Unescon maailmanperintöä.',
    },
    Dihok: {
      lyhyt: 'Amedin pikkukaupunki on rakennettu jyrkkäreunaisen, tasalakisen kallioylängön laelle Suuren Zab-joen laaksossa.',
    },
    Diyala: {
      lyhyt: 'Diyala-joen varrella sijaitseva Baqubah tunnetaan Irakin kaupallisten appelsiinitarhojen keskuksena.',
    },
    "Karbala'": {
      lyhyt: 'Arbain-päivänä Karbalaan saapuu miljoonia pyhiinvaeltajia, useimmat jalan; se on maailman suurin vuosittainen joukkokokoontuminen.',
    },
    Maysan: {
      lyhyt: 'Tigrisin rannalla al-Uzairin kylässä on Esran hautana pidetty pyhäkkö, jota kunnioittavat sekä juutalaiset että muslimit.',
    },
    Ninawa: {
      lyhyt: 'Mosulin koillispuolella Alfaf-vuorella on Mar Mattain luostari, yksi maailman vanhimmista yhä toimivista kristillisistä luostareista.',
    },
    "Sala ad-Din": {
      lyhyt: 'Maakunta on nimetty Saladinin mukaan: hän syntyi Tikritissä noin vuonna 1137.',
    },
    Wasit: {
      lyhyt: 'Maakunnan nimi tulee 700-luvulla perustetusta Wasitista; se tarkoittaa "keskimmäistä", sillä kaupunki oli Kufan ja Basran välissä.',
    },
  },
  /*
   * SAU — nykymaakunnat (13). Faktat en-Wikipediasta ja SPA:n/Unescon
   * sivuilta 25.9.2026. Jabal Sawda, Rub al-Khali, Hegra, Al-Ahsa,
   * Jubbah, Al-Ukhdud, Rijal Almaa, Qaryat al-Faw, Vanha Jedda ja
   * Farasansaaret ovat jo maastokohteina.
   *   Al Bahah      — Dhi Ayn (marmorikylä)
   *   Hudud ash Sh. — Zubaydah Trail (Rafha)
   *   Al Jawf       — Dumat al-Jandal
   *   Al Madinah    — Al-Masjid an-Nabawi
   *   Al Quassim    — Buraydah (taatelit, Unesco 2021)
   *   Ash Sharqiyah — Dammam No. 7 (3.3.1938)
   *   Ar Riyad      — At-Turaif District
   *   `Asir         — Al-Qatt Al-Asiri (Unesco 2017)
   *   Ha'il         — Hail (city): Aja ja Salma, Hatim al-Tai
   *   Jizan         — Khawlani Coffee Beans (Unesco 2022)
   *   Makkah        — Taif rose (yli 500 miljoonaa ruusua)
   *   Najran        — Al-Aan Palace (SPA / Arab News)
   *   Tabuk         — Jabal al-Lawz (2 580 m, lumi)
   */
  SAU: {
    "`Asir": {
      lyhyt: 'Asirin naiset maalaavat talojen vierashuoneisiin kirkkaita al-qatt-seinämaalauksia, jotka ovat Unescon aineetonta kulttuuriperintöä.',
    },
    "Al Bahah": {
      lyhyt: 'Dhi Aynin kylän kivitalot on rakennettu valkoisen marmorikukkulan päälle, ja sen alla laaksossa kasvaa banaaneja ja sitruunoita.',
    },
    "Al Hudud ash Shamaliyah": {
      lyhyt: 'Rafhan läheltä alkaa Darb Zubaydah, Kufasta Mekkaan johtanut pyhiinvaellustie, jonka kivisiä vesialtaita on yhä jäljellä.',
    },
    "Al Jawf": {
      lyhyt: 'Sakakan lähellä on Dumat al-Jandal, muinainen keidas Wadi Sirhanin päässä, ja sitä ympäröi yhä vanha kivimuuri.',
    },
    "Al Madinah": {
      lyhyt: 'Medinassa on profeetta Muhammadin moskeija, islamin toiseksi pyhin paikka, jonne profeetta on myös haudattu.',
    },
    "Al Quassim": {
      lyhyt: 'Buraidahin taatelimarkkinat ovat maailman suurimpia, ja vuonna 2021 Unesco nimesi kaupungin gastronomian luovaksi kaupungiksi.',
    },
    "Ar Riyad": {
      lyhyt: 'Riadin luoteislaidalla on Diriyahin at-Turaif, savitiilikortteli joka oli Saudien suvun alkuperäinen koti ja ensimmäinen pääkaupunki.',
    },
    "Ash Sharqiyah": {
      lyhyt: 'Dammamin kaivosta numero 7 löytyi 3. maaliskuuta 1938 ensimmäisen kerran kaupallinen määrä Saudi-Arabian öljyä.',
    },
    "Ha'il": {
      lyhyt: 'Hail sijaitsee Aja- ja Salma-vuorten välissä, ja seutu tunnetaan anteliaisuudestaan runoilija Hatim at-Tain kotiseutuna.',
    },
    Jizan: {
      lyhyt: 'Jazanin vuorten pengerrinteillä viljellään khawlani-kahvia, ja sen viljelytaito on ollut Unescon aineetonta kulttuuriperintöä 2022 alkaen.',
    },
    Makkah: {
      lyhyt: 'Taifin vuoristokaupungin ympärillä poimitaan keväisin yli 500 miljoonaa ruusua, jotka tislataan ruusuvedeksi ja -öljyksi.',
    },
    Najran: {
      lyhyt: 'Najranin keitaassa kalliolla seisoo al-Aanin palatsi, jonka viisikerroksinen savitiilitorni hallitsee koko laaksoa.',
    },
    Tabuk: {
      lyhyt: 'Jabal al-Lawz eli "mantelivuori" kohoaa 2 580 metriin, ja sen huipuille sataa lähes joka talvi lunta.',
    },
  },
  /*
   * SYR — nykymaakunnat (15). Faktat en-Wikipediasta 25.9.2026; ei sotaa
   * eikä politiikkaa. Palmyran Belin temppeli, Hermon, Eufrat, Krak des
   * Chevaliers, Bosra, Ugarit, Ebla, Apamea, Resafa ja Mari ovat jo
   * maasto-/fokuskohteina, Dura-Europos skandaalina.
   *   Aleppo       — Aleppo soap
   *   Ar Raqqah    — Raqqa (Abbasidien pääkaupunki 796–809)
   *   As Suwayda'  — Shahba; Philip the Arab
   *   Damascus     — Umayyad Mosque
   *   Dar`a        — Hauran ("granary of Rome")
   *   Dayr Az Zawr — Halabiye (Zenobia)
   *   Hamah        — Norias of Hama (17)
   *   Hasaka       — Tell Brak (Eye Temple)
   *   Homs         — Lake Homs (roomalainen pato)
   *   Idlib        — Dead Cities
   *   Lattakia     — Sahyun Castle (Castle of Saladin)
   *   Quneitra     — Quneitra (ottomaanien karavaaniasema, 1 010 m)
   *   Rif Dimashq  — Maaloula (länsiaramea)
   *   Tartus       — Arwad
   *   UNDOF        — United Nations Disengagement Observer Force (1974)
   */
  SYR: {
    Aleppo: {
      lyhyt: 'Aleppon saippua keitetään oliiviöljystä, ja siihen lisätty laakerinmarjaöljy antaa sille tuoksun ja arabiankielisen nimen.',
    },
    "Ar Raqqah": {
      lyhyt: 'Raqqa oli Abbasidikalifaatin pääkaupunki vuosina 796–809, kun kalifi Harun ar-Rashid hallitsi sieltä.',
    },
    "As Suwayda'": {
      lyhyt: 'Shahbassa syntyi noin vuonna 204 Rooman keisari Filippus Arabialainen, joka teki kotikaupungistaan Philippopoliksen.',
    },
    Damascus: {
      lyhyt: 'Damaskoksen Umaijadien moskeijassa on pyhäkkö, jossa sekä kristityt että muslimit uskovat Johannes Kastajan pään lepäävän.',
    },
    "Dar`a": {
      lyhyt: 'Hauranin tasangon basalttimaa on niin hedelmällistä, että seutua on kutsuttu Rooman vilja-aitaksi.',
    },
    "Dayr Az Zawr": {
      lyhyt: 'Halabiyen linnoitus Eufratin rannalla sai antiikin nimensä Palmyran kuningatar Zenobialta, joka sen 200-luvulla linnoitti.',
    },
    Hamah: {
      lyhyt: 'Hamassa Orontes-joen varrella on säilynyt 17 keskiaikaista noriaa, valtavia puisia vesipyöriä, jotka nostivat vettä puutarhoihin.',
    },
    "Hasaka (Al Haksa)": {
      lyhyt: 'Tell Brakin kummulta on kaivettu alabasterisia silmäidoleita, suurisilmäisiä pikkuhahmoja noin vuodelta 3200 eaa.',
    },
    "Homs (Hims)": {
      lyhyt: 'Qattinah-järvi Homsin lähellä on tekojärvi: sen synnytti roomalaisten Orontes-jokeen rakentama pato.',
    },
    Idlib: {
      lyhyt: 'Idlibin kalkkikiviylängöllä on satoja hylättyjä myöhäisantiikin kyliä, niin sanottuja kuolleita kaupunkeja kirkkoineen ja kylpylöineen.',
    },
    Lattakia: {
      lyhyt: 'Saladinin linna seisoo metsäisellä harjanteella kahden syvän rotkon välissä noin 30 kilometriä Latakiasta itään.',
    },
    Quneitra: {
      lyhyt: 'Quneitra syntyi ottomaanien aikana Damaskokseen johtavan karavaanitien pysähdyspaikaksi korkeaan laaksoon noin 1 000 metriin.',
    },
    "Rif Dimashq": {
      lyhyt: 'Maaloulan kylässä vuorenrinteellä puhutaan yhä länsiarameaa, kieltä joka on säilynyt elävänä vain muutamassa kylässä.',
    },
    Tartus: {
      lyhyt: 'Arwad kolmen kilometrin päässä Tartuksesta on Syyrian ainoa asuttu saari, ja sitä kiertävät yhä foinikialaisaikaiset muurit.',
    },
    UNDOF: {
      lyhyt: 'Tätä kapeaa erotusvyöhykettä Golanilla ovat valvoneet YK:n UNDOF-joukot vuodesta 1974, ja niiden valtuutus uusitaan puolen vuoden välein.',
    },
  },
  /*
   * JOR — nykymaakunnat (12). Faktat en-Wikipediasta 25.9.2026. Petra,
   * Wadi Rum, Jabal Umm ad Dami, Kuollutmeri, Jordan, Jerash, Umm Qais,
   * Umm el-Jimal, Madaba, Kerakin linna ja Ayla ovat jo maasto-/
   * fokuskohteina, Azraq skandaalina.
   *   Ajlun   — Ajloun Castle
   *   Aqaba   — Aqaba (ainoa rannikkokaupunki)
   *   Balqa   — As-Salt (Unesco 2021)
   *   Karak   — Mujib Biosphere Reserve
   *   Mafraq  — Qasr Burqu'
   *   Amman   — Roman Theatre (Amman) (6 000)
   *   Tafilah — Dana Biosphere Reserve (suurin)
   *   Zarqa   — Qusayr 'Amra
   *   Irbid   — Pella, Jordan
   *   Jarash  — Dibbeen Forest Reserve
   *   Ma`an   — Montreal (castle)
   *   Madaba  — Mount Nebo
   */
  JOR: {
    Ajlun: {
      lyhyt: 'Ajlounin linna rakennettiin 1100-luvulla kukkulan laelle vartioimaan kolmea Jordaninlaaksoon laskeutuvaa wadia.',
    },
    Amman: {
      lyhyt: 'Ammanin keskustan roomalainen teatteri rakennettiin 100-luvulla kukkulan rinteeseen, ja sen katsomoon mahtuu noin 6 000 ihmistä.',
    },
    Aqaba: {
      lyhyt: 'Aqaba on Jordanian ainoa rannikkokaupunki, ja sen edustalla Aqabanlahdella sukelletaan koralliriutoilla.',
    },
    Balqa: {
      lyhyt: 'Saltin kaupunki on rakennettu kolmen kukkulan kainaloon, ja sen keltakiviset talot liitettiin Unescon maailmanperintöön 2021.',
    },
    Irbid: {
      lyhyt: 'Pellan rauniot Jordaninlaakson itäisillä kukkuloilla kertovat tuhansien vuosien asutuksesta, ja keväällä rinteet ovat kukkien peitossa.',
    },
    Jarash: {
      lyhyt: 'Dibbeenin metsäsuojelualueella kasvavat Jordanian suurimmat aleponmännyt, ja siellä elää uhanalainen persianorava.',
    },
    Karak: {
      lyhyt: 'Karakin pohjoispuolella Wadi Mujibin kapeassa hiekkakivirotkossa kahlataan ja kiipeillään vesiputousten ohi.',
    },
    "Ma`an": {
      lyhyt: 'Shobakin kaupungin vieressä kartiomaisen vuoren rinteellä seisoo ristiretkeläisten rakentama Montréalin linna.',
    },
    Madaba: {
      lyhyt: 'Nebovuorelta, jolta Mooseksen kerrotaan nähneen luvatun maan, näkyy Jeriko ja kirkkaalla säällä Jerusalem.',
    },
    Mafraq: {
      lyhyt: 'Itäisellä basalttiaavikolla seisoo Qasr Burqu, varhainen umaijadilinna, jonka muuri katoaa suoraan pienen aavikkojärven veteen.',
    },
    Tafilah: {
      lyhyt: 'Danan luonnonsuojelualue on Jordanian suurin, ja sen vanha kivikylä on Wadi Danan jyrkän laakson reunalla.',
    },
    Zarqa: {
      lyhyt: 'Aavikkolinna Qusayr Amran kylpylän seiniä peittävät 700-luvun freskot, joissa on metsästyskohtauksia, eläimiä ja lintuja.',
    },
  },
  /*
   * NGA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7C). Avaimet ovat
   * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI.NGA:n tunnuksia
   * TÄSMÄLLEEN (kopioitu koneellisesti; "Nassarawa" kahdella s:llä,
   * "Federal Capital Territory"). Vain `lyhyt`. Vältetty maastokohteet-
   * nga.js:n aiheet (Chappal Waddi, Nigerjoki, Benue-joki, Sukur, Osun-
   * Osogbo, Zuma Rock, Igbo-Ukwu, Yankari, Kainji, Nok, Badagry). Pohjoinen
   * vain kulttuuri- ja historia-aiheilla. Lähteet (en-Wikipedia ja haku,
   * tarkistettu 25.9.2026), epävarmimmat erikseen:
   *   Akwa Ibom — Ibeno Beach (noin 30 km, Länsi-Afrikan pisin)
   *   Bauchi    — Tafawa Balewa's tomb (kansallinen muistomerkki 1979)
   *   Edo       — Igun Street (pronssinvalajien kilta, vahamuotti)
   *   Ekiti     — Ikogosi Warm Springs
   *   Gombe     — Dadin Kowa Dam (Gongola, vesi Gomben kaupungille)
   *   Jigawa    — Birnin Kudu (kalliomaalaukset, muistomerkki 1964)
   *   Kaduna    — Kajuru Castle (1981–1989, saksalainen rakennuttaja)
   *   Kano      — Kofar Mata Dye Pits (1498)
   *   Katsina   — Gobarau Minaret (1400-luku)
   *   Kogi      — Northern Nigeria Protectorate (Lokoja 1900, Zungeru 1902)
   *   Kwara     — Esie Museum (1945, vuolukivihahmot)
   *   Lagos     — Lekki Conservation Centre (401 m)
   *   Nassarawa — Farin Ruwa Falls (noin 150 m)
   *   Niger     — Gurara Waterfalls (noin 30 m)
   *   Ondo      — Idanre Hill (660 porrasta, laskeutuminen 1923)
   *   Taraba    — Mambilla Plateau (Länsi-Afrikan ainoat ylänköteetilat)
   *   Zamfara   — Kingdom of Zamfara (Birnin Zamfara)
   *   Muut      — yleistietoa, tarkistettu vastaavista
   *               en-Wikipedia-artikkeleista.
   */
  NGA: {
    Abia: {
      lyhyt: 'Aban Ariaria-markkinoilla myydään kaupungin omissa verstaissa ommeltuja kenkiä, laukkuja ja vaatteita.',
    },
    Adamawa: {
      lyhyt: 'Adamawa on saanut nimensä Modibo Adamasta, joka perusti seudulle emiraatin 1800-luvun alussa; emiirin istuin on yhä Yolassa.',
    },
    'Akwa Ibom': {
      lyhyt: 'Ibenon hiekkaranta kulkee Atlantin rannalla noin 30 kilometrin matkan, ja sitä pidetään Länsi-Afrikan pisimpänä.',
    },
    Anambra: {
      lyhyt: 'Onitshan päätori on yksi Länsi-Afrikan suurimmista markkinoista, ja sen kujilla myydään kankaista varaosiin lähes kaikkea.',
    },
    Bauchi: {
      lyhyt: 'Bauchin kaupungissa lepää Nigerian ensimmäinen pääministeri Abubakar Tafawa Balewa, ja hänen hautansa on kansallinen muistomerkki.',
    },
    Bayelsa: {
      lyhyt: 'Suistomaan pienessä Oloibirin kylässä löydettiin 1956 Nigerian ensimmäinen kaupallisesti hyödynnettävä öljy.',
    },
    Benue: {
      lyhyt: 'Benueta kutsutaan Nigerian ruoka-aitaksi, ja sen pelloilta tulee etenkin jamssia koko maan toreille.',
    },
    Borno: {
      lyhyt: 'Borno on saanut nimensä Bornun valtakunnasta, joka hallitsi vuosisatojen ajan Tšadjärven ympäristöä.',
    },
    'Cross River': {
      lyhyt: 'Calabarin karnevaali täyttää kaupungin kadut joka joulukuu, ja sitä kutsutaan Afrikan suurimmaksi katujuhlaksi.',
    },
    Delta: {
      lyhyt: 'Asaba ja Onitsha ovat vastakkain Nigerin rannoilla, ja niitä yhdistää vuonna 1965 valmistunut Niger-silta.',
    },
    Ebonyi: {
      lyhyt: 'Abakalikin seudun tulvatasangoilla viljellään riisiä, ja Abakaliki-riisi on tuttu nimi Nigerian toreilla.',
    },
    Edo: {
      lyhyt: 'Benin Cityn Igun-kadulla pronssinvalajien kilta valaa yhä veistoksia vahamuottimenetelmällä, jota suvut ovat siirtäneet vuosisatoja.',
    },
    Ekiti: {
      lyhyt: 'Ikogosissa lämmin ja kylmä lähde virtaavat rinnakkain ja yhtyvät lopulta samaksi puroksi.',
    },
    Enugu: {
      lyhyt: 'Enugua kutsutaan Hiilikaupungiksi, sillä sen kukkuloilta louhittiin kivihiiltä 1900-luvun alusta lähtien.',
    },
    Gombe: {
      lyhyt: 'Dadin Kowan pato padottaa Gongola-joen suureksi tekojärveksi, josta Gomben kaupunki saa juomavetensä.',
    },
    Imo: {
      lyhyt: 'Owerrin Mbari-keskuksessa on savesta muotoiltuja, maalattuja hahmoja, joita igbot ovat perinteisesti tehneet maan jumalatar Alalle.',
    },
    Jigawa: {
      lyhyt: 'Birnin Kudun kallioissa on tuhansia vuosia vanhoja maalauksia karjasta, ja paikka on ollut kansallinen muistomerkki vuodesta 1964.',
    },
    Kaduna: {
      lyhyt: 'Kajurun kylän kukkulalla seisoo 1980-luvulla rakennettu torneilla koristeltu graniittilinna, Kadunassa asuneen saksalaisen unelma.',
    },
    Kano: {
      lyhyt: 'Kanon Kofar Matan värjäysaltaissa kankaita on värjätty indigolla vuodesta 1498, ja työ jatkuu yhä samoissa kuopissa.',
    },
    Katsina: {
      lyhyt: 'Katsinan keskustassa kohoaa savesta rakennettu Gobaraun minareetti, joka on peräisin 1400-luvulta.',
    },
    Kebbi: {
      lyhyt: 'Argungun kalastusjuhlilla tuhannet kalastajat syöksyvät yhtä aikaa jokeen ja pyydystävät kaloja käsiverkoilla.',
    },
    Kogi: {
      lyhyt: 'Lokoja oli vuonna 1900 Pohjois-Nigerian protektoraatin ensimmäinen pääkaupunki, kunnes hallinto siirtyi Zungeruun.',
    },
    Kwara: {
      lyhyt: 'Esien museo avattiin 1945 Nigerian ensimmäisenä museona, ja siellä on satoja vuolukivestä veistettyjä ihmishahmoja.',
    },
    Lagos: {
      lyhyt: 'Lekkin luonnonsuojelualueella puiden latvojen yllä kulkee 401 metriä pitkä riippusiltareitti, Afrikan pisin laatuaan.',
    },
    Nassarawa: {
      lyhyt: 'Farin Ruwan vesiputous syöksyy noin 150 metriä Josin ylängön reunalta; nimi tarkoittaa hausaksi valkoista vettä.',
    },
    Niger: {
      lyhyt: 'Gurara-joen vesiputous levittäytyy leveänä verhona kalliolta noin 30 metrin syvyyteen.',
    },
    Ogun: {
      lyhyt: 'Abeokutan nimi tarkoittaa jorubaksi kallion alla, ja keskellä kaupunkia kohoaa graniittinen Olumo-kallio.',
    },
    Ondo: {
      lyhyt: 'Idanren vanhaan kaupunkiin kukkuloiden laelle noustaan 660 porrasta; asukkaat muuttivat sieltä alas tasangolle 1923.',
    },
    Osun: {
      lyhyt: 'Ile-Ifeä pidetään jorubaperinteessä paikkana, josta maailman luominen alkoi.',
    },
    Oyo: {
      lyhyt: 'Ibadanin yliopisto perustettiin 1948, ja se on Nigerian vanhin yliopisto.',
    },
    Plateau: {
      lyhyt: 'Josin ylänkö on noin 1 200 metrin korkeudessa, joten Josin ilmasto on viileämpi kuin useimmissa Nigerian kaupungeissa.',
    },
    'Federal Capital Territory': {
      lyhyt: 'Abuja rakennettiin suunnitelmakaupungiksi maan keskelle, ja siitä tuli Nigerian pääkaupunki 1991 Lagosin jälkeen.',
    },
    Rivers: {
      lyhyt: 'Port Harcourtia kutsutaan puutarhakaupungiksi sen puistojen ja vehreiden katujen vuoksi.',
    },
    Sokoto: {
      lyhyt: 'Sokotossa asuu sulttaani, jota monet Nigerian muslimit pitävät hengellisenä johtajanaan.',
    },
    Taraba: {
      lyhyt: 'Mambillan viileällä ylängöllä viljellään teetä, ja sen teetilat ovat Länsi-Afrikan ainoat ylänköteeviljelmät.',
    },
    Yobe: {
      lyhyt: 'Ngurun lähellä levittäytyvät Hadejia–Nguru-kosteikot, joille monet Euroopan muuttolinnut tulevat talveksi.',
    },
    Zamfara: {
      lyhyt: 'Zamfara on saanut nimensä vanhasta hausakuningaskunnasta, jonka muurien ympäröimä pääkaupunki oli Birnin Zamfara.',
    },
  },
  /*
   * TZA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.TZA:n tunnuksia TÄSMÄLLEEN ("Dar-Es-Salaam",
   * "Kaskazini-Unguja", "Zanzibar South and Central", "Zanzibar West").
   * Vain `lyhyt`. Vältetty maastokohteet-tza.js:n aiheet (Kilimandžaro-
   * vuori, Tanganjikajärvi, Olduvai, Serengeti, Kondoa, Kilwa Kisiwani,
   * Bagamoyo, Ujiji, Taboran kaupunki, Kalambo). Lähteet (en-Wikipedia ja
   * haku, tarkistettu 25.9.2026), epävarmimmat erikseen:
   *   Dar-Es-Salaam — Kariakoo (Carrier Corps, 1916)
   *   Dodoma        — Tanzanian wine (kaksi satoa vuodessa)
   *   Geita         — Rubondo Island NP (simpanssit 1966–1969)
   *   Iringa        — Isimila Stone Age Site
   *   Kusini-Pemba  — Pemban neilikat (noin 70 % Sansibarin sadosta)
   *   Lindi         — Tendaguru, Giraffatitan (Museum für Naturkunde)
   *   Njombe        — Kitulo NP ("Bustani ya Mungu", noin 45 orkidealajia)
   *   Pwani         — Mafia Island (valashait loka–maaliskuu)
   *   Rukwa         — Lake Rukwa (endorheinen)
   *   Ruvuma        — Unity Bridge (avattu 12.5.2010)
   *   Shinyanga     — Williamson pink diamond (1947)
   *   Simiyu        — puuvilla (yli puolet Tansanian puuvillapinta-alasta)
   *   Singida       — auringonkukka (noin 25 % maan sadosta)
   *   Tabora        — hunaja (noin puolet Tansanian tuotannosta)
   *   Muut          — yleistietoa, tarkistettu vastaavista
   *                   en-Wikipedia-artikkeleista.
   */
  TZA: {
    Arusha: {
      lyhyt: 'Ngorongoron kraatteri on valtava sortunut tulivuori, jonka pohjalla elää gnuita, seeproja ja leijonia.',
    },
    'Dar-Es-Salaam': {
      lyhyt: 'Kariakoon tori on saanut nimensä ensimmäisen maailmansodan brittiläisestä kantajajoukosta, Carrier Corpsista, jonka leiri oli paikalla.',
    },
    Dodoma: {
      lyhyt: 'Dodoman kuivilla hiekkamailla kasvatetaan viinirypäleitä, ja lämmön ansiosta satoja voi korjata kaksi vuodessa.',
    },
    Geita: {
      lyhyt: 'Rubondon saarelle Viktoriajärvessä tuotiin 1960-luvulla simpansseja, ja niiden jälkeläiset elävät saarella yhä vapaina.',
    },
    Iringa: {
      lyhyt: 'Isimilan rotkossa kohoaa eroosion muovaamia hiekkakivipylväitä, ja sieltä on löydetty satojentuhansien vuosien takaisia kivikirveitä.',
    },
    Kagera: {
      lyhyt: 'Kagera-joki, jota pidetään Niilin pisimpänä latvajokena, laskee alueella Viktoriajärveen.',
    },
    'Kaskazini-Pemba': {
      lyhyt: 'Pohjois-Pemban Ngezin metsässä elää pemban lentokoira, suuri hedelmälepakko, jota ei tavata missään muualla.',
    },
    Katavi: {
      lyhyt: 'Katavin kansallispuistossa kuivan kauden lopulla sadat virtahevot ahtautuvat Katuma-joen viimeisiin lätäköihin.',
    },
    Kigoma: {
      lyhyt: 'Gomben kansallispuistossa Jane Goodall aloitti simpanssitutkimuksensa 1960, ja työ jatkuu siellä yhä.',
    },
    Kilimanjaro: {
      lyhyt: 'Moshin ympäristön kylissä kahvipensaat kasvavat banaanipuiden varjossa chaggojen perinteisissä kotipuutarhoissa.',
    },
    'Kusini-Pemba': {
      lyhyt: 'Pemban saari tuottaa suurimman osan Sansibarin neilikoista, ja sadonkorjuun aikaan nuput kuivuvat kylien pihoilla.',
    },
    Lindi: {
      lyhyt: 'Lindin lähellä Tendagurussa kaivettiin 1900-luvun alussa dinosaurusluita, joista koottu Giraffatitan seisoo nyt Berliinin museossa.',
    },
    Manyara: {
      lyhyt: 'Tarangiren kansallispuisto on tunnettu mahtavista baobabeistaan ja kuivan kauden suurista norsulaumoista.',
    },
    Mara: {
      lyhyt: 'Butiaman kylässä syntyi Tansanian ensimmäinen presidentti Julius Nyerere, ja hänen kotinsa on nyt museo.',
    },
    Mbeya: {
      lyhyt: 'Matemassa Malawijärven pohjoispäässä Livingstonen vuoret nousevat jyrkkinä suoraan hiekkarannalta.',
    },
    Morogoro: {
      lyhyt: 'Udzungwan vuorten Sanjen vesiputous syöksyy sademetsän keskellä noin 170 metriä alas.',
    },
    Mtwara: {
      lyhyt: 'Makondeylängön veistäjät tunnetaan mustapuusta kaiverretuista, toisiinsa kietoutuvista ihmishahmoista.',
    },
    Mwanza: {
      lyhyt: 'Mwanzaa kutsutaan kalliokaupungiksi graniittilohkareidensa vuoksi, ja Bismarckin kallio kohoaa Viktoriajärven rantavedestä.',
    },
    Njombe: {
      lyhyt: 'Kitulon ylänköä kutsutaan swahiliksi Jumalan puutarhaksi, sillä sadekaudella sen niityillä kukkii kymmeniä orkidealajeja.',
    },
    Pwani: {
      lyhyt: 'Mafian saaren Kilindonin lahdella voi uida valashaiden kanssa, varsinkin lokakuusta maaliskuuhun.',
    },
    Rukwa: {
      lyhyt: 'Rukwajärvellä ei ole laskujokea, joten sen koko vaihtelee paljon sateiden mukaan.',
    },
    Ruvuma: {
      lyhyt: 'Ruvuma-joen yli Mosambikiin kulkeva Unity Bridge avattiin 2010, vaikka siltaa oli suunniteltu jo 1970-luvulta asti.',
    },
    Shinyanga: {
      lyhyt: 'Mwaduin timanttikaivoksesta löytyi 1947 vaaleanpunainen timantti, joka annettiin prinsessa Elisabetille häälahjaksi.',
    },
    Simiyu: {
      lyhyt: 'Simiyu on Tansanian suurin puuvillan tuottaja, ja sen pelloilla viljellään myös luomupuuvillaa.',
    },
    Singida: {
      lyhyt: 'Singidan seutu tuottaa enemmän auringonkukkaa kuin mikään muu Tansanian alue, ja siemenistä puristetaan ruokaöljyä.',
    },
    Tabora: {
      lyhyt: 'Taboran alueen miombometsissä tarhataan mehiläisiä, ja alue tuottaa suuren osan koko Tansanian hunajasta.',
    },
    Tanga: {
      lyhyt: 'Tangan pohjoispuolella ovat Ambonin kalkkikiviluolat, Itä-Afrikan laajimpia luolastoja.',
    },
    'Kaskazini-Unguja': {
      lyhyt: 'Nungwin kylässä Sansibarin pohjoiskärjessä veistetään yhä puisia dhow-veneitä käsin rannan veistämöillä.',
    },
    'Zanzibar South and Central': {
      lyhyt: 'Jozanin metsässä elää Sansibarin punainen kolobusapina, jota ei tavata missään muualla maailmassa.',
    },
    'Zanzibar West': {
      lyhyt: 'Sansibarin Kivikaupungin kujilla näkee taidokkaasti kaiverrettuja puuovia, joista osassa on messinkinupit.',
    },
  },
  /*
   * ETH (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.ETH:n tunnuksia TÄSMÄLLEEN ("Benshangul-Gumaz",
   * "Gambela Peoples", "Harari People", "Oromiya", "Southern Nations,
   * Nationalities and Peoples"). Vain `lyhyt`. Vältetty maastokohteet-
   * eth.js:n aiheet (Ras Dejen, Tanajärvi, Sininen Niili, Aksum, Fasil
   * Ghebbi, Harar, Tiya, Debre Damo, Danakil, Hadar, Bale). Tigray ja
   * Benishangul vain maisema-, kulttuuri- ja historia-aiheilla. Lähteet
   * (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Afar            — Lake Abbe (kalkkikivipiiput)
   *   Dire Dawa       — rautatie 24.12.1902
   *   Gambela Peoples — Great Nile Migration (valkokorvakob)
   *   Harari People   — Harari Region (pienin), harari-kieli
   *   Oromiya         — Irreechaa (Hora Arsadi, Bishoftu)
   *   Tigray          — Abuna Yemata Guh (Gheralta)
   *   Muut            — yleistietoa, tarkistettu vastaavista
   *                     en-Wikipedia-artikkeleista.
   */
  ETH: {
    'Addis Ababa': {
      lyhyt: 'Addis Abeba tarkoittaa amharaksi uutta kukkaa; kaupunki perustettiin 1886 yli 2 300 metrin korkeuteen.',
    },
    Afar: {
      lyhyt: 'Abbejärven rannalla Djiboutin rajalla kohoaa kymmeniä metrejä korkeita kalkkikivipiippuja, joista osa höyryää yhä.',
    },
    Amhara: {
      lyhyt: 'Lalibelan yksitoista kirkkoa on hakattu suoraan kallioon 1100–1200-luvuilla, ja niissä pidetään yhä jumalanpalveluksia.',
    },
    'Benshangul-Gumaz': {
      lyhyt: 'Asosan seudulla berttojen kylissä kultaa huuhdotaan yhä perinteisesti jokien hiekasta.',
    },
    'Dire Dawa': {
      lyhyt: 'Dire Dawa syntyi 1902, kun Djiboutista Addis Abebaan rakennettu rautatie saavutti seudun.',
    },
    'Gambela Peoples': {
      lyhyt: 'Gambelan kansallispuiston kautta kulkee Afrikan suurimpiin kuuluva vaellus, jossa liikkuu miljoonia kob-antilooppeja.',
    },
    'Harari People': {
      lyhyt: 'Harari on Etiopian pienin alue, ja sen oma harari on seemiläinen kieli, jota puhuu vain muutama kymmenentuhatta ihmistä.',
    },
    Oromiya: {
      lyhyt: 'Bishoftun Hora Arsadi -järvellä vietetään sadekauden päättyessä Irreecha-kiitosjuhlaa, johon tuodaan vihreää ruohoa ja kukkia.',
    },
    Somali: {
      lyhyt: 'Somalialueen pääkaupunki Jijiga on noin 1 600 metrin korkeudessa, joten sen ilma on viileämpi kuin alavilla tasangoilla.',
    },
    'Southern Nations, Nationalities and Peoples': {
      lyhyt: 'Konson kuivilla rinteillä kiviterassit pidättävät vettä ja maata, ja viljelymaisema on Unescon maailmanperintöä.',
    },
    Tigray: {
      lyhyt: 'Gheraltan vuorilla Abuna Yemata Guhin kirkko on hakattu jyrkänteeseen, ja sinne kiivetään paljain jaloin.',
    },
  },
  /*
   * GHA (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 7C). Avaimet ovat
   * MAAKUNNAT_KAIKKI.GHA:n tunnuksia TÄSMÄLLEEN (vanha kymmenen alueen
   * jako, "Brong Ahafo"). Vain `lyhyt`. Vältetty maastokohteet-gha.js:n
   * aiheet (Afadja, Voltajärvi, Elmina, Kakum, Larabanga, Mole, Nzulezo,
   * Osun linna, Paga, Prinzenstein). Lähteet (en-Wikipedia ja haku,
   * tarkistettu 25.9.2026):
   *   Brong Ahafo   — Boabeng-Fiema Monkey Sanctuary
   *   Central       — Aboakyer festival (Winneba)
   *   Eastern       — Krobo-helmet (Odumase)
   *   Greater Accra — Fantasy coffin (Teshie)
   *   Northern      — Bugum Chugu
   *   Upper West    — Wechiau Community Hippo Sanctuary
   *   Volta         — Agbamevo-juhla (Agotime, Kpetoe)
   *   Western       — Cape Three Points (majakka 1925)
   *   Muut          — yleistietoa, tarkistettu vastaavista
   *                   en-Wikipedia-artikkeleista.
   */
  GHA: {
    Ashanti: {
      lyhyt: 'Ashantien Kultainen jakkara on kansan pyhin symboli, eikä sen päällä istu kukaan, ei edes kuningas.',
    },
    'Brong Ahafo': {
      lyhyt: 'Boabengin ja Fieman kylissä apinat ovat pyhiä, ja kuollut apina haudataan arkussa kuin ihminen.',
    },
    Central: {
      lyhyt: 'Winneban Aboakyer-juhlassa kaksi paikallista joukkoa kilpailee siitä, kumpi saa ensin elävän pensasantiloopin kiinni.',
    },
    Eastern: {
      lyhyt: 'Krobon kylissä rikotuista pulloista jauhettu lasi sulatetaan savimuoteissa värikkäiksi helmiksi.',
    },
    'Greater Accra': {
      lyhyt: 'Teshien puusepänverstaissa tehdään arkkuja kalan, auton tai kaakaohedelmän muotoon vainajan elämän mukaan.',
    },
    Northern: {
      lyhyt: 'Tamalen seudulla dagombat viettävät tulijuhlaa, jossa soihtukulkueet valaisevat yön kaduilla.',
    },
    'Upper East': {
      lyhyt: 'Bolgatangan seudulla punotaan norsuheinästä värikkäitä koreja, joita viedään myyntiin ympäri maailmaa.',
    },
    'Upper West': {
      lyhyt: 'Wechiaussa Mustan Voltan varrella kylät suojelevat virtahepoja, joita voi katsella veneestä aamuin ja illoin.',
    },
    Volta: {
      lyhyt: 'Agotimen Kpetoessa ewet kutovat kentekangasta, ja joka elokuu järjestettävillä juhlilla kutojat kilpailevat taidoistaan.',
    },
    Western: {
      lyhyt: 'Kolmen kärjen niemi on Ghanan eteläisin kohta, ja sen majakka on toiminut vuodesta 1925.',
    },
  },
  /*
   * AFG — nykymaakunnat (32; Natural Earthin vanha jako, Panjshir ja
   * Daykundi puuttuvat). Faktat en-Wikipediasta 25.9.2026. Sävy
   * neutraali: maisema, kulttuuri, historia — ei sotaa eikä politiikkaa.
   * Bamiyanin buddhat, Band-e Amir, Noshaq, Helmand-joki, Amudarja,
   * Jamin minareetti, Heratin linnoitus, Balkhin kaupunki, Mes Aynak,
   * Ai-Khanoum ja Ghaznin kaupunki ovat jo maastokohteina/fokuskohteina,
   * joten niitä ei käytetty.
   *   Badakhshan — Sar-i Sang (lapis, Tutankhamonin hauta)
   *   Badghis    — Badghis Province (Murghab River)
   *   Baghlan    — Surkh Kotal (18 km Puli Khumrista pohjoiseen)
   *   Balkh      — Mazar-i-Sharif; Mausoleum of Ali (nouruz)
   *   Bamyan     — Shahr-e Zuhak
   *   Farah      — Farah, Afghanistan (linnoitus, "probably" Aleksanteri)
   *   Faryab     — Maymana (karakul-kauppa nomadien kanssa)
   *   Ghazni     — Ab-i Istada (yli 120 lintulajia)
   *   Ghor       — Firuzkoh (2 230 m, nimi vuoteen 2014 Chaghcharan)
   *   Hilmand    — Lashkari Bazar (South Palace 170 x 100 m)
   *   Hirat      — Musalla complex (viisi minareettia, 1417)
   *   Jawzjan    — Tillya Tepe (1978, noin 20 600 esinettä)
   *   Kabul      — Gardens of Babur
   *   Kandahar   — Kandahar Province (granaattiomenat)
   *   Kapisa     — Kapisa Province (pienin; Panini, Kapiśayana)
   *   Khost      — Khost ("Khost Bowl", kesäsateet)
   *   Kunar      — Chitral River (480 km, Chiantar-jäätikkö)
   *   Laghman    — First Aramaic inscription of Laghman (1969)
   *   Logar      — Logar River; Logar Province (maantiede)
   *   Nangarhar  — Hadda, Afghanistan (noin 23 000 veistosta)
   *   Nimroz     — Nimruz Province (nimen merkitys)
   *   Nuristan   — Nuristan Province (nimi, vuoristometsät)
   *   Paktika    — Paktika Province (Gomal River)
   *   Paktya     — Paktia Province (etymologia, Herodotos)
   *   Parwan     — Salang Tunnel (2,6 km, lähes 3 400 m)
   *   Kunduz     — Kunduz Province (Kunduz-joen kastelu)
   *   Samangan   — Takht-e Rostam
   *   Sari Pul   — Sar-e-Pol, Afghanistan (nimi, Imam Yahyan pyhäkkö)
   *   Takhar     — Taloqan (Marco Polo 1275, suola)
   *   Uruzgan    — Tarinkot (1 317 m, tarin-päälliköt)
   *   Wardak     — Kabul River (Sanglakh, 14 000 ft, 700 km)
   *   Zabul      — Zabulistan (nimi; Zabol)
   */
  AFG: {
    Badakhshan: {
      lyhyt: 'Kokchan laakson Sar-e Sangin kaivoksista louhitaan yhä lapislatsulia, samaa sinistä kiveä, jota löytyi Tutankhamonin haudasta.',
    },
    Badghis: {
      lyhyt: 'Badghisin kuivat kukkulat saavat vetensä Murgab-joesta, joka virtaa maakunnan halki pohjoiseen Turkmenistaniin.',
    },
    Baghlan: {
      lyhyt: 'Pul-e Khumrin pohjoispuolelta Surkh Kotalin kukkulalta on kaivettu esiin kušaanien temppeli ja kuningas Kanishkan patsas.',
    },
    Balkh: {
      lyhyt: 'Mazar-i-Sharifin sinikaakeloitu Sininen moskeija on Pohjois-Afganistanin nouruz-kevätjuhlan keskipiste.',
    },
    Bamyan: {
      lyhyt: 'Bamyanin laakson itäpäässä, kahden joen yhtymäkohdan yllä, kohoavat Shahr-e Zuhakin eli Punaisen kaupungin linnoituksen rauniot.',
    },
    Farah: {
      lyhyt: 'Farah-joen varrella seisoo kaupungin vanha linnoitus, jonka arvellaan olevan alun perin Aleksanteri Suuren rakennuttama.',
    },
    Faryab: {
      lyhyt: 'Maymanan torilla Turkestanin vuorten juurella paimentolaiset käyvät yhä kauppaa karakul-lampaillaan.',
    },
    Ghazni: {
      lyhyt: 'Ghaznin Ab-i Istada on matala, välillä kokonaan kuivuva suolajärvi, jolla on tavattu yli 120 lintulajia flamingoista pelikaaneihin.',
    },
    Ghor: {
      lyhyt: 'Ghorin pääkaupunki Firozkoh, vuoteen 2014 Chaghcharan, on Hari-joen varrella 2 230 metrin korkeudessa.',
    },
    Hilmand: {
      lyhyt: 'Lashkargahin laidalla ovat Lashkari Bazarin rauniot, ghaznavidihallitsijoiden talvipalatsit, joista suurin on 170 metriä pitkä.',
    },
    Hirat: {
      lyhyt: 'Heratissa kohoaa yhä viisi Musallan minareettia, jäänteet kuningatar Gawhar Shadin vuonna 1417 aloittamasta rakennusryhmästä.',
    },
    Jawzjan: {
      lyhyt: 'Sheberghanin läheltä Tillya Tepen kummuista löytyi 1978 noin 20 600 korua ja muuta esinettä, jotka tunnetaan Baktrian kultana.',
    },
    Kabul: {
      lyhyt: 'Kabulin Babur-puutarhan terasseilla on Mogulivaltakunnan perustajan Baburin hauta, ja puutarhassa käy jopa miljoona vierasta vuodessa.',
    },
    Kandahar: {
      lyhyt: 'Kandahar tunnetaan maailmalla granaattiomenistaan, joita kasvatetaan Arghandab-joen kastelemissa hedelmätarhoissa.',
    },
    Kapisa: {
      lyhyt: 'Kapisa on Afganistanin pienin maakunta, ja jo muinaisintialaiset kirjoittajat kehuivat sen rypäleitä ja viiniä.',
    },
    Khost: {
      lyhyt: 'Khost on vuorten ympäröimässä laaksossa, jonne kaakosta puhaltavat kosteat tuulet tuovat kesällä sadetta.',
    },
    Kunar: {
      lyhyt: 'Kunar-joki saa alkunsa Pakistanin Chiantarin jäätiköltä ja virtaa Hindukušin sulamisvesien paisuttamana 480 kilometriä.',
    },
    Kunduz: {
      lyhyt: 'Kunduz-joki ja sen kanavat kastelevat peltoja, jotka hallitsevat koko maakunnan maisemaa.',
    },
    Laghman: {
      lyhyt: 'Laghmanista löytyi 1969 kallioon hakattu kirjoitus, jonka keisari Ashoka antoi kirjoittaa arameaksi noin 260 eaa.',
    },
    Logar: {
      lyhyt: 'Logar on saanut nimensä joesta, joka virtaa sen tasaisen laakson halki; laaksoa kehystävät jyrkät vuoret.',
    },
    Nangarhar: {
      lyhyt: 'Jalalabadin eteläpuolelta Haddasta on kaivettu esiin noin 23 000 kreikkalais-buddhalaista savi- ja kipsiveistosta.',
    },
    Nimroz: {
      lyhyt: 'Nimroz tarkoittaa persiaksi puolipäivää: nimen uskotaan kertovan, että vanhan maailman keskimeridiaani kulki täältä.',
    },
    Nuristan: {
      lyhyt: 'Nuristan tarkoittaa valon maata, ja suurinta osaa maakunnasta peittävät jyrkkien vuorten metsät.',
    },
    Paktika: {
      lyhyt: 'Paktikan vuorilta alkava Gomal-joki kääntyy Pakistanin puolelle ja päätyy lopulta Indukseen.',
    },
    Paktya: {
      lyhyt: 'Paktian nimen arvellaan juontuvan paktyes-kansasta, jonka Herodotos mainitsi jo 400-luvulla eaa.',
    },
    Parwan: {
      lyhyt: 'Parwanin Salangin solassa kulkee lähes 3 400 metrin korkeudessa 2,6 kilometrin tunneli, maan tärkein pohjois–eteläyhteys.',
    },
    Samangan: {
      lyhyt: 'Aibakin lähellä on kukkulan kallioon kokonaan hakattu 300–400-lukujen buddhalainen luostari ja stupa, Takht-e Rostam.',
    },
    "Sari Pul": {
      lyhyt: 'Sar-e Pol tarkoittaa sillanpäätä, ja maakunnan pääkaupungin itälaidalla on vanha Imam Yahyan pyhäkkö.',
    },
    Takhar: {
      lyhyt: 'Takharin pääkaupungin Taloqanin kautta kulki 1270-luvulla Marco Polo, joka kehui seudun vuorisuolaa maailman puhtaimmaksi.',
    },
    Uruzgan: {
      lyhyt: 'Uruzganin pääkaupunki Tarinkot on noin 1 300 metrin korkeudessa, ja tarin-heimon päälliköt asuivat siellä jo 1100–1200-luvuilla.',
    },
    Wardak: {
      lyhyt: 'Kabul-joki saa alkunsa Wardakin Sanglakhin vuorilta noin 4 300 metrin korkeudesta ja virtaa sieltä 700 kilometriä itään.',
    },
    Zabul: {
      lyhyt: 'Zabul on saanut nimensä muinaisesta Zabulistanista, ja Iranin puolella samasta nimestä on peräisin Zabolin kaupunki.',
    },
  },
  /*
   * MNG — nykymaakunnat (21 aimagia + Ulaanbaatar). Faktat
   * en-Wikipediasta 25.9.2026. Hüiten orgil, Gobi, Orhon (ja sen
   * Selenga–Baikal-yhteys, Harhorin), Amarbayasgalant, Bayanzag,
   * Hustain nuruu, peurakivet, Tövhön, Tsagaan agui, Tšingisin patsas
   * ja Hövsgöl-järvi ovat jo maastokohteina, joten niitä ei käytetty.
   *   Arhangay     — Terkhiin Tsagaan Lake (10 jokea sisään, Suman ulos)
   *   Bayan-Ölgiy  — Golden Eagle Festival
   *   Bayanhongor  — Bayankhongor Province (Shargaljuut, yli 300 lähdettä)
   *   Bulgan       — Uran Togoo – Tulga Uul Natural Monument
   *   Darhan-Uul   — Darkhan (city) (17.10.1961, Comecon)
   *   Dornod       — Buir Lake (Hulunbuir)
   *   Dornogovi    — Dornogovi Province (ei järviä eikä jokia)
   *   Dundgovi     — Dundgovi Province (airag)
   *   Govi-Altay   — Govi-Altai Province (harvimmin asuttu)
   *   Govĭ-Sümber  — Govisümber Province (pienin väkiluku, 1994)
   *   Hentiy       — Burkhan Khaldun; Khentii Province (Kerulen, Onon)
   *   Hovd         — Khovd Province (yli 17 kansallisuutta)
   *   Hövsgöl      — Dukha people (Mongolian ainoat poronhoitajat)
   *   Orhon        — Erdenet (1974, toiseksi suurin kaupunki)
   *   Selenge      — Sükhbaatar (city) (pohjoisin rata-asema)
   *   Sühbaatar    — Shiliin Bogd (kraatteri 2 km, yli 300 m)
   *   Töv          — Gorkhi-Terelj National Park (Turtle Rock)
   *   Ulaanbaatar  — Gandantegchinlen Monastery (26,5 m, 1996)
   *   Uvs          — Uvs Lake (3 350 km², 1,88 %)
   *   Dzavhan      — Otgontenger (ainoa pysyvä jäätikkö Hangaissa)
   *   Ömnögovi     — Yolyn Am (jääkenttä sulaa syyskuuhun mennessä)
   *   Övörhangay   — Arvaikheer (1 813 m, hevosjuhla)
   */
  MNG: {
    Arhangay: {
      lyhyt: 'Terkhiin Tsagaan -järveen laskee kymmenen jokea, mutta siitä lähtee vain yksi, Suman-joki.',
    },
    "Bayan-Ölgiy": {
      lyhyt: 'Ölgiin laitamilla järjestetään joka syksy Kultakotkajuhla, jossa kazakkimetsästäjät kilpailevat kotkiensa taidoilla.',
    },
    Bayanhongor: {
      lyhyt: 'Shargaljuutissa, 54 kilometriä maakunnan pääkaupungista pohjoiseen, pulppuaa yli 300 kuumaa ja kylmää lähdettä.',
    },
    Bulgan: {
      lyhyt: 'Bulganin sammuneet tulivuoret on nimetty tulisijan esineiden mukaan: Tulga-vuoren kolme kumpua muistuttavat padan kolmijalkaa.',
    },
    "Darhan-Uul": {
      lyhyt: 'Darhan perustettiin 1961 SEV-maiden tuella, ja sen suuret neliskanttiset kerrostalot muistuttavat yhä neuvostoajasta.',
    },
    Dornod: {
      lyhyt: 'Buir-järvi on jaettu Mongolian ja Kiinan kesken, ja rajan takana Hulunbuirin kaupunki on nimetty osin sen mukaan.',
    },
    Dornogovi: {
      lyhyt: 'Dornogovissa ei ole ainuttakaan järveä eikä jokea, mutta aavikon alla on runsaasti pohjavettä.',
    },
    Dundgovi: {
      lyhyt: 'Dundgovin kuivalla arolla tehdään airagia eli käynyttä tamman maitoa, jota mongolit pitävät erityisen hyvänä.',
    },
    Dzavhan: {
      lyhyt: 'Otgontenger on Hangain vuoriston ainoa huippu, jolla on pysyvä jäätikkö, ja valtio pitää sillä rituaalin joka neljäs vuosi.',
    },
    "Govi-Altay": {
      lyhyt: 'Govi-Altai on Mongolian harvimmin asuttu aimag: aavikkoa ja vuoria riittää, ihmisiä on vähän.',
    },
    "Govĭ-Sümber": {
      lyhyt: 'Govisümber on Mongolian väkiluvultaan pienin aimag, ja se erotettiin omaksi maakunnakseen Choirin ympärille vasta 1994.',
    },
    Hentiy: {
      lyhyt: 'Burkhan Khaldunia pidetään Mongolian pyhimpänä vuorena, ja sen rinteiltä saavat alkunsa Kerulen- ja Onon-joet.',
    },
    Hovd: {
      lyhyt: 'Hovdin maakunnassa asuu yli 17 kansallisuutta, joilla kullakin on omat asumuksensa, pukunsa ja laulunsa.',
    },
    "Hövsgöl": {
      lyhyt: 'Hövsgölin taigalla elävät dukhat, Mongolian ainoat porojen paimentajat.',
    },
    "Ömnögovi": {
      lyhyt: 'Yolyn Amin kapeassa rotkossa talven jää kasvaa metrien paksuiseksi ja sulaa yleensä vasta syyskuuhun mennessä.',
    },
    Orhon: {
      lyhyt: 'Erdenet perustettiin 1974 kuparikaivoksen ympärille, ja nyt se on Mongolian toiseksi suurin kaupunki.',
    },
    "Övörhangay": {
      lyhyt: 'Arvaikheerissa, 1 813 metrin korkeudessa Hangain juurella, järjestetään joka vuosi suuri alueellinen hevosjuhla.',
    },
    Selenge: {
      lyhyt: 'Maakunnan pääkaupunki Sühbaatar on Trans-Mongolian radan pohjoisin asema ennen Venäjän rajaa.',
    },
    "Sühbaatar": {
      lyhyt: 'Dariganga-alueen Shiliin Bogd on sammunut tulivuori, jonka kraatteri on kaksi kilometriä leveä ja yli 300 metriä syvä.',
    },
    "Töv": {
      lyhyt: 'Gorkhi-Tereljin kansallispuistossa, noin 60 kilometrin päässä Ulaanbaatarista, seisoo kallio, joka muistuttaa kilpikonnaa.',
    },
    Ulaanbaatar: {
      lyhyt: 'Gandanin luostarissa seisoo 26,5 metriä korkea kullattu Avalokiteshvara-patsas, joka vihittiin 1996.',
    },
    Uvs: {
      lyhyt: 'Uvs on pinta-alaltaan Mongolian suurin järvi, ja sen suolapitoisuus on noin puolet valtamerten suolapitoisuudesta.',
    },
  },
  /*
   * KAZ — nykymaakunnat (Natural Earthin vanha 14 alueen + 2 kaupungin
   * jako; vuoden 2018 ja 2022 uudet alueet puuttuvat). Faktat
   * en-Wikipediasta 25.9.2026. Khan Tengri, Araljärvi, Irtyš, Yasawin
   * mausoleumi, Tamgaly, Baikonur, Charynin kanjoni, Altyn-Emel,
   * Issykin kurgaani, Aisha Bibi ja Saryarka ovat jo maastokohteina,
   * joten niitä ei käytetty.
   *   Almaty           — Lake Kaindy (1911 maanjäristys)
   *   Almaty City      — Medeu (1 691 m)
   *   Aqmola           — Burabay National Park (tarina)
   *   Aqtöbe           — Aktobe Region; Khromtau (kromiitti)
   *   Astana           — Baiterek (monument) (97 m ~ 1997)
   *   Atyrau           — Atyrau (Ural-joki, Eurooppa–Aasia)
   *   East Kazakhstan  — Belukha Mountain
   *   Qyzylorda        — Kyzylorda (pääkaupunki 1925–1927)
   *   Mangghystau      — Mangystau Region (Karagiye −132 m)
   *   North Kazakhstan — Botai culture
   *   Pavlodar         — Bayanaul National Park (1985, ensimmäinen)
   *   Qaraghandy       — Lake Balkhash
   *   Qostanay         — Steppe Geoglyphs (Dey 2007)
   *   South Kazakhstan — Aksu-Zhabagly Nature Reserve
   *   West Kazakhstan  — Oral, Kazakhstan (1613, Puškin 1833)
   *   Zhambyl          — Akyrtas (45 km Tarazista itään)
   */
  KAZ: {
    Almaty: {
      lyhyt: 'Kaindy-järvi syntyi vuoden 1911 maanjäristyksen jälkeen, ja sen pinnasta nousee yhä upoksiin jääneiden kuusten rankoja.',
    },
    "Almaty City": {
      lyhyt: 'Almatyn yläpuolella 1 691 metrin korkeudessa on Medeun luistinrata, maailman suurin vuoristoon rakennettu kenttä.',
    },
    Aqmola: {
      lyhyt: 'Kazakkitarun mukaan jumala heitti Burabayn vuoret, metsät ja järvet keskelle aroa – nyt ne ovat kansallispuisto.',
    },
    "Aqtöbe": {
      lyhyt: 'Aqtöben alueen Khromtaussa louhitaan kromimalmia, ja alueen kromiittiesiintymät ovat IVY-maiden suurimmat.',
    },
    Astana: {
      lyhyt: 'Bayterek-tornin näköalatasanne on 97 metrin korkeudessa: luku viittaa vuoteen 1997, jolloin Astanasta tuli pääkaupunki.',
    },
    Atyrau: {
      lyhyt: 'Atyraun halki virtaa Ural-joki, jota pidetään Euroopan ja Aasian rajana, joten kaupunki on kahdessa maanosassa.',
    },
    "East Kazakhstan": {
      lyhyt: 'Belukha, Altain vuoriston korkein vuori, kohoaa Itä-Kazakstanin ja Venäjän rajalla yli 4 500 metriin.',
    },
    Mangghystau: {
      lyhyt: 'Mangghystaun Karagiye-painanne on 132 metriä merenpinnan alapuolella, Kazakstanin matalin kohta.',
    },
    "North Kazakhstan": {
      lyhyt: 'Botain kylästä on kaivettu esiin yli 150 kuoppatalon asuinpaikka, jonka luulöydöt ovat varhaisimpia merkkejä hevosten pidosta.',
    },
    Pavlodar: {
      lyhyt: 'Bayanaul perustettiin 1985 Kazakstanin ensimmäiseksi kansallispuistoksi, ja sen suurin järvi Sabyndykol tarkoittaa saippuajärveä.',
    },
    Qaraghandy: {
      lyhyt: 'Balkhaš-järven länsiosa on makeaa ja itäosa suolaista vettä, ja pohjoisrannalla on Balkhašin kaupunki.',
    },
    Qostanay: {
      lyhyt: 'Qostanayn aroilta löysi Dmitri Dey 2007 Google Earthin satelliittikuvista valtavia maahan kaivettuja kuvioita.',
    },
    Qyzylorda: {
      lyhyt: 'Qyzylorda oli Kazakstanin neuvostotasavallan pääkaupunki 1925–1927, ennen kuin hallinto siirtyi Almatyyn.',
    },
    "South Kazakhstan": {
      lyhyt: 'Aksu-Zhabaglyn luonnonsuojelualue Tian Shanin juurella on Keski-Aasian vanhin.',
    },
    "West Kazakhstan": {
      lyhyt: 'Oralin perustivat kasakat 1613, ja Aleksandr Puškin kävi kaupungissa 1833 keräämässä aineistoa Pugatšovin kapinasta.',
    },
    Zhambyl: {
      lyhyt: 'Tarazista 45 kilometriä itään ovat Akyrtasin rauniot, tummanpunaisesta hiekkakivestä rakennettu 700-luvun palatsi.',
    },
  },
  /*
   * UZB — nykymaakunnat (12 aluetta + Karakalpakstan; Taškentin
   * kaupunki ei ole omana alueenaan). Faktat en-Wikipediasta 25.9.2026.
   * Amudarja, Araljärvi, Itchan Kala, Shahrisabz, Moynaq, Nukusin
   * museo, Kampir Tepe, Ayaz-Kala, Kokand, Aydarjärvi ja Khazret Sultan
   * ovat jo maastokohteina, joten niitä ei käytetty.
   *   Andijon        — UzAuto Motors (Asaka, 1996, Chevrolet)
   *   Bukhoro        — Lab-i Hauz
   *   Ferghana       — Margilan (silkki)
   *   Jizzakh        — Zaamin National Park
   *   Karakalpakstan — Karakalpakstan (autonominen tasavalta)
   *   Namangan       — Namangan Region (puutarhat, Chustin veitset)
   *   Navoi          — Sarmishsay (noin 10 000 kalliopiirrosta)
   *   Kashkadarya    — Qarshi (nimi, kudotut matot)
   *   Samarkand      — Registan
   *   Sirdaryo       — Sirdaryo Region (Mirzachul, puuvilla)
   *   Surkhandarya   — Termez (Xuanzang, 600-luku)
   *   Tashkent       — Chimgan (85 km, laskettelukausi)
   *   Khorezm        — Urgench; al-Khwarizmin patsas
   */
  UZB: {
    Andijon: {
      lyhyt: 'Andijanin alueen Asakan tehtaalla on koottu autoja vuodesta 1996, ja nykyään niissä on Chevrolet-merkki.',
    },
    Bukhoro: {
      lyhyt: 'Buharan Lab-i Hauz on yksi kaupungin harvoista säilyneistä altaista, ja sen ympärillä ovat 1500–1600-lukujen madrasat.',
    },
    Ferghana: {
      lyhyt: 'Margilanissa on kudottu silkkiä antiikin ajoista asti, ja kaupungin verstaissa valmistetaan yhä silkkikankaita.',
    },
    Jizzakh: {
      lyhyt: 'Zaaminin kansallispuistossa Turkestanin vuorten pohjoisrinteellä katajametsät vaihtuvat ylempänä alppiniityiksi.',
    },
    Karakalpakstan: {
      lyhyt: 'Karakalpakstan on Uzbekistanin itsehallinnollinen tasavalta, jonka kieli ja kulttuuri ovat lähempänä kazakkeja kuin uzbekkeja.',
    },
    Kashkadarya: {
      lyhyt: 'Qarshin nimi tarkoittaa linnoitusta, ja kaupunki tunnetaan kudotuista nukattomista matoistaan.',
    },
    Khorezm: {
      lyhyt: 'Urgenchissa seisoo suuri patsas al-Khwarizmille, Khorezmista kotoisin olleelle matemaatikolle, jonka nimestä tulee sana algoritmi.',
    },
    Namangan: {
      lyhyt: 'Namanganin alue tunnetaan puutarhoistaan ja Chustin kaupungissa taotuista veitsistä.',
    },
    Navoi: {
      lyhyt: 'Sarmishsayn rotkossa Nuratan piirissä on noin 10 000 kalliopiirrosta, joista vanhimmat ovat kivikaudelta.',
    },
    Samarkand: {
      lyhyt: 'Samarkandin Registan-aukiota reunustaa kolme madrasaa, joista vanhin on Ulugh Begin 1417–1420 rakennuttama.',
    },
    Sirdaryo: {
      lyhyt: 'Suuri osa Sirdaryon alueesta on Mirzachulia eli Nälkäaroa, jonka kastelluilla pelloilla kasvaa puuvillaa ja viljaa.',
    },
    Surkhandarya: {
      lyhyt: 'Termezissä vieraili 600-luvulla kiinalainen munkki Xuanzang, joka kertoi kaupungissa olleen kymmenkunta luostaria ja tuhat munkkia.',
    },
    Tashkent: {
      lyhyt: 'Tashkentista 85 kilometriä itään Chimganin rinteillä lasketellaan joulukuusta maaliskuun puoliväliin.',
    },
  },
  /*
   * TKM — nykymaakunnat (5 welaýatia; Ashgabat ei omana alueenaan).
   * Faktat en-Wikipediasta 25.9.2026. Amudarja on jo maastokohteena.
   *   Ahal      — Darvaza gas crater (1971, 60–70 m)
   *   Balkan    — Garabogazköl (suolapitoisuus noin 35 %)
   *   Tashauz   — Kutlug Timur Minaret (60 m, 1011; Unesco 2005)
   *   Chardzhou — Lebap Region; Köýtendag (Aýrybaba 3 138 m)
   *   Mary      — Merv
   */
  TKM: {
    Ahal: {
      lyhyt: 'Karakumin aavikolla Darvazan kaasukraatteri on palanut vuodesta 1971, ja sen halkaisija on 60–70 metriä.',
    },
    Balkan: {
      lyhyt: 'Garabogazköl-laguunin veden suolapitoisuus on keskimäärin noin 35 prosenttia, noin kymmenkertainen valtameriin verrattuna.',
    },
    Chardzhou: {
      lyhyt: 'Köýtendagin vuorilla kohoaa Turkmenistanin korkein huippu Aýrybaba, 3 138 metriä.',
    },
    Mary: {
      lyhyt: 'Maryn lähellä ovat Mervin rauniot; 1100-luvulla Merv saattoi olla maailman suurin kaupunki.',
    },
    Tashauz: {
      lyhyt: 'Köneürgençin 60-metrinen Kutlug Timurin minareetti rakennettiin 1011, ja kaupungin rauniot ovat Unescon maailmanperintöä.',
    },
  },
  /*
   * KHM (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.KHM:n tunnuksia TÄSMÄLLEEN (24 aluetta; Tbong Khmum
   * sisältyy Kâmpóng Chamiin). Vain `lyhyt`. Maalla ei ole
   * maastokohteet-/fokuskohteet-tiedostoa. Lähteet (en-Wikipedia ja haku,
   * tarkistettu 25.9.2026):
   *   Bântéay Méanchey — Banteay Chhmar (Jayavarman VII, Lokeshvara)
   *   Batdâmbâng       — Phare Ponleu Selpak (1994)
   *   Kâmpóng Cham     — Kizuna Bridge (2001, ensimmäinen Mekong-silta)
   *   Kâmpóng Chhnang  — Kampong Chhnang province (nimen merkitys)
   *   Kâmpóng Spœ      — Oudong (pääkaupunki 1618–1866)
   *   Kâmpóng Thum     — Sambor Prei Kuk (Unesco 2017)
   *   Kâmpôt           — Kampot pepper (GI 2010)
   *   Kândal           — Koh Dach (silkkisaari, Mukh Kampul)
   *   Kaôh Kong        — Koh Kong (island) (103 km²)
   *   Kep              — Kep province (pienin, Kep-sur-Mer 1908)
   *   Krâchéh          — Kampin delfiinisuvanto (Mongabay 2026)
   *   Môndól Kiri      — Mondulkiri province (harvimmin asuttu)
   *   Otdar Mean Chey  — Oddar Meanchey province (1999, nimi)
   *   Krong Pailin     — Pailin province (jalokivet, longan)
   *   Phnom Penh       — Silver Pagoda (yli 5 000 hopealaattaa)
   *   Pouthisat        — Pursat province (Wat Bakan)
   *   Preah Vihéar     — Koh Ker (36 m, Unesco 2023)
   *   Prey Vêng        — Prey Veng province (laajin riisiala)
   *   Rôtânôkiri       — Lake Yeak Laom (noin 800 m)
   *   Krong Preah Sihanouk — Sihanoukville Autonomous Port
   *   Stœng Trêng      — Stung Treng province
   *   Svay Rieng       — Bavet (Ho Chi Minh City 70 km)
   *   Takêv            — Angkor Borei (Funan)
   *   Muut             — yleistietoa, tarkistettu vastaavista
   *                      en-Wikipedia-artikkeleista.
   */
  KHM: {
    'Bântéay Méanchey': {
      lyhyt: 'Banteay Chhmarin syrjäinen temppeli on Jayavarman VII:n rakennuttama, ja sen seinissä on harvinaisia monikätisiä Lokeshvara-reliefejä.',
    },
    'Batdâmbâng': {
      lyhyt: 'Battambangissa toimii vuonna 1994 perustettu Phare Ponleu Selpak -taidekoulu, jonka nuoret sirkustaiteilijat esiintyvät ulkomaillakin.',
    },
    'Kâmpóng Cham': {
      lyhyt: 'Kampong Chamin Kizuna-silta avattiin 2001, ja se oli ensimmäinen Kambodžaan Mekongin yli rakennettu silta.',
    },
    'Kâmpóng Chhnang': {
      lyhyt: 'Kampong Chhnang tarkoittaa khmeriksi ruukkusatamaa, ja maakunnan kylät tunnetaan yhä savenvalannastaan.',
    },
    'Kâmpóng Spœ': {
      lyhyt: 'Kampong Speun Oudong oli Kambodžan kuninkaallinen pääkaupunki vuodesta 1618 vuoteen 1866, jolloin hovi muutti Phnom Penhiin.',
    },
    'Kâmpóng Thum': {
      lyhyt: 'Sambor Prei Kukin tiilitemppelit olivat 600-luvulla Chenlan pääkaupunki Isanapura, ja ne ovat nyt Unescon maailmanperintöä.',
    },
    'Kâmpôt': {
      lyhyt: 'Kampotin pippuri sai vuonna 2010 ensimmäisenä kambodžalaisena tuotteena maantieteellisen alkuperäsuojan.',
    },
    'Kândal': {
      lyhyt: 'Koh Dachin saarella Mekongissa, noin kymmenen kilometrin päässä Phnom Penhistä, kudotaan silkkiä paalutalojen alle pystytetyillä kangaspuilla.',
    },
    'Kaôh Kong': {
      lyhyt: 'Koh Kong Krao on Kambodžan suurin saari, noin sata neliökilometriä enimmäkseen koskematonta sademetsää.',
    },
    Kep: {
      lyhyt: 'Kep on Kambodžan pienin maakunta, ja ranskalaiset perustivat sen rantalomakohteeksi nimellä Kep-sur-Mer vuonna 1908.',
    },
    'Krâchéh': {
      lyhyt: 'Kampin syvässä Mekongin suvannossa Kratien pohjoispuolella elää Mekongin viimeisiä irrawaddyndelfiinejä.',
    },
    'Môndól Kiri': {
      lyhyt: 'Mondulkiri on Kambodžan suurin mutta harvimmin asuttu maakunta, ja suurin osa asukkaista kuuluu bunongeihin tai muihin alkuperäiskansoihin.',
    },
    'Otdar Mean Chey': {
      lyhyt: 'Oddar Meanchey tarkoittaa voittoisaa pohjoista, ja maakunta perustettiin nykyisessä muodossaan vasta vuonna 1999.',
    },
    'Krong Pailin': {
      lyhyt: 'Pailin tunnetaan safiireistaan ja rubiineistaan, mutta nyt sen rinteillä kasvaa yhä enemmän longan-hedelmiä vientiin.',
    },
    'Phnom Penh': {
      lyhyt: 'Kuninkaanpalatsin Hopeapagodan lattia on päällystetty yli 5 000 hopealaatalla, joista kävijä näkee vain pienen osan.',
    },
    Pouthisat: {
      lyhyt: 'Pursatin Wat Bakan on Kambodžan vanhimpia yhä toiminnassa olevia pagodeja.',
    },
    'Preah Vihéar': {
      lyhyt: 'Koh Kerin seitsenportainen pyramiditemppeli kohoaa 36 metriin, ja muinainen pääkaupunki on Unescon maailmanperintöä vuodesta 2023.',
    },
    'Prey Vêng': {
      lyhyt: 'Prey Vengissä on Kambodžan maakunnista laajin riisinviljelyyn käytetty peltoala.',
    },
    'Rôtânôkiri': {
      lyhyt: 'Banlungin lähellä oleva Yeak Laom on lähes pyöreä, noin 800 metriä leveä kraatterijärvi keskellä metsää.',
    },
    'Siemréab': {
      lyhyt: 'Siem Reapin lähellä kohoava Angkor Wat on kambodžalaisille niin tärkeä, että sen siluetti on maan lipussa.',
    },
    'Krong Preah Sihanouk': {
      lyhyt: 'Sihanoukvillen satama on Kambodžan ainoa kansainvälinen syvänveden merisatama.',
    },
    'Stœng Trêng': {
      lyhyt: 'Stung Trengissä virtaavat Mekong, Sekong ja Sesan, ja Mekongin uomaa täplittävät sadat pienet saaret.',
    },
    'Svay Rieng': {
      lyhyt: 'Svay Riengin Bavet on vilkas raja-asema Vietnamiin, ja sieltä on Ho Chi Minh Cityyn vain noin 70 kilometriä.',
    },
    'Takêv': {
      lyhyt: 'Takeon Angkor Boreissa oli Funanin kuningaskunnan asutus ja ehkä sen pääkaupunki vuosisatoja ennen Angkoria.',
    },
  },
  /*
   * LAO (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.LAO:n tunnuksia TÄSMÄLLEEN (17 aluetta, vanha jako
   * ilman Xaisombounia; "Vientiane [prefecture]" on pääkaupunkiprefektuuri).
   * Vain `lyhyt`. Maalla ei ole maastokohteet-/fokuskohteet-tiedostoa.
   * Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Attapu          — Attapeu province (Xaysetha-stupa 1579)
   *   Bokeo           — Bokeo province (nimi = jalokivikaivos)
   *   Bolikhamxai     — Bolikhamsai province (Nam Kading)
   *   Houaphan        — Viengxay Caves (jopa 23 000 asukasta)
   *   Khammouan       — Tham Kong Lo (noin 7 km)
   *   Louang Namtha   — Nam Ha NPA (ASEAN Heritage Park, Equator 2006)
   *   Louangphrabang  — Tak bat (aamuinen almukierros)
   *   Oudômxai        — Oudomxay province (khmut enemmistö)
   *   Phôngsali       — Phongsali tea (Slow Food), Ban Komaen
   *   Saravan         — Tad Lo (Xe Set)
   *   Savannakhét     — Joshua Hoffet (löydöt 1936)
   *   Vientiane [prefecture] — Emblem of Laos (Pha That Luang)
   *   Xaignabouri     — Elephant Conservation Center (Nam Tien)
   *   Xékong          — Sekong province (pienin väkiluku, 14 kansaa)
   *   Xiangkhoang     — Plain of Jars (Unesco 2019)
   *   Muut            — yleistietoa, tarkistettu vastaavista
   *                     en-Wikipedia-artikkeleista.
   */
  LAO: {
    Attapu: {
      lyhyt: 'Attapeun kaupungin Xaysethan stupa on rakennettu jo vuonna 1579.',
    },
    Bokeo: {
      lyhyt: 'Bokeo tarkoittaa laoksi jalokivikaivosta, ja maakunta on nimetty Houayxain seudun safiirikaivosten mukaan.',
    },
    Bolikhamxai: {
      lyhyt: 'Nam Kadingin suojelualueen metsissä elävät valkoposkigibbonit ja kirjavat douc-apinat.',
    },
    Champasak: {
      lyhyt: 'Vat Phoun temppelirauniot vuoren juurella ovat khmerien ajalta, ja ne ovat olleet Unescon maailmanperintöä vuodesta 2001.',
    },
    Houaphan: {
      lyhyt: 'Vieng Xain kalkkikiviluolissa asui sodan vuosina jopa 23 000 ihmistä, ja luolissa toimi sairaala, koulu ja jopa teatteri.',
    },
    Khammouan: {
      lyhyt: 'Nam Hinboun -joki virtaa Kong Lon luolan läpi noin seitsemän kilometriä, ja luolan voi kulkea läpi pitkähäntäveneellä.',
    },
    'Louang Namtha': {
      lyhyt: 'Nam Han suojelualue on ASEAN-perintöpuisto, ja sen ekomatkailuhanke sai Equator-palkinnon vuonna 2006.',
    },
    Louangphrabang: {
      lyhyt: 'Luang Prabangissa munkit kulkevat joka aamu ennen auringonnousua kaduilla, ja asukkaat antavat heille almuksi tahmeaa riisiä.',
    },
    'Oudômxai': {
      lyhyt: 'Oudomxain asukkaista suurin osa on khmuja, yksi maakunnan noin neljästätoista kansanryhmästä.',
    },
    'Phôngsali': {
      lyhyt: 'Phongsalyn Komaenin kylässä kasvaa satoja vuosia vanhoja, jopa kuusimetrisiä teepuita.',
    },
    Saravan: {
      lyhyt: 'Salavanin Tad Lo on Xe Set -joen leveä, porrastettu vesiputous Bolavenin ylätasangon laidalla.',
    },
    'Savannakhét': {
      lyhyt: 'Savannakhetin dinosaurusmuseossa on luita, joita ranskalainen geologi Josué Hoffet löysi maakunnan itäosista vuonna 1936.',
    },
    Vientiane: {
      lyhyt: 'Vang Viengin jyrkät kalkkikivivuoret kohoavat Nam Song -joen rannalta ja houkuttelevat kiipeilijöitä ja melojia.',
    },
    'Vientiane [prefecture]': {
      lyhyt: 'Pha That Luangin kullattu stupa on Laosin kansallinen symboli, ja se näkyy valtion vaakunassa ja seteleissä.',
    },
    Xaignabouri: {
      lyhyt: 'Sainyabulin Nam Tien -järven rannalla toimii norsujen suojelukeskus, jonne on tuotu norsuja metsätöistä.',
    },
    'Xékong': {
      lyhyt: 'Sekong on Laosin väkiluvultaan pienin maakunta, mutta siellä asuu 14 kansanryhmää, ja laoja on vain muutama prosentti.',
    },
    Xiangkhoang: {
      lyhyt: 'Purkkien tasangolla on yli kaksituhatta rautakautista kivipurkkia, ja alue on Unescon maailmanperintöä vuodesta 2019.',
    },
  },
  /*
   * MMR (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.MMR:n tunnuksia TÄSMÄLLEEN (14 aluetta). Vain
   * `lyhyt`, neutraali sävy (maisema, kulttuuri, historia). Vältetty
   * maastokohteet-mmr.js:n aiheet (Bagan, Mrauk U, Beikthano, Kyaiktiyo,
   * Pindaya, Pyin Oo Lwin, Mawlamyine, Shwebo, Hkakabo Razi, Inle,
   * Chindwin). Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Ayeyarwady  — Pathein hti
   *   Bago        — Shwethalyaung Buddha (55 m, 1881)
   *   Chin        — Nat Ma Taung, Natmataung National Park (2010)
   *   Kachin      — Manaw (festival), Myitkyina
   *   Kayah       — Taung Kwe Pagoda
   *   Kayin       — Mount Zwegabin (722 m)
   *   Magway      — Minbu (mutatulivuoret)
   *   Mandalay    — U Bein Bridge (1 209 m)
   *   Mon         — Win Sein Tawya (180 m)
   *   Rakhine     — Ngapali Beach
   *   Sagaing     — Mingun Bell (90 t, 2000)
   *   Shan        — Taunggyi Hot Air Balloon Festival
   *   Tanintharyi — Mergui Archipelago (noin 800 saarta, mokenit)
   *   Yangon      — Shwedagon Pagoda (76 karaatin timantti)
   */
  MMR: {
    Ayeyarwady: {
      lyhyt: 'Patheinissa tehdään käsin värikkäitä bambusta ja paperista tai puuvillasta valmistettuja päivänvarjoja, jotka tunnetaan koko Myanmarissa.',
    },
    Bago: {
      lyhyt: 'Bagon Shwethalyaung on 55 metriä pitkä makaava Buddha, jonka brittiläiset rautatietyöläiset löysivät uudelleen vuonna 1881.',
    },
    Chin: {
      lyhyt: 'Nat Ma Taung eli Victoria-vuori on Chinin osavaltion korkein huippu, ja sitä ympäröivä kansallispuisto perustettiin 2010.',
    },
    Kachin: {
      lyhyt: 'Myitkyinan Manau-juhlassa tuhannet kachinit tanssivat tammikuussa korkeiden, kuvioin maalattujen manau-paalujen ympärillä.',
    },
    Kayah: {
      lyhyt: 'Loikawin Taung Kwe -pagodi on rakennettu rosoisten kalkkikivihuippujen päälle, ja nimi tarkoittaa haljennutta vuorta.',
    },
    Kayin: {
      lyhyt: 'Hpa-Anin lähellä kohoava Zwegabin-vuori on 722 metriä korkea, ja sen juurella istuu riveissä yli tuhat Buddha-patsasta.',
    },
    Magway: {
      lyhyt: 'Minbun mutatulivuoret ovat harmaita savikumpuja, joista pulppuava muta on kylmää, koska sen nostaa pintaan maakaasu.',
    },
    Mandalay: {
      lyhyt: 'Amarapuran U Bein -silta on noin 1,2 kilometriä pitkä, ja sitä pidetään maailman vanhimpana ja pisimpänä tiikkisiltana.',
    },
    Mon: {
      lyhyt: 'Mudonin lähellä makaava Win Sein Taw Ya -Buddha on 180 metriä pitkä, ja sen sisällä on huoneita täynnä Buddhan opetuksia esittäviä kuvaelmia.',
    },
    Rakhine: {
      lyhyt: 'Ngapalin hiekkaranta Bengalinlahden rannalla Thandwen lähellä on Myanmarin tunnetuimpia rantakohteita.',
    },
    Sagaing: {
      lyhyt: 'Mingunin kello painaa noin 90 tonnia, ja se oli maailman suurin soiva kello, kunnes Kiinassa valettiin suurempi vuonna 2000.',
    },
    Shan: {
      lyhyt: 'Taunggyissa lasketaan joka marraskuu kuumailmapalloja Tazaungdaing-juhlan kunniaksi, ja yöpalloja koristellaan kynttilöin.',
    },
    Tanintharyi: {
      lyhyt: 'Myeikin saaristossa on noin 800 saarta, ja sen vesillä elävät mokenit, jotka viettävät kuivan kauden veneissään.',
    },
    Yangon: {
      lyhyt: 'Shwedagonin pagodi on päällystetty aidoilla kultalevyillä, ja sen kärjessä on 76 karaatin timantti.',
    },
  },
  /*
   * BTN (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.BTN:n tunnuksia TÄSMÄLLEEN (20 aluetta, vanhat
   * kirjoitusasut: Geylegphug = Sarpang, Samchi = Samtse, Tongsa =
   * Trongsa jne.). Vain `lyhyt`. Maalla ei ole maastokohteet-/
   * fokuskohteet-tiedostoa. Lähteet (en-Wikipedia ja haku, tarkistettu
   * 25.9.2026):
   *   Bumthang         — Jampa Lhakhang, Jambay Lhakhang Drup
   *   Chhukha          — Chhukha Hydropower Plant (DGPC, 1986)
   *   Daga             — Dagana District (Daga Dzong 1651)
   *   Gasa             — Layap, Laya (noin 3 820 m)
   *   Geylegphug       — Gelephu Mindfulness City (17.12.2023)
   *   Ha               — Lhakhang Karpo ja Nagpo (kyyhkytaru)
   *   Lhuntshi         — Khoma, kishuthara (Lhuentse Dzongkhag)
   *   Mongar           — Mongar Dzong (ilman nauloja ja piirustuksia)
   *   Pemagatsel       — Pemagatshel District (Yongla Goenpa)
   *   Samdrup Jongkhar — Samdrup Jongkhar District
   *   Samchi           — Samtse District (Samtse College of Education)
   *   Thimphu          — ei liikennevaloja (BhutanWiki, Wego)
   *   Tashigang        — Sakteng Wildlife Sanctuary (migoi)
   *   Tashi Yangtse    — Chorten Kora (noin 1740)
   *   Tongsa           — Penlop of Trongsa
   *   Chirang          — Tsirang District
   *   Wangdi Phodrang  — Phobjikha Valley (mustakaulakurjet)
   *   Shemgang         — Gee's golden langur
   *   Muut             — yleistietoa, tarkistettu vastaavista
   *                      en-Wikipedia-artikkeleista.
   */
  BTN: {
    Bumthang: {
      lyhyt: 'Jambay Lhakhangin syysjuhlassa kävijät hyppäävät liekkien yli puhdistautuakseen, ja temppeli on Bhutanin vanhimpia.',
    },
    Chhukha: {
      lyhyt: 'Chukhan vesivoimala valmistui 1986 Bhutanin ensimmäiseksi suureksi voimalaksi, ja suurin osa sen sähköstä myydään Intiaan.',
    },
    Daga: {
      lyhyt: 'Daga Dzongin perusti vuonna 1651 Bhutanin yhdistäjä Zhabdrung Ngawang Namgyal, ja se on yhä piirin hallinnon keskus.',
    },
    Gasa: {
      lyhyt: 'Gasan Layan kylä on noin 3 800 metrin korkeudessa, ja sen naiset käyttävät kartiomaisia bambuhattuja, joiden huipussa on piikki.',
    },
    Geylegphug: {
      lyhyt: 'Gelephuun rakennetaan Mindfulness Cityä, uutta talousaluetta, jonka Bhutanin kuningas julisti vuonna 2023.',
    },
    Ha: {
      lyhyt: 'Haan laaksossa on valkoinen ja musta temppeli, joiden paikat tarun mukaan valitsivat valkoinen ja musta kyyhky.',
    },
    Lhuntshi: {
      lyhyt: 'Lhuentsen Khoman kylässä kudotaan kishuthara-silkkiä, ja monimutkaisimman kuvion tekeminen voi viedä vuoden.',
    },
    Mongar: {
      lyhyt: 'Mongarin dzong rakennettiin 1900-luvulla vanhaan tapaan, ilman ainuttakaan naulaa ja ilman piirustuksia.',
    },
    Paro: {
      lyhyt: 'Taktsang eli Tiikerinpesä on luostari, joka riippuu jyrkänteellä satoja metrejä Paron laakson yläpuolella.',
    },
    Pemagatsel: {
      lyhyt: 'Pemagatshelin Yongla-luostari perustettiin 1700-luvulla vuorenhuipulle, jonka muodon sanotaan muistuttavan rituaalitikaria.',
    },
    Punakha: {
      lyhyt: 'Punakhan dzong seisoo Pho Chhun ja Mo Chhun yhtymäkohdassa, ja jokien nimet tarkoittavat isä- ja äitijokea.',
    },
    'Samdrup Jongkhar': {
      lyhyt: 'Samdrup Jongkharin kaupunki on Bhutanin kaakkoiskulman portti, josta tie jatkuu rajan yli Intian Assamiin.',
    },
    Samchi: {
      lyhyt: 'Samtsessa toimii Bhutanin kuninkaalliseen yliopistoon kuuluva opettajakorkeakoulu, jossa koulutetaan maan opettajia.',
    },
    Thimphu: {
      lyhyt: 'Thimphu on maailman ainoa pääkaupunki ilman liikennevaloja: risteyksissä liikennettä ohjaa valkohanskainen poliisi.',
    },
    Tashigang: {
      lyhyt: 'Trashigangin Sakteng on maailman ainoa suojelualue, joka perustettiin osin suojelemaan lumimiehen eli migoin elinympäristöä.',
    },
    'Tashi Yangtse': {
      lyhyt: 'Chorten Koran stupa rakennettiin noin 1740 Nepalin Boudhanathin mallin mukaan, jottei pyhiinvaeltajien tarvitsisi matkata Nepaliin.',
    },
    Tongsa: {
      lyhyt: 'Bhutanin kruununperillinen saa perinteisesti Trongsan penlopin eli maaherran arvonimen ennen kuninkaaksi nousuaan.',
    },
    Chirang: {
      lyhyt: 'Tsirang tunnetaan loivista rinteistään ja leudosta ilmastostaan, ja sen halki virtaa Punatsang Chhu, yksi Bhutanin pisimmistä joista.',
    },
    'Wangdi Phodrang': {
      lyhyt: 'Phobjikhan laaksoon saapuu lokakuun lopulla talvehtimaan satoja mustakaulakurkia Tiibetin ylängöltä.',
    },
    Shemgang: {
      lyhyt: 'Zhemgangin metsissä elää kultalanguri, apina jota tavataan vain Bhutanissa ja Intian Assamissa.',
    },
  },
  /*
   * TLS (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8B). Avaimet ovat
   * MAAKUNNAT_KAIKKI.TLS:n tunnuksia TÄSMÄLLEEN (13 aluetta; Ambeno =
   * Oecusse). Vain `lyhyt`. Vältetty maastokohteet-tls.js:n aiheet
   * (Cristo Rei, Maubara, Balibo, Lailin luola, Baucaun kaupunki, Baguia,
   * Viqueque-kaupunki, Nino Konis Santana, Matebian, Ataúro,
   * Timorinmeri). Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Aileu      — Aileu Municipality (nimen merkitys)
   *   Ainaro     — Tatamailau (Neitsyt Marian patsas 1997)
   *   Baucau     — Venilale (Fatuk Kuak Hitu, seitsemän luolaa)
   *   Bobonaro   — Marobo hot springs
   *   Cova Lima  — Suai Airport (20.6.2017)
   *   Dili       — Tais, Unesco USL 2021
   *   Ermera     — Ermera Municipality (kahvi)
   *   Lautém     — Lautém Municipality (fataluku)
   *   Liquica    — Liquiçá Municipality (tokodede)
   *   Manatuto   — Manatuto Municipality (kaksi rannikkoa)
   *   Manufahi   — East Timorese rebellion of 1911–1912
   *   Ambeno     — Oecusse (Lifau)
   *   Viqueque   — Viqueque Municipality (suurin pinta-ala)
   */
  TLS: {
    Aileu: {
      lyhyt: 'Aileun nimi tarkoittaa mambain kielellä taipunutta puuta, ja tarun mukaan se viittaa oudon muotoiseen viikunapuuhun.',
    },
    Ainaro: {
      lyhyt: 'Ramelau eli Tatamailau on Timorin saaren korkein vuori, ja sen huipulla seisoo vuonna 1997 pystytetty Neitsyt Marian patsas.',
    },
    Baucau: {
      lyhyt: 'Venilalen rinteissä on seitsemän tunnelia, jotka Japanin armeija kaivoi toisen maailmansodan aikana.',
    },
    Bobonaro: {
      lyhyt: 'Marobon kuumat lähteet täyttävät vuoristolaakson kylpyaltaita, ja niiden vieressä on vanhan kylpylän kiviraunioita.',
    },
    'Cova Lima': {
      lyhyt: 'Suain lentoasema vihittiin käyttöön vuonna 2017, ja se on osa etelärannikon laajaa Tasi Mane -rakennushanketta.',
    },
    Dili: {
      lyhyt: 'Dilissä myydään käsin kudottuja tais-kankaita, jotka Unesco merkitsi vuonna 2021 kiireellisesti suojeltavaksi perinnöksi.',
    },
    Ermera: {
      lyhyt: 'Ermera on Itä-Timorin tärkein kahvinviljelyalue, ja korkeimmat viljelmät ovat lähes kahden kilometrin korkeudessa.',
    },
    'Lautém': {
      lyhyt: 'Lautémissa puhutaan fatalukua, papualaista kieltä, jota puhuu noin 30 000 ihmistä saaren itäpäässä.',
    },
    Liquica: {
      lyhyt: 'Liquiçássa lähes kaikki asukkaat puhuvat tetumin ja portugalin lisäksi omaa tokodede-kieltään.',
    },
    Manatuto: {
      lyhyt: 'Manatuto on toinen Itä-Timorin kahdesta kunnasta, jotka ulottuvat saaren poikki pohjoisrannikolta etelärannikolle.',
    },
    Manufahi: {
      lyhyt: 'Manufahin liurai Dom Boaventura johti 1911–1912 kapinaa, jota pidetään viimeisenä suurena kansannousuna portugalilaisia vastaan.',
    },
    Ambeno: {
      lyhyt: 'Oecusse on Indonesian Länsi-Timorin ympäröimä erillisalue, ja sen Lifau oli portugalilaisten ensimmäisiä tukikohtia Timorissa.',
    },
    Viqueque: {
      lyhyt: 'Viqueque on pinta-alaltaan Itä-Timorin suurin kunta, ja sen etelärannikon tasangoilla viljellään riisiä.',
    },
  },
  /*
   * GEO (Sisältökirjuri 25.9.2026, Fablen tilaus, erä 8C). Avaimet
   * MAAKUNNAT_KAIKKI.GEO:n tunnuksia TÄSMÄLLEEN, kopioitu koneellisesti.
   * Vain `lyhyt`. Abhasiasta ja Šida Kartlista vain maisema ja
   * kulttuuri. Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Abkhazia        — Veryovkina Cave (Arabika)
   *   Ajaria          — Ali and Nino (Batumi, Kvesitadze)
   *   Guria           — Georgian polyphony (krimanchuli)
   *   Imereti         — Gelati Monastery (David IV)
   *   Kakheti         — Qvevri (Unesco 2013)
   *   Kvemo Kartli    — Dmanisi hominins
   *   Mtskheta-Mt.    — Gergeti Trinity Church
   *   Racha-Lechkhumi — Khvanchkara (wine)
   *   Samegrelo-ZS    — Upper Svaneti (Unesco 1996)
   *   Samtskhe-Jav.   — Vardzia
   *   Shida Kartli    — Uplistsikhe
   *   Tbilisi         — Abanotubani
   */
  GEO: {
    Abkhazia: {
      lyhyt: 'Arabikan kalkkikivivuoristossa on Verjovkinan luola, maailman syvin tunnettu luola, joka ulottuu yli 2 200 metrin syvyyteen.',
    },
    Ajaria: {
      lyhyt: 'Batumin rantabulevardilla kaksi kahdeksanmetristä teräsveistosta, Ali ja Nino, liukuvat iltaisin hitaasti toistensa läpi.',
    },
    Guria: {
      lyhyt: 'Gurian moniäänisessä laulussa ylin ääni, krimantšuli, jodlaa kiemurrellen muiden äänten yläpuolella.',
    },
    Imereti: {
      lyhyt: 'Gelatin luostarin perusti kuningas Daavid Rakentaja 1106, ja hänet haudattiin portin alle, jotta kävijät astuisivat hänen ylitseen.',
    },
    Kakheti: {
      lyhyt: 'Kakhetissa viini käytetään yhä maahan upotetuissa saviruukuissa, kvevreissä, ja menetelmä on Unescon aineetonta kulttuuriperintöä.',
    },
    "Kvemo Kartli": {
      lyhyt: 'Dmanisista on kaivettu noin 1,8 miljoonaa vuotta vanhoja ihmisen sukulaisten kalloja, vanhimpia Afrikan ulkopuolelta löydettyjä.',
    },
    "Mtskheta-Mtianeti": {
      lyhyt: 'Stepantsmindan yllä 2 170 metrin korkeudessa seisoo Gergetin kolminaisuuskirkko, ja sen takana kohoaa lumihuippuinen Kazbek.',
    },
    "Racha-Lechkhumi-Kvemo Svaneti": {
      lyhyt: 'Ratšan Khvantškarassa tehdään luonnostaan puolimakeaa punaviiniä aleksandrouli- ja mudžuretuli-rypäleistä.',
    },
    "Samegrelo-Zemo Svaneti": {
      lyhyt: 'Ylä-Svanetin vuoristokylissä kohoaa keskiaikaisia kivisiä puolustustorneja, ja laakso on Unescon maailmanperintöä.',
    },
    "Samtskhe-Javakheti": {
      lyhyt: 'Vardzian luostarikaupunki hakattiin 1100-luvun lopulla kuningatar Tamaran aikana Erušetivuoren jyrkkään kallioseinään.',
    },
    "Shida Kartli": {
      lyhyt: 'Uplistsikhe on Mtkvari-joen yllä kallioon hakattu muinainen kaupunki, jonka vanhimmat osat ovat varhaiselta rautakaudelta.',
    },
    Tbilisi: {
      lyhyt: 'Tbilisin nimi juontuu sanasta tbili, lämmin, ja Abanotubanin kupolikylpylöissä kylvetään yhä kuumassa rikkivedessä.',
    },
  },
  /*
   * ARM (erä 8C). Avaimet MAAKUNNAT_KAIKKI.ARM:n tunnuksia TÄSMÄLLEEN
   * ("Erevan"). Vain `lyhyt`. Araratin vuori on jo TUR/Iğdır-rivillä,
   * joten Ararat-maakunnassa Khor Virap. Lähteet (en-Wikipedia):
   *   Aragatsotn — Mount Aragats; Ararat — Khor Virap; Armavir —
   *   Etchmiadzin Cathedral; Gegharkunik — Sevanavank; Erevan —
   *   Erebuni Fortress; Kotayk — Garni Temple; Lori — Haghpat/Sanahin;
   *   Shirak — Gyumri (huumori); Syunik — Wings of Tatev; Tavush —
   *   Dilijan/Haghartsin; Vayots Dzor — Areni-1 shoe
   */
  ARM: {
    Aragatsotn: {
      lyhyt: 'Nelihuippuinen Aragats nousee 4 090 metriin, ja se on Armenian nykyisten rajojen sisällä korkein vuori.',
    },
    Ararat: {
      lyhyt: 'Khor Virapin luostarin maanalaisessa kuopassa Gregorius Valaistaja oli perimätiedon mukaan vankina 13 vuotta.',
    },
    Armavir: {
      lyhyt: 'Vagharšapatin Etšmiadzinin katedraali rakennettiin 300-luvun alussa, ja se on Armenian apostolisen kirkon äitikirkko.',
    },
    Gegharkunik: {
      lyhyt: 'Sevanjärvi on noin 1 900 metrin korkeudessa, ja sen niemellä seisoo vuonna 874 perustettu Sevanavankin luostari.',
    },
    Erevan: {
      lyhyt: 'Jerevan laskee syntynsä vuoteen 782 eaa., jolloin urartulaiset rakensivat Erebunin linnoituksen nykyisen kaupungin laidalle.',
    },
    Kotayk: {
      lyhyt: 'Garnin pylväiden kehystämä temppeli ensimmäiseltä vuosisadalta on ainoa kreikkalais-roomalainen temppeli entisen Neuvostoliiton alueella.',
    },
    Lori: {
      lyhyt: 'Debed-joen rotkon yllä seisovat Haghpatin ja Sanahinin keskiaikaiset luostarit, jotka ovat Unescon maailmanperintöä.',
    },
    Shirak: {
      lyhyt: 'Gjumria kutsutaan Armenian huumorin pääkaupungiksi, ja sen asukkaiden sutkaukset kiertävät koko maassa.',
    },
    Syunik: {
      lyhyt: 'Tatevin köysirata kulkee 5 752 metriä Vorotan-joen rotkon yli, ja se on yksi maailman pisimmistä yhtäjaksoisista köysiradoista.',
    },
    Tavush: {
      lyhyt: 'Dilijanin metsäisiä vuoria kutsutaan Armenian Sveitsiksi, ja läheinen Haghartsinin luostari kätkeytyy metsän keskelle.',
    },
    "Vayots Dzor": {
      lyhyt: 'Arenin luolasta löytyi 2008 noin 5 500 vuotta vanha nahkakenkä, vanhin tunnettu lähes ehjänä säilynyt kenkä.',
    },
  },
  /*
   * AZE (erä 8C). Avaimet ovat Natural Earthin vanhoja (ennen 2021)
   * talousalueita TÄSMÄLLEEN. Vain `lyhyt`. Kalbajar-Lachinista,
   * Yukhari Garabakhista ja Naxçıvanista vain maisema ja kulttuuri.
   * Lähteet (en-Wikipedia ja haku, tarkistettu 25.9.2026):
   *   Absheron — Yanar Dag; Aran — Shirvan National Park (2003);
   *   Daghlig Shirvan — Lahij; Ganja-Gazakh — Nizami Mausoleum;
   *   Guba-Khachmaz — Khinalug; Kalbajar-Lachin — Istisu resort;
   *   Lankaran — Hyrcanian Forests (Unesco 2023); Naxçıvan — Momine
   *   Khatun Mausoleum (1186); Shaki-Zaqatala — Palace of Shaki Khans;
   *   Yukhari Garabakh — Karabakh horse
   */
  AZE: {
    "Absheron Economic Region": {
      lyhyt: 'Abšeronin niemimaalla Yanar Dagin rinteessä palaa maasta purkautuva maakaasu liekkeinä yötä päivää.',
    },
    "Aran Economic Region": {
      lyhyt: 'Kura-joen alavalla tasangolla Širvanin kansallispuistossa elää tuhansia struumagaselleja, Kaukasian suurin kanta.',
    },
    "Daghlig Shirvan Economic Region": {
      lyhyt: 'Lahıcin vuoristokylässä kupariseppien verstaat takovat yhä kattiloita ja kannuja kivetyn pääkadun varrella.',
    },
    "Ganja-Gazakh Economic Region": {
      lyhyt: 'Gandžassa on 1100-luvun runoilijan Nizami Gandžavin mausoleumi; hän kirjoitti persiaksi runoelman Leila ja Madžnun.',
    },
    "Guba-Khachmaz Economic Region": {
      lyhyt: 'Xınalıqin kylässä yli 2 300 metrin korkeudessa puhutaan omaa kieltä, jota ei puhuta missään muualla.',
    },
    "Kalbajar-Lachin Economic Region": {
      lyhyt: 'Kəlbəcərin vuorilla yli 2 000 metrin korkeudessa pulppuavat Istisun lähes 60-asteiset mineraalilähteet.',
    },
    "Lankaran Economic Region": {
      lyhyt: 'Talyšvuorten Hyrkanian metsät ovat jäänne esihistoriallisesta lehtimetsästä, ja ne ovat Unescon maailmanperintöä.',
    },
    "Naxçıvan Autonomous Republic": {
      lyhyt: 'Naxçıvanin Möminə Xatunin mausoleumi valmistui 1186, ja sen kymmenkulmaista tiilitornia koristavat turkoosit kuviot.',
    },
    "Shaki-Zaqatala Economic Region": {
      lyhyt: 'Šekin kaanien palatsin ikkunoiden šebeke-lasimosaiikki on koottu puusta ja lasista ilman ainuttakaan naulaa tai liimaa.',
    },
    "Yukhari Garabakh Economic Region": {
      lyhyt: 'Karabahin hevonen on sitkeä ja nopea vuoristorotu, ja se on Azerbaidžanin kansalliseläin.',
    },
  },
  /*
   * YEM (erä 8C). Avaimet MAAKUNNAT_KAIKKI.YEM:n tunnuksia TÄSMÄLLEEN
   * (myös "`Adan", "Sa`dah", "Ta`izz"). Vain `lyhyt`, ei sotaa eikä
   * politiikkaa. Vältetty maastokohteet-yem.js:n aiheet (Nabi Shu'ayb,
   * Sokotra, Shibam, Zabid, Maribin pato, Tarim, Jibla, Baraqish, Thula,
   * al-Hajjarah). Lähteet (en-Wikipedia, Archnet, haku 25.9.2026):
   *   Abyan — Wadi Bana; Adan — Crater; Al Bayda' — Amiriya Madrasa;
   *   Al Dali' — Jabal Jahaf; Al Jawf — Qarnawu; Al Mahwit — Shibam
   *   Kawkaban; Amran — Shaharah Bridge; Dhamar — Hammam Ali;
   *   Hadramawt — Wadi Do'an sidr; Hajjah — Kuhlan Affar; Hudaydah —
   *   Bayt al-Faqih; Ibb — Ibb Governorate; Lahij — Ahmed Fadhl
   *   al-Qumindan; Mahrah — Mehri; Ma'rib — Temple of Awwam; Raymah —
   *   Raymah Governorate; Sa'dah — Al-Hadi Mosque; Shabwah — Bir Ali /
   *   Qana; Sana'a — Dar al-Hajar; Amanat Al Asimah — Old City of
   *   Sana'a; Ta'izz — Ashrafiya Mosque
   */
  YEM: {
    Abyan: {
      lyhyt: 'Abyanin suistossa Wadi Banan tulvavedet johdetaan pelloille, ja ennen itsenäisyyttä seutu oli tunnettu puuvillastaan.',
    },
    "`Adan": {
      lyhyt: 'Adenin vanhin kaupunginosa, Crater, on rakennettu sammuneen tulivuoren kraatteriin meren rannalle.',
    },
    "Al Bayda'": {
      lyhyt: "Rada'n valkoinen al-Amirijan madrasa valmistui 1504, ja sen kunnostus kesti yli kaksikymmentä vuotta.",
    },
    "Al Dali'": {
      lyhyt: 'Jahaf-vuoren ylätasangolla on yli 360 lähdettä ja kaivoa, ja vuoren korkein huippu kohoaa 2 401 metriin.',
    },
    "Al Jawf": {
      lyhyt: 'Al-Jawfin laaksossa ovat Qarnawun rauniot; kaupunki oli muinaisen minealaisten kuningaskunnan pääkaupunki.',
    },
    "Al Mahwit": {
      lyhyt: 'Kawkabanin linnoituskylä on jyrkänteen päällä lähes 3 000 metrin korkeudessa, ja sen alla laaksossa on Šibamin kaksoiskaupunki.',
    },
    Amran: {
      lyhyt: 'Šaharan 1600-luvulla rakennettu kivisilta ylittää syvän rotkon noin 2 600 metrin korkeudessa ja yhdistää kaksi vuorikylää.',
    },
    Dhamar: {
      lyhyt: 'Hammam Alin kylpyläkylä on syntynyt Dhawran-vuoren rinteen lukuisten kuumien rikkilähteiden ympärille.',
    },
    Hadramawt: {
      lyhyt: "Wadi Do'anin vuorilla mehiläiset keräävät sidr-puiden kukista hunajaa, jota pidetään yhtenä maailman kalleimmista.",
    },
    Hajjah: {
      lyhyt: 'Kuhlanin linnoitus kyyhöttää kuin kotkanpesä noin 2 400 metrin huipulla Hajjahin vuorten keskellä.',
    },
    "Al Hudaydah": {
      lyhyt: 'Bayt al-Faqih oli pitkään Jemenin kahvikaupan keskus, ja sen perjantaimarkkinat kokoavat väkeä koko Tihaman tasangolta.',
    },
    Ibb: {
      lyhyt: 'Ibbin vuoristo saa Jemenin runsaimmat sateet, ja siksi sitä kutsutaan vihreäksi maakunnaksi.',
    },
    Lahij: {
      lyhyt: 'Lahijin runoilija ja säveltäjä Ahmad Fadl al-Qumandan loi nykyaikaisen lahjilaisen musiikin, yhden Jemenin päätyyleistä.',
    },
    "Al Mahrah": {
      lyhyt: 'Mahrassa puhutaan mehriä, muinaista eteläarabialaista kieltä, joka ei ole arabian murre vaan oma kielensä.',
    },
    "Ma'rib": {
      lyhyt: 'Maribin Awwamin temppeli tunnetaan myös Saban kuningattaren nimellä Mahram Bilqis, ja se on Unescon maailmanperintöä.',
    },
    Raymah: {
      lyhyt: 'Raiman vuoret nousevat lähes 3 000 metriin, ja niiden pengerrinteillä viljellään sadeveden varassa kahvia.',
    },
    "Sa`dah": {
      lyhyt: "Sa'dan al-Hadin moskeija on 800-luvulta, ja sen viereisen haudan kupoli on Jemenin vanhin tunnettu hautakupoli.",
    },
    Shabwah: {
      lyhyt: 'Bir Alin rannalla mustan laavakallion Husn al-Ghurabin juurella oli muinainen Qana, Arabian tärkein suitsukesatama.',
    },
    "Sana'a": {
      lyhyt: 'Wadi Dharin kallion päälle rakennettu Dar al-Hajar oli imaami Yahyan kesäpalatsi.',
    },
    "Amanat Al Asimah": {
      lyhyt: 'Sanaan vanhan kaupungin tornitalojen ikkunoiden yllä on qamarija-kaari-ikkunoita, joissa valo siivilöityy alabasterin tai värilasin läpi.',
    },
    "Ta`izz": {
      lyhyt: 'Taizzin Ashrafijan moskeija ja madrasa rakennettiin rasulidisulttaanien aikana, ja sen kaksoisminareetit näkyvät yli vanhan kaupungin.',
    },
  },
  /*
   * OMN (erä 8C). Avaimet MAAKUNNAT_KAIKKI.OMN:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Vältetty maastokohteet-omn.js:n aiheet (Jabal Shams,
   * Masirah, Bahla, Nizwan linnoitus, Bat, Sur, Sumhuram, Sharqiyan
   * hiekat, Nakhal, Musandam). Lähteet (en-Wikipedia ja haku):
   *   Al Batnah North — Sohar (Sindbad); Al Batnah South — Rustaq Fort;
   *   Al Buraymi — Al Khandaq Fort; Ad Dakhliyah — Nizwan karjatori;
   *   Al Wusta — Arabian oryx reintroduction (1982); Al Dhahira — As
   *   Sulaif; Ash Sharqiyah North — Ibra Women's Souq; Ash Sharqiyah
   *   South — Ras al Jinz; Dhofar — Khareef; Musandam — Kumzari;
   *   Muscat — Royal Opera House Muscat (2011)
   */
  OMN: {
    "Al Batnah North": {
      lyhyt: 'Soharia pidetään perimätiedon mukaan Tuhannen ja yhden yön merenkulkijan Sindbadin kotikaupunkina.',
    },
    "Al Batnah South": {
      lyhyt: 'Rustaqin linnoituksen vanhimmat osat ovat ajalta ennen islamia, ja 1600-luvulla sitä laajensivat Yaruba-imaamit.',
    },
    "Al Buraymi": {
      lyhyt: 'Buraimin keidas jatkuu rajan yli Arabiemiraattien Al Ainiin, ja vanhaa Khandaqin linnaa kiertää yhä kuiva vallihauta.',
    },
    "Ad Dakhliyah": {
      lyhyt: 'Nizwan perjantaiaamun karjamarkkinoilla vuohia ja lehmiä talutetaan ringissä ostajien edessä.',
    },
    "Al Wusta": {
      lyhyt: 'Jiddat al-Harasisin kivitasangolle vapautettiin 1982 arabianbeisoja, kun laji oli kuollut luonnosta sukupuuttoon.',
    },
    "Al Dhahira": {
      lyhyt: 'Ibrin laidalla on as-Sulaif, muurien ja vartiotornien ympäröimä savitiilikylä, jonka alitse kulkee falaj-kastelukanava.',
    },
    "Ash Sharqiyah North": {
      lyhyt: 'Ibran keskiviikkomarkkinoilla myyjät ja ostajat ovat naisia, ja kojuissa on hajuvesiä, kankaita ja hopeakoruja.',
    },
    "Ash Sharqiyah South": {
      lyhyt: 'Ras al-Jinzin rannoille nousee öisin vihreitä merikilpikonnia kaivamaan pesiään hiekkaan.',
    },
    Dhofar: {
      lyhyt: 'Kesäkuusta syyskuuhun khareef-monsuuni tuo Salalahin vuorille sumua ja tihkua, ja rinteet vihertyvät keskellä aavikkoa.',
    },
    Musandam: {
      lyhyt: 'Kumzarin kylässä puhutaan kumzaria, iranilaista kieltä, ja kylään pääsee lähinnä veneellä jyrkkien vuorten välistä.',
    },
    Muscat: {
      lyhyt: 'Muscatin kuninkaallinen oopperatalo avattiin 2011, ja se oli Persianlahden alueen ensimmäinen oopperatalo.',
    },
  },
  /*
   * ARE (erä 8C). Avaimet MAAKUNNAT_KAIKKI.ARE:n tunnuksia TÄSMÄLLEEN
   * ("Dubay", "Fujayrah", "Neutral Zone"). "Neutral Zone" on Natural
   * Earthin kaksi yhteishallintoaluetta Hattan lähellä (Fujairah–Sharjah
   * ja Ajman–Oman, NE:n note-kenttä). Vain `lyhyt`. Vältetty
   * maastokohteet-are.js:n aiheet. Lähteet (en-Wikipedia ja haku):
   *   Abu Dhabi — Louvre Abu Dhabi; Ajman — Emirate of Ajman; Dubay —
   *   Abra (boat); Fujayrah — Emirate of Fujairah; Ras Al Khaymah —
   *   Dhayah Fort; Sharjah — World Book Capital 2019; Umm Al Qaywayn —
   *   Siniyah Island
   */
  ARE: {
    "Abu Dhabi": {
      lyhyt: 'Louvre Abu Dhabin 180-metrinen kupoli on koottu 7 850 tähdestä, ja niiden läpi siivilöityvää valoa kutsutaan valosateeksi.',
    },
    Ajman: {
      lyhyt: 'Ajman on seitsemästä emiraatista pinta-alaltaan pienin, vain noin 260 neliökilometriä.',
    },
    Dubay: {
      lyhyt: 'Dubai Creekin yli pääsee yhä puisella abra-veneellä, ja matka Bur Dubaista Deiraan maksaa yhden dirhamin.',
    },
    Fujayrah: {
      lyhyt: 'Fujairah on ainoa emiraatti, jonka koko rannikko on Omaninlahdella eikä lainkaan Persianlahdella.',
    },
    "Neutral Zone": {
      lyhyt: 'Hajarvuorten karuissa laaksoissa Hattan lähellä on kaksi pientä aluetta, joita naapurit hallitsevat yhdessä.',
    },
    "Ras Al Khaymah": {
      lyhyt: 'Dhayahin linnake on emiraattien ainoa säilynyt kukkulalinnake, ja sen juurella viheriöi taatelipalmujen keidas.',
    },
    Sharjah: {
      lyhyt: 'Sharjah oli Unescon kirjapääkaupunki 2019, ja sen kansainvälisille kirjamessuille saapuu yli 1 500 kustantajaa.',
    },
    "Umm Al Qaywayn": {
      lyhyt: 'Siniyahin saarella pesii noin 15 000 sokotranmerimetsoparia, emiraattien suurin yhdyskunta.',
    },
  },
  /*
   * QAT (erä 8C). Avaimet MAAKUNNAT_KAIKKI.QAT:n tunnuksia TÄSMÄLLEEN
   * ("Ar Rayyān"). Vain `lyhyt`. Vältetty maastokohteet-qat.js:n
   * aiheet. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Al Daayen — Lusail Stadium; Al Khawr — Al Khor Island; Ar Rayyān —
   *   Education City; Madinat ach Shamal — Ar-Ru'ays; Al Wakrah — Al
   *   Janoub Stadium; Ad Dawhah — National Museum of Qatar; Umm Salal —
   *   Barzan Towers
   */
  QAT: {
    "Al Daayen": {
      lyhyt: 'Lusail on 2000-luvulla tyhjästä rakennettu kaupunki, ja sen stadionilla pelattiin jalkapallon MM-finaali 2022.',
    },
    "Al Khawr": {
      lyhyt: 'Al Khorin Purppurasaarella murskattiin yli 3 500 vuotta sitten miljoonia kotiloita purppuraväriksi.',
    },
    "Ar Rayyān": {
      lyhyt: 'Ar-Rayyanin Education Cityssä on kahdeksan ulkomaisen yliopiston kampus ja Qatarin kansalliskirjasto.',
    },
    "Madinat ach Shamal": {
      lyhyt: "Pohjoiskärjen Ar-Ru'ays oli ennen öljykautta yksi Qatarin tärkeimmistä kalastuskylistä.",
    },
    "Al Wakrah": {
      lyhyt: 'Al Wakrahin Al Janoub -stadionin katto muistuttaa dhow-veneiden purjeita, ja sen suunnitteli Zaha Hadidin toimisto.',
    },
    "Ad Dawhah": {
      lyhyt: 'Qatarin kansallismuseo avattiin Dohassa 2019, ja sen toisiinsa kiilautuvat kiekot jäljittelevät aavikkoruusun kidettä.',
    },
    "Umm Salal": {
      lyhyt: 'Umm Salal Mohammedin 16-metrisistä Barzan-torneista tähyiltiin laivoja ja ramadanin uutta kuuta.',
    },
  },
  /*
   * KWT (erä 8C). Avaimet MAAKUNNAT_KAIKKI.KWT:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Vältetty maastokohteet-kwt.js:n aiheet (Mutla,
   * Failaka, Bubiyan, Burgan ym.). Lähteet (en-Wikipedia ja haku):
   *   Al Ahmadi — Al Ahmadi, Kuwait; Al Asimah — Kuwait Towers;
   *   Al Farwaniyah — Farwaniya Governorate; Al Jahrah — Kuwait Red
   *   Fort; Hawalli — Kuwait Scientific Center; Mubarak Al-Kabeer —
   *   Mubarak Al-Kabeer (governorate)
   */
  KWT: {
    "Al Ahmadi": {
      lyhyt: 'Ahmadin kaupunki perustettiin öljylöytöjen myötä 1946, ja se on yhä Kuwait Oil Companyn kotipaikka.',
    },
    "Al Asimah": {
      lyhyt: 'Kuwait Towersin kolme tornia valmistuivat 1979, ja kahden tornin palloissa on vesisäiliöt.',
    },
    "Al Farwaniyah": {
      lyhyt: 'Farwaniya on Kuwaitin väkirikkain kuvernoraatti, ja sen alueella on maan kansainvälinen lentokenttä.',
    },
    "Al Jahrah": {
      lyhyt: 'Jahran Punaisen linnakkeen punertavia savitiiliseiniä alettiin rakentaa 1897 suojaamaan keitaan viljelmiä.',
    },
    Hawalli: {
      lyhyt: 'Salmiyan rannalla Scientific Centerin akvaariossa on 1,5 miljoonan litran allas haille ja rauskuille.',
    },
    "Mubarak Al-Kabeer": {
      lyhyt: 'Mubarak al-Kabirin kuvernoraatti erotettiin Hawallista 1999, ja se on nimetty Kuwaitin seitsemännen hallitsijan Mubarak Suuren mukaan.',
    },
  },
  /*
   * BHR (erä 8C). Avaimet MAAKUNNAT_KAIKKI.BHR:n tunnuksia TÄSMÄLLEEN
   * (Natural Earthin vanha viiden kuvernoraatin jako diakriitteineen,
   * "Al Wusţá" = vuonna 2014 lakkautettu Keskinen kuvernoraatti).
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Al Janūbīyah — Tree of Life (Bahrain); Al Manāmah — Bab al-Bahrain;
   *   Al Wusţá — A'ali (keskinen kuvernoraatti 2001–2014); Ash
   *   Shamālīyah — Barbar Temple; Al Muḩarraq — Bahrain Pearling Trail
   */
  BHR: {
    "Al Janūbīyah": {
      lyhyt: 'Aavikolla Jebel Dukhanin lähellä kasvaa Elämän puu, yli 400-vuotias yksinäinen puu, jonka vedensaanti on yhä arvoitus.',
    },
    "Al Manāmah": {
      lyhyt: 'Bab al-Bahrain -portti rakennettiin 1949 rantaan, mutta maantäyttöjen jälkeen se seisoo nyt kaukana merestä.',
    },
    "Al Wusţá": {
      lyhyt: "A'alin savenvalajat ovat rakentaneet verstaansa muinaisten hautakumpujen keskelle, ja osa polttaa astioita vanhoissa hautakammioissa.",
    },
    "Ash Shamālīyah": {
      lyhyt: 'Barbarin temppelit on rakennettu päällekkäin makean veden lähteen ympärille, ja vanhin niistä on noin 5 000 vuotta vanha.',
    },
    "Al Muḩarraq": {
      lyhyt: 'Muharraqin helmipolku kulkee 3,5 kilometriä helmikauppiaiden talojen ohi, ja se on Unescon maailmanperintöä.',
    },
  },
  /*
   * AGO (erä 9A). Avaimet MAAKUNNAT_KAIKKI.AGO:n tunnuksia TÄSMÄLLEEN
   * ("Bié", "Huíla", "Uíge" diakriitteineen). Vain `lyhyt`. Vältetty
   * maastokohteet-ago.js:n aiheet (Morro de Moco, Cuanza, M'banza-Kongo,
   * São Miguel, Kalandula, Quiçama, Iona, Moçâmedes, Benguelan rata,
   * Cuito Cuanavale). Lähteet (en-/pt-Wikipedia ja haku 25.9.2026):
   *   Bengo — Bengo Province (Angolatitan); Benguela — Lobito; Bié —
   *   Kuito; Cabinda — Cabinda Province; Cuando Cubango — Okavango River;
   *   Cuanza Norte — Church of Nossa Senhora da Victoria (Massangano);
   *   Cuanza Sul — Cachoeiras do Binga (verangola.net); Cunene — Cunene
   *   Province; Huambo — Huambo; Huíla — Tundavala Gap; Luanda — Ilha de
   *   Luanda; Lunda Norte — Dundo Museum; Lunda Sul — Catoca diamond mine;
   *   Malanje — Cangandala National Park; Moxico — Zambezi; Namibe —
   *   Welwitschia; Uíge — Uíge; Zaire — Soyo
   */
  AGO: {
    Bengo: {
      lyhyt: 'Bengosta kaivettiin Angolatitan adamastor, ensimmäinen Angolasta löydetty dinosauruksen luuranko.',
    },
    Benguela: {
      lyhyt: 'Lobiton satama on Afrikan parhaita luonnonsatamia, ja sitä suojaa noin viiden kilometrin mittainen hiekkasärkkä.',
    },
    "Bié": {
      lyhyt: 'Kuito on Bién ylängöllä lähes 1 700 metrin korkeudessa, ja siksi kaupungin vuoden keskilämpö on vain noin 18 astetta.',
    },
    Cabinda: {
      lyhyt: 'Cabinda on Angolan erillisalue: Kongon demokraattisen tasavallan kapea rannikkokaistale erottaa sen muusta maasta.',
    },
    "Cuando Cubango": {
      lyhyt: 'Cubango-joki virtaa täältä kohti Botswanaa, jossa se Okavangona levittäytyy Kalaharin suistoksi eikä koskaan saavu mereen.',
    },
    "Cuanza Norte": {
      lyhyt: 'Massanganon Nossa Senhora da Vitória -kirkko rakennettiin 1580-luvulla, ja se on Unescon maailmanperinnön alustavalla listalla.',
    },
    "Cuanza Sul": {
      lyhyt: 'Keve-joen Bingan putoukset Sumben lähellä ovat maakunnan suosituimpia retkikohteita, ja rannalla on piknikpaikkoja.',
    },
    Cunene: {
      lyhyt: 'Cunenen asukkaat ovat enimmäkseen ovambopaimentolaisia, jotka siirtävät karjalaumojaan laitumelta toiselle vuodenaikojen mukaan.',
    },
    Huambo: {
      lyhyt: 'Huambo perustettiin 1912 yli 1 700 metrin korkeuteen, ja siirtomaa-aikana kaupunki tunnettiin nimellä Nova Lisboa.',
    },
    "Huíla": {
      lyhyt: 'Lubangon lähellä Tundavalan rotkon reunalta putoaa noin tuhannen metrin jyrkänne alas tasangolle.',
    },
    Luanda: {
      lyhyt: 'Luandan Ilhalla on rantaravintoloita ja yökerhoja, ja sen Nossa Senhora do Cabo -kirkko oli portugalilaisten ensimmäinen Angolassa.',
    },
    "Lunda Norte": {
      lyhyt: 'Dundon museo avattiin 1936 Angolan ensimmäisenä museona, ja sen kokoelmissa on tuhansia tšokwe-kansan esineitä.',
    },
    "Lunda Sul": {
      lyhyt: 'Saurimon lähellä on Catocan timanttikaivos, maailman neljänneksi suurin, ja siellä louhitaan kimberliittipiippua.',
    },
    Malanje: {
      lyhyt: 'Cangandalan kansallispuisto perustettiin 1970 suojelemaan mustahevosantiloopin jättiläisalalajia, Angolan kansallista tunnusta.',
    },
    Moxico: {
      lyhyt: 'Sambesi syntyy Sambiassa, mutta ennen paluutaan se mutkittelee Moxicon kautta noin 240 kilometriä Angolan puolella.',
    },
    Namibe: {
      lyhyt: 'Namiben aavikolla kasvaa welwitschia, jolla on koko elämänsä ajan vain kaksi lehteä; vanhimmat yksilöt voivat olla 2 000-vuotiaita.',
    },
    "Uíge": {
      lyhyt: 'Noin 860 metrin korkeudella sijaitseva Uíge kasvoi 1950-luvulla Angolan kahvinviljelyn keskukseksi.',
    },
    Zaire: {
      lyhyt: 'Kongojoen suulla sijaitseva Soyo on nykyään Angolan suurinta öljyntuotantoaluetta.',
    },
  },
  /*
   * COD (erä 9A). Avaimet MAAKUNNAT_KAIKKI.COD:n tunnuksia TÄSMÄLLEEN
   * (Natural Earthin vanha 11 provinssin jako: "Bandundu", "Bas-Congo",
   * "Kinshasa City", "Orientale" ym.). Vain `lyhyt`. Vältetty
   * maastokohteet-cod.js:n aiheet (Stanley, Tanganjika, Kongo, Inga,
   * Boyoma, Virunga, Kahuzi-Biéga, Salonga, Garamba, Upemba, Lubumbashin
   * kaivokset). Lähteet (en-Wikipedia 25.9.2026):
   *   Bandundu — Lake Mai-Ndombe; Équateur — Mbandaka; Sud-Kivu — Idjwi;
   *   Kasaï-Occidental — Kuba textiles; Kasaï-Oriental — Mbuji-Mayi;
   *   Katanga — Katanga Cross; Bas-Congo — Matadi; Kinshasa City —
   *   Congolese rumba; Maniema — Kindu; Orientale — Okapi Wildlife
   *   Reserve; Nord-Kivu — Lake Kivu
   */
  COD: {
    Bandundu: {
      lyhyt: 'Mai-Ndombe-järven nimi tarkoittaa mustaa vettä, ja sadekaudella järvi voi paisua kaksin- tai kolminkertaiseksi.',
    },
    "Équateur": {
      lyhyt: 'Mbandakan kaupungintalolta on vain noin neljä kilometriä päiväntasaajalle, ja Stanley antoi paikalle 1883 nimen Équateurville.',
    },
    "Sud-Kivu": {
      lyhyt: 'Kivujärven Idjwi on Afrikan toiseksi suurin järvisaari, ja sinne pääsee veneellä Bukavusta.',
    },
    "Kasaï-Occidental": {
      lyhyt: 'Kuba-kansan miehet kutovat raffiakankaan, ja naiset kirjovat siihen samettimaisia geometrisia kuvioita.',
    },
    "Kasaï-Oriental": {
      lyhyt: 'Mbuji-Mayin nimi tarkoittaa tshilubaksi vuohivettä, ja kaupunki on rakentunut maailman suurimpiin kuuluvan timanttiesiintymän päälle.',
    },
    Katanga: {
      lyhyt: 'Katangan ristit, noin kilon painoiset ristinmuotoiset kupariharkot, kelpasivat maksuvälineinä vielä 1900-luvun alussa.',
    },
    "Bas-Congo": {
      lyhyt: 'Matadi tarkoittaa kikongoksi kiveä: kaupunki on rakennettu jyrkille rinteille, ja sinne asti valtamerilaivat pääsevät jokea ylös.',
    },
    "Kinshasa City": {
      lyhyt: 'Kongolainen rumba, Kinshasan tunnetuin musiikkityyli, lisättiin 2021 Unescon aineettoman kulttuuriperinnön luetteloon.',
    },
    Maniema: {
      lyhyt: 'Kindussa Lubumbashista tuleva rautatie päättyy Lualaba-joen rantaan, ja tavarat siirretään junasta jokiveneisiin.',
    },
    Orientale: {
      lyhyt: 'Iturin sademetsän okapireservaatissa elää tuhansia okapeja, kirahvin sukulaisia; se on Unescon maailmanperintöä vuodesta 1996.',
    },
    "Nord-Kivu": {
      lyhyt: 'Gomaan rajautuvan Kivujärven syvänteisiin on liuennut valtavasti metaania, jota voidaan pumpata ylös sähköntuotantoon.',
    },
  },
  /*
   * CMR (erä 9A). Avaimet MAAKUNNAT_KAIKKI.CMR:n tunnuksia TÄSMÄLLEEN
   * (ranskankieliset "Extrême-Nord", "Nord-Ouest" ym.). Vain `lyhyt`.
   * Vältetty maastokohteet-cmr.js:n aiheet (Kamerunvuori, Sanaga,
   * Foumban, Dja, Bimbia, Rhumsiki, Waza, Kribi, Korup, Ngaoundéré).
   * Lähteet (en-/fr-Wikipedia ja haku 25.9.2026):
   *   Adamaoua — Adamawa Plateau; Centre — Yaoundé; Est — Lobéké
   *   National Park; Extrême-Nord — Musgum mud huts; Littoral — La
   *   Nouvelle Liberté; Nord-Ouest — Fon of Bafut; Nord — Bénoué National
   *   Park; Sud — Campo Ma'an National Park; Sud-Ouest — Limbe Botanic
   *   Garden; Ouest — Bandjoun
   */
  CMR: {
    Adamaoua: {
      lyhyt: 'Adamawan ylänkö kohoaa keskimäärin tuhanteen metriin, ja sen ruohoisilla laitumilla karjankasvatus on pääelinkeino.',
    },
    Centre: {
      lyhyt: 'Yaoundéta kutsutaan seitsemän kukkulan kaupungiksi, ja noin 730 metrin korkeudessa se on rannikkoa viileämpi.',
    },
    Est: {
      lyhyt: 'Lobéken sademetsän aukeille, baihin, kerääntyy eläimiä kivennäispitoisen maan ja veden äärelle.',
    },
    "Extrême-Nord": {
      lyhyt: 'Musgum-kansan savimajat kohoavat jopa yhdeksään metriin, ja niiden kylkien kohokuviot toimivat rakentajien askelmina.',
    },
    Littoral: {
      lyhyt: 'Doualan Deïdon liikenneympyrässä seisoo La Nouvelle Liberté, 12-metrinen romumetallista koottu veistos vuodelta 1996.',
    },
    "Nord-Ouest": {
      lyhyt: 'Bafutin fonin palatsissa on Achum, pyramidimaisen olkikaton pyhäkkö, jonne saavat astua vain fon ja kylän arvohenkilöt.',
    },
    Nord: {
      lyhyt: 'Bénouén kansallispuisto on harvoja paikkoja, joissa voi nähdä jättiläisilandin, Afrikan suurimman antiloopin.',
    },
    Sud: {
      lyhyt: "Campo Ma'anin kansallispuistossa sademetsä ulottuu Atlantin rantaan asti Päiväntasaajan Guinean rajalla.",
    },
    "Sud-Ouest": {
      lyhyt: 'Limben kasvitieteellinen puutarha perustettiin 1892, ja sitä pidettiin aikanaan yhtenä maailman tärkeimmistä trooppisista puutarhoista.',
    },
    Ouest: {
      lyhyt: 'Bandjounin päällikkökunta on bamilekejen suurimpia, ja sen suuren majan olkikattoa kannattelevat veistetyt puupylväät.',
    },
  },
  /*
   * TCD (erä 9A). Avaimet MAAKUNNAT_KAIKKI.TCD:n tunnuksia TÄSMÄLLEEN
   * ("Ville de N'Djamena" suoralla heittomerkillä, "Guéra", "Ouaddaï",
   * "Tandjilé"). Vain `lyhyt`. Vältetty maastokohteet-tcd.js:n aiheet
   * (Emi Koussi, Tšadjärvi, Chari, Guelta d'Archei ja kalliomaalaukset,
   * Aloba, Ounianga, Zakouma, Fitri, Manda, Abéché ja Ouara, Iro).
   * Lähteet (en-/fr-Wikipedia ja haku 25.9.2026):
   *   Barh El Gazel — Bahr el-Ghazal (wadi in Chad); Batha — Ouadi
   *   Rimé-Ouadi Achim Faunal Reserve; Borkou — Bodélé Depression;
   *   Chari-Baguirmi — Massenya; Ennedi — Ennedi Plateau; Guéra —
   *   Hadjarai; Hadjer-Lamis — Hadjer-Lamis (fr) ja Hadjer el Hamis
   *   (haku); Kanem — dihé (Slow Food, UNESCO); Lac — Kuri cattle; Logone
   *   Occidental — Moundou; Logone Oriental — Chad–Cameroon pipeline;
   *   Mandoul — Mandoul Region; Mayo-Kebbi Est — Bongor (fr); Mayo-Kebbi
   *   Ouest — Gauthiot Falls; Moyen-Chari — Sarh; N'Djamena —
   *   N'Djamena; Ouaddaï — Wadai Sultanate; Salamat — Am Timan; Sila —
   *   Goz Beïda; Tandjilé — Laï (fr); Tibesti — Trou au Natron; Wadi
   *   Fira — Wadi Fira Region, Iriba
   */
  TCD: {
    "Barh El Gazel": {
      lyhyt: 'Bahr el Ghazal on kuiva uoma, jossa vesi virtaa vain harvoin rankkasateiden jälkeen, Tšadjärveltä poispäin kohti koillista.',
    },
    Batha: {
      lyhyt: 'Ouadi Rimé–Ouadi Achimin valtavalle suojelualueelle on vuodesta 2016 palautettu luonnosta hävinneitä sapelibeisoja.',
    },
    Borkou: {
      lyhyt: 'Bodélén painanne on maapallon pölyisimpiä paikkoja, ja sen tuulten nostama pöly lannoittaa Amazonin sademetsää Atlantin takana.',
    },
    "Chari-Baguirmi": {
      lyhyt: 'Massenya oli Baguirmin kuningaskunnan pääkaupunki, ja sen perinteinen hallitsija kantaa yhä mbang-arvonimeä.',
    },
    Ennedi: {
      lyhyt: 'Ennedin hiekkakivimassiivi merkittiin 2016 Unescon maailmanperintöluetteloon sekä luonnon- että kulttuurikohteena.',
    },
    "Guéra": {
      lyhyt: 'Guéran vuoristossa asuvia kansoja kutsutaan hadjaraiksi, kivien kansaksi, ja moni uskoo yhä margai-henkiin.',
    },
    "Hadjer-Lamis": {
      lyhyt: 'Alue on nimetty Hadjer el Hamisin kalliopilareista, jotka kohoavat noin sata metriä tasangolta Tšadjärven eteläpuolella.',
    },
    Kanem: {
      lyhyt: 'Kanemin lammista kanembunaiset kuorivat spirulinalevää ja kuivaavat sen dihé-kakuiksi; miehiä ei päästetä veteen.',
    },
    Lac: {
      lyhyt: 'Tšadjärven saarilla laiduntaa kuri-karjaa, jonka paksut, pullistuneet sarvet auttavat sitä uimaan saarelta toiselle.',
    },
    "Logone Occidental": {
      lyhyt: 'Moundou on Tšadin toiseksi suurin kaupunki, ja siellä pannaan Gala-olutta, maan suosituinta.',
    },
    "Logone Oriental": {
      lyhyt: 'Doban öljykentiltä lähtee 1 070 kilometriä pitkä putki, joka kuljettaa öljyn Kamerunin rannikolle.',
    },
    Mandoul: {
      lyhyt: 'Mandoulin savanneilla viljellään omavaraisviljelyn ohella puuvillaa, ja maakunnassa asuu useita sara-kansoja.',
    },
    "Mayo-Kebbi Est": {
      lyhyt: "Bongorista näkee joen yli Kamerunin puolelle Yagouaan, ja kaupunki on puolivälissä N'Djamenan ja Moundoun välillä.",
    },
    "Mayo-Kebbi Ouest": {
      lyhyt: "Mayo Kébbi -joen Gauthiot'n putoukset ovat Tšadin luonnonihme, vaikka ne laskevat yhteensä vain noin 17 metriä.",
    },
    "Moyen-Chari": {
      lyhyt: 'Sarh on Tšadin kolmanneksi suurin kaupunki, ja siirtomaa-aikana sen nimi oli Fort-Archambault.',
    },
    "Ville de N'Djamena": {
      lyhyt: "N'Djamenan nimi tarkoittaa arabiaksi lepopaikkaa, ja joen toisella puolella on kamerunilainen Kousséri.",
    },
    "Ouaddaï": {
      lyhyt: 'Ouaddain sulttaanikunnan perusti 1635 maba-kansan Abd al-Karim, ja sen sulttaania kutsutaan yhä kolakiksi.',
    },
    Salamat: {
      lyhyt: 'Bahr Salamat virtaa vain sadekaudella, ja kuivana aikana vettä kaivetaan uoman pohjaan tehdyistä kaivoista.',
    },
    Sila: {
      lyhyt: 'Sila-maakunnan pääkaupungin Goz Beïdan nimi tarkoittaa tšadinarabiaksi valkoista hiekkaa.',
    },
    "Tandjilé": {
      lyhyt: 'Maakunnan pääkaupunki Laï levittäytyy Logone-joen vartta, ja rantatasangoilla viljellään riisiä.',
    },
    Tibesti: {
      lyhyt: 'Trou au Natronin kalderan pohja on valkoisen natronikuoren peitossa, ja kuoppa on paikoin tuhat metriä syvä.',
    },
    "Wadi Fira": {
      lyhyt: 'Wadi Firassa savanni vaihtuu pohjoista kohti Saharan hiekaksi, ja Iriban asukkaat puhuvat zaghawan kieltä.',
    },
  },
  /*
   * SDS (erä 9A). Avaimet MAAKUNNAT_KAIKKI.SDS:n tunnuksia TÄSMÄLLEEN
   * (vanha kymmenen osavaltion jako). Vain `lyhyt`, ei konflikteja.
   * Vältetty maastokohteet-sds.js:n aiheet (Kinyeti, Valkoinen Niili,
   * Sudd, Gondokoro, Lado, Jonglein kanava, Boma ja kob-vaellus,
   * Bandingilo, Wau, Nzara ja zandet, Nimule). Lähteet (en-Wikipedia ja
   * haku 25.9.2026):
   *   Eastern Equatoria — Kapoeta; Jonglei — Jonglei State; Central
   *   Equatoria — Jebel Kujur (haku, 684 m); Lakes — Lake Yirol; Western
   *   Equatoria — Maridi County (CSRF); Western Bahr el Ghazal — Raja
   *   County (CSRF), Dar Fertit; Northern Bahr el Ghazal — Lol River;
   *   Unity — Bentiu; Warrap — Manute Bol; Upper Nile — Shilluk Kingdom
   */
  SDS: {
    "Eastern Equatoria": {
      lyhyt: 'Kapoetan tasangoilla toposat paimentavat karjaa, kun taas didingat viljelevät kosteampia kukkuloita.',
    },
    Jonglei: {
      lyhyt: 'Jonglei oli Etelä-Sudanin kymmenen osavaltion jaossa pinta-alaltaan suurin, noin 122 600 neliökilometriä.',
    },
    "Central Equatoria": {
      lyhyt: 'Jubaa katsoo Jebel Kujur, lähes 700-metrinen kalliovuori, jonka huipulle kiivetään jyrkkiä polkuja pitkin.',
    },
    Lakes: {
      lyhyt: 'Osavaltio on nimetty järviensä mukaan, ja Yirolin järven rannoilla on riisipeltoja ja soita.',
    },
    "Western Equatoria": {
      lyhyt: 'Länsi-Ekvatorian metsissä mehiläistenhoito ja hunajankeruu ovat monelle perheelle tärkeä elinkeino.',
    },
    "Western Bahr el Ghazal": {
      lyhyt: 'Ragan seudulla asuu kymmeniä pieniä kansoja, joista monet kutsuvat itseään yhteisnimellä fertit.',
    },
    "Northern Bahr el Ghazal": {
      lyhyt: 'Lol-joki syntyy Nyamlellin länsipuolella kahden joen yhtymäkohdassa ja virtaa Aweilin ohi sen eteläpuolelta.',
    },
    Unity: {
      lyhyt: 'Bentiu on Bahr el Ghazal -joen etelärannalla, ja El Salaam -silta yhdistää sen vastarannan Rubkonaan.',
    },
    Warrap: {
      lyhyt: 'Warrapin Turaleista oli kotoisin Manute Bol, yksi NBA:n kahdesta kaikkien aikojen pisimmästä pelaajasta.',
    },
    "Upper Nile": {
      lyhyt: 'Shillukien kuninkaalla, rethillä, on yhä perinteinen asema, ja kuninkaiden asuinpaikka on ollut Fashodassa 1700-luvulta asti.',
    },
  },
  /*
   * SDN (erä 9A). Avaimet MAAKUNNAT_KAIKKI.SDN:n tunnuksia TÄSMÄLLEEN
   * (englanninkieliset "Gezira", "Red Sea", "Northern" ym.). Vain
   * `lyhyt`, ei konflikteja. Vältetty maastokohteet-sdn.js:n aiheet
   * (Jebel Marra, Punainenmeri, Niili, Meroë, Jebel Barkal, Kerma, Vanha
   * Dongola, Soleb, Naqa, Dinder, Sennarin kaupunki) ja pelikaupunki
   * Suakin. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Gezira — Gezira Scheme; Gedarif — Al Qadarif State (haku); Red
   *   Sea — Sanganeb and Dungonab Bay (UNESCO 2016); White Nile — Kenana
   *   Sugar Company; Blue Nile — Roseires Dam; Northern — Merowe Dam;
   *   Southern Darfur — Radom National Park; South Kordufan — Nuba
   *   wrestling; Eastern Darfur — Ed Daein; Kassala — Taka Mountains;
   *   Central Darfur — Zalingei (haku); Khartoum — Hamed al-Nil (haku);
   *   Western Darfur — Geneina; River Nile — Atbara (haku); North
   *   Darfur — Meidob volcanic field, Malha; North Kordufan — El-Obeid;
   *   Sennar — Gezira Scheme (Sennar Dam 1925)
   */
  SDN: {
    Gezira: {
      lyhyt: 'Gezira-hanke on maailman suurimpia kastelujärjestelmiä, ja se kattaa noin puolet Sudanin kastellusta maasta.',
    },
    Gedarif: {
      lyhyt: 'Gedarifin savitasangoilla viljellään koneellisesti durraa ja seesamia, ja seutua kutsutaan Sudanin leipäkoriksi.',
    },
    "Red Sea": {
      lyhyt: 'Dungonabin lahdella elää yksi maailman merkittävimmistä dugongikannoista, ja lahti on Unescon maailmanperintöä.',
    },
    "White Nile": {
      lyhyt: 'Kenanan sokeriplantaasi Kostin kaakkoispuolella on maailman suurimpia valkoisen sokerin tuottajia.',
    },
    "Blue Nile": {
      lyhyt: 'Roseiresin pato Ed Damazinissa valmistui 1966, ja 2013 sitä korotettiin 68 metristä 78 metriin.',
    },
    Northern: {
      lyhyt: 'Neljännen kaihin kohdalle valmistui 2009 Meroween pato, jonka voimalan teho on 1 250 megawattia.',
    },
    "Southern Darfur": {
      lyhyt: 'Radomin kansallispuisto Sudanin lounaiskulmassa on ollut Unescon biosfäärialue vuodesta 1979.',
    },
    "South Kordufan": {
      lyhyt: 'Nubavuorten kylät kilpailevat painiturnauksissa, jotka liittyvät kylvö- ja sadonkorjuujuhliin.',
    },
    "Eastern Darfur": {
      lyhyt: 'Itä-Darfurin pääkaupungin Ed Daeinin toreilla käydään kauppaa maapähkinöillä, vehnällä ja karjalla.',
    },
    Kassala: {
      lyhyt: 'Kassalan yllä kohoavat Takan graniittivuoret, joiden juurella kahvilat ja kojut odottavat retkeilijöitä.',
    },
    "Central Darfur": {
      lyhyt: 'Zalingei on Wadi Azumin laaksossa, ja sadekaudella kuiva uoma muuttuu vihreäksi käytäväksi.',
    },
    Khartoum: {
      lyhyt: 'Omdurmanissa Hamed al-Nilin haudalla sufeilla on tapana kokoontua perjantaisin ennen auringonlaskua zikr-rituaaliin.',
    },
    "Western Darfur": {
      lyhyt: 'Geneinan nimi tarkoittaa arabiaksi puutarhaa, ja sadekaudella seudulle syntyy lampia ja järviä.',
    },
    "River Nile": {
      lyhyt: 'Atbara-joen ja Niilin yhtymäkohdassa oleva Atbara on Sudanin rautateiden päämaja, ja sitä kutsutaan rautatiekaupungiksi.',
    },
    "North Darfur": {
      lyhyt: 'Meidobin kukkuloilla Malhan kraatterin pohjalla on suolainen järvi, ja nimi Malha tarkoittaa suolaista.',
    },
    "North Kordufan": {
      lyhyt: 'El Obeid on Sudanin arabikumikaupan tärkeitä keskuksia; kumi on akaasiapuiden kovettunutta mahlaa.',
    },
    Sennar: {
      lyhyt: 'Sennarin pato valmistui Siniselle Niilille 1925, ja sen altaasta johdetaan vettä Gezira-tasangon kanaviin.',
    },
  },
  /*
   * MDG (erä 9B). Avaimet MAAKUNNAT_KAIKKI.MDG:n tunnuksia TÄSMÄLLEEN
   * (22 aluetta; Vatovavy-Fitovinany on yhä yksi alue, vaikka se
   * jaettiin 2021 kahtia). Vain `lyhyt`. Lähteet (en-Wikipedia ja haku
   * 25.9.2026): Amoron'i Mania — Ambositra; Androy — Androy; Anosy —
   * Tôlanaro; Analamanga — Rova of Antananarivo; Bongolava —
   * Tsiroanomandidy; Vakinankaratra — Antsirabe; Itasy — Lake Itasy;
   * Atsimo-Andrefana — Toliara; Atsimo-Atsinanana — Canal des
   * Pangalanes; Betsiboka — Betsiboka River; Boeny — Ankarafantsika
   * National Park; Diana — Nosy Be; Haute Matsiatra — Ambalavao;
   * Ihorombe — Ihorombe; Melaky — Barren Isles; Menabe — Malagasy giant
   * rat; Sava — Sava Region; Sofia — Sofia Region; Analanjirofo —
   * Analanjirofo (nimen merkitys hausta); Atsinanana — Toamasina;
   * Alaotra-Mangoro — Lake Alaotra; Vatovavy-Fitovinany —
   * Fianarantsoa-Côte Est railway
   */
  MDG: {
    "Amoron'i Mania": {
      lyhyt: 'Ambositra on Madagaskarin puunveiston keskus, ja lähikylien zafimaniry-kansan puutyötaito on Unescon aineetonta kulttuuriperintöä.',
    },
    Androy: {
      lyhyt: 'Androyn nimi käännetään yleensä piikkimaaksi, ja sen asukkaat tandroyt ovat nimensä mukaan piikkipensaikon kansaa.',
    },
    Anosy: {
      lyhyt: 'Tolagnaroa kutsutaan yhä myös Fort-Dauphiniksi: kaupunki sai alkunsa 1643 Ranskan ensimmäisenä siirtokuntana Madagaskarilla.',
    },
    Analamanga: {
      lyhyt: 'Antananarivon korkeimmalla kukkulalla kohoaa kuningattaren palatsi Manjakamiadana, joka on rakennettu uudelleen vuoden 1995 tulipalon jälkeen.',
    },
    Bongolava: {
      lyhyt: 'Tsiroanomandidyssa on Madagaskarin suurin zebutori, ja karjakauppa tuo kaupungille yli kolmanneksen sen verotuloista.',
    },
    Vakinankaratra: {
      lyhyt: 'Antsirabe on Madagaskarin kolmanneksi suurin kaupunki, ja sen kaduilla kulkee tuhansia pousse-pousse-riksoja.',
    },
    Itasy: {
      lyhyt: 'Itasyjärvi syntyi, kun laavavirta patosi joen, ja sen ympäristöä kirjovat yhä vanhat tuhkakartiot.',
    },
    "Atsimo-Andrefana": {
      lyhyt: 'Toliaraa kutsutaan auringon kaupungiksi, ja siltä on saanut nimensä myös pörröinen coton de tuléar -koirarotu.',
    },
    "Atsimo-Atsinanana": {
      lyhyt: 'Farafanganaan päättyy Pangalanesin kanava, yli 600 kilometrin laguunien ja järvien ketju, joka alkaa Toamasinasta.',
    },
    Betsiboka: {
      lyhyt: 'Betsiboka-joki kuljettaa niin paljon punaista lietettä, että sen värjäämä suisto näkyy avaruuteen asti.',
    },
    Boeny: {
      lyhyt: 'Ankarafantsikan kansallispuiston kuivissa metsissä elää kahdeksan lemurilajia ja yli sata lintulajia.',
    },
    Diana: {
      lyhyt: 'Nosy Be on Madagaskarin vilkkain lomasaari, ja ylang-ylang-viljelmiensä vuoksi sitä kutsutaan tuoksujen saareksi.',
    },
    "Haute Matsiatra": {
      lyhyt: 'Ambalavaon verstaissa valmistetaan yhä käsin antaimoro-paperia mulperipuun kuoresta.',
    },
    Ihorombe: {
      lyhyt: 'Ihorombe on Madagaskarin harvimmin asuttuja alueita, ja sen asukkaista neljä viidestä on bara-kansaa.',
    },
    Melaky: {
      lyhyt: 'Maintiranon edustan Barren-saarilla leiriytyy kausittain vezo-kalastajia, jotka purjehtivat sinne jopa 600 kilometrin päästä.',
    },
    Menabe: {
      lyhyt: 'Kirindyn metsässä elää jättiloikkarotta, jota ei tavata luonnossa missään muualla kuin tällä pienellä Menaben kaistaleella.',
    },
    Sava: {
      lyhyt: 'Savan nimi on koottu sen neljän kaupungin alkukirjaimista, ja alue tuottaa enemmän vaniljaa kuin mikään muu seutu maailmassa.',
    },
    Sofia: {
      lyhyt: 'Sofian rannikolla on Madagaskarin tihein mangrovemetsien keskittymä, yhteensä noin 450 neliökilometriä.',
    },
    Analanjirofo: {
      lyhyt: 'Analanjirofo tarkoittaa neilikkametsää, ja valtaosa Madagaskarin mausteneilikasta kasvatetaan täällä.',
    },
    Atsinanana: {
      lyhyt: 'Toamasina on Madagaskarin tärkein satama ja saaren toiseksi suurin kaupunki.',
    },
    "Alaotra-Mangoro": {
      lyhyt: 'Alaotrajärvi on Madagaskarin suurin järvi, ja sen ruovikoissa elää alaotranbambulemuri, jota ei tavata missään muualla.',
    },
    "Vatovavy-Fitovinany": {
      lyhyt: 'Manakarassa Fianarantsoasta tuleva rautatie ylittää lentokentän kiitotien, mikä on maailmassa hyvin harvinaista.',
    },
  },
  /*
   * MOZ (erä 9B). Avaimet MAAKUNNAT_KAIKKI.MOZ:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Cabo Delgado — Ibo Island; Gaza — Limpopo National Park;
   *   Inhambane — Bazaruto Archipelago; Manica — Chimoio (Cabeça do
   *   Velho); Maputo — Maputo National Park; Nampula — Island of
   *   Mozambique; Niassa — Niassa Reserve (haku); Sofala — Port of
   *   Beira; Tete — Samora Machel Bridge; Zambezia — Gurúè
   */
  MOZ: {
    "Cabo Delgado": {
      lyhyt: 'Quirimbasin saariston Ibo tunnetaan hopeasepistään, ja mantereelta saarelle kuljetaan perinteisillä dhow-veneillä.',
    },
    Gaza: {
      lyhyt: 'Limpopon kansallispuisto on osa rajat ylittävää Suurta Limpopon puistoa, joka jatkuu Etelä-Afrikan Krugerin puistoon.',
    },
    Inhambane: {
      lyhyt: 'Bazaruton saariston kansallispuiston vesissä elää noin 120 dugongia, Mosambikin suurin jäljellä oleva kanta.',
    },
    Manica: {
      lyhyt: 'Chimoion kaupungin yllä kohoaa Cabeça do Velho, kallio, jonka muoto muistuttaa vanhan miehen päätä.',
    },
    Maputo: {
      lyhyt: 'Maputon kansallispuisto perustettiin 1932 rannikon norsujen suojaksi, ja nyt niitä elää siellä noin 400.',
    },
    Nampula: {
      lyhyt: 'Mosambikin saarelle, maan entiseen pääkaupunkiin, johtaa mantereelta 3,8 kilometriä pitkä silta.',
    },
    Niassa: {
      lyhyt: 'Niassan riistansuojelualue on yli 42 000 neliökilometrin laajuisena Mosambikin suurin suojelualue.',
    },
    Sofala: {
      lyhyt: 'Beiran satama on Mosambikin toiseksi suurin, ja sen radat vievät tavaraa Zimbabween ja Malawiin.',
    },
    Tete: {
      lyhyt: 'Teten kaupungissa Sambesin ylittää 1972 valmistunut Samora Machelin riippusilta, joka on yli 750 metriä pitkä.',
    },
    Zambezia: {
      lyhyt: 'Gurúèn teeviljelmät ovat Mosambikin laajimmat, ja kaupungin yllä kohoaa maan toiseksi korkein vuori Namuli.',
    },
  },
  /*
   * ZWE (erä 9B). Avaimet MAAKUNNAT_KAIKKI.ZWE:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Bulawayo — Bulawayo; Harare — Mbare Musika; Manicaland — Mutarazi
   *   Falls; Mashonaland Central — Mazowe ja Mazoe Orange Crush (haku);
   *   Mashonaland East — Ewanrigg Botanical Garden (haku); Mashonaland
   *   West — Lake Kariba; Masvingo — Gonarezhou National Park;
   *   Matabeleland North — Binga District; Matabeleland South —
   *   Beitbridge (haku); Midlands — Great Dyke
   */
  ZWE: {
    Bulawayo: {
      lyhyt: 'Bulawayon keskustan kadut tehtiin aikanaan niin leveiksi, että härkävaljakot pystyivät kääntymään niillä.',
    },
    Harare: {
      lyhyt: 'Hararen Mbare Musika on maan tärkein vihannestori ja maaseudulle lähtevien linja-autojen pääasema.',
    },
    Manicaland: {
      lyhyt: 'Mutarazin putoukset syöksyvät itäisen vuoriston reunalta kahdessa portaassa yhteensä noin 770 metriä.',
    },
    "Mashonaland Central": {
      lyhyt: 'Mazowen laakson appelsiinitarhat antoivat nimensä Zimbabwen tunnetuimmalle mehujuomalle, Mazoe-appelsiinitiivisteelle.',
    },
    "Mashonaland East": {
      lyhyt: 'Ewanriggin kasvitieteellisessä puutarhassa on yksi maailman suurimmista aloekokoelmista, ja se kukkii toukokuusta heinäkuuhun.',
    },
    "Mashonaland West": {
      lyhyt: 'Karibajärvi on tilavuudeltaan maailman suurin tekojärvi, ja siihen tuotiin Tanganjikajärvestä sardiinimaista kapenta-kalaa.',
    },
    Masvingo: {
      lyhyt: 'Gonarezhoun puistossa Runde-joen varrella kohoavat punaiset Chilojon hiekkakivijyrkänteet, jopa 180 metriä korkeat.',
    },
    "Matabeleland North": {
      lyhyt: 'Bingan lähellä Karibajärven rannalla pulppuavat Chibwatatatan kuumat lähteet, ja seutu on tonga-kansan kotia.',
    },
    "Matabeleland South": {
      lyhyt: 'Beitbridgen raja-asema Limpopon yli Etelä-Afrikkaan on eteläisen Afrikan vilkkain maaraja.',
    },
    Midlands: {
      lyhyt: 'Midlandsin halki kulkee Great Dyke, noin 550 kilometriä pitkä kallioperän vyöhyke, josta louhitaan kromia ja platinaa.',
    },
  },
  /*
   * NAM (erä 9B). Avaimet MAAKUNNAT_KAIKKI.NAM:n tunnuksia TÄSMÄLLEEN
   * (vanha jako: "Caprivi" = 2013 alkaen Sambesin alue, "Kavango" =
   * 2013 jaettu Itä- ja Länsi-Kavangoon, "Karas" = nyk. ǁKaras).
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Caprivi — Zambezi Region; Erongo — Walvis Bay; Hardap — Hardap
   *   Dam; Karas — Namib Desert horse; Kavango — Rundu; Khomas —
   *   Christuskirche (haku); Kunene — Twyfelfontein; Ohangwena —
   *   Ohangwena Region; Omaheke — Gobabis; Omusati — Ombalantu baobab
   *   tree; Oshana — Oshana Region; Oshikoto — Lake Otjikoto;
   *   Otjozondjupa — Waterberg Plateau Park
   */
  NAM: {
    Caprivi: {
      lyhyt: 'Nykyisen Sambesin alueen itäkärjessä Namibian, Sambian ja Botswanan rajat kohtaavat alle sadan metrin päässä Zimbabwesta.',
    },
    Erongo: {
      lyhyt: 'Walvis Bayssa on Namibian ainoa luonnollinen syväsatama, ja sen laguunissa ruokailee flamingoja.',
    },
    Hardap: {
      lyhyt: 'Marientalin lähellä oleva Hardapin pato valmistui 1963 ja oli yli viisikymmentä vuotta Namibian suurin.',
    },
    Karas: {
      lyhyt: 'Ausin lähellä Namibin aavikolla elää villiintyneitä hevosia, joiden alkuperästä kiistellään yhä.',
    },
    Kavango: {
      lyhyt: 'Rundu on Kavango-joen rannalla, jonka toisella puolella on jo Angola, ja kaupunki tunnetaan puunveistäjistään.',
    },
    Khomas: {
      lyhyt: 'Windhoekin Christuskirche vihittiin 1910, ja sen lasimaalaukset olivat Saksan keisarin lahja.',
    },
    Kunene: {
      lyhyt: 'Twyfelfonteinin hiekkakiviin on kaiverrettu tuhansia kalliopiirroksia, ja paikka oli Namibian ensimmäinen maailmanperintökohde.',
    },
    Ohangwena: {
      lyhyt: 'Ohangwenan hiekkamailla viljellään ennen kaikkea mahangua eli helmihirssiä, ja karjanhoito on toinen pääelinkeino.',
    },
    Omaheke: {
      lyhyt: 'Gobabisin sisääntuloa vartioi härän patsas tekstillä "Cattle Country", sillä seutu on karjatilojen sydänmaata.',
    },
    Omusati: {
      lyhyt: 'Outapin Ombalantun baobabin onttoa runkoa on käytetty kappelina, postina ja piilopaikkana.',
    },
    Oshana: {
      lyhyt: 'Oshakati, Ongwediva ja Ondangwa muodostavat yhdessä Namibian toiseksi suurimman asutuskeskittymän.',
    },
    Oshikoto: {
      lyhyt: 'Otjikotojärvi syntyi karstiluolan sortuessa, ja sen pohjassa on yhä saksalaisten 1915 upottamia tykkejä.',
    },
    Otjozondjupa: {
      lyhyt: 'Waterbergin ylänkö kohoaa Kalaharin tasangolta, ja sen kallioissa on noin 200 miljoonaa vuotta vanhoja dinosauruksen jälkiä.',
    },
  },
  /*
   * UGA (erä 9B). Avaimet MAAKUNNAT_KAIKKI.UGA:n tunnuksia TÄSMÄLLEEN
   * (neljä aluetta). Vain `lyhyt`. Lähteet (en-Wikipedia ja haku
   * 25.9.2026): Eastern — Sipi Falls; Central — Namugongo (Martyrs'
   * Day, haku); Western — Bwindi Impenetrable National Park; Northern —
   * Vitellaria paradoxa subsp. nilotica (haku)
   */
  UGA: {
    Eastern: {
      lyhyt: 'Elgonvuoren rinteellä Sipin putoukset laskeutuvat kolmessa osassa, ja ympäröivillä rinteillä kasvatetaan arabicakahvia.',
    },
    Central: {
      lyhyt: 'Namugongon marttyyrien pyhäkköön kokoontuu joka 3. kesäkuuta satojatuhansia pyhiinvaeltajia eri puolilta Afrikkaa.',
    },
    Western: {
      lyhyt: 'Bwindin läpipääsemättömässä metsässä elää noin puolet maailman vuorigorilloista.',
    },
    Northern: {
      lyhyt: 'Pohjoisen savanneilla kasvaa sheapuuta, jonka pähkinöistä tehty nilotica-voi on pehmeämpää kuin Länsi-Afrikan sheavoi.',
    },
  },
  /*
   * SEN (erä 9B). Avaimet MAAKUNNAT_KAIKKI.SEN:n tunnuksia TÄSMÄLLEEN
   * diakriitteineen. Vain `lyhyt`. Lähteet (en-/fr-Wikipedia ja haku
   * 25.9.2026): Dakar — Lake Retba; Diourbel — Diourbel (fr); Fatick —
   * Kingdom of Sine; Kaffrine — Région de Kaffrine (fr); Kaolack —
   * Kaolack (fr); Kédougou — Bassari Country; Kolda — Kolda (fr);
   * Louga — Désert de Lompoul (haku); Matam — Région de Matam (fr);
   * Saint-Louis — Richard Toll; Sédhiou — anacarde (haku); Tambacounda —
   * Niokolo-Koba National Park; Thiès — Manufactures sénégalaises des
   * arts décoratifs (haku); Ziguinchor — Mlomp (fr)
   */
  SEN: {
    Dakar: {
      lyhyt: 'Retban eli Lac Rosen suolajärvi hehkuu vaaleanpunaisena levän väriaineen ansiosta, ja sen pohjasta kerätään suolaa.',
    },
    Diourbel: {
      lyhyt: 'Diourbel on vanhan Baolin sydänmaata, ja sen suuri moskeija valmistui 1918.',
    },
    Fatick: {
      lyhyt: 'Sinen serer-kuningaskunta palautettiin seremoniallisena 2019, ja kuningas kruunattiin vanhassa pääkaupungissa Diakhaossa.',
    },
    Kaffrine: {
      lyhyt: 'Kaffrine erotettiin Kaolackista omaksi alueekseen 2008, ja se vei mukanaan noin kaksi kolmasosaa emoalueen pinta-alasta.',
    },
    Kaolack: {
      lyhyt: 'Kaolackin Médina Bayen kaupunginosassa on suuri moskeija, jonka rakennutti sufijohtaja Ibrahim Niasse.',
    },
    "Kédougou": {
      lyhyt: 'Kédougoun vuorilla asuvien bassari-, bedik- ja fulbe-kansojen kulttuurimaisemat ovat Unescon maailmanperintöä.',
    },
    Kolda: {
      lyhyt: 'Kolda on Ylä-Casamancen pääkaupunki lähellä Guinea-Bissaun rajaa, ja sen asukkaista suurin osa on fulbeja.',
    },
    Louga: {
      lyhyt: 'Lompoulin pieni aavikko kohoaa oranssinpunaisina, jopa 50-metrisinä dyyneinä alle kymmenen kilometrin päässä Atlantista.',
    },
    Matam: {
      lyhyt: 'Matamin Ndendoryssa on fosfaattiesiintymä, jonka varannoiksi arvioidaan noin 40 miljoonaa tonnia.',
    },
    "Saint-Louis": {
      lyhyt: 'Richard-Tollissa Senegal-joen varrella viljellään sokeriruokoa, ja kaupungin sokeritehdas toimittaa sokeria koko maahan.',
    },
    "Sédhiou": {
      lyhyt: 'Sédhiou on Senegalin suurin cashewpähkinöiden tuottaja: arviolta 70 prosenttia maan sadosta tulee täältä.',
    },
    Tambacounda: {
      lyhyt: 'Niokolo-Koba on Senegalin suurin kansallispuisto, ja sen savanneilla elää yhä leijonia ja simpansseja.',
    },
    "Thiès": {
      lyhyt: 'Thièsin kuvakudostehtaalla on kudottu käsin seinävaatteita vuodesta 1966, ja se on laatuaan ainoa Afrikassa.',
    },
    Ziguinchor: {
      lyhyt: 'Mlompin kylän harvinaiset kaksikerroksiset savitalot suojeltiin historiallisina muistomerkkeinä vuonna 2003.',
    },
  },
  /*
   * SLE (erä 9B). Avaimet MAAKUNNAT_KAIKKI.SLE:n tunnuksia TÄSMÄLLEEN
   * (vanha jako ennen vuotta 2017: "Northern" sisältää nykyisen
   * Luoteisen provinssin, jossa Lungi on). Vain `lyhyt`. Lähteet
   * (en-Wikipedia ja haku 25.9.2026): Eastern — Star of Sierra Leone
   * Diamond; Northern — Freetown International Airport; Southern —
   * sowei-naamio (haku); Western — Tacugama Chimpanzee Sanctuary (haku)
   */
  SLE: {
    Eastern: {
      lyhyt: 'Koidun timanttikaivoksilta löytyi 1972 Sierra Leonen tähti, lähes 969 karaatin timantti, suurin koskaan löydetty jokisoran timantti.',
    },
    Northern: {
      lyhyt: 'Maan ainoa kansainvälinen lentoasema on Lungissa, ja Freetowniin jatketaan yleensä lautalla tai vesitaksilla joensuun yli.',
    },
    Southern: {
      lyhyt: 'Mende-naisten Sande-seuran mustat sowei-naamiot ovat harvinaisia, sillä niitä kantavat tanssissa naiset itse.',
    },
    Western: {
      lyhyt: 'Freetownin laitamien vuoristometsässä toimii vuonna 1995 perustettu Tacugaman simpanssien turvakoti.',
    },
  },
  /*
   * LBR (erä 9B). Avaimet MAAKUNNAT_KAIKKI.LBR:n tunnuksia TÄSMÄLLEEN
   * ("Gbapolu" = Gbarpolu, "River Cess" = Rivercess). Vain `lyhyt`.
   * Lähteet (en-Wikipedia ja haku 25.9.2026): Bomi — Blue Lake (haku);
   * Bong — Cuttington University; Gbapolu — Gbarpolu County; Grand
   * Bassa — Bassa people (haku); Grand Cape Mount — Lake Piso; Grand
   * Gedeh — Grebo-Krahn National Park; Grand Kru — Grand Kru County;
   * Lofa — Lofa County; Margibi — Roberts International Airport;
   * Maryland — Maryland County; Montserrado — Montserrado County;
   * Nimba — Ganta; River Gee — Fish Town; River Cess — Rivercess County;
   * Sinoe — Greenville, Liberia
   */
  LBR: {
    Bomi: {
      lyhyt: 'Tubmanburgin lähellä on Blue Lake, hylättyyn rautamalmikuoppaan syntynyt syvä ja kirkkaan sininen järvi.',
    },
    Bong: {
      lyhyt: 'Suacocossa toimii Cuttingtonin yliopisto, joka perustettiin 1889 ja on Saharan eteläpuolisen Afrikan vanhimpia yksityisyliopistoja.',
    },
    Gbapolu: {
      lyhyt: 'Gbarpolu erotettiin Lofasta 2001, joten se on Liberian nuorin maakunta, ja valtaosa sen pinta-alasta on metsää.',
    },
    "Grand Bassa": {
      lyhyt: 'Grand Bassa on bassa-kansan ydinaluetta, ja bassat ovat yksi Liberian suurimmista kansoista.',
    },
    "Grand Cape Mount": {
      lyhyt: 'Pisojärvi on Liberian suurin järvi, oikeastaan pitkänomainen vuorovesilaguuni, ja sen kosteikot on suojeltu.',
    },
    "Grand Gedeh": {
      lyhyt: 'Grand Gedehin sademetsissä on vuonna 2017 perustettu Grebo-Krahnin kansallispuisto, jossa elää kääpiövirtahepoja.',
    },
    "Grand Kru": {
      lyhyt: 'Grand Kru syntyi 1984, kun Sasstownin ja Kru Coastin alueet yhdistettiin, ja arkikieli on yhä kru.',
    },
    Lofa: {
      lyhyt: 'Lofa on Liberian tärkeimpiä riisimaakuntia: vuonna 2011 noin kuudesosa maan riisipelloista oli täällä.',
    },
    Margibi: {
      lyhyt: 'Harbelin lähellä on Liberian päälentoasema Roberts International, jonka kiitotie on yli kolme kilometriä pitkä.',
    },
    Maryland: {
      lyhyt: 'Maryland on Liberian kaupungistuneimpia maakuntia: noin kuusi asukasta kymmenestä asuu kaupungeissa.',
    },
    Montserrado: {
      lyhyt: 'Montserrado on Liberian pienin maakunta, mutta siellä asuu Monrovian ansiosta noin kolmannes koko maan väestöstä.',
    },
    Nimba: {
      lyhyt: 'Ganta on Liberian toiseksi väkirikkain kaupunki, ja sen pohjoislaidalla virtaava Mano-joki on raja Guineaan.',
    },
    "River Gee": {
      lyhyt: 'Pääkaupunki Fish Town on käännös grebonkielisestä nimestä, joka viittaa kylän vieressä virtaavaan kalapuroon.',
    },
    "River Cess": {
      lyhyt: 'Rivercessin sademetsiin sataa vuodessa noin 4 500 millimetriä vettä, moninkertaisesti Suomeen verrattuna.',
    },
    Sinoe: {
      lyhyt: 'Pääkaupunki Greenvillen satama on Liberian kolmanneksi suurin, ja sen kautta kulkee nykyään lähinnä puutavaraa.',
    },
  },
  /*
   * LBY (erä 9C). Avaimet MAAKUNNAT_KAIKKI.LBY:n tunnuksia TÄSMÄLLEEN
   * ("Ash Shati'", "Tajura' wa an Nawahi al Arba"). Natural Earthin jako on
   * sekoitus vanhoja piirikuntia: Tripoli on "Tajura'"-alueella, Derna
   * "Al Qubbah"-alueella, Nalut "Ghadamis"-alueella ja Gharyan "Mizdah"-
   * alueella (tarkistettu alueiden rajauslaatikoista). Vain `lyhyt`.
   * Neutraali sävy. Vältetty maastokohteet-lby.js:n ja fokuskohteet-lby.js:n
   * aiheet (Leptis Magna, Sabratha, Kyrene, Ghadames, Akakus, Garama,
   * Ubarin hiekkameri, Syrtti). Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Ajdabiya — Atiq Mosque (Awjila); Al Butnan — Tobruk; Al Jabal al
   *   Akhdar — Jebel Akhdar (Libya); Al Jifarah — ʽAziziya; Al Kufrah —
   *   Kufra; Al Marj — Marj; Al Marqab — Villa Silin (Livius, ICOMOS);
   *   Al Qubbah — Derna waterfalls; Ash Shati' — Wadi al Shatii District;
   *   Benghazi — University of Benghazi; Ghadamis — Nalut; Ghat — Ghat,
   *   Libya; Al Jufrah — Haruj; Misratah — Misrata; Mizdah — Gharyan;
   *   Murzuq — Waw an Namus; An Nuqat al Khams — Zuwara; Sabha — Sabha,
   *   Libya; Surt — Sirte (Madinat Sultan); Tajura' — Tripoli, Libya
   *   (Arch of Marcus Aurelius); Wadi al Hayaa — Wadi al Hayaa District;
   *   Az Zawiyah — Zawiya, Libya
   */
  LBY: {
    "Ajdabiya": {
      lyhyt: 'Awjilan keitaan Atiq-moskeija on 1100-luvulta, ja sen savitiilistä ja kalkkikivestä muurattua kattoa kruunaa 21 kartiomaista kupolia.',
    },
    "Al Butnan": {
      lyhyt: 'Tobrukin syvä ja luonnostaan suojainen satama on ehkä koko Pohjois-Afrikan rannikon paras luonnonsatama.',
    },
    "Al Jabal al Akhdar": {
      lyhyt: 'Vihreä vuori on Libyan sateisin seutu, ja sen rinteillä kasvaa metsää, jossa viihtyvät muun muassa foinikiankataja ja johanneksenleipäpuu.',
    },
    "Al Jifarah": {
      lyhyt: 'Aziziyassa mitattiin 1922 lukema 58 astetta, jota pidettiin 90 vuotta maailman kuumimpana, kunnes WMO hylkäsi sen 2012.',
    },
    "Al Kufrah": {
      lyhyt: 'Kufran keitaan pyöreät, noin kilometrin levyiset pellot näkyvät avaruuteen asti, ja niitä kastellaan syvältä pumpatulla fossiilisella pohjavedellä.',
    },
    "Al Marj": {
      lyhyt: 'Kun maanjäristys tuhosi Marjin 1963, uusi kaupunki rakennettiin noin viiden kilometrin päähän vanhasta.',
    },
    "Al Marqab": {
      lyhyt: 'Khomsin lähellä meren rannalla on Silinin roomalainen huvila, jonka lattioita peittää noin 800 neliömetriä mosaiikkeja.',
    },
    "Al Qubbah": {
      lyhyt: 'Dernan eteläpuolella Vihreän vuoren rinteellä on noin 20 metriä korkea vesiputous, harvinaisuus kuivassa Libyassa.',
    },
    "Ash Shati'": {
      lyhyt: 'Brakin ympäristössä Wadi ash-Shatin painanteessa on valtavat mutta köyhät rautamalmiesiintymät, jotka löydettiin 1943.',
    },
    "Benghazi": {
      lyhyt: 'Benghazin yliopisto perustettiin 1955 Libyan yliopistona, ja se on maan vanhimpia korkeakouluja.',
    },
    "Ghadamis": {
      lyhyt: 'Nalutin qasr on linnoitettu vilja-aitta, johon kylän perheet säilöivät viljansa; nyt se on tyhjillään mutta avoinna kävijöille.',
    },
    "Ghat": {
      lyhyt: 'Ghatin vanhaa kaupunkia vartioi Koukemenin kukkulalla italialaisten rakentama linnoitus.',
    },
    "Al Jufrah": {
      lyhyt: 'Jufraan ulottuu Harujin tulivuorikenttä, jossa on noin 150 tulivuorta – Pohjois-Afrikan suurin basalttinen tulivuorikenttä.',
    },
    "Misratah": {
      lyhyt: 'Misrataa kutsutaan Libyan kaupan pääkaupungiksi, ja sen keskustorin laidalla myydään yhä mattoja ja perinteisiä vaatteita.',
    },
    "Mizdah": {
      lyhyt: 'Gharyanin ensimmäiset asukkaat asuivat maan alle kaivetuissa luolissa, ja kaupunki tunnetaan yhä keramiikastaan.',
    },
    "Murzuq": {
      lyhyt: 'Waw an-Namusin tulivuoren kraatterissa on pieniä järviä, ja musta tuhka peittää ympäriltä vaalean Saharan hiekan.',
    },
    "An Nuqat al Khams": {
      lyhyt: 'Zuwarassa puhutaan omaa berberikieltä, ja kaupunki tunnetaan hiekkarannoistaan ja kala-aterioistaan.',
    },
    "Sabha": {
      lyhyt: 'Sabhan kaupunkikuvaa hallitsee kukkulalla seisova Elenan linnake, jonka italialaiset rakensivat siirtomaa-aikanaan.',
    },
    "Surt": {
      lyhyt: 'Sirten itäpuolella ovat keskiaikaisen Surtin rauniot, Madinat Sultan, jonka muurit ja portit on kaivettu esiin.',
    },
    "Tajura' wa an Nawahi al Arba": {
      lyhyt: 'Tripolin vanhankaupungin laidalla seisoo 100-luvun Marcus Aureliuksen riemukaari, kaupungin ainoa näkyvä roomalainen muistomerkki.',
    },
    "Wadi al Hayaa": {
      lyhyt: 'Wadi al-Hayat tarkoittaa Elämän laaksoa, sillä tässä aavikon painanteessa pohjavesi riittää taatelipalmuille ja pelloille.',
    },
    "Az Zawiyah": {
      lyhyt: 'Zawiyassa on toinen Libyan kahdesta tärkeimmästä öljynjalostamosta.',
    },
  },
  /*
   * MLI (erä 9C). Avaimet MAAKUNNAT_KAIKKI.MLI:n tunnuksia TÄSMÄLLEEN
   * ("Ségou"); Natural Earthin vanha kahdeksan alueen ja Bamakon jako.
   * Vain `lyhyt`. Neutraali sävy. Vältetty maastokohteet-mli.js:n aiheet
   * (Djenné, Dogonmaa, Askian hauta, Médine, Sikasson tata, Ségoun
   * historia, Bamakon perustaminen, Hombori). Lähteet (en-Wikipedia ja
   * haku 25.9.2026):
   *   Bamako — African Photography Encounters; Gao — Gao (La Dune Rose);
   *   Kayes — Kayes; Kidal — Essouk; Koulikoro — Kangaba (Kamablon);
   *   Mopti — Mopti; Ségou — Markala Dam; Sikasso — Sikasso Region
   *   (Koutiala); Timbuktu — Djinguereber Mosque
   */
  MLI: {
    "Bamako": {
      lyhyt: 'Bamakossa järjestetään joka toinen vuosi Afrikan valokuvabiennaali Rencontres de Bamako, jonka ensimmäinen kerta oli 1994.',
    },
    "Gao": {
      lyhyt: 'Gaon lähellä kohoaa La Dune Rose, hiekkadyyni, joka on saanut nimensä vaaleanpunaisesta hehkustaan aamu- ja iltavalossa.',
    },
    "Kayes": {
      lyhyt: 'Kayesia kutsutaan Afrikan painekattilaksi, ja huhtikuussa 2024 siellä mitattiin 48,5 astetta, Malin korkein lämpötila.',
    },
    "Kidal": {
      lyhyt: 'Kidalin lähellä ovat Tadmekkan rauniot, ja niiden hautakivissä on Länsi-Afrikan vanhimpia päivättyjä arabiankielisiä tekstejä.',
    },
    "Koulikoro": {
      lyhyt: 'Kangaban Kamablon-pyhätön olkikatto uusitaan seitsemän vuoden välein juhlassa, jossa griotit kertaavat seudun suullista historiaa.',
    },
    "Mopti": {
      lyhyt: 'Tulvakaudella Mopti muuttuu pengerteiden yhdistämiksi saariksi, ja sen satamassa käydään kauppaa Taoudennin vuorisuolalla.',
    },
    "Ségou": {
      lyhyt: 'Markalan pato ohjaa Nigerin vettä 135 kilometriä pohjoiseen ulottuvaan kanavistoon, jonka varrella viljellään riisiä.',
    },
    "Sikasso": {
      lyhyt: 'Pohjoisosan Koutiala on Malin puuvillateollisuuden keskus, ja puuvilla on maan harvoja vientituotteita.',
    },
    "Timbuktu": {
      lyhyt: 'Timbuktun Djinguereberin moskeija rakennettiin savesta, oljista ja puusta vuonna 1327, ja siihen mahtuu 2 000 rukoilijaa.',
    },
  },
  /*
   * SOM (erä 9C). Avaimet MAAKUNNAT_KAIKKI.SOM:n tunnuksia TÄSMÄLLEEN
   * (somalinkieliset "Jubbada Hoose", "Shabeellaha Dhexe" ym.). Vain
   * `lyhyt`. Neutraali sävy; Puntlandin alueista (Bari, Nugaal, Mudug)
   * vain maisema ja kulttuuri. Vältetty maastokohteet-som.js:n aiheet
   * (Bosaso, Hobyo, Barawa, Hamar Weyne, Jubba, Ras Hafun). Lähteet
   * (en-Wikipedia ja haku 25.9.2026):
   *   Jubbada Hoose — Kismayo; Bakool — Hudur, Maay language; Banaadir —
   *   Mogadishu (Lido Beach); Bari — Cape Guardafui; Bay — Buur Heybe;
   *   Galguduud — El Buur (sepiolite, mindat), Dabqaad; Gedo — Bardera;
   *   Hiiraan — Beledweyne; Jubbada Dhexe — Middle Juba; Mudug — Mudug,
   *   Somalia terrain (country-data); Nugaal — Nugaal Valley; Shabeellaha
   *   Dhexe — Jowhar; Shabeellaha Hoose — Istunka
   */
  SOM: {
    "Jubbada Hoose": {
      lyhyt: 'Kismayon sataman niemi oli ennen yksi Bajunisaarista, kunnes se yhdistettiin mantereeseen pengertiellä 1964.',
    },
    "Bakool": {
      lyhyt: 'Bakoolin pääkaupungissa Hudurissa puhutaan maayta, joka eroaa pohjoisen somalista suunnilleen kuin espanja portugalista.',
    },
    "Banaadir": {
      lyhyt: 'Mogadishun Lidon hiekkaranta on kaupunkilaisten suosituin rantapaikka, ja sen varrella on kalaravintoloita.',
    },
    "Bari": {
      lyhyt: 'Guardafuin niemi on Afrikan sarven kärki, ja sen nimen arvellaan tulevan merimiesten sanoista "katso ja pakene".',
    },
    "Bay": {
      lyhyt: 'Buur Heyben graniittikallion kalliosuojista on löydetty Afrikan sarven vanhimmat kiistattomat hautaukset.',
    },
    "Galguduud": {
      lyhyt: 'El Buurin tasangolla louhitaan kalkkikiven alta merivahaa, josta veistetään perinteisiä dabqaad-suitsutusastioita.',
    },
    "Gedo": {
      lyhyt: 'Baardheeren nimi tarkoittaa korkeaa palmua, ja palmut reunustavat yhä kaupungin kohdalla joen rantoja ja peltoja.',
    },
    "Hiiraan": {
      lyhyt: 'Beledweynen kaupunki on rakennettu Shabelle-joen molemmin puolin, ja joki jakaa sen itä- ja länsiosaan.',
    },
    "Jubbada Dhexe": {
      lyhyt: 'Keski-Juban jokilaakso on maanviljelyseutua, ja yksi sen tärkeimmistä viljelykasveista on seesami.',
    },
    "Mudug": {
      lyhyt: 'Mudugin tasangolla Haudin ruohomaat vaihtuvat puoliaavikoksi, jonka pensaikossa paimentolaiset laiduntavat kameleitaan.',
    },
    "Nugaal": {
      lyhyt: 'Nugaalin laakson uomassa virtaa vettä vain sateiden jälkeen, ja laakson luonnonvaraisista puista kerätään myrhaa ja suitsuketta.',
    },
    "Shabeellaha Dhexe": {
      lyhyt: 'Jowharin nimi tarkoittaa jalokiveä, ja se viittaa Shabelle-joen varren hedelmällisiin peltoihin.',
    },
    "Shabeellaha Hoose": {
      lyhyt: 'Afgooyessa joen kummankin rannan asukkaat ottavat somalialaisena uutenavuotena mittaa toisistaan istunka-keppitaistelussa.',
    },
  },
  /*
   * GTM (erä 9C). Avaimet MAAKUNNAT_KAIKKI.GTM:n tunnuksia TÄSMÄLLEEN
   * ("Petén", "Quezaltenango", "Sacatepéquez", "Sololá" ym.). Vain
   * `lyhyt`. Vältetty maastokohteet-gtm.js:n aiheet (Tikal, El Mirador,
   * Atitlán, Chichicastenango, Iximche, Quiriguá, Semuc Champey,
   * Tajumulco, San Felipe, Motaguan jade). Lähteet (en-Wikipedia ja
   * haku 25.9.2026):
   *   Alta Verapaz — cardamom (USDA, Heifer); Baja Verapaz — Biotopo del
   *   Quetzal; Chimaltenango — San Juan Comalapa; Chiquimula — Black
   *   Christ of Esquipulas; El Progreso — El Progreso Department;
   *   Escuintla — Monte Alto culture, La Democracia; Guatemala —
   *   Kaminaljuyu; Huehuetenango — Todos Santos Cuchumatán; Izabal —
   *   Livingston, Guatemala; Jalapa — Jalapa Department; Jutiapa — Jutiapa
   *   Department; Petén — Flores, Petén; Quezaltenango — Quetzaltenango;
   *   Quiché — Ixil; Retalhuleu — Takalik Abaj; Sacatepéquez — Antigua
   *   alfombras; San Marcos — La Blanca (archaeological site); Santa Rosa
   *   — Monterrico; Sololá — Sololá; Suchitepéquez — Mazatenango;
   *   Totonicapán — Totonicapán Department; Zacapa — Museo de
   *   Paleontología de Estanzuela
   */
  GTM: {
    "Alta Verapaz": {
      lyhyt: 'Guatemala on maailman suurin kardemumman tuottaja, ja noin kaksi kolmasosaa sadosta kasvaa Alta Verapazin rinteillä.',
    },
    "Baja Verapaz": {
      lyhyt: 'Baja Verapazin pilvimetsään perustettiin 1976 Quetzal-biotooppi suojelemaan Guatemalan kansallislintua ketsaalia.',
    },
    "Chimaltenango": {
      lyhyt: 'San Juan Comalapaa kutsutaan Amerikan Firenzeksi, sillä kylässä maalaa noin 500 kaqchikel-taiteilijaa.',
    },
    "Chiquimula": {
      lyhyt: 'Esquipulasin basilikan Mustan Kristuksen luo saapuu joka 15. tammikuuta arviolta jopa miljoona pyhiinvaeltajaa.',
    },
    "El Progreso": {
      lyhyt: 'Sierra de las Minasin Cerro El Pinalón kohoaa 2 962 metriin, ja se on El Progreson korkein kohta.',
    },
    "Escuintla": {
      lyhyt: 'La Democracian puistossa on esillä Monte Alton pyylevät kivihahmot ja jättiläispäät, jotka veistettiin noin 500–200 eaa.',
    },
    "Guatemala": {
      lyhyt: 'Pääkaupungin länsiosan korttelien alle on jäänyt Kaminaljuyú, suuri mayakaupunki, josta on säilynyt puistona vain pieni osa.',
    },
    "Huehuetenango": {
      lyhyt: 'Todos Santos Cuchumatánissa 2 500 metrin korkeudella myös miehet käyttävät yhä arjessa perinteistä asua.',
    },
    "Izabal": {
      lyhyt: 'Karibianrannan Livingstoniin ei johda tietä, vaan sinne tullaan veneellä, ja kaupungin kaduilla kuulee garifunaa.',
    },
    "Jalapa": {
      lyhyt: 'Jalapan viileää vuoristoa hallitsee 2 176 metriin kohoava Jumayn tulivuori.',
    },
    "Jutiapa": {
      lyhyt: 'Güijajärven poikki kulkee Guatemalan ja El Salvadorin raja, ja kummallakin maalla on oma rantansa.',
    },
    "Petén": {
      lyhyt: 'Floresin vanhakaupunki on Petén Itzá -järven saarella, jonne pääsee lyhyttä pengertietä pitkin.',
    },
    "Quezaltenango": {
      lyhyt: 'Quetzaltenangon kʼicheʼ-kielinen nimi Xelajú tarkoittaa "kymmenen vuoren alla", ja arjessa kaupunki on Xela.',
    },
    "Quiché": {
      lyhyt: 'Nebajin, Chajulin ja Cotzalin vuoristokylissä puhutaan ixiliä, mayakieltä, joka on tämän seudun oma.',
    },
    "Retalhuleu": {
      lyhyt: 'Takalik Abaj oli olmeekkien ja mayojen kohtauspaikka, ja se liitettiin Unescon maailmanperintöluetteloon 2023.',
    },
    "Sacatepéquez": {
      lyhyt: 'Antiguassa kadut peitetään pääsiäisviikolla värjätystä sahanpurusta tehdyillä matoilla, jotka kulkueet tallaavat.',
    },
    "San Marcos": {
      lyhyt: 'La Blancan 25-metrinen kumpu oli noin 900–600 eaa. yksi Mesoamerikan ensimmäisistä pyramiditemppeleistä.',
    },
    "Santa Rosa": {
      lyhyt: 'Monterricon mustalle tuliperäiselle hiekkarannalle nousee heinä–joulukuussa merikilpikonnia munimaan.',
    },
    "Sololá": {
      lyhyt: 'Sololán kaupungissa 600 metriä Atitlánin yläpuolella pidetään tiistaisin ja perjantaisin yksi Guatemalan suurimmista toreista.',
    },
    "Suchitepéquez": {
      lyhyt: 'Mazatenangon karnevaali on Guatemalan vanhin ja suurin, ja sitä on vietetty vuodesta 1885.',
    },
    "Totonicapán": {
      lyhyt: 'Totonicapánin ylänköjen havumetsissä kasvaa uhanalaista guatemalanpihtaa.',
    },
    "Zacapa": {
      lyhyt: 'Estanzuelan paleontologisessa museossa on koottuina mastodontin ja jättiläislaiskiaisen luurangot.',
    },
  },
  /*
   * NIC (erä 9C). Avaimet MAAKUNNAT_KAIKKI.NIC:n tunnuksia TÄSMÄLLEEN
   * ("Atlántico Norte"/"Atlántico Sur" = nykyiset Costa Caribe Norte/Sur,
   * "Rio San Juan" ilman aksenttia). Vain `lyhyt`. Vältetty
   * maastokohteet-nic.js:n aiheet (Bilwi, Bluefields, Ciudad Darío,
   * Cosigüina, El Castillo, Granadan ja Leónin kaupungit, Ometepe, San
   * Juan -joki, Solentiname, Somoton kanjoni). Lähteet (en-Wikipedia ja
   * haku 25.9.2026):
   *   Atlántico Norte — Bosawás Biosphere Reserve; Atlántico Sur — Corn
   *   Islands; Boaco — Boaco; Carazo — El Güegüense; Chinandega — Corinto;
   *   Chontales — Museo Gregorio Aguilar Barea; Estelí — cigar industry;
   *   Granada — Isletas de Granada; Jinotega — Jinotega; León — Cerro
   *   Negro; Madriz — Somoto (rosquillas); Managua — Ancient footprints of
   *   Acahualinca; Masaya — Masaya (Monimbó); Matagalpa — cerámica negra;
   *   Nueva Segovia — Ocotal; Rio San Juan — Indio Maíz Biological
   *   Reserve; Rivas — Rivas Isthmus (Britannica)
   */
  NIC: {
    "Atlántico Norte": {
      lyhyt: 'Bosawásin biosfäärialue ulottuu tänne, ja se on Amazonin pohjoispuolen suurin yhtenäinen koskematon sademetsä.',
    },
    "Atlántico Sur": {
      lyhyt: 'Corn Islands -saaret ovat noin 70 kilometrin päässä rannikolta, ja niillä puhutaan arjessa englantipohjaista kreolia.',
    },
    "Boaco": {
      lyhyt: 'Mäkistä Boacoa kutsutaan kaksikerroksiseksi kaupungiksi, sillä sen ainoat tasaiset paikat ovat puisto ja pesäpallokenttä.',
    },
    "Carazo": {
      lyhyt: 'Diriambassa esitetään tammikuun San Sebastián -juhlissa El Güegüense -näytelmää, jonka Unesco nimesi ihmiskunnan perinnöksi 2005.',
    },
    "Chinandega": {
      lyhyt: 'Corinto on Nicaraguan suurin satama, ja sen kautta kulkee valtaosa maan meriteitse kulkevasta ulkomaankaupasta.',
    },
    "Chontales": {
      lyhyt: 'Juigalpan arkeologisessa museossa on yli 120 kivipatsasta, Nicaraguan suurin alkuperäiskansojen veistoskokoelma.',
    },
    "Estelí": {
      lyhyt: 'Estelíä kutsutaan Nicaraguan sikaripääkaupungiksi, ja sikareita kääritään käsin niin suurissa tehtaissa kuin takapihoillakin.',
    },
    "Granada": {
      lyhyt: 'Granadan edustalla Nicaraguajärvessä on noin 365 pientä saarta, jotka syntyivät Mombachon tulivuoren sortuman jäänteistä.',
    },
    "Jinotega": {
      lyhyt: 'Jinotegaa kutsutaan sumujen kaupungiksi, sillä pilvet ajelehtivat jatkuvasti vuorten ympäröimän laakson läpi.',
    },
    "León": {
      lyhyt: 'Cerro Negro ilmestyi maan pinnalle vasta 1850, ja sen mustaa tuhkarinnettä lasketaan nykyään alas laudalla.',
    },
    "Madriz": {
      lyhyt: 'Somotossa leivotaan puu-uuneissa rosquillas-maissikeksejä, ja kaupunkia pidetään niiden syntysijana.',
    },
    "Managua": {
      lyhyt: 'Acahualincassa Managuanjärven rannalla on tuhkaan painuneita ihmisten jalanjälkiä, jotka ovat ainakin 2 100 vuotta vanhoja.',
    },
    "Masaya": {
      lyhyt: 'Masaya on nimetty Nicaraguan kansanperinteen pääkaupungiksi, ja sen Monimbón kaupunginosassa on käsityöpaja lähes joka kadulla.',
    },
    "Matagalpa": {
      lyhyt: 'Matagalpan seudulla tehdään yhä mustaa keramiikkaa, jonka kiilto tulee kasvipihkasta tehdystä pinnoitteesta.',
    },
    "Nueva Segovia": {
      lyhyt: 'Nueva Segovian pääkaupunki Ocotal on saanut nimensä ocote-männyistä, joita seudun vuorilla kasvaa runsaasti.',
    },
    "Rio San Juan": {
      lyhyt: 'Indio Maízin suojelualue on yksi Keski-Amerikan parhaiten säilyneistä alankosademetsistä.',
    },
    "Rivas": {
      lyhyt: 'Rivasin kannaksella Nicaraguajärveä ja Tyyntämerta erottaa vain noin 20 kilometrin kaistale maata.',
    },
  },
  /*
   * CUB (erä 9D). Avaimet MAAKUNNAT_KAIKKI.CUB:n tunnuksia TÄSMÄLLEEN,
   * kopioitu koneellisesti ("Ciudad de la Habana" = Havanna). Vain `lyhyt`.
   * Maastokohteiden (Turquino, Cauto, Nuorisonsaari, Trinidad, Viñales,
   * San Pedro de la Roca, Cienfuegosin kaupunki, Camagüeyn tinajón,
   * Baracoa, Hersheyn rata, Bayamo) aiheita vältetty. Lähteet
   * (en-Wikipedia ja haku 25.9.2026):
   *   Artemisa — Las Terrazas; Camagüey — Playa Santa Lucía (haku);
   *   Ciego de Ávila — Cayo Coco; Cienfuegos — Jardín Botánico de
   *   Cienfuegos; Granma — Desembarco del Granma National Park;
   *   Guantánamo — Alejandro de Humboldt National Park; Ciudad de la
   *   Habana — Malecón, Havana; Holguín — El Chorro de Maita; Isla de la
   *   Juventud — Presidio Modelo; Las Tunas — Las Tunas (city);
   *   Matanzas — Varadero; Mayabeque — Mayabeque Province; Pinar del
   *   Río — Vuelta Abajo; Sancti Spíritus — Zaza Reservoir; Santiago de
   *   Cuba — El Cobre (Basílica de la Caridad del Cobre); Villa Clara —
   *   Parrandas, Remedios
   */
  CUB: {
    "Artemisa": {
      lyhyt: "Las Terrazasin kylä on Sierra del Rosarion rinteillä, joiden paljaaksi hakatut mäet metsitettiin uudelleen erosiota estävien terassien avulla.",
    },
    "Camagüey": {
      lyhyt: "Santa Lucían hiekkarantoja suojaa koralliriutta, joka kulkee lähes kahden kilometrin päässä rannasta – sinne mennään veneellä.",
    },
    "Ciego de Ávila": {
      lyhyt: "Cayo Cocon saarelle ajetaan 27 kilometrin pengertietä suoraan Perros-lahden yli; tie avattiin vuonna 1988.",
    },
    "Cienfuegos": {
      lyhyt: "Cienfuegosin kasvitieteellinen puutarha perustettiin 1901 sokeriruokotutkimusta varten, ja sen 97 hehtaarilla kasvaa yli 1 400 lajia.",
    },
    "Granma": {
      lyhyt: "Cabo Cruzin rannikolla kalkkikiviterassit nousevat portaittain merestä vuorille, ja ne ovat Unescon maailmanperintöä.",
    },
    "Guantánamo": {
      lyhyt: "Alejandro de Humboldtin kansallispuiston vuoristometsissä elää poikkeuksellisen paljon kasveja ja eläimiä, joita ei tavata muualla.",
    },
    "Ciudad de la Habana": {
      lyhyt: "Havannan Malecón kiertää rantaa kahdeksan kilometriä, ja iltaisin sen muurilla istutaan katsomassa aaltojen iskuja.",
    },
    "Holguín": {
      lyhyt: "Guardalavacan lähellä Chorro de Maítassa on kaivettu esiin alkuperäisasukkaiden kylä ja hautausmaa noin vuosilta 1300–1550.",
    },
    "Isla de la Juventud": {
      lyhyt: "Saaren Presidio Modelo -vankila rakennettiin 1926–1931 viidestä pyöreästä sellirakennuksesta, ja nyt se on museo.",
    },
    "Las Tunas": {
      lyhyt: "Las Tunasia kutsutaan veistosten kaupungiksi, sillä sen keskustan kaduilla ja aukioilla on paljon julkisia veistoksia.",
    },
    "Matanzas": {
      lyhyt: "Varaderon kapea Hicacosin niemimaa työntyy yli 20 kilometriä mereen, ja sen kärki on Kuuban pohjoisin kohta.",
    },
    "Mayabeque": {
      lyhyt: "Mayabeque sai nimensä joestaan, ja sen etelärannalle uskotaan perustetun vuonna 1514 ensimmäinen Havanna.",
    },
    "Pinar del Río": {
      lyhyt: "Vuelta Abajon tasangoilla kasvatetaan tupakkaa, jota moni sikarinpolttaja pitää maailman parhaana.",
    },
    "Sancti Spíritus": {
      lyhyt: "Zazan tekojärvi on Kuuban suurin: vuonna 1971 valmistunut pato pidättää noin 750 miljoonaa kuutiometriä vettä.",
    },
    "Santiago de Cuba": {
      lyhyt: "El Cobren kylässä vanhan kuparikaivoksen vieressä on basilika, jossa on Kuuban suojeluspyhimyksen Caridad del Cobren kuva.",
    },
    "Villa Clara": {
      lyhyt: "Remediosin parrandoissa jouluaattona kaupunginosat San Salvador ja El Carmen kilpailevat valaistuilla lavoilla ja ilotulituksilla.",
    },
  },
  /*
   * PAN (erä 9D). Avaimet MAAKUNNAT_KAIKKI.PAN:n tunnuksia TÄSMÄLLEEN
   * (vanhat Natural Earth -nimet: "Kuna Yala" = Guna Yala, "Emberá" =
   * Emberá-Wounaanin comarca, "Ngöbe Buglé" = Ngäbe-Buglé; Panamá Oeste
   * puuttuu jaosta). Vain `lyhyt`. Maastokohteiden (Barú, Coiba, Chagres,
   * Portobelo, rautatie, El Caño, Guna Yala, Los Santos, Bocas del Toro,
   * Dariénin aukko, Helmisaaret) aiheita vältetty. Lähteet (en-Wikipedia
   * ja haku 25.9.2026):
   *   Bocas del Toro — Oophaga pumilio; Chiriquí — Geisha (coffee);
   *   Coclé — El Valle de Antón; Colón — Colón Free Trade Zone; Darién —
   *   Darién National Park; Emberá — Emberá-Wounaan Comarca; Kuna Yala —
   *   Mola (art form); Herrera — Sarigua National Park; Los Santos — Las
   *   Tablas, Los Santos; Ngöbe Buglé — Ngäbe-Buglé Comarca; Panama —
   *   Panamá Viejo; Veraguas — Veraguas Province
   */
  PAN: {
    "Bocas del Toro": {
      lyhyt: "Saariston pienen mansikkamyrkkysammakon väritys vaihtelee saaresta toiseen, koska eristyneet kannat ovat kehittyneet kukin omaan suuntaansa.",
    },
    "Chiriquí": {
      lyhyt: "Boqueten rinteiltä tuleva geisha-kahvi on myyty huutokaupoissa ennätyshintoihin, parhaimmillaan yli tuhannella dollarilla kilolta.",
    },
    "Coclé": {
      lyhyt: "El Vallen kaupunki on rakennettu sammuneen tulivuoren kuuden kilometrin levyiseen kalderaan noin 600 metrin korkeudelle.",
    },
    "Colón": {
      lyhyt: "Kanavan Karibian puoleiseen suuhun vuonna 1948 perustettu Colónin vapaakauppa-alue on Amerikan suurin vapaasatama.",
    },
    "Darién": {
      lyhyt: "Dariénin kansallispuisto on 5 790 neliökilometrin Unescon maailmanperintökohde, jonka sisällä asuu yhä alkuperäiskansoja.",
    },
    "Emberá": {
      lyhyt: "Emberá-Wounaanin comarca perustettiin 1983, ja se koostuu kahdesta erillisestä osasta Dariénin sademetsissä.",
    },
    "Kuna Yala": {
      lyhyt: "Gunanaisten mola-paneelit tehdään leikkaamalla päällekkäisiä kangaskerroksia niin, että alempien kerrosten värit tulevat esiin.",
    },
    "Herrera": {
      lyhyt: "Parita-lahden rannalla Sariguan kansallispuistossa on vuosisatojen metsänraivauksen autioittamaa maata, jota kutsutaan Panaman aavikoksi.",
    },
    "Los Santos": {
      lyhyt: "Las Tablasin karnevaaleissa Calle Arriba ja Calle Abajo kilpailevat keskenään, ja kummallakin puolella on oma kuningattarensa.",
    },
    "Ngöbe Buglé": {
      lyhyt: "Ngäbe-Buglé on Panaman kuudesta comarcasta suurin ja väkirikkain, ja sen vuoristossa asuu yli 200 000 ihmistä.",
    },
    "Panama": {
      lyhyt: "Panamá Viejon rauniot ovat jäänteitä vuonna 1519 perustetusta ensimmäisestä pysyvästä eurooppalaisesta kaupungista Tyynenmeren rannalla.",
    },
    "Veraguas": {
      lyhyt: "Veraguas on Panaman ainoa maakunta, jolla on rantaa sekä Karibianmerellä että Tyynellämerellä.",
    },
  },
  /*
   * HKG (erä 9D). Avaimet MAAKUNNAT_KAIKKI.HKG:n tunnuksia TÄSMÄLLEEN
   * (Hongkongin 18 piiriä englanniksi, myös nimiFi suomentamatta). Vain
   * `lyhyt`. Maastokohteiden (muurikaupunki, Tai O, Tung Chungin linnake,
   * Tai Fu Tai, Tai Mo Shan, Lantau) aiheita vältetty. Lähteet
   * (en-Wikipedia ja haku 25.9.2026):
   *   Central and Western — Central–Mid-Levels escalator; Eastern —
   *   Monster Building; Islands — Cheung Chau Bun Festival; Kowloon City —
   *   Kai Tak Airport; Kwai Tsing — Kwai Tsing Container Terminals; Kwun
   *   Tong — Lei Yue Mun; North — Lung Yeuk Tau; Sai Kung — Hong Kong
   *   UNESCO Global Geopark; Sha Tin — Ten Thousand Buddhas Monastery;
   *   Sham Shui Po — Shek Kip Mei fire; Southern — Ocean Park Hong Kong;
   *   Tai Po — Hong Kong Railway Museum; Tsuen Wan — Sam Tung Uk Museum;
   *   Tuen Mun — Tsing Shan Monastery; Wan Chai — Happy Valley Racecourse;
   *   Wong Tai Sin — Wong Tai Sin Temple; Yau Tsim Mong — Clock Tower,
   *   Hong Kong; Yuen Long — Mai Po Marshes
   */
  HKG: {
    "Central and Western": {
      lyhyt: "Centralista Mid-Levelsiin nousee 800 metrin katettu liukuporrasreitti, joka kulkee aamulla alamäkeen ja muun päivän ylämäkeen.",
    },
    "Eastern": {
      lyhyt: "Quarry Bayn viisi toisiinsa kiinni rakennettua kerrostaloa, lempinimeltään Monster Building, ovat noin 10 000 ihmisen koti.",
    },
    "Islands": {
      lyhyt: "Cheung Chaun pullajuhlassa pystytetään pullilla peitettyjä torneja, ja juhlan aikana koko saari syö kolme päivää kasvisruokaa.",
    },
    "Kowloon City": {
      lyhyt: "Kai Takin lentoasema suljettiin 1998, ja sen vanhan kiitotien kärjessä on nyt risteilyalusten satama.",
    },
    "Kwai Tsing": {
      lyhyt: "Kwai Chungin ja Tsing Yin väliselle täytemaalle on rakennettu yhdeksän konttiterminaalia, joissa on yhteensä 27 laituripaikkaa.",
    },
    "Kwun Tong": {
      lyhyt: "Lei Yue Munin kalastajakylä Victorian sataman itäsuulla on tunnettu kalatoristaan ja merenelävien ravintoloistaan.",
    },
    "North": {
      lyhyt: "Fanlingin Lung Yeuk Taussa kulkee perintöpolku, joka yhdistää Tang-suvun viisi muurein ympäröityä kylää.",
    },
    "Sai Kung": {
      lyhyt: "High Islandin rantakallioissa näkyy kuusikulmaisia vulkaanisia kivipylväitä, jotka kuuluvat Hongkongin Unesco-geopuistoon.",
    },
    "Sha Tin": {
      lyhyt: "Kymmenentuhannen Buddhan luostariin kiivetään 431 porrasta, ja Buddha-patsaita on lopulta lähes 13 000.",
    },
    "Sham Shui Po": {
      lyhyt: "Shek Kip Mein hökkelikylän tulipalo jouluna 1953 jätti yli 53 000 ihmistä kodittomiksi ja käynnisti julkisen asuntorakentamisen.",
    },
    "Southern": {
      lyhyt: "Ocean Park -huvipuisto avattiin 1977, ja sen puolentoista kilometrin köysirata kulkee rannalta niemen huipulle.",
    },
    "Tai Po": {
      lyhyt: "Tai Po Marketin vanha rautatieasema vuodelta 1913 on nykyään rautatiemuseo.",
    },
    "Tsuen Wan": {
      lyhyt: "Sam Tung Uk on hakkalaisen Chan-suvun 1786 rakentama muurikylä, joka toimii nykyään museona.",
    },
    "Tuen Mun": {
      lyhyt: "Castle Peakin juurella on Tsing Shanin luostari, jonka taru kertoo maljalla matkanneesta munkki Pui Tosta.",
    },
    "Wan Chai": {
      lyhyt: "Happy Valleyn laukkaradalla kilpaillaan yleensä keskiviikkoiltaisin, ja katsomoihin mahtuu noin 55 000 ihmistä.",
    },
    "Wong Tai Sin": {
      lyhyt: "Wong Tai Sinin temppelissä ravistellaan bambuputkea, kunnes yksi ennustetikku putoaa ja tulkitsija kertoo sen merkityksen.",
    },
    "Yau Tsim Mong": {
      lyhyt: "Tsim Sha Tsuin rannassa seisoo 44-metrinen kellotorni vuodelta 1915, ainoa jäänne puretusta Kowloonin rautatieasemasta.",
    },
    "Yuen Long": {
      lyhyt: "Mai Pon soilla talvehtii kymmeniä tuhansia muuttolintuja, ja niiden ruoaksi hoidetaan perinteisiä gei wai -katkaraputekolampia.",
    },
  },
  /*
   * TWN (erä 9D). Avaimet MAAKUNNAT_KAIKKI.TWN:n tunnuksia TÄSMÄLLEEN
   * (piirikunnat ja kaupungit erikseen, esim. "Chiayi" ja "Chiayi City").
   * Vain `lyhyt`. Maastokohteiden (Yu Shan, salmi, Taroko, Santo Domingo,
   * Jiufen, Lukang, Chaotian, Fort Zeelandia, Wushantou, Sanxiantai,
   * Penghun saaristo) aiheita vältetty. Lähteet (en-Wikipedia ja haku
   * 25.9.2026):
   *   Changhua — Changhua Roundhouse; Chiayi — Alishan National Scenic
   *   Area; Chiayi City — Hinoki Village; Hsinchu — Beipu, Hsinchu;
   *   Hsinchu City — Hsinchu (Windy City) ja haku (riisinuudelit);
   *   Hualien — Liushidan Mountain (haku, East Rift Valley NSA); Kaohsiung
   *   City — Dragon and Tiger Pagodas; Keelung City — Keelung; Kinmen —
   *   wind lion gods (haku, Kinmen Travel); Miaoli — Sanyi, Miaoli;
   *   Nantou — Sun Moon Lake; Penghu — Twin Hearts Stone Weir (haku);
   *   Pingtung — Kenting National Park; Taichung City — National Taichung
   *   Theater; Tainan City — Tainan Confucian Temple; Taipei City — Taipei
   *   101; Taitung — Orchid Island; Taoyuan — Taoyuan International
   *   Airport; New Taipei City — Yehliu; Yilan — Guishan Island;
   *   Yunlin — Xiluo Bridge
   */
  TWN: {
    "Changhua": {
      lyhyt: "Changhuan viuhkanmuotoinen veturitalli vuodelta 1922 on Taiwanin ainoa säilynyt, ja sen kääntöpöydän ympärillä huolletaan yhä vetureita.",
    },
    "Chiayi": {
      lyhyt: "Alishanin vuorilla aamuaurinko nousee pilvimeren yläpuolelle, ja metsissä kasvaa ikivanhoja jättiläissypressejä.",
    },
    "Chiayi City": {
      lyhyt: "Hinoki Villagessa on kunnostettu 28 japanilaisajan puutaloa, joissa asuivat aikoinaan Alishanin metsätalouden virkailijat.",
    },
    "Hsinchu": {
      lyhyt: "Beipun pikkukaupungin asukkaista 98 prosenttia on hakkoja, ja siellä juodaan lei chaa, teestä ja pähkinöistä jauhettua juomaa.",
    },
    "Hsinchu City": {
      lyhyt: "Hsinchu on tuulen kaupunki: syksyn koillismonsuuni puhaltaa niin tasaisesti, että sen riisinuudelit on perinteisesti kuivattu tuulessa.",
    },
    "Hualien": {
      lyhyt: "Fulin Liushidan-vuoren ylätasanko muuttuu loppukesällä oranssiksi, kun päivänliljat kukkivat – kukista keitetään myös keittoa.",
    },
    "Kaohsiung City": {
      lyhyt: "Lootusjärvellä seisovat 1976 rakennetut seitsenkerroksiset Lohikäärme- ja Tiikeripagodit, joille kuljetaan siksak-siltaa pitkin.",
    },
    "Keelung City": {
      lyhyt: "Keelungia kutsutaan sadesatamaksi, sillä vettä sataa keskimäärin yli 3 700 millimetriä vuodessa.",
    },
    "Kinmen": {
      lyhyt: "Kinmenin kylien laidoilla seisoo kymmeniä kivisiä tuulileijonia, joiden uskotaan suojaavan kylää tuulelta ja pahalta.",
    },
    "Miaoli": {
      lyhyt: "Sanyita kutsutaan Taiwanin puunveiston kuningaskunnaksi, ja kaupungin puuveistosmuseo kertoo taidon historiasta.",
    },
    "Nantou": {
      lyhyt: "Aurinko- ja kuujärvi on Taiwanin suurin vesistö, ja sen keskellä olevaa Lalun saarta thao-kansa pitää pyhänä.",
    },
    "Penghu": {
      lyhyt: "Qimein saaren Kaksoissydänten kalapato on kivistä ja korallista ladottu allaspari, johon kalat jäävät laskuveden aikaan.",
    },
    "Pingtung": {
      lyhyt: "Kentingin kansallispuisto perustettiin 1984 Taiwanin ensimmäiseksi, ja siellä elää 26 maarapulajia.",
    },
    "Taichung City": {
      lyhyt: "Toyo Iton suunnittelema Taichungin kansallisteatteri vihittiin 2016, ja sen kaarevat seinät muodostavat luolamaisia tiloja.",
    },
    "Tainan City": {
      lyhyt: "Tainanin Konfutsen temppeli rakennettiin 1665, ja se oli Taiwanin ensimmäinen konfutselainen oppilaitos.",
    },
    "Taipei City": {
      lyhyt: "Taipei 101 on 508 metriä korkea, ja vuosina 2004–2010 se oli maailman korkein rakennus.",
    },
    "Taitung": {
      lyhyt: "Orkideasaarella tao-kansa rakentaa yhä tatala-kanootteja, ja lentokalat ovat keskeinen osa saaren ruokaa ja perinteitä.",
    },
    "Taoyuan": {
      lyhyt: "Taoyuanin kansainvälinen lentoasema avattiin 1979, ja se on Taiwanin suurin ja vilkkain lentoasema.",
    },
    "New Taipei City": {
      lyhyt: "Yehliun niemellä meri on kuluttanut kivestä Kuningattaren pään, jonka kapea kaula ohenee vuosi vuodelta.",
    },
    "Yilan": {
      lyhyt: "Guishanin saari Yilanin edustalla muistuttaa uivaa kilpikonnaa, ja se on Taiwanin ainoa aktiivinen tulivuori.",
    },
    "Yunlin": {
      lyhyt: "Xiluon silta ylittää Zhuoshui-joen 1 939 metrin matkalta, ja se vihittiin käyttöön tammikuussa 1953.",
    },
  },
  /*
   * PRK (erä 9D). Avaimet MAAKUNNAT_KAIKKI.PRK:n tunnuksia TÄSMÄLLEEN
   * (McCune–Reischauer-latinisointi, ŏ = U+014F, heittomerkki ASCII).
   * Vain `lyhyt`, vain maisema, kulttuuri ja historia. Lähteet
   * (en-Wikipedia 25.9.2026):
   *   Chagang-do — Chagang Province; Hamgyŏng-namdo — Hamhung Royal
   *   Villa; Hwanghae-namdo — Mount Kuwol; P'yŏngan-namdo — Songam
   *   Cavern; Kangwŏn-do — Kumgangsan; P'yŏngyang — Pyongyang Metro;
   *   Hamgyŏng-bukto — Chilbosan (North Hamgyong); Hwanghae-bukto —
   *   Historic Monuments and Sites in Kaesong; P'yŏngan-bukto — Pohyonsa;
   *   Rasŏn — North Korea–Russia border; Ryanggang — Heaven Lake
   */
  PRK: {
    "Chagang-do": {
      lyhyt: "Chagangin maakunnasta 98 prosenttia on vuoristoa, ja sen rajaa Kiinaa vasten seuraa Amnok- eli Yalujoki.",
    },
    "Hamgyŏng-namdo": {
      lyhyt: "Hamhŭngin kuninkaallisessa huvilassa asui Joseon-dynastian perustaja Yi Seong-gye ennen kuin hänestä tuli kuningas.",
    },
    "Hwanghae-namdo": {
      lyhyt: "Kuwolsan-vuoren nimi viittaa kuukalenterin yhdeksänteen kuukauteen, jolloin vuoren sanotaan olevan kauneimmillaan.",
    },
    "P'yŏngan-namdo": {
      lyhyt: "Songamin tippukiviluola löydettiin 1964 malminetsinnässä, ja sen käytäviä on yhteensä yli viisi kilometriä.",
    },
    "Kangwŏn-do": {
      lyhyt: "Kŭmgangsanin eli Timanttivuorten korkein huippu kohoaa itärannikolla 1 638 metriin, ja vanhastaan huippuja on sanottu olevan 12 000.",
    },
    "P'yŏngyang": {
      lyhyt: "Pjongjangin metro kulkee yli sadan metrin syvyydessä, ja liukuportailla laiturille kestää noin kolme ja puoli minuuttia.",
    },
    "Hamgyŏng-bukto": {
      lyhyt: "Ch'ilbosan eli Seitsemän aarteen vuori jakautuu sisä-, ulko- ja meri-Ch'ilboon, ja sen rinteillä on 800-luvulta periytyvä temppeli.",
    },
    "Hwanghae-bukto": {
      lyhyt: "Kaesŏng oli Koryŏ-dynastian pääkaupunki 900–1300-luvuilla, ja sen palatsien ja hautojen jäänteet ovat Unescon maailmanperintöä.",
    },
    "P'yŏngan-bukto": {
      lyhyt: "Myohyangsanin vuorilla on vuonna 1024 perustettu Pohyŏnin luostari, jonka yhdeksänkerroksinen pagodi on vuodelta 1044.",
    },
    "Rasŏn": {
      lyhyt: "Rasŏnissa Tumenjoen suulla kulkee Pohjois-Korean ja Venäjän raja, jonka maaosuus on vain 17 kilometriä.",
    },
    "Ryanggang": {
      lyhyt: "Paektusanin kraaterissa 2 189 metrin korkeudella on Taivaanjärvi, joka syntyi tulivuoren purkauksessa vuonna 946.",
    },
  },
  /*
   * TJK (erä 9D). Avaimet MAAKUNNAT_KAIKKI.TJK:n tunnuksia TÄSMÄLLEEN
   * (Natural Earthin vanhat nimet: "Leninabad" = Sughdin alue,
   * "Tadzhikistan Territories" = tasavallan alaiset piirit). Vain `lyhyt`.
   * Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Dushanbe — Dushanbe; Gorno-Badakhshan — Pamir Highway;
   *   Tadzhikistan Territories — Hisor Fortress (haku, Hisor,
   *   Tajikistan); Khatlon — Nurek Dam; Leninabad — Khujand
   */
  TJK: {
    "Dushanbe": {
      lyhyt: "Dušanbe tarkoittaa persiaksi maanantaita, sillä kaupunki kasvoi paikalle, jossa pidettiin joka maanantai suuret markkinat.",
    },
    "Gorno-Badakhshan": {
      lyhyt: "Pamirin valtatie kiipeää Ak-Baitalin solaan 4 655 metriin, ja se on maailman toiseksi korkein kansainvälinen maantie.",
    },
    "Tadzhikistan Territories": {
      lyhyt: "Hisorin laaksossa Dušanben länsipuolella seisoo linnoituksen portti kahden pyöreän tornin välissä, ja vieressä on 1500-luvun madrasa.",
    },
    "Khatlon": {
      lyhyt: "Nurekissa Vahš-jokea patoaa 300 metriä korkea pato, joka tuottaa noin 70 prosenttia Tadžikistanin sähköstä.",
    },
    "Leninabad": {
      lyhyt: "Hudžandin paikalle Aleksanteri Suuri perusti vuonna 329 eaa. kaupungin, jonka nimi oli Aleksandria Eshate eli Äärimmäinen Aleksandria.",
    },
  },
  /*
   * KGZ (erä 9D). Avaimet MAAKUNNAT_KAIKKI.KGZ:n tunnuksia TÄSMÄLLEEN
   * ("Ysyk-Köl" ö = U+00F6). Vain `lyhyt`. Lähteet (en-Wikipedia ja haku
   * 25.9.2026):
   *   Batken — Aigul-Tash / Fritillaria eduardii (haku); Bishkek —
   *   Bishkek; Chuy — Burana Tower; Naryn — Tash Rabat; Osh — Sulayman
   *   Mountain; Talas — Manas Ordo / Gumbez of Manas (haku); Ysyk-Köl —
   *   Issyk-Kul; Jalal-Abad — Arslanbob
   */
  KGZ: {
    "Batken": {
      lyhyt: "Aigul-Tashin rinne Batkenin lähellä muuttuu huhtikuussa parin viikon ajaksi oranssiksi, kun aigul-kukat aukeavat, ja vuori on suojeltu niiden vuoksi.",
    },
    "Bishkek": {
      lyhyt: "Biškekin nimi tulee puisesta männästä, jolla käyvää tammanmaitoa kirnutaan, ja kaupungin takana kohoaa Kirgisian Ala-Toon vuorijono.",
    },
    "Chuy": {
      lyhyt: "Tokmokin lähellä seisoo 1000-luvulla rakennettu Buranan minareetti, jonka korkeus on maanjäristysten jäljiltä enää 25 metriä.",
    },
    "Naryn": {
      lyhyt: "Tash Rabatin kivinen karavaaniseraiji on 3 200 metrin korkeudella vuoristolaaksossa, ja sen sisällä on 31 huonetta.",
    },
    "Osh": {
      lyhyt: "Sulaiman-Too-vuori keskellä Ošia on Kirgisian ainoa kokonaan maan omalla alueella oleva Unescon maailmanperintökohde.",
    },
    "Talas": {
      lyhyt: "Talasin Manas-kumbez on 1300-luvun hautamuistomerkki, jonka kirjoitus omistaa sen naiselle, vaikka kansa pitää sitä Manaksen hautana.",
    },
    "Ysyk-Köl": {
      lyhyt: "Ysyk-Köl on 1 607 metrin korkeudella vuorten keskellä, mutta suolaisen vetensä vuoksi se jäätyy vain harvoin.",
    },
    "Jalal-Abad": {
      lyhyt: "Arslanbobin 11 000 hehtaarin saksanpähkinämetsä on maailman suurin, ja syyskuussa kylä lähtee keräämään pähkinöitä.",
    },
  },
  /*
   * PNG (erä 10). Avaimet MAAKUNNAT_KAIKKI.PNG:n tunnuksia TÄSMÄLLEEN
   * (esim. "North Solomons" = Bougainville, "Northern" = Oro,
   * "National Capital District" = Port Moresby). Vain `lyhyt`.
   * Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   North Solomons — 2019 Bougainvillean independence referendum;
   *   Chimbu — Chimbu skeleton dancers (haku); East Sepik — Iatmul
   *   crocodile scarification (haku); Eastern Highlands — Goroka (haku,
   *   Coffee Industry Corporation); Enga — Enga Province; Gulf — Gulf
   *   Province; East New Britain — Baining people; Central — Varirata
   *   National Park (haku); West New Britain — Kimbe Bay; Madang — Manam
   *   2004 (haku, ReliefWeb); Manus — Papustyla pulcherrima; Milne Bay —
   *   Kenu and Kundu Festival (haku); Morobe — YUS Conservation Area;
   *   Northern — Queen Alexandra's birdwing; National Capital District —
   *   National Parliament House, Port Moresby (haku); Sandaun — Sandaun
   *   Province; Southern Highlands — Lake Kutubu; New Ireland — shark
   *   calling, Kontu (haku); Western — Ok Tedi Mine; Western Highlands —
   *   Mount Hagen
   */
  PNG: {
    "North Solomons": {
      lyhyt: "Bougainvillen kansanäänestyksessä vuonna 2019 yli 97 prosenttia äänestäjistä kannatti itsenäisyyttä Papua-Uudesta-Guineasta.",
    },
    "Chimbu": {
      lyhyt: "Simbun luurankotanssijat maalaavat mustan vartalonsa päälle valkoiset luut ja kallon, ja tanssi nähdään nykyään sing-sing-juhlissa.",
    },
    "East Sepik": {
      lyhyt: "Keski-Sepikin iatmul-kylissä nuorukaisten ihoon viilletään yhä krokotiilin suomuja muistuttavat arvet aikuisuuden merkiksi.",
    },
    "Eastern Highlands": {
      lyhyt: "Goroka on ylänköjen arabicakahvin keskus: ympäröiviltä rinteiltä kerätty kahvi kootaan ja ostetaan siellä ennen vientiä.",
    },
    "Enga": {
      lyhyt: "Engan kaikissa viidessä piirissä puhutaan samaa enga-kieltä, mikä on harvinaista maassa, jossa kieliä on yli 800.",
    },
    "Gulf": {
      lyhyt: "Kikori, Turama, Purari ja Vailala laskevat kaikki Gulfin maakunnassa Papuanlahteen, ja rannikko on yhtä jokisuistojen verkkoa.",
    },
    "East New Britain": {
      lyhyt: "Baining-kansan tulitanssissa naamioidut tanssijat juoksevat ja hyppivät nuotion hiilloksen läpi läpi yön aamunkoittoon asti.",
    },
    "Central": {
      lyhyt: "Port Moresbyn lähellä oleva Varirata oli Papua-Uuden-Guinean ensimmäinen kansallispuisto, ja sen metsissä näkee paratiisilintuja.",
    },
    "West New Britain": {
      lyhyt: "Kimbenlahden riutoilla elää yli 860 riuttakalalajia, ja lahti on yksi maan suosituimmista sukelluskohteista.",
    },
    "Madang": {
      lyhyt: "Manamin tulivuorisaarelta evakuoitiin vuonna 2004 yli 9 000 ihmistä mantereelle, ja moni asui leireissä vielä vuosikymmen myöhemmin.",
    },
    "Manus": {
      lyhyt: "Manuksen sademetsän puissa elää smaragdikotilo, jonka kirkkaanvihreä väri on vain ohuessa pintakalvossa keltaisen kuoren päällä.",
    },
    "Milne Bay": {
      lyhyt: "Alotaussa pidetään joka marraskuu Kenu ja Kundu -festivaali, jossa perinteiset kanootit kilpailevat kundu-rumpujen tahdissa.",
    },
    "Morobe": {
      lyhyt: "Huonin niemimaan YUS-alue oli Papua-Uuden-Guinean ensimmäinen suojelualue, ja sen kylät suojelevat uhanalaista Matschien puukengurua.",
    },
    "Northern": {
      lyhyt: "Popondettan rannikkometsissä elää maailman suurin perhonen, kuningatar Aleksandran lintusiipi, jonka siipiväli ylittää 25 senttiä.",
    },
    "National Capital District": {
      lyhyt: "Port Moresbyn parlamenttitalo on rakennettu Sepikin haus tambaran -henkitalojen mallin mukaan, ja se avattiin vuonna 1984.",
    },
    "Sandaun": {
      lyhyt: "Sandaun tarkoittaa tok pisiniksi auringonlaskua, koska maakunta on maan länsilaidalla – sen raja on Indonesiaa vasten.",
    },
    "Southern Highlands": {
      lyhyt: "Kutubujärvi on Papua-Uuden-Guinean toiseksi suurin järvi, ja siinä elää 13 kalalajia, joita ei ole missään muualla.",
    },
    "New Ireland": {
      lyhyt: "Kontun kylässä haita kutsutaan yhä: kalastaja helistää kookoskuorista tehtyä helistintä vedessä ja houkuttelee hain kanoottinsa viereen.",
    },
    "Western": {
      lyhyt: "Ok Tedin avolouhoksesta Fubilan-vuorelta kaivetaan kuparia ja kultaa, ja kaivos tuo noin neljänneksen koko maan vientituloista.",
    },
    "Western Highlands": {
      lyhyt: "Mount Hagen on Papua-Uuden-Guinean kolmanneksi suurin kaupunki, ja se on saanut nimensä läheisestä kuluneesta tulivuoresta.",
    },
  },
  /*
   * SLB (erä 10). Avaimet MAAKUNNAT_KAIKKI.SLB:n tunnuksia TÄSMÄLLEEN
   * ("Capital Territory (Honiara)"). Vain `lyhyt`. Lähteet (en-Wikipedia
   * ja haku 25.9.2026):
   *   Central — Savo Island; Choiseul — Choiseul Island; Guadalcanal —
   *   Guadalcanal Province; Capital Territory (Honiara) — Honiara;
   *   Isabel — Diocese of Ysabel (haku); Makira — Makira-Ulawa Province;
   *   Malaita — Malaita Province; Rennell and Bellona — Laticauda
   *   crockeri; Temotu — Tevau (haku, museokokoelmat); Western — Western
   *   Province (Solomon Islands), 2007 earthquake
   */
  SLB: {
    "Central": {
      lyhyt: "Savon saaren kuumaan hiekkaan isojalkakanat hautaavat munansa hautoutumaan, ja kyläläiset keräävät isot munat ruoaksi.",
    },
    "Choiseul": {
      lyhyt: "Choiseulin omakielinen nimi on Lauru, ja Maetamben vuoren ympärillä kasvaa Salomonsaarten parhaiten säilynyttä kalkkikivimetsää.",
    },
    "Guadalcanal": {
      lyhyt: "Guadalcanalin maastosta löytyy yhä toisen maailmansodan räjähtämättömiä ammuksia, ja niiden raivaus jatkuu edelleen.",
    },
    "Capital Territory (Honiara)": {
      lyhyt: "Honiaran kartion muotoinen parlamenttitalo valmistui vuonna 1993 Yhdysvaltain avustuksella kaupungin yläpuolelle.",
    },
    "Isabel": {
      lyhyt: "Isabelin pääkylä Buala on sekä maakunnan hallintokeskus että Melanesian anglikaanisen kirkon Ysabelin hiippakunnan kotipaikka.",
    },
    "Makira": {
      lyhyt: "Makiralla on enemmän sisämaan soita – ja suistokrokotiileja – kuin millään muulla Salomonsaarten saarella.",
    },
    "Malaita": {
      lyhyt: "Malaita on Salomonsaarten väkirikkain maakunta, ja siihen kuuluu myös kaukana pohjoisessa oleva polynesialainen Ontong Javan atolli.",
    },
    "Rennell and Bellona": {
      lyhyt: "Rennellin Teganojärven murtovedessä elää merikäärmelaji, jota ei tavata missään muualla maailmassa.",
    },
    "Temotu": {
      lyhyt: "Santa Cruzin saarilla kierrettiin tevau-rahaa punaisista höyhenistä, ja yhteen rullaan kului yli 300 linnun höyhenet.",
    },
    "Western": {
      lyhyt: "Vuoden 2007 maanjäristys nosti Läntisen maakunnan Ranonggan saarta kerralla 2,5–3 metriä ylemmäs merenpinnasta.",
    },
  },
  /*
   * FJI (erä 10). Avaimet MAAKUNNAT_KAIKKI.FJI:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Lähteet (en-Wikipedia 25.9.2026):
   *   Central — Suva; Eastern — Lau Islands; Northern — Savusavu;
   *   Rotuma — Rotuma; Western — Lautoka
   */
  FJI: {
    "Central": {
      lyhyt: "Suvan Laucalanlahden rannalla on Etelä-Tyynenmeren yliopiston pääkampus, jonka omistavat useat saarivaltiot yhdessä.",
    },
    "Eastern": {
      lyhyt: "Lau-saarilla kriketti on suositumpaa kuin rugby, ja saaret ovat koko Fidžin kriketin keskus.",
    },
    "Northern": {
      lyhyt: "Savusavun Nakaman kuumissa lähteissä vesi on lähes kiehuvaa, ja kyläläiset keittävät niissä taroa ja leipäpuun hedelmiä.",
    },
    "Rotuma": {
      lyhyt: "Rotuman maata saavat omistaa ja käyttää vain rotumalaiset, vaikka saari kuuluu Fidžiin 646 kilometrin päässä Suvasta.",
    },
    "Western": {
      lyhyt: "Lautokaa sanotaan Sokerikaupungiksi: sen sokeritehdas on toiminut vuodesta 1903 ja on kaupungin suurin työnantaja.",
    },
  },
  /*
   * VUT (erä 10). Avaimet MAAKUNNAT_KAIKKI.VUT:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Malampa — Malampa Province; Penama — Maewo; Sanma — SS President
   *   Coolidge; Shefa — Hideaway Island underwater post office (haku,
   *   Vanuatu Post); Tafea — John Frum; Torba — Torba Province
   */
  VUT: {
    "Malampa": {
      lyhyt: "Malampan nimi on koottu sen kolmen pääsaaren alkutavuista: MALakula, AMbrym ja PAama.",
    },
    "Penama": {
      lyhyt: "Penamaan kuuluva Maewo on Vanuatun sateisin saari, noin 3 500 millimetriä vuodessa, ja sen rinteiltä syöksyy vesiputouksia.",
    },
    "Sanma": {
      lyhyt: "Espiritu Santon edustalla makaa miinaan 1942 ajanut SS President Coolidge, ja hylkyyn sukelletaan suoraan rannalta.",
    },
    "Shefa": {
      lyhyt: "Hideaway Islandin edustalla Port Vilan lähellä on vedenalainen posti, johon sukeltajat pudottavat vedenkestäviä postikortteja.",
    },
    "Tafea": {
      lyhyt: "Tannalla John Frumin liikkeen kannattajat marssivat yhä joka 15. helmikuuta ja odottavat John Frumin paluuta.",
    },
    "Torba": {
      lyhyt: "Torban pienillä saarilla puhutaan 17:ää eri kieltä, ja kutakin niistä puhuu keskimäärin vain noin 550 ihmistä.",
    },
  },
  /*
   * NCL (erä 10). Avaimet MAAKUNNAT_KAIKKI.NCL:n tunnuksia TÄSMÄLLEEN
   * ("Îles Loyauté" Î = U+00CE, é = U+00E9). Vain `lyhyt`. Lähteet
   * (en-Wikipedia ja haku 25.9.2026):
   *   Sud — Tjibaou Cultural Centre; Îles Loyauté — Loyalty Islands
   *   Province; Nord — Hienghène, La Poule Couveuse (haku, New Caledonia
   *   Tourism)
   */
  NCL: {
    "Sud": {
      lyhyt: "Nouméan Tjibaou-kulttuurikeskuksen kymmenen paviljonkia muistuttavat kanakien perinteisiä suurmajoja; korkein on 28 metriä.",
    },
    "Îles Loyauté": {
      lyhyt: "Loyaltysaarten asukkaista noin 95 prosenttia on kanakeja, ja saarilla puhutaan drehua, iaaita ja nengonea.",
    },
    "Nord": {
      lyhyt: "Hienghènen lahden suulla merestä nousee musta kalkkikivikallio, jota kutsutaan hautovaksi kanaksi, La Poule Couveuse.",
    },
  },
  /*
   * GRL (erä 10). Avaimet MAAKUNNAT_KAIKKI.GRL:n tunnuksia TÄSMÄLLEEN
   * (Natural Earthin kuntajako: Qaasuitsup jaettiin 2018 Avannaataan ja
   * Qeqertalikiin). Vain `lyhyt`. Lähteet (en-Wikipedia 25.9.2026):
   *   Nationalparken — Sirius Dog Sled Patrol; Kommune Kujalleq —
   *   Alluitsup Paa (Uunartoq); Pituffik — Pituffik Space Base;
   *   Qaasuitsup Kommunia — Qaasuitsup, Qaanaaq; Qeqqata Kommunia —
   *   Aasivissuit – Nipisat; Kommuneqarfik Sermersooq — Nuuk Airport
   */
  GRL: {
    "Nationalparken": {
      lyhyt: "Tanskan Sirius-partio kiertää Koillis-Grönlannin rannikkoa koiravaljakoilla: kaksi partiolaista ja 11–15 koiraa jopa neljä kuukautta kerrallaan.",
    },
    "Kommune Kujalleq": {
      lyhyt: "Uunartoqin saarella Alluitsup Paan lähellä kumpuaa 34–38-asteisia kuumia lähteitä, joissa kylpijät istuvat ulkona Etelä-Grönlannin kesässä.",
    },
    "Pituffik": {
      lyhyt: "Entinen Thulen lentotukikohta on vuodesta 2023 ollut Pituffikin avaruustukikohta, Yhdysvaltain puolustusministeriön pohjoisin asema.",
    },
    "Qaasuitsup Kommunia": {
      lyhyt: "Qaasuitsupin kunta jaettiin vuonna 2018 kahtia, ja sen pohjoisessa Qaanaaqissa narvalia metsästetään yhä kajakista.",
    },
    "Qeqqata Kommunia": {
      lyhyt: "Aasivissuit–Nipisatin maailmanperintöalueella on Grönlannin suurin karibujen ajojärjestelmä, 3,9 kilometriä pitkä.",
    },
    "Kommuneqarfik Sermersooq": {
      lyhyt: "Nuukin lentokentän kiitotie pidennettiin 2 200 metriin marraskuussa 2024, ja nyt pääkaupunkiin lennetään suoraan Kööpenhaminasta.",
    },
  },
  /*
   * BMU (erä 10). Avaimet MAAKUNNAT_KAIKKI.BMU:n tunnuksia TÄSMÄLLEEN
   * (avaimissa suora heittomerkki U+0027, teksteissä typografinen).
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   City of Hamilton — Hamilton, Bermuda; City of Saint George —
   *   St. George's, Bermuda; Devonshire — Devonshire Parish; Hamilton —
   *   Crystal Cave, Bermuda (haku); Paget — Paget Parish; Pembroke —
   *   Pembroke Parish; Saint George's — L.F. Wade International Airport;
   *   Sandys — Somerset Bridge; Smith's — Spittal Pond Nature Reserve
   *   (haku, Bermuda National Trust); Southampton — Gibbs Hill
   *   Lighthouse; Warwick — Warwick Academy
   */
  BMU: {
    "City of Hamilton": {
      lyhyt: "Bermudan pääkaupungissa Hamiltonissa asuu vain noin 850 ihmistä, ja koko kaupunki mahtuu alle neliökilometrille.",
    },
    "City of Saint George": {
      lyhyt: "St. George’sin St. Peter’s Church on läntisen pallonpuoliskon vanhin säilynyt anglikaaninen kirkko, ja siellä pidetään yhä jumalanpalveluksia.",
    },
    "Devonshire": {
      lyhyt: "Devonshiren keskellä on Devonshire Marsh, jonka suota suojelee kaksi luonnonsuojelualuetta, Firefly ja Freer Cox.",
    },
    "Hamilton": {
      lyhyt: "Hamiltonin seurakunnan Crystal Caven löysi kaksi krikettipalloa etsinyttä poikaa, ja sen pohjalla on kirkas maanalainen järvi.",
    },
    "Paget": {
      lyhyt: "Pagetissa on King Edward VII Memorial Hospital, koko Bermudan ainoa sairaala.",
    },
    "Pembroke": {
      lyhyt: "Pembroke on Bermudan tiheimmin asuttu seurakunta: sen viidellä neliökilometrillä asuu noin 11 000 ihmistä.",
    },
    "Saint George's": {
      lyhyt: "Bermudan lentoasema on St. David’s Islandilla, ja sitä varten tasoitettiin sodan aikana kokonainen saari ja täytettiin salmia.",
    },
    "Sandys": {
      lyhyt: "Sandysin Somerset Bridgeä sanotaan maailman pienimmäksi toimivaksi läppäsillaksi: aukko on vain noin 80 senttiä, juuri maston mentävä.",
    },
    "Smith's": {
      lyhyt: "Smith’sin Spittal Pond on Bermudan suurin luonnonsuojelualue, ja muuttolinnut pysähtyvät sen murtovesilammelle keväin ja syksyin.",
    },
    "Southampton": {
      lyhyt: "Southamptonin Gibbs Hillin majakka on valurautaa, ja sen huipulle kiivetään 185 askelmaa.",
    },
    "Warwick": {
      lyhyt: "Warwick Academy on perustettu vuonna 1662, ja se on Bermudan vanhin koulu.",
    },
  },
  /*
   * SHN (erä 10). Avaimet MAAKUNNAT_KAIKKI.SHN:n tunnuksia TÄSMÄLLEEN.
   * Vain `lyhyt`. Lähteet (en-Wikipedia ja haku 25.9.2026):
   *   Ascension — Green Mountain (haku, Ascension Island Government);
   *   Saint Helena — Jacob's Ladder (Saint Helena); Tristan da Cunha —
   *   Tristan da Cunha
   */
  SHN: {
    "Ascension": {
      lyhyt: "Ascensionin Green Mountainin huipulla kasvaa ihmisen istuttama pilvimetsä, joka syntyi Joseph Hookerin suunnitelmasta 1800-luvulla.",
    },
    "Saint Helena": {
      lyhyt: "Jamestownista nousee Ladder Hillin rinnettä suoraan ylös Jacob’s Ladder, 699 askelman porraskuja.",
    },
    "Tristan da Cunha": {
      lyhyt: "Tristan da Cunhalla ei ole kiitotietä, joten ainoa kylä Edinburgh of the Seven Seas on saavutettavissa vain laivalla Kapkaupungista.",
    },
  },
  /*
   * KOR. Avaimet MAAKUNNAT_KAIKKI.KOR:n tunnuksia TÄSMÄLLEEN (kopioitu
   * koneellisesti). Vain `lyhyt`. Vältetty maastokohteet-kor.js:n
   * aiheita (Hallasan, Nakdong, Gyeongju, Haeinsa, Hwaseong, Hahoe,
   * Gochang, Jeonju, Baekje, Songgwangsa). Lähteet (en-Wikipedia ja
   * haku 26.9.2026):
   *   Busan — Jagalchi Market; Daegu — Yangnyeongsi; Daejeon —
   *   Sungsimdang; South Chungcheong — Boryeong Mud Festival; South
   *   Gyeongsang — Jinju Namgang Yudeung Festival; South Jeolla —
   *   Boseong County; Gangwon — Alpensia Resort; Gwangju — Gwangju
   *   Biennale; Gyeonggi — Everland; Incheon — Chinatown, Incheon;
   *   Jeju — Haenyeo; North Chungcheong — North Chungcheong Province;
   *   North Gyeongsang — Homigot; North Jeolla — Saemangeum Seawall;
   *   Sejong — Sejong City; Seoul — Cheonggyecheon; Ulsan — haku
   *   (Autocar: Inside Ulsan, the world's biggest car factory)
   */
  KOR: {
    "Busan": {
      lyhyt: "Busanin Jagalchin kalatori on Etelä-Korean suurin, ja sen tunnetuimpia myyjiä ovat yhä jagalchi-ajummat, kalaa kauppaavat naiset.",
    },
    "Daegu": {
      lyhyt: "Daegun yrttitori Yangnyeongsi on toiminut vuodesta 1658, ja sen Yakjeon-kujalla on yhä noin 180 perinteisen lääkinnän liikettä.",
    },
    "Daejeon": {
      lyhyt: "Sungsimdang-leipomo perustettiin Daejeoniin 1956, ja sen soboro-pullaa saa vain sieltä, sillä leipomolla ei ole myymälöitä muualla.",
    },
    "South Chungcheong": {
      lyhyt: "Boryeongin Daecheonin rannalla pidetään joka heinäkuu mutafestivaali, jossa väki kieriskelee rannikon mutatasankojen mudassa.",
    },
    "South Gyeongsang": {
      lyhyt: "Jinjussa Nam-joelle lasketaan joka lokakuu lyhtyjä muistoksi niille, jotka kuolivat kaupungin piirityksissä Imjin-sodassa 1590-luvulla.",
    },
    "South Jeolla": {
      lyhyt: "Boseongin rinteiden terassimaiset teeviljelmät tuottavat noin 40 prosenttia koko Etelä-Korean teestä.",
    },
    "Gangwon": {
      lyhyt: "Pyeongchangin Alpensiassa ovat yhä vuoden 2018 talviolympialaisten mäkihyppytornit ja kelkkarata.",
    },
    "Gwangju": {
      lyhyt: "Gwangjussa järjestetään joka toinen vuosi nykytaiteen biennaali, joka perustettiin 1995 ja tuo kaupunkiin taiteilijoita ympäri maailmaa.",
    },
    "Gyeonggi": {
      lyhyt: "Yonginissa sijaitseva Everland on Etelä-Korean suurin teemapuisto, ja sen puinen T Express -vuoristorata syöksyy alas 77 asteen kulmassa.",
    },
    "Incheon": {
      lyhyt: "Incheonin Chinatownin jajangmyeon-museo toimii Gonghwachunissa, ravintolassa, jonka katsotaan tarjonneen mustapapunuudeleita Koreassa ensimmäisenä.",
    },
    "Jeju": {
      lyhyt: "Jejun haenyeo-sukeltajat, enimmäkseen iäkkäitä naisia, sukeltavat ilman happilaitteita jopa 20 metrin syvyyteen merikorvien ja merisiilien perässä.",
    },
    "North Chungcheong": {
      lyhyt: "Pohjois-Chungcheong on Etelä-Korean ainoa maakunta, jolla ei ole lainkaan merenrantaa.",
    },
    "North Gyeongsang": {
      lyhyt: "Homigot-niemen edustalla nousee merestä 8,5 metriä korkea käsiveistos, ja uudenvuodenaamuna rannalle kerääntyy tuhansia katsomaan auringonnousua.",
    },
    "North Jeolla": {
      lyhyt: "Saemangeumin merivalli Gunsanin ja Buanin välillä on 33 kilometriä pitkä, maailman pisin ihmisen rakentama pato.",
    },
    "Sejong": {
      lyhyt: "Sejong perustettiin 2007 uudeksi hallintokaupungiksi, ja nykyään siellä toimivat pääministerin kanslia ja kymmenkunta ministeriötä.",
    },
    "Seoul": {
      lyhyt: "Soulin keskustassa virtaa Cheonggyecheon-puro, joka avattiin 2005 uudelleen puretun moottoritien alta, ja sen rantoja voi kävellä lähes 11 kilometriä.",
    },
    "Ulsan": {
      lyhyt: "Hyundain Ulsanin tehdas on maailman suurin yksittäinen autotehdas, ja sillä on oma satama, josta valmiit autot lastataan suoraan laivoihin.",
    },
  },
};
