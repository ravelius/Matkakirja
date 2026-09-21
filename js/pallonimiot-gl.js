/*
 * ======== GL-KERROS: NIMIÖT JA MERKIT PALLON OMAAN PIIRTOON ==========
 *
 * Omistajan päätös 21.9.2026 (Fable): nimiöt ja merkit siirretään DOM:n
 * CSS2D-kerroksesta pallon WebGL-piirtoon, jotta ne liikkuvat bitilleen
 * laattojen mukana samassa renderissä — ei layoutia, ei transformeja,
 * ei kerrosten välistä laahausta. Suunnitelma ja työnjako:
 * docs/raportit/gl-kerros-suunnitelma-20260921.md (Karttaseppä: piirto,
 * atlas, kamera; Pelikoodari: rasterit, napautus, sovittelu).
 *
 * TÄMÄ ON RUNKO (vaihe 1). Se ei tiedä nimiöiden ulkoasusta mitään:
 * jokainen instanssi on RASTERI (ImageBitmap tai kangas laitepikseleinä)
 * + maapiste (lat, lng) + ankkuri (missä rasterin pikselissä maapiste
 * on) + peitto. Rasterit tulevat Pelikoodarin lähteestä
 * (js/pallolauta/nimiorasterit.js, `haeRasteri`); rungon oma
 * `rasteroiTeksti` on vain testinimiöitä ja savukkeita varten.
 *
 * PIIRTO: yksi verkko per atlassivu, neljä kärkeä per sprite, yksi
 * drawcall per sivu. Kärki kantaa maapisteen (xyz maailmassa),
 * kulman siirron laitepikseleinä ankkurista, UV:n ja peiton; varjostin
 * projisoi maapisteen kameralla ja lisää siirron RUUDUN pikseleinä
 * leikkausavaruudessa (clip.xy += kulma·kerroin·2/ruutu·clip.w), joten
 * sprite on aina pystyssä, aina samankokoinen pikseleinä ja täsmälleen
 * maapisteessään — samalla kameralla ja samassa kehyksessä kuin laatat.
 * Horisontti: maapiste on näkyvä, kun kamera on sen tangenttitason
 * yläpuolella (dot(n, kamera − p) > 0); takapuolella peitto on 0.
 *
 * ATLAS: 2048 × 2048 -kankaita hyllypakkauksella (rivit rasterin
 * korkeuden mukaan); sivu täyttyy → uusi sivu. Sama avain = sama
 * rasteri = sama UV (välimuisti avaimella). Sivun tekstuuri viedään
 * näytönohjaimelle vain kun sivulle on kirjoitettu (needsUpdate).
 *
 * KUOREN KERROIN on uniform: nimiöiden koko zoomin mukaan (Pelikoodarin
 * E2, `kuorenKerroin()`) skaalaa kaikki spritet ankkurinsa ympäri
 * ilman uutta rasteria; rasteri uusitaan vain kun porras vaihtuu.
 *
 * Kytkin `?glnimiot=1` (oletus pois vaiheissa 1–4; CSS2D jää
 * perääntymistieksi). Kirjaston luokat (Mesh, BufferGeometry,
 * ShaderMaterial, Texture) luetaan elävästä scenestä kuten laatta- ja
 * vektorikerroksessa — uutta kirjastoa ei ladata.
 */

/** Atlassivun koko laitepikseleinä. */
export const GLNIMIOT_ATLAS = 2048;
/** Rasterien väli atlaksessa (px), ettei suodatus vuoda naapurista. */
export const GLNIMIOT_VALI = 2;
/** Sivuja enintään (2 × 2048² × 4 tavua ≈ 32 Mt). */
export const GLNIMIOT_SIVUJA_MAX = 4;
/** Piirtojärjestys: laattojen (−10…), vektorien (−0,5) ja kalvojen jälkeen. */
export const GLNIMIOT_RENDER_ORDER = 5;
/** Testinimiön fontti ja koko (vain runko; tuotannon rasterit Pelikoodarilta). */
export const GLNIMIOT_TESTIFONTTI = '"Liberation Serif", "Times New Roman", serif';

/** Onko GL-kerros käytössä (`?glnimiot=1`). */
export function glNimiotKaytossa(win = globalThis) {
  try {
    const arvo = new URLSearchParams(win.location?.search ?? '').get('glnimiot');
    return arvo != null && !/^(0|off|false|pois)$/.test(arvo);
  } catch { return false; }
}

/**
 * Pallon pinnan piste (lat, lng asteina) maailman koordinaateiksi —
 * sama kaava kuin js/pallolaatat.js pallonPiste (three-globen
 * polar2Cartesian): x = R cos(lat) sin(lng), y = R sin(lat), z = R cos(lat) cos(lng).
 */
export function glMaapiste(lat, lng, sade) {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return [sade * Math.cos(la) * Math.sin(lo), sade * Math.sin(la), sade * Math.cos(la) * Math.cos(lo)];
}

/**
 * HYLLYPAKKAUS: rasterit riveihin korkeuden mukaan. Puhdas luokka —
 * testattavissa ilman kangasta. `varaa(w, h)` palauttaa { x, y } tai
 * null, kun sivu on täynnä.
 */
export class Hyllypakkaus {
  constructor(koko = GLNIMIOT_ATLAS, vali = GLNIMIOT_VALI) {
    this.koko = koko;
    this.vali = vali;
    this.hyllyt = []; // { y, korkeus, x }
    this.seuraavaY = 0;
  }

  varaa(w, h) {
    const lw = w + this.vali;
    const lh = h + this.vali;
    if (lw > this.koko || lh > this.koko) return null;
    // Sopivin hylly: matalin, johon korkeus mahtuu ja jolla on tilaa.
    let paras = null;
    for (const hylly of this.hyllyt) {
      if (lh <= hylly.korkeus && hylly.x + lw <= this.koko
        && (!paras || hylly.korkeus < paras.korkeus)) paras = hylly;
    }
    if (paras) {
      const paikka = { x: paras.x, y: paras.y };
      paras.x += lw;
      return paikka;
    }
    if (this.seuraavaY + lh > this.koko) return null;
    const hylly = { y: this.seuraavaY, korkeus: lh, x: lw };
    this.hyllyt.push(hylly);
    this.seuraavaY += lh;
    return { x: 0, y: hylly.y };
  }

  /** Täyttöaste 0…1 (varattujen hyllyjen ala). */
  get tayttoaste() {
    return this.hyllyt.reduce((s, h) => s + h.x * h.korkeus, 0) / (this.koko * this.koko);
  }
}

/**
 * Kirjaston luokat elävästä pallosta: verkko, geometria, attribuutti ja
 * tekstuuri laattojen tapaan, ShaderMaterial ilmakehän tai fat linen
 * materiaalista. Null, kunnes scenessä on jokin niistä.
 */
export function glLuokat(pallo) {
  const scene = pallo?.scene?.();
  if (!scene?.traverse) return null;
  let verkko = null;
  let shader = null;
  scene.traverse((o) => {
    if (!verkko && o.isMesh && o.geometry?.attributes?.position && o.material?.map) verkko = o;
    if (!shader && o.material?.isShaderMaterial) shader = o.material;
  });
  if (!verkko || !shader) return null;
  const BufferGeometry = Object.getPrototypeOf(verkko.geometry.constructor.prototype)?.constructor
    ?? verkko.geometry.constructor;
  return {
    Mesh: verkko.constructor,
    BufferGeometry,
    BufferAttribute: verkko.geometry.attributes.position.constructor,
    Texture: verkko.material.map.constructor,
    ShaderMaterial: shader.constructor,
    tekstuurimalli: verkko.material.map,
  };
}

const VERTEX = `
attribute vec3 maapiste;
attribute vec2 kulma;
attribute vec2 uvKoord;
attribute float peitto;
uniform vec2 ruutu;
uniform float kerroin;
varying vec2 vUv;
varying float vPeitto;
void main() {
  vec4 maailma = modelMatrix * vec4(maapiste, 1.0);
  vec4 clip = projectionMatrix * viewMatrix * maailma;
  // Horisontti maailman koordinaateissa: pallon keskipiste on origossa.
  float edessa = step(0.0, dot(normalize(maailma.xyz), cameraPosition - maailma.xyz));
  clip.xy += kulma * kerroin * 2.0 / ruutu * clip.w;
  gl_Position = clip;
  vUv = uvKoord;
  vPeitto = peitto * edessa;
}
`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D atlas;
varying vec2 vUv;
varying float vPeitto;
void main() {
  vec4 v = texture2D(atlas, vUv);
  v *= vPeitto;
  if (v.a < 0.004) discard;
  gl_FragColor = v;
}
`;

/**
 * Testinimiön rasteri: serif-teksti paperinvaalealla halolla, ankkuri
 * tekstin vasemmassa keskikohdassa (kuten noston nimiö merkin kyljessä).
 * Vain rungon testeihin ja savukkeisiin — tuotannon rasterit tulevat
 * Pelikoodarin nimiorasterit.js:stä samassa muodossa.
 *
 * @returns {{ kuva, w, h, ankkuriX, ankkuriY }|null}
 */
export function rasteroiTeksti(teksti, { px = 14, dpr = 1, doc = globalThis.document, fontti = GLNIMIOT_TESTIFONTTI } = {}) {
  const k = doc?.createElement?.('canvas');
  if (!k) return null;
  const ctx = k.getContext('2d');
  if (!ctx) return null;
  const koko = px * dpr;
  ctx.font = `${koko}px ${fontti}`;
  const leveys = Math.ceil(ctx.measureText(teksti).width);
  const halo = Math.ceil(koko * 0.18);
  const w = leveys + halo * 2 + 2;
  const h = Math.ceil(koko * 1.3) + halo * 2;
  k.width = w;
  k.height = h;
  ctx.font = `${koko}px ${fontti}`;
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(252, 249, 242, 0.95)';
  ctx.lineWidth = halo * 2;
  ctx.strokeText(teksti, halo + 1, h / 2);
  ctx.fillStyle = 'rgb(46, 30, 14)';
  ctx.fillText(teksti, halo + 1, h / 2);
  return { kuva: k, w, h, ankkuriX: 0, ankkuriY: h / 2 };
}

/**
 * GL-nimiökerros yhdelle pallolle.
 *
 * @param {object} p.pallo    Globe.gl-instanssi
 * @param {HTMLElement} p.kotelo pallon kotelo
 * @param {object} p.ikkuna   window (testit antavat oman)
 * @param {object} [p.luokat] kirjaston luokat (oletus glLuokat(pallo))
 * @returns {{ aseta, poista, tyhjenna, peitto, kerroin, kehys, mittarit, pura }}
 */
export function luoNimiokerrosGL({ pallo, kotelo, ikkuna = globalThis, luokat = null, juuri = null }) {
  const doc = kotelo?.ownerDocument ?? ikkuna.document;
  const L = luokat ?? glLuokat(pallo);
  const mittarit = {
    tila: L ? 'valmis' : 'ei-luokkia', instansseja: 0, sivuja: 0, rastereita: 0, drawcalls: 0,
    rakennuksia: 0, rakennusMs: 0, atlasTayttoaste: 0, kerroin: 1, kehyksia: 0,
  };
  if (!L) {
    return {
      aseta: () => false, poista: () => false, tyhjenna: () => {}, peitto: () => {}, kerroin: () => {},
      kehys: () => {}, mittarit: () => ({ ...mittarit }), pura: () => {},
    };
  }
  // Sama ryhmä kuin laatoilla (laattamoottorin isä): sama koordinaatisto ja muunnos.
  const ryhma = juuri ?? pallo.scene();
  const sade = pallo.getGlobeRadius();
  /** avain → { sivu, u0, v0, u1, v1, w, h, ankkuriX, ankkuriY } */
  const uvt = new Map();
  /** sivut: { kangas, ctx, pakkaus, tekstuuri, materiaali, geometria, verkko, likainen } */
  const sivut = [];
  /** id → { lat, lng, avain, peitto, piste:[x,y,z] } */
  const instanssit = new Map();
  let likainen = true;
  let kerroinNyt = 1;
  const ruutu = { x: 1, y: 1 };
  let purettu = false;

  const uusiSivu = () => {
    if (sivut.length >= GLNIMIOT_SIVUJA_MAX) return null;
    const kangas = doc.createElement('canvas');
    kangas.width = GLNIMIOT_ATLAS;
    kangas.height = GLNIMIOT_ATLAS;
    const ctx = kangas.getContext('2d');
    const tekstuuri = new L.Texture(kangas);
    // Atlaksen v kasvaa alaspäin kuten kankaan y: ei kääntöä.
    tekstuuri.flipY = false;
    tekstuuri.generateMipmaps = false;
    tekstuuri.minFilter = 1006; // LinearFilter
    tekstuuri.magFilter = 1006;
    tekstuuri.premultiplyAlpha = true;
    const malli = L.tekstuurimalli;
    if (malli && 'colorSpace' in malli) tekstuuri.colorSpace = malli.colorSpace;
    const materiaali = new L.ShaderMaterial({
      uniforms: {
        atlas: { value: tekstuuri },
        ruutu: { value: { x: ruutu.x, y: ruutu.y, isVector2: true, set(a, b) { this.x = a; this.y = b; } } },
        kerroin: { value: 1 },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
    });
    const geometria = new L.BufferGeometry();
    const verkko = new L.Mesh(geometria, materiaali);
    verkko.frustumCulled = false;
    verkko.renderOrder = GLNIMIOT_RENDER_ORDER;
    verkko.raycast = () => {};
    verkko.userData.glnimiot = true;
    const sivu = {
      kangas, ctx, pakkaus: new Hyllypakkaus(), tekstuuri, materiaali, geometria, verkko, likainen: false,
    };
    sivut.push(sivu);
    ryhma.add(verkko);
    mittarit.sivuja = sivut.length;
    return sivu;
  };

  /** Rasteri atlakseen (tai välimuistista). Palauttaa UV-tietueen tai null. */
  const varaaRasteri = (avain, rasteri) => {
    const vanha = uvt.get(avain);
    if (vanha) return vanha;
    if (!rasteri?.kuva || !(rasteri.w > 0) || !(rasteri.h > 0)) return null;
    let sivu = null;
    let paikka = null;
    for (const s of sivut) {
      paikka = s.pakkaus.varaa(rasteri.w, rasteri.h);
      if (paikka) { sivu = s; break; }
    }
    if (!paikka) {
      sivu = uusiSivu();
      if (!sivu) return null;
      paikka = sivu.pakkaus.varaa(rasteri.w, rasteri.h);
      if (!paikka) return null;
    }
    sivu.ctx.clearRect(paikka.x, paikka.y, rasteri.w, rasteri.h);
    sivu.ctx.drawImage(rasteri.kuva, paikka.x, paikka.y, rasteri.w, rasteri.h);
    sivu.likainen = true;
    const tietue = {
      sivu, w: rasteri.w, h: rasteri.h, ankkuriX: rasteri.ankkuriX ?? 0, ankkuriY: rasteri.ankkuriY ?? 0,
      u0: paikka.x / GLNIMIOT_ATLAS, v0: paikka.y / GLNIMIOT_ATLAS,
      u1: (paikka.x + rasteri.w) / GLNIMIOT_ATLAS, v1: (paikka.y + rasteri.h) / GLNIMIOT_ATLAS,
    };
    uvt.set(avain, tietue);
    mittarit.rastereita = uvt.size;
    return tietue;
  };

  /** Geometriat uudestaan sivuittain (vain kun instanssijoukko muuttui). */
  const rakenna = () => {
    const alku = ikkuna.performance?.now?.() ?? Date.now();
    const perSivu = new Map(sivut.map((s) => [s, []]));
    for (const inst of instanssit.values()) {
      const uv = uvt.get(inst.avain);
      if (!uv) continue;
      perSivu.get(uv.sivu)?.push([inst, uv]);
    }
    for (const [sivu, lista] of perSivu) {
      const n = lista.length;
      const maapiste = new Float32Array(n * 4 * 3);
      const kulma = new Float32Array(n * 4 * 2);
      const uvKoord = new Float32Array(n * 4 * 2);
      const peitto = new Float32Array(n * 4);
      const indeksit = new (n * 4 > 65535 ? Uint32Array : Uint16Array)(n * 6);
      lista.forEach(([inst, uv], i) => {
        const [x, y, z] = inst.piste;
        // Kulmat: vasen ylä, oikea ylä, oikea ala, vasen ala — ruudun y alaspäin
        // rasterissa, ylös leikkausavaruudessa → siirron y käännetään.
        const kx = [0, uv.w, uv.w, 0];
        const ky = [0, 0, uv.h, uv.h];
        const us = [uv.u0, uv.u1, uv.u1, uv.u0];
        const vs = [uv.v0, uv.v0, uv.v1, uv.v1];
        for (let k = 0; k < 4; k += 1) {
          const j = i * 4 + k;
          maapiste[j * 3] = x; maapiste[j * 3 + 1] = y; maapiste[j * 3 + 2] = z;
          kulma[j * 2] = kx[k] - uv.ankkuriX;
          kulma[j * 2 + 1] = -(ky[k] - uv.ankkuriY);
          uvKoord[j * 2] = us[k]; uvKoord[j * 2 + 1] = vs[k];
          peitto[j] = inst.peitto;
        }
        const b = i * 4;
        indeksit.set([b, b + 2, b + 1, b, b + 3, b + 2], i * 6);
      });
      const g = sivu.geometria;
      g.setAttribute('maapiste', new L.BufferAttribute(maapiste, 3));
      g.setAttribute('kulma', new L.BufferAttribute(kulma, 2));
      g.setAttribute('uvKoord', new L.BufferAttribute(uvKoord, 2));
      g.setAttribute('peitto', new L.BufferAttribute(peitto, 1));
      g.setIndex(new L.BufferAttribute(indeksit, 1));
      g.setDrawRange(0, n * 6);
      sivu.verkko.visible = n > 0;
    }
    likainen = false;
    mittarit.rakennuksia += 1;
    mittarit.rakennusMs += (ikkuna.performance?.now?.() ?? Date.now()) - alku;
    mittarit.instansseja = instanssit.size;
    mittarit.drawcalls = sivut.filter((s) => s.verkko.visible).length;
  };

  return {
    /**
     * Instanssi kerrokseen: rasteri (kuva, w, h, ankkuriX, ankkuriY) avaimella
     * `avain` — sama avain käyttää samaa atlaspaikkaa. Palauttaa true, jos
     * paikka atlaksesta löytyi.
     */
    aseta(id, { lat, lng, avain, rasteri = null, peitto = 1 }) {
      if (purettu || !Number.isFinite(lat) || !Number.isFinite(lng) || !avain) return false;
      const uv = uvt.get(avain) ?? (rasteri ? varaaRasteri(avain, rasteri) : null);
      if (!uv) return false;
      instanssit.set(id, { lat, lng, avain, peitto, piste: glMaapiste(lat, lng, sade) });
      likainen = true;
      return true;
    },
    poista(id) {
      const oli = instanssit.delete(id);
      if (oli) likainen = true;
      return oli;
    },
    tyhjenna() { instanssit.clear(); likainen = true; },
    /** Peitto (0…1) yhdelle instanssille — kylkivaihdon crossfade, piilotus. */
    peitto(id, arvo) {
      const inst = instanssit.get(id);
      if (!inst) return;
      inst.peitto = Math.max(0, Math.min(1, arvo));
      likainen = true;
    },
    /** Kuoren kerroin (nimiöiden koko zoomin mukaan) — uniform, ei uutta rasteria. */
    kerroin(arvo) { if (Number.isFinite(arvo) && arvo > 0) kerroinNyt = arvo; },
    /**
     * Kehyskoukku (kytkePallonKehys): ruudun mitat laitepikseleinä
     * uniformeihin, likaiset geometriat ja tekstuurit uusiksi. Halpa,
     * kun mikään ei muuttunut.
     */
    kehys(mitat) {
      if (purettu) return;
      mittarit.kehyksia += 1;
      const suhde = mitat?.suhde ?? 1;
      ruutu.x = Math.max(1, (mitat?.W ?? kotelo?.clientWidth ?? 1) * suhde);
      ruutu.y = Math.max(1, (mitat?.H ?? kotelo?.clientHeight ?? 1) * suhde);
      if (likainen) rakenna();
      for (const s of sivut) {
        s.materiaali.uniforms.ruutu.value.set(ruutu.x, ruutu.y);
        s.materiaali.uniforms.kerroin.value = kerroinNyt;
        if (s.likainen) { s.tekstuuri.needsUpdate = true; s.likainen = false; }
      }
      mittarit.kerroin = kerroinNyt;
      mittarit.atlasTayttoaste = sivut.length ? sivut[sivut.length - 1].pakkaus.tayttoaste : 0;
    },
    /** Onko avaimelle jo rasteri atlaksessa. */
    onRasteri: (avain) => uvt.has(avain),
    mittarit: () => ({ ...mittarit }),
    pura() {
      purettu = true;
      for (const s of sivut) {
        ryhma.remove(s.verkko);
        s.geometria.dispose?.();
        s.materiaali.dispose?.();
        s.tekstuuri.dispose?.();
      }
      sivut.length = 0;
      uvt.clear();
      instanssit.clear();
      mittarit.tila = 'purettu';
    },
  };
}
