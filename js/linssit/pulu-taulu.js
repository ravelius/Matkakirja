/*
 * PULUN TAULU ASTRONAUTIN KAMERASSA — linssin moodit yhdessä paikassa.
 *
 * OMISTAJA 28.9.2026, sanatarkasti: *"Pulu voisi esitellä taulun linssin
 * alussa jossa eri vaihtoehdot esim. Meno ISS:n sisälle sekä muut ja sen
 * taulun saisi aina esille napauttamalla pulua"* — ja tarkennus samana
 * iltana: *"Älä lisää tauluun iss:n sisällä tapahtuvia vaihtoehtoja.
 * Ainoastaan eri moodien välillä liikkumiset"*. Päätoimittaja: web ensin.
 *
 * TAULUSSA OVAT VAIN LINSSIN MOODIT (koodista luettuina):
 *
 *   pallo     Maapallo avaruudesta — kaukonäkymä, ISS-kyydin TILA.kauko
 *   seuranta  ISS:n rinnalla — kyydin TILA.seuranta (asema 3D-mallina)
 *   ikkuna    ISS:n sisälle — kyydin TILA.ikkuna (Cupola); myös TILA.kohde
 *             (ylilento) on aseman sisältä katsomista, joten sama rivi
 *             näkyy silloin valittuna
 *   kuvat     Astronauttien kuvat — kuvaselain (havaintokortti), lähimmän
 *             kohteen oletuskuva, josta ‹ › ja pyyhkäisy jatkavat
 *
 * EI TAULUUN (omistajan tarkennus): Lennä kohteen ylle, ajan nopeutus,
 * NASA-koe ja muut kyydin säätimet kuuluvat ISS:n omaan säätöpaneeliin
 * (js/linssit/iss-kyyti-nakyma.js ohjaimet). "Oma sijainti" -toimintoa ei
 * ole linssissä. Pulun chatti ei ole moodi: pallonäkymässä Pulun napautus
 * avaa nyt taulun, ja valokuvan oma minipulu pitää kohdekohtaisen chatin.
 *
 * NYKYINEN MOODI ON VALITTUNA. Valinta vie moodista toiseen samoilla
 * kahvoilla kuin pelaajan omat eleet (ISS:n napautus, kyydin ✕, pisteen
 * napautus, kuvan ✕), eikä rinnakkaista polkua synny: esim. pallo →
 * ISS:n sisälle on kaksi napautusta (kauko → seuranta → ikkuna), ja
 * jälkimmäinen odottaa ensimmäisen lennon loppuun.
 *
 * ── PULU EI PUHU PÄÄLLEKKÄIN ─────────────────────────────────────────
 *
 *  • ENSIMMÄINEN AVAUS: tervetulo A1–C2 (js/linssit/pulu-tervetulo.js)
 *    soi kuten ennen. Taulu tulee vasta, kun jakso on valmis tai ohitettu
 *    — C2:n "Pyöritä sinä…" -luovutuksen jälkeen, TAULUN_HENGAHDYS_MS:n
 *    päästä.
 *  • MYÖHEMMÄT AVAUKSET: taulu tulee heti, kun musta verho on poissa,
 *    ilman puhetta. Uusia ääniä ei generoitu, eikä olemassa olevista
 *    repliikeistä yksikään kerro taulusta.
 *  • AUTOMAATTINEN AVAUS ODOTTAA: jos Livia puhuu (joku muu kupla), taulu
 *    tulee vasta kun puhe on ohi — se ei koskaan keskeytä Liviaa itse.
 *  • NAPAUTUS VAIENTAA: pelaajan napautus Puluun on pyyntö juuri nyt, joten
 *    taulu aukeaa heti ja kesken oleva puhe vaikenee (sama vaikeneminen
 *    kuin tervetulon ohituksella). Odottaminen jättäisi napautuksen
 *    vastaamatta jopa kymmeneksi sekunniksi, ja taulu on äänetön, joten
 *    päällekkäistä puhetta ei synny kummassakaan.
 *  • Automaattista avausta ei tule, jos pelaaja on jo ehtinyt valokuvaan
 *    tai kyytiin: hän on silloin jo valinnut.
 *
 * MYKISTYS ja VÄHENNÄ LIIKETTÄ: taulu on sovelluksen tekstiä eikä soita
 * mitään, joten mykistys ei muuta sitä (tervetulo jää mykistettynä pois,
 * ja taulu tulee heti). Vähennä liikettä poistaa taulun häivytyksen ja
 * siirtymät (kyyti ja kamera noudattavat omaa `reduced`-lippuaan).
 *
 * MODULAARISUUS (Codexin ISS-säätöpaneelin elementit, tilaus
 * posti/fable-codex-iss-saatopaneeli-20260928.md): rivit ovat DATAA
 * (ASTRO_TAULUN_RIVIT), ja DOM on elementtityypeittäin luokiteltu —
 * .astro-paneeli (9-slice-pohja), .astro-paneeli-otsikko, .astro-sulku,
 * .astro-paneeli-rivi + .astro-painike (valikkorivi) — joten sen voi
 * myöhemmin pukea valmiisiin elementteihin muuttamatta logiikkaa. Tyylit:
 * css/satelliitti.css, lohko "PULUN TAULU", muuttujat --astro-paneeli-*.
 */

import { pysaytaLivianAani } from '../liviapuhe.js';
import { polloKuplatPois } from '../pollo.js';
import { pulunIssVahennaLiiketta } from './pulu-iss.js';

/** Hengähdys tervetulon lopusta (tai paljastuksesta) taulun avaukseen. */
export const TAULUN_HENGAHDYS_MS = 600;
/** Kuinka usein automaattinen avaus kysyy tervetulon ja puheen tilaa. */
export const TAULUN_KYSELY_MS = 200;
/** Jos tervetulo tai puhe ei pääty tämän kuluessa, automaattinen avaus jää pois. */
export const TAULUN_KATTO_MS = 90000;
/** Avauksen ja sulun häivytys (omistaja: kevyt, alle 250 ms). */
export const TAULUN_HAIVYTYS_MS = 160;
/** Moodin vaihdon askelväli: siirtymän loppua kysytään näin usein. */
export const MOODIN_ASKEL_MS = 120;
/** Moodin vaihto luovuttaa, jos perille ei päästä tässä ajassa. */
export const MOODIN_KATTO_MS = 15000;
/** Moodin vaihdon toimia enintään (pelaajan oma napautus ei aja kilpaa). */
export const MOODIN_TOIMIA = 4;
/** Taulun otsikko (sovelluksen tekstiä, ei Livian repliikki). */
export const TAULUN_OTSIKKO = 'Minne katsotaan?';

/** Pulun napin valitsin: pelin oma pöllönappi linssin päällä. */
export const PULUN_NAPPI = '.pollo-nappi';

/**
 * NYKYINEN MOODI kahvoista: valokuva auki → 'kuvat'; kyydin tila →
 * 'seuranta' | 'ikkuna' (myös ylilento 'kohde'); muuten 'pallo' (myös
 * paluulento kaukonäkymään, jolloin kyydin tila on jo 'kauko').
 *
 * @param {object} k kahvat (ks. luoAstroTaulu)
 * @returns {'pallo'|'seuranta'|'ikkuna'|'kuvat'}
 */
export function nykyinenMoodi(k) {
  if (k?.kuvaAuki?.()) return 'kuvat';
  const m = kyytiMoodi(k);
  if (m?.tila === 'seuranta') return 'seuranta';
  if (m?.tila === 'ikkuna' || m?.tila === 'kohde') return 'ikkuna';
  return 'pallo';
}

function kyytiMoodi(k) {
  try { return k?.avaruus?.kyytiMoodi?.() ?? null; } catch { return null; }
}

const onKyyti = (k) => kyytiMoodi(k) !== null;

/**
 * TAULUN RIVIT DATANA: { tunnus, otsikko, selite, moodi, saatavilla(k) }.
 * `toiminto` on yhteinen (siirryMoodiin), koska jokainen rivi on moodi.
 * Saatavuus: ISS-rivit vain, kun kyyti on olemassa (pallo ja WebGL);
 * kuvat, kun linssillä on kuvallisia kohteita.
 */
export const ASTRO_TAULUN_RIVIT = Object.freeze([
  Object.freeze({
    tunnus: 'pallo', moodi: 'pallo',
    otsikko: 'Maapallo', selite: 'Koko Maa avaruudesta',
    saatavilla: () => true,
  }),
  Object.freeze({
    tunnus: 'iss-rinnalla', moodi: 'seuranta',
    otsikko: 'ISS:n rinnalla', selite: 'Asema radallaan',
    saatavilla: onKyyti,
  }),
  Object.freeze({
    tunnus: 'iss-sisalle', moodi: 'ikkuna',
    otsikko: 'ISS:n sisälle', selite: 'Cupolan ikkunasta alas',
    saatavilla: onKyyti,
  }),
  Object.freeze({
    tunnus: 'kuvat', moodi: 'kuvat',
    otsikko: 'Astronauttien kuvat', selite: 'Valokuvat avaruudesta',
    saatavilla: (k) => Boolean(k?.kuviaOn?.()),
  }),
]);

/** Rivit tässä tilassa: näkyvät (saatavilla) ja nykyinen moodi valittuna. */
export function taulunRivit(k, rivit = ASTRO_TAULUN_RIVIT) {
  const moodi = nykyinenMoodi(k);
  return rivit
    .filter((r) => { try { return Boolean(r.saatavilla(k)); } catch { return false; } })
    .map((r) => ({ tunnus: r.tunnus, otsikko: r.otsikko, selite: r.selite, moodi: r.moodi, aktiivinen: r.moodi === moodi }));
}

/**
 * SEURAAVA ASKEL kohti moodia — yksi toimi kerrallaan, siirtymän aikana
 * odotetaan. Palauttaa 'perilla' | 'odota' | toimen nimen | 'ei'.
 * Puhdas funktio tilasta, jotta askeleet voi testata ilman palloa.
 *
 * @param {string} tavoite moodi
 * @param {{kuva:boolean, kyyti:{tila:string, siirtyy:boolean}|null}} tila
 */
export function moodinAskel(tavoite, { kuva = false, kyyti = null } = {}) {
  if (kuva) return tavoite === 'kuvat' ? 'perilla' : 'suljeKuva';
  const t = kyyti?.tila ?? 'kauko';
  const siirtyy = Boolean(kyyti?.siirtyy);
  const kyydissa = t !== 'kauko' || siirtyy;
  if (tavoite === 'pallo') {
    if (!kyydissa) return 'perilla';
    if (t === 'kauko') return 'odota'; // paluulento kesken
    return 'poistu';
  }
  if (tavoite === 'kuvat') {
    if (kyydissa) return t === 'kauko' ? 'odota' : 'poistu';
    return 'avaaKuva';
  }
  if (!kyyti) return 'ei';
  if (tavoite === 'seuranta') {
    if (t === 'seuranta') return 'perilla';
    if (siirtyy) return 'odota';
    return 'napauta'; // kauko → seuranta, ikkuna/kohde → seuranta
  }
  if (tavoite === 'ikkuna') {
    if (t === 'ikkuna') return 'perilla';
    if (siirtyy) return 'odota';
    return 'napauta'; // kauko → seuranta → ikkuna, kohde → seuranta → ikkuna
  }
  return 'ei';
}

/** Soiko Livia juuri nyt (pelin soitin tai tervetulon oma tila)? */
export function liviaPuhuu(ui, tervetulo = null) {
  try { if (tervetulo?.tila?.()?.puhuu) return true; } catch { /* ei tilaa */ }
  const a = ui?.liviaAani;
  return Boolean(a && a.paused === false && !a.ended);
}

/**
 * DOM-NÄKYMÄ: yksi paneeli bodyssä, rivit datasta. Palauttaa
 * { nayta(rivit), piilota(), auki(), elementti, pura() }. Rivin napautus
 * kutsuu `valitse(tunnus)`, sulku `sulje()`.
 */
export function luoTaulunNakyma({
  doc = globalThis.document, valitse = () => {}, sulje = () => {}, vahennaLiiketta = false,
  kello = globalThis,
} = {}) {
  if (!doc?.createElement || !doc.body) return null;
  const paneeli = doc.createElement('div');
  paneeli.className = 'astro-paneeli';
  paneeli.hidden = true;
  paneeli.setAttribute('role', 'dialog');
  paneeli.setAttribute('aria-label', TAULUN_OTSIKKO);
  if (vahennaLiiketta) paneeli.classList.add('astro-paneeli-liikkumaton');
  const ylarivi = doc.createElement('div');
  ylarivi.className = 'astro-paneeli-ylarivi';
  const otsikko = doc.createElement('div');
  otsikko.className = 'astro-paneeli-otsikko';
  otsikko.textContent = TAULUN_OTSIKKO;
  const sulku = doc.createElement('button');
  sulku.type = 'button';
  sulku.className = 'astro-sulku';
  sulku.textContent = '×';
  sulku.title = 'Sulje';
  sulku.setAttribute('aria-label', 'Sulje taulu');
  ylarivi.append(otsikko, sulku);
  const lista = doc.createElement('div');
  lista.className = 'astro-paneeli-rivit';
  lista.setAttribute('role', 'menu');
  paneeli.append(ylarivi, lista);
  doc.body.appendChild(paneeli);

  sulku.addEventListener('click', (e) => { e.stopPropagation(); sulje(); });
  // Taulun eleet eivät kuulu pallolle eivätkä kyydin kosketuskerrokselle.
  for (const laji of ['click', 'pointerdown', 'pointerup', 'wheel']) {
    paneeli.addEventListener(laji, (e) => e.stopPropagation());
  }

  let piiloKello = 0;
  const latoRivit = (rivit) => {
    lista.replaceChildren(...rivit.map((r) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.className = `astro-paneeli-rivi astro-painike${r.aktiivinen ? ' astro-valittu' : ''}`;
      b.dataset.tunnus = r.tunnus;
      b.setAttribute('role', 'menuitemradio');
      b.setAttribute('aria-checked', r.aktiivinen ? 'true' : 'false');
      const o = doc.createElement('span');
      o.className = 'astro-painike-otsikko';
      o.textContent = r.otsikko;
      const s = doc.createElement('span');
      s.className = 'astro-painike-selite';
      s.textContent = r.selite;
      b.append(o, s);
      b.addEventListener('click', (e) => { e.stopPropagation(); valitse(r.tunnus); });
      return b;
    }));
  };
  /*
   * PANEELI PULUN YLLÄ: alareuna mitataan pöllönapista (Pulu on oikeassa
   * alakulmassa, eri paikassa kyydissä ja lehtien päällä), ja jos nappia
   * ei löydy, CSS:n oletus pitää paneelin oikeassa alakulmassa.
   */
  const sijoita = () => {
    try {
      const nappi = doc.querySelector(PULUN_NAPPI);
      const r = nappi?.getBoundingClientRect?.();
      const korkeus = doc.defaultView?.innerHeight ?? 0;
      if (r && r.height > 0 && korkeus > 0) {
        const ala = Math.max(12, Math.round(korkeus - r.top + 8));
        paneeli.style.setProperty('--astro-paneeli-ala', `${ala}px`);
      } else {
        paneeli.style.removeProperty('--astro-paneeli-ala');
      }
    } catch { /* oletuspaikka */ }
  };
  return {
    elementti: paneeli,
    nayta(rivit) {
      kello.clearTimeout?.(piiloKello);
      latoRivit(rivit);
      sijoita();
      paneeli.hidden = false;
      // Häivytys alkaa seuraavasta kehyksestä (piilosta näkyviin ei ole siirtymää).
      if (vahennaLiiketta) paneeli.classList.add('astro-paneeli-auki');
      else {
        void paneeli.offsetWidth;
        paneeli.classList.add('astro-paneeli-auki');
      }
    },
    piilota() {
      paneeli.classList.remove('astro-paneeli-auki');
      kello.clearTimeout?.(piiloKello);
      if (vahennaLiiketta) { paneeli.hidden = true; return; }
      piiloKello = kello.setTimeout?.(() => { paneeli.hidden = true; }, TAULUN_HAIVYTYS_MS + 20) ?? 0;
    },
    auki: () => paneeli.classList.contains('astro-paneeli-auki'),
    sisaltaa: (el) => Boolean(el && paneeli.contains(el)),
    pura() {
      kello.clearTimeout?.(piiloKello);
      paneeli.remove();
    },
  };
}

/**
 * PULUN TAULU linssille.
 *
 * @param {object} p
 * @param {object} p.ui pelin käyttöliittymä (Livian soitin: ui.liviaAani)
 * @param {object} p.avaruus avaaAvaruusnakyma()-kahva: kyytiMoodi,
 *   napautaIss, poistuKyydista, paljastettu
 * @param {() => boolean} p.kuvaAuki onko valokuva (kuvaselain) auki
 * @param {() => void} p.suljeKuva sulkee valokuvan
 * @param {() => boolean} p.avaaKuva avaa lähimmän kohteen kuvat
 * @param {() => boolean} p.kuviaOn onko kuvallisia kohteita
 * @param {object|null} [p.tervetulo] aloitaPulunTervetulo()-kahva tai null
 * @param {Document} [p.doc] Pulun napautuksen ja ohituksen kuuntelija
 * @param {object} [p.kello] setTimeout/clearTimeout (testit)
 * @param {object|null} [p.nakyma] testien tynkänäkymä (oletus: DOM)
 * @param {Function} [p.vaikene] kesken olevan puheen pysäytys
 * @param {boolean} [p.automaatti] avataanko taulu linssin alussa itse
 */
export function luoAstroTaulu({
  ui = null,
  avaruus = null,
  kuvaAuki = () => false,
  suljeKuva = () => {},
  avaaKuva = () => false,
  kuviaOn = () => true,
  tervetulo = null,
  doc = globalThis.document,
  kello = globalThis,
  vahennaLiiketta = pulunIssVahennaLiiketta(ui),
  nakyma = undefined,
  vaikene = (u) => { pysaytaLivianAani(u, { haivyta: false }); polloKuplatPois(); },
  kuplatPois = polloKuplatPois,
  automaatti = true,
} = {}) {
  const k = { avaruus, kuvaAuki, kuviaOn };
  let purettu = false;
  let auki = false;
  let avauksia = 0;
  let automaattiTila = automaatti ? 'odottaa' : 'pois';
  let vaihto = null;
  const loki = [];
  const ajastimet = new Set();

  const ajasta = (fn, ms) => {
    const id = kello.setTimeout?.(() => { ajastimet.delete(id); fn(); }, Math.max(0, ms));
    ajastimet.add(id);
    return id;
  };
  const peru = (id) => { if (id) { kello.clearTimeout?.(id); ajastimet.delete(id); } };

  /* ---- näkymä ---------------------------------------------------- */
  const n = nakyma !== undefined ? nakyma : luoTaulunNakyma({
    doc, vahennaLiiketta, kello,
    valitse: (tunnus) => valitse(tunnus),
    sulje: () => sulje({ syy: 'sulku' }),
  });

  function avaa({ syy = 'napautus' } = {}) {
    if (purettu) return false;
    if (syy === 'napautus' && liviaPuhuu(ui, tervetulo)) {
      // Pelaajan napautus on pyyntö juuri nyt: puhe vaikenee (ks. otsikko).
      try { tervetulo?.ohita?.(); } catch { /* jo ohi */ }
      try { vaikene(ui); } catch { /* ei soitinta */ }
      loki.push('vaiensi');
    }
    /*
     * PULUN VANHAT KUPLAT POIS: tervetulon viimeiset kuplat (C1–C2) jäävät
     * lukuajakseen ruudulle, ja iPadilla ne osuivat taulun alle (mitattu
     * savukkeella 28.9.). Puhe on tässä vaiheessa jo ohi tai vaiennettu,
     * joten taulu on Pulun ainoa puheenvuoro ruudulla.
     */
    try { kuplatPois(); } catch { /* ei kuplia */ }
    auki = true;
    avauksia += 1;
    loki.push(`avaa:${syy}`);
    // Automaattinen avaus ei enää tule, kun taulu on kerran ollut auki.
    if (automaattiTila === 'odottaa') automaattiTila = 'ohitettu';
    try { n?.nayta?.(taulunRivit(k)); } catch { /* näkymä ei kaada linssiä */ }
    return true;
  }

  function sulje({ syy = 'sulku' } = {}) {
    if (!auki) return false;
    auki = false;
    loki.push(`sulje:${syy}`);
    try { n?.piilota?.(); } catch { /* jo kiinni */ }
    return true;
  }

  const vaihda = () => (auki ? sulje({ syy: 'pulu' }) : avaa({ syy: 'napautus' }));

  /* ---- moodista toiseen ------------------------------------------ */
  const teeToimi = (toimi) => {
    try {
      if (toimi === 'suljeKuva') suljeKuva();
      else if (toimi === 'poistu') avaruus?.poistuKyydista?.();
      else if (toimi === 'napauta') avaruus?.napautaIss?.();
      else if (toimi === 'avaaKuva') avaaKuva();
    } catch { /* toimi epäonnistui: seuraava kierros tai katto ratkaisee */ }
  };

  function siirryMoodiin(tavoite) {
    if (vaihto) { peru(vaihto.ajastin); vaihto = null; }
    const oma = { tavoite, toimia: 0, alku: kello.nyt?.() ?? Date.now(), ajastin: 0, tulos: 'kesken' };
    vaihto = oma;
    const kierros = () => {
      if (vaihto !== oma || purettu) return;
      const askel = moodinAskel(tavoite, { kuva: Boolean(kuvaAuki()), kyyti: kyytiMoodi(k) });
      const kulunut = (kello.nyt?.() ?? Date.now()) - oma.alku;
      if (askel === 'perilla' || askel === 'ei') {
        oma.tulos = askel === 'perilla' ? 'perilla' : 'ei';
        loki.push(`moodi:${tavoite}:${oma.tulos}`);
        vaihto = null;
        return;
      }
      if (kulunut > MOODIN_KATTO_MS || (askel !== 'odota' && oma.toimia >= MOODIN_TOIMIA)) {
        oma.tulos = 'luovutti';
        loki.push(`moodi:${tavoite}:luovutti`);
        vaihto = null;
        return;
      }
      if (askel !== 'odota') {
        oma.toimia += 1;
        loki.push(`toimi:${askel}`);
        teeToimi(askel);
      }
      oma.ajastin = ajasta(kierros, MOODIN_ASKEL_MS);
    };
    kierros();
    return oma;
  }

  function valitse(tunnus) {
    const rivi = ASTRO_TAULUN_RIVIT.find((r) => r.tunnus === tunnus);
    if (!rivi || purettu) return false;
    loki.push(`valitse:${tunnus}`);
    sulje({ syy: 'valinta' });
    if (nykyinenMoodi(k) === rivi.moodi) return true;
    siirryMoodiin(rivi.moodi);
    return true;
  }

  /* ---- automaattinen avaus linssin alussa ------------------------ */
  const alkoi = kello.nyt?.() ?? Date.now();
  const automaattiKierros = () => {
    if (purettu || automaattiTila !== 'odottaa') return;
    const kulunut = (kello.nyt?.() ?? Date.now()) - alkoi;
    if (kulunut > TAULUN_KATTO_MS) { automaattiTila = 'katto'; return; }
    let valmis = true;
    if (tervetulo) {
      let vaihe = null;
      try { vaihe = tervetulo.tila?.()?.vaihe ?? null; } catch { vaihe = null; }
      valmis = !['odottaa', 'puhuu'].includes(vaihe);
    } else {
      try { valmis = avaruus?.paljastettu?.() ?? true; } catch { valmis = true; }
    }
    if (!valmis || liviaPuhuu(ui, tervetulo)) { ajasta(automaattiKierros, TAULUN_KYSELY_MS); return; }
    ajasta(() => {
      if (purettu || automaattiTila !== 'odottaa') return;
      // Välissä alkanut puhe (esim. kupla) odotetaan vielä loppuun.
      if (liviaPuhuu(ui, tervetulo)) { ajasta(automaattiKierros, TAULUN_KYSELY_MS); return; }
      // Pelaaja ehti jo valita (valokuva tai kyyti): taulua ei tuoda päälle.
      if (kuvaAuki() || (kyytiMoodi(k)?.tila ?? 'kauko') !== 'kauko') { automaattiTila = 'valittu'; return; }
      automaattiTila = 'avattu';
      avaa({ syy: 'automaatti' });
    }, TAULUN_HENGAHDYS_MS);
  };
  if (automaatti) ajasta(automaattiKierros, 0);

  /* ---- Pulun napautus -------------------------------------------- */
  /*
   * KAAPPAUSVAIHEESSA ENNEN PULUN OMAA KUUNTELIJAA: pöllönapin oma click
   * avaisi chatin (js/pollo.js vaihdaTila). Linssin ajan napautus avaa
   * taulun — vain tässä linssissä, koska kuuntelija on olemassa vain
   * linssin elinkaaren ajan. Muualla pelissä Pulu avaa chatin kuten ennen.
   */
  const pulunNapautus = (e) => {
    const kohde = e?.target;
    if (!kohde?.closest?.(PULUN_NAPPI)) return;
    e.preventDefault?.();
    e.stopImmediatePropagation?.();
    e.stopPropagation?.();
    vaihda();
  };
  /* Napautus taulun ulkopuolelle sulkee sen (kevyt: ei estä palloa). */
  const ulkoNapautus = (e) => {
    if (!auki) return;
    const kohde = e?.target;
    if (n?.sisaltaa?.(kohde) || kohde?.closest?.(PULUN_NAPPI)) return;
    sulje({ syy: 'ulkopuoli' });
  };
  const nappain = (e) => { if (auki && e?.key === 'Escape') { e.stopPropagation?.(); sulje({ syy: 'esc' }); } };
  try {
    doc?.addEventListener?.('click', pulunNapautus, { capture: true });
    doc?.addEventListener?.('pointerdown', ulkoNapautus, { capture: true, passive: true });
    doc?.addEventListener?.('keydown', nappain, { capture: true });
  } catch { /* ei dokumenttia */ }

  return {
    avaa: (asetukset) => avaa(asetukset),
    sulje: () => sulje({ syy: 'kutsu' }),
    /** Pulun napautus (sama polku kuin dokumentin kuuntelijalla). */
    napautaPulua: () => vaihda(),
    valitse,
    siirryMoodiin,
    /** Linssi suljettiin. */
    pura() {
      if (purettu) return;
      purettu = true;
      auki = false;
      for (const id of ajastimet) kello.clearTimeout?.(id);
      ajastimet.clear();
      vaihto = null;
      try {
        doc?.removeEventListener?.('click', pulunNapautus, { capture: true });
        doc?.removeEventListener?.('pointerdown', ulkoNapautus, { capture: true });
        doc?.removeEventListener?.('keydown', nappain, { capture: true });
      } catch { /* ei dokumenttia */ }
      try { n?.pura?.(); } catch { /* jo poissa */ }
    },
    /** Mittari testeille ja savukkeelle. */
    tila: () => ({
      auki,
      avauksia,
      automaatti: automaattiTila,
      moodi: nykyinenMoodi(k),
      rivit: taulunRivit(k),
      vaihto: vaihto ? { tavoite: vaihto.tavoite, toimia: vaihto.toimia } : null,
      loki: loki.slice(),
    }),
  };
}
