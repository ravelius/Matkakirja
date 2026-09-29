/*
 * Voudin sinetin etsinnän eheys (elävä linna, erä 2, 29.9.2026): RAKENNUS.etsinnat ↔ tilojen etsinta[]-vaiheet ↔
 * esineet[] ↔ hahmot. Käsikirjoitus kohta 4 (Päätoimittaja): keittiö → kappeli → fatabuuri, löytö vaatearkusta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { RAKENNUS } from '../js/dioraama/rakennukset/olavinlinna.js';
import { RESEPTIT } from '../tools/dioraama/reseptit.mjs';
import { sijoitaTila } from '../tools/dioraama/sijoitus.mjs';

const piste = (p) => Array.isArray(p) && p.length === 3 && p.every(Number.isFinite);
const tila = (id) => RAKENNUS.tilat.find((t) => t.id === id);

test('etsinnät: jokaisella vaiheella on oma tila järjestyksessä, ja tyypit ovat repliikki/vihje/loyto', () => {
  assert.ok(Array.isArray(RAKENNUS.etsinnat) && RAKENNUS.etsinnat.length > 0);
  for (const e of RAKENNUS.etsinnat) {
    assert.ok(e.id && e.nimi && e.kuvaus, `${e.id}: id, nimi ja kuvaus`);
    assert.equal(e.kortti?.kohdat?.length > 0, true, `${e.id}: löytökortissa faktoja`);
    for (const k of e.kortti.kohdat) assert.ok(k.teksti.length <= 110 && k.lahde, `${e.id}: kortin kohta ≤ 110 merkkiä + lähde`);
    e.vaiheet.forEach((tid, i) => {
      const t = tila(tid);
      assert.ok(t, `${e.id}: vaiheen ${i + 1} tila '${tid}' puuttuu`);
      const v = (t.etsinta ?? []).filter((x) => x.etsinta === e.id);
      assert.equal(v.length, 1, `${tid}: täsmälleen yksi ${e.id}-vaihe`);
      assert.equal(v[0].vaihe, i + 1, `${tid}: vaihenumero`);
      assert.ok(['repliikki', 'vihje', 'loyto'].includes(v[0].tyyppi), `${tid}: tyyppi ${v[0].tyyppi}`);
      assert.equal(v[0].tyyppi === 'loyto', i === e.vaiheet.length - 1, `${tid}: löytö on viimeinen vaihe`);
      assert.ok(piste(v[0].kohde) && v[0].sade > 0, `${tid}: kohde ja sade`);
    });
  }
});

test('etsinnät: repliikkivaiheen hahmo, vihjeen teksti ja löydön kansi/esine ratkeavat', () => {
  for (const t of RAKENNUS.tilat) {
    for (const v of t.etsinta ?? []) {
      if (v.tyyppi === 'repliikki') {
        assert.ok((t.hahmot ?? []).some((h) => h.id === v.hahmo), `${t.id}: hahmo '${v.hahmo}' puuttuu`);
        assert.ok(v.repliikki?.id && v.repliikki.teksti, `${t.id}: repliikki`);
      }
      if (v.tyyppi === 'vihje') assert.ok(v.teksti, `${t.id}: vihjeen teksti`);
      if (v.tyyppi === 'loyto') {
        const ids = new Set((t.esineet ?? []).map((e) => e.id));
        assert.ok(ids.has(v.kansi) && ids.has(v.esine), `${t.id}: kansi '${v.kansi}' ja esine '${v.esine}' esineissä`);
      }
    }
  }
});

test('esineet: reseptit tunnetaan, id:t yksilöllisiä, sarana 3 lukua, ja sijoitus siirtää esineet tilan mukana', () => {
  for (const t of RAKENNUS.tilat) {
    const e = t.esineet ?? [];
    assert.equal(new Set(e.map((x) => x.id)).size, e.length, `${t.id}: esine-id:t yksilöllisiä`);
    for (const x of e) {
      assert.ok(RESEPTIT[x.resepti], `${t.id}/${x.id}: resepti '${x.resepti}'`);
      assert.ok(piste(x.paikka), `${t.id}/${x.id}: paikka`);
      if (x.sarana) assert.ok(piste(x.sarana) && x.avaa > 0 && x.avaa <= 180, `${t.id}/${x.id}: sarana ja avaa`);
    }
    if (e.length && t.sijoitus) {
      const s = sijoitaTila(t);
      assert.notDeepEqual(s.esineet[0].paikka, e[0].paikka, `${t.id}: esineen paikka muuntuu sijoituksessa`);
      assert.equal(s.esineet[0].paikka[1], Math.round((e[0].paikka[1] + t.sijoitus.paikka[1]) * 1e6) / 1e6);
    }
  }
});

test('fatabuuri on vaate- ja tavara-aitta: ei tynnyreitä, säkkejä eikä suolakalaa (Sisältökirjuri era4)', () => {
  const f = tila('fatabuuri');
  const reseptit = new Set(f.palikat.map((p) => p.resepti));
  for (const kielletty of ['tynnyri', 'sakki', 'suolalaatikko', 'kala', 'orsileivat']) {
    assert.ok(!reseptit.has(kielletty), `fatabuuri: '${kielletty}' ei kuulu vaateaittaan`);
  }
  for (const vaadittu of ['arkku', 'kangaspakka', 'vaatepino', 'vaateorsi']) assert.ok(reseptit.has(vaadittu), vaadittu);
});

test('yhteensopivuus natiivi 1.0.57: ei elava.reittiä; elävän linnan kävelijät ovat hahmoja lyhtyineen (Siirtoseppä 29.9.)', () => {
  for (const t of RAKENNUS.tilat) assert.ok(!t.elava?.reitti, `${t.id}: elava.reitti kaataa natiivin 1.0.57 (käytä hahmot[] + lyhty)`);
  for (const [tid, hid] of [['muurinharja', 'vartija'], ['laituri', 'renki']]) {
    const h = tila(tid).hahmot.find((x) => x.id === hid);
    assert.ok(h?.lyhty === true && h.reitti?.pisteet?.length >= 2 && h.silmukka, `${tid}/${hid}: kävelijä lyhdyn kanssa`);
  }
});
