/*
 * AJATTELIJAT-LINSSI (pilotti Sokrates; omistaja 1.10.2026, Päätoimittajan tilaus 2.10.2026). Web on linssien
 * malli, natiivi (Linssiseppä) tekee perään. Visuaalinen malli: Linnanrakentajan Blender-video v7–v10
 * (docs/raportit/kuvat/sokrates-20261001/, haara linnanrakentaja-sokrates-bysti).
 *
 * VAIHE 1 (kehityslipun takana, ?ajattelija=sokrates; ei pelaajille ennen omistajan OK:ta): three.js-näkymä,
 * GLB (L1 + normaalikartta), musta tausta, kova avainvalo (Rembrandt) ja pystyvinjetti laajassa otoksessa,
 * kamera liukuu otsalle, ja Puolustuspuhe 38a kulkee videotykin valona pinnan yli (js/linssit/ajattelija-projektori.js).
 *
 * three.js r185 + GLTFLoader (MIT) ladataan R2:n vendor/-kansiosta vasta, kun linssi avataan (ei etusivun
 * latausta), samaan selaimen välimuistiin kuin pallon kirjasto (js/pallo.js PALLO_KIRJASTO).
 */
import { SOKRATES } from './ajattelija-sokrates.js';
import { piirraAtlas, lisaaProjektorit, asetaProjektori } from './ajattelija-projektori.js';

const R2 = 'https://media.matkakirja.app/';
export const AJATTELIJA_KIRJASTO = `${R2}vendor/three-gltf-r185.min.js`;
export const AJATTELIJAT = Object.freeze({ sokrates: SOKRATES });
const RUUTUA_S = 30;   // Blender-mallin ruudut

let kolmeLupaus = null;
/** three.js + GLTFLoader yhtenä ES-moduulina (tools/vie-three-vendor.mjs). */
export function lataaKolme() {
  kolmeLupaus ??= import(AJATTELIJA_KIRJASTO).catch((syy) => { kolmeLupaus = null; throw syy; });
  return kolmeLupaus;
}

/** ?ajattelija=<tunnus> → tunnus, jos ajattelija on olemassa (kehityslippu). */
export function ajattelijaLipusta(haku = globalThis.location?.search ?? '') {
  try {
    const t = new URLSearchParams(haku).get('ajattelija');
    return t && AJATTELIJAT[t] ? t : null;
  } catch { return null; }
}

/** Blender (z ylös, kasvot −y) → three.js (y ylös, kasvot +z): (x, y, z) → (x, z, −y). Kierto, ei peilaus. */
export function b2t(THREE, [x, y, z]) { return new THREE.Vector3(x, z, -y); }

/** Pystykenttä asteina Blenderin pystysensorista (24 mm) ja polttovälistä. */
export function kenttaMm(mm) { return 2 * Math.atan(12 / mm) * 180 / Math.PI; }

/** Toistettava satunnaisluku (mulberry32): sama siemen → sama taustavirta joka avauksella. */
function ajattelijaSiemenluku(siemen) {
  let s = siemen >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
function sekoitaSiemenella(lista, satunnainen) {
  for (let i = lista.length - 1; i > 0; i -= 1) {
    const j = Math.floor(satunnainen() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}
const pehmea = (t) => { const x = Math.min(1, Math.max(0, t)); return x * x * (3 - 2 * x); };
const valilla = (r, a, b) => (r - a) / (b - a);

/** Säde edestä (Blender: y = −2 → +y) bystiin: osumapiste ja pinnan normaali three-koordinaateissa. */
function osuma(THREE, mesh, [x, z]) {
  const sade = new THREE.Raycaster(b2t(THREE, [x, -2, z]), b2t(THREE, [0, 1, 0]));
  const o = sade.intersectObject(mesh, false)[0];
  if (!o) return null;
  return { p: o.point.clone(), n: o.face.normal.clone().transformDirection(mesh.matrixWorld).normalize() };
}

/** Blenderin lentoasento: kamera pinnan alapuolelta katsoen ylös pintaa pitkin; nostetaan, jos pinta peittää. */
export function lentoasento(THREE, mesh, p, n, kulma = 38, matka = 0.09) {
  const ylos = new THREE.Vector3(0, 1, 0);
  const u = ylos.clone().sub(n.clone().multiplyScalar(ylos.dot(n))).normalize();
  const t = u.clone().cross(n).normalize();
  let a = kulma * Math.PI / 180;
  let c = null;
  const sade = new THREE.Raycaster();
  for (let k = 0; k < 8; k += 1) {
    const f = u.clone().multiplyScalar(Math.cos(a)).sub(n.clone().multiplyScalar(Math.sin(a))).normalize();
    c = p.clone().sub(f.multiplyScalar(matka));
    const suunta = p.clone().sub(c);
    const pituus = suunta.length();
    sade.set(c, suunta.normalize());
    sade.far = pituus - 0.004;
    if (!sade.intersectObject(mesh, false).length) break;
    a += 6 * Math.PI / 180;
  }
  return { c, t, u };
}

/**
 * Avaa ajattelijan näkymän. Palauttaa { sulje, mittari } tai null, jos WebGL/kirjasto puuttuu.
 * asetukset.malliUrl ohittaa R2-osoitteen (testit), asetukset.koti = isäntäelementti (oletus body).
 */
export async function avaaAjattelija(tunnus, { koti = document.body, malliUrl = null, sulkeutui = null } = {}) {
  const a = AJATTELIJAT[tunnus];
  if (!a) return null;
  const THREE = await lataaKolme();
  const { GLTFLoader } = THREE;

  const juuri = document.createElement('div');
  juuri.className = 'ajattelija tk-teema-tumma';
  juuri.setAttribute('role', 'dialog');
  juuri.setAttribute('aria-label', `${a.nimi}: ajattelija`);
  Object.assign(juuri.style, { position: 'fixed', inset: '0', zIndex: '60', background: '#000', overflow: 'hidden' });
  const renderoija = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderoija.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderoija.toneMapping = THREE.AgXToneMapping;
  renderoija.outputColorSpace = THREE.SRGBColorSpace;
  renderoija.shadowMap.enabled = true;
  renderoija.shadowMap.type = THREE.PCFShadowMap;
  Object.assign(renderoija.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
  // Pystyvinjetti laajoihin otoksiin (sokrates_vinjetti.py): 52 %:sta alas smoothstep ×0,35 ja lievä säteittäinen.
  const vinjetti = document.createElement('div');
  Object.assign(vinjetti.style, {
    position: 'absolute', inset: '0', pointerEvents: 'none', transition: 'opacity 1.2s',
    background: 'linear-gradient(to bottom, transparent 52%, rgba(0,0,0,0.05) 62%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0.58) 92%, rgba(0,0,0,0.65) 100%),'
      + ' radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)',
  });
  const sulku = document.createElement('button');
  sulku.type = 'button';
  sulku.className = 'tk-nappi ajattelija-sulku';
  sulku.textContent = '✕';
  sulku.setAttribute('aria-label', 'Sulje');
  Object.assign(sulku.style, { position: 'absolute', top: 'calc(12px + env(safe-area-inset-top, 0px))', right: '12px', zIndex: '2' });
  juuri.append(renderoija.domElement, vinjetti, sulku);
  koti.appendChild(juuri);

  const kohtaus = new THREE.Scene();
  // Blenderin maailma 0,012 (lineaarinen) näkyy AgX:n jälkeen lähes mustana (#0b0c10 mallikuvissa); tausta
  // piirretään suoraan näyttöväriin, ja maailman valo on heikko täyte (varjopuoli ei ole täysin musta).
  kohtaus.background = new THREE.Color().setRGB(11 / 255, 12 / 255, 16 / 255, THREE.SRGBColorSpace);
  const haku = new URLSearchParams(location.search);
  const TAYTE = Number(haku.get('tayte')) || 0.12;
  kohtaus.add(new THREE.HemisphereLight(new THREE.Color(0.9, 0.92, 1.0), new THREE.Color(0.25, 0.25, 0.28), TAYTE));
  const kamera = new THREE.PerspectiveCamera(kenttaMm(a.otokset.rembrandt.mm), 1, 0.003, 10);

  const gltf = await new GLTFLoader().loadAsync(malliUrl ?? `${R2}${a.malli}`);
  let mesh = null;
  gltf.scene.traverse((o) => { if (o.isMesh && !mesh) mesh = o; });
  const mat = mesh.material;
  mat.side = THREE.FrontSide;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  kohtaus.add(gltf.scene);
  gltf.scene.updateMatrixWorld(true);

  // Avainvalo (v7 "aurinko" Rembrandt-asennossa, v10 vinjetti: keila 32° täydellä pehmeydellä pään keskelle).
  const av = a.avainvalo;
  const valo = new THREE.SpotLight(new THREE.Color(1.0, 0.95, 0.88), 1, 0, av.keila / 2 * Math.PI / 180, 1.0, 2);
  const paa = b2t(THREE, a.paa);
  const suunta = b2t(THREE, av.suunta).normalize();
  valo.position.copy(paa).add(suunta.clone().multiplyScalar(av.etaisyys));
  valo.target.position.copy(b2t(THREE, av.tahtays));
  valo.castShadow = true;
  valo.shadow.mapSize.set(2048, 2048);
  valo.shadow.camera.near = 0.6;
  valo.shadow.camera.far = 2.2;
  valo.shadow.bias = -0.0004;
  valo.shadow.normalBias = 0.002;
  const AVAIN = Number(haku.get('avain')) || 8.5;
  valo.intensity = AVAIN;
  kohtaus.add(valo, valo.target);

  // Päälause 38a videotykkinä otsalla.
  const lause = a.paalauseet['38a'];
  const tv = a.taustavirta;
  // Rivien kirkkaus päälauseeseen nähden: Blenderin AgX puristaa kirkkaan päälauseen, webin AgX vähemmän (v10-kuva).
  const RIVIT = Number(haku.get('rivit')) || 0.75;
  const fontti = (nimi) => a.fontit[nimi] ?? a.fontit.iowan;
  // Päälause: kirjaimet 1,15 × gobon mittasuhde (mitattu v10-kuvasta: v10:n päälausegobo oli väljempi kuin v4:n).
  const { kangas, paikat } = piirraAtlas([
    { teksti: lause.fi, fontti: fontti('iowan').perhe, paino: fontti('iowan').paino, korkeus: 192, sumea: true, emOsuus: 1.15 },
    ...tv.rivit.map(([, f, teksti]) => ({ teksti, fontti: fontti(f).perhe, paino: fontti(f).paino, korkeus: 96, toisto: true })),
  ]);
  const atlas = new THREE.CanvasTexture(kangas);
  atlas.flipY = false;
  atlas.colorSpace = THREE.NoColorSpace;
  atlas.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  atlas.minFilter = THREE.LinearMipmapLinearFilter;
  atlas.wrapS = THREE.RepeatWrapping;   // toistorivit (päälause rajataan varjostimessa)
  const u = lisaaProjektorit(THREE, mat, atlas);
  u.pVari.value.setRGB(...a.tykki.vari);
  const os = osuma(THREE, mesh, lause.sade);
  const tykinSuunta = os.n.clone().add(b2t(THREE, lause.vino)).normalize();
  const tykki = os.p.clone().add(tykinSuunta.clone().multiplyScalar(lause.etaisyys));
  const nauhaKork = lause.korkeus;
  // Blender: tykin teho 220 W vs. auringon 95 W samalla säteilymallilla → sama suhde three.js:n voimiin.
  const TYKKI = AVAIN * 220 / 95 * (Number(haku.get('tykki')) || 1.6);
  const pr = asetaProjektori(THREE, u, 0, {
    paikka: tykki, kohde: os.p, etaisyys: lause.etaisyys, nauhaKork, rivi: paikat[0], ala: lause.ala,
    ca: a.ca, syvyys: a.syvyys, atlasKorkeus: kangas.height,
  });
  const s0 = 0.5 + lause.ala / 2 / pr.nauhaLev;

  // Taustavirta (paan_virta): rivit jaetaan projektoreille tasaisin välein kuva-alan korkeudelle.
  const satunnainen = ajattelijaSiemenluku(tv.siemen);
  const nopeudet = tv.rivit.map((_, k) => 0.0007 * 1.18 ** k);
  sekoitaSiemenella(nopeudet, satunnainen);
  const virta = [];
  let ri = 0;
  for (const pj of tv.projektorit) {
    const kohde = b2t(THREE, pj.kohde);
    const paikka = kohde.clone().add(b2t(THREE, pj.suunta).normalize().multiplyScalar(tv.etaisyys));
    for (let k = 0; k < pj.riveja && ri < tv.rivit.length; k += 1, ri += 1) {
      const [kieli] = tv.rivit[ri];
      const koot = kieli === 'fi' ? [...tv.rivikork].sort((x, y) => x - y).slice(0, 2) : tv.rivikork;
      const kork = koot[Math.floor(satunnainen() * koot.length)];
      const [kMin, kMax] = tv.kirkkaus[kieli] ?? tv.kirkkaus.el;
      const kirkkaus = kMin + (kMax - kMin) * satunnainen();
      const vM = (-0.4 + 0.8 * (k + 0.5) / pj.riveja) * pj.ala + (satunnainen() * 2 - 1) * 0.01;
      const kulma = (satunnainen() * 2 - 1) * tv.kulma * Math.PI / 180;
      const i = 1 + ri;
      asetaProjektori(THREE, u, i, {
        paikka, kohde, etaisyys: tv.etaisyys, nauhaKork: kork, rivi: paikat[i], ala: pj.ala, blend: tv.blend,
        kulma, vM, toisto: true, atlasKorkeus: kangas.height,
      });
      virta.push({ i, nopeus: nopeudet[ri] * (ri % 2 ? 1 : -1), voima: TYKKI * tv.voimaKerroin * kirkkaus * RIVIT });
    }
  }
  u.pMaara.value = 1 + virta.length;

  // Kamera: Rembrandt → lentoasento otsalle (35 → 18 mm) → kaari ±22° ja liuku ±8 mm tekstin aikana → pito.
  const rem = a.otokset.rembrandt;
  const remPaikka = b2t(THREE, rem.paikka), remKatse = b2t(THREE, rem.katse);
  const lento = lentoasento(THREE, mesh, os.p, os.n, lause.kameraKulma, lause.kameraMatka);
  const kaari = (osuus) => {
    const kierto = new THREE.Quaternion().setFromAxisAngle(os.n, (-a.kierto + 2 * a.kierto * osuus) * Math.PI / 180);
    const liuku = lento.t.clone().multiplyScalar(-a.liuku + 2 * a.liuku * osuus);
    return {
      paikka: os.p.clone().add(lento.c.clone().sub(os.p).applyQuaternion(kierto)).add(liuku),
      katse: os.p.clone().add(liuku.clone().multiplyScalar(0.5)),
    };
  };
  const T = a.ajat;
  const alkuRuutu = T.lahesty[0] - 2 * RUUTUA_S;   // 2 s Rembrandtia ennen lähestymistä
  function asetaRuutu(r) {
    let paikka, katse, mm;
    if (r <= T.lahesty[0]) { paikka = remPaikka; katse = remKatse; mm = rem.mm; }
    else if (r <= T.lahesty[1]) {
      const k = pehmea(valilla(r, T.lahesty[0], T.lahesty[1]));
      const loppu = kaari(0);
      paikka = remPaikka.clone().lerp(loppu.paikka, k); katse = remKatse.clone().lerp(loppu.katse, k);
      mm = rem.mm + (a.linssi - rem.mm) * k;
    } else {
      const kk = kaari(pehmea(valilla(Math.min(r, T.kaariLoppu), T.lahesty[1], T.kaariLoppu)));
      paikka = kk.paikka; katse = kk.katse; mm = a.linssi;
    }
    kamera.position.copy(paikka);
    kamera.lookAt(katse);
    kamera.fov = kenttaMm(mm);
    kamera.updateProjectionMatrix();
    vinjetti.style.opacity = r < T.lahesty[0] + 20 ? '1' : '0';
    // 38a vierii lineaarisesti −s0 → s0; teho nousee ja laskee 6 ruudussa (v4_projektori).
    const [va, vl] = T.vieritys;
    u.pA.value[0].w = -s0 + 2 * s0 * Math.min(1, Math.max(0, valilla(r, va, vl)));
    const teho = r < va || r > vl ? 0 : Math.min(1, (r - va) / 6, (vl - r) / 6);
    u.pB.value[0].w = TYKKI * Math.max(0, teho);
    // Taustavirta: lineaarinen häivytys (r0 → r1 sisään, r2 → r3 ulos), siirto = nopeus × ruudut.
    const [r0, r1, r2, r3] = tv.ajat;
    const vk = r <= r0 || r >= r3 ? 0 : Math.min(1, (r - r0) / (r1 - r0), (r3 - r) / (r3 - r2));
    for (const v of virta) {
      u.pA.value[v.i].w = v.nopeus * (r - r0);
      u.pB.value[v.i].w = v.voima * vk;
    }
  }

  // Koko ja kuvasuhde.
  const koko = () => {
    const l = juuri.clientWidth || 1, k = juuri.clientHeight || 1;
    renderoija.setSize(l, k, false);
    kamera.aspect = l / k;
    kamera.updateProjectionMatrix();
  };
  koko();
  const kokoVahti = new ResizeObserver(koko);
  kokoVahti.observe(juuri);

  // Mittari (sujuvuus): ruutuvälit ms; savuke lukee window.matkakirjaAjattelija.mittari().
  const valit = [];
  let edellinen = 0;
  const alku = performance.now();
  let kaynnissa = true;
  let ruutuOhitus = null;
  function kierros(nyt) {
    if (!kaynnissa) return;
    if (edellinen) { valit.push(nyt - edellinen); if (valit.length > 600) valit.shift(); }
    edellinen = nyt;
    const r = ruutuOhitus ?? (alkuRuutu + (nyt - alku) / 1000 * RUUTUA_S);
    asetaRuutu(Math.min(r, T.pito));
    renderoija.render(kohtaus, kamera);
    requestAnimationFrame(kierros);
  }
  requestAnimationFrame(kierros);

  const mittari = () => {
    const j = [...valit].sort((x, y) => x - y);
    const p = (q) => (j.length ? j[Math.min(j.length - 1, Math.floor(q * j.length))] : 0);
    return { ruutuja: j.length, fps: j.length ? 1000 / (j.reduce((s, v) => s + v, 0) / j.length) : 0, p50: p(0.5), p95: p(0.95), yli33: j.filter((v) => v > 33.4).length };
  };
  // ?mittari=1: sujuvuus ruudulle laitemittausta varten (Laitetestaaja kuvaa ruudun; ei verkkoliikennettä).
  let mittariAjastin = null;
  if (haku.get('mittari')) {
    const nayta = document.createElement('pre');
    Object.assign(nayta.style, { position: 'absolute', left: '8px', bottom: 'calc(8px + env(safe-area-inset-bottom, 0px))', margin: '0',
      padding: '6px 8px', font: '12px/1.35 ui-monospace, monospace', color: '#cfe', background: 'rgba(0,0,0,0.6)', zIndex: '3', pointerEvents: 'none' });
    juuri.appendChild(nayta);
    const gl = renderoija.getContext();
    const tiedot = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = tiedot ? gl.getParameter(tiedot.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    mittariAjastin = setInterval(() => {
      const m = mittari();
      const kp = renderoija.getDrawingBufferSize(new THREE.Vector2());
      nayta.textContent = `fps ${m.fps.toFixed(1)}  p50 ${m.p50.toFixed(1)}  p95 ${m.p95.toFixed(1)} ms\n`
        + `>33 ms ${m.yli33}/${m.ruutuja}  ${kp.x}×${kp.y} @${renderoija.getPixelRatio()}\n${gpu}`;
    }, 1000);
  }
  function sulje() {
    if (!kaynnissa) return;
    kaynnissa = false;
    clearInterval(mittariAjastin);
    kokoVahti.disconnect();
    document.removeEventListener('keydown', nappain, true);
    renderoija.dispose();
    atlas.dispose();
    juuri.remove();
    sulkeutui?.();
  }
  const nappain = (e) => { if (e.key === 'Escape') { e.stopPropagation(); sulje(); } };
  document.addEventListener('keydown', nappain, true);
  sulku.addEventListener('click', sulje);
  const kahva = {
    sulje, mittari,
    /** Testeille: pysäytä aika Blender-ruutuun r (null = juokse). */
    ruutu: (r) => { ruutuOhitus = r; },
    nollaaMittari: () => { valit.length = 0; edellinen = 0; },
  };
  globalThis.matkakirjaAjattelija = kahva;
  return kahva;
}
