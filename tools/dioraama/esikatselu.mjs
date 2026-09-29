/*
 * DIORAAMAN VUOROVAIKUTTEINEN ESIKATSELU — kehittäjätyökalu (Linnanrakentaja,
 * ali-agentti P7, erä 2b, 29.9.2026). Peilaa natiivin tulevaa ilmettä: aurinko +
 * varjot, lämpimät lamput ja tulen valo, AO/lämpö-sävytetty pienoismalli, ja
 * vapaa kierto + kaarilennot tilasta toiseen (OrbitControls + kamera.js).
 * EI pelaajille, EI service workeriin.
 *
 * Rajapinta ja kaavat: docs/raportit/dioraama-rajapinnat-era2b-20260929.md
 * (kohdat 1, 2, 5, 7) ja aiemmat -20260929.md / -era2-20260929.md -speksit.
 * Kameran ASENTO-kaavat (asentoSijainti, siirtymaAsento, siirtymanKesto) tuodaan
 * SUORAAN js/dioraama/kamera.js:stä — EI kopioida (toinen agentti (P5) laajentaa
 * sitä kaarella samaan aikaan). Leijunta (drift) otetaan käyttöön VAIN jos
 * Kamera.leijunta on olemassa sillä hetkellä kun tämä sivu latautuu.
 *
 * Pinnat, valot ja hahmot/liekit on eriytetty omiin moduuleihinsa:
 *   esikatselu-pinnat.mjs  — MeshStandardMaterial, AO/lämpö/kuvio, Pinnat A/B
 *   esikatselu-valot.mjs   — aurinko/taivas/pistevalot, lepatus, Aurinko/Lamput/Tuli
 *   esikatselu-hahmot.mjs  — 2D/3D-hahmot, liekit, pulun laskeutumispiste
 *   esikatselu-paneeli.mjs — kelluva kytkinpaneeli (piilotettavissa: paneeli=0)
 *
 * URL-parametrit (ks. myös esikatselu.html):
 *   paketti, tila, suunta, koko, taulu — kuten ennen (era1/era2-speksit)
 *   paneeli           0 = ei kytkinpaneelia (kuvakaappauksia varten)
 *   korkeus           ylikirjoittaa alkuasennon korkeuskulman (astetta, absoluuttinen)
 *   atsimuuttilisa    lisätään alkuasennon atsimuuttiin (astetta) — "pahvitarkistus"-kulmat
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as Kamera from '../../js/dioraama/kamera.js';
import { haePintaMateriaali, asetaPintaTila, onkoMaalattujaPintoja } from './esikatselu-pinnat.mjs';
import {
  rakennaPaavalot, rakennaPisteValot, paivitaPisteValot, asetaAurinkoNakyvyys, asetaValoryhmaNakyvyys,
} from './esikatselu-valot.mjs';
import {
  lisaaHahmot, asetaHahmoTila, paivitaHahmoKierto, paivitaHahmoAnimaatio,
  lisaaLiekit, asetaLiekkienNakyvyys, paivitaLiekkiKierto, lisaaPulu,
} from './esikatselu-hahmot.mjs';
import { rakennaPaneeli } from './esikatselu-paneeli.mjs';

// ── Kierto-oletukset (era2b kohta 1) — kun rakennus.json:ssa ei ole kierto-tietoa ──
const OLETUS_KIERTO_TILA = { atsimuutti: [-55, 55], korkeus: [6, 65], etaisyys: [0.55, 1.6] };
const OLETUS_KIERTO_YLEIS = { atsimuutti: null, korkeus: [8, 70], etaisyys: [0.45, 1.8] };
const TAULU_PYSTY_OSUUS = 0.45;
const TAULU_VAAKA_OSUUS = 0.40;
const TAUSTAVARI = '#cfd6d6';

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
const NAYTA_PANEELI = haku.get('paneeli') !== '0';
const KORKEUS_YLI = haku.has('korkeus') ? Number(haku.get('korkeus')) : null;
const ATSIMUUTTI_LISA = haku.has('atsimuuttilisa') ? Number(haku.get('atsimuuttilisa')) : 0;

// ── Kierron rajat OrbitControlsille (era2b kohta 1 ja 5) ────────────────────

/**
 * Kompassiatsimuutti → OrbitControlsin theta. Johdettu asentoSijainti-kaavasta
 * (suunta = (cos k·sin a, sin k, −cos k·cos a)) ja THREEn omasta pallokulmasta
 * (offset = (sin phi·sin theta, cos phi, sin phi·cos theta), phi = 90°−k):
 * yhtälöistä seuraa theta = 180° − a. EI kamera.js:n kaava — OrbitControlsin OMA.
 */
function atsimuuttiThetaksi(a) {
  return THREE.MathUtils.degToRad(180 - a);
}

/**
 * Lukee kierto-olion KUMMASSA TAHANSA muodossa: { atsimuutti:[lo,hi], korkeus:[lo,hi],
 * etaisyys:[lo,hi] } (era2b-speksi, kohta 1 — tämän tiedoston oletusarvot) TAI
 * { atsimuuttiMin, atsimuuttiMax, korkeusMin, korkeusMax, etaisyysMin, etaisyysMax }
 * (js/dioraama/kamera.js:n rajaaKierto — todettu ajohetkellä POIKKEAVAN kirjoitetusta
 * speksistä). Kumpaakaan ei kopioida — tämä on vain puolueeton sovitin rakennus.json:n
 * tulevalle kierto-datalle, oli se kumpi muoto tahansa.
 */
function lueKiertoValit(kierto) {
  if (kierto.atsimuuttiMin !== undefined || kierto.korkeusMin !== undefined) {
    return {
      atsimuutti: kierto.atsimuuttiMin != null && kierto.atsimuuttiMax != null
        ? [kierto.atsimuuttiMin, kierto.atsimuuttiMax] : null,
      korkeus: [kierto.korkeusMin, kierto.korkeusMax],
      etaisyys: [kierto.etaisyysMin, kierto.etaisyysMax],
    };
  }
  return kierto;
}

/** Asettaa OrbitControlsin rajat annetun perusasennon ja kierto-olion mukaan. */
function asetaKiertorajat(controls, asento, kiertoRaaka) {
  const kierto = lueKiertoValit(kiertoRaaka);
  if (!kierto.atsimuutti) {
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
  } else {
    const [lo, hi] = kierto.atsimuutti; // suhteessa perusasentoon (era2b kohta 1)
    controls.minAzimuthAngle = atsimuuttiThetaksi(asento.atsimuutti + hi);
    controls.maxAzimuthAngle = atsimuuttiThetaksi(asento.atsimuutti + lo);
  }
  const [kLo, kHi] = kierto.korkeus; // ABSOLUUTTINEN asteväli (ei "kerroin" kuten etäisyydellä)
  controls.minPolarAngle = THREE.MathUtils.degToRad(90 - kHi);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(90 - kLo);
  const [eLo, eHi] = kierto.etaisyys; // KERROIN perusasennon etäisyyteen (era2b: "kerroin_min/max")
  controls.minDistance = asento.etaisyys * eLo;
  controls.maxDistance = asento.etaisyys * eHi;
}

/** Poimii OrbitControlsin ja kameran nykyisen tilan ASENTO-muotoon (kaarilennon lähtöpiste). */
function nykyinenAsento(controls, camera, aukko) {
  return {
    kohde: [controls.target.x, controls.target.y, controls.target.z],
    atsimuutti: 180 - THREE.MathUtils.radToDeg(controls.getAzimuthalAngle()),
    korkeus: 90 - THREE.MathUtils.radToDeg(controls.getPolarAngle()),
    etaisyys: controls.getDistance(),
    fov: camera.fov,
    aukko,
  };
}

/**
 * Lataa yhden tilan glb:n ja korvaa geneeriset materiaalit pintamateriaaleilla
 * (materiaalin nimi = pinnan id). castShadow/receiveShadow kaikille (kohta 1).
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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
  scene.add(gltf.scene);
}

// ── Pääkoodi ─────────────────────────────────────────────────────────────

async function paakoodi() {
  const rakennusJson = await lataaJson(`${PAKETTI}rakennus.json`);
  const kohdeTilaAlku = TILA_ID ? rakennusJson.tilat.find((t) => t.id === TILA_ID) : null;
  if (TILA_ID && !kohdeTilaAlku) {
    console.warn(`esikatselu: tilaa '${TILA_ID}' ei löydy — käytetään yleisnäkymää`);
  }
  const lueAsento = (tila) => (tila
    ? (SUUNTA === 'pysty' ? tila.kameraPysty : tila.kamera)
    : (SUUNTA === 'pysty' ? rakennusJson.yleiskamera.pysty : rakennusJson.yleiskamera.vaaka));
  const lueKierto = (tila, asento) => ({
    ...(tila ? OLETUS_KIERTO_TILA : OLETUS_KIERTO_YLEIS),
    ...(asento.kierto ?? tila?.kierto ?? {}),
  });

  const alkuAsentoData = lueAsento(kohdeTilaAlku);
  if (!alkuAsentoData) throw new Error(`esikatselu: tilalla '${TILA_ID || '(yleis)'}' ei ole kameraa suuntaan '${SUUNTA}'`);
  const alkuAsento = { ...alkuAsentoData };
  if (KORKEUS_YLI !== null) alkuAsento.korkeus = KORKEUS_YLI; // pahvitarkistus: absoluuttinen ylikirjoitus
  alkuAsento.atsimuutti += ATSIMUUTTI_LISA; // pahvitarkistus: lisäys perusasentoon
  const { sijainti, kohde, fov } = Kamera.asentoSijainti(alkuAsento);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(2); // kiinteä, ei selaimen oma dpr
  renderer.setSize(KOKO_L, KOKO_K, true);
  renderer.setClearColor(TAUSTAVARI, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // fov = pystysuuntainen (kuten Unityssä) — THREE.PerspectiveCameran fov ON pystysuuntainen oletuksena.
  const camera = new THREE.PerspectiveCamera(fov, KOKO_L / KOKO_K, 0.1, 2000);
  camera.position.set(sijainti[0], sijainti[1], sijainti[2]);
  camera.lookAt(kohde[0], kohde[1], kohde[2]);

  // Kaikki tilat ladataan aina (myös 'massa'): dioraama on yksi jaettu maailma.
  const loader = new GLTFLoader();
  for (const tila of rakennusJson.tilat) {
    // eslint-disable-next-line no-await-in-loop
    await lataaTilaGlb(loader, PAKETTI, tila, rakennusJson, scene);
  }

  // Valot vasta kun huoneiden geometria on ladattu: aurinko sovitetaan bboxiin.
  // kohdeTilaAlku != null: sivu on latautunut kohdistettuun tilaan → sisalla-kertoimet (era2b, 29.9.);
  // ulkotila (`ulkona: true`, erä 3: laituri, muurinharja) pitää täyden päivänvalon.
  const bbox = new THREE.Box3().setFromObject(scene);
  const paavalot = rakennaPaavalot(scene, rakennusJson.valaistus, bbox, kohdeTilaAlku != null && !kohdeTilaAlku.ulkona);
  const kaikkiPisteValot = [];
  const kaikkiHahmot = [];
  const kaikkiLiekit = [];
  for (const tila of rakennusJson.tilat) {
    kaikkiPisteValot.push(...rakennaPisteValot(scene, tila));
    // eslint-disable-next-line no-await-in-loop
    kaikkiHahmot.push(...await lisaaHahmot(tila, rakennusJson, PAKETTI, scene, camera.position, loader));
    // eslint-disable-next-line no-await-in-loop
    kaikkiLiekit.push(...await lisaaLiekit(tila, rakennusJson, PAKETTI, scene, camera.position));
  }
  lisaaPulu(kohdeTilaAlku ? kohdeTilaAlku.pulu?.laskeutuminen : rakennusJson.pulu?.laskeutuminen, scene);

  // ── Kamera: OrbitControls rajattuna, kaarilennot tilasta toiseen ──────────
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(kohde[0], kohde[1], kohde[2]);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  asetaKiertorajat(controls, alkuAsento, lueKierto(kohdeTilaAlku, alkuAsentoData));
  controls.update();

  let kayttajaOhjaa = false;
  controls.addEventListener('start', () => { kayttajaOhjaa = true; });
  controls.addEventListener('end', () => { kayttajaOhjaa = false; });

  let lento = null; // { p0, p1, kierto, alku, kesto } | null kun kaarilento on käynnissä
  function aloitaLento(kohdeAsento, kohdeKierto) {
    const p0 = nykyinenAsento(controls, camera, kohdeAsento.aukko ?? alkuAsento.aukko ?? 0.3);
    lento = {
      p0, p1: kohdeAsento, kierto: kohdeKierto, alku: performance.now() / 1000,
      kesto: Kamera.siirtymanKesto(p0, kohdeAsento),
    };
    controls.enabled = false; // ohjaimet eivät saa kilpailla käsin ajetun kaarilennon kanssa
  }
  function paivitaLento(nytS) {
    if (!lento) return false;
    const t = Math.min(1, (nytS - lento.alku) / lento.kesto);
    const asento = Kamera.siirtymaAsento(lento.p0, lento.p1, t);
    const kohta = Kamera.asentoSijainti(asento);
    camera.position.set(kohta.sijainti[0], kohta.sijainti[1], kohta.sijainti[2]);
    camera.fov = kohta.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(kohta.kohde[0], kohta.kohde[1], kohta.kohde[2]);
    if (t >= 1) {
      controls.target.set(kohta.kohde[0], kohta.kohde[1], kohta.kohde[2]);
      asetaKiertorajat(controls, lento.p1, lento.kierto);
      controls.update();
      controls.enabled = true;
      lento = null;
    }
    return true;
  }

  let ajautuminenPaalla = false;

  // ── Kytkinpaneeli (paneeli=0 piilottaa — ei rakenneta silloin ollenkaan) ──
  if (NAYTA_PANEELI) {
    const kohdistettavat = rakennusJson.tilat.filter((t) => t.kohdistettava);
    let naytaHuomio = () => {};
    ({ naytaHuomio } = rakennaPaneeli({
      tilat: kohdistettavat,
      onkoLeijunta: typeof Kamera.leijunta === 'function',
      onKytkin(avain, arvo) {
        if (avain === 'aurinko') asetaAurinkoNakyvyys(paavalot, arvo);
        else if (avain === 'lamput') asetaValoryhmaNakyvyys(kaikkiPisteValot, 'lamppu', arvo);
        else if (avain === 'tuli') {
          asetaValoryhmaNakyvyys(kaikkiPisteValot, 'tuli', arvo);
          asetaLiekkienNakyvyys(kaikkiLiekit, arvo);
        } else if (avain === 'pinnat') {
          asetaPintaTila(arvo === 'B');
          if (arvo === 'B' && !onkoMaalattujaPintoja()) naytaHuomio('Ei maalattuja pintoja tässä paketissa.');
        } else if (avain === 'hahmot') {
          asetaHahmoTila(kaikkiHahmot, arvo === '3D');
          if (arvo === '3D' && !kaikkiHahmot.some((h) => h.malli3d)) naytaHuomio('Ei 3D-hahmoja tässä paketissa.');
        } else if (avain === 'drift') {
          ajautuminenPaalla = arvo;
        }
      },
      onTila(id) {
        const kohdeTila = id ? rakennusJson.tilat.find((t) => t.id === id) : null;
        if (id && !kohdeTila) return;
        const kohdeAsentoData = lueAsento(kohdeTila);
        aloitaLento({ ...kohdeAsentoData }, lueKierto(kohdeTila, kohdeAsentoData));
      },
    }));
  }

  if (NAYTA_TAULU) {
    const peite = document.getElementById('taulu-peite');
    if (SUUNTA === 'pysty') {
      const korkeusPx = Math.round(KOKO_K * TAULU_PYSTY_OSUUS);
      Object.assign(peite.style, {
        left: '0px', top: `${KOKO_K - korkeusPx}px`, width: `${KOKO_L}px`, height: `${korkeusPx}px`, borderTopWidth: '2px',
      });
    } else {
      const leveysPx = Math.round(KOKO_L * TAULU_VAAKA_OSUUS);
      Object.assign(peite.style, {
        left: `${KOKO_L - leveysPx}px`, top: '0px', width: `${leveysPx}px`, height: `${KOKO_K}px`, borderLeftWidth: '2px',
      });
    }
    peite.hidden = false;
  }

  // ── Animaatioloop: lepatus, kaarilento TAI vapaa kierto/ajautuminen, piirto ──
  function silmukka() {
    requestAnimationFrame(silmukka);
    const nytS = performance.now() / 1000;
    paivitaPisteValot(kaikkiPisteValot, nytS);
    paivitaHahmoKierto(kaikkiHahmot, camera.position);
    paivitaHahmoAnimaatio(kaikkiHahmot, nytS);
    paivitaLiekkiKierto(kaikkiLiekit, camera.position);

    const lentaa = paivitaLento(nytS);
    if (!lentaa) {
      if (ajautuminenPaalla && !kayttajaOhjaa && typeof Kamera.leijunta === 'function') {
        const p0 = nykyinenAsento(controls, camera, alkuAsento.aukko ?? 0.3);
        const ajautunut = Kamera.leijunta(p0, nytS);
        const kohta = Kamera.asentoSijainti(ajautunut);
        camera.position.set(kohta.sijainti[0], kohta.sijainti[1], kohta.sijainti[2]);
        camera.fov = kohta.fov;
        camera.updateProjectionMatrix();
        camera.lookAt(kohta.kohde[0], kohta.kohde[1], kohta.kohde[2]);
      } else {
        controls.update();
      }
    }
    renderer.render(scene, camera);
    if (!window.valmis) window.valmis = true;
  }
  silmukka();
}

paakoodi().catch((err) => {
  console.error(err);
  window.esikatseluVirhe = String(err?.stack ?? err);
  window.valmis = true; // savuke ei jää odottamaan ikuisesti — virhe luettavissa window.esikatseluVirhe:stä
});
