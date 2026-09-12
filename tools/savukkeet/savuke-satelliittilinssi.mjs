/*
 * SELAINSAVUKE: SATELLIITTILINSSI (ICEYEn arkistotutkahavainnot).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-satelliittilinssi.mjs
 *
 * Yksikkötestit näkevät aineiston ja puhtaat funktiot; ne eivät näe,
 * hohtaako piste pallolla, vaihtuuko YLÄPALKKI kokonaan, avautuuko
 * havaintokuva lähes koko ruudun kokoisena ja pysyykö PELITILA
 * koskemattomana. Ne mitataan tässä oikealla pallolaudalla.
 *
 * VERKKO: kaikki muu ulkoinen liikenne katkaistaan, mutta ämpäri
 * (laatat, Globe.gl) ja ICEYEn avoin S3 tarjoillaan Noden fetchin
 * kautta — juuri niin kuin selain ne oikeassa pelissä hakee (aineiston
 * CORS-otsake on `*`, tarkistettu 12.9.2026).
 *
 * VÄITTEET:
 *   1. Linssi syttyy laukusta pallolle: ui.pallolinssi === 'satelliitti',
 *      jokaiselle kohteelle yksi merkki, linssikarttaa EI avata
 *      (svg#board pysyy tyhjänä) ja pallo on yhä lautana.
 *   2. KOKO YLÄPALKKI VAIHTUU: Matkakirjan .topbar on näkymätön ja
 *      nollan korkuinen, linssin oma palkki on ruudulla SEN mitatussa
 *      korkeudessa, palkkeja on tasan yksi eikä kartta kutistu.
 *   3. Hohtavat vihreät pisteet: merkit ovat vihreitä, näkyviä ja
 *      nimettyjä; hehku ei sykähtele (ei loputonta animaatiota).
 *   4. PALLON TAKAPUOLEN MERKKI EI OTA NAPAUTUKSIA: takana oleva piste
 *      on piilossa, ja napautus sen ruutupaikkaan ei avaa mitään.
 *   5. Pisteen napautus avaa havaintokuvan lähes koko ruudun kokoisena
 *      (vaihe 1: pelkkä kuva, kuvateksti ja Lisää).
 *   6. "Lisää" avaa koko havainnon EIKÄ KUVA LIIKU (delta 0 px).
 *   7. Galleria: laskuri, viisi pikkukuvaa (Krakova), nuoli vaihtaa
 *      havainnon — ja kuva pysyy täsmälleen paikallaan myös silloin.
 *      Saman päivän havainnot erottuvat kellonajasta.
 *   8. Linssin merkit eivät kuluta pelivuoroa: vaihe, sijainti, rahat
 *      ja päivä ovat napautuksen jälkeen samat.
 *   9. Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen
 *      täsmälleen; merkit ja palkki poistuvat.
 *  10. Ei sivuvirheitä.
 *
 * Sama ajo tehdään työpöydällä ja puhelimella (390 × 844): omistaja
 * arvioi palkin kummastakin, ja mobiilissa palkin on pysyttävä yhtenä
 * tiiviinä rivinä.
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
await new Promise((r) => palvelin.listen(8749, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const NAKYMAT = {
  tyopoyta: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
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
  // Ämpäri ja ICEYEn avoin aineisto Noden kautta; muu verkko katki.
  await sivu.route(/media\.matkakirja\.app|r2\.dev|iceye-open-data-catalog\.s3\.amazonaws\.com/,
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
  await s.goto('http://127.0.0.1:8749/index.html?lauta=pallo', { waitUntil: 'load' });
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

/** Pelitilan tiiviste: linssi ei saa muuttaa tästä mitään. */
const PELITILA = () => {
  const { game } = window.matkakirja;
  return JSON.stringify({
    vaihe: game.phase,
    paikka: game.player.pos,
    rahat: game.player.money,
    paiva: game.world?.day ?? null,
    aarteet: (game.player.treasures ?? []).length,
    tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
  });
};

/** Merkin ruutupaikka kohteen tunnuksella (pallon oma projektio). */
const RUUTUPAIKKA = (tunnus) => {
  const { ui } = window.matkakirja;
  const kohde = window.__satelliitti.find((k) => k.tunnus === tunnus);
  const p = ui.pallonInstanssi?.getScreenCoords?.(kohde.lat, kohde.lon, 0);
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
  if (!p || !kotelo) return null;
  return { x: Math.round(kotelo.left + p.x), y: Math.round(kotelo.top + p.y) };
};

async function ajaNakyma(nakymanNimi) {
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakymanNimi], virheet);
  const kuva = (t) => join(ULOS, `savuke-satelliitti-${nakymanNimi}-${t}.png`);
  const nimessa = (t) => `${t} (${nakymanNimi})`;
  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt');

  const ennen = await s.evaluate(PELITILA);

  /* --- 1. Linssi laukusta pallolle ---------------------------------- */
  const syttyi = await s.evaluate(async () => {
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
    return {
      pallolinssi: ui.pallolinssi?.tunnus ?? null,
      linssikartta: Boolean(ui.linssikartta),
      lautaNakyy: ui.pallolauta?.paalla?.() === true,
      boardLapsia: document.querySelectorAll('#board > *').length,
      merkkeja: document.querySelectorAll('.satelliitti-piste').length,
      kohteita: moduuli.SATELLIITTI_KOHTEET.length,
    };
  });
  vaadi(nimessa('linssi syttyy pallolle: yksi merkki per kohde, linssikarttaa ei avata'),
    syttyi.pallolinssi === 'satelliitti' && !syttyi.linssikartta && syttyi.lautaNakyy
      && syttyi.merkkeja === syttyi.kohteita && syttyi.boardLapsia === 0,
    JSON.stringify(syttyi));

  /* --- 2. Koko yläpalkki vaihtuu ------------------------------------ */
  const palkki = await s.evaluate(() => {
    const topbar = document.querySelector('.topbar');
    const oma = document.querySelector('.satelliittipalkki');
    const tyyli = topbar ? getComputedStyle(topbar) : null;
    const omaTyyli = oma ? getComputedStyle(oma) : null;
    // Palkki asuu karttaruudussa (ui.mapPane) — leveys mitataan siitä,
    // ei ikkunasta: sivulla on omat reunuksensa.
    const kartta = oma?.parentElement ?? null;
    return {
      topbarNakyvyys: tyyli?.visibility ?? null,
      topbarKorkeus: topbar?.getBoundingClientRect().height ?? null,
      palkkeja: document.querySelectorAll('.satelliittipalkki').length,
      omaKorkeus: oma?.getBoundingClientRect().height ?? null,
      omaLeveys: oma?.getBoundingClientRect().width ?? null,
      ikkunanLeveys: window.innerWidth,
      karttaLeveys: kartta?.getBoundingClientRect().width ?? null,
      karttaKorkeus: kartta?.getBoundingClientRect().height ?? null,
      ikkunanKorkeus: window.innerHeight,
      bodyLuokat: ['aikajana-palkki-auki', 'aikajana-paalla'].filter((l) => document.body.classList.contains(l)),
      sulje: document.querySelector('.satelliittipalkki-sulje')?.textContent ?? null,
      valinnat: document.querySelectorAll('.satelliittipalkki-valinta option').length,
      ohjeNakyy: oma && omaTyyli
        ? getComputedStyle(document.querySelector('.satelliittipalkki-ohje')).display !== 'none' : null,
      rivi: oma ? omaTyyli.display : null,
    };
  });
  vaadi(nimessa('koko yläpalkki vaihtuu: Matkakirjan palkki piilossa, yksi linssipalkki, kartta ei kutistu'),
    palkki.topbarNakyvyys === 'hidden' && palkki.topbarKorkeus === 0 && palkki.palkkeja === 1
      && palkki.omaKorkeus > 20 && palkki.omaLeveys >= palkki.karttaLeveys - 4
      && palkki.karttaKorkeus > palkki.ikkunanKorkeus * 0.9
      && palkki.bodyLuokat.length === 2 && palkki.sulje === 'Sulje linssi'
      && palkki.valinnat === syttyi.kohteita + 1,
    JSON.stringify(palkki));
  if (nakymanNimi === 'puhelin') {
    vaadi(nimessa('mobiilissa yksi tiivis rivi: ohje väistyy, palkki ei kasva kahdeksi riviksi'),
      palkki.ohjeNakyy === false && palkki.omaKorkeus < 80, JSON.stringify(palkki));
  }
  await s.screenshot({ path: kuva('palkki') });

  /* --- 3. Hohtavat vihreät pisteet ---------------------------------- */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    const venetsia = window.__satelliitti.find((k) => k.tunnus === 'venetsia');
    await ui.pallolauta.kamera.ajaKamera({ lat: venetsia.lat, lng: venetsia.lon, leveys: 2600 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 1200));
  });
  await s.waitForTimeout(1500);
  const hehku = await s.evaluate(() => {
    // Merkkikerros lisää luokan samaan elementtiin (merkit.js elementti).
    const merkit = [...document.querySelectorAll('.satelliitti-piste')];
    const edessa = merkit.filter((el) => !el.classList.contains('pallolauta-takana'));
    const yksi = edessa[0];
    const rengas = yksi?.querySelector('.satelliitti-rengas');
    const hehkuEl = yksi?.querySelector('.satelliitti-hehku');
    const nimi = yksi?.querySelector('.satelliitti-nimi');
    const t = rengas ? getComputedStyle(rengas) : null;
    const h = hehkuEl ? getComputedStyle(hehkuEl) : null;
    return {
      yhteensa: merkit.length,
      edessa: edessa.length,
      takana: merkit.length - edessa.length,
      reuna: t?.borderTopColor ?? null,
      varjo: t?.boxShadow ?? null,
      hehkunLeveys: h ? Math.round(parseFloat(h.width)) : null,
      nimi: nimi?.textContent ?? null,
      animaatio: yksi ? getComputedStyle(yksi).animationIterationCount : null,
      osumat: yksi ? getComputedStyle(yksi).pointerEvents : null,
    };
  });
  vaadi(nimessa('hohtava vihreä piste: sädekehä, hehkuva rengas, nimi — eikä loputonta pulssia'),
    hehku.edessa > 0 && hehku.takana > 0 && /rgb\(93, 255, 168\)/.test(hehku.reuna ?? '')
      && /rgba?\(93, 255, 168/.test(hehku.varjo ?? '') && hehku.hehkunLeveys >= 40
      && Boolean(hehku.nimi) && hehku.animaatio === '1' && hehku.osumat === 'none',
    JSON.stringify(hehku));
  await s.screenshot({ path: kuva('pisteet') });

  /* --- 4. Pallon takapuolen merkki ei ota napautuksia ---------------- */
  const takana = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
    for (const kohde of window.__satelliitti) {
      const el = [...document.querySelectorAll('.satelliitti-piste')]
        .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
      if (!el?.classList.contains('pallolauta-takana')) continue;
      const p = ui.pallonInstanssi?.getScreenCoords?.(kohde.lat, kohde.lon, 0);
      if (!p || !kotelo) continue;
      const x = Math.round(kotelo.left + p.x);
      const y = Math.round(kotelo.top + p.y);
      if (x < 4 || y < 60 || x > window.innerWidth - 4 || y > window.innerHeight - 4) continue;
      return {
        tunnus: kohde.tunnus, x, y, nakyvyys: getComputedStyle(el).opacity,
      };
    }
    return null;
  });
  if (takana) await s.mouse.click(takana.x, takana.y);
  await s.waitForTimeout(800);
  const takanaTulos = await s.evaluate(() => document.querySelectorAll('.satelliitti-kortti').length);
  vaadi(nimessa('pallon takapuolen merkki ei ota napautusta'),
    Boolean(takana) && takanaTulos === 0 && Number(takana.nakyvyys) < 0.5,
    JSON.stringify({ takana, kortteja: takanaTulos }));

  /* --- 5. Pisteen napautus avaa havaintokuvan ------------------------ */
  /*
   * KAMERA RAUHOITTUU ENNEN NAPAUTUSTA. Kontin ohjelmisto-WebGL piirtää
   * noin kehyksen sekunnissa, joten juuri ajettu kamera voi olla yhä
   * matkalla ja merkin ruutupaikka vanhentunut — napautus menisi ohi.
   * Odotetaan kaksi samaa lukemaa, ja yritetään toisen kerran, jos
   * kortti ei ensimmäisellä napautuksella auennut.
   */
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
  /** Napauta pisteen ruutupaikkaa, kunnes kortti aukeaa (enintään 3 ×). */
  const napautaPistetta = async (tunnus) => {
    let paikka = await vakaaPaikka(tunnus);
    for (let yritys = 0; yritys < 3; yritys += 1) {
      // eslint-disable-next-line no-await-in-loop
      if (paikka) await s.mouse.click(paikka.x, paikka.y);
      // eslint-disable-next-line no-await-in-loop
      await s.waitForFunction(
        () => document.querySelector('.satelliitti-kortti .nostokuva-img')?.naturalWidth > 0,
        null, { timeout: 20000 },
      ).catch(() => {});
      // eslint-disable-next-line no-await-in-loop
      if (await s.evaluate(() => Boolean(document.querySelector('.satelliitti-kortti')))) return paikka;
      // eslint-disable-next-line no-await-in-loop
      paikka = await vakaaPaikka(tunnus);
    }
    return paikka;
  };
  const venetsiaPaikka = await napautaPistetta('venetsia');
  const vaihe1 = await s.evaluate(() => {
    const kortti = document.querySelector('.satelliitti-kortti');
    const img = kortti?.querySelector('.nostokuva-img');
    const r = img?.getBoundingClientRect();
    return {
      kortti: Boolean(kortti),
      vaihe1: kortti?.classList.contains('nostokuva-vaihe1') ?? null,
      ladattu: img?.naturalWidth ?? 0,
      osoite: img?.currentSrc ?? null,
      leveys: r ? Math.round(r.width) : null,
      korkeus: r ? Math.round(r.height) : null,
      ikkuna: [window.innerWidth, window.innerHeight],
      lisaa: Boolean(kortti?.querySelector('.nostokuva-lisaa')),
      selite: kortti?.querySelector('.nostokuva-teksti')?.textContent ?? null,
      lahde: kortti?.querySelector('.nostokuva-lahde')?.textContent ?? null,
      tekstia: kortti?.textContent?.length ?? 0,
    };
  });
  const suhde = vaihe1.korkeus
    ? vaihe1.korkeus / Math.min(vaihe1.ikkuna[0], vaihe1.ikkuna[1]) : 0;
  vaadi(nimessa('pisteen napautus avaa lähes koko ruudun havaintokuvan (kuva ensin, sitten Lisää)'),
    vaihe1.kortti && vaihe1.vaihe1 === true && vaihe1.ladattu > 0 && vaihe1.lisaa
      && suhde > 0.6 && /iceye-open-data-catalog/.test(vaihe1.osoite ?? '')
      && /Venetsia/.test(vaihe1.selite ?? '') && /UTC/.test(vaihe1.selite ?? '')
      && /ICEYE, CC BY 4\.0/.test(vaihe1.lahde ?? ''),
    JSON.stringify({ ...vaihe1, venetsiaPaikka, suhde: Number(suhde.toFixed(2)) }));
  await s.screenshot({ path: kuva('havainto-vaihe1') });

  /* --- 6. "Lisää" avaa koko havainnon eikä kuva liiku --------------- */
  const lisaa = await s.evaluate(async () => {
    const kortti = document.querySelector('.satelliitti-kortti');
    const img = kortti.querySelector('.nostokuva-img');
    const ennenR = img.getBoundingClientRect();
    kortti.querySelector('.nostokuva-lisaa').click();
    const jalkeenR = img.getBoundingClientRect();
    return {
      dx: Math.abs(jalkeenR.left - ennenR.left),
      dy: Math.abs(jalkeenR.top - ennenR.top),
      dw: Math.abs(jalkeenR.width - ennenR.width),
      vaihe2: kortti.classList.contains('nostokuva-vaihe2'),
      leima: kortti.querySelector('.satelliitti-leima')?.textContent ?? null,
      otsikko: kortti.querySelector('.satelliitti-otsikko')?.textContent ?? null,
      tiedot: [...kortti.querySelectorAll('.satelliitti-tiedot div')].map((d) => d.textContent),
      linkkeja: [...kortti.querySelectorAll('.satelliitti-linkki')].map((a) => a.href),
    };
  });
  const tiedotTeksti = (lisaa.tiedot ?? []).join(' | ');
  vaadi(nimessa('Lisää avaa koko havainnon — kuva ei liiku pikselinkään verran'),
    lisaa.vaihe2 && lisaa.dx < 0.5 && lisaa.dy < 0.5 && lisaa.dw < 0.5,
    JSON.stringify({ dx: lisaa.dx, dy: lisaa.dy, dw: lisaa.dw }));
  vaadi(nimessa('arkistoleima ja koko lähdeketju kulkevat kuvan mukana'),
    lisaa.leima === 'Arkistohavainto · ICEYE · tutkakuva'
      && /Aineisto:.*ICEYE/.test(tiedotTeksti) && /Kuvausaika:.*UTC/.test(tiedotTeksti)
      && /Alue:.*°/.test(tiedotTeksti) && /Kuvaustapa:/.test(tiedotTeksti)
      && /Käsittely:.*tuotteet/.test(tiedotTeksti) && /Lisenssi: CC BY 4\.0/.test(tiedotTeksti)
      && lisaa.linkkeja.some((u) => /stac-items/.test(u))
      && lisaa.linkkeja.some((u) => /sar\.iceye\.com/.test(u)),
    JSON.stringify({ leima: lisaa.leima, tiedot: lisaa.tiedot, linkkeja: lisaa.linkkeja }));
  await s.screenshot({ path: kuva('havainto-vaihe2') });

  /* --- 7. Galleria: Krakovan viisi havaintoa ------------------------ */
  // Kortti pois tavallisella tavalla: napautus kartan tyhjään kohtaan
  // (v1783: kuva sulkeutuu mistä tahansa kartan kohdasta).
  await s.mouse.click(4, Math.round(NAKYMAT[nakymanNimi].viewport.height - 4));
  await s.waitForTimeout(600);
  // Kohteen valinta palkista ajaa kameran — sama tie kuin pelaajalla.
  await s.evaluate(async () => {
    const valinta = document.querySelector('.satelliittipalkki-valinta');
    valinta.value = 'krakova';
    valinta.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
  });
  await s.waitForTimeout(1200);
  await napautaPistetta('krakova');
  const galleria = await s.evaluate(async () => {
    const kortti = document.querySelector('.satelliitti-kortti');
    if (!kortti) return { puuttuu: true };
    kortti.querySelector('.nostokuva-lisaa')?.click();
    await new Promise((r) => setTimeout(r, 200));
    const img = kortti.querySelector('.nostokuva-img');
    const ennenR = img.getBoundingClientRect();
    const ennenSrc = img.src;
    const laskuri = kortti.querySelector('.satelliitti-laskuri')?.textContent;
    const pikkuja = kortti.querySelectorAll('.satelliitti-pikku').length;
    const paivat = [...kortti.querySelectorAll('.satelliitti-pikku span')].map((x) => x.textContent);
    const valittu = kortti.querySelector('.satelliitti-pikku.valittu span')?.textContent;
    kortti.querySelector('.satelliitti-seuraava')?.click();
    await new Promise((r) => setTimeout(r, 250));
    const jalkeenR = kortti.querySelector('.nostokuva-img').getBoundingClientRect();
    return {
      laskuri,
      pikkuja,
      paivat,
      valittu,
      laskuriJalkeen: kortti.querySelector('.satelliitti-laskuri')?.textContent,
      srcVaihtui: kortti.querySelector('.nostokuva-img').src !== ennenSrc,
      dx: Math.abs(jalkeenR.left - ennenR.left),
      dy: Math.abs(jalkeenR.top - ennenR.top),
      vertaa: Boolean(kortti.querySelector('.satelliitti-vertaa')),
      otsikko: kortti.querySelector('.satelliitti-otsikko')?.textContent ?? '',
      // Kuvateksti ja tietorivin kuvausaika kertovat SAMAN havainnon.
      kuvateksti: kortti.querySelector('.nostokuva-teksti')?.textContent ?? '',
      aikarivi: [...kortti.querySelectorAll('.satelliitti-tiedot div')]
        .find((d) => d.textContent.startsWith('Kuvausaika'))?.textContent ?? '',
    };
  });
  const samanPaivan = (galleria.paivat ?? []).filter((p) => /4\.10\.25/.test(p));
  vaadi(nimessa('galleria: 5 päivämäärällistä pikkukuvaa, laskuri ja nuolet — kuva ei liiku vaihdossa'),
    /Krakova/.test(galleria.otsikko) && galleria.pikkuja === 5
      // Oletus on paras yleiskuva (17.9.2025, pienin katselukulma), ei uusin.
      && galleria.laskuri === 'Havainto 2 / 5' && galleria.valittu === '17.9.25 12.42'
      && galleria.laskuriJalkeen === 'Havainto 3 / 5' && galleria.srcVaihtui
      && galleria.dx < 0.5 && galleria.dy < 0.5 && galleria.vertaa,
    JSON.stringify(galleria));
  vaadi(nimessa('kuvateksti seuraa vaihdettua havaintoa (ei vanhaa päiväystä uuden kuvan alla)'),
    galleria.kuvateksti.includes('4.10.2025 klo 20.10 UTC')
      && galleria.aikarivi.includes('4.10.2025 klo 20.10 UTC'),
    JSON.stringify({ kuvateksti: galleria.kuvateksti, aikarivi: galleria.aikarivi }));
  vaadi(nimessa('saman päivän kolme havaintoa erottuvat kellonajasta'),
    samanPaivan.length === 3 && new Set(samanPaivan).size === 3,
    JSON.stringify(samanPaivan));
  await s.screenshot({ path: kuva('galleria') });

  /* --- 7b. Vertailu: kaksi havaintoa RINNAKKAIN, ei liukuria -------- */
  await s.evaluate(() => document.querySelector('.satelliitti-vertaa')?.click());
  await s.waitForFunction(
    () => [...document.querySelectorAll('.satelliitti-vertailu img')]
      .every((i) => i.naturalWidth > 0) && document.querySelectorAll('.satelliitti-vertailu img').length === 2,
    null, { timeout: 20000 },
  ).catch(() => {});
  const vertailu = await s.evaluate(() => {
    const kerros = document.querySelector('.satelliitti-vertailu');
    const kuvat = [...(kerros?.querySelectorAll('img') ?? [])];
    return {
      auki: Boolean(kerros),
      kuvia: kuvat.length,
      eriLahteet: new Set(kuvat.map((i) => i.src)).size,
      tekstit: [...(kerros?.querySelectorAll('figcaption') ?? [])].map((f) => f.textContent),
      rinnakkain: kuvat.length === 2
        ? Math.abs(kuvat[0].getBoundingClientRect().top - kuvat[1].getBoundingClientRect().top) < 4
          || kuvat[0].getBoundingClientRect().left !== kuvat[1].getBoundingClientRect().left
        : false,
    };
  });
  vaadi(nimessa('Vertaa näyttää kaksi eri havaintoa rinnakkain omine päiväyksineen'),
    vertailu.auki && vertailu.kuvia === 2 && vertailu.eriLahteet === 2
      && vertailu.tekstit.length === 2 && new Set(vertailu.tekstit).size === 2
      && vertailu.tekstit.every((t) => /UTC/.test(t)),
    JSON.stringify(vertailu));
  await s.screenshot({ path: kuva('vertailu') });
  await s.evaluate(() => {
    const kerros = document.querySelector('.satelliitti-vertailu');
    [...(kerros?.querySelectorAll('button') ?? [])].at(-1)?.click();
  });
  await s.waitForTimeout(400);

  /* --- 8. Merkit eivät kuluta pelivuoroa ---------------------------- */
  const kesken = await s.evaluate(PELITILA);
  vaadi(nimessa('linssin merkit eivät kuluta pelivuoroa eivätkä käynnistä matkustusta'),
    kesken === ennen, `${ennen}\n    vs ${kesken}`);

  /* --- 9. Sulkeminen palauttaa kaiken -------------------------------- */
  await s.evaluate(() => document.querySelector('.satelliittipalkki-sulje').click());
  // Merkit häivytetään ulos (250 ms) ja poistuvat seuraavassa piirrossa.
  await s.waitForTimeout(6000);
  const jalkeen = await s.evaluate(() => {
    const topbar = document.querySelector('.topbar');
    return {
      pallolinssi: window.matkakirja.ui.pallolinssi?.tunnus ?? null,
      palkkeja: document.querySelectorAll('.satelliittipalkki').length,
      merkkeja: document.querySelectorAll('.satelliitti-piste').length,
      poistuvia: document.querySelectorAll('.satelliitti-piste.pallolauta-poistuu').length,
      merkkiMaara: window.matkakirja.ui.pallolauta?.merkit?.maara?.('satelliitti') ?? null,
      kortteja: document.querySelectorAll('.satelliitti-kortti').length,
      bodyLuokat: ['aikajana-palkki-auki', 'aikajana-paalla'].filter((l) => document.body.classList.contains(l)),
      topbarNakyvyys: topbar ? getComputedStyle(topbar).visibility : null,
      topbarKorkeus: topbar?.getBoundingClientRect().height ?? null,
      lautaNakyy: window.matkakirja.ui.pallolauta?.paalla?.() === true,
      tila: (() => {
        const { game } = window.matkakirja;
        return JSON.stringify({
          vaihe: game.phase,
          paikka: game.player.pos,
          rahat: game.player.money,
          paiva: game.world?.day ?? null,
          aarteet: (game.player.treasures ?? []).length,
          tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
        });
      })(),
    };
  });
  vaadi(nimessa('Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen täsmälleen'),
    jalkeen.pallolinssi === null && jalkeen.palkkeja === 0 && jalkeen.merkkeja === 0
      && jalkeen.kortteja === 0 && jalkeen.bodyLuokat.length === 0
      && jalkeen.topbarNakyvyys === 'visible' && jalkeen.topbarKorkeus > 20
      && jalkeen.lautaNakyy && jalkeen.tila === ennen,
    JSON.stringify(jalkeen));
  await s.screenshot({ path: kuva('suljettu') });

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' / '));
  await konteksti.close();
}

for (const nakyma of ['tyopoyta', 'puhelin']) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nakyma);
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
