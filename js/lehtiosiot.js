/**
 * KAUPUNKILEHDEN ETUSIVUN OSIOHAKEMISTO (omistaja 27.9.2026 klo 23.1x ja
 * 23.4x, kortilla hyväksytty mock).
 *
 * Kaupunkiliuska poistui (kaupungin napautus avaa avauskortin), joten
 * kaupungin nostot elävät nyt kaupunkilehden osioissa. Etusivun alle
 * tulee selkeä hakemisto: jokainen osio on linkki, sen alla osion
 * jutunotsikot ja YKSI KUVA osiota kohden (jokaiselle osiolle oma kuva).
 *
 * OSIOT KAHDESTA LÄHTEESTÄ, TUPLAT YHDISTETÄÄN:
 *   1. lehden omat osiot (ui.lehtitila.tutkiSivut: historia, arki,
 *      musiikki, historian hetket …) — linkki avaa lehden sivun;
 *   2. kaupungin nostot (liuskan entinen sisältö, myös löydöksen 178
 *      tarinakohteet) aiheittain (js/pallolauta/kaupunkiliuska.js
 *      kategoriat) — rivi avaa noston oman kortin.
 * Sama asia kahdesti (historian hetki nostona JA lehden sivuna) näkyy
 * kerran: tunnus tai nimi, joka on jo lehden osiossa, ohitetaan.
 *
 * Nähtävyydet, Turisti-info ja Radio eivät ole enää lehdessä (ne ovat
 * avauskortissa ja kartussissa), joten ne eivät ole hakemistossakaan.
 */
import { KOHDE_MAAT } from './fokuskohteet.js';
import { NOSTO_MAAT, nostonKuvat } from './fokusnosto.js';
import { hetkenKuvat, HISTORIAN_HETKET } from './packs/historian-hetket.js';
import { assetOsoite, asetaKuva, julisteUrl } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { SKANDAALIT } from './packs/skandaalit.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { KAUPUNKIKARTAT } from './packs/maakartat.js';
import { kategoriat as osiohakKategoriat } from './pallolauta/kaupunkiliuska.js';
import { html } from './ui-apurit.js';

/** Hakemiston otsikko etusivulla. */
export const OSIOHAKEMISTON_OTSIKKO = 'Lehden osiot';
/** Montako jutunotsikkoa osion alla näytetään ennen "… ja N muuta" -riviä. */
export const OSIOHAKEMISTON_OTSIKOITA = 4;

/** Lehden sivun aihe hakemistossa: historian hetket yhdeksi osioksi. */
function osiohakSivunAihe(osa) {
  return String(osa?.id ?? '').startsWith('hetki-') ? 'hetket' : String(osa?.id ?? '');
}

/** Jutun otsikko lehden sivulta ("Paikka 1898 — alaotsikko" → ennen viivaa). */
function osiohakOtsikko(nosto, osa) {
  const t = nosto?.otsikko ?? nosto?.nimi ?? osa?.nimi ?? '';
  return String(t).split(' — ')[0].trim();
}

/** Kuvatieto → { osoite } tai { tiedosto } tai null (ensimmäinen käypä). */
function osiohakKuvaLehdesta(osa) {
  for (const n of osa?.nostot ?? []) {
    const k = n?.kuvat?.[0] ?? n?.kuva ?? null;
    if (k?.tiedosto || k?.ampari || k?.osoite) return k;
  }
  const kansi = osa?.kansikuvat?.[0] ?? osa?.avauskuvat?.[0] ?? null;
  return kansi?.tiedosto || kansi?.ampari ? kansi : null;
}

/**
 * Noston kuva tunnuksen mukaan (liuskan rivit): historian hetki, täkynosto,
 * skandaali tai kaupunkikartan tarinakohteen nähtävyysjuttu.
 */
export function osiohakNostonKuva(id, { iso = null, cityId = null } = {}) {
  const tunnus = String(id ?? '');
  if (tunnus.startsWith('hetki-')) {
    const h = HISTORIAN_HETKET.find((x) => x.id === tunnus.slice(6));
    const k = h ? hetkenKuvat(h)[0] : null;
    if (k?.osoite) return { osoite: k.osoite, suora: true };
  }
  if (tunnus.startsWith('nosto-') && iso) {
    const n = (NOSTO_MAAT[iso] ?? []).find((x) => x.id === tunnus.slice(6));
    const k = n ? nostonKuvat(n)[0] : null;
    if (k) return k;
  }
  if (tunnus.startsWith('skandaali-') && iso) {
    const s = (SKANDAALIT[iso] ?? []).find((x) => x.id === tunnus.slice(10));
    if (s?.kuva?.osoite || s?.kuva?.tiedosto) return s.kuva;
  }
  // Kadonnut ihme tai muu kohde, jolla on oma kuva (ihmeen loistoaika).
  const kohde0 = Object.values(KOHDE_MAAT).flat().find((k) => k?.id === tunnus);
  if (kohde0?.ihme?.osoite) return { osoite: kohde0.ihme.osoite, suora: true };
  if (kohde0?.kuva?.osoite || kohde0?.kuva?.tiedosto) return kohde0.kuva;
  // Kaupunkikartan kohde, joka kantaa tämän noston: sen juttu kuvineen.
  if (cityId) {
    const kohde = (KAUPUNKIKARTAT[cityId]?.kohteet ?? []).find((k) => (Array.isArray(k.nosto) ? k.nosto : [k.nosto]).includes(tunnus));
    const juttu = kohde ? NAHTAVYYSJUTUT[cityId]?.[kohde.nimi] : null;
    const k = juttu?.kuvat?.[0] ?? null;
    if (k?.osoite || k?.tiedosto) return k;
  }
  return null;
}

/** Kuvan tunniste päällekkäisyyden estoon (jokaiselle osiolle oma kuva). */
function osiohakKuvanAvain(k) {
  return k ? String(k.osoite ?? k.ampari ?? k.tiedosto ?? '') : '';
}

function osiohakAsetaKuva(img, k) {
  if (k.suora) { img.src = k.osoite; return; }
  if (k.osoite) { img.src = assetOsoite('nostot', k.osoite); return; }
  if (k.ampari) { asetaKuva(img, julisteUrl(k.ampari), null); return; }
  asetaKuva(img, valokuvaUrl(k.tiedosto, 320), valokuvaVara(k.tiedosto, 320));
}

/**
 * Hakemiston osiot (puhdas, testattava): lehden sivut ja kaupungin
 * nostot aiheittain, tuplat yhdistettyinä, kuva osiota kohden.
 *
 * @param {object} p
 * @param {Array<object>} p.sivut ui.lehtitila.tutkiSivut (sivu i+1 = sivut[i])
 * @param {Array<object>} p.nostot kaupungin nostorivit { id, nimi, aihe, avaa }
 * @returns {Array<{ aihe, nimi, sivu: number|null, jutut: Array<{ otsikko, sivu?, avaa? }>, kuva }>}
 */
export function osiohakemisto({ sivut = [], nostot = [], iso = null, cityId = null } = {}) {
  const osiot = new Map();
  const nahty = new Set();
  const osio = (aihe, nimi) => {
    if (!osiot.has(aihe)) osiot.set(aihe, { aihe, nimi, sivu: null, jutut: [], ehdokkaat: [] });
    return osiot.get(aihe);
  };
  sivut.forEach((osa, i) => {
    if (!osa || osa.id === 'kaupunki') return;
    const aihe = osiohakSivunAihe(osa);
    const o = osio(aihe, aihe === 'hetket' ? 'Historian hetket' : (osa.nimi ?? aihe));
    if (o.sivu == null) o.sivu = i + 1;
    // Sivu ilman juttuja (esim. Musiikki: vain johdanto) on osiolinkki ilman rivejä.
    for (const n of osa.nostot ?? []) {
      const otsikko = osiohakOtsikko(n, osa);
      if (!otsikko || nahty.has(otsikko.toLowerCase())) continue;
      nahty.add(otsikko.toLowerCase());
      o.jutut.push({ otsikko, sivu: i + 1 });
    }
    nahty.add(String(osa.id));
    o.ehdokkaat.push(aihe === 'hetket' ? osiohakNostonKuva(osa.id) : osiohakKuvaLehdesta(osa));
  });
  for (const kasa of osiohakKategoriat(nostot)) {
    const aihe = kasa.aihe || 'muut';
    for (const r of kasa.jasenet) {
      const otsikko = String(r.nimi ?? '').trim();
      if (!otsikko || nahty.has(String(r.id)) || nahty.has(otsikko.toLowerCase())) continue;
      nahty.add(String(r.id));
      nahty.add(otsikko.toLowerCase());
      const o = osio(aihe, kasa.nimi);
      o.jutut.push({ otsikko, avaa: r.avaa });
      o.ehdokkaat.push(osiohakNostonKuva(r.id, { iso, cityId }));
    }
  }
  // Varakuvat: kaupungin nähtävyysjuttujen kuvat (osio, jolla ei ole omaa kuvaa).
  const varat = Object.values(NAHTAVYYSJUTUT[cityId] ?? {}).map((j) => j?.kuvat?.[0]).filter((k) => k?.osoite || k?.tiedosto);
  const kaytetyt = new Set();
  const tulos = [];
  for (const o of osiot.values()) {
    if (!o.jutut.length && o.sivu == null) continue;
    const kuva = [...o.ehdokkaat, ...varat].find((k) => k && !kaytetyt.has(osiohakKuvanAvain(k))) ?? null;
    if (kuva) kaytetyt.add(osiohakKuvanAvain(kuva));
    tulos.push({ aihe: o.aihe, nimi: o.nimi, sivu: o.sivu, jutut: o.jutut, kuva });
  }
  return tulos;
}

/**
 * Piirtää hakemiston lehden etusivulle.
 *
 * @param {object} ui
 * @param {HTMLElement} kohde
 * @param {{ osiot: Array<object>, avaaSivu: (sivu: number) => void }} p
 */
export function piirraOsiohakemisto(ui, kohde, { osiot, avaaSivu }) {
  if (!osiot?.length) return null;
  const lohko = html('section', 'lehti-osiohakemisto');
  lohko.appendChild(html('h3', 'lehti-osiohakemisto-otsikko', OSIOHAKEMISTON_OTSIKKO));
  for (const o of osiot) {
    const rivi = html('div', 'lehti-osio');
    const kuvapaikka = html('div', 'lehti-osio-kuva');
    if (o.kuva) {
      const img = document.createElement('img');
      img.alt = '';
      img.decoding = 'async';
      img.addEventListener('error', () => { kuvapaikka.classList.add('tyhja'); img.remove(); }, { once: true });
      osiohakAsetaKuva(img, o.kuva);
      kuvapaikka.appendChild(img);
    } else kuvapaikka.classList.add('tyhja');
    rivi.appendChild(kuvapaikka);
    const tekstit = html('div', 'lehti-osio-tekstit');
    const ensimmainen = o.jutut[0];
    const linkki = html('button', 'lehti-osio-linkki', `${o.nimi} →`);
    linkki.type = 'button';
    linkki.addEventListener('click', () => {
      if (o.sivu != null) avaaSivu(o.sivu);
      else ensimmainen?.avaa?.();
    });
    tekstit.appendChild(linkki);
    const lista = html('ul', 'lehti-osio-jutut');
    const nayta = (j) => {
      const li = html('li');
      const b = html('button', 'lehti-osio-juttu', j.otsikko);
      b.type = 'button';
      b.addEventListener('click', () => {
        if (j.sivu != null) avaaSivu(j.sivu);
        else j.avaa?.();
      });
      li.appendChild(b);
      lista.appendChild(li);
    };
    o.jutut.slice(0, OSIOHAKEMISTON_OTSIKOITA).forEach(nayta);
    const loput = o.jutut.length - OSIOHAKEMISTON_OTSIKOITA;
    if (loput > 0) {
      const li = html('li', 'lehti-osio-lisaa');
      const b = html('button', 'lehti-osio-juttu', `… ja ${loput} muuta`);
      b.type = 'button';
      b.addEventListener('click', () => {
        li.remove();
        o.jutut.slice(OSIOHAKEMISTON_OTSIKOITA).forEach(nayta);
      });
      li.appendChild(b);
      lista.appendChild(li);
    }
    tekstit.appendChild(lista);
    rivi.appendChild(tekstit);
    lohko.appendChild(rivi);
  }
  kohde.appendChild(lohko);
  return lohko;
}
