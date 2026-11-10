// Pulun valmiit vastaukset historian hetkien kysymyksiin (PK 10.11.2026; PT 03.2x, KK 02.23, KK:n korjattu lista #6531 5595fe7cf).
// Kohta = hetki:<id> (natiivi PuluValmiitLataus.Kohta, NUI bd9b1597a), paketti = hetken iso (FRA/GBR).
//   node valmistele-hetket.mjs <historian-hetket.js> <ulosKansio>
// → syote.json (kohta, kaupunki, maa, maara, aihe, kysymykset) ja tehtavat-1-1.txt (### n.i, KYSYMYS valmis, KONTEKSTI).
// Konteksti kuten valmistele.mjs konteksti() ja live: PuluChat.NostonAihe (otsake "Kortti, josta pelaaja kysyy", nimi = otsikko,
// teksti = hetken teksti); pelin tarkistettu aineisto = hetken teksti (en-Wikipediasta tarkistettu, lähde hetken kommentissa).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , hetketPolku, ulos] = process.argv;
if (!ulos) { console.error('käyttö: node valmistele-hetket.mjs <historian-hetket.js> <ulos>'); process.exit(2); }
const { HISTORIAN_HETKET } = await import(pathToFileURL(path.resolve(hetketPolku)).href);
const MAA = { FRA: 'Ranska', GBR: 'Iso-Britannia' };
const KAUPUNKI = { FRA: ['pariisi', 'Pariisi'], GBR: ['lontoo', 'Lontoo'] };
const KOHTEEN_KATTO = 900;
fs.mkdirSync(ulos, { recursive: true });

const syote = [];
const lohkot = [];
for (const h of HISTORIAN_HETKET.filter((x) => Array.isArray(x.kysymykset) && x.kysymykset.length)) {
  if (!KAUPUNKI[h.iso]) throw new Error(`${h.id}: maa ${h.iso} ei Pariisi/Lontoo`);
  const [kid, knimi] = KAUPUNKI[h.iso];
  if (!h.paikka.includes(knimi)) throw new Error(`${h.id}: paikka ${h.paikka} ei ${knimi}`);
  const n = syote.length + 1;
  const kohta = 'hetki:' + h.id;
  const tj = h.teksti.replace(/\s+/g, ' ').trim();
  const aihe = { otsake: 'Kortti, josta pelaaja kysyy', nimi: h.otsikko, tyyppi: null, teksti: tj };
  const t = 'Lauta: Maailmankartta\nKaupunki, jossa pelaaja on: ' + knimi + '\nMaa, jossa pelaaja on: ' + MAA[h.iso]
    + '\nNäkymä: kartta\n' + aihe.otsake + ': ' + aihe.nimi
    + '\nTietoruudun teksti: ' + (tj.length > KOHTEEN_KATTO ? tj.slice(0, KOHTEEN_KATTO - 1) + '…' : tj);
  syote.push({ kohta, kaupunki: kid, maa: h.iso, maara: h.kysymykset.length, aihe, kysymykset: h.kysymykset.map((q) => ({ kysymys: q })) });
  lohkot.push(`================ KOHTA ${n} (${kohta}) ================\n`);
  h.kysymykset.forEach((q, i) => {
    const k = t + '\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):\n- [Historian hetki: ' + h.otsikko + ', ' + h.paikka + ', '
      + h.paivays + '] ' + tj;
    lohkot.push(`### ${n}.${i + 1}\nKYSYMYS: ${q}\nKONTEKSTI:\n${k}\n`);
  });
}
fs.writeFileSync(path.join(ulos, 'syote.json'), JSON.stringify(syote, null, 1));
fs.writeFileSync(path.join(ulos, 'tehtavat-1-1.txt'), lohkot.join('\n'));
console.log(`${syote.length} hetkeä, ${syote.reduce((s, k) => s + k.maara, 0)} kysymystä`);
