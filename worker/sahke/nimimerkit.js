/*
 * SÄHKEJÄRJESTELMÄ — nimimerkkien sanalistat.
 *
 * MIKSI VALKOLISTA: retkikunnassa näkyy toisen pelaajan valitsema nimi.
 * Jos nimi olisi vapaata tekstiä, moninpeli olisi samalla avoin
 * viestikanava tuntemattomien välillä — juuri se, mitä pelissä EI
 * haluta. Kun nimi kootaan kahdesta valkolistatusta sanasta, ruudulle
 * ei voi kirjoittaa mitään, mitä tässä tiedostossa ei jo lue.
 *
 * MUOTO on aina "Adjektiivi Substantiivi" (yksi välilyönti), esim.
 * "Utelias Ilves" tai "Höyryävä Majakka". Palvelin tarkistaa muodon ja
 * palauttaa nimen KANONISESSA kirjoitusasussa — asiakas ei voi
 * livauttaa läpi omaa kirjainkokoaan tai välimerkkejään.
 *
 * LISTA KOPIOIDAAN ASIAKKAALLE (js-puolen arpoja käyttää samaa
 * järjestystä). Kaksi sääntöä, jotta kopio pysyy kopiona:
 *   1. JÄRJESTYS ON VAKIO. Uusi sana lisätään aina listan LOPPUUN,
 *      ei väliin — asiakas voi tallentaa valinnan indeksinä.
 *   2. Sanaa ei poisteta eikä kirjoitusasua muuteta: vanhoja
 *      nimimerkkejä on tietokannassa, ja poistettu sana tekisi
 *      olemassa olevasta nimestä kelpaamattoman.
 *
 * Sanasto on 1873: höyry, purjeet, sekstantit ja pohjoisen eläimet.
 */

/** Adjektiivit (24). Järjestys on vakio — uusi sana vain loppuun. */
export const ADJEKTIIVIT = Object.freeze([
  'Utelias',
  'Höyryävä',
  'Rohkea',
  'Salaperäinen',
  'Vaitelias',
  'Sitkeä',
  'Nokinen',
  'Tarkkasilmäinen',
  'Kärsivällinen',
  'Vikkelä',
  'Tyyni',
  'Uljas',
  'Ovela',
  'Väsymätön',
  'Hajamielinen',
  'Ripeä',
  'Ponteva',
  'Verkkainen',
  'Peloton',
  'Juhlallinen',
  'Kohtelias',
  'Räiskyvä',
  'Vankka',
  'Iloinen',
]);

/** Substantiivit (24): eläimiä ja vuoden 1873 kapineita. */
export const SUBSTANTIIVIT = Object.freeze([
  'Ilves',
  'Majakka',
  'Kompassi',
  'Hylje',
  'Kurki',
  'Höyryveturi',
  'Ankkuri',
  'Näätä',
  'Merikotka',
  'Sekstantti',
  'Karhu',
  'Priki',
  'Karttapallo',
  'Susi',
  'Peura',
  'Lyhty',
  'Kirjekyyhky',
  'Taskukello',
  'Saukko',
  'Huuhkaja',
  'Postivaunu',
  'Kiikari',
  'Mursu',
  'Villihanhi',
]);

/*
 * Hakutaulut kirjoitetaan kerran moduulin latautuessa. Workerin
 * kylmäkäynnistys tekee tämän yhden kerran; jokainen liittyminen
 * käyttää valmista taulua eikä käy 24 sanaa läpi silmukassa.
 */
const ADJEKTIIVIT_PIENELLA = new Map(ADJEKTIIVIT.map((s) => [s.toLowerCase(), s]));
const SUBSTANTIIVIT_PIENELLA = new Map(SUBSTANTIIVIT.map((s) => [s.toLowerCase(), s]));

/**
 * Tarkistaa nimimerkin ja palauttaa sen kanonisessa muodossa.
 *
 * Kirjainkoko ja ylimääräiset välit saavat olla miten sattuu — se on
 * käyttöliittymän epätarkkuutta, ei hyökkäys. Sanojen on silti oltava
 * täsmälleen listoilta ja täsmälleen kaksi.
 *
 * @param {unknown} teksti asiakkaan lähettämä nimimerkki
 * @returns {string} kanoninen "Adjektiivi Substantiivi" tai '' jos ei kelpaa
 */
export function normalisoiNimimerkki(teksti) {
  if (typeof teksti !== 'string') return '';
  // Pituusraja ENNEN muuta käsittelyä: megatavun mittaista merkkijonoa
  // ei siivota, se hylätään.
  if (teksti.length > 80) return '';
  const osat = teksti.replace(/\s+/g, ' ').trim().split(' ');
  if (osat.length !== 2) return '';
  const adjektiivi = ADJEKTIIVIT_PIENELLA.get(osat[0].toLowerCase());
  const substantiivi = SUBSTANTIIVIT_PIENELLA.get(osat[1].toLowerCase());
  if (!adjektiivi || !substantiivi) return '';
  return `${adjektiivi} ${substantiivi}`;
}
