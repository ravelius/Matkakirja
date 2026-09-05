/*
 * TYNKÄ — TOINEN AGENTTI KORVAA (5.9.2026).
 *
 * Tämä on ihmisen matka -linssin AINEISTOTIEDOSTO, ja se kirjoitetaan
 * rinnakkain moottorityön kanssa: kaaren 20 pysäkkiä (300 000 vuotta
 * sitten → n. 1300 jaa.), niiden tekstit, lähteet ja kuvat tulevat
 * sisältöagentilta. Tässä on vain KOLME pysäkkiä, jotta linssi
 * latautuu, testit ajavat ja ajon voi katsoa selaimessa ennen kuin
 * aineisto on valmis. Korvaa koko tiedosto — älä paikkaa tätä.
 *
 * ── RAJAPINTA, JOTA KORVAAJAN ON NOUDATETTAVA ─────────────────────
 *
 * Pysäkki (taulukko IHMISEN_MATKA, AIKAJÄRJESTYKSESSÄ vanhimmasta
 * uusimpaan; moottori järjestää silti itse `vuosiaSitten`-kentän
 * mukaan, joten järjestys on luettavuutta varten):
 *
 *   n             pysäkin numero 1…20 (luku)
 *   vuosiaSitten  LUKU, esim. 300000 tai 776. Tämä on kellon asteikko:
 *                 moottori interpoloi vuodet pysäkkien VÄLILLÄ
 *                 logaritmisesti (js/aikajana.js KELLON ASTEIKKO).
 *   ajoitus       NÄYTETTÄVÄ TEKSTI, esim. '300 000 vuotta sitten' tai
 *                 'n. 1250 jaa.' Tämä ladotaan kortin kelloriville,
 *                 lampun otsikkoon ja havainnekuvan alle — vuosilukua
 *                 ei näytetä missään muualla.
 *   otsikko       pysäkin nimi ('Sahulin ylitys')
 *   paikka        paikan nimi kellorivillä ja kortin alla
 *   lat, lon      asteet (moottori laskee laudan koordinaatit itse)
 *   alue          maanosa tai alue ('Afrikka', 'Sahul')
 *   loyto         mistä tiedetään: löytö, fossiili, ajoitus
 *   selite        1–2 virkettä paneeliin
 *   juttu         pidempi teksti (kappaleet '\n\n'-erotettuina)
 *   lahde         esim. 'en-Wikipedia "Omo remains"'
 *   kuva          HAVAINNEKUVA oikean laidan paneeliin:
 *                 { osoite, kuvateksti, selite, lahde }. `kuvateksti`
 *                 on kuvaputken oma teksti SANASTA SANAAN ('Jebel
 *                 Irhoud, noin 300 000 vuotta sitten') ja ladotaan
 *                 kuvan alle otsikkorivin alapuolelle; se sisältää jo
 *                 ajoituksen, joten otsikkorivi ei toista sitä.
 *                 Osoite on `<kuvajuuri>/<tunnus>.jpg` (kuvaputki
 *                 toimitti 20 kuvaa 5.9.2026, 1536 × 1024).
 *   esine         KORTIN kuva alarivin karusellissa (löytö, työkalu,
 *                 kallo): { osoite, selite, lahde }. Ilman tätä kortti
 *                 näyttää tyhjän kehyksen — se on sallittu tila.
 *
 * Lisäksi kolme vientiä:
 *
 *   IHMISEN_MATKA_ESITTELY  linssin lyhyt kuvaus (merkkijono) —
 *                           matkalaukun selite.
 *   IHMISEN_MATKA_ALOITUS   avausjakson laatikko { otsikko, teksti }.
 *   IHMISEN_MATKA_LOPPU     loppusanat { otsikko, teksti, kuva? }.
 *
 * Linssimoduuli (js/linssit/ihmisen-matka.js) lukee tämän
 * NIMIAVARUUTENA ja sietää puuttuvat viennit, joten keskeneräinen
 * aineisto ei kaada peliä.
 */

/**
 * Kuvaputken kuvien juuri ämpärissä (sama kuvio kuin keksinnöillä,
 * js/linssit/keksinnot.js KEKSINTO_KUVAJUURI): havainnekuvat juuressa
 * ja kortin esinekuvat alikansiossa `esine/`.
 */
export const IHMISEN_MATKA_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/aikajana/ihmisen-matka';

/** Matkalaukun selite (korvaajan hiottava). */
export const IHMISEN_MATKA_ESITTELY = 'Ihmisen matka Afrikasta koko maapallolle: '
  + '20 pysäkkiä 300 000 vuoden takaa viimeisille asuttamattomille saarille.';

/** Avausjakson laatikko (musta ruutu ja Käynnistä-nappi). */
export const IHMISEN_MATKA_ALOITUS = {
  otsikko: 'Ihmisen matka',
  teksti: 'Tulet seuraavaksi näkemään, miten yksi laji levisi yhdestä maanosasta '
    + 'koko maapallolle. Matka kesti satatuhatta sukupolvea, ja sen viimeiset '
    + 'askeleet otettiin vasta kun Euroopassa rakennettiin kivikirkkoja. '
    + 'Mikä ihmisen sai lähtemään aina seuraavan horisontin taakse?',
};

/** Loppusanat, kun kaikki valot palavat. */
export const IHMISEN_MATKA_LOPPU = {
  otsikko: 'Matka päättyy',
  teksti: 'Kartalla palavat nyt kaikki kaaren valot. Viimeiset saaret asutettiin '
    + 'vasta 1200-luvulla — samaan aikaan kun isoisän Euroopassa vietiin kiviä '
    + 'katedraalien holveihin.',
  kuva: null,
};

/** TYNKÄ: kolme pysäkkiä kahdestakymmenestä. */
export const IHMISEN_MATKA = [
  {
    n: 1,
    vuosiaSitten: 300000,
    ajoitus: '300 000 vuotta sitten',
    otsikko: 'Ensimmäiset ihmiset',
    paikka: 'Omo Kibish',
    lat: 5.4,
    lon: 36.1,
    alue: 'Afrikka',
    loyto: 'Omo I -kallo, ajoitettu tuhkakerroksesta',
    selite: 'Etiopian Omo-joen varrelta löytyneet kallot ovat vanhimpia '
      + 'tunnettuja nykyihmisen jäännöksiä.',
    juttu: 'Richard Leakeyn retkikunta löysi Omo-joen mutkasta 1967 kaksi '
      + 'kallon osaa. Vasta 2022 julkaistu tuhkakerrosten ajoitus siirsi ne '
      + 'yli 230 000 vuoden taakse, ja aiempi arvio venyi lähelle 300 000:ta.',
    lahde: 'en-Wikipedia "Omo remains"',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/omo-kibish.jpg`,
      kuvateksti: 'Omo Kibish, noin 300 000 vuotta sitten',
      selite: 'Aamuvalo Omo-joen mutkassa: pieni joukko ihmisiä nousee rannalta, ja heidän kasvonsa ovat jo meidän kasvomme.',
      lahde: 'Matkakirjan havainnekuva',
    },
    /*
     * ESINEKUVIA EI OLE VIELÄ (5.9.2026): kuvaputki toimitti 20
     * havainnekuvaa, kortin löytökuvat tulevat myöhemmin. Null on
     * sallittu tila — kortti näyttää tyhjän kehyksen, ei rikkinäistä
     * kuvaa. Kun kuvat saapuvat: { osoite, selite, lahde }.
     */
    esine: null,
  },
  {
    n: 2,
    vuosiaSitten: 50000,
    ajoitus: 'n. 50 000 vuotta sitten',
    otsikko: 'Sahulin ylitys',
    paikka: 'Madjedbebe',
    lat: -12.33,
    lon: 132.86,
    alue: 'Sahul',
    loyto: 'Kivityökaluja ja okrahiertimiä hiekkakerroksissa',
    selite: 'Ihminen ylitti avomeren Australiaan aikana, jolloin mannerta ei '
      + 'nähnyt lähtörannalta.',
    juttu: 'Madjedbeben kalliosuojan alimmat kerrokset ajoitettiin 2017 noin '
      + '65 000 vuoden taakse. Matka Sundan saarilta Sahuliin vaati vähintään '
      + 'sadan kilometrin merimatkan — vanhin todiste siitä, että ihminen '
      + 'purjehti näkemättä määränpäätään.',
    lahde: 'en-Wikipedia "Madjedbebe"',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/madjedbebe.jpg`,
      kuvateksti: 'Madjedbebe, noin 50 000 vuotta sitten',
      selite: 'Lautta irtoaa Sundan rannasta kohti näkymätöntä mannerta; airot ovat lyhyet ja meri leveä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    /*
     * ESINEKUVIA EI OLE VIELÄ (5.9.2026): kuvaputki toimitti 20
     * havainnekuvaa, kortin löytökuvat tulevat myöhemmin. Null on
     * sallittu tila — kortti näyttää tyhjän kehyksen, ei rikkinäistä
     * kuvaa. Kun kuvat saapuvat: { osoite, selite, lahde }.
     */
    esine: null,
  },
  {
    n: 3,
    vuosiaSitten: 776,
    ajoitus: 'n. 1250 jaa.',
    otsikko: 'Viimeinen suuri saari',
    paikka: 'Wairau Bar',
    lat: -41.51,
    lon: 174.05,
    alue: 'Aotearoa',
    loyto: 'Varhaisin asuinpaikka Etelänsaaren rannikolla',
    selite: 'Polynesialaiset purjehtijat saapuivat Aotearoaan viimeisenä '
      + 'suurena asuttamattomana maana.',
    juttu: 'Wairau Barin hautapaikat ja moa-luut ajoittavat ensimmäisen '
      + 'asutuksen 1200-luvulle. Se on ihmisen leviämisen viimeinen suuri '
      + 'askel: Tyynenmeren itäisimmät saaret oli asutettu vasta muutamaa '
      + 'sukupolvea aiemmin.',
    lahde: 'en-Wikipedia "Wairau Bar"',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/aotearoa.jpg`,
      kuvateksti: 'Wairau Bar, noin 1250 jaa.',
      selite: 'Kaksirunkoinen kanootti kääntyy Wairaun suistoon, ja rannalla on lunta vuorten yllä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    /*
     * ESINEKUVIA EI OLE VIELÄ (5.9.2026): kuvaputki toimitti 20
     * havainnekuvaa, kortin löytökuvat tulevat myöhemmin. Null on
     * sallittu tila — kortti näyttää tyhjän kehyksen, ei rikkinäistä
     * kuvaa. Kun kuvat saapuvat: { osoite, selite, lahde }.
     */
    esine: null,
  },
];
