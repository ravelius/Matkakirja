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
 * Data on KorttiData (js/pohjat/korttidata.js), tyylit css/pohjat.css (vain --tk-*-tokenit). Natiivi tekee saman
 * Pohja.cs:llä samasta datasta (Natiivi-UI); kuvapari tehdään samasta nostosta (Ateena/Akropolis).
 *
 * SULKU (yksi pino, kohta 5): Esc sulkee ylimmän pohjan; NOSTOKORTTI myös veto alas ja ohinapautus (ei ✕),
 * ei-modaali KORTTI Takaisin + ohinapautus + Esc, modaali KORTTI vain napeilla. Animaatiot ≤ 250 ms (kohta 6).
 */
import { tarkistaKorttiData } from './korttidata.js';
import { tarkistaPaneeliData } from './paneelidata.js';

const POHJA_TYYLIN_TUNNUS = 'pohjat-tyyli';
const POHJA_VETO_PX = 40;
/** Kortin jatkeet, joiden napautus ei ole ohinapautus: Pulun chat ja -nappi sekä pohjan KORTTI (esim. visa). */
const POHJA_EI_OHINAPAUTUS = '.pollo-paneeli, .pollo-nappi, .tk-kortti-tausta';
/** Avoimet pohjat avausjärjestyksessä: Esc sulkee ylimmän (yksi sulkupino). */
const pohjaPino = [];

/** css/pohjat.css kerran (yhden tiedoston versiossa tyylit ovat jo sivulla). */
export function pohjatLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(POHJA_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = POHJA_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('pohjat.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

function pohjaSolmu(tagi, luokka, teksti) {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

function pohjaKuva(kuva, luokka, kuvaAuki = null, indeksi = 0) {
  const kehys = pohjaSolmu('figure', `tk-kuva ${luokka}`);
  const img = document.createElement('img');
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
  if (hero) isa.appendChild(pohjaKuva(hero, 'tk-kuva--hero', kuvaAuki, d.kuvat.indexOf(hero)));
  else if (d.otsikko) isa.appendChild(pohjaSolmu('hr', 'tk-viiva'));
  if (galleria.length) {
    const nauha = pohjaSolmu('div', 'tk-galleria');
    galleria.forEach((k, i) => {
      const b = pohjaSolmu('button');
      b.type = 'button';
      b.setAttribute('aria-label', k.kuvateksti || `Kuva ${i + 2}`);
      const img = document.createElement('img');
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
