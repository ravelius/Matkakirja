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
      aarre: 'Kätkön päällä oli kynttilänpätkä, sydän yhä lämmin. Tomáš '
        + 'sytytti sen uudelleen: "Kynttilöitä oli tilauksessa kaksi — '
        + 'toinen palaa jossain, missä maa on lämmin." Jäin miettimään: '
        + 'kuka vartioi sitä toista?',
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
      aarre: 'Kätkö nousi vedestä köyden päässä, ja valo osui '
        + 'kivikasvoihin. Emine sanoi hiljaa: "Isoisoäitini kirjoitti '
        + 'kirjaan, kumpi kasvoista on vartija ja kumpi vanki — joku on '
        + 'leikannut sen sivun irti."',
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
      aarre: 'Kätkön päällä seisoi kolmas lyhty, lasi yhä lämmin. Anton '
        + 'puhui portaita kohti: "Veto tulee ovesta, jota ei minun '
        + 'aikanani ole avattu — ja kirjassa lukee vain: sinne ei mennä '
        + 'alakautta."',
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
      aarre: 'Kätkö nousi kanaalista, ja naamio jäi kellumaan kasvot '
        + 'ylöspäin. Lucia sulki tilauskirjan: "Joku palautti toisen '
        + 'naamion viime keväänä — jätti vain lapun, jossa oli '
        + 'ilmanpaineen lukema." Barometrilukema. Aivan kuin isoisän '
        + 'kirjassa.',
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
      aarre: 'Kätkö odotti lämpimän seinän takana, höyryn peitossa. '
        + 'Portilla Márta sanoi: "Isoisoäitinikin pyyhki merkin — silti '
        + 'risti on aamulla aina seinässä, aina samaa valkoista '
        + 'liitua." Katsoin taakseni vielä portilta. Käytävä oli tyhjä.',
    },
  ],
};
