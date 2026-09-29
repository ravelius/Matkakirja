/*
 * PULUN TERVETULO ASTRONAUTIN KAMERAAN (A–C) — päätoimittajan
 * käsikirjoitus 28.9.2026 (docs/raportit/pulu-iss-kasikirjoitus-20260928.md).
 *
 * Omistaja klo 19.3x: Pulu toivottaa avaruuslinssiin tervetulleeksi ja
 * kertoo, mikä juttu tämä on; suosittelee muutamaa paikkaa, pyöräyttää
 * pallon valmiiksi ja kysyy "haluatko katsoa tuonne?", mutta räppäisee
 * ennen vastausta jonkin näkymän päälle, pahoittelee, palaa
 * aloitusnäkymään ja antaa lopulta pelaajan katsella itse.
 *
 * JAKSO (yksi kerta, vain linssin ENSIMMÄISELLÄ avauksella):
 *
 *   A1, A2  tervetulo (ei kameraliikettä)
 *   B1      kolme suosikkia
 *   B2      "Pyöräytän pallon valmiiksi… noin." — kamera liukuu Venetsian
 *           ylle sanasta "Pyöräytän" sanaan "noin" (mitattu ElevenLabsin
 *           forced alignmentilla lopullisesta äänitteestä 28.9.2026:
 *           2,00 s → 4,60 s)
 *   C1      [tap] "Hups." — OIKEA NÄKYMÄN VAIHTO: nokka osuu väärään
 *           pisteeseen, ja väärän kohteen (Saharan silmä) valokuva
 *           aukeaa kameran liukuessa sen ylle; "Tuo ei todellakaan ole
 *           Venetsia."
 *   C2      "Viedään kaikki takaisin alkuun… Kas niin." — kuva sulkeutuu
 *           sanasta "Viedään" (3,08 s), ja kamera liukuu aloitusnäkymään
 *           sanaan "Kas niin" mennessä (5,86 s). Aseman seuranta jatkuu,
 *           ja ohjaus on pelaajan.
 *
 * OHITUS: pelaajan napautus (tai näppäin) missä tahansa koko jakson aikana
 * vaientaa Livian heti, sulkee väärän kuvan ja palauttaa aloitusnäkymän,
 * jos kamera ehti liikkua. Ote on silloin pelaajan (seurantaa ei
 * kytketä takaisin).
 *
 * MUISTI: A kuullaan kerran. Lippu kirjoitetaan laitteen muistiin, kun
 * ensimmäinen kupla on oikeasti näkynyt (try/catch; yksityisessä
 * selauksessa moduulin muisti kantaa istunnon loppuun).
 *
 * MYKISTYS: mykistetyssä pelissä jaksoa ei aloiteta lainkaan eikä lippua
 * kuluteta — tervetulo odottaa ensimmäistä avausta, jonka pelaaja kuulee.
 * VÄHENNÄ LIIKETTÄ: kamera ei liiku, joten jakso on pelkkä tervetulo
 * (A1–A2); B–C kertovat kameran liikkeistä eivätkä kuulu ilman niitä.
 */

import { pysaytaLivianAani } from '../liviapuhe.js';
import { polloKuplatPois } from '../pollo.js';
import {
  PULUN_ISS_HENGAHDYS_MS, kunRepliikkiLoppuu, pulunIssMykistetty, pulunIssRepliikki,
  pulunIssVahennaLiiketta, sanoPulunIssRepliikki,
} from './pulu-iss.js';

/** Laitteen muistin avain: tervetulo on kuultu. */
export const PULUN_TERVETULO_TALLE = 'matkakirja-pulu-astro-tervetulo';
/** Hengähdys paljastuksen (musta verho pois) jälkeen ennen A1:tä. */
export const PULUN_TERVETULON_VIIVE_MS = 900;
/** Kuinka usein paljastusta kysytään. */
export const PULUN_TERVETULON_KYSELY_MS = 250;
/** Jos paljastusta ei kuulu tämän kuluessa, jakso jää pois. */
export const PULUN_TERVETULON_KATTO_MS = 20000;
/** Väärä kohde, johon nokka osuu (C1): Saharan silmä on kaikkea muuta kuin Venetsia. */
export const PULUN_VAARA_KOHDE = 'richat';
/** Kohde, jonka ylle B2 pyöräyttää pallon. */
export const PULUN_SUOSIKKI = Object.freeze({ tunnus: 'venetsia', lat: 45.44, lon: 12.332 });
/** Jos soitin ei kerro alkaneensa näin pian, kameran toimet ajastetaan silti. */
export const PULUN_TOIMIEN_VARA_MS = 1500;
/** Ohituksen paluuliuku (ms); Vähennä liikettä → 0. */
export const PULUN_OHITUKSEN_PALUU_MS = 700;

/*
 * KAMERAN TOIMET REPLIIKEITTÄIN. `ms` on hetki repliikin äänitteen
 * alusta ja `kestoMs` liu'un pituus; luvut on mitattu lopullisista
 * eleven_v4-äänitteistä (erä pulu-16f2c04e9e19bef41d64) forced
 * alignmentilla, joten ne on päivitettävä, jos repliikit generoidaan
 * uudelleen.
 */
export const PULUN_TERVETULON_JAKSO = Object.freeze([
  Object.freeze({ ryhma: 'a', indeksi: 0, toimet: [] }),
  Object.freeze({ ryhma: 'a', indeksi: 1, toimet: [] }),
  Object.freeze({ ryhma: 'b', indeksi: 0, toimet: [], liikettaVaativa: true }),
  Object.freeze({
    ryhma: 'b', indeksi: 1, liikettaVaativa: true,
    // "Pyöräytän" 2,00 s → "noin." 4,60 s.
    toimet: [Object.freeze({ ms: 2000, toimi: 'pyorayta', kestoMs: 2600 })],
  }),
  Object.freeze({
    ryhma: 'c', indeksi: 0, liikettaVaativa: true,
    // [tap] on äänitteen ensimmäinen ääni; "Hups." alkaa 0,86 s.
    toimet: [Object.freeze({ ms: 250, toimi: 'rappaise' })],
  }),
  Object.freeze({
    ryhma: 'c', indeksi: 1, liikettaVaativa: true,
    // "Viedään" 3,08 s → "Kas niin." 5,86 s.
    toimet: [Object.freeze({ ms: 3080, toimi: 'palaa', kestoMs: 2780 })],
  }),
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
 * Ne jakson repliikit, jotka tässä tilassa sanotaan.
 * @param {{vahennaLiiketta?: boolean}} [tila]
 */
export function pulunTervetulonRepliikit({ vahennaLiiketta = false } = {}) {
  return PULUN_TERVETULON_JAKSO.filter((rivi) => !vahennaLiiketta || !rivi.liikettaVaativa);
}

/**
 * ALOITTAA TERVETULON, jos sen aika on. Palauttaa kahvan tai null, jos
 * jaksoa ei aloiteta (kuultu, mykistetty tai avaruusnäkymää ei ole).
 *
 * @param {object} p
 * @param {object} p.ui pelin käyttöliittymä
 * @param {object} p.avaruus avaaAvaruusnakyma()-kahva: paljastettu,
 *   aloitustila, katsoKohteeseen, palaaAloitukseen
 * @param {() => boolean} [p.avaaVaaraKohde] C1:n räppäisy: avaa väärän
 *   kohteen valokuvan (linssin oma avaaKohde)
 * @param {() => void} [p.suljeKortti] sulkee avoimen valokuvan
 * @param {Document} [p.doc] ohituksen kuuntelija
 * @param {object} [p.kello] setTimeout/clearTimeout (testit)
 * @param {Storage} [p.varasto] laitteen muisti (testit)
 * @param {Function} [p.sano] (ui, repliikki) → kahva|null (testit)
 * @param {Function} [p.mykistetty] () → boolean (testit)
 * @param {Function} [p.vaikene] kesken olevan puheen ja kuplien pysäytys
 */
export function aloitaPulunTervetulo({
  ui = null,
  avaruus = null,
  avaaVaaraKohde = () => false,
  suljeKortti = () => {},
  doc = globalThis.document,
  kello = globalThis,
  varasto = globalThis.localStorage,
  sano = sanoPulunIssRepliikki,
  mykistetty = pulunIssMykistetty,
  vahennaLiiketta = pulunIssVahennaLiiketta(ui),
  vaikene = (u) => { pysaytaLivianAani(u, { haivyta: false }); polloKuplatPois(); },
} = {}) {
  if (!avaruus?.aloitustila || pulunTervetuloKuultu(varasto) || mykistetty()) return null;

  const repliikit = pulunTervetulonRepliikit({ vahennaLiiketta });
  const ajastimet = new Set();
  let vaihe = 'odottaa';
  let aloitustila = null;
  let kameraLiikkui = false;
  let korttiAuki = false;
  let peruLoppu = null;
  let puhuu = false;
  const sanotut = [];
  const toimitetut = [];

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
   * silti perille (pallo, ✕, kuva), Livia vain vaikenee sen tieltä.
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

  /* ---- kameran toimet -------------------------------------------- */
  const teeToimi = ({ toimi, kestoMs = 0 }) => {
    if (vaihe !== 'puhuu') return;
    toimitetut.push(toimi);
    if (vahennaLiiketta) return;
    try {
      if (toimi === 'pyorayta') {
        kameraLiikkui = avaruus.katsoKohteeseen?.(PULUN_SUOSIKKI.lat, PULUN_SUOSIKKI.lon, { kestoMs })
          || kameraLiikkui;
      } else if (toimi === 'rappaise') {
        korttiAuki = Boolean(avaaVaaraKohde()) || korttiAuki;
        kameraLiikkui = true;
      } else if (toimi === 'palaa') {
        if (korttiAuki) { suljeKortti(); korttiAuki = false; }
        if (aloitustila) avaruus.palaaAloitukseen?.(aloitustila, { kestoMs, seuraa: true });
        kameraLiikkui = false;
      }
    } catch { /* kamera ei ole jakson omaa: virhe ei saa kaataa puhetta */ }
  };

  const valmis = () => {
    vaihe = 'valmis';
    tyhjenna();
    irrotaOhitus();
  };

  /* ---- repliikki kerrallaan -------------------------------------- */
  const sanoRivi = (i) => {
    if (vaihe !== 'puhuu') return;
    const rivi = repliikit[i];
    if (!rivi) { valmis(); return; }
    const repliikki = pulunIssRepliikki(rivi.ryhma, rivi.indeksi);
    if (mykistetty()) { ohita({ syy: 'mykistys' }); return; }
    const kahva = sano(ui, repliikki);
    if (!kahva) {
      // Kupla ei näkynyt: Livia ei ole pelissä (pöllö löytymättä) tai
      // chatti on auki. Ensimmäisellä rivillä jakso jää kokonaan pois
      // eikä lippua kuluteta.
      if (i === 0) { vaihe = 'pois'; tyhjenna(); irrotaOhitus(); return; }
      ajasta(() => sanoRivi(i + 1), PULUN_ISS_HENGAHDYS_MS);
      return;
    }
    if (i === 0) merkitsePulunTervetuloKuulluksi(varasto);
    puhuu = true;
    sanotut.push(repliikki.avain);
    /*
     * TOIMET ÄÄNEN KELLOSTA: hetket on mitattu äänitteen alusta, joten ne
     * ajastetaan vasta, kun soitin oikeasti alkaa ('playing'). Hidas
     * lataus ei siis vie pyöräytystä sanojen edelle. Varakello käynnistää
     * toimet joka tapauksessa, jos soitin ei kerro alkaneensa.
     */
    const ajastaToimet = () => {
      for (const toimi of rivi.toimet) ajasta(() => teeToimi(toimi), toimi.ms);
    };
    const audio = kahva.audio;
    if (rivi.toimet.length && audio?.addEventListener && audio.paused !== false) {
      let alkanut = false;
      const kerran = () => {
        if (alkanut) return;
        alkanut = true;
        audio.removeEventListener?.('playing', kerran);
        ajastaToimet();
      };
      audio.addEventListener('playing', kerran);
      ajasta(kerran, PULUN_TOIMIEN_VARA_MS);
    } else {
      ajastaToimet();
    }
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
    if (korttiAuki) { try { suljeKortti(); } catch { /* jo kiinni */ } korttiAuki = false; }
    if (kameraLiikkui && aloitustila) {
      try {
        avaruus.palaaAloitukseen?.(aloitustila, {
          kestoMs: vahennaLiiketta ? 0 : PULUN_OHITUKSEN_PALUU_MS, seuraa: false,
        });
      } catch { /* ei kameraa */ }
      kameraLiikkui = false;
    }
    toimitetut.push(`ohitus:${syy}`);
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
      try { aloitustila = avaruus.aloitustila(); } catch { aloitustila = null; }
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
    /** Linssi suljettiin: puhe ja ajastimet pois, kamera jää linssin purulle. */
    pura() {
      if (vaihe === 'purettu') return;
      const kesken = vaihe === 'puhuu';
      vaihe = 'purettu';
      tyhjenna();
      irrotaOhitus();
      if (kesken) {
        try { vaikene(ui); } catch { /* ei soitinta */ }
      }
      korttiAuki = false;
    },
    /** Mittari testeille ja savukkeelle. */
    tila: () => ({
      vaihe, puhuu, sanotut: sanotut.slice(), toimitetut: toimitetut.slice(),
      kameraLiikkui, korttiAuki, vahennaLiiketta,
    }),
  };
}
