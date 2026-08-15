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
};
