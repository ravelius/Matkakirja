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
 * VAIN TILA 'tarkistettu' PÄÄTYY PELIIN: keskeneräinen kuva näkyy
 * galleriassa työtilana, mutta kohtaamiskortti jää ilman kuvaa
 * (kuvaton kortti piirtyy ennallaan).
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
    tila: 'tarkistettu',
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
    tila: 'tarkistettu',
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
    tila: 'tarkistettu',
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
    tila: 'tarkistettu',
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
    tila: 'tarkistettu',
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
    tila: 'tarkistettu',
    alt: 'Jadwiga vetää Veikselistä raskasta siivousverkkoa ja nauraa pelaajan kysymykselle.',
    kuvateksti: 'Jadwigan saapas jäi mutaan kesken jokisiivouksen. Kun pelaaja penäsi 150 vuotta vanhaa paikkaa, hän repesi nauruun mutta ei irrottanut otettaan verkosta.',
    hetki: 'Vartalo kaartuu lähes vaakasuoraan, märkä verkko kiristyy käsissä ja nykyinen siivousvene odottaa sumennetussa taustassa.',
    vihje: 'Veiksel ja verkkoon takertunut nimetön metallikoriste vihjaavat paikalliseen kuvastoon sanomatta vastausta ääneen.',
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
    .filter((kuva) => kuva.tila === 'tarkistettu')
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
