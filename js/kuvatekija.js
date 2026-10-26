/*
 * KUVAN TEKIJÄ JA LISENSSI LÄHDERIVILLÄ (Pelikoodari 27.9.2026, Fablen
 * erä "TEKIJÄMERKINNÄT pelissä": jokaisen kuvan tekijä, lähde ja lisenssi
 * näkyvät kuvan tiedoissa, havainnekuvat merkittyinä).
 *
 * Paketeissa lähde on vapaata tekstiä ("Diego Delso, Wikimedia Commons
 * (CC BY-SA 4.0)"). Osalta Commons-kuvista teksti puuttuu tai siitä
 * puuttuu lisenssi tai tekijä; ne on haettu Commonsin omista
 * metatiedoista tauluun js/packs/commons-tekijat.js
 * (tools/hae-commons-tekijat.mjs), ja taydennaLahde liittää puuttuvan
 * osan riville. Sama sääntö on vartijan (tools/kuvatekijat.mjs,
 * tests/kuvatekijat.test.mjs) ja pelin yhteinen, joten ne eivät eriydy.
 */
import { COMMONS_TEKIJAT } from './packs/commons-tekijat.js';
import { aaniLisenssiTunnus } from './lisenssi.js';

const ARKISTOT = /^(Wikimedia Commons|Commons|Library of Congress|BnF|BnF Gallica|Bundesarchiv|Rijksmuseum|Nationaal Archief|archive\.org|Flickr|NASA|Europeana|Wikipedia)$/i;
const LISENSSI = /^(cc[ -]?(by|0)|public domain|pd|no restrictions|ogl|fal|gfdl|free art licen[cs]e|attribution)\b/i;
const OIKEUSLAUSE = /^(ei\s|no known|kein)/i;
/** Muut kuin CC-lisenssit, jotka datassa esiintyvät (OSM, avoin hallinnon lisenssi, Flickr Commons). */
export const MUU_LISENSSI = /\b(ODbL|OGL|Open Government Licen[cs]e|no known copyright restrictions|no restrictions)\b/i;

/**
 * Onko lähdemerkinnässä tekijä? Merkintä pilkotaan sulkeiden ja pilkkujen
 * kohdalta, ja osista pudotetaan arkistot, lisenssit ja oikeuslauseet;
 * jos jotain jää, se on tekijä (sama sääntö kuin tools/lisaa-tekijat.mjs).
 */
export function onTekija(lahde) {
  return String(lahde ?? '')
    .split(/[(),]|\s+\/\s+/)
    .map((osa) => osa.trim())
    .some((osa) => osa && !ARKISTOT.test(osa) && !LISENSSI.test(osa) && !OIKEUSLAUSE.test(osa));
}

/** Onko tekstissä lisenssi (CC, PD tai muu tunnettu)? */
export function onLisenssi(teksti) {
  const t = String(teksti ?? '');
  return aaniLisenssiTunnus(t) != null || MUU_LISENSSI.test(t);
}

/** Commons-tiedostonimi kuvaoliosta (tiedosto tai kuva, jos se ei ole polku/URL). */
function commonsNimi(kohde) {
  for (const k of [kohde?.tiedosto, kohde?.kuva, kohde?.lippu]) {
    if (typeof k === 'string' && k && !k.includes('/') && Object.hasOwn(COMMONS_TEKIJAT, k)) return k;
  }
  return null;
}

/**
 * Lähderivi täydennettynä Commonsin tekijällä ja lisenssillä, jos jompikumpi
 * puuttuu. Kuva ilman taulun riviä saa tekstin sellaisenaan.
 *
 * @param {string} lahde paketin lähdeteksti (voi olla tyhjä)
 * @param {object} kohde kuvaolio (tiedosto / kuva / lippu)
 * @returns {string}
 */
export function taydennaLahde(lahde, kohde = {}) {
  const teksti = String(lahde ?? '').trim();
  const nimi = commonsNimi(kohde);
  if (!nimi) return teksti;
  const [tekija, lisenssi] = COMMONS_TEKIJAT[nimi];
  // "Wikimedia Commons, "tiedosto.jpg"" → nimi pois: se ei ole tekijä eikä kerro pelaajalle mitään.
  const runko = teksti.replace(/,\s*["“][^"”]*["”]\s*$/, '');
  const tekijaOn = onTekija(runko) || Boolean(String(kohde?.tekija ?? '').trim());
  const lisenssiOn = onLisenssi(teksti) || onLisenssi(kohde?.lisenssi);
  if (tekijaOn && lisenssiOn) return teksti;
  const kuka = tekijaOn ? '' : (tekija || 'tekijä tuntematon');
  if (!runko) return `${kuka}, Wikimedia Commons (${lisenssi})`;
  return [kuka, lisenssiOn ? runko : `${runko} (${lisenssi})`].filter(Boolean).join(', ');
}
