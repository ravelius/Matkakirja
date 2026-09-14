import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EUROPE } from '../js/packs/europe.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { ISKULAUSEET } from '../js/packs/iskulauseet.js';

const JUURI = resolve(fileURLToPath(new URL('../', import.meta.url)));
export const SAAPUMISPUHE_RAPORTTI = resolve(
  JUURI, 'docs/raportit/saapumispuheet-eurooppa-20260914.json',
);

export const SAAPUMISNIMEN_AANI = 'Sz0tRTEpybtDJ9ru2kgD';
export const ISKULAUSEEN_AANI = 'piI8Kku0DcvcL6TTSeQt';

export const EUROOPAN_SAAPUMISKAUPUNGIT = Object.freeze(Object.keys(FOKUSVIRRAT));
const KAUPUNKINIMET = new Map(EUROPE.cities.map(({ id, name }) => [id, name]));
const sha8 = (teksti) => createHash('sha256').update(String(teksti)).digest('hex').slice(0, 8);

export function ilmanIlmaisutageja(teksti) {
  return String(teksti ?? '').replace(/\[[^\]]+\]\s*/g, '').trim();
}

function vaadiMerkkijono(rivi, kentta) {
  const arvo = String(rivi?.[kentta] ?? '').trim();
  if (!arvo) throw new Error(`${rivi?.cityId ?? 'tuntematon kaupunki'}: ${kentta} puuttuu`);
  return arvo;
}

/**
 * Muuttaa omistajan lukukatselmoidun saapumispuheraportin generaattorin
 * riveiksi. Raportti saa olla rajattu pilotti, mutta jokaisen sen kaupungin
 * on kuuluttava kanoniseen 45 kaupungin Eurooppa-joukkoon.
 */
export function kokoaSaapumispuheRivit(raportti) {
  if (raportti?.schemaVersion !== 1 || !Array.isArray(raportti?.cities)) {
    throw new Error('saapumispuheraportin pitää olla schemaVersion 1 ja sisältää cities-taulukko');
  }
  const kanoniset = new Set(EUROOPAN_SAAPUMISKAUPUNGIT);
  const nahdyt = new Set();
  const rivit = [];
  for (const rivi of raportti.cities) {
    const cityId = vaadiMerkkijono(rivi, 'cityId');
    if (!kanoniset.has(cityId)) throw new Error(`${cityId}: ei kuulu Euroopan kanoniseen 45 kaupunkiin`);
    if (nahdyt.has(cityId)) throw new Error(`${cityId}: saapumispuheraportissa on duplikaatti`);
    nahdyt.add(cityId);

    const cityName = vaadiMerkkijono(rivi, 'cityName');
    if (cityName !== KAUPUNKINIMET.get(cityId)) {
      throw new Error(`${cityId}: cityName "${cityName}" ei vastaa pelin nimeä "${KAUPUNKINIMET.get(cityId)}"`);
    }
    const displaySlogan = vaadiMerkkijono(rivi, 'displaySlogan');
    if (displaySlogan !== ISKULAUSEET[cityId]) {
      throw new Error(`${cityId}: displaySlogan ei vastaa js/packs/iskulauseet.js:n näkyvää lausetta`);
    }
    const liviaText = vaadiMerkkijono(rivi, 'liviaText');
    const liviaTtsText = vaadiMerkkijono(rivi, 'liviaTtsText');
    if (ilmanIlmaisutageja(liviaTtsText) !== liviaText) {
      throw new Error(`${cityId}: liviaTtsText muuttaa puhutut sanat`);
    }

    const nimiTeksti = `${cityName}.`;
    rivit.push({
      avain: `saapumisnimi-${cityId}`,
      lahde: 'saapumisnimi',
      cityId,
      rooli: 'kertoja',
      vaadittuAani: SAAPUMISNIMEN_AANI,
      teksti: nimiTeksti,
      puhe: `[warmly] ${nimiTeksti}`,
      nimi: `horatio-saapumisnimi-${cityId}.mp3`,
      kaikuNimi: null,
      saapuu: false,
      merkit: nimiTeksti.length,
      tiiviste: sha8(nimiTeksti),
      tila: 'uusi',
      arvioSekunteina: Number((nimiTeksti.length / 14).toFixed(1)),
      kuplaSekunteina: 30,
    });
    rivit.push({
      avain: `iskulause-${cityId}`,
      lahde: 'iskulause',
      cityId,
      rooli: 'livia',
      vaadittuAani: ISKULAUSEEN_AANI,
      teksti: liviaText,
      puhe: liviaTtsText,
      nimi: `livia-iskulause-${cityId}.mp3`,
      kaikuNimi: null,
      saapuu: false,
      merkit: liviaText.length,
      tiiviste: sha8(liviaText),
      tila: 'uusi',
      arvioSekunteina: Number((liviaText.length / 14).toFixed(1)),
      kuplaSekunteina: 30,
    });
  }
  return rivit;
}

export function lueSaapumispuheRivit(polku = SAAPUMISPUHE_RAPORTTI) {
  if (!existsSync(polku)) return [];
  return kokoaSaapumispuheRivit(JSON.parse(readFileSync(polku, 'utf8')));
}

/** Täysi aineistoportti ennen 45 kaupungin tuotantoa. */
export function vaadiTaysiSaapumispuheaineisto(rivit) {
  const nimet = rivit.filter(({ rooli }) => rooli === 'kertoja');
  const iskulauseet = rivit.filter(({ rooli }) => rooli === 'livia');
  const odotettu = EUROOPAN_SAAPUMISKAUPUNGIT;
  for (const [nimi, joukko] of [['saapumisnimet', nimet], ['iskulauseet', iskulauseet]]) {
    const ids = joukko.map(({ cityId }) => cityId);
    if (ids.length !== 45 || ids.join(',') !== odotettu.join(',')) {
      throw new Error(`${nimi}: kattavuus ei ole kanoninen 45/45`);
    }
  }
  return true;
}
