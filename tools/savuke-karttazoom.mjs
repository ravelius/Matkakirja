/*
 * SAVUKE: kaupunkikartan zoom ja panorointi (omistajan tilaus
 * 14.8.2026: "voiko kaupunkikartasta tehdä zoomattavaa (myös
 * satelliittikartasta) ... pyörisi nykyisessä ikkunassa").
 *
 *   node tools/savuke-karttazoom.mjs [kaupunki]
 *
 * Ajaa oikeat eleet oikeassa selaimessa ja mittaa sen, mitä silmä ei
 * kaappauksesta näe:
 *
 *   1. KOHDEPISTEET PYSYVÄT KARTALLA. Piste on prosentteina lavasta,
 *      joten sen suhteellisen paikan KUVASSA on oltava sama zoomista ja
 *      panoroinnista riippumatta. Tämä on koko toteutuksen ydinväite —
 *      jos se pettää, numeroympyrä osoittaa väärää korttelia.
 *   2. PANOROINTI PYSYY REUNOISSA. Kartan reunan yli ei saa raahata:
 *      lavan on peitettävä kehys joka asennossa.
 *   2b. REUNUS (15.8.2026, kartat joilla on piirtoRajat). Juliste on
 *      ydinrajausta laajempi, joten panorointi jatkuu reunuksen
 *      puolelle — mutta VAIN piirrosnäkymässä, ja lepotilaan
 *      palattaessa näkymän on oltava tarkalleen ydinrajaus ilman
 *      muunnosta lavalla. Satelliittikuva on vanhalla rajauksella,
 *      joten siinä panorointi pysähtyy ydinrajauksen reunaan.
 *   3. YMPYRÄ EI PAISU. Vastaskaalauksen jälkeen numeroympyrän on
 *      oltava ruudulla suunnilleen saman kokoinen zoomatessakin.
 *   4. ELE EI VUODA LEHTEEN. Zoomattu raahaus ei saa vaihtaa lehden
 *      sivua (kytkeTutkiSelaus).
 *   5. Sama kaikki myös SATELLIITTINÄKYMÄSSÄ.
 *
 * Kaappaukset: /tmp/matkakirja-kaappaukset (KAAPPAUSKANSIO). Ne on
 * tarkoitettu KATSOTTAVIKSI — mittaukset eivät kerro, näyttääkö kartta
 * hyvältä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
const KAUPUNKI = process.argv[2] ?? 'berliini';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8734, r));

const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 900, height: 1000 },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
  hasTouch: true,
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

let virheita = 0;
const vaadi = (ehto, teksti) => {
  if (!ehto) virheita += 1;
  console.log(`${ehto ? '  ok  ' : '  EI  '} ${teksti}`);
};

await sivu.goto('http://127.0.0.1:8734/index.html?lauta=europe', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  n?.click();
});
await sivu.waitForTimeout(2500);

const avaus = await sivu.evaluate((id) => {
  const ui = window.matkakirja?.ui;
  const kaupungit = ui?.game?.pack?.cities ?? ui?.game?.pack?.map?.cities ?? [];
  const city = kaupungit.find((c) => c.id === id);
  if (!city) return { virhe: `kaupunkia ${id} ei löydy laudalta` };
  ui.openArrival(city);
  return { ok: true };
}, KAUPUNKI);
if (avaus.virhe) { console.error(avaus.virhe); process.exit(1); }
await sivu.waitForTimeout(2500);

// Kohdekartta on lehden etusivun lopussa: vieritä se näkyviin.
await sivu.evaluate(() => document.querySelector('.kartta-kehys')
  ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
await sivu.waitForTimeout(800);
await sivu.waitForFunction(() => {
  const i = document.querySelector('.kartta-lava img');
  return i && i.naturalWidth > 0;
}, null, { timeout: 20000 });

/*
 * Ydinrajauksen paikka kuvassa: lepotilassa juuri tämän on täytettävä
 * kehys, ja satelliittikuva kattaa vain tämän alan. Luvut haetaan
 * pelin omasta datasta, jottei savuke arvaa geometriaa uudelleen.
 */
const ydin = await sivu.evaluate(async (id) => {
  const m = await import('/js/packs/maakartat.js');
  return m.ydinAla(m.KAUPUNKIKARTAT[id]);
}, KAUPUNKI);
const laajennettu = ydin.leveys < 99.9;
console.log(laajennettu
  ? `\nydinrajaus kuvassa: ${ydin.x.toFixed(1)} % / ${ydin.y.toFixed(1)} %, `
    + `${ydin.leveys.toFixed(1)} × ${ydin.korkeus.toFixed(1)} % (kartta jatkuu reunoille)`
  : '\n(kartalla ei ole reunusta — piirtoRajat puuttuu)');

/** Ydinrajauksen laatikko ruudulla mittauksesta (lava on jo skaalattu). */
const ydinLaatikko = (m) => ({
  x: m.lava.x + (m.lava.w * ydin.x) / 100,
  y: m.lava.y + (m.lava.h * ydin.y) / 100,
  w: (m.lava.w * ydin.leveys) / 100,
  h: (m.lava.h * ydin.korkeus) / 100,
});

/** Mittaa pisteiden paikat SUHTEESSA lavaan — sen on pysyttävä samana. */
const mittaa = () => sivu.evaluate(() => {
  const kehys = document.querySelector('.kartta-kehys');
  const lava = document.querySelector('.kartta-lava');
  const k = kehys.getBoundingClientRect();
  const l = lava.getBoundingClientRect();
  const piste = document.querySelectorAll('.maakartta-piste.kohde-numero');
  return {
    zoom: Number(getComputedStyle(lava).getPropertyValue('--zoom')),
    // Kehyksen SISÄLTÖlaatikko: reunaviiva on kehyksellä, ja lava
    // alkaa sen sisäpuolelta (clientLeft = reunan paksuus).
    kehys: {
      x: k.x + kehys.clientLeft, y: k.y + kehys.clientTop,
      w: kehys.clientWidth, h: kehys.clientHeight,
    },
    lava: { x: l.x, y: l.y, w: l.width, h: l.height },
    // Lepotilan invariantti: kertoimella 1 lavalla ei ole muunnosta
    // lainkaan (ks. kytkeKarttaZoom — hiusviivojen rasterointi).
    muunnos: getComputedStyle(lava).transform,
    // Piste kuvan omassa koordinaatistossa, 0–1. Sama luku joka asennossa.
    pisteet: [...piste].map((p) => {
      const r = p.getBoundingClientRect();
      return {
        u: (r.x + r.width / 2 - l.x) / l.width,
        v: (r.y + r.height / 2 - l.y) / l.height,
        koko: r.width,
      };
    }),
    jana: document.querySelector('.kartta-mittajana')?.getBoundingClientRect().width ?? 0,
    sivu: window.matkakirja.ui.lehtitila.tutkiSivu ?? null,
  };
});

const ero = (a, b) => Math.max(...a.pisteet.map((p, i) => Math.max(
  Math.abs(p.u - b.pisteet[i].u), Math.abs(p.v - b.pisteet[i].v),
)));

const laatikko = await sivu.evaluate(() => {
  const r = document.querySelector('.kartta-kehys').getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
const keski = { x: laatikko.x + laatikko.width / 2, y: laatikko.y + laatikko.height / 2 };

console.log(`\n== ${KAUPUNKI}: piirros ==`);
const pohja = await mittaa();
console.log(`  kehys ${Math.round(pohja.kehys.w)}×${Math.round(pohja.kehys.h)}, `
  + `pisteitä ${pohja.pisteet.length}, ympyrä ${pohja.pisteet[0]?.koko.toFixed(1)} px`);
vaadi(pohja.zoom === 1, 'alkutila on zoomaamaton (--zoom = 1)');
vaadi(pohja.muunnos === 'none', 'alkutilassa lavalla ei ole muunnosta');
{
  const y = ydinLaatikko(pohja);
  vaadi(
    Math.abs(y.x - pohja.kehys.x) < 1 && Math.abs(y.y - pohja.kehys.y) < 1
      && Math.abs(y.w - pohja.kehys.w) < 1 && Math.abs(y.h - pohja.kehys.h) < 1,
    'alkutilassa kehyksessä on tarkalleen ydinrajaus',
  );
}
await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-1-piirros-perus.png`), clip: laatikko });
// Koko lehden näkymä: työkalurivi, kartta ja selitteet yhdessä kuvassa.
await sivu.screenshot({
  path: join(ULOS, `zoom-${KAUPUNKI}-0-tyopoyta-lehti.png`),
  clip: {
    x: 0,
    y: Math.max(0, laatikko.y - 150),
    width: 900,
    height: Math.min(1000, laatikko.height + 320),
  },
});

/** Yksi testikierros: rulla, raahaus, tuplanapautus, nipistys. */
async function kierros(nimi, { satelliitissa = false } = {}) {
  // --- rulla lähentää osoittimen kohdalta ---
  await sivu.mouse.move(keski.x, keski.y);
  for (let i = 0; i < 6; i += 1) await sivu.mouse.wheel(0, -120);
  await sivu.waitForTimeout(400);
  const rullattu = await mittaa();
  console.log(`  rullan jälkeen zoom ${rullattu.zoom.toFixed(2)}`);
  vaadi(rullattu.zoom > 1.4, 'rulla lähentää karttaa');
  vaadi(ero(pohja, rullattu) < 0.004, 'kohdepisteet pysyvät samassa kohdassa kuvaa');
  vaadi(
    Math.abs(rullattu.pisteet[0].koko - pohja.pisteet[0].koko) < 2,
    'numeroympyrä ei paisu zoomatessa (vastaskaalaus)',
  );
  vaadi(
    Math.abs(rullattu.jana / pohja.jana - rullattu.zoom) < 0.05,
    'mittajana venyy zoomin mukana (matka pysyy oikeana)',
  );
  await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-2-${nimi}-rulla.png`), clip: laatikko });

  // --- raahaus panoroi eikä vaihda lehden sivua ---
  // (tutkiSivuNyt-kenttää ei ole koskaan ollut UI:ssa — savukevartija
  // löysi kuolleen luvun 17.8.2026; sivu tunnistetaan DOMista.)
  const sivuEnnen = await sivu.evaluate(
    () => document.querySelector('.tutki-sivu.nakyy')?.id ?? null,
  );
  await sivu.mouse.move(keski.x + 160, keski.y);
  await sivu.mouse.down();
  for (let i = 1; i <= 8; i += 1) await sivu.mouse.move(keski.x + 160 - i * 30, keski.y + i * 6);
  await sivu.mouse.up();
  await sivu.waitForTimeout(300);
  const raahattu = await mittaa();
  vaadi(raahattu.lava.x < pohja.lava.x - 20, 'raahaus panoroi karttaa');
  vaadi(ero(pohja, raahattu) < 0.004, 'pisteet seuraavat panorointia');
  vaadi(
    raahattu.lava.x <= raahattu.kehys.x + 0.6
      && raahattu.lava.x + raahattu.lava.w >= raahattu.kehys.x + raahattu.kehys.w - 0.6,
    'panorointi pysyy kuvan reunoissa (ei valkoista rakoa)',
  );
  const sivuJalkeen = await sivu.evaluate(
    () => document.querySelector('.tutki-sivu.nakyy')?.id ?? null,
  );
  vaadi(sivuEnnen === sivuJalkeen, 'raahaus ei vaihda lehden sivua');
  await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-3-${nimi}-panoroitu.png`), clip: laatikko });

  /*
   * REUNAN YLI RAAHAAMINEN EI IRROTA KARTTAA KEHYKSESTÄ. Raja on
   * SALLITTU ALA, joka on piirrosnäkymässä koko lava ja
   * satelliittinäkymässä pelkkä ydinrajaus (satelliittikuvaa ei ole
   * reunukselle). Laajentamattomalla kartalla nämä ovat sama asia.
   */
  // Kolme vetoa peräkkäin: yksi veto mahtuu ikkunaan vain 600
  // pikseliä, ja reunuksellisella kartalla matkaa nurkkaan on
  // enemmän kuin sen verran.
  for (let veto = 0; veto < 3; veto += 1) {
    await sivu.mouse.move(keski.x - 200, keski.y - 150);
    await sivu.mouse.down();
    for (let i = 1; i <= 10; i += 1) {
      await sivu.mouse.move(keski.x - 200 + i * 50, keski.y - 150 + i * 35);
    }
    await sivu.mouse.up();
    await sivu.waitForTimeout(200);
  }
  await sivu.waitForTimeout(200);
  const reunassa = await mittaa();
  const raja = satelliitissa ? ydinLaatikko(reunassa) : reunassa.lava;
  vaadi(
    Math.abs(raja.x - reunassa.kehys.x) < 0.6 && Math.abs(raja.y - reunassa.kehys.y) < 0.6,
    `reunan yli raahattaessa kartta pysähtyy ${satelliitissa ? 'ydinrajauksen' : 'kuvan'} reunaan`,
  );
  if (laajennettu) {
    const ydinNyt = ydinLaatikko(reunassa);
    if (satelliitissa) {
      // Satelliitissa reunusta ei saa näkyä: ydinrajauksen on
      // peitettävä kehys joka asennossa.
      vaadi(
        ydinNyt.x <= reunassa.kehys.x + 0.6 && ydinNyt.y <= reunassa.kehys.y + 0.6
          && ydinNyt.x + ydinNyt.w >= reunassa.kehys.x + reunassa.kehys.w - 0.6,
        'satelliittinäkymässä panorointi ei mene kuvan reunan yli',
      );
    } else {
      // Piirroksessa panoroinnin on jatkuttava reunukselle: kehyksen
      // vasen laita on nyt ydinrajauksen ULKOPUOLELLA.
      vaadi(ydinNyt.x > reunassa.kehys.x + 5,
        'piirroksessa panorointi jatkuu reunuksen puolelle');
    }
    await sivu.screenshot({
      path: join(ULOS, `zoom-${KAUPUNKI}-3b-${nimi}-reunus.png`),
      clip: laatikko,
    });
  }

  // --- nipistys kahdella sormella ---
  await sivu.evaluate(() => { window.matkakirja.ui.kartanZoomTesti = null; });
  const nipistetty = await nipista(1.6);
  console.log(`  nipistyksen jälkeen zoom ${nipistetty.zoom.toFixed(2)}`);
  vaadi(nipistetty.zoom > reunassa.zoom + 0.1 || nipistetty.zoom >= 2.99,
    'nipistys suurentaa karttaa');
  vaadi(ero(pohja, nipistetty) < 0.004, 'pisteet pysyvät kohdallaan nipistyksen jälkeen');

  // --- tuplanapautus palauttaa koko kartan ---
  await sivu.mouse.dblclick(keski.x, keski.y);
  await sivu.waitForTimeout(500);
  const tupla = await mittaa();
  vaadi(tupla.zoom === 1, 'tuplanapautus zoomatulla kartalla palauttaa koko kartan');
  vaadi(ero(pohja, tupla) < 0.002, 'palautettu kartta on täsmälleen alkutila');
  /*
   * LEPOTILAN KAKSI EHTOA. Kartta on juuri palannut pohjaan
   * reunukselta, ja silloin mitataan se, mitä koko ominaisuus lupaa:
   * kehyksessä on tarkalleen ydinrajaus, eikä lavalla ole muunnosta.
   * Jälkimmäinen ei ole muotoseikka — muunnos rasteroi kartan
   * hiusviivat eri tavalla (ks. kytkeKarttaZoom).
   */
  vaadi(tupla.muunnos === 'none', 'lepotilassa lavalla ei ole muunnosta');
  const ydinLepo = ydinLaatikko(tupla);
  vaadi(
    Math.abs(ydinLepo.x - tupla.kehys.x) < 1 && Math.abs(ydinLepo.y - tupla.kehys.y) < 1
      && Math.abs(ydinLepo.w - tupla.kehys.w) < 1 && Math.abs(ydinLepo.h - tupla.kehys.h) < 1,
    'lepotilassa kehyksessä on tarkalleen ydinrajaus',
  );

  // --- ja toinen tuplanapautus lähentää napautettuun kohtaan ---
  await sivu.mouse.dblclick(keski.x, keski.y);
  await sivu.waitForTimeout(500);
  const tupla2 = await mittaa();
  vaadi(tupla2.zoom > 1.9 && tupla2.zoom < 2.1, 'tuplanapautus lähentää kaksinkertaiseksi');
  await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-4-${nimi}-tuplanapautus.png`), clip: laatikko });

  // --- painikkeet loitontavat pohjaan ---
  for (let i = 0; i < 5; i += 1) {
    await sivu.click('.kartta-zoomi button[aria-label="Loitonna karttaa"]', { force: true })
      .catch(() => {});
    await sivu.waitForTimeout(120);
  }
  await sivu.waitForTimeout(400);
  const loitonnettu = await mittaa();
  vaadi(loitonnettu.zoom === 1, 'miinuspainike palauttaa kartan pohjaan');
  vaadi(await sivu.$eval('.kartta-zoomi button[aria-label="Loitonna karttaa"]', (b) => b.disabled),
    'miinuspainike on harmaana zoomaamattomana');

  /*
   * KOHTEEN NAPAUTUS ZOOMATTUNA. Tämä on eleen ja lehden rajapinnan
   * herkin kohta: raahaus ottaa osoittimen kiinni (setPointerCapture)
   * ja tuplanapautusvahti kuuntelee samaa pointerupia, joten
   * numeroympyrän napautus voisi hukkua kumpaan tahansa. Kohteen
   * jutun on auettava zoomatussa kartassa aivan kuten zoomaamattomassa.
   */
  /*
   * Nähtävyysjuttu avataan moduulifunktiolla (js/nahtavyydet.js, M4)
   * eikä ui-metodilla, joten sitä ei voi enää kietoa laskuriin —
   * avaus todetaan alla dialogin auki-tilasta. (Savukevartijan löytö
   * 17.8.2026: vanha ui.avaaNahtavyys-kietaisu kaatui M4:n jälkeen.)
   */
  await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.kohdeAvauksia = 0;
    if (!ui.alkuperainenWiki) {
      ui.alkuperainenWiki = ui.openWikiArticle.bind(ui);
      ui.openWikiArticle = (...a) => { ui.kohdeAvauksia += 1; return ui.alkuperainenWiki(...a); };
    }
  });
  await sivu.click('.kartta-zoomi button[aria-label="Lähennä karttaa"]', { force: true });
  await sivu.waitForTimeout(400);
  const pisteLaatikko = await sivu.evaluate(() => {
    const p = document.querySelector('.maakartta-piste.kohde-numero');
    const r = p.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await sivu.mouse.click(pisteLaatikko.x, pisteLaatikko.y);
  await sivu.waitForTimeout(700);
  vaadi(await sivu.evaluate(() => window.matkakirja.ui.kohdeAvauksia === 1
    || Boolean(document.getElementById('nahtavyys-dialog')?.open)),
    'zoomattuna kohteen napautus avaa jutun');
  await sivu.keyboard.press('Escape');
  await sivu.waitForTimeout(400);
  await sivu.evaluate(() => document.querySelector('.kartta-kehys')
    ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
  for (let i = 0; i < 4; i += 1) {
    await sivu.click('.kartta-zoomi button[aria-label="Loitonna karttaa"]', { force: true })
      .catch(() => {});
    await sivu.waitForTimeout(120);
  }
  vaadi((await mittaa()).zoom === 1, 'kartta palautettu pohjaan kohdekokeen jälkeen');
}

/** Nipistys kosketustapahtumilla (Playwrightilla ei ole omaa elettä). */
async function nipista(suhde) {
  await sivu.evaluate(({ s, x, y }) => {
    const kehys = document.querySelector('.kartta-kehys');
    const kosketus = (id, cx, cy) => new Touch({
      identifier: id, target: kehys, clientX: cx, clientY: cy,
    });
    const laukaise = (tyyppi, sormet) => kehys.dispatchEvent(new TouchEvent(tyyppi, {
      bubbles: true, cancelable: true, touches: sormet, targetTouches: sormet, changedTouches: sormet,
    }));
    const d = 120;
    laukaise('touchstart', [kosketus(1, x - d, y), kosketus(2, x + d, y)]);
    for (let i = 1; i <= 10; i += 1) {
      const e = d * (1 + ((s - 1) * i) / 10);
      laukaise('touchmove', [kosketus(1, x - e, y), kosketus(2, x + e, y)]);
    }
    laukaise('touchend', []);
  }, { s: suhde, x: keski.x, y: keski.y });
  await sivu.waitForTimeout(400);
  return mittaa();
}

await kierros('piirros');

// --- sama satelliittinäkymässä ---
const onSatelliitti = await sivu.$('.kartta-vipu button:nth-child(2)');
if (onSatelliitti) {
  console.log(`\n== ${KAUPUNKI}: satelliitti ==`);
  await sivu.click('.kartta-vipu button:nth-child(2)');
  await sivu.waitForTimeout(600);
  await sivu.waitForFunction(() => {
    const i = document.querySelector('.kartta-lava img');
    return i && i.naturalWidth > 0 && /satelliitti/.test(i.currentSrc);
  }, null, { timeout: 20000 });
  const satPohja = await mittaa();
  vaadi(satPohja.zoom === 1, 'näkymän vaihto ei jätä karttaa zoomatuksi');
  vaadi(ero(pohja, satPohja) < 0.002, 'kohdepisteet ovat samassa kohdassa satelliittikuvassa');
  await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-5-satelliitti-perus.png`), clip: laatikko });
  await kierros('satelliitti', { satelliitissa: true });
  await sivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-6-satelliitti-zoom.png`), clip: laatikko });
} else {
  console.log('\n(ei satelliittinäkymää tällä kaupungilla)');
}

/*
 * ELE JA LEHDEN SELAUS. Kartta on keskellä pyyhkäisyllä selattavaa
 * lehteä, joten kummallakin suunnalla on oma vaatimuksensa:
 * ZOOMAAMATON kartta jättää pyyhkäisyn lehdelle (muuten kartta olisi
 * sivulla este), ZOOMATTU kartta pitää sen itsellään (muuten
 * panorointi vaihtaisi sivua). Sivunvaihdot lasketaan suoraan
 * vaihdaTutkiSivu-kutsuista.
 */
console.log('\n== ele ja lehden selaus ==');
const pyyhkaise = async (dx, { palauta = true } = {}) => {
  await sivu.evaluate((palautaSivu) => {
    const ui = window.matkakirja.ui;
    ui.sivunvaihdot = 0;
    if (!ui.alkuperainenVaihda) {
      ui.alkuperainenVaihda = ui.vaihdaTutkiSivu.bind(ui);
      ui.vaihdaTutkiSivu = (...a) => { ui.sivunvaihdot += 1; return ui.alkuperainenVaihda(...a); };
    }
    // Takaisin lehden etusivulle: kartta on siellä, ja edellinen
    // pyyhkäisy on voinut viedä sivua eteenpäin. Sivunvaihto RAKENTAA
    // kartan uudelleen ja nollaa samalla zoomin, joten zoomattua
    // koetta ei saa aloittaa tällä.
    if (palautaSivu) ui.naytaTutkiSivu(0, { heti: true });
  }, palauta);
  await sivu.waitForTimeout(600);
  await sivu.evaluate(() => document.querySelector('.kartta-kehys')
    ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await sivu.waitForTimeout(400);
  const r = await sivu.evaluate(() => {
    const b = document.querySelector('.kartta-kehys').getBoundingClientRect();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  });
  await sivu.mouse.move(r.x - dx / 2, r.y);
  await sivu.mouse.down();
  for (let i = 1; i <= 10; i += 1) await sivu.mouse.move(r.x - dx / 2 + (dx * i) / 10, r.y);
  await sivu.mouse.up();
  await sivu.waitForTimeout(700);
  return sivu.evaluate(() => window.matkakirja.ui.sivunvaihdot);
};

vaadi((await mittaa()).zoom === 1, 'kartta on zoomaamaton ennen pyyhkäisykoetta');
const vaihdotZoomaamatta = await pyyhkaise(-320);
console.log(`  pyyhkäisy zoomaamattomalla kartalla: ${vaihdotZoomaamatta} sivunvaihtoa`);
vaadi(vaihdotZoomaamatta === 1, 'zoomaamaton kartta jättää pyyhkäisyselauksen lehdelle');

await sivu.evaluate(() => {
  window.matkakirja.ui.naytaTutkiSivu(0, { heti: true });
});
await sivu.waitForTimeout(700);
await sivu.evaluate(() => document.querySelector('.kartta-kehys')
  ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
await sivu.waitForTimeout(400);
const onKarttaa = await sivu.$('.kartta-kehys');
if (onKarttaa) {
  /*
   * Sivunvaihdon jälkeen kortilla on kertakäyttöinen napsautustulppa
   * (kytkeTutkiSelaus estää pyyhkäisyn jälkilaukauksen), joka söisi
   * seuraavan napinpainalluksen. Kulutetaan se tyhjällä napautuksella
   * kartan keskelle — muuten zoomipainike ei reagoisi.
   */
  await sivu.mouse.click(keski.x, keski.y);
  await sivu.waitForTimeout(200);
  await sivu.click('.kartta-zoomi button[aria-label="Lähennä karttaa"]', { force: true });
  await sivu.waitForTimeout(400);
  vaadi((await mittaa()).zoom > 1.4, 'kartta on zoomattu ennen toista pyyhkäisykoetta');
  const vaihdotZoomattuna = await pyyhkaise(-320, { palauta: false });
  console.log(`  pyyhkäisy zoomatulla kartalla: ${vaihdotZoomattuna} sivunvaihtoa`);
  vaadi(vaihdotZoomattuna === 0, 'zoomattu kartta pitää raahauksen itsellään');
}

/*
 * PUHELIN. Kartta on iso ja se on keskellä pystyyn vieritettävää
 * lehteä, joten kosketuksella on kaksi vaatimusta, jotka voivat sulkea
 * toisensa pois väärin toteutettuna:
 *   - zoomaamattoman kartan yli pyyhkäistään lehteä pystyyn kuten
 *     minkä tahansa kuvan yli (touch-action: pan-y);
 *   - kaksi sormea nipistää kartan, ei sivua;
 *   - zoomattuna yksi sormi panoroi karttaa eikä vieritä lehteä.
 * Eleet ajetaan selaimen omalla syötekanavalla (CDP), koska vain
 * silloin touch-action ja natiivi vieritys ovat oikeasti mukana.
 */
console.log('\n== puhelin (kosketus) ==');
const puhelin = await selain.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  serviceWorkers: 'block',
});
const psivu = await puhelin.newPage();
psivu.on('pageerror', (e) => virheet.push(`puhelin: ${e}`));
const cdp = await puhelin.newCDPSession(psivu);
const kosketa = async (tyyppi, pisteet) => {
  await cdp.send('Input.dispatchTouchEvent', {
    type: tyyppi,
    touchPoints: pisteet.map((p, i) => ({ x: p.x, y: p.y, id: i + 1 })),
  });
};

await psivu.goto('http://127.0.0.1:8734/index.html?lauta=europe', { waitUntil: 'load' });
await psivu.waitForTimeout(2500);
await psivu.evaluate(() => [...document.querySelectorAll('button')]
  .find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
await psivu.waitForTimeout(2500);
await psivu.evaluate((id) => {
  const ui = window.matkakirja.ui;
  ui.openArrival((ui.game.pack.cities ?? []).find((c) => c.id === id));
}, KAUPUNKI);
await psivu.waitForTimeout(2500);
await psivu.evaluate(() => document.querySelector('.kartta-kehys')
  ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
await psivu.waitForTimeout(600);
await psivu.waitForFunction(() => {
  const i = document.querySelector('.kartta-lava img');
  return i && i.naturalWidth > 0;
}, null, { timeout: 20000 });

const pTila = () => psivu.evaluate(() => {
  const lava = document.querySelector('.kartta-lava');
  const kortti = lava.closest('.tutki-kortti, .lehti-kortti, .dialog-kortti')
    ?? document.scrollingElement;
  return {
    zoom: Number(getComputedStyle(lava).getPropertyValue('--zoom')),
    vieritys: Math.round(lava.getBoundingClientRect().y),
    kartanX: Math.round(lava.getBoundingClientRect().x),
    kortti: kortti?.className ?? '',
  };
});

const pKeski = await psivu.evaluate(() => {
  const r = document.querySelector('.kartta-kehys').getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});

/*
 * PYSTYVIERITYS JÄTETÄÄN SELAIMELLE, eikä sitä voi tässä mitata:
 * CDP:n touch-tapahtumat eivät herätä Chromiumin omaa
 * vieritysele-tunnistinta, joten pyyhkäisy ei vieritä lehteä edes
 * TEKSTIN yli (vertailukoe alla). Sen sijaan mitataan se, mikä on
 * kartan vastuulla ja mistä natiivi vieritys seuraa:
 *   - kehyksen touch-action on `pan-y` zoomaamattomana ja `none`
 *     zoomattuna;
 *   - yhden sormen pystypyyhkäisy EI liikuta zoomaamatonta karttaa
 *     eikä zoomaa sitä (kartta ei siis varasta elettä selaimelta).
 */
const pyyhkaisePysty = async (x, y) => {
  await kosketa('touchStart', [{ x, y }]);
  for (let i = 1; i <= 10; i += 1) {
    await kosketa('touchMove', [{ x, y: y - i * 12 }]);
    await psivu.waitForTimeout(16);
  }
  await kosketa('touchEnd', []);
  await psivu.waitForTimeout(700);
};

const kosketusToiminto = () => psivu.evaluate(
  () => getComputedStyle(document.querySelector('.kartta-kehys')).touchAction,
);
vaadi(await kosketusToiminto() === 'pan-y',
  'zoomaamattoman kartan touch-action on pan-y (pystyvieritys jää selaimelle)');

const ennenVieritysta = await pTila();
const kartanKeski = await psivu.evaluate(() => {
  const r = document.querySelector('.kartta-kehys').getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await pyyhkaisePysty(kartanKeski.x, kartanKeski.y + 60);
const vierityksenJalkeen = await pTila();
console.log(`  kartan y ${ennenVieritysta.vieritys} -> ${vierityksenJalkeen.vieritys}, `
  + `x ${ennenVieritysta.kartanX} -> ${vierityksenJalkeen.kartanX}`);
vaadi(vierityksenJalkeen.zoom === 1, 'pystypyyhkäisy ei zoomaa zoomaamatonta karttaa');
vaadi(vierityksenJalkeen.kartanX === ennenVieritysta.kartanX,
  'pystypyyhkäisy ei panoroi zoomaamatonta karttaa');

// 2) kaksi sormea nipistää kartan
await psivu.evaluate(() => document.querySelector('.kartta-kehys')
  ?.scrollIntoView({ block: 'center', behavior: 'instant' }));
await psivu.waitForTimeout(400);
const p2 = await psivu.evaluate(() => {
  const r = document.querySelector('.kartta-kehys').getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await kosketa('touchStart', [{ x: p2.x - 60, y: p2.y }, { x: p2.x + 60, y: p2.y }]);
for (let i = 1; i <= 10; i += 1) {
  const d = 60 + i * 9;
  await kosketa('touchMove', [{ x: p2.x - d, y: p2.y }, { x: p2.x + d, y: p2.y }]);
}
await kosketa('touchEnd', []);
await psivu.waitForTimeout(600);
const nipistetty = await pTila();
console.log(`  nipistyksen jälkeen zoom ${nipistetty.zoom.toFixed(2)}`);
vaadi(nipistetty.zoom > 1.4, 'kaksi sormea nipistää kartan (ei sivua)');
vaadi(await kosketusToiminto() === 'none',
  'zoomatun kartan touch-action on none (sormi jää kartalle)');
await psivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-7-puhelin-nipistys.png`) });

// 3) zoomattuna yksi sormi panoroi karttaa eikä vieritä lehteä
const ennenPanorointia = await pTila();
await kosketa('touchStart', [{ x: p2.x + 80, y: p2.y }]);
for (let i = 1; i <= 8; i += 1) await kosketa('touchMove', [{ x: p2.x + 80 - i * 18, y: p2.y }]);
await kosketa('touchEnd', []);
await psivu.waitForTimeout(600);
const panoroitu = await pTila();
console.log(`  kartan x ${ennenPanorointia.kartanX} -> ${panoroitu.kartanX}, `
  + `y ${ennenPanorointia.vieritys} -> ${panoroitu.vieritys}`);
vaadi(panoroitu.kartanX < ennenPanorointia.kartanX - 20, 'zoomattuna sormi panoroi karttaa');
vaadi(
  Math.abs(panoroitu.vieritys - ennenPanorointia.vieritys) < 10,
  'zoomattu panorointi ei vieritä lehteä',
);
await psivu.screenshot({ path: join(ULOS, `zoom-${KAUPUNKI}-8-puhelin-panoroitu.png`) });

if (virheet.length) {
  console.log('\n# SIVUVIRHEET:');
  for (const v of virheet.slice(0, 6)) console.log('   ', v.slice(0, 200));
  virheita += virheet.length;
}
console.log(`\nKaappaukset: ${ULOS}`);
console.log(virheita ? `\nSAVUKE KAATUI: ${virheita} kohtaa` : '\nSAVUKE LÄPI');
await selain.close();
palvelin.close();
process.exit(virheita ? 1 : 0);
