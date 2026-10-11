// Pääkaupunkien e04–e14 laudan valmistelu Macilla (PILVIOHJE luku 12 kohta 3; PT 11.10.2026, Karttaseppä).
// Laskee jokaiselle erän pääkaupunkipisteelle ehdotuksen maailmanlaudan rivistä (x, y, la/lx/ly, airport, pallo),
// reiteistä, maakoodeista (cityCountry, cityManner) ja kohdekartan pohjan tilasta, ja tarkistaa ne samoilla
// säännöillä kuin tests/rules.test.mjs (60 yksikön väli, nimikyltit, maalla, merireitti vedessä).
// Ei muuta pelin tiedostoja: tulos on data, jonka Pelikoodari kytkee, kun Codexin erä on hyväksytty.
//
//   node tools/paakaupungit/laudan-valmistelu.mjs <erat.md> <ulos.json> [ulos.md]
//
// erat.md = haaran paakaupungit-codex-pohja paakaupungit-pilvi/erat.md (koneluettava lista + taulukot).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAAILMANKARTTA as M } from '../../js/packs/maailmankartta.js';
import { PAAKAUPUNKIPISTEET } from '../../js/packs/paakaupungit.js';
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { projisoiLaudalle } from '../../js/fokusmitat.js';
import { isOnLand } from '../../js/mapart.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '../..');
const [eratPolku, ulosJson, ulosMd] = process.argv.slice(2);
const LAUTA = 'maailmankartta';
const W = M.map.width;
const MIN = M.minCityDistance; // 60
const ASKEL = 74; // laudan maareittien mediaani: yksikköä per askel
const SATAMA = 55; // merireitin pää saa kulkea maalla (rules.test.mjs HARBOUR)

// --- erät ja liput erat.md:stä
const erat = readFileSync(eratPolku, 'utf8');
const ERAT = {};
for (const m of erat.matchAll(/^ERÄ (e\d+): (.+)$/gm)) ERAT[m[1]] = m[2].trim().split(/\s+/);
const liput = {};
for (const m of erat.matchAll(/^\| \d+ \| (\w+) \|.*\| ([^|]*) \|$/gm)) liput[m[1]] = m[2].trim();
const valitut = Object.entries(ERAT).filter(([e]) => Number(e.slice(1)) >= 4);

// --- apurit
const dx = (a, b) => { let d = a - b; if (d > W / 2) d -= W; if (d < -W / 2) d += W; return d; };
const etaisyys = (a, b) => Math.hypot(dx(a.x, b.x), a.y - b.y);
const proj = (lat, lon) => { const p = projisoiLaudalle(LAUTA, lon, lat); return { x: ((p.x % W) + W) % W, y: p.y }; };
const maalla = (p) => isOnLand([p.x, p.y], M.map);
const yksKm = (lat) => (40075 * Math.cos((lat * Math.PI) / 180)) / W; // km per vaakayksikkö

// Laudan x/y on käsin sommiteltu (tests/kaupungit-maissa.test.mjs): lähimpien kaupunkien siirtymä
// pallopisteestä laudan paikkaan interpoloidaan uudelle pisteelle (käänteinen etäisyyspaino, 4 lähintä).
const ankkurit = M.cities.filter((c) => c.pallo).map((c) => ({ c, p: proj(c.pallo.lat, c.pallo.lon) }))
  .map((a) => ({ ...a, sx: dx(a.c.x, a.p.x), sy: a.c.y - a.p.y }));
function laudalle(lat, lon) {
  const p = proj(lat, lon);
  const lah = ankkurit.map((a) => ({ a, d: etaisyys(p, a.p) })).sort((u, v) => u.d - v.d).slice(0, 4);
  if (lah[0].d < 1) return { ...p, raaka: p, siirto: [0, 0] };
  let sw = 0, sx = 0, sy = 0;
  for (const { a, d } of lah) { const w = 1 / (d * d); sw += w; sx += a.sx * w; sy += a.sy * w; }
  // Kaukana olevien ankkurien siirtymä ei koske tätä paikkaa: vaimennus 300 yksikön jälkeen.
  const vaimennus = Math.min(1, 300 / Math.max(300, lah[0].d));
  const s = [(sx / sw) * vaimennus, (sy / sw) * vaimennus];
  return { x: ((p.x + s[0]) % W + W) % W, y: p.y + s[1], raaka: p, siirto: s.map((v) => Math.round(v * 10) / 10) };
}

// Nimikyltti täsmälleen kuten rules.test.mjs "kaupunkien nimet eivät mene päällekkäin".
function kyltti(c) {
  const w = c.name.length * (c.start ? 11 : 8.6);
  const lx = c.x + (c.lx ?? 0), ly = c.y + (c.ly ?? -(c.start ? 28 : 19));
  const x0 = c.la === 'start' ? lx : c.la === 'end' ? lx - w : lx - w / 2;
  return { x0, x1: x0 + w, y0: ly - 14, y1: ly + 4 };
}
const paalla = (r, s, v = 3) => r.x0 < s.x1 - v && s.x0 < r.x1 - v && r.y0 < s.y1 - v && s.y0 < r.y1 - v;
function peittaa(r, toinen) {
  const pisteet = [{ x: toinen.x, y: toinen.y, r: toinen.start ? 21 : 13 }];
  if (!toinen.start) pisteet.push({ x: toinen.x + 22, y: toinen.y + 18, r: 17 });
  return pisteet.some((s) => {
    const sxx = r.x0 + dx(s.x, r.x0); // kierto: verrataan samalla kierroksella
    const nx = Math.max(r.x0, Math.min(sxx, r.x1)), ny = Math.max(r.y0, Math.min(s.y, r.y1));
    return Math.hypot(sxx - nx, s.y - ny) < s.r - 4;
  });
}
const VAIHTOEHDOT = [['start', 20, 5], ['end', -20, 5], ['middle', 0, -24], ['start', 17, -16], ['end', -17, -16], ['start', 17, 26], ['middle', 0, 32], ['end', -17, 26]];
function nimio(uusi, kaikki) {
  for (const [la, lx, ly] of VAIHTOEHDOT) {
    const c = { ...uusi, la, lx, ly }; const r = kyltti(c);
    const muut = kaikki.filter((o) => o.id !== c.id && Math.abs(dx(o.x, c.x)) < 400 && Math.abs(o.y - c.y) < 200);
    const vika = muut.find((o) => (o.la && paalla(r, kyltti(o))) || peittaa(r, o) || (o.la && peittaa(kyltti(o), c)));
    if (!vika) return { la, lx, ly, ok: true };
  }
  return { la: 'start', lx: 20, ly: 5, ok: false };
}

// Jana maalla / vedessä: näytteet 2 %:n välein (päät vapaina merireitillä kuten testissä).
function janaMaalla(a, b) {
  // Päistä 20 yksikköä vapaana: rannikkokaupunki voi olla karkean rantaviivan reunalla.
  for (let t = 0.02; t <= 0.98; t += 0.02) {
    const p = { x: a.x + dx(b.x, a.x) * t, y: a.y + (b.y - a.y) * t };
    if (Math.hypot(dx(p.x, a.x), p.y - a.y) < 20 || Math.hypot(dx(p.x, b.x), p.y - b.y) < 20) continue;
    if (!maalla(p)) return false;
  }
  return true;
}
function janaVedessa(a, b) {
  for (let t = 0.02; t <= 0.98; t += 0.02) {
    const p = { x: a.x + dx(b.x, a.x) * t, y: a.y + (b.y - a.y) * t };
    if (Math.hypot(dx(p.x, a.x), p.y - a.y) < SATAMA || Math.hypot(dx(p.x, b.x), p.y - b.y) < SATAMA) continue;
    if (maalla(p)) return false;
  }
  return true;
}
// Pisteen etäisyys janasta (olemassa olevan reitin halkaisu).
function janaan(p, a, b) {
  const bx = a.x + dx(b.x, a.x), px = a.x + dx(p.x, a.x);
  const ux = bx - a.x, uy = b.y - a.y, L = ux * ux + uy * uy;
  const t = L ? Math.max(0, Math.min(1, ((px - a.x) * ux + (p.y - a.y) * uy) / L)) : 0;
  return { d: Math.hypot(px - (a.x + t * ux), p.y - (a.y + t * uy)), t };
}
const askeleet = (d) => Math.max(1, Math.round(d / ASKEL));

const kaupunki = Object.fromEntries(M.cities.map((c) => [c.id, c]));
const pisteet = Object.fromEntries(PAAKAUPUNKIPISTEET.map((p) => [p.id, p]));
const maanManner = {};
for (const [id, iso] of Object.entries(M.map.cityCountry)) (maanManner[iso] ??= {})[M.map.cityManner[id]] = ((maanManner[iso] ?? {})[M.map.cityManner[id]] ?? 0) + 1;
const ERAN_MANNER = { e04: 'africa', e05: 'africa', e06: 'africa', e07: 'africa', e08: 'africa', e09: 'asia', e10: 'asia', e11: 'northamerica', e12: 'northamerica', e13: 'southamerica', e14: 'oceania' };

// --- 1. paikat
const uudet = [];
for (const [era, idt] of valitut) for (const id of idt) {
  const p = pisteet[id];
  if (!p) { uudet.push({ id, era, virhe: 'ei pääkaupunkipistettä' }); continue; }
  let l = laudalle(p.lat, p.lon);
  // Saari tai rannikko: jos todellinen paikka (raaka projektio) on meressä, sommittelusiirtoa ei käytetä,
  // koska se voisi siirtää saarivaltion pääkaupungin mantereelle (Moroni → Mosambik). Rannikolla piste
  // tuodaan lähimpään maapisteeseen enintään 20 yksikön päästä (karkea rantaviiva); muuten se on saari.
  let paikka = 'maa';
  if (!maalla(l)) {
    const raaka = l.raaka;
    const lahinMaa = (q) => { for (let r = 2; r <= 20; r += 2) for (let a = 0; a < 360; a += 15) { const t = { x: q.x + r * Math.cos(a * Math.PI / 180), y: q.y + r * Math.sin(a * Math.PI / 180) }; if (maalla(t)) return t; } return null; };
    const m = lahinMaa(l) ?? lahinMaa(raaka);
    if (m) { l = { ...l, x: m.x, y: m.y }; paikka = 'rannikko (siirretty maalle)'; }
    else { l = { ...l, x: raaka.x, y: raaka.y }; paikka = 'saari'; }
  } else if (!maalla(l.raaka) && !maalla({ x: l.raaka.x, y: l.raaka.y })) {
    // Siirto vei maalle, mutta oikea paikka on meressä: saari, jota laudan muodoissa ei ole.
    const lahella = [0, 4, 8].some((r) => [0, 90, 180, 270].some((a) => maalla({ x: l.raaka.x + r * Math.cos(a * Math.PI / 180), y: l.raaka.y + r * Math.sin(a * Math.PI / 180) })));
    if (!lahella) { l = { ...l, x: l.raaka.x, y: l.raaka.y }; paikka = 'saari'; }
  }
  uudet.push({ paikka, id, era, name: p.nimi, wiki: p.wiki ?? p.nimi, maa: p.maa, lat: p.lat, lon: p.lon, x: Math.round(l.x * 10) / 10, y: Math.round(l.y * 10) / 10, siirto: l.siirto, lippu: liput[id] ?? '' });
}
const ok = uudet.filter((u) => !u.virhe);

// --- 2. välit, maa, nimiöt, reitit
for (const u of ok) {
  const lah = M.cities.map((c) => ({ c, d: etaisyys(u, c) })).sort((a, b) => a.d - b.d);
  u.lahin = { id: lah[0].c.id, yks: Math.round(lah[0].d), km: Math.round(lah[0].d * yksKm(u.lat)) };
  const lahUusi = ok.filter((o) => o !== u).map((o) => ({ o, d: etaisyys(u, o) })).sort((a, b) => a.d - b.d)[0];
  u.lahinUusi = lahUusi ? { id: lahUusi.o.id, yks: Math.round(lahUusi.d) } : null;
  u.alle60 = lah[0].d < MIN;
  u.alle60uusi = lahUusi && lahUusi.d < MIN;
  u.maalla = maalla(u);
  u.saari = u.paikka === 'saari';
  u.cityCountry = u.maa;
  const mm = maanManner[u.maa];
  u.cityManner = mm ? Object.entries(mm).sort((a, b) => b[1] - a[1])[0][0] : ERAN_MANNER[u.era];
  const kk = KAUPUNKIKARTAT[u.id];
  u.kohdekartta = kk ? (existsSync(join(JUURI, kk.polku)) ? `valmis (${kk.kohteet.length} kohdetta)` : 'rivi ilman kuvaa') : 'puuttuu';
}
// Nimiöt ahneesti: ensin kaupungit, joilla on vähiten tilaa.
const lauta = M.cities.map((c) => ({ ...c }));
for (const u of [...ok].sort((a, b) => a.lahin.yks - b.lahin.yks)) {
  const n = nimio({ id: u.id, name: u.name, x: u.x, y: u.y }, lauta);
  Object.assign(u, { la: n.la, lx: n.lx, ly: n.ly, nimioOk: n.ok });
  lauta.push({ id: u.id, name: u.name, x: u.x, y: u.y, la: n.la, lx: n.lx, ly: n.ly });
}
// Reitit: (a) halkaisu, jos piste on olemassa olevan maareitin varrella; muuten (b) 2 lähintä maareittiä
// maalla, tai saarelle (c) merireitti lähimpään rannikon kaupunkiin.
const satamat = new Set(M.edges.filter((e) => e.type === 'sea').flatMap((e) => [e.a, e.b]));
const reunat = M.edges.map((e) => ({ ...e, A: kaupunki[e.a], B: kaupunki[e.b] }));
for (const u of ok) {
  u.reitit = [];
  const halk = reunat.filter((e) => (e.type ?? 'land') === 'land' && !e.via)
    .map((e) => ({ e, ...janaan(u, e.A, e.B) })).filter((h) => h.d < 45 && h.t > 0.15 && h.t < 0.85).sort((a, b) => a.d - b.d)[0];
  if (halk && !u.alle60) {
    const { e } = halk;
    u.reitit.push({ korvaa: `${e.a}–${e.b} (${e.steps})`, a: e.a, b: u.id, steps: Math.max(1, Math.round(e.steps * halk.t)) },
      { a: u.id, b: e.b, steps: Math.max(1, e.steps - Math.max(1, Math.round(e.steps * halk.t))) });
    u.reittitapa = 'halkaisu';
    continue;
  }
  const lah = M.cities.map((c) => ({ c, d: etaisyys(u, c) })).filter((x) => x.d > 0).sort((a, b) => a.d - b.d).slice(0, 8);
  const maa = lah.filter((x) => x.d < 400 && janaMaalla(u, x.c)).slice(0, 2);
  if (!u.saari && maa.length) {
    for (const x of maa) u.reitit.push({ a: x.c.id, b: u.id, steps: askeleet(x.d) });
    u.reittitapa = maa.length === 2 ? 'maa 2' : 'maa 1';
    continue;
  }
  const meri = M.cities.filter((c) => satamat.has(c.id)).map((c) => ({ c, d: etaisyys(u, c) })).sort((a, b) => a.d - b.d).filter((x) => x.d < 900 && janaVedessa(u, x.c)).slice(0, u.saari ? 2 : 1);
  for (const x of meri) u.reitit.push({ a: x.c.id, b: u.id, type: 'sea', steps: askeleet(x.d) });
  u.reittitapa = meri.length ? 'meri' : 'EI SUORAA REITTIÄ (via tai lento)';
}
// Lentokenttä: vain kun pelkkä maa- tai merireitti ei riitä (kaukaiset saaret), ja lähin laudan kenttä pariksi.
const kentat = M.cities.filter((c) => c.airport);
for (const u of ok) {
  u.airport = u.reittitapa.startsWith('EI');
  if (u.airport) {
    const k = kentat.map((c) => ({ c, d: etaisyys(u, c) })).sort((a, b) => a.d - b.d)[0];
    u.lentoreitti = { a: k.c.id, b: u.id };
  }
}

// --- 3. suositus (pelikaupunki vai kevyt piste)
for (const u of ok) {
  const syyt = [];
  if (u.alle60) syyt.push(`≤60: ${u.lahin.yks} yks (${u.lahin.km} km) kaupungista ${u.lahin.id}`);
  if (u.alle60uusi) syyt.push(`≤60 toisesta uudesta: ${u.lahinUusi.id} ${u.lahinUusi.yks} yks`);
  if (/päällekkäin/.test(u.lippu)) syyt.push('päällekkäin pelin lehden kanssa');
  if (!u.nimioOk) syyt.push('nimikyltti ei mahdu');
  u.suositus = syyt.length ? 'kevyt piste (maakortin pääkaupunkirivi, kuten e01–e03)' : 'pelikaupunki mahdollinen';
  u.syyt = syyt;
}

const tulos = { laadittu: 'Karttaseppä 11.10.2026 (tools/paakaupungit/laudan-valmistelu.mjs)', lauta: LAUTA, minCityDistance: MIN, kaupungit: uudet };
writeFileSync(ulosJson, JSON.stringify(tulos, null, 1) + '\n');
const yht = (f) => ok.filter(f).length;
console.log(`${ok.length} kaupunkia; ≤60 laudasta ${yht((u) => u.alle60)}, ≤60 keskenään ${yht((u) => u.alle60uusi)}, meressä ${yht((u) => !u.maalla)}, nimiö ei mahdu ${yht((u) => !u.nimioOk)}, ilman reittiä ${yht((u) => u.airport)}, kohdekartta valmis ${yht((u) => u.kohdekartta.startsWith('valmis'))}`);
for (const u of uudet.filter((x) => x.virhe)) console.log('VIRHE', u.id, u.virhe);

if (ulosMd) {
  const r = [];
  for (const [era] of valitut) {
    r.push(`\n### ${era}\n`, '| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |', '|---|---|---|---|---|---|---|');
    for (const u of ok.filter((x) => x.era === era)) {
      const reitit = u.reitit.map((t) => `${t.korvaa ? `(korvaa ${t.korvaa}) ` : ''}${t.a}–${t.b} ${t.steps}${t.type === 'sea' ? ' meri' : ''}`).join('; ') + (u.lentoreitti ? `; ✈ ${u.lentoreitti.a}` : '');
      r.push(`| ${u.id} | ${u.x}, ${u.y} | ${u.la} ${u.lx},${u.ly}${u.nimioOk ? '' : ' ⚠'} | ${reitit || '—'} | ${u.cityCountry} / ${u.cityManner} | ${u.kohdekartta} | ${u.syyt.length ? `**kevyt**: ${u.syyt.join('; ')}` : 'pelikaupunki'} |`);
    }
  }
  writeFileSync(ulosMd, r.join('\n') + '\n');
}
