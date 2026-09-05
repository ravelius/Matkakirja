/*
 * PALLOLAUTA — karttapallo pelin lautana (vaihe 1: perusta ja kytkin).
 *
 * OMISTAJAN LINJAUS 5.9.2026 (Raamattu, KARTTAPALLO ON PELILAUTA,
 * sanatarkasti): *"Voisiko pallon vaihtaa pelin kartaksi suoraan?"* /
 * *"Linssit voi olla vanhalla kartalla."* / *"Kunhan vanha kartta pysyy
 * pois tieltä eikä hidasta ollenkaan uuden kartan toimintaa. Mutta jos
 * pallo ei toimi niin pidetään optio palauttaa se."* Suunnitelma ja
 * vaiheistus: docs/moduulit/karttapallo.md.
 *
 * MITÄ TÄMÄ MODUULI ON. Sama Globe.gl-runko ja samat eleet kuin
 * matkalaukun valikkopallolla (js/pallo.js rakennaPallo,
 * asennaPallonEleet), mutta kuori asuu KARTTARUUDUSSA tasokartan
 * paikalla — ilman tummaa pohjaa ja ilman Sulje-nappia, koska lauta ei
 * ole ikkuna, joka suljetaan. Tasokartta nukkuu sen alla tyhjänä
 * (js/kartta.js lepotila) ja herää linssikartaksi vain siirron tai
 * linssin ajaksi (js/ui.js avaaLinssikartta).
 *
 * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026, täsmennys "ei mitään
 * pinnoitteen päälle"): nimet, nostot ja reitit ovat laatoissa, eikä
 * niitä piirretä pallolle kerroksena. Pallolle piirretään vain PELI —
 * se, mikä vaihtuu pelin edetessä tai ottaa vastaan kosketuksen.
 * Vaiheessa 1 se on: kaupunkipisteet (pointsData; käydyt ja
 * aloituskaupungit erottuvat) ja nykyisen kaupungin nappula
 * (htmlElementsData). Sallitut kerrokset ovat PALLOLAUDAN_KERROKSET, ja
 * tests/pallolauta.test.mjs vartioi, ettei muita synny. Kaupunkien
 * nimet, reitit, kohteet ja nostot tulevat vaiheissa 2–3.
 *
 * KAIKKI LIIKE ANIMOIDAAN (Raamattu): merkkien ilmestyminen ja
 * paikanvaihto 250 ms, kamera-ajot trapetsilla (js/pallolauta/kamera.js);
 * reduced motion pudottaa kaiken nollaan.
 *
 * RENDER-SILMUKKA LEPÄÄ, KUN PALLOA EI KATSOTA (karttapallo.md luku 6):
 * Globe.gl piirtää rAF:lla jatkuvasti ja söisi akkua lehden takana.
 * Kun kaupunkilehti on auki, kuori piilossa (linssikartta) tai sivu
 * taustalla, kutsutaan pauseAnimation; kosketus, kamera-ajo ja
 * datan muutos herättävät.
 */

import {
  PALLO_LAUTA, asennaPallonEleet, laatatSaatavilla, lataaPallokirjasto, pallonKaupungit,
  rakennaPallo,
} from '../pallo.js';
import { kehittajaMaailmaPaalla, kehittajaTilaPaalla } from '../ui-apurit.js';
import { luoPallokamera } from './kamera.js';

/** Sallitut Globe.gl-kerrokset pallolaudalla (vaihe 1). */
export const PALLOLAUDAN_KERROKSET = ['pointsData', 'htmlElementsData'];
/**
 * Kaupunkipisteen säde Globe.gl:n pointRadius-yksiköissä — karttavakio,
 * kasvaa lähennettäessä. Suunnitelma sanoi 0,12°, mutta kirjaston
 * yksikkö on mitatusti isompi kuin aste: 0,12 piirtyi saapumisnäkymässä
 * (leveys 240) ~50 px:n täplänä, 0,03 on ~12 px eli kartan
 * kaupunkipisteen kokoa (savuke-pallolauta, kaappaus pallolauta-sofia).
 */
export const KAUPUNKIPISTEEN_SADE = 0.03;
/** Merkkien ilmestymisen ja paikanvaihdon kesto (ms). */
export const MERKKIEN_SIIRTYMA_MS = 250;
/** Napautuksen osuma ruudulla: lähin kaupunki tämän säteen sisällä (px). */
export const NAPAUTUKSEN_SADE_PX = 44;

/** Pisteen väri: käyty kultaa, aloituskaupunki vaaleaa, muut mustetta. */
export function kaupunkipisteenVari(kaupunki) {
  if (kaupunki.kayty) return '#d9a13b';
  if (kaupunki.alku) return '#b28a4a';
  return '#3a2716';
}

/**
 * Avaa pallolaudan karttaruutuun. Palauttaa lauta-olion, tai null jos
 * kirjasto ei latautunut (ui.js kääntää sen varapolkuun). Kuori ja
 * "Ladataan karttapalloa…" näkyvät heti, jotta ruutu ei ole tyhjä
 * kirjaston latauksen ajan.
 */
export async function avaaPallolauta(ui) {
  if (ui.dead || ui.pallolauta || !ui.mapPane) return null;
  const kuori = document.createElement('div');
  kuori.className = 'pallo-kuori pallolauta';
  kuori.setAttribute('role', 'region');
  kuori.setAttribute('aria-label', 'Karttapallo, pelin lauta');
  kuori.innerHTML = `
    <div class="pallo-kotelo"></div>
    <p class="pallo-tila">Ladataan karttapalloa…</p>`;
  ui.mapPane.appendChild(kuori);
  // Kuori näkyy heti ("esilla" häivyttää sisään kuten valikkopallossa).
  void kuori.getBoundingClientRect();
  kuori.classList.add('esilla');

  let Globe = null;
  try {
    Globe = await lataaPallokirjasto();
  } catch {
    kuori.remove();
    return null;
  }
  const laatat = await laatatSaatavilla();
  if (ui.dead || ui.pallolauta) { kuori.remove(); return null; }

  const kotelo = kuori.querySelector('.pallo-kotelo');
  const tila = kuori.querySelector('.pallo-tila');
  const pallo = rakennaPallo(Globe, kotelo, laatat);
  const eleet = asennaPallonEleet(pallo, kotelo, ui);
  // Lauta ei pyöri itsekseen: se on pelilauta, ei näyteikkuna.
  pallo.controls().autoRotate = false;
  const siirtyma = ui.reducedMotion ? 0 : MERKKIEN_SIIRTYMA_MS;

  /* ---- render-silmukan lepo ---------------------------------------- */
  let tauolla = false;
  const heraa = () => {
    if (!tauolla) return;
    tauolla = false;
    pallo.resumeAnimation?.();
  };
  const lepaa = () => {
    if (tauolla) return;
    tauolla = true;
    pallo.pauseAnimation?.();
  };
  /** Nukkuuko pallo: lehti auki, kuori piilossa tai sivu taustalla. */
  const lepoTarpeen = () => kuori.hidden
    || document.visibilityState === 'hidden'
    || Boolean(ui.arrivalDialog?.open);
  const tahdistaLepo = () => { if (lepoTarpeen()) lepaa(); else heraa(); };
  kotelo.addEventListener('pointerdown', heraa);
  document.addEventListener('visibilitychange', tahdistaLepo);
  // Lehden avaus ja sulku: dialogin open-attribuutti vaihtuu.
  const lehtivahti = ui.arrivalDialog ? new MutationObserver(tahdistaLepo) : null;
  lehtivahti?.observe(ui.arrivalDialog, { attributes: true, attributeFilter: ['open'] });

  /* ---- kamera ------------------------------------------------------ */
  const kamera = luoPallokamera({ pallo, kotelo, ui, lauta: PALLO_LAUTA, heraa });

  /* ---- kaupungit (P) ja nappula (H) ---------------------------------- */
  let kaupungit = [];
  const kaupunkiId = new Map(); // id → pallon kaupunki
  const pack = ui.game.pack;

  /** Laudan kaupunki (x, y, id, name) pallon kaupungista. */
  const laudanKaupunki = (k) => ui.game.board?.cityById?.get(k.id) ?? null;

  /**
   * NAPAUTUS KAUPUNKIIN — sama teko kuin tasokartalla: nykyinen kaupunki
   * avaa kaupunkilehden (ui.avaaTutkinta, omistaja 2.9.: *"Kohdekaupunki
   * avaa aina kaupunkilehden"*), nopanheiton kohde valitsee kohteen
   * (doMove) ja kehittäjän maailmanäkymä hyppää mihin tahansa kaupunkiin
   * (doKehittajaSiirto). Muu kaupunki: kamera sukeltaa sen ylle, jotta
   * pelaaja voi katsoa laattoja. Lehti ei odota kameraa.
   */
  const napautaKaupunki = (k) => {
    if (ui.dead || ui.busy || !k) return false;
    const city = laudanKaupunki(k);
    if (!city) return false;
    heraa();
    const { game } = ui;
    const oma = game.cityOf?.();
    void kamera.ajaKamera({ x: city.x, y: city.y, leveys: kamera.kameranTila()?.leveys }, {});
    if (oma && oma.id === city.id) {
      ui.avaaTutkinta(city);
      return true;
    }
    if (game.phase === 'move' && !game.player?.isBot) {
      const kohde = game.moveOptions?.().find((opt) => opt.city?.id === city.id);
      if (kohde) { ui.doMove(kohde.key); return true; }
    }
    if (kehittajaTilaPaalla() && kehittajaMaailmaPaalla() && !ui.katselu) {
      ui.doKehittajaSiirto(city);
      return true;
    }
    return true;
  };

  /** Lähin kaupunki ruudulla napautuskohdasta (R-osuma, ≥ 44 px). */
  const lahinKaupunki = (lat, lng) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    let paras = null;
    let parasMatka = NAPAUTUKSEN_SADE_PX;
    for (const k of kaupungit) {
      const p = pallo.getScreenCoords(k.lat, k.lon, 0);
      if (!p) continue;
      const d = Math.hypot(p.x - kohta.x, p.y - kohta.y);
      if (d < parasMatka) { parasMatka = d; paras = k; }
    }
    return paras;
  };

  const nappulaSvg = () => {
    const el = document.createElement('div');
    el.className = 'pallolauta-nappula';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-8 -14 16 18');
    svg.setAttribute('width', '32');
    svg.setAttribute('height', '36');
    svg.setAttribute('aria-hidden', 'true');
    el.appendChild(svg);
    // Sama hahmo kuin tasokartalla (js/ui.js pawnShape); liitteet
    // (varjo, vuororengas, liukuvärit) syntyvät tähän pieneen svg:hen.
    if (ui.game.player) ui.pawnShape(svg, ui.game.player, true);
    return el;
  };

  pallo
    .pointsData([])
    .pointLat('lat').pointLng('lon')
    .pointColor(kaupunkipisteenVari)
    .pointAltitude(0.003)
    .pointRadius(KAUPUNKIPISTEEN_SADE)
    .pointResolution(16)
    .pointsMerge(false)
    .pointsTransitionDuration(siirtyma)
    .onPointClick((k) => { if (!eleet.sormet.nipistys) napautaKaupunki(k); })
    .onGlobeClick(({ lat, lng }) => {
      // Nipistys ei ole napautus (js/pallo.js asennaPallonEleet); muuten
      // lähin kaupunki 44 px:n sisällä saa napautuksen — pisteet ovat
      // karttavakio, joten ne ovat pienet kaukaa katsottuna.
      if (eleet.sormet.nipistys) return;
      const k = lahinKaupunki(lat, lng);
      if (k) napautaKaupunki(k);
    })
    .htmlElementsData([])
    .htmlLat('lat').htmlLng('lng')
    .htmlAltitude(0.004)
    .htmlElement(nappulaSvg)
    .htmlTransitionDuration(siirtyma);
  // Nappula pallon takana piiloon (CSS2D ei itse leikkaa horisonttiin).
  pallo.htmlElementVisibilityModifier?.((el, nakyy) => { el.style.opacity = nakyy ? '1' : '0'; });

  /** Merkit pelitilasta: käydyt kaupungit ja nykyinen sijainti. */
  let merkkiAvain = null;
  const paivita = () => {
    if (ui.dead) return;
    const { game } = ui;
    const kaydyt = game.world?.visited ?? new Set();
    const pos = game.player?.pos;
    const oma = pos?.type === 'city' ? pos.city : null;
    const avain = `${[...kaydyt].sort().join(',')}|${oma ?? ''}`;
    if (avain === merkkiAvain) return;
    merkkiAvain = avain;
    heraa();
    kaupungit = pallonKaupungit(pack, kaydyt);
    kaupunkiId.clear();
    for (const k of kaupungit) kaupunkiId.set(k.id, k);
    pallo.pointsData(kaupungit);
    const koti = oma ? kaupunkiId.get(oma) : null;
    pallo.htmlElementsData(koti ? [{ id: 'nappula', lat: koti.lat, lng: koti.lon }] : []);
  };

  /* ---- mitat, näkyvyys ja purku -------------------------------------- */
  const mitoita = () => pallo.width(kotelo.clientWidth).height(kotelo.clientHeight);
  const kokovahti = new ResizeObserver(mitoita);
  kokovahti.observe(kotelo);

  /*
   * "PALAA PALLOLLE" linssikartan kulmaan (vaihe 1): tasokartta herää
   * siirron ja linssin ajaksi, ja tästä pääsee takaisin ilman siirtoa.
   * Kesken matkan nappi ei tee mitään (ui.suljeLinssikartta kieltäytyy).
   */
  const palaa = document.createElement('button');
  palaa.type = 'button';
  palaa.className = 'linssikartta-palaa';
  palaa.textContent = 'Palaa pallolle';
  palaa.addEventListener('click', () => ui.suljeLinssikartta());
  ui.mapPane.appendChild(palaa);

  const lauta = {
    kuori,
    pallo,
    kamera,
    paivita,
    napautaKaupunki: (id) => napautaKaupunki(kaupunkiId.get(id)),
    kaupunki: (id) => kaupunkiId.get(id) ?? null,
    paalla: () => !kuori.hidden,
    nayta: () => { kuori.hidden = false; mitoita(); tahdistaLepo(); },
    piilota: () => { kuori.hidden = true; tahdistaLepo(); },
    pura: () => {
      kokovahti.disconnect();
      lehtivahti?.disconnect();
      document.removeEventListener('visibilitychange', tahdistaLepo);
      kamera.pysaytaKameraAjo();
      eleet.pura();
      pallo._destructor?.();
      kuori.remove();
      palaa.remove();
      if (ui.pallonInstanssi === pallo) ui.pallonInstanssi = null;
    },
  };
  // Instanssi talteen mittausta ja savukkeita varten (sama kenttä kuin
  // valikkopallolla).
  ui.pallonInstanssi = pallo;
  paivita();
  tila.textContent = '';
  tila.hidden = true;
  return lauta;
}
