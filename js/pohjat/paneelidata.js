/**
 * PANEELI-pohjan tietomalli (Natiivi-UI 1.10.2026: natiivin "VALIKOT YHTENÄ JÄRJESTELMÄNÄ" -malli tokeneilla).
 *
 * PaneeliData: {kapiteeli?, takaisin?, ryhmat: [{otsikko?, vierekkain?, erotin?, rivit: [Rivi]}], alarivi?, teema?}
 *   Rivi: {tyyppi: navigointi|kytkin|toiminto|saadin, nimi, ikoni?, arvo?, paalla?, min?, max?, askel?,
 *          muotoile?, toiminto?, tunnus?}
 *
 * Paneelissa ei ole kuvia eikä välilehtiä: alinäkymä on uusi PaneeliData, jonka `takaisin` palaa edelliseen.
 * Vierekkäinen ryhmä on segmenttirivi (mallikuva 09: Linssit · Aarteet · Matka), muut ryhmät ovat pinoja.
 */

export const PANEELI_RIVITYYPIT = ['navigointi', 'kytkin', 'toiminto', 'saadin'];
export const PANEELI_TEEMAT = ['paperi', 'lasi'];

const paneeliTeksti = (v) => (typeof v === 'string' ? v.trim() : '');
const paneeliLuku = (v, oletus) => (Number.isFinite(Number(v)) && v !== null && v !== '' ? Number(v) : oletus);

function tarkistaPaneeliRivi(r) {
  const nimi = paneeliTeksti(r?.nimi);
  if (!nimi) return null;
  const tyyppi = PANEELI_RIVITYYPIT.includes(r.tyyppi) ? r.tyyppi : 'toiminto';
  const rivi = {
    tyyppi,
    nimi,
    // Ikoni on kutsujan SVG (solmu tai merkkijono koodista); pohja ei pidä omaa ikonikirjastoa.
    ikoni: r.ikoni ?? null,
    toiminto: typeof r.toiminto === 'function' ? r.toiminto : null,
    tunnus: paneeliTeksti(r.tunnus),
  };
  if (tyyppi === 'navigointi') rivi.arvo = paneeliTeksti(r.arvo);
  if (tyyppi === 'kytkin') rivi.paalla = Boolean(r.paalla);
  if (tyyppi === 'saadin') {
    rivi.min = paneeliLuku(r.min, 0);
    rivi.max = Math.max(rivi.min, paneeliLuku(r.max, 100));
    rivi.askel = paneeliLuku(r.askel, 1);
    rivi.arvo = Math.min(rivi.max, Math.max(rivi.min, paneeliLuku(r.arvo, rivi.min)));
    rivi.muotoile = typeof r.muotoile === 'function' ? r.muotoile : (v) => String(v);
  }
  return rivi;
}

/**
 * Siistii PaneeliDatan: tyhjät rivit ja ryhmät pois, tuntematon rivityyppi TOIMINNOKSI, säätimen arvo rajoihin.
 * Palauttaa null, jos yhtään riviä ei jää.
 */
export function tarkistaPaneeliData(data, { teema = 'paperi' } = {}) {
  if (!data || !Array.isArray(data.ryhmat)) return null;
  const ryhmat = data.ryhmat.map((r) => ({
    otsikko: paneeliTeksti(r?.otsikko),
    vierekkain: Boolean(r?.vierekkain),
    erotin: Boolean(r?.erotin),
    rivit: (Array.isArray(r?.rivit) ? r.rivit : []).map(tarkistaPaneeliRivi).filter(Boolean),
  })).filter((r) => r.rivit.length);
  if (!ryhmat.length) return null;
  const ala = data.alarivi;
  let alarivi = null;
  if (typeof ala === 'string' && ala.trim()) alarivi = { vasen: ala.trim(), oikea: '' };
  else if (ala && (paneeliTeksti(ala.vasen) || paneeliTeksti(ala.oikea))) {
    alarivi = { vasen: paneeliTeksti(ala.vasen), oikea: paneeliTeksti(ala.oikea) };
  }
  const haluttu = data.teema ?? teema;
  return {
    kapiteeli: paneeliTeksti(data.kapiteeli),
    takaisin: typeof data.takaisin === 'function' ? data.takaisin : null,
    ryhmat,
    alarivi,
    teema: PANEELI_TEEMAT.includes(haluttu) ? haluttu : 'paperi',
  };
}
