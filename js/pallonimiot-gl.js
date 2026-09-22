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
 * HORISONTIN HÄIVE (runko 3, 21.9.2026 ilta): reunalla nimi ei katkea
 * kesken vaan häipyy — peitto kerrotaan smoothstepillä pinnan normaalin
 * ja katsesuunnan kosinista (GLNIMIOT_HORISONTIN_HAIVE, ≈ 7° ennen
 * reunaa). Kosini ei riipu kameran etäisyydestä, joten häive on yhtä
 * leveä kaikilla zoomeilla.
 *
 * ATLAS: 2048 × 2048 -kankaita hyllypakkauksella (rivit rasterin
 * korkeuden mukaan); sivu täyttyy → uusi sivu. Sama avain = sama
 * rasteri = sama UV (välimuisti avaimella). Sivun tekstuuri viedään
 * näytönohjaimelle vain kun sivulle on kirjoitettu (needsUpdate).
 * TIIVISTYS (runko 3): kun kaikki sivut ovat täynnä eikä uutta saa,
 * sivu, jolla on eniten KUOLLEITA rastereita (avain ilman instanssia
 * listalla), pakataan uudestaan: elävät rasterit kopioidaan sivun
 * omasta kankaasta uuteen hyllyyn, kuolleet pudotetaan (uvt-tietue
 * pois → sovitin varaa ne tarvittaessa uudestaan). Elävää avainta ei
 * koskaan vapauteta (Pelikoodarin ehto: muuten sovitin varaisi joka
 * jaossa uudestaan). Näin `varaa` ei palauta null-arvoa panoroinnissa
 * eikä nimi putoa CSS2D:hen; null tulee vasta, kun elävät yksin
 * täyttävät kaikki sivut.
 *
 * KUOREN KERROIN on uniform: nimiöiden koko zoomin mukaan (Pelikoodarin
 * E2, `kuorenKerroin()`) skaalaa kaikki spritet ankkurinsa ympäri
 * ilman uutta rasteria; rasteri uusitaan vain kun porras vaihtuu.
 *
 * Kytkin: oletus PÄÄLLÄ (omistaja 21.9.2026), `?glnimiot=0` CSS2D:hen;
 * CSS2D on myös automaattinen perääntymistie ilman WebGL-tekstuuria. Kirjaston luokat (Mesh, BufferGeometry,
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
/** Horisontin häiveen leveys kosinina (0 = reuna; 0,12 ≈ 7° ennen reunaa). */
export const GLNIMIOT_HORISONTIN_HAIVE = 0.12;
/** Testinimiön fontti ja koko (vain runko; tuotannon rasterit Pelikoodarilta). */
export const GLNIMIOT_TESTIFONTTI = '"Liberation Serif", "Times New Roman", serif';

/**
 * Onko GL-kerros käytössä. OLETUS PÄÄLLÄ (omistaja 21.9.2026 illalla:
 * *"GL-kerros suoraan oletukseksi ilman kokeilulippua"* — omistaja testaa
 * natiivilla iOS-apilla, jossa URL-lippuja ei voi käyttää). `?glnimiot=0`
 * on kehittäjän perääntymistie CSS2D:hen; `?glnimiot=testi` rungon
 * testinimiöt. Ilman WebGL-tekstuuria (kirjaston luokat eivät ilmesty
 * sceneen tai runko kaatuu) lauta putoaa CSS2D:hen automaattisesti
 * (js/pallolauta/lauta.js glKehys).
 */
/**
 * Atlaksen väriavaruus: NoColorSpace ('' three r152+). Ks. uusiSivu —
 * oma varjostin kirjoittaa näytteen sellaisenaan, joten purkua ei saa
 * tehdä. Vakio on nimetty, jotta testi voi vahtia sitä.
 */
export const GLNIMIOT_VARIAVARUUS = '';

export function glNimiotKaytossa(win = globalThis) {
  try {
    const arvo = new URLSearchParams(win.location?.search ?? '').get('glnimiot');
    return arvo == null || !/^(0|off|false|pois)$/.test(arvo);
  } catch { return true; }
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
  /*
   * PERUS-ShaderMaterial, EI ALILUOKKA: scenen ensimmäinen varjostin-
   * materiaali voi olla LineMaterial (fat line), jonka rakentaja
   * kirjoittaa omat varjostimensa ja uniforminsa. Kuljetaan
   * prototyyppiketjua ylös, kunnes isä ei enää ole varjostinmateriaali.
   */
  let ShaderMaterial = shader.constructor;
  for (;;) {
    const isa = Object.getPrototypeOf(ShaderMaterial.prototype)?.constructor;
    if (!isa || !isa.prototype?.isShaderMaterial) break;
    ShaderMaterial = isa;
  }
  return {
    Mesh: verkko.constructor,
    BufferGeometry,
    BufferAttribute: verkko.geometry.attributes.position.constructor,
    Texture: verkko.material.map.constructor,
    ShaderMaterial,
    tekstuurimalli: verkko.material.map,
  };
}

const VERTEX = `
attribute vec3 maapiste;
attribute vec2 kulma;      // kulman paikka rasterissa ankkurista, rasterin px
attribute vec2 uvKoord;
attribute float peitto;
attribute float skaala;    // css-px per rasterin px kertoimella 1
attribute vec2 siirto;     // ladonnan siirto maapisteestä, css-px kertoimella 1
attribute vec2 katto;      // koon kerroin = min(kerroin * a, b)
attribute float syke;      // 1 = hehkupiste sykkii levossa (uniform sykeKerroin), 0 = ei
uniform float sykeKerroin; // pisteen koon kerroin juuri nyt (1 = lepo/liike ilman sykettä)
uniform vec2 ruutu;        // ruutu laitepikseleinä
uniform float kerroin;     // kuoren kerroin (nimiöiden koko zoomin mukaan)
uniform float dpr;         // css-px → laitepikseli
uniform float haive;       // horisontin häiveen leveys kosinina
varying vec2 vUv;
varying float vPeitto;
void main() {
  vec4 maailma = modelMatrix * vec4(maapiste, 1.0);
  vec4 clip = projectionMatrix * viewMatrix * maailma;
  // Horisontti maailman koordinaateissa: pallon keskipiste on origossa.
  // Kosini normaalin ja katsesuunnan välillä: 0 reunalla, häive sen yli.
  float kosini = dot(normalize(maailma.xyz), normalize(cameraPosition - maailma.xyz));
  float edessa = smoothstep(0.0, haive, kosini);
  float koko = min(kerroin * katto.x, katto.y) * mix(1.0, sykeKerroin, syke);
  vec2 px = (siirto * kerroin + kulma * skaala * koko) * dpr;
  clip.xy += px * 2.0 / ruutu * clip.w;
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
/*
 * ══ PIIRTOKOKEET: PUSKURIKIRJOITUKSET JA VIENNIT VEDON AIKANA ═══════
 * (omistajan tilaus Fablen kautta 22.9.2026, taustana Safarin GPU-
 * prosessi: jokainen GL-kutsu kulkee IPC:n yli ja `bufferSubData` on
 * Safarissa poikkeuksellisen kallis.)
 *
 * `?koe=eipuskuri` jäädyttää vedon ajaksi ne kirjoitukset, jotka
 * muuten menevät GPU:lle joka kehyksessä: peiton osapäivitykset
 * (crossfade) ja koko geometrian rakennuksen. Ne eivät katoa, vaan
 * odottavat lepoa — kuva jää siis eleen ajaksi siihen asentoon, jossa
 * häivytys oli. `?koe=eivienti` tekee saman tekstuurivienneille.
 *
 * Kokeet ovat MITTAUSTA VARTEN: kumpikin muuttaa ulkoasua vedon aikana
 * eikä kumpaakaan ole tarkoitettu oletukseksi ilman omistajan päätöstä.
 */
export function luoNimiokerrosGL({
  pallo, kotelo, ikkuna = globalThis, luokat = null, juuri = null, liikkeessa = () => false,
}) {
  const doc = kotelo?.ownerDocument ?? ikkuna.document;
  const L = luokat ?? glLuokat(pallo);
  const atlasKoko = (() => { try { return (new URLSearchParams(ikkuna.location?.search ?? '').get('koe') ?? '').split(',').includes('atlaskoko'); } catch { return false; } })();
  const kokeet = (() => {
    try { return new Set(((new URLSearchParams(ikkuna.location?.search ?? '')).get('koe') ?? '').split(',').map((k) => k.trim())); } catch { return new Set(); }
  })();
  const eiPuskuri = kokeet.has('eipuskuri');
  const eiVienti = kokeet.has('eivienti');
  /** Jäädytetäänkö kirjoitukset juuri nyt (koe + liike). */
  const jaassa = (lippu) => lippu && liikkeessa();
  const mittarit = {
    tila: L ? 'valmis' : 'ei-luokkia', instansseja: 0, sivuja: 0, rastereita: 0, drawcalls: 0,
    rakennuksia: 0, rakennusMs: 0, atlasTayttoaste: 0, kerroin: 1, kehyksia: 0,
    tiivistyksia: 0, pudotettuja: 0, kuolleita: 0,
    /* Puskuri- ja uniformikirjoitukset (overlay, ?koe=profiili). */
    puskurikirjoituksia: 0, uniformeja: 0, vienteja: 0, jaadytettyja: 0,
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
  /** Rakennus seuraavassa kehyksessä — ja lepopiirrolle tieto, että kehys on piirrettävä. */
  const likaa = () => { likainen = true; pallo?.__piirto?.tarvitaan(); };
  let kerroinNyt = 1;
  let sykeNyt = 1;
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
    /*
     * ATLAS EI OLE VÄRIHALLITTU TEKSTUURI (Pelikoodari 22.9.2026).
     *
     * Aiemmin väriavaruus kopioitiin pallon PINNAN tekstuurista
     * (`L.tekstuurimalli`). Se on oikein siellä, missä kuvan lukee
     * kirjaston oma materiaali: three purkaa sRGB:n lineaariseksi
     * näytteistyksessä ja koodaa sen takaisin ulostulossa. TÄMÄN
     * kerroksen lukee oma varjostin, joka kirjoittaa näytteen
     * sellaisenaan (`gl_FragColor = v`) — koodausta takaisin ei ole.
     * Niinpä sRGB-purku jäi puolitiehen: kangas piirsi kullan
     * rgba(246,210,122,0.72), mutta ruudulle tuli kylläinen oranssi ja
     * punamullasta tummanpuhuva. Virhe on keskisävyissä suurin, joten
     * se ei näkynyt lähes mustassa musteessa eikä lähes valkoisessa
     * halossa — vasta kohdemerkin iso kultalevy paljasti sen.
     *
     * Atlas on valmiiksi ruudun väriavaruudessa (2D-kangas piirsi sen
     * CSS-väreillä), joten oikea ratkaisu on olla purkamatta ja
     * koodaamatta lainkaan: NoColorSpace ('' three r152+). Tällöin
     * tavut kulkevat kankaasta ruudulle muuttumattomina ja sekoitus
     * tapahtuu samassa avaruudessa kuin CSS:llä — eli täsmälleen kuten
     * CSS2D-polulla, jota vasten ulkoasu on mitoitettu.
     *
     * Vaihtoehto olisi koodata varjostimessa lineaarinen → sRGB, mutta
     * se olisi esikerrotun alfan kanssa väärin ilman puramista ja
     * uudelleenkertomista, ja maksaisi pow():n joka pikselille.
     *
     * OLETUS PÄTEE VAIN SUORAAN RUUTUPUSKURIIN PIIRRETTÄESSÄ
     * (Karttaseppä, rungon omistaja, katselmuksessa 22.9.2026). Jos
     * tämä kerros joskus piirretään VÄLIRENDERTARGETTIIN tai kulkee
     * jälkikäsittelyn läpi, välipuskuri on lineaarinen ja väriavaruus
     * on mietittävä uudestaan — silloin purku ja koodaus kuuluvat
     * ketjuun. Vartijat kattavat varjostimen (tests/pallonimiot-gl) ja
     * väriketjun identiteetin (savuke-glnimiot), MUTTA EIVÄT tätä:
     * rendertargetin lisääjä ei saa niistä varoitusta.
     */
    tekstuuri.colorSpace = GLNIMIOT_VARIAVARUUS;
    const materiaali = new L.ShaderMaterial({
      uniforms: {
        atlas: { value: tekstuuri },
        ruutu: { value: { x: ruutu.x, y: ruutu.y, isVector2: true, set(a, b) { this.x = a; this.y = b; } } },
        kerroin: { value: 1 },
        dpr: { value: 1 },
        haive: { value: GLNIMIOT_HORISONTIN_HAIVE },
        sykeKerroin: { value: 1 },
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
      /** Onko sivu kertaalleen viety näytönohjaimelle (sen jälkeen osittaiset päivitykset riittävät, ks. ATLAKSEN OSITTAINEN PÄIVITYS). */
      viety: false,
    };
    sivut.push(sivu);
    ryhma.add(verkko);
    mittarit.sivuja = sivut.length;
    return sivu;
  };

  /** Elävät avaimet: joilla on instanssi listalla. */
  const elavatAvaimet = () => {
    const elavat = new Set();
    for (const inst of instanssit.values()) elavat.add(inst.avain);
    return elavat;
  };
  /**
   * TIIVISTYS (ks. otsikko): pakkaa uudestaan sen sivun, jolla on eniten
   * kuollutta alaa, ja pudottaa kuolleet rasterit. Palauttaa sivun, jos
   * jotain vapautui, muuten null.
   */
  const tiivista = () => {
    const elavat = elavatAvaimet();
    let paras = null;
    for (const sivu of sivut) {
      let kuollut = 0;
      let elava = 0;
      for (const [avain, t] of uvt) {
        if (t.sivu !== sivu) continue;
        if (elavat.has(avain)) elava += t.w * t.h; else kuollut += t.w * t.h;
      }
      if (kuollut > 0 && (!paras || kuollut > paras.kuollut)) paras = { sivu, kuollut, elava };
    }
    if (!paras) return null;
    const { sivu } = paras;
    // Kopio sivun kankaasta: elävät rasterit luetaan siitä, ei lähteestä (sitä ei säilytetä).
    const kopio = doc.createElement('canvas');
    kopio.width = GLNIMIOT_ATLAS;
    kopio.height = GLNIMIOT_ATLAS;
    kopio.getContext('2d').drawImage(sivu.kangas, 0, 0);
    sivu.pakkaus = new Hyllypakkaus();
    sivu.ctx.clearRect(0, 0, GLNIMIOT_ATLAS, GLNIMIOT_ATLAS);
    // Elävät korkeusjärjestyksessä (hyllyt täyttyvät tiiviimmin), kuolleet pois.
    const siirrettavat = [];
    for (const [avain, t] of uvt) {
      if (t.sivu !== sivu) continue;
      if (elavat.has(avain)) siirrettavat.push([avain, t]);
      else { uvt.delete(avain); mittarit.pudotettuja += 1; }
    }
    siirrettavat.sort((a, b) => b[1].h - a[1].h || b[1].w - a[1].w);
    for (const [avain, t] of siirrettavat) {
      const paikka = sivu.pakkaus.varaa(t.w, t.h);
      if (!paikka) { uvt.delete(avain); continue; } // ei mahdu enää: instanssi jää piirtämättä, sovitin varaa uudestaan
      sivu.ctx.drawImage(kopio, t.u0 * GLNIMIOT_ATLAS, t.v0 * GLNIMIOT_ATLAS, t.w, t.h, paikka.x, paikka.y, t.w, t.h);
      t.u0 = paikka.x / GLNIMIOT_ATLAS; t.v0 = paikka.y / GLNIMIOT_ATLAS;
      t.u1 = (paikka.x + t.w) / GLNIMIOT_ATLAS; t.v1 = (paikka.y + t.h) / GLNIMIOT_ATLAS;
    }
    sivu.likainen = true;
    likaa(); // UV:t muuttuivat → geometriat uusiksi
    mittarit.tiivistyksia += 1;
    mittarit.rastereita = uvt.size;
    return sivu;
  };

  /** Rasteri atlakseen (tai välimuistista). Palauttaa UV-tietueen tai null. */
  const varaaRasteri = (avain, rasteri) => {
    const vanha = uvt.get(avain);
    if (vanha) return vanha;
    if (!rasteri?.kuva || !(rasteri.w > 0) || !(rasteri.h > 0)) return null;
    let sivu = null;
    let paikka = null;
    const etsiPaikka = () => {
      for (const s of sivut) {
        paikka = s.pakkaus.varaa(rasteri.w, rasteri.h);
        if (paikka) { sivu = s; return true; }
      }
      return false;
    };
    if (!etsiPaikka()) {
      sivu = uusiSivu();
      if (sivu) paikka = sivu.pakkaus.varaa(rasteri.w, rasteri.h);
      // Kaikki sivut täynnä: tiivistä kuolleet pois ja yritä uudestaan (enintään sivujen verran).
      for (let i = 0; !paikka && i < GLNIMIOT_SIVUJA_MAX; i += 1) {
        if (!tiivista()) break;
        etsiPaikka();
      }
      if (!paikka) return null;
    }
    sivu.ctx.clearRect(paikka.x, paikka.y, rasteri.w, rasteri.h);
    sivu.ctx.drawImage(rasteri.kuva, paikka.x, paikka.y, rasteri.w, rasteri.h);
    /*
     * ATLAKSEN OSITTAINEN PÄIVITYS (sulavuuskatsaus 22.9.2026 kohta 8).
     * `needsUpdate = true` vie koko 2048²-kankaan (16 Mt) näytönohjaimelle
     * joka kerta, kun yksikin rasteri lisätään — yksittäinen 20–40 ms:n
     * kehys zoomissa portaan vaihtuessa. Kun sivu on kerran viety, uusi
     * rasteri viedään texSubImage2D:llä vain omaan suorakaiteeseensa
     * (three: renderer.copyTextureToTexture, lähde = rasterin oma kuva
     * kääreessä). Kangas päivitetään yhä (tiivistys kopioi siitä).
     * Vienti tehdään HETI, koska rasterilähde ei säilytä kuvaa. Koko
     * sivun vienti jää ensimmäiseen kertaan ja tiivistykseen.
     * Koelippu `?koe=atlaskoko` palauttaa koko kankaan viennin.
     */
    const renderer = pallo?.renderer?.();
    if (sivu.viety && !atlasKoko && typeof renderer?.copyTextureToTexture === 'function') {
      try {
        /*
         * LÄHTEENÄ ATLASKANGAS, EI RASTERIN OMA KUVA (Pelikoodari
         * 22.9.2026). Kun lähde oli rasterin oma kangas, osittain
         * päivitetty läpinäkyvä pikseli piirtyi LIIAN KIRKKAANA:
         * mitattu kohdemerkin kultalevy rgba(246,210,122,0.72)
         * pohjalla (144,116,90) — koko kankaan viennillä ja CSS2D:llä
         * (212,182,117), osapäivityksellä (246,237,148). Kun lähde on
         * SAMA kangas, josta koko sivun vientikin tulee, molemmat polut
         * vievät tavulleen samat pikselit samoilla asetuksilla eikä
         * eroa voi syntyä. Alue annetaan srcRegionina (ankka-Box2:
         * three lukee vain min/max).
         */
        /*
         * EI `needsUpdate`iä LÄHTEELLE (Karttasepän katselmushuomio
         * 22.9.2026 ja sen mittaus). Välimuistitettu lähdetekstuuri
         * voisi periaatteessa jäädä ensimmäiseen kuvaan. Näin ei käy:
         * three ei lataa lähdettä GPU-tekstuurina lainkaan, vaan lukee
         * `srcTexture.image`in — eli ELÄVÄN kankaan — ja vie sen
         * suoraan texSubImage2D:llä. Mitattu kahdella peräkkäisellä
         * osapäivityksellä eri väreillä: molemmat oikein (ero 0),
         * eikä ensimmäinen turmellu (vartija savuke-glnimiot
         * "osapäivityksen lähde on tuore").
         *
         * `needsUpdate = true` olisi tässä paitsi turha myös riski:
         * jos three joskus SITOO lähteen, lippu laukaisisi koko
         * 2048²-kankaan latauksen joka rasterilla — juuri sen kulun,
         * jonka osapäivitys poistaa (kohta 8).
         */
        if (!sivu.lahdetekstuuri) {
          sivu.lahdetekstuuri = new L.Texture(sivu.kangas);
          sivu.lahdetekstuuri.flipY = false;
          sivu.lahdetekstuuri.premultiplyAlpha = true;
        }
        const lahde = sivu.lahdetekstuuri;
        const alue = {
          min: { x: paikka.x, y: paikka.y },
          max: { x: paikka.x + rasteri.w, y: paikka.y + rasteri.h },
        };
        const kohta = { x: paikka.x, y: paikka.y, z: 0 };
        /*
         * ALUE ON PAKOLLINEN, KOSKA LÄHDE ON KOKO ATLASKANGAS
         * (Karttasepän katselmushuomio 22.9.2026, voimaan jäänyt kohta).
         * three laskee kopioitavan koon srcRegionista; jos alue on
         * null, koko on lähteen koko eli KOKO ATLAS, ja se kopioituisi
         * siirtymään. Vanha allekirjoitus (position, src, dst) ei ota
         * aluetta lainkaan, joten sillä ei voi tehdä rajattua kopiota
         * nyt kun lähde on kangas eikä yksittäinen rasteri.
         *
         * Siksi vanhalla allekirjoituksella EI tehdä osapäivitystä
         * lainkaan, vaan jäädään koko sivun vientiin: hitaampi mutta
         * oikea. Nidotulla kirjastolla (globe.gl 2.46.2) haara on
         * kuollut — `copyTextureToTexture.length === 2`, koska
         * oletusarvolliset parametrit eivät lasketa mukaan — mutta
         * kirjaston vaihtuessa tämä ei hiljaa turmele atlasta.
         */
        if (renderer.copyTextureToTexture.length >= 3) {
          sivu.likainen = true;
          mittarit.atlasVanhaAllekirjoitus = (mittarit.atlasVanhaAllekirjoitus ?? 0) + 1;
        } else {
          renderer.copyTextureToTexture(lahde, sivu.tekstuuri, alue, kohta);
          mittarit.atlasOsapaivityksia = (mittarit.atlasOsapaivityksia ?? 0) + 1;
        }
        pallo?.__piirto?.tarvitaan();
      } catch (virhe) {
        sivu.likainen = true;
        mittarit.atlasOsavirhe = String(virhe?.message ?? virhe).slice(0, 120);
      }
    } else {
      sivu.likainen = true;
      if (!sivu.viety) mittarit.atlasEiViety = (mittarit.atlasEiViety ?? 0) + 1;
    }
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
      const skaala = new Float32Array(n * 4);
      const siirto = new Float32Array(n * 4 * 2);
      const katto = new Float32Array(n * 4 * 2);
      const syke = new Float32Array(n * 4);
      // Indeksit TAVALLISENA TAULUKKONA: setIndex valitsee itse Uint16/Uint32-
      // attribuutin. Scenestä luettu BufferAttribute on Float32-aliluokka,
      // ja liukulukuindeksit antoivat INVALID_ENUMin (piirto katosi hiljaa).
      const indeksit = new Array(n * 6);
      lista.forEach(([inst, uv], i) => {
        // Peiton osapäivitys (peitto()): instanssin sivu ja neljän kulman alku.
        inst.sivu = sivu; inst.kulmaAlku = i * 4;
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
          skaala[j] = inst.skaala;
          siirto[j * 2] = inst.dx; siirto[j * 2 + 1] = -inst.dy;
          katto[j * 2] = inst.kattoA; katto[j * 2 + 1] = inst.kattoB;
          syke[j] = inst.syke ? 1 : 0;
        }
        const b = i * 4;
        indeksit[i * 6] = b; indeksit[i * 6 + 1] = b + 2; indeksit[i * 6 + 2] = b + 1;
        indeksit[i * 6 + 3] = b; indeksit[i * 6 + 4] = b + 3; indeksit[i * 6 + 5] = b + 2;
      });
      const g = sivu.geometria;
      g.setAttribute('maapiste', new L.BufferAttribute(maapiste, 3));
      g.setAttribute('kulma', new L.BufferAttribute(kulma, 2));
      g.setAttribute('uvKoord', new L.BufferAttribute(uvKoord, 2));
      g.setAttribute('peitto', new L.BufferAttribute(peitto, 1));
      g.setAttribute('skaala', new L.BufferAttribute(skaala, 1));
      g.setAttribute('siirto', new L.BufferAttribute(siirto, 2));
      g.setAttribute('katto', new L.BufferAttribute(katto, 2));
      g.setAttribute('syke', new L.BufferAttribute(syke, 1));
      g.setIndex(indeksit);
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
    aseta(id, {
      lat, lng, avain, rasteri = null, peitto = 1, opacity = null,
      skaala = 1, dx = 0, dy = 0, katto = null, syke = false,
    }) {
      if (purettu || !Number.isFinite(lat) || !Number.isFinite(lng) || !avain) return false;
      const uv = uvt.get(avain) ?? (rasteri ? varaaRasteri(avain, rasteri) : null);
      if (!uv) return false;
      instanssit.set(id, {
        lat, lng, avain, peitto: Number.isFinite(opacity) ? opacity : peitto,
        skaala: Number.isFinite(skaala) && skaala > 0 ? skaala : 1,
        dx: Number(dx) || 0, dy: Number(dy) || 0,
        kattoA: Number.isFinite(katto?.a) ? katto.a : 1, kattoB: Number.isFinite(katto?.b) ? katto.b : 1e6,
        syke: Boolean(syke),
        piste: glMaapiste(lat, lng, sade),
      });
      likaa();
      return true;
    },
    /**
     * Koko instanssilista kerralla (Pelikoodarin ladonta): rivit
     * { tunnus, lat, lng, avain, skaala, dx, dy, katto:{a,b}|null, opacity }.
     * Rasteri on varattava ensin `atlas.varaa`lla; rivi ilman rasteria
     * jätetään pois (jää CSS2D:hen). Palauttaa hyväksyttyjen määrän.
     */
    asetaKaikki(lista) {
      instanssit.clear();
      let n = 0;
      for (const r of lista ?? []) {
        if (this.aseta(r.tunnus ?? r.id, r)) n += 1;
      }
      likaa();
      return n;
    },
    /** Atlas rasterilähteelle: varaa(avain, kuva, w, h, ankkuriX, ankkuriY) → UV-tietue | null (täynnä). */
    atlas: {
      varaa: (avain, kuva, w, h, ankkuriX = 0, ankkuriY = 0) => {
        if (purettu) return null;
        const uv = varaaRasteri(avain, { kuva, w, h, ankkuriX, ankkuriY });
        return uv ? { u0: uv.u0, v0: uv.v0, u1: uv.u1, v1: uv.v1, w: uv.w, h: uv.h, ankkuriX: uv.ankkuriX, ankkuriY: uv.ankkuriY } : null;
      },
      hae: (avain) => uvt.get(avain) ?? null,
      get versio() { return mittarit.rastereita; },
    },
    poista(id) {
      const oli = instanssit.delete(id);
      if (oli) likaa();
      return oli;
    },
    tyhjenna() { instanssit.clear(); likaa(); },
    /**
     * Peitto (0…1) yhdelle instanssille — kylkivaihdon crossfade, piilotus.
     * OSAPÄIVITYS, EI RAKENNUSTA (sulavuus 22.9.2026, ablaatiotikas:
     * häivytys kirjoitti joka kehyksessä `likainen` ja rakensi kaikki
     * puskurit uusiksi — 134 instanssia × 7 attribuuttia × uusi GPU-
     * puskuri joka kehys zoomin aikana). Nyt vain neljä lukua peitto-
     * attribuuttiin ja needsUpdate; rakennus vain, jos instanssi ei ole
     * vielä geometriassa.
     */
    peitto(id, arvo) {
      const inst = instanssit.get(id);
      if (!inst) return;
      inst.peitto = Math.max(0, Math.min(1, arvo));
      const attr = !likainen && inst.sivu ? inst.sivu.geometria.getAttribute('peitto') : null;
      if (!attr || !(inst.kulmaAlku >= 0) || inst.kulmaAlku + 3 >= attr.count) { likaa(); return; }
      if (jaassa(eiPuskuri)) { mittarit.jaadytettyja += 1; return; }
      for (let k = 0; k < 4; k += 1) attr.setX(inst.kulmaAlku + k, inst.peitto);
      attr.needsUpdate = true;
      mittarit.puskurikirjoituksia += 1;
      pallo?.__piirto?.tarvitaan();
      mittarit.peittopaivityksia = (mittarit.peittopaivityksia ?? 0) + 1;
    },
    /** Kuoren kerroin (nimiöiden koko zoomin mukaan) — uniform, ei uutta rasteria. */
    kerroin(arvo) { if (Number.isFinite(arvo) && arvo > 0) kerroinNyt = arvo; },
    /** Hehkupisteen sykähdys: koon kerroin (1 = ei sykettä) — uniform, vain syke-instansseille. */
    syke(arvo) { if (Number.isFinite(arvo) && arvo > 0) sykeNyt = arvo; },
    /** Montako rungon instanssia sykkii (lepopiirto). */
    sykkivia() { let n = 0; for (const inst of instanssit.values()) if (inst.syke && inst.peitto > 0) n += 1; return n; },
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
      // Rakennus kirjoittaa KAIKKI puskurit uusiksi; kokeessa se odottaa lepoa.
      if (likainen && !jaassa(eiPuskuri)) { rakenna(); mittarit.puskurikirjoituksia += 1; }
      else if (likainen) mittarit.jaadytettyja += 1;
      for (const s of sivut) {
        s.materiaali.uniforms.ruutu.value.set(ruutu.x, ruutu.y);
        s.materiaali.uniforms.kerroin.value = kerroinNyt;
        s.materiaali.uniforms.sykeKerroin.value = sykeNyt;
        s.materiaali.uniforms.dpr.value = suhde;
        mittarit.uniformeja += 4;
        if (s.likainen && jaassa(eiVienti)) { mittarit.jaadytettyja += 1; continue; }
        if (s.likainen) {
          s.tekstuuri.needsUpdate = true; s.likainen = false; s.viety = true;
          mittarit.vienteja += 1;
          mittarit.atlasKokopaivityksia = (mittarit.atlasKokopaivityksia ?? 0) + 1;
        }
      }
      mittarit.kerroin = kerroinNyt;
      mittarit.syke = sykeNyt;
      mittarit.atlasTayttoaste = sivut.length ? sivut[sivut.length - 1].pakkaus.tayttoaste : 0;
      if (likainen === false && mittarit.kehyksia % 60 === 0) {
        const elavat = elavatAvaimet();
        let kuolleita = 0;
        for (const avain of uvt.keys()) if (!elavat.has(avain)) kuolleita += 1;
        mittarit.kuolleita = kuolleita;
      }
    },
    /** Tiivistä atlas nyt (savukkeet): pudottaa kuolleet rasterit; palauttaa pudotettujen määrän. */
    tiivista() {
      const ennen = mittarit.pudotettuja;
      while (tiivista()) { /* kunnes yhtään kuollutta ei ole */ }
      return mittarit.pudotettuja - ennen;
    },
    /** Onko avaimelle jo rasteri atlaksessa. */
    onRasteri: (avain) => uvt.has(avain),
    /** Koko kerros näkyviin/piiloon (savukkeet, kuvavertailu). */
    nakyvyys(paalla) { for (const s of sivut) s.verkko.visible = Boolean(paalla) && s.geometria.drawRange.count > 0; },
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
