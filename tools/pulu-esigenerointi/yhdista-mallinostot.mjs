// Kohdekartan mallinostojen kohdat (kohdekartta:<kaupunki>:<nimi>) Pulun v2-paketteihin (PK 9.11.2026; OMISTAJAN PÄÄTÖS 16.23).
//   node tools/pulu-esigenerointi/yhdista-mallinostot.mjs <MALLINOSTOT-kansio> <v2-kansio> <ulos-kansio>
// <v2-kansio>: ämpärin nykyiset pulu/vastaukset/v2/<ISO3>.json ja maat.json (sellaisenaan).
// <ulos-kansio>/pulu/vastaukset/<PULU_VERSIO, oletus v3>/: muuttuneiden maiden paketit (vanhat kohdat tavulleen sisällöltään ennallaan + uudet kohdat)
// ja maat.json, jossa vain näiden maiden versio vaihtuu. Uusi kohta ei saa korvata vanhaa (kaatuu).
// Natiivi: PuluChat.Lahteet NahtavyysLahde (keskikohde = kohdenoston tunnus, paketti = kohteen kaupungin maa).
import fs from 'node:fs';
import path from 'node:path';

const [, , kansio, vanhat, ulosJuuri] = process.argv;
if (!ulosJuuri) { console.error('käyttö: node yhdista-mallinostot.mjs <MALLINOSTOT> <v2> <ulos>'); process.exit(2); }
const lue = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const syote = lue(path.join(kansio, 'syote.json'));
const v1 = lue(path.join(kansio, 'vaihe1.json'));
const v2 = lue(path.join(kansio, 'vaihe2.json'));
const maaOf = Object.fromEntries(syote.map((k) => [k.kohta, k.maa]));

const uudet = {};
for (const x of v1) {
  const m = maaOf[x.kohde];
  if (!m) throw new Error('kohta ilman maata: ' + x.kohde);
  const k = ((uudet[m] ??= {})[x.kohde] ??= { kysymykset: [], lisaa: {} });
  k.kysymykset.push({ kysymys: x.kysymys, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) });
}
let nV2 = 0;
for (const x of v2) {
  const k = uudet[maaOf[x.kohde]]?.[x.kohde];
  if (!k) throw new Error('linkki ilman kohtaa: ' + x.kohde);
  k.lisaa[x.kasite.toLowerCase()] = { kasite: x.kasite, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) };
  nV2 += 1;
}

const ulos = path.join(ulosJuuri, 'pulu', 'vastaukset', process.env.PULU_VERSIO ?? 'v3');   // uusi polku joka muutoksella (Raamattu 11.26)
fs.mkdirSync(ulos, { recursive: true });
const hakemisto = lue(path.join(vanhat, 'maat.json'));
const luotu = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const versio = luotu.replace(/[^0-9]/g, '').slice(0, 12);
for (const m of Object.keys(uudet).sort()) {
  const vanhaTeksti = fs.readFileSync(path.join(vanhat, `${m}.json`), 'utf8');
  const p = JSON.parse(vanhaTeksti);
  // PULU_KORVAA=1 (PK 10.11.2026, lähdetarkistuksen korjaukset): olemassa olevan kohdan saa korvata korjatulla; muut vanhat ennallaan.
  const korvaa = process.env.PULU_KORVAA === '1';
  const vertailu = { ...p.kohdat };
  if (korvaa) for (const kohta of Object.keys(uudet[m])) delete vertailu[kohta];
  const ennen = JSON.stringify(vertailu);
  let korvattu = 0;
  if (p.maa !== m) throw new Error(`${m}: paketin maa ${p.maa}`);
  let lisatty = 0;
  for (const [kohta, k] of Object.entries(uudet[m])) {
    const vanha = p.kohdat[kohta];
    if (vanha && !korvaa) throw new Error(`${m}: ${kohta} on jo paketissa`);
    if (vanha) { korvattu += 1; lisatty -= vanha.kysymykset.length + Object.keys(vanha.lisaa ?? {}).length; }
    p.kohdat[kohta] = k;
    lisatty += k.kysymykset.length + Object.keys(k.lisaa).length;
  }
  // Vanhat kohdat ennallaan: poista uudet ja vertaa.
  const tarkistus = { ...p.kohdat };
  for (const kohta of Object.keys(uudet[m])) delete tarkistus[kohta];
  if (JSON.stringify(tarkistus) !== ennen) throw new Error(`${m}: vanhat kohdat muuttuivat`);
  p.vastauksia = (p.vastauksia ?? 0) + lisatty;
  p.luotu = luotu;
  if (!korvaa) p[process.env.PULU_MERKINTA ?? 'kohdekarttaNostot'] = { lisatty: luotu, kohdat: Object.keys(uudet[m]) };
  else (p.korjaukset ??= []).push({ korjattu: luotu, kohdat: Object.keys(uudet[m]) });   // HETKET 10.11.: PULU_MERKINTA=hetket (ei ylikirjoita v3/v4:n merkintää)
  fs.writeFileSync(path.join(ulos, `${m}.json`), JSON.stringify(p));
  hakemisto.maat[m] = versio;
  console.log(`${m}: +${Object.keys(uudet[m]).length} kohtaa (${Object.keys(uudet[m]).join(', ')}), +${lisatty} vastausta, korvattu ${korvattu}, versio ${versio}`);
}
fs.writeFileSync(path.join(ulos, 'maat.json'), JSON.stringify(hakemisto, null, 1));
console.log(`${v1.length} kysymysvastausta, ${nV2} linkkivastausta → ${ulos}`);
