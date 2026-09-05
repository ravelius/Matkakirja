/*
 * SIVUNKÄÄNTÖ — lehti kääntyy kuin kirja (StPageFlip).
 *
 * OMISTAJAN PÄÄTÖS 5.9.2026 (sanatarkasti "Tee 2. Ensin" =
 * kirjastokartoituksen docs/raportit/valmiit-palikat-2026-09-04.md
 * TOP 6:n kohta 2): matkakirja ja lehti kääntyvät kuin kirja. Raamattu:
 * VALMIIT KIRJASTOT: STPAGEFLIP ENSIN — kirjasto ämpärin vendor/-polusta
 * (ei repoon eikä CDN:stä), laiska lataus ja virhehaara, lisenssi
 * ämpärissä ja lähdesivulla, reduced motion sammuttaa efektin, yhden
 * tiedoston versio jää ilman kirjastoa, paluu vanhaan pinoon on yksi
 * lippu.
 *
 * ── KÄÄNTÖTEATTERI, EI SIVUPINO ────────────────────────────────────
 *
 * Kartoitus oletti, että lehden sivut ovat DOM-sivuja, jotka kirjasto
 * ottaa sellaisenaan. Ne eivät ole: lehdessä on YKSI elävä sivu
 * (#arrival-dialog .dialog-card), joka piirretään uudestaan joka
 * käännöksellä (js/lehti.js naytaTutkiSivu → piirraKategoria ym.), ja
 * kansi on index.html:n kiinteä rakenne neljälläkymmenellä id:llä.
 * Mitattu 5.9.2026: ui.arrivalKategoriaan kirjoittaa 13 kohtaa (lehti
 * 8, maalehti 4, ui 1), ja kaiutin, hampurilainen, visa ja
 * etukäteispuskuri elävät kaikki tuon yhden sivun mukana. Koko lehden
 * muuttaminen monisivuiseksi DOM:iksi olisi kaikkien näiden remontti —
 * ja rikkoisi juuri sen, mitä omistaja käski varjella (lukija,
 * tarttuva otsikkorivi).
 *
 * Siksi kääntö on TEATTERI: käännöksen ajaksi kortin päälle nostetaan
 * läpinäkyvä kerros, jossa kirjasto kääntää kahta VALOKOPIOTA —
 * lähtevän sivun kloonia (vierityskohta mukana) ja saapuvan sivun
 * kloonia, joka on juuri piirretty oikeaan korttiin. Kun sivu on
 * kääntynyt, teatteri katoaa ja alta paljastuu oikea, elävä sivu, joka
 * on kloonin kanssa pikselilleen sama. Lukija, otsikkorivi, visa,
 * napit ja vieritys toimivat oikealla sivulla kuten ennen — teatteri
 * ei koske niihin, se vain näyttää käännöksen.
 *
 * TAAKSEPÄIN = PEILATTU ETEENPÄIN. Kirjasto kääntää pystyasennossa
 * taaksepäin niin, että EDELLINEN sivu lentää vasemmalta nykyisen
 * päälle; se vaatisi edellisen sivun kloonin ennen kuin sitä on
 * piirretty (kaksi piirtoa per käännös). Sen sijaan teatteri peilataan
 * vaakasuunnassa (scaleX(-1)) ja sisältö peilataan takaisin: nykyinen
 * sivu nousee VASEMMASTA reunastaan ja kääntyy oikealle paljastaen
 * edellisen. Se on eteenpäin-käännöksen tarkka peilikuva, ja samalla
 * koodipolulla molemmat.
 *
 * ELE ON PELIN OMA. Kirjaston omat hiiri- ja kosketuskuuntelijat ovat
 * pois (useMouseEvents: false): ne päättävät suunnan sormen PAIKASTA
 * (vasen 40 % = taakse), pelaaja taas pyyhkäisee mistä tahansa.
 * js/lehti.js kytkeTutkiSelaus tunnistaa vaakaliikkeen kuten ennenkin
 * ja syöttää sormen paikan kirjaston julkiseen rajapintaan
 * (startUserTouch / userMove / userStop), jolloin taite seuraa sormea.
 * Napin, sisällysvalikon, nuolinäppäimen ja jatkuvan luennan käännöt
 * ajetaan samalla rajapinnalla omalla ease-in-out-ajurilla (Raamattu:
 * KAIKKI LIIKE ANIMOIDAAN PEHMEASTI) — kirjaston oma animaatio on
 * lineaarinen.
 *
 * KIRJASTON RAJOITTEET, JOIHIN TÖRMÄTTIIN (2.0.7):
 *   - render.start() käynnistää ikuisen rAF-silmukan, jota destroy()
 *     ei pysäytä. Siksi instanssi on YKSI per lehti ja sivut vaihdetaan
 *     updateFromHtml:llä; silmukan piirto portitetaan lepotilassa
 *     pois (render.render → tyhjä), jottei joutilas lehti maksa
 *     kehyksittäin.
 *   - Sivun väliaikainen kopio (newTemporaryCopy) on cloneNode, joka
 *     hukkaa scrollTopin: pitkän sivun taite näyttäisi sivun alkua.
 *     MutationObserver palauttaa vierityskohdan kopioon heti, kun se
 *     ilmestyy, ja merkitsee sen paperin kääntöpuoleksi (huntu).
 *   - Kirjaston CSS:ssä on kirjoitusvirhe (.sft__wrapper), joten
 *     kääre ei saa mittoja: css/styles.css mitoittaa kääreen ja lohkon
 *     itse (autoSize: false).
 *   - Pystyasennossa irrotus kääntää sivun vain, jos kulma on vedetty
 *     selkämyksen yli (koko sivun leveys). Pelin sääntö on lyhyempi:
 *     nopea pyyhkäisy tai 40 % leveydestä riittää, ja loppu ajetaan
 *     ease-out-ajurilla.
 *
 * Kirjasto: page-flip 2.0.7 (StPageFlip, MIT, Nodlik) — UMD-globaali
 * `St`, `new St.PageFlip(el, asetukset)`. Ämpärissä
 * vendor/page-flip-2.0.7.browser.js ja sen LICENSE.txt (workflow
 * vie-vendor.yml). Lähdesivu: js/lahteet.js "Ohjelmakirjastot".
 */

import { PEILI_JUURI } from './media.js';

/** Kirjaston versio — ämpärin tiedostonimi ja lähdesivun rivi seuraavat tätä. */
export const SIVUNKAANTO_VERSIO = '2.0.7';
/** UMD-paketti pelin ämpärissä (R2-juuri js/media.js:stä, kuten PALLO_KIRJASTO). */
export const SIVUNKAANTO_KIRJASTO = `${PEILI_JUURI}vendor/page-flip-${SIVUNKAANTO_VERSIO}.browser.js`;
/**
 * Pelaajan lippu (localStorage). Oletus PÄÄLLÄ: puuttuva avain tai mikä
 * tahansa muu kuin '0' = kääntö käytössä, jos kirjasto latautuu. '0'
 * palauttaa vanhan sivupinon (liuku) — kehittäjäkytkin
 * js/ui-apurit.js:n tapaan, ja savukkeet asettavat sen suoraan.
 */
export const SIVUNKAANTO_AVAIN = 'matkakirja-sivunkaanto';
/** Napista tai valikosta ajetun käännön kesto (ms), ease-in-out. */
export const SIVUNKAANTO_KESTO_MS = 460;
/** Sormesta irrotetun käännön loppumatka (ms), ease-out. */
export const SIVUNKAANTO_LOPPU_MS = 300;
/** Vedon osuus sivun leveydestä, jonka jälkeen irrotus vie sivun yli. */
export const SIVUNKAANTO_KYNNYS = 0.4;
/** Nopea pyyhkäisy: vähintään näin monta pikseliä tässä ajassa kääntää aina. */
export const SIVUNKAANTO_PYYHKAISY = { matka: 40, aikaMs: 300 };
/** Kirjaston oma animaatioaika (ms): jää käyttöön vain jäännösmatkoille. */
const KIRJASTON_KESTO_MS = 900;

/** Onko pelaaja jättänyt käännön päälle (oletus) vai sammuttanut sen ('0')? */
export function sivunkaantoPaalla() {
  try {
    return globalThis.localStorage?.getItem(SIVUNKAANTO_AVAIN) !== '0';
  } catch {
    return true;
  }
}

/** Kytkee käännön päälle (avain poistuu) tai pois ('0'). */
export function asetaSivunkaanto(paalla) {
  try {
    if (paalla) globalThis.localStorage?.removeItem(SIVUNKAANTO_AVAIN);
    else globalThis.localStorage?.setItem(SIVUNKAANTO_AVAIN, '0');
  } catch {
    /* yksityinen tila */
  }
}

/**
 * Yhden tiedoston versio (dist/) tunnistetaan manifest-linkin
 * puuttumisesta — sama tunniste, jolla js/main.js jättää
 * palvelutyöntekijän rekisteröimättä. Raamattu: dist jää ilman
 * kirjastoja, joten siellä kääntöä ei edes yritetä ladata.
 */
export function yhdenTiedostonVersio(doc = globalThis.document) {
  if (!doc?.querySelector) return true;
  return !doc.querySelector('link[rel="manifest"]');
}

/** prefers-reduced-motion sammuttaa efektin (Raamattu, sääntö 4). */
export function sivunkaantoLiikeVahennetty(win = globalThis) {
  return Boolean(win.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

/**
 * Halutaanko kääntö tässä ympäristössä ylipäätään: lippu päällä, ei
 * yhden tiedoston versio, ei vähennettyä liikettä. Kirjaston
 * saatavuus on erikseen (lataaSivunkaanto / sivunkaantoValmis).
 */
export function sivunkaantoMahdollinen({
  doc = globalThis.document, win = globalThis, paalla = sivunkaantoPaalla(),
} = {}) {
  return Boolean(paalla) && !yhdenTiedostonVersio(doc) && !sivunkaantoLiikeVahennetty(win);
}

/** Kirjaston PageFlip-luokka, jos se on jo ladattu; muuten null. */
export function sivunkaantoValmis(win = globalThis) {
  return typeof win.St?.PageFlip === 'function' ? win.St.PageFlip : null;
}

let kirjastoLupaus = null;
/**
 * Lataa kirjaston kerran ämpäristä; lupaus ratkeaa PageFlip-luokkaan
 * tai NULLIIN (virhehaara: ei verkkoa, ämpäri ei vastaa, tiedosto
 * puuttuu). Epäonnistunut yritys ei jää muistiin: seuraava lehden
 * avaus yrittää uudelleen, kuten js/pallo.js lataaPallokirjasto.
 * Kääntö ei koskaan odota lupausta — se käyttää vanhaa pinoa siihen
 * asti, kunnes kirjasto on paikalla.
 */
export function lataaSivunkaanto(doc = globalThis.document) {
  const valmis = sivunkaantoValmis();
  if (valmis) return Promise.resolve(valmis);
  if (kirjastoLupaus) return kirjastoLupaus;
  if (!doc?.createElement) return Promise.resolve(null);
  kirjastoLupaus = new Promise((ok) => {
    const s = doc.createElement('script');
    s.src = SIVUNKAANTO_KIRJASTO;
    s.async = true;
    s.addEventListener('load', () => {
      const luokka = sivunkaantoValmis();
      if (!luokka) kirjastoLupaus = null;
      ok(luokka);
    });
    s.addEventListener('error', () => {
      kirjastoLupaus = null;
      s.remove();
      ok(null);
    });
    (doc.head ?? doc.documentElement).appendChild(s);
  });
  return kirjastoLupaus;
}

/* ── Teatteri ─────────────────────────────────────────────────────── */

/** Pehmeä kiihdytys ja jarrutus (Raamattu: ease-in-out). */
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
/** Sormesta irrotettu sivu vain jarruttaa. */
const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * Yksi teatteri per dialogi. Elementti (.sivunkaanto-teatteri) syntyy
 * ensimmäisellä käännöllä kortin JÄLKEEN dialogiin — järjestys on
 * tärkeä: kloonit kantavat samat id:t kuin oikea sivu, ja
 * getElementById / querySelector löytävät aina ensimmäisen eli
 * oikean kortin. Teatteri on inert eikä ota kosketuksia vastaan.
 */
const teatterit = new WeakMap();

function haeTeatteri(dialogi) {
  let t = teatterit.get(dialogi);
  if (t) return t;
  t = new Kaantoteatteri(dialogi);
  teatterit.set(dialogi, t);
  return t;
}

/** Teatteri dialogille, jos sellainen on jo syntynyt (savukkeet ja tila). */
export function lehdenTeatteri(dialogi) {
  return teatterit.get(dialogi) ?? null;
}

class Kaantoteatteri {
  constructor(dialogi) {
    this.dialogi = dialogi;
    this.juuri = dialogi.ownerDocument.createElement('div');
    this.juuri.className = 'sivunkaanto-teatteri';
    this.juuri.hidden = true;
    this.juuri.inert = true;
    this.juuri.setAttribute('aria-hidden', 'true');
    dialogi.appendChild(this.juuri);
    this.kirja = null;
    this.koko = null;
    /** Käynnissä oleva kääntö: { lopeta, vieritys, sivut } tai null. */
    this.kaanto = null;
    this.ajuri = 0;
    // Dialogin sulkeutuminen kesken käännön: teatteri siivotaan heti,
    // ettei seuraava avaus näe vanhaa kloonia kortin päällä.
    dialogi.addEventListener('close', () => this.keskeyta());
  }

  /** Kirjaston instanssi kortin mittoihin; uusi vain, kun mitat muuttuvat. */
  varmista(PageFlip, leveys, korkeus) {
    if (this.kirja && this.koko?.w === leveys && this.koko?.h === korkeus) return this.kirja;
    if (this.kirja) this.hylkaa();
    const lohko = this.juuri.ownerDocument.createElement('div');
    lohko.className = 'sivunkaanto-lohko';
    this.juuri.replaceChildren(lohko);
    const kirja = new PageFlip(lohko, {
      width: leveys,
      height: korkeus,
      size: 'fixed',
      usePortrait: true,
      autoSize: false,
      showCover: false,
      drawShadow: true,
      maxShadowOpacity: 0.55,
      flippingTime: KIRJASTON_KESTO_MS,
      useMouseEvents: false,
      mobileScrollSupport: false,
      showPageCorners: false,
      disableFlipByClick: true,
      startZIndex: 1,
    });
    // Kaksi tyhjää sivua syntyvaiheessa: kirjasto vaatii sivut heti,
    // ja oikeat kloonit vaihdetaan updateFromHtml:llä joka käännöllä.
    kirja.loadFromHTML([this.tyhjaSivu(), this.tyhjaSivu()]);
    // Lepotilan portti: rAF-silmukka pyörii ikuisesti (ks. otsikko),
    // mutta piirto ajetaan vain käännön aikana.
    const render = kirja.getRender?.();
    if (render && typeof render.render === 'function') {
      const piirra = render.render;
      render.render = (aika) => { if (this.kaanto) piirra.call(render, aika); };
    }
    kirja.on('changeState', (e) => { if (e.data === 'read') this.kaantoPaattyi(); });
    this.vahdiKopioita(kirja);
    this.kirja = kirja;
    this.koko = { w: leveys, h: korkeus };
    return kirja;
  }

  /** Vanha instanssi pois: silmukka vaiennetaan, elementit poistetaan. */
  hylkaa() {
    const vanha = this.kirja;
    this.kirja = null;
    this.koko = null;
    if (!vanha) return;
    try {
      const render = vanha.getRender?.();
      if (render) render.render = () => {};
      this.kopiovahti?.disconnect();
      vanha.destroy();
    } catch {
      /* jo purettu */
    }
  }

  tyhjaSivu() {
    const el = this.juuri.ownerDocument.createElement('div');
    el.className = 'sivunkaanto-sivu';
    return el;
  }

  /**
   * Väliaikainen kopio (kirjaston cloneNode taitetta varten) saa
   * vierityskohdan takaisin ja kääntöpuolen hunnun heti ilmestyessään.
   */
  vahdiKopioita(kirja) {
    const lohko = kirja.getUI?.()?.getDistElement?.();
    if (!lohko || typeof MutationObserver !== 'function') return;
    this.kopiovahti?.disconnect();
    this.kopiovahti = new MutationObserver((muutokset) => {
      // Lepotilan tyhjät sivut (tyhjenna) eivät ole kopioita.
      if (!this.kaanto) return;
      for (const m of muutokset) {
        for (const solmu of m.addedNodes) {
          if (solmu.nodeType !== 1 || !solmu.classList?.contains('sivunkaanto-sivu')) continue;
          if (this.kaanto?.sivut?.includes(solmu)) continue;
          solmu.classList.add('sivunkaanto-kaanto');
          const kortti = solmu.querySelector('.dialog-card');
          if (kortti) kortti.scrollTop = this.kaanto?.vieritys ?? 0;
        }
      }
    });
    this.kopiovahti.observe(lohko, { childList: true });
  }

  /** Sivuelementti kloonille: kääre peilausta varten ja huntu kääntöpuolelle. */
  sivuKloonista(klooni) {
    const doc = this.juuri.ownerDocument;
    const sivu = doc.createElement('div');
    sivu.className = 'sivunkaanto-sivu';
    const sisus = doc.createElement('div');
    sisus.className = 'sivunkaanto-sisus';
    sisus.appendChild(klooni);
    sivu.appendChild(sisus);
    const huntu = doc.createElement('div');
    huntu.className = 'sivunkaanto-huntu';
    sivu.appendChild(huntu);
    return sivu;
  }

  /**
   * Käännön valmistelu: lähtevän sivun klooni, uuden sivun piirto
   * oikeaan korttiin, saapuvan sivun klooni, teatteri kortin päälle.
   * Palauttaa false, jos kääntö ei ole mahdollinen — kutsuja käyttää
   * silloin vanhaa pinoa.
   */
  valmistele({ PageFlip, kortti, suunta, piirra, peru }) {
    if (this.kaanto) this.keskeyta();
    const leveys = kortti.offsetWidth;
    const korkeus = kortti.offsetHeight;
    if (!(leveys > 0 && korkeus > 0)) return false;
    const vieritys = kortti.scrollTop;
    const vanha = kortti.cloneNode(true);
    piirra();
    const uusi = kortti.cloneNode(true);
    const sivut = [this.sivuKloonista(vanha), this.sivuKloonista(uusi)];
    this.juuri.classList.toggle('peilattu', suunta < 0);
    this.juuri.style.left = `${kortti.offsetLeft}px`;
    this.juuri.style.top = `${kortti.offsetTop}px`;
    this.juuri.style.width = `${leveys}px`;
    this.juuri.style.height = `${korkeus}px`;
    this.juuri.hidden = false;
    this.kaanto = { vieritys, sivut, peru, tulos: null, sormessa: false };
    const kirja = this.varmista(PageFlip, leveys, korkeus);
    kirja.updateFromHtml(sivut);
    kirja.turnToPage(0);
    // Staattinen sivu piirtyy vasta seuraavassa kehyksessä; vierityskohta
    // vaatii näkyvän elementin, joten kehys ajetaan nyt.
    try { kirja.getRender().drawFrame(); } catch { /* piirto seuraavassa kehyksessä */ }
    const vanhaKortti = sivut[0].querySelector('.dialog-card');
    if (vanhaKortti) vanhaKortti.scrollTop = vieritys;
    return true;
  }

  /** Sormen paikka teatterin koordinaateiksi (peilaus mukaan lukien). */
  piste(clientX, clientY) {
    const r = this.juuri.getBoundingClientRect();
    const x = clientX - r.left;
    return { x: this.juuri.classList.contains('peilattu') ? r.width - x : x, y: clientY - r.top };
  }

  /**
   * Napista tai valikosta: sivu nousee alakulmasta ja kääntyy
   * selkämyksen yli omalla ease-in-out-ajurilla.
   */
  kaanna() {
    const { w, h } = this.koko;
    const alku = { x: w - 6, y: h - 6 };
    const loppu = { x: -w, y: h - 2 };
    this.kirja.startUserTouch(alku);
    this.aja(alku, loppu, SIVUNKAANTO_KESTO_MS, easeInOut, () => this.paata(loppu));
  }

  /**
   * Sormi (tai ajuri) irti: kirjasto ajaa jäännösmatkan ja palaa
   * lepotilaan, mikä laukaisee kaantoPaattyi. Jos taite ei koskaan
   * alkanut (alle 5 px:n liike), tilaa ei vaihdu eikä tapahtumaa tule
   * — silloin siivotaan itse, ja sivu palaa.
   */
  paata(kohta) {
    this.kirja.userStop(kohta);
    if (this.kaanto && this.kirja.getState() === 'read') this.kaantoPaattyi();
  }

  /** Sormi tarttuu sivuun: suunnan vyöhyke varmistetaan ennen taitetta. */
  tartu(clientX, clientY) {
    const { w } = this.koko;
    const p = this.piste(clientX, clientY);
    // Kirjasto päättää suunnan lähtöpisteestä (vasen 40 % = taakse);
    // teatteri kääntää aina eteenpäin, joten lähtö siirretään oikealle
    // vyöhykkeelle ja sama siirtymä pidetään koko vedon ajan.
    this.siirto = Math.max(0, w * 0.45 - p.x);
    const alku = { x: p.x + this.siirto, y: p.y };
    this.kaanto.sormessa = true;
    this.kaanto.alku = { x: clientX, y: clientY, aika: Date.now() };
    this.kaanto.kulma = p.y >= this.koko.h / 2 ? 'ala' : 'yla';
    this.kirja.startUserTouch(alku);
    this.kaanto.viimeisin = alku;
  }

  vedä(clientX, clientY) {
    if (!this.kaanto?.sormessa) return;
    const p = this.piste(clientX, clientY);
    const kohta = { x: p.x + this.siirto, y: p.y };
    this.kaanto.viimeisin = kohta;
    this.kirja.userMove(kohta, true);
  }

  /**
   * Sormi irtoaa: nopea pyyhkäisy tai riittävä matka vie sivun yli,
   * muuten sivu palaa. Loppumatka ajetaan ease-out-ajurilla.
   */
  irrota(clientX, clientY) {
    if (!this.kaanto?.sormessa) return false;
    const k = this.kaanto;
    k.sormessa = false;
    const { w, h } = this.koko;
    const p = this.piste(clientX, clientY);
    const kohta = { x: p.x + this.siirto, y: p.y };
    const dx = Math.abs(clientX - k.alku.x);
    const nopea = dx >= SIVUNKAANTO_PYYHKAISY.matka && Date.now() - k.alku.aika <= SIVUNKAANTO_PYYHKAISY.aikaMs;
    const matka = Math.abs(p.x - this.piste(k.alku.x, k.alku.y).x);
    const yli = nopea || matka >= w * SIVUNKAANTO_KYNNYS;
    const reunaY = k.kulma === 'ala' ? h - 2 : 2;
    const loppu = yli ? { x: -w, y: reunaY } : { x: w - 4, y: reunaY };
    this.aja(kohta, loppu, SIVUNKAANTO_LOPPU_MS, easeOut, () => this.paata(loppu));
    return yli;
  }

  /** rAF-ajuri: syöttää kirjastolle sormen paikan pitkin suoraa. */
  aja(alku, loppu, kesto, kayra, valmis) {
    const win = this.juuri.ownerDocument.defaultView ?? globalThis;
    win.cancelAnimationFrame?.(this.ajuri);
    const alkoi = win.performance?.now?.() ?? Date.now();
    const askel = (nyt) => {
      if (!this.kaanto) return;
      const osuus = Math.min(1, ((nyt ?? Date.now()) - alkoi) / kesto);
      const t = kayra(osuus);
      this.kirja.userMove({ x: alku.x + (loppu.x - alku.x) * t, y: alku.y + (loppu.y - alku.y) * t }, true);
      if (osuus < 1) this.ajuri = win.requestAnimationFrame(askel);
      else valmis();
    };
    this.ajuri = win.requestAnimationFrame(askel);
  }

  /** Kirjasto palasi lepotilaan: sivu joko kääntyi tai palasi. */
  kaantoPaattyi() {
    const k = this.kaanto;
    if (!k || k.sormessa) return;
    const kaantyi = (this.kirja?.getCurrentPageIndex?.() ?? 0) >= 1;
    this.kaanto = null;
    this.juuri.hidden = true;
    if (!kaantyi) k.peru?.();
    this.viimeisinTulos = kaantyi ? 'kaantyi' : 'palasi';
    this.tyhjenna();
  }

  /**
   * Kloonit pois lepotilassa: ne kantavat oikean sivun id:t, eikä
   * dialogiin saa jäädä kaksoiskappaleita käännösten väliin. Kaksi
   * tyhjää sivua pitää kirjaston tyytyväisenä seuraavaan käännökseen.
   */
  tyhjenna() {
    if (!this.kirja) return;
    try {
      this.kirja.updateFromHtml([this.tyhjaSivu(), this.tyhjaSivu()]);
      this.kirja.turnToPage(0);
    } catch {
      /* kirjasto jo purettu */
    }
  }

  /** Kesken jäänyt kääntö loppuun heti (uusi kääntö tai dialogin sulku). */
  keskeyta() {
    if (!this.kaanto) return;
    const k = this.kaanto;
    k.sormessa = false;
    const win = this.juuri.ownerDocument.defaultView ?? globalThis;
    win.cancelAnimationFrame?.(this.ajuri);
    try {
      const kirja = this.kirja;
      if (kirja && kirja.getState() !== 'read') {
        // Kesken oleva taite tai animaatio ajetaan loppuun HETI: userStop
        // valitsee paluun tai ylityksen, finishAnimation hyppää sen
        // viimeiseen kehykseen ja palauttaa lepotilan (→ kaantoPaattyi).
        kirja.userStop(k.viimeisin ?? { x: this.koko.w - 4, y: this.koko.h - 2 });
        kirja.getRender().finishAnimation();
      }
    } catch {
      /* kirjasto jo purettu */
    }
    if (this.kaanto === k) {
      // Tapahtumaa ei tullut (taite ei ehtinyt alkaa): sivu jää siihen,
      // mihin oikea kortti on jo piirretty, ja teatteri siivotaan itse.
      this.kaanto = null;
      this.juuri.hidden = true;
      this.tyhjenna();
    }
  }
}

/**
 * Napista, valikosta, näppäimestä tai jatkuvasta luennasta käännetty
 * sivu. `piirra` piirtää kohdesivun oikeaan korttiin, `peru` palauttaa
 * lähtösivun jos kääntö jää kesken. Palauttaa true, jos teatteri otti
 * käännön; false = kutsuja käyttää vanhaa pinoa.
 */
export function kaannaSivu({ dialogi, kortti, suunta, piirra, peru }) {
  const PageFlip = sivunkaantoValmis();
  if (!PageFlip || !dialogi || !kortti || !suunta || !sivunkaantoMahdollinen()) return false;
  const t = haeTeatteri(dialogi);
  if (!t.valmistele({ PageFlip, kortti, suunta, piirra, peru })) return false;
  t.kaanna();
  return true;
}

/**
 * Sormella vedetty sivu (js/lehti.js kytkeTutkiSelaus). Palauttaa
 * kahvan { vedä, irrota, peru } tai null, jos teatteri ei ole
 * käytettävissä — silloin kutsuja jatkaa vanhalla pyyhkäisyllä.
 */
export function aloitaSivunVeto({ dialogi, kortti, suunta, piirra, peru, clientX, clientY }) {
  const PageFlip = sivunkaantoValmis();
  if (!PageFlip || !dialogi || !kortti || !suunta || !sivunkaantoMahdollinen()) return null;
  const t = haeTeatteri(dialogi);
  if (!t.valmistele({ PageFlip, kortti, suunta, piirra, peru })) return null;
  t.tartu(clientX, clientY);
  return {
    vedä: (x, y) => t.vedä(x, y),
    irrota: (x, y) => t.irrota(x, y),
    peru: () => t.irrota(t.kaanto?.alku?.x ?? clientX, t.kaanto?.alku?.y ?? clientY),
  };
}
