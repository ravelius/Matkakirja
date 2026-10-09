// Pulun esigeneroinnin erätarkistus (Natiivi-UI 9.10.2026). Agenttien ### -lohkot → jäsennetty JSON workerin omilla jäsentimillä.
//   node tarkista-era.mjs vaihe1 <kansio>   tehtavat-1-*.txt ↔ vastaukset-1-*.txt → vaihe1.json (5 per kohta, uudet kysymykset)
//   node tarkista-era.mjs vaihe2 <kansio>   tehtavat-2.json ↔ vastaukset-2-*.txt → vaihe2.json
// Tarkistus: vastaus ei tyhjä, tasan 2 jatkoa (?, ≤ 70), 2–5 käsitettä ilman pystyviivaa, ei jäänteitä, ei ohjeviittauksia;
// vaiheessa 1 jokaisella kohdalla 5 eri kysymystä (uudet ≤ 70 merkkiä, päättyvät ?).
import fs from 'node:fs';
import path from 'node:path';
import { poimiJatkot } from '../pollo/rajat.js';
import { poimiPaikka } from '../pollo/worker.js';

const [, , vaihe, kansio] = process.argv;
const KASITE = /\[\[([^\]]+)\]\]/g;
const virheet = [];
const lohkot = (tiedosto) => {
  const osat = fs.readFileSync(tiedosto, 'utf8').split(/^### ([\d.]+)\s*$/m);
  const ulos = new Map();
  for (let i = 1; i < osat.length; i += 2) {
    if (ulos.has(osat[i])) virheet.push(`${osat[i]}: kahdesti`);
    ulos.set(osat[i], osat[i + 1].trim());
  }
  return ulos;
};
const tiedostot = (alku) => fs.readdirSync(kansio).filter((f) => f.startsWith(alku) && f.endsWith('.txt'));
const vastaukset = new Map();
for (const f of tiedostot(`vastaukset-${vaihe === 'vaihe1' ? 1 : 2}-`)) for (const [k, v] of lohkot(path.join(kansio, f))) vastaukset.set(k, v);

function jasenna(tunnus, teksti) {
  const { vastaus, jatkot } = poimiJatkot(teksti, 3);
  const paikka = poimiPaikka(teksti);
  const linkit = [...vastaus.matchAll(KASITE)].map((m) => m[1]);
  const v = [];
  if (!vastaus) v.push('tyhjä vastaus');
  if (jatkot.length !== 2) v.push(`jatkoja ${jatkot.length}`);
  for (const j of jatkot) if (j.length > 70 || !j.endsWith('?')) v.push(`jatko ei kelpaa: ${j}`);
  if (linkit.length < 2 || linkit.length > 5) v.push(`käsitteitä ${linkit.length}`);
  if (linkit.some((k) => k.includes('|'))) v.push('käsitteessä pystyviiva');
  if (new Set(linkit.map((k) => k.toLowerCase())).size !== linkit.length) v.push('sama käsite kahdesti');
  if (/^\s*(jatkot?|kysymys)\s*:/im.test(vastaus) || /\[[a-z ]+\]/i.test(vastaus.replace(KASITE, ''))) v.push('jäänne vastauksessa');
  if (/avainkäsit|käsitemerkin|kontekst|ohjeist/i.test(vastaus)) v.push('viittaa ohjeisiin');
  if (v.length) virheet.push(`${tunnus}: ${v.join('; ')}`);
  return { vastaus, linkit, jatkot, ...(paikka ? { paikka } : {}) };
}

const ulos = [];
if (vaihe === 'vaihe1') {
  const syote = JSON.parse(fs.readFileSync(path.join(kansio, 'syote.json'), 'utf8'));
  syote.forEach((k, ki) => {
    const n = ki + 1;
    const kysytyt = new Set();
    for (let i = 1; i <= 5; i += 1) {
      const tunnus = `${n}.${i} ${k.kohta}`;
      const raaka = vastaukset.get(`${n}.${i}`);
      if (raaka == null) { virheet.push(`${tunnus}: puuttuu`); continue; }
      const rivit = raaka.split('\n');
      const ens = rivit[0].match(/^KYSYMYS:\s*(.+)$/);
      const valmis = k.kysymykset[i - 1]?.kysymys;
      const kysymys = valmis ?? ens?.[1]?.trim();
      if (!kysymys) { virheet.push(`${tunnus}: uusi kysymys puuttuu`); continue; }
      if (!valmis && (kysymys.length > 70 || !kysymys.endsWith('?'))) virheet.push(`${tunnus}: uusi kysymys ei kelpaa: ${kysymys}`);
      if (kysytyt.has(kysymys.toLowerCase())) virheet.push(`${tunnus}: sama kysymys kahdesti`);
      kysytyt.add(kysymys.toLowerCase());
      ulos.push({ kohde: k.kohta, kysymys, uusi: !valmis, ...jasenna(tunnus, (ens ? rivit.slice(1) : rivit).join('\n')) });
    }
  });
} else {
  for (const t of JSON.parse(fs.readFileSync(path.join(kansio, 'tehtavat-2.json'), 'utf8'))) {
    const raaka = vastaukset.get(String(t.n));
    const tunnus = `${t.n} ${t.kohta} / ${t.kasite}`;
    if (raaka == null) { virheet.push(`${tunnus}: puuttuu`); continue; }
    ulos.push({ kohde: t.kohta, kasite: t.kasite, kysymys: t.kysymys, ...jasenna(tunnus, raaka.replace(/^KYSYMYS:.*\n/, '')) });
  }
}
fs.writeFileSync(path.join(kansio, `${vaihe}.json`), JSON.stringify(ulos, null, 1));
const merkkeja = ulos.reduce((s, x) => s + x.vastaus.length, 0);
console.log(`${vaihe}: ${ulos.length} vastausta, keskimäärin ${Math.round(merkkeja / Math.max(1, ulos.length))} merkkiä, virheitä ${virheet.length}`);
for (const v of virheet) console.log('  ' + v);
