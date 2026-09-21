/*
 * Muuttolinnut-linssi (js/packs/linssi-muuttolinnut.js, js/linssit/
 * muuttolinnut-laskenta.js, muuttolinnut.js): taulukon eheys, parven
 * paikka kuukaudesta, Livian kysymys Fablen sanoin, pelin tp-palkkio
 * ja rekisteririvi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { KUUKAUDET, KUUKAUSIEN_NIMET, MUUTTOLINNUT } from '../js/packs/linssi-muuttolinnut.js';
import {
  LIVIAN_KYSYMYKSET, PALAUTE_OIKEIN, PALAUTE_VAARIN, arvoKysymys, kysymyksenTeksti, kysyttavatKuukaudet, palaute,
  parvenPaikka, reitinPisteet, tarkistaTaulukko,
} from '../js/linssit/muuttolinnut-laskenta.js';
import { LINSSI } from '../js/linssit/muuttolinnut.js';
import { Game, XP_MUUTTOLINNUT } from '../js/game.js';
import { packById } from '../js/pack.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';

const laji = (t) => MUUTTOLINNUT.find((l) => l.tunnus === t);

test('taulukko: kuusi lajia (Fablen lista), 12 kuukautta, maat laudalla, huomiot kirjoitettu', () => {
  assert.deepEqual(MUUTTOLINNUT.map((l) => l.tunnus), ['kurki', 'haarapaasky', 'tervapaasky', 'kiuru', 'valkoposkihanhi', 'kaki']);
  assert.deepEqual(tarkistaTaulukko(), []);
  const muodot = packById('maailmankartta').map.countryShapes;
  for (const l of MUUTTOLINNUT) {
    for (const p of l.reitti) assert.ok(muodot[p.maa], `${l.tunnus}: ${p.maa} puuttuu laudalta`);
    assert.ok(l.huomio && l.huomio.length > 40, `${l.tunnus}: huomio`);
    assert.ok(l.matkaKm > 1000 && l.matkaKm <= 10000);
    assert.equal(reitinPisteet(l).length, l.reitti.length);
  }
  assert.equal(KUUKAUDET.length, 12);
  assert.equal(KUUKAUSIEN_NIMET[9], 'lokakuu');
  assert.equal(KUUKAUDET[9], 'lokakuussa');
});

test('parven paikka: kurki heinäkuussa Suomessa, tammikuussa Etiopiassa, marraskuussa matkalla Turkin ja Etiopian välillä', () => {
  const kurki = laji('kurki');
  assert.equal(parvenPaikka(kurki, 6).maa, 'FIN');
  assert.equal(parvenPaikka(kurki, 0).maa, 'ETH');
  const matkalla = parvenPaikka(kurki, 10);
  assert.equal(matkalla.paikallaan, false);
  assert.equal(matkalla.mista.maa, 'TUR');
  assert.equal(matkalla.mihin.maa, 'ETH');
  assert.ok(matkalla.lat > 9 && matkalla.lat < 38.5);
  assert.equal(parvenPaikka(kurki, 12).maa, 'ETH', 'kuukausi kiertää');
  // Heinäkuussa kaikki Suomessa, tammikuussa kukaan ei.
  assert.ok(MUUTTOLINNUT.every((l) => parvenPaikka(l, 6).maa === 'FIN'));
  assert.ok(MUUTTOLINNUT.every((l) => parvenPaikka(l, 0).maa !== 'FIN' && parvenPaikka(l, 0).paikallaan));
  assert.ok(kysyttavatKuukaudet(laji('haarapaasky')).length >= 8);
});

test('Livian kysymys: Fablen sanatarkat lauseet, {LAJI}/{KUUKAUSI} täytetään, maa ei Suomi kun mahdollista', () => {
  assert.equal(LIVIAN_KYSYMYKSET[0].teksti, 'Tämä parvi on {LAJI}. Missä maassa se lepää {KUUKAUSI}? Napauta palloa. Minä olisin jo perillä, mutta minä en pysähdy syömään.');
  assert.equal(LIVIAN_KYSYMYKSET[1].teksti, 'Kirjekyyhkyllä on yksi koti, muuttolinnulla kaksi. {LAJI} on {KUUKAUSI} matkalla. Missä maassa se on juuri nyt?');
  assert.equal(LIVIAN_KYSYMYKSET[2].teksti, 'Isoisäsi laski kurkiauran satamasta ja merkitsi suunnan. Sinulle riittää maa: missä {LAJI} on {KUUKAUSI}?');
  assert.equal(PALAUTE_OIKEIN, 'Aivan, {MAA}. Sinne minäkin lentäisin, jos joku kantaisi eväät.');
  assert.equal(PALAUTE_VAARIN, 'Ei, {MAA}. Parvi ei eksy, sinä eksyit. Katso reitti vielä kerran.');
  assert.equal(kysymyksenTeksti(LIVIAN_KYSYMYKSET[2], laji('kurki'), 9), 'Isoisäsi laski kurkiauran satamasta ja merkitsi suunnan. Sinulle riittää maa: missä Kurki on lokakuussa?');
  assert.equal(palaute(true, 'Unkari'), 'Aivan, Unkari. Sinne minäkin lentäisin, jos joku kantaisi eväät.');
  for (let i = 0; i < 20; i += 1) {
    const q = arvoKysymys({ jarjestys: i });
    assert.ok(q.maa && q.maa !== 'FIN', `${q.laji.tunnus} ${q.kuukausi} → ${q.maa}`);
    assert.equal(parvenPaikka(q.laji, q.kuukausi).paikallaan, true);
  }
  const q = arvoKysymys({ kysytyt: new Set(['kurki', 'haarapaasky', 'tervapaasky', 'kiuru', 'valkoposkihanhi']), arpa: () => 0 });
  assert.equal(q.laji.tunnus, 'kaki');
  assert.equal(arvoKysymys({ lajit: [] }), null);
});

test('peli: oikea maa tuo XP_MUUTTOLINNUT tp ja aid-kuplan, väärä ei mitään', () => {
  const game = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 3 });
  game.phase = 'action';
  const p = game.player;
  const xp0 = p.xp ?? 0;
  assert.equal(game.vastaaMuuttolintuihin(p, false, { laji: 'Kurki', maa: 'Unkari' }), 0);
  assert.equal(game.vastaaMuuttolintuihin(p, true, { laji: 'Kurki', maa: 'Unkari' }), XP_MUUTTOLINNUT);
  assert.equal(p.xp, xp0 + XP_MUUTTOLINNUT);
  assert.equal(game.events.find((e) => e.tilanne === 'peli.muuttolinnut.oikein')?.sub, 'Kurki · Unkari');
});

test('linssisopimus ja rekisteri: muuttolinnut on tavallinen pallolinssi, Horation kortti, sw ja niputuslista', () => {
  assert.equal(LINSSI.tunnus, 'muuttolinnut');
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  assert.match(LINSSI.kortti, /^Kolmas lokakuuta, tuulinen/);
  assert.match(LINSSI.kortti, /163 astetta\.$/);
  assert.match(LINSSI.lahde.aineisto, /Luomuksen/);
  const rivi = LINSSIT.find((r) => r.tunnus === 'muuttolinnut');
  assert.equal(rivi.tila, undefined);
  assert.equal(rivi.ikoni, 'assets/linssit/ikonit/linssi-muuttolinnut.webp');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const p of ['js/linssit/muuttolinnut.js', 'js/linssit/muuttolinnut-laskenta.js', 'js/packs/linssi-muuttolinnut.js']) {
    assert.ok(sw.includes(`'./${p}'`), p);
  }
});
