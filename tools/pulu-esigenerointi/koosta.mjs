// Pulun esigeneroinnin ämpäripaketti (Natiivi-UI 9.10.2026): vaihe1.json (5 vastausta per kohta) + vaihe2.json (linkkitaso
// "Kerro lisää: X") → pulu/vastaukset/v1/<ISO3>.json -muoto. Natiivi hakee valmiin kysymyksen vastauksen kohdan kysymyksistä ja
// käsitelinkin vastauksen kohdan lisaa-taulusta (avain = käsite pienillä kirjaimilla, kuten [[käsite]] vastauksessa).
// Käyttö: node tools/pulu-esigenerointi/koosta.mjs <kansio> <ISO3>
import fs from 'node:fs';
import path from 'node:path';

const [, , kansio, maa] = process.argv;
const lue = (n) => JSON.parse(fs.readFileSync(path.join(kansio, n), 'utf8'));
const v1 = lue('vaihe1.json');
const v2 = fs.existsSync(path.join(kansio, 'vaihe2.json')) ? lue('vaihe2.json') : [];
const kohdat = {};
for (const x of v1) {
  const k = (kohdat[x.kohde] ??= { kysymykset: [], lisaa: {} });
  k.kysymykset.push({ kysymys: x.kysymys, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) });
}
for (const x of v2) {
  const k = kohdat[x.kohde];
  if (!k) continue;
  k.lisaa[x.kasite.toLowerCase()] = { kasite: x.kasite, vastaus: x.vastaus, jatkot: x.jatkot, ...(x.paikka ? { paikka: x.paikka } : {}) };
}
const paketti = {
  $skeema: 'matkakirja-pulu-vastaukset/1',
  maa,
  sisalto: 'sisalto/1/v625',
  ohje: 'pulu-esigenerointi/pulu-ohje-aloitus.txt (kysymykset), pulu-ohje-jatko.txt (linkit); workerin pulunKehoteOsat natiivi',
  luotu: new Date().toISOString(),
  vastauksia: v1.length + v2.length,
  kohdat,
};
const ulos = path.join(kansio, `${maa}.json`);
fs.writeFileSync(ulos, JSON.stringify(paketti));
// Hakemisto pulu/vastaukset/v1/maat.json (natiivi PuluValmiitLataus): maa → versio; versio vaihtuu, kun paketti tehdään uudelleen.
const hakemistoP = path.join(kansio, '..', 'maat.json');
const hakemisto = fs.existsSync(hakemistoP) ? JSON.parse(fs.readFileSync(hakemistoP, 'utf8')) : { maat: {} };
hakemisto.maat[maa] = paketti.luotu.replace(/[^0-9]/g, '').slice(0, 12);
fs.writeFileSync(hakemistoP, JSON.stringify(hakemisto, null, 1));
console.log(`${ulos}: ${Object.keys(kohdat).length} kohtaa, ${v1.length} kysymysvastausta, ${v2.length} linkkivastausta`);
