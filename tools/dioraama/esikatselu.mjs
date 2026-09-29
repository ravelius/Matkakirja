/*
 * DIORAAMAN SOMMITTELUESIKATSELU — kehittäjätyökalu (Linnanrakentaja, ali-agentti M,
 * erä 2, 29.9.2026). Piirtää YHDEN pysäytyskuvan valitusta kamerasta (yleis- tai
 * tilakohtainen, vaaka/pysty) three.js:llä, jotta kameroiden rajaus näkee ilman
 * iOS-simulaattoria. EI pelaajille, EI service workeriin.
 *
 * Rajapinta ja kaavat: docs/raportit/dioraama-rajapinnat-20260929.md (kohdat 0 ja 3)
 * ja -era2-20260929.md (kohdat 1-2). Kameran asennon kaava tuodaan SUORAAN
 * js/dioraama/kamera.js:stä (asentoSijainti) - ei kopioida.
 *
 * URL-parametrit (ks. esikatselu.html): paketti, tila, suunta, koko, taulu.
 *
 * Varjostinkaava (natiivin DioraamaMaalattu-varjostimen vastine):
 *   väri = pinnan väri · tekstuuri · (0,72 + 0,28·saturate(dot(N, valo))) ·
 *          lerp(1, AO, 0,85) + lämpö · G
 * COLOR_0: R = AO (1 = avoin), G = lämpö (jo leivottu, sisältää pinnan hehkun).
 * Valo tulee ylhäältä vasemmalta edestä noin 45 astetta: kiinteä maailmavektori
 * (-0.5, √½, 0.5) (jo yksikköpituinen: 0,5² + 0,5² + 0,707² = 1). Speksi ei anna
 * tarkkaa atsimuuttia — tämä on symmetrinen "ylös+vasemmalle+eteen yhtä paljon"
 * -tulkinta 45 asteen korkeuskulmasta.
 *
 * Väripiippu: glTF:n baseColorFactor on lineaarinen (speksi), ja tämä moduuli
 * tekee OMAN varjostimen rakennuksen pinnoille (ei THREEn valmiita materiaaleja),
 * joten THREEn automaattinen lineaari→sRGB-ulostulokoodaus (jonka valmiit
 * materiaalit tekevät colorspace_fragment-lohkolla) EI tapahdu automaattisesti —
 * se tehdään käsin fragmentin lopussa (pow(..., 1/2.2)), jotta kuva ei näytä
 * turhan tummalta. Tekstuurien (pinnat/hahmot/liekit) sRGB-purku sen sijaan
 * tapahtuu automaattisesti (texture.colorSpace + WebGL2:n sRGB-sisäformaatti).
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { asentoSijainti } from '../../js/dioraama/kamera.js';

// ── Säädettävät vakiot (tehtävän kuvaus, kohta "taulu") ────────────────────
const TAULU_PYSTY_OSUUS = 0.45; // pystyssä: ruudun ALAOSAN tämä osuus korkeudesta
const TAULU_VAAKA_OSUUS = 0.40; // vaakana: ruudun OIKEAN REUNAN tämä osuus leveydestä
const TAUSTAVARI = '#cfd6d6';
const PULU_VARI = '#2a63e0';
const PULU_SADE_M = 0.16;
const VALO = new THREE.Vector3(-0.5, Math.SQRT1_2, 0.5).normalize();

// ── URL-parametrit ──────────────────────────────────────────────────────────

/** "393x852" → { leveys: 393, korkeus: 852 }. Virheellinen/puuttuva → oletus. */
function lueKoko(s) {
  const m = /^(\d+)x(\d+)$/.exec(String(s ?? ''));
  if (!m) return { leveys: 393, korkeus: 852 };
  return { leveys: Number(m[1]), korkeus: Number(m[2]) };
}

async function lataaJson(url) {
  const vastaus = await fetch(url);
  if (!vastaus.ok) throw new Error(`esikatselu: ${url} → HTTP ${vastaus.status}`);
  return vastaus.json();
}

const haku = new URLSearchParams(location.search);
const PAKETTI = haku.get('paketti') ?? '../../dist/dioraama/olavinlinna/';
const TILA_ID = haku.get('tila') ?? '';
const SUUNTA = haku.get('suunta') === 'pysty' ? 'pysty' : 'vaaka';
const { leveys: KOKO_L, korkeus: KOKO_K } = lueKoko(haku.get('koko'));
const NAYTA_TAULU = haku.get('taulu') === '1';

// ── Pinnan väri/tekstuuri/AO/lämpö-varjostin (ks. moduulin alun kommentti) ──
const PINTA_VERTEX = `
  attribute vec4 color;
  varying vec3 vNormaaliMaailma;
  varying vec2 vUv;
  varying vec4 vVari;
  void main() {
    vNormaaliMaailma = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    vVari = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const PINTA_FRAGMENT = `
  precision highp float;
  uniform vec3 uVari;
  uniform sampler2D uTekstuuri;
  uniform float uOnTekstuuri;
  uniform vec3 uValo;
  varying vec3 vNormaaliMaailma;
  varying vec2 vUv;
  varying vec4 vVari;
  void main() {
    vec3 n = normalize(vNormaaliMaailma);
    float valoTermi = 0.72 + 0.28 * clamp(dot(n, uValo), 0.0, 1.0);
    float aoTermi = mix(1.0, vVari.r, 0.85);
    vec3 tekstuuri = uOnTekstuuri > 0.5 ? texture2D(uTekstuuri, vUv).rgb : vec3(1.0);
    vec3 vari = uVari * tekstuuri * valoTermi * aoTermi + vec3(vVari.g);
    gl_FragColor = vec4(pow(max(vari, 0.0), vec3(1.0 / 2.2)), 1.0);
  }
`;

const pintaMateriaaliCache = new Map(); // pinta-id → THREE.ShaderMaterial (jaettu kaikkien tilojen kesken)

/**
 * Rakentaa (tai palauttaa välimuistista) yhden pinnan ShaderMaterialin.
 * `pinnat[pintaId].tekstuuri` on valinnainen (era2: puuttuu jos lähdekuvaa ei
 * ollut rakennushetkellä) — silloin tekstuuritermi on vakio 1 (kaava, kohta 3b).
 */
async function haePintaMateriaali(pintaId, pinnat, pakettiUrl) {
  if (pintaMateriaaliCache.has(pintaId)) return pintaMateriaaliCache.get(pintaId);
  const p = pinnat[pintaId];
  if (!p) throw new Error(`esikatselu: pinta '${pintaId}' puuttuu rakennus.json:n pinnat-kentästä`);
  const uniforms = {
    uVari: { value: new THREE.Color(p.vari) }, // THREE.Color olettaa CSS-heksan sRGB:ksi → muuntaa lineaariseksi
    uTekstuuri: { value: null },
    uOnTekstuuri: { value: 0 },
    uValo: { value: VALO },
  };
  if (p.tekstuuri) {
    const tex = await new THREE.TextureLoader().loadAsync(`${pakettiUrl}${p.tekstuuri}`);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping; // UV maailmatasolla / toisto_m: ylittää usein [0,1] → oltava toistuva
    tex.wrapT = THREE.RepeatWrapping;
    uniforms.uTekstuuri.value = tex;
    uniforms.uOnTekstuuri.value = 1;
  }
  const mat = new THREE.ShaderMaterial({
    uniforms, vertexShader: PINTA_VERTEX, fragmentShader: PINTA_FRAGMENT, side: THREE.FrontSide,
  });
  pintaMateriaaliCache.set(pintaId, mat);
  return mat;
}

/**
 * Lataa yhden tilan glb:n ja korvaa sen geneeriset (glTF-oletus-)materiaalit
 * pinta-varjostimilla. Primitiivin materiaalin nimi = pinnan id (rakennuskoneen
 * speksi, kohta 3: "materiaalin nimi = pinnan id") — GLTFLoader kopioi glTF-
 * materiaalin nimen suoraan THREE.Material.name:ksi.
 */
async function lataaTilaGlb(loader, pakettiUrl, tila, rakennusJson, scene) {
  if (!tila.glb?.tiedosto) return;
  const gltf = await loader.loadAsync(`${pakettiUrl}${tila.glb.tiedosto}`);
  const meshit = [];
  gltf.scene.traverse((obj) => { if (obj.isMesh) meshit.push(obj); });
  for (const mesh of meshit) {
    const pintaId = mesh.material?.name;
    // eslint-disable-next-line no-await-in-loop
    mesh.material = await haePintaMateriaali(pintaId, rakennusJson.pinnat, pakettiUrl);
  }
  scene.add(gltf.scene);
}

// ── Hahmot ja liekit: sylinteribillboard, atlaksen ruutu 0 ─────────────────

/**
 * Rakentaa yhden billboard-quadin (hahmo tai liekki), ruutu 0 riviltä `rivi`.
 * Silmukan ruutu 0 on AINA sarakkeessa 0 (era2-speksi, kohta "HENKILOT": ruutu i
 * → k = rivi·sarakkeet + i; i=0 → k=rivi·sarakkeet, joka on aina tasan jaollinen
 * sarakkeet:lla → sarake 0, rivi = rivi). `pivot` siirtää geometrian niin, että
 * pivot-piste on paikallinen origo (asetetaan sitten world-paikkaan).
 */
async function teeBillboard({
  atlasUrl, ruutu, sarakkeet, rivi, pivot, leveysM, korkeusM, peilattu = false, additiivinen = false,
}) {
  const tex = await new THREE.TextureLoader().loadAsync(atlasUrl);
  tex.generateMipmaps = false; // ei mip-vuotoa ruutujen reunojen yli
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  const rivejaYhteensa = Math.max(1, Math.round(tex.image.height / ruutu[1]));
  const ru = 1 / sarakkeet;
  const rv = 1 / rivejaYhteensa;
  const ov = 1 - (rivi + 1) * rv; // flipY (THREEn oletus): rivi 0 = kuvan YLÄREUNA → v lähellä 1:tä
  tex.repeat.set(peilattu ? -ru : ru, rv);
  tex.offset.set(peilattu ? ru : 0, ov);

  const geometria = new THREE.PlaneGeometry(leveysM, korkeusM);
  // Pivot paikalliseen origoon: local-Y=0 on jaloissa (pivot[1] pieni), jotta
  // hahmo/liekki seisoo world-paikan Y:llä (yleensä lattia) eikä upoa/leiju.
  geometria.translate(leveysM * (0.5 - pivot[0]), korkeusM * (0.5 - pivot[1]), 0);
  const materiaali = additiivinen
    ? new THREE.MeshBasicMaterial({
      map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
    // clip(alfa-0.5) natiivissa (era2, DioraamaHahmo) ↔ alphaTest tässä.
    : new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide });
  return new THREE.Mesh(geometria, materiaali);
}

/** Kääntää billboardin Y-akselin ympäri kohti kameraa (sylinteribillboard, ei kallistu). */
function katsoKameraan(mesh, kameranPaikka) {
  const dx = kameranPaikka.x - mesh.position.x;
  const dz = kameranPaikka.z - mesh.position.z;
  mesh.rotation.y = Math.atan2(dx, dz);
}

/** Lisää yhden tilan hahmot (world-paikka suoraan tilan hahmot-listasta). */
async function lisaaHahmot(tila, rakennusJson, pakettiUrl, scene, kameranPaikka) {
  for (const hahmo of tila.hahmot ?? []) {
    const h = rakennusJson.henkilot[hahmo.henkilo];
    const idle = h?.silmukat?.idle;
    if (!idle) { console.warn(`esikatselu: henkilöltä '${hahmo.henkilo}' puuttuu idle-silmukka`); continue; }
    // px_per_m (era2, maalattu) > 0 → skaala sillä; muuten (paikkamerkki) korkeus_m/ruutu[1] ("ennallaan").
    const pxPerM = h.px_per_m > 0 ? h.px_per_m : h.ruutu[1] / h.korkeus_m;
    // eslint-disable-next-line no-await-in-loop
    const mesh = await teeBillboard({
      atlasUrl: `${pakettiUrl}${h.atlas}`,
      ruutu: h.ruutu,
      sarakkeet: h.sarakkeet,
      rivi: idle.rivi,
      pivot: h.pivot,
      leveysM: h.ruutu[0] / pxPerM,
      korkeusM: h.ruutu[1] / pxPerM,
      peilattu: Boolean(hahmo.peilattu),
    });
    mesh.position.set(hahmo.paikka[0], hahmo.paikka[1], hahmo.paikka[2]);
    katsoKameraan(mesh, kameranPaikka);
    scene.add(mesh);
  }
}

/** Lisää yhden tilan liekit (aina ruutu 0 — ei animaatiota, `vaihe` ei vaikuta). */
async function lisaaLiekit(tila, rakennusJson, pakettiUrl, scene, kameranPaikka) {
  for (const l of tila.liekit ?? []) {
    const tieto = rakennusJson.liekit[l.liekki];
    if (!tieto) { console.warn(`esikatselu: liekki '${l.liekki}' puuttuu`); continue; }
    const koko = l.koko ?? 1;
    // eslint-disable-next-line no-await-in-loop
    const mesh = await teeBillboard({
      atlasUrl: `${pakettiUrl}${tieto.atlas}`,
      ruutu: tieto.ruutu,
      sarakkeet: tieto.sarakkeet,
      rivi: 0,
      pivot: tieto.pivot,
      leveysM: tieto.koko_m[0] * koko,
      korkeusM: tieto.koko_m[1] * koko,
      additiivinen: true,
    });
    mesh.position.set(l.paikka[0], l.paikka[1], l.paikka[2]);
    katsoKameraan(mesh, kameranPaikka);
    scene.add(mesh);
  }
}

/** Pulun laskeutumispiste: pieni sininen merkki. `laskeutuminen` voi puuttua (esim. massa). */
function lisaaPulu(laskeutuminen, scene) {
  if (!laskeutuminen) return;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(PULU_SADE_M, 12, 8),
    new THREE.MeshBasicMaterial({ color: PULU_VARI }),
  );
  mesh.position.set(laskeutuminen[0], laskeutuminen[1], laskeutuminen[2]);
  scene.add(mesh);
}

// ── Pääkoodi ─────────────────────────────────────────────────────────────

async function paakoodi() {
  const rakennusJson = await lataaJson(`${PAKETTI}rakennus.json`);
  const kohdeTila = TILA_ID ? rakennusJson.tilat.find((t) => t.id === TILA_ID) : null;
  if (TILA_ID && !kohdeTila) {
    console.warn(`esikatselu: tilaa '${TILA_ID}' ei löydy — käytetään yleisnäkymää`);
  }

  const asento = kohdeTila
    ? (SUUNTA === 'pysty' ? kohdeTila.kameraPysty : kohdeTila.kamera)
    : (SUUNTA === 'pysty' ? rakennusJson.yleiskamera.pysty : rakennusJson.yleiskamera.vaaka);
  if (!asento) throw new Error(`esikatselu: tilalla '${TILA_ID || '(yleis)'}' ei ole kameraa suuntaan '${SUUNTA}'`);
  const { sijainti, kohde, fov } = asentoSijainti(asento);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(2); // kiinteä, ei selaimen oma dpr (tehtävän vaatimus)
  renderer.setSize(KOKO_L, KOKO_K, true);
  renderer.setClearColor(TAUSTAVARI, 1);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // fov = pystysuuntainen (kuten Unityssä) — THREE.PerspectiveCameran fov ON pystysuuntainen oletuksena.
  const camera = new THREE.PerspectiveCamera(fov, KOKO_L / KOKO_K, 0.1, 2000);
  camera.position.set(sijainti[0], sijainti[1], sijainti[2]);
  camera.lookAt(kohde[0], kohde[1], kohde[2]);

  // Kaikki tilat ladataan aina (myös 'massa'): dioraama on yksi jaettu maailma,
  // ja kamera vain siirtyy tilasta toiseen (naapuritilat voivat näkyä reunoilla).
  const loader = new GLTFLoader();
  for (const tila of rakennusJson.tilat) {
    // eslint-disable-next-line no-await-in-loop
    await lataaTilaGlb(loader, PAKETTI, tila, rakennusJson, scene);
  }
  for (const tila of rakennusJson.tilat) {
    // eslint-disable-next-line no-await-in-loop
    await lisaaHahmot(tila, rakennusJson, PAKETTI, scene, camera.position);
    // eslint-disable-next-line no-await-in-loop
    await lisaaLiekit(tila, rakennusJson, PAKETTI, scene, camera.position);
  }
  // Pulun laskeutumispiste: tilan oma (kohdistettava tila) tai rakennuksen (yleisnäkymä/massa).
  lisaaPulu(kohdeTila ? kohdeTila.pulu?.laskeutuminen : rakennusJson.pulu?.laskeutuminen, scene);

  if (NAYTA_TAULU) {
    const peite = document.getElementById('taulu-peite');
    if (SUUNTA === 'pysty') {
      const korkeus = Math.round(KOKO_K * TAULU_PYSTY_OSUUS);
      Object.assign(peite.style, {
        left: '0px', top: `${KOKO_K - korkeus}px`, width: `${KOKO_L}px`, height: `${korkeus}px`, borderTopWidth: '2px',
      });
    } else {
      const leveys = Math.round(KOKO_L * TAULU_VAAKA_OSUUS);
      Object.assign(peite.style, {
        left: `${KOKO_L - leveys}px`, top: '0px', width: `${leveys}px`, height: `${KOKO_K}px`, borderLeftWidth: '2px',
      });
    }
    peite.hidden = false;
  }

  renderer.render(scene, camera);
  window.valmis = true;
}

paakoodi().catch((err) => {
  console.error(err);
  window.esikatseluVirhe = String(err?.stack ?? err);
  window.valmis = true; // savuke ei jää odottamaan ikuisesti — virhe luettavissa window.esikatseluVirhe:stä
});
