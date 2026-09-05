/*
 * Savuke: HAVAINNEKUVAN SELITE PELIN OIKEISSA KORTEISSA.
 *
 * Omistajan bugiraportti 2.9.2026 (iPhone, Kreikka, Olympian
 * Zeus-patsaan ihmekortti, sanatarkasti): *"Havainnekuvasta puuttuu
 * popup linkki. Tarkista kaikkialta pelistä että linkki tulee
 * näkyviin"*.
 *
 * MIKSI TÄMÄ SAVUKE ON ERI KUIN savuke-kuvaputki. Kuvaputki rakentaa
 * lähderivit ITSE kutsumalla `taytaLahderivi`, ja se meni läpi koko
 * ajan — myös silloin kun linkki oli pelissä käyttökelvoton. Vika ei
 * ollut apurissa vaan siinä, mitä säiliö apurin ympärillä teki:
 *
 *   • suurennoksen paperi ohittaa eleet (pointer-events: none), ja
 *     sääntö periytyi nappiin — napautus sulki kuvan eikä avannut
 *     selitettä;
 *   • pisteviivalle oli määrätty vaalea sävy kolmelle "tummalle"
 *     säiliölle, joista kaksi on vaaleaa pergamenttia — viiva katosi
 *     paperiin ja rivi näytti pelkältä tekstiltä.
 *
 * Kumpaakaan ei näe muuten kuin AVAAMALLA PELIN OMAT KORTIT ja
 * mittaamalla nappia siellä, missä se oikeasti on. Siksi tämä savuke
 * ajaa pelin Kreikkaan ja avaa kortit yksi kerrallaan.
 *
 * VARTIOT joka pinnalla:
 *   1. Rivissä, jossa lukee "Matkakirjan havainnekuva", on nappi.
 *   2. Nappi on OSOITTIMEN ULOTTUVILLA: elementFromPoint napin
 *      keskeltä osuu nappiin eikä sen läpi taustaan.
 *   3. Pisteviiva EROTTUU taustastaan (mitattu ero riittävä) — muuten
 *      linkkiä ei näe, vaikka se toimisi.
 *   4. Napautus avaa selitepopupin oikealla otsikolla, ja popup
 *      sulkeutuu — eikä napautus sulje kuvaa altaan.
 *   5. YLEISPYYHKÄISY: missään avoinna olevassa näkymässä ei ole
 *      "Matkakirjan havainnekuva" -tekstiä ILMAN nappia.
 *
 *   node tools/savukkeet/savuke-havainnekuva.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUSPOLKU
  ?? join(JUURI, 'tools/savukkeet/kaappaukset');
mkdirSync(KAAPPAUKSET, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* Valmis peli: Fogg seisoo Ateenassa maailmankartalla (Kreikan
   fokuslehti on tehty sille laudalle — ks. savuke-fokuskohteet). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

// 1×1 pikseli kaikkien verkkokuvien tilalle: kontin selain ei pääse
// ämpäriin eikä Commonsiin, ja ilman kuvaa fokuslehti ei piirry.
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/* ------------------------------------------------------------------ *
 * Mittarit sivun sisällä
 * ------------------------------------------------------------------ */

/**
 * Kaikki näkyvät havainnekuvarivit ja niiden tila.
 *
 * Rivi tunnistetaan SISÄLLÖSTÄ eikä luokasta: mikä tahansa elementti,
 * jonka omassa tekstisolmussa tai selitenapissa lukee sanapari. Näin
 * mittari löytää myös rivin, jonka joku piirtää uudella luokalla.
 */
const MITTAA = `(() => {
  const RE = /Matkakirjan (?:havainnekuva|kuvitus)/;
  const nakyy = (el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const t = getComputedStyle(el);
    return t.visibility !== 'hidden' && t.display !== 'none' && Number(t.opacity) > 0.05;
  };
  /** Lähin läpinäkymätön taustaväri napin takana. */
  const pohja = (el) => {
    for (let p = el; p; p = p.parentElement) {
      const v = getComputedStyle(p).backgroundColor;
      const o = v.match(/[\\d.]+/g)?.map(Number) ?? [];
      if (o.length >= 3 && (o.length < 4 || o[3] > 0.5)) return o.slice(0, 3);
    }
    return [255, 255, 255];
  };
  /*
   * Väri lukuina 0-255 + alfa. Chromium palauttaa color-mixin tuloksen
   * muodossa "color(srgb 0.97 0.94 0.86 / 0.34)" eli 0-1 liukulukuina,
   * ei rgb()-kokonaislukuina — ilman skaalausta mittari luulisi
   * jokaista color-mix-viivaa lähes mustaksi.
   */
  const varit = (v) => {
    const luvut = (String(v).match(/[\\d.]+/g) ?? []).map(Number);
    if (!/^color\\(/.test(String(v))) return luvut;
    return [luvut[0] * 255, luvut[1] * 255, luvut[2] * 255, luvut[3] ?? 1];
  };
  const rivit = [];
  for (const el of document.querySelectorAll('*')) {
    // Nappi itse ei ole rivi: sen oma teksti on juuri se sanapari,
    // jonka se korvasi.
    if (el.classList?.contains('havainnekuva-selite')) continue;
    const nappi = el.querySelector?.(':scope > .havainnekuva-selite');
    const omaTeksti = [...el.childNodes]
      .some((n) => n.nodeType === 3 && RE.test(n.nodeValue || ''));
    if (!nappi && !omaTeksti) continue;
    if (!nakyy(el)) continue;
    const tila = { luokka: el.className || el.tagName, teksti: el.textContent.slice(0, 80) };
    tila.nappi = Boolean(nappi);
    if (nappi) {
      const t = getComputedStyle(nappi);
      const r = nappi.getBoundingClientRect();
      const kohta = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      tila.osuu = kohta === nappi || nappi.contains(kohta);
      tila.osoitin = t.pointerEvents;
      tila.viiva = t.borderBottomStyle;
      const [vr, vg, vb, va = 1] = varit(t.borderBottomColor);
      const [pr, pg, pb] = pohja(nappi);
      // Sekoita viivan väri taustaan sen läpinäkyvyydellä ja mittaa
      // paljonko lopputulos eroaa taustasta. Näkymätön viiva = 0.
      const ero = Math.max(
        Math.abs((vr * va + pr * (1 - va)) - pr),
        Math.abs((vg * va + pg * (1 - va)) - pg),
        Math.abs((vb * va + pb * (1 - va)) - pb),
      );
      tila.kontrasti = Math.round(ero);
    }
    rivit.push(tila);
  }
  return rivit;
})()`;

/** Avaa ensimmäisen selitteen annetulta riviltä ja lukee popupin. */
const AVAA = async (sivu, valitsin) => sivu.evaluate(async (v) => {
  document.querySelector('.minipopup')?.remove();
  const nappi = document.querySelector(`${v} .havainnekuva-selite`);
  if (!nappi) return { nappi: false };
  const r = nappi.getBoundingClientRect();
  // Napautus keskeltä nappia sen tapahtumana, jonka selain lähettäisi:
  // näin myös taustan sulkukuuntelija saa tilaisuutensa.
  nappi.dispatchEvent(new MouseEvent('click', {
    bubbles: true, cancelable: true,
    clientX: r.left + r.width / 2, clientY: r.top + r.height / 2,
  }));
  await new Promise((ok) => setTimeout(ok, 200));
  const popup = document.querySelector('.minipopup');
  return {
    nappi: true,
    auki: Boolean(popup),
    otsikko: popup?.querySelector('.minipopup-otsikko')?.textContent ?? '',
    kappaleita: popup?.querySelectorAll('.minipopup-teksti').length ?? 0,
    palautenappi: Boolean(popup?.querySelector('.havainnekuva-palautenappi')),
    // Sulkiko napautus samalla sen kuvan, jonka päällä rivi oli?
    kuvaYha: Boolean(document.querySelector(v)),
  };
}, valitsin);

const SULJE_POPUP = (sivu) => sivu.evaluate(() => {
  document.querySelector('.minipopup .minipopup-sulje')?.click();
  document.querySelector('.minipopup')?.remove();
});

/* ------------------------------------------------------------------ *
 * Yksi pinta: mittaa, väitä, avaa popup
 * ------------------------------------------------------------------ */

async function tarkistaPinta(sivu, laite, nimi, valitsin, odotettuOtsikko) {
  const rivit = await sivu.evaluate(MITTAA);
  const rivi = rivit.find((r) => (valitsin.startsWith('.')
    ? String(r.luokka).split(/\s+/).includes(valitsin.slice(1))
    : true));
  vaadi(`${laite} · ${nimi}: lähderivi löytyy ruudulta`, Boolean(rivi),
    JSON.stringify(rivit.map((r) => r.luokka)));
  if (!rivi) return;
  vaadi(`${laite} · ${nimi}: rivissä on selitenappi`, rivi.nappi, rivi.teksti);
  vaadi(`${laite} · ${nimi}: nappi on osoittimen ulottuvilla`,
    rivi.osuu === true, `pointer-events: ${rivi.osoitin}, osuu: ${rivi.osuu}`);
  vaadi(`${laite} · ${nimi}: pisteviiva erottuu taustastaan`,
    rivi.viiva === 'dotted' && rivi.kontrasti >= 30,
    `${rivi.viiva}, kontrasti ${rivi.kontrasti}`);

  const popup = await AVAA(sivu, valitsin);
  vaadi(`${laite} · ${nimi}: napautus avaa selitteen`, popup.auki === true,
    JSON.stringify(popup));
  vaadi(`${laite} · ${nimi}: oikea variantti (${odotettuOtsikko})`,
    popup.otsikko === odotettuOtsikko, popup.otsikko);
  vaadi(`${laite} · ${nimi}: selitteessä on kolme kappaletta`,
    popup.kappaleita === 3, `${popup.kappaleita}`);
  vaadi(`${laite} · ${nimi}: napautus ei sulje korttia altaan`,
    popup.kuvaYha === true);
  await SULJE_POPUP(sivu);
}

/** Yleispyyhkäisy: yksikään näkyvä rivi ei saa jäädä ilman nappia. */
async function pyyhkaise(sivu, laite, missa) {
  const rivit = await sivu.evaluate(MITTAA);
  const ilman = rivit.filter((r) => !r.nappi);
  vaadi(`${laite} · ${missa}: yksikään havainnekuvarivi ei jää ilman linkkiä`,
    ilman.length === 0, JSON.stringify(ilman));
}

/* ------------------------------------------------------------------ *
 * Ajo
 * ------------------------------------------------------------------ */

async function ajo(laite, viewport, deviceScaleFactor) {
  const ctx = await selain.newContext({
    viewport, deviceScaleFactor, reducedMotion: 'reduce', serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (r) => r.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katki: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  /*
   * Fokuslehden rajaus kertoo, että Kreikan lehti on kartalla ja
   * kohdekerros piirretty. Ilman odotusta suurennos ehtii avautua
   * kesken kerroksen rakentumista, ja `paivitaNakyvyys` sulkee sen
   * saman tien piilossa olevan kerroksen mukana (ks. js/fokuskohteet.js
   * avaaKohdeSuurennos, kohta ELINKAARI).
   */
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(2500);

  /* --- 1. IHMEKORTTI: Olympian Zeus-patsas (omistajan bugi) --- */
  const ihme = await sivu.evaluate(async () => {
    const { avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const { FOKUSKOHTEET_GRC } = await import('/js/packs/fokuskohteet-grc.js');
    avaaFokuskohde(window.matkakirja.ui,
      FOKUSKOHTEET_GRC.find((k) => k.id === 'olympia'));
    // Kortti ehtii latoutua ennen napautusta: kapealla ruudulla
    // tietoruudun mitoitus on hitaampi, ja liian aikainen napautus
    // avaisi suurennoksen kesken kortin oman piirron.
    await new Promise((ok) => setTimeout(ok, 1200));
    const nappi = document.querySelector('.fokuskohde-ihmenappi');
    nappi?.click();
    // Suurennos kasvaa ankkuristaan; odotetaan kunnes se on ruudulla
    // JA pysynyt siellä pari kierrosta (kerroksen sulkusiivous).
    let zoom = false;
    for (let i = 0; i < 16 && !zoom; i += 1) {
      await new Promise((ok) => setTimeout(ok, 200));
      zoom = Boolean(document.querySelector('.fokuskohde-zoomlahde'));
    }
    await new Promise((ok) => setTimeout(ok, 400));
    return {
      nappi: Boolean(nappi),
      zoom: Boolean(document.querySelector('.fokuskohde-zoom')),
    };
  });
  vaadi(`${laite} · Olympia: "Koe ihme" avaa suurennoksen`,
    ihme.nappi && ihme.zoom, JSON.stringify(ihme));
  await sivu.screenshot({ path: join(KAAPPAUKSET, `havainnekuva-${laite}-ihme-zeus.png`) });
  await tarkistaPinta(sivu, laite, 'ihmesuurennos (Zeus)',
    '.fokuskohde-zoomlahde', 'Mihin ihmeen kuva perustuu?');
  await pyyhkaise(sivu, laite, 'ihmesuurennos');
  await sivu.evaluate(() => {
    document.querySelector('.fokuskohde-zoom')?.remove();
    document.querySelector('.fokuskohde-popup, .fokuskohde-ruutu')?.remove();
  });

  /* --- 2. NOSTOKORTTI: Kastrin kylä (loistoaikakuva) --- *
   *
   * Kohteeseen kiinnitetty nosto ei ole kartalla omana merkkinään vaan
   * kohteen tietoruudun "Livian leikekirja" -napin takana
   * (js/fokusnosto.js nostoKohteelle) — juuri sitä reittiä pelaajakin
   * kulkee.
   */
  const nosto = await sivu.evaluate(async () => {
    const { avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const { FOKUSKOHTEET_GRC } = await import('/js/packs/fokuskohteet-grc.js');
    avaaFokuskohde(window.matkakirja.ui,
      FOKUSKOHTEET_GRC.find((k) => k.id === 'delfoi'));
    await new Promise((ok) => setTimeout(ok, 1000));
    const nappi = document.querySelector('.fokuskohde-leikekirja');
    nappi?.click();
    await new Promise((ok) => setTimeout(ok, 1000));
    return {
      leikekirja: Boolean(nappi),
      kortti: Boolean(document.querySelector('.fokusnosto-kortti')),
      otsikko: document.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    };
  });
  vaadi(`${laite} · nostokortti (Kastrin kylä) aukesi Delfoin leikekirjasta`,
    nosto.leikekirja && nosto.kortti, JSON.stringify(nosto));
  await tarkistaPinta(sivu, laite, 'nostokortti',
    '.fokusnosto-kuvalahde', 'Mihin ihmeen kuva perustuu?');
  await pyyhkaise(sivu, laite, 'nostokortti');
  await sivu.screenshot({ path: join(KAAPPAUKSET, `havainnekuva-${laite}-nostokortti.png`) });

  // Sama kuva suurennoksena: sielläkin linkin on toimittava.
  const nostoZoom = await sivu.evaluate(async () => {
    document.querySelector('.fokusnosto-kortti .fokusnosto-kuvanappi')?.click();
    await new Promise((ok) => setTimeout(ok, 1200));
    return Boolean(document.querySelector('.fokuskohde-zoomlahde'));
  });
  vaadi(`${laite} · nostokuvan suurennos aukesi`, nostoZoom === true);
  if (nostoZoom) {
    await tarkistaPinta(sivu, laite, 'nostokuvan suurennos',
      '.fokuskohde-zoomlahde', 'Mihin ihmeen kuva perustuu?');
  }
  await sivu.evaluate(() => {
    document.querySelector('.fokuskohde-zoom')?.remove();
    document.querySelector('.fokusnosto-kerros')?.remove();
    document.querySelector('.fokuskohde-popup, .fokuskohde-ruutu')?.remove();
  });

  /* --- 3. SYVENNYS: Madridin syvennystarina loistoaikakuvalla --- *
   *
   * Kortti on kartan päällä kelluva paperi eikä tunne kaupunkia, jossa
   * pelaaja seisoo, joten se avataan suoraan aineistosta — Kreikan
   * omissa syvennyksissä ei ole havainnekuvaa.
   */
  const syvennys = await sivu.evaluate(async () => {
    const { avaaSyvennys } = await import('/js/syvennys.js');
    const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
    const RE = /Matkakirjan (?:havainnekuva|kuvitus)/;
    for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
      const taky = (virta.takyt ?? []).find((t) => RE.test(t.kuva?.lahde ?? ''));
      if (!taky) continue;
      avaaSyvennys(window.matkakirja.ui, cityId, taky, virta);
      await new Promise((ok) => setTimeout(ok, 600));
      return { loytyi: true, cityId, id: taky.id };
    }
    return { loytyi: false };
  });
  vaadi(`${laite} · syvennystarina aukesi (${syvennys.cityId ?? '—'}/${syvennys.id ?? '—'})`,
    syvennys.loytyi === true);
  await tarkistaPinta(sivu, laite, 'syvennystarina',
    '.fokusnosto-kuvalahde', 'Mihin ihmeen kuva perustuu?');
  await pyyhkaise(sivu, laite, 'syvennystarina');
  await sivu.evaluate(() => document.querySelector('.syvennys-kerros')?.remove());

  /* --- 4. ELÄINTÄKY: Kreikan kilpikonnanpoikaset --- *
   *
   * Eläinkuvat ovat pelin omia generoituja kuvia (js/packs/elaintakyt.js),
   * joten kuvarivin KUULUU sanoa "Matkakirjan havainnekuva". 2.9.2026
   * asti se sanoi kortin tekstin lähdettä (en-Wikipedia) — kuva näytti
   * Wikipedian kuvalta eikä selitettä syntynyt lainkaan.
   */
  await sivu.evaluate(async () => {
    const { avaaElaintaky } = await import('/js/elaintaky.js');
    avaaElaintaky(window.matkakirja.ui, 'GRC');
    await new Promise((ok) => setTimeout(ok, 700));
  });
  vaadi(`${laite} · eläintäky (GRC) aukesi`,
    await sivu.evaluate(() => Boolean(document.querySelector('.elaintaky-kortti'))));
  await tarkistaPinta(sivu, laite, 'eläintäky',
    '.fokusnosto-kuvalahde', 'Miksi Matkakirjassa on havainnekuvia?');
  await pyyhkaise(sivu, laite, 'eläintäky');
  await sivu.screenshot({ path: join(KAAPPAUKSET, `havainnekuva-${laite}-elaintaky.png`) });
  await sivu.evaluate(() => document.querySelector('.elaintaky-kerros')?.remove());

  /* --- 5. SKANDAALI: kortissa ei ole kuvaa, mutta rivit mitataan --- */
  const skandaali = await sivu.evaluate(async () => {
    const { avaaSkandaali } = await import('/js/skandaalit.js');
    const { SKANDAALIT } = await import('/js/packs/skandaalit.js');
    const s = (SKANDAALIT.GRC ?? [])[0];
    avaaSkandaali(window.matkakirja.ui, 'GRC', s);
    await new Promise((ok) => setTimeout(ok, 600));
    return { auki: Boolean(document.querySelector('.skandaali-kortti')), id: s?.id ?? '' };
  });
  vaadi(`${laite} · skandaalikortti (${skandaali.id}) aukesi`, skandaali.auki === true);
  await pyyhkaise(sivu, laite, 'skandaalikortti');
  await sivu.evaluate(() => document.querySelector('.skandaali-kerros')?.remove());

  /* --- 6. KAUPUNKILEHTI: Ateenan avauskaruselli ja sen suurennos --- *
   *
   * Ateena on fokuskaupunki, jonka lehti on laatan takana
   * (fokusvirtaLukitseeLehden) — laatta poistetaan kääntämättömien
   * joukosta, mikä on sama tila kuin aarteen löytymisen jälkeen (sama
   * kuin savuke-nahtavyysihme tekee).
   */
  const lehti = await sivu.evaluate(async () => {
    const ui = window.matkakirja.ui;
    ui.game.tokens?.delete('ateena');
    ui.openArrival(ui.game.board.cityById.get('ateena'));
    await new Promise((ok) => setTimeout(ok, 2000));
    return {
      karuselli: Boolean(document.querySelector('#arrival-lehti-paakuva .nahtavyys-lahde')),
    };
  });
  vaadi(`${laite} · Ateenan lehden avauskaruselli latoutui`,
    lehti.karuselli === true, JSON.stringify(lehti));
  await tarkistaPinta(sivu, laite, 'lehden avauskaruselli',
    '.nahtavyys-lahde', 'Miksi Matkakirjassa on havainnekuvia?');
  await pyyhkaise(sivu, laite, 'kaupunkilehti');
  await sivu.screenshot({ path: join(KAAPPAUKSET, `havainnekuva-${laite}-lehti.png`) });

  /* --- 7. SAMA KUVA SUURENNOKSENA (kulttuurikuvan katselin) --- */
  const suurennos = await sivu.evaluate(async () => {
    document.querySelector('#arrival-lehti-paakuva .kulttuuri-kuva-nappi')?.click();
    await new Promise((ok) => setTimeout(ok, 1400));
    return Boolean(document.querySelector('.kulttuuri-suurennos .kuvalahde'));
  });
  vaadi(`${laite} · kuvan suurennos aukesi lehdestä`, suurennos === true);
  if (suurennos) {
    await tarkistaPinta(sivu, laite, 'kulttuurikuvan suurennos',
      '.kuvalahde', 'Miksi Matkakirjassa on havainnekuvia?');
    await pyyhkaise(sivu, laite, 'kulttuurikuvan suurennos');
    await sivu.screenshot({
      path: join(KAAPPAUKSET, `havainnekuva-${laite}-suurennos.png`),
    });
  }
  await sivu.evaluate(() => window.matkakirja.ui.suljeKulttuuriKuva?.());

  /* --- 8. KOHTAAMISKORTTI: kiinteä lähderivi index.html:stä --- */
  const kohtaaminen = await sivu.evaluate(async () => {
    window.matkakirja.ui.naytaKohtaamiskuva({
      osoite: 'assets/kohtaamiskuvat/ei-tata-ole.webp',
      kuvateksti: 'Aarre löytyi kujan päästä.',
      alt: 'Kohtaaminen',
      valokuva: true,
    });
    await new Promise((ok) => setTimeout(ok, 200));
    const rivi = document.querySelector('#quiz-kohtaaminen-kuvateksti .kuvalahde');
    return {
      teksti: rivi?.textContent ?? '',
      nappi: Boolean(rivi?.querySelector('.havainnekuva-selite')),
    };
  });
  vaadi(`${laite} · kohtaamiskortin kiinteä rivi saa selitteen taytaLahderivistä`,
    kohtaaminen.nappi && kohtaaminen.teksti === 'Matkakirjan kuvitus',
    JSON.stringify(kohtaaminen));

  await ctx.close();
}

await ajo('iphone', { width: 390, height: 844 }, 3);
await ajo('tyopoyta', { width: 1440, height: 900 }, 1);

await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
console.log(`kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
