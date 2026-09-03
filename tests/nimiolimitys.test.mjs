/*
 * POLTETUT NIMIÖT EIVÄT MENE TOISTENSA PÄÄLLE — EI MAAN SISÄLLÄ, EI
 * RAJAN YLI, EI ELÄINTÄYN KANSSA.
 *
 * OMISTAJAN HAVAINTO 3.9.2026 (Bulgaria, 100 km:n näkymä): *"Kırkpınar-
 * nosto limittyy toisen nimen kanssa."* Mitattuna koko maailmasta
 * (tools/tarkista-nimiolimitys.mjs) pareja oli 17: kuusi rajan kahta
 * puolta (kumpikin maa ladottiin omillaan), kahdeksan eläintäkyä
 * (täky latoutui omillaan nimiö aina oikealla) ja kolme viimeisen
 * oljen tapausta (kaikki neljä kylkeä osuivat nimiöön, ja väistö otti
 * oikean kyljen katsomatta). Korjaus on NOSTOLADONTA_SAANTO
 * 'v11-limitys' (js/nostoladonta.js), ja tämä testi on sen portti.
 *
 * ── MITÄ TÄMÄ TESTI TODISTAA ───────────────────────────────────────
 *
 *   1. Yksikään poltettava nimiö ei limity toisen poltettavan nimiön
 *      kanssa — laatikot samasta ladonnasta, jolla laatta poltetaan.
 *   2. Naapurimaan tynkä (js/fokuskohteet.js maanPoltetutMerkit)
 *      antaa jokaiselle merkille SAMAN nimiölaatikon kuin generaattori
 *      — eli saman kyljen. Kylki ei ole tiivisteessä, joten ilman tätä
 *      laatan nimiö ja pelin napautusalue voisivat erota huomaamatta.
 *   3. Eläintäyn kylki on sama funktio kummallekin lukijalle
 *      (js/elaintaky-rivit.js elaintakyNimioKylki).
 *
 * DOM-ITON JA VERKOTON: ladonta on laudan datan funktio.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import {
  KOHDE_SYMBOLI_SKAALA, maanLadontaEsteet, maanPoltetutMerkit,
} from '../js/fokuskohteet.js';
import { NOSTOLADONTA_S } from '../js/nostoladonta.js';
import { elaintakyNimioKylki } from '../js/elaintaky-rivit.js';
import {
  keraaNostot, laskeNimiolimitykset, limityksenLuokka,
} from '../tools/tarkista-nimiolimitys.mjs';

const pack = packById('maailmankartta');
const { merkit, luettelo } = keraaNostot(pack);
const onPoltettu = (tunnus, tiiviste) => luettelo[tunnus] === tiiviste;

test('yksikään poltettava nimiö ei ole toisen nimiön päällä', () => {
  const { rivit, nimioNimio } = laskeNimiolimitykset(merkit);
  assert.ok(rivit.length > 400, `poltettavia merkkejä vain ${rivit.length} — testin oletus vanhentui`);
  const rivi = ([a, b]) => `[${limityksenLuokka(a, b)}] ${a.iso}/${a.tunnus} + ${b.iso}/${b.tunnus}`;
  assert.deepEqual(nimioNimio.map(rivi), []);
});

test('naapurin tynkä latoo jokaisen nimiön samalle kyljelle kuin generaattori', () => {
  const eroja = [];
  let verrattu = 0;
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== pack.id) continue;
    const omat = new Map(merkit
      .filter((m) => m.perhe === 'nosto' && m.iso === iso && m.poltettava)
      .map((m) => [m.tunnus, m]));
    for (const rivi of maanPoltetutMerkit(pack, iso, pohja, onPoltettu)) {
      const m = omat.get(rivi.id);
      if (!m) continue;
      verrattu += 1;
      const odotus = m.nimioNakyy ? m.nimioPuoli : null;
      const saatu = rivi.nimio ? rivi.puoli : null;
      if (odotus !== saatu) eroja.push(`${iso}/${rivi.id}: generaattori ${odotus}, tynkä ${saatu}`);
    }
  }
  assert.ok(verrattu > 400, `verrattuja nimiöitä vain ${verrattu}`);
  assert.deepEqual(eroja, []);
});

test('eläintäyn kylki on sama päätös generaattorille ja elävälle kerrokselle', () => {
  const takyt = merkit.filter((m) => m.perhe === 'elaintaky');
  assert.ok(takyt.length >= 20, `eläintäkyjä vain ${takyt.length}`);
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  const eroja = [];
  let vaistettyja = 0;
  for (const m of takyt) {
    const kylki = elaintakyNimioKylki(m, porras, maanLadontaEsteet(pack, m.iso));
    if (kylki !== m.nimioPuoli) eroja.push(`${m.iso}: ${m.nimioPuoli} vs ${kylki}`);
    if (kylki !== 'oikea') vaistettyja += 1;
  }
  assert.deepEqual(eroja, []);
  // Ainakin yksi täky väistää: muuten sääntö olisi kuollut koodia.
  assert.ok(vaistettyja > 0, 'yksikään eläintäky ei väistänyt');
});
