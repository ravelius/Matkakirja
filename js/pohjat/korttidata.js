/**
 * UI-POHJIEN YHTEINEN TIETOMALLI (omistaja 1.10.2026, UI-pohjat; Natiivi-UI:n kartoitus "Yhteinen tietomalli").
 *
 *   KorttiData { yla, otsikko, alaotsikko, kappaleet[{otsikko, teksti, korostus, lista[]}],
 *                kuvat[{url, rooli: hero|upotus|galleria, kuvateksti, lahde, rajaus}],
 *                napit[{teksti, tyyppi: toiminto|ensisijainen|haamu, toiminto}], lahde, teema }
 *
 * Sama JSON-muoto webille ja natiiville (apurahan esittely.json on lähes tämä). Data ei sisällä mittoja: pohja
 * päättää asettelun. Kuvien roolit päätellään määrästä, jos niitä ei anneta (kuvasäännöt): 1 = hero,
 * 2 = hero + upotus, 3+ = hero + galleria.
 */

export const POHJA_TEEMAT = ['paperi', 'tumma', 'lasi', 'lasi-avaruus'];
export const POHJA_NAPPITYYPIT = ['toiminto', 'ensisijainen', 'haamu'];

const pohjaTeksti = (v) => (typeof v === 'string' && v.trim() ? v.trim() : '');

/** Kuvien roolit kuvasääntöjen mukaan (annettu rooli voittaa). */
export function pohjaKuvienRoolit(maara) {
  if (maara <= 0) return [];
  if (maara === 1) return ['hero'];
  if (maara === 2) return ['hero', 'upotus'];
  return ['hero', ...Array(maara - 1).fill('galleria')];
}

/**
 * Siistii KorttiDatan. Palauttaa null, jos otsikko ja sisältö puuttuvat kokonaan (pohja ei piirrä tyhjää korttia).
 * @param {object} d
 * @param {{teema?: string}} [oletus]
 */
export function tarkistaKorttiData(d, { teema = 'paperi' } = {}) {
  if (!d || typeof d !== 'object') return null;
  const kappaleet = (Array.isArray(d.kappaleet) ? d.kappaleet : (d.teksti ? [{ teksti: d.teksti }] : []))
    .filter((k) => k && (pohjaTeksti(k.teksti) || pohjaTeksti(k.otsikko) || (Array.isArray(k.lista) && k.lista.length)))
    .map((k) => ({
      otsikko: pohjaTeksti(k.otsikko),
      teksti: pohjaTeksti(k.teksti),
      korostus: k.korostus === true,
      lista: Array.isArray(k.lista) ? k.lista.map(pohjaTeksti).filter(Boolean) : [],
    }));
  const raakaKuvat = (Array.isArray(d.kuvat) ? d.kuvat : []).filter((k) => k && pohjaTeksti(k.url));
  const roolit = pohjaKuvienRoolit(raakaKuvat.length);
  const kuvat = raakaKuvat.map((k, i) => ({
    url: k.url.trim(),
    rooli: ['hero', 'upotus', 'galleria'].includes(k.rooli) ? k.rooli : roolit[i],
    kuvateksti: pohjaTeksti(k.kuvateksti),
    lahde: pohjaTeksti(k.lahde),
    rajaus: typeof k.rajaus === 'string' && /^\d{1,3}% \d{1,3}%$/.test(k.rajaus) ? k.rajaus : '',
  }));
  const napit = (Array.isArray(d.napit) ? d.napit : [])
    .filter((n) => n && pohjaTeksti(n.teksti))
    .map((n) => ({
      teksti: pohjaTeksti(n.teksti),
      tyyppi: POHJA_NAPPITYYPIT.includes(n.tyyppi) ? n.tyyppi : 'toiminto',
      toiminto: pohjaTeksti(n.toiminto),
    }));
  const otsikko = pohjaTeksti(d.otsikko);
  if (!otsikko && !kappaleet.length && !kuvat.length) return null;
  return {
    yla: pohjaTeksti(d.yla),
    otsikko,
    alaotsikko: pohjaTeksti(d.alaotsikko),
    kappaleet,
    kuvat,
    napit,
    lahde: pohjaTeksti(d.lahde),
    teema: POHJA_TEEMAT.includes(d.teema) ? d.teema : teema,
  };
}
