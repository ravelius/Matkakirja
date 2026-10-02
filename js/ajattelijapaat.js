/*
 * AJATTELIJOIDEN PÄÄT KARTALLA (omistaja 2.10.2026 klo 12.34, Päätoimittajan kautta; vaihtoehto B): ajattelijan 3D-pää
 * ERIKOISNOSTOT-sarakkeessa kartuutsin (pallolauta-maapaneeli) lipun alla, kun maa on näkymässä (Sokrates Kreikka, Marcus
 * Italia). Myöhemmät erikoisnostot tulevat samaan sarakkeeseen allekkain. Toistaiseksi VAIN KEHITTÄJÄTILASSA.
 *
 *   - Paikka: sarake roikkuu lipun alla kartuutsin oikean reunan ulkopuolella (ei kartuutsin rivien päällä).
 *   - Kasvot kohti kameraa; nenä kääntyy kohti näkymän keskustaa enintään 30°, ja kartan liike heilauttaa päätä
 *     (jousi), mikä antaa 3D-tunnun.
 *   - Valo tulee kartan auringosta: pallolaudan suuntavalo muunnettuna kameran koordinaatteihin.
 *   - Napautus avaa ajattelijan kohtauksen (js/linssit/ajattelija.js, KUVANÄKYMÄ).
 *
 * Kevyt: three.js ja pään GLB (~1 Mt, Linnanrakentaja _valmiit/ajattelijat-kartta/v1) ladataan vasta, kun maa, jolla on
 * ajattelija, on kartuutsissa. Yksi jaettu WebGL-renderöijä piirtää päät 2D-kankaille; piirto vain, kun asento tai valo
 * muuttuu (ei jatkuvaa silmukkaa levossa).
 */
import { AJATTELIJAT, avaaAjattelija, lataaKolme } from './linssit/ajattelija.js';
import { pohjatLataaTyyli } from './pohjat/pohjat.js';
import { VAISTETTAVA_LUOKKA } from './pulu-paneelin-ylla.js';

const PAAT_MEDIA = 'https://media.matkakirja.app/';
export const PAAN_KAANTO_ASTE = 30;
export const ERIKOISNOSTOJA_ENINTAAN = 3;
const PAAN_PIKSELIT = 64;          // = --tk-nappi-laukaisin (CSS-koko); kangas × laitteen pikselisuhde
/** Kankaan reunus varjolle: kangas on 1,5 × pään koko (varjo paperille ulottuu pään ohi). */
const KANGAS_KERROIN = 1.5;
/*
 * KIPSI KARTALLA (omistaja 2.10.2026 klo 16.4x ja 16.5x): lämmin vaalea kipsi ilman sinistä ympäristövaloa
 * (valaistun puolen keskisävy ~210/202/185) ja pehmeä varjo paperille samasta auringosta, niin että pää seisoo
 * kartan päällä. Linssiseppä tekee natiivin samoilla arvoilla.
 */
export const KIPSI_KARTALLA = Object.freeze({
  savy: [1.0, 1.03, 1.1],           // värikerroin: tekstuuri on jo lämmin, tämä neutraloi keltaisuutta (mitattu)
  ymparisto: { taivas: 0xfff6ea, maa: 0x8c7864, voima: 1.0 },   // lämmin puolipallovalo, ei sinistä
  aurinko: { vari: 0xfff1dc, voima: 2.65 },
  varjo: { peitto: 0.26, pehmeys: 10, syvyys: 0.1, korkeusAste: 58 },   // paperi pään takana; VSM-säde; auringon korkeus
});
const PAAN_KALLISTUS_ASTE = 12;    // pää katsoo hieman ylös/alas kohti keskustaa
// Heilahdus suhteutetaan korkeuteen (lähellä sama asteliike on ruudulla suurempi): potku = −dLng / korkeus × kerroin.
const HEILAHDUS = { jousi: 0.12, vaimennus: 0.82, kerroin: 1.4, korkeusMin: 0.05 };

/** Ajattelijat, joiden kartta.maa on tämä ISO-tunnus (rekisterijärjestyksessä). */
export function maanAjattelijat(iso, rekisteri = AJATTELIJAT) {
  return Object.values(rekisteri).filter((a) => a.kartta?.maa && a.kartta.maa === iso);
}

/**
 * Nenän kääntö (aste) kohti näkymän keskustaa: pään paikka x suhteessa keskustaan, ±PAAN_KAANTO_ASTE.
 * Pää näkymän vasemmalla → nenä oikealle (positiivinen = kohti katsojan oikeaa).
 */
export function kaantoKeskustaa(paaX, leveys) {
  const puoli = Math.max(1, leveys / 2);
  const s = Math.max(-1, Math.min(1, (puoli - paaX) / puoli));
  return s * PAAN_KAANTO_ASTE;
}

/**
 * Sarakkeen paikka (näytön px): lipun alla, kartuutsin oikean reunan ulkopuolella. Kartuutsi on ruudun alareunaan
 * ankkuroitu, joten jos sarake ei mahdu lipun alle, se nousee niin, että alareuna on kartuutsin alareunan tasalla
 * (pieni ruutu: pää kartuutsin vieressä, ei ruudun ulkopuolella). `mahtuu` kertoo, mahtuiko sarake lipun alle.
 * Jos sarake ei mahdu vaakasuunnassa (avattu kartuutsi puhelimella on ruudun levyinen; Linssiseppän mittaus
 * 2.10.2026), se nousee kartuutsin yläpuolelle ruudun oikeaan reunaan.
 */
export function sarakkeenPaikka(lippu, kartuutsi, { vali = 8, korkeus = 0, leveys = PAAN_PIKSELIT, ruutuLeveys = Infinity } = {}) {
  const x = Math.max(lippu.left, kartuutsi.right + vali);
  if (x + leveys + vali > ruutuLeveys) {
    return { x: ruutuLeveys - leveys - vali, y: Math.max(0, kartuutsi.top - korkeus - vali), mahtuu: false, ylla: true };
  }
  const alle = lippu.bottom + vali;
  const mahtuu = alle + korkeus <= kartuutsi.bottom;
  return { x, y: mahtuu ? alle : Math.max(0, kartuutsi.bottom - korkeus), mahtuu };
}

/**
 * ERIKOISNOSTOT-pohja (tyylikirja.json pohjat.ERIKOISNOSTOT): sarake, jossa jokaisella ajattelijalla on PÄÄ-nappi
 * (2D-kangas, johon jaettu renderöijä piirtää 3D-pään). Palauttaa { el, paat, avaa } kuten muut pohjat.
 * esikatselu: tyylikirjan galleria (sarake virrassa, ei kiinteää paikkaa).
 */
export function luoPohjaErikoisnostot(ajattelijat, { esikatselu = false, avaa = (a) => avaaAjattelija(a.tunnus) } = {}) {
  pohjatLataaTyyli();
  const el = document.createElement('div');
  // Kartalla kerros on koko ruudun läpinäkyvä taso, ja jokainen pää on karttaobjekti omassa kartan pisteessään
  // (omistaja 16.5x); galleriassa (esikatselu) päät ovat sarakkeena.
  el.className = esikatselu ? 'tk-erikoisnostot tk-erikoisnostot--esikatselu' : 'tk-erikoisnostot';
  const px = Math.round(PAAN_PIKSELIT * KANGAS_KERROIN * Math.min(globalThis.devicePixelRatio || 1, 2));
  const paat = ajattelijat.slice(0, ERIKOISNOSTOJA_ENINTAAN).map((a) => {
    const nappi = document.createElement('button');
    nappi.type = 'button';
    // Pulu väistää pään (VAISTETTAVA_LUOKKA): luokka napilla, ei koko ruudun kerroksella.
    nappi.className = esikatselu ? 'tk-erikoisnosto-paa' : `tk-erikoisnosto-paa ${VAISTETTAVA_LUOKKA}`;
    nappi.setAttribute('aria-label', `${a.nimi}: avaa ajattelija`);
    nappi.title = a.nimi;   // nimi vain VoiceOverille ja vihjeenä, ei näkyvää tekstiä
    const kangas = document.createElement('canvas');
    kangas.width = px;
    kangas.height = px;
    nappi.appendChild(kangas);
    nappi.addEventListener('click', (e) => {
      e.stopPropagation();
      Promise.resolve(avaa(a)).catch((syy) => console.warn('ajattelija', syy));
    });
    el.appendChild(nappi);
    return { a, nappi, kangas, ctx: kangas.getContext('2d'), malli: null, kulma: 0, nopeus: 0, piirretty: null };
  });
  return { el, paat, avaa: () => {} };
}

/**
 * Jaettu pään piirtäjä: yksi WebGL-renderöijä (läpinäkyvä) piirtää päät 2D-kankaille. Pää kameran edessä, takana
 * paperitaso, joka ottaa vain varjon (ShadowMaterial); valo annetaan kameran koordinaateissa (kartan aurinko).
 */
export async function luoPaanPiirtaja() {
  const THREE = await lataaKolme();
  const K = KIPSI_KARTALLA;
  const renderoija = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  const px = Math.round(PAAN_PIKSELIT * KANGAS_KERROIN * Math.min(globalThis.devicePixelRatio || 1, 2));
  renderoija.setSize(px, px, false);
  renderoija.outputColorSpace = THREE.SRGBColorSpace;
  renderoija.toneMapping = THREE.NeutralToneMapping ?? THREE.AgXToneMapping;
  renderoija.shadowMap.enabled = true;
  renderoija.shadowMap.type = THREE.VSMShadowMap;
  const kohtaus = new THREE.Scene();
  kohtaus.add(new THREE.HemisphereLight(K.ymparisto.taivas, K.ymparisto.maa, K.ymparisto.voima));
  const valo = new THREE.DirectionalLight(K.aurinko.vari, K.aurinko.voima);
  valo.castShadow = true;
  valo.shadow.mapSize.set(512, 512);
  valo.shadow.radius = K.varjo.pehmeys;
  valo.shadow.blurSamples = 16;
  Object.assign(valo.shadow.camera, { left: -0.4, right: 0.4, top: 0.4, bottom: -0.4, near: 0.01, far: 3 });
  kohtaus.add(valo, valo.target);
  // Paperi pään takana (kamera katsoo karttaa ylhäältä, joten "lattia" on kameraa kohti oleva taso).
  const paperi = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.ShadowMaterial({ opacity: K.varjo.peitto }));
  paperi.position.set(0, 0.12, -K.varjo.syvyys);
  paperi.receiveShadow = true;
  kohtaus.add(paperi);
  // Kamera kauempana kuin ennen: kangas on 1,5 × pää, joten varjolle jää tilaa ympärille.
  const kamera = new THREE.PerspectiveCamera(30, 1, 0.05, 5);
  kamera.position.set(0, 0.12, 0.72 * KANGAS_KERROIN);
  kamera.lookAt(0, 0.12, 0);
  const mallit = new Set();
  return {
    THREE,
    async lataa(a) {
      const gltf = await new THREE.GLTFLoader().loadAsync(`${PAAT_MEDIA}${a.kartta.glb}`);
      gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        o.castShadow = true;
        for (const m of [o.material].flat()) m?.color?.multiply?.(new THREE.Color(...K.savy));
      });
      const juuri = new THREE.Group();
      juuri.add(gltf.scene);
      juuri.visible = false;
      kohtaus.add(juuri);
      mallit.add(juuri);
      return juuri;
    },
    /** Piirtää pään p kankaalleen: kaanto (aste, + = katsojan oikealle), valo {x,y,z} kameran koordinaateissa. */
    piirra(p, kaanto, l) {
      for (const m of mallit) m.visible = m === p.malli;
      p.malli.rotation.set(-PAAN_KALLISTUS_ASTE * Math.PI / 180, kaanto * Math.PI / 180, 0);
      valo.position.set(l.x, 0.12 + l.y, l.z);
      valo.target.position.set(0, 0.12, 0);
      renderoija.render(kohtaus, kamera);
      p.ctx.clearRect(0, 0, p.kangas.width, p.kangas.height);
      p.ctx.drawImage(renderoija.domElement, 0, 0);
    },
    pura: () => renderoija.dispose(),
  };
}

/** Kartalla näytettävät ajattelijat: kaikki, joilla on kiinteä karttapiste (rekisterijärjestyksessä). */
export function karttaAjattelijat(rekisteri = AJATTELIJAT) {
  return Object.values(rekisteri).filter((a) => Array.isArray(a.kartta?.piste) && a.kartta?.glb);
}

/**
 * Pään paikka ruudulla karttapisteestä (omistaja 16.5x: "pysyy kartalla samassa paikassa"): napin keskipiste
 * x = pisteen x, y = pisteen y − puolet pään korkeudesta (pää seisoo pisteen päällä). null, jos piste on pallon
 * takana tai ruudun ulkopuolella.
 */
export function paanRuutupaikka(ruutu, { edessa = true, leveys = Infinity, korkeus = Infinity, koko = PAAN_PIKSELIT } = {}) {
  if (!ruutu || !edessa || !Number.isFinite(ruutu.x) || !Number.isFinite(ruutu.y)) return null;
  const x = ruutu.x;
  const y = ruutu.y - koko * 0.35;
  if (x < -koko || y < -koko || x > leveys + koko || y > korkeus + koko) return null;
  return { x, y };
}

/** Kytkee päät kartalle karttaobjekteina (kehittäjätila). Palauttaa purkufunktion. */
export function kytkeAjattelijaPaat(ui, { kehittaja = () => true } = {}) {
  let kerros = null;
  let paat = [];          // { a, nappi, kangas, ctx, malli, kulma, nopeus, piirretty }
  let piirtaja = null;
  let purettu = false;
  let edellinenLng = null;
  let edellinenAsento = '';
  let kehys = 0;
  let ladataan = false;

  /** Pallolaudan suuntavalo kameran koordinaateissa (pään valo samasta suunnasta kuin pallon). */
  function kartanValo() {
    const pallo = ui.pallolauta?.pallo;
    const cam = pallo?.camera?.();
    let suunta = null;
    pallo?.scene?.()?.traverse?.((o) => { if (!suunta && o.isDirectionalLight) suunta = o.position.clone().normalize(); });
    // Suunta paperin tasossa tulee kartan auringosta; korkeus kiinnitetään (KIPSI_KARTALLA.varjo.korkeusAste), jotta
    // varjo on lyhyt ja pehmeä eikä matala aurinko venytä sitä laataksi (mitattu 2.10.2026).
    const kor = KIPSI_KARTALLA.varjo.korkeusAste * Math.PI / 180;
    let dx = 0.45; let dy = 0.75;
    if (cam && suunta) {
      const v = suunta.clone().transformDirection(cam.matrixWorldInverse);
      const pit = Math.hypot(v.x, v.y);
      if (pit > 1e-3) { dx = v.x / pit; dy = v.y / pit; }
    }
    return { x: dx * Math.cos(kor), y: dy * Math.cos(kor), z: Math.sin(kor) };
  }

  /** Karttapiste ruudulle: getScreenCoords (kankaan koordinaatit) + kankaan paikka; takapuoli piiloon. */
  function ruutupiste(a) {
    const pallo = ui.pallolauta?.pallo;
    const kangas = pallo?.renderer?.()?.domElement;
    if (!pallo?.getScreenCoords || !kangas) return null;
    const [lat, lng] = a.kartta.piste;
    const r = kangas.getBoundingClientRect();
    const sc = pallo.getScreenCoords(lat, lng, 0);
    const cam = pallo.camera?.();
    const w = pallo.getCoords?.(lat, lng, 0);
    const edessa = !cam || !w ? true
      : (cam.position.x - w.x) * w.x + (cam.position.y - w.y) * w.y + (cam.position.z - w.z) * w.z > 0;
    return paanRuutupaikka(sc && { x: r.left + sc.x, y: r.top + sc.y },
      { edessa, leveys: globalThis.innerWidth || Infinity, korkeus: globalThis.innerHeight || Infinity });
  }

  /*
   * PÄÄ KARTTAMERKKIEN ALLA (Päätoimittaja 2.10.2026 klo 16.49; Linssiseppä natiivissa 618591d9): kerros asuu pallon
   * scene-containerissa kankaan ja HTML-merkkikerroksen (kaupunkien kutsukortit, maakortit) välissä, joten kortit
   * piirtyvät pään päälle mutta pää kartan päälle. Ilman pallon säiliötä (testit) kerros jää bodyyn kiinteänä.
   */
  function kiinnita() {
    const kangas = ui.pallolauta?.pallo?.renderer?.()?.domElement;
    const sailio = kangas?.closest?.('.scene-container');
    let kankaanLapsi = kangas;
    while (kankaanLapsi && kankaanLapsi.parentElement !== sailio) kankaanLapsi = kankaanLapsi.parentElement;
    if (sailio && kankaanLapsi) {
      kerros.classList.add('tk-erikoisnostot--kartalla');
      if (kerros.parentElement !== sailio || kerros.previousElementSibling !== kankaanLapsi) {
        sailio.insertBefore(kerros, kankaanLapsi.nextSibling);
      }
    } else if (!kerros.isConnected) {
      document.body.appendChild(kerros);
    }
  }

  async function rakenna() {
    if (kerros || ladataan) return;
    const ajattelijat = karttaAjattelijat();
    if (!ajattelijat.length) return;
    ladataan = true;
    const pohja = luoPohjaErikoisnostot(ajattelijat);
    kerros = pohja.el;
    paat = pohja.paat;
    for (const p of paat) p.nappi.hidden = true;
    kiinnita();
    try {
      piirtaja ??= await luoPaanPiirtaja();
      for (const p of paat) p.malli = await piirtaja.lataa(p.a);
    } catch (syy) {
      console.warn('ajattelijapaat', syy);
    }
    ladataan = false;
    pyyda();
  }

  function piirra() {
    kehys = 0;
    if (purettu || !kerros || !piirtaja) return;
    const pov = ui.pallolauta?.pallo?.pointOfView?.();
    const asento = pov ? `${pov.lat.toFixed(4)},${pov.lng.toFixed(4)},${pov.altitude.toFixed(4)}` : '';
    // Kartan liike: pituusasteen muutos ruudussa → pieni heilahdus (jousi takaisin lepoon); pää ei liu'u.
    const lng = pov?.lng ?? 0;
    const korkeus = Math.max(HEILAHDUS.korkeusMin, pov?.altitude ?? 1);
    const dLng = (edellinenLng == null ? 0 : ((lng - edellinenLng + 540) % 360) - 180) / korkeus;
    edellinenLng = lng;
    let liikkuu = asento !== edellinenAsento;
    edellinenAsento = asento;
    const l = kartanValo();
    const leveys = globalThis.innerWidth || 1;
    // Kerroksen paikka ruudulla: kartalla napit asemoidaan säiliön suhteen, bodyssä ruudun suhteen.
    const isanta = kerros.classList.contains('tk-erikoisnostot--kartalla') ? kerros.getBoundingClientRect() : { left: 0, top: 0 };
    for (const p of paat) {
      const paikka = ruutupiste(p.a);
      p.nappi.hidden = !paikka || !p.malli;
      if (!paikka || !p.malli) continue;
      p.nappi.style.left = `${Math.round(paikka.x - isanta.left)}px`;
      p.nappi.style.top = `${Math.round(paikka.y - isanta.top)}px`;
      p.nopeus = (p.nopeus + (-dLng * HEILAHDUS.kerroin) - p.kulma * HEILAHDUS.jousi) * HEILAHDUS.vaimennus;
      p.kulma = Math.max(-PAAN_KAANTO_ASTE, Math.min(PAAN_KAANTO_ASTE, p.kulma + p.nopeus));
      if (Math.abs(p.nopeus) > 0.01 || Math.abs(p.kulma) > 0.05) liikkuu = true;
      const kaanto = Math.max(-PAAN_KAANTO_ASTE, Math.min(PAAN_KAANTO_ASTE, kaantoKeskustaa(paikka.x, leveys) + p.kulma));
      const tila = `${kaanto.toFixed(2)}|${l.x.toFixed(3)},${l.y.toFixed(3)},${l.z.toFixed(3)}`;
      if (tila === p.piirretty) continue;
      p.piirretty = tila;
      piirtaja.piirra(p, kaanto, l);
    }
    if (liikkuu) pyyda();
  }
  const pyyda = () => { if (!kehys && !purettu) kehys = requestAnimationFrame(piirra); };

  function tarkista() {
    if (purettu) return;
    if (!kehittaja() || !ui.pallolauta?.pallo) {
      if (kerros) kerros.hidden = true;
      return;
    }
    if (!kerros) { rakenna(); return; }
    // Pallo voi rakentua uudelleen (laudan vaihto): kerros seuraa uutta säiliötä.
    if (!ladataan) kiinnita();
    kerros.hidden = false;
    pyyda();
  }

  // Kevyt vahti (kartan liike ja koko): rAF pyörii vain, kun asento tai heilahdus muuttuu.
  const vahti = setInterval(tarkista, 250);
  const liike = () => pyyda();
  globalThis.addEventListener?.('pointermove', liike, { passive: true });
  globalThis.addEventListener?.('wheel', liike, { passive: true });
  globalThis.addEventListener?.('resize', liike);
  tarkista();
  return () => {
    purettu = true;
    clearInterval(vahti);
    globalThis.removeEventListener?.('pointermove', liike);
    globalThis.removeEventListener?.('wheel', liike);
    globalThis.removeEventListener?.('resize', liike);
    kerros?.remove();
    piirtaja?.pura();
  };
}

/** Tyylikirjan esikatselu: piirtää pohjan päät kerran levossa (nenä hieman sivulle, valo vasemmalta ylhäältä). */
export async function piirraEsikatselu(pohja) {
  const piirtaja = await luoPaanPiirtaja();
  for (const p of pohja.paat) {
    p.malli = await piirtaja.lataa(p.a);
    piirtaja.piirra(p, -12, { x: -0.5, y: 0.8, z: 0.6 });
  }
}
