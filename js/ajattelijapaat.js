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

const PAAT_MEDIA = 'https://media.matkakirja.app/';
export const PAAN_KAANTO_ASTE = 30;
export const ERIKOISNOSTOJA_ENINTAAN = 3;
const PAAN_PIKSELIT = 64;          // = --tk-nappi-laukaisin (CSS-koko); kangas × laitteen pikselisuhde
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
  el.className = esikatselu ? 'tk-erikoisnostot tk-erikoisnostot--esikatselu' : 'tk-erikoisnostot';
  const px = PAAN_PIKSELIT * Math.min(globalThis.devicePixelRatio || 1, 2);
  const paat = ajattelijat.slice(0, ERIKOISNOSTOJA_ENINTAAN).map((a) => {
    const nappi = document.createElement('button');
    nappi.type = 'button';
    nappi.className = 'tk-erikoisnosto-paa';
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
 * Jaettu pään piirtäjä: yksi WebGL-renderöijä (läpinäkyvä, AgX) piirtää päät 2D-kankaille. Pää 3/4-valossa kameran
 * edessä; valo annetaan kameran koordinaateissa.
 */
export async function luoPaanPiirtaja() {
  const THREE = await lataaKolme();
  const renderoija = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  const px = PAAN_PIKSELIT * Math.min(globalThis.devicePixelRatio || 1, 2);
  renderoija.setSize(px, px, false);
  renderoija.outputColorSpace = THREE.SRGBColorSpace;
  renderoija.toneMapping = THREE.AgXToneMapping;
  const kohtaus = new THREE.Scene();
  kohtaus.add(new THREE.AmbientLight(0xffffff, 0.35));
  const valo = new THREE.DirectionalLight(0xfff4e6, 2.6);
  kohtaus.add(valo, valo.target);
  const kamera = new THREE.PerspectiveCamera(30, 1, 0.05, 5);
  kamera.position.set(0, 0.13, 0.72);
  kamera.lookAt(0, 0.12, 0);
  const mallit = new Set();
  return {
    THREE,
    async lataa(a) {
      const gltf = await new THREE.GLTFLoader().loadAsync(`${PAAT_MEDIA}${a.kartta.glb}`);
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
      valo.position.set(l.x, l.y, l.z);
      renderoija.render(kohtaus, kamera);
      p.ctx.clearRect(0, 0, p.kangas.width, p.kangas.height);
      p.ctx.drawImage(renderoija.domElement, 0, 0);
    },
    pura: () => renderoija.dispose(),
  };
}

/** Kytkee päät kartalle (kehittäjätila). Palauttaa purkufunktion. */
export function kytkeAjattelijaPaat(ui, { kehittaja = () => true } = {}) {
  let sarake = null;
  let nykyinenIso = null;
  let paat = [];          // { a, nappi, kangas, ctx, malli, kulma, nopeus, piirretty }
  let piirtaja = null;
  let purettu = false;
  let edellinenLng = null;
  let kehys = 0;

  const kartuutsi = () => document.querySelector('.pallolauta-maapaneeli .maapaneeli-kortti');

  function rakennaSarake(ajattelijat) {
    sarake?.remove();
    const pohja = luoPohjaErikoisnostot(ajattelijat);
    sarake = pohja.el;
    paat = pohja.paat;
    document.body.appendChild(sarake);
    asemoi();
  }

  /** Pallolaudan suuntavalo kameran koordinaateissa (pään valo samasta suunnasta kuin pallon). */
  function kartanValo() {
    const pallo = ui.pallolauta?.pallo;
    const cam = pallo?.camera?.();
    let suunta = null;
    pallo?.scene?.()?.traverse?.((o) => { if (!suunta && o.isDirectionalLight) suunta = o.position.clone().normalize(); });
    if (!cam || !suunta) return { x: 0.5, y: 0.8, z: 0.6 };
    const v = suunta.clone().transformDirection(cam.matrixWorldInverse);
    return { x: v.x, y: v.y, z: Math.max(0.15, v.z) };
  }

  function asemoi() {
    const k = kartuutsi();
    // Lippu näkyy vain avatussa kartuutsissa (pienessä CSS piilottaa sen) → muuten nimirivi.
    const nakyva = (e) => (e?.getBoundingClientRect().height > 0 ? e : null);
    const lippu = nakyva(k?.querySelector('.maapaneeli-lippu')) ?? nakyva(k?.querySelector('.maapaneeli-nimirivi'));
    if (!k || !lippu || !sarake) return null;
    const p = sarakkeenPaikka(lippu.getBoundingClientRect(), k.getBoundingClientRect(),
      { korkeus: sarake.getBoundingClientRect().height, ruutuLeveys: globalThis.innerWidth || Infinity });
    sarake.style.left = `${Math.round(p.x)}px`;
    sarake.style.top = `${Math.round(p.y)}px`;
    sarake.dataset.mahtuu = p.mahtuu ? '1' : '0';
    return { leveys: globalThis.innerWidth || 1, x: p.x };
  }

  function piirra() {
    kehys = 0;
    if (purettu || !sarake || !piirtaja) return;
    const paikka = asemoi();
    if (!paikka) return;
    // Kartan liike: pallon kameran pituusasteen muutos ruudussa → heilahdus (jousi takaisin lepoon).
    const pov = ui.pallolauta?.pallo?.pointOfView?.();
    const lng = pov?.lng ?? 0;
    const korkeus = Math.max(HEILAHDUS.korkeusMin, pov?.altitude ?? 1);
    const dLng = (edellinenLng == null ? 0 : ((lng - edellinenLng + 540) % 360) - 180) / korkeus;
    edellinenLng = lng;
    const l = kartanValo();
    let liikkuu = Math.abs(dLng) > 0.001;
    for (const p of paat) {
      if (!p.malli) continue;
      p.nopeus = (p.nopeus + (-dLng * HEILAHDUS.kerroin) - p.kulma * HEILAHDUS.jousi) * HEILAHDUS.vaimennus;
      p.kulma = Math.max(-PAAN_KAANTO_ASTE, Math.min(PAAN_KAANTO_ASTE, p.kulma + p.nopeus));
      if (Math.abs(p.nopeus) > 0.01 || Math.abs(p.kulma) > 0.05) liikkuu = true;
      const kaanto = Math.max(-PAAN_KAANTO_ASTE, Math.min(PAAN_KAANTO_ASTE,
        kaantoKeskustaa(paikka.x + PAAN_PIKSELIT / 2, paikka.leveys) + p.kulma));
      const tila = `${kaanto.toFixed(2)}|${l.x.toFixed(3)},${l.y.toFixed(3)},${l.z.toFixed(3)}`;
      if (tila === p.piirretty) continue;
      p.piirretty = tila;
      piirtaja.piirra(p, kaanto, l);
    }
    if (liikkuu) pyyda();
  }
  const pyyda = () => { if (!kehys && !purettu) kehys = requestAnimationFrame(piirra); };

  async function tarkista() {
    if (purettu) return;
    const iso = kehittaja() ? kartuutsi()?.dataset?.iso ?? null : null;
    if (iso === nykyinenIso) { if (sarake) { asemoi(); pyyda(); } return; }
    nykyinenIso = iso;
    // Enintään 3 allekkain (Natiivi-UI): ei vieritystä, karsinta rekisterin (tärkeys)järjestyksessä.
    const ajattelijat = iso ? maanAjattelijat(iso) : [];
    if (!ajattelijat.length) { sarake?.remove(); sarake = null; paat = []; return; }
    rakennaSarake(ajattelijat);
    const omat = paat;
    try {
      piirtaja ??= await luoPaanPiirtaja();
      for (const p of omat) p.malli = await piirtaja.lataa(p.a);
    } catch (syy) {
      console.warn('ajattelijapaat', syy);
      return;
    }
    if (nykyinenIso === iso) pyyda();
  }

  // Kartan liike ja kartuutsin vaihto: kevyt vahti (ei jatkuvaa piirtoa levossa).
  const vahti = setInterval(tarkista, 400);
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
    sarake?.remove();
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
