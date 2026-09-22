/*
 * LEPOPIIRTO — PIIRRÄ VAIN, KUN JOKIN MUUTTUI (sulavuuskatsaus 22.9.2026
 * kohta 18; omistajan periaatepäätös Fablen kautta 22.9.2026).
 *
 * Pallo piirsi 60 kehystä sekunnissa myös täysin levossa: koko
 * koukkuketju (laattakerros, nimiöt, vektorit) ja koko täyttö joka
 * kehys, vaikka kuva ei muuttunut. Se on lämpöä ja akkua — ja ele alkaa
 * lämpimällä laitteella, jonka kello on jo laskettu. Karttapallo.md 15.5
 * hylkäsi "silmukan pysäytyksen levossa" jäätymisriskin takia; tässä
 * silmukka ei pysähdy vaan PIIRTO ohitetaan, ja varmistava syke
 * (LEPOPIIRTO_SYKE_MS, 4 fps) piirtää aina — unohtunut muutoslähde
 * näkyy enintään 250 ms:n viiveenä, ei jäätymisenä (Mapbox
 * triggerRepaint, deck.gl).
 *
 * MITEN. `renderer.render` kääritään. Kehys piirretään, jos
 *   1. kameran maailmamatriisi, projektio, piirtopuskurin koko tai
 *      pikselisuhde muuttui (verrataan edelliseen piirtoon — kattaa
 *      eleet, liu'ut, ajot, tweenit ja resizen ilman ilmoituksia);
 *   2. joku ilmoitti tarpeen: `tarvitaan(ms)` pitää piirron päällä ms:n
 *      ajan (häiveet: laattakerros, vektorit, nimiöt) tai vain seuraavan
 *      kehyksen (laatta scenessä, nimiöt likaiset, kerman maski);
 *   3. este on päällä (`esteet()`: linssi, lento, iso animaatio — vanha
 *      käytös kokonaan, koska niiden animaatiot eivät ilmoita);
 *   4. hidas animaatio käy (`hitaat()`: hehkupisteen syke levossa) ja
 *      edellisestä piirrosta on LEPOPIIRTO_HIDAS_MS (15 fps riittää
 *      2,4 s:n sinille);
 *   5. sykkeen aika on täynnä.
 * Kirjaston tick (controls.update, hover-säteenjäljitys, tweenit) ja
 * CSS2D-piirto pyörivät ennallaan; scene.onBeforeRender-koukut
 * (laattakerros.paivita, nimiöt, vektorit) ajetaan vain piirretyillä
 * kehyksillä — levossa pääsäiekin lepää.
 *
 * Paluulippu `?koe=levovanha`: piirto joka kehys kuten ennen. Automaatiossa
 * (navigator.webdriver) lepopiirto on pois, ellei `?koe=lepopiirto` — ks.
 * AUTOMAATIOSSA POIS alempana. Savukkeet, jotka kutsuvat renderer.render
 * itse ja lukevat pikseleitä, pakottavat piirron
 * `pallo.__piirto.pakota()`-kutsulla (savuke-laattaohjelmat).
 */

/** Varmistava syke levossa (ms): 4 fps. */
export const LEPOPIIRTO_SYKE_MS = 250;
/** Hitaiden animaatioiden tahti levossa (ms): 15 fps. */
export const LEPOPIIRTO_HIDAS_MS = 66;
/** Piirtoja peräkkäin muutoksen jälkeen: toinen kehys vie CSS2D:n ja häiveen lopun. */
export const LEPOPIIRTO_JALKIKEHYKSIA = 1;

/*
 * AUTOMAATIOSSA POIS, ELLEI PYYDETÄ (`?koe=lepopiirto`). Playwright/CDP:n
 * page.screenshot sommittelee uuden kehyksen, ja WebGL-kangas ilman
 * preserveDrawingBufferia antaa sille TYHJÄN puskurin, jos kehystä ei
 * juuri piirretty (mitattu 22.9.2026: kaappaus 47,38,33 = pelkkä
 * tausta, vaikka laatat olivat scenessä). Näytöllä sommittelija pitää
 * viimeisen kehyksen (Mapbox ja deck.gl piirtävät tarpeen mukaan iOS
 * Safarissa juuri näin), mutta CI:n kaappaussavukkeet mittaisivat
 * tyhjää. Siksi `navigator.webdriver` sammuttaa lepopiirron; mittaus
 * ja lepopiirron oma savuke pyytävät sen lipulla, ja lukevat pikselit
 * readPixelsillä piirron jälkeen, eivät kaappauksella.
 */
export function lepopiirtoKaytossa(haku, nav = globalThis.navigator) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  let kokeet = [];
  try { kokeet = (new URLSearchParams(h).get('koe') ?? '').split(',').map((k) => k.trim()); } catch { kokeet = []; }
  if (kokeet.includes('levovanha')) return false;
  if (kokeet.includes('lepopiirto')) return true;
  return !(nav && nav.webdriver === true);
}

/**
 * Puhdas päätös: piirretäänkö tämä kehys. `tila` on asennuksen sisäinen
 * olio; testattavissa ilman renderöijää.
 */
export function lepopiirtoPaatos(tila, {
  nyt, kameraMuuttui, este = false, hidas = false,
  sykeMs = LEPOPIIRTO_SYKE_MS, hidasMs = LEPOPIIRTO_HIDAS_MS,
}) {
  if (!tila.paalla) return 'pois';
  if (tila.pakko > 0) { tila.pakko -= 1; return 'pakko'; }
  if (este) return 'este';
  if (kameraMuuttui) return 'kamera';
  if (nyt <= tila.tarveAsti) return 'tarve';
  if (tila.jalki > 0) { tila.jalki -= 1; return 'jalki'; }
  if (hidas && nyt - tila.viimePiirto >= hidasMs) return 'hidas';
  if (nyt - tila.viimePiirto >= sykeMs) return 'syke';
  return null;
}

/**
 * Asentaa lepopiirron palloon. Palauttaa purkajan. `pallo.__piirto`
 * saa rajapinnan { tarvitaan(ms), pakota(), tila(), paalla(bool) }.
 *
 * @param {object} pallo Globe.gl-olio (renderer(), scene(), camera())
 * @param {object} p
 * @param {() => boolean} [p.esteet]  linssi, lento, iso animaatio → piirrä aina
 * @param {() => boolean} [p.hitaat]  hidas animaatio käy (hehkupisteen syke)
 * @param {object} [p.ikkuna]
 */
export function asennaLepopiirto(pallo, {
  esteet = () => false, hitaat = () => false, ikkuna = globalThis,
  sykeMs = LEPOPIIRTO_SYKE_MS, hidasMs = LEPOPIIRTO_HIDAS_MS,
} = {}) {
  const renderer = pallo?.renderer?.();
  if (!renderer || typeof renderer.render !== 'function' || renderer.__lepopiirto) return () => {};
  const nyt = () => ikkuna.performance?.now?.() ?? Date.now();
  const tila = {
    paalla: true, pakko: 0, tarveAsti: -Infinity, jalki: 0, viimePiirto: -Infinity,
    piirtoja: 0, ohitettuja: 0, syyt: {},
  };
  // Edellisen piirron kamera: 16 + 16 lukua, puskurin koko ja pikselisuhde.
  const edellinen = new Float64Array(34);
  let ensimmainen = true;
  const kameraMuuttui = (camera) => {
    const m = camera?.matrixWorld?.elements;
    const p = camera?.projectionMatrix?.elements;
    if (!m || !p) return true;
    const gl = renderer.getContext?.();
    const w = gl?.drawingBufferWidth ?? 0;
    const h = gl?.drawingBufferHeight ?? 0;
    let muuttui = ensimmainen;
    for (let i = 0; i < 16; i += 1) {
      if (edellinen[i] !== m[i]) { muuttui = true; edellinen[i] = m[i]; }
      if (edellinen[16 + i] !== p[i]) { muuttui = true; edellinen[16 + i] = p[i]; }
    }
    if (edellinen[32] !== w) { muuttui = true; edellinen[32] = w; }
    if (edellinen[33] !== h) { muuttui = true; edellinen[33] = h; }
    ensimmainen = false;
    return muuttui;
  };
  const alkuperainen = renderer.render;
  renderer.render = function lepopiirtoRender(scene, camera, ...loput) {
    const t = nyt();
    const syy = lepopiirtoPaatos(tila, {
      nyt: t, kameraMuuttui: kameraMuuttui(camera), este: esteet(), hidas: hitaat(), sykeMs, hidasMs,
    });
    if (!syy) { tila.ohitettuja += 1; return undefined; }
    tila.viimePiirto = t;
    tila.piirtoja += 1;
    tila.syyt[syy] = (tila.syyt[syy] ?? 0) + 1;
    // Muutoksen jälkeen vielä yksi kehys: CSS2D ja häiveen viimeinen askel.
    if (syy === 'kamera' || syy === 'tarve') tila.jalki = LEPOPIIRTO_JALKIKEHYKSIA;
    return alkuperainen.call(this, scene, camera, ...loput);
  };
  renderer.__lepopiirto = tila;
  const rajapinta = {
    /** Piirrä seuraava kehys, ja ms:n ajan joka kehys (häiveet). */
    tarvitaan(ms = 0) {
      const asti = nyt() + Math.max(0, Number(ms) || 0);
      if (asti > tila.tarveAsti) tila.tarveAsti = asti;
      if (!(ms > 0)) tila.pakko = Math.max(tila.pakko, 1);
    },
    /** Seuraava render-kutsu piirretään varmasti (savukkeet, jotka lukevat pikseleitä). */
    pakota() { tila.pakko = Math.max(tila.pakko, 1); },
    tila: () => ({ ...tila, syyt: { ...tila.syyt } }),
    paalla(arvo) { tila.paalla = Boolean(arvo); },
  };
  pallo.__piirto = rajapinta;
  return () => {
    if (renderer.render?.name === 'lepopiirtoRender') renderer.render = alkuperainen;
    delete renderer.__lepopiirto;
    if (pallo.__piirto === rajapinta) delete pallo.__piirto;
  };
}
