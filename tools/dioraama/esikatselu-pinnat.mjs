/*
 * DIORAAMAN PINTAMATERIAALIT — esikatselu, erä 2b (29.9.2026, ali-agentti P7).
 * MeshStandardMaterial + onBeforeCompile: AO (COLOR.R) kertoimena, lämpö
 * (COLOR.G) emissiona, proseduraalinen kuvio (jos tools/dioraama/kuviot.glsl.mjs
 * on olemassa — toinen agentti (P2) tekee sitä samaan aikaan) ja Pinnat A/B
 * -kytkin (B = Codexin maalattu tekstuuri pinnat/<id>.jpg, jos paketissa on).
 * Rajapinta: docs/raportit/dioraama-rajapinnat-era2b-20260929.md, kohdat 1-2.
 *
 * HUOM: kuviot.glsl.mjs ilmestyi (P2) kesken tämän erän ja on nähty toimivaksi
 * (kivi/tiili/lankku/rappaus jne. näkyvät esikatselussa). `material.defines.USE_UV`
 * pakotetaan tarvittaessa, jotta vUv-varying on olemassa vaikka mitään THREEn
 * omaa tekstuuria ei käytettäisi; maailmanpiste (DioraamaKuvio-kutsun "maailma")
 * lasketaan OMANA varyingina (vDioraamaMaailma) — THREEn omaan vWorldPosition:iin
 * EI voi luottaa (puuttui käännöksestä varjojenkin kanssa, syytä ei selvitetty).
 * EI todennettu: Pinnat B (maalattu tekstuuri) — paketissa ei ollut yhtään
 * pinnat/<id>.jpg-tiedostoa testihetkellä, joten se GLSL-polku ei suorittunut.
 */
import * as THREE from 'three';

const AO_PAINO = 0.85; // sama kuin natiivin kaava: lerp(1, AO, 0.85)
const LAMPO_VARI = [1.0, 0.62, 0.32]; // lämmin hehku (kynttilä/hiillos-sävy) COLOR.G:lle
// LAMPO_VOIMA + neliöinti (g·g): suora g ilman vaimennusta poltti tulisijan hupun
// näkymättömiin (todettu ajohetkellä) — vaimennettu ja keskitetty lähelle lämmönlähdettä.
const LAMPO_VOIMA = 0.45;

let kuvioModuuli; // { KUVIOT_GLSL, KUVIOTYYPIT } tai null — ladataan kerran
let kuvioYritetty = false;

/** Lataa tools/dioraama/kuviot.glsl.mjs:n dynaamisesti. Ohittaa siististi jos puuttuu. */
async function haeKuvioModuuli() {
  if (kuvioYritetty) return kuvioModuuli;
  kuvioYritetty = true;
  try {
    kuvioModuuli = await import('./kuviot.glsl.mjs');
  } catch {
    kuvioModuuli = null; // P2 ei ole vielä luonut tiedostoa — kuviot jäävät pois, väri pysyy tasaisena
  }
  return kuvioModuuli;
}

const pintaTilaUniformit = []; // kaikkien pintamateriaalien {value}-uniformit: A/B-kytkin päivittää kaikki kerralla
/** Vaihtaa kaikki pinnat A- (proseduraalinen) tai B-tilaan (maalattu). */
export function asetaPintaTila(bTila) {
  const arvo = bTila ? 1 : 0;
  for (const u of pintaTilaUniformit) u.value = arvo;
}

const materiaaliCache = new Map(); // pinta-id → THREE.MeshStandardMaterial (jaettu kaikkien tilojen kesken)

/** Onko jollain ladatulla pinnalla oikea maalattu tekstuuri (Pinnat B -kytkimen huomiota varten). */
export function onkoMaalattujaPintoja() {
  for (const m of materiaaliCache.values()) if (m.userData.onMaalattu) return true;
  return false;
}

/** Rakentaa (tai palauttaa välimuistista) yhden pinnan MeshStandardMaterialin. */
export async function haePintaMateriaali(pintaId, pinnat, pakettiUrl) {
  if (materiaaliCache.has(pintaId)) return materiaaliCache.get(pintaId);
  const p = pinnat[pintaId];
  if (!p) throw new Error(`esikatselu-pinnat: pinta '${pintaId}' puuttuu rakennus.json:n pinnat-kentästä`);

  let pohjaKuva = null;
  if (p.tekstuuri) {
    pohjaKuva = await new THREE.TextureLoader().loadAsync(`${pakettiUrl}${p.tekstuuri}`);
    pohjaKuva.colorSpace = THREE.SRGBColorSpace;
    pohjaKuva.wrapS = THREE.RepeatWrapping;
    pohjaKuva.wrapT = THREE.RepeatWrapping;
  }
  const kuviot = p.kuvio ? await haeKuvioModuuli() : null;
  const kuvioAktiivinen = Boolean(kuviot && p.kuvio);
  const tyyppiId = kuvioAktiivinen ? (kuviot.KUVIOTYYPIT[p.kuvio.tyyppi] ?? 0) : 0;
  const koko = p.kuvio?.koko_m ?? [1, 1];
  const parametrit = new THREE.Vector4(koko[0], koko[1], p.kuvio?.sauma_m ?? 0.02, p.kuvio?.vaihtelu ?? 0.2);
  const tarvitseeUv = kuvioAktiivinen || Boolean(pohjaKuva); // vUv ei ole oletuksena olemassa ilman tekstuuria

  const pintaTilaUniform = { value: 0 };
  pintaTilaUniformit.push(pintaTilaUniform);

  const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(p.vari), roughness: 0.85, metalness: 0 });
  mat.userData.onMaalattu = Boolean(pohjaKuva);
  // HUOM: defines pitää asettaa ENNEN ensimmäistä kääntöä (onBeforeCompile-sisäinen
  // muutos olisi liian myöhässä, koska WebGLProgram lukee defines-olion jo ennen
  // onBeforeCompile-kutsua) — tunnettu three.js-kiertotie pakotettuun vUv:hen.
  if (tarvitseeUv) mat.defines = { USE_UV: '' };

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uPintaTila = pintaTilaUniform;
    // vDioraamaMaailma lasketaan itse (EI luoteta THREEn omaan vWorldPosition:iin,
    // joka on olemassa vain tietyin ehdoin kuten USE_SHADOWMAP — todettu ajohetkellä
    // epäluotettavaksi: "undeclared identifier 'vWorldPosition'" varjojen kanssakin).
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 color;\nvarying vec4 vDioraamaVari;\nvarying vec3 vDioraamaMaailma;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDioraamaVari = color;\nvDioraamaMaailma = (modelMatrix * vec4(position, 1.0)).xyz;');

    let lisaFrag = 'uniform float uPintaTila;\nvarying vec4 vDioraamaVari;\nvarying vec3 vDioraamaMaailma;\n';
    if (pohjaKuva) lisaFrag += 'uniform sampler2D uPohjaKuva;\n';
    if (kuvioAktiivinen) {
      lisaFrag += `uniform int uKuvioTyyppi;\nuniform vec4 uKuvioParametrit;\n${kuviot.KUVIOT_GLSL}\n`;
      shader.uniforms.uKuvioTyyppi = { value: tyyppiId };
      shader.uniforms.uKuvioParametrit = { value: parametrit };
    }
    if (pohjaKuva) shader.uniforms.uPohjaKuva = { value: pohjaKuva };
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\n${lisaFrag}`);

    const kuvioKoodi = kuvioAktiivinen
      ? 'if (uPintaTila < 0.5) diffuseColor.rgb *= DioraamaKuvio(uKuvioTyyppi, uKuvioParametrit, vUv, vDioraamaMaailma, vDioraamaVari.b);\n'
      : '';
    const pohjaKoodi = pohjaKuva ? 'if (uPintaTila > 0.5) diffuseColor.rgb *= texture2D(uPohjaKuva, vUv).rgb;\n' : '';
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      diffuseColor.rgb *= mix(1.0, vDioraamaVari.r, ${AO_PAINO});
      ${kuvioKoodi}${pohjaKoodi}`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      totalEmissiveRadiance += vDioraamaVari.g * vDioraamaVari.g * ${LAMPO_VOIMA} * vec3(${LAMPO_VARI[0]}, ${LAMPO_VARI[1]}, ${LAMPO_VARI[2]});`);
  };

  materiaaliCache.set(pintaId, mat);
  return mat;
}

/**
 * Lisää saman AO(R)/lämpö(G)-käsittelyn VALMIIKSI LADATTUUN materiaaliin, jonka
 * oma väri (glTF baseColorFactor, esim. hahmot3d/<id>.glb:n vaate/iho-sävy) on jo
 * oikea eikä saa muuttua. Tarvitaan koska GLTFLoader asettaa `vertexColors = true`
 * AINA kun primitiivillä on COLOR_0 (todettu ajohetkellä: hahmot3d-mallit käyttävät
 * SAMAA COLOR_0-konventiota kuin huoneet, R=AO/G=lämpö/B=satunnainen — ei kirjaimellinen
 * värikerroin!) — THREEn oma `diffuseColor.rgb *= vColor.rgb` -oletuskäsittely siis
 * turmelisi vaatteen värin (esim. lähes musta+satunnainen sininen → magenta/pinkki,
 * nähtiin ajohetkellä ennen tätä korjausta). Ei Pinnat A/B- eikä kuvio-tukea (ei tarvita
 * hahmoille); AO/lämpö-vakiot samat kuin pinnoilla (AO_PAINO, LAMPO_VOIMA, LAMPO_VARI).
 */
export function kasitteleAoLampo(material) {
  material.vertexColors = false; // kumoaa GLTFLoaderin oletuksen — ks. yllä
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 color;\nvarying vec4 vDioraamaVari;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDioraamaVari = color;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec4 vDioraamaVari;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb *= mix(1.0, vDioraamaVari.r, ${AO_PAINO});`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += vDioraamaVari.g * vDioraamaVari.g * ${LAMPO_VOIMA} * vec3(${LAMPO_VARI[0]}, ${LAMPO_VARI[1]}, ${LAMPO_VARI[2]});`);
  };
}

/** Testien/uudelleenlatauksen apu — ei kutsuta normaalissa esikatselussa. */
export function tyhjennaPintaValimuisti() {
  materiaaliCache.clear();
  pintaTilaUniformit.length = 0;
  kuvioYritetty = false;
}
