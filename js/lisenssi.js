/*
 * LISENSSIPORTTI KUVILLE JA ÄÄNILLE (Fable 23.9.2026: pelistä tulee
 * maksullinen, joten NC- ja ND-ehtoinen aineisto ei saa olla käytössä).
 *
 * Kuvien portti (lisenssiKelpaa) oli js/kuvagalleria.js:ssä; se asuu nyt
 * tässä lehtimoduulissa, jotta äänipolut voivat käyttää samaa sääntöä
 * tuomatta galleriaa mukanaan. Äänillä lisenssi on kirjattu `nimi`-
 * kenttään muodossa "Kuvaus (Paikka) — Tekijä, CC BY-NC"
 * (js/aani-ehdokkaat.js, js/packs/europe-kielet.js) tai `musiikkiNayteNimi`-
 * kenttään (nostot). aaniLisenssiTunnus poimii siitä tunnuksen samaan
 * muotoon kuin Commons antaa ("cc-by-nc-sa"), ja sama portti ratkaisee.
 *
 * Inventaario: docs/raportit/lisenssi-inventaario-20260923.md (Siirtoseppä).
 */

/**
 * Kelpaako lisenssitunnus? Sallittu: PD, CC0, CC BY, CC BY-SA.
 * Kielletty kaikki muu — erityisesti NC (ei-kaupallinen) ja ND (ei
 * muokkauksia), jotka tarkistetaan ENSIN, koska ne esiintyvät juuri
 * sallitun etuliitteen "cc-by" perässä ("cc-by-nc-sa-3.0").
 *
 * Tunnus tulee Commonsilta muodossa "cc-by-sa-4.0", "cc0" tai "pd-old",
 * Openverselta muodossa "by", "by-sa", "cc0", "pdm" (normalisoidaan
 * openversenLisenssi-funktiossa) ja museoilta suoraan "cc0" / "pd".
 */
export function lisenssiKelpaa(tunnus) {
  const t = String(tunnus ?? '').toLowerCase().trim().replace(/\s+/g, '-');
  if (!t) return false;
  // NC ja ND ensin: ne mitätöivät minkä tahansa muun osuman.
  if (/(^|[-_,])(nc|nd)([-_,]|\d|$)/.test(t)) return false;
  if (/noncommercial|non-commercial|no-?deriv/.test(t)) return false;
  if (/^(cc0|cc-zero)/.test(t)) return true;
  if (/^(pd|pdm|public-?domain)/.test(t)) return true;
  return /^cc-by(-sa)?([-,]|$)/.test(t);
}

/**
 * Äänen nimikentästä lisenssitunnus ("cc-by-nc-sa", "cc0", "pd") tai
 * null, jos lisenssiä ei ole kirjattu. Viimeinen osuma voittaa: tekijän
 * nimi tulee ennen lisenssiä.
 */
export function aaniLisenssiTunnus(nimi) {
  const teksti = String(nimi ?? '');
  const osumat = [...teksti.matchAll(/\b(CC0|CC[- ]BY(?:-(?:NC|ND|SA))*(?:[- ]\d(?:\.\d)?)?|PD|Public Domain)\b/gi)];
  const viimeinen = osumat.at(-1)?.[1];
  if (!viimeinen) return /non-?commercial/i.test(teksti) ? 'noncommercial' : null;
  return viimeinen.toLowerCase().replace(/\s+/g, '-').replace(/-\d(\.\d)?$/, '').replace(/^public-domain$/, 'pd');
}

/**
 * Saako äänen soittaa? NC- ja ND-ehtoinen ei; kirjaamaton lisenssi saa
 * (oma tuotanto ja radiovirrat eivät kanna CC-merkintää — vartija
 * tests/aanilisenssit.test.mjs vaatii kolmannen osapuolen äänille
 * kirjatun lisenssin erikseen).
 */
export function aaniLisenssiSallittu(nimi) {
  const tunnus = aaniLisenssiTunnus(nimi);
  return tunnus == null || lisenssiKelpaa(tunnus);
}
