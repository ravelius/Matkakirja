import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  PALLOVEKTORIT_JUURI, PALLOVEKTORIT_OLETUS, PALLOVEKTORIT_VERSIO, RAJA_KATKO_YKS,
  VEKTORIT_HAIVE_MS, VEKTORIT_JARRU_MS, VEKTORIT_KORKEUS, VEKTORIT_LEVEYS_LAITEPX,
  VEKTORIT_RAJAT_PX_ASTE, VEKTORIT_RAJA_LEVEYS_LAITEPX, VEKTORIT_RENDER_ORDER,
  VEKTORIT_SOLUKATTO, VEKTORIT_SYVYYSSIIRTO, VEKTORIT_TERAVYYS_PX,
  pallovektoritPaalla, pinnanPiste, puraDelta, vektorijanat, vektorisolut, vektoritaso,
} from '../js/pallovektorit.js';
import { LEPOKERROS_HAIVE_SISAAN_MS, LEPOKERROS_SYVYYSSIIRTO, pallonPiste } from '../js/pallo.js';
import { REITIN_KORKEUS } from '../js/pallolauta/reitit.js';

/*
 * PALLON VEKTORIVIIVAT (Raamattu 6.9.2026, VEKTORIT SAMALLA; suunnitelma
 * docs/moduulit/pallon-vektoriviivat.md luku 4): rantaviivat ja maiden
 * rajat piirtyvät laattojen päälle tasan tavoiteleveytensä
 * laitepikseleinä. Nämä testit vartioivat kerroksen puhdasta logiikkaa
 * ilman selainta: yksinkertaistustason valinta, solujako sauman yli,
 * aineiston deltapurku, janageometria, säde–pallo-leikkaus ja ne
 * vakiot, joista piirtojärjestys ja parallaksittomuus riippuvat.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* Aineiston tasot (tools/tee-pallovektorit.mjs oletus, luku 2.4). */
const LODIT = [0.1, 0.03, 0.008, 0.004, 0];

test('tason valinta: matalin taso, jonka toleranssi on ruudulla alle puoli pikseliä', () => {
  // Luvun 2.4 taulukko: 0,1° riittää z0–z2:lle, 0,03° z3–z4:lle,
  // 0,008° z5:lle, 0,004° z6:lle ja harventamaton lähde z7+:lle.
  assert.equal(vektoritaso(LODIT, 6, VEKTORIT_TERAVYYS_PX), 1, 'koko pallo: 6 px/aste');
  assert.equal(vektoritaso(LODIT, 62, VEKTORIT_TERAVYYS_PX), 2, 'z5: 62 px/aste');
  assert.equal(vektoritaso(LODIT, 125, VEKTORIT_TERAVYYS_PX), 3, 'z6: 125 px/aste');
  assert.equal(vektoritaso(LODIT, 240, VEKTORIT_TERAVYYS_PX), 4, 'z7: 240 px/aste');
  // Yleiskuva: karkein taso kelpaa, kun tarve on pieni.
  assert.equal(vektoritaso(LODIT, 3, VEKTORIT_TERAVYYS_PX), 0);
  // Pakotus (savukkeet, kehittäjän vipu) ohittaa mittauksen ja rajautuu listaan.
  assert.equal(vektoritaso(LODIT, 240, VEKTORIT_TERAVYYS_PX, 0), 0);
  assert.equal(vektoritaso(LODIT, 3, VEKTORIT_TERAVYYS_PX, 9), 4, 'pakotus ei mene listan yli');
  assert.equal(vektoritaso(LODIT, 3, VEKTORIT_TERAVYYS_PX, -2), 0);
  assert.equal(vektoritaso([], 100), 0);
});

test('solujako: näkyvä laatikko soluiksi, sauman yli molemmin puolin', () => {
  // Kreikan laatikko 10°:n soluilla osuu neljään soluun (19–20 / 4–5).
  const kreikka = vektorisolut({
    lat0: 35, lat1: 42, lon0: 19, lon1: 26,
  }, 10);
  assert.equal(kreikka.length, 4);
  assert.deepEqual([...kreikka].sort(), ['19_4', '19_5', '20_4', '20_5']);

  /*
   * SAUMA: lepokerroksenAlue antaa pituuspiirit aukikierrettyinä, joten
   * Tyynenmeren yli katsova ruutu on lon 175…185 eikä −180…180. Solujen
   * pitää tulla molemmilta puolilta saumaa (sarakkeet 35 ja 0).
   */
  const sauma = vektorisolut({
    lat0: -5, lat1: 5, lon0: 175, lon1: 185,
  }, 10);
  assert.ok(sauma.some((a) => a.startsWith('35_')), `sauman länsipuoli puuttuu: ${sauma}`);
  assert.ok(sauma.some((a) => a.startsWith('0_')), `sauman itäpuoli puuttuu: ${sauma}`);
  assert.equal(sauma.length, 4);

  // Karkeilla tasoilla koko maailma on yksi solu (luku 2.4).
  assert.deepEqual(vektorisolut({
    lat0: -90, lat1: 90, lon0: -180, lon1: 180,
  }, 360), ['0_0']);
  assert.deepEqual(vektorisolut(null, 10), [], 'ilman aluetta ei soluja');
  // Koko maailma 10°:n soluilla: 36 saraketta × 18 riviä, ei enempää.
  assert.equal(vektorisolut({
    lat0: -90, lat1: 90, lon0: -180, lon1: 180,
  }, 10).length, 36 * 18);
});

/** Synteettinen solu V0:n muodossa (int32 n, int32 lon·1e4, int32 lat·1e4, int16-deltat). */
function teeSolu(viivat) {
  let tavuja = 0;
  for (const v of viivat) tavuja += 12 + (v.length - 1) * 4;
  const puskuri = new ArrayBuffer(tavuja);
  const nakyma = new DataView(puskuri);
  let o = 0;
  for (const v of viivat) {
    nakyma.setInt32(o, v.length, true);
    let x = Math.round(v[0][0] * 1e4);
    let y = Math.round(v[0][1] * 1e4);
    nakyma.setInt32(o + 4, x, true);
    nakyma.setInt32(o + 8, y, true);
    o += 12;
    for (let k = 1; k < v.length; k += 1) {
      const nx = Math.round(v[k][0] * 1e4);
      const ny = Math.round(v[k][1] * 1e4);
      nakyma.setInt16(o, nx - x, true);
      nakyma.setInt16(o + 2, ny - y, true);
      o += 4;
      x = nx;
      y = ny;
    }
  }
  return puskuri;
}

test('deltapurku: int16-deltat 1e-4 asteen tarkkuudella, molempiin suuntiin', () => {
  const viivat = [
    [[23.7275, 37.9838], [23.7301, 37.9812], [23.6, 37.9]],
    [[-179.9998, -0.5], [-179.9, -0.4], [-179.8, -0.3], [-179.7, -0.2]],
  ];
  const purettu = puraDelta(teeSolu(viivat));
  assert.equal(purettu.length, 2);
  assert.equal(purettu[0].length, 3);
  assert.equal(purettu[1].length, 4);
  for (let i = 0; i < viivat.length; i += 1) {
    for (let k = 0; k < viivat[i].length; k += 1) {
      assert.ok(Math.abs(purettu[i][k][0] - viivat[i][k][0]) < 1e-9, `lon ${i}/${k}`);
      assert.ok(Math.abs(purettu[i][k][1] - viivat[i][k][1]) < 1e-9, `lat ${i}/${k}`);
    }
  }
  assert.deepEqual(puraDelta(new ArrayBuffer(0)), []);
  // Vajaa tiedosto luetaan siihen asti kuin se on ehjä, ei kaadeta palloa.
  const koko = teeSolu(viivat);
  assert.equal(puraDelta(koko.slice(0, 20)).length, 1);
});

test('janat: jokainen väli oma jana täsmälleen pinnan säteellä', () => {
  const sade = 100;
  const { paikat, janoja } = vektorijanat([[[23.7, 37.9], [23.8, 38.0]]], sade);
  assert.equal(janoja, 1);
  assert.equal(paikat.length, 6);
  const a = pallonPiste(37.9, 23.7, sade);
  const b = pallonPiste(38.0, 23.8, sade);
  const lahella = (x, y, mika) => assert.ok(Math.abs(x - y) < 1e-3, `${mika}: ${x} ≠ ${y}`);
  lahella(paikat[0], a.x, 'x0'); lahella(paikat[1], a.y, 'y0'); lahella(paikat[2], a.z, 'z0');
  lahella(paikat[3], b.x, 'x1'); lahella(paikat[4], b.y, 'y1'); lahella(paikat[5], b.z, 'z1');
  // Piste on säteellä R: VEKTORIT_KORKEUS on 0 (parallaksi, luku 2.3).
  lahella(Math.hypot(paikat[0], paikat[1], paikat[2]), sade, 'säde');
  // Kolme pistettä = kaksi janaa (LineSegments2 haluaa parit).
  assert.equal(vektorijanat([[[0, 0], [1, 0], [2, 0]]], sade).janoja, 2);
  assert.equal(vektorijanat([[[0, 0]]], sade).janoja, 0, 'yksinäinen piste ei ole jana');
  assert.equal(vektorijanat([], sade).janoja, 0);
});

/*
 * Kirjaston Vector3:n korvike: pinnanPiste lukee luokan kameran omasta
 * paikkavektorista, joten testin riittää tarjota sama rajapinta.
 * `unproject` vie ruudun NDC-pisteen tason z = 0 maailmaan, mikä
 * vastaa z-akselilla olevaa kameraa, joka katsoo origoon.
 */
class V3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }

  clone() { return new V3(this.x, this.y, this.z); }

  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }

  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }

  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }

  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }

  normalize() {
    const l = Math.hypot(this.x, this.y, this.z) || 1;
    return this.multiplyScalar(1 / l);
  }

  unproject(kamera) {
    this.x *= kamera.levea;
    this.y *= kamera.levea;
    this.z = 0;
    return this;
  }
}

test('säde–pallo-leikkaus: ruudun keski on kameran alla, kulma taivaalla on null', () => {
  const kamera = { position: new V3(0, 0, 300), levea: 1000 };
  const keski = pinnanPiste(kamera, 200, 400, 400, 800, 100);
  assert.ok(keski, 'keskipisteen säde ei osunut palloon');
  assert.ok(Math.abs(keski.lat) < 1e-9, `lat ${keski.lat}`);
  assert.ok(Math.abs(keski.lng) < 1e-9, `lng ${keski.lng}`);
  // Ruudun kulma menee pallon ohi: kerros ei saa keksiä sinne solua.
  assert.equal(pinnanPiste(kamera, 400, 0, 400, 800, 100), null);
  // Vinosti alaspäin: piste on eteläisemmällä leveydellä kuin keski.
  const alas = pinnanPiste(kamera, 200, 420, 400, 800, 100);
  assert.ok(alas && alas.lat < 0, `alaspäin ${alas?.lat}`);
  assert.equal(pinnanPiste(null, 200, 400, 400, 800, 100), null);
  assert.equal(pinnanPiste(kamera, 200, 400, 0, 800, 100), null);
});

test('kytkin: ?vektorit voittaa muistetun, muistettu oletuksen', () => {
  const teeIkkuna = (haku, muistettu) => ({
    location: { search: haku },
    localStorage: { getItem: () => muistettu ?? null },
  });
  assert.equal(pallovektoritPaalla(teeIkkuna('', null)), PALLOVEKTORIT_OLETUS);
  assert.equal(pallovektoritPaalla(teeIkkuna('?vektorit=0', '1')), false);
  assert.equal(pallovektoritPaalla(teeIkkuna('?vektorit=1', '0')), true);
  assert.equal(pallovektoritPaalla(teeIkkuna('', '0')), false);
  assert.equal(pallovektoritPaalla(teeIkkuna('', '1')), true);
  assert.equal(pallovektoritPaalla({}), PALLOVEKTORIT_OLETUS, 'ilman ikkunaa oletus');
});

test('vakiot: piirtojärjestys laattojen päälle, merkkien alle, ilman parallaksia', () => {
  /*
   * Läpinäkyvien jono (mitattu, luku 2.3): laatat ja lepokerros ≤ −1 →
   * vektorit −0,5 → reitit 0 → kalvot 1. Reittien renderOrder on
   * kirjaston oletus 0, joten se on tässä lukuna.
   */
  const REITTIEN_RENDER_ORDER = 0;
  assert.equal(VEKTORIT_RENDER_ORDER, -0.5);
  assert.ok(VEKTORIT_RENDER_ORDER < REITTIEN_RENDER_ORDER, 'reitit piirtyvät vektorien päälle');
  // Syvyyssiirto laattakerroksen (E1, −8) edelle: viiva ei jää laatan alle.
  assert.equal(VEKTORIT_SYVYYSSIIRTO, -12);
  assert.ok(VEKTORIT_SYVYYSSIIRTO < LEPOKERROS_SYVYYSSIIRTO,
    'vektori jäisi lepokerroksen ja laattakerroksen alle');
  /*
   * KORKEUS ON TÄSMÄLLEEN NOLLA: nostettu viiva kulki lähikuvassa 2–4
   * laitepikseliä poltetun viivan vieressä (parallaksi, luku 2.3), ja
   * järjestys hoidetaan syvyyssiirrolla. Reitit ovat yhä ylempänä.
   */
  assert.equal(VEKTORIT_KORKEUS, 0);
  assert.ok(VEKTORIT_KORKEUS < REITIN_KORKEUS);
  // Häive on sama pehmeä sisääntulo kuin lepokerroksella (KAIKKI LIIKE ANIMOIDAAN).
  assert.equal(VEKTORIT_HAIVE_MS, LEPOKERROS_HAIVE_SISAAN_MS);
  assert.equal(VEKTORIT_HAIVE_MS, 260);
  // Leveydet laitepikseleinä, rajat rantaviivaa hennompina (V3 säätää).
  assert.equal(VEKTORIT_LEVEYS_LAITEPX, 1.5);
  assert.ok(VEKTORIT_RAJA_LEVEYS_LAITEPX < VEKTORIT_LEVEYS_LAITEPX);
  assert.equal(VEKTORIT_TERAVYYS_PX, 0.5);
  assert.equal(VEKTORIT_JARRU_MS, 60);
  assert.equal(VEKTORIT_SOLUKATTO, 160);
  assert.equal(VEKTORIT_RAJAT_PX_ASTE, 30);
  assert.deepEqual(RAJA_KATKO_YKS, [0.011, 0.022]);
  // Aineisto on versioidussa polussa (vuoden välimuisti, immutable).
  assert.ok(PALLOVEKTORIT_JUURI.endsWith(`/${PALLOVEKTORIT_VERSIO}/`), PALLOVEKTORIT_JUURI);
  assert.match(PALLOVEKTORIT_JUURI, /^https:\/\/media\.matkakirja\.app\/julisteet\/pallo\/vektorit\//);
});

test('V1: moduuli ei tuo ui-apureita eikä laattakerroksen moduulia suoraan', () => {
  /*
   * Suunnitelma luku 4.3: kytkin on TÄSSÄ moduulissa eikä
   * js/ui-apurit.js:ssä (toinen erä muuttaa sitä), ja laattakerroksen
   * tiedostoihin (js/pallolaatat.js, js/pallo.js) ei kosketa —
   * lepokerroksen apurit tulevat js/pallo.js:n jälleenviennin kautta,
   * jolloin kaksi kerrosta ei voi eriytyä eikä tämä moduuli sido
   * itseään E1:n työn alla olevaan tiedostoon.
   */
  const lahde = lue('../js/pallovektorit.js');
  assert.ok(!/from '\.\/ui-apurit\.js'/.test(lahde), 'moduuli tuo js/ui-apurit.js:n');
  assert.ok(!/from '\.\/pallolaatat\.js'/.test(lahde), 'moduuli tuo js/pallolaatat.js:n');
  assert.match(lahde, /from '\.\/pallo\.js'/);
  // Kerros on palvelutyöntekijän kuoressa (offline).
  assert.match(lue('../sw.js'), /'\.\/js\/pallovektorit\.js'/);
});

/*
 * KEHITTÄJÄN KYTKIMET RATASVALIKOSSA (vika v1649). Omistaja katsoo peliä
 * iOS-kuoressa (ios/), jossa ei ole osoiteriviä: ilman muistettua
 * valintaa kumpaakaan pallon kerrosta ei voi sammuttaa siellä, missä
 * vika näkyy. Kytkimet ovat ratasvalikossa ja tallettavat valinnan
 * laitteelle; osoite voittaa muistin kuten muissakin kehittäjän vivuissa.
 */
test('kytkimet: laattakerros ja vektorit myös muistista, ratasvalikosta', async () => {
  const {
    LAATTAKERROS_AVAIN, PALLOVEKTORIT_AVAIN: AVAIN_UI, asetaLaattakerros, asetaPallovektorit,
    laattakerrosPaalla, pallovektoritValittu,
  } = await import('../js/ui-apurit.js');
  const { PALLOVEKTORIT_AVAIN } = await import('../js/pallovektorit.js');
  // Avain on kaksoiskappale (ratasvalikko ei voi tuoda laiskaa moduulia).
  assert.equal(AVAIN_UI, PALLOVEKTORIT_AVAIN, 'ui-apurit ja pallovektorit samasta avaimesta');
  const muisti = new Map();
  const win = {
    location: { search: '' },
    localStorage: {
      getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
      setItem: (k, v) => muisti.set(k, v),
      removeItem: (k) => muisti.delete(k),
    },
  };
  // Oletus tulee kutsujalta, kunnes valinta on tehty.
  assert.equal(laattakerrosPaalla(win, true), true);
  assert.equal(pallovektoritValittu(win, true), true);
  asetaLaattakerros(false, win);
  asetaPallovektorit(false, win);
  assert.equal(muisti.get(LAATTAKERROS_AVAIN), '0');
  assert.equal(muisti.get(PALLOVEKTORIT_AVAIN), '0');
  assert.equal(laattakerrosPaalla(win, true), false, 'muistettu pois voittaa oletuksen');
  assert.equal(pallovektoritValittu(win, true), false);
  // Laiskan moduulin oma lukija lukee saman muistipaikan samalla tavalla.
  assert.equal(pallovektoritPaalla(win), false);
  // Osoite voittaa muistin.
  assert.equal(laattakerrosPaalla({ ...win, location: { search: '?laattakerros=1' } }, true), true);
  assert.equal(pallovektoritValittu({ ...win, location: { search: '?vektorit=1' } }, true), true);
  assert.equal(pallovektoritPaalla({ ...win, location: { search: '?vektorit=1' } }), true);
  asetaLaattakerros(true, win);
  asetaPallovektorit(true, win);
  assert.equal(laattakerrosPaalla(win, false), true, 'muistettu päällä voittaa oletuksen');
  assert.equal(pallovektoritValittu(win, false), true);
  // Napit ovat ratasvalikossa ja kytketty; valinta ei jää osoitteen alle.
  const html = lue('../index.html');
  assert.match(html, /id="kehittaja-laattakerros-kytkin"/);
  assert.match(html, /id="kehittaja-pallovektorit-kytkin"/);
  const main = lue('../js/main.js');
  assert.match(main, /asetaLaattakerros\(halutaan\);/);
  assert.match(main, /asetaPallovektorit\(halutaan\);/);
  assert.match(main, /osoite\.searchParams\.delete\('laattakerros'\);/);
  assert.match(main, /osoite\.searchParams\.delete\('vektorit'\);/);
});
