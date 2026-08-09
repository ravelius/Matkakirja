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
 * git-historiassa. Omistaja hyväksyi mallin ja tilasi koko Euroopan
 * ("Tekstit hyvät. Tee ja generoi kaikki Eurooppaan") — luennat
 * generoidaan tools/generoi-kaari.mjs:llä sitä mukaa kuin erät
 * valmistuvat.
 */
export const KAARI_PAKETIT = {
  johdanto: 'Koko Euroopan tarinakaari: 41 kohdetta, kolme osaa kutakin '
    + 'kohti — isoisän matkakirjamerkintä saapumisesta, '
    + 'KOHTAAMINEN jossa henkilö esittää isoisän jättämän '
    + 'kysymyksen (oikea visakysymys vaihtoehtoineen mukana, jotta '
    + 'parin sopivuuden näkee) ja AARRE, jonka päättää auki jäävä '
    + 'vihje. Vihjeet kietoutuvat yhteen: joku pitää isoisän jälkiä '
    + 'yllä vielä tänäänkin. Saapuminen, kohtaaminen ja aarre '
    + 'luetaan ääneen — kysymys jää pelaajan visaksi.',
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
    {
      id: 'lissabon',
      otsikko: 'Lissabon — laatta jota ei poltettu loppuun',
      saapuminen: 'Belémin tornin juurella odotin laskuvettä. Vartija vannoi, '
        + 'että torni seisoo joessa siksi, että joki siirtyi — ei '
        + 'torni. Kivessä, vedenrajan alla, oli rengas, ja renkaassa '
        + 'tuoretta köyttä. Nousuvesi peitti sen silmissäni. Sinä, joka '
        + 'tätä luet: laske vesi, niin näet minne köysi johtaa.',
      henkilo: 'Laattamestari Inês polttaa sinivalkoisia azulejo-laattoja '
        + 'samassa uunissa kuin sukunsa kolmesataa vuotta.',
      kohtaaminen: 'Työpajassa laattamestari Inês pyyhkii savipölyn käsistään. '
        + '"Isoisäsi tilasi suvultani yhden laatan — ja kielsi '
        + 'polttamasta sitä valmiiksi, ennen kuin joku palaa hakemaan. '
        + 'Vastaa hänen kysymykseensä, niin sytytän uunin."',
      kysymys: {
        q: 'Lissabonin talojen seinät hohtavat sinivalkoisina. Mitä ovat '
          + 'azulejot?',
        vaihtoehdot: [
          'Maalattuja kaakelilaattoja, jotka päällystävät kokonaisia '
            + 'taloja',
          'Sinisiksi värjättyjä ikkunaluukkuja',
          'Meren heijastuksia valkoisessa kivessä',
          'Purjeista ommeltuja seinävaatteita',
        ],
        oikea: 0,
        fakta: 'Azulejo on tinalasitettu kaakelilaatta. Nimi tulee arabian '
          + 'sanasta az-zulayj, \'kiillotettu kivi\' — laatat viilentävät '
          + 'taloja ja kertovat seinillä kokonaisia tarinoita.',
      },
      aarre: 'Laatta halkesi uunissa kahtia, ja sauman sisältä putosi '
        + 'kätkö. Inês tutki puolikkaita kauan: "Kuvio jatkuu laatalla, '
        + 'jota minun uunissani ei ole koskaan poltettu. Jossain on '
        + 'toinen uuni."',
    },
    {
      id: 'amsterdam',
      otsikko: 'Amsterdam — arkku väärässä kerroksessa',
      saapuminen: 'Kanavan varrella talot nojaavat eteenpäin kuin kuuntelisivat '
        + 'vettä. Yhden päätykolmiossa riippui nostokoukku, ja koukussa '
        + 'köysi keskellä yötä — vaikka muuttopäivä ei ollut. Köyden '
        + 'päässä laskeutui ikkunani ohi arkku, joka pysähtyi '
        + 'täsmälleen minun ikkunani kohdalle. Arkussa ei ollut lukkoa, '
        + 'vain lappu: väärä kerros.',
      henkilo: 'Siltavahti Willem vetää kammella auki saman kääntösillan, '
        + 'jota hänen sukunsa on avannut purjeille sukupolvien ajan.',
      kohtaaminen: 'Sillalla Willem lukitsee kammen ja kääntyy. "Kirjaan on '
        + 'merkitty jokainen vene, jolle suku on avannut sillan — '
        + 'isoisäsi vene kulki läpi kahdesti, mutta palasi vain kerran. '
        + 'Vastaa hänen kysymykseensä, niin luet loput itse."',
      kysymys: {
        q: 'Amsterdamin vanhojen talojen päädyssä on melkein aina koukku '
          + 'katonrajassa. Mitä varten?',
        vaihtoehdot: [
          'Huonekalut nostetaan sisään ikkunoista, koska portaat ovat '
            + 'liian kapeat',
          'Siihen ripustettiin lyhty pimeän ajaksi',
          'Laivojen köydet kiinnitettiin siihen tulvalla',
          'Koukusta roikotettiin kauppiaan vaakaa',
        ],
        oikea: 0,
        fakta: 'Kapeat talot verotettiin leveyden mukaan, joten portaista '
          + 'tehtiin jyrkkiä ja ahtaita — sohvat ja kaapit hilataan yhä '
          + 'koukun ja köyden varassa sisään ikkunoista.',
      },
      aarre: 'Kätkö odotti sillan kammiossa, öljykankaaseen käärittynä. '
        + 'Willem osoitti kirjan viimeistä riviä: "Joku on avauttanut '
        + 'sillan isoisäsi veneen nimellä — viime keväänä."',
    },
    {
      id: 'dublin',
      otsikko: 'Dublin — lantti joka odotti maksajaansa',
      saapuminen: 'Ylitin joen sillalla, josta perittiin puolen pennin maksu. '
        + 'Vartija mainitsi miehen, joka maksaa joka vuosi yhden '
        + 'ylityksen — mutta ei koskaan ylitä. Maksut on kirjattu '
        + 'vihkoon, jonka kanteen on painettu barometri. Sinä, joka '
        + 'tätä luet: se ylitys on maksettu sinulle.',
      henkilo: 'Sillanvartija Molly kerää puolen pennin lantit samaan '
        + 'nahkakukkaroon kuin isoisoisänsä aikanaan.',
      kohtaaminen: 'Sillan korvassa Molly punnitsee lanttia sormissaan. '
        + '"Kukkarossa on yksi lantti, jota en saa laskea kassaan — se '
        + 'odottaa maksajan sukua. Vastaa kirjan kysymykseen, niin '
        + 'ylitys on sinun."',
      kysymys: {
        q: 'Dublinin rautainen jalankulkusilta tunnetaan nimellä '
          + 'Ha\'penny Bridge. Mistä nimi tulee?',
        vaihtoehdot: [
          'Ylityksestä perittiin puolen pennin maksu',
          'Silta maksoi rakentaa puoli penniä metriltä',
          'Sillan kaari on pennin kolikon muotoinen',
          'Rakentajan nimi oli Halfpenny',
        ],
        oikea: 0,
        fakta: 'Silta avattiin 1816, ja ylitys maksoi puoli penniä — saman '
          + 'verran kuin lautturi oli ottanut. Maksu poistui vasta 1919, '
          + 'mutta nimi jäi.',
      },
      aarre: 'Lantin alta, kukkaron saumasta, löytyi taitettu kätkö. Molly '
        + 'käänsi lanttia valossa: "Tämä on lyöty vuonna, jota ei vielä '
        + 'ollut, kun isoisoisäni sai kukkaron." Jäin miettimään, kuka '
        + 'kukkaroa on täyttänyt.',
    },
    {
      id: 'edinburgh',
      otsikko: 'Edinburgh — tykki joka löi sekunnin väärin',
      saapuminen: 'Linnan kalliolla tykki jyrähti täsmälleen yhdeltä, ja '
        + 'kaupungin kellot vastasivat sille. Kirkkomaalla pieni koira '
        + 'vartioi hautaa, jolta joku oli juuri korjannut kuihtuneet '
        + 'kukat pois — vaikka vartija vannoi, ettei portista ollut '
        + 'kulkenut ketään. Koira ei suostunut lähtemään. Minä jäin sen '
        + 'viereen istumaan.',
      henkilo: 'Tykkimestari Ewan lataa linnan yhden lyönnin tykin joka '
        + 'päivä, kuten isoisänsä ennen häntä.',
      kohtaaminen: 'Vallilla tykkimestari Ewan kuuraa piippua. "Isoisäsi seisoi '
        + 'tässä kellonsa kanssa ja vertasi lyöntiä tykkiimme — kirjasi '
        + 'mukaan ne erosivat sekunnilla. Vastaa hänen kysymykseensä, '
        + 'niin näytän, kumpi kävi edellä."',
      kysymys: {
        q: 'Edinburghin linnasta ammutaan tykinlaukaus joka päivä. Mihin '
          + 'aikaan — ja miksi juuri silloin?',
        vaihtoehdot: [
          'Kello yhdeltä, koska yksi laukaus on halvempi kuin '
            + 'kaksitoista',
          'Keskipäivällä, kun aurinko on korkeimmillaan',
          'Auringonlaskun aikaan vartion vaihtuessa',
          'Aamukuudelta koko kaupungin herätykseksi',
        ],
        oikea: 0,
        fakta: 'Laivat tarvitsivat tarkan ajan kellojensa asettamiseen. '
          + 'Skotlantilaisen säästäväisyyden sanotaan ratkaisseen '
          + 'ajankohdan: yhdeltä riittää yksi laukaus — keskipäivällä '
          + 'olisi tarvittu kaksitoista.',
      },
      aarre: 'Kätkö oli muurattu vallin kiveen tykin taakse. Ewan luki '
        + 'mukana olleen lapun ja hiljeni: "Tässä pyydetään öljyämään '
        + 'erästä lukkoa kerran vuodessa. Suku on öljynnyt — mutta '
        + 'kukaan ei tiedä, minkä oven lukko se on."',
    },
    {
      id: 'barcelona',
      otsikko: 'Barcelona — lohikäärme ja tuore ruusu',
      saapuminen: 'Goottilaiskorttelin kujat kapenivat, kunnes taivas oli enää '
        + 'viiva. Erään portin yllä lohikäärmeen kivinen pää työntyi '
        + 'seinästä, ja sen hampaissa riippui kuihtunut ruusu — vaikka '
        + 'ruusujen päivästä oli kuukausia. Portinvartija sanoi, että '
        + 'ruusu vaihtuu tuoreeseen joka vuosi samana yönä. Kukaan ei '
        + 'ole nähnyt vaihtajaa.',
      henkilo: 'Kirjansitoja Mercè sitoo kirjoja kujalla, jolla hänen '
        + 'sukunsa on myynyt ruusuja ja kirjoja pyhän Jordin päivänä '
        + 'sata vuotta.',
      kohtaaminen: 'Mercè nostaa katseensa neulasta ja langasta. "Isoisäsi jätti '
        + 'suvulleni kirjan sidottavaksi — ja käski antaa sen vain '
        + 'sille, joka tietää, miksi tässä kaupungissa lohikäärme '
        + 'kantaa ruusua. Vastaa, niin saat sidoksen."',
      kysymys: {
        q: 'Barcelonan suojeluspyhimys on lohikäärmeen kaatanut Sant '
          + 'Jordi. Miten hänen päiväänsä juhlitaan huhtikuussa?',
        vaihtoehdot: [
          'Lahjoittamalla toisille ruusuja ja kirjoja',
          'Polttamalla lohikäärmeen kuvia kokoissa',
          'Uimalla meressä auringonnousun aikaan',
          'Rakentamalla toreille ihmistorneja',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan lohikäärmeen verestä kasvoi ruusupensas. Sant '
          + 'Jordin päivänä 23. huhtikuuta kadut täyttyvät ruusu- ja '
          + 'kirjakojuista — se on kirjan ja rakkauden juhla.',
      },
      aarre: 'Sidoksen selkämys kätki ontelon, ja ontelossa odotti kätkö — '
        + 'ja tuoreen ruusun terälehti. Mercè katsoi kujalle: "Ruusujen '
        + 'päivään on puoli vuotta. Tämä on poimittu tänä aamuna."',
    },
    {
      id: 'granada',
      otsikko: 'Granada — vesi joka näyttää tien',
      saapuminen: 'Alhambran muurien alla vesi juoksee kouruissa yötä päivää, '
        + 'ja sen solina kuuluu joka huoneeseen. Laskin suihkulähteen '
        + 'altaita: niitä oli kaksitoista, ja viimeisen pohjalla '
        + 'kimalsi jotain, minkä joku oli asettanut osoittamaan ylös — '
        + 'kohti tornia, jonka ikkunassa paloi valo. Tornin piti olla '
        + 'tyhjä.',
      henkilo: 'Vesimestari Yusuf avaa ja sulkee Alhambran vanhat vesikourut '
        + 'samoilla avaimilla kuin sukunsa vuosisatojen ajan.',
      kohtaaminen: 'Kourun äärellä Yusuf kuuntelee veden ääntä kuin kelloa. '
        + '"Vesi kertoo, jos joku liikkuu palatsissa — isoisäsi '
        + 'opetteli kuuntelemaan sitä sukuni kanssa. Vastaa hänen '
        + 'kysymykseensä, niin ohjaan veden näyttämään tien."',
      kysymys: {
        q: 'Punertava linnoitus Alhambra kohoaa Granadan yllä. Mitä sen '
          + 'nimi tarkoittaa?',
        vaihtoehdot: [
          'Punaista — arabiaksi al-hamra',
          'Korkeaa puutarhaa',
          'Tuhannen lähteen taloa',
          'Viimeistä huokausta',
        ],
        oikea: 0,
        fakta: 'Al-qal\'a al-hamra tarkoittaa punaista linnaa: iltavalossa '
          + 'muurit hehkuvat punertavina. Sisällä vesi virtaa yhä '
          + 'kanavissa, jotka rakennettiin seitsemänsataa vuotta sitten.',
      },
      aarre: 'Kourujen risteyksessä veden alla odotti kivinen rasia. Yusuf '
        + 'punnitsi sitä kädessään: "Vesi olisi kuluttanut tämän '
        + 'sileäksi sadassa vuodessa — mutta särmät ovat terävät. Se on '
        + 'laskettu veteen hiljattain."',
    },
    {
      id: 'marseille',
      otsikko: 'Marseille — saari josta palataan tarinoissa',
      saapuminen: 'Sataman edustalla saari nousi merestä kuin kivinen laiva, ja '
        + 'sen linnan ikkunat tuijottivat takaisin. Soutaja kieltäytyi '
        + 'ensin viemästä minua — sanoi, että saarelta palataan vain '
        + 'tarinoissa. Muurin juurella, vedenrajassa, kiveen oli '
        + 'hakattu nuoli, joka osoitti alaspäin veden alle. Vuosiluku '
        + 'sen vieressä oli tuore.',
      henkilo: 'Soutaja Baptiste kuljettaa kalastajia satamasta ja tuntee '
        + 'Ifin saaren virtaukset paremmin kuin kukaan.',
      kohtaaminen: 'Airojen välissä Baptiste lepuuttaa käsiään. "Isäni isä souti '
        + 'isoisäsi saarelle ja odotti häntä kaksi vuorokautta. '
        + 'Paluumatkalla veneessä oli yksi arkku enemmän. Vastaa kirjan '
        + 'kysymykseen, niin soudan sinut samaa reittiä."',
      kysymys: {
        q: 'Ifin linnoitussaari Marseillen edustalla tunnetaan '
          + 'kaikkialla yhden kirjan ansiosta. Minkä?',
        vaihtoehdot: [
          'Monte-Criston kreivin',
          'Kolmen muskettisoturin',
          'Kurjien',
          'Aarresaaren',
        ],
        oikea: 0,
        fakta: 'Alexandre Dumas\'n Monte-Criston kreivissä Edmond Dantès '
          + 'istuu Ifin tyrmässä neljätoista vuotta ja pakenee ainoana. '
          + 'Tarina teki vankilasaaresta kuuluisan — moni etsii yhä '
          + 'Dantèsin selliä.',
      },
      aarre: 'Nuolen alta, laskuveden paljastamasta kolosta, nousi arkku. '
        + 'Baptiste katsoi merelle: "Tämä on kevyempi kuin se, jonka '
        + 'isäni isä souti maihin. Jossain on toinen arkku — ja se, '
        + 'joka jakoi lastin kahtia."',
    },
    {
      id: 'varsova',
      otsikko: 'Varsova — verkko joka painoi',
      saapuminen: 'Joen rannassa kalastajat vetivät verkkonsa tyhjinä, mutta '
        + 'yksi verkko painoi. Sen silmiin oli takertunut vaakuna, '
        + 'kilpi ja miekka — kaupungin oma merkki, mereneidon aseet. '
        + 'Vanhin kalastajista risti kätensä ja sanoi, että verkko on '
        + 'sama, jolla hänen sukunsa vapautti mereneidon aikojen '
        + 'alussa. Ja että velka on yhä maksamatta.',
      henkilo: 'Kalastaja Jadwiga paikkaa verkkoja Veikselin rannalla ja '
        + 'laulaa työlauluja, joita ei osaa enää kukaan muu.',
      kohtaaminen: 'Jadwiga solmii verkon silmää katsettaan nostamatta. '
        + '"Suvussani sanotaan: mereneito lupasi puolustaa kaupunkia, '
        + 'koska kalastaja päästi hänet vapaaksi. Isoisäsi kirjoitti '
        + 'lupauksen muistiin. Vastaa hänen kysymykseensä, niin kerron '
        + 'minne."',
      kysymys: {
        q: 'Varsovan vaakunassa on syrenka, mereneito. Mitä hän pitää '
          + 'käsissään?',
        vaihtoehdot: [
          'Miekkaa ja kilpeä',
          'Verkkoa ja airoa',
          'Avainta ja kruunua',
          'Kalaa ja helminauhaa',
        ],
        oikea: 0,
        fakta: 'Varsovan mereneito on kaupungin puolustaja: kohotettu miekka '
          + 'ja kilpi. Tarun mukaan kalastaja vapautti hänet verkosta, ja '
          + 'kiitokseksi hän lupasi suojella kaupunkia.',
      },
      aarre: 'Kätkö oli upotettu rantakiven alle verkonpainojen sekaan. '
        + 'Jadwiga laski sen käteeni ja katsoi jokea: "Painot ovat '
        + 'sukuni valamia — paitsi yksi. Sen valoi joku, joka halusi '
        + 'kätkön löytyvän juuri nyt."',
    },
    {
      id: 'krakova',
      otsikko: 'Krakova — sävel joka katkeaa kesken',
      saapuminen: 'Torin ylle, tornin ikkunasta, nousi torvensoitto — ja '
        + 'katkesi kesken sävelen, kuin veitsellä leikaten. Väki jatkoi '
        + 'kulkuaan, mutta minä jäin laskemaan: soitto katkesi joka '
        + 'tunti täsmälleen samalla nuotilla. Paitsi keskiyöllä. '
        + 'Silloin torvi soitti sävelen loppuun asti, eikä torilla '
        + 'ollut ketään muuta kuulemassa.',
      henkilo: 'Tornintorvensoittaja Stanisław soittaa hejnałin joka tunti '
        + 'neljään ilmansuuntaan, kuten soittajat ennen häntä '
        + 'vuosisatojen ajan.',
      kohtaaminen: 'Tornin portaissa Stanisław pitelee torvea kainalossaan. '
        + '"Isoisäsi kysyi minun isoisältäni, miksi sävel katkeaa — ja '
        + 'jätti vastauksen sijaan kysymyksen. Vastaa siihen, niin '
        + 'soitan sinulle sen, mitä muut eivät kuule."',
      kysymys: {
        q: 'Krakovan tornista soitetaan joka tunti hejnał-kutsu, joka '
          + 'katkeaa aina kesken. Miksi?',
        vaihtoehdot: [
          'Tarun mukaan nuoli osui soittajaan kesken varoitussoiton',
          'Sävelen loppua ei ole koskaan sävelletty',
          'Torni on niin korkea, ettei soittajan henki riitä',
          'Kaupunki ei aikoinaan maksanut koko sävelestä',
        ],
        oikea: 0,
        fakta: 'Tarina kertoo vartijasta, joka näki vihollisen lähestyvän ja '
          + 'soitti hälytyksen — nuoli katkaisi soiton kesken. Hänen '
          + 'kunniakseen hejnał katkeaa yhä samassa kohdassa.',
      },
      aarre: 'Soittajan penkin alta, hirren sisästä, löytyi kapea lipas. '
        + 'Stanisław avasi sen ja veti esiin nuotin: "Tämä on hejnałin '
        + 'loppu — käsin kirjoitettuna. Mutta käsiala ei ole yhdenkään '
        + 'soittajan, jonka suku muistaa."',
    },
    {
      id: 'alpit',
      otsikko: 'Alpit — koira joka muisti hajun',
      saapuminen: 'Solassa lumi ulottui heinäkuussa polviin, ja luostarin '
        + 'koirat juoksivat edellä varmoin askelin. Yksi niistä '
        + 'pysähtyi kinoksen ääreen eikä suostunut jatkamaan. Kinoksen '
        + 'alta paljastui matkalaukku, jonka messinkikulmiin oli '
        + 'kaiverrettu barometrin kuva. Munkit sanoivat, ettei kukaan '
        + 'ollut ilmoittanut kadottaneensa mitään. Ei sinä vuonna, eikä '
        + 'sitä ennen.',
      henkilo: 'Luostarinveli Anselm kasvattaa pelastuskoiria vuoristosolan '
        + 'hospitsissa, kuten veljet ennen häntä vuosisatojen ajan.',
      kohtaaminen: 'Hospitsin ovella veli Anselm pitelee koiraa kauluksesta. '
        + '"Tämä koira polveutuu siitä, joka kaivoi isoisäsi laukun '
        + 'lumesta. Suku muistaa hajun, meillä sanotaan. Vastaa kirjan '
        + 'kysymykseen, niin annan sen näyttää, minkä hajun se '
        + 'muistaa."',
      kysymys: {
        q: 'Alppien solissa pelastustyötä tekivät kuuluisat '
          + 'bernhardilaiskoirat. Mistä ne tunnetaan?',
        vaihtoehdot: [
          'Ne etsivät lumeen eksyneitä ja hautautuneita kulkijoita',
          'Ne vetivät postirekiä solan yli',
          'Ne vartioivat luostarin aarrekammiota',
          'Ne paimensivat vuohia jyrkänteillä',
        ],
        oikea: 0,
        fakta: 'Pyhän Bernhardin solan munkit kasvattivat koiria, jotka '
          + 'löysivät lumivyöryyn hautautuneet hajun perusteella. '
          + 'Kuuluisin, Barry, pelasti tarinan mukaan yli neljäkymmentä '
          + 'ihmistä.',
      },
      aarre: 'Koira kaivoi kätkön esiin kiviröykkiön juurelta. Anselm '
        + 'silitti sen päätä ja sanoi hitaasti: "Se ei kaivanut hajun '
        + 'takia. Röykkiön kivet on ladottu uudelleen — tänä kesänä."',
    },
    {
      id: 'sisilia',
      otsikko: 'Sisilia — nukke jonka tarinaa ei esitetty',
      saapuminen: 'Tulivuori savusi taivaanrantaan kuin hengittäisi, ja '
        + 'rannassa mustat kivipaadet nousivat merestä. Kalastajat '
        + 'sanoivat niitä kykloopin heittämiksi. Yhden paaden laelle '
        + 'joku oli latonut pienistä kivistä keon — merimerkin, jota ei '
        + 'ole missään kartassa. Soudin sen ohi kahdesti. Keko osoitti '
        + 'suoraan kohti satamaa, josta olin tullut.',
      henkilo: 'Nukketeatterin mestari Rosalia liikuttaa ritarinukkeja, '
        + 'joiden haarniskat hänen sukunsa on takonut neljässä '
        + 'polvessa.',
      kohtaaminen: 'Näyttämön takana Rosalia ripustaa ritarin naulaansa. '
        + '"Isoisäsi istui katsomossa kolme iltaa peräkkäin — ja '
        + 'neljäntenä hän toi meille nuken, jonka tarinaa ei ole vielä '
        + 'esitetty. Vastaa hänen kysymykseensä, niin nostan sen '
        + 'naulasta."',
      kysymys: {
        q: 'Sisilian yllä kohoaa savuava Etna. Mikä se on?',
        vaihtoehdot: [
          'Euroopan korkein toimiva tulivuori',
          'Sammunut tulivuori, jonka huipulla on järvi',
          'Saaren korkein hiekkadyyni',
          'Vanha kaivos, joka savuaa yhä',
        ],
        oikea: 0,
        fakta: 'Etna on yli 3300 metriä korkea ja purkautuu yhä vähän väliä. '
          + 'Tarun mukaan sen alla makaa jättiläinen, jonka kääntyilystä '
          + 'maa järisee — tuhka tekee rinteiden viinitarhoista reheviä.',
      },
      aarre: 'Nuken haarniskan alla, puurungon ontelossa, odotti kätkö. '
        + 'Rosalia käänsi nukkea valoon: "Haarniska on sukuni takoma — '
        + 'mutta joku on kiillottanut sen. Naulassa ei kiillä mikään '
        + 'muu."',
    },
    {
      id: 'kreeta',
      otsikko: 'Kreeta — lanka joka jatkuu pimeään',
      saapuminen: 'Vuoren rinteessä luola haarautui käytäviksi, ja opas '
        + 'kieltäytyi jatkamasta ilman lankaa. Sidoimme kerän suulle ja '
        + 'laskeuduimme. Käytävän seinässä, syvällä pimeässä, oli '
        + 'koukku — ja koukussa toisen langan pää, vanha ja '
        + 'haurastunut. Joku oli kulkenut täällä lankansa varassa kauan '
        + 'ennen meitä. Hänen keränsä oli kelattu takaisin.',
      henkilo: 'Paimen Eleni tuntee vuoren luolat lampaidensa ansiosta ja '
        + 'kehrää lankansa itse, kuten äitinsä ja tämän äiti.',
      kohtaaminen: 'Luolan suulla Eleni punnitsee lankakerää kädessään. '
        + '"Isoisäsi osti sukuni lankaa kaksi kerää — ja palautti vain '
        + 'toisen. Vastaa hänen kysymykseensä, niin annan sinulle '
        + 'kolmannen."',
      kysymys: {
        q: 'Kreetan tarustossa Theseus selvisi Minotauroksen sokkelosta '
          + 'Ariadnen avulla. Mikä Ariadnen keino oli?',
        vaihtoehdot: [
          'Lankakerä, jonka jälkiä pitkin pääsi takaisin ulos',
          'Kartta sokkelon käytävistä',
          'Soihtu, joka ei koskaan sammunut',
          'Taikahuilu, joka nukutti hirviön',
        ],
        oikea: 0,
        fakta: 'Ariadne antoi Theseukselle lankakerän: pää sidottiin ovelle '
          + 'ja kerä purkautui matkalla. Paluutie löytyi lankaa '
          + 'seuraamalla — siksi johtolankaa sanotaan yhä langaksi.',
      },
      aarre: 'Vanhan langan päästä, kiven kolosta, löytyi kätkö. Eleni '
        + 'kelasi haurasta lankaa sormelleen: "Solmu on sukuni solmu. '
        + 'Mutta lanka jatkuu syvemmälle — ja jatko on kehrätty tänä '
        + 'vuonna."',
    },
    {
      id: 'dubrovnik',
      otsikko: 'Dubrovnik — yhdeksässadas askel',
      saapuminen: 'Muurit kiersivät kaupungin kuin kivinen laine, ja portilla '
        + 'vartija tarkasti tulijat. Muurinvierustalla, pienessä '
        + 'syvennyksessä, irvisti kivinen naama, jonka päälle '
        + 'hyppääminen tuo tarun mukaan onnea. Naaman viereen oli '
        + 'liidulla piirretty nuoli, joka osoitti muurille päin. '
        + 'Edellisyönä oli satanut. Nuoli oli silti terävä.',
      henkilo: 'Muurinvartija Ivo kävelee muurin kehän joka ilta ja laskee '
        + 'askeleensa, kuten vartijat vapaan tasavallan ajoista.',
      kohtaaminen: 'Portin holvissa Ivo laskee avainrengastaan. "Kirjassa lukee, '
        + 'että isoisäsi käveli kehän isoisäni kanssa ja pysähtyi '
        + 'yhdeksännelläsadalla askeleella. Vastaa hänen kysymykseensä, '
        + 'niin pysähdymme samassa kohdassa."',
      kysymys: {
        q: 'Dubrovnik oli vuosisatoja pieni vapaa tasavalta suurten '
          + 'valtojen välissä. Mikä sana sen lipussa luki?',
        vaihtoehdot: [
          'Libertas — vapaus',
          'Fortuna — onni',
          'Veritas — totuus',
          'Victoria — voitto',
        ],
        oikea: 0,
        fakta: 'Ragusan tasavallan lipussa luki Libertas. Kaupunki piti '
          + 'vapautensa taidolla ja kaupankäynnillä, ei sodilla — ja sen '
          + 'muurit ovat silti Euroopan vahvimpia.',
      },
      aarre: 'Yhdeksässadas askel osui kiveen, joka kääntyi saranoillaan. '
        + 'Ivo veti onkalosta kätkön — ja lyhdyn, jonka lasi oli yhä '
        + 'lämmin. "Kehällä ei öisin kulje kukaan muu kuin minä. Ei '
        + 'ainakaan pitänyt kulkea."',
    },
    {
      id: 'sarajevo',
      otsikko: 'Sarajevo — kaivo joka kutsuu takaisin',
      /*
       * QA-korjaus 9.8.2026 (Sonnet 1): torilla EI ollut kaivoa 1873 —
       * vanha Sebilj paloi 1852 ja nykyinen rakennettiin vasta 1891.
       * Isoisä kuulee siksi PALANEEN kaivon tarinan sepältä; nykyhetken
       * kohtaaminen, visa ja aarre koskevat torilla tänään seisovaa
       * kaivoa, joten ne pysyvät ennallaan.
       */
      saapuminen: 'Basaarin kujat soivat: sepät takoivat kuparia, ja jokainen '
        + 'vasara löi omaa tahtiaan. Vanha seppä kertoi torin '
        + 'kaivosta, joka oli palanut ennen hänen aikaansa: joka siitä '
        + 'joi, palasi vielä kaupunkiin. Kaivoa ei enää ole, sanoin. '
        + 'Tarina ei palanut, seppä vastasi ja ojensi kupin vettä. '
        + 'Kupin pohjassa oli kaksi kaiverrettua kirjainta, jotka '
        + 'tunnen: H. F.',
      henkilo: 'Kupariseppä Emir takoo kannuja ja kuppeja kujalla, jolla '
        + 'hänen sukunsa paja on soinut kolmesataa vuotta.',
      kohtaaminen: 'Pajan ovella Emir kääntelee kuparilevyä pihdeissään. '
        + '"Isoisäsi tilasi sukuni pajasta kaksi kuppia — toisen hän '
        + 'vei, toinen jäi odottamaan. Vastaa hänen kysymykseensä, niin '
        + 'haen sen hyllyltä."',
      kysymys: {
        q: 'Sarajevon torilla seisoo puinen sebilj-kaivo. Mitä siitä '
          + 'juovalle tarun mukaan tapahtuu?',
        vaihtoehdot: [
          'Hän palaa vielä kerran Sarajevoon',
          'Hän oppii ymmärtämään lintujen kieltä',
          'Hän ei enää koskaan eksy kujilla',
          'Hänen väsymyksensä katoaa saman tien',
        ],
        oikea: 0,
        fakta: 'Sebilj on kaivo, josta jaettiin vettä janoisille '
          + 'kulkijoille. Tarun mukaan sen vettä juonut palaa kaupunkiin '
          + 'vielä kerran — siksi moni matkalainen juo kupillisen '
          + 'lähtiäisiksi.',
      },
      aarre: 'Kupin kaksoispohjan välissä odotti litteä kätkö. Emir piteli '
        + 'kuppia valossa ja kurtisti kulmiaan: "Pohja on juotettu auki '
        + 'ja kiinni kahdesti. Jälkimmäinen juotos ei ole sukuni '
        + 'kättä."',
    },
    {
      id: 'sofia',
      otsikko: 'Sofia — lähde joka kirjattiin sata vuotta',
      saapuminen: 'Keskellä kaupunkia maa hönkäisi lämmintä: lähde kumpusi '
        + 'kuumana kivialtaaseen, ja ihmiset jonottivat kannuineen '
        + 'höyryssä. Altaan reunalla istui mies, joka ei täyttänyt '
        + 'kannua — hän piti kädessään lämpömittaria ja kirjoitti '
        + 'lukemia vihkoon. Kun lähestyin, hän oli poissa. Vihko jäi. '
        + 'Viimeisellä sivulla luki minun nimeni.',
      henkilo: 'Lähteenvartija Nadia täyttää kaupunkilaisten kannut kuumasta '
        + 'lähteestä ja tuntee jokaisen suonen kaupungin alla.',
      kohtaaminen: 'Höyryn keskellä Nadia laskee kauhansa. "Vihko on sukuni '
        + 'pitämä — isoisäsi maksoi siitä, että lähteen lämpö kirjataan '
        + 'joka viikko sadan vuoden ajan. Viikkoja on jäljellä yksi. '
        + 'Vastaa hänen kysymykseensä, niin kirjaamme viimeisen '
        + 'yhdessä."',
      kysymys: {
        q: 'Sofia on kasvanut paikalle, jossa maasta kumpuaa jotain '
          + 'harvinaista keskellä kaupunkia. Mitä?',
        vaihtoehdot: [
          'Kuumaa lähdevettä',
          'Kultahiekkaa',
          'Jääkylmää vuoristojokea',
          'Suolaa',
        ],
        oikea: 0,
        fakta: 'Sofian alla virtaa kymmeniä kuumia mineraalilähteitä — '
          + 'roomalaiset rakensivat kylpylänsä tänne juuri niiden takia. '
          + 'Keskustan hanoista saa yhä lämmintä lähdevettä ilmaiseksi.',
      },
      aarre: 'Viimeisen lukeman kohdalle vihkon sivujen väliin oli ommeltu '
        + 'kätkö. Nadia vertasi rivejä pitkään: "Sata vuotta lukemia — '
        + 'mutta joka kymmenes rivi on kirjoitettu samalla musteella. '
        + 'Tuoreella."',
    },
    {
      id: 'bukarest',
      otsikko: 'Bukarest — kello joka löi itsestään',
      saapuminen: 'Kukkulan pienen kirkon kello löi yhden lyönnin, kun astuin '
        + 'portista — ja kellonsoittaja vannoi, ettei köydessä ollut '
        + 'kättä. Kirkon perusti tarun mukaan paimen, jonka nimeä koko '
        + 'kaupunki kantaa. Alttarin kiveen oli hakattu paimensauva, ja '
        + 'sauvan koukussa riippui pieni messinkinen barometri. Se ei '
        + 'kuulunut kuvaan. Se riippui siinä oikeasti.',
      henkilo: 'Kellonsoittaja Ana soittaa paimenen kirkon kelloa, jonka '
        + 'köyttä hänen sukunsa on vetänyt neljässä polvessa.',
      kohtaaminen: 'Kellotornin portailla Ana kiertää köyden ranteensa ympäri. '
        + '"Isoisäsi kysyi sukuni soittajalta, kenelle kello lyö '
        + 'silloin, kun kukaan ei soita. Vastaa hänen omaan '
        + 'kysymykseensä, niin kerron, mitä soittaja vastasi."',
      kysymys: {
        q: 'Tarun mukaan Bukarest on saanut nimensä perustajaltaan. Kuka '
          + 'hän oli?',
        vaihtoehdot: [
          'Paimen nimeltä Bucur',
          'Ruhtinas nimeltä Bucur',
          'Seppä nimeltä Bucur',
          'Kalastaja nimeltä Bucur',
        ],
        oikea: 0,
        fakta: 'Tarina kertoo paimen Bucurista, joka pystytti majansa ja '
          + 'kirkkonsa joen törmälle. Nimi Bucureşti kantaa hänen nimeään '
          + '— ja bucurie tarkoittaa romaniaksi iloa.',
      },
      aarre: 'Messinkibarometrin sisällä ei ollut koneistoa vaan kätkö. '
        + 'Ana ripusti sen takaisin koukkuun ja mietti ääneen: "Koukku '
        + 'on kulunut kiiltäväksi — jokin on riippunut siinä kauan. '
        + 'Mutta tässä laitteessa ei ole päivääkään pölyä."',
    },
    {
      id: 'kiova',
      otsikko: 'Kiova — merkki portin holvissa',
      saapuminen: 'Kaupungin portti kohosi kullattuine kupoleineen, ja sen '
        + 'holvissa kaikui, kuin muuri muistaisi jokaisen kulkijan. '
        + 'Vartija kertoi, että holviin on kaiverrettu merkki, jota '
        + 'kukaan ei ole osannut lukea. Merkki oli silmänkorkeudella: '
        + 'kolme aaltoviivaa. Tunnistin ne heti — samalla merkillä '
        + 'isoisäni sulki kirjeensä.',
      henkilo: 'Portinvartija Oksana pitää Kultaisen portin avaimia ja '
        + 'tuntee holvin jokaisen kaiverruksen sormenpäillään.',
      kohtaaminen: 'Holvin varjossa Oksana laskee kätensä kaiverrukselle. '
        + '"Suvussani näitä viivoja sanotaan matkamiehen merkiksi — ja '
        + 'meille on opetettu, että merkin tekijän suku palaa lukemaan '
        + 'ne. Vastaa kirjan kysymykseen, niin luemme yhdessä."',
      kysymys: {
        q: 'Kiovan kuuluisin portti on nimeltään Kultainen portti. Mistä '
          + 'nimi tulee?',
        vaihtoehdot: [
          'Porttitornin kirkon kullatuista kupoleista',
          'Portinovista, jotka valettiin puhtaasta kullasta',
          'Kultakolikoista, joilla tulijat maksoivat tullin',
          'Auringosta, joka nousee suoraan sen kohdalta',
        ],
        oikea: 0,
        fakta: 'Portin torniin rakennettiin pieni kirkko, jonka kupolit '
          + 'kullattiin — kaukaa koko portti hehkui kultaa. Portti oli '
          + 'kaupungin pääsisäänkäynti lähes tuhat vuotta sitten.',
      },
      aarre: 'Viivojen takana kivi oli ontto, ja ontelossa odotti kätkö. '
        + 'Oksana pyyhkäisi pölyn kaiverruksesta: "Viivoja on kolme — '
        + 'mutta neljäs on aloitettu. Taltanjälki on tuore, eikä '
        + 'kiviseppiä ole käynyt vuosiin."',
    },
    {
      id: 'odessa',
      otsikko: 'Odessa — lyhty jota ei sytytetty',
      saapuminen: 'Satamasta nousivat portaat, joita laskin sataan asti ennen '
        + 'kuin luovutin. Alhaalta katsoen näin vain askelmia, ylhäältä '
        + 'vain tasanteita — kuin portaikko näyttäisi eri asian '
        + 'kummallekin kulkijalle. Puolivälin tasanteella '
        + 'lyhtypylvääseen oli sidottu köydenpätkä merimiessolmulla. '
        + 'Solmu oli isoisäni opettama. Vain hän sitoi sen niin.',
      henkilo: 'Lyhdynsytyttäjä Fjodor sytyttää portaikon lyhdyt joka ilta '
        + 'alhaalta ylös ja sammuttaa ne aamulla ylhäältä alas.',
      kohtaaminen: 'Tasanteella Fjodor nojaa lyhtytankoonsa. "Sukuni on '
        + 'sytyttänyt nämä lyhdyt portaiden valmistumisesta asti — ja '
        + 'yksi on käsketty jättää sytyttämättä, kunnes solmun tuntija '
        + 'tulee. Vastaa kirjan kysymykseen, niin sytytän sen nyt."',
      kysymys: {
        q: 'Odessan jättiläisportaikko tekee silmille tempun. Minkä?',
        vaihtoehdot: [
          'Alhaalta näkyvät vain askelmat, ylhäältä vain tasanteet',
          'Portaat näyttävät kapenevan ylöspäin, vaikka levenevät',
          'Askelmia on eri määrä ylös ja alas kuljettaessa',
          'Portaikko näyttää mereltä katsoen sillalta',
        ],
        oikea: 0,
        fakta: 'Portaikko levenee alaspäin, ja nousu on loiva: ylhäältä '
          + 'katsoen askelmat katoavat tasanteiden taakse ja alhaalta '
          + 'tasanteet askelmien. Siksi portaikko näyttää loputtomalta.',
      },
      aarre: 'Sytyttämättömän lyhdyn jalustassa oli luukku, ja luukun '
        + 'takana kätkö. Fjodor raapaisi tulen ja jäi katsomaan '
        + 'liekkiä: "Lasi on puhdas. Joku on pessyt lyhdyn, jota ei ole '
        + 'sytytetty sataan vuoteen."',
    },
    {
      id: 'moskova',
      otsikko: 'Moskova — kello joka ei koskaan soinut',
      saapuminen: 'Kellotornin juurella seisoi kello, joka on liian suuri '
        + 'soimaan: sen kyljestä lohjenneen palan aukosta kävelin '
        + 'sisään kumartumatta. Kellon sisällä ääni muuttui — '
        + 'kuiskauskin kiersi pronssia pitkin täyden kierroksen. '
        + 'Sisäseinään oli kirjoitettu liidulla lukusarja. Se oli '
        + 'barometrini lukema — mutta kirjoitettu ennen kuin minä '
        + 'synnyin.',
      henkilo: 'Kellonvalajan jälkeläinen Vera tuntee suuren kellon pronssin '
        + 'jokaisen sävyn ja lohkeaman koko tarinan.',
      kohtaaminen: 'Kellon varjossa Vera koputtaa pronssia rystysillään. "Sukuni '
        + 'valoi kelloja, ja tämä on meidän surumme: kello, joka ei '
        + 'saanut ääntä. Isoisäsi kysyi, voiko soimaton kello silti '
        + 'kertoa jotain. Vastaa hänen kysymykseensä, niin näytän, mitä '
        + 'se kertoo."',
      kysymys: {
        q: 'Moskovan Tsaarinkello on maailman suurimpia kelloja. Montako '
          + 'kertaa se on soinut?',
        vaihtoehdot: [
          'Ei kertaakaan',
          'Kerran, valmistujaisissaan',
          'Joka vuosi uudenvuodenyönä',
          'Sata kertaa, kunnes se halkesi',
        ],
        oikea: 0,
        fakta: 'Yli 200 tonnin kello ei koskaan ehtinyt torniin: valun '
          + 'jäähtyessä syttyi tulipalo, ja sammutusvesi halkaisi kuuman '
          + 'pronssin. Lohjennut pala painaa yksinään 11 tonnia.',
      },
      aarre: 'Lohkeaman sisäreunan kolossa odotti kätkö. Vera pyyhki '
        + 'liitukirjoitusta sormellaan: "Liitu ei pysy pronssissa '
        + 'vuottakaan — kello sataa sisäänsä pölyä. Tämä on kirjoitettu '
        + 'tänä talvena."',
    },
    {
      id: 'pietari',
      otsikko: 'Pietari — silta joka odotti laivaa',
      saapuminen: 'Yö ei tullut. Kello löi kaksitoista, ja taivas hehkui yhä '
        + 'kuin iltarusko olisi unohtunut paikalleen. Joen sillat '
        + 'nousivat pystyyn päästämään laivat läpi, ja rannalla mies '
        + 'nosti hattuaan jokaiselle laivalle — mutta piti kirjaa vain '
        + 'yhdestä. Kun sillat laskettiin, mies oli poissa. Kirja jäi '
        + 'kaiteelle, avattuna sivulta, jolla luki: odotamme vielä.',
      henkilo: 'Sillanhoitaja Dmitri nostaa joen sillan joka yö ja laskee '
        + 'sen aamuksi, kuten hänen sukunsa on tehnyt siltojen alusta '
        + 'asti.',
      kohtaaminen: 'Koneiston äärellä Dmitri pitelee vipua. "Kirjaan merkitään '
        + 'laiva, joka ei ole vielä palannut — isoisäsi pyysi sukuani '
        + 'pitämään sivun auki. Vastaa hänen kysymykseensä, niin '
        + 'käännämme sivua yhdessä."',
      kysymys: {
        q: 'Pietarissa voi kesäkuussa lukea kirjaa ulkona keskiyöllä. '
          + 'Miksi?',
        vaihtoehdot: [
          'Valkeiden öiden aikaan aurinko käy vain hetken horisontin '
            + 'alla',
          'Kaupungin kaasulyhdyt palavat kesällä kirkkaampina',
          'Revontulet valaisevat taivaan joka kesäyö',
          'Joki heijastaa päivän valon takaisin yöllä',
        ],
        oikea: 0,
        fakta: 'Pietari on niin pohjoisessa, että kesäkuussa aurinko painuu '
          + 'vain pari astetta horisontin alle: hämärä ei ehdi pimetä '
          + 'ennen kuin aurinko nousee taas. Valkeat yöt kestävät '
          + 'viitisen viikkoa.',
      },
      aarre: 'Sillan koneistokammiossa, vivun alla, odotti öljykankainen '
        + 'kätkö. Dmitri avasi odotetun laivan sivun: "Joku on '
        + 'merkinnyt sen palanneeksi — viime kesänä. Ja merkintä on '
        + 'tehty kynällä, jota säilytän lukkojen takana."',
    },
    {
      id: 'helsinki',
      otsikko: 'Helsinki — maa joka nousee merestä',
      saapuminen: 'Saarille rakennettu linnoitus nousi merestä harmaana kuin '
        + 'aallonmurtaja. Kuninkaanportin rappusilla istui poika, joka '
        + 'onki ilman koukkua — siimassa oli pelkkä paino. Kysyin, mitä '
        + 'hän pyytää. Pohjaa, poika vastasi: isä käski mitata, '
        + 'nouseeko maa täälläkin. Kirjoitin lukeman muistiin. Maa '
        + 'nousee. Ja jonain päivänä se nostaa esiin sen, minkä minä '
        + 'jätin.',
      henkilo: 'Luotsi Aino ohjaa laivat linnoituksen salmien läpi ja tuntee '
        + 'jokaisen karin — myös ne, joita ei ole kartoissa.',
      kohtaaminen: 'Laiturilla Aino kiinnittää veneensä yhdellä solmulla. '
        + '"Sukuni on luotsannut näitä salmia niin kauan kuin linnoitus '
        + 'on seissyt. Isoisäsi maksoi luotsauksen, jota ei koskaan '
        + 'käytetty — se on yhä voimassa. Vastaa hänen kysymykseensä, '
        + 'niin luotsaan sinut perille."',
      kysymys: {
        q: 'Helsingin edustalle rakennettiin merilinnoitus Suomenlinna. '
          + 'Mikä siinä on erikoista?',
        vaihtoehdot: [
          'Se on rakennettu saarille keskelle merta',
          'Se jää kokonaan veden alle nousuveden aikaan',
          'Se on veistetty yhdestä ainoasta kalliosta',
          'Sen muurit on rakennettu hirsistä',
        ],
        oikea: 0,
        fakta: 'Suomenlinna levittäytyy kuudelle saarelle, ja sen muurit, '
          + 'tykit ja telakka suojasivat koko kaupunkia mereltä. Nykyään '
          + 'linnoitussaarilla asutaan, ja sinne pääsee lautalla.',
      },
      aarre: 'Kätkö nousi vedestä luotsiveneen naarassa, merirasvaan '
        + 'käärittynä. Aino availi käärettä varovasti: "Rasva on '
        + 'tuoretta. Meressä se pilaantuu vuodessa — joku on kastanut '
        + 'tämän uudelleen."',
    },
    {
      id: 'tallinna',
      otsikko: 'Tallinna — vahti joka käänsi selkänsä tuulelle',
      saapuminen: 'Raatihuoneen tornin huipulla vanha vahti kääntyi tuulen '
        + 'mukana: peltinen mies on vartioinut kaupunkia viirissään '
        + 'kohta kolmesataa vuotta. Torin kiveen on merkitty kohta, '
        + 'josta näkee viisi tornia yhdellä silmäyksellä. Seisoin '
        + 'siinä. Kuudeskin torni näkyi — mutta vain siksi, että joku '
        + 'oli asettanut peilin vastapäiseen ikkunaan.',
      henkilo: 'Tornimestari Kristjan rasvaa Vana Toomasin laakerit ja '
        + 'nousee torniin joka myrskyn jälkeen katsomaan, että vahti '
        + 'kääntyy yhä.',
      kohtaaminen: 'Tornin portaissa Kristjan kantaa öljykannua. "Vana Toomas on '
        + 'kääntynyt tuuleen kolmesataa vuotta — mutta kerran se '
        + 'osoitti vastatuuleen kokonaisen päivän, ja se päivä on '
        + 'kirjattu. Isoisäsi päivä. Vastaa hänen kysymykseensä, niin '
        + 'näytän kirjauksen."',
      kysymys: {
        q: 'Tallinnan raatihuoneen tornissa pyörii tuuliviiri nimeltä '
          + 'Vana Toomas. Kuka hän on?',
        vaihtoehdot: [
          'Kaupungin ikuiseksi vartijaksi nostettu viirisotilas',
          'Raatihuoneen ensimmäinen pormestari',
          'Purjehtija, joka löysi Tallinnan sataman',
          'Kelloseppä, joka rakensi tornin kellon',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan Toomas oli köyhä poika, joka voitti '
          + 'jousikilpailun mutta ei säätynsä takia saanut palkintoa — '
          + 'hänestä tehtiin kaupungin ikuinen vartija tornin huippuun '
          + 'vuonna 1530.',
      },
      aarre: 'Kirjauksen sivujen väliin oli taitettu kätkö. Kristjan piti '
        + 'sivua valoa vasten: "Vastatuulen päivä on merkitty kahdesti. '
        + 'Jälkimmäinen on viime syksyltä — ja silloin minä olin '
        + 'tornissa. Viiri ei kääntynyt itsestään."',
    },
    {
      id: 'riika',
      otsikko: 'Riika — kukko joka näki tuulen',
      saapuminen: 'Kirkontornien huipuilla kiilsivät kultaiset kukot, ja '
        + 'satamassa purjehtijat katsoivat niitä kuin kelloja: kukko '
        + 'kertoo tuulen ennen kuin purje sen tuntee. Yhden kukon '
        + 'nokasta riippui ohut kettinki, ja kettingin päässä heilui '
        + 'jotain pientä, joka välähti auringossa. Torninvartija ei '
        + 'ollut ripustanut sitä. Kukaan ei myöntänyt kiivenneensä.',
      henkilo: 'Kultaaja Ilze uudistaa tornikukkojen kultauksen, kun myrskyt '
        + 'ovat sen syöneet — sukunsa viidentenä.',
      kohtaaminen: 'Pajassaan Ilze silittää kultalehteä siveltimellä. "Kun '
        + 'sukuni kultasi kukon isoisäsi aikana, lehtien alle jäi '
        + 'jotain, mikä ei ollut kultaa. Se on siellä yhä. Vastaa hänen '
        + 'kysymykseensä, niin nousemme katsomaan."',
      kysymys: {
        q: 'Riian kirkkojen huipuilla ei ole ristejä vaan kultaisia '
          + 'kukkoja. Miksi juuri kukko?',
        vaihtoehdot: [
          'Kukko näyttää tuulen ja karkottaa vanhan uskomuksen mukaan '
            + 'pahan',
          'Kukko on Riian perustajasuvun vaakunaeläin',
          'Herättäjäksi, kun kellot jäätyivät talvella',
          'Kultaajat saivat maksunsa kananmunissa',
        ],
        oikea: 0,
        fakta: 'Tuuliviirikukko kertoo purjehtijoille tuulen suunnan, ja '
          + 'vanhan uskomuksen mukaan valvova kukko pitää pimeän voimat '
          + 'loitolla. Riian vanhimmat tornikukot ovat pyörineet satoja '
          + 'vuosia.',
      },
      aarre: 'Kultauksen alta, kukon pyrstön ontelosta, paljastui kätkö. '
        + 'Ilze punnitsi kettinkiä kämmenellään: "Tämä on ripustettu '
        + 'ylhäältä käsin. Tikkaita ei ole ollut kenelläkään — paitsi '
        + 'minulla, ja ne ovat lukkojen takana."',
    },
    {
      id: 'vilna',
      otsikko: 'Vilna — susi joka ulvoi sadan äänellä',
      saapuminen: 'Kukkulalla opas kertoi suuriruhtinaan unesta: rautainen susi '
        + 'ulvoi sadan suden äänellä, ja tietäjä luki unen niin, että '
        + 'mäelle nousisi kaupunki, jonka maine kantaa kauas. Tornin '
        + 'kivijalassa, sammaleen alla, oli pieni rautainen susi — '
        + 'veistos, jonka selkä oli kulunut sileäksi, kuin sitä olisi '
        + 'silitetty vuosisata. Silitin minäkin. Tapa on tarttuvaa.',
      henkilo: 'Yövartija Rasa kiertää vanhankaupungin kujat lyhtyineen ja '
        + 'tervehtii rautaista sutta joka kierroksella.',
      kohtaaminen: 'Lyhdyn valossa Rasa laskee kierroksensa avaimet. "Suden '
        + 'selässä on kulunut kohta — sukuni on silittänyt sitä onneksi '
        + 'joka yö sata vuotta, koska eräs matkalainen maksoi siitä. '
        + 'Vastaa hänen kysymykseensä, niin kerron, mitä hän oikeasti '
        + 'maksoi."',
      kysymys: {
        q: 'Vilnan tarun mukaan kaupunki sai alkunsa suuriruhtinas '
          + 'Gediminasin unesta. Mitä hän näki?',
        vaihtoehdot: [
          'Rautaisen suden, joka ulvoi sadan suden äänellä',
          'Kultaisen kotkan tornin huipulla',
          'Joen, joka virtasi ylämäkeen',
          'Sata tulta kukkulan laella',
        ],
        oikea: 0,
        fakta: 'Tietäjä selitti unen: rautasusi merkitsi mahtavaa kaupunkia '
          + 'ja sen ulvonta mainetta, joka kiirisi maailmalle. Gediminas '
          + 'perusti kaupungin kukkulalle ja kutsui kirjeillään tulijoita '
          + 'kaikkialta.',
      },
      aarre: 'Suden jalustan alta aukesi kolo, ja kolossa odotti kätkö. '
        + 'Rasa nosti lyhtyään: "Selän kulunut kohta kiiltää tuoreelta. '
        + 'Minun kierrosteni välillä sitä silittää joku muukin."',
    },
    {
      id: 'tukholma',
      otsikko: 'Tukholma — luukku talossa jossa ei ole ovea',
      saapuminen: 'Vanhassakaupungissa kuja kapeni niin, että hartiat hipoivat '
        + 'seiniä, ja portaat laskeutuivat sen pohjalle kuin kaivoon. '
        + 'Kujan kapeimmassa kohdassa seinään oli upotettu pieni '
        + 'rautaluukku — postiluukku talossa, jossa ei ole ovea. '
        + 'Työnsin siihen sormeni. Sisältä joku työnsi vastaan paperin: '
        + 'ei vielä.',
      henkilo: 'Lyhdynsytyttäjä Astrid hoitaa kapeimman kujan ainoaa lyhtyä '
        + 'ja tyhjentää ovettoman talon postiluukun — minne, sitä hän '
        + 'ei kerro.',
      kohtaaminen: 'Kujan portailla Astrid suojaa liekkiä kämmenellään. "Luukku '
        + 'on sukuni vastuulla: kirje viedään sille, jonka nimi '
        + 'paperissa lukee — vaikka odottaisi sata vuotta. Vastaa '
        + 'kirjan kysymykseen, niin annan sinulle sinun kirjeesi."',
      kysymys: {
        q: 'Tukholman vanhassakaupungissa on Ruotsin kapein kuja, Mårten '
          + 'Trotzigin kuja. Kuinka kapea se kapeimmillaan on?',
        vaihtoehdot: [
          'Alle metrin — noin 90 senttiä',
          'Noin kolme metriä',
          'Puolitoista metriä',
          'Viisi metriä',
        ],
        oikea: 0,
        fakta: 'Kuja kapenee 90 senttiin: kaksi vastaantulijaa mahtuu ohi '
          + 'juuri ja juuri. Nimensä kuja sai kauppias Mårten '
          + 'Trotzigilta, jolla oli sen varrella talo ja paja.',
      },
      aarre: 'Kirjekuoressa oli kätkö ja isoisän käsialaa. Astrid sulki '
        + 'luukun ja epäröi: "Luukusta työnnettiin vastaus tänä aamuna. '
        + 'Talossa ei ole ovea — minä en tiedä, mistä sinne mennään '
        + 'sisään."',
    },
    {
      id: 'oslo',
      otsikko: 'Oslo — laiva mullan alla',
      saapuminen: 'Vuonon rannalla talonpoika näytti kumpua peltonsa laidalla '
        + 'ja sanoi, että sen alla nukkuu laiva. Kokonainen laiva, '
        + 'airoineen, mullan alla — esi-isät laskivat päällikkönsä '
        + 'lepoon laivassa, jotta matka jatkuisi. Kummun laella kasvoi '
        + 'yksi ainoa pihlaja. Sen oksaan oli sidottu purjelangasta '
        + 'punottu solmu. Tuore.',
      henkilo: 'Talonpoika Sigrid viljelee peltoa, jonka laidalla laivakumpu '
        + 'on ollut hänen sukunsa vartiossa satoja vuosia.',
      kohtaaminen: 'Kummun juurella Sigrid nojaa talikkoonsa. "Isoisäsi '
        + 'leiriytyi tähän kolmeksi yöksi ja lupasi, ettei kaiva — '
        + 'sillä ehdolla suku näytti hänelle jotain. Vastaa hänen '
        + 'kysymykseensä, niin näytän saman sinulle."',
      kysymys: {
        q: 'Norjan kummuista on löydetty kokonaisia viikinkilaivoja. '
          + 'Miksi laiva haudattiin maahan?',
        vaihtoehdot: [
          'Vainajan uskottiin purjehtivan sillä tuonpuoleiseen',
          'Laivat piilotettiin vihollisilta talven ajaksi',
          'Puu säilyi mullassa paremmin kuin vedessä',
          'Kummut olivat laivanrakentajien varastoja',
        ],
        oikea: 0,
        fakta: 'Mahtimiehet ja -naiset laskettiin hautaan laivoissa '
          + 'varusteineen: laivan uskottiin kantavan heidät '
          + 'tuonpuoleiseen. Mullan alla laivat säilyivät niin hyvin, '
          + 'että niitä on nostettu esiin lähes ehjinä.',
      },
      aarre: 'Pihlajan juurten välissä, kivien alla, odotti kätkö — ei '
        + 'kummussa vaan sen vieressä. Sigrid osoitti oksan solmua: '
        + '"Sukuni sitoo merkkisolmun kerran vuodessa. Tämän vuoden '
        + 'solmu oli valmiina, kun keväällä tulin."',
    },
    {
      id: 'kobenhavn',
      otsikko: 'Kööpenhamina — satu jota ei kerrottu loppuun',
      saapuminen: 'Satamakanavan varrella talot hehkuivat keltaisina ja '
        + 'punaisina, ja laiturilla vanha merimies kertoi lapsille '
        + 'satua rumasta ankanpoikasesta — sanasta sanaan niin kuin '
        + 'sadun kirjoittaja itse, jonka sanotaan asuvan tällä '
        + 'kanavalla. Kun satu loppui, merimies ojensi minulle paperin: '
        + 'herra numerosta kaksikymmentä jätti tämän teille. Paperilla '
        + 'oli yksi lause: kaikki tarinat ovat tosia sille, joka etsii '
        + 'loppuun asti.',
      henkilo: 'Sadunkertoja Karen kertoo satuja Nyhavnin laiturilla samalta '
        + 'puiselta arkulta, jolta hänen isoisänsä ne kertoi.',
      kohtaaminen: 'Karen taputtaa arkkua vierestään. "Isoisäni sai arkun '
        + 'mieheltä, joka kirjoitti satuja — ja sinun isoisäsi istui '
        + 'tässä kuuntelemassa. Arkussa on satu, jota ei ole koskaan '
        + 'kerrottu loppuun. Vastaa kirjan kysymykseen, niin kerron '
        + 'siitä alun."',
      kysymys: {
        q: 'Nyhavnin kanavan varrella asui satujen mestari H. C. '
          + 'Andersen. Mikä näistä on hänen satunsa?',
        vaihtoehdot: [
          'Pieni merenneito',
          'Punahilkka',
          'Tuhkimo',
          'Hannu ja Kerttu',
        ],
        oikea: 0,
        fakta: 'Andersen kirjoitti Kööpenhaminassa muun muassa Pienen '
          + 'merenneidon, Ruman ankanpoikasen ja Keisarin uudet vaatteet. '
          + 'Hän asui vuosikymmenet Nyhavnin taloissa 18, 20 ja 67.',
      },
      aarre: 'Arkun kaksoispohjasta löytyi kätkö ja kesken jäänyt '
        + 'käsikirjoitus. Karen selasi sivut: "Satu katkeaa lauseeseen: '
        + 'aarre ei ollut arkussa vaan siinä, joka arkkua... — '
        + 'viimeinen sana on revitty irti, ja reunat ovat tuoreet."',
    },
    {
      id: 'lappi',
      otsikko: 'Lappi — tuli joka juoksi taivaalla',
      saapuminen: 'Taivas syttyi. Vihreä liekki juoksi taivaanrannasta toiseen '
        + 'ja kaartui pääni ylle kuin joki, joka olisi noussut '
        + 'virtaamaan taivaalle. Poromies sanoi tulen olevan ketun '
        + 'työtä: tunturissa juokseva kettu pyyhkäisee hännällään '
        + 'lumesta kipinöitä. Tulen alla hangella kulki jälkiä. Ne '
        + 'eivät olleet ketun. Ne olivat suksien — ja ne päättyivät '
        + 'keskelle aukeaa.',
      henkilo: 'Poromies Aslak lukee hangen jäljet kuin kirjaa ja seuraa '
        + 'tokkaansa tulien alla talvet läpeensä.',
      kohtaaminen: 'Nuotiolla Aslak kaataa kuksaan kuumaa. "Isoisäsi hiihti '
        + 'sukuni matkassa kolme päivää ja kysyi tulista joka ilta. '
        + 'Viimeisenä iltana hän kirjoitti kysymyksen muistiin ja '
        + 'sanoi: se, joka vastaa, saa jäljet. Vastaa."',
      kysymys: {
        q: 'Revontulet leimuavat Lapin talvitaivaalla. Mistä niiden '
          + 'suomenkielinen nimi tarun mukaan tulee?',
        vaihtoehdot: [
          'Tulikettu iskee hännällään lumesta kipinöitä taivaalle',
          'Repo tarkoittaa vanhassa kielessä taivasta',
          'Tulet revitään pimeydestä auki',
          'Ensimmäinen näkijä oli Repo-niminen tietäjä',
        ],
        oikea: 0,
        fakta: 'Tarun tulikettu juoksee tuntureilla niin lujaa, että sen '
          + 'häntä iskee lumesta kipinöitä taivaanrantaan asti. Tiede '
          + 'selittää valot auringon hiukkasilla — mutta nimi revontulet '
          + 'jäi ketulta.',
      },
      aarre: 'Jälkien päässä, kinoksen alla, odotti tuohikääre. Aslak '
        + 'katsoi taivaalle ja takaisin: "Jäljet päättyvät tähän — '
        + 'mutta katso: toiset alkavat tästä. Joku on hiihtänyt täältä '
        + 'pois. Eilen."',
    },
    {
      id: 'tromssa',
      otsikko: 'Tromssa — lyhty joka paloi keskiyön auringossa',
      saapuminen: 'Aurinko ei laskenut. Se vieri pohjoisen taivaanrannan yli '
        + 'kuin kultakolikko, joka ei suostu putoamaan, ja satama eli '
        + 'keskellä yötä: kalastajat lastasivat, lokit kirkuivat. Vain '
        + 'yksi vene lepäsi liikkumatta, ja sen mastossa paloi lyhty. '
        + 'Kysyin, miksi lyhty palaa, kun yötä ei ole. Se ei pala '
        + 'pimeän takia, sanoi satamavahti. Se palaa merkiksi.',
      henkilo: 'Satamavahti Ingrid pitää keskiyön auringon aikaan kirjaa '
        + 'saapuvista laivoista, koska yö ei sitä tee.',
      kohtaaminen: 'Laiturin päässä Ingrid sulkee lokikirjansa. "Lyhtyvene on '
        + 'sukuni vene, ja lyhty on palanut merkkinä samalle '
        + 'matkalaiselle sata vuotta. Vastaa kirjan kysymykseen, niin '
        + 'sammutan sen — silloin merkki on mennyt perille."',
      kysymys: {
        q: 'Tromssassa aurinko ei kesällä laske moneen viikkoon. Miksi '
          + 'ilmiötä kutsutaan?',
        vaihtoehdot: [
          'Keskiyön auringoksi',
          'Valkeiksi öiksi',
          'Kesäkaamokseksi',
          'Aurinkomyrskyksi',
        ],
        oikea: 0,
        fakta: 'Napapiirin pohjoispuolella aurinko pysyy kesällä horisontin '
          + 'yläpuolella vuorokauden ympäri — Tromssassa lähes kaksi '
          + 'kuukautta. Talvella on vastapaino: kaamos, jolloin aurinko '
          + 'ei nouse lainkaan.',
      },
      aarre: 'Lyhdyn öljysäiliön alla, kannen luukussa, odotti kätkö. '
        + 'Ingrid sammutti liekin ja jäi katsomaan savua: "Öljyn olen '
        + 'lisännyt minä, joka viikko. Mutta sydänlanka on vaihdettu '
        + 'uuteen — eikä vaihtaja ollut minä."',
    },
    {
      id: 'islanti',
      otsikko: 'Islanti — lähde joka nimesi kaikki muut',
      saapuminen: 'Maa hengitti höyryä. Laakson lähde kokosi voimansa hitaasti, '
        + 'kohisi — ja syöksi kiehuvan patsaan taivaalle niin '
        + 'korkealle, että jäin sanattomaksi. Oppaani sanoi, että '
        + 'kaikki maailman purkautuvat lähteet on nimetty tämän yhden '
        + 'mukaan. Lähteen reunakivessä oli kaiverrus, puoliksi kalkin '
        + 'peitossa: nuoli ja sana, jota en ymmärtänyt. Opas ymmärsi. '
        + 'Hän vaikeni loppumatkan.',
      henkilo: 'Tilallinen Björk asuu lähdelaakson talossa, jonka suku on '
        + 'opastanut matkalaisia kuumille lähteille kuusi polvea.',
      kohtaaminen: 'Tuvan ovella Björk ojentaa villapeiton harteilleni. '
        + '"Kaiverruksen sana on sukuni murretta, ja opas, joka '
        + 'vaikeni, oli isoisoisäni. Sana tarkoittaa: odota purkausta. '
        + 'Vastaa kirjan kysymykseen, niin odotamme yhdessä."',
      kysymys: {
        q: 'Islannin kuuluisin kuuma lähde on antanut nimen kaikille '
          + 'maailman purkautuville lähteille. Mikä sana siitä tuli?',
        vaihtoehdot: [
          'Geysir',
          'Vulkaani',
          'Kraatteri',
          'Laguuni',
        ],
        oikea: 0,
        fakta: 'Haukadalurin laakson Geysir — islannin sanasta geysa, '
          + 'syöksyä — purkautui kymmenien metrien korkeuteen. Kaikki '
          + 'maailman purkautuvat kuumat lähteet ovat sen mukaan '
          + 'geysirejä.',
      },
      aarre: 'Purkauksen jälkeen nuolen osoittama kivi oli hetken kuiva, '
        + 'ja sen alta löytyi kätkö. Björk katseli kalkkikerrosta: '
        + '"Kaiverruksen pitäisi olla kokonaan kalkin alla. Joku on '
        + 'raaputtanut sen esiin — tänä keväänä."',
    },
  ],
};
