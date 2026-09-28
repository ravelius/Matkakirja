/*
 * ISS:N KYYTI — NÄKYMÄ (Linssisepän suositus docs/raportit/
 * iss-kyyti-suositus-20260928.md luvut 1, 4 ja 6; natiivi proto
 * linssiseppa/iss-kyyti: IssKyytiNakyma, AstronauttiKerros, Avaruus,
 * Ilmakaari.shader, IssMalli). Tilakone ja luvut: js/linssit/iss-kyyti.js.
 *
 * MITÄ TÄMÄ TEKEE KYYDIN AJAN
 *
 *  • KAMERA ON KYYDIN. OrbitControls suljetaan (`enabled = false`: kirjaston
 *    tick ohittaa silloin `controls.update`in eikä ohjain ota eleitä), ja
 *    kamera kirjoitetaan joka kehys kuvakulmasta (iss-kyyti.js
 *    kameranAsento): silmä, katsekohde ja ylös-suunta, kenttäkulma 80° vain
 *    ikkunassa. Paluun lopussa ohjaimet, kenttäkulma ja ylös palautetaan, ja
 *    kamera on kaukonäkymän asennossa (katse pallon keskelle, pohjoinen
 *    ylhäällä) — OrbitControls jatkaa siitä saumatta.
 *  • VETO, NIPISTYS JA KIERTO EIVÄT LIIKUTA KAMERAA: läpinäkyvä
 *    kosketuskerros on kotelon ULKOPUOLELLA (bodyssä), joten pallon omat
 *    elekuuntelijat (js/pallo.js, kotelo.contains-testi) ja kirjaston
 *    ohjain eivät näe sitä lainkaan. Sen napautus vaihtaa tilaa.
 *  • TAIVAS VAIHTUU 0,8 s:ssa: kaukonäkymän ilmakehähehku (1,25 R) pois,
 *    tilalle ohut analyyttinen kaari R + 120 km (sama kaava kuin natiivin
 *    Ilmakaari.shader: kirkkaus exp(−h/22 km), sävy vaaleasta syvään
 *    siniseen, yöllä 0,06; maan päällä hento usva, katto 0,42), tähdet 0,3,
 *    rata ja reunavarjo piiloon, pilvet matalalle (astro-sumu.js kyyti).
 *  • ISS 3D-MALLINA seurannassa, kun kamera on alle 3 000 km:n päässä:
 *    natiivin IssMalli samoin mittasuhtein (ristikko, neljä paria
 *    kullanruskeita siipiä, valkoiset moduulit, radiaattorit; 176
 *    kolmiota), liioiteltuna 90 px leveäksi.
 *  • UI: LIVE-pilleri vasemmassa yläkulmassa, ✕ oikeassa (sama harmaa ✕
 *    kuin kuvanäkymässä), ikkunassa Cupola kolmena CSS-kerroksena
 *    (ulko-osat, kehys, heijastus; cover).
 *
 * THREE.JS HEIJASTUKSELLA kuten js/pallolauta/linssit.js: Globe.gl ei vie
 * kirjastoa ulos, joten luokat haetaan näyttämön olioiden konstruktoreista.
 * Jos jotain ei löydy, kaari tai malli jää pois — kyyti toimii silti.
 */

import {
  luoKyyti, kaukoKulma, kameranAsento, tietorivi, TILA, MAAN_SADE_M,
  MALLIN_NAKYMISRAJA_M, MALLIN_LEVEYS_PX, KAAREN_KORKEUS_M, KAAREN_ASTEIKKO_M,
  KAAREN_SIIRTYMA_S, KAAREN_VAALEA, KAAREN_SYVA, KAAREN_YO, TAHDET_KYYDISSA,
} from './iss-kyyti.js';
import { nopeusKmh, RADAN_LAATU, auringonAlihajapiste, jdHetkesta } from './iss-rata.js';

/* ═══════════ CUPOLA ═══════════════════════════════════════════════ */

/**
 * CUPOLAN KUVAT ÄMPÄRISTÄ. Codexin uusi tumma kehys ja ISS:n ulko-osat
 * siluetteina (omistajan päätös 28.9.2026 klo 11.0x) tulevat polkuun
 * karttanostot/20260928/iss-cupola2-*; kun ne ovat ämpärissä, vaihto on
 * YKSI VAKIO: CUPOLA_VERSIO = '20260928'. Siihen asti 26.9. kehys ja
 * heijastus (natiivin 1.0.35:n kuvat). Järjestys takaa eteen kuten
 * natiivissa: ulko-osat, heijastus, kehys (Cupola 2) — vanhassa
 * heijastus on kehyksen päällä, koska se kuvaa lasia kehyksen yllä.
 */
export const CUPOLA_KUVAT = Object.freeze({
  20260928: {
    juuri: 'https://media.matkakirja.app/karttanostot/20260928/',
    kerrokset: [['ulko', 'iss-cupola2-ulkoosat-'], ['heijastus', 'iss-cupola2-heijastus-'], ['kehys', 'iss-cupola2-kehys-']],
  },
  20260926: {
    juuri: 'https://media.matkakirja.app/karttanostot/20260926/',
    kerrokset: [['kehys', 'iss-cupola-kokonainen-'], ['heijastus', 'iss-cupola-heijastus-']],
  },
});
export const CUPOLA_VERSIO = '20260926';

/** Kuvan koko: iPad-kehys leveämmälle ruudulle (natiivi: leveys > 0,5 × korkeus). */
export function cupolanKoko(leveys, korkeus) {
  return leveys > 0.5 * korkeus ? 'ipad-1536x2732' : 'iphone-1206x2622';
}

/** Cupolan kerrosten osoitteet takaa eteen: [{ laji, osoite }]. */
export function cupolanOsoitteet(leveys, korkeus, versio = CUPOLA_VERSIO) {
  const k = CUPOLA_KUVAT[versio] ?? CUPOLA_KUVAT[CUPOLA_VERSIO];
  const koko = cupolanKoko(leveys, korkeus);
  return k.kerrokset.map(([laji, nimi]) => ({ laji, osoite: `${k.juuri}${nimi}${koko}.png` }));
}

/* ═══════════ THREE HEIJASTUKSELLA ═════════════════════════════════ */

function etsiLuokat(pallo) {
  const nayttamo = pallo.scene?.();
  const sade = pallo.getGlobeRadius?.() ?? 100;
  const luokat = { Vector3: pallo.camera?.()?.position?.constructor ?? null };
  nayttamo?.traverse?.((o) => {
    if (o.isMesh && o.geometry?.type === 'SphereGeometry' && !luokat.Sphere) {
      const r = (o.geometry.parameters?.radius ?? 0) * (o.scale?.x ?? 1);
      if (Math.abs(r - sade) < sade * 0.1) {
        luokat.Mesh = o.constructor;
        luokat.Sphere = o.geometry.constructor;
        luokat.Geometry = Object.getPrototypeOf(o.geometry.constructor.prototype)?.constructor ?? null;
        luokat.Attribute = o.geometry.getAttribute?.('position')?.constructor ?? null;
      }
    }
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (!m) continue;
      if (m.type === 'ShaderMaterial' && !luokat.Shader) luokat.Shader = m.constructor;
      if (m.type === 'MeshPhongMaterial' && !luokat.Phong) luokat.Phong = m.constructor;
      if (m.type === 'MeshLambertMaterial' && !luokat.Lambert) luokat.Lambert = m.constructor;
    }
  });
  return luokat;
}

/* ═══════════ ILMAKEHÄN KAARI (natiivi Ilmakaari.shader) ════════════ */

const KAAREN_VERTEX = `
varying vec3 vMaailma;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vMaailma = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const KAAREN_YHTEINEN = `
uniform float uPeitto;
uniform float uR;
uniform float uKorkeus;
uniform float uAsteikko;
uniform float uVaaleaAsteikko;
uniform float uUsvaMatka;
uniform vec3 uVaalea;
uniform vec3 uSyva;
uniform vec3 uAurinko;
uniform float uYo;
varying vec3 vMaailma;
float aurinko(vec3 n) {
  return mix(uYo, 1.0, smoothstep(-0.105, 0.07, dot(n, uAurinko)));
}`;

/* Passi 1 (takapinnat): taivas horisontin yllä — säde ohittaa maan. */
const KAARI_FRAGMENT = `${KAAREN_YHTEINEN}
void main() {
  vec3 o = cameraPosition;
  vec3 d = normalize(vMaailma - cameraPosition);
  float t = -dot(o, d);
  vec3 p = t > 0.0 ? o + d * t : o;
  float h = length(p) - uR;
  if (t <= 0.0 || h < 0.0) discard;
  float a = exp(-h / uAsteikko) * aurinko(normalize(p));
  vec3 vari = mix(uSyva, uVaalea, exp(-h / uVaaleaAsteikko));
  gl_FragColor = vec4(vari, clamp(a * 1.15, 0.0, 1.0) * uPeitto);
}`;

/* Passi 2 (etupinnat): hento usva maan päällä ilmamatkan mukaan. */
const USVA_FRAGMENT = `${KAAREN_YHTEINEN}
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
  gl_FragColor = vec4(uVaalea, a * uPeitto);
}`;

/*
 * YÖKUORI (natiivi Yokuori.shader, Linssiseppä 28.9.2026): pallolla ei ole
 * terminaattoria, joten kyydissä yöpuoli tummuu linssin omalla kuorella
 * 1,012 R (pilvien yllä): peitto 0,82, hämäräkaista aurinko −6° … +2°.
 * Muuten yöllä himmenevä ilmakehän kaari olisi päivänvalossa kylpevän
 * maan yllä ristiriidassa.
 */
export const YOKUOREN_SADE = 1.012;
export const YON_PEITTO = 0.82;
const YO_FRAGMENT = `
uniform float uPeitto;
uniform vec3 uAurinko;
varying vec3 vMaailma;
void main() {
  float s = dot(normalize(vMaailma), uAurinko);
  float yo = 1.0 - smoothstep(-0.105, 0.035, s);
  gl_FragColor = vec4(0.012, 0.02, 0.05, ${YON_PEITTO.toFixed(2)} * yo * uPeitto);
}`;

function rakennaKaari(pallo, luokat) {
  const { Mesh, Sphere, Shader, Vector3 } = luokat;
  if (!Mesh || !Sphere || !Shader || !Vector3) return null;
  const R = pallo.getGlobeRadius?.() ?? 100;
  const m = R / MAAN_SADE_M;
  const geometria = new Sphere(R + KAAREN_KORKEUS_M * m, 96, 48);
  const uniformit = () => ({
    uPeitto: { value: 0 },
    uR: { value: R },
    uKorkeus: { value: KAAREN_KORKEUS_M * m },
    uAsteikko: { value: KAAREN_ASTEIKKO_M * m },
    uVaaleaAsteikko: { value: 6000 * m },
    uUsvaMatka: { value: 900000 * m },
    uVaalea: { value: new Vector3(...KAAREN_VAALEA) },
    uSyva: { value: new Vector3(...KAAREN_SYVA) },
    uAurinko: { value: new Vector3(0, 0, 1) },
    uYo: { value: KAAREN_YO },
  });
  const passi = (fragmentShader, side) => {
    const materiaali = new Shader({
      uniforms: uniformit(),
      vertexShader: KAAREN_VERTEX,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side,
    });
    const mesh = new Mesh(geometria, materiaali);
    mesh.renderOrder = 3;
    mesh.visible = false;
    mesh.userData.issKyyti = true;
    pallo.scene().add(mesh);
    return mesh;
  };
  // three.js: FrontSide = 0, BackSide = 1.
  const kaari = passi(KAARI_FRAGMENT, 1);
  const usva = passi(USVA_FRAGMENT, 0);
  const yoGeometria = new Sphere(R * YOKUOREN_SADE, 96, 48);
  const yo = new Mesh(yoGeometria, new Shader({
    uniforms: { uPeitto: { value: 0 }, uAurinko: { value: new Vector3(0, 0, 1) } },
    vertexShader: KAAREN_VERTEX,
    fragmentShader: YO_FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: 0,
  }));
  yo.renderOrder = 2;
  yo.visible = false;
  yo.userData.issKyyti = true;
  pallo.scene().add(yo);
  const kaikki = [yo, kaari, usva];
  let aurinkoLaskettu = -Infinity;
  return {
    aseta(osuus, ms) {
      const nakyy = osuus > 0.001;
      for (const o of kaikki) o.visible = nakyy;
      if (!nakyy) return;
      for (const o of kaikki) o.material.uniforms.uPeitto.value = osuus;
      // Aurinko liikkuu 0,25°/min: kerran sekunnissa riittää.
      if (Math.abs(ms - aurinkoLaskettu) < 1000) return;
      aurinkoLaskettu = ms;
      const a = auringonAlihajapiste(jdHetkesta(ms));
      const p = pallo.getCoords(a.lat, a.lon, 0);
      const l = Math.hypot(p.x, p.y, p.z) || 1;
      for (const o of kaikki) o.material.uniforms.uAurinko.value.set(p.x / l, p.y / l, p.z / l);
    },
    pura() {
      for (const o of kaikki) {
        o.parent?.remove(o);
        o.material?.dispose?.();
      }
      geometria.dispose?.();
      yoGeometria.dispose?.();
    },
  };
}

/* ═══════════ ISS-MALLI (natiivi IssMalli) ═════════════════════════ */

/** Mallin leveys metreinä (paneelien kärjestä kärkeen), skaalaa varten. */
export const ISS_MALLIN_LEVEYS_M = 110;

/**
 * Proseduraalinen low-poly-ISS (CC0, oma): X = ristikko (sivulle radasta),
 * Z = lentosuunta, Y = zeniitti. Palauttaa { paikat, normaalit, varit }
 * litteinä taulukkoina (sRGB 0…1). Puhdas funktio.
 */
export function issMallinKolmiot() {
  const paikat = [];
  const normaalit = [];
  const varit = [];
  const RISTIKKO = [0x9c / 255, 0x9a / 255, 0x94 / 255];
  const PANEELI = [0xb4 / 255, 0x86 / 255, 0x3a / 255];
  const MODUULI = [0xe8 / 255, 0xe6 / 255, 0xdf / 255];
  const RADIAATTORI = [0xf2 / 255, 0xf2 / 255, 0xee / 255];
  const nelio = (a, b, c, d, n, vari) => {
    for (const p of [a, c, b, b, c, d]) { paikat.push(...p); normaalit.push(...n); varit.push(...vari); }
  };
  const laatikko = ([kx, ky, kz], [sx, sy, sz], vari) => {
    const h = [sx / 2, sy / 2, sz / 2];
    const akselit = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    for (const n of akselit) {
      const u = Math.abs(n[1]) > 0.5 ? [1, 0, 0] : [0, 1, 0];
      const v = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
      const kp = [kx + n[0] * h[0], ky + n[1] * h[1], kz + n[2] * h[2]];
      const uu = u.map((x, i) => x * h[i]);
      const vv = v.map((x, i) => x * h[i]);
      const P = (su, sv) => kp.map((x, i) => x + su * uu[i] + sv * vv[i]);
      nelio(P(-1, -1), P(1, -1), P(-1, 1), P(1, 1), n, vari);
    }
  };
  laatikko([0, 0, 0], [100, 2.6, 2.6], RISTIKKO);
  laatikko([0, -4.5, 4], [4.4, 4.4, 62], MODUULI);
  laatikko([0, -4.5, -32], [4.2, 4.2, 14], MODUULI);
  laatikko([-7, -4.5, 28], [10, 4.2, 4.2], MODUULI);
  laatikko([8.5, -4.5, 28], [13, 4.4, 4.4], MODUULI);
  laatikko([0, -9.5, 10], [4, 5, 4], MODUULI);
  for (const x of [-15, 15]) laatikko([x, -9, 0], [12, 16, 0.4], RADIAATTORI);
  for (const x of [-46, -31, 31, 46]) {
    laatikko([x, 0, 0], [3, 3.2, 3.2], RISTIKKO);
    for (const suunta of [-1, 1]) {
      const z0 = 2 * suunta;
      const z1 = 37 * suunta;
      nelio([x - 6, 0, z0], [x + 6, 0, z0], [x - 6, 0, z1], [x + 6, 0, z1], [0, 1, 0], PANEELI);
    }
  }
  return { paikat, normaalit, varit };
}

function rakennaMalli(pallo, luokat) {
  const { Mesh, Geometry, Attribute, Phong, Lambert } = luokat;
  const Materiaali = Lambert ?? Phong;
  if (!Mesh || !Geometry || !Attribute || !Materiaali) return null;
  const { paikat, normaalit, varit } = issMallinKolmiot();
  const geometria = new Geometry();
  geometria.setAttribute('position', new Attribute(new Float32Array(paikat), 3));
  geometria.setAttribute('normal', new Attribute(new Float32Array(normaalit), 3));
  // Kärkivärit lineaarisina (three.js olettaa lineaarisen tilan).
  geometria.setAttribute('color', new Attribute(new Float32Array(varit.map((c) => c ** 2.2)), 3));
  const materiaali = new Materiaali({ vertexColors: true, side: 2 });
  if ('shininess' in materiaali) materiaali.shininess = 12;
  const mesh = new Mesh(geometria, materiaali);
  mesh.visible = false;
  mesh.renderOrder = 4;
  mesh.userData.issKyyti = true;
  pallo.scene().add(mesh);
  return {
    mesh,
    kolmioita: paikat.length / 9,
    pura() {
      mesh.parent?.remove(mesh);
      geometria.dispose?.();
      materiaali.dispose?.();
    },
  };
}

/* ═══════════ NÄKYMÄ ═══════════════════════════════════════════════ */

export const KYYTI_LUOKKA = 'satelliitti-kyyti';

/**
 * @param {object} p
 * @param {object} p.pallo Globe.gl
 * @param {object} p.kalvo avaruuskalvo (rata, merkki, reunavarjo)
 * @param {object} p.sumu astro-sumu (pilvet matalalle)
 * @param {object} p.issNyt iss-rata.js ISS_NYT
 * @param {() => number} p.paluuKorkeus kaukonäkymän lepokorkeus pallonsäteinä
 * @param {() => void} p.ennenKyytia avausajo ja seuranta pois
 * @param {(korkeus: number) => void} p.kyytiPaattyi kameran korkeus paluun jälkeen
 */
export function luoIssKyytiNakyma({
  pallo, lauta = null, kotelo = null, kalvo = null, sumu = null, reduced = false,
  ikkuna = globalThis, issNyt, paluuKorkeus = () => 3, ennenKyytia = () => {}, kyytiPaattyi = () => {},
} = {}) {
  const doc = ikkuna?.document;
  if (!pallo?.camera || !issNyt || !doc?.createElement) return null;
  const kyyti = luoKyyti();
  const R = pallo.getGlobeRadius?.() ?? 100;
  const metri = R / MAAN_SADE_M;
  const kello = () => (ikkuna.performance?.now?.() ?? Date.now()) / 1000;

  let talteen = null;
  let viimeisin = null;
  let osuus = 0;
  let edellinenT = null;
  let tietoAika = -Infinity;
  let uiTila = TILA.kauko;
  let luokat = null;
  let kaari = null;
  let malli = null;
  let ilmakeha = null;
  let mallinakyy = false;
  let kehysNakyy = false;
  let purettu = false;
  const mittari = { kehyksia: 0, kuvaMs: 0, kuvaMsMax: 0 };

  /* ---- UI ----------------------------------------------------------- */
  let ui = null;
  const rakennaUi = () => {
    if (ui) return ui;
    const juuri = doc.createElement('div');
    juuri.className = 'iss-kyyti';
    juuri.hidden = true;
    const cupola = doc.createElement('div');
    cupola.className = 'iss-kyyti-cupola';
    cupola.setAttribute('aria-hidden', 'true');
    const kosketus = doc.createElement('div');
    kosketus.className = 'iss-kyyti-kosketus';
    const tieto = doc.createElement('div');
    tieto.className = 'iss-kyyti-tieto';
    tieto.setAttribute('role', 'status');
    const piste = doc.createElement('span');
    piste.className = 'iss-kyyti-piste';
    const live = doc.createElement('b');
    live.className = 'iss-kyyti-live';
    live.textContent = 'LIVE';
    const teksti = doc.createElement('span');
    teksti.className = 'iss-kyyti-teksti';
    tieto.append(piste, live, teksti);
    const sulku = doc.createElement('button');
    sulku.type = 'button';
    sulku.className = 'satelliitti-sulku iss-kyyti-sulku';
    sulku.textContent = '×';
    sulku.title = 'Pois kyydistä';
    sulku.setAttribute('aria-label', 'Pois kyydistä');
    juuri.append(cupola, kosketus, tieto, sulku);
    doc.body.appendChild(juuri);

    /*
     * KOSKETUSKERROS: napautus vaihtaa tilaa, kaikki muu nielaistaan
     * (veto, nipistys, rulla). Napautus = alas ja ylös alle 10 px:n ja
     * 600 ms:n päässä, yksi sormi.
     */
    let alas = null;
    let sormia = 0;
    kosketus.addEventListener('pointerdown', (e) => {
      sormia += 1;
      alas = sormia === 1 ? { x: e.clientX, y: e.clientY, t: Date.now() } : null;
      e.preventDefault();
    });
    const ylos = (e) => {
      sormia = Math.max(0, sormia - 1);
      const a = alas;
      alas = null;
      if (!a || e.type !== 'pointerup') return;
      if (Date.now() - a.t > 600 || Math.hypot(e.clientX - a.x, e.clientY - a.y) > 10) return;
      napauta();
    };
    kosketus.addEventListener('pointerup', ylos);
    kosketus.addEventListener('pointercancel', ylos);
    for (const laji of ['wheel', 'touchmove', 'gesturestart', 'gesturechange']) {
      kosketus.addEventListener(laji, (e) => e.preventDefault(), { passive: false });
    }
    sulku.addEventListener('click', (e) => { e.stopPropagation(); poistu(); });

    const kerrokset = new Map();
    let kuvatHaettu = false;
    let kehysOk = null;
    const haeKuvat = () => {
      if (kuvatHaettu) return;
      kuvatHaettu = true;
      const osoitteet = cupolanOsoitteet(ikkuna.innerWidth ?? 390, ikkuna.innerHeight ?? 844);
      for (const { laji, osoite } of osoitteet) {
        const el = doc.createElement('div');
        el.className = `iss-kyyti-${laji}`;
        el.dataset.laji = laji;
        cupola.appendChild(el);
        kerrokset.set(laji, el);
        const kuva = new ikkuna.Image();
        kuva.decoding = 'async';
        kuva.onload = () => {
          el.style.backgroundImage = `url("${osoite}")`;
          el.dataset.ladattu = '1';
          if (laji === 'kehys') kehysOk = true;
        };
        kuva.onerror = () => { if (laji === 'kehys') kehysOk = false; };
        kuva.src = osoite;
      }
    };
    ui = {
      juuri, tieto, piste, live, teksti, sulku, kosketus, cupola, haeKuvat,
      kehysOk: () => kehysOk,
      kerrokset: () => [...kerrokset.values()].map((el) => ({
        laji: el.dataset.laji, ladattu: el.dataset.ladattu === '1',
      })),
    };
    return ui;
  };

  const paivitaTietorivi = (ms) => {
    if (!ui) return;
    const p = issNyt.paikka(ms);
    const arvio = issNyt.laatu(ms) !== RADAN_LAATU.tarkka;
    const r = tietorivi(p.korkeusKm, nopeusKmh(p.korkeusKm), arvio);
    ui.teksti.textContent = r.teksti;
    ui.piste.hidden = !r.live;
    ui.live.hidden = !r.live;
    ui.tieto.classList.toggle('iss-kyyti-tieto-live', r.live);
  };

  /** UI:n tila: auki kyydissä (ei paluussa), Cupola ikkunassa. */
  const paivitaUi = () => {
    const tila = kyyti.tila;
    const u = rakennaUi();
    const auki = tila !== TILA.kauko;
    u.juuri.hidden = !kyyti.kyydissa;
    u.juuri.classList.toggle('iss-kyyti-auki', auki);
    u.juuri.dataset.tila = tila;
    kehysNakyy = tila === TILA.ikkuna;
    u.juuri.classList.toggle('iss-kyyti-ikkuna', kehysNakyy);
    u.juuri.classList.toggle('iss-kyyti-liikkumaton', Boolean(reduced));
    doc.body.classList.toggle(KYYTI_LUOKKA, kyyti.kyydissa);
    if (auki) u.haeKuvat();
    if (tila !== uiTila) tietoAika = -Infinity;
    uiTila = tila;
  };

  /* ---- kamera -------------------------------------------------------- */
  const aloitaKuvaus = () => {
    if (talteen) return;
    const cam = pallo.camera();
    const ohjaimet = pallo.controls?.();
    ennenKyytia();
    talteen = {
      enabled: ohjaimet?.enabled ?? true,
      fov: cam.fov,
      ylos: cam.up ? [cam.up.x, cam.up.y, cam.up.z] : [0, 1, 0],
    };
    if (ohjaimet) ohjaimet.enabled = false;
    if (!luokat) luokat = etsiLuokat(pallo);
    if (!kaari) { try { kaari = rakennaKaari(pallo, luokat); } catch { kaari = null; } }
    if (!malli) { try { malli = rakennaMalli(pallo, luokat); } catch { malli = null; } }
  };

  const asetaKamera = (asento, fov) => {
    const cam = pallo.camera();
    const a = kameranAsento(asento, R);
    cam.position.set(...a.silma);
    cam.up.set(...a.ylos);
    cam.lookAt(...a.kohde);
    if (Math.abs(cam.fov - fov) > 1e-4) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    cam.updateMatrixWorld?.();
    lauta?.heraa?.();
    return a;
  };

  const lopetaKuvaus = () => {
    if (!talteen) return;
    const cam = pallo.camera();
    cam.up.set(...talteen.ylos);
    if (cam.fov !== talteen.fov) {
      cam.fov = talteen.fov;
      cam.updateProjectionMatrix();
    }
    // Katse pallon keskelle kuten OrbitControlsilla (kohde on origo).
    cam.lookAt(0, 0, 0);
    const ohjaimet = pallo.controls?.();
    if (ohjaimet) {
      ohjaimet.enabled = talteen.enabled;
      ohjaimet.update?.();
    }
    talteen = null;
    if (malli) malli.mesh.visible = false;
    mallinakyy = false;
    kyytiPaattyi(pallo.pointOfView?.()?.altitude ?? paluuKorkeus());
    lauta?.heraa?.();
  };

  const hetki = (ms) => {
    const p = issNyt.paikka(ms);
    return { lat: p.lat, lon: p.lon, korkeusM: p.korkeusKm * 1000, suuntima: issNyt.suuntima(ms) };
  };

  /* ---- ilmakehähehku (globe.gl atmosphere) ------------------------- */
  const ilmakehanOlio = () => {
    if (ilmakeha?.parent) return ilmakeha;
    ilmakeha = null;
    pallo.scene?.()?.traverse?.((o) => { if (!ilmakeha && o.__globeObjType === 'atmosphere') ilmakeha = o; });
    return ilmakeha;
  };
  let hehkuPiilotettu = false;
  const asetaHehku = (piiloon) => {
    const o = ilmakehanOlio();
    if (!o) return;
    if (piiloon) {
      o.visible = false;
      hehkuPiilotettu = true;
    } else if (hehkuPiilotettu) {
      hehkuPiilotettu = false;
      o.visible = pallo.__ilmakehaPaalla ?? true;
    }
  };

  /* ---- julkinen ------------------------------------------------------ */
  function napauta() {
    if (purettu || doc.body.classList.contains('satelliitti-kuva-auki')) return false;
    const ms = Date.now();
    const nyt = kello();
    const cam = pallo.camera();
    let nykyinen;
    if (!kyyti.kyydissa) {
      aloitaKuvaus();
      const pov = pallo.pointOfView();
      nykyinen = kaukoKulma(pov.lat, pov.lng, pov.altitude * MAAN_SADE_M, 0, 0);
    } else {
      nykyinen = viimeisin;
      if (kyyti.tila === TILA.kauko) return false; // paluu kesken
    }
    kyyti.napauta(nykyinen, hetki(ms), cam.fov, nyt, reduced);
    paivitaUi();
    return true;
  }

  function poistu() {
    if (purettu || !kyyti.kyydissa || kyyti.tila === TILA.kauko) return false;
    kyyti.poistu(paluuKorkeus() * MAAN_SADE_M, kello(), reduced);
    paivitaUi();
    return true;
  }

  /** Yksi kehys (linssin kehyssilmukka). true = kyyti ohjaa kameraa. */
  function paivita(t) {
    if (purettu) return false;
    const alkoi = ikkuna.performance?.now?.() ?? 0;
    const ms = Date.now();
    const tS = Number.isFinite(t) && t > 0 ? t / 1000 : kello();
    const dt = edellinenT === null ? 0 : Math.max(0, Math.min(0.25, tS - edellinenT));
    edellinenT = tS;
    const tavoite = kyyti.kyydissa && kyyti.tila !== TILA.kauko ? 1 : 0;
    if (osuus !== tavoite) {
      const askel = KAAREN_SIIRTYMA_S > 0 ? dt / KAAREN_SIIRTYMA_S : 1;
      osuus = tavoite > osuus ? Math.min(tavoite, osuus + askel) : Math.max(tavoite, osuus - askel);
    }
    sumu?.kyyti?.(osuus);
    kaari?.aseta(osuus, ms);
    if (osuus > 0.5) asetaHehku(true);
    else asetaHehku(false);

    if (!kyyti.kyydissa) {
      kalvo?.asetaKyyti?.(osuus, true);
      return false;
    }
    const iss = hetki(ms);
    const r = kyyti.paivita(kello(), iss, talteen?.fov ?? 50);
    if (!r) { kalvo?.asetaKyyti?.(osuus, true); return false; }
    viimeisin = r.asento;
    const a = asetaKamera(r.asento, r.kentta);

    /* ISS-malli seurannassa, kun kamera on alle 3 000 km:n päässä. */
    const issP = pallo.getCoords(iss.lat, iss.lon, iss.korkeusM / MAAN_SADE_M);
    const etaisyys = Math.hypot(a.silma[0] - issP.x, a.silma[1] - issP.y, a.silma[2] - issP.z);
    mallinakyy = Boolean(malli) && kyyti.tila === TILA.seuranta && etaisyys < MALLIN_NAKYMISRAJA_M * metri;
    if (malli) {
      malli.mesh.visible = mallinakyy;
      if (mallinakyy) {
        const m = malli.mesh;
        m.position.set(issP.x, issP.y, issP.z);
        const l = Math.hypot(issP.x, issP.y, issP.z) || 1;
        m.up.set(issP.x / l, issP.y / l, issP.z / l);
        // Z maajäljen suuntaan: piste hieman edellä samalla korkeudella.
        const s = iss.suuntima * (Math.PI / 180);
        const la = iss.lat * (Math.PI / 180);
        const eteen = pallo.getCoords(iss.lat + 0.01 * Math.cos(s),
          iss.lon + (0.01 * Math.sin(s)) / Math.max(0.01, Math.cos(la)), iss.korkeusM / MAAN_SADE_M);
        m.lookAt(eteen.x, eteen.y, eteen.z);
        const korkeusPx = kotelo?.clientHeight || ikkuna.innerHeight || 800;
        const cam = pallo.camera();
        const leveys = (MALLIN_LEVEYS_PX * 2 * etaisyys * Math.tan((cam.fov * Math.PI) / 360)) / korkeusPx;
        // Malli on metreinä: skaala vie sen leveyden ruudun 90 px:iin.
        m.scale.setScalar(leveys / ISS_MALLIN_LEVEYS_M);
      }
    }
    kalvo?.asetaKyyti?.(Math.max(osuus, 0.001), kyyti.tila === TILA.seuranta && !mallinakyy);

    /* Tietorivi kerran sekunnissa ja tilan vaihtuessa. */
    if (kyyti.tila !== uiTila) paivitaUi();
    if (ms - tietoAika >= 1000) {
      tietoAika = ms;
      paivitaTietorivi(ms);
    }
    if (r.paluuValmis) {
      kyyti.nollaa();
      lopetaKuvaus();
      osuus = Math.min(osuus, 1);
      paivitaUi();
    }
    const kesti = (ikkuna.performance?.now?.() ?? 0) - alkoi;
    mittari.kehyksia += 1;
    mittari.kuvaMs += kesti;
    mittari.kuvaMsMax = Math.max(mittari.kuvaMsMax, kesti);
    return true;
  }

  return {
    napauta,
    poistu,
    paivita,
    kyydissa: () => kyyti.kyydissa,
    /** Tähtien peitto: 1 kaukonäkymässä, 0,3 kyydissä (liukuen). */
    tahdet: () => 1 + (TAHDET_KYYDISSA - 1) * osuus,
    tila: () => {
      const cam = pallo.camera?.();
      return {
        tila: kyyti.tila,
        kyydissa: kyyti.kyydissa,
        siirtyy: kyyti.siirtyy,
        osuus: +osuus.toFixed(3),
        fov: cam ? +cam.fov.toFixed(2) : null,
        ohjaimet: pallo.controls?.()?.enabled ?? null,
        malli: mallinakyy,
        mallinKolmioita: malli?.kolmioita ?? 0,
        kaari: Boolean(kaari),
        kehys: kehysNakyy,
        kehysOk: ui?.kehysOk?.() ?? null,
        kerrokset: ui?.kerrokset?.() ?? [],
        tieto: ui && !ui.juuri.hidden ? ui.tieto.textContent : null,
        live: ui ? !ui.live.hidden : null,
        radanLaatu: issNyt.laatu(Date.now()),
        tle: issNyt.tle ? { epookkiJd: issNyt.tle.epookkiJd, haettu: issNyt.tle.haettu } : null,
        kehyksia: mittari.kehyksia,
        kuvaMsKa: mittari.kehyksia ? +(mittari.kuvaMs / mittari.kehyksia).toFixed(3) : 0,
        kuvaMsMax: +mittari.kuvaMsMax.toFixed(3),
      };
    },
    pura() {
      if (purettu) return;
      if (kyyti.kyydissa) {
        kyyti.nollaa();
        lopetaKuvaus();
      }
      purettu = true;
      asetaHehku(false);
      sumu?.kyyti?.(0);
      kaari?.pura?.();
      malli?.pura?.();
      ui?.juuri?.remove?.();
      doc.body.classList.remove(KYYTI_LUOKKA);
    },
  };
}
