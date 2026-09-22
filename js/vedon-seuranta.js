/*
 * VEDON SEURANTA: MITEN KAMERA SEURAA SORMEA (omistajan tilaus
 * 22.9.2026 klo 18.05, Fablen kautta: vaihtoehdot ratasvalikkoon samaan
 * tapaan kuin muutkin kartan laiteasetukset).
 *
 * Pallolaudalla on viisi tapaa laskea, MISSÄ osoitin on sillä hetkellä,
 * kun kehys piirretään (js/pallo.js, VIISI SYÖTETAPAA RINNAKKAIN).
 * Oikeaa tapaa ei valita päättelemällä vaan mittaamalla, ja mittaajia
 * on kaksi: savukkeet (URL-liput) ja omistaja itse (tämä valikko).
 * Siksi valinta asuu omassa moduulissaan eikä pallo.js:ssä — valikko ei
 * voi tuoda koko lautaa, ja lauta ei saa tuntea valikkoa.
 *
 *   interp  aikaleimainterpolointi, viive ≤ 1 kehys   (OLETUS)
 *   vanha   v2097: viimeisin näyte kerran kehyksessä
 *   ennakko ekstrapolointi ilman viivettä, kiihtyvyyskatto
 *   jousi   kriittisesti vaimennettu jousi, τ ≈ 1 kehys
 *   touch   näytteet touchmovesta (VAIN kosketuslaitteella)
 *
 * `touch` on pallo.js:ssä ORTOGONAALINEN lippu (se vaihtaa näytteiden
 * lähteen, ei laskutapaa), mutta valikossa se on viides vaihtoehto:
 * omistaja valitsee yhden rivin, ei kahta ristiin. Kosketusnäytteet
 * lasketaan siis oletuslaskutavalla (interp).
 *
 * URL-LIPUT VOITTAVAT VALINNAN. `?koe=interpvanha|syoteennakko|
 * syotejousi|syotetouch` on mittausajon lippu: savuke ei saa joutua
 * arvaamaan, mikä laitteen localStorageen on jäänyt. Valikko kertoo sen
 * vihjerivillään, jottei omistaja ihmettele, miksi rivi ei pure.
 *
 * VAIKUTUS HETI, ILMAN LATAUSTA: muutos kulkee tapahtumana laudalle
 * (sama kaava kuin js/kartta-liike.js), joka vaihtaa tavan lennossa ja
 * nollaa näytepuskurin — vanhat näytteet kuuluvat vanhaan tapaan.
 */

export const VEDON_SEURANTA_AVAIN = 'matkakirja-vedon-seuranta';
/** Tapahtuma laudalle, kun valinta vaihtuu. */
export const VEDON_SEURANTA_TAPAHTUMA = 'matkakirja-vedon-seuranta';
/** Mittauslippu ohittaa valinnan (ks. yllä). */
export const VEDON_SEURANNAN_LIPUT = ['interpvanha', 'syoteennakko', 'syotejousi', 'syotetouch'];

export const VEDON_SEURANNAN_TAVAT = [
  {
    avain: 'interp',
    nimi: 'Interpolointi',
    seloste: 'Osoittimen paikka kehyksen hetkellä, viive enintään yksi kehys (oletus)',
    ikoni: '<path d="M4 17.5c3.5 0 4.5-11 8-11s4.5 11 8 11"/><circle cx="12" cy="12" r="1.4"/>',
  },
  {
    avain: 'vanha',
    nimi: 'Vanha',
    seloste: 'Viimeisin näyte sellaisenaan kerran kehyksessä (v2097)',
    ikoni: '<path d="M4.5 17.5h5v-5h5v-5h5"/>',
  },
  {
    avain: 'ennakko',
    nimi: 'Ennakointi',
    seloste: 'Ei viivettä: sormen nopeudesta arvattu paikka, kiihtyvyys rajattu',
    ikoni: '<path d="M4.5 16.5 19 7.5"/><path d="M14.5 7h4.5v4.5"/>',
  },
  {
    avain: 'jousi',
    nimi: 'Jousi',
    seloste: 'Kamera vetäytyy sormeen jousella, aikavakio noin yksi kehys',
    ikoni: '<path d="M4.5 12h2.5l1.5-4 2 8 2-8 1.5 4h5"/>',
  },
  {
    avain: 'touch',
    nimi: 'Kosketusnäytteet',
    seloste: 'Näytteet touchmovesta (iOS tahdistaa sen kehykseen) — vain kosketuslaitteella',
    ikoni: '<path d="M9.5 12V6.8a1.6 1.6 0 0 1 3.2 0V13"/><path d="M12.7 10.6a1.5 1.5 0 0 1 3 0V13"/><path d="M15.7 11.4a1.5 1.5 0 0 1 3 0v3.2a5 5 0 0 1-5 5h-1.6a4.4 4.4 0 0 1-3.5-1.8L6 14.2a1.5 1.5 0 0 1 2.3-1.9l1.2 1.3"/>',
    kosketus: true,
  },
];

export const VEDON_SEURANNAN_OLETUS = 'interp';

/** Onko laite kosketuslaite (sama ehto kuin js/pallo.js:n lipulla). */
export function kosketuslaite() {
  return typeof globalThis.ontouchstart !== 'undefined';
}

/** Onko osoitteessa mittauslippu, joka ohittaa valinnan. */
export function mittauslippuPaalla(haku = globalThis.location?.search ?? '') {
  // Sama luenta kuin js/pallolaatat.js laattakerroksenKokeet — yksi
  // ?koe=, pilkuilla eroteltuna. Kahta eri jäsennystä ei saa olla.
  let koe = '';
  try { koe = new URLSearchParams(haku).get('koe') ?? ''; } catch { return false; }
  const osat = String(koe).split(',').map((o) => o.trim());
  return VEDON_SEURANNAN_LIPUT.some((l) => osat.includes(l));
}

/** Kelpaako avain tälle laitteelle (kosketusrivi vain kosketuslaitteella). */
export function kelpaaTapa(avain) {
  const tapa = VEDON_SEURANNAN_TAVAT.find((t) => t.avain === avain);
  if (!tapa) return false;
  return !tapa.kosketus || kosketuslaite();
}

/** Laitteelle muistettu valinta (oletus interp; kelvoton arvo = oletus). */
export function vedonSeuranta() {
  let arvo = null;
  try { arvo = globalThis.localStorage?.getItem(VEDON_SEURANTA_AVAIN) ?? null; } catch { arvo = null; }
  return kelpaaTapa(arvo) ? arvo : VEDON_SEURANNAN_OLETUS;
}

/** Valinta laitteelle ja ilmoitus laudalle. Palauttaa voimaan jääneen. */
export function asetaVedonSeuranta(avain) {
  const uusi = kelpaaTapa(avain) ? avain : VEDON_SEURANNAN_OLETUS;
  try { globalThis.localStorage?.setItem(VEDON_SEURANTA_AVAIN, uusi); } catch { /* ei muistia */ }
  globalThis.dispatchEvent?.(new CustomEvent(VEDON_SEURANTA_TAPAHTUMA, { detail: { tapa: uusi } }));
  return uusi;
}

/**
 * Valinta pallo.js:n kahdeksi kentäksi. Kosketusnäytteet ovat laudalla
 * näytteiden LÄHDE, joten ne lasketaan oletuslaskutavalla.
 *
 * @returns {{tapa: string, touchLahde: boolean}}
 */
export function seurannanAsetukset(avain = vedonSeuranta()) {
  const valinta = kelpaaTapa(avain) ? avain : VEDON_SEURANNAN_OLETUS;
  if (valinta === 'touch') return { tapa: 'interp', touchLahde: true };
  return { tapa: valinta, touchLahde: false };
}
