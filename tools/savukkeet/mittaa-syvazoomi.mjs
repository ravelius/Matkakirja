/*
 * MITTA: SYVÄN ZOOMIN ELÄVÄ MERKKIKERROS (bugiraportti 2.9.2026).
 *
 * Omistaja, sanatarkasti: *"symbolit heittelee muodoiltaa ja tekstejä
 * puuttuu"* (Bulgaria, mittajana 50 km). Tämä työkalu toistaa juuri sen
 * näkymän ja lukee DOMista ne luvut, joita silmä ei osaa lukea:
 * jokaisen elävän symbolin RUUTUKOON, symbolin ja sen nimen välimatkan
 * sekä nimettömien symbolien määrän.
 *
 * EI OLE SAVUKE VAAN MITTA: tämä ei väitä mitään eikä kaadu, se
 * tulostaa luvut. Vartio (savuke-syvazoomi.mjs) käyttää samaa
 * mittausta ja asettaa sille rajat.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-syvazoomi.mjs [askelia] [kuva.png]
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/*
 * LAATTALUETTELO, JOSSA NIMIÖITÄ EI OLE POLTETTU — sama syy ja samat
 * luvut kuin savuke-fokuskohteet.mjs:ssä: kontin selain ei pääse
 * ämpäriin, ja ilman tätä vastausta luettelo jää tyhjäksi, oletus on
 * "vanhat laatat" ja js/karttanimet.js vaikenee kokonaan. Silloin
 * mittaus EI näkisi juuri sitä kerrosta, jonka symboleista bugiraportti
 * puhuu (Balkanvuorten jättikolmio on maastonimikerroksen merkki).
 */
const PYRAMIDILUETTELO = JSON.stringify({
  versio: '2026-08-31',
  lauta: 'maailmankartta',
  laatta: 512,
  muoto: 'webp',
  nimiot: false,
  arkki: { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 },
  tasot: [{
    z: 0,
    leveys: 675,
    korkeus: 411,
    pikseliaPerYksikko: 0.05625,
    sarakkeita: 2,
    riveja: 1,
    laatasto: null,
  }],
});

/**
 * Avaa pelin annetussa kaupungissa ja zoomaa `askelia` porrasta sisään.
 * Palauttaa mittaustuloksen ja (jos `kuva` annettu) kuvakaappauksen.
 */
export async function mittaaSyvaZoomi({
  kaupunki = 'sofia', askelia = 8, kuva = null, ruutu = { width: 834, height: 1112 },
  dpr = 2, panoroiNappulaan = false,
} = {}) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());

  const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await selain.newContext({
    viewport: ruutu, deviceScaleFactor: dpr, reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route('**/julisteet/pyramidi/pyramidi.json', (route) => route.fulfill({
    status: 200, contentType: 'application/json', body: PYRAMIDILUETTELO,
  }));
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(3000);
  /* Kuplat ja päiväkirja pois kartan päältä, jotta kaappaus näyttää kartan. */
  for (let i = 0; i < 6; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.keyboard.press('Escape');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
  }
  for (let i = 0; i < askelia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(700);
  }
  /*
   * NAPPULAN LUO (valinnainen): zoomi tarttuu näkymän keskipisteeseen,
   * joka on maan lehden keskus — pelaajan kaupunki ja sen tihein
   * nostorypäs jää reunan taakse. Omistajan kaappauksessa nappula on
   * kuvassa, joten mittaus panoroi sinne raahaamalla karttaa kuten
   * sormi tekisi.
   */
  if (panoroiNappulaan) {
    const kohde = await sivu.evaluate(() => {
      const t = document.querySelector('.tokens');
      if (!t) return null;
      const r = t.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (kohde) {
      const kx = ruutu.width / 2;
      const ky = ruutu.height / 2;
      await sivu.mouse.move(kohde.x, kohde.y);
      await sivu.mouse.down();
      for (let i = 1; i <= 12; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await sivu.mouse.move(kohde.x + ((kx - kohde.x) * i) / 12,
          kohde.y + ((ky - kohde.y) * i) / 12);
      }
      await sivu.mouse.up();
      await sivu.waitForTimeout(1500);
    }
  }
  await sivu.waitForTimeout(2500);

  const mitat = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const nak = ui.nakyvaAlue();
    const rk = (e) => {
      const r = e.getBoundingClientRect();
      return {
        x: +(r.x + r.width / 2).toFixed(1),
        y: +(r.y + r.height / 2).toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
      };
    };
    /*
     * RUUDULLA = RUUDULLA. Marginaalia ei anneta: nimikerros tekee
     * solmun vain näkymään (js/karttanimet.js "NÄKYMÄRAJAUS ON KOKO
     * SÄÄSTÖ"), joten reunan ulkopuolinen merkki näyttäisi nimettömältä
     * ilman että mikään on vialla.
     */
    const nakyy = (r) => r.w > 0 && r.h > 0 && r.x > 0 && r.x < window.innerWidth
      && r.y > 0 && r.y < window.innerHeight;

    /* 1. Maastosymbolit ja paikannimet (js/karttanimet.js). */
    const pisteet = [...document.querySelectorAll('.karttanimet .karttamerkki-piste')]
      .map(rk).filter(nakyy);
    const nimet = [...document.querySelectorAll('.karttanimet text')].map((e) => ({
      teksti: e.textContent,
      laji: (e.getAttribute('class') ?? '').replace('karttanimi karttanimi-', ''),
      ...rk(e),
    })).filter(nakyy);
    /*
     * ONKO KOLMIOLLA NIMI? Nimi ladotaan merkin alle (11 CSS-px), joten
     * lähin nimi lasketaan ruudulta eikä tietueesta: juuri sen pelaaja
     * näkee. Raja on avara (60 px), koska mittaus etsii NIMETÖNTÄ
     * symbolia eikä hio ladonnan tarkkuutta.
     */
    const vuoret = [...document.querySelectorAll('.karttanimet .karttamerkki-vuori')]
      .map(rk).filter(nakyy).map((v) => {
        let lahin = null;
        let paras = Infinity;
        for (const n of nimet) {
          const d = Math.hypot(n.x - v.x, n.y - v.y);
          if (d < paras) { paras = d; lahin = n; }
        }
        return { ...v, nimi: paras <= 60 ? lahin.teksti : null, nimenEtaisyys: +paras.toFixed(1) };
      });

    /* 2. Karttanostot (js/fokuskohteet.js) — symboli ja sen nimiö. */
    const nostot = [];
    for (const r of ui.fokuskohdeRyhmat ?? []) {
      const g = r.g;
      if (!g?.isConnected) continue;
      /*
       * SYMBOLI ON GLYYFIRYHMÄ, EI KOKO ANKKURIRYHMÄ: ankkuriryhmässä
       * on myös näkymätön osumaympyrä (44 px) ja nimiö, joten sen
       * laatikko kertoisi osuma-alan eikä musteen koon.
       */
      const sym = g.querySelector('.fokuskohde-glyyfi') ?? g.querySelector('.fokuskohde');
      /*
       * NIMIÖ EI OLE RYHMÄN SISÄLLÄ vaan nimikerroksessa
       * (js/karttanimet.js luovutaKohdeNimiot -> data-kohde). Elävä
       * nosto ja sen nimi ovat eri kerroksissa, ja juuri niiden VÄLI
       * on se, minkä omistaja luki ruudulta.
       */
      const teksti = document.querySelector(`.karttanimet [data-kohde="${CSS.escape(r.id)}"]`)
        ?? g.querySelector('.nostosym-nimio, text');
      const gr = rk(g);
      if (!nakyy(gr) || !sym) continue;
      nostot.push({
        id: r.id,
        nimi: r.nimi ?? '',
        nimioNakyy: Boolean(r.nimi) && r.nimioNakyy !== false,
        symboli: rk(sym),
        nimio: teksti ? rk(teksti) : null,
        ryhma: gr,
      });
    }

    /* 3. Siirtoviivat (js/fokusniput.js). */
    const viivat = [...document.querySelectorAll('.nippuviivat line')].map((e) => {
      const l = e.getBoundingClientRect();
      const sk = nak.skaala;
      return {
        leveysPx: +(Number(e.getAttribute('stroke-width')) * sk).toFixed(2),
        katkoPx: (e.getAttribute('stroke-dasharray') ?? '').split(' ')
          .map((n) => +(Number(n) * sk).toFixed(2)).join(' / '),
        pituusPx: +Math.hypot(l.width, l.height).toFixed(1),
      };
    });

    /* 4. Pelinappula — peittääkö se oman kaupungin nimen? */
    const nappula = document.querySelector('.tokens');
    return {
      skaala: +nak.skaala.toFixed(3),
      dpr: window.devicePixelRatio,
      mittajana: document.querySelector('.mittakaava-teksti, .karttamittari text, .kartta-mittari')?.textContent ?? null,
      vuoret,
      pisteet,
      nimet,
      nostot,
      viivat,
      nappula: nappula ? rk(nappula) : null,
    };
  });
  if (kuva) await sivu.screenshot({ path: kuva });
  await sivu.close();
  await ctx.close();
  await selain.close();
  return mitat;
}

/** Tiivistelmä: mitä bugiraportti kysyy. */
export function tiivista(m) {
  const koot = (lista) => lista.map((r) => Math.max(r.w, r.h));
  const vuorenKoot = koot(m.vuoret);
  const nostonKoot = koot(m.nostot.map((n) => n.symboli));
  const hajonta = (a) => (a.length ? Math.max(...a) / Math.max(0.01, Math.min(...a)) : 0);
  /* Nimetön nosto: symboli kartalla, nimiö ei. */
  const nimettomatNostot = m.nostot.filter((n) => n.nimi && !n.nimio);
  /*
   * RAKO: symbolin reunasta nimiölaatikon reunaan. Keskipisteiden väli
   * kertoisi enimmäkseen nimen pituuden; rako kertoo sen, mitä silmä
   * lukee — onko nimi merkkinsä vieressä vai tyhjän paperin takana.
   */
  const raot = m.nostot.filter((n) => n.nimio).map((n) => {
    const dx = Math.max(0, Math.abs(n.nimio.x - n.symboli.x) - (n.nimio.w + n.symboli.w) / 2);
    const dy = Math.max(0, Math.abs(n.nimio.y - n.symboli.y) - (n.nimio.h + n.symboli.h) / 2);
    return +Math.hypot(dx, dy).toFixed(1);
  });
  return {
    skaala: m.skaala,
    vuorisymboleja: m.vuoret.length,
    nimettomiaVuoria: m.vuoret.filter((v) => !v.nimi).length,
    vuorenKokoMin: vuorenKoot.length ? +Math.min(...vuorenKoot).toFixed(1) : null,
    vuorenKokoMax: vuorenKoot.length ? +Math.max(...vuorenKoot).toFixed(1) : null,
    nostosymboleja: m.nostot.length,
    nostonKokoMin: nostonKoot.length ? +Math.min(...nostonKoot).toFixed(1) : null,
    nostonKokoMax: nostonKoot.length ? +Math.max(...nostonKoot).toFixed(1) : null,
    /* KOKOHAJONTA: suurin symboli jaettuna pienimmällä samassa näkymässä. */
    vuoriVsNosto: nostonKoot.length && vuorenKoot.length
      ? +(Math.max(...vuorenKoot) / Math.max(...nostonKoot)).toFixed(2) : null,
    nostonSisainenHajonta: +hajonta(nostonKoot).toFixed(2),
    nimettomiaNostoja: nimettomatNostot.length,
    nimettomatNostot: nimettomatNostot.map((n) => n.nimi),
    nimionRakoMax: raot.length ? Math.max(...raot) : null,
    viivanLeveysPx: m.viivat.length ? Math.max(...m.viivat.map((v) => v.leveysPx)) : null,
    viivanKatko: m.viivat[0]?.katkoPx ?? null,
    nimia: m.nimet.length,
    nimet: m.nimet.map((n) => n.teksti),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const askelia = Number(process.argv[2] ?? 8);
  const kuva = process.argv[3] ?? null;
  const panoroiNappulaan = process.argv[4] === 'nappulaan';
  const m = await mittaaSyvaZoomi({ askelia, kuva, panoroiNappulaan });
  console.log(JSON.stringify(tiivista(m), null, 1));
  console.log('--- nostot ---');
  for (const n of m.nostot) {
    console.log(`${(n.nimi || n.id).padEnd(24)} sym ${String(n.symboli.w).padStart(6)} x ${String(n.symboli.h).padStart(6)}`
      + `  nimio ${n.nimio ? `${n.nimio.w} x ${n.nimio.h} @ ${Math.round(Math.hypot(n.nimio.x - n.symboli.x, n.nimio.y - n.symboli.y))} px` : '—'}`);
  }
  console.log('--- maastosymbolit ---');
  for (const v of m.vuoret) console.log(`vuori  ${v.w} x ${v.h} @ (${v.x}, ${v.y})  nimi ${v.nimi ?? '—'}`);
  for (const p of m.pisteet) console.log(`piste  ${p.w} x ${p.h} @ (${p.x}, ${p.y})`);
  console.log('--- nimet ---');
  for (const n of m.nimet) console.log(`${n.laji.padEnd(12)} ${n.teksti} @ (${n.x}, ${n.y}) ${n.w}x${n.h}`);
  process.exit(0);
}
