/*
 * Täydentää olemassa olevia kuvakortteja: lisäkuvia pinoon ja
 * puuttuva vanha vedos kortin kärkeen.
 *
 *   node tools/lisaa-kuvapinoon.mjs <ehdotukset.json> [--kuiva]
 *
 * Omistajan toive: "Matkakirjassa mainitut näkymät ja asiat olisi kiva
 * saada kuvin matkakirjan kuviin, joita voi siis olla enemmän kuin
 * kaksi." Kortin `lisat`-kenttä (v183) ottaa vastaan listan kuvia
 * vanhan valokuvan ja nykypäivän väliin.
 *
 * Ehdotustiedosto on lista, jossa kullakin kaupungilla on `id` ja
 * jompikumpi tai molemmat:
 *
 *   { "id": "doha",
 *     "vanha": { tiedosto, vuosi, lahde, selite },      // kortin kärki
 *     "ehdotukset": [ { tiedosto, vuosi, lahde, selite } ] }  // lisat
 *
 * `vanha` kirjoittaa kortin omat kentät (tiedosto/vuosi/lahde/selite),
 * ja se on tarkoitettu VAIN kortille, jolta vanha vedos puuttuu:
 * olemassa olevaa ei korvata, vaan kortti ohitetaan äänekkäästi.
 * Kokonaan uuden laudan kortit luo tools/kirjoita-kuvakortit.mjs.
 *
 * Ehdotukseen ei luoteta. Jokainen tiedosto tarkistetaan Commonsista
 * ennen kirjoittamista:
 *  1. Tiedosto on olemassa. Keksitty tiedostonimi näyttää oikealta.
 *  2. Vähintään 1200 pikseliä leveä (omistajan linjaus).
 *  3. Vapaa lisenssi, ei ND-ehtoa.
 *  4. Ei jo kortissa. Sama kuva kahdesti pinossa on virhe, ei rikkaus.
 *  5. Vanhaksi merkitty kuva on oikeasti vanha. Tiedostonimi ei kerro
 *     ikää — ks. tools/kuvan-ika.mjs.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VANHA_RAJA, kuvanVuosi } from './kuvan-ika.mjs';

// Noden fetch ei lue HTTPS_PROXYa; ks. tools/hae-radiot.mjs.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');
const lahde = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!lahde) { console.error('Anna ehdotustiedosto.'); process.exit(1); }

const RAJA = 1200;
const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });
const siivoa = (s) => (s?.value ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

async function hae(osoite, yrityksia = 5) {
  for (let i = 0; i < yrityksia; i++) {
    try {
      const v = await fetch(osoite, { headers: { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' } });
      if (v.ok) return v.json();
      if (v.status !== 429 && v.status < 500) { console.log(`  HTTP ${v.status}`); return null; }
    } catch (virhe) {
      console.log(`  yhteys katkesi (${virhe?.cause?.code ?? virhe?.name ?? '?'})`);
    }
    await nuku(2500 * (i + 1));
  }
  return null;
}

/** Koko ja lisenssi nipuittain: Commons ottaa 50 nimeä kerralla. */
async function tarkista(nimet) {
  const ulos = new Map();
  for (let i = 0; i < nimet.length; i += 50) {
    const pala = nimet.slice(i, i + 50).map((t) => `File:${t}`);
    const data = await hae('https://commons.wikimedia.org/w/api.php?action=query'
      + '&prop=imageinfo&iiprop=size|extmetadata'
      + '&iiextmetadatafilter=LicenseShortName|DateTimeOriginal|ImageDescription'
      + `&titles=${encodeURIComponent(pala.join('|'))}&format=json`);
    if (!data) continue;
    const polku = new Map();
    for (const r of data?.query?.normalized ?? []) polku.set(r.from, r.to);
    for (const r of data?.query?.redirects ?? []) polku.set(r.from, r.to);
    const sivut = new Map();
    for (const s of Object.values(data?.query?.pages ?? {})) sivut.set(s.title, s);
    for (const nimi of pala) {
      let avain = nimi;
      for (let k = 0; k < 4 && polku.has(avain); k++) avain = polku.get(avain);
      ulos.set(nimi.replace(/^File:/, ''), sivut.get(avain)?.imageinfo?.[0] ?? null);
    }
    await nuku(500);
  }
  return ulos;
}

// --- kerää ja tarkista ---------------------------------------------------------

const ehdotukset = JSON.parse(readFileSync(lahde, 'utf8'));
const kaikkiNimet = [...new Set(ehdotukset.flatMap((k) => [
  k.vanha?.tiedosto,
  ...(k.ehdotukset ?? []).map((e) => e.tiedosto),
].filter(Boolean)))];
console.log(`${ehdotukset.length} kaupunkia, ${kaikkiNimet.length} eri kuvaa tarkistettavana\n`);
const tiedot = await tarkista(kaikkiNimet);

/*
 * Laudat samassa järjestyksessä kuin js/sisaltotaulut.js:n KAIKKI_VALOKUVAT, ja
 * samasta syystä: uusi valokuvapaketti on lisättävä molempiin, tai
 * tämä työkalu ei löydä sen kaupunkeja. Järjestys ratkaisee myös
 * päällekkäisyyden — pelissä myöhempi levitys voittaa, joten täällä
 * otetaan viimeinen osuma.
 */
const PAKETIT = [
  ['africa', 'africa-valokuvat.js', 'AFRICA_VALOKUVAT'],
  ['europe', 'europe-valokuvat.js', 'EUROPE_VALOKUVAT'],
  ['asia', 'asia-valokuvat.js', 'ASIA_VALOKUVAT'],
  ['asia-lisat', 'asia-lisat-valokuvat.js', 'ASIA_LISAT_VALOKUVAT'],
  ['northamerica', 'northamerica-valokuvat.js', 'NORTHAMERICA_VALOKUVAT'],
  ['southamerica', 'southamerica-valokuvat.js', 'SOUTHAMERICA_VALOKUVAT'],
  ['oceania', 'oceania-valokuvat.js', 'OCEANIA_VALOKUVAT'],
];
const LAUDAT = [];
for (const [lauta, tiedostonimi, vientinimi] of PAKETIT) {
  const moduuli = await import(`../js/packs/${tiedostonimi}`);
  LAUDAT.push([lauta, moduuli[vientinimi], tiedostonimi]);
}

/** Missä kortissa kaupunki on, mitkä tiedostot siinä jo ovat, onko vanha. */
function kortti(id) {
  let loytyi = null;
  for (const [lauta, taulu, tiedostonimi] of LAUDAT) {
    const v = taulu[id];
    if (!v) continue;
    const jo = new Set([v.tiedosto, v.uusi?.tiedosto, ...(v.lisat ?? []).map((k) => k.tiedosto)].filter(Boolean));
    loytyi = { lauta, tiedostonimi, jo, onVanha: Boolean(v.tiedosto), onLisat: Boolean(v.lisat?.length) };
  }
  return loytyi;
}

const ND = /\bND\b|NoDeriv/i;

/** Yhteiset ehdot: olemassaolo, leveys, lisenssi, ei jo kortissa. */
function tarkasta(kuva, paikka, id, kohta, hylatyt) {
  const info = tiedot.get(kuva.tiedosto);
  const lisenssi = siivoa(info?.extmetadata?.LicenseShortName);
  if (!info) { hylatyt.push(`${id}/${kohta}: tiedostoa ei ole — ${kuva.tiedosto}`); return null; }
  if (info.width < RAJA) { hylatyt.push(`${id}/${kohta}: vain ${info.width} px — ${kuva.tiedosto}`); return null; }
  if (ND.test(lisenssi)) { hylatyt.push(`${id}/${kohta}: ND-lisenssi (${lisenssi}) — ${kuva.tiedosto}`); return null; }
  if (paikka.jo.has(kuva.tiedosto)) { hylatyt.push(`${id}/${kohta}: jo kortissa — ${kuva.tiedosto}`); return null; }
  /*
   * Vanhan vedoksen ikä luetaan lähteestä, ei ehdotuksen `vuosi`-
   * kentästä: se on kortin näkyvä teksti, jonka hakija on kirjoittanut
   * itse. Tuntematon ikä hylätään — vanhaksi merkitty kuva, jonka
   * iästä lähde vaikenee, on juuri se tapaus jossa erehdys ei näy.
   */
  if (kohta === 'vanha') {
    const vuosi = kuvanVuosi({
      paivays: siivoa(info.extmetadata?.DateTimeOriginal),
      kuvaus: siivoa(info.extmetadata?.ImageDescription),
      tiedosto: kuva.tiedosto,
    });
    if (vuosi === null) { hylatyt.push(`${id}/vanha: Commons ei kerro ikää — ${kuva.tiedosto}`); return null; }
    if (vuosi > VANHA_RAJA) { hylatyt.push(`${id}/vanha: Commons sanoo ${vuosi} — ${kuva.tiedosto}`); return null; }
  }
  paikka.jo.add(kuva.tiedosto);
  return {
    tiedosto: kuva.tiedosto,
    vuosi: kuva.vuosi ?? null,
    lahde: kuva.lahde ?? kuva.lisenssi ?? `Commons (${lisenssi})`,
    selite: kuva.selite,
  };
}

const hyvaksytyt = new Map();
const hylatyt = [];
for (const k of ehdotukset) {
  const paikka = kortti(k.id);
  if (!paikka) { hylatyt.push(`${k.id}: ei valokuvakorttia`); continue; }
  let vanha = null;
  if (k.vanha) {
    // Olemassa olevaa vedosta ei korvata hiljaa.
    if (paikka.onVanha) hylatyt.push(`${k.id}/vanha: kortilla on jo vanha vedos`);
    else vanha = tarkasta(k.vanha, paikka, k.id, 'vanha', hylatyt);
  }
  const kelpaa = [];
  for (const e of k.ehdotukset ?? []) {
    const kuva = tarkasta(e, paikka, k.id, 'lisa', hylatyt);
    if (kuva) kelpaa.push(kuva);
  }
  /*
   * Uusi `lisat:`-lohko kortille, jolla se jo on, tekisi tiedostoon
   * kaksi samaa avainta: jälkimmäinen voittaa ja uudet kuvat katoavat
   * äänettömästi. Mieluummin selvä hylkäys kuin hiljainen katoaminen.
   */
  if (kelpaa.length && paikka.onLisat) {
    hylatyt.push(`${k.id}/lisa: kortilla on jo lisat-lohko, yhdistäminen ei ole toteutettu (${kelpaa.length} kuvaa)`);
    kelpaa.length = 0;
  }
  if (vanha || kelpaa.length) {
    hyvaksytyt.set(k.id, { lauta: paikka.lauta, tiedostonimi: paikka.tiedostonimi, vanha, kuvat: kelpaa });
  }
}

const kpl = [...hyvaksytyt.values()].reduce((s, v) => s + (v.vanha ? 1 : 0) + v.kuvat.length, 0);
console.log(`${kpl} kuvaa hyväksyttiin ${hyvaksytyt.size} kaupunkiin.`);
// Hylätyt aina näkyviin: hiljainen karsinta näyttäisi täydeltä listalta.
if (hylatyt.length) {
  console.log(`\n${hylatyt.length} hylättyä:`);
  for (const h of hylatyt) console.log(`  ${h}`);
}
if (kuiva) process.exit(0);

// --- kirjoita paketteihin ------------------------------------------------------

const lainaa = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/*
 * Pitkä merkkijono katkotaan samaan tapaan kuin muuallakin paketeissa:
 * rivi ei ylitä 80:tä merkkiä, ja jatko liitetään plussalla.
 */
function katko(teksti, sisennys) {
  const tila = 78 - sisennys.length - 6;
  const sanat = teksti.split(' ');
  const rivit = [];
  let nyt = '';
  for (const s of sanat) {
    if (nyt && (nyt.length + s.length + 1) > tila) { rivit.push(nyt); nyt = s; } else nyt = nyt ? `${nyt} ${s}` : s;
  }
  if (nyt) rivit.push(nyt);
  // Yhdelle riville mahtuva selite ei saa jatkovälilyöntiä perään.
  return rivit
    .map((r, i) => (i === 0
      ? lainaa(rivit.length === 1 ? r : `${r} `)
      : `${sisennys}  + ${lainaa(i === rivit.length - 1 ? r : `${r} `)}`))
    .join('\n');
}

/** Yhden kuvan kentät ilman ympäröivää oliota. */
function kentat(kuva, sisennys) {
  const rivit = [`${sisennys}tiedosto: ${lainaa(kuva.tiedosto)},`];
  if (kuva.vuosi) rivit.push(`${sisennys}vuosi: ${lainaa(kuva.vuosi)},`);
  rivit.push(`${sisennys}lahde: ${lainaa(kuva.lahde)},`);
  rivit.push(`${sisennys}selite: ${katko(kuva.selite, sisennys)},`);
  return rivit.join('\n');
}

function lohko(kuvat, sisennys) {
  const rivit = [`${sisennys}lisat: [`];
  for (const k of kuvat) {
    rivit.push(`${sisennys}  {`);
    rivit.push(kentat(k, `${sisennys}    `));
    rivit.push(`${sisennys}  },`);
  }
  rivit.push(`${sisennys}],`);
  return rivit.join('\n');
}

for (const [lauta, tiedosto] of PAKETIT) {
  // Kirjoitetaan vain ne paketit, joihin tuli jotain.
  if (![...hyvaksytyt.values()].some((v) => v.lauta === lauta)) continue;
  const polku = join(JUURI, 'js', 'packs', tiedosto);
  let teksti = readFileSync(polku, 'utf8');
  let vanhoja = 0;
  let pinoja = 0;
  for (const [id, v] of hyvaksytyt) {
    if (v.lauta !== lauta) continue;
    /*
     * Ankkuriksi kaupungin oman tietueen aloitusrivi, ei `uusi:`- tai
     * `lisat:`-riviä: ne ovat sisäkkäisiä, ja niiden sisään
     * kirjoittaminen tekisi kuvasta nykypäivän kuvan alikohteen.
     * Kaupungit ovat paketissa kahden välilyönnin sisennyksellä, joten
     * ankkuri sidotaan siihen — muuten sama nimi sisemmällä tasolla
     * voisi osua ensin.
     */
    const avain = new RegExp(`(\\n(  )${id}: \\{\\n)`);
    const osuma = teksti.match(avain);
    if (!osuma) { console.log(`  ${id}: tietuetta ei löydy ${tiedosto}:sta`); continue; }
    const sisennys = `${osuma[2]}  `;
    /*
     * Vanha vedos ensin ja lisät sen jälkeen, samassa järjestyksessä
     * kuin kortti luetaan: vanha, lisat, uusi.
     */
    const osat = [];
    if (v.vanha) { osat.push(kentat(v.vanha, sisennys)); vanhoja += 1; }
    if (v.kuvat.length) { osat.push(lohko(v.kuvat, sisennys)); pinoja += 1; }
    teksti = teksti.replace(osuma[0], `${osuma[0]}${osat.join('\n')}\n`);
  }
  writeFileSync(polku, teksti);
  console.log(`${tiedosto}: ${vanhoja} vanhaa vedosta, ${pinoja} kaupunkia sai lisäkuvia`);
}
