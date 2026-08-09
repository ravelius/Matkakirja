/*
 * Kokoaa kuuden kirjoittajan maastotekstit yhdeksi paketiksi.
 *
 *   node tools/kokoa-maastotekstit.mjs [--kuiva]
 *
 * Lukee tools/maastotekstit-*.json ja kirjoittaa
 * js/packs/maasto-tekstit.js. Lähdetiedostot kuuluvat kirjoittajille
 * eikä niihin kosketa: jokainen koostamisen aikana tehty muutos on
 * tässä tiedostossa nimettynä ja perusteltuna, jotta seuraava ajo
 * tuottaa saman tuloksen ja jotta muutoksen voi purkaa.
 *
 * Kolme asiaa, jotka tämä tekee lukemisen lisäksi:
 *
 *  1. KAKSOISAVAIMET. 'Ural' on sekä joki että vuoristo, ja kaksi
 *     kirjoittajaa kirjoitti Uraljoesta erikseen (Aasia ja Eurooppa).
 *     JS ei valita samasta avaimesta kahdesti vaan pitää jälkimmäisen
 *     — siis sen, joka sattuu olemaan alempana. Tässä valinta on
 *     nimetty: ks. VALINNAT.
 *  2. KORJAUKSET. Lainausten tarkistuksessa (tools/tarkista-lainaukset.mjs)
 *     löytyi kohtia, joissa suomennos poikkesi lähteestä. Korjaukset
 *     ovat merkkijonon vaihtoja, jotka epäonnistuvat äänekkäästi jos
 *     lähdeteksti muuttuu.
 *  3. MITTAUS. Ohjeen docs/maastotekstit-ohje.md luvun 9 tarkistus
 *     ajetaan jokaiselle kohteelle ennen kirjoittamista.
 *
 * Lainausten paikkansapitävyyttä tämä EI tarkista. Se on oma
 * työkalunsa, koska se vaatii verkon: tools/tarkista-lainaukset.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KOHDE = 'js/packs/maasto-tekstit.js';
const VIENTINIMI = 'MAASTO_TEKSTIT';

const LAHTEET = [
  'tools/maastotekstit-joet-1.json',
  'tools/maastotekstit-joet-2.json',
  'tools/maastotekstit-joet-3.json',
  'tools/maastotekstit-joet-4.json',
  'tools/maastotekstit-jarvet.json',
  'tools/maastotekstit-vuoret.json',
];

/*
 * Kaksi kirjoittajaa kirjoitti saman kohteen. Kumpi jää.
 */
const VALINNAT = {
  // Molemmat versiot ovat kelvollisia. Aasian osuuden Ural sai
  // D. M. Wallacen lainauksen kasakoista; Euroopan osuuden versio on
  // lainaukseton. Lainaus on tämän työn koko tarkoitus, joten se jää.
  'joet/Ural': 'tools/maastotekstit-joet-1.json',
};

/*
 * Lainaus, joka poikkesi lähteestään. Vasemmalla se, mitä JSONissa
 * lukee, oikealla se, mitä lähde sanoo. Perustelu on kommentissa.
 * Tyhjä 'uusi' poistaisi lainauksen kokonaan — sellaista ei tällä
 * erää ole, koska kaikki 130 lainausta löytyivät lähteistään.
 */
const KORJAUKSET = [
  {
    kohde: 'joet/Irtysh',
    vanha: 'kuin joku olisi naulannut arkkuja veden alla',
    uusi: 'kuin joku olisi naulannut arkkua veden alla',
    // Tšehov kirjoittaa yhdestä arkusta: "as though someone were
    // nailing up a coffin under the water". Monikko oli suomentajan.
  },
  {
    kohde: 'joet/Amu Darya',
    vanha: 'ei edes Niili, Mubarek, siunattu. Ja minun on myönnettävä',
    uusi: 'ei edes Niili, Mubarek, siunattu. — Ja minun on myönnettävä',
    // Vámbéryllä väliin jää kolme virkettä. Ohjeen luku 6.3: poistoja
    // saa tehdä, mutta ne on merkittävä.
  },
];

const kuiva = process.argv.includes('--kuiva');
const lue = (p) => JSON.parse(readFileSync(join(JUURI, p), 'utf8'));

// --- kerääminen ----------------------------------------------------------------

const kohteet = new Map(); // 'laji/avain' -> { laji, avain, mista, data }
const varoitukset = [];

for (const tiedosto of LAHTEET) {
  const data = lue(tiedosto);
  for (const [laji, joukko] of Object.entries(data)) {
    if (laji.startsWith('_')) continue; // _ohje ja _kommentit ovat kirjoittajan muistiinpanoja
    for (const [avain, kohde] of Object.entries(joukko)) {
      const id = `${laji}/${avain}`;
      const oli = kohteet.get(id);
      if (oli) {
        const voittaja = VALINNAT[id];
        if (!voittaja) {
          varoitukset.push(`${id}: kaksi versiota (${oli.mista}, ${tiedosto}) eikä valintaa`);
          continue;
        }
        if (voittaja === tiedosto) kohteet.set(id, { laji, avain, mista: tiedosto, data: kohde });
        continue;
      }
      kohteet.set(id, { laji, avain, mista: tiedosto, data: kohde });
    }
  }
}

// --- korjaukset ----------------------------------------------------------------

for (const k of KORJAUKSET) {
  const kohde = kohteet.get(k.kohde);
  if (!kohde) { varoitukset.push(`korjaus osoittaa kohteeseen, jota ei ole: ${k.kohde}`); continue; }
  const pala = kohde.data.kappaleet.find((p) => p.lainaus?.includes(k.vanha));
  if (!pala) { varoitukset.push(`korjaus ei osunut: ${k.kohde} — "${k.vanha}"`); continue; }
  pala.lainaus = pala.lainaus.replace(k.vanha, k.uusi);
}

// --- mittaus (docs/maastotekstit-ohje.md luku 9) --------------------------------

const moitteet = [];
for (const [id, k] of kohteet) {
  const p = k.data.kappaleet ?? [];
  const t = p.filter((x) => x.teksti);
  const l = p.filter((x) => x.lainaus);
  const ku = p.filter((x) => x.tiedosto);
  const yht = t.reduce((s, x) => s + x.teksti.length, 0);
  const m = [];
  if (p.length < 4 || p.length > 6) m.push(`palasia ${p.length}`);
  if (!p[0]?.teksti) m.push('ei ala tekstillä');
  if (yht > 700) m.push(`teksti ${yht}`);
  if (t.some((x) => x.teksti.length > 300)) m.push('pitkä kappale');
  if (l.some((x) => x.lainaus.length > 280)) m.push('pitkä lainaus');
  if (ku.some((x) => (x.selite ?? '').length > 220)) m.push('pitkä selite');
  if (ku.length > 2) m.push(`kuvia ${ku.length}`);
  if (p.some((x) => x.kuva)) m.push('kenttä kuva');
  if (p.some((x) => x.tiedosto && !x.lahde)) m.push('kuvalta puuttuu lahde');
  if (l.some((x) => !(x.teos && x.kuka && x.vuosi && x.linkki))) m.push('lainaus vajaa');
  if (p.some((x) => JSON.stringify(x).includes('!'))) m.push('huutomerkki');
  for (const kentta of ['avain', 'wiki', 'selitys']) {
    if (kentta in k.data) m.push(`kielletty kenttä ${kentta}`);
  }
  if (m.length) moitteet.push(`${id}: ${m.join('; ')}`);
}

// --- yhteenveto ----------------------------------------------------------------

const lajit = {};
let lainauksia = 0;
let kuvia = 0;
const tiedostot = new Set();
for (const k of kohteet.values()) {
  lajit[k.laji] = (lajit[k.laji] ?? 0) + 1;
  for (const p of k.data.kappaleet) {
    if (p.lainaus) lainauksia++;
    if (p.tiedosto) { kuvia++; tiedostot.add(p.tiedosto); }
  }
}
console.log(`${kohteet.size} kohdetta: ${Object.entries(lajit).map(([a, b]) => `${b} ${a}`).join(', ')}`);
console.log(`${lainauksia} lainausta, ${kuvia} kuvaa (${tiedostot.size} eri tiedostoa)`);
if (varoitukset.length) {
  console.log(`\n${varoitukset.length} varoitusta:`);
  for (const v of varoitukset) console.log(`  ${v}`);
}
if (moitteet.length) {
  console.log(`\n${moitteet.length} huomautusta mittauksesta:`);
  for (const m of moitteet) console.log(`  ${m}`);
} else {
  console.log('mittaus puhdas');
}
if (kuiva) process.exit(0);
if (varoitukset.length) {
  console.error('\nvaroituksia on — ei kirjoitettu.');
  process.exit(1);
}

// --- kirjoitus -----------------------------------------------------------------

const lainaa = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** Pitkä teksti katkotaan riveiksi kuten muissakin paketeissa. */
function katko(teksti, sisennys) {
  const tila = 78 - sisennys.length - 6;
  const rivit = [];
  let nyt = '';
  for (const sana of String(teksti).split(' ')) {
    if (nyt && (nyt.length + sana.length + 1) > tila) { rivit.push(nyt); nyt = sana; } else nyt = nyt ? `${nyt} ${sana}` : sana;
  }
  if (nyt) rivit.push(nyt);
  return rivit
    .map((r, i) => (i === 0
      ? lainaa(rivit.length === 1 ? r : `${r} `)
      : `${sisennys}  + ${lainaa(i === rivit.length - 1 ? r : `${r} `)}`))
    .join('\n');
}

/* Kenttien järjestys on sama kuin mallissa, jotta tiedostot lukee rinnakkain. */
const JARJESTYS = ['teksti', 'lainaus', 'kuka', 'teos', 'vuosi', 'suomennos', 'linkki', 'tiedosto', 'selite', 'lahde'];

function palaRivit(pala, sisennys) {
  const r = [];
  for (const kentta of JARJESTYS) {
    if (!(kentta in pala)) continue;
    const arvo = pala[kentta];
    if (typeof arvo === 'number') { r.push(`${sisennys}${kentta}: ${arvo},`); continue; }
    if (kentta === 'teksti' || kentta === 'lainaus' || kentta === 'selite') {
      r.push(`${sisennys}${kentta}: ${katko(arvo, sisennys)},`);
    } else {
      r.push(`${sisennys}${kentta}: ${lainaa(arvo)},`);
    }
  }
  return r.join('\n');
}

const LAJIJARJESTYS = ['joet', 'jarvet', 'vuoret'];
const osat = [];
for (const laji of LAJIJARJESTYS) {
  const omat = [...kohteet.values()].filter((k) => k.laji === laji)
    .sort((a, b) => a.avain.localeCompare(b.avain, 'fi'));
  if (!omat.length) continue;
  const rivit = [`  ${laji}: {`];
  for (const k of omat) {
    rivit.push('');
    rivit.push(`    ${/^[A-Za-z_$][\w$]*$/.test(k.avain) ? k.avain : lainaa(k.avain)}: {`);
    rivit.push('      kappaleet: [');
    for (const p of k.data.kappaleet) {
      rivit.push('        {');
      rivit.push(palaRivit(p, '          '));
      rivit.push('        },');
    }
    rivit.push('      ],');
    rivit.push('    },');
  }
  rivit.push('  },');
  osat.push(rivit.join('\n'));
}

/*
 * VAROITUS ENNEN AJOA: js/packs/maasto-tekstit.js ei enää ole tämän
 * koostajan puhdas tuotos. v449 (#652) vaihtoi Tšadjärven ja Madeiran
 * kuvat suoraan pakettiin päivittämättä lähde-JSONeja, joten ajo
 * palauttaisi ne vanhoihin kuviin ja kumoaisi kuvaduplikaattien
 * korjauksen. Aja siis aina `git diff` ajon jälkeen ja tarkista, ettei
 * mitään muuta muuttunut kuin mitä olit muuttamassa. Todettu 9.8.2026.
 */
const sisalto = `// Maastonimien tekstit: joet, järvet ja vuoristot.
//
// Rakenne on sama kuin js/packs/maasto-tekstit-malli.js:ssä, joka on
// tämän esikuva.
//
// MALLI EI OLE PELKKÄ RAKENNE-ESIMERKKI. Se sisältää AINEISTONA
// kymmenen kuuluisimman kohteen tekstit — Niili, Amazon, Volga,
// Ganges, Jangtse, Baikal, Kaspianmeri, Himalaja, Andit ja Alpit,
// mukana kymmenen tarkistettua aikalaislainausta. Niitä ei ole tässä
// tiedostossa: koostajan lähde-JSONit jättävät ne tahallaan pois,
// koska ne ovat mallissa. Mallia EI siis saa poistaa
// "käyttämättömänä" — sen mukana katoaisi kymmenen kohdetta. Poistoa
// yritettiin 9.8.2026 sillä perusteella, ettei mikään UI-koodi
// importtaa sitä; se pitää paikkansa, mutta ei importtaa tätäkään
// tiedostoa. Maastotekstejä ei ole vielä kytketty i-ikkunaan.
//
// Ohje on docs/arkisto/maastotekstit-ohje.md. Avaimet ovat
// kaksitasoiset — laji ensin, sitten kohteen avain nimipaketista
// sellaisenaan — koska 'Ural' on sekä joki että vuoristo.
//
// ${kohteet.size} kohdetta, ${lainauksia} aikalaislainausta, ${kuvia} kuvaa.
//
// Jokainen lainaus on etsitty lähdetekstistään ja luettu sanasta
// sanaan. Ankkurit ovat tools/lainausankkurit.json:ssa ja tarkistuksen
// voi ajaa uudelleen:
//
//   NODE_USE_ENV_PROXY=1 node tools/tarkista-lainaukset.mjs
//
// Tuotettu komennolla tools/kokoa-maastotekstit.mjs kirjoittajien
// tools/maastotekstit-*.json-tiedostoista. Älä muokkaa käsin — korjaa
// lähde tai koostajan KORJAUKSET-taulu ja aja uudelleen.
export const ${VIENTINIMI} = {
${osat.join('\n')}
};
`;

writeFileSync(join(JUURI, KOHDE), sisalto);
console.log(`\nKirjoitettu ${KOHDE}: ${kohteet.size} kohdetta, ${(sisalto.length / 1024).toFixed(0)} kt.`);
