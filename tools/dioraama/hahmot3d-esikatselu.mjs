/*
 * DIORAAMAN 3D-HAHMOJEN ESIKATSELUN PIIRTOLOGIIKKA (VÄLIAIKAINEN, ks. hahmot3d-
 * esikatselu.html:n kommentti). Kolme henkilöä (kokki, apulainen, vesipoika)
 * rinnakkain, vakio PBR-materiaalit (GLTFLoader tuo baseColorFactorin suoraan -
 * hahmoilla COLOR_0 on aina AO=1/lämpö=0, ei tarvitse mukautettua varjostinta).
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const HENKILOT = ['kokki-1500', 'apulainen-1500', 'vesipoika-1500'];
const VALI_M = 0.85; // hahmojen keskinäinen etäisyys (m) - kaikki < 0,5 m leveitä

// P4c (korjauskierros, task-kohta "TARKISTUS"): kulmat laajennettu edesta/34:stä
// sivu+ylhäältä-kuviin, ja `henkilo`-parametri rajaa YHTEEN hahmoon (rivi-
// asettelu X-akselilla peittäisi hahmot toistensa taakse "sivu"-kulmasta - siksi
// sivu/ylhäältä-kuvat ovat aina yhden hahmon kuvia). `pose=testi` vääntää
// nivelet OHJEen tarkistuspoosiin (ks. asetaPoosi) - paljastaa raot joita
// lepoasento piilottaa.
const KULMAT = {
  edesta: { atsimuutti: 0, korkeus: 8 },
  '34': { atsimuutti: 35, korkeus: 8 },
  sivu: { atsimuutti: 90, korkeus: 8 },
  ylhaalta: { atsimuutti: 20, korkeus: 58 },
};

function lueKoko(s) {
  const m = /^(\d+)x(\d+)$/.exec(String(s ?? ''));
  if (!m) return { leveys: 1200, korkeus: 800 };
  return { leveys: Number(m[1]), korkeus: Number(m[2]) };
}

const haku = new URLSearchParams(location.search);
const PAKETTI = haku.get('paketti') ?? '../../dist/dioraama/olavinlinna/';
const KULMA = KULMAT[haku.get('kulma')] ? haku.get('kulma') : 'edesta';
const POSE = haku.get('pose') === 'testi';
const HENKILO_YKSI = haku.get('henkilo'); // valinnainen: rajaa yhteen hahmoon (sivu/ylhäältä/poosi)
const NAYTETTAVAT = HENKILO_YKSI ? [HENKILO_YKSI] : HENKILOT;
const { leveys: KOKO_L, korkeus: KOKO_K } = lueKoko(haku.get('koko'));

/**
 * OHJEen tarkistuspoosi: oikea käsi "hämmennys"-asennossa (tyo/puhe-silmukoiden
 * ääriarvot, ks. js/dioraama/pankit/liikkeet.js) + jalat kävelyaskeleen
 * keskellä (kavely-silmukan ääriarvot). Kulmat asteina, THREE.Euler 'XYZ'
 * (järjestyksellä ei väliä TÄSSÄ - puhdas geometrian rako/läpäisytarkistus,
 * ei tuotantoanimaation portin testi).
 */
const TESTIPOOSI = {
  selka: [0, 0, 3],
  olka_o: [35, 0, -30],
  kyynar_o: [70, 0, 0],
  kasi_o: [0, 0, -10],
  lonkka_v: [25, 0, 0],
  lonkka_o: [-25, 0, 0],
  polvi_v: [8, 0, 0],
  polvi_o: [50, 0, 0],
};

function asetaPoosi(scene) {
  for (const [nimi, [rx, ry, rz]] of Object.entries(TESTIPOOSI)) {
    const solmu = scene.getObjectByName(nimi);
    if (!solmu) { console.error(`asetaPoosi: solmua '${nimi}' ei löytynyt`); continue; }
    solmu.rotation.set((rx * Math.PI) / 180, (ry * Math.PI) / 180, (rz * Math.PI) / 180);
  }
}

async function paakoodi() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(2);
  renderer.setSize(KOKO_L, KOKO_K, true);
  renderer.setClearColor('#cfd6d6', 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // Valot: päävalo yläviistosta (varjot pois - vain sommittelun/mittasuhteiden
  // tarkistus) + täyttövalo edestä, jotta selkäpuoli ei jää mustaksi.
  const paavalo = new THREE.DirectionalLight('#fff3e0', 2.2);
  paavalo.position.set(-1.2, 2.5, 1.8);
  scene.add(paavalo);
  const tayte = new THREE.DirectionalLight('#dbe8ff', 0.9);
  tayte.position.set(1.5, 1.0, -1.5);
  scene.add(tayte);
  scene.add(new THREE.AmbientLight('#ffffff', 0.55));

  // Hahmot rinnakkain x-akselilla, keskitettynä origon ympärille (NAYTETTAVAT:
  // yksi tai kaikki kolme, ks. HENKILO_YKSI-kommentti).
  const loader = new GLTFLoader();
  const keskiX = ((NAYTETTAVAT.length - 1) * VALI_M) / 2;
  let virheita = 0;
  for (let i = 0; i < NAYTETTAVAT.length; i += 1) {
    const id = NAYTETTAVAT[i];
    try {
      // eslint-disable-next-line no-await-in-loop
      const gltf = await loader.loadAsync(`${PAKETTI}hahmot3d/${id}.glb`);
      gltf.scene.position.set(i * VALI_M - keskiX, 0, 0);
      // COLOR_0 tässä on AO=1/lämpö=0/B=satunnaisluku (rakennuskoneen sopimus omalle
      // varjostimelleen) - EI glTF:n oletustulkinnan mukainen kertova väri. GLTFLoader
      // asettaa vertexColors=true automaattisesti kun COLOR_0 on läsnä (glTF-spec),
      // mikä muuten kertoisi emäsvärin nollalla vihreäkanavalla -> magenta. Tässä
      // pelkässä sommittelu-/mittasuhde-esikatselussa halutaan AITO baseColorFactor.
      gltf.scene.traverse((obj) => {
        if (obj.isMesh) { obj.material.vertexColors = false; obj.material.needsUpdate = true; }
      });
      if (POSE) asetaPoosi(gltf.scene);
      scene.add(gltf.scene);
    } catch (e) {
      virheita += 1;
      console.error(`hahmot3d-esikatselu: ${id} ei latautunut: ${e?.message ?? e}`);
    }
  }

  // Kamera: edesta/34/sivu/ylhäältä (ks. KULMAT), katsoo ryhmän keskelle n.
  // 1,7 m matkasta koko ryhmän leveys (2*VALI_M + hahmon leveys) huomioiden.
  // `zoom` (oletus 1) ja `kohdeY` (oletus 0,85 m) - valinnaiset lähikuvaa
  // varten (esim. lonkka/kyynärpää-sauman tarkistus): zoom=2 -> puolet etäisyydestä.
  const zoom = Number(haku.get('zoom')) || 1;
  const kohdeYParam = Number(haku.get('kohdeY'));
  const kohde = new THREE.Vector3(0, Number.isFinite(kohdeYParam) && haku.get('kohdeY') ? kohdeYParam : 0.85, 0);
  const { atsimuutti: atsimuuttiAste, korkeus: korkeusAste } = KULMAT[KULMA];
  const etaisyys = 3.6 / zoom; // riittää myssyn/tupsun mahtumiseen kuvaan (oli rajattu 3.1:llä)
  const a = (atsimuuttiAste * Math.PI) / 180;
  const k = (korkeusAste * Math.PI) / 180;
  const camera = new THREE.PerspectiveCamera(32, KOKO_L / KOKO_K, 0.05, 100);
  camera.position.set(
    kohde.x + etaisyys * Math.sin(a) * Math.cos(k),
    kohde.y + etaisyys * Math.sin(k),
    kohde.z + etaisyys * Math.cos(a) * Math.cos(k),
  );
  camera.lookAt(kohde);

  renderer.render(scene, camera);
  window.esikatseluVirheita = virheita;
  window.valmis = true;
}

paakoodi().catch((err) => {
  console.error(err);
  window.esikatseluVirhe = String(err?.stack ?? err);
  window.valmis = true;
});
