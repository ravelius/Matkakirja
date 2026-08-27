/*
 * Lippuikkunan sisällöt (omistajan tilaus 15.8.2026: "Tee lipusta
 * klikattava jolloin lippu aukeaa isompana omaan ikkunaan otsikkona
 * maan nimi. Lipun alla tietoja ja selitys lipun historiasta ja sen
 * merkityksistä. Alle pienempiä lippuja jos on historiallisia tai eri
 * versioita nykyisestä lipusta (puolustusvoimat yms). Tee pilotti
 * ensin Berliiniin ja Helsinkiin").
 *
 * Avain on sama Commons-tiedostonimi kuin kategoria.maaLippu — lehden
 * lippu muuttuu napautettavaksi vain, jos maalle on rivi tässä
 * taulussa. Tekstit kirjoittaa Fable ja faktat on tarkistettu;
 * versioliput on ladattu Commonsista repoon (assets/liput/versiot/,
 * viralliset liput ovat vapaita). Uusi maa = uusi rivi tähän + kuvat
 * samaan kansioon + sw.js:n SHELL.
 *
 * symboliikka (omistajan tilaus 15.8.2026: "Voisi olla boldattuna
 * otsikot: sininen =, valkoinen =, ja niin edelleen, riippuen mitä
 * elementtejä kussakin lipussa on") — lipun elementit boldatuin
 * otsikoin. tunnukset (sama tilaus: "Maan vaakuna olisi kiva lisätä
 * myös sekä mikäli maalla on joitain muitakin mielenkiintoisia
 * vastaavia") — vaakunat assets/liput/tunnukset/-kansiosta, lisenssit
 * tarkistettu Commonsista (kaikki PD).
 */

export const LIPPUTIEDOT = {
  'Flag of Finland.svg': {
    maa: 'Suomi',
    symboliikka: [
      { osa: 'Sininen', selite: 'järvien ja taivaan väri.' },
      { osa: 'Valkoinen', selite: 'lumen väri.' },
      {
        osa: 'Risti',
        selite: 'pohjoismainen ristilippu — sama ristin muoto kuin '
          + 'Tanskalla, Ruotsilla, Norjalla ja Islannilla.',
      },
    ],
    kappaleet: [
      'Siniristilippu vahvistettiin Suomen lipuksi toukokuussa 1918, '
        + 'puoli vuotta itsenäistymisen jälkeen. Ristin muoto on sama '
        + 'kuin muissa Pohjoismaissa — se kertoo, mihin joukkoon maa '
        + 'katsoi kuuluvansa.',
      'Sinivalkoisia värejä oli ehdotettu jo 1860-luvulla, ja Zachris '
        + 'Topelius oli ajatuksen tunnetuimpia puolestapuhujia. Värit '
        + 'on totuttu lukemaan niin, että sininen on järvien ja '
        + 'taivaan väri ja valkoinen lumen.',
      'Valinta ei ollut itsestään selvä: kilpailijana oli vaakunan '
        + 'punakeltainen leijonalippu, joka ehti keväällä 1918 olla '
        + 'muutaman kuukauden itsenäisen Suomen ensimmäinen '
        + 'valtiolippu.',
    ],
    versiot: [
      {
        nimi: 'Valtiolippu',
        polku: 'assets/liput/versiot/fin-valtiolippu.png',
        selite: 'Vaakunallinen valtiolippu: ristin keskellä Suomen '
          + 'leijonavaakuna. Valtion virastojen ja laitosten lippu.',
      },
      {
        nimi: 'Sotalippu',
        polku: 'assets/liput/versiot/fin-sotalippu.png',
        selite: 'Kolmikielekkeinen sotalippu — puolustusvoimien '
          + 'käyttämä valtiolipun asu.',
      },
      {
        nimi: 'Presidentin lippu',
        polku: 'assets/liput/versiot/fin-presidentinlippu.png',
        selite: 'Tasavallan presidentin lippu: kielekkeinen sotalippu, '
          + 'jonka yläkulmassa on sinivalkoinen vapaudenristi.',
      },
      {
        nimi: 'Leijonalippu 1918',
        polku: 'assets/liput/versiot/fin-leijonalippu-1918.png',
        selite: 'Itsenäisen Suomen ensimmäinen valtiolippu keväällä '
          + '1918: vaakunan punakeltaiset värit. Jäi käyttöön vain '
          + 'muutamaksi kuukaudeksi.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Suomen vaakuna',
        polku: 'assets/liput/tunnukset/fin-vaakuna.png',
        selite: 'Kruunupäinen leijona punaisella kentällä yhdeksän '
          + 'hopearuusun keskellä; haarniskoitu käsi kohottaa miekkaa '
          + 'ja jalat tallaavat käyrää sapelia. Kuva on totuttu '
          + 'lukemaan idän ja lännen väliin jääneen maan tunnukseksi. '
          + 'Leijona piirrettiin jo 1580-luvulla Kustaa Vaasan '
          + 'hautamuistomerkkiin Uppsalaan.',
      },
      {
        nimi: 'Helsingin vaakuna',
        polku: 'assets/liput/tunnukset/fin-helsinki-vaakuna.png',
        selite: 'Kultainen vene ja sen yllä kruunu sinisellä kentällä, '
          + 'alla hopeinen aallokko. Vene kertoo merikaupungista, '
          + 'kruunu kaupungin perustamisesta kuninkaan käskyllä 1550.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Germany.svg': {
    maa: 'Saksa',
    symboliikka: [
      {
        osa: 'Musta',
        selite: 'Lützowin vapaajoukon mustat univormutakit 1810-luvun '
          + 'vapaussodista.',
      },
      { osa: 'Punainen', selite: 'takkien punaiset käänteet.' },
      { osa: 'Kulta', selite: 'takkien kullanväriset messinkinapit.' },
      {
        osa: 'Yhdessä',
        selite: 'yhtenäisyyden ja vapauden värit vuoden 1848 '
          + 'vallankumouksesta asti.',
      },
    ],
    kappaleet: [
      'Musta-puna-kultaisen trikolorin juuret ovat 1810-luvun '
        + 'vapaussodissa: Lützowin vapaajoukon univormut olivat '
        + 'mustat, käänteet punaiset ja napit kullanväriset. Vuoden '
        + '1848 vallankumouksessa Frankfurtin parlamentti otti värit '
        + 'yhtenäisen Saksan tunnukseksi.',
      'Keisarikunta 1871–1918 käytti musta-valko-punaista lippua, ja '
        + 'trikolori palasi vasta Weimarin tasavallan mukana 1919. '
        + 'Natsihallinto poisti sen käytöstä 1933.',
      'Vuonna 1949 sekä Länsi- että Itä-Saksa valitsivat saman '
        + 'trikolorin. Itä-Saksa lisäsi 1959 keskelle oman '
        + 'tunnuksensa — vasaran, harpin ja tähkäseppeleen — ja '
        + 'yhdistymisestä 1990 lähtien koko maan lippu on taas ollut '
        + 'puhdas trikolori.',
    ],
    versiot: [
      {
        nimi: 'Virastolippu',
        polku: 'assets/liput/versiot/deu-virastolippu.png',
        selite: 'Liittovaltion virastolippu (Bundesdienstflagge): '
          + 'trikolori liittokotkan kilvellä. Vain viranomaiskäytössä.',
      },
      {
        nimi: 'Keisarikunta 1871–1918',
        polku: 'assets/liput/versiot/deu-keisarikunta.png',
        selite: 'Saksan keisarikunnan musta-valko-punainen lippu — '
          + 'Preussin ja hansakaupunkien värit.',
      },
      {
        nimi: 'DDR 1959–1990',
        polku: 'assets/liput/versiot/deu-ddr.png',
        selite: 'Itä-Saksan lippu: trikolori, jonka keskellä työn ja '
          + 'talonpoikien tunnus — vasara, harppi ja tähkäseppele.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Saksan liittokotka',
        polku: 'assets/liput/tunnukset/deu-vaakuna.png',
        selite: 'Musta kotka kultaisella kentällä, nokka ja jalat '
          + 'punaiset. Yksi Euroopan vanhimmista valtiotunnuksista — '
          + 'juuret keskiajan keisarien kotkassa.',
      },
      {
        nimi: 'Berliinin karhu',
        polku: 'assets/liput/tunnukset/deu-berliini-vaakuna.png',
        selite: 'Musta karhu hopeakentällä, kilven päällä kultainen '
          + 'kruunu. Karhu on kulkenut Berliinin sineteissä '
          + '1200-luvulta asti, ja kaupungin nimi ja Bär-sana ovat '
          + 'kietoutuneet kansan mielessä yhteen.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Sweden.svg': {
    maa: 'Ruotsi',
    symboliikka: [
      {
        osa: 'Keltainen',
        selite: 'valtakunnanvaakunan kulta — kolme kultaista kruunua.',
      },
      { osa: 'Sininen', selite: 'vaakunan sininen kenttä.' },
      { osa: 'Risti', selite: 'pohjoismainen ristilippu.' },
    ],
    kappaleet: [
      'Sinikeltainen ristilippu tunnetaan 1500-luvulta, Kustaa '
        + 'Vaasan ajoilta. Värit tulevat valtakunnanvaakunasta: kolme '
        + 'kultakruunua sinisellä kentällä. Tarina kuningas Erikistä, '
        + 'joka näki kultaisen ristin taivaalla ristiretkellä 1157, on '
        + 'legenda — mutta sitkeä sellainen.',
      'Norjan-unionin aikana 1844–1905 lipun yläkulmassa oli '
        + 'molempien maiden väreistä koottu unionimerkki, jota kansa '
        + 'kutsui silakkasalaatiksi.',
      'Nykyinen asu vahvistettiin lailla 1906, vuosi unionin '
        + 'purkautumisen jälkeen.',
    ],
    tunnukset: [
      {
        nimi: 'Kolme kruunua',
        polku: 'assets/liput/tunnukset/swe-vaakuna.png',
        selite: 'Pieni valtakunnanvaakuna: kolme kultaista kruunua '
          + 'sinisellä kilvellä. Tunnus tunnetaan viimeistään '
          + '1300-luvulta, ja sen alkuperä on yhä arvoitus. Kruunut '
          + 'näkyvät Ruotsissa kaikkialla poliisin merkeistä '
          + 'jääkiekkomaajoukkueen paitaan.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Ssolbergj / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Norway.svg': {
    maa: 'Norja',
    symboliikka: [
      {
        osa: 'Punainen ja valkoinen',
        selite: 'perintö Tanskan Dannebrogista, jonka alla Norja eli '
          + 'yli 400 vuotta.',
      },
      {
        osa: 'Sininen risti',
        selite: 'Ruotsin sini — ja yhdessä puna-valko-sininen oli '
          + 'aikansa vapauden väriyhdistelmä (Ranska, Yhdysvallat).',
      },
      { osa: 'Risti', selite: 'pohjoismainen ristilippu.' },
    ],
    kappaleet: [
      'Kansanedustaja Fredrik Meltzer piirsi lipun 1821. Hän valitsi '
        + 'värit sitomaan Norjan molempiin naapureihinsa ja samalla '
        + 'vapaiden kansojen trikoloreihin.',
      'Ruotsin-unionin aikana lipussa kannettiin unionimerkkiä. '
        + '"Puhtaan lipun" vaatimuksesta tuli itsenäisyysliikkeen '
        + 'tunnus, ja merkki poistettiin kauppalipusta 1899 — kuusi '
        + 'vuotta ennen unionin purkautumista 1905.',
    ],
    tunnukset: [
      {
        nimi: 'Norjan leijona',
        polku: 'assets/liput/tunnukset/nor-vaakuna.png',
        selite: 'Kruunattu kultaleijona kantaa Pyhän Olavin kirvestä '
          + 'punaisella kentällä. Tunnus periytyy 1200-luvun '
          + 'kuninkailta ja on Euroopan vanhimpia vaakunoita.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Denmark.svg': {
    maa: 'Tanska',
    symboliikka: [
      {
        osa: 'Valkoinen risti',
        selite: 'kristinuskon merkki punaisella pohjalla.',
      },
      {
        osa: 'Dannebrog',
        selite: 'koko pohjoismaisen ristilippuperheen esikuva.',
      },
    ],
    kappaleet: [
      'Dannebrog on maailman vanhin yhä käytössä oleva valtiolippu. '
        + 'Tarun mukaan se putosi taivaasta Lyndanissen taistelussa '
        + 'Tallinnan luona 15. kesäkuuta 1219 ja käänsi tanskalaisten '
        + 'tappion voitoksi.',
      'Varmat merkinnät lipusta ovat 1300-luvulta. Muut Pohjoismaat '
        + 'ottivat ristilippunsa mallin juuri Dannebrogista.',
      'Tanskassa lippu on arjen juhlakalu: sillä liputetaan '
        + 'syntymäpäivinä ja se koristaa joulukuusta.',
    ],
    tunnukset: [
      {
        nimi: 'Tanskan vaakuna',
        polku: 'assets/liput/tunnukset/dnk-vaakuna.png',
        selite: 'Kolme sinistä leijonaa ja punaisia sydämiä '
          + 'kultakentällä. Sinetteihin 1190-luvulla piirretty tunnus '
          + 'on Euroopan vanhimpia; "sydämet" ovat alkuaan '
          + 'järvenlehtiä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Galico & '
      + 'Derfel73 / Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Iceland.svg': {
    maa: 'Islanti',
    symboliikka: [
      { osa: 'Sininen', selite: 'vuorten ja taivaan sini.' },
      { osa: 'Valkoinen', selite: 'jäätiköt ja lumi.' },
      { osa: 'Punainen', selite: 'tulivuorten tuli.' },
      { osa: 'Risti', selite: 'pohjoismainen ristilippu.' },
    ],
    kappaleet: [
      'Islanti sai oman lipun 1915 ja täysivaltaisuuden myötä '
        + 'valtiolipun 1918. Tasavallan lipuksi se vahvistettiin '
        + 'itsenäistymispäivänä 17. kesäkuuta 1944.',
      'Väriluenta on kirjaimellisesti maisema: sininen vuoristo, '
        + 'valkoinen jää ja punainen tuli — saari, joka on syntynyt '
        + 'tulivuorista ja jäätiköistä.',
    ],
    tunnukset: [
      {
        nimi: 'Islannin vaakuna',
        polku: 'assets/liput/tunnukset/isl-vaakuna.png',
        selite: 'Lippukilpeä kannattelevat neljä maanhaltijaa '
          + '(landvættir): härkä, kotka, lohikäärme ja jättiläinen. '
          + 'Saagan mukaan ne torjuivat Tanskan kuninkaan noidan, '
          + 'joka lähestyi saarta valaan hahmossa eri rannoilta.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Estonia.svg': {
    maa: 'Viro',
    symboliikka: [
      { osa: 'Sininen', selite: 'taivas, järvet ja meri.' },
      { osa: 'Musta', selite: 'kotimaan multa ja raskas historia.' },
      { osa: 'Valkoinen', selite: 'lumi, valo ja toivo.' },
    ],
    kappaleet: [
      'Sinimustavalkoinen vihittiin Viron ylioppilaskunnan lipuksi '
        + 'Otepäässä 1884, keskellä kansallista heräämistä. '
        + 'Ylioppilaiden värit levisivät koko kansan lipuksi ja '
        + 'valtiolipuksi itsenäistymisen 1918 myötä.',
      'Neuvostoaikana lippu oli kielletty, ja perheet kätkivät '
        + 'lippujaan vuosikymmeniksi. Se palasi julkisuuteen '
        + 'lauluvallankumouksen vuosina ja vahvistettiin uudelleen '
        + 'valtiolipuksi 1990.',
    ],
    tunnukset: [
      {
        nimi: 'Viron vaakuna',
        polku: 'assets/liput/tunnukset/est-vaakuna.png',
        selite: 'Kolme sinistä leijonaa kultakentällä '
          + 'tammenlehväseppeleen ympäröimänä. Leijonat periytyvät '
          + 'vaakunasta, jonka Tanskan kuningas antoi Tallinnalle '
          + '1200-luvulla.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Latvia.svg': {
    maa: 'Latvia',
    symboliikka: [
      {
        osa: 'Karmiininpunainen',
        selite: '"Latvian punainen" — tummempi kuin tavallinen '
          + 'lipunpunainen.',
      },
      { osa: 'Valkoinen juova', selite: 'legendan valkoinen liina.' },
    ],
    kappaleet: [
      'Puna-valko-punainen lippu mainitaan jo 1200-luvun lopun '
        + 'riimikronikassa Cēsisin seudun heimojen lippuna — kuvaus '
        + 'on maailman vanhimpia.',
      'Legendan mukaan haavoittunut päällikkö käärittiin valkoiseen '
        + 'liinaan: keskikohta jäi valkoiseksi, reunat värjäytyivät '
        + 'verestä.',
      'Valtiolipuksi lippu vahvistettiin itsenäistymisen jälkeen. '
        + 'Neuvostoaikana se oli kielletty ja palasi käyttöön 1988, '
        + 'ennen itsenäisyyden palauttamista.',
    ],
    tunnukset: [
      {
        nimi: 'Latvian vaakuna',
        polku: 'assets/liput/tunnukset/lva-vaakuna.png',
        selite: 'Nouseva aurinko, punainen leijona (Kurinmaa ja '
          + 'Semgallen) ja hopeinen aarnikotka (Vidzeme ja Latgale); '
          + 'kolme tähteä ovat historialliset maakunnat. Vaakuna '
          + 'laadittiin itsenäistymisen jälkeen 1921.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Lithuania.svg': {
    maa: 'Liettua',
    symboliikka: [
      { osa: 'Keltainen', selite: 'aurinko ja vauraus.' },
      { osa: 'Vihreä', selite: 'luonto ja toivo.' },
      {
        osa: 'Punainen',
        selite: 'rohkeus ja maan puolesta vuodatettu veri.',
      },
    ],
    kappaleet: [
      'Trikolori valittiin itsenäistyvän Liettuan lipuksi 1918. '
        + 'Värit poimittiin kansanpukujen ja kudonnaisten '
        + 'perinteestä.',
      'Neuvostoaikana lippu oli kielletty. Se nostettiin uudelleen '
        + 'salkoihin 1988 Sąjūdis-liikkeen myötä ja palautettiin '
        + 'valtiolipuksi ennen itsenäisyyden palauttamista 1990.',
    ],
    tunnukset: [
      {
        nimi: 'Vytis',
        polku: 'assets/liput/tunnukset/ltu-vaakuna.png',
        selite: 'Valkoinen ratsumies miekka koholla punaisella '
          + 'kentällä. Vaakuna tunnetaan suuriruhtinas Algirdasin '
          + 'sinetistä vuodelta 1366 ja on Euroopan vanhimpia.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of France.svg': {
    maa: 'Ranska',
    symboliikka: [
      { osa: 'Sininen ja punainen', selite: 'Pariisin kaupungin värit.' },
      { osa: 'Valkoinen', selite: 'kuninkaan väri niiden välissä.' },
      {
        osa: 'Yhdessä',
        selite: 'vallankumouksen trikolori — vapauden tunnus.',
      },
    ],
    kappaleet: [
      'Trikolori syntyi vallankumouksessa, kun Pariisin sinipunaiseen '
        + 'kokardiin yhdistettiin kuninkaan valkoinen. Valtiolipuksi '
        + 'se vahvistettiin 1794.',
      'Malli levisi maailmalle: kymmenet uudet tasavallat ottivat '
        + 'kolmiraitaisen lipun vapauden merkiksi.',
    ],
    tunnukset: [
      {
        nimi: 'Tasavallan tunnus',
        polku: 'assets/liput/tunnukset/fra-vaakuna.png',
        selite: 'Liktorinvihko tammen- ja laakerinlehvien keskellä, '
          + 'nauhassa Liberté, Égalité, Fraternité. Ranskalla ei ole '
          + 'virallista vaakunaa — tasavalta käyttää tätä tunnusta '
          + 'muun muassa passeissa, ja epävirallisena tunnuksena '
          + 'elävät myös Marianne ja gallialainen kukko.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of the United Kingdom.svg': {
    maa: 'Iso-Britannia',
    symboliikka: [
      {
        osa: 'Pyhän Yrjön risti',
        selite: 'Englanti — punainen risti valkoisella.',
      },
      {
        osa: 'Pyhän Andreaan risti',
        selite: 'Skotlanti — valkoinen vinoristi sinisellä.',
      },
      {
        osa: 'Pyhän Patrikin risti',
        selite: 'Irlanti — punainen vinoristi.',
      },
    ],
    kappaleet: [
      'Union Jack yhdistää kolmen suojeluspyhimyksen ristit. '
        + 'Ensimmäinen unionilippu tehtiin 1606, kun Englannilla ja '
        + 'Skotlannilla oli yhteinen kuningas; nykyasu on vuodelta '
        + '1801, jolloin Irlanti liittyi unioniin.',
      'Wales ei näy lipussa — se oli liitetty Englantiin jo ennen '
        + 'ensimmäistä unionilippua. Walesilaiset ovat aika ajoin '
        + 'ehdottaneet punaisen lohikäärmeensä lisäämistä.',
    ],
    tunnukset: [
      {
        nimi: 'Kuninkaalliset vaakunat',
        polku: 'assets/liput/tunnukset/gbr-vaakuna.png',
        selite: 'Englannin leijona ja Skotlannin yksisarvinen '
          + 'kannattelevat kilpeä; nauhassa Dieu et mon droit. '
          + 'Yksisarvinen on kahleissa — tarun mukaan vapaana se '
          + 'olisi vaarallinen.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Wikimedia '
      + 'Commons (CC BY-SA 3.0)',
  },
  'Flag of the Netherlands.svg': {
    maa: 'Alankomaat',
    symboliikka: [
      {
        osa: 'Punainen, valkoinen ja sininen',
        selite: 'Oranian prinssin väreistä; alkuperäinen oranssi '
          + 'tummui punaiseksi 1600-luvulla.',
      },
      {
        osa: 'Oranssi',
        selite: 'kuningashuoneen väri — juhlapäivinä lipun yllä '
          + 'liehuu oranssi viiri.',
      },
    ],
    kappaleet: [
      'Oranssi-valko-sininen "prinssinlippu" oli kapinan tunnus '
        + 'Espanjan valtaa vastaan 1500-luvulla. Oranssi vaihtui '
        + 'punaiseen 1600-luvulla — väri haalistui merellä ja '
        + 'punainen erottui kauemmas.',
      'Lippu on maailman vanhimpia trikoloreja, ja sen '
        + 'väriyhdistelmä kiersi Pietari Suuren mukana Venäjälle ja '
        + 'sieltä edelleen slaavilaisiin lippuihin.',
    ],
    tunnukset: [
      {
        nimi: 'Kuningaskunnan vaakuna',
        polku: 'assets/liput/tunnukset/nld-vaakuna.png',
        selite: 'Kruunattu kultaleijona kantaa miekkaa ja seitsemän '
          + 'nuolen kimppua — muisto tasavallan seitsemästä '
          + 'maakunnasta. Nauhassa Je maintiendrai, "minä pysyn".',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Sodacan / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Spain.svg': {
    maa: 'Espanja',
    symboliikka: [
      {
        osa: 'Punainen ja keltainen',
        selite: '"rojigualda" — valittu 1785 näkyvyyden takia '
          + 'merellä.',
      },
      {
        osa: 'Vaakuna',
        selite: 'neljä kuningaskuntaa: Kastilian linna, Leónin '
          + 'leijona, Aragonian raidat ja Navarran kahleet.',
      },
    ],
    kappaleet: [
      'Kaarle III valitsi puna-kelta-punaisen merilipuksi 1785, '
        + 'jotta se erottuisi Bourbon-valtioiden valkoisista lipuista '
        + 'merellä. Asu vakiintui valtiolipuksi 1800-luvulla.',
      'Tasavallan vuosina 1931–1939 alaraita oli violetti. Nykyinen '
        + 'vaakunallinen asu vahvistettiin 1981.',
    ],
    tunnukset: [
      {
        nimi: 'Espanjan vaakuna',
        polku: 'assets/liput/tunnukset/esp-vaakuna.png',
        selite: 'Kilvessä Kastilian linna, Leónin leijona, Aragonian '
          + 'raidat, Navarran kahleet ja Granadan granaattiomena; '
          + 'keskellä Bourbonien liljat. Herkuleen pylväiden nauhassa '
          + 'Plus Ultra — "yhä edemmäs".',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Heralder / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Portugal.svg': {
    maa: 'Portugali',
    symboliikka: [
      { osa: 'Vihreä', selite: 'toivo.' },
      { osa: 'Punainen', selite: 'taisteluissa vuodatettu veri.' },
      {
        osa: 'Armillaaripallo',
        selite: 'löytöretkien merenkulkukoje vaakunan takana.',
      },
    ],
    kappaleet: [
      'Viher-punainen nousi tasavaltalaisten lipuksi ja '
        + 'valtiolipuksi 1911, kun monarkia oli kaatunut — sitä ennen '
        + 'lippu oli sinivalkoinen.',
      'Keskellä on armillaaripallo, löytöretkien ajan '
        + 'merenkulkukoje, ja sen päällä vanha kilpi: viisi pientä '
        + 'sinistä kilpeä ja seitsemän linnaa.',
    ],
    tunnukset: [
      {
        nimi: 'Portugalin vaakuna',
        polku: 'assets/liput/tunnukset/prt-vaakuna.png',
        selite: 'Viisi sinistä kilpeä ristinä (quinas) muistuttavat '
          + 'tarun mukaan viidestä voitetusta maurikuninkaasta; '
          + 'reunalla seitsemän kultaista linnaa. Takana '
          + 'löytöretkien armillaaripallo.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Italy.svg': {
    maa: 'Italia',
    symboliikka: [
      {
        osa: 'Vihreä, valkoinen ja punainen',
        selite: 'Ranskan trikolorin malli italialaisin värein; kansa '
          + 'lukee niihin maiseman, Alppien lumen ja veren.',
      },
    ],
    kappaleet: [
      'Trikolori syntyi Napoleonin ajan Cispadaanisessa '
        + 'tasavallassa 1797 Reggio Emiliassa, Ranskan lipun '
        + 'mallista.',
      'Yhdistyneen Italian lipuksi se tuli 1861 Savoijin vaakunalla '
        + 'varustettuna; tasavalta poisti vaakunan 1946.',
    ],
    tunnukset: [
      {
        nimi: 'Italian tunnus',
        polku: 'assets/liput/tunnukset/ita-vaakuna.png',
        selite: 'Italian tähti, työn tasavaltaa merkitsevä '
          + 'hammasratas sekä oliivin- ja tammenoksat — rauha ja '
          + 'kansan voima. Tunnus valittiin suunnittelukilpailulla '
          + '1948.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Switzerland.svg': {
    maa: 'Sveitsi',
    symboliikka: [
      {
        osa: 'Valkoinen risti',
        selite: 'valaliiton sotajoukkojen tunnus keskiajalta.',
      },
      {
        osa: 'Neliömuoto',
        selite: 'maailman lipuista vain Sveitsin ja Vatikaanin liput '
          + 'ovat neliöitä.',
      },
    ],
    kappaleet: [
      'Valkoinen risti punaisessa kentässä kulki valaliiton '
        + 'joukkojen mukana jo 1300-luvulla. Liittovaltion lipuksi '
        + 'asu vahvistui 1800-luvulla.',
      'Punainen Risti käänsi värit toisin päin: järjestön tunnus on '
        + 'kunnianosoitus perustajan Henry Dunantin kotimaalle.',
    ],
    tunnukset: [
      {
        nimi: 'Sveitsin vaakuna',
        polku: 'assets/liput/tunnukset/che-vaakuna.png',
        selite: 'Valaliiton risti kilpimuodossa. Kantonien omat '
          + 'kirjavat vaakunat elävät rinnalla — liittovaltion '
          + 'tunnus on tarkoituksella yksinkertainen.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Austria.svg': {
    maa: 'Itävalta',
    symboliikka: [
      {
        osa: 'Puna-valko-punainen',
        selite: 'Babenberg-herttuoiden vaakunan värit — tarun mukaan '
          + 'herttuan valkoinen viitta värjäytyi taistelussa verestä '
          + 'paitsi vyön kohdalta.',
      },
    ],
    kappaleet: [
      'Puna-valko-punainen tunnetaan Babenberg-herttuoiden '
        + 'vaakunasta 1200-luvulta, ja se on Euroopan vanhimpia '
        + 'lippuaiheita. Taru kytkee sen Leopold V:n veriseen '
        + 'viittaan Akkonin piirityksessä 1191.',
      'Tasavallan lipuksi se tuli 1918 keisarikunnan '
        + 'musta-keltaisen jälkeen ja palasi käyttöön 1945.',
    ],
    tunnukset: [
      {
        nimi: 'Liittokotka',
        polku: 'assets/liput/tunnukset/aut-vaakuna.png',
        selite: 'Musta kotka kantaa sirppiä ja vasaraa — talonpojat '
          + 'ja työläiset — sekä muurikruunua, porvaristoa. '
          + 'Katkennut kahle jaloissa lisättiin 1945 vapautumisen '
          + 'merkiksi.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Poland.svg': {
    maa: 'Puola',
    symboliikka: [
      { osa: 'Valkoinen', selite: 'vaakunan valkoinen kotka.' },
      { osa: 'Punainen', selite: 'kotkan kilven punainen kenttä.' },
    ],
    kappaleet: [
      'Valko-punainen on johdettu suoraan vaakunasta: valkoinen '
        + 'kotka punaisella kentällä. Viralliseksi lipuksi se '
        + 'vahvistettiin 1919, itsenäistymisen jälkeen.',
      'Tarun mukaan valtakunnan perustaja Lech näki valkoisen kotkan '
        + 'pesällään auringonlaskun punaa vasten ja otti näyn '
        + 'merkikseen.',
    ],
    tunnukset: [
      {
        nimi: 'Valkoinen kotka',
        polku: 'assets/liput/tunnukset/pol-vaakuna.png',
        selite: 'Kruunupäinen valkoinen kotka punaisella kentällä — '
          + 'tunnus tunnetaan kuninkaan sinetistä 1200-luvulta. '
          + 'Kommunistihallinto poisti kruunun 1944; se palasi '
          + 'kotkalle 1990.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of the Czech Republic.svg': {
    maa: 'Tšekki',
    symboliikka: [
      {
        osa: 'Valkoinen ja punainen',
        selite: 'Böömin värit — hopeinen leijona punaisella.',
      },
      {
        osa: 'Sininen kiila',
        selite: 'lisättiin 1920 erottamaan lippu Puolasta ja tuomaan '
          + 'mukaan Määrin ja Slovakian sini.',
      },
    ],
    kappaleet: [
      'Tšekkoslovakia sai lippunsa 1920, kun Böömin valko-punaiseen '
        + 'lisättiin sininen kiila.',
      'Liiton hajotessa 1993 Tšekki piti lipun itsellään, vaikka '
        + 'erosopimus kielsi yhteisten tunnusten käytön — Slovakia '
        + 'sai tyytyä vastalauseeseen.',
    ],
    tunnukset: [
      {
        nimi: 'Tšekin vaakuna',
        polku: 'assets/liput/tunnukset/cze-vaakuna.png',
        selite: 'Nelijakoisessa kilvessä kahdesti Böömin '
          + 'kaksihäntäinen hopealeijona sekä Määrin ja Sleesian '
          + 'ruudulliset kotkat.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Slovakia.svg': {
    maa: 'Slovakia',
    symboliikka: [
      {
        osa: 'Valko-sini-punainen',
        selite: 'panslaaviset värit vuoden 1848 heräämisestä.',
      },
      {
        osa: 'Kaksoisristi',
        selite: 'bysanttilainen perintö Kyrilloksen ja Methodioksen '
          + 'lähetystyöstä.',
      },
    ],
    kappaleet: [
      'Slovakian värit ovat panslaavilaiset, vuoden 1848 kansallisen '
        + 'heräämisen perintöä. Nykyinen lippu vaakunoineen '
        + 'vahvistettiin 1992.',
      'Vaakunan kolme kukkulaa ovat Tatra, Fatra ja Mátra — joista '
        + 'viimeinen jäi nykyisen Unkarin puolelle.',
    ],
    tunnukset: [
      {
        nimi: 'Slovakian vaakuna',
        polku: 'assets/liput/tunnukset/svk-vaakuna.png',
        selite: 'Hopeinen kaksoisristi kolmen sinisen kukkulan '
          + 'päällä punaisella kentällä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Hungary.svg': {
    maa: 'Unkari',
    symboliikka: [
      { osa: 'Punainen', selite: 'voima.' },
      { osa: 'Valkoinen', selite: 'uskollisuus.' },
      { osa: 'Vihreä', selite: 'toivo.' },
    ],
    kappaleet: [
      'Trikolori nousi vuosien 1848–49 vallankumouksessa Ranskan '
        + 'mallin mukaan; värit poimittiin keskiaikaisista '
        + 'vaakunatunnuksista.',
      'Vuoden 1956 kansannousun tunnukseksi tuli reikälippu: '
        + 'kommunistinen vaakuna leikattiin lipun keskeltä pois.',
    ],
    tunnukset: [
      {
        nimi: 'Unkarin vaakuna',
        polku: 'assets/liput/tunnukset/hun-vaakuna.png',
        selite: 'Árpádien puna-hopeaiset raidat ja apostolinen '
          + 'kaksoisristi kolmella kukkulalla; päällä Pyhän Tapanin '
          + 'kruunu, jonka risti on vinossa — se vääntyi '
          + 'vuosisatojen säilytyksessä ja vinous päätettiin '
          + 'säilyttää.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Romania.svg': {
    maa: 'Romania',
    symboliikka: [
      {
        osa: 'Sininen, keltainen ja punainen',
        selite: 'Valakian ja Moldovan ruhtinaskuntien värit.',
      },
    ],
    kappaleet: [
      'Trikolori nousi vuoden 1848 vallankumouksessa; yhdistyneen '
        + 'Romanian lipuksi se tuli ruhtinaskuntien liityttyä yhteen '
        + '1859, pystyraitaisena 1866.',
      'Vuoden 1989 vallankumouksessa kansa leikkasi Ceaușescun ajan '
        + 'vaakunan lipun keskeltä pois — reikälippu, kuten '
        + 'Unkarissa 1956.',
    ],
    tunnukset: [
      {
        nimi: 'Romanian vaakuna',
        polku: 'assets/liput/tunnukset/rou-vaakuna.png',
        selite: 'Kultainen kotka risti nokassaan kantaa kilvessä '
          + 'Valakian, Moldovan, Banaatin, Transilvanian ja '
          + 'Dobrogean tunnuksia.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Bulgaria.svg': {
    maa: 'Bulgaria',
    symboliikka: [
      { osa: 'Valkoinen', selite: 'rauha.' },
      { osa: 'Vihreä', selite: 'maan hedelmällisyys.' },
      { osa: 'Punainen', selite: 'rohkeus.' },
    ],
    kappaleet: [
      'Lippu vahvistettiin 1879 Tǎrnovon perustuslaissa, kun maa '
        + 'oli vapautunut osmanivallasta. Malli on panslaavilainen, '
        + 'mutta sininen vaihdettiin vihreään.',
    ],
    tunnukset: [
      {
        nimi: 'Bulgarian vaakuna',
        polku: 'assets/liput/tunnukset/bgr-vaakuna.png',
        selite: 'Kolme kruunattua kultaleijonaa: yksi kilvessä ja '
          + 'kaksi kilvenkannattajina. Nauhassa tunnuslause '
          + '"Yhtenäisyys tekee voiman".',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Greece.svg': {
    maa: 'Kreikka',
    symboliikka: [
      { osa: 'Sininen ja valkoinen', selite: 'meri ja aallot, taivas.' },
      { osa: 'Risti', selite: 'ortodoksinen kristinusko.' },
      {
        osa: 'Yhdeksän raitaa',
        selite: 'tarun mukaan vapaushuudon "Vapaus tai kuolema" '
          + 'yhdeksän tavua.',
      },
    ],
    kappaleet: [
      'Lippu syntyi vapaussodassa: kansalliskokous vahvisti 1822 '
        + 'ristilipun maalle ja raidallisen merelle. Raidallinen asu '
        + 'jäi ainoaksi lipuksi 1978.',
    ],
    tunnukset: [
      {
        nimi: 'Kreikan vaakuna',
        polku: 'assets/liput/tunnukset/grc-vaakuna.png',
        selite: 'Valkoinen risti sinisellä kilvellä '
          + 'laakeriseppeleen ympäröimänä — antiikin voitonseppele '
          + 'ristin ympärillä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Serbia.svg': {
    maa: 'Serbia',
    symboliikka: [
      {
        osa: 'Puna-sini-valkoinen',
        selite: 'panslaaviset värit — Venäjän lipun järjestys '
          + 'käännettynä.',
      },
    ],
    kappaleet: [
      'Kolmiväri juontaa 1830-luvun autonomiseen ruhtinaskuntaan; '
        + 'nykyinen vaakunallinen asu vahvistettiin 2000-luvulla.',
      'Vaakunan neljä tulusrautaa luetaan kyrillisinä S-kirjaimina: '
        + '"Samo sloga Srbina spasava" — vain yksimielisyys pelastaa '
        + 'serbin.',
    ],
    tunnukset: [
      {
        nimi: 'Serbian vaakuna',
        polku: 'assets/liput/tunnukset/srb-vaakuna.png',
        selite: 'Valkoinen kaksipäinen kotka Nemanjić-dynastian '
          + 'perintönä; kilvessä risti ja neljä tulusrautaa.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Croatia.svg': {
    maa: 'Kroatia',
    symboliikka: [
      {
        osa: 'Puna-valko-sininen',
        selite: 'panslaaviset värit vuodelta 1848.',
      },
      {
        osa: 'Šahovnica',
        selite: 'punavalkoinen shakkiruudukko, Kroatian tunnus '
          + '1500-luvulta.',
      },
    ],
    kappaleet: [
      'Trikolori nousi vuoden 1848 kansallisliikkeessä; itsenäisen '
        + 'Kroatian lippu vaakunoineen vahvistettiin 1990.',
      'Šahovnican yllä on kruunu viidestä pikkuvaakunasta: vanhin '
        + 'tunnettu Kroatian tunnus, Dubrovnik, Dalmatia, Istria ja '
        + 'Slavonia.',
    ],
    tunnukset: [
      {
        nimi: 'Kroatian vaakuna',
        polku: 'assets/liput/tunnukset/hrv-vaakuna.png',
        selite: 'Punavalkoinen shakkiruudukko eli šahovnica, jonka '
          + 'kruununa on viisi historiallisten alueiden pikkukilpeä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Slovenia.svg': {
    maa: 'Slovenia',
    symboliikka: [
      {
        osa: 'Valko-sini-punainen',
        selite: 'panslaaviset värit vuodelta 1848.',
      },
      {
        osa: 'Vaakuna',
        selite: 'Triglav-vuori, aallot ja kolme kultatähteä.',
      },
    ],
    kappaleet: [
      'Trikolori nousi slovenialaisessa kansallisliikkeessä 1848. '
        + 'Itsenäistyessään 1991 maa lisäsi lippuun uuden vaakunan.',
      'Vaakunassa on maan korkein vuori Triglav, aaltoviivat meren '
        + 'ja jokien merkkinä sekä Celjen kreivien kolme '
        + 'kultatähteä.',
    ],
    tunnukset: [
      {
        nimi: 'Slovenian vaakuna',
        polku: 'assets/liput/tunnukset/svn-vaakuna.png',
        selite: 'Triglavin kolmihuippuinen siluetti, kaksi '
          + 'aaltoviivaa ja Celjen kreivisuvun kolme tähteä '
          + 'kilvessä, jota reunustaa punainen viiva.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Bosnia and Herzegovina.svg': {
    maa: 'Bosnia ja Hertsegovina',
    symboliikka: [
      {
        osa: 'Sininen ja keltainen',
        selite: 'Euroopan värit — tarkoituksella neutraali valinta.',
      },
      {
        osa: 'Kolmio',
        selite: 'maan kolme kansaa ja maan kolmiomainen muoto.',
      },
      {
        osa: 'Tähtirivi',
        selite: 'jatkuu reunojen yli — rivi ei ala eikä lopu.',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin 1998, kun sodan jälkeen kansallisryhmät '
        + 'eivät päässeet sopuun tunnuksista. Muodot valittiin '
        + 'tarkoituksella neutraaleiksi ja eurooppalaisiksi — lippu '
        + 'ei kuulu kenellekään, jotta se voisi kuulua kaikille.',
    ],
    tunnukset: [
      {
        nimi: 'Bosnia ja Hertsegovinan vaakuna',
        polku: 'assets/liput/tunnukset/bih-vaakuna.png',
        selite: 'Lipun aiheet kilpimuodossa: keltainen kolmio ja '
          + 'reunan yli jatkuva tähtirivi sinisellä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Ukraine.svg': {
    maa: 'Ukraina',
    symboliikka: [
      { osa: 'Sininen', selite: 'taivas.' },
      { osa: 'Keltainen', selite: 'viljapelto.' },
    ],
    kappaleet: [
      'Värit nousivat 1848 Lvivin kansalliskokouksessa Galitsian '
        + 'vaakunasta, ja sinikeltainen oli kansantasavallan lippu '
        + '1917–1918.',
      'Neuvostoaikana lippu oli kielletty. Se palasi '
        + 'itsenäistymisen myötä ja vahvistettiin valtiolipuksi '
        + '1992.',
    ],
    tunnukset: [
      {
        nimi: 'Tryzub',
        polku: 'assets/liput/tunnukset/ukr-vaakuna.png',
        selite: 'Kultainen kolmikärki sinisellä kilvellä. Tunnus '
          + 'periytyy Volodymyr Suuren 900-luvun rahoista ja '
          + 'sineteistä — tuhatvuotinen merkki.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Russia.svg': {
    maa: 'Venäjä',
    symboliikka: [
      {
        osa: 'Valko-sini-punainen',
        selite: 'Pietari Suuren trikolori Alankomaiden lipun '
          + 'mallista.',
      },
    ],
    kappaleet: [
      'Trikolori tuli käyttöön laivastolippuna 1690-luvulla, kun '
        + 'Pietari Suuri otti mallia Alankomaista. Valtiolipuksi se '
        + 'vakiintui 1800-luvulla.',
      'Neuvostoliiton punalipun jälkeen trikolori palasi 1991. Sen '
        + 'värit olivat jo 1800-luvulla levinneet panslaavilippuihin '
        + 'ympäri itäistä Eurooppaa.',
    ],
    tunnukset: [
      {
        nimi: 'Kaksipäinen kotka',
        polku: 'assets/liput/tunnukset/rus-vaakuna.png',
        selite: 'Bysantilta 1400-luvulla omaksuttu kultainen '
          + 'kaksipäinen kotka; rinnassa Moskovan tunnus, Pyhä Yrjö '
          + 'lohikäärmeen surmaajana.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Turkey.svg': {
    maa: 'Turkki',
    symboliikka: [
      { osa: 'Punainen', selite: 'osmanien perintöväri.' },
      {
        osa: 'Puolikuu ja tähti',
        selite: 'islamin ja turkkilaisuuden tunnus osmanilipuista.',
      },
    ],
    kappaleet: [
      'Lippu jatkaa suoraan Osmanivaltakunnan vuoden 1844 lippua; '
        + 'tasavalta vahvisti asun lailla 1936.',
      'Puolikuun ja tähden alkuperästä kerrotaan monta tarua — '
        + 'tunnetuimmassa kuu tähtineen kuvastui taistelukentän '
        + 'verilammikosta. Varmaa alkuperää ei tiedetä.',
    ],
    tunnukset: [
      {
        nimi: 'Puolikuu ja tähti',
        polku: 'assets/liput/tunnukset/tur-vaakuna.png',
        selite: 'Turkilla ei ole virallista vaakunaa — punainen '
          + 'puolikuu-tähtitunnus toimii sen paikalla muun muassa '
          + 'passeissa.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Azerbaijan.svg': {
    maa: 'Azerbaidžan',
    symboliikka: [
      { osa: 'Sininen', selite: 'turkkilaiset juuret.' },
      { osa: 'Punainen', selite: 'edistys ja nykyaika.' },
      { osa: 'Vihreä', selite: 'islam.' },
      {
        osa: 'Puolikuu ja tähti',
        selite: 'kahdeksansakarainen tähti puolikuun rinnalla.',
      },
    ],
    kappaleet: [
      'Lippu luotiin ensimmäisen tasavallan aikana 1918. '
        + 'Neuvostokauden jälkeen se palasi käyttöön sellaisenaan '
        + '1991 — sama kolmiväri, sama tähti.',
    ],
    tunnukset: [
      {
        nimi: 'Azerbaidžanin tunnus',
        polku: 'assets/liput/tunnukset/aze-vaakuna.png',
        selite: 'Kahdeksansakarainen tähti, jonka sydämessä palaa '
          + 'liekki — "tulen maan" ikivanha tunnus. Alla '
          + 'tammenlehvät ja tähkät.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Japan.svg': {
    maa: 'Japani',
    symboliikka: [
      {
        osa: 'Punainen ympyrä',
        selite: 'nouseva aurinko — lipun nimi on hinomaru, '
          + '"auringon kiekko".',
      },
      { osa: 'Valkoinen', selite: 'puhtaus ja vilpittömyys.' },
    ],
    kappaleet: [
      'Auringonkiekkoa on käytetty Japanissa vuosisatoja. '
        + 'Kauppalaivojen lipuksi se määrättiin 1870 — mutta '
        + 'virallinen valtiolippu siitä tuli lailla vasta 1999.',
    ],
    tunnukset: [
      {
        nimi: 'Keisarillinen krysanteemi',
        polku: 'assets/liput/tunnukset/jpn-vaakuna.png',
        selite: 'Kuusitoistateräinen kultakrysanteemi, '
          + 'keisarihuoneen tunnus. Japanilla ei ole virallista '
          + 'vaakunaa — krysanteemi toimii sen paikalla muun muassa '
          + 'passin kannessa.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of South Korea.svg': {
    maa: 'Etelä-Korea',
    symboliikka: [
      {
        osa: 'Taegeuk',
        selite: 'punasininen pyörre — vastavoimien tasapaino.',
      },
      {
        osa: 'Neljä trigrammia',
        selite: 'taivas, maa, vesi ja tuli kulmissa.',
      },
      {
        osa: 'Valkoinen',
        selite: 'rauha — korealaisten vanha perinneväri.',
      },
    ],
    kappaleet: [
      'Taegukgi otettiin käyttöön Joseon-kuningaskunnassa 1883. '
        + 'Tasavalta vahvisti nykyasun 1949, ja lippu kantaa yhä '
        + 'vanhan filosofian merkkejä: tasapainoa ja neljää '
        + 'peruselementtiä.',
    ],
    tunnukset: [
      {
        nimi: 'Etelä-Korean tunnus',
        polku: 'assets/liput/tunnukset/kor-vaakuna.png',
        selite: 'Taegeuk-pyörre kansalliskukan, mugunghwan, '
          + 'terälehtien sisällä; nauhassa maan nimi '
          + 'korealaisittain: Daehanminguk.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  "Flag of the People's Republic of China.svg": {
    maa: 'Kiina',
    symboliikka: [
      { osa: 'Punainen', selite: 'vallankumous.' },
      { osa: 'Iso tähti', selite: 'kommunistinen puolue.' },
      {
        osa: 'Neljä pikkutähteä',
        selite: 'kansa puolueen ympärillä: työläiset, talonpojat ja '
          + 'porvariston kaksi ryhmää.',
      },
    ],
    kappaleet: [
      'Lippu valittiin avoimella kilpailulla 1949 kansantasavallan '
        + 'perustamisen alla. Voittajaehdotuksen piirsi '
        + 'shanghailainen toimistotyöntekijä Zeng Liansong.',
    ],
    tunnukset: [
      {
        nimi: 'Kiinan tunnus',
        polku: 'assets/liput/tunnukset/chn-vaakuna.png',
        selite: 'Tiananmenin portti viiden tähden alla; ympärillä '
          + 'viljantähkät ja alla hammasratas — talonpojat ja '
          + 'työläiset.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of India.svg': {
    maa: 'Intia',
    symboliikka: [
      { osa: 'Sahrami', selite: 'rohkeus ja uhrautuvaisuus.' },
      { osa: 'Valkoinen', selite: 'totuus ja rauha.' },
      { osa: 'Vihreä', selite: 'usko ja maan hedelmällisyys.' },
      {
        osa: 'Chakra',
        selite: 'Ashokan 24-puolainen dharman pyörä keskellä.',
      },
    ],
    kappaleet: [
      'Trikolori vahvistettiin 1947 itsenäistymisen alla. Keskelle '
        + 'tuli Gandhin rukin sijaan Ashokan pyörä — keisari Ashokan '
        + 'pylväistä 200-luvulta ennen ajanlaskua.',
    ],
    tunnukset: [
      {
        nimi: 'Ashokan leijonat',
        polku: 'assets/liput/tunnukset/ind-vaakuna.png',
        selite: 'Sarnathin pylvään neljä leijonaa selät vastakkain; '
          + 'alla tunnuslause Satyameva Jayate — "totuus yksin '
          + 'voittaa".',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Mongolia.svg': {
    maa: 'Mongolia',
    symboliikka: [
      { osa: 'Sininen', selite: 'ikuinen taivas.' },
      { osa: 'Punainen', selite: 'kestävyys ja tuli.' },
      {
        osa: 'Sojombo',
        selite: 'vanha merkkiyhdistelmä: tuli, aurinko, kuu, maa, '
          + 'vesi ja vastavoimien pari.',
      },
    ],
    kappaleet: [
      'Sojombo-merkki on 1600-luvun oppineen Zanabazarin '
        + 'kirjoitusjärjestelmästä. Demokratisoitumisen jälkeen 1992 '
        + 'lipusta poistettiin kommunistiajan tähti sojombon '
        + 'päältä.',
    ],
    tunnukset: [
      {
        nimi: 'Mongolian tunnus',
        polku: 'assets/liput/tunnukset/mng-vaakuna.png',
        selite: 'Tuulihevonen kantaa sojomboa sinisellä kentällä; '
          + 'alla vihreä aro ja buddhalainen lootus, ympärillä '
          + 'ikuisuuskuvio.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Nepal.svg': {
    maa: 'Nepal',
    symboliikka: [
      {
        osa: 'Kaksi viiriä',
        selite: 'maailman ainoa ei-suorakulmainen valtiolippu — '
          + 'Himalajan kaksi huippua.',
      },
      {
        osa: 'Kuu ja aurinko',
        selite: 'toive, että maa kestää niin kauan kuin '
          + 'taivaankappaleet.',
      },
      {
        osa: 'Karmiininpunainen',
        selite: 'rododendronin, kansalliskukan, väri.',
      },
    ],
    kappaleet: [
      'Kaksoisviirin muoto periytyy hindulaisten kuningaskuntien '
        + 'viireistä; nykyasu mittasuhteineen kirjattiin '
        + 'perustuslakiin 1962 — liite kuvaa lipun piirtämisen '
        + 'geometrisena ohjeena, ainoana maailmassa.',
    ],
    tunnukset: [
      {
        nimi: 'Nepalin tunnus',
        polku: 'assets/liput/tunnukset/npl-vaakuna.png',
        selite: 'Everest, vihreät kukkulat ja viljelty tasanko — '
          + 'maan kolme vyöhykettä — sekä kättely tasa-arvon '
          + 'merkkinä, rododendronseppeleen ympäröimänä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Tunnus: Biplab Anand / '
      + 'Wikimedia Commons (CC BY-SA 4.0)',
  },
  'Flag of Bangladesh.svg': {
    maa: 'Bangladesh',
    symboliikka: [
      { osa: 'Vihreä', selite: 'maan vehreys ja elinvoima.' },
      {
        osa: 'Punainen kiekko',
        selite: 'nouseva aurinko ja itsenäisyystaistelun veri; '
          + 'kiekko on hivenen tankoon päin, jotta se näyttää '
          + 'keskitetyltä liehuessa.',
      },
    ],
    kappaleet: [
      'Lippu nousi itsenäisyystaistelussa 1971. Alkuversiossa '
        + 'kiekon sisällä oli maan kartta, joka poistettiin 1972 — '
        + 'kartta oli liehuvassa kankaassa mahdoton pitää oikein '
        + 'päin.',
    ],
    tunnukset: [
      {
        nimi: 'Shapla-lumme',
        polku: 'assets/liput/tunnukset/bgd-vaakuna.png',
        selite: 'Kansalliskukka vesilumme riisintähkien '
          + 'ympäröimänä; yllä juutinlehdet ja neljä tähteä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Pakistan.svg': {
    maa: 'Pakistan',
    symboliikka: [
      { osa: 'Vihreä', selite: 'islam ja maan muslimit.' },
      { osa: 'Valkoinen raita', selite: 'uskonnolliset vähemmistöt.' },
      {
        osa: 'Puolikuu ja tähti',
        selite: 'edistys ja valo.',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin itsenäistymispäivien alla 1947. Pohjana '
        + 'oli Muslimiliiton lippu, johon lisättiin valkoinen raita '
        + 'vähemmistöjen merkiksi.',
    ],
    tunnukset: [
      {
        nimi: 'Pakistanin tunnus',
        polku: 'assets/liput/tunnukset/pak-vaakuna.png',
        selite: 'Kilvessä maan neljä satoa: puuvilla, vehnä, tee ja '
          + 'juutti; ympärillä jasmiiniseppele ja nauhassa '
          + 'tunnuslause "Usko, yhtenäisyys, kuri".',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  // Erä 6: Lähi-itä (lisenssit tarkistettu Commonsin API:sta
  // 15.8.2026; Omanin tunnus jäi pois, koska sen lisenssi on
  // OGL-om eikä PD/CC — pelin kuvasääntö ei jousta).
  'Flag of Iran.svg': {
    maa: 'Iran',
    symboliikka: [
      { osa: 'Vihreä', selite: 'islam.' },
      { osa: 'Valkoinen', selite: 'rauha.' },
      { osa: 'Punainen', selite: 'rohkeus ja uhrautuminen.' },
      {
        osa: 'Keskustunnus',
        selite: 'tyylitelty Allah-sana, joka on samalla tulppaanin '
          + 'muotoinen — tulppaani on kaatuneiden muistokukka.',
      },
      {
        osa: 'Reunuskirjoitus',
        selite: '"Allahu akbar" toistuu kufi-kirjoituksella 22 kertaa '
          + 'nauhoina vihreän ja punaisen raidan reunassa.',
      },
    ],
    kappaleet: [
      'Kolmiväri on peräisin 1900-luvun alun perustuslakikaudelta, '
        + 'mutta nykyasunsa lippu sai islamilaisen vallankumouksen '
        + 'jälkeen 1980. Keskelle tuli Hamid Nadimin piirtämä tunnus, '
        + 'ja vuosisatoja lipussa ollut leijona aurinkoineen jäi pois.',
      'Reunusten 22 toistoa viittaavat vallankumouksen päivämäärään: '
        + 'šaahin valta kaatui Iranin kalenterin 11. kuun 22. päivänä. '
        + 'Kirjoitus on aseteltu niin, että se kehystää valkoisen '
        + 'keskiraidan molemmilta puolilta.',
    ],
    tunnukset: [
      {
        nimi: 'Iranin tunnus',
        polku: 'assets/liput/tunnukset/irn-vaakuna.png',
        selite: 'Neljä kaarta, miekka ja niiden yllä tašdid-merkki: '
          + 'yhdessä ne muodostavat sanan Allah ja samalla tulppaanin. '
          + 'Sama tunnus on lipun keskellä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Iraq.svg': {
    maa: 'Irak',
    symboliikka: [
      { osa: 'Punainen', selite: 'taistelut ja rohkeus.' },
      { osa: 'Valkoinen', selite: 'anteliaisuus ja tulevaisuus.' },
      { osa: 'Musta', selite: 'islamin varhaiset liput ja menneet sorron ajat.' },
      {
        osa: 'Vihreä kirjoitus',
        selite: '"Allahu akbar" kufi-kirjoituksella valkoisella '
          + 'raidalla.',
      },
    ],
    kappaleet: [
      'Puna-valko-musta on arabimaiden vapautusliikkeiden väriyhdistelmä, '
        + 'joka tuli Irakin lippuun 1963. Keskiraidan kirjoitus '
        + 'lisättiin 1991, ja se oli alkuun Saddam Husseinin omaa '
        + 'käsialaa.',
      'Vuonna 2004 käsiala vaihdettiin perinteiseen kufi-tyyliin, ja '
        + '2008 raidalta poistettiin kolme vihreää tähteä, jotka '
        + 'olivat viitanneet baath-puolueen tunnuslauseeseen. Jäljelle '
        + 'jäi pelkkä kirjoitus.',
    ],
    tunnukset: [
      {
        nimi: 'Irakin vaakuna',
        polku: 'assets/liput/tunnukset/irq-vaakuna.png',
        selite: 'Saladinin kotka kantaa rinnassaan lipun värejä ja '
          + 'seisoo nauhalla, jossa lukee "Irakin tasavalta". Kotka '
          + 'viittaa Saladiniin, joka syntyi Tikritissä.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Saudi Arabia.svg': {
    maa: 'Saudi-Arabia',
    symboliikka: [
      { osa: 'Vihreä', selite: 'islam — profeetan viitan väri.' },
      {
        osa: 'Kirjoitus',
        selite: 'šahada eli uskontunnustus: "Ei ole muuta jumalaa kuin '
          + 'Jumala, ja Muhammad on hänen lähettiläänsä."',
      },
      { osa: 'Miekka', selite: 'oikeudenmukaisuus ja kuningaskunnan perustajan valloitukset.' },
    ],
    kappaleet: [
      'Lippu sai nykyisen muotonsa 1973, mutta vihreä '
        + 'uskontunnustuslippu on kulkenut saudidynastian mukana '
        + '1900-luvun alusta. Miekka muistuttaa Abdulazizista, joka '
        + 'yhdisti kuningaskunnan 1932.',
      'Koska lipussa on uskontunnustus, sitä ei koskaan lasketa '
        + 'puolitankoon — ei edes suruliputuksessa. Samasta syystä '
        + 'lippu ommellaan kaksipuolisena: tekstin on oltava '
        + 'luettavissa oikein molemmilta puolilta.',
    ],
    tunnukset: [
      {
        nimi: 'Saudi-Arabian tunnus',
        polku: 'assets/liput/tunnukset/sau-vaakuna.png',
        selite: 'Taatelipalmu ja kaksi ristikkäistä miekkaa: palmu on '
          + 'elinvoima ja kasvu, miekat oikeus ja voima.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Egypt.svg': {
    maa: 'Egypti',
    symboliikka: [
      { osa: 'Punainen', selite: 'vallankumousta edeltänyt kamppailu.' },
      { osa: 'Valkoinen', selite: 'vuoden 1952 veretön vallankumous.' },
      { osa: 'Musta', selite: 'sorron ajan päättyminen.' },
      {
        osa: 'Kultainen kotka',
        selite: 'Saladinin kotka, keskiraidan vaakuna.',
      },
    ],
    kappaleet: [
      'Värit tulevat vuoden 1952 vallankumouksesta, jossa vapaat '
        + 'upseerit syrjäyttivät kuninkaan ilman verenvuodatusta. '
        + 'Sama kolmikko levisi sieltä moniin arabimaihin.',
      'Keskellä on ollut eri aikoina eri tunnus: yhdistyneen '
        + 'arabitasavallan kaksi tähteä ja Qureishin haukka. '
        + 'Saladinin kotka on ollut paikallaan vuodesta 1984.',
    ],
    tunnukset: [
      {
        nimi: 'Egyptin vaakuna',
        polku: 'assets/liput/tunnukset/egy-vaakuna.png',
        selite: 'Saladinin kultainen kotka katsoo vasemmalle ja kantaa '
          + 'rinnassaan lipun värejä; nauhassa lukee "Egyptin '
          + 'arabitasavalta".',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of the United Arab Emirates.svg': {
    maa: 'Yhdistyneet arabiemiirikunnat',
    symboliikka: [
      { osa: 'Punainen', selite: 'rohkeus ja voima — emiraattien perinneväri.' },
      { osa: 'Vihreä', selite: 'kasvu ja vauraus.' },
      { osa: 'Valkoinen', selite: 'rauha.' },
      { osa: 'Musta', selite: 'vastustajien torjunta ja mielen lujuus.' },
    ],
    kappaleet: [
      'Lippu nousi salkoon 2. joulukuuta 1971, päivänä jona seitsemän '
        + 'emiraattia liittyi yhteen. Se valittiin '
        + 'suunnittelukilpailulla, ja voittaja oli 19-vuotias Abdullah '
        + 'Mohammed Al Maainah — myöhempi suurlähettiläs.',
      'Neljä väriä ovat yhteisarabialaiset värit, jotka juontuvat '
        + '1200-luvun runoilijan Safi al-Din al-Hillin säkeisiin '
        + 'teoista, taisteluista, niityistä ja miekoista.',
    ],
    tunnukset: [
      {
        nimi: 'Emiraattien tunnus',
        polku: 'assets/liput/tunnukset/are-vaakuna.png',
        selite: 'Kultainen haukka kantaa rinnassaan lipun värejä '
          + 'ympyrässä, jota kehystää seitsemän tähteä — yksi '
          + 'jokaiselle emiraatille.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Kuwait.svg': {
    maa: 'Kuwait',
    symboliikka: [
      { osa: 'Vihreä', selite: 'niityt ja maa.' },
      { osa: 'Valkoinen', selite: 'teot ja puhtaus.' },
      { osa: 'Punainen', selite: 'miekat ja taistelut.' },
      {
        osa: 'Musta puolisuunnikas',
        selite: 'vastustajien lyöminen — muoto erottaa lipun muista '
          + 'arabivärilipuista.',
      },
    ],
    kappaleet: [
      'Lippu otettiin käyttöön 1961, kun Kuwait itsenäistyi '
        + 'Britannian suojeluksesta. Sitä ennen maalla oli punainen '
        + 'lippu, jossa luki valkoisella maan nimi.',
      'Värien luenta seuraa al-Hillin runoa: valkoisia ovat tekomme, '
        + 'mustia taistelumme, vihreitä niittymme ja punaisia '
        + 'miekkamme. Sama säe selittää monen arabimaan väriparit.',
    ],
    tunnukset: [
      {
        nimi: 'Kuwaitin tunnus',
        polku: 'assets/liput/tunnukset/kwt-vaakuna.png',
        selite: 'Haukan siivet kehystävät kilpeä, jossa dhow-purjelaiva '
          + 'halkoo sinivalkoisia aaltoja — muistuma helmenkalastuksen '
          + 'ja kaupankäynnin vuosisadoista.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: RoyFocke, '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Qatar.svg': {
    maa: 'Qatar',
    symboliikka: [
      { osa: 'Viininpunainen', selite: 'maan perinteinen purppuraväri.' },
      { osa: 'Valkoinen', selite: 'rauha.' },
      {
        osa: 'Yhdeksän sakaraa',
        selite: 'sahalaitainen raja kertoo Qatarin olleen sopimusten '
          + 'yhdeksäs emiraatti.',
      },
    ],
    kappaleet: [
      'Qatarin väri syntyi merestä: rannikolla värjättiin kangasta '
        + 'purppurakotilolla, ja auringossa väri tummui '
        + 'viininpunaiseksi. Sävy erottaa lipun naapurin Bahrainin '
        + 'kirkkaanpunaisesta.',
      'Lippu on maailman lipuista ainoa, jonka leveys on yli kaksi '
        + 'kertaa korkeus — mittasuhde on 11:28. Nykyasu vahvistettiin '
        + 'itsenäistymisvuonna 1971.',
    ],
    tunnukset: [
      {
        nimi: 'Qatarin tunnus',
        polku: 'assets/liput/tunnukset/qat-vaakuna.png',
        selite: 'Vuoden 2022 tunnus: dhow-purjelaiva, kaksi palmua ja '
          + 'ristikkäiset miekat lipun viininpunaisella piirrettyinä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Tunnus: 9BBWMJ, '
      + 'Wikimedia Commons (CC BY-SA 4.0)',
  },
  'Flag of Oman.svg': {
    maa: 'Oman',
    symboliikka: [
      { osa: 'Valkoinen', selite: 'rauha ja hyvinvointi.' },
      { osa: 'Vihreä', selite: 'Vihreä vuori (Jabal Akhdar) ja hedelmällisyys.' },
      { osa: 'Punainen', selite: 'taistelut vieraita valloittajia vastaan.' },
      {
        osa: 'Tunnus tangon puolella',
        selite: 'khanjar-tikari ja kaksi ristikkäistä miekkaa — '
          + 'sulttaanisuvun tunnus 1700-luvulta.',
      },
    ],
    kappaleet: [
      'Vuosisatojen ajan Omanin lippu oli pelkkä punainen. Nykyinen '
        + 'kolmiväri otettiin käyttöön 1970, kun sulttaani Qaboos '
        + 'nousi valtaan ja alkoi uudistaa maata.',
      'Tangon puoleisessa pystyraidassa on maan tunnus: käyrä '
        + 'khanjar-tikari tuppineen kahden ristikkäisen miekan päällä. '
        + 'Sama tikari kulkee miesten juhlapuvun vyössä.',
    ],
    lahde: 'Liput: Wikimedia Commons (PD)',
  },
  // Erä 7: Kaakkois-Aasia ja Etelä-Aasia (lisenssit tarkistettu
  // Commonsin API:sta 15.8.2026, tunnukset katsottu silmin;
  // Laosin tunnus on vuoden 2025 uusi versio).
  'Flag of Thailand.svg': {
    maa: 'Thaimaa',
    symboliikka: [
      { osa: 'Punainen', selite: 'kansa ja sen vuodattama veri.' },
      { osa: 'Valkoinen', selite: 'uskonto — buddhalaisuuden puhtaus.' },
      {
        osa: 'Sininen keskiraita',
        selite: 'kuningashuone; raita on kaksi kertaa muita leveämpi.',
      },
    ],
    kappaleet: [
      'Vanhassa lipussa oli valkoinen elefantti punaisella pohjalla. '
        + 'Tarinan mukaan kuningas Rama VI näki tulvakylässä lipun '
        + 'nurinpäin nostettuna ja päätti vaihtaa tilalle raidat, '
        + 'jotka näyttävät samalta kummin päin tahansa.',
      'Sininen keskiraita lisättiin 1917, kun Siam liittyi '
        + 'ensimmäisessä maailmansodassa ympärysvaltojen puolelle — '
        + 'samalla lippu sai saman väriyhdistelmän kuin liittolaisten '
        + 'Britannian, Ranskan ja Yhdysvaltain liput.',
    ],
    tunnukset: [
      {
        nimi: 'Thaimaan tunnus',
        polku: 'assets/liput/tunnukset/tha-vaakuna.png',
        selite: 'Garuda — hindulaisen ja buddhalaisen taruston '
          + 'punainen lintumies levitetyin siivin. Sama hahmo on '
          + 'leimannut kuninkaan asiakirjat 1800-luvulta asti.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Vietnam.svg': {
    maa: 'Vietnam',
    symboliikka: [
      { osa: 'Punainen', selite: 'vallankumous ja itsenäisyystaistelu.' },
      {
        osa: 'Viisisakarainen tähti',
        selite: 'kansan viisi ryhmää: oppineet, talonpojat, työläiset, '
          + 'kauppiaat ja sotilaat.',
      },
    ],
    kappaleet: [
      'Punalippu keltaisine tähtineen nousi ensi kerran vuoden 1940 '
        + 'kansannousussa Ranskan siirtomaavaltaa vastaan, ja 1945 '
        + 'siitä tuli itsenäiseksi julistautuneen Pohjois-Vietnamin '
        + 'lippu.',
      'Tähden sakarat piirrettiin nykyiseen suoraviivaisempaan '
        + 'muotoonsa 1955. Kun maa yhdistyi sodan jälkeen 1976, '
        + 'sama lippu otettiin koko Vietnamin lipuksi.',
    ],
    tunnukset: [
      {
        nimi: 'Vietnamin tunnus',
        polku: 'assets/liput/tunnukset/vnm-vaakuna.png',
        selite: 'Pyöreässä tunnuksessa tähti nousee hammasrattaan '
          + 'ylle riisintähkien kehystämänä — teollisuus ja maatalous '
          + 'samassa kuvassa. Piirsi Bùi Trang Chước 1955.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Indonesia.svg': {
    maa: 'Indonesia',
    symboliikka: [
      { osa: 'Punainen', selite: 'rohkeus — ja ihmisen ruumis.' },
      { osa: 'Valkoinen', selite: 'puhtaus — ja ihmisen sielu.' },
    ],
    kappaleet: [
      'Puna-valkoinen väripari periytyy 1200-luvun Majapahitin '
        + 'valtakunnasta, jonka viireissä värit jo liehuivat. Lippu '
        + 'nostettiin salkoon itsenäisyysjulistuksen aamuna 17. '
        + 'elokuuta 1945, ja alkuperäistä käsin ommeltua lippua '
        + 'säilytetään yhä kansallisaarteena.',
      'Lippu on lähes sama kuin Monacon — vain mittasuhde eroaa — '
        + 'ja Puolan lippu ylösalaisin. Nimeltään se on Sang Saka '
        + 'Merah-Putih, "ylevä puna-valkoinen".',
    ],
    tunnukset: [
      {
        nimi: 'Garuda Pancasila',
        polku: 'assets/liput/tunnukset/idn-vaakuna.png',
        selite: 'Kultainen garuda-lintu kantaa rinnassaan kilpeä, '
          + 'jonka viisi kuviota ovat valtion viisi periaatetta. '
          + 'Sulkien lukumäärät kätkevät päivämäärän 17.8.1945, ja '
          + 'nauhassa lukee Bhinneka Tunggal Ika — moninaisuudessa '
          + 'yhtenäinen.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Malaysia.svg': {
    maa: 'Malesia',
    symboliikka: [
      {
        osa: '14 raitaa',
        selite: 'kolmetoista osavaltiota ja liittovaltio yhdessä.',
      },
      { osa: 'Puolikuu', selite: 'islam, maan valtionuskonto.' },
      {
        osa: '14-sakarainen tähti',
        selite: 'osavaltioiden yhteys — Bintang Persekutuan, liiton tähti.',
      },
      { osa: 'Keltainen', selite: 'hallitsijoiden kuninkaallinen väri.' },
    ],
    kappaleet: [
      'Lippu syntyi 1949 suunnittelukilpailussa, jonka voitti '
        + 'arkkitehti Mohamed Hamzah. Raidat kasvoivat yhdestätoista '
        + 'neljääntoista 1963, kun Malesian liittovaltio '
        + 'perustettiin.',
      'Lippu tunnetaan nimellä Jalur Gemilang, "loiston raidat". '
        + 'Raitakuvio tuo monelle mieleen Yhdysvaltain lipun, mutta '
        + 'sinisessä kentässä on puolikuu ja monisakarainen tähti — '
        + 'islamin ja liittovaltion merkit.',
    ],
    tunnukset: [
      {
        nimi: 'Malesian vaakuna',
        polku: 'assets/liput/tunnukset/mys-vaakuna.png',
        selite: 'Kaksi tiikeriä kannattelee kilpeä, johon on koottu '
          + 'osavaltioiden tunnukset. Nauhan tunnuslause Bersekutu '
          + 'Bertambah Mutu: yhteys on voimaa.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Singapore.svg': {
    maa: 'Singapore',
    symboliikka: [
      { osa: 'Punainen', selite: 'kansojen veljeys ja tasa-arvo.' },
      { osa: 'Valkoinen', selite: 'puhtaus ja hyve.' },
      { osa: 'Puolikuu', selite: 'nuori valtio nousussa.' },
      {
        osa: 'Viisi tähteä',
        selite: 'demokratia, rauha, edistys, oikeus ja tasa-arvo.',
      },
    ],
    kappaleet: [
      'Lippu otettiin käyttöön 1959, kun Singapore sai '
        + 'itsehallinnon, ja se säilyi kun kaupunki itsenäistyi '
        + 'yllättäen 1965 jouduttuaan eroamaan Malesiasta.',
      'Suunnittelussa sovitettiin yhteen monen kansan toiveet: '
        + 'puolikuu ja tähdet olivat tuttuja malaijiväestölle, ja '
        + 'tähtiä pantiin viisi kehäksi, jotta kuvio erottuisi '
        + 'yksitähtisistä lipuista ja saisi oman selityksensä.',
    ],
    tunnukset: [
      {
        nimi: 'Singaporen vaakuna',
        polku: 'assets/liput/tunnukset/sgp-vaakuna.png',
        selite: 'Leijona ja tiikeri kannattelevat lipun kuvioista '
          + 'tehtyä kilpeä: leijona on Singapore eli "leijonakaupunki", '
          + 'tiikeri muistuttaa siteestä Malaijan niemimaahan. Nauhassa '
          + 'lukee Majulah Singapura — eteenpäin, Singapore.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Fry1989, '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of the Philippines.svg': {
    maa: 'Filippiinit',
    symboliikka: [
      { osa: 'Sininen', selite: 'rauha ja oikeudenmukaisuus.' },
      { osa: 'Punainen', selite: 'rohkeus ja isänmaallisuus.' },
      { osa: 'Valkoinen kolmio', selite: 'tasa-arvo ja vapaudenkaipuu.' },
      {
        osa: 'Aurinko ja kolme tähteä',
        selite: 'kahdeksan sädettä ovat kahdeksan ensimmäisenä '
          + 'kapinaan noussutta maakuntaa; tähdet ovat saariryhmät '
          + 'Luzon, Visayas ja Mindanao.',
      },
    ],
    kappaleet: [
      'Lippu ommeltiin Hongkongissa 1898 maanpaossa olleiden '
        + 'itsenäisyystaistelijoiden tilauksesta, ja se liehui '
        + 'ensimmäisen kerran itsenäisyysjulistuksessa saman vuoden '
        + 'kesäkuussa, kun Espanjan valta murtui.',
      'Lipussa on omalaatuinen sääntö: sodan aikana se käännetään '
        + 'niin, että punainen raita on ylinnä. Rauhan aikana ylinnä '
        + 'on sininen.',
    ],
    tunnukset: [
      {
        nimi: 'Filippiinien vaakuna',
        polku: 'assets/liput/tunnukset/phl-vaakuna.png',
        selite: 'Kilvessä ovat lipun aurinko ja tähdet — ja alhaalla '
          + 'kaksi vanhaa isäntää: Yhdysvaltain kotka ja Espanjan '
          + 'leijona, muistona kolmen sadan vuoden siirtomaa-ajasta.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Myanmar.svg': {
    maa: 'Myanmar',
    symboliikka: [
      { osa: 'Keltainen', selite: 'kansan yhtenäisyys.' },
      { osa: 'Vihreä', selite: 'rauha ja vehreä maa.' },
      { osa: 'Punainen', selite: 'rohkeus ja päättäväisyys.' },
      { osa: 'Valkoinen tähti', selite: 'liittovaltion pysyvyys.' },
    ],
    kappaleet: [
      'Nykyinen lippu otettiin käyttöön 2010 uuden perustuslain '
        + 'myötä, ja se korvasi sosialistikauden punaisen lipun '
        + 'kerralla kokonaan: väreillä ja suurella tähdellä ei ole '
        + 'edeltäjänsä kanssa mitään yhteistä.',
      'Keltainen, vihreä ja punainen ovat samat värit kuin maan '
        + 'ensimmäisessä itsenäisyysajan lipussa ennen vuotta 1962 — '
        + 'ja samat, joita itsenäisyysliike käytti jo Britannian '
        + 'siirtomaa-aikana.',
    ],
    tunnukset: [
      {
        nimi: 'Myanmarin sinetti',
        polku: 'assets/liput/tunnukset/mmr-vaakuna.png',
        selite: 'Sinetin keskellä on maan kartta riisintähkien '
          + 'kehyksessä, ja sitä vartioi kaksi chinthea — '
          + 'temppeleiden porteilta tuttua leijonahahmoa.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Cambodia.svg': {
    maa: 'Kambodža',
    symboliikka: [
      { osa: 'Sininen', selite: 'kuningashuone.' },
      { osa: 'Punainen', selite: 'kansa.' },
      {
        osa: 'Angkor Wat',
        selite: 'valkoinen temppeli keskellä — uskonto ja maan suuruuden '
          + 'aika.',
      },
    ],
    kappaleet: [
      'Kambodža on ainoa maa, jonka lipussa on rakennus: Angkor '
        + 'Watin temppeli kolmitornisena. 1100-luvulla rakennettu '
        + 'temppeli on ollut lähes jokaisessa maan lipussa '
        + 'hallitusmuodosta riippumatta.',
      'Nykyinen lippu on sama, joka liehui kuningaskunnassa '
        + '1948–1970. Se palautettiin 1993, kun monarkia palasi '
        + 'sisällissodan ja punakhmerien kauden jälkeen.',
    ],
    tunnukset: [
      {
        nimi: 'Kambodžan kuninkaalliset aseet',
        polku: 'assets/liput/tunnukset/khm-vaakuna.png',
        selite: 'Kaksi norsunpäistä leijonaa kannattelee '
          + 'kuninkaallisia tunnuksia, joiden ylle nousee säteilevä '
          + 'kruunu — sama kruunu, jolla kuninkaat on kruunattu.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Sri Lanka.svg': {
    maa: 'Sri Lanka',
    symboliikka: [
      {
        osa: 'Leijona ja miekka',
        selite: 'sinhalikansa ja maan puolustus — kuvio periytyy '
          + 'Kandyn kuningaskunnan lipusta.',
      },
      { osa: 'Neljä bodhi-lehteä', selite: 'buddhalaisuuden hyveet kulmissa.' },
      { osa: 'Oranssi raita', selite: 'tamilit.' },
      { osa: 'Vihreä raita', selite: 'muslimit.' },
    ],
    kappaleet: [
      'Kun Ceylon itsenäistyi 1948, lipuksi otettiin viimeisen '
        + 'itsenäisen kuningaskunnan, Kandyn, leijonalippu. Oranssi '
        + 'ja vihreä raita lisättiin 1951 edustamaan tamileja ja '
        + 'muslimeja.',
      'Vuonna 1972 maa vaihtoi nimensä Sri Lankaksi, ja lipun '
        + 'kulmiin vaihdettiin pyhän viikunapuun lehdet — sen puun, '
        + 'jonka alla Buddhan kerrotaan valaistuneen.',
    ],
    tunnukset: [
      {
        nimi: 'Sri Lankan tunnus',
        polku: 'assets/liput/tunnukset/lka-vaakuna.png',
        selite: 'Lipun leijona istuu lootuksen terälehtien kehässä, '
          + 'jota reunustavat riisintähkät runsauden ruukusta. '
          + 'Ylinnä on buddhalainen opinpyörä, sivuilla aurinko ja '
          + 'kuu.',
      },
    ],
    lahde: 'Liput ja tunnukset: Wikimedia Commons (PD)',
  },
  'Flag of Laos.svg': {
    maa: 'Laos',
    symboliikka: [
      { osa: 'Punainen', selite: 'itsenäisyystaistelun veri.' },
      { osa: 'Sininen keskiraita', selite: 'Mekong-joki ja vauraus.' },
      {
        osa: 'Valkoinen kiekko',
        selite: 'kuu Mekongin yllä — ja kansan yhtenäisyys.',
      },
    ],
    kappaleet: [
      'Lipun piirsi oppinut Maha Sila Viravong 1945 '
        + 'itsenäisyysliikkeelle. Kuningaskunnan kaaduttua 1975 siitä '
        + 'tuli valtion lippu — vanha kuninkaallinen lippu oli '
        + 'punainen ja kantoi kolmipäistä norsua.',
      'Laos on harvoja sosialistisia maita, joiden lipussa ei ole '
        + 'tähteä: sen paikalla on täysikuu joen yllä. Väriparinsa '
        + 'ansiosta lippu erottuu naapureiden punakeltaisista '
        + 'lipuista.',
    ],
    tunnukset: [
      {
        nimi: 'Laosin tunnus',
        polku: 'assets/liput/tunnukset/lao-vaakuna.png',
        selite: 'Vuonna 2025 uudistetussa tunnuksessa Pha That '
          + 'Luangin kultainen stupa kohoaa padon, tien ja '
          + 'riisipeltojen ylle riisintähkien ja hammasrattaan '
          + 'kehystämänä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Tunnus: Hlticgh, '
      + 'Wikimedia Commons (CC BY-SA 4.0)',
  },
  // Erä 8: Pohjois-Amerikan lauta kokonaisuudessaan (lisenssit
  // tarkistettu Commonsin API:sta 27.8.2026, tunnukset katsottu
  // silmin kontaktiarkilta). Kanadan vaakunakilpi on Sodacanin
  // piirros (CC BY-SA 3.0), muut tunnukset PD. Nicaraguan tunnuksesta
  // on käytössä vuosien 1908–1971 piirros, koska nykyisen asun ainoa
  // Commons-kuva on Attribution-lisenssillä eikä PD/CC — sama
  // kuvasääntö, joka jätti Omanin tunnuksen pois erässä 6.
  'Flag of the United States.svg': {
    maa: 'Yhdysvallat',
    symboliikka: [
      {
        osa: 'Kolmetoista raitaa',
        selite: 'kolmetoista siirtokuntaa, jotka irtautuivat '
          + 'Britanniasta.',
      },
      {
        osa: 'Viisikymmentä tähteä',
        selite: 'osavaltiot — yksi tähti kutakin kohden.',
      },
      {
        osa: 'Valkoinen',
        selite: 'puhtaus ja viattomuus (valtionsinetin selityksen '
          + 'mukaan).',
      },
      { osa: 'Punainen', selite: 'kestävyys ja urheus.' },
      { osa: 'Sininen', selite: 'valppaus, sinnikkyys ja oikeus.' },
    ],
    kappaleet: [
      'Mannermaakongressi päätti lipusta kesäkuussa 1777: '
        + 'kolmetoista raitaa ja kolmetoista tähteä "uutena '
        + 'tähtikuviona". Päätös ei kertonut, miten tähdet '
        + 'sommitellaan, joten jokainen ompelija asetteli ne '
        + 'omalla tavallaan — riveihin, kaareen tai ympyrään. '
        + 'Tarina siitä, että Betsy Ross olisi ommellut '
        + 'ensimmäisen lipun Washingtonin luonnoksesta, tuli '
        + 'julkisuuteen vasta 1870 hänen pojanpojaltaan, eivätkä '
        + 'aikalaislähteet tunne sitä.',
      'Aluksi uusi osavaltio toi lippuun sekä raidan että tähden. '
        + 'Vuonna 1818 kongressi palautti raidat kolmeentoista '
        + 'alkuperäisen siirtokunnan kunniaksi ja päätti, että '
        + 'jatkossa lisätään vain tähtiä — aina uutta itsenäisyys'
        + 'päivää seuraavasta neljännestä heinäkuuta alkaen.',
      'Nykyinen viidenkymmenen tähden asu tuli voimaan 4. '
        + 'heinäkuuta 1960, kun Havaiji oli liittynyt unioniin. Se '
        + 'on lipun pitkäikäisin versio: kaikkiaan lippu on '
        + 'muuttunut virallisesti 26 kertaa.',
    ],
    versiot: [
      {
        nimi: 'Kolmentoista tähden lippu 1777–1795',
        polku: 'assets/liput/versiot/usa-13-tahtea.png',
        selite: 'Ensimmäinen tähtilippu: kolmetoista tähteä ja '
          + 'kolmetoista raitaa. Tähtien asettelu vaihteli lipusta '
          + 'toiseen, koska laki ei sitä määrännyt.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Yhdysvaltain suuri sinetti',
        polku: 'assets/liput/tunnukset/usa-vaakuna.png',
        selite: 'Kaljukotka kantaa raidallista kilpeä. Toisessa '
          + 'kynnessä on kolmetoista nuolta, toisessa oliivinoksa — '
          + 'sota ja rauha — ja kotkan katse on käännetty '
          + 'oliivinoksaan päin. Nokassa on nauha, jossa lukee E '
          + 'pluribus unum, "monesta yksi". Luku kolmetoista '
          + 'toistuu sinetissä yhä uudelleen.',
      },
    ],
    lahde: 'Liput ja sinetti: Wikimedia Commons (PD)',
  },
  'Flag of Canada.svg': {
    maa: 'Kanada',
    symboliikka: [
      {
        osa: 'Punainen ja valkoinen',
        selite: 'Kanadan viralliset värit, jotka kuningas Yrjö V '
          + 'vahvisti 1921.',
      },
      {
        osa: 'Vaahteranlehti',
        selite: 'maan tunnus jo 1800-luvulta; lehdessä on '
          + 'yksitoista kärkeä, eikä luvulla ole omaa merkitystä — '
          + 'se piirrettiin niin, että lehti pysyy selvänä '
          + 'tuulessakin.',
      },
      {
        osa: 'Keskisarake',
        selite: 'valkoinen kenttä on puolet lipun leveydestä. '
          + 'Heraldiikassa muoto sai tästä lipusta nimen "Canadian '
          + 'pale".',
      },
    ],
    kappaleet: [
      'Kanadalla ei ollut omaa lippua vielä 1960-luvulla: '
        + 'käytössä oli Union Jack ja epävirallisena punainen '
        + 'Canadian Red Ensign. Pääministeri Lester B. Pearson '
        + 'halusi tunnuksen, jota ei sekoiteta Britannian lippuun — '
        + 'hän oli '
        + 'kokenut Suezin kriisissä 1956, että Egypti vastusti '
        + 'kanadalaisia rauhanturvaajia, koska näiden lipussa oli '
        + 'sotaa käyvän maan lippu.',
      'Vuoden 1964 "suuri lippukiista" kesti kuusi viikkoa ja 308 '
        + 'puheenvuoroa. Voittajaksi tuli historioitsija George '
        + 'Stanleyn ehdotus, joka pohjautui Kingstonin '
        + 'sotilasakatemian lippuun; komitea äänesti sen puolesta '
        + 'yksimielisesti 15–0. Alahuone hyväksyi lipun '
        + 'joulukuussa 1964, ja se nostettiin salkoon '
        + 'Parlamenttikukkulalla 15. helmikuuta 1965.',
    ],
    versiot: [
      {
        nimi: 'Canadian Red Ensign 1957–1965',
        polku: 'assets/liput/versiot/can-punalippu.png',
        selite: 'Punainen kauppalippu, jonka kulmassa on Union '
          + 'Jack ja liepeessä Kanadan kilpi. Se oli maan '
          + 'tosiasiallinen lippu ennen vaahteranlehteä.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Kanadan vaakunakilpi',
        polku: 'assets/liput/tunnukset/can-vaakuna.png',
        selite: 'Kilvessä ovat perustajamaiden tunnukset: '
          + 'Englannin kolme leijonaa, Skotlannin leijona, Irlannin '
          + 'harppu ja Ranskan liljat. Alimpana on kolme '
          + 'vaahteranlehteä samasta oksasta — ne olivat aluksi '
          + 'vihreitä ja muutettiin punaisiksi 1957.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakunakilpi: Sodacan, '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Mexico.svg': {
    maa: 'Meksiko',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'itsenäisyys — nykyisin luetaan myös toivoksi.',
      },
      {
        osa: 'Valkoinen',
        selite: 'katolisen uskon puhtaus — nykyisin ykseys.',
      },
      {
        osa: 'Punainen',
        selite: 'espanjalaisten ja kreolien liitto — nykyisin '
          + 'sankarien veri.',
      },
      {
        osa: 'Kotka keskellä',
        selite: 'atsteekkien perustamistaru: kotka syö käärmettä '
          + 'kaktuksen päällä.',
      },
    ],
    kappaleet: [
      'Värit tulivat Kolmen takuun armeijalta, joka yhdisti 1821 '
        + 'kapinalliset ja kuninkaan joukot. Takuut olivat uskonto, '
        + 'itsenäisyys ja ykseys, ja niistä lippu sai vihreänsä, '
        + 'valkoisensa ja punaisensa. Agustín de Iturbide vahvisti '
        + 'lipun marraskuussa 1821.',
      'Lipun keskellä on maan vanhin kuva: taru kertoo, että '
        + 'atsteekit saivat käskyn perustaa kaupunkinsa sinne, '
        + 'missä kotka istuu kaktuksella käärme kynsissään. Paikka '
        + 'oli Tenochtitlán, nykyinen Mexico City. Kotkan asu on '
        + 'vaihtunut hallitusmuodon mukana — keisarikunnan kotkalla '
        + 'oli kruunu, tasavallan kotkalta se poistettiin 1823. '
        + 'Nykyinen asu on vuodelta 1968.',
      'Ilman vaakunaa lippu olisi lähes Italian lippu. Siksi '
        + 'Meksiko luopui vaakunattomasta kauppalaivaston lipusta '
        + 'kokonaan.',
    ],
    tunnukset: [
      {
        nimi: 'Meksikon vaakuna',
        polku: 'assets/liput/tunnukset/mex-vaakuna.png',
        selite: 'Kultainen kotka seisoo kaktuksella kalliolla '
          + 'keskellä järveä ja pitää nokassaan kalkkarokäärmettä. '
          + 'Alla ovat tammen- ja laakerinoksat kansallisvärisellä '
          + 'nauhalla sidottuina.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Greenland.svg': {
    maa: 'Grönlanti',
    symboliikka: [
      {
        osa: 'Valkoinen',
        selite: 'mannerjää, joka peittää yli 80 prosenttia '
          + 'saaresta.',
      },
      { osa: 'Punainen', selite: 'meri.' },
      {
        osa: 'Punainen puolikaari',
        selite: 'aurinko, joka on painunut puoliksi meren taakse.',
      },
      {
        osa: 'Valkoinen puolikaari',
        selite: 'jäävuoret ja ahtojää.',
      },
    ],
    kappaleet: [
      'Erfalasorput, "meidän lippumme", on ainoa pohjoismainen '
        + 'lippu ilman ristiä. Sen suunnitteli grönlantilainen '
        + 'poliitikko ja opettaja Thue Christiansen, ja lippu '
        + 'hyväksyttiin 21. kesäkuuta 1985 — täpärästi, äänin '
        + '14–11, vihreä-valkoista ristilippua vastaan.',
      'Värit ovat samat kuin Tanskan lipussa, ja niin kuvion on '
        + 'tarkoituskin kertoa: Grönlanti on oma maansa Tanskan '
        + 'kuningaskunnan sisällä. Sama kuvio sattui olemaan jo '
        + 'käytössä tanskalaisella soutuseuralla, joka antoi '
        + 'ystävällisesti luvan jatkaa.',
    ],
    tunnukset: [
      {
        nimi: 'Grönlannin vaakuna',
        polku: 'assets/liput/tunnukset/grl-vaakuna.png',
        selite: 'Valkoinen jääkarhu sinisellä kentällä. Karhu on '
          + 'ollut Grönlannin tunnuksena 1600-luvulta, mutta Jens '
          + 'Rosingin vuoden 1989 piirroksessa se nostaa vasenta '
          + 'etutassuaan — inuiittiperinteen mukaan jääkarhu on '
          + 'vasenkätinen. Tanskan vaakunassa sama karhu nostaa '
          + 'oikeaa tassuaan.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Cuba.svg': {
    maa: 'Kuuba',
    symboliikka: [
      {
        osa: 'Kolme sinistä raitaa',
        selite: 'saaren silloiset kolme maakuntaa.',
      },
      { osa: 'Valkoiset raidat', selite: 'isänmaallisen asian puhtaus.' },
      {
        osa: 'Punainen kolmio',
        selite: 'voima ja lujuus — tasasivuinen kolmio on myös '
          + 'vapaamuurarien merkki tasa-arvosta.',
      },
      {
        osa: 'Valkoinen tähti',
        selite: 'yksinäinen tähti, itsenäinen Kuuba. Lipun '
          + 'lempinimi on Estrella Solitaria.',
      },
    ],
    kappaleet: [
      'Lippu syntyi maanpaossa New Yorkissa 1849. Sen suunnitteli '
        + 'runoilija Miguel Teurbe Tolón yhdessä kapinajohtaja '
        + 'Narciso Lópezin kanssa, ja ensimmäisen kappaleen ompeli '
        + 'Emilia Teurbe Tolón. Lippu nostettiin ensi kerran '
        + 'Kuuban maaperällä 1850, kun Lópezin maihinnousu valtasi '
        + 'hetkeksi Cárdenasin rannikkokaupungin.',
      'Viralliseksi lipuksi se tuli vasta 20. toukokuuta 1902, '
        + 'kun tasavalta itsenäistyi: kenraali Máximo Gómez nosti '
        + 'sen Havannan Morro-linnakkeeseen. Sen jälkeen lippu on '
        + 'säilynyt muuttumattomana — myös vuoden 1959 '
        + 'vallankumouksen yli.',
    ],
    tunnukset: [
      {
        nimi: 'Kuuban vaakuna',
        polku: 'assets/liput/tunnukset/cub-vaakuna.png',
        selite: 'Kilven yläosassa kultainen avain kahden niemen '
          + 'välissä nousevan auringon alla: Kuuba on Meksikonlahden '
          + 'avain. Vasemmalla lipun siniset raidat, oikealla '
          + 'kuninkaanpalmu laaksossa. Kilpeä kannattaa vitsakimppu, '
          + 'jonka päällä on vapauden friikkalakki.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Guatemala.svg': {
    maa: 'Guatemala',
    symboliikka: [
      {
        osa: 'Taivaansininen',
        selite: 'asetuksen mukaan voima, oikeus, totuus ja '
          + 'uskollisuus — ja kaksi merta saman maan rannoilla.',
      },
      {
        osa: 'Valkoinen',
        selite: 'puhtaus, rehellisyys ja valo.',
      },
      {
        osa: 'Ketsaali',
        selite: 'maan kansallislintu ja vapauden vertauskuva.',
      },
      {
        osa: 'Kääry',
        selite: 'Keski-Amerikan itsenäisyyspäivä 15. syyskuuta '
          + '1821.',
      },
    ],
    kappaleet: [
      'Sinivalkoiset värit ovat perintöä Keski-Amerikan '
        + 'liittotasavallalta, jonka lippua Guatemala käytti 1851 '
        + 'asti. Silloin vallan ottanut espanjamielinen ryhmä '
        + 'lisäsi lippuun Espanjan puna-keltaiset. Alkuperäiset '
        + 'värit palautettiin 1871 — mutta pystyraidoiksi '
        + 'käännettyinä, jotta lippu erottuisi naapureista.',
      'Vaakunassa ovat ristikkäiset kiväärit ja miekat: maa on '
        + 'valmis puolustautumaan. Guatemala on yksi harvoista '
        + 'maista, joiden lipussa on ampuma-ase — samassa '
        + 'joukossa ovat Mosambik, Haiti ja Bolivia.',
    ],
    tunnukset: [
      {
        nimi: 'Guatemalan vaakuna',
        polku: 'assets/liput/tunnukset/gtm-vaakuna.png',
        selite: 'Ketsaali istuu käärykirjeen päällä, jossa on '
          + 'itsenäisyyden päivämäärä. Alla ovat ristikkäin kaksi '
          + 'Remington-kivääriä ja kaksi miekkaa, ympärillä '
          + 'laakeriseppele voiton merkkinä.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Nicaragua.svg': {
    maa: 'Nicaragua',
    symboliikka: [
      {
        osa: 'Sininen ja valkoinen',
        selite: 'Keski-Amerikan liittotasavallan värit; kaksi '
          + 'sinistä raitaa ovat maata ympäröivät meret.',
      },
      { osa: 'Kolmio', selite: 'tasa-arvo.' },
      {
        osa: 'Viisi tulivuorta',
        selite: 'liiton viisi valtiota ja niiden veljeys.',
      },
      { osa: 'Sateenkaari', selite: 'rauha.' },
      { osa: 'Friikkalakki', selite: 'vapaus.' },
    ],
    kappaleet: [
      'Nicaragua otti vanhan liittotasavallan lipun takaisin '
        + 'käyttöön 1908 — se oli kannanotto: maa toivoi '
        + 'Keski-Amerikan yhdistyvän uudelleen. Virallisesti lippu '
        + 'vahvistettiin vasta 1971. Samasta juuresta ovat myös '
        + 'Guatemalan, El Salvadorin, Hondurasin ja Costa Rican '
        + 'liput.',
      'Sateenkaaren ansiosta Nicaraguan lippu on yksi harvoista '
        + 'maailmassa, joissa on violettia väriä.',
    ],
    tunnukset: [
      {
        nimi: 'Nicaraguan vaakuna (asu 1908–1971)',
        polku: 'assets/liput/tunnukset/nic-vaakuna-1908.png',
        selite: 'Kolmion sisällä on viisi tulivuorta kahden meren '
          + 'välissä, niiden yllä sateenkaari ja säteilevä '
          + 'friikkalakki. Ympärillä kiertää teksti REPÚBLICA DE '
          + 'NICARAGUA — AMÉRICA CENTRAL. Nykyinen vaakuna on '
          + 'samojen osien tarkennettu piirros.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Panama.svg': {
    maa: 'Panama',
    symboliikka: [
      { osa: 'Sininen', selite: 'konservatiivipuolue.' },
      { osa: 'Punainen', selite: 'liberaalipuolue.' },
      {
        osa: 'Valkoinen',
        selite: 'rauha, jossa puolueiden on määrä toimia.',
      },
      {
        osa: 'Sininen tähti',
        selite: 'maan puhtaus ja rehellisyys.',
      },
      { osa: 'Punainen tähti', selite: 'laki ja järjestys.' },
    ],
    kappaleet: [
      'Panama irtautui Kolumbiasta marraskuussa 1903, ja lippu '
        + 'tehtiin kiireessä. Ensimmäisen ehdotuksen laati '
        + 'kanavahankkeen ranskalaisen asiamiehen Philippe '
        + 'Bunau-Varillan vaimo: '
        + 'siinä oli kolmetoista raitaa ja kaksi aurinkoa. Se '
        + 'hylättiin liian Yhdysvaltain lipun näköisenä.',
      'Nykyisen lipun luonnosteli Manuel Encarnación Amador, ja '
        + 'María de la Ossa de Amador ompeli ensimmäiset kolme '
        + 'kappaletta piilossa Kolumbian sotilailta. Alkuperäisessä '
        + 'lipussa ylävasen neljännes oli sininen; se vaihdettiin '
        + 'valkoiseksi, kun sininen oli valittu puolueen väriksi. '
        + 'Laki vahvisti lipun 1925, ja 4. marraskuuta vietetään '
        + 'lippupäivää.',
    ],
    tunnukset: [
      {
        nimi: 'Panaman vaakuna',
        polku: 'assets/liput/tunnukset/pan-vaakuna.png',
        selite: 'Kilven keskellä on Panaman kannas, jossa aurinko '
          + 'laskee ja kuu nousee — itsenäisyysjulistuksen hetki. '
          + 'Ylhäällä miekka ja kivääri kertovat sisällissodista '
          + 'luopumisesta, lapio ja kuokka työstä; alhaalla '
          + 'runsaudensarvi ja siivekäs pyörä lupaavat vaurautta ja '
          + 'edistystä. Ylinnä on harpyija, ja tähtiä on yksi '
          + 'kutakin maakuntaa kohti.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Puerto Rico.svg': {
    maa: 'Puerto Rico',
    symboliikka: [
      {
        osa: 'Punaiset raidat',
        selite: 'taistelijoiden vuodattama veri.',
      },
      {
        osa: 'Valkoiset raidat',
        selite: 'vapaus, voitto ja rauha; nykyselityksessä myös '
          + 'hallinnon kolme haaraa.',
      },
      {
        osa: 'Sininen kolmio',
        selite: 'taivas ja rannikkovedet — kolme sivua ovat '
          + 'lainsäädäntö-, toimeenpano- ja tuomiovalta.',
      },
      { osa: 'Valkoinen tähti', selite: 'saari itse.' },
    ],
    kappaleet: [
      'Lippu on Kuuban lipun peilikuva: värit on vaihdettu '
        + 'keskenään. Se tehtiin New Yorkissa 1895, kun '
        + 'puertoricolaiset ja kuubalaiset pakolaiset taistelivat '
        + 'yhdessä Espanjaa vastaan — kaksi viimeistä siirtomaata '
        + 'Amerikassa, kaksi lippua samaa perhettä.',
      'Lipun esilläpito oli rikos vuosikymmeniä: ensin Espanjan '
        + 'ja sitten Yhdysvaltain hallinnon aikana. Virallisen '
        + 'aseman lippu sai 1952, mutta vasta kun niin sanottu '
        + 'suulaki kumottiin perustuslain vastaisena 1957, sitä '
        + 'sai vapaasti liehuttaa saarella.',
      'Sinisen sävy on yhä poliittinen kysymys, koska laki ei '
        + 'määrää sitä: vaaleaa sinistä käyttävät '
        + 'itsenäisyyden kannattajat, tummaa osavaltioksi '
        + 'liittymisen kannattajat ja keskisinistä ne, joille '
        + 'nykyinen asema kelpaa.',
    ],
    tunnukset: [
      {
        nimi: 'Puerto Ricon vaakuna',
        polku: 'assets/liput/tunnukset/pri-vaakuna.png',
        selite: 'Espanjan kruunu myönsi vaakunan 1511, ja se on '
          + 'Amerikan vanhin yhä käytössä oleva vaakuna. Keskellä '
          + 'on Jumalan Karitsa kirjan päällä, reunoilla Kastilian '
          + 'linnat ja Leónin leijonat. Nauhassa lukee Joannes est '
          + 'nomen ejus — "Johannes on hänen nimensä", muisto '
          + 'saaren vanhasta nimestä San Juan Bautista.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Bermuda.svg': {
    maa: 'Bermuda',
    symboliikka: [
      {
        osa: 'Punainen kenttä',
        selite: 'brittiläinen Red Ensign eli kauppalaivaston lippu.',
      },
      {
        osa: 'Union Jack kulmassa',
        selite: 'Bermuda on Britannian merentakainen alue.',
      },
      {
        osa: 'Vaakuna liepeessä',
        selite: 'punainen leijona pitelee kilpeä, jossa uppoaa '
          + 'laiva.',
      },
    ],
    kappaleet: [
      'Bermudan lippu vahvistettiin 1910. Se on brittialueiden '
        + 'joukossa poikkeus: lähes kaikki muut käyttävät maalla '
        + 'sinistä ensignia, Bermuda punaista. Sama tapa oli '
        + 'aikanaan Kanadalla ennen vuotta 1965. Vuonna 1999 '
        + 'vaakuna suurennettiin nykyiseen kokoonsa.',
      'Kilven laiva on Sea Venture, joka ajoi hirmumyrskyssä '
        + 'karille Bermudan riutoille kesällä 1609 matkallaan '
        + 'Jamestowniin. Kaikki 150 matkustajaa — ja laivakoira — '
        + 'pelastuivat, '
        + 'rakensivat saarelle kaksi uutta alusta ja aloittivat '
        + 'samalla saarten asuttamisen. Haaksirikon kertomusten '
        + 'arvellaan innoittaneen Shakespearea Myrsky-näytelmään.',
    ],
    tunnukset: [
      {
        nimi: 'Bermudan vaakuna',
        polku: 'assets/liput/tunnukset/bmu-vaakuna.png',
        selite: 'Punainen leijona istuu vihreällä kummulla ja '
          + 'pitelee kilpeä, jossa Sea Venture murtuu riuttaan. '
          + 'Nauhassa lukee Quo Fata Ferunt — "minne kohtalot '
          + 'kantavat".',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
};
