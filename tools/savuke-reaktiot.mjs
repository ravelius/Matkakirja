/*
 * SELAINSAVUKE: reaktiot (peukku ja virheilmoitus).
 *
 * Yksikkötestit näkevät hyötykuorman ja jonon, mutta eivät sitä,
 * ilmestyykö rivi oikeaan paikkaan oikeassa selaimessa eikä sitä,
 * lähteekö napautuksesta oikeasti verkkokutsu. Tämä ajaa ketjun läpi
 * neljässä pinnassa:
 *
 *   1. NÄHTÄVYYSJUTTU: rivi lähderivin kyljessä, peukku kuittaa heti ja
 *      lähettää REAKTIO/PEUKKU-kuorman ehdotuskanavaan
 *   2. VIRHEILMOITUS: lippunapista aukeaa tekstikenttä, lähetys menee
 *      REAKTIO/VIRHE-kuormana ja nappi lukkiutuu istunnon ajaksi —
 *      peukkuja saa silti antaa lisää
 *   3. KAUPUNKILEHDEN AIHESIVU: sama rivi jutun lopussa
 *   4. FOKUSKOHDEKORTTI JA IHMESUURENNOS: rivi kortissa ja
 *      suurennoksen paperilla, eikä peukku sulje suurennosta
 *
 * Verkkoa ei tarvita: ehdotuspääte siepataan routella, ja lähetetty
 * hyötykuorma luetaan siitä, mitä peli oikeasti postittaa.
 *
 *   node tools/savuke-reaktiot.mjs
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
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
await new Promise((r) => palvelin.listen(8741, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
sivu.on('console', (m) => {
  if (m.type() !== 'error') return;
  if (/Failed to load resource/.test(m.text())) return;
  virheet.push(`konsoli: ${m.text()}`);
});

/* Ehdotuskanava siepataan: hyötykuorma luetaan pyynnön rungosta. */
const lahetykset = [];
await sivu.route('**/matkakirja-ehdotukset*/**', async (route) => {
  lahetykset.push({ url: route.request().url(), runko: route.request().postData() ?? '' });
  await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
});
await sivu.route((url) => !/127\.0\.0\.1|localhost|matkakirja-ehdotukset/.test(url.href),
  (route) => route.abort());

await sivu.goto('http://127.0.0.1:8741/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2200);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', null);
  g.player.money = 2000;
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(900);

/** Viimeisin lähetetty hyötykuorma kenttinä. */
const viimeisin = () => {
  const runko = lahetykset.at(-1)?.runko ?? '';
  const kentta = (nimi) => {
    const osuma = runko.match(new RegExp(`name="${nimi}"\\r?\\n\\r?\\n([\\s\\S]*?)\\r?\\n-{4,}`));
    return osuma ? osuma[1] : '';
  };
  return { teksti: kentta('teksti'), sivu: kentta('sivu'), tarkenne: kentta('tarkenne') };
};

/* ================================================================== */
/* 1) Nähtävyysjuttu: rivi ja peukku                                   */
/* ================================================================== */

await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.lehtitila.arrivalShownFor = 'lontoo';
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
});
await sivu.waitForTimeout(700);

const juttu = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  return {
    on: Boolean(rivi),
    nappeja: rivi?.querySelectorAll('button.reaktionappi').length ?? 0,
    polloEsto: rivi?.getAttribute('data-pollo') ?? '',
    lukijaLeipa: rivi?.querySelectorAll('[data-lukija]').length ?? 0,
    ennenPoimintoja: Boolean(rivi && (!document.querySelector('#nahtavyys-sisalto .pollo-poiminnat')
      || (rivi.compareDocumentPosition(document.querySelector('#nahtavyys-sisalto .pollo-poiminnat')) & 4) !== 0)),
  };
});
vaadi('reaktiorivi ilmestyy nähtävyysjuttuun, kaksi nappia',
  juttu.on && juttu.nappeja === 2, JSON.stringify(juttu));
vaadi('rivi ei päädy pöllön kontekstiin eikä luentaan',
  juttu.polloEsto === 'ei' && juttu.lukijaLeipa === 0, JSON.stringify(juttu));
vaadi('rivi on ennen pöllöpoimintoja', juttu.ennenPoimintoja === true, JSON.stringify(juttu));

/*
 * Rivi on jutun lopussa, joten kaappaus otetaan sieltä. Yläreunan vahti
 * (js/nahtavyydet.js) nollaa liukuman kunnes käyttäjä itse tarttuu
 * korttiin — savuke tekee saman eleen ja vierittää vasta sen jälkeen.
 */
const vieritaJuttu = async () => {
  await sivu.evaluate(() => {
    const k = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
    k.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
    k.scrollTop = k.scrollHeight;
  });
  await sivu.waitForTimeout(500);
  await sivu.evaluate(() => {
    const k = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
    k.scrollTop = k.scrollHeight;
  });
  await sivu.waitForTimeout(300);
};
await vieritaJuttu();
await sivu.screenshot({ path: join(ULOS, 'reaktiot-juttu-rivi.png') });

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-peukku').click());
await sivu.waitForTimeout(600);
await vieritaJuttu();
const peukku = await sivu.evaluate(() => ({
  kuittaus: document.querySelector('#nahtavyys-sisalto .reaktio-kuittaus')?.textContent ?? '',
  poks: Boolean(document.querySelector('#nahtavyys-sisalto .reaktio-peukku.reaktio-poks')),
}));
const peukkuKuorma = viimeisin();
vaadi('peukku kuittaa heti näytöllä', /kiitos/i.test(peukku.kuittaus) && peukku.poks,
  JSON.stringify(peukku));
vaadi('peukku lähtee ehdotuskanavaan REAKTIO/PEUKKU-kuormana',
  peukkuKuorma.teksti.startsWith('REAKTIO/PEUKKU:')
  && peukkuKuorma.sivu === 'juttu:lontoo:Tower Bridge'
  && peukkuKuorma.tarkenne.startsWith('REAKTIO/PEUKKU'),
  JSON.stringify(peukkuKuorma));
vaadi('kuormassa on pelin versio', /Versio: \d{4}-\d{2}-\d{2}\.\d+/.test(peukkuKuorma.teksti),
  peukkuKuorma.teksti.replace(/\n/g, ' | '));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-peukku-kuittaus.png') });

/* ================================================================== */
/* 2) Virheilmoitus: lomake, lähetys ja istunnon esto                  */
/* ================================================================== */

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-virhenappi').click());
await sivu.waitForTimeout(400);
await vieritaJuttu();
const lomake = await sivu.evaluate(() => {
  const l = document.querySelector('#nahtavyys-sisalto .reaktio-lomake');
  return {
    on: Boolean(l),
    kentta: Boolean(l?.querySelector('textarea.reaktio-teksti')),
    napit: [...(l?.querySelectorAll('button') ?? [])].map((b) => b.textContent),
    laajennettu: document.querySelector('#nahtavyys-sisalto .reaktio-virhenappi')
      ?.getAttribute('aria-expanded') ?? '',
  };
});
vaadi('virhenappi avaa vapaaehtoisen tekstikentän',
  lomake.on && lomake.kentta && lomake.napit.join(',') === 'Lähetä,Peru'
  && lomake.laajennettu === 'true', JSON.stringify(lomake));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-virhelomake.png') });

await sivu.fill('#nahtavyys-sisalto textarea.reaktio-teksti', 'Sillan valmistumisvuosi on väärin.');
await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-laheta').click());
await sivu.waitForTimeout(700);
await vieritaJuttu();
const virheKuorma = viimeisin();
const virheTila = await sivu.evaluate(() => ({
  kuittaus: document.querySelector('#nahtavyys-sisalto .reaktio-kuittaus')?.textContent ?? '',
  lomake: Boolean(document.querySelector('#nahtavyys-sisalto .reaktio-lomake')),
  lukossa: document.querySelector('#nahtavyys-sisalto .reaktio-virhenappi')?.disabled ?? null,
}));
vaadi('virheilmoitus lähtee REAKTIO/VIRHE-kuormana vapaatekstin kanssa',
  virheKuorma.teksti.startsWith('REAKTIO/VIRHE:')
  && virheKuorma.teksti.includes('Sillan valmistumisvuosi on väärin.')
  && virheKuorma.sivu === 'juttu:lontoo:Tower Bridge',
  JSON.stringify(virheKuorma));
vaadi('lomake sulkeutuu, kuittaus jää ja nappi lukkiutuu istunnoksi',
  /kiitos/i.test(virheTila.kuittaus) && !virheTila.lomake && virheTila.lukossa === true,
  JSON.stringify(virheTila));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-virhe-lahetetty.png') });

const ennen = lahetykset.length;
await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-peukku').click());
await sivu.waitForTimeout(600);
vaadi('peukkuja saa antaa monta vaikka virhe on jo ilmoitettu',
  lahetykset.length === ennen + 1 && viimeisin().teksti.startsWith('REAKTIO/PEUKKU:'),
  `${ennen} → ${lahetykset.length}`);

/* Uusi avaus samasta jutusta: esto pitää istunnon yli. */
await sivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());
await sivu.waitForTimeout(300);
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
});
await sivu.waitForTimeout(700);
const uudelleen = await sivu.evaluate(() => ({
  lukossa: document.querySelector('#nahtavyys-sisalto .reaktio-virhenappi')?.disabled ?? null,
  peukkuKaytossa: document.querySelector('#nahtavyys-sisalto .reaktio-peukku')?.disabled === false,
}));
vaadi('esto seuraa sisältöä myös uudelleen avattaessa',
  uudelleen.lukossa === true && uudelleen.peukkuKaytossa, JSON.stringify(uudelleen));
await sivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());
await sivu.waitForTimeout(300);

/* ================================================================== */
/* 3) Kaupunkilehden aihesivu                                          */
/* ================================================================== */

const aihe = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  const { naytaTutkiSivu } = await import('./js/lehti.js');
  naytaTutkiSivu(ui, 1, { heti: true });
  const kohde = document.getElementById('arrival-kategoria');
  const rivi = kohde.querySelector('.reaktiorivi');
  const tehtava = kohde.querySelector('.minitehtava');
  return {
    on: Boolean(rivi),
    nappeja: rivi?.querySelectorAll('button.reaktionappi').length ?? 0,
    ennenTehtavaa: Boolean(rivi && (!tehtava
      || (rivi.compareDocumentPosition(tehtava) & 4) !== 0)),
  };
});
vaadi('reaktiorivi ilmestyy kaupunkilehden aihesivulle',
  aihe.on && aihe.nappeja === 2, JSON.stringify(aihe));
vaadi('aihesivun rivi on ennen minitehtävää', aihe.ennenTehtavaa === true, JSON.stringify(aihe));
await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  if (kortti) kortti.scrollTop = kortti.scrollHeight;
});
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-aihesivu.png') });

const lehtiEnnen = lahetykset.length;
await sivu.evaluate(() => document.querySelector('#arrival-kategoria .reaktio-peukku').click());
await sivu.waitForTimeout(600);
vaadi('aihesivun peukku lähtee omalla aihetunnisteellaan',
  lahetykset.length === lehtiEnnen + 1 && /^aihe:/.test(viimeisin().sivu),
  viimeisin().sivu);
await sivu.evaluate(() => document.getElementById('arrival-dialog').close());
await sivu.waitForTimeout(300);

/* ================================================================== */
/* 4) Fokuskohdekortti ja ihmesuurennos                                */
/* ================================================================== */

const kortti = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { avaaFokuskohde } = await import('./js/fokuskohteet.js');
  const { FOKUSKOHTEET_GRC } = await import('./js/packs/fokuskohteet-grc.js');
  const kohde = FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis');
  const popup = avaaFokuskohde(ui, kohde);
  popup.style.left = '12px';
  popup.style.top = '60px';
  const rivi = popup.querySelector('.reaktiorivi');
  const lahde = popup.querySelector('.fokuskohde-lahde');
  return {
    on: Boolean(rivi),
    nappeja: rivi?.querySelectorAll('button.reaktionappi').length ?? 0,
    lahderivinJalkeen: Boolean(rivi && lahde
      && (lahde.compareDocumentPosition(rivi) & 4) !== 0),
  };
});
vaadi('reaktiorivi ilmestyy fokuskohdekorttiin lähderivin jälkeen',
  kortti.on && kortti.nappeja === 2 && kortti.lahderivinJalkeen, JSON.stringify(kortti));
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-kohdekortti.png') });

const korttiEnnen = lahetykset.length;
/*
 * Livian saapumiskupla (v1250) laukeaa viivastettyna ja sulkee
 * ohjelmallisesti avatun kortin taustalla — pelissa kortti ei ole
 * auki saapumishetkella, joten kilpajuoksu on vain taman kokeen oma.
 * Avataan kortti tarvittaessa uudestaan samassa evaluatessa kuin
 * klikataan, jolloin valiin ei mahdu sulkijaa.
 */
await sivu.evaluate(async () => {
  let peukku = document.querySelector('.fokuskohde-popup .reaktio-peukku');
  if (!peukku) {
    const { ui } = window.matkakirja;
    const { avaaFokuskohde } = await import('./js/fokuskohteet.js');
    const { FOKUSKOHTEET_GRC } = await import('./js/packs/fokuskohteet-grc.js');
    const kohde = FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis');
    avaaFokuskohde(ui, kohde);
    peukku = document.querySelector('.fokuskohde-popup .reaktio-peukku');
  }
  peukku.click();
});
await sivu.waitForTimeout(600);
vaadi('kohdekortin peukku lähtee kohde-tunnisteella',
  lahetykset.length === korttiEnnen + 1 && viimeisin().sivu === 'kohde:akropolis',
  viimeisin().sivu);
/*
 * KARTAN OMA IHMESUURENNOS: kortin "Koe ihme" -nappi avaa
 * .fokuskohde-zoomin, joka on eri katselin kuin nähtävyysikkunan
 * postikortti — molemmissa on oltava sama rivi.
 */
await sivu.evaluate(async () => {
  let nappi = document.querySelector('.fokuskohde-ihmenappi');
  if (!nappi) {
    const { ui } = window.matkakirja;
    const { avaaFokuskohde } = await import('./js/fokuskohteet.js');
    const { FOKUSKOHTEET_GRC } = await import('./js/packs/fokuskohteet-grc.js');
    avaaFokuskohde(ui, FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis'));
    nappi = document.querySelector('.fokuskohde-ihmenappi');
  }
  nappi.click();
});
await sivu.waitForTimeout(900);
const karttaZoom = await sivu.evaluate(() => {
  const kehys = document.querySelector('.fokuskohde-zoomkehys');
  const rivi = kehys?.querySelector('.reaktiorivi');
  return {
    on: Boolean(rivi),
    // Kehys ohittaa eleet; rivin on saatava ne takaisin, tai peukkuun
    // ei pysty koskemaan.
    eleet: rivi ? getComputedStyle(rivi).pointerEvents : '',
  };
});
vaadi('kartan ihmesuurennoksessa on reaktiorivi, johon voi koskea',
  karttaZoom.on && karttaZoom.eleet === 'auto', JSON.stringify(karttaZoom));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-kartan-ihmesuurennos.png') });

const zoomEnnen = lahetykset.length;
await sivu.evaluate(() => document.querySelector('.fokuskohde-zoomkehys .reaktio-peukku').click());
await sivu.waitForTimeout(600);
const zoomAuki = await sivu.evaluate(() => Boolean(document.querySelector('.fokuskohde-zoom')));
vaadi('kartan suurennoksen peukku lähtee eikä sulje suurennosta',
  lahetykset.length === zoomEnnen + 1 && viimeisin().sivu === 'ihme:Akropolis' && zoomAuki,
  `${viimeisin().sivu}, auki=${zoomAuki}`);

await sivu.evaluate(async () => {
  const { suljeFokuskohde } = await import('./js/fokuskohteet.js');
  suljeFokuskohde(window.matkakirja.ui);
});
await sivu.waitForTimeout(300);

const suurennos = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const ihme = ui.matkakirjanIhme('Akropolis');
  ui.naytaKulttuuriKuva(ihme);
  const kortti2 = document.querySelector('.kulttuuri-suurennos');
  return {
    tunniste: ihme?.reaktio ?? '',
    on: Boolean(kortti2?.querySelector('.reaktiorivi')),
    keskitetty: Boolean(kortti2?.querySelector('.reaktiot-suurennos')),
  };
});
vaadi('ihmesuurennoksessa on oma reaktiorivi',
  suurennos.on && suurennos.keskitetty && suurennos.tunniste === 'ihme:Akropolis',
  JSON.stringify(suurennos));
await sivu.waitForTimeout(500);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-ihmesuurennos.png') });

const suurennosEnnen = lahetykset.length;
await sivu.evaluate(() => document.querySelector('.kulttuuri-suurennos .reaktio-peukku').click());
await sivu.waitForTimeout(600);
const yhaAuki = await sivu.evaluate(() => Boolean(document.querySelector('.kulttuuri-suurennos')));
vaadi('suurennoksen peukku lähtee eikä sulje katselinta',
  lahetykset.length === suurennosEnnen + 1 && viimeisin().sivu === 'ihme:Akropolis' && yhaAuki,
  `${viimeisin().sivu}, auki=${yhaAuki}`);

vaadi('ajo ilman konsoli- tai sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
console.log(`\nkaappaukset: ${ULOS}`);
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`${tulokset.length - kaatui.length}/${tulokset.length} ok`);
if (kaatui.length) process.exitCode = 1;
