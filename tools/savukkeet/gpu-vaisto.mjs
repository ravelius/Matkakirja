// GPU-VÄISTÖ — savukesarjan väistö, kun omistaja tarvitsee konetta (kevyt tila).
//
// Omistajan sääntö 28.9.2026 "GPU-VÄISTÖ AUTOMAATTISEKSI": Mac-ajurin
// savukesarja kilpailee GPU:sta omistajan omien töiden kanssa. Täsmennys
// klo 12.3x: ei ohjelmatunnistusta — omistaja luo lipun
// /tmp/matkakirja-kevyt (tools/gpu-vapaa.sh), kun tarvitsee konetta.
// tools/savukkeet/aja-sarja.mjs kysyy tilan KERRAN sarjan alussa
// (gpuTila) ja päättää jokaiselle riville (gpuVaisto):
//   - Chromium-rivit ajetaan SwiftShaderilla (ohjelmallinen WebGL CPU:lla,
//     ks. chromium-liput.mjs), joten GPU jää omistajalle;
//   - WebKit-rivit ja suorituskykyrivit OHITETAAN: WebKitiä ei voi siirtää
//     CPU:lle, ja suorituskykyvartio mittaisi kilpailua eikä koodia;
//   - toiminnallisia Chromium-rivejä ei ohiteta eikä mergeporttia löysätä.
//
// Ympäristömuuttuja SAVUKE_GPU=varattu|vapaa ohittaa tarkistuksen
// (varattu → syyksi "SAVUKE_GPU=varattu").
//
// Puhtaat funktiot erillään aja-sarja.mjs:stä, jotta ne voi testata ilman
// selaimia (tests/gpu-vapaa.test.mjs).

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TASSA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TASSA, '..', '..');

export const SWIFTSHADER = '--use-gl=angle --use-angle=swiftshader';

/**
 * { varattu, syy, kuvaus }. Ajaa tools/gpu-vapaa.sh:n repojuuresta
 * (polku tästä tiedostosta, ei cwd:stä). `kuvaus` = skriptin tuloste
 * ("kevyt tila (omistaja tarvitsee konetta)"), `syy` = sen lyhyt muoto
 * ohitusmerkintään ("kevyt tila"). Jos skripti ei käynnisty, GPU
 * tulkitaan vapaaksi — väistö ei saa kaataa sarjaa.
 */
export function gpuTila(env = process.env) {
  if (env.SAVUKE_GPU === 'vapaa') return { varattu: false, syy: null, kuvaus: null };
  if (env.SAVUKE_GPU === 'varattu') return { varattu: true, syy: 'SAVUKE_GPU=varattu', kuvaus: 'SAVUKE_GPU=varattu' };
  const ajo = spawnSync(join(JUURI, 'tools', 'gpu-vapaa.sh'), [], { encoding: 'utf8', env });
  if (ajo.error || ajo.status === 0 || ajo.status === null) return { varattu: false, syy: null, kuvaus: null };
  const kuvaus = (ajo.stdout ?? '').trim() || 'tuntematon';
  return { varattu: true, syy: kuvaus.replace(/\s*\(.*\)$/, ''), kuvaus };
}

/** Suorituskykyrivi: sama tunniste kuin aja-sarja.mjs:n vaiheistuksessa. */
export const suorituskykyRivi = (rivi) => rivi.env?.SAVUKE_SUORITUSKYKY === '1';

/**
 * Käyttääkö rivi WebKitiä PELKÄSTÄÄN (ei Chromium-osaa)?
 *   - nimiTunniste päättyy "-webkit" tai env SAVUKE_MOOTTORI=webkit;
 *   - env ei valitse moottoria ja savuke oletuksena WebKit
 *     (`SAVUKE_MOOTTORI ?? 'webkit'`) tai kutsuu vain webkit.launchia.
 * Savukkeet, jotka ajavat molemmat selaimet (esim. laivamatka-tanger),
 * eivät ole WebKit-rivejä: niiden Chromium-osa on toiminnallinen vartio.
 * `lahde` = savukkeen lähdeteksti (tyhjä → vain rivin tiedot ratkaisevat).
 */
export function webkitRivi(rivi, lahde = '') {
  if (/-webkit$/.test(rivi.nimiTunniste ?? '')) return true;
  const moottori = rivi.env?.SAVUKE_MOOTTORI;
  if (moottori) return moottori === 'webkit';
  if (/SAVUKE_MOOTTORI\s*\?\?\s*'webkit'/.test(lahde)) return true;
  return /webkit\.launch\(/.test(lahde) && !/(chromium\.launch|avaaChromium)\(/.test(lahde);
}

/**
 * Päätös yhdelle riville: { ohita: syy } tai { env: {...lisäykset} }.
 * GPU vapaa → { env: {} } (ei muutoksia). `perusLiput` = ajurin oma
 * SAVUKE_CHROMIUM_LIPUT, jota rivin env-lohko ei korvaa.
 */
export function gpuVaisto(rivi, tila, lahde = '', perusLiput = process.env.SAVUKE_CHROMIUM_LIPUT) {
  if (!tila.varattu) return { env: {} };
  if (webkitRivi(rivi, lahde) || suorituskykyRivi(rivi)) {
    return { ohita: `GPU varattu (${tila.syy})` };
  }
  // Rivin omat liput säilyvät; swiftshader lisätään, ellei rivi ole
  // valinnut GL-taustaa itse (kokoaLiput yhdistää --disable-features-listat).
  const annetut = rivi.env?.SAVUKE_CHROMIUM_LIPUT ?? perusLiput ?? '';
  const omat = annetut === '0' ? '' : annetut;
  if (/--use-(gl|angle)=/.test(omat)) return { env: {} };
  return { env: { SAVUKE_CHROMIUM_LIPUT: `${omat} ${SWIFTSHADER}`.trim() } };
}

/** Savukkeen lähdeteksti WebKit-tunnistukseen (virhe → tyhjä). */
export function savukkeenLahde(tiedosto) {
  try {
    return readFileSync(join(TASSA, tiedosto), 'utf8');
  } catch {
    return '';
  }
}
