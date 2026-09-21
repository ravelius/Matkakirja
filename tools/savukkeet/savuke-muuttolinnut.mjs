/*
 * SAVUKE: MUUTTOLINNUT-LINSSI (Fable 21.9.2026, neljäs leikkilinssi;
 * js/linssit/muuttolinnut.js, muuttolinnut-laskenta.js,
 * js/packs/linssi-muuttolinnut.js, game.js vastaaMuuttolintuihin).
 *
 * Marseille, 390 ja 1400 px. Linssi myönnetään (omistus.js myonna) ja
 * avataan ui.valitseLinssi('muuttolinnut').
 *
 * VARTIOT:
 *   1. Linssi aukeaa: portti, ✕, vivut (◀ kuukausi ▶, Horatio, Livia
 *      kysyy), 6 reittipolkua ja 6 parvea pallolla, kuukausi = tämä
 *      kuukausi, tilarivi kertoo perillä/matkalla.
 *   2. Kuukauden selaus: heinäkuussa kaikki 6 parvea Suomessa
 *      (paikallaan), tammikuussa yksikään ei Suomessa; parvi siirtyy
 *      (lat muuttuu) kuukausien välillä.
 *   3. Lajin kortti: avaaLaji('kurki') → kortti nimellä, latinalla,
 *      tunnusluvuilla (km, km/h) ja Fablen huomiolla; parvi korostuu.
 *   4. Horatio-nappi → kortti "163 astetta".
 *   5. Livia kysyy: Fablen lause lajin nimellä ja kuukaudella, kuukausi
 *      vaihtuu kysyttyyn, kysytyn lajin parvi piilossa, maat
 *      polygoneina (135); väärä maa → Fablen väärin-palaute, 0 tp,
 *      värit; oikea (uusi kysymys) → oikein-palaute, +XP_MUUTTOLINNUT
 *      tp, aid-kupla; kortin sulku palauttaa parven ja poistaa maat.
 *   6. Sulku ✕: polut, parvet, kehikko ja luokat pois.
 *   7. Laukku: muuttolinnut valmiiden rivillä Codexin webp-ikonilla.
 *   8. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-muuttolinnut.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game, XP_MUUTTOLINNUT } from '../../js/game.js';
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
    o.myonna(game, game.player, 'muuttolinnut');
    await ui.valitseLinssi('muuttolinnut');
    await new Promise((r) => setTimeout(r, 1800));
    const k = ui.pallolinssi?.kahva;
    const pallo = ui.pallolauta.pallo;
    return {
      linssi: ui.pallolinssi?.tunnus ?? null, kuukausi: k?.kuukausi?.(), nyt: new Date().getMonth(),
      polkuja: pallo.pathsData().filter((d) => String(d.avain ?? '').startsWith('reitti:')).length,
      parvia: document.querySelectorAll('.muuttolinnut-parvi:not(.pallolauta-poistuu)').length,
      portti: document.body.classList.contains('aikajana-paalla'),
      sulku: Boolean(document.querySelector('.muuttolinnut-linssisulku')),
      vivut: [...document.querySelectorAll('.muuttolinnut-vivut button')].map((b) => b.textContent),
      tilaNimi: document.querySelector('.muuttolinnut-tila-nimi')?.textContent ?? '',
      kuukausiNimi: document.querySelector('.muuttolinnut-kuukausi')?.textContent ?? '',
    };
  });
  tieto(`${t}: avaus`, JSON.stringify(avaus));
  vaadi(`${t}: 1. linssi aukeaa: 6 reittiä ja 6 parvea, kuukausi tästä hetkestä, vivut`,
    avaus.linssi === 'muuttolinnut' && avaus.kuukausi === avaus.nyt && avaus.polkuja === 6 && avaus.parvia === 6
      && avaus.portti && avaus.sulku && avaus.vivut.join('|') === '◀|▶|Horatio|Livia kysyy'
      && /Muuttolinnut · .* · \d\/6 parvea perillä, \d matkalla/.test(avaus.tilaNimi) && avaus.kuukausiNimi.length > 3,
    JSON.stringify(avaus));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `muuttolinnut-nyt-${t}.png`), await sivu.screenshot());

  /* ── 2. kuukauden selaus ────────────────────────────────────────── */
  const selaus = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const datumit = () => ui.pallolauta.merkit.napautettavat().filter((d) => String(d.avain).startsWith('parvi:'));
    k.asetaKuukausi(6); // heinäkuu
    await new Promise((r) => setTimeout(r, 300));
    const heina = datumit().map((d) => ({ laji: d.tunnus, lat: d.lat, paikallaan: d.paikallaan, paikka: d.paikanNimi }));
    k.asetaKuukausi(0); // tammikuu
    await new Promise((r) => setTimeout(r, 300));
    const tammi = datumit().map((d) => ({ laji: d.tunnus, lat: d.lat, paikallaan: d.paikallaan, paikka: d.paikanNimi }));
    const nimi = document.querySelector('.muuttolinnut-kuukausi')?.textContent;
    document.querySelector('.muuttolinnut-vivut .muuttolinnut-seuraava')?.click();
    await new Promise((r) => setTimeout(r, 200));
    return { heina, tammi, nimi, napinJalkeen: k.kuukausi() };
  });
  tieto(`${t}: selaus`, JSON.stringify(selaus));
  vaadi(`${t}: 2. heinäkuussa kaikki parvet Suomessa paikallaan, tammikuussa etelässä; napit selaavat`,
    selaus.heina.length === 6 && selaus.heina.every((p) => p.paikallaan && p.lat > 59)
      && selaus.tammi.length === 6 && selaus.tammi.every((p) => p.lat < 56)
      && selaus.nimi === 'tammikuu' && selaus.napinJalkeen === 1,
    JSON.stringify(selaus));

  /* ── 3. lajin kortti ────────────────────────────────────────────── */
  const laji = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    k.avaaLaji('kurki');
    await new Promise((r) => setTimeout(r, 300));
    const kortti = document.querySelector('.muuttolinnut-kortti');
    return {
      otsikko: kortti?.querySelector('.muuttolinnut-puhuja')?.textContent ?? '',
      huomio: kortti?.querySelector('.muuttolinnut-kysymys')?.textContent ?? '',
      latina: kortti?.querySelector('.muuttolinnut-latina')?.textContent ?? '',
      luvut: [...kortti.querySelectorAll('dd')].map((d) => d.textContent),
      korostettu: document.querySelector('.muuttolinnut-parvi[data-laji="kurki"]')?.classList.contains('muuttolinnut-valittu'),
    };
  });
  tieto(`${t}: laji`, JSON.stringify(laji));
  vaadi(`${t}: 3. lajin kortti: nimi, latina, tunnusluvut ja Fablen huomio; parvi korostuu`,
    laji.otsikko === 'Kurki' && /auran muodossa/.test(laji.huomio) && /Grus grus/.test(laji.latina)
      && laji.luvut.some((v) => /km$/.test(v) && /5/.test(v)) && laji.luvut.some((v) => /km\/h/.test(v)) && laji.korostettu,
    JSON.stringify(laji));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `muuttolinnut-laji-${t}.png`), await sivu.screenshot());
  await sivu.evaluate(() => document.querySelector('.muuttolinnut-kortti button:last-of-type')?.click());

  /* ── 4. Horatio ─────────────────────────────────────────────────── */
  const horatio = await sivu.evaluate(async () => {
    document.querySelector('.muuttolinnut-vivut .muuttolinnut-horatio')?.click();
    await new Promise((r) => setTimeout(r, 200));
    const k = document.querySelector('.muuttolinnut-kortti');
    const ulos = { puhuja: k?.querySelector('.muuttolinnut-puhuja')?.textContent ?? '', teksti: k?.querySelector('.muuttolinnut-kysymys')?.textContent ?? '' };
    k?.querySelector('button')?.click();
    return ulos;
  });
  vaadi(`${t}: 4. Horation kortti: kurkiaura, 163 astetta`, /^Horatio/.test(horatio.puhuja) && /163 astetta/.test(horatio.teksti), JSON.stringify(horatio));

  /* ── 5. Livia kysyy ─────────────────────────────────────────────── */
  const kysymys = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const pallo = ui.pallolauta.pallo;
    const maat = () => pallo.polygonsData().filter((d) => String(d.avain ?? '').startsWith('maa:'));
    const xp0 = game.player.xp ?? 0;
    k.kysy();
    await new Promise((r) => setTimeout(r, 500));
    const q1 = k.kysymys();
    const kortti = document.querySelector('.muuttolinnut-kortti');
    const puhuja = kortti?.querySelector('.muuttolinnut-puhuja')?.textContent ?? '';
    const teksti = kortti?.querySelector('.muuttolinnut-kysymys')?.textContent ?? '';
    const parviPiilossa = !document.querySelector(`.muuttolinnut-parvi[data-laji="${q1.laji.tunnus}"]:not(.pallolauta-poistuu)`);
    const maita = maat().length;
    const kuukausi = k.kuukausi();
    const vaara = q1.maa === 'FIN' ? 'SWE' : 'FIN';
    k.vastaa(vaara);
    await new Promise((r) => setTimeout(r, 400));
    const varit = Object.fromEntries(maat().filter((d) => [`maa:${q1.maa}`, `maa:${vaara}`].includes(d.avain)).map((d) => [d.avain.slice(4), d.vari]));
    const palauteVaarin = document.querySelector('.muuttolinnut-palaute')?.textContent ?? '';
    const xpVaarin = (game.player.xp ?? 0) - xp0;
    kortti.querySelector('.muuttolinnut-kortti button:last-of-type')?.click();
    await new Promise((r) => setTimeout(r, 500));
    const maitaJalkeen = maat().length;
    const parviTakaisin = Boolean(document.querySelector(`.muuttolinnut-parvi[data-laji="${q1.laji.tunnus}"]`));
    k.kysy();
    await new Promise((r) => setTimeout(r, 400));
    const q2 = k.kysymys();
    k.vastaa(q2.maa);
    await new Promise((r) => setTimeout(r, 400));
    const palauteOikein = document.querySelector('.muuttolinnut-palaute')?.textContent ?? '';
    const xpOikein = (game.player.xp ?? 0) - xp0 - xpVaarin;
    const kupla = game.events.find((e) => e.tilanne === 'peli.muuttolinnut.oikein');
    const nimi = (iso) => game.pack.map.countryShapes[iso]?.nimi;
    document.querySelector('.muuttolinnut-kortti button:last-of-type')?.click();
    await new Promise((r) => setTimeout(r, 300));
    return {
      puhuja, teksti, laji: q1.laji.nimi, maa: q1.maa, maanNimi: nimi(q1.maa), kuukausiKysytty: q1.kuukausi, kuukausi,
      parviPiilossa, maita, vaara, varit, palauteVaarin, xpVaarin, maitaJalkeen, parviTakaisin,
      laji2: q2.laji.nimi, maa2: nimi(q2.maa), eri: q2.laji.tunnus !== q1.laji.tunnus, palauteOikein, xpOikein, kupla: Boolean(kupla),
    };
  });
  tieto(`${t}: kysymys`, JSON.stringify(kysymys));
  vaadi(`${t}: 5. Livia kysyy: Fablen lause lajilla ja kuukaudella, parvi piilossa, maat pallolla, väärä 0 tp, oikea +${XP_MUUTTOLINNUT} tp`,
    kysymys.puhuja === 'Livia' && kysymys.teksti.includes(kysymys.laji) && /kuussa/.test(kysymys.teksti)
      && /(en pysähdy syömään|muuttolinnulla kaksi|laski kurkiauran)/.test(kysymys.teksti)
      && kysymys.kuukausi === kysymys.kuukausiKysytty && kysymys.parviPiilossa && kysymys.maita >= 130
      && kysymys.varit[kysymys.maa] === 'rgba(46, 107, 46, 0.35)' && kysymys.varit[kysymys.vaara] === 'rgba(176, 34, 34, 0.35)'
      && kysymys.palauteVaarin === `Ei, ${kysymys.maanNimi}. Parvi ei eksy, sinä eksyit. Katso reitti vielä kerran.`
      && kysymys.xpVaarin === 0 && kysymys.maitaJalkeen === 0 && kysymys.parviTakaisin && kysymys.eri
      && kysymys.palauteOikein === `Aivan, ${kysymys.maa2}. Sinne minäkin lentäisin, jos joku kantaisi eväät. (+${XP_MUUTTOLINNUT} tp)`
      && kysymys.xpOikein === XP_MUUTTOLINNUT && kysymys.kupla,
    JSON.stringify(kysymys));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `muuttolinnut-livia-${t}.png`), await sivu.screenshot());

  /* ── 6. sulku ───────────────────────────────────────────────────── */
  const sulku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.muuttolinnut-linssisulku')?.click();
    await new Promise((r) => setTimeout(r, 1500));
    const pallo = ui.pallolauta.pallo;
    return {
      linssi: ui.pallolinssi, valittu: ui.linssiValittu ?? null,
      parvia: document.querySelectorAll('.muuttolinnut-parvi').length,
      polkuja: pallo.pathsData().filter((d) => String(d.avain ?? '').startsWith('reitti:')).length,
      maita: pallo.polygonsData().filter((d) => String(d.avain ?? '').startsWith('maa:')).length,
      kehikko: Boolean(document.querySelector('.muuttolinnut-kehikko, .muuttolinnut-linssisulku')),
      luokat: ['aikajana-paalla', 'aikajana-palkki-auki'].filter((l) => document.body.classList.contains(l)),
    };
  });
  tieto(`${t}: sulku`, JSON.stringify(sulku));
  vaadi(`${t}: 6. sulku ✕: polut, parvet, maat, kehikko ja luokat pois`,
    sulku.linssi === null && !sulku.valittu && sulku.parvia === 0 && sulku.polkuja === 0 && sulku.maita === 0 && !sulku.kehikko && sulku.luokat.length === 0,
    JSON.stringify(sulku));

  /* ── 7. laukku ──────────────────────────────────────────────────── */
  const laukku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.openPassport();
    await new Promise((r) => setTimeout(r, 800));
    const nappi = document.querySelector('.linssi-valikko button[data-linssi="muuttolinnut"]');
    return { loytyy: Boolean(nappi), hiomassa: Boolean(nappi?.closest('.linssi-liuskat-hiomassa')), kuva: nappi?.querySelector('img')?.getAttribute('src') ?? null };
  });
  tieto(`${t}: laukku`, JSON.stringify(laukku));
  vaadi(`${t}: 7. laukku: muuttolinnut valmiiden rivillä Codexin webp-ikonilla`,
    laukku.loytyy && !laukku.hiomassa && laukku.kuva === 'assets/linssit/ikonit/linssi-muuttolinnut.webp',
    JSON.stringify(laukku));

  vaadi(`${t}: 8. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
