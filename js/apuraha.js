/**
 * APURAHAN ARVIOIJAN ESITTELYKORTTI (omistaja 30.9.2026, poikkeus web-taukoon).
 *
 * Aloitusportin nappi "Apurahahakemus – katso tämä ensin" avaa kortin
 * (otsikko, kursiivinen alaotsikko, neljä kappaletta, viiden kuvan rivi)
 * ja portin alareunassa on pysyvä huomautus iOS-sovelluksesta. Sisältö
 * on YHDESSÄ tiedostossa, assets/apuraha/esittely.json, jonka myös
 * natiivi lukee (Apuraha.cs: https://matkakirja.app/assets/apuraha/esittely.json):
 * Päätoimittaja päivittää tekstin yhteen paikkaan.
 *
 * Tässä vain lataus ja tarkistus; piirto on ui.js:n naytaApuraha().
 */

export const APURAHA_OSOITE = 'assets/apuraha/esittely.json';

let lataus = null;

/**
 * Tarkistaa ja siistii esittelyn. Palauttaa null, jos pakollinen kenttä
 * puuttuu: silloin nappia ja huomautusta ei näytetä lainkaan (ei tyhjää
 * korttia).
 */
export function tarkistaApuraha(d) {
  if (!d || typeof d !== 'object') return null;
  if (typeof d.nappi !== 'string' || !d.nappi.trim()) return null;
  if (typeof d.otsikko !== 'string' || !Array.isArray(d.kappaleet)) return null;
  const kappaleet = d.kappaleet.filter((k) => k && (k.teksti || k.lista?.length || k.otsikko || k.nappi));
  const kuvat = (Array.isArray(d.kuvat) ? d.kuvat : []).filter((k) => k && typeof k.tiedosto === 'string');
  const video = d.video && typeof d.video.url === 'string' ? d.video : null;
  return {
    nappi: d.nappi.trim(),
    otsikko: d.otsikko,
    alaotsikko: typeof d.alaotsikko === 'string' ? d.alaotsikko : '',
    kappaleet,
    kuvat,
    video,
    webHuomautus: typeof d.webHuomautus === 'string' ? d.webHuomautus : '',
  };
}

/** Lataa esittelyn kerran; epäonnistuessa null (portti näkyy ilman nappia). */
export function lataaApuraha(hae = globalThis.fetch) {
  if (!lataus) {
    lataus = Promise.resolve()
      .then(() => hae(APURAHA_OSOITE))
      .then((v) => (v.ok ? v.json() : null))
      .then(tarkistaApuraha)
      .catch(() => null);
  }
  return lataus;
}

/*
 * ESITTELYLINSSIT (omistaja 30.9.2026): kortin nappi avaa kaikki toimivat
 * linssit ilman pisteitä — sama joukko kuin kehittäjätilassa, mutta muu
 * kehittäjätila jää pois. Oma avain, jotta kehittäjätilan kytkin ei avaa
 * tai sulje tätä. js/linssit/omistus.js lukee tämän (linssit ladataan
 * laiskasti, joten avain asuu tässä kevyessä moduulissa).
 */
const ESITTELYLINSSIT_AVAIN = 'matkakirja-esittelylinssit';

export function esittelylinssitAuki() {
  try {
    return globalThis.localStorage?.getItem(ESITTELYLINSSIT_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

export function avaaEsittelylinssit() {
  try { globalThis.localStorage?.setItem(ESITTELYLINSSIT_AVAIN, '1'); } catch { /* yksityinen selaus */ }
}

/** Testeille: seuraava lataaApuraha hakee uudelleen. */
export function nollaaApuraha() { lataus = null; }
