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
import { MARCUS } from './ajattelija-marcus.js';
import { piirraAtlas, lisaaProjektorit, asetaProjektori, lisaaKipsinPinta } from './ajattelija-projektori.js';
import { pohjatLataaTyyli, luoPohjaKuvanakyma, luoPohjaNostokortti } from '../pohjat/pohjat.js';

const R2 = 'https://media.matkakirja.app/';
/** Prologin kytkimen napsahdus, yhteinen kaikille ajattelijoille (ämpärissä 2.10.2026). */
export const AJATTELIJA_KYTKIN = 'ajattelijat/yhteiset/v1/kytkin-kaiku.mp3';
export const AJATTELIJA_KIRJASTO = `${R2}vendor/three-gltf-r185.min.js`;
/*
 * AJATTELIJAT OVAT DATAA (Päätoimittaja 2.10.2026): uusi ajattelija = uusi js/linssit/ajattelija-<nimi>.js samalla
 * rakenteella kuin SOKRATES + rivi tähän rekisteriin; ?ajattelija=<nimi> avaa sen. Moottori ei tunne yhtäkään ajattelijaa
 * nimeltä. tarkistaAjattelija() vaatii kentät (tests/ajattelija.test.mjs ajaa sen jokaiselle rekisterin ajattelijalle).
 */
export const AJATTELIJAT = Object.freeze({ sokrates: SOKRATES, marcus: MARCUS });

/** Puuttuvat pakolliset kentät (tyhjä lista = kelpaa). */
export function tarkistaAjattelija(a) {
  const puuttuu = [];
  const vaadi = (ehto, nimi) => { if (!ehto) puuttuu.push(nimi); };
  vaadi(a && typeof a.tunnus === 'string', 'tunnus');
  if (!a) return puuttuu;
  for (const k of ['nimi', 'vuodet', 'kysymys', 'malli', 'kipsi']) vaadi(typeof a[k] === 'string' && a[k], k);
  for (const k of ['paa', 'tausta', 'linssi', 'kierto', 'liuku', 'ca', 'syvyys']) vaadi(a[k] != null, k);
  vaadi(a.avainvalo?.suunta && a.avainvalo?.tahtays, 'avainvalo');
  vaadi(a.otokset?.rembrandt?.paikka, 'otokset.rembrandt');
  const lause = a.paalauseet?.[a.kierros?.paalause];
  vaadi(lause?.fi && lause?.el && lause?.viite && lause?.sade && lause?.vino, 'kierros.paalause → paalauseet');
  for (const k of ['nimi', 'kysymys', 'lahesty', 'vieritys', 'lahde', 'kaariLoppu', 'kaiku', 'pito']) vaadi(a.ajat?.[k] != null, `ajat.${k}`);
  vaadi(a.prologi?.valot?.length, 'prologi');
  vaadi(a.intro?.otokset?.length && a.intro?.valo?.length, 'intro');
  vaadi(a.taustavirta?.rivit?.length && a.taustavirta?.projektorit?.length, 'taustavirta');
  vaadi(a.fontit?.iowan, 'fontit.iowan');
  // Valinnaiset: kaiku (null = ei kaikua), syke, elama (lappu), pulunKysymykset (PULU); jos annettu, oltava kokonaisia.
  if (a.kaiku != null) vaadi(a.kaiku.kuva && a.kaiku.kamera, 'kaiku');
  if (a.elama != null) vaadi(a.elama.otsikko && a.elama.kappaleet?.length, 'elama');
  if (a.pulunKysymykset != null) vaadi(Array.isArray(a.pulunKysymykset) && a.pulunKysymykset.length, 'pulunKysymykset');
  vaadi(a.aani?.puhe && a.aani?.musiikki, 'aani');
  vaadi(a.tykki?.vari, 'tykki');
  return puuttuu;
}
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

/**
 * Taustavirran omat fontit (OFL, `tiedosto` ämpärissä) FontFacella ennen atlaksen piirtoa. Puuttuva tai hidas fontti ei
 * estä kohtausta: 4 s:n katto, ja selain käyttää perheen varafonttia (serif).
 */
export async function lataaAjattelijaFontit(a, nimet) {
  if (typeof FontFace !== 'function' || !globalThis.document?.fonts) return;
  const tarvitaan = [...new Set(nimet)].map((n) => a.fontit?.[n]).filter((f) => f?.tiedosto);
  const lataukset = tarvitaan.map(async (f) => {
    const perhe = f.perhe.split(',')[0].replace(/"/g, '').trim();
    if ([...document.fonts].some((ff) => ff.family.replace(/"/g, '') === perhe)) return;
    const ff = new FontFace(perhe, `url(${R2}${f.tiedosto})`);
    document.fonts.add(await ff.load());
  });
  const katto = new Promise((ok) => { setTimeout(ok, 4000); });
  await Promise.race([Promise.allSettled(lataukset), katto]);
}

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
  const puuttuu = tarkistaAjattelija(a);
  if (puuttuu.length) { console.warn('ajattelija: puuttuvat kentät', tunnus, puuttuu); return null; }
  const THREE = await lataaKolme();
  const { GLTFLoader } = THREE;

  // Pohja: KUVANÄKYMÄ (tumma, ✕ lasia, veto alas, Esc; js/pohjat/pohjat.js). Sisältö pohjan sisalto-solmuun.
  const pohja = luoPohjaKuvanakyma({ nimi: `${a.nimi}: ajattelija`, sulje: () => sulje() });
  const juuri = pohja.sisalto;
  pohja.el.classList.add('ajattelija');
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
  // Nimi, kysymys ja lähderivi (css/pohjat/pinnat/ajattelija.css); näkyvyys aikajanalta.
  pohjatLataaTyyli();
  const nimi = document.createElement('p');
  nimi.className = 'ajattelija-teksti ajattelija-nimi';
  (a.nimiRivit ?? [a.nimi]).forEach((rivi, i) => { if (i) nimi.append(document.createElement('br')); nimi.append(rivi); });
  const vuodet = document.createElement('span');
  vuodet.className = 'ajattelija-vuodet';
  vuodet.textContent = a.vuodet;
  nimi.append(vuodet);
  const kysymys = document.createElement('p');
  kysymys.className = 'ajattelija-teksti ajattelija-kysymys';
  kysymys.textContent = a.kysymys;
  const lahde = document.createElement('p');
  lahde.className = 'ajattelija-lahde';
  const lahdeEl = document.createElement('span');
  lahdeEl.className = 'ajattelija-lahde__kreikka';
  const lahdeViite = document.createElement('span');
  lahdeViite.className = 'ajattelija-lahde__viite';
  lahde.append(lahdeEl, lahdeViite);
  juuri.append(renderoija.domElement, vinjetti, nimi, kysymys, lahde);
  koti.appendChild(pohja.el);
  pohja.avaa();

  const kohtaus = new THREE.Scene();
  // Blenderin maailma 0,012 (lineaarinen) näkyy AgX:n jälkeen lähes mustana (#0b0c10 mallikuvissa); tausta
  // piirretään suoraan näyttöväriin, ja maailman valo on heikko täyte (varjopuoli ei ole täysin musta).
  const taustaVari = new THREE.Color().setRGB(11 / 255, 12 / 255, 16 / 255, THREE.SRGBColorSpace);
  const mustaVari = new THREE.Color(0, 0, 0);   // prologi: maailma 0 (Blender --prologi), vain ääriviivavalo
  kohtaus.background = taustaVari;
  const haku = new URLSearchParams(location.search);
  const TAYTE = Number(haku.get('tayte')) || 0.12;
  const maailma = new THREE.HemisphereLight(new THREE.Color(0.9, 0.92, 1.0), new THREE.Color(0.25, 0.25, 0.28), TAYTE);
  kohtaus.add(maailma);
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
  const lause = a.paalauseet[a.kierros.paalause];
  lahdeEl.textContent = lause.el;
  lahdeViite.textContent = lause.viite;
  const tv = a.taustavirta;
  // Rivien kirkkaus päälauseeseen nähden: Blenderin AgX puristaa kirkkaan päälauseen, webin AgX vähemmän (v10-kuva).
  const RIVIT = Number(haku.get('rivit')) || 0.75;
  const fontti = (nimi) => a.fontit[nimi] ?? a.fontit.iowan;
  await lataaAjattelijaFontit(a, tv.rivit.map(([, f]) => f));
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
  // Terävä kipsi (v9-palaute): normaalikartan anisotropia ja mikronormaali (lataus taustalla; ilman sitä pinta on GLB:n).
  if (mat.normalMap) mat.normalMap.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  const detalji = new THREE.TextureLoader().load(`${R2}${a.kipsi}`);
  detalji.wrapS = detalji.wrapT = THREE.RepeatWrapping;
  detalji.colorSpace = THREE.NoColorSpace;
  detalji.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  lisaaKipsinPinta(THREE, mat, detalji);
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
  const W = AVAIN / 95;   // Blenderin wateista three.js:n voimaksi (aurinko 95 W = AVAIN)

  // PROLOGI: kaksi reunavaloa takaa (ääriviivavalo; ei varjoja eikä taustaa), kiinteä kamera.
  const pr0 = a.prologi;
  const prologiValot = pr0.valot.map((v) => {
    const s = new THREE.SpotLight(new THREE.Color(...pr0.vari), 0, 0, v.keila / 2 * Math.PI / 180, v.blend, 2);
    s.position.copy(b2t(THREE, v.paikka));
    s.target.position.copy(b2t(THREE, v.kohde));
    kohtaus.add(s, s.target);
    return { s, teho: v.teho * W };
  });
  const prKamera = { paikka: b2t(THREE, pr0.kamera.paikka), katse: b2t(THREE, pr0.kamera.katse), mm: pr0.kamera.mm };
  const hehku = (r) => (r < pr0.kytkin ? 0 : r < pr0.taysi
    ? valilla(r, pr0.kytkin, pr0.taysi) ** 2.2 * (1 + 0.08 * Math.sin(r * 2.7)) : 1);

  // INTRO: leikkaukset ja auringon polku (avaimet; pehmeä siirtymä avainten välillä).
  const otokset = a.intro.otokset.map(([r, c, q, mm]) => ({ r, paikka: b2t(THREE, c), katse: b2t(THREE, q), mm }));
  const valoAvaimet = a.intro.valo.map(([r, s]) => ({ r, suunta: b2t(THREE, s).normalize() }));
  const tahtays = b2t(THREE, av.tahtays);
  function auringonSuunta(r) {
    let e = valoAvaimet[0];
    for (const v of valoAvaimet) {
      if (r <= v.r) {
        if (v === e) return v.suunta.clone();
        return e.suunta.clone().lerp(v.suunta, pehmea(valilla(r, e.r, v.r))).normalize();
      }
      e = v;
    }
    return e.suunta.clone();
  }

  // KAIKU: kaikukuva otsan videotykillä (oma tekstuuri), täyte ja syke.
  const kk = a.kaiku;
  const KAIKU_TAYTE = Number(haku.get('kaikutayte')) || 0.5;
  const KAIKU_VOIMA = Number(haku.get('kaikuvoima')) || 1.5;
  let kaiku = null;
  let syke = {};
  // Kaiku on valinnainen (Marcuksella ei vielä ole): ilman sitä kaaren kamera jatkuu pitoon ja aurinko pysyy.
  let kaikuTayte = null;
  let kaikuIndeksi = -1;
  let kaikuKamera = null;
  if (kk) {
    kaikuTayte = new THREE.SpotLight(new THREE.Color(...kk.tayte.vari), 0, 0, kk.tayte.keila / 2 * Math.PI / 180, kk.tayte.blend, 2);
    kaikuTayte.position.copy(os.p).add(b2t(THREE, kk.tayte.suunta).normalize());
    kaikuTayte.target.position.copy(os.p);
    kohtaus.add(kaikuTayte, kaikuTayte.target);
    kaikuIndeksi = 1 + virta.length;
    const kaikuTykki = os.p.clone().add(os.n.clone().add(b2t(THREE, kk.vino)).normalize().multiplyScalar(kk.etaisyys));
    // Kaiun kamera (v10): lähempänä tasaisempaa otsan pintaa, hidas ajo ja liuku.
    const kaikuSuunta = os.n.clone().add(b2t(THREE, kk.kamera.suunta)).normalize();
    kaikuKamera = (osuus) => {
      const liuku = lento.t.clone().multiplyScalar(kk.kamera.liuku * osuus);
      const matka = kk.kamera.matka[0] + (kk.kamera.matka[1] - kk.kamera.matka[0]) * osuus;
      return { paikka: os.p.clone().add(kaikuSuunta.clone().multiplyScalar(matka)).add(liuku), katse: os.p.clone().add(liuku) };
    };
    new THREE.TextureLoader().loadAsync(`${R2}${kk.kuva}`).then((tk) => {
      tk.colorSpace = THREE.NoColorSpace;
      u.pKaiku.value = tk;
      u.pKaikuVari.value.setRGB(...kk.savy);
      const korkeus = kk.lev * tk.image.height / tk.image.width;
      asetaProjektori(THREE, u, kaikuIndeksi, {
        paikka: kaikuTykki, kohde: os.p, etaisyys: kk.etaisyys, nauhaKork: korkeus,
        rivi: { lev: tk.image.width, korkeus: tk.image.height, uMax: 1 }, ala: Math.max(kk.lev, korkeus), blend: kk.blend,
        atlasKorkeus: tk.image.height, kaiku: true,
      });
      u.pMaara.value = kaikuIndeksi + 1;
      kaiku = tk;
    }).catch((syy) => console.warn('ajattelija: kaikukuva', syy));
    if (a.syke) fetch(`${R2}${a.syke}`).then((v) => (v.ok ? v.json() : {})).then((j) => { syke = j; }).catch(() => {});
  }

  const nayta = (el, r, [a0, a1], hai = 15) => {
    el.style.opacity = String(r < a0 || r > a1 ? 0 : Math.min(1, (r - a0) / hai, (a1 - r) / hai));
  };
  function asetaKamera(paikka, katse, mm) {
    kamera.position.copy(paikka);
    kamera.lookAt(katse);
    kamera.fov = kenttaMm(mm);
    kamera.updateProjectionMatrix();
  }

  /** Prologin ruutu p (1–120). */
  function asetaPrologi(p) {
    const h = hehku(p);
    for (const v of prologiValot) v.s.intensity = v.teho * h;
    kohtaus.background = mustaVari;
    valo.intensity = 0;
    maailma.intensity = 0;
    if (kaikuTayte) kaikuTayte.intensity = 0;
    u.pB.value.forEach((b) => { b.w = 0; });
    asetaKamera(prKamera.paikka, prKamera.katse, prKamera.mm);
    vinjetti.style.opacity = '0';
    for (const el of [nimi, kysymys, lahde]) el.style.opacity = '0';
  }

  /** Kierroksen 1 ruutu r (1–1450; Blender v7–v10). */
  function asetaRuutu(r) {
    for (const v of prologiValot) v.s.intensity = 0;
    kohtaus.background = taustaVari;
    let paikka, katse, mm;
    if (r < T.nimi[0]) {
      let o = otokset[0];
      for (const x of otokset) if (r >= x.r) o = x;
      ({ paikka, katse, mm } = o);
    } else if (r <= T.lahesty[0]) { paikka = remPaikka; katse = remKatse; mm = rem.mm; }
    else if (r <= T.lahesty[1]) {
      const k = pehmea(valilla(r, T.lahesty[0], T.lahesty[1]));
      const loppu = kaari(0);
      paikka = remPaikka.clone().lerp(loppu.paikka, k); katse = remKatse.clone().lerp(loppu.katse, k);
      mm = rem.mm + (a.linssi - rem.mm) * k;
    } else if (!kk || r <= T.kaiku[0]) {
      const kk2 = kaari(pehmea(valilla(Math.min(r, T.kaariLoppu), T.lahesty[1], T.kaariLoppu)));
      paikka = kk2.paikka; katse = kk2.katse; mm = a.linssi;
    } else {
      // Kaiku: siirtymä kaaren lopusta kaiun kameraan (45 ruutua), sitten hidas ajo kaiun loppuun.
      const [ka0, kl0] = T.kaiku;
      const kaarenLoppu = kaari(1);
      const k1 = pehmea(valilla(r, ka0, ka0 + kk.kamera.siirtyma));
      const kp = kaikuKamera(Math.min(1, Math.max(0, valilla(r, ka0 + kk.kamera.siirtyma, kl0))));
      paikka = kaarenLoppu.paikka.clone().lerp(kp.paikka, k1);
      katse = kaarenLoppu.katse.clone().lerp(kp.katse, k1);
      mm = a.linssi + (kk.kamera.mm - a.linssi) * k1;
    }
    asetaKamera(paikka, katse, mm);
    vinjetti.style.opacity = r >= T.nimi[0] && r < T.lahesty[0] + 20 ? '1' : '0';
    nayta(nimi, r, T.nimi);
    nayta(kysymys, r, T.kysymys);
    nayta(lahde, r, T.lahde, 10);

    // Aurinko: polku introssa, Rembrandt sen jälkeen; hiipuu nollaan kaiun ajaksi (45 ruutua), samoin maailma.
    const sv = auringonSuunta(r);
    valo.position.copy(paa).add(sv.multiplyScalar(av.etaisyys));
    valo.target.position.copy(tahtays);
    const [ka, kl] = T.kaiku;
    const hiipuu = !kk || r <= ka || r >= kl ? 1 : Math.max(0, 1 - Math.min(1, (r - ka) / 45, (kl - r) / 45));
    valo.intensity = AVAIN * hiipuu;
    maailma.intensity = TAYTE * hiipuu;
    const kaikuK = 1 - hiipuu;
    // Webin AgX nostaa himmeää täytettä enemmän kuin Blenderin "Medium High Contrast": 0,10 → 0,05 (v9-täytekoe).
    if (kaikuTayte) kaikuTayte.intensity = AVAIN * kk.tayte.osuus * KAIKU_TAYTE * kaikuK;
    if (kaiku) {
      u.pA.value[kaikuIndeksi].w = -kk.liuku + 2 * kk.liuku * Math.min(1, Math.max(0, valilla(r, ka, kl)));
      u.pB.value[kaikuIndeksi].w = kk.voima * W * KAIKU_VOIMA * kaikuK * (syke[String(Math.round(r))] ?? 1);
    }

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

  // Ääniraita on kierroksen kello (luennat ja leikkaukset osuvat musiikkiin); prologi kulkee omalla kellollaan.
  const aani = new Audio(`${R2}${a.aani.puhe}`);
  aani.preload = 'auto';
  const musiikkiAani = new Audio(`${R2}${a.aani.musiikki}`);
  musiikkiAani.preload = 'auto';
  musiikkiAani.onerror = () => { musiikkiAani.dataset.puuttuu = '1'; };
  // Prologin kytkimen napsahdus ruudussa pr0.kytkin (Linnanrakentaja 2.10.2026: kaksi Kenney CC0 -iskua ja hallin kaiku).
  const kytkinAani = new Audio(`${R2}${AJATTELIJA_KYTKIN}`);
  kytkinAani.preload = 'auto';
  let kytkinSoi = false;
  let aaniSoi = false;
  /** Globaali ruutu G: 1–120 prologi, sen jälkeen kierros (r = G − 120). */
  // Kierroksen lopussa "Sokrateen elämä" -lappu NOSTOKORTTI-pohjalla (teema tumma) KUVANÄKYMÄN sisällä.
  // Samalla PULU (osa CHAT, js/pohjat/pulu.js; Päätoimittaja 2.10.2026): minipulu ja viisi kysymystä, isännän teema
  // lasi (lämmin linssi, Natiivi-UI). Kulma nousee lapun yläpuolelle, kun lappu on auki (molemmat ovat alareunassa).
  let lappu = null;
  let pulu = null;
  let lopetusAvattu = false;
  let lapunVahti = null;
  function avaaLappu() {
    if (lopetusAvattu) return;
    lopetusAvattu = true;
    // Lappu ja PULU ovat valinnaisia (sisältö Sisältökirjurilta ajattelija kerrallaan).
    lappu = a.elama && luoPohjaNostokortti({ yla: a.nimi, otsikko: a.elama.otsikko, kappaleet: a.elama.kappaleet }, {
      teema: 'tumma',
      sulje: () => { if (pulu) { pulu.kulma.style.bottom = ''; pulu.kulma.style.removeProperty('--tk-pulu-tila'); } },
    });
    if (lappu) {
      pohja.el.appendChild(lappu.el);
      lappu.avaa();
    }
    if (!a.pulunKysymykset?.length) return;
    // PULU laiskasti (minipulu ja Pulun kortti vasta lopussa; yhden tiedoston versio ei niputa linssiä eikä sen ketjua).
    import('../pohjat/pulu.js').then(({ luoPohjaPulu }) => {
      if (!pohja.el.isConnected) return;
      pulu = luoPohjaPulu({ luokka: 'tk', teema: 'lasi', aihe: a.nimi, kysymykset: a.pulunKysymykset });
      pohja.el.appendChild(pulu.kulma);
      if (lappu && typeof ResizeObserver === 'function') {
        // Kortti mahtuu lapun ja ✕:n väliin: ✕ (44 pt + 12 + turva-alue) jää aina näkyviin.
        lapunVahti = new ResizeObserver(() => {
          if (!lappu?.auki) return;
          const korkeus = lappu.el.getBoundingClientRect().height;
          pulu.kulma.style.bottom = `${Math.round(korkeus + 12)}px`;
          const ylaRaja = pohja.sulku.getBoundingClientRect().bottom + 12;
          const tila = pohja.el.clientHeight - korkeus - 12 - pulu.nappi.getBoundingClientRect().height - 8 - ylaRaja;
          pulu.kulma.style.setProperty('--tk-pulu-tila', `${Math.max(120, Math.round(tila))}px`);
        });
        lapunVahti.observe(lappu.el);
      }
    }).catch((syy) => console.warn('ajattelija: PULU', syy));
  }
  function asetaGlobaali(G) {
    if (G <= pr0.loppu) asetaPrologi(Math.max(1, G));
    else asetaRuutu(Math.min(G - pr0.loppu, T.pito));
    if (G - pr0.loppu >= T.pito && ruutuOhitus == null) avaaLappu();
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
  let aaniEsto = false;
  function kierros(nyt) {
    if (!kaynnissa) return;
    if (edellinen) { valit.push(nyt - edellinen); if (valit.length > 600) valit.shift(); }
    edellinen = nyt;
    let G;
    if (ruutuOhitus != null) G = ruutuOhitus;
    else if (aaniSoi && !aani.paused) {
      G = pr0.loppu + aani.currentTime * RUUTUA_S;
      // Musiikki seuraa puheraitaa (yli 0,12 s:n ero korjataan).
      if (!musiikkiAani.dataset.puuttuu && !musiikkiAani.ended && Math.abs(musiikkiAani.currentTime - aani.currentTime) > 0.12
        && aani.currentTime < musiikkiAani.duration) musiikkiAani.currentTime = aani.currentTime;
    }
    else {
      G = (nyt - alku) / 1000 * RUUTUA_S;
      if (G > pr0.loppu && !aaniSoi) {
        aaniSoi = true;
        aani.currentTime = (G - pr0.loppu) / RUUTUA_S;
        aani.play().catch(() => { aaniSoi = false; aaniEsto = true; });
        musiikkiAani.currentTime = aani.currentTime;
        musiikkiAani.play().catch(() => {});
      }
      if (aaniEsto) aaniSoi = true;   // ei ääntä (ei eleen jälkeen avattu): kello jatkuu ajastimella
    }
    if (!kytkinSoi && ruutuOhitus == null && G >= pr0.kytkin && G < pr0.loppu) {
      kytkinSoi = true;
      kytkinAani.play().catch(() => {});
    }
    asetaGlobaali(G);
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
    pohja.sulje();
    for (const x of [aani, musiikkiAani, kytkinAani]) { x.pause(); x.src = ''; }
    lapunVahti?.disconnect();
    pulu?.tuhoa();
    renderoija.dispose();
    atlas.dispose();
    detalji.dispose();
    kaiku?.dispose();
    pohja.el.remove();
    sulkeutui?.();
  }
  const kahva = {
    sulje, mittari,
    /** Testeille: pysäytä aika kierroksen ruutuun r (Blender v7–v10; null = juokse). */
    ruutu: (r) => { ruutuOhitus = r == null ? null : pr0.loppu + r; },
    /** Testeille: prologin ruutu p (1–120). */
    prologi: (p) => { ruutuOhitus = p; },
    nollaaMittari: () => { valit.length = 0; edellinen = 0; },
    /** Testeille: avaa lappu heti. */
    lappu: () => avaaLappu(),
    /** Testeille: ääniraitojen tila (kello = pääraita). */
    aanitila: () => ({ puhe: aani.currentTime, musiikki: musiikkiAani.currentTime, soi: !aani.paused, musiikkiSoi: !musiikkiAani.paused }),
  };
  globalThis.matkakirjaAjattelija = kahva;
  return kahva;
}
