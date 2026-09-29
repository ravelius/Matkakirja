/*
 * Dioraamamoottorin PAIKKAMERKKIHAHMOJEN atlasgeneraattori (Linnanrakentaja,
 * ali-agentti A5, erä 1). Speksi: docs/raportit/dioraama-rajapinnat-20260929.md
 * kohta 1 (HENKILOT-muoto) ja kohta 3 (`hahmot/<henkilo>.png`).
 *
 * Nämä ovat PAIKKAMERKKEJÄ — yksinkertaiset maalatun näköiset hahmot ennen
 * kuin Codex piirtää oikeat sprite-atlakset. Tyyli: lämmin, 3/4-kuvakulma
 * edestä ylhäältä, pehmeä valo ylhäältä vasemmalta, tumma musteääriviiva
 * (samaa perhettä kuin keittiön konseptikuva).
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA: PNG kirjoitetaan itse Noden zlibillä (talon
 * tyyli, ks. tools/iss-revontulet.mjs harmaaPng ja tools/mittaa-nostokuva.mjs
 * teePng) — täällä RGBA (väri 6) läpinäkyvän taustan vuoksi. Rasterointi on
 * oma pieni SDF-pohjainen piirturi (täytetyt ellipsit, pyöristetyt
 * suorakaiteet, polygonit), reunat pehmennetty 4×4-ylinäytteistyksellä.
 *
 * Kaikki on determinististä: ei Math.randomia, ei kelloa — vain (henkilo, id,
 * silmukka, ruutuIndeksi) määräävät jokaisen pikselin.
 *
 * Käyttö kirjastona: `import { teePaikkamerkkiAtlas } from '.../paikkamerkit.mjs'`
 *   `teePaikkamerkkiAtlas(henkilo, id) → Buffer` (PNG, 1024×768, RGBA).
 * Käyttö CLI:nä:      `node tools/dioraama/paikkamerkit.mjs <ulos-kansio>`
 *   kirjoittaa kolme esimerkkiä (kokki-1500, apulainen-1500, vesipoika-1500)
 *   ja kontaktiarkin (kaikki allekkain harmaalla taustalla) kansioon.
 */

import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/* ==================== PNG (RGBA, itse kirjoitettu) ==================== */

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

/** RGBA-PNG (bittisyvyys 8, värityyppi 6) raakatavuista (leveys × korkeus × 4). Suodin 0 joka rivillä. */
function kirjoitaRgbaPng(leveys, korkeus, rgba) {
  if (rgba.length !== leveys * korkeus * 4) {
    throw new Error(`kirjoitaRgbaPng: ${rgba.length} tavua, odotettiin ${leveys * korkeus * 4}`);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rivinPituus = leveys * 4;
  const raaka = Buffer.alloc((rivinPituus + 1) * korkeus);
  for (let y = 0; y < korkeus; y++) {
    const kohde = y * (rivinPituus + 1);
    raaka[kohde] = 0; // suodin: ei mitään
    raaka.set(rgba.subarray(y * rivinPituus, (y + 1) * rivinPituus), kohde + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka, { level: 9 })),
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/* ==================== Kangas: ylinäytteistetty RGBA-puskuri ==================== */

/** Kuinka moninkertaisena jokainen ruutu piirretään ennen alaspäinnäytteistystä (4×4). */
const YLINAYTE = 4;

/**
 * Ylinäytteistetty maalauspinta. Väri esikerrottuna alfalla (premultiplied),
 * Float32-tarkkuudella — "over"-yhdistely ei tummenna reunoja eikä vuoda
 * väriä läpinäkyvistä pikseleistä. Alaspäinnäytteistys on suora laatikkosuodin
 * (YLINAYTE × YLINAYTE keskiarvo), joka itsessään tuottaa reunan pehmennyksen.
 */
class Kangas {
  constructor(leveys, korkeus) {
    this.leveys = leveys;
    this.korkeus = korkeus;
    this.pr = new Float32Array(leveys * korkeus);
    this.pg = new Float32Array(leveys * korkeus);
    this.pb = new Float32Array(leveys * korkeus);
    this.pa = new Float32Array(leveys * korkeus);
  }

  /** Yhdistä yksi väripiste "over"-kaavalla (r,g,b: 0…255; a: 0…1). */
  pisteAlpha(x, y, r, g, b, a) {
    if (a <= 0 || x < 0 || y < 0 || x >= this.leveys || y >= this.korkeus) return;
    const i = y * this.leveys + x;
    const ia = 1 - a;
    this.pr[i] = r * a + this.pr[i] * ia;
    this.pg[i] = g * a + this.pg[i] * ia;
    this.pb[i] = b * a + this.pb[i] * ia;
    this.pa[i] = a + this.pa[i] * ia;
  }

  /** Alaspäinnäytteistys lopulliseen RGBA8-puskuriin (suora, ei-esikerrottu alfa). */
  alasnaytteista() {
    const w = this.leveys / YLINAYTE;
    const h = this.korkeus / YLINAYTE;
    const ulos = new Uint8ClampedArray(w * h * 4);
    const n = YLINAYTE * YLINAYTE;
    for (let ty = 0; ty < h; ty++) {
      for (let tx = 0; tx < w; tx++) {
        let sr = 0; let sg = 0; let sb = 0; let sa = 0;
        for (let dy = 0; dy < YLINAYTE; dy++) {
          const rivi = (ty * YLINAYTE + dy) * this.leveys + tx * YLINAYTE;
          for (let dx = 0; dx < YLINAYTE; dx++) {
            const i = rivi + dx;
            sr += this.pr[i]; sg += this.pg[i]; sb += this.pb[i]; sa += this.pa[i];
          }
        }
        const o = (ty * w + tx) * 4;
        if (sa > 1e-4) {
          ulos[o] = sr / sa;
          ulos[o + 1] = sg / sa;
          ulos[o + 2] = sb / sa;
          ulos[o + 3] = (sa / n) * 255;
        }
      }
    }
    return ulos;
  }
}

/* ==================== SDF-muodot (täytetty ellipsi, pyöristetty suorakaide, polygoni) ==================== */
/*
 * Jokainen "muoto" on { bbox: [x0,y0,x1,y1] (ruutu-pikseleinä), sdf(x,y) }.
 * sdf saa ylinäytteistetyt kangaskoordinaatit ja palauttaa allekkaisen
 * etäisyyden ylinäytteistetyissä pikseleissä (negatiivinen = sisällä).
 * Distance-kaavat: Inigo Quilezin tunnetut 2D SDF -approksimaatiot
 * (ellipsi, pyöristetty laatikko, polygoni) — ei tarkkoja euklidisia
 * etäisyyksiä kaikkialla, mutta riittävän tarkkoja 2 px:n ääriviivalle.
 */

function kierra(x, y, cx, cy, kulma) {
  if (!kulma) return [x, y];
  const c = Math.cos(kulma); const s = Math.sin(kulma);
  const dx = x - cx; const dy = y - cy;
  return [cx + dx * c - dy * s, cy + dx * s + dy * c];
}

function ellipsiMuoto(cx, cy, rx, ry, kulma = 0) {
  const cxs = cx * YLINAYTE; const cys = cy * YLINAYTE;
  const rxs = Math.max(0.5, rx * YLINAYTE); const rys = Math.max(0.5, ry * YLINAYTE);
  const cosK = Math.cos(-kulma); const sinK = Math.sin(-kulma);
  const cosB = Math.cos(kulma); const sinB = Math.sin(kulma);
  const ex = Math.abs(rx * cosB) + Math.abs(ry * sinB);
  const ey = Math.abs(rx * sinB) + Math.abs(ry * cosB);
  return {
    bbox: [cx - ex - 1, cy - ey - 1, cx + ex + 1, cy + ey + 1],
    sdf(x, y) {
      const dx0 = x - cxs; const dy0 = y - cys;
      const dx = dx0 * cosK - dy0 * sinK;
      const dy = dx0 * sinK + dy0 * cosK;
      const k1 = Math.hypot(dx / rxs, dy / rys);
      if (k1 < 1e-6) return -Math.min(rxs, rys);
      const k2 = Math.hypot(dx / (rxs * rxs), dy / (rys * rys));
      return (k1 * (k1 - 1)) / k2;
    },
  };
}

function laatikkoMuoto(cx, cy, hx, hy, r, kulma = 0) {
  const cxs = cx * YLINAYTE; const cys = cy * YLINAYTE;
  const hxs = hx * YLINAYTE; const hys = hy * YLINAYTE;
  const rs = Math.min(r * YLINAYTE, Math.min(hxs, hys));
  const cosK = Math.cos(-kulma); const sinK = Math.sin(-kulma);
  const cosB = Math.cos(kulma); const sinB = Math.sin(kulma);
  const ex = Math.abs(hx * cosB) + Math.abs(hy * sinB);
  const ey = Math.abs(hx * sinB) + Math.abs(hy * cosB);
  return {
    bbox: [cx - ex - 1, cy - ey - 1, cx + ex + 1, cy + ey + 1],
    sdf(x, y) {
      const dx0 = x - cxs; const dy0 = y - cys;
      const dxr = Math.abs(dx0 * cosK - dy0 * sinK);
      const dyr = Math.abs(dx0 * sinK + dy0 * cosK);
      const qx = dxr - hxs + rs; const qy = dyr - hys + rs;
      return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rs;
    },
  };
}

/** Kapseli (jana + sädettä pyöristetty) kahden pisteen välille — jalat, käsivarret. */
function kapseli(ax, ay, bx, by, sade) {
  const cx = (ax + bx) / 2; const cy = (ay + by) / 2;
  const pituus = Math.hypot(bx - ax, by - ay);
  const kulma = Math.atan2(by - ay, bx - ax);
  return laatikkoMuoto(cx, cy, pituus / 2 + sade * 0.1, sade, sade, kulma);
}

/** Polygoni valmiiksi (mahdollisesti kierretyistä) ruutu-koordinaattipisteistä. */
function polygoniMuoto(pisteet) {
  const v = pisteet.map(([x, y]) => [x * YLINAYTE, y * YLINAYTE]);
  const n = v.length;
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
  for (const [x, y] of pisteet) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return {
    bbox: [minX - 1, minY - 1, maxX + 1, maxY + 1],
    sdf(px, py) {
      let d = (px - v[0][0]) ** 2 + (py - v[0][1]) ** 2;
      let s = 1;
      for (let i = 0, j = n - 1; i < n; j = i, i++) {
        const vix = v[i][0]; const viy = v[i][1]; const vjx = v[j][0]; const vjy = v[j][1];
        const ex = vjx - vix; const ey = vjy - viy;
        const wx = px - vix; const wy = py - viy;
        const denom = ex * ex + ey * ey || 1e-9;
        const t = Math.max(0, Math.min(1, (wx * ex + wy * ey) / denom));
        const bx = wx - ex * t; const by = wy - ey * t;
        const dd = bx * bx + by * by;
        if (dd < d) d = dd;
        const c0 = py >= viy; const c1 = py < vjy; const c2 = ex * wy > ey * wx;
        if ((c0 && c1 && c2) || (!c0 && !c1 && !c2)) s = -s;
      }
      return s * Math.sqrt(d);
    },
  };
}

/* ==================== Täyttö + pehmeä varjostus + ääriviiva ==================== */

const AARIVIIVA = [0x34, 0x28, 0x1d]; // tumma ääriviiva (speksi)
const VALO_SAVY = [255, 246, 222]; // lämmin vaalennus (ei puhdas valkoinen — "maalattu")

/**
 * Valo ylhäältä vasemmalta: vaalennus vasempaan laitaan, tummennus oikeaan,
 * pieni pystykomponentti (yläosa hieman vaaleampi). Palauttaa -1…1
 * ("kirkkaus": negatiivinen = tummenna kohti ääriviivan sävyä, positiivinen
 * = vaalenna kohti VALO_SAVYä). keskiXs/ylaYs/korkeusSs/puoliSs ovat
 * ylinäytteistettyjä pikseleitä.
 */
function teeValaistus(keskiXTile, ylaYTile, korkeusTile, puoliLeveysTile) {
  const keskiXs = keskiXTile * YLINAYTE;
  const ylaYs = ylaYTile * YLINAYTE;
  const korkeusSs = korkeusTile * YLINAYTE;
  const puoliSs = puoliLeveysTile * YLINAYTE;
  return (x, y) => {
    let t = (x - keskiXs) / puoliSs;
    if (t > 1) t = 1; else if (t < -1) t = -1;
    let v = (y - ylaYs) / korkeusSs;
    if (v > 1) v = 1; else if (v < 0) v = 0;
    let k = (-t * 0.85) + (0.5 - v) * 0.3;
    if (k > 1) k = 1; else if (k < -1) k = -1;
    return k;
  };
}

/**
 * Piirrä yksi muoto: täyttö perusvärillä + per-pikseli-valaistus, sitten
 * ohut sisäänpäin viistetty ääriviiva (ei laajenna siluettia — naapurimuodot
 * peittävät oikein). ops.ohitaVarjostus/ohitaReuna pienille yksityiskohdille
 * (silmät ym.), ops.kirkkausKerroin vaimentaa/voimistaa valaistusta.
 */
function piirraMuoto(kangas, muoto, vari, valaistus, ops = {}) {
  const {
    reunaLeveysPx = 2, reunaAlfa = 0.85, kirkkausKerroin = 1, ohitaReuna = false,
  } = ops;
  const reunaSs = reunaLeveysPx * YLINAYTE;
  const [tx0, ty0, tx1, ty1] = muoto.bbox;
  const x0 = Math.max(0, Math.floor(tx0 * YLINAYTE));
  const y0 = Math.max(0, Math.floor(ty0 * YLINAYTE));
  const x1 = Math.min(kangas.leveys, Math.ceil(tx1 * YLINAYTE));
  const y1 = Math.min(kangas.korkeus, Math.ceil(ty1 * YLINAYTE));
  const [pr, pg, pb] = vari;
  const [orr, org, orb] = AARIVIIVA;
  const { sdf } = muoto;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const d = sdf(x + 0.5, y + 0.5);
      if (d > 0) continue;
      let k = valaistus(x + 0.5, y + 0.5) * kirkkausKerroin;
      if (k > 1) k = 1; else if (k < -1) k = -1;
      let r; let g; let b;
      if (k >= 0) {
        r = pr + (VALO_SAVY[0] - pr) * k * 0.4;
        g = pg + (VALO_SAVY[1] - pg) * k * 0.4;
        b = pb + (VALO_SAVY[2] - pb) * k * 0.4;
      } else {
        const kk = -k;
        r = pr + (orr - pr) * kk * 0.4;
        g = pg + (org - pg) * kk * 0.4;
        b = pb + (orb - pb) * kk * 0.4;
      }
      kangas.pisteAlpha(x, y, r, g, b, 1);
      if (!ohitaReuna && d > -reunaSs) {
        kangas.pisteAlpha(x, y, orr, org, orb, reunaAlfa);
      }
    }
  }
}

function hexVari(s) {
  const n = parseInt(s.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* ==================== Hahmon rakenne ja animaatiot ==================== */

const RUUTU = [128, 192]; // [leveys, korkeus] — speksin mukainen (dioraama-rajapinnat kohta 1)
const SARAKKEET = 8;
const RIVIT = [
  { silmukka: 'idle', ruudut: 4 },
  { silmukka: 'tyo', ruudut: 8 },
  { silmukka: 'puhe', ruudut: 4 },
  { silmukka: 'kavely', ruudut: 8 },
];
const LEVEYS = SARAKKEET * RUUTU[0]; // 1024
const KORKEUS = RIVIT.length * RUUTU[1]; // 768

const PIVOT = [0.5, 0.04]; // [x, y-alhaalta] — jalat tässä kohdassa
const PIVOT_Y = RUUTU[1] * (1 - PIVOT[1]); // 184.32 — jalkojen alareuna ylhäältä lukien
const YLA_Y = PIVOT_Y - RUUTU[1] * 0.88; // 15.36 — hahmon (+päähineen) yläreuna, korkeus 88 % ruudusta
const HAHMO_KORKEUS = PIVOT_Y - YLA_Y;
const KESKI_X = RUUTU[0] / 2;

const IHO = [0xe0, 0xb4, 0x8c]; // speksin ihonväri
const SILMA = [0x2a, 0x1f, 0x18];
const KENKA = [0x40, 0x30, 0x22];
const HIUKSET = [0x3a, 0x2a, 0x1c];
const MYSSY_VARI = [0xf6, 0xf2, 0xe7];
const HUIVI_VARI = [0xe6, 0xda, 0xc2];
const AMPARI_PUU = [0x8a, 0x6a, 0x48]; // sama sävy kuin pankit/pinnat.js "puu" (visuaalinen jatkumo)
const AMPARI_METALLI = [0x4a, 0x47, 0x44];

/**
 * Piirrä yksi paikkamerkkihahmo yhteen (jo tyhjään) ylinäytteistettyyn
 * kankaaseen. Kaikki mitat lasketaan ruutu-koordinaateissa (128×192) ja
 * skaalataan YLINAYTE:llä vasta muotojen sisällä.
 */
function piirraHahmo(kangas, henkilo, id, silmukka, ruutuIndeksi, ruutuja) {
  const pm = henkilo.paikkamerkki ?? {};
  const periVari = hexVari(pm.vari ?? '#7a3b2e');
  const esiliinaVari = pm.esiliina ? hexVari(pm.esiliina) : null;
  const paine = pm.paine ?? 'paljas';
  // 'vesipoika' on ainoa erä 1:n nuori hahmo (korkeus_m 1.45 vs. 1.65–1.72):
  // pienempi mittakaava + isompi pääsuhde, ja hän kantaa ämpäriä.
  const nuori = id.includes('vesipoika');
  const kantaaAmparia = id.includes('vesipoika');
  const mk = nuori ? 0.92 : 1; // raajojen/vartalon mittakaava (pään kokoa säädetään erikseen alla)

  /* ---------- Mittasuhteet ---------- */
  const paanSadeY = HAHMO_KORKEUS * (nuori ? 0.132 : 0.114);
  const paanSadeX = paanSadeY * 0.86;
  const paanKeskiY0 = YLA_Y + paanSadeY * (nuori ? 1.18 : 1.28);
  const hartiaY0 = paanKeskiY0 + paanSadeY * 1.05;
  const hartiaPuoliLeveys = HAHMO_KORKEUS * (nuori ? 0.150 : 0.168) * mk;
  const vyotaroY = YLA_Y + HAHMO_KORKEUS * (nuori ? 0.47 : 0.52);
  const vyotaroPuoliLeveys = HAHMO_KORKEUS * 0.145 * mk;
  const helmaY = YLA_Y + HAHMO_KORKEUS * (nuori ? 0.80 : 0.87);
  const helmaPuoliLeveys = HAHMO_KORKEUS * (nuori ? 0.205 : 0.225) * mk;
  const lantioPuoliVali = 10 * mk;
  const jalkaSade = 6.3 * mk;
  const kenkaPuoliLeveys = 9.2 * mk;
  const kenkaPuoliKorkeus = 5.4 * mk;
  const armSade = 6.1 * mk;
  const kasiSade = 6.0 * mk;
  const lepoKasiY = vyotaroY + HAHMO_KORKEUS * 0.12;

  /* ---------- Animaatiotilat (oletus: lepoasento) ---------- */
  let vartaloDY = 0;
  let paaDY = 0;
  let vartaloKulma = 0;
  let kasiA = { x: KESKI_X - hartiaPuoliLeveys - 2, y: lepoKasiY };
  let kasiB = { x: KESKI_X + hartiaPuoliLeveys + 2, y: lepoKasiY };
  let jalkaVasen = { x: KESKI_X - lantioPuoliVali, lift: 0, eteen: 0 };
  let jalkaOikea = { x: KESKI_X + lantioPuoliVali, lift: 0, eteen: 0 };

  if (silmukka === 'idle') {
    // Hengitys: vartalo ±2 px, pää nyökkää lisäksi 1 px.
    const phi = (2 * Math.PI * ruutuIndeksi) / ruutuja;
    const hengitys = 0.5 - 0.5 * Math.cos(phi);
    vartaloDY = -2 * hengitys;
    paaDY = Math.sin(phi);
  } else if (silmukka === 'tyo') {
    // Vartalo kallistuu ±3°, vasen käsi (kasiA) hämmentää PIENTÄ ympyrää
    // omalla puolellaan (ei koskaan keskilinjan yli — muuten suora kapseli
    // olkapäästä käteen näyttäisi vyöltä poikki rinnan).
    const phi = (2 * Math.PI * ruutuIndeksi) / ruutuja;
    vartaloKulma = ((3 * Math.PI) / 180) * Math.sin(phi);
    const ympyraX = KESKI_X - hartiaPuoliLeveys * 0.55;
    const ympyraY = vyotaroY - 9;
    const rX = 8 * mk; const rY = 6.5 * mk;
    kasiA = {
      x: ympyraX + rX * Math.cos(phi),
      y: ympyraY + rY * Math.sin(phi),
    };
  } else if (silmukka === 'puhe') {
    // Pää nyökkää, toinen käsi elehtii ylös (vesipoika: vapaa käsi, ämpärikäsi pysyy).
    const phi = (2 * Math.PI * ruutuIndeksi) / ruutuja;
    paaDY = 3 * Math.sin(phi);
    const nosto = Math.max(0, Math.sin(phi));
    const elehtiiA = kantaaAmparia;
    if (elehtiiA) {
      kasiA = {
        x: KESKI_X - hartiaPuoliLeveys - 2 - 9 * nosto,
        y: lepoKasiY - 40 * nosto,
      };
    } else {
      kasiB = {
        x: KESKI_X + hartiaPuoliLeveys + 2 + 9 * nosto,
        y: lepoKasiY - 40 * nosto,
      };
    }
  } else if (silmukka === 'kavely') {
    // Jalat vuorotellen, vartalo pomppaa 3 px, kädet vastavaiheessa.
    const phi = (2 * Math.PI * ruutuIndeksi) / ruutuja;
    const nostoM = 10 * mk; const heilunta = 15 * mk; const pomppu = 3;
    const jalanTila = (vaihe) => ({
      lift: Math.max(0, -Math.sin(vaihe)) * nostoM,
      eteen: heilunta * Math.cos(vaihe),
    });
    const vL = jalanTila(phi);
    const vR = jalanTila(phi + Math.PI);
    jalkaVasen = { x: KESKI_X - lantioPuoliVali + vL.eteen, lift: vL.lift, eteen: vL.eteen };
    jalkaOikea = { x: KESKI_X + lantioPuoliVali + vR.eteen, lift: vR.lift, eteen: vR.eteen };
    vartaloDY = -pomppu * Math.sin(phi) ** 2;
    // Vastakkainen käsi vastakkaisen jalan vaiheessa (luonnollinen kävely).
    kasiA = { x: KESKI_X - hartiaPuoliLeveys - 2 + 0.75 * vR.eteen, y: lepoKasiY };
    kasiB = { x: KESKI_X + hartiaPuoliLeveys + 2 + 0.75 * vL.eteen, y: lepoKasiY };
  }

  // Ämpäriä kantava käsi (B) pysyy aina aloillaan, myös kävellessä (kannetaan varovasti).
  if (kantaaAmparia) {
    kasiB = { x: KESKI_X + hartiaPuoliLeveys + 2, y: lepoKasiY };
  }

  const vyotaroPiste = [KESKI_X, vyotaroY + vartaloDY];
  const torsoPiste = (x, y) => kierra(x, y + vartaloDY, vyotaroPiste[0], vyotaroPiste[1], vartaloKulma);

  const valaistus = teeValaistus(KESKI_X, YLA_Y, HAHMO_KORKEUS, helmaPuoliLeveys * 1.05);

  /* ---------- 1) Jalat (piirretään ensin, suurin osa jää mekon alle) ---------- */
  const helmaKiinnitysY = helmaY - 4 + vartaloDY;
  for (const [jalka, puoli] of [[jalkaVasen, -1], [jalkaOikea, 1]]) {
    const ylaX = KESKI_X + puoli * lantioPuoliVali;
    const alaX = jalka.x;
    const alaY = PIVOT_Y - jalka.lift;
    piirraMuoto(kangas, kapseli(ylaX, helmaKiinnitysY, alaX, alaY, jalkaSade), IHO, valaistus, { kirkkausKerroin: 0.6 });
    const kenka = laatikkoMuoto(alaX, alaY - kenkaPuoliKorkeus, kenkaPuoliLeveys, kenkaPuoliKorkeus, 3, 0);
    piirraMuoto(kangas, kenka, KENKA, valaistus, { kirkkausKerroin: 0.7 });
  }

  /*
   * ---------- 2) Tunika/mekko ----------
   * KAKSI PANEELIA (vasen/oikea), ei yhtä yhtenäistä muotoa: pitkä helma
   * peittäisi muuten kävelyn kokonaan, koska jalat näkyvät sen alta vain
   * kapealti. Kumpikin paneeli ulottuu olkapäästä vyötärön KESKIPISTEESEEN
   * ja sieltä oman jalkansa helmapisteeseen — levossa (eteen=0) paneelit
   * kohtaavat täsmälleen samassa pisteessä eikä saumaa näy, mutta kävellessä
   * helma jakautuu selvästi ja paljastaa askeleen, aivan kuin pitkä mekko
   * heiluisi kävelyssä.
   */
  const hSL = torsoPiste(KESKI_X - hartiaPuoliLeveys, hartiaY0);
  const hSR = torsoPiste(KESKI_X + hartiaPuoliLeveys, hartiaY0);
  const hartiaKeskus = torsoPiste(KESKI_X, hartiaY0); // kaulan kohta — TÄRKEÄ: ilman tätä rintaan jää aukko
  const vyotaroKeskus = torsoPiste(KESKI_X, vyotaroY);
  const helmaKeskusV = torsoPiste(KESKI_X + jalkaVasen.eteen * 0.5, helmaY);
  const helmaKeskusO = torsoPiste(KESKI_X + jalkaOikea.eteen * 0.5, helmaY);
  const helmaUlkoV = torsoPiste(KESKI_X - helmaPuoliLeveys + jalkaVasen.eteen * 0.4, helmaY);
  const helmaUlkoO = torsoPiste(KESKI_X + helmaPuoliLeveys + jalkaOikea.eteen * 0.4, helmaY);
  piirraMuoto(kangas, polygoniMuoto([hSL, hartiaKeskus, vyotaroKeskus, helmaKeskusV, helmaUlkoV]), periVari, valaistus, {});
  piirraMuoto(kangas, polygoniMuoto([hartiaKeskus, hSR, helmaUlkoO, helmaKeskusO, vyotaroKeskus]), periVari, valaistus, {});

  /* ---------- 3) Esiliina (jos annettu) ---------- */
  if (esiliinaVari) {
    const [apX, apY] = torsoPiste(KESKI_X, (vyotaroY + helmaY) / 2 - 2);
    const apHalfW = ((vyotaroPuoliLeveys + helmaPuoliLeveys) / 2) * 0.62;
    const apHalfH = (helmaY - vyotaroY) / 2 + 5;
    piirraMuoto(kangas, laatikkoMuoto(apX, apY, apHalfW, apHalfH, 5, vartaloKulma), esiliinaVari, valaistus, { kirkkausKerroin: 0.8 });
  }

  /* ---------- 4) Kädet (kapselit + kädet pyöreinä) ---------- */
  for (const [kasi, olkapaa] of [[kasiA, hSL], [kasiB, hSR]]) {
    piirraMuoto(kangas, kapseli(olkapaa[0], olkapaa[1], kasi.x, kasi.y, armSade), periVari, valaistus, { kirkkausKerroin: 0.85 });
    piirraMuoto(kangas, ellipsiMuoto(kasi.x, kasi.y, kasiSade, kasiSade), IHO, valaistus, { kirkkausKerroin: 0.6 });
  }

  /* ---------- 5) Ämpäri (vain vesipoika) — kapeampi pohja, leveämpi suu, kahva suun päällä ---------- */
  if (kantaaAmparia) {
    const bx = kasiB.x; const by = kasiB.y + 14;
    const pail = polygoniMuoto([
      [bx - 6.5, by - 9], [bx + 6.5, by - 9], [bx + 5, by + 9], [bx - 5, by + 9],
    ]);
    piirraMuoto(kangas, pail, AMPARI_PUU, valaistus, { kirkkausKerroin: 0.7 });
    piirraMuoto(kangas, kapseli(bx - 6, by - 9, bx + 6, by - 9, 1.5), AMPARI_METALLI, valaistus, { kirkkausKerroin: 0.4, reunaLeveysPx: 1 });
  }

  /* ---------- 6) Pää ---------- */
  const [paaX, paaY0] = torsoPiste(KESKI_X, paanKeskiY0);
  const paaY = paaY0 + paaDY;
  piirraMuoto(kangas, ellipsiMuoto(paaX, paaY, paanSadeX, paanSadeY, vartaloKulma), IHO, valaistus, { kirkkausKerroin: 0.7 });

  /* ---------- 7) Päähine ---------- */
  if (paine === 'myssy') {
    // Pieni nauha (otsan kohdalla) + pyöreä "poof" — kokin toque, ei ison
    // pallon kokoinen: pään pitää silti erottua hatun alta selvästi.
    const nauha = laatikkoMuoto(paaX, paaY - paanSadeY * 0.80, paanSadeX * 0.82, paanSadeY * 0.15, 2, vartaloKulma);
    piirraMuoto(kangas, nauha, MYSSY_VARI, valaistus, { kirkkausKerroin: 0.6 });
    const poof = ellipsiMuoto(paaX, paaY - paanSadeY * 1.05, paanSadeX * 0.85, paanSadeY * 0.58, vartaloKulma);
    piirraMuoto(kangas, poof, MYSSY_VARI, valaistus, { kirkkausKerroin: 0.9 });
  } else if (paine === 'huivi') {
    // Pyöreä huivi päälaella, samaa muotoperhettä kuin 'paljas'-hiukset
    // (ellipsi kapenee sivuille — EI polygonia kasvojen yli, se peittäisi
    // koko kasvoleveyden keskikorkeudella suorien reunojensa takia).
    // Solmun häntä kokonaan pään OIKEALLA SIVULLA, ei kasvojen kohdalla.
    const kansi = ellipsiMuoto(paaX, paaY - paanSadeY * 0.36, paanSadeX * 1.03, paanSadeY * 0.72, vartaloKulma);
    piirraMuoto(kangas, kansi, HUIVI_VARI, valaistus, { kirkkausKerroin: 0.7 });
    const solmu = polygoniMuoto([
      [paaX + paanSadeX * 0.92, paaY + paanSadeY * 0.08],
      [hSR[0] + 5, hSR[1] - 3],
      [hSR[0] - 2, hSR[1] + 9],
    ]);
    piirraMuoto(kangas, solmu, HUIVI_VARI, valaistus, { kirkkausKerroin: 0.6 });
  } else {
    // 'paljas' — tummat hiukset yläpäässä, kasvot (ja silmät) jäävät näkyviin.
    const hius = ellipsiMuoto(paaX, paaY - paanSadeY * 0.32, paanSadeX * 0.96, paanSadeY * 0.80, vartaloKulma);
    piirraMuoto(kangas, hius, HIUKSET, valaistus, { kirkkausKerroin: 0.7 });
  }

  /* ---------- 8) Kasvot: kaksi pientä silmää (3/4-kuvakulman vinoutumalla) ---------- */
  const silmaBiasX = paanSadeX * 0.16;
  const silmaOffX = paanSadeX * 0.33;
  const silmaY = paaY + paanSadeY * 0.14;
  for (const puoli of [-1, 1]) {
    const [sx, sy] = kierra(paaX + puoli * silmaOffX + silmaBiasX, silmaY, paaX, paaY, vartaloKulma);
    piirraMuoto(kangas, ellipsiMuoto(sx, sy, 1.7, 2.1), SILMA, valaistus, { ohitaReuna: true, kirkkausKerroin: 0 });
  }
}

/* ==================== Julkinen rajapinta ==================== */

/** Yhden hahmon paikkamerkkiatlas: 1024×768 RGBA-PNG, läpinäkyvä tausta. */
function piirraAtlasRaaka(henkilo, id) {
  const atlas = new Uint8ClampedArray(LEVEYS * KORKEUS * 4);
  for (const [riviIdx, rivi] of RIVIT.entries()) {
    for (let f = 0; f < rivi.ruudut; f++) {
      const kangas = new Kangas(RUUTU[0] * YLINAYTE, RUUTU[1] * YLINAYTE);
      piirraHahmo(kangas, henkilo, id, rivi.silmukka, f, rivi.ruudut);
      const tavut = kangas.alasnaytteista();
      const px0 = f * RUUTU[0]; const py0 = riviIdx * RUUTU[1];
      const rivinPituus = RUUTU[0] * 4;
      for (let y = 0; y < RUUTU[1]; y++) {
        const lahde = y * rivinPituus;
        const kohde = ((py0 + y) * LEVEYS + px0) * 4;
        atlas.set(tavut.subarray(lahde, lahde + rivinPituus), kohde);
      }
    }
  }
  return atlas;
}

/**
 * `teePaikkamerkkiAtlas(henkilo, id) → Buffer` (PNG, 1024×768, RGBA).
 * henkilo = { paikkamerkki: { vari, esiliina?, paine } , ... } (dioraama-rajapinnat kohta 1).
 * id = hahmon avain (esim. 'vesipoika-1500') — vain id.includes('vesipoika')
 * vaikuttaa piirtoon (nuoremmat mittasuhteet + ämpäri).
 */
export function teePaikkamerkkiAtlas(henkilo, id) {
  return kirjoitaRgbaPng(LEVEYS, KORKEUS, piirraAtlasRaaka(henkilo, id));
}

export {
  RUUTU, SARAKKEET, RIVIT, LEVEYS, KORKEUS, PIVOT, PIVOT_Y,
  kirjoitaRgbaPng, // erä 2: liekki-paikkamerkit.mjs käyttää samaa PNG-kirjoitinta
};

/* ==================== CLI ==================== */

const ESIMERKIT = {
  'kokki-1500': { nimi: 'Kokki', paikkamerkki: { vari: '#7a3b2e', esiliina: '#e8e0cc', paine: 'myssy' } },
  'apulainen-1500': { nimi: 'Apulainen', paikkamerkki: { vari: '#4f5d3a', esiliina: '#d9ceb0', paine: 'huivi' } },
  'vesipoika-1500': { nimi: 'Vesipoika', paikkamerkki: { vari: '#5a4a6e', paine: 'paljas' } },
};

/** Kaikki esimerkkiatlakset allekkain harmaalla (#808080) taustalla, yhtenä PNG:nä. */
function teeKontaktiarkki(raakapuskurit) {
  const VALI = 16;
  const korkeus = raakapuskurit.length * KORKEUS + (raakapuskurit.length + 1) * VALI;
  const tausta = new Uint8ClampedArray(LEVEYS * korkeus * 4);
  for (let i = 0; i < tausta.length; i += 4) {
    tausta[i] = 0x80; tausta[i + 1] = 0x80; tausta[i + 2] = 0x80; tausta[i + 3] = 255;
  }
  let y0 = VALI;
  for (const rgba of raakapuskurit) {
    for (let y = 0; y < KORKEUS; y++) {
      const lahdeRivi = y * LEVEYS * 4;
      const kohdeRivi = (y0 + y) * LEVEYS * 4;
      for (let x = 0; x < LEVEYS; x++) {
        const si = lahdeRivi + x * 4; const di = kohdeRivi + x * 4;
        const a = rgba[si + 3] / 255;
        if (a <= 0) continue;
        const ia = 1 - a;
        tausta[di] = rgba[si] * a + tausta[di] * ia;
        tausta[di + 1] = rgba[si + 1] * a + tausta[di + 1] * ia;
        tausta[di + 2] = rgba[si + 2] * a + tausta[di + 2] * ia;
      }
    }
    y0 += KORKEUS + VALI;
  }
  return kirjoitaRgbaPng(LEVEYS, korkeus, tausta);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ulos = process.argv[2];
  if (!ulos) {
    console.error('Käyttö: node tools/dioraama/paikkamerkit.mjs <ulos-kansio>');
    process.exit(1);
  }
  mkdirSync(ulos, { recursive: true });
  const raakapuskurit = [];
  for (const [id, henkilo] of Object.entries(ESIMERKIT)) {
    const raaka = piirraAtlasRaaka(henkilo, id);
    raakapuskurit.push(raaka);
    const polku = resolve(ulos, `${id}.png`);
    writeFileSync(polku, kirjoitaRgbaPng(LEVEYS, KORKEUS, raaka));
    console.log(`${id}: ${polku}`);
  }
  const kontaktiPolku = resolve(ulos, 'kontaktiarkki.png');
  writeFileSync(kontaktiPolku, teeKontaktiarkki(raakapuskurit));
  console.log(`Kontaktiarkki: ${kontaktiPolku}`);
}
