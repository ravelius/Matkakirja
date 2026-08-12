/*
 * SELAINSAVUKE: Viisas Pöllö ja uusi alanappirivi.
 *
 * Yksikkötestit näkevät kontekstinkeruun ja haun, mutta eivät sitä mitä
 * oikea selain oikeasta DOMista lähettää. Tämä ajaa koko ketjun läpi:
 *
 *   1. alanappirivi: kolme paikkaa, monitoiminapin liuku auki/kiinni,
 *      liu'ussa kolme nappia (jalan, laiva, lento) jotka peittävät koko
 *      rivin, laiva- ja lentovalikon suodatus, estotilat, kartan
 *      napautus sulkee
 *   2. pöllö kartalla ja lehdessä, paneelin avaus ja sulku (ulkopuolinen
 *      napautus ja Esc — rastia ei enää ole), paperinvaalea ulkoasu ja
 *      matala alanappirivi (näppäimistö | kaiutin | mikrofoni)
 *   3. ehdotukset ja kysymys → vastaus (rajapinta mockattu route-fulfillillä)
 *   4. SPOILERISUOJA oikeasta pyyntörungosta: avoinna olevan lehden
 *      minitehtävä ei ole kontekstissa, jutun teksti on
 *   5. pelinsisäinen linkki vastauksen alla avaa oikean lehden sivun
 *   6. sanelu: mockattu SpeechRecognition, nappi → transkripti → lähetys,
 *      ja tila jossa tunnistusta ei ole lainkaan
 *   7. "Pöllö ei ole vielä hereillä" ilman asetettua osoitetta
 *   8. SANELU NATIIVISILLALTA: valesillalla (window.matkakirjaNatiivi)
 *      pöllö kutsuu sanelu.luvat/aloita eikä koske SpeechRecognitioniin
 *      — ja lehden kaiutinnappi lukee sivun sillan luenta.puhulla
 *
 * TOISEN ERÄN LISÄYKSET (13.8.2026)
 *   9. KAIUTINVIPU: päällä ollessaan uusi vastaus luetaan ääneen, eikä
 *      luentaan päädy kysymyksiä, ehdotuksia eikä jatkokysymyksiä
 *  10. JATKOKYSYMYKSET vastauksen alla ja niiden napautus
 *  11. ALLEVIIVATTU LINKKI keskellä vastausta → avaa pelin oman jutun
 *  12. KEHITTÄJÄOTSAKE lähtee vain kun koodi on talletettu
 *  13. PÄIVITYSRUUTU latauksen ajan
 *  14. NÄKYMÄN ELVYTYS: kutistunut ja palautunut näkymä ei jätä lehteä
 *      puhelinlevyiseksi
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

/*
 * VALE-NATIIVISILTA (ios/Matkakirja/Selain/natiivi-silta.js).
 *
 * WKWebView:ssä ei ole SpeechRecognitionia, joten pöllön sanelu kulkee
 * iOS-kuoressa sillan kautta. Kuorta ei voi ajaa täällä, joten sillasta
 * tehdään vale, joka kirjaa kutsut ja lähettää samat tapahtumat kuin
 * oikea: luvat → aloita → osittainen → valmis. Sama vale palvelee
 * lukijaa (js/lukija.js): luenta.puhu kirjautuu samaan listaan.
 */
const SILTA_MOCK = `
(function () {
  var kuulijat = {};
  var silta = {
    onkoNatiivi: true,
    alusta: 'ios',
    versio: 'testi',
    ominaisuudet: { luenta: true, sanelu: true },
    __kutsut: [],
    kuuntele: function (laji, kuulija) {
      (kuulijat[laji] = kuulijat[laji] || []).push(kuulija);
      return function () {
        var lista = kuulijat[laji] || [];
        var i = lista.indexOf(kuulija);
        if (i >= 0) lista.splice(i, 1);
      };
    },
    alaKuuntele: function () {},
    _tapahtuma: function (tieto) {
      for (var kuulija of (kuulijat[tieto.laji] || []).slice()) kuulija(tieto);
    }
  };
  function kirjaa(nimi, data) { silta.__kutsut.push(nimi); return data; }
  silta.luenta = {
    puhu: function (teksti) {
      window.__luettuTeksti = teksti;
      return Promise.resolve(kirjaa('luenta.puhu', {}));
    },
    pysayta: function () { return Promise.resolve(kirjaa('luenta.pysayta', { tila: 'pysaytetty' })); },
    aanet: function () { return Promise.resolve({ aanet: [] }); },
    puhuuko: function () { return Promise.resolve({ puhuu: false }); }
  };
  silta.sanelu = {
    luvat: function () {
      return Promise.resolve(kirjaa('sanelu.luvat',
        { mikrofoni: true, puheentunnistus: true, kunnossa: true }));
    },
    aloita: function () {
      kirjaa('sanelu.aloita');
      setTimeout(function () {
        silta._tapahtuma({ laji: 'sanelu-osittainen', teksti: window.__saneluTeksti || '' });
        setTimeout(function () {
          silta._tapahtuma({ laji: 'sanelu-valmis', teksti: window.__saneluTeksti || '' });
        }, 150);
      }, 150);
      return Promise.resolve({ tila: 'kuuntelee', kieli: 'fi-FI' });
    },
    lopeta: function () {
      return Promise.resolve(kirjaa('sanelu.lopeta',
        { tila: 'lopetettu', teksti: window.__saneluTeksti || '' }));
    },
    kuunteleeko: function () { return Promise.resolve({ kuuntelee: false }); }
  };
  window.matkakirjaNatiivi = silta;
}());
`;

/**
 * Mockattu puhesyntetisaattori (js/lukija.js selainPuhe).
 *
 * Headless-Chromiumissa speechSynthesis on olemassa mutta ei puhu, eikä
 * siitä saa selville MITÄ luettiin. Kaiutinvivun koko idea on juuri se,
 * että luettavaksi menee vain vastausteksti — ei kysymyksiä, ei
 * ehdotuksia — joten mock kirjaa jokaisen lausuman talteen.
 */
const PUHE_MOCK = `
window.__puhutut = [];
class TestiLausuma {
  constructor(teksti) { this.text = teksti; this.lang = ''; this.voice = null; }
}
window.SpeechSynthesisUtterance = TestiLausuma;
// speechSynthesis on selaimessa vain luettava getteri, joten sijoitus
// ei riitä — se on määriteltävä uudelleen.
Object.defineProperty(window, 'speechSynthesis', {
  configurable: true,
  get: () => ({
    getVoices: () => [],
    cancel() { window.__peruutuksia = (window.__peruutuksia ?? 0) + 1; },
    speak(lausuma) {
      window.__puhutut.push(lausuma.text);
      setTimeout(() => lausuma.onend?.(), 10);
    },
  }),
});
`;

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

/**
 * Rajapinnan mock: ehdotukset ja vastaus. Pyyntörungot jäävät talteen.
 *
 * Vastaus jäljittelee oikeaa workeria (tools/pollo/worker.js), joka
 * erottaa jatkokysymykset omaan kenttäänsä — peli ei siis koskaan näe
 * "JATKOT:"-merkintää, ja mockin on oltava samaa mieltä.
 */
async function kytkeRajapinta(sivu, rungot) {
  await sivu.route(`${POLLO_URL}/**`, async (route) => {
    const runko = JSON.parse(route.request().postData() ?? '{}');
    // Otsakkeet talteen: kehittäjäkoodi kulkee niissä.
    runko.__otsakkeet = route.request().headers();
    rungot.push(runko);
    const data = runko.tehtava === 'ehdotukset'
      ? {
        ehdotukset: [
          'Miksi Lontoon metro rakennettiin?',
          'Mitä Thamesilla kuljetettiin?',
          'Millainen kaupunki Lontoo oli 1873?',
        ],
      }
      : {
        /*
         * "varapolku" on savukkeen oma koesana: se antaa vastauksen,
         * jossa EI ole yhtään pelin indeksin sanaa, jolloin linkille ei
         * löydy ankkuria tekstistä ja sen pitää ilmestyä napiksi
         * vastauksen alle.
         */
        vastaus: /varapolku/i.test(runko.kysymys ?? '')
          ? 'Tästä ei ole pelissä juttua, mutta yleisesti ottaen kyse on vanhasta ilmiöstä.'
          : 'Lontoon metro avattiin vuonna 1863 ja se oli maailman ensimmäinen.',
        jatkot: [
          'Miten tunnelit kaivettiin?',
          'Kuka maksoi rakentamisen?',
        ],
      };
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
async function avaaPeli(ctx, { sanelu = true, silta = false } = {}) {
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
  /*
   * Puhesyntetisaattori mockataan aina paitsi natiivisiltakokeessa:
   * siellä luennan pitää mennä sillan kautta, ja mock veisi siltä
   * ensisijaisuuden todistusvoiman.
   */
  if (!silta) await sivu.addInitScript(PUHE_MOCK);
  // Natiivisilta ruiskutetaan ennen pelin skriptejä, kuten oikea kuorikin.
  if (silta) await sivu.addInitScript(SILTA_MOCK);
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
    // Liuku peittää KOKO rivin: myös monitoiminapin, joka sen avasi.
    peittaaRivin: Math.abs(liuku.getBoundingClientRect().left
      - document.querySelector('.toimintorivi-perus').getBoundingClientRect().left) < 2,
    // Perusnapit väistyvät kaikki, jotta rivissä näkyy vain kolme nappia.
    perusPiilossa: [...document.querySelectorAll('.toimintorivi-perus > *')]
      .every((el) => getComputedStyle(el).visibility === 'hidden'
        || getComputedStyle(el).opacity === '0'),
  };
});
vaadi('monitoiminappi avaa liu\'un', auki.luokka === true && auki.aria === 'true',
  JSON.stringify(auki));
vaadi('liuku peittää koko rivin', auki.peittaaRivin === true, JSON.stringify(auki));
vaadi('monitoiminappi väistyy liu\'un tieltä', auki.perusPiilossa === true,
  JSON.stringify(auki));
vaadi('liu\'ussa on matkustusnapit', auki.napit.length >= 1, auki.napit.join(' | '));

/*
 * KOLME NAPPIA: jalan, laiva ja lento erikseen (omistajan linjaus
 * 12.8.2026). Nimet luetaan aria-labelista, koska napit ovat liu'ussa
 * pelkkiä ikoneita. Estetyllä napilla nimen perässä on syy, joten
 * vertailu tehdään alkuosalla.
 */
vaadi('liu\'ussa on kolme matkustusnappia', auki.napit.length === 3, auki.napit.join(' | '));
vaadi('napit ovat jalan, laiva ja lento',
  /^Jalan/.test(auki.napit[0] ?? '') && /^Laivalla/.test(auki.napit[1] ?? '')
  && /^Lentäen/.test(auki.napit[2] ?? ''), auki.napit.join(' | '));

// Kolme nappia ei saa ahtautua kapealla ruudulla.
const leveydet = await sivu.evaluate(() => [...document.querySelectorAll('.toimintorivi-liuku button')]
  .map((b) => Math.round(b.getBoundingClientRect().width)));
vaadi('liu\'un napit eivät ahtaudu 390 pikselissä', leveydet.every((w) => w >= 44),
  leveydet.join(' / '));

await sivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-390.png') });

/*
 * SUODATUS: laivanappi näyttää vain laivat, lentonappi vain lennot ja
 * portit. Säännöt eivät muutu — vain se, mitä listassa näkyy.
 */
const suodatus = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const lista = () => [...document.querySelectorAll('.actions .ikoni-teksti')]
    .map((b) => b.textContent.trim());
  const avaa = async (nimi) => {
    const ui = window.matkakirja.ui;
    ui.suljeMatkavalikko();
    ui.render();
    await odota(200);
    document.querySelector('.monitoimi-nappi').click();
    await odota(250);
    const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
      .find((b) => new RegExp(`^${nimi}`).test(b.getAttribute('aria-label') ?? ''));
    if (!nappi || nappi.disabled) return { estetty: true, vihje: nappi?.title ?? '' };
    nappi.click();
    await odota(400);
    return { estetty: false, lista: lista(), suodatin: window.matkakirja.ui.travelSuodatin };
  };
  const laiva = await avaa('Laivalla');
  const lento = await avaa('Lentäen');
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
  await odota(200);
  return { laiva, lento };
});
vaadi('laivanappi avaa vain laivavaihtoehdot',
  suodatus.laiva.estetty === false && suodatus.laiva.suodatin === 'sea'
  && suodatus.laiva.lista.length > 0 && suodatus.laiva.lista.every((t) => /^Laivalla/.test(t)),
  JSON.stringify(suodatus.laiva));
vaadi('lentonappi ei näytä laivoja',
  suodatus.lento.estetty === false && suodatus.lento.suodatin === 'air'
  && suodatus.lento.lista.length > 0 && suodatus.lento.lista.every((t) => !/^Laivalla/.test(t)),
  JSON.stringify(suodatus.lento));

// Kaappaus suodatetusta laivavalikosta kapealla ruudulla.
await sivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  if (nappi && !nappi.disabled) nappi.click();
  await new Promise((r) => setTimeout(r, 500));
});
await sivu.screenshot({ path: join(ULOS, 'pollo-laivavalikko-390.png') });
await sivu.evaluate(async () => {
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 250));
});

/*
 * Estotila: ilman laivayhteyksiä laivanappi on harmaana ja kertoo syyn.
 * Lennot pidetään tarjolla, jotta rivi ei ole kokonaan estetty.
 */
const laivaEsto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  const alku = g.travelModes.bind(g);
  g.travelModes = () => ['land'];
  ui.suljeMatkavalikko();
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const napit = [...document.querySelectorAll('.toimintorivi-liuku button')];
  const laiva = napit.find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  const lento = napit.find((b) => /^Lentäen/.test(b.getAttribute('aria-label') ?? ''));
  const tila = {
    laivaEstetty: laiva?.disabled ?? null,
    vihje: laiva?.title ?? '',
    lentoAuki: lento ? !lento.disabled : null,
    monitoimi: document.querySelector('.monitoimi-nappi').disabled,
  };
  g.travelModes = alku;
  ui.render();
  await new Promise((r) => setTimeout(r, 200));
  return tila;
});
vaadi('ilman laivayhteyksiä laivanappi on harmaana', laivaEsto.laivaEstetty === true,
  JSON.stringify(laivaEsto));
vaadi('estetty laivanappi kertoo syyn', /laiva/i.test(laivaEsto.vihje), laivaEsto.vihje);
vaadi('estetty laiva ei estä lentoa eikä koko riviä',
  laivaEsto.lentoAuki === true && laivaEsto.monitoimi === false, JSON.stringify(laivaEsto));

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
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => !b.disabled);
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

/*
 * PAPERIPANEELI ILMAN YLÄPALKKIA (omistajan linjaus 12.8.2026).
 *
 * Otsikko ja ×-nappi ovat poissa, pohja on lehden painopaperia ja muste
 * tummaa. Kontrasti mitataan suoraan lasketuista väreistä: leipätekstin
 * pitää erottua pohjasta selvästi, koska juuri sen luettavuudesta
 * omistaja huomautti (v589, iPhone).
 */
const ulkoasu = await sivu.evaluate(() => {
  const paneeli = document.querySelector('.pollo-paneeli');
  const luminanssi = (vari) => {
    const [r, g, b] = vari.match(/[\d.]+/g).slice(0, 3).map(Number);
    const k = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b);
  };
  const cs = getComputedStyle(paneeli);
  const teksti = paneeli.querySelector('.pollo-pollo') ?? paneeli;
  const tekstiCs = getComputedStyle(teksti);
  const a = luminanssi(cs.backgroundColor);
  const b = luminanssi(tekstiCs.color);
  return {
    otsikoita: paneeli.querySelectorAll('.pollo-otsikko, .pollo-yla').length,
    sulkeita: paneeli.querySelectorAll('.pollo-sulje').length,
    pohja: cs.backgroundColor,
    muste: tekstiCs.color,
    varjo: tekstiCs.textShadow,
    kirjasin: tekstiCs.fontFamily,
    koko: parseFloat(tekstiCs.fontSize),
    pohjaKirkkaus: a,
    kontrasti: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
  };
});
vaadi('paneelissa ei ole otsikkoa eikä ×-nappia',
  ulkoasu.otsikoita === 0 && ulkoasu.sulkeita === 0, JSON.stringify(ulkoasu));
vaadi('paneelin pohja on vaalea paperi', ulkoasu.pohjaKirkkaus > 0.6,
  `${ulkoasu.pohja} (${ulkoasu.pohjaKirkkaus.toFixed(2)})`);
vaadi('leipätekstissä ei ole hehkuvarjoa', ulkoasu.varjo === 'none', ulkoasu.varjo);
vaadi('leipäteksti on lukukirjasimella', /Iowan|Charter|Palatino|serif/i.test(ulkoasu.kirjasin),
  ulkoasu.kirjasin);
vaadi('leipäteksti on vähintään 14 px', ulkoasu.koko >= 14, `${ulkoasu.koko} px`);
vaadi('kontrasti riittää (WCAG AA, 4.5:1)', ulkoasu.kontrasti >= 4.5,
  `${ulkoasu.kontrasti.toFixed(1)}:1`);

await sivu.screenshot({ path: join(ULOS, 'pollo-paneeli-390.png') });

/*
 * Sulkeminen ilman rastia: napautus paneelin ulkopuolelle ja Esc.
 * Tämä on nyt ainoa tapa sulkea chat pöllön napin lisäksi, joten se
 * mitataan erikseen molemmilla tavoilla.
 */
const sulkeminen = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const auki = () => !document.querySelector('.pollo-paneeli').hidden;
  const avaa = async () => {
    if (!auki()) document.querySelector('.pollo-nappi').click();
    await odota(400);
  };
  await avaa();
  // Napautus paneelin sisällä ei saa sulkea.
  document.querySelector('.pollo-virta').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await odota(150);
  const sisalta = auki();
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await odota(200);
  const ulkoa = auki();
  await avaa();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await odota(200);
  const escilla = auki();
  await avaa();
  return { sisalta, ulkoa, escilla, lopuksiAuki: auki() };
});
vaadi('napautus paneelin sisällä ei sulje', sulkeminen.sisalta === true,
  JSON.stringify(sulkeminen));
vaadi('napautus paneelin ulkopuolelle sulkee', sulkeminen.ulkoa === false,
  JSON.stringify(sulkeminen));
vaadi('Esc sulkee paneelin', sulkeminen.escilla === false, JSON.stringify(sulkeminen));

/*
 * ALARIVI: yksi matala nappirivi koko leveydeltä — näppäimistö,
 * kaiutin ja mikrofoni (omistajan tilaus 13.8.2026). Mikrofoni on yhä
 * levein. Selitetekstit poistuivat, joten aria-labelit ovat pakolliset.
 */
const alarivi = await sivu.evaluate(() => {
  const syote = document.querySelector('.pollo-syote');
  const rivi = document.querySelector('.pollo-sanelu');
  const kirjoita = document.querySelector('.pollo-kirjoita');
  const kaiutin = document.querySelector('.pollo-kaiutin');
  const mikki = document.querySelector('.pollo-mikki');
  const r = rivi.getBoundingClientRect();
  const k = kirjoita.getBoundingClientRect();
  const a = kaiutin.getBoundingClientRect();
  const m = mikki.getBoundingClientRect();
  return {
    pohjalla: syote.lastElementChild === rivi,
    korkeus: Math.round(r.height),
    jarjestys: [...rivi.children].map((el) => el.className.replace('pollo-nappula ', '')),
    osuusKirjoita: k.width / r.width,
    osuusKaiutin: a.width / r.width,
    osuusMikki: m.width / r.width,
    leveysSuhde: r.width / syote.getBoundingClientRect().width,
    kirjoitaLabel: kirjoita.getAttribute('aria-label') ?? '',
    kaiutinLabel: kaiutin.getAttribute('aria-label') ?? '',
    kaiutinPainettu: kaiutin.getAttribute('aria-pressed'),
    mikkiLabel: mikki.getAttribute('aria-label') ?? '',
    // Selitetekstit poistuivat: jäljellä on vain tyhjä tilarivi.
    selitteet: [...syote.querySelectorAll('p, .pollo-vaihda')]
      .map((e) => e.textContent.trim()).filter(Boolean).join(' '),
  };
});
vaadi('nappirivi on paneelin pohjalla', alarivi.pohjalla === true, JSON.stringify(alarivi));
vaadi('nappirivi on matala (alle 42 px)', alarivi.korkeus <= 42, `${alarivi.korkeus} px`);
vaadi('rivillä on kolme nappia järjestyksessä näppäimistö, kaiutin, mikrofoni',
  alarivi.jarjestys.join(' ') === 'pollo-kirjoita pollo-kaiutin pollo-mikki',
  alarivi.jarjestys.join(' '));
vaadi('mikrofoni on yhä levein, näppäimistö ja kaiutin yhtä leveät',
  Math.abs(alarivi.osuusKirjoita - alarivi.osuusKaiutin) < 0.02
  && alarivi.osuusMikki > alarivi.osuusKirjoita * 1.7,
  `${alarivi.osuusKirjoita.toFixed(2)} / ${alarivi.osuusKaiutin.toFixed(2)} / ${alarivi.osuusMikki.toFixed(2)}`);
vaadi('rivi on koko paneelin levyinen', alarivi.leveysSuhde > 0.9,
  alarivi.leveysSuhde.toFixed(2));
vaadi('kuvakkeilla on aria-labelit',
  /kirjoita/i.test(alarivi.kirjoitaLabel) && /ääneen/i.test(alarivi.mikkiLabel)
  && /lue|luenta/i.test(alarivi.kaiutinLabel),
  `${alarivi.kirjoitaLabel} | ${alarivi.kaiutinLabel} | ${alarivi.mikkiLabel}`);
vaadi('kaiutin on vipu (aria-pressed) ja aluksi pois päältä',
  alarivi.kaiutinPainettu === 'false', String(alarivi.kaiutinPainettu));
vaadi('mikin alta poistuivat tekstiselitteet', alarivi.selitteet === '',
  alarivi.selitteet.slice(0, 60));

await sivu.screenshot({ path: join(ULOS, 'pollo-paneeli-390.png') });

// Näppäimistönappi avaa kentän nappirivin YLÄPUOLELLE: mikrofoni pysyy
// näkyvissä, joten saneluun palataan yhdellä napautuksella.
const kirjoitustila = await sivu.evaluate(async () => {
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 250));
  const kentta = document.querySelector('.pollo-rivi');
  const rivi = document.querySelector('.pollo-sanelu');
  return {
    kenttaNakyy: !kentta.hidden,
    riviNakyy: !rivi.hidden,
    kenttaYlla: kentta.getBoundingClientRect().top < rivi.getBoundingClientRect().top,
  };
});
vaadi('näppäimistönappi avaa kirjoituskentän',
  kirjoitustila.kenttaNakyy === true && kirjoitustila.kenttaYlla === true,
  JSON.stringify(kirjoitustila));
vaadi('nappirivi pysyy näkyvissä kirjoitettaessa', kirjoitustila.riviNakyy === true);
await sivu.screenshot({ path: join(ULOS, 'pollo-kirjoitus-390.png') });

const kysymys = await sivu.evaluate(async () => {
  document.querySelector('.pollo-kirjoita').click();
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
/* 3b) Jatkokysymykset ja alleviivattu linkki                          */
/* ================================================================== */

/*
 * JATKOKYSYMYKSET tulevat workerilta omana kenttänään, ja peli näyttää
 * ne nappeina vastauksen alla. Raaka "JATKOT:"-merkintä ei saa näkyä
 * missään — jäsennys tehdään palvelimella.
 */
const jatkot = await sivu.evaluate(() => {
  // Virrassa on aiempienkin vastausten ryhmiä: mitataan viimeisin.
  const ryhma = [...document.querySelectorAll('.pollo-jatkot')].at(-1);
  const napit = [...(ryhma?.querySelectorAll('.pollo-jatko') ?? [])];
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  return {
    maara: napit.length,
    tekstit: napit.map((n) => n.textContent),
    jarjestys: vastaus ? Boolean(vastaus.compareDocumentPosition(napit[0]?.parentElement ?? vastaus)
      & Node.DOCUMENT_POSITION_FOLLOWING) : false,
    raakaaMerkintaa: /JATKOT/i.test(document.querySelector('.pollo-virta').textContent),
    // Alleviivattu linkki keskellä vastausta: teksti puhuu Lontoon
    // metrosta, ja pelin oma juttu löytyy indeksistä.
    linkkeja: vastaus?.querySelectorAll('a.pollo-tekstilinkki').length ?? 0,
    linkinTeksti: vastaus?.querySelector('a.pollo-tekstilinkki')?.textContent ?? '',
    napitAlla: [...document.querySelectorAll('.pollo-linkit')].at(-1)
      ?.querySelectorAll('.pollo-linkki').length ?? 0,
  };
});
vaadi('vastauksen alle tulee jatkokysymysnapit', jatkot.maara === 2,
  `${jatkot.maara} kpl: ${jatkot.tekstit.join(' | ')}`);
vaadi('jatkokysymykset ovat vastauksen alla', jatkot.jarjestys === true);
vaadi('raaka JATKOT-merkintä ei näy pelaajalle', jatkot.raakaaMerkintaa === false);
vaadi('vastaustekstissä on alleviivattu pelinsisäinen linkki', jatkot.linkkeja >= 1,
  `${jatkot.linkkeja} kpl (${jatkot.linkinTeksti}), varapolun nappeja ${jatkot.napitAlla}`);

await sivu.screenshot({ path: join(ULOS, 'pollo-jatkot-390.png') });

// Alleviivatun linkin napautus avaa pelin oman jutun samalla
// mekanismilla kuin vanhat "Lue:"-napit.
const tekstilinkki = await sivu.evaluate(async () => {
  const linkki = [...document.querySelectorAll('.pollo-pollo a.pollo-tekstilinkki')].at(-1);
  if (!linkki) return { onLinkkia: false };
  const ui = window.matkakirja.ui;
  linkki.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    onLinkkia: true,
    lehtiAuki: document.getElementById('arrival-dialog').open,
    maalehti: Boolean(ui.tutkiMaaLehti),
    chatKiinni: document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('alleviivattu linkki avaa pelin oman jutun',
  tekstilinkki.onLinkkia === true && tekstilinkki.lehtiAuki === true
  && tekstilinkki.chatKiinni === true, JSON.stringify(tekstilinkki));
await sivu.evaluate(async () => {
  document.getElementById('arrival-dialog').close();
  await new Promise((r) => setTimeout(r, 400));
});

/* ================================================================== */
/* 3c) Kaiutinvipu                                                     */
/* ================================================================== */

/*
 * KAIUTIN ON VIPU. Päällä ollessaan jokainen uusi vastaus luetaan heti
 * ääneen — mutta VAIN vastaus. Kysymys, ehdotukset ja jatkokysymykset
 * eivät ole pöllön puhetta, eivätkä ne saa päätyä luentaan.
 */
const kaiutinTila = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  window.__puhutut = [];
  const kaiutin = document.querySelector('.pollo-kaiutin');
  kaiutin.click();
  await odota(120);
  const paallaHeti = {
    luokka: kaiutin.classList.contains('paalla'),
    aria: kaiutin.getAttribute('aria-pressed'),
    talletettu: localStorage.getItem('matkakirja-pollo-aani'),
    puhuttuaEnnenVastausta: window.__puhutut.length,
  };
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Milloin Lontoon metro avattiin?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  return {
    ...paallaHeti,
    puhutut: window.__puhutut.slice(),
    jatkoja: document.querySelectorAll('.pollo-jatkot .pollo-jatko').length,
  };
});
vaadi('kaiutin merkitään päälle näkyvästi ja saavutettavasti',
  kaiutinTila.luokka === true && kaiutinTila.aria === 'true', JSON.stringify(kaiutinTila));
vaadi('vipu muistetaan laitteella', kaiutinTila.talletettu === '1',
  String(kaiutinTila.talletettu));
vaadi('vivun kytkeminen ei itsessään lue mitään',
  kaiutinTila.puhuttuaEnnenVastausta === 0);
vaadi('uusi vastaus luetaan ääneen',
  kaiutinTila.puhutut.join(' ').includes('Lontoon metro avattiin'),
  JSON.stringify(kaiutinTila.puhutut));
vaadi('kysymystä ei lueta ääneen',
  !kaiutinTila.puhutut.some((t) => /Milloin Lontoon metro avattiin\?/.test(t)),
  JSON.stringify(kaiutinTila.puhutut));
vaadi('jatkokysymyksiä ei lueta ääneen',
  kaiutinTila.jatkoja > 0
  && !kaiutinTila.puhutut.some((t) => /Miten tunnelit kaivettiin/.test(t)),
  JSON.stringify(kaiutinTila.puhutut));

await sivu.screenshot({ path: join(ULOS, 'pollo-kaiutin-390.png') });

// Jatkokysymyksen napautus lähettää sen kysymyksenä.
const jatkoKlikki = await sivu.evaluate(async () => {
  const nappi = document.querySelector('.pollo-jatkot .pollo-jatko');
  const teksti = nappi?.textContent ?? '';
  nappi?.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    teksti,
    kysytty: [...document.querySelectorAll('.pollo-kayttaja')].some((v) => v.textContent === teksti),
  };
});
vaadi('jatkokysymyksen napautus lähettää sen', jatkoKlikki.kysytty === true,
  JSON.stringify(jatkoKlikki));

// Vipu pois: luenta lakkaa ja tila unohtuu talletuksesta.
const kaiutinPois = await sivu.evaluate(async () => {
  const kaiutin = document.querySelector('.pollo-kaiutin');
  kaiutin.click();
  await new Promise((r) => setTimeout(r, 100));
  window.__puhutut = [];
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 120));
  document.querySelector('.pollo-kentta').value = 'Entä Thames?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 900));
  return {
    aria: kaiutin.getAttribute('aria-pressed'),
    talletettu: localStorage.getItem('matkakirja-pollo-aani'),
    puhutut: window.__puhutut.length,
  };
});
vaadi('vipu pois: vastausta ei enää lueta',
  kaiutinPois.aria === 'false' && kaiutinPois.puhutut === 0, JSON.stringify(kaiutinPois));
vaadi('pois kytketty vipu ei jää talletukseen', !kaiutinPois.talletettu,
  String(kaiutinPois.talletettu));

/* ================================================================== */
/* 3d) Kehittäjäkoodi otsakkeessa                                      */
/* ================================================================== */

/*
 * Otsake lähtee VAIN jos koodi on talletettu laitteelle. Ilman koodia
 * pyynnössä ei saa olla mitään jälkeä kehittäjätilasta.
 */
const ilmanKoodia = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('ilman koodia kehittäjäotsaketta ei lähetetä',
  !('x-pollo-kehittaja' in (ilmanKoodia.__otsakkeet ?? {})),
  JSON.stringify(Object.keys(ilmanKoodia.__otsakkeet ?? {})));

const koodilla = await sivu.evaluate(async () => {
  localStorage.setItem('matkakirja-pollo-kehittajakoodi', 'testikoodi-123');
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 120));
  document.querySelector('.pollo-kentta').value = 'Kuka rakensi metron?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 900));
  localStorage.removeItem('matkakirja-pollo-kehittajakoodi');
  return true;
});
const koodillinen = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('talletettu koodi lähtee otsakkeessa',
  koodilla === true
  && (koodillinen.__otsakkeet ?? {})['x-pollo-kehittaja'] === 'testikoodi-123',
  JSON.stringify((koodillinen.__otsakkeet ?? {})['x-pollo-kehittaja']));

// Kehittäjäkoodin kenttä näkyy vain kehittäjätilassa.
const koodikentta = await sivu.evaluate(async () => {
  const pollo = window.matkakirjaPollo;
  const ennen = pollo.kehittajaRivi.hidden;
  localStorage.setItem('matkakirja-kehittaja', '1');
  pollo.sulje();
  await new Promise((r) => setTimeout(r, 150));
  pollo.avaa();
  await new Promise((r) => setTimeout(r, 400));
  const jalkeen = pollo.kehittajaRivi.hidden;
  localStorage.removeItem('matkakirja-kehittaja');
  return { ennen, jalkeen };
});
vaadi('kehittäjäkoodin kenttä näkyy vain kehittäjätilassa',
  koodikentta.ennen === true && koodikentta.jalkeen === false, JSON.stringify(koodikentta));

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
  // Paneelissa ei ole enää ×-nappia: sulku tulee ulkopuolelta.
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await new Promise((r) => setTimeout(r, 200));
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
  document.querySelector('.pollo-kirjoita')?.click();
  await new Promise((r) => setTimeout(r, 150));
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Mitä tällä sivulla kerrotaan?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 800));
  return true;
});
vaadi('lehdestä voi kysyä', lehtiKysely === true);

/* ================================================================== */
/* 4b) Linkkisuositusten osuvuus (omistajan havainto 12.8.2026)         */
/* ================================================================== */

/*
 * Kynnys mitataan pelin OMASTA hausta oikealla aineistolla ja oikealla
 * sijainnilla — sama koodi, jota pöllö ajaa ennen jokaista kysymystä.
 * Kaksi tapausta: sijaintiin liittyvä kysymys (oman maan pitää tulla
 * ensin) ja yleiskysymys, johon aineistossa ei ole vastausta (silloin
 * ei yhtään linkkiä).
 */
const osuvuus = await sivu.evaluate(async () => {
  const { haeKatkelmat } = await import('/js/pollo-haku.js');
  const pollo = window.matkakirjaPollo;
  const indeksi = pollo.varmistaIndeksi();
  const game = window.matkakirja.game;
  const cityId = game.player?.pos?.city ?? null;
  const sijainti = {
    kaupunki: cityId,
    maa: cityId ? game.pack?.map?.cityCountry?.[cityId] ?? null : null,
  };
  const aja = (kysymys) => haeKatkelmat(indeksi, kysymys, { maara: 4, sijainti })
    .katkelmat.map((k) => ({ leima: k.leima, oma: k.oma }));
  return {
    sijainti,
    paikallinen: aja('Milloin Lontoon metro avattiin?'),
    yleinen: aja('Kuka oli Napoleon?'),
    hatara: aja('Kuinka vanha ihmiskunta on?'),
  };
});
vaadi('sijaintiin liittyvä kysymys nostaa oman maan ensimmäiseksi',
  osuvuus.paikallinen.length > 0 && osuvuus.paikallinen[0].oma === true,
  JSON.stringify(osuvuus.paikallinen));
vaadi('yleiskysymys ilman hyviä osumia ei tuota yhtään linkkiä',
  osuvuus.yleinen.length === 0 && osuvuus.hatara.length === 0,
  `${JSON.stringify(osuvuus.yleinen)} / ${JSON.stringify(osuvuus.hatara)}`);
vaadi('linkkejä on enintään kaksi', osuvuus.paikallinen.length <= 4
  && osuvuus.paikallinen.slice(0, 2).length <= 2, JSON.stringify(osuvuus.paikallinen));

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
/* 6) Varapolku: linkki napiksi, kun ankkuria ei löydy tekstistä        */
/* ================================================================== */

/*
 * Ensisijainen muoto on alleviivattu linkki keskellä vastausta (osio
 * 3b). Jos vastauksessa ei ole yhtään kohtaa, joka puhuisi samasta
 * asiasta, linkin on ilmestyttävä entiseen tapaan napiksi vastauksen
 * alle — ei kadottava.
 */
const linkki = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.getElementById('arrival-dialog').close();
  await odota(400);
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Kerro Lontoon metrosta varapolku';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const viesti = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  // Virrassa on aiempienkin vastausten linkkiryhmiä: viimeisin on tämän
  // vastauksen oma.
  const ryhma = [...document.querySelectorAll('.pollo-linkit')].at(-1);
  const napit = [...(ryhma?.querySelectorAll('.pollo-linkki') ?? [])];
  const linkit = napit.map((b) => b.textContent);
  if (!linkit.length) {
    return { linkit, tekstilinkkeja: viesti?.querySelectorAll('a').length ?? 0 };
  }
  napit[0].click();
  await odota(900);
  return {
    linkit,
    tekstilinkkeja: viesti?.querySelectorAll('a').length ?? 0,
    // Reitti voi olla lehti tai kohdekartan juttu — kumpikin on pelin
    // oma näkymä, ja kumpikin avautuu samalla mekanismilla.
    avautui: Boolean(document.querySelector('#arrival-dialog[open], #nahtavyys-dialog[open]')),
    chatKiinni: document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('ankkuriton vastaus saa linkin napiksi alleen', (linkki.linkit ?? []).length > 0
  && (linkki.linkit ?? []).length <= 2 && linkki.tekstilinkkeja === 0, JSON.stringify(linkki));
vaadi('varapolun linkki avaa pelin oman näkymän', linkki.avautui === true, JSON.stringify(linkki));
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
  /*
   * Alanappirivi on aina esillä, joten mikistä pääsee saneluun myös
   * kirjoitustilasta — erillistä "Sanele sen sijaan" -linkkiä ei ole.
   */
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
const leveaNapit = await leveaSivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 350));
  return [...document.querySelectorAll('.toimintorivi-liuku button')]
    .map((b) => Math.round(b.getBoundingClientRect().width));
});
vaadi('liu\'un napit eivät ahtaudu 900 pikselissä',
  leveaNapit.length === 3 && leveaNapit.every((w) => w >= 44), leveaNapit.join(' / '));
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-900.png') });

// Suodatettu laivavalikko myös leveällä ruudulla.
await leveaSivu.evaluate(async () => {
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  if (nappi && !nappi.disabled) nappi.click();
  await new Promise((r) => setTimeout(r, 500));
});
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-laivavalikko-900.png') });

await leveaSivu.evaluate(async () => {
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
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
    // Rivi jää esiin kaiuttimen takia: laite osaa lukea, vaikkei sanella.
    riviNakyy: !document.querySelector('.pollo-sanelu').hidden,
    kenttaNakyy: !document.querySelector('.pollo-rivi').hidden,
    mikkiaEiNayteta: document.querySelector('.pollo-mikki').offsetParent === null,
    kaiutinNakyy: document.querySelector('.pollo-kaiutin').offsetParent !== null,
    kaiuttimenOsuus: document.querySelector('.pollo-kaiutin').getBoundingClientRect().width
      / document.querySelector('.pollo-sanelu').getBoundingClientRect().width,
  };
});
vaadi('ilman puheentunnistusta kenttä on suoraan esillä',
  ilmanSanelua.kenttaNakyy === true, JSON.stringify(ilmanSanelua));
vaadi('ilman puheentunnistusta ei tarjota sanelua', ilmanSanelua.mikkiaEiNayteta === true);
vaadi('kaiutin jää riville, vaikka mikrofonia ei ole',
  ilmanSanelua.riviNakyy === true && ilmanSanelua.kaiutinNakyy === true,
  JSON.stringify(ilmanSanelua));
vaadi('jäljelle jäävät napit jakavat rivin (ei tyhjää saraketta)',
  ilmanSanelua.kaiuttimenOsuus > 0.4, ilmanSanelua.kaiuttimenOsuus.toFixed(2));
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

/* ================================================================== */
/* 10) Sanelu natiivisillan kautta (iOS-kuori)                         */
/* ================================================================== */

/*
 * TÄMÄ ON KOKO NATIIVISANELUN VARTIOTESTI.
 *
 * WKWebView ei tarjoa SpeechRecognitionia, joten iOS-kuoressa pöllön
 * mikrofoni toimii vain jos peli osaa käyttää siltaa. Vika ei näkyisi
 * selaimessa mitenkään — siellä SpeechRecognition on olemassa ja
 * kaikki näyttää toimivan. Siksi ajo tehdään molemmilla tavoilla:
 * sillan kanssa sillan pitää olla se, jota kutsutaan, ja ilman siltaa
 * SpeechRecognitionin (osio 7 yllä).
 *
 * Chromiumissa on oma webkitSpeechRecognition, joten mock jätetään
 * paikalleen tarkoituksella: jos peli valitsisi sen sillan sijaan,
 * __saneluAloituksia kasvaisi ja testi kaatuisi.
 */
polloPaalla = true;
const siltaCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: siltaSivu, virheet: siltaVirheet } = await avaaPeli(siltaCtx, { silta: true });
await kytkeRajapinta(siltaSivu, []);
const siltaTulos = await siltaSivu.evaluate(async () => {
  window.__saneluTeksti = 'Mitä Thamesilla kuljetettiin';
  window.matkakirjaPollo.historia = [];
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  const mikki = document.querySelector('.pollo-mikki');
  const nakyy = !document.querySelector('.pollo-sanelu').hidden;
  mikki.click();
  // Vale-silta lähettää osittaisen tuloksen vasta 150 ms:n päästä, joten
  // tässä välissä sanelu on varmasti vielä kesken.
  await new Promise((r) => setTimeout(r, 90));
  const kuunteleeKesken = mikki.classList.contains('kuuntelee');
  await new Promise((r) => setTimeout(r, 1200));
  return {
    nakyy,
    kuunteleeKesken,
    kutsut: window.matkakirjaNatiivi.__kutsut.slice(),
    selainSanelua: window.__saneluAloituksia,
    lepaa: !mikki.classList.contains('kuuntelee'),
    viestit: [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent),
  };
});
vaadi('sanelunappi näkyy myös natiivikuoressa', siltaTulos.nakyy === true);
vaadi('sanelu kysyy luvat sillalta', siltaTulos.kutsut.includes('sanelu.luvat'),
  siltaTulos.kutsut.join(' | '));
vaadi('sanelu käynnistetään sillalta', siltaTulos.kutsut.includes('sanelu.aloita'),
  siltaTulos.kutsut.join(' | '));
vaadi('SpeechRecognitionia ei käytetä kun silta on paikalla',
  siltaTulos.selainSanelua === 0, String(siltaTulos.selainSanelua));
vaadi('mikki näyttää kuuntelevaa sanelun aikana', siltaTulos.kuunteleeKesken === true);
vaadi('mikki palaa lepoon kun sanelu valmistuu', siltaTulos.lepaa === true);
vaadi('sillan puhe päätyy kysymykseksi',
  siltaTulos.viestit.some((v) => /Mitä Thamesilla kuljetettiin/.test(v)),
  JSON.stringify(siltaTulos.viestit.slice(-3)));
vaadi('natiivisanelu ei kirjoita konsoliin', siltaVirheet.length === 0,
  siltaVirheet.join(' | '));
await siltaSivu.screenshot({ path: join(ULOS, 'pollo-natiivisanelu-390.png') });

/*
 * Sama sivu todistaa vielä lukijan: kaiutinnappi lukee lehden sivun
 * sillan kautta eikä selaimen puhesyntetisaattorilla.
 */
const lukija = await siltaSivu.evaluate(async () => {
  window.matkakirjaPollo.sulje();
  const ui = window.matkakirja.ui;
  ui.openArrival(window.matkakirja.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  ui.naytaTutkiSivu(1);
  await new Promise((r) => setTimeout(r, 400));
  const nappi = document.querySelector('#arrival-dialog > .lukija-nappi');
  if (!nappi) return { onNappi: false };
  const piilossa = nappi.hidden;
  nappi.click();
  await new Promise((r) => setTimeout(r, 200));
  const teksti = window.__luettuTeksti ?? '';
  return {
    onNappi: true,
    piilossa,
    lukee: nappi.classList.contains('lukee'),
    pituus: teksti.length,
    lahteita: /Kuva:|CC BY|Wikimedia/.test(teksti),
    kutsut: window.matkakirjaNatiivi.__kutsut.slice(),
  };
});
vaadi('lehtisivulla on kaiutinnappi', lukija.onNappi === true && lukija.piilossa === false,
  JSON.stringify(lukija));
vaadi('kaiutin lukee sivun natiivisillan kautta',
  (lukija.kutsut ?? []).includes('luenta.puhu'), (lukija.kutsut ?? []).join(' | '));
vaadi('luettavaa kertyi koko sivun verran', (lukija.pituus ?? 0) > 200, String(lukija.pituus));
vaadi('lähdemerkinnät eivät päädy luentaan', lukija.lahteita === false);
vaadi('nappi näyttää luennan olevan käynnissä', lukija.lukee === true);
await siltaCtx.close();

/* ================================================================== */
/* 11) Päivitysruutu                                                   */
/* ================================================================== */

/*
 * Päivityksen jälkeisen latauksen ajan ruudulla on tumma pohja, logo ja
 * yksi rivi tekstiä — ei tyhjiä kehyksiä. Lippu on sessionStoragessa
 * (js/main.js merkitsePaivitys), ja index.html:n pikkuskripti näyttää
 * ruudun heti ensimmäisellä maalauksella.
 *
 * js/main.js viivästetään puolellatoista sekunnilla, jotta ruutu ehtii
 * kaappaukseen: oikeassa käytössä sama tila kestää yhtä kauan kuin
 * pelin rakentuminen.
 */
const paivitysCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const paivitysSivu = await paivitysCtx.newPage();
await paivitysSivu.addInitScript("try { sessionStorage.setItem('matkakirja-paivittyy', '1'); } catch (e) {}");
await paivitysSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
/*
 * js/main.js korvataan tyhjällä: näin sivu latautuu loppuun mutta peli
 * ei rakennu, eli ruudulla on täsmälleen se tila, joka päivityksen
 * aikana näkyy. Viivästäminen ei kelpaa — Playwrightin screenshot
 * odottaa sivun latautumista, joten kaappaus osuisi aina vasta pelin
 * käynnistymisen jälkeen.
 */
await paivitysSivu.route(/js\/main\.js$/, (route) => route.fulfill({
  status: 200, contentType: 'text/javascript', body: '',
}));
await paivitysSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await paivitysSivu.waitForTimeout(300);
await paivitysSivu.screenshot({ path: join(ULOS, 'paivitysruutu-390.png') });
const paivitysruutu = await paivitysSivu.evaluate(() => {
  const ruutu = document.getElementById('paivitysruutu');
  const cs = getComputedStyle(ruutu);
  const luminanssi = (vari) => {
    const [r, g, b] = vari.match(/[\d.]+/g).slice(0, 3).map(Number);
    const k = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b);
  };
  return {
    nakyy: !ruutu.hidden && cs.display !== 'none',
    peittaa: ruutu.getBoundingClientRect().height >= window.innerHeight - 1,
    tumma: luminanssi(cs.backgroundColor) < 0.05,
    logo: Boolean(ruutu.querySelector('img')),
    teksti: ruutu.querySelector('.paivitysruutu-teksti')?.textContent ?? '',
    peliPiilossa: getComputedStyle(document.querySelector('.app')).visibility === 'hidden',
  };
});
vaadi('päivitysruutu näkyy latauksen ajan', paivitysruutu.nakyy === true,
  JSON.stringify(paivitysruutu));
vaadi('päivitysruutu peittää koko ruudun tummana', paivitysruutu.peittaa === true
  && paivitysruutu.tumma === true, JSON.stringify(paivitysruutu));
vaadi('päivitysruudussa on logo ja odotusteksti', paivitysruutu.logo === true
  && /Päivitetään, odota hetki/.test(paivitysruutu.teksti), paivitysruutu.teksti);
vaadi('rakentumaton peli ei näy ruudun alta', paivitysruutu.peliPiilossa === true);
await paivitysCtx.close();

/*
 * Sama lippu oikealla latauksella: kun peli on rakennettu, ruudun on
 * väistyttävä ja lipun siivouduttava — muuten ruutu jäisi päälle myös
 * seuraavalla avauksella.
 */
const paivitysLoppuCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const paivitysLoppuSivu = await paivitysLoppuCtx.newPage();
await paivitysLoppuSivu.addInitScript("try { sessionStorage.setItem('matkakirja-paivittyy', '1'); } catch (e) {}");
await paivitysLoppuSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await paivitysLoppuSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await paivitysLoppuSivu.waitForTimeout(2500);
const paivitysLoppu = await paivitysLoppuSivu.evaluate(() => ({
  ruutuPiilossa: document.getElementById('paivitysruutu').hidden,
  luokkaPois: !document.body.classList.contains('paivittyy'),
  lippuPois: (() => {
    try { return sessionStorage.getItem('matkakirja-paivittyy') === null; } catch { return true; }
  })(),
  peliNakyy: getComputedStyle(document.querySelector('.app')).visibility !== 'hidden',
}));
vaadi('päivitysruutu väistyy kun peli on rakennettu',
  paivitysLoppu.ruutuPiilossa === true && paivitysLoppu.luokkaPois === true
  && paivitysLoppu.peliNakyy === true, JSON.stringify(paivitysLoppu));
vaadi('päivityslippu siivotaan latauksen jälkeen', paivitysLoppu.lippuPois === true);
await paivitysLoppuCtx.close();

/* ================================================================== */
/* 12) Näkymän elvytys taustalta palatessa                             */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026 (iPad, TestFlight): sama maalehti oli
 * ensin leveä ja monipalstainen, ja toisessa apissa käynnin jälkeen se
 * avautui kapeana yksipalstaisena. WKWebView ilmoittaa taustalta
 * palatessa hetkeksi väärän näkymäkoon, ja jos asettelu lasketaan
 * silloin, lehti jää puhelinlevyiseksi.
 *
 * Tässä sama tilanne rakennetaan käsin: lehti auki leveällä ruudulla,
 * näkymä kutistuu dokumentin ollessa piilossa, ja palaa sitten
 * esiin oikean kokoisena. Arkin pitää olla taas leveä ilman että
 * pelaaja sulkee ja avaa lehden.
 */
const elvytysCtx = await selain.newContext({ viewport: { width: 900, height: 900 }, serviceWorkers: 'block' });
const { sivu: elvytysSivu, virheet: elvytysVirheet } = await avaaPeli(elvytysCtx);
await kytkeRajapinta(elvytysSivu, []);
await elvytysSivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
});
const arkinLeveys = () => elvytysSivu.evaluate(() => Math.round(
  document.querySelector('#arrival-dialog .dialog-card').getBoundingClientRect().width,
));
const leveaEnnen = await arkinLeveys();

// Dokumentti "piiloon" ja näkymä kapeaksi: tällä mitalla ei saa sivuttaa.
await elvytysSivu.evaluate(() => {
  Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
  Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
  document.dispatchEvent(new Event('visibilitychange'));
});
await elvytysSivu.setViewportSize({ width: 320, height: 900 });
await elvytysSivu.waitForTimeout(400);
const piilossa = await elvytysSivu.evaluate(() => ({
  epavarma: window.matkakirja.ui.nakymaEpavarma === true,
  elvytyksia: window.matkakirja.ui.nakymaElvytyksia,
  muistettuLeveys: window.matkakirja.ui.nakymanLeveys,
}));
vaadi('piilossa kutistunut näkymä ei laukaise sivutusta',
  piilossa.epavarma === true && piilossa.elvytyksia === 0 && piilossa.muistettuLeveys >= 700,
  JSON.stringify(piilossa));

// Näkymä palaa esiin oikean kokoisena.
await elvytysSivu.setViewportSize({ width: 900, height: 900 });
await elvytysSivu.evaluate(() => {
  Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
  Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
  document.dispatchEvent(new Event('visibilitychange'));
});
await elvytysSivu.waitForTimeout(700);
const leveaJalkeen = await arkinLeveys();
const elvytys = await elvytysSivu.evaluate(() => ({
  elvytyksia: window.matkakirja.ui.nakymaElvytyksia,
  lehtiAuki: document.getElementById('arrival-dialog').open,
}));
vaadi('arkki palaa leveäksi ilman lehden sulkemista',
  leveaJalkeen >= leveaEnnen - 2 && elvytys.lehtiAuki === true,
  `${leveaEnnen} → ${leveaJalkeen} px`);
vaadi('elvytys ajettiin kerran, kun koko palautui', elvytys.elvytyksia >= 1,
  String(elvytys.elvytyksia));
vaadi('näkymän elvytys ei kirjoita konsoliin', elvytysVirheet.length === 0,
  elvytysVirheet.join(' | '));
await elvytysCtx.close();

vaadi('ei sivuvirheitä pääajossa', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
