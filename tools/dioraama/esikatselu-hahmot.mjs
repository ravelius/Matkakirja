/*
 * DIORAAMAN HAHMOT, LIEKIT JA PULU — esikatselu, erä 2b (29.9.2026, P7).
 * 2D-billboardit (atlaksen ruutu 0) ja 3D-pienoisfiguurit (hahmot3d/<henkilo>.glb,
 * idle-nivelanimaatio js/dioraama/liikkeet.js:llä — molemmat ilmestyivät (P4a)
 * kesken tämän erän ja on nähty toimivaksi). Puuttuva tiedosto/moduuli pudottaa
 * hiljaisesti 2D:hen / lepoasentoon. Rajapinta: docs/raportit/dioraama-rajapinnat-
 * era2b-20260929.md kohta 4. Kamera kiertää vapaasti: billboardit käännetään
 * kameraan JOKA RUUDULLA, ei kerran.
 * HUOM: hahmot3d/*.glb:n COLOR_0 on SAMA AO/lämpö/satunnainen-konventio kuin
 * huoneilla — GLTFLoaderin oletus (vertexColors=true) turmelisi vaatteen värin
 * (nähtiin: musta+satunnainen sininen → magenta), siksi kasitteleAoLampo().
 */
import * as THREE from 'three';
import { kasitteleAoLampo } from './esikatselu-pinnat.mjs';

const PULU_VARI = '#2a63e0';
const PULU_SADE_M = 0.16;
const IDLE_KESTO_OLETUS_S = 4.0; // varmuuden vuoksi jos LIIKKEET.idle.kesto_s ei jostain syystä löydy

let liikkeetModuuli; // { nivelKulmat, kestoS } tai null — ladataan kerran (haeLiikkeetModuuli)
let liikkeetYritetty = false;

/** Lataa js/dioraama/{liikkeet,pankit/liikkeet}.js dynaamisesti. Ohittaa siististi jos puuttuu. */
async function haeLiikkeetModuuli() {
  if (liikkeetYritetty) return liikkeetModuuli;
  liikkeetYritetty = true;
  try {
    const [logiikka, pankki] = await Promise.all([
      import('../../js/dioraama/liikkeet.js'),
      import('../../js/dioraama/pankit/liikkeet.js'),
    ]);
    liikkeetModuuli = { nivelKulmat: logiikka.nivelKulmat, kestoS: pankki.LIIKKEET?.idle?.kesto_s ?? IDLE_KESTO_OLETUS_S };
  } catch {
    liikkeetModuuli = null; // moduulia ei (vielä) ole — 3D-malli jää lepoasentoon (bind pose)
  }
  return liikkeetModuuli;
}

/** Rakentaa yhden billboard-quadin (hahmo tai liekki), ruutu 0 riviltä `rivi`. Ks. era2-speksi ("HENKILOT"). */
async function teeBillboard({
  atlasUrl, ruutu, sarakkeet, rivi, pivot, leveysM, korkeusM, peilattu = false, additiivinen = false,
}) {
  const tex = await new THREE.TextureLoader().loadAsync(atlasUrl);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  const rivejaYhteensa = Math.max(1, Math.round(tex.image.height / ruutu[1]));
  const ru = 1 / sarakkeet;
  const rv = 1 / rivejaYhteensa;
  const ov = 1 - (rivi + 1) * rv; // flipY (THREEn oletus): rivi 0 = kuvan YLÄREUNA
  tex.repeat.set(peilattu ? -ru : ru, rv);
  tex.offset.set(peilattu ? ru : 0, ov);

  const geometria = new THREE.PlaneGeometry(leveysM, korkeusM);
  geometria.translate(leveysM * (0.5 - pivot[0]), korkeusM * (0.5 - pivot[1]), 0);
  const materiaali = additiivinen
    ? new THREE.MeshBasicMaterial({
      map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
    : new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometria, materiaali);
  // Liekki (additiivinen, ei syvyyskirjoitusta) jätetään pois varjoista — hahmo osallistuu kuten muu rekvisiitta.
  mesh.castShadow = !additiivinen;
  mesh.receiveShadow = !additiivinen;
  return mesh;
}

/** Kääntää kohteen (ryhmä/mesh) Y-akselin ympäri kohti kameraa (sylinteribillboard, ei kallistu). */
function katsoKameraan(obj, kameranPaikka) {
  const dx = kameranPaikka.x - obj.position.x;
  const dz = kameranPaikka.z - obj.position.z;
  obj.rotation.y = Math.atan2(dx, dz);
}

/**
 * Yrittää ladata 3D-pienoisfiguurin (era2b kohta 4). Palauttaa null hiljaisesti jos
 * glb-tiedostoa ei löydy. `nivelNodet`: Map<nivelnimi, Object3D> idle-animaatiota
 * varten (löydetään nimihaulla — nivelnimet luetaan nivelKulmat():n palauttamista
 * avaimista, ei kovakoodata tänne toiseen kertaan).
 */
async function lataaHahmo3d(loader, pakettiUrl, henkiloId) {
  let gltf;
  try {
    gltf = await loader.loadAsync(`${pakettiUrl}hahmot3d/${henkiloId}.glb`);
  } catch {
    return null; // ei tätä hahmoa (vielä) — 2D-kuvake riittää toistaiseksi
  }
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true; kasitteleAoLampo(obj.material); }
  });
  const liikkeet = await haeLiikkeetModuuli();
  let nivelNodet = null;
  if (liikkeet) {
    nivelNodet = new Map();
    for (const nimi of Object.keys(liikkeet.nivelKulmat('idle', 0))) {
      const solmu = gltf.scene.getObjectByName(nimi);
      if (solmu) nivelNodet.set(nimi, solmu);
    }
  }
  return { malli: gltf.scene, nivelNodet };
}

/** Lisää tilan hahmot: molemmat esitykset samaan ryhmään, asetaHahmoTila() vaihtaa näkyvyyden välittömästi. */
export async function lisaaHahmot(tila, rakennusJson, pakettiUrl, scene, kameranPaikka, loader) {
  const lisatyt = [];
  for (const hahmo of tila.hahmot ?? []) {
    const h = rakennusJson.henkilot[hahmo.henkilo];
    const idle = h?.silmukat?.idle;
    if (!idle) { console.warn(`esikatselu: henkilöltä '${hahmo.henkilo}' puuttuu idle-silmukka`); continue; }
    const pxPerM = h.px_per_m > 0 ? h.px_per_m : h.ruutu[1] / h.korkeus_m;
    // eslint-disable-next-line no-await-in-loop
    const mesh2d = await teeBillboard({
      atlasUrl: `${pakettiUrl}${h.atlas}`, ruutu: h.ruutu, sarakkeet: h.sarakkeet, rivi: idle.rivi, pivot: h.pivot,
      leveysM: h.ruutu[0] / pxPerM, korkeusM: h.ruutu[1] / pxPerM, peilattu: Boolean(hahmo.peilattu),
    });
    // eslint-disable-next-line no-await-in-loop
    const hahmo3d = await lataaHahmo3d(loader, pakettiUrl, hahmo.henkilo);
    const malli3d = hahmo3d?.malli ?? null;

    const ryhma = new THREE.Group();
    ryhma.position.set(hahmo.paikka[0], hahmo.paikka[1], hahmo.paikka[2]);
    ryhma.add(mesh2d);
    if (malli3d) ryhma.add(malli3d);
    katsoKameraan(ryhma, kameranPaikka);
    mesh2d.visible = true;
    if (malli3d) malli3d.visible = false;
    scene.add(ryhma);
    lisatyt.push({ ryhma, mesh2d, malli3d, nivelNodet: hahmo3d?.nivelNodet ?? null });
  }
  return lisatyt;
}

/**
 * Päivittää kaikkien NÄKYVIEN 3D-hahmojen idle-nivelkulmat ajasta (era2b kohta 4/5).
 * Ohittaa siististi jos js/dioraama/liikkeet.js (tai sen data pankit/liikkeet.js)
 * puuttuu — silloin malli jää lepoasentoon (bind pose). Kutsu joka ruudulla.
 * HUOM: rotation.set() käyttää THREEn Euler-oletusjärjestystä 'XYZ' — natiivin
 * C#-vastine (Ydin/Dioraama/Liikkeet.cs) ei ollut vielä olemassa, joten järjestystä
 * ei voitu ristiintarkistaa; jos se poikkeaa, tämä on ensimmäinen paikka katsoa.
 */
export function paivitaHahmoAnimaatio(hahmoLista, nytS) {
  if (!liikkeetModuuli) return;
  const t01 = (nytS % liikkeetModuuli.kestoS) / liikkeetModuuli.kestoS;
  const kulmat = liikkeetModuuli.nivelKulmat('idle', t01);
  for (const h of hahmoLista) {
    if (!h.malli3d?.visible || !h.nivelNodet) continue;
    for (const [nimi, solmu] of h.nivelNodet) {
      const [rx, ry, rz] = kulmat[nimi] ?? [0, 0, 0];
      solmu.rotation.set(THREE.MathUtils.degToRad(rx), THREE.MathUtils.degToRad(ry), THREE.MathUtils.degToRad(rz));
    }
  }
}

/** Hahmot 2D/3D -kytkin: vaihtaa näkyvyyden kaikilta jo ladatuilta hahmoilta. */
export function asetaHahmoTila(hahmoLista, kolmeD) {
  for (const h of hahmoLista) {
    h.mesh2d.visible = !kolmeD || !h.malli3d;
    if (h.malli3d) h.malli3d.visible = kolmeD;
  }
}

/** Käännä hahmoryhmät kameraan — kutsu joka ruudulla (kamera liikkuu vapaasti). */
export function paivitaHahmoKierto(hahmoLista, kameranPaikka) {
  for (const h of hahmoLista) katsoKameraan(h.ryhma, kameranPaikka);
}

/** Lisää yhden tilan liekit (aina ruutu 0). Palauttaa mesh-listan Tuli-kytkintä varten. */
export async function lisaaLiekit(tila, rakennusJson, pakettiUrl, scene, kameranPaikka) {
  const lisatyt = [];
  for (const l of tila.liekit ?? []) {
    const tieto = rakennusJson.liekit[l.liekki];
    if (!tieto) { console.warn(`esikatselu: liekki '${l.liekki}' puuttuu`); continue; }
    const koko = l.koko ?? 1;
    // eslint-disable-next-line no-await-in-loop
    const mesh = await teeBillboard({
      atlasUrl: `${pakettiUrl}${tieto.atlas}`, ruutu: tieto.ruutu, sarakkeet: tieto.sarakkeet, rivi: 0, pivot: tieto.pivot,
      leveysM: tieto.koko_m[0] * koko, korkeusM: tieto.koko_m[1] * koko, additiivinen: true,
    });
    mesh.position.set(l.paikka[0], l.paikka[1], l.paikka[2]);
    katsoKameraan(mesh, kameranPaikka);
    scene.add(mesh);
    lisatyt.push(mesh);
  }
  return lisatyt;
}

/** Tuli-kytkin: piilottaa liekkimeshit (kutsu yhdessä pistevalon piilotuksen kanssa). */
export function asetaLiekkienNakyvyys(liekkiMeshit, paalla) {
  for (const m of liekkiMeshit) m.visible = paalla;
}

/** Käännä liekit kameraan — kutsu joka ruudulla. */
export function paivitaLiekkiKierto(liekkiMeshit, kameranPaikka) {
  for (const m of liekkiMeshit) katsoKameraan(m, kameranPaikka);
}

/** Pulun laskeutumispiste: pieni sininen merkki. `laskeutuminen` voi puuttua. */
export function lisaaPulu(laskeutuminen, scene) {
  if (!laskeutuminen) return;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(PULU_SADE_M, 12, 8),
    new THREE.MeshBasicMaterial({ color: PULU_VARI }),
  );
  mesh.position.set(laskeutuminen[0], laskeutuminen[1], laskeutuminen[2]);
  scene.add(mesh);
}
