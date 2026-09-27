/*
 * Pelikatalogin julkinen kopio pysyy md:n tahdissa (omistaja 27.9.2026:
 * pelikatalogi.html + pelikatalogi-data.js samalla mallilla kuin linssikatalogi).
 *
 * docs/pelikatalogi.md on lähde; pelikatalogi-data.js tuotetaan siitä
 * työkalulla tools/tee-pelikatalogi-data.mjs. Jos md muuttuu ilman
 * uudelleenajoa, ensimmäinen testi kaatuu ja kertoo korjauskomennon.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import {
  DATA_POLKU, MD_POLKU, jasennaPelikatalogi, muotoileData,
} from '../tools/tee-pelikatalogi-data.mjs';

const MD = readFileSync(MD_POLKU, 'utf8');
const DATA_TEKSTI = readFileSync(DATA_POLKU, 'utf8');

function lataaData() {
  const ymparisto = { window: {} };
  vm.runInNewContext(DATA_TEKSTI, ymparisto);
  // JSON-kierros tuo olion tähän realmiin (deepEqual vertaa myös prototyyppejä).
  return JSON.parse(JSON.stringify(ymparisto.window.PELIKATALOGI));
}

test('pelikatalogi-data.js vastaa docs/pelikatalogi.md:tä', () => {
  assert.equal(DATA_TEKSTI, muotoileData(jasennaPelikatalogi(MD)),
    'pelikatalogi-data.js on vanhentunut — aja: node tools/tee-pelikatalogi-data.mjs');
});

test('jokainen md:n pelirivi on datassa, id:t <ISO3>-N ja uniikit', () => {
  const data = lataaData();
  const mdIdt = [...MD.matchAll(/^\|\s*([A-Z]{3}-\d+)\s*\|/gm)].map((m) => m[1]);
  assert.ok(mdIdt.length >= 100, `md:ssä vain ${mdIdt.length} peliriviä`);
  assert.deepEqual(data.pelit.map((p) => p.id), mdIdt);
  assert.equal(new Set(mdIdt).size, mdIdt.length, 'md:ssä on toistuva id');
  for (const p of data.pelit) {
    assert.match(p.id, /^[A-Z]{3}-\d+$/);
    assert.equal(p.id.split('-')[0], p.maa, `${p.id}: maa ei vastaa id:n ISO3-osaa`);
    for (const kentta of ['nimi', 'maaNimi', 'saanto', 'oppimiskytkos', 'sopivuus13',
      'bottiKaveri', 'pelikytkos', 'oikeudet', 'lahdeNimi', 'tila']) {
      assert.ok(p[kentta], `${p.id}: ${kentta} puuttuu`);
    }
    assert.ok(['SUORA', 'OMA VERSIO'].includes(p.oikeusluokka), `${p.id}: oikeudet ei ala SUORA/OMA VERSIO`);
    // Nyt idea | tarkista; linssikatalogin tapaan tila etenee myöhemmin (sivu tuntee nämä).
    assert.ok(['idea', 'tarkista', 'seuraava', 'rakenteilla', 'valmis'].includes(p.tila),
      `${p.id}: tuntematon tila "${p.tila}" — lisää se myös pelikatalogi.html:n TILAT-listaan`);
    if (p.lahdeUrl) assert.match(p.lahdeUrl, /^https:\/\//, `${p.id}: lähdeosoite`);
  }
});

test('osat, ensimmäiset 10 ja omistajan ideat', () => {
  const data = lataaData();
  assert.equal(data.osat.length, 8, 'kahdeksan maantieteellistä osaa');
  data.osat.forEach((o, i) => {
    assert.equal(o.nro, i + 1);
    assert.ok(o.maat.length > 0, `osa ${o.nro} ilman maita`);
    assert.ok(data.pelit.some((p) => p.osa === o.nro), `osa ${o.nro} ilman pelejä`);
  });
  const idt = new Set(data.pelit.map((p) => p.id));
  assert.equal(data.ensimmaiset10.length, 10);
  data.ensimmaiset10.forEach((e, i) => {
    assert.equal(e.jarjestys, i + 1);
    assert.ok(idt.has(e.id), `ensimmäiset 10: tuntematon id ${e.id}`);
  });
  assert.ok(data.ideat.length > 0 && data.ideat.every((x) => x.idea && x.kuvaus));
  assert.ok(data.oikeudetSelite.SUORA && data.oikeudetSelite['OMA VERSIO']);
  assert.match(data.paivitetty, /^\d{4}-\d{2}-\d{2}$/);
});

test('pelikatalogi julkaistaan Pagesiin projektisivun Pelit-välilehtenä', () => {
  // 27.9.2026: pelikatalogi.html on ohjaussivu projekti.html#pelit-osoitteeseen
  // (tests/projekti.test.mjs vahtii ohjauksen); data ladataan projektisivulle.
  const pages = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(pages, /\bpelikatalogi\.html\b/);
  assert.match(pages, /\bpelikatalogi-data\.js\b/);
  const projekti = readFileSync(new URL('../projekti.html', import.meta.url), 'utf8');
  assert.match(projekti, /<script src="pelikatalogi-data\.js"><\/script>/);
  assert.match(projekti, /<script src="linssikatalogi-data\.js"><\/script>/);
  const peli = readFileSync(new URL('../pelikatalogi.html', import.meta.url), 'utf8');
  assert.match(peli, /projekti\.html#pelit/);
});

test('pelikatalogi: suunnitelmakortit jäsennetään (10 ensimmäistä + omistajan kortit) ja sivu piirtää ne', () => {
  const data = jasennaPelikatalogi(readFileSync(MD_POLKU, 'utf8'));
  const ensimmaiset = data.kortit.filter((k) => k.ryhma === 'ensimmaiset');
  assert.equal(ensimmaiset.length, 10, 'kymmenen pelisuunnitelmakorttia');
  for (const k of ensimmaiset) {
    assert.ok(k.id && data.pelit.some((p) => p.id === k.id), `${k.otsikko}: id ${k.id} löytyy katalogista`);
    assert.ok(k.kentat.some((x) => x.nimi === 'Sääntö'), `${k.otsikko}: Sääntö-kenttä`);
  }
  const lento = data.kortit.find((k) => k.otsikko.startsWith('Lentopeli'));
  assert.ok(lento?.kentat.some((x) => x.nimi === 'Tila' && /odottaa/.test(x.teksti)), 'lentopeli: tila "odottaa, ensi viikko"');
  const sivu = readFileSync(new URL('../projekti/pelit.js', import.meta.url), 'utf8');
  assert.match(sivu, /data-ala-paneeli="suunnitelmat"/);
});
