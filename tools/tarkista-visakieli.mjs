// Nostovisojen kielen koneellinen tarkistus (Raamattu: NOSTOVISAN ULKOASU JA VAIHTOEHTOJEN KIELI).
// Käyttö: node tools/tarkista-visakieli.mjs [ISO ...]   (ei argumentteja = kaikki maat)
// KOVAT virheet (pitää olla 0): kysymys > 95, vaihtoehto > 40 merkkiä, "-malla/-mällä", oikea selvästi pisin (pisin JA > 1,6 × lyhin).
// PEHMEÄT varoitukset (korjaa jos järkevää): > 5 sanaa, fakta useampi virke, vaihtoehto toistaa kysymyksen sanoja.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('../js/packs/', import.meta.url));
const iso = process.argv.slice(2).map((x) => x.toUpperCase());
const files = fs.readdirSync(dir).filter((f) => /^hahmotelma-[a-z]{3}\.js$/.test(f)).filter((f) => !iso.length || iso.includes(f.slice(11, 14).toUpperCase()));
let kov = 0, peh = 0, n = 0;
for (const f of files) {
  const m = await import(dir + f + '?t=' + Date.now());
  const arr = Object.values(m).find(Array.isArray) ?? [];
  for (const h of arr) {
    if (!h.visa) continue; n++;
    const v = h.visa; const L = v.vaihtoehdot.map((x) => x.length);
    const K = [], P = [];
    if (v.kysymys.length > 95) K.push('kysymys ' + v.kysymys.length + ' merkkiä');
    if (Math.max(...L) > 40) K.push('vaihtoehto > 40 merkkiä (' + Math.max(...L) + ')');
    if (v.vaihtoehdot.some((o) => /(malla|mällä)\b/i.test(o))) K.push('-malla/-mällä');
    if (v.vaihtoehdot.length !== 4 || !(v.oikea >= 0 && v.oikea < 4)) K.push('4 vaihtoehtoa + oikea 0–3');
    if (L[v.oikea] === Math.max(...L) && L[v.oikea] > 1.6 * Math.min(...L)) K.push('oikea selvästi pisin');
    if (v.vaihtoehdot.some((o) => o.trim().split(/\s+/).length > 5)) P.push('> 5 sanaa');
    if ((v.fakta.match(/[.!?](\s|$)/g) ?? []).length > 1) P.push('fakta useampi virke');
    const kw = new Set(v.kysymys.toLowerCase().match(/\p{L}{5,}/gu) ?? []);
    if (v.vaihtoehdot.some((o) => { const w = o.toLowerCase().match(/\p{L}{5,}/gu) ?? []; return w.length >= 2 && w.filter((x) => kw.has(x)).length >= 2; })) P.push('toistaa kysymystä');
    kov += K.length ? 1 : 0; peh += P.length ? 1 : 0;
    if (K.length || P.length) console.log(f.slice(11, 14).toUpperCase(), h.id.replace('hahmotelma-', ''), '| KOVA:', K.join(', ') || '-', '| PEHMEÄ:', P.join(', ') || '-', '|', v.kysymys.slice(0, 60), '|', v.vaihtoehdot.join(' / '));
  }
}
console.log(`visoja ${n}, kovia virheitä ${kov}, pehmeitä varoituksia ${peh}`);
if (kov) process.exitCode = 1;
