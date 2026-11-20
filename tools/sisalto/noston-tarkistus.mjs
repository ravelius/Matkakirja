/*
 * NOSTOTEKSTIEN KUUSI TARKISTUSTA (P-261120-3, L5-2; suunnitelma 20261120-viisi-lisaysta.md L5.5; KK 20.11.2026).
 *
 * Kone tarkistaa Pariisin nostojen leipätekstin (se, minkä kertoja lukee):
 *   alku      nimi ensimmäisessä virkkeessä JA ensimmäinen virke ei ala suhteellisella ajalla ("Kaksi vuotta aiemmin")
 *   isoisa    sana "isoisä" ei esiinny
 *   jarjestys tekstin vuodet nousevassa järjestyksessä (vuosikymmenet ja "ei 1789:stä" -vastakohdat eivät lasketa)
 *   pituus    enintään 1 000 merkkiä
 *   rivit     (vain jaksollinen nosto) jokaisella sanotulla vuodella vuosirivi ja jokaisella rivillä vuosi tekstissä,
 *             rivit nousevassa järjestyksessä
 * Lähtöluettelo (docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json) on origin/mainin tila ennen erää 1;
 * se saa vain pienentyä: uusi nosto tai muuttunut teksti ei pääse läpi rikkeellä (tests/noston-tekstisaannot.test.mjs).
 *
 * Käyttö: node tools/sisalto/noston-tarkistus.mjs [--juuri <repo>] [--json]
 */
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

export const RIKKEET = ['alku', 'isoisa', 'jarjestys', 'pituus', 'rivit'];
export const PITUUS_MAX = 1000;
/** Merkkimäärä kappaleväleittä (jaksojen pituuksien summa, kuten raporteissa). */
export const merkkeja = (teksti) => String(teksti).replace(/\n\n/g, '').length;
/** Sallitut vuosirivit ilman vuotta tekstissä (id → vuodet). Tyhjä: Eiffelin 1909 poistettiin riippumattoman tarkistajan EI-rivillä (lähteet 1909/1910). */
export const JOHDETUT_RIVIT = {};

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const ISOISA = /isoisä/i;
const SUHTEELLINEN_ALKU = [
  /^(?:\S+\s+){0,3}?(?:vuotta|vuosi|vuosikymmentä|vuosisataa|vuosisata|kuukautta|päivää|viikkoa)\s+(?:myöhemmin|aiemmin|sitten|jälkeen|ennen)/i,
  /^(?:myöhemmin|aiemmin|sitten|sen jälkeen|pian|samana|saman|seuraavana|seuraavaksi|tuolloin|silloin|tuona|tämän jälkeen)\b/i,
];

export const ensimmainenVirke = (teksti) => String(teksti).trim().split(/[.!?](?=\s+[A-ZÅÄÖÉÈ«"'])/)[0];

/** Nimen tunnistusvarsi: nimestä ilman loppuvuotta, ensimmäinen sana ilman kahta viimeistä kirjainta (taivutus). */
export function nimenVarsi(nimi) {
  const ilmanVuotta = String(nimi).replace(/\s+\d{4}(?:[–-]\d{4})?$/, '').trim();
  const sana = ilmanVuotta.split(/\s+/)[0].toLowerCase().replace(/'n$/, '');
  return sana.length > 5 ? sana.slice(0, -2) : sana;
}

/** Tekstissä sanotut vuodet (1000–2099): ei vuosikymmeniä ("1300-luvun"), ei vastakohtaa ("ei 1789:stä"). */
export function sanotutVuodet(teksti) {
  const tulos = [];
  for (const m of String(teksti).matchAll(/(?<![\d])(\d{4})(?![\d])(?!0?-luv)/g)) {
    const v = Number(m[1]);
    if (v < 1000 || v > 2099) continue;
    if (/\bei\s*$/i.test(String(teksti).slice(Math.max(0, m.index - 4), m.index))) continue;
    tulos.push(v);
  }
  return tulos;
}

/** Yksi nosto: { id, nimi, teksti, vuodet? (jaksojen vuosirivit järjestyksessä), jaksollinen?, tiukka? (koko nimi ensimmäisessä virkkeessä) }. */
export function tarkista({ id, nimi, teksti, vuodet, jaksollinen = false, tiukka = false }) {
  const rikkeet = [];
  const virke = ensimmainenVirke(teksti);
  const nimiOk = tiukka ? virke.toLowerCase().includes(String(nimi).toLowerCase()) : virke.toLowerCase().includes(nimenVarsi(nimi));
  if (!nimiOk || SUHTEELLINEN_ALKU.some((r) => r.test(virke))) rikkeet.push('alku');
  if (ISOISA.test(teksti)) rikkeet.push('isoisa');
  const vuodetTekstissa = sanotutVuodet(teksti);
  if (vuodetTekstissa.some((v, i) => i > 0 && v < vuodetTekstissa[i - 1])) rikkeet.push('jarjestys');
  if (merkkeja(teksti) > PITUUS_MAX) rikkeet.push('pituus');
  if (jaksollinen) {
    const rivit = (vuodet ?? []).map((v) => Number(v.vuosi));
    const johdetut = (JOHDETUT_RIVIT[id] ?? []).map(Number);
    const puuttuu = [...new Set(vuodetTekstissa)].some((v) => !rivit.includes(v));
    const haamu = rivit.some((v) => !vuodetTekstissa.includes(v) && !johdetut.includes(v));
    const jarjestysRivit = rivit.some((v, i) => i > 0 && v < rivit[i - 1]);
    if (puuttuu || haamu || jarjestysRivit) rikkeet.push('rivit');
  }
  return rikkeet;
}

const HETKI_ALKUJEN = ['Curie 1898', 'Lavoisier 1780', 'Pasteur 1862', 'Eiffel-torni 1888', 'Bastilji 1789', 'Lumière 1895'];
const KADONNEET_VANHALLA = ['Grand Châtelet', 'Temple-torni', 'Trocadéron palatsi', 'Galerie des Machines'];
const JUTUT_C = ['Riemukaari', 'Concorden aukio', 'Luxembourgin puisto', 'Sacré-Cœur', 'Panthéon', 'Notre-Dame', 'Tour Saint-Jacques',
  'Saint-Eustache', 'Pompidou-keskus', 'Place des Vosges', 'Invalidit', 'Petit Palais', 'Tour Montparnasse', 'Metro 1900'];
const TARINAPAIKAT_D = ['Bizet 1875', 'Kirahvi 1827', 'Bukinistit 1859', 'Patonki 1994', 'Vrain-Lucas', 'Monet 1874', 'Piiritys 1870',
  'Notre-Dame 2019', 'Piaf ja Django'];

/** Jaksollisen noston luettu leipäteksti: nimi-, esittely- ja isoisäjaksot eivät kuulu (natiivi NostoJaksot.IlmanIsoisaa). */
export const luettavatJaksot = (n) => n.jaksot.filter((j) => j.osa !== 'nimi' && j.osa !== 'esittely' && j.aani !== 'isoisa');

/** Pariisin 46 nostoa: A 13 jaksollista, B 4 kadonnutta, C 14 nähtävyysjuttua, D 9 tarinapaikkaa, F 6 historian hetkeä. */
export async function keraaPariisinNostot(juuri = REPO) {
  const imp = (p) => import(pathToFileURL(path.join(juuri, 'js', 'packs', p)).href);
  const fra = await imp('fokuskohteet-fra.js');
  const eur = await imp('monumentit-eurooppa.js');
  const nj = (await imp('nahtavyysjutut.js')).NAHTAVYYSJUTUT.pariisi;
  const hetket = (await imp('historian-hetket.js')).HISTORIAN_HETKET;
  const tulos = [];
  const jaksolliset = [...fra.FOKUSKOHTEET_FRA, ...(eur.EUROOPAN_KADONNEET.FRA ?? [])].filter((n) => Array.isArray(n.jaksot));
  for (const n of jaksolliset) {
    const j = luettavatJaksot(n);
    tulos.push({ id: n.id, ryhma: 'A', nimi: n.nimi, teksti: j.map((x) => x.teksti).join('\n\n'), vuodet: j.flatMap((x) => x.vuodet ?? []), jaksollinen: true, tiukka: true });
  }
  const lisaa = (ryhma, nimet) => {
    for (const nimi of nimet) {
      const e = nj[nimi];
      if (!e) throw new Error(`nähtävyysjuttu puuttuu: ${nimi}`);
      tulos.push({ id: `${ryhma.toLowerCase()}:${nimi}`, ryhma, nimi, teksti: e.teksti });
    }
  };
  lisaa('B', KADONNEET_VANHALLA);
  lisaa('C', JUTUT_C);
  lisaa('D', TARINAPAIKAT_D);
  for (const alku of HETKI_ALKUJEN) {
    const h = hetket.find((x) => String(x.otsikko).startsWith(alku));
    if (!h) throw new Error(`historian hetki puuttuu: ${alku}`);
    tulos.push({ id: `f:${alku}`, ryhma: 'F', nimi: alku, teksti: h.teksti });
  }
  return tulos;
}

export async function laskeRikkeet(juuri = REPO) {
  const nostot = await keraaPariisinNostot(juuri);
  return nostot.map((n) => ({ id: n.id, ryhma: n.ryhma, nimi: n.nimi, merkkeja: merkkeja(n.teksti), rikkeet: tarkista(n) }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--juuri');
  const juuri = i > 0 ? path.resolve(process.argv[i + 1]) : REPO;
  const rivit = await laskeRikkeet(juuri);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ nostoja: rivit.length, nostot: Object.fromEntries(rivit.filter((r) => r.rikkeet.length).map((r) => [r.id, { ryhma: r.ryhma, merkkeja: r.merkkeja, rikkeet: r.rikkeet }])) }, null, 2));
  } else {
    for (const r of rivit) console.log(`${r.ryhma}\t${r.id}\t${r.merkkeja}\t${r.rikkeet.join(',') || '-'}`);
    const yht = Object.fromEntries(RIKKEET.map((k) => [k, rivit.filter((r) => r.rikkeet.includes(k)).length]));
    console.log(`\nNostoja ${rivit.length}; rikkeitä: ${JSON.stringify(yht)}`);
  }
}
