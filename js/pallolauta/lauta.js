/*
 * PALLOLAUTA — karttapallo pelin lautana (vaihe 1: perusta ja kytkin;
 * vaihe 2: siirrot pallolla; vaihe 3: merkit — nimet ja nostot).
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
 * (js/kartta.js lepotila) ja herää linssikartaksi vain linssin ajaksi
 * (js/ui.js avaaLinssikartta).
 *
 * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026, täsmennys "ei mitään
 * pinnoitteen päälle"): reittiverkko, rajat ja maasto ovat laatoissa,
 * eikä niitä piirretä pallolle kerroksena. Pallolle piirretään vain PELI
 * — se, mikä vaihtuu pelin edetessä tai ottaa vastaan kosketuksen.
 * Vaiheen 3 jälkeen se on: kaupunkipisteet, askelhelmet ja aihevalot
 * (pointsData), nappula, nopanheiton kohteet, KAUPUNKIEN NIMET, elävät
 * nostot, eläintäyt ja kohtaamispiste (htmlElementsData,
 * js/pallolauta/{merkit,nimet,nostot}.js), naapurireitit (pathsData) ja
 * lentokaaret (arcsData). Sallitut kerrokset ovat PALLOLAUDAN_KERROKSET,
 * ja tests/pallolauta.test.mjs vartioi, ettei muita synny. Kaupunkien
 * nimet ovat pelin merkkejä omistajan kortin vastauksella 5.9.2026
 * (*"kaupunkien nimet pallolaudalla ELAVINA tekstielementteina
 * laattojen paalla"*).
 *
 * PISTE VAIN NIMEN KANSSA (omistaja 31.8.2026): pistekerroksessa on vain
 * ne kaupungit, jotka saivat nimen ladonnassa (js/pallolauta/nimet.js),
 * pelaajan oma kaupunki (nappula nimeää sen) ja kehittäjän
 * maailmanäkymässä kaikki (silloin jokainen kaupunki on napautettava
 * hyppy, ui.maailmanakyma).
 *
 * LADONTA LEVOSSA. Nimet ja nostot ladotaan uudelleen vasta kun kamera
 * on pysähtynyt (js/pallo.js LAATU_LEPOVIIVE_MS, sama hetki kuin laadun
 * palautus) — ei joka kehys eikä joka eleessä. Liikkeessä merkit
 * seuraavat pistettään kirjaston CSS2D-kerroksessa.
 *
 * NAPAUTUS ON YKSI OSUMATESTI (R-malli, karttapallo.md riski 3): pallon
 * oma onGlobeClick/onPointClick antaa asteet, ja lähin merkki 44 px:n
 * sisällä voittaa — nopanheiton kohde ennen muita (se on kehotus
 * toimia), sitten kaupungit, nostot (elävät ja poltetut), eläintäyt ja
 * kohtaamispiste samassa kilpailussa (fokusniput sääntö 9: lähin
 * keskipiste voittaa). Sulkeva napautus ei avaa mitään uutta (omistaja
 * 31.8.2026): jos kortti oli auki sormen laskeutuessa, napautus vain
 * sulkee sen.
 *
 * KAIKKI LIIKE ANIMOIDAAN (Raamattu): merkkien ilmestyminen,
 * poistuminen ja paikanvaihto 250 ms, kamera-ajot trapetsilla
 * (js/pallolauta/kamera.js); reduced motion pudottaa kaiken nollaan.
 *
 * RENDER-SILMUKKA LEPÄÄ, KUN PALLOA EI KATSOTA (karttapallo.md luku 6):
 * Globe.gl piirtää rAF:lla jatkuvasti ja söisi akkua lehden takana.
 * Kun kaupunkilehti on auki, kuori piilossa (linssikartta) tai sivu
 * taustalla, kutsutaan pauseAnimation; kosketus, kamera-ajo ja
 * datan muutos herättävät.
 */

import {
  LAATU_LEPOVIIVE_MS, PALLO_LAUTA, asennaPallonEleet, laatatSaatavilla, lataaPallokirjasto,
  pallonKaupungit, pallonNostoOnPoltettu, rakennaPallo,
} from '../pallo.js';
import { asemoiFokuskohde } from '../fokuskohteet.js';
import { laudaltaAsteiksi } from '../fokusmitat.js';
import { pixelOf, posKey } from '../rules.js';
import { kehittajaMaailmaPaalla, kehittajaTilaPaalla } from '../ui-apurit.js';
import { PALLOKAMERAN_AJO_MS, luoPallokamera } from './kamera.js';
import { MERKIN_KORKEUS, luoMerkit } from './merkit.js';
import { NIMIEN_KATTO, luoNimet } from './nimet.js';
import {
  NOSTOJEN_KATTO, VALON_KORKEUS, VALON_SADE, luoNostot,
} from './nostot.js';
import {
  HELMEN_VARI, REITTIHELMEN_KORKEUS, REITTIHELMEN_SADE, luoReitit,
} from './reitit.js';
import { luoNappulanKuljettaja } from './siirto.js';

/**
 * Sallitut Globe.gl-kerrokset pallolaudalla (vaihe 3): pisteet
 * (kaupungit, askelhelmet, aihevalot), html-merkit (nappula, kohteet,
 * nimet, elävät nostot, kohtaamispiste), polut (naapurireitit) ja
 * kaaret (lennot). Ei labelsData-nimiä, ei renkaita, ei monikulmioita —
 * kartta on laatoissa. Vaihe 3 ei tarvinnut yhtään uutta kerrosta.
 */
export const PALLOLAUDAN_KERROKSET = ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData'];
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
/** Napautuksen osuma ruudulla: lähin kaupunki tai kohde tämän säteen sisällä (px). */
export const NAPAUTUKSEN_SADE_PX = 44;
/**
 * CSS2D-elementtejä pallolla enintään (karttapallo.md luku 6: nimet 40,
 * kohteet 12, elävät nostot 40 → priorisoidaan). Pelin merkit ja nostot
 * ensin, nimikatto laskee, kun nostoja on.
 */
export const HTML_MERKKIEN_KATTO = 60;
/** Ladonnan lepoviive: sama hetki kuin laadun palautus (js/pallo.js). */
export const LADONNAN_LEPOVIIVE_MS = LAATU_LEPOVIIVE_MS;

/** Pisteen väri: käyty kultaa, aloituskaupunki vaaleaa, muut mustetta. */
export function kaupunkipisteenVari(kaupunki) {
  if (kaupunki.kayty) return '#d9a13b';
  if (kaupunki.alku) return '#b28a4a';
  return '#3a2716';
}

/** Laudan kohta (x, y) asteiksi ({ lat, lon }) — yksi totuus on lauta. */
export function pallonAsteet(kohta) {
  if (!kohta || !Number.isFinite(kohta.x) || !Number.isFinite(kohta.y)) return null;
  return laudaltaAsteiksi(PALLO_LAUTA, kohta.x, kohta.y);
}

/** Avoinna oleva kelluva kortti (nielu: sulkeva napautus ei avaa uutta). */
const KORTTIVALITSIN = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup';

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

  /* ---- ruutupisteet ------------------------------------------------ */
  /**
   * Onko pinnan piste kameran puolella palloa? CSS2D ja getScreenCoords
   * projisoivat myös takapuolen pisteet ruudulle; tämä erottaa ne.
   */
  const edessa = (lat, lng) => {
    const p = pallo.getCoords(lat, lng, 0);
    const k = pallo.camera().position;
    return (k.x - p.x) * p.x + (k.y - p.y) * p.y + (k.z - p.z) * p.z > 0;
  };
  /**
   * Pinnan piste kotelon pikseleinä, tai null jos se on pallon takana
   * tai `vara` pikseliä ruudun ulkopuolella.
   */
  const ruudulla = (lat, lng, vara = 0) => {
    if (!edessa(lat, lng)) return null;
    const p = pallo.getScreenCoords(lat, lng, 0);
    if (!p || !Number.isFinite(p.x)) return null;
    if (p.x < -vara || p.y < -vara || p.x > kotelo.clientWidth + vara || p.y > kotelo.clientHeight + vara) return null;
    return p;
  };
  /** Pinnan piste RUUDUN (client) pikseleinä korttien ankkuriksi. */
  const ankkuri = (lat, lng) => () => {
    const p = pallo.getScreenCoords(lat, lng, MERKIN_KORKEUS);
    const r = kotelo.getBoundingClientRect();
    return p ? { x: r.left + p.x, y: r.top + p.y } : null;
  };

  /* ---- kerrokset: kaupungit + helmet + valot (P), merkit (H), reitit (T, A) --- */
  let kaupungit = [];
  const kaupunkiId = new Map(); // id → pallon kaupunki
  const pack = ui.game.pack;
  const merkit = luoMerkit({
    pallo, ui, siirtyma, asteet: pallonAsteet, kotelo,
  });
  const reitit = luoReitit({ pallo, ui, siirtyma, asteet: pallonAsteet });
  const nimet = luoNimet({
    ui, merkit, asteet: pallonAsteet, ruudulla, kotelo,
  });
  const nostot = luoNostot({
    ui, merkit, asteet: pallonAsteet, ruudulla, onPoltettu: pallonNostoOnPoltettu,
  });

  /** Laudan kaupunki (x, y, id, name) pallon kaupungista. */
  const laudanKaupunki = (k) => ui.game.board?.cityById?.get(k.id) ?? null;
  /** Näkyykö kaupungin piste: nimetty, oma tai kehittäjän maailmanäkymä. */
  const pisteNakyy = (k) => nimet.nimetty(k.id)
    || ui.game.cityOf?.()?.id === k.id
    || Boolean(ui.maailmanakyma?.());

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

  /**
   * NAPAUTUS KOHTEESEEN (vaihe 2): nopanheiton kohde — kaupunki tai
   * askelpiste reitin varrella — valitaan napauttamalla sen merkkiä.
   * Osuma on R-malli (karttapallo.md riski 3): lähin kohde 44 px:n
   * sisällä pallon omasta napautuksesta, ei merkin oma click, jotta
   * doMove kutsutaan täsmälleen kerran.
   */
  const napautaKohde = (kohde) => {
    if (ui.dead || ui.busy || !kohde) return false;
    const { game } = ui;
    if (game.phase !== 'move' || game.player?.isBot) return false;
    heraa();
    ui.doMove(kohde.key);
    return true;
  };

  /** NAPAUTUS NOSTOON (vaihe 3): kortti aukeaa merkin ruutupisteestä. */
  const napautaNosto = (osuma) => {
    if (ui.dead || ui.busy || !osuma) return false;
    heraa();
    osuma.avaa(ankkuri(osuma.lat, osuma.lng));
    return true;
  };

  /** Lähin merkki ruudulla napautuskohdasta (R-osuma, ≥ 44 px). */
  const lahin = (lat, lng, ehdokkaat, latOf, lngOf) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    let paras = null;
    let parasMatka = NAPAUTUKSEN_SADE_PX;
    for (const e of ehdokkaat) {
      const p = pallo.getScreenCoords(latOf(e), lngOf(e), 0);
      if (!p) continue;
      const d = Math.hypot(p.x - kohta.x, p.y - kohta.y);
      if (d < parasMatka) { parasMatka = d; paras = e; }
    }
    return paras;
  };
  const lahinKohde = (lat, lng) => lahin(lat, lng, merkit.kohteet(), (k) => k.lat, (k) => k.lng);
  /**
   * Kaupungit ja nostot SAMASSA kilpailussa (js/fokusniput.js sääntö 9:
   * lähin keskipiste voittaa) — vain näkyvät: nimetty kaupunki, oma
   * kaupunki, ruudulla oleva nosto, eläintäky tai kohtaamispiste.
   */
  const lahinMerkki = (lat, lng) => {
    const ehdokkaat = [];
    for (const k of kaupungit) {
      if (pisteNakyy(k)) ehdokkaat.push({ laji: 'kaupunki', lat: k.lat, lng: k.lon, k });
    }
    for (const o of nostot.osumat()) ehdokkaat.push({ laji: 'nosto', lat: o.lat, lng: o.lng, o });
    return lahin(lat, lng, ehdokkaat, (e) => e.lat, (e) => e.lng);
  };

  /*
   * SULKEVA NAPAUTUS EI AVAA MITÄÄN UUTTA (omistaja 31.8.2026): kortin
   * oma kuuntelija sulkee kortin jo pointerdownissa, ja ilman tätä
   * lippua sama napautus avaisi klikissä seuraavan merkin.
   */
  let korttiOliAuki = false;
  // DOKUMENTIN kaappausvaiheessa ja ennen kortin omaa kuuntelijaa
  // (rekisteröity aiemmin): kortti on vielä DOMissa, kun tämä lukee.
  const korttivahti = (e) => {
    if (!kotelo.contains(e.target)) return;
    korttiOliAuki = Boolean(document.querySelector(KORTTIVALITSIN));
  };
  document.addEventListener('pointerdown', korttivahti, true);

  /** Napautus pallon pintaan: kohde ennen muita (kohde on kehotus toimia). */
  const napautaPintaan = (lat, lng) => {
    if (korttiOliAuki) { korttiOliAuki = false; return; }
    const kohde = lahinKohde(lat, lng);
    if (kohde) { napautaKohde(kohde); return; }
    const voittaja = lahinMerkki(lat, lng);
    if (!voittaja) return;
    if (voittaja.laji === 'kaupunki') napautaKaupunki(voittaja.k);
    else napautaNosto(voittaja.o);
  };

  pallo
    .pointsData([])
    .pointLat('lat').pointLng('lon')
    .pointColor((d) => {
      if (d.laji === 'helmi') return HELMEN_VARI;
      if (d.laji === 'valo') return d.vari;
      return kaupunkipisteenVari(d);
    })
    .pointAltitude((d) => {
      if (d.laji === 'helmi') return REITTIHELMEN_KORKEUS;
      if (d.laji === 'valo') return VALON_KORKEUS;
      return 0.003;
    })
    .pointRadius((d) => {
      if (d.laji === 'helmi') return REITTIHELMEN_SADE;
      if (d.laji === 'valo') return VALON_SADE;
      return KAUPUNKIPISTEEN_SADE;
    })
    .pointResolution(16)
    .pointsMerge(false)
    .pointsTransitionDuration(siirtyma)
    .onPointClick((d) => {
      if (eleet.sormet.nipistys) return;
      // Askelhelmi ja valo ovat koristeita: napautus niistä menee pinnalle.
      if (d.laji === 'helmi' || d.laji === 'valo') napautaPintaan(d.lat, d.lon);
      else if (korttiOliAuki) korttiOliAuki = false;
      else napautaKaupunki(d);
    })
    .onGlobeClick(({ lat, lng }) => {
      // Nipistys ei ole napautus (js/pallo.js asennaPallonEleet); muuten
      // lähin kohde tai merkki 44 px:n sisällä saa napautuksen —
      // pisteet ovat karttavakio, joten ne ovat pienet kaukaa katsottuna.
      if (eleet.sormet.nipistys) return;
      napautaPintaan(lat, lng);
    });

  /* ---- pisteet: nimetyt kaupungit, helmet ja valot ------------------ */
  let pisteAvain = null;
  let helmet = [];
  const paivitaPisteet = () => {
    const nakyvat = kaupungit.filter(pisteNakyy);
    const valot = nostot.valot();
    const avain = [
      nakyvat.map((k) => `${k.id}${k.kayty ? '*' : ''}`).join(','),
      helmet.map((h) => h.id).join(','),
      valot.map((v) => v.id).join(','),
    ].join('|');
    if (avain === pisteAvain) return;
    pisteAvain = avain;
    heraa();
    pallo.pointsData([...valot, ...nakyvat, ...helmet]);
  };

  /* ---- ladonta levossa ---------------------------------------------- */
  let lepoAjastin = 0;
  /**
   * Nostot ensin (niiden laatikot ovat nimien varauksia), nimet sitten
   * budjetilla, joka jää pelin merkkien ja nostojen jälkeen; lopuksi
   * pisteet nimettyjen mukaan ja auki oleva kortti ankkurinsa perään.
   */
  const ladoLevossa = () => {
    lepoAjastin = 0;
    if (ui.dead || kuori.hidden) return null;
    const nakyva = kamera.nakyvaAlue();
    const keskipiste = { x: kotelo.clientWidth / 2, y: kotelo.clientHeight / 2 };
    const pelia = merkit.maara('peli');
    const nostoTulos = nostot.paivita({
      nakyva, keskipiste, katto: Math.min(NOSTOJEN_KATTO, Math.max(0, HTML_MERKKIEN_KATTO - pelia)),
    });
    const katto = Math.min(NIMIEN_KATTO, Math.max(0, HTML_MERKKIEN_KATTO - pelia - nostoTulos.maara));
    const nimiTulos = nimet.lado({ varaukset: nostoTulos.laatikot, pinot: merkit.laatikot('peli'), katto });
    paivitaPisteet();
    if (ui.fokuskohdeAuki?.ankkuri) asemoiFokuskohde(ui);
    return { nostot: nostoTulos, nimet: nimiTulos };
  };
  const pyydaLadonta = () => {
    clearTimeout(lepoAjastin);
    lepoAjastin = setTimeout(ladoLevossa, LADONNAN_LEPOVIIVE_MS);
  };
  // Kamera liikkui (ele, ajo, liuku): ladonta vasta levossa.
  const ohjaimet = pallo.controls();
  ohjaimet.addEventListener('change', pyydaLadonta);
  // Aihevalot: selitteen väripallo vaihtaa bodyn luokan.
  let valoAvain = '';
  const valovahti = new MutationObserver(() => {
    const avain = [...document.body.classList].filter((l) => l.startsWith('valot-')).sort().join(' ');
    if (avain === valoAvain) return;
    valoAvain = avain;
    nostot.paivitaValot();
    paivitaPisteet();
  });
  valovahti.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  // Selitevalikon kappalemäärät pallolta (js/karttavalot.js karttavalotLaskurit).
  ui.karttavaloLaskuri = () => nostot.laskurit();

  /* ---- merkit pelitilasta ------------------------------------------- */
  let merkkiAvain = null;
  /** posKey siitä paikasta, jossa nappula viimeksi NÄHTIIN laudalla. */
  let nappulanPaikka = null;
  const merkitseNappulanPaikka = (pos) => { nappulanPaikka = pos ? posKey(pos) : null; };

  /** Nopanheiton kohteet: sama sääntö kuin drawTargets (siirtovaihe, ei botti). */
  const kohdevalinta = () => {
    const { game } = ui;
    if (game.phase !== 'move' || game.player?.isBot || ui.katselu) return [];
    return (game.moveOptions?.() ?? []).map((opt) => {
      const { x, y } = pixelOf(game.board, opt.pos);
      return { key: opt.key, x, y, city: opt.city ?? null };
    });
  };

  /**
   * Merkit pelitilasta: käydyt kaupungit, askelhelmet, reitit, kohteet
   * ja nappula. Kutsutaan joka piirrossa (ui.paivitaPallolauta) ja
   * reittien vaihtuessa (ui.paivitaMatkareitit); avain karsii turhat.
   * Nimet ja nostot ladotaan perässä levossa (pyydaLadonta).
   */
  const paivita = () => {
    if (ui.dead) return;
    const { game } = ui;
    const kaydyt = game.world?.visited ?? new Set();
    const pos = game.player?.pos ?? null;
    const kohta = pos && game.board ? pixelOf(game.board, pos) : null;
    // Pelaajan id on 0, joten totuusarvo ei kelpaa: null tarkoittaa lepoa.
    const liikkuu = ui.movingPlayerId != null;
    const kohteet = kohdevalinta();
    const valinta = ui.matkareittienValinta();
    const posAvain = pos ? posKey(pos) : '';
    const avain = [
      [...kaydyt].sort().join(','), posAvain, liikkuu ? 'liikkuu' : '',
      kohteet.map((k) => k.key).join(','), valinta.avain, ui.lentoKaari?.b ?? '',
      game.phase, ui.maailmanakyma?.() ? 'maailma' : '',
    ].join('|');
    if (avain === merkkiAvain) return;
    merkkiAvain = avain;
    heraa();
    // Kaupungit kerran; käyntitieto päivitetään SAMOIHIN olioihin, jotta
    // Globe.gl siirtää värin tweenillä eikä luo 261 pistettä uudestaan.
    if (!kaupungit.length) {
      kaupungit = pallonKaupungit(pack, kaydyt);
      kaupunkiId.clear();
      for (const k of kaupungit) kaupunkiId.set(k.id, k);
    } else {
      for (const k of kaupungit) k.kayty = kaydyt.has(k.id);
    }
    helmet = reitit.paivita(valinta);
    merkit.paivita({ nappula: liikkuu ? null : kohta, kohteet });
    paivitaPisteet();
    pyydaLadonta();
    /*
     * KAMERA SEURAA TELEPORTTIA. Siirron kuljettaja kirjaa perillä
     * paikkansa (merkitseNappulanPaikka), joten tavallinen siirto ei
     * osu tähän — kamera jää sinne minne saatto sen vei (omistaja
     * 1.9.2026). Jos paikka vaihtui ILMAN siirtoa (kehittäjäsiirto,
     * tallenteen lataus kesken pelin), kamera sukeltaa perään.
     */
    if (!liikkuu && pos) {
      if (nappulanPaikka !== null && nappulanPaikka !== posAvain) {
        void kamera.kotiin({ kesto: PALLOKAMERAN_AJO_MS });
      }
      nappulanPaikka = posAvain;
    }
  };

  /** Pelin paikan (pos) piste ruudulla (kotelon px) — nopan lähtö. */
  const ruutupiste = (pos) => {
    const kohta = pos && ui.game.board ? pixelOf(ui.game.board, pos) : null;
    const a = pallonAsteet(kohta);
    if (!a) return null;
    return pallo.getScreenCoords(a.lat, a.lon, 0);
  };

  /* ---- noppa kuoreen laudan ajaksi -------------------------------- */
  /*
   * Noppa (js/die.js) asuu tasokartan siirtokuoressa, joka on tämän
   * kuoren alla. Laudan ajaksi sen kerros siirretään tähän kuoreen
   * pallon päälle (paikat ovat ruudun pikseleitä, ks. ui.animateDie) ja
   * palautetaan, kun kuori piilotetaan tai puretaan.
   */
  const noppaKuoreen = () => {
    const kerros = ui.boardDie?.layer;
    if (kerros && kerros.parentElement !== kuori) kuori.appendChild(kerros);
  };
  const noppaTakaisin = () => {
    const kerros = ui.boardDie?.layer;
    const koti = ui.karttaKuori ?? ui.mapPane;
    if (kerros && koti && kerros.parentElement === kuori) koti.appendChild(kerros);
  };

  /* ---- mitat, näkyvyys ja purku -------------------------------------- */
  const mitoita = () => { pallo.width(kotelo.clientWidth).height(kotelo.clientHeight); pyydaLadonta(); };
  const kokovahti = new ResizeObserver(mitoita);
  kokovahti.observe(kotelo);

  /*
   * "PALAA PALLOLLE" linssikartan kulmaan: tasokartta herää linssin
   * ajaksi, ja tästä pääsee takaisin. Kesken siirtoanimaation nappi ei
   * tee mitään (ui.suljeLinssikartta kieltäytyy).
   */
  const palaa = document.createElement('button');
  palaa.type = 'button';
  palaa.className = 'linssikartta-palaa';
  palaa.textContent = 'Palaa pallolle';
  palaa.addEventListener('click', () => ui.suljeLinssikartta());
  ui.mapPane.appendChild(palaa);

  const lauta = {
    kuori,
    kotelo,
    pallo,
    kamera,
    merkit,
    reitit,
    nimet,
    nostot,
    heraa,
    asteet: pallonAsteet,
    paivita,
    ruutupiste,
    ruudulla,
    merkitseNappulanPaikka,
    /** Ladonta heti ilman lepoviivettä (savukkeet ja vartijat). */
    ladoHeti: () => { clearTimeout(lepoAjastin); return ladoLevossa(); },
    /** Siirron kuljettaja (ui.nappulanKuljettaja → js/pallolauta/siirto.js). */
    nappulanKuljettaja: (player, valinnat) => luoNappulanKuljettaja({
      ui, lauta, player, ...valinnat,
    }),
    napautaKaupunki: (id) => napautaKaupunki(kaupunkiId.get(id)),
    napautaKohde: (key) => napautaKohde(merkit.kohteet().find((k) => k.key === key)),
    napautaNosto: (id) => napautaNosto(nostot.osumat().find((o) => o.id === id)),
    kaupunki: (id) => kaupunkiId.get(id) ?? null,
    paalla: () => !kuori.hidden,
    nayta: () => { kuori.hidden = false; mitoita(); noppaKuoreen(); tahdistaLepo(); },
    piilota: () => { kuori.hidden = true; noppaTakaisin(); tahdistaLepo(); },
    pura: () => {
      clearTimeout(lepoAjastin);
      document.removeEventListener('pointerdown', korttivahti, true);
      ohjaimet.removeEventListener('change', pyydaLadonta);
      valovahti.disconnect();
      if (ui.karttavaloLaskuri) delete ui.karttavaloLaskuri;
      kokovahti.disconnect();
      lehtivahti?.disconnect();
      document.removeEventListener('visibilitychange', tahdistaLepo);
      kamera.pysaytaKameraAjo();
      eleet.pura();
      merkit.pura();
      noppaTakaisin();
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
