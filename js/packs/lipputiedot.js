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
  'Flag of Brazil.svg': {
    maa: 'Brasilia',
    symboliikka: [
      {
        osa: 'Vihreä kenttä',
        selite: 'keisari Pedro I:n suvun, Braganzan huoneen väri.',
      },
      {
        osa: 'Keltainen vinoneliö',
        selite: 'keisarinna Maria Leopoldinan suvun, Habsburgien '
          + 'väri.',
      },
      {
        osa: 'Sininen pallo',
        selite: 'Rio de Janeiron tähtitaivas 15. marraskuuta 1889, '
          + 'tasavallan julistamisen päivänä.',
      },
      {
        osa: '27 tähteä',
        selite: 'osavaltiot ja liittopiiri. Jokainen on todellinen '
          + 'tähti ja piirretty kirkkautensa mukaisen kokoisena.',
      },
      {
        osa: 'Valkoinen nauha',
        selite: 'tunnuslause ORDEM E PROGRESSO — "järjestys ja '
          + 'edistys".',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin 19. marraskuuta 1889, neljä päivää '
        + 'tasavallan julistamisen jälkeen. Nuo neljä päivää '
        + 'liehui aivan toisenlainen lippu: juristi Ruy Barbosan '
        + 'piirtämä, Yhdysvaltain lipun kaltainen raitalippu, '
        + 'jonka sotamarsalkka Deodoro da Fonseca hylkäsi liian '
        + 'toisen maan lipun näköisenä.',
      'Fonseca halusi lipun muistuttavan keisarikunnan lippua, '
        + 'jotta siirtymä kuningaskunnasta tasavaltaan näyttäisi '
        + 'jatkumolta. Niinpä vihreä kenttä ja keltainen vinoneliö '
        + 'jäivät ja keisarillisen vaakunan tilalle tuli '
        + 'tähtitaivas. Tunnuslause on lyhennelmä Auguste Comten '
        + 'positivismin iskulauseesta "rakkaus periaatteena, '
        + 'järjestys perustana, edistys päämääränä".',
      'Tähtiä oli aluksi 21; niitä on lisätty sitä mukaa kuin '
        + 'osavaltioita on perustettu, ja vuodesta 1992 niitä on '
        + 'ollut 27. Tuttu selitys, jonka mukaan vihreä on '
        + 'sademetsä ja keltainen kulta, on myöhempi kansanselitys '
        + '— alkuperäinen perustelu olivat hallitsijasuvut.',
    ],
    versiot: [
      {
        nimi: 'Keisarikunnan lippu 1870–1889',
        polku: 'assets/liput/versiot/bra-keisarikunta.png',
        selite: 'Sama vihreä kenttä ja keltainen vinoneliö, mutta '
          + 'keskellä keisarikunnan vaakuna: kultainen '
          + 'taivaanpallo Kristuksen ritarikunnan punaisen ristin '
          + 'päällä, ympärillä kaksikymmentä tähteä ja ylinnä '
          + 'keisarin kruunu. Tämä lippu liehui Brasiliassa myös '
          + 'isoisän matkavuonna 1873.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Brasilian vaakuna',
        polku: 'assets/liput/tunnukset/bra-vaakuna.png',
        selite: 'Pyöreällä kilvellä on Etelän risti ja sen '
          + 'ympärillä osavaltioiden tähdet. Kilpi lepää '
          + 'miekankahvan päällä vihreä-kultaisen tähden keskellä. '
          + 'Sivuilla ovat kahvin ja tupakan oksat — 1889 maan '
          + 'tärkeimmät vientikasvit. Nauhassa on maan nimi ja '
          + 'tasavallan julistamisen päivämäärä.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Argentina.svg': {
    maa: 'Argentiina',
    symboliikka: [
      {
        osa: 'Vaaleansininen ja valkoinen',
        selite: 'vuoden 1812 kansallisen kokardin värit. Tutuin '
          + 'selitys on taivas ja pilvet, mutta historioitsijat '
          + 'johtavat värit useimmiten Espanjan Bourbon-suvun '
          + 'väreistä.',
      },
      {
        osa: 'Toukokuun aurinko',
        selite: 'keskiraidan kultainen aurinko, jossa on 32 '
          + 'sädettä joka toinen suorana ja joka toinen '
          + 'aaltoilevana.',
      },
      {
        osa: 'Auringon kasvot',
        selite: 'aurinko on kopio vuoden 1813 kahdeksan escudon '
          + 'kolikon kuvasta; sitä on tulkittu myös inkojen '
          + 'aurinkojumalaksi Intiksi.',
      },
    ],
    kappaleet: [
      'Manuel Belgrano nosti sinivalkoisen lipun ensimmäisen '
        + 'kerran Rosariossa 27. helmikuuta 1812. Hallitus kielsi '
        + 'sen heti: Buenos Airesin triumviraatti esiintyi yhä '
        + 'Napoleonin vangitseman Espanjan kuninkaan Ferdinand '
        + 'VII:n nimissä, eikä oma lippu sopinut siihen kuvaan. '
        + 'Käsky ei tavoittanut Belgranoa pohjoisen sotaretkellä, '
        + 'ja hän vannotti joukkonsa lipulle Jujuyssa toukokuussa.',
      'Tucumánin kongressi teki lipusta kansallislipun 1816, ja '
        + 'aurinko lisättiin keskiraitaan 1818. Kaiverruksen teki '
        + 'Juan de Dios Rivera, inkojen ylimystöön kuulunut '
        + 'hopeaseppä.',
      'Argentiinalla on kaksi virallista asua: aurinkoinen '
        + 'seremonialippu ja koristelippu ilman aurinkoa. '
        + 'Kumpikin on kansallislippu, mutta koristelippu on aina '
        + 'liputettava seremonialipun alapuolelle. Ensimmäisen '
        + 'lipun tarkasta sävystä — sinisestä vai '
        + 'vaaleansinisestä — kiistellään yhä.',
    ],
    tunnukset: [
      {
        nimi: 'Argentiinan vaakuna',
        polku: 'assets/liput/tunnukset/arg-vaakuna.png',
        selite: 'Soikealla kilvellä kaksi kättä puristavat '
          + 'toisiaan ja pitelevät keihästä, jonka nokassa on '
          + 'punainen friikkalakki: kädet ovat yhtenäisyys, '
          + 'keihäs valta ja lakki vapaus. Yllä on toukokuun '
          + 'aurinko ja ympärillä laakeriseppele. Tunnuslause on '
          + 'en unión y libertad, "yhtenäisyydessä ja '
          + 'vapaudessa".',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Chile.svg': {
    maa: 'Chile',
    symboliikka: [
      { osa: 'Valkoinen', selite: 'Andien lumi.' },
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta vuodatettu veri.',
      },
      { osa: 'Sininen', selite: 'taivas ja Tyynimeri.' },
      {
        osa: 'Valkoinen tähti',
        selite: 'yhtenäinen valtio. Toisen tulkinnan mukaan tähti '
          + 'on Venus, jota mapuchet kutsuvat nimellä Guñelve ja '
          + 'joka opastaa kulkijaa.',
      },
    ],
    kappaleet: [
      'Nykyinen lippu vahvistettiin 18. lokakuuta 1817, ja sitä '
        + 'kutsutaan nimellä La Estrella Solitaria, "yksinäinen '
        + 'tähti". Sitä ennen käytössä oli Patria Vieja -lippu '
        + 'vuodelta 1812: sinivalkokeltainen kolmiraita, jonka '
        + 'perimätiedon mukaan ompeli Javiera Carrera. Tähden toi '
        + 'lippuun Bernardo O\'Higgins.',
      'La Araucana -eepokseen nojaavan perinteen mukaan värit '
        + 'ovat peräisin mapuchejen sotalipuista Arauco-sodan '
        + 'ajalta. Runoelma vuodelta 1569 on vanhin tunnettu '
        + 'maininta mapuchejen sinisestä, valkoisesta ja '
        + 'punaisesta; onko yhteys nykylippuun todellinen, ei ole '
        + 'todistettavissa.',
      'Lipun päivää vietetään 9. heinäkuuta niiden 77 sotilaan '
        + 'muistoksi, jotka kaatuivat La Concepciónin '
        + 'taistelussa 1882. Lippu on suojattu laissa: sen '
        + 'julkinen häpäiseminen on rikos yleistä järjestystä '
        + 'vastaan, ja liputus on pakollista itsenäisyyspäivänä '
        + '18. syyskuuta.',
    ],
    tunnukset: [
      {
        nimi: 'Chilen vaakuna',
        polku: 'assets/liput/tunnukset/chl-vaakuna.png',
        selite: 'Vuonna 1834 vahvistettu vaakuna, jonka piirsi '
          + 'englantilainen taiteilija Charles Wood Taylor. '
          + 'Kilpi on lipun sininen ja punainen, keskellä '
          + 'valkoinen tähti. Kannattajina ovat Andien kondori ja '
          + 'huemul, vain Chilessä elävä hirvi; molemmilla on '
          + 'kultainen laivastokruunu. Nauhassa lukee Por la '
          + 'Razón o la Fuerza — "järjellä tai voimalla".',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Peru.svg': {
    maa: 'Peru',
    symboliikka: [
      {
        osa: 'Punaiset reunaraidat',
        selite: 'itsenäisyystaisteluissa vuodatettu veri.',
      },
      {
        osa: 'Valkoinen keskiraita',
        selite: 'rauha ja puhtaus.',
      },
      {
        osa: 'Vaakuna keskellä',
        selite: 'vain valtion ja puolustusvoimien lipuissa. '
          + 'Kansalaisten lipussa keskiraita on tyhjä.',
      },
    ],
    kappaleet: [
      'Ensimmäisen lipun määräsi José de San Martín lokakuussa '
        + '1820. Kirjailija Abraham Valdelomarin kertoman mukaan '
        + 'San Martín sai värit Piscon rannalla nousseesta '
        + 'parihuana-parvesta — punavalkoisista flamingoista. '
        + 'Historioitsijat ovat esittäneet arkisempia selityksiä: '
        + 'punainen tulisi Chilen ja valkoinen Argentiinan '
        + 'lipusta, sillä vapautusarmeija tuli näistä maista.',
      'Vinoneliöiksi jaettu lippu osoittautui hankalaksi ompelun '
        + 'kannalta, ja Torre Taglen markiisi vaihtoi sen '
        + 'maaliskuussa 1822 vaakaraitaiseksi. Se taas muistutti '
        + 'kaukaa katsottuna liikaa Espanjan lippua, mikä sekoitti '
        + 'taistelukentät, joten toukokuussa raidat käännettiin '
        + 'pystyyn. Vuonna 1825 Bolívarin aikainen kongressi '
        + 'korvasi keskellä olleen auringon uudella vaakunalla.',
      'Nykyiseen muotoonsa lippu tuli 1950, kun presidentti '
        + 'Manuel A. Odría poisti vaakunan kansalaisten lipusta ja '
        + 'määräsi valtiolipulle ja sotalipulle omat, hieman eri '
        + 'vaakunansa. Siksi Perussa on kolme lippua, jotka '
        + 'eroavat toisistaan vain keskiraidan tunnuksesta.',
    ],
    versiot: [
      {
        nimi: 'Ensimmäinen lippu 1820',
        polku: 'assets/liput/versiot/per-1820.png',
        selite: 'San Martínin lippu: vinottain neljään jaettu '
          + 'kenttä, jossa ylä- ja alaosa ovat valkoiset ja '
          + 'sivut punaiset. Keskellä on laakeriseppele, jonka '
          + 'sisällä aurinko nousee vuorten takaa meren yli. '
          + 'Lippua käytettiin vain puolitoista vuotta.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Perun vaakuna',
        polku: 'assets/liput/tunnukset/per-vaakuna.png',
        selite: 'Kilpi on jaettu kolmeen osaan, jotka esittävät '
          + 'maan luonnonvaroja: sinisellä vikunja eläinkuntana, '
          + 'valkoisella kiinapuu kasvikuntana ja punaisella '
          + 'runsaudensarvi, josta valuu kolikoita, '
          + 'kivennäisvaroina. Kiinapuun kuoresta saatiin '
          + 'kiniini, 1800-luvun ainoa toimiva malarialääke. '
          + 'Kilven kummallakin puolella on Perun lippu ja '
          + 'standaari, ylinnä tammesta punottu kansalaisseppele. '
          + 'Tämä on Escudo Nacional, valtiolipun vaakuna; '
          + 'sotalipussa ja laivastossa on omat muunnelmansa.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Bolivia.svg': {
    maa: 'Bolivia',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta kaatuneiden veri ja '
          + 'rohkeus.',
      },
      { osa: 'Keltainen', selite: 'maaperän kivennäisvarat.' },
      { osa: 'Vihreä', selite: 'luonnon hedelmällisyys.' },
      {
        osa: 'Vaakuna keskellä',
        selite: 'vain valtiolipussa. Kansalaisten lipussa on '
          + 'pelkät kolme raitaa.',
      },
    ],
    kappaleet: [
      'Nykyinen kolmiraita vahvistettiin 31. lokakuuta 1851 '
        + 'presidentti Manuel Isidoro Belzun aikana. Lipun '
        + 'mittasuhteita ei määrätty lainkaan ennen vuotta 2004, '
        + 'jolloin ne lyötiin lukkoon suhteeseen 15:22.',
      'Vuoden 2009 perustuslaki nosti wiphalan kolmiraidan '
        + 'rinnalle: se on nyt Bolivian toinen kansallislippu. '
        + 'Virallisissa tilaisuuksissa wiphala liputetaan '
        + 'kolmiraidan vasemmalle puolelle.',
      'Bolivialla on merivoimat, vaikka maalla ei ole '
        + 'merenrantaa — alukset liikkuvat joilla ja '
        + 'Titicacajärvellä. Laivaston lipun yhdeksän pientä '
        + 'tähteä ovat departementit ja suuri tähti muistuttaa '
        + 'oikeudesta merelle, jonka Bolivia menetti Chilelle '
        + 'Tyynenmeren sodassa 1884.',
    ],
    versiot: [
      {
        nimi: 'Wiphala',
        polku: 'assets/liput/versiot/bol-wiphala.png',
        selite: 'Neliön muotoinen 49 ruudun sateenkaarilippu, '
          + 'Andien alkuperäiskansojen tunnus. Tämä asu '
          + 'edustaa eteläistä Qullasuyua ja on Bolivian toinen '
          + 'virallinen kansallislippu vuodesta 2009. Nykyisen '
          + 'piirroksen suunnitteli Germán Choque Condori 1979.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Bolivian vaakuna',
        polku: 'assets/liput/tunnukset/bol-vaakuna.png',
        selite: 'Soikeassa kentässä kohoaa Potosín Cerro Rico, '
          + 'hopeavuori, joka rahoitti Espanjan valtakuntaa '
          + 'kolmen vuosisadan ajan. Aurinko nousee sen takaa; '
          + 'edessä ovat laama, vehnälyhde ja palmu. Kehällä on '
          + 'kymmenen tähteä, sivuilla lippuja, tykki, kiväärejä '
          + 'ja friikkalakki, ja ylinnä Andien kondori.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Colombia.svg': {
    maa: 'Kolumbia',
    symboliikka: [
      {
        osa: 'Keltainen',
        selite: 'maan rikkaudet ja kulta. Raita on puolet lipun '
          + 'korkeudesta.',
      },
      {
        osa: 'Sininen',
        selite: 'maata reunustavat kaksi valtamerta ja joet.',
      },
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta vuodatettu veri.',
      },
      {
        osa: 'Raitojen suhde 2:1:1',
        selite: 'harvinaisuus kolmiraitalippujen joukossa — '
          + 'raidat eivät ole yhtä leveitä.',
      },
    ],
    kappaleet: [
      'Värit ovat Francisco de Mirandan käsialaa. Hän pyysi '
        + 'niitä jo vuoden 1801 suunnitelmassaan Espanjan '
        + 'Amerikan vapauttamiseksi, ja lippu nostettiin '
        + 'ensimmäisen kerran 12. maaliskuuta 1806 Jacmelissa '
        + 'Haitissa. Samasta juuresta ovat myös Venezuelan ja '
        + 'Ecuadorin liput: kaikki kolme maata kuuluivat '
        + 'aikanaan Suur-Kolumbiaan.',
      'Miranda kertoi itse kahdesta innoituksen lähteestä. '
        + 'Kirjeessään hän kuvasi yöllistä keskustelua Johann '
        + 'Wolfgang von Goethen kanssa Weimarissa talvella 1785: '
        + 'Goethe oli selittänyt hänelle kolmen perusvärin '
        + 'teoriaa ja sanonut, että Mirandan kohtalona on luoda '
        + 'maa, jossa perusvärit eivät vääristy. '
        + 'Sotapäiväkirjassaan Miranda mainitsee toisen lähteen: '
        + 'Hampurin porvarikaartin kelta-sini-punaisen lipun.',
      'Nykyinen värijärjestys vahvistettiin 26. marraskuuta '
        + '1861. Vaakuna kuuluu lippuun vain virallisissa '
        + 'yhteyksissä; tavallinen lippu on pelkkä kolmiraita.',
    ],
    tunnukset: [
      {
        nimi: 'Kolumbian vaakuna',
        polku: 'assets/liput/tunnukset/col-vaakuna.png',
        selite: 'Francisco de Paula Santanderin 1834 '
          + 'suunnittelema vaakuna. Alimpana purjehtii kaksi '
          + 'laivaa: ne muistuttavat Panaman kannaksesta, joka '
          + 'kuului Kolumbiaan vuoteen 1903, ja nykyään maata '
          + 'reunustavista kahdesta merestä. Keskellä on '
          + 'friikkalakki ja ylinnä granaattiomena, Uuden '
          + 'Granadan varakuningaskunnan tunnus, kahden '
          + 'runsaudensarven välissä. Kondorin nokassa on '
          + 'oliiviseppele ja nauhassa Libertad y Orden.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Venezuela.svg': {
    maa: 'Venezuela',
    symboliikka: [
      { osa: 'Keltainen', selite: 'maan rikkaudet.' },
      {
        osa: 'Sininen',
        selite: 'Espanjasta erottava meri.',
      },
      {
        osa: 'Punainen',
        selite: 'kansan rohkeus ja vuodatettu veri.',
      },
      {
        osa: 'Kahdeksan tähteä',
        selite: 'itsenäisyysjulistuksen allekirjoittaneet '
          + 'seitsemän provinssia sekä Guayana.',
      },
      {
        osa: 'Vaakuna yläkulmassa',
        selite: 'vain valtiolipussa; kauppa- ja siviililipusta '
          + 'se puuttuu.',
      },
    ],
    kappaleet: [
      'Kelta-sini-punaisen lipun suunnitteli Francisco de '
        + 'Miranda, ja se liehui ensimmäisen kerran Venezuelan '
        + 'maaperällä La Vela de Corossa 3. elokuuta 1806. '
        + 'Kansalliskongressi otti sen käyttöön 1811. Lipun '
        + 'päivää vietettiin pitkään maaliskuussa, mutta 2006 se '
        + 'siirrettiin elokuun kolmanteen päivään.',
      '1800-luvun alkupuolella lippuun lisättiin seitsemän '
        + 'tähteä itsenäisyysjulistuksen allekirjoittaneiden '
        + 'provinssien mukaan. Simón Bolívar määräsi Angosturassa '
        + 'marraskuussa 1817 kahdeksannen tähden vapautetulle '
        + 'Guayanalle, mutta käsky jäi käytännössä toteutumatta. '
        + 'Presidentti Hugo Chávez otti sen esiin lähes '
        + 'kaksisataa vuotta myöhemmin, ja kahdeksas tähti '
        + 'lisättiin lippuun 2006. Oppositio ilmoitti, ettei se '
        + 'käytä uutta lippua.',
      'Sama laki käänsi vaakunan valkoisen hevosen laukkaamaan '
        + 'toiseen suuntaan. Lehtitietojen mukaan keskustelun '
        + 'sytytti presidentin tyttären huomautus siitä, että '
        + 'hevonen katsoi taaksepäin; hallituksen kannattajat '
        + 'ovat korostaneet, että päätöksen tekivät joka '
        + 'tapauksessa lainsäätäjät ja hallitus yhdessä.',
    ],
    tunnukset: [
      {
        nimi: 'Venezuelan vaakuna',
        polku: 'assets/liput/tunnukset/ven-vaakuna.png',
        selite: 'Kilpi on jaettu lipun väreihin. Punaisella on '
          + 'vehnälyhde, osavaltioiden liitto ja maan vauraus; '
          + 'keltaisella aseet ja kaksi lippua laakerin '
          + 'sitomina, voitto sodassa; sinisellä laukkaa '
          + 'valkoinen hevonen, jonka esikuvana pidetään '
          + 'Bolívarin ratsua Palomoa. Vuonna 2006 aseiden '
          + 'joukkoon lisättiin viidakkoveitsi ja jousi '
          + 'nuolineen. Ylinnä ovat runsaudensarvet.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Ecuador.svg': {
    maa: 'Ecuador',
    symboliikka: [
      {
        osa: 'Keltainen',
        selite: 'viljelysmaa ja sadot. Raita on puolet lipun '
          + 'korkeudesta.',
      },
      { osa: 'Sininen', selite: 'meri ja kirkas taivas.' },
      {
        osa: 'Punainen',
        selite: 'isänmaan puolesta kaatuneiden veri.',
      },
      {
        osa: 'Vaakuna keskellä',
        selite: 'erottaa Ecuadorin lipun Kolumbian lipusta. '
          + 'Kauppalaivaston lipusta vaakuna puuttuu.',
      },
    ],
    kappaleet: [
      'Ennen kelta-sini-punaista Ecuadorilla oli aivan toisen '
        + 'näköinen lippu: vaaleansiniset ja valkoiset raidat '
        + 'sekä kolme tähteä. Nykyiset värit vahvistettiin '
        + 'laissa 1835 ja uudelleen 26. syyskuuta 1860; ne '
        + 'periytyvät Suur-Kolumbian lipusta ja siten Francisco '
        + 'de Mirandan värivalinnasta.',
      'Vaakuna asetettiin lipun keskelle vasta 1900. Ilman sitä '
        + 'lippu on käytännössä sama kuin Kolumbian, ja juuri '
        + 'siksi Ecuadorin valtiolippu on aina vaakunallinen.',
      'Vuoden 2009 ohjeissa lippu on mitoitettu tarkasti: '
        + 'kokonaiskoko 2,20 × 1,47 metriä ja vaakuna puolet '
        + 'lipun korkeudesta. Sama ohje määrää, että lipun '
        + 'myyjän on kiinnitettävä nurjalle puolelle pieni '
        + 'lappu, jossa lukee valmistajan nimi ja '
        + 'valmistusvuosi.',
    ],
    tunnukset: [
      {
        nimi: 'Ecuadorin vaakuna',
        polku: 'assets/liput/tunnukset/ecu-vaakuna.png',
        selite: 'Kilven taustalla kohoaa Chimborazo, maan korkein '
          + 'vuori, ja sen juurelta virtaa Guayas-joki. Joella '
          + 'kulkee samanniminen höyrylaiva — Guayaquilissa '
          + 'rakennettu, 1841 liikenteeseen lähtenyt Etelä-'
          + 'Amerikan ensimmäinen merikelpoinen höyryalus. '
          + 'Kilven yläreunassa paistaa aurinko, ja sen '
          + 'kummallakin puolella on kaksi eläinradan merkkiä — '
          + 'oinas, härkä, kaksoset ja rapu eli maalis–heinäkuu '
          + '1845, vallankumouksen kuukaudet. Alla on vitsakimppu '
          + 'tasavallan arvon merkkinä ja ylinnä Andien kondori.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Wikimedia '
      + 'Commons (CC0)',
  },
  'Flag of Paraguay.svg': {
    maa: 'Paraguay',
    symboliikka: [
      {
        osa: 'Punainen, valkoinen ja sininen',
        selite: 'värien uskotaan tulleen Ranskan trikolorista '
          + 'itsenäisyyden ja vapauden merkkinä.',
      },
      {
        osa: 'Etusivun tunnus',
        selite: 'kansallissinetti: keltainen tähti palmun- ja '
          + 'oliivinlehtien seppeleessä ja teksti REPÚBLICA DEL '
          + 'PARAGUAY.',
      },
      {
        osa: 'Takasivun tunnus',
        selite: 'valtiovarain sinetti: keltainen leijona, sen '
          + 'takana tanko ja punainen friikkalakki, ja kaaressa '
          + 'teksti PAZ Y JUSTICIA — "rauha ja oikeus".',
      },
    ],
    kappaleet: [
      'Paraguay on maailman ainoa maa, jonka lipun etu- ja '
        + 'takasivu ovat erilaiset. Ero periytyy diktaattori José '
        + 'Gaspar Rodríguez de Francian ajalta, jolloin '
        + 'tasavallalla oli kaksi eri sinettiä — toinen valtiolle '
        + 'ja toinen valtiovarainhoidolle.',
      'Ensimmäinen paraguaylainen lippu nostettiin Asunciónissa '
        + '15. toukokuuta 1811, päivä toukokuun vallankumouksen '
        + 'jälkeen: se oli sininen ja kulmassa valkoinen '
        + 'kuusisakarainen tähti. Sininen viittasi Neitsyt Marian '
        + 'taivaaseenottamiseen, josta pääkaupunki on saanut '
        + 'nimensä. Punavalkosininen kolmiraita tuli käyttöön '
        + '1812, ja nykyiseen muotoonsa lippu vahvistettiin 25. '
        + 'marraskuuta 1842.',
      'Viimeisin muutos tehtiin 2013, kun presidentti Federico '
        + 'Franco vahvisti sinetille yhden standardimuodon. '
        + 'Samalla kuvio palautettiin lähemmäs 1800-luvun asua: '
        + 'maan nimi muuttui keltaisesta mustaksi ja tähden '
        + 'ympäriltä katosi sininen kehä.',
    ],
    versiot: [
      {
        nimi: 'Lipun takasivu',
        polku: 'assets/liput/versiot/pry-takasivu.png',
        selite: 'Sama kolmiraita, mutta keskellä valtiovarain '
          + 'sinetti: leijona vartioi vapauden friikkalakkia, ja '
          + 'kaaressa lukee PAZ Y JUSTICIA. Tätä puolta käyttää '
          + 'tunnuksenaan myös Paraguayn korkein oikeus.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Paraguayn kansallissinetti',
        polku: 'assets/liput/tunnukset/pry-vaakuna.png',
        selite: 'Paraguaylla ei ole erillistä vaakunaa vaan kaksi '
          + 'sinettiä, ja ne ovat lipun kaksi puolta. Tässä on '
          + 'niistä etummainen: toukokuun tähti seppeleen '
          + 'sisällä. Sinettien ensimmäiset piirrokset ovat '
          + 'vuodelta 1820.',
      },
    ],
    lahde: 'Liput ja sinetit: Wikimedia Commons (PD)',
  },
  'Flag of Uruguay.svg': {
    maa: 'Uruguay',
    symboliikka: [
      {
        osa: 'Yhdeksän raitaa',
        selite: 'maan yhdeksän ensimmäistä departementtia. Malli '
          + 'on Yhdysvaltain lipusta, jossa raidat ovat '
          + 'alkuperäiset kolmetoista siirtokuntaa.',
      },
      {
        osa: 'Sininen ja valkoinen',
        selite: 'Argentiinan lipun ja Belgranon joukkojen värit.',
      },
      {
        osa: 'Toukokuun aurinko',
        selite: 'toukokuun 1810 vallankumous. Sama aurinko on '
          + 'Argentiinan lipussa ja Bolivian vaakunassa; säteitä '
          + 'on 16, joka toinen kolmiomainen ja joka toinen '
          + 'aaltoileva.',
      },
    ],
    kappaleet: [
      'Lippu hyväksyttiin joulukuussa 1828, kun Uruguay oli juuri '
        + 'irronnut Brasiliasta itsenäiseksi valtioksi. '
        + 'Suunnittelija oli väliaikainen hallitsija Joaquín '
        + 'Suárez. Ensimmäisessä versiossa oli 19 raitaa, mutta '
        + 'ne sulautuivat kaukaa katsottuna toisiinsa, joten '
        + 'heinäkuussa 1830 raidat vähennettiin yhdeksään.',
      'Uruguaylla on kolme virallista lippua. Pabellón Nacional '
        + 'on niistä ensimmäinen; sen rinnalla ovat Artigasin '
        + 'lippu ja Treinta y Tres -lippu, vapaussotien '
        + 'tunnukset, jotka julistettiin virallisiksi 1952.',
      'Sinisen sävyä ei ole koskaan määrätty laissa, ja '
        + 'sisällissodan aikana sävy kertoi puolueen: Manuel '
        + 'Oriben blanco-joukot käyttivät tummansinistä ja '
        + 'piiritetyn Montevideon colorado-joukot '
        + 'vaaleansinistä. Auringon kasvot ja kuusitoista '
        + 'sädettä vahvistettiin virallisiksi vasta 1952.',
    ],
    tunnukset: [
      {
        nimi: 'Uruguayn vaakuna',
        polku: 'assets/liput/tunnukset/ury-vaakuna.png',
        selite: 'Soikea kilpi on jaettu neljään: kultainen vaaka '
          + 'on tasa-arvo ja oikeus, Montevideon linnoitusvuori '
          + 'voima, laukkaava musta hevonen vapaus ja kultainen '
          + 'härkä yltäkylläisyys. Ylinnä on toukokuun aurinko, '
          + 'ympärillä laakerin- ja oliivinoksa vaaleansinisellä '
          + 'nauhalla sidottuina. Vaakuna vahvistettiin 1829.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of the Falkland Islands.svg': {
    maa: 'Falklandinsaaret',
    symboliikka: [
      {
        osa: 'Sininen kenttä',
        selite: 'brittiläinen Blue Ensign, merentakaisten '
          + 'alueiden tavallinen lippupohja.',
      },
      {
        osa: 'Union Jack kulmassa',
        selite: 'saaret ovat Britannian merentakainen alue.',
      },
      {
        osa: 'Pässi',
        selite: 'lampaankasvatus, saarten pitkäaikainen '
          + 'pääelinkeino.',
      },
      {
        osa: 'Purjelaiva',
        selite: 'Desire, jonka kapteenin John Davisin kerrotaan '
          + 'nähneen saaret 1592.',
      },
      {
        osa: 'Tunnuslause',
        selite: 'Desire the Right — sanaleikki laivan nimestä: '
          + '"tavoittele oikeaa".',
      },
    ],
    kappaleet: [
      'Saarilla oli oma lippu jo 1876. Sen sinetissä purjehti '
        + 'HMS Hebe, joka oli tuonut varhaisia brittiasukkaita '
        + '1840-luvulla, ja rannalla seisoi sonni villiintyneiden '
        + 'karjalaumojen muistoksi. Nykyinen vaakuna vahvistettiin '
        + '1948, ja se korvasi lipussa vanhan sinetin.',
      'Argentiinan miehityksen aikana 2. huhtikuuta – 14. '
        + 'kesäkuuta 1982 lippu oli kielletty ja tilalla liehui '
        + 'Argentiinan lippu. Sodan päätteeksi kuvernöörin lippu '
        + 'nostettiin takaisin Stanleyn kuvernöörintalon '
        + 'salkoon. Nykyinen asu on vuodelta 1999: valkoinen '
        + 'kiekko vaakunan takaa poistettiin ja vaakunaa '
        + 'suurennettiin.',
      'Saarten hallinta on kiistanalainen. Britannia on '
        + 'hallinnut niitä vuodesta 1833, ja Argentiina pitää '
        + 'saaria — Islas Malvinas — omanaan. Yhdistyneet '
        + 'kansakunnat merkitsi saaret itsehallintoa vailla '
        + 'olevien alueiden luetteloon 1946.',
    ],
    tunnukset: [
      {
        nimi: 'Falklandinsaarten vaakuna',
        polku: 'assets/liput/tunnukset/flk-vaakuna.png',
        selite: 'Sinisellä kentällä seisoo pässi tussokkiheinän '
          + 'päällä; alla aaltoilevalla merellä purjehtii '
          + 'Desire. Heinä on saarten tunnusomaista kasvillisuutta '
          + 'ja pässi lampaankasvatuksen tunnus. Vaakuna '
          + 'myönnettiin kuninkaallisella määräyksellä 29. '
          + 'syyskuuta 1948.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  // Erä 10: Afrikan laudan pohjoinen ja läntinen puolisko
  // (lisenssit tarkistettu Commonsin API:sta 27.8.2026, tunnukset ja
  // versioliput katsottu silmin). Tunisian, Senegalin, Sierra Leonen,
  // Nigerian ja Tšadin vaakunat ovat CC BY / CC BY-SA -piirroksia ja
  // tekijät on nimetty lähderivillä; Libyan tunnus on CC0 ja loput
  // PD. Egypti tehtiin jo erässä 6.
  'Flag of Morocco.svg': {
    maa: 'Marokko',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'alauiittien hallitsijasuvun väri. Sama punainen '
          + 'liehui Mekan šarifien lipuissa.',
      },
      {
        osa: 'Vihreä viisikanta',
        selite: 'Salomon sinetiksi kutsuttu viisisakarainen tähti. '
          + 'Sakarat on totuttu lukemaan islamin viideksi pilariksi.',
      },
      {
        osa: 'Avoin tähti',
        selite: 'tähti piirretään viidestä yhtenäisestä oksasta ja '
          + 'kudotaan samaan kankaaseen, jotta se näkyy lipun '
          + 'molemmilta puolilta.',
      },
    ],
    kappaleet: [
      'Marokon lipussa oli 1600-luvulta lähtien pelkkä punainen '
        + 'kangas — myös isoisän matkavuonna 1873. Vihreä tähti '
        + 'lisättiin vasta 17. marraskuuta 1915, kun sulttaani Yusef '
        + 'allekirjoitti asiakirjan, jossa syyksi kerrottiin '
        + 'suoraan, että vanha lippu muistutti liikaa muiden '
        + 'valtakuntien merimerkkejä.',
      'Ranskan ja Espanjan protektoraattien aikana lippu sai liehua '
        + 'vain maalla; merellä sen käyttö oli kielletty. Vasta '
        + 'itsenäistymisen jälkeen 1956 se hyväksyttiin myös '
        + 'kauppalaivaston lipuksi.',
      'Perustuslaki mitoittaa lipun tarkasti: korkeus on kaksi '
        + 'kolmasosaa pituudesta, tähti mahtuu ympyrään, jonka säde '
        + 'on kuudesosa lipun pituudesta, ja kunkin sakaran haaran '
        + 'leveys on kahdeskymmenesosa sen pituudesta. Yksi '
        + 'sakaroista osoittaa ylöspäin.',
    ],
    versiot: [
      {
        nimi: 'Alauiittien punainen lippu',
        polku: 'assets/liput/versiot/mar-1666.png',
        selite: 'Pelkkä punainen kangas ilman kuviota — Marokon '
          + 'lippu 1600-luvulta vuoteen 1915. Tämä liehui '
          + 'Tangerissa ja Marrakechissa silloin, kun isoisä '
          + 'kirjoitti päiväkirjaansa.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Marokon vaakuna',
        polku: 'assets/liput/tunnukset/mar-vaakuna.png',
        selite: 'Punaisella kilvellä on lipun vihreä viisikanta, sen '
          + 'takana vuorijono ja ylinnä sinisellä taivaalla säteilevä '
          + 'aurinko; vuoret on totuttu lukemaan Atlasvuoriksi. '
          + 'Kilpeä kannattavat kaksi leijonaa, ylinnä on '
          + 'kuninkaallinen kruunu ja nauhassa Koraanin jae: "Jos te '
          + 'autatte Jumalaa, Hän auttaa teitä." Vaakuna otettiin '
          + 'käyttöön 14. elokuuta 1957.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Algeria.svg': {
    maa: 'Algeria',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'islamin väri. Sama vihreä liehui 1800-luvun '
          + 'vastarinnan johtajan Abd el-Kaderin joukoissa.',
      },
      { osa: 'Valkoinen', selite: 'puhtaus ja rauha.' },
      {
        osa: 'Punainen puolikuu ja tähti',
        selite: 'islamin tunnus. Tähden viisi sakaraa luetaan joko '
          + 'islamin viideksi pilariksi tai viideksi päivittäiseksi '
          + 'rukoukseksi.',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin 3. heinäkuuta 1962, päiviä ennen kuin '
        + 'Algeria itsenäistyi Ranskasta. Sama kuvio oli ollut '
        + 'maanpaossa toimineen väliaikaishallituksen lippuna jo '
        + 'vuodesta 1958.',
      'Isoisän matkavuonna 1873 omaa lippua ei ollut: Ranska oli '
        + 'hallinnut maata vuoden 1830 valloituksesta lähtien. Sitä '
        + 'ennen Algerin deyn palatsin yllä liehui suuri yksivärinen '
        + 'punainen lippu, jossa ei ollut lainkaan tunnuksia — '
        + 'tarkoituksellinen ero Osmanien puolikuulippuihin.',
      'Väreistä on annettu poikkeuksellisen tarkka ohje. Vihreän on '
        + 'oltava yhtä suuret osat keltaista ja sinistä, punaisen '
        + 'puhdasta perusväriä ilman sinistä tai keltaista, ja '
        + 'kummallekin on merkitty oma aallonpituutensa.',
    ],
    tunnukset: [
      {
        nimi: 'Algerian valtiontunnus',
        polku: 'assets/liput/tunnukset/dza-vaakuna.png',
        selite: 'Pyöreä sinetti, joka esittää kokonaisen maan: '
          + 'keskellä on Fatiman käsi, sen takana vuoret ja nouseva '
          + 'aurinko eli uusi aika, sivuilla tehtaanpiippuja ja '
          + 'viljantähkiä teollisuuden ja maatalouden merkkinä, '
          + 'alinna lipun puolikuu ja tähti. Kehällä lukee arabiaksi '
          + 'maan koko nimi, Algerian demokraattinen kansantasavalta. '
          + 'Tämä arabiankielinen asu vahvistettiin 1. marraskuuta '
          + '1976; sitä ennen sama teksti oli ranskaksi.',
      },
    ],
    lahde: 'Liput ja tunnus: Wikimedia Commons (PD)',
  },
  'Flag of Tunisia.svg': {
    maa: 'Tunisia',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'Välimeren eteläranta purjehti punaisin merilipuin. '
          + 'Väri on luettu myös kaatuneiden vereksi.',
      },
      {
        osa: 'Valkoinen kiekko',
        selite: 'kansakunnan loiste, aurinko.',
      },
      {
        osa: 'Puolikuu ja viisisakarainen tähti',
        selite: 'islamin tunnukset. Tähden sakarat luetaan islamin '
          + 'viideksi pilariksi.',
      },
    ],
    kappaleet: [
      'Lippu syntyi meritappiosta. Kun Tunisian laivasto-osasto '
        + 'tuhoutui Navarinon taistelussa 20. lokakuuta 1827, bey '
        + 'Hussein II päätti antaa laivastolleen oman tunnuksen: '
        + 'pelkkä punainen lippu oli liian moneen kertaan käytetty. '
        + 'Hallituksen mukaan lippu vahvistettiin 1831 — isoisän '
        + 'matkavuonna 1873 se siis liehui jo tällaisena.',
      'Ranskan protektoraatin aikana lippua ei vaihdettu. '
        + 'Epävirallisesti käytettiin jonkin aikaa versiota, jonka '
        + 'yläkulmaan oli lisätty Ranskan trikolori; 1925 sitä '
        + 'esitettiin viralliseksi, mutta ehdotus jäi käsittelemättä.',
      'Tasavallan lipuksi se julistettiin perustuslaissa 1. '
        + 'kesäkuuta 1959, ja 30. kesäkuuta 1999 laki määritteli '
        + 'mitat ensi kertaa tarkasti: valkoisen kiekon halkaisija on '
        + 'kolmasosa lipun pituudesta. Tunisian Punaisen Puolikuun '
        + 'tunnus on maailman ainoa, jonka puolikuu avautuu '
        + 'vasempaan — muuten se sekoittuisi armeijan '
        + 'tunnusmerkkiin.',
    ],
    tunnukset: [
      {
        nimi: 'Tunisian vaakuna',
        polku: 'assets/liput/tunnukset/tun-vaakuna.png',
        selite: 'Kilven yläosassa purjehtii karthagolainen kaleeri '
          + 'vapauden merkkinä. Alaosa on jaettu kahtia: vasemmalla '
          + 'musta vaaka on oikeus, oikealla musta leijona käyrine '
          + 'miekkoineen järjestys. Nauhassa lukee arabiaksi maan '
          + 'tunnuslause "vapaus, järjestys, oikeus", ja ylinnä on '
          + 'valkoinen kiekko lipun puolikuineen ja tähtineen. '
          + 'Nykyinen järjestys palautettiin lailla 2. syyskuuta '
          + '1989.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: FXXX / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Libya.svg': {
    maa: 'Libya',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'Fezzanin maakunnan väri; luetaan myös vapauden '
          + 'puolesta vuodatetuksi vereksi.',
      },
      {
        osa: 'Musta',
        selite: 'Kyrenaikan ja Senussi-suvun väri. Sitä on luettu '
          + 'myös Italian siirtomaavallan pimeiksi vuosiksi.',
      },
      {
        osa: 'Vihreä',
        selite: 'Tripolitania ja maatalous — Libya oli aikanaan '
          + 'Osmanien valtakunnan viljavarasto.',
      },
      {
        osa: 'Valkoinen puolikuu ja tähti',
        selite: 'Senussi-lipusta. Puolikuu on kuukauden alku '
          + 'islamilaisessa kalenterissa ja tähti toivo.',
      },
    ],
    kappaleet: [
      'Lipun suunnitteli Omar Faiek Shennib ja sen hyväksyi kuningas '
        + 'Idris. Se otettiin käyttöön Libyan kuningaskunnan '
        + 'syntyessä ja vahvistettiin virallisesti 24. joulukuuta '
        + '1951. Musta raita on pinta-alaltaan yhtä suuri kuin '
        + 'punainen ja vihreä yhteensä.',
      'Kuningaskunnan kaaduttua 1969 lippu vaihtui kaksi kertaa. '
        + 'Vuosina 1977–2011 Libyalla oli pelkkä vihreä kangas: '
        + 'maailman ainoa yksivärinen ja kuvioton valtiolippu — '
        + 'lukuun ottamatta lyhyttä jaksoa 1996–1997, jolloin '
        + 'Afganistanin lippu oli valkoinen.',
      'Vanha lippu palasi kansannousussa 2011. Kansallinen '
        + 'siirtymäneuvosto otti sen tunnuksekseen 3. elokuuta 2011, '
        + 'ja Yhdistyneet kansakunnat kirjasi muutoksen: sitä '
        + 'käyttävät nyt kaikki Libyan edustustot.',
    ],
    versiot: [
      {
        nimi: 'Jamahirijan vihreä lippu 1977–2011',
        polku: 'assets/liput/versiot/lby-jamahiriya.png',
        selite: 'Pelkkää vihreää kangasta ilman tunnuksia. '
          + 'Kolmenkymmenenneljän vuoden ajan maailman ainoa '
          + 'yksivärinen valtiolippu.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Libyan tunnus',
        polku: 'assets/liput/tunnukset/lby-vaakuna.png',
        selite: 'Libyalla ei ole vuoden 2011 jälkeen virallisesti '
          + 'vahvistettua vaakunaa: perustuslaillinen julistus '
          + 'määrittelee lipun mutta vaikenee vaakunasta. '
          + 'Käytännön tunnukseksi on vakiintunut puolikuu ja tähti, '
          + 'joka on vuoden 2013 passin kannessa ja hallitusten '
          + 'sineteissä. Kuningaskunnan aikana tunnus oli hopeinen '
          + 'puolikuu ja tähti kruunun alla, Gaddafin aikana Saladinin '
          + 'kotka ja sittemmin Quraishin haukka.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Tunnus: Wikimedia '
      + 'Commons (CC0)',
  },
  'Flag of Mali.svg': {
    maa: 'Mali',
    symboliikka: [
      { osa: 'Vihreä', selite: 'maan viljavuus.' },
      {
        osa: 'Kulta',
        selite: 'puhtaus ja maaperän mineraalirikkaus.',
      },
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta vuodatettu veri.',
      },
      {
        osa: 'Pystyraidat',
        selite: 'malli on Ranskan trikolorista, värit '
          + 'panafrikkalaiset.',
      },
    ],
    kappaleet: [
      'Nykyinen lippu vahvistettiin 1. maaliskuuta 1961. Ensimmäinen, '
        + '4. huhtikuuta 1959 hyväksytty lippu oli muuten sama, mutta '
        + 'keltaisen raidan keskellä oli musta kanaga: tyylitelty '
        + 'ihmishahmo kädet kohti taivasta.',
      'Hahmo poistettiin, koska ihmisen kuvaaminen herätti '
        + 'vastustusta maassa, jonka väestöstä valtaosa on '
        + 'muslimeja. Jäljelle jäi pelkkä kolmiraita.',
      'Mali ja Senegal muodostivat yhdessä Malin federaation, joka '
        + 'itsenäistyi 20. kesäkuuta 1960 ja hajosi kahdessa '
        + 'kuukaudessa. Molemmat pitivät federaation värit: Senegal '
        + 'vaihtoi kanagan vihreään tähteen, Mali jätti raidan '
        + 'tyhjäksi. Malin lippu on Guinean lipun peilikuva.',
    ],
    versiot: [
      {
        nimi: 'Malin federaation lippu 1959–1961',
        polku: 'assets/liput/versiot/mli-1959.png',
        selite: 'Sama kolmiraita, mutta keskellä musta kanaga-hahmo. '
          + 'Federaation, ja sen hajottua hetken myös Malin, lippu.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Malin sinetti',
        polku: 'assets/liput/tunnukset/mli-vaakuna.png',
        selite: 'Malilla ei ole koskaan ollut vaakunaa vaan sinetti, '
          + 'joka on ollut nykyisessä asussaan 20. lokakuuta 1973 '
          + 'lähtien. Vaaleansinisellä kentällä on Djennén suuri '
          + 'savimoskeija, sen yllä lintu — vuoden 1973 asetus kutsuu '
          + 'sitä kansantarujen korppikotkaksi, toiset lukevat sen '
          + 'rauhan kyyhkyksi. Moskeijan kummallakin puolella on '
          + 'jousi ja nuoli, alla nouseva aurinko. Kehällä lukee '
          + 'maan nimi ja tunnuslause "yksi kansa, yksi päämäärä, '
          + 'yksi usko" — sama kuin Senegalilla.',
      },
    ],
    lahde: 'Liput ja sinetti: Wikimedia Commons (PD)',
  },
  'Flag of Senegal.svg': {
    maa: 'Senegal',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'islamin väri, kristityille toivo ja perinteisissä '
          + 'uskonnoissa hedelmällisyys.',
      },
      {
        osa: 'Keltainen',
        selite: 'vaurauden ja työn väri; hallitus lukee sen myös '
          + 'taiteiden ja kirjallisuuden väriksi.',
      },
      {
        osa: 'Punainen',
        selite: 'veri ja elämä, uhri ja päättäväisyys.',
      },
      {
        osa: 'Vihreä tähti',
        selite: 'luetaan sekä islamin tunnukseksi että serereiden '
          + 'Yoonir-tähdeksi, joka merkitsee onnea ja kohtaloa.',
      },
    ],
    kappaleet: [
      'Siirtomaa-aikana Senegalilla ei saanut olla omaa lippua: '
        + 'ranskalaiset pelkäsivät sen ruokkivan itsenäisyysmielialaa. '
        + 'Ensimmäinen oma lippu tuli vasta 4. huhtikuuta 1959, kun '
        + 'Senegal ja Ranskan Sudan muodostivat Malin federaation.',
      'Federaation lipussa oli keltaisen raidan keskellä '
        + 'kanaga-hahmo. Kun Senegal erosi federaatiosta 20. '
        + 'elokuuta 1960, hahmon tilalle tuli vihreä tähti — muuten '
        + 'lippu jäi ennalleen.',
      'Väreillä on myös puoluehistoria: vihreä, keltainen ja '
        + 'punainen olivat kolmen puolueen tunnusvärit, ja puolueet '
        + 'sulautuivat presidentti Léopold Sédar Senghorin '
        + 'puolueeksi. Samat värit ovat panafrikkalaiset ja '
        + 'yhteiset Malin, Guinean ja Kamerunin kanssa.',
    ],
    tunnukset: [
      {
        nimi: 'Senegalin vaakuna',
        polku: 'assets/liput/tunnukset/sen-vaakuna.png',
        selite: 'Kilpi on jaettu kahtia: punaisella kentällä '
          + 'kultainen leijona, kultaisella kentällä baobab ja sen '
          + 'alla vihreä aaltoviiva eli Senegal-joki. Ylinnä on lipun '
          + 'vihreä tähti, ympärillä palmunlehvät ja nauha, jossa '
          + 'lukee "Un peuple, un but, une foi" — yksi kansa, yksi '
          + 'päämäärä, yksi usko. Alla riippuu Leijonan kansallisen '
          + 'ritarikunnan tähti. Vaakunan piirsi pariisilainen '
          + 'heraldikko Suzanne Gauthier 1965.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Xavigivax / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Sierra Leone.svg': {
    maa: 'Sierra Leone',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'maatalous ja maan vuoret.',
      },
      { osa: 'Valkoinen', selite: 'yhtenäisyys ja oikeus.' },
      {
        osa: 'Sininen',
        selite: 'Freetownin luonnonsatama ja toive saada olla mukana '
          + 'maailmanrauhan rakentamisessa.',
      },
    ],
    kappaleet: [
      'Lippu nostettiin ensi kerran keskiyöllä 27. huhtikuuta 1961, '
        + 'itsenäistymispäivänä. Se korvasi brittiläisen sinisen '
        + 'kauppalipun, jonka liepeessä oli siirtomaan tunnus.',
      'Järjestys oli poikkeuksellinen: Lontoon College of Arms '
        + 'suunnitteli ensin vaakunan, ja vasta sen väreistä — '
        + 'vihreä, valkoinen ja sininen — koottiin lippu. Yleensä se '
        + 'menee toisin päin.',
      'Lippu on maailman merillä tuttu myös mukavuuslippuna: '
        + 'ulkomaiset rahtialukset ovat purjehtineet sen alla, ja '
        + 'hallitus on 2010-luvulta lähtien karsinut rekisteriä ja '
        + 'tiukentanut ehtoja väärinkäytösten takia.',
    ],
    tunnukset: [
      {
        nimi: 'Sierra Leonen vaakuna',
        polku: 'assets/liput/tunnukset/sle-vaakuna.png',
        selite: 'Vihreällä kilvellä astelee kultainen leijona. '
          + 'Yläreunan sahalaita on Leijonavuoret, joista maa on '
          + 'saanut nimensä, kolme soihtua ovat rauha ja arvokkuus '
          + 'ja alareunan siniset aallot meri. Kilpeä kannattavat '
          + 'kaksi leijonaa palmuineen. Nauhassa lukee UNITY, '
          + 'FREEDOM, JUSTICE. Vaakuna myönnettiin 1960, vuotta '
          + 'ennen itsenäisyyttä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Yuma ym. / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Liberia.svg': {
    maa: 'Liberia',
    symboliikka: [
      {
        osa: 'Yksitoista raitaa',
        selite: 'itsenäisyysjulistuksen yksitoista allekirjoittajaa.',
      },
      {
        osa: 'Punainen ja valkoinen',
        selite: 'rohkeus ja moraalinen ryhti.',
      },
      { osa: 'Sininen neliö', selite: 'Afrikan manner.' },
      {
        osa: 'Valkoinen tähti',
        selite: 'Afrikan ensimmäinen itsenäinen tasavalta. Lipun '
          + 'lempinimi on Lone Star, yksinäinen tähti.',
      },
    ],
    kappaleet: [
      'Lippu hyväksyttiin 24. elokuuta 1847, kuukausi '
        + 'itsenäisyysjulistuksen jälkeen. Se muistuttaa Yhdysvaltain '
        + 'lippua, koska Liberian perustivat Yhdysvalloista ja '
        + 'Karibialta muuttaneet vapaat mustat ja vapautetut orjat.',
      'Lipun suunnitteli ja ompeli seitsemän naisen ryhmä, jota '
        + 'johti Susannah Elizabeth Lewis; kaikki olivat syntyneet '
        + 'Yhdysvalloissa. Se paljastettiin yleisölle Monroviassa '
        + 'hyväksymispäivänä, ja vuodesta 1915 lähtien 24. elokuuta '
        + 'on ollut lipunpäivä.',
      'Isoisän matkavuonna 1873 lippu oli jo neljännesvuosisadan '
        + 'vanha. Nykyään se liehuu tuhansissa ulkomaisten '
        + 'varustamojen aluksissa: Liberian alusrekisteri on Panaman '
        + 'jälkeen maailman suosituin mukavuuslippu ja tuo maalle '
        + 'suuren osan sen tuloista.',
    ],
    tunnukset: [
      {
        nimi: 'Liberian vaakuna',
        polku: 'assets/liput/tunnukset/lbr-vaakuna.png',
        selite: 'Kilvessä 1800-luvun purjelaiva saapuu rannalle: se '
          + 'on laiva, joka toi tulijat Yhdysvalloista. Aura ja '
          + 'lapio ovat työn arvo, nouseva aurinko kansakunnan '
          + 'synty, palmu vauraus ja valkoinen kyyhky kirjekäärö '
          + 'kynsissään rauhan sanoma. Ylänauhassa lukee "The Love '
          + 'of Liberty Brought Us Here" — rakkaus vapauteen toi '
          + 'meidät tänne. Vuonna 1974 asetettu komissio esitti '
          + 'tunnuslauseen vaihtamista, koska se jättää maan '
          + 'alkuperäisväestön ulkopuolelle; muutosta ei tehty.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Ghana.svg': {
    maa: 'Ghana',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'siirtomaavallan vastaisessa taistelussa kaatuneiden '
          + 'veri.',
      },
      {
        osa: 'Kulta',
        selite: 'maan kultavarat. Siirtomaan nimikin oli '
          + 'Kultarannikko.',
      },
      {
        osa: 'Vihreä',
        selite: 'metsät ja muu luonnonvarallisuus.',
      },
      {
        osa: 'Musta tähti',
        selite: 'Afrikan vapautumisen tähti. Se on peräisin Marcus '
          + 'Garveyn Black Star Line -varustamon lipusta.',
      },
    ],
    kappaleet: [
      'Lipun suunnitteli taiteilija ja opettaja Theodosia Okoh, ja '
        + 'se nostettiin itsenäistymispäivänä 6. maaliskuuta 1957. '
        + 'Ghana oli Etiopian jälkeen toinen Afrikan maa, joka otti '
        + 'punakultavihreät panafrikkalaiset värit — Etiopiaan '
        + 'nähden käänteisessä järjestyksessä.',
      'Vuosina 1964–1966 keltainen raita oli valkoinen: värit '
        + 'vaihdettiin Kwame Nkrumahin puolueen väreiksi, jolloin '
        + 'lipusta tuli Unkarin lipun kaltainen. Kun Nkrumah '
        + 'kukistettiin vallankaappauksessa helmikuussa 1966, '
        + 'alkuperäinen lippu palautettiin.',
      'Musta tähti on jäänyt kieleen: Ghanan jalkapallomaajoukkueen '
        + 'nimi on Black Stars. Ghanan lipun malli näkyy myös '
        + 'Guinea-Bissaun ja São Tomé ja Príncipen lipuissa.',
    ],
    versiot: [
      {
        nimi: 'Lippu 1964–1966',
        polku: 'assets/liput/versiot/gha-1964.png',
        selite: 'Keltainen raita vaihdettiin valkoiseen Kwame '
          + 'Nkrumahin puolueen väreiksi. Kansan vaatimuksesta '
          + 'alkuperäinen lippu palasi 1966.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Ghanan vaakuna',
        polku: 'assets/liput/tunnukset/gha-vaakuna.png',
        selite: 'Vihreä risti jakaa kilven neljään ruutuun: '
          + 'seremoniamiekka ja puhemiehen sauva ovat perinteinen '
          + 'päällikkövalta, Osun linna meren äärellä valtio, '
          + 'kaakaopuu maatalous ja kultakaivos kaivannaiset. Ristin '
          + 'keskellä kultainen leijona muistuttaa siteestä '
          + 'Kansainyhteisöön, ylinnä on Afrikan musta tähti ja '
          + 'kilpeä kannattavat kaksi kotkaa. Nauhassa lukee FREEDOM '
          + 'AND JUSTICE. Vaakunan piirsi Nii Amon Kotei, ja se '
          + 'otettiin käyttöön 4. maaliskuuta 1957.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Nigeria.svg': {
    maa: 'Nigeria',
    symboliikka: [
      { osa: 'Vihreä', selite: 'maatalous ja maan metsät.' },
      { osa: 'Valkoinen', selite: 'rauha ja yhtenäisyys.' },
      {
        osa: 'Kolme yhtä leveää raitaa',
        selite: 'lippu on pystysuora kaksivärinen: vihreä, valkoinen '
          + 'ja vihreä.',
      },
    ],
    kappaleet: [
      'Lipun suunnitteli opiskelija Michael Taiwo Akinkunmi '
        + 'kilpailuun, johon tuli lähes kolmetuhatta ehdotusta. '
        + 'Voittajatyössä oli valkoisen raidan päällä punainen '
        + 'puoliaurinko kuusitoista sädettä; komitea poisti '
        + 'auringon, ja jäljelle jäi kolme raitaa.',
      'Lippu nostettiin ensi kerran keskiyöllä 1. lokakuuta 1960, '
        + 'itsenäistymispäivänä. Nostajana oli luutnantti David '
        + 'Ejoor.',
      'Isoisän matkavuonna 1873 aluetta ei ollut vielä koottu '
        + 'yhdeksi. Etelä- ja Pohjois-Nigerian protektoraatit '
        + 'yhdistettiin vasta 1914, ja silloin lordi Lugard '
        + 'suunnitteli niille sinisen lipun, jossa oli Union Jack ja '
        + 'liepeessä punainen kiekko kruunuineen.',
    ],
    tunnukset: [
      {
        nimi: 'Nigerian vaakuna',
        polku: 'assets/liput/tunnukset/nga-vaakuna.png',
        selite: 'Mustalla kilvellä on valkoinen Y-kirjaimen '
          + 'muotoinen aaltoviiva: Nigerin ja Benuen yhtyminen '
          + 'Lokojassa. Musta kilpi on maan viljava maaperä, kilpeä '
          + 'kannattavat kaksi valkoista hevosta arvokkuutta ja '
          + 'ylinnä kotka voimaa. Jalustan punaiset kukat ovat '
          + 'Costus spectabilis, maan kansalliskukka. Nauhassa lukee '
          + 'vuoden 1978 tunnuslause "Unity and Faith, Peace and '
          + 'Progress", joka korvasi aiemman "Peace, Unity, '
          + 'Freedom".',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Lumia1234 / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Chad.svg': {
    maa: 'Tšad',
    symboliikka: [
      {
        osa: 'Indigonsininen',
        selite: 'Tšad-järvi ja taivas.',
      },
      { osa: 'Keltainen', selite: 'Saharan hiekka ja aurinko.' },
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta vuodatettu veri.',
      },
      {
        osa: 'Värit yhdessä',
        selite: 'yhdistelmä Ranskan trikoloria ja Etiopian lipun '
          + 'panafrikkalaisia värejä.',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin 6. marraskuuta 1959. Kesäkuussa 1959 '
        + 'lakikomissio oli ehdottanut vihreä-kelta-punaista, mutta '
        + 'vihreä vaihdettiin siniseen, jottei lippu menisi sekaisin '
        + 'Malin kanssa.',
      'Sekaannus tuli silti — toisaalta. Tšadin lippu on lähes '
        + 'identtinen Romanian lipun kanssa. Romania on käyttänyt '
        + 'trikoloriaan vuodesta 1866, mutta 1948–1989 sen keskellä '
        + 'oli vaakuna; kun vaakuna poistettiin, liput olivat '
        + 'käytännössä samat. Tšad pyysi 2004 Yhdistyneitä '
        + 'kansakuntia tutkimaan asiaa, ja Romanian presidentti Ion '
        + 'Iliescu vastasi, ettei trikolorista luovuta.',
      'Poliittisista mullistuksista huolimatta lippua ei ole '
        + 'muutettu kertaakaan itsenäistymisen jälkeen 1960. Yksi '
        + 'selitys on, ettei se kuulu millekään vallan osapuolelle.',
    ],
    tunnukset: [
      {
        nimi: 'Tšadin vaakuna',
        polku: 'assets/liput/tunnukset/tcd-vaakuna.png',
        selite: 'Kilven sinikeltainen siksak on Tšad-järven aallokko '
          + 'ja ylinnä nouseva aurinko uusi alku. Kilpeä kannattavat '
          + 'vuohi ja leijona: vuohi on maan pohjoinen puolisko, '
          + 'leijona eteläinen. Alla riippuu Tšadin kansallisen '
          + 'ritarikunnan tunnus ja nauhassa lukee Unité, Travail, '
          + 'Progrès — yhtenäisyys, työ, edistys. Vaakuna otettiin '
          + 'käyttöön 1970.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Milenioscuro / '
      + 'Wikimedia Commons (CC BY 3.0)',
  },
  'Flag of Cameroon.svg': {
    maa: 'Kamerun',
    symboliikka: [
      { osa: 'Vihreä', selite: 'etelän sademetsät.' },
      {
        osa: 'Punainen',
        selite: 'yhtenäisyys. Keskiraitaa kutsutaan yhtenäisyyden '
          + 'väriksi.',
      },
      {
        osa: 'Keltainen',
        selite: 'aurinko ja pohjoisen savannit.',
      },
      {
        osa: 'Keltainen tähti',
        selite: 'yhtenäisyyden tähti. Sen koko vaihtelee lipusta '
          + 'toiseen — ohje sanoo vain, että sen on mahduttava '
          + 'keskiraidalle.',
      },
    ],
    kappaleet: [
      'Kolmiraitainen lippu hyväksyttiin lailla 26. lokakuuta 1957 '
        + 'ja vahvistettiin uudelleen vuoden 1960 perustuslaissa. '
        + 'Kamerun oli Ghanan jälkeen toinen maa, joka otti '
        + 'panafrikkalaiset värit.',
      'Vuosina 1961–1975 vihreän raidan yläosassa oli kaksi '
        + 'kultaista tähteä. Ne olivat liittovaltion kaksi osaa, '
        + 'Itä- ja Länsi-Kamerun, jotka syntyivät kun brittiläinen '
        + 'Etelä-Kamerun liittyi Kamerunin tasavaltaan.',
      'Nykyinen asu — yksi tähti keskiraidalla — tuli 20. toukokuuta '
        + '1975, kun liittovaltiosta tehtiin yhtenäisvaltio. Samat '
        + 'kolme väriä ovat Senegalin, Guinean ja Malin lipuissa.',
    ],
    versiot: [
      {
        nimi: 'Liittovaltion lippu 1961–1975',
        polku: 'assets/liput/versiot/cmr-1961.png',
        selite: 'Kaksi kultaista tähteä vihreällä raidalla: '
          + 'Itä-Kamerun ja Länsi-Kamerun. Yhtenäisvaltion synnyttyä '
          + 'tähdistä tuli yksi.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Kamerunin vaakuna',
        polku: 'assets/liput/tunnukset/cmr-vaakuna.png',
        selite: 'Kilpi toistaa lipun värit, ja sen päällä on maan '
          + 'kartta. Kartan päälle on vuodesta 1984 piirretty '
          + 'oikeuden vaaka ja miekka, ylinnä on lipun tähti. Kilven '
          + 'takana ristissä kaksi liktorinkimppua, ja nauhoissa '
          + 'lukee maan nimi kummallakin virallisella kielellä sekä '
          + 'tunnuslause Paix – Travail – Patrie, rauha, työ, '
          + 'isänmaa.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of the Democratic Republic of the Congo.svg': {
    maa: 'Kongon demokraattinen tasavalta',
    symboliikka: [
      { osa: 'Taivaansininen', selite: 'rauha.' },
      {
        osa: 'Keltainen tähti',
        selite: 'maan tulevaisuus. Tähti on lipun vanhin osa.',
      },
      {
        osa: 'Punainen vinoraita',
        selite: 'maan marttyyrien veri.',
      },
      {
        osa: 'Keltainen reunus',
        selite: 'maan rikkaudet. Vinoraita on harvinaisuus: se on '
          + 'lipuista vain kourallisessa, muun muassa Tansanian ja '
          + 'Namibian lipussa.',
      },
    ],
    kappaleet: [
      'Nykyinen lippu otettiin käyttöön 18. helmikuuta 2006, kun '
        + 'uusi perustuslaki tuli voimaan. Se palautti vuosien '
        + '1966–1971 lipun mutta vaihtoi kuninkaansinisen '
        + 'taivaansiniseen.',
      'Sininen kenttä ja keltainen tähti ovat maan vanhin lippumerkki. '
        + 'Kuvio otettiin käyttöön 1877 Leopold II:n Kansainvälisen '
        + 'afrikkalaisen yhdistyksen lippuna, siitä tuli Kongon '
        + 'vapaavaltion lippu ja se jatkoi Belgian Kongon lippuna '
        + 'vuoteen 1960. Itsenäistyneen maan lipussa oli 1960–1963 '
        + 'lisäksi kuusi pientä tähteä, yksi kutakin maakuntaa kohti.',
      'Vuosina 1971–1997 maa oli Zaire ja lippu vaaleanvihreä: '
        + 'keltaisessa kiekossa käsi kohotti palavaa soihtua. Sama '
        + 'lippu oli Mobutu Sese Sekon puolueen lippu, ja se katosi '
        + 'Mobutun kaaduttua.',
    ],
    versiot: [
      {
        nimi: 'Kongon vapaavaltion lippu 1877–1960',
        polku: 'assets/liput/versiot/cod-vapaavaltio.png',
        selite: 'Sininen kangas ja keltainen tähti. Ensin Leopold '
          + 'II:n yhdistyksen, sitten vapaavaltion ja lopulta '
          + 'Belgian Kongon lippu.',
      },
      {
        nimi: 'Zairen lippu 1971–1997',
        polku: 'assets/liput/versiot/cod-zaire.png',
        selite: 'Vaaleanvihreällä kentällä keltainen kiekko, jossa '
          + 'käsi kohottaa palavaa soihtua. Sama kuvio oli Mobutun '
          + 'puolueen tunnus.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Kongon tunnus',
        polku: 'assets/liput/tunnukset/cod-vaakuna.png',
        selite: 'Keskellä on leopardin pää, vasemmalla norsunluu ja '
          + 'oikealla keihäs; nauhoissa lukee Justice, Paix, Travail '
          + '— oikeus, rauha, työ. Leopardi oli tunnuksessa jo '
          + 'Zairen aikana. Nykyinen asu vahvistettiin lipun kanssa '
          + 'samana päivänä 18. helmikuuta 2006.',
      },
    ],
    lahde: 'Liput ja tunnus: Wikimedia Commons (PD)',
  },
  // Erä 11: Afrikan laudan itäinen puolisko (lisenssit tarkistettu
  // Commonsin API:sta 27.8.2026, tunnukset ja versioliput katsottu
  // silmin). Etelä-Afrikan, Tansanian, Kenian ja Ugandan vaakunat
  // sekä Ugandan protektoraatin lippu ovat CC BY-SA -piirroksia ja
  // tekijät on nimetty lähderivillä; Mosambikin tunnus on CC0 ja
  // loput PD.
  'Flag of Angola.svg': {
    maa: 'Angola',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'siirtomaa-aikana ja vapaussodassa vuodatettu veri. '
          + 'Nykyinen perustuslaki lisää siihen maan puolustamisen.',
      },
      { osa: 'Musta', selite: 'Afrikka.' },
      {
        osa: 'Viidakkoveitsi ja puolikas hammasratas',
        selite: 'veitsi on maanviljelijät ja vapaussota, ratas '
          + 'työläiset ja teollisuus. Keltainen väri on maan '
          + 'rikkaus.',
      },
      {
        osa: 'Viisisakarainen tähti',
        selite: 'kansainvälinen solidaarisuus ja edistys.',
      },
    ],
    kappaleet: [
      'Lippu nousi salkoon keskiyöllä 11. marraskuuta 1975, kun MPLA '
        + 'julisti Angolan itsenäiseksi. Portugalin lippu oli '
        + 'laskettu Luandassa edellisenä keskipäivänä. Kuvio on '
        + 'MPLA:n puoluelipusta; suunnittelijaksi mainitaan Henrique '
        + 'de Carvalho Santos, ja ensimmäisen kappaleen ompelivat '
        + 'kaksi puoluetoveria.',
      'Isoisän matkavuonna 1873 Angolan yllä liehui Portugalin '
        + 'lippu. Portugalilaisilla oli oma vaakunansa siirtomaalle '
        + 'vuodesta 1935: kilven toisella puolella Portugalin '
        + 'tunnukset, toisella kultainen norsu ja seepra.',
      'Sisällissodan päätyttyä 2002 lippua yritettiin vaihtaa. '
        + 'Vuonna 2003 järjestetyn kilpailun voitti nimimerkki '
        + 'Catica: sinivalkopunainen lippu, jonka keltainen aurinko '
        + 'oli piirretty Tchitundu-Hulun kalliomaalausten mukaan. '
        + 'Ehdotus kaatui julkiseen erimielisyyteen — moni ei '
        + 'halunnut luopua itsenäisyyteen liittyvistä merkeistä.',
    ],
    tunnukset: [
      {
        nimi: 'Angolan tunnus',
        polku: 'assets/liput/tunnukset/ago-vaakuna.png',
        selite: 'Keskellä on viidakkoveitsi ja kuokka nousevan '
          + 'auringon edessä, ylinnä tähti ja alinna avoin kirja eli '
          + 'koulutus. Kehän oikean puolen muodostaa hammasratas '
          + '(teollisuustyö) ja vasemman maissin, kahvin ja puuvillan '
          + 'seppele (maatalous). Nauhassa lukee República de Angola; '
          + 'teksti muutettiin 1990, kun maa lakkasi olemasta '
          + 'kansantasavalta.',
      },
    ],
    lahde: 'Liput ja tunnus: Wikimedia Commons (PD)',
  },
  'Flag of Namibia.svg': {
    maa: 'Namibia',
    symboliikka: [
      {
        osa: 'Sininen',
        selite: 'Namibian taivas, Atlantti ja maan kallisarvoiset '
          + 'vesivarat.',
      },
      {
        osa: 'Punainen vinoraita',
        selite: 'maan tärkein voimavara eli sen ihmiset: heidän '
          + 'sankaruutensa ja päättäväisyytensä.',
      },
      {
        osa: 'Valkoiset reunat',
        selite: 'rauha, yhtenäisyys ja sopu.',
      },
      { osa: 'Vihreä', selite: 'kasvillisuus ja maatalous.' },
      {
        osa: 'Kultainen aurinko',
        selite: 'elämä ja energia, kulta maan vauraus. Kaksitoista '
          + 'sädettä on luettu maan kahdeksitoista väestöryhmäksi.',
      },
    ],
    kappaleet: [
      'Lippu vahvistettiin yksimielisesti 2. helmikuuta 1990 ja '
        + 'nostettiin salkoon itsenäistymispäivänä 21. maaliskuuta '
        + '1990. Kilpailuun tuli 870 ehdotusta. Kuusi karsittiin '
        + 'kolmeen, ja lopullinen lippu koottiin yhdistämällä nämä '
        + 'kolme: Theo Jankowskin, Don Stevensonin ja Ortrud Clayn '
        + 'työt.',
      'Suunnittelijasta on silti kiistelty. Eteläafrikkalainen '
        + 'valtionheraldikko Frederick Brownell — sama mies, joka '
        + 'piirsi Etelä-Afrikan nykyisen lipun — ilmoitti tehneensä '
        + 'sen virkatyönään, ja brittiläinen Roy Allen kertoi '
        + 'voittaneensa erään sanomalehden järjestämän kilpailun.',
      'Ennen itsenäisyyttä alueella liehui Etelä-Afrikan oranssi, '
        + 'valkoinen ja sininen lippu. Isoisän matkavuonna 1873 '
        + 'siirtomaata ei vielä ollut: Saksa julisti Lounais-Afrikan '
        + 'suojelusalueekseen vasta 1884. Vinoraita on lipuissa '
        + 'harvinainen — muita ovat muun muassa Kongon demokraattinen '
        + 'tasavalta, Tansania ja Trinidad ja Tobago.',
    ],
    tunnukset: [
      {
        nimi: 'Namibian vaakuna',
        polku: 'assets/liput/tunnukset/nam-vaakuna.png',
        selite: 'Kilpi on suoraan lipusta. Ylinnä on perinteisen '
          + 'pääpannan päällä kalasääksi, kannattajina kaksi '
          + 'gemsbokkia eli sapelisarviantilooppia ja jalustana '
          + 'Namibin dyyni, jossa kasvaa welwitschia — '
          + 'aavikkokasvi, joka voi elää yli tuhat vuotta. Nauhassa '
          + 'lukee Unity Liberty Justice, yhtenäisyys, vapaus, '
          + 'oikeus. Vaakuna piirrettiin lipun pohjalta 1990.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of South Africa.svg': {
    maa: 'Etelä-Afrikka',
    symboliikka: [
      {
        osa: 'Vihreä Y-kuvio',
        selite: 'lipun ainoa virallisesti selitetty osa: '
          + 'yhteiskunnan erilaisten ainesten yhtyminen ja yhteinen '
          + 'tie eteenpäin.',
      },
      {
        osa: 'Musta, kulta ja vihreä',
        selite: 'Afrikan kansalliskongressin lipun värit. Kulta on '
          + 'luettu myös maan mineraalirikkaudeksi.',
      },
      {
        osa: 'Chilinpunainen, valkoinen ja sininen',
        selite: 'Alankomaiden ja Britannian lippujen sekä vanhan '
          + 'eteläafrikkalaisen lipun värit.',
      },
      {
        osa: 'Värit yleensä',
        selite: 'hallitus muistuttaa, ettei yksittäisille väreille '
          + 'pidä antaa yleispätevää merkitystä — lippu on tiivistys '
          + 'maan lippuhistoriasta.',
      },
    ],
    kappaleet: [
      'Lippu liehui ensi kerran 27. huhtikuuta 1994, maan '
        + 'ensimmäisten kaikille avointen vaalien päivänä. Se syntyi '
        + 'kiireessä: yleiseen kilpailuun oli tullut yli 7 000 '
        + 'ehdotusta, joista yksikään ei kelvannut, ja lopullinen '
        + 'kuvio — valtionheraldikko Fred Brownellin työ — '
        + 'hyväksyttiin vasta 15. maaliskuuta. Presidentti F. W. de '
        + 'Klerk julisti sen viikkoa ennen käyttöönottoa.',
      'Lipun piti olla väliaikainen viideksi vuodeksi. Perustuslakia '
        + 'valmisteltaessa tuli 118 esitystä sen säilyttämisestä ja '
        + '35 muuttamisesta, ja 28. syyskuuta 1995 se päätettiin '
        + 'pitää. Nyt lippu on perustuslain ensimmäinen pykälä.',
      'Sitä ennen, vuosina 1928–1994, lippu oli oranssi-'
        + 'valkoinen-sininen ja sen keskellä kolme pientä lippua. '
        + 'Isoisän matkavuonna 1873 yhtenäistä Etelä-Afrikkaa ei '
        + 'ollut lainkaan: Kapmaa ja Natal olivat brittiläisiä ja '
        + 'buurien tasavalloilla oli omat lippunsa. Vasta 1910 '
        + 'nelikko yhdistyi.',
    ],
    versiot: [
      {
        nimi: 'Vanha lippu 1928–1994',
        polku: 'assets/liput/versiot/zaf-1928.png',
        selite: 'Pohjana on Alankomaiden vanha ruhtinaanlippu, ja '
          + 'valkoisella raidalla on kolme pientä lippua: Britannian '
          + 'unionilippu, Oranjen vapaavaltion lippu pystyssä ja '
          + 'Transvaalin Vierkleur. Ne on aseteltu niin, ettei '
          + 'yksikään ole arvokkaammalla paikalla kuin toinen — '
          + 'kolmen vuoden kiistan jälkeen syntynyt kompromissi. '
          + 'Maailman ainoa valtiolippu, jossa oli viisi lippua '
          + 'kolmen lipun sisällä. Vuodesta 2019 lipun turha '
          + 'esittäminen julkisesti on Etelä-Afrikassa tuomittu '
          + 'vihapuheeksi; museot, tutkimus, taide ja journalismi '
          + 'ovat poikkeus.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Etelä-Afrikan vaakuna',
        polku: 'assets/liput/tunnukset/zaf-vaakuna.png',
        selite: 'Kilvessä on kaksi ihmishahmoa, jotka tervehtivät '
          + 'toisiaan; ne on otettu Linton-kiven khoisan-'
          + 'kalliotaiteesta. Kilven päällä lepäävät keihäs ja '
          + 'nuija merkkinä rauhasta, ylinnä kuninkaanprotea, '
          + 'sihteerihaukka ja nouseva aurinko, sivuilla '
          + 'norsunsyöksyhampaat ja vehnäntähkät. Nauhassa on '
          + 'sukupuuttoon kuolleella ǀxam-kielellä lause "ǃke e꞉ '
          + 'ǀxarra ǁke" eli "erilaiset ihmiset yhdistyvät". '
          + 'Vaakunan piirsi Iaan Bekker ja se otettiin käyttöön '
          + 'vapaudenpäivänä 27. huhtikuuta 2000; sitä ennen '
          + 'tunnuslause oli latinaksi Ex Unitate Vires.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Echando una '
      + 'mano / Wikimedia Commons (CC BY-SA 4.0)',
  },
  'Flag of Zimbabwe.svg': {
    maa: 'Zimbabwe',
    symboliikka: [
      { osa: 'Vihreä', selite: 'maatalous ja maaseutu.' },
      {
        osa: 'Kulta',
        selite: 'maaperän mineraalit, ennen kaikkea kulta.',
      },
      {
        osa: 'Punainen',
        selite: 'chimurenga-sodissa eli vapaustaisteluissa vuodatettu '
          + 'veri.',
      },
      { osa: 'Musta', selite: 'mustan enemmistön perintö.' },
      { osa: 'Valkoinen kolmio', selite: 'rauha.' },
      {
        osa: 'Punainen tähti',
        selite: 'kansakunnan pyrkimykset. Yleisesti se luetaan myös '
          + 'sosialismin merkiksi.',
      },
      {
        osa: 'Zimbabwen lintu',
        selite: 'Ison Zimbabwen raunioista löytynyt vuolukivipatsas, '
          + 'joka on todennäköisimmin kalasääksi.',
      },
    ],
    kappaleet: [
      'Lippu nostettiin salkoon keskiyöllä 17. ja 18. huhtikuuta '
        + '1980 välisenä yönä, kun Britannia myönsi maalle '
        + 'itsenäisyyden. Pohjana on hallituspuolue ZANU–PF:n lippu. '
        + 'Luonnoksessa ei ollut lintua lainkaan: sen ehdotti '
        + 'lentoluutnantti Cedric Herbert, joka muistutti linnun '
        + 'iästä ja ainutlaatuisuudesta.',
      'Sama lintu oli ollut jo Etelä-Rhodesian vaakunassa vuodesta '
        + '1924. Se pääsi lippuun 11. marraskuuta 1968, kun '
        + 'valkoisen vähemmistön hallitus otti käyttöön '
        + 'vihreä-valkoinen-vihreän lipun vaakunoineen. Vuonna 1979 '
        + 'maa oli hetken Zimbabwe Rhodesia ja sai neljännen lipun — '
        + 'mustanationalistit kutsuivat sitä "lipuksi, jolla on kaksi '
        + 'nimeä".',
      'Isoisän matkavuonna 1873 alueella ei ollut lippua: sitä '
        + 'hallitsi ndebelejen kuningas Lobengula, ja Cecil Rhodesin '
        + 'yhtiö otti maan haltuunsa vasta 1890. Nykylipusta on '
        + 'liikkeellä kaksi versiota — ulkomaisissa tehtaissa lintu '
        + 'on litistetty ja tähti vinossa, koska mallina on '
        + 'käytetty hätäisesti tehtyä esittelykuvaa vuodelta 1980. '
        + 'Virallinen on se, jossa tähti on säännöllinen.',
    ],
    versiot: [
      {
        nimi: 'Rhodesian lippu 1968–1979',
        polku: 'assets/liput/versiot/zwe-rhodesia.png',
        selite: 'Vihreä-valkoinen-vihreä pystyraita ja keskellä '
          + 'siirtomaan vaakuna: Cecil Rhodesin suvun leijona ja '
          + 'ohdakkeet, kaivoshakku ja ylinnä Zimbabwen lintu. '
          + 'Ensimmäinen valtiolippu, jossa lintu oli.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Zimbabwen vaakuna',
        polku: 'assets/liput/tunnukset/zwe-vaakuna.png',
        selite: 'Vihreällä kilvellä on pala Ison Zimbabwen '
          + 'kivimuuria ja yläreunassa siniset aaltoviivat eli '
          + 'vedet. Kilven takana ovat ristissä kuokka ja '
          + 'rynnäkkökivääri: siirtymä sodasta rauhaan. Kannattajina '
          + 'on kaksi kuudua, jalustassa vehnää, puuvillaa ja '
          + 'maissia, ylinnä punainen tähti ja Zimbabwen lintu. '
          + 'Nauhassa lukee Unity, Freedom, Work. Vaakuna otettiin '
          + 'käyttöön 21. syyskuuta 1981 — siihen asti käytössä oli '
          + 'yhä Rhodesian vaakuna.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Mozambique.svg': {
    maa: 'Mosambik',
    symboliikka: [
      { osa: 'Vihreä', selite: 'maaperä.' },
      { osa: 'Musta', selite: 'Afrikan manner.' },
      {
        osa: 'Kulta',
        selite: 'maankamaran alla olevat rikkaudet.',
      },
      {
        osa: 'Valkoinen',
        selite: 'rauha ja mosambikilaisten taistelun oikeutus.',
      },
      {
        osa: 'Punainen kolmio',
        selite: 'siirtomaavallan vastustaminen ja maanpuolustus.',
      },
      {
        osa: 'Kirja, kuokka ja kivääri',
        selite: 'koulutus, tuotanto ja puolustus.',
      },
      {
        osa: 'Keltainen tähti',
        selite: 'kansainvälisen solidaarisuuden henki.',
      },
    ],
    kappaleet: [
      'Mosambikin lippu on maailman ainoa valtiolippu, jossa on '
        + 'nykyaikainen tuliase. Perustuslaki puhuu vain "kuokasta '
        + 'ja aseesta", mutta piirroksessa se on rynnäkkökivääri '
        + 'pistimineen. Nykyinen asu vahvistettiin 1. toukokuuta '
        + '1983.',
      'Itsenäisyys tuli 25. kesäkuuta 1975 ja ensimmäinen lippu oli '
        + 'toisenlainen: neljä vinoraitaa lähti salon yläkulmasta, '
        + 'ja kulmassa oli valkoinen hammasratas tähtineen. Kuvio '
        + 'periytyi vapausliike FRELIMOn lipusta, jonka esikuvaksi '
        + 'on arveltu joko Tanganjikan lippua tai Etelä-Afrikan '
        + 'ANC:n lippua. Isoisän matkavuonna 1873 rannikolla liehui '
        + 'Portugalin lippu.',
      'Kiväärin poistamisesta on väitelty pitkään. Vuonna 2005 '
        + 'järjestettiin uusi lippukilpailu osana FRELIMOn ja '
        + 'RENAMOn rauhansopimusta; 169 ehdotusta jätettiin, mutta '
        + 'parlamentti äänesti muutosta vastaan luvuin 155–79.',
    ],
    versiot: [
      {
        nimi: 'Ensimmäinen lippu 1975–1983',
        polku: 'assets/liput/versiot/moz-1975.png',
        selite: 'Neljä vinoraitaa salon yläkulmasta ja valkoinen '
          + 'hammasratas, jonka sisällä ovat tähti, kirja, kuokka ja '
          + 'kivääri. Hammasratas oli työväenluokka ja '
          + 'teollisuustuotanto; se poistettiin 1983.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Mosambikin tunnus',
        polku: 'assets/liput/tunnukset/moz-vaakuna.png',
        selite: 'Hammasratas, jota reunustavat maissintähkä ja '
          + 'sokeriruoko. Sisällä punainen aurinko nousee maan '
          + 'kartan yllä, alla aaltoina meri, edessä kirja, kuokka '
          + 'ja kivääri, ylinnä punainen tähti. Nauhassa lukee '
          + 'República de Moçambique; teksti muutettiin 1990, kun '
          + 'maa lakkasi olemasta kansantasavalta.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Tunnus: Jam123 / '
      + 'Wikimedia Commons (CC0)',
  },
  'Flag of Madagascar.svg': {
    maa: 'Madagaskar',
    symboliikka: [
      {
        osa: 'Valkoinen pystyraita',
        selite: 'alun perin puhtaus, nykyisin vapaus ja turvallisuus. '
          + 'Se on myös malagasilaisten naisten juhlavaatteen ja '
          + 'riisin väri.',
      },
      {
        osa: 'Punainen',
        selite: 'alun perin suvereenisuus, nykyisin kansallinen '
          + 'yhtenäisyys. Punainen oli saaren kuningaskuntien väri '
          + 'ja se on savitiilitalojen väri.',
      },
      {
        osa: 'Vihreä',
        selite: 'toivo. Se on myös rannikon ravenala-viuhkapuun ja '
          + 'ylängön metsien väri.',
      },
    ],
    kappaleet: [
      'Radio Tananarive pyysi 1958 ehdotuksia tulevan tasavallan '
        + 'lipuksi. Tekninen toimikunta kokoontui 15. lokakuuta, '
        + 'päivä Malagasin tasavallan julistamisen jälkeen, ja valitsi '
        + 'viidestä finalistista kartastoviraston virkamiehen '
        + 'Andrianome Ranaivosoan toisen ehdotuksen. Lippu '
        + 'vahvistettiin 21. lokakuuta 1958, lähes kaksi vuotta ennen '
        + 'itsenäistymistä Ranskasta 26. kesäkuuta 1960.',
      'Väreille ei alun perin annettu merkityksiä. Vasta '
        + 'käyttöönottopäivänä perustuslakia säätävän kokouksen '
        + 'edustaja Barinia Tsara sanoi: "Valkoinen on puhtaus, '
        + 'punainen suvereenisuus. Ja vihreä, hyvät herrat, on '
        + 'toivo."',
      'Lippua myös arvosteltiin. Punainen ja valkoinen olivat '
        + 'merinojen kuningaskunnan värit, eivätkä kaikki pitäneet '
        + 'siitä, että enemmistökansan hallitsijasuvun värit tulivat '
        + 'koko maan lipuksi. Silti lippu on säilynyt muuttumattomana '
        + 'kaikkien vallanvaihdosten läpi.',
    ],
    versiot: [
      {
        nimi: 'Merinojen kuningaskunnan lippu',
        polku: 'assets/liput/versiot/mdg-merina.png',
        selite: 'Valkoinen ja punainen kaksivärilippu. Radama I '
          + 'yhdisti 1810 kaksi henkilökohtaista viiriään — '
          + 'valkoisen ja punaisen — kuningaskunnan lipuksi, ja '
          + 'hallitsijat kirjoittivat siihen nimensä punaisin '
          + 'kirjaimin. Isoisän matkavuonna 1873 saarta hallitsi '
          + 'kuningatar Ranavalona II.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Madagaskarin sinetti',
        polku: 'assets/liput/tunnukset/mdg-vaakuna.png',
        selite: 'Keltaisella kehällä lukee REPOBLIKAN\'I '
          + 'MADAGASIKARA. Keskellä on saaren kartta ja sen alla '
          + 'zebun eli kyttyräkarjan pää; punavihreät säteet '
          + 'muodostavat sekä auringon että ravenalan viuhkan. '
          + 'Alareunassa on tunnuslause Fitiavana, Tanindrazana, '
          + 'Fandrosoana — rakkaus, isänmaa, edistys. Lause on '
          + 'vaihtunut perustuslakien mukana useaan kertaan.',
      },
    ],
    lahde: 'Liput ja sinetti: Wikimedia Commons (PD)',
  },
  'Flag of Tanzania.svg': {
    maa: 'Tansania',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'maan kasvillisuus ja maatalouden rikkaus.',
      },
      {
        osa: 'Sininen',
        selite: 'Intian valtameri sekä maan järvet ja joet.',
      },
      {
        osa: 'Musta vinoraita',
        selite: 'maan asukkaat, swahilinkielinen kansa.',
      },
      {
        osa: 'Kultaiset kapeat raidat',
        selite: 'maaperän mineraalirikkaus.',
      },
    ],
    kappaleet: [
      'Lippu on kahden lipun summa. Tanganjika itsenäistyi 9. '
        + 'joulukuuta 1961, ja sen lippu tehtiin TANU-puolueen '
        + 'vihreä-musta-keltaisesta lipusta lisäämällä kapeat '
        + 'keltaiset raidat. Sansibarissa vallankumous kaatoi '
        + 'sulttaanin 12. tammikuuta 1964, ja uusi hallitus otti '
        + 'sini-musta-vihreän lipun. Kun maat yhdistyivät '
        + 'huhtikuussa 1964, värit sulautettiin yhteen ja uusi lippu '
        + 'vahvistettiin 30. kesäkuuta 1964.',
      'Sansibarin sulttaanikunnan lippu oli pelkkä punainen kangas. '
        + 'Se periytyi Omanin Muscatin sulttaanikunnasta, eikä '
        + 'Majid bin Said vaihtanut sitä, kun hän julisti Sansibarin '
        + 'itsenäiseksi 2. marraskuuta 1856. Punainen liehui aina '
        + 'joulukuuhun 1963, jolloin siihen lisättiin vihreä kiekko '
        + 'ja kaksi mausteneilikkaa.',
      'Isoisän matkavuonna 1873 juuri tuo punainen lippu liehui '
        + 'Sansibarissa. Kesäkuussa 1873 Britannian konsuli John '
        + 'Kirk esitti sulttaani Barghashille uhkavaatimuksen, ja '
        + 'kahdessa viikossa sulttaani allekirjoitti sopimuksen, '
        + 'joka kielsi orjakaupan ja sulki saaren suuren '
        + 'orjamarkkinan.',
    ],
    versiot: [
      {
        nimi: 'Sansibarin sulttaanikunnan lippu',
        polku: 'assets/liput/versiot/tza-sansibar.png',
        selite: 'Pelkkä punainen kangas ilman tunnuksia. Sansibarin '
          + 'lippu 1800-luvun puolivälistä vuoteen 1963 — sama, joka '
          + 'liehui Stone Townin yllä isoisän matkavuonna 1873.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Tansanian vaakuna',
        polku: 'assets/liput/tunnukset/tza-vaakuna.png',
        selite: 'Soturin kilpi on jaettu neljään: ylinnä kultaisella '
          + 'palava soihtu eli vapaus ja tieto, sitten maan lippu, '
          + 'sitten punaisella ristissä kirves ja kuokka, alinna '
          + 'siniset aallot. Kilpeä halkoo keihäs, ja se seisoo '
          + 'Kilimanjaron kuvan päällä. Kannattajina ovat mies ja '
          + 'nainen norsunsyöksyhampaiden vierellä, miehen jalassa '
          + 'mausteneilikkapensas ja naisen jalassa puuvillapensas. '
          + 'Nauhassa lukee swahiliksi Uhuru na Umoja — vapaus ja '
          + 'yhtenäisyys.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: FischX / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Kenya.svg': {
    maa: 'Kenia',
    symboliikka: [
      { osa: 'Musta', selite: 'maan kansa.' },
      {
        osa: 'Punainen',
        selite: 'itsenäisyystaistelussa vuodatettu veri.',
      },
      { osa: 'Vihreä', selite: 'maa ja sen luonnonvarat.' },
      { osa: 'Valkoiset kapeat raidat', selite: 'rauha.' },
      {
        osa: 'Maasai-kilpi ja kaksi keihästä',
        selite: 'tahto puolustaa maata.',
      },
    ],
    kappaleet: [
      'Lippu otettiin käyttöön itsenäistymispäivänä 12. joulukuuta '
        + '1963. Sen esikuvana on puoluelippu: Kenya African Union '
        + 'otti 1951 käyttöön musta-punaisen lipun ja muutti sen '
        + '1952 kolmiraidaksi, jonka keskellä oli kilpi. Seuraaja '
        + 'KANU vaihtoi aseiden tilalle kukon ja kirveen.',
      'Puoluelippua ei silti haluttu suoraan valtiolipuksi. Jomo '
        + 'Kenyattan johtama toimikunta rakensi kompromissin, jossa '
        + 'on KANU:n kolmiraita ja kilpailija KADU:n kapeat '
        + 'valkoiset raidat. Keskelle jäi maasai-kilpi ja kaksi '
        + 'keihästä, jotka näin siirtyivät puoluetunnuksesta koko '
        + 'maan tunnukseksi. Mitat on kirjattu vuoden 2010 '
        + 'perustuslain toiseen liitteeseen.',
      'Isoisän matkavuonna 1873 Kenian rannikkokaista kuului '
        + 'Sansibarin sulttaanille ja sisämaa oli omien kansojensa '
        + 'hallussa; brittien protektoraatti perustettiin vasta '
        + '1895. Lipun käyttöä säätelee yhä oma lakinsa, joka kieltää '
        + 'luvattoman kaupallisen jäljentämisen.',
    ],
    tunnukset: [
      {
        nimi: 'Kenian vaakuna',
        polku: 'assets/liput/tunnukset/ken-vaakuna.png',
        selite: 'Kaksi kultaista leijonaa pitelee keihäitä ja '
          + 'maasai-kilpeä. Kilvessä ovat lipun värit ja keskellä '
          + 'kukko, joka kantaa kirvestä — KANU:n tunnus ja merkki '
          + 'työn tahdosta ja uuden päivän koitosta. Alla on Kenia-'
          + 'vuoren siluetti ja sen juurella kahvia, pyretriä, '
          + 'sisalia, teetä, maissia ja ananasta. Nauhassa lukee '
          + 'swahiliksi Harambee, "vetäkäämme yhdessä".',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna: Ashiriz / '
      + 'Wikimedia Commons (CC BY-SA 3.0)',
  },
  'Flag of Uganda.svg': {
    maa: 'Uganda',
    symboliikka: [
      { osa: 'Musta', selite: 'Ugandan kansa.' },
      { osa: 'Keltainen', selite: 'auringonpaiste.' },
      { osa: 'Punainen', selite: 'veljeys.' },
      {
        osa: 'Kruunupäinen kurki',
        selite: 'maan kansallislintu. Bagandoille se on onnen, '
          + 'pitkän iän ja vaurauden merkki.',
      },
      {
        osa: 'Kuusi raitaa',
        selite: 'sama kolmikko kahdesti — lippu näyttää samalta, '
          + 'vaikka sen kääntäisi ylösalaisin.',
      },
    ],
    kappaleet: [
      'Lippu otettiin käyttöön itsenäistymispäivänä 9. lokakuuta '
        + '1962. Sitä ei ollut helppo valita. Maaliskuussa 1962 '
        + 'kasvatustieteilijä Senteza Kajubin toimikunta oli jo '
        + 'ehdottanut aivan toisenlaista lippua: vihreä-sini-vihreitä '
        + 'pystyraitoja ja keltainen kurki keskellä.',
      'Se ehdotus kaatui. Värit olivat demokraattisen puolueen, ja '
        + 'huhtikuun vaalit voitti Uganda People\'s Congress. '
        + 'Oikeusministeri Grace Ibingiran johtama alakomitea valitsi '
        + 'tilalle nykyisen kuvion, joka on lähellä UPC:n omaa '
        + 'lippua. Ibingiraa pidetään yleensä suunnittelijana, mutta '
        + 'muutkin ovat ilmoittautuneet tekijöiksi.',
      'Kurki oli tullut tunnukseksi jo siirtomaa-aikana: britit '
        + 'valitsivat sen 1914 protektoraatin merkiksi, koska he '
        + 'eivät halunneet nostaa esiin minkään yksittäisen '
        + 'kuningaskunnan omia symboleja. Isoisän matkavuonna 1873 '
        + 'Bugandaa hallitsi kabaka Mutesa I, ja alue oli vielä '
        + 'kokonaan Euroopan ulottumattomissa.',
    ],
    versiot: [
      {
        nimi: 'Ugandan protektoraatin lippu 1914–1962',
        polku: 'assets/liput/versiot/uga-protektoraatti.png',
        selite: 'Brittiläinen sininen lippu, jonka liepeessä on '
          + 'keltaisessa kiekossa kruunupäinen kurki. Sama lintu '
          + 'siirtyi itsenäisen Ugandan lippuun ja vaakunaan.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Ugandan vaakuna',
        polku: 'assets/liput/tunnukset/uga-vaakuna.png',
        selite: 'Kilvessä on kolme kuvaa: ylinnä aaltoviivat eli '
          + 'Victoria- ja Albert-järvi, keskellä aurinko ja alinna '
          + 'perinteinen rumpu. Rumpu oli alun perin kuninkuuden ja '
          + 'kuningaskuntien vallan merkki; kuningaskunnat '
          + 'lakkautettiin 1967, ja sen jälkeen rumpua on selitetty '
          + 'tanssin ja koolle kutsumisen merkiksi. Kannattajina '
          + 'ovat Ugandan kob-antilooppi ja kruunupäinen kurki, '
          + 'jalustassa Niili sekä kahvin ja puuvillan oksat. '
          + 'Nauhassa lukee For God and My Country. Vaakuna '
          + 'hyväksyttiin 1. lokakuuta 1962, kolme viikkoa ennen '
          + 'itsenäisyyttä.',
      },
    ],
    lahde: 'Liput: Wikimedia Commons (PD). Vaakuna ja '
      + 'protektoraatin lippu: Sodacan / Wikimedia Commons '
      + '(CC BY-SA 3.0)',
  },
  'Flag of Somalia.svg': {
    maa: 'Somalia',
    symboliikka: [
      {
        osa: 'Vaaleansininen',
        selite: 'väri valittiin kunnianosoitukseksi Yhdistyneille '
          + 'kansakunnille, jonka hallintoalueena maa oli. Nykyisin '
          + 'se luetaan myös taivaaksi ja mereksi.',
      },
      {
        osa: 'Valkoinen viisisakarainen tähti',
        selite: 'yhtenäisyyden tähti. Sakarat ovat viisi aluetta, '
          + 'joilla somalit ovat alkuperäisenä enemmistönä.',
      },
    ],
    kappaleet: [
      'Lippu hyväksyttiin 12. lokakuuta 1954, kun maa oli vielä '
        + 'YK:n hallintoalue Italian hoidossa. Neuvottelut olivat '
        + 'ajautuneet umpikujaan: suurin puolue Somali Youth League '
        + 'halusi oman puoluelippunsa, mitä muut eivät hyväksyneet. '
        + 'Umpisolmun avasi oppinut Mohammed Awale Liban, joka '
        + 'ehdotti ja piirsi kokonaan uuden tunnuksen.',
      'Tähden sakarat tarkoittavat viittä aluetta: Djiboutia, '
        + 'Somalimaata, Etiopian somalialuetta, Kenian koillista '
        + 'maakuntaa ja itse Somaliaa. Lippu on siis kansallisuuden '
        + 'lippu, joka ylittää valtioiden rajat — 1800-luvun '
        + 'puolivälistä lähtien somalinkieliset alueet oli jaettu '
        + 'Etiopian, Ranskan, Britannian ja Italian kesken, eikä '
        + 'niitä ole sen jälkeen koottu yhteen.',
      'Sama lippu oli hetken myös Somalimaan valtion lippu 26. '
        + 'kesäkuuta – 1. heinäkuuta 1960, jolloin entinen '
        + 'brittiläinen protektoraatti yhdistyi Somaliaan. Vuonna '
        + '1991 Somalimaa julistautui uudelleen itsenäiseksi; '
        + 'yksikään valtio ei ole tunnustanut sitä, sillä on oma '
        + 'lippunsa, ja Somalian lipun esittäminen on siellä '
        + 'kielletty.',
    ],
    tunnukset: [
      {
        nimi: 'Somalian vaakuna',
        polku: 'assets/liput/tunnukset/som-vaakuna.png',
        selite: 'Sinisellä, kultakehyksisellä kilvellä on lipun '
          + 'valkoinen tähti. Kilven yllä on koristekruunu, jossa on '
          + 'viisi kärkeä, ja kannattajina kaksi leopardia — '
          + 'leopardi on tavallinen aihe somalialaisessa '
          + 'kuvaperinteessä. Alinna ovat palmunlehvät ja valkoinen '
          + 'nauha. Vaakuna otettiin käyttöön 10. lokakuuta 1956 ja '
          + 'sen piirsi italialainen Giuseppe Ricci.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
  'Flag of Ethiopia.svg': {
    maa: 'Etiopia',
    symboliikka: [
      {
        osa: 'Vihreä',
        selite: 'toivo sekä maa ja sen hedelmällisyys.',
      },
      {
        osa: 'Keltainen',
        selite: 'rauha ja sopu maan eri kansojen ja uskontojen '
          + 'välillä.',
      },
      {
        osa: 'Punainen',
        selite: 'maan puolustamisessa vuodatettu veri.',
      },
      {
        osa: 'Sininen kiekko ja keltainen viisikanta',
        selite: 'kansojen ja kansallisuuksien yhtenäisyys. Tähden '
          + 'yhtä pitkät säteet on selitetty kaikkien '
          + 'etiopialaisten tasa-arvoksi.',
      },
    ],
    kappaleet: [
      'Suorakulmainen kolmiraita syntyi 11. lokakuuta 1897, vuosi '
        + 'Adwan voiton jälkeen, kun keisari Menelik II käski '
        + 'yhdistää kolme erillistä viiriä yhdeksi lipuksi. '
        + 'Keskiraidalla oli hänen nimensä ensimmäinen kirjain. Se '
        + 'poistettiin keisarin kuoltua 1913, ja 1914 raitojen '
        + 'järjestys kääntyi nykyiseksi.',
      'Isoisän matkavuonna 1873 tällaista lippua ei siis vielä '
        + 'ollut. Keisari Yohannes IV:n valtaa merkitsivät '
        + 'sotarummut, punaiset päivänvarjot ja sandak alama, '
        + 'metallitankoon kiinnitetty kultainen risti-pallo. Värit '
        + 'itsessään olivat vanhoja: Etiopian ortodoksinen kirkko '
        + 'käytti punaista uskon ja vallan, keltaista kirkon ja '
        + 'rauhan sekä vihreää luonnonrikkauden värinä.',
      'Koska Etiopia säilyi siirtomaavallan ulkopuolella, moni '
        + 'itsenäistyvä Afrikan maa otti sen värit omakseen — niin '
        + 'niistä tuli panafrikkalaiset värit. Tunnus on vaihtunut '
        + 'hallitusten mukana; nykyinen viisikanta vahvistettiin 31. '
        + 'lokakuuta 1996, ja vuoden 2009 laki kieltää lipun käytön '
        + 'ilman tunnusta.',
    ],
    versiot: [
      {
        nimi: 'Keisarikunnan leijonalippu 1897–1974',
        polku: 'assets/liput/versiot/eth-keisarikunta.png',
        selite: 'Kolmiraidan keskellä kruunattu Juudan leijona, joka '
          + 'kantaa kulkueristiä. Keisarikunnan lippu Menelik II:n '
          + 'ajoista Haile Selassien syrjäyttämiseen 1974. Risti oli '
          + 'ollut Etiopian tunnus jo 1600-luvulta.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Etiopian tunnus',
        polku: 'assets/liput/tunnukset/eth-vaakuna.png',
        selite: 'Sinisellä kiekolla on keltainen viisikanta, jonka '
          + 'kärjistä lähtee yhtä pitkät säteet. Kiekko on suoraan '
          + 'lipun keskeltä. Ennen vuotta 1975 tunnus oli '
          + 'keisarikunnan vaakuna, ja Dergin aikana 1975–1987 '
          + 'aura keltaisen auringon edessä seppeleen sisällä.',
      },
    ],
    lahde: 'Liput ja tunnus: Wikimedia Commons (PD)',
  },
  'Flag of Sudan.svg': {
    maa: 'Sudan',
    symboliikka: [
      {
        osa: 'Punainen',
        selite: 'itsenäisyystaistelu ja maan marttyyrit.',
      },
      {
        osa: 'Valkoinen',
        selite: 'kansa, valo ja toivo. Se muistuttaa myös vuoden '
          + '1924 Valkoisen lipun liitosta, joka nousi '
          + 'siirtomaavaltaa vastaan.',
      },
      {
        osa: 'Musta',
        selite: 'maan nimi: sudan tarkoittaa arabiaksi mustien maata. '
          + 'Väri viittaa myös mahdistien mustaan lippuun.',
      },
      {
        osa: 'Vihreä kolmio',
        selite: 'islam, maatalous ja maan hedelmällisyys.',
      },
    ],
    kappaleet: [
      'Nykyinen lippu otettiin käyttöön toukokuussa 1970. Vuoden '
        + '1969 vallankaappauksen jälkeen järjestettiin kilpailu, '
        + 'jonka voitti taiteilija Abdel Rahman Ahmed al-Jali. '
        + 'Pohjana ovat arabivallankumouksen värit, jotka '
        + 'periytyvät Egyptin vuoden 1952 vallankumouksen lipusta: '
        + 'puna-valko-musta kolmiraita, jonka vihreä osa erottaa '
        + 'maat toisistaan.',
      'Ensimmäinen lippu oli aivan toisenlainen. Kun Sudan '
        + 'itsenäistyi 1. tammikuuta 1956, runoilija Macki Sufin '
        + 'suunnittelemassa lipussa oli sini-kelta-vihreä kolmiraita: '
        + 'Niili, Sahara ja viljelysmaat. Värit valittiin nimenomaan '
        + 'siksi, että ne olivat puolueettomia niin kansanryhmien '
        + 'kuin puolueidenkin välillä.',
      'Isoisän matkavuonna 1873 Sudanilla ei ollut lippua: maata '
        + 'hallitsi Egyptin kediivi. Anglo-egyptiläisellä '
        + 'yhteishallinnollakaan 1899–1956 ei ollut omaa lippua — '
        + 'salossa liehuivat Egyptin ja Britannian liput rinnakkain. '
        + 'Vanha kolmiraita palasi katukuvaan vuosien 2018–2019 '
        + 'mielenosoituksissa.',
    ],
    versiot: [
      {
        nimi: 'Itsenäisyyden lippu 1956–1970',
        polku: 'assets/liput/versiot/sdn-1956.png',
        selite: 'Sininen, keltainen ja vihreä vaakaraita: Niili, '
          + 'Sahara ja viljelysmaat. Runoilija Macki Sufin '
          + 'suunnittelema lippu, joka valittiin siksi, ettei se '
          + 'kuulunut kenellekään.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Sudanin tunnus',
        polku: 'assets/liput/tunnukset/sdn-vaakuna.png',
        selite: 'Sihteerihaukka kantaa kilpeä, joka on peräisin '
          + 'mahdi Muhammad Ahmadin ajalta 1800-luvulta. Ylemmässä '
          + 'nauhassa lukee arabiaksi "voitto on meidän" ja '
          + 'alemmassa Sudanin tasavalta. Sihteerihaukka valittiin '
          + 'nimenomaan sudanilaiseksi vastineeksi muiden arabimaiden '
          + 'Saladinin kotkalle ja Quraishin haukalle. Tunnus on '
          + 'ollut käytössä vuodesta 1985; itsenäisyyden ensimmäinen '
          + 'tunnus oli sarvikuono kahden palmun välissä.',
      },
    ],
    lahde: 'Liput ja tunnus: Wikimedia Commons (PD)',
  },
  'Flag of South Sudan.svg': {
    maa: 'Etelä-Sudan',
    symboliikka: [
      { osa: 'Musta', selite: 'Etelä-Sudanin kansa.' },
      {
        osa: 'Punainen',
        selite: 'itsenäisyyden puolesta vuodatettu veri.',
      },
      {
        osa: 'Vihreä',
        selite: 'maatalous, luonnonvarat, maa ja edistys.',
      },
      { osa: 'Valkoiset kapeat raidat', selite: 'rauha.' },
      {
        osa: 'Taivaansininen kolmio',
        selite: 'Niilin vedet, elämän lähde.',
      },
      {
        osa: 'Keltainen tähti',
        selite: 'osavaltioiden yhtenäisyys, toivo ja päättäväisyys.',
      },
    ],
    kappaleet: [
      'Lippu on maataan vanhempi. Se hyväksyttiin 2005 osana '
        + 'kokonaisrauhansopimusta, joka päätti toisen Sudanin '
        + 'sisällissodan, ja pohjana oli vapausliike SPLM:n lippu. '
        + 'Itse valtio syntyi vasta 9. heinäkuuta 2011.',
      'Neljä vaakaraitaa ovat samat kuin Kenian lipussa ja värit '
        + 'samat kuin Sudanin lipussa, mutta merkitykset ovat omat. '
        + 'Sinisessä kolmiossa oleva keltainen tähti muistuttaa '
        + 'Belgian Kongon lipusta.',
      'Lipun oikeasta muodosta on kiistelty pitkään. John Garangin '
        + 'hautajaisissa 2005 kolmio oli tummansininen ja tähti '
        + 'kallellaan, ja molempia muotoja käytettiin rinnakkain '
        + 'vuoteen 2023. Elokuussa 2023 maan mediaviranomainen '
        + 'ilmoitti, että ainoa oikea versio on se, jossa kolmio on '
        + 'taivaansininen ja tähti pystyssä. Isoisän matkavuonna '
        + '1873 alue oli Egyptin Sudanin Equatorian maakuntaa, jonka '
        + 'kuvernöörinä toimi brittitutkija Samuel Baker.',
    ],
    tunnukset: [
      {
        nimi: 'Etelä-Sudanin vaakuna',
        polku: 'assets/liput/tunnukset/ssd-vaakuna.png',
        selite: 'Afrikankalasääksi levittää siipensä kultaisen '
          + 'kilven takana ja pitelee ristissä keihästä ja lapiota — '
          + 'tahtoa puolustaa maata ja tehdä työtä sen ruokkimiseksi. '
          + 'Kotka merkitsee voimaa, sitkeyttä ja kaukonäköisyyttä. '
          + 'Nauhoissa lukee Justice, Liberty, Prosperity ja '
          + 'Republic of South Sudan. Vaakuna vahvistettiin '
          + 'itsenäistymisen yhteydessä heinäkuussa 2011.',
      },
    ],
    lahde: 'Liput ja vaakuna: Wikimedia Commons (PD)',
  },
};
