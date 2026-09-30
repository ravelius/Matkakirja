/**
 * NIMETÖN KÄVIJÄLASKURI, selaimen puoli (omistaja 30.9.2026): kerran
 * istunnossa 'avaus'-ping Pöllö-workerille (tools/pollo/kaynnit.js) ja
 * apurahan kortin avaus sekä esittelylinssit omina tapahtumina. Worker
 * laskee päivän eri kävijät tiivisteenä; IP-osoitteita ei tallenneta.
 *
 * Ei lähetetä lainkaan: paikallinen palvelin (localhost, 127.0.0.1,
 * file:), automaatioselain (navigator.webdriver: savukkeet ja
 * kuvaajat). Omistajan laite lähettää merkin omistaja: true, jolloin
 * worker ei laske sitä: kehittäjätila tai kerran avattu ?omistaja
 * (tallentuu laitteelle). Ping ei koskaan heitä eikä odota vastausta.
 */
import { POLLOPALVELIN } from './packs/pollo-asetukset.js';

export const OMISTAJA_AVAIN = 'matkakirja-omistaja';
const ISTUNTO_ETULIITE = 'matkakirja-kaynti:';

function lue(varasto, avain) {
  try { return varasto?.getItem(avain) ?? null; } catch { return null; }
}
function kirjoita(varasto, avain, arvo) {
  try { varasto?.setItem(avain, arvo); } catch { /* yksityinen selaus */ }
}

/** ?omistaja osoitteessa merkitsee laitteen omistajan laitteeksi (pysyvä). */
export function merkitseOmistajaOsoitteesta(sijainti = globalThis.location, varasto = globalThis.localStorage) {
  try {
    if (new URLSearchParams(sijainti?.search ?? '').has('omistaja')) kirjoita(varasto, OMISTAJA_AVAIN, '1');
  } catch { /* ei osoitetta */ }
}

export function onOmistaja(varasto = globalThis.localStorage) {
  return lue(varasto, OMISTAJA_AVAIN) === '1' || lue(varasto, 'matkakirja-kehittaja') === '1';
}

/** Lähetetäänkö tästä ympäristöstä lainkaan (ei paikallista eikä automaatiota). */
export function kayntiSallittu(sijainti = globalThis.location, nav = globalThis.navigator) {
  if (!POLLOPALVELIN || nav?.webdriver) return false;
  const isanta = sijainti?.hostname ?? '';
  if (!isanta || sijainti?.protocol === 'file:') return false;
  return !/^(localhost|127\.0\.0\.1|\[::1\]|.*\.localhost|.*\.test)$/.test(isanta);
}

/**
 * Lähettää tapahtuman kerran istunnossa. Palauttaa lähetetyn rungon tai null.
 * @param {'avaus'|'apuraha'|'esittelylinssit'} tapahtuma
 */
export function lahetaKaynti(tapahtuma, versio = '', {
  laheta = (runko) => globalThis.fetch?.(POLLOPALVELIN, {
    method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body: JSON.stringify(runko),
  }),
  istunto = globalThis.sessionStorage,
  varasto = globalThis.localStorage,
  sijainti = globalThis.location,
  nav = globalThis.navigator,
} = {}) {
  try {
    if (!kayntiSallittu(sijainti, nav)) return null;
    if (lue(istunto, ISTUNTO_ETULIITE + tapahtuma)) return null;
    kirjoita(istunto, ISTUNTO_ETULIITE + tapahtuma, '1');
    const runko = { tehtava: 'kaynti', alusta: 'web', versio: String(versio), tapahtuma, omistaja: onOmistaja(varasto) };
    Promise.resolve(laheta(runko)).catch(() => {});
    return runko;
  } catch {
    return null;
  }
}
