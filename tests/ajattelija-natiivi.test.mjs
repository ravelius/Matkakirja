// Ajattelijat natiiviin ilman webiä (omistaja 3.10.2026 klo 19.00): sisältö data/ajattelijat/<tunnus>.json:ssa, aikajana
// Linnanrakentajan luvuista (tools/ajattelija-aikajana-luvut.mjs), atlas tools/ajattelija-atlas-selain.js:llä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { aikajanaLuvuista } from '../tools/ajattelija-aikajana-luvut.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const tiedostot = readdirSync(new URL('../data/ajattelijat/', import.meta.url)).filter((f) => f.endsWith('.json'));

test('jokaisella ajattelijalla on sisältö ja ohje aikajanan luvuille', () => {
  assert.deepEqual(tiedostot.sort(), ['marcus.json', 'sokrates.json']);
  for (const f of tiedostot) {
    const a = JSON.parse(lue(`../data/ajattelijat/${f}`));
    assert.equal(`${a.tunnus}.json`, f);
    assert.ok(a.paalauseet && a.taustavirta?.rivit?.length && a.fontit && a.prologi?.valot?.length, a.tunnus);
    const l = a.aikajana.luvut;
    assert.match(l.versio, /^[0-9a-f]{7,40}$/, `${a.tunnus}: luvut.versio`);
    assert.match(l.tiedosto, /^docs\/raportit\/ajattelijat-v11\/[a-z]+-luvut-v\d+\.json$/);
    // Generoitu osa ei kuulu sisältöön (tulee luvuista); sisällössä vain omat asetukset.
    for (const k of ['kamera', 'aurinko', 'tykit', 'kaiut', 'virta']) assert.ok(!(k in a.aikajana), `${a.tunnus}: ${k}`);
    assert.ok(a.aikajana.aani?.puhe && a.aikajana.lauseKortti?.merkkeja, a.tunnus);
  }
});

test('aikajana luvuista on kirjasto: sama muunnos CLI:lle ja natiivin muuntimelle', () => {
  const luvut = {
    kamera: [{ ruutu: 1, sijainti: [0, -1, 0.4], kohde: [0, 0, 0.4], mm: 35, tapa: 'BEZIER' }],
    aurinko: [{ ruutu: 1, sijainti: [1, 0, 1], energia: 10 }], aurinko_kohde: [0, 0, 0.4],
    valot: { 'virta-0': { energia_avaimet: [[1, 0], [10, 2], [20, 2]] } },
    v13: { lainaukset: [], kaiut: [], efektit: [], loppu: 30, kertoja_alkaa_s: 9.5, kappaleet_s: {} },
  };
  const aj = aikajanaLuvuista(luvut, { lahdeNimi: 'testi' });
  assert.equal(aj.lahde, 'testi');
  assert.deepEqual(aj.virta, [[10, 1], [20, 1]]);
  assert.match(lue('../tools/ajattelija-aikajana.mjs'), /import \{ aikajanaLuvuista \} from '\.\/ajattelija-aikajana-luvut\.mjs';/);
  const natiivi = lue('../tools/ajattelija-natiivi.mjs');
  assert.match(natiivi, /return \{ \.\.\.s, aikajana: \{ \.\.\.gen, \.\.\.omat \} \};/);   // generoitu ensin kuten webissä
  assert.match(natiivi, /await import\('\/atlas\.js'\)/);
  // Kaikukuvien lähteet luvuista ajattelijan juureen (natiivi AjattelijaData.Kuvalahteet, 4.10.2026).
  assert.match(natiivi, /const kuvalahteet = \(d\.v13\?\.kaiut \?\? \[\]\)\.filter\(\(k\) => k\.lahde\)\.map\(\(k\) => \(\{ kuva: k\.kuva, \.\.\.k\.lahde \}\)\);/);
  assert.match(lue('../tools/ajattelija-atlas-selain.js'), /export function piirraAtlas\(rivit, doc = document\)/);
});

test('ajattelijaputki: puuttuvat syötteet roolin mukaan, ei arvausta; resepti uudelle ajattelijalle ilman koodimuutosta', async () => {
  const { spawnSync } = await import('node:child_process');
  const ajo = spawnSync('node', [new URL('../tools/ajattelija-putki.mjs', import.meta.url).pathname, 'testiajattelija-ei-ole'], { encoding: 'utf8' });
  assert.equal(ajo.status, 1);
  for (const rooli of ['Sisältökirjuri', 'Linssiseppä', 'Linnanrakentaja', 'Codex / Sisältökirjuri']) assert.match(ajo.stderr, new RegExp(`  ${rooli}:`));
  assert.match(ajo.stderr, /putki pysähtyy, mitään ei arvata/);
  const putki = lue('../tools/ajattelija-putki.mjs');
  for (const vaihe of ['ajattelija-aaniraita.mjs', 'ajattelija-syke.py', 'ajattelija-natiivi.mjs', 'vie-paketti.sh']) assert.ok(putki.includes(vaihe), vaihe);
  assert.match(lue('../tools/ajattelija-aaniraita.mjs'), /const R = RESEPTIT\[AJATTELIJA\] \?\? YLEINEN;/);
  for (const f of ['sokrates', 'marcus']) {
    const p = JSON.parse(lue(`../data/ajattelijat/putki/${f}.json`));
    assert.ok(p.kertoja.tiedosto && p.kertoja.ajat && p.musiikki.tiedosto && p.efektit.kansio && Number.isFinite(p.vaimennusDb), f);
  }
});
