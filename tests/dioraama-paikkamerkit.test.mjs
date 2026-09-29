// Dioraamamoottorin PAIKKAMERKKIHAHMOJEN atlasgeneraattorin testit (Linnanrakentaja,
// ali-agentti A5). Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohta 1
// (HENKILOT-muoto) ja kohta 3 (`hahmot/<henkilo>.png`).
//
// PNG puretaan tässä OMALLA, generaattorista riippumattomalla lukijalla: CRC32
// lasketaan uudelleen jokaiselle lohkolle, IDAT puretaan zlib.inflateSync:llä ja
// koko tarkistetaan, ja rivit puretaan yleisellä PNG-suotimen purulla (tyypit
// 0–4), vaikka generaattori itse käyttää vain suodinta 0 — testi ei siis
// olettaisi väärin, vaikka generaattori vaihtaisi paethiin.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import {
  teePaikkamerkkiAtlas, RUUTU, SARAKKEET, RIVIT, LEVEYS, KORKEUS, PIVOT_Y,
} from '../tools/dioraama/paikkamerkit.mjs';

const KOKKI = { nimi: 'Kokki', paikkamerkki: { vari: '#7a3b2e', esiliina: '#e8e0cc', paine: 'myssy' } };
const APULAINEN = { nimi: 'Apulainen', paikkamerkki: { vari: '#4f5d3a', esiliina: '#d9ceb0', paine: 'huivi' } };
const VESIPOIKA = { nimi: 'Vesipoika', paikkamerkki: { vari: '#5a4a6e', paine: 'paljas' } };
const HAHMOT = [['kokki-1500', KOKKI], ['apulainen-1500', APULAINEN], ['vesipoika-1500', VESIPOIKA]];

/* ==================== Riippumaton PNG-lukija ==================== */

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

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/** Jäsennä PNG lohkoiksi ja tarkista jokaisen lohkon CRC32 uudelleenlaskemalla. */
function lueChunkitJaTarkistaCrc(buf) {
  assert.deepEqual(
    [...buf.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    'PNG-allekirjoitus puuttuu tai väärä',
  );
  let o = 8;
  const chunkit = [];
  while (o < buf.length) {
    assert.ok(o + 8 <= buf.length, 'PNG katkeaa kesken lohkon otsikon');
    const len = buf.readUInt32BE(o);
    const tyyppi = buf.toString('latin1', o + 4, o + 8);
    const data = buf.subarray(o + 8, o + 8 + len);
    const crcOdotettu = buf.readUInt32BE(o + 8 + len);
    const crcLaskettu = crc32(Buffer.concat([Buffer.from(tyyppi, 'latin1'), data]));
    assert.equal(crcLaskettu, crcOdotettu, `${tyyppi}-lohkon CRC32 ei täsmää`);
    chunkit.push([tyyppi, data]);
    o += 12 + len;
  }
  assert.equal(chunkit.at(-1)[0], 'IEND', 'viimeinen lohko ei ole IEND');
  return chunkit;
}

/** Pura RGBA8-PNG (värityyppi 6) omaksi suoran alfan Uint8ClampedArrayksi. */
function lueRgbaPng(buf) {
  const chunkit = lueChunkitJaTarkistaCrc(buf);
  const ihdrLohkot = chunkit.filter(([t]) => t === 'IHDR');
  assert.equal(ihdrLohkot.length, 1, 'täsmälleen yksi IHDR-lohko');
  const ihdr = ihdrLohkot[0][1];
  const leveys = ihdr.readUInt32BE(0);
  const korkeus = ihdr.readUInt32BE(4);
  assert.equal(ihdr[8], 8, 'bittisyvyyden pitää olla 8');
  assert.equal(ihdr[9], 6, 'värityypin pitää olla 6 (RGBA)');
  assert.equal(ihdr[10], 0, 'pakkausmenetelmä 0');
  assert.equal(ihdr[11], 0, 'suodinmenetelmä 0');
  assert.equal(ihdr[12], 0, 'ei lomitusta');

  const idat = Buffer.concat(chunkit.filter(([t]) => t === 'IDAT').map(([, d]) => d));
  const raaka = inflateSync(idat); // heittää jos zlib-data on rikki
  const rivinPituus = leveys * 4;
  assert.equal(raaka.length, (rivinPituus + 1) * korkeus, 'puretun IDAT-datan koko ei täsmää leveys×korkeus×4:ään');

  const rgba = new Uint8ClampedArray(leveys * korkeus * 4);
  let edellinen = new Uint8ClampedArray(rivinPituus);
  for (let y = 0; y < korkeus; y++) {
    const rivinAlku = y * (rivinPituus + 1);
    const suodin = raaka[rivinAlku];
    const rivi = raaka.subarray(rivinAlku + 1, rivinAlku + 1 + rivinPituus);
    const ulosRivi = new Uint8ClampedArray(rivinPituus);
    for (let i = 0; i < rivinPituus; i++) {
      const a = i >= 4 ? ulosRivi[i - 4] : 0;
      const b = edellinen[i];
      const c = i >= 4 ? edellinen[i - 4] : 0;
      let arvo = rivi[i];
      if (suodin === 1) arvo += a;
      else if (suodin === 2) arvo += b;
      else if (suodin === 3) arvo += Math.floor((a + b) / 2);
      else if (suodin === 4) arvo += paeth(a, b, c);
      else if (suodin !== 0) assert.fail(`tuntematon PNG-suodintyyppi ${suodin} rivillä ${y}`);
      ulosRivi[i] = arvo & 0xff;
    }
    rgba.set(ulosRivi, y * rivinPituus);
    edellinen = ulosRivi;
  }
  return {
    leveys, korkeus, rgba,
  };
}

function alfa(rgba, leveys, x, y) {
  return rgba[(y * leveys + x) * 4 + 3];
}

/** Yhden ruudun (sarake, rivi) sisällön yhteenveto: suurin alfa ja alin rivi jolla alfaa > 0. */
function ruudunTiedot(rgba, leveys, sarake, rivi) {
  const [rw, rh] = RUUTU;
  let maxAlfa = 0;
  let alinAlfallinenRivi = -1;
  for (let y = 0; y < rh; y++) {
    let taallaAlfaa = false;
    for (let x = 0; x < rw; x++) {
      const a = alfa(rgba, leveys, sarake * rw + x, rivi * rh + y);
      if (a > maxAlfa) maxAlfa = a;
      if (a > 0) taallaAlfaa = true;
    }
    if (taallaAlfaa) alinAlfallinenRivi = y;
  }
  return { maxAlfa, alinAlfallinenRivi };
}

/* ==================== Testit ==================== */

test('teePaikkamerkkiAtlas: PNG-allekirjoitus, IHDR 1024×768 ja CRC:t/koko oikein', () => {
  const png = teePaikkamerkkiAtlas(KOKKI, 'kokki-1500');
  assert.ok(Buffer.isBuffer(png), 'palauttaa Bufferin');
  const { leveys, korkeus } = lueRgbaPng(png); // heittää jos allekirjoitus/CRC/koko ei täsmää
  assert.equal(leveys, 1024);
  assert.equal(korkeus, 768);
  // Sama luvut myös moduulin omista vakioista, jotta speksin kaava (sarakkeet·ruutu / rivit·ruutu) pysyy näkyvissä.
  assert.equal(LEVEYS, SARAKKEET * RUUTU[0]);
  assert.equal(KORKEUS, RIVIT.length * RUUTU[1]);
  assert.equal(leveys, LEVEYS);
  assert.equal(korkeus, KORKEUS);
});

test('teePaikkamerkkiAtlas: deterministinen — sama syöte tuottaa saman sha256:n', () => {
  for (const [id, henkilo] of HAHMOT) {
    const a = teePaikkamerkkiAtlas(henkilo, id);
    const b = teePaikkamerkkiAtlas(henkilo, id);
    const shaA = createHash('sha256').update(a).digest('hex');
    const shaB = createHash('sha256').update(b).digest('hex');
    assert.equal(shaA, shaB, `${id}: kaksi ajoa antoivat eri sha256:n`);
  }
  // Eri hahmot/id:t eivät (käytännössä) osu samaan tavujonoon.
  const hashit = new Set(HAHMOT.map(([id, h]) => createHash('sha256').update(teePaikkamerkkiAtlas(h, id)).digest('hex')));
  assert.equal(hashit.size, HAHMOT.length, 'eri hahmot tuottivat saman PNG:n');
});

for (const [id, henkilo] of HAHMOT) {
  test(`teePaikkamerkkiAtlas(${id}): käytetyt ruudut eivät tyhjiä, käyttämättömät täysin läpinäkyviä`, () => {
    const { leveys, rgba } = lueRgbaPng(teePaikkamerkkiAtlas(henkilo, id));
    RIVIT.forEach((rivi, riviIdx) => {
      for (let sarake = 0; sarake < SARAKKEET; sarake++) {
        const { maxAlfa } = ruudunTiedot(rgba, leveys, sarake, riviIdx);
        if (sarake < rivi.ruudut) {
          assert.ok(maxAlfa > 0, `${rivi.silmukka} ruutu ${sarake}: odotettiin näkyvää hahmoa, ruutu oli tyhjä`);
        } else {
          assert.equal(maxAlfa, 0, `${rivi.silmukka} ruutu ${sarake}: käyttämättömän ruudun pitää olla täysin läpinäkyvä`);
        }
      }
    });
  });

  test(`teePaikkamerkkiAtlas(${id}): jalat pivotin kohdalla (alin peittävä rivi ±3 px)`, () => {
    const { leveys, rgba } = lueRgbaPng(teePaikkamerkkiAtlas(henkilo, id));
    RIVIT.forEach((rivi, riviIdx) => {
      for (let sarake = 0; sarake < rivi.ruudut; sarake++) {
        const { alinAlfallinenRivi } = ruudunTiedot(rgba, leveys, sarake, riviIdx);
        assert.ok(
          Math.abs(alinAlfallinenRivi - PIVOT_Y) <= 3,
          `${rivi.silmukka} ruutu ${sarake}: alin peittävä rivi ${alinAlfallinenRivi}, odotettiin ${PIVOT_Y}±3`,
        );
      }
    });
  });
}
