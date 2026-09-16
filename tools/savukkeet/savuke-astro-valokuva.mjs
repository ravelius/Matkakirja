/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERAN VALOKUVANÄKYMÄ (omistaja 16.9.2026,
 * iPad-kuva Istanbulista).
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-astro-valokuva.mjs
 *
 * Sisarsavuke tools/savukkeet/savuke-satelliittilinssi.mjs mittaa koko
 * linssin (merkit, palkki, zoom, pelitila). TÄMÄ mittaa vain sen, mitä
 * omistaja 16.9.2026 tilasi valokuvanäkymään — ja mittaa sen KOLMESSA
 * RUUDUSSA, joista yksi on juuri se iPad-kuvasuhde, josta tilaus tuli.
 *
 * VÄITTEET:
 *   1. Selitteen laatikon vasen yläkulma on enintään 16 px ruudun
 *      vasemmasta reunasta ja heti yläpalkin alapuolella.
 *   2. Sama pätee, vaikka kuva EI kata koko ruutua: pinnat on
 *      kiinnitetty ruutuun, ei kuvaelementtiin. Mitataan kutistamalla
 *      kuva puoleen — selite, ✕ ja pienoiskuvat eivät saa liikkua.
 *   3. Kuvan sulkeva ✕ on ruudun oikeassa yläkulmassa heti palkin
 *      alla, pyöreä ja HARMAA: jokaisen lasketun värin r = g = b.
 *   4. Pienoiskuvat kelluvat alle 16 px:n päässä ruudun vasemmasta
 *      alakulmasta, vaikka kuva ei ulottuisi alareunaan.
 *   5. Väkänen avaa lisätiedot selitteen alle samaan laatikkoon eikä
 *      kelaa selitettä.
 *   6. Selitetekstin napautus kelaa tekstin ylös (vain otsikkorivi
 *      jää), uusi napautus avaa takaisin.
 *   7. Hampurilaisen valikossa on täsmälleen kaksi kohtaa: äänet
 *      päälle/pois ja poistu linssistä.
 *   8. i-nappia eikä nimi/päivä-pilleriä ole DOMissa.
 *
 * VASTAKOKEET (mittari, joka ei voi mennä läpi vahingossa):
 *   • lähtötila mitataan ennen jokaista napautusta — lisätiedot ovat
 *     piilossa ja selite auki ennen kuin niitä kosketaan, joten
 *     "avautui" ja "kelautui" eivät voi olla jo valmiiksi totta;
 *   • harmaustesti ajetaan myös linssin vihreällä (#5dffa8): jos se
 *     menisi läpi, mittari ei erottaisi väriä harmaasta;
 *   • kulmamitta ajetaan myös tahallaan väärällä rajalla (ruudun
 *     oikea reuna), jotta nähdään mittarin osaavan hylätä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8757, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/*
 * KOLME RUUTUA, JOISTA YKSI ON OMISTAJAN OMA. iPad 1024 × 1366 on se
 * kuvasuhde, jossa vika nähtiin (selite ja pienoiskuvat kelluivat
 * kuvan reunassa eivätkä ruudun kulmissa), 1400 × 900 on työpöydän
 * vakiomitta ja 390 × 844 pystypuhelin.
 */
const NAKYMAT = {
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 1024, height: 1366 }, deviceScaleFactor: 2, hasTouch: true },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virheet) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  // Ämpäri ja NASAn kuva-ämpäri Noden kautta; muu verkko katki.
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/,
    async (route) => {
      const vastaus = await ulkohaku(route.request().url());
      if (!vastaus) { route.abort(); return; }
      route.fulfill({
        status: 200,
        contentType: vastaus.tyyppi ?? 'application/octet-stream',
        body: vastaus.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8757/index.html?lauta=pallo', { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForTimeout(1200);
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  /*
   * SAAPUMISPINNAT POIS ENNEN KUVIA. Pakotettu saapuminen Ateenaan avaa
   * kohtaamiskuvan ja saapumiskortin pallon päälle; ne eivät kuulu
   * linssiin, mutta peittäisivät kaappauksissa juuri sen, mitä
   * mitataan. Suljetaan kuten pelaaja: Escape ja kortin oma sulku.
   */
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(600);
  await s.evaluate(() => {
    for (const v of ['[aria-label*="Sulje"]', '.saapumistraileri-sulje', '.arrival-close']) {
      document.querySelector(v)?.click();
    }
    document.querySelector('dialog[open]')?.close?.();
    // Saapumistraileri ohitetaan napauttamalla sen kehystä (js/saapumistraileri.js).
    document.querySelector('.saapumistraileri')
      ?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    /*
     * Saapumisvirran isokuva jää pystyyn, koska savuke pakotti pelaajan
     * Ateenaan ilman oikeaa matkaa. Se ei ole linssin pinta eikä sillä
     * ole tekemistä mitattavien väitteiden kanssa — poistetaan, jotta
     * kaappauksissa näkyy pallo eikä saapumiskuva.
     */
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1600);
  const peittava = await s.evaluate(() => {
    // Mikä tahansa pinta, joka peittää yli puolet ruudusta pallon päällä.
    const nimet = [];
    for (const el of document.body.querySelectorAll('body > *, .map-pane > *')) {
      const r = el.getBoundingClientRect();
      const t = getComputedStyle(el);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) < 0.05) continue;
      if (r.width * r.height > window.innerWidth * window.innerHeight * 0.5
        && !el.classList.contains('pallo-kuori') && el.tagName !== 'SCRIPT') {
        nimet.push(el.className || el.tagName);
      }
    }
    return nimet;
  });
  if (peittava.length) console.log(`    (peittäviä pintoja: ${peittava.join(', ')})`);
  return pallo;
}

/** Merkin ruutupaikka kohteen tunnuksella (pallon oma projektio). */
const RUUTUPAIKKA = (tunnus) => {
  const { ui } = window.matkakirja;
  const kohde = window.__satelliitti.find((k) => k.tunnus === tunnus);
  /*
   * PAIKKA LUETAAN MERKIN OMASTA ELEMENTISTÄ, kun se on ruudulla:
   * CSS2D-solmu on siellä, minne kirjasto sen piirsi, kun taas
   * projektio voi olla kesken olevan kameran takia vanhentunut.
   */
  const el = [...document.querySelectorAll('.satelliitti-piste')]
    .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
  if (el && !el.classList.contains('pallolauta-takana')) {
    const r = el.getBoundingClientRect();
    if (r.width || r.height || r.left || r.top) {
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    }
  }
  const p = ui.pallonInstanssi?.getScreenCoords?.(kohde.lat, kohde.lon, 0);
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
  if (!p || !kotelo) return null;
  return { x: Math.round(kotelo.left + p.x), y: Math.round(kotelo.top + p.y) };
};


/** Onko laskettu väri puhtaan harmaa (r = g = b)? */
const harmaa = (v) => {
  const o = String(v ?? '').match(/rgba?\((\d+), (\d+), (\d+)/);
  return Boolean(o) && o[1] === o[2] && o[2] === o[3];
};

/** Kaikkien mitattavien pintojen kulmat yhdellä kutsulla. */
const MITAT = () => {
  const r = (v) => {
    const el = document.querySelector(v);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {
      x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height),
      oikea: Math.round(b.right), ala: Math.round(b.bottom),
    };
  };
  const sulkuEl = document.querySelector('.satelliitti-sulku');
  const t = sulkuEl ? getComputedStyle(sulkuEl) : null;
  return {
    selite: r('.satelliitti-selite'),
    sulku: r('.satelliitti-sulku'),
    nauha: r('.satelliitti-nauha'),
    kuva: r('.satelliitti-kuva'),
    palkinAla: Math.round(document.querySelector('.satelliittipalkki')?.getBoundingClientRect().bottom ?? 0),
    ikkuna: [window.innerWidth, window.innerHeight],
    varit: t
      ? { teksti: t.color, tausta: t.backgroundColor, reuna: t.borderTopColor, pyorea: t.borderTopLeftRadius }
      : null,
    // 16.9.2026 poistetut osat: i-nappi ja nimi/päivä-pilleri.
    infoja: document.querySelectorAll('.satelliittipalkki-info').length,
    pillereita: document.querySelectorAll('.satelliittipalkki-kohde').length,
  };
};

async function ajaNakyma(nakymanNimi) {
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakymanNimi], virheet);
  const kaappaa = async (t) => {
    await s.screenshot({ path: join(ULOS, `astro-valokuva-${nakymanNimi}-${t}.png`), timeout: 90000 })
      .catch((e) => console.log(`    (kaappaus ${t} ei onnistunut: ${e.message.split('\n')[0]})`));
  };
  const nimessa = (t) => `${t} (${nakymanNimi})`;
  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt');

  /* --- linssi päälle ja kamera Saharan silmän ylle ------------------ */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
    for (let i = 0; i < 400; i += 1) {
      if (ui.pallolinssi?.tunnus === 'satelliitti') break;
      await new Promise((r) => setTimeout(r, 25));
    }
    const moduuli = await import('/js/linssit/satelliitti-data.js');
    window.__satelliitti = moduuli.SATELLIITTI_KOHTEET;
    await new Promise((r) => setTimeout(r, 900));
  });
  const vakaaPaikka = async (tunnus) => {
    let edellinen = null;
    for (let i = 0; i < 20; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const p = await s.evaluate(RUUTUPAIKKA, tunnus);
      if (p && edellinen && Math.abs(p.x - edellinen.x) < 2 && Math.abs(p.y - edellinen.y) < 2) return p;
      edellinen = p;
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(400);
    }
    return edellinen;
  };
  const napautaPistetta = async (tunnus) => {
    let paikka = await vakaaPaikka(tunnus);
    // Konttiympäristön ohjelmisto-WebGL piirtää puhelinmitalla (dpr 2)
    // noin kehyksen sekunnissa, joten merkin ruutupaikka voi olla yhä
    // matkalla: yritetään riittävän monta kertaa.
    for (let yritys = 0; yritys < 6; yritys += 1) {
      // eslint-disable-next-line no-await-in-loop
      if (paikka) await s.mouse.click(paikka.x, paikka.y);
      // eslint-disable-next-line no-await-in-loop
      await s.waitForFunction(
        () => document.querySelector('.satelliitti-katselu .satelliitti-kuva')?.naturalWidth > 0,
        null, { timeout: 20000 },
      ).catch(() => {});
      // eslint-disable-next-line no-await-in-loop
      if (await s.evaluate(() => Boolean(document.querySelector('.satelliitti-katselu')))) return paikka;
      // eslint-disable-next-line no-await-in-loop
      const tila = await s.evaluate((t) => {
        const kohde = window.__satelliitti.find((k) => k.tunnus === t);
        const el = [...document.querySelectorAll('.satelliitti-piste')]
          .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
        const r = el?.getBoundingClientRect();
        const keski = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
        return {
          merkkeja: document.querySelectorAll('.satelliitti-piste').length,
          takana: el?.classList.contains('pallolauta-takana') ?? null,
          rect: r ? [Math.round(r.left), Math.round(r.top)] : null,
          busy: window.matkakirja.ui.busy,
          sormet: JSON.stringify({ ...(window.matkakirja.ui.pallonSormet ?? {}), idt: [...(window.matkakirja.ui.pallonSormet?.idt ?? [])] }),
          paalla: keski ? `${keski.tagName}.${keski.className}` : null,
        };
      }, tunnus);
      console.log(`    (${tunnus}: yritys ${yritys + 1} ei avannut — ${JSON.stringify({ paikka, ...tila })})`);
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(800);
      // eslint-disable-next-line no-await-in-loop
      paikka = await vakaaPaikka(tunnus);
    }
    return paikka;
  };
  await s.evaluate(async () => {
    const richat = window.__satelliitti.find((k) => k.tunnus === 'richat');
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera(
      { lat: richat.lat, lng: richat.lon, leveys: 2600 }, { kesto: 0 },
    );
    await new Promise((r) => setTimeout(r, 1200));
  });
  await s.waitForTimeout(1500);
  await napautaPistetta('richat');
  const auki = await s.evaluate(() => Boolean(document.querySelector('.satelliitti-katselu')));
  vaadi(nimessa('valokuvanäkymä avautuu vihreästä pisteestä'), auki, '');
  if (!auki) { await konteksti.close(); return; }
  await kaappaa('selite-auki');

  /* --- 1, 3, 4: kulmat ja värit koko ruudun kuvalla ----------------- */
  const mitat = await s.evaluate(MITAT);
  vaadi(nimessa('selitteen vasen yläkulma ≤ 16 px vasemmasta reunasta, heti palkin alla'),
    Boolean(mitat.selite) && mitat.selite.x <= 16
      && mitat.selite.y >= mitat.palkinAla - 1 && mitat.selite.y - mitat.palkinAla <= 20,
    JSON.stringify(mitat));
  vaadi(nimessa('✕ on pyöreä, harmaa ja ruudun oikeassa yläkulmassa palkin alla'),
    Boolean(mitat.sulku) && mitat.ikkuna[0] - mitat.sulku.oikea <= 20
      && mitat.sulku.y >= mitat.palkinAla - 1 && mitat.sulku.y - mitat.palkinAla <= 20
      && Math.round(parseFloat(mitat.varit?.pyorea ?? '0')) >= 14
      && harmaa(mitat.varit?.teksti) && harmaa(mitat.varit?.tausta) && harmaa(mitat.varit?.reuna),
    JSON.stringify({ sulku: mitat.sulku, varit: mitat.varit, palkinAla: mitat.palkinAla }));
  vaadi(nimessa('pienoiskuvat ≤ 16 px ruudun vasemmasta alakulmasta'),
    Boolean(mitat.nauha) && mitat.nauha.x <= 16 && mitat.ikkuna[1] - mitat.nauha.ala <= 24,
    JSON.stringify({ nauha: mitat.nauha, ikkuna: mitat.ikkuna }));
  vaadi(nimessa('i-nappia eikä nimi/päivä-pilleriä ole DOMissa'),
    mitat.infoja === 0 && mitat.pillereita === 0, JSON.stringify(mitat));

  /* --- VASTAKOKEET mittareille ------------------------------------- */
  vaadi(nimessa('vastakoe: harmausmittari hylkää linssin vihreän'),
    !harmaa('rgb(93, 255, 168)') && harmaa('rgb(224, 224, 224)'), '');
  vaadi(nimessa('vastakoe: kulmamitta hylkää oikean reunan selitteeksi'),
    !(mitat.ikkuna[0] - mitat.selite.x <= 16), JSON.stringify({ selite: mitat.selite }));

  /* --- 2: kuva, joka EI kata koko ruutua ---------------------------- */
  const pieneksi = await s.evaluate(() => {
    const img = document.querySelector('.satelliitti-kuva');
    img.style.maxWidth = '45%';
    img.style.maxHeight = '45%';
    return true;
  });
  await s.waitForTimeout(600);
  const pienella = await s.evaluate(MITAT);
  const sama = (a, b) => Math.abs(a - b) <= 1;
  vaadi(nimessa('kuva ei kata ruutua: selite, ✕ ja pienoiskuvat pysyvät ruudun kulmissa'),
    pieneksi
      // Kuva todella kutistui, joten mittaus on aito eikä sama tilanne.
      && pienella.kuva.w < mitat.kuva.w * 0.8
      && pienella.selite.x <= 16 && sama(pienella.selite.x, mitat.selite.x)
      && sama(pienella.selite.y, mitat.selite.y)
      && sama(pienella.sulku.oikea, mitat.sulku.oikea) && sama(pienella.sulku.y, mitat.sulku.y)
      && sama(pienella.nauha.x, mitat.nauha.x) && sama(pienella.nauha.ala, mitat.nauha.ala)
      && pienella.nauha.x <= 16,
    JSON.stringify({ ennen: { kuva: mitat.kuva, selite: mitat.selite, nauha: mitat.nauha },
      jalkeen: { kuva: pienella.kuva, selite: pienella.selite, nauha: pienella.nauha } }));
  await kaappaa('pieni-kuva');
  await s.evaluate(() => {
    const img = document.querySelector('.satelliitti-kuva');
    img.style.removeProperty('max-width');
    img.style.removeProperty('max-height');
  });
  await s.waitForTimeout(400);

  /* --- 5: väkänen avaa lisätiedot ----------------------------------- */
  const ennenVakasta = await s.evaluate(() => ({
    lisatiedotPiilossa: document.querySelector('.satelliitti-lisatiedot').hidden,
    runko: Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
  }));
  await s.evaluate(() => document.querySelector('.satelliitti-vakanen').click());
  await s.waitForTimeout(400);
  const vakasenJalkeen = await s.evaluate(() => {
    const lisa = document.querySelector('.satelliitti-lisatiedot');
    const selite = document.querySelector('.satelliitti-selite');
    return {
      auki: !lisa.hidden,
      samassaLaatikossa: selite.contains(lisa),
      rivit: [...lisa.querySelectorAll('div')].map((d) => d.textContent).slice(0, 8),
      kelautui: selite.classList.contains('satelliitti-selite-kiinni'),
      kaantyi: lisa.parentElement.querySelector('.satelliitti-vakanen').classList.contains('satelliitti-vakanen-auki'),
    };
  });
  vaadi(nimessa('väkänen avaa lisätiedot selitteen alle — eikä kelaa selitettä'),
    ennenVakasta.lisatiedotPiilossa === true && vakasenJalkeen.auki
      && vakasenJalkeen.samassaLaatikossa && vakasenJalkeen.kaantyi && !vakasenJalkeen.kelautui
      && vakasenJalkeen.rivit.some((t) => /^Aineisto:/.test(t))
      && vakasenJalkeen.rivit.some((t) => /^Lisenssi:/.test(t)),
    JSON.stringify({ ennen: ennenVakasta, jalkeen: vakasenJalkeen.rivit.slice(0, 3) }));
  await kaappaa('lisatiedot');

  /* --- 6: selitetekstin napautus kelaa ------------------------------ */
  await s.evaluate(() => document.querySelector('.satelliitti-selite-teksti')
    .dispatchEvent(new MouseEvent('click', { bubbles: true })));
  /*
   * ODOTETAAN TULOSTA, EI KELLOA. Korkeussiirtymä on 250 ms, mutta
   * kontin ohjelmisto-WebGL ja rinnakkaiset savukkeet voivat nälkiinnyttää
   * ruudunpiirron sekunneiksi — kiinteä odotus mittasi silloin siirtymän
   * puolivälistä. Tämä odottaa mitattavaa arvoa ja antaa periksi vasta
   * aikakatkaisussa, jolloin väite kaatuu aidosti.
   */
  await s.waitForFunction(
    () => document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height <= 1,
    null, { timeout: 15000 },
  ).catch(() => {});
  const kelattu = await s.evaluate(() => ({
    kiinni: document.querySelector('.satelliitti-selite').classList.contains('satelliitti-selite-kiinni'),
    runko: Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
    otsikko: Math.round(document.querySelector('.satelliitti-selite-otsikko').getBoundingClientRect().height),
  }));
  vaadi(nimessa('selitetekstin napautus kelaa tekstin ylös, otsikkorivi jää'),
    ennenVakasta.runko > 10 && kelattu.kiinni && kelattu.runko <= 1 && kelattu.otsikko > 4,
    JSON.stringify({ ennen: ennenVakasta.runko, jalkeen: kelattu }));
  await s.evaluate(() => document.querySelector('.satelliitti-selite')
    .dispatchEvent(new MouseEvent('click', { bubbles: true })));
  await s.waitForFunction(
    () => document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height > 10,
    null, { timeout: 15000 },
  ).catch(() => {});
  const takaisin = await s.evaluate(
    () => Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
  );
  vaadi(nimessa('uusi napautus avaa selitteen takaisin'), takaisin > 10, String(takaisin));

  /* --- 7: hampurilaisen valikko ------------------------------------- */
  const ennenValikkoa = await s.evaluate(
    () => document.querySelector('.satelliittipalkki-valikko').hidden,
  );
  await s.evaluate(() => document.querySelector('.satelliittipalkki-hampurilainen').click());
  await s.waitForTimeout(300);
  const valikko = await s.evaluate(() => {
    const v = document.querySelector('.satelliittipalkki-valikko');
    const r = v.getBoundingClientRect();
    const nappi = document.querySelector('.satelliittipalkki-hampurilainen').getBoundingClientRect();
    return {
      auki: !v.hidden,
      kohdat: [...v.querySelectorAll('button')].map((b) => b.textContent),
      napinAlla: r.top >= nappi.bottom - 1,
      aani: document.querySelector('.satelliittipalkki-aani')?.textContent ?? null,
    };
  });
  vaadi(nimessa('hampurilaisen valikossa on kaksi kohtaa napin alla'),
    ennenValikkoa === true && valikko.auki && valikko.kohdat.length === 2
      && /^Äänet (päällä|pois)$/.test(valikko.kohdat[0])
      && valikko.kohdat[1] === 'Poistu linssistä' && valikko.napinAlla,
    JSON.stringify(valikko));
  await kaappaa('valikko');
  // Ääninapin napautus vaihtaa tekstin ja tallentaa valinnan.
  await s.evaluate(() => document.querySelector('.satelliittipalkki-aani').click());
  await s.waitForTimeout(200);
  const aani = await s.evaluate(() => ({
    teksti: document.querySelector('.satelliittipalkki-aani').textContent,
    tallennus: localStorage.getItem('matkakirja-linssiaani'),
  }));
  vaadi(nimessa('ääninappi vaihtaa tilan ja tallentaa sen'),
    aani.teksti !== valikko.aani && ['on', 'off'].includes(aani.tallennus),
    JSON.stringify(aani));

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' / '));
  await konteksti.close();
}

for (const nakyma of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : ['tyopoyta', 'puhelin', 'ipad'])) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nakyma);
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
