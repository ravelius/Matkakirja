/*
 * KOKEILU: rantaviivat ja rajat VEKTOREINA pallolle — neljä toteutustapaa
 * kytkimen takana (Fablemax 6.9.2026, Raamattu "VEKTORIT SAMALLA":
 * omistaja *"Tehdään se vektori juttu nyt samalla"*).
 *
 *   luoVektorit({ pallo, kotelo, tapa, ... }) → { paivita, mittarit, pura, valmis }
 *
 *   tapa = 'line2'  three.js:n Line2/LineSegments2 (fat lines): leveys
 *                   ruutupikseleinä varjostimessa, yksi instanssoitu
 *                   piirtokutsu solua kohti. Luokat luetaan Globe.gl:n
 *                   omasta nipusta elävän polkuolion kautta (kirjasto
 *                   rakentaa pathsDatan Line2:na), ei uutta kirjastoa.
 *   tapa = 'nauha'  oma nauhageometria + oma varjostin: 4 kärkeä /
 *                   jana, leveys lasketaan ruutuavaruudessa (vertailu
 *                   Line2:n 8 kärkeen ja instanssointiin).
 *   tapa = 'polut'  Globe.gl pathsData (kirjaston oma tie: yksi Line2
 *                   per viiva → yksi piirtokutsu per viiva).
 *   tapa = 'svg'    SVG-kalvo kotelon päällä, kärjet projisoidaan joka
 *                   kehys JavaScriptillä (CSS2D-nimien tapa viivoille).
 *
 * Aineisto: tee-aineisto.mjs:n solut (Float32 [n, lon, lat, …]) tasoittain
 * yksinkertaistettuina; taso valitaan ruudun pikselitiheydestä samalla
 * mitalla kuin lepokerros (laitepikseliä astetta kohti ruudun keskellä)
 * ja solut näkyvästä alueesta (lepokerroksenAlue). Tämä on kokeilu —
 * tuotantomoduuli (js/pallovektorit.js) speksataan suunnitelmassa
 * docs/moduulit/pallon-vektoriviivat.md.
 */
import { kolmiulotteinen, lepokerroksenAlue, pallonPiste } from '../../../js/pallo.js';

const RAD = Math.PI / 180;

/** Solun avain kuten tee-aineisto.mjs. */
const soluAvain = (lon, lat, solu) => {
  const s = Math.min(Math.floor((lon + 180) / solu), Math.ceil(360 / solu) - 1);
  const r = Math.min(Math.floor((90 - lat) / solu), Math.ceil(180 / solu) - 1);
  return `${s}_${r}`;
};

/** Float32-puskuri → viivat [[lon, lat], …]. */
function puraViivat(buf) {
  const f = new Float32Array(buf);
  const viivat = [];
  let i = 0;
  while (i < f.length) {
    const n = f[i++];
    const v = new Array(n);
    for (let k = 0; k < n; k += 1) { v[k] = [f[i], f[i + 1]]; i += 2; }
    viivat.push(v);
  }
  return viivat;
}

/** Janat xyz-pareina pallon pinnalle (säde sade). */
function janat(viivat, sade) {
  let n = 0;
  for (const v of viivat) n += v.length - 1;
  const out = new Float32Array(n * 6);
  let i = 0;
  for (const v of viivat) {
    let p = pallonPiste(v[0][1], v[0][0], sade);
    for (let k = 1; k < v.length; k += 1) {
      const q = pallonPiste(v[k][1], v[k][0], sade);
      out[i] = p.x; out[i + 1] = p.y; out[i + 2] = p.z;
      out[i + 3] = q.x; out[i + 4] = q.y; out[i + 5] = q.z;
      i += 6;
      p = q;
    }
  }
  return { paikat: out, janoja: n };
}

const NAUHA_VERTEX = `
  attribute vec3 toinen;
  attribute vec2 sivuSuunta;
  uniform float leveys;
  uniform vec2 resolution;
  void main() {
    vec4 c0 = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 c1 = projectionMatrix * modelViewMatrix * vec4(toinen, 1.0);
    vec2 puoli = resolution * 0.5;
    vec2 s0 = c0.xy / c0.w * puoli;
    vec2 s1 = c1.xy / c1.w * puoli;
    vec2 suunta = s1 - s0;
    float pituus = length(suunta);
    suunta = pituus > 1e-4 ? suunta / pituus : vec2(1.0, 0.0);
    suunta *= sivuSuunta.y;
    vec2 normaali = vec2(-suunta.y, suunta.x) * sivuSuunta.x * leveys * 0.5;
    c0.xy += normaali / puoli * c0.w;
    gl_Position = c0;
  }
`;
const NAUHA_FRAGMENT = `
  uniform vec3 vari;
  uniform float peitto;
  void main() { gl_FragColor = vec4(vari, peitto); }
`;

/** Nauhageometria: 4 kärkeä ja 2 kolmiota janaa kohti. */
function nauhaGeometria(kolmi, paikat, janoja) {
  const pos = new Float32Array(janoja * 12);
  const toinen = new Float32Array(janoja * 12);
  const sivuSuunta = new Float32Array(janoja * 8);
  const idx = new Uint32Array(janoja * 6);
  for (let j = 0; j < janoja; j += 1) {
    const a = j * 6;
    // kärjet: A+, A−, B+, B−
    for (let k = 0; k < 4; k += 1) {
      const alku = k < 2;
      const o = (j * 4 + k) * 3;
      pos[o] = paikat[a + (alku ? 0 : 3)]; pos[o + 1] = paikat[a + (alku ? 1 : 4)]; pos[o + 2] = paikat[a + (alku ? 2 : 5)];
      toinen[o] = paikat[a + (alku ? 3 : 0)]; toinen[o + 1] = paikat[a + (alku ? 4 : 1)]; toinen[o + 2] = paikat[a + (alku ? 5 : 2)];
      sivuSuunta[(j * 4 + k) * 2] = k % 2 === 0 ? 1 : -1;
      sivuSuunta[(j * 4 + k) * 2 + 1] = alku ? 1 : -1;
    }
    const b = j * 4;
    idx.set([b, b + 1, b + 2, b + 1, b + 3, b + 2], j * 6);
  }
  const g = new kolmi.BufferGeometry();
  g.setAttribute('position', new kolmi.BufferAttribute(pos, 3));
  g.setAttribute('toinen', new kolmi.BufferAttribute(toinen, 3));
  g.setAttribute('sivuSuunta', new kolmi.BufferAttribute(sivuSuunta, 2));
  // Indeksi tavallisena taulukkona: kolmi.BufferAttribute on elävän laatan
  // Float32BufferAttribute, joka muuntaisi Uint32-indeksin liukuluvuiksi (GL_INVALID_ENUM).
  g.setIndex(Array.from(idx));
  g.computeBoundingSphere();
  return g;
}

const heksaVari = (s) => {
  const n = parseInt(String(s).replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * Line2-luokat elävästä pallosta: kirjasto rakentaa pathsDatan Line2:na
 * kun pathStroke on annettu, joten yksi väliaikainen polku antaa
 * konstruktorit. Palauttaa null kunnes olio on scenessä.
 */
function line2Luokat(pallo) {
  let olio = null;
  pallo.scene()?.traverse((o) => { if (!olio && o.type === 'Line2') olio = o; });
  if (!olio) return null;
  const Line2 = olio.constructor;
  const LineSegments2 = Object.getPrototypeOf(Line2.prototype).constructor;
  const LineGeometry = olio.geometry.constructor;
  const LineSegmentsGeometry = Object.getPrototypeOf(LineGeometry.prototype).constructor;
  const LineMaterial = olio.material.constructor;
  const ShaderMaterial = Object.getPrototypeOf(LineMaterial.prototype).constructor;
  const Vector2 = olio.material.resolution.constructor;
  return { Line2, LineSegments2, LineGeometry, LineSegmentsGeometry, LineMaterial, ShaderMaterial, Vector2 };
}

export function luoVektorit({
  pallo, kotelo, ikkuna = globalThis, tapa = 'line2', juuri = '/_aineisto/',
  leveysLaitePx = 1.5, korkeus = 0, lajit = ['rannikko', 'rajat'],
  vari = '#3a2819', rajaVari = '#60492e', peitto = 1, syvyys = true, syvyyssiirto = -12,
  renderOrder = -0.5, lodPakotus = null, teravyysPx = 0.5, rajaKatko = false, vara = 1,
  lapinakyva = true,
}) {
  const doc = kotelo.ownerDocument ?? ikkuna.document;
  const mittarit = {
    tapa, lod: null, tol: null, tarvePxAste: 0, soluja: 0, ladattu: 0, janoja: 0, tavua: 0,
    paivitaMs: 0, rakennusMs: 0, svgMs: 0, piirtokutsujaOma: 0, luokat: null, linewidthCss: 0, pikselisuhde: 0, alue: null,
    pyyntoja: 0,
  };
  const solut = new Map(); // avain → { lupaus, viivat, olio, janoja, tavua, nakyy }
  let luettelo = null;
  let luokat = null;
  let kolmi = null;
  let materiaalit = null;
  let ohjaimet = null;
  let purettu = false;
  let svg = null;
  let svgSilmukka = 0;
  const svgAjat = [];
  let nakyvat = new Set();

  const renderer = pallo.renderer?.();
  const sade = () => pallo.getGlobeRadius() * (1 + korkeus);
  const pikselisuhde = () => renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1);
  const cssLeveys = () => leveysLaitePx / pikselisuhde();

  /* ---------------- valmistelu ------------------------------------ */
  const valmis = (async () => {
    const v = await ikkuna.fetch(`${juuri}luettelo.json`);
    luettelo = await v.json();
    // Kirjaston luokat: laattaverkko (kolmiulotteinen) ja Line2 (väliaikainen polku).
    for (let i = 0; i < 200 && !purettu; i += 1) {
      kolmi = kolmiulotteinen(pallo);
      if (kolmi?.laatatValmiit && kolmi.BufferGeometry) break;
      await new Promise((ok) => ikkuna.setTimeout(ok, 100)); // eslint-disable-line no-await-in-loop
    }
    if (tapa === 'line2' || tapa === 'nauha') {
      pallo.pathsData([{ pisteet: [[0, 0], [0, 0.5]] }]).pathPoints('pisteet').pathStroke(1).pathTransitionDuration(0);
      for (let i = 0; i < 200 && !purettu; i += 1) {
        luokat = line2Luokat(pallo);
        if (luokat) break;
        await new Promise((ok) => ikkuna.setTimeout(ok, 50)); // eslint-disable-line no-await-in-loop
      }
      pallo.pathsData([]);
      mittarit.luokat = luokat ? Object.keys(luokat) : null;
      if (!luokat) throw new Error('Line2-luokkia ei löytynyt scenestä');
      materiaalit = teeMateriaalit();
    }
    if (tapa === 'polut') {
      pallo.pathsData([]).pathPoints('pisteet')
        .pathPointLat((p) => p[0]).pathPointLng((p) => p[1]).pathPointAlt(korkeus)
        .pathColor((d) => d.vari).pathStroke(() => cssLeveys()).pathResolution(180)
        .pathTransitionDuration(0);
    }
    if (tapa === 'svg') {
      svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'vektorit-svg');
      Object.assign(svg.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' });
      for (const laji of lajit) {
        const p = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.dataset.laji = laji;
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', laji === 'rajat' ? rajaVari : vari);
        p.setAttribute('stroke-opacity', String(peitto));
        p.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.appendChild(p);
      }
      kotelo.appendChild(svg);
      svgSilmukka = ikkuna.requestAnimationFrame(svgKehys);
    }
    ohjaimet = pallo.controls?.();
    ohjaimet?.addEventListener?.('change', pyyda);
    await paivita();
    return true;
  })();

  function teeMateriaalit() {
    /*
     * LÄPINÄKYVÄÄN JONOON, EI SYVYYSKIRJOITUSTA (mitattu 6.9.2026): opaakit
     * viivat renderOrder 1:llä katosivat lepokerroksen alle — kerros on
     * transparent (häive) ja piirtyy KAIKKIEN opaakkien jälkeen, ja koska
     * viiva ei kirjoita syvyyttä, kerros maalasi sen yli (magentaa 1 px
     * kerroksen kanssa, 4696 ilman). Läpinäkyvässä jonossa järjestys on
     * renderOrder: laatat/lepokerros (≤ −1) → viivat (−0,5) → reitit (0)
     * → kalvot (1); syvyystesti pallon pintaa vasten leikkaa takapuolen.
     */
    const yhteiset = {
      linewidth: cssLeveys(), worldUnits: false, transparent: lapinakyva, depthWrite: false,
      depthTest: syvyys, polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: syvyyssiirto,
    };
    if (tapa === 'line2') {
      const ranta = new luokat.LineMaterial({ ...yhteiset, color: vari, opacity: peitto });
      const raja = new luokat.LineMaterial({ ...yhteiset, color: rajaVari, opacity: peitto, dashed: rajaKatko });
      if (rajaKatko) {
        // Katko karttavakiona (maailmayksikköä): poltettu raja on 1,5 R piste, 3 R väli;
        // z7:llä R ≈ 1 px = 1/240° ≈ 0,00727 yksikköä (säde 100).
        raja.dashSize = 1.5 * 0.00727; raja.gapSize = 3 * 0.00727; raja.dashScale = 1;
      }
      return { rannikko: ranta, rajat: raja };
    }
    const tee = (v) => new luokat.ShaderMaterial({
      uniforms: {
        leveys: { value: cssLeveys() }, resolution: { value: new luokat.Vector2(kotelo.clientWidth, kotelo.clientHeight) },
        vari: { value: heksaVari(v) }, peitto: { value: peitto },
      },
      vertexShader: NAUHA_VERTEX, fragmentShader: NAUHA_FRAGMENT,
      transparent: lapinakyva, depthWrite: false, depthTest: syvyys,
      polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: syvyyssiirto,
    });
    return { rannikko: tee(vari), rajat: tee(rajaVari) };
  }

  /** Materiaalien ruutumitat: leveys laitepikseleinä pysyy, pikselisuhde voi vaihtua. */
  const tahdistaMateriaalit = () => {
    if (!materiaalit) return;
    const W = kotelo.clientWidth; const H = kotelo.clientHeight;
    mittarit.linewidthCss = cssLeveys();
    mittarit.pikselisuhde = pikselisuhde();
    for (const m of Object.values(materiaalit)) {
      if (tapa === 'line2') { m.linewidth = cssLeveys(); m.resolution.set(W, H); } else { m.uniforms.leveys.value = cssLeveys(); m.uniforms.resolution.value.set(W, H); }
    }
  };

  /* ---------------- taso ja solut ---------------------------------- */
  const valitseTaso = (tarvePxAste) => {
    const lodit = luettelo.lodit;
    if (lodPakotus !== null) return Math.max(0, Math.min(lodit.length - 1, lodPakotus));
    for (let k = 0; k < lodit.length; k += 1) if (lodit[k] * tarvePxAste <= teravyysPx) return k;
    return lodit.length - 1;
  };
  /*
   * Ruudun piste pallon pinnalle OMALLA säde–pallo-leikkauksella: kirjaston
   * toGlobeCoords säteenjäljittää KOKO scenen (sadat laattaverkot), ja
   * 49 näytettä maksoi mitatusti satoja millisekunteja; tämä on
   * mikrosekunteja. Pallo on origossa säteellä R (pallonPiste-kaava).
   */
  const pinnalla = (x, y) => {
    const kam = pallo.camera();
    const W = kotelo.clientWidth; const H = kotelo.clientHeight;
    const V3 = kam.position.constructor;
    const p = new V3((2 * x) / W - 1, 1 - (2 * y) / H, 0.5).unproject(kam);
    const o = kam.position;
    const d = p.sub(o).normalize();
    const R = pallo.getGlobeRadius();
    const b = o.dot(d);
    const c = o.dot(o) - R * R;
    const disc = b * b - c;
    if (disc < 0) return null;
    const t = -b - Math.sqrt(disc);
    if (t < 0) return null;
    const q = o.clone().add(d.multiplyScalar(t));
    return { lat: Math.asin(Math.max(-1, Math.min(1, q.y / R))) / RAD, lng: Math.atan2(q.x, q.z) / RAD };
  };
  const nakyvaAlue = () => {
    const W = kotelo.clientWidth; const H = kotelo.clientHeight;
    const N = 7;
    const naytteet = [];
    for (let j = 0; j < N; j += 1) for (let i = 0; i < N; i += 1) naytteet.push(pinnalla((W * i) / (N - 1), (H * j) / (N - 1)));
    const pov = pallo.pointOfView();
    const alue = lepokerroksenAlue(naytteet, pov.lng, { vara });
    const keski = pinnalla(W / 2, H / 2);
    const alas = pinnalla(W / 2, H / 2 + 40);
    const tarve = keski && alas && Math.abs(keski.lat - alas.lat) > 1e-6 ? (40 * pikselisuhde()) / Math.abs(keski.lat - alas.lat) : 0;
    return { alue, tarve, pov };
  };
  const tarvittavatSolut = (alue, k) => {
    const taso = luettelo.lajit[lajit[0]].tasot[k];
    const solu = taso.solu;
    if (solu >= 360) return ['0_0'];
    if (!alue) return [];
    const ulos = new Set();
    for (let lat = Math.max(-90, alue.lat0); lat <= Math.min(90, alue.lat1) + solu; lat += solu) {
      for (let lon = alue.lon0; lon <= alue.lon1 + solu; lon += solu) {
        let l = lon; while (l > 180) l -= 360; while (l < -180) l += 360;
        ulos.add(soluAvain(l, Math.min(90, lat), solu));
      }
    }
    return [...ulos];
  };

  const lataa = (laji, k, avain) => {
    const id = `${laji}/l${k}/${avain}`;
    let s = solut.get(id);
    if (s) return s;
    const taso = luettelo.lajit[laji].tasot[k];
    if (!taso.tiedostot[avain]) { s = { tyhja: true, lupaus: Promise.resolve(null), janoja: 0, tavua: 0 }; solut.set(id, s); return s; }
    s = { laji, k, avain, lupaus: null, viivat: null, olio: null, janoja: 0, tavua: 0, nakyy: false };
    mittarit.pyyntoja += 1;
    s.lupaus = ikkuna.fetch(`${juuri}${laji}/l${k}/${avain}.bin`).then((v) => v.arrayBuffer()).then((buf) => {
      if (purettu) return null;
      s.tavua = buf.byteLength;
      mittarit.tavua += buf.byteLength;
      s.viivat = puraViivat(buf);
      const t0 = ikkuna.performance.now();
      rakenna(s);
      mittarit.rakennusMs += ikkuna.performance.now() - t0;
      mittarit.ladattu += 1;
      return s;
    }).catch(() => null);
    solut.set(id, s);
    return s;
  };

  /** Solun viivat tavan mukaiseksi olioksi (line2/nauha: mesh sceneen piilossa). */
  function rakenna(s) {
    if (tapa === 'line2' || tapa === 'nauha') {
      const { paikat, janoja } = janat(s.viivat, sade());
      s.janoja = janoja;
      let mesh;
      if (tapa === 'line2') {
        const g = new luokat.LineSegmentsGeometry();
        g.setPositions(paikat);
        mesh = new luokat.LineSegments2(g, materiaalit[s.laji]);
        if (rajaKatko && s.laji === 'rajat') mesh.computeLineDistances();
      } else {
        mesh = new kolmi.Mesh(nauhaGeometria(kolmi, paikat, janoja), materiaalit[s.laji]);
      }
      mesh.renderOrder = renderOrder;
      mesh.raycast = () => {};
      mesh.visible = false;
      mesh.userData.vektorit = { laji: s.laji, k: s.k, avain: s.avain };
      kolmi.juuri.add(mesh);
      s.olio = mesh;
    } else {
      let n = 0;
      for (const v of s.viivat) n += v.length - 1;
      s.janoja = n;
      if (tapa === 'polut') {
        s.olio = s.viivat.map((v, i) => ({ avain: `${s.laji}/${s.k}/${s.avain}/${i}`, pisteet: v.map(([lon, lat]) => [lat, lon]), vari: s.laji === 'rajat' ? rajaVari : vari }));
      }
    }
  }

  /* ---------------- päivitys ---------------------------------------- */
  let pyynto = 0;
  const pyyda = () => {
    if (pyynto) return;
    pyynto = ikkuna.setTimeout(() => { pyynto = 0; void paivita(); }, 60);
  };

  async function paivita() {
    if (!luettelo || purettu) return;
    const t0 = ikkuna.performance.now();
    tahdistaMateriaalit();
    const { alue, tarve } = nakyvaAlue();
    const k = valitseTaso(tarve);
    mittarit.lod = k; mittarit.tol = luettelo.lodit[k]; mittarit.tarvePxAste = +tarve.toFixed(1); mittarit.alue = alue;
    const avaimet = tarvittavatSolut(alue, k);
    const uudet = new Set();
    const odota = [];
    for (const laji of lajit) {
      for (const a of avaimet) {
        const s = lataa(laji, k, a);
        if (s.tyhja) continue;
        uudet.add(`${laji}/l${k}/${a}`);
        if (!s.viivat) odota.push(s.lupaus);
      }
    }
    mittarit.soluja = uudet.size;
    nakyvat = uudet;
    naytaNakyvat();
    mittarit.paivitaMs = +(ikkuna.performance.now() - t0).toFixed(2);
    if (odota.length) {
      await Promise.all(odota);
      if (!purettu) naytaNakyvat();
    }
  }

  function naytaNakyvat() {
    let janoja = 0;
    let piirto = 0;
    const polut = [];
    for (const [id, s] of solut) {
      if (s.tyhja) continue;
      const nakyy = nakyvat.has(id) && Boolean(s.viivat);
      s.nakyy = nakyy;
      if (s.olio && (tapa === 'line2' || tapa === 'nauha')) { s.olio.visible = nakyy; if (nakyy) { janoja += s.janoja; piirto += 1; } }
      if (tapa === 'polut' && nakyy) { polut.push(...s.olio); janoja += s.janoja; }
      if (tapa === 'svg' && nakyy) janoja += s.janoja;
    }
    if (tapa === 'polut') { pallo.pathsData(polut); piirto = polut.length; }
    mittarit.janoja = janoja;
    mittarit.piirtokutsujaOma = piirto;
  }

  /* ---------------- SVG-kalvo: kärjet ruudulle joka kehys ---------- */
  function svgKehys() {
    if (purettu) return;
    svgSilmukka = ikkuna.requestAnimationFrame(svgKehys);
    if (!svg || !luettelo) return;
    const t0 = ikkuna.performance.now();
    const kam = pallo.camera().position;
    const R = pallo.getGlobeRadius();
    const osat = new Map(lajit.map((l) => [l, []]));
    for (const [id, s] of solut) {
      if (!s.nakyy || !s.viivat || !nakyvat.has(id)) continue;
      const d = osat.get(s.laji);
      for (const v of s.viivat) {
        let aloitettu = false;
        for (const [lon, lat] of v) {
          const p = pallonPiste(lat, lon, R);
          // Etupuoli: (kamera − piste) · piste > 0 (sama kuin lauta.js edessa).
          const edessa = (kam.x - p.x) * p.x + (kam.y - p.y) * p.y + (kam.z - p.z) * p.z > 0;
          if (!edessa) { aloitettu = false; continue; }
          const r = pallo.getScreenCoords(lat, lon, korkeus);
          if (!r) { aloitettu = false; continue; }
          d.push(`${aloitettu ? 'L' : 'M'}${r.x.toFixed(1)} ${r.y.toFixed(1)}`);
          aloitettu = true;
        }
      }
    }
    for (const p of svg.children) {
      p.setAttribute('d', osat.get(p.dataset.laji)?.join('') ?? '');
      p.setAttribute('stroke-width', String(cssLeveys()));
    }
    svgAjat.push(ikkuna.performance.now() - t0);
    if (svgAjat.length > 30) svgAjat.shift();
    mittarit.svgMs = +(svgAjat.reduce((a, b) => a + b, 0) / svgAjat.length).toFixed(2);
  }

  return {
    valmis,
    paivita,
    mittarit: () => ({ ...mittarit, nakyvia: nakyvat.size }),
    /** Kokeilun säädöt lennossa (mittari): leveys laitepikseleinä. */
    asetaLeveys(px) { leveysLaitePx = px; tahdistaMateriaalit(); },
    pura() {
      purettu = true;
      ohjaimet?.removeEventListener?.('change', pyyda);
      ikkuna.cancelAnimationFrame(svgSilmukka);
      for (const s of solut.values()) {
        if (s.olio?.parent) { s.olio.parent.remove(s.olio); s.olio.geometry?.dispose?.(); }
      }
      for (const m of Object.values(materiaalit ?? {})) m.dispose?.();
      svg?.remove();
      if (tapa === 'polut') pallo.pathsData([]);
      solut.clear();
    },
  };
}
