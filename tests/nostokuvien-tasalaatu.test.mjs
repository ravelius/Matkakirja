/*
 * PARIISIN NOSTOKUVIEN TASALAATU (K-3; KK:N PÄÄTÖS 20.11.2026 klo 09.18, aiempi: P-261120-5, P-261117-119, P-261118-14;
 * omistaja 08.41: "kaikissa on riittävästi kodeksilta tilattuja kuvia tai sitten oikeita valokuvia kuvaamaan tekstiä").
 * Pariisin 46 nostoa: 3–4 kuvaa, viimeinen valokuva, jokaisella kuvalla laji, lyhyt, lahde, tekijä ja lisenssi omina
 * kenttinään, mitat 1200 × 800, havainnekuvan lähderivi alkaa "Tekoälyllä tuotettu havainnekuva" (tools/sisalto/nostokuvien-tarkistus.mjs).
 * Nykyiset rikkeet ovat lähtöluettelossa, joka saa vain pienentyä: uusi rike kaataa, ja korjattu rike pitää poistaa luettelosta
 * (node tools/sisalto/nostokuvien-tarkistus.mjs --json). Yleinen katto 7 (tests/noston-jaksot.test.mjs) koskee muita kaupunkeja.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { lisakentatViennissa, NOSTOKUVA_LISAKENTAT } from '../tools/vienti/nostokuvat.mjs';
import { laskeRikkeet, kuvienRikkeet, lajeittain, RIKKEET, KUVIA, HAVAINNE_ALKU } from '../tools/sisalto/nostokuvien-tarkistus.mjs';

const LUETTELO = 'docs/raportit/pariisin-nostokuvat-rikkeet-lahto-20261120.json';
const lahto = JSON.parse(readFileSync(new URL(`../${LUETTELO}`, import.meta.url), 'utf8'));
lisakentatViennissa(true);
const { tiedostot } = await kokoaVienti();
const rivit = await laskeRikkeet({ tiedostot });

test('Pariisin 46 nostoa: A 13, B 4, C 14, D 9, F 6, tunnukset kerran', () => {
  assert.equal(rivit.length, 46);
  assert.equal(new Set(rivit.map((r) => r.id)).size, 46);
  const ryhmat = Object.fromEntries(['A', 'B', 'C', 'D', 'F'].map((g) => [g, rivit.filter((r) => r.ryhma === g).length]));
  assert.deepEqual(ryhmat, { A: 13, B: 4, C: 14, D: 9, F: 6 });
});

test('rikkeet vain lähtöluettelosta, ja luettelo pienenee korjausten mukana', () => {
  const uudet = [], korjatut = [];
  for (const r of rivit) {
    const ennen = new Set(lahto.nostot[r.id]?.rikkeet ?? []);
    for (const x of r.rikkeet) if (!ennen.has(x)) uudet.push(`${r.id}: ${x}`);
    for (const x of ennen) if (!r.rikkeet.includes(x)) korjatut.push(`${r.id}: ${x}`);
  }
  for (const id of Object.keys(lahto.nostot)) if (!rivit.some((r) => r.id === id)) korjatut.push(`${id}: ei enää Pariisin nostoissa`);
  assert.deepEqual(uudet, [], `uusi rike (korjaa kuva tai data): ${uudet.join('; ')}`);
  assert.deepEqual(korjatut, [], `korjattu: poista luettelosta ${LUETTELO} (node tools/sisalto/nostokuvien-tarkistus.mjs --json)`);
  assert.equal(lahto.nostoja, 46);
  assert.equal(lahto.rikkovia, Object.keys(lahto.nostot).length);
  assert.deepEqual(lahto.lajeittain, lajeittain(rivit), 'luettelon lajeittain-luvut');
});

test('tarkistus: hyvä sarja läpi, jokainen rike erikseen', () => {
  const kuva = (laji, lisat = {}) => ({ osoite: 'https://media.matkakirja.app/kuvat/x.jpg', lyhyt: 'Paikka 1900', laji,
    lahde: laji === 'havainnekuva' ? `${HAVAINNE_ALKU}; viitteet …` : 'Tekijä, Wikimedia Commons (CC BY-SA 4.0), rajattu',
    lisenssi: 'CC BY-SA 4.0', mista: 'nosto', tekija: 'Tekijä', leveys: 1200, korkeus: 800, ...lisat });
  const hyva = [kuva('maalaus'), kuva('havainnekuva'), kuva('valokuva'), kuva('valokuva')];
  assert.deepEqual(kuvienRikkeet(hyva), []);
  assert.deepEqual(kuvienRikkeet(hyva.slice(1)), [], '3 riittää');
  assert.deepEqual(kuvienRikkeet(hyva.slice(2)), ['vajaa']);
  assert.deepEqual(kuvienRikkeet([kuva('maalaus'), ...hyva]), ['liikaa']);
  assert.deepEqual(kuvienRikkeet([...hyva.slice(0, 3), kuva('maalaus')]), ['viimeinen']);
  assert.deepEqual(kuvienRikkeet([kuva('juliste'), ...hyva.slice(1)]), ['laji']);
  for (const k of ['lyhyt', 'lahde', 'tekija', 'lisenssi']) {
    const r = kuvienRikkeet([kuva('maalaus', { [k]: null }), ...hyva.slice(1)]);
    assert.ok(r.includes(k), `${k}: ${r}`);
  }
  assert.deepEqual(kuvienRikkeet([kuva('maalaus', { leveys: 1280, korkeus: 853 }), ...hyva.slice(1)]), ['mitat']);
  assert.deepEqual(kuvienRikkeet([kuva('maalaus', { leveys: undefined, korkeus: undefined }), ...hyva.slice(1)]), ['mitat']);
  assert.deepEqual(kuvienRikkeet([kuva('havainnekuva', { lahde: 'Matkakirjan havainnekuva' }), ...hyva.slice(1)]), ['havainne']);
  assert.deepEqual(kuvienRikkeet([]), ['vajaa', 'viimeinen']);
  assert.equal(KUVIA.max, 4);
  assert.deepEqual(RIKKEET, ['vajaa', 'liikaa', 'viimeinen', 'laji', 'lyhyt', 'lahde', 'tekija', 'lisenssi', 'mitat', 'havainne']);
});

test('vienti kantaa tekijän ja mitat omina kenttinään vanhojen perässä (vanha peli lukee vanhat kentät)', () => {
  const VANHAT = ['osoite', 'lyhyt', 'laji', 'lahde', 'lisenssi', 'mista'];
  const kuvat = JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot.flatMap((a) => a.nostokuvat ?? []);
  const virheet = kuvat.filter((k) => JSON.stringify(Object.keys(k).slice(0, 6)) !== JSON.stringify(VANHAT)
    || Object.keys(k).slice(6).some((x) => !NOSTOKUVA_LISAKENTAT.includes(x)));
  assert.deepEqual(virheet.slice(0, 5), []);
  const tekijalla = kuvat.filter((k) => 'tekija' in k);
  assert.ok(tekijalla.length > 0 && tekijalla.every((k) => typeof k.tekija === 'string' && k.tekija), 'datan tekijä vientiin');
  assert.ok(kuvat.every((k) => ('leveys' in k) === ('korkeus' in k)), 'mitat parina');
});
