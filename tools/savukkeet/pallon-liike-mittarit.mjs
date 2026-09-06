/*
 * PALLON LIIKKEEN MITTARIT — kuvakaappausten pikselimittarit, jotka
 * tools/savukkeet/mittaa-pallon-liike.mjs (pelin pallo) ja
 * tools/savukkeet/mittaa-kirjastokokeilu.mjs (kirjastokokeilut)
 * jakavat. Kaikki luvut laitepikseleinä.
 */
import { inflateSync } from 'node:zlib';

export function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('ei PNG');
  let p = 8; let width = 0; let height = 0; let colorType = 0; let bitDepth = 0;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    p += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`bittisyvyys ${bitDepth}`);
  const kanavat = { 2: 3, 6: 4, 0: 1, 4: 2 }[colorType];
  const raw = inflateSync(Buffer.concat(idat));
  const bpp = kanavat; const stride = width * bpp;
  const out = new Uint8Array(width * height * 4);
  const prev = new Uint8Array(stride); const cur = new Uint8Array(stride);
  let q = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[q]; q += 1;
    for (let i = 0; i < stride; i += 1) {
      const x = raw[q + i]; const a = i >= bpp ? cur[i - bpp] : 0; const b = prev[i]; const c = i >= bpp ? prev[i - bpp] : 0;
      let v;
      switch (filter) {
        case 0: v = x; break; case 1: v = x + a; break; case 2: v = x + b; break;
        case 3: v = x + ((a + b) >> 1); break;
        case 4: { const pp = a + b - c; const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
        default: throw new Error(`suodatin ${filter}`);
      }
      cur[i] = v & 255;
    }
    q += stride;
    for (let x = 0; x < width; x += 1) {
      const s = x * bpp; const d = (y * width + x) * 4;
      if (kanavat >= 3) { out[d] = cur[s]; out[d + 1] = cur[s + 1]; out[d + 2] = cur[s + 2]; out[d + 3] = kanavat === 4 ? cur[s + 3] : 255; }
      else { out[d] = out[d + 1] = out[d + 2] = cur[s]; out[d + 3] = kanavat === 2 ? cur[s + 1] : 255; }
    }
    prev.set(cur);
  }
  return { width, height, data: out };
}

/** Musteen raja: laattojen viivat ja teksti ovat tummaa ruskeaa (< 100), pergamentti > 170. */
export const MUSTERAJA = 150;
export const luminanssi = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];

/**
 * Viivan paksuus alueella: mustepikselien lyhyemmän juoksun mediaani.
 * Palauttaa { paksuus, p75, mustetta, osuus }.
 */
export function viivanPaksuus(kuva, alue) {
  const { width, data } = kuva;
  const { x0, y0, x1, y1 } = alue;
  const W = x1 - x0; const H = y1 - y0;
  const muste = new Uint8Array(W * H);
  let n = 0;
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const i = ((y + y0) * width + (x + x0)) * 4;
      if (luminanssi(data, i) < MUSTERAJA) { muste[y * W + x] = 1; n += 1; }
    }
  }
  if (!n) return { paksuus: 0, p75: 0, mustetta: 0, osuus: 0 };
  // Vaakajuoksut
  const vaaka = new Uint16Array(W * H);
  for (let y = 0; y < H; y += 1) {
    let x = 0;
    while (x < W) {
      if (!muste[y * W + x]) { x += 1; continue; }
      let e = x; while (e < W && muste[y * W + e]) e += 1;
      for (let k = x; k < e; k += 1) vaaka[y * W + k] = e - x;
      x = e;
    }
  }
  const pysty = new Uint16Array(W * H);
  for (let x = 0; x < W; x += 1) {
    let y = 0;
    while (y < H) {
      if (!muste[y * W + x]) { y += 1; continue; }
      let e = y; while (e < H && muste[e * W + x]) e += 1;
      for (let k = y; k < e; k += 1) pysty[k * W + x] = e - y;
      y = e;
    }
  }
  const arvot = [];
  for (let i = 0; i < W * H; i += 1) if (muste[i]) arvot.push(Math.min(vaaka[i], pysty[i]));
  arvot.sort((a, b) => a - b);
  const q = (p) => arvot[Math.min(arvot.length - 1, Math.floor(arvot.length * p))];
  return { paksuus: q(0.5), p75: q(0.75), mustetta: n, osuus: +(n / (W * H)).toFixed(4) };
}

/**
 * REUNAN LEVEYS: rantaviivan (ja muiden reunojen) paksuus mitataan
 * luminanssin askelman leveytenä. Jokaisella rivillä ja sarakkeella
 * etsitään gradientin paikalliset huiput (|dL| ≥ REUNARAJA) ja mitataan,
 * kuinka monta pikseliä gradientti pysyy yli puolen huipusta (FWHM).
 * Terävä reuna on 1–2 px; 6× venytetty laatta antaa 6–10 px. Palauttaa
 * mediaanin, p75:n ja reunojen määrän.
 */
export const REUNARAJA = 10;
export function reunanLeveys(kuva, alue) {
  const { width, data } = kuva;
  const { x0, y0, x1, y1 } = alue;
  const W = x1 - x0; const H = y1 - y0;
  const L = new Float32Array(W * H);
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) L[y * W + x] = luminanssi(data, ((y + y0) * width + (x + x0)) * 4);
  const leveydet = [];
  const mittaa = (haku, n, m) => {
    // haku(i, j): luminanssi; i = juoksun suunta 0..n-1, j = 0..m-1
    for (let j = 0; j < m; j += 1) {
      const g = new Float32Array(n);
      for (let i = 1; i < n - 1; i += 1) g[i] = Math.abs(haku(i + 1, j) - haku(i - 1, j)) / 2;
      for (let i = 2; i < n - 2; i += 1) {
        if (g[i] < REUNARAJA || g[i] < g[i - 1] || g[i] < g[i + 1]) continue;
        const puoli = g[i] / 2;
        let a = i; while (a > 0 && g[a - 1] >= puoli) a -= 1;
        let b = i; while (b < n - 1 && g[b + 1] >= puoli) b += 1;
        leveydet.push(b - a + 1);
        i = b;
      }
    }
  };
  mittaa((i, j) => L[j * W + i], W, H);
  mittaa((i, j) => L[i * W + j], H, W);
  if (!leveydet.length) return { leveys: 0, p75: 0, reunoja: 0 };
  leveydet.sort((a, b) => a - b);
  const q = (pp) => leveydet[Math.min(leveydet.length - 1, Math.floor(leveydet.length * pp))];
  return { leveys: q(0.5), p75: q(0.75), p90: q(0.9), reunoja: leveydet.length };
}

/** Tyhjän (mustan pohjapallon, r,g,b < 24) osuus alueella. */
export function tyhjanOsuus(kuva, alue) {
  const { width, data } = kuva;
  let n = 0; let m = 0;
  for (let y = alue.y0; y < alue.y1; y += 1) {
    for (let x = alue.x0; x < alue.x1; x += 1) {
      const i = (y * width + x) * 4;
      m += 1;
      if (data[i] < 24 && data[i + 1] < 24 && data[i + 2] < 24) n += 1;
    }
  }
  return +(n / m).toFixed(4);
}

/** Kahden kuvan keskimääräinen absoluuttinen ero alueella (0–255). */
export function kuvienEro(a, b, alue) {
  let s = 0; let m = 0;
  for (let y = alue.y0; y < alue.y1; y += 2) {
    for (let x = alue.x0; x < alue.x1; x += 2) {
      const i = (y * a.width + x) * 4;
      s += Math.abs(luminanssi(a.data, i) - luminanssi(b.data, i));
      m += 1;
    }
  }
  return +(s / m).toFixed(2);
}

export const pinta = (kuva, alue) => ({ reuna: reunanLeveys(kuva, alue), muste: viivanPaksuus(kuva, alue) });
export const p = (arr, q) => { if (!arr.length) return 0; const s = [...arr].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor(s.length * q))].toFixed(1); };

