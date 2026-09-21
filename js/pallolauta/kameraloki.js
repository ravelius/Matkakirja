/*
 * KAMERALOKI — KORKEUDEN HYPPYJEN DIAGNOSTIIKKA (Fable 21.9.2026,
 * omistajan havainto v1983: liftauksen nopan jälkeen kamera hyppäsi
 * maailmakuvaan; satunnainen, ei toistu Playwrightilla).
 *
 * Kun kameran korkeus (pointOfView().altitude) muuttuu yli
 * KAMERALOKI_KYNNYS-kertaiseksi yhden kehyksen välillä, kirjataan
 * aikaleima, edellinen ja uusi korkeus, LAUKAISIJA ja pelitila
 * (kaupunki, vaihe). Laukaisija päätellään viimeisimmästä
 * `pointOfView`-kirjoituksesta tai `ajaKamera`-kutsusta ja sen
 * kutsupinosta (kolme riviä): sovitaSiirtokohteet, käyttäjän ele,
 * linssi, saapuminen tai muu kutsupolku. Jos hyppyä ei edeltänyt
 * yhtään ohjelmallista kirjoitusta, se tuli kirjaston omista
 * ohjaimista (OrbitControls: nipistys, rulla) tai sen rajoista.
 *
 * MISTÄ LOKIN LUKEE:
 *   - kehittäjätilassa (localStorage matkakirja-kehittaja = 1) jokainen
 *     hyppy tulostuu konsoliin `[kameraloki]`-rivinä;
 *   - aina, myös pelaajan laitteella näkymättömästi, 20 viimeistä
 *     merkintää on rengaspuskurissa localStorage-avaimessa
 *     KAMERALOKI_AVAIN (`matkakirja-kameraloki`), JSON-taulukko;
 *   - pelin sisältä: window.matkakirja.ui.pallolauta.kameraloki().
 *
 * Ei näy pelaajalle: ei käyttöliittymää, ei ääntä, ei verkkoa.
 */
import { kehittajaTilaPaalla } from '../ui-apurit.js';

export const KAMERALOKI_AVAIN = 'matkakirja-kameraloki';
/** Korkeuden kerroin yhden kehyksen välillä, josta merkintä syntyy. */
export const KAMERALOKI_KYNNYS = 3;
/** Rengaspuskurin pituus. */
export const KAMERALOKI_PITUUS = 20;
/** Kuinka tuore ohjelmallinen kirjoitus lasketaan hypyn laukaisijaksi (ms). */
export const KAMERALOKI_TUOREUS_MS = 400;

/**
 * Laukaisijan nimi kutsupinosta — puhdas funktio (tests).
 *
 * @param {string} pino kutsupinon rivit yhtenä merkkijonona
 * @returns {string}
 */
export function kameralokiLaukaisija(pino) {
  const p = String(pino ?? '');
  if (/sovitaSiirtokohteet/.test(p)) return 'sovitaSiirtokohteet';
  if (/ennakoiSiirtoZoomi|animatePawn|siirtokoreografia|saatto/i.test(p)) return 'siirron ennakkozoomi / saatto';
  if (/saavu|saapumis|palaaMaanRajaukseen/i.test(p)) return 'saapuminen';
  if (/linssi/i.test(p)) return 'linssi';
  if (/napautaKaupunki|liuska/i.test(p)) return 'liuskan avausajo';
  if (/avaus\.js|avauslento|aloituslento/i.test(p)) return 'avauslento';
  if (/kattoPuristus|tahdistaZoomirajat|asetaZoomirajat/i.test(p)) return 'zoomikaton puristus';
  if (/pointerdown|pointermove|wheel|touch|nipistys|ele/i.test(p)) return 'käyttäjän ele';
  return 'muu kutsupolku';
}

/** Kolme kutsupinon riviä ilman tätä moduulia ja kääreitä. */
function pinonRivit(virhe) {
  const rivit = String(virhe?.stack ?? '').split('\n')
    .map((r) => r.trim())
    .filter((r) => r && !/^Error/.test(r) && !/kameraloki\.js/.test(r));
  return rivit.slice(0, 3).join(' < ');
}

/**
 * Kytkee kameralokin palloon: kääriii `pallo.pointOfView`-kirjoitukset
 * ja `kamera.ajaKamera`-kutsut laukaisijan kirjaamiseksi ja tarkkailee
 * korkeutta kehyskoukussa.
 *
 * @param {object} p
 * @param {object} p.pallo        Globe.gl-olio
 * @param {object} [p.kamera]     luoPallokamera-olio (ajaKamera kääritään)
 * @param {object} [p.ui]         pelin ui (kaupunki, vaihe)
 * @param {(pallo, kotelo, kuuntelija) => () => void} p.kytkeKehys
 * @param {Element} [p.kotelo]
 * @returns {{ merkinnat: () => Array, pura: () => void, kirjaa: (syy: string) => void }}
 */
export function luoKameraloki({
  pallo, kamera = null, ui = null, kytkeKehys, kotelo = null,
}) {
  let viimeisinKirjoitus = null; // { hetki, laukaisija, pino }
  let edellinen = NaN;
  const nyt = () => (globalThis.performance?.now?.() ?? Date.now());

  const kirjaa = (syy, pino = '') => {
    viimeisinKirjoitus = { hetki: nyt(), laukaisija: syy, pino };
  };

  // pointOfView-kirjoitukset: vain kutsut argumentein ovat kirjoituksia.
  const alkuperainenPov = pallo?.pointOfView;
  if (typeof alkuperainenPov === 'function') {
    pallo.pointOfView = function kameralokiPointOfView(...args) {
      if (args.length && args[0] && typeof args[0] === 'object') {
        const pino = pinonRivit(new Error());
        kirjaa(kameralokiLaukaisija(pino), pino);
      }
      return alkuperainenPov.apply(this, args);
    };
  }
  // Ajo kirjaa aloittajansa: ajon omat kehyskirjoitukset tulevat
  // requestAnimationFramesta, jossa aloittajaa ei enää näy pinossa.
  const alkuperainenAjo = kamera?.ajaKamera;
  if (typeof alkuperainenAjo === 'function') {
    kamera.ajaKamera = function kameralokiAjaKamera(...args) {
      const pino = pinonRivit(new Error());
      kirjaa(`ajo: ${kameralokiLaukaisija(pino)}`, pino);
      return alkuperainenAjo.apply(this, args);
    };
  }

  const lue = () => {
    try {
      const t = JSON.parse(localStorage.getItem(KAMERALOKI_AVAIN) ?? '[]');
      return Array.isArray(t) ? t : [];
    } catch { return []; }
  };
  const talleta = (merkinta) => {
    try {
      const t = lue();
      t.push(merkinta);
      while (t.length > KAMERALOKI_PITUUS) t.shift();
      localStorage.setItem(KAMERALOKI_AVAIN, JSON.stringify(t));
    } catch { /* yksityinen tila tai täysi muisti: loki jää pois */ }
  };

  const kehys = (mitat) => {
    const korkeus = mitat?.pov?.altitude;
    if (!Number.isFinite(korkeus) || !(korkeus > 0)) return;
    if (!Number.isFinite(edellinen) || !(edellinen > 0)) { edellinen = korkeus; return; }
    const kerroin = korkeus / edellinen;
    const ennen = edellinen;
    edellinen = korkeus;
    if (kerroin < KAMERALOKI_KYNNYS && kerroin > 1 / KAMERALOKI_KYNNYS) return;
    const tuore = viimeisinKirjoitus && nyt() - viimeisinKirjoitus.hetki <= KAMERALOKI_TUOREUS_MS
      ? viimeisinKirjoitus : null;
    const merkinta = {
      aika: new Date().toISOString(),
      edellinen: Number(ennen.toFixed(4)),
      uusi: Number(korkeus.toFixed(4)),
      kerroin: Number(kerroin.toFixed(2)),
      laukaisija: tuore ? tuore.laukaisija : 'käyttäjän ele tai kirjasto (ei pointOfView-kirjoitusta)',
      pino: tuore?.pino ?? '',
      kaupunki: ui?.game?.cityOf?.()?.id ?? null,
      vaihe: ui?.game?.phase ?? null,
      liikkeessa: Boolean(ui?.siirtoKaynnissa),
    };
    talleta(merkinta);
    if (kehittajaTilaPaalla()) console.info('[kameraloki] korkeus hyppäsi', merkinta);
  };
  const pura = typeof kytkeKehys === 'function' ? kytkeKehys(pallo, kotelo, kehys) : () => {};

  return {
    merkinnat: lue,
    kirjaa,
    pura: () => {
      pura?.();
      if (typeof alkuperainenPov === 'function') pallo.pointOfView = alkuperainenPov;
      if (typeof alkuperainenAjo === 'function') kamera.ajaKamera = alkuperainenAjo;
    },
  };
}
