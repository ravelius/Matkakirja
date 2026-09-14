import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  EUROOPAN_SAAPUMISKAUPUNGIT, ISKULAUSEEN_AANI, ilmanIlmaisutageja,
} from './saapumispuhe-data.mjs';

const JUURI = resolve(fileURLToPath(new URL('../', import.meta.url)));
export const LIVIA_ILMAISUPILOTTI_RAPORTTI = resolve(
  JUURI, 'docs/raportit/livia-ilmaisupilotti-20260914.json',
);
export const LIVIA_ILMAISUPILOTIN_AANI = ISKULAUSEEN_AANI;
export const LIVIA_ILMAISUPILOTIN_KAUPUNGIT = Object.freeze([
  'istanbul', 'helsinki', 'berliini', 'amsterdam', 'tampere', 'barcelona',
]);
const sha8 = (teksti) => createHash('sha256').update(String(teksti)).digest('hex').slice(0, 8);

function vaadiMerkkijono(rivi, kentta) {
  const arvo = String(rivi?.[kentta] ?? '').trim();
  if (!arvo) throw new Error(`${rivi?.cityId ?? 'tuntematon kaupunki'}: ${kentta} puuttuu`);
  return arvo;
}

/**
 * Rajattu ilmaisupilotti on rinnakkainen kandidaattisarja: se ei muuta
 * nykyisiä city-3-avaimia, pakkitekstejä eikä hyväksyttyä R2-manifestia.
 */
export function kokoaLivianIlmaisupilottiRivit(raportti) {
  if (raportti?.schemaVersion !== 1 || !Array.isArray(raportti?.cities)) {
    throw new Error('ilmaisupilottiraportin pitää olla schemaVersion 1 ja sisältää cities-taulukko');
  }
  if (raportti.voiceId !== LIVIA_ILMAISUPILOTIN_AANI) {
    throw new Error(`ilmaisupilotti vaatii Flicker voice_id:n ${LIVIA_ILMAISUPILOTIN_AANI}`);
  }
  const kanoniset = new Set(EUROOPAN_SAAPUMISKAUPUNGIT);
  const nahdyt = new Set();
  const rivit = raportti.cities.map((rivi) => {
    const cityId = vaadiMerkkijono(rivi, 'cityId');
    if (!kanoniset.has(cityId)) throw new Error(`${cityId}: ei kuulu Euroopan kanoniseen 45 kaupunkiin`);
    if (nahdyt.has(cityId)) throw new Error(`${cityId}: ilmaisupilottiraportissa on duplikaatti`);
    nahdyt.add(cityId);
    const sourceAudioId = vaadiMerkkijono(rivi, 'sourceAudioId');
    if (sourceAudioId !== `${cityId}-3`) {
      throw new Error(`${cityId}: sourceAudioId:n pitää olla ${cityId}-3, sai ${sourceAudioId}`);
    }
    const visibleText = vaadiMerkkijono(rivi, 'visibleText');
    const ttsText = vaadiMerkkijono(rivi, 'ttsText');
    if (ilmanIlmaisutageja(ttsText) !== visibleText) {
      throw new Error(`${cityId}: ttsText muuttaa näkyvät sanat`);
    }
    return {
      avain: `ilmaisu-${cityId}-3`,
      lahde: 'ilmaisu',
      cityId,
      sourceAudioId,
      rooli: 'livia',
      vaadittuAani: LIVIA_ILMAISUPILOTIN_AANI,
      teksti: visibleText,
      puhe: ttsText,
      nimi: `livia-ilmaisu-${cityId}-3.mp3`,
      kaikuNimi: null,
      saapuu: false,
      merkit: visibleText.length,
      tiiviste: sha8(visibleText),
      tila: 'uusi',
      arvioSekunteina: Number((visibleText.length / 14).toFixed(1)),
      kuplaSekunteina: 30,
    };
  });
  const saadut = new Set(rivit.map(({ cityId }) => cityId));
  if (saadut.size !== LIVIA_ILMAISUPILOTIN_KAUPUNGIT.length
    || LIVIA_ILMAISUPILOTIN_KAUPUNGIT.some((cityId) => !saadut.has(cityId))) {
    throw new Error(`ilmaisupilotti vaatii täsmälleen kaupungit: ${LIVIA_ILMAISUPILOTIN_KAUPUNGIT.join(', ')}`);
  }
  return rivit;
}

export function lueLivianIlmaisupilottiRivit(polku = LIVIA_ILMAISUPILOTTI_RAPORTTI) {
  if (!existsSync(polku)) return [];
  return kokoaLivianIlmaisupilottiRivit(JSON.parse(readFileSync(polku, 'utf8')));
}
