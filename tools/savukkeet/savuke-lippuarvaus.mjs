/*
 * SAVUKE: LIPPUARVAUS-LINSSI (Fable 21.9.2026, toinen leikkilinssi;
 * js/linssit/lippuarvaus.js, lippuarvaus-peli.js, game.js
 * vastaaLippuarvaukseen).
 *
 * Marseille, 390 ja 1400 px. Linssi myönnetään pelaajalle (omistus.js
 * myonna) ja avataan matkalaukun tapaan ui.valitseLinssi('lippuarvaus').
 *
 * VARTIOT:
 *   1. Linssi aukeaa pallolle: portti, ✕, vivut Eurooppa/Maailma/Livia
 *      kysyy; Euroopan liput DOMissa (42, Ranska mukana, oma maa
 *      korostettu), lippukuva latautuu repon assets/liput-kansiosta.
 *   2. Vipu Maailma: liput kaikille 135 maalle; takaisin Eurooppaan.
 *   3. Napautus lippuun (datumin napautus): maan nimi esillä hetken.
 *   4. Livia kysyy: kortti Livian nimellä, Fablen lause ilman maan
 *      nimeä, iso lippu ja neljä vaihtoehtoa (oikea + kolme lähintä
 *      naapuria, kaikki Euroopasta); väärä vastaus: Fablen väärin-palaute
 *      maan nimellä, 0 tp; oikea (uusi kysymys): oikein-palaute,
 *      +XP_LIPPUARVAUS tp, aid-kupla, lippu välähtää pallolla.
 *   5. Kartta-muoto (jatkoerä): vipu Kartta tuo Euroopan maat
 *      polygoneina; kysymyksen ajan liput ovat piilossa ja kortissa on
 *      Livian lause + "Napauta maata pallolla." ilman nappeja; väärä
 *      napautus värjää väärän punaiseksi ja oikean vihreäksi (sarja 0),
 *      kaksi oikeaa peräkkäin → sarja 2, ennätys 2 tilarivillä ja
 *      localStoragessa, liput takaisin kortin sulkuun.
 *   6. Sulku ✕: liput, maat, kehikko ja luokat pois.
 *   7. Laukku: lippuarvaus valmiiden rivillä Codexin webp-ikonilla.
 *   8. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-lippuarvaus.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game, XP_LIPPUARVAUS } from '../../js/game.js';
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
    o.myonna(game, game.player, 'lippuarvaus');
    await ui.valitseLinssi('lippuarvaus');
    await new Promise((r) => setTimeout(r, 2500));
    const k = ui.pallolinssi?.kahva;
    const ranska = document.querySelector('.lippuarvaus-lippu[data-maa="FRA"]');
    const kuva = ranska?.querySelector('img');
    return {
      linssi: ui.pallolinssi?.tunnus ?? null, rajaus: k?.rajaus?.() ?? null, maita: k?.maat?.().length ?? 0,
      lippuja: document.querySelectorAll('.lippuarvaus-lippu').length,
      portti: document.body.classList.contains('aikajana-paalla'),
      sulku: Boolean(document.querySelector('.lippuarvaus-linssisulku')),
      vivut: [...document.querySelectorAll('.lippuarvaus-vivut button')].map((b) => b.textContent),
      ranska: Boolean(ranska), oma: ranska?.classList.contains('lippuarvaus-oma'),
      kuvaSrc: kuva?.getAttribute('src'), kuvaLatautui: Boolean(kuva?.complete && kuva.naturalWidth > 0),
      tilaNimi: document.querySelector('.lippuarvaus-tila-nimi')?.textContent ?? '',
    };
  });
  tieto(`${t}: avaus`, JSON.stringify(avaus));
  vaadi(`${t}: 1. linssi aukeaa pallolle: portti, ✕, vivut, Euroopan liput repon kuvista, oma maa korostettu`,
    avaus.linssi === 'lippuarvaus' && avaus.rajaus === 'eurooppa' && avaus.portti && avaus.sulku
      && avaus.vivut.join('|') === 'Eurooppa|Maailma|Nimet|Kartta|Livia kysyy' && avaus.lippuja === avaus.maita && avaus.maita >= 40 && avaus.maita <= 45
      && avaus.ranska && avaus.oma && /^assets\/liput\/france\.png$/.test(avaus.kuvaSrc ?? '') && avaus.kuvaLatautui
      && /Euroopan liput/.test(avaus.tilaNimi),
    JSON.stringify(avaus));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `lippuarvaus-eurooppa-${t}.png`), await sivu.screenshot());

  /* ── 2. maailma ─────────────────────────────────────────────────── */
  const maailma = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    k.asetaRajaus('maailma');
    await new Promise((r) => setTimeout(r, 900));
    const a = { rajaus: k.rajaus(), maita: k.maat().length, lippuja: document.querySelectorAll('.lippuarvaus-lippu:not(.pallolauta-poistuu)').length,
      nappi: document.querySelector('.lippuarvaus-vivut [data-rajaus="maailma"]')?.getAttribute('aria-pressed') };
    k.asetaRajaus('eurooppa');
    await new Promise((r) => setTimeout(r, 900));
    return { ...a, takaisin: k.maat().length, lippujaTakaisin: document.querySelectorAll('.lippuarvaus-lippu:not(.pallolauta-poistuu)').length };
  });
  tieto(`${t}: maailma`, JSON.stringify(maailma));
  vaadi(`${t}: 2. vipu Maailma: 135 maan liput, takaisin Eurooppaan`,
    maailma.rajaus === 'maailma' && maailma.maita === 135 && maailma.lippuja === 135 && maailma.nappi === 'true'
      && maailma.takaisin === maailma.lippujaTakaisin && maailma.takaisin < 50,
    JSON.stringify(maailma));

  /* ── 3. napautus ────────────────────────────────────────────────── */
  const napautus = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const datum = ui.pallolauta.merkit.napautettavat().find((d) => d.iso === 'ESP');
    datum?.napautus?.(datum);
    await new Promise((r) => setTimeout(r, 250));
    const el = document.querySelector('.lippuarvaus-lippu[data-maa="ESP"]');
    return {
      napautettavia: ui.pallolauta.merkit.napautettavat().length,
      esilla: el?.classList.contains('lippuarvaus-nimi-esilla'),
      nimi: el?.querySelector('.lippuarvaus-nimi')?.textContent,
      opacity: el ? getComputedStyle(el.querySelector('.lippuarvaus-nimi')).opacity : null,
      kahva: typeof k.naytaNimi,
    };
  });
  tieto(`${t}: napautus`, JSON.stringify(napautus));
  vaadi(`${t}: 3. napautus lippuun näyttää maan nimen`,
    napautus.napautettavia >= 40 && napautus.esilla && napautus.nimi === 'Espanja' && Number(napautus.opacity) > 0.5,
    JSON.stringify(napautus));

  /* ── 4. Livia kysyy ─────────────────────────────────────────────── */
  const kysymys = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const xp0 = game.player.xp ?? 0;
    const eurooppa = new Set(k.maat().map((m) => m.iso));
    // Väärä vastaus.
    k.kysy();
    await new Promise((r) => setTimeout(r, 300));
    const q1 = k.kysymys();
    const kortti = document.querySelector('.lippuarvaus-kortti');
    const puhuja = kortti?.querySelector('.lippuarvaus-puhuja')?.textContent ?? '';
    const teksti = kortti?.querySelector('.lippuarvaus-kysymys')?.textContent ?? '';
    const isoKuva = kortti?.querySelector('.lippuarvaus-iso img')?.getAttribute('src') ?? '';
    const napit = [...kortti.querySelectorAll('.lippuarvaus-valinnat button')].map((b) => b.dataset.maa);
    const vaara = napit.find((iso) => iso !== q1.maa.iso);
    kortti.querySelector(`.lippuarvaus-valinnat button[data-maa="${vaara}"]`).click();
    await new Promise((r) => setTimeout(r, 300));
    const palauteVaarin = kortti.querySelector('.lippuarvaus-palaute')?.textContent ?? '';
    const xpVaarin = (game.player.xp ?? 0) - xp0;
    const valahtaa1 = document.querySelector(`.lippuarvaus-lippu[data-maa="${q1.maa.iso}"]`)?.classList.contains('lippuarvaus-valahtaa');
    const oikeaNappi = kortti.querySelector('.lippuarvaus-valinnat button.lippuarvaus-oikea')?.dataset.maa;
    kortti.querySelector('.lippuarvaus-sulje-kortti')?.click();
    await new Promise((r) => setTimeout(r, 200));
    // Oikea vastaus.
    k.kysy();
    await new Promise((r) => setTimeout(r, 300));
    const q2 = k.kysymys();
    document.querySelector(`.lippuarvaus-kortti .lippuarvaus-valinnat button[data-maa="${q2.maa.iso}"]`).click();
    await new Promise((r) => setTimeout(r, 300));
    const palauteOikein = document.querySelector('.lippuarvaus-palaute')?.textContent ?? '';
    const xpOikein = (game.player.xp ?? 0) - xp0 - xpVaarin;
    const kupla = game.events.find((e) => e.tilanne === 'peli.lippuarvaus.oikein');
    const valahtaa2 = document.querySelector(`.lippuarvaus-lippu[data-maa="${q2.maa.iso}"]`)?.classList.contains('lippuarvaus-valahtaa');
    return {
      puhuja, teksti, isoKuva, maa: q1.maa.nimi, iso: q1.maa.iso, napit, kaikkiEuroopasta: napit.every((iso) => eurooppa.has(iso)),
      sisaltaaOikean: napit.includes(q1.maa.iso), nimiKysymyksessa: teksti.includes(q1.maa.nimi),
      palauteVaarin, xpVaarin, valahtaa1, oikeaNappi, eriMaa: q2.maa.iso !== q1.maa.iso,
      maa2: q2.maa.nimi, palauteOikein, xpOikein, kupla: Boolean(kupla), valahtaa2,
    };
  });
  tieto(`${t}: kysymys`, JSON.stringify(kysymys));
  vaadi(`${t}: 4. Livia kysyy: Fablen lause ilman nimeä, 4 vaihtoehtoa Euroopasta, väärä 0 tp, oikea +${XP_LIPPUARVAUS} tp ja lippu välähtää`,
    kysymys.puhuja === 'Livia'
      && /(lentoreittini alla|Kirjekyyhky tunnistaa lipun|Isoisäsi olisi piirtänyt)/.test(kysymys.teksti)
      && !kysymys.nimiKysymyksessa && /^assets\/liput\//.test(kysymys.isoKuva)
      && kysymys.napit.length === 4 && kysymys.sisaltaaOikean && kysymys.kaikkiEuroopasta
      && kysymys.palauteVaarin === `Läheltä liippasi, mutta ei. Se on ${kysymys.maa}. Nyt tiedät, mihin suuntaan lentää.`
      && kysymys.xpVaarin === 0 && kysymys.valahtaa1 && kysymys.oikeaNappi === kysymys.iso && kysymys.eriMaa
      && kysymys.palauteOikein === `Aivan. ${kysymys.maa2}. Katso, siinä se välähtää pallolla. (+${XP_LIPPUARVAUS} tp)`
      && kysymys.xpOikein === XP_LIPPUARVAUS && kysymys.kupla && kysymys.valahtaa2,
    JSON.stringify(kysymys));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `lippuarvaus-livia-${t}.png`), await sivu.screenshot());

  /* ── 5. kartta-muoto, sarja ja ennätys ──────────────────────────── */
  const kartta = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const pallo = ui.pallolauta.pallo;
    const maat = () => pallo.polygonsData().filter((d) => String(d.avain ?? '').startsWith('maa:'));
    // Häipyvät (pallolauta-poistuu) eivät ole näkyviä: kirjasto poistaa ne siirtymän jälkeen omassa kehyksessään.
    const liput = () => document.querySelectorAll('.lippuarvaus-lippu:not(.pallolauta-poistuu)').length;
    localStorage.removeItem('matkakirja-lippuarvaus-ennatys');
    k.asetaMuoto('kartta');
    await new Promise((r) => setTimeout(r, 900));
    const polygoneja = maat().length;
    const lippujaEnnen = liput();
    const nappi = document.querySelector('.lippuarvaus-vivut [data-muoto="kartta"]')?.getAttribute('aria-pressed');
    // Väärä napautus.
    k.kysy();
    await new Promise((r) => setTimeout(r, 400));
    const q1 = k.kysymys();
    const teksti = document.querySelector('.lippuarvaus-kortti .lippuarvaus-kysymys')?.textContent ?? '';
    const nappeja = document.querySelectorAll('.lippuarvaus-kortti .lippuarvaus-valinnat button').length;
    const lippujaKysymyksessa = liput();
    const vaara = k.maat().find((m) => m.iso !== q1.maa.iso).iso;
    k.napautaMaata(vaara);
    await new Promise((r) => setTimeout(r, 400));
    const varit = Object.fromEntries(maat().filter((d) => [`maa:${q1.maa.iso}`, `maa:${vaara}`].includes(d.avain)).map((d) => [d.avain.slice(4), d.vari]));
    const palauteVaarin = document.querySelector('.lippuarvaus-palaute')?.textContent ?? '';
    const sarja0 = k.sarja();
    document.querySelector('.lippuarvaus-sulje-kortti')?.click();
    await new Promise((r) => setTimeout(r, 400));
    const lippujaJalkeen = liput();
    const variPalautui = maat().every((d) => d.vari === 'rgba(140, 110, 70, 0.06)');
    // Kaksi oikeaa peräkkäin.
    const xp0 = game.player.xp ?? 0;
    for (let i = 0; i < 2; i += 1) {
      k.kysy();
      await new Promise((r) => setTimeout(r, 300));
      k.napautaMaata(k.kysymys().maa.iso);
      await new Promise((r) => setTimeout(r, 300));
      document.querySelector('.lippuarvaus-sulje-kortti')?.click();
      await new Promise((r) => setTimeout(r, 200));
    }
    const sarja2 = k.sarja();
    const tilaNimi = document.querySelector('.lippuarvaus-tila-nimi')?.textContent ?? '';
    const tallennettu = localStorage.getItem('matkakirja-lippuarvaus-ennatys');
    k.asetaMuoto('nimet');
    await new Promise((r) => setTimeout(r, 500));
    return {
      polygoneja, lippujaEnnen, nappi, teksti, nappeja, lippujaKysymyksessa, oikea: q1.maa.iso, vaara, varit, palauteVaarin,
      sarja0, lippujaJalkeen, variPalautui, sarja2, xpEro: (game.player.xp ?? 0) - xp0, tilaNimi, tallennettu,
      maitaNimetMuodossa: maat().length,
    };
  });
  tieto(`${t}: kartta`, JSON.stringify(kartta));
  vaadi(`${t}: 5. kartta-muoto: maat polygoneina, liput piilossa kysymyksen ajan, napautus vastaa, sarja ja ennätys`,
    kartta.polygoneja >= 40 && kartta.lippujaEnnen >= 40 && kartta.nappi === 'true'
      && /Napauta maata pallolla\.$/.test(kartta.teksti) && !/lentoreittini/.test(kartta.teksti) && kartta.nappeja === 0
      && kartta.lippujaKysymyksessa === 0
      && kartta.varit[kartta.oikea] === 'rgba(46, 107, 46, 0.35)' && kartta.varit[kartta.vaara] === 'rgba(176, 34, 34, 0.35)'
      && /^Läheltä liippasi/.test(kartta.palauteVaarin) && kartta.sarja0.sarja === 0
      && kartta.lippujaJalkeen >= 40 && kartta.variPalautui
      && kartta.sarja2.sarja === 2 && kartta.sarja2.ennatys === 2 && kartta.xpEro === 2 * XP_LIPPUARVAUS
      && /sarja 2 · ennätys 2/.test(kartta.tilaNimi) && kartta.tallennettu === '2' && kartta.maitaNimetMuodossa === 0,
    JSON.stringify(kartta));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `lippuarvaus-kartta-${t}.png`), await sivu.screenshot());

  /* ── 6. sulku ───────────────────────────────────────────────────── */
  const sulku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.lippuarvaus-linssisulku')?.click();
    await new Promise((r) => setTimeout(r, 1500));
    return {
      linssi: ui.pallolinssi, valittu: ui.linssiValittu ?? null,
      lippuja: document.querySelectorAll('.lippuarvaus-lippu').length,
      kehikko: Boolean(document.querySelector('.lippuarvaus-kehikko, .lippuarvaus-linssisulku')),
      luokat: ['aikajana-paalla', 'aikajana-palkki-auki'].filter((l) => document.body.classList.contains(l)),
      napautettavia: ui.pallolauta.merkit.napautettavat().filter((d) => String(d.avain).startsWith('lippu:')).length,
      maita: ui.pallolauta.pallo.polygonsData().filter((d) => String(d.avain ?? '').startsWith('maa:')).length,
    };
  });
  tieto(`${t}: sulku`, JSON.stringify(sulku));
  vaadi(`${t}: 6. sulku ✕: liput, maat, kehikko ja luokat pois`,
    sulku.linssi === null && !sulku.valittu && sulku.lippuja === 0 && !sulku.kehikko && sulku.luokat.length === 0 && sulku.napautettavia === 0 && sulku.maita === 0,
    JSON.stringify(sulku));

  /* ── 7. laukku ──────────────────────────────────────────────────── */
  const laukku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.openPassport();
    await new Promise((r) => setTimeout(r, 800));
    const nappi = document.querySelector('.linssi-valikko button[data-linssi="lippuarvaus"]');
    return { loytyy: Boolean(nappi), hiomassa: Boolean(nappi?.closest('.linssi-liuskat-hiomassa')), kuva: nappi?.querySelector('img')?.getAttribute('src') ?? null };
  });
  tieto(`${t}: laukku`, JSON.stringify(laukku));
  vaadi(`${t}: 7. laukku: lippuarvaus valmiiden rivillä Codexin webp-ikonilla`,
    laukku.loytyy && !laukku.hiomassa && laukku.kuva === 'assets/linssit/ikonit/linssi-lippuarvaus.webp',
    JSON.stringify(laukku));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `lippuarvaus-laukku-${t}.png`), await sivu.screenshot());

  vaadi(`${t}: 8. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
