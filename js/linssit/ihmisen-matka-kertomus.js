/*
 * IHMISEN MATKA — KERTOMUS YHTENÄ KAARENA (kaanon, Fable 7.9.2026,
 * omistajan hyväksymä sanatarkasti: "Hyväksyn tekstin, aloita toteutus").
 *
 * Raamattu: IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA; KERTOMUS
 * SOLJUVAKSI, EI VUOSILUKUJA ALKUUN, PALUU AASIAAN; ALKAA MUSTASTA
 * RUUDUSTA. Tämä tiedosto on kertojan käsikirjoitus: jaksot luetaan
 * peräkkäin ilman pysähdyksiä, kartta seuraa (js/linssit/ihmisen-matka.js),
 * ja löytöpaikat (IHMISEN_MATKA, ihmisen-matka-data.js) ovat vain
 * sivuhuomautuksia, joiden kuva nousee pieneksi näkyviin siksi aikaa kun
 * kertoja mainitsee paikan. Vuosiluku näkyy kartalla, ei tekstissä.
 *
 * Kentät:
 *   id        jakson tunnus (myös äänitiedoston nimen osa)
 *   vaihe     'pimea' (musta ruutu, vain ääni) | 'valot' (pallo syttyy
 *             esiin) | 'matka' (kamera kulkee) | 'hyppy' (aikahyppy
 *             taaksepäin, kartta kelaa) | 'loppu'
 *   kohde     IHMISEN_MATKA-tunnus, jonka luo kamera laskeutuu ja jonka
 *             kuva näytetään sivuosassa jakson ajan (null = ei kohdetta)
 *   alue      kameran rajaus, kun kohdetta ei ole: { lat, lon, korkeus }
 *             tai nimetty alue ('afrikka', 'beringia', 'tyynimeri')
 *   vuosia    kartan kellon lukema jakson alussa (vuosia sitten;
 *             negatiivinen = jaa.), josta kello etenee seuraavaan
 *   teksti    ruudulla näytettävä teksti (sanasta sanaan kaanon)
 *   luenta    sama teksti ElevenLabs-tageilla (Viisas Kertoja, eleven_v3)
 *   pulu      pulun välihuomio jakson jälkeen (luetaan pulun äänellä,
 *             kupla pieni, ei pysäytä kertomusta), tai null
 *
 * Tekstiä EI muuteta ilman päätoimittajaa (omistajan hyväksyntä).
 */

export const IHMISEN_MATKA_KERTOMUS = [
  {
    id: 'avaus', vaihe: 'pimea', kohde: null, alue: null, vuosia: 300000,
    teksti: 'Tiedätkö, mistä ihmiset lähtivät liikkeelle? Ei kukaan heistäkään '
      + 'tiennyt. He vain lähtivät. Afrikasta. Kaikki meistä.',
    luenta: '[curious] Tiedätkö, mistä ihmiset lähtivät liikkeelle? [softly] Ei '
      + 'kukaan heistäkään tiennyt. He vain lähtivät. [pause] Afrikasta. Kaikki '
      + 'meistä.',
    pulu: null,
  },
  {
    id: 'afrikka', vaihe: 'valot', kohde: null, alue: 'afrikka', vuosia: 300000,
    teksti: 'Tämä on se maanosa, jossa ihminen oppi kävelemään, puhumaan ja '
      + 'tekemään tulta. Ja täältä, Marokon kukkulalta…',
    luenta: 'Tämä on se maanosa, jossa ihminen oppi kävelemään, puhumaan ja '
      + 'tekemään tulta. [softly] Ja täältä, Marokon kukkulalta…',
    pulu: null,
  },
  {
    id: 'jebel-irhoud', vaihe: 'matka', kohde: 'jebel-irhoud', alue: null, vuosia: 300000,
    teksti: '…on löydetty vanhimmat luut ihmisistä, joilla oli jo samanlaiset '
      + 'kasvot kuin meillä. Jos yksi heistä kävelisi vastaan kadulla, et '
      + 'kääntyisi katsomaan. Kukaan täällä ei tiennyt olevansa ensimmäinen '
      + 'missään.',
    luenta: '…on löydetty vanhimmat luut ihmisistä, joilla oli jo samanlaiset '
      + 'kasvot kuin meillä. [warmly] Jos yksi heistä kävelisi vastaan kadulla, et '
      + 'kääntyisi katsomaan. [softly] Kukaan täällä ei tiennyt olevansa '
      + 'ensimmäinen missään.',
    pulu: null,
  },
  {
    id: 'siirtyma-afrikka', vaihe: 'matka', kohde: null, alue: 'afrikka-ita', vuosia: 240000,
    teksti: 'Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä varsinainen matka '
      + 'alkaa, vaikka kukaan ei ollut sitä suunnitellut.',
    luenta: '[curious] Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä '
      + 'varsinainen matka alkaa, vaikka kukaan ei ollut sitä suunnitellut.',
    pulu: null,
  },
  {
    id: 'omo', vaihe: 'matka', kohde: 'omo-kibish', alue: null, vuosia: 230000,
    teksti: 'Etiopian jokilaaksossa ihmisiä asui sukupolvi sukupolven perään. '
      + 'Kaksisataatuhatta vuotta samassa laaksossa. Meidän mittapuullamme se on '
      + 'ikuisuus, heidän mittapuullaan kotiseutu.',
    luenta: 'Etiopian jokilaaksossa ihmisiä asui sukupolvi sukupolven perään. '
      + 'Kaksisataatuhatta vuotta samassa laaksossa. [softly] Meidän '
      + 'mittapuullamme se on ikuisuus, heidän mittapuullaan kotiseutu.',
    pulu: null,
  },
  {
    id: 'ranta', vaihe: 'matka', kohde: 'pinnacle-point', alue: null, vuosia: 164000,
    teksti: 'Kului pitkä aika, ennen kuin joku käveli rantaan asti. Ja rannasta '
      + 'löytyi ruokaa, joka ei juokse karkuun: simpukoita. Siitä lähtien meri '
      + 'on ollut ihmisen tie eikä este.',
    luenta: 'Kului pitkä aika, ennen kuin joku käveli rantaan asti. [curious] Ja '
      + 'rannasta löytyi ruokaa, joka ei juokse karkuun: simpukoita. Siitä lähtien '
      + 'meri on ollut ihmisen tie eikä este.',
    pulu: 'Simpukoita. Hyvä alku.',
  },
  {
    id: 'blombos', vaihe: 'matka', kohde: 'blombos', alue: null, vuosia: 75000,
    teksti: 'Samalla rannikolla joku hioi okraa punaiseksi ja pujotteli '
      + 'simpukankuoria helmiksi. Kukaan ei tiedä, kenelle. Mutta se, joka tekee '
      + 'helmiä, ajattelee jo niin kuin me.',
    luenta: 'Samalla rannikolla joku hioi okraa punaiseksi ja pujotteli '
      + 'simpukankuoria helmiksi. [softly] Kukaan ei tiedä, kenelle. [warmly] '
      + 'Mutta se, joka tekee helmiä, ajattelee jo niin kuin me.',
    pulu: null,
  },
  {
    id: 'levantti', vaihe: 'matka', kohde: 'skhul-qafzeh', alue: null, vuosia: 110000,
    teksti: 'Ensimmäinen retki Afrikan ulkopuolelle ulottui Karmelvuorelle asti. '
      + 'Se ei jäänyt. Ehkä ilmasto kääntyi, ehkä naapurit. Historia ei kerro, ja '
      + 'luut vaikenevat.',
    luenta: 'Ensimmäinen retki Afrikan ulkopuolelle ulottui Karmelvuorelle asti. '
      + '[softly] Se ei jäänyt. Ehkä ilmasto kääntyi, ehkä naapurit. Historia ei '
      + 'kerro, ja luut vaikenevat.',
    pulu: null,
  },
  {
    id: 'arabia', vaihe: 'matka', kohde: 'al-wusta', alue: null, vuosia: 90000,
    teksti: 'Sitten Arabia vihertyi. Autiomaan paikalla oli järviä ja ruohoa, ja '
      + 'yhden järven rannalta on löydetty yksi ainoa sormiluu. Se riittää: tästä '
      + 'kohdin ihmiset lähtivät kohti Aasiaa, eivätkä enää palanneet.',
    luenta: 'Sitten Arabia vihertyi. Autiomaan paikalla oli järviä ja ruohoa, ja '
      + 'yhden järven rannalta on löydetty yksi ainoa sormiluu. [pause] Se '
      + 'riittää: tästä kohdin ihmiset lähtivät kohti Aasiaa, eivätkä enää '
      + 'palanneet.',
    pulu: null,
  },
  {
    id: 'intian-rannat', vaihe: 'matka', kohde: 'lida-ajer', alue: null, vuosia: 70000,
    teksti: 'Reitti kulki rantoja pitkin itään, sukupolvi kerrallaan, kukaan ei '
      + 'kiirehtinyt. Sumatran sademetsästä on löydetty kaksi hammasta. Enemmän '
      + 'ei tarvita, kun tietää mitä etsii.',
    luenta: 'Reitti kulki rantoja pitkin itään, sukupolvi kerrallaan, kukaan ei '
      + 'kiirehtinyt. Sumatran sademetsästä on löydetty kaksi hammasta. [softly] '
      + 'Enemmän ei tarvita, kun tietää mitä etsii.',
    pulu: null,
  },
  {
    id: 'australia', vaihe: 'matka', kohde: 'madjedbebe', alue: null, vuosia: 65000,
    teksti: 'Ja sitten jotain, mitä kukaan ei ollut ennen tehnyt: meren yli, kun '
      + 'toista rantaa ei näy. Sahul, nykyinen Australia. Ensimmäinen merimatka '
      + 'tuntemattomaan, ja se onnistui.',
    luenta: '[curious] Ja sitten jotain, mitä kukaan ei ollut ennen tehnyt: meren '
      + 'yli, kun toista rantaa ei näy. Sahul, nykyinen Australia. [warmly] '
      + 'Ensimmäinen merimatka tuntemattomaan, ja se onnistui.',
    pulu: null,
  },
  {
    id: 'denisova', vaihe: 'matka', kohde: 'denisova', alue: null, vuosia: 50000,
    teksti: 'Pohjoisessa, Altain vuorilla, on luola, jossa asui kolme erilaista '
      + 'ihmisryhmää: denisovalaiset, neandertalilaiset ja niiden yhteinen lapsi. '
      + 'Meidän esineemme tulivat sinne jo melkein heti perään. Luola on pieni. '
      + 'Miten he mahtuivat samaan?',
    luenta: 'Pohjoisessa, Altain vuorilla, on luola, jossa asui kolme erilaista '
      + 'ihmisryhmää: denisovalaiset, neandertalilaiset ja niiden yhteinen lapsi. '
      + 'Meidän esineemme tulivat sinne jo melkein heti perään. [softly] Luola on '
      + 'pieni. [curious] Miten he mahtuivat samaan?',
    pulu: 'Kolme sukua yhdessä luolassa, ja kaikki hiljaa. Ei kai kukaan '
      + 'kirjoittanut ylös.',
  },
  {
    id: 'napapiiri', vaihe: 'matka', kohde: 'yana', alue: null, vuosia: 32000,
    teksti: 'Kylmä ei pysäyttänyt, se vain hidasti. Kun mammutit vielä kävelivät, '
      + 'ihmisiä asui jo napapiirin takana Janajoella. Talvi oli yhdeksän '
      + 'kuukautta pitkä, ja silti he jäivät.',
    luenta: 'Kylmä ei pysäyttänyt, se vain hidasti. Kun mammutit vielä kävelivät, '
      + 'ihmisiä asui jo napapiirin takana Janajoella. [softly] Talvi oli '
      + 'yhdeksän kuukautta pitkä, ja silti he jäivät.',
    pulu: null,
  },
  {
    id: 'beringia', vaihe: 'matka', kohde: 'beringia', alue: null, vuosia: 22000,
    teksti: 'Ja nyt ylitetään meri, jota ei enää ole. Jääkausi imi meret '
      + 'mataliksi, ja Beringinsalmen tilalla oli kuivaa ruohomaata. Sitä pitkin '
      + 'käveltiin Amerikkaan. Kukaan ei huomannut vaihtavansa mannerta.',
    luenta: '[curious] Ja nyt ylitetään meri, jota ei enää ole. Jääkausi imi meret '
      + 'mataliksi, ja Beringinsalmen tilalla oli kuivaa ruohomaata. Sitä pitkin '
      + 'käveltiin Amerikkaan. [softly] Kukaan ei huomannut vaihtavansa mannerta.',
    pulu: 'Kävelivät meren yli. Ilman siipiä.',
  },
  {
    id: 'white-sands', vaihe: 'matka', kohde: 'white-sands', alue: null, vuosia: 22000,
    teksti: 'Uudessa-Meksikossa on jalanjälkiä järven mutaan, lapsen ja aikuisen. '
      + 'Ne ovat vanhempia kuin kukaan uskoi, ja ne sotkivat siistin kartan '
      + 'kokonaan. Hyvä niin.',
    luenta: 'Uudessa-Meksikossa on jalanjälkiä järven mutaan, lapsen ja aikuisen. '
      + 'Ne ovat vanhempia kuin kukaan uskoi, ja ne sotkivat siistin kartan '
      + 'kokonaan. [warmly] Hyvä niin.',
    pulu: null,
  },
  {
    id: 'chile', vaihe: 'matka', kohde: 'monte-verde', alue: null, vuosia: 14500,
    teksti: 'Rannikkoa pitkin päästiin Etelä-Amerikan kärkeen asti, vain reilussa '
      + 'parissa tuhannessa vuodessa. Monte Verden leiri jäi turpeen alle: '
      + 'nuotio, majat, ja yksi lapsen jalanjälki. Siihen päättyi pisin '
      + 'kävelymatka, jonka ihminen on koskaan tehnyt.',
    luenta: 'Rannikkoa pitkin päästiin Etelä-Amerikan kärkeen asti, vain reilussa '
      + 'parissa tuhannessa vuodessa. Monte Verden leiri jäi turpeen alle: nuotio, '
      + 'majat, ja yksi lapsen jalanjälki. [softly] Siihen päättyi pisin '
      + 'kävelymatka, jonka ihminen on koskaan tehnyt.',
    pulu: null,
  },
  {
    id: 'aikahyppy', vaihe: 'hyppy', kohde: null, alue: 'keski-aasia', vuosia: 50000,
    teksti: 'Mutta palataan takaisin Aasiaan. Sillä samaan aikaan, kun pääjoukko '
      + 'kulki itään, yksi haara kääntyi vastavirtaan, länteen.',
    luenta: '[curious] Mutta palataan takaisin Aasiaan. Sillä samaan aikaan, kun '
      + 'pääjoukko kulki itään, yksi haara kääntyi vastavirtaan, länteen.',
    pulu: null,
  },
  {
    id: 'eurooppa', vaihe: 'matka', kohde: 'bacho-kiro', alue: null, vuosia: 45000,
    teksti: 'Bulgarian luolasta on löydetty ensimmäiset merkit meikäläisistä '
      + 'Euroopassa. Manner oli kylmä ja täynnä neandertalilaisia. Silti he '
      + 'jäivät, ja neandertalilaiset eivät. Miksi? Siitä kiistellään yhä, ja hyvä '
      + 'niin.',
    luenta: 'Bulgarian luolasta on löydetty ensimmäiset merkit meikäläisistä '
      + 'Euroopassa. Manner oli kylmä ja täynnä neandertalilaisia. Silti he jäivät, '
      + 'ja neandertalilaiset eivät. [curious] Miksi? [softly] Siitä kiistellään '
      + 'yhä, ja hyvä niin.',
    pulu: null,
  },
  {
    id: 'chauvet', vaihe: 'matka', kohde: 'chauvet', alue: null, vuosia: 36000,
    teksti: 'Ranskassa joku laskeutui luolan pimeyteen ja maalasi seinään '
      + 'hevosia, sarvikuonoja ja leijonia. Ne ovat siellä vieläkin, samassa '
      + 'asennossa. Kuka hän oli? Emme tiedä. Mutta hän oli taiteilija, ja se '
      + 'riittää.',
    luenta: 'Ranskassa joku laskeutui luolan pimeyteen ja maalasi seinään hevosia, '
      + 'sarvikuonoja ja leijonia. Ne ovat siellä vieläkin, samassa asennossa. '
      + '[curious] Kuka hän oli? [softly] Emme tiedä. [warmly] Mutta hän oli '
      + 'taiteilija, ja se riittää.',
    pulu: null,
  },
  {
    id: 'meri', vaihe: 'matka', kohde: 'lapita', alue: null, vuosia: 3000,
    teksti: 'Viimeisenä oli meri. Tyynellämerellä oli saaria, joille ei kävellyt '
      + 'kukaan. Sinne purjehdittiin kanooteilla, ja saviastiat kulkivat mukana. '
      + 'Tongalle asti, tähtien perässä.',
    luenta: 'Viimeisenä oli meri. Tyynellämerellä oli saaria, joille ei kävellyt '
      + 'kukaan. Sinne purjehdittiin kanooteilla, ja saviastiat kulkivat mukana. '
      + '[softly] Tongalle asti, tähtien perässä.',
    pulu: null,
  },
  {
    id: 'uusi-seelanti', vaihe: 'matka', kohde: 'aotearoa', alue: null, vuosia: 750,
    teksti: 'Viimeinen suuri maa odotti pisimpään. Uuteen-Seelantiin tultiin '
      + 'vasta, kun Euroopassa rakennettiin jo katedraaleja. Silloin ihminen oli '
      + 'kiertänyt koko maapallon, eikä kukaan ollut huomannut lähteneensä.',
    luenta: 'Viimeinen suuri maa odotti pisimpään. Uuteen-Seelantiin tultiin '
      + 'vasta, kun Euroopassa rakennettiin jo katedraaleja. [warmly] Silloin '
      + 'ihminen oli kiertänyt koko maapallon, eikä kukaan ollut huomannut '
      + 'lähteneensä.',
    pulu: null,
  },
  {
    id: 'loppu', vaihe: 'loppu', kohde: null, alue: 'maailma', vuosia: 0,
    teksti: 'Kukaan matkalla ei tiennyt olevansa matkalla. Jokainen vain siirsi '
      + 'leirinsä seuraavan rannan taakse. Kolmesataatuhatta vuotta, ja tässä me '
      + 'olemme.',
    luenta: '[softly] Kukaan matkalla ei tiennyt olevansa matkalla. Jokainen vain '
      + 'siirsi leirinsä seuraavan rannan taakse. [pause] Kolmesataatuhatta '
      + 'vuotta, ja tässä me olemme.',
    pulu: 'Kartta on sinun. Kysy vain, jos löydät jotain kiinnostavaa.',
  },
];

/**
 * Pulun välihuomiot keksintölinssiin (omistaja 7.9.2026: "tehdä vähän
 * rytmiä ja eloa esitykseen pienillä huomioilla"). Avain on pysäkin
 * vuosi; huomio luetaan pysäkin luennan jälkeen pulun äänellä.
 */
export const KEKSINNOT_PULUN_HUOMIOT = {
  1796: 'Lehmästä. Kukaan ei kysynyt lehmältä.',
  1898: 'Kaksikymmentäkahdeksan keksijää, ja yksi nainen. Hän sai kaksi Nobelia. '
    + 'Miehet keskimäärin nolla.',
  1909: 'Kanaalin yli 37 minuutissa. Meikäläiset teki sen jo Rooman aikaan.',
};
