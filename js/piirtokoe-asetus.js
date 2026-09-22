/*
 * PIIRTOKOE JA KEHYSPROFIILI RATASVALIKKOON (omistajan tilaus Fablen
 * kautta 22.9.2026 klo 20.15: *"laita Piirtokoe-valikko ja
 * kehysprofiilin kytkin peliin HETI"*).
 *
 * MIKSI VALIKKOON EIKÄ VAIN OSOITTEESEEN. Kokeet ovat tähän asti olleet
 * `?koe=`-lippuja, ja omistaja testaa puhelimella: pitkän osoitteen
 * naputtelu iPhonen näppäimistöllä on juuri se este, jonka takia koe jää
 * ajamatta. Valikosta valittu koe jää laitteelle ja pysyy latauksen yli.
 *
 * YKSI TOTUUS, KAKSI LÄHDETTÄ. Moduulit lukevat koelippunsa kahdesta
 * apurista (`laattakerroksenKokeet`, `piirtokokeet`); molemmat lisäävät
 * tähän tallennetut valinnat samaan joukkoon, joten peli käyttäytyy
 * täsmälleen kuin lippu olisi osoitteessa. OSOITE VOITTAA silloin kun
 * apurille annetaan hakumerkkijono erikseen (savukkeet ja testit), jotta
 * mittausajo ei koskaan lue laitteen muistia.
 *
 * KOKEET OVAT MITTAUSTA. Jokainen muuttaa ulkoasua tai tarkkuutta vedon
 * aikana; oletus on aina `normaali`, eikä mikään niistä saa jäädä
 * päälle ilman omistajan päätöstä.
 */

export const PIIRTOKOE_AVAIN = 'matkakirja-piirtokoe';
export const KEHYSPROFIILI_AVAIN = 'matkakirja-kehysprofiili';
export const PIIRTOKOE_TAPAHTUMA = 'matkakirja-piirtokoe';

/**
 * Valittavat kokeet. `lippu` on se `?koe=`-arvo, jonka valinta lisää;
 * `lataus` kertoo, ettei koe voi vaihtua ilman sivun uutta latausta.
 */
export const PIIRTOKOKEIDEN_VAIHTOEHDOT = [
  {
    avain: 'normaali',
    nimi: 'Normaali',
    seloste: 'Ei koetta — peli piirtää kuten tavallisesti',
    lippu: null,
    ikoni: '<circle cx="12" cy="12" r="7"/>',
  },
  {
    avain: 'eipuskuri',
    nimi: 'Ei puskurikirjoituksia',
    seloste: 'Vedon aikana ei kirjoiteta GPU-puskureita (häivytykset odottavat lepoa)',
    lippu: 'eipuskuri',
    ikoni: '<path d="M5 7h14M5 12h14M5 17h9"/><path d="M15.5 15.5 20 20"/>',
  },
  {
    avain: 'dpr15',
    nimi: 'Pikselisuhde 1,5',
    seloste: 'Neljäsosa pikseleistä dpr 3:een nähden — karkea täyttökoe',
    lippu: 'dpr15',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/><path d="M4.5 12h15M12 5.5v13"/>',
    lataus: true,
  },
  {
    avain: 'alpha0',
    nimi: 'Ilman alfakanavaa',
    seloste: 'Läpinäkymätön kangas — komposiittorin ei tarvitse sekoittaa sitä sivuun',
    lippu: 'alpha0',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/><path d="m4.5 18.5 15-13"/>',
    lataus: true,
  },
  {
    avain: 'vahemmandc',
    nimi: 'Vähemmän piirtokutsuja',
    seloste: 'Tuki- ja ennakkolaatat piiloon, kun näkyvä ala on jo täysin peitetty',
    lippu: 'vahemmandc',
    ikoni: '<path d="M4.5 8.5h9v9h-9z"/><path d="M10.5 5.5h9v9"/>',
    lataus: true,
  },
  {
    avain: 'eivienti',
    nimi: 'Ei tekstuurivientejä',
    seloste: 'Vedon aikana ei viedä uusia tekstuureja näytönohjaimelle',
    lippu: 'eivienti',
    ikoni: '<path d="M12 16V5"/><path d="m8 9 4-4 4 4"/><path d="M5 19h14"/>',
  },
];

export const PIIRTOKOKEEN_OLETUS = 'normaali';

const lueMuisti = (avain) => {
  try { return globalThis.localStorage?.getItem(avain) ?? null; } catch { return null; }
};
const kirjoitaMuisti = (avain, arvo) => {
  try { globalThis.localStorage?.setItem(avain, arvo); } catch { /* ei muistia */ }
};

/** Laitteelle muistettu koe (oletus normaali; tuntematon arvo = oletus). */
export function piirtokoeValinta() {
  const arvo = lueMuisti(PIIRTOKOE_AVAIN);
  return PIIRTOKOKEIDEN_VAIHTOEHDOT.some((k) => k.avain === arvo) ? arvo : PIIRTOKOKEEN_OLETUS;
}

/** Vaatiiko koe uuden latauksen (pikselisuhde on kontekstin luku). */
export function piirtokoeVaatiiLatauksen(avain) {
  return Boolean(PIIRTOKOKEIDEN_VAIHTOEHDOT.find((k) => k.avain === avain)?.lataus);
}

/** Valinta laitteelle ja ilmoitus. Palauttaa voimaan jääneen. */
export function asetaPiirtokoe(avain) {
  const uusi = PIIRTOKOKEIDEN_VAIHTOEHDOT.some((k) => k.avain === avain) ? avain : PIIRTOKOKEEN_OLETUS;
  kirjoitaMuisti(PIIRTOKOE_AVAIN, uusi);
  globalThis.dispatchEvent?.(new CustomEvent(PIIRTOKOE_TAPAHTUMA, { detail: { koe: uusi } }));
  return uusi;
}

/** Näytetäänkö kehysprofiilin overlay (sama kuin ?koe=profiili). */
export function kehysprofiiliPaalla() {
  return lueMuisti(KEHYSPROFIILI_AVAIN) === '1';
}

/** Overlay päälle/pois laitteelle. */
export function asetaKehysprofiili(paalla) {
  kirjoitaMuisti(KEHYSPROFIILI_AVAIN, paalla ? '1' : '0');
  globalThis.dispatchEvent?.(new CustomEvent(PIIRTOKOE_TAPAHTUMA, { detail: { profiili: Boolean(paalla) } }));
  return Boolean(paalla);
}

/**
 * Valikosta tulevat koeliput joukkona. Tämä yhdistetään osoitteen
 * `?koe=`-lippuihin (js/pallolaatat.js, js/pallolauta/kerrokset.js).
 */
export function tallennetutKokeet() {
  const joukko = new Set();
  const koe = PIIRTOKOKEIDEN_VAIHTOEHDOT.find((k) => k.avain === piirtokoeValinta());
  if (koe?.lippu) joukko.add(koe.lippu);
  if (kehysprofiiliPaalla()) joukko.add('profiili');
  return joukko;
}
