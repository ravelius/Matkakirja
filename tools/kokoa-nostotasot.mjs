// KOKOA MAITTAISET NOSTOTASOT SHARDEISTA LUETTELOON (Fable 18.9.2026,
// Raamattu PAATOKSET 34 kohta 17 d).
//
//   node tools/kokoa-nostotasot.mjs --ulos <polttokansio> --luettelo <pyramidi.json>
//
// Maittainen nostotaso poltetaan shardeina nosto-z5-z7-<ISO> ja
// nosto-z8-<ISO>, ja jokainen shardi kirjoittaa omaan pyramidi.json:iinsa
// vain oman maansa `nostotasot[ISO]`-kirjauksen (tools/generoi-
// laattapyramidi.mjs). Luettelojobi (--vain-luettelo) ei tunne maita,
// joten sen `nostotasot` on null. Tama tyokalu lukee shardien kirjaukset
// ja yhdistaa ne luetteloon: sama ISO kahdesta shardista (z5-z7 ja z8)
// yhdistetaan tasoittain (tasot, laatastot, nostot). Ilman tata peli ei
// loytaisi kohdemaan laatastoa (js/laattapyramidi.js nostotasonKirjaus)
// ja eheystarkistus vertaisi rajalaattojen summaa yhteen bittikarttaan.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const ulos = lippu('--ulos');
const polku = lippu('--luettelo');
if (!ulos || !polku) {
  console.error('kokoa-nostotasot: --ulos <kansio> ja --luettelo <pyramidi.json> ovat pakollisia');
  process.exit(2);
}
const luettelo = JSON.parse(readFileSync(polku, 'utf8'));
const koottu = {};
let shardeja = 0;
for (const nimi of readdirSync(ulos)) {
  if (!/^nosto-z[0-9z-]+-[A-Z0-9]{3}$/.test(nimi)) continue;
  const p = join(ulos, nimi, 'pyramidi.json');
  if (!existsSync(p)) continue;
  const osa = JSON.parse(readFileSync(p, 'utf8'));
  for (const [iso, k] of Object.entries(osa.nostotasot ?? {})) {
    shardeja += 1;
    const v = koottu[iso] ?? {
      versio: k.versio, maa: iso, saanto: k.saanto, tasot: [], nostot: {}, laatastot: {},
    };
    if (v.versio !== k.versio || v.saanto !== k.saanto) {
      throw new Error(`${iso}: shardien versio/saanto eroavat (${v.versio}/${v.saanto} vs ${k.versio}/${k.saanto})`);
    }
    for (const z of k.tasot ?? []) if (!v.tasot.includes(z)) v.tasot.push(z);
    Object.assign(v.laatastot, k.laatastot ?? {});
    Object.assign(v.nostot, k.nostot ?? {});
    v.tasot.sort((a, b) => a - b);
    koottu[iso] = v;
  }
}
const maita = Object.keys(koottu).length;
if (!maita) {
  console.error('kokoa-nostotasot: yhtaan nostotasot-kirjausta ei loytynyt shardeista');
  process.exit(1);
}
luettelo.nostotasot = koottu;
writeFileSync(polku, `${JSON.stringify(luettelo)}\n`);
console.log(`· nostotasot koottu: ${maita} maata ${shardeja} shardista -> ${polku}`);
