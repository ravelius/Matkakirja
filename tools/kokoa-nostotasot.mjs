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
/*
 * ÄMPÄRIN LUETTELO KANTAA SEN, MITÄ TÄMÄ AJO EI TIEDÄ (20.9.2026).
 *
 * Luettelojobi (--vain-luettelo) rakentaa luettelon tyhjästä eikä tunne
 * väriajojen `varitasot`-taulua eikä aiempien ajojen `erat`-kirjanpitoa,
 * joten ne katosivat luettelosta — 20.9.2026 yön pohja-ajossa Fable
 * joutui palauttamaan ne käsin vanhasta luettelosta ennen julkaisua.
 * Nämä kentät eivät kuulu nostoajolle, joten ne kannetaan sellaisenaan.
 *
 * `--pohja-ennallaan` on sama sääntö pohjan kentälle: pelkkä
 * nostotasoajo ei polta pohjaa, joten se ei saa myöskään väittää mitään
 * siitä, onko pohjassa rantaviiva (samana yönä nostoajo kirjoitti
 * `pohja.rantaviiva: true`, vaikka pohja on poltettu ilman rantaviivaa).
 */
const amparipolku = lippu('--ampari');
const pohjaEnnallaan = argv.includes('--pohja-ennallaan');
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
const kannetut = [];
if (amparipolku && existsSync(amparipolku)) {
  const ampari = JSON.parse(readFileSync(amparipolku, 'utf8'));
  const varitasoja = Object.keys(ampari.varitasot ?? {}).length;
  if (varitasoja && !Object.keys(luettelo.varitasot ?? {}).length) {
    luettelo.varitasot = ampari.varitasot;
    kannetut.push(`varitasot ${varitasoja} maata`);
  }
  if ((ampari.erat ?? []).length && !(luettelo.erat ?? []).length) {
    luettelo.erat = ampari.erat;
    kannetut.push(`erat ${ampari.erat.length}`);
  }
  if (pohjaEnnallaan) {
    if (ampari.pohja) luettelo.pohja = ampari.pohja;
    else delete luettelo.pohja;
    kannetut.push(`pohja ${JSON.stringify(ampari.pohja ?? null)}`);
  }
}
writeFileSync(polku, `${JSON.stringify(luettelo)}\n`);
console.log(`· nostotasot koottu: ${maita} maata ${shardeja} shardista -> ${polku}`);
if (kannetut.length) console.log(`· ämpäristä kannettu: ${kannetut.join(', ')}`);
