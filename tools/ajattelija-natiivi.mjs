/*
 * AJATTELIJAT NATIIVIIN ILMAN WEBIÄ (omistaja 3.10.2026 klo 19.00: "Ei webiä lainkaan"; Pelikoodari ja Linssiseppä 2).
 * Lähteet:
 *   data/ajattelijat/<tunnus>.json — käsin kirjoitettu sisältö (lainaukset, fontit, taustavirta, prologi, kaiut, ääni …);
 *     aikajana.luvut kertoo, mistä Linnanrakentajan luvut ja millä asetuksilla aikajana generoidaan.
 *   Linnanrakentajan luvut (sokrates_bysti.py --luvut): git-versiosta (aikajana.luvut.versio:tiedosto) tai --luvut.
 * Tulos natiivin kansioon (proto Assets/Matkakirja/Linssit/Resources/Ajattelijat/): <tunnus>.json samassa skeemassa
 * kuin aiempi webistä tehty (tyokalut/ajattelijat-natiiviin.mjs) ja tekstiatlas <tunnus>-atlas.bytes (harmaasävy-PNG),
 * Unityn .meta-tiedostot uusille. Atlas piirretään Chromiumissa (tools/ajattelija-atlas-selain.js) samoilla OFL-fonteilla.
 *
 *   node tools/ajattelija-natiivi.mjs --ulos <proto/…/Ajattelijat> [--luvut <tunnus>=<luvut.json> …] [tunnus …]
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { deflateSync, crc32 } from 'node:zlib';
import { randomUUID } from 'node:crypto';
import { aikajanaLuvuista } from './ajattelija-aikajana-luvut.mjs';
import { avaaChromium } from './selain.mjs';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const A = process.argv.slice(2);
const arvo = (lippu) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : null);
const ULOS = arvo('--ulos');
if (!ULOS) { console.error('käyttö: node tools/ajattelija-natiivi.mjs --ulos <kansio> [--luvut tunnus=polku …] [tunnus …]'); process.exit(2); }
const lutuPolut = Object.fromEntries(A.flatMap((x, i) => (A[i - 1] === '--luvut' ? [x.split('=')] : [])));
const liput = new Set(['--ulos', '--luvut']);
const valitut = A.filter((x, i) => !x.startsWith('--') && !liput.has(A[i - 1]));
mkdirSync(ULOS, { recursive: true });

const DATA = join(JUURI, 'data/ajattelijat');
const kohteet = readdirSync(DATA).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5))
  .filter((t) => !valitut.length || valitut.includes(t));
if (!kohteet.length) { console.error('ei ajattelijoita', valitut); process.exit(1); }

/** Sisältö + aikajana luvuista (generoitu osa ensin, sitten sisällön omat aikajana-asetukset kuten webissä). */
function kokoa(tunnus) {
  const s = JSON.parse(readFileSync(join(DATA, `${tunnus}.json`), 'utf8'));
  const { luvut, ...omat } = s.aikajana ?? {};
  if (!luvut) return s;
  const teksti = lutuPolut[tunnus] ? readFileSync(lutuPolut[tunnus], 'utf8')
    : execFileSync('git', ['show', `${luvut.versio}:${luvut.tiedosto}`], { cwd: JUURI, encoding: 'utf8', maxBuffer: 64 << 20 });
  const d = JSON.parse(teksti);
  const gen = aikajanaLuvuista(d, {
    kaiut: luvut.kaiut, savu: luvut.savu, savuYdin: luvut.savuYdin, paalauseet: luvut.paalauseet ?? {},
    lahde: luvut.tiedosto, lahdeNimi: `${luvut.haara} ${luvut.versio} ${luvut.tiedosto}`,
  });
  /*
   * Kaikukuvien lähteet (Linnanrakentajan luvut v13.kaiut[].lahde = {kohde, teos, tekija, lisenssi, lahde, nimea?};
   * Päätoimittaja 4.10.2026: kaikki kaikukuvat pelin lähteisiin). Natiivi lukee juuren kuvalahteet-kentän
   * (AjattelijaData.Kuvalahteet); nimea on CC BY / BY-SA -kuvan pakollinen maininta.
   */
  const kuvalahteet = (d.v13?.kaiut ?? []).filter((k) => k.lahde).map((k) => ({ kuva: k.kuva, ...k.lahde }));
  return { ...s, aikajana: { ...gen, ...omat }, ...(kuvalahteet.length ? { kuvalahteet } : {}) };
}

/*
 * Atlaksen rivit kuten webin avaaAjattelija (#3902): päälause 192 px sumealla parilla (aikajana-tilassa käyttämätön 16 px:n
 * paikkamerkki), taustavirran rivit toistona (pehmeät: sumeus em-osuutena × projektorin pehmeys, kirjaimet
 * 1 / riviTila -kokoisina riviKorkeus-nauhassa), kierrosten 2– päälauseet ja aikajanan lainaukset (lauseKortti-tilassa
 * monirivisinä kortteina, 128 px yhdelle tekstiriville, ei sumeaa paria). Natiivi: kierroksen/lainauksen j rivi = 1 + rivit + j.
 */
function korttiRivit(teksti, merkkeja) {
  const sanat = teksti.split(/\s+/);
  const n = Math.max(1, Math.ceil(teksti.length / merkkeja));
  const tavoite = teksti.length / n;
  const rivit = [''];
  for (const sana of sanat) {
    const nyt = rivit.at(-1);
    if (nyt && nyt.length + 1 + sana.length > tavoite + 4 && rivit.length < n) rivit.push(sana);
    else rivit[rivit.length - 1] = nyt ? `${nyt} ${sana}` : sana;
  }
  return rivit;
}
function atlasRivit(a) {
  const fontti = (n) => a.fontit[n] ?? a.fontit.iowan;
  const AJ = a.aikajana ?? null;
  const KR = AJ ? null : (a.kierrokset ?? null);
  const tv = a.taustavirta;
  const lauseRivi = (l) => ({ teksti: l.fi, fontti: fontti('iowan').perhe, paino: fontti('iowan').paino, korkeus: 192, sumea: true, emOsuus: 1.15 });
  const KORTTI = AJ?.lauseKortti ?? null;
  const lauseKortti = (l) => ({ ...lauseRivi(l), korkeus: 128, sumea: false, kortti: korttiRivit(l.fi, KORTTI.merkkeja), emOsuus: 1.0 });
  const TILA = tv.riviTila ?? 1;
  const riviProjektori = tv.projektorit.flatMap((pj) => Array(pj.riveja).fill(pj));
  return [
    AJ ? { ...lauseRivi(a.paalauseet[a.kierros.paalause]), korkeus: 16, sumea: false } : lauseRivi(a.paalauseet[a.kierros.paalause]),
    ...tv.rivit.map(([, f, teksti], ri) => ({
      teksti, fontti: fontti(f).perhe, paino: fontti(f).paino, korkeus: tv.riviKorkeus ?? 96, toisto: true,
      emOsuus: 1 / TILA, sumeus: tv.sumeus && tv.sumeus * (riviProjektori[ri]?.pehmeys ?? 1),
    })),
    ...(KR?.lista ?? []).map((k) => lauseRivi(a.paalauseet[k.paalause])),
    ...(AJ?.tykit ?? []).map((t) => (KORTTI ? lauseKortti : lauseRivi)(a.paalauseet[t.paalause])),
  ];
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.ttf': 'font/ttf', '.otf': 'font/otf' };
// Ämpärin fontit (data fontit[nimi].tiedosto) paikallisesta OFL-kansiosta tiedostonimellä.
const FONTIT = process.env.FONTIT ?? '/Users/Shared/Claude/proto-3d/_lahteet/fontit-kreikka';
function etsiFontti(nimi, kansio = FONTIT) {
  for (const e of readdirSync(kansio, { withFileTypes: true })) {
    const p = join(kansio, e.name);
    if (e.isDirectory()) { const l = etsiFontti(nimi, p); if (l) return l; } else if (e.name === nimi) return p;
  }
  return null;
}
const palvelin = createServer((q, s) => {
  const polku = decodeURIComponent(q.url.split('?')[0]);
  if (polku.startsWith('/__fontti/')) {
    const f = etsiFontti(polku.slice('/__fontti/'.length));
    if (!f) { s.writeHead(404); s.end(); return; }
    s.writeHead(200, { 'content-type': MIME[extname(f)] ?? 'application/octet-stream' }); s.end(readFileSync(f)); return;
  }
  if (polku === '/') { s.writeHead(200, { 'content-type': MIME['.html'] }); s.end('<!doctype html><meta charset="utf-8"><body></body>'); return; }
  if (polku === '/atlas.js') {
    s.writeHead(200, { 'content-type': MIME['.js'] }); s.end(readFileSync(join(JUURI, 'tools/ajattelija-atlas-selain.js'))); return;
  }
  s.writeHead(404); s.end();
});
await new Promise((r) => palvelin.listen(0, '127.0.0.1', r));
// Ohjelmistopiirto ilman GPU-lippuja (cpu: true): atlas on sama tavu tavulta kuin aiemmalla muuntimella.
const selain = await avaaChromium({}, { cpu: true });
const sivu = await selain.newPage();
await sivu.goto(`http://127.0.0.1:${palvelin.address().port}/`);

/** 8-bittinen harmaasävy-PNG (värityyppi 0) R-kanavasta. */
function harmaaPng(lev, kork, r) {
  const rivi = lev + 1;
  const raaka = Buffer.alloc(rivi * kork);
  for (let y = 0; y < kork; y += 1) { raaka[y * rivi] = 0; r.copy(raaka, y * rivi + 1, y * lev, (y + 1) * lev); }
  const pala = (tyyppi, data) => {
    const p = Buffer.alloc(4); p.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(tyyppi, 'ascii'), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([p, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(lev, 0); ihdr.writeUInt32BE(kork, 4); ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), pala('IHDR', ihdr), pala('IDAT', deflateSync(raaka, { level: 9 })), pala('IEND', Buffer.alloc(0))]);
}

function varmistaMeta(tiedosto) {
  const meta = `${tiedosto}.meta`;
  if (existsSync(meta)) return;
  writeFileSync(meta, `fileFormatVersion: 2\nguid: ${randomUUID().replace(/-/g, '')}\nTextScriptImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`);
}

for (const tunnus of kohteet) {
  const a = kokoa(tunnus);
  // Fontit FontFacena ennen atlasta; puuttuva fontti on virhe, ei hiljainen varafontti.
  const fontit = [...new Set(a.taustavirta.rivit.map(([, f]) => f))].map((n) => a.fontit[n]).filter((f) => f?.tiedosto)
    .map((f) => ({ perhe: f.perhe.split(',')[0].replace(/"/g, '').trim(), url: `/__fontti/${f.tiedosto.split('/').pop()}` }));
  const tulos = await sivu.evaluate(async ([rivit, fontit]) => {
    const { piirraAtlas } = await import('/atlas.js');
    for (const f of fontit) document.fonts.add(await new FontFace(f.perhe, `url(${f.url})`).load());
    await document.fonts.ready;
    const { kangas, paikat } = piirraAtlas(rivit);
    const d = kangas.getContext('2d').getImageData(0, 0, kangas.width, kangas.height).data;
    const r = new Uint8Array(kangas.width * kangas.height);
    for (let i = 0; i < r.length; i += 1) r[i] = d[i * 4];
    let b = '';
    for (let i = 0; i < r.length; i += 0x8000) b += String.fromCharCode(...r.subarray(i, i + 0x8000));
    return { leveys: kangas.width, korkeus: kangas.height, paikat: paikat.map(({ y, korkeus, lev, uMax, sumea, toistoja, kortti }) => ({ y, korkeus, lev, uMax, sumea: !!sumea, toistoja: toistoja ?? 1, ...(kortti ? { kortti } : {}) })), r: btoa(b) };
  }, [atlasRivit(a), fontit]);
  const png = harmaaPng(tulos.leveys, tulos.korkeus, Buffer.from(tulos.r, 'base64'));
  const atlasTiedosto = join(ULOS, `${tunnus}-atlas.bytes`);
  writeFileSync(atlasTiedosto, png);
  varmistaMeta(atlasTiedosto);
  // kuvalahteet viimeisenä kenttänä atlaksen jälkeen (natiivin proto 4f8456c6 -muoto, tavu tavulta).
  const { kuvalahteet, ...muut } = a;
  const data = {
    ...muut, atlas: { tiedosto: `Ajattelijat/${tunnus}-atlas`, leveys: tulos.leveys, korkeus: tulos.korkeus, paikat: tulos.paikat },
    ...(kuvalahteet ? { kuvalahteet } : {}),
  };
  const json = join(ULOS, `${tunnus}.json`);
  writeFileSync(json, `${JSON.stringify(data, null, 1)}\n`);
  varmistaMeta(json);
  console.log(`${tunnus}: ${json}, fontit ${fontit.map((f) => f.perhe).join(', ') || '-'}, atlas ${tulos.leveys}×${tulos.korkeus} (${(png.length / 1024).toFixed(0)} kt, ${tulos.paikat.length} riviä)`);
}
await selain.close();
palvelin.close();
