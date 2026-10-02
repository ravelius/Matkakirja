/*
 * ISS-REALISMIN KERROKSET WEBISSÄ (Siirtoseppä 28.9.2026): natiivin varjostimet (Linssiseppä, proto linssiseppa/iss-kyyti
 * 411b0bc7; suunnitelma docs/raportit/iss-realismi-suunnitelma-20260928.md) three.js:n GLSL:ksi samoilla vakioilla.
 *
 *   yokuori     Yokuori.shader: yö (peitto 0,82, hämäräkaista −6° … +2°), päiväpuolen varjostus matalalla auringolla,
 *               KAUPUNKIEN VALOT (NASA Black Marble, Eurooppa Z6 + maailma Z3), AURINGON HEIJASTUS vesiltä (Beckmann +
 *               Schlick) ja vesien yöpeitto 0,96 — yksi esikerrottu kuori R × 1,012 (Blend One OneMinusSrcAlpha).
 *   ilmakaari   Ilmakaari.shader: kaari horisontin yllä (takapinnat) + usva maan päällä (etupinnat), kuori R + 120 km;
 *               HÄMÄRÄ oranssinpunaisena ja ILMAHEHKU 95 km:ssä (0,12, σ 4,5 km) yöllä.
 *   revontulet  Revontulet.shader: NOAA SWPC OVATION -todennäköisyys kuorella R + 110 km, lisäävä emissio yöpuolella.
 *
 * Webin pallo on pallo (Globe.gl), joten natiivin litistyskorjaus (a/b) on 1. Pituus ja leveys lasketaan suoraan
 * Globe.gl:n getCoords-konventiosta (x = cos φ sin λ, y = sin φ, z = cos φ cos λ): λ = atan(x, z), ei ristituloa — natiivin
 * cl4-löydös (cross(z, x) peilasi pituuden vasenkätisessä Unityssä) ei koske tätä, ja testi varmistaa suunnan.
 * Mittakaava: Globe.gl:n säde R (100) ja metri = R / 6 378 137.
 *
 * Kerros on { nimi, rakenna(y), paivita(y, k), pura() } (iss-realismi.js). Kaikki näkyvät vain kyydissä: peitto × osuus.
 */

import { pilvikuvanAlfa, PILVIEN_PEITTO, PILVIEN_KUVAN_KYNNYS } from './astro-sumu.js';

export const AMPARI = 'https://media.matkakirja.app/';
/** Natiivin datat ämpärissä (Linssiseppä/Karttaseppä 28.9.2026). */
export const LAHTEET = Object.freeze({
  valotEu: `${AMPARI}linssit/astronautin-kamera/iss-yovalot-2026-09-28/eurooppa-2048.jpg`,
  valotMaa: `${AMPARI}linssit/astronautin-kamera/iss-yovalot-2026-09-28/maailma-2048.jpg`,
  vesiEu: `${AMPARI}linssit/astronautin-kamera/iss-vesi-2026-09-28/eurooppa-2048.png`,
  vesiMaa: `${AMPARI}linssit/astronautin-kamera/iss-vesi-2026-09-28/maailma-2048.png`,
  revontulet: `${AMPARI}data/revontulet/uusin.png`,
  pilvet: `${AMPARI}data/pilvet/uusin.png`,
});
/**
 * Päivän pilvet (natiivi f81345f0 + AstronauttiKerros PilvetMatalallaM): kuori 8 km:ssä kyydin ajan, ei kiertoa (oikea
 * päivä, ei ajelehdi), alfa samalla kirkkaussäännöllä kuin astro-sumun kuva (natiivi Pilvikuva.Alfa = web pilvikuvanAlfa).
 * Kangas 4096 × 2048 (noin 10 km/px, kuten natiivi) yksikanavaisena R8-tekstuurina (8 Mt; Linssiseppä 28.9.).
 */
// Peitto 0,9 molemmissa (Päätoimittaja 28.9. klo 15.2x: web on malli, natiivi e793a2a5). Jos peitto on null, se luetaan
// käyttöhetkellä (astro-sumu.js PILVIEN_PEITTO): moduulit tuovat toisiaan syklisesti, joten vakiota ei lueta latausvaiheessa.
export const PILVET = Object.freeze({ korkeus: 8000, leveys: 4096, korkeusPx: 2048, peitto: 0.9, yo: 0.04, tarkkuusKm: 35 });

/** Natiivin Yokuori.shader-oletukset (411b0bc7; valot 60 % = 0,96, omistaja 28.9., natiivi 1e773968). */
export const YOKUORI = Object.freeze({
  sade: 1.012, peitto: 0.82, vari: [0.012, 0.02, 0.05], valot: 0.96, maaVoima: 2.2, kiilto: 6, aalto: 0.02,
  varjo: 0.55, yoVesi: 0.96,
  // Eurooppa-kuvan rajat: lon −28,125…45, Web Mercator -rivit 13/64…26/64 (0 ylhäällä).
  euRaja: [-28.125, 45, 0.203125, 0.40625],
});
/** Natiivin Ilmakaari.shader-oletukset (4e7f3b1d + d1a3f147). Korkeudet metreinä. */
export const ILMAKAARI = Object.freeze({
  korkeus: 120000, asteikko: 22000, vaaleaAsteikko: 6000, usvaMatka: 900000, yo: 0.06,
  vaalea: [0.72, 0.88, 1], syva: [0.12, 0.30, 0.86], hamara: [1, 0.42, 0.14], hehkuVari: [0.55, 0.95, 0.5],
  hehku: 0.12, hehkuKorkeus: 95000, hehkuSigma: 4500, hamaraVoima: 1,
});
/** Natiivin Revontulet.shader-oletukset (497c06b8). */
export const REVONTULET = Object.freeze({ korkeus: 110000, voima: 1.4 });
/** Piirtojärjestys (Pelikoodarin iss-kyyti-nakyma.js: pilvet 2 → yökuori 2,8 → kaari 3). */
export const JARJESTYS = Object.freeze({ pilvet: 2, yokuori: 2.8, revontulet: 2.9, kaari: 3 });

const MAAN_SADE_M = 6378137;
// three.js-vakiot numeroina (Globe.gl:n oma three; ei omaa kopiota).
export const BLEND = Object.freeze({ normaali: 1, lisaava: 2, oma: 5, yksi: 201, yksiMiinusLahdeAlfa: 205, lisays: 100 });
const PUOLI = Object.freeze({ etu: 0, taka: 1 });
const RED_FORMAT = 1028; // THREE.RedFormat (WebGL2 RED / R8)

/** Pallon pisteen (Globe.gl-koordinaatit) leveys ja pituus asteina: sama kaava kuin varjostimissa. */
export function leveysPituus([x, y, z]) {
  const r = Math.hypot(x, y, z) || 1;
  return { lat: (Math.asin(Math.max(-1, Math.min(1, y / r))) * 180) / Math.PI, lon: (Math.atan2(x, z) * 180) / Math.PI };
}

/** Web Mercator -rivi 0 (ylhäällä) … 1 (alhaalla) leveydestä, ±85,05°. */
export function mercatorRivi(latAst) {
  const f = (Math.max(-85.05, Math.min(85.05, latAst)) * Math.PI) / 180;
  return 0.5 - Math.log(Math.tan(Math.PI / 4 + f / 2)) / (2 * Math.PI);
}

const VERTEX = `
varying vec3 vMaailma;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vMaailma = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

/* ─────────────────────────── YÖKUORI ─────────────────────────── */

const YOKUORI_FRAGMENT = `
uniform float uOsuus, uPeitto, uR, uValot, uMaaVoima, uKiilto, uAalto, uVarjo, uYoVesi, uPilvetOn, uPilviPeitto, uPilviKarsinta;
uniform vec3 uVari, uAurinko;
uniform vec4 uEuRaja;
uniform sampler2D uValotEu, uValotMaa, uVesiEu, uVesiMaa, uPilvet;
varying vec3 vMaailma;
float yo(vec3 n) { return 1.0 - smoothstep(-0.105, 0.035, dot(n, uAurinko)); }
// Ilmamassa korkeuden sinistä (Kasten & Young 1989; natiivi Yokuori.Ilmamassa): 1 zeniitissä, ~10 5°:ssa, ~38 horisontissa.
float ilmamassa(float s) {
  s = clamp(s, 0.0, 1.0);
  return 1.0 / (s + 0.50572 * pow(degrees(asin(s)) + 6.07995, -1.6364));
}
void main() {
  vec3 n = normalize(vMaailma);
  float yoKuori = yo(n);
  float a = uPeitto * yoKuori;
  vec3 c = uVari * a;
  float matala = clamp(1.0 - dot(n, uAurinko) / 0.5, 0.0, 1.0);
  float varjo = uVarjo * matala * matala * (1.0 - yoKuori);
  c += vec3(0.02, 0.018, 0.016) * varjo * (1.0 - a);
  a = a + varjo * (1.0 - a);

  // Katsesäde maan pintaan (pallo, säde uR): valot ja vesi oikeassa paikassa vinostakin (kuori on 76 km pinnan yllä).
  vec3 o = cameraPosition;
  vec3 d = normalize(vMaailma - cameraPosition);
  float b = dot(o, d), h = b * b - (dot(o, o) - uR * uR);
  float t = -b - sqrt(max(h, 0.0));
  float osuu = step(0.0, h) * step(0.0, t);
  vec3 p = o + d * t;
  vec3 ng = normalize(p);
  // Globe.gl: x = cos φ sin λ, y = sin φ, z = cos φ cos λ.
  float lon = atan(ng.x, ng.z);
  float lat = clamp(asin(clamp(ng.y, -1.0, 1.0)), -1.4844, 1.4844);
  float m = 0.5 - log(tan(0.7853982 + lat * 0.5)) / 6.2831853;
  vec2 uvMaa = vec2(lon / 6.2831853 + 0.5, 1.0 - m);
  float lonAst = degrees(lon);
  vec2 eu = vec2((lonAst - uEuRaja.x) / (uEuRaja.y - uEuRaja.x), (m - uEuRaja.z) / (uEuRaja.w - uEuRaja.z));
  float euPaino = clamp(min(min(eu.x, 1.0 - eu.x), min(eu.y, 1.0 - eu.y)) / 0.03, 0.0, 1.0);
  vec2 uvEu = vec2(clamp(eu.x, 0.0, 1.0), 1.0 - clamp(eu.y, 0.0, 1.0));
  float l = mix(texture2D(uValotMaa, uvMaa).r * uMaaVoima, texture2D(uValotEu, uvEu).r, euPaino);
  float vesi = mix(texture2D(uVesiMaa, uvMaa).r, texture2D(uVesiEu, uvEu).r, euPaino);
  l = l * l * 0.6 + l * 0.4;
  // Päivän pilvet peittävät valot ja heijastuksen (natiivi 2eb8a5d0): pilvikuoren kuva, tasakulmainen, v = 0 etelässä.
  // Himmennys seuraa pilvikuoren nykyistä peittoa (natiivi e6e0ef61): pilvet pois → valot ilman himmennystä.
  // Bias −16 = tason 0 näyte kuten natiivin LOD 0: atan-sauma ±180°:ssa ei valitse pienintä mip-tasoa.
  // KARSITTU PILVI EI HIMMENNÄ YÖVALOJA (ISS-säätöpaneeli, Siirtoseppä 29.9.2026): pilvet-kerros antaa oman
  // karsintarajansa (pilvikuva-callback), ja alle rajan jäävä alfa vaimennetaan pois kapealla ±0,02 smoothstepillä.
  float pilviAlfa = texture2D(uPilvet, vec2(lon / 6.2831853 + 0.5, asin(clamp(ng.y, -1.0, 1.0)) / 3.14159265 + 0.5), -16.0).r;
  float pilviNaytto = smoothstep(uPilviKarsinta - 0.02, uPilviKarsinta + 0.02, pilviAlfa);
  float pilvi = uPilvetOn * uPilviPeitto * pilviAlfa * pilviNaytto;
  float lapi = 1.0 - 0.85 * pilvi;
  vec3 savy = mix(vec3(1.0, 0.52, 0.2), vec3(1.0, 0.88, 0.7), clamp(l * 1.6, 0.0, 1.0));
  c += savy * l * uValot * yo(ng) * osuu * lapi;

  // Auringon heijastus vesiltä: Beckmann D · Schlick F / (4 n·v).
  vec3 v = normalize(o - p);
  vec3 hv = normalize(v + uAurinko);
  float nh = clamp(dot(ng, hv), 0.0, 1.0), nl = dot(ng, uAurinko), nv = clamp(dot(ng, v), 0.0, 1.0);
  float nh2 = max(nh * nh, 1e-4);
  float D = exp(-(1.0 - nh2) / (nh2 * uAalto)) / (3.14159265 * uAalto * nh2 * nh2);
  float F = 0.02 + 0.98 * pow(1.0 - clamp(dot(v, hv), 0.0, 1.0), 5.0);
  // Ilmakehän läpäisy (kiillon pystyleikkaus, Linssiseppä 2.10.2026, Päätoimittajan OK; natiivi samassa erässä): auringon
  // ja katseen tie ilmamassoina, τ RGB 0,15 / 0,20 / 0,33. Korvaa kiinteän oranssin: matalalla auringolla kiilto himmenee
  // oranssiksi, eikä ruudun ulkopuolisen huipun sivuliepe puhkea valkoiseksi tasanteeksi.
  float kiilto = vesi * osuu * clamp(nl * 60.0, 0.0, 1.0) * min(D * F / (4.0 * max(nv, 0.08)), 40.0) * uKiilto * lapi;
  vec3 lapaisy = exp(-vec3(0.15, 0.20, 0.33) * (ilmamassa(nl) + ilmamassa(nv)));
  c += lapaisy * kiilto * (1.0 - a);
  float lisa = vesi * osuu * yoKuori * clamp(uYoVesi - a, 0.0, 1.0);
  c += uVari * lisa;
  a += lisa;
  // Yöllä pilvet yhtä tummiksi kuin vesi (natiivi d6c6bc45: valkoiset pilvet jäivät 0,82-peiton läpi maitomaisen harmaiksi).
  float lisaPilvi = pilvi * osuu * yoKuori * clamp(uYoVesi - a, 0.0, 1.0);
  c += uVari * lisaPilvi;
  a += lisaPilvi;
  gl_FragColor = vec4(c, a) * uOsuus;
}`;

/* ─────────────────────────── ILMAKAARI ─────────────────────────── */

const ILMAKAARI_YHTEINEN = `
uniform float uOsuus, uR, uKorkeus, uAsteikko, uVaaleaAsteikko, uUsvaMatka, uYo, uHehku, uHehkuKorkeus, uHehkuSigma, uHamaraVoima, uMetri;
uniform vec3 uVaalea, uSyva, uHamara, uHehkuVari, uAurinko;
varying vec3 vMaailma;
float aurinko(vec3 n) { return mix(uYo, 1.0, smoothstep(-0.105, 0.07, dot(n, uAurinko))); }`;

const KAARI_FRAGMENT = `${ILMAKAARI_YHTEINEN}
void main() {
  vec3 o = cameraPosition;
  vec3 d = normalize(vMaailma - cameraPosition);
  float t = -dot(o, d);
  vec3 p = t > 0.0 ? o + d * t : o;
  float h = length(p) - uR;
  if (t <= 0.0 || h < 0.0) discard;
  vec3 n = normalize(p);
  float a = exp(-h / uAsteikko);
  vec3 vari = mix(uSyva, uVaalea, exp(-h / uVaaleaAsteikko));
  float s = dot(n, uAurinko);
  float hamara = exp(-(s * s) / (0.075 * 0.075)) * exp(-h / (9000.0 * uMetri)) * uHamaraVoima;
  vari = mix(vari, uHamara, clamp(hamara * 1.4, 0.0, 1.0));
  a *= max(aurinko(n), hamara * 0.8);
  float yoS = 1.0 - smoothstep(-0.105, 0.0, s);
  float dh = h - uHehkuKorkeus;
  float hehku = exp(-(dh * dh) / (uHehkuSigma * uHehkuSigma)) * uHehku * yoS;
  a = clamp(a * 1.15, 0.0, 1.0);
  float yht = a + hehku - a * hehku;
  vari = (vari * a + uHehkuVari * hehku) / max(a + hehku, 1e-3);
  gl_FragColor = vec4(vari, yht * uOsuus);
}`;

const USVA_FRAGMENT = `${ILMAKAARI_YHTEINEN}
void main() {
  vec3 o = cameraPosition;
  vec3 d = normalize(vMaailma - cameraPosition);
  float t = -dot(o, d);
  vec3 p = t > 0.0 ? o + d * t : o;
  float h = length(p) - uR;
  if (t <= 0.0 || h >= 0.0) discard;
  float r2 = dot(o, o) - t * t;
  float maahan = t - sqrt(max(0.0, uR * uR - r2));
  float rk = uR + uKorkeus;
  float kuoreen = t - sqrt(max(0.0, rk * rk - r2));
  float matka = max(0.0, maahan - max(0.0, kuoreen));
  float a = 0.42 * (1.0 - exp(-matka / uUsvaMatka));
  a *= aurinko(normalize(o + d * maahan));
  gl_FragColor = vec4(uVaalea, a * uOsuus);
}`;

/* ─────────────────────────── REVONTULET ─────────────────────────── */

const REVONTULET_FRAGMENT = `
uniform float uOsuus, uVoima, uAika;
uniform vec3 uAurinko;
uniform sampler2D uTodennakoisyys;
varying vec3 vMaailma;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float kohina(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}
void main() {
  vec3 n = normalize(vMaailma);
  float yo = 1.0 - smoothstep(-0.26, -0.18, dot(n, uAurinko));
  float latAst = degrees(asin(clamp(n.y, -1.0, 1.0)));
  float lonAst = degrees(atan(n.x, n.z));
  // OVATION: sarake 0 = pituus 0° itään, rivi 0 = leveys 90° (flipY: v = 1 ylhäällä).
  vec2 uv = vec2(fract((lonAst + 360.0) / 360.0 + 0.5 / 360.0), (latAst + 90.0) / 181.0 + 0.5 / 181.0);
  float p = texture2D(uTodennakoisyys, uv).r;
  float nopeus = 0.6 + 0.4 * sin(uAika * 0.05);
  float verho = kohina(vec2(lonAst * 0.9 + uAika * 0.8 * nopeus, latAst * 0.25)) * 0.7
              + kohina(vec2(lonAst * 2.3 - uAika * 0.5, latAst * 0.6 + 3.1)) * 0.3;
  float voima = p * p * (0.45 + 0.9 * verho) * yo * uVoima;
  vec3 vari = mix(vec3(0.25, 1.0, 0.45), vec3(1.0, 0.3, 0.35), clamp((verho - 0.65) * 2.0, 0.0, 1.0) * 0.35);
  gl_FragColor = vec4(vari * voima * uOsuus, 0.0);
}`;

/* ─────────────────────────── PILVET ─────────────────────────── */

// Auringon valaisemat pilvet (Päätoimittaja 28.9.2026, natiivin cl5-kuvien ja astronauttikuvien mukaan): yöpuolella
// tummat, hämärässä valaistu vain terminaattorin lähellä. Sama terminaattori kuin yökuoressa (−0,105…0,035), yöllä
// PILVET.yo × kirkkaus; alfa ennallaan, joten tumma pilvi peittää pinnan kuten natiivissa.
//
// TERÄVÄT PILVET KYYDISSÄ (2b, Päätoimittaja 28.9. klo 20.0x; natiivi linssiseppa/pilvet-tarkat cc513896 Pilvet.shader,
// suunnitelma iss-realismi-suunnitelma-20260928.md 2b): pilvikuva on noin 10–20 km/px, ja Cupolasta tekseli venyi
// kymmeniksi pikseleiksi. Bikuubinen B-splini (Ruijters 2008, neljä bilineaarista näytettä gradienteilla; saumassa pienempi
// u-derivaatta), reuna 5 oktaavin 3D-simplex-kohinan kynnyksellä (pohja uTarkkuusKm, taajuus × 2,2, amplitudi × 0,5,
// alle kahden pikselin oktaavit häipyvät), t = 0,5 + 0,36 tanh(0,8 f), smoothstep ±0,08, sekoitus näkyvän osuuden mukaan
// ja kirkkaus × (1 + 0,05 · kahden alimman oktaavin vaihtelu). Kokonaislukuhajautus (WebGL2), ei sin-hashia.
const PILVET_FRAGMENT = `
uniform float uOsuus, uPeitto, uYo, uTarkkuus, uTarkkuusKm, uKynnys, uKarsinta;
uniform vec3 uAurinko;
uniform vec4 uTekseli;
uniform sampler2D uKuva;
varying vec3 vMaailma;

// PILVIPEITON KARSINTA (ISS-säätöpaneeli, Siirtoseppä 29.9.2026): pilvimäärä-liuku 0…1 (oletus 1 = nyt) asettaa
// uKarsinta = 1 − pilvimäärä. Näyte alle karsintarajan häviää heti näytteen jälkeen, kapealla ±0,02 smoothstepillä
// ettei reuna sahaa; oletus 0 = ei karsintaa.
float karsi(float a0) { return a0 * smoothstep(uKarsinta - 0.02, uKarsinta + 0.02, a0); }

uint hajautus(ivec3 k) {
  uint h = (uint(k.x) * 0x8da6b343u) ^ (uint(k.y) * 0xd8163841u) ^ (uint(k.z) * 0xcb1ab31fu);
  h ^= h >> 16; h *= 0x7feb352du; h ^= h >> 15; h *= 0x846ca68bu; h ^= h >> 16;
  return h;
}
vec3 gradientti(ivec3 k) {
  uint h = hajautus(k);
  return vec3(float(h & 1023u), float((h >> 10) & 1023u), float((h >> 20) & 1023u)) * (2.0 / 1023.0) - 1.0;
}
float simplex(vec3 p) {
  const float G3 = 1.0 / 6.0;
  vec3 s = floor(p + (p.x + p.y + p.z) * (1.0 / 3.0));
  vec3 x0 = p - s + (s.x + s.y + s.z) * G3;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g, l.zxy), i2 = max(g, l.zxy);
  vec3 x1 = x0 - i1 + G3, x2 = x0 - i2 + 2.0 * G3, x3 = x0 - 1.0 + 3.0 * G3;
  ivec3 k = ivec3(s);
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m *= m; m *= m;
  vec4 d = vec4(dot(gradientti(k), x0), dot(gradientti(k + ivec3(i1)), x1),
                dot(gradientti(k + ivec3(i2)), x2), dot(gradientti(k + 1), x3));
  return 42.0 * dot(m, d);
}

float tarkatPilvet(vec3 n, vec2 uv, out float vaihtelu) {
  vec2 dx = dFdx(uv), dy = dFdy(uv);
  float u2 = fract(uv.x + 0.5);
  float u2x = dFdx(u2), u2y = dFdy(u2);
  dx.x = abs(u2x) < abs(dx.x) ? u2x : dx.x;
  dy.x = abs(u2y) < abs(dy.x) ? u2y : dy.x;
  vec3 q = n * (6371.0 / max(uTarkkuusKm, 1.0));
  float jalki = max(length(dFdx(q)), length(dFdy(q)));

  vec2 st = uv * uTekseli.zw - 0.5;
  vec2 ix = floor(st), f = st - ix, o = 1.0 - f;
  vec2 w0 = o * o * o / 6.0, w1 = 2.0 / 3.0 - 0.5 * f * f * (2.0 - f);
  vec2 w2 = 2.0 / 3.0 - 0.5 * o * o * (2.0 - o), w3 = f * f * f / 6.0;
  vec2 g0 = w0 + w1, g1 = w2 + w3;
  vec2 t0 = (ix - 0.5 + w1 / g0) * uTekseli.xy, t1 = (ix + 1.5 + w3 / g1) * uTekseli.xy;
  vec4 c = g0.y * (g0.x * textureGrad(uKuva, vec2(t0.x, t0.y), dx, dy) + g1.x * textureGrad(uKuva, vec2(t1.x, t0.y), dx, dy))
         + g1.y * (g0.x * textureGrad(uKuva, vec2(t0.x, t1.y), dx, dy) + g1.x * textureGrad(uKuva, vec2(t1.x, t1.y), dx, dy));
  float a0 = karsi(clamp(c.r, 0.0, 1.0));

  float h[5];
  float kaikki = 0.0, nakyva = 0.0, amp = 1.0, taaj = 1.0;
  for (int k = 0; k < 5; k++) {
    h[k] = clamp(1.5 - 2.0 * jalki * taaj, 0.0, 1.0);
    kaikki += amp * amp; nakyva += amp * amp * h[k] * h[k];
    amp *= 0.5; taaj *= 2.2;
  }
  float nak = sqrt(nakyva / kaikki) * uTarkkuus;
  vaihtelu = 0.0;
  float aTarkka = 0.0;
  if (a0 > 0.06) {
    float summa = 0.0, ala = 0.0;
    amp = 1.0; taaj = 1.0;
    for (int j = 0; j < 5; j++) {
      summa += amp * h[j] * simplex(q * taaj + float(j) * 31.7);
      if (j == 1) ala = summa;
      amp *= 0.5; taaj *= 2.2;
    }
    const float Sigma = 0.39;
    float fn = summa * inversesqrt(max(nakyva, 1e-4)) / Sigma;
    float t = 0.5 + 0.36 * tanh(0.8 * fn);
    aTarkka = smoothstep(t - 0.08, t + 0.08, a0);
    vaihtelu = 0.05 * clamp(ala / Sigma, -2.5, 2.5) * nak;
  }
  return mix(a0, aTarkka, nak);
}

void main() {
  vec3 n = normalize(vMaailma);
  vec2 uv = vec2(atan(n.x, n.z) / 6.2831853 + 0.5, asin(clamp(n.y, -1.0, 1.0)) / 3.14159265 + 0.5);
  float vaihtelu = 0.0;
  float a = uTarkkuus > 0.0 ? tarkatPilvet(n, uv, vaihtelu) : karsi(texture2D(uKuva, uv).r);
  // Yksikanavainen kuva (R = alfa): sävy natiivin Pilvikuva.Alfan kaavalla 226 + 29 · lum, lum alfasta takaisin.
  float lum = uKynnys + (1.0 - uKynnys) * pow(a, 1.0 / 0.85);
  float savy = (226.0 + 29.0 * lum) / 255.0;
  vec4 c = vec4(savy, savy, min(1.0, savy + 6.0 / 255.0), a);
  c.rgb *= 1.0 + vaihtelu;
  float valo = mix(uYo, 1.0, smoothstep(-0.105, 0.035, dot(n, uAurinko)));
  gl_FragColor = vec4(c.rgb * valo, c.a * uPeitto * uOsuus);
}`;

/* ─────────────────────────── yhteiset ─────────────────────────── */

/** Globe.gl:n oma Texture-luokka näyttämöstä (pallon tai pilvikalvon kartta); null, jos ei vielä ole. */
export function tekstuuriLuokka(pallo) {
  let T = null;
  pallo?.scene?.()?.traverse?.((o) => {
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (!T && m?.map?.isTexture) T = m.map.constructor;
  });
  return T;
}

function lataaTekstuuri(T, osoite, ikkuna) {
  return new Promise((ok) => {
    const img = new ikkuna.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { const t = new T(img); t.needsUpdate = true; ok(t); };
    img.onerror = () => ok(null);
    img.src = osoite;
  });
}

// three.js lukee vec3/vec4-uniformin kentistä x, y, z (w): tavallinen olio riittää, ei omaa Vector-luokkaa.
export function vec3(y, [a, b, c]) { return { x: a, y: b, z: c }; }

export function kuori(y, { sade, fragment, uniformit, jarjestys, puoli = PUOLI.etu, sekoitus = 'normaali' }) {
  const { luokat, pallo, R } = y;
  const mat = new luokat.Shader({
    uniforms: uniformit, vertexShader: VERTEX, fragmentShader: fragment,
    transparent: true, depthWrite: false, depthTest: true, side: puoli,
  });
  if (sekoitus === 'esikerrottu') {
    Object.assign(mat, { blending: BLEND.oma, blendSrc: BLEND.yksi, blendDst: BLEND.yksiMiinusLahdeAlfa, blendEquation: BLEND.lisays });
  } else if (sekoitus === 'lisaava') mat.blending = BLEND.lisaava;
  const mesh = new luokat.Mesh(new luokat.Sphere(R * sade, 128, 96), mat);
  mesh.renderOrder = jarjestys;
  mesh.visible = false;
  mesh.frustumCulled = false;
  pallo.scene().add(mesh);
  return mesh;
}

const aurinkoUniform = (mat, [x, y, z]) => Object.assign(mat.uniforms.uAurinko.value, { x, y, z });

/**
 * Yökuori: yö, varjostus, kaupunkien valot, kiilto, vesien yöpeitto. Tekstuurit ladataan rakennettaessa; kuori piirtyy
 * vasta, kun ne ovat valmiit (siihen asti ei mitään, ei mustaa kuorta).
 */
export function yokuori({
  ikkuna = globalThis, lahteet = LAHTEET, arvot = YOKUORI, jarjestys = JARJESTYS.yokuori, pilvikuva = null,
} = {}) {
  let mesh = null; let valmis = false; const ab = { valot: 1, kiilto: 1, varjo: 1 };
  return {
    nimi: 'yokuori',
    ab,
    rakenna(y) {
      const u = {
        uOsuus: { value: 0 }, uPeitto: { value: arvot.peitto }, uR: { value: y.R }, uValot: { value: arvot.valot },
        uMaaVoima: { value: arvot.maaVoima }, uKiilto: { value: arvot.kiilto }, uAalto: { value: arvot.aalto },
        uVarjo: { value: arvot.varjo }, uYoVesi: { value: arvot.yoVesi }, uVari: { value: vec3(y, arvot.vari) },
        uAurinko: { value: vec3(y, [1, 0, 0]) }, uEuRaja: { value: null },
        uValotEu: { value: null }, uValotMaa: { value: null }, uVesiEu: { value: null }, uVesiMaa: { value: null },
        uPilvet: { value: null }, uPilvetOn: { value: 0 }, uPilviPeitto: { value: 0 }, uPilviKarsinta: { value: 0 },
      };
      const [a, b, c, d] = arvot.euRaja;
      u.uEuRaja.value = { x: a, y: b, z: c, w: d };
      mesh = kuori(y, { sade: arvot.sade, fragment: YOKUORI_FRAGMENT, uniformit: u, jarjestys, sekoitus: 'esikerrottu' });
      const T = tekstuuriLuokka(y.pallo);
      if (!T) return;
      void Promise.all(['valotEu', 'valotMaa', 'vesiEu', 'vesiMaa'].map((k) => lataaTekstuuri(T, lahteet[k], ikkuna)))
        .then(([ve, vm, we, wm]) => {
          if (!mesh) return;
          u.uValotEu.value = ve; u.uValotMaa.value = vm; u.uVesiEu.value = we; u.uVesiMaa.value = wm;
          valmis = Boolean(ve && vm && we && wm);
        });
    },
    paivita(y, k) {
      if (!mesh) return;
      mesh.visible = valmis && k.osuus > 0.001;
      if (!mesh.visible) return;
      const u = mesh.material.uniforms;
      u.uOsuus.value = k.osuus;
      u.uValot.value = arvot.valot * ab.valot;
      u.uKiilto.value = arvot.kiilto * ab.kiilto;
      u.uVarjo.value = arvot.varjo * ab.varjo;
      // Pilvikuoren kuva (pilvet-kerros): peittää valot ja heijastuksen vain, kun pilvet näkyvät.
      const pk = pilvikuva?.();
      u.uPilvet.value = pk?.kuva ?? null;
      u.uPilvetOn.value = pk ? 1 : 0;
      u.uPilviPeitto.value = pk?.peitto ?? 0;
      u.uPilviKarsinta.value = pk?.karsinta ?? 0;
      aurinkoUniform(mesh.material, k.aurinko);
    },
    pura() {
      if (!mesh) return;
      const u = mesh.material.uniforms;
      for (const k of ['uValotEu', 'uValotMaa', 'uVesiEu', 'uVesiMaa']) u[k].value?.dispose?.();
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null; valmis = false;
    },
    tila: () => ({ valmis, nakyy: Boolean(mesh?.visible) }),
  };
}

/** Ilmakaari: kaari (takapinnat) ja usva (etupinnat) samaan kuoreen R + 120 km, hämärä ja ilmahehku. */
export function ilmakaari({ arvot = ILMAKAARI, jarjestys = JARJESTYS.kaari } = {}) {
  const meshit = []; const ab = { hehku: 1 };
  return {
    nimi: 'ilmakaari',
    ab,
    rakenna(y) {
      const m = y.metri ?? y.R / MAAN_SADE_M;
      const yhteiset = () => ({
        uOsuus: { value: 0 }, uR: { value: y.R }, uKorkeus: { value: arvot.korkeus * m }, uAsteikko: { value: arvot.asteikko * m },
        uVaaleaAsteikko: { value: arvot.vaaleaAsteikko * m }, uUsvaMatka: { value: arvot.usvaMatka * m }, uYo: { value: arvot.yo },
        uHehku: { value: arvot.hehku }, uHehkuKorkeus: { value: arvot.hehkuKorkeus * m }, uHehkuSigma: { value: arvot.hehkuSigma * m },
        uHamaraVoima: { value: arvot.hamaraVoima }, uMetri: { value: m },
        uVaalea: { value: vec3(y, arvot.vaalea) }, uSyva: { value: vec3(y, arvot.syva) }, uHamara: { value: vec3(y, arvot.hamara) },
        uHehkuVari: { value: vec3(y, arvot.hehkuVari) }, uAurinko: { value: vec3(y, [1, 0, 0]) },
      });
      const sade = 1 + arvot.korkeus / MAAN_SADE_M;
      meshit.push(kuori(y, { sade, fragment: KAARI_FRAGMENT, uniformit: yhteiset(), jarjestys, puoli: PUOLI.taka }));
      meshit.push(kuori(y, { sade, fragment: USVA_FRAGMENT, uniformit: yhteiset(), jarjestys, puoli: PUOLI.etu }));
    },
    paivita(y, k) {
      for (const mesh of meshit) {
        mesh.visible = k.osuus > 0.001;
        if (!mesh.visible) continue;
        const u = mesh.material.uniforms;
        u.uOsuus.value = k.osuus;
        u.uHehku.value = arvot.hehku * ab.hehku;
        u.uHamaraVoima.value = arvot.hamaraVoima * ab.hehku;
        aurinkoUniform(mesh.material, k.aurinko);
      }
    },
    pura() {
      for (const mesh of meshit) { mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); }
      meshit.length = 0;
    },
    tila: () => ({ nakyy: meshit.some((m) => m.visible) }),
  };
}

/** Revontulet: OVATION-todennäköisyys (päivitetään kerran tunnissa sivun ollessa auki). */
export const REVONTULTEN_PAIVITYS_MS = 60 * 60 * 1000;
export function revontulet({ ikkuna = globalThis, lahde = LAHTEET.revontulet, arvot = REVONTULET, jarjestys = JARJESTYS.revontulet } = {}) {
  let mesh = null; let valmis = false; let haettu = -Infinity; let T = null; const ab = { voima: 1 };
  const hae = () => {
    if (!T || !mesh) return;
    haettu = ikkuna.performance?.now?.() ?? Date.now();
    void lataaTekstuuri(T, `${lahde}?t=${Math.floor(Date.now() / REVONTULTEN_PAIVITYS_MS)}`, ikkuna).then((t) => {
      if (!mesh || !t) return;
      mesh.material.uniforms.uTodennakoisyys.value?.dispose?.();
      mesh.material.uniforms.uTodennakoisyys.value = t;
      valmis = true;
    });
  };
  return {
    nimi: 'revontulet',
    ab,
    rakenna(y) {
      const u = { uOsuus: { value: 0 }, uVoima: { value: arvot.voima }, uAika: { value: 0 }, uAurinko: { value: vec3(y, [1, 0, 0]) },
        uTodennakoisyys: { value: null } };
      mesh = kuori(y, { sade: 1 + arvot.korkeus / MAAN_SADE_M, fragment: REVONTULET_FRAGMENT, uniformit: u, jarjestys, sekoitus: 'lisaava' });
      T = tekstuuriLuokka(y.pallo);
      hae();
    },
    paivita(y, k) {
      if (!mesh) return;
      if (!T) { T = tekstuuriLuokka(y.pallo); if (T) hae(); }
      if ((ikkuna.performance?.now?.() ?? Date.now()) - haettu > REVONTULTEN_PAIVITYS_MS) hae();
      mesh.visible = valmis && k.osuus > 0.001;
      if (!mesh.visible) return;
      const u = mesh.material.uniforms;
      u.uOsuus.value = k.osuus;
      u.uVoima.value = arvot.voima * ab.voima;
      u.uAika.value = (ikkuna.performance?.now?.() ?? 0) / 1000;
      aurinkoUniform(mesh.material, k.aurinko);
    },
    pura() {
      if (!mesh) return;
      mesh.material.uniforms.uTodennakoisyys.value?.dispose?.();
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null; valmis = false;
    },
    tila: () => ({ valmis, nakyy: Boolean(mesh?.visible) }),
  };
}

/** Päivän pilvet: data/pilvet/uusin.png → kangas (pilvikuvanAlfa) → kuori 8 km:ssä kyydin ajan. */
export function pilvet({ ikkuna = globalThis, lahde = LAHTEET.pilvet, arvot = PILVET, jarjestys = JARJESTYS.pilvet } = {}) {
  let mesh = null; let valmis = false; let T = null; let haettu = false;
  /*
   * A/B: pilvet 0|1, tarkat 0|1, tarkkuusKm = kohinan pohja-aallonpituus (natiivi `astro kyyti tarkat 0|1|<km>`).
   * maara = ISS-säätöpaneelin "Pilvipeitto"-liuku (Siirtoseppä 29.9.2026, omistajan asettelumuutos): 0…1, oletus
   * 0 = pilvet pois (omistaja 30.9.2026 ilta: "pilvet saisivat olla pois oletuksena, tosin saattaa muuttua sitten kun tulee
   * niitä visuaalisia parannuksia"; natiivi AstronauttiKerros.PilvienOletus 0), 1 = nyt (ei karsintaa). Karsinta = 1 − maara
   * asetetaan uKarsinta-uniformiin joka kehys (paivita).
   */
  const ab = { pilvet: 1, tarkat: 1, tarkkuusKm: arvot.tarkkuusKm, maara: 0 };
  const hae = () => {
    if (haettu || !T || !mesh) return;
    haettu = true;
    const doc = ikkuna.document;
    const img = new ikkuna.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!mesh) return;
      const kangas = doc.createElement('canvas');
      kangas.width = arvot.leveys; kangas.height = arvot.korkeusPx;
      const ctx = kangas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, arvot.leveys, arvot.korkeusPx);
      const kuva = ctx.getImageData(0, 0, arvot.leveys, arvot.korkeusPx);
      pilvikuvanAlfa(kuva.data, arvot.leveys, arvot.korkeusPx);
      // Yksikanavainen (Linssiseppä 28.9.): alfa R-kanavaan ja peittävä A, jotta kankaan esikerronta ei hävitä arvoja;
      // tekstuuri R8 (RedFormat), 4096 × 2048 = 8 Mt GPU:lla kuten ennen 2048 RGBA. Sävy varjostimessa.
      const d = kuva.data;
      for (let i = 0; i < d.length; i += 4) { d[i] = d[i + 3]; d[i + 1] = 0; d[i + 2] = 0; d[i + 3] = 255; }
      ctx.putImageData(kuva, 0, 0);
      const t = new T(kangas); t.format = RED_FORMAT; t.needsUpdate = true;
      // Lähetyksen jälkeen kangas (32 Mt RGBA) pois muistista.
      t.onUpdate = () => { kangas.width = 1; kangas.height = 1; };
      mesh.material.uniforms.uKuva.value = t;
      valmis = true;
    };
    img.src = lahde;
  };
  return {
    nimi: 'pilvet',
    ab,
    rakenna(y) {
      const u = { uOsuus: { value: 0 }, uPeitto: { value: arvot.peitto ?? PILVIEN_PEITTO }, uKuva: { value: null },
        uYo: { value: arvot.yo ?? 0.04 }, uAurinko: { value: vec3(y, [1, 0, 0]) },
        uTarkkuus: { value: 1 }, uTarkkuusKm: { value: arvot.tarkkuusKm }, uKynnys: { value: PILVIEN_KUVAN_KYNNYS },
        uKarsinta: { value: 0 },
        uTekseli: { value: { x: 1 / arvot.leveys, y: 1 / arvot.korkeusPx, z: arvot.leveys, w: arvot.korkeusPx } } };
      mesh = kuori(y, { sade: 1 + arvot.korkeus / MAAN_SADE_M, fragment: PILVET_FRAGMENT, uniformit: u, jarjestys });
      T = tekstuuriLuokka(y.pallo);
      hae();
    },
    paivita(y, k) {
      if (!mesh) return;
      if (!T) { T = tekstuuriLuokka(y.pallo); hae(); }
      mesh.visible = valmis && k.osuus > 0.001 && ab.pilvet > 0;
      if (!mesh.visible) return;
      mesh.material.uniforms.uOsuus.value = k.osuus;
      mesh.material.uniforms.uTarkkuus.value = ab.tarkat > 0 ? 1 : 0;
      mesh.material.uniforms.uTarkkuusKm.value = ab.tarkkuusKm;
      mesh.material.uniforms.uKarsinta.value = Math.max(0, Math.min(1, 1 - ab.maara));
      aurinkoUniform(mesh.material, k.aurinko);
    },
    pura() {
      if (!mesh) return;
      mesh.material.uniforms.uKuva.value?.dispose?.();
      mesh.parent?.remove(mesh); mesh.geometry.dispose?.(); mesh.material.dispose?.(); mesh = null; valmis = false; haettu = false;
    },
    tila: () => ({ valmis, nakyy: Boolean(mesh?.visible) }),
    /**
     * Pilvikuva, nykyinen peitto (peitto × osuus) ja karsinta muille kerroksille (yökuori), kun pilvet näkyvät;
     * muuten null. Karsittu pilvi ei saa himmentää yövaloja (YOKUORI_FRAGMENT uPilviKarsinta).
     */
    kuva: () => {
      if (!mesh?.visible) return null;
      const u = mesh.material.uniforms;
      return { kuva: u.uKuva.value, peitto: u.uPeitto.value * u.uOsuus.value, karsinta: u.uKarsinta.value };
    },
  };
}

/** Kaikki natiivin kerrokset järjestyksessä: luoIssRealismi({ kerrokset: realismiKerrokset() }). */
export function realismiKerrokset(asetukset = {}) {
  const p = pilvet(asetukset);
  return [p, yokuori({ ...asetukset, pilvikuva: p.kuva }), revontulet(asetukset), ilmakaari(asetukset)];
}

/** Tunnisteet varjostimista testejä varten (ei käännetä Nodessa). */
export const VARJOSTIMET = Object.freeze({ VERTEX, YOKUORI_FRAGMENT, KAARI_FRAGMENT, USVA_FRAGMENT, REVONTULET_FRAGMENT, PILVET_FRAGMENT });
