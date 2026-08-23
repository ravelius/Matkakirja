/*
 * Herokuvien ajuri: generoi hero-työlistan välin [alku, loppu)
 * Pöllö-workerilla vaakakuvina. Prompti lähetetään sellaisenaan
 * (työlistat kokoavat reseptin itse), ohittaa valmiit tiedostot ja
 * pysähtyy päivärajaan kuten juliste-ajuri.
 *
 * Käyttö: POLLO_KEHITTAJAKOODI=<koodi> node hero-ajuri.mjs <lista> [alku] [loppu] [kohdekansio]
 *   <lista> on työlistan numero (esim. 4 → hero-tyolista-4.mjs).
 */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const koodi = process.env.POLLO_KEHITTAJAKOODI;
if (!koodi) { console.error('POLLO_KEHITTAJAKOODI puuttuu'); process.exit(1); }
const { POLLOPALVELIN } = await import('/home/user/Matkakirja/js/packs/pollo-asetukset.js');
const lista = process.argv[2];
const { TYOLISTA } = await import(`./hero-tyolista-${lista}.mjs`);
const alku = Number(process.argv[3] ?? 0);
const loppu = Number(process.argv[4] ?? TYOLISTA.length);
const kansio = process.argv[5] ?? '.';
mkdirSync(kansio, { recursive: true });

for (const t of TYOLISTA.slice(alku, loppu)) {
  const polku = join(kansio, t.tiedosto);
  if (existsSync(polku)) { console.log('OHITETTU', t.tiedosto); continue; }
  let onnistui = false;
  for (let y = 0; y < 3 && !onnistui; y++) {
    try {
      const r = await fetch(POLLOPALVELIN, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-pollo-kehittaja': koodi, origin: 'https://ravelius.github.io' },
        body: JSON.stringify({ tehtava: 'kuva', prompti: t.prompti, koko: 'vaaka' }),
      });
      const j = await r.json();
      if (r.status === 429) { console.error('PAIVARAJA', t.tiedosto); process.exit(2); }
      if (!r.ok || !j?.kuva) throw new Error(`${r.status} ${j?.viesti ?? ''}`);
      writeFileSync(polku, Buffer.from(j.kuva, 'base64'));
      console.log('OK', t.tiedosto);
      onnistui = true;
    } catch (e) {
      console.error(`yritys ${y + 1} ${t.tiedosto}:`, String(e.message).slice(0, 120));
      await new Promise((s) => setTimeout(s, 8000 * (y + 1)));
    }
  }
  if (!onnistui) console.error('EPAONNISTUI', t.tiedosto);
}
console.log('ERA VALMIS');
