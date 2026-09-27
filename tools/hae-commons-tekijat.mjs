#!/usr/bin/env node
/*
 * COMMONS-KUVIEN TEKIJÄT JA LISENSSIT, JOITA DATASSA EI OLE
 * (Pelikoodari 27.9.2026, Fablen erä "TEKIJÄMERKINNÄT pelissä").
 *
 *   node tools/hae-commons-tekijat.mjs            # näyttää, mitä haettaisiin
 *   node tools/hae-commons-tekijat.mjs --kirjoita # hakee ja kirjoittaa js/packs/commons-tekijat.js
 *
 * tools/kuvatekijat.mjs luokittelee jokaisen pelin kuvan. Commons-kuvat ja
 * -liput, joilta datasta puuttuu lisenssi (lisenssi-puuttuu) tai tekijä
 * (pd-ei-tekijaa), haetaan Commonsin omista metatiedoista (extmetadata:
 * Attribution / Artist, LicenseShortName, LicenseUrl) ja kirjoitetaan
 * tauluun COMMONS_TEKIJAT: tiedostonimi → [tekijä, lisenssi, lisenssiUrl].
 * Tyhjä tekijä = Commons ei tunne tekijää (PD, "tuntematon").
 *
 * Peli täydentää kuvan lähderivin taulusta (js/tekijakortti.js
 * taytaLahderivi), ja taulu kulkee sisällön viennissä natiiviin.
 * Olemassa olevat rivit säilyvät; työkalu hakee vain puuttuvat.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siisti } from './commons-siisti.mjs';
import { COMMONS_TEKIJAT } from '../js/packs/commons-tekijat.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KIRJOITA = process.argv.includes('--kirjoita');
const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';
const hae = (url) => JSON.parse(execFileSync('curl',
  ['-sS', '--max-time', '45', '--retry', '2', '--retry-delay', '3', '-A', AGENTTI, url],
  { maxBuffer: 5e7 }).toString());
const nuku = (s) => execFileSync('sleep', [String(s)]);

const { kokoaVienti } = await import('./vienti/vie-sisalto.mjs');
const { kuvienTekijat } = await import('./kuvatekijat.mjs');
const { tiedostot } = await kokoaVienti();
const puuttuvat = kuvienTekijat(tiedostot)
  .filter((k) => (k.laji === 'kuva-commons' || k.laji === 'lippu-commons')
    && (k.luokka === 'lisenssi-puuttuu' || k.luokka === 'pd-ei-tekijaa'))
  .map((k) => k.arvo)
  .filter((n) => !(n in COMMONS_TEKIJAT));
console.log(`Haettavia Commons-tiedostoja: ${puuttuvat.length}`);
if (!KIRJOITA) { for (const n of puuttuvat.slice(0, 20)) console.log('  ', n); process.exit(0); }

/*
 * Tekijäkentän jäänteet, jotka eivät ole nimiä: Commonsin lippusivujen
 * "See file history below for details", tuntemattoman tekijän mallineet,
 * käyttäjänimien etuliitteet ja lataushistorian viittaukset.
 */
export function puhdistaTekija(t) {
  let s = String(t ?? '').trim();
  if (/^(various,\s*)?see (the )?(file|upload)? ?(history|below)|^(anonymous|unbekannt|inconnu|tuntematon)$|^unknown$/i.test(s)) return '';
  s = s.replace(/\s*Vector(ization)?:\s*see (the )?file history.*$/i, '').replace(/^Unknown\s+(?=Vector)/i, '')
    .replace(/\s+Vector(ization)?:\s*/gi, '; vektori: ').replace(/^Vector(ization)?:\s*/i, 'vektori: ')
    .replace(/\b(w|Creator):/g, '');
  s = s.replace(/(Anonymous)?Unknown author/gi, '').replace(/^Original:\s*(Vector:\s*)?/i, '')
    .replace(/^Created by\s+/i, '').replace(/\s*\(see upload log\)/i, '').replace(/\s*:\s*Commons$/i, '')
    .replace(/\bUser:([^\s~,/]+)(~\w+)?/g, '$1').replace(/\s+/g, ' ').replace(/^[\s,:;/-]+|[\s,:;/-]+$/g, '');
  return s;
}

const taulu = { ...COMMONS_TEKIJAT };
const eiLoydy = [];
for (let i = 0; i < puuttuvat.length; i += 40) {
  const era = puuttuvat.slice(i, i + 40);
  let d;
  try {
    d = hae('https://commons.wikimedia.org/w/api.php?format=json&action=query'
      + '&prop=imageinfo&iiprop=user|extmetadata'
      + '&iiextmetadatafilter=Artist|Attribution|LicenseShortName|LicenseUrl'
      + '&titles=' + encodeURIComponent(era.map((t) => `File:${t}`).join('|')));
  } catch (e) {
    console.log(`  haku epäonnistui erässä ${i}: ${e.message.slice(0, 60)}`);
    nuku(5);
    continue;
  }
  const alkuun = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
  for (const sivu of Object.values(d.query?.pages ?? {})) {
    const nimi = (alkuun.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
    const tiedot = sivu.imageinfo?.[0];
    const m = tiedot?.extmetadata;
    if (!m) { eiLoydy.push(nimi); continue; }
    const lisenssi = siisti(m.LicenseShortName?.value);
    // PD:ssä "Unknown author" / "Unknown" ei ole tekijä vaan tieto sen puuttumisesta.
    let tekija = siisti(m.Attribution?.value) || siisti(m.Artist?.value) || '';
    if (!tekija && !/public domain|^pd|cc0/i.test(lisenssi)) tekija = tiedot.user ?? '';
    taulu[nimi] = [tekija, lisenssi, m.LicenseUrl?.value ?? ''];
  }
  process.stdout.write(`  haettu ${Math.min(i + 40, puuttuvat.length)}/${puuttuvat.length}\r`);
  nuku(1);
}
console.log('');
for (const k of Object.keys(taulu)) taulu[k] = [puhdistaTekija(taulu[k][0]), taulu[k][1], taulu[k][2]];
const rivit = Object.keys(taulu).sort((a, b) => a.localeCompare(b))
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(taulu[k])},`);
writeFileSync(join(JUURI, 'js/packs/commons-tekijat.js'), `/*
 * COMMONS-KUVIEN TEKIJÄT JA LISENSSIT, JOITA PAKETEISSA EI OLE.
 *
 * Tuotettu: node tools/hae-commons-tekijat.mjs --kirjoita (Commonsin
 * extmetadata). Älä muokkaa käsin. Muoto: tiedostonimi → [tekijä,
 * lisenssi, lisenssiUrl]; tyhjä tekijä = tekijä tuntematon (PD).
 * Käyttö: js/tekijakortti.js taytaLahderivi täydentää lähderivin,
 * tools/kuvatekijat.mjs ja tests/kuvatekijat.test.mjs vartioivat.
 */
export const COMMONS_TEKIJAT = {
${rivit.join('\n')}
};
`);
console.log(`Kirjoitettu ${rivit.length} riviä. Ei löytynyt Commonsista: ${eiLoydy.length}`);
for (const n of eiLoydy.slice(0, 30)) console.log('  ?', n);
