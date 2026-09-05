/*
 * KARTTAPALLO — maailmanvalikko Google Earth -tapaan.
 *
 * OMISTAJAN KYSYMYS 4.9.2026 ("Miten haastava olisi tehdä Google earth
 * tyylinen kartta pallo peliin" / "onko valmiita pohjia ... että saisi
 * 2. vaihtoehdon tehtyä nopeammin" / testisivun jälkeen: "Globe GL
 * toimii hienosti"). Vaihtoehto 2 = pallo on maailmanvalikko: pelaaja
 * pyörittää palloa, napauttaa kaupunkia, ja peli sukeltaa nykyiselle
 * laudalle. Lehdet, nostot, linssit ja poltetut nimet pysyvät
 * tasolaudalla; pallolla ovat vain kaupungit, reitit ja pelaajan
 * paikka.
 *
 * ── MOOTTORI JA AINEISTO TULEVAT ÄMPÄRISTÄ, EIVÄT REPOSTA ──────────
 *
 * Globe.gl (MIT, three.js mukana, n. 700 kt) ladataan pelin R2:sta
 * skriptinä vasta kun pallo avataan ensimmäisen kerran — peli ei
 * kanna sitä mukanaan, ja ilman verkkoa pallo kertoo, ettei se
 * latautunut. Pinnoite on pelin oma juliste käännettynä Millerista
 * tasaväliseksi kuvaksi (tools/tee-pallotekstuuri.mjs, workflow
 * tee-pallotekstuuri), samassa ämpärissä laattapyramidin vieressä.
 *
 * ── SUKELLUS ON KAMERA-AJO ─────────────────────────────────────────
 *
 * Maailmankartta on ainoa pelilauta (Raamattu 30.8.2026), joten
 * kaupungin napautus sulkee pallon ja ajaa kameran kaupunkiin
 * (js/kartta.js ajaKamera) — ei laudan vaihtoa. Pallo avataan
 * matkalaukun Karttapallo-linssistä (js/ui.js → ui.avaaPallo).
 */

import { laudaltaAsteiksi, projisoiLaudalle } from './fokusmitat.js';

const R2 = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
/**
 * Globe.gl:n UMD-paketti pelin ämpärissä (workflow tee-pallotekstuuri tai
 * tee-pallolaatat vie sen). 2.46 tuo laattamoottorin (globeTileEngineUrl).
 */
export const PALLO_KIRJASTO = `${R2}vendor/globe.gl-2.46.2.min.js`;
/** Pinnoitteen versio = sen laattapyramidin versio, josta se käännettiin. */
export const PALLO_TEKSTUURIVERSIO = '2026-09-03a';
/** Laattataso, josta pinnoite on käännetty: z4 on ainoa (omistaja 4.9.2026). */
export const PALLO_TEKSTUURITASO = 4;
export const PALLO_TEKSTUURI = `${R2}julisteet/pallo/${PALLO_TEKSTUURIVERSIO}/tekstuuri-z${PALLO_TEKSTUURITASO}.jpg`;
/*
 * LAATOITETTU PALLO (omistaja 4.9.2026 ilta: "Jos se tukee niin tee se
 * suoraan peliin ilman demoa"). Pinta haetaan Web Mercator -laattoina
 * (tools/tee-pallolaatat.mjs, workflow tee-pallolaatat) vain katsotulle
 * alueelle tarkkuustasoittain, joten yhden tekstuurin muisti- ja
 * tarkkuuskatto poistuu. Yksi z4-tekstuuri jää VARAKSI: jos laattojen
 * luetteloa (laatat.json) ei saada, pallo piirtyy kuten ennen.
 */
export const PALLO_LAATTAVERSIO = '2026-09-03a';
export const PALLO_LAATAT = `${R2}julisteet/pallo/laatat/${PALLO_LAATTAVERSIO}/`;
export const PALLO_LAATTATASO_MAX = 7;
/** Laatan osoite laattamoottorille (slippy map -koordinaatit). */
export const pallonLaatta = (x, y, l) => `${PALLO_LAATAT}${l}/${x}/${y}.jpg`;

let laatatLupaus = null;
/** Onko laattaluettelo ämpärissä? Tulos muistetaan; virhe = ei laattoja. */
export function laatatSaatavilla(haku = globalThis.fetch) {
  if (!laatatLupaus) {
    laatatLupaus = Promise.resolve()
      .then(() => haku(`${PALLO_LAATAT}laatat.json`, { cache: 'force-cache' }))
      .then((v) => (v.ok ? v.json() : null))
      .then((j) => Boolean(j && j.tasot && j.tasot.max >= 0))
      .catch(() => false);
  }
  return laatatLupaus;
}
/** Sukelluksen näkyvä leveys laudan yksikköinä (maan kokoinen ikkuna). */
export const PALLO_SUKELLUSLEVEYS = 620;
export const PALLO_LAUTA = 'maailmankartta';

/** Kaupungit pallolle: lauta → asteet, käyntitieto ja aloituskaupungit mukana. */
export function pallonKaupungit(pack, kaydyt = new Set()) {
  return (pack?.cities ?? []).map((c) => {
    const p = laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
    if (!p) return null;
    return { id: c.id, n: c.name, lat: p.lat, lon: p.lon, x: c.x, y: c.y, alku: Boolean(c.start), kayty: kaydyt.has(c.id) };
  }).filter(Boolean);
}

/**
 * Napautettu piste laudan koordinaatiksi: asteet → laudan (x, y). Null,
 * jos piste ei ole laudalla (napa-alueet julisteen ulkopuolella).
 */
export function sukelluskohta(lat, lon) {
  const p = projisoiLaudalle(PALLO_LAUTA, lon, lat);
  return p && Number.isFinite(p.x) && Number.isFinite(p.y) ? { x: p.x, y: p.y } : null;
}

let kirjastoLupaus = null;
/** Lataa Globe.gl kerran; toinen avaus käyttää samaa globaalia. */
export function lataaPallokirjasto(doc = document) {
  if (globalThis.Globe) return Promise.resolve(globalThis.Globe);
  if (kirjastoLupaus) return kirjastoLupaus;
  kirjastoLupaus = new Promise((ok, ei) => {
    const s = doc.createElement('script');
    s.src = PALLO_KIRJASTO;
    s.async = true;
    s.addEventListener('load', () => (globalThis.Globe ? ok(globalThis.Globe) : ei(new Error('Globe puuttuu'))));
    s.addEventListener('error', () => { kirjastoLupaus = null; ei(new Error('kirjasto ei latautunut')); });
    doc.head.appendChild(s);
  });
  return kirjastoLupaus;
}

/** Sulkee pallon, jos se on auki. */
export function suljePallo(ui) {
  const kuori = ui.pallo;
  if (!kuori) return false;
  ui.pallo = null;
  ui.pallonInstanssi = null;
  kuori.classList.remove('esilla');
  document.body.classList.remove('pallo-auki');
  ui.pallonKuuntelija?.();
  ui.pallonKuuntelija = null;
  setTimeout(() => kuori.remove(), 420);
  return true;
}

/**
 * Avaa pallon koko kartta-alueen päälle. Palauttaa true, kun pallo on
 * ruudulla (kirjasto ja pinnoite ladataan taustalla; latausvirhe
 * näytetään kuoressa eikä kaada peliä).
 */
export async function avaaPallo(ui) {
  if (ui.dead || ui.pallo) return false;
  const kuori = document.createElement('div');
  kuori.className = 'pallo-kuori';
  kuori.setAttribute('role', 'dialog');
  kuori.setAttribute('aria-modal', 'true');
  kuori.setAttribute('aria-label', 'Karttapallo');
  /*
   * EI OTSIKKORIVIÄ (omistaja 4.9.2026 ilta: "Ota se karttapallo pois
   * otsikkoriviltä, kun se menee matkakirjan logon kanssa päällekkäin.
   * Sitä ei tarvita ollenkaan"). Kuori alkaa pelin ylärivin alta, joten
   * logo ja ylärivin napit jäävät näkyviin; pallon päällä kelluu vain
   * Sulje-nappi oikeassa yläkulmassa.
   */
  kuori.innerHTML = `
    <button type="button" class="pallo-sulje" aria-label="Sulje" title="Sulje">✕</button>
    <div class="pallo-kotelo"></div>
    <p class="pallo-tila">Ladataan palloa…</p>`;
  const ylarivi = document.querySelector('.topbar');
  if (ylarivi) kuori.style.top = `${Math.round(ylarivi.getBoundingClientRect().bottom)}px`;
  document.body.appendChild(kuori);
  ui.pallo = kuori;
  document.body.classList.add('pallo-auki');
  void kuori.getBoundingClientRect();
  kuori.classList.add('esilla');
  const sulje = () => suljePallo(ui);
  kuori.querySelector('.pallo-sulje').addEventListener('click', sulje);
  const nappain = (e) => { if (e.key === 'Escape') { e.stopPropagation(); sulje(); } };
  document.addEventListener('keydown', nappain, true);
  ui.pallonKuuntelija = () => document.removeEventListener('keydown', nappain, true);

  const tila = kuori.querySelector('.pallo-tila');
  let Globe;
  try {
    Globe = await lataaPallokirjasto();
  } catch {
    tila.textContent = 'Karttapallo ei latautunut — tarkista verkkoyhteys ja yritä uudelleen.';
    return true;
  }
  if (ui.pallo !== kuori) return false;
  const kotelo = kuori.querySelector('.pallo-kotelo');
  const pack = ui.game.pack;
  const kaupungit = pallonKaupungit(pack);
  const pos = ui.game.player?.pos;
  const oma = pos?.type === 'city' ? kaupungit.find((k) => k.id === pos.city) : null;
  // Laatat, jos luettelo on ämpärissä; muuten z4-tekstuuri varana.
  const laatat = await laatatSaatavilla();
  if (ui.pallo !== kuori) return false;
  // Pelkkä pinnoite: ei pisteitä, nimiä, kaaria eikä renkaita (omistaja
  // 4.9.2026: "älä lisää mitään sen päälle").
  const pallo = Globe()(kotelo)
    .width(kotelo.clientWidth).height(kotelo.clientHeight)
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18);
  if (laatat && pallo.globeTileEngineUrl) {
    pallo.globeTileEngineUrl(pallonLaatta).globeTileEngineMaxLevel(PALLO_LAATTATASO_MAX);
  } else {
    pallo.globeImageUrl(PALLO_TEKSTUURI);
  }
  pallo
    .onGlobeClick(({ lat, lng }) => {
      // Nipistys ei ole napautus (ks. sormiseuranta alla).
      if (sormet.nipistys) return;
      const kohta = sukelluskohta(lat, lng);
      if (!kohta) return;
      sulje();
      ui.kartta?.ajaKamera?.({ x: kohta.x, y: kohta.y, leveys: PALLO_SUKELLUSLEVEYS }, { kesto: 1400 });
    });
  // Instanssi talteen mittausta ja savukkeita varten (suljettaessa pois).
  ui.pallonInstanssi = pallo;
  const koti = oma ?? kaupungit.find((k) => k.id === 'lontoo') ?? kaupungit[0];
  if (koti) pallo.pointOfView({ lat: koti.lat, lng: koti.lon, altitude: 1.9 }, 0);
  const ohjaimet = pallo.controls();
  ohjaimet.autoRotate = true;
  ohjaimet.autoRotateSpeed = 0.35;
  /*
   * NIPISTYS EI OLE NAPAUTUS (omistajan bugiraportti 4.9.2026 ilta,
   * uusi iPhone: "Pallo häviää näkyvistä heti, kun koitan zoomata, eli
   * palaa takaisin peruskartalle"). Globe.gl:n napautustunnistus katsoo
   * vain yhden sormen liikettä: kahden sormen nipistyksessä ensimmäinen
   * irtoava sormi on liikkunut alle kynnyksen, ja kirjasto laukaisee
   * onGlobeClickin — peli sukelsi kesken zoomin. Sormia lasketaan
   * itse: kun toinen sormi laskeutuu, ele on nipistys, ja napautus
   * hylätään, kunnes kaikki sormet ovat irronneet ja hetki kulunut
   * (kirjaston oma click tulee pointerupin jälkeen).
   */
  const sormet = { alhaalla: 0, nipistys: false };
  kotelo.addEventListener('pointerdown', () => {
    ohjaimet.autoRotate = false;
    sormet.alhaalla += 1;
    if (sormet.alhaalla > 1) sormet.nipistys = true;
  });
  const irrota = () => {
    sormet.alhaalla = Math.max(0, sormet.alhaalla - 1);
    if (sormet.alhaalla === 0 && sormet.nipistys) setTimeout(() => { sormet.nipistys = false; }, 350);
  };
  kotelo.addEventListener('pointerup', irrota);
  kotelo.addEventListener('pointercancel', irrota);
  /*
   * SORMI PYSYY KARTAN KOHDASSA (omistajan havainto 4.9.2026 ilta:
   * "sormella liikutus ei ole synkassa kartan kanssa. Eli pallo liikkuu
   * eri tahtiin kuin sormi vierittää"). OrbitControls kiertää palloa
   * ruudun pikseleistä vakiokertoimella, ja Globe.gl skaalaa kertoimen
   * korkeudesta vain karkeasti (0,3 × korkeus) — pallo karkasi sormen
   * edelle. Kierto tehdään siksi itse Google Earthin tapaan: sormen
   * alla oleva pinnan piste otetaan talteen painalluksessa, ja joka
   * liikkeessä kameraa siirretään täsmälleen sen verran, että sama
   * piste on taas sormen alla (toGlobeCoords + pointOfView). Nipistys
   * ja hiiren rulla jäävät OrbitControlsille (zoom), yhden sormen
   * kierto sille ei. Kertoimen tarkka kaava jää varalle sitä hetkeä
   * varten, kun sormi on pallon ulkopuolella (tahdistaVeto).
   */
  const kamera = pallo.camera();
  const sade = pallo.getGlobeRadius();
  const tahdistaVeto = () => {
    const korkeus = Math.max(0.01, (kamera.position.length() - sade) / sade);
    ohjaimet.rotateSpeed = korkeus * Math.tan((kamera.fov / 2) * (Math.PI / 180)) / Math.PI;
  };
  tahdistaVeto();
  ohjaimet.addEventListener('change', tahdistaVeto);
  ohjaimet.enableRotate = false;
  let tartunta = null; // pinnan piste sormen alla painalluksessa
  const sormenKohta = (e) => {
    const r = kotelo.getBoundingClientRect();
    return pallo.toGlobeCoords(e.clientX - r.left, e.clientY - r.top);
  };
  kotelo.addEventListener('pointerdown', (e) => {
    tartunta = sormet.alhaalla === 1 ? sormenKohta(e) : null;
  });
  /*
   * LIIKE JATKUU SORMEN IRROTTUA (omistaja 5.9.2026: "Pallossa saisi olla
   * Google earth vieritys joka ei pääty heti kun sormi päästää irti").
   * Vedon aikana mitataan kulmanopeus (astetta/ms) viimeisten liikkeiden
   * keskiarvona; irrotuksen jälkeen pallo jatkaa samaan suuntaan ja
   * hidastuu eksponentiaalisesti (kitka), kunnes nopeus on alle
   * kynnyksen. Uusi kosketus pysäyttää liu'un heti. Reduced motion:
   * ei liukua.
   */
  const VAUHTI_KITKA = 0.0028; // 1/ms: nopeus puolittuu n. 250 ms:ssa
  const VAUHTI_KYNNYS = 0.0006; // astetta/ms
  const vauhti = { lat: 0, lng: 0, aika: 0, raf: 0 };
  ui.pallonVauhti = vauhti; // mittausta varten (savukkeet)
  const pysaytaLiuku = () => { if (vauhti.raf) cancelAnimationFrame(vauhti.raf); vauhti.raf = 0; };
  const liu = (edellinen) => {
    const nyt = performance.now();
    const dt = Math.min(50, nyt - edellinen);
    const pov = pallo.pointOfView();
    pallo.pointOfView({
      lat: Math.max(-89.5, Math.min(89.5, pov.lat + vauhti.lat * dt)),
      lng: pov.lng + vauhti.lng * dt,
      altitude: pov.altitude,
    }, 0);
    const vaimennus = Math.exp(-VAUHTI_KITKA * dt);
    vauhti.lat *= vaimennus; vauhti.lng *= vaimennus;
    if (Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) vauhti.raf = requestAnimationFrame(() => liu(nyt));
    else vauhti.raf = 0;
  };
  kotelo.addEventListener('pointerdown', () => { pysaytaLiuku(); vauhti.lat = 0; vauhti.lng = 0; });
  kotelo.addEventListener('pointermove', (e) => {
    if (!tartunta || sormet.alhaalla !== 1) return;
    const nyt = sormenKohta(e);
    if (!nyt) return;
    const pov = pallo.pointOfView();
    let dLng = nyt.lng - tartunta.lng;
    if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
    const dLat = nyt.lat - tartunta.lat;
    pallo.pointOfView({
      lat: Math.max(-89.5, Math.min(89.5, pov.lat - dLat)),
      lng: pov.lng - dLng,
      altitude: pov.altitude,
    }, 0);
    // Nopeus: liukuva keskiarvo, jotta yksittäinen nykäys ei määrää liukua.
    const aika = performance.now();
    const dt = Math.max(1, aika - (vauhti.aika || aika));
    if (vauhti.aika) {
      vauhti.lat = vauhti.lat * 0.6 + (-dLat / dt) * 0.4;
      vauhti.lng = vauhti.lng * 0.6 + (-dLng / dt) * 0.4;
    }
    vauhti.aika = aika;
  });
  const paasta = () => {
    tartunta = null;
    const seisahtunut = performance.now() - vauhti.aika > 150; // sormi pysähtyi ennen irrotusta
    if (!ui.reducedMotion && !seisahtunut && Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) {
      pysaytaLiuku();
      vauhti.raf = requestAnimationFrame(() => liu(performance.now()));
    }
    vauhti.aika = 0;
  };
  kotelo.addEventListener('pointerup', paasta);
  kotelo.addEventListener('pointercancel', paasta);
  const vanhaKuuntelija = ui.pallonKuuntelija;
  ui.pallonKuuntelija = () => { pysaytaLiuku(); vanhaKuuntelija?.(); };
  const mitoita = () => pallo.width(kotelo.clientWidth).height(kotelo.clientHeight);
  window.addEventListener('resize', mitoita);
  const vanha = ui.pallonKuuntelija;
  ui.pallonKuuntelija = () => { vanha?.(); window.removeEventListener('resize', mitoita); pallo._destructor?.(); };
  tila.textContent = '';
  tila.hidden = true;
  return true;
}
