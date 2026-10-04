// tools/astronaut/ehdokkaat.mjs ja gateway.mjs: astronauttikuvien ehdokashaun apufunktiot (ilman verkkoa).
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  etaisyysKm, gatewayOsoitteet, hakunimet, gatewayTunnus, jarjesta, jasennaGatewayTaulu, karsiSarjat, kohteetLohko, vertailuTunnus,
} from '../tools/astronaut/ehdokkaat.mjs';
import { jasennaKuvasivu } from '../tools/astronaut/gateway.mjs';

test('Gatewayn tunnus ja osoitteet: digitaali ESC, filmi ISD', () => {
  assert.deepEqual(gatewayTunnus('ISS026-E-26514'), { mission: 'ISS026', roll: 'E', frame: '26514' });
  assert.equal(gatewayTunnus('iss026e026514'), null);
  const d = gatewayOsoitteet('ISS026-E-26514');
  assert.equal(d.kuva, 'https://eol.jsc.nasa.gov/DatabaseImages/ESC/large/ISS026/ISS026-E-26514.JPG');
  assert.equal(d.pikku, 'https://eol.jsc.nasa.gov/DatabaseImages/ESC/small/ISS026/ISS026-E-26514.JPG');
  assert.equal(d.sivu, 'https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS026&roll=E&frame=26514');
  assert.match(gatewayOsoitteet('STS085-718-65').pikku, /ISD\/lowres\/STS085\/STS085-718-65\.JPG$/);
});

test('vertailutunnus tunnistaa saman kuvan eri lähteistä (duplikaatit)', () => {
  assert.equal(vertailuTunnus('ISS026-E-26514'), vertailuTunnus('iss026e026514'));
  assert.equal(vertailuTunnus('ISS026-E-26514'), vertailuTunnus('iss026e26514'));
  assert.equal(vertailuTunnus('STS059-213-19'), vertailuTunnus('sts059-213-019'));
  assert.notEqual(vertailuTunnus('ISS026-E-26514'), vertailuTunnus('ISS026-E-26515'));
});

test('tulostaulukon rivit: päivä, paikka, polttoväli ja keskipiste', () => {
  const html = '<table><tr><th>Photo ID</th></tr>'
    + '<tr><td><a>ISS026-E-26514</a></td><td>20110211</td><td>45.8</td><td>4.9</td><td>FRANCE</td><td>LYON AT NIGHT</td><td></td><td>200</td><td>Cataloged With Center Point</td></tr>'
    + '<tr><td>STS085-718-65</td><td>199708__</td><td>60.0</td><td>24.5</td><td>FINLAND</td><td>HELSINKI</td><td></td><td>250</td><td>Cataloged Without Center Point</td></tr></table>';
  const r = jasennaGatewayTaulu(html);
  assert.equal(r.length, 2);
  assert.deepEqual([r[0].id, r[0].aika, r[0].lat, r[0].polttovali, r[0].keskipiste], ['ISS026-E-26514', '2011-02-11', 45.8, 200, true]);
  assert.deepEqual([r[1].aika, r[1].keskipiste], ['1997-08', false]);
});

test('kuvasivulta aika ja ison kuvan mitat', () => {
  const t = jasennaKuvasivu('<td>Date taken</td><td>2011.02.11</td><td>Time taken</td><td>23:13:57 GMT</td><p>4256 x 2913 pixels</p><p>640 x 438 pixels</p>');
  assert.deepEqual(t, { aika: '2011-02-11T23:13:57Z', mitat: [4256, 2913] });
  assert.equal(jasennaKuvasivu('Date taken 1997.08.10').aika, '1997-08-10');
});

test('järjestys: digitaali ja pitkä polttoväli ensin, sarjan peräkkäiset ruudut yhdeksi', () => {
  const j = jarjesta([
    { id: 'STS085-718-65', polttovali: 250, km: 1 },
    { id: 'ISS016-E-25301', polttovali: 50, km: 2 },
    { id: 'ISS016-E-25297', polttovali: 400, km: 6 },
    { id: 'ISS016-E-25299', polttovali: 400, km: 3 },
  ]);
  assert.deepEqual(j.map((e) => e.id), ['ISS016-E-25299', 'ISS016-E-25297', 'ISS016-E-25301', 'STS085-718-65']);
  assert.deepEqual(karsiSarjat(j).map((e) => e.id), ['ISS016-E-25299', 'STS085-718-65']);
});

test('valinnat → KOHTEET-lohko pelin kaupungin paikalla', () => {
  const kaupungit = [{ id: 'dublin', nimi: 'Dublin', lat: 53.35, lon: -6.26 }];
  const lohko = kohteetLohko({
    dublin: { seutu: 'Irlanti', selite: 'Liffey halkaisee kaupungin.', oletus: 'ISS023-E-21764', kuvat: [{ id: 'ISS023-E-21764', teksti: 'Teksti.' }] },
  }, kaupungit);
  assert.match(lohko, /tunnus: "dublin", nimi: "Dublin", seutu: "Irlanti", lat: 53.35, lon: -6.26/);
  assert.match(lohko, /\{ id: "ISS023-E-21764", teksti: "Teksti\." \}/);
  assert.throws(() => kohteetLohko({ dublin: { kuvat: [{ id: 'a', teksti: 't' }], oletus: 'b' } }, kaupungit), /oletus/);
  assert.throws(() => kohteetLohko({ tampere: { kuvat: [{ id: 'a', teksti: 't' }] } }, kaupungit), /ei pelin Euroopan/);
});

test('etäisyys km', () => {
  assert.ok(Math.abs(etaisyysKm({ lat: 60.17, lon: 24.94 }, { lat: 61.5, lon: 23.76 }) - 162) < 3);
});

test('hakunimet: ilman diakriittejä ja hallintoliitettä, vanhat nimet', () => {
  assert.deepEqual(hakunimet('Luxembourg City', 'luxemburg'), ['Luxembourg City', 'Luxembourg']);
  assert.deepEqual(hakunimet('Tromsø Municipality', 'tromssa'), ['Tromsø Municipality', 'Tromsø', 'Tromso']);
  assert.ok(hakunimet('Kyiv', 'kiova').includes('Kiev'));
});
