import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  NAPAKALOTTI, NAPAKALOTTI_PAATE, NAPAKALOTTI_RENDER_ORDER, NAPAKALOTTI_VERSIO,
  NAPAKANNEN_LEVEYS, kalotinAsteet, kalotinKuvapiste,
  kalotinUv, kalotinVerkko, napakalotinUrl, pallonPiste,
} from '../js/pallo.js';
import { VEKTORIT_RENDER_ORDER } from '../js/pallovektorit.js';
import {
  HAIVE_AST, JAA_ASTEIKKO, KOKO_PUOLITTAIN, LAATU_OLETUS, LIITOS_KAISTA,
  LIITOS_LAATTATASO, LIITOS_NAYTTEET, LIITOS_VARA, MAAN_SADE, kalotinKuvaan,
  kalottienKansio, laattaKoordinaatit, laattojenLiitossavy, leikkaustaulu,
  leveyspiirinLeikkaukset, liitoskaistanLeveydet, merenAlalla, meriIndeksi,
  napavarjostus, piirraJana, reunanPeitto, siirraPinnalla, taulunRivi,
} from '../tools/tee-napakalotit.mjs';
import { varjostusPisteessa, VALO } from '../tools/fokuskartta/maastovarjo.js';

/*
 * NAPAKALOTIT (omistaja 11.9.2026: *"Pohjoisnavalta puuttuu kokonaan
 * kartta ihan yläosasta. Etelänavalta taas pitää piirtää vähän isompi
 * alue."*). Navoille piirretään oma atsimutaalinen kuva
 * (tools/tee-napakalotit.mjs), ja peli kiinnittää sen napakansien
 * tilalle (js/pallo.js). Nämä testit vartioivat sitä, mitä silmällä ei
 * voi tarkistaa: että kuvan ja pinnan projektio on SAMA kumpaankin
 * suuntaan, ettei kartta ole peilikuva, että verkon kolmiot osoittavat
 * ulospäin ja että kuvan reuna häipyy juuri kehällä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const PUOLET = ['pohjoinen', 'etela'];

/* ============================================ projektio molempiin suuntiin */

test('kalotin ala kattaa napakannen ja etelässä koko Etelämantereen', () => {
  // Kuvan on ulotuttava kannen ulkopuolelle, tai häivytyskaistan alla
  // ei olisi laattoja (js/pallo.js NAPAKALOTIT).
  assert.ok(NAPAKALOTTI.pohjoinen.reuna < NAPAKANNEN_LEVEYS - 2);
  assert.ok(Math.abs(NAPAKALOTTI.etela.reuna) < NAPAKANNEN_LEVEYS - 2);
  // Etelämantereen pohjoisin kärki on 63,2° S; kalotin on peitettävä se.
  assert.ok(NAPAKALOTTI.etela.reuna >= -63.2 || NAPAKALOTTI.etela.reuna === -60);
  assert.equal(NAPAKALOTTI.etela.reuna, -60);
  assert.equal(NAPAKALOTTI.pohjoinen.reuna, 80);
  assert.equal(NAPAKALOTTI.pohjoinen.merkki, 1);
  assert.equal(NAPAKALOTTI.etela.merkki, -1);
});

test('napa on kuvan keskipiste ja reuna kehällä', () => {
  for (const puoli of PUOLET) {
    const k = NAPAKALOTTI[puoli];
    const napa = k.merkki * 90;
    for (const lon of [-180, -90, 0, 45, 179.9]) {
      const keski = kalotinKuvapiste(puoli, napa, lon);
      assert.ok(Math.abs(keski.x - 0.5) < 1e-12, `${puoli} napa x`);
      assert.ok(Math.abs(keski.y - 0.5) < 1e-12, `${puoli} napa y`);
      assert.ok(Math.abs(keski.r) < 1e-12);
      const kehalla = kalotinKuvapiste(puoli, k.reuna, lon);
      assert.ok(Math.abs(kehalla.r - 1) < 1e-12, `${puoli} kehä r`);
      assert.ok(Math.abs(Math.hypot(kehalla.x - 0.5, kehalla.y - 0.5) - 0.5) < 1e-12);
    }
  }
});

test('nollameridiaani on ylöspäin kummassakin kuvassa', () => {
  for (const puoli of PUOLET) {
    const k = NAPAKALOTTI[puoli];
    const puolivali = (k.merkki * 90 + k.reuna) / 2;
    const p = kalotinKuvapiste(puoli, puolivali, 0);
    assert.ok(Math.abs(p.x - 0.5) < 1e-12, `${puoli} x keskellä`);
    assert.ok(p.y < 0.5, `${puoli} 0° ylöspäin`);
  }
});

test('kuvan ulkopuoli on r > 1 ja kalotin sisus r < 1', () => {
  assert.ok(kalotinKuvapiste('pohjoinen', 70, 0).r > 1);
  assert.ok(kalotinKuvapiste('pohjoinen', 85, 0).r < 1);
  assert.ok(kalotinKuvapiste('etela', -50, 0).r > 1);
  assert.ok(kalotinKuvapiste('etela', -85, 0).r < 1);
});

test('kalotinAsteet on kalotinKuvapisteen käänteisfunktio', () => {
  for (const puoli of PUOLET) {
    const k = NAPAKALOTTI[puoli];
    const napa = k.merkki * 90;
    for (let i = 0; i <= 12; i += 1) {
      const lat = napa + ((k.reuna - napa) * i) / 12;
      for (const lon of [-179, -120, -60, -0.5, 0, 30, 90, 150, 179.5]) {
        const p = kalotinKuvapiste(puoli, lat, lon);
        const a = kalotinAsteet(puoli, p.x, p.y);
        assert.ok(Math.abs(a.lat - lat) < 1e-9, `${puoli} lat ${lat}`);
        // Navalla pituusaste on määrittelemätön: sitä ei verrata.
        if (Math.abs(lat) < 89.999) {
          const ero = Math.abs(((a.lon - lon + 540) % 360) - 180);
          assert.ok(ero < 1e-9, `${puoli} lon ${lon} → ${a.lon}`);
        }
        assert.ok(Math.abs(a.r - p.r) < 1e-12);
      }
    }
  }
});

test('kalotinUv kääntää vain pystyakselin (flipY)', () => {
  for (const puoli of PUOLET) {
    const p = kalotinKuvapiste(puoli, NAPAKALOTTI[puoli].merkki * 85, 40);
    const uv = kalotinUv(puoli, NAPAKALOTTI[puoli].merkki * 85, 40);
    assert.equal(uv.u, p.x);
    assert.ok(Math.abs(uv.v - (1 - p.y)) < 1e-15);
  }
});

test('tuntematon puoli kaatuu selvään virheeseen', () => {
  assert.throws(() => kalotinKuvapiste('itä', 85, 0), /napakalotti/);
  assert.throws(() => kalotinAsteet('itä', 0.5, 0.5), /napakalotti/);
  assert.throws(() => kalotinVerkko({ puoli: 'itä', sade: 100 }), /napakalotti/);
});

/* ============================================== kartta ei ole peilikuva */

/*
 * PEILIKUVA EI NÄYTÄ VIRHEELTÄ VAAN VÄÄRÄLTÄ KARTALTA, joten suunta
 * todistetaan geometrialla eikä silmällä: kolmio, joka kiertää
 * VASTAPÄIVÄÄN pallon ULKOPUOLELTA katsottuna, kiertää vastapäivään myös
 * UV-tasossa. Jos kiertosuunta kääntyisi, tekstuuri olisi peilattu.
 */
const kierto3D = (pisteet) => {
  const p = pisteet.map(([lat, lon]) => pallonPiste(lat, lon, 1));
  const v = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
  const u = v(p[1], p[0]); const w = v(p[2], p[0]);
  const n = {
    x: u.y * w.z - u.z * w.y,
    y: u.z * w.x - u.x * w.z,
    z: u.x * w.y - u.y * w.x,
  };
  return Math.sign(n.x * p[0].x + n.y * p[0].y + n.z * p[0].z);
};
const kiertoUV = (puoli, pisteet) => {
  const uv = pisteet.map(([lat, lon]) => kalotinUv(puoli, lat, lon));
  return Math.sign((uv[1].u - uv[0].u) * (uv[2].v - uv[0].v)
    - (uv[2].u - uv[0].u) * (uv[1].v - uv[0].v));
};

test('kalotin kuva ei ole peilikuva kummallakaan navalla', () => {
  const kolmiot = {
    pohjoinen: [[[85, 0], [85, 10], [88, 0]], [[82, 120], [82, 130], [86, 120]]],
    etela: [[[-85, 0], [-85, 10], [-88, 0]], [[-70, -60], [-70, -50], [-75, -60]]],
  };
  for (const puoli of PUOLET) {
    for (const kolmio of kolmiot[puoli]) {
      const a = kierto3D(kolmio);
      const b = kiertoUV(puoli, kolmio);
      assert.notEqual(a, 0);
      assert.equal(a, b, `${puoli} ${JSON.stringify(kolmio)}`);
    }
  }
});

test('pohjoisessa itä kiertää vastapäivään, etelässä myötäpäivään', () => {
  // Sama asia toisin sanoin: 90° E on pohjoisnavan kuvassa vasemmalla
  // (napa ylhäältä katsottuna) ja etelänavan kuvassa oikealla.
  assert.ok(kalotinKuvapiste('pohjoinen', 85, 90).x < 0.5);
  assert.ok(kalotinKuvapiste('etela', -85, 90).x > 0.5);
});

/* ====================================================== verkko pallolla */

test('kalotin verkko: kärjet pinnalla, normaalit säteen suuntaan, UV kuvassa', () => {
  const sade = 100.15;
  for (const puoli of PUOLET) {
    const kehia = 8; const sektoreita = 16;
    const v = kalotinVerkko({
      puoli, sade, kehia, sektoreita,
    });
    const kohtia = (kehia + 1) * (sektoreita + 1);
    assert.equal(v.paikat.length, kohtia * 3);
    assert.equal(v.normaalit.length, kohtia * 3);
    assert.equal(v.uvt.length, kohtia * 2);
    assert.equal(v.indeksit.length, kehia * sektoreita * 6);
    for (let i = 0; i < kohtia; i += 1) {
      const p = [v.paikat[i * 3], v.paikat[i * 3 + 1], v.paikat[i * 3 + 2]];
      assert.ok(Math.abs(Math.hypot(...p) - sade) < 1e-3, `${puoli} säde`);
      const n = [v.normaalit[i * 3], v.normaalit[i * 3 + 1], v.normaalit[i * 3 + 2]];
      assert.ok(Math.abs(Math.hypot(...n) - 1) < 1e-5);
      // Normaali on paikan suunta (ulospäin).
      const piste = p.map((c) => c / sade);
      for (let k = 0; k < 3; k += 1) assert.ok(Math.abs(n[k] - piste[k]) < 1e-3);
      const u = v.uvt[i * 2]; const w = v.uvt[i * 2 + 1];
      assert.ok(u >= -1e-6 && u <= 1 + 1e-6, `${puoli} u ${u}`);
      assert.ok(w >= -1e-6 && w <= 1 + 1e-6, `${puoli} v ${w}`);
      // Kehän kärjet ovat kuvan ympyrän kehällä, napa keskellä.
      const etaisyys = Math.hypot(u - 0.5, w - 0.5);
      assert.ok(etaisyys <= 0.5 + 1e-6);
    }
    // Ensimmäinen rengas on napa, viimeinen kehä.
    assert.ok(Math.abs(v.uvt[0] - 0.5) < 1e-9);
    assert.ok(Math.abs(v.uvt[1] - 0.5) < 1e-9);
    const viimeinen = (kohtia - 1) * 2;
    assert.ok(Math.abs(Math.hypot(v.uvt[viimeinen] - 0.5, v.uvt[viimeinen + 1] - 0.5) - 0.5) < 1e-9);
  }
});

test('kalotin kolmiot osoittavat ulospäin (etupuoli näkyy pallolta)', () => {
  for (const puoli of PUOLET) {
    const v = kalotinVerkko({
      puoli, sade: 100, kehia: 6, sektoreita: 12,
    });
    let kolmioita = 0;
    for (let i = 0; i < v.indeksit.length; i += 3) {
      const p = [0, 1, 2].map((k) => {
        const j = v.indeksit[i + k];
        return { x: v.paikat[j * 3], y: v.paikat[j * 3 + 1], z: v.paikat[j * 3 + 2] };
      });
      const u = {
        x: p[1].x - p[0].x, y: p[1].y - p[0].y, z: p[1].z - p[0].z,
      };
      const w = {
        x: p[2].x - p[0].x, y: p[2].y - p[0].y, z: p[2].z - p[0].z,
      };
      const n = {
        x: u.y * w.z - u.z * w.y,
        y: u.z * w.x - u.x * w.z,
        z: u.x * w.y - u.y * w.x,
      };
      const ulos = n.x * p[0].x + n.y * p[0].y + n.z * p[0].z;
      // Navan ympärillä kolmio on rappeutunut (kaksi kärkeä samassa
      // pisteessä); ne ohitetaan, muut osoittavat ulospäin.
      if (Math.abs(ulos) < 1e-9) continue;
      assert.ok(ulos > 0, `${puoli} kolmio ${i / 3} osoittaa sisäänpäin`);
      kolmioita += 1;
    }
    assert.ok(kolmioita > 50, `${puoli} kolmioita ${kolmioita}`);
  }
});

test('verkon UV vastaa kärjen leveys- ja pituusastetta', () => {
  for (const puoli of PUOLET) {
    const kehia = 5; const sektoreita = 8;
    const v = kalotinVerkko({
      puoli, sade: 100, kehia, sektoreita,
    });
    for (let i = 0; i < (kehia + 1) * (sektoreita + 1); i += 1) {
      const p = { x: v.paikat[i * 3], y: v.paikat[i * 3 + 1], z: v.paikat[i * 3 + 2] };
      const lat = Math.asin(p.y / 100) * (180 / Math.PI);
      const lon = Math.atan2(p.x, p.z) * (180 / Math.PI);
      const uv = kalotinUv(puoli, lat, lon);
      assert.ok(Math.abs(uv.u - v.uvt[i * 2]) < 1e-5, `${puoli} u ${i}`);
      assert.ok(Math.abs(uv.v - v.uvt[i * 2 + 1]) < 1e-5, `${puoli} v ${i}`);
    }
  }
});

/* ========================================================= kuvan osoite */

test('kalotin osoite on versioitu ja ämpärissä', () => {
  for (const puoli of PUOLET) {
    const url = napakalotinUrl(puoli);
    assert.match(url, /^https:\/\/media\.matkakirja\.app\/julisteet\/pallo\/napakalotit\//);
    assert.ok(url.endsWith(`/${puoli}.webp`), `kalotin kuva on webp, ei ${url}`);
    assert.ok(url.includes(NAPAKALOTTI_VERSIO));
  }
  assert.match(NAPAKALOTTI_VERSIO, /^\d{4}-\d{2}-\d{2}[a-z]$/);
  assert.equal(kalottienKansio('2026-09-11a'), 'julisteet/pallo/napakalotit/2026-09-11a/');
});

test('peli lataa kalotin niin, ettei puuttuva kuva riko palloa', () => {
  const pallo = lue('../js/pallo.js');
  // Varakeino: yksivärinen kansi jää, jos kuvaa ei saada.
  assert.match(pallo, /kuva\.onerror = \(\) => \{\};/);
  assert.match(pallo, /kuva\.crossOrigin = 'anonymous';/);
  // Verkko ja tekstuuri syntyvät vasta onloadissa.
  assert.match(pallo, /kuva\.onload = \(\) => \{/);
  // Materiaaliluokka on yhä laattojen oma (valaistu) — ei MeshBasic.
  assert.match(pallo, /const materiaali = new LaattaMateriaali\(\{\n\s*map: tekstuuri, transparent: true, depthWrite: false,/);
  // Kansi on yhä laattojen yläpuolella eikä korotusta ole poistettu.
  assert.match(pallo, /sade: sade \* \(NAPAKANNEN_KOROTUS \+ 0\.001\)/);
});

/* ============================================ työkalun oma geometria */

test('kalotinKuvaan on kalotinKuvapiste kuvan kokoon skaalattuna', () => {
  for (const puoli of PUOLET) {
    for (const [lat, lon] of [[NAPAKALOTTI[puoli].merkki * 85, 20], [NAPAKALOTTI[puoli].reuna, -100]]) {
      const a = kalotinKuvapiste(puoli, lat, lon);
      const b = kalotinKuvaan(puoli, lat, lon, 512);
      assert.ok(Math.abs(b.x - a.x * 512) < 1e-9);
      assert.ok(Math.abs(b.y - a.y * 512) < 1e-9);
      assert.ok(Math.abs(b.r - a.r) < 1e-12);
    }
  }
});

test('reunan häivytys: täysi peitto sisällä, nolla kehällä, jatkuva välissä', () => {
  const haive = 0.15;
  assert.equal(reunanPeitto(0, haive), 1);
  assert.equal(reunanPeitto(1 - haive, haive), 1);
  assert.equal(reunanPeitto(1, haive), 0);
  assert.equal(reunanPeitto(1.4, haive), 0);
  assert.ok(Math.abs(reunanPeitto(1 - haive / 2, haive) - 0.5) < 1e-12);
  let edellinen = 1;
  for (let r = 1 - haive; r <= 1; r += haive / 40) {
    const p = reunanPeitto(r, haive);
    assert.ok(p <= edellinen + 1e-12, `peitto ei saa kasvata (${r})`);
    assert.ok(p >= 0 && p <= 1);
    edellinen = p;
  }
  // Ilman häivytystä raja on terävä mutta määritelty.
  assert.equal(reunanPeitto(0.999, 0), 1);
  assert.equal(reunanPeitto(1, 0), 0);
  assert.ok(HAIVE_AST > 0 && HAIVE_AST < 5);
});

test('siirraPinnalla kulkee oikean matkan myös navalla', () => {
  const matka = 100000;
  const kulma = (matka / MAAN_SADE) * (180 / Math.PI);
  const p = siirraPinnalla(0, 0, 0, matka);
  assert.ok(Math.abs(p.lat - kulma) < 1e-6);
  assert.ok(Math.abs(p.lon) < 1e-9);
  const i = siirraPinnalla(0, 0, 90, matka);
  assert.ok(Math.abs(i.lon - kulma) < 1e-6);
  assert.ok(Math.abs(i.lat) < 1e-9);
  // Navalla: mihin tahansa suuntaan lähdetään, leveysaste laskee saman
  // verran — juuri tässä tavallinen cos(lat)-kaava räjähtäisi.
  for (const suunta of [0, 45, 90, 180, 270]) {
    const n = siirraPinnalla(90, 0, suunta, matka);
    assert.ok(Math.abs(n.lat - (90 - kulma)) < 1e-6, `napa ${suunta}`);
    assert.ok(Number.isFinite(n.lon));
  }
  const e = siirraPinnalla(-90, 0, 0, matka);
  assert.ok(Math.abs(e.lat - (-90 + kulma)) < 1e-6);
});

test('napavarjostus antaa tasaisella maalla auringon korkeuskulman sinin', () => {
  const tasainen = () => 400;
  const v = napavarjostus(tasainen, 89.99, 0, 5566);
  assert.ok(Math.abs(v - Math.sin(VALO.korkeuskulma * (Math.PI / 180))) < 1e-9);
});

test('napavarjostus on sama kaava kuin julisteen rinnevarjo', () => {
  /*
   * Sama rinne, kaksi laskutapaa: julisteen varjostusPisteessa
   * (asteaskel ja cos-jakaja) ja tämän työkalun geodeettinen askel.
   * Keskileveyksillä niiden on annettava sama valoisuus — muuten
   * kalotin ja laattojen varjo eroaisi saumassa.
   */
  const M = 111320;
  const lat0 = 60;
  // Rinne, joka nousee 500 m astetta kohti itään ja 200 m pohjoiseen.
  const korkeusLonLat = (lon, lat) => 1000 + (lon - 10) * 500 + (lat - lat0) * 200;
  const korkeusLatLon = (lat, lon) => korkeusLonLat(lon, lat);
  const d = 0.05;
  const a = varjostusPisteessa(korkeusLonLat, 10, lat0, d);
  const b = napavarjostus(korkeusLatLon, lat0, 10, d * M * Math.cos(lat0 * (Math.PI / 180)));
  assert.ok(Math.abs(a - b) < 5e-3, `${a} vs ${b}`);
});

test('napavarjostus on äärellinen navalla, jossa julisteen kaava ei ole', () => {
  const kumpu = (lat, lon) => 2800 + Math.cos(lon * (Math.PI / 180)) * (90 - lat) * 30;
  const v = napavarjostus(kumpu, 90, 0, 5566);
  assert.ok(Number.isFinite(v) && v >= 0 && v <= 1);
  const v2 = napavarjostus(kumpu, 89.999, 123, 5566);
  assert.ok(Number.isFinite(v2) && v2 >= 0 && v2 <= 1);
  // Ruudukon ulkopuoli (NaN) on neutraali 0,5, kuten moottorilla.
  assert.equal(napavarjostus(() => NaN, 89, 0, 5566), 0.5);
});

/* ========================================== maa vai meri leveyspiireittäin */

/** Neliönmuotoinen "meri" ja sen sisällä "saari" (reikä). */
const KOEMERI = [
  [[-20, -20], [20, -20], [20, 20], [-20, 20]],
  [[-5, -5], [5, -5], [5, 5], [-5, 5]],
];

test('meren parillisuussääntö: sisällä merta, reiässä maata', () => {
  const i = meriIndeksi(KOEMERI, { lat0: -30, lat1: 30 });
  const leik = leveyspiirinLeikkaukset(i, 0);
  assert.deepEqual(Array.from(leik), [-20, -5, 5, 20]);
  assert.equal(merenAlalla(leik, -30), false, 'monikulmion ulkopuoli');
  assert.equal(merenAlalla(leik, -10), true, 'meri');
  assert.equal(merenAlalla(leik, 0), false, 'saari reiässä');
  assert.equal(merenAlalla(leik, 10), true, 'meri saaren toisella puolen');
  assert.equal(merenAlalla(leik, 30), false, 'monikulmion ulkopuoli');
});

test('meri-indeksi jättää pois leveyspiirit, joita kalotti ei kata', () => {
  const i = meriIndeksi(KOEMERI, { lat0: 50, lat1: 90 });
  assert.equal(i.ya.length, 0);
  assert.equal(leveyspiirinLeikkaukset(i, 60).length, 0);
  assert.equal(merenAlalla(leveyspiirinLeikkaukset(i, 60), 0), false);
});

test('vaakasuora reuna ei tuota leikkausta (ei kaksoislaskentaa)', () => {
  const i = meriIndeksi([[[-10, 5], [10, 5], [10, 15], [-10, 15]]], { lat0: 0, lat1: 20 });
  // Neljästä reunasta kaksi on vaakasuoraa.
  assert.equal(i.ya.length, 2);
  assert.equal(leveyspiirinLeikkaukset(i, 10).length, 2);
});

test('leikkaustaulu poimii lähimmän leveyspiirin', () => {
  const i = meriIndeksi(KOEMERI, { lat0: -30, lat1: 30 });
  const t = leikkaustaulu(i, { lat0: -20, lat1: 20, askel: 0.01 });
  assert.equal(t.rivit, 4001);
  assert.equal(merenAlalla(taulunRivi(t, 0), -10), true);
  assert.equal(merenAlalla(taulunRivi(t, 0), 0), false);
  assert.equal(merenAlalla(taulunRivi(t, 10), 0), true, 'saaren pohjoispuoli on merta');
  // Taulukon ulkopuolelle jäävä leveysaste rajautuu reunariviin.
  assert.equal(taulunRivi(t, 999), t.taulu[t.rivit - 1]);
  assert.equal(taulunRivi(t, -999), t.taulu[0]);
});

/* ================================================ viivan rasterointi */

test('janan peitto: keskellä täysi, kaukana nolla, reunalla osittainen', () => {
  const N = 16;
  const peitto = new Uint8Array(N * N);
  // Jana pikselien keskipisteiden läpi (y = 8,5), kynän leveys 2.
  piirraJana(peitto, N, 2.5, 8.5, 12.5, 8.5, 2);
  assert.equal(peitto[8 * N + 7], 255, 'janan päällä');
  assert.equal(peitto[8 * N + 3], 255, 'alkupää');
  assert.equal(peitto[8 * N + 12], 255, 'loppupää');
  assert.equal(peitto[5 * N + 7], 0, 'kaukana');
  assert.ok(peitto[7 * N + 7] > 0 && peitto[7 * N + 7] < 255, 'reunapikseli osittain');
  assert.equal(peitto[6 * N + 7], 0, 'kynän ulkopuolella');
  assert.equal(peitto[8 * N + 0], 0, 'janan päiden ulkopuolella');
  // Pyöreä pää: janan pää jatkuu puolen kynänleveyden verran.
  assert.ok(peitto[8 * N + 2] > 0, 'pyöreä pää');
});

test('janan peitto yhdistetään maksimilla eikä summalla', () => {
  const N = 8;
  const peitto = new Uint8Array(N * N);
  piirraJana(peitto, N, 1, 4, 6, 4, 1);
  const kerran = peitto[4 * N + 3];
  piirraJana(peitto, N, 1, 4, 6, 4, 1);
  assert.equal(peitto[4 * N + 3], kerran, 'sama jana kahdesti ei tummenna');
});

test('kuvan ulkopuolinen jana ei kirjoita puskurin yli', () => {
  const N = 8;
  const peitto = new Uint8Array(N * N);
  piirraJana(peitto, N, -50, -50, -40, -40, 3);
  assert.equal(peitto.reduce((a, b) => a + b, 0), 0);
  piirraJana(peitto, N, 200, 200, 300, 300, 3);
  assert.equal(peitto.reduce((a, b) => a + b, 0), 0);
});

/* ============================================================ jään sävyt */

test('jääasteikko nousee ja alkaa laattojen napajään sävystä', () => {
  for (let i = 1; i < JAA_ASTEIKKO.length; i += 1) {
    assert.ok(JAA_ASTEIKKO[i].m > JAA_ASTEIKKO[i - 1].m, 'metrit nousevat');
    for (let k = 0; k < 3; k += 1) {
      assert.ok(JAA_ASTEIKKO[i].v[k] >= JAA_ASTEIKKO[i - 1].v[k], 'sävy vaalenee');
    }
  }
  // Varjostus vaalentaa tasaista maata noin 7,8 %: ylin sävy ei saa
  // leikkautua valkoiseksi (ks. tools/tee-napakalotit.mjs JAA_ASTEIKKO).
  const ylin = JAA_ASTEIKKO[JAA_ASTEIKKO.length - 1].v;
  for (const kanava of ylin) assert.ok(kanava * 1.078 < 250, 'ei leikkaudu');
});

test('työnkulku ja työkalu ovat samaa mieltä ämpärin polusta', () => {
  const tyonkulku = lue('../.github/workflows/tee-napakalotit.yml');
  assert.match(tyonkulku, /tools\/tee-napakalotit\.mjs/);
  assert.match(tyonkulku, /kansio\.txt/);
  assert.match(tyonkulku, /ne_10m_ocean\.geojson/);
  // Salaisuudet tarkistetaan ennen vientiä, kuten muissakin vientiajoissa.
  assert.match(tyonkulku, /R2_ACCESS_KEY_ID/);
  assert.match(tyonkulku, /R2_BUCKET/);
});

/* ============================================ liitossävy (11.9.2026) */

/*
 * OMISTAJA 11.9.2026: *"Rajat näkyvät yhä."* Mitattu syy oli, että
 * kalotin meri oli 9–12 luminanssiyksikköä tummempi kuin laatta sen
 * alla: laatoissa ei ole napojen leveyksillä karttaa lainkaan vaan
 * tasainen täytemeri, ja kalotin oikea batymetria on sitä tummempi.
 * Nämä testit vartioivat sitä koneistoa, joka ankkuroi kalotin meren
 * laattojen sävyyn (tools/tee-napakalotit.mjs LIITOSSÄVY).
 */

test('liitoskaista on kalotin kehältä napaan päin, ei ulos', () => {
  for (const puoli of PUOLET) {
    const k = NAPAKALOTTI[puoli];
    const latit = liitoskaistanLeveydet(puoli);
    assert.equal(latit.length, LIITOS_NAYTTEET.leveyksia);
    for (const lat of latit) {
      // Napaa kohti = itseisarvo kasvaa, mutta enintään kaistan verran.
      assert.ok(Math.abs(lat) > Math.abs(k.reuna), `${puoli} ${lat}`);
      assert.ok(Math.abs(lat) < Math.abs(k.reuna) + LIITOS_KAISTA + 1e-9, `${puoli} ${lat}`);
      // Sama pallonpuolisko kuin kalotti.
      assert.equal(Math.sign(lat), k.merkki);
      // Kaista on kalotin kuvan sisällä (r < 1).
      assert.ok(kalotinKuvapiste(puoli, lat, 0).r < 1);
    }
  }
});

test('liitoskaista ulottuu kohtaan, jossa kuva on jo täysin peittävä', () => {
  // Muuten kohdesävy mitattaisiin vain häivytyskaistalta, jossa kalotti
  // ei vielä määrää sävyä — ja askel osuisi juuri kaistan sisäreunaan.
  assert.ok(LIITOS_KAISTA > HAIVE_AST);
});

test('laattaKoordinaatit on Web Mercator: päiväntasaaja keskellä', () => {
  const a = laattaKoordinaatit(0, 0, 2);
  assert.ok(Math.abs(a.x - 2) < 1e-9);
  assert.ok(Math.abs(a.y - 2) < 1e-9);
  assert.equal(a.n, 4);
  // Pohjoinen on pienempi y, itä suurempi x.
  assert.ok(laattaKoordinaatit(60, 0, 4).y < laattaKoordinaatit(0, 0, 4).y);
  assert.ok(laattaKoordinaatit(0, 90, 4).x > laattaKoordinaatit(0, 0, 4).x);
});

test('liitossävy luetaan laatoista juuri liitoskaistan kohdalta', async () => {
  const pyydetyt = [];
  const sharp = () => ({
    raw: () => ({
      toBuffer: async () => ({
        // Yksi pikseli riittää: kaikki näytteet osuvat samaan.
        data: Uint8Array.from([120, 130, 140, 255]),
        info: { width: 1, height: 1, channels: 4 },
      }),
    }),
  });
  const hae = async (url) => { pyydetyt.push(url); return { ok: true, arrayBuffer: async () => new ArrayBuffer(4) }; };
  const savy = await laattojenLiitossavy({ puoli: 'pohjoinen', sharp, hae, hiljaa: true });
  assert.deepEqual(savy, [120, 130, 140]);
  assert.ok(pyydetyt.length > 0);
  for (const url of pyydetyt) {
    assert.ok(url.startsWith('https://media.matkakirja.app/julisteet/pallo/laatat/'), url);
    assert.match(url, new RegExp(`/${LIITOS_LAATTATASO}/\\d+/\\d+\\.jpg$`), url);
  }
});

test('liitossävy palauttaa nullin, jos laattoja ei saada — varaluku jää käyttöön', async () => {
  const sharp = () => { throw new Error('ei pitäisi kutsua'); };
  const hae = async () => null;
  const savy = await laattojenLiitossavy({ puoli: 'etela', sharp, hae, hiljaa: true });
  assert.equal(savy, null);
  for (const puoli of PUOLET) {
    assert.equal(LIITOS_VARA[puoli].length, 3);
    for (const kanava of LIITOS_VARA[puoli]) {
      assert.ok(kanava > 150 && kanava < 240, `${puoli} ${kanava}`);
    }
  }
});

test('peli ottaa yksivärisen kannen pois, kun kalotti on paikallaan', () => {
  const pallo = lue('../js/pallo.js');
  /*
   * Kansi ja kalotti ovat SAMASSA renderOrderissa (vektorien alla),
   * kaikki napakappaleet ovat origossa eikä kalotti kirjoita syvyyttä:
   * piirtojärjestys ei siis ratkaise, kumpi jää päälle. Mitattu
   * 11.9.2026 etelänavalta, jossa kansi voitti. Varakappale otetaan
   * siksi pois näkyvistä — eikä kalottia nosteta vektorien yli.
   */
  assert.match(pallo, /for \(const k of kannet\[puoli\]\) k\.visible = false;/);
  assert.match(pallo, /const kannet = \{ pohjoinen: \[\], etela: \[\] \};/);
  assert.doesNotMatch(pallo, /verkko\.renderOrder = 1;/);
});

/* ============================ zoom: kalotti vektoriviivan ALLE (11.9.2026) */

/*
 * OMISTAJA 11.9.2026: *"Niin se saisi piirtyä hyvin, myös silloin kun
 * sitä zoomaan."* Lähikuvan terävyys tulee rantaviivasta, joka on
 * pallolla vektori (js/pallovektorit.js) — mutta vain jos kalotti
 * piirtyy sen ALLE. Läpinäkyvien jono ratkaistaan renderOrderilla,
 * joten tämä on numeroiden eikä silmän asia.
 */
test('napakansi ja kalotti piirtyvät vektoriviivan alle mutta laattojen päälle', () => {
  assert.ok(NAPAKALOTTI_RENDER_ORDER < VEKTORIT_RENDER_ORDER,
    'kalotti peittäisi rantaviivan: renderOrder on vektorikerroksen päällä');
  // Laatat ja lepokerros ovat ≤ −1 (js/pallolaatat.js, js/pallo.js).
  assert.ok(NAPAKALOTTI_RENDER_ORDER > -1,
    'kalotti jäisi laattojen ja lepokerroksen alle');
  const pallo = lue('../js/pallo.js');
  // Molemmat verkot — yksivärinen kansi JA karttakalotti — saavat luvun.
  const osumat = pallo.match(/renderOrder = NAPAKALOTTI_RENDER_ORDER/g) ?? [];
  assert.equal(osumat.length, 2, 'kansi ja kalotti eivät molemmat saa renderOrderia');
});

test('kalottikuvat ovat webp ja eteläkalotti on pohjoista tarkempi', () => {
  assert.equal(NAPAKALOTTI_PAATE, 'webp');
  const tyokalu = lue('../tools/tee-napakalotit.mjs');
  assert.match(tyokalu, /\.webp\(\{ quality: laatu, alphaQuality: 100/,
    'alfa on kirjoitettava häviöttömästi, tai reunan häivytys rakeistuu');
  assert.match(tyokalu, /\$\{puoli\}\.webp/);
  // Eteläkalotti kattaa 60–90° eli kolme kertaa leveämmän kaistan kuin
  // pohjoinen (80–90°): samalla sivulla se olisi kolmasosan tarkkuudesta.
  const asteita = (puoli) => Math.abs(NAPAKALOTTI[puoli].merkki * 90 - NAPAKALOTTI[puoli].reuna);
  const pxAste = (puoli) => KOKO_PUOLITTAIN[puoli] / 2 / asteita(puoli);
  assert.ok(pxAste('etela') >= 60, `eteläkalotti ${pxAste('etela')} px/aste`);
  assert.ok(pxAste('pohjoinen') >= 60, `pohjoiskalotti ${pxAste('pohjoinen')} px/aste`);
  assert.ok(KOKO_PUOLITTAIN.etela > KOKO_PUOLITTAIN.pohjoinen);
  assert.ok(LAATU_OLETUS >= 82 && LAATU_OLETUS <= 95);
});

test('työnkulku vie kalotit webp:nä ja tarkistaa alfan', () => {
  const tyonkulku = lue('../.github/workflows/tee-napakalotit.yml');
  assert.match(tyonkulku, /--content-type image\/webp/);
  assert.match(tyonkulku, /napakalotit-ulos\/\$p\.webp/);
  assert.match(tyonkulku, /koko_etela:/);
  assert.match(tyonkulku, /m\.format!=='webp'/);
});
