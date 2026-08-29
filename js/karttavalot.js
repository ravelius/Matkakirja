/*
 * KARTTAVALOT — aihekohtaiset valotäplät kartan merkkien alla.
 *
 * Omistajan tilaus 29.8.2026: *"Jokaisen seliterivin väripalloa
 * painamalla syttyy VALO kaikkiin sen aiheen kohteisiin kartalla"*,
 * ja täsmennys samana päivänä: *"pisteen ei tarvitse sykkiä, riittää
 * kun on pieni valotäplä päällä"*. Valot jäävät päälle kunnes ne
 * sammutetaan, useita aiheita saa palaa yhtä aikaa, ja tila on
 * LAITTEEN muistia (localStorage) eikä pelitilaa.
 *
 * Tämä tiedosto on valojen KONEISTO. Valikko, joka niitä kytkee, on
 * js/karttaselite.js — jako on sama kuin symbolikirjastolla ja sen
 * kutsujilla: yksi tiedosto tietää mitä piirretään, toinen milloin.
 *
 * ── AIHE ON SYMBOLIEN SUKUKUNTA, EI UUSI TAKSONOMIA ────────────────
 *
 * Pelillä on jo yksi kartan kieli: symbolikirjaston kategoriat
 * (js/fokusnosto-symbolit.js NOSTOSYM_LUOKAT, Raamatun
 * SYMBOLITAKSONOMIA) ja niiden värit (css/styles.css --sym-*). Valon
 * aihe on niiden PÄÄKATEGORIA — omistajan lopullinen jako 29.8.2026,
 * kahdeksan riviä neljäntoista sijaan (NOSTOSYM_PAAKATEGORIAT). Merkit
 * kartalla ja symbolit korteissa EIVÄT muutu: valikko ryhmittelee.
 *
 * Seliterivin VÄRIPALLO on ryhmän kärkisymbolin oma väri — sama muste,
 * jolla merkki on kartalle piirretty — eikä uutta väriä keksitä
 * yhtään. Pallo on siis kirjaimellisesti se, mitä kartalta etsitään.
 *
 * SYMBOLITON MERKKI EI SAA VALOA. Vihreä kohtaamispiste
 * (js/fokuspiste.js) ja symboliton musteympyrä (js/fokuskohteet.js)
 * eivät ole symbolikategorioita, joten ne eivät kuulu mihinkään
 * kahdeksasta ryhmästä. Selite kertoo, mitä KARTAN SYMBOLIT
 * tarkoittavat; merkki jolla ei ole symbolia, ei ole siinä listassa.
 *
 * ── VALO ON KOLME YMPYRÄÄ, EI SUODATIN EIKÄ ANIMAATIO ──────────────
 *
 * 1. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. `drop-shadow`
 *    ja `feGaussianBlur` ovat siis poissa, ja `box-shadow` ei koske
 *    SVG:hen lainkaan. Pehmeä hehku tehdään kolmella samankeskisellä
 *    ympyrällä, joiden peitto kasvaa keskustaa kohti — sama keino
 *    kuin vihreällä pisteellä (js/fokuspiste.js).
 * 2. EI ANIMAATIOTA (omistaja: *"ei tarvitse sykkiä"*). Sykkivä valo
 *    olisi myös kolmas tuike kartalla tuikkivan täkypisteen ja
 *    kimaltavan kohtaamispisteen rinnalla; valo on tarkoituksella
 *    hiljainen tausta, ei kolmas huomionpyytäjä.
 * 3. MERKIN ALLE, EI PÄÄLLE. Valo lisätään merkkiryhmän ENSIMMÄISEKSI
 *    lapseksi, jolloin kaiverrus jää sen päälle luettavaksi.
 *
 * ── NÄKYVYYS ON YKSI LUOKKA BODYSSÄ — EI PER-KEHYS-TYÖTÄ ───────────
 *
 * Valo piirretään jokaisen merkin alle AINA, ja se on oletuksena
 * `display: none`. Sytytys on yksi luokka `document.bodyssä`
 * (`valot-<aihe>`), jonka CSS-sääntö kytkee juuri sen aiheen valot
 * näkyviin (css/styles.css). Kolme seurausta, jotka kaikki ovat
 * tarkoituksellisia:
 *
 *   - Sytytys ja sammutus ovat yksi luokanvaihto, eivät DOM-kierros.
 *   - Merkkikerroksen uudelleenrakennus (maan vaihto, zoomin
 *     rasteriporras) ei voi hukata valotilaa: uusi merkki syntyy
 *     valoineen ja bodyn luokka päättää näkyvyyden.
 *   - Kehyskohtaista työtä ei tule yhtään lisää. Valo ei ole erillinen
 *     kerros eikä sillä ole omaa mittakaavapassia: se elää merkin
 *     ankkuriryhmässä ja skaalautuu sen mukana (js/ui.js
 *     fokusMerkkiSkaalaKartalle).
 *
 * Eleen ajaksi valot piiloutuvat muiden merkkien mukana, koska ne ovat
 * niissä samoissa kerroksissa (css/styles.css kartta-merkit-piilossa).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten top-level-nimet alkavat
 * KARTTAVALO_/karttavalo-etuliitteellä.
 */
import { el } from './mapart.js';
import { nostosymPaakategoria } from './fokusnosto-symbolit.js';

/** Laitteen muisti: mitkä aiheet palavat. */
const KARTTAVALO_TALLE = 'matkakirja-karttavalot';

/**
 * SELITELISTA — KAHDEKSAN AIHETTA, kartan järjestyksessä.
 *
 * Omistajan lopullinen jako 29.8.2026. Järjestys on kartan oma eikä
 * aakkosten: ensin kaupungit (joita etsitään useimmin), sitten luonto
 * ja eläimet, sitten menneisyys, ja lopuksi ihmisen tekemiset —
 * kulttuuri, kauppa ja skandaalit.
 *
 * `nimi` on selite eli se, mitä kartalla NÄKYY. Kahdella rivillä on
 * kaksiosainen nimi, koska ryhmä on kaksiosainen: yksi lyyra kattaa
 * myös maljan ja seppeleen, yksi vaaka myös veturin ja ankkurin.
 *
 * `symboli` on ryhmän kärkisymboli symbolikirjaston tunnuksena
 * (piirraNostosymboli) — se merkki, joka rivillä näytetään. Ryhmän
 * muut symbolit näkyvät kartalla omina merkkeinään; ne kuuluvat tähän
 * riviin NOSTOSYM_PAAKATEGORIAT-taulun kautta.
 */
export const KARTTAVALO_AIHEET = [
  { aihe: 'kaupungit', nimi: 'Kaupungit', symboli: 'kaupunki' },
  { aihe: 'luonto', nimi: 'Luonto', symboli: 'luonto' },
  { aihe: 'elaimet', nimi: 'Eläimet', symboli: 'elain' },
  { aihe: 'historia', nimi: 'Historia', symboli: 'historia' },
  { aihe: 'ihmeet', nimi: 'Kadonneet ihmeet', symboli: 'ihme' },
  { aihe: 'kulttuuri', nimi: 'Kulttuuri ja ruoka', symboli: 'kulttuuri' },
  { aihe: 'kauppa', nimi: 'Kauppa ja tekniikka', symboli: 'kauppa' },
  { aihe: 'skandaalit', nimi: 'Skandaalit', symboli: 'huuto' },
];

/** Tunnetut aiheet — yksi totuus myös kutsujien tarkistuksiin. */
export const KARTTAVALO_TYYPIT = new Set(KARTTAVALO_AIHEET.map((r) => r.aihe));

/**
 * Aiheen väri CSS-lausekkeena.
 *
 * Väri luetaan ryhmän kärkisymbolin omasta muuttujasta (--sym-*), eli
 * pallo on täsmälleen se muste, jolla kärkimerkki on kartalle
 * piirretty. Ryhmän muut merkit ovat kartalla omissa väreissään —
 * pallo lupaa aiheen, ei yhtä sävyä.
 */
export function karttavaloVari(aihe) {
  const rivi = KARTTAVALO_AIHEET.find((r) => r.aihe === aihe);
  return `var(--sym-${rivi?.symboli ?? 'kaupunki'}, #8a6d4a)`;
}

/*
 * VALON MITAT lehden perustason ruutupikseleinä (merkkien ankkurit
 * ovat kartan mittakaavassa, ks. js/fokuskohteet.js sääntö 3).
 * Uloin kehä on 12, eli 24 px läpimitta perustasolla — pienempi kuin
 * merkin 44 px:n osuma-alue, jotta valo on TÄPLÄ merkin alla eikä
 * lautanen sen ympärillä.
 */
const KARTTAVALO_KEHAT = [
  { r: 12, opacity: 0.14 },
  { r: 7.4, opacity: 0.24 },
  { r: 3.6, opacity: 0.42 },
];

/**
 * VALOTÄPLÄ MERKIN ALLE.
 *
 * @param {Element} g       merkin ryhmä; valo lisätään sen ensimmäiseksi
 *   lapseksi, jolloin kaiverrus jää päälle.
 * @param {?string} symboli merkin OMA symbolikategoria
 *   (js/fokusnosto-symbolit.js NOSTOSYM_TYYPIT). Aihe eli valikon rivi
 *   johdetaan siitä NOSTOSYM_PAAKATEGORIAT-taululla, jotta kutsujan ei
 *   tarvitse tietää ryhmittelystä mitään — merkki tuntee vain oman
 *   symbolinsa, ja ryhmittely elää yhdessä paikassa. Symboliton merkki
 *   (null, tuntematon) ei saa valoa.
 * @param {string} avain    merkin oma tunnus (kohde-id, maakoodi, täyn
 *   tunnus). Kiertävällä laudalla sama merkki piirretään kahteen
 *   kiertokohtaan, ja laskuri (karttavalotLaskurit) laskee KAPPALEET
 *   eikä solmuja — avain on se, mikä erottaa kaksoiskappaleen omasta
 *   kohteestaan.
 * @param {number} koko     kerroin isäntämerkin mittakaavaan. Kirjaston
 *   symboli on kohdemerkillä kutistettu (KOHDE_SYMBOLI_SKAALA), joten
 *   valonkin on kutistuttava sen mukana — muuten sama täplä olisi
 *   eläintäyn alla sopiva ja kohdemerkin alla lautanen.
 */
export function piirraKarttavalo(g, symboli, avain, koko = 1) {
  const aihe = nostosymPaakategoria(symboli);
  if (!g || !aihe) return null;
  const valo = el('g', {
    class: `karttavalo karttavalo-${aihe}`,
    'data-aihe': aihe,
    // Alalaji jää talteen merkkiin: savuke lukee siitä, että yksi
    // pallo sytyttää ryhmän KAIKKI symbolit eikä vain kärkimerkkiä.
    'data-ala': symboli,
    'data-avain': String(avain ?? aihe),
    'pointer-events': 'none',
    fill: karttavaloVari(aihe),
  });
  for (const keha of KARTTAVALO_KEHAT) {
    el('circle', { r: (keha.r * koko).toFixed(2), opacity: keha.opacity }, valo);
  }
  g.insertBefore(valo, g.firstChild);
  return valo;
}

/* ==================== TILA ==================== */

/** Muistissa oleva totuus; levy on sen peili (ks. karttavalotLue). */
let karttavaloPalaa = null;

/**
 * Palavat aiheet levyltä.
 *
 * Yksityinen selaus ja evästekiellot heittävät jo lukemisesta, joten
 * vika ei saa kaataa karttaa: tyhjä joukko on kelpo vastaus, ja valot
 * ovat silloin vain pois päältä.
 */
export function karttavalotLue() {
  if (karttavaloPalaa) return karttavaloPalaa;
  karttavaloPalaa = new Set();
  try {
    const raaka = JSON.parse(localStorage.getItem(KARTTAVALO_TALLE) ?? '[]');
    if (Array.isArray(raaka)) {
      for (const aihe of raaka) if (KARTTAVALO_TYYPIT.has(aihe)) karttavaloPalaa.add(aihe);
    }
  } catch { /* yksityinen selaus tai rikkonut arvo — valot pois */ }
  return karttavaloPalaa;
}

/** Muisti levylle. Kirjoituksen epäonnistuminen ei saa kaataa kytkintä. */
function karttavalotTallenna() {
  try {
    localStorage.setItem(KARTTAVALO_TALLE, JSON.stringify([...karttavalotLue()]));
  } catch { /* yksityinen selaus — tila elää istunnon ajan */ }
}

/**
 * TILA BODYN LUOKIKSI. Tämä on ainoa paikka, jossa valot syttyvät ja
 * sammuvat — kaikki kytkimet päätyvät tänne.
 */
export function karttavalotSovita() {
  if (typeof document === 'undefined') return;
  const palaa = karttavalotLue();
  for (const { aihe } of KARTTAVALO_AIHEET) {
    document.body.classList.toggle(`valot-${aihe}`, palaa.has(aihe));
  }
}

/** Palaako aihe. */
export const karttavaloPaalla = (aihe) => karttavalotLue().has(aihe);

/** Yhden aiheen kytkin; ilman `paalla`-arvoa vaihtaa tilan. */
export function karttavaloAseta(aihe, paalla) {
  if (!KARTTAVALO_TYYPIT.has(aihe)) return false;
  const palaa = karttavalotLue();
  const uusi = paalla ?? !palaa.has(aihe);
  if (uusi) palaa.add(aihe); else palaa.delete(aihe);
  karttavalotTallenna();
  karttavalotSovita();
  return uusi;
}

/** OFF ja ALL: kaikki kerralla pois tai päälle. */
export function karttavalotKaikki(paalla) {
  const palaa = karttavalotLue();
  palaa.clear();
  if (paalla) for (const { aihe } of KARTTAVALO_AIHEET) palaa.add(aihe);
  karttavalotTallenna();
  karttavalotSovita();
}

/* ==================== LASKURIT ==================== */

/**
 * KAPPALEMÄÄRÄT AIHEITTAIN — mitä kartalla NYT on.
 *
 * Omistajan lisätilaus 29.8.2026: *"selitevalikossa voisi näkyä myös
 * kappalemäärä kyseisen maan kohdalla"*.
 *
 * Luku lasketaan KARTALLE PIIRRETYISTÄ MERKEISTÄ eikä datataulukoista,
 * ja se on tarkoituksella juuri se joukko, jonka valo sytyttää: rivin
 * numero lupaa täsmälleen niin monta täplää kuin kartalta löytyy.
 * Fokusnäkymässä kohdemerkit ovat nykyisen maan omia
 * (js/fokuskohteet.js nykyisenMaanKohteet), joten luku on silloin
 * kirjaimellisesti "kappalemäärä kyseisen maan kohdalla"; laudalla,
 * jolla merkkejä on maan yli (eläintäyt), luku on laudan oma summa.
 *
 * KIERTOKOHDAT EIVÄT TUPLAA LUKUA. Kiertävällä laudalla sama merkki
 * piirretään kahteen kohtaan (ui.kiertoKohdat), joten laskuri laskee
 * ERI avaimia eikä solmuja.
 */
export function karttavalotLaskurit(ui) {
  const luvut = new Map(KARTTAVALO_AIHEET.map(({ aihe }) => [aihe, 0]));
  const juuri = ui?.svg;
  if (!juuri) return luvut;
  const nahdyt = new Map();
  for (const valo of juuri.querySelectorAll('.karttavalo')) {
    const aihe = valo.getAttribute('data-aihe');
    if (!luvut.has(aihe)) continue;
    let joukko = nahdyt.get(aihe);
    if (!joukko) { joukko = new Set(); nahdyt.set(aihe, joukko); }
    joukko.add(valo.getAttribute('data-avain'));
  }
  for (const [aihe, joukko] of nahdyt) luvut.set(aihe, joukko.size);
  return luvut;
}
