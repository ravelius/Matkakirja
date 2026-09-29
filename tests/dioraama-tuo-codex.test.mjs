/*
 * tools/dioraama/tuo-codex.mjs -testit (Linnanrakentaja, erä 2). Speksi:
 * docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 1, tilaus
 * posti/fable-codex-dioraama-osa1-20260929.md.
 *
 * OMA PNG-KIRJOITIN: paikkamerkit.mjs:n kirjoitaRgbaPng ei ole vietyä (ks.
 * moduulin export-lause), niin kuin ei pidäkään olla riippuvuutta muuhun
 * samaan aikaan muokattavaan tiedostoon — tässä on oma, hyvin pieni RGB/RGBA-
 * PNG-kirjoitin (CRC32 + zlib.deflateSync), riippumaton testattavasta
 * tuo-codex.mjs:n omasta luePng-lukijasta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename } from 'node:path';

import {
  tunnistaNimi, alfaHistogrammi, histogrammiVaroitukset, tarkistaJalkapohjat,
  saumattomuusMittari, saumaVaroitukset, kasitteleToimitus,
  HAHMO_KOKO, HAHMO_RUUTU, HAHMO_SARAKKEET, HAHMO_SILMUKAT, JALKA_MARGINAALI_PX, SAUMA_KERROIN,
} from '../tools/dioraama/tuo-codex.mjs';

/* ==================== Oma PNG-kirjoitin (RGB väritys 2, RGBA väritys 6) ==================== */

const CRC_TAULU = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(tavut) {
  let c = 0xffffffff;
  for (const b of tavut) c = CRC_TAULU[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function lohko(tyyppi, data) {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(tyyppi, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([pituus, td, crc]);
}
/** kanavat: 3 (RGB, värityyppi 2) tai 4 (RGBA, värityyppi 6). Suodin 0 joka rivillä. */
function kirjoitaPng(leveys, korkeus, kanavat, data) {
  const varityyppi = kanavat === 4 ? 6 : 2;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = varityyppi; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rivinPituus = leveys * kanavat;
  const raaka = Buffer.alloc((rivinPituus + 1) * korkeus);
  for (let y = 0; y < korkeus; y += 1) {
    raaka[y * (rivinPituus + 1)] = 0;
    raaka.set(data.subarray(y * rivinPituus, (y + 1) * rivinPituus), y * (rivinPituus + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka, { level: 1 })), // taso 1: testi ei tarvitse pientä tiedostokokoa, vain nopeutta
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/* ==================== Pienet kuvageneraattorit testifixtuureihin ==================== */

function teeTasavariRgb(leveys, korkeus, [r, g, b]) {
  const rgb = new Uint8ClampedArray(leveys * korkeus * 3);
  for (let p = 0; p < leveys * korkeus; p += 1) { rgb[p * 3] = r; rgb[p * 3 + 1] = g; rgb[p * 3 + 2] = b; }
  return rgb;
}
function teeTasavariRgba(leveys, korkeus, [r, g, b, a]) {
  const rgba = new Uint8ClampedArray(leveys * korkeus * 4);
  for (let p = 0; p < leveys * korkeus; p += 1) {
    rgba[p * 4] = r; rgba[p * 4 + 1] = g; rgba[p * 4 + 2] = b; rgba[p * 4 + 3] = a;
  }
  return rgba;
}

/**
 * Kokin atlas (HAHMO_KOKO 2048×2048): täyttää kaikki KÄYTETYT silmukkaruudut
 * (HAHMO_SILMUKAT) täysin peittävällä värillä (alfa=255, tai 250 jos
 * epailyttavaAlfa — tunnettu Codex-bugi). `piilotaSolu: {silmukka, i}` jättää
 * JUURI sen ruudun jalkapohjarivin (JALKA_MARGINAALI_PX) läpinäkyväksi.
 */
function teeAtlasRgba({ piilotaSolu = null, epailyttavaAlfa = false } = {}) {
  const [leveys, korkeus] = HAHMO_KOKO;
  const [ruutuL, ruutuK] = HAHMO_RUUTU;
  const rgba = new Uint8ClampedArray(leveys * korkeus * 4);
  const alfa = epailyttavaAlfa ? 250 : 255;
  for (const [silmukka, { rivi, ruudut }] of Object.entries(HAHMO_SILMUKAT)) {
    for (let i = 0; i < ruudut; i += 1) {
      const k = rivi * HAHMO_SARAKKEET + i;
      const absRivi = Math.floor(k / HAHMO_SARAKKEET);
      const sarake = k % HAHMO_SARAKKEET;
      const piilota = piilotaSolu && piilotaSolu.silmukka === silmukka && piilotaSolu.i === i;
      for (let y = 0; y < ruutuK; y += 1) {
        const onJalkarivi = y >= ruutuK - JALKA_MARGINAALI_PX;
        if (piilota && onJalkarivi) continue; // jätä läpinäkyväksi (alfa 0 alustuksesta)
        for (let x = 0; x < ruutuL; x += 1) {
          const idx = ((absRivi * ruutuK + y) * leveys + (sarake * ruutuL + x)) * 4;
          rgba[idx] = 120; rgba[idx + 1] = 80; rgba[idx + 2] = 40; rgba[idx + 3] = alfa;
        }
      }
    }
  }
  return rgba;
}

function uusiTilapainenKansio() {
  return mkdtempSync(join(tmpdir(), 'dioraama-tuo-codex-test-'));
}

function onOlemassaSips() {
  return spawnSync('which', ['sips'], { encoding: 'utf8' }).status === 0;
}

/**
 * Rakentaa synteettisen toimituksen: <toimitus>/final/<tiedostot> ja
 * <toimitus>/manifest.json ({ files: [...] }, kentät sha256/koko/mode/
 * icc_srgb — tilauksen omat nimet). `tiedostot` on taulukko
 * `{ nimi, leveys, korkeus, kanavat, data, mode?, icc_srgb?, shaYlikirjoitus?, kokoYlikirjoitus? }`.
 * Palauttaa toimituskansion polun.
 */
function rakennaToimitus(tiedostot) {
  const toimitus = uusiTilapainenKansio();
  const finalKansio = join(toimitus, 'final');
  mkdirSync(finalKansio, { recursive: true });
  const rivit = [];
  for (const t of tiedostot) {
    const png = kirjoitaPng(t.leveys, t.korkeus, t.kanavat, t.data);
    writeFileSync(join(finalKansio, t.nimi), png);
    rivit.push({
      filename: t.nimi,
      sha256: t.shaYlikirjoitus ?? createHash('sha256').update(png).digest('hex'),
      koko: t.kokoYlikirjoitus ?? png.length,
      mode: t.mode ?? (t.kanavat === 4 ? 'RGBA' : 'RGB'),
      icc_srgb: t.icc_srgb ?? true,
    });
  }
  writeFileSync(join(toimitus, 'manifest.json'), JSON.stringify({ files: rivit }, null, 1));
  return toimitus;
}

/** Yksi "täysi" toimitus: 1 pinta + hahmoatlas + 1 liekki + 1 kortti, kaikki tilauksen mukaisia. */
function teeOnnistunutToimitus() {
  return rakennaToimitus([
    { nimi: 'dioraama-pinta-kivi-1024.png', leveys: 1024, korkeus: 1024, kanavat: 3, data: teeTasavariRgb(1024, 1024, [150, 110, 80]) },
    { nimi: 'dioraama-hahmo-kokki-2048.png', leveys: 2048, korkeus: 2048, kanavat: 4, data: teeAtlasRgba() },
    { nimi: 'dioraama-liekki-kynttila-256x256.png', leveys: 256, korkeus: 256, kanavat: 4, data: teeTasavariRgba(256, 256, [255, 200, 60, 255]) },
    { nimi: 'dioraama-kortti-kokki-512.png', leveys: 512, korkeus: 512, kanavat: 3, data: teeTasavariRgb(512, 512, [90, 70, 60]) },
  ]);
}

function loydaRivi(tulos, avainsana) {
  const r = tulos.rivit.find((x) => x.tiedosto.includes(avainsana));
  assert.ok(r, `rivi tiedostolle "${avainsana}" puuttuu raportista`);
  return r;
}

/* ==================== tunnistaNimi ==================== */

test('tunnistaNimi: tunnistaa kaikki lajit ja neliö-/suorakaidekoot', () => {
  assert.deepEqual(tunnistaNimi('dioraama-pinta-kivi-1024.png'), {
    laji: 'pinta', id: 'kivi', koko: [1024, 1024], kohdeTiedosto: 'pinnat/kivi.jpg', vaadiAlfa: false, odotettuKoko: [1024, 1024],
  });
  assert.deepEqual(tunnistaNimi('dioraama-pinta-leikkaus-2048x512.png'), {
    laji: 'pinta', id: 'leikkaus', koko: [2048, 512], kohdeTiedosto: 'pinnat/leikkaus.jpg', vaadiAlfa: false, odotettuKoko: [2048, 512],
  });
  assert.deepEqual(tunnistaNimi('dioraama-hahmo-kokki-2048.png'), {
    laji: 'hahmo', id: 'kokki', henkilo: 'kokki-1500', koko: [2048, 2048], kohdeTiedosto: 'hahmot/kokki-1500.png', vaadiAlfa: true, odotettuKoko: [2048, 2048],
  });
  assert.deepEqual(tunnistaNimi('dioraama-kortti-kokki-512.png'), {
    laji: 'kortti', id: 'kokki', henkilo: 'kokki-1500', koko: [512, 512], kohdeTiedosto: 'kortit/kokki-1500.png', vaadiAlfa: false, odotettuKoko: [512, 512],
  });
  assert.deepEqual(tunnistaNimi('dioraama-liekki-tulisija-1024x512.png'), {
    laji: 'liekki', id: 'tulisija', koko: [1024, 512], kohdeTiedosto: 'liekit/tulisija.png', vaadiAlfa: true, odotettuKoko: [1024, 512],
  });
});

test('tunnistaNimi: joustava isoille kirjaimille ja × (kertomerkki) x:n sijaan', () => {
  assert.equal(tunnistaNimi('DIORAAMA-HAHMO-KOKKI-2048.PNG').laji, 'hahmo');
  assert.equal(tunnistaNimi('dioraama-liekki-tulisija-1024×512.png').koko[1], 512);
});

test('tunnistaNimi: null tuntemattomalle id:lle, lajille ja väärälle päätteelle', () => {
  assert.equal(tunnistaNimi('dioraama-pinta-marmori-1024.png'), null); // marmori ei tilauksessa
  assert.equal(tunnistaNimi('dioraama-outo-kivi-1024.png'), null); // laji ei ole pinta/hahmo/liekki/kortti
  assert.equal(tunnistaNimi('dioraama-hahmo-apulainen-1024.png'), null); // vain kokki tunnetaan hahmona era2:ssa
  assert.equal(tunnistaNimi('dioraama-pinta-kivi-1024.jpg'), null); // vain .png
  assert.equal(tunnistaNimi('jokumuu.png'), null);
});

/* ==================== alfaHistogrammi / histogrammiVaroitukset ==================== */

test('alfaHistogrammi: laskee neljä koria oikein tunnetusta puskurista', () => {
  // 10 pikseliä: 3×alfa=0, 2×alfa=120 (pehmeä), 1×alfa=250 (epäilyttävä), 4×alfa=255 (peittävä).
  const alfat = [0, 0, 0, 120, 120, 250, 255, 255, 255, 255];
  const rgba = new Uint8ClampedArray(alfat.length * 4);
  alfat.forEach((a, i) => { rgba[i * 4 + 3] = a; });
  const hist = alfaHistogrammi(rgba);
  assert.deepEqual(hist, {
    pikseleita: 10, lapinakyva: 3, pehmea: 2, epailyttava: 1, peittava: 4,
  });
});

test('histogrammiVaroitukset: puhtaasti 0/255-kuvasta ei varoituksia', () => {
  const rgba = teeTasavariRgba(16, 16, [10, 20, 30, 255]);
  assert.deepEqual(histogrammiVaroitukset(alfaHistogrammi(rgba)), []);
});

test('histogrammiVaroitukset: laaja alfa 245–254 -alue liputtaa tunnetun Codex-ongelman', () => {
  const rgba = teeAtlasRgba({ epailyttavaAlfa: true }); // ~61 % pikseleistä alfa 250 (yli EPAILYTTAVA_RAJAn)
  const varoitukset = histogrammiVaroitukset(alfaHistogrammi(rgba));
  assert.ok(varoitukset.some((v) => /245.?254/.test(v)), `odotettiin 245–254-varoitusta, saatiin: ${varoitukset}`);
});

test('histogrammiVaroitukset: laaja pehmeä 1–244-alue liputtaa terävän reunan puutteen', () => {
  const [leveys, korkeus] = [64, 64];
  const rgba = new Uint8ClampedArray(leveys * korkeus * 4);
  for (let p = 0; p < leveys * korkeus; p += 1) rgba[p * 4 + 3] = 120; // koko kuva alfa 120 (pehmeä)
  const varoitukset = histogrammiVaroitukset(alfaHistogrammi(rgba));
  assert.ok(varoitukset.some((v) => /pehmeä reuna/.test(v)), `odotettiin pehmeä reuna -varoitusta, saatiin: ${varoitukset}`);
});

/* ==================== tarkistaJalkapohjat ==================== */

test('tarkistaJalkapohjat: täysi atlas ei anna varoituksia', () => {
  const rgba = teeAtlasRgba();
  assert.deepEqual(tarkistaJalkapohjat(rgba, HAHMO_KOKO[0]), []);
});

test('tarkistaJalkapohjat: yhden ruudun tyhjä jalkapohjarivi löytyy ja nimeää ruudun', () => {
  const rgba = teeAtlasRgba({ piilotaSolu: { silmukka: 'tyo', i: 3 } });
  const varoitukset = tarkistaJalkapohjat(rgba, HAHMO_KOKO[0]);
  assert.equal(varoitukset.length, 1);
  assert.match(varoitukset[0], /1\/26/);
  assert.match(varoitukset[0], /tyo ruutu 3/);
});

/* ==================== saumattomuusMittari / saumaVaroitukset ==================== */

function teeSaumattomatVarit(koko) {
  return teeTasavariRgba(koko, koko, [140, 110, 70, 255]); // vakioväri: sauma == sisäosa == 0 kaikkialla
}

function teeSaumallisetVarit(koko) {
  const rgba = new Uint8ClampedArray(koko * koko * 4);
  for (let y = 0; y < koko; y += 1) {
    for (let x = 0; x < koko; x += 1) {
      const i = (y * koko + x) * 4;
      // Tasainen liuku keskeltä, mutta reunimmaiset sarakkeet/rivit hyppäävät jyrkästi —
      // saumaVaaka/saumaPysty ero on siis moninkertainen sisäosan liu'un askeleeseen nähden.
      const jyrkkaReuna = x === 0 || x === koko - 1 || y === 0 || y === koko - 1;
      const perusarvo = 100 + Math.floor((x / koko) * 20);
      const v = jyrkkaReuna ? (x === 0 || y === 0 ? 250 : 5) : perusarvo;
      rgba[i] = v; rgba[i + 1] = v; rgba[i + 2] = v; rgba[i + 3] = 255;
    }
  }
  return rgba;
}

test('saumaVaroitukset: yksivärinen (aidosti saumaton) pinta ei anna varoituksia', () => {
  const rgba = teeSaumattomatVarit(64);
  const m = saumattomuusMittari(rgba, 64, 64);
  assert.equal(m.saumaVaaka, 0);
  assert.equal(m.saumaPysty, 0);
  assert.deepEqual(saumaVaroitukset(m), []);
});

test('saumaVaroitukset: jyrkkä reunahyppy sisäosan liukuun nähden liputtaa molemmat saumat', () => {
  const rgba = teeSaumallisetVarit(64);
  const m = saumattomuusMittari(rgba, 64, 64);
  assert.ok(m.saumaVaaka > m.sisaVaaka * SAUMA_KERROIN, 'vaakasauman pitäisi ylittää sisäosan tyypillinen ero selvästi');
  assert.ok(m.saumaPysty > m.sisaPysty * SAUMA_KERROIN, 'pystysauman pitäisi ylittää sisäosan tyypillinen ero selvästi');
  const varoitukset = saumaVaroitukset(m);
  assert.ok(varoitukset.some((v) => /vasen\/oikea/.test(v)), `odotettiin vasen/oikea-varoitusta, saatiin: ${varoitukset}`);
  assert.ok(varoitukset.some((v) => /ylä\/ala/.test(v)), `odotettiin ylä/ala-varoitusta, saatiin: ${varoitukset}`);
});

/* ==================== kasitteleToimitus: onnistunut tuonti ==================== */

test('kasitteleToimitus: kirjoittaa hahmon, liekin ja kortin; pinnan sipsillä jos sips löytyy', () => {
  const toimitus = teeOnnistunutToimitus();
  const assetsJuuri = uusiTilapainenKansio();
  try {
    const tulos = kasitteleToimitus(toimitus, { kuiva: false, assetsJuuri });
    assert.equal(tulos.rivit.length, 4);

    const hahmoRivi = loydaRivi(tulos, 'hahmo-kokki');
    assert.deepEqual(hahmoRivi.virheet, []);
    assert.equal(hahmoRivi.tila, 'kirjoitettu');
    assert.equal(hahmoRivi.mitat, '2048×2048');
    assert.ok(existsSync(join(assetsJuuri, 'hahmot/kokki-1500.png')), 'hahmot/kokki-1500.png puuttuu');

    const liekkiRivi = loydaRivi(tulos, 'liekki-kynttila');
    assert.deepEqual(liekkiRivi.virheet, []);
    assert.equal(liekkiRivi.tila, 'kirjoitettu');
    assert.ok(existsSync(join(assetsJuuri, 'liekit/kynttila.png')), 'liekit/kynttila.png puuttuu');

    const korttiRivi = loydaRivi(tulos, 'kortti-kokki');
    assert.deepEqual(korttiRivi.virheet, []);
    assert.equal(korttiRivi.tila, 'kirjoitettu');
    assert.ok(existsSync(join(assetsJuuri, 'kortit/kokki-1500.png')), 'kortit/kokki-1500.png puuttuu');

    const pintaRivi = loydaRivi(tulos, 'pinta-kivi');
    const pinnanKohde = join(assetsJuuri, 'pinnat/kivi.jpg');
    if (onOlemassaSips()) {
      assert.deepEqual(pintaRivi.virheet, []);
      assert.equal(pintaRivi.tila, 'kirjoitettu');
      assert.ok(existsSync(pinnanKohde), 'pinnat/kivi.jpg puuttuu (sips löytyi)');
      const jpgTavut = readFileSync(pinnanKohde);
      assert.equal(jpgTavut[0], 0xff, 'JPEG-allekirjoituksen 1. tavu');
      assert.equal(jpgTavut[1], 0xd8, 'JPEG-allekirjoituksen 2. tavu');
    } else {
      // sips-muunnos testataan vain jos sips löytyy — muuten varmistetaan vain,
      // että puuttuminen näkyy VIRHEENÄ eikä hiljaisena epäonnistumisena.
      assert.ok(pintaRivi.virheet.some((v) => /sips/i.test(v)), `odotettiin sips-virhettä, saatiin: ${pintaRivi.virheet}`);
      assert.ok(!existsSync(pinnanKohde), 'pinnat/kivi.jpg EI pitäisi syntyä sipsittä');
    }
  } finally {
    rmSync(toimitus, { recursive: true, force: true });
    rmSync(assetsJuuri, { recursive: true, force: true });
  }
});

test('kasitteleToimitus: --kuiva ei kirjoita mitään mutta validoi täysin', () => {
  const toimitus = teeOnnistunutToimitus();
  const assetsJuuri = uusiTilapainenKansio();
  try {
    const tulos = kasitteleToimitus(toimitus, { kuiva: true, assetsJuuri });
    assert.equal(tulos.kuivia, 4);
    assert.equal(tulos.kirjoitettu, 0);
    assert.equal(tulos.ohitettu, 0);
    for (const r of tulos.rivit) {
      assert.deepEqual(r.virheet, [], `${r.tiedosto}: ei odotettu virheitä kuiva-ajossa`);
      assert.ok(r.mitat, `${r.tiedosto}: mitat pitäisi olla raportoitu myös kuiva-ajossa`);
    }
    assert.ok(!existsSync(join(assetsJuuri, 'hahmot')), 'kuiva-ajo ei saa luoda hahmot/-kansiota');
    assert.ok(!existsSync(join(assetsJuuri, 'pinnat')), 'kuiva-ajo ei saa luoda pinnat/-kansiota');
    assert.ok(!existsSync(join(assetsJuuri, 'liekit')), 'kuiva-ajo ei saa luoda liekit/-kansiota');
    assert.ok(!existsSync(join(assetsJuuri, 'kortit')), 'kuiva-ajo ei saa luoda kortit/-kansiota');
  } finally {
    rmSync(toimitus, { recursive: true, force: true });
    rmSync(assetsJuuri, { recursive: true, force: true });
  }
});

/* ==================== sha256- ja mittavirheet ==================== */

test('kasitteleToimitus: sha256-poikkeama estää kirjoituksen VIRHEELLÄ, muut tiedostot käsitellään silti', () => {
  const toimitus = rakennaToimitus([
    {
      nimi: 'dioraama-liekki-kynttila-256x256.png', leveys: 256, korkeus: 256, kanavat: 4,
      data: teeTasavariRgba(256, 256, [255, 200, 60, 255]),
      shaYlikirjoitus: '0'.repeat(64), // väärä sha256 — tiedosto on ehjä, manifesti on väärässä
    },
    {
      nimi: 'dioraama-kortti-kokki-512.png', leveys: 512, korkeus: 512, kanavat: 3, data: teeTasavariRgb(512, 512, [90, 70, 60]),
    },
  ]);
  const assetsJuuri = uusiTilapainenKansio();
  try {
    const tulos = kasitteleToimitus(toimitus, { kuiva: false, assetsJuuri });
    const liekkiRivi = loydaRivi(tulos, 'liekki-kynttila');
    assert.ok(liekkiRivi.virheet.some((v) => /sha256/.test(v)), `odotettiin sha256-virhettä, saatiin: ${liekkiRivi.virheet}`);
    assert.equal(liekkiRivi.tila, 'ohitettu (virhe)');
    assert.ok(!existsSync(join(assetsJuuri, 'liekit/kynttila.png')), 'väärän sha256:n tiedostoa ei saa kirjoittaa');

    // Toinen tiedosto (oikea sha256) käsitellään normaalisti — yhden virhe ei keskeytä muita.
    const korttiRivi = loydaRivi(tulos, 'kortti-kokki');
    assert.deepEqual(korttiRivi.virheet, []);
    assert.equal(korttiRivi.tila, 'kirjoitettu');
    assert.ok(existsSync(join(assetsJuuri, 'kortit/kokki-1500.png')));
  } finally {
    rmSync(toimitus, { recursive: true, force: true });
    rmSync(assetsJuuri, { recursive: true, force: true });
  }
});

test('kasitteleToimitus: väärä kuvakoko tilaukseen nähden on VIRHE (sha256 täsmää, mitat eivät)', () => {
  // Tiedosto nimetään 1024:ksi (kivi-pinnan tilauskoko), mutta on oikeasti 64×64 —
  // sha256/koko lasketaan TODELLISISTA (väärän kokoisista) tavuista, jotta juuri
  // mittatarkistus erottuu omaksi virheekseen sha256-tarkistuksesta.
  const toimitus = rakennaToimitus([
    {
      nimi: 'dioraama-pinta-kivi-1024.png', leveys: 64, korkeus: 64, kanavat: 3, data: teeTasavariRgb(64, 64, [150, 110, 80]),
    },
  ]);
  const assetsJuuri = uusiTilapainenKansio();
  try {
    const tulos = kasitteleToimitus(toimitus, { kuiva: false, assetsJuuri });
    const rivi = tulos.rivit[0];
    assert.ok(!rivi.virheet.some((v) => /sha256/.test(v)), `sha256:n ei pitäisi täsmätä-virhettä, saatiin: ${rivi.virheet}`);
    assert.ok(rivi.virheet.some((v) => /mitat/.test(v)), `odotettiin mittavirhettä, saatiin: ${rivi.virheet}`);
    assert.equal(rivi.mitat, '64×64'); // todelliset mitat raportoidaan silti
    assert.equal(rivi.tila, 'ohitettu (virhe)');
    assert.ok(!existsSync(join(assetsJuuri, 'pinnat/kivi.jpg')), 'väärän kokoisen pinnan ei pitäisi päätyä kohteeseen');
  } finally {
    rmSync(toimitus, { recursive: true, force: true });
    rmSync(assetsJuuri, { recursive: true, force: true });
  }
});
