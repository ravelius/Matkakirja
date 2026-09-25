/*
 * KAMERAKALLISTUS — VAIHE 1, KOE (omistajan tilaus 23.9.2026 klo 09.35
 * Fablen kautta; suunnitelma docs/raportit/kamerakallistus-suunnitelma-
 * 20260923.md). Kevyt kallistus (≤ 30°) ja orbit tehokeinona, ei
 * pelaajan vapaana ohjauksena. Päällä vain `?koe=kallistus`-lipulla tai
 * kehittäjäkytkimellä localStorage `matkakirja-kallistus` = '1'.
 *
 * ── MEKANISMI: VIRTUAALINEN KAMERA ────────────────────────────────
 *
 * Peli puhuu kolmikolla pointOfView { lat, lng, altitude } ja olettaa,
 * että kamera katsoo pallon keskipisteeseen (js/pallo.js KAMERA PYSYY
 * SÄTEELLÄ). Kallistuksen ajaksi `pallo.pointOfView` kääritään:
 *
 *   - getter palauttaa VIRTUAALISEN kameran: lat/lng = katsepiste P
 *     (ruudun keskellä), altitude = kameran etäisyys P:stä säteinä ja
 *     `kallistus` = { kulma, suunta, raja }. Eleet, kamera-ajot, liuku ja
 *     ladonta jatkavat kuten ennen; laattakerros ja ruutuprojektio
 *     (js/pallolaatat.js KAMERAKALLISTUS) lukevat kallistuksen kentästä.
 *   - setter kirjoittaa virtuaalisen kameran ja asettaa todellisen:
 *     silmä C = P + korkeus·o (o kallistettu normaali), katse P:hen,
 *     ylös-vektori kallistetusta kehyksestä.
 *
 * OrbitControlsin `update` ohitetaan kallistuksen ajaksi: se laskisi
 * etäisyysrajat (lauta.js tahdistaZoomirajat kirjoittaa ne pallon
 * keskipisteestä) kohteesta P ja vetäisi kameran pois. Suoristuksessa
 * `update`, ylös-vektori ja alkuperäinen pointOfView palautetaan, ja
 * kamera asetetaan virtuaalisen pov:n kohdalle — kulma 0 on täsmälleen
 * nykyinen kamera.
 *
 * ── MITÄ PIILOTETAAN (suunnitelman taulukko) ──────────────────────
 *
 * Kotelo saa luokan `pallolauta-kallistettu`: ruutuun ankkuroidut kortit
 * piiloon (css/pallolauta.css) ja ruudun yläosaan paperiusva, joka peittää
 * horisontin rajauksen (`raja`). GL- ja CSS2D-nimiöt jäävät: ne
 * projisoidaan todellisella kameralla. Lepoladonta ei aja kallistuksen
 * aikana (`kaynnissa()` → lauta.js eleKaynnissa), joten sovittelun
 * lukot pitävät.
 *
 * SYÖTE SUORISTAA: pointerdown tai rulla → suoristus 250 ms:ssa.
 * Reduced motion: ei kallistusta lainkaan.
 *
 * ── PYSYVÄ KALLISTUS (valikon kytkin, Fable 23.9.2026) ─────────────
 *
 * Omistaja ei nähnyt esittelyä: se ajaa vain maan saapumisessa, ja
 * testitila "Suoraan kartalle" ohittaa sen. Valikon Kartta-osion kytkin
 * "Kallistus" (localStorage `matkakirja-kallistus` = '1', osoitteessa
 * `?koe=kallistuspysyva`) pitää kallistuksen päällä myös vedossa ja
 * zoomissa, jotta tuntuman voi arvioida laitteella. Kulma
 * KALLISTUS_PYSYVA_KULMA, vertailuun `?kallistuskulma=30`
 * (iPhone-mittaus 20° vs 30°). Erot esittelyyn:
 *
 *   - syöte ei suorista; eleet (js/pallo.js pallonSyoteUpdate) ajetaan
 *     kuten ennen, vain kirjaston oma update ohitetaan lipulla
 *     `ohjaimet.__kirjastoOhi` — veto lukee sormen kohdan kallistetulla
 *     osumalla ja nipistys ankkuroi kallistetun kameran kautta;
 *   - kortteja ei piiloteta (ei `pallolauta-kallistettu`-luokkaa) ja
 *     ladonta ajaa: nimiöt projisoidaan todellisella kameralla
 *     (getScreenCoords), joten ele-este on vain kulman muuttuessa;
 *   - kirjaston oma tween (ms > 0) suoristaa hetkeksi ja kulma palaa
 *     sen jälkeen; esittelyä ei ajeta. Ei oletus.
 */
import { kameranKehys, pinnanRuutupiste } from '../pallolaatat.js';

/** Kulman yläraja (°). */
export const KALLISTUS_MAX = 30;
/*
 * Horisontin rajaus: kulmaetäisyys P:stä = kerroin × korkeus (rad).
 * Mitattu 23.9.2026 (WebKit 390 px, Ranska, tasot 6–8, 30°): kerroin 1,1
 * kaksinkertaisti näkyvät laatat tasolla 7 (24 → 48), 0,8 antoi +46 %,
 * 0,6 pitää ne ≤ 1,3 × kallistamaton (24 → 24, taso 8 12 → 15).
 */
export const KALLISTUS_RAJA_KERROIN = 0.6;
/** Usvan pehmeä alareuna ruudun korkeuden osuutena. */
export const USVAN_LIUKU = 0.12;
/** Syötteen jälkeinen suoristus (ms). */
export const KALLISTUS_SUORISTUS_MS = 250;
/** Valikon kytkin (Kartta → Kallistus): '1' = pysyvä kallistus. */
export const KALLISTUS_AVAIN = 'matkakirja-kallistus';
/** Pysyvän kallistuksen kulma (°), Fable 23.9.2026: 20–25°. */
export const KALLISTUS_PYSYVA_KULMA = 22;
/** Pysyvä kallistus palaa kirjaston tweenin jälkeen tämän viiveen päästä (ms). */
export const KALLISTUS_PALUU_MS = 150;

/**
 * Kallistuksen tila: 'pysyva' (kytkin tai `?koe=kallistuspysyva`),
 * 'esittely' (`?koe=kallistus`, vaihe 1) tai null.
 */
export function kallistusTila(kokeet, ikkuna = globalThis) {
  if (kokeet?.has?.('kallistuspysyva')) return 'pysyva';
  try { if (ikkuna.localStorage?.getItem(KALLISTUS_AVAIN) === '1') return 'pysyva'; } catch { /* ei muistia */ }
  return kokeet?.has?.('kallistus') ? 'esittely' : null;
}

/** Onko kallistus asennettava (kumpi tahansa tila). */
export function kallistusKaytossa(kokeet, ikkuna = globalThis) {
  return kallistusTila(kokeet, ikkuna) !== null;
}

/** Pysyvän kallistuksen kulma: `?kallistuskulma=` (5…KALLISTUS_MAX) tai oletus. */
export function pysyvaKallistuskulma(ikkuna = globalThis) {
  let arvo = NaN;
  try { arvo = Number(new URLSearchParams(ikkuna.location?.search ?? '').get('kallistuskulma')); } catch { arvo = NaN; }
  return Number.isFinite(arvo) && arvo >= 5 ? Math.min(KALLISTUS_MAX, arvo) : KALLISTUS_PYSYVA_KULMA;
}

const pehmea = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
const rajaa = (k) => Math.max(0, Math.min(KALLISTUS_MAX, Number(k) || 0));

/**
 * Asenna kallistus laudalle. Palauttaa ohjaimen tai null (koe pois).
 *
 * @param {object} p
 * @param {object} p.pallo    globe.gl-instanssi
 * @param {HTMLElement} p.kotelo
 * @param {HTMLElement} [p.kuori]  laudan kuori (piilotusluokka)
 * @param {object} [p.ui]     reducedMotion
 * @param {boolean} [p.pysyva]  pysyvä kallistus (valikon kytkin)
 * @param {number} [p.pysyvaKulma]
 */
export function asennaKallistus({
  pallo, kotelo, kuori = null, ui = null, ikkuna = globalThis, pysyva = false, pysyvaKulma = KALLISTUS_PYSYVA_KULMA,
}) {
  if (!pallo?.pointOfView || !pallo.camera || !pallo.controls) return null;
  const alkuperainen = pallo.pointOfView;
  const kamera = pallo.camera();
  const ohjaimet = pallo.controls();
  const alkuperainenUpdate = ohjaimet.update;
  const ylosAlussa = kamera.up.clone();
  let virtuaalinen = null; // { lat, lng, altitude } kallistuksen aikana
  let kulma = 0;
  let suunta = 0;
  let rajaKerroin = KALLISTUS_RAJA_KERROIN;
  let animaatio = 0; // rAF-kahva
  let paalla = false;
  const kuuntelijat = new Set();

  /*
   * USVA: paperin värinen liuku ruudun yläosassa, vahvuus kulman mukaan.
   * Peittää horisontin rajauksen (laatat ja nimiöt `raja`n takana) ja
   * karkean pohjan kaukana. Kotelon päällimmäinen, ei ota osumia.
   */
  const usva = ikkuna.document?.createElement?.('div') ?? null;
  if (usva) {
    usva.className = 'pallolauta-usva';
    usva.setAttribute('aria-hidden', 'true');
    kotelo?.appendChild(usva);
  }
  const luokat = (paalla) => {
    // Pysyvässä tilassa kortit jäävät: ne ankkuroidaan todellisella kameralla.
    if (pysyva) return;
    for (const el of [kotelo, kuori, ikkuna.document?.body]) el?.classList?.toggle('pallolauta-kallistettu', paalla);
  };
  /*
   * ELEET JÄÄVÄT PYSYVÄSSÄ TILASSA: js/pallo.js pallonSyoteUpdate ajaa
   * vedon ja nipistyksen ja ohittaa kirjaston updaten lipulla. Ilman
   * sitä käärettä (esim. testit) update ohitetaan kokonaan kuten ennen.
   */
  const lipulla = () => pysyva && alkuperainenUpdate?.name === 'pallonSyoteUpdate';
  const sade = () => pallo.getGlobeRadius?.() ?? 100;
  const kallistusKentta = () => ({
    kulma, suunta, raja: rajaKerroin * Math.max(0.005, virtuaalinen?.altitude ?? 0),
  });

  /*
   * USVAN RAJA RUUDULLA: horisonttirajan piste katseen suunnassa P:stä
   * projisoidaan ruudulle, ja usva on täysi sen yläpuolella ja häipyy
   * USVAN_LIUKU:n matkalla alas. Näin laattojen ja nimiöiden rajaus
   * (`raja`) ei näy reunana.
   */
  const asetaUsva = (R) => {
    const W = kotelo?.clientWidth ?? 0;
    const H = kotelo?.clientHeight ?? 0;
    if (!(W > 0 && H > 0) || !(kulma > 0.05)) { usva.style.opacity = '0'; return; }
    const kk = kallistusKentta();
    const la = virtuaalinen.lat * (Math.PI / 180);
    const b = suunta * (Math.PI / 180);
    // Piste kulmaetäisyydellä `raja` katseen suuntaan (suunta, pohjoisesta myötäpäivään).
    const d = kk.raja;
    const lat2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(b));
    const lng2 = virtuaalinen.lng * (Math.PI / 180) + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(la), Math.cos(d) - Math.sin(la) * Math.sin(lat2));
    const p = pinnanRuutupiste({ ...virtuaalinen, kallistus: { ...kk, raja: Infinity } }, lat2 * (180 / Math.PI), lng2 * (180 / Math.PI), {
      fov: kamera.fov, kuvasuhde: kamera.aspect || W / H, sade: R,
    });
    // Ruudun y (px ylhäältä) rajalle; ellei rajaa näy, usva jää ruudun yläpuolelle.
    const y = p ? ((1 - p.sy) / 2) * H : 0;
    const liuku = Math.max(24, H * USVAN_LIUKU);
    const alaReuna = Math.max(0, Math.min(H, y + liuku));
    usva.style.height = `${alaReuna}px`;
    usva.style.setProperty('--usva-taysi', `${Math.max(0, (y / Math.max(1, alaReuna)) * 100)}%`);
    usva.style.opacity = String(Math.min(1, kulma / 8));
  };

  /** Todellinen kamera virtuaalisesta. */
  const aseta = () => {
    if (!virtuaalinen) return;
    const R = sade();
    const a = kameranKehys(virtuaalinen, kulma, suunta);
    kamera.position.set(a.silma.x * R, a.silma.y * R, a.silma.z * R);
    kamera.up.set(a.ylos.x, a.ylos.y, a.ylos.z);
    ohjaimet.target.set(a.n.x * R, a.n.y * R, a.n.z * R);
    kamera.lookAt(ohjaimet.target);
    kamera.updateMatrixWorld();
    // Pinnanlukijalle (js/pallolaatat.js pinnanPiste): sormen ja zoomin ankkuri.
    kamera.__kallistusPov = { ...virtuaalinen, kallistus: kallistusKentta() };
    if (usva) asetaUsva(R);
    for (const f of kuuntelijat) f();
  };

  const kaare = function kallistettuPointOfView(pov, ms = 0) {
    if (!paalla) return alkuperainen.call(this ?? pallo, pov, ms);
    if (!pov || (pov.lat === undefined && pov.lng === undefined && pov.altitude === undefined)) {
      return { ...virtuaalinen, kallistus: kallistusKentta() };
    }
    const uusi = { ...virtuaalinen };
    for (const k of ['lat', 'lng', 'altitude']) if (pov[k] !== undefined) uusi[k] = +pov[k];
    // Vaiheessa 1 kamera-ajot ovat pelin omia rAF-ajoja (ms 0); kirjaston
    // oma tween kallistuksen aikana olisi uusi polku, joten se suoristaa.
    if (ms > 0) {
      animoi({ kulma: 0, kesto: 0 });
      palaaMyohemmin(ms + KALLISTUS_PALUU_MS);
      return alkuperainen.call(pallo, pov, ms);
    }
    virtuaalinen = uusi;
    aseta();
    return pallo;
  };

  const kytke = () => {
    if (paalla) return;
    const pov = alkuperainen.call(pallo);
    virtuaalinen = { lat: pov.lat, lng: pov.lng, altitude: pov.altitude };
    paalla = true;
    pallo.pointOfView = kaare;
    if (lipulla()) ohjaimet.__kirjastoOhi = true;
    else ohjaimet.update = () => false;
    luokat(true);
  };
  const irrota = () => {
    if (!paalla) return;
    const v = virtuaalinen;
    paalla = false;
    pallo.pointOfView = alkuperainen;
    ohjaimet.update = alkuperainenUpdate;
    delete ohjaimet.__kirjastoOhi;
    kamera.up.copy(ylosAlussa);
    delete kamera.__kallistusPov;
    kulma = 0;
    luokat(false);
    if (usva) usva.style.opacity = '0';
    // Kamera suoraan alas virtuaalisen pov:n kohdalle (asettaa myös kohteen keskipisteeseen).
    if (v) alkuperainen.call(pallo, v, 0);
    virtuaalinen = null;
    for (const f of kuuntelijat) f();
  };

  let kesken = null; // keskeytyvän animaation lupauksen ratkaisija
  const pysayta = () => {
    if (animaatio) ikkuna.cancelAnimationFrame?.(animaatio);
    animaatio = 0;
    const r = kesken; kesken = null; r?.(false);
  };

  /** Animoi kulma ja suunta tavoitteeseen; `kaari` lisää orbitin (± astetta). */
  const animoi = ({ kulma: k1 = kulma, suunta: s1 = suunta, kesto = 800, kaari = 0 } = {}) => new Promise((valmis) => {
    pysayta();
    if (ui?.reducedMotion) { valmis(false); return; }
    const k0 = kulma;
    const s0 = suunta;
    const kohde = rajaa(k1);
    if (kohde > 0) kytke();
    if (!paalla) { valmis(false); return; }
    const alku = ikkuna.performance?.now?.() ?? Date.now();
    kesken = valmis;
    const askel = () => {
      const t = Math.min(1, ((ikkuna.performance?.now?.() ?? Date.now()) - alku) / Math.max(1, kesto));
      const e = pehmea(t);
      kulma = k0 + (kohde - k0) * e;
      suunta = s0 + (s1 - s0) * e + (kaari ? kaari * Math.sin(t * Math.PI * 2) : 0);
      aseta();
      if (t < 1) { animaatio = ikkuna.requestAnimationFrame(askel); return; }
      animaatio = 0;
      kesken = null;
      if (kohde <= 0) irrota();
      valmis(true);
    };
    if (!(kesto > 0)) {
      kesken = null;
      kulma = kohde; suunta = s1; aseta();
      if (kohde <= 0) irrota();
      valmis(true);
      return;
    }
    animaatio = ikkuna.requestAnimationFrame(askel);
  });

  const suorista = ({ kesto = 600 } = {}) => {
    if (!paalla) return Promise.resolve(false);
    return animoi({ kulma: 0, kesto });
  };

  /*
   * MAAN ESITTELY (saavu): kallistus, hidas orbit ±kaari ja paluu
   * ylhäältä-näkymään. Syöte keskeyttää (suoristus 250 ms).
   */
  const esittele = async ({ kulma: k = 25, kaari = 20, kesto = 6000 } = {}) => {
    if (ui?.reducedMotion || pysyva) return false;
    // Keskeytetty vaihe (syöte, uusi kallistus) ratkeaa false: esittely väistyy.
    if (!await animoi({ kulma: k, suunta: 0, kesto: 900 })) return false;
    if (!await animoi({ kulma: k, suunta: 0, kesto, kaari })) return false;
    return suorista({ kesto: 900 });
  };

  /*
   * ESITTELY KAMERA-AJON JÄLKEEN (lauta.js saavu): odottaa, että ajo alkaa
   * (≤ 1 s) ja päättyy (≤ 8 s), ja esittelee sitten. Syöte välissä peruu.
   */
  const esitteleAjonJalkeen = async (ajossa) => {
    let peruttu = false;
    const peru = () => { peruttu = true; };
    kotelo?.addEventListener('pointerdown', peru, { capture: true, once: true });
    const odota = (ms) => new Promise((v) => ikkuna.setTimeout?.(v, ms) ?? v());
    const alku = ikkuna.performance?.now?.() ?? Date.now();
    const kulunut = () => (ikkuna.performance?.now?.() ?? Date.now()) - alku;
    while (!peruttu && !ajossa?.() && kulunut() < 1000) await odota(50);
    while (!peruttu && ajossa?.() && kulunut() < 8000) await odota(50);
    kotelo?.removeEventListener('pointerdown', peru, { capture: true });
    return peruttu ? false : esittele();
  };

  const syote = () => { if (paalla && !pysyva) suorista({ kesto: KALLISTUS_SUORISTUS_MS }); };

  /*
   * PYSYVÄ KULMA TAKAISIN: kirjaston tweenin jälkeen (ks. kaare) ja
   * asennuksen jälkeen, kun kamera on asettunut. Ajastin on yksi; uusi
   * pyyntö siirtää sitä.
   */
  let paluu = 0;
  function palaaMyohemmin(ms) {
    if (!pysyva || ui?.reducedMotion) return;
    if (paluu) ikkuna.clearTimeout?.(paluu);
    paluu = ikkuna.setTimeout?.(() => {
      paluu = 0;
      if (!paalla && !animaatio) animoi({ kulma: pysyvaKulma, suunta: 0, kesto: 700 });
    }, ms) ?? 0;
  }
  palaaMyohemmin(1200);
  kotelo?.addEventListener('pointerdown', syote, { capture: true });
  kotelo?.addEventListener('wheel', syote, { capture: true, passive: true });

  return {
    /**
     * Onko kallistus ele (lauta.js: lepoladonta odottaa). Pysyvässä
     * tilassa vain kulman muuttuessa: vakaa kallistus ei ole ele.
     */
    kaynnissa: () => (pysyva ? paalla && animaatio !== 0 : paalla),
    tila: () => ({ paalla, kulma, suunta, pysyva, virtuaalinen: virtuaalinen ? { ...virtuaalinen } : null }),
    /** Kehittäjälle: kallista({ kulma, suunta, kesto }). */
    kallista: ({ kulma: k = 20, suunta: s = suunta, kesto = 800, raja } = {}) => {
      // Kehittäjälle ja mittarille: horisonttirajan kerroin (× korkeus, rad).
      if (Number.isFinite(raja) && raja > 0) rajaKerroin = raja;
      return animoi({ kulma: k, suunta: s, kesto });
    },
    orbit: ({ kaari = 20, kesto = 6000 } = {}) => (paalla ? animoi({ kulma, suunta, kesto, kaari }) : Promise.resolve(false)),
    suorista,
    esittele,
    esitteleAjonJalkeen,
    /** Kuuntelija jokaiselle kameran asetukselle (lauta: ladonta, usva). */
    kuuntele: (f) => { kuuntelijat.add(f); return () => kuuntelijat.delete(f); },
    pura: () => {
      if (paluu) ikkuna.clearTimeout?.(paluu);
      paluu = 0;
      pysayta();
      irrota();
      kotelo?.removeEventListener('pointerdown', syote, { capture: true });
      kotelo?.removeEventListener('wheel', syote, { capture: true });
      usva?.remove();
    },
  };
}
