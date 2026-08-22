/*
 * Kuvagenerointi Pöllö-workerin kautta (tehtava: 'kuva').
 *
 * MIKSI WORKERIN KAUTTA: OpenAI-avain on vain workerin salaisuutena
 * (omistajan päätös 22.8.2026 — avainta ei kopioida kehityskonttiin).
 * Tämä työkalu on siis ohut kutsuja: prompti sisään, png ulos.
 *
 * Käyttö:
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=... \
 *     node tools/pollo/generoi-kuva.mjs ulos.png "prompti tähän" [pysty|vaaka|nelio]
 *
 * Promptin voi antaa myös tiedostona: @polku/promptiin.txt.
 * Koodi luetaan ympäristöstä eikä sitä hyväksytä argumenttina, jottei
 * se päädy komentohistoriaan tai lokiin. Workerin osoite luetaan
 * pelin vakiosta (js/packs/pollo-asetukset.js) tai POLLOPALVELIN-
 * ympäristömuuttujasta.
 */
import { readFileSync, writeFileSync } from 'fs';

const [, , ulos, promptiArg, koko] = process.argv;
const koodi = process.env.POLLO_KEHITTAJAKOODI;
if (!ulos || !promptiArg) {
  console.error('Käyttö: generoi-kuva.mjs ulos.png "prompti" [pysty|vaaka|nelio]');
  process.exit(1);
}
if (!koodi) {
  console.error('POLLO_KEHITTAJAKOODI puuttuu ympäristöstä.');
  process.exit(1);
}

const prompti = promptiArg.startsWith('@')
  ? readFileSync(promptiArg.slice(1), 'utf8')
  : promptiArg;

let palvelin = process.env.POLLOPALVELIN;
if (!palvelin) {
  ({ POLLOPALVELIN: palvelin } = await import('../../js/packs/pollo-asetukset.js'));
}

const vastaus = await fetch(palvelin, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-pollo-kehittaja': koodi,
  },
  body: JSON.stringify({ tehtava: 'kuva', prompti, koko: koko || 'pysty' }),
});
const runko = await vastaus.json().catch(() => null);
if (!vastaus.ok || !runko?.kuva) {
  console.error('Virhe:', vastaus.status, runko?.viesti ?? '(ei viestiä)');
  process.exit(1);
}
writeFileSync(ulos, Buffer.from(runko.kuva, 'base64'));
console.log('OK', ulos, `(${runko.malli}, ${runko.koko})`);
