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
  luoKyyti, kaukoKulma, kameranAsento, tietorivi, ylilennonTeksti, TILA, MAAN_SADE_M, KAUKOON_S,
  MALLIN_NAKYMISRAJA_M, MALLIN_LEVEYS_PX, KAAREN_KORKEUS_M, KAAREN_ASTEIKKO_M,
  KAAREN_SIIRTYMA_S, KAAREN_VAALEA, KAAREN_SYVA, KAAREN_YO, TAHDET_KYYDISSA,
  kaari as keskuskulma, // nimiristiriita: näkymän oma `kaari`-muuttuja on ilmakehän kaaren piirtokahva.
} from './iss-kyyti.js';
import {
  nopeusKmh, RADAN_LAATU, auringonAlihajapiste, jdHetkesta, SIMUKELLO, NOPEUDET, seuraavaYlilento,
} from './iss-rata.js';
import { SATELLIITTI_KOHTEET } from './satelliitti-data.js';
import { KUUKAUSINIMET } from './maapallon-vuosi.js';

/* ═══════════ CUPOLA ═══════════════════════════════════════════════ */

/**
 * CUPOLAN KUVAT ÄMPÄRISTÄ. Codexin uusi tumma kehys ja ISS:n ulko-osat
 * siluetteina (omistajan päätös 28.9.2026 klo 11.0x) tulevat polkuun
 * karttanostot/20260928/iss-cupola2-*; vaihto on YKSI VAKIO (CUPOLA_VERSIO).
 * Voimassa pehmeä versio (omistaja 28.9.2026 klo 14.1x, Linssiseppä):
 * kupola epäterävä, ISS-osat hillitympiä, rae — kaikki poltettu kuviin.
 * 26.9. kehys ja heijastus jäävät taulukkoon. Järjestys takaa eteen kuten
 * natiivissa: ulko-osat, heijastus, kehys (Cupola 2) — vanhassa
 * heijastus on kehyksen päällä, koska se kuvaa lasia kehyksen yllä.
 */
export const CUPOLA_KUVAT = Object.freeze({
  // Pehmeä Cupola 2 (omistaja hyväksyi 28.9.2026 klo 14.1x): syväterävyys ja rae poltettu kuviin, sama
  // alfamaski ja kerrosjärjestys kuin terävässä; ei ajonaikaista sumennusta.
  '20260928-pehmea': {
    juuri: 'https://media.matkakirja.app/karttanostot/20260928/',
    kerrokset: [['ulko', 'iss-cupola2-pehmea-ulkoosat-'], ['heijastus', 'iss-cupola2-pehmea-heijastus-'], ['kehys', 'iss-cupola2-pehmea-kehys-']],
  },
  20260928: {
    juuri: 'https://media.matkakirja.app/karttanostot/20260928/',
    kerrokset: [['ulko', 'iss-cupola2-ulkoosat-'], ['heijastus', 'iss-cupola2-heijastus-'], ['kehys', 'iss-cupola2-kehys-']],
  },
  20260926: {
    juuri: 'https://media.matkakirja.app/karttanostot/20260926/',
    kerrokset: [['kehys', 'iss-cupola-kokonainen-'], ['heijastus', 'iss-cupola-heijastus-']],
  },
  /*
   * CUPOLA 3 (omistaja 28.9.2026 klo 22.5x: "voisiko ennemmin käyttää sitä pyöreää ikkunaa ja rajata se lähelle?";
   * Codexin toimitus, natiivi linssiseppa/cupola3 c2645317, suunnitelma iss-realismi-suunnitelma-20260928.md §5):
   * valmiiksi rajattu tumma ohjaamo pyöreällä kattoikkunalla, sen alla hyvin heikko lasi ja päällä kolme kapeaa
   * reunavaloa (luode, koillinen, lounas). Ulko-osia ei ole. a = keskitetty (oletus), b = hieman vino.
   */
  /*
   * Linssisepän jälkikäsittely natiivin kanssa samaksi (29.9.2026, "pehmea-umpi"): ohjaamon alfa ≥ 240 → 255 (maa
   * kuulsi 245–254-alfaisen metallin läpi; Natiivisepän juurisyy), kevyt sumennus ~2 näyttö-px, reunavalot huippuunsa.
   */
  'cupola3-a': {
    juuri: 'https://media.matkakirja.app/karttanostot/20260928/',
    malli: 3,
    kerrokset: [['heijastus', 'iss-cupola3-a-pehmea-umpi-glass-'], ['kehys', 'iss-cupola3-a-pehmea-umpi-cockpit-'],
      ['valo-nw', 'iss-cupola3-a-pehmea-umpi-sun-nw-'], ['valo-ne', 'iss-cupola3-a-pehmea-umpi-sun-ne-'],
      ['valo-sw', 'iss-cupola3-a-pehmea-umpi-sun-sw-']],
  },
  'cupola3-b': {
    juuri: 'https://media.matkakirja.app/karttanostot/20260928/',
    malli: 3,
    kerrokset: [['heijastus', 'iss-cupola3-b-glass-'], ['kehys', 'iss-cupola3-b-cockpit-'],
      ['valo-nw', 'iss-cupola3-b-sun-nw-'], ['valo-ne', 'iss-cupola3-b-sun-ne-'], ['valo-sw', 'iss-cupola3-b-sun-sw-']],
  },
});
export const CUPOLA_VERSIO = 'cupola3-a';

/** Cupola 3: iPadin vaakakuva, kun pitkä / lyhyt sivu < 1,75 (natiivi IssKuvakulma.Cupola3IpadRaja). */
export const CUPOLA3_IPAD_RAJA = 1.75;
/** Cupola 3: suurennos ruudun yli (cover × 1,04), jotta ikkuna pysyy pyöreänä eikä heilunta paljasta reunaa. */
export const CUPOLA3_YLI = 1.04;
const CUPOLA3_KEILA = 0.35;
const R2 = Math.SQRT1_2;
/** Reunavalojen puolet kuvassa (x oikealle, y ylös): luode, koillinen, lounas (kerrosten järjestys). */
const CUPOLA3_REUNAT = [[-R2, R2], [R2, R2], [-R2, -R2]];

/**
 * Cupola 3:n kuva laitteen muodosta ja kääntö (natiivi IssKuvakulma.Cupola3Kuva): iPadin vaakakuva 2732 × 2048
 * neliömäisemmälle ruudulle, muuten iPhonen pystykuva 1290 × 2796; kuva käännetään 90°, kun ruutu on eri asennossa
 * (iPhone vaaka, iPad pysty), jolloin ikkuna pysyy pyöreänä ja täyttää lyhyemmän sivun.
 */
export function cupola3Kuva(leveys, korkeus) {
  const pitka = Math.max(leveys, korkeus); const lyhyt = Math.min(leveys, korkeus);
  const ipad = lyhyt > 0 && pitka / lyhyt < CUPOLA3_IPAD_RAJA;
  return { ipad, kaanna: ipad ? korkeus > leveys : leveys > korkeus };
}

/**
 * Cupola 3:n reunavalojen painot 0…1 (natiivi IssKuvakulma.Cupola3Valot): aurinko kuvan suunnassa (x oikealle, y ylös),
 * valo tulee lasin läpi ja osuu karmin sisäreunaan auringon VASTAKKAISELLA puolella; pehmeä keila 0,35. Aurinko suoraan
 * edessä tai takana (xy alle 0,001): ei reunavaloa.
 */
export function cupola3Valot(x, y) {
  const l = Math.hypot(x, y);
  return CUPOLA3_REUNAT.map(([rx, ry]) => (l < 1e-3 ? 0 : Math.max(0, (-(x * rx + y * ry) / l + CUPOLA3_KEILA) / (1 + CUPOLA3_KEILA))));
}

const pehmea01 = (t) => { const u = Math.min(1, Math.max(0, t)); return u * u * (3 - 2 * u); };
/** ISS auringossa 0…1 (natiivi CupolanValo.Aurinkoisuus): ylös · aurinko verrattuna maan varjon rajaan ISS:n korkeudella. */
export function aurinkoisuus(ylosDotAurinko, korkeusKm) {
  const r = 6371 / (6371 + Math.max(0, korkeusKm));
  return pehmea01((ylosDotAurinko + Math.sqrt(Math.max(0, 1 - r * r))) / 0.02 + 0.5);
}

/**
 * Reunavalojen läpinäkyvyydet (natiivi IssKyytiNakyma.PaivitaReunavalo, Cupola 3): aurinko kameran suunnissa
 * (x oikealle, y ylös, yksikkövektori), ISS:n aurinkoisuus ja kuvan kääntö → [luode, koillinen, lounas].
 */
export function cupola3Opasiteetit([x, y], aurinkoOsuus, kaanna) {
  const s = kaanna ? [-y, x] : [x, y];
  const sivu = Math.hypot(s[0], s[1]);
  const voima = 0.95 * Math.min(1, Math.max(0, aurinkoOsuus)) * (0.45 + 0.55 * Math.min(1, Math.max(0, sivu * 1.4)));
  return cupola3Valot(s[0], s[1]).map((p) => Math.min(1, Math.max(0, voima * p)));
}

/** Kuvan koko: iPad-kehys leveämmälle ruudulle (natiivi: leveys > 0,5 × korkeus); Cupola 3:lla oma valinta. */
export function cupolanKoko(leveys, korkeus, malli = 2) {
  if (malli === 3) return cupola3Kuva(leveys, korkeus).ipad ? 'ipad-2732x2048' : 'iphone-1290x2796';
  return leveys > 0.5 * korkeus ? 'ipad-1536x2732' : 'iphone-1206x2622';
}

/** Cupolan kerrosten osoitteet takaa eteen: [{ laji, osoite }]. */
export function cupolanOsoitteet(leveys, korkeus, versio = CUPOLA_VERSIO) {
  const k = CUPOLA_KUVAT[versio] ?? CUPOLA_KUVAT[CUPOLA_VERSIO];
  const koko = cupolanKoko(leveys, korkeus, k.malli ?? 2);
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
/**
 * Piirtojärjestys (three.js renderOrder) läpikuultaville kyydin kuorille:
 * pilvet 2 (astro-sumu) → NASA-kuvakoe 2,5 → yökuori → ilmakehän kaari 3.
 * Vakio, jotta realismimoduuli (Siirtoseppä, js/linssit/iss-realismi.js)
 * voi asettua väliin.
 */
export const YOKUOREN_JARJESTYS = 2.8;
export const KAAREN_JARJESTYS = 3;
export const NASA_KOE_JARJESTYS = 2.5;
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

/**
 * Ilmakehän kaari, usva ja yökuori. Realismimoduulin korvaa-liput
 * (Siirtoseppä 28.9.2026, natiivin Ilmakaari- ja Yokuori-shaderit):
 * `ilmanKaarta` jättää kaaren ja usvan rakentamatta, `ilmanYota` yökuoren.
 * Kun kumpaakaan ei rakenneta, palauttaa null.
 */
function rakennaKaari(pallo, luokat, { ilmanKaarta = false, ilmanYota = false } = {}) {
  if (ilmanKaarta && ilmanYota) return null;
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
    mesh.renderOrder = KAAREN_JARJESTYS;
    mesh.visible = false;
    mesh.userData.issKyyti = true;
    pallo.scene().add(mesh);
    return mesh;
  };
  // three.js: FrontSide = 0, BackSide = 1.
  const kaari = ilmanKaarta ? null : passi(KAARI_FRAGMENT, 1);
  const usva = ilmanKaarta ? null : passi(USVA_FRAGMENT, 0);
  const yoGeometria = ilmanYota ? null : new Sphere(R * YOKUOREN_SADE, 96, 48);
  const yo = ilmanYota ? null : new Mesh(yoGeometria, new Shader({
    uniforms: { uPeitto: { value: 0 }, uAurinko: { value: new Vector3(0, 0, 1) } },
    vertexShader: KAAREN_VERTEX,
    fragmentShader: YO_FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: 0,
  }));
  if (yo) {
    yo.renderOrder = YOKUOREN_JARJESTYS;
    yo.visible = false;
    yo.userData.issKyyti = true;
    pallo.scene().add(yo);
  }
  const kaikki = [yo, kaari, usva].filter(Boolean);
  let aurinkoLaskettu = -Infinity;
  return {
    /** Auringon suunta näyttämössä (uAurinko, yksikkövektori). */
    aurinko: () => kaikki[0].material.uniforms.uAurinko.value,
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
      if (kaari) geometria.dispose?.();
      yoGeometria?.dispose?.();
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

/* ═══════════ YLILENNON KOHTEET (vain Eurooppa) ═════════════════════ */

/**
 * "LENNÄ KOHTEEN YLLE" -VALIKON KOHTEET (omistaja 28.9.2026 klo 12.1x;
 * VAIN EUROOPPA 27.9.): Astronautin kameran omat NASA-kohteet Euroopan
 * rajauksella (leveys 34–72°, pituus −25…45°). Samat kohteet, joiden
 * astronauttikuvat pelaaja jo selaa, joten ylilento vie kuvan paikalle ja
 * NASA-kuvakoe käyttää samaa kuvaa. Pois vain kohteet, joiden yli ISS ei
 * lennä (51,6°:n rata näkee enintään noin 56°N 500 km:n rajalla):
 * revontulet 60°N.
 */
export const YLILENNON_ALUE = Object.freeze({ lat: [34, 72], lon: [-25, 45] });
export const YLILENNON_MAKSIMILEVEYS = 56;

export function ylilennonKohteet(kohteet = SATELLIITTI_KOHTEET) {
  const { lat, lon } = YLILENNON_ALUE;
  return (kohteet ?? [])
    .filter((k) => Number.isFinite(k.lat) && Number.isFinite(k.lon)
      && k.lat >= lat[0] && k.lat <= lat[1] && k.lon >= lon[0] && k.lon <= lon[1]
      && Math.abs(k.lat) <= YLILENNON_MAKSIMILEVEYS)
    .map((k) => ({ tunnus: k.tunnus, nimi: k.nimi, lat: k.lat, lon: k.lon }))
    .sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi'));
}

/*
 * ═══════════ ISS-SÄÄTÖPANEELI (Codex-elementtisarja 28.9.2026, kytkentä 29.9.2026) ═══════════
 *
 * Omistajan asettelumuutos 29.9.2026 (korvaa Linssisepän suosituksen alkuperäisen kohtien 2–6 asettelun; sovittu
 * natiivin kanssa, natiivi tehty samalla mallilla): yksi paneeli vasemmassa yläkulmassa, rivi 1 lento-lukema +
 * kutistusnappi, rivi 2 kolme osiota (Nopeus/Kohde/Olosuhteet), rivi 3 valitun osion sisältö. Codexin paketti:
 * assets/iss-saatopaneeli/ (21 tekstivapaata SVG:tä, 9-slice panel/button-row/readout, segment-cell, slider-track +
 * -thumb, close). Kaikki tekstit ovat HTML:ää kuvien päällä.
 */

/** Paneelin kolme osiota (rivi 2), tässä järjestyksessä; oletus 'nopeus'. */
export const PANEELIN_OSIOT = Object.freeze(['nopeus', 'kohde', 'olosuhteet']);
/** sessionStorage-avain paneelin kutistustilalle (säilyy istunnon ajan, ei laitteiden välillä). */
export const PANEELI_TILA_AVAIN = 'matkakirja-iss-paneeli-kiinni';
/** Asteen pituus kilometreinä pallon isoympyrällä (sama vakio kuin iss-rata.js maaEtaisyysKm). */
export const ASTE_KM = 111.195;

/** Kuukausi (1…12) käytössä: pakotettu, tai simuloidun ajan kuukausi (UTC). Sama sääntö kuin iss-realismi-taivas.js
 * kuukaudenPinta()-kerroksen ab.pakotettu — puhdas kopio testattavuutta ja UI:ta varten. */
export function kuukausiNyt(pakotettu, ms) {
  return pakotettu >= 1 && pakotettu <= 12 ? Math.round(pakotettu) : new Date(ms).getUTCMonth() + 1;
}

/** Kuukauden suomenkielinen nimi (1 = tammikuu … 12 = joulukuu, rajattuna). */
export function kuukaudenNimi(kk) {
  const i = Math.max(1, Math.min(12, Math.round(kk))) - 1;
  return KUUKAUSINIMET[i];
}

/** Vuodenaika-rivin otsikko: "syyskuu (nyt)" simuloidun kuukauden kohdalla, muuten pelkkä kuukauden nimi. */
export function vuodenaikaTeksti(pakotettu, ms) {
  const kk = kuukausiNyt(pakotettu, ms);
  const simKk = new Date(ms).getUTCMonth() + 1;
  return kk === simKk ? `${kuukaudenNimi(kk)} (nyt)` : kuukaudenNimi(kk);
}

/** Pilvipeitto-rivin otsikko: "nyt" 100 %:ssa (oletus), "selkeä" 0 %:ssa, muuten prosenttiluku. */
export function pilvipeittoTeksti(prosentti) {
  const p = Math.round(Math.max(0, Math.min(100, prosentti)));
  if (p >= 100) return 'nyt';
  if (p <= 0) return 'selkeä';
  return `${p} %`;
}

/** Pilvipeitto-liu'un prosentti (0…100) realismin pilvimääräksi (0…1, iss-realismi-kerrokset.js pilvet ab.maara). */
export function pilvipeittoMaaraksi(prosentti) {
  return Math.max(0, Math.min(1, prosentti / 100));
}

/* ── Oma sijainti (Kohde-osio) ──────────────────────────────────────
 * Maa haetaan mediaämpärin cdn-cgi/trace-riviltä (loc=<ISO 3166-1 alpha-2>), ja keskipisteeksi otetaan maan
 * pääkaupunki repon omasta maakartta-aineistosta (js/packs/maakartat.js MAAKARTAT[<alpha-3>].kaupungit, paa:true) —
 * ainoa valmis lat/lon-taulu maittain. Taulu kattaa MAAKARTAT:n 43 maata; tuntematon koodi jättää "Oma sijainti"
 * -vaihtoehdon pois valikosta (raportoitu Siirtosepän luovutuksessa, ei omaa virheilmoitusta pelaajalle).
 */
export const OMA_SIJAINTI_OSOITE = 'https://media.matkakirja.app/cdn-cgi/trace';

/** MAAKARTAT-taulun kattamat maat: ISO 3166-1 alpha-2 (cdn-cgi/trace loc=) → alpha-3. */
export const OMA_MAA_ALPHA2_ALPHA3 = Object.freeze({
  EG: 'EGY', GB: 'GBR', DE: 'DEU', IT: 'ITA', ES: 'ESP', SE: 'SWE', FR: 'FRA', NL: 'NLD', CZ: 'CZE', PL: 'POL',
  AT: 'AUT', CH: 'CHE', NO: 'NOR', DK: 'DNK', LV: 'LVA', LT: 'LTU', FI: 'FIN', EE: 'EST', IS: 'ISL', IE: 'IRL',
  PT: 'PRT', GR: 'GRC', TR: 'TUR', HU: 'HUN', RO: 'ROU', BG: 'BGR', HR: 'HRV', BA: 'BIH', UA: 'UKR', RU: 'RUS',
  AE: 'ARE', OM: 'OMN', KW: 'KWT', QA: 'QAT', SA: 'SAU', YE: 'YEM', CY: 'CYP', SY: 'SYR', IQ: 'IRQ', IR: 'IRN',
  US: 'USA', NZ: 'NZL', BR: 'BRA', AU: 'AUS', AR: 'ARG',
});

/** cdn-cgi/trace-vastauksen (avain=arvo per rivi) loc-koodi ISO 3166-1 alpha-2:na, tai null. Puhdas. */
export function jasennaTraceLoc(teksti) {
  const rivi = String(teksti ?? '').split('\n').find((r) => r.startsWith('loc='));
  const koodi = rivi?.slice(4).trim().toUpperCase();
  return koodi && /^[A-Z]{2}$/.test(koodi) ? koodi : null;
}

/**
 * ISS:n rata näkee enintään noin ±56° (YLILENNON_MAKSIMILEVEYS, 51,6°:n inklinaatio + 500 km:n raja): jos maan
 * keskipiste on kauempana, ylilennon haku käyttää leveyttä ±51° samalla pituudella. Puhdas.
 */
export function omanSijainninHakupiste(lat, lon) {
  return Math.abs(lat) > YLILENNON_MAKSIMILEVEYS ? { lat: Math.sign(lat) * 51, lon } : { lat, lon };
}

/** Maan pääkaupungin sijainti MAAKARTAT-taulusta (js/packs/maakartat.js), tai null. Puhdas. */
export function omanMaanKeskipiste(alpha3, maakartat) {
  const paa = maakartat?.[alpha3]?.kaupungit?.find((k) => k.paa);
  return paa ? { lat: paa.lat, lon: paa.lon, nimi: paa.nimi } : null;
}

/**
 * "Oma sijainti" -kohde valikkoon: haku, alpha2 → alpha3 ja pääkaupunki yhdessä.
 * Palauttaa { tunnus: 'oma', nimi, lat, lon, oikeaLat, oikeaLon, maa } (lat/lon = hakupiste ylilennolle,
 * oikeaLat/oikeaLon = maan oikea keskipiste etäisyyden näyttöä varten) tai null, jos jokin vaihe epäonnistuu.
 * `tuoMaakartat` on parametrisoitu testattavuuden vuoksi — moduuli on yli 16 000 riviä eikä sitä ladata turhaan.
 */
export async function haeOmaSijainti({
  ikkuna = globalThis, osoite = OMA_SIJAINTI_OSOITE, tuoMaakartat = () => import('../packs/maakartat.js'),
} = {}) {
  try {
    const f = ikkuna.fetch?.bind(ikkuna);
    if (!f) return null;
    const vastaus = await f(osoite, { mode: 'cors', credentials: 'omit' });
    if (!vastaus?.ok) return null;
    const koodi2 = jasennaTraceLoc(await vastaus.text());
    const alpha3 = koodi2 ? OMA_MAA_ALPHA2_ALPHA3[koodi2] : null;
    if (!alpha3) return null;
    const { MAAKARTAT } = await tuoMaakartat();
    const oma = omanMaanKeskipiste(alpha3, MAAKARTAT);
    if (!oma) return null;
    const haku = omanSijainninHakupiste(oma.lat, oma.lon);
    return {
      tunnus: 'oma', nimi: 'Oma sijainti', lat: haku.lat, lon: haku.lon, oikeaLat: oma.lat, oikeaLon: oma.lon, maa: oma.nimi,
    };
  } catch { return null; }
}

/* ═══════════ NASA-KUVAKOE (omistaja 28.9.2026 klo 12.1x, KOE) ═══════ */

/*
 * Kohteen yllä Astronautin kameran oma NASA-kuva häivytetään piirretyn
 * maapallon päälle oikeaan kohtaan. Kuvilla ei ole jalanjälkimetatietoa
 * (vain NASA-tunnus), joten KALIBROINTI ON KÄSIN: keskipiste, maastoleveys
 * (km) ja kierto (kuvan "ylös" asteina pohjoisesta myötäpäivään) katsottu
 * kuvasta ja kartasta. Kuva on tasainen pala pallokuorella (ei
 * perspektiivikorjausta vinoille kuville), reunat häivytetty.
 * Päällä vain ?koe=nasakuva (tai kahvan nasaKoe(true)).
 */
export const NASA_KOE = Object.freeze({
  venetsia: { kuva: 'iss014e17346', lat: 45.432, lon: 12.330, leveysKm: 15, kierto: 0 },
  dardanellit: { kuva: 'iss014e08138', lat: 40.18, lon: 26.45, leveysKm: 80, kierto: 0 },
  santorini: { kuva: 'iss017e005037', lat: 36.415, lon: 25.415, leveysKm: 17, kierto: -20 },
});
export const NASA_KOE_PEITTO = 0.95;
/*
 * Kuori 0,5 km:n korkeudella: kapealla kenttäkulmalla ja vinosti katsottuna
 * 10 km:n kuori (linssikalvojen oletus) näkyi 1. ajossa kymmeniä km
 * horisonttiin päin siirtyneenä (parallaksi). Syvyyssiirto pitää sen
 * laattojen päällä.
 */
const NASA_KOE_SADE = 1 + 0.5 / 6371;

/** Kierretyn kuvan rajauslaatikko (km) ja pallon ikkuna asteina. Puhdas. */
export function nasaKoeIkkuna(k, kuvasuhde) {
  const w = k.leveysKm;
  const h = w / (kuvasuhde || 1.5);
  const a = (k.kierto * Math.PI) / 180;
  const bw = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
  const bh = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a));
  const dLat = bh / 2 / 111.195;
  const dLon = bw / 2 / (111.195 * Math.cos((k.lat * Math.PI) / 180));
  return {
    leveysKm: bw, korkeusKm: bh,
    ikkuna: { lat0: k.lat - dLat, lat1: k.lat + dLat, lng0: k.lon - dLon, lng1: k.lon + dLon },
  };
}

export function nasaKoeKaytossa(ikkuna = globalThis) {
  try {
    const arvo = new URLSearchParams(ikkuna?.location?.search ?? '').get('koe') ?? '';
    return arvo.split(',').map((x) => x.trim()).includes('nasakuva');
  } catch { return false; }
}

/** NASA-kuva kankaalle pohjoinen ylös, kierrettynä ja reunat häivytettyinä. */
async function nasaKoeKangas(k, ikkuna) {
  const kohde = SATELLIITTI_KOHTEET.find((x) => (x.havainnot ?? []).some((h) => h.id === k.kuva));
  const havainto = kohde?.havainnot?.find((h) => h.id === k.kuva);
  if (!havainto?.kuva || typeof ikkuna.createImageBitmap !== 'function') return null;
  const vastaus = await ikkuna.fetch(havainto.kuva, { mode: 'cors', credentials: 'omit' });
  if (!vastaus?.ok) return null;
  const kuva = await ikkuna.createImageBitmap(await vastaus.blob());
  const suhde = kuva.width / kuva.height;
  const { leveysKm, korkeusKm } = nasaKoeIkkuna(k, suhde);
  const pxKm = kuva.width / k.leveysKm;
  const kangas = ikkuna.document.createElement('canvas');
  kangas.width = Math.min(2048, Math.round(leveysKm * pxKm));
  kangas.height = Math.min(2048, Math.round(korkeusKm * pxKm));
  const mitta = kangas.width / (leveysKm * pxKm);
  const ctx = kangas.getContext('2d');
  // Kuva omalle kankaalleen reunat häivytettyinä (6 % joka reunalta).
  const pala = ikkuna.document.createElement('canvas');
  pala.width = kuva.width;
  pala.height = kuva.height;
  const p = pala.getContext('2d');
  p.drawImage(kuva, 0, 0);
  kuva.close?.();
  p.globalCompositeOperation = 'destination-in';
  const reuna = 0.06;
  const vaaka = p.createLinearGradient(0, 0, pala.width, 0);
  vaaka.addColorStop(0, 'rgba(0,0,0,0)'); vaaka.addColorStop(reuna, '#000');
  vaaka.addColorStop(1 - reuna, '#000'); vaaka.addColorStop(1, 'rgba(0,0,0,0)');
  p.fillStyle = vaaka;
  p.fillRect(0, 0, pala.width, pala.height);
  const pysty = p.createLinearGradient(0, 0, 0, pala.height);
  pysty.addColorStop(0, 'rgba(0,0,0,0)'); pysty.addColorStop(reuna, '#000');
  pysty.addColorStop(1 - reuna, '#000'); pysty.addColorStop(1, 'rgba(0,0,0,0)');
  p.fillStyle = pysty;
  p.fillRect(0, 0, pala.width, pala.height);
  ctx.translate(kangas.width / 2, kangas.height / 2);
  ctx.rotate((k.kierto * Math.PI) / 180);
  ctx.scale(mitta, mitta);
  ctx.drawImage(pala, -pala.width / 2, -pala.height / 2);
  return { kangas, ikkuna: nasaKoeIkkuna(k, suhde).ikkuna };
}

/**
 * @param {object} p
 * @param {object} p.pallo Globe.gl
 * @param {object} p.kalvo avaruuskalvo (rata, merkki, reunavarjo)
 * @param {object} p.sumu astro-sumu (pilvet matalalle)
 * @param {object} p.issNyt iss-rata.js ISS_NYT
 * @param {() => number} p.paluuKorkeus kaukonäkymän lepokorkeus pallonsäteinä
 * @param {() => void} p.ennenKyytia avausajo ja seuranta pois
 * @param {(korkeus: number) => void} p.kyytiPaattyi kameran korkeus paluun jälkeen
 * @param {object|null} p.realismi Siirtosepän realismimoduuli (js/linssit/iss-realismi.js):
 *   rakenna({ pallo, luokat, metri, R }), paivita({ osuus, ms, tila, iss, silma, kamera }), pura();
 *   korvaa = { kaari, yokuori, pilvet }: näkymä ei rakenna kaarta+usvaa / yökuorta, ja astro-sumun pilvikuori
 *   piilotetaan kyydin ajaksi (avaruussumun häivytys jää). Realismi piirtää omansa järjestyksillä
 *   KAAREN_JARJESTYS, YOKUOREN_JARJESTYS ja 2 (pilvet) ja laskee auringon itse.
 * @param {object} p.kello simuloitu kello (iss-rata.js SIMUKELLO)
 */
export function luoIssKyytiNakyma({
  pallo, lauta = null, kotelo = null, kalvo = null, sumu = null, reduced = false,
  ikkuna = globalThis, issNyt, paluuKorkeus = () => 3, ennenKyytia = () => {}, kyytiPaattyi = () => {},
  realismi = null, kello: simu = SIMUKELLO, nasaKoe = null,
} = {}) {
  const doc = ikkuna?.document;
  if (!pallo?.camera || !issNyt || !doc?.createElement) return null;
  const kyyti = luoKyyti();
  const R = pallo.getGlobeRadius?.() ?? 100;
  const metri = R / MAAN_SADE_M;
  const kello = () => (ikkuna.performance?.now?.() ?? Date.now()) / 1000;
  const kohteet = ylilennonKohteet();

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
  let realismiRakennettu = false;
  let ylilento = null;
  let koePaalla = nasaKoe ?? nasaKoeKaytossa(ikkuna);
  let koe = null;
  const mittari = { kehyksia: 0, kuvaMs: 0, kuvaMsMax: 0, realismiVirheita: 0 };

  // Realismin korvaa.pilvet: astro-sumun pilvikuori pois kyydin ajaksi (visible-lippu; vain muutoksessa).
  let omatPilvetPiilossa = false;
  const asetaOmatPilvet = (piiloon) => {
    if (piiloon === omatPilvetPiilossa) return;
    omatPilvetPiilossa = piiloon;
    sumu?.piilotaPilvet?.(piiloon);
  };
  const realismiKutsu = (nimi, arg) => {
    if (!realismi?.[nimi]) return;
    try { realismi[nimi](arg); } catch (e) {
      mittari.realismiVirheita += 1;
      if (mittari.realismiVirheita === 1) { try { console.warn('ISS-realismi:', e); } catch { /* ei konsolia */ } }
    }
  };

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

    /*
     * SÄÄTÖPANEELI (Codex-elementtisarja, omistajan asettelumuutos 29.9.2026): rivi 1 lento-lukema (nykyinen
     * `tieto`) + kutistusnappi, rivi 2 kolme osiota (Nopeus/Kohde/Olosuhteet), rivi 3 valitun osion sisältö.
     * Vain yksi osio kerrallaan auki; kutistettuna vain rivi 1 näkyy. Kutistustila säilyy istunnon ajan
     * (sessionStorage try/catchissa — yksityinen tila tms. jättää sen oletukseen).
     */
    const paneeli = doc.createElement('div');
    paneeli.className = 'iss-kyyti-paneeli';

    const rivi1 = doc.createElement('div');
    rivi1.className = 'iss-kyyti-rivi1';
    const kutista = doc.createElement('button');
    kutista.type = 'button';
    kutista.className = 'iss-kyyti-kutista';
    let kiinni = false;
    try { kiinni = ikkuna.sessionStorage?.getItem(PANEELI_TILA_AVAIN) === '1'; } catch { kiinni = false; }
    const asetaKiinni = (k) => {
      kiinni = k;
      paneeli.classList.toggle('iss-kyyti-paneeli-kiinni', k);
      kutista.setAttribute('aria-expanded', String(!k));
      kutista.setAttribute('aria-label', k ? 'Avaa säätimet' : 'Kutista säätimet');
      try { ikkuna.sessionStorage?.setItem(PANEELI_TILA_AVAIN, k ? '1' : '0'); } catch { /* yksityinen tila tms. */ }
    };
    kutista.addEventListener('click', (e) => { e.stopPropagation(); asetaKiinni(!kiinni); });
    rivi1.append(tieto, kutista);

    /* Rivi 2: osiot Nopeus | Kohde | Olosuhteet — yksi auki kerrallaan, oletus Nopeus. */
    const osioRivi = doc.createElement('div');
    osioRivi.className = 'iss-kyyti-osiot';
    osioRivi.setAttribute('role', 'tablist');
    const OSION_NIMI = { nopeus: 'Nopeus', kohde: 'Kohde', olosuhteet: 'Olosuhteet' };
    let osio = 'nopeus';
    const osioNapit = PANEELIN_OSIOT.map((tunnus) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.className = 'iss-kyyti-osio';
      b.dataset.osio = tunnus;
      b.textContent = OSION_NIMI[tunnus];
      b.setAttribute('role', 'tab');
      b.addEventListener('click', (e) => { e.stopPropagation(); valitseOsio(tunnus); });
      return b;
    });
    osioRivi.append(...osioNapit);

    /*
     * Rivi 3, Nopeus: nopeutuksen porras LIVE · 10× · 100× · 1000× (omistaja 28.9. klo 12.1x). Kelauksen
     * aikana mikään ei ole valittuna (paivitaTietorivi), ja nopeutettuna ensimmäinen solu näyttää
     * "Palaa LIVE" ja palaa liveen.
     */
    const nopeudet = doc.createElement('div');
    nopeudet.className = 'iss-kyyti-nopeudet';
    nopeudet.setAttribute('role', 'group');
    nopeudet.setAttribute('aria-label', 'Ajan nopeutus');
    const napit = NOPEUDET.map((k) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.dataset.kerroin = String(k);
      b.textContent = k === 1 ? 'LIVE' : `${k}×`;
      b.addEventListener('click', (e) => { e.stopPropagation(); asetaNopeus(k); });
      return b;
    });
    nopeudet.append(...napit);

    /* Rivi 3, Kohde: "Lennä kohteen ylle…" -valikko (listan kärjessä "Oma sijainti", kun se on saatavilla) ja ylilentolukema. */
    const kohdeLohko = doc.createElement('div');
    kohdeLohko.className = 'iss-kyyti-kohde-lohko';
    const valikko = doc.createElement('select');
    valikko.className = 'iss-kyyti-kohteet';
    valikko.setAttribute('aria-label', 'Lennä kohteen ylle');
    const tyhja = doc.createElement('option');
    tyhja.value = '';
    tyhja.textContent = 'Lennä kohteen ylle…';
    valikko.append(tyhja, ...kohteet.map((k) => {
      const o = doc.createElement('option');
      o.value = k.tunnus;
      o.textContent = k.nimi;
      return o;
    }));
    valikko.addEventListener('change', () => {
      const t = valikko.value;
      valikko.value = '';
      if (t) lennaKohteeseen(t);
    });
    const ylilentoRivi = doc.createElement('div');
    ylilentoRivi.className = 'iss-kyyti-ylilento';
    ylilentoRivi.hidden = true;
    kohdeLohko.append(valikko, ylilentoRivi);
    let omaaSijaintiaHaettu = false;
    const haeOmaaSijaintia = () => {
      if (omaaSijaintiaHaettu) return;
      omaaSijaintiaHaettu = true;
      haeOmaSijainti({ ikkuna }).then((oma) => {
        if (!oma || purettu || kohteet.some((k) => k.tunnus === 'oma')) return;
        kohteet.unshift(oma);
        const o = doc.createElement('option');
        o.value = oma.tunnus;
        o.textContent = oma.nimi;
        // listan kärkeen, tyhjän valinnan jälkeen (reaalissa DOM:issa; testien vale-DOM ei kutsu tätä haaraa).
        if (valikko.insertBefore) valikko.insertBefore(o, valikko.children[1] ?? null);
        else valikko.append(o);
      }).catch(() => {});
    };

    /* Rivi 3, Olosuhteet: pilvipeitto ja vuodenaika (iss-realismi.js ab-säätimet). */
    const olosuhteet = doc.createElement('div');
    olosuhteet.className = 'iss-kyyti-olosuhteet';
    const teeLiuku = ({ luokka, min, max, arvo, paatNimet }) => {
      const lohko = doc.createElement('div');
      lohko.className = 'iss-kyyti-olosuhde';
      const otsikko = doc.createElement('div');
      otsikko.className = 'iss-kyyti-olosuhde-otsikko';
      const liukuRivi = doc.createElement('div');
      liukuRivi.className = 'iss-kyyti-liuku-rivi';
      const liuku = doc.createElement('input');
      liuku.type = 'range';
      liuku.className = `iss-kyyti-liuku ${luokka}`;
      liuku.min = String(min);
      liuku.max = String(max);
      liuku.step = '1';
      liuku.value = String(arvo);
      liuku.addEventListener('click', (e) => e.stopPropagation());
      liukuRivi.append(liuku);
      const paat = doc.createElement('div');
      paat.className = 'iss-kyyti-liuku-paat';
      const vasen = doc.createElement('span');
      vasen.textContent = paatNimet[0];
      const oikea = doc.createElement('span');
      oikea.textContent = paatNimet[1];
      paat.append(vasen, oikea);
      lohko.append(otsikko, liukuRivi, paat);
      return { lohko, otsikko, liuku };
    };
    const pilvipeittoLiuku = teeLiuku({
      luokka: 'iss-kyyti-liuku-pilvipeitto', min: 0, max: 100, arvo: 100, paatNimet: ['Selkeä', 'Nykyinen'],
    });
    const vuodenaikaLiuku = teeLiuku({
      luokka: 'iss-kyyti-liuku-vuodenaika', min: 1, max: 12, arvo: kuukausiNyt(0, simu.nyt()), paatNimet: ['Tammikuu', 'Joulukuu'],
    });
    const paivitaOlosuhdeOtsikot = () => {
      const abPilvet = realismi?.ab?.('pilvet');
      const abKuukausi = realismi?.ab?.('kuukausi');
      const pilviProsentti = Math.round((abPilvet?.maara ?? 1) * 100);
      pilvipeittoLiuku.otsikko.textContent = `Pilvipeitto · ${pilvipeittoTeksti(pilviProsentti)}`;
      if (doc.activeElement !== pilvipeittoLiuku.liuku) pilvipeittoLiuku.liuku.value = String(pilviProsentti);
      const pakotettu = abKuukausi?.pakotettu ?? 0;
      vuodenaikaLiuku.otsikko.textContent = `Vuodenaika · ${vuodenaikaTeksti(pakotettu, simu.nyt())}`;
      if (doc.activeElement !== vuodenaikaLiuku.liuku) vuodenaikaLiuku.liuku.value = String(kuukausiNyt(pakotettu, simu.nyt()));
    };
    pilvipeittoLiuku.liuku.addEventListener('input', (e) => {
      e.stopPropagation();
      const ab = realismi?.ab?.('pilvet');
      if (ab) ab.maara = pilvipeittoMaaraksi(Number(pilvipeittoLiuku.liuku.value));
      paivitaOlosuhdeOtsikot();
    });
    vuodenaikaLiuku.liuku.addEventListener('input', (e) => {
      e.stopPropagation();
      const ab = realismi?.ab?.('kuukausi');
      if (ab) ab.pakotettu = Number(vuodenaikaLiuku.liuku.value);
      paivitaOlosuhdeOtsikot();
    });
    olosuhteet.append(pilvipeittoLiuku.lohko, vuodenaikaLiuku.lohko);
    paivitaOlosuhdeOtsikot();

    const valitseOsio = (tunnus) => {
      osio = tunnus;
      for (const b of osioNapit) b.classList.toggle('iss-kyyti-valittu', b.dataset.osio === tunnus);
      nopeudet.hidden = tunnus !== 'nopeus';
      kohdeLohko.hidden = tunnus !== 'kohde';
      olosuhteet.hidden = tunnus !== 'olosuhteet';
      if (tunnus === 'kohde') haeOmaaSijaintia();
      if (tunnus === 'olosuhteet') paivitaOlosuhdeOtsikot();
    };
    valitseOsio(osio);
    asetaKiinni(kiinni);

    paneeli.append(rivi1, osioRivi, nopeudet, kohdeLohko, olosuhteet);
    juuri.append(cupola, kosketus, paneeli, sulku);
    doc.body.appendChild(juuri);

    /* Pillerin napautus nopeutettuna = "Palaa LIVE". */
    tieto.addEventListener('click', (e) => {
      if (simu.live) return;
      e.stopPropagation();
      asetaNopeus(1);
    });

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
      cupola.dataset.malli = String(CUPOLA_KUVAT[CUPOLA_VERSIO]?.malli ?? 2);
      cupola.dataset.koko = cupolanKoko(ikkuna.innerWidth ?? 390, ikkuna.innerHeight ?? 844, CUPOLA_KUVAT[CUPOLA_VERSIO]?.malli ?? 2);
      for (const { laji, osoite } of osoitteet) {
        const el = doc.createElement('div');
        el.className = `iss-kyyti-${laji}${laji.startsWith('valo-') ? ' iss-kyyti-valo' : ''}`;
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
      juuri, tieto, piste, live, teksti, sulku, kosketus, cupola, haeKuvat, napit, valikko, ylilentoRivi,
      paneeli, kutista, osioNapit, pilvipeittoLiuku: pilvipeittoLiuku.liuku, vuodenaikaLiuku: vuodenaikaLiuku.liuku,
      paivitaOlosuhdeOtsikot,
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
    const nopeutettu = !simu.live;
    const r = tietorivi(p.korkeusKm, nopeusKmh(p.korkeusKm), arvio, nopeutettu ? simu.nopeus() : null);
    ui.teksti.textContent = r.teksti;
    ui.piste.hidden = !r.merkki;
    ui.live.hidden = !r.merkki;
    ui.live.textContent = r.merkki ?? '';
    ui.tieto.classList.toggle('iss-kyyti-tieto-live', r.live);
    ui.tieto.classList.toggle('iss-kyyti-tieto-nopeutettu', nopeutettu);
    ui.tieto.title = nopeutettu ? 'Palaa LIVE' : '';
    const valittu = simu.kelaa ? null : (simu.live ? 1 : simu.kerroin);
    for (const b of ui.napit) {
      const k = Number(b.dataset.kerroin);
      b.classList.toggle('iss-kyyti-valittu', k === valittu);
      if (k === 1) b.textContent = nopeutettu ? 'Palaa LIVE' : 'LIVE';
    }
    if (ylilento && ui.ylilentoRivi) {
      ui.ylilentoRivi.hidden = false;
      if (!ylilento.perilla) {
        ui.ylilentoRivi.textContent = `${ylilento.nimi} · ${ylilennonTeksti(ylilento.ms, simu.nyt())}`;
      } else if (ylilento.kohde?.tunnus === 'oma') {
        // "Oma sijainti": hakupiste voi olla korvattu (±51°), joten rivi näyttää matkan OIKEAAN maahan.
        const km = keskuskulma(ylilento.lat, ylilento.lon, ylilento.kohde.oikeaLat, ylilento.kohde.oikeaLon) * ASTE_KM;
        ui.ylilentoRivi.textContent = `${ylilento.kohde.maa ?? ylilento.nimi}: ISS ${Math.round(km)} km omasta maasta`;
      } else {
        ui.ylilentoRivi.textContent = `${ylilento.nimi}: ISS ${Math.round(ylilento.sivuttainKm)} km sivussa`;
      }
    }
    ui.paivitaOlosuhdeOtsikot?.();
  };

  /*
   * CUPOLA 3:N KÄÄNTÖ JA REUNAVALOT (natiivi c2645317): kuvasäiliö käännetään 90° myötäpäivään, kun ruutu on eri asennossa
   * kuin kuva, ja kolmen reunavalon läpinäkyvyys lasketaan auringosta kameran suunnissa neljästi sekunnissa (--valo).
   */
  let cupola3Aika = -Infinity;
  const cupola3Tila = { kaanna: false, valot: [0, 0, 0], aurinko: 0 };
  const paivitaCupola3 = (iss, issP, ms) => {
    const c = ui?.cupola;
    if (!c || c.dataset.malli !== '3') return;
    const nyt = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (nyt - cupola3Aika < 250) return;
    cupola3Aika = nyt;
    const W = ikkuna.innerWidth ?? 390; const H = ikkuna.innerHeight ?? 844;
    const { kaanna } = cupola3Kuva(W, H);
    c.classList.toggle('iss-kyyti-cupola-kaanna', kaanna);
    c.style.width = kaanna ? `${H}px` : '';
    c.style.height = kaanna ? `${W}px` : '';
    const sa = auringonAlihajapiste(jdHetkesta(ms));
    const ap = pallo.getCoords(sa.lat, sa.lon, 0);
    const al = Math.hypot(ap.x, ap.y, ap.z) || 1;
    const a = [ap.x / al, ap.y / al, ap.z / al];
    const cam = pallo.camera();
    cam.updateMatrixWorld?.();
    const e = cam.matrixWorld?.elements;
    if (!e) return;
    const oikea = [e[0], e[1], e[2]]; const ylos = [e[4], e[5], e[6]]; const eteen = [-e[8], -e[9], -e[10]];
    const piste = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    const k = [piste(a, oikea), piste(a, ylos), piste(a, eteen)];
    const kl = Math.hypot(...k) || 1;
    const il = Math.hypot(issP.x, issP.y, issP.z) || 1;
    const aur = aurinkoisuus(piste([issP.x / il, issP.y / il, issP.z / il], a), iss.korkeusM / 1000);
    const valot = cupola3Opasiteetit([k[0] / kl, k[1] / kl], aur, kaanna);
    ['valo-nw', 'valo-ne', 'valo-sw'].forEach((laji, i) => {
      c.querySelector(`.iss-kyyti-${laji}`)?.style.setProperty('--valo', valot[i].toFixed(3));
    });
    Object.assign(cupola3Tila, { kaanna, valot, aurinko: +aur.toFixed(3) });
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
    paivitaKoe();
  };

  /* ---- NASA-kuvakoe ------------------------------------------------- */
  const paivitaKoe = () => {
    const kohde = kyyti.tila === TILA.kohde ? kyyti.kohde : null;
    const tunnus = kohde ? ylilento?.tunnus : null;
    const kal = tunnus && koePaalla ? NASA_KOE[tunnus] : null;
    if (koe && koe.tunnus !== tunnus) {
      const vanha = koe;
      koe = null;
      vanha.kahva?.peittavyys?.(0);
      ikkuna.setTimeout?.(() => vanha.kahva?.pura?.(), 700);
    } else if (koe && !kal) {
      koe.kahva?.peittavyys?.(0);
    }
    if (!kal || !lauta?.linssit?.kalvo) return;
    if (koe) { koe.kahva?.peittavyys?.(NASA_KOE_PEITTO); return; }
    koe = { tunnus, kahva: null, valmis: false };
    const oma = koe;
    nasaKoeKangas(kal, ikkuna).then((v) => {
      if (!v || koe !== oma || purettu) return;
      oma.kahva = lauta.linssit.kalvo(`iss-nasakoe-${tunnus}`, {
        kuva: v.kangas, peittavyys: 0, ikkuna: v.ikkuna, sade: NASA_KOE_SADE, jarjestys: NASA_KOE_JARJESTYS,
      });
      oma.valmis = true;
      oma.ikkuna = v.ikkuna;
      ikkuna.setTimeout?.(() => { if (koe === oma && koePaalla) oma.kahva?.peittavyys?.(NASA_KOE_PEITTO); }, 60);
    }).catch(() => {});
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
    if (!kaari) {
      try {
        kaari = rakennaKaari(pallo, luokat, {
          ilmanKaarta: Boolean(realismi?.korvaa?.kaari), ilmanYota: Boolean(realismi?.korvaa?.yokuori),
        });
      } catch { kaari = null; }
    }
    if (!malli) { try { malli = rakennaMalli(pallo, luokat); } catch { malli = null; } }
    if (!realismiRakennettu && luokat) {
      realismiRakennettu = true;
      realismiKutsu('rakenna', { pallo, luokat, metri, R });
    }
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
    const ms = simu.nyt();
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

  /** Poistuttaessa Olosuhteet-osion säädöt palautuvat: pilvipeitto 1 (= nyt), kuukausi 0 (= ei pakotettu). */
  const nollaaOlosuhteet = () => {
    const abPilvet = realismi?.ab?.('pilvet');
    if (abPilvet) abPilvet.maara = 1;
    const abKuukausi = realismi?.ab?.('kuukausi');
    if (abKuukausi) abKuukausi.pakotettu = 0;
  };

  function poistu() {
    if (purettu || !kyyti.kyydissa || kyyti.tila === TILA.kauko) return false;
    ylilento = null;
    if (ui?.ylilentoRivi) ui.ylilentoRivi.hidden = true;
    nollaaOlosuhteet();
    // Aika palaa todelliseen hetkeen paluulennon aikana (ei hyppyä).
    simu.palaaLive({ kestoS: KAUKOON_S, vahennetty: reduced });
    kyyti.poistu(paluuKorkeus() * MAAN_SADE_M, kello(), reduced);
    paivitaUi();
    return true;
  }

  /** Nopeutus: 1 = "Palaa LIVE" (kelaus pehmeästi todelliseen hetkeen). */
  function asetaNopeus(k) {
    if (purettu || !NOPEUDET.includes(k)) return false;
    ylilento = null;
    if (ui?.ylilentoRivi) ui.ylilentoRivi.hidden = true;
    simu.asetaNopeus(k, { vahennetty: reduced });
    tietoAika = -Infinity;
    return true;
  }

  /**
   * "Lennä kohteen ylle": SGP4:llä seuraava todellinen ylilento, kellonaika
   * näkyviin ja kelaus sinne (kiihdytys noin 1000×:iin, hidastus 1×:iin).
   * Maa pyörii alla, ei teleporttia. Perillä kamera kääntyy kohteeseen.
   */
  function lennaKohteeseen(tunnus, { valoisa = false } = {}) {
    const k = kohteet.find((x) => x.tunnus === tunnus);
    if (purettu || !k || !kyyti.kyydissa || kyyti.tila === TILA.kauko) return null;
    const alku = simu.nyt();
    const y = seuraavaYlilento(issNyt, k.lat, k.lon, alku, { valoisa });
    rakennaUi();
    if (!y) {
      ylilento = null;
      ui.ylilentoRivi.hidden = false;
      ui.ylilentoRivi.textContent = `${k.nimi}: ei ylilentoa 48 tunnin sisällä`;
      return null;
    }
    if (kyyti.tila !== TILA.seuranta) napauta();
    const oma = { ...y, tunnus: k.tunnus, nimi: k.nimi, kohde: k, perilla: false, id: null };
    ylilento = oma;
    oma.id = simu.kelaaHetkeen(y.ms, {
      vahennetty: reduced,
      valmis: () => {
        if (ylilento !== oma || purettu || !kyyti.kyydissa || kyyti.tila === TILA.kauko) return;
        oma.perilla = true;
        kyyti.kohteeseen(k, viimeisin ?? kaukoKulma(k.lat, k.lon, 1e6), pallo.camera().fov, kello(), reduced);
        tietoAika = -Infinity;
        paivitaUi();
      },
    });
    tietoAika = -Infinity;
    paivitaTietorivi(simu.nyt());
    return { ...y, teksti: ylilennonTeksti(y.ms, alku) };
  }

  /** Yksi kehys (linssin kehyssilmukka). true = kyyti ohjaa kameraa. */
  function paivita(t) {
    if (purettu) return false;
    const alkoi = ikkuna.performance?.now?.() ?? 0;
    const ms = simu.nyt();
    const reaali = Date.now();
    const tS = Number.isFinite(t) && t > 0 ? t / 1000 : kello();
    const dt = edellinenT === null ? 0 : Math.max(0, Math.min(0.25, tS - edellinenT));
    edellinenT = tS;
    const tavoite = kyyti.kyydissa && kyyti.tila !== TILA.kauko ? 1 : 0;
    if (osuus !== tavoite) {
      const askel = KAAREN_SIIRTYMA_S > 0 ? dt / KAAREN_SIIRTYMA_S : 1;
      osuus = tavoite > osuus ? Math.min(tavoite, osuus + askel) : Math.max(tavoite, osuus - askel);
    }
    sumu?.kyyti?.(osuus);
    if (realismi?.korvaa?.pilvet) asetaOmatPilvet(osuus > 0);
    kaari?.aseta(osuus, ms);
    if (osuus > 0.5) asetaHehku(true);
    else asetaHehku(false);

    if (!kyyti.kyydissa) {
      kalvo?.asetaKyyti?.(osuus, true);
      if (realismi && realismiRakennettu) {
        const cam = pallo.camera();
        realismiKutsu('paivita', {
          osuus, ms, tila: kyyti.tila, iss: hetki(ms), silma: [cam.position.x, cam.position.y, cam.position.z], kamera: cam,
        });
      }
      return false;
    }
    const iss = hetki(ms);
    const r = kyyti.paivita(kello(), iss, talteen?.fov ?? 50);
    if (!r) { kalvo?.asetaKyyti?.(osuus, true); return false; }
    viimeisin = r.asento;
    const a = asetaKamera(r.asento, r.kentta);
    realismiKutsu('paivita', { osuus, ms, tila: kyyti.tila, iss, silma: a.silma, kamera: pallo.camera() });

    /* ISS-malli seurannassa, kun kamera on alle 3 000 km:n päässä. */
    const issP = pallo.getCoords(iss.lat, iss.lon, iss.korkeusM / MAAN_SADE_M);
    if (kehysNakyy) paivitaCupola3(iss, issP, ms);
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

    /* Tietorivi kerran sekunnissa (nopeutettuna 4 kertaa) ja tilan vaihtuessa. */
    if (kyyti.tila !== uiTila) paivitaUi();
    if (reaali - tietoAika >= (simu.live ? 1000 : 250)) {
      tietoAika = reaali;
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
    asetaNopeus,
    lennaKohteeseen,
    /** KOE: NASA-kuva kohteen yllä päälle/pois (savuke, ?koe=nasakuva). */
    nasaKoe(paalla) {
      koePaalla = Boolean(paalla);
      paivitaKoe();
      return koePaalla;
    },
    kohteet: () => kohteet.slice(),
    kyydissa: () => kyyti.kyydissa,
    /** Kevyt tila Pulun taululle (js/linssit/pulu-taulu.js): moodi ja siirtymä. */
    moodi: () => ({ tila: kyyti.tila, siirtyy: kyyti.siirtyy }),
    /** Tähtien peitto: 1 kaukonäkymässä, 0,3 kyydissä (liukuen). */
    tahdet: () => 1 + (TAHDET_KYYDISSA - 1) * osuus,
    tila: () => {
      const cam = pallo.camera?.();
      const ms = simu.nyt();
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
        cupola3: ui?.cupola?.dataset.malli === '3' ? { ...cupola3Tila, valot: [...cupola3Tila.valot] } : null,
        tieto: ui && !ui.juuri.hidden ? ui.tieto.textContent : null,
        live: simu.live && ui ? !ui.live.hidden && ui.live.textContent === 'LIVE' : false,
        aika: { simMs: Math.round(ms), eroMs: Math.round(ms - Date.now()), live: simu.live, kelaa: simu.kelaa, nopeus: +simu.nopeus().toFixed(1) },
        ylilento: ylilento ? { tunnus: ylilento.tunnus, ms: ylilento.ms, sivuttainKm: +ylilento.sivuttainKm.toFixed(1), perilla: ylilento.perilla } : null,
        kohde: kyyti.kohde,
        nasaKoe: koe ? { tunnus: koe.tunnus, valmis: koe.valmis, peitto: koe.kahva?.nakyvyys?.() ?? null } : null,
        radanLaatu: issNyt.laatu(ms),
        tle: issNyt.tle ? { epookkiJd: issNyt.tle.epookkiJd, haettu: issNyt.tle.haettu } : null,
        kehyksia: mittari.kehyksia,
        kuvaMsKa: mittari.kehyksia ? +(mittari.kuvaMs / mittari.kehyksia).toFixed(3) : 0,
        kuvaMsMax: +mittari.kuvaMsMax.toFixed(3),
        realismi: realismiRakennettu,
      };
    },
    pura() {
      if (purettu) return;
      if (kyyti.kyydissa) {
        kyyti.nollaa();
        lopetaKuvaus();
      }
      purettu = true;
      // Linssi suljetaan: aika heti todelliseksi.
      simu.palaaLive({ vahennetty: true });
      asetaHehku(false);
      sumu?.kyyti?.(0);
      asetaOmatPilvet(false);
      kaari?.pura?.();
      malli?.pura?.();
      koe?.kahva?.pura?.();
      koe = null;
      nollaaOlosuhteet();
      realismiKutsu('pura');
      ui?.juuri?.remove?.();
      doc.body.classList.remove(KYYTI_LUOKKA);
    },
  };
}
