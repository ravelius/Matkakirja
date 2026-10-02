/*
 * AJATTELIJAT: VIDEOTYKKI (projektorivarjostin). Blender-mallin spottivalot gobokuvalla (sokrates_bysti.py
 * v4_projektori ja tausta_rivi) yhtenä three.js-materiaalin lisäyksenä: kirjaimet ovat VALOA kipsin pinnalla
 * (kertautuvat albedolla ja kulmalla, eivät vuoda taustaan), ja teksti taipuu pinnan muotojen mukaan, koska
 * kuva projisoidaan projektorin perspektiivistä.
 *
 * Kaikki tekstit ovat yhdessä atlaskankaassa (yksi tekstuuri riippumatta rivien määrästä: puhelimen
 * tekstuuriyksiköt riittävät). Jokaisella projektorilla on oma näkymämatriisi ja parametrit:
 *   u = (x·c − y·s) / nauhanLeveys + keskitys + siirto,  v = (x·s + y·c − vM) / nauhanKorkeus + 0,5
 *   (x, y) = (jx, jy) · etäisyys · skaala,   jx = valon x / −z   (Blenderin "Normal"-perspektiivijako)
 * Päälause (CLIP, keskitys 0,5): kromaattinen aberraatio (skaala 1 ± ca kanavittain) ja tarkennuksen pehmeys
 * (terävän ja sumean rivin sekoitus |säde − etäisyys| / syvyys). Taustarivi (REPEAT): kääntökulma ja pystysiirto.
 */

export const PROJEKTOREITA_ENINTAAN = 24;
// Gobokuvan mittasuhteet (sokrates_gobo.py --nauha): kirjainkoko 220 px 534 px:n nauhassa, reunus ~0,85 em.
export const NAUHA_EM = 220 / 534;
const ATLAS_LEVEYS = 4096;
const ATLAS_VALI = 16;   // tyhjä väli rivien välissä: mip-tasot eivät vuoda viereiseen riviin

/** Piirtää rivit atlakseen. rivit: [{ teksti, fontti, korkeus px, sumea?: boolean }]. Palauttaa kankaan ja rivien paikat. */
export function piirraAtlas(rivit, doc = document) {
  const kangas = doc.createElement('canvas');
  const mitta = kangas.getContext('2d');
  const paikat = [];
  let y = 0;
  for (const r of rivit) {
    const em = Math.round(r.korkeus * NAUHA_EM * (r.emOsuus ?? 1));
    mitta.font = `${r.paino ?? 'bold'} ${em}px ${r.fontti}`;
    const tekstiLev = Math.ceil(mitta.measureText(r.teksti).width);
    if (r.toisto) {
      // TOISTORIVI TÄYTTÄÄ ATLAKSEN LEVEYDEN kokonaisilla laatoilla (laatta = teksti + väli): näytteenotin
      // kääriä (RepeatWrapping) jatkuvalla u:lla, joten saumassa ei ole fract()-hyppyä eikä mip-viivaa.
      const toistoja = Math.max(1, Math.floor(ATLAS_LEVEYS / (tekstiLev + 3 * em)));
      const lev = ATLAS_LEVEYS / toistoja;
      paikat.push({ ...r, em, lev, y, uMax: 1 / toistoja, toistoja, reuna: (lev - tekstiLev) / 2 });
    } else {
      const reuna = Math.round(em * 0.85 + tekstiLev * 0.06);
      const lev = Math.min(ATLAS_LEVEYS, tekstiLev + 2 * reuna);
      paikat.push({ ...r, em, lev, y, uMax: lev / ATLAS_LEVEYS, reuna });
    }
    y += (r.korkeus + ATLAS_VALI) * (r.sumea ? 2 : 1);
  }
  kangas.width = ATLAS_LEVEYS;
  kangas.height = Math.max(4, 2 ** Math.ceil(Math.log2(Math.max(4, y))));
  const c = kangas.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0, 0, kangas.width, kangas.height);
  c.fillStyle = '#fff';
  c.textBaseline = 'middle';
  for (const p of paikat) {
    c.font = `${p.paino ?? 'bold'} ${p.em}px ${p.fontti}`;
    const piirra = (yla, sumeus) => {
      c.save();
      // Toistorivi täyttää koko atlaksen leveyden (kaikki laatat), muuten vain oma leveys (Linssiseppä 2:n löydös 2.10.).
      c.beginPath(); c.rect(0, yla, p.toistoja ? ATLAS_LEVEYS : p.lev, p.korkeus); c.clip();
      c.filter = `blur(${sumeus}px)`;
      for (let n = 0; n < (p.toistoja ?? 1); n += 1) c.fillText(p.teksti, p.reuna + n * p.lev, yla + p.korkeus / 2);
      c.restore();
    };
    // Projektorin pehmeys: GaussianBlur 2 px 220 px:n kirjaimissa; sumea pari nauhan korkeus / 40.
    piirra(p.y, Math.max(0.5, p.em * 2 / 220));
    if (p.sumea) piirra(p.y + p.korkeus + ATLAS_VALI, p.korkeus / 40);
  }
  return { kangas, paikat };
}

/** Lisää materiaaliin projektorit (onBeforeCompile). Palauttaa yhteiset uniformit, joita näkymä päivittää. */
export function lisaaProjektorit(THREE, materiaali, atlasTekstuuri) {
  const N = PROJEKTOREITA_ENINTAAN;
  const uniformit = {
    pMaara: { value: 0 },
    pAtlas: { value: atlasTekstuuri },
    pNakyma: { value: Array.from({ length: N }, () => new THREE.Matrix4()) },
    pA: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pB: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pC: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pD: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pE: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pF: { value: Array.from({ length: N }, () => new THREE.Vector4()) },
    pVari: { value: new THREE.Color(1, 1, 1) },
    pKaiku: { value: null },
    pKaikuVari: { value: new THREE.Color(1, 1, 1) },
  };
  materiaali.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniformit);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vMaailma;')
      .replace('#include <project_vertex>',
        '#include <project_vertex>\nvMaailma = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vMaailma;
#define P_ENINTAAN ${N}
uniform int pMaara;
uniform sampler2D pAtlas;
uniform mat4 pNakyma[P_ENINTAAN];
uniform vec4 pA[P_ENINTAAN]; // etäisyys, nauhan leveys, nauhan korkeus, siirto
uniform vec4 pB[P_ENINTAAN]; // cos kulma, sin kulma, pystysiirto vM, voima
uniform vec4 pC[P_ENINTAAN]; // atlas v0, v1 (terävä), v0, v1 (sumea; = terävä, jos ei sumeaa)
uniform vec4 pD[P_ENINTAAN]; // uMax, ca, syvyys, toisto (0 = CLIP, 1 = REPEAT)
uniform vec4 pE[P_ENINTAAN]; // projektorin paikka (maailma), keilan cos ulkoreuna
uniform vec4 pF[P_ENINTAAN]; // keilan cos sisäreuna, keskitys (0,5 päälause, 0 rivi), kaiku (1 = kaikukuva)
uniform vec3 pVari;
uniform sampler2D pKaiku;     // kaikukuva (v8): harmaasävy, valoa vain sisällössä
uniform vec3 pKaikuVari;      // seepia
float pNayte(int i, float jx, float jy, float sk, float sumeus) {
  vec4 a = pA[i]; vec4 b = pB[i]; vec4 c = pC[i]; vec4 d = pD[i];
  float x = jx * a.x * sk, y = jy * a.x * sk;
  float u = (x * b.x - y * b.y) / a.y + pF[i].y + a.w;
  float v = (x * b.y + y * b.x - b.z) / a.z + 0.5;
  if (v <= 0.0 || v >= 1.0) return 0.0;
  // Rivin reunat häivytetään: kirjaimet ovat keskellä (v 0,3–0,7), ja loivassa kulmassa korkeat mip-tasot
  // toisivat muuten viereisen atlasrivin palasia katkoviivaksi.
  float reuna = smoothstep(0.0, 0.15, v) * smoothstep(1.0, 0.85, v);
  if (d.w < 0.5 && (u <= 0.0 || u >= 1.0)) return 0.0;
  // Kaikukuva: valoa vain sisällössä (sokrates_kaiku.py). Matalat sävyt kynnystetään pois (webin AgX nostaa niitä
  // Blenderiä enemmän, jolloin kuva-ala erottui suorakaiteena), ja reunat häivytetään.
  if (pF[i].z > 0.5) {
    float reunaK = smoothstep(0.0, 0.08, u) * smoothstep(1.0, 0.92, u) * smoothstep(0.0, 0.08, v) * smoothstep(1.0, 0.92, v);
    return smoothstep(0.08, 0.9, texture2D(pKaiku, vec2(u, 1.0 - v)).r) * reunaK;
  }
  float au = u * d.x;   // toistorivi: jatkuva u, atlas kääritään (RepeatWrapping)
  float terava = texture2D(pAtlas, vec2(au, mix(c.x, c.y, 1.0 - v)), -0.75).r;
  if (sumeus <= 0.0) return terava * reuna;
  float sumea = texture2D(pAtlas, vec2(au, mix(c.z, c.w, 1.0 - v))).r;
  return mix(terava, sumea, sumeus) * reuna;
}
vec3 projektoriValo(vec3 nW) {
  vec3 summa = vec3(0.0);
  for (int i = 0; i < P_ENINTAAN; i++) {
    if (i >= pMaara) break;
    vec4 l = pNakyma[i] * vec4(vMaailma, 1.0);
    float z = -l.z;
    if (z <= 1e-4 || pB[i].w <= 0.0) continue;
    vec3 kohti = pE[i].xyz - vMaailma;
    float r = length(kohti);
    float keila = smoothstep(pE[i].w, pF[i].x, z / max(length(l.xyz), 1e-5));
    float nl = max(dot(nW, kohti / r), 0.0);
    if (keila <= 0.0 || nl <= 0.0) continue;
    float jx = l.x / z, jy = l.y / z;
    float sumeus = pD[i].z > 0.0 ? min(abs(r - pA[i].x) / pD[i].z, 1.0) : 0.0;
    float ca = pD[i].y;
    vec3 t = ca > 0.0
      ? vec3(pNayte(i, jx, jy, 1.0 + ca, sumeus), pNayte(i, jx, jy, 1.0, sumeus), pNayte(i, jx, jy, 1.0 - ca, sumeus))
      : vec3(pNayte(i, jx, jy, 1.0, sumeus));
    summa += t * (pF[i].z > 0.5 ? pKaikuVari : pVari) * (pB[i].w * keila * nl / (r * r));
  }
  return summa;
}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
reflectedLight.directDiffuse += BRDF_Lambert(diffuseColor.rgb) * projektoriValo(inverseTransformDirection(normal, viewMatrix));`);
  };
  materiaali.customProgramCacheKey = () => 'ajattelija-projektori';
  return uniformit;
}

/** Asettaa projektorin i: paikka ja kohde (three-koordinaatit), atlasrivi, mitat ja voima. */
export function asetaProjektori(THREE, u, i, {
  paikka, kohde, etaisyys, nauhaKork, rivi, sumeaRivi = null, ala, blend = 0.45, kulma = 0, vM = 0, voima = 0,
  siirto = 0, ca = 0, syvyys = 0, toisto = false, atlasKorkeus, kaiku = null,
}) {
  const kamera = new THREE.PerspectiveCamera();
  kamera.position.copy(paikka);
  kamera.up.set(0, 1, 0);
  kamera.lookAt(kohde);
  kamera.updateMatrixWorld(true);
  u.pNakyma.value[i].copy(kamera.matrixWorldInverse);
  // Kaikukuva: rivi = { lev, korkeus } kuvan pikseleinä, nauhaKork = kuvan korkeus metreinä (lev × K / L).
  const nauhaLev = nauhaKork * rivi.lev / rivi.korkeus;
  u.pA.value[i].set(etaisyys, nauhaLev, nauhaKork, siirto);
  u.pB.value[i].set(Math.cos(kulma), Math.sin(kulma), vM, voima);
  const s = sumeaRivi ?? rivi;
  const v0 = (rivi.y ?? 0) / atlasKorkeus, v1 = ((rivi.y ?? 0) + rivi.korkeus) / atlasKorkeus;
  const sv0 = (s === rivi && rivi.sumea ? rivi.y + rivi.korkeus + 16 : s.y) / atlasKorkeus;
  u.pC.value[i].set(v0, v1, rivi.sumea ? sv0 : v0, rivi.sumea ? sv0 + rivi.korkeus / atlasKorkeus : v1);
  u.pD.value[i].set(rivi.uMax ?? 1, ca, syvyys, toisto ? 1 : 0);
  // Blender: spot_size = 2,4·atan(ala / 2 / etäisyys) koko kulmana, spot_blend reunan pehmeys.
  const puoli = 1.2 * Math.atan(ala / 2 / etaisyys);
  u.pE.value[i].set(paikka.x, paikka.y, paikka.z, Math.cos(puoli));
  u.pF.value[i].set(Math.cos(puoli * (1 - blend)), toisto ? 0 : 0.5, kaiku ? 1 : 0, 0);
  return { nauhaLev };
}

/*
 * KIPSIN TERÄVÄ PINTA (omistajan v9-palaute 2.10.2026 klo 10.3x: "pinta muuttuu vieläkin muovisemman näköiseksi";
 * Blender v10 --terava). Normaalikartta mip-biasilla −0,75 (lähikuvassa ei pehmennä) ja kaksitasoinen triplanar-
 * mikronormaali kipsikuviosta (Poly Haven grey_plaster_02, Rob Tuytel, CC0): toistot 28,5 ja 95 / m, voimat 0,6 ja 0,35
 * kuten Blenderin bump-solmuissa. Onteloiden AO jää pois (reaaliajassa raskas). Ketjuttuu projektorien onBeforeCompileen.
 */
export const KIPSI_TOISTOT = [28.5, 95.0];
export const KIPSI_VOIMAT = [0.6, 0.35];
export function lisaaKipsinPinta(THREE, materiaali, detalji) {
  const edellinen = materiaali.onBeforeCompile;
  const uniformit = { pDetalji: { value: detalji } };
  materiaali.onBeforeCompile = (shader, renderoija) => {
    edellinen?.(shader, renderoija);
    Object.assign(shader.uniforms, uniformit);
    const [t1, t2] = KIPSI_TOISTOT, [v1, v2] = KIPSI_VOIMAT;
    const pala = THREE.ShaderChunk.normal_fragment_maps
      .replace('texture2D( normalMap, vNormalMapUv )', 'texture2D( normalMap, vNormalMapUv, -0.75 )');
    shader.fragmentShader = shader.fragmentShader
      .replace('uniform vec3 pVari;', `uniform vec3 pVari;
uniform sampler2D pDetalji;
vec3 kipsiTaso(vec3 p, vec3 w) {
  vec3 x = texture2D(pDetalji, p.zy).xyz * 2.0 - 1.0;
  vec3 y = texture2D(pDetalji, p.xz).xyz * 2.0 - 1.0;
  vec3 z = texture2D(pDetalji, p.xy).xyz * 2.0 - 1.0;
  return w.x * vec3(0.0, x.y, x.x) + w.y * vec3(y.x, 0.0, y.y) + w.z * vec3(z.x, z.y, 0.0);
}`)
      .replace('#include <normal_fragment_maps>', `${pala}
{
  vec3 nW = inverseTransformDirection(normal, viewMatrix);
  vec3 w = pow(abs(nW), vec3(4.0));
  w /= (w.x + w.y + w.z);
  vec3 d = kipsiTaso(vMaailma * ${t1.toFixed(1)}, w) * ${v1.toFixed(2)} + kipsiTaso(vMaailma * ${t2.toFixed(1)}, w) * ${v2.toFixed(2)};
  normal = normalize((viewMatrix * vec4(normalize(nW + d), 0.0)).xyz);
}`);
  };
  materiaali.customProgramCacheKey = () => 'ajattelija-projektori-kipsi';
  return uniformit;
}
