/*
 * SELAINSAVUKE: Viisas Pöllö ja uusi alanappirivi.
 *
 * Yksikkötestit näkevät kontekstinkeruun ja haun, mutta eivät sitä mitä
 * oikea selain oikeasta DOMista lähettää. Tämä ajaa koko ketjun läpi:
 *
 *   1. alanappirivi: kolme paikkaa, monitoiminapin liuku auki/kiinni,
 *      matkustusnapit toimivat liu'usta, kartan napautus sulkee
 *   2. pöllö kartalla ja lehdessä, paneelin avaus ja sulku
 *   3. ehdotukset ja kysymys → vastaus (rajapinta mockattu route-fulfillillä)
 *   4. SPOILERISUOJA oikeasta pyyntörungosta: avoinna olevan lehden
 *      minitehtävä ei ole kontekstissa, jutun teksti on
 *   5. pelinsisäinen linkki vastauksen alla avaa oikean lehden sivun
 *   6. sanelu: mockattu SpeechRecognition, nappi → transkripti → lähetys,
 *      ja tila jossa tunnistusta ei ole lainkaan
 *   7. "Pöllö ei ole vielä hereillä" ilman asetettua osoitetta
 *
 *   node tools/savuke-pollo.mjs
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/** Mockatun välityspalvelimen osoite. Ei koskaan oikeaa palvelinta. */
const POLLO_URL = 'https://pollo.testi.invalid';

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

/*
 * Pöllön osoite luetaan js/packs/pollo-asetukset.js:stä, ja repossa se on
 * tyhjä (omistaja täyttää sen käyttöönotossa). Savuke tarvitsee molemmat
 * tilat, joten palvelin korvaa tiedoston sisällön lennossa: polloPaalla
 * ratkaisee, saako sivu osoitteen vai tyhjän merkkijonon.
 */
let polloPaalla = true;
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (polku.endsWith('js/packs/pollo-asetukset.js')) {
    const arvo = polloPaalla ? POLLO_URL : '';
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(`export const POLLOPALVELIN = '${arvo}';\n`);
    return;
  }
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8734, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Mockattu SpeechRecognition. Headless-selaimessa ei ole mikrofonia. */
const SANELU_MOCK = `
window.__saneluAloituksia = 0;
class TestiTunnistus {
  constructor() { this.lang = ''; this.interimResults = false; this.continuous = false; }
  start() {
    window.__saneluAloituksia += 1;
    window.__sanelu = this;
    setTimeout(() => {
      this.onresult?.({ results: [[{ transcript: window.__saneluTeksti ?? '' }]] });
      this.onend?.();
    }, 30);
  }
  stop() { this.onend?.(); }
  abort() { this.onend?.(); }
}
window.SpeechRecognition = TestiTunnistus;
`;

/** Rajapinnan mock: ehdotukset ja vastaus. Pyyntörungot jäävät talteen. */
async function kytkeRajapinta(sivu, rungot) {
  await sivu.route(`${POLLO_URL}/**`, async (route) => {
    const runko = JSON.parse(route.request().postData() ?? '{}');
    rungot.push(runko);
    const data = runko.tehtava === 'ehdotukset'
      ? {
        ehdotukset: [
          'Miksi Lontoon metro rakennettiin?',
          'Mitä Thamesilla kuljetettiin?',
          'Millainen kaupunki Lontoo oli 1873?',
        ],
      }
      : { vastaus: 'Lontoon metro avattiin vuonna 1863 ja se oli maailman ensimmäinen.' };
    await route.fulfill({
      status: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify(data),
    });
  });
  // Osoite on .invalid, mutta route on rekisteröity myös ilman polkua.
  await sivu.route(POLLO_URL, (route) => route.fallback());
}

/** Avaa pelin, käynnistää sen ja vie pelaajan Lontooseen. */
async function avaaPeli(ctx, { sanelu = true } = {}) {
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  /*
   * Ulkoiset osoitteet katkaistaan tarkoituksella (route.abort), ja
   * selain kirjaa jokaisesta "Failed to load resource". Se on savukkeen
   * oma jälki eikä pelin virhe, joten se suodatetaan pois — muut
   * konsolivirheet kaatavat ajon kuten pitääkin.
   */
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    virheet.push(`konsoli: ${m.text()}`);
  });
  /*
   * Chromiumissa on oma webkitSpeechRecognition, joten "ei tuettu"
   * -tilaa ei synny pelkästään jättämällä mock pois — molemmat nimet on
   * poistettava erikseen.
   */
  await sivu.addInitScript(sanelu ? SANELU_MOCK
    : 'delete window.SpeechRecognition; delete window.webkitSpeechRecognition;');
  await sivu.route((url) => !/127\.0\.0\.1|localhost|pollo\.testi\.invalid/.test(url.href),
    (route) => route.abort());
  await sivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
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
  return { sivu, virheet };
}

/* ================================================================== */
/* 1) Alanappirivi ja liuku                                            */
/* ================================================================== */

const ctx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const rungot = [];
const { sivu, virheet } = await avaaPeli(ctx);
await kytkeRajapinta(sivu, rungot);

const rivi = await sivu.evaluate(() => {
  const perus = document.querySelector('.toimintorivi-perus');
  if (!perus) return { virhe: 'alanappiriviä ei löydy' };
  return {
    paikkoja: perus.children.length,
    monitoimi: Boolean(perus.querySelector('.monitoimi-nappi')),
    pollo: Boolean(perus.querySelector('.pollo-paikka .pollo-nappi')),
    tutki: perus.lastElementChild?.getAttribute('aria-label') ?? '',
    liukuNapit: document.querySelectorAll('.toimintorivi-liuku button').length,
  };
});
vaadi('alanappirivissä on kolme paikkaa', rivi.paikkoja === 3, JSON.stringify(rivi));
vaadi('vasemmalla monitoiminappi', rivi.monitoimi === true);
vaadi('keskellä pöllö', rivi.pollo === true);
vaadi('oikealla suurennuslasi (Tutki)', /tutki/i.test(rivi.tutki), rivi.tutki);
vaadi('matkustusnapit ovat liu\'ussa', rivi.liukuNapit >= 1, `${rivi.liukuNapit} kpl`);

await sivu.screenshot({ path: join(ULOS, 'pollo-rivi-kiinni-390.png') });

const auki = await sivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 350));
  const rivi = document.querySelector('.toimintorivi');
  const liuku = document.querySelector('.toimintorivi-liuku');
  return {
    luokka: rivi.classList.contains('liuku-auki'),
    aria: document.querySelector('.monitoimi-nappi').getAttribute('aria-expanded'),
    napit: [...liuku.querySelectorAll('button')].map((b) => b.getAttribute('aria-label')),
    // Liuku peittää pöllön ja Tutkin, ei monitoiminappia.
    peittaaPollon: liuku.getBoundingClientRect().left
      > document.querySelector('.monitoimi-nappi').getBoundingClientRect().left,
  };
});
vaadi('monitoiminappi avaa liu\'un', auki.luokka === true && auki.aria === 'true',
  JSON.stringify(auki));
vaadi('liuku alkaa monitoiminapin jälkeen', auki.peittaaPollon === true);
vaadi('liu\'ussa on matkustusnapit', auki.napit.length >= 1, auki.napit.join(' | '));

await sivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-390.png') });

const karttaSulkee = await sivu.evaluate(async () => {
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await new Promise((r) => setTimeout(r, 300));
  return document.querySelector('.toimintorivi').classList.contains('liuku-auki');
});
vaadi('kartan napautus sulkee liu\'un', karttaSulkee === false);

/*
 * Matkustusnappi toimii liu'usta täsmälleen kuten ennen.
 *
 * Klikataan sitä nappia, joka riviltä oikeasti löytyy: tarjolla olevat
 * matkustustavat riippuvat kaupungista ja rahoista, eikä savuke saa
 * olettaa juuri tiettyä nappia. Toiminto on onnistunut, jos vaihe
 * vaihtui TAI matkavalikko siirtyi vaiheeseen B — kummassakin
 * tapauksessa nappi teki sen mitä ennenkin.
 */
const matkusti = await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  const ui = window.matkakirja.ui;
  const ennen = { vaihe: g.phase, laajennettu: ui.travelExpanded };
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = document.querySelector('.toimintorivi-liuku button');
  if (!nappi) return { virhe: 'liuku on tyhjä' };
  const nimi = nappi.getAttribute('aria-label');
  nappi.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    nimi,
    ennen,
    jalkeen: { vaihe: g.phase, laajennettu: ui.travelExpanded },
    liukuAuki: Boolean(document.querySelector('.toimintorivi')?.classList.contains('liuku-auki')),
  };
});
vaadi('matkustusnappi toimii liu\'usta',
  Boolean(matkusti.jalkeen) && (matkusti.jalkeen.vaihe !== matkusti.ennen.vaihe
    || matkusti.jalkeen.laajennettu !== matkusti.ennen.laajennettu),
  JSON.stringify(matkusti));

vaadi('liuku ei jää auki toiminnon jälkeen', matkusti.liukuAuki === false,
  JSON.stringify(matkusti));

// Nopanheitto on liu'ussa roll-vaiheessa.
const noppa = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  ui.travelExpanded = false;
  g.phase = 'roll';
  g.travelMode = 'land';
  g.autoTravel = false;
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  return {
    napit: [...document.querySelectorAll('.toimintorivi-liuku button')]
      .map((b) => b.getAttribute('aria-label')),
  };
});
vaadi('nopanheitto löytyy liu\'usta', noppa.napit.some((n) => /noppa/i.test(n ?? '')),
  noppa.napit.join(' | '));

// Estetila: ilman matkustusvaihtoehtoja monitoiminappi on harmaana.
const esto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  g.phase = 'action';
  g.travelMode = null;
  const alkuperainen = g.travelModes.bind(g);
  g.travelModes = () => [];
  g.airportDestinations = () => [];
  g.gatewayOptions = () => [];
  g.countryGateOptions = () => [];
  g.mannerLennot = () => [];
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = document.querySelector('.monitoimi-nappi');
  const tila = { estetty: nappi.disabled, rivi: Boolean(document.querySelector('.toimintorivi')) };
  g.travelModes = alkuperainen;
  return tila;
});
vaadi('monitoiminappi harmaantuu ilman vaihtoehtoja', esto.estetty === true && esto.rivi === true,
  JSON.stringify(esto));

/* ================================================================== */
/* 2-3) Pöllön paneeli, ehdotukset ja vastaus                          */
/* ================================================================== */

await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  g.phase = 'action';
  delete g.travelModes;
  delete g.airportDestinations;
  delete g.gatewayOptions;
  delete g.countryGateOptions;
  delete g.mannerLennot;
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 250));
});

const avaus = await sivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  const paneeli = document.querySelector('.pollo-paneeli');
  return {
    nakyy: !paneeli.hidden,
    ehdotuksia: paneeli.querySelectorAll('.pollo-ehdotus').length,
    tervehdys: Boolean(paneeli.querySelector('.pollo-pollo')),
    mikki: Boolean(paneeli.querySelector('.pollo-mikki')),
    // Näppäimistö ei saa avautua itsestään: kenttä on piilossa saneltaessa.
    kenttaPiilossa: paneeli.querySelector('.pollo-rivi').hidden,
  };
});
vaadi('paneeli aukeaa napautuksesta', avaus.nakyy === true);
vaadi('ehdotukset renderöityvät', avaus.ehdotuksia === 3, `${avaus.ehdotuksia} kpl`);
vaadi('sanelunappi on ensisijainen syöte', avaus.mikki === true && avaus.kenttaPiilossa === true,
  JSON.stringify(avaus));

await sivu.screenshot({ path: join(ULOS, 'pollo-paneeli-390.png') });

const kysymys = await sivu.evaluate(async () => {
  document.querySelector('.pollo-vaihda').click();
  await new Promise((r) => setTimeout(r, 150));
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Milloin Lontoon metro avattiin?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 800));
  const viestit = [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent);
  return { viestit, odottaa: document.querySelectorAll('.pollo-odottaa').length };
});
vaadi('kysymys näkyy keskustelussa',
  kysymys.viestit.some((v) => /Milloin Lontoon metro/.test(v)), JSON.stringify(kysymys.viestit));
vaadi('vastaus näkyy keskustelussa',
  kysymys.viestit.some((v) => /maailman ensimmäinen/.test(v)));
vaadi('odotusviesti poistuu vastauksen tullessa', kysymys.odottaa === 0);

/* ================================================================== */
/* 4) Spoilerisuoja ja paikallinen aineisto oikeasta pyyntörungosta     */
/* ================================================================== */

const vastausRunko = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('konteksti mahtuu kattoon', (vastausRunko.konteksti ?? '').length <= 5000,
  `${(vastausRunko.konteksti ?? '').length} merkkiä`);
vaadi('konteksti kertoo kaupungin', /Lontoo/.test(vastausRunko.konteksti ?? ''));
vaadi('pelin oma aineisto on mukana',
  /PELIN TARKISTETTUA AINEISTOA/.test(vastausRunko.konteksti ?? ''),
  (vastausRunko.konteksti ?? '').slice(0, 120));

/* ================================================================== */
/* 5) Lehtinäkymä: pöllö siirtyy lehteen, minitehtävä ei vuoda          */
/* ================================================================== */

const lehdessa = await sivu.evaluate(async () => {
  document.querySelector('.pollo-sulje').click();
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  // Selataan aihesivulle, jolla on minitehtävä.
  const sivu = (ui.tutkiSivut ?? []).findIndex((s) => s?.tehtava);
  if (sivu >= 0) ui.naytaTutkiSivu(sivu + 1, { heti: true });
  await new Promise((r) => setTimeout(r, 700));
  const lehti = document.getElementById('arrival-dialog');
  const nappi = document.querySelector('.pollo-nappi');
  return {
    lehtiAuki: lehti.open,
    polloLehdessa: lehti.contains(nappi),
    kelluu: nappi.classList.contains('pollo-kelluu'),
    tehtavia: document.querySelectorAll('#arrival-kategoria .minitehtava').length,
    tehtavanKysymys: document.querySelector('.minitehtava-kysymys')?.textContent ?? '',
  };
});
vaadi('pöllö siirtyy lehden sisään', lehdessa.polloLehdessa === true && lehdessa.kelluu === true,
  JSON.stringify(lehdessa));

const lehtiKysely = await sivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  document.querySelector('.pollo-vaihda')?.click();
  await new Promise((r) => setTimeout(r, 150));
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Mitä tällä sivulla kerrotaan?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 800));
  return true;
});
vaadi('lehdestä voi kysyä', lehtiKysely === true);

await sivu.screenshot({ path: join(ULOS, 'pollo-lehdessa-390.png') });

const lehtiRunko = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
const konteksti = lehtiRunko.konteksti ?? '';
vaadi('lehden näkymä on kontekstissa', /lehti auki/.test(konteksti), konteksti.slice(0, 90));
if (lehdessa.tehtavanKysymys) {
  vaadi('SPOILERISUOJA: minitehtävän kysymys ei ole kontekstissa',
    !konteksti.includes(lehdessa.tehtavanKysymys.trim()),
    lehdessa.tehtavanKysymys.slice(0, 60));
} else {
  vaadi('SPOILERISUOJA: sivulla ei ollut minitehtävää testattavaksi', false,
    'tarkista, avautuiko aihesivu');
}

/* ================================================================== */
/* 6) Pelinsisäinen linkki                                             */
/* ================================================================== */

const linkki = await sivu.evaluate(async () => {
  const linkit = [...document.querySelectorAll('.pollo-linkki')].map((b) => b.textContent);
  if (!linkit.length) return { linkit };
  const ui = window.matkakirja.ui;
  const ennen = { maalehti: ui.tutkiMaaLehti, sivu: ui.tutkiSivu };
  document.querySelector('.pollo-linkki').click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    linkit,
    ennen,
    jalkeen: { maalehti: ui.tutkiMaaLehti, sivu: ui.tutkiSivu },
    lehtiAuki: document.getElementById('arrival-dialog').open,
    chatKiinni: document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('vastauksen alle tulee pelinsisäisiä linkkejä', (linkki.linkit ?? []).length > 0,
  (linkki.linkit ?? []).join(' | '));
vaadi('linkki avaa lehden peliin', linkki.lehtiAuki === true, JSON.stringify(linkki));
vaadi('linkki sulkee chatin (paluu yhdellä napautuksella)', linkki.chatKiinni === true);

await sivu.screenshot({ path: join(ULOS, 'pollo-linkki-avattu-390.png') });

/* ================================================================== */
/* 7) Sanelu                                                           */
/* ================================================================== */

const sanelu = await sivu.evaluate(async () => {
  document.getElementById('arrival-dialog').close();
  await new Promise((r) => setTimeout(r, 500));
  window.__saneluTeksti = 'Kerro Thamesin silloista';
  const pollo = window.matkakirjaPollo;
  pollo.historia = [];
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  // Takaisin saneluun, jos kirjoitustila jäi päälle edellisestä kysymyksestä.
  document.querySelectorAll('.pollo-vaihda').forEach((b) => {
    if (/sanele/i.test(b.textContent)) b.click();
  });
  await new Promise((r) => setTimeout(r, 150));
  const mikki = document.querySelector('.pollo-mikki');
  const nakyy = !document.querySelector('.pollo-sanelu').hidden;
  mikki.click();
  await new Promise((r) => setTimeout(r, 900));
  const viestit = [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent);
  return { nakyy, aloituksia: window.__saneluAloituksia, viestit };
});
vaadi('sanelunappi näkyy kun tunnistus on tuettu', sanelu.nakyy === true);
vaadi('mikin napautus käynnistää tunnistuksen', sanelu.aloituksia >= 1,
  String(sanelu.aloituksia));
vaadi('puheesta tulee kysymys keskusteluun',
  sanelu.viestit.some((v) => /Kerro Thamesin silloista/.test(v)),
  JSON.stringify(sanelu.viestit.slice(-3)));

await sivu.screenshot({ path: join(ULOS, 'pollo-sanelu-390.png') });

/* Leveä ruutu: samat kaappaukset 900 pikselillä. */
const leveaCtx = await selain.newContext({ viewport: { width: 900, height: 900 }, serviceWorkers: 'block' });
const { sivu: leveaSivu } = await avaaPeli(leveaCtx);
await kytkeRajapinta(leveaSivu, []);
await leveaSivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 350));
});
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-900.png') });
await leveaSivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 800));
});
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-paneeli-900.png') });
await leveaCtx.close();

/* ================================================================== */
/* 8) Ilman puheentunnistusta: kirjoituskenttä suoraan esillä           */
/* ================================================================== */

const ilmanCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: ilmanSivu, virheet: ilmanVirheet } = await avaaPeli(ilmanCtx, { sanelu: false });
await kytkeRajapinta(ilmanSivu, []);
const ilmanSanelua = await ilmanSivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  return {
    saneluPiilossa: document.querySelector('.pollo-sanelu').hidden,
    kenttaNakyy: !document.querySelector('.pollo-rivi').hidden,
    saneleLinkkiPiilossa: document.querySelector('.pollo-syote').lastElementChild.hidden,
  };
});
vaadi('ilman puheentunnistusta kenttä on suoraan esillä',
  ilmanSanelua.saneluPiilossa === true && ilmanSanelua.kenttaNakyy === true,
  JSON.stringify(ilmanSanelua));
vaadi('ilman puheentunnistusta ei tarjota sanelua', ilmanSanelua.saneleLinkkiPiilossa === true);
vaadi('ei konsolivirheitä ilman puheentunnistusta', ilmanVirheet.length === 0,
  ilmanVirheet.join(' | '));
await ilmanSivu.screenshot({ path: join(ULOS, 'pollo-ilman-sanelua-390.png') });
await ilmanCtx.close();

/* ================================================================== */
/* 9) Ilman asetettua osoitetta: "Pöllö ei ole vielä hereillä"          */
/* ================================================================== */

polloPaalla = false;
const nukkuvaCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: nukkuvaSivu, virheet: nukkuvaVirheet } = await avaaPeli(nukkuvaCtx);
const nukkuu = await nukkuvaSivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  return {
    nappiNakyy: !document.querySelector('.pollo-nappi').hidden,
    teksti: document.querySelector('.pollo-nukkuu-otsikko')?.textContent ?? '',
    syotePiilossa: document.querySelector('.pollo-syote').hidden,
  };
});
vaadi('pöllönappi näkyy silti', nukkuu.nappiNakyy === true);
vaadi('napautus näyttää hereillä-tilan', /ei ole vielä hereillä/.test(nukkuu.teksti), nukkuu.teksti);
vaadi('syöttöalue on piilossa nukkuvana', nukkuu.syotePiilossa === true);
vaadi('hereillä-tila ei kirjoita konsoliin', nukkuvaVirheet.length === 0,
  nukkuvaVirheet.join(' | '));
await nukkuvaSivu.screenshot({ path: join(ULOS, 'pollo-ei-hereilla-390.png') });
await nukkuvaCtx.close();

vaadi('ei sivuvirheitä pääajossa', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
