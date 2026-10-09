// Pulun esigenerointi (Natiivi-UI 9.10.2026, omistaja: Sonnet-parvi, effort low). Maan Kysy-kohdat syötteeksi samassa muodossa
// kuin natiivin PuluChat.EsigenerointiKonteksti (PuluVienti): kortin aihe, isoisän merkintä ja webin pollo-haku.js:n katkelmat.
//   (data = sisältöpaketin kokoelmat, tools/pulu-esigenerointi/lataa-data.sh)
//   node valmistele.mjs vaihe1 <data> <ISO3> <ulosKansio> <kohtiaPerErä>
//     → syote.json (kohdat, kysymykset konteksteineen, yhteinen konteksti) ja tehtavat-1-<e>.txt (### n.i -paikat, 5 per kohta)
//   node valmistele.mjs vaihe2 <data> <ISO3> <ulosKansio> <vastauksiaPerErä>
//     → vaihe1.json:n vastausten [[käsitteet]] "Kerro lisää: X" -kysymyksiksi (historia + konteksti) tehtavat-2-<e>.txt
import fs from 'node:fs';
import path from 'node:path';
import { rakennaIndeksi, haeKatkelmat } from '../../js/pollo-haku.js';

const [, , vaihe, dataKansio, maa, ulos, eraKoko] = process.argv;
fs.mkdirSync(ulos, { recursive: true });
const lue = (n) => JSON.parse(fs.readFileSync(path.join(dataKansio, n + '.json'), 'utf8'));
// Puuttuva kokoelma = tyhjä (esim. pilvessä ilman lataa-data.sh:ta): konteksti ilman pelin aineistoa, muuten sama.
const alkiot = (n) => (fs.existsSync(path.join(dataKansio, n + '.json')) ? lue(n).alkiot : (console.warn('puuttuu: ' + n), []));

const kaupungit = Object.fromEntries(alkiot('kaupungit').map((k) => [k.id, k]));
const maat = Object.fromEntries(alkiot('maat').map((m) => [m.id ?? m.maa, m]));
const kulttuuri = {}; for (const a of alkiot('kaupunkilehdet')) kulttuuri[a.kaupunki ?? a.id] = a.aiheet ?? a.data;
const maalehdet = {}; for (const a of alkiot('maalehdet')) maalehdet[a.maa ?? a.id] = a.aiheet ?? a.data;
const nahtavyydet = {};
for (const a of alkiot('nahtavyydet')) {
  (nahtavyydet[a.kaupunki] ??= {})[a.nimi] = { aika: a.aika ?? a.data?.aika, teksti: a.teksti ?? a.data?.teksti, lainaus: a.lainaus ?? a.data?.lainaus };
}
const kohdekartat = {}; for (const a of alkiot('kohdekartat')) kohdekartat[a.kaupunki ?? a.id] = { kohteet: a.kohteet };
const indeksi = rakennaIndeksi({ kulttuuri, maat: maalehdet, nahtavyydet, kohdekartat });
const kNimi = (k) => kaupungit[k]?.nimi ?? k;
const mNimi = (m) => maat[m]?.nimi ?? m;
const nimet = { kaupunki: kNimi, maa: mNimi };
const virrat = Object.fromEntries(alkiot('fokusvirrat').map((v) => [v.kaupunki, v]));

const KOHTEEN_KATTO = 900, AINEISTON_KATTO = 1900, KONTEKSTI_KATTO = 5000;
const TYYPIT = { kaupunki: 'KAUPUNGIT', historia: 'HISTORIA', luonto: 'LUONTO', vuori: 'LUONTO · VUORI', joki: 'LUONTO · JOKI',
  jarvi: 'LUONTO · JÄRVI', elain: 'ELÄIMET', kulttuuri: 'KULTTUURI', kauppa: 'KAUPPA', ihme: 'IHMEET', nahtavyys: 'NÄHTÄVYYDET',
  saari: 'LUONTO · SAARI' };

// PuluChat.EsigenerointiKonteksti + KontekstinLoppu sanatarkasti.
function konteksti(aihe, kaupunki, aineisto) {
  let t = 'Lauta: Maailmankartta';
  const k = kaupunki ? kaupungit[kaupunki] : null;
  if (k) {
    t += '\nKaupunki, jossa pelaaja on: ' + kNimi(kaupunki);
    if (maat[k.maa]) t += '\nMaa, jossa pelaaja on: ' + mNimi(k.maa);
  }
  t += '\nNäkymä: kartta';
  t += '\n' + aihe.otsake + ': ' + aihe.nimi.trim();
  if (aihe.tyyppi) t += ' (' + aihe.tyyppi + ')';
  if (aihe.teksti) {
    const t0 = aihe.teksti.trim();
    t += '\nTietoruudun teksti: ' + (t0.length > KOHTEEN_KATTO ? t0.slice(0, KOHTEEN_KATTO - 1) + '…' : t0);
  }
  const v = k ? virrat[kaupunki]?.matkakirja?.teksti : null;
  if (v) t += '\nIsoisän matkakirjamerkintä: ' + (v.length > 900 ? v.slice(0, 900) : v);
  if (aineisto.length) {
    let osio = '\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):';
    for (const p of aineisto) {
      const rivi = '\n- [' + p.leima + '] ' + p.teksti;
      if (osio.length + rivi.length > AINEISTON_KATTO) break;
      osio += rivi;
    }
    if (t.length + osio.length <= KONTEKSTI_KATTO) t += osio;
  }
  return t.length > KONTEKSTI_KATTO ? t.slice(0, KONTEKSTI_KATTO) : t;
}
const katkelmat = (q, kaupunki) => haeKatkelmat(indeksi, q, { nimet, sijainti: { kaupunki, maa } }).katkelmat;

if (vaihe === 'vaihe1') {
  const iso = maa.toLowerCase();
  const moduulit = {};
  for (const [tiedosto, vienti] of [['fokuskohteet', 'FOKUSKOHTEET'], ['maastokohteet', 'MAASTOKOHTEET'], ['hahmotelma', 'HAHMOTELMA']]) {
    const p = path.join(dataKansio, `${tiedosto}-${iso}.json`);
    if (!fs.existsSync(p)) continue;
    for (const d of JSON.parse(fs.readFileSync(p, 'utf8')).exportit[`${vienti}_${maa}`] ?? []) moduulit[d.id] ??= d;
  }
  const takyt = Object.fromEntries(alkiot('takynostot').map((d) => [d.id, d]));
  const kohdat = [];
  for (const valo of alkiot('karttavalot').filter((v) => v.maa === maa)) {
    const kaupunki = valo.kaupunki ?? valo.kaupunkiAvain ?? null;
    if (valo.id.startsWith('kohde:')) {
      const d = moduulit[valo.tunnus];
      if (!d?.kysymykset?.length) continue;
      const tyyppi = d.symboli ?? d.tyyppi ?? '';
      const luokka = TYYPIT[tyyppi] ?? tyyppi.toUpperCase();
      kohdat.push({ kohta: valo.id, kaupunki, aihe: { otsake: 'Kartalla auki oleva kohdetietoruutu', nimi: d.nimi,
        tyyppi: luokka ? luokka.toLowerCase() : null, teksti: d.teksti || null }, valmiit: d.kysymykset.filter((x) => typeof x === 'string').slice(0, 2) });
    } else if (valo.id.startsWith('nosto:')) {
      const d = takyt[valo.id.slice(6)];
      const valmiit = (d?.kysymykset ?? []).map((x) => String(x).trim()).filter(Boolean).slice(0, 3);
      if (!valmiit.length) continue;
      const looppi = d.taitto === 'lehti';
      const teksti = d.teksti ?? (Array.isArray(d.lunastus) ? d.lunastus.join('\n\n') : d.lunastus);
      const yhd = [looppi ? d.ingressi : null, teksti].filter((x) => x && String(x).trim()).join(' ');
      kohdat.push({ kohta: valo.id, kaupunki: kaupunki ?? (d.kaupungit ?? [])[0] ?? null,
        aihe: { otsake: 'Kortti, josta pelaaja kysyy', nimi: d.otsikko, tyyppi: null, teksti: yhd || null }, valmiit });
    }
  }
  for (const k of kohdat) {
    const yhteiset = [];
    k.kysymykset = k.valmiit.map((q) => {
      const a = katkelmat(q, k.kaupunki);
      for (const x of a) if (!yhteiset.some((y) => y.leima === x.leima && y.teksti === x.teksti)) yhteiset.push(x);
      return { kysymys: q, konteksti: konteksti(k.aihe, k.kaupunki, a) };
    });
    delete k.valmiit;
    k.yhteinen = konteksti(k.aihe, k.kaupunki, [...yhteiset].sort((a, b) => b.piste - a.piste).slice(0, 4));
  }
  fs.writeFileSync(path.join(ulos, 'syote.json'), JSON.stringify(kohdat, null, 1));
  const koko = Number(eraKoko) || 5;
  let e = 0;
  for (let i = 0; i < kohdat.length; i += koko) {
    e += 1;
    const lohkot = [];
    kohdat.slice(i, i + koko).forEach((k, j) => {
      const n = i + j + 1;
      lohkot.push(`================ KOHTA ${n} (${k.kohta}) ================\nYHTEINEN KONTEKSTI (uusille kysymyksille):\n${k.yhteinen}\n`);
      k.kysymykset.forEach((q, qi) => lohkot.push(`### ${n}.${qi + 1}\nKYSYMYS: ${q.kysymys}\nKONTEKSTI:\n${q.konteksti}\n`));
      for (let qi = k.kysymykset.length; qi < 5; qi += 1) lohkot.push(`### ${n}.${qi + 1}\nKYSYMYS: (uusi — keksi itse)\nKONTEKSTI: kohdan ${n} YHTEINEN KONTEKSTI\n`);
    });
    fs.writeFileSync(path.join(ulos, `tehtavat-1-${e}.txt`), lohkot.join('\n'));
  }
  console.log(`${maa}: ${kohdat.length} kohtaa, ${kohdat.reduce((s, k) => s + k.kysymykset.length, 0)} valmista kysymystä, ${e} erää`);
} else if (vaihe === 'vaihe2') {
  const syote = JSON.parse(fs.readFileSync(path.join(ulos, 'syote.json'), 'utf8'));
  const v1 = JSON.parse(fs.readFileSync(path.join(ulos, 'vaihe1.json'), 'utf8'));
  const tehtavat = [];
  for (const k of syote) {
    const nahdyt = new Set();
    for (const x of v1.filter((y) => y.kohde === k.kohta)) {
      for (const kasite of x.linkit) {
        const avain = kasite.trim().toLowerCase();
        if (nahdyt.has(avain)) continue;      // sama käsite kahdesti samassa kohdassa: yksi vastaus
        nahdyt.add(avain);
        const q = 'Kerro lisää: ' + kasite.trim();
        tehtavat.push({ kohta: k.kohta, kasite: kasite.trim(), kysymys: q, historiaQ: x.kysymys, historiaA: x.vastaus,
          konteksti: konteksti(k.aihe, k.kaupunki, katkelmat(q, k.kaupunki)) });
      }
    }
  }
  fs.writeFileSync(path.join(ulos, 'tehtavat-2.json'), JSON.stringify(tehtavat.map((t, i) => ({ n: i + 1, kohta: t.kohta, kasite: t.kasite, kysymys: t.kysymys })), null, 1));
  const koko = Number(eraKoko) || 80;
  let e = 0;
  for (let i = 0; i < tehtavat.length; i += koko) {
    e += 1;
    const lohkot = tehtavat.slice(i, i + koko).map((t, j) => `### ${i + j + 1}\nKONTEKSTI:\n${t.konteksti}\nAIEMPI KYSYMYS: ${t.historiaQ}\nAIEMPI VASTAUS (Livia):\n${t.historiaA}\nKYSYMYS: ${t.kysymys}\n`);
    fs.writeFileSync(path.join(ulos, `tehtavat-2-${e}.txt`), lohkot.join('\n'));
  }
  console.log(`${maa}: ${tehtavat.length} linkkikysymystä, ${e} erää`);
}
