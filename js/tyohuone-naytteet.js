/*
 * NÄYTTEET: uusiksi kirjoitettuja matkakirjamerkintöjä työhuoneen
 * Näytteet-välilehdelle (omistajan tilaus 11.8.2026: "voisit jo
 * näiden pohjalta kirjoittaa muutamia kaupunkeja uusiksi ja laittaa
 * ne uudelle välilehdellä näkyviin").
 *
 * Nämä EIVÄT ole pelissä: ne ovat keskustelupohja, jolla Tekstien
 * vetovoima -keinot (ks. js/tyohuone-raamattu.js) kokeillaan
 * oikeassa tekstimuodossa ja -pituudessa (kuvaus ~150–170 merkkiä,
 * nosto ~110–160). Vanha merkintä näytetään rinnalla vertailua
 * varten. Luennat generoidaan vasta, kun malli on yhdessä
 * hyväksytty ja koko Eurooppa kirjoitetaan uusiksi. VAIN FABLE
 * kirjoittaa tähän tiedostoon.
 */

export const NAYTTEET = {
  paivitetty: '11.8.2026',
  johdanto: 'Merkintöjä kirjoitettuna uusiksi Tekstien vetovoima '
    + '-keinoilla, johtolausevariaatiot "Isoisä kirjoitti" -kaavan '
    + 'tilalle sekä näytteet kohtaamisesta ja aarreteksteistä '
    + 'uudella mallilla. Tarkoitus ei ole, että näytteet korvaavat '
    + 'vanhat sellaisenaan, vaan että niistä nähdään, mitkä keinot '
    + 'toimivat ja mitkä eivät. Faktat tarkistettu. HUOM: '
    + '"Nykyinen merkintä" on pelin tarinakaaren saapumisteksti — '
    + 'sama joka näkyy Euroopan tekstit -välilehdellä. (Repossa on '
    + 'myös vanhempi europe-saapumiset-tiedosto, jonka kaari '
    + 'syrjäytti; se poistuu uudelleenkirjoituksen yhteydessä.)',
  /*
   * Vaihtelua "Isoisä kirjoitti:" -johtolauseeseen (omistajan
   * tilaus 11.8. illalla). Kaava saa yhä esiintyä — mutta ei joka
   * kaupungissa. Jokainen tapa on samalla oma pieni kerrontakeino.
   */
  johtolauseet: [
    {
      nimi: 'Lainaus ensin, lähde perässä',
      esimerkki: '"Kaupunki haisee sateelta ja painomusteelta." '
        + 'Niin isoisä, elokuussa 1873. Minä haistoin vain sateen.',
    },
    {
      nimi: 'Käsiala kertoo',
      esimerkki: 'Isoisän käsiala muuttuu tässä kiireiseksi, rivit '
        + 'kaatuvat oikealle: "Laiva lähtee. Palaan asiaan." Hän '
        + 'ei palannut.',
    },
    {
      nimi: 'Reunamerkintä',
      esimerkki: 'Sivun reunaan on raapustettu lyijykynällä, '
        + 'selvästi myöhemmin kuin muu teksti: "Olin väärässä. '
        + 'Palaa tähän."',
    },
    {
      nimi: 'Jälki kirjassa',
      esimerkki: 'Sivujen välissä oli litistynyt raitiovaunulippu. '
        + 'Sen alle isoisä kirjoitti: "Maksoi liikaa. Kannatti."',
    },
    {
      nimi: 'Referointi',
      esimerkki: 'Isoisän mukaan sillalta laskettiin tullia. Itse '
        + 'myrskystä hän ei kirjoita sanaakaan — ja se kertoo '
        + 'enemmän kuin sivu.',
    },
    {
      nimi: 'Kirja vaikenee',
      esimerkki: 'Tästä kaupungista kirjassa on puoli riviä ja '
        + 'mustetahra. Loppu jää minun kirjoitettavakseni.',
    },
    {
      nimi: 'Mittaus puhuu',
      esimerkki: 'Isoisä ei kuvaillut vaan mittasi: "Silta: 520 '
        + 'askelta. Kello: kolmetoista lyöntiä. Laskin kahdesti."',
    },
    {
      nimi: 'Vastaus ajan yli',
      esimerkki: 'Kysyin ääneen, kannattaako nousta kukkulalle '
        + 'asti. Isoisä vastasi kirjan välistä, sataviisikymmentä '
        + 'vuotta myöhässä: "Nouse. Aina."',
    },
    {
      nimi: 'Hidas luku',
      esimerkki: 'Luin saman lauseen kolmesti ennen kuin sain '
        + 'käsialasta selvää — ja sitten nauroin ääneen keskellä '
        + 'katua.',
    },
  ],
  kaupungit: [
    {
      id: 'wien',
      nimi: 'Wien',
      keinot: ['skandaali (pörssiromahdus 1873)', 'aikakontrasti',
        'mittaajan persoona'],
      nykyinen: {
        kuvaus: 'Maailmannäyttelyn rotunda kohosi Praterissa '
          + 'suurempana kuin yksikään mittaamani kupoli, ja sen '
          + 'alla koneet kutoivat, laskivat ja kirjoittivat. '
          + 'Jonotin tunnin sisään ja toisen ulos. Illalla '
          + 'laskeuduin kirkon alle luukammioihin. Kynttilöiden '
          + 'liekit taipuivat kaikki samaan suuntaan, vaikka ilma '
          + 'seisoi. Kirjasin molemmat ihmeet samalle sivulle.',
      },
      uusi: {
        kuvaus: 'Kahvilan lehtitelineessä talouslehti huusi kurssien '
          + 'syöksyä. Vanha herra viereisestä pöydästä kohautti '
          + 'olkiaan: "Wien on nähnyt pahempaa — kysykää vuodelta '
          + '1873."',
        nosto: 'Isoisä kirjoitti: "Pörssi romahti kesken '
          + 'maailmannäyttelyn. Eilen herrat ostivat samppanjaa, '
          + 'tänään he myyvät kellojaan. Pidin rahani taskussa."',
      },
      perustelu: 'Skandaali on koukku, ja vuoden 1873 Wien on '
        + 'niitä täynnä: maailmannäyttely avattiin toukokuun '
        + 'alussa ja pörssi romahti 9.5.1873 ("musta perjantai") '
        + 'kesken juhlien. Vanhan herran repliikki sitoo skandaalin '
        + 'nykypäivään ilman, että teksti vanhenee. Horatio saa '
        + 'olla varovainen mittaaja, joka ei lähde kuplaan mukaan. '
        + 'Nykyinen kaarimerkintä kertoo rotundasta muttei '
        + 'romahduksesta — draama jää käyttämättä.',
    },
    {
      id: 'helsinki',
      nimi: 'Helsinki',
      keinot: ['pienestä suureen (mustikka → jokamiehenoikeus)',
        'kommellus', 'huumori'],
      nykyinen: {
        kuvaus: 'Kuninkaanportin rappusilla poika onki ilman '
          + 'koukkua; siimassa riippui pelkkä paino. Mitä pyydät, '
          + 'kysyin. Pohjaa, poika vastasi — isä käski mitata, '
          + 'nouseeko maa täälläkin. Kirjasin hänen lukemansa '
          + 'vihkooni ja annoin hänelle lyijykynäni: mittamies '
          + 'tarvitsee oman. Maa nousee. Jonain päivänä se nostaa '
          + 'esiin sen, minkä minä jätin.',
      },
      uusi: {
        kuvaus: 'Ostin Kauppatorilta rasian mustikoita. Myyjä '
          + 'nauroi: "Metsässä näitä saa ilmaiseksi — jokamiehen'
          + 'oikeus. Kenenkään metsä ei ole marjastajalta kiinni."',
        nosto: 'Isoisä kirjoitti: "Täällä herrasmies katoaa metsään '
          + 'ämpäri kädessä, eikä kukaan ihmettele. Kokeilin. '
          + 'Ämpäri täyttyi, housut menivät pilalle."',
      },
      perustelu: 'Pienestä suureen: yksi marjarasia avaa '
        + 'jokamiehenoikeuden — asian, joka erottaa Pohjolan '
        + 'melkein koko muusta maailmasta. Oivallus tulee myyjän '
        + 'naurun ja Horation pilalle menneiden housujen kautta, '
        + 'ei luentona. Sama mustikka on ehdolla Suomen pieneksi '
        + 'paikallisaarteeksi — teksti ja aarre tukevat toisiaan. '
        + 'HUOM: nykyisen kaarimerkinnän maankohoaminen on upea '
        + 'fakta ja poika hieno kohtaus, mutta loppu ("se nostaa '
        + 'esiin sen, minkä minä jätin") rikkoo uutta kaanonia — '
        + 'isoisä ei jätä mitään odottamaan.',
    },
    {
      id: 'lissabon',
      nimi: 'Lissabon',
      keinot: ['historian oikku (maanjäristys 1755)',
        'henkilö liikkeellä (ratikka)'],
      nykyinen: {
        kuvaus: 'Belémin vartija vannoi, ettei torni ole siirtynyt '
          + 'keskelle jokea — joki siirtyi. Kirjasin väitteen '
          + 'varauksella ja tilasin kolmannen kermaleivoksen: '
          + 'reseptin loivat munkit, ja sen tuntee yhä vain '
          + 'kourallinen eläviä. Laskuveden rajassa kiveä kiersi '
          + 'rengas, syvälle kulunut. Sata vuotta laivoja, jotka '
          + 'eivät enää käy. Nousuvesi peitti sen silmissäni.',
      },
      uusi: {
        kuvaus: 'Ratikankuljettaja osoitti risteystä: "Suorat kadut '
          + 'rakennettiin vuoden 1755 järistyksen jälkeen. Vinot '
          + 'ovat vanhempia." Koko kaupunki on kartta siitä '
          + 'aamusta.',
        nosto: 'Isoisä kirjoitti: "Alfaman kujat kestivät '
          + 'järistyksen, joka kaatoi palatsit alhaalla. Köyhien '
          + 'kivet seisoivat, mahtavien eivät. Siinä miettimistä."',
      },
      perustelu: 'Historian oikku: yksi aamu (1.11.1755) muovasi '
        + 'kaupungin, ja jälki näkyy yhä katukuvassa — vino katu '
        + 'on vanha, suora uusi. Tieto tulee liikkeessä olevalta '
        + 'ihmiseltä, ei kyltistä. Alfama tosiaan säästyi '
        + 'pahimmalta, kun alakaupunki sortui; Baixa rakennettiin '
        + 'ruutuun. Nykyinen kaarimerkintä (Belém) on tunnelmaltaan '
        + 'hieno mutta järistys — kaupungin suurin tarina — jää '
        + 'siinä kokonaan kertomatta.',
    },
    {
      id: 'rooma',
      nimi: 'Rooma',
      keinot: ['elokuvallinen avaus + etikettivirhe',
        'aikakontrasti (sama kömmähdys 150 v välein)'],
      nykyinen: {
        kuvaus: 'Trevin allas oli tyhjennetty, ja pohjalta nousi '
          + 'kolikoiden sade — rahat annetaan köyhille. Yksi '
          + 'kolikko oli muita vanhempi, ja sen reunaan oli '
          + 'viilattu tähtäinristi. Heitin sen takaisin väärin. '
          + 'Vieressä seissyt rouva näytti oikean tavan — oikealla '
          + 'kädellä vasemman olan yli — niin arvokkaasti, että '
          + 'heitin toisenkin. Kirjasin: köyhät saivat kaksi '
          + 'ropoa, minä opetuksen.',
      },
      uusi: {
        kuvaus: 'Baari kiilsi: kone paineessa, barista tarkka kuin '
          + 'kelloseppä, jono paikallisia espressolla. Tilasin '
          + 'cappuccinon. Kello oli neljä. Jono hiljeni kuin '
          + 'kirkossa.',
        nosto: 'Isoisä kirjoitti: "Caffè Grecossa taiteilijat '
          + 'istuvat päivän yhdellä kupilla. Tilasin heti toisen, '
          + 'ja tarjoilija katsoi minua kuin tuhlaajapoikaa."',
      },
      perustelu: 'Elokuvallinen avaus: kohtaus rakennetaan kolmella '
        + 'kuvalla (kone, barista, jono) ja Reginald astuu kuvaan '
        + 'väärällä tilauksella — cappuccino iltapäivällä on '
        + 'Italiassa turistin tuntomerkki. Isoisä teki saman '
        + 'kömmähdyksen eri muodossa 1873 (Caffè Greco on ollut '
        + 'taiteilijoiden kahvila 1760-luvulta). Kaksi herraa, '
        + 'sama nolous, 150 vuotta väliä — piikki osoittaa '
        + 'herroihin, ei paikallisiin. HUOM: nykyinen '
        + 'kaarimerkintä (rouva opettaa kolikonheiton) on hieno ja '
        + 'samanhenkinen — tämä näyte on rinnalle punnittavaksi, '
        + 'ei itsestäänselvä korvaaja. Tähtäinristikolikko on '
        + 'tosin mystiikkaa, joka ei johda mihinkään.',
    },
    {
      id: 'praha',
      nimi: 'Praha',
      keinot: ['johtolause: reunamerkintä', 'yllätysfakta',
        'aikakontrasti'],
      nykyinen: {
        kuvaus: 'Kultaisen kujan talot ovat niin pieniä, että löin '
          + 'pääni kamanaan kahdesti; kolmannella kumarsin ennen '
          + 'kuin ovi ehti pyytää. Talossa kahdeksan paloi '
          + 'kynttilä lukitun oven takana. Pöydällä oli kirja, '
          + 'reunassaan barometrini lukema. Kirjasin omani '
          + 'viereen: piirtoa myöten samat — eri käsialalla. Sinä, '
          + 'joka tätä luet: kynttilä ei sytytä itseään.',
      },
      uusi: {
        kuvaus: 'Kellon alla opas kertoi, että apostolit paloivat '
          + 'sodan viime päivinä 1945 ja veistäjä teki uudet. '
          + 'Aukio katsoo vanhaa kelloa ja nuoria pyhimyksiä yhtä '
          + 'aikaa.',
        nosto: 'Sivun reunaan isoisä lisäsi lyijykynällä, selvästi '
          + 'myöhemmin: "Kello käy yhä. Tarkista." Tarkistin: käy.',
      },
      perustelu: 'Johtolausevariaatio: reunamerkintä eri kynällä '
        + 'kertoo, että isoisä palasi sivuilleen — kirja eli hänen '
        + 'mukanaan. Yllätysfakta on tosi: Orloj vaurioitui Prahan '
        + 'kansannousussa toukokuussa 1945, puiset apostolit '
        + 'paloivat ja Vojtěch Sucharda veisti uudet. Vanhin osa '
        + 'kellosta on 1400-luvulta. HUOM: nykyinen kaarimerkintä '
        + 'rikkoo uutta kaanonia kahdesti — "Sinä, joka tätä '
        + 'luet" -puhuttelu on poistettu linjauksissa, ja '
        + 'etsijälle palava kynttilä on juuri sitä 150 vuoden '
        + 'odotusta, josta luovutaan.',
    },
    {
      id: 'istanbul',
      nimi: 'Istanbul',
      keinot: ['johtolause: lainaus ensin', 'henkilö liikkeellä',
        'pienestä suureen'],
      nykyinen: {
        kuvaus: 'Laskin viisikymmentäkaksi porrasta pimeään, ja '
          + 'kaupungin äänet sammuivat yksi kerrallaan. Alhaalla '
          + 'avautui pylväsmetsä mustassa vedessä; laskin '
          + 'pylväitä, kunnes lyhty vapisi kädessäni. Yhden '
          + 'pylvään alla lepäsi kivinen kasvo ylösalaisin. '
          + 'Sammutin lyhtyni kokeeksi — ja veden ylle jäi '
          + 'palamaan toinen valo, joka ei ollut minun.',
      },
      uusi: {
        kuvaus: 'Lautta kynti Bosporia, ja kymmenessä minuutissa '
          + 'vaihdoin maanosaa teelasin äärellä. Kukaan ei '
          + 'nostanut katsettaan — täällä arki ylittää mantereita.',
        nosto: '"Aamiainen Euroopassa, illallinen Aasiassa, ja '
          + 'välissä vain lautan kolikko." Niin isoisä vuonna '
          + '1873. Hinta on noussut; ihme ei.',
      },
      perustelu: 'Johtolausevariaatio: lainaus ensin ja lähde '
        + 'perässä — nopein tapa päästä isoisän ääneen. Pienestä '
        + 'suureen: teelasi lautalla avaa sen, että Istanbul on '
        + 'maailman ainoa suurkaupunki kahdella mantereella, ja '
        + 'ylitys on tavallista arkea. Nykyinen kaarimerkintä '
        + '(Basilika-säiliö) on tunnelmallinen, mutta toinen valo '
        + 'pimeässä on mystiikkaa ilman jatkoa — ja säiliön '
        + 'sijaan arkinen lautta kertoo kaupungista enemmän.',
    },
    {
      id: 'ateena',
      nimi: 'Ateena',
      keinot: ['johtolause: mittaus puhuu', 'mittaajan persoona',
        'aikakontrasti'],
      nykyinen: {
        kuvaus: 'Pöllö istui kaatuneella pylväällä ja katsoi minua '
          + 'liikahtamatta, kuin vaatisi selitystä '
          + 'myöhästymisestäni. Kirjasin vihkooni tuijotuksemme '
          + 'keston: seitsemän minuuttia, ja minä käänsin katseeni '
          + 'ensin. Silloin se astui syrjään: jalan alla oli '
          + 'hopearaha, vanhempi kuin mikään mittaamani. Se ei '
          + 'vartioinut rahaa minulta — se näytti, mistä aloittaa.',
      },
      uusi: {
        kuvaus: 'Ostin Akropoliin lipun puhelimella, ja jono '
          + 'kiemurteli silti rinteen alas. Marmoriportaat ovat '
          + 'kuluneet keskeltä kuopalle — joka askel on kävelty '
          + 'miljoonasti.',
        nosto: 'Isoisä ei kuvaillut Parthenonia sanallakaan. Hän '
          + 'mittasi: "Pylväitä 46. Askelmia 3. Tuuli pohjoisesta. '
          + 'Sanat eivät riitä; luvut edes yrittävät."',
      },
      perustelu: 'Johtolausevariaatio: mittaus puhuu. Horatio on '
        + 'mittaaja, ja hänen hiljaisuutensa sanoissa + tarkkuutensa '
        + 'luvuissa kertoo liikutuksesta enemmän kuin ylistys. '
        + 'Faktat: Parthenonin ulkopylväikössä on 46 pylvästä ja '
        + 'stylobaatissa kolme askelmaa. Portaiden kuluma on totta '
        + 'ja jokainen turisti näkee sen itse. Nykyisen '
        + 'kaarimerkinnän pöllö on kaunis kuva, mutta ohjaava '
        + 'eläin ("näytti mistä aloittaa") on taikaa, josta uusi '
        + 'kaanon luopuu.',
    },
  ],
  /*
   * Kohtaaminen uudella mallilla: hiljaisen tiedon arkku (paikallinen
   * testaa tietämyksen ennen kuin auttaa), EI "150 vuotta odottanut"
   * -siirappia. Muoto on sama kuin pelissä (henkilo / kohtaaminen /
   * kysymys / aarre — ks. js/tyohuone-kehitys-data.js).
   */
  kohtaamisNayte: {
    kaupunki: 'Helsinki',
    henkilo: 'Torikauppias Aino myy marjoja Kauppatorilla '
      + 'kolmannessa polvessa ja tietää, mistä metsästä mikin '
      + 'rasia on poimittu.',
    kohtaaminen: 'Aino punnitsee mustikoita ja vilkaisee kirjaani. '
      + '"Vanha kirja ei tee kenestäkään marjastajaa. Jos tunnet '
      + 'metsän tavat, autan sinua etsimään — vastaa ensin."',
    kysymys: {
      q: 'Mitä jokamiehenoikeus sallii Suomen metsissä?',
      vaihtoehdot: [
        'Poimia marjoja ja sieniä lähes missä tahansa',
        'Kaataa puita omaan käyttöön',
        'Leiriytyä pihoihin ja pelloille vapaasti',
        'Metsästää ilman lupaa syksyisin',
      ],
      oikea: 0,
      fakta: 'Jokamiehenoikeus sallii marjojen ja sienten '
        + 'poiminnan ja liikkumisen luonnossa maanomistajasta '
        + 'riippumatta — mutta ei puiden kaatoa, pihamaita eikä '
        + 'metsästystä. Vastaava oikeus on vain harvassa maassa, '
        + 'lähinnä Pohjolassa.',
    },
    aarre: 'Aino luki isoisän merkinnän kallioista Tuomiokirkon '
      + 'takana ja nauroi: "Tunnen paikan — kalliot eivät ole '
      + 'muuttuneet, vaikka kaupunki ympärillä on." Kätkö oli '
      + 'railossa, kuivan sammalen alla.',
    perustelu: 'Uusi kaava: kukaan ei ole odottanut poikaa, eikä '
      + 'isoisä virittänyt mitään. Aino auttaa, koska Reginald '
      + 'osoittaa tuntevansa metsän tavat — ja kätkö ratkeaa vain '
      + 'yhdistämällä isoisän kuvaus (kalliot, jotka eivät muutu) '
      + 'ja Ainon hiljainen tieto (missä ne ovat). Kysymyksen '
      + 'fakta jatkaa saman kaupungin mustikkateemaa.',
  },
  /*
   * Aarrelöytötekstit uudella paikallisaarremallilla: lyhyt tosi
   * tieto + onnentoivotus, huudahdus korkeintaan kaksi sanaa.
   */
  aarreNaytteet: [
    {
      maa: 'Suomi',
      koko: 'pieni paikallisaarre (~150 p)',
      aarre: 'Tuohirasia mustikoita',
      huudahdus: '"No okei."',
      teksti: 'Tuohirasiallinen mustikoita! Suomen metsissä marjat '
        + 'kuuluvat jokaiselle — sitä sanotaan '
        + 'jokamiehenoikeudeksi. Onnea etsintöihin, nuori herra!',
    },
    {
      maa: 'Suomi',
      koko: 'iso paikallisaarre (~700 p)',
      aarre: 'Kalevalan ensipainos 1835',
      huudahdus: '"Jippii!"',
      teksti: 'Kalevalan ensipainos vuodelta 1835! Lönnrot kokosi '
        + 'runonlaulajien muistista kokonaisen eepoksen — pieni '
        + 'painos, joka muutti kielen kirjallisuudeksi. Onnea '
        + 'etsintöihin, nuori herra!',
    },
  ],
};
