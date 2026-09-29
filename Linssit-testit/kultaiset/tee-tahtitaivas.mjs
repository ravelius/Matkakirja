// Tähtitaivaan aineisto natiiville (Linssiseppä 29.9.2026): webin js/packs/linssi-tahdet.js (Yale BSC, ConstellationLines
// CC BY 4.0, IAU-nimet CC BY, suomenkieliset nimet) ja webin tähtitaivas-linssin säännöt ja tekstit (pelikoodari-tahtitaivas
// d9a9438a, Fablen hyväksymä 21.9.2026: kirkkausrajat, suurkaupungit, Livian kysymykset, palautteet, Horation kortti).
// Tulos: Assets/Matkakirja/Linssit/Resources/Taivas/tahtitaivas.json (TextAsset). Käyttö: node tee-tahtitaivas.mjs <kansio, jossa
// js/packs/linssi-tahdet.js ja js/linssit/tahtitaivas-laskenta.js> [kortin tekstitiedosto]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2];
const pakka = await import(join(juuri, 'js/packs/linssi-tahdet.js'));
const L = await import(join(juuri, 'js/linssit/tahtitaivas-laskenta.js'));
const kortti = process.argv[3] ? readFileSync(process.argv[3], 'utf8').trim() : '';
const k = Object.fromEntries(pakka.TAHTI_KENTAT.map((n, i) => [n, i]));
const tahdet = pakka.TAHDET.map((r) => [r[k.hr], r[k.ra], r[k.dec], r[k.mag], r[k.bv] ?? 0, r[k.nimi] ?? null]);
const kuviot = pakka.TAHTIKUVIOT.map((x) => ({ lyhenne: x.lyhenne, latina: x.latina, suomi: x.suomi, huomio: x.huomio ?? null, viivat: x.viivat }));
const ulos = {
  lahde: 'Yale Bright Star Catalogue 5 (NASA ADC / CDS); ConstellationLines CC BY 4.0; IAU Catalog of Star Names CC BY; suomenkieliset nimet Wikipedia (fi)',
  kirkkausrajat: L.KIRKKAUSRAJAT, suurkaupungit: [...L.SUURKAUPUNGIT], horisontinVara: L.HORISONTIN_VARA_AST,
  arvauksenTp: L.ARVAUKSEN_TP, vaihtoehtoja: L.VAIHTOEHTOJA,
  kysymykset: L.LIVIAN_KYSYMYKSET.map((q) => q.teksti), palauteOikein: L.PALAUTE_OIKEIN, palauteVaarin: L.PALAUTE_VAARIN,
  kortti, tahdet, kuviot,
};
const kohde = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'Assets', 'Matkakirja', 'Linssit', 'Resources', 'Taivas', 'tahtitaivas.json');
writeFileSync(kohde, JSON.stringify(ulos));
console.log(`tahtitaivas.json: ${tahdet.length} tähteä, ${kuviot.length} tähdistöä, kortti ${kortti.length} merkkiä`);
