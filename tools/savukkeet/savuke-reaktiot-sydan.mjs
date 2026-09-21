/*
 * Savuke: REAKTIOT SYDÄMEKSI (omistajan päätös 21.9.2026, kaappaus
 * Ranskan lehden Historia-osiosta työpöydällä). Viisi symbolia ja
 * lepotila korvattiin kahdella suoraan näkyvällä napilla — sydän
 * (hyvä) ja peukku alas (huono) — ja lehden jutun vuosiluku siirtyi
 * otsikkorivin oikeaan reunaan omaan laatikkoonsa. js/reaktiot.js
 * yksikkötestit vartioivat dataa (jono, kuorma, ryhmät), mutta eivät
 * sitä, mitä ruudulle oikeasti piirtyy.
 *
 * VARTIOT:
 *   a) Lehden Historia-osion jutussa (maalehti GBR, "Kuningas
 *      pakotettiin lain alle" — Magna Carta) vuosiluku on
 *      otsikkorivin OIKEASSA reunassa (laatikon oikea reuna lähellä
 *      otsikkorivin oikeaa reunaa).
 *   b) Otsikkorivillä EI OLE reaktionappeja; ne ovat leipätekstin
 *      lopussa SAMALLA RIVILLÄ "Lue lisää aiheesta" -linkin kanssa.
 *   c) Näkyvissä täsmälleen KAKSI reaktionappia: sydän ja peukku alas.
 *   d) Sydän-klikkaus kirjaa äänen (localStorage + POST /reaktio) ja
 *      merkitsee napin valituksi.
 *   e) Peukku alas avaa "Mikä oli vialla?" -kysymyksen kolmella
 *      vaihtoehdolla (Tylsä / Virhe tiedoissa / Muu), ja "Virhe
 *      tiedoissa" avaa tekstikentän.
 *   f) Vanha tallennettu ääni "ihana" näkyy SYDÄMENÄ valittuna —
 *      muunnos vanhasta viiden symbolin mallista uuteen.
 *   g) Kohdekortti (js/fokuskohteet.js) ja nähtävyysjuttu
 *      (js/nahtavyydet.js) näyttävät samat kaksi nappia.
 *   h) Ajo ilman sivu- tai konsolivirheitä.
 *
 * Verkkoa ei tarvita: ehdotuskanavan worker-osoite siepataan routella
 * (sama malli kuin vanhassa tools/savuke-reaktiot.mjs).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-reaktiot-sydan.mjs <kuvakansio>
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { aiheAvain } from '../../js/pollopoiminnat.js';
import { otsikkoAvain, REAKTIO_AANET_TALLE } from '../../js/reaktiot.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.argv[2] ?? process.env.KAAPPAUSKANSIO
  ?? join('/tmp/matkakirja-kaappaukset', 'reaktiot-sydan');
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = 8749;
await new Promise((r) => palvelin.listen(PORTTI, r));

let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  // eslint-disable-next-line no-await-in-loop
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
const chromium = paketti?.chromium ?? paketti?.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* ==================== MAGNA CARTA -JUTUN KOHDEAVAIN ==================== */

// Sama avain kuin ennen (otsikkoAvain), jotta vanhojen äänten
// säilyminen (vartio f) mittaa oikeaa asiaa: kohde ei vaihtunut, vain
// nappien paikka ja määrä.
const SIVUAVAIN = aiheAvain('GBR', 'historia');
const JUTUN_OTSIKKO = 'Kuningas pakotettiin lain alle';
const JUTUN_AVAIN = otsikkoAvain(SIVUAVAIN, JUTUN_OTSIKKO);

/* ==================== WORKERIN SIEPPAUS ==================== */

const aanet = [];
async function sieppaa(sivu) {
  await sivu.route('**/matkakirja-ehdotukset*/**', async (route) => {
    const pyynto = route.request();
    const url = new URL(pyynto.url());
    const json = (data) => route.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify(data),
    });
    if (url.pathname === '/reaktiot') {
      const reaktiot = {};
      for (const osa of (url.searchParams.get('kohteet') ?? '').split(',').filter(Boolean)) {
        reaktiot[decodeURIComponent(osa)] = {
          hieno: 0, ihana: 0, mielenkiintoinen: 0, tylsa: 0, virhe: 0,
        };
      }
      return json({ reaktiot });
    }
    if (url.pathname === '/reaktio') {
      const runko = JSON.parse(pyynto.postData() ?? '{}');
      aanet.push(runko);
      return json({
        ok: true,
        kohde: runko.kohde,
        aanet: { hieno: 0, ihana: 0, mielenkiintoinen: 0, tylsa: 0, virhe: 0, [runko.symboli ?? 'ihana']: 1 },
      });
    }
    if (url.pathname === '/laheta') return json({ ok: true });
    return json({ ok: true });
  });
  await sivu.route((url) => !/127\.0\.0\.1|localhost|matkakirja-ehdotukset/.test(url.href),
    (route) => route.abort());
}

const virheet = [];

/** Avaa pelin ja pelaa sen valmiuteen. */
async function avaaPeli(ctx) {
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    virheet.push(`konsoli: ${m.text()}`);
  });
  await sieppaa(sivu);
  await sivu.goto(`http://127.0.0.1:${PORTTI}/index.html`, { waitUntil: 'load' });
  await sivu.waitForTimeout(2200);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  });
  await sivu.waitForTimeout(900);
  return sivu;
}

/** Avaa maalehden Historia-sivun ja palauttaa Magna Carta -jutun mitat. */
async function avaaHistoriaJuttu(sivu) {
  return sivu.evaluate(async ({ iso, jutunOtsikko }) => {
    const { ui } = window.matkakirja;
    ui.avaaMaalehti(iso);
    for (let i = 0; i < 40 && (ui.lehtitila.tutkiSivut?.length ?? 0) < 2; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 100));
    }
    // naytaTutkiSivu numeroi sivut yhden verran tutkiSivut-taulukkoa
    // ylempänä (sivu 0 on maan etusivun kansi), joten aihesivun indeksi
    // on taulukon indeksi + 1 (mitattu käytännössä, ks. savuke-lehtiasettelu.mjs).
    const idx = ui.lehtitila.tutkiSivut.findIndex((s) => s.id === 'historia') + 1;
    const { naytaTutkiSivu } = await import('./js/lehti.js');
    naytaTutkiSivu(ui, idx, { heti: true });
    await new Promise((r) => setTimeout(r, 500));
    const lohkot = [...document.querySelectorAll('#arrival-kategoria .wiki-nosto')];
    const lohko = lohkot.find((l) => l.querySelector('.kulttuuri-otsikkorivi h3')?.textContent === jutunOtsikko);
    if (!lohko) return { loytyi: false };
    const otsikkoRivi = lohko.querySelector('.kulttuuri-otsikkorivi');
    const aikaEl = otsikkoRivi.querySelector('.nosto-aika');
    const loppurivi = lohko.querySelector('.leipa-loppurivi');
    const reaktiorivi = loppurivi?.querySelector('.reaktiorivi') ?? null;
    const lueLisaa = loppurivi?.querySelector('.wiki-btn') ?? null;
    const napit = [...(reaktiorivi?.querySelectorAll('button.reaktionappi') ?? [])];
    const otsikkoRect = otsikkoRivi.getBoundingClientRect();
    const aikaRect = aikaEl?.getBoundingClientRect();
    const reaktioriviRect = reaktiorivi?.getBoundingClientRect();
    const lueLisaaRect = lueLisaa?.getBoundingClientRect();
    return {
      loytyi: true,
      aikaTeksti: aikaEl?.textContent ?? '',
      aikaOikeaEtaisyys: aikaRect ? otsikkoRect.right - aikaRect.right : null,
      otsikkorivillaReaktioita: otsikkoRivi.querySelectorAll('.reaktiorivi, button.reaktionappi').length,
      loppurivissaOn: Boolean(loppurivi),
      lueLisaaOn: Boolean(lueLisaa),
      nappienMaara: napit.length,
      nappienLuokat: napit.map((n) => n.className),
      samaRivi: Boolean(lueLisaaRect && reaktioriviRect
        && Math.abs((lueLisaaRect.top + lueLisaaRect.bottom) / 2
          - (reaktioriviRect.top + reaktioriviRect.bottom) / 2) <= 12),
      hyvaOma: reaktiorivi?.querySelector('.reaktio-hyva')?.classList.contains('oma') ?? false,
      huonoOma: reaktiorivi?.querySelector('.reaktio-huono')?.classList.contains('oma') ?? false,
    };
  }, { iso: 'GBR', jutunOtsikko: JUTUN_OTSIKKO });
}

/* ==================== PUHELIN (390×844): a, b, c, f ==================== */

const ctxPuhelin = await selain.newContext({ viewport: { width: 390, height: 844 } });
// VANHA ÄÄNI "ihana" ENNEN LATAUSTA (vartio f): sama kohdeavain kuin
// napit käyttävät nyt, jotta muunnos vanhasta uuteen mittaa oikeaa
// asiaa. addInitScript ajetaan ennen sivun omaa koodia.
await ctxPuhelin.addInitScript(({ avain, talle }) => {
  try { localStorage.setItem(talle, JSON.stringify({ [avain]: 'ihana' })); } catch { /* yksityinen tila */ }
}, { avain: JUTUN_AVAIN, talle: REAKTIO_AANET_TALLE });
const sivuPuhelin = await avaaPeli(ctxPuhelin);
const puhelin = await avaaHistoriaJuttu(sivuPuhelin);

vaadi('Historia-osion juttu löytyy maalehdeltä', puhelin.loytyi === true, JSON.stringify(puhelin));
vaadi('a) vuosiluku on otsikkorivin oikeassa reunassa',
  puhelin.loytyi && puhelin.aikaTeksti === '1215'
  && puhelin.aikaOikeaEtaisyys !== null && Math.abs(puhelin.aikaOikeaEtaisyys) <= 4,
  JSON.stringify({ teksti: puhelin.aikaTeksti, etaisyys: puhelin.aikaOikeaEtaisyys }));
vaadi('b) otsikkorivillä ei ole yhtään reaktionappia',
  puhelin.loytyi && puhelin.otsikkorivillaReaktioita === 0, JSON.stringify(puhelin));
vaadi('b) reaktiot ovat leipätekstin lopussa Lue lisää -linkin rivillä',
  puhelin.loytyi && puhelin.loppurivissaOn && puhelin.lueLisaaOn, JSON.stringify(puhelin));
vaadi('c) rivillä on täsmälleen kaksi nappia: sydän ja peukku alas',
  puhelin.loytyi && puhelin.nappienMaara === 2
  && puhelin.nappienLuokat.some((l) => l.includes('reaktio-hyva'))
  && puhelin.nappienLuokat.some((l) => l.includes('reaktio-huono')),
  JSON.stringify(puhelin.nappienLuokat));
vaadi('f) vanha tallennettu "ihana" näkyy sydämenä valittuna',
  puhelin.loytyi && puhelin.hyvaOma === true && puhelin.huonoOma === false, JSON.stringify(puhelin));

await sivuPuhelin.screenshot({ path: join(ULOS, 'lehti-390.png') });

/* ==================== TYÖPÖYTÄ (1400×900): a, b, c, d, e, g ==================== */

const ctxTyopoyta = await selain.newContext({ viewport: { width: 1400, height: 900 } });
const sivuTyopoyta = await avaaPeli(ctxTyopoyta);
const tyopoyta = await avaaHistoriaJuttu(sivuTyopoyta);

vaadi('1400 px: sama rakenne (vuosiluku oikealla, ei otsikkoreaktiota)',
  tyopoyta.loytyi && Math.abs(tyopoyta.aikaOikeaEtaisyys) <= 4 && tyopoyta.otsikkorivillaReaktioita === 0,
  JSON.stringify(tyopoyta));
vaadi('1400 px: reaktiot ja Lue lisää -linkki samalla rivillä',
  tyopoyta.loytyi && tyopoyta.samaRivi === true, JSON.stringify(tyopoyta));

await sivuTyopoyta.screenshot({ path: join(ULOS, 'lehti-1400.png') });

/* --- d) sydän kirjaa äänen --- */

const aaniaEnnen = aanet.length;
const sydan = await sivuTyopoyta.evaluate((jutunOtsikko) => {
  const lohko = [...document.querySelectorAll('#arrival-kategoria .wiki-nosto')]
    .find((l) => l.querySelector('.kulttuuri-otsikkorivi h3')?.textContent === jutunOtsikko);
  lohko.querySelector('.leipa-loppurivi .reaktio-hyva').click();
  return true;
}, JUTUN_OTSIKKO);
await sivuTyopoyta.waitForTimeout(500);
const jalkeenSydan = await sivuTyopoyta.evaluate((jutunOtsikko) => {
  const lohko = [...document.querySelectorAll('#arrival-kategoria .wiki-nosto')]
    .find((l) => l.querySelector('.kulttuuri-otsikkorivi h3')?.textContent === jutunOtsikko);
  const nappi = lohko.querySelector('.leipa-loppurivi .reaktio-hyva');
  return {
    oma: nappi.classList.contains('oma'),
    painettu: nappi.getAttribute('aria-pressed'),
    tallennettu: JSON.parse(localStorage.getItem('matkakirja-reaktioaanet') ?? '{}'),
  };
}, JUTUN_OTSIKKO);
vaadi('d) sydän-klikkaus merkitsee napin valituksi',
  sydan && jalkeenSydan.oma === true && jalkeenSydan.painettu === 'true', JSON.stringify(jalkeenSydan));
vaadi('d) ääni tallentuu laitteelle ja lähtee workerille',
  jalkeenSydan.tallennettu[JUTUN_AVAIN] === 'ihana' && aanet.length === aaniaEnnen + 1
  && aanet.at(-1).symboli === 'ihana', JSON.stringify({ tallennettu: jalkeenSydan.tallennettu, viimeAani: aanet.at(-1) }));

/* --- e) peukku alas avaa "Mikä oli vialla?" --- */

await sivuTyopoyta.evaluate((jutunOtsikko) => {
  const lohko = [...document.querySelectorAll('#arrival-kategoria .wiki-nosto')]
    .find((l) => l.querySelector('.kulttuuri-otsikkorivi h3')?.textContent === jutunOtsikko);
  lohko.querySelector('.leipa-loppurivi .reaktio-huono').click();
}, JUTUN_OTSIKKO);
await sivuTyopoyta.waitForTimeout(500);
const kysymys = await sivuTyopoyta.evaluate(() => {
  const ikkuna = document.querySelector('dialog.minipopup');
  const napit = [...(ikkuna?.querySelectorAll('.reaktio-kysymys-nappi') ?? [])].map((b) => b.textContent);
  return {
    on: Boolean(ikkuna),
    otsikko: ikkuna?.querySelector('.minipopup-otsikko')?.textContent ?? '',
    napit,
  };
});
vaadi('e) peukku alas avaa "Mikä oli vialla?" kolmella vaihtoehdolla',
  kysymys.on && /mikä oli vialla/i.test(kysymys.otsikko)
  && kysymys.napit.join(',') === 'Tylsä,Virhe tiedoissa,Muu', JSON.stringify(kysymys));

await sivuTyopoyta.screenshot({ path: join(ULOS, 'peukku-kysymys-1400.png') });

await sivuTyopoyta.evaluate(() => {
  [...document.querySelectorAll('dialog.minipopup .reaktio-kysymys-nappi')]
    .find((b) => b.textContent === 'Virhe tiedoissa')?.click();
});
await sivuTyopoyta.waitForTimeout(500);
const virheKentta = await sivuTyopoyta.evaluate(() => Boolean(
  document.querySelector('dialog.minipopup textarea.reaktio-teksti')));
vaadi('e) "Virhe tiedoissa" avaa vapaan tekstikentän',
  virheKentta === true);
await sivuTyopoyta.evaluate(() => document.querySelector('dialog.minipopup .reaktio-peru')?.click());
await sivuTyopoyta.waitForTimeout(300);
await sivuTyopoyta.evaluate(() => document.getElementById('arrival-dialog')?.close());
await sivuTyopoyta.waitForTimeout(300);

/* --- g) kohdekortti ja nähtävyysjuttu --- */

const kortti = await sivuTyopoyta.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { avaaFokuskohde } = await import('./js/fokuskohteet.js');
  const { FOKUSKOHTEET_GRC } = await import('./js/packs/fokuskohteet-grc.js');
  const kohde = FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis');
  const popup = avaaFokuskohde(ui, kohde);
  popup.style.left = '12px';
  popup.style.top = '60px';
  // Reaktiorivi piirtyy vasta laajennetussa kortissa (lähderivin
  // kylkeen) — lyhyt kortti näyttää vain kuvan ja "Lisää"-napin.
  popup.querySelector('.nostokuva-lisaa')?.click();
  await new Promise((r) => setTimeout(r, 400));
  const napit = [...popup.querySelectorAll('.reaktiorivi button.reaktionappi')];
  return {
    on: napit.length > 0,
    nappienMaara: napit.length,
    luokat: napit.map((n) => n.className),
  };
});
vaadi('g) kohdekortissa on täsmälleen kaksi reaktionappia',
  kortti.on && kortti.nappienMaara === 2
  && kortti.luokat.some((l) => l.includes('reaktio-hyva'))
  && kortti.luokat.some((l) => l.includes('reaktio-huono')), JSON.stringify(kortti));
await sivuTyopoyta.waitForTimeout(400);
// Koko sivun kaappaus näyttäisi tässä kohtaa myös alla auenneen
// saapumiskortin taustalla — rajataan siis pelkkään kohdekorttiin.
const popupKahva = sivuTyopoyta.locator('.fokuskohde-popup').first();
if (await popupKahva.count()) await popupKahva.screenshot({ path: join(ULOS, 'kohdekortti-1400.png') });
else await sivuTyopoyta.screenshot({ path: join(ULOS, 'kohdekortti-1400.png') });
await sivuTyopoyta.evaluate(async () => {
  const { suljeFokuskohde } = await import('./js/fokuskohteet.js');
  suljeFokuskohde(window.matkakirja.ui);
});
await sivuTyopoyta.waitForTimeout(300);

const nahtavyys = await sivuTyopoyta.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.lehtitila.arrivalShownFor = 'lontoo';
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
  await new Promise((r) => setTimeout(r, 700));
  const napit = [...document.querySelectorAll('#nahtavyys-sisalto .reaktiorivi button.reaktionappi')];
  return {
    on: napit.length > 0,
    nappienMaara: napit.length,
    luokat: napit.map((n) => n.className),
  };
});
vaadi('g) nähtävyysjutussa on täsmälleen kaksi reaktionappia',
  nahtavyys.on && nahtavyys.nappienMaara === 2
  && nahtavyys.luokat.some((l) => l.includes('reaktio-hyva'))
  && nahtavyys.luokat.some((l) => l.includes('reaktio-huono')), JSON.stringify(nahtavyys));
await sivuTyopoyta.evaluate(() => document.getElementById('nahtavyys-dialog')?.close());
await sivuTyopoyta.waitForTimeout(300);

/* --- h) ei sivuvirheitä --- */

vaadi('h) ajo ilman konsoli- tai sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
console.log(`\nkaappaukset: ${ULOS}`);
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`${tulokset.length - kaatui.length}/${tulokset.length} ok`);
if (kaatui.length) process.exitCode = 1;
