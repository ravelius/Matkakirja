/*
 * PERUSKARTAN RESEPTI 2026-09-25 (Karttaseppä 25.9.2026): DEM-kaistajako,
 * lohkoittainen DEM-ikkuna, GLO-30/GLO-90-valinta, nimetty resepti ja
 * vanhan reseptin tavutarkkuus.
 *
 * DEM testataan keinotekoisilla hakemistoilla (onRuutu + korkeus, tai
 * demHakemisto väärennetyllä avaajalla), joten NAS:ia ei tarvita.
 * Generaattori ajetaan `--kuiva`/`--vain-luettelo`-tiloissa, jotka eivät
 * tarvitse aineistoa eivätkä selainta. Polttoskriptin --lista ajetaan
 * kylvetyllä ämpäriluettelolla ilman verkkoa (POLTTO_LUETTELO_URL).
 *
 * VANHAN RESEPTIN TAVUTARKKUUS vaatii Chromiumin, rantaviiva-aineiston ja
 * sharpin, ja tiivisteet ovat alustakohtaisia (zlib ja liukuluvut eroavat
 * Macin arm64:n ja CI:n Linux x64:n välillä). Koe ohitetaan, jos jokin
 * puuttuu tai alustalle ei ole kirjattu tiivistettä. Ajo Macilla:
 *   FOKUSKARTTA_DATA=<gshhs-data> PW_CHROMIUM=<chrome> \
 *     node --test tests/peruskartta-resepti.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  demIkkuna, kierraAste, ruutuRyhmat,
} from '../tools/maasto/dem-ikkuna.mjs';
import { demHakemisto, kaksiLahdetta, GLO30_KYNNYS } from '../tools/maasto/tee-maasto.mjs';
import {
  RESEPTIT, reseptinShardit, resepti, LOHKO, Z8_SARAKKEITA,
} from '../tools/polttoresepti.mjs';
import { asetaNaytteistys, kirjoitaLuettelo } from '../tools/tee-pallolaatat.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const POLTTO = join(JUURI, 'tools', 'polta-paikallisesti.sh');
const NIMI = '2026-09-25';

/** Tasainen 1′-ikkuna (karkea vara) alueelle, arvo f(lon, lat). */
function karkeaIkkuna({
  lon0, lon1, lat0, lat1,
}, f = () => 100, askel = 1 / 20) {
  const w = Math.round((lon1 - lon0) / askel) + 1;
  const h = Math.round((lat1 - lat0) / askel) + 1;
  const grid = new Int16Array(w * h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) grid[y * w + x] = Math.round(f(lon0 + x * askel, lat1 - y * askel));
  }
  return {
    w, h, lon0, lon1: lon0 + (w - 1) * askel, lat0: lat1 - (h - 1) * askel, lat1, grid,
  };
}

/** Keinotekoinen DEM ilman näytteistintä (vanha rajapinta). */
function keinoDem(ruudut, g) {
  const joukko = new Set(ruudut);
  return {
    onRuutu: (lat, lon) => joukko.has(`${lat},${lon}`),
    korkeus: (lon, lat) => (joukko.has(`${Math.floor(lat)},${Math.floor(lon)}`) ? g(lon, lat) : 0),
  };
}

/* ======================================================= DEM-ikkuna */

test('DEM-ikkuna lohkoittain: jokainen solu sama kuin rivi kerrallaan koottuna', () => {
  const g = (lon, lat) => 400 + 300 * Math.sin(lon * 3.1) * Math.cos(lat * 2.3);
  const ruudut = [];
  for (let la = 44; la <= 46; la += 1) for (let lo = 5; lo <= 8; lo += 1) if ((la + lo) % 3) ruudut.push(`${la},${lo}`);
  const dem = keinoDem(ruudut, g);
  const karkea = karkeaIkkuna({
    lon0: 4, lon1: 10, lat0: 43, lat1: 48,
  }, (lon, lat) => 50 * Math.sin(lon) + 20 * lat - 900);
  const vali = 1 / 60;
  const laatikko = {
    lon0: 5.2, lon1: 8.6, lat0: 44.3, lat1: 46.7,
  };
  const koko = demIkkuna({
    karkea, laatikko, vali, dem,
  });
  // Rivi kerrallaan: yhden rivin ikkuna samasta laatikosta (arvo riippuu
  // vain solun lon/lat:sta, ei järjestyksestä).
  for (let y = 0; y < koko.h; y += 7) {
    const lat = laatikko.lat1 - y * vali;
    const rivi = demIkkuna({
      karkea,
      laatikko: { ...laatikko, lat0: lat, lat1: lat },
      vali,
      dem,
    });
    assert.equal(rivi.w, koko.w);
    assert.deepEqual([...rivi.grid], [...koko.grid.subarray(y * koko.w, (y + 1) * koko.w)], `rivi ${y}`);
  }
});

test('DEM-ikkuna: ruudun näytteistin antaa saman ikkunan kuin korkeus()', () => {
  const g = (lon, lat) => 1000 + 200 * Math.sin(lon * 7) + 100 * lat;
  const ruudut = ['45,6', '45,7', '46,6'];
  const vanha = keinoDem(ruudut, g);
  const uusi = {
    ...keinoDem(ruudut, g),
    naytteistin: (lat, lon) => (ruudut.includes(`${lat},${lon}`) ? (x, y) => g(x, y) : null),
  };
  const karkea = karkeaIkkuna({
    lon0: 5, lon1: 9, lat0: 44, lat1: 48,
  });
  const p = {
    karkea,
    laatikko: {
      lon0: 5.5, lon1: 8, lat0: 44.5, lat1: 47,
    },
    vali: 1 / 120,
  };
  const a = demIkkuna({ ...p, dem: vanha });
  const b = demIkkuna({ ...p, dem: uusi });
  assert.deepEqual(b.grid, a.grid);
  assert.equal(b.dem.osuus, a.dem.osuus);
});

test('DEM-ikkuna avaa jokaisen ruudun kerran, vaikka rivi ylittää LRU:n (koko maailman kaista)', () => {
  // 60 ruutua leveä ja 3 korkea kaista, LRU 4: rivi kerrallaan jokainen
  // ruutu avattaisiin uudestaan joka rivillä.
  const kansio = mkdtempSync(join(tmpdir(), 'demlru-'));
  try {
    const nimi = (lat, lon) => `Copernicus_DSM_COG_30_N${String(lat).padStart(2, '0')}_00_E${String(lon).padStart(3, '0')}_00_DEM.tif`;
    for (let lat = 40; lat < 43; lat += 1) for (let lon = 0; lon < 60; lon += 1) writeFileSync(join(kansio, nimi(lat, lon)), '');
    const avaukset = new Map();
    const avaa = (polku) => {
      avaukset.set(polku, (avaukset.get(polku) ?? 0) + 1);
      return {
        tasot: [{}, {}],
        pikselinAsteet: (ti) => (ti ? 1 / 600 : 1 / 1200),
        korkeus: (lon, lat) => 500 + lon + lat,
        sulje() {},
      };
    };
    const dem = demHakemisto(kansio, avaa, { tunnus: '30', lru: 4 });
    const karkea = karkeaIkkuna({
      lon0: -1, lon1: 61, lat0: 39, lat1: 44,
    });
    const r = demIkkuna({
      karkea,
      laatikko: {
        lon0: 0, lon1: 59.99, lat0: 40, lat1: 42.99,
      },
      vali: 1 / 30,
      dem,
    });
    assert.equal(avaukset.size, 180);
    assert.deepEqual([...new Set(avaukset.values())], [1], 'jokin ruutu avattiin useammin kuin kerran');
    assert.ok(r.dem.osuus > 0.99);
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('demHakemisto: NAS:n ._-tiedostot ja toisen aineiston nimet ohitetaan', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'demnimet-'));
  try {
    for (const f of [
      'Copernicus_DSM_COG_30_N37_00_E022_00_DEM.tif',
      '._Copernicus_DSM_COG_30_N37_00_E022_00_DEM.tif',
      '._Copernicus_DSM_COG_30_N38_00_E022_00_DEM.tif',
      'Copernicus_DSM_COG_10_N39_00_E022_00_DEM.tif',
    ]) writeFileSync(join(kansio, f), '');
    const glo90 = demHakemisto(kansio, () => { throw new Error('ei avata'); }, { tunnus: '30' });
    assert.equal(glo90.ruutuja, 1);
    assert.equal(glo90.onRuutu(37, 22), true);
    assert.equal(glo90.onRuutu(38, 22), false);
    assert.equal(glo90.onRuutu(39, 22), false);
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('GLO-30/GLO-90 kuten natiivin maastolaatoissa: pyramidin väleillä GLO-90 ensin, GLO-30 varalla', () => {
  const lahde = (arvo, ruudut) => ({
    ...keinoDem(ruudut, () => arvo),
    ruutuja: ruudut.length,
    naytteistin: (lat, lon) => (ruudut.includes(`${lat},${lon}`) ? () => arvo : null),
    asetaLru() {},
    sulje() {},
  });
  // 37,22: molemmissa; 37,23: vain GLO-30 (E28-reuna); 37,24: vain GLO-90.
  const dem = kaksiLahdetta({
    glo30: lahde(3000, ['37,22', '37,23']),
    glo90: lahde(9000, ['37,22', '37,24']),
  });
  const karkea = karkeaIkkuna({
    lon0: 21, lon1: 26, lat0: 36, lat1: 39,
  });
  const arvo = (vali, lon) => {
    const r = demIkkuna({
      karkea,
      laatikko: {
        lon0: lon, lon1: lon, lat0: 37.5, lat1: 37.5,
      },
      vali,
      dem,
      ramppi: 0,
    });
    return r.grid[0];
  };
  const z8 = 1 / 480; // 7,5″ — kynnystä harvempi
  assert.ok(z8 >= GLO30_KYNNYS);
  assert.equal(arvo(z8, 22.5), 9000);
  assert.equal(arvo(z8, 23.5), 3000);
  assert.equal(arvo(z8, 24.5), 9000);
  const z10 = 1 / 1920; // 1,875″ — tarkka taso: GLO-30 ensin
  assert.equal(arvo(z10, 22.5), 3000);
});

test('DEM-ikkuna ylittää päivämääränrajan: lon 180…185 lukee ruudut −180…−175', () => {
  assert.equal(kierraAste(181.25), -178.75);
  assert.equal(kierraAste(-181), 179);
  assert.equal(kierraAste(22.123), 22.123); // välin sisällä arvoon ei kosketa
  const dem = keinoDem(['65,-180', '65,179'], () => 1500);
  const karkea = karkeaIkkuna({
    lon0: 177, lon1: 184, lat0: 63, lat1: 67,
  }, () => 10);
  const r = demIkkuna({
    karkea,
    laatikko: {
      lon0: 179.5, lon1: 180.5, lat0: 65.5, lat1: 65.5,
    },
    vali: 0.25,
    dem,
  });
  // Rampissa ei pudota: naapuri rajan takana on olemassa.
  assert.deepEqual([...r.grid], [1500, 1500, 1500, 1500, 1500]);
});

test('ruutuRyhmat: peräkkäiset samat avaimet yhdeksi väliksi', () => {
  assert.deepEqual(ruutuRyhmat(7, (i) => Math.floor(i / 3)), [[0, 2], [3, 5], [6, 6]]);
  assert.deepEqual(ruutuRyhmat(0, () => 0), []);
});

/* ================================================= nimetty resepti */

test('resepti 2026-09-25: D2 + C-reliefi, ei rantamustetta eikä meren käyriä', () => {
  const r = resepti(NIMI);
  const p = r.pohjaliput.join(' ');
  assert.equal(r.ilmanRantaviivaa, true);
  for (const l of ['--maski-aa 4', '--meri-kohina 0.2', '--reliefi-koe lammin', '--dem-kaikki-tasot',
    '--syvyyskohina lauta', '--joet-pohjaan', `--reseptinimi ${NIMI}`]) assert.ok(p.includes(l), l);
  assert.match(p, /--resepti-json \{"syvyys":\{"litistys":0\.8\}\}/);
  for (const l of ['--syvyyskayrat', '--vesiviivoitus', '--rantaleveys', '--syvyysportaat']) {
    assert.ok(!p.includes(l), `${l} on päätöksen vastainen`);
    assert.ok(r.kielletyt.includes(l));
  }
  // Lippurivi on sanoiksi jaettavissa (polttoskripti antaa sen lainaamatta).
  for (const sana of r.pohjaliput) assert.doesNotMatch(sana, /\s/);
  assert.deepEqual(r.palloliput, ['--suodatin', 'laatikko', '--jpeg-laatu', '90', '--jpeg-444']);
  assert.equal(r.palloTasot, '0-9');
  // Nostotaso ilman nimiöitä kuten tuotannossa (omistajan löydös 25.9.2026:
  // ilman lippua koepyramidin nostoja ei voinut napauttaa).
  assert.deepEqual(r.nostoliput, ['--nostot-ilman-nimioita']);
  assert.ok(Object.isFrozen(RESEPTIT));
});

test('reseptin pohjashardit: jokainen taso z0–z8, jokainen sarake kerran, kaistat lohkorajoilla', () => {
  const shardit = reseptinShardit(NIMI, { korkeus: 1 });
  const nimet = shardit.map((s) => s.nimi);
  assert.equal(new Set(nimet).size, nimet.length);
  assert.ok(nimet.includes('z8-001') && nimet.includes('z8-085'), 'z8-nimet entiset (--koe)');
  for (let z = 0; z <= 8; z += 1) {
    const tason = shardit.filter((s) => s.z === z);
    assert.ok(tason.length >= 1, `z${z}`);
    for (const s of tason) {
      assert.match(s.args, new RegExp(`^--tasoja 9 --tasot ${z}( |$)`));
      assert.match(s.args, new RegExp(`--kaariminuutit ${z <= 6 ? 3 : 1}$`));
    }
    const kaistat = tason.filter((s) => s.sarakkeet);
    if (!kaistat.length) continue;
    const jako = 2 ** (8 - z);
    let seuraava = 0;
    for (const { sarakkeet: [a, b] } of kaistat) {
      assert.equal(a, seuraava, `z${z}: aukko tai päällekkäisyys sarakkeessa ${a}`);
      assert.equal(a % (LOHKO * jako), 0, `z${z}: kaista ${a} ei ala lohkorajalta`);
      seuraava = b + 1;
    }
    assert.equal(seuraava, Z8_SARAKKEITA, `z${z}: kaistat eivät kata tasoa`);
  }
  assert.equal(shardits(shardit, 5), 2);
  assert.equal(shardits(shardit, 6), 6);
  assert.equal(shardits(shardit, 7), 22);
  assert.equal(shardits(shardit, 8), 85);
  // --korkeus 3 koskee vain z7–z8:aa.
  assert.ok(reseptinShardit(NIMI, { korkeus: 3 }).filter((s) => s.z >= 7).every((s) => s.args.endsWith('--kaariminuutit 3')));
});
function shardits(shardit, z) { return shardit.filter((s) => s.z === z).length; }

test('DEM-kaistajako: jokaisen tason leveimmän shardin ikkuna on alle 400 Mt (--kuiva)', () => {
  const k = mkdtempSync(join(tmpdir(), 'resepti-kuiva-'));
  try {
    const leveimmat = new Map();
    for (const s of reseptinShardit(NIMI)) if (s.z >= 4 && !leveimmat.has(s.z)) leveimmat.set(s.z, s);
    for (const [z, s] of leveimmat) {
      const r = spawnSync(process.execPath, [GENERAATTORI, k, ...s.args.split(' '),
        '--dem', '/ei/kaytetty', '--dem90', '/ei/kaytetty', '--dem-kaikki-tasot', '--kuiva'], { encoding: 'utf8' });
      assert.equal(r.status, 0, r.stderr);
      const m = /DEM-ikkuna\s+(\d+) x (\d+) \(väli ([\d.]+)″, (\d+) Mt Int16\)/.exec(r.stdout);
      assert.ok(m, `z${z}: kuiva ei kertonut DEM-ikkunaa\n${r.stdout}`);
      assert.ok(Number(m[4]) <= 400, `z${z} (${s.nimi}): DEM-ikkuna ${m[4]} Mt`);
      assert.equal(Number(m[3]), 3600 / (15 * 2 ** (z - 3)), `z${z}: väli ei ole tason pikseli`);
    }
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('luettelo: resepti ja DEM-lähteet kirjataan, vanha luettelo ennallaan', () => {
  const a = mkdtempSync(join(tmpdir(), 'resepti-luettelo-'));
  const b = mkdtempSync(join(tmpdir(), 'resepti-luettelo-'));
  try {
    const yhteiset = ['--tasoja', '9', '--tasot', '0-8', '--versio', 'koe', '--vain-luettelo'];
    execFileSync(process.execPath, [GENERAATTORI, a, ...yhteiset], { stdio: 'pipe' });
    execFileSync(process.execPath, [GENERAATTORI, b, ...yhteiset, ...resepti(NIMI).pohjaliput,
      '--dem', '/ei/glo30', '--dem90', '/ei/glo90'], { stdio: 'pipe' });
    const vanha = JSON.parse(readFileSync(join(a, 'pyramidi.json'), 'utf8'));
    const uusi = JSON.parse(readFileSync(join(b, 'pyramidi.json'), 'utf8'));
    assert.deepEqual(Object.keys(vanha.pohja), ['rantaviiva']);
    assert.equal(vanha.korkeus.dem, undefined);
    assert.ok(vanha.tasot.every((t) => t.korkeusaineisto === undefined));
    assert.equal(uusi.pohja.resepti, NIMI);
    assert.equal(uusi.pohja.maskiAA, 4);
    assert.equal(uusi.pohja.meriKohina, 0.2);
    assert.deepEqual(uusi.korkeus.dem.tasot, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    assert.equal(uusi.korkeus.dem.lahdemaininta.length, 2);
    assert.match(uusi.korkeus.dem.lahdemaininta[0], /WorldDEM-90/);
    assert.ok(uusi.tasot.every((t) => /GLO-90/.test(t.korkeusaineisto)));
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
});

test('polttoskripti --resepti: pohjashardit reseptistä, rantataso omana, pallo Z0–Z9 ilman rantaa', () => {
  const ulos = mkdtempSync(join(tmpdir(), 'resepti-lista-'));
  try {
    // Kylvetty ämpäriluettelo: --lista ei tarvitse verkkoa.
    writeFileSync(join(ulos, 'ampari-luettelo.json'), JSON.stringify({
      versio: 'vanha-pohja', viivataso: { versio: 'vanha-viivat' }, nostotaso: { versio: 'vanha-nostot' },
      rantataso: { versio: 'vanha-ranta' }, laatu: 0.9, patina: 'kevyt', tasot: [],
    }));
    const dem = join(ulos, 'dem'); mkdirSync(dem);
    const aja = (lisa) => spawnSync('bash', [POLTTO, '--ulos', ulos, '--dem', dem, '--dem90', dem, ...lisa, '--lista'], {
      encoding: 'utf8', env: { ...process.env, POLTTO_LUETTELO_URL: 'file:///ei/ole/pyramidi.json' },
    });
    const r = aja(['--resepti', NIMI, '--sarjat', 'kaikki', '--versio', 'uusi-pohja', '--viivaversio', 'uusi-viivat',
      '--nostoversio', 'uusi-nostot', '--rantaversio', 'uusi-ranta', '--pallo', '--pallotunniste', 'koe',
      '--ytimet', '4', '--ilman-nostoja']);
    assert.equal(r.status, 0, r.stderr + r.stdout);
    const rivit = r.stdout.trim().split('\n').map((l) => l.split(/\s+/));
    const pohja = rivit.filter(([n]) => /^z\d/.test(n)).map(([n]) => n);
    assert.deepEqual(pohja, reseptinShardit(NIMI).map((s) => s.nimi));
    const z6 = r.stdout.split('\n').find((l) => l.startsWith('z6-01 '));
    for (const l of ['--ilman-rantaviivaa', '--maski-aa 4', '--meri-kohina 0.2', '--reliefi-koe lammin',
      '--dem-kaikki-tasot', `--dem ${dem}`, `--dem90 ${dem}`]) assert.ok(z6.includes(l), l);
    assert.ok(!z6.includes('--syvyyskayrat') && !z6.includes('--vesiviivoitus'));
    assert.equal(z6.split('--ilman-rantaviivaa').length, 2, '--ilman-rantaviivaa kahdesti');
    assert.ok(rivit.some(([n]) => n === 'ranta-z0-z7'), 'rantataso omiin shardeihinsa');
    const pallo = r.stdout.split('\n').filter((l) => l.startsWith('pallo-'));
    assert.equal(pallo.length, 12);
    for (const l of pallo) {
      assert.match(l, /z0-9/);
      assert.match(l, /--ilman-rantaa --suodatin laatikko --jpeg-laatu 90 --jpeg-444/);
    }
    // Vanha resepti: entinen jako, ei reseptin lippuja.
    const v = aja(['--sarjat', 'kaikki', '--versio', 'uusi-pohja', '--viivaversio', 'uusi-viivat', '--nostoversio', 'uusi-nostot']);
    assert.equal(v.status, 0, v.stderr);
    assert.match(v.stdout, /^z0-z6\s+--tasot 0-6 --kaariminuutit 3$/m);
    assert.match(v.stdout, /^z8-001\s+--tasoja 9 --tasot 8 --sarakkeet 0-3 --kaariminuutit 1$/m);
    assert.doesNotMatch(v.stdout, /--maski-aa|--dem|--reseptinimi/);
    // Päätöksen vastainen lisälippu pysäyttää ajon.
    const k = aja(['--resepti', NIMI, '--sarjat', 'kaikki', '--versio', 'uusi-pohja', '--viivaversio', 'uusi-viivat',
      '--nostoversio', 'uusi-nostot', '--rantaversio', 'uusi-ranta', '--pohjaliput', '--vesiviivoitus tumma']);
    assert.equal(k.status, 2);
    assert.match(k.stderr, /--vesiviivoitus on reseptin/);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

test('pallon luettelo --ilman-rantaa: "ranta": null kuten ennen', () => {
  const k = mkdtempSync(join(tmpdir(), 'resepti-pallo-'));
  try {
    kirjoitaLuettelo(k, { versio: 'p', viivataso: { versio: 'v' }, rantataso: { versio: 'r' } }, {
      min: 0, max: 9, nostot: false, ranta: false, tunniste: 'koe', kansio: 'x/',
    });
    const j = JSON.parse(readFileSync(join(k, 'laatat.json'), 'utf8'));
    assert.equal(j.ranta, null);
    assert.deepEqual(j.tasot, { min: 0, max: 9 });
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('pallon näytteistys: oletus on entinen (lähin pikseli, JPEG 80 ilman 4:4:4)', () => {
  const lahde = readFileSync(join(JUURI, 'tools', 'tee-pallolaatat.mjs'), 'utf8');
  assert.match(lahde, /let SUODATIN = 'lahin';\nlet JPEG = \{ quality: LAATU \};/);
  assert.match(lahde, /suodatin: lippu\('--suodatin'\) \?\? 'lahin'/);
  asetaNaytteistys(); // palauttaa oletuksen muille testeille
});

/* ================================= vanhan reseptin tavutarkkuus (Mac) */

/*
 * Tuotannon 23a-resepti (A) z6-laatalle 46/20 (Peloponnesos). Tiiviste on
 * laatan PURETUISTA pikseleistä (RGBA), ei webp-tavuista. Kirjattu
 * origin/mainin koodilla (ennen löydös 46:n koelippuja) ja todennettu
 * tällä haaralla samaksi 25.9.2026.
 */
const VANHA_A = ['--rannikon-harvennus', '0.004', '--laatu', '0.9', '--patina', 'kevyt', '--ilman-rantaviivaa',
  '--joet-pohjaan', '--vesiviivoitus', 'tumma', '--syvyyskayrat', '200,1000,3000', '--syvyyskayrapeitto', '0.55',
  '--syvyyskohina', 'lauta', '--koristeet', 'assets/koristeet/meri/pallo-koristeet.json',
  '--resepti-json', '{"syvyys":{"litistys":0.8},"vesiviivoitus":{"harvennus":"haive"}}',
  '--tasot', '6', '--kaariminuutit', '3', '--alue', '22.0,37.0,22.2,37.2', '--versio', 'koe'];
const VANHAN_TIIVISTEET = {
  'darwin-arm64': { 'z6/46/20': '89b458722a154bef8c63bb348acd2c95825348799089a54910db731da5d24782' },
};
const DATA = process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta');
const alusta = `${process.platform}-${process.arch}`;
const sharp = await import('sharp').then((m) => m.default).catch(() => null);
const ohitaRender = !sharp ? 'sharp puuttuu'
  : !existsSync(join(DATA, 'ne_10m_ocean.geojson')) ? `ei rantaviiva-aineistoa (${DATA})`
    : !process.env.PW_CHROMIUM ? 'PW_CHROMIUM puuttuu'
      : !VANHAN_TIIVISTEET[alusta] ? `ei tiivistettä alustalle ${alusta}` : false;

/** Pyramidin laattojen pikselitiivisteet { 'z/x/y': sha256 }. */
async function laattojenTiivisteet(kansio, sharpM = sharp) {
  const ulos = {};
  const kay = (d, polku) => {
    for (const f of readdirSync(d, { withFileTypes: true })) {
      if (f.isDirectory()) kay(join(d, f.name), [...polku, f.name]);
      else if (f.name.endsWith('.webp')) ulos[[...polku, f.name.replace('.webp', '')].join('/')] = join(d, f.name);
    }
  };
  kay(kansio, []);
  const tiivisteet = {};
  for (const [k, p] of Object.entries(ulos).sort()) {
    const raaka = await sharpM(p).ensureAlpha().raw().toBuffer(); // eslint-disable-line no-await-in-loop
    tiivisteet[k] = createHash('sha256').update(raaka).digest('hex');
  }
  return tiivisteet;
}

test('vanha resepti (23a) piirtää z6-laatan tavulleen entisenä', { skip: ohitaRender, timeout: 900000 }, async () => {
  const k = mkdtempSync(join(tmpdir(), 'resepti-vanha-'));
  try {
    execFileSync(process.execPath, [GENERAATTORI, k, '--data', DATA, ...VANHA_A], { stdio: 'pipe', cwd: JUURI });
    const t = await laattojenTiivisteet(k);
    assert.deepEqual(t, VANHAN_TIIVISTEET[alusta]);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('resepti 2026-09-26 = 2026-09-25 + litistys 1 ja syvyyskontrasti 1,35 (löydös 129)', () => {
  const a = RESEPTIT['2026-09-25']; const b = RESEPTIT['2026-09-26'];
  for (const k of Object.keys(a)) if (!['kuvaus', 'pohjaliput'].includes(k)) assert.deepEqual(b[k], a[k], k);
  assert.ok(b.pohjaliput.includes('{"syvyys":{"litistys":1}}'));
  assert.deepEqual(b.pohjaliput.slice(-2), ['--syvyyskontrasti', '1.35']);
  assert.equal(b.pohjaliput[b.pohjaliput.indexOf('--reseptinimi') + 1], '2026-09-26');
  assert.ok(a.pohjaliput.includes('{"syvyys":{"litistys":0.8}}'), '25 ennallaan');
});
