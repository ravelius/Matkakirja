/*
 * Lippuarvaus-linssi (js/linssit/lippuarvaus-peli.js, lippuarvaus.js):
 * lippumaat laudalta, Euroopan rajaus, naapurivaihtoehdot, kysymyksen
 * arvonta, Fablen repliikit, pelin tp-palkkio ja rekisteririvi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LIVIAN_KYSYMYKSET, PALAUTE_OIKEIN, PALAUTE_VAARIN, VAIHTOEHTOJA, arvoKysymys, etaisyysAst, euroopassa,
  lippumaat, palaute, sekoita, vaihtoehdot,
} from '../js/linssit/lippuarvaus-peli.js';
import { LINSSI } from '../js/linssit/lippuarvaus.js';
import { Game, XP_LIPPUARVAUS } from '../js/game.js';
import { packById } from '../js/pack.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LIPUT_PAIKALLISET } from '../js/packs/liput-paikalliset.js';

const pack = packById('maailmankartta');
const maat = lippumaat(pack);
const eurooppa = maat.filter(euroopassa);
const by = (iso) => maat.find((m) => m.iso === iso);

test('lippumaat: 135 maata laudalta asteina, jokaisella lippu repossa', () => {
  assert.equal(maat.length, 135);
  const fin = by('FIN');
  assert.equal(fin.nimi, 'Suomi');
  assert.equal(fin.lippu, 'Flag of Finland.svg');
  assert.ok(Math.abs(fin.lat - 64) < 4 && Math.abs(fin.lon - 26) < 4, `Suomi ${fin.lat}, ${fin.lon}`);
  const puuttuu = maat.filter((m) => !LIPUT_PAIKALLISET.has(m.lippu)).map((m) => m.iso);
  assert.deepEqual(puuttuu, [], 'lippu puuttuu repon kansiosta');
});

test('eurooppa: 42 maata, Venäjä mukana, Syyria ja Georgia eivät', () => {
  assert.equal(eurooppa.length, 42);
  const isot = new Set(eurooppa.map((m) => m.iso));
  for (const iso of ['FIN', 'FRA', 'GBR', 'RUS', 'TUR', 'ISL', 'MLT']) assert.ok(isot.has(iso), iso);
  for (const iso of ['SYR', 'GEO', 'EGY', 'USA']) assert.ok(!isot.has(iso), iso);
});

test('vaihtoehdot: oikea + kolme lähintä naapuria sekoitettuna; Suomelle Viro, Ruotsi, Norja', () => {
  const v = vaihtoehdot(eurooppa, by('FIN'), () => 0.5);
  assert.equal(v.length, VAIHTOEHTOJA);
  assert.deepEqual(new Set(v.map((m) => m.iso)), new Set(['FIN', 'EST', 'SWE', 'NOR']));
  assert.ok(etaisyysAst(by('FIN'), by('EST')) < etaisyysAst(by('FIN'), by('PRT')));
  assert.deepEqual(sekoita([1, 2, 3], () => 0), [2, 3, 1]);
  assert.equal(new Set(sekoita([1, 2, 3, 4], () => 0.7)).size, 4);
});

test('arvoKysymys: ruudulla olevista, ei juuri kysyttyä, tekstit vuorotellen, vaihtoehdot joukosta', () => {
  const ruudulla = [by('FIN'), by('SWE')];
  const q0 = arvoKysymys(eurooppa, ruudulla, { kysytyt: new Set(['FIN']), jarjestys: 0, arpa: () => 0 });
  assert.equal(q0.maa.iso, 'SWE', 'FIN on kysytty → SWE');
  assert.equal(q0.kysymys, LIVIAN_KYSYMYKSET[0]);
  assert.ok(q0.vaihtoehdot.some((m) => m.iso === 'SWE'));
  assert.ok(q0.vaihtoehdot.every((m) => euroopassa(m)));
  const q1 = arvoKysymys(eurooppa, [], { jarjestys: 4 });
  assert.equal(q1.kysymys, LIVIAN_KYSYMYKSET[1]);
  assert.ok(eurooppa.some((m) => m.iso === q1.maa.iso), 'tyhjä ruutu → koko joukosta');
  assert.equal(arvoKysymys([by('FIN')], []), null, 'yksi maa ei riitä');
});

test('Livian repliikit ovat Fablen sanatarkat; kysymyksessä ei nimeä, palautteessa on', () => {
  assert.equal(LIVIAN_KYSYMYKSET.length, 3);
  assert.equal(LIVIAN_KYSYMYKSET[0].teksti, 'Tämä lippu liehui juuri lentoreittini alla. Minkä maan se on? Vihje: naapurit ovat tarjolla vaihtoehtoina, ja ne ovat siellä vain hämäämässä.');
  assert.equal(LIVIAN_KYSYMYKSET[1].teksti, 'Kirjekyyhky tunnistaa lipun kauempaa kuin sinä katedraalin. Kokeile silti: kenen värit?');
  assert.equal(LIVIAN_KYSYMYKSET[2].teksti, 'Isoisäsi olisi piirtänyt tämän lipun väärän maan kohdalle. Sinä tiedät paremmin, eikö niin?');
  assert.ok(LIVIAN_KYSYMYKSET.every((k) => !k.teksti.includes('{MAA}')));
  assert.equal(PALAUTE_OIKEIN, 'Aivan. {MAA}. Katso, siinä se välähtää pallolla.');
  assert.equal(PALAUTE_VAARIN, 'Läheltä liippasi, mutta ei. Se on {MAA}. Nyt tiedät, mihin suuntaan lentää.');
  assert.equal(palaute(true, by('FIN')), 'Aivan. Suomi. Katso, siinä se välähtää pallolla.');
  assert.equal(palaute(false, by('FRA')), 'Läheltä liippasi, mutta ei. Se on Ranska. Nyt tiedät, mihin suuntaan lentää.');
});

test('peli: oikea arvaus tuo XP_LIPPUARVAUS tp ja aid-kuplan, väärä ei mitään', () => {
  const game = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack, seed: 3 });
  game.phase = 'action';
  const p = game.player;
  const xp0 = p.xp ?? 0;
  assert.equal(game.vastaaLippuarvaukseen(p, false, { maa: 'Ranska' }), 0);
  assert.equal(p.xp ?? 0, xp0);
  assert.equal(game.vastaaLippuarvaukseen(p, true, { maa: 'Ranska' }), XP_LIPPUARVAUS);
  assert.equal(p.xp, xp0 + XP_LIPPUARVAUS);
  assert.equal(game.events.find((e) => e.tilanne === 'peli.lippuarvaus.oikein')?.sub, 'Ranska');
});

test('linssisopimus ja rekisteri: lippuarvaus on tavallinen pallolinssi Codexin ikonilla', () => {
  assert.equal(LINSSI.tunnus, 'lippuarvaus');
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  for (const k of ['nimi', 'lyhyt', 'ikoni', 'laudat', 'lahde']) assert.ok(LINSSI[k], k);
  const rivi = LINSSIT.find((r) => r.tunnus === 'lippuarvaus');
  assert.equal(rivi.tila, undefined);
  assert.equal(rivi.ikoni, 'assets/linssit/ikonit/linssi-lippuarvaus.webp');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.match(sw, /'\.\/js\/linssit\/lippuarvaus\.js'/);
  assert.match(sw, /'\.\/js\/linssit\/lippuarvaus-peli\.js'/);
});

test('jatkoerä: sarja ja ennätys, kartta-muodon kysymykset ilman vaihtoehtoja ja ilman "vaihtoehtoina"-vihjettä', async () => {
  const { NAPAUTUSKYSYMYKSET, NAPAUTUSOHJE, lueEnnatys, paivitaSarja, tallennaEnnatys, ENNATYS_AVAIN } = await import('../js/linssit/lippuarvaus-peli.js');
  let s = { sarja: 0, ennatys: 0 };
  s = paivitaSarja(s, true);
  assert.deepEqual(s, { sarja: 1, ennatys: 1, uusiEnnatys: true });
  s = paivitaSarja(s, true);
  assert.deepEqual(s, { sarja: 2, ennatys: 2, uusiEnnatys: true });
  s = paivitaSarja(s, false);
  assert.deepEqual(s, { sarja: 0, ennatys: 2, uusiEnnatys: false });
  s = paivitaSarja(s, true);
  assert.equal(s.uusiEnnatys, false, 'sarja 1 ei ylitä ennätystä 2');
  const varasto = new Map();
  const api = { getItem: (k) => varasto.get(k) ?? null, setItem: (k, v) => varasto.set(k, v) };
  assert.equal(lueEnnatys(api), 0);
  tallennaEnnatys(5, api);
  assert.equal(varasto.get(ENNATYS_AVAIN), '5');
  assert.equal(lueEnnatys(api), 5);
  assert.equal(lueEnnatys({ getItem: () => { throw new Error('yksityinen'); } }), 0);
  assert.equal(NAPAUTUSKYSYMYKSET.length, 2);
  assert.ok(NAPAUTUSKYSYMYKSET.every((k) => !/vaihtoehto/.test(k.teksti)));
  assert.equal(NAPAUTUSOHJE, 'Napauta maata pallolla.');
  const q = arvoKysymys(eurooppa, [by('FIN')], { muoto: 'kartta', jarjestys: 0 });
  assert.equal(q.muoto, 'kartta');
  assert.deepEqual(q.vaihtoehdot, []);
  assert.equal(q.kysymys, NAPAUTUSKYSYMYKSET[0]);
  const q2 = arvoKysymys(eurooppa, [by('FIN')], { muoto: 'nimet', jarjestys: 0 });
  assert.equal(q2.vaihtoehdot.length, 4);
});
