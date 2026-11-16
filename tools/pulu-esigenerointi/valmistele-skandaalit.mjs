// Pulun valmiit vastaukset skandaalien ja syvennysten kysymyksiin (PK 10.11.2026; PT, KK:n lista #6532 ca7406df9, skeema 1.71).
// Kohdat skandaali:<id> ja syvennys:<kaupunki>-<täky> (natiivi PuluValmiitLataus.Kohta, NUI a970b0d1c), paketti = maa (FRA/GBR).
//   node valmistele-skandaalit.mjs <js/packs-kansio> <ulosKansio>
// → syote.json ja tehtavat-1-1.txt kuten valmistele-hetket.mjs. Aihe kuten natiivi PuluChat.NostonAihe + NostoSisalto:
//   skandaali: nimi = otsikko, teksti = kortti (ingressi) + teksti; syvennys: nimi = otsikko ?? nappi, teksti = teksti.
// Pelin tarkistettu aineisto = kortin teksti (lähteistä tarkistettu, lähde kortin kommentissa / lahde-kentässä).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , packs, ulos] = process.argv;
if (!ulos) { console.error('käyttö: node valmistele-skandaalit.mjs <js/packs> <ulos>'); process.exit(2); }
const tuo = async (f) => import(pathToFileURL(path.resolve(packs, f)).href);
const { SKANDAALIT } = await tuo('skandaalit.js');
const { FOKUSVIRTA_PARIISI } = await tuo('fokusvirta-pariisi.js');
const { FOKUSVIRTA_LONTOO } = await tuo('fokusvirta-lontoo.js');
const MAA = { FRA: 'Ranska', GBR: 'Iso-Britannia' };
const KAUPUNKI = { FRA: 'Pariisi', GBR: 'Lontoo' };
const KOHTEEN_KATTO = 900;
const siisti = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
fs.mkdirSync(ulos, { recursive: true });

const kortit = [];
for (const [iso, lista] of Object.entries(SKANDAALIT)) {
  for (const s of lista ?? []) {
    if (!Array.isArray(s.kysymykset) || !s.kysymykset.length) continue;
    if (!MAA[iso]) throw new Error(`skandaali ${s.id}: maa ${iso} ei FRA/GBR`);
    const teksti = [siisti(s.kortti), siisti(s.teksti)].filter(Boolean).join(' ');
    kortit.push({ kohta: 'skandaali:' + s.id, iso, nimi: s.otsikko, teksti, kysymykset: s.kysymykset,
      tunniste: `Skandaali: ${s.otsikko}, ${s.paikka ?? KAUPUNKI[iso]}, ${s.vuosi ?? ''}`.replace(/, $/, '') });
  }
}
for (const [v, iso] of [[FOKUSVIRTA_PARIISI, 'FRA'], [FOKUSVIRTA_LONTOO, 'GBR']]) {
  if (v.kaupunki.includes('-')) throw new Error(`kaupunkitunnuksessa viiva: ${v.kaupunki}`);
  for (const t of v.takyt ?? []) {
    if (!Array.isArray(t.kysymykset) || !t.kysymykset.length) continue;
    const nimi = t.otsikko ?? t.nappi;
    kortit.push({ kohta: `syvennys:${v.kaupunki}-${t.id}`, iso, nimi, teksti: siisti(t.teksti), kysymykset: t.kysymykset,
      tunniste: `Syvennys: ${nimi}, ${KAUPUNKI[iso]}` });
  }
}

const syote = [];
const lohkot = [];
for (const k of kortit) {
  const n = syote.length + 1;
  const aihe = { otsake: 'Kortti, josta pelaaja kysyy', nimi: k.nimi, tyyppi: null, teksti: k.teksti };
  const t = 'Lauta: Maailmankartta\nKaupunki, jossa pelaaja on: ' + KAUPUNKI[k.iso] + '\nMaa, jossa pelaaja on: ' + MAA[k.iso]
    + '\nNäkymä: kartta\n' + aihe.otsake + ': ' + aihe.nimi
    + '\nTietoruudun teksti: ' + (k.teksti.length > KOHTEEN_KATTO ? k.teksti.slice(0, KOHTEEN_KATTO - 1) + '…' : k.teksti);
  syote.push({ kohta: k.kohta, kaupunki: KAUPUNKI[k.iso].toLowerCase(), maa: k.iso, maara: k.kysymykset.length, aihe,
    kysymykset: k.kysymykset.map((q) => ({ kysymys: q })) });
  lohkot.push(`================ KOHTA ${n} (${k.kohta}) ================\n`);
  k.kysymykset.forEach((q, i) => {
    const kt = t + '\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):\n- [' + k.tunniste + '] ' + k.teksti;
    lohkot.push(`### ${n}.${i + 1}\nKYSYMYS: ${q}\nKONTEKSTI:\n${kt}\n`);
  });
}
fs.writeFileSync(path.join(ulos, 'syote.json'), JSON.stringify(syote, null, 1));
fs.writeFileSync(path.join(ulos, 'tehtavat-1-1.txt'), lohkot.join('\n'));
console.log(`${syote.length} korttia, ${syote.reduce((s, k) => s + k.maara, 0)} kysymystä`);
