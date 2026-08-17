/*
 * Mock-testi Flickr-hakuputkelle (tools/hae-flickr.mjs).
 *
 * Avainta ei ole vielä käytettävissä (omistaja lisää FLICKR_API_KEYn
 * repon salaisuuksiin erikseen), joten putki testataan tallennetuilla
 * esimerkkivastauksilla tests/fixtures/flickr-*.json — realistisessa
 * Flickr REST -API:n JSON-muodossa (nojsoncallback=1 -vastaus).
 *
 * Varmistettavat asiat (tehtävänannon mukaan):
 *  1. NC-lisenssi hylätään, vaikka sillä olisi muuten kelpo koko.
 *  2. Alle 1200 px kuva hylätään, vaikka lisenssi olisi kelpo.
 *  3. Manifesti syntyy oikein: hyväksytyt ja hylätyt eritelty, kentät
 *     täydessä muodossa (tekijä, sivu-URL, lisenssi, koko, kuvaus).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  arvioiEhdokas, parhainKoko, suoritaHaku, KELPAAVAT_LISENSSIT, LISENSSI_NIMET, VAADITTU_MINIMI,
} from '../tools/hae-flickr.mjs';

const fixture = (nimi) => JSON.parse(readFileSync(new URL(`fixtures/${nimi}`, import.meta.url), 'utf8'));

const SEARCH = fixture('flickr-search.json');
const INFO = {
  '53201000001': fixture('flickr-getinfo-53201000001.json').photo, // CC BY, 4000px -> OK
  '53201000002': fixture('flickr-getinfo-53201000002.json').photo, // CC BY-NC -> hylätty
  '53201000003': fixture('flickr-getinfo-53201000003.json').photo, // CC0, 800px -> hylätty (liian pieni)
  '53201000004': fixture('flickr-getinfo-53201000004.json').photo, // CC BY-SA, 4272px -> OK
};

test('lisenssitaulukko kattaa kaikki Flickrin id:t 0-10 ja vain 4/5/9/10 kelpaavat', () => {
  for (let id = 0; id <= 10; id++) assert.ok(id in LISENSSI_NIMET, `id ${id} puuttuu nimitaulusta`);
  assert.deepEqual([...KELPAAVAT_LISENSSIT].sort(), ['10', '4', '5', '9']);
});

test('NC-lisenssi (id 1) hylätään vaikka koko olisi kelpo', () => {
  const kuva = SEARCH.photos.photo.find((p) => p.id === '53201000002');
  const tulos = arvioiEhdokas(kuva, INFO['53201000002']);
  assert.ok(tulos.hylatty, 'CC BY-NC-kuva hyväksyttiin virheellisesti');
  assert.match(tulos.hylatty, /lisenssi/i);
  assert.match(tulos.hylatty, /CC BY-NC/);
});

test('kaikki NC/ND-lisenssit (0,1,2,3,6,8) hylätään arvioiEhdokas-funktiossa', () => {
  for (const id of [0, 1, 2, 3, 6, 8]) {
    const kuva = { url_o: 'https://example.invalid/o.jpg', width_o: 4000, height_o: 3000 };
    const info = { id: 'x', license: String(id), owner: { username: 'x' } };
    const tulos = arvioiEhdokas(kuva, info);
    assert.ok(tulos.hylatty, `lisenssi-id ${id} pitäisi hylätä`);
  }
});

test('alle 1200px kuva hylätään vaikka lisenssi olisi CC0', () => {
  const kuva = SEARCH.photos.photo.find((p) => p.id === '53201000003');
  const tulos = arvioiEhdokas(kuva, INFO['53201000003']);
  assert.ok(tulos.hylatty, 'liian pieni kuva hyväksyttiin virheellisesti');
  assert.match(tulos.hylatty, /pieni/);
  assert.match(tulos.hylatty, /800/);
});

test('rajatapaus: täsmälleen 1200px hyväksytään, 1199px hylätään', () => {
  const iso = { url_o: 'https://example.invalid/o.jpg', width_o: VAADITTU_MINIMI, height_o: 900 };
  const infoIso = { id: 'a', license: '4', owner: { username: 'a' } };
  assert.ok(arvioiEhdokas(iso, infoIso).hyvaksytty, `${VAADITTU_MINIMI}px pitäisi kelvata`);

  const pieni = { url_o: 'https://example.invalid/o.jpg', width_o: VAADITTU_MINIMI - 1, height_o: 900 };
  const infoPieni = { id: 'b', license: '4', owner: { username: 'b' } };
  assert.ok(arvioiEhdokas(pieni, infoPieni).hylatty, `${VAADITTU_MINIMI - 1}px ei pitäisi kelvata`);
});

test('CC BY -kuva hyväksytään ja kentät täyttyvät oikein', () => {
  const kuva = SEARCH.photos.photo.find((p) => p.id === '53201000001');
  const tulos = arvioiEhdokas(kuva, INFO['53201000001']);
  assert.ok(tulos.hyvaksytty, 'kelpo CC BY -kuva hylättiin');
  const h = tulos.hyvaksytty;
  assert.equal(h.id, '53201000001');
  assert.equal(h.sivu, 'https://www.flickr.com/photos/somechef/53201000001');
  assert.equal(h.tekija, 'Somchai Chef', 'tekijä pitää tulla owner.realname:sta, ei tiedostonimestä');
  assert.equal(h.lisenssi, 'CC BY 2.0');
  assert.equal(h.lisenssiId, 4);
  assert.equal(h.leveys, 4000);
  assert.match(h.kuvaus, /skewers/);
  assert.ok(h.tagit.includes('street food'));
});

test('CC BY-SA -kuva ilman realname-kenttää käyttää username-nimeä', () => {
  const kuva = SEARCH.photos.photo.find((p) => p.id === '53201000004');
  const tulos = arvioiEhdokas(kuva, INFO['53201000004']);
  assert.ok(tulos.hyvaksytty);
  assert.equal(tulos.hyvaksytty.tekija, 'Maria Torikuvaaja');
});

test('parhainKoko valitsee url_o:n kun se on saatavilla, muuten pienemmän', () => {
  assert.deepEqual(
    parhainKoko({ url_o: 'o.jpg', width_o: '4000', height_o: '3000', url_k: 'k.jpg' }),
    { url: 'o.jpg', leveys: 4000, korkeus: 3000 },
  );
  assert.equal(parhainKoko({ url_k: 'k.jpg' }).url, 'k.jpg');
  assert.equal(parhainKoko({ url_h: 'h.jpg' }).url, 'h.jpg');
  assert.equal(parhainKoko({}), null);
});

test('getInfo-kutsun epäonnistuminen (null) hylkää kuvan sortumatta', () => {
  const tulos = arvioiEhdokas(SEARCH.photos.photo[0], null);
  assert.ok(tulos.hylatty);
  assert.match(tulos.hylatty, /getInfo/);
});

// --- koko putki mock-vastauksilla (suoritaHaku) --------------------------------

/** Mock-kutsuja: palauttaa tallennetut fixture-vastaukset menetelmän mukaan. */
function mockKutsu(searchData, infoMap) {
  return async (avain, metodi, parametrit) => {
    assert.ok(avain, 'avain pitää välittyä kutsuun');
    if (metodi === 'flickr.photos.search') return searchData;
    if (metodi === 'flickr.photos.getInfo') {
      const photo = infoMap[parametrit.photo_id] ?? null;
      return photo ? { photo, stat: 'ok' } : { stat: 'fail', code: 1, message: 'Photo not found' };
    }
    throw new Error(`odottamaton metodi testissä: ${metodi}`);
  };
}

test('suoritaHaku: manifesti syntyy oikein mock-vastauksilla (kuiva-ajo)', async () => {
  const tulos = await suoritaHaku({
    avain: 'testiavain-ei-oikea',
    haku: 'street food market',
    maara: 4,
    kuiva: true,
    kutsu: mockKutsu(SEARCH, INFO),
    tauko: async () => {}, // ei odoteta testissä
  });

  assert.equal(tulos.haku, 'street food market');
  assert.equal(tulos.hyvaksytyt.length, 2, 'kahden kuvan pitäisi läpäistä (CC BY ja CC BY-SA)');
  assert.equal(tulos.hylatyt.length, 2, 'kahden kuvan pitäisi hylätä (NC-lisenssi ja liian pieni)');

  const idt = tulos.hyvaksytyt.map((h) => h.id).sort();
  assert.deepEqual(idt, ['53201000001', '53201000004']);

  const hylattyIdt = tulos.hylatyt.map((h) => h.id).sort();
  assert.deepEqual(hylattyIdt, ['53201000002', '53201000003']);
  assert.match(tulos.hylatyt.find((h) => h.id === '53201000002').syy, /lisenssi/i);
  assert.match(tulos.hylatyt.find((h) => h.id === '53201000003').syy, /pieni/);

  // Kuiva-ajossa tiedostoa ei ladata, joten kenttä on null eikä lataa()-funktiota kutsuta.
  for (const h of tulos.hyvaksytyt) assert.equal(h.tiedosto, null);

  // Jokaisella hyväksytyllä on kaikki manifestin vaatimat kentät.
  for (const h of tulos.hyvaksytyt) {
    for (const kentta of ['id', 'sivu', 'tekija', 'lisenssi', 'leveys', 'kuvaus']) {
      assert.ok(kentta in h, `hyväksytyltä puuttuu kenttä ${kentta}`);
    }
  }
});

test('suoritaHaku: ei-kuivassa ajossa lataa() kutsutaan vain hyväksytyille', async () => {
  const ladatut = [];
  const tulos = await suoritaHaku({
    avain: 'testiavain',
    haku: 'market vegetables',
    maara: 4,
    kuiva: false,
    kuvaKansio: '/tmp/ei-kaytossa',
    kutsu: mockKutsu(SEARCH, INFO),
    lataa: async (h) => { ladatut.push(h.id); return `flickr-${h.id}.jpg`; },
    tauko: async () => {},
  });

  assert.deepEqual(ladatut.sort(), ['53201000001', '53201000004']);
  for (const h of tulos.hyvaksytyt) assert.equal(h.tiedosto, `flickr-${h.id}.jpg`);
});

test('suoritaHaku: paikkarajaus lat/lon näkyy palautetussa manifestissa', async () => {
  const tulos = await suoritaHaku({
    avain: 'testiavain',
    haku: 'ramen',
    lat: '35.68',
    lon: '139.69',
    sade: '3',
    maara: 4,
    kuiva: true,
    kutsu: mockKutsu(SEARCH, INFO),
    tauko: async () => {},
  });
  assert.deepEqual(tulos.paikka, { lat: 35.68, lon: 139.69, sadeKm: 3 });
});

test('suoritaHaku: tyhjä hakutulos tuottaa tyhjän mutta kelvollisen manifestin', async () => {
  const tulos = await suoritaHaku({
    avain: 'testiavain',
    haku: 'ei mitään osumaa',
    kuiva: true,
    kutsu: mockKutsu({ photos: { photo: [] }, stat: 'ok' }, {}),
    tauko: async () => {},
  });
  assert.deepEqual(tulos.hyvaksytyt, []);
  assert.deepEqual(tulos.hylatyt, []);
});
