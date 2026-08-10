// Karttapakettien rekisteri. Jokainen paketti on yksi pelilauta: kartta,
// kaupungit, reitit, laatat, kysymykset ja teema. Uusi lauta lisätään
// tekemällä js/packs/-hakemistoon vastaava tiedosto ja listaamalla se tässä.

import { MAAILMA } from './packs/maailma.js';
import { AFRICA } from './packs/africa.js';
import { MIDDLE_EAST } from './packs/middleeast.js';
import { EUROPE } from './packs/europe.js';
import { SOUTHAMERICA } from './packs/southamerica.js';
import { NORTHAMERICA } from './packs/northamerica.js';
import { ASIA } from './packs/asia.js';
import { OCEANIA } from './packs/oceania.js';
import { MAAILMANKARTTA } from './packs/maailmankartta.js';

/*
 * PELI on yksi lauta: maailmankartta (omistajan päätös 10.8.2026 —
 * "peli kehitettiin alunperin eri maanosien ympärille, mutta
 * myöhemmin kaikki yhdistettiin yhdeksi laudaksi; muut laudat
 * kannattaa poistaa"). Kaikki laudanvaihtoportit on poistettu
 * pakkojen links-kentistä; ainoa portti on aloitusnäytön (maailma)
 * kaupungeista maailmankartalle.
 *
 * Maanosapakat ovat listassa enää kahdesta syystä: ne ovat
 * maailmankartan DATAN lähde (kaupungit, kysymykset, aarteet
 * kootaan niistä), ja työhuoneen/työkalujen katselutila
 * (?lauta=europe) piirtää niiden kartat. Peli ei voi päätyä niille.
 * Suomen ja Istanbulin koelaudat poistettiin rekisteristä kokonaan;
 * tiedostot jäävät repoon mahdollista myöhempää käyttöä varten.
 *
 * js/packs/vanhamaailma.js jää repoon: se on yhä tools/-työkalujen
 * lähde maatunnuksille, mutta peli ei enää lataa sitä.
 */
export const PACKS = [
  MAAILMA,
  MAAILMANKARTTA,
  // Vain katselutilaan ja työkaluille — ei pelattavissa:
  AFRICA, EUROPE, ASIA, OCEANIA, NORTHAMERICA, SOUTHAMERICA, MIDDLE_EAST,
];

export function packById(id) {
  return PACKS.find((pack) => pack.id === id) ?? PACKS[0];
}

/** Paketin kaikki kysymykset yhtenä listana (testejä ja tarkistuksia varten). */
export function allQuestions(pack) {
  return Object.entries(pack.questions)
    // Isoisän väittämät ovat eri muotoa (kaksi kiinteää vaihtoehtoa eikä
    // options-listaa), joten ne eivät kuulu monivalintojen joukkoon.
    .filter(([key]) => key !== 'claims')
    .flatMap(([key, list]) => list.map((question) => ({ ...question, key })));
}

// --- lähteet ---------------------------------------------------------------
//
// Periaate 2: jokainen pelin väittämä on tarkistettavissa. Kysymykseen,
// kaksintaisteluun ja Tiesitkö että -tietoon voi liittää lähteen, joka näkyy
// pelaajalle vastauksen jälkeen. Lähde on merkkijono — verkko-osoite tai
// sanallinen viite, esimerkiksi kirjan nimi ja sivu. Useampi lähde annetaan
// listana.

/** Lähteet aina listana; tyhjä lista jos lähdettä ei ole annettu. */
export function sourceList(source) {
  if (!source) return [];
  return (Array.isArray(source) ? source : [source]).filter((s) => typeof s === 'string' && s.trim());
}

/** Onko lähde verkko-osoite, joka voidaan näyttää linkkinä? */
export function isSourceUrl(source) {
  return /^https?:\/\/\S+$/.test(source.trim());
}

/**
 * Lyhyt näyttönimi lähteelle: verkko-osoitteesta pelkkä palvelimen nimi,
 * muuten teksti sellaisenaan.
 */
export function sourceLabel(source) {
  const text = source.trim();
  if (!isSourceUrl(text)) return text;
  try {
    return new URL(text).hostname.replace(/^www\./, '');
  } catch {
    return text;
  }
}

/**
 * Tiesitkö että -tieto voi olla pelkkä merkkijono tai { text, source }.
 * Näin vanha sisältö kelpaa sellaisenaan ja uuteen voi liittää lähteen.
 */
export function factText(fact) {
  return typeof fact === 'string' ? fact : fact?.text ?? '';
}

export function factSource(fact) {
  return typeof fact === 'string' ? [] : sourceList(fact?.source);
}

// --- kaksi ääntä -----------------------------------------------------------
//
// Tietoruudussa puhuu vuorotellen kaksi hahmoa: nuori herra Fogg, joka on
// matkalla juuri nyt, ja hänen isoisänsä, jonka 1870-luvun päiväkirjaa nuori
// herra lukee matkalla. Merkitsemätön teksti on nuoren havainto, jolloin
// vanha sisältö kelpaa sellaisenaan.

export const VOICES = {
  nuori: 'Nuoren herran havainto',
  isoisa: 'Isoisän päiväkirjasta, 1873',
};

/** Kumman äänellä tieto kerrotaan: 'isoisa' vai 'nuori'. */
export function factVoice(fact) {
  return typeof fact === 'object' && fact?.voice === 'isoisa' ? 'isoisa' : 'nuori';
}

/** Äänen otsikkorivi tietoruutuun. */
export function voiceTitle(voice) {
  return VOICES[voice] ?? VOICES.nuori;
}
