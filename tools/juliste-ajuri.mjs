/*
 * Julistesarjan ajuri: generoi valitun työlistan välin [alku, loppu)
 * tuotantospeksin promptilla. Ohittaa valmiit; pysähtyy päivärajaan.
 * Käyttö: node aja.mjs <tyolista 1|2> <alku> <loppu>
 */
import { writeFileSync, existsSync } from 'fs';
const koodi = process.env.POLLO_KEHITTAJAKOODI;
const { POLLOPALVELIN } = await import('/home/user/Matkakirja/js/packs/pollo-asetukset.js');
const osa = process.argv[2] === '2' ? '2' : '1';
const { TYOLISTA } = await import(`./juliste-tyolista-${osa}.mjs`);

const TYYLI = `Style: 19th century COPPER ENGRAVING — extremely fine parallel hatching and cross-hatching build every tone, single dark sepia ink on cream laid paper, crisp burin lines, a thin ruled frame and plate mark near the edges, generous quiet sky; the discipline of an antique atlas vignette. Avoid: photorealism, flat gray washes, gradients, colour, softness, any modern object.`;

const runko = (t) => `Create a premium vertical 4:5 travel poster of ${t.sommittelu}. Composition clean and sophisticated.

Typography: at the top, the name ${t.nimi} in large elegant engraved capitals, and directly below it, much smaller, the year ${t.vuosi} — and NO OTHER TEXT ANYWHERE on the poster: no tagline, no advertisement, no labels, no imprint.

${TYYLI}`;

const alku = Number(process.argv[3] ?? 0);
const loppu = Number(process.argv[4] ?? TYOLISTA.length);

for (const t of TYOLISTA.slice(alku, loppu)) {
  if (existsSync(t.tiedosto)) { console.log('OHITETTU', t.tiedosto); continue; }
  let onnistui = false;
  for (let y = 0; y < 3 && !onnistui; y++) {
    try {
      const r = await fetch(POLLOPALVELIN, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-pollo-kehittaja': koodi, origin: 'https://ravelius.github.io' },
        body: JSON.stringify({ tehtava: 'kuva', prompti: runko(t), koko: 'pysty' }),
      });
      const j = await r.json();
      if (r.status === 429) { console.error('PAIVARAJA', t.tiedosto); process.exit(2); }
      if (!r.ok || !j?.kuva) throw new Error(`${r.status} ${j?.viesti ?? ''}`);
      writeFileSync(t.tiedosto, Buffer.from(j.kuva, 'base64'));
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
