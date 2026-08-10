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
  johdanto: 'Tarinakaari: Euroopan 41 kohdetta luentoineen JA UUTENA '
    + 'Lähi-idän 28 kohdetta ilman luentoja (omistajan tilaus 9.8. '
    + 'yö: tekstit arvioon ensin, äänet vasta hyväksynnän jälkeen; '
    + 'Mekkaan ja Medinaan isoisä ei astu — kohtaamiset niiden '
    + 'porteilla ja karavaaniteillä). Kolme osaa kutakin kohdetta '
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
      // Kohtaamiskuva (Opus 3:n pilotti 10.8.2026): näkyy kohtaamis-
      // kortilla tekstin oikealla puolella.
      kuva: 'assets/kohtaamiset/kohtaaminen-ateena.jpg',
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
      kuva: 'assets/kohtaamiset/kohtaaminen-sofia.jpg',
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
    {
      id: 'aden',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Aden — kaupunki kraatterissa',
      saapuminen: 'Höyrylaiva pysähtyi hiiltä ottamaan, ja minä nousin maihin '
        + 'kaupunkiin, joka on rakennettu sammuneen tulivuoren sisään. '
        + 'Kalliot kohosivat joka puolella kuin muurin, ja vanhat '
        + 'kivisäiliöt porrastuivat rinteeseen odottamassa sadetta, '
        + 'jota tulee kerran vuodessa. Alimman säiliön reunalla istui '
        + 'mies, joka ei odottanut sadetta. Hän odotti minua.',
      henkilo: 'Vesisäiliöiden vartija Said mittaa Tawilan säiliöiden veden, '
        + 'kuten hänen sukunsa on mitannut kauan ennen höyrylaivoja.',
      kohtaaminen: 'Säiliön portailla Said laskee mittakeppinsä. "Isoisäsi '
        + 'kysyi, minne kaupunki kätkee sateensa — ja jätti kysymyksen '
        + 'niille, jotka tulevat perässä. Vastaa siihen, niin näytän '
        + 'missä vesi on syvintä."',
      kysymys: {
        q: 'Adenin vanha kaupunki on rakennettu erikoiseen paikkaan. '
          + 'Minne?',
        vaihtoehdot: [
          'Sammuneen tulivuoren kraatteriin',
          'Kelluville lautoille lahden päälle',
          'Maan alle kaivettuihin holveihin',
          'Jokisuiston saarille',
        ],
        oikea: 0,
        fakta: 'Adenin vanhin osa, nimeltäänkin Crater, lepää sammuneen '
          + 'tulivuoren sisällä. Kalliot suojaavat kaupunkia, ja sadevesi '
          + 'kerättiin talteen kivisiin Tawilan säiliöihin — sadetta kun '
          + 'tulee vain kourallinen vuodessa.',
      },
      aarre: 'Kätkö odotti kuivan säiliön pohjakivien alla. Said katsoi '
        + 'mittakeppiään: "Tämä säiliö on ollut tyhjä sukupolven. Mutta '
        + 'pohjalla oli tuoreita kengänjälkiä ennen sinun jälkiäsi."',
    },
    {
      id: 'ankara',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Ankara — vuohien valkoinen kulta',
      saapuminen: 'Ylängön ilta oli viileä, ja markkinoilla punnittiin villaa, '
        + 'joka hohti kuin silkki. Angoravuohen villaa, sanoi kauppias, '
        + 'eikä sitä saa mistään muualta kuin näiltä ylängöiltä. Yhden '
        + 'paalin päällä oli sinetti, jota kukaan ei tunnistanut — '
        + 'paitsi että vahassa oli barometrin kuva, ja paali oli '
        + 'maksettu kolmekymmentä vuotta sitten. Noutajaa odotettiin '
        + 'yhä.',
      henkilo: 'Villankehrääjä Elif kehrää mohairia samalla värttinällä kuin '
        + 'äitinsä ja tämän äiti, ja tuntee jokaisen paalin tarinan.',
      kohtaaminen: 'Markkinakatoksen alla Elif punnitsee lankavyyhtiä. '
        + '"Sinetöity paali on suvullamme tallessa — maksaja käski '
        + 'antaa sen sille, joka tietää, mistä villan nimi tulee. '
        + 'Vastaa, niin avaan sinetin."',
      kysymys: {
        q: 'Pehmeä ja kiiltävä mohair-villa on saanut nimensä '
          + 'kuuluisaksi tehneen vuohen mukaan. Mikä vuohi on kyseessä?',
        vaihtoehdot: [
          'Angoravuohi, joka on nimetty Ankaran mukaan',
          'Alppivuohi, joka elää jäätiköiden reunalla',
          'Kašmirvuohi, joka on nimetty laakson mukaan',
          'Vuorikauris, jonka villa kerätään pensaista',
        ],
        oikea: 0,
        fakta: 'Angoravuohi kantaa Ankaran vanhaa nimeä Angora. Sen '
          + 'silkinkiiltävästä villasta kehrätään mohairia, ja '
          + 'vuosisatojen ajan aitoa angoravillaa sai vain näiltä '
          + 'Anatolian ylängöiltä.',
      },
      aarre: 'Paalin sisällä, villan keskellä, odotti kätkö. Elif kääri '
        + 'villan huolella takaisin: "Sinetti oli ehjä — mutta narut '
        + 'oli solmittu uudelleen. Kehrääjä näkee sen yhdellä '
        + 'silmäyksellä."',
    },
    {
      id: 'bagdad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Bagdad — rauhan kaupungin kirjurit',
      saapuminen: 'Tigrisin rannalla kirjurit istuivat rivissä varjossa, ja '
        + 'ruokokynät rapisivat kuin sade. Vanhin heistä kopioi kirjaa, '
        + 'jonka reunaan joku oli merkinnyt lukemia — minun barometrini '
        + 'lukemia, vuosien takaa. Kysyin, kuka kirjan toi. Kirjuri ei '
        + 'nostanut katsettaan: se, joka tuo kirjan, ei kerro nimeään. '
        + 'Se, joka noutaa sen, kertoo.',
      henkilo: 'Kirjuri Yusuf kopioi vanhoja käsikirjoituksia Tigrisin '
        + 'rannalla, kuten hänen sukunsa on kopioinut kalifien ajoista.',
      kohtaaminen: 'Yusuf laskee ruokokynänsä telineeseen. "Kirja odottaa '
        + 'noutajaansa, ja noutaja tunnetaan vastauksesta. Isoisäsi '
        + 'valitsi kysymyksen itse — se kertoo kaupungista, joka '
        + 'rakennettiin ympyräksi. Vastaa."',
      kysymys: {
        q: 'Kalifi al-Mansur perusti Bagdadin 700-luvulla harvinaisen '
          + 'muotoiseksi. Millainen kaupungista rakennettiin?',
        vaihtoehdot: [
          'Täysin pyöreä, ja sitä kutsuttiin Rauhan kaupungiksi',
          'Tähdenmuotoinen, jossa oli seitsemän sakaraa',
          'Neliö, jonka kulmat osoittivat ilmansuuntiin',
          'Puolikuun muotoinen joen mutkassa',
        ],
        oikea: 0,
        fakta: 'Al-Mansurin Bagdad oli pyöreä kaupunki, jonka virallinen '
          + 'nimi oli Madinat as-Salam, Rauhan kaupunki. Kehämuurien '
          + 'keskellä olivat palatsi ja moskeija, ja portteja oli neljä — '
          + 'yksi kuhunkin ilmansuuntaan.',
      },
      aarre: 'Kirjan selkämyksen ontelossa odotti kätkö. Yusuf sulki '
        + 'kannen varovasti: "Kopioin tämän kirjan reunamerkinnät '
        + 'kymmenen vuotta sitten. Silloin viimeinen lukema puuttui. '
        + 'Nyt se on siinä — ja muste on tuoretta."',
    },
    {
      id: 'damaskos',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Damaskos — kangas joka sai kaupungin nimen',
      saapuminen: 'Katetussa basaarissa kangaspakat hohtivat, ja kutoja käänsi '
        + 'pakkaa valossa: kuvio vaihtui himmeästä hohtavaksi kuin '
        + 'vesi. Tämä kangas kantaa kaupunkimme nimeä, hän sanoi. '
        + 'Pyysin nähdä vanhimman pakan. Sen sisään oli kudottu '
        + 'kirjaimet, joita kukaan paikalla ollut ei ollut kutonut: H. '
        + 'F.',
      henkilo: 'Damastikutoja Amina kutoo kangasta, jonka kuvio näkyy vain '
        + 'valoa vasten, samoilla loimilla kuin sukunsa satoja vuosia.',
      kohtaaminen: 'Kangaspuiden ääressä Amina pysäyttää sukkulan. "Kirjaimet '
        + 'kudottiin sukuni puilla, mutta tilaaja jätti maksun ja '
        + 'kysymyksen. Vastaa hänen kysymykseensä, niin leikkaan pakan '
        + 'auki."',
      kysymys: {
        q: 'Damaskos on antanut nimensä kuuluisalle kankaalle. Mikä '
          + 'siinä on erikoista?',
        vaihtoehdot: [
          'Kuvio on kudottu kankaaseen niin, että se näkyy valoa vasten',
          'Kangas on kudottu kullasta ja hopeasta',
          'Se on maailman ohuin kangas, jonka läpi voi lukea',
          'Kangas vaihtaa väriä lämpimässä',
        ],
        oikea: 0,
        fakta: 'Damasti on kangasta, jonka kuvio syntyy kudonnasta '
          + 'itsestään: kiiltävä ja himmeä pinta vaihtavat paikkaa, joten '
          + 'kuvio välkehtii valossa. Damaskos oli kuuluisa myös '
          + 'damaskoteräksestään — kaupungin nimi kulki maailmalle kahta '
          + 'tietä.',
      },
      aarre: 'Pakan sydämestä löytyi litteä kätkö. Amina laski kankaan '
        + 'hitaasti: "Loimi on sukuni loimi, mutta tässä kohdassa '
        + 'kudetta on jatkettu — joku on avannut kankaan ja kutonut sen '
        + 'kiinni. Taidolla, jota en opettanut kenellekään."',
    },
    {
      id: 'doha',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Doha — purjeet jotka odottavat tuulta',
      saapuminen: 'Rannassa dhow-veneiden purjeet oli laskettu, ja '
        + 'purjeentekijä ompeli katoksensa alla suurta kolmiopurjetta. '
        + 'Hän kertoi, että veneet lähtevät kun tuuli kääntyy — ja '
        + 'tuuli kääntyy täällä kellontarkasti, kaksi kertaa vuodessa. '
        + 'Purjeen helmaan oli ommeltu pieni tasku. Se ei kuulu '
        + 'purjeeseen, sanoi tekijä. Se kuuluu sille, joka osaa kysyä '
        + 'tuulesta.',
      henkilo: 'Purjeentekijä Jassim ompelee dhow-veneiden purjeet käsin ja '
        + 'lukee tuulet taivaalta ennen kuin ne saapuvat.',
      kohtaaminen: 'Jassim vetää langan kireälle. "Isoisäsi istui tässä '
        + 'katoksessa ja kysyi tuulista, joilla veneet kulkevat Intiaan '
        + 'ja takaisin. Hän jätti saman kysymyksen taskuun. Vastaa, '
        + 'niin ratkon ompeleen."',
      kysymys: {
        q: 'Dhow-kauppalaivat purjehtivat Arabiasta Intiaan ja takaisin '
          + 'ilman konetta. Mikä teki edestakaisen matkan mahdolliseksi?',
        vaihtoehdot: [
          'Monsuunituulet, jotka puhaltavat puoli vuotta yhteen ja '
            + 'puoli vuotta toiseen suuntaan',
          'Airot, joita souti sata miestä',
          'Meriväylä, jossa virta kiertää ympyrää',
          'Purjeet, jotka kääntävät tuulen suunnan',
        ],
        oikea: 0,
        fakta: 'Monsuuni puhaltaa Intian valtamerellä puoli vuotta kohti '
          + 'Intiaa ja kääntyy sitten vastakkaiseksi. Dhow-kauppiaat '
          + 'purjehtivat menomatkan yhdellä monsuunilla, odottivat '
          + 'käännettä ja palasivat toisella — aikataulu oli taivaassa.',
      },
      aarre: 'Purjetaskussa odotti öljykankainen kätkö. Jassim silitti '
        + 'ommelta: "Tasku on ommeltu minun pistoillani — mutta lanka '
        + 'on vahattu tavalla, jota käytti vain isoisäni. Hän kuoli '
        + 'ennen kuin minä opin ompelemaan."',
    },
    {
      id: 'dubai',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Dubai — lahti joka ylitetään soutaen',
      saapuminen: 'Khorin suulla helmenpyytäjien veneet lepäsivät rinnakkain, '
        + 'ja abra-lautturit soutivat väkeä rannalta toiselle '
        + 'muutamalla vedolla. Lautturini pysähtyi keskellä lahtea ja '
        + 'antoi veneen kellua. Tässä kohtaa, hän sanoi, isäni isä '
        + 'pudotti kerran airon — ja nosti sen sijaan jotakin muuta. '
        + 'Hän ei sanonut mitä. Hän katsoi minua kuin olisin tiennyt.',
      henkilo: 'Abra-lautturi Rashid soutaa Khorin yli kymmeniä kertoja '
        + 'päivässä ja tuntee lahden pohjan paremmin kuin sen rannat.',
      kohtaaminen: 'Rashid lepuuttaa airoja keskellä lahtea. "Isäni isä nosti '
        + 'pohjasta lippaan ja sai ohjeen: souda tällä paikalla, kunnes '
        + 'joku vastaa kysymykseen, joka lippaan mukana tuli. Minä olen '
        + 'soutanut tässä koko ikäni. Vastaa."',
      kysymys: {
        q: 'Dubain vanhassa kaupungissa lahden yli kuljetaan yhä '
          + 'pienillä puuveneillä. Mikä tällainen vesibussi on nimeltään?',
        vaihtoehdot: [
          'Abra',
          'Gondoli',
          'Feluka',
          'Sampaani',
        ],
        oikea: 0,
        fakta: 'Abra on avoin puuvene, joka on kuljettanut väkeä Khor Dubain '
          + 'yli sukupolvien ajan — Bur Dubain ja Deiran rantojen välillä '
          + 'ei vanhastaan ollut siltaa. Abrat liikennöivät yhä samoilla '
          + 'reiteillä.',
      },
      aarre: 'Lipas nousi veneen pohjalaudan alta, kuivana ja rasvattuna. '
        + 'Rashid souti rantaan hiljaa ja sanoi vasta laiturissa: '
        + '"Pohjalauta on vaihdettu uuteen. Minä en ole vaihtanut sitä '
        + '— eikä kukaan lainaa toisen abraa."',
    },
    {
      id: 'halab',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Halab — saippua joka kypsyy vuosia',
      saapuminen: 'Saippuamestarin holvissa tornit kohosivat kattoon asti: '
        + 'vihreitä kuutioita kuivumassa, vanhimmat jo '
        + 'pähkinänruskeita. Tämä erä odottaa kolmatta vuottaan, '
        + 'mestari sanoi, hyvä saippua ei kiirehdi. Yhden tornin '
        + 'huipulla oli kuutio, johon oli painettu vieras leima. Se erä '
        + 'täyttää tänä vuonna sata vuotta, hän sanoi. Sitä ei myydä. '
        + 'Sitä vartioidaan.',
      henkilo: 'Saippuamestari Karim keittää laakerisaippuaa samassa pajassa '
        + 'kuin sukunsa, ja jokainen erä leimataan suvun merkillä.',
      kohtaaminen: 'Karim nostaa satavuotiaan kuution hyllyltä. "Erän maksoi '
        + 'matkalainen, joka pyysi säilyttämään yhden kuution — ja '
        + 'luovuttamaan sen vastausta vastaan. Kysymys koskee sitä, '
        + 'mikä tekee saippuastamme kuuluisan. Vastaa."',
      kysymys: {
        q: 'Halabin kuuluisa saippua on väriltään ulkoa ruskea mutta '
          + 'sisältä vihreä. Mikä öljy antaa sille vihreän sydämen?',
        vaihtoehdot: [
          'Laakerinmarjaöljy',
          'Ruusuöljy',
          'Seesamöljy',
          'Mantelipuun pihka',
        ],
        oikea: 0,
        fakta: 'Halabin saippua keitetään oliiviöljystä ja '
          + 'laakerinmarjaöljystä. Se kypsyy varastossa kuukausia tai '
          + 'vuosia: pinta hapettuu ruskeaksi, mutta sisus pysyy '
          + 'laakerinvihreänä — leikkauspinta paljastaa aidon saippuan.',
      },
      aarre: 'Kuution sisään oli valettu pieni kätkö. Karim punnitsi '
        + 'puolikkaita kädessään: "Sata vuotta hyllyllä — mutta vaha '
        + 'kätkön ympärillä on pehmeää. Joku on avannut ja valanut sen '
        + 'uudelleen tällä vuosikymmenellä."',
    },
    {
      id: 'isfahan',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Isfahan — puoli maailmaa yhdellä torilla',
      saapuminen: 'Suuri tori aukeni edessäni niin avarana, että toinen pää '
        + 'häipyi iltausvaan. Täällä sanotaan: Isfahan on puoli '
        + 'maailmaa. Sillan holveissa istuttiin laulamassa, ja laulu '
        + 'kiersi kaaresta kaareen. Yhden holvin kiveen oli piirretty '
        + 'pieni ympyrä ja sen sisään viiva — merkki, jonka isoisäni '
        + 'teki karttoihinsa aina sinne, minne aikoi palata.',
      henkilo: 'Sillanvartija Farhad tuntee Khajun sillan kolmekymmentäkolme '
        + 'holvia ja tietää, missä holvissa laulu kaikuu kauneimmin.',
      kohtaaminen: 'Farhad koputtaa holvin kylkeä. "Merkin tekijä istui tässä '
        + 'holvissa iltaan asti ja jätti vartijalle kysymyksen — se '
        + 'kulkee suvussamme kuin laulu. Vastaa siihen, niin näytän '
        + 'mitä holvin kivi kätkee."',
      kysymys: {
        q: 'Isfahanista on vanha persialainen sanonta. Miten se kuuluu?',
        vaihtoehdot: [
          'Isfahan on puoli maailmaa',
          'Isfahan on tuhannen sillan kaupunki',
          'Kaikki tiet vievät Isfahaniin',
          'Isfahanissa aurinko ei laske',
        ],
        oikea: 0,
        fakta: 'Sanonta Esfahan nesf-e jahan — Isfahan on puoli maailmaa — '
          + 'syntyi, kun kaupunki oli Persian loistava pääkaupunki: '
          + 'kupolit, sillat ja maailman suurimpiin kuuluva tori saivat '
          + 'matkalaiset tuntemaan, että puoli maailmaa oli koossa '
          + 'yhdessä kaupungissa.',
      },
      aarre: 'Holvin irtokiven takana odotti kätkö. Farhad pani kiven '
        + 'paikalleen ja lauloi hiljaa yhden säkeen: "Kaiku vastasi '
        + 'väärästä holvista. Joku istuu iltaisin siellä, missä ei '
        + 'pitäisi olla ketään."',
    },
    {
      id: 'izmir',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Izmir — viikunoiden satama',
      saapuminen: 'Satamassa tuoksui auringossa kuivattu hedelmä: viikunakoreja '
        + 'kannettiin laivoihin jonossa, joka ei katkennut koko '
        + 'päivänä. Kauppias avasi yhden korin ja kaivoi sen pohjalta '
        + 'paperiin käärityn viikunan, kovan kuin kivi. Tämä on '
        + 'kulkenut varastossamme kauemmin kuin minä, hän sanoi. '
        + 'Paperissa lukee, että se avataan, kun oikea ostaja kysyy '
        + 'oikean hinnan.',
      henkilo: 'Viikunakauppias Selin punnitsee sadon ja tuntee jokaisen '
        + 'laakson hedelmät maun perusteella.',
      kohtaaminen: 'Selin pyörittää kivikovaa viikunaa sormissaan. "Oikea hinta '
        + 'ei ole rahaa — se on vastaus. Isoisäsi jätti kysymyksen, '
        + 'joka koskee sitä, mistä satamamme tunnetaan. Vastaa."',
      kysymys: {
        q: 'Izmirin satamasta laivattiin 1800-luvulla koko maailmaan '
          + 'herkkua, josta kaupunki tunnettiin. Mitä?',
        vaihtoehdot: [
          'Viikunoita ja rusinoita',
          'Appelsiineja ja sitruunoita',
          'Taateleita ja manteleita',
          'Oliiveja ja hunajaa',
        ],
        oikea: 0,
        fakta: 'Izmir — silloiselta nimeltään Smyrna — oli viikunoiden ja '
          + 'rusinoiden suursatama. Smyrnan viikuna oli oma käsitteensä '
          + 'maailman markkinoilla, ja sadonkorjuun aikaan satama eli '
          + 'hedelmäkoreista.',
      },
      aarre: 'Paperikääreen sisällä ei ollut viikunaa vaan kätkö, viikunan '
        + 'muotoiseksi vahattu. Selin haisteli käärettä: "Vaha on '
        + 'tuoretta mehiläisvahaa. Varastossa sata vuotta maannut kääre '
        + 'tuoksuisi pölyltä."',
    },
    {
      id: 'jerusalem',
      lauta: 'middleeast',
      luennat: false,
      nimi: 'Elias',
      otsikko: 'Jerusalem — portti joka on kiinni',
      saapuminen: 'Kävelin vanhan kaupungin muurin ympäri ja laskin portit: '
        + 'seitsemästä kuljettiin sisään ja ulos, kahdeksas oli '
        + 'muurattu umpeen kauan sitten. Muuratun portin edessä seisoi '
        + 'mies, joka ei mennyt minnekään. Hän piirsi keppinsä kärjellä '
        + 'hiekkaan merkkejä ja pyyhki ne pois ennen kuin ehdin lukea. '
        + 'Yhden hän jätti: kolme aaltoviivaa. Isoisäni tapa sulkea '
        + 'kirje.',
      henkilo: 'Portinvartijoiden sukua oleva Elias tuntee muurin jokaisen '
        + 'kiven ja kertoo porttien tarinat niille, jotka osaavat '
        + 'kysyä.',
      kohtaaminen: 'Elias nojaa keppiinsä muurin varjossa. "Suvussani sanotaan: '
        + 'se joka tuntee portit, tuntee kaupungin. Isoisäsi tunsi ne '
        + 'kaikki — myös sen, josta ei kuljeta. Vastaa hänen '
        + 'kysymykseensä, niin kerron, mitä hän tänne jätti."',
      kysymys: {
        q: 'Jerusalemin vanhan kaupungin muurissa on kahdeksan porttia. '
          + 'Mikä niistä on erikoinen?',
        vaihtoehdot: [
          'Yksi porteista on muurattu kokonaan umpeen',
          'Yksi porteista on veistetty yhdestä kivestä',
          'Yksi porteista avautuu vain kerran vuodessa',
          'Yksi porteista on veden alla',
        ],
        oikea: 0,
        fakta: 'Kultainen portti itämuurissa on ollut muurattuna umpeen '
          + 'vuosisatoja — ainoana kahdeksasta portista siitä ei kuljeta. '
          + 'Muut seitsemän, kuten Damaskoksen portti ja Jaffan portti, '
          + 'ovat yhä kaupungin ovet.',
      },
      aarre: 'Kätkö oli muurin juurella, irtokiven takana kolmen '
        + 'aaltoviivan kohdalla. Elias tasoitti hiekan kepillään: '
        + '"Piirsin merkin, koska joku piirsi sen minulle eilen — ja '
        + 'käski odottaa sitä, joka tuntee sen."',
    },
    {
      id: 'kairo',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kairo — joen mitta',
      saapuminen: 'Rodan saarella laskeuduin portaita alas kaivoon, jonka '
        + 'keskellä seisoo kahdeksankulmainen pylväs. Siihen on '
        + 'kaiverrettu viivat: joka vuosi tulvan noustessa katsottiin, '
        + 'mille viivalle Niili yltää. Vartija näytti viivan, jolle '
        + 'vesi nousi sinä vuonna, kun muuan matkalainen kävi '
        + 'mittaamassa sen itse. Viivan viereen on raaputettu pieni '
        + 'risti. Se ei kuulu asteikkoon.',
      henkilo: 'Nilometrin vartija Fatima lukee joen mittaa, kuten hänen '
        + 'sukunsa on lukenut niin kauan kuin tulvia on kirjattu.',
      kohtaaminen: 'Fatima laskee kätensä kaiverretulle viivalle. "Matkalainen '
        + 'maksoi siitä, että hänen viivansa pidetään puhtaana. Ja hän '
        + 'jätti kysymyksen: vastaa, niin kerron miksi juuri tämä '
        + 'viiva."',
      kysymys: {
        q: 'Rodan saaren nilometrillä mitattiin Niilin tulvan korkeutta. '
          + 'Miksi mittaus oli niin tärkeä?',
        vaihtoehdot: [
          'Tulvan korkeus kertoi, kuinka hyvä sato oli tulossa',
          'Sillä laskettiin laivojen syväys satamaan',
          'Se näytti, milloin krokotiilit tulevat',
          'Sillä mitattiin juomaveden puhtautta',
        ],
        oikea: 0,
        fakta: 'Niilin tulva toi pelloille veden ja lietteen. Nilometrin '
          + 'viivoilta luettiin, riittäisikö tulva satoon: matala vesi '
          + 'tiesi nälkää, sopiva runsautta — ja lukeman mukaan '
          + 'määrättiin jopa verot.',
      },
      aarre: 'Ristin kohdalta, asteikon takaa, aukesi kapea kolo ja siinä '
        + 'kätkö. Fatima pyyhki viivan huolella: "Puhdistan tämän joka '
        + 'kuukausi. Viime kuussa risti oli himmeä — nyt se on terävä. '
        + 'Joku on syventänyt sitä."',
    },
    {
      id: 'kapadokia',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kapadokia — kaupunki maan alla',
      saapuminen: 'Laakso oli täynnä kivitorneja kuin jättiläisen pelilauta, ja '
        + 'talot oli koverrettu suoraan pehmeään kiveen. Isäntäni vei '
        + 'minut kellariinsa, avasi jauhosäkkien takaa matalan oven — '
        + 'ja sen takana portaat jatkuivat alas, ja taas alas. '
        + 'Kokonainen kaupunki nukkui maan alla. Portaiden '
        + 'kymmenennellä askelmalla paloi kynttilä. Isäntä vannoi, '
        + 'ettei hän ollut sytyttänyt sitä.',
      henkilo: 'Kyyhkyslakkojen hoitaja Meryem tuntee laakson tornit ja '
        + 'tietää, mitkä käytävät johtavat maan alle ja mitkä '
        + 'umpikujaan.',
      kohtaaminen: 'Meryem suojaa kynttilää kädellään portaikossa. '
        + '"Alakaupungissa on käytävä, jonka päässä sukuni on pitänyt '
        + 'valoa — maksu siitä tuli kauan sitten, ja kuitiksi käy '
        + 'vastaus. Isoisäsi kysymys koskee tätä kaupunkia. Vastaa."',
      kysymys: {
        q: 'Kapadokiassa on kokonaisia kaupunkeja maan alla. Kuinka '
          + 'syviä suurimmat ovat?',
        vaihtoehdot: [
          'Monta kerrosta — syvimmät ulottuvat kymmenien metrien '
            + 'syvyyteen',
          'Yhden kerroksen — matalia kellareita',
          'Ne ovat vain tarinaa, ei oikeita kaupunkeja',
          'Pohjattomia — kukaan ei ole käynyt pohjalla',
        ],
        oikea: 0,
        fakta: 'Derinkuyun kaltaiset maanalaiset kaupungit porrastuvat monta '
          + 'kerrosta pehmeään tuffikiveen — syvimmillään kymmeniä '
          + 'metrejä. Niissä oli asuinhuoneita, talleja, kaivoja ja '
          + 'pyöreät kivioven, jotka vieritettiin käytävän tukkeeksi.',
      },
      aarre: 'Käytävän päässä, kiviovien takana, odotti kätkö ja sammunut '
        + 'lyhty. Meryem kosketti lyhdyn nokea: "Meidän kynttilämme '
        + 'palaa portaissa. Tämä lyhty on kulkenut syvemmällä — ja noki '
        + 'on yhä pehmeää."',
    },
    {
      id: 'kuwait',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kuwait — kaupunki joka juo merestä tuodun joen',
      saapuminen: 'Rannalla veistettiin venettä, ja lankut taipuivat höyryssä '
        + 'kaarelle ilman yhtäkään piirustusta — mitta oli mestarin '
        + 'silmässä. Satamaan saapui vene, jonka lasti ei ollut kalaa '
        + 'eikä helmiä vaan vettä: makeaa jokivettä ruukuissa, tuotu '
        + 'kaukaa joensuulta. Vesiveneen kylkeen oli maalattu merkki, '
        + 'jonka maalari oli kuollut aikoja sitten. Merkki maalataan '
        + 'silti uudelleen joka kevät.',
      henkilo: 'Veneenveistäjä Nasser rakentaa dhow-veneitä silmämitalla, '
        + 'kuten isänsä ja tämän isä, eikä yksikään kaari ole koskaan '
        + 'väärä.',
      kohtaaminen: 'Nasser laskee höylän penkille. "Vesiveneen merkki on sukuni '
        + 'maalaama — työn maksoi matkalainen, joka sanoi: maalatkaa '
        + 'kunnes tulija vastaa kysymykseeni. Kysymys koskee sitä, mitä '
        + 'veneet tähän kaupunkiin toivat. Vastaa."',
      kysymys: {
        q: 'Kuwaitin kaupungilla ei vanhastaan ollut omaa jokea eikä '
          + 'lähdettä. Mistä juomavesi saatiin?',
        vaihtoehdot: [
          'Veneet toivat makeaa vettä ruukuissa kaukaa joensuulta',
          'Sadevesi riitti ympäri vuoden',
          'Vesi tislattiin merivedestä auringossa',
          'Kamelit kantoivat sen vuorilta',
        ],
        oikea: 0,
        fakta: 'Kuwait eli merestä: helmistä, kaupasta — ja vedestä, jonka '
          + 'dhow-veneet toivat Shatt al-Arabin joensuulta asti ruukuissa '
          + 'ja säiliöissä. Vesiveneet olivat kaupungille yhtä tärkeitä '
          + 'kuin kaivot muille.',
      },
      aarre: 'Kätkö oli veistämön vanhimman veneen kölilaudan alla. Nasser '
        + 'silitti lankkua: "Tämä vene ei ole kastunut mieheni ikänä. '
        + 'Mutta kölilaudan naulat on vaihdettu — ja naulat ovat uutta '
        + 'takoa."',
    },
    {
      id: 'luxor',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Luxor — laakso joka vartioi kuninkaitaan',
      saapuminen: 'Auringon laskiessa vuoret lännessä hehkuivat kullanvärisinä, '
        + 'ja lautturi sanoi: tuolla nukkuvat kuninkaat, eikä kukaan '
        + 'tiedä kaikkia heidän oviaan. Rannassa poika myi savikuvia ja '
        + 'katsoi minua kauan. Sinä olet se, jonka kirja tietää, hän '
        + 'sanoi lopulta ja juoksi pois. En ollut näyttänyt kirjaa '
        + 'kenellekään.',
      henkilo: 'Laakson vartijasuvun Ahmed tuntee länsirannan polut ja '
        + 'tietää, mitkä tarinat kerrotaan ääneen ja mitkä kuiskataan.',
      kohtaaminen: 'Ahmed istuu polun laidalle ja puhuu hiljaa. "Suvullani on '
        + 'laaksossa salaisuuksia, ja yksi niistä ei ole meidän — se '
        + 'jätettiin meille säilytettäväksi. Ehto on vastaus '
        + 'kysymykseen, joka koskee kuninkaiden piiloja. Vastaa."',
      kysymys: {
        q: 'Uuden valtakunnan faaraot eivät enää rakentaneet pyramideja '
          + 'vaan hautautivat Kuninkaiden laaksoon. Miksi?',
        vaihtoehdot: [
          'Kalliohaudat oli helpompi kätkeä ryöstäjiltä kuin pyramidit',
          'Pyramidien rakentajat olivat unohtaneet taitonsa',
          'Laakso oli lähempänä pääkaupunkia',
          'Kivi loppui pyramidien rakentamisesta',
        ],
        oikea: 0,
        fakta: 'Pyramidi näkyi kauas ja kertoi ryöstäjille, missä aarteet '
          + 'olivat — ja lähes kaikki ryöstettiin. Uuden valtakunnan '
          + 'faaraot hakkasivat hautansa piiloon Kuninkaiden laakson '
          + 'kallioihin, ja sisäänkäynnit peitettiin.',
      },
      aarre: 'Kätkö odotti polun varressa kivenkolossa, johon aurinko osui '
        + 'vain laskiessaan. Ahmed peitti kolon hiekalla: "Suvussa '
        + 'sanotaan, että säilytämme tätä kolmatta sukupolvea. Mutta '
        + 'hiekka oli tasoitettu jo valmiiksi — eilen, viimeistään."',
    },
    {
      id: 'masqat',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Masqat — kahden linnoituksen satama',
      saapuminen: 'Satama aukeni kallioiden välistä kuin portti, ja sen '
        + 'molemmilla puolilla vartioi vanha linnoitus, kumpikin omalla '
        + 'jyrkänteellään. Kalastaja souti minut poikki ja sanoi: '
        + 'linnoitukset eivät ole koskaan nukkuneet yhtä aikaa — kun '
        + 'toinen pimenee, toisessa syttyy valo. Katsoin illalla. Se '
        + 'piti paikkansa.',
      henkilo: 'Satamavahti Salim kirjaa saapuvat purret ja tietää, kummassa '
        + 'linnoituksessa valo palaa minäkin yönä.',
      kohtaaminen: 'Salim sulkee kirjansa laiturilla. "Vuorottelu on vanha '
        + 'sopimus, ja sen aloitti pyyntö, jonka teki muuan '
        + 'matkalainen: pitäkää toinen valo aina palamassa, kunnes '
        + 'kysyjä palaa. Vastaa hänen kysymykseensä, niin sammutamme '
        + 'sen yhdessä."',
      kysymys: {
        q: 'Masqatin satamaa vartioi kaksi vanhaa linnoitusta '
          + 'vastakkaisilla kallioilla. Miksi satama oli niin tarkasti '
          + 'vartioitu?',
        vaihtoehdot: [
          'Se oli suojaisa syväsatama Intian kauppareitin varrella, '
            + 'jonka moni halusi itselleen',
          'Sataman pohjassa uskottiin olevan kultaa',
          'Linnoituksista tähystettiin valaita',
          'Kaupungin vesi säilytettiin linnoituksissa',
        ],
        oikea: 0,
        fakta: 'Masqatin kalliosatama on harvoja suojaisia syvänteitä Intian '
          + 'valtameren kauppareitillä, ja siitä kilpailtiin vuosisatoja. '
          + 'Portugalilaiset rakensivat 1500-luvulla satamakallioille '
          + 'Mirani- ja Jalali-linnoitukset, jotka vartioivat lahtea yhä.',
      },
      aarre: 'Kätkö oli vartiovalon lyhtykomerossa, öljyruukun takana. '
        + 'Salim nosti lyhtyä: "Öljyä kuluu joka yö yhtä paljon. Viime '
        + 'kuussa ruukku hupeni kahden edestä — joku muukin on pitänyt '
        + 'valoa."',
    },
    {
      id: 'medina',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Medina — karavaanien kaivo',
      saapuminen: 'Kaupunkiin itseensä en kulkenut — se on pyhiinvaeltajien '
        + 'kaupunki, eikä minun tieni vie porteista sisään. Leiriydyin '
        + 'karavaanipaikalle sen ulkopuolelle, missä kaivon ympärillä '
        + 'lepäsi satoja kameleita. Vedennostaja kertoi matkalaisista, '
        + 'jotka olivat tulleet Damaskoksesta asti nelikymmentä päivää '
        + 'erämaan halki. Kaivon kivessä oli nimikirjaimia monella '
        + 'kielellä. Kaksi niistä tunsin.',
      henkilo: 'Vedennostaja Omar juottaa karavaanien kamelit kaivolla, '
        + 'jonka äärellä hänen sukunsa on palvellut kulkijoita '
        + 'sukupolvien ajan.',
      kohtaaminen: 'Omar kiertää köyden vinssille. "Kirjaimet hakkasi kiveen '
        + 'matkalainen, joka ei mennyt kaupunkiin vaan istui kaivolla '
        + 'kolme päivää kyselemässä karavaaneista. Hän jätti '
        + 'kysymyksensä minun isoisälleni. Vastaa."',
      kysymys: {
        q: 'Pyhiinvaeltajat matkasivat Damaskoksesta Medinaan kauan '
          + 'ennen rautatietä. Miten pitkä erämaataival tehtiin?',
        vaihtoehdot: [
          'Kamelikaravaaneissa, joissa kulki tuhansia ihmisiä yhdessä',
          'Jokilaivoilla virtaa pitkin',
          'Härkävankkureilla tietä pitkin',
          'Jalkaisin yksin, kukin omaa polkuaan',
        ],
        oikea: 0,
        fakta: 'Pyhiinvaellus kulki suurina kamelikaravaaneina: tuhansia '
          + 'ihmisiä, kameleita ja vesivarastoja eteni yhdessä noin '
          + 'neljäkymmentä päivää Damaskoksesta Medinaan. Karavaani oli '
          + 'kuin liikkuva kaupunki, jota kaivot ja levähdyspaikat '
          + 'rytmittivät.',
      },
      aarre: 'Kätkö oli kaivon kivijalassa, nimikirjainten alla irtokiven '
        + 'takana. Omar laski kiven paikalleen: "Kaivolla käy tuhansia '
        + 'käsiä vuodessa. Silti juuri tämä kivi on aina ollut tiukassa '
        + '— eilen se oli löysällä."',
    },
    {
      id: 'mekka',
      lauta: 'middleeast',
      luennat: false,
      nimi: 'Bilal',
      otsikko: 'Mekka — suunta jota koko maailma katsoo',
      saapuminen: 'Jiddan satamassa laivat purkivat pyhiinvaeltajia aamusta '
        + 'iltaan, ja kaikilla oli sama määränpää, jonne minun tieni ei '
        + 'vie: pyhä kaupunki vuorten takana. Istuin satamassa vanhan '
        + 'oppaan kanssa, joka oli saattanut kulkijoita koko ikänsä. '
        + 'Hän piirsi hiekkaan viivan ja sanoi: minne ikinä menetkin, '
        + 'tämä suunta kulkee mukanasi. Katso kirjastasi — sinne on '
        + 'piirretty sama viiva.',
      henkilo: 'Pyhiinvaeltajien oppaan jälkeläinen Bilal saattaa kulkijoita '
        + 'Jiddan satamasta vuoristotielle, kuten isänsä ja tämän isä.',
      kohtaaminen: 'Bilal tasoittaa hiekan kämmenellään satamalaiturilla. '
        + '"Isoisäni saattoi kerran matkalaisen, joka ei mennyt '
        + 'kaupunkiin mutta kysyi enemmän kuin kukaan kulkija. Hänen '
        + 'kysymyksensä jäi suvullemme. Vastaa."',
      kysymys: {
        q: 'Muslimit rukoilevat kaikkialla maailmassa samaan suuntaan. '
          + 'Mihin rukous suunnataan?',
        vaihtoehdot: [
          'Kohti Mekkaa ja sen Kaabaa',
          'Kohti nousevaa aurinkoa',
          'Kohti Jerusalemia',
          'Jokainen omaan kotikaupunkiinsa päin',
        ],
        oikea: 0,
        fakta: 'Rukoussuunta eli qibla osoittaa Mekkaan, Kaaban luo, joka '
          + 'puolelta maailmaa. Moskeijoissa suunnan näyttää '
          + 'seinäsyvennys nimeltä mihrab — ja merenkulkijat ja '
          + 'tähtitieteilijät laskivat qiblan suuntia jo keskiajalla.',
      },
      aarre: 'Oppaan sauvan kädensijan sisällä odotti kapea kätkö. Bilal '
        + 'kiersi kädensijan takaisin: "Sauva on kulkenut suvussa neljä '
        + 'polvea. Kierteet ovat kuluneet sileiksi — mutta ne aukesivat '
        + 'kuin eilen öljytyt."',
    },
    {
      id: 'mosul',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Mosul — kangas ohuempi kuin aamu-usva',
      saapuminen: 'Kutomon ikkunasta näkyi Tigris, ja puilla syntyi kangasta '
        + 'niin ohutta, että sen läpi saattoi lukea kirjettä. Tätä '
        + 'kangasta on viety maailmalle meidän kaupunkimme nimellä, '
        + 'kutoja sanoi. Hän avasi arkun ja nosti esiin harson, johon '
        + 'oli kiedottu jotakin. Tämä jätettiin pantiksi, hän sanoi. '
        + 'Panttia ei lunastettu. Vielä.',
      henkilo: 'Kankaankutoja Layla kutoo ohutta musliinia samoilla puilla '
        + 'kuin sukunsa, ja arkussa säilyvät myös lunastamattomat '
        + 'pantit.',
      kohtaaminen: 'Layla laskee harson pöydälle kuin henkäyksen. "Pantin '
        + 'jättäjä sanoi: se lunastetaan vastauksella, ei rahalla. '
        + 'Kysymys koskee kangastamme. Vastaa."',
      kysymys: {
        q: 'Ohut, ilmava puuvillakangas musliini on saanut nimensä '
          + 'kaupungista. Mistä?',
        vaihtoehdot: [
          'Mosulista',
          'Moskovasta',
          'Marseillesta',
          'Maskatista',
        ],
        oikea: 0,
        fakta: 'Musliini kulki Eurooppaan Mosulin kauppateitse, ja kaupungin '
          + 'nimi tarttui kankaaseen: ranskan mousseline ja meidän '
          + 'musliinimme muistavat yhä Mosulin. Hienointa musliinia '
          + 'kudottiin niin ohueksi, että sitä kutsuttiin kudotuksi '
          + 'ilmaksi.',
      },
      aarre: 'Harson sisältä paljastui kätkö, kevyt kuin tyhjä. Layla '
        + 'taitteli kankaan takaisin: "Musliini kellastuu arkussa '
        + 'vuosikymmenessä. Tämä harso on valkoinen — se on vaihdettu '
        + 'uuteen, eikä vaihtaja ollut minä."',
    },
    {
      id: 'nikosia',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Nikosia — saari joka antoi nimen kuparille',
      saapuminen: 'Muurit kiersivät kaupungin täydellisenä tähtenä — laskin '
        + 'vallisakarat: yksitoista. Sepänkujalla vasarat kalkuttivat '
        + 'kuparia, ja vanhin sepistä näytti minulle harkon, jossa oli '
        + 'lyötynä merkki härän taljan muotoon. Tällaisina harkkoina '
        + 'saaremme kupari kulki maailmalle jo ennen kreikkalaisia, hän '
        + 'sanoi. Tämä harkko odottaa hakijaansa kauempaa kuin muistan.',
      henkilo: 'Kaivosmiehen jälkeläinen Andreas takoo kuparia kujalla, '
        + 'jolla saaren punainen metalli on soinut aina.',
      kohtaaminen: 'Andreas kääntää harkkoa pihdeissä. "Harkon toi mies, joka '
        + 'maksoi säilytyksestä sata vuotta etukäteen — ja jätti '
        + 'kysymyksen saaremme metallista. Vastaa, niin harkko on '
        + 'sinun."',
      kysymys: {
        q: 'Kyproksen saari ja eräs metalli ovat antaneet nimen '
          + 'toisilleen. Mikä metalli?',
        vaihtoehdot: [
          'Kupari',
          'Hopea',
          'Tina',
          'Rauta',
        ],
        oikea: 0,
        fakta: 'Kupari sai latinankielisen nimensä Kyproksesta: aes Cyprium, '
          + 'Kyproksen metalli, lyheni muotoon cuprum — siitä kupari. '
          + 'Saaren kaivokset olivat antiikin maailman tärkeimpiä, ja '
          + 'kuparia laivattiin härän taljan muotoisina harkkoina.',
      },
      aarre: 'Harkko oli valettu ontoksi, ja sisällä odotti kätkö. Andreas '
        + 'punnitsi puolikkaita: "Valu on vanhaa työtä. Mutta sauma on '
        + 'juotettu uudelleen — ja juote kiiltää kuin tämän vuoden '
        + 'takoa."',
    },
    {
      id: 'persepolis',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Persepolis — kulkue joka ei koskaan pääty',
      saapuminen: 'Rauniokaupungin portaita nousin keskellä kivistä kulkuetta: '
        + 'seinään oli veistetty satojen lahdenkantajien jono, ja '
        + 'jokainen kantoi jotakin — kannua, kangasta, karitsaa. '
        + 'Paimen, joka laidunsi laumaansa raunioilla, näytti minulle '
        + 'kohdan, jossa yksi veistetty kantaja kantaa arkkua ilman '
        + 'koristetta. Sitä ei ole viimeistelty, hän sanoi. Tai sitten '
        + 'se odottaa jotakin.',
      henkilo: 'Paimen Dariush tuntee rauniot lampaidensa laitumena ja '
        + 'kivikulkueen hahmot paremmin kuin moni oppinut.',
      kohtaaminen: 'Dariush nojaa sauvaansa reliefin äärellä. "Isoisäsi istui '
        + 'tämän seinän edessä päivän ja piirsi kulkueen kirjaansa. '
        + 'Lähtiessään hän jätti kysymyksen: minkä juhlan kulkue tämä '
        + 'on? Vastaa."',
      kysymys: {
        q: 'Persepoliin seiniin on veistetty loputon kulkue, jossa eri '
          + 'kansat tuovat lahjoja kuninkaalle. Mitä juhlaa varten '
          + 'kaupunki rakennettiin?',
        vaihtoehdot: [
          'Kevään uudenvuodenjuhlaa, jota vietetään päiväntasauksena',
          'Kuninkaan syntymäpäivää keskitalvella',
          'Sadonkorjuujuhlaa syksyllä',
          'Voitonjuhlaa sotaretkien jälkeen',
        ],
        oikea: 0,
        fakta: 'Persepolis oli Persian kuninkaiden juhlakaupunki, jonne '
          + 'valtakunnan kansat toivat lahjansa Nowruzin, '
          + 'kevätpäiväntasauksen uudenvuodenjuhlan, aikaan. Nowruzia '
          + 'juhlitaan yhä — se on kevään ja uuden alun juhla.',
      },
      aarre: 'Koristelemattoman arkun takana kivi oli irti, ja kolossa '
        + 'odotti kätkö. Dariush laski kiven takaisin: "Lampaani '
        + 'kulkevat tästä joka päivä, eivätkä ne säikähdä mitään '
        + 'tuttua. Kolme aamua sitten koko lauma pysähtyi tähän."',
    },
    {
      id: 'petra',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Petra — kallioon veistetty aarrekammio',
      saapuminen: 'Kuljin kapeaa rotkoa, jonka seinät nousivat niin korkealle, '
        + 'että taivas oli enää halkeama — ja sitten rotko aukesi, ja '
        + 'edessä seisoi palatsi, veistetty suoraan ruusunpunaiseen '
        + 'kallioon. Oppaani osoitti julkisivun huipulla olevaa '
        + 'kiviuurnaa: sitä sanotaan aarrekammioksi, koska uurnan '
        + 'uskotaan kätkevän faaraon kullan. Uurnassa näkyi kolhuja. '
        + 'Moni on yrittänyt, opas sanoi. Kukaan ei ole kysynyt.',
      henkilo: 'Beduiiniopas Suleiman johdattaa kulkijat rotkon läpi ja '
        + 'tuntee kallioiden värit jokaisena vuorokaudenaikana.',
      kohtaaminen: 'Suleiman istahtaa aarrekammion portaille. "Isoisäsi ei '
        + 'katsonut uurnaa vaan kalliota sen alla — ja jätti minun '
        + 'isoisälleni kysymyksen tästä kaupungista. Vastaa, niin '
        + 'näytän mitä hän katsoi."',
      kysymys: {
        q: 'Petran rakennuksia ei muurattu kivistä. Miten ne tehtiin?',
        vaihtoehdot: [
          'Ne veistettiin suoraan kallioseinään ylhäältä alaspäin '
            + 'edeten',
          'Ne valettiin savesta ja poltettiin kovaksi',
          'Ne koottiin muualta tuoduista marmorilohkoista',
          'Ne kaivettiin maan alle ja katettiin puulla',
        ],
        oikea: 0,
        fakta: 'Nabatealaiset veistivät Petran temppelit ja haudat suoraan '
          + 'hiekkakivikallioon — työ eteni ylhäältä alas, telineinä itse '
          + 'kallio. Kuuluisin julkisivu, al-Khazneh, tarkoittaa '
          + 'aarrekammiota: tarun faaraon kulta uskottiin kätketyksi sen '
          + 'kiviuurnaan.',
      },
      aarre: 'Kallion juurella, veistäjien vanhan jalansijan kolossa, '
        + 'odotti kätkö. Suleiman pyyhkäisi punaista hiekkaa: "Rotkon '
        + 'tuuli täyttää tällaisen kolon hiekalla kuukaudessa. Tämä oli '
        + 'lakaistu puhtaaksi."',
    },
    {
      id: 'riad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Riad — savilinnojen kaupunki',
      saapuminen: 'Aavikon keskeltä nousi kaupunki, jonka muurit ja tornit oli '
        + 'rakennettu auringossa kuivatusta savesta. Keskipäivän '
        + 'helteellä talojen sisällä oli viileää kuin kaivossa, ja '
        + 'illalla seinät hehkuivat päivän keräämää lämpöä. '
        + 'Kaivonkaivaja näytti minulle kaivon, jonka pohjalta oli '
        + 'hänen isänsä aikana nostettu vieras työkalu: pieni '
        + 'messinkinen luoti mittanauhoineen. Kukaan kaupungissa ei '
        + 'mitannut sellaisella.',
      henkilo: 'Kaivonkaivaja Abdullah löytää veden aavikon alta merkeistä, '
        + 'jotka hänen sukunsa on oppinut lukemaan hiekasta ja '
        + 'kasveista.',
      kohtaaminen: 'Abdullah kelaa köyttä kaivolta. "Työkalun omistaja kävi '
        + 'täällä ja kysyi, miksi rakennamme savesta emmekä kivestä. '
        + 'Hän tiesi vastauksen itse — ja jätti kysymyksen perinnöksi. '
        + 'Vastaa."',
      kysymys: {
        q: 'Aavikkokaupunkien talot rakennettiin auringossa kuivatuista '
          + 'savitiilistä. Miksi savi sopii aavikolle niin hyvin?',
        vaihtoehdot: [
          'Paksut saviseinät pitävät päivän helteen ulkona ja yön '
            + 'kylmyyden loitolla',
          'Savi hylkii hiekkaa, joten myrskyt eivät kuluta sitä',
          'Savi on aavikolla kiveä kalliimpaa ja siksi arvokasta',
          'Savitalot voi siirtää mukana uuteen paikkaan',
        ],
        oikea: 0,
        fakta: 'Paksu savitiiliseinä varastoi lämpöä hitaasti: päivällä '
          + 'sisällä pysyy viileää ja kylmänä aavikkoyönä seinä luovuttaa '
          + 'päivän lämmön takaisin. Siksi savesta rakennettiin aavikolla '
          + 'kaikkialla — ja siksi vanhat savilinnat tuntuvat sisältä '
          + 'kaivoilta.',
      },
      aarre: 'Kätkö nousi kaivosta samassa sangossa kuin vesi, savikuoreen '
        + 'valettuna. Abdullah rikkoi kuoren: "Savi on meidän '
        + 'savontamme. Mutta sen sisällä oleva kääre on kuiva — se ei '
        + 'ole ollut kaivossa viikkoa kauempaa."',
    },
    {
      id: 'rubalkhali',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Rub al-Khali — hiekka joka laulaa',
      saapuminen: 'Dyynit jatkuivat horisonttiin kuin punainen meri, ja kun '
        + 'aurinko laski, kuulin sen: matalan huminan, joka nousi '
        + 'hiekasta itsestään, kun dyynin rinne valui. Beduiinioppaani '
        + 'hymyili: hiekka laulaa, kun se puhuu totta. Leiripaikalta '
        + 'löysin kiven, jonka alle oli taitettu paperi. Se oli sivu '
        + 'jonkun matkakirjasta. Käsialan tunsin, sivun numeron '
        + 'tunnistin — omasta kirjastani puuttuu sama sivu.',
      henkilo: 'Jäljenlukija Saif kulkee Tyhjän neljänneksen reunoja ja '
        + 'lukee dyyneistä, kuka on kulkenut ja milloin, kuin kirjaa.',
      kohtaaminen: 'Saif kyykistyy dyynin rinteeseen ja pyyhkäisee hiekkaa. '
        + '"Sivun jätti mies, jonka jäljet isoisäni luki: kamelin askel '
        + 'kevyt, miehen askel painava — hän kantoi jotain tullessaan '
        + 'eikä lähtiessään. Vastaa hänen kysymykseensä, niin luen '
        + 'sinulle loput jäljet."',
      kysymys: {
        q: 'Rub al-Khalin dyyneillä voi kuulla oudon äänen, kun hiekka '
          + 'valuu rinnettä alas. Mikä ilmiö on kyseessä?',
        vaihtoehdot: [
          'Laulava hiekka — valuvat hiekanjyvät saavat dyynin '
            + 'humisemaan',
          'Tuuli soittaa dyynien onttoja käytäviä',
          'Maan alla virtaava joki kohisee',
          'Kuumuus saa kivet halkeilemaan äänekkäästi',
        ],
        oikea: 0,
        fakta: 'Kun kuiva, tasarakeinen hiekka lähtee valumaan dyynin '
          + 'rinnettä, miljoonat jyvät hankautuvat toisiinsa samassa '
          + 'tahdissa ja dyyni alkaa väristä — syntyy matala humina, '
          + 'jonka kuulee kauas. Ilmiö tunnetaan maailman suurilla '
          + 'hiekka-aavikoilla.',
      },
      aarre: 'Jälkien päässä, leirikiven alla, odotti kätkö — ja sen '
        + 'päällä puuttuva sivuni. Saif katsoi dyynien yli: "Hiekka '
        + 'peittää jäljet kolmessa päivässä. Nämä jäljet on peitetty '
        + 'käsin — ja se, joka peittää jälkiä, aikoo palata."',
    },
    {
      id: 'salalah',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Salalah — rannikko joka vihertyy',
      saapuminen: 'Purjehdimme etelään pitkin rantaa, joka oli paahtunutta '
        + 'kalliota — kunnes se ei ollutkaan: vuoret Salalahin takana '
        + 'olivat vihreät, ja usva valui rinteitä kuin harso. Muu '
        + 'Arabia paahtuu, sanoi kapteeni, mutta tämä rannikko saa oman '
        + 'sateensa. Rannassa suitsukepuiden pihkaa punnittiin '
        + 'vaakakupeissa kuin kultaa, ja yhdessä kupissa painona oli '
        + 'pieni messinkipunnus, jossa luki vieraita kirjaimia. Luin ne '
        + 'kahdesti. Ne olivat suomea: PALAA.',
      henkilo: 'Suitsukkeenkerääjä Mariam viiltää puiden kuorta ja kerää '
        + 'pihkan kyynelinä, kuten hänen sukunsa on kerännyt aina.',
      kohtaaminen: 'Mariam laskee punnuksen kämmenelleni. "Punnuksen jätti '
        + 'matkalainen, joka osti pihkaa yhden kyynelen verran ja '
        + 'maksoi kuin säkistä. Hän sanoi: kysymys on hinta. Vastaa '
        + 'siihen, niin kerron mitä hän oikeasti osti."',
      kysymys: {
        q: 'Salalahin rannikko vihertyy kesällä, kun muu Arabian '
          + 'niemimaa paahtuu. Mikä sen selittää?',
        vaihtoehdot: [
          'Khareef-monsuuni tuo mereltä usvan ja sateet juuri tälle '
            + 'rannikolle',
          'Vuorten lumi sulaa kesällä rinteille',
          'Joet tuovat vettä Afrikasta asti',
          'Rannikolla sataa talvella kymmenen kuukautta',
        ],
        oikea: 0,
        fakta: 'Kesäinen khareef-monsuuni osuu Arabian niemimaalla juuri '
          + 'Dhofarin rannikkoon: meri-ilma nousee vuoria vasten usvaksi '
          + 'ja tihkuksi, ja Salalahin seutu vihertyy keskellä kuuminta '
          + 'kesää. Samoilta seuduilta kerätään maailman parasta '
          + 'suitsukepihkaa.',
      },
      aarre: 'Vaakakaapin kaksoispohjasta löytyi kätkö. Mariam punnitsi '
        + 'sen kaupan päälle: "Se painaa täsmälleen punnuksen verran. '
        + 'Kukaan ei tee sellaista vahingossa — kätkö on punnittu tällä '
        + 'vaakakupilla."',
    },
    {
      id: 'sana',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Sanaa — tornitalojen kaupunki',
      saapuminen: 'Kaupunki nousi edessäni monikerroksisina savitorneina, '
        + 'joiden ikkunoita kiersivät valkoiset kipsiraidat kuin '
        + 'sokerikuorrutus. Auringon laskiessa ikkunoiden puolikuut '
        + 'syttyivät sisältä väreihin: punaiseen, kultaan, vihreään. '
        + 'Ikkunantekijä vei minut työhuoneeseensa katolle ja näytti '
        + 'puolikuun, joka odotti kehyksessään asennusta. Se on ollut '
        + 'valmiina kauan, hän sanoi. Taloa, johon se kuuluu, ei ole '
        + 'vielä sanottu meille.',
      henkilo: 'Ikkunantekijä Hamza valaa kipsiin värilasit, jotka muuttavat '
        + 'auringonlaskun huoneen sisällä juhlaksi, sukunsa viidentenä.',
      kohtaaminen: 'Hamza kohottaa puolikuun valoa vasten. "Ikkunan tilasi '
        + 'matkalainen ja sanoi: asennetaan, kun tulija vastaa '
        + 'kysymykseen. Kysymys koskee talojamme. Vastaa."',
      kysymys: {
        q: 'Sanaan vanhassakaupungissa asutaan taloissa, jotka ovat '
          + 'harvinaisia koko maailmassa. Millaisia ne ovat?',
        vaihtoehdot: [
          'Monikerroksisia savitorneja, joita on koristeltu valkoisin '
            + 'kipsikuvioin',
          'Kokonaan maan alle kaivettuja',
          'Puusta veistettyjä paalutaloja',
          'Yksikerroksisia kivimajoja ilman ikkunoita',
        ],
        oikea: 0,
        fakta: 'Sanaan vanhakaupunki on täynnä satoja vuosia vanhoja '
          + 'tornitaloja: monta kerrosta savitiiltä, joiden ikkunoita ja '
          + 'räystäitä kiertävät valkoiset kipsikoristeet. Ylimpien '
          + 'kerrosten qamariya-ikkunoissa kipsikehys pitää sisällään '
          + 'värilasit, jotka värjäävät auringonvalon.',
      },
      aarre: 'Ikkunakehyksen ontelosta löytyi kätkö. Hamza asetti '
        + 'puolikuun takaisin telineeseen: "Kipsi kovettuu kerran eikä '
        + 'anna periksi. Tämä kehys on avattu taltalla ja kipsattu '
        + 'uudelleen — käsi oli taitava, mutta ei minun."',
    },
    {
      id: 'siinai',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Siinai — kirjasto vuorten sylissä',
      saapuminen: 'Nousimme kamelein paljaiden vuorten väliin, ja laakson '
        + 'pohjalla odotti muurien ympäröimä luostari, vanhempi kuin '
        + 'yksikään tuntemani kirja. Munkki avasi portin ja vei minut '
        + 'kirjastoon, jossa käsikirjoituksia on säilytetty puolitoista '
        + 'vuosituhatta. Yhdellä hyllyllä oli tyhjä kohta ja sen '
        + 'kohdalla lappu. Munkki käänsi lapun minulle: tähän '
        + 'palautetaan se, mikä lainattiin. Lainaajaa ei mainittu. '
        + 'Päivämäärä oli kolmenkymmenen vuoden takaa.',
      henkilo: 'Munkki Gabriel hoitaa luostarin kirjastoa, jossa jokainen '
        + 'käsikirjoitus tunnetaan ja jokainen tyhjä kohta muistetaan.',
      kohtaaminen: 'Gabriel laskee kynttilän hyllyn ääreen. "Lainaaja jätti '
        + 'pantiksi kysymyksen ja sanoi: vastaus on palautus. Kysymys '
        + 'koskee tätä paikkaa. Vastaa."',
      kysymys: {
        q: 'Pyhän Katariinan luostari Siinain vuorilla on erikoinen koko '
          + 'maailmassa. Miksi?',
        vaihtoehdot: [
          'Se on toiminut yhtäjaksoisesti noin puolitoista '
            + 'vuosituhatta, ja sen kirjasto on maailman vanhimpia',
          'Se on rakennettu kokonaan vuoren sisään',
          'Sinne pääsee vain köysillä laskeutumalla',
          'Se siirretään uuteen paikkaan joka vuosisata',
        ],
        oikea: 0,
        fakta: 'Pyhän Katariinan luostari on toiminut keskeytyksettä '
          + '500-luvulta asti — pidempään kuin juuri mikään luostari '
          + 'maailmassa. Sen kirjastossa on säilynyt ainutlaatuisia '
          + 'käsikirjoituksia, ja juuri täältä löydettiin 1800-luvulla '
          + 'yksi vanhimmista Raamatun käsikirjoituksista.',
      },
      aarre: 'Tyhjän kohdan takana, hyllylevyn alla, odotti litteä kätkö. '
        + 'Gabriel suoristi lapun: "Pöly laskeutuu kirjastossa '
        + 'tasaisesti, ja tyhjässä kohdassa sitä ei ollut lainkaan. '
        + 'Joku on koskettanut hyllyä tällä viikolla."',
    },
    {
      id: 'tabriz',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Tabriz — basaari jolla ei näy loppua',
      saapuminen: 'Astuin katetun basaarin holvien alle aamulla, ja kun luulin '
        + 'nähneeni sen kaiken, oli jo ilta. Holvikäytävät haarautuivat '
        + 'kuin joki: mausteet, kupari, kirjat, matot. Mattokauppias '
        + 'levitti eteeni maton ja käänsi sen nurin: solmuja oli niin '
        + 'tiheässä, ettei sormi mahtunut niiden väliin. Hyvä matto '
        + 'tehdään kahdesti, hän sanoi — kerran solmuina, kerran '
        + 'tarinana. Tämän maton tarina on kesken.',
      henkilo: 'Matonkutoja Zahra solmii mattoja, joiden kuviot kulkevat '
        + 'suvussa muistina — jokainen matto kertoo jotakin, jos osaa '
        + 'lukea.',
      kohtaaminen: 'Zahra kääntää keskeneräisen maton loimet esiin. "Maton '
        + 'tilasi matkalainen ja jätti kuvion kesken tahallaan: '
        + 'viimeinen rivi solmitaan, kun joku vastaa hänen '
        + 'kysymykseensä. Kysymys koskee mattojamme. Vastaa."',
      kysymys: {
        q: 'Käsin solmittu itämainen matto syntyy hitaasti. Miten se '
          + 'tehdään?',
        vaihtoehdot: [
          'Solmu kerrallaan käsin — isossa matossa solmuja on miljoonia',
          'Valamalla villa muottiin',
          'Ompelemalla valmiit kuviopalat yhteen',
          'Kutomalla koneella, joka toistaa kuvion',
        ],
        oikea: 0,
        fakta: 'Solmumatto syntyy käsin solmu kerrallaan: kutoja kiertää '
          + 'villalangan loimiin ja katkaisee sen, riviltä toiselle. '
          + 'Hienossa matossa on satoja solmuja neliösenttimetrillä — '
          + 'kokonaisessa matossa miljoonia — ja työ kestää kuukausia tai '
          + 'vuosia.',
      },
      aarre: 'Maton kääröstä, loimien välistä, löytyi kätkö. Zahra laski '
        + 'sormensa keskeneräiselle riville: "Tähän on solmittu kolme '
        + 'solmua, joita minä en ole solminut. Ne ovat oikein '
        + 'solmittuja — mutta lanka on värjätty toisessa kaupungissa."',
    },
    {
      id: 'teheran',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Teheran — sali joka on tehty peileistä',
      saapuminen: 'Palatsin salissa pysähdyin ovelle: seinät ja katto oli '
        + 'katettu tuhansilla peilinpaloilla, ja yksi kynttilä syttyi '
        + 'tuhanneksi. Oppaani kertoi tarinan: peilit tilattiin kaukaa '
        + 'meren takaa, mutta ne saapuivat perille pirstoutuneina — ja '
        + 'mestarit päättivät, etteivät heitä sirpaleita pois vaan '
        + 'tekevät niistä jotakin kauniimpaa. Yhdessä nurkassa '
        + 'peilipinnassa oli himmeä pala. Sen takana ei ollut peiliä. '
        + 'Sen takana oli lokero.',
      henkilo: 'Peilimosaiikin korjaaja Reza vaihtaa saliin himmenneet palat '
        + 'uusiin ja tuntee jokaisen sirpaleen paikan.',
      kohtaaminen: 'Reza nostaa himmeän palan varovasti irti. "Lokeron teki '
        + 'mestari, joka sai maksun matkalaiselta: pitäkää pala '
        + 'himmeänä, kunnes kysyjä tulee. Kysymys on tarina tästä '
        + 'salista. Vastaa."',
      kysymys: {
        q: 'Persialaisten palatsien peilisalit kimaltavat tuhansina '
          + 'sirpaleina. Miten tarinan mukaan tämä taide sai alkunsa?',
        vaihtoehdot: [
          'Peilit saapuivat Euroopasta rikkoutuneina, ja sirpaleista '
            + 'tehtiin mosaiikkia',
          'Kuningas rikkoi peilit, ettei näkisi itseään vanhana',
          'Sirpaleet tuotiin meren pohjasta hylyistä',
          'Kokonaisia peilejä ei osattu valmistaa',
        ],
        oikea: 0,
        fakta: 'Tarinan mukaan Eurooopasta laivatut suuret peilit särkyivät '
          + 'matkalla — ja persialaiset mestarit tekivät tappiosta '
          + 'taidetta: sirpaleet ladottiin kipsiin mosaiikiksi, joka '
          + 'rikkoo valon tuhansiksi kimalluksiksi. Peilimosaiikista eli '
          + 'aina-karista tuli palatsien ylpeys.',
      },
      aarre: 'Lokerossa odotti kätkö, peilinpalan kokoinen. Reza sovitti '
        + 'himmeän palan takaisin: "Vaihdan himmenneet palat joka vuosi '
        + '— tämä on ainoa, jonka olen käsketty jättää. Mutta kipsi sen '
        + 'ympärillä on uusittu, eikä uusija ollut minä."',
    },
  ],
};
