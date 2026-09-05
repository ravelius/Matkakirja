/*
 * ILMEPAKETTI — muste piirtyy, viiva heiluu, kynä alleviivaa.
 *
 * OMISTAJAN PÄÄTÖS 5.9.2026 (kirjastokartoituksen
 * docs/raportit/valmiit-palikat-2026-09-04.md TOP 6, kohta 6, järjestys
 * *"Tee 2. Ensin"* → *"Sitten 5. Sitten 6. Ja 3."*): Vivus 0.4.6 +
 * Rough.js 4.6.6 + rough-notation 0.5.1 (kaikki MIT). Kartoituksen
 * sanoin: *"Muste piirtyy, viivat heiluvat käsin piirretyn tavoin,
 * pöllön korostus on kynällä ympyröity. Halvin tapa nostaa koko pelin
 * visuaalista tasoa ilman että mikään rakenne muuttuu."*
 *
 * KOLME KIRJASTOA, KOLME APURIA, KOLME LIPPUA:
 *
 *   piirraMusteviiva  Vivus: olemassa olevat SVG-polut piirtyvät kuin
 *                     kynällä (stroke-dasharray-animaatio). Käyttö:
 *                     matkareitit (js/ui.js paivitaMatkareitit).
 *   karheaKehys       Rough.js: käsin piirretyn näköinen kehys PIENEEN
 *   karheaViiva       koristeeseen (selitteen laatikko, kortin kehys).
 *                     EI kartan reitteihin eikä linssikerrokseen —
 *                     Rough.js kolminkertaistaa elementtimäärän, ja
 *                     linssikerroksen katto on 400 elementtiä
 *                     (docs/moduulit/linssit.md 1.7).
 *   korosta           rough-notation: kynän alleviivaus tai ympyröinti
 *                     tekstille animoituna (pöllön lehtivinkki, sähkeen
 *                     kysymysrivi).
 *
 * Liput 'musteviiva', 'karhea' ja 'korostus' ovat laitteen omia
 * asetuksia (localStorage, sama kaava kuin js/ui-apurit.js:n
 * kehittäjäkytkimillä): puuttuva avain = päällä, '0' = pois.
 * Kehittäjävalikon "ilme"-kytkin (index.html, js/main.js) kääntää
 * kaikki kolme kerralla; yksittäisen lipun voi sammuttaa avaimella
 * matkakirja-ilme-<lippu> = '0'.
 *
 * ── SÄÄNNÖT KAIKILLE VALMIILLE KIRJASTOILLE (Raamattu, VALMIIT
 * KIRJASTOT: STPAGEFLIP ENSIN; kartoituksen luku 10) ────────────────
 *
 *   1. Kirjastot tulevat ämpärin vendor/-polusta (workflow vie-vendor),
 *      eivät reposta eivätkä CDN:stä tuotannossa.
 *   2. Laiska lataus ja virhehaara kuten js/pallo.js lataaPallokirjasto:
 *      kirjaston puuttuminen (offline) ei kaada peliä — jokainen apuri
 *      palauttaa silloin null/false, ja kutsuja jättää vanhan
 *      toteutuksen (CSS-korostus, valmis reitti, tavallinen kehys)
 *      voimaan. Ilman kirjastoa peli näyttää täsmälleen entiseltä.
 *   3. Lisenssitekstit ovat ämpärissä kirjaston rinnalla
 *      (vendor/<nimi>.LICENSE.txt) ja maininta pelin lähdesivulla
 *      (js/lahteet.js, README.md).
 *   4. prefers-reduced-motion sammuttaa liikkeen: musteviiva on heti
 *      valmis, korostus piirtyy ilman animaatiota.
 *   5. Linssisopimus pätee: tämä moduuli ei koske linssikerrokseen
 *      (js/linssit/kerros.js) eikä kartan kameraan (js/kartta.js).
 *      Reitin musteviiva on kertaluonteinen attribuutti olemassa
 *      olevalle polulle, ei jatkuva animaatio.
 *   6. Yhden tiedoston versio (dist/) jää ilman kirjastoja: se
 *      tunnistetaan siitä, ettei sivulla ole moduuliskriptiä, eikä
 *      latausta edes yritetä.
 *
 * Tämä moduuli ei tuo mitään muuta kuin peilin juuren (js/media.js),
 * joten se niputtuu ensimmäisten joukossa eikä muodosta kehää.
 */

import { PEILI_JUURI } from './media.js';

/** Ämpärin juuri — sama kuin kuvien ja äänien peilillä. */
export const ILME_JUURI = PEILI_JUURI;

/**
 * Kirjastot ämpärin vendor/-polussa. Kaikki ovat UMD/IIFE-paketteja,
 * jotka jättävät yhden globaalin; `globaali` on se nimi, jonka
 * olemassaolo kertoo latauksen onnistuneen.
 */
export const ILME_KIRJASTOT = Object.freeze({
  vivus: { osoite: `${ILME_JUURI}vendor/vivus-0.4.6.min.js`, globaali: 'Vivus' },
  rough: { osoite: `${ILME_JUURI}vendor/rough-4.6.6.js`, globaali: 'rough' },
  notation: { osoite: `${ILME_JUURI}vendor/rough-notation-0.5.1.iife.js`, globaali: 'RoughNotation' },
});

/** Liput ja niiden kirjastot: lippu pois = kirjastoa ei edes ladata. */
export const ILME_LIPUT = Object.freeze({
  musteviiva: 'vivus',
  karhea: 'rough',
  korostus: 'notation',
});

export const ILME_AVAIN = 'matkakirja-ilme-';

/**
 * Epäonnistuneen latauksen jälkeen uutta yritystä ei tehdä tätä
 * useammin: offline-pelissä jokainen reitti ja kortti kysyisi muuten
 * kirjastoa uudestaan, ja jokainen kysely on turha verkkovirhe.
 */
export const ILME_UUSINTAVIIVE_MS = 60_000;

/* ---------- liput ---------- */

const lippuMuisti = new Map();

/** Lippu päällä? Puuttuva avain = päällä; vain '0' sammuttaa. */
export function ilmePaalla(lippu) {
  if (!(lippu in ILME_LIPUT)) return false;
  if (lippuMuisti.has(lippu)) return lippuMuisti.get(lippu);
  let paalla = true;
  try {
    paalla = localStorage.getItem(ILME_AVAIN + lippu) !== '0';
  } catch {
    paalla = true; // yksityinen selaus: oletus on päällä
  }
  lippuMuisti.set(lippu, paalla);
  return paalla;
}

export function asetaIlme(lippu, paalla) {
  if (!(lippu in ILME_LIPUT)) return;
  lippuMuisti.set(lippu, Boolean(paalla));
  try {
    if (paalla) localStorage.removeItem(ILME_AVAIN + lippu);
    else localStorage.setItem(ILME_AVAIN + lippu, '0');
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

/** Koko paketti päällä = jokainen lippu päällä (kehittäjävalikon kytkin). */
export function ilmePakettiPaalla() {
  return Object.keys(ILME_LIPUT).every(ilmePaalla);
}

export function asetaIlmePaketti(paalla) {
  for (const lippu of Object.keys(ILME_LIPUT)) asetaIlme(lippu, paalla);
}

/** Lippujen ja latausten muisti tyhjäksi (testit, kytkimen vaihto). */
export function nollaaIlmeMuisti() {
  lippuMuisti.clear();
  for (const nimi of Object.keys(ILME_KIRJASTOT)) {
    lataukset.delete(nimi);
    epaonnistumiset.delete(nimi);
  }
}

/* ---------- ympäristö ---------- */

/** Liikettä vähentävä järjestelmäasetus: liike pois, lopputulos heti. */
export function ilmeLiikeVahennetty(ikkuna = globalThis) {
  try {
    return Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  } catch {
    return false;
  }
}

/**
 * Yhden tiedoston versio (tools/build-standalone.mjs) korvaa
 * moduuliskriptin tavallisella skriptillä. Ilman moduuliskriptiä
 * kirjastoja ei ladata — dist/ jää ilman niitä kuten linssejäkin.
 */
export function yhdenTiedostonVersio(doc = globalThis.document) {
  if (!doc?.querySelector) return false;
  try {
    return !doc.querySelector('script[type="module"]');
  } catch {
    return false;
  }
}

/* ---------- laiska lataus ---------- */

const lataukset = new Map();
const epaonnistumiset = new Map();

/**
 * Lataa yhden kirjaston kerran skriptinä; toinen kutsuja saa saman
 * lupauksen. Virhe hylkää lupauksen ja jättää jäähyn
 * (ILME_UUSINTAVIIVE_MS), jonka jälkeen latausta yritetään uudestaan.
 *
 * @param {'vivus'|'rough'|'notation'} nimi
 * @returns {Promise<any>} kirjaston globaali
 */
export function lataaIlmeKirjasto(nimi, doc = globalThis.document, nyt = Date.now) {
  const kirjasto = ILME_KIRJASTOT[nimi];
  if (!kirjasto) return Promise.reject(new Error(`tuntematon kirjasto: ${nimi}`));
  if (globalThis[kirjasto.globaali]) return Promise.resolve(globalThis[kirjasto.globaali]);
  if (lataukset.has(nimi)) return lataukset.get(nimi);
  const jaahy = epaonnistumiset.get(nimi);
  if (jaahy && nyt() - jaahy < ILME_UUSINTAVIIVE_MS) {
    return Promise.reject(new Error(`${nimi}: kirjasto ei latautunut (jäähy)`));
  }
  if (!doc?.createElement) return Promise.reject(new Error('ei dokumenttia'));
  const lupaus = new Promise((ok, ei) => {
    const s = doc.createElement('script');
    s.src = kirjasto.osoite;
    s.async = true;
    s.addEventListener('load', () => {
      const g = globalThis[kirjasto.globaali];
      if (g) { ok(g); return; }
      lataukset.delete(nimi);
      epaonnistumiset.set(nimi, nyt());
      ei(new Error(`${nimi}: globaali ${kirjasto.globaali} puuttuu`));
    });
    s.addEventListener('error', () => {
      lataukset.delete(nimi);
      epaonnistumiset.set(nimi, nyt());
      s.remove?.();
      ei(new Error(`${nimi}: kirjasto ei latautunut`));
    });
    (doc.head ?? doc.body ?? doc).appendChild(s);
  });
  lataukset.set(nimi, lupaus);
  return lupaus;
}

/**
 * Lipun kirjasto tai null. Tämä on virhehaara yhdessä paikassa: lippu
 * pois, yhden tiedoston versio, verkkovirhe ja puuttuva globaali
 * palauttavat kaikki null, eikä kutsujan tarvitse erottaa niitä.
 */
export function ilmeKirjasto(lippu, doc = globalThis.document) {
  if (!ilmePaalla(lippu)) return Promise.resolve(null);
  if (yhdenTiedostonVersio(doc)) return Promise.resolve(null);
  return lataaIlmeKirjasto(ILME_LIPUT[lippu], doc).catch(() => null);
}

/**
 * Esilataus joutilaana (js/main.js): ensimmäinen reitti ja ensimmäinen
 * kortti saavat kirjastonsa valmiina eivätkä piirry ilman ilmettä.
 * Vain päällä olevat liput; virheet niellään.
 */
export function esilataaIlme(doc = globalThis.document) {
  return Promise.all(Object.keys(ILME_LIPUT).map((lippu) => ilmeKirjasto(lippu, doc)));
}

/* ---------- apurit ---------- */

const ILME_SVG_NS = 'http://www.w3.org/2000/svg';

/** Pelin musteet: sama kynä kuin reiteillä ja pöllön korostuksilla. */
export const ILME_MUSTE = '#4a3a24';
export const ILME_POLLON_MUSTE = '#7a5514';

/**
 * MUSTEVIIVA: kerroksen `path`-elementit piirtyvät kynällä alusta
 * loppuun. Kertaluonteinen: piirtyy vain, kun polut ovat uudet
 * (tunniste = polkujen d-attribuutit), ei joka piirrolla.
 *
 * KYNÄ PIIRTÄÄ KOPIOON, EI ALKUPERÄISEEN. Vivus animoi stroke-
 * dasharrayta ja muuttaa ympyrät poluiksi, joten pelin omat polut
 * (katkoviiva, askelpisteet) jätetään rauhaan: niistä otetaan
 * väliaikainen kopio ryhmään g.ilme-muste, jonka Vivus piirtää
 * yhtenäisenä musteviivana, ja alkuperäiset pidetään näkymättöminä
 * (kerroksen data-musteviiva = 'piirtyy'). Kun kynä on perillä,
 * alkuperäiset häivytetään esiin ja kopio pois (data-musteviiva =
 * 'valmis'; siirtymät css/styles.css), ja kopio poistetaan. DOM on
 * animaation jälkeen täsmälleen entinen.
 *
 * Animoidaan vain, jos kirjasto on JO ladattu: muuten polut ehtisivät
 * näkyä ennen piirtoa ja vilkkuisivat. Ensimmäinen kutsu käynnistää
 * latauksen seuraavia varten (js/main.js esilataa ne joutilaana).
 *
 * @param {Element} kerros SVG-ryhmä, jossa reittipolut ovat
 * @param {{ kesto?: number, doc?: Document }} [asetukset] kesto ms
 * @returns {boolean} alkoiko kynän piirto
 */
export function piirraMusteviiva(kerros, { kesto = 520, doc = globalThis.document } = {}) {
  if (!kerros?.querySelectorAll) return false;
  const polut = [...kerros.querySelectorAll(':scope > path')];
  const tunniste = polut.map((p) => p.getAttribute('d') ?? '').join('|');
  if (!polut.length) {
    // Tyhjä kerros: seuraava ilmestyminen on taas uusi.
    delete kerros.dataset?.ilmeReitit;
    delete kerros.dataset?.musteviiva;
    return false;
  }
  if (kerros.dataset?.ilmeReitit === tunniste) return false;
  if (kerros.dataset) {
    kerros.dataset.ilmeReitit = tunniste;
    delete kerros.dataset.musteviiva;
  }
  if (!ilmePaalla('musteviiva') || ilmeLiikeVahennetty()) return false;
  const Vivus = globalThis[ILME_KIRJASTOT.vivus.globaali];
  if (!Vivus) {
    ilmeKirjasto('musteviiva', doc);
    return false;
  }
  // Edellinen kynä seis ja sen kopio pois, jos uudet polut tulivat kesken.
  kerros._ilmeVivus?.stop?.();
  kerros.querySelector(':scope > g.ilme-muste')?.remove();
  const kopio = doc.createElementNS(ILME_SVG_NS, 'g');
  kopio.setAttribute('class', 'ilme-muste');
  kopio.setAttribute('pointer-events', 'none');
  for (const polku of polut) {
    const kyna = polku.cloneNode(false);
    kyna.style.strokeDasharray = '';
    kyna.style.strokeDashoffset = '';
    kyna.removeAttribute('id');
    kopio.appendChild(kyna);
  }
  kerros.appendChild(kopio);
  let valmis = false;
  const perilla = () => {
    if (valmis) return;
    valmis = true;
    kerros._ilmeVivus = null;
    if (kerros.dataset?.musteviiva === 'piirtyy') kerros.dataset.musteviiva = 'valmis';
    kopio.classList.add('ilme-muste-pois');
    setTimeout(() => kopio.remove(), 320);
  };
  try {
    kerros.dataset.musteviiva = 'piirtyy';
    // Vivuksen kesto on kehyksiä (60/s): pehmeä kiihdytys ja jarrutus.
    kerros._ilmeVivus = new Vivus(kopio, {
      type: 'oneByOne',
      duration: Math.max(6, Math.round(kesto / (1000 / 60))),
      start: 'autostart',
      animTimingFunction: Vivus.EASE,
    }, perilla);
    return true;
  } catch (syy) {
    console.warn('Musteviiva jäi piirtymättä:', syy);
    perilla();
    return false;
  }
}

/**
 * KOROSTA SISÄLTÖ: kääri elementin kaikki lapset yhteen <span
 * class="ilme-sisalto">-elementtiin ja korosta se. Lohkoelementin
 * (esim. <p>) alleviivaus seuraisi laatikon leveyttä; span antaa
 * rough-notationille tekstin omat rivilaatikot (multiline), joten kyna
 * kulkee tekstin alla eikä lomakkeen laidasta laitaan.
 */
export function korostaSisalto(elementti, asetukset = {}) {
  if (!elementti?.childNodes) return Promise.resolve(null);
  const doc = asetukset.doc ?? elementti.ownerDocument ?? globalThis.document;
  let kohta = elementti.querySelector?.(':scope > .ilme-sisalto');
  if (!kohta) {
    kohta = doc.createElement('span');
    kohta.className = 'ilme-sisalto';
    kohta.append(...elementti.childNodes);
    elementti.appendChild(kohta);
  }
  return korosta(kohta, { ...asetukset, doc });
}

/**
 * KARHEA KEHYS: käsin piirretty suorakaide HTML-elementin reunoille.
 * Piirretään omaan <svg>-kerrokseen elementin sisälle (luokka
 * ilme-karhea, tarttuu vieritettävän laatikon yläreunaan) ja piirretään
 * uudestaan, kun laatikon koko muuttuu. Elementti saa luokan
 * ilme-karhea-kehys, jolla CSS riisuu oman reunaviivansa.
 *
 * Roughness ja bowing pieniä (omistajan rajaus: 1873:n käsin piirretty,
 * ei sarjakuva).
 *
 * @returns {Promise<{ paivita: () => void, poista: () => void } | null>}
 */
export function karheaKehys(kohde, {
  roughness = 0.9, bowing = 0.6, vari = ILME_MUSTE, paksuus = 1.1, sade = 0, reunus = 1.5, doc = globalThis.document,
} = {}) {
  if (!kohde?.appendChild) return Promise.resolve(null);
  return ilmeKirjasto('karhea', doc).then((rough) => {
    if (!rough || !kohde.isConnected) return null;
    kohde.querySelector?.(':scope > svg.ilme-karhea')?.remove();
    const svg = doc.createElementNS(ILME_SVG_NS, 'svg');
    svg.setAttribute('class', 'ilme-karhea');
    svg.setAttribute('aria-hidden', 'true');
    kohde.insertBefore(svg, kohde.firstChild);
    kohde.classList?.add('ilme-karhea-kehys');
    const rc = rough.svg(svg);
    let mitat = '';
    const paivita = () => {
      if (!svg.isConnected) return;
      const w = kohde.clientWidth;
      const h = kohde.clientHeight;
      if (!(w > 0 && h > 0)) return;
      // Svg on isännän sisällön alussa (pehmusteen sisäpuolella): kehys
      // piirretään pehmusteen verran ulommas, isännän reunaviivan kohdalle.
      const tyyli = globalThis.getComputedStyle?.(kohde);
      const px = parseFloat(tyyli?.paddingLeft) || 0;
      const py = parseFloat(tyyli?.paddingTop) || 0;
      const avain = `${w}x${h}@${px},${py}`;
      if (avain === mitat) return;
      mitat = avain;
      svg.replaceChildren();
      const asetukset = {
        roughness, bowing, stroke: vari, strokeWidth: paksuus, fill: 'none', seed: 7,
      };
      const x = reunus - px;
      const y = reunus - py;
      const lw = w - 2 * reunus;
      const lh = h - 2 * reunus;
      if (sade > 0) {
        const r = Math.min(sade, lw / 2, lh / 2);
        const d = `M${x + r},${y} h${lw - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${lh - 2 * r} `
          + `a${r},${r} 0 0 1 -${r},${r} h-${lw - 2 * r} a${r},${r} 0 0 1 -${r},-${r} v-${lh - 2 * r} `
          + `a${r},${r} 0 0 1 ${r},-${r} z`;
        svg.appendChild(rc.path(d, asetukset));
      } else {
        svg.appendChild(rc.rectangle(x, y, lw, lh, asetukset));
      }
    };
    paivita();
    let tarkkailija = null;
    if (typeof ResizeObserver === 'function') {
      tarkkailija = new ResizeObserver(() => paivita());
      tarkkailija.observe(kohde);
    }
    const poista = () => {
      tarkkailija?.disconnect();
      svg.remove();
      kohde.classList?.remove('ilme-karhea-kehys');
    };
    return { paivita, poista, svg };
  });
}

/**
 * KARHEA VIIVA: yksi käsin piirretty viiva annettuun SVG:hen (pieni
 * koriste: otsikon alleviivaus, selitteen jakoviiva). Palauttaa
 * lisätyn solmun tai null.
 */
export function karheaViiva(svg, x1, y1, x2, y2, {
  roughness = 0.9, bowing = 0.5, vari = ILME_MUSTE, paksuus = 1, doc = globalThis.document,
} = {}) {
  if (!svg?.appendChild) return Promise.resolve(null);
  return ilmeKirjasto('karhea', doc).then((rough) => {
    if (!rough || !svg.isConnected) return null;
    const solmu = rough.svg(svg).line(x1, y1, x2, y2, {
      roughness, bowing, stroke: vari, strokeWidth: paksuus, seed: 7,
    });
    solmu.setAttribute('class', 'ilme-karhea-viiva');
    svg.appendChild(solmu);
    return solmu;
  });
}

/**
 * KOROSTUS: kynän alleviivaus, ympyröinti tai laatikko tekstille
 * (rough-notation). Elementti saa luokan ilme-korostettu, jolla CSS
 * riisuu vanhan korostuksen (lappu, alleviivaus) — ilman kirjastoa
 * luokkaa ei tule ja vanha korostus jää.
 *
 * @param {Element} elementti
 * @param {{ tyyppi?: 'underline'|'circle'|'box', vari?: string,
 *   kesto?: number, paksuus?: number, tayte?: number|number[],
 *   monirivinen?: boolean, doc?: Document }} [asetukset]
 * @returns {Promise<{ poista: () => void, annotaatio: any } | null>}
 */
export function korosta(elementti, {
  tyyppi = 'underline', vari = ILME_POLLON_MUSTE, kesto = 600, paksuus = 1.4, tayte = 2,
  monirivinen = true, doc = globalThis.document,
} = {}) {
  if (!elementti?.classList) return Promise.resolve(null);
  return ilmeKirjasto('korostus', doc).then((RoughNotation) => {
    if (!RoughNotation?.annotate || !elementti.isConnected) return null;
    // Sama kohta korostetaan vain kerran.
    elementti._ilmeKorostus?.remove?.();
    const liike = !ilmeLiikeVahennetty();
    try {
      const annotaatio = RoughNotation.annotate(elementti, {
        type: tyyppi,
        color: vari,
        strokeWidth: paksuus,
        padding: tayte,
        multiline: monirivinen,
        iterations: 1,
        animate: liike,
        animationDuration: liike ? kesto : 0,
      });
      annotaatio.show();
      elementti.classList.add('ilme-korostettu');
      elementti._ilmeKorostus = annotaatio;
      const poista = () => {
        annotaatio.remove();
        elementti.classList.remove('ilme-korostettu');
        elementti._ilmeKorostus = null;
      };
      return { poista, annotaatio };
    } catch (syy) {
      console.warn('Korostus jäi piirtymättä:', syy);
      return null;
    }
  });
}

/**
 * KOROSTA SANA: kääri elementin tekstistä ensimmäinen `sana` omaan
 * <span class="ilme-sana">-elementtiin ja korosta se. Teksti ei muutu
 * (textContent on sama), joten omistajan sanamuoto säilyy. Ilman
 * kirjastoa span jää tyylittömänä, mikä ei näy.
 *
 * @returns {Promise<{ poista: () => void } | null>}
 */
export function korostaSana(elementti, sana, asetukset = {}) {
  if (!elementti?.childNodes || !sana) return Promise.resolve(null);
  const doc = asetukset.doc ?? elementti.ownerDocument ?? globalThis.document;
  let kohta = elementti.querySelector?.('.ilme-sana');
  if (!kohta) {
    for (const solmu of [...elementti.childNodes]) {
      if (solmu.nodeType !== 3) continue;
      const alku = solmu.data.indexOf(sana);
      if (alku < 0) continue;
      const jalki = doc.createTextNode(solmu.data.slice(alku + sana.length));
      kohta = doc.createElement('span');
      kohta.className = 'ilme-sana';
      kohta.textContent = sana;
      solmu.data = solmu.data.slice(0, alku);
      solmu.parentNode.insertBefore(jalki, solmu.nextSibling);
      solmu.parentNode.insertBefore(kohta, jalki);
      break;
    }
  }
  if (!kohta) return Promise.resolve(null);
  return korosta(kohta, { ...asetukset, doc });
}
