/*
 * LEPOPIIRTO — LEPÄÄ KIRJASTON TICKIN TASOLLA, KUN MIKÄÄN EI MUUTTUNUT
 * (sulavuuskatsaus 22.9.2026 kohta 18; omistajan periaatepäätös Fablen
 * kautta 22.9.2026).
 *
 * Pallo piirsi 60 kehystä sekunnissa myös täysin levossa: koko
 * koukkuketju (laattakerros, nimiöt, vektorit) ja koko täyttö joka
 * kehys, vaikka kuva ei muuttunut. Se on lämpöä ja akkua — ja ele alkaa
 * lämpimällä laitteella, jonka kello on jo laskettu. Karttapallo.md 15.5
 * hylkäsi "silmukan pysäytyksen levossa" jäätymisriskin takia; tässä
 * lepo ei ole jäätymistä, koska varmistava syke (LEPOPIIRTO_SYKE_MS,
 * 4 fps) piirtää aina — unohtunut muutoslähde näkyy enintään 250 ms:n
 * viiveenä (Mapbox triggerRepaint, deck.gl).
 *
 * ── OMISTAJAN VIKA 22.9.2026: "KARTTA VÄLKKYY KUIN STROBOVALO" ──────
 *
 * v2101–v2104 ohitti `renderer.render`-kutsun ja jätti kirjaston tickin
 * pyörimään. Se VÄLKKYI iPhonella: kartta katosi kokonaan ja palasi
 * 15 kertaa sekunnissa (hehkupisteen syke), eli ohitetut kehykset
 * sommiteltiin TYHJÄNÄ kankaana. Sama oire oli nähty Playwrightin
 * kaappauksissa ja tulkittu automaation erikoisuudeksi; se oli oire,
 * ei erikoisuus.
 *
 * MITATTU 22.9.2026 (WebKit, kaappaus sommittelijan kautta — PNG:n koko
 * erottaa tyhjän kankaan kartasta; tools/savukkeet/savuke-lepopiirto.mjs
 * väite V5 vartioi tätä):
 *
 *   | toteutus                                     | kaappausten kokoero |
 *   | -------------------------------------------- | ------------------- |
 *   | piirto joka kehys (`?koe=levovanha`)          | 1,12 ×              |
 *   | render-kutsun ohitus (v2101–v2104)            | 24,0 ×  ← VÄLKE     |
 *   | render-kutsun ohitus + preserveDrawingBuffer  | 18,4 ×  ← VÄLKE     |
 *   | TICKIN ohitus (tämä)                          | 1,00 ×              |
 *
 * `preserveDrawingBuffer: true` EI siis korjaa tätä (eikä sitä kannata
 * maksaa joka kehyksellä): puskurin säilyttäminen ei auta, koska WebKit
 * ei anna sommittelijalle kankaan edellistä kuvaa, kun sivu animoi eikä
 * kangasta piirretty tällä kehyksellä. Ainoa toimiva tapa on olla
 * KOSKEMATTA kankaaseen ohitetulla kehyksellä — ja kirjaston tick
 * koskee siihen myös ilman renderiä (`controls.update`, CSS2D-piirto,
 * katsesäde). Siksi ohitetaan koko tick.
 *
 * MITEN. Oma rAF on kello. Joka kehyksellä päätetään, tarvitaanko
 * piirto:
 *   1. kameran maailmamatriisi, projektio, piirtopuskurin koko tai
 *      pikselisuhde muuttui (verrataan edelliseen piirtoon — kattaa
 *      eleet, liu'ut, ajot ja resizen ilman ilmoituksia; laudan
 *      kamera-ajot kirjoittavat `pointOfView(pov, 0)` omasta
 *      rAF:staan, eivät kirjaston tweenistä, joten ne näkyvät tässä);
 *   2. joku ilmoitti tarpeen: `tarvitaan(ms)` pitää piirron päällä ms:n
 *      ajan (häiveet: laattakerros, vektorit, nimiöt) tai vain seuraavan
 *      kehyksen (laatta scenessä, nimiöt likaiset, kerman maski);
 *   3. este on päällä (`esteet()`: linssi, lento, iso animaatio — vanha
 *      käytös kokonaan, koska niiden animaatiot eivät ilmoita ja koska
 *      linssin avausajo on kirjaston OMA tween, joka pysähtyisi levossa);
 *   4. hidas animaatio käy (`hitaat()`: hehkupisteen syke levossa) ja
 *      edellisestä piirrosta on LEPOPIIRTO_HIDAS_MS (15 fps riittää
 *      2,4 s:n sinille);
 *   5. sykkeen aika on täynnä.
 * Tarvitaan → `resumeAnimation()` ajaa kirjaston syklin HETI ja jättää
 * silmukan pyörimään 60 Hz:llä; ei tarvita → `pauseAnimation()`
 * pysäyttää sen. Levossa kirjaston tickiä ei ajeta lainkaan: ei
 * renderiä, ei CSS2D-kirjoituksia, ei katsesädettä — ja kangas jää
 * sommittelijalle sellaisena kuin se viimeksi piirrettiin.
 *
 * OLETUS ON PÄÄLLÄ, KUN OMISTAJA ON NÄHNYT LEVON LAITTEELLA. Ketju meni
 * näin: v2105 sammutti lepopiirron hätäkorjauksena (välke), tickin
 * ohitus korjasi syyn ja v2107 tarjosi sen lipulla `?koe=lepopiirto`,
 * ja omistaja katsoi sen oikealla iPhonella 22.9.2026 (lepo 15 s,
 * panorointi, lepo): *"ei välky, vakaa"*. Vasta se käänsi oletuksen —
 * WebKit-toisto yksin ei riittänyt, koska edellinen vartija petti
 * täsmälleen tässä kohdassa. Paluulippu `?koe=levovanha`.
 *
 * UNI ON ERI ASIA KUIN LEPO. Kun palloa ei katsota (lehti auki, kuori
 * piilossa, sivu taustalla), lauta.js nukuttaa sen: `uni(true)` lopettaa
 * myös tämän kellon. Lepo on hereillä olevan pallon säästö, uni on
 * katsomattoman pallon säästö; molemmat pysäyttävät saman kirjaston
 * silmukan, joten omistaja on YKSI (tämä moduuli) eikä kaksi.
 */

/** Varmistava syke levossa (ms): 4 fps. */
export const LEPOPIIRTO_SYKE_MS = 250;
/** Hitaiden animaatioiden tahti levossa (ms): 15 fps. */
export const LEPOPIIRTO_HIDAS_MS = 66;
/** Piirtoja peräkkäin muutoksen jälkeen: toinen kehys vie CSS2D:n ja häiveen lopun. */
export const LEPOPIIRTO_JALKIKEHYKSIA = 1;

/**
 * Onko lepopiirto käytössä: kyllä, ellei `?koe=levovanha`.
 *
 * EI WEBDRIVER-POIKKEUSTA. v2101–v2104 sammutti lepopiirron erikseen
 * automaatiossa (`navigator.webdriver`), koska kaappaukset saivat tyhjän
 * kankaan. Juuri se poikkeus esti vartijaa näkemästä välkkeen: CI mittasi
 * eri polkua kuin pelaaja ajoi. Poikkeusta ei ole — automaatio ajaa
 * samaa polkua kuin pelaaja, ja vartija savuke-lepopiirto V5 näkee
 * levon kankaan sommittelijan kautta.
 */
export function lepopiirtoKaytossa(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  let kokeet = [];
  try { kokeet = (new URLSearchParams(h).get('koe') ?? '').split(',').map((k) => k.trim()); } catch { kokeet = []; }
  return !kokeet.includes('levovanha');
}

/**
 * Puhdas päätös: tarvitaanko tällä kehyksellä piirto. `tila` on
 * asennuksen sisäinen olio; testattavissa ilman renderöijää.
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
 * Asentaa lepopiirron palloon. Palauttaa purkajan. `pallo.__piirto` saa
 * rajapinnan { tarvitaan(ms), pakota(), tila(), paalla(bool), uni(bool) }.
 *
 * @param {object} pallo Globe.gl-olio (renderer(), camera(), pause/resumeAnimation())
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
    piirtoja: 0, ohitettuja: 0, syyt: {}, unessa: false,
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
  /*
   * TARKKAILIJA, EI PORTTI. `renderer.render` kääritään vain kirjaamaan
   * piirron hetki — sykkeen ja hitaiden tahti mitataan siitä, ei
   * päätöksestä, joten myös savukkeen oma piirto siirtää sykettä.
   * Portti on kirjaston silmukassa, ei täällä.
   */
  const alkuperainenRender = renderer.render;
  renderer.render = function lepopiirtoRender(...a) {
    tila.viimePiirto = nyt();
    tila.piirtoja += 1;
    return alkuperainenRender.apply(this, a);
  };
  renderer.__lepopiirto = tila;

  /*
   * SILMUKAN TILA LUETAAN PIIRROISTA, EI VAIN OMASTA LIPUSTA. Kirjaston
   * `pauseAnimation` käy joka kutsulla läpi kerroslistansa, joten sitä
   * ei kannata kutsua 60 kertaa sekunnissa levossa — lippu riittää.
   * Mutta silmukan voi herättää MUUKIN kuin tämä moduuli
   * (satelliitti-avaruus.js varmistaKehykset pakottaa kehyksen
   * pause+resume-parilla), ja silloin pelkkä lippu jäisi jälkeen ja
   * jättäisi silmukan pyörimään 60 Hz:llä loputtomiin. Odottamaton
   * piirto kertoo herätyksestä: lippu korjataan siitä.
   */
  let kirjastoKay = true;
  let nahtyjaPiirtoja = 0;
  let kehys = 0;
  const kayntiin = () => { if (kirjastoKay) return; kirjastoKay = true; pallo.resumeAnimation?.(); };
  const seis = () => { if (!kirjastoKay) return; kirjastoKay = false; pallo.pauseAnimation?.(); };
  const askel = () => {
    kehys = ikkuna.requestAnimationFrame(askel);
    const t = nyt();
    if (tila.piirtoja !== nahtyjaPiirtoja) { kirjastoKay = true; nahtyjaPiirtoja = tila.piirtoja; }
    const syy = lepopiirtoPaatos(tila, {
      nyt: t,
      kameraMuuttui: kameraMuuttui(pallo.camera?.()),
      este: esteet(),
      hidas: hitaat(),
      sykeMs,
      hidasMs,
    });
    if (!syy) { tila.ohitettuja += 1; seis(); return; }
    tila.syyt[syy] = (tila.syyt[syy] ?? 0) + 1;
    // Muutoksen jälkeen vielä yksi kehys: CSS2D ja häiveen viimeinen askel.
    if (syy === 'kamera' || syy === 'tarve') tila.jalki = LEPOPIIRTO_JALKIKEHYKSIA;
    kayntiin();
  };
  const kelloKayntiin = () => { if (!kehys) kehys = ikkuna.requestAnimationFrame(askel); };
  const kelloSeis = () => { if (kehys) { ikkuna.cancelAnimationFrame?.(kehys); kehys = 0; } };
  kelloKayntiin();

  const rajapinta = {
    /** Piirrä seuraava kehys, ja ms:n ajan joka kehys (häiveet). */
    tarvitaan(ms = 0) {
      const asti = nyt() + Math.max(0, Number(ms) || 0);
      if (asti > tila.tarveAsti) tila.tarveAsti = asti;
      if (!(ms > 0)) tila.pakko = Math.max(tila.pakko, 1);
    },
    /** Seuraava kehys piirretään varmasti (savukkeet, jotka lukevat pikseleitä). */
    pakota() { tila.pakko = Math.max(tila.pakko, 1); if (!tila.unessa) kayntiin(); },
    tila: () => ({ ...tila, syyt: { ...tila.syyt }, kirjastoKay }),
    paalla(arvo) { tila.paalla = Boolean(arvo); if (arvo && !tila.unessa) kayntiin(); },
    /**
     * Uni: palloa ei katsota (lauta.js lepaa/heraa). Kello seisoo eikä
     * kirjastoa herätetä ennen kuin uni loppuu.
     */
    uni(arvo) {
      const uusi = Boolean(arvo);
      if (uusi === tila.unessa) return;
      tila.unessa = uusi;
      if (uusi) { kelloSeis(); seis(); return; }
      tila.pakko = Math.max(tila.pakko, 1);
      kelloKayntiin();
      kayntiin();
    },
  };
  pallo.__piirto = rajapinta;
  return () => {
    kelloSeis();
    if (renderer.render?.name === 'lepopiirtoRender') renderer.render = alkuperainenRender;
    delete renderer.__lepopiirto;
    if (pallo.__piirto === rajapinta) delete pallo.__piirto;
    // Purku jättää silmukan pyörimään: kukaan muu ei enää herättäisi sitä.
    kayntiin();
  };
}
