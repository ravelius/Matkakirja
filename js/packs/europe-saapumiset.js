// Euroopan matkakirjamerkinnät: nuoren herran tunnepitoinen kuvaus ja
// isoisän nosto, samaan malliin kuin Afrikassa. Rakentuu kaupunki
// kerrallaan. Luennat: puhe-europe-saapuminen-<id>.mp3 (ks.
// SAAPUMISLUENNAT js/sisaltotaulut.js:ssä — vain siellä listatuilla kaupungeilla
// kaiutinnappi syttyy).
//
// Lontoon, Pariisin, Rooman ja Ateenan tekstit ovat Fablen kirjoittamia:
// hän ehti generoida niistä luennat, mutta tekstit eivät päätyneet
// repoon. Ne on palautettu ElevenLabsin historiasta sanatarkasti, jotta
// ruudulla lukee täsmälleen se, mitä kertoja lukee.
export const EUROPE_SAAPUMISET = {
  /*
   * Dekkarimerkinnät (docs/isoisan-raamattu.md, 7.8.2026): viisi
   * ensimmäistä kaupunkia uusittu — imu matkakirjasta, tieto
   * lehdestä. luenta-kenttä on sama teksti tunnetageineen
   * ElevenLabsille (tools/generoi-luennat.mjs).
   *
   * Omistajan tarkennus 7.8.2026: "aivan liian pitkiä. Ottaisin alun
   * kuvauksen pois kokonaan ja aloittaisin suoraan tarinasta. Ja
   * loppukin kannattaa lyhentää." — Ei siis kuvailevaa avausta:
   * ensimmäinen virke on jo tarinassa. Kuvaus ~150–170 merkkiä,
   * nosto ~110–160. JA: Euroopassa on neljä aloituskaupunkia ja
   * maailmankartalta tullaan Ateenan kautta — mikään merkintä (ei
   * myöskään Lontoo) ei saa olettaa olevansa matkan alku.
   */
  /*
   * Lontoo lyhennettiin vielä virkkeellä 7.8.2026 (omistaja: "yhden
   * lauseen verran liian pitkä. Kannattaa pyrkiä hieman lyhyempiin
   * teksteihin") — "minä jatkan siitä, mihin hän jäi" putosi pois:
   * sähke ja liituristi kantavat yksinään.
   */
  lontoo: {
    kuvaus: 'St Pancrasin sumussa avasin isoisän matkalaukun '
      + 'salataskun: kellastunut sähke. "PALATKAA HETI. G. TIETÄÄ." '
      + 'Isoisä ei palannut.',
    nosto: 'Matkakirjan ensimmäisellä sivulla lukee: "Sinä, joka tätä '
      + 'luet: älä usko ketään, joka väittää, ettei aarteita ole." '
      + 'Kulmassa on pieni liituristi.',
    luenta: '[curious] St Pancrasin sumussa avasin isoisän '
      + 'matkalaukun salataskun: kellastunut sähke. [whispers] '
      + '"Palatkaa heti. G. tietää." [softly] Isoisä ei palannut. '
      + 'Matkakirjan ensimmäisellä sivulla lukee: [warmly] "Sinä, '
      + 'joka tätä luet: älä usko ketään, joka väittää, ettei '
      + 'aarteita ole." [whispers] Kulmassa on pieni liituristi.',
  },

  /*
   * Dekkariuusinnat 7.8.2026 (omistaja: "lyhennä ja generoi uudet
   * matkakirjat lehtikaupunkeihin sekä viiteen muuhun"): Pariisi,
   * Ateena, Rooma, Istanbul ja Moskova samalla lyhyellä kaavalla
   * kuin viisi ensimmäistä. Motiivibudjetti (raamattu): messinkiavain
   * Pariisi (pari: Madridin kohtaaminen), punta Rooma, E. G:n kortti
   * vain Kairossa (africa-saapumiset).
   */
  /* Uusi malli — ks. Edinburghin kommentti. */
  pariisi: {
    kuvaus: 'Kioskin myyjä työnsi lehden kainalooni: "Sivu '
      + 'yhdeksän, monsieur." Sivulla oli ilmoitus: '
      + '"Löytötavaratoimistossa englantilainen matkalaukku '
      + 'vuodelta 1873. Noudettava ennen sunnuntaita." Tänään on '
      + 'lauantai.',
    luenta: '[curious] Kioskin myyjä työnsi lehden kainalooni: '
      + '"Sivu yhdeksän, monsieur." [softly] Sivulla oli ilmoitus: '
      + '[whispers] "Löytötavaratoimistossa englantilainen '
      + 'matkalaukku vuodelta 1873. Noudettava ennen sunnuntaita." '
      + '[curious] Tänään on lauantai.',
  },

  /* Uusi malli — ks. Edinburghin kommentti. */
  ateena: {
    kuvaus: 'Torin kauppias antoi minun maistaa oliiveja kolmesta '
      + 'ruukusta ja kysyi, mikä vuori maistui parhaalta. Nauroin, '
      + 'kunnes hän osoitti rinteitä kaupungin takana: jokainen '
      + 'ruukku oli omaltaan. Ostin pussillisen sitä vuorta, jonka '
      + 'nimeä en osannut lausua.',
    luenta: '[curious] Torin kauppias antoi minun maistaa oliiveja '
      + 'kolmesta ruukusta ja kysyi, mikä vuori maistui parhaalta. '
      + '[warmly] Nauroin, kunnes hän osoitti rinteitä kaupungin '
      + 'takana: jokainen ruukku oli omaltaan. Ostin pussillisen '
      + 'sitä vuorta, jonka nimeä en osannut lausua.',
  },

  rooma: {
    kuvaus: 'Trevin lähteen pohjalla, kolikoiden seassa, välkkyi yksi '
      + 'jota vesi ei ollut tummentanut: vanha englantilainen punta. '
      + 'Se oli heitetty tänä aamuna.',
    nosto: 'Isoisä kirjoitti: "Heitin kolikon Treviin, kuten tapa '
      + 'vaatii — ja toisen, jotta näkisin vedestä, kuka seisoo '
      + 'takanani." Heitin omani samaan kohtaan.',
    luenta: '[curious] Trevin lähteen pohjalla, kolikoiden seassa, '
      + 'välkkyi yksi jota vesi ei ollut tummentanut: [whispers] vanha '
      + 'englantilainen punta. Se oli heitetty tänä aamuna. [softly] '
      + 'Isoisä kirjoitti: "Heitin kolikon Treviin, kuten tapa vaatii '
      + '— ja toisen, jotta näkisin vedestä, kuka seisoo takanani." '
      + '[warmly] Heitin omani samaan kohtaan.',
  },

  /*
   * Koko lauta dekkariksi 7.8.2026 (omistaja: "Tee sinä tekstit") —
   * raamatun Eurooppa-suunnitelman sävelet ja elementit: jännitystä
   * vain Edinburghissa, lämpöä, huumoria, haikeutta, ihmetystä ja
   * hengähdyksiä sen ympärillä. Vuoden 1873 tositapahtumat ja
   * rakkaimmat lauseet säilytetty lyhennettyinä.
   */
  kreeta: {
    kuvaus: 'Knossoksen portaat johtavat ylös ja alas yhtä aikaa, ja '
      + 'seinillä nuoret hyppäävät härän yli — maalattuina kolme ja '
      + 'puoli tuhatta vuotta sitten. Eksyin kahdesti.',
    nosto: 'Isoisä kirjoitti: "Sanotaan, että täällä asui hirviö '
      + 'labyrintissa. Minä näin vain palatsin, jossa on liikaa '
      + 'käytäviä." Aloin ymmärtää tarinaa.',
    luenta: '[curious] Knossoksen portaat johtavat ylös ja alas yhtä '
      + 'aikaa, ja seinillä nuoret hyppäävät härän yli — maalattuina '
      + 'kolme ja puoli tuhatta vuotta sitten. Eksyin kahdesti. '
      + '[softly] Isoisä kirjoitti: "Sanotaan, että täällä asui '
      + 'hirviö labyrintissa. Minä näin vain palatsin, jossa on '
      + 'liikaa käytäviä." [whispers] Aloin ymmärtää tarinaa.',
  },

  sisilia: {
    kuvaus: 'Torilla kalaa myytiin laulaen — oikeasti laulaen — ja '
      + 'Etna savusi horisontissa kuin olisi juuri herännyt. '
      + 'Sitruunatarhat kasvavat täällä mustassa laavamullassa.',
    nosto: 'Isoisä merkitsi: "Sisilia on ollut kaikkien maa eikä '
      + 'kenenkään. Siksi sen keittiö on paras Välimerellä." En '
      + 'kiistele ruoasta kenenkään kanssa.',
    luenta: '[excited] Torilla kalaa myytiin laulaen — oikeasti '
      + 'laulaen — ja Etna savusi horisontissa kuin olisi juuri '
      + 'herännyt. [curious] Sitruunatarhat kasvavat täällä mustassa '
      + 'laavamullassa. [softly] Isoisä merkitsi: "Sisilia on ollut '
      + 'kaikkien maa eikä kenenkään. Siksi sen keittiö on paras '
      + 'Välimerellä." [warmly] En kiistele ruoasta kenenkään kanssa.',
  },

  dubrovnik: {
    kuvaus: 'Kävelin muurin päällä koko kierroksen: alla oranssit '
      + 'katot, ulkopuolella meri niin kirkas, että pohja näkyi. Tämä '
      + 'kaupunki pysyi vapaana neuvottelemalla, ei sotimalla.',
    nosto: 'Isoisä kirjoitti: "Ragusa osti rauhansa joka vuosi '
      + 'uudestaan. Halvempaa kuin sota, ja kauniimpaa." Muurit ovat '
      + 'yhä pystyssä.',
    luenta: '[curious] Kävelin muurin päällä koko kierroksen: alla '
      + 'oranssit katot, ulkopuolella meri niin kirkas, että pohja '
      + 'näkyi. Tämä kaupunki pysyi vapaana neuvottelemalla, ei '
      + 'sotimalla. [softly] Isoisä kirjoitti: "Ragusa osti rauhansa '
      + 'joka vuosi uudestaan. Halvempaa kuin sota, ja kauniimpaa." '
      + '[warmly] Muurit ovat yhä pystyssä.',
  },

  sofia: {
    kuvaus: 'Kadun keskellä on lasin alla toinen katu — roomalainen, '
      + 'kaivettu esiin metroa tehdessä. Sofia on rakennettu itsensä '
      + 'päälle monta kertaa.',
    nosto: 'Isoisä kirjoitti: "Uusi pääkaupunki vanhalla paikalla. '
      + 'Roomalaiset tulivat lähteiden takia." Näin ihmisten hakevan '
      + 'niistä vettä yhä.',
    luenta: '[curious] Kadun keskellä on lasin alla toinen katu — '
      + 'roomalainen, kaivettu esiin metroa tehdessä. [whispers] '
      + 'Sofia on rakennettu itsensä päälle monta kertaa. [softly] '
      + 'Isoisä kirjoitti: "Uusi pääkaupunki vanhalla paikalla. '
      + 'Roomalaiset tulivat lähteiden takia." [warmly] Näin ihmisten '
      + 'hakevan niistä vettä yhä.',
  },

  venetsia: {
    kuvaus: 'Rialton laiturilla gondolieeri ojensi kirjekuoren: '
      + '"Teille, herra Fogg." Kukaan ei tiennyt tulostani. Kuoressa '
      + 'oli puolikas sivu — ja käsialan minä tunnen.',
    nosto: 'Isoisä kirjoitti täältä: "Jos jonkin kadotan, toivon '
      + 'kadottavani sen Venetsiassa — täällä mikään ei huku. Se vain '
      + 'odottaa oikeaa nostajaa."',
    luenta: '[curious] Rialton laiturilla gondolieeri ojensi '
      + 'kirjekuoren: "Teille, herra Fogg." ... Kukaan ei tiennyt '
      + 'tulostani. [whispers] Kuoressa oli puolikas sivu — ja '
      + 'käsialan minä tunnen. [softly] Isoisä kirjoitti täältä: "Jos '
      + 'jonkin kadotan, toivon kadottavani sen Venetsiassa — täällä '
      + 'mikään ei huku. [warmly] Se vain odottaa oikeaa nostajaa."',
  },

  marseille: {
    kuvaus: 'Vene kiersi Ifin linnakesaaren hitaasti. Sen tyrmästä '
      + 'pakeni Monte Criston kreivi — maailman kuuluisimmassa '
      + 'seikkailukirjassa — ja minä mietin, mistä kohtaa minä olisin '
      + 'uinut.',
    nosto: 'Isoisä kirjoitti: "Vartija näytti kopin, josta kreivi '
      + 'pakeni — vaikka kreiviä ei ole ollut olemassakaan." Hyvä '
      + 'tarina voittaa aina.',
    luenta: '[excited] Vene kiersi Ifin linnakesaaren hitaasti. Sen '
      + 'tyrmästä pakeni Monte Criston kreivi — maailman '
      + 'kuuluisimmassa seikkailukirjassa — [curious] ja minä mietin, '
      + 'mistä kohtaa minä olisin uinut. [softly] Isoisä kirjoitti: '
      + '"Vartija näytti kopin, josta kreivi pakeni — vaikka kreiviä '
      + 'ei ole ollut olemassakaan." [warmly] Hyvä tarina voittaa '
      + 'aina.',
  },

  granada: {
    kuvaus: 'Alhambrassa vesi solisee huoneesta toiseen pienissä '
      + 'kanavissa — palatsi rakennettiin kuulostamaan viileältä. '
      + 'Vuorilla sen takana oli lunta, vaikka oli kesä.',
    nosto: 'Isoisä merkitsi sivun reunaan: "Sen kauneuden edessä '
      + 'puheliaskin mies vaikenee." Vaikenin minäkin — ja kuuntelin '
      + 'vettä.',
    luenta: '[curious] Alhambrassa vesi solisee huoneesta toiseen '
      + 'pienissä kanavissa — palatsi rakennettiin kuulostamaan '
      + 'viileältä. Vuorilla sen takana oli lunta, vaikka oli kesä. '
      + '[softly] Isoisä merkitsi sivun reunaan: "Sen kauneuden '
      + 'edessä puheliaskin mies vaikenee." [whispers] Vaikenin '
      + 'minäkin — ja kuuntelin vettä.',
  },

  krakova: {
    kuvaus: 'Torin ylle soi torvi, joka vaikenee kesken sävelen — '
      + 'vartijan muistoksi, joka varoitti kaupunkia niin kauan kuin '
      + 'ehti. Soittaja lopettaa yhä samaan kohtaan.',
    nosto: 'Isoisä kirjoitti: "Kaupunki, jota ei ole poltettu — '
      + 'harvinaista näillä main." Hän ei tiennyt, että se pitäisi '
      + 'paikkansa seuraavankin vuosisadan.',
    luenta: '[curious] Torin ylle soi torvi, joka vaikenee kesken '
      + 'sävelen — [softly] vartijan muistoksi, joka varoitti '
      + 'kaupunkia niin kauan kuin ehti. Soittaja lopettaa yhä samaan '
      + 'kohtaan. Isoisä kirjoitti: "Kaupunki, jota ei ole poltettu — '
      + 'harvinaista näillä main." [warmly] Hän ei tiennyt, että se '
      + 'pitäisi paikkansa seuraavankin vuosisadan.',
  },

  sarajevo: {
    kuvaus: 'Jalkakäytävässä kulkee viiva: toisella puolella '
      + 'ottomaanien basaari, toisella wieniläiset kivitalot. Astuin '
      + 'sen yli — idästä länteen yhdellä askeleella.',
    nosto: 'Isoisä ei ehtinyt Sarajevoon. Sivun reunassa lukee vain: '
      + '"Bosniaan, jos aika riittää." Seison tällä viivalla hänen '
      + 'puolestaan.',
    luenta: '[curious] Jalkakäytävässä kulkee viiva: toisella '
      + 'puolella ottomaanien basaari, toisella wieniläiset '
      + 'kivitalot. Astuin sen yli — idästä länteen yhdellä '
      + 'askeleella. [softly] Isoisä ei ehtinyt Sarajevoon. Sivun '
      + 'reunassa lukee vain: [whispers] "Bosniaan, jos aika '
      + 'riittää." [warmly] Seison tällä viivalla hänen puolestaan.',
  },

  islanti: {
    kuvaus: 'Maasta nousee höyryä, vaikka mikään ei pala. Seisoin '
      + 'rotkossa, jossa kaksi mannerlaattaa vetäytyy erilleen — '
      + 'toinen jalka Euroopassa, toinen Amerikassa.',
    nosto: 'Isoisä kirjoitti: "Mittasin kuuman lähteen, kunnes '
      + 'lämpömittarini suuttui. Saari, jossa on tulivuoria ja '
      + 'parlamentti." Parlamentti on niistä vanhempi.',
    luenta: '[curious] Maasta nousee höyryä, vaikka mikään ei pala. '
      + '[excited] Seisoin rotkossa, jossa kaksi mannerlaattaa '
      + 'vetäytyy erilleen — toinen jalka Euroopassa, toinen '
      + 'Amerikassa. [softly] Isoisä kirjoitti: "Mittasin kuuman '
      + 'lähteen, kunnes lämpömittarini suuttui. Saari, jossa on '
      + 'tulivuoria ja parlamentti." [warmly] Parlamentti on niistä '
      + 'vanhempi.',
  },

  /*
   * Edinburgh on suunnitelman ainoa jännityskaupunki — ja G:n
   * viimeinen kosketus Euroopassa (raamattu: "askeleet sumussa
   * kyllä, vaara ei"). Tykki laukaisee jännityksen huumoriksi.
   */
  /*
   * Uusi malli (omistajan päätös 8.8.2026 illalla): saapuminen on
   * pelkkää Reginaldia koko välimitassa, isoisä puhuu visassa ja
   * aarteessa (europe-kaari.js). Pilotti: Edinburgh ja Pietari.
   */
  edinburgh: {
    kuvaus: 'Kujalla kaasulyhdyn valoympyrän reunalla seisoi hahmo '
      + 'liikkumatta, ja omat askeleeni kuuluivat liian kovaa. '
      + 'Astuin lähemmäs — yövartija nosti lakkiaan: "Eksyitte, '
      + 'nuori herra. Täällä kaikki eksyvät ensin." Kävelin hänen '
      + 'perässään valosta valoon.',
    luenta: '[whispers] Kujalla kaasulyhdyn valoympyrän reunalla '
      + 'seisoi hahmo liikkumatta, ja omat askeleeni kuuluivat '
      + 'liian kovaa. [curious] Astuin lähemmäs — [warmly] '
      + 'yövartija nosti lakkiaan: "Eksyitte, nuori herra. Täällä '
      + 'kaikki eksyvät ensin." [softly] Kävelin hänen perässään '
      + 'valosta valoon.',
  },

  dublin: {
    kuvaus: 'Pubin nurkassa joku aloitti sävelmän, ja viulu ja rumpu '
      + 'tulivat perässä itsestään. Kadulla jokainen ovi on maalattu '
      + 'eri väriseksi kuin naapurin.',
    nosto: 'Isoisä kirjoitti: "Pääkatu on leveämpi kuin mikään '
      + 'näkemäni, ja keskellä seisoo Nelson pylväänsä nokassa." '
      + 'Pylväs on poissa — musiikki ei.',
    luenta: '[warmly] Pubin nurkassa joku aloitti sävelmän, ja viulu '
      + 'ja rumpu tulivat perässä itsestään. [curious] Kadulla '
      + 'jokainen ovi on maalattu eri väriseksi kuin naapurin. '
      + '[softly] Isoisä kirjoitti: "Pääkatu on leveämpi kuin mikään '
      + 'näkemäni, ja keskellä seisoo Nelson pylväänsä nokassa." '
      + '[warmly] Pylväs on poissa — musiikki ei.',
  },

  lissabon: {
    kuvaus: 'Keltainen ratikka kiipesi Alfaman kujaa niin ahdasta, '
      + 'että olisin yltänyt seiniin ikkunasta. Ylhäällä koko '
      + 'kaupunki aukesi kerralla — ja joki oli leveä kuin meri.',
    nosto: 'Isoisä kirjoitti: "Seitsemän kukkulaa, ja jokaiselta '
      + 'näkyy meri. Täältä lähdettiin aikoinaan etsimään maailman '
      + 'toista laitaa." Ymmärsin lähtijöitä.',
    luenta: '[excited] Keltainen ratikka kiipesi Alfaman kujaa niin '
      + 'ahdasta, että olisin yltänyt seiniin ikkunasta. Ylhäällä '
      + 'koko kaupunki aukesi kerralla — ja joki oli leveä kuin meri. '
      + '[softly] Isoisä kirjoitti: "Seitsemän kukkulaa, ja '
      + 'jokaiselta näkyy meri. Täältä lähdettiin aikoinaan etsimään '
      + 'maailman toista laitaa." [warmly] Ymmärsin lähtijöitä.',
  },

  madrid: {
    kuvaus: 'Puerta del Solin laidalla eräs mies ei katsonut kelloaan '
      + 'vaan minua — ja avasi sitten tummansinisen sateenvarjon. '
      + 'Taivaalla ei ollut pilveäkään.',
    nosto: 'Isoisä kirjoitti: "Herra G:n sähke ehti hotelliin ennen '
      + 'minua. Vaihdoin majataloa ja nukuin saappaat jalassa."',
    luenta: '[curious] Puerta del Solin laidalla eräs mies ei '
      + 'katsonut kelloaan vaan minua — [whispers] ja avasi sitten '
      + 'tummansinisen sateenvarjon... Taivaalla ei ollut pilveäkään. '
      + '[softly] Isoisä kirjoitti: "Herra G:n sähke ehti hotelliin '
      + 'ennen minua. [whispers] Vaihdoin majataloa ja nukuin '
      + 'saappaat jalassa."',
  },

  barcelona: {
    kuvaus: 'Sagrada Famílian tornit näyttävät sulaneelta '
      + 'hiekkalinnalta, ja niiden välissä kääntyilee nostureita — '
      + 'kirkkoa on rakennettu lähes sataviisikymmentä vuotta.',
    nosto: 'Isoisä ei maininnut kirkkoa — sitä ei ollut aloitettu. '
      + 'Hän kirjoitti: "Täällä puhutaan kieltä, jota en osaa lukea '
      + 'kyltistä." Molemmat jatkavat yhä.',
    luenta: '[curious] Sagrada Famílian tornit näyttävät sulaneelta '
      + 'hiekkalinnalta, ja niiden välissä kääntyilee nostureita — '
      + 'kirkkoa on rakennettu lähes sataviisikymmentä vuotta. '
      + '[softly] Isoisä ei maininnut kirkkoa — sitä ei ollut '
      + 'aloitettu. Hän kirjoitti: "Täällä puhutaan kieltä, jota en '
      + 'osaa lukea kyltistä." [warmly] Molemmat jatkavat yhä.',
  },

  amsterdam: {
    kuvaus: 'Talot nojaavat eteenpäin kuin kuuntelisivat, ja jokaisen '
      + 'harjalla törröttää koukku: huonekalut nostetaan sisään '
      + 'ikkunasta, koska portaat ovat liian kapeat.',
    nosto: 'Isoisä kirjoitti: "Hollantilaiset eivät jää odottamaan '
      + 'maata — he tekevät sitä itse." Hänen aikanaan kuivattiin '
      + 'kokonainen järvi.',
    luenta: '[curious] Talot nojaavat eteenpäin kuin kuuntelisivat, '
      + 'ja jokaisen harjalla törröttää koukku: huonekalut nostetaan '
      + 'sisään ikkunasta, koska portaat ovat liian kapeat. [softly] '
      + 'Isoisä kirjoitti: "Hollantilaiset eivät jää odottamaan '
      + 'maata — he tekevät sitä itse." [warmly] Hänen aikanaan '
      + 'kuivattiin kokonainen järvi.',
  },

  berliini: {
    kuvaus: 'Seurasin muurin mukulakivilinjaa sillalle asti, ja '
      + 'kaiteessa se oli: liituristi. Yösade oli pessyt koko '
      + 'kaupungin — merkki oli kuiva. Joku piirsi sen tänä aamuna.',
    nosto: 'Isoisä kirjoitti: "Kätkin sillan alle sen, mitä en '
      + 'uskalla kuljettaa meren yli." Joku muukin muistaa tämän '
      + 'sillan.',
    luenta: '[curious] Seurasin muurin mukulakivilinjaa sillalle '
      + 'asti, ja kaiteessa se oli: [whispers] liituristi. Yösade oli '
      + 'pessyt koko kaupungin — merkki oli kuiva... Joku piirsi sen '
      + 'tänä aamuna. [softly] Isoisä kirjoitti: "Kätkin sillan alle '
      + 'sen, mitä en uskalla kuljettaa meren yli." [whispers] Joku '
      + 'muukin muistaa tämän sillan.',
  },

  wien: {
    kuvaus: 'Kahvilassa kaakao tuli hopeatarjottimella ja vierellä '
      + 'lasi vettä, jota en ollut pyytänyt. Kukaan ei hoputtanut, '
      + 'vaikka istuin kaksi tuntia.',
    nosto: 'Isoisä kirjoitti: "Keisari avasi tänään vesijohdon, joka '
      + 'tuo veden vuorilta ilman ainuttakaan pumppua." Join siitä '
      + 'hanasta tänään.',
    luenta: '[warmly] Kahvilassa kaakao tuli hopeatarjottimella ja '
      + 'vierellä lasi vettä, jota en ollut pyytänyt. Kukaan ei '
      + 'hoputtanut, vaikka istuin kaksi tuntia. [softly] Isoisä '
      + 'kirjoitti: "Keisari avasi tänään vesijohdon, joka tuo veden '
      + 'vuorilta ilman ainuttakaan pumppua." [curious] Join siitä '
      + 'hanasta tänään.',
  },

  /*
   * Alpeilla esitellään Horation ilmapuntari (raamatun
   * motiivilanka: mittaukset) — saa palata harvakseltaan.
   */
  alpit: {
    kuvaus: 'Juna kiipesi niin jyrkästi, että laukkuni liukui '
      + 'lattialle, ja vastarinteeltä alppitorven ääni ylitti koko '
      + 'laakson. Ilma oli kylmää keskellä heinäkuuta.',
    nosto: 'Isoisä merkitsi ilmapuntarin lukeman tännekin ja '
      + 'kirjoitti: "Jäätikkö ulottuu hotellin portaille. Opas sanoo '
      + 'sen liikkuvan; en nähnyt." Se liikkui sittenkin.',
    luenta: '[excited] Juna kiipesi niin jyrkästi, että laukkuni '
      + 'liukui lattialle, ja vastarinteeltä alppitorven ääni ylitti '
      + 'koko laakson. [curious] Ilma oli kylmää keskellä '
      + 'heinäkuuta. [softly] Isoisä merkitsi ilmapuntarin lukeman '
      + 'tännekin ja kirjoitti: "Jäätikkö ulottuu hotellin '
      + 'portaille. Opas sanoo sen liikkuvan; en nähnyt." [whispers] '
      + 'Se liikkui sittenkin.',
  },

  praha: {
    kuvaus: 'Vanhankaupungin kello löi täyden tunnin: luukut '
      + 'aukesivat, apostolit kulkivat ohi ja kukko kiekui. Koko '
      + 'aukio nosti katseensa yhtä aikaa.',
    nosto: 'Isoisä kirjoitti: "Prahassa on kello, joka näyttää '
      + 'auringon ja kuun paikan mutta ei kiirettä." Myöhästyin sen '
      + 'takia raitiovaunusta.',
    luenta: '[curious] Vanhankaupungin kello löi täyden tunnin: '
      + 'luukut aukesivat, apostolit kulkivat ohi ja kukko kiekui. '
      + '[excited] Koko aukio nosti katseensa yhtä aikaa. [softly] '
      + 'Isoisä kirjoitti: "Prahassa on kello, joka näyttää auringon '
      + 'ja kuun paikan mutta ei kiirettä." [warmly] Myöhästyin sen '
      + 'takia raitiovaunusta.',
  },

  budapest: {
    kuvaus: 'Kylpylässä hiuksistani nousi höyryä ja kaksi herraa '
      + 'pelasi shakkia altaan reunalla. Kukaan ei pitänyt sitä '
      + 'kummempana kuin kahvinjuontia.',
    nosto: 'Isoisä sattui paikalle, kun kaupunki syntyi: "Buda, '
      + 'Óbuda ja Pest yhdistettiin, ja nimi on nyt Budapest. '
      + 'Kartantekijöille riittää töitä." Nimi kesti.',
    luenta: '[curious] Kylpylässä hiuksistani nousi höyryä ja kaksi '
      + 'herraa pelasi shakkia altaan reunalla. Kukaan ei pitänyt '
      + 'sitä kummempana kuin kahvinjuontia. [softly] Isoisä sattui '
      + 'paikalle, kun kaupunki syntyi: "Buda, Óbuda ja Pest '
      + 'yhdistettiin, ja nimi on nyt Budapest. Kartantekijöille '
      + 'riittää töitä." [warmly] Nimi kesti.',
  },

  varsova: {
    kuvaus: 'Vanhakaupunki näytti sadan vuoden takaiselta, kunnes '
      + 'opas näytti valokuvan samasta paikasta sodan jälkeen: '
      + 'pelkkää soraa. Kävelin aukion yli paljon hitaammin.',
    nosto: 'Isoisä merkitsi: "Kadulla puhutaan puolaa ja kirkoissa '
      + 'lauletaan puolaksi, vaikka keisari hallitsee." Puolaa '
      + 'puhutaan yhä.',
    luenta: '[curious] Vanhakaupunki näytti sadan vuoden takaiselta, '
      + 'kunnes opas näytti valokuvan samasta paikasta sodan '
      + 'jälkeen: [softly] pelkkää soraa. Kävelin aukion yli paljon '
      + 'hitaammin. Isoisä merkitsi: "Kadulla puhutaan puolaa ja '
      + 'kirkoissa lauletaan puolaksi, vaikka keisari hallitsee." '
      + '[warmly] Puolaa puhutaan yhä.',
  },

  bukarest: {
    kuvaus: 'Käännyin bulevardilta pihakadulle: viiniköynnös, savuava '
      + 'grilli. Kolme korttelia myöhemmin edessä kohosi maailman '
      + 'painavin rakennus.',
    nosto: 'Isoisä kirjoitti: "Kadut valaistaan tuhannella '
      + 'petrolilampulla — ensimmäisenä maailmassa, niin täällä '
      + 'sanotaan." Nyt valot syttyvät itsestään.',
    luenta: '[curious] Käännyin bulevardilta pihakadulle: '
      + 'viiniköynnös, savuava grilli. [excited] Kolme korttelia '
      + 'myöhemmin edessä kohosi maailman painavin rakennus. '
      + '[softly] Isoisä kirjoitti: "Kadut valaistaan tuhannella '
      + 'petrolilampulla — ensimmäisenä maailmassa, niin täällä '
      + 'sanotaan." [warmly] Nyt valot syttyvät itsestään.',
  },

  kiova: {
    kuvaus: 'Laskeuduin liukuportaita, jotka eivät tuntuneet loppuvan '
      + '— asema on syvemmällä kuin yksikään muu maailmassa. '
      + 'Ylhäällä odottivat kastanjat ja kullatut kupolit.',
    nosto: 'Isoisä kirjoitti: "Puutarhassa istui sokea laulaja '
      + 'bandura sylissään, ja koko seurue vaikeni kuin käskystä." '
      + 'Kiovassa lauletaan yhä — eikä se vaikene käskystä.',
    luenta: '[curious] Laskeuduin liukuportaita, jotka eivät '
      + 'tuntuneet loppuvan — asema on syvemmällä kuin yksikään muu '
      + 'maailmassa. Ylhäällä odottivat kastanjat ja kullatut '
      + 'kupolit. [softly] Isoisä kirjoitti: "Puutarhassa istui '
      + 'sokea laulaja bandura sylissään, ja koko seurue vaikeni '
      + 'kuin käskystä." [warmly] Kiovassa lauletaan yhä — eikä se '
      + 'vaikene käskystä.',
  },

  odessa: {
    kuvaus: 'Nousin merestä kaupunkiin portaita, joissa on melkein '
      + 'kaksisataa askelmaa. Alhaalta näkyvät vain portaat, '
      + 'ylhäältä ei portaita lainkaan — pelkät tasanteet.',
    nosto: 'Isoisä kirjoitti: "Odessassa puhutaan viittä kieltä '
      + 'yhdessä lauseessa ja kaupataan kaikkea, minkä laiva '
      + 'kantaa." Meri on yhä kadun päässä.',
    luenta: '[excited] Nousin merestä kaupunkiin portaita, joissa on '
      + 'melkein kaksisataa askelmaa. [curious] Alhaalta näkyvät '
      + 'vain portaat, ylhäältä ei portaita lainkaan — pelkät '
      + 'tasanteet. [softly] Isoisä kirjoitti: "Odessassa puhutaan '
      + 'viittä kieltä yhdessä lauseessa ja kaupataan kaikkea, minkä '
      + 'laiva kantaa." [warmly] Meri on yhä kadun päässä.',
  },

  moskova: {
    kuvaus: 'Punaisella torilla kelloseppä tarttui hihaani: "Teidän '
      + 'sukunne kello käy viisi minuuttia edellä. Korjasin sen kerran '
      + '— hän ei koskaan hakenut sitä."',
    nosto: 'Isoisä kirjoitti: "Moskovan pakkasessa kelloni jäätyi ja '
      + 'jäi sepälle. Aika sai odottaa — juna ei." Sepän ikkunassa '
      + 'tikittää yhä taskukello.',
    luenta: '[curious] Punaisella torilla kelloseppä tarttui hihaani: '
      + '"Teidän sukunne kello käy viisi minuuttia edellä. [whispers] '
      + 'Korjasin sen kerran — hän ei koskaan hakenut sitä." [softly] '
      + 'Isoisä kirjoitti: "Moskovan pakkasessa kelloni jäätyi ja jäi '
      + 'sepälle. Aika sai odottaa — juna ei." [warmly] Sepän '
      + 'ikkunassa tikittää yhä taskukello.',
  },

  /* Uusi malli — ks. Edinburghin kommentti. */
  pietari: {
    kuvaus: 'Eremitaasin salissa kissa käveli ohitseni kuin '
      + 'virkamies kiireisellä asialla. Vahtimestari kuiskasi: '
      + 'kissat ovat vartioineet tauluja keisarinnan ajoista, ja '
      + 'jokaisella on oma kerros.',
    luenta: '[curious] Eremitaasin salissa kissa käveli ohitseni '
      + 'kuin virkamies kiireisellä asialla. [whispers] '
      + 'Vahtimestari kuiskasi: kissat ovat vartioineet tauluja '
      + 'keisarinnan ajoista, [warmly] ja jokaisella on oma '
      + 'kerros.',
  },

  tallinna: {
    kuvaus: 'Tallinna nousi merestä kuin satukirjan kuva: punaiset '
      + 'torninhatut ja Toompean kallio kaiken yllä. '
      + 'Raatihuoneentorilla seurasin paahdettujen mantelien tuoksua '
      + 'kolme korttelia.',
    nosto: 'Isoisä kirjoitti: "Revalissa laiva purki lastinsa '
      + 'aamulla, ja juna vei sen Pietariin ennen iltaa." Asema on '
      + 'yhä paikallaan.',
    luenta: '[excited] Tallinna nousi merestä kuin satukirjan kuva: '
      + 'punaiset torninhatut ja Toompean kallio kaiken yllä. '
      + '[curious] Raatihuoneentorilla seurasin paahdettujen '
      + 'mantelien tuoksua kolme korttelia. [softly] Isoisä '
      + 'kirjoitti: "Revalissa laiva purki lastinsa aamulla, ja juna '
      + 'vei sen Pietariin ennen iltaa." [warmly] Asema on yhä '
      + 'paikallaan.',
  },

  riika: {
    kuvaus: 'Keskustorin hallit kaartuivat pääni päällä kuin '
      + 'ylösalaiset veneet, ja myyjä ojensi palan tummaa ruisleipää '
      + 'kysymättä mitään. Talojen seiniltä tuijottivat kivikasvot.',
    nosto: 'Isoisä kirjoitti: "Riiassa lauloi tänään tuhat ihmistä '
      + 'yhtä aikaa latviaksi." Ne laulujuhlat pidetään yhä.',
    luenta: '[warmly] Keskustorin hallit kaartuivat pääni päällä '
      + 'kuin ylösalaiset veneet, ja myyjä ojensi palan tummaa '
      + 'ruisleipää kysymättä mitään. [curious] Talojen seiniltä '
      + 'tuijottivat kivikasvot. [softly] Isoisä kirjoitti: '
      + '"Riiassa lauloi tänään tuhat ihmistä yhtä aikaa latviaksi." '
      + '[warmly] Ne laulujuhlat pidetään yhä.',
  },

  vilna: {
    kuvaus: 'Aamunportin ali kulkiessa ohikulkijat nostivat hattuaan, '
      + 'ja jokaisen mutkan takaa nousi uusi barokkitorni. Tässä '
      + 'kaupungissa eksyy mielellään.',
    nosto: 'Isoisä kirjoitti: "Kirjoja ei saa painaa omilla '
      + 'kirjaimilla — ne kannetaan rajan yli säkeissä yöllä." '
      + 'Kirjankantajilla on nykyään patsas.',
    luenta: '[curious] Aamunportin ali kulkiessa ohikulkijat '
      + 'nostivat hattuaan, ja jokaisen mutkan takaa nousi uusi '
      + 'barokkitorni. Tässä kaupungissa eksyy mielellään. [softly] '
      + 'Isoisä kirjoitti: "Kirjoja ei saa painaa omilla kirjaimilla '
      + '— [whispers] ne kannetaan rajan yli säkeissä yöllä." '
      + '[warmly] Kirjankantajilla on nykyään patsas.',
  },

  istanbul: {
    kuvaus: 'Bosporin lautan teenmyyjä nyökkäsi minulle kuin tutulle: '
      + '"Sama paikka kuin hänellä aina — perän penkki, selkä '
      + 'merelle." En ollut käynyt täällä koskaan.',
    nosto: 'Isoisä kirjoitti: "Kahden maanosan kaupungissa vaihda '
      + 'rantaa aina, kun joku katsoo liian kauan. Lautta maksaa '
      + 'kolikon, rauha ei mitään." Istuin perän penkille.',
    luenta: '[curious] Bosporin lautan teenmyyjä nyökkäsi minulle '
      + 'kuin tutulle: "Sama paikka kuin hänellä aina — perän penkki, '
      + 'selkä merelle." [whispers] En ollut käynyt täällä koskaan. '
      + '[softly] Isoisä kirjoitti: "Kahden maanosan kaupungissa '
      + 'vaihda rantaa aina, kun joku katsoo liian kauan. Lautta '
      + 'maksaa kolikon, rauha ei mitään." [warmly] Istuin perän '
      + 'penkille.',
  },

  helsinki: {
    kuvaus: 'Laiva pujotteli Suomenlinnan saarten välistä satamaan, '
      + 'ja Tuomiokirkko nousi valkoisena kaiken ylle. Kauppatorilla '
      + 'lokit väijyivät saalistaan.',
    nosto: 'Isoisä kirjoitti: "Helsingfors näyttää mereltä '
      + 'suuremmalta kuin maalta. Valkoinen kirkko seisoo kuin '
      + 'keisarin allekirjoitus." Keisari on poissa — kirkko ei.',
    luenta: '[curious] Laiva pujotteli Suomenlinnan saarten välistä '
      + 'satamaan, ja Tuomiokirkko nousi valkoisena kaiken ylle. '
      + 'Kauppatorilla lokit väijyivät saalistaan. [softly] Isoisä '
      + 'kirjoitti: "Helsingfors näyttää mereltä suuremmalta kuin '
      + 'maalta. Valkoinen kirkko seisoo kuin keisarin '
      + 'allekirjoitus." [warmly] Keisari on poissa — kirkko ei.',
  },

  tukholma: {
    kuvaus: 'Gamla stanin kapeimmalla kujalla selkäni takana '
      + 'kuuluivat askeleet, jotka pysähtyivät aina kun minä '
      + 'pysähdyin. Käännyin. Vain kanelin tuoksu ja tyhjä kuja.',
    nosto: 'Isoisä kirjoitti: "Oscar II:n kruunajaisissa tungos vei '
      + 'minulta kaksi nappia ja sivun neljätoista. Sivulla oli '
      + 'puolikas kartta." Se sivu puuttuu yhä.',
    luenta: '[curious] Gamla stanin kapeimmalla kujalla selkäni '
      + 'takana kuuluivat askeleet, [whispers] jotka pysähtyivät aina '
      + 'kun minä pysähdyin. Käännyin... Vain kanelin tuoksu ja tyhjä '
      + 'kuja. [softly] Isoisä kirjoitti: "Oscar II:n kruunajaisissa '
      + 'tungos vei minulta kaksi nappia ja sivun neljätoista. '
      + 'Sivulla oli puolikas kartta." [whispers] Se sivu puuttuu '
      + 'yhä.',
  },

  oslo: {
    kuvaus: 'Isoisän kartassa tämän kaupungin kohdalla lukee '
      + 'Christiania. Ostin kioskilta vohvelin, jonka väliin '
      + 'lastattiin ruskeaa juustoa — se maistui suolaiselta '
      + 'karamellilta.',
    nosto: 'Isoisä kirjoitti: "Christiania kuuluu Ruotsin '
      + 'kuninkaalle, vaikka jokainen sanoo olevansa norjalainen." '
      + 'He olivat oikeassa — ja nimikin vaihtui.',
    luenta: '[curious] Isoisän kartassa tämän kaupungin kohdalla '
      + 'lukee Christiania. [excited] Ostin kioskilta vohvelin, '
      + 'jonka väliin lastattiin ruskeaa juustoa — se maistui '
      + 'suolaiselta karamellilta. [softly] Isoisä kirjoitti: '
      + '"Christiania kuuluu Ruotsin kuninkaalle, vaikka jokainen '
      + 'sanoo olevansa norjalainen." [warmly] He olivat oikeassa — '
      + 'ja nimikin vaihtui.',
  },

  kobenhavn: {
    kuvaus: 'Ensimmäinen ääni ei ollut auto vaan polkupyörän kello — '
      + 'pyöriä tuli sillan yli sadoittain. Illalla keskellä '
      + 'kaupunkia aukesi portti puutarhaan, jossa paloi tuhansia '
      + 'lyhtyjä.',
    nosto: 'Isoisä kirjoitti: "Tanska menetti sodassa kolmanneksen '
      + 'maastaan, ja silti täällä käydään illat huvipuistossa." '
      + 'Kävelin samasta portista sisään.',
    luenta: '[curious] Ensimmäinen ääni ei ollut auto vaan '
      + 'polkupyörän kello — pyöriä tuli sillan yli sadoittain. '
      + '[excited] Illalla keskellä kaupunkia aukesi portti '
      + 'puutarhaan, jossa paloi tuhansia lyhtyjä. [softly] Isoisä '
      + 'kirjoitti: "Tanska menetti sodassa kolmanneksen maastaan, '
      + 'ja silti täällä käydään illat huvipuistossa." [warmly] '
      + 'Kävelin samasta portista sisään.',
  },

  /*
   * Tampere (17.8.2026). Ei luenta-kenttää: ääntä ei ole generoitu,
   * eikä kaupunki ole SAAPUMISLUENNAT-listalla (js/sisaltotaulut.js).
   */
  tampere: {
    kuvaus: 'Kaupunki kuuluu ennen kuin se näkyy: kosken kohina kantaa '
      + 'sillalle asti. Punatiilinen tehdas seisoo aivan veden päällä, '
      + 'ja sen ikkunoissa palaa valo keskellä päivää.',
    nosto: 'Isoisä kirjoitti: "Täällä syttyi sähkövalo ennen kuin '
      + 'missään muualla Pohjolassa — ja kutojat tekevät työnsä sen '
      + 'alla kuin se olisi tavallista." Se on nyt tavallista.',
  },

  lappi: {
    kuvaus: 'Ajoimme neljä tuntia, ja jossain kohtaa metsä madaltui '
      + 'tunturiksi. Järvellä ei näkynyt toista rantaa, ja kaupan '
      + 'ovella puhuttiin kolmea kieltä. Täällä on koko taivas.',
    nosto: 'Isoisä kirjoitti: "Ivalojoen kultakaivannoilla yö on '
      + 'niin valoisa, ettei kukaan muista lopettaa." Kello on puoli '
      + 'yksi — minäkin unohdin.',
    luenta: '[curious] Ajoimme neljä tuntia, ja jossain kohtaa metsä '
      + 'madaltui tunturiksi. Järvellä ei näkynyt toista rantaa, ja '
      + 'kaupan ovella puhuttiin kolmea kieltä. [warmly] Täällä on '
      + 'koko taivas. [softly] Isoisä kirjoitti: "Ivalojoen '
      + 'kultakaivannoilla yö on niin valoisa, ettei kukaan muista '
      + 'lopettaa." Kello on puoli yksi — minäkin unohdin.',
  },

  tromssa: {
    kuvaus: 'Nousin laiturille keskellä kirkasta yötä: kello oli '
      + 'yksi, ja aurinko roikkui vuorten yllä kuin joku olisi '
      + 'unohtanut sammuttaa sen. Ohi pyöräili poika t-paidassa.',
    nosto: 'Isoisä kirjoitti: "Puodissa kuulee norjaa, suomea ja '
      + 'venäjää samassa lauseessa. Tätä sanotaan Pohjolan '
      + 'Pariisiksi." Nimi on käytössä yhä.',
    luenta: '[excited] Nousin laiturille keskellä kirkasta yötä: '
      + 'kello oli yksi, ja aurinko roikkui vuorten yllä kuin joku '
      + 'olisi unohtanut sammuttaa sen. [curious] Ohi pyöräili poika '
      + 't-paidassa. [softly] Isoisä kirjoitti: "Puodissa kuulee '
      + 'norjaa, suomea ja venäjää samassa lauseessa. Tätä sanotaan '
      + 'Pohjolan Pariisiksi." [warmly] Nimi on käytössä yhä.',
  },
};
