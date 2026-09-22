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
uniform vec4 kermaLaattaAlue;  // lauta: x0, y0, w, h (tämä laatta)
uniform vec3 kermaVari;        // LINEAARINEN 0…1 (kermanVariLineaariseksi)
uniform float kermaPeitto;
uniform float kermaSumuPeitto;
uniform float kermaPaalla;     // 1 = kerma, 0 = ei (maailmanäkymä, linssin tyhjä arkki)
uniform float kermaKaanto;     // 1 = kuva luetaan v-käännettynä (nollakopio-bittikartta, flipY = false)
`;

/*
 * OMA UV-VARYING, EI KIRJASTON NIMEÄ (vika v2084, löytyi 22.9.2026
 * pohjan piilotusta mitattaessa: laattakerros oli tuotannossa NÄKYMÄTÖN
 * ja pelaaja näki z5-pohjan). `onBeforeCompile` saa shaderin ENNEN
 * #include-lohkojen avaamista, joten `fragmentShader.includes('vMapUv')`
 * oli aina epätosi ja runko viittasi `vUv`:hen, jota three r155:n
 * Lambert-fragmentissa ei ole → fragmentti ei käänny, ohjelma ei linkity,
 * laatta ei piirry (three ei kirjaa virhettä konsoliin, GL antaa
 * INVALID_OPERATIONin piirrossa). Kerma lukee nyt oman varyinginsa
 * `vKermaUv`, joka asetetaan kärjessä suoraan `uv`-attribuutista —
 * riippumaton siitä, miksi kirjasto varyinginsa nimeää.
 */
const KERMA_GLSL_VARYING = 'varying vec2 vKermaUv;';
const KERMA_GLSL_KARKI = `
#include <uv_vertex>
vKermaUv = uv;
`;

/*
 * map_fragment-lohkon korvaaja. SEKOITUS LINEAARISESSA, EI sRGB-
 * EDESTAKAISIN (sulavuuskatsaus 22.9.2026 kohta 3): aiempi runko teki
 * joka laattapikselille kaksi pow(vec3)-kutsua (lineaarinen → sRGB →
 * lineaarinen) vain siksi, että kankaan sääntö luki sRGB-tavuja. Nyt
 * maa/meri-ero lasketaan gamma 2:n likiarvolla (sqrt, yksi käsky) —
 * kynnysten 36/52 kohdalla ero täsmälliseen sRGB:hen on ±3/255, jonka
 * smoothstepin pehmeä reuna nielee — ja kerma sekoitetaan lineaarisessa
 * tilassa lineaariseksi muunnettuun kermaväriin (kermanVariLineaariseksi
 * kerran CPU:lla). Maski haetaan vain kun kermaPaalla (kuten ennenkin).
 * Mittauslippu `?koe=kermapow` palauttaa täsmällisen sRGB-rungon.
 */
const KERMA_GLSL_RUNKO = `
#ifdef USE_MAP
  vec4 kermaTexel = texture2D( map, vec2(KERMA_UV.x, mix(KERMA_UV.y, 1.0 - KERMA_UV.y, kermaKaanto)) );
  if (kermaPaalla > 0.5) {
    // Laatan kangas piirretään y alaspäin ja tekstuuri on flipY: v = 1 − y/H.
    vec2 kermaLaudalla = vec2(kermaLaattaAlue.x + KERMA_UV.x * kermaLaattaAlue.z,
                              kermaLaattaAlue.y + (1.0 - KERMA_UV.y) * kermaLaattaAlue.w);
    vec2 kermaMaskiUv = (kermaLaudalla - kermaMaskiAlue.xy) / kermaMaskiAlue.zw;
    vec4 kermaM = texture2D( kermaMaski, vec2(kermaMaskiUv.x, 1.0 - kermaMaskiUv.y) );
    // Maa/meri-ero sRGB:ssä likimain (gamma 2): sqrt on halpa, pow ei.
    float kermaEro = (sqrt(kermaTexel.r) - sqrt(kermaTexel.b)) * 255.0;
    float kermaT = smoothstep(KERMA_MERI, KERMA_MAA, kermaEro);
    float kermaA = kermaT * (kermaPeitto * (1.0 - kermaM.r) + kermaSumuPeitto * kermaM.g);
    kermaTexel.rgb = mix(kermaTexel.rgb, kermaVari, clamp(kermaA, 0.0, 1.0));
  }
  diffuseColor *= kermaTexel;
#endif
`;

/** Täsmällinen sRGB-runko (kaksi pow-paria) vain mittauslipulla `?koe=kermapow`. */
const KERMA_GLSL_RUNKO_TARKKA = `
#ifdef USE_MAP
  vec4 kermaTexel = texture2D( map, vec2(KERMA_UV.x, mix(KERMA_UV.y, 1.0 - KERMA_UV.y, kermaKaanto)) );
  if (kermaPaalla > 0.5) {
    vec2 kermaLaudalla = vec2(kermaLaattaAlue.x + KERMA_UV.x * kermaLaattaAlue.z,
                              kermaLaattaAlue.y + (1.0 - KERMA_UV.y) * kermaLaattaAlue.w);
    vec2 kermaMaskiUv = (kermaLaudalla - kermaMaskiAlue.xy) / kermaMaskiAlue.zw;
    vec4 kermaM = texture2D( kermaMaski, vec2(kermaMaskiUv.x, 1.0 - kermaMaskiUv.y) );
    vec3 kermaSrgb = mix(kermaTexel.rgb * 12.92, 1.055 * pow(kermaTexel.rgb, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, kermaTexel.rgb));
    float kermaEro = (kermaSrgb.r - kermaSrgb.b) * 255.0;
    float kermaT = smoothstep(KERMA_MERI, KERMA_MAA, kermaEro);
    float kermaA = kermaT * (kermaPeitto * (1.0 - kermaM.r) + kermaSumuPeitto * kermaM.g);
    vec3 kermaVariSrgb = mix(kermaVari * 12.92, 1.055 * pow(kermaVari, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, kermaVari));
    kermaSrgb = mix(kermaSrgb, kermaVariSrgb, clamp(kermaA, 0.0, 1.0));
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
export function luoKermanJaetut() {
  return {
    kermaMaski: { value: null },
    kermaMaskiAlue: { value: [0, 0, 1, 1] },
    kermaVari: { value: kermanVariLineaariseksi('#faf4d6') },
    kermaPeitto: { value: 0 },
    kermaSumuPeitto: { value: 0 },
  };
}

/** '#faf4d6' → [r, g, b] 0…1 (sRGB). */
export function kermanVariLuvuiksi(kerma) {
  const h = String(kerma ?? '#faf4d6').replace('#', '');
  if (h.length < 6) return [0.98, 0.957, 0.839];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

/** sRGB-kanava 0…1 → lineaarinen (sama kaava kuin three:n sRGBToLinear). */
export function srgbLineaariseksi(c) {
  return c < 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** '#faf4d6' → lineaarinen [r, g, b] shaderin sekoitusta varten. */
export function kermanVariLineaariseksi(kerma) {
  return kermanVariLuvuiksi(kerma).map(srgbLineaariseksi);
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
  jaettu.kermaVari.value = kermanVariLineaariseksi(tasoitus?.kerma);
  jaettu.kermaPeitto.value = Number.isFinite(tasoitus?.peitto) ? tasoitus.peitto : 0;
  jaettu.kermaSumuPeitto.value = Number.isFinite(tasoitus?.sumu?.peitto) ? tasoitus.sumu.peitto : 0;
  return Boolean(maski);
}

/**
 * Ujuttaa kerman laatan materiaaliin. `laatta` = { alue: {x0,y0,w,h} lauta,
 * paalla: boolean }. Palauttaa laatan omat uniformit (paalla-lippu
 * vaihdettavissa jälkikäteen).
 */
export function asennaKermaShader(materiaali, { jaettu, laatta, tarkka = false, kaanto = false }) {
  if (!materiaali || !jaettu) return null;
  const omat = {
    kermaLaattaAlue: { value: [laatta.alue.x0, laatta.alue.y0, laatta.alue.w, laatta.alue.h] },
    kermaPaalla: { value: laatta.paalla === false ? 0 : 1 },
    /*
     * NOLLAKOPIO-BITTIKARTTA (sulavuus kohta 10, js/pallolaatat.js
     * SUORA BITTIKARTTA): tekstuuri on flipY = false, joten kuva luetaan
     * v-käännettynä; lauta-koordinaatti lasketaan yhä verkon omasta uv:stä.
     */
    kermaKaanto: { value: kaanto ? 1 : 0 },
  };
  materiaali.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, jaettu, omat);
    const runko = (tarkka ? KERMA_GLSL_RUNKO_TARKKA : KERMA_GLSL_RUNKO).replace(/KERMA_UV/g, 'vKermaUv')
      .replace('KERMA_MERI', `${KERMA_MERI_ERO}.0`).replace('KERMA_MAA', `${KERMA_MAA_ERO}.0`);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${KERMA_GLSL_VARYING}`)
      .replace('#include <uv_vertex>', KERMA_GLSL_KARKI);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${KERMA_GLSL_VARYING}\n${KERMA_GLSL_UNIFORMIT}`)
      .replace('#include <map_fragment>', runko);
  };
  materiaali.customProgramCacheKey = () => (tarkka ? 'laattakerma-2-tarkka' : 'laattakerma-2');
  materiaali.needsUpdate = true;
  materiaali.kermaUniformit = omat;
  return omat;
}
