/*
 * SAVUKE: PÖLLÖN SÄHKEKORTIN ASU JA MITAT (js/fokusvirta.js
 * piirraSahketehtava, css/fokusvirta.css "PÖLLÖN SÄHKETEHTÄVÄ").
 *
 *   node tools/savukkeet/savuke-sahkekortti.mjs
 *
 * MIKSI OMA SAVUKE. tools/savuke-sahketehtava.mjs mittaa sähkeen
 * MEKANIIKAN (ohilyönnit, palkkio, Livian lento, aarteen aukeaminen)
 * eikä katso ruutua lainkaan. Kun kortti sai 2.9.2026 lomakeasun
 * (omistaja: *"visuaalisesti herkullisemmaksi"*), asun mukana tuli
 * pinta, joka voi hajota hiljaa: kallistetut liuskat, rei'itetyt reunat
 * ja alaviivoille riisutut lomakekentät ovat kaikki sellaisia, jotka
 * työntävät kortin ruudun ulkopuolelle tai tekevät kentästä
 * kirjoituskelvottoman ilman että yksikään yksikkötesti huomaa.
 *
 * VÄITTEET (kummallakin ruutukoolla, iPhone 390 ja iPad 834):
 *   1. Kortti mahtuu ruudulle: sen laatikko on karttapinnan sisällä.
 *   2. EI VAAKAVIERITYSTÄ — ei kortissa, ei sen vierityssäiliössä.
 *      Juuri tämä hajoaa kallistuksista ja liuskojen varjoista.
 *   3. Lomakkeen alanappi ("Lähetä sähke pöllölle") on saavutettavissa:
 *      kun sisältö vieritetään pohjaan, nappi on kortin sisällä ja
 *      ruudulla.
 *   4. Luettava teksti on vähintään 15 px: sähkeen rivit, Livian saate,
 *      kenttien nimiöt ja itse kentät. Lomakkeen "maksurivi" on
 *      tarkoituksella pienempää pikkupränttiä eikä kuulu tähän.
 *   5. Kentät ovat KIRJOITETTAVISSA: valintalista, numerokenttä ja
 *      vapaa tekstikenttä ottavat arvon vastaan ja palauttavat sen —
 *      läpinäkyväksi tyylitelty kenttä on yhä kenttä.
 *   6. Sormenmitta säilyy: jokainen kenttä ja nappi on ≥ 44 px korkea.
 *   7. Lomakekentillä on nimiö (label), joka sisältää itse kentän.
 *   8. Asun omat osat ovat pinnalla: painettu otsake, kaksoisviiva,
 *      musteleima, liuskat ja korostettu kysymysrivi.
 *   9. Ei sivuvirheitä.
 *
 * Kaupunki on Sofia (omistajan vakiotestipolku) ja kortti avataan
 * samalla kutsulla kuin kartan vihreä piste sen avaa
 * (avaaFokusKohtaaminen) — savuke ei siis rakenna omaa reittiään.
 *
 * Kaappaukset: KAAPPAUSKANSIO tai /tmp/matkakirja-kaappaukset.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '../..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(0, r));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* Ruutukoot: omistajan omat laitteet, ei geneerisiä desktop-mittoja. */
const RUUDUT = [
  { nimi: 'iphone', leveys: 390, korkeus: 844 },
  { nimi: 'ipad', leveys: 834, korkeus: 1112 },
];

/* Sofia on omistajan vakiotestipolku; sähke on siellä pilottina. */
const KAUPUNKI = 'sofia';
/* Pikkupränttiä ei mitata 15 px:n vaatimuksella (ks. väite 4). */
const PIENI_PRANTTI = new Set(['fokusvirta-varoitus', 'fokusvirta-kuvalahde']);

for (const ruutu of RUUDUT) {
  console.log(`\n===== ${ruutu.nimi} ${ruutu.leveys}x${ruutu.korkeus}`);
  const ctx = await selain.newContext({
    viewport: { width: ruutu.leveys, height: ruutu.korkeus },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  const sivu = await ctx.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  const virheet = [];
  sivu.on('pageerror', (e) => {
    console.log(`PAGEERROR: ${String(e).slice(0, 300)}`);
    virheet.push(String(e));
  });

  await sivu.goto(`${osoite}index.html`, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const { game } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
  });

  /* Kortti auki samalla kutsulla kuin kartan vihreästä pisteestä. */
  const auki = await sivu.evaluate(async (id) => {
    const { game, ui } = window.matkakirja;
    const fv = await import('/js/fokusvirta.js');
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.phase = 'action';
    // Laatta kääntämättä = aarre on yhä edessä, joten sähke on auki.
    game.world.tokens.set(id, 'pieniAarre');
    ui.busy = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1200));
    document.querySelector('.pollo-vihje')?.remove();
    const ok = fv.avaaFokusKohtaaminen(ui, game.cityOf());
    await new Promise((r) => setTimeout(r, 700));
    return { ok, kortti: Boolean(document.querySelector('.fokusvirta-kortti')) };
  }, KAUPUNKI);
  vaadi(`${ruutu.nimi}: sähkekortti aukeaa`, auki.ok && auki.kortti, JSON.stringify(auki));

  /* ---------- mitat ruudulta ---------- */

  const mitat = await sivu.evaluate((pieni) => {
    const kortti = document.querySelector('.fokusvirta-kortti');
    const sisalto = kortti?.querySelector('.fokusvirta-sisalto');
    const pane = document.querySelector('.map-pane') ?? document.body;
    const k = kortti.getBoundingClientRect();
    const p = pane.getBoundingClientRect();
    const px = (el) => parseFloat(getComputedStyle(el).fontSize);
    const luettavat = [
      ...kortti.querySelectorAll('.fokusvirta-sahkerivi'),
      ...kortti.querySelectorAll('.fokusvirta-livian-saate p'),
      ...kortti.querySelectorAll('.fokusvirta-sahkeotsake'),
      ...kortti.querySelectorAll('.fokusvirta-sahkevalinta, .fokusvirta-sahkeluku, .fokusvirta-sahkevapaakentta'),
      ...kortti.querySelectorAll('.fokusvirta-napit button'),
    ].filter((el) => !pieni.some((l) => el.classList.contains(l)));
    const pienin = luettavat.reduce(
      (a, el) => (px(el) < a.koko ? { koko: px(el), mika: el.className } : a),
      { koko: 99, mika: '' },
    );
    const kentat = [...kortti.querySelectorAll(
      '.fokusvirta-sahkevalinta, .fokusvirta-sahkeluku, .fokusvirta-sahkevapaakentta',
    )];
    const napit = [...kortti.querySelectorAll('.fokusvirta-napit button')];
    const matalin = [...kentat, ...napit].reduce(
      (a, el) => Math.min(a, el.getBoundingClientRect().height), 999,
    );
    // Ylivuoto: kortti itse ja sen vierityssäiliö. 1 px liukuluvuille.
    const ylivuoto = Math.max(
      kortti.scrollWidth - kortti.clientWidth,
      sisalto.scrollWidth - sisalto.clientWidth,
    );
    return {
      ruudulla: k.left >= p.left - 1 && k.right <= p.right + 1
        && k.top >= p.top - 1 && k.bottom <= p.bottom + 1,
      laatikko: [Math.round(k.left), Math.round(k.top), Math.round(k.width), Math.round(k.height)],
      pane: [Math.round(p.width), Math.round(p.height)],
      ylivuoto,
      dokumenttiYlivuoto: document.documentElement.scrollWidth - window.innerWidth,
      pieninTeksti: pienin,
      matalinKosketus: Math.round(matalin),
      // Nimiö ympäröi kenttänsä: labelilla on oikea kohde ilman for-attribuuttia.
      nimioita: kentat.every((el) => el.closest('label.fokusvirta-sahkeotsake')),
      // Asun osat.
      otsake: Boolean(kortti.querySelector('.fokusvirta-sahke-otsake')),
      leima: (kortti.querySelector('.fokusvirta-sahke-leima')?.textContent ?? '').trim(),
      liuskoja: kortti.querySelectorAll('.fokusvirta-sahkeliuskat .fokusvirta-sahkerivi').length,
      kysymyksia: kortti.querySelectorAll('.fokusvirta-sahkekysymys').length,
      kysymysrivi: (kortti.querySelector('.fokusvirta-sahkekysymys')?.textContent ?? '').slice(0, 60),
    };
  }, [...PIENI_PRANTTI]);

  vaadi(`${ruutu.nimi}: kortti mahtuu karttapinnalle`, mitat.ruudulla,
    `kortti ${mitat.laatikko} / pane ${mitat.pane}`);
  vaadi(`${ruutu.nimi}: ei vaakavieritystä kortissa eikä sivulla`,
    mitat.ylivuoto <= 1 && mitat.dokumenttiYlivuoto <= 0,
    `kortti ${mitat.ylivuoto}px, dokumentti ${mitat.dokumenttiYlivuoto}px`);
  vaadi(`${ruutu.nimi}: luettava teksti vähintään 15 px`,
    mitat.pieninTeksti.koko >= 15,
    `${mitat.pieninTeksti.koko}px (${mitat.pieninTeksti.mika})`);
  vaadi(`${ruutu.nimi}: kentät ja napit ovat sormen mittaisia (44 px)`,
    mitat.matalinKosketus >= 44, `${mitat.matalinKosketus}px`);
  vaadi(`${ruutu.nimi}: jokainen kenttä on nimiönsä sisällä`, mitat.nimioita === true);
  vaadi(`${ruutu.nimi}: lomakkeessa on painettu otsake ja musteleima`,
    mitat.otsake && /sähköasema/i.test(mitat.leima), mitat.leima);
  vaadi(`${ruutu.nimi}: sähke on liimattuina liuskoina`, mitat.liuskoja >= 5,
    `${mitat.liuskoja} liuskaa`);
  vaadi(`${ruutu.nimi}: kysymysrivi on korostettu tasan kerran`,
    mitat.kysymyksia === 1 && /missä|mikä/i.test(mitat.kysymysrivi),
    `${mitat.kysymyksia}: ${mitat.kysymysrivi}`);

  // Kaappaus kortin yläosasta ennen kirjoitustestiä: se vierittää
  // kenttiä näkyviin, jolloin lomakkeen otsake ja leima jäisivät kuvan
  // ulkopuolelle.
  await sivu.screenshot({ path: join(ULOS, `sahke-${ruutu.nimi}-ylaosa.png`) });

  /* ---------- kentät ovat kirjoitettavissa ---------- */

  const kirjoitus = await sivu.evaluate(() => {
    const kortti = document.querySelector('.fokusvirta-kortti');
    const valinta = kortti.querySelector('.fokusvirta-sahkevalinta');
    const luku = kortti.querySelector('.fokusvirta-sahkeluku');
    const vapaa = kortti.querySelector('.fokusvirta-sahkevapaakentta');
    const arvo = [...valinta.options].map((o) => o.value).find((v) => v);
    valinta.value = arvo;
    luku.value = '1974';
    vapaa.value = 'varna 1974';
    /*
     * Osoittimen tapahtumat menevät kentälle asti (ei peittävää
     * koristetta). Kenttä vieritetään ensin näkyviin: kortin sisältö on
     * puhelimella pidempi kuin ruutu, ja näkymän ulkopuolella
     * elementFromPoint palauttaisi null riippumatta koristeista.
     */
    const osuu = (el) => {
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      const paalla = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return el.contains(paalla) || paalla === el || el === paalla?.closest('select, input, textarea');
    };
    return {
      valinta: valinta.value === arvo && Boolean(arvo),
      luku: luku.value === '1974',
      vapaa: vapaa.value === 'varna 1974',
      osumat: [valinta, luku, vapaa].every(osuu),
    };
  });
  vaadi(`${ruutu.nimi}: valintalista, numerokenttä ja vapaa kenttä ottavat arvon`,
    kirjoitus.valinta && kirjoitus.luku && kirjoitus.vapaa, JSON.stringify(kirjoitus));
  vaadi(`${ruutu.nimi}: koriste ei peitä kenttiä (napautus osuu kenttään)`,
    kirjoitus.osumat === true);

  /* ---------- alanappi saavutettavissa pohjaan vieritettynä ---------- */

  const pohja = await sivu.evaluate(async () => {
    const kortti = document.querySelector('.fokusvirta-kortti');
    const sisalto = kortti.querySelector('.fokusvirta-sisalto');
    sisalto.scrollTop = sisalto.scrollHeight;
    await new Promise((r) => setTimeout(r, 250));
    const nappi = [...kortti.querySelectorAll('button')]
      .find((b) => /lähetä sähke/i.test(b.textContent));
    const n = nappi.getBoundingClientRect();
    const k = kortti.getBoundingClientRect();
    return {
      teksti: nappi.textContent.trim(),
      nakyvissa: n.top >= k.top - 1 && n.bottom <= k.bottom + 1
        && n.bottom <= window.innerHeight + 1 && n.width > 60,
      mitat: [Math.round(n.top), Math.round(n.bottom), Math.round(window.innerHeight)],
    };
  });
  vaadi(`${ruutu.nimi}: lähetysnappi on ruudulla, kun kortti on vieritetty pohjaan`,
    pohja.nakyvissa, `${pohja.teksti} ${JSON.stringify(pohja.mitat)}`);

  await sivu.screenshot({ path: join(ULOS, `sahke-${ruutu.nimi}-alaosa.png`) });

  vaadi(`${ruutu.nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
