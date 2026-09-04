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
 * hampurilaisvalikosta (#pallo-btn, js/main.js → ui.avaaPallo).
 */

import { laudaltaAsteiksi } from './fokusmitat.js';

const R2 = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
/** Globe.gl:n UMD-paketti pelin ämpärissä (workflow tee-pallotekstuuri vie sen). */
export const PALLO_KIRJASTO = `${R2}vendor/globe.gl-2.35.0.min.js`;
/** Pinnoitteen versio = sen laattapyramidin versio, josta se käännettiin. */
export const PALLO_TEKSTUURIVERSIO = '2026-09-03a';
export const PALLO_TEKSTUURI = `${R2}julisteet/pallo/${PALLO_TEKSTUURIVERSIO}/tekstuuri.jpg`;
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

/** Laudan reitit kaarina: molempien päiden on oltava pallolla. */
export function pallonReitit(pack, kaupungit) {
  const k = new Map(kaupungit.map((c) => [c.id, c]));
  return (pack?.edges ?? []).map((e) => ({ a: k.get(e.a), b: k.get(e.b) })).filter((r) => r.a && r.b);
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
  kuori.innerHTML = `
    <div class="pallo-ylarivi">
      <div class="pallo-otsikko">Karttapallo <span class="pallo-selite">Pyöritä ja napauta kaupunkia</span></div>
      <button type="button" class="pallo-sulje" aria-label="Sulje" title="Sulje">✕</button>
    </div>
    <div class="pallo-kotelo"></div>
    <p class="pallo-tila">Ladataan palloa…</p>`;
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
  const kaydyt = ui.game.world?.visited ?? new Set();
  const kaupungit = pallonKaupungit(pack, kaydyt);
  const reitit = pallonReitit(pack, kaupungit);
  const pos = ui.game.player?.pos;
  const oma = pos?.type === 'city' ? kaupungit.find((k) => k.id === pos.city) : null;
  const pallo = Globe()(kotelo)
    .width(kotelo.clientWidth).height(kotelo.clientHeight)
    .backgroundColor('rgba(0,0,0,0)')
    .globeImageUrl(PALLO_TEKSTUURI)
    .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18)
    .pointsData(kaupungit).pointLat('lat').pointLng('lon').pointAltitude(0.004)
    .pointRadius((k) => (k.alku || k.kayty ? 0.55 : 0.32))
    .pointColor((k) => (k.kayty ? '#ffd27a' : k.alku ? '#e6b04a' : '#b07a2a'))
    .pointLabel((k) => k.n)
    .labelsData(kaupungit.filter((k) => k.alku || k.kayty)).labelLat('lat').labelLng('lon').labelText('n')
    .labelSize(1.1).labelDotRadius(0).labelColor(() => '#f3e4bf').labelResolution(2)
    .arcsData(reitit)
    .arcStartLat((r) => r.a.lat).arcStartLng((r) => r.a.lon).arcEndLat((r) => r.b.lat).arcEndLng((r) => r.b.lon)
    .arcColor(() => 'rgba(120, 80, 30, 0.55)').arcStroke(0.25).arcAltitudeAutoScale(0.15)
    .onPointClick((k) => {
      sulje();
      ui.kartta?.ajaKamera?.({ x: k.x, y: k.y, leveys: PALLO_SUKELLUSLEVEYS }, { kesto: 1400 });
    });
  if (oma) {
    // Pelaajan paikka: sykkivä rengas kuten kartan oma nappula.
    pallo.ringsData([oma]).ringLat('lat').ringLng('lon').ringColor(() => (t) => `rgba(255, 210, 122, ${1 - t})`)
      .ringMaxRadius(3).ringPropagationSpeed(1.2).ringRepeatPeriod(1400);
  }
  const koti = oma ?? kaupungit.find((k) => k.id === 'lontoo') ?? kaupungit[0];
  if (koti) pallo.pointOfView({ lat: koti.lat, lng: koti.lon, altitude: 1.9 }, 0);
  const ohjaimet = pallo.controls();
  ohjaimet.autoRotate = true;
  ohjaimet.autoRotateSpeed = 0.35;
  kotelo.addEventListener('pointerdown', () => { ohjaimet.autoRotate = false; }, { once: true });
  const mitoita = () => pallo.width(kotelo.clientWidth).height(kotelo.clientHeight);
  window.addEventListener('resize', mitoita);
  const vanha = ui.pallonKuuntelija;
  ui.pallonKuuntelija = () => { vanha?.(); window.removeEventListener('resize', mitoita); pallo._destructor?.(); };
  tila.textContent = '';
  tila.hidden = true;
  return true;
}
