// Matkakirjan saapumistekstit (Aasia ja Lähi-itä) — sama muoto ja sama
// ääni kuin Euroopan ja Afrikan teksteissä.
//
//  - `kuvaus` on nuoren Foggin tuore fiilis paikasta. Ensimmäinen lause
//    näkyy lihavoituna ja lukija lukee koko merkinnän ääneen tunteella.
//  - `nosto` päättää merkinnän isoisän kirjan lainaukseen niin, että
//    lähde käy ilmi tekstistä itsestään — erillistä otsikkoa ei ole.
//
// Kaupunkien välillä on tarkoituksella vaihtelua: riemua, hiljaista
// kunnioitusta, pelonsekaista ihailua, naurua ja vakavuutta. Jokaisessa
// merkinnässä on ainakin yksi tarkistettava luku tai vuosiluku — se on
// se kohta, josta pelaaja oppii jotain, ja se kestää lukemisen monta
// kertaa.
//
// Isoisän lainaukset ovat vuodelta 1873 (hänen oma matkansa) tai
// hänen kirjastaan ilman vuosilukua. Ne ovat sepitettä, kuten koko
// kehyskertomus, mutta niissä mainitut asiat ovat tosia.
export const ASIA_SAAPUMISET = {
  // --- Turkki, Kypros ja Levantti ---------------------------------------------
  izmir: {
    kuvaus: 'Izmirin rantakadulla lahti kaartui kaupungin ympäri kuin syli, '
      + 'ja ilmassa tuoksui paahdettu maissi. Vanhalla torilla '
      + 'marmoripylväät seisovat siellä, missä kauppiaat kävelivät jo '
      + 'kaksituhatta vuotta sitten — ja kauppa käy yhä.',
    nosto: 'Isoisä kirjoitti: "Smyrnan satamasta laivataan viikunoita ja '
      + 'rusinoita koko maailmalle." Kaupungin nimi on nyt Izmir — ja '
      + 'viikunat ovat yhä maailman parhaita.',
  },
  ankara: {
    kuvaus: 'Ankara yllätti: suurkaupunki keskellä ylänköä, jonne Turkki '
      + 'rakensi uuden pääkaupunkinsa sata vuotta sitten. Vanhan '
      + 'linnoituksen muurilta katsoin, kuinka vanha kaupunki valuu '
      + 'rinnettä alas kuin olisi aina ollut siinä.',
    nosto: 'Isoisä kirjoitti: "Angora on pieni kauppala, jonka vuohien '
      + 'villa on pehmeintä maailmassa." Kauppalasta tuli pääkaupunki — '
      + 'ja angoravilla on yhä nimensä veroista.',
  },
  kapadokia: {
    kuvaus: 'Kappadokiassa maisema ei näytä maapallolta: tuuli on veistänyt '
      + 'kivestä torneja, joihin ihmiset ovat kovertaneet koteja, '
      + 'kirkkoja ja kokonaisia maanalaisia kaupunkeja. Aamulla taivas '
      + 'täyttyi kuumailmapalloista kuin värikkäistä saippuakuplista.',
    nosto: 'Isoisä kirjoitti: "Täällä ihmiset asuvat kalliossa kuin '
      + 'linnut, ja ovet ovat kivitornien kyljissä." Kallioasuntoja '
      + 'vuokrataan nyt matkailijoille — nukuin itsekin yön kivessä.',
  },
  nikosia: {
    kuvaus: 'Nikosia on maailman viimeisiä kahtia jaettuja pääkaupunkeja: '
      + 'keskellä vanhaakaupunkia vastaan tulee piikkilankaa ja taloja, '
      + 'joissa aika pysähtyi vuosikymmeniä sitten. Näytin passini ja '
      + 'kävelin rajan yli kadulta toiselle.',
    nosto: 'Isoisä kirjoitti Kyproksesta: "Saarella on kreikkalaisia ja '
      + 'turkkilaisia kyliä vieretysten, ja kumpikin leipoo parempaa '
      + 'leipää kuin Lontoo." Leipä on yhä hyvää — viivan molemmin '
      + 'puolin.',
  },
  halab: {
    kuvaus: 'Halabin basaari oli sata vuotta maailman suurimpia katettuja '
      + 'kauppakatuja, kunnes sota poltti sen. Nyt holveja muurataan '
      + 'takaisin kaari kerrallaan, ja ensimmäiset kauppiaat myyvät '
      + 'taas saippuaa, jota täällä on keitetty laakerinlehdistä tuhat '
      + 'vuotta.',
    nosto: 'Isoisä kirjoitti: "Halabin basaarissa voi kävellä tunnin '
      + 'näkemättä taivasta, ja joka holvin alla tuoksuu eri mauste." '
      + 'Holvit nousevat uudelleen — ja saippua tuoksuu jo.',
  },
  damaskos: {
    kuvaus: 'Damaskoksessa on ostettu ja myyty samoilla kujilla kauemmin '
      + 'kuin missään muussa pääkaupungissa — kaupunki on ollut asuttu '
      + 'tuhansia vuosia. Suoraksi kutsuttu katu kulkee vanhankaupungin '
      + 'läpi täsmälleen samassa kohdassa kuin roomalaisten aikaan.',
    nosto: 'Isoisä kirjoitti: "Damaskoksen sepät takovat terästä, jonka '
      + 'maine kulkee kauppiaiden mukana kaikkialle." Damaskoksenteräs '
      + 'on yhä sana, jonka sepät lausuvat kunnioituksella.',
  },
  jerusalem: {
    kuvaus: 'Jerusalemin vanhassakaupungissa kaikki on rakennettu samasta '
      + 'vaaleasta kivestä, joka hehkuu ilta-auringossa kullanvärisenä. '
      + 'Muutaman korttelin sisällä ovat Itkumuuri, Pyhän haudan kirkko '
      + 'ja Kalliomoskeija — kolmen uskonnon pyhimmät paikat, melkein '
      + 'seinä seinässä.',
    nosto: 'Isoisä kirjoitti: "Täällä jokainen kivi on jollekulle pyhä, ja '
      + 'siksi jokaisesta kivestä myös kiistellään." Molemmat lauseet '
      + 'pitävät paikkansa yhä.',
  },
  petra: {
    kuvaus: 'Petraan kävellään kapeaa rotkoa pitkin, jonka seinät nousevat '
      + 'satoja metrejä. Sitten kallionrako aukeaa — ja edessä seisoo '
      + 'palatsin julkisivu, veistetty suoraan ruusunpunaiseen kallioon '
      + 'kaksituhatta vuotta sitten. Seisoin siinä enkä saanut sanaa '
      + 'suustani.',
    nosto: 'Isoisä kirjoitti: "Kaupunki, jonka paimentolaiset tunsivat ja '
      + 'kartat eivät." Nyt sen tuntee koko maailma — mutta rotkon '
      + 'päässä henkeä salpaa yhä.',
  },
  siinai: {
    kuvaus: 'Siinailla nousin vuorelle yöllä taskulampun valossa, ja '
      + 'huipulla odotimme auringonnousua vilttien alla. Kun valo tuli, '
      + 'autiomaa vaihtoi värinsä hetkessä harmaasta kullanpunaiseksi. '
      + 'Vuoren juurella seisoo luostari, joka on toiminut puolitoista '
      + 'tuhatta vuotta.',
    nosto: 'Isoisä kirjoitti: "Beduiiniopas tuntee polun pimeässäkin, '
      + 'sillä hänen sukunsa on kulkenut sitä sata sukupolvea." Samat '
      + 'suvut opastavat kulkijoita yhä.',
  },

  // --- Egypti ja Arabian niemimaa ---------------------------------------------
  luxor: {
    kuvaus: 'Luxorissa kävelin temppelisalissa, jonka pylväät ovat niin '
      + 'paksuja, ettei viisi ihmistä yllä käsistä kiinni niiden '
      + 'ympäri. Joen toisella rannalla on laakso, johon faaraot '
      + 'kätkivät hautansa — ja uusia kätköjä löytyy yhä.',
    nosto: 'Isoisä kirjoitti: "Niilin itäranta kuuluu eläville ja '
      + 'länsiranta kuolleille — niin täällä on aina ollut." Aurinko '
      + 'nousee yhä temppelien puolelta ja laskee hautojen.',
  },
  medina: {
    kuvaus: 'Medinassa tiet täyttyivät pyhiinvaeltajista: perheitä joka '
      + 'puolelta maailmaa, monet säästäneet tätä matkaa varten vuosia. '
      + 'Kaupungin sydämeen pääsevät vain muslimit, joten katsoin '
      + 'kaukaa, kuinka profeetan moskeijan vihreä kupoli hohti '
      + 'valkoisen kaupungin keskellä.',
    nosto: 'Isoisä kirjoitti: "Pyhiinvaeltaja myi minulle taateleita ja '
      + 'kertoi kävelleensä kotoaan asti — neljä kuukautta." Nykyään '
      + 'matka lennetään tunneissa, mutta perillä ollaan yhtä '
      + 'onnellisia.',
  },
  mekka: {
    kuvaus: 'Mekkaan minulla ei ollut asiaa: kaupunkiin saavat tulla vain '
      + 'muslimit. Tien varressa liikenne jakautui kahtia, ja '
      + 'pyhiinvaeltajien bussit jatkoivat kohti kaupunkia, jonka '
      + 'keskellä miljoonat kiertävät mustaa Kaabaa — samaan suuntaan, '
      + 'yhtenä virtana.',
    nosto: 'Isoisä kirjoitti: "Tänne minun jalkani eivät saa astua, ja '
      + 'hyvä niin — maailmassa saa olla paikkoja, jotka eivät ole '
      + 'minua varten." Käänsin katseeni pois kunnioituksesta, kuten '
      + 'hänkin.',
  },
  riad: {
    kuvaus: 'Riadissa lasitornit nousevat aavikosta kuin kangastus, ja '
      + 'niiden juurella seisoo vanha savilinnoitus — koko kaupunki oli '
      + 'vielä isovanhempien aikaan muutaman kadun kauppala. Illalla '
      + 'torilla myytiin taateleita kymmeninä lajikkeina, ja jokaista '
      + 'sai maistaa.',
    nosto: 'Isoisä ei käynyt Riadissa — sinne ei ollut tietä, vain '
      + 'kamelipolku aavikon poikki. Hän kirjoitti: "Sisämaassa '
      + 'sanotaan olevan kaupunki, jonne matka kestää kuukauden." '
      + 'Minulta se kesti kolme tuntia.',
  },
  rubalkhali: {
    kuvaus: 'Rub al-Khali tarkoittaa tyhjää neljännestä, eikä nimi '
      + 'liioittele: hiekkaa on edessä, takana ja sivuilla niin '
      + 'pitkälle kuin näkee, ja dyynit ovat korkeita kuin kerrostalot. '
      + 'Yöllä tähtiä oli enemmän kuin olen ikinä nähnyt — eikä yhtään '
      + 'muuta valoa.',
    nosto: 'Isoisä kirjoitti: "Maailman suurin hiekka-aavikko, jonka '
      + 'poikki eivät kulje kuin beduiinit — ja hekin sen reunoja." '
      + 'Ensimmäinen eurooppalainen ylitti sen vasta viisikymmentä '
      + 'vuotta myöhemmin.',
  },
  sana: {
    kuvaus: 'Sanaan vanhat talot ovat kuin piparkakkutaloja: '
      + 'monikerroksisia savitorneja, joiden ikkunat on kehystetty '
      + 'valkoisella kalkilla. Niissä on asuttu sukupolvesta toiseen '
      + 'yli tuhat vuotta. Sota on koetellut kaupunkia vuosia, mutta '
      + 'tornit seisovat, ja niitä paikataan.',
    nosto: 'Isoisä kirjoitti: "Sanaassa talot rakennetaan taivasta kohti, '
      + 'sillä tontti on kallis mutta taivas ilmainen." Samat talot '
      + 'kurottavat ylöspäin yhä.',
  },
  aden: {
    kuvaus: 'Adenin satama on sammuneen tulivuoren sisällä: laiva lipui '
      + 'kraatterin kylkeen, ja kaupunki kiipesi mustia rinteitä ylös. '
      + 'Täällä ovat pysähtyneet idän ja lännen väliä kulkevat laivat '
      + 'siitä asti, kun Suezin kanava avattiin.',
    nosto: 'Isoisä kirjoitti: "Aden on maailman kuumin satama ja tärkein '
      + 'hiilivarasto — jokainen Intiaan matkaava laiva täyttää täällä '
      + 'ruumansa." Hiili vaihtui öljyyn, mutta laivat kulkevat yhä '
      + 'samasta salmesta.',
  },
  salalah: {
    kuvaus: 'Salalahissa aavikko tekee tempun: kesän monsuuni tarttuu '
      + 'vuoriin, ja muutamaksi kuukaudeksi koko seutu muuttuu '
      + 'vihreäksi kuin puutarha. Torilla ostin palan suitsukepihkaa ja '
      + 'poltin sen illalla — huone tuoksui kuin vanha kirkko.',
    nosto: 'Isoisä kirjoitti: "Suitsuke kasvaa vain täällä, ja sillä on '
      + 'maksettu keisarien lunnaita." Pihkaa kerätään yhä samoista '
      + 'puista, veitsellä ja kärsivällisyydellä.',
  },
  masqat: {
    kuvaus: 'Masqat on ahdettu vuorten ja meren väliin niin tiukasti, että '
      + 'vanha kaupunki mahtuu kahden linnoituksen väliin. Satamassa '
      + 'keinuivat puiset dhow-veneet, samanmuotoiset kuin vuosisatoja '
      + 'sitten, ja rantakadulla tuoksui suolavesi ja suitsuke.',
    nosto: 'Isoisä kirjoitti: "Maskatin satamaa vartioi kaksi vanhaa '
      + 'linnaketta, ja sisään pääsee vain niiden ohi." Purjehdimme '
      + 'samasta aukosta — linnakkeet katsoivat yhä.',
  },
  dubai: {
    kuvaus: 'Dubaissa hissi ampaisi maailman korkeimman rakennuksen '
      + 'huipulle minuutissa, ja korvissa poksahti kuin lentokoneessa. '
      + 'Ylhäältä näkyi kaupunki, jota ei sata vuotta sitten ollut '
      + 'olemassa — vain lahti, jossa sukellettiin helmiä.',
    nosto: 'Isoisä kirjoitti lahden kylistä: "Täällä miehet sukeltavat '
      + 'pohjaan yhdellä hengenvedolla ja nostavat simpukoita, joiden '
      + 'sisällä voi olla aarre." Helmet loppuivat — mutta aarre '
      + 'päätettiin rakentaa itse.',
  },
  doha: {
    kuvaus: 'Dohan torilla on kauppoja, joissa myydään haukkoja: linnut '
      + 'istuvat orsillaan huppu silmillä, ja ostajat punnitsevat niitä '
      + 'käsivarrellaan kuin kalliita kelloja. Metsästyshaukka on '
      + 'täällä perheenjäsen — sillä on oma passi ja lentokoneessa oma '
      + 'paikka.',
    nosto: 'Isoisä kirjoitti: "Beduiinin paras omaisuus on haukka, joka '
      + 'palaa aina hänen luokseen." Haukat palaavat yhä — nyt '
      + 'ilmastoituihin halleihin.',
  },

  // --- Mesopotamia ja Persia ---------------------------------------------------
  kuwait: {
    kuvaus: 'Kuwaitin rannalla seisoo torneja, jotka näyttävät neulaan '
      + 'pujotetuilta helmiltä — kaupungin vesitornit, joista tuli sen '
      + 'tunnus. Ennen öljyä täällä rakennettiin puulaivoja ja '
      + 'purjehdittiin Intiaan asti, ja vanhalla veistämöllä '
      + 'dhow-veneitä syntyy yhä.',
    nosto: 'Isoisä kirjoitti: "Kuwaitin veistämöillä syntyvät lahden '
      + 'parhaat laivat, ja niiden rungot kestävät valtameren." '
      + 'Veistäjien taito elää — käsissä ja muistissa.',
  },
  bagdad: {
    kuvaus: 'Bagdad oli tuhat vuotta sitten maailman suurin kaupunki, jonka '
      + 'Viisauden talossa käännettiin kirjoja kaikilta tunnetuilta '
      + 'kieliltä. Tigrisin rannalla paistettiin kalaa avotulella, ja '
      + 'sillalla joku lausui runoja ääneen — täällä runoilijoita on '
      + 'aina arvostettu.',
    nosto: 'Isoisä kirjoitti: "Tuhannen ja yhden yön kaupunki on nähnyt '
      + 'parempia öitä, mutta sen tarinat eivät kulu." Eivät kuluneet — '
      + 'luin niitä hänen kirjastaan koko matkan.',
  },
  mosul: {
    kuvaus: 'Mosulissa vanhankaupungin kujat ovat taas täynnä elämää, '
      + 'vaikka sota jätti jälkensä joka kortteliin. Kuuluisa kalteva '
      + 'minareetti, jota kaupunkilaiset kutsuvat kyttyräseläksi, '
      + 'sortui sodassa — ja rakennettiin pystyyn uudelleen, vanhoista '
      + 'tiilistä.',
    nosto: 'Isoisä kirjoitti: "Mosulin kankaita kysytään Lontoossa asti — '
      + 'ohuinta puuvillaa, jota sormet tuskin tuntevat." Kankaan nimi '
      + 'elää kielessä yhä: musliini tarkoittaa Mosulin kangasta.',
  },
  tabriz: {
    kuvaus: 'Tabrizin basaari on maailman suurimpia katettuja markkinoita: '
      + 'holvikäytäviä on kilometrikaupalla, ja mattokauppiaan '
      + 'huoneessa juotiin teetä ennen kuin yhtään mattoa levitettiin. '
      + 'Kauppa on täällä keskustelua — hinta on vasta loppuhuipennus.',
    nosto: 'Isoisä kirjoitti: "Tabrizin matossa on solmuja tiheämmässä '
      + 'kuin tähtiä taivaalla, ja kauppias muistaa jokaisen kutojan '
      + 'nimen." Parhaat matot kudotaan yhä käsin — ja nimet '
      + 'muistetaan.',
  },
  teheran: {
    kuvaus: 'Teheranissa katujen päässä seisoo aina sama näky: Alborzin '
      + 'lumihuippuinen vuorimuuri, joka nousee suoraan kaupungin '
      + 'takaa. Aamulla vuoret olivat terävät, illalla ne hehkuivat '
      + 'punaisina liikenteen yllä. Basaarissa hinnat laskettiin '
      + 'helmitaululla.',
    nosto: 'Isoisä kirjoitti: "Shaahin aarrekammiossa on jalokivistä tehty '
      + 'karttapallo, jossa meret ovat smaragdia." Se karttapallo on '
      + 'yhä olemassa — ja meret ovat vihreät kuin silloin.',
  },
  isfahan: {
    kuvaus: 'Isfahanin suuresta aukiosta sanottiin ennen: Isfahan on puoli '
      + 'maailmaa. Moskeijoiden kupolit ovat sinisiä kuin taivas '
      + 'kirkkaimmillaan, ja illalla kaupunkilaiset istuivat vanhojen '
      + 'siltojen holveissa laulamassa — sillat on rakennettu myös '
      + 'oleskelua varten.',
    nosto: 'Isoisä kirjoitti: "Aukiolla pelattiin ratsain palloa jo '
      + 'shaahien aikaan, ja kivistä maalitolpat seisovat yhä '
      + 'paikoillaan." Ne seisovat vieläkin — neljäsataa vuotta '
      + 'vanhoina.',
  },
  persepolis: {
    kuvaus: 'Persepoliin portaikkoja reunustavat kivikuvat: pitkä jono '
      + 'lähettiläitä kantamassa lahjoja kuninkaalle — leijonia, '
      + 'kankaita, kultaa. Kävelin samat portaat ylös kuin he kaksi ja '
      + 'puoli tuhatta vuotta sitten. Pylväät seisovat, vaikka palatsit '
      + 'paloivat jo antiikin aikana.',
    nosto: 'Isoisä kirjoitti: "Aleksanteri poltti tämän kaupungin, ja '
      + 'silti se on säilynyt paremmin kuin moni elävä." Kivi muistaa '
      + 'pidempään kuin tuli.',
  },

  // --- Ural, Siperia ja Kaukoitä -----------------------------------------------
  jekaterinburg: {
    kuvaus: 'Jekaterinburgin laidalla seisoo kivipaasi, jonka toisella '
      + 'puolella lukee Eurooppa ja toisella Aasia. Seisoin hajareisin '
      + 'rajan päällä, yksi jalka kummassakin maanosassa — ja takanani '
      + 'toinen matkalainen odotti vuoroaan tehdäkseen täsmälleen '
      + 'saman.',
    nosto: 'Isoisä kirjoitti: "Uralin raja on tässä vain viiva, mutta '
      + 'juhlallinen sellainen — joka seurue pysähtyy sen kohdalla." '
      + 'Minäkin pysähdyin. Ja hyppäsin sitten maanosasta toiseen '
      + 'tasajalkaa.',
  },
  novosibirsk: {
    kuvaus: 'Novosibirsk on Siperian suurin kaupunki, ja se syntyi '
      + 'sillasta: kun Siperian rata ylitti Ob-joen, työmiesten '
      + 'parakkileiristä kasvoi suurkaupunki nopeammin kuin mikään muu '
      + 'Venäjällä. Talvella joki jäätyy niin paksuksi, että sen yli '
      + 'ajetaan autolla.',
    nosto: 'Isoisä kirjoitti näiltä main vain: "Arojen yli ajaa kärryillä '
      + 'viikon näkemättä kaupunkia." Kaupunkia ei ollutkaan — se '
      + 'syntyi vasta hänen jälkeensä. Nyt siinä asuu puolitoista '
      + 'miljoonaa ihmistä.',
  },
  irkutsk: {
    kuvaus: 'Irkutskista ajettiin Baikalille, ja opas kertoi järvestä '
      + 'lukuja, joita en meinannut uskoa: maailman syvin järvi, jossa '
      + 'on enemmän vettä kuin kaikissa Pohjois-Amerikan suurjärvissä '
      + 'yhteensä. Vesi oli niin kirkasta, että vene näytti leijuvan '
      + 'ilmassa.',
    nosto: 'Isoisä kirjoitti: "Baikalin vesi on kirkkainta, mitä olen '
      + 'kohdannut, ja siinä elää hylje tuhannen virstan päässä '
      + 'merestä." Se hylje, nerpa, elää siellä yhä — eikä kukaan tiedä '
      + 'varmasti, miten se sinne päätyi.',
  },
  jakutsk: {
    kuvaus: 'Jakutsk on maailman kylmin kaupunki: talvella pakkanen painuu '
      + 'alle viidenkymmenen, ja silloin hengitys jää ilmaan sumuna '
      + 'kadulle. Talot seisovat betonijaloilla irti maasta, koska '
      + 'ikirouta ei saa sulaa niiden alla — muuten talo vajoaa.',
    nosto: 'Isoisä kirjoitti: "Täällä turkiskauppias ei kysy, onko sinulla '
      + 'turkki, vaan montako." Ymmärsin kysymyksen jo lokakuussa.',
  },
  magadan: {
    kuvaus: 'Magadan on kaupunki maailman laidalla: takana Ohotanmeri, '
      + 'edessä loputon vuoristo. Se rakennettiin kullankaivuuta varten '
      + 'ankarina aikoina, ja rinteellä seisoo suuri kivikasvoinen '
      + 'muistomerkki niille, jotka tänne aikoinaan pakolla tuotiin.',
    nosto: 'Isoisän kartassa tätä kaupunkia ei ole — koko rannikolla lukee '
      + 'vain: "Tundraa, jonka poikki ei kulje tietä." Nyt tie on, ja '
      + 'sen päässä asutaan — kaukanakin koti on koti.',
  },
  kamtsatka: {
    kuvaus: 'Kamtšatkalla tulivuoria on tiheämmässä kuin missään muualla — '
      + 'lentokoneen ikkunasta ne näkyivät rivissä kuin lumihuippuiset '
      + 'keilat. Joella näimme karhun seisovan koskessa: se odotti '
      + 'kärsivällisesti, ja lohi hyppäsi suoraan sen suuhun.',
    nosto: 'Isoisä kirjoitti: "Niemimaa, jossa maa savuaa ja joet kiehuvat '
      + 'kaloja." Kumpikin on totta tänäkin päivänä — ja karhuja on '
      + 'monin paikoin enemmän kuin ihmisiä.',
  },
  sahalin: {
    kuvaus: 'Sahalinin satamassa nostettiin maihin kuningasrapuja, joiden '
      + 'jalat olivat pidemmät kuin käsivarteni. Saari on pitkä kuin '
      + 'kokonainen maa, ja sen eteläkärjestä näkee kirkkaalla säällä '
      + 'Japaniin — naapuri on ollut välillä ystävä, välillä jotain '
      + 'muuta.',
    nosto: 'Isoisä kirjoitti: "Saari, jonne keisari lähettää ne, joita ei '
      + 'halua nähdä." Vankileirit ovat kauan poissa — nyt saaren '
      + 'pitävät hengissä ravut, kalat ja öljy.',
  },
  vladivostok: {
    kuvaus: 'Vladivostokin asemalaiturilla seisoo pylväs, jossa lukee 9288 '
      + '— niin monta kilometriä rautatietä on Moskovaan. Junat '
      + 'lähtevät täältä viikon matkalle kuin bussit ikään. Satamassa '
      + 'sumutorvi huusi, ja toinen vastasi jostain lahden takaa.',
    nosto: 'Isoisä kirjoitti: "Kaupungin nimi tarkoittaa idän hallitsijaa, '
      + 'ja sen satamasta Venäjä katsoo Tyynellemerelle." Katsoo yhä — '
      + 'ja rata kulkee perille asti, mikä hänen aikanaan oli pelkkä '
      + 'haave.',
  },
  astana: {
    kuvaus: 'Astana nousee arolta kuin avaruusasema: lasipyramidi, '
      + 'valkoinen jättiteltta, jonka sisällä on kokonainen kauppakatu, '
      + 'ja torni, jonka kultaisesta pallosta katsotaan aroa '
      + 'horisonttiin asti. Melkein kaikki on rakennettu minun '
      + 'elinaikanani.',
    nosto: 'Isoisä kirjoitti aroista: "Ruohomeri, jossa ratsastaja näkyy '
      + 'tuntia ennen kuin saapuu." Meri on sama — mutta keskellä sitä '
      + 'on nyt pääkaupunki, joka talvella on maailman kylmimpiä.',
  },
  samarkand: {
    kuvaus: 'Samarkandin Registanin aukiolla kolme vanhaa koulurakennusta '
      + 'kaartuu toisiaan kohti, ja niiden seinät ovat sinistä kaakelia '
      + 'kuin taivasta olisi laskettu palasiksi. Silkkitien karavaanit '
      + 'kohtasivat täällä tuhat vuotta — Kiina ja Eurooppa vaihtoivat '
      + 'tavaraa ja tarinoita.',
    nosto: 'Isoisä kirjoitti: "Samarkandiin verrattuna moni Euroopan tori '
      + 'on eteinen." Aukio on entisellään — ja iltavalossa kaakelit '
      + 'hehkuvat kuin hänen aikanaan.',
  },
  kashgar: {
    kuvaus: 'Kashgarin sunnuntaitorille tullaan yhä aasinkärryillä ja '
      + 'kuorma-autoilla vieri vieressä: myynnissä on lampaita, '
      + 'mattoja, meloneja ja veitsiä, ja tinkiminen kuuluu kauas. Tämä '
      + 'keidaskaupunki on ollut Silkkitien portti vuorten yli '
      + 'kaksituhatta vuotta.',
    nosto: 'Isoisä kirjoitti: "Kashgarissa kohtaavat ne, jotka ovat '
      + 'ylittäneet maailman korkeimmat vuoret, ja ne, jotka vasta '
      + 'aikovat." Tori on yhä täynnä molempia.',
  },
  ulanbator: {
    kuvaus: 'Ulan Batorissa kerrostalojen takana alkavat jurtat: pyöreitä '
      + 'huopatelttoja, joissa moni kaupunkilainen yhä asuu. '
      + 'Naadam-juhlassa katsoin, kuinka lapset ratsastivat kilpaa '
      + 'kymmeniä kilometrejä arolla — voittaja oli minun ikäiseni ja '
      + 'otti voittonsa tyynesti.',
    nosto: 'Isoisä kirjoitti: "Mongoli oppii ratsastamaan ennen kuin '
      + 'kävelemään, eikä se ole sanonta vaan havainto." Havainto pätee '
      + 'yhä.',
  },
  lhasa: {
    kuvaus: 'Lhasassa jo kävely hengästytti: kaupunki on korkeammalla kuin '
      + 'Alppien huiput. Potalan palatsi nousee kalliolta tuhannen '
      + 'ikkunan voimalla, ja sen juurella pyhiinvaeltajat kiertävät '
      + 'temppeliä rukousmyllyjä pyörittäen — jokainen pyöräytys on '
      + 'yksi rukous.',
    nosto: 'Isoisä kirjoitti: "Kaupunki, jonne matkalaisella ei ole asiaa '
      + '— harva on nähnyt sen ja palannut kertomaan." Hän ei päässyt '
      + 'tänne. Pyöräytin myllyä myös hänen puolestaan.',
  },
  peking: {
    kuvaus: 'Pekingissä kävelin Kielletyn kaupungin läpi portista porttiin: '
      + 'aina kun luulin tulleeni perille, edessä aukesi uusi piha ja '
      + 'uusi palatsi. Keisarin kaupungissa sanotaan olevan lähes '
      + 'kymmenentuhatta huonetta — ja viisisataa vuotta kansa ei '
      + 'nähnyt niistä yhtäkään.',
    nosto: 'Isoisä kirjoitti: "Pekingin muurin portit ovat kuin vuoria, '
      + 'joihin on puhkaistu ovi." Suuret muurit purettiin sittemmin — '
      + 'mutta Kielletty kaupunki avattiin kaikille. Kävin keisarin '
      + 'pihassa lippua vilauttamalla.',
  },
  xian: {
    kuvaus: 'Xianissa seisoin kaiteen ääressä ja katsoin armeijaa: tuhansia '
      + 'savisotilaita riveissä, eikä kahta samanlaista kasvoa. '
      + 'Ensimmäinen keisari hautasi ne mukanaan yli kaksituhatta '
      + 'vuotta sitten, ja maanviljelijä löysi ne kaivoa kaivaessaan — '
      + 'vasta viisikymmentä vuotta sitten.',
    nosto: 'Isoisä kulki Xianin ohi tietämättä, että pellon alla nukkui '
      + 'armeija. Hän kirjoitti vain: "Täältä Silkkitie alkaa." '
      + 'Molemmat olivat totta koko ajan.',
  },
  shanghai: {
    kuvaus: 'Shanghaissa joen rannalla seisoo kaksi aikakautta vastakkain: '
      + 'toisella puolella isoisän aikaiset eurooppalaiset '
      + 'pankkipalatsit, toisella lasitornit, jotka katoavat pilviin. '
      + 'Lautta kulkee välissä edestakaisin kuin sukkula kahden '
      + 'vuosisadan väliä.',
    nosto: 'Isoisä kirjoitti: "Shanghaissa maailman kaupat kohtaavat: '
      + 'laiturilla puhutaan kymmentä kieltä ja lasketaan kolmella '
      + 'rahalla." Kieliä on yhä kymmenen — ja satama on maailman '
      + 'suurimpia.',
  },
  hongkong: {
    kuvaus: 'Hongkongissa raitiovaunu kiipesi Victoria-huipulle niin '
      + 'jyrkkää rinnettä, että talot ikkunan takana näyttivät '
      + 'kaatuvan. Ylhäältä kaupunki oli tornien metsä sataman '
      + 'ympärillä, ja illalla tuhannet valot syttyivät kuin '
      + 'tähtitaivas olisi kaadettu mereen.',
    nosto: 'Isoisä kirjoitti: "Kalastajakylästä on tullut satama, jossa '
      + 'käy enemmän laivoja kuin Lontoossa." Hän näki alun — mutta '
      + 'tätä huippua hän ei olisi arvannut.',
  },
  taipei: {
    kuvaus: 'Taipeissa hissi ampaisi tornin huipulle, ja sisällä näytettiin '
      + 'kultainen jättipallo, joka riippuu vaijereissa tornin sisässä: '
      + 'kun maa järisee tai taifuuni puhaltaa, pallo heilahtaa vastaan '
      + 'ja pitää tornin vakaana. Illalla söin yötorilla nyyttejä '
      + 'höyryävästä korista.',
    nosto: 'Isoisä kirjoitti saaresta: "Formosa tarkoittaa kaunista — '
      + 'portugalilaiset nimesivät sen laivan kannelta, eivätkä '
      + 'valehdelleet." Nimi vaihtui, kauneus ei.',
  },
  soul: {
    kuvaus: 'Soulissa keskellä kaupunkia virtaa puro, jonka rannalle '
      + 'kävellään portaita alas kuin toiseen maailmaan: ylhäällä '
      + 'pauhaa miljoonakaupunki, alhaalla ihmiset istuvat kivillä ja '
      + 'kastavat jalkojaan. Puro oli vuosikymmenet piilossa betonin '
      + 'alla — kunnes kaupunki kaivoi sen esiin.',
    nosto: 'Isoisä kirjoitti: "Soul on muurien ja porttien kaupunki, ja '
      + 'portit suljetaan yöksi kellon lyönnillä." Suuret portit '
      + 'seisovat yhä keskellä liikennettä — ja kelloa lyödään '
      + 'edelleen, juhlan vuoksi.',
  },
  tokio: {
    kuvaus: 'Tokiossa astuin risteykseen, jonka yli kävelee kerralla '
      + 'tuhansia ihmisiä joka suuntaan — eikä kukaan törmää kehenkään. '
      + 'Kadunkulman takana odotti pyhäkkö, jonka pihalla ei kuulunut '
      + 'mitään. Tämä kaupunki osaa olla kahta asiaa yhtä aikaa.',
    nosto: 'Isoisä kirjoitti: "Yedossa on juuri vaihdettu nimi ja koko '
      + 'valtakunnan suunta." Nimi vaihtui Tokioksi viisi vuotta ennen '
      + 'hänen matkaansa — ukko ehti nähdä muutoksen alun.',
  },

  // --- Kaakkois-Aasia ----------------------------------------------------------
  manila: {
    kuvaus: 'Manilassa liikenne on värikästä kirjaimellisesti: jeepneyt, '
      + 'entisistä armeijan jeepeistä rakennetut pikkubussit, on '
      + 'maalattu täyteen kukkia, tähtiä ja perheenjäsenten nimiä. '
      + 'Nousin kyytiin takaovesta, ja kolikkoni kulki kädestä käteen '
      + 'kuljettajalle asti.',
    nosto: 'Isoisä kirjoitti: "Manilan lahdella auringonlasku on niin '
      + 'punainen, että laivakello luullaan tulipaloksi." Katsoin sen '
      + 'itse — hän ei liioitellut.',
  },
  hanoi: {
    kuvaus: 'Hanoin vanhassakaupungissa kadut on nimetty tavaroiden mukaan: '
      + 'Silkkikatu, Bambukatu, Paperikatu — ja moni myy yhä juuri '
      + 'sitä. Yhdellä kujalla juna kulkee niin läheltä taloja, että '
      + 'asukkaat siirtävät tuolinsa sisään sen ajaksi ja takaisin heti '
      + 'perään.',
    nosto: 'Isoisä kirjoitti: "Kolmekymmentäkuusi katua, ja jokaisella oma '
      + 'ammattikuntansa — näin järjestetty kaupunki ei eksytä ketään." '
      + 'Minä eksyin silti. Onneksi.',
  },
  bangkok: {
    kuvaus: 'Bangkokissa astuin pitkähäntäveneeseen, ja kaupunki vaihtui '
      + 'kanaviksi: taloja paalujen päällä, temppeleitä joen rannassa, '
      + 'ja kauppias souti veneensä suoraan viereen myymään mangoa. '
      + 'Kultaiset temppelitornit välkkyivät puiden takana joka '
      + 'käännöksessä.',
    nosto: 'Isoisä kirjoitti: "Bangkok on idän Venetsia — kadut ovat vettä '
      + 'ja markkinat kelluvat." Autot tulivat sittemmin, mutta veneet '
      + 'eivät hävinneet minnekään.',
  },
  yangon: {
    kuvaus: 'Yangonissa Shwedagonin kultainen torni näkyy kaikkialle '
      + 'kaupunkiin, ja läheltä se häikäisee: koko valtava stupa on '
      + 'päällystetty aidolla kullalla, ja huipulla kimaltaa tuhansia '
      + 'jalokiviä. Kävelin sen ympäri paljain jaloin kuten kaikki — '
      + 'marmori oli lämmin jalkojen alla.',
    nosto: 'Isoisä kirjoitti: "Torni on kullattu kansan lahjoittamalla '
      + 'kullalla, lehti kerrallaan, sukupolvi toisensa perään." '
      + 'Kultaamista jatketaan yhä — näin, kun uusia lehtiä kannettiin '
      + 'ylös.',
  },
  singapore: {
    kuvaus: 'Singaporessa kaupunki ei ole puutarhassa vaan puutarha '
      + 'kaupungissa: keskustassa nousee teräksisiä jättipuita, joiden '
      + 'runkoja pitkin kasvaa tuhansia oikeita kasveja, ja illalla ne '
      + 'syttyvät valoshow\'ksi. Katu oli niin siisti, etten löytänyt '
      + 'roskaa edes etsimällä.',
    nosto: 'Isoisä kirjoitti: "Singapore on portti, jonka kautta idän ja '
      + 'lännen laivat kulkevat — joka toinen lippu on eri maasta." '
      + 'Portti ei sulkeutunut koskaan: satama on nyt maailman '
      + 'vilkkaimpia.',
  },
  sumatra: {
    kuvaus: 'Sumatralla kävelimme sademetsässä, ja opas pysähtyi äkkiä: '
      + 'ylhäällä latvustossa keinui oranssi hahmo pitkine '
      + 'käsivarsineen — orangutan, metsän ihminen, kuten nimi '
      + 'paikallisella kielellä kuuluu. Se katsoi meitä kaikessa '
      + 'rauhassa ja jatkoi matkaansa oksalta oksalle.',
    nosto: 'Isoisä kirjoitti: "Saaren metsissä asuu punainen apina, joka '
      + 'rakentaa joka ilta itselleen uuden vuoteen puiden latvoihin." '
      + 'Niin se tekee yhä — mutta metsää on jäljellä paljon vähemmän '
      + 'kuin ukon aikaan.',
  },
  borneo: {
    kuvaus: 'Borneolla tie oli joki: pitkä vene vei kylästä kylään, ja '
      + 'rannoilla nenäapinat loikkivat puissa kuin kömpelöt '
      + 'akrobaatit. Saaren sademetsä on maailman vanhimpia — se oli '
      + 'täällä jo silloin, kun dinosaurukset vielä katosivat.',
    nosto: 'Isoisä kirjoitti: "Sisämaahan ei ole tietä, mutta joet vievät '
      + 'minne vain, jos soutaja tuntee ne." Moottori korvasi airot — '
      + 'joet ovat yhä teitä.',
  },
  jakarta: {
    kuvaus: 'Jakarta on niin täynnä elämää, että kaupunki on käynyt '
      + 'raskaaksi maalleen: se vajoaa paikoin senttejä vuodessa, ja '
      + 'Indonesia rakentaa siksi kokonaan uutta pääkaupunkia toiselle '
      + 'saarelle. Vanhassa satamassa lastattiin yhä puisia '
      + 'purjelaivoja käsivoimin.',
    nosto: 'Isoisä kirjoitti: "Bataviassa kanavat ovat kuin Amsterdamissa, '
      + 'mutta ilma on kuin pesutuvassa." Nimi vaihtui Jakartaksi — '
      + 'kosteus ei vaihtunut mihinkään.',
  },

  // --- Etelä-Aasia -------------------------------------------------------------
  kathmandu: {
    kuvaus: 'Kathmandussa rukousliput liehuvat kattojen yli joka suuntaan, '
      + 'ja aamulla pilvien takaa nousi valkoinen muuri: Himalaja, '
      + 'maailman korkeimmat vuoret. Torilla kantaja nosti selkäänsä '
      + 'kokonaisen kaapin ja lähti vuoripolulle kuin se olisi '
      + 'koulureppu.',
    nosto: 'Isoisä kirjoitti: "Täältä alkaa maailman katto, eikä kukaan '
      + 'ole käynyt sen harjalla." Nyt on käyty monta kertaa — ja silti '
      + 'vuoret näyttävät yhtä mahdottomilta.',
  },
  delhi: {
    kuvaus: 'Delhin maustetorilla ilma kirveli silmiä chilistä, ja kantajat '
      + 'kuljettivat säkkejä pään päällä väkijoukon läpi erehtymättä '
      + 'kertaakaan. Kujien takana aukeni yhtäkkiä Punaisen '
      + 'linnoituksen muuri — kokonainen keisarin kaupunki kaupungin '
      + 'sisällä.',
    nosto: 'Isoisä kirjoitti: "Delhi on nähnyt seitsemän kaupunkia '
      + 'päällekkäin — jokainen valloittaja rakensi omansa edellisen '
      + 'viereen." Kahdeksas rakennettiin hänen jälkeensä. Sekin '
      + 'edellisten viereen.',
  },
  kolkata: {
    kuvaus: 'Kolkatassa ylitin Howrahin sillan, jota pitkin kulkee '
      + 'päivittäin enemmän ihmisiä kuin koko Suomessa asuu — virta ei '
      + 'katkennut hetkeksikään. Kirjakatu jatkui kortteleittain: '
      + 'kojuja, joissa kirjapinot nousevat kattoon, ja myyjä löytää '
      + 'pyydetyn hetkessä.',
    nosto: 'Isoisä kirjoitti: "Kalkutassa runoilijat ja kirjanpitäjät '
      + 'istuvat samassa kahvilassa, ja väittely kuuluu kadulle." '
      + 'Kuuluu yhä — se on täällä kansanhuvi.',
  },
  mumbai: {
    kuvaus: 'Mumbaissa katsoin, kuinka valkolakkiset miehet lajittelivat '
      + 'tuhansia ruokalaatikoita: dabbawalat noutavat joka aamu kotona '
      + 'tehdyn lounaan ja toimittavat sen junilla ja pyörillä juuri '
      + 'oikealle työpaikalle — satojatuhansia annoksia päivässä, '
      + 'käytännössä virheettä.',
    nosto: 'Isoisä kirjoitti: "Bombayn satamassa puretaan ja lastataan '
      + 'yötä päivää — tämä kaupunki ei nuku koskaan." Nimi vaihtui '
      + 'Mumbaiksi. Valvominen ei.',
  },
  chennai: {
    kuvaus: 'Chennaissa temppelitornit näkyvät katujen päissä kuin '
      + 'värikkäät vuoret: joka kerros on täynnä veistettyjä jumalia, '
      + 'sankareita ja eläimiä, maalattuina kaikin värein. Illalla koko '
      + 'kaupunki tuntui kävelevän Marina-rannalle — hiekkaa riittää '
      + 'kilometreittäin.',
    nosto: 'Isoisä kirjoitti: "Madrasin rannassa aallot ovat niin suuret, '
      + 'että laivat puretaan soutuveneillä." Satama rakennettiin '
      + 'myöhemmin — ranta jäi kaupunkilaisten iltakävelylle.',
  },
  colombo: {
    kuvaus: 'Colombossa haistoin sataman ennen kuin näin sen: kanelia, jota '
      + 'on viety täältä maailmalle vuosisatoja. Tuk-tuk kiemurteli '
      + 'liikenteessä kuin kala virrassa, ja kuljettaja kertoi ylpeänä, '
      + 'että hänen saarensa teetä juodaan joka mantereella.',
    nosto: 'Isoisä kirjoitti: "Ceylonin kaneli on niin arvokasta, että sen '
      + 'metsiä on vartioitu kuin aarrekammioita." Kaneli kasvaa '
      + 'saarella yhä — ja tee vei lopulta vielä suuremman maineen.',
  },
  karachi: {
    kuvaus: 'Karachissa ihastuin kuorma-autoihin: ne on maalattu täyteen '
      + 'kukkia, riikinkukkoja ja runonsäkeitä, ja peileistä roikkuu '
      + 'ketjuja, jotka helisevät ajaessa. Kuljettajat koristavat '
      + 'autonsa kuin palatsit, ja satamassa niitä jonotti tuhansia '
      + 'lastia hakemaan.',
    nosto: 'Isoisä kirjoitti: "Karachin satama kasvaa niin, että kartta '
      + 'vanhenee ennen kuin ehtii painosta." Kalastajakylästä kasvoi '
      + 'yksi maailman suurimmista kaupungeista — kartat vanhenevat '
      + 'yhä.',
  },
  kabul: {
    kuvaus: 'Kabulissa taivas täyttyi perjantaina leijoista: kymmeniä '
      + 'värikkäitä paperileijoja tanssi vuorten edessä, ja pojat '
      + 'ohjasivat niitä katoilta pelkällä langalla. Pudonnut leija '
      + 'kuuluu sille, joka saa sen kiinni — ja juoksu alkaa heti, kun '
      + 'lanka katkeaa.',
    nosto: 'Isoisä kirjoitti: "Kabul on kuin linnoitus laakson pohjalla, '
      + 'ja sen basaarissa myydään hevosia, mattoja ja vuorten '
      + 'viileyttä." Vuoret vartioivat kaupunkia yhä — ja leijat '
      + 'nousevat aina uudelleen.',
  },
};
