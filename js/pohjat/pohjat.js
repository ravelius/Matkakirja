/**
 * UI-POHJAT WEBISSÄ: NOSTOKORTTI, KORTTI ja PANEELI (omistaja 1.10.2026, UI-pohjat kohdat 1–3, 5, 6 ja 9).
 *
 * Uusi pinta valitsee pohjan yhdellä kutsulla eikä tee omia mittoja (sitova sääntö "pohjat pelin perustana"):
 *
 *   const kortti = luoPohjaNostokortti(data, { toiminnot: { lehti: () => … }, sulje: () => … });
 *   document.body.appendChild(kortti.el); kortti.avaa();
 *
 *   const k = luoPohjaKortti(data, { modaali: true, toiminnot: { aloita: () => … } });
 *
 * Data on KorttiData (js/pohjat/korttidata.js), tyylit css/pohjat/ (POHJAT_TYYLIT; vain --tk-*-tokenit). Natiivi tekee saman
 * Pohja.cs:llä samasta datasta (Natiivi-UI); kuvapari tehdään samasta nostosta (Ateena/Akropolis).
 *
 * SULKU (yksi pino, kohta 5): Esc sulkee ylimmän pohjan; NOSTOKORTTI myös veto alas ja ohinapautus (ei ✕),
 * ei-modaali KORTTI Takaisin + ohinapautus + Esc, modaali KORTTI vain napeilla. Animaatiot ≤ 250 ms (kohta 6).
 */
import { tarkistaKorttiData } from './korttidata.js';
import { tarkistaPaneeliData } from './paneelidata.js';
import { POHJAT_TYYLIT } from './tyylit.js';

const POHJA_TYYLIN_TUNNUS = 'pohjat-tyyli';
const POHJA_VETO_PX = 40;
/** Kortin jatkeet, joiden napautus ei ole ohinapautus: Pulun chat ja -nappi, PULU-pohjan kulma ja pohjan KORTTI (visa). */
const POHJA_EI_OHINAPAUTUS = '.pollo-paneeli, .pollo-nappi, .tk-pulukulma, .tk-kortti-tausta';
/** Avoimet pohjat avausjärjestyksessä: Esc sulkee ylimmän (yksi sulkupino). */
const pohjaPino = [];

/**
 * Pohjien tyylit kerran kiinteässä järjestyksessä (js/pohjat/tyylit.js POHJAT_TYYLIT); yhden tiedoston versiossa ne
 * ovat jo sivulla. Linkit saavat data-pohjat-merkinnän (js/ui.js odottaa niiden latautumista ennen mittausta).
 */
export function pohjatLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(POHJA_TYYLIN_TUNNUS) || document.querySelector('link[data-pohjat]')) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  POHJAT_TYYLIT.forEach((polku, i) => {
    const linkki = document.createElement('link');
    if (i === 0) linkki.id = POHJA_TYYLIN_TUNNUS;
    linkki.rel = 'stylesheet';
    linkki.dataset.pohjat = '';
    linkki.href = new URL(polku.replace(/^css\//, ''), peruslinkki.href).href;
    document.head.appendChild(linkki);
  });
}

function pohjaSolmu(tagi, luokka, teksti) {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/*
 * PUUTTUVA KUVA POISTAA KUVAPAIKAN (omistaja 2.10.2026 klo 13.53: Bobovacin nostossa harmaa laatikko havainnekuvan
 * paikalla, kun tiedosto puuttui ämpäristä). Sama sääntö kuin vanhalla kohdekortilla (js/fokuskohteet.js
 * piirraKohdeKuva): virhe poistaa kehyksen, ja `poistui` antaa kutsujalle paikan korvata se (hero → viiva).
 */
function pohjaKuva(kuva, luokka, kuvaAuki = null, indeksi = 0, poistui = null) {
  const kehys = pohjaSolmu('figure', `tk-kuva ${luokka}`);
  const img = document.createElement('img');
  img.addEventListener('error', () => { poistui?.(kehys); kehys.remove(); }, { once: true });
  img.src = kuva.url;
  img.alt = kuva.kuvateksti || '';
  img.loading = 'lazy';
  img.decoding = 'async';
  if (kuva.rajaus) img.style.objectPosition = kuva.rajaus;
  // Napautus avaa suurennoksen (pinnan oma kuvaselain), jos pinta antaa sen.
  if (kuvaAuki) {
    kehys.classList.add('tk-kuva--suurennettava');
    img.addEventListener('click', (e) => { e.stopPropagation(); kuvaAuki(kuva, indeksi, img); });
  }
  kehys.appendChild(img);
  if (kuva.kuvateksti) kehys.appendChild(pohjaSolmu('figcaption', 'tk-kuvateksti', kuva.kuvateksti));
  // Kuvan tekijä ja lisenssi kuvan alle (CC BY vaatii maininnan siellä, missä kuva näkyy).
  if (kuva.lahde) kehys.appendChild(pohjaSolmu('div', 'tk-lahde', kuva.lahde));
  return kehys;
}

/** Sisältö (kapiteeli, otsikko, kuvat kuvasääntöjen mukaan, kappaleet, lähde) annettuun säiliöön. */
export function pohjaSisalto(isa, d, { kuvaAuki = null } = {}) {
  if (d.yla) {
    const yla = pohjaSolmu('div', 'tk-kapiteeli', d.yla);
    if (d.ylaVari) {
      const piste = pohjaSolmu('span', 'tk-kapiteeli__piste');
      piste.style.setProperty('--tk-piste', d.ylaVari);
      yla.prepend(piste);
    }
    isa.appendChild(yla);
  }
  if (d.otsikko) isa.appendChild(pohjaSolmu('h2', 'tk-otsikko', d.otsikko));
  if (d.alaotsikko) isa.appendChild(pohjaSolmu('p', 'tk-apuri', d.alaotsikko));
  const hero = d.kuvat.find((k) => k.rooli === 'hero');
  const upotus = d.kuvat.find((k) => k.rooli === 'upotus');
  const galleria = d.kuvat.filter((k) => k.rooli === 'galleria');
  if (hero) {
    isa.appendChild(pohjaKuva(hero, 'tk-kuva--hero', kuvaAuki, d.kuvat.indexOf(hero),
      (kehys) => { if (d.otsikko) kehys.before(pohjaSolmu('hr', 'tk-viiva')); }));
  }
  else if (d.otsikko) isa.appendChild(pohjaSolmu('hr', 'tk-viiva'));
  if (galleria.length) {
    const nauha = pohjaSolmu('div', 'tk-galleria');
    galleria.forEach((k, i) => {
      const b = pohjaSolmu('button');
      b.type = 'button';
      b.setAttribute('aria-label', k.kuvateksti || `Kuva ${i + 2}`);
      const img = document.createElement('img');
      img.addEventListener('error', () => { b.remove(); if (!nauha.children.length) nauha.remove(); }, { once: true });
      img.src = k.url;
      img.alt = '';
      img.loading = 'lazy';
      b.appendChild(img);
      b.addEventListener('click', () => kuvaAuki?.(k, d.kuvat.indexOf(k), b.querySelector('img')));
      nauha.appendChild(b);
    });
    isa.appendChild(nauha);
  }
  // Runko pitää upotuksen sisällään; teksti kiertää sen (kuvasääntö 2 kuvaa).
  const runko = pohjaSolmu('div', 'tk-runko');
  if (upotus) runko.appendChild(pohjaKuva(upotus, 'tk-kuva--upotus', kuvaAuki, d.kuvat.indexOf(upotus)));
  for (const k of d.kappaleet) {
    if (k.otsikko) runko.appendChild(pohjaSolmu('h3', 'tk-valiotsikko', k.otsikko));
    if (k.teksti) runko.appendChild(pohjaSolmu('p', `tk-leipa${k.korostus ? ' tk-leipa--korostus' : ''}`, k.teksti));
    if (k.lista.length) {
      const ol = pohjaSolmu('ol', 'tk-leipa');
      for (const r of k.lista) ol.appendChild(pohjaSolmu('li', null, r));
      runko.appendChild(ol);
    }
  }
  isa.appendChild(runko);
  if (d.lahde) isa.appendChild(pohjaSolmu('div', 'tk-lahde', d.lahde));
}

function pohjaNapit(d, toiminnot, oletus = 'toiminto') {
  if (!d.napit.length) return null;
  // Neljä tai useampi nappi samalla rivillä: tiivis rivi (pienempi porras, kapeampi reunus), ei lyhennystä.
  const rivi = pohjaSolmu('div', `tk-napit${d.napit.length >= 4 ? ' tk-napit--tiivis' : ''}`);
  for (const n of d.napit) {
    const tyyppi = n.tyyppi || oletus;
    const b = pohjaSolmu('button', `tk-nappi tk-nappi--${tyyppi}`, n.teksti);
    b.type = 'button';
    b.addEventListener('click', () => toiminnot?.[n.toiminto]?.(n));
    rivi.appendChild(b);
  }
  return rivi;
}

function pohjaPinoon(pohja) {
  pohjaPino.push(pohja);
  // Kaappausvaihe: pohja ehtii ennen sivun muita Esc-kuuntelijoita.
  if (pohjaPino.length === 1 && typeof document !== 'undefined') document.addEventListener('keydown', pohjaEsc, true);
}

function pohjaPinosta(pohja) {
  const i = pohjaPino.indexOf(pohja);
  if (i >= 0) pohjaPino.splice(i, 1);
  if (!pohjaPino.length && typeof document !== 'undefined') document.removeEventListener('keydown', pohjaEsc, true);
}

function pohjaEsc(e) {
  if (e.key !== 'Escape' || !pohjaPino.length) return;
  const ylin = pohjaPino[pohjaPino.length - 1];
  if (ylin.modaali) return;
  e.preventDefault();
  // Esc sulkee VAIN ylimmän pohjan: linssin ja kartan omat Esc-kuuntelijat eivät saa nähdä samaa painallusta
  // (muuten sama Esc sulkisi kortin ja sen alla olevan linssin).
  e.stopPropagation();
  e.stopImmediatePropagation?.();
  ylin.sulje();
}

/** Avoimet pohjat (testit ja tyylikirjasivu). */
export function pohjaPinonKoko() {
  return pohjaPino.length;
}

/**
 * NOSTOKORTTI: sisältö kartan päällä. KAPEA alareunaan ≤ 45 % (kahvan veto ylös 85 %, alas sulkee), KESKI/LEVEÄ
 * sivukortti oikealle. Teema PAPERI, linssissä TUMMA. Ei ✕:ää (löydös 133): ohinapautus, veto alas, Esc.
 *
 * @param {object} data KorttiData
 * @param {{teema?: string, toiminnot?: object, sulje?: Function, kuvaAuki?: Function, ohinapautus?: boolean,
 *   esikatselu?: boolean}} [asetukset]
 */
export function luoPohjaNostokortti(data, {
  teema, toiminnot = {}, sulje = null, kuvaAuki = null, ohinapautus = true, esikatselu = false,
} = {}) {
  const d = tarkistaKorttiData(data, { teema: teema ?? 'paperi' });
  if (!d) return null;
  pohjatLataaTyyli();
  const el = pohjaSolmu('section', `tk-nostokortti tk-teema-${teema ?? d.teema} tk-piilossa`);
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', d.otsikko || d.yla || 'Nosto');
  // Kortin painallus ei kuulu kartalle (kartan napautus sulkisi kortin ennen napin klikkausta): sama kuin vanhoilla
  // korteilla. Oma ohinapautus kuuntelee dokumenttia kaappausvaiheessa, joten tämä ei estä sitä.
  el.addEventListener('pointerdown', (e) => e.stopPropagation());
  const kahva = pohjaSolmu('button', 'tk-nostokortti__kahva');
  kahva.type = 'button';
  kahva.setAttribute('aria-label', 'Laajenna tai pienennä');
  const vieritys = pohjaSolmu('div', 'tk-nostokortti__vieritys');
  pohjaSisalto(vieritys, d, { kuvaAuki });
  el.append(kahva, vieritys);
  const napit = pohjaNapit(d, toiminnot);
  if (napit) {
    const ala = pohjaSolmu('div', 'tk-nostokortti__napit');
    ala.appendChild(napit);
    el.appendChild(ala);
  }

  let auki = false;
  const pohja = {
    el,
    data: d,
    modaali: false,
    get auki() { return auki; },
    laajenna(paalle = !el.classList.contains('tk-laajennettu')) {
      el.classList.toggle('tk-laajennettu', paalle);
    },
    avaa() {
      if (auki) return pohja;
      auki = true;
      // Kaksi kehystä: piilotila ensin, jotta avaus siirtyy (220 ms).
      requestAnimationFrame(() => el.classList.remove('tk-piilossa'));
      if (!esikatselu) {
        pohjaPinoon(pohja);
        if (ohinapautus) setTimeout(() => document.addEventListener('pointerdown', ohi, true), 0);
      }
      return pohja;
    },
    sulje() {
      if (!auki) return;
      auki = false;
      el.classList.add('tk-piilossa');
      pohjaPinosta(pohja);
      document.removeEventListener('pointerdown', ohi, true);
      sulje?.(pohja);
    },
  };
  function ohi(e) {
    // Pulun chat ja muut pohjat ovat kortin jatke (Kysy avaa chatin kortin päälle): niiden napautus ei sulje korttia.
    if (el.contains(e.target) || e.target?.closest?.(POHJA_EI_OHINAPAUTUS)) return;
    pohja.sulje();
  }
  // Veto: ylös laajentaa, alas pienentää tai sulkee (kahva; KAPEA-luokassa näkyvissä).
  let alkuY = null;
  kahva.addEventListener('pointerdown', (e) => { alkuY = e.clientY; kahva.setPointerCapture?.(e.pointerId); });
  kahva.addEventListener('pointerup', (e) => {
    if (alkuY == null) return;
    const dy = e.clientY - alkuY;
    alkuY = null;
    if (dy < -POHJA_VETO_PX) pohja.laajenna(true);
    else if (dy > POHJA_VETO_PX) {
      if (el.classList.contains('tk-laajennettu')) pohja.laajenna(false);
      else pohja.sulje();
    } else pohja.laajenna();
  });
  return pohja;
}

/**
 * KORTTI: dialogi, vahvistus, ilmoitus, visa (pieni variantti minipopup). Keskitetty max 420 pt, himmennys,
 * enintään yksi kuva (hero 2:1), napit oikealle (ensisijainen kulta, toissijainen haamu). Modaali sulkeutuu vain
 * napeista; muuten myös ohinapautus ja Esc.
 *
 * @param {object} data KorttiData
 * @param {{modaali?: boolean, mini?: boolean, toiminnot?: object, sulje?: Function, esikatselu?: boolean}} [asetukset]
 */
export function luoPohjaKortti(data, {
  modaali = false, mini = false, toiminnot = {}, sulje = null, esikatselu = false,
} = {}) {
  const d = tarkistaKorttiData({ ...data, kuvat: (data?.kuvat ?? []).slice(0, 1) }, { teema: 'paperi' });
  if (!d) return null;
  pohjatLataaTyyli();
  const tausta = pohjaSolmu('div', 'tk-kortti-tausta tk-piilossa');
  const kortti = pohjaSolmu('div', `tk-kortti tk-teema-paperi${mini ? ' tk-kortti--mini' : ''}`);
  kortti.setAttribute('role', modaali ? 'alertdialog' : 'dialog');
  kortti.setAttribute('aria-modal', 'true');
  kortti.setAttribute('aria-label', d.otsikko || 'Kortti');
  pohjaSisalto(kortti, d);
  let auki = false;
  const pohja = {
    el: tausta,
    kortti,
    data: d,
    modaali,
    get auki() { return auki; },
    avaa() {
      if (auki) return pohja;
      auki = true;
      requestAnimationFrame(() => tausta.classList.remove('tk-piilossa'));
      if (!esikatselu) pohjaPinoon(pohja);
      kortti.querySelector('.tk-nappi--ensisijainen, .tk-nappi')?.focus?.({ preventScroll: true });
      return pohja;
    },
    sulje() {
      if (!auki) return;
      auki = false;
      tausta.classList.add('tk-piilossa');
      pohjaPinosta(pohja);
      sulje?.(pohja);
    },
  };
  // Napit sulkevat kortin toimintonsa jälkeen (toiminto voi palauttaa false, jos kortti jää auki).
  const kaaritut = {};
  for (const n of d.napit) {
    kaaritut[n.toiminto] = (nappi) => {
      const tulos = toiminnot?.[n.toiminto]?.(nappi, pohja);
      if (tulos !== false) pohja.sulje();
    };
  }
  const napit = pohjaNapit(d, kaaritut);
  // Visa ja valinta (yli kaksi nappia): vastaukset allekkain koko leveydelle (mallikuva 08).
  if (napit && d.napit.length > 2) napit.classList.add('tk-napit--pysty');
  if (napit) kortti.appendChild(napit);
  tausta.appendChild(kortti);
  if (!modaali) tausta.addEventListener('click', (e) => { if (e.target === tausta) pohja.sulje(); });
  return pohja;
}

/** PANEELIN ikoni: kutsujan SVG-solmu kloonataan, merkkijono (koodin oma SVG) jäsennetään. */
function paneeliIkoni(ikoni) {
  if (!ikoni) return null;
  const kehys = pohjaSolmu('span', 'tk-paneeli-ikoni');
  kehys.setAttribute('aria-hidden', 'true');
  if (typeof ikoni === 'string') kehys.innerHTML = ikoni;
  else if (ikoni.cloneNode) kehys.appendChild(ikoni.cloneNode(true));
  return kehys;
}

/** Yksi PANEELIN rivi (38 pt): NAVIGOINTI, KYTKIN, TOIMINTO tai SÄÄDIN. */
function paneeliRivi(r, pohja) {
  if (r.tyyppi === 'saadin') {
    const rivi = pohjaSolmu('label', 'tk-paneeli-rivi tk-paneeli-rivi--saadin');
    const yla = pohjaSolmu('span', 'tk-paneeli-rivi__yla');
    const ikoni = paneeliIkoni(r.ikoni);
    if (ikoni) yla.appendChild(ikoni);
    yla.appendChild(pohjaSolmu('span', 'tk-paneeli-rivi__nimi', r.nimi));
    const arvo = pohjaSolmu('span', 'tk-paneeli-rivi__arvo', r.muotoile(r.arvo));
    yla.appendChild(arvo);
    const liuku = pohjaSolmu('input', 'tk-paneeli-liuku');
    Object.assign(liuku, { type: 'range', min: String(r.min), max: String(r.max), step: String(r.askel), value: String(r.arvo) });
    liuku.setAttribute('aria-label', r.nimi);
    liuku.addEventListener('input', () => {
      r.arvo = Number(liuku.value);
      arvo.textContent = r.muotoile(r.arvo);
      r.toiminto?.(r.arvo, r, pohja);
    });
    rivi.append(yla, liuku);
    return rivi;
  }
  const rivi = pohjaSolmu('button', `tk-paneeli-rivi tk-paneeli-rivi--${r.tyyppi}`);
  rivi.type = 'button';
  if (r.tunnus) rivi.dataset.tunnus = r.tunnus;
  const ikoni = paneeliIkoni(r.ikoni);
  if (ikoni) rivi.appendChild(ikoni);
  rivi.appendChild(pohjaSolmu('span', 'tk-paneeli-rivi__nimi', r.nimi));
  if (r.tyyppi === 'kytkin') {
    const tila = pohjaSolmu('span', 'tk-paneeli-rivi__tila');
    rivi.setAttribute('role', 'switch');
    const nayta = () => {
      rivi.classList.toggle('tk-paalla', r.paalla);
      rivi.setAttribute('aria-checked', String(r.paalla));
      tila.textContent = r.paalla ? 'Päällä' : 'Pois';
    };
    nayta();
    rivi.appendChild(tila);
    rivi.addEventListener('click', () => {
      r.paalla = !r.paalla;
      nayta();
      r.toiminto?.(r.paalla, r, pohja);
    });
    return rivi;
  }
  if (r.tyyppi === 'navigointi') {
    if (r.arvo) rivi.appendChild(pohjaSolmu('span', 'tk-paneeli-rivi__arvo', r.arvo));
    rivi.appendChild(pohjaSolmu('span', 'tk-paneeli-rivi__nuoli', '›'));
  }
  rivi.addEventListener('click', () => r.toiminto?.(r, pohja));
  return rivi;
}

/** PANEELIN sisältö: ylärivi (‹ Takaisin, kapiteeli), ryhmät ja alarivi. */
function paneeliSisalto(el, d, pohja) {
  el.textContent = '';
  el.setAttribute('aria-label', d.kapiteeli || 'Valikko');
  if (d.takaisin || d.kapiteeli) {
    const yla = pohjaSolmu('div', 'tk-paneeli__yla');
    if (d.takaisin) {
      const takaisin = pohjaSolmu('button', 'tk-paneeli__takaisin', '‹ Takaisin');
      takaisin.type = 'button';
      takaisin.addEventListener('click', () => d.takaisin(pohja));
      yla.appendChild(takaisin);
    }
    if (d.kapiteeli) yla.appendChild(pohjaSolmu('p', 'tk-kapiteeli', d.kapiteeli));
    el.appendChild(yla);
  }
  for (const r of d.ryhmat) {
    if (r.erotin) el.appendChild(pohjaSolmu('div', 'tk-paneeli__erotin'));
    if (r.otsikko) el.appendChild(pohjaSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', r.otsikko));
    const ryhma = pohjaSolmu('div', `tk-paneeli__ryhma${r.vierekkain ? ' tk-paneeli__ryhma--vierekkain' : ''}`);
    for (const rivi of r.rivit) ryhma.appendChild(paneeliRivi(rivi, pohja));
    el.appendChild(ryhma);
  }
  if (d.alarivi) {
    const ala = pohjaSolmu('div', 'tk-paneeli__alarivi');
    ala.append(pohjaSolmu('span', '', d.alarivi.vasen), pohjaSolmu('span', '', d.alarivi.oikea));
    el.appendChild(ala);
  }
}

/**
 * PANEELI: valikko avaajansa alla (pillerivalikko, karttaselite; 2. erässä linssivalitsin LASI-teemalla).
 * Leveys min(350, ruutu − 24), korkeus enintään 70 % ja vierii sisältä, ei kuvia. Avaus ponnahtaa avaajan kohdalta
 * (220/200 ms). Sulku: ohinapautus, Esc tai avaajan uusi napautus (kutsuja kutsuu `sulje()`; avaajan napautus ei
 * ole ohinapautus). Alinäkymä: `nayta(uusiData)`, jonka `takaisin` palaa.
 *
 * @param {object} data PaneeliData (js/pohjat/paneelidata.js)
 * @param {{teema?: string, avaaja?: Element, sulje?: Function, esikatselu?: boolean}} [asetukset]
 */
export function luoPohjaPaneeli(data, { teema, avaaja = null, sulje = null, esikatselu = false } = {}) {
  let d = tarkistaPaneeliData(data, { teema: teema ?? 'paperi' });
  if (!d) return null;
  pohjatLataaTyyli();
  const el = pohjaSolmu('section', `tk-paneeli tk-teema-${d.teema} tk-piilossa`);
  el.setAttribute('role', 'dialog');
  let auki = false;
  const pohja = {
    el,
    get data() { return d; },
    modaali: false,
    get auki() { return auki; },
    /** Alinäkymä tai päivitetty data samaan paneeliin (paikka ja sulkupino säilyvät). */
    nayta(uusi) {
      const t = tarkistaPaneeliData(uusi, { teema: d.teema });
      if (!t) return pohja;
      d = t;
      paneeliSisalto(el, d, pohja);
      el.scrollTop = 0;
      return pohja;
    },
    asemoi() {
      if (!avaaja || esikatselu) return;
      const r = avaaja.getBoundingClientRect();
      el.style.setProperty('--tk-paneeli-yla', `${Math.round(r.bottom)}px`);
      el.style.setProperty('--tk-paneeli-oikea', `${Math.max(0, Math.round(window.innerWidth - r.right))}px`);
    },
    avaa() {
      if (auki) return pohja;
      auki = true;
      pohja.asemoi();
      requestAnimationFrame(() => el.classList.remove('tk-piilossa'));
      if (!esikatselu) {
        pohjaPinoon(pohja);
        setTimeout(() => document.addEventListener('pointerdown', ohi, true), 0);
        window.addEventListener('resize', pohja.asemoi);
      }
      avaaja?.setAttribute?.('aria-expanded', 'true');
      return pohja;
    },
    sulje() {
      if (!auki) return;
      auki = false;
      el.classList.add('tk-piilossa');
      pohjaPinosta(pohja);
      document.removeEventListener('pointerdown', ohi, true);
      window.removeEventListener('resize', pohja.asemoi);
      avaaja?.setAttribute?.('aria-expanded', 'false');
      sulje?.(pohja);
    },
  };
  function ohi(e) {
    // Avaajan napautus kuuluu kutsujalle (se sulkee paneelin itse); muut pohjat ovat paneelin jatke.
    if (el.contains(e.target) || avaaja?.contains?.(e.target) || e.target?.closest?.(POHJA_EI_OHINAPAUTUS)) return;
    pohja.sulje();
  }
  if (esikatselu) el.classList.add('tk-paneeli--esikatselu');
  paneeliSisalto(el, d, pohja);
  return pohja;
}

/**
 * KUVANÄKYMÄ: koko ruudun kuva- tai 3D-näkymä (tyylikirja: teema TUMMA, kuvia 1+, sulku ✕, veto alas, Esc). Natiivissa
 * Kuvanakyma.cs (Astronautin kamera). ✕ on LASI-teemaa (Natiivi-UI 2.10.2026: kuvan päällä olevat ohjaimet ovat lasia,
 * kuten linssin ohjaimessa), 44 pt, pyöreä, oikeassa yläkulmassa turva-alueen sisällä. Ohinapautusta ei ole, koska
 * näkymä täyttää ruudun. Sisältö menee el.sisalto-solmuun; kutsuja vastaa omista eleistään.
 *
 * @param {{teema?: string, ohjainteema?: string, nimi?: string, sulje?: Function, vetoAlas?: boolean}} [asetukset]
 */
export function luoPohjaKuvanakyma({ teema = 'tumma', ohjainteema = 'lasi', nimi = '', sulje = null, vetoAlas = true } = {}) {
  pohjatLataaTyyli();
  const el = pohjaSolmu('section', `tk-kuvanakyma tk-teema-${teema} tk-piilossa`);
  el.setAttribute('role', 'dialog');
  if (nimi) el.setAttribute('aria-label', nimi);
  const sisalto = pohjaSolmu('div', 'tk-kuvanakyma__sisalto');
  const sulku = pohjaSolmu('button', `tk-kuvanakyma__sulku tk-teema-${ohjainteema}`, '✕');
  sulku.type = 'button';
  sulku.setAttribute('aria-label', 'Sulje');
  el.append(sisalto, sulku);
  let auki = false;
  const pohja = {
    el, sisalto, sulku,
    modaali: false,
    get auki() { return auki; },
    avaa() {
      if (auki) return pohja;
      auki = true;
      requestAnimationFrame(() => el.classList.remove('tk-piilossa'));
      pohjaPinoon(pohja);
      return pohja;
    },
    sulje() {
      if (!auki) return;
      auki = false;
      el.classList.add('tk-piilossa');
      pohjaPinosta(pohja);
      sulje?.(pohja);
    },
  };
  sulku.addEventListener('click', (e) => { e.stopPropagation(); pohja.sulje(); });
  if (vetoAlas) {
    // Veto alas sulkee: pystysuora liike yli 2 × POHJA_VETO_PX ja selvästi enemmän pysty- kuin vaakasuunnassa.
    let alku = null;
    el.addEventListener('pointerdown', (e) => { alku = { x: e.clientX, y: e.clientY }; });
    el.addEventListener('pointerup', (e) => {
      if (!alku) return;
      const dx = e.clientX - alku.x, dy = e.clientY - alku.y;
      alku = null;
      if (dy > 2 * POHJA_VETO_PX && dy > 2 * Math.abs(dx)) pohja.sulje();
    });
    el.addEventListener('pointercancel', () => { alku = null; });
  }
  return pohja;
}

/** OHJAUSNAPIN ✕ viivakuvakkeena (tyylikirja OHJAUSNAPPI: 24-ruudukko, viiva 1,75, ei tekstimerkkiä ×). */
function pohjaSulkuKuvake() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const polku = document.createElementNS(ns, 'path');
  polku.setAttribute('d', 'M6 6 18 18M18 6 6 18');
  svg.appendChild(polku);
  return svg;
}

/** '2:3' → '2 / 3' (CSS aspect-ratio); tuntematon suhde → juliste 2:3. */
function galleriaSuhde(suhde) {
  const m = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(String(suhde ?? ''));
  return m ? `${m[1]} / ${m[2]}` : '2 / 3';
}

/**
 * GALLERIA: kuvakokoelman ikkuna (tyylikirja.json pohjat.GALLERIA; omistaja 2.10.2026 klo 15.5x, Natiivi-UI määritteli).
 * PANEELI-ikkuna PAPERI-teemalla keskellä ruutua hunnun päällä: otsikkorivi (kapiteeli + laskuri, ✕ OHJAUSNAPPINA) pysyy
 * ylhäällä vieritettäessä, osiot kapiteeleina laskureineen, ruudukko sarakkeen vähimmäisleveydellä galleria.sarake ja
 * välillä galleria.vali (puhelimessa pystyssä 3). Vedos kuvan suhteella (data.suhde, juliste 2:3), nimi alla enintään
 * 2 riviä; lukossa oleva ruutu on pelkkä kehys (ei katoa). Napautus avaa KUVANÄKYMÄN saman osion avoimista kuvista
 * (‹ › reunakaistat, vaakaveto, nuolinäppäimet; ✕, veto alas ja Esc sulkevat). Sulku: ✕, ohinapautus (huntu), Esc.
 *
 * Data: { otsikko, laskuri?, nimi?, suhde?: '2:3' | '3:2', osiot: [{ nimi, laskuri?, ruudut: [{ nimi, kuva, vara?,
 * lukossa?, suuri?: { url, otsikko?, kuvateksti?, lahde? } }] }] }. `kuva` on ruudukon pikkukuva, `vara` sen varaosoite
 * ja `suuri` kuvanäkymän täysi koko (oletus kuva).
 *
 * @param {object} data GalleriaData (yllä)
 * @param {{teema?: string, sulje?: Function, esikatselu?: boolean, avattu?: Function}} [asetukset]
 *   `avattu(ruutu)` kutsutaan, kun kuva avataan kuvanäkymään (pinnan ääni tms.).
 */
export function luoPohjaGalleria(data, { teema = 'paperi', sulje = null, esikatselu = false, avattu = null } = {}) {
  if (!data || !Array.isArray(data.osiot)) return null;
  pohjatLataaTyyli();
  const tausta = pohjaSolmu('div', 'tk-kokoelma-tausta tk-piilossa');
  const el = pohjaSolmu('section', `tk-kokoelma tk-teema-${teema} tk-piilossa`);
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', data.nimi || data.otsikko || 'Galleria');
  el.style.setProperty('--tk-kokoelma-suhde', galleriaSuhde(data.suhde));

  const yla = pohjaSolmu('header', 'tk-kokoelma__yla');
  const otsikko = pohjaSolmu('h2', 'tk-kapiteeli tk-kokoelma__otsikko', data.otsikko ?? '');
  if (data.laskuri) otsikko.append(' ', pohjaSolmu('span', 'tk-kokoelma__laskuri', data.laskuri));
  const sulku = pohjaSolmu('button', 'tk-kokoelma__sulku');
  sulku.type = 'button';
  sulku.setAttribute('aria-label', 'Sulje');
  sulku.appendChild(pohjaSulkuKuvake());
  yla.append(otsikko, sulku);
  el.appendChild(yla);

  let auki = false;
  let kuvanakyma = null;
  const pohja = {
    el, tausta, sulku,
    modaali: false,
    get auki() { return auki; },
    get kuvanakyma() { return kuvanakyma; },
    avaa() {
      if (auki) return pohja;
      auki = true;
      requestAnimationFrame(() => { el.classList.remove('tk-piilossa'); tausta.classList.remove('tk-piilossa'); });
      if (!esikatselu) pohjaPinoon(pohja);
      return pohja;
    },
    sulje() {
      if (!auki) return;
      auki = false;
      kuvanakyma?.sulje();
      el.classList.add('tk-piilossa');
      tausta.classList.add('tk-piilossa');
      pohjaPinosta(pohja);
      sulje?.(pohja);
    },
    /** Avaa osion avoimet kuvat kuvanäkymään kohdasta `kohdalla`. */
    avaaKuva(kuvat, kohdalla = 0) {
      kuvanakyma?.sulje();
      kuvanakyma = galleriaKuvanakyma(kuvat, kohdalla, () => { kuvanakyma = null; sulku.focus?.({ preventScroll: true }); });
      (el.parentNode ?? document.body).appendChild(kuvanakyma.el);
      kuvanakyma.avaa();
      return kuvanakyma;
    },
  };
  sulku.addEventListener('click', (e) => { e.stopPropagation(); pohja.sulje(); });
  tausta.addEventListener('click', () => pohja.sulje());

  for (const osio of data.osiot) {
    const lohko = pohjaSolmu('section', 'tk-kokoelma__osio');
    const nimi = pohjaSolmu('h3', 'tk-kapiteeli tk-kokoelma__osiootsikko', osio.nimi ?? '');
    if (osio.laskuri) nimi.append(' ', pohjaSolmu('span', 'tk-kokoelma__laskuri', osio.laskuri));
    lohko.appendChild(nimi);
    const ruudukko = pohjaSolmu('div', 'tk-kokoelma__ruudukko');
    const avoimet = (osio.ruudut ?? []).filter((r) => !r.lukossa);
    for (const ruutu of osio.ruudut ?? []) {
      if (ruutu.lukossa) {
        const lukossa = pohjaSolmu('div', 'tk-kokoelma__vedos tk-kokoelma__vedos--lukossa');
        lukossa.setAttribute('aria-hidden', 'true');
        lukossa.appendChild(pohjaSolmu('span', 'tk-kokoelma__kuva'));
        ruudukko.appendChild(lukossa);
        continue;
      }
      const vedos = pohjaSolmu('button', 'tk-kokoelma__vedos');
      vedos.type = 'button';
      vedos.setAttribute('aria-label', `${ruutu.suuri?.otsikko || ruutu.nimi || ''} — katso isona`.trim());
      const kehys = pohjaSolmu('span', 'tk-kokoelma__kuva');
      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      // Pikkukuva ensin, sitten varaosoite; kumpikin puuttuu → tyhjä kehys nimen kanssa (ruutu ei katoa).
      img.addEventListener('error', function virhe() {
        if (ruutu.vara && img.src !== new URL(ruutu.vara, document.baseURI).href) { img.src = ruutu.vara; return; }
        img.removeEventListener('error', virhe);
        img.remove();
        vedos.classList.add('tk-kokoelma__vedos--kuvaton');
      });
      img.src = ruutu.kuva;
      kehys.appendChild(img);
      vedos.append(kehys, pohjaSolmu('span', 'tk-kokoelma__nimi', ruutu.nimi ?? ''));
      const kohdalla = avoimet.indexOf(ruutu);
      vedos.addEventListener('click', () => {
        avattu?.(ruutu);
        pohja.avaaKuva(avoimet, kohdalla);
      });
      ruudukko.appendChild(vedos);
    }
    lohko.appendChild(ruudukko);
    el.appendChild(lohko);
  }
  if (esikatselu) {
    el.classList.add('tk-kokoelma--esikatselu');
    el.classList.remove('tk-piilossa');
  }
  return pohja;
}

/**
 * GALLERIAN KUVANÄKYMÄ: KUVANÄKYMÄ-pohja, jossa yksi kuva kerrallaan (object-fit contain) ja kuvateksti alhaalla.
 * Selaus ‹ › -reunakaistoilla (sisällön omat ohjaimet, ei OHJAUSNAPPEJA), vaakavedolla ja nuolinäppäimillä.
 */
function galleriaKuvanakyma(kuvat, kohdalla, suljettu) {
  const nimi = kuvat[kohdalla]?.suuri?.otsikko || kuvat[kohdalla]?.nimi || 'Kuva';
  const pohja = luoPohjaKuvanakyma({ nimi, sulje: () => {
    document.removeEventListener('keydown', nuolet);
    // Häivytys (kesto-sulku) loppuun ennen poistoa.
    setTimeout(() => pohja.el.remove(), 250);
    suljettu?.();
  } });
  pohja.el.classList.add('tk-kokoelma-kuvanakyma');
  const img = document.createElement('img');
  img.className = 'tk-kokoelma-kuvanakyma__kuva';
  img.alt = '';
  img.decoding = 'async';
  const teksti = pohjaSolmu('div', 'tk-kokoelma-kuvanakyma__teksti');
  pohja.sisalto.append(img, teksti);
  let i = kohdalla;
  const nayta = (uusi) => {
    i = (uusi + kuvat.length) % kuvat.length;
    const k = kuvat[i];
    const suuri = k.suuri ?? {};
    img.src = suuri.url || k.vara || k.kuva;
    img.alt = suuri.otsikko || k.nimi || '';
    pohja.el.setAttribute('aria-label', img.alt || 'Kuva');
    teksti.replaceChildren();
    if (suuri.otsikko || k.nimi) teksti.appendChild(pohjaSolmu('p', 'tk-kokoelma-kuvanakyma__otsikko', suuri.otsikko || k.nimi));
    if (suuri.kuvateksti) teksti.appendChild(pohjaSolmu('p', 'tk-kokoelma-kuvanakyma__kuvateksti', suuri.kuvateksti));
    if (suuri.lahde) teksti.appendChild(pohjaSolmu('p', 'tk-lahde', suuri.lahde));
    if (kuvat.length > 1) teksti.appendChild(pohjaSolmu('p', 'tk-kokoelma-kuvanakyma__laskuri', `${i + 1}/${kuvat.length}`));
  };
  if (kuvat.length > 1) {
    for (const [suunta, merkki, luokka] of [[-1, '‹', 'edellinen'], [1, '›', 'seuraava']]) {
      const kaista = pohjaSolmu('button', `tk-kokoelma-kuvanakyma__kaista tk-kokoelma-kuvanakyma__kaista--${luokka}`, merkki);
      kaista.type = 'button';
      kaista.setAttribute('aria-label', suunta < 0 ? 'Edellinen kuva' : 'Seuraava kuva');
      kaista.addEventListener('click', (e) => { e.stopPropagation(); nayta(i + suunta); });
      pohja.sisalto.appendChild(kaista);
    }
    let alku = null;
    pohja.sisalto.addEventListener('pointerdown', (e) => { alku = { x: e.clientX, y: e.clientY }; });
    pohja.sisalto.addEventListener('pointerup', (e) => {
      if (!alku) return;
      const dx = e.clientX - alku.x, dy = e.clientY - alku.y;
      alku = null;
      if (Math.abs(dx) > POHJA_VETO_PX && Math.abs(dx) > 2 * Math.abs(dy)) nayta(i + (dx < 0 ? 1 : -1));
    });
  }
  function nuolet(e) {
    if (!pohja.auki || kuvat.length < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); nayta(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); nayta(i - 1); }
  }
  document.addEventListener('keydown', nuolet);
  nayta(kohdalla);
  return pohja;
}
