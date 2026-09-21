/*
 * Tähtitaivas-linssi (js/linssit/tahtitaivas-laskenta.js, tahtitaivas.js):
 * tähtiaika, korkeus/atsimuutti, kupuprojektio (itä vasemmalla),
 * kirkkausrajat, näkyvät tähdistöt, Livian kysymys, pelin tp-palkkio,
 * rekisteri ja näkyvä attribuutio.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  HORISONTIN_VARA_AST, KIRKKAUSRAJAT, LIVIAN_KYSYMYKSET, PALAUTE_OIKEIN, PALAUTE_VAARIN, arvoKysymys, kirkkausraja,
  korkeusJaAtsimuutti, kuvioPisteesta, kuvulle, nakyvatKuviot, nakyvatTahdet, palaute, tahtiHr, tahtiaika,
} from '../js/linssit/tahtitaivas-laskenta.js';
import { LINSSI } from '../js/linssit/tahtitaivas.js';
import { Game, XP_TAHTITAIVAS } from '../js/game.js';
import { packById } from '../js/pack.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';

const MARSEILLE = { lat: 43.3, lon: 5.37 };
const ILTA = Date.UTC(2026, 8, 21, 20, 40);
const KUPU = { cx: 200, cy: 200, R: 180 };

test('tähtiaika: J2000-hetkellä Greenwichissä 280,46°; pituusaste lisätään', () => {
  assert.ok(Math.abs(tahtiaika(Date.UTC(2000, 0, 1, 12), 0) - 280.4606) < 0.01);
  assert.ok(Math.abs(tahtiaika(Date.UTC(2000, 0, 1, 12), 10) - 290.4606) < 0.01);
});

test('korkeus ja atsimuutti: Sirius kulminoi etelässä 90 − |φ − δ|, Pohjantähti leveysasteen korkeudella pohjoisessa', () => {
  const sirius = tahtiHr(2491);
  const s = korkeusJaAtsimuutti(sirius.ra, sirius.dec, MARSEILLE.lat, sirius.ra);
  assert.ok(Math.abs(s.h - (90 - Math.abs(MARSEILLE.lat - sirius.dec))) < 0.05);
  assert.ok(Math.abs(s.A - 180) < 0.05);
  const polaris = tahtiHr(424);
  assert.equal(polaris.nimi, 'Polaris');
  const p = korkeusJaAtsimuutti(polaris.ra, polaris.dec, MARSEILLE.lat, 0);
  assert.ok(Math.abs(p.h - MARSEILLE.lat) < 1);
  assert.ok(p.A < 1 || p.A > 359);
});

test('kupu: zeniitti keskellä, horisontti kehällä, pohjoinen ylhäällä ja itä VASEMMALLA', () => {
  const z = kuvulle(90, 0, 200, 200, 180);
  assert.ok(Math.abs(z.x - 200) < 1e-9 && Math.abs(z.y - 200) < 1e-9);
  const n = kuvulle(0, 0, 200, 200, 180);
  assert.ok(Math.abs(n.x - 200) < 1e-9 && Math.abs(n.y - 20) < 1e-9, 'pohjoinen ylhäällä');
  const e = kuvulle(0, 90, 200, 200, 180);
  assert.ok(Math.abs(e.x - 20) < 1e-9, 'itä vasemmalla');
});

test('kirkkausrajat: 1873 4,5; nyt 3,5; suurkaupunki 2,5 — ja tähtiä näkyy sen mukaan', () => {
  assert.equal(kirkkausraja('1873', 'pariisi'), KIRKKAUSRAJAT[1873]);
  assert.equal(kirkkausraja('nyt', 'marseille'), 3.5);
  assert.equal(kirkkausraja('nyt', 'pariisi'), 2.5);
  const t1873 = nakyvatTahdet({ ...MARSEILLE, hetkiMs: ILTA, magRaja: 4.5, ...KUPU });
  const tNyt = nakyvatTahdet({ ...MARSEILLE, hetkiMs: ILTA, magRaja: 2.5, ...KUPU });
  assert.ok(t1873.length > 300 && t1873.length < 700, `1873: ${t1873.length}`);
  assert.ok(tNyt.length > 15 && tNyt.length < 80, `nyt: ${tNyt.length}`);
  assert.ok(t1873.every((t) => t.h >= HORISONTIN_VARA_AST && t.mag <= 4.5));
});

test('näkyvät tähdistöt: 2/3 tähdistä horisontin yllä ja kirkkain rajan sisällä; napautus löytää tähdistön', () => {
  const kuviot = nakyvatKuviot({ ...MARSEILLE, hetkiMs: ILTA, magRaja: 4.5, ...KUPU });
  assert.ok(kuviot.length >= 20 && kuviot.length <= 50, String(kuviot.length));
  // Kassiopeia on Marseillesta (43° N) sirkumpolaarinen: aina horisontin yllä.
  const cas = kuviot.find((k) => k.kuvio.lyhenne === 'Cas');
  assert.ok(cas, 'Kassiopeia näkyy Marseillesta syyskuun iltana');
  const p = cas.pisteet.find((x) => x.h > HORISONTIN_VARA_AST);
  assert.equal(kuvioPisteesta(kuviot, p.x + 3, p.y - 3)?.kuvio.lyhenne, 'Cas');
  assert.equal(kuvioPisteesta(kuviot, -500, -500), null);
});

test('Livian kysymys: Fablen sanatarkat lauseet, 4 näkyvää tähdistöä, kirkkaat ensin, ei juuri kysyttyä', () => {
  assert.equal(LIVIAN_KYSYMYKSET[0].teksti, 'Katso, sytytin sinulle yhden tähdistön. Kirjekyyhky suunnistaa näiden mukaan öisin, joten minä tiedän nimen. Tiedätkö sinä?');
  assert.equal(LIVIAN_KYSYMYKSET[1].teksti, 'Isoisäsi olisi nimennyt tämän latinaksi ja mitannut sen korkeuden. Sinulle riittää nimi: mikä tähdistö?');
  assert.equal(LIVIAN_KYSYMYKSET[2].teksti, 'Tämä kuvio näkyi täällä vuonna 1873 ja näkyy yhä, jos katulamput sammuttaa. Minkä niminen?');
  assert.equal(PALAUTE_OIKEIN, 'Aivan, {TÄHDISTÖ}. Sen alla lentää kotiin vaikka silmät kiinni.');
  assert.equal(PALAUTE_VAARIN, 'Ei, se on {TÄHDISTÖ}. Katso viivoja vielä kerran, ensi yönä tunnistat sen.');
  const kuviot = nakyvatKuviot({ ...MARSEILLE, hetkiMs: ILTA, magRaja: 4.5, ...KUPU });
  const q = arvoKysymys(kuviot, { arpa: () => 0.2, jarjestys: 1 });
  assert.equal(q.vaihtoehdot.length, 4);
  assert.ok(q.vaihtoehdot.includes(q.oikea.kuvio));
  assert.ok(q.oikea.kirkkain <= 3.0, 'kirkas kuvio ensin');
  assert.equal(q.kysymys, LIVIAN_KYSYMYKSET[1]);
  const q2 = arvoKysymys(kuviot, { arpa: () => 0.2, kysytyt: new Set([q.oikea.kuvio.lyhenne]) });
  assert.notEqual(q2.oikea.kuvio.lyhenne, q.oikea.kuvio.lyhenne);
  assert.equal(palaute(true, { suomi: 'Iso karhu' }), 'Aivan, Iso karhu. Sen alla lentää kotiin vaikka silmät kiinni.');
  assert.equal(arvoKysymys(kuviot.slice(0, 2)), null);
});

test('peli: oikea tähdistö tuo XP_TAHTITAIVAS tp ja aid-kuplan, väärä ei mitään', () => {
  const game = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 3 });
  game.phase = 'action';
  const p = game.player;
  const xp0 = p.xp ?? 0;
  assert.equal(game.vastaaTahtitaivaaseen(p, false, { tahdisto: 'Otava' }), 0);
  assert.equal(game.vastaaTahtitaivaaseen(p, true, { tahdisto: 'Otava' }), XP_TAHTITAIVAS);
  assert.equal(p.xp, xp0 + XP_TAHTITAIVAS);
  assert.equal(game.events.find((e) => e.tilanne === 'peli.tahtitaivas.oikein')?.sub, 'Otava');
});

test('linssisopimus: tunnus tahdet, Horation kortti, näkyvä attribuutio (BSC/CDS, ConstellationLines CC BY 4.0 + BY-SA-ristiriita, IAU CC BY)', () => {
  assert.equal(LINSSI.tunnus, 'tahdet');
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  assert.match(LINSSI.kortti, /^Laivastossa tähdet olivat työkaluja/);
  assert.match(LINSSI.kortti, /762 mmHg, kello 22\.40/);
  assert.match(LINSSI.lahde.aineisto, /Yale Bright Star Catalogue/);
  assert.match(LINSSI.lahde.aineisto, /ConstellationLines/);
  assert.match(LINSSI.lahde.aineisto, /IAU Catalog of Star Names/);
  assert.match(LINSSI.lahde.lisenssi, /CDS/);
  assert.match(LINSSI.lahde.lisenssi, /ConstellationLines: CC BY 4\.0/);
  assert.match(LINSSI.lahde.lisenssi, /BY-SA 4\.0 — ristiriita/);
  assert.match(LINSSI.lahde.lisenssi, /IAU-CSN: CC BY/);
  const rivi = LINSSIT.find((r) => r.tunnus === 'tahdet');
  assert.equal(rivi.tila, undefined);
  assert.equal(rivi.ikoni, 'assets/linssit/ikonit/linssi-tahdet.webp');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.match(sw, /'\.\/js\/linssit\/tahtitaivas\.js'/);
  assert.match(sw, /'\.\/js\/linssit\/tahtitaivas-laskenta\.js'/);
});
