/*
 * PÖLLÖPOIMINNAT — hyvä vastaus talteen artikkeliin (omistajan tilaus
 * 23.8.2026, kuvakaappaus Prahan Vanhauusi synagoga -jutusta).
 *
 * Pöllön chat on hetken juttu: hyvä vastaus katoaa sulkiessa. Poiminta
 * on sen vastakohta — kysymys–vastaus-pari kiinnitetään SIIHEN
 * artikkeliin, jonka äärellä se kysyttiin, ja näkyy sen lopussa
 * pillerinä. Pillerissä on vain kysymys; vastaus aukeaa napautuksesta
 * minipopupiin (js/minipopup.js — sama ikkuna kuin tietäjän
 * tasogalleriassa, ei toista ikkunatoteutusta).
 *
 * KOLME LÄHDETTÄ, YKSI NÄKYVÄ POLKU PELAAJALLE
 *
 * 1. PAKETTI (js/packs/pollo-poiminnat.js) on ainoa, jonka parit
 *    näkyvät kaikille. Fable committoi sinne kuratoidut parit.
 * 2. LAITTEEN OMAT (localStorage) syntyvät kehittäjätilan "Tallenna
 *    juttuun" -napista ja näkyvät pillereinä VAIN kehittäjätilassa
 *    omalla laitteella. Kuratoimatonta ainesta ei näytetä pelaajille.
 * 3. PELAAJAN EHDOTUS lähtee olemassa olevaa ehdotuskanavaa pitkin
 *    (js/ehdotukset.js lahetaEhdotus) omistajan Lukijoilta-
 *    kuratointiin eikä renderöidy pillerinä koskaan suoraan.
 *
 * VIENTI: kehittäjätilan Tilannelehdessä on "Pöllöpoiminnat"-sivu,
 * joka näyttää laitteen parit valmiina POLLO_POIMINNAT-lohkona
 * kopioitavaksi pakettiin (+ Tyhjennä). Näin kuratointi on
 * kopioi–liitä–committoi eikä käsityötä.
 *
 * EI LUENTAAN EIKÄ PÖLLÖN KONTEKSTIIN. Pillerit ja vastaukset eivät
 * ole leipätekstiä: lukijan valkolista poimii vain
 * data-lukija="leipa|otsikko" -solmut (js/lukija.js), joita täällä ei
 * aseteta, ja säiliö saa data-pollo="ei", joka on pöllön mustalla
 * listalla (js/pollo.js SPOILERI_LOHKOT) — pöllö ei siis lue omia
 * vanhoja vastauksiaan takaisin kontekstiinsa.
 */

import { POLLO_POIMINNAT } from './packs/pollo-poiminnat.js';
import { avaaMinipopup } from './minipopup.js';

/** Laitteen omat poiminnat. Ei kuulu pelin tallennukseen. */
export const POIMINNAT_TALLE = 'matkakirja-pollo-poiminnat';

/*
 * Kehittäjätilan avain luetaan suoraan localStoragesta, kuten
 * js/pollo.js:ssä: tämän moduulin tuo sekä lehti että pöllö, ja
 * ui-apurit-tuonti vain yhtä lippua varten olisi turha solmu.
 *
 * Nimi on tämän moduulin oma (POIMINTOJEN_KEHITTAJA_AVAIN): yhden
 * tiedoston koonti on yhtä näkyvyysaluetta, ja js/ui-apurit.js sekä
 * js/pollo.js pitävät saman avaimen omissa vakioissaan.
 */
const POIMINTOJEN_KEHITTAJA_AVAIN = 'matkakirja-kehittaja';

/** Onko kehittäjävipu päällä tällä laitteella? */
export function poimintaKehittaja() {
  try {
    return localStorage.getItem(POIMINTOJEN_KEHITTAJA_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

/* ------------------------------------------------------------------ *
 * Avaimet
 * ------------------------------------------------------------------ */

/**
 * Nähtävyysjutun tunniste.
 *
 * @param {string} kaupunkiId kaupungin id (lehtitila.arrivalShownFor)
 * @param {string} nimi kohteen nimi täsmälleen aineiston mukaisena
 * @returns {string|null} tunniste tai null, jos kumpikin osa ei ole
 */
export function juttuAvain(kaupunkiId, nimi) {
  if (!kaupunkiId || !nimi) return null;
  return `juttu:${kaupunkiId}:${nimi}`;
}

/**
 * Aihesivun tunniste.
 *
 * @param {string} tunniste kaupungin id tai maan ISO3
 * @param {string} kategoriaId aihesivun id
 * @returns {string|null} tunniste tai null
 */
export function aiheAvain(tunniste, kategoriaId) {
  if (!tunniste || !kategoriaId) return null;
  return `aihe:${tunniste}:${kategoriaId}`;
}

/**
 * Auki olevan artikkelin tunniste pelin tilasta.
 *
 * Tila luetaan ui.lehtitilasta eikä DOMista: otsikkoelementissä on
 * mukana kaiutinnappi, ja tekstisisällöstä kaivettu nimi voisi erota
 * aineiston nimestä yhdellä välilyönnillä — silloin tallennettu pari
 * ei enää löytäisi omaa juttuaan.
 *
 * Nähtävyysjuttu voittaa lehden: se on pinossa päällimmäisenä ja se
 * on se, mitä pelaaja katsoo (sama sääntö kuin pöllön
 * kontekstinkeruussa, js/pollo.js paallimmainenJuttu).
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {Document} [doc] dokumentti (testejä varten)
 * @returns {string|null} tunniste tai null, jos avoinna ei ole artikkelia
 */
export function nykyinenPoimintaAvain(ui, doc = (typeof document === 'undefined' ? null : document)) {
  const tila = ui?.lehtitila;
  if (!tila) return null;
  const juttu = doc?.getElementById?.('nahtavyys-dialog');
  if (juttu?.open && tila.nahtavyysAuki?.kohde?.nimi) {
    return juttuAvain(tila.arrivalShownFor, tila.nahtavyysAuki.kohde.nimi);
  }
  const lehti = doc?.getElementById?.('arrival-dialog');
  if (!lehti?.open) return null;
  // Kehittäjän liitteet (Raamattu, Tilanne, Tilastot) eivät ole
  // pelin artikkeleita — niihin ei poimita mitään.
  if (tila.tutkiTila === 'kehittaja') return null;
  const sivu = tila.tutkiSivut?.[(tila.tutkiSivu ?? 0) - 1] ?? null;
  if (!sivu?.id) return null;
  const omistaja = tila.tutkiTila === 'maa' && tila.tutkiMaaLehti
    ? tila.tutkiMaaLehti : tila.arrivalShownFor;
  return aiheAvain(omistaja, sivu.id);
}

/* ------------------------------------------------------------------ *
 * Laitteen oma varasto
 * ------------------------------------------------------------------ */

/** Kaikki laitteen omat poiminnat avaimittain. */
export function lueOmatPoiminnat() {
  try {
    const raaka = localStorage.getItem(POIMINNAT_TALLE);
    const data = raaka ? JSON.parse(raaka) : null;
    if (!data || typeof data !== 'object') return {};
    const ulos = {};
    for (const [avain, parit] of Object.entries(data)) {
      if (Array.isArray(parit)) ulos[avain] = parit.filter((p) => p?.kysymys && p?.vastaus);
    }
    return ulos;
  } catch {
    return {};
  }
}

/**
 * Tallentaa parin laitteelle.
 *
 * @returns {boolean} tosi, jos pari meni talteen (tupla ei ole virhe,
 *   mutta se ei myöskään ole uusi tallennus)
 */
export function tallennaPoiminta(avain, kysymys, vastaus) {
  const k = String(kysymys ?? '').trim();
  const v = String(vastaus ?? '').trim();
  if (!avain || !k || !v) return false;
  const kaikki = lueOmatPoiminnat();
  const lista = kaikki[avain] ?? [];
  if (lista.some((p) => p.kysymys === k)) return false;
  kaikki[avain] = [...lista, { kysymys: k, vastaus: v }];
  try {
    localStorage.setItem(POIMINNAT_TALLE, JSON.stringify(kaikki));
    return true;
  } catch {
    return false; // yksityinen selaus tai täysi kiintiö
  }
}

/** Tyhjentää laitteen omat poiminnat (vienti tehty). */
export function tyhjennaPoiminnat() {
  try {
    localStorage.removeItem(POIMINNAT_TALLE);
  } catch { /* yksityinen selaus */ }
}

/* ------------------------------------------------------------------ *
 * Yhdistäminen ja vienti
 * ------------------------------------------------------------------ */

/**
 * Yhden artikkelin näytettävät poiminnat.
 *
 * Paketti ensin, laitteen omat perään ja tuplat pois kysymyksen
 * perusteella. Laitteen omat tulevat mukaan VAIN kehittäjätilassa.
 *
 * @param {string} avain artikkelin tunniste
 * @param {{kehittaja?: boolean, omat?: object, pakka?: object}} [asetukset]
 * @returns {Array<{kysymys: string, vastaus: string, oma?: boolean}>}
 */
export function poiminnat(avain, { kehittaja = poimintaKehittaja(), omat = null, pakka = POLLO_POIMINNAT } = {}) {
  if (!avain) return [];
  const ulos = [];
  const nahdyt = new Set();
  for (const pari of pakka?.[avain] ?? []) {
    if (!pari?.kysymys || !pari?.vastaus || nahdyt.has(pari.kysymys)) continue;
    nahdyt.add(pari.kysymys);
    ulos.push({ kysymys: pari.kysymys, vastaus: pari.vastaus });
  }
  if (!kehittaja) return ulos;
  for (const pari of (omat ?? lueOmatPoiminnat())[avain] ?? []) {
    if (!pari?.kysymys || !pari?.vastaus || nahdyt.has(pari.kysymys)) continue;
    nahdyt.add(pari.kysymys);
    ulos.push({ kysymys: pari.kysymys, vastaus: pari.vastaus, oma: true });
  }
  return ulos;
}

/**
 * Laitteen parit valmiina JS-lohkona pakettiin kopioitavaksi.
 *
 * Merkkijonot lainataan JSON.stringifyllä: heittomerkki tai
 * rivinvaihto vastauksessa ei saa rikkoa lohkoa, jonka omistaja
 * liittää tiedostoon sellaisenaan.
 *
 * @param {object} [omat] parit (oletuksena laitteelta)
 * @returns {string} lohko tai tyhjä merkkijono, jos pareja ei ole
 */
export function vientiLohko(omat = lueOmatPoiminnat()) {
  const avaimet = Object.keys(omat).filter((a) => (omat[a] ?? []).length).sort();
  if (!avaimet.length) return '';
  const rivit = ['export const POLLO_POIMINNAT = {'];
  for (const avain of avaimet) {
    rivit.push(`  ${JSON.stringify(avain)}: [`);
    for (const pari of omat[avain]) {
      rivit.push('    {');
      rivit.push(`      kysymys: ${JSON.stringify(pari.kysymys)},`);
      rivit.push(`      vastaus: ${JSON.stringify(pari.vastaus)},`);
      rivit.push('    },');
    }
    rivit.push('  ],');
  }
  rivit.push('};');
  return rivit.join('\n');
}

/* ------------------------------------------------------------------ *
 * Pillerit
 * ------------------------------------------------------------------ */

/**
 * Piirtää poimintapillerit artikkelin loppuun.
 *
 * Nappi eikä linkki: kohde ei ole osoite vaan selitys. Vastaus
 * asetetaan tekstisisältönä kappale kerrallaan — mallin tuottamaa
 * tekstiä ei tulkita merkkauksena missään vaiheessa.
 *
 * @param {HTMLElement} kohde säiliö, jonka loppuun rivi liitetään
 * @param {string} avain artikkelin tunniste
 * @param {object} [asetukset] välitetään poiminnat-funktiolle
 * @returns {HTMLElement|null} rivi tai null, jos poimintoja ei ole
 */
export function piirraPoimintapillerit(kohde, avain, asetukset = {}) {
  if (!kohde || typeof document === 'undefined') return null;
  const parit = poiminnat(avain, asetukset);
  if (!parit.length) return null;

  const rivi = document.createElement('div');
  rivi.className = 'pollo-poiminnat';
  // Pöllön musta lista: omat vanhat vastaukset eivät palaa kontekstiin.
  rivi.dataset.pollo = 'ei';
  const nimio = document.createElement('span');
  nimio.className = 'pollo-poiminnat-nimio';
  nimio.textContent = 'Pöllöltä kysyttyä';
  rivi.appendChild(nimio);

  for (const pari of parit) {
    const pilleri = document.createElement('button');
    pilleri.type = 'button';
    pilleri.className = `pollo-pilleri${pari.oma ? ' oma' : ''}`;
    pilleri.textContent = pari.kysymys;
    if (pari.oma) pilleri.title = 'Tallennettu tällä laitteella — ei vielä paketissa';
    pilleri.addEventListener('click', () => {
      const sisalto = String(pari.vastaus).split('\n\n').filter(Boolean).map((kappale) => {
        const p = document.createElement('p');
        p.className = 'minipopup-teksti';
        p.textContent = kappale;
        return p;
      });
      avaaMinipopup({ otsikko: pari.kysymys, sisalto, luokka: 'pollo-poiminta' });
    });
    rivi.appendChild(pilleri);
  }
  kohde.appendChild(rivi);
  return rivi;
}

/**
 * Piirtää auki olevan artikkelin pillerit uudestaan.
 *
 * Tallennus tapahtuu pöllön chatissa, joka on artikkelin PÄÄLLÄ auki:
 * ilman tätä uusi pilleri ilmestyisi vasta seuraavalla avauksella.
 * Rivi vaihdetaan kokonaan uuteen, jottei sama pilleri kahdennu.
 *
 * @param {string} avain artikkelin tunniste
 * @param {Document} [doc] dokumentti
 * @returns {HTMLElement|null} uusi rivi tai null
 */
export function paivitaPillerit(avain, doc = (typeof document === 'undefined' ? null : document)) {
  if (!avain || !doc) return null;
  const juttu = String(avain).startsWith('juttu:');
  const dialogi = doc.getElementById?.(juttu ? 'nahtavyys-dialog' : 'arrival-dialog');
  if (!dialogi?.open) return null;
  const kohde = doc.getElementById?.(juttu ? 'nahtavyys-sisalto' : 'arrival-kategoria');
  if (!kohde) return null;
  kohde.querySelector('.pollo-poiminnat')?.remove();
  const rivi = piirraPoimintapillerit(kohde, avain);
  // Aihesivun tehtävälaatikko pysyy sivun pohjalla: pillerit kuuluvat
  // sen eteen kuten ensipiirrossakin (js/maalehti.js piirraKategoria).
  const tehtava = kohde.querySelector('.minitehtava');
  if (rivi && tehtava) kohde.insertBefore(rivi, tehtava);
  return rivi;
}
