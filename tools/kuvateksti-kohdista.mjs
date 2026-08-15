/*
 * Mekaaninen kuvatekstien kohdistaja.
 *
 * Syöte: JSON-taulukko muutoksia
 *   [{ tiedosto, kentta: 'selite'|'teksti', vanha, uusi }]
 * Kohdistus tehdään VANHAN tekstin perusteella (ei rivinumeroiden),
 * joten väärään kenttään ei voi osua. Jos vanhaa ei löydy tai
 * osumia on useampi eri arvolla, muutos hylätään ja raportoidaan.
 *
 * Käyttö: node kuvateksti-kohdista.mjs muutokset.json [--kuiva]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const LEVEYS = 76;
const KENTAT = ['selite', 'teksti'];

// --- Lähdekoodin merkkijonolausekkeiden jäsennys ------------------------

function lueMerkkijono(src, i) {
  const q = src[i];
  if (q !== "'" && q !== '"') return null;
  let arvo = '';
  i += 1;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      const kartta = { n: '\n', t: '\t', r: '\r', '\\': '\\', "'": "'", '"': '"', '`': '`' };
      arvo += kartta[n] ?? n;
      i += 2;
      continue;
    }
    if (c === q) return { arvo, loppu: i + 1 };
    if (c === '\n') return null;
    arvo += c;
    i += 1;
  }
  return null;
}

/** Jäsentää lausekkeen 'a' + 'b' + 'c' kohdasta i alkaen. */
function lueLauseke(src, i) {
  let arvo = '';
  let loppu = i;
  for (;;) {
    const osa = lueMerkkijono(src, i);
    if (!osa) return null;
    arvo += osa.arvo;
    loppu = osa.loppu;
    // Etsi seuraava ei-tyhjä merkki.
    let j = osa.loppu;
    while (j < src.length && /\s/.test(src[j])) j += 1;
    if (src[j] === '+') {
      j += 1;
      while (j < src.length && /\s/.test(src[j])) j += 1;
      i = j;
      continue;
    }
    return { arvo, alku: undefined, loppu };
  }
}

/** Kaikki KENTAT-kenttien esiintymät tiedostossa. */
export function kentat(src) {
  const osumat = [];
  const re = new RegExp(`^([ \\t]*)(${KENTAT.join('|')}): `, 'gm');
  let m;
  while ((m = re.exec(src))) {
    const sisennys = m[1];
    const kentta = m[2];
    const alku = m.index + m[0].length;
    const lauseke = lueLauseke(src, alku);
    if (!lauseke) continue;
    osumat.push({ kentta, sisennys, alku, loppu: lauseke.loppu, arvo: lauseke.arvo });
  }
  return osumat;
}

// --- Uuden literaalin muotoilu -----------------------------------------

function lainaa(pala) {
  return `'${pala.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

export function muotoile(teksti, sisennys, kentta) {
  const ekaAlku = `${sisennys}${kentta}: `;
  const jatkoAlku = `${sisennys}  + `;
  const sanat = teksti.split(' ');
  const rivit = [];
  let pala = '';
  let tila = LEVEYS - ekaAlku.length - 2; // lainausmerkit
  for (let i = 0; i < sanat.length; i += 1) {
    const sana = sanat[i];
    const lisa = pala === '' ? sana : ` ${sana}`;
    // Karkea arvio: kertautuvat kenoviivat kasvattavat riviä, mutta
    // ylitys on kosmeettinen eikä riko mitään.
    if (pala !== '' && pala.length + lisa.length > tila) {
      rivit.push(`${pala} `); // välilyönti rivin loppuun, kuten repossa
      pala = sana;
      tila = LEVEYS - jatkoAlku.length - 2;
    } else {
      pala += lisa;
    }
  }
  rivit.push(pala);
  return rivit
    .map((r, i) => (i === 0 ? ekaAlku : jatkoAlku) + lainaa(r))
    .join('\n');
}

// --- Pääohjelma --------------------------------------------------------

function aja() {
  const kuiva = process.argv.includes('--kuiva');
  const muutokset = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const tiedostoittain = new Map();
  for (const m of muutokset) {
    if (!tiedostoittain.has(m.tiedosto)) tiedostoittain.set(m.tiedosto, []);
    tiedostoittain.get(m.tiedosto).push(m);
  }

  const virheet = [];
  let tehty = 0;
  for (const [tiedosto, lista] of tiedostoittain) {
    let src = readFileSync(tiedosto, 'utf8');
    // Sovita pisimmät ensin, jotta osaosumat eivät sotke.
    for (const m of lista) {
      if (typeof m.vanha !== 'string' || typeof m.uusi !== 'string') {
        virheet.push(`EI-MERKKIJONO: ${JSON.stringify(m).slice(0, 120)}`);
        continue;
      }
      const osumat = kentat(src).filter(
        (o) => o.kentta === m.kentta && o.arvo === m.vanha,
      );
      if (osumat.length === 0) {
        virheet.push(`EI LÖYDY (${m.kentta}): ${m.vanha.slice(0, 90)}…`);
        continue;
      }
      // Korvaa lopusta alkuun, jotta indeksit pysyvät.
      for (const o of [...osumat].reverse()) {
        const uusiLit = muotoile(m.uusi, o.sisennys, o.kentta);
        src = src.slice(0, o.alku - `${o.sisennys}${o.kentta}: `.length)
          + uusiLit
          + src.slice(o.loppu);
      }
      tehty += osumat.length;
      if (osumat.length > 1) {
        console.log(`  (${osumat.length} identtistä osumaa) ${m.vanha.slice(0, 60)}…`);
      }
    }
    if (!kuiva) writeFileSync(tiedosto, src);
  }

  console.log(`Kohdistettu: ${tehty}`);
  if (virheet.length) {
    console.log(`VIRHEITÄ: ${virheet.length}`);
    for (const v of virheet) console.log('  ' + v);
    process.exitCode = 1;
  }
}

if (process.argv[1]?.endsWith('kuvateksti-kohdista.mjs')) aja();
