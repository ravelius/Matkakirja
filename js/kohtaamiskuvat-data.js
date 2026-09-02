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
export const KOHTAAMIS_R2_JUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset';

export const kohtaamiskuvat = [
  {
    id: 'dublin-molly-kassa',
    kaupunki: 'Dublin',
    maa: 'Irlanti',
    hahmo: 'Molly',
    tiedosto: 'kasvo-dublin-molly-kassa.jpg',
    tila: 'arkisto',
    alt: 'Molly kurottaa nauraen vierivän omenan perään ruokakaupan kassalla.',
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
    alt: 'Lotte on puoliksi sadepisaroiden peittämässä autossa ja vetää laukkua takajalkatilasta.',
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
    alt: 'Inês nappaa liukuvan savilaatan kuivaustelineestä lissabonilaisessa keramiikkapajassa.',
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
    aktiivinen: false,
    alt: 'Nuori pyöräilijä pysähtyy kanavasillalle kesken Amsterdamin aamuruuhkan.',
    kuvateksti: 'Nuori pyöräilijä pysähtyy kanavasillalle kesken aamumatkan. Kypärä on yhä päässä ja pyörä käsissä, kun arvoitus tavoittaa hänet.',
    hetki: 'Liike katkeaa sillan keskelle, mutta toinen jalka ja molemmat kädet pitävät pyörän vakaana.',
    vihje: 'Kanava, silta ja arkinen pyöräliikenne sijoittavat kohtaamisen Amsterdamiin paljastamatta vastausta.',
  },
  {
    id: 'amsterdam-koysityontekija',
    kaupunki: 'Amsterdam',
    maa: 'Alankomaat',
    hahmo: 'Willem',
    tiedosto: 'kasvo-amsterdam-koysityontekija.jpg',
    tila: 'tarkistettu',
    alt: 'Willem keskeyttää köysityönsä Amsterdamin kanavan sinisessä iltavalossa.',
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
    alt: 'Astrid kurottaa vaunun reunaan maailmanpyörän korkeimmassa kohdassa Tukholmassa.',
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
    alt: 'Naamiontekijä Lucia lastaa sähkövenettä Venetsian kanavan laidalla.',
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
    kuvateksti: 'Rasa nousee kattoluukusta juuri, kun myrskypuuska tarttuu sadetakkiin. Toinen käsi jää tikkaalle ja toinen hakee tukea kivestä kaupungin pudotessa taakse.',
    hetki: 'Kiipeäminen pysähtyy katon reunalle, mutta tuuli, hiukset ja takki jatkavat liikettä hänen ympärillään.',
    vihje: 'Vilnan katot ja vartijan myrskyinen kierros luovat paikan paljastamatta rautaisen suden arvoitusta.',
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
    .filter((kuva) => kuva.tila === 'tarkistettu' && kuva.aktiivinen !== false)
    .map((kuva) => [kuvaAvain(kuva.kohde ?? kuva.kaupunki), kuva]),
);

/** Kuvan täysi osoite R2-ämpärissä. */
export const kohtaamiskuvaOsoite = (kuva) => `${KOHTAAMIS_R2_JUURI}/${encodeURIComponent(kuva.tiedosto)}`;

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
