/*
 * RAAMATTU MUOKATTAVAKSI PELISSÄ.
 *
 * Omistajan tilaus 11.9.2026 (Raamattu, "RAAMATTU MUOKATTAVAKSI
 * PELISSA JA TYOHUONEEN VALIKKO KAHTEEN NAPPIIN", sanatarkasti):
 * *"pystyykö raamatun muuttamaan niin että voisin itse editoida
 * jokaisen sivun tekstejä ja painaa lopuksi lähetä muutokset
 * nappia?"*
 *
 * KOLME SÄÄNTÖÄ, JOISTA TÄMÄ MODUULI PITÄÄ KIINNI:
 *
 *   1. RAAMATTU-OLIO EI MUUTU. js/tyohuone-raamattu.js on Fablen
 *      kirjoitettava tiedosto (CLAUDE.md ja Raamattu: vain Fable
 *      kirjoittaa). Muokkaus elää kentissä ja luonnoksessa, ei
 *      koskaan RAAMATTU-oliossa.
 *   2. EI PYSYVÄÄ TALLENNUSTA SELAIMEEN. Luonnos menee
 *      sessionStorageen, jotta sivunvaihto lehdessä ei hukkaa
 *      kirjoitettua tekstiä; välilehden sulkeminen unohtaa sen.
 *   3. LÄHETYS KULKEE SAMAA REITTIÄ KUIN LUKIJOIDEN EHDOTUKSET
 *      (js/ehdotukset.js → ehdotusworker). Selaimeen ei tule
 *      avaimia eikä GitHub-kutsuja; Fable poimii muutokset
 *      Lukijoilta-lehdestä ja kirjoittaa ne Raamattuun sanatarkasti.
 */

import { ehdotusKaytossa, lahetaEhdotus } from './ehdotukset.js';
import { html, kehittajaTilaPaalla } from './ui-apurit.js';

/** Luonnoksen avain sessionStoragessa. */
export const RAAMATUN_LUONNOS_AVAIN = 'matkakirja-raamattu-luonnos';

/** Ehdotuksen laji workerille ja Lukijoilta-lehden ryhmittelyyn. */
export const RAAMATUN_LAJI = 'raamattu';

/** Johdannon "osio", jotta avain ja lähetysrivi ovat samaa muotoa. */
export const JOHDANNON_OSIO = 'Johdanto';

/** Tunniste, jonka Lukijoilta-lehti tunnistaa myös vanhalta workerilta. */
export const RAAMATUN_TUNNISTE = '[Raamatun muutokset]';

/** Yhden kentän avain luonnoksessa. */
export function luonnoksenAvain(osio, kohta) {
  return `${osio}»${kohta}`;
}

/**
 * Istuntosäilö puolustettuna.
 *
 * Yksityinen selaus ja iOS:n kotivalikkosovellus voivat heittää jo
 * pelkästä lukemisesta, eikä muokkaus saa kaatua siihen — ilman
 * säilöä luonnos elää vain tämän sivunavauksen ajan muistissa.
 */
function sailio() {
  try {
    return globalThis.sessionStorage ?? null;
  } catch {
    return null;
  }
}

/** Muistikopio: säilön puuttuessa luonnos säilyy silti lehden ajan. */
let muistiLuonnos = {};

/** Luonnos säilöstä (tai muistista). */
export function lueRaamatunLuonnos() {
  try {
    const raaka = sailio()?.getItem(RAAMATUN_LUONNOS_AVAIN);
    if (raaka) {
      const jasennetty = JSON.parse(raaka);
      if (jasennetty && typeof jasennetty === 'object') muistiLuonnos = jasennetty;
    }
  } catch {
    // Rikkinäinen luonnos ei saa estää lehden avaamista.
  }
  return muistiLuonnos;
}

/** Yhden kentän tallennus luonnokseen. */
export function tallennaRaamatunKentta(osio, kohta, teksti) {
  muistiLuonnos = { ...lueRaamatunLuonnos(), [luonnoksenAvain(osio, kohta)]: teksti };
  try {
    sailio()?.setItem(RAAMATUN_LUONNOS_AVAIN, JSON.stringify(muistiLuonnos));
  } catch {
    // Täysi tai kielletty säilö: muisti riittää tämän istunnon ajan.
  }
  return muistiLuonnos;
}

/** Luonnos pois (onnistuneen lähetyksen jälkeen). */
export function tyhjennaRaamatunLuonnos() {
  muistiLuonnos = {};
  try {
    sailio()?.removeItem(RAAMATUN_LUONNOS_AVAIN);
  } catch {
    // Sama kuin yllä: muisti on jo tyhjä.
  }
}

/**
 * Muuttuneet kohdat: { osio, kohta, vanha, uusi }.
 *
 * Vertailu tehdään trimmattuna, jottei pelkkä rivinvaihto kentän
 * lopussa näytä muutokselta. Kohta on osion kohtataulukon indeksi tai
 * merkkijono 'johdanto'.
 */
export function keraaRaamatunMuutokset(raamattu, luonnos = lueRaamatunLuonnos()) {
  const muutokset = [];
  const lisaa = (osio, kohta, vanha) => {
    const uusi = luonnos?.[luonnoksenAvain(osio, kohta)];
    if (typeof uusi !== 'string') return;
    if (uusi.trim() === String(vanha ?? '').trim()) return;
    muutokset.push({
      osio, kohta, vanha: String(vanha ?? ''), uusi: uusi.trim(),
    });
  };
  lisaa(JOHDANNON_OSIO, 'johdanto', raamattu?.johdanto);
  for (const osio of raamattu?.osiot ?? []) {
    (osio.kohdat ?? []).forEach((kohta, j) => lisaa(osio.otsikko, j, kohta));
  }
  return muutokset;
}

/**
 * Lähetysteksti Fablelle.
 *
 * Selkeä tekstimuoto eikä JSON: Fable lukee muutokset
 * Lukijoilta-lehdestä silmillä ja kirjoittaa ne Raamattuun
 * sanatarkasti. Ensimmäinen rivi on tunniste, jonka Lukijoilta-lehti
 * osaa ryhmitellä myös silloin, kun worker on vanha eikä tunne
 * `laji`-kenttää.
 */
export function raamatunMuutosTeksti(muutokset) {
  const lohkot = muutokset.map((m) => {
    const kohta = m.kohta === 'johdanto' ? 'johdanto' : `kohta ${m.kohta}`;
    return `${m.osio} » ${kohta}:\nVANHA: ${m.vanha}\nUUSI: ${m.uusi}`;
  });
  return [`${RAAMATUN_TUNNISTE} ${muutokset.length} kpl`, ...lohkot].join('\n\n');
}

/** Onko tämä ehdotus Raamatun muutoslähetys? (Lukijoilta-lehti.) */
export function onRaamatunMuutos(ehdotus) {
  if (ehdotus?.laji === RAAMATUN_LAJI) return true;
  return String(ehdotus?.teksti ?? '').startsWith(RAAMATUN_TUNNISTE);
}

/**
 * Muutokset workerille samaa reittiä kuin lukijoiden ehdotukset.
 *
 * @param {Array} muutokset keraaRaamatunMuutokset-tulos
 * @param {Function} laheta pistorasia testejä varten
 */
export function lahetaRaamatunMuutokset(muutokset, laheta = lahetaEhdotus) {
  return laheta({
    laji: RAAMATUN_LAJI,
    teksti: raamatunMuutosTeksti(muutokset),
    sivu: 'Raamattu',
    tarkenne: `Raamatun muutokset: ${muutokset.length} kohtaa`,
    nimimerkki: 'Työhuone (kehittäjä)',
  });
}

/* ------------------------------------------------------------------ *
 * Sivun piirto
 * ------------------------------------------------------------------ */

/** Kenttä kasvaa sisällön mukaan: korkeus sisällön korkeudesta. */
function mitoita(kentta) {
  kentta.style.height = 'auto';
  kentta.style.height = `${kentta.scrollHeight || 0}px`;
}

/**
 * Yksi muokattava kohta.
 *
 * Textarea eikä contenteditable: rivinvaihdot ja tekstin poiminta
 * ovat selaimesta riippumattomia, ja arvo luetaan yhdellä kentällä.
 * Kehys näkyy vasta kun kenttä on aktiivinen (css/styles.css), jotta
 * sivu näyttää lepotilassa lehdeltä eikä lomakkeelta.
 */
export function piirraRaamatunKentta(kohde, { osio, kohta, teksti }) {
  const luonnos = lueRaamatunLuonnos();
  const alku = luonnos[luonnoksenAvain(osio, kohta)] ?? teksti ?? '';
  const kentta = html('textarea', 'raamattu-kentta');
  kentta.value = alku;
  kentta.rows = 3;
  kentta.setAttribute('aria-label', `${osio} — ${kohta === 'johdanto' ? 'johdanto' : `kohta ${kohta}`}`);
  kentta.addEventListener('input', () => {
    tallennaRaamatunKentta(osio, kohta, kentta.value);
    mitoita(kentta);
  });
  kohde.appendChild(kentta);
  // Mitta vasta kun kenttä on puussa: scrollHeight on muuten nolla.
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => mitoita(kentta));
  return kentta;
}

/**
 * "Lähetä muutokset" -nappi sivun loppuun.
 *
 * Nappi on kehittäjätilan takana kuten koko Raamattu-lehti. Tulos
 * kerrotaan napin alla omalla rivillään — onnistuminen tyhjentää
 * luonnoksen, virhe jättää sen paikalleen, jotta tekstiä ei menetetä.
 */
export function piirraRaamatunLahetys(kohde, raamattu, { laheta = lahetaEhdotus } = {}) {
  if (!kehittajaTilaPaalla()) return null;
  const kotelo = html('div', 'raamattu-lahetys');
  const nappi = html('button', 'wiki-btn raamattu-laheta-btn', 'Lähetä muutokset');
  nappi.type = 'button';
  const tulos = html('p', 'raamattu-lahetys-tulos', '');
  nappi.addEventListener('click', async () => {
    const muutokset = keraaRaamatunMuutokset(raamattu);
    if (!muutokset.length) {
      tulos.textContent = 'Ei muutoksia lähetettäväksi.';
      return;
    }
    if (!ehdotusKaytossa()) {
      tulos.textContent = 'Ehdotuskanavaa ei ole kytketty (js/ehdotukset.js EHDOTUS_OSOITE).';
      return;
    }
    nappi.disabled = true;
    tulos.textContent = `Lähetetään ${muutokset.length} muutosta…`;
    try {
      await lahetaRaamatunMuutokset(muutokset, laheta);
      tyhjennaRaamatunLuonnos();
      tulos.textContent = `Muutokset lähetetty Fablelle (${muutokset.length} kohtaa).`;
    } catch (virhe) {
      tulos.textContent = `Lähetys ei onnistunut: ${virhe.message}`;
    } finally {
      nappi.disabled = false;
    }
  });
  kotelo.appendChild(nappi);
  kotelo.appendChild(tulos);
  kohde.appendChild(kotelo);
  return kotelo;
}
