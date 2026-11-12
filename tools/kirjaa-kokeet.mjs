#!/usr/bin/env node
/*
 * kirjaa.mjs:n kahdeksan hyväksymiskoetta (KK 12.11.2026, suunnitelma 20261112-raamattu-uusiksi.md osa 9).
 * Ajetaan väliaikaisessa git-repossa (ei koske oikeaan Raamattuun):  node tools/kirjaa-kokeet.mjs
 * Tulostaa jokaisen kokeen komennon ja tulosteen; paluu 0 = kaikki odotetusti.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, writeFileSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const T = mkdtempSync(join(tmpdir(), 'kirjaa-koe-'));
const g = (...a) => execFileSync('git', ['-C', T, ...a], { encoding: 'utf8' });
g('init', '-q'); g('config', 'user.email', 'koe@example.invalid'); g('config', 'user.name', 'koe');
mkdirSync(join(T, 'docs/raamattu'), { recursive: true });
copyFileSync(join(REPO, 'docs/raamattu/aiheet.json'), join(T, 'docs/raamattu/aiheet.json'));
const env = { ...process.env, KIRJAA_JUURI: T, KIRJAA_LUKULOKI: join(T, 'lukuloki.tsv'), KIRJAA_MUISTI: join(T, 'MEMORY.md') };
writeFileSync(join(T, 'MEMORY.md'), '- [Koe](koe.md) — tyhjä muisti\n');
const kirjaa = (...a) => spawnSync('node', [join(REPO, 'tools/kirjaa.mjs'), ...a], { env, encoding: 'utf8' });
const kortti = (nimi, teksti) => { const p = join(T, nimi); writeFileSync(p, teksti); return p; };

const KAMERA = `# kamera · vastuu PK · tarkistettu 12.11.2026
TAVOITE: Kamera liikkuu koko pelissä yhdellä elokuvamaisella käsialalla. Pelaaja ei huomaa kameraa, vain maiseman.
SÄÄNNÖT:
1. Kamera liikkuu pehmeästi usealla akselilla yhtä aikaa, kevyesti kallistaen ja ilman nyökkäystä. [R-2.6]
2. Juoksupelin kamera ei ole FPV-lento eikä hypi pelaajan askelten tahdissa. [R-2.7]
EI VIKA: Hidas aloitusliike saapuessa on tarkoituksellinen.
TEKOTAPA: kirjastoluettelon rivi kamera; tarkistus tests/kamera.test.mjs.
`;
const PELI = `# juoksupeli · vastuu PK · tarkistettu 12.11.2026
TAVOITE: Juoksupeli on lyhyt ja selkeä.
SÄÄNNÖT:
1. Juoksu kestää enintään kaksi minuuttia ja päättyy aina maaliin. [R-2.8]
EI VIKA: Ote on päätetty.
TEKOTAPA: tests/juoksupeli.test.mjs.
`;
let ok = true;
const koe = (n, kuvaus, tulos, odotus) => {
  const teksti = (tulos.stdout + tulos.stderr).trim();
  const hyva = odotus(teksti, tulos.status);
  ok &&= hyva;
  console.log(`\n=== KOE ${n}: ${kuvaus} → ${hyva ? 'OK' : 'VÄÄRIN'} (paluu ${tulos.status})\n${teksti}`);
};

kirjaa('alusta');
// pohja: kamera-kortti sisään (tarvitaan kokeissa 5 ja 8)
const pohja = kirjaa('kortti', 'kamera', kortti('kamera.md', KAMERA));
if (pohja.status !== 0) { console.log('POHJAKORTTI HYLÄTTIIN:\n' + pohja.stdout); process.exit(1); }
console.log('Pohja: ' + pohja.stdout.trim().replace(/\n/g, ' | '));

koe(1, 'kortti yli 3 kt hylätään', kirjaa('kortti', 'juoksupeli', kortti('iso.md', PELI + 'TEKOTAPA: '.padEnd(3200, 'x') + '\n')),
  (t, s) => s === 1 && t.includes('KOKO'));
koe(2, 'pohjan osa puuttuu → hylätään', kirjaa('kortti', 'juoksupeli', kortti('vajaa.md', PELI.replace(/EI VIKA:.*\n/, ''))),
  (t, s) => s === 1 && t.includes('osa EI VIKA: puuttuu'));
koe(3, 'kellonaika tai sitaatti → hylätään', kirjaa('kortti', 'juoksupeli',
  kortti('sitaatti.md', PELI.replace('Ote on päätetty.', 'Omistaja klo 17.30: "ote on hyvä näin".'))),
  (t, s) => s === 1 && t.includes('KELLONAIKA') && t.includes('SITAATTI'));
koe(4, 'sääntö ilman [P-…]/[R-…] → hylätään', kirjaa('kortti', 'juoksupeli', kortti('tunnus.md', PELI.replace(' [R-2.8]', ''))),
  (t, s) => s === 1 && t.includes('TUNNUS PUUTTUU'));
koe(5, 'virke ≥ 0,8 sama kuin toisessa kortissa → hylätään, kertoo kortin', kirjaa('kortti', 'juoksupeli', kortti('tupla.md',
  PELI.replace('Juoksu kestää enintään kaksi minuuttia ja päättyy aina maaliin.',
    'Kamera liikkuu pehmeästi usealla akselilla yhtä aikaa, kevyesti kallistaen eikä nyökkää.'))),
  (t, s) => s === 1 && t.includes('PÄÄLLEKKÄIN kortin kamera'));
const p6 = kirjaa('paatos', 'kamera', '--klo', '09.12', '--kuka', 'KK', 'kamera liikkuu elokuvamaisesti');
const t6 = kirjaa('tila');
koe(6, 'paatos ilman korttipäivitystä → punainen tila-rivi', { stdout: p6.stdout + '\n--- kirjaa tila:\n' + t6.stdout, stderr: '', status: p6.status },
  (t) => /🔴 päätöksiä ilman korttipäivitystä: 1/.test(t));
appendFileSync(join(T, 'docs/raamattu/aiheet/kamera.md'), 'Lisätty käsin ohi oven.\n');
koe(7, 'suora muokkaus ohi komennon → punainen', kirjaa('tila'), (t) => /🔴 kirjauksia ohi oven: 1 \[raja 0\] – aiheet\/kamera\.md/.test(t));
koe(8, 'kirjaa hae "kamera" löytää kortin ja lokin', kirjaa('hae', 'kamera'),
  (t) => /KORTIT JA PERUSTA \([1-9]/.test(t) && /PÄÄTÖSLOKI \(1\)/.test(t) && t.includes('AIHE: kamera'));
console.log(`\n${ok ? 'KAIKKI 8 KOETTA ODOTETUSTI' : 'VIRHE: jokin koe ei toiminut odotetusti'} (koerepo ${T})`);
process.exit(ok ? 0 : 1);
