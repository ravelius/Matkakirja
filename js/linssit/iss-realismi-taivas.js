/*
 * ISS-REALISMI 4 WEBISSÄ: KUUKAUDEN PINTA, KUU JA TÄHDET (Siirtoseppä 28.9.2026; natiivi Linssiseppä 2, proto
 * linssiseppa2/kyydin-taivas 48282222: AstronauttiKerros.PaivitaKuukaudenPinta, KyydinTaivas.cs, Kuu.cs, KyydinKuu.shader,
 * KyydinTahdet.shader). Samat vakiot; kerrosrajapinta kuten iss-realismi-kerrokset.js ({ nimi, rakenna, paivita, pura }).
 *
 *   kuukausi  4a: NASA Blue Marble NG 2004 -kuukausipinta (PD) reliefin päällä alfalla 0,75 kyydissä. Natiivi piirtää
 *             Karttasepän Web Mercator -pyramidin julisteet/pallo/bmng/<kk>/{z}/{x}/{y}.jpg (Z0–Z7) Cesiumin
 *             rasterina; web piirtää saman pyramidin lähipalan (Z6, 8 × 8 laattaa ISS:n alta) ja koko pallon
 *             tasakulmaisesta data/bmng/<kk>-4096.jpg:stä (sama aineisto, Maapallon vuosi -linssi) yhdellä kuorella,
 *             joka laskee katsesäteen osuman maahan (kuten yökuori). Kuukausi simuloidusta ajasta (UTC). Z0-laatan
 *             HEAD ennen käyttöä: jos kuukauden pyramidi puuttuu ämpäristä, relief jää (natiivin tapaan).
 *   kuu       4b: Meeus luku 47 lyhennettynä (≈ 0,3°), ECI → ECEF GMST:llä → pallo; kiekko 0,52° kaukotasolla, vaihe
 *             Lambert pallon normaalista auringon suuntaan, maanvalo 0,03, kirkkaus 1,25, kohinameret.
 *   tahdet    4c: Yale BSC5 (1 656 tähteä, PD) ämpäristä; neljä kärkeä tähteä kohden, varjostin kiertää ECI:n palloon
 *             (GMST) ja levittää neliön ruutupikseleinä; kaukotasolla, joten maa peittää. Koko ja kirkkaus magnitudista,
 *             väri B−V:stä; peitto 1, kun ISS on maan varjossa (sylinteri), muuten 0,3. Kun oikeat tähdet ovat
 *             ladattu, satunnainen tähtikenttä sammuu kyydissä (korvaaTahdet → iss-realismi.js satunnaisetTahdet).
 *
 * Globe.gl: pallon piste (lat φ, lon λ) = (cos φ sin λ, sin φ, cos φ cos λ), eli ECEF (X, Y, Z) → pallo (Y, Z, X).
 */

import { gmst, jdHetkesta } from './iss-rata.js';
// Kerrosapurit luetaan vasta kutsuhetkellä: moduulit tuovat toisiaan syklisesti satelliitti-avaruuden kautta (sama syy kuin
// iss-realismi-kerrokset.js:n PILVIEN_PEITTO), joten tuotuja vakioita ei käytetä latausvaiheessa.
import { BLEND, kuori, tekstuuriLuokka, vec3 } from './iss-realismi-kerrokset.js';

const AMPARI = 'https://media.matkakirja.app/';

/** 4a: natiivin AstronauttiKerros (KuukaudenAlfa 0,75, pyramidi Z0–Z7); web: lähipala Z6 8 × 8. */
export const KUUKAUSI = Object.freeze({ alfa: 0.75, taso: 6, ruudut: 8, laatta: 256, sade: 1.012, jarjestys: 1.9 });
/** 4b: KyydinKuu (kulma 0,52°, reunan ylimitoitus 1,25, kirkkaus 1,25, maanvalo 0,03). */
export const KUU = Object.freeze({ kulma: 0.52, yli: 1.25, kirkkaus: 1.25, maanvalo: 0.03, jarjestys: 1 });
/** 4c: KyydinTahdet (koko 1,1…4,2 px × tiheys × 1,6; peitto varjossa 1, päivällä 0,3). */
export const TAHDET = Object.freeze({ kokoMin: 1.1, kokoMax: 4.2, kerroin: 1.6, varjossa: 1, paivalla: 0.3, jarjestys: 0.9 });

export const TAIVAAN_LAHTEET = Object.freeze({
  tahdet: `${AMPARI}linssit/astronautin-kamera/tahdet-bsc5-2026-09-28.json`,
  maailma: (kk) => `${AMPARI}data/bmng/${kk}-4096.jpg`,
  laatta: (kk, z, x, y) => `${AMPARI}julisteet/pallo/bmng/${kk}/${z}/${x}/${y}.jpg`,
});

const MAAN_SADE_M = 6378137;
const DEG = Math.PI / 180;
const kk2 = (n) => String(n).padStart(2, '0');

/* ─────────────────────────── laskenta (Node-testattava) ─────────────────────────── */

/** Kuun suunta ECI:ssä (yksikkövektori) ja etäisyys (km), Meeus luku 47 lyhennettynä (natiivi Kuu.Suunta). */
export function kuunSuunta(jd) {
  const t = (jd - 2451545.0) / 36525.0;
  const lp = 218.3164477 + 481267.88123421 * t;
  const d = (297.8501921 + 445267.1114034 * t) * DEG;
  const m = (357.5291092 + 35999.0502909 * t) * DEG;
  const mp = (134.9633964 + 477198.8675055 * t) * DEG;
  const f = (93.2720950 + 483202.0175233 * t) * DEG;
  const pituus = lp + 6.288774 * Math.sin(mp) + 1.274027 * Math.sin(2 * d - mp) + 0.658314 * Math.sin(2 * d)
    + 0.213618 * Math.sin(2 * mp) - 0.185116 * Math.sin(m) - 0.114332 * Math.sin(2 * f);
  const leveys = 5.128122 * Math.sin(f) + 0.280602 * Math.sin(mp + f) + 0.277693 * Math.sin(mp - f)
    + 0.173237 * Math.sin(2 * d - f);
  const km = 385000.56 - 20905.355 * Math.cos(mp) - 3699.111 * Math.cos(2 * d - mp) - 2955.968 * Math.cos(2 * d)
    - 569.925 * Math.cos(2 * mp);
  const eps = (23.439291 - 0.0130042 * t) * DEG;
  const l = pituus * DEG; const b = leveys * DEG;
  const xe = Math.cos(b) * Math.cos(l); const ye = Math.cos(b) * Math.sin(l); const ze = Math.sin(b);
  return { x: xe, y: ye * Math.cos(eps) - ze * Math.sin(eps), z: ye * Math.sin(eps) + ze * Math.cos(eps), km };
}

/** ECI-suunta Globe.gl:n pallon koordinaatteihin: GMST-kierto ECEF:iin ja ECEF (X, Y, Z) → pallo (Y, Z, X). */
export function eciPalloon([x, y, z], jd) {
  const g = gmst(jd); const c = Math.cos(g); const s = Math.sin(g);
  const ex = c * x + s * y; const ey = -s * x + c * y;
  return [ey, z, ex];
}

/** ECI:n kantavektorit pallon koordinaateissa (tähtivarjostimen kierto). */
export function eciKanta(jd) {
  return { x: eciPalloon([1, 0, 0], jd), y: eciPalloon([0, 1, 0], jd), z: [0, 1, 0] };
}

/** Tähden kirkkaus magnitudista: havaittu (neliöjuuri vuosta), lattia 0,22, katto 2,5 (natiivi KyydinTaivas.Kirkkaus). */
export const tahdenKirkkaus = (mag) => Math.min(2.5, Math.max(0.22, 10 ** (-0.2 * (mag - 1))));
/** Tähden koko (px @1×) magnitudista: 1,1…4,2. */
export const tahdenKoko = (mag) => TAHDET.kokoMin + (TAHDET.kokoMax - TAHDET.kokoMin) * Math.min(1, Math.max(0, (4.5 - mag) / 5.5));

const lerp3 = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const raja01 = (v) => Math.min(1, Math.max(0, v));
/** Tähden väri B−V:stä (sininen −0,3 … valkoinen 0 … kellertävä 0,6 … oranssi 1,6). */
export function tahdenVari(bv) {
  if (bv < 0) return lerp3([0.72, 0.8, 1], [1, 1, 1], raja01((bv + 0.3) / 0.3));
  if (bv < 0.6) return lerp3([1, 1, 1], [1, 0.95, 0.84], bv / 0.6);
  return lerp3([1, 0.95, 0.84], [1, 0.72, 0.48], raja01((bv - 0.6) / 1.0));
}

/** Onko piste p (pallon koordinaatit, säde R) maan varjossa: sylinterimalli auringon suuntaan a (yksikkövektori). */
export function maanVarjossa(p, a, R) {
  const d = p[0] * a[0] + p[1] * a[1] + p[2] * a[2];
  if (d >= 0) return false;
  const q = [p[0] - a[0] * d, p[1] - a[1] * d, p[2] - a[2] * d];
  return q[0] * q[0] + q[1] * q[1] + q[2] * q[2] < R * R;
}

/** Web Mercator -laatta (x, y) tasolla z pisteelle (lat, lon), y = 0 pohjoisessa. */
export function mercatorLaatta(lat, lon, z) {
  const n = 2 ** z;
  const f = Math.max(-85.05, Math.min(85.05, lat)) * DEG;
  const x = Math.floor(((lon + 180) / 360) * n);
  const y = Math.floor((0.5 - Math.log(Math.tan(Math.PI / 4 + f / 2)) / (2 * Math.PI)) * n);
  return { x: ((x % n) + n) % n, y: Math.min(n - 1, Math.max(0, y)) };
}

/** Lähipalan laattaikkuna: keskilaatan ympäriltä ruudut × ruudut, x kiertyy, y pysyy välillä 0…n−1. */
export function lahipala(keski, z, ruudut) {
  const n = 2 ** z;
  const x0 = (((keski.x - Math.floor(ruudut / 2)) % n) + n) % n;
  const y0 = Math.min(n - ruudut, Math.max(0, keski.y - Math.floor(ruudut / 2)));
  return { z, n, x0, y0, ruudut };
}

/* ─────────────────────────── 4a KUUKAUDEN PINTA ─────────────────────────── */

const KUUKAUSI_FRAGMENT = `
uniform float uOsuus, uAlfa, uR, uLahiOn;
uniform sampler2D uMaailma, uLahi;
uniform vec4 uLahiRaja;
varying vec3 vMaailma;
void main() {
  vec3 o = cameraPosition;
  vec3 d = normalize(vMaailma - cameraPosition);
  float b = dot(o, d), h = b * b - (dot(o, o) - uR * uR);
  float t = -b - sqrt(max(h, 0.0));
  if (h < 0.0 || t < 0.0) discard;
  vec3 ng = normalize(o + d * t);
  float lon = atan(ng.x, ng.z);
  float latR = asin(clamp(ng.y, -1.0, 1.0));
  // Bias −16 = tason 0 näyte: atan-sauma ±180°:ssa ei valitse pienintä mip-tasoa.
  vec3 c = texture2D(uMaailma, vec2(lon / 6.2831853 + 0.5, latR / 3.14159265 + 0.5), -16.0).rgb;
  float lat = clamp(latR, -1.4844, 1.4844);
  float m = 0.5 - log(tan(0.7853982 + lat * 0.5)) / 6.2831853;
  float du = fract(lon / 6.2831853 + 0.5 - uLahiRaja.x + 1.0) / uLahiRaja.y;
  float dv = (m - uLahiRaja.z) / uLahiRaja.w;
  if (uLahiOn > 0.5 && du < 1.0 && dv > 0.0 && dv < 1.0) {
    vec4 l = texture2D(uLahi, vec2(du, 1.0 - dv), -16.0);
    float reuna = clamp(min(min(du, 1.0 - du), min(dv, 1.0 - dv)) / 0.06, 0.0, 1.0);
    c = mix(c, l.rgb, reuna * l.a);
  }
  gl_FragColor = vec4(c, uAlfa * uOsuus);
}`;

export function kuukaudenPinta({ ikkuna = globalThis, lahteet = TAIVAAN_LAHTEET, arvot = KUUKAUSI } = {}) {
  let mesh = null; let T = null; let kuukausi = 0; let lahiKey = ''; let rakentuu = false; let maailmaOk = false;
  const pyramidi = new Map(); // kk → true/false/'kesken'
  const ab = { kuukausi: 1, alfa: arvot.alfa, pakotettu: 0 };
  const u = () => mesh.material.uniforms;

  const lataaKuva = (osoite) => new Promise((ok) => {
    const img = new ikkuna.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => ok(img);
    img.onerror = () => ok(null);
    img.src = osoite;
  });

  const kokeile = (kk) => {
    pyramidi.set(kk, 'kesken');
    const f = ikkuna.fetch?.bind(ikkuna);
    if (!f) { pyramidi.set(kk, false); return; }
    f(lahteet.laatta(kk2(kk), 0, 0, 0), { method: 'HEAD' })
      .then((v) => pyramidi.set(kk, v.ok)).catch(() => pyramidi.set(kk, false));
  };

  const vaihdaKuukausi = (kk) => {
    kuukausi = kk; maailmaOk = false; lahiKey = '';
    u().uLahiOn.value = 0;
    void lataaKuva(lahteet.maailma(kk2(kk))).then((img) => {
      if (!mesh || kuukausi !== kk || !img) return;
      u().uMaailma.value?.dispose?.();
      const t = new T(img); t.needsUpdate = true;
      u().uMaailma.value = t;
      maailmaOk = true;
    });
  };

  const rakennaLahi = (iss, kk) => {
    const pala = lahipala(mercatorLaatta(iss.lat, iss.lon, arvot.taso), arvot.taso, arvot.ruudut);
    const key = `${kk}/${pala.x0}/${pala.y0}`;
    if (key === lahiKey || rakentuu) return;
    // Uusi pala vasta, kun ISS on siirtynyt kaksi laattaa keskeltä (Z6 ≈ 5,6°), ei joka laatalla.
    const nyt = mercatorLaatta(iss.lat, iss.lon, arvot.taso);
    if (lahiKey && lahiKey.startsWith(`${kk}/`)) {
      const [, x0, y0] = lahiKey.split('/').map(Number);
      const dx = Math.min(Math.abs(nyt.x - (x0 + arvot.ruudut / 2)), pala.n - Math.abs(nyt.x - (x0 + arvot.ruudut / 2)));
      if (dx < 2 && Math.abs(nyt.y - (y0 + arvot.ruudut / 2)) < 2) return;
    }
    rakentuu = true;
    const koko = arvot.ruudut * arvot.laatta;
    const kangas = ikkuna.document.createElement('canvas');
    kangas.width = koko; kangas.height = koko;
    const ctx = kangas.getContext('2d');
    const haut = [];
    for (let j = 0; j < arvot.ruudut; j += 1) {
      for (let i = 0; i < arvot.ruudut; i += 1) {
        const x = (pala.x0 + i) % pala.n; const y = pala.y0 + j;
        haut.push(lataaKuva(lahteet.laatta(kk2(kk), pala.z, x, y)).then((img) => {
          if (img) ctx.drawImage(img, i * arvot.laatta, j * arvot.laatta, arvot.laatta, arvot.laatta);
        }));
      }
    }
    void Promise.all(haut).then(() => {
      rakentuu = false;
      if (!mesh || kuukausi !== kk) return;
      u().uLahi.value?.dispose?.();
      const t = new T(kangas); t.needsUpdate = true;
      u().uLahi.value = t;
      Object.assign(u().uLahiRaja.value, { x: pala.x0 / pala.n, y: arvot.ruudut / pala.n, z: pala.y0 / pala.n, w: arvot.ruudut / pala.n });
      u().uLahiOn.value = 1;
      lahiKey = key;
    });
  };

  return {
    nimi: 'kuukausi',
    ab,
    rakenna(y) {
      const uni = {
        uOsuus: { value: 0 }, uAlfa: { value: arvot.alfa }, uR: { value: y.R }, uLahiOn: { value: 0 },
        uMaailma: { value: null }, uLahi: { value: null }, uLahiRaja: { value: { x: 0, y: 1, z: 0, w: 1 } },
      };
      mesh = kuori(y, { sade: arvot.sade, fragment: KUUKAUSI_FRAGMENT, uniformit: uni, jarjestys: arvot.jarjestys });
      T = tekstuuriLuokka(y.pallo);
    },
    paivita(y, k) {
      if (!mesh) return;
      if (!T) T = tekstuuriLuokka(y.pallo);
      const kk = ab.pakotettu >= 1 && ab.pakotettu <= 12 ? ab.pakotettu : new Date(k.ms).getUTCMonth() + 1;
      const kyydissa = k.osuus > 0.001 && ab.kuukausi > 0 && T;
      if (kyydissa && !pyramidi.has(kk)) kokeile(kk);
      const kaytossa = kyydissa && pyramidi.get(kk) === true;
      if (kaytossa && kk !== kuukausi) vaihdaKuukausi(kk);
      mesh.visible = Boolean(kaytossa && maailmaOk);
      if (!mesh.visible) return;
      u().uOsuus.value = k.osuus;
      u().uAlfa.value = ab.alfa;
      if (k.iss && Number.isFinite(k.iss.lat)) rakennaLahi(k.iss, kk);
    },
    pura() {
      if (!mesh) return;
      u().uMaailma.value?.dispose?.(); u().uLahi.value?.dispose?.();
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null;
      kuukausi = 0; lahiKey = ''; maailmaOk = false; rakentuu = false;
    },
    tila: () => ({ nakyy: Boolean(mesh?.visible), kuukausi, maailma: maailmaOk, lahi: lahiKey || null,
      pyramidi: Object.fromEntries(pyramidi) }),
  };
}

/* ─────────────────────────── 4b KUU ─────────────────────────── */

const KUU_VERTEX = `
uniform vec3 uSuunta;
uniform float uKoko;
varying vec2 vUv;
varying vec3 vOikea, vYlos, vKohti;
void main() {
  vec3 d = normalize(uSuunta);
  vec3 apu = abs(d.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 oikea = normalize(cross(apu, d)), ylos = cross(d, oikea);
  vec3 p = d + (oikea * position.x + ylos * position.y) * uKoko * ${KUU.yli.toFixed(2)};
  vec4 c = projectionMatrix * vec4((viewMatrix * vec4(p, 0.0)).xyz, 1.0);
  c.z = 0.999999 * c.w;
  gl_Position = c;
  vUv = position.xy * ${KUU.yli.toFixed(2)};
  vOikea = oikea; vYlos = ylos; vKohti = -d;
}`;

const KUU_FRAGMENT = `
uniform vec3 uAurinko;
uniform float uKirkkaus, uMaanvalo, uOsuus;
varying vec2 vUv;
varying vec3 vOikea, vYlos, vKohti;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float kohina(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}
void main() {
  float r2 = dot(vUv, vUv);
  float kiekko = 1.0 - smoothstep(0.9, 1.1, r2);
  float z = sqrt(clamp(1.0 - r2, 0.0, 1.0));
  vec3 n = normalize(vOikea * vUv.x + vYlos * vUv.y + vKohti * z);
  float valo = clamp(dot(n, normalize(uAurinko)), 0.0, 1.0);
  float meri = smoothstep(0.45, 0.75, kohina(vUv * 2.3 + 4.1) * 0.65 + kohina(vUv * 5.1 + 1.7) * 0.35);
  float albedo = mix(0.95, 0.62, meri * 0.8) * (0.85 + 0.15 * z);
  vec3 vari = vec3(0.97, 0.95, 0.9) * albedo * (valo * uKirkkaus + uMaanvalo);
  float a = kiekko * uOsuus;
  gl_FragColor = vec4(vari * a, a);
}`;

/** Neljän kärjen neliö (uv ±1 paikassa) indekseineen; luokat Globe.gl:n omasta three.js:stä (etsiLuokat). */
function nelioGeometria(luokat, kpl, taytto) {
  const g = new luokat.Geometry();
  const n = kpl * 4;
  const paikka = new Float32Array(n * 3);
  const indeksi = [];
  const kulmat = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  for (let k = 0; k < kpl; k += 1) {
    for (let c = 0; c < 4; c += 1) taytto?.(k, c, kulmat[c], paikka);
    if (!taytto) for (let c = 0; c < 4; c += 1) { paikka[(k * 4 + c) * 3] = kulmat[c][0]; paikka[(k * 4 + c) * 3 + 1] = kulmat[c][1]; }
    indeksi.push(k * 4, k * 4 + 1, k * 4 + 2, k * 4 + 1, k * 4 + 3, k * 4 + 2);
  }
  g.setAttribute('position', new luokat.Attribute(paikka, 3));
  g.setIndex(indeksi);
  return g;
}

function taivasMesh(y, { geometria, vertex, fragment, uniformit, jarjestys, sekoitus }) {
  const { luokat, pallo } = y;
  const mat = new luokat.Shader({
    uniforms: uniformit, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false, depthTest: true,
    side: 2, // molemmat puolet: kärkien kiertosuunta ruudulla riippuu kanta-akseleista
  });
  Object.assign(mat, { blending: BLEND.oma, blendSrc: BLEND.yksi, blendDst: sekoitus, blendEquation: BLEND.lisays });
  const mesh = new luokat.Mesh(geometria, mat);
  mesh.renderOrder = jarjestys;
  mesh.visible = false;
  mesh.frustumCulled = false;
  pallo.scene().add(mesh);
  return mesh;
}

export function kuu({ arvot = KUU } = {}) {
  let mesh = null; let jdEd = -Infinity; const ab = { taivas: 1 };
  return {
    nimi: 'kuu',
    ab,
    rakenna(y) {
      if (!y.luokat?.Geometry || !y.luokat?.Attribute) return;
      mesh = taivasMesh(y, {
        geometria: nelioGeometria(y.luokat, 1),
        vertex: KUU_VERTEX,
        fragment: KUU_FRAGMENT,
        uniformit: {
          uSuunta: { value: vec3(y, [0, 0, 1]) }, uKoko: { value: Math.tan((arvot.kulma / 2) * DEG) },
          uAurinko: { value: vec3(y, [1, 0, 0]) }, uKirkkaus: { value: arvot.kirkkaus }, uMaanvalo: { value: arvot.maanvalo },
          uOsuus: { value: 0 },
        },
        jarjestys: arvot.jarjestys,
        sekoitus: BLEND.yksiMiinusLahdeAlfa,
      });
    },
    paivita(y, k) {
      if (!mesh) return;
      mesh.visible = k.osuus > 0.001 && ab.taivas > 0;
      if (!mesh.visible) return;
      const u = mesh.material.uniforms;
      u.uOsuus.value = k.osuus;
      Object.assign(u.uAurinko.value, { x: k.aurinko[0], y: k.aurinko[1], z: k.aurinko[2] });
      const jd = jdHetkesta(k.ms);
      if (Math.abs(jd - jdEd) * 86400 >= 1) {
        jdEd = jd;
        const s = kuunSuunta(jd);
        const [x, yy, z] = eciPalloon([s.x, s.y, s.z], jd);
        Object.assign(u.uSuunta.value, { x, y: yy, z });
      }
    },
    pura() {
      if (!mesh) return;
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null; jdEd = -Infinity;
    },
    tila: () => ({ nakyy: Boolean(mesh?.visible), suunta: mesh ? { ...mesh.material.uniforms.uSuunta.value } : null }),
  };
}

/* ─────────────────────────── 4c TÄHDET ─────────────────────────── */

const TAHDET_VERTEX = `
attribute vec2 kulma;
attribute vec2 kokoKirkkaus;
attribute vec3 vari;
uniform vec3 uX, uY, uZ;
uniform vec2 uRuutu;
uniform float uTiheys;
varying vec2 vUv;
varying vec3 vVari;
void main() {
  vec3 d = normalize(uX * position.x + uY * position.y + uZ * position.z);
  vec4 c = projectionMatrix * vec4((viewMatrix * vec4(d, 0.0)).xyz, 1.0);
  c.xy += kulma * kokoKirkkaus.x * uTiheys * ${TAHDET.kerroin.toFixed(2)} * 2.0 / uRuutu * c.w;
  c.z = 0.999999 * c.w;
  gl_Position = c;
  vUv = kulma;
  vVari = vari * kokoKirkkaus.y;
}`;

const TAHDET_FRAGMENT = `
uniform float uPeitto, uOsuus;
varying vec2 vUv;
varying vec3 vVari;
void main() {
  float r2 = dot(vUv, vUv);
  float piste = exp(-r2 * 4.0) * clamp(1.0 - r2, 0.0, 1.0);
  gl_FragColor = vec4(vVari * piste * uPeitto * uOsuus, 0.0);
}`;

export function tahdet({ ikkuna = globalThis, lahteet = TAIVAAN_LAHTEET, arvot = TAHDET } = {}) {
  let mesh = null; let data = null; let haettu = false; let y0 = null; let jdEd = -Infinity; let varjossa = false;
  const ab = { taivas: 1, varjo: 0 };
  const rakennaMesh = () => {
    if (mesh || !data || !y0?.luokat?.Geometry || !y0?.luokat?.Attribute) return;
    const kpl = data.length;
    const kulmaT = new Float32Array(kpl * 8); const kkT = new Float32Array(kpl * 8); const variT = new Float32Array(kpl * 12);
    const geometria = nelioGeometria(y0.luokat, kpl, (k, c, kulma, paikka) => {
      const [ra, dec, mag, bv] = data[k];
      const r = ra * DEG; const d = dec * DEG;
      const i = k * 4 + c;
      paikka[i * 3] = Math.cos(d) * Math.cos(r); paikka[i * 3 + 1] = Math.cos(d) * Math.sin(r); paikka[i * 3 + 2] = Math.sin(d);
      kulmaT[i * 2] = kulma[0]; kulmaT[i * 2 + 1] = kulma[1];
      kkT[i * 2] = tahdenKoko(mag); kkT[i * 2 + 1] = tahdenKirkkaus(mag);
      const v = tahdenVari(bv);
      variT[i * 3] = v[0]; variT[i * 3 + 1] = v[1]; variT[i * 3 + 2] = v[2];
    });
    geometria.setAttribute('kulma', new y0.luokat.Attribute(kulmaT, 2));
    geometria.setAttribute('kokoKirkkaus', new y0.luokat.Attribute(kkT, 2));
    geometria.setAttribute('vari', new y0.luokat.Attribute(variT, 3));
    mesh = taivasMesh(y0, {
      geometria,
      vertex: TAHDET_VERTEX,
      fragment: TAHDET_FRAGMENT,
      uniformit: {
        uX: { value: vec3(y0, [1, 0, 0]) }, uY: { value: vec3(y0, [0, 0, 1]) }, uZ: { value: vec3(y0, [0, 1, 0]) },
        uRuutu: { value: { x: 1, y: 1 } }, uTiheys: { value: 1 }, uPeitto: { value: arvot.paivalla }, uOsuus: { value: 0 },
      },
      jarjestys: arvot.jarjestys,
      sekoitus: BLEND.yksi,
    });
  };
  const hae = () => {
    if (haettu) return;
    haettu = true;
    const f = ikkuna.fetch?.bind(ikkuna);
    if (!f) return;
    f(lahteet.tahdet).then((v) => (v.ok ? v.json() : null)).then((j) => {
      const lista = Array.isArray(j?.tahdet) ? j.tahdet.filter((r) => Array.isArray(r) && r.length >= 4) : [];
      if (lista.length) { data = lista; rakennaMesh(); }
    }).catch(() => {});
  };
  return {
    nimi: 'tahdet',
    ab,
    /** Oikeat tähdet valmiina: satunnainen tähtikenttä sammuu kyydissä (iss-realismi.js satunnaisetTahdet). */
    korvaaTahdet: () => Boolean(mesh) && ab.taivas > 0,
    rakenna(y) { y0 = y; hae(); rakennaMesh(); },
    paivita(y, k) {
      if (!mesh) return;
      mesh.visible = k.osuus > 0.001 && ab.taivas > 0;
      if (!mesh.visible) return;
      const u = mesh.material.uniforms;
      const jd = jdHetkesta(k.ms);
      if (Math.abs(jd - jdEd) * 86400 >= 1) {
        jdEd = jd;
        const kanta = eciKanta(jd);
        for (const [n, v] of [['uX', kanta.x], ['uY', kanta.y], ['uZ', kanta.z]]) Object.assign(u[n].value, { x: v[0], y: v[1], z: v[2] });
      }
      const cam = k.kamera?.position;
      varjossa = Boolean(cam) && maanVarjossa([cam.x, cam.y, cam.z], k.aurinko, y.R);
      u.uPeitto.value = varjossa || ab.varjo ? arvot.varjossa : arvot.paivalla;
      u.uOsuus.value = k.osuus;
      const kangas = y.pallo.renderer?.()?.domElement;
      const w = kangas?.width || 1; const h = kangas?.height || 1;
      Object.assign(u.uRuutu.value, { x: w, y: h });
      u.uTiheys.value = Math.max(1, Math.min(w, h) / 400);
    },
    pura() {
      if (!mesh) return;
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null; jdEd = -Infinity;
    },
    tila: () => ({ nakyy: Boolean(mesh?.visible), tahtia: data?.length ?? 0, varjossa }),
  };
}

/** Taivaan ja kuukauden kerrokset järjestyksessä (satelliitti-avaruus.js liittää realismiKerrosten perään). */
export function taivasKerrokset(asetukset = {}) {
  return [kuukaudenPinta(asetukset), tahdet(asetukset), kuu(asetukset)];
}
