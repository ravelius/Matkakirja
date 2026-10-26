#!/usr/bin/env node
/*
 * SESSION ID:IDEN PÄIVITYS TILINVAIHDOSSA (Päätoimittaja 14.10.2026, kylmäkäynnistystesti 2, docs/tilinvaihto.md kohta 3).
 *
 *   node tools/tyotavat/paivita-idt.mjs "Julkaisija=local_<uusi uuid>" "PÄÄTOIMITTAJA=local_<uusi uuid>" …   # kuiva-ajo
 *   node tools/tyotavat/paivita-idt.mjs … --kirjoita                                                         # kirjoittaa
 *   node tools/tyotavat/paivita-idt.mjs "local_<vanha>=local_<uusi>" …                                        # suora pari
 *
 * Rooli haetaan Macin osoitekirjan (/Users/Shared/Claude/osoitekirja.md) ensimmäisestä sarakkeesta (kirjainkoko ja
 * suluissa oleva tarkenne ohitetaan, alkuosa riittää: "Valoseppä"). Vanha id luetaan osoitekirjasta, ja jokainen vanha id
 * korvataan uudella kaikissa tiedostoissa, jotka toistavat id:itä (lista KOHTEET alla): täysi muoto local_<uuid> ja
 * lyhyt muoto local_<8 merkkiä> (esim. muistioissa). Kuiva-ajo (oletus) vain tulostaa osumat per tiedosto.
 * Kirjoitus .tmp + rename. Lopuksi: bash tools/tyotavat/peili.sh ja commit.
 */
import { readFileSync, writeFileSync, renameSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const S = '/Users/Shared/Claude';
const F = `${S}/Matkakirja-fable/scratchpad`;
const REPO = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const OSOITEKIRJA = `${S}/osoitekirja.md`;

export function kohteet() {
  const lista = [
    OSOITEKIRJA,
    `${S}/Matkakirja-posti/KIERROS.md`,
    `${S}/Matkakirja-posti/NOLLAUS.md`,
    `${F}/keskustelukanava/aloitus.md`,
    `${F}/jonokierros-teksti.md`,
    `${F}/asemataulu/roolit.json`,
    `${F}/asemataulu/data/talo/roolit.json`,
  ];
  const al = join(REPO, 'docs/aloitusviestit');
  if (existsSync(al)) for (const n of readdirSync(al)) if (n.endsWith('.md')) lista.push(join(al, n));
  const rap = join(REPO, 'docs/raportit');
  if (existsSync(rap)) for (const n of readdirSync(rap)) if (/^viesti-.*-aloitus\.md$/.test(n)) lista.push(join(rap, n));
  return lista;
}

const ID = /local_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

/** Osoitekirjan taulukko: [{rooli, id}] */
export function lueOsoitekirja(teksti) {
  const rivit = [];
  for (const r of teksti.split('\n')) {
    if (!r.startsWith('|')) continue;
    const solut = r.split('|').map((x) => x.trim());
    const m = (solut[2] || '').match(ID);
    if (m) rivit.push({ rooli: solut[1], id: m[0] });
  }
  return rivit;
}

const normi = (s) => s.toLowerCase().replace(/\(.*?\)/g, '').trim();

/** Argumentit → [[vanha, uusi]] */
export function parit(argumentit, osoitekirja) {
  const tulos = [];
  for (const a of argumentit) {
    const i = a.indexOf('=');
    if (i < 0) throw new Error(`ei muotoa X=uusi: ${a}`);
    const vasen = a.slice(0, i).trim();
    const uusi = a.slice(i + 1).trim();
    if (!ID.test(uusi) || uusi.match(ID)[0] !== uusi) throw new Error(`uusi id ei ole muotoa local_<uuid>: ${uusi}`);
    let vanha;
    if (ID.test(vasen)) vanha = vasen;
    else {
      const osumat = osoitekirja.filter((r) => normi(r.rooli).startsWith(normi(vasen)));
      if (osumat.length !== 1) throw new Error(`rooli "${vasen}": ${osumat.length} osumaa osoitekirjassa`);
      vanha = osumat[0].id;
    }
    if (vanha !== uusi) tulos.push([vanha, uusi]);
  }
  return tulos;
}

/** Korvaa täydet ja lyhyet muodot; palauttaa [uusi teksti, osumien määrä]. */
export function korvaa(teksti, pari) {
  let n = 0;
  let t = teksti;
  for (const [vanha, uusi] of pari) {
    const taysi = t.split(vanha).length - 1;
    t = t.split(vanha).join(uusi);
    const lyhytV = vanha.slice(0, 14);
    const lyhytU = uusi.slice(0, 14);
    const re = new RegExp(`${lyhytV}(?![0-9a-f-])`, 'g');
    const lyhyet = (t.match(re) || []).length;
    t = t.replace(re, lyhytU);
    n += taysi + lyhyet;
  }
  return [t, n];
}

function main() {
  const argv = process.argv.slice(2);
  const kirjoita = argv.includes('--kirjoita');
  const args = argv.filter((a) => !a.startsWith('--'));
  if (!args.length) {
    console.error('Käyttö: node tools/tyotavat/paivita-idt.mjs "Rooli=local_<uuid>" … [--kirjoita]');
    process.exit(2);
  }
  if (!existsSync(OSOITEKIRJA)) { console.error(`osoitekirjaa ei ole: ${OSOITEKIRJA}`); process.exit(2); }
  const ok = lueOsoitekirja(readFileSync(OSOITEKIRJA, 'utf8'));
  let pari;
  try { pari = parit(args, ok); } catch (e) { console.error(e.message); process.exit(2); }
  for (const [v, u] of pari) console.log(`${v} -> ${u}`);
  let yht = 0;
  for (const polku of kohteet()) {
    if (!existsSync(polku)) { console.log(`PUUTTUU: ${polku}`); continue; }
    const vanha = readFileSync(polku, 'utf8');
    const [uusi, n] = korvaa(vanha, pari);
    if (!n) continue;
    yht += n;
    console.log(`${kirjoita ? 'kirjoitettu' : 'osumia'} ${n}: ${polku}`);
    if (kirjoita) { writeFileSync(`${polku}.tmp`, uusi); renameSync(`${polku}.tmp`, polku); }
  }
  console.log(kirjoita ? `Valmis: ${yht} korvausta. Sitten: bash tools/tyotavat/peili.sh` : `Kuiva-ajo: ${yht} korvausta (lisää --kirjoita).`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
