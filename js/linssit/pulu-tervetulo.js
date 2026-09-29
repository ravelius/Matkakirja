/*
 * PULUN TERVETULO ASTRONAUTIN KAMERAAN (A1–A2) — päätoimittajan
 * käsikirjoitus 28.9.2026 (docs/raportit/pulu-iss-kasikirjoitus-20260928.md),
 * lyhennetty omistajan palautteella 29.9.2026.
 *
 * OMISTAJA 29.9.2026: selitys oli liian pitkä. Suositukset, pallon
 * pyöräytys ja väärä kuva (B- ja C-ryhmät) jäivät pois, eikä Pulu puhu
 * kuplin: linssin aktivoinnissa Pulun taulu (js/linssit/pulu-taulu.js)
 * aukeaa heti näkyviin, ja Pulu puhuu tervetulonsa sen aikana ilman
 * kuplaa (js/pollo.js polloPuheIlmanKuplaa). Tervetulo ei liikuta kameraa.
 *
 * JAKSO (yksi kerta, vain linssin ENSIMMÄISELLÄ avauksella):
 *
 *   A1, A2  tervetulo; ohjaus on koko ajan pelaajan
 *
 * OHITUS: pelaajan napautus (tai näppäin) missä tahansa puheen aikana
 * vaientaa Livian heti. Napautus menee silti perille (taulun rivi, pallo,
 * ✕), joten taulun valinta sekä vaientaa että valitsee.
 *
 * MUISTI: A kuullaan kerran. Lippu kirjoitetaan laitteen muistiin, kun
 * A1 on oikeasti alkanut (try/catch; yksityisessä selauksessa moduulin
 * muisti kantaa istunnon loppuun).
 *
 * MYKISTYS: mykistetyssä pelissä jaksoa ei aloiteta lainkaan eikä lippua
 * kuluteta — tervetulo odottaa ensimmäistä avausta, jonka pelaaja kuulee.
 */

import { pysaytaLivianAani } from '../liviapuhe.js';
import { polloKuplatPois } from '../pollo.js';
import {
  PULUN_ISS_HENGAHDYS_MS, kunRepliikkiLoppuu, pulunIssMykistetty, pulunIssRepliikki,
  sanoPulunIssRepliikkiIlmanKuplaa,
} from './pulu-iss.js';

/**
 * TERVETULO POIS KÄYTÖSTÄ (omistaja 29.9.2026: *"Ota pulun ääni toistaiseksi
 * kokonaan pois ISS-kohtauksesta."*): Astronautin kamerassa Pulu ei puhu
 * lainkaan, ja Pulun taulu aukeaa heti hiljaisena. Jakso jää tähän
 * valmiiksi (testit ajavat sen suoraan); satelliitti.js ei aloita sitä,
 * kun kytkin on pois.
 */
export const PULUN_TERVETULO_KAYTOSSA = false;

/** Laitteen muistin avain: tervetulo on kuultu. */
export const PULUN_TERVETULO_TALLE = 'matkakirja-pulu-astro-tervetulo';
/** Hengähdys paljastuksen (musta verho pois) jälkeen ennen A1:tä. */
export const PULUN_TERVETULON_VIIVE_MS = 900;
/** Kuinka usein paljastusta kysytään. */
export const PULUN_TERVETULON_KYSELY_MS = 250;
/** Jos paljastusta ei kuulu tämän kuluessa, jakso jää pois. */
export const PULUN_TERVETULON_KATTO_MS = 20000;

/** Tervetulon repliikit järjestyksessä (js/livia.js LIVIAN_ISS.a). */
export const PULUN_TERVETULON_JAKSO = Object.freeze([
  Object.freeze({ ryhma: 'a', indeksi: 0 }),
  Object.freeze({ ryhma: 'a', indeksi: 1 }),
]);

let tervetuloIstunnossa = false;

/** Onko tervetulo jo kuultu (laitteen muisti tai tämä istunto)? */
export function pulunTervetuloKuultu(varasto = globalThis.localStorage) {
  if (tervetuloIstunnossa) return true;
  try {
    return varasto?.getItem?.(PULUN_TERVETULO_TALLE) === '1';
  } catch {
    return false;
  }
}

/** Merkitsee tervetulon kuulluksi. */
export function merkitsePulunTervetuloKuulluksi(varasto = globalThis.localStorage) {
  tervetuloIstunnossa = true;
  try {
    varasto?.setItem?.(PULUN_TERVETULO_TALLE, '1');
  } catch {
    /* yksityinen selaus: istunnon lippu kantaa */
  }
}

/** Testeille: istunnon lippu alkutilaan. */
export function nollaaPulunTervetuloIstunto() {
  tervetuloIstunnossa = false;
}

/**
 * ALOITTAA TERVETULON, jos sen aika on. Palauttaa kahvan tai null, jos
 * jaksoa ei aloiteta (kuultu, mykistetty tai avaruusnäkymää ei ole).
 *
 * @param {object} p
 * @param {object} p.ui pelin käyttöliittymä
 * @param {object} p.avaruus avaaAvaruusnakyma()-kahva: paljastettu
 * @param {Document} [p.doc] ohituksen kuuntelija
 * @param {object} [p.kello] setTimeout/clearTimeout (testit)
 * @param {Storage} [p.varasto] laitteen muisti (testit)
 * @param {Function} [p.sano] (ui, repliikki) → kahva|null (testit)
 * @param {Function} [p.mykistetty] () → boolean (testit)
 * @param {Function} [p.vaikene] kesken olevan puheen pysäytys
 */
export function aloitaPulunTervetulo({
  ui = null,
  avaruus = null,
  doc = globalThis.document,
  kello = globalThis,
  varasto = globalThis.localStorage,
  sano = sanoPulunIssRepliikkiIlmanKuplaa,
  mykistetty = pulunIssMykistetty,
  vaikene = (u) => { pysaytaLivianAani(u, { haivyta: false }); polloKuplatPois(); },
} = {}) {
  if (!avaruus || pulunTervetuloKuultu(varasto) || mykistetty()) return null;

  const ajastimet = new Set();
  let vaihe = 'odottaa';
  let peruLoppu = null;
  let puhuu = false;
  const sanotut = [];
  const tapahtumat = [];

  const ajasta = (fn, ms) => {
    const id = kello.setTimeout?.(() => { ajastimet.delete(id); fn(); }, Math.max(0, ms));
    ajastimet.add(id);
    return id;
  };
  const tyhjenna = () => {
    for (const id of ajastimet) kello.clearTimeout?.(id);
    ajastimet.clear();
    peruLoppu?.();
    peruLoppu = null;
  };
  /*
   * OHITUS KUUNTELEE KAAPPAUSVAIHEESSA JA PASSIIVISESTI: napautus menee
   * silti perille (taulu, pallo, ✕, kuva), Livia vain vaikenee sen tieltä.
   * Odotusvaiheen napautus (ennen A1:tä) EI ohita: ote palloon on silloin
   * tavallista katselua, ja tervetulo tulee, kun näkymä on valmis.
   */
  function ohitaNapautuksesta() {
    if (vaihe === 'puhuu') ohita({ syy: 'napautus' });
  }
  const irrotaOhitus = () => {
    for (const nimi of ['pointerdown', 'keydown']) {
      try { doc?.removeEventListener?.(nimi, ohitaNapautuksesta, { capture: true }); } catch { /* ei dokumenttia */ }
    }
  };

  const valmis = () => {
    vaihe = 'valmis';
    puhuu = false;
    tyhjenna();
    irrotaOhitus();
  };

  /* ---- repliikki kerrallaan -------------------------------------- */
  const sanoRivi = (i) => {
    if (vaihe !== 'puhuu') return;
    const rivi = PULUN_TERVETULON_JAKSO[i];
    if (!rivi) { valmis(); return; }
    const repliikki = pulunIssRepliikki(rivi.ryhma, rivi.indeksi);
    if (mykistetty()) { ohita({ syy: 'mykistys' }); return; }
    const kahva = repliikki ? sano(ui, repliikki) : null;
    if (!kahva) {
      // Pulu ei voi puhua: Livia ei ole pelissä (pöllö löytymättä) tai
      // chatti on auki. Ensimmäisellä rivillä jakso jää kokonaan pois
      // eikä lippua kuluteta.
      if (i === 0) { vaihe = 'pois'; tyhjenna(); irrotaOhitus(); return; }
      ajasta(() => sanoRivi(i + 1), PULUN_ISS_HENGAHDYS_MS);
      return;
    }
    if (i === 0) merkitsePulunTervetuloKuulluksi(varasto);
    puhuu = true;
    sanotut.push(repliikki.avain);
    peruLoppu = kunRepliikkiLoppuu(kahva, () => {
      peruLoppu = null;
      puhuu = false;
      ajasta(() => sanoRivi(i + 1), PULUN_ISS_HENGAHDYS_MS);
    }, kello);
  };

  /* ---- ohitus ----------------------------------------------------- */
  function ohita({ syy = 'napautus' } = {}) {
    if (vaihe === 'valmis' || vaihe === 'ohitettu' || vaihe === 'purettu' || vaihe === 'pois') return false;
    const kesken = vaihe === 'puhuu';
    vaihe = 'ohitettu';
    tyhjenna();
    irrotaOhitus();
    if (kesken) {
      try { vaikene(ui); } catch { /* ei soitinta */ }
    }
    puhuu = false;
    tapahtumat.push(`ohitus:${syy}`);
    return true;
  }

  /* ---- alku: odota, että musta verho on poissa --------------------- */
  const alkoi = Date.now();
  const odota = () => {
    if (vaihe !== 'odottaa') return;
    let valmisNakyma = false;
    try { valmisNakyma = avaruus.paljastettu?.() ?? true; } catch { valmisNakyma = true; }
    if (!valmisNakyma) {
      if (Date.now() - alkoi > PULUN_TERVETULON_KATTO_MS) { vaihe = 'pois'; irrotaOhitus(); return; }
      ajasta(odota, PULUN_TERVETULON_KYSELY_MS);
      return;
    }
    ajasta(() => {
      if (vaihe !== 'odottaa') return;
      if (mykistetty()) { vaihe = 'pois'; irrotaOhitus(); return; }
      vaihe = 'puhuu';
      sanoRivi(0);
    }, PULUN_TERVETULON_VIIVE_MS);
  };
  for (const nimi of ['pointerdown', 'keydown']) {
    try { doc?.addEventListener?.(nimi, ohitaNapautuksesta, { capture: true, passive: true }); } catch { /* ei dokumenttia */ }
  }
  odota();

  return {
    /** Pelaajan napautus (sama polku kuin dokumentin kuuntelijalla). */
    ohita: () => ohita({ syy: 'kutsu' }),
    /** Linssi suljettiin: puhe ja ajastimet pois. */
    pura() {
      if (vaihe === 'purettu') return;
      const kesken = vaihe === 'puhuu';
      vaihe = 'purettu';
      tyhjenna();
      irrotaOhitus();
      if (kesken) {
        try { vaikene(ui); } catch { /* ei soitinta */ }
      }
      puhuu = false;
    },
    /** Mittari testeille ja savukkeelle. */
    tila: () => ({ vaihe, puhuu, sanotut: sanotut.slice(), tapahtumat: tapahtumat.slice() }),
  };
}
