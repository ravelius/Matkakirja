// Astronautin kameran kaavojen kultaiset arvot (js/linssit/satelliitti-avaruus.js,
// astro-sumu.js, satelliitti-nimiot.js, satelliitti.js). Käyttö: node tee-astronautti.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const A = await import(join(juuri, 'js/linssit/satelliitti-avaruus.js'));
const S = await import(join(juuri, 'js/linssit/astro-sumu.js'));
const N = await import(join(juuri, 'js/linssit/satelliitti-nimiot.js'));
const L = await import(join(juuri, 'js/linssit/satelliitti.js'));
const D = await import(join(juuri, 'js/linssit/satelliitti-data.js'));
const iss = [0, 1, 17.3, 37.5, 75, 400, 899.9].map((t) => ({ t, p: A.issPaikka(t) }));
const kaari = A.issKaari(123.4, 16);
const avaus = [[390, 844], [844, 390], [1024, 1366], [0, 0], [1200, 300]].map(([leveys, korkeus]) => ({ leveys, korkeus, alt: A.avausKorkeus({ leveys, korkeus }) }));
const halk = [0.1, 0.5, 1.6, 3].map((alt) => [alt, A.halkaisijaRuudulla(alt, { korkeus: 844 })]);
const zoomi = [0.05, 0.3, 1.2, 2.9].map((a) => ({ a, ...A.zoomirajat(a) }));
const peitot = [];
for (let s = 0; s <= 1.5; s += 0.037) peitot.push([s, S.pilvienPeitto(s * 2, 2), S.sumunPeitto(s * 2, 2)]);
const pehm = [0, 0.2, 0.5, 0.7, 1].map((p) => [p, A.avausPehmennys(p)]);
// Nimiöt: tiheä rypäs ja edellisen kyljen muisti.
const kohteet = [];
let s = 7;
const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
for (let i = 0; i < 40; i += 1) kohteet.push({ id: 'k' + i, x: 100 + rnd() * 200, y: 100 + rnd() * 300, w: 30 + rnd() * 60, h: 14 });
const eka = N.ladoNimiot(kohteet);
const siirretty = kohteet.map((k) => ({ ...k, x: k.x + 3, y: k.y - 2 }));
const toka = N.ladoNimiot(siirretty, { edelliset: eka });
const oletukset = D.SATELLIITTI_KOHTEET.map((k) => [k.tunnus, L.oletusIndeksi(k)]);
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'astronautti.json'), JSON.stringify({
  iss, kaari, avaus, halk, zoomi, peitot, pehm, kohteet, eka: [...eka], siirretty, toka: [...toka], oletukset,
}));
console.log('astronautti.json:', [...eka.values()].filter((x) => x === 'piilo').length, 'piilossa 40:stä');
