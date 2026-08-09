/*
 * Työhuoneen Kehitys-välilehden sisältö. Fable kirjoittaa tämän
 * tiedoston; työhuone näyttää sen Kehitys-välilehdellä.
 *
 * KAARI_PAKETIT v2 (9.8.2026 ilta, omistajan palaute): kohtaaminen
 * ja visa yhdistetty yhdeksi kohtaamiseksi jonka päättää OIKEA
 * kysymys vaihtoehtoineen; aarre ja henkilön cliffhanger-vihje
 * yhdistetty. Kohtaamisia ja aarteita lyhennetty vielä lauseella
 * (omistajan palaute 9.8. myöhäisilta), ja aarteita lyhennetty
 * vielä kerran + nuoren herran mietintö kolmeen (Praha, Venetsia,
 * Budapest). Saapumiset ennallaan
 * (omistaja: "Matkakirjan koetekstit ovat hyvät"). Vanhat versiot
 * git-historiassa. ÄLÄ generoi ääniä ennen omistajan hyväksyntää.
 */
export const KAARI_PAKETIT = {
  johdanto: 'Kolme osaa kaupunkia kohti (omistajan palaute 9.8. illalla): '
    + 'isoisän matkakirjamerkintä saapumisesta ennallaan, '
    + 'KOHTAAMINEN jossa henkilö esittää isoisän jättämän '
    + 'kysymyksen — oikea visakysymys vaihtoehtoineen mukana, jotta '
    + 'parin sopivuuden näkee — ja AARRE, jonka päättää henkilön '
    + 'auki jäävä vihje. Viisi vihjettä kietoutuvat yhteen: joku '
    + 'pitää isoisän jälkiä yllä vielä tänäänkin. Ääniä ei ole '
    + 'generoitu — päätät luettuasi, mitkä osat luetaan.',
  kohteet: [
    {
      id: 'praha',
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisella kujalla, talossa numero kahdeksan, paloi '
        + 'kynttilä, vaikka ovi oli lukossa ja ikkunassa vuosisadan '
        + 'pöly. Sisällä pöydällä odotti avoin kirja, ja sen reunaan '
        + 'oli kirjoitettu barometrini lukema — minuutilleen sama kuin '
        + 'omani. Käsiala ei ollut minun. Sinä, joka tätä luet: '
        + 'kynttilä ei sytytä itseään.',
      henkilo: 'Lyhdynsytyttäjä Tomáš pitää sukunsa lupauksen: talon '
        + 'kahdeksan kynttilä palaa, kunnes etsijä palaa.',
      kohtaaminen: 'Kujalla tikkaiden päällä seisoo lyhdynsytyttäjä Tomáš. '
        + '"Talon kahdeksan kynttilä on sukuni työ — isoisäsi maksoi '
        + 'siitä sadaksi vuodeksi. Vastaa hänen kysymykseensä, niin '
        + 'lasku on sinun."',
      kysymys: {
        q: 'Prahan tarun mukaan rabbi teki savesta vartijan, Golemin. '
          + 'Minne Golem kätkettiin, kun se lopulta sammutettiin?',
        vaihtoehdot: [
          'Vanhanuuden synagogan ullakolle',
          'Kaarlensillan holvin alle',
          'Linnan kaivoon',
          'Kultaisen kujan uuniin',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan Golem lepää yhä Vanhanuuden synagogan ullakolla '
          + '— portaat ullakolle purettiin, ettei kukaan pääsisi '
          + 'katsomaan.',
      },
      aarre: 'Tomáš sytytti kynttilänpätkän uudelleen: "Niitä oli '
        + 'tilauksessa kaksi — toinen palaa jossain, missä maa on '
        + 'lämmin." Jäin miettimään: kuka vartioi sitä toista?',
    },
    {
      id: 'istanbul',
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskin kahdeksankymmentä porrasta pimeään, ja kaupungin '
        + 'äänet sammuivat yksi kerrallaan. Alhaalla seisoi pylväsmetsä '
        + 'mustassa vedessä, ja yhden pylvään alla lepäsi kivinen kasvo '
        + 'ylösalaisin. Sammutin lyhtyni kokeeksi — ja veden ylle jäi '
        + 'palamaan toinen valo, joka ei ollut minun.',
      henkilo: 'Vedenvartija Emine mittaa säiliön vettä, kuten sukunsa '
        + 'sulttaanien ajoista — ja tuntee molemmat kivikasvot.',
      kohtaaminen: 'Portaiden alla vedenvartija Emine nostaa lyhtyään. "Kirjasi '
        + 'omistaja istui isoisoäitini kanssa koko yön vedenmittoja '
        + 'vertaamassa. Vastaa hänen kysymykseensä, niin soudan sinut '
        + 'kasvojen luo."',
      kysymys: {
        q: 'Säiliön pylvään alla lepää kivinen Medusan pää ylösalaisin. '
          + 'Miksi se tarun mukaan käännettiin?',
        vaihtoehdot: [
          'Jotta kivettävä katse ei osuisi keneenkään',
          'Jotta pylväästä tulisi tukevampi',
          'Kuvanveistäjä erehtyi suunnasta',
          'Sulttaani halusi piilottaa kasvot',
        ],
        oikea: 0,
        fakta: 'Medusan katseen sanottiin muuttavan ihmisen kiveksi — '
          + 'ylösalaisin käännettynä katse painuu maahan. Toinen pää '
          + 'makaa kyljellään samasta syystä.',
      },
      aarre: 'Kun kätkö nousi vedestä, Emine sanoi hiljaa: "Isoisoäitini '
        + 'kirjoitti kirjaan, kumpi kasvoista on vartija ja kumpi vanki '
        + '— joku on leikannut sen sivun irti."',
    },
    {
      id: 'wien',
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Kirkon alla ovi oli raollaan, ja kynttilöiden liekit '
        + 'taipuivat kaikki samaan suuntaan, vaikka ilma seisoi. Holvit '
        + 'jatkuivat pimeään syvemmälle kuin kynttilän valo kantoi. '
        + 'Askelteni kaiku palasi yhtä askelta myöhässä — ja kun '
        + 'pysähdyin kahdesti, kaiku pysähtyi vain kerran.',
      henkilo: 'Suntio Anton hoitaa holvien kynttilät ja saattajien kirjaa, '
        + 'jossa on sekä Horation että hänen isoisänsä nimi.',
      kohtaaminen: 'Holvien suulla suntio Anton nostaa kynttilänsammuttimen '
        + 'olalleen. "Saattajien kirjassa on isoisäsi nimi: he '
        + 'laskeutuivat kolmen lyhdyn kanssa, ja ylös palasi kaksi. '
        + 'Vastaa hänen kysymykseensä, niin kerron, minne kolmas jäi."',
      kysymys: {
        q: 'Wien on valssin kaupunki. Montako iskua valssin yhteen '
          + 'tahtiin kuuluu?',
        vaihtoehdot: [
          'Kolme',
          'Kaksi',
          'Neljä',
          'Kuusi',
        ],
        oikea: 0,
        fakta: 'Valssi soi kolmijakoisessa tahdissa: ensimmäinen isku on '
          + 'painava ja kaksi seuraavaa keveitä — siksi valssi keinuu.',
      },
      aarre: 'Kätkön päällä seisoi kolmas lyhty, ja Anton puhui portaita '
        + 'kohti: "Veto tulee ovesta, jota ei minun aikanani ole avattu '
        + '— kirjassa lukee vain: sinne ei mennä alakautta."',
    },
    {
      id: 'venetsia',
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi kaduille keskellä yötä, ja kanaaleista tuli musta '
        + 'peili. Sillan kaiteella odotti valkoinen naamio, jolla oli '
        + 'linnunnokka — ruttolääkärin kasvot, silmäaukot tyhjinä. '
        + 'Nostin sen, ja mustassa vedessä heijastukseni näytti '
        + 'laskevan naamion takaisin kaiteelle.',
      henkilo: 'Naamiontekijä Lucia pitää pajaa kolmannessa polvessa; '
        + 'tilauskirjassa on vuosi 1873 ja nimikirjaimet H. F.',
      kohtaaminen: 'Pajassa naamiontekijä Lucia tunnistaa linnunnokan yhdellä '
        + 'vilkaisulla. "Tuo on pajamme työtä — tilauskirjassa lukee '
        + '1873 ja nimikirjaimet H. F. Vastaa väliin taitettuun '
        + 'kysymykseen, niin luen tilauksen loppuun."',
      kysymys: {
        q: 'Miksi ruttolääkärin naamiossa on pitkä linnunnokka?',
        vaihtoehdot: [
          'Nokkaan pantiin yrttejä, joiden uskottiin suojaavan taudilta',
          'Nokka pelotti taudin tiehensä',
          'Lääkäri kantoi nokassa kirjeitä',
          'Nokka auttoi hengittämään sateella',
        ],
        oikea: 0,
        fakta: 'Ruttolääkärit täyttivät nokan kuivatuilla yrteillä ja '
          + 'kukilla, joiden uskottiin puhdistavan hengitysilman. '
          + 'Naamiosta tuli myöhemmin karnevaalin tunnus.',
      },
      aarre: 'Lucia sulki tilauskirjan: "Joku palautti toisen naamion '
        + 'viime keväänä — jätti vain lapun, jossa oli ilmanpaineen '
        + 'lukema." Barometrilukema, aivan kuin isoisän kirjassa.',
    },
    {
      id: 'budapest',
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Linnan alla aukeaa labyrintti, jonka seinät hikoilevat '
        + 'lämmintä vettä, kuin vuori hengittäisi. Vein kynttilän '
        + 'syvimpään käytävään ja löysin seinästä liidulla piirretyn '
        + 'tähtäinristin — oman merkkini, vaikken ollut käynyt täällä '
        + 'eläissäni. Viiva oli terävä, kuin tänään piirretty.',
      henkilo: 'Kylpymestari Márta on kylpylän vanhin kylvettäjä; hänen '
        + 'isoisoäitinsä opetti Horatiolle lämpimän seinän säännön.',
      kohtaaminen: 'Kylpylän ovella kylpymestari Márta koskettaa kirjan kantta '
        + 'kuin vanhaa tuttua. "Isoisoäitini opetti kirjasi omistajalle '
        + 'säännön, jolla linnan alta palataan — sääntö on sinun, kun '
        + 'vastaat hänen kysymykseensä."',
      kysymys: {
        q: 'Labyrintin seinät ovat lämpimät kuin iho. Mikä lämmittää '
          + 'Budapestin maanalaiset käytävät?',
        vaihtoehdot: [
          'Maan alta nousevat kuumat lähteet',
          'Kylpylän kupariputket',
          'Maanalainen tulivuori',
          'Linnan suuret takat',
        ],
        oikea: 0,
        fakta: 'Budapestin alla kumpuaa yli sata kuumaa lähdettä. Sama vesi '
          + 'täyttää kaupungin kuuluisat kylpylät — ja lämmittää '
          + 'linnanalaisen labyrintin seinät.',
      },
      aarre: 'Portilla Márta sanoi: "Isoisoäitinikin pyyhki merkin — silti '
        + 'risti on aamulla aina seinässä, aina samaa valkoista '
        + 'liitua." Katsoin vielä taakseni: käytävä oli tyhjä.',
    },
    {
      id: 'lontoo',
      otsikko: 'Lontoo — kello joka löi sumussa',
      saapuminen: 'Sumu nousi joesta niin sakeana, että kadut sammuivat yksi '
        + 'kerrallaan. Silloin kello löi — mutta ääni ei tullut '
        + 'tornista, vaan joen puolelta, laskuveden paljastamalta '
        + 'liejulta. Menin rantaan ja löysin liejuun puoliksi '
        + 'hautautuneen taskukellon, jonka viisarit seisoivat. Sinä, '
        + 'joka tätä luet: kello käy taas. Kuuntele.',
      henkilo: 'Jokilöytäjä Ned etsii laskuveden liejusta joen pudottamia '
        + 'esineitä, kuten hänen sukunsa on etsinyt sata vuotta.',
      kohtaaminen: 'Rannalla jokilöytäjä Ned punnitsee taskukelloa kädessään. '
        + '"Suvussani sanotaan: joki antaa takaisin sen, minkä omistaja '
        + 'unohti. Tämän kannessa on kaksi kirjainta — H. F. Vastaa '
        + 'kirjan kysymykseen, niin kello on sinun."',
      kysymys: {
        q: 'Kaikki tuntevat nimen Big Ben. Mitä se alun perin '
          + 'tarkoittaa?',
        vaihtoehdot: [
          'Tornin suurinta kelloa',
          'Koko kellotornia',
          'Kellon rakentajaa',
          'Westminsterin palatsin porttia',
        ],
        oikea: 0,
        fakta: 'Big Ben on tornin 13,7 tonnin painoinen suurin kello. Torni '
          + 'itse on nimeltään Elizabeth Tower — mutta kellon nimi '
          + 'tarttui koko torniin.',
      },
      aarre: 'Ned avasi kellon kannen: sisällä oli isoisän käsialalla '
        + 'pelkkä kellonaika — sama, johon viisarit olivat pysähtyneet. '
        + '"Joki ei pysäyttänyt tätä kelloa", Ned sanoi hiljaa. "Joku '
        + 'pysäytti sen tahallaan — ja liejussa oli tuoreet jäljet, kun '
        + 'löysin sen."',
    },
    {
      id: 'pariisi',
      otsikko: 'Pariisi — kirja joka odotti rannalla',
      saapuminen: 'Seinen rannalla kirjalaatikot suljettiin yöksi, mutta yksi '
        + 'kansi jäi raolleen. Sen alla odotti kirja, jonka sivut oli '
        + 'leikattu auki veitsellä — paitsi viimeinen. Kannessa ei '
        + 'ollut nimeä, vain liidulla piirretty tähtäinristi. Ostin '
        + 'kirjan hinnalla, jota myyjä ei suostunut sanomaan ääneen.',
      henkilo: 'Bukinisti Colette myy vanhoja kirjoja Seinen rannalla '
        + 'samasta laatikosta kuin isoisoisänsä.',
      kohtaaminen: 'Colette tunnistaa laatikkonsa liitumerkin yhdellä '
        + 'vilkaisulla. "Isoisoisäni piti yhtä kirjaa, jota ei saanut '
        + 'myydä — sen sai vain antaa sille, joka osaa vastata sen '
        + 'kysymykseen. Kirja on odottanut sataa vuotta. Vastaa."',
      kysymys: {
        q: 'Notre Damen katedraalin seinillä nököttää kivisiä '
          + 'hirviöhahmoja. Mikä tehtävä gargoyleilla oikeasti on?',
        vaihtoehdot: [
          'Ne ovat syöksytorvia, jotka johtavat sadeveden pois seiniltä',
          'Ne pelottivat vihollisia loitolle',
          'Ne kantavat katon painoa',
          'Ne ovat kuninkaiden muotokuvia',
        ],
        oikea: 0,
        fakta: 'Gargoylet ovat koristeltuja syöksytorvia: sadevesi virtaa '
          + 'niiden suun läpi kauas seinästä, ettei kivi rapaudu. Nimi '
          + 'tulee ranskan kurlaamista tarkoittavasta sanasta.',
      },
      aarre: 'Kirjan viimeinen, avaamaton sivu kätki litteän kätkön. '
        + 'Colette leikkasi sivun auki ja vaikeni hetkeksi: "Tämä ei '
        + 'ole isoisoisäni veitsenjälkeä. Joku on avannut kirjan kerran '
        + '— ja ommellut sivun kiinni uudelleen." Lanka oli valkoista, '
        + 'kuin liitu.',
    },
    {
      id: 'berliini',
      otsikko: 'Berliini — kaukoputki joka katsoi tyhjää',
      saapuminen: 'Tähtitornin kupoli oli raollaan, vaikka yö oli pilvinen. '
        + 'Kaukoputki osoitti taivaankohtaan, jossa ei paljain silmin '
        + 'näkynyt mitään — ja messinkiin oli raaputettu lukema, jonka '
        + 'tunsin omakseni. Istuin katsomaan. Pilvet aukesivat '
        + 'hetkeksi, ja tyhjässä kohdassa syttyi sininen piste.',
      henkilo: 'Tähtitornin hoitaja Lotte kirjaa joka yön havainnot kirjaan, '
        + 'jota hänen sukunsa on pitänyt observatorion alusta asti.',
      kohtaaminen: 'Lotte avaa havaintokirjan vuoden 1873 kohdalta. "Tässä: '
        + 'vieras istui kaukoputken ääressä aamuun asti eikä kertonut, '
        + 'mitä etsi. Hän jätti kysymyksen — se on odottanut '
        + 'vastaajaansa siitä yöstä."',
      kysymys: {
        q: 'Yksi planeetta löydettiin ensin kynällä ja paperilla — ja '
          + 'vasta sitten kaukoputkella, juuri Berliinissä. Mikä?',
        vaihtoehdot: [
          'Neptunus',
          'Uranus',
          'Mars',
          'Jupiter',
        ],
        oikea: 0,
        fakta: 'Neptunuksen paikka laskettiin Uranuksen radan '
          + 'heilahduksista, ja Berliinin observatorio löysi sen '
          + 'kaukoputkella 1846 — alle asteen päässä lasketusta kohdasta.',
      },
      aarre: 'Kätkö oli kaukoputken jalustan ontossa jalassa. Lotte selasi '
        + 'kirjan viimeiselle sivulle: "Sama taivaankohta on kirjattu '
        + 'uudelleen viime talvena. Käsiala ei ole minun — eikä kirja '
        + 'ole poistunut tästä huoneesta."',
    },
    {
      id: 'rooma',
      otsikko: 'Rooma — kolikko joka palasi altaaseen',
      saapuminen: 'Trevin allas tyhjennettiin puhdistusta varten, ja pohjalta '
        + 'nousi kolikoiden sade. Yksi kolikko oli muita vanhempi, ja '
        + 'sen reunaan oli viilattu tähtäinristi. Heitin sen takaisin '
        + 'olkapääni yli, niin kuin tapa vaatii — ja kuulin sen osuvan '
        + 'veteen kahdesti.',
      henkilo: 'Suihkulähteenhoitaja Enzo nostaa Trevin kolikot talteen joka '
        + 'viikko, kuten hänen isänsä ja isoisänsä nostivat.',
      kohtaaminen: 'Enzo kääntelee vanhaa kolikkoa hansikkaassa kädessään. "Tämä '
        + 'nousee altaasta joka ainoa viikko, vaikka panen sen aina '
        + 'talteen. Isäni sanoi: älä kysy keneltä, kysy miksi. Vastaa '
        + 'tavan kysymykseen, niin saat pitää sen."',
      kysymys: {
        q: 'Mitä tarun mukaan tapahtuu, kun heittää kolikon Trevin '
          + 'suihkulähteeseen olkapään yli?',
        vaihtoehdot: [
          'Palaat vielä Roomaan',
          'Saat vuoden onnea',
          'Toiveesi toteutuu heti',
          'Löydät aarteen',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan kolikko takaa paluun Roomaan. Kolikot nostetaan '
          + 'oikeasti talteen ja lahjoitetaan hyväntekeväisyyteen — niitä '
          + 'kertyy noin miljoona euroa vuodessa.',
      },
      aarre: 'Kätkö odotti altaan huoltoluukun takana. Enzo saattoi minut '
        + 'portille: "Tajuatko, mitä vanha kolikko tarkoittaa? Joku '
        + 'heitti sen luvatakseen palata — eikä ole vielä palannut. Tai '
        + 'sitten palaa. Joka viikko."',
    },
    {
      id: 'madrid',
      otsikko: 'Madrid — kello joka löi kolmetoista',
      saapuminen: 'Puerta del Solin kello löi keskiyön, ja laskin lyönnit '
        + 'vanhasta tottumuksesta. Niitä oli kolmetoista. Aukiolla '
        + 'kukaan muu ei ollut kuulevinaan — mutta tornin ikkunassa '
        + 'paloi valo, ja varjo kumartui koneiston ylle kuin anteeksi '
        + 'pyytäen.',
      henkilo: 'Kellomestari Pilar hoitaa Puerta del Solin kelloa, jonka '
        + 'mukaan koko Espanja laskee uudenvuoden rypäleensä.',
      kohtaaminen: 'Tornissa Pilar valvoo koneiston vieressä. "Kello ei lyö '
        + 'kolmeatoista — paitsi jos joku lisää lyönnin käsin. '
        + 'Suvussani sanotaan, että se on viesti. Vastaa kysymykseen, '
        + 'niin näytän, mihin viesti osoittaa."',
      kysymys: {
        q: 'Mitä madridilaiset tekevät, kun tämä kello lyö kaksitoista '
          + 'kertaa uudenvuodenyönä?',
        vaihtoehdot: [
          'Syövät viinirypäleen joka lyönnillä',
          'Soittavat kaikkia kirkonkelloja',
          'Sytyttävät kaksitoista kynttilää',
          'Heittävät kolikon suihkulähteeseen',
        ],
        oikea: 0,
        fakta: 'Uudenvuoden tapa on syödä kaksitoista rypälettä, yksi joka '
          + 'lyönnillä — onneksi jokaiselle kuukaudelle. Tapa levisi '
          + 'Madridista koko maahan.',
      },
      aarre: 'Kolmastoista lyönti oli viesti: se osoitti koneiston '
        + 'huoltotilaan, jossa kätkö odotti. Pilar sammutti tornin '
        + 'valon: "Lyönti lisättiin koneistoon kauan ennen minua. Mutta '
        + 'joku kävi virittämässä sen uudelleen — tänä keväänä."',
    },
    {
      id: 'ateena',
      otsikko: 'Ateena — pöllö joka vartioi rahaa',
      saapuminen: 'Akropoliin juurella pöllö istui kaatuneella pylväällä ja '
        + 'katsoi minua liikahtamatta, kuin olisi odottanut. Sen jalan '
        + 'alla kiilsi hopearaha — vanhempi kuin mikään näkemäni. Kun '
        + 'kumarruin, pöllö ei lentänyt pois. Se siirtyi askeleen ja '
        + 'jäi katsomaan, mitä tekisin.',
      henkilo: 'Marmorinveistäjä Nikos korjaa Akropoliin pylväitä ja tuntee '
        + 'jokaisen kiven — ja rahan, jota siellä vartioidaan.',
      kohtaaminen: 'Nikos laskee talttansa nähdessään rahan. "Isoisoisäni löysi '
        + 'samanlaisen ja pani sen takaisin — hän sanoi, että pöllö '
        + 'laskee ne. Kirjasi omistaja tiesi rahasta. Vastaa hänen '
        + 'kysymykseensä, niin raha ei jää vartioimatta."',
      kysymys: {
        q: 'Minkä linnun muinaiset ateenalaiset löivät hopearahoihinsa?',
        vaihtoehdot: [
          'Pöllön',
          'Kotkan',
          'Riikinkukon',
          'Joutsenen',
        ],
        oikea: 0,
        fakta: 'Ateenan tetradrakmassa oli Athene-jumalattaren pöllö, '
          + 'viisauden merkki. "Viedä pöllöjä Ateenaan" tarkoittaa yhä '
          + 'turhaa työtä — niitä oli siellä jo valmiiksi.',
      },
      aarre: 'Kätkö oli pylvään onkalossa, rahan alla. Nikos katsoi ylös '
        + 'rinteeseen: "Pöllö on istunut samalla pylväällä joka ilta '
        + 'niin kauan kuin suku muistaa. Kukaan ei tiedä, kuka sitä '
        + 'ruokkii."',
    },
  ],
};
