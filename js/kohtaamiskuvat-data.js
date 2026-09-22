/*
 * Kohtaamiskuvien katalogi: galleriasivun (js/kohtaamiskuvat.js) JA
 * pelin kohtaamiskortin (js/visa.js) yhteinen lähde.
 *
 * KUVA ON KYTKETTY PELIIN KAUPUNGIN KAUTTA (omistajan tilaus 1.9.2026:
 * *"nuo aarrekuvat vaativat pelissä isomman kuva-alan … voisit
 * suunnitella kohtaamiskortin uudelleen niin että kuva näkyy siinä
 * isona … kuvan alle tulee myös kuvatekstiä"*). Pelin kaupunkitunnus
 * (esim. `lissabon`) on kaupungin nimi pienellä ja ilman tarkkeita,
 * joten `kaupunki`-kenttä riittää avaimeksi — poikkeuksen voi kirjata
 * riville omana `kohde`-kenttänään. tests/kohtaamiskuvat.test.mjs
 * vaatii jokaiselta riviltä osuman tarinakaaren kohteeseen JA saman
 * hahmon nimen, joten väärä avain kaatuu portissa eikä ruudulla.
 *
 * VAIN TILA 'tarkistettu' JA aktiivinen !== false PÄÄTYY PELIIN:
 * saman kaupungin hyväksytyt vaihtoehdot säilyvät galleriassa, mutta
 * kohtaamiskortille valitaan niistä yksi. Muissa tiloissa kortti jää
 * ilman kuvaa (kuvaton kortti piirtyy ennallaan).
 */
/*
 * NIMI ON KOHTAAMIS-ALKUINEN TARKOITUKSELLA: yhden tiedoston versio
 * ketjuttaa moduulit samaan näkyvyysalueeseen, ja js/media.js käyttää
 * jo nimeä R2_JUURI samasta ämpäristä (tools/tarkista-niputus.mjs
 * kaataa törmäyksen).
 */
export const KOHTAAMIS_R2_JUURI = 'https://media.matkakirja.app/kohtaamiset';

export const kohtaamiskuvat = [
  {
    id: 'dublin-molly-kassa',
    kaupunki: 'Dublin',
    maa: 'Irlanti',
    hahmo: 'Molly',
    tiedosto: 'kasvo-dublin-molly-kassa.jpg',
    tila: 'arkisto',
    alt: 'Molly kurottaa nauraen vierivän omenan perään ruokakaupan kassalla.',
    lyhyt: 'Molly nauraa kassajonossa, kun vanha matkakirja yllättää hänet omenan vierimisen keskellä.',
    kuvateksti: 'Molly ei odottanut vanhaa matkakirjaa kassajonoon. Omena ehti vieriä, ja kysymys sai hänet nauramaan kesken kurotuksen.',
    hetki: 'Kassahihnan ostokset ovat valahtamassa eteenpäin, ja Molly nappaa viimeistä omenaa kiinni.',
    vihje: 'Dublin näkyy arjen kauppana ja paikallisena lämpönä; kysymyksen lauttasoutajia ei paljasteta kuvassa.',
  },
  {
    id: 'praha-tomas-kehys',
    kaupunki: 'Praha',
    maa: 'Tšekki',
    hahmo: 'Tomáš',
    tiedosto: 'kasvo-praha-tomas-kehys.jpg',
    tila: 'uudelleen',
    alt: 'Tomáš pujottautuu suuren kultaisen taulunkehyksen alta museon huoltokäytävässä.',
    lyhyt: 'Tomáš pysähtyy kehys harteillaan ahtaassa ovessa ja arvioi pelaajaa suoraan.',
    kuvateksti: 'Tomáš oli viemässä kehystä ahtaasta ovesta, kun pelaaja osui reitille. Hän pysähtyi kehys yhä harteillaan ja arvioi tulijaa suoraan.',
    hetki: 'Vanha kehys on juuri jäämässä oviaukkoon; työpari kannattelee toista kulmaa taustalla.',
    vihje: 'Museotyö ja linnan vanhat seinät tuovat kaksi aikakerrosta, mutta vuoden 1648 tapahtumaa ei näytetä.',
  },
  {
    id: 'berliini-lotte-auto',
    kaupunki: 'Berliini',
    maa: 'Saksa',
    hahmo: 'Lotte',
    tiedosto: 'kasvo-berliini-lotte-auto.jpg',
    tila: 'tarkistettu',
    /*
     * POIS KORTILTA 3.9.2026 (Fablen tarkistus): kuva näyttää eri hetken
     * kuin kohtaaminen (auto sateessa vs. tarinakaaren kohtaus), ja omistaja
     * tilaa uuden kuvan briefin mukaan. Hyväksytty kuva jää galleriaan.
     */
    aktiivinen: false,
    alt: 'Lotte on puoliksi sadepisaroiden peittämässä autossa ja vetää laukkua takajalkatilasta.',
    lyhyt: 'Lotte pysähtyy hankalaan väliin auton ovella, kun matkakirjan kysymys yllättää sateessa.',
    kuvateksti: 'Lotte oli jo nousemassa autoon sateensuojaan. Matkakirjan kysymys pysäytti hänet hankalaan väliin, eikä katse peittele kiirettä.',
    hetki: 'Toinen käsi pitää auton ovea, toinen vetää salkkua; tuuli tarttuu sadetakkiin.',
    vihje: 'Teleskooppikotelo ja observatorion kupu vihjaavat tähtitieteeseen paljastamatta Neptunusta.',
  },
  {
    id: 'rooma-enzo-suihkulahde',
    kaupunki: 'Rooma',
    maa: 'Italia',
    hahmo: 'Enzo',
    tiedosto: 'kasvo-rooma-enzo-suihkulahde.jpg',
    tila: 'arkisto',
    alt: 'Enzo horjahtaa polvillaan Trevin suihkulähteen reunalla kolikkohaavi kädessään.',
    lyhyt: 'Enzo horjahtaa kolikoita kerätessään, kun pelaaja kysyy vanhasta paikasta; ilme vaihtuu virneeksi.',
    kuvateksti: 'Enzo oli keräämässä kolikoita huoltotyön aikana, kun pelaaja kysyi vanhasta paikasta. Horjahdus vaihtui välittömästi tietäväksi virneeksi.',
    hetki: 'Märkä haavi heilahtaa sivulle ja vartalo kallistuu taakse, mutta toinen käsi pitää tasapainon kivellä.',
    vihje: 'Kolikot sitovat tilanteen paikalliseen tapaan, mutta kuvan perusteella ei voi päätellä oikeaa vastausta.',
  },
  {
    id: 'madrid-pilar-kellotorni',
    kaupunki: 'Madrid',
    maa: 'Espanja',
    hahmo: 'Pilar',
    tiedosto: 'kasvo-madrid-pilar-kellotorni.jpg',
    tila: 'uudelleen',
    alt: 'Pilar kurkottaa kellotornin ahtaassa koneistossa ja katsoo pelaajaa huvittuneen epäilevästi.',
    lyhyt: 'Pilar jää valjaiden varaan kellokoneiston sisällä ja mittaa pelaajaa tietävällä hymyllä.',
    kuvateksti: 'Pilar oli puoliksi kellokoneiston sisällä, kun vanhan matkakirjan kysymys tavoitti hänet. Hän jäi valjaiden varaan vinoon ja mittaa pelaajaa tietävällä hymyllä.',
    hetki: 'Toinen käsi on yhä työkalulla hammaspyörien luona, toinen pitää tasapainoa valjaissa; alhaalla nyky-Madrid liikkuu sumennettuna.',
    vihje: 'Historiallinen kellokoneisto ja nykyinen kaupunkivirta muodostavat kaksi aikakerrosta paljastamatta kysymyksen vastausta.',
  },
  {
    id: 'lissabon-ines-laattapaja',
    kaupunki: 'Lissabon',
    maa: 'Portugali',
    hahmo: 'Inês',
    tiedosto: 'kasvo-lissabon-ines-laattapaja.jpg',
    tila: 'tarkistettu',
    /*
     * POIS KORTILTA 7.9.2026: saman kohtaamisen uusi hyväksytty versio
     * (lissabon-ines-round2-r20260905-v1) tuli kuvaputkesta, ja kortille
     * mahtuu kaupungista vain yksi. Hyväksytty kuva jää galleriaan.
     */
    aktiivinen: false,
    alt: 'Inês nappaa liukuvan savilaatan kuivaustelineestä lissabonilaisessa keramiikkapajassa.',
    lyhyt: 'Inês pelastaa liukuvaa laattaa, kun pelaaja ilmestyy; säikähdys vaihtuu pidätellyksi nauruksi.',
    kuvateksti: 'Inês oli pelastamassa kuivaustelineestä liukuvaa laattaa, kun pelaaja ilmestyi kysymyksineen. Säikähdys muuttui heti pidätellyksi nauruksi.',
    hetki: 'Matala kolmiomainen asento, käsissä vielä pehmeä laatta ja taustalla moderni uuni tekevät keskeytyksestä uskottavan.',
    vihje: 'Azulejo-perinne ja nykyinen keramiikkapaja kertovat Lissabonista, mutta oikeaa vastausta ei ole maalattu näkyviin.',
  },
  {
    id: 'edinburgh-ewan-tykki',
    kaupunki: 'Edinburgh',
    maa: 'Skotlanti',
    hahmo: 'Ewan',
    tiedosto: 'kasvo-edinburgh-ewan-tykki.jpg',
    tila: 'arkisto',
    alt: 'Ewan vetää juuttunutta puhdistusvartta sateisen linnantykin äärellä ja vilkaisee kameraan.',
    lyhyt: 'Ewan keskeyttää huoltotyön hämmästyneenä, kun pelaaja kysyy vanhan matkakirjan paikasta.',
    kuvateksti: 'Ewan oli keskellä sitkeää huoltotyötä, kun pelaaja kysyi vanhan matkakirjan paikasta. Hämmästynyt katse kysyy, miksi juuri nyt.',
    hetki: 'Hän nojaa koko painollaan taakse, märkä tykki täyttää etualan ja modernit kuulosuojaimet kertovat nykyisestä työpäivästä.',
    vihje: 'Linnan vanha puolustuskalusto ja nykyinen huoltotyö kohtaavat, mutta kaupungin kysymyksen vastaus jää pelaajalle.',
  },
  {
    id: 'varsova-jadwiga-joki',
    kaupunki: 'Varsova',
    maa: 'Puola',
    hahmo: 'Jadwiga',
    tiedosto: 'kasvo-varsova-jadwiga-joki.jpg',
    tila: 'arkisto',
    alt: 'Jadwiga vetää Veikselistä raskasta siivousverkkoa ja nauraa pelaajan kysymykselle.',
    lyhyt: 'Jadwigan saapas juuttuu mutaan jokisiivouksessa, kun pelaaja kysyy 150 vuotta vanhasta paikasta.',
    kuvateksti: 'Jadwigan saapas jäi mutaan kesken jokisiivouksen. Kun pelaaja penäsi 150 vuotta vanhaa paikkaa, hän repesi nauruun mutta ei irrottanut otettaan verkosta.',
    hetki: 'Vartalo kaartuu lähes vaakasuoraan, märkä verkko kiristyy käsissä ja nykyinen siivousvene odottaa sumennetussa taustassa.',
    vihje: 'Veiksel ja verkkoon takertunut nimetön metallikoriste vihjaavat paikalliseen kuvastoon sanomatta vastausta ääneen.',
  },
  {
    id: 'amsterdam-pyorailija-aamu',
    kaupunki: 'Amsterdam',
    maa: 'Alankomaat',
    hahmo: 'Kanavasillan pyöräilijä',
    tiedosto: 'kasvo-amsterdam-pyorailija-aamu.jpg',
    tila: 'tarkistettu',
    // POIS KORTILTA 5.9.2026 (Fable): Yaran hyväksytty kuva 5.9.2026 korvaa kortilla; jää galleriaan.
    aktiivinen: false,
    alt: 'Nuori pyöräilijä pysähtyy kanavasillalle kesken Amsterdamin aamuruuhkan.',
    lyhyt: 'Nuori pyöräilijä pysähtyy kanavasillalle kypärä päässä, kun arvoitus tavoittaa hänet aamulla.',
    kuvateksti: 'Nuori pyöräilijä pysähtyy kanavasillalle kesken aamumatkan. Kypärä on yhä päässä ja pyörä käsissä, kun arvoitus tavoittaa hänet.',
    hetki: 'Liike katkeaa sillan keskelle, mutta toinen jalka ja molemmat kädet pitävät pyörän vakaana.',
    vihje: 'Kanava, silta ja arkinen pyöräliikenne sijoittavat kohtaamisen Amsterdamiin paljastamatta vastausta.',
  },
  /*
   * ARKISTOON 5.9.2026 (LUONNOS, Fable tarkistaa): Amsterdamin kaaren
   * henkilö vaihtui siltavahti Willemistä muuttotyöntekijä Yaraan
   * (js/tyohuone-kehitys-data.js, KAARI_PAKETIT 'amsterdam'), joten tämä
   * kuva näyttäisi pelissä eri ihmisen kuin se, joka kysymyksen esittää.
   * Rivi jää galleriaan vertailukappaleeksi mutta poistuu pelistä
   * (KOHTAAMISKUVAT_KOHTEELLE ottaa vain tilan 'tarkistettu').
   * Amsterdam on siihen asti kuvaton kortti — Yaran kuva kytketään, kun
   * omistaja on hyväksynyt sen ja kuvaputki on vienyt sen R2:een
   * kuvatekstein.
   */
  {
    id: 'amsterdam-koysityontekija',
    kaupunki: 'Amsterdam',
    maa: 'Alankomaat',
    hahmo: 'Willem',
    tiedosto: 'kasvo-amsterdam-koysityontekija.jpg',
    tila: 'arkisto',
    alt: 'Willem keskeyttää köysityönsä Amsterdamin kanavan sinisessä iltavalossa.',
    lyhyt: 'Willem keskeyttää köysityönsä kanavan sinisessä illassa kohdatessaan pelaajan katseen.',
    kuvateksti: 'Nuori köysityöntekijä pitää työvälineitään kanavan sinisessä illassa. Työ keskeytyy juuri sen verran, että Willem ehtii kohdata pelaajan katseen.',
    hetki: 'Köysi jää kireäksi käsien väliin ja työasento säilyy, vaikka katse kääntyy suoraan tulijaan.',
    vihje: 'Köysi, kanava ja sillan työtilanne tukevat kaupungin tarinakaarta näyttämättä kysymyksen ratkaisua.',
  },
  {
    id: 'barcelona-merce-konfetti',
    kaupunki: 'Barcelona',
    maa: 'Espanja',
    hahmo: 'Mercè',
    tiedosto: 'kasvo-barcelona-merce-konfetti.jpg',
    tila: 'tarkistettu',
    alt: 'Mercè varjostaa silmiään kirkkaassa auringossa Barcelonan konfettisateessa.',
    lyhyt: 'Mercè suojaa silmiään auringolta ja etsii pelaajaa konfettisateen ja väkijoukon keskeltä.',
    kuvateksti: 'Mercè yrittää nähdä pelaajan kirkkaassa auringossa konfettisateen keskeltä. Käsi varjostaa silmiä ja katsekontakti säilyy liikkuvassa väkijoukossa.',
    hetki: 'Konfetti jää ilmassa hetkeksi Mercèn ympärille samalla, kun hän pysähtyy kuuntelemaan kysymystä.',
    vihje: 'Juhlatunnelma ja kaupungin katutila kertovat Barcelonasta, mutta lohikäärmeen arvoitus jää ratkaistavaksi.',
  },
  {
    id: 'budapest-aiti-tytar-smoothie',
    kaupunki: 'Budapest',
    maa: 'Unkari',
    hahmo: 'Äiti ja tytär',
    tiedosto: 'kasvo-budapest-aiti-tytar-smoothie.jpg',
    tila: 'tarkistettu',
    aktiivinen: false,
    alt: 'Äiti ja tytär keskeyttävät smoothiehetkensä Budapestin kauppakeskuksen atriumissa.',
    lyhyt: 'Äiti ja tytär keskeyttävät smoothiehetkensä kauppakeskuksessa arvioidakseen pelaajan kysymystä.',
    kuvateksti: 'Äiti ja tytär keskeyttävät smoothiehetkensä kauppakeskuksen atriumissa. Toinen hörppää vielä pillillä, toinen arvioi pelaajan kysymystä huvittuneena.',
    hetki: 'Kaksi erilaista reaktiota osuu samaan keskeytettyyn hetkeen lasisen atriumin keskellä.',
    vihje: 'Nykyinen Budapest näkyy arkisessa kohtaamisessa, mutta kaupungin maanalaisen tarinan vastausta ei anneta.',
  },
  {
    id: 'budapest-marta-kylpyla-a',
    kaupunki: 'Budapest',
    maa: 'Unkari',
    hahmo: 'Márta',
    tiedosto: 'kasvo-budapest-marta-kylpyla-a.jpg',
    tila: 'tarkistettu',
    alt: 'Márta kohtaa pelaajan Széchenyin kylpylän sinisessä iltavalossa.',
    lyhyt: 'Márta kohtaa pelaajan Széchenyin kylpylän illassa, kädet puuskassa ja virne huulillaan.',
    kuvateksti: 'Márta kohtaa pelaajan Széchenyin kylpylän sinisessä illassa. Kädet puuskassa ja pieni virne tekevät matkakirjan kysymyksestä henkilökohtaisen haasteen.',
    hetki: 'Kylpylän lämmin höyry ja Mártan pysähtynyt asento tiivistävät tilanteen suoraan katsekontaktiin.',
    vihje: 'Kylpyläympäristö liittyy Budapestin lämpimään veteen paljastamatta maanalaisen labyrintin ratkaisua.',
  },
  {
    id: 'istanbul-emine-riipunta-a',
    kaupunki: 'Istanbul',
    maa: 'Turkki',
    hahmo: 'Emine',
    tiedosto: 'kasvo-istanbul-emine-riipunta-a.jpg',
    tila: 'tarkistettu',
    alt: 'Emine pysähtyy köysityössä pää alaspäin Basilica Cisternin pylväiden välissä.',
    lyhyt: 'Emine pysähtyy ylösalaisin köysityössä, kun pelaaja huutaa hänelle alhaalta.',
    kuvateksti: 'Köysityössä oleva Emine pysähtyy ylösalaisin pelaajan huudettua hänelle. Lämmin valo kasvoilla ja suora katse tekevät asennosta uskottavan työhetken.',
    hetki: 'Työvaljaat kantavat painon, köysi pysyy kireänä ja vain huomio siirtyy hetkeksi kohti pelaajaa.',
    vihje: 'Pylväät, vesi ja huoltotyö sijoittavat kuvan upotettuun palatsiin näyttämättä arvoituksen ratkaisua.',
  },
  {
    id: 'krakova-stanislaw-trumpetti',
    kaupunki: 'Krakova',
    maa: 'Puola',
    hahmo: 'Stanisław',
    tiedosto: 'kasvo-krakova-stanislaw-trumpetti.jpg',
    tila: 'tarkistettu',
    alt: 'Stanisław laskee trumpettinsa hetkeksi Krakovan iltavaloissa.',
    lyhyt: 'Stanisław laskee trumpettinsa hetkeksi Krakovan iltavaloissa, perinteinen asu yllään.',
    kuvateksti: 'Stanisław laskee trumpettinsa hetkeksi Krakovan iltavaloissa. Perinteinen asu, nykyinen kaupunki ja suora katse yhdistävät kaksi aikaa.',
    hetki: 'Torvi jää vielä soittoasennon tuntumaan, kun muusikko kääntyy kesken tehtävänsä kuuntelemaan pelaajaa.',
    vihje: 'Trumpetti vihjaa Krakovan katkeavaan säveleen, mutta kuvan yksityiskohdat eivät kerro oikeaa vastausta.',
  },
  {
    id: 'la-paz-killi-killi',
    kaupunki: 'La Paz',
    maa: 'Bolivia',
    hahmo: 'Killi Killin kohtaajat',
    tiedosto: 'kasvo-la-paz-killi-killi.jpg',
    tila: 'tarkistettu',
    aktiivinen: false,
    alt: 'Kaksi paikallista kohtaa pelaajan Killi Killin iltanäkymän äärellä La Pazissa.',
    lyhyt: 'Kaksi paikallista kohtaa pelaajan Killi Killin iltanäkymän äärellä, uteliaisuus ja tietävä hymy.',
    kuvateksti: 'Kaksi paikallista kohtaa pelaajan Killi Killin iltanäkymän äärellä. Nuoremman uteliaisuus ja vanhemman tietävä hymy muodostavat yhteisen reaktion.',
    hetki: 'Kaksi eri-ikäistä ihmistä pysähtyy samaan kysymykseen kaupungin levittäytyessä syvälle heidän taakseen.',
    vihje: 'La Pazin korkea laakso ja iltavalot tunnistavat paikan, mutta kaupungin kohtaaminen odottaa vielä tarinakaarta.',
  },
  {
    id: 'madrid-pilar-puerta-del-sol',
    kaupunki: 'Madrid',
    maa: 'Espanja',
    hahmo: 'Pilar',
    tiedosto: 'kasvo-madrid-pilar-puerta-del-sol.jpg',
    tila: 'tarkistettu',
    alt: 'Pilar nojaa kellokoneiston rakenteisiin Puerta del Solin yllä Madridissa.',
    lyhyt: 'Pilar nojaa kellokoneiston rakenteisiin Puerta del Solin yllä, katse arvioiva.',
    kuvateksti: 'Pilar nojaa kellokoneiston rakenteisiin Puerta del Solin yllä. Kasvojen kapea valo ja kaupungin pehmeä tausta rakentavat arvioivan katseen.',
    hetki: 'Pilar pitää asentonsa koneiston keskellä ja katsoo pelaajaa kuin harkitsisi, voiko tälle uskoa salaisuuden.',
    vihje: 'Kello ja Puerta del Sol kytkevät kuvan Madridin tarinaan paljastamatta kolmattatoista lyöntiä.',
  },
  {
    id: 'palermo-marionettipari',
    kaupunki: 'Palermo',
    maa: 'Italia',
    hahmo: 'Marionettiteatterin työpari',
    tiedosto: 'kasvo-palermo-marionettipari.jpg',
    tila: 'tarkistettu',
    aktiivinen: false,
    alt: 'Kaksi tekijää purskahtaa nauruun Palermon marionettiteatterin kulisseissa.',
    lyhyt: 'Kaksi tekijää purskahtaa nauruun nukketeatterin kulisseissa pelaajan vanhalle paikannimelle.',
    kuvateksti: 'Kaksi tekijää purskahtaa nauruun Palermon nukketeatterin kulisseissa. Pelaajan vanha paikannimi kuulostaa niin oudolta, että työ unohtuu hetkeksi.',
    hetki: 'Nuket ja ohjauslangat jäävät kesken työliikkeen, kun molempien huomio siirtyy samaan tulijaan.',
    vihje: 'Sisilialainen marionettiperinne paikantaa kuvan, mutta Palermon kohtaaminen odottaa vielä omaa tarinakaarta.',
  },
  {
    id: 'pariisi-kirjamyyjat-pulu',
    kaupunki: 'Pariisi',
    maa: 'Ranska',
    hahmo: 'Colette',
    tiedosto: 'kasvo-pariisi-kirjamyyjat-pulu.jpg',
    tila: 'tarkistettu',
    alt: 'Colette ja hänen tyttärensä keskeyttävät työn Seinen kirjamyyntikojulla.',
    lyhyt: 'Colette ja muut Seinen kirjamyyjät keskeyttävät työnsä pelaajan saapuessa kojulle.',
    kuvateksti: 'Seinen kirjamyyjät keskeyttävät työnsä pelaajan saapuessa kojulle. Colette arvioi tulijaa samalla, kun taustan pulu näyttää säikähtäneen joutumistaan kuvaan.',
    hetki: 'Avoin kirjalaatikko, käsissä kesken jäävä työ ja kaksi erilaista katsetta tekevät kohtaamisesta välittömän.',
    vihje: 'Seinen bukinistit sijoittavat kuvan Pariisiin, mutta odottavan kirjan arvoitus jää pelaajalle.',
  },
  {
    id: 'tukholma-astrid-maailmanpyora-c',
    kaupunki: 'Tukholma',
    maa: 'Ruotsi',
    hahmo: 'Astrid',
    tiedosto: 'kasvo-tukholma-astrid-maailmanpyora-c.jpg',
    tila: 'tarkistettu',
    /*
     * POIS KORTILTA 3.9.2026 (Fablen tarkistus): kuva näyttää eri hetken
     * kuin kohtaaminen (maailmanpyörä vs. tarinakaaren kohtaus), ja omistaja
     * tilaa uuden kuvan briefin mukaan. Hyväksytty kuva jää galleriaan.
     */
    aktiivinen: false,
    alt: 'Astrid kurottaa vaunun reunaan maailmanpyörän korkeimmassa kohdassa Tukholmassa.',
    lyhyt: 'Astrid kurottaa vaunun reunaan maailmanpyörän huipulla, hiukset lentäen tuulessa.',
    kuvateksti: 'Astrid kurottaa vaunun reunaan maailmanpyörän korkeimmassa kohdassa. Hän katsoo suoraan pelaajaan hiusten lentäessä vaakasuoraan tuulessa.',
    hetki: 'Vaunu jatkaa liikettään, mutta Astridin kurotus ja katse lukitsevat yhden jännitteisen hetken korkealla.',
    vihje: 'Tukholman maisema näkyy taustalla, mutta ovettoman talon kirjeen arvoitus ei ratkea kuvasta.',
  },
  {
    id: 'venetsia-lucia-naamio-vene',
    kaupunki: 'Venetsia',
    maa: 'Italia',
    hahmo: 'Lucia',
    tiedosto: 'kasvo-venetsia-lucia-naamio-vene.jpg',
    tila: 'tarkistettu',
    // POIS KORTILTA 5.9.2026 (Fable): Lucian hyväksytty kuva 5.9.2026 korvaa kortilla; jää galleriaan.
    aktiivinen: false,
    alt: 'Naamiontekijä Lucia lastaa sähkövenettä Venetsian kanavan laidalla.',
    lyhyt: 'Naamionsuunnittelija Lucia lastaa sähkövenettä kanavan laidalla, naamio kädessään.',
    kuvateksti: 'Naamionsuunnittelija Lucia lastaa sähkövenettä kanavan laidalla. Naamio toisessa kädessä ja vene toisessa tekevät paikallisesta työhetkestä vahvan.',
    hetki: 'Lastaus pysähtyy kesken painonsiirron, kun Lucia kääntää kasvonsa ja huomionsa suoraan pelaajaan.',
    vihje: 'Naamio, työvene ja kanava tunnistavat Venetsian paljastamatta vanhan tilauskirjan vastausta.',
  },
  {
    id: 'vilna-rasa-myrskytorni',
    kaupunki: 'Vilna',
    maa: 'Liettua',
    hahmo: 'Rasa',
    tiedosto: 'kasvo-vilna-rasa-myrskytorni.jpg',
    tila: 'tarkistettu',
    alt: 'Rasa nousee kattoluukusta myrskypuuskan tarttuessa sadetakkiin Vilnan yllä.',
    lyhyt: 'Rasa nousee kattoluukusta, kun myrskypuuska tarttuu hänen sadetakkiinsa katolla.',
    kuvateksti: 'Rasa nousee kattoluukusta juuri, kun myrskypuuska tarttuu sadetakkiin. Toinen käsi jää tikkaalle ja toinen hakee tukea kivestä kaupungin pudotessa taakse.',
    hetki: 'Kiipeäminen pysähtyy katon reunalle, mutta tuuli, hiukset ja takki jatkavat liikettä hänen ympärillään.',
    vihje: 'Vilnan katot ja vartijan myrskyinen kierros luovat paikan paljastamatta rautaisen suden arvoitusta.',
  },
  /*
   * KUVAPUTKEN ERÄ 4.9.2026 (8 kuvaa). Kuvatekstit ja vihjerajaukset
   * ovat kuvaputken toimittamassa muodossa sanasta sanaan. Tiedostot
   * ovat ämpärin juuressa ilman kasvo-etuliitettä, joten nimi kertoo
   * kaupungin, hahmon ja aiheen sellaisenaan.
   *
   * Faktapohjat (kortti ja galleria näyttävät kiinteän lähderivin
   * "Matkakirjan kuvitus", joten näille ei ole omaa kenttää):
   *   dublin-molly-hapenny — Dublin City Council, publications
   *     https://www.dublincity.ie/libraries/using-your-library/books-movies-and-more/publications
   *   moskova-vera-tsaarinkello — Moscow Kremlin Museums, Tsar Bell
   *     https://www.kreml.ru/en-Us/visit-to-kremlin/what-to-see/tsar-kolokol/
   *   helsinki-aino-luotsi — Suomenlinna, history
   *     https://suomenlinna.fi/en/explore/history/
   *   riika-ilze-kultalehti — LiveRiga, Old Town
   *     https://www.liveriga.com/en/7896-the-old-town
   *   sofia-nadia-mineraalilahde — Sofia Municipality, The mineral springs
   *     https://www.sofia.bg/en/web/sofia-municipality/w/the-mineral-springs
   *   wien-anton-katakombit — St Stephen's Cathedral, Catacombs
   *     https://www.stephanskirche.at/visitCatacombs.php
   *   bukarest-ana-freskokonservointi — Ziarul Lumina, Sfanta Ecaterina
   *     https://ziarullumina.ro/actualitate-religioasa/stiri/se-restaureaza-pictura-bisericii-sfanta-ecaterina-94364.html
   *   sofia-mila-vitosha-nuotio — Visit Sofia, Vitosha Mountain
   *     https://visitsofia.bg/en/cityinfrastructure/what-to-see/green-sofia/vitosha-mountain
   *
   * MILA JÄÄ ARKISTOON: tarinakaaressa Sofian kohtaamisen hahmo on
   * lähteenvartija Nadia, eikä vuoristopelastaja Milalle löydy omaa
   * kaaren kohdetta. Kuva säilyy galleriassa ja odottaa kohdetta;
   * pelin kohtaamiskortille menee Sofiassa Nadia.
   */
  {
    id: 'dublin-molly-hapenny',
    kaupunki: 'Dublin',
    maa: 'Irlanti',
    hahmo: 'Molly',
    tiedosto: 'dublin-molly-hapenny-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Molly punnitsee märkää kolikkoa sormissaan Ha’penny Bridgellä.',
    lyhyt: 'Molly punnitsee märkää lanttia, kun vieras saapuu juuri sadepisaran osuessa kolikkoon.',
    kuvateksti: 'Molly punnitsee märkää lanttia sormissaan. Vieras ehtii paikalle juuri, kun sadepisara osuu kolikkoon ja päätös jää tekemättä.',
    hetki: 'Sadepisara osuu kolikkoon juuri kun vieras ehtii paikalle, ja päätös jää tekemättä.',
    vihje: 'Kuvassa näkyvät Ha’penny Bridge, märkä vanha kolikko ja Mollyn keskeytynyt liike; kysymyksen vastausta tai sillan nimihistorian selitystä ei näytetä.',
  },
  {
    id: 'moskova-vera-tsaarinkello',
    kaupunki: 'Moskova',
    maa: 'Venäjä',
    hahmo: 'Vera',
    tiedosto: 'moskova-vera-tsaarinkello-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Vera koputtaa Tsaarinkellon pronssia ja kuuntelee sen värähdystä.',
    lyhyt: 'Vera koputtaa Tsaarinkellon pronssia; värähdys tuo kasvoille ylpeyden ja perityn surun.',
    kuvateksti: 'Vera koputtaa Tsaarinkellon pronssia. Vieraan kuulema värähdys tuo nuoren valajan kasvoille yhtä aikaa ylpeyden ja perityn surun.',
    hetki: 'Pronssi värähtää koputuksen jäljiltä, ja Veran kasvoille nousee ylpeys ja peritty suru.',
    vihje: 'Kuvassa näkyvät Vera ja rikkoutunut Tsaarinkello; halkeamisen syytä, tulta, sammutusvettä tai vastaustekstiä ei näytetä.',
  },
  {
    id: 'helsinki-aino-luotsi',
    kaupunki: 'Helsinki',
    maa: 'Suomi',
    hahmo: 'Aino',
    tiedosto: 'helsinki-aino-luotsi-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Aino kiristää solmun laiturilla, kun lokki vie hänen hansikkaansa.',
    lyhyt: 'Ainon solmu kiristyy laiturilla, kun lokki vie hansikkaan ja vieras saapuu paikalle.',
    kuvateksti: 'Ainon solmu kiristyy laiturilla juuri oikealla hetkellä. Lokki vie hansikkaan, ja vieras saa osakseen huvittuneen käskynhaltijan katseen.',
    hetki: 'Solmu kiristyy oikealla hetkellä, lokki nappaa hansikkaan ja vieras saa huvittuneen katseen.',
    vihje: 'Kuvassa näkyvät Aino, luotsityö ja Suomenlinnan salmi; saarten lukumäärää, karttaa tai muuta numeerista vastausvihjettä ei näytetä.',
  },
  {
    id: 'riika-ilze-kultalehti',
    kaupunki: 'Riika',
    maa: 'Latvia',
    hahmo: 'Ilze',
    tiedosto: 'riika-ilze-kultalehti-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Ilzen kultalehti leijuu ilmavirrassa avautuvan oven edessä.',
    lyhyt: 'Ilzen kultalehti nousee ilmaan vieraan avatessa oven; kauhu ja ihastus sekoittuvat hetkeksi.',
    kuvateksti: 'Ilzen kultalehti nousee ilmavirtaan vieraan avatessa oven. Kauhu ja ihastus pysyvät hetken yhtä hauraina kuin leijuva metalli.',
    hetki: 'Ovi avautuu, ilmavirta nostaa kultalehden ja kauhu ja ihastus pysyvät yhtä hauraina.',
    vihje: 'Kuvassa näkyvät Ilzen kultaustyö, ilmavirta ja leijuva kultalehti; tuuliviirin värikoodia, ilmansuuntaa tai vastauskaaviota ei näytetä.',
  },
  {
    id: 'sofia-nadia-mineraalilahde',
    kaupunki: 'Sofia',
    maa: 'Bulgaria',
    hahmo: 'Nadia',
    tiedosto: 'sofia-nadia-mineraalilahde-v2.jpg',
    tila: 'tarkistettu',
    alt: 'Nadia pärskäyttää vettä rinnuksilleen mineraalilähteellä lapsenlapsensa nauraessa.',
    lyhyt: 'Nadia säikähtää vierasta ja läikyttää vettä; lapsenlapsi purskahtaa nauruun vierestä.',
    kuvateksti: 'Nadia säikähtää vierasta ja pärskäyttää veden rinnuksilleen. Lapsenlapsi purskauttaa omansa nauruun, eikä kumpikaan saa enää pidettyä pokkaansa.',
    hetki: 'Vesi pärskähtää rinnuksille säikähdyksestä, ja lapsenlapsen nauru vie viimeisenkin pokan.',
    vihje: 'Kuvassa näkyvät Nadia, nyky-Sofian mineraalivesilähde ja veden arkinen käyttö; antiikin Serdicaa, roomalaishahmoja tai kysymyksen vastausta ei näytetä.',
  },
  {
    id: 'wien-anton-katakombit',
    kaupunki: 'Wien',
    maa: 'Itävalta',
    hahmo: 'Anton',
    tiedosto: 'wien-anton-katakombit-v2.jpg',
    tila: 'tarkistettu',
    alt: 'Anton pysähtyy kynttilät kädessään katakombien portaille.',
    lyhyt: 'Anton pysähtyy kynttilät kädessään katakombien portailla ja siristää silmänsä vierasta kohti.',
    kuvateksti: 'Anton pysähtyy kynttilät kädessään ja siristää silmänsä vierasta kohti. Katakombien portailla yksi liekki värähtää, mutta mies ei väisty.',
    hetki: 'Yksi liekki värähtää portailla, mutta Anton siristää silmänsä vierasta kohti eikä väisty.',
    vihje: 'Kuvassa näkyvät Anton, kynttilät ja katakombien portaikko; hautojen nimiä, vuosilukuja tai muuta suoraa vastaustekstiä ei näytetä.',
  },
  {
    id: 'bukarest-ana-freskokonservointi',
    kaupunki: 'Bukarest',
    maa: 'Romania',
    hahmo: 'Ana',
    tiedosto: 'bukarest-ana-freskokonservointi-v2.jpg',
    tila: 'tarkistettu',
    alt: 'Ana pysäyttää siveltimen freskon ääressä ja katsoo alas yllättyneenä.',
    lyhyt: 'Ana konservoi isoäitinsä kirkon freskoja, kun pelaajan kysymys pysäyttää hänen siveltimensä.',
    kuvateksti: 'Ana valitsi konservaattorin työn, koska isoäidin kirkon himmenevät kasvot eivät saaneet kadota. Pelaajan kysymys pysäyttää siveltimen ja saa hänet katsomaan alas aidosti yllättyneenä.',
    hetki: 'Kysymys pysäyttää siveltimen kesken konservoinnin, ja Ana katsoo alas aidosti yllättyneenä.',
    vihje: 'Kuvassa näkyvät Ana ja aidon freskokonservoinnin työvaihe; teoksen nimeä, ajoitusta tai kysymyksen vastausta ei kirjoiteta kuvaan.',
  },
  {
    id: 'sofia-mila-vitosha-nuotio',
    kaupunki: 'Sofia',
    maa: 'Bulgaria',
    hahmo: 'Mila',
    tiedosto: 'sofia-mila-vitosha-nuotio-v2.jpg',
    tila: 'arkisto',
    alt: 'Mila puhuu pelaajalle Vitoshan rinteellä, vieressään pelastuskoira.',
    lyhyt: 'Mila tuntee Vitoshan reitit sumussakin eikä lupaa apua ennen kuin pelaaja perustelee rohkeutensa.',
    kuvateksti: 'Mila tuntee Vitoshan reitit säällä, jolloin kaupunkilainen ei erota polkua pilvestä. Hän ei lupaa pelaajalle apua ennen kuin tämä kertoo, onko rohkeus suunnitelma vai pelkkä tunne — vieressä koira näyttää pohtivan samaa.',
    hetki: 'Mila jättää lupauksensa auki, kunnes pelaaja vastaa, ja koira näyttää pohtivan samaa.',
    vihje: 'Kuvassa näkyvät Mila, pelastuskoira ja Vitoshan vuoristoympäristö; reittikarttaa, kohteen nimeä tai kysymyksen vastausta ei näytetä.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 5.9.2026 20:46 UTC (posti/kohtaamiset-hyvaksytyt6-
   * pelitoimitus-2026-09-05.json): omistajan arviointisivulla hyväksymät
   * kuusi kuvaa Fable-vanhan 20:05 päätösten hahmoille (v1598 kaaret).
   * Kuvatekstit sanasta sanaan; alpit ja islanti tarvitsevat `kohde`-
   * kentän, koska kaupungin nimi ei ole pelin kaupunkitunnus.
   */
  {
    id: 'alpit-anselm-feedback-r20260905-v1',
    kaupunki: 'Suuri Sankt Bernhard',
    maa: 'Sveitsi',
    hahmo: 'Anselm',
    kohde: 'alpit',
    tiedosto: 'alpit-anselm-feedback-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Anselm pysähtyy aurinkoisella vuoripolulla. Bernhardinkoira painaa kuononsa hänen poskeensa juuri kun matkaaja kysyy aarteesta.',
    lyhyt: 'Anselm pysähtyy vuoripolulla, kun bernhardinkoira painaa kuononsa hänen poskeensa.',
    kuvateksti: 'Anselm pysähtyy aurinkoisella vuoripolulla. Bernhardinkoira painaa kuononsa hänen poskeensa juuri kun matkaaja kysyy aarteesta.',
    hetki: 'Avoin kesäinen vuoristoluonto, vanhan miehen häkeltynyt katse ja koiran painava läheisyys.',
    vihje: 'Aurinkoinen sola, hospitsin koira ja munkin kaapu kertovat paikasta; lumeen hautautuneiden etsintää ei näytetä.',
  },
  {
    id: 'amsterdam-yara-feedback-r20260905-v2',
    kaupunki: 'Amsterdam',
    maa: 'Alankomaat',
    hahmo: 'Yara',
    tiedosto: 'amsterdam-yara-feedback-r20260905-v2.jpg',
    tila: 'tarkistettu',
    alt: 'Yara on keskeyttänyt kanavatalon muuton vastatakseen matkaajalle. Yläikkunasta kurkistava työpari odottaa lupaa jatkaa, kun aarrekysymys muuttaa tilanteen suunnan.',
    lyhyt: 'Yara keskeyttää kanavatalon muuton vastatakseen matkaajan aarrekysymykseen.',
    kuvateksti: 'Yara on keskeyttänyt kanavatalon muuton vastatakseen matkaajalle. Yläikkunasta kurkistava työpari odottaa lupaa jatkaa, kun aarrekysymys muuttaa tilanteen suunnan.',
    hetki: 'Uusi henkilö ja toiminta, joka liittyy suoraan kanavatalojen nostokoukkuihin. Talojen mittasuhteet perustuvat paikkakuvaan; muutto ja henkilöt ovat fiktiivisiä.',
    vihje: 'Kanavatalon nostoköysi ja yläikkuna kertovat muutosta; päädyn koukun tarkoitusta ei sanota kuvassa.',
  },
  {
    id: 'islanti-einar-feedback-r20260905-v2',
    kaupunki: 'Haukadalur',
    maa: 'Islanti',
    hahmo: 'Einar',
    kohde: 'islanti',
    tiedosto: 'islanti-einar-feedback-r20260905-v2.jpg',
    tila: 'tarkistettu',
    alt: 'Tuuli kääntää Einarin sadetakin hupun väärinpäin juuri, kun hän kuulee matkaajan aarrekysymyksen. Hän jää katsomaan tulijaa huvittuneen epäuskoisena.',
    lyhyt: 'Tuuli kääntää Einarin hupun väärinpäin, kun hän kuulee matkaajan aarrekysymyksen.',
    kuvateksti: 'Tuuli kääntää Einarin sadetakin hupun väärinpäin juuri, kun hän kuulee matkaajan aarrekysymyksen. Hän jää katsomaan tulijaa huvittuneen epäuskoisena.',
    hetki: 'Uusi henkilö Geysirin alueen kävelyreitillä Haukadalurissa. Vuonna 2024 kuvatun reitin metalliritilä ja höyryävä alava maasto ovat paikkareferenssi; kuvassa ei väitetä näkyvän Strokkurin purkausaukkoa.',
    vihje: 'Höyryävä laakso ja tuulen kääntämä huppu kertovat paikasta; lähteen nimeä ei näytetä missään kyltissä.',
  },
  {
    id: 'odessa-iryna-feedback-r20260905-v1',
    kaupunki: 'Odessa',
    maa: 'Ukraina',
    hahmo: 'Iryna',
    tiedosto: 'odessa-iryna-feedback-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Iryna nappaa vierivän melonin käsivartensa alle juuri kun matkaaja kysyy aarteesta. Solomiia yrittää nostaa laatikkoa paikoilleen ja purskahtaa nauruun.',
    lyhyt: 'Iryna nappaa vierivän melonin, kun matkaaja kysyy aarteesta ja Solomiia purskahtaa nauruun.',
    kuvateksti: 'Iryna nappaa vierivän melonin käsivartensa alle juuri kun matkaaja kysyy aarteesta. Solomiia yrittää nostaa laatikkoa paikoilleen ja purskahtaa nauruun.',
    hetki: 'Pryvozin myyntitiskien inspiroima fiktiivinen hedelmäkoju. Vanhan kuitin tulkintaan liittyvä uusi tarinaehdotus on lähetetty Fablelle.',
    vihje: 'Privozin torin laatikot ja meloni tuovat arjen; vapaasataman vuosia ei näy kuvassa.',
  },
  {
    id: 'rooma-nico-feedback-r20260905-v1',
    kaupunki: 'Rooma',
    maa: 'Italia',
    hahmo: 'Nico',
    tiedosto: 'rooma-nico-feedback-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Nico on juuri lopettanut kappaleen Trevin lähistöllä. Matkaajan aarrekysymys pysäyttää hänet kesken naurun, kun muu soittajaryhmä jatkaa iltajuhlaa taustalla.',
    lyhyt: 'Nico pysähtyy Trevin lähistöllä kesken naurun, kun matkaaja kysyy aarteesta.',
    kuvateksti: 'Nico on juuri lopettanut kappaleen Trevin lähistöllä. Matkaajan aarrekysymys pysäyttää hänet kesken naurun, kun muu soittajaryhmä jatkaa iltajuhlaa taustalla.',
    hetki: 'Uusi henkilö ja fiktiivinen katujuhla iltavalaistuksessa. Trevin veistosten ja altaan mittasuhteet pohjaavat kaupungin paikkakuvaan; aarretarinan roolimuutos sovitetaan Fablelle.',
    vihje: 'Iltajuhlan valot ja pasuuna kertovat Trevin illasta; kolikon tapaa ei näytetä suihkulähteessä.',
  },
  {
    id: 'venetsia-lucia-feedback-r20260905-v1',
    kaupunki: 'Venetsia',
    maa: 'Italia',
    hahmo: 'Lucia',
    tiedosto: 'venetsia-lucia-feedback-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Lucia kääntyy kesken naamioiden järjestämisen. Ikkunasta siivilöityvä aurinko osuu hänen häkeltyneeseen katseeseensa.',
    lyhyt: 'Lucia kääntyy häkeltyneenä kesken naamioiden järjestämisen, aurinko silmissään.',
    kuvateksti: 'Lucia kääntyy kesken naamioiden järjestämisen. Ikkunasta siivilöityvä aurinko osuu hänen häkeltyneeseen katseeseensa.',
    hetki: 'Matkaajan yllättävä kysymys keskeyttää työn. Aurinko valaisee kasvot ja käsivarren; kissa jatkaa uniaan.',
    vihje: 'Naamiopaja ja ikkunan valo kertovat Venetsiasta; tilauskirjan sisältöä ei näytetä.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 7.9.2026 03:40 UTC (posti/kuvatoimitus-valmiit-7-
   * 20260907.json): omistajan arviointisivullaan hyväksymät viisi round2-
   * kuvaa. Kuvatekstit ja altit ovat toimituksen caption-kentästä sanasta
   * sanaan; hetki ja vihje on kirjoitettu kuvasta katsoen. Jokaisen
   * tiedoston sha256 on tarkistettu latauksessa toimitusta vastaan.
   *
   * Saman kaupungin aiemmat hyväksytyt kuvat jäävät galleriaan mutta
   * pudotettiin kortilta (`aktiivinen: false`), koska kaupungista
   * valitaan peliin yksi.
   */
  {
    id: 'praha-tomas-round2-r20260905-v1',
    kaupunki: 'Praha',
    maa: 'Tšekki',
    hahmo: 'Tomáš',
    tiedosto: 'praha-tomas-round2-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Pitkä Tomáš pysähtyy kultakehys käsissään. Ikkunasta siivilöityvä aurinko osuu hänen valkoisiin hiuksiinsa ja uurteiseen otsaansa, kun matkaajan kysymys saa hänet kumartumaan lähemmäs.',
    lyhyt: 'Tomáš pysähtyy kultakehys käsissään ja kumartuu lähemmäs matkaajan kysymystä kuullessaan.',
    kuvateksti: 'Pitkä Tomáš pysähtyy kultakehys käsissään. Ikkunasta siivilöityvä aurinko osuu hänen valkoisiin hiuksiinsa ja uurteiseen otsaansa, kun matkaajan kysymys saa hänet kumartumaan lähemmäs.',
    hetki: 'Tyhjä kultakehys nojaa hänen rintaansa vasten, molemmat kädet pitävät listoista, ja parkettisalin taulut jäävät hämärään taakse.',
    vihje: 'Vanhan gallerian korkea sali ja ikkunan valo kertovat Prahasta; kehyksen sisällä ei näy mitään eikä kysymyksen vastausta paljasteta.',
  },
  {
    id: 'ateena-dafni-round2-r20260905-v1',
    kaupunki: 'Ateena',
    maa: 'Kreikka',
    hahmo: 'Dafni',
    tiedosto: 'ateena-dafni-round2-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Dafni on lähdössä työmaalta, kun aarrekysymys pysäyttää hänet. Viimeinen valo osuu kasvoihin ja työkalulaatikkoon; tutkiva katse jää odottamaan matkaajan selitystä.',
    lyhyt: 'Dafni pysähtyy lähtiessään työmaalta viimeisessä valossa, kun aarrekysymys yllättää hänet.',
    kuvateksti: 'Dafni on lähdössä työmaalta, kun aarrekysymys pysäyttää hänet. Viimeinen valo osuu kasvoihin ja työkalulaatikkoon; tutkiva katse jää odottamaan matkaajan selitystä.',
    hetki: 'Työkalulaatikon kansi on jo kiinni ja molemmat kädet lepäävät sen päällä, kun Dafni kääntyy olkansa yli päivän viimeisessä valossa.',
    vihje: 'Restauroinnin telineet, pylväät ja maahan lasketut marmorilohkareet kertovat työmaasta; vanhoja mittamerkintöjä tai vastausta ei näytetä.',
  },
  {
    id: 'lontoo-mina-theo-round2-r20260905-v1',
    kaupunki: 'Lontoo',
    maa: 'Englanti',
    hahmo: 'Mina ja Theo',
    tiedosto: 'lontoo-mina-theo-round2-r20260905-v1.jpg',
    tila: 'tarkistettu',
    /*
     * EI VIELÄ KORTILLE (Opus 7.9.2026): kuva on omistajan hyväksymä,
     * mutta Lontoon tarinakaaren kohtaamisessa puhuu muotialan opiskelija
     * Leila, ei kaksi arkkitehtiopiskelijaa. Kortilla näkyisi eri ihminen
     * kuin se, joka kysymyksen esittää, ja tests/kohtaamiskuvat.test.mjs
     * kaataisi kytkennän. Kuva jää galleriaan, kunnes Fable päättää,
     * kirjoitetaanko kaari Minalle ja Theolle vai tilataanko Leilan kuva.
     */
    aktiivinen: false,
    alt: 'Mina ja Theo pysähtyvät rinnakkain St Helen’s Squarella. Lasijulkisivusta heijastuva aurinko osuu kasvoihin: Mina näyttää tyrmistyneeltä, Theo arvioi matkaajaa pidätellen hymyä.',
    lyhyt: 'Mina ja Theo pysähtyvät St Helen’s Squarella; Mina tyrmistyy, Theo arvioi hymyä pidätellen.',
    kuvateksti: 'Mina ja Theo pysähtyvät rinnakkain St Helen’s Squarella. Lasijulkisivusta heijastuva aurinko osuu kasvoihin: Mina näyttää tyrmistyneeltä, Theo arvioi matkaajaa pidätellen hymyä.',
    hetki: 'Molemmat ovat pysähtyneet keskelle aukiota; Minalla on rullalle kääritty piirustus kädessä ja Theon kädet ovat takin taskuissa.',
    vihje: 'Teräsristikko, lasiseinä ja ohi kiiruhtavat kulkijat kertovat Cityn aukiosta; kylttejä, katunimiä tai vastausta ei näytetä.',
  },
  {
    id: 'varsova-zofia-round2-r20260905-v1',
    kaupunki: 'Varsova',
    maa: 'Puola',
    hahmo: 'Zofia',
    tiedosto: 'varsova-zofia-round2-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Zofia vetää raskaan tilikirjan tiskille ja pysähtyy kuullessaan matkaajan kysymyksen. Hänen terävä katseensa jää epäuskon ja pidätetyn huvittuneisuuden välille.',
    lyhyt: 'Zofia pysähtyy tilikirjan äärellä kuullessaan matkaajan kysymyksen, katse epäuskoinen.',
    kuvateksti: 'Zofia vetää raskaan tilikirjan tiskille ja pysähtyy kuullessaan matkaajan kysymyksen. Hänen terävä katseensa jää epäuskon ja pidätetyn huvittuneisuuden välille.',
    hetki: 'Toinen käsi lepää tummanvihreän tilikirjan kannella, toinen nostaa käärepaperin kulmaa, ja punainen kissa seuraa liikettä tiskin päästä.',
    vihje: 'Antikvariaatin hyllyt, käärepaperinippu ja ikkunan viileä valo kertovat puodista; kirjojen nimiä tai eränumeroa ei näytetä.',
  },
  {
    id: 'lissabon-ines-round2-r20260905-v1',
    kaupunki: 'Lissabon',
    maa: 'Portugali',
    hahmo: 'Inês',
    tiedosto: 'lissabon-ines-round2-r20260905-v1.jpg',
    tila: 'tarkistettu',
    alt: 'Inês nostaa kuivaustelineestä sinivalkoista laattaa. Ikkunasta siivilöityvä aurinko osuu hänen kasvoihinsa, kun hän katsoo matkaajaa lämpimän epäuskoisesti.',
    lyhyt: 'Inês nostaa sinivalkoista laattaa telineestä ja katsoo matkaajaa lämpimän epäuskoisesti.',
    kuvateksti: 'Inês nostaa kuivaustelineestä sinivalkoista laattaa. Ikkunasta siivilöityvä aurinko osuu hänen kasvoihinsa, kun hän katsoo matkaajaa lämpimän epäuskoisesti.',
    hetki: 'Inês on polvillaan telineen vieressä ja työntää laattaa hyllylle molemmin käsin, kun lehtien varjot kirjovat lattian ja käsivarren.',
    vihje: 'Sinivalkoinen azulejo-laatta ja pajan uuni kertovat Lissabonin laattaperinteestä; laatan kuvion merkitystä tai vastausta ei selitetä.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 12.9.2026 13:57 UTC (posti/kuvatoimitus-
   * kohtaamiset-4-20260912.json, haara claude/postilaatikko): neljä
   * root-QA:n hyväksymää uusintaa. Jokaisen tiedoston sha256 on
   * tarkistettu latauksessa toimitusta vastaan, ja kaikki neljä
   * osoitetta vastasivat HTTP 200. Tiedostot ovat ämpärin
   * päiväkansiossa `20260912/` (juuripolku palauttaa 404), joten
   * riveillä on `kansio`-kenttä.
   *
   * TOIMITUS PUHUU UUSINNOISTA, MUTTA TÄSSÄ KATALOGISSA EI OLLUT
   * YHTÄÄN RIVIÄ NÄILLE NELJÄLLE KAUPUNGILLE — toimituksen
   * `supersedes`-tunnukset (…-r20260907-v1) ovat arviointisivun
   * versioita, eivät pelin kuvia. Mitään ei siis pudotettu kortilta
   * eikä arkistoitu: nämä ovat kaupunkiensa ensimmäiset rivit.
   *
   * KAIKKI NELJÄ OVAT NYT PELISSÄ (12.9.2026). Kolme näistä odotti
   * ensin galleriassa, koska kuvan henkilö ei ollut kaaren henkilö.
   * Omistaja ratkaisi sen samana päivänä kysymyskortissa: *"Vaihda
   * kaanoniin uudet henkilöt."* Kaari nimeää nyt Oslossa maisemakuvaaja
   * Livin, Pietarissa sellisti Polinan ja Sarajevossa kupariseppä
   * Adnanin (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten kortilla
   * on sama ihminen, joka kysymyksen esittää — se oli koko ajan ainoa
   * este.
   */
  {
    id: 'granada-ines-e4ab59a7e815',
    kaupunki: 'Granada',
    maa: 'Espanja',
    hahmo: 'Inés',
    kansio: '20260912',
    tiedosto: 'granada-ines-e4ab59a7e815.jpg',
    tila: 'tarkistettu',
    alt: 'Inés pysähtyy puutarhakärryn äärelle ja arvioi aarrekysymystä tuiman epäilevästi. Leikatut oksat ovat vielä kärryssä, ja Generalifen kanava-allas suihkuineen jatkuu hänen takanaan.',
    lyhyt: 'Inés pysähtyy puutarhakärryn äärelle ja arvioi aarrekysymystä tuiman epäilevästi.',
    kuvateksti: 'Inés pysähtyy puutarhakärryn äärelle ja arvioi aarrekysymystä tuiman epäilevästi. Leikatut oksat ovat vielä kärryssä, ja Generalifen kanava-allas suihkuineen jatkuu hänen takanaan.',
    hetki: 'Käsivarsi lepää kärryn laidalla ja työ on kesken: oksat odottavat kärryssä, kun katse kääntyy suoraan tulijaan.',
    vihje: 'Generalifen kanava-allas, leikatut pensasaidat ja rinteen linnoitus kertovat Granadasta; linnoituksen nimen merkitystä ei paljasteta kuvassa.',
  },
  {
    id: 'oslo-liv-992a171d5df6',
    kaupunki: 'Oslo',
    maa: 'Norja',
    hahmo: 'Liv',
    kansio: '20260912',
    tiedosto: 'oslo-liv-992a171d5df6.jpg',
    // PELIIN 12.9.2026: kaari nimeää Oslossa maisemakuvaaja Livin.
    tila: 'tarkistettu',
    /*
     * REMMI ON KOIRAN TALUTUSHIHNA, EI KAMERAN HIHNA (kuvaputken
     * havainto ja toimituksen `osloAlignment`). Kuvassa ne ovat eri
     * esineitä: kamera roikkuu omassa olkahihnassaan rinnalla, ja
     * vasemmasta kädestä lähtevä musta hihna johtaa kalliolla seisovan
     * terrierin pantaan. Kuvateksti sanoo sen nyt niin kuin se näkyy,
     * eikä kaanoniin tarvittu mitään: koira ja hihna ovat uutta
     * rekvisiittaa, eivät lupausta, sukua tai perillistä. Kaaren oma
     * kohtaamisrepliikki mainitsee nyt saman koiran ja saman hihnan.
     */
    alt: 'Liv pysähtyy aurinkoiselle polulle ja katsoo matkaajaa suoraan. Toisessa kädessä on koiran talutushihna, rinnalla omassa olkahihnassaan roikkuva kamera, ja alhaalla avautuu vuono kaupungin edessä.',
    lyhyt: 'Liv pysähtyy aurinkoiselle polulle ja katsoo matkaajaa suoraan.',
    kuvateksti: 'Liv pysähtyy aurinkoiselle polulle ja katsoo matkaajaa suoraan. Toisessa kädessä on koiran talutushihna, rinnalla omassa olkahihnassaan roikkuva kamera, ja alhaalla avautuu vuono kaupungin edessä.',
    hetki: 'Hihna kulkee kädestä kalliolla seisovan koiran pantaan, ja koira kääntyy katsomaan ylös samalla kun kävely katkeaa kysymykseen.',
    vihje: 'Vuonon takaa näkyvä kaupunki ja kallioinen metsäpolku kertovat Oslosta; kaaren peltoa ja kumpua ei näytetä kuvassa.',
  },
  {
    id: 'pietari-polina-6188e4c488db',
    kaupunki: 'Pietari',
    maa: 'Venäjä',
    hahmo: 'Polina',
    kansio: '20260912',
    tiedosto: 'pietari-polina-6188e4c488db.jpg',
    // PELIIN 12.9.2026: kaari nimeää Pietarissa sellisti Polinan.
    tila: 'tarkistettu',
    alt: 'Polina kohtaa matkaajan katseen Vitebskin asemalla. Sellokotelo on yhä olalla ja toinen käsi nousee kysyvästi, kun aarrekysymys pysäyttää hänet kesken matkan.',
    lyhyt: 'Polina kohtaa matkaajan katseen Vitebskin asemalla.',
    kuvateksti: 'Polina kohtaa matkaajan katseen Vitebskin asemalla. Sellokotelo on yhä olalla ja toinen käsi nousee kysyvästi, kun aarrekysymys pysäyttää hänet kesken matkan.',
    hetki: 'Hän seisoo keskellä ruutulattiaa kotelon hihna nyrkissä, ja muut matkustajat jatkavat portaita ylös hänen takanaan.',
    vihje: 'Aseman jugendsali, lasimaalaukset ja matkalaukut kertovat Pietarista; kaaren nostosiltaa ja yötä ei näy kuvassa.',
  },
  {
    id: 'sarajevo-adnan-8d19fb11c377',
    kaupunki: 'Sarajevo',
    maa: 'Bosnia ja Hertsegovina',
    hahmo: 'Adnan',
    kansio: '20260912',
    tiedosto: 'sarajevo-adnan-8d19fb11c377.jpg',
    /*
     * PELIIN 12.9.2026. Ammatti, paja ja kuja vastasivat kaarta jo
     * valmiiksi kohta kohdalta; vain nimi erosi, eikä nimi näy kuvassa.
     * Omistajan päätöksellä kaaren kupariseppä on nyt Adnan.
     */
    tila: 'tarkistettu',
    alt: 'Adnan keskeyttää työnsä ja arvioi aarteen kysyjää tuiman epäilevästi. Vastatakottu kuparikannu on yhä pöydällä ja pitkä työkalu kädessä, kun katse nousee kujalle.',
    lyhyt: 'Adnan keskeyttää työnsä ja arvioi aarteen kysyjää tuiman epäilevästi.',
    kuvateksti: 'Adnan keskeyttää työnsä ja arvioi aarteen kysyjää tuiman epäilevästi. Vastatakottu kuparikannu on yhä pöydällä ja pitkä työkalu kädessä, kun katse nousee kujalle.',
    hetki: 'Kuparia täynnä oleva hylly jää hämärään, ja päivänvalo tulee kujan suunnasta suoraan työpöydälle kesken taonnan.',
    vihje: 'Kuparipaja, nahkaesiliina ja mukulakivikuja kertovat Sarajevosta; kaivon tarinaa ei näytetä kuvassa.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 12.9.2026 16:57 UTC: root-QA:ssa hyväksytty
   * Marios on Nikosian ensimmäinen kohtaamiskuva. Kaaren henkilö on jo
   * seripainotaiteilija Marios (js/tyohuone-kehitys-data.js), joten kuva
   * voidaan ottaa katalogiin ja galleriaan ilman tarinamuutosta. Pelikortti
   * odottaa vielä Fablelta kaaren aktivointia: Nikosian `luennat: false`
   * suodattaa sen nykyisestä TARINAKAARI-taulusta. Toimitettu media
   * tarkistettiin takaisin R2:sta: sha256, MIME, CORS, mitat ja täysi
   * JPEG-purku täsmäävät toimituspakettiin.
   */
  {
    id: 'nikosia-marios-4ce1cb371ba3',
    kaupunki: 'Nikosia',
    maa: 'Kypros',
    hahmo: 'Marios',
    kansio: '20260912',
    tiedosto: 'nikosia-marios-4ce1cb371ba3.jpg',
    tila: 'tarkistettu',
    alt: 'Marios pysäyttää seripainotyönsä ja arvioi aarteen kysyjää suoraan Nikosian käsityöpihalla. Molemmat kädet lepäävät painokehyksen reunoilla.',
    lyhyt: 'Marios pysäyttää painotyönsä ja arvioi aarteen kysyjää Nikosian käsityöpihalla.',
    kuvateksti: 'Marios pysäyttää painotyönsä ja arvioi aarteen kysyjää Nikosian käsityöpihalla.',
    hetki: 'Molemmat kädet ovat jääneet painokehyksen reunoille, kun Marios nostaa katseensa keskeneräisestä koevedoksesta.',
    vihje: 'Seripainokehys, lasta ja vaatimaton käsityöpiha kertovat Mariosin työstä; muurikehää tai bastionien lukumäärää ei näytetä.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 12.9.2026: root katsoi ja hyväksyi Frejan
   * Kööpenhaminan kaaren kohtaamiskuvaksi. Media on luettu takaisin
   * R2:sta: SHA-256, MIME, CORS, mitat, sRGB ja täysi JPEG-purku täsmäävät.
   */
  {
    id: 'kobenhavn-freja-07d795379e80',
    kaupunki: 'Kööpenhamina',
    kohde: 'kobenhavn',
    maa: 'Tanska',
    hahmo: 'Freja',
    kansio: '20260912',
    tiedosto: 'kobenhavn-freja-07d795379e80.jpg',
    tila: 'tarkistettu',
    alt: 'Freja sulkee Tivolin musiikkikarusellia ja pysähtyy kuuntelemaan matkaajan aarrekysymystä. Avain on portin lukossa ja viimeiset vieraat poistuvat karusellista.',
    lyhyt: 'Freja pysähtyy kesken Tivolin musiikkikarusellin sulkemisen.',
    kuvateksti: 'Freja sulkee Tivolin musiikkikarusellia ja pysähtyy kuuntelemaan matkaajan aarrekysymystä.',
    hetki: 'Avain on yhä portin lukossa, kun Freja kääntyy matkaajan puoleen ja viimeiset vieraat poistuvat karusellista.',
    vihje: 'Musiikkikaruselli, portti ja sulkemishetki vastaavat Kööpenhaminan Tivoliin sijoittuvaa kohtaamista paljastamatta kysymyksen vastausta.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 22.9.2026: erä C1 palvelee tavallisten visojen
   * KOHTAAMISET-hahmoja. `kaytto: 'tavallinen'` erottaa nämä kuvat saman
   * kaupungin tarinakaaren henkilöstä (Rooman Enzo, Helsingin ja Istanbulin
   * kaarihahmot), jotta ensimmäinen aarrekohtaaminen ei vaihda henkilöä.
   */
  {
    id: 'rooma-fabrizio-c1',
    kaupunki: 'Rooma',
    kohde: 'rooma',
    maa: 'Italia',
    hahmo: 'Fabrizio',
    kansio: '20260922',
    tiedosto: 'kasvo-rooma-fabrizio.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Mopokorjaaja Fabrizio keskeyttää vanhan skootterin huollon roomalaisen kivimuurin työpajasyvennyksessä ja katsoo suoraan pelaajaan.',
    lyhyt: 'Fabrizio nostaa katseensa kesken vanhan skootterin huollon.',
    kuvateksti: 'Fabrizio keskeyttää vanhan skootterin huollon roomalaisen kivimuurin työpajasyvennyksessä ja arvioi yllättävää kysyjää huvittuneena.',
    hetki: 'Toinen käsi jää skootterin rungolle ja rengasrauta osoittaa alas, kun Fabrizio nostaa katseensa työstä.',
    vihje: 'Nykyinen korjaustyö ja vuosisatoja vanhan muurin rosoinen korjauskohta muodostavat kaksi aikakerrosta paljastamatta aarteen paikkaa.',
  },
  {
    id: 'helsinki-saana-c1',
    kaupunki: 'Helsinki',
    kohde: 'helsinki',
    maa: 'Suomi',
    hahmo: 'Saana',
    kansio: '20260922',
    tiedosto: 'kasvo-helsinki-saana.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Telakkahitsaaja Saana seisoo visiiri nostettuna jäänmurtajan rungon vierellä, hitsauspoltin alaspäin ja katse suoraan pelaajassa.',
    lyhyt: 'Saana nostaa katseensa telakkatyöstä visiiri ylhäällä.',
    kuvateksti: 'Saana on juuri lopettanut hitsaussauman Hietalahden telakalla. Visiiri ylhäällä hän tunnistaa pelaajan kysymyksessä jotakin tuttua.',
    hetki: 'Sammutettu poltin riippuu turvallisesti alaspäin ja toinen käsi nojaa kylmään kaiteeseen keskeytyneen työhetken ajan.',
    vihje: 'Moderni laivanrunko ja yhä käytössä oleva patinoitunut kiinnityspollari yhdistävät telakan nykyhetken sen pitkään historiaan.',
  },
  {
    id: 'istanbul-kemal-c1',
    kaupunki: 'Istanbul',
    kohde: 'istanbul',
    maa: 'Turkki',
    hahmo: 'Kemal',
    kansio: '20260922',
    tiedosto: 'kasvo-istanbul-kemal.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Raitiovaunuseppä Kemal pysähtyy kesken puupenkin lakkaamisen ja katsoo suoraan pelaajaan Istanbulin Tünelin lähellä.',
    lyhyt: 'Kemal pysähtyy kesken raitiovaunupenkin lakkaamisen.',
    kuvateksti: 'Kemalin sivellin jää raitiovaunupenkin puunsyylle, kun hän kääntyy arvioimaan aarrekysymystä suoraan ja hieman huvittuneena.',
    hetki: 'Sivellin koskettaa yhä puuta ja toinen käsi tukee penkkiä, vaikka huomio on jo kokonaan pelaajassa.',
    vihje: 'Vanhat messinki- ja puuosat sekä oviaukon ohi kulkeva nykyinen punainen raitiovaunu yhdistävät kaksi aikakerrosta.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 22.9.2026: erä C2 jatkaa tavallisten visojen
   * KOHTAAMISET-hahmoja. Kaupunkien mahdolliset tarinakaaren henkilöt ja
   * kuvat säilyvät erillään `kaytto: 'tavallinen'` -rajauksella.
   */
  {
    id: 'ateena-iason-c2',
    kaupunki: 'Ateena',
    kohde: 'ateena',
    maa: 'Kreikka',
    hahmo: 'Iason',
    kansio: '20260922',
    tiedosto: 'kasvo-ateena-iason.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Juoksuvalmentaja Iason katsoo suoraan pelaajaan sekuntikello kädessään Panathinaikoksen stadionin marmoriportailla.',
    lyhyt: 'Iason pysäyttää sekuntikellon Kallimarmaron portailla.',
    kuvateksti: 'Iason ehti pysäyttää sekuntikellon, kun pelaajan kysymys tavoitti hänet Kallimarmaron marmoriportailla.',
    hetki: 'Valmentaja jää istumaan portaalle sekuntikello kädessään ja kääntää uteliaan, hieman huvittuneen katseensa suoraan pelaajaan.',
    vihje: 'Nykyinen ajanotto ja urheiluvarusteet kohtaavat vanhan stadionin kuluneet marmoriportaat paljastamatta aarteen sijaintia.',
  },
  {
    id: 'firenze-ilaria-c2',
    kaupunki: 'Firenze',
    kohde: 'firenze',
    maa: 'Italia',
    hahmo: 'Ilaria',
    kansio: '20260922',
    tiedosto: 'kasvo-firenze-ilaria.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Kultaseppä Ilaria katsoo suoraan pelaajaan pihdit kädessään Ponte Vecchion vanhassa puuverstaassa.',
    lyhyt: 'Ilaria keskeyttää kultalangan työstämisen Arnon yllä.',
    kuvateksti: 'Ilaria nosti kullan pois liekiltä juuri ennen kuin pelaaja puhui. Arnon valo osuu vanhaan puuverstaaseen.',
    hetki: 'Pihdit jäävät työpöydän ylle, kun Ilaria kääntyy pelaajaan päin uteliaan ja puoliksi huvittuneen näköisenä.',
    vihje: 'Nykyaikaiset työvälineet ja vuosisatoja vanhan puukojun ikkunaluukku muodostavat kaksi aikakerrosta ilman aarrevihjettä.',
  },
  {
    id: 'kobenhavn-sofie-c2',
    kaupunki: 'Kööpenhamina',
    kohde: 'kobenhavn',
    maa: 'Tanska',
    hahmo: 'Sofie',
    kansio: '20260922',
    tiedosto: 'kasvo-kobenhavn-sofie.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Pyörämekaanikko Sofie katsoo suoraan pelaajaan jakoavain lastipyörän etuakselilla Christianshavnin kanavan korjaamolla.',
    lyhyt: 'Sofie keskeyttää lastipyörän etuakselin kiristämisen.',
    kuvateksti: 'Sofie jätti jakoavaimen hetkeksi lastipyörän etuakselille ja kohotti katseensa pelaajaan.',
    hetki: 'Rasvaiset kädet jäävät pyörän etuakselille, kun yllättyneen huvittunut puolihymy kääntyy kohti pelaajaa.',
    vihje: 'Nykyinen lastipyörä ja työpajan vanha korkeapyöräkuva yhdistävät kaksi aikakerrosta paljastamatta aarteen paikkaa.',
  },
  /*
   * KUVAPUTKEN TOIMITUS 22.9.2026: erä C3 jatkaa tavallisten visojen
   * KOHTAAMISET-hahmoja. Kuvat on tarkistettu ja toimitettu R2:een.
   */
  {
    id: 'bukarest-radu-c3',
    kaupunki: 'Bukarest',
    kohde: 'bukarest',
    maa: 'Romania',
    hahmo: 'Radu',
    kansio: '20260922',
    tiedosto: 'kasvo-bukarest-radu.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Radu katsoo kameraan vanha viulu sylissään Bukarestin Ateneumin portailla iltahämärässä.',
    lyhyt: 'Radu laskee viulunsa polvelle Ateneumin portailla.',
    kuvateksti: 'Radu laski kuluneen viulunsa polvelle, kun pelaaja pysähtyi Ateneumin portaille. Illan lämmin ikkunavalo ja viileä katulyhty kohtaavat hänen yllättyneen uteliaassa katseessaan.',
    hetki: 'Jousi jää käteen ja kulunut viulu polvelle, kun Radu arvioi pelaajaa suoraan ja hieman huvittuneena.',
    vihje: 'Vanha soitin ja nykyinen kaupunki-ilta muodostavat kaksi aikakerrosta paljastamatta aarteen sijaintia.',
  },
  {
    id: 'oslo-halvor-c3',
    kaupunki: 'Oslo',
    kohde: 'oslo',
    maa: 'Norja',
    hahmo: 'Halvor',
    kansio: '20260922',
    tiedosto: 'kasvo-oslo-halvor.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Halvor katsoo kameraan lyijykirjain sormissaan Oslon kohopainossa.',
    lyhyt: 'Halvor pysäyttää lyijykirjaimen valoon painokoneen äärellä.',
    kuvateksti: 'Halvor pysäytti lyijykirjaimen valoon ja käänsi katseensa pelaajaan. Lämpimän työpajan musteiset kädet ja vanha painokone erottuvat harmaata Oslon katua vasten.',
    hetki: 'Musteiset sormet pitävät yhä kirjaketta, vaikka huomio on siirtynyt kokonaan pelaajaan.',
    vihje: 'Vanha painokone ja nykyisen kadun näkymä yhdistävät työpajan aikakerrokset ilman aarrevihjettä.',
  },
  {
    id: 'tampere-aatu-c3',
    kaupunki: 'Tampere',
    kohde: 'tampere',
    maa: 'Suomi',
    hahmo: 'Aatu',
    kansio: '20260922',
    tiedosto: 'kasvo-tampere-aatu.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Aatu katsoo kameraan käsi avoimen junan oven kahvalla Tampereen asemalaiturilla.',
    lyhyt: 'Aatu pitää junan oven auki ja kääntyy pelaajan puoleen.',
    kuvateksti: 'Aatu piti junan oven auki ja ehti kääntyä pelaajan puoleen. Tampereen aseman vanha kello jäi taustalle samalla kun lähtöä odottava työ jatkui hänen kädessään.',
    hetki: 'Käsi jää ovenkahvalle ja lähtöhetki kesken, kun Aatu kohtaa pelaajan katseen.',
    vihje: 'Nykyinen junakalusto ja vanha asemaympäristö muodostavat kaksi aikakerrosta paljastamatta aarteen paikkaa.',
  },
  {
    id: 'dublin-niamh-c3',
    kaupunki: 'Dublin',
    kohde: 'dublin',
    maa: 'Irlanti',
    hahmo: 'Niamh',
    kansio: '20260922',
    tiedosto: 'kasvo-dublin-niamh.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Niamh katsoo kameraan noustessaan Dublinin katukaivannosta ruosteinen valurautaputki kädessään.',
    lyhyt: 'Niamh nousee sateisesta kaivannosta vanha putki kädessään.',
    kuvateksti: 'Niamh nousi sateen kostuttamasta kaivannosta vanha valurautaputki kädessään. Modernit mittavälineet jäivät kadun reunalle, kun hänen utelias katseensa osui pelaajaan.',
    hetki: 'Mutainen työ keskeytyy putki käsissä, kun Niamh nostaa katseensa suoraan pelaajaan.',
    vihje: 'Vanha valurautaputki ja nykyiset mittalaitteet tuovat samaan kuvaan kaksi aikakerrosta.',
  },
  {
    id: 'granada-pastora-c3',
    kaupunki: 'Granada',
    kohde: 'granada',
    maa: 'Espanja',
    hahmo: 'Pastora',
    kansio: '20260922',
    tiedosto: 'kasvo-granada-pastora.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Pastora katsoo kameraan luuta käsissään Sacromonten valkoiseksi kalkitun luolatalon kynnyksellä.',
    lyhyt: 'Pastora pysäyttää luutansa Sacromonten kynnykselle.',
    kuvateksti: 'Pastora pysäytti luutansa Sacromonten luolakodin kynnykselle ja mittasi tulijaa katseellaan. Vanha kitara, nykyinen puhelin ja kaukainen Alhambra jäivät iltapäivän valoon.',
    hetki: 'Luutiminen jää kesken, kun Pastora puntaroi pelaajan kysymystä tuimasti mutta hieman huvittuneena.',
    vihje: 'Vanha kitara ja nykyinen puhelin yhdistävät kaksi aikakerrosta paljastamatta aarteen sijaintia.',
  },
  {
    id: 'pietari-larisa-c3',
    kaupunki: 'Pietari',
    kohde: 'pietari',
    maa: 'Venäjä',
    hahmo: 'Larisa',
    kansio: '20260922',
    tiedosto: 'kasvo-pietari-larisa.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Larisa katsoo kameraan käsi mullassa ruusupenkissä Katariina II:n muistomerkin ja Aleksandrinski-teatterin edessä.',
    lyhyt: 'Larisa nostaa katseensa ruusupenkistä pelaajaan.',
    kuvateksti: 'Larisan toinen käsi jäi ruusupenkin multaan, kun hän nosti katseensa pelaajaan. Moderni taimilaatikko ja kastelukannu asettuvat Katariina II:n muistomerkin ja teatterin eteen.',
    hetki: 'Puutarhatyö pysähtyy kesken, mutta mullassa oleva käsi pitää tilanteen aidosti kiinni tekemisessä.',
    vihje: 'Nykyiset taimitarvikkeet ja historiallinen aukio muodostavat kaksi aikakerrosta ilman aarrevihjettä.',
  },
  {
    id: 'tallinna-miina-c4',
    kaupunki: 'Tallinna',
    kohde: 'tallinna',
    maa: 'Viro',
    hahmo: 'Miina',
    kansio: '20260922',
    tiedosto: 'kasvo-tallinna-miina.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Miina katsoo kameraan sytyttäessään kaasulyhtyä Tallinnan vanhankaupungin kujalla.',
    lyhyt: 'Miina pysähtyy kesken kaasulyhdyn sytyttämisen ja kohtaa pelaajan katseen.',
    kuvateksti: 'Miina piti tulta yhä kaasulyhdyn kuvun alla, kun pelaaja ilmestyi kujalle. Katseessa häivähtää yllätys, mutta käsi jatkaa tarkkaa työtä.',
    hetki: 'Liekki, tikapuut ja sytytyssauva jäävät työasentoon sinisen iltahämärän keskellä.',
    vihje: 'Huollettu kaasulyhty ja vanhat hansatalot muodostavat kaksi aikakerrosta paljastamatta vastausta.',
  },
  {
    id: 'vilna-aldona-c4',
    kaupunki: 'Vilna',
    kohde: 'vilna',
    maa: 'Liettua',
    hahmo: 'Aldona',
    kansio: '20260922',
    tiedosto: 'kasvo-vilna-aldona.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Aldona katsoo kameraan vaihtaessaan kirjan nahkakantta vilnalaisessa kirjansitomossa.',
    lyhyt: 'Aldona nostaa katseensa uuden nahkakannen sovittamisesta pelaajaan.',
    kuvateksti: 'Aldona oli juuri sovittamassa uutta nahkakantta kirjan ympärille, kun pelaajan kysymys keskeytti työn. Vanha prässi odottaa hänen takanaan.',
    hetki: 'Nahkakansi jää käsien väliin kesken tarkan sovituksen, ja työpöydän välineet pysyvät käytössä.',
    vihje: 'Perinteinen sidontaprässi ja nykyinen työvalo asettavat saman käsityön kahteen aikatasoon.',
  },
  {
    id: 'barcelona-pau-c4',
    kaupunki: 'Barcelona',
    kohde: 'barcelona',
    maa: 'Espanja',
    hahmo: 'Pau',
    kansio: '20260922',
    tiedosto: 'kasvo-barcelona-pau.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Pau katsoo kameraan kivipölyn leijuessa katedraalin julkisivun restaurointitelineillä.',
    lyhyt: 'Pau pysähtyy kivipiirustuksen ääreen ja katsoo pelaajaa suoraan.',
    kuvateksti: 'Pau puhalsi kivipölyn vanhan piirustusarkin päältä ja huomasi pelaajan. Työkalut jäivät valmiiksi seuraavaa lyöntiä varten.',
    hetki: 'Kivipöly leijuu ilmassa, toinen käsi nojaa piirustukseen ja keskeneräinen veistos täyttää työpisteen.',
    vihje: 'Vanha uusgoottilainen kivi ja nykyinen mittausvalo kertovat restauroinnin kahdesta ajasta.',
  },
  {
    id: 'praha-vera-c4',
    kaupunki: 'Praha',
    kohde: 'praha',
    maa: 'Tšekki',
    hahmo: 'Věra',
    kansio: '20260922',
    tiedosto: 'kasvo-praha-vera.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Věra katsoo kameraan käsi vanhan kellokoneiston käyntipyörän vivulla.',
    lyhyt: 'Věra pysäyttää käyntipyörän vivulla ja kääntyy pelaajan puoleen.',
    kuvateksti: 'Věra pysäytti suuren käyntipyörän juuri, kun pelaaja puhutteli häntä. Katse on suora, mutta käsi pysyy yhä vivulla.',
    hetki: 'Raskas vipu jää alas ja kellon rattaat pysähtyvät tornikammion päivänvaloon.',
    vihje: 'Vanha koneisto, tyhjä tarkastuslipuke ja huoltolamppu yhdistävät kellon historian nykyiseen hoitoon.',
  },
  {
    id: 'moskova-stepan-c4',
    kaupunki: 'Moskova',
    kohde: 'moskova',
    maa: 'Venäjä',
    hahmo: 'Stepan',
    kansio: '20260922',
    tiedosto: 'kasvo-moskova-stepan.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Stepan katsoo kameraan vanha taottu lukko käsissään lukkosepänkojussa.',
    lyhyt: 'Stepan nostaa vanhan lukon valoon ja huomaa pelaajan.',
    kuvateksti: 'Stepan nosti taotun lukon työvaloon nähdäkseen sen uurteet, mutta pelaajan kysymys sai hänet kohottamaan katseensa. Avain jäi yhä lukkoon.',
    hetki: 'Likaiset kädet kannattelevat raskasta lukkoa kesken tutkimisen työkalujen ja viilanpurun keskellä.',
    vihje: 'Kulunut lukkosepänkoju avautuu uudempaan lasikattoiseen kauppakäytävään, joten kaksi aikaa näkyy rinnakkain.',
  },
  {
    id: 'ljubljana-vesna-c4',
    kaupunki: 'Ljubljana',
    kohde: 'ljubljana',
    maa: 'Slovenia',
    hahmo: 'Vesna',
    kansio: '20260922',
    tiedosto: 'kasvo-ljubljana-vesna.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Vesna katsoo kameraan sitoessaan kukkakimppua Ljubljanan jokirannan torilla.',
    lyhyt: 'Vesna jättää kimpun solmun kesken ja mittaa pelaajaa katseellaan.',
    kuvateksti: 'Vesna oli sitomassa kukkakimppua toripöydällä, kun pelaaja pysähtyi hänen eteensä. Varrenpäät jäivät yhä tiukasti hänen käteensä.',
    hetki: 'Puoliksi sidottu kimppu nojaa ranteeseen ja leikkovälineet odottavat sinkkiämpärien vieressä.',
    vihje: 'Vanhat torivälineet ja nykyinen jokiranta muodostavat kaksi aikakerrosta ilman suoraa vastausvihjettä.',
  },
  {
    id: 'kosice-zuzana-c5',
    kaupunki: 'Košice',
    kohde: 'kosice',
    maa: 'Slovakia',
    hahmo: 'Zuzana',
    kansio: '20260922',
    tiedosto: 'kasvo-kosice-zuzana.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Zuzana katsoo kameraan sormet lennätinavaimella Košicen asemakonttorissa.',
    lyhyt: 'Zuzana kääntyy lennättimen ääreltä suoraan pelaajaan.',
    kuvateksti: 'Zuzanan sormet jäivät lennätinavaimelle, kun saapuvan junan höyry ja pelaajan kysymys tavoittivat hänet samalla hetkellä.',
    hetki: 'Messinkinen avain, puupöytä ja ikkunan takainen höyryjuna sitovat katkenneen liikkeen työpäivään.',
    vihje: 'Uusi rautatietekniikka toimii vanhan asemasisustuksen keskellä ja tuo kuvaan kaksi aikatasoa.',
  },
  {
    id: 'bergen-ingrid-c5',
    kaupunki: 'Bergen',
    kohde: 'bergen',
    maa: 'Norja',
    hahmo: 'Ingrid',
    kansio: '20260922',
    tiedosto: 'kasvo-bergen-ingrid.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Ingrid katsoo kameraan matkustajalista ja kynä käsissään sateisella Bergenin laiturilla.',
    lyhyt: 'Ingrid nostaa katseensa matkustajalistasta pelaajaan höyrylaivan vierellä.',
    kuvateksti: 'Ingrid suojasi matkustajalistaa sateelta ja piti kynää rivin kohdalla, kun pelaaja puhutteli häntä. Työasento ei ehtinyt vaihtua.',
    hetki: 'Lista, kynä ja märkä kivilaivanlaituri jäävät samaan pysähtyneeseen hetkeen höyrylaivan rinnalla.',
    vihje: 'Höyrymatka ja peritty satamarakenne tuovat kuvaan kaksi historiallista kerrosta paljastamatta vastausta.',
  },
  {
    id: 'edinburgh-fiona-c5',
    kaupunki: 'Edinburgh',
    kohde: 'edinburgh',
    maa: 'Skotlanti',
    hahmo: 'Fiona',
    kansio: '20260922',
    tiedosto: 'kasvo-edinburgh-fiona.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Fiona katsoo kameraan sivellin koholla Edinburghin vanhankaupungin rakennustyömaalla.',
    lyhyt: 'Fiona pysähtyy kesken siveltimenvedon ja haastaa pelaajan katseellaan.',
    kuvateksti: 'Fiona oli vetämässä viimeistä maalipintaa puukylttiin, kun pelaaja ilmestyi kujalle. Sivellin jäi ilmaan ja katse kääntyi suoraan tulijaan.',
    hetki: 'Koholla oleva sivellin, maaliroiskeinen esiliina ja matala porrasjakkara pitävät työliikkeen kesken.',
    vihje: 'Vanhan kujan purkutyöt ja uudet kiviperustukset näyttävät kaupungin muutoksen kahtena kerroksena.',
  },
  {
    id: 'krakova-tadeusz-c5',
    kaupunki: 'Krakova',
    kohde: 'krakova',
    maa: 'Puola',
    hahmo: 'Tadeusz',
    kansio: '20260922',
    tiedosto: 'kasvo-krakova-tadeusz.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Tadeusz katsoo kameraan tutkiessaan meripihkahelmiä Krakovan kauppahallissa.',
    lyhyt: 'Tadeusz nostaa katseensa valoon kääntämistään meripihkahelmistä.',
    kuvateksti: 'Tadeusz käänsi meripihkahelmiä valossa arvioidakseen niiden sävyä, kun pelaaja lähestyi tiskiä. Helmiketju jäi hänen sormiinsa.',
    hetki: 'Meripihkan lämmin hohde ja avoin tavaralaatikko pitävät kauppiaan kädet kesken arvioinnin.',
    vihje: 'Uudemmat uusgoottilaiset holvit ja vanhempi markkinaperinne muodostavat kaksi aikakerrosta.',
  },
  {
    id: 'varsova-wiktor-c5',
    kaupunki: 'Varsova',
    kohde: 'varsova',
    maa: 'Puola',
    hahmo: 'Wiktor',
    kansio: '20260922',
    tiedosto: 'kasvo-varsova-wiktor.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Wiktor katsoo kameraan käsi kaakaosäkissä varsovalaisessa suklaakaupassa.',
    lyhyt: 'Wiktor säpsähtää kaakaotyön keskeltä ja katsoo pelaajaa huvittuneena.',
    kuvateksti: 'Wiktorin käsi jäi kaakaoon ja otsalle nousi hieno pölypilvi, kun pelaaja kysyi vanhasta paikasta. Hämmästys vaihtuu jo hymyksi.',
    hetki: 'Avoin kaakaosäkki, jauheinen esiliina ja messinkivaaka jättävät valmistuksen näkyvästi kesken.',
    vihje: 'Vanha makeiskauppa jatkaa 1850-luvun perinnettä, mutta myöhempää löytöpaikkaa ei paljasteta kuvassa.',
  },
  {
    id: 'sarajevo-amra-c5',
    kaupunki: 'Sarajevo',
    kohde: 'sarajevo',
    maa: 'Bosnia ja Hertsegovina',
    hahmo: 'Amra',
    kansio: '20260922',
    tiedosto: 'kasvo-sarajevo-amra.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Amra katsoo kameraan nahkahihna jännityksessä sarajevolaisessa satulasepänpuodissa.',
    lyhyt: 'Amra pysäyttää ompeleen ja katsoo pelaajaa nahkahihna yhä kireällä.',
    kuvateksti: 'Amra veti paksun nahkahihnan kireälle satulan ympärille, kun pelaaja pysähtyi puodin ovelle. Neula jäi toiseen käteen.',
    hetki: 'Jännittynyt hihna, suuri neula ja puolivalmis satula tekevät keskeytyksestä fyysisen ja uskottavan.',
    vihje: 'Vanha ottomaaniajan puotirakenne ja uusi satulatyö näyttävät käsityöperinteen kahdessa ajassa.',
  },
  {
    id: 'tromssa-kirsten-c7',
    kaupunki: 'Tromssa',
    kohde: 'tromssa',
    maa: 'Norja',
    hahmo: 'Kirsten',
    kansio: '20260922',
    tiedosto: 'kasvo-tromssa-kirsten.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Kirsten katsoo kameraan kädet vanhojen urkujen koskettimilla Tromssan kirkossa.',
    lyhyt: 'Kirsten jättää soinnun kesken ja kääntyy pelaajan puoleen urkuparvelta.',
    kuvateksti: 'Kirstenin toinen käsi jäi koskettimille ja toinen rekisterivivulle, kun pelaajan kysymys kantautui urkuparvelle. Hymy on pidätelty mutta lämmin.',
    hetki: 'Koskettimet, rekisterit ja puoliksi kääntynyt työasento säilyttävät soittamisen juuri katkenneena.',
    vihje: 'Nykyinen työ vanhoilla 1860-luvun uruilla yhdistää kirkon kaksi aikaa ilman suoraa vastausvihjettä.',
  },
  {
    id: 'valletta-rita-c7',
    kaupunki: 'Valletta',
    kohde: 'valletta',
    maa: 'Malta',
    hahmo: 'Rita',
    kansio: '20260922',
    tiedosto: 'kasvo-valletta-rita.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Rita katsoo kameraan ojentaessaan pääsylippua vanhan oopperatalon lippuluukulta.',
    lyhyt: 'Rita pysähtyy kesken lipun ojentamisen ja hymyilee pelaajalle.',
    kuvateksti: 'Rita ojensi pääsylippua luukun yli, kun pelaajan kysymys pysäytti käden. Hän nojaa ikkunaan ja arvioi tulijaa lempeän huvittuneena.',
    hetki: 'Ojennettu lippu ja koholla pidetty luukku jättävät asiakaspalvelun liikkeen selvästi kesken.',
    vihje: 'Nykyinen lippuluukku ja vanhan oopperatalon kalkkikivi asettavat kohtaamisen kahteen aikatasoon.',
  },
  {
    id: 'sevilla-remedios-c6',
    kaupunki: 'Sevilla',
    kohde: 'sevilla',
    maa: 'Espanja',
    hahmo: 'Remedios',
    kansio: '20260922',
    tiedosto: 'kasvo-sevilla-remedios.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Remedios katsoo kameraan sivellin lautasen yllä sevillalaisessa keramiikkapajassa.',
    lyhyt: 'Remedios pysäyttää lautasen maalauksen ja nostaa katseensa pelaajaan.',
    kuvateksti: 'Remedios piti siveltimen kärkeä vielä sinivalkoisen lautasen yllä, kun pelaaja puhutteli häntä. Maalaus jäi näkyvästi kesken.',
    hetki: 'Koholla oleva sivellin, keskeneräinen lautanen ja värikuppi säilyttävät työliikkeen pysähtyneenä.',
    vihje: 'Vanha luostarihuone ja vuoden 1873 keramiikkatyö muodostavat kaksi aikakerrosta ilman suoraa vastausvihjettä.',
  },
  {
    id: 'bryssel-aline-c6',
    kaupunki: 'Bryssel',
    kohde: 'bryssel',
    maa: 'Belgia',
    hahmo: 'Aline',
    kansio: '20260922',
    tiedosto: 'kasvo-bryssel-aline.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Aline katsoo kameraan nuija ja taltta käsissään pörssitalon suljetulla rakennustelineellä.',
    lyhyt: 'Aline jättää nuijan ilmaan ja arvioi pelaajaa keskeneräisen veistoksen vierellä.',
    kuvateksti: 'Aline oli iskemässä talttaa kivikoristeeseen, kun pelaajan kysymys pysäytti nuijan. Hän pitää työkalut valmiina ja katsoo suoraan tulijaan.',
    hetki: 'Nuija jää koholle, taltta vasten kiveä ja vaalea pöly kiinni esiliinassa kesken rakennustyön.',
    vihje: 'Vuoden 1873 rakennustelineet ja vanhempi kiviveistoperinne yhdistyvät suljetussa työmaanäkymässä.',
  },
  {
    id: 'marseille-rosine-c6',
    kaupunki: 'Marseille',
    kohde: 'marseille',
    maa: 'Ranska',
    hahmo: 'Rosine',
    kansio: '20260922',
    tiedosto: 'kasvo-marseille-rosine.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Rosine katsoo kameraan hieno sivellin keskeneräisen santonihahmon yllä.',
    lyhyt: 'Rosine nostaa katseensa pienen savihahmon maalauksesta pelaajaan.',
    kuvateksti: 'Rosine oli lisäämässä hiuksenhienolla siveltimellä väriä pieneen santoniin, kun pelaaja pysähtyi työpöydän ääreen. Käsi jäi vakaaksi.',
    hetki: 'Sivellin, maalaamaton hahmo ja kymmenet keskeneräiset savityöt pitävät käsityön näkyvästi käynnissä.',
    vihje: 'Vanha työhuone ja uudet vuoden 1873 savihahmot näyttävät paikallisen käsityöperinteen kahtena aikana.',
  },
  {
    id: 'kiova-oksana-c6',
    kaupunki: 'Kiova',
    kohde: 'kiova',
    maa: 'Ukraina',
    hahmo: 'Oksana',
    kansio: '20260922',
    tiedosto: 'kasvo-kiova-oksana.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Oksana katsoo kameraan sormi ketjusillan renkaalla ja avoin vartijakirja vierellään.',
    lyhyt: 'Oksanan ketjun laskeminen katkeaa, kun pelaaja puhuttelee häntä sillalla.',
    kuvateksti: 'Oksana laski Nikolain ketjusillan raskaita renkaita sormi kerrallaan, kun pelaajan kysymys keskeytti tarkistuksen. Kirja jäi auki.',
    hetki: 'Sormi pysähtyy ketjun lenkille ja tyhjä vartijakirja odottaa kivisen sillankaiteen päällä.',
    vihje: 'Sillan vanha kivirakenne ja uudempi insinöörityö asettuvat samaan näkymään ilman vastausvihjettä.',
  },
  {
    id: 'luxemburg-nic-c6',
    kaupunki: 'Luxemburg',
    kohde: 'luxemburg',
    maa: 'Luxemburg',
    hahmo: 'Nic',
    kansio: '20260922',
    tiedosto: 'kasvo-luxemburg-nic.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Nic katsoo kameraan vasara ja taltta käsissään Luxemburgin linnoituksen purkukivellä.',
    lyhyt: 'Nic pysäyttää iskunsa linnoituksen purkukivellä ja kohtaa pelaajan katseen.',
    kuvateksti: 'Nic oli irrottamassa kiveä purettavasta linnoituksesta, kun pelaaja ilmestyi rinteelle. Vasara ja taltta jäivät iskuasentoon.',
    hetki: 'Raskas vasara lepää koholla ja taltta on kiinni vaaleassa purkukivessä syksyisen työmaan keskellä.',
    vihje: 'Vanha linnoitus ja vuoden 1873 purkutyö näyttävät kaupungin muuttumisen kahtena historiallisena kerroksena.',
  },
  {
    id: 'riika-valdis-c6',
    kaupunki: 'Riika',
    kohde: 'riika',
    maa: 'Latvia',
    hahmo: 'Valdis',
    kansio: '20260922',
    tiedosto: 'kasvo-riika-valdis.jpg',
    tila: 'tarkistettu',
    kaytto: 'tavallinen',
    alt: 'Valdis katsoo kameraan sillanlantit kämmenellään Riian vanhan ponttonisillan maksupaikalla.',
    lyhyt: 'Valdis keskeyttää siltamaksun laskemisen ja ojentaa lantteja pelaajalle.',
    kuvateksti: 'Valdis laski sillanlantteja avoimella kämmenellään, kun pelaajan kysymys pysäytti hänet. Maksulaatikko jäi suljettuna vierelle.',
    hetki: 'Lantit lepäävät kämmenellä ja toinen käsi pysyy kuluneen maksulaatikon kannella sateisella sillalla.',
    vihje: 'Vanha ponttonisilta ja etäinen rautatiesilta muodostavat kaksi aikakerrosta paljastamatta oikeaa vastausta.',
  },

];

/**
 * Kaupungin nimi pelin kaupunkitunnuksen muotoon: pienet kirjaimet,
 * ei tarkkeita eikä välimerkkejä. Sama muunnos kummallekin puolelle,
 * joten "Praha" ja "praha" osuvat toisiinsa ilman käsin tehtyä taulua.
 */
const kuvaAvain = (nimi) => String(nimi ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '');

/** Peliin kelpaavat kuvat kaupunkitunnuksen mukaan. */
export const KOHTAAMISKUVAT_KOHTEELLE = new Map(
  kohtaamiskuvat
    .filter((kuva) => kuva.tila === 'tarkistettu'
      && kuva.aktiivinen !== false && kuva.kaytto !== 'tavallinen')
    .map((kuva) => [kuvaAvain(kuva.kohde ?? kuva.kaupunki), kuva]),
);

/** Tavallisen visan KOHTAAMISET-hahmojen kuvat kaupunkitunnuksen mukaan. */
export const KOHTAAMISKUVAT_TAVALLISELLE = new Map(
  kohtaamiskuvat
    .filter((kuva) => kuva.tila === 'tarkistettu'
      && kuva.aktiivinen !== false && kuva.kaytto === 'tavallinen')
    .map((kuva) => [kuvaAvain(kuva.kohde ?? kuva.kaupunki), kuva]),
);

/**
 * Kuvan täysi osoite R2-ämpärissä.
 *
 * Vanhat erät ovat ämpärin juuressa (kohtaamiset/<tiedosto>), mutta
 * 12.9.2026 alkaen kuvaputki vie erän omaan päiväkansioonsa
 * (kohtaamiset/20260912/<tiedosto>). Kansio on siksi oma kenttänsä eikä
 * osa tiedostonimeä: näin encodeURIComponent ei koodaa kauttaviivaa
 * pois ja tiedostonimen vartija (tests/kohtaamiskuvat.test.mjs) pysyy
 * yhtä tiukkana kuin ennenkin.
 */
export const kohtaamiskuvaOsoite = (kuva) => [
  KOHTAAMIS_R2_JUURI,
  ...(kuva.kansio ? [encodeURIComponent(kuva.kansio)] : []),
  encodeURIComponent(kuva.tiedosto),
].join('/');

/**
 * Kaupungin kohtaamiskuva pelille, tai null jos tarkistettua kuvaa ei
 * ole. Palautuksessa on valmis osoite, jotta kutsuja ei rakenna
 * omaa polkuaan ämpäriin.
 *
 * @param {string} cityId pelin kaupunkitunnus (quiz.cityId)
 */
export function kohtaamiskuvaKohteelle(cityId) {
  const kuva = KOHTAAMISKUVAT_KOHTEELLE.get(kuvaAvain(cityId));
  return kuva ? { ...kuva, osoite: kohtaamiskuvaOsoite(kuva) } : null;
}

/** Tavallisen visan kohtaamiskuva, joka voi olla eri henkilö kuin tarinakaaressa. */
export function kohtaamiskuvaTavalliselleKohtaamiselle(cityId) {
  const kuva = KOHTAAMISKUVAT_TAVALLISELLE.get(kuvaAvain(cityId));
  return kuva ? { ...kuva, osoite: kohtaamiskuvaOsoite(kuva) } : null;
}
