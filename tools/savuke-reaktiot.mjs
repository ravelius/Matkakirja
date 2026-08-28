/*
 * SELAINSAVUKE: reaktiot (viisi symbolia, jaetut laskurit,
 * virheilmoitus).
 *
 * Yksikkötestit näkevät kuorman, kohdeavaimet ja laskurikutsut, mutta
 * eivät sitä, ilmestyykö nappi oikeaan paikkaan oikeassa selaimessa
 * eikä sitä, lähteekö napautuksesta oikeasti verkkokutsu. Tämä ajaa
 * ketjun läpi kuudessa pinnassa:
 *
 *   1. NÄHTÄVYYSJUTTU: lepotilassa YKSI himmeä nappi jutun lopussa
 *   2. AVATTU RIVI: napautus levittää viisi symbolia äänimäärineen,
 *      jaetut laskurit haetaan vasta avattaessa
 *   3. ÄÄNESTYS: symbolin napautus kasvattaa lukua heti (optimistinen)
 *      ja lähettää POST /reaktio; sama napautus uudestaan perii äänen
 *   4. VIRHEILMOITUS: mustetahra avaa minipopupin tekstikentällä,
 *      lähetys menee REAKTIO/VIRHE-kuormana ja Livia kiittää nolona
 *   5. VÄLIOTSIKKO: kaupunkilehden väliotsikon PÄÄSSÄ oma pieni nappi
 *      omalla otsikko:-kohdeavaimellaan
 *   6. FOKUSKOHDEKORTTI: sama nappi kartan tietoruudussa
 *
 * Verkkoa ei tarvita: workerin päätteet siepataan routella, ja
 * lähetetty hyötykuorma luetaan siitä, mitä peli oikeasti postittaa.
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

/* ================================================================== */
/* Workerin sieppaus                                                   */
/* ================================================================== */

/**
 * Palvelimen laskurit tässä ajossa. Savuke on oma pieni worker: se
 * pitää lukua, jotta optimistisen päivityksen JA palvelimen vastauksen
 * eroa voi katsoa oikeasti eikä vain uskoa.
 */
const laskurit = new Map();
const lahetykset = [];   // POST /laheta (virheilmoituksen vapaateksti)
const aanet = [];        // POST /reaktio (yksi ääni)
const haut = [];         // GET  /reaktiot (laskurien haku)

/** Sieppaa workerin päätteet yhteen sivuun. */
async function sieppaa(sivu) {
  await sivu.route('**/matkakirja-ehdotukset*/**', async (route) => {
    const pyynto = route.request();
    const url = new URL(pyynto.url());
    const json = (data) => route.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify(data),
    });

    if (url.pathname === '/reaktiot') {
      haut.push(url.search);
      const reaktiot = {};
      for (const osa of (url.searchParams.get('kohteet') ?? '').split(',').filter(Boolean)) {
        const kohde = decodeURIComponent(osa);
        reaktiot[kohde] = laskurit.get(kohde) ?? {
          hieno: 0, ihana: 0, mielenkiintoinen: 0, tylsa: 0, virhe: 0,
        };
      }
      return json({ reaktiot });
    }
    if (url.pathname === '/reaktio') {
      const runko = JSON.parse(pyynto.postData() ?? '{}');
      aanet.push(runko);
      const nyt = laskurit.get(runko.kohde)
        ?? { hieno: 0, ihana: 0, mielenkiintoinen: 0, tylsa: 0, virhe: 0 };
      if (runko.edellinen && nyt[runko.edellinen] > 0) nyt[runko.edellinen] -= 1;
      if (runko.symboli) nyt[runko.symboli] += 1;
      laskurit.set(runko.kohde, nyt);
      return json({ ok: true, kohde: runko.kohde, aanet: nyt });
    }
    if (url.pathname === '/laheta') {
      lahetykset.push({ runko: pyynto.postData() ?? '' });
      return json({ ok: true });
    }
    return json({ ok: true });
  });
  await sivu.route((url) => !/127\.0\.0\.1|localhost|matkakirja-ehdotukset/.test(url.href),
    (route) => route.abort());
}

/** Viimeisin /laheta-hyötykuorma kenttinä. */
const viimeisin = () => {
  const runko = lahetykset.at(-1)?.runko ?? '';
  const kentta = (nimi) => {
    const osuma = runko.match(new RegExp(`name="${nimi}"\\r?\\n\\r?\\n([\\s\\S]*?)\\r?\\n-{4,}`));
    return osuma ? osuma[1] : '';
  };
  return { teksti: kentta('teksti'), sivu: kentta('sivu'), tarkenne: kentta('tarkenne') };
};

/* ================================================================== */
/* Pelin käynnistys                                                    */
/* ================================================================== */

const virheet = [];

/** Avaa pelin ja pelaa sen valmiuteen, jossa lehti ja kartta toimivat. */
async function avaaPeli(ctx) {
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    virheet.push(`konsoli: ${m.text()}`);
  });
  await sieppaa(sivu);
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
  return sivu;
}

const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await avaaPeli(ctx);

/* ================================================================== */
/* 1) Nähtävyysjuttu: lepotila                                         */
/* ================================================================== */

await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.lehtitila.arrivalShownFor = 'lontoo';
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
});
await sivu.waitForTimeout(700);

const lepo = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  const valikko = rivi?.querySelector('.reaktio-valikko');
  return {
    on: Boolean(rivi),
    leponappeja: rivi?.querySelectorAll('button.reaktio-lepo').length ?? 0,
    valikkoPiilossa: valikko?.hidden ?? null,
    tyhja: Boolean(rivi?.querySelector('button.reaktio-lepo.tyhja')),
    polloEsto: rivi?.getAttribute('data-pollo') ?? '',
    lukijaLeipa: rivi?.querySelectorAll('[data-lukija]').length ?? 0,
  };
});
vaadi('lepotilassa yksi nappi, valikko piilossa',
  lepo.on && lepo.leponappeja === 1 && lepo.valikkoPiilossa === true, JSON.stringify(lepo));
vaadi('ilman ääniä nappi on haalea eikä näytä lukua', lepo.tyhja === true, JSON.stringify(lepo));
vaadi('rivi ei päädy pöllön kontekstiin eikä luentaan',
  lepo.polloEsto === 'ei' && lepo.lukijaLeipa === 0, JSON.stringify(lepo));
vaadi('laskureita EI haeta ennen kuin nappi avataan', haut.length === 0, `${haut.length} hakua`);

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
await sivu.screenshot({ path: join(ULOS, 'reaktiot-lepotila.png') });

/* ================================================================== */
/* 2) Avattu rivi: viisi symbolia ja jaetut laskurit                   */
/* ================================================================== */

// Palvelimella on jo ääniä: avaamisen pitää näyttää ne.
laskurit.set('juttu:lontoo:Tower Bridge',
  { hieno: 4, ihana: 1, mielenkiintoinen: 0, tylsa: 0, virhe: 0 });

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-lepo').click());
await sivu.waitForTimeout(700);
await vieritaJuttu();

const avattu = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  const napit = [...rivi.querySelectorAll('button.reaktio-symboli')];
  return {
    symboleja: napit.length,
    tunnukset: napit.map((n) => n.dataset.symboli),
    luvut: napit.map((n) => n.querySelector('.reaktio-luku').textContent),
    laajennettu: rivi.querySelector('.reaktio-lepo').getAttribute('aria-expanded'),
    lepoluku: rivi.querySelector('.reaktio-lepo .reaktio-luku').textContent,
    nimet: napit.map((n) => n.title.split(/[—,]/)[0].trim()),
  };
});
vaadi('avattu rivi näyttää viisi symbolia omistajan järjestyksessä',
  avattu.symboleja === 5
  && avattu.tunnukset.join(',') === 'hieno,ihana,mielenkiintoinen,tylsa,virhe'
  && avattu.laajennettu === 'true', JSON.stringify(avattu));
vaadi('jaetut laskurit haetaan avattaessa ja näkyvät symbolien perässä',
  haut.length === 1 && avattu.luvut.join(',') === '4,1,,,', JSON.stringify(avattu));
vaadi('lepotilan nappi näyttää voittajan äänimäärän', avattu.lepoluku === '4', avattu.lepoluku);
vaadi('symbolien merkitykset ovat suomeksi',
  avattu.nimet.join(',') === 'Hieno,Ihana,Mielenkiintoinen,Tylsä,Virhe',
  JSON.stringify(avattu.nimet));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-avattu-rivi.png') });

/* ================================================================== */
/* 3) Äänestys: optimistinen luku, lähetys ja vaihto                   */
/* ================================================================== */

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto [data-symboli="ihana"]').click());
await sivu.waitForTimeout(600);
await vieritaJuttu();
const aani1 = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  const ihana = rivi.querySelector('[data-symboli="ihana"]');
  return {
    luku: ihana.querySelector('.reaktio-luku').textContent,
    oma: ihana.classList.contains('oma'),
    painettu: ihana.getAttribute('aria-pressed'),
  };
});
vaadi('oma ääni näkyy heti korostettuna ja kasvattaa lukua',
  aani1.luku === '2' && aani1.oma && aani1.painettu === 'true', JSON.stringify(aani1));
vaadi('ääni lähtee workerille kohdeavaimella',
  aanet.length === 1 && aanet[0].kohde === 'juttu:lontoo:Tower Bridge'
  && aanet[0].symboli === 'ihana' && aanet[0].edellinen === null,
  JSON.stringify(aanet.at(-1)));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-oma-aani.png') });

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto [data-symboli="hieno"]').click());
await sivu.waitForTimeout(600);
const aani2 = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  return {
    hieno: rivi.querySelector('[data-symboli="hieno"] .reaktio-luku').textContent,
    ihana: rivi.querySelector('[data-symboli="ihana"] .reaktio-luku').textContent,
    omia: rivi.querySelectorAll('button.reaktio-symboli.oma').length,
  };
});
vaadi('äänen vaihto siirtää eikä kasvata summaa (yksi ääni per laite)',
  aani2.hieno === '5' && aani2.ihana === '1' && aani2.omia === 1, JSON.stringify(aani2));
vaadi('vaihto kertoo workerille myös edellisen symbolin',
  aanet.at(-1).symboli === 'hieno' && aanet.at(-1).edellinen === 'ihana',
  JSON.stringify(aanet.at(-1)));

// Oma ääni säilyy laitteella yli sulkemisen: rivi piirtyy uudestaan
// eikä pelaaja voi äänestää samaa kohdetta toista kertaa.
await sivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());
await sivu.waitForTimeout(300);
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
});
await sivu.waitForTimeout(700);
const muistettu = await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  rivi.querySelector('.reaktio-lepo').click();
  return new Promise((r) => setTimeout(() => r({
    oma: rivi.querySelector('button.reaktio-symboli.oma')?.dataset.symboli ?? '',
    hieno: rivi.querySelector('[data-symboli="hieno"] .reaktio-luku').textContent,
  }), 400));
});
vaadi('oma ääni muistetaan laitteella ja luvut tulevat palvelimelta',
  muistettu.oma === 'hieno' && muistettu.hieno === '5', JSON.stringify(muistettu));

/* ================================================================== */
/* 4) Virheilmoitus: minipopup, Livia ja tekstikanava                  */
/* ================================================================== */

const aaniaEnnen = aanet.length;
await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto [data-symboli="virhe"]').click());
await sivu.waitForTimeout(500);
const popup = await sivu.evaluate(() => {
  const ikkuna = document.querySelector('dialog.minipopup');
  return {
    on: Boolean(ikkuna),
    otsikko: ikkuna?.querySelector('.minipopup-otsikko')?.textContent ?? '',
    kentta: Boolean(ikkuna?.querySelector('textarea.reaktio-teksti')),
    napit: [...(ikkuna?.querySelectorAll('.reaktio-lomakenapit button') ?? [])]
      .map((b) => b.textContent),
  };
});
vaadi('mustetahra avaa minipopupin tekstikentällä (sama komponentti kuin i-nappi)',
  popup.on && popup.kentta && /virheilmoitus/i.test(popup.otsikko)
  && popup.napit.join(',') === 'Lähetä Livialle,Peru', JSON.stringify(popup));
vaadi('tahran napautus ei vielä äänestä ennen lähetystä',
  aanet.length === aaniaEnnen, `${aaniaEnnen} → ${aanet.length}`);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-virhepopup.png') });

// Tyhjä lähetys: Livia kysyy jatkokysymyksen eikä lähetä mitään.
await sivu.evaluate(() => document.querySelector('dialog.minipopup .reaktio-laheta').click());
await sivu.waitForTimeout(300);
const jatkokysymys = await sivu.evaluate(() => ({
  livia: document.querySelector('dialog.minipopup .reaktio-livia')?.textContent ?? '',
  piilossa: document.querySelector('dialog.minipopup .reaktio-livia')?.hidden ?? null,
}));
vaadi('tyhjästä ilmoituksesta Livia kysyy jatkokysymyksen eikä lähetä',
  /Livia/.test(jatkokysymys.livia) && jatkokysymys.piilossa === false
  && lahetykset.length === 0, JSON.stringify(jatkokysymys));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-virhe-jatkokysymys.png') });

await sivu.fill('dialog.minipopup textarea.reaktio-teksti', 'Sillan valmistumisvuosi on väärin.');
await sivu.evaluate(() => document.querySelector('dialog.minipopup .reaktio-laheta').click());
await sivu.waitForTimeout(700);
const lahetetty = await sivu.evaluate(() => ({
  livia: document.querySelector('dialog.minipopup .reaktio-livia')?.textContent ?? '',
  kenttaLukossa: document.querySelector('dialog.minipopup textarea.reaktio-teksti')?.disabled ?? null,
  sulje: document.querySelector('dialog.minipopup .reaktio-peru')?.textContent ?? '',
}));
const virheKuorma = viimeisin();
vaadi('virheilmoitus lähtee REAKTIO/VIRHE-kuormana vapaatekstin kanssa',
  virheKuorma.teksti.startsWith('REAKTIO/VIRHE:')
  && virheKuorma.teksti.includes('Sillan valmistumisvuosi on väärin.')
  && virheKuorma.sivu === 'juttu:lontoo:Tower Bridge',
  JSON.stringify(virheKuorma));
vaadi('Livia kiittää nolona ja lomake lukkiutuu',
  /Livia/.test(lahetetty.livia) && lahetetty.kenttaLukossa === true
  && lahetetty.sulje === 'Sulje', JSON.stringify(lahetetty));
vaadi('sama ilmoitus kasvattaa myös tahralaskuria',
  aanet.at(-1).symboli === 'virhe' && aanet.at(-1).edellinen === 'hieno',
  JSON.stringify(aanet.at(-1)));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-virhe-kiitos.png') });

await sivu.evaluate(() => document.querySelector('dialog.minipopup .reaktio-peru').click());
await sivu.waitForTimeout(300);

// Istunnon esto: tekstikenttä ei aukea toista kertaa samasta jutusta.
await sivu.evaluate(() => {
  const rivi = document.querySelector('#nahtavyys-sisalto .reaktiorivi');
  rivi.querySelector('[data-symboli="virhe"]').click();
});
await sivu.waitForTimeout(400);
const toinenKerta = await sivu.evaluate(() => ({
  popup: Boolean(document.querySelector('dialog.minipopup')),
  merkitty: Boolean(document.querySelector('#nahtavyys-sisalto [data-symboli="virhe"].ilmoitettu')),
}));
vaadi('virheilmoituksen kenttä ei aukea toista kertaa samasta sisällöstä',
  toinenKerta.popup === false && toinenKerta.merkitty, JSON.stringify(toinenKerta));
await sivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());
await sivu.waitForTimeout(300);

/* ================================================================== */
/* 5) Kaupunkilehden aihesivu ja sen väliotsikot                       */
/* ================================================================== */

const aihe = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  const { naytaTutkiSivu } = await import('./js/lehti.js');
  naytaTutkiSivu(ui, 1, { heti: true });
  const kohde = document.getElementById('arrival-kategoria');
  const sivunRivi = [...kohde.querySelectorAll('.reaktiorivi')]
    .find((r) => !r.classList.contains('reaktiot-otsikko'));
  const otsikkoRivit = [...kohde.querySelectorAll('.kulttuuri-otsikkorivi .reaktiot-otsikko')];
  const tehtava = kohde.querySelector('.minitehtava');
  return {
    sivulla: Boolean(sivunRivi),
    otsikoita: kohde.querySelectorAll('.kulttuuri-otsikkorivi').length,
    nappeja: otsikkoRivit.length,
    // Nappi on otsikkorivin VIIMEINEN lapsi eli rivin päässä.
    rivinPaassa: otsikkoRivit.every((r) => r.parentElement.lastElementChild === r),
    ennenTehtavaa: Boolean(sivunRivi && (!tehtava
      || (sivunRivi.compareDocumentPosition(tehtava) & 4) !== 0)),
  };
});
vaadi('aihesivulla on sekä sivun oma nappi että väliotsikkonapit',
  aihe.sivulla && aihe.otsikoita > 0 && aihe.nappeja === aihe.otsikoita,
  JSON.stringify(aihe));
vaadi('väliotsikon nappi on rivin päässä eikä leipätekstin päällä',
  aihe.rivinPaassa === true, JSON.stringify(aihe));
vaadi('sivun oma nappi on ennen minitehtävää', aihe.ennenTehtavaa === true, JSON.stringify(aihe));
await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  if (kortti) kortti.scrollTop = 0;
});
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-valiotsikko.png') });

const otsikkoEnnen = aanet.length;
await sivu.evaluate(async () => {
  const rivi = document.querySelector('#arrival-kategoria .reaktiot-otsikko');
  rivi.querySelector('.reaktio-lepo').click();
  await new Promise((r) => setTimeout(r, 400));
  rivi.querySelector('[data-symboli="mielenkiintoinen"]').click();
});
await sivu.waitForTimeout(600);
vaadi('väliotsikon ääni lähtee omalla otsikko:-kohdeavaimellaan',
  aanet.length === otsikkoEnnen + 1 && /^otsikko:aihe:lontoo:/.test(aanet.at(-1).kohde)
  && aanet.at(-1).symboli === 'mielenkiintoinen',
  JSON.stringify(aanet.at(-1)));
await sivu.screenshot({ path: join(ULOS, 'reaktiot-valiotsikko-avattu.png') });

await sivu.evaluate(() => document.getElementById('arrival-dialog').close());
await sivu.waitForTimeout(300);

/* ================================================================== */
/* 6) Fokuskohdekortti                                                 */
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
    leponappeja: rivi?.querySelectorAll('button.reaktio-lepo').length ?? 0,
    lahderivinJalkeen: Boolean(rivi && lahde
      && (lahde.compareDocumentPosition(rivi) & 4) !== 0),
  };
});
vaadi('reaktionappi ilmestyy fokuskohdekorttiin lähderivin jälkeen',
  kortti.on && kortti.leponappeja === 1 && kortti.lahderivinJalkeen, JSON.stringify(kortti));
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'reaktiot-kohdekortti.png') });

const korttiEnnen = aanet.length;
/*
 * Livian saapumiskupla (v1250) laukeaa viivastettyna ja sulkee
 * ohjelmallisesti avatun kortin taustalla — pelissa kortti ei ole
 * auki saapumishetkella, joten kilpajuoksu on vain taman kokeen oma.
 * Avataan kortti tarvittaessa uudestaan samassa evaluatessa kuin
 * klikataan, jolloin valiin ei mahdu sulkijaa.
 */
await sivu.evaluate(async () => {
  const avaa = async () => {
    const { ui } = window.matkakirja;
    const { avaaFokuskohde } = await import('./js/fokuskohteet.js');
    const { FOKUSKOHTEET_GRC } = await import('./js/packs/fokuskohteet-grc.js');
    avaaFokuskohde(ui, FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis'));
  };
  if (!document.querySelector('.fokuskohde-popup .reaktio-lepo')) await avaa();
  document.querySelector('.fokuskohde-popup .reaktio-lepo').click();
  await new Promise((r) => setTimeout(r, 400));
  if (!document.querySelector('.fokuskohde-popup [data-symboli="hieno"]')) {
    await avaa();
    document.querySelector('.fokuskohde-popup .reaktio-lepo').click();
    await new Promise((r) => setTimeout(r, 400));
  }
  document.querySelector('.fokuskohde-popup [data-symboli="hieno"]').click();
});
await sivu.waitForTimeout(600);
vaadi('kohdekortin ääni lähtee kohde-tunnisteella',
  aanet.length === korttiEnnen + 1 && aanet.at(-1).kohde === 'kohde:akropolis',
  JSON.stringify(aanet.at(-1)));
await sivu.evaluate(async () => {
  const { suljeFokuskohde } = await import('./js/fokuskohteet.js');
  suljeFokuskohde(window.matkakirja.ui);
});
await sivu.waitForTimeout(300);

vaadi('ajo ilman konsoli- tai sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

/* ================================================================== */
/* iPad: samat pinnat isolla ruudulla                                  */
/* ================================================================== */

const ipad = await selain.newContext({ viewport: { width: 834, height: 1112 }, serviceWorkers: 'block' });
const isoSivu = await avaaPeli(ipad);
await isoSivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
  ui.lehtitila.arrivalShownFor = 'lontoo';
  ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
    null, { henkilolinkit: [] });
});
await isoSivu.waitForTimeout(700);
await isoSivu.evaluate(() => {
  const k = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
  k.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
  k.scrollTop = k.scrollHeight;
});
await isoSivu.waitForTimeout(600);
await isoSivu.screenshot({ path: join(ULOS, 'reaktiot-ipad-lepotila.png') });

await isoSivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .reaktio-lepo').click());
await isoSivu.waitForTimeout(700);
await isoSivu.evaluate(() => {
  const k = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
  k.scrollTop = k.scrollHeight;
});
await isoSivu.waitForTimeout(400);
const ipadRivi = await isoSivu.evaluate(() => ({
  symboleja: document.querySelectorAll('#nahtavyys-sisalto button.reaktio-symboli').length,
}));
vaadi('iPadilla avattu rivi on sama viiden symbolin rivi',
  ipadRivi.symboleja === 5, JSON.stringify(ipadRivi));
await isoSivu.screenshot({ path: join(ULOS, 'reaktiot-ipad-avattu-rivi.png') });

await isoSivu.evaluate(() => document.querySelector('#nahtavyys-sisalto [data-symboli="virhe"]').click());
await isoSivu.waitForTimeout(500);
const ipadPopup = await isoSivu.evaluate(() => Boolean(
  document.querySelector('dialog.minipopup textarea.reaktio-teksti')));
vaadi('iPadilla virhepopup avautuu samalla komponentilla', ipadPopup === true);
await isoSivu.screenshot({ path: join(ULOS, 'reaktiot-ipad-virhepopup.png') });
await isoSivu.evaluate(() => document.querySelector('dialog.minipopup .reaktio-peru').click());
await isoSivu.waitForTimeout(300);
await isoSivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());
await isoSivu.waitForTimeout(300);

await isoSivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  const { naytaTutkiSivu } = await import('./js/lehti.js');
  naytaTutkiSivu(ui, 1, { heti: true });
});
await isoSivu.waitForTimeout(700);
await isoSivu.screenshot({ path: join(ULOS, 'reaktiot-ipad-valiotsikko.png') });

await selain.close();
palvelin.close();
console.log(`\nkaappaukset: ${ULOS}`);
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`${tulokset.length - kaatui.length}/${tulokset.length} ok`);
if (kaatui.length) process.exitCode = 1;
