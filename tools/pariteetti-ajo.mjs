#!/usr/bin/env node
/*
 * PARITEETTIAJO — koko pariteettitaulu yhdellä komennolla (Fable 24.9.2026, omistajan
 * pyyntö: pariteetti nopeammin testattua ja korjattua, alle 15 min ilman ihmistä).
 *
 *   node tools/pariteetti-ajo.mjs [--build b12g] [--rivit 1,2,14] [--laitteet iphone,iphone-vaaka,ipad11,ipad13]
 *     [--url https://matkakirja.app/ | paikallinen] [--vain web|natiivi|vertaa] [--ulos kansio]
 *
 * 1. SAMA PELITILA: web = tools/pariteettikuvat.mjs (tallenne siemen 5 Marseillessa, --laatikot),
 *    natiivi = simulaattorin ui-/peli-komentotiedostot (tools/pariteetti-rivit.mjs, Laitetestaajan lista).
 * 2. KOOT = simulaattorien pistekoot (LAITTEET): web ajetaan täsmälleen samassa koossa.
 * 3. VERTAILU (tools/pariteetti-vertailu.mjs): webin DOM-laatikot vs natiivin UI-puu (ui puu, pisteinä)
 *    tekstiankkureilla + kuvien rakenne-ero (SSIM ja reunakartat) → SAMA / ERI (ero px) / PUUTTUU.
 * 4. TULOSTE: <ulos>/kontaktiarkki.html (web | natiivi rinnakkain) ja <ulos>/raportti.md.
 *
 * Vaiheet voi ajaa erikseen (--vain web, --vain natiivi, --vain vertaa samaan --ulos-kansioon).
 * Simulaattorit ovat Laitetestaajan: sovi vuoro ennen natiivivaihetta. Asennuksen hoitaa Natiiviseppä.
 */
import { spawn, execFile } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { RIVIT, NATIIVI_ALKU, NATIIVI_SIIVOUS, KAUPUNKI, SIEMEN } from './pariteetti-rivit.mjs';
import { skaalaa, parita, kuvaEro, tuomio, markdownTaulu, kontaktiarkki } from './pariteetti-vertailu.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const aja = promisify(execFile);
const odota = (ms) => new Promise((ok) => { setTimeout(ok, ms); });

/*
 * LAITTEET: Laitetestaajan simulaattorit (1572C658 iPhone 18 Pro, 3B4CDACB iPad Pro 13") ja
 * Pelikoodarin pariteetti-iPad11-834 (C1D5E34C, iPad Pro 11" M5; 834 × 1194 -mallia ei ole iOS 27:ssä).
 * Vaaka = sama iPhone komennolla ui kierto vaaka (Natiivi-UI 43b70aa).
 */
export const LAITTEET = {
  iphone: { udid: '1572C658-6455-4E55-8C05-3F88CB3C32F6', w: 402, h: 874, kierto: 'pysty' },
  'iphone-vaaka': { udid: '1572C658-6455-4E55-8C05-3F88CB3C32F6', w: 874, h: 402, kierto: 'vaaka' },
  ipad11: { udid: 'C1D5E34C-DFA8-4326-AD85-92B58A672AA7', w: 834, h: 1210, kierto: 'pysty' },
  ipad13: { udid: '3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D', w: 1032, h: 1376, kierto: 'pysty' },
};
const BUNDLE = 'app.matkakirja.proto3d';

// ── Argumentit ────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  if (i < 0) return oletus;
  const v = argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
};
const tuntemattomat = argv.filter((a) => a.startsWith('--')
  && !['build', 'rivit', 'laitteet', 'url', 'vain', 'ulos'].includes(a.slice(2)));
if (tuntemattomat.length) { console.error(`Tuntematon lippu: ${tuntemattomat.join(' ')}`); process.exit(2); }
const nyt = new Date();
const leima = `${nyt.toISOString().slice(0, 10)}-${String(nyt.getHours()).padStart(2, '0')}${String(nyt.getMinutes()).padStart(2, '0')}`;
const BUILD = String(arg('build', 'tuntematon'));
const ULOS = String(arg('ulos', `/Users/Shared/Claude/proto-3d/lokit/pariteetti-ajo/${BUILD}-${leima}`));
const URL_ARG = String(arg('url', 'https://matkakirja.app/'));
const VAIN = arg('vain');
const rivit = arg('rivit') ? RIVIT.filter((r) => String(arg('rivit')).split(',').includes(r.rivi)) : RIVIT;
const laitteet = String(arg('laitteet', Object.keys(LAITTEET).join(','))).split(',').map((n) => {
  if (!LAITTEET[n]) { console.error(`Tuntematon laite ${n} (${Object.keys(LAITTEET).join(', ')})`); process.exit(2); }
  return { nimi: n, ...LAITTEET[n] };
});
const WEB = join(ULOS, 'web');
const NATIIVI = join(ULOS, 'natiivi');
const KUVAT = join(ULOS, 'kuvat');
for (const k of [ULOS, WEB, NATIIVI, KUVAT]) mkdirSync(k, { recursive: true });
const koko = (l) => `${l.w}x${l.h}`;

/** sharp repon node_modulesista tai Macin tunnetusta polusta (worktreessä ei ole node_modulesia). */
async function lataaSharp() {
  for (const l of ['sharp', '/Users/Shared/Claude/Matkakirja-fable/node_modules/sharp/dist/index.mjs']) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const m = await import(l);
      return m.default ?? m;
    } catch { /* seuraava */ }
  }
  throw new Error('sharpia ei löytynyt');
}

// ── 1. Web ────────────────────────────────────────────────────────────
/*
 * Yksi pariteettikuvat-prosessi per koko, kaksi kerrallaan (Macin muisti: Fable 24.9.
 * rajasi rinnakkaiset Chromiumit). Näkymät ovat rivien web-kentät yhden kerran.
 */
async function ajaWeb() {
  const nakymat = [...new Set(rivit.map((r) => r.web).filter(Boolean))];
  const koot = [...new Set(laitteet.map(koko))];
  const jono = [...koot];
  const tyontekija = async () => {
    for (let k = jono.shift(); k; k = jono.shift()) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((ok) => {
        const p = spawn(process.execPath, [join(JUURI, 'tools/pariteettikuvat.mjs'), '--url', URL_ARG, '--laatikot',
          '--nakymat', nakymat.join(','), '--koot', k, '--ulos', WEB, '--kaupunki', KAUPUNKI, '--siemen', String(SIEMEN)],
        { stdio: ['ignore', 'pipe', 'pipe'] });
        let loki = '';
        p.stdout.on('data', (d) => { loki += d; });
        p.stderr.on('data', (d) => { loki += d; });
        p.on('close', (c) => {
          writeFileSync(join(WEB, `loki-${k}.txt`), loki);
          console.log(`web ${k}: ${c === 0 ? 'ok' : `poistui ${c}`} (${loki.match(/YHTEENVETO:[^\n]*/)?.[0] ?? '–'})`);
          ok();
        });
      });
    }
  };
  await Promise.all([tyontekija(), tyontekija()]);
}

// ── 2. Natiivi ────────────────────────────────────────────────────────
async function simctl(...a) {
  const { stdout } = await aja('xcrun', ['simctl', ...a], { maxBuffer: 1 << 24 });
  return stdout.trim();
}

/** Komentotiedoston kirjoitus: odottaa edellisen lukemista ja sitten tämän (sovellus poistaa luetun). */
async function kirjoita(dokumentit, tiedosto, rivi) {
  const polku = join(dokumentit, tiedosto);
  for (let i = 0; i < 60 && existsSync(polku); i += 1) await odota(250); // eslint-disable-line no-await-in-loop
  writeFileSync(polku, `${rivi}\n`);
  for (let i = 0; i < 60 && existsSync(polku); i += 1) await odota(200); // eslint-disable-line no-await-in-loop
  await odota(300);
}

async function askel(dokumentit, a) {
  const [laji, ...loput] = a.split(':');
  const rivi = loput.join(':');
  if (laji === 'odota') { await odota(Number(rivi) * 1000); return; }
  const tiedosto = { ui: 'ui-komento.txt', peli: 'peli-komento.txt', linssi: 'linssi-komento.txt' }[laji];
  if (!tiedosto) throw new Error(`tuntematon askel ${a}`);
  await kirjoita(dokumentit, tiedosto, rivi);
  // peli-komentojen odota-tila jatkuu sovelluksen sisällä: annetaan sille aikaa ennen seuraavaa riviä.
  const m = rivi.match(/^odota-tila \S+ (\d+)/);
  if (m) await odota(Math.min(Number(m[1]), 5) * 1000);
}

/** Yksi laite: kaikki rivit peräkkäin, kuva + UI-puu jokaisesta. */
async function ajaLaite(l) {
  const tunnus = `${l.nimi}`;
  const tulos = {};
  try { await simctl('boot', l.udid); } catch { /* jo käynnissä */ }
  await simctl('bootstatus', l.udid, '-b');
  const dokumentit = join(await simctl('get_app_container', l.udid, BUNDLE, 'data'), 'Documents');
  try { await simctl('terminate', l.udid, BUNDLE); } catch { /* ei käynnissä */ }
  await odota(1000);
  await simctl('launch', `--stdout=${join(NATIIVI, `${tunnus}-stdout.log`)}`, `--stderr=${join(NATIIVI, `${tunnus}-stderr.log`)}`, l.udid, BUNDLE);
  await odota(6000);
  await askel(dokumentit, `ui:ui kierto ${l.kierto}`);
  await odota(1500);
  let peliKaynnissa = false;
  const aloitaPeli = async () => {
    for (const a of NATIIVI_ALKU) await askel(dokumentit, a); // eslint-disable-line no-await-in-loop
    peliKaynnissa = true;
  };
  // Pelittömät rivit (portti, aloitusvalinta) ensin, sitten peli käyntiin.
  const jarjestys = [...rivit.filter((r) => !r.peli), ...rivit.filter((r) => r.peli)];
  for (const r of jarjestys) {
    const alku = Date.now();
    const nimi = `${r.rivi}-${tunnus}`;
    try {
      if (r.peli && !peliKaynnissa) await aloitaPeli(); // eslint-disable-line no-await-in-loop
      for (const a of r.natiivi) await askel(dokumentit, a); // eslint-disable-line no-await-in-loop
      const png = join(NATIIVI, `${nimi}.png`);
      await simctl('io', l.udid, 'screenshot', '--type=png', png); // eslint-disable-line no-await-in-loop
      const puu = join(dokumentit, `ui-puu-${nimi}.json`);
      rmSync(puu, { force: true });
      await kirjoita(dokumentit, 'ui-komento.txt', `ui puu ${nimi}`); // eslint-disable-line no-await-in-loop
      for (let i = 0; i < 30 && !existsSync(puu); i += 1) await odota(200); // eslint-disable-line no-await-in-loop
      if (existsSync(puu)) copyFileSync(puu, join(NATIIVI, `${nimi}.json`));
      tulos[r.rivi] = { ok: true, puu: existsSync(puu), ms: Date.now() - alku };
    } catch (e) {
      tulos[r.rivi] = { ok: false, virhe: String(e.message ?? e).split('\n')[0], ms: Date.now() - alku };
    }
    console.log(`natiivi ${tunnus} ${r.rivi.padEnd(4)} ${tulos[r.rivi].ok ? 'ok' : `VIRHE ${tulos[r.rivi].virhe}`}${tulos[r.rivi].puu === false ? ' (ei UI-puuta: ui puu puuttuu käännöksestä?)' : ''} ${(tulos[r.rivi].ms / 1000).toFixed(1)} s`);
    for (const a of NATIIVI_SIIVOUS) await askel(dokumentit, a); // eslint-disable-line no-await-in-loop
    if (r.nollaa && peliKaynnissa) {
      await askel(dokumentit, `peli:uusi-peli ${SIEMEN} ${KAUPUNKI}`); // eslint-disable-line no-await-in-loop
      await askel(dokumentit, 'peli:odota-tila Kartta 30'); // eslint-disable-line no-await-in-loop
    }
  }
  if (l.kierto !== 'pysty') await askel(dokumentit, 'ui:ui kierto pysty');
  // Omat komentolokit talteen raporttia varten.
  for (const f of ['ui-loki.txt', 'peli-loki.txt']) {
    if (existsSync(join(dokumentit, f))) copyFileSync(join(dokumentit, f), join(NATIIVI, `${tunnus}-${f}`));
  }
  return tulos;
}

async function ajaNatiivi() {
  // Sama simulaattori (iphone, iphone-vaaka) peräkkäin, eri simulaattorit rinnakkain.
  const ryhmat = new Map();
  for (const l of laitteet) ryhmat.set(l.udid, [...(ryhmat.get(l.udid) ?? []), l]);
  const tulokset = {};
  await Promise.all([...ryhmat.values()].map(async (ryhma) => {
    for (const l of ryhma) tulokset[l.nimi] = await ajaLaite(l); // eslint-disable-line no-await-in-loop
  }));
  writeFileSync(join(NATIIVI, 'tulokset.json'), JSON.stringify(tulokset, null, 2));
}

// ── 3. Vertailu ───────────────────────────────────────────────────────
const lueJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };

async function vertaa() {
  const sharp = await lataaSharp();
  const LEVEYS = 96;
  /** PNG → harmaa taulukko LEVEYS × (korkeus suhteessa), vaaka-asennon kuva käännetään tarvittaessa. */
  const harmaa = async (png, w, h) => {
    let kuva = sharp(png);
    const m = await kuva.metadata();
    if ((w > h) !== (m.width > m.height)) kuva = kuva.rotate(w > h ? 90 : -90);
    const kork = Math.round((LEVEYS * h) / w);
    const { data } = await kuva.resize(LEVEYS, kork, { fit: 'fill' }).grayscale().raw().toBuffer({ resolveWithObject: true });
    return { data, kork };
  };
  const esikatselu = async (png, kohde, w, h) => {
    let kuva = sharp(png);
    const m = await kuva.metadata();
    if ((w > h) !== (m.width > m.height)) kuva = kuva.rotate(w > h ? 90 : -90);
    await kuva.resize({ width: Math.min(w, 520) }).jpeg({ quality: 72 }).toFile(kohde);
  };
  const tulos = [];
  for (const r of rivit) {
    for (const l of laitteet) {
      const k = koko(l);
      const webPng = r.web ? join(WEB, `${r.web}-${k}.png`) : null;
      const natPng = join(NATIIVI, `${r.rivi}-${l.nimi}.png`);
      const rivi = { rivi: r.rivi, nimi: r.nimi, koko: `${l.nimi} ${k}`, tila: 'PUUTTUU', eroPx: null, syyt: [] };
      const webOk = webPng && existsSync(webPng);
      const natOk = existsSync(natPng);
      if (webOk) { rivi.webKuva = `kuvat/${r.rivi}-${l.nimi}-web.jpg`; await esikatselu(webPng, join(ULOS, rivi.webKuva), l.w, l.h); } // eslint-disable-line no-await-in-loop
      if (natOk) { rivi.natiiviKuva = `kuvat/${r.rivi}-${l.nimi}-natiivi.jpg`; await esikatselu(natPng, join(ULOS, rivi.natiiviKuva), l.w, l.h); } // eslint-disable-line no-await-in-loop
      if (!webOk || !natOk) {
        rivi.syyt.push(!webOk ? 'web-kuva puuttuu' : 'natiivikuva puuttuu');
      } else {
        const [a, b] = await Promise.all([harmaa(webPng, l.w, l.h), harmaa(natPng, l.w, l.h)]); // eslint-disable-line no-await-in-loop
        const kuva = kuvaEro(a.data, b.data, LEVEYS, a.kork);
        const web = lueJson(join(WEB, `${r.web}-${k}.json`));
        const natiivi = lueJson(join(NATIIVI, `${r.rivi}-${l.nimi}.json`));
        let t;
        if (web && natiivi) {
          t = tuomio(parita(web, skaalaa(natiivi, web)), kuva);
        } else {
          // Ilman UI-puuta (vanha käännös) tai web-laatikoita: tuomio pelkästä kuvasta.
          const sama = kuva.ssim >= 0.55 && kuva.reunat >= 0.5;
          t = { tila: sama ? 'SAMA' : 'ERI', eroPx: null, syyt: [`vain kuvavertailu (${!natiivi ? 'ei UI-puuta' : 'ei web-laatikoita'})`] };
        }
        Object.assign(rivi, t);
        rivi.syyt = [...(t.syyt ?? []), `SSIM ${kuva.ssim.toFixed(2)}, reunat ${kuva.reunat.toFixed(2)}`];
      }
      if (r.huom) rivi.syyt.push(`huom: ${r.huom}`);
      tulos.push(rivi);
    }
  }
  const otsikko = `Pariteettiajo ${BUILD} ${leima}`;
  writeFileSync(join(ULOS, 'kontaktiarkki.html'), kontaktiarkki(tulos, otsikko));
  const laske = (t) => tulos.filter((x) => x.tila === t).length;
  const md = `# ${otsikko}\n\nWeb ${URL_ARG}, natiivi ${BUILD}; tila siemen ${SIEMEN} ${KAUPUNKI}. `
    + `SAMA ${laske('SAMA')}, ERI ${laske('ERI')}, PUUTTUU ${laske('PUUTTUU')} / ${tulos.length}.\n`
    + `Kuvat ja kontaktiarkki: ${join(ULOS, 'kontaktiarkki.html')}\n\n${markdownTaulu(tulos)}\n`;
  writeFileSync(join(ULOS, 'raportti.md'), md);
  writeFileSync(join(ULOS, 'tulos.json'), JSON.stringify(tulos, null, 2));
  console.log(`vertailu: SAMA ${laske('SAMA')}, ERI ${laske('ERI')}, PUUTTUU ${laske('PUUTTUU')} / ${tulos.length}`);
}

// ── Ajo ───────────────────────────────────────────────────────────────
const alku = Date.now();
console.log(`Pariteettiajo ${BUILD}: ${rivit.length} riviä × ${laitteet.length} kokoa → ${ULOS}`);
const vaiheet = [];
if (!VAIN || VAIN === 'web') vaiheet.push(ajaWeb());
if (!VAIN || VAIN === 'natiivi') vaiheet.push(ajaNatiivi());
await Promise.all(vaiheet);
if (!VAIN || VAIN === 'vertaa') await vertaa();
console.log(`valmis ${((Date.now() - alku) / 60000).toFixed(1)} min`);
if (statSync(ULOS)) console.log(`raportti: ${join(ULOS, 'raportti.md')}`);
