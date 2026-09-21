/*
 * SAVUKE: TÄHTITAIVAS-LINSSI (Fable 21.9.2026, kolmas leikkilinssi;
 * js/linssit/tahtitaivas.js, tahtitaivas-laskenta.js, game.js
 * vastaaTahtitaivaaseen).
 *
 * Marseille, 390 ja 1400 px. Linssi myönnetään (omistus.js myonna) ja
 * avataan ui.valitseLinssi('tahdet').
 *
 * VARTIOT:
 *   1. Linssi aukeaa: portti, ✕, vivut Nyt/1873/Livia kysyy, kupu
 *      (kanvas) koko ruudun kokoinen ja piirretty (ei tyhjä), kaupunki
 *      Marseille, tähtiä nyt-tilassa > 10 ja tähdistöjä ≥ 4.
 *   2. Vipu 1873: tähtiä selvästi enemmän (≥ 3×), Horation kortti
 *      (Seulasista kuusi tähteä) kerran; tilanimi "1873".
 *   3. Sytytys: kahvan sytyta(lyhenne) sytyttää näkyvän tähdistön,
 *      kortti näyttää suomen- ja latinankielisen nimen; kanvaksen
 *      napautus tähdistön tähden kohdalle sytyttää saman.
 *   4. Veto: siirra(6 h) muuttaa näkyvien tähtien joukkoa.
 *   5. Livia kysyy: Fablen lause, 4 tähdistönimeä (oikea mukana),
 *      väärä → Fablen väärin-palaute, 0 tp; oikea (uusi kysymys) →
 *      oikein-palaute, +XP_TAHTITAIVAS tp, aid-kupla.
 *   6. Sulku ✕: kupu, kehikko ja luokat pois.
 *   7. Laukku: tahdet valmiiden rivillä Codexin webp-ikonilla.
 *   8. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-tahtitaivas.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game, XP_TAHTITAIVAS } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK  ' : 'FAIL'}  ${nimi}${ehto ? '' : ` — ${lisa}`}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js');
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400']).map((w) => (
  w === '390' ? { nimi: '390', width: 390, height: 844, dpr: 2 } : { nimi: '1400', width: 1400, height: 900, dpr: 1 }
));


for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
    isMobile: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.removeItem('matkakirja.passi.v1');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  const t = ruutu.nimi;
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    await ui.pallolauta.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1500));
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokusvirta-ohitanappi, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
    for (const d of document.querySelectorAll('dialog[open]')) d.close();
  });

  /* ── 1. avaus ───────────────────────────────────────────────────── */
  const avaus = await sivu.evaluate(async () => {
    const o = await import('/js/linssit/omistus.js');
    const { game, ui } = window.matkakirja;
    o.myonna(game, game.player, 'tahdet');
    await ui.valitseLinssi('tahdet');
    await new Promise((r) => setTimeout(r, 1500));
    const k = ui.pallolinssi?.kahva;
    const kupu = document.querySelector('canvas.tahtitaivas-kupu');
    const r = kupu?.getBoundingClientRect();
    // Piirretty: keskipisteen ympäriltä löytyy muu kuin taustaväri.
    let piirretty = false;
    try {
      const ctx = kupu.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const data = ctx.getImageData(0, 0, kupu.width, kupu.height).data;
      let kirkkaita = 0;
      for (let i = 0; i < data.length; i += 4 * 7) if (data[i] > 150 && data[i + 1] > 150) kirkkaita += 1;
      piirretty = kirkkaita > 20 && dpr > 0;
    } catch { piirretty = false; }
    const n = k?.nakyma?.();
    return {
      linssi: ui.pallolinssi?.tunnus ?? null, tila: k?.tila?.(), kaupunki: k?.kaupunki?.().n,
      kupu: Boolean(kupu), leveys: r?.width, korkeus: r?.height, piirretty,
      tahtia: n?.tahdet.length ?? 0, kuvioita: n?.kuviot.length ?? 0, magRaja: n?.magRaja,
      portti: document.body.classList.contains('aikajana-paalla'),
      sulku: Boolean(document.querySelector('.tahtitaivas-linssisulku')),
      vivut: [...document.querySelectorAll('.tahtitaivas-vivut button')].map((b) => b.textContent),
      tilaNimi: document.querySelector('.tahtitaivas-tila-nimi')?.textContent ?? '',
      aria: kupu?.getAttribute('aria-label'),
    };
  });
  tieto(`${t}: avaus`, JSON.stringify(avaus));
  vaadi(`${t}: 1. linssi aukeaa: kupu koko ruudulla ja piirretty, Marseillen taivas, vivut`,
    avaus.linssi === 'tahdet' && avaus.tila === 'nyt' && avaus.kaupunki === 'Marseille' && avaus.kupu && avaus.piirretty
      && avaus.leveys >= ruutu.width - 2 && avaus.korkeus >= ruutu.height - 2
      && avaus.tahtia > 10 && avaus.kuvioita >= 4 && avaus.magRaja === 3.5 && avaus.portti && avaus.sulku
      && avaus.vivut.join('|') === 'Nyt|1873|Livia kysyy' && /Marseille · nyt/.test(avaus.tilaNimi),
    JSON.stringify(avaus));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `tahtitaivas-nyt-${t}.png`), await sivu.screenshot());

  /* ── 2. 1873 ────────────────────────────────────────────────────── */
  const v1873 = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const ennen = k.nakyma().tahdet.length;
    k.asetaTila('1873');
    await new Promise((r) => setTimeout(r, 400));
    const n = k.nakyma();
    return {
      tila: k.tila(), ennen, jalkeen: n.tahdet.length, kuvioita: n.kuviot.length, magRaja: n.magRaja,
      horatio: document.querySelector('.tahtitaivas-kortti .tahtitaivas-puhuja')?.textContent ?? '',
      kortti: document.querySelector('.tahtitaivas-kortti .tahtitaivas-kysymys')?.textContent ?? '',
      tilaNimi: document.querySelector('.tahtitaivas-tila-nimi')?.textContent ?? '',
    };
  });
  tieto(`${t}: 1873`, JSON.stringify({ ...v1873, kortti: v1873.kortti.slice(0, 60) }));
  vaadi(`${t}: 2. vipu 1873: tähtiä ≥ 3× (valosaaste pois), Horation kortti kerran`,
    v1873.tila === '1873' && v1873.magRaja === 4.5 && v1873.jalkeen >= 3 * v1873.ennen && v1873.jalkeen > 100
      && /^Horatio/.test(v1873.horatio) && /Seulasista kuusi tähteä/.test(v1873.kortti) && /· 1873 ·/.test(v1873.tilaNimi),
    JSON.stringify(v1873));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `tahtitaivas-1873-${t}.png`), await sivu.screenshot());
  await sivu.evaluate(() => document.querySelector('.tahtitaivas-kortti .tahtitaivas-sulje-kortti')?.click());

  /* ── 3. sytytys ─────────────────────────────────────────────────── */
  const sytytys = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const n = k.nakyma();
    const kuvio = n.kuviot.find((x) => x.pisteet.length >= 4 && x.pisteet.every((p) => p.h > 10)) ?? n.kuviot[0];
    const ok = k.sytyta(kuvio.kuvio.lyhenne);
    await new Promise((r) => setTimeout(r, 200));
    const sytytettyKahvasta = k.sytytetty()?.lyhenne;
    k.sytyta('XXX');
    // Napautus kanvakselle tähden kohdalle.
    const p = kuvio.pisteet.find((x) => x.h > 10);
    const kupu = document.querySelector('canvas.tahtitaivas-kupu');
    const r = kupu.getBoundingClientRect();
    const ev = (tyyppi) => kupu.dispatchEvent(new PointerEvent(tyyppi, { clientX: r.left + p.x, clientY: r.top + p.y, pointerId: 1, bubbles: true, isPrimary: true }));
    ev('pointerdown'); ev('pointerup');
    await new Promise((r2) => setTimeout(r2, 200));
    return {
      ok, sytytettyKahvasta, odotettu: kuvio.kuvio.lyhenne, napautuksesta: k.sytytetty()?.lyhenne,
      otsikko: document.querySelector('.tahtitaivas-kortti .tahtitaivas-puhuja')?.textContent ?? '',
      latina: document.querySelector('.tahtitaivas-kortti .tahtitaivas-latina')?.textContent ?? '',
      suomi: kuvio.kuvio.suomi, latinaNimi: kuvio.kuvio.latina,
    };
  });
  tieto(`${t}: sytytys`, JSON.stringify(sytytys));
  vaadi(`${t}: 3. tähdistö syttyy kahvasta ja napautuksesta, kortti näyttää nimen suomeksi ja latinaksi`,
    sytytys.ok && sytytys.sytytettyKahvasta === sytytys.odotettu && sytytys.napautuksesta === sytytys.odotettu
      && sytytys.otsikko === sytytys.suomi && sytytys.latina.includes(sytytys.latinaNimi),
    JSON.stringify(sytytys));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `tahtitaivas-sytytys-${t}.png`), await sivu.screenshot());

  /* ── 4. veto ────────────────────────────────────────────────────── */
  const veto = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const ennen = new Set(k.nakyma().tahdet.map((s) => s.hr));
    k.siirra(6);
    const jalkeen = new Set(k.nakyma().tahdet.map((s) => s.hr));
    let eri = 0;
    for (const hr of jalkeen) if (!ennen.has(hr)) eri += 1;
    k.siirra(-6);
    return { ennen: ennen.size, jalkeen: jalkeen.size, uusia: eri, tilaNimi: document.querySelector('.tahtitaivas-tila-nimi')?.textContent ?? '' };
  });
  tieto(`${t}: veto`, JSON.stringify(veto));
  vaadi(`${t}: 4. taivaan kääntö 6 h tuo uusia tähtiä horisontin yli`, veto.uusia > 20, JSON.stringify(veto));

  /* ── 5. Livia kysyy ─────────────────────────────────────────────── */
  const kysymys = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const xp0 = game.player.xp ?? 0;
    k.kysy();
    await new Promise((r) => setTimeout(r, 300));
    const q1 = k.kysymys();
    const kortti = document.querySelector('.tahtitaivas-kortti');
    const puhuja = kortti?.querySelector('.tahtitaivas-puhuja')?.textContent ?? '';
    const teksti = kortti?.querySelector('.tahtitaivas-kysymys')?.textContent ?? '';
    const napit = [...kortti.querySelectorAll('.tahtitaivas-valinnat button')].map((b) => b.dataset.tahdisto);
    const nimet = [...kortti.querySelectorAll('.tahtitaivas-valinnat button')].map((b) => b.textContent);
    const vaara = napit.find((l) => l !== q1.oikea.kuvio.lyhenne);
    kortti.querySelector(`.tahtitaivas-valinnat button[data-tahdisto="${vaara}"]`).click();
    await new Promise((r) => setTimeout(r, 300));
    const palauteVaarin = kortti.querySelector('.tahtitaivas-palaute')?.textContent ?? '';
    const xpVaarin = (game.player.xp ?? 0) - xp0;
    kortti.querySelector('.tahtitaivas-sulje-kortti')?.click();
    await new Promise((r) => setTimeout(r, 200));
    k.kysy();
    await new Promise((r) => setTimeout(r, 300));
    const q2 = k.kysymys();
    document.querySelector(`.tahtitaivas-kortti .tahtitaivas-valinnat button[data-tahdisto="${q2.oikea.kuvio.lyhenne}"]`).click();
    await new Promise((r) => setTimeout(r, 300));
    const palauteOikein = document.querySelector('.tahtitaivas-palaute')?.textContent ?? '';
    const xpOikein = (game.player.xp ?? 0) - xp0 - xpVaarin;
    const kupla = game.events.find((e) => e.tilanne === 'peli.tahtitaivas.oikein');
    return {
      puhuja, teksti, napit, nimet, oikea: q1.oikea.kuvio.suomi, sisaltaaOikean: napit.includes(q1.oikea.kuvio.lyhenne),
      nimiKysymyksessa: teksti.includes(q1.oikea.kuvio.suomi), palauteVaarin, xpVaarin,
      oikea2: q2.oikea.kuvio.suomi, eri: q2.oikea.kuvio.lyhenne !== q1.oikea.kuvio.lyhenne, palauteOikein, xpOikein, kupla: Boolean(kupla),
      sytytetty: k.sytytetty()?.lyhenne, odotettu2: q2.oikea.kuvio.lyhenne,
    };
  });
  tieto(`${t}: kysymys`, JSON.stringify(kysymys));
  vaadi(`${t}: 5. Livia kysyy: Fablen lause ilman nimeä, 4 tähdistöä, väärä 0 tp, oikea +${XP_TAHTITAIVAS} tp`,
    kysymys.puhuja === 'Livia'
      && /(sytytin sinulle yhden tähdistön|nimennyt tämän latinaksi|katulamput sammuttaa)/.test(kysymys.teksti)
      && !kysymys.nimiKysymyksessa && kysymys.napit.length === 4 && kysymys.sisaltaaOikean
      && kysymys.palauteVaarin === `Ei, se on ${kysymys.oikea}. Katso viivoja vielä kerran, ensi yönä tunnistat sen.`
      && kysymys.xpVaarin === 0 && kysymys.eri
      && kysymys.palauteOikein === `Aivan, ${kysymys.oikea2}. Sen alla lentää kotiin vaikka silmät kiinni. (+${XP_TAHTITAIVAS} tp)`
      && kysymys.xpOikein === XP_TAHTITAIVAS && kysymys.kupla && kysymys.sytytetty === kysymys.odotettu2,
    JSON.stringify(kysymys));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `tahtitaivas-livia-${t}.png`), await sivu.screenshot());

  /* ── 6. sulku ───────────────────────────────────────────────────── */
  const sulku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.tahtitaivas-linssisulku')?.click();
    await new Promise((r) => setTimeout(r, 1200));
    return {
      linssi: ui.pallolinssi, valittu: ui.linssiValittu ?? null,
      kupu: Boolean(document.querySelector('.tahtitaivas-kupu')),
      kehikko: Boolean(document.querySelector('.tahtitaivas-kehikko, .tahtitaivas-linssisulku')),
      luokat: ['aikajana-paalla', 'aikajana-palkki-auki'].filter((l) => document.body.classList.contains(l)),
    };
  });
  tieto(`${t}: sulku`, JSON.stringify(sulku));
  vaadi(`${t}: 6. sulku ✕: kupu, kehikko ja luokat pois`,
    sulku.linssi === null && !sulku.valittu && !sulku.kupu && !sulku.kehikko && sulku.luokat.length === 0,
    JSON.stringify(sulku));

  /* ── 7. laukku ──────────────────────────────────────────────────── */
  const laukku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.openPassport();
    await new Promise((r) => setTimeout(r, 800));
    const nappi = document.querySelector('.linssi-valikko button[data-linssi="tahdet"]');
    return { loytyy: Boolean(nappi), hiomassa: Boolean(nappi?.closest('.linssi-liuskat-hiomassa')), kuva: nappi?.querySelector('img')?.getAttribute('src') ?? null };
  });
  tieto(`${t}: laukku`, JSON.stringify(laukku));
  vaadi(`${t}: 7. laukku: tahdet valmiiden rivillä Codexin webp-ikonilla`,
    laukku.loytyy && !laukku.hiomassa && laukku.kuva === 'assets/linssit/ikonit/linssi-tahdet.webp',
    JSON.stringify(laukku));

  vaadi(`${t}: 8. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
