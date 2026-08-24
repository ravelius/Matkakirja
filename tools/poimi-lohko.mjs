/*
 * Poimii yhden avaimen lohkon nimetystä oliosta toisesta commitista ja
 * liittää sen nykyiseen tiedostoon saman olion loppuun.
 *
 *   node tools/poimi-lohko.mjs <commit> <tiedosto> <OLION_NIMI> <avain>
 *
 * MIKSI TÄMÄ ON OLEMASSA. Rinnakkaiset agentit kirjoittavat samaan
 * tiedostoon (js/packs/kulttuuri-kategoriat.js on 60 000 riviä ja
 * jokainen uusi kaupunkilehti lisää sinne oman lohkonsa). Cherry-pick
 * törmää silloin joka kerta, koska lohkot lisätään eri kohtiin. Tämä
 * työkalu poimii yhden lohkon kerrallaan SULKULASKENNALLA — ei
 * regexillä, joka katkeaisi ensimmäiseen tekstin sisällä olevaan
 * sulkuun.
 *
 * TÄMÄ ASUI AIEMMIN SCRATCHPADISSA. Kontti kaatui 24.8.2026 ja tyhjensi
 * /tmp:n, jolloin työkalu oli vähällä kadota kesken yöajon — siksi se
 * on nyt repossa.
 *
 * Tukee sekä { että [ -alkuisia lohkoja ja lainausmerkeissä olevia
 * avaimia (esim. 'Perth (Länsi-Australia)'). Kommenttilohko avaimen
 * edellä tulee mukaan, koska siinä on lähdetiedot ja perustelut.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [commit, polku, olio, avain] = process.argv.slice(2);
const lahde = execSync(`git show ${commit}:${polku}`, { encoding: 'utf8', maxBuffer: 1 << 30 }).split('\n');

const laske = (rivit, alku, avausMerkki, sulkuMerkki) => {
  let syvyys = 0;
  for (let i = alku; i < rivit.length; i += 1) {
    for (const m of rivit[i]) {
      if (m === avausMerkki) syvyys += 1;
      else if (m === sulkuMerkki) syvyys -= 1;
    }
    if (syvyys === 0) return i;
  }
  throw new Error('sulut eivat mene tasan');
};

const vaihtoehdot = [`  ${avain}: {`, `  ${avain}: [`, `  '${avain}': {`, `  '${avain}': [`];
const alkuRivi = lahde.findIndex((r) => vaihtoehdot.includes(r));
if (alkuRivi < 0) throw new Error(`avainta ${avain} ei loydy commitista`);
const avaus = lahde[alkuRivi].trimEnd().endsWith('[') ? '[' : '{';
const sulku = avaus === '[' ? ']' : '}';
let kommenttiAlku = alkuRivi;
for (let i = alkuRivi - 1; i >= 0; i -= 1) {
  const r = lahde[i];
  /*
   * Kommenttilohko voi alkaa joko rivilla '  /*' yksin TAI muodossa
   * '  /* HAVANNA (24.8.2026). ...' eli tekstin kanssa samalla rivilla.
   * Vain edellinen tunnistettiin aiemmin, jolloin poimittu lohko alkoi
   * kesken kommentin ja tuotti syntaksivirheen. Molemmat kelpaavat nyt.
   */
  if (r.startsWith('   *') || r.startsWith('  /*')) { kommenttiAlku = i; if (r.startsWith('  /*')) break; continue; }
  break;
}
const loppuRivi = laske(lahde, alkuRivi, avaus, sulku);
const lohko = lahde.slice(kommenttiAlku, loppuRivi + 1);

const kohde = readFileSync(polku, 'utf8').split('\n');
const olioAlku = kohde.findIndex((r) => r.includes(`${olio} = {`));
if (olioAlku < 0) throw new Error(`oliota ${olio} ei loydy kohteesta`);
const olioLoppu = laske(kohde, olioAlku, '{', '}');
kohde.splice(olioLoppu, 0, ...lohko);
writeFileSync(polku, kohde.join('\n'));
console.log(`${polku}: ${avain} (${lohko.length} rivia) liitetty`);
