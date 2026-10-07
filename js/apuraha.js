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
  // Selainversio: webTeksti korvaa tekstin (kappale tai listarivi {teksti, webTeksti}).
  const web = (x) => (x && typeof x === 'object' ? (x.webTeksti ?? x.teksti) : x);
  const kappaleet = d.kappaleet
    .filter((k) => k && (k.teksti || k.lista?.length || k.otsikko || k.nappi))
    .map((k) => ({
      ...k,
      teksti: k.webTeksti ?? k.teksti,
      // Korostus (omistaja 1.10.2026): kappale lihavoituna samassa koossa.
      korostus: k.korostus === true,
      lista: Array.isArray(k.lista) ? k.lista.map(web).filter((r) => typeof r === 'string') : k.lista,
    }));
  const kuvat = (Array.isArray(d.kuvat) ? d.kuvat : []).filter((k) => k && typeof k.tiedosto === 'string');
  return {
    nappi: d.nappi.trim(),
    otsikko: d.otsikko,
    alaotsikko: typeof d.alaotsikko === 'string' ? d.alaotsikko : '',
    kappaleet,
    kuvat,
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
    const arvo = globalThis.localStorage?.getItem(ESITTELYLINSSIT_AVAIN);
    return arvo === '1' || Boolean(arvo?.startsWith('['));
  } catch {
    return false; // yksityinen selaus
  }
}

/**
 * Avaa esittelylinssit. lista (esittely.json nappi.linssit, omistaja 7.10.2026 klo 15.0x "valmiit linssit"): vain
 * nämä tunnukset; ilman listaa vanha tapa (kaikki rekisterin toimivat linssit).
 */
export function avaaEsittelylinssit(lista = null) {
  const arvo = Array.isArray(lista) && lista.length ? JSON.stringify(lista.filter((t) => typeof t === 'string')) : '1';
  try { globalThis.localStorage?.setItem(ESITTELYLINSSIT_AVAIN, arvo); } catch { /* yksityinen selaus */ }
}

/** Avattujen esittelylinssien lista tai null (ei listaa: kaikki toimivat). */
export function esittelylinssiLista() {
  try {
    const arvo = globalThis.localStorage?.getItem(ESITTELYLINSSIT_AVAIN);
    if (!arvo || arvo === '1') return null;
    const l = JSON.parse(arvo);
    return Array.isArray(l) ? l : null;
  } catch {
    return null;
  }
}

/** Testeille: seuraava lataaApuraha hakee uudelleen. */
export function nollaaApuraha() { lataus = null; }
