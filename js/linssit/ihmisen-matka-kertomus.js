/*
 * IHMISEN MATKA — KERTOMUS YHTENÄ KAARENA (kaanon, Fable 7.9.2026,
 * omistajan hyväksymä sanatarkasti: "Hyväksyn tekstin, aloita toteutus";
 * uusi kertojan teksti hyväksytty 8.9.2026: "nyt hyvä. laita peliin ja
 * generoi ääni").
 *
 * Raamattu: IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA; KERTOMUS
 * SOLJUVAKSI, EI VUOSILUKUJA ALKUUN, PALUU AASIAAN; ALKAA MUSTASTA
 * RUUDUSTA; IHMISEN MATKA: ETELA-AFRIKKA VAIN KERRAN, SELKEAT LAUSEET,
 * YKSI YHTENAINEN LUENTA. Tämä tiedosto on kertojan käsikirjoitus:
 * jaksot luetaan peräkkäin ilman pysähdyksiä, kartta seuraa
 * (js/linssit/ihmisen-matka.js), ja löytöpaikat (IHMISEN_MATKA,
 * ihmisen-matka-data.js) ovat vain sivuhuomautuksia, joiden kuva nousee
 * pieneksi näkyviin siksi aikaa kun kertoja mainitsee paikan. Vuosiluku
 * näkyy kartalla, ei tekstissä.
 *
 * ETELÄ-AFRIKKA VAIN KERRAN (omistaja 8.9.2026). Kaanonissa oli kaksi
 * pysähdystä samalla rannikolla (`ranta` 164 000 ja `blombos` 100 000),
 * ja jälkimmäinen käänsi kellon taaksepäin. Blombosin JAKSO on poistettu:
 * okra ja helmet mainitaan sivulauseessa Arabian ylityksen odotuksessa
 * (`arabia`), ja Blombosin nosto jää kartalle HILJAISEKSI PISTEEKSI —
 * `hiljaiset`-kenttä sytyttää sen ilman kamera-ajoa ja ilman kuvaa,
 * joten kortti ja gallerian kuva säilyvät mutta kertomus ei pysähdy.
 *
 * Kentät:
 *   id        jakson tunnus (myös äänitiedoston nimen osa)
 *   vaihe     'pimea' (musta ruutu, vain ääni) | 'valot' (pallo syttyy
 *             esiin) | 'matka' (kamera kulkee) | 'hyppy' (aikahyppy
 *             taaksepäin, kartta kelaa) | 'loppu'
 *   kohde     IHMISEN_MATKA-tunnus, jonka luo kamera laskeutuu ja jonka
 *             kuva näytetään sivuosassa jakson ajan (null = ei kohdetta)
 *   hiljaiset IHMISEN_MATKA-tunnuksia, jotka SYTTYVÄT jakson alkaessa
 *             kartalle, mutta joihin kamera ei aja eikä joiden kuvaa
 *             näytetä. Nosto, jolla ei ole omaa jaksoa (Blombos).
 *   alue      kameran rajaus, kun kohdetta ei ole: { lat, lon, korkeus }
 *             tai nimetty alue ('afrikka', 'beringia', 'tyynimeri')
 *   maisema   TEKNINEN KENTTÄ (ei tekstiä): jakson äänimaisematyyppi,
 *             joka soi kertojan alla nauhoitettuna kenttä-äänitteenä
 *             (js/linssit/ihmisen-matka-aanimaisema.js, tiedostot
 *             ämpärissä aanet/tehosteet/ihmisen-matka/<tyyppi>.mp3).
 *             null = hiljaisuus; avausjakso on pimeä ruutu ja pelkkä
 *             ääni, eikä siinä ole vielä paikkaa. Tunnukset ovat
 *             tools/tehosteet/ihmisen-matka-maisemat.json:ssa, ja
 *             tests/ihmisen-matka-aanimaisemat.test.mjs vartioi, että
 *             kentät ja lista vastaavat toisiaan.
 *   vuosia    kartan kellon lukema jakson alussa (vuosia sitten;
 *             negatiivinen = jaa.), josta kello etenee seuraavaan
 *   teksti    ruudulla näytettävä teksti (sanasta sanaan kaanon)
 *   luenta    sama teksti ElevenLabs-tageilla (Viisas Kertoja, eleven_v3)
 *   pulu      pulun välihuomio jakson jälkeen (luetaan pulun äänellä,
 *             kupla pieni, ei pysäytä kertomusta), tai null
 *   tunne     Pulun äänetön reaktio `{ tunne, voimakkuus }`. Tekninen
 *             ele ratkaistaan js/livia-tilanteet.js:ssä; tagia ei lueta.
 *
 * YKSI YHTENÄINEN LUENTA (omistaja 8.9.2026: *"nyt jokainen kohtaus on
 * generoitu erillisenä kohtana, niin kertojan äänensävy hyppii liikaa"*
 * ja *"muista generoida teksti yhtenä pätkänä, jossa on luonnolliset
 * lauseet ja kappaleet"*). Jaksojen `luenta`-kentät kootaan
 * KAPPALEIKSI yhteen tekstiin ja luetaan yhtenä pyyntönä
 * (tools/generoi-linssiluennat.mjs --kertomus --yhtena); jaksojen rajat,
 * lauseet ja sanat lasketaan jälkikäteen ElevenLabsin aikaleimoista
 * kertomus-manifesti.json:iin. Tekstiin EI siis kirjoiteta jaksojen
 * väliin taukomerkkejä — tauko tehdään pelissä, ei tekstissä.
 *
 * Tekstiä EI muuteta ilman päätoimittajaa (omistajan hyväksyntä).
 */

export const IHMISEN_MATKA_KERTOMUS = [
  {
    id: 'avaus', vaihe: 'pimea', kohde: null, alue: null, vuosia: 300000,
    maisema: null,
    tunne: { tunne: 'utelias', voimakkuus: 0.42 },
    teksti: 'Tiedätkö, mistä ihmiset lähtivät liikkeelle? Ei kukaan heistäkään '
      + 'tiennyt. He vain lähtivät. Afrikasta. Kaikki meistä.',
    luenta: '[curious] Tiedätkö, mistä ihmiset lähtivät liikkeelle? [softly] Ei '
      + 'kukaan heistäkään tiennyt. He vain lähtivät. Afrikasta. Kaikki '
      + 'meistä.',
    pulu: null,
  },
  {
    id: 'afrikka', vaihe: 'valot', kohde: null, alue: 'afrikka', vuosia: 300000,
    maisema: 'savanni',
    teksti: 'Tämä on se maanosa, jossa ihminen oppi kävelemään, puhumaan ja '
      + 'tekemään tulta. Ja täältä, Marokon kukkulalta…',
    luenta: 'Tämä on se maanosa, jossa ihminen oppi kävelemään, puhumaan ja '
      + 'tekemään tulta. [softly] Ja täältä, Marokon kukkulalta…',
    pulu: null,
  },
  {
    id: 'jebel-irhoud', vaihe: 'matka', kohde: 'jebel-irhoud', alue: null, vuosia: 300000,
    maisema: 'savanni',
    tunne: { tunne: 'lammin', voimakkuus: 0.4 },
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
    maisema: 'savanni',
    teksti: 'Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä varsinainen matka '
      + 'alkaa, vaikka kukaan ei ollut sitä suunnitellut.',
    luenta: '[curious] Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä '
      + 'varsinainen matka alkaa, vaikka kukaan ei ollut sitä suunnitellut.',
    pulu: null,
  },
  {
    id: 'omo', vaihe: 'matka', kohde: 'omo-kibish', alue: null, vuosia: 230000,
    maisema: 'jokilaakso',
    teksti: 'Etiopian jokilaaksossa ihmisiä asui sukupolvi sukupolven perään. '
      + 'Kaksisataatuhatta vuotta samassa laaksossa. Meille se on ikuisuus. '
      + 'Heille se oli kotiseutu.',
    luenta: 'Etiopian jokilaaksossa ihmisiä asui sukupolvi sukupolven perään. '
      + 'Kaksisataatuhatta vuotta samassa laaksossa. [softly] Meille se on '
      + 'ikuisuus. Heille se oli kotiseutu.',
    pulu: null,
  },
  {
    id: 'ranta', vaihe: 'matka', kohde: 'pinnacle-point', alue: null, vuosia: 164000,
    maisema: 'meren-ranta',
    tunne: { tunne: 'ilo', voimakkuus: 0.5 },
    teksti: 'Kului pitkä aika, ennen kuin joku käveli etelän rantaan asti. '
      + 'Rannasta löytyi ruokaa, joka ei juokse karkuun: simpukoita. Siitä '
      + 'lähtien meri on ollut ihmiselle tie, ei este.',
    luenta: 'Kului pitkä aika, ennen kuin joku käveli etelän rantaan asti. '
      + '[curious] Rannasta löytyi ruokaa, joka ei juokse karkuun: simpukoita. '
      + 'Siitä lähtien meri on ollut ihmiselle tie, ei este.',
    pulu: 'Simpukoita. Hyvä alku.',
  },
  {
    id: 'levantti', vaihe: 'matka', kohde: 'skhul-qafzeh', alue: null, vuosia: 110000,
    maisema: 'vuoristotuuli',
    teksti: 'Ensimmäinen retki Afrikan ulkopuolelle ulottui Karmelvuorelle, '
      + 'nykyisen Israelin rannikolle. Siellä asuttiin jonkin aikaa, mutta '
      + 'asutus ei jäänyt pysyväksi. Syytä ei tiedetä. Ehkä ilmasto muuttui '
      + 'kuivemmaksi, ehkä tulijat väistyivät neandertalilaisten tieltä. Luut '
      + 'eivät kerro sitä.',
    luenta: 'Ensimmäinen retki Afrikan ulkopuolelle ulottui Karmelvuorelle, '
      + 'nykyisen Israelin rannikolle. [softly] Siellä asuttiin jonkin aikaa, '
      + 'mutta asutus ei jäänyt pysyväksi. Syytä ei tiedetä. Ehkä ilmasto '
      + 'muuttui kuivemmaksi, ehkä tulijat väistyivät neandertalilaisten '
      + 'tieltä. Luut eivät kerro sitä.',
    pulu: null,
  },
  {
    id: 'arabia',
    vaihe: 'matka',
    kohde: 'al-wusta',
    /*
     * BLOMBOS SYTTYY TÄSSÄ HILJAISENA PISTEENÄ (omistaja 8.9.2026:
     * Etelä-Afrikka vain kerran). Kertoja mainitsee etelän okran ja
     * helmet samassa lauseessa, jolla ylitystä odotetaan — nosto
     * merkitään kartalle silloin, mutta kamera jää Arabiaan.
     */
    hiljaiset: ['blombos'],
    alue: null,
    vuosia: 90000,
    maisema: 'ruohikko-jarvi',
    teksti: 'Sitten kului taas pitkä aika. Etelän rannikolla ehdittiin hioa '
      + 'okraa punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin '
      + 'ylitys Arabian niemimaalle onnistui. Silloin Arabia oli vihreä: '
      + 'autiomaan paikalla oli järviä ja ruohoa. Yhden järven rannalta on '
      + 'löydetty yksi ainoa sormiluu. Se riittää todisteeksi. Tästä ihmiset '
      + 'lähtivät kohti Aasiaa, eivätkä enää palanneet.',
    luenta: 'Sitten kului taas pitkä aika. Etelän rannikolla ehdittiin hioa '
      + 'okraa punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin '
      + 'ylitys Arabian niemimaalle onnistui. Silloin Arabia oli vihreä: '
      + 'autiomaan paikalla oli järviä ja ruohoa. Yhden järven rannalta on '
      + 'löydetty yksi ainoa sormiluu. [pause] Se riittää todisteeksi. Tästä '
      + 'ihmiset lähtivät kohti Aasiaa, eivätkä enää palanneet.',
    pulu: null,
  },
  {
    id: 'intian-rannat', vaihe: 'matka', kohde: 'lida-ajer', alue: null, vuosia: 70000,
    maisema: 'sademetsa',
    teksti: 'Reitti kulki rantoja pitkin itään, sukupolvi kerrallaan. Kukaan ei '
      + 'kiirehtinyt. Sumatran sademetsästä on löydetty kaksi hammasta. Se on '
      + 'vähän, mutta se riittää kertomaan, että ihmisiä oli täällä jo silloin.',
    luenta: 'Reitti kulki rantoja pitkin itään, sukupolvi kerrallaan. Kukaan ei '
      + 'kiirehtinyt. Sumatran sademetsästä on löydetty kaksi hammasta. [softly] '
      + 'Se on vähän, mutta se riittää kertomaan, että ihmisiä oli täällä jo '
      + 'silloin.',
    pulu: null,
  },
  {
    id: 'australia', vaihe: 'matka', kohde: 'madjedbebe', alue: null, vuosia: 65000,
    maisema: 'rannikkomeri',
    tunne: { tunne: 'hammastys', voimakkuus: 0.72 },
    teksti: 'Ja sitten tehtiin jotain, mitä kukaan ei ollut ennen tehnyt: '
      + 'lähdettiin meren yli, vaikka toista rantaa ei näkynyt. Perillä oli '
      + 'Sahul, nykyinen Australia. Se oli ihmisen ensimmäinen merimatka '
      + 'tuntemattomaan, ja se onnistui.',
    luenta: '[curious] Ja sitten tehtiin jotain, mitä kukaan ei ollut ennen '
      + 'tehnyt: lähdettiin meren yli, vaikka toista rantaa ei näkynyt. Perillä '
      + 'oli Sahul, nykyinen Australia. [warmly] Se oli ihmisen ensimmäinen '
      + 'merimatka tuntemattomaan, ja se onnistui.',
    pulu: null,
  },
  {
    id: 'denisova', vaihe: 'matka', kohde: 'denisova', alue: null, vuosia: 50000,
    maisema: 'luola',
    tunne: { tunne: 'hammentynyt', voimakkuus: 0.56 },
    teksti: 'Pohjoisessa, Altain vuorilla, on luola, jossa asui kolmenlaisia '
      + 'ihmisiä: denisovalaisia, neandertalilaisia ja heidän yhteisiä lapsiaan. '
      + 'Meidän esi-isiemme esineitä löytyy samasta luolasta melkein heti heidän '
      + 'jälkeensä. Luola on pieni. Kaikki mahtuivat siihen vuorollaan.',
    luenta: 'Pohjoisessa, Altain vuorilla, on luola, jossa asui kolmenlaisia '
      + 'ihmisiä: denisovalaisia, neandertalilaisia ja heidän yhteisiä lapsiaan. '
      + 'Meidän esi-isiemme esineitä löytyy samasta luolasta melkein heti heidän '
      + 'jälkeensä. [softly] Luola on pieni. Kaikki mahtuivat siihen vuorollaan.',
    pulu: 'Kolme sukua yhdessä luolassa, ja kaikki hiljaa. Ei kai kukaan '
      + 'kirjoittanut ylös.',
  },
  {
    id: 'napapiiri', vaihe: 'matka', kohde: 'yana', alue: null, vuosia: 32000,
    maisema: 'arktinen-tuuli',
    teksti: 'Kylmä ei pysäyttänyt matkaa, se vain hidasti sitä. Kun mammutit '
      + 'vielä kävelivät, ihmisiä asui jo napapiirin pohjoispuolella Janajoen '
      + 'varrella. Talvi kesti yhdeksän kuukautta, ja silti he jäivät.',
    luenta: 'Kylmä ei pysäyttänyt matkaa, se vain hidasti sitä. Kun mammutit '
      + 'vielä kävelivät, ihmisiä asui jo napapiirin pohjoispuolella Janajoen '
      + 'varrella. [softly] Talvi kesti yhdeksän kuukautta, ja silti he jäivät.',
    pulu: null,
  },
  {
    id: 'beringia', vaihe: 'matka', kohde: 'beringia', alue: null, vuosia: 22000,
    maisema: 'tundratuuli',
    tunne: { tunne: 'jannitys', voimakkuus: 0.66 },
    teksti: 'Seuraavaksi ylitettiin meri, jota ei enää ollut. Jääkausi oli '
      + 'sitonut vettä jäätiköihin, ja meri oli laskenut niin alas, että '
      + 'Beringinsalmen tilalla oli kuivaa ruohomaata. Sitä pitkin käveltiin '
      + 'Amerikkaan. Kukaan ei huomannut vaihtavansa mannerta.',
    luenta: '[curious] Seuraavaksi ylitettiin meri, jota ei enää ollut. Jääkausi '
      + 'oli sitonut vettä jäätiköihin, ja meri oli laskenut niin alas, että '
      + 'Beringinsalmen tilalla oli kuivaa ruohomaata. Sitä pitkin käveltiin '
      + 'Amerikkaan. [softly] Kukaan ei huomannut vaihtavansa mannerta.',
    pulu: 'Kävelivät meren yli. Ilman siipiä.',
  },
  {
    id: 'white-sands', vaihe: 'matka', kohde: 'white-sands', alue: null, vuosia: 22000,
    maisema: 'tundratuuli',
    teksti: 'Uudessa-Meksikossa on järven mutaan painuneita jalanjälkiä, lapsen '
      + 'ja aikuisen. Ne ovat paljon vanhempia kuin tutkijat uskoivat '
      + 'mahdolliseksi, ja niiden takia Amerikan asuttamisen aikataulu piti '
      + 'kirjoittaa uusiksi.',
    luenta: 'Uudessa-Meksikossa on järven mutaan painuneita jalanjälkiä, lapsen '
      + 'ja aikuisen. [softly] Ne ovat paljon vanhempia kuin tutkijat uskoivat '
      + 'mahdolliseksi, ja niiden takia Amerikan asuttamisen aikataulu piti '
      + 'kirjoittaa uusiksi.',
    pulu: null,
  },
  {
    id: 'chile', vaihe: 'matka', kohde: 'monte-verde', alue: null, vuosia: 14500,
    maisema: 'metsasade',
    teksti: 'Rannikkoa pitkin päästiin Etelä-Amerikan kärkeen asti muutamassa '
      + 'tuhannessa vuodessa. Chilessä Monte Verden leiri hautautui turpeen '
      + 'alle: nuotio, majat ja yksi lapsen jalanjälki. Siihen päättyi pisin '
      + 'kävelymatka, jonka ihminen on koskaan tehnyt.',
    luenta: 'Rannikkoa pitkin päästiin Etelä-Amerikan kärkeen asti muutamassa '
      + 'tuhannessa vuodessa. Chilessä Monte Verden leiri hautautui turpeen '
      + 'alle: nuotio, majat ja yksi lapsen jalanjälki. [softly] Siihen päättyi '
      + 'pisin kävelymatka, jonka ihminen on koskaan tehnyt.',
    pulu: null,
  },
  {
    id: 'aikahyppy', vaihe: 'hyppy', kohde: null, alue: 'keski-aasia', vuosia: 50000,
    maisema: 'kylma-tuuli',
    teksti: 'Mutta palataan takaisin Aasiaan. Samaan aikaan, kun pääjoukko kulki '
      + 'itään, yksi haara kääntyi länteen, kohti Eurooppaa.',
    luenta: '[curious] Mutta palataan takaisin Aasiaan. Samaan aikaan, kun '
      + 'pääjoukko kulki itään, yksi haara kääntyi länteen, kohti Eurooppaa.',
    pulu: null,
  },
  {
    id: 'eurooppa', vaihe: 'matka', kohde: 'bacho-kiro', alue: null, vuosia: 45000,
    maisema: 'kylma-tuuli',
    teksti: 'Bulgarian luolasta on löydetty ensimmäiset merkit meikäläisistä '
      + 'Euroopassa. Manner oli kylmä, ja siellä asui jo neandertalilaisia. '
      + 'Tulijat jäivät, ja neandertalilaiset katosivat muutamassa tuhannessa '
      + 'vuodessa. Miksi niin kävi, siitä tutkijat kiistelevät yhä.',
    luenta: 'Bulgarian luolasta on löydetty ensimmäiset merkit meikäläisistä '
      + 'Euroopassa. Manner oli kylmä, ja siellä asui jo neandertalilaisia. '
      + 'Tulijat jäivät, ja neandertalilaiset katosivat muutamassa tuhannessa '
      + 'vuodessa. [softly] Miksi niin kävi, siitä tutkijat kiistelevät yhä.',
    pulu: null,
  },
  {
    id: 'chauvet', vaihe: 'matka', kohde: 'chauvet', alue: null, vuosia: 36000,
    maisema: 'luola',
    tunne: { tunne: 'rakkaus', voimakkuus: 0.48 },
    teksti: 'Ranskassa joku laskeutui luolan pimeyteen ja maalasi seinään '
      + 'hevosia, sarvikuonoja ja leijonia. Ne ovat siellä vieläkin, samassa '
      + 'asennossa. Kuka hän oli, sitä ei tiedä kukaan. Mutta hän oli '
      + 'taiteilija, ja se riittää.',
    luenta: 'Ranskassa joku laskeutui luolan pimeyteen ja maalasi seinään hevosia, '
      + 'sarvikuonoja ja leijonia. Ne ovat siellä vieläkin, samassa asennossa. '
      + '[curious] Kuka hän oli, sitä ei tiedä kukaan. [warmly] Mutta hän oli '
      + 'taiteilija, ja se riittää.',
    pulu: null,
  },
  {
    id: 'meri', vaihe: 'matka', kohde: 'lapita', alue: null, vuosia: 3000,
    maisema: 'avomeri',
    teksti: 'Viimeisenä oli valtameri. Tyynellämerellä oli saaria, joille kukaan '
      + 'ei voinut kävellä. Sinne purjehdittiin kanooteilla tähtien avulla, ja '
      + 'saviastiat kulkivat mukana. Näin päästiin Tongalle asti.',
    luenta: 'Viimeisenä oli valtameri. Tyynellämerellä oli saaria, joille kukaan '
      + 'ei voinut kävellä. Sinne purjehdittiin kanooteilla tähtien avulla, ja '
      + 'saviastiat kulkivat mukana. [softly] Näin päästiin Tongalle asti.',
    pulu: null,
  },
  {
    id: 'uusi-seelanti', vaihe: 'matka', kohde: 'aotearoa', alue: null, vuosia: 750,
    maisema: 'rantalinnut',
    teksti: 'Viimeinen suuri maa odotti pisimpään. Uuteen-Seelantiin tultiin '
      + 'vasta, kun Euroopassa rakennettiin jo katedraaleja. Silloin ihminen oli '
      + 'levittäytynyt koko maapallolle, eikä kukaan ollut huomannut lähteneensä '
      + 'matkalle.',
    luenta: 'Viimeinen suuri maa odotti pisimpään. Uuteen-Seelantiin tultiin '
      + 'vasta, kun Euroopassa rakennettiin jo katedraaleja. [warmly] Silloin '
      + 'ihminen oli levittäytynyt koko maapallolle, eikä kukaan ollut huomannut '
      + 'lähteneensä matkalle.',
    pulu: null,
  },
  {
    id: 'loppu', vaihe: 'loppu', kohde: null, alue: 'maailma', vuosia: 0,
    maisema: 'hiljainen-tuuli',
    tunne: { tunne: 'lammin', voimakkuus: 0.44 },
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
