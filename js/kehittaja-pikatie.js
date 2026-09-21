/*
 * KEHITTÄJÄN PIKATIE PALLOLAUDALLE (Fable 21.9.2026, Laitetestaajan
 * raportti docs/raportit/laitemittaus-sulavuus-20260921.md).
 *
 * `?lauta=pallo&dev=<kaupunki>` avaa pelin suoraan toimintavaiheeseen
 * annetussa kaupungissa (maailmankartta, yksi pelaaja, nappula pois
 * laudalta), ohittaa saapumissekvenssin ja ajaa nimien ja nostojen
 * ladonnan kotelon lopullisella koolla — sama sekvenssi kuin
 * tools/savukkeet/savuke-nimiot-sulavat.mjs, mutta pelin sisällä,
 * jotta se toimii myös oikealla laitteella ilman Playwrightia.
 *
 * MIKSI PELKKÄ ESISIEMENNETTY TALLENNE EI RIITTÄNYT. CSS2D-merkki
 * (.pallolauta-nimi, .pallolauta-nosto) syntyy vasta kirjaston
 * seuraavassa piirretyssä kehyksessä, ja pallo NUKKUU (js/pallolauta/
 * lauta.js RENDER-SILMUKKA LEPÄÄ), kun saapumiskortti tai muu dialogi
 * on auki, kuori piilossa tai sivu taustalla. Ladonta antaa silloin
 * datumit (nostot.sovittelunTulos näyttää järkevältä), mutta DOMiin ei
 * tule mitään. Pikatie sulkee dialogit, herättää pallon ja lataa
 * uudestaan; `ui.pallolauta.tila()` kertoo, mikä portti on päällä, jos
 * merkkejä ei silti synny.
 *
 * VAIN KEHITTÄJÄLLE: pikatie ei tallenna peliä levylle (ks. main.js:
 * onChange tyhjä), joten se ei pyyhi laitteen oikeaa peliä, ja se
 * kytkee kehittäjätilan (matkakirja-kehittaja) vain tälle sivulataukselle.
 */

/** Pikatien kaupunki osoitteesta tai null. */
export function pikatienKaupunki(search = globalThis.location?.search ?? '') {
  try {
    const arvo = new URLSearchParams(search).get('dev');
    return arvo && /^[a-z0-9-]{2,40}$/.test(arvo) ? arvo : null;
  } catch {
    return null;
  }
}

/**
 * Peli pikatietä varten: yksi pelaaja annetussa kaupungissa,
 * toimintavaihe, nappula pois laudalta (savuke-nimiot-sulavat.mjs).
 *
 * @param {Function} Game js/game.js
 * @param {object} pack packById('maailmankartta')
 * @param {string} kaupunki
 */
export function rakennaPikatiePeli(Game, pack, kaupunki) {
  if (!pack?.cities?.some?.((c) => c.id === kaupunki) && !pack?.cityById?.(kaupunki)) return null;
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack,
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens?.delete?.(kaupunki);
  return peli;
}

/** Odottaa, että ehto täyttyy (enintään `kattoMs`), pollaten. */
const odota = (ehto, kattoMs = 90000, valiMs = 100) => new Promise((ok) => {
  const alku = Date.now();
  const kierros = () => {
    if (ehto()) { ok(true); return; }
    if (Date.now() - alku > kattoMs) { ok(false); return; }
    setTimeout(kierros, valiMs);
  };
  kierros();
});

/**
 * Vie avatun pelin pallolaudalle nimiöineen: sulkee dialogit ja
 * saapumissekvenssin, herättää pallon, saapuu ilman ajoa ja ajaa
 * lepoladonnan kotelon lopullisella koolla. Palauttaa `tila()`-luennan.
 *
 * @param {object} ui pelin UI
 * @param {{suljeFokusvirta: Function, ohitaSaapumisluenta: Function}} fokusvirta js/fokusvirta.js
 */
export async function avaaPikatie(ui, { suljeFokusvirta, ohitaSaapumisluenta } = {}) {
  // Virheet talteen tila()-luentaa varten (rAF-silmukan virhe ei näy muualla).
  const virheet = [];
  globalThis.__pallonVirheet = virheet;
  globalThis.addEventListener?.('error', (e) => virheet.push(String(e.message ?? e)));
  globalThis.addEventListener?.('unhandledrejection', (e) => virheet.push(String(e.reason?.message ?? e.reason)));
  const onLauta = await odota(() => Boolean(ui.pallolauta));
  if (!onLauta) return { virhe: 'pallolauta ei auennut 90 s:ssa' };
  const lauta = ui.pallolauta;
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  try { suljeFokusvirta?.(ui); } catch { /* ei fokusvirtaa */ }
  for (const d of document.querySelectorAll('dialog[open]')) { try { d.close(); } catch { /* ei dialogia */ } }
  await lauta.saavu?.({ kesto: 0 });
  await new Promise((v) => setTimeout(v, 1600));
  // Saapumisluenta (isokuva, Ohita-nappi, pulun kommentti) pois samaa
  // tietä kuin pelaajan Ohita; jäänteet siivotaan DOMista.
  try { ohitaSaapumisluenta?.(ui); } catch { /* ei luentaa */ }
  try { suljeFokusvirta?.(ui); } catch { /* ei fokusvirtaa */ }
  for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokusvirta-ohitanappi, .fokuszoom, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
  for (const d of document.querySelectorAll('dialog[open]')) { try { d.close(); } catch { /* ei dialogia */ } }
  lauta.heraa?.();
  lauta.ladoHeti?.();
  // Merkit syntyvät kirjaston seuraavassa kehyksessä: odotetaan, että DOMissa on jotain.
  await odota(() => document.querySelector('.pallolauta-nimi, .pallolauta-nosto'), 5000, 100);
  const tila = lauta.tila?.() ?? null;
  console.info('[matkakirja] kehittäjän pikatie', tila);
  return tila;
}
