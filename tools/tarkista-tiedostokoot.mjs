// Tiedostokokojen vahti (omistajan päätös 20.10.2026 15.23 "Sääntö ja vahti", Raamattu 7.22): luovutus-, aloitus- ja
// tilatiedostoissa vain voimassa oleva tila. Mittaa kunkin roolin uusimman aloitus-, luovutus- ja tilatiedoston sekä
// muistin MEMORY.md:n. Rajat: aloitus/luovutus/tila 15 kt, MEMORY.md 10 kt, sen rivi enintään 160 merkkiä ja rivin kuvausosa
// (" — " jälkeen) enintään 80 merkkiä (KK:n tarkennus 15.25). 1 kt = 1024 tavua.
// Tuloste: yksi rivi per ylitys "YLITYS|rooli|tiedosto|koko", tai "OK". Poistumiskoodi 1, jos ylityksiä on.
// Ajo: tools/tarkista-tiedostokoot.sh (Postivahdin kierros, tarkista-tyotilat.sh:n rinnalla).
// Polut: TIEDOSTOKOOT_REPO (oletus tämän skriptin repo) ja TIEDOSTOKOOT_MUISTI (oletus Fablen checkoutin muistikansio).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAJA_TIEDOSTO = 15 * 1024;
export const RAJA_MUISTI = 10 * 1024;
export const RAJA_RIVI = 160;
export const RAJA_KUVAUS = 80;

const OLETUSMUISTI = '/Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory';

function lista(kansio) {
  try { return readdirSync(kansio); } catch { return []; }
}

/** Leiman järjestysavain: päivämäärä (8 numeroa) ensin, sitten loppuosa; leimaton = uusin (jatkuvasti päivitetty). */
function avain(leima) {
  const m = /(\d{8})(.*)$/.exec(leima);
  return m ? `${m[1]}${m[2]}` : '￿';
}

/** Uusin tiedosto per rooli: nimet → Map(rooli → nimi). */
export function uusimmat(nimet, kaava) {
  const paras = new Map();
  for (const n of nimet) {
    const m = kaava.exec(n);
    if (!m) continue;
    const [, rooli, leima = ''] = m;
    const vanha = paras.get(rooli);
    if (!vanha || avain(leima) > avain(vanha.leima)) paras.set(rooli, { nimi: n, leima });
  }
  return new Map([...paras].map(([r, v]) => [r, v.nimi]));
}

/** MEMORY.md:n "Rooli-tilaraportit"-osion linkit (tiedostonimet). */
export function tilalinkit(muistiTeksti) {
  const linkit = [];
  let osio = false;
  for (const rivi of muistiTeksti.split('\n')) {
    if (rivi.startsWith('## ')) { osio = /Rooli-tilaraportit/.test(rivi); continue; }
    if (!osio) continue;
    const m = /\]\(([^)]+\.md)\)/.exec(rivi);
    if (m) linkit.push(m[1]);
  }
  return linkit;
}

const kt = (t) => `${(t / 1024).toFixed(1).replace('.', ',')} kt`;

export function tarkista({ repo, muisti }) {
  const ylitykset = [];
  const mittaa = (rooli, polku, nayta, raja) => {
    if (!existsSync(polku)) return;
    const koko = statSync(polku).size;
    if (koko > raja) ylitykset.push(`YLITYS|${rooli}|${nayta}|${kt(koko)} > ${raja / 1024} kt`);
  };

  const aloitusKansio = join(repo, 'docs/aloitusviestit');
  for (const n of lista(aloitusKansio).filter((n) => n.endsWith('.md')).sort())
    mittaa(basename(n, '.md'), join(aloitusKansio, n), `docs/aloitusviestit/${n}`, RAJA_TIEDOSTO);

  const raportit = join(repo, 'docs/raportit');
  const nimet = lista(raportit);
  for (const [rooli, n] of [...uusimmat(nimet, /^viesti-(.+?)-aloitus(?:-(.*))?\.md$/)].sort())
    mittaa(rooli, join(raportit, n), `docs/raportit/${n}`, RAJA_TIEDOSTO);
  for (const [rooli, n] of [...uusimmat(nimet, /^viesti-(.+?)-luovutus-(.*)\.md$/)].sort())
    mittaa(rooli, join(raportit, n), `docs/raportit/${n}`, RAJA_TIEDOSTO);

  const muistiPolku = join(muisti, 'MEMORY.md');
  if (existsSync(muistiPolku)) {
    const teksti = readFileSync(muistiPolku, 'utf8');
    for (const n of [...new Set(tilalinkit(teksti))]) {
      const rooli = /^(.+?)-tila-/.exec(basename(n))?.[1] ?? basename(n, '.md');
      mittaa(rooli, join(muisti, n), `muisti/${n}`, RAJA_TIEDOSTO);
    }
    mittaa('muisti', muistiPolku, 'muisti/MEMORY.md', RAJA_MUISTI);
    teksti.split('\n').forEach((rivi, i) => {
      const merkkeja = [...rivi].length;
      if (merkkeja > RAJA_RIVI) ylitykset.push(`YLITYS|muisti|muisti/MEMORY.md:${i + 1}|${merkkeja} merkkiä > ${RAJA_RIVI}`);
      const v = rivi.indexOf(' — ');
      const kuvaus = v < 0 ? 0 : [...rivi.slice(v + 3)].length;
      if (kuvaus > RAJA_KUVAUS) ylitykset.push(`YLITYS|muisti|muisti/MEMORY.md:${i + 1} kuvaus|${kuvaus} merkkiä > ${RAJA_KUVAUS}`);
    });
  }
  return ylitykset;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const repo = process.env.TIEDOSTOKOOT_REPO || join(dirname(fileURLToPath(import.meta.url)), '..');
  const muisti = process.env.TIEDOSTOKOOT_MUISTI || OLETUSMUISTI;
  const y = tarkista({ repo, muisti });
  console.log(y.length ? y.join('\n') : 'OK');
  process.exit(y.length ? 1 : 0);
}
