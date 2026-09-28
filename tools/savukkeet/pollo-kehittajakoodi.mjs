/*
 * PÖLLÖN KEHITTÄJÄKOODI SAVUKKEILLE (Julkaisija 28.9.2026).
 *
 * MIKSI: Pulun (tools/pollo/worker.js) päiväraja lasketaan IP:ltä, ja
 * savukkeet ajavat samasta verkosta kuin omistajan laitteet. Savuke,
 * joka ei katkaise eikä jäljittele pöllöpalvelinta, voi kuluttaa rajaa
 * sivutuotteena (saapumisen lukijaäänen esihaku, kysymysehdotukset).
 * Worker ohittaa rajat, kun pyynnössä on otsake `x-pollo-kehittaja`
 * oikealla koodilla (kehittajaOhitus).
 *
 * MITEN: lisaaPolloKehittajakoodi(kohde) rekisteröi Playwright-sivulle
 * tai -kontekstille reitin, joka osuu VAIN pöllöpalvelimen alkuperään
 * (js/packs/pollo-asetukset.js POLLOPALVELIN, sama origin tarkasti) ja
 * lisää otsakkeen route.fallbackilla. Muut pyynnöt eivät koskaan näe
 * koodia — extraHTTPHeaders lähettäisi sen kaikille palvelimille.
 * fallback jättää savukkeen omat katkaisut ja jäljitelmät voimaan:
 * myöhemmin rekisteröity sivun/kontekstin reitti ratkaisee ensin.
 *
 * Koodi luetaan ympäristömuuttujasta POLLO_KEHITTAJAKOODI (Actionsissa
 * repon secret, paikallisesti avaintiedostosta). Jos muuttuja puuttuu,
 * reittiä ei rekisteröidä ja tulostetaan varoitus. ARVOA EI KOSKAAN
 * tulosteta.
 */
import { POLLOPALVELIN } from '../../js/packs/pollo-asetukset.js';

export const POLLO_KEHITTAJA_OTSAKE = 'x-pollo-kehittaja';
export const POLLO_ORIGIN = POLLOPALVELIN ? new URL(POLLOPALVELIN).origin : '';

/** Osuuko osoite pöllöpalvelimeen (tarkka origin, ei alidomainia eikä polkupeliä). */
export function onPolloOsoite(osoite) {
  if (!POLLO_ORIGIN) return false;
  try {
    const url = osoite instanceof URL ? osoite : new URL(String(osoite));
    return url.origin === POLLO_ORIGIN;
  } catch {
    return false;
  }
}

/**
 * Lisää kehittäjäkoodin pöllöpyyntöihin.
 *
 * @param {{ route: Function }} kohde Playwrightin Page tai BrowserContext
 * @param {{ env?: object, varoita?: (viesti: string) => void }} [valinnat]
 * @returns {Promise<boolean>} true, jos reitti rekisteröitiin
 */
export async function lisaaPolloKehittajakoodi(kohde, { env = process.env, varoita = console.warn } = {}) {
  const koodi = String(env?.POLLO_KEHITTAJAKOODI ?? '').trim();
  if (!koodi) {
    varoita('VAROITUS: POLLO_KEHITTAJAKOODI puuttuu ympäristöstä — pöllöpyynnöt ilman kehittäjäotsaketta (kuluttavat IP:n päivärajaa).');
    return false;
  }
  if (!POLLO_ORIGIN) return false;
  await kohde.route((url) => onPolloOsoite(url), (reitti) => reitti.fallback({
    headers: { ...reitti.request().headers(), [POLLO_KEHITTAJA_OTSAKE]: koodi },
  }));
  return true;
}
