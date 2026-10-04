/*
 * Dioraaman rakennuskoneen (tools/dioraama/rakenna.mjs) putkitestit
 * (Linnanrakentaja, ali-agentti B3). Speksi: docs/raportit/
 * dioraama-rajapinnat-20260929.md kohdat 0, 3, 3b.
 *
 * Oma pieni fixture-rakennus (laatta + seinä + tulisija + valo, 2 tilaa) —
 * EI js/dioraama/rakennukset/olavinlinna.js:ää, jotta testi on nopea ja
 * riippumaton oikean pelidatan laajuudesta. Käyttää OIKEITA B1/B2-moduuleja
 * (glb.mjs, reseptit.mjs) — ei mockeja — koska koko putken pitää toimia
 * yhdessä oikeiden rajapintojen kanssa.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { rakennaData, tihenna, tihennysraja } from '../tools/dioraama/rakenna.mjs';
import { sijoita } from '../tools/dioraama/reseptit.mjs';
import { lueGlb } from '../tools/dioraama/glb.mjs';

/* ==================== Pieni fixture-rakennus ==================== */
// 'tupa': laatta (lattia) + seinä (pohjoisessa, z=-3) + tulisija (hiillos-pinta,
//   hehku 1) + yksi valo keskellä huonetta. 'aitta': pelkkä laatta, EI valoa —
//   käytetään "ei lämpöä ilman valoa" -vertailukohtana ja naapurina AO:n
//   peittäjätestille (naapurit: oma tila + naapurit + 'massa' — tässä
//   fixturessa ei ole 'massa'-tilaa, joten peittäjät ovat vain oma+naapuri).
const TUPA = {
  id: 'tupa',
  nimi: 'Tupa',
  kohdistettava: true,
  rajat: { min: [-3, -0.5, -3], max: [3, 3, 3] },
  naapurit: ['aitta'],
  kamera: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 20, etaisyys: 15, fov: 35, aukko: 0.5 },
  pulu: { laskeutuminen: [0, 0, 0], taulupuoli: 'oikea' },
  taulu: {
    otsikko: 'Tupa',
    tila: 'luonnos',
    kohdat: [{ teksti: 'a', lahde: 't' }, { teksti: 'b', lahde: 't' }, { teksti: 'c', lahde: 't' }],
  },
  valot: [{ paikka: [0, 1.5, 0], sade: 4, voima: 1 }],
  palikat: [
    { resepti: 'laatta', paikka: [0, 0, 0], suunta: 0, leveys: 6, syvyys: 6, paksuus: 0.3 },
    { resepti: 'seina', paikka: [0, 0, -3], suunta: 0, pituus: 6, korkeus: 3, paksuus: 0.3 },
    {
      resepti: 'tulisija', paikka: [0, 0, -2.5], suunta: 180, leveys: 2, syvyys: 1, korkeus: 0.8,
      huuva: { korkeus: 1.4, yla: 3 },
    },
  ],
  hahmot: [],
  aanet: [],
  kasikirjoitus: [],
};

const AITTA = {
  id: 'aitta',
  nimi: 'Aitta',
  kohdistettava: true,
  rajat: { min: [3, -0.5, -3], max: [9, 3, 3] },
  naapurit: ['tupa'],
  kamera: { kohde: [6, 0, 0], atsimuutti: 0, korkeus: 20, etaisyys: 15, fov: 35, aukko: 0.5 },
  pulu: { laskeutuminen: [6, 0, 0], taulupuoli: 'vasen' },
  taulu: {
    otsikko: 'Aitta',
    tila: 'luonnos',
    kohdat: [{ teksti: 'd', lahde: 't' }, { teksti: 'e', lahde: 't' }, { teksti: 'f', lahde: 't' }],
  },
  palikat: [
    { resepti: 'laatta', paikka: [6, 0, 0], suunta: 0, leveys: 6, syvyys: 6, paksuus: 0.3 },
  ],
  hahmot: [],
  aanet: [],
  kasikirjoitus: [],
};

const FIXTURE_RAKENNUS = {
  id: 'keittio-testi',
  nimi: 'Testitupa',
  otsikko: 'Testitupa',
  versio: 1,
  lahteet: [{ nimi: 'testi', osoite: 'https://example.test/' }],
  geoAnkkuri: { lat: 0, lon: 0, suuntima: 0 },
  aikakerros: { id: 'testi', nimi: 'Testi' },
  yleiskamera: {
    vaaka: { kohde: [3, 0, 0], atsimuutti: 0, korkeus: 40, etaisyys: 30, fov: 30, aukko: 0.3 },
    pysty: { kohde: [3, 0, 0], atsimuutti: 0, korkeus: 45, etaisyys: 40, fov: 35, aukko: 0.3 },
  },
  pulu: { laskeutuminen: [0, 0, 0] },
  taulu: {
    otsikko: 'Testitupa',
    tila: 'luonnos',
    kohdat: [{ teksti: 'x', lahde: 't' }, { teksti: 'y', lahde: 't' }, { teksti: 'z', lahde: 't' }],
  },
  tilat: [TUPA, AITTA],
};

const SAATEITA_TESTISSA = 16; // vähemmän kuin oletus 48 — riittää testiin, nopeuttaa ajoa

/* ==================== Pienet apurit ==================== */

function uusiTilapaisinenKansio() {
  return mkdtempSync(join(tmpdir(), 'dioraama-rakennuskone-test-'));
}

function loydaOsa(glb, pinta) {
  const osa = glb.osat.find((o) => o.pinta === pinta);
  assert.ok(osa, `pinta '${pinta}' puuttuu glb:stä '${glb.nimi}' (löytyi: ${glb.osat.map((o) => o.pinta).join(', ')})`);
  return osa;
}

/** Lähimmän kärjen indeksi annetusta maailmapisteestä (neliöllinen etäisyys). */
function loydaLahinKarkiIndeksi(paikat, kohde) {
  let paras = -1; let parasD = Infinity;
  for (let i = 0; i < paikat.length / 3; i++) {
    const dx = paikat[i * 3] - kohde[0]; const dy = paikat[i * 3 + 1] - kohde[1]; const dz = paikat[i * 3 + 2] - kohde[2];
    const d = dx * dx + dy * dy + dz * dz;
    if (d < parasD) { parasD = d; paras = i; }
  }
  return paras;
}

/* ==================== 0: linnan puheet pankkiin (#3742) ==================== */
test('rakennus.json:n aanet kattaa kertojan, Pulun, kuunnelman ja etsinnän puheet', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const rakennus = {
      ...FIXTURE_RAKENNUS,
      pulu: { ...FIXTURE_RAKENNUS.pulu, aani: 'laituri-pulu' },
      kertoja: { jaksot: [{ id: 'j1', teksti: 'T.', aani: 'linna-kertoja-jarvelta' }, { id: 'j2', teksti: 'U.', aani: null }] },
      tilat: [
        { ...TUPA, pulu: { ...TUPA.pulu, aani: 'fatabuuri-k1' }, kuunnelma: [{ id: 'k1', aani: 'laituri-k1' }, { id: 'k2' }],
          etsinta: [{ tyyppi: 'repliikki', repliikki: { aani: 'keittio-etsinta-0', teksti: 'x' } }] },
        AITTA,
      ],
    };
    const tulos = await rakennaData(rakennus, { ulos, saateita: SAATEITA_TESTISSA });
    const aanet = JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8')).aanet;
    for (const id of ['laituri-pulu', 'linna-kertoja-jarvelta', 'fatabuuri-k1', 'laituri-k1', 'keittio-etsinta-0']) {
      assert.ok(aanet[id], `ääni '${id}' puuttuu rakennus.json:n aanet-pankista`);
      assert.match(aanet[id].tiedosto, new RegExp(`^aanet/v\\d+/${id}\\.mp3$`));
    }
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 1: putki tuottaa glb:t, jotka lueGlb jäsentää ==================== */

test('rakennaData tuottaa glb:t joita lueGlb jäsentää (molemmat tilat)', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(FIXTURE_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    assert.equal(tulos.tilat.length, 2);
    for (const tila of FIXTURE_RAKENNUS.tilat) {
      const t = tulos.tilat.find((x) => x.id === tila.id);
      assert.ok(t, `tilan '${tila.id}' tulos puuttuu`);
      const buf = readFileSync(join(tulos.kansio, 'tilat', `${tila.id}.glb`));
      assert.equal(buf.length, t.tavuja);
      const glb = lueGlb(buf);
      assert.equal(glb.nimi, tila.id);
      assert.ok(glb.osat.length >= 1, `tilalla '${tila.id}' pitäisi olla vähintään 1 primitiivi`);
      for (const osa of glb.osat) {
        assert.ok(osa.paikat.length > 0 && osa.paikat.length % 3 === 0);
        assert.equal(osa.normaalit.length, osa.paikat.length);
        assert.equal(osa.uv.length, (osa.paikat.length / 3) * 2);
        assert.equal(osa.varit.length, (osa.paikat.length / 3) * 4);
        assert.ok(osa.kolmiot.length > 0 && osa.kolmiot.length % 3 === 0);
        // Normaalien pitää olla (lähes) yksikköpituisia.
        for (let i = 0; i < osa.normaalit.length; i += 3) {
          const l = Math.hypot(osa.normaalit[i], osa.normaalit[i + 1], osa.normaalit[i + 2]);
          assert.ok(Math.abs(l - 1) < 1e-3, `normaali ei ole yksikköpituinen (${l}) osassa '${osa.pinta}'`);
        }
      }
    }
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 2: kolmiot = sijoita-kolmiot ==================== */

test('tilan kolmiomäärä glb:ssä täsmää tihennettyyn sijoita-määrään', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(FIXTURE_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    for (const tila of FIXTURE_RAKENNUS.tilat) {
      const odotettu = tila.palikat.flatMap((p) => tihenna(sijoita(p), tihennysraja(p, tila))).length;
      const t = tulos.tilat.find((x) => x.id === tila.id);
      assert.equal(t.kolmiot, odotettu, `tila '${tila.id}': glb:n kolmiomäärä ei täsmää sijoita():n tuottamaan`);
      // Ristiin varmistus lukemalla glb takaisin ja laskemalla primitiivien kolmiot.
      const buf = readFileSync(join(tulos.kansio, 'tilat', `${tila.id}.glb`));
      const glb = lueGlb(buf);
      const glbKolmiot = glb.osat.reduce((s, o) => s + o.kolmiot.length / 3, 0);
      assert.equal(glbKolmiot, odotettu, `tila '${tila.id}': luetun glb:n kolmiomäärä ei täsmää`);
    }
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 3: AO ∈ [0,1], nurkassa pienempi kuin avoimella lattialla ==================== */

test('AO on välillä [0,1] ja pienempi seinän vieressä kuin avoimella lattialla', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(FIXTURE_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    const tupaTulos = tulos.tilat.find((t) => t.id === 'tupa');
    const glb = lueGlb(readFileSync(join(tulos.kansio, 'tilat', 'tupa.glb')));

    // Kaikkien osien kaikki AO-arvot (COLOR_0.R) välillä [0,1] (varit on 0–255 UNSIGNED_BYTE).
    for (const osa of glb.osat) {
      for (let i = 0; i < osa.varit.length; i += 4) {
        const ao = osa.varit[i] / 255;
        assert.ok(ao >= 0 && ao <= 1, `AO (${ao}) osassa '${osa.pinta}' ei ole välillä [0,1]`);
      }
    }

    // Lattian ('lankku', OLETUSPINNAT laatan 'yla'-roolille) kulma seinän vieressä
    // (seinä z=-3:ssa) vs. kulma kaukana seinästä (z=+3): peräkkäin sijoita() tuottaa
    // laatan 4 kulmaa tarkalleen, joten haetaan LÄHIN kärki riippumatta tessellaatiosta.
    const lattia = loydaOsa(glb, 'lankku');
    const iNurkka = loydaLahinKarkiIndeksi(lattia.paikat, [-3, 0, -3]);
    const iAvoin = loydaLahinKarkiIndeksi(lattia.paikat, [-3, 0, 3]);
    const aoNurkka = lattia.varit[iNurkka * 4] / 255;
    const aoAvoin = lattia.varit[iAvoin * 4] / 255;
    assert.ok(aoAvoin > 0.7, `kaukana seinästä AO (${aoAvoin}) oli yllättävän matala`);
    assert.ok(aoNurkka < aoAvoin, `seinän vierestä AO (${aoNurkka}) ei ollut pienempi kuin avoimen lattian (${aoAvoin})`);
    assert.equal(tupaTulos.karkia > 0, true);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 4: deterministisyys (kaksi ajoa = sama manifest) ==================== */

test('deterministisyys: kaksi ajoa tuottavat tavu-identtiset manifest.json/rakennus.json/glb:t', async () => {
  const ulos1 = uusiTilapaisinenKansio();
  const ulos2 = uusiTilapaisinenKansio();
  try {
    const t1 = await rakennaData(FIXTURE_RAKENNUS, { ulos: ulos1, saateita: SAATEITA_TESTISSA });
    const t2 = await rakennaData(FIXTURE_RAKENNUS, { ulos: ulos2, saateita: SAATEITA_TESTISSA });

    const manifest1 = readFileSync(join(t1.kansio, 'manifest.json'));
    const manifest2 = readFileSync(join(t2.kansio, 'manifest.json'));
    assert.ok(manifest1.equals(manifest2), 'manifest.json ei ollut tavu-identtinen kahdella ajolla');

    const rakennus1 = readFileSync(join(t1.kansio, 'rakennus.json'));
    const rakennus2 = readFileSync(join(t2.kansio, 'rakennus.json'));
    assert.ok(rakennus1.equals(rakennus2), 'rakennus.json ei ollut tavu-identtinen kahdella ajolla');

    for (const tila of FIXTURE_RAKENNUS.tilat) {
      const g1 = readFileSync(join(t1.kansio, 'tilat', `${tila.id}.glb`));
      const g2 = readFileSync(join(t2.kansio, 'tilat', `${tila.id}.glb`));
      assert.ok(g1.equals(g2), `tilat/${tila.id}.glb ei ollut tavu-identtinen kahdella ajolla`);
    }
  } finally {
    rmSync(ulos1, { recursive: true, force: true });
    rmSync(ulos2, { recursive: true, force: true });
  }
});

/* ==================== 5: rakennus.json sisältää glb-kentät ==================== */

test('rakennus.json sisältää glb-kentät jokaiselle tilalle ja käytetyt pinnat/henkilot/aanet', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(FIXTURE_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    const rakennusJson = JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8'));
    assert.equal(rakennusJson.id, FIXTURE_RAKENNUS.id);
    assert.equal(rakennusJson.tilat.length, 2);
    for (const tila of rakennusJson.tilat) {
      assert.ok(tila.glb, `tilalta '${tila.id}' puuttuu glb-kenttä rakennus.json:ssa`);
      assert.equal(typeof tila.glb.tiedosto, 'string');
      assert.match(tila.glb.sha256, /^[0-9a-f]{64}$/, `tilan '${tila.id}' sha256 ei ole kelvollinen hex-tiiviste`);
      assert.ok(Number.isInteger(tila.glb.kolmiot) && tila.glb.kolmiot > 0);
      assert.ok(Number.isInteger(tila.glb.karkia) && tila.glb.karkia > 0);
    }
    assert.equal(typeof rakennusJson.pinnat, 'object');
    assert.ok(Object.keys(rakennusJson.pinnat).length > 0, 'pinnat puuttuu tai on tyhjä rakennus.json:ssa');
    assert.equal(typeof rakennusJson.henkilot, 'object');
    assert.equal(typeof rakennusJson.aanet, 'object');

    // manifest.json: aakkosjärjestys, sha256/tavuja jokaiselle, ei aikaleimoja.
    const manifest = JSON.parse(readFileSync(join(tulos.kansio, 'manifest.json'), 'utf8'));
    assert.equal(manifest.rakennus, FIXTURE_RAKENNUS.id);
    assert.equal(manifest.versio, FIXTURE_RAKENNUS.versio);
    assert.match(manifest.hash, /^[0-9a-f]{64}$/);
    assert.ok(manifest.tiedostot.length >= 3); // vähintään 2 glb + rakennus.json (ei hahmoja tässä fixturessa)
    const polut = manifest.tiedostot.map((t) => t.polku);
    const aakkosissa = [...polut].sort();
    assert.deepEqual(polut, aakkosissa, 'manifest.tiedostot ei ole aakkosjärjestyksessä');
    for (const t of manifest.tiedostot) {
      assert.match(t.sha256, /^[0-9a-f]{64}$/);
      assert.ok(Number.isInteger(t.tavuja) && t.tavuja > 0);
    }
    assert.equal(JSON.stringify(manifest).includes('aikaleima'), false);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 6: lämpö suurin valon lähellä ==================== */

test('lämpö on suurin valon lähellä, ja nolla huoneessa jossa ei ole valoa eikä hehkua', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    await rakennaData(FIXTURE_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    const kansio = join(ulos, FIXTURE_RAKENNUS.id);

    const tupaGlb = lueGlb(readFileSync(join(kansio, 'tilat', 'tupa.glb')));
    const lattiaTupa = loydaOsa(tupaGlb, 'lankku');
    const iLahella = loydaLahinKarkiIndeksi(lattiaTupa.paikat, [0, 0, 0]); // valon [0,1.5,0] alla
    const iKaukana = loydaLahinKarkiIndeksi(lattiaTupa.paikat, [-3, 0, 3]); // huoneen kaukaisin kulma
    const lampoLahella = lattiaTupa.varit[iLahella * 4 + 1] / 255;
    const lampoKaukana = lattiaTupa.varit[iKaukana * 4 + 1] / 255;
    assert.ok(lampoLahella > 0, `valon alla lämmön (${lampoLahella}) pitäisi olla > 0`);
    assert.ok(lampoLahella > lampoKaukana, `valon alla lämpö (${lampoLahella}) ei ollut suurempi kuin kaukana (${lampoKaukana})`);

    // 'hiillos'-pinta (tulisijan hiilloskansi) saa PINNAT.hiillos.hehku (= 1) lisänä
    // riippumatta valoista — G-kanavan pitää olla lähes täysi jo pelkästä hehkusta.
    const hiillos = tupaGlb.osat.find((o) => o.pinta === 'hiillos');
    assert.ok(hiillos, "tulisijan pitäisi tuottaa 'hiillos'-pinta (ks. speksin resepti-taulukko, kohta 2)");
    for (let i = 0; i < hiillos.varit.length; i += 4) {
      assert.ok(hiillos.varit[i + 1] >= 250, `hiillos-pinnan lämpö (${hiillos.varit[i + 1]}/255) ei ollut lähes täysi (hehku=1)`);
    }

    // 'aitta' ei sisällä valoja eikä hehkuvia pintoja -> lämmön pitää olla tasan 0 kaikkialla.
    const aittaGlb = lueGlb(readFileSync(join(kansio, 'tilat', 'aitta.glb')));
    for (const osa of aittaGlb.osat) {
      for (let i = 1; i < osa.varit.length; i += 4) {
        assert.equal(osa.varit[i], 0, `'aitta': lämmön pitäisi olla 0 (ei valoja eikä hehkua), oli ${osa.varit[i]}`);
      }
    }
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

/* ==================== 7: tyyppi 'keila' ei vaikuta lämmön leivontaan ==================== */

// 'keilahuone': pelkkä lattia + yksi VOIMAKAS ja LÄHELLÄ oleva tyyppi 'keila' -valo (kuvaa ikkunan
// aurinkoa). Omistajan valo-päätös 29.9. (era2b kohta 1/2): auringonvalo ei ole lämpöä, joten
// rakenna.mjs:n pitää ohittaa se COLOR_0.G-leivonnasta — vain hiillos/kynttilä/lamppu-tyyppinen
// piste- tai tulivalo lämmittää. Fixture on OMA (ei TUPA/AITTA), jotta tämä ei sekoita fixturen
// muita, jo olemassa olevia lämpötestejä.
const KEILAHUONE = {
  id: 'keilahuone',
  nimi: 'Keilahuone',
  kohdistettava: true,
  rajat: { min: [-3, -0.5, -3], max: [3, 3, 3] },
  naapurit: [],
  kamera: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 20, etaisyys: 15, fov: 35, aukko: 0.5 },
  pulu: { laskeutuminen: [0, 0, 0], taulupuoli: 'oikea' },
  taulu: {
    otsikko: 'Keilahuone',
    tila: 'luonnos',
    kohdat: [{ teksti: 'a', lahde: 't' }, { teksti: 'b', lahde: 't' }, { teksti: 'c', lahde: 't' }],
  },
  valot: [{
    tyyppi: 'keila', paikka: [0, 0.5, 0], kohti: [0, 0, 0], kulma: 30, sade: 4, voima: 5, vari: '#ffd8a0',
  }],
  palikat: [
    { resepti: 'laatta', paikka: [0, 0, 0], suunta: 0, leveys: 6, syvyys: 6, paksuus: 0.3 },
  ],
  hahmot: [],
  aanet: [],
  kasikirjoitus: [],
};

const KEILA_RAKENNUS = {
  id: 'keila-testi',
  nimi: 'Keilatesti',
  otsikko: 'Keilatesti',
  versio: 1,
  lahteet: [{ nimi: 'testi', osoite: 'https://example.test/' }],
  geoAnkkuri: { lat: 0, lon: 0, suuntima: 0 },
  aikakerros: { id: 'testi', nimi: 'Testi' },
  yleiskamera: {
    vaaka: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 40, etaisyys: 30, fov: 30, aukko: 0.3 },
    pysty: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 45, etaisyys: 40, fov: 35, aukko: 0.3 },
  },
  pulu: { laskeutuminen: [0, 0, 0] },
  taulu: {
    otsikko: 'Keilatesti',
    tila: 'luonnos',
    kohdat: [{ teksti: 'x', lahde: 't' }, { teksti: 'y', lahde: 't' }, { teksti: 'z', lahde: 't' }],
  },
  tilat: [KEILAHUONE],
};

test('tyyppi "keila" -valo ei lämmitä (COLOR_0.G pysyy nollassa voimakkaasta lähivalosta huolimatta)', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(KEILA_RAKENNUS, { ulos, saateita: SAATEITA_TESTISSA });
    const glb = lueGlb(readFileSync(join(tulos.kansio, 'tilat', 'keilahuone.glb')));
    for (const osa of glb.osat) {
      for (let i = 1; i < osa.varit.length; i += 4) {
        assert.equal(osa.varit[i], 0, `tyyppi 'keila' -valon pitäisi ohittaa lämmön leivonta, mutta G oli ${osa.varit[i]}`);
      }
    }

    // rakennus.json vie valon SELLAISENAAN (tyyppi/kohti/kulma mukana) — lämmön leivonnan ohitus ei
    // saa pudottaa mitään kenttää pois ajonaikaista (natiivi/esikatselu) käyttöä varten.
    const rakennusJson = JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8'));
    const huone = rakennusJson.tilat.find((t) => t.id === 'keilahuone');
    assert.deepEqual(huone.valot, KEILAHUONE.valot);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});
