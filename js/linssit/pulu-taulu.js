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
 * ole linssissä (Päätoimittaja 28.9.: kuuluu ISS-säätöpaneeliin).
 *
 * PULU AVAA AINA TAULUN (Päätoimittaja 28.9.): pelin Pulu, valokuvan
 * minipulu ja — jos Livia ei ole vielä pelissä — Pulun paikalla oleva
 * Näkymät-nappi. Chatti ei ole moodi: se on taulun alareunan pieni
 * "Kysy Pululta" -linkki, joka avaa valokuvan Pulun chatin (ks. kysyPululta).
 *
 * NYKYINEN MOODI ON VALITTUNA. Valinta vie moodista toiseen samoilla
 * kahvoilla kuin pelaajan omat eleet (ISS:n napautus, kyydin ✕, pisteen
 * napautus, kuvan ✕), eikä rinnakkaista polkua synny: esim. pallo →
 * ISS:n sisälle on kaksi napautusta (kauko → seuranta → ikkuna), ja
 * jälkimmäinen odottaa ensimmäisen lennon loppuun.
 *
 * ── PULU EI PUHU PÄÄLLEKKÄIN ─────────────────────────────────────────
 *
 *  • JOKAINEN AVAUS (omistaja 29.9.2026): taulu tulee heti, kun musta
 *    verho on poissa, TAULUN_HENGAHDYS_MS:n päästä. Ensimmäisellä
 *    avauksella tervetulo A1–A2 (js/linssit/pulu-tervetulo.js) puhuu
 *    taulun aikana ilman kuplaa; taulu ei odota sitä eikä vaienna sitä.
 *  • AUTOMAATTINEN AVAUS ODOTTAA MUUTA PUHETTA: jos Livia puhuu jotain
 *    muuta kuin tervetuloa (joku muu kupla), taulu tulee vasta kun puhe on
 *    ohi — se ei koskaan keskeytä Liviaa itse.
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
import { polloKuplatPois, polloPaneelivahtiNyt } from '../pollo.js';
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
/** Rako Pulun yläreunan ja taulun alareunan välissä. */
export const TAULUN_RAKO_PX = 8;
/** Astronautti-Pulun leijunnan korkein nousu (css/satelliitti.css). */
export const LEIJUNNAN_VARA_PX = 5;
/** Taulu pysyy näin kaukana ISS-merkistä (osuma-ala 44 px + napautus viereen). */
export const ISS_VAISTO_PX = 56;
/** Pulun eleen korkein nousu napin yläreunasta (px, mitattu 28.9.). */
export const PULUN_ELEEN_VARA_PX = 90;
/** Sama ele siirtää hahmoa myös sivuttain (mitattu ~9 px vasemmalle, iPhone). */
export const PULUN_ELEEN_SIVUVARA_PX = 14;
/** Auki olevan taulun Pulu-mittauksen väli. */
export const TAULUN_SEURANTA_MS = 400;
/** Taulun otsikko (sovelluksen tekstiä, ei Livian repliikki). */
export const TAULUN_OTSIKKO = 'Minne katsotaan?';

/** Pulun napin valitsin: pelin oma pöllönappi linssin päällä. */
export const PULUN_NAPPI = '.pollo-nappi';
/** Valokuvanäkymän minipulu (js/linssit/satelliitti.js avaaHavaintokortti). */
export const MINIPULU = '.satelliitti-pulunappi';
/** Näkymät-nappi Pulun paikalla, kun Livia ei ole vielä pelissä. */
export const NAKYMAT_NAPPI = '.astro-nakymat-nappi';
/**
 * KAIKKI TAULUN AVAAJAT (Päätoimittaja 28.9. omistajan "aina esille
 * napauttamalla pulua" -linjan mukaan): pelin Pulu, valokuvan minipulu ja
 * Näkymät-nappi. Napautus mihin tahansa niistä avaa tai sulkee taulun.
 */
export const TAULUN_AVAAJAT = `${PULUN_NAPPI}, ${MINIPULU}, ${NAKYMAT_NAPPI}`;
/** Pulun oma toiminto taulun alareunassa (ei moodirivi). */
export const KYSY_PULULTA = 'Kysy Pululta';
/** Kuinka usein katsotaan, onko Pulu paikalla (Näkymät-nappi näkyviin / pois). */
export const PULUN_PAIKKA_MS = 700;

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
 * PULUN NÄKYVÄ LAATIKKO ruudulla: pöllönapin ja piirretyn hahmon
 * (lentonäyttämön SVG:n osat, joilla on koko) unioni, tai null.
 * Lentonäyttämö itse on 152 × 304 px:n läpinäkyvä kangas, joten sen
 * oma laatikko olisi liian iso — mitataan piirretyt osat.
 * `eleenVara: false` antaa hahmon todellisen laatikon (savuke).
 */
export function pulunLaatikko(doc = globalThis.document, { eleenVara = true } = {}) {
  /*
   * KUKA ON PULUN PAIKALLA: valokuvan ollessa auki minipulu (kuva peittää
   * pelin Pulun), muuten pelin Pulu, ja jos Livia ei ole pelissä,
   * Näkymät-nappi. Ankkuri, jonka laatikko on nolla, ohitetaan.
   */
  const laatikko = (v) => {
    const el = doc?.querySelector?.(v);
    const b = el && !el.hidden ? el.getBoundingClientRect?.() : null;
    return b?.width > 0 && b?.height > 0 ? b : null;
  };
  if (doc?.body?.classList?.contains?.('satelliitti-kuva-auki')) {
    const mini = laatikko(MINIPULU);
    if (mini) return { left: mini.left, top: mini.top, right: mini.right, bottom: mini.bottom };
  }
  if (!pulunPaikalla(doc)) {
    const n = laatikko(NAKYMAT_NAPPI);
    return n ? { left: n.left, top: n.top, right: n.right, bottom: n.bottom } : null;
  }
  const laatikot = [];
  const nappi = doc?.querySelector?.(PULUN_NAPPI)?.getBoundingClientRect?.();
  if (nappi?.width > 0 && nappi?.height > 0) laatikot.push(nappi);
  /*
   * HAHMO MYÖS HETKELLISESTI HÄIVYTETTYNÄ: lentonäyttämö voi olla juuri
   * avaushetkellä läpinäkyvä (ele, kohtaus), ja paikalleen palaava hahmo
   * jäisi taulun alle (mitattu iPadilla 28.9.). Opacity ei muuta laatikoita,
   * joten osat mitataan aina — mutta vain napin lähellä olevat, jottei
   * muualle lentänyt hahmo nosta taulua turhaan.
   */
  const lento = doc?.querySelector?.('.livia-lentonayttamo');
  if (lento && !lento.hidden && nappi?.width > 0) {
    const alue = { left: nappi.left - 80, top: nappi.top - 120, right: nappi.right + 80, bottom: nappi.bottom + 40 };
    for (const el of lento.querySelectorAll('svg *')) {
      const b = el.getBoundingClientRect();
      if (!(b.width > 0 && b.height > 0)) continue;
      if (b.right < alue.left || b.left > alue.right || b.bottom < alue.top || b.top > alue.bottom) continue;
      laatikot.push(b);
    }
  }
  if (!laatikot.length) return null;
  /*
   * ELEEN VARA: Pulu reagoi napautukseen eleellä, joka nostaa hahmoa hetkeksi
   * (mitattu iPhonella 28.9.: päälaki napin yläreunasta 38 px levossa, 83 px
   * eleessä). Taulu ei saa jäädä eleen alle sinä aikana, kun sijainti
   * mitataan uudelleen, joten napin yläpuolelle varataan aina eleen korkeus.
   */
  const vara = eleenVara && nappi?.width > 0 ? [{ top: nappi.top - PULUN_ELEEN_VARA_PX }] : [];
  return {
    left: Math.min(...laatikot.map((b) => b.left)),
    top: Math.min(...laatikot.map((b) => b.top), ...vara.map((b) => b.top)),
    right: Math.max(...laatikot.map((b) => b.right)),
    bottom: Math.max(...laatikot.map((b) => b.bottom)),
  };
}

/**
 * ONKO PULU PAIKALLA LINSSISSÄ: pelin pöllönappi on DOMissa eikä piilossa
 * (Livia on pelissä, game.polloLoydetty). Paneelivahdin hetkellinen
 * väistö (pulu-paneelin-alla-piilossa) ei tarkoita poissaoloa.
 */
export function pulunPaikalla(doc = globalThis.document) {
  const el = doc?.querySelector?.(PULUN_NAPPI);
  if (!el || el.hidden) return false;
  try {
    return (doc.defaultView?.getComputedStyle?.(el)?.display ?? 'block') !== 'none'
      && el.getBoundingClientRect().width > 0;
  } catch {
    return false;
  }
}

/**
 * DOM-NÄKYMÄ: yksi paneeli bodyssä, rivit datasta. Palauttaa
 * { nayta(rivit), piilota(), auki(), elementti, pura() }. Rivin napautus
 * kutsuu `valitse(tunnus)`, sulku `sulje()`.
 */
export function luoTaulunNakyma({
  doc = globalThis.document, valitse = () => {}, sulje = () => {}, kysy = () => {}, vahennaLiiketta = false,
  kello = globalThis, vaistettavat = () => [],
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
  /*
   * "KYSY PULULTA" ALAREUNASSA: Pulun oma toiminto eikä moodi, joten se on
   * pieni tekstilinkki rivien alla eikä rivi. Osuma-ala 44 px, ei riviä
   * korkeampi.
   */
  const linkki = doc.createElement('button');
  linkki.type = 'button';
  linkki.className = 'astro-paneeli-linkki';
  linkki.textContent = KYSY_PULULTA;
  linkki.setAttribute('aria-label', 'Kysy Pululta — avaa keskustelu');
  linkki.addEventListener('click', (e) => { e.stopPropagation(); kysy(); });
  paneeli.append(ylarivi, lista, linkki);
  doc.body.appendChild(paneeli);

  /*
   * NÄKYMÄT-NAPPI (Päätoimittaja 28.9.): jos Livia ei ole vielä pelissä,
   * linssissä ei ole Pulua, jota napauttaa. Silloin Pulun paikalla on pieni
   * tekstinappi, joka avaa ja sulkee taulun (dokumentin kuuntelija,
   * TAULUN_AVAAJAT). Nappi katoaa, kun Pulu on paikalla.
   */
  const nakymat = doc.createElement('button');
  nakymat.type = 'button';
  nakymat.className = 'astro-nakymat-nappi';
  nakymat.textContent = 'Näkymät';
  nakymat.setAttribute('aria-label', 'Näkymät — avaa linssin näkymät');
  nakymat.hidden = true;
  doc.body.appendChild(nakymat);

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
   * PANEELI PULUN YLLÄ: alareuna = Pulun yläreuna + TAULUN_RAKO_PX, mitattuna
   * joka avauksella (Pulu on eri paikassa puhelimella, iPadilla ja kyydissä).
   * PULU EI OLE PELKKÄ NAPPI: piirretty hahmo (lentonäyttämön SVG) ulottuu
   * napin yläpuolelle — iPhonella nappi 743 px, hahmon päälaki 705 px
   * (mitattu savukkeella 28.9.), ja pelkän napin mukaan sijoitettu taulu
   * peitti Pulun. Siksi mitataan napin ja hahmon näkyvien osien unioni
   * (pulunLaatikko). Leijunta nostaa hahmoa enintään 5 px (css/satelliitti.css
   * livia-astronautti-leijuu), joten rakoon lisätään sen verran varaa.
   * Jos tila ei riitä, paneeli ei mene Pulun päälle: sen korkeus rajataan
   * ruudun yläreunaan asti ja rivit vierivät (CSS max-height).
   */
  /*
   * KAKSI PAIKKAA, ENSIMMÄINEN VAPAA VOITTAA:
   *   ylla   Pulun yllä (oikea reuna ruudun reunassa), ks. yllä;
   *   vieres Pulun vasemmalla puolella, alareuna Pulun alareunan tasolla.
   * ASEMAA EI PEITETÄ (regressio 28.9.: savuke-iss-kyyti). Avausnäkymä
   * seuraa ISS:ää ruudun keskellä, ja puhelimella Pulun ylle nouseva taulu
   * ulottui keskelle — pelaajan napautus asemaan osui tauluun eikä vienyt
   * kyytiin. Siksi paikka ei saa leikata `vaistettavat()`-alueita (ISS:n
   * osuma-ala); jos yläpaikka leikkaa, taulu menee Pulun viereen.
   */
  let ala = 0;
  let paikka = null;
  const leikkaa = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  const sijoita = ({ vainYlos = false } = {}) => {
    try {
      const r = pulunLaatikko(doc);
      const W = doc.defaultView?.innerWidth ?? 0;
      const H = doc.defaultView?.innerHeight ?? 0;
      if (!r || !(H > 0) || !(W > 0)) {
        if (!vainYlos) { ala = 0; paikka = null; paneeli.style.removeProperty('--astro-paneeli-ala'); paneeli.style.removeProperty('--astro-paneeli-oikea'); }
        return;
      }
      const w = paneeli.offsetWidth || 232;
      const h = paneeli.offsetHeight || 290;
      // Yläpaikan oikea reuna: CSS:n max(12px, turva-alue) — pystyssä 12 px.
      const oikeaReuna = 12;
      let ylaAla = Math.max(12, Math.round(H - r.top + TAULUN_RAKO_PX + LEIJUNNAN_VARA_PX));
      if (vainYlos && paikka === 'ylla' && ylaAla < ala) ylaAla = ala;
      const ehdokkaat = [
        { nimi: 'ylla', ala: ylaAla, oikea: null, rect: { left: W - oikeaReuna - w, right: W - oikeaReuna, top: H - ylaAla - h, bottom: H - ylaAla } },
      ];
      // Leijunta heiluttaa Pulua myös sivuttain, joten sama vara kuin yläpaikassa.
      const vierOikea = Math.round(W - r.left + TAULUN_RAKO_PX + LEIJUNNAN_VARA_PX + PULUN_ELEEN_SIVUVARA_PX);
      const vierAla = Math.max(12, Math.round(H - r.bottom));
      if (W - vierOikea - w >= 8) {
        ehdokkaat.push({ nimi: 'vieres', ala: vierAla, oikea: vierOikea, rect: { left: W - vierOikea - w, right: W - vierOikea, top: H - vierAla - h, bottom: H - vierAla } });
      }
      let vaista = [];
      try { vaista = vaistettavat() ?? []; } catch { vaista = []; }
      const valittu = ehdokkaat.find((e) => e.rect.top >= 8 && !vaista.some((v) => leikkaa(e.rect, v))) ?? ehdokkaat[0];
      paikka = valittu.nimi;
      ala = valittu.ala;
      paneeli.dataset.paikka = paikka;
      paneeli.style.setProperty('--astro-paneeli-ala', `${ala}px`);
      if (valittu.oikea === null) paneeli.style.removeProperty('--astro-paneeli-oikea');
      else paneeli.style.setProperty('--astro-paneeli-oikea', `${valittu.oikea}px`);
    } catch { /* oletuspaikka */ }
  };
  /*
   * AUKI OLLESSA PULU MITATAAN UUDESTAAN (TAULUN_SEURANTA_MS): hahmo voi
   * palata paikalleen tai nousta eleeseen vasta avauksen jälkeen.
   * 43 laatikon luku harvoin ei rasita kehystä.
   */
  let seurantaKello = 0;
  const seuraa = () => {
    kello.clearTimeout?.(seurantaKello);
    seurantaKello = kello.setTimeout?.(() => {
      if (paneeli.hidden || !paneeli.classList.contains('astro-paneeli-auki')) return;
      sijoita({ vainYlos: true });
      seuraa();
    }, TAULUN_SEURANTA_MS) ?? 0;
  };
  return {
    elementti: paneeli,
    nayta(rivit) {
      kello.clearTimeout?.(piiloKello);
      latoRivit(rivit);
      // Mitat luetaan näkyvästä (vielä läpinäkyvästä) paneelista.
      paneeli.hidden = false;
      paikka = null;
      sijoita();
      seuraa();
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
    /** Näkymät-nappi näkyviin (true) tai pois. */
    nakymatNappi(nakyvissa) {
      if (nakymat.hidden === !nakyvissa) return;
      nakymat.hidden = !nakyvissa;
    },
    pura() {
      kello.clearTimeout?.(piiloKello);
      kello.clearTimeout?.(seurantaKello);
      paneeli.remove();
      nakymat.remove();
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
 * @param {() => boolean} [p.avaaChat] "Kysy Pululta": avaa valokuvan
 *   Pulun chatin (kutsutaan kuvamoodissa)
 * @param {(doc) => boolean} [p.pulunPaikalla] onko Pulu linssissä (testit)
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
  kuplatPois = () => {
    polloKuplatPois();
    /*
     * Kuplat häipyvät 220 ms:ssa (js/pollo.js poistaKuplat). Sen jälkeen
     * Pulun paneelivahti ajetaan heti: jos Pulu oli väistynyt kuplan alta
     * piiloon, se palaa näkyviin ja napautettavaksi, vaikka pallo liikkuu.
     */
    kello.setTimeout?.(() => polloPaneelivahtiNyt(), 260);
  },
  automaatti = true,
  avaaChat = () => false,
  suljeChat = () => {},
  pulunPaikalla: paikalla = pulunPaikalla,
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
    // ISS:n osuma-ala (ISS_OSUMA_PX = 44, ja savukkeen "20 px viereen") vapaaksi.
    vaistettavat: () => {
      const p = avaruus?.issRuudulla?.();
      if (!p) return [];
      const v = ISS_VAISTO_PX;
      return [{ left: p.x - v, right: p.x + v, top: p.y - v, bottom: p.y + v }];
    },
    valitse: (tunnus) => valitse(tunnus),
    sulje: () => sulje({ syy: 'sulku' }),
    kysy: () => kysyPululta(),
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
     * PULUN VANHAT KUPLAT POIS: kuplat jäävät lukuajakseen ruudulle, ja
     * iPadilla ne osuivat taulun alle (mitattu savukkeella 28.9.). Taulu on
     * Pulun ainoa puheenvuoro ruudulla; tervetulo puhuu ilman kuplaa, joten
     * tämä ei vaienna sitä.
     */
    try { kuplatPois(); } catch { /* ei kuplia */ }
    // Valokuvan chatti ja taulu ovat samassa kulmassa: taulu tulee tilalle.
    if (kuvaAuki()) { try { suljeChat(); } catch { /* ei chattia */ } }
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

  function siirryMoodiin(tavoite, { perilla = null } = {}) {
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
        if (oma.tulos === 'perilla') { try { perilla?.(); } catch { /* jatko ei kaada */ } }
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

  /*
   * ---- "KYSY PULULTA" --------------------------------------------------
   *
   * LINSSIN AINOA CHATTI ON VALOKUVAN PULULLA. Pelin oma chatti ei aukea
   * linssin aikana (js/pollo.js avaa → linssiEstaaChatin, omistaja
   * 4.9.2026), joten pallonäkymän Pulu ei ennen tätäkään avannut chattia.
   * Keskustelu on kohteen oma (kaksi valmista kysymystä + vapaa kenttä,
   * js/linssit/satelliitti.js), joten linkki vie kuvamoodiin (lähimmän
   * kohteen kuva, kyydistä ensin pois) ja avaa siellä chatin. Taulu
   * sulkeutuu heti.
   */
  function kysyPululta() {
    if (purettu) return false;
    loki.push('kysy');
    sulje({ syy: 'kysy' });
    const chatti = () => { try { avaaChat(); } catch { /* ei kuvaa */ } };
    if (nykyinenMoodi(k) === 'kuvat') chatti();
    else siirryMoodiin('kuvat', { perilla: chatti });
    return true;
  }

  /* ---- Näkymät-nappi, kun Pulua ei ole ------------------------------ */
  let pulu = null;
  const paikkaKierros = () => {
    if (purettu) return;
    let nyt = true;
    try { nyt = Boolean(paikalla(doc)); } catch { nyt = true; }
    if (nyt !== pulu) {
      pulu = nyt;
      loki.push(nyt ? 'pulu:paikalla' : 'pulu:poissa');
      try { n?.nakymatNappi?.(!nyt); } catch { /* ei nappia */ }
    }
    ajasta(paikkaKierros, PULUN_PAIKKA_MS);
  };
  paikkaKierros();

  /* ---- automaattinen avaus linssin alussa ------------------------ */
  const alkoi = kello.nyt?.() ?? Date.now();
  /*
   * MUU PUHE: tervetulon aikana Livian soitin soittaa tervetuloa, jonka
   * aikana taulu kuuluu olla auki (omistaja 29.9.2026). Vain muu puhe
   * (joku muu kupla) siirtää automaattista avausta.
   */
  const tervetuloKesken = () => {
    let vaihe = null;
    try { vaihe = tervetulo?.tila?.()?.vaihe ?? null; } catch { vaihe = null; }
    return ['odottaa', 'puhuu'].includes(vaihe);
  };
  const muuPuhe = () => !tervetuloKesken() && liviaPuhuu(ui);
  const automaattiKierros = () => {
    if (purettu || automaattiTila !== 'odottaa') return;
    const kulunut = (kello.nyt?.() ?? Date.now()) - alkoi;
    if (kulunut > TAULUN_KATTO_MS) { automaattiTila = 'katto'; return; }
    let valmis = true;
    try { valmis = avaruus?.paljastettu?.() ?? true; } catch { valmis = true; }
    if (!valmis || muuPuhe()) { ajasta(automaattiKierros, TAULUN_KYSELY_MS); return; }
    ajasta(() => {
      if (purettu || automaattiTila !== 'odottaa') return;
      // Välissä alkanut muu puhe (esim. kupla) odotetaan vielä loppuun.
      if (muuPuhe()) { ajasta(automaattiKierros, TAULUN_KYSELY_MS); return; }
      // Pelaaja ehti jo valita (valokuva tai kyyti): taulua ei tuoda päälle.
      if (kuvaAuki() || (kyytiMoodi(k)?.tila ?? 'kauko') !== 'kauko') { automaattiTila = 'valittu'; return; }
      automaattiTila = 'avattu';
      avaa({ syy: 'automaatti' });
    }, TAULUN_HENGAHDYS_MS);
  };
  if (automaatti) ajasta(automaattiKierros, 0);

  /* ---- Pulun napautus -------------------------------------------- */
  /*
   * KAAPPAUSVAIHEESSA ENNEN AVAAJIEN OMIA KUUNTELIJOITA: pöllönapin oma
   * click kutsuisi chattia (js/pollo.js vaihdaTila, joka linssissä ei
   * aukea) ja minipulun oma click valokuvan chattia. Linssin ajan napautus
   * avaa taulun — vain tässä linssissä, koska kuuntelija on olemassa vain
   * linssin elinkaaren ajan. Muualla pelissä Pulu toimii kuten ennen.
   */
  const pulunNapautus = (e) => {
    const kohde = e?.target;
    if (!kohde?.closest?.(TAULUN_AVAAJAT)) return;
    e.preventDefault?.();
    e.stopImmediatePropagation?.();
    e.stopPropagation?.();
    vaihda();
  };
  /* Napautus taulun ulkopuolelle sulkee sen (kevyt: ei estä palloa). */
  const ulkoNapautus = (e) => {
    if (!auki) return;
    const kohde = e?.target;
    if (n?.sisaltaa?.(kohde) || kohde?.closest?.(TAULUN_AVAAJAT)) return;
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
    kysyPululta,
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
      pulu,
      rivit: taulunRivit(k),
      vaihto: vaihto ? { tavoite: vaihto.tavoite, toimia: vaihto.toimia } : null,
      loki: loki.slice(),
    }),
  };
}
