// Pulun kaupunki- ja maakohdat maiden paketteihin (PK 9.11.2026, omistajan kortti 13.51 "Kyllä").
//   node tools/pulu-esigenerointi/yhdista-kaumaa.mjs <KAUMAA-kansio> <vanhat-kansio> <ulos-kansio>
// <KAUMAA-kansio>: syote.json (kohta → maa), vaihe1.json, vaihe2.json (tarkista-era.mjs).
// <vanhat-kansio>: ämpärin nykyiset pulu/vastaukset/v1/<ISO3>.json ja maat.json (ladattu sellaisenaan).
// <ulos-kansio>/pulu/vastaukset/v1/: jokaiselle maalle paketti = vanhat kohdat + uudet kaupunki:<id>/maa:<ISO3>-kohdat
// (avaimet PuluChat.Lahteet.cs:66–69: kaupunki menee kaupungin oman maan pakettiin), ja maat.json, jossa näiden maiden versio vaihtuu.
// Vanhat kohde:/nosto:-kohdat säilyvät tavulleen sisällöltään; uusi kohta ei saa korvata vanhaa (kaatuu).
import fs from 'node:fs';
import path from 'node:path';

const [, , kansio, vanhat, ulosJuuri] = process.argv;
if (!ulosJuuri) { console.error('käyttö: node yhdista-kaumaa.mjs <KAUMAA> <vanhat> <ulos>'); process.exit(2); }
const lue = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const syote = lue(path.join(kansio, 'syote.json'));
const v1 = lue(path.join(kansio, 'vaihe1.json'));
const v2 = fs.existsSync(path.join(kansio, 'vaihe2.json')) ? lue(path.join(kansio, 'vaihe2.json')) : [];
const maaOf = Object.fromEntries(syote.map((k) => [k.kohta, k.maa]));

const uudet = {};   // maa → kohta → { kysymykset, lisaa }
let nV1 = 0, nV2 = 0;
for (const x of v1) {
  const m = maaOf[x.kohde];
  if (!m) throw new Error('kohta ilman maata: ' + x.kohde);
  const k = ((uudet[m] ??= {})[x.kohde] ??= { kysymykset: [], lisaa: {} });
  k.kysymykset.push({ kysymys: x.kysymys, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) });
  nV1 += 1;
}
for (const x of v2) {
  const k = uudet[maaOf[x.kohde]]?.[x.kohde];
  if (!k) continue;
  k.lisaa[x.kasite.toLowerCase()] = { kasite: x.kasite, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) };
  nV2 += 1;
}

const ulos = path.join(ulosJuuri, 'pulu', 'vastaukset', 'v1');
fs.mkdirSync(ulos, { recursive: true });
const hakemisto = lue(path.join(vanhat, 'maat.json'));
const luotu = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const versio = luotu.replace(/[^0-9]/g, '').slice(0, 12);
const rivit = [];
for (const m of Object.keys(uudet).sort()) {
  const vp = path.join(vanhat, `${m}.json`);
  const p = fs.existsSync(vp) ? lue(vp) : { $skeema: 'matkakirja-pulu-vastaukset/1', maa: m, sisalto: null,
    ohje: 'pulu-esigenerointi/pulu-ohje-aloitus.txt (kysymykset), pulu-ohje-jatko.txt (linkit); workerin pulunKehoteOsat natiivi',
    luotu: null, vastauksia: 0, kohdat: {} };
  if (p.maa !== m) throw new Error(`${m}: paketin maa ${p.maa}`);
  let lisatty = 0;
  for (const [kohta, k] of Object.entries(uudet[m])) {
    if (p.kohdat[kohta]) throw new Error(`${m}: ${kohta} on jo paketissa`);
    p.kohdat[kohta] = k;
    lisatty += k.kysymykset.length + Object.keys(k.lisaa).length;
  }
  p.vastauksia = (p.vastauksia ?? 0) + lisatty;
  p.luotu = luotu;
  p.kaupungitJaMaa = { lisatty: luotu, sisalto: fs.readFileSync(path.join(kansio, '..', 'data', 'VERSIO'), 'utf8').trim() };
  fs.writeFileSync(path.join(ulos, `${m}.json`), JSON.stringify(p));
  hakemisto.maat[m] = versio;
  rivit.push(`${m}: +${Object.keys(uudet[m]).length} kohtaa (${Object.keys(uudet[m]).join(' ')}), +${lisatty} vastausta${fs.existsSync(vp) ? '' : ' (UUSI PAKETTI)'}`);
}
fs.writeFileSync(path.join(ulos, 'maat.json'), JSON.stringify(hakemisto, null, 1));
console.log(rivit.join('\n'));
console.log(`yhteensä ${Object.keys(uudet).length} maata, ${nV1} kysymysvastausta, ${nV2} linkkivastausta → ${ulos}`);
