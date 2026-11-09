// Pulun valmiit kysymykset kohdekartan 3D-mallinostoille (PK 9.11.2026; OMISTAJAN PÄÄTÖS 16.23 KK-kortti "Kyllä", KS:n luonnos
// docs/raportit/pariisi-mallinostot-kysymykset-20261109.json, PR 6517). Kohta = kohdekartta:<kaupunki>:<nimi> (natiivi
// PuluChat.Lahteet NahtavyysLahde: keskikohteen Kohta = kohdenoston tunnus, paketti = kaupungin maan paketti).
//   node valmistele-mallinostot.mjs <luonnos.json> <nahtavyysjutut.mjs> <kaupunki> <ISO3> <ulosKansio>
// → syote.json (kohta, maa, maara = luonnoksen kysymysten määrä) ja tehtavat-1-1.txt (### n.i, KYSYMYS valmis, KONTEKSTI).
// Konteksti samassa muodossa kuin valmistele.mjs konteksti() ja live (aihe "Nähtävyys ruudun keskellä kartalla"); KS:n
// faktavastaus pelin tarkistettuna aineistona, nähtävyysjutun teksti tietoruutuna.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , luonnosPolku, jututPolku, kaupunki, maa, ulos] = process.argv;
if (!ulos) { console.error('käyttö: node valmistele-mallinostot.mjs <luonnos.json> <nahtavyysjutut.mjs> <kaupunki> <ISO3> <ulos>'); process.exit(2); }
const KAUPUNKI = { pariisi: 'Pariisi' }, MAA = { FRA: 'Ranska' };
const luonnos = JSON.parse(fs.readFileSync(luonnosPolku, 'utf8'));
const { NAHTAVYYSJUTUT } = await import(pathToFileURL(path.resolve(jututPolku)).href);
const jutut = NAHTAVYYSJUTUT[kaupunki] ?? {};
const KOHTEEN_KATTO = 900;
fs.mkdirSync(ulos, { recursive: true });

const syote = [];
const lohkot = [];
for (const [kohta, kysymykset] of Object.entries(luonnos)) {
  if (!kohta.startsWith('kohdekartta:' + kaupunki + ':')) continue;
  const nimi = kohta.slice(('kohdekartta:' + kaupunki + ':').length);
  const juttu = jutut[nimi];
  if (!juttu) throw new Error('ei nähtävyysjuttua: ' + nimi);
  const n = syote.length + 1;
  const koko = `${nimi} (${KAUPUNKI[kaupunki]})`;
  let t = 'Lauta: Maailmankartta\nKaupunki, jossa pelaaja on: ' + KAUPUNKI[kaupunki] + '\nMaa, jossa pelaaja on: ' + MAA[maa]
    + '\nNäkymä: kartta\nNähtävyys ruudun keskellä kartalla: ' + koko + ' (nähtävyys)';
  const tj = juttu.teksti.replace(/\s*\n\n\s*/g, ' ').trim();
  t += '\nTietoruudun teksti: ' + (tj.length > KOHTEEN_KATTO ? tj.slice(0, KOHTEEN_KATTO - 1) + '…' : tj);
  syote.push({ kohta, kaupunki, maa, maara: kysymykset.length, aihe: { otsake: 'Nähtävyys ruudun keskellä kartalla', nimi: koko, tyyppi: 'nähtävyys', teksti: tj },
    kysymykset: kysymykset.map((q) => ({ kysymys: q.kysymys })) });
  lohkot.push(`================ KOHTA ${n} (${kohta}) ================\n`);
  kysymykset.forEach((q, i) => {
    const k = t + '\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):\n- [Nähtävyysjuttu: ' + nimi + '] ' + q.vastaus;
    lohkot.push(`### ${n}.${i + 1}\nKYSYMYS: ${q.kysymys}\nKONTEKSTI:\n${k}\n`);
  });
}
fs.writeFileSync(path.join(ulos, 'syote.json'), JSON.stringify(syote, null, 1));
fs.writeFileSync(path.join(ulos, 'tehtavat-1-1.txt'), lohkot.join('\n'));
console.log(`${syote.length} kohtaa, ${syote.reduce((s, k) => s + k.maara, 0)} kysymystä`);
