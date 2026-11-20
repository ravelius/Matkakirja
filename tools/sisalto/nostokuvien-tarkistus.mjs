#!/usr/bin/env node
/*
 * PARIISIN NOSTOKUVIEN TASALAATU (K-3; KK:N PÄÄTÖS 20.11.2026 klo 09.18, aiempi: P-261120-5, P-261117-119, P-261118-14;
 * omistaja 08.41: "kaikissa on riittävästi kodeksilta tilattuja kuvia tai sitten oikeita valokuvia kuvaamaan tekstiä";
 * suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261120-nostojen-kuvat.md 2.1 "Tarkistus koneella").
 *
 * Kone tarkistaa Pariisin 46 noston kuvasarjan siitä, mitä peli saa: vientipaketin `nostokuvat` (tools/vienti/nostokuvat.mjs).
 * Nostot ja tunnukset samat kuin tekstien tarkistuksessa (SK:n tools/sisalto/noston-tarkistus.mjs, PR 7223): A 13 jaksollista
 * (karttavalo = kohteen id), B 4 kadonnutta, C 14 nähtävyysjuttua, D 9 tarinapaikkaa, F 6 historian hetkeä (nähtävyysjuttu;
 * jutun nosto-linkki → linkitetyn noston karttavalo, jonka kuvat pelaaja näkee).
 *   vajaa     alle 3 kuvaa                    liikaa   yli 4 kuvaa (Pariisissa; yleinen katto 7 tests/noston-jaksot.test.mjs)
 *   viimeinen viimeinen kuva ei ole laji valokuva
 *   laji | lyhyt | lahde | tekija | lisenssi   jollakin kuvalla kenttä puuttuu (laji myös: ei sallitusta joukosta)
 *   mitat     jollakin kuvalla viedyn kuvan mitat eivät ole 1200 × 800 (tools/sisalto/nostokuva.mjs kirjoittaa ne)
 *   havainne  havainnekuvan lähderivi ei ala "Tekoälyllä tuotettu havainnekuva"
 * Lähtöluettelo docs/raportit/pariisin-nostokuvat-rikkeet-lahto-20261120.json saa vain pienentyä
 * (tests/nostokuvien-tasalaatu.test.mjs).
 *
 *   node tools/sisalto/nostokuvien-tarkistus.mjs [--json]
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { kokoaVienti } from '../vienti/vie-sisalto.mjs';
import { lisakentatViennissa } from '../vienti/nostokuvat.mjs';
import { LEVEYS, KORKEUS } from './nostokuva.mjs';

export const KUVIA = { min: 3, max: 4 };
export const LAJIT = new Set(['valokuva', 'havainnekuva', 'kartta', 'piirros', 'maalaus']);
export const HAVAINNE_ALKU = 'Tekoälyllä tuotettu havainnekuva';
export const RIKKEET = ['vajaa', 'liikaa', 'viimeinen', 'laji', 'lyhyt', 'lahde', 'tekija', 'lisenssi', 'mitat', 'havainne'];

export const JAKSOLLISET_A = ['tuileries', 'louvre', 'bastilji', 'eiffel-torni', 'sainte-chapelle', 'curie-1898', 'lumiere-1895',
  'lavoisier-1780', 'pasteur-1862', 'palais-garnier', 'hahmotelma-palais-orsay', 'hahmotelma-palais-industrie', 'hahmotelma-les-halles'];
export const KADONNEET_B = ['Grand Châtelet', 'Temple-torni', 'Trocadéron palatsi', 'Galerie des Machines'];
export const JUTUT_C = ['Riemukaari', 'Concorden aukio', 'Luxembourgin puisto', 'Sacré-Cœur', 'Panthéon', 'Notre-Dame', 'Tour Saint-Jacques',
  'Saint-Eustache', 'Pompidou-keskus', 'Place des Vosges', 'Invalidit', 'Petit Palais', 'Tour Montparnasse', 'Metro 1900'];
export const TARINAPAIKAT_D = ['Bizet 1875', 'Kirahvi 1827', 'Bukinistit 1859', 'Patonki 1994', 'Vrain-Lucas', 'Monet 1874', 'Piiritys 1870',
  'Notre-Dame 2019', 'Piaf ja Django'];
export const HETKET_F = ['Curie 1898', 'Lavoisier 1780', 'Pasteur 1862', 'Eiffel-torni 1888', 'Bastilji 1789', 'Lumière 1895'];

const tyhja = (x) => typeof x !== 'string' || !x.trim();

/** Yhden noston rikkeet kuvalistasta (nostokuvat-muoto). */
export function kuvienRikkeet(kuvat) {
  const r = new Set();
  if (kuvat.length < KUVIA.min) r.add('vajaa');
  if (kuvat.length > KUVIA.max) r.add('liikaa');
  if (kuvat.at(-1)?.laji !== 'valokuva') r.add('viimeinen');
  for (const k of kuvat) {
    if (!LAJIT.has(k.laji)) r.add('laji');
    for (const kentta of ['lyhyt', 'lahde', 'tekija', 'lisenssi']) if (tyhja(k[kentta])) r.add(kentta);
    if (k.leveys !== LEVEYS || k.korkeus !== KORKEUS) r.add('mitat');
    if (k.laji === 'havainnekuva' && !String(k.lahde ?? '').startsWith(HAVAINNE_ALKU)) r.add('havainne');
  }
  return RIKKEET.filter((x) => r.has(x));
}

const B_HAHMOTELMA = { 'Grand Châtelet': 'hahmotelma-grand-chatelet', 'Temple-torni': 'hahmotelma-temple-torni',
  'Trocadéron palatsi': 'hahmotelma-trocadero', 'Galerie des Machines': 'hahmotelma-galerie-des-machines' };

/** Pariisin 46 nostoa vientipaketista (tiedostot = valmis kokoaVienti-tulos lisäkentät päällä): [{ id, ryhma, nimi, rivi (mistä kuvat), kuvat }]. */
export async function keraaPariisinNostokuvat({ juuri, tiedostot = null } = {}) {
  lisakentatViennissa(true);
  tiedostot ??= (await kokoaVienti(juuri ? { juuri } : {})).tiedostot;
  const lue = (p) => JSON.parse(tiedostot.get(p));
  const valot = new Map();
  for (const a of lue('kokoelmat/karttavalot.json').alkiot ?? []) if (a?.tunnus && !valot.has(a.tunnus)) valot.set(a.tunnus, a);
  const jutut = new Map((lue('kokoelmat/nahtavyydet.json').alkiot ?? []).filter((a) => a.kaupunki === 'pariisi').map((a) => [a.nimi, a]));
  const tulos = [];
  for (const id of JAKSOLLISET_A) {
    const v = valot.get(id);
    if (!v) throw new Error(`karttavalo puuttuu: ${id}`);
    tulos.push({ id, ryhma: 'A', nimi: v.nimi ?? id, rivi: `karttavalot/${id}`, kuvat: v.nostokuvat ?? [] });
  }
  const jutuista = (ryhma, nimet) => {
    for (const nimi of nimet) {
      const a = jutut.get(nimi);
      // B (4 kadonnutta): nähtävyysjuttukopiot poistettu (KK 20.11.2026 klo 10.44, L5-4 erä 2); hahmotelma on ainoa koti.
      if (!a && !B_HAHMOTELMA[nimi]) throw new Error(`nähtävyysjuttu puuttuu: ${nimi}`);
      const linkki = a ? [a.nosto ?? a.data?.nosto].flat().find((t) => typeof t === 'string' && valot.has(t)) : B_HAHMOTELMA[nimi];
      const v = linkki ? valot.get(linkki) : null;
      tulos.push({ id: `${ryhma.toLowerCase()}:${nimi}`, ryhma, nimi, rivi: v ? `karttavalot/${linkki}` : `nahtavyydet/${a.id}`,
        kuvat: (v ?? a).nostokuvat ?? [] });
    }
  };
  jutuista('B', KADONNEET_B);
  jutuista('C', JUTUT_C);
  jutuista('D', TARINAPAIKAT_D);
  jutuista('F', HETKET_F);
  return tulos;
}

export async function laskeRikkeet(opts) {
  return (await keraaPariisinNostokuvat(opts)).map((n) => ({ id: n.id, ryhma: n.ryhma, nimi: n.nimi, rivi: n.rivi, kuvia: n.kuvat.length,
    rikkeet: kuvienRikkeet(n.kuvat) }));
}

/** Rikkeiden määrä lajeittain (montako nostoa rikkoo kutakin). */
export const lajeittain = (rivit) => Object.fromEntries(RIKKEET.map((k) => [k, rivit.filter((r) => r.rikkeet.includes(k)).length]));

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const rivit = await laskeRikkeet();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ nostoja: rivit.length, rikkovia: rivit.filter((r) => r.rikkeet.length).length, lajeittain: lajeittain(rivit),
      nostot: Object.fromEntries(rivit.filter((r) => r.rikkeet.length).map((r) => [r.id, { ryhma: r.ryhma, kuvia: r.kuvia, rikkeet: r.rikkeet }])) }, null, 2));
  } else {
    for (const r of rivit) console.log(`${r.ryhma}\t${r.id}\t${r.kuvia}\t${r.rikkeet.join(',') || '-'}\t${r.rivi}`);
    console.log(`\nNostoja ${rivit.length}, rikkovia ${rivit.filter((r) => r.rikkeet.length).length}; lajeittain ${JSON.stringify(lajeittain(rivit))}`);
  }
}
