/*
 * MAAKOHTAISET PAIKALLISAARTEET (Raamattu, osio "Aarteet ja
 * eteneminen": *"Paikallisaarteet: joka maalle oma pari (pieni + iso),
 * paikkaan sopivia, osa hauskan yllättäviä. ~220 paria."*).
 *
 * TAULU TÄYTETÄÄN MANNER KERRALLAAN. Sisältöparit kirjoitetaan käsin —
 * pelilogiikka ei keksi maakohtaisia nimiä eikä faktoja itse. Euroopan
 * 29 maata on kirjoitettu (28.8.2026, omistajan hyväksymä lista); muut
 * mantereet odottavat vuoroaan ja käyttävät siihen asti laudan omaa
 * paria. Mekaniikka on ollut valmis alusta asti, joten sisältötyö ei
 * vaadi muutosta pelin koodiin.
 *
 * AVAIN ON ISO3-MAAKOODI (sama kuin pack.map.cityCountry), koska pari
 * kuuluu MAALLE eikä mantereelle tai kaupungille: yksi pari kattaa maan
 * kaikki kaupungit. Rivin muoto:
 *
 *   FIN: {
 *     pieniAarre: { name: 'Tervatynnyrin pohjalta löytynyt …',
 *                   fakta: 'Lyhyt tosi fakta aarteesta.' },
 *     isoAarre:   { name: '…', fakta: '…' },
 *   },
 *
 * `name` korvaa laudan oman nimen ja `fakta` on löytötekstin tosi
 * puolisko (Raamattu: *"Löytöteksti: lyhyt tosi fakta aarteesta +
 * onnentoivotus"*). Rivi saa antaa myös `kuva`-kentän samassa muodossa
 * kuin laudan omat aarrekuvat. Puuttuva kenttä jää laudan omaksi, joten
 * taulun saa täyttää maa kerrallaan ilman että peli hajoaa välissä.
 *
 * NIMEN JÄRJESTYS ON NIMENOMAAN TÄMÄ (omistajan päätös 28.8.2026,
 * kysymyskortti "hopeakolikot vai meripihka"): maan oma pari → laudan
 * oma teema (nimi JA kuva samasta rivistä, js/packs/*.js
 * themedTokenTypes) → js/tokens.js yleinen varanimi. Yleinen varanimi
 * ei saa mennä laudan oman nimen edelle, koska AARREKUVA TULEE
 * LAUDALTA aina kun maan omaa kuvaa ei ole: jos varanimi voittaisi,
 * Euroopan meripihkakuvan päällä lukisi "Kourallinen hopeakolikoita"
 * ja Afrikan kaurikotiloiden päällä sama. Laudoilla, jotka eivät nimeä
 * pariaan (maailma, maailmankartta), ei ole kuvaakaan, joten yleisnimi
 * on siellä turvallinen.
 *
 * KUVA TULEE MAALTA, KUN MAALLA ON OMANSA (28.8.2026): Euroopan 58
 * paikallisaarteella on nyt oma kuva (`kuva`-kenttä alla), ja se
 * VOITTAA laudan kuvan — sama nimi ja sama kuva samasta rivistä, joten
 * mustikkakorin päällä lukee "Korillinen mustikoita" eikä laudan
 * "Itämeren meripihka". Logiikka ei kaivannut muutosta: yhdistely on
 * `{ ...pohja, ...oma }` (js/game.js aarreMantereella), joten rivin
 * jokainen annettu kenttä — name, fakta JA kuva — syrjäyttää laudan
 * oman, ja puuttuva kenttä jää laudalta. Uuden mantereen rivit saa
 * siksi yhä kirjoittaa ilman kuvaa: silloin näkyy laudan yleiskuva.
 */

/*
 * FAKTA ON TOSI, TARU ON MERKITTY TARUKSI. Jokainen fakta on lyhyt
 * tietoisku aarteesta (2–4 virkettä, Itämeren meripihkan mitta ja
 * tyyli, js/packs/europe.js). Kun aarre itse on legenda — Sampo,
 * Nibelungein kulta, Wilhelm Tellin jousi, Attilan hauta, Egillin
 * hopea, Polubotokin talletus — se sanotaan tekstissä suoraan
 * ("tarun mukaan", "saagan mukaan", "legendan mukaan"), eikä tarua
 * koskaan esitetä löytönä. Epävarma yksityiskohta jätetään pois
 * mieluummin kuin kirjoitetaan varmaksi.
 *
 * Järjestys on omistajan listan järjestys (Pohjola → Baltia →
 * Keski-Eurooppa → Britteinsaaret → Etelä-Eurooppa → Balkan → itä),
 * ei aakkosjärjestys: pari löytyy naapureidensa vierestä.
 */
export const PAIKALLISAARTEET = {
  /*
   * SUOMEN PARI KIRJOITETTIIN UUSIKSI v1320:ssa (päätoimittajan kaanon
   * 29.8.2026, aalto 3). Vanha pari — korillinen mustikoita ja Sammon
   * siru — oli hyvää sisältöä, mutta se EI vastannut Helsingin
   * fokusvirran kaanontekstejä: matkakirjamerkintä päättyy tervaan
   * ("sitä lastattiin laivoihin kuin kultaa") ja aarremerkintä nimeää
   * Ivalojoen kullan, jonka isoisä jätti perilliselleen. Kun löytökortin
   * nimi ja isoisän merkintä ovat eri asiaa, kaupungin koko kaari
   * hajoaa löytöhetkellä — siksi pari seuraa nyt merkintöjä.
   *
   * KUVAT OVAT VANHAN PARIN OMAT eikä niitä ole vielä generoitu
   * uusiksi: assets/aarteet/paikallis/fin-pieni.jpg on mustikkakori ja
   * fin-iso.jpg Sammon siru. Ne EIVÄT käy uusiin nimiin, joten
   * `kuva`-kenttä on poistettu — silloin peli näyttää laudan oman
   * aarrekuvan (js/game.js aarreMantereella), joka on oikea eikä väärä.
   * Kummankin uuden aiheen kuvaprompti on raportoitu promptinippuun, ja
   * kun kuvat on generoitu, `kuva`-rivit palautetaan tähän.
   */
  FIN: {
    pieniAarre: {
      name: 'Tervatynnyrin pohjalta löytynyt hopeariksi',
      fakta: 'Terva oli 1800-luvun Suomen tärkein vientitavara, ja Oulu oli '
        + 'maailman suurimpia tervasatamia.',
    },
    isoAarre: {
      name: 'Ivalojoen kultahippu',
      fakta: 'Ivalojoen kultaryntäys alkoi 1870, ja huippuvuonna 1871 joelta '
        + 'huuhdottiin yli 50 kiloa kultaa.',
    },
  },
  SWE: {
    pieniAarre: {
      name: 'Kori kanelipullia',
      kuva: 'assets/aarteet/paikallis/swe-pieni.jpg',
      fakta: 'Ruotsissa vietetään kanelipullan päivää 4. lokakuuta; leipomisen '
        + 'edistämisyhdistys keksi päivän vuonna 1999, ja siitä tuli pysyvä tapa. '
        + 'Pulla kuuluu fikaan, kahvitaukoon, joka on Ruotsissa sekä sana että '
        + 'instituutio. Taikinaan tulee kanelin lisäksi usein kardemummaa.',
    },
    isoAarre: {
      name: 'Kronan-laivan kultakolikot',
      kuva: 'assets/aarteet/paikallis/swe-iso.jpg',
      fakta: 'Ruotsin laivaston lippulaiva Kronan räjähti ja upposi Öölannin '
        + 'edustalle 1. kesäkuuta 1676, ja mukana meni satoja miehiä. Hylky '
        + 'löytyi vasta 1980 samalta tutkijalta, joka oli aikanaan löytänyt '
        + 'Vasan, ja siitä on nostettu satoja kultakolikoita ja tuhansia '
        + 'esineitä. Kaivauksia on tehty kesä kerrallaan vuosikymmenten ajan.',
    },
  },
  NOR: {
    pieniAarre: {
      name: 'Tuubi ruskeaa mesostia',
      kuva: 'assets/aarteet/paikallis/nor-pieni.jpg',
      fakta: 'Ruskea juusto ei ole varsinaista juustoa vaan heraa, jota keitetään '
        + 'tuntikausia, kunnes maitosokeri karamellisoituu makeaksi ja ruskeaksi. '
        + 'Rasva ja sokeri tekevät siitä myös palavaa: vuonna 2013 lastillinen '
        + 'mesostia sytytti Pohjois-Norjassa tunnelipalon, joka kyti päiviä.',
    },
    isoAarre: {
      name: 'Viikinkien hopeakätkö',
      kuva: 'assets/aarteet/paikallis/nor-iso.jpg',
      fakta: 'Viikinkiajalla hopea oli painotavaraa: koruja ja kolikoita hakattiin '
        + 'paloiksi ja punnittiin vaa\'alla, mistä nimi hakkohopea. Kätköistä '
        + 'löytyy usein arabialaisia dirhameja, jotka olivat kulkeneet idän '
        + 'jokireittejä pohjoiseen. Suurin osa kätköistä on tullut esiin '
        + 'pellonkynnössä tai metallinetsimellä, eikä kukaan tiedä, montako on '
        + 'yhä maassa.',
    },
  },
  DNK: {
    pieniAarre: {
      name: 'Pussi wienerleipiä',
      kuva: 'assets/aarteet/paikallis/dnk-pieni.jpg',
      fakta: 'Tanskassa wienerleipä on wienerbrød, koska tekniikka tuli Wienistä: '
        + 'vuoden 1850 leipurilakon aikana kööpenhaminalaiset palkkasivat '
        + 'itävaltalaisia leipureita, ja voitaikina jäi taloon. Wienissä sama '
        + 'leivos tunnetaan nimellä Kopenhagener. Kerrokset syntyvät '
        + 'taittelemalla — voi voidellaan taikinan väliin yhä uudelleen.',
    },
    isoAarre: {
      name: 'Gallehusin kultasarvet',
      kuva: 'assets/aarteet/paikallis/dnk-iso.jpg',
      fakta: 'Kaksi kultaista sarvea löytyi Etelä-Jyllannin pelloilta 1639 ja '
        + '1734, ja ne oli tehty rautakaudella. Vuonna 1802 kultaseppä varasti '
        + 'ne kuninkaan kokoelmasta ja sulatti kullan rahaksi. Jäljellä ovat vain '
        + 'piirustusten mukaan tehdyt jäljennökset ja toisen sarven riimukirjoitus, '
        + 'yksi vanhimmista tunnetuista pohjoismaisista lauseista.',
    },
  },
  ISL: {
    pieniAarre: {
      name: 'Purkki hákarl-haita',
      kuva: 'assets/aarteet/paikallis/isl-pieni.jpg',
      fakta: 'Grönlanninhain liha on tuoreena myrkyllistä, koska siinä on runsaasti '
        + 'ureaa ja trimetyyliamiinioksidia. Siksi liha käytetään ensin viikkoja ja '
        + 'kuivataan sitten kuukausia, ennen kuin sen voi syödä. Sama hai on '
        + 'maailman pitkäikäisimpiä selkärankaisia: vanhimpien yksilöiden on '
        + 'arvioitu eläneen satoja vuosia.',
    },
    isoAarre: {
      name: 'Egillin hopea-arkku',
      kuva: 'assets/aarteet/paikallis/isl-iso.jpg',
      fakta: 'Egilin saagan mukaan vanha Egill Skallagrímsson vei kaksi hopea-arkkua '
        + 'yön selkään, kätki ne ja tappoi mukanaan olleet orjat, jottei kukaan '
        + 'tietäisi paikkaa. Saaga kertoo hopean tulleen palkkiona Englannin '
        + 'kuninkaalta. Mosfellin seudulta on etsitty kätköä vuosisatoja '
        + 'löytämättä mitään — tarina on saagaa, ei asiakirjaa.',
    },
  },
  EST: {
    pieniAarre: {
      name: 'Kimppu savusilakoita',
      kuva: 'assets/aarteet/paikallis/est-pieni.jpg',
      fakta: 'Itämeren silakka on Atlantin sillin murtoveteen sopeutunut alalaji ja '
        + 'jää selvästi valtamerten sukulaisiaan pienemmäksi. Virossa se '
        + 'savustetaan tavallisesti lepän savussa, ja kaloja myydään yhä '
        + 'rannikkokylissä kimppuina suoraan savustamon ovelta.',
    },
    isoAarre: {
      name: 'Hansakauppiaan hopeakätkö',
      kuva: 'assets/aarteet/paikallis/est-iso.jpg',
      fakta: 'Hansa-aikaan hopea oli kauppiaan pankki: kolikot ja astiat olivat '
        + 'säästöjä, jotka kaivettiin kellarin lattian alle heti kun sota uhkasi. '
        + 'Viron pelloista ja vanhoista taloista on löytynyt useita keskiaikaisia '
        + 'kätköjä, joissa on saksalaisia, ruotsalaisia ja venäläisiä rahoja '
        + 'samassa ruukussa. Omistaja aikoi aina palata; kätkö jäi, koska hän ei '
        + 'palannut.',
    },
  },
  LVA: {
    pieniAarre: {
      name: 'Pullo Riian mustaa balsamia',
      kuva: 'assets/aarteet/paikallis/lva-pieni.jpg',
      fakta: 'Riian musta balsami on väkevä yrttiuute, jonka reseptin laati '
        + 'apteekkari Abraham Kunze 1700-luvun puolivälissä. Sitä myydään yhä '
        + 'läpinäkymättömässä keramiikkapullossa, joka suojaa juomaa valolta ja '
        + 'lämmöltä. Tarina Katariina Suuren parantumisesta balsamilla on '
        + 'legenda, ei todistettu tapaus.',
    },
    isoAarre: {
      name: 'Kuramaan herttuan aarre',
      kuva: 'assets/aarteet/paikallis/lva-iso.jpg',
      fakta: 'Kuramaan pienestä herttuakunnasta tuli 1600-luvulla merivalta: '
        + 'herttua Jaakobilla oli oma laivasto, telakat ja siirtokunnat Tobagossa '
        + 'ja Gambiajoella. Ruotsalaiset valtasivat maan 1658 ja veivät herttuan '
        + 'vangiksi, ja tarina kätketystä herttuan kassasta on elänyt siitä asti. '
        + 'Kassasta ei ole löytynyt jälkeäkään.',
    },
  },
  LTU: {
    pieniAarre: {
      name: 'Šakotis-kakku',
      kuva: 'assets/aarteet/paikallis/ltu-pieni.jpg',
      fakta: 'Šakotis paistetaan avotulen päällä pyörivän vartaan ympärille: '
        + 'taikinaa valellaan ohuina kerroksina, ja valuva taikina jähmettyy '
        + 'piikeiksi. Yhteen kakkuun menee kymmeniä munia, ja se on häiden ja '
        + 'juhlien kakku. Sama leivos tunnetaan Puolassa nimellä sękacz ja '
        + 'Saksassa Baumkuchen.',
    },
    isoAarre: {
      name: 'Vilnan katedraalin kätkö',
      kuva: 'assets/aarteet/paikallis/ltu-iso.jpg',
      fakta: 'Vilnan katedraalin kirkkoaarteet muurattiin 1939 piiloon seinän '
        + 'onkaloon, kun sota lähestyi. Kätkö löytyi vasta 1985 korjaustöissä, ja '
        + 'neuvostoaikana löydöstä vaiettiin. Kalkit, monstranssit ja '
        + 'reliikkirasiat tulivat yleisön nähtäville vasta itsenäistymisen jälkeen.',
    },
  },
  POL: {
    pieniAarre: {
      name: 'Krakovan obwarzanek-rinkeli',
      kuva: 'assets/aarteet/paikallis/pol-pieni.jpg',
      fakta: 'Obwarzanek keitetään ennen paistamista, ja siitä tulee nimikin: '
        + 'obwarzać tarkoittaa keittämistä. Rinkeli mainitaan Krakovan hovin '
        + 'tileissä jo 1300-luvulla, ja EU on suojannut nimen '
        + 'alkuperämerkinnällä. Kaupungin sinisistä kärryistä niitä myydään '
        + 'kymmeniätuhansia joka päivä.',
    },
    isoAarre: {
      name: 'Rafaelin kadonnut muotokuva',
      kuva: 'assets/aarteet/paikallis/pol-iso.jpg',
      fakta: 'Rafaelin Nuoren miehen muotokuva kuului Krakovassa Czartoryskien '
        + 'kokoelmaan, kunnes miehittäjät veivät sen 1939. Teos nähtiin viimeksi '
        + 'kenraalikuvernööri Hans Frankin hallussa, ja jälki katkeaa sodan '
        + 'loppuun 1945. Maalausta pidetään merkittävimpänä kadonneena '
        + 'taideteoksena, ja se on yhä Puolan etsintälistan kärjessä.',
    },
  },
  CZE: {
    pieniAarre: {
      name: 'Korillinen humalankäpyjä',
      kuva: 'assets/aarteet/paikallis/cze-pieni.jpg',
      fakta: 'Žatecin eli Saazin humala on yksi maailman arvostetuimmista jaloista '
        + 'humalalajikkeista, ja se antaa tšekkiläiselle vaalealle oluelle sen '
        + 'yrttisen tuoksun. Plzeňissä pantiin 1842 ensimmäinen kirkas pilsner, ja '
        + 'tyyli levisi sieltä koko maailmaan. Tšekit juovat yhä henkeä kohti '
        + 'enemmän olutta kuin mikään muu kansa.',
    },
    isoAarre: {
      name: 'Rudolf II:n kabinetin helmi',
      kuva: 'assets/aarteet/paikallis/cze-iso.jpg',
      fakta: 'Keisari Rudolf II kokosi Prahan linnaan Euroopan kuuluisimman '
        + 'kuriositeettikabinetin: taidetta, koneita, kiviä ja luonnonihmeitä '
        + 'samoissa saleissa. Kolmikymmenvuotisen sodan viimeisenä syksynä 1648 '
        + 'ruotsalaiset joukot valtasivat linnan ja veivät kokoelman laivoilla '
        + 'Tukholmaan. Osa esineistä on yhä Ruotsissa, muun muassa jättimäinen '
        + 'Codex Gigas; suuri osa katosi jäljettömiin.',
    },
  },
  DEU: {
    pieniAarre: {
      name: 'Pussi pretzeleitä',
      kuva: 'assets/aarteet/paikallis/deu-pieni.jpg',
      fakta: 'Saksalainen laugenbrezel kastetaan ennen paistamista laimeaan '
        + 'lipeäliuokseen, ja juuri se antaa kuoren tumman värin ja oman makunsa. '
        + 'Solmun sanotaan esittävän ristissä olevia rukoilevia käsivarsia, mutta '
        + 'selitys on tarina eikä todistettu. Rinkeli on yhä leipurin '
        + 'ammattikunnan tunnus ja roikkuu monen leipomon kyltissä.',
    },
    isoAarre: {
      name: 'Nibelungein aarre',
      kuva: 'assets/aarteet/paikallis/deu-iso.jpg',
      fakta: 'Nibelungenlaulun mukaan Hagen upotti Siegfriedin perinnön, koko '
        + 'Nibelungein kulta-aarteen, Reiniin lähelle Wormsia eikä kertonut '
        + 'paikkaa kenellekään. Runoelma kirjoitettiin noin vuonna 1200, ja '
        + 'Wagner teki siitä myöhemmin oopperasarjansa. Aarretta on etsitty '
        + 'Reinistä yhä uudelleen, mutta se on runon aarre eikä arkistojen.',
    },
  },
  AUT: {
    pieniAarre: {
      name: 'Sacher-kakku puulaatikossa',
      kuva: 'assets/aarteet/paikallis/aut-pieni.jpg',
      fakta: 'Sacherkakun keksi vuonna 1832 kuusitoistavuotias oppipoika Franz '
        + 'Sacher, kun ruhtinas Metternichin keittiömestari sairastui. Hotel '
        + 'Sacher ja konditoria Demel riitelivät nimestä oikeudessa seitsemän '
        + 'vuotta, ja Wienissä puhutaan yhä makeasta oikeusjutusta. Aito kakku '
        + 'lähetetään puulaatikossa, ja aprikoosihillo on sen salaisuus.',
    },
    isoAarre: {
      name: 'Florentiner-timantti',
      kuva: 'assets/aarteet/paikallis/aut-iso.jpg',
      fakta: 'Florentiner oli 137 karaatin keltainen timantti ja Habsburgien '
        + 'kruununjalokivi. Keisariperhe otti sen mukaan maanpakoon 1918, ja '
        + 'Sveitsissä kivi katosi; sen uskotaan päätyneen varkaan mukana '
        + 'valtameren taakse ja mahdollisesti hiotun uudelleen tunnistamattomaksi. '
        + 'Julkisesti sitä ei ole nähty sadan vuoden aikana.',
    },
  },
  CHE: {
    pieniAarre: {
      name: 'Kiekko alppijuustoa',
      kuva: 'assets/aarteet/paikallis/che-pieni.jpg',
      fakta: 'Yhteen emmentalkiekkoon menee toistatuhatta litraa maitoa, ja valmis '
        + 'kiekko painaa lähes sata kiloa. Reiät syntyvät bakteereista, jotka '
        + 'tuottavat kypsymisen aikana hiilidioksidia; tutkijoiden mukaan maidon '
        + 'pienet heinähiukkaset toimivat reikien alkuina, ja siksi entistä '
        + 'puhtaampi koneellinen lypsy on kutistanut reikiä.',
    },
    isoAarre: {
      name: 'Wilhelm Tellin varsijousi',
      kuva: 'assets/aarteet/paikallis/che-iso.jpg',
      fakta: 'Legendan mukaan Wilhelm Tell ampui varsijousella omenan poikansa '
        + 'päästä ja piti toista nuolta takkinsa alla vouti Gessleriä varten. '
        + 'Tarina kirjattiin ensi kerran noin 1470 Sarnenin valkoiseen kirjaan, ja '
        + 'Schiller teki siitä näytelmän 1804. Historiallista Telliä ei ole '
        + 'löytynyt yhdestäkään asiakirjasta: jousi on tarun esine.',
    },
  },
  NLD: {
    pieniAarre: {
      name: 'Kori tulppaanisipuleita',
      kuva: 'assets/aarteet/paikallis/nld-pieni.jpg',
      fakta: 'Tulppaani ei ole alkujaan hollantilainen vaan tuotiin 1500-luvulla '
        + 'Osmanien valtakunnasta. Vuosien 1636–37 huippuhinnoilla harvinaisimmasta '
        + 'sipulista maksettiin saman verran kuin kanaalitalosta, ja helmikuussa '
        + '1637 markkina romahti päivissä. Halutuimpien tulppaanien liekkikuviot '
        + 'olivat itse asiassa viruksen aiheuttamia.',
    },
    isoAarre: {
      name: 'VOC-kauppalaivan hopealasti',
      kuva: 'assets/aarteet/paikallis/nld-iso.jpg',
      fakta: 'Hollannin Itä-Intian kauppakomppania VOC oli 1600-luvulla maailman '
        + 'suurin yhtiö ja lähetti Aasiaan tuhansia laivalasteja hopeaa, jolla '
        + 'mausteet maksettiin. Osa laivoista ei koskaan palannut, ja hylkyjä on '
        + 'löydetty niin Australian länsirannikolta kuin Atlantiltakin. '
        + 'Kolikkolastit ovat yhä tarkkaan kirjattuina yhtiön säilyneissä '
        + 'tilikirjoissa.',
    },
  },
  GBR: {
    pieniAarre: {
      name: 'Purkki marmeladia',
      kuva: 'assets/aarteet/paikallis/gbr-pieni.jpg',
      fakta: 'Marmeladi tarvitsee katkeraa sevillanappelsiinia, joka kypsyy vain '
        + 'talvella, ja valtaosa Sevillan sadosta viedään Britanniaan '
        + 'keitettäväksi. Sana tulee portugalin kvittenihilloa tarkoittavasta '
        + 'sanasta marmelada; tarina Maria Stuartista ja sanoista "Marie est '
        + 'malade" on pelkkä kansanselitys. Dundeessa marmeladia on tehty '
        + 'kaupaksi 1700-luvun lopulta asti.',
    },
    isoAarre: {
      name: 'Kuningas Juhanan jalokivet',
      kuva: 'assets/aarteet/paikallis/gbr-iso.jpg',
      fakta: 'Kuningas Juhana menetti lokakuussa 1216 kuormastonsa ylittäessään '
        + 'Washin matalaa lahtea nousuveden aikaan, ja mukana meni kruunun '
        + 'aarteisto. Kuningas kuoli muutamaa päivää myöhemmin. Aarretta ei ole '
        + 'löytynyt, ja etsintää mutkistaa se, että lahti on sittemmin liettynyt: '
        + 'onnettomuuspaikka on nykyään kuivaa peltoa. Kronikat ovat ainoa lähde, '
        + 'ja historioitsijat kiistelevät menetyksen laajuudesta.',
    },
  },
  IRL: {
    pieniAarre: {
      name: 'Korillinen turvetta',
      kuva: 'assets/aarteet/paikallis/irl-pieni.jpg',
      fakta: 'Turvetta on nostettu soista polttoaineeksi vuosisatoja, ja palat '
        + 'kuivataan pystyyn ladottuina tuulessa. Suo säilöö, mitä sinne joutuu: '
        + 'irlantilaisista soista on löytynyt puuastioissa niin sanottua suovoita, '
        + 'jonka vanhimmat löydöt ovat tuhansia vuosia vanhoja ja yhä '
        + 'tunnistettavaa rasvaa. Samasta syystä soista on noussut esiin myös '
        + 'rautakautisia ihmisruumiita.',
    },
    isoAarre: {
      name: 'Irlannin kruununjalokivet',
      kuva: 'assets/aarteet/paikallis/irl-iso.jpg',
      fakta: 'Pyhän Patrickin ritarikunnan tähti ja solki varastettiin Dublinin '
        + 'linnasta heinäkuussa 1907 juuri ennen kuninkaan vierailua. '
        + 'Kassakaappia ei murrettu vaan avattiin avaimella, eikä syyllistä '
        + 'koskaan saatu selville; vaakunaviraston päällikkö menetti virkansa. '
        + 'Jalokiviä ei ole nähty sen jälkeen, ja tapaus on Irlannin tunnetuin '
        + 'ratkaisematon varkaus.',
    },
  },
  FRA: {
    pieniAarre: {
      name: 'Kori tuoreita croissanteja',
      kuva: 'assets/aarteet/paikallis/fra-pieni.jpg',
      fakta: 'Croissant ei ole alkuperältään ranskalainen vaan itävaltalaisen '
        + 'kipferlin jälkeläinen: wieniläinen leipuri avasi Pariisiin leipomonsa '
        + '1839, ja siitä lähtien lehtitaikinaleivonnaisia sanotaan Ranskassa '
        + 'nimellä viennoiserie. Muoto kertoo raaka-aineen: pelkällä voilla tehty '
        + 'croissant leivotaan tavallisesti suoraksi, margariinilla tehty kaarelle.',
    },
    isoAarre: {
      name: 'Kruununjalokivien safiiri',
      kuva: 'assets/aarteet/paikallis/fra-iso.jpg',
      fakta: 'Ranskan kruununjalokivet varastettiin Garde-Meublen varastosta '
        + 'syyskuussa 1792 useana yönä peräkkäin, ennen kuin kukaan huomasi mitään. '
        + 'Osa kivistä saatiin takaisin, mutta moni katosi jäljettömiin: kuninkaan '
        + 'suuri sininen timantti ilmestyi kaksikymmentä vuotta myöhemmin Lontooseen '
        + 'uudelleen hiottuna ja tunnetaan nykyään Hope-timanttina. Monen muun '
        + 'kiven kohtaloa ei tiedetä yhä tänäkään päivänä.',
    },
  },
  ESP: {
    pieniAarre: {
      name: 'Verkkokassi appelsiineja',
      kuva: 'assets/aarteet/paikallis/esp-pieni.jpg',
      fakta: 'Espanja on maailman suurimpia tuoreen appelsiinin viejiä, ja suuri osa '
        + 'hedelmistä kasvaa Valencian kastelluilla huerta-mailla. Kastelusta on '
        + 'kiistelty niin kauan, että Valenciassa kokoontuu yhä joka torstai '
        + 'keskipäivällä vesituomioistuin, joka ratkoo riidat suullisesti '
        + 'katedraalin ovella. Se on Euroopan vanhimpia yhä toimivia '
        + 'tuomioistuimia.',
    },
    isoAarre: {
      name: 'Vigon lahden hopealasti',
      kuva: 'assets/aarteet/paikallis/esp-iso.jpg',
      fakta: 'Espanjan hopealaivasto tuhoutui Vigon lahdella lokakuussa 1702, kun '
        + 'englantilais-hollantilainen laivasto murtautui sataman puomin läpi. '
        + 'Suuri osa hopeasta oli kuitenkin purettu maihin jo ennen taistelua, mikä '
        + 'ei ole estänyt nostoyrityksiä kolmen vuosisadan ajan. Jules Verne pani '
        + 'kapteeni Nemon rahoittamaan Nautiluksensa juuri Vigon lahden aarteella.',
    },
  },
  PRT: {
    pieniAarre: {
      name: 'Rasia pastel de nata -leivoksia',
      kuva: 'assets/aarteet/paikallis/prt-pieni.jpg',
      fakta: 'Portugalin munakeltuaisleivonnaisten synty selitetään luostareilla: '
        + 'valkuaista kului muun muassa vaatteiden tärkkäykseen ja viinin '
        + 'kirkastamiseen, ja keltuaiset piti käyttää johonkin. Belémin luostarin '
        + 'resepti siirtyi 1830-luvulla viereiseen kauppaan, kun luostarit '
        + 'lakkautettiin, ja samassa paikassa leivotaan yhä. Nimeä pastel de Belém '
        + 'saa käyttää vain siellä tehdyistä leivoksista.',
    },
    isoAarre: {
      name: 'Kuninkaan kirjaston nide',
      kuva: 'assets/aarteet/paikallis/prt-iso.jpg',
      fakta: 'Lissabonin maanjäristys 1. marraskuuta 1755 kaatoi kaupungin, ja mitä '
        + 'järistys ja hyökyaalto jättivät, sen vei tulipalo. Kuninkaallinen '
        + 'kirjasto — arviolta 70 000 nidettä — paloi, ja mukana meni arkistoja, '
        + 'karttoja ja maalauksia. Säilyneet niteet ovat niitä, jotka sattuivat '
        + 'olemaan muualla.',
    },
  },
  ITA: {
    pieniAarre: {
      name: 'Parmesaanitahko',
      kuva: 'assets/aarteet/paikallis/ita-pieni.jpg',
      fakta: 'Yhteen parmigiano reggiano -tahkoon menee noin 550 litraa maitoa, ja '
        + 'se kypsyy vähintään vuoden ennen kuin kuoreen lyödään leima. Kypsyys '
        + 'tarkistetaan koputtelemalla kuorta pienellä vasaralla. '
        + 'Emilia-Romagnassa toimii pankki, joka ottaa tahkoja lainan vakuudeksi '
        + 'ja säilyttää holveissaan satojatuhansia kiekkoja.',
    },
    isoAarre: {
      name: 'Caravaggion kadonnut maalaus',
      kuva: 'assets/aarteet/paikallis/ita-iso.jpg',
      fakta: 'Caravaggion Kristuksen syntymä varastettiin Palermon Pyhän '
        + 'Laurentiuksen rukoushuoneesta lokakuun yönä 1969 leikkaamalla kangas '
        + 'irti kehyksestään. Mafiakäännynnäiset ovat kertoneet teoksen '
        + 'kohtalosta useita eri versioita, eikä yhdenkään mukaan maalausta ole '
        + 'nähty ehjänä vuosikymmeniin. Rukoushuoneessa on nykyään tarkka '
        + 'jäljennös alkuperäisen paikalla.',
    },
  },
  GRC: {
    pieniAarre: {
      name: 'Ruukku Hymettoksen hunajaa',
      kuva: 'assets/aarteet/paikallis/grc-pieni.jpg',
      fakta: 'Hymettoksen vuoren timjamihunaja oli kuuluisaa jo antiikin aikana, ja '
        + 'sitä kehuttiin sekä kreikkalaisissa että roomalaisissa teksteissä. '
        + 'Timjami kukkii kuivalla rinteellä keskikesällä, ja siitä tulee hunajan '
        + 'tumma väri ja yrttinen maku. Attikasta on kaivettu esiin antiikin '
        + 'aikaisia savisia mehiläispesiä, eli tapa on vanha.',
    },
    isoAarre: {
      name: 'Antikytheran koneen osa',
      kuva: 'assets/aarteet/paikallis/grc-iso.jpg',
      fakta: 'Sukeltajat löysivät 1901 Antikytheran saaren edustalta hylyn, josta '
        + 'nousi vihreä pronssimöhkäle: se osoittautui yli kahdentuhannen vuoden '
        + 'ikäiseksi hammasrataskoneeksi, joka ennusti auringon- ja '
        + 'kuunpimennyksiä. Koneesta on jäljellä 82 sirpaletta ja kolmisenkymmentä '
        + 'ratasta, mutta osa pyöristä puuttuu yhä ja niiden hampaat on jouduttu '
        + 'päättelemään laskemalla. Hylkyyn on palattu sukelluksin yhä uudelleen.',
    },
  },
  BGR: {
    pieniAarre: {
      name: 'Pullo Ruusulaakson ruusuöljyä',
      kuva: 'assets/aarteet/paikallis/bgr-pieni.jpg',
      fakta: 'Kilo ruusuöljyä vaatii tonnittain terälehtiä, ja siksi se on painonsa '
        + 'arvoisena maailman kalleimpia raaka-aineita. Terälehdet poimitaan '
        + 'Kazanlakin Ruusulaaksossa käsin aamuyöllä ennen auringonnousua, koska '
        + 'päivän lämmössä tuoksuöljy haihtuu. Sato kestää vain muutaman viikon '
        + 'touko-kesäkuussa.',
    },
    isoAarre: {
      name: 'Traakialaiskuninkaan kulta',
      kuva: 'assets/aarteet/paikallis/bgr-iso.jpg',
      fakta: 'Vuonna 1949 kolme veljestä kaivoi savea tiilitehtaalle Panagjuriŝten '
        + 'lähellä ja löysi yhdeksän puhtaasta kullasta tehtyä juoma-astiaa, '
        + 'yhteensä yli kuusi kiloa, 300-luvulta eaa. Traakialaiset hautasivat '
        + 'kultansa maahan, ja Bulgarian pelloista on noussut kymmeniä muitakin '
        + 'kätköjä. Omaa kirjallisuutta traakialaisilta ei jäänyt, joten esineet '
        + 'ovat lähes ainoa lähde heidän maailmaansa.',
    },
  },
  ROU: {
    pieniAarre: {
      name: 'Purkki Karpaattien hunajaa',
      kuva: 'assets/aarteet/paikallis/rou-pieni.jpg',
      fakta: 'Romania on Euroopan suurimpia hunajantuottajia, ja tunnetuin laatu on '
        + 'vaalea akaasiahunaja. Pesiä kuljetetaan kesällä kuorma-autolla kukinnan '
        + 'perässä laaksosta toiseen. Karpaateilla tarhaajan naapurina on Euroopan '
        + 'suurin ruskeakarhukanta Venäjän ulkopuolella, joten pesät joudutaan '
        + 'usein suojaamaan sähköaidalla.',
    },
    isoAarre: {
      name: 'Daakialainen kultarannekas',
      kuva: 'assets/aarteet/paikallis/rou-iso.jpg',
      fakta: 'Sarmizegetusa Regian raunioista ryöstettiin 1990-luvulla kilon '
        + 'painoisia daakialaisia kultarannekkeita, jotka päätyivät salakauppaan '
        + 'ulkomaille. Romania on saanut toistakymmentä niistä takaisin '
        + 'kansainvälisissä takavarikoissa, ja osa on yhä kateissa. Antiikin '
        + 'kirjoittajien mukaan kuningas Decebalus kätki aarteensa jokeen, jonka '
        + 'uoma käännettiin työn ajaksi.',
    },
  },
  HUN: {
    pieniAarre: {
      name: 'Pussi paprikajauhetta',
      kuva: 'assets/aarteet/paikallis/hun-pieni.jpg',
      fakta: 'Paprika tuli Unkariin osmanien mukana 1500-luvulla, ja Szeged ja '
        + 'Kalocsa ovat yhä sen kaksi kotikaupunkia. Szegediläinen Albert '
        + 'Szent-Györgyi eristi C-vitamiinin juuri paprikasta ja sai työstään '
        + 'Nobelin palkinnon 1937. Mieto jauhe on jalostustyön tulos: vanha '
        + 'unkarilainen paprika oli tulista.',
    },
    isoAarre: {
      name: 'Attilan hauta-aarre',
      kuva: 'assets/aarteet/paikallis/hun-iso.jpg',
      fakta: 'Gootti Jordanes kertoo 500-luvulla kirjoittamassaan historiassa, että '
        + 'Attila haudattiin kolmeen sisäkkäiseen arkkuun — kultaan, hopeaan ja '
        + 'rautaan — ja että haudan tekijät surmattiin, jottei paikka paljastuisi. '
        + 'Myöhemmät tarinat lisäävät kertomukseen joen, jonka uoma käännettiin '
        + 'haudan päälle. Hautaa ei ole löydetty, eikä kukaan tiedä edes '
        + 'suunnilleen, missä se olisi.',
    },
  },
  HRV: {
    pieniAarre: {
      name: 'Pussi Pagin saaren suolaa',
      kuva: 'assets/aarteet/paikallis/hrv-pieni.jpg',
      fakta: 'Pagin saarella on tehty merisuolaa haihduttamalla antiikin ajoista '
        + 'asti, ja suola-altaat ovat Adrianmeren vanhimpia. Bura-tuuli kantaa '
        + 'suolaa myös laitumille, joten saaren lampaat syövät suolan maustamia '
        + 'yrttejä — siitä tulee paški sir -juuston maku. Karu puuton maisema on '
        + 'saman tuulen ja saman suolan työtä.',
    },
    isoAarre: {
      name: 'Ragusan laivaston kulta',
      kuva: 'assets/aarteet/paikallis/hrv-iso.jpg',
      fakta: 'Ragusa eli Dubrovnik oli itsenäinen merenkulkutasavalta, jonka '
        + 'kauppalaivasto oli 1500-luvulla Välimeren suurimpia; englannin suurta '
        + 'kauppalaivaa tarkoittava sana argosy tulee kaupungin nimestä. '
        + 'Maanjäristys 1667 tuhosi kaupungin ja tappoi tuhansia, ja Napoleon '
        + 'lakkautti tasavallan 1808. Kaupungin arkisto säilyi silti lähes ehjänä '
        + 'ja on yhä Välimeren parhaita keskiaikaisia kauppa-arkistoja.',
    },
  },
  BIH: {
    pieniAarre: {
      name: 'Säkki bosnialaista kahvia',
      kuva: 'assets/aarteet/paikallis/bih-pieni.jpg',
      fakta: 'Bosnialainen kahvi jauhetaan lähes jauhoksi ja keitetään kuparisessa '
        + 'džezvassa: vesi kiehautetaan ensin, jauhe lisätään sitten ja astia '
        + 'nostetaan vielä kerran tulelle. Kahvi tuli Sarajevoon osmanien mukana '
        + '1500-luvulla, kauan ennen kuin siitä tiedettiin Wienissä tai '
        + 'Pariisissa. Se tarjoillaan pienessä kupissa rahat lokumin kanssa, eikä '
        + 'sitä ole tarkoitus juoda kiireessä.',
    },
    isoAarre: {
      name: 'Bosnian kuninkaan kruunu',
      kuva: 'assets/aarteet/paikallis/bih-iso.jpg',
      fakta: 'Bosnian viimeinen kuningas Stjepan Tomašević kruunattiin 1461 '
        + 'kruunulla, jonka paavi lähetti Roomasta. Kaksi vuotta myöhemmin '
        + 'osmanit valtasivat maan ja kuningas mestattiin. Kruunua ei ole nähty '
        + 'sen jälkeen, eikä tiedetä, vietiinkö se sotasaaliina vai '
        + 'kätkettiinkö se.',
    },
  },
  UKR: {
    pieniAarre: {
      name: 'Purkki hunajaa',
      kuva: 'assets/aarteet/paikallis/ukr-pieni.jpg',
      fakta: 'Ukraina on Euroopan suurimpia hunajan tuottajia ja maailman '
        + 'suurimpia viejiä. Nykyaikaisen kehyspesän kehitti ukrainalainen Petro '
        + 'Prokopovytš vuonna 1814, ja hän perusti myös ensimmäisen '
        + 'mehiläishoidon koulun. Auringonkukkapelloilta saatu vaalea hunaja on '
        + 'maan tunnetuin laatu.',
    },
    isoAarre: {
      name: 'Hetmani Polubotokin kultakätkö',
      kuva: 'assets/aarteet/paikallis/ukr-iso.jpg',
      fakta: 'Legendan mukaan hetmani Pavlo Polubotok lähetti ennen vangitsemistaan '
        + 'tynnyrillisen kultaa Englannin pankkiin ja määräsi, että talletus '
        + 'korkoineen kuuluu itsenäiselle Ukrainalle. Polubotok oli todellinen '
        + 'henkilö ja kuoli Pietari Suuren vankilassa 1724, mutta talletuksesta ei '
        + 'ole löytynyt jälkeäkään pankin arkistoista. Tarina heräsi henkiin '
        + '1990-luvulla, ja siihen uskottiin niin lujasti, että asiaa '
        + 'selvitettiin virallisesti.',
    },
  },
  RUS: {
    pieniAarre: {
      name: 'Tuohikori puolukoita',
      kuva: 'assets/aarteet/paikallis/rus-pieni.jpg',
      fakta: 'Puolukka säilyy vedessä pilaantumatta läpi talven, koska marjassa on '
        + 'luonnostaan bentsoehappoa. Sama happo hillitsee käymistä, joten hilloa '
        + 'saattoi ennen tehdä keittämättä. Metsästä marjat kannettiin '
        + 'tuohikopassa, jonka kaksinkertainen tuohiseinä piti sisällön viileänä.',
    },
    isoAarre: {
      name: 'Tsaarin kadonnut pääsiäismuna',
      kuva: 'assets/aarteet/paikallis/rus-iso.jpg',
      fakta: 'Fabergén verstas teki keisariperheelle viisikymmentä pääsiäismunaa '
        + 'vuosina 1885–1916, ja jokaisessa oli sisällä yllätys. Vallankumouksen '
        + 'jälkeen munia myytiin ulkomaille, ja osa katosi matkalla; muutama on '
        + 'yhä kateissa. Yksi kadonneista löytyi 2010-luvulla Yhdysvalloista '
        + 'romukauppiaalta, joka oli ostanut sen kullan painon takia ja aikonut '
        + 'sulattaa sen.',
    },
  },
  TUR: {
    pieniAarre: {
      name: 'Rasia lokumia',
      kuva: 'assets/aarteet/paikallis/tur-pieni.jpg',
      fakta: 'Lokum on tärkkelyksestä ja sokerista keitettyä hyytelöä, jota '
        + 'maustetaan ruusuvedellä tai mastiksilla ja tomutetaan tomusokerilla. '
        + 'Istanbulissa toimii yhä 1700-luvun lopulla perustettu makeiskauppa, '
        + 'jonka suvussa lokumia on tehty sukupolvesta toiseen. Englanninkielinen '
        + 'nimi Turkish delight syntyi 1800-luvulla brittimatkailijoiden '
        + 'tuliaisista.',
    },
    isoAarre: {
      name: 'Priamoksen aarteen korut',
      kuva: 'assets/aarteet/paikallis/tur-iso.jpg',
      fakta: 'Heinrich Schliemann kaivoi aarteen esiin Hisarlıkin kummulta 1873 ja '
        + 'vei sen salaa pois maasta; osmanit haastoivat hänet oikeuteen. Kokoelma '
        + 'katosi Berliinistä sodan lopussa 1945 ja ilmestyi vasta 1993 Moskovaan, '
        + 'eivätkä kaikki esineet ole tulleet esiin. Aarre on lisäksi noin tuhat '
        + 'vuotta vanhempi kuin Homeroksen Troija, joten se ei voi olla '
        + 'Priamoksen.',
    },
  },
};

/**
 * Maan oma paikallisaarre tai null, jos maalle ei ole vielä kirjoitettu
 * paria — silloin näytetään laudan oma nimi ja kuva. Palauttaa null myös
 * muille kuin paikallisaarteille (pääaarre ja mantereen aarre ovat
 * laudan omia).
 */
export function paikallisaarre(type, maaIso) {
  if (type !== 'pieniAarre' && type !== 'isoAarre') return null;
  return PAIKALLISAARTEET[maaIso]?.[type] ?? null;
}
