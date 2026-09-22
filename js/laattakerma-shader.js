/*
 * KERMA LAATAN SHADERISSA — ei kangasta, ei getImageDataa (Pelikoodari
 * 22.9.2026, Fable hyväksyi: "kerma, sumu ja kohdemaan reikä laatan
 * materiaalin fragment-shaderissa maskitekstuurilla").
 *
 * MIKSI. Kehysprofiili (js/pallolauta/kehysprofiili.js) näytti Ranska
 * z6 zoomin pitkistä kehyksistä pääsäikeen suurimmaksi eräksi laatan
 * valmistelun: kangas, kerman pikselisilmukka ja getImageData (~5 ms/
 * laatta Macilla, enemmän iPhonella). Omistajan iPhone 22.9.: panoroidessa
 * laatat näkyivät hetken ilman huntua ja kerma tuli jälkikäteen.
 *
 * MITÄ. Sama sääntö kuin js/pallolaatat.js maalaaKermaMaamaskilla, mutta
 * fragmentissa:
 *   ero     = (R − B) × 255 laatan omasta texelistä (sRGB-arvoista kuten
 *             kankaalla) — maa vs. meri, meri jää pohjan väriin
 *   t       = smoothstep(TASOITUS_MERI_ERO, TASOITUS_MAA_ERO, ero)
 *   ulkona  = 1 − maski.r   (kohdemaan renkaiden ulkopuoli)
 *   sisalla = maski.g       (renkaiden sisus miinus löytämisen sumun aukot)
 *   a       = t × (peitto × ulkona + sumuPeitto × sisalla)
 *   väri    = mix(texel, kerma, a)
 * Maski on YKSI pieni tekstuuri lauta-koordinaateissa (renkaiden
 * laatikko + marginaali, pisin sivu MASKIN_SIVU px), joka rasteroidaan
 * kerran maanvaihdossa tai sumun muuttuessa (luoKermaMaski) — ei laattaa
 * kohti. Laatan uniformit kertovat sen lauta-laatikon; maskin ulkopuolella
 * (reunatexelit 0) kerma on täysi. Maskin bilineaarinen suodatus antaa
 * reunalle pehmeyden (~1 maskitexeli).
 *
 * SEURAUS: laattaa ei koskaan näy ilman kermaa (kerma on materiaalissa),
 * maanvaihto ja sumun muutos eivät pura laattoja (vain maski vaihtuu),
 * ja rantaviiva on täsmälleen laatan oma pikseliraja — ei polygoneja.
 *
 * Pallon laatat ovat MeshLambertMaterial-olioita (kirjaston laattamoottori),
 * joten kerma ujutetaan `onBeforeCompile`lla map_fragment-lohkon tilalle;
 * `customProgramCacheKey` pitää kaikki laatat samassa ohjelmassa.
 */

/** Sama kynnys kuin pallolaatat.js TASOITUS_MERI_ERO / TASOITUS_MAA_ERO. */
export const KERMA_MERI_ERO = 36;
export const KERMA_MAA_ERO = 52;
/** Maskin pisin sivu pikseleinä (Safari: ≤ 4096²). */
export const KERMA_MASKIN_SIVU = 2048;
/** Marginaali renkaiden laatikon ympärille (osuus laatikosta) — reunatexelit jäävät nolliksi. */
export const KERMA_MASKIN_MARGINAALI = 0.05;

const KERMA_GLSL_UNIFORMIT = `
uniform sampler2D kermaMaski;
uniform vec4 kermaMaskiAlue;   // lauta: x0, y0, w, h
uniform vec4 kermaLaattaAlue;  // lauta: x0, y0, w, h (tämä laatta; vain laattakerros)
uniform vec3 kermaVari;        // sRGB 0…1
uniform float kermaPeitto;
uniform float kermaSumuPeitto;
uniform float kermaPaalla;     // 1 = kerma, 0 = ei (linssin tyhjä arkki)
uniform float kermaKaytossa;   // jaettu: 0 = ei tasoitusta / maailmanäkymä
`;

/*
 * POHJAPALLON LAATAT (vaihe 2): kirjaston laattamoottorin pallonkappaleet
 * eivät tiedä lauta-koordinaattejaan, joten ne lasketaan kärjestä:
 * mesh-avaruuden piste pallon pinnalla → lat/lon (three-globe:
 * x = r sinφ cosθ, y = r cosφ, z = r sinφ sinθ, φ = 90°−lat, θ = 90°−lng)
 * → laudan Miller-projektio (js/fokusmitat.js teeProjektionKaavat:
 * x = ((lon − lon0) mod 360)·skaala, y = (millerY(lat) − yPohjoinen)·skaala).
 */
const KERMA_GLSL_VERTEX_UNIFORMIT = `
uniform vec4 kermaLauta;       // lon0 (aste), skaala (yks/rad), yPohjoinen, pallon säde
varying vec2 vKermaLauta;
`;
const KERMA_GLSL_VERTEX = `
#include <begin_vertex>
{
  vec3 kermaP = position / kermaLauta.w;
  float kermaLat = asin(clamp(kermaP.y, -1.0, 1.0));
  float kermaLon = radians(90.0) - atan(kermaP.z, kermaP.x);
  float kermaD = kermaLon - radians(kermaLauta.x);
  kermaD = mod(mod(kermaD, 6.2831853) + 6.2831853, 6.2831853);
  float kermaMy = -1.25 * log(tan(0.7853982 + 0.4 * kermaLat));
  vKermaLauta = vec2(kermaD * kermaLauta.y, (kermaMy - kermaLauta.z) * kermaLauta.y);
}
`;

/** map_fragment-lohkon korvaaja; UV-nimi täydennetään ajossa (vMapUv tai vUv). */
const KERMA_GLSL_RUNKO = `
#ifdef USE_MAP
  vec4 kermaTexel = texture2D( map, KERMA_UV );
  if (kermaPaalla * kermaKaytossa > 0.5) {
    vec2 kermaLaudalla = KERMA_LAUDALLA;
    vec2 kermaMaskiUv = (kermaLaudalla - kermaMaskiAlue.xy) / kermaMaskiAlue.zw;
    vec4 kermaM = texture2D( kermaMaski, vec2(kermaMaskiUv.x, 1.0 - kermaMaskiUv.y) );
    // Kankaan sääntö luki sRGB-tavuja: texel on lineaarinen, joten sama ero lasketaan sRGB:ssä.
    vec3 kermaSrgb = mix(kermaTexel.rgb * 12.92, 1.055 * pow(kermaTexel.rgb, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, kermaTexel.rgb));
    float kermaEro = (kermaSrgb.r - kermaSrgb.b) * 255.0;
    float kermaT = smoothstep(KERMA_MERI, KERMA_MAA, kermaEro);
    float kermaA = kermaT * (kermaPeitto * (1.0 - kermaM.r) + kermaSumuPeitto * kermaM.g);
    kermaSrgb = mix(kermaSrgb, kermaVari, clamp(kermaA, 0.0, 1.0));
    kermaTexel.rgb = mix(kermaSrgb / 12.92, pow((kermaSrgb + 0.055) / 1.055, vec3(2.4)), step(0.04045, kermaSrgb));
  }
  diffuseColor *= kermaTexel;
#endif
`;

/**
 * Jaetut uniformit: yksi olio kaikille laatoille (three.js lukee
 * `{ value }`-olion arvon piirrossa, joten päivitys näkyy heti joka
 * laatassa ilman materiaalien läpikäyntiä).
 */
export function luoKermanJaetut({ lon0 = -175, leveys = 12000, pohjoinen = 76, sade = 100 } = {}) {
  const skaala = leveys / (2 * Math.PI);
  const yPohjoinen = -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * pohjoinen * Math.PI / 180));
  return {
    kermaMaski: { value: null },
    kermaMaskiAlue: { value: [0, 0, 1, 1] },
    kermaVari: { value: [0.98, 0.957, 0.839] },
    kermaPeitto: { value: 0 },
    kermaSumuPeitto: { value: 0 },
    kermaKaytossa: { value: 0 },
    // Pohjapallon laatat: laudan projektio kärkeen (ks. KERMA_GLSL_VERTEX).
    kermaLauta: { value: [lon0, skaala, yPohjoinen, sade] },
  };
}

/** '#faf4d6' → [r, g, b] 0…1. */
export function kermanVariLuvuiksi(kerma) {
  const h = String(kerma ?? '#faf4d6').replace('#', '');
  if (h.length < 6) return [0.98, 0.957, 0.839];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

/**
 * Renkaiden ja sumun aukkojen laatikko lauta-yksiköissä marginaalilla.
 * @returns {?{x0:number,y0:number,w:number,h:number}}
 */
export function kermaMaskinAlue(tasoitus, marginaali = KERMA_MASKIN_MARGINAALI) {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const rengas of tasoitus?.renkaat ?? []) {
    for (const p of rengas) {
      if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
    }
  }
  for (const a of tasoitus?.sumu?.aukot ?? []) {
    if (a.x - a.rx < x0) x0 = a.x - a.rx; if (a.x + a.rx > x1) x1 = a.x + a.rx;
    if (a.y - a.ry < y0) y0 = a.y - a.ry; if (a.y + a.ry > y1) y1 = a.y + a.ry;
  }
  if (!Number.isFinite(x0) || !(x1 > x0) || !(y1 > y0)) return null;
  const mx = (x1 - x0) * marginaali; const my = (y1 - y0) * marginaali;
  return { x0: x0 - mx, y0: y0 - my, w: (x1 - x0) + 2 * mx, h: (y1 - y0) + 2 * my };
}

/**
 * Rasteroi maskin: R = kohdemaan renkaiden sisus (1), G = renkaiden sisus
 * miinus sumun aukot (pehmeä reuna 70 %:sta säteestä). Reunatexelit jäävät
 * nolliksi (marginaali), joten ClampToEdge antaa ulkopuolelle 0.
 *
 * @param {object} tasoitus pyramidinTasoitus()
 * @param {object} p { luoKangas(w,h), sivu }
 * @returns {?{ kangas, alue }}
 */
export function piirraKermaMaski(tasoitus, { luoKangas, sivu = KERMA_MASKIN_SIVU } = {}) {
  const alue = kermaMaskinAlue(tasoitus);
  if (!alue || typeof luoKangas !== 'function') return null;
  const ppu = sivu / Math.max(alue.w, alue.h);
  const W = Math.max(4, Math.round(alue.w * ppu));
  const H = Math.max(4, Math.round(alue.h * ppu));
  const kangas = luoKangas(W, H);
  const ctx = kangas?.getContext?.('2d');
  if (!ctx) return null;
  const kx = (bx) => (bx - alue.x0) * ppu;
  const ky = (by) => (by - alue.y0) * ppu;
  ctx.clearRect(0, 0, W, H);
  // R: renkaat.
  ctx.beginPath();
  for (const rengas of tasoitus.renkaat ?? []) {
    for (let i = 0; i < rengas.length; i += 1) {
      const x = kx(rengas[i][0]); const y = ky(rengas[i][1]);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  ctx.fillStyle = 'rgb(255,0,0)';
  ctx.fill();
  // G: renkaat miinus aukot — piirretään lighter-tilassa vihreällä ja aukot pois.
  if (tasoitus.sumu?.aukot?.length) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    // Aukko: vihreä pois säteittäisellä liukuvärillä (musta = 0), punainen säilyy.
    for (const a of tasoitus.sumu.aukot) {
      const cx = kx(a.x); const cy = ky(a.y); const rx = a.rx * ppu; const ry = a.ry * ppu;
      if (!(rx > 0) || !(ry > 0)) continue;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);
      ctx.globalCompositeOperation = 'multiply';
      const g = ctx.createRadialGradient(0, 0, rx * 0.7, 0, 0, rx);
      g.addColorStop(0, 'rgb(255,0,255)');
      g.addColorStop(1, 'rgb(255,255,255)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  return { kangas, alue, W, H };
}

/**
 * Päivittää jaetut uniformit tasoituksesta: maski uudestaan, väri, peitot.
 * `luokat.Texture` on elävän laatan tekstuurin luokka (pallo.js kolmi).
 */
export function paivitaKermanJaetut(jaettu, tasoitus, { luoKangas, Texture, THREE_LINEAR = 1006, THREE_CLAMP = 1001 } = {}) {
  if (!jaettu) return false;
  const maski = tasoitus?.renkaat?.length ? piirraKermaMaski(tasoitus, { luoKangas }) : null;
  if (maski && Texture) {
    const vanha = jaettu.kermaMaski.value;
    const tekstuuri = new Texture(maski.kangas);
    tekstuuri.generateMipmaps = false;
    tekstuuri.minFilter = THREE_LINEAR;
    tekstuuri.magFilter = THREE_LINEAR;
    tekstuuri.wrapS = THREE_CLAMP;
    tekstuuri.wrapT = THREE_CLAMP;
    tekstuuri.flipY = true;
    tekstuuri.needsUpdate = true;
    jaettu.kermaMaski.value = tekstuuri;
    jaettu.kermaMaskiAlue.value = [maski.alue.x0, maski.alue.y0, maski.alue.w, maski.alue.h];
    vanha?.dispose?.();
  } else {
    // Ilman renkaita: maski tyhjä (1 × 1 nolla) → kerma kaikkialle maalle.
    jaettu.kermaMaskiAlue.value = [0, 0, 1, 1];
  }
  jaettu.kermaVari.value = kermanVariLuvuiksi(tasoitus?.kerma);
  jaettu.kermaPeitto.value = Number.isFinite(tasoitus?.peitto) ? tasoitus.peitto : 0;
  jaettu.kermaSumuPeitto.value = Number.isFinite(tasoitus?.sumu?.peitto) ? tasoitus.sumu.peitto : 0;
  // Ei tasoitusta tai maailmanäkymä: kerma pois kaikilta (myös pohjapallolta).
  jaettu.kermaKaytossa.value = tasoitus && !tasoitus.maailma ? 1 : 0;
  return Boolean(maski);
}

/**
 * Ujuttaa kerman laatan materiaaliin. `laatta` = { alue: {x0,y0,w,h} lauta,
 * paalla: boolean }. Palauttaa laatan omat uniformit (paalla-lippu
 * vaihdettavissa jälkikäteen).
 */
export function asennaKermaShader(materiaali, { jaettu, laatta = null, pohja = false }) {
  if (!materiaali || !jaettu) return null;
  const alue = laatta?.alue ?? { x0: 0, y0: 0, w: 1, h: 1 };
  const omat = {
    kermaLaattaAlue: { value: [alue.x0, alue.y0, alue.w, alue.h] },
    kermaPaalla: { value: laatta?.paalla === false ? 0 : 1 },
  };
  materiaali.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, jaettu, omat);
    const uv = shader.fragmentShader.includes('vMapUv') ? 'vMapUv' : 'vUv';
    // Laattakerros: laudan paikka laatan uv:sta (kangas y alaspäin, tekstuuri flipY: v = 1 − y/H).
    // Pohjapallo: kärjessä laskettu varying.
    const laudalla = pohja
      ? 'vKermaLauta'
      : `vec2(kermaLaattaAlue.x + ${uv}.x * kermaLaattaAlue.z, kermaLaattaAlue.y + (1.0 - ${uv}.y) * kermaLaattaAlue.w)`;
    const runko = KERMA_GLSL_RUNKO.replace(/KERMA_UV/g, uv).replace('KERMA_LAUDALLA', laudalla)
      .replace('KERMA_MERI', `${KERMA_MERI_ERO}.0`).replace('KERMA_MAA', `${KERMA_MAA_ERO}.0`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${KERMA_GLSL_UNIFORMIT}${pohja ? 'varying vec2 vKermaLauta;\n' : ''}`)
      .replace('#include <map_fragment>', runko);
    if (pohja) {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${KERMA_GLSL_VERTEX_UNIFORMIT}`)
        .replace('#include <begin_vertex>', KERMA_GLSL_VERTEX);
    }
  };
  materiaali.customProgramCacheKey = () => (pohja ? 'laattakerma-pohja-1' : 'laattakerma-1');
  materiaali.needsUpdate = true;
  materiaali.kermaUniformit = omat;
  return omat;
}
