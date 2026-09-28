/*
 * SELAINSAVUKE: PULUN TAULU ASTRONAUTIN KAMERASSA (js/linssit/pulu-taulu.js).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader" \
 *     node tools/savukkeet/savuke-astro-taulu.mjs [--kuvat <kansio>] [--vain iphone|ipad|puhe]
 *
 * Omistaja 28.9.2026: Pulu esittelee linssin alussa taulun linssin
 * moodeista, ja Pulun napautus avaa sen aina uudelleen. Yksikkötestit
 * (tests/pulu-taulu.test.mjs) näkevät logiikan tynkäkellolla; TÄMÄ mittaa
 * oikealla pallolla, oikealla tervetulolla ja oikealla Pulun napilla.
 *
 * VÄITTEET (iPhone 393 × 852 ja iPad 834 × 1194 pystyssä):
 *   1. Ensimmäinen avaus: taulu EI näy tervetulon aikana ja tulee
 *      näkyviin ≤ 2 s tervetulon (A1–C2) päätyttyä; Maapallo valittuna.
 *   2. Peitto ≤ 45 % ruudusta; häivytys ≤ 250 ms.
 *   3. Pulun napautus (oikea hiiren napautus pöllönappiin) sulkee ja avaa
 *      taulun; pelin chatti ei aukea.
 *   4. ISS:n sisälle → kyyti ikkunaan (Cupola) ≤ 10 s; Pulun napautus
 *      kyydissä avaa taulun, ja ISS:n sisälle on valittuna.
 *   5. ISS:n rinnalla → seuranta; Astronauttien kuvat → kyydistä pois ja
 *      lähimmän kohteen kuva auki; Maapallo → kuva kiinni, kaukonäkymä.
 *   6. Toinen avaus: ei tervetuloa, taulu heti paljastuksen jälkeen.
 *   7. Ei sivuvirheitä.
 * PUHE (työpöytä): Pulun napautus kesken tervetulon vaientaa Livian heti ja
 *   avaa taulun; puhetta ei tule taulun päälle.
 *
 * VERKKO: ämpäri Noden fetchin kautta (äänet, Globe.gl, tekstuurit, Cupola),
 * muu katki — tuotannon Pöllö-workeria ei kutsuta.
 */
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = valitsin('kuvat', null);
const VAIN = valitsin('vain', null);
if (ULOS) mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const VALIMUISTI = new Map();
function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
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
const PORTTI = Number(process.env.PORTTI ?? 8773);
await new Promise((r) => palvelin.listen(PORTTI, r));

await import('./chromium-liput.mjs');
const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const { PULUN_TERVETULO_TALLE } = await import('../../js/linssit/pulu-tervetulo.js');

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const NAKYMAT = {
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  puhe: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
};

async function avaaSivu(nakyma, virheet, { kuultu = false } = {}) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  await konteksti.addInitScript((k) => {
    try {
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
      if (k.kuultu) localStorage.setItem(k.avain, '1');
    } catch { /* yksityinen tila */ }
  }, { kuultu, avain: PULUN_TERVETULO_TALLE });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov|celestrak/, async (route) => {
    const vastaus = await ulkohaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virheet.push(String(e?.message ?? e).slice(0, 300)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
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
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    // Aloitusvalinta ohitettiin suoraan pelilogiikalla, joten uuden matkan
    // tervehdys (Ohita-kupla Pulun kohdalla) viedään pois kuten doPickStart.
    const { peruLivianAvaus } = await import('/js/livia.js');
    peruLivianAvaus?.();
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .fokusvirta-ohitanappi, .saapumistraileri')) el.remove();
    window.matkakirja.game.polloLoydetty = true;
    window.matkakirjaPollo?.paivitaNakyvyys?.();
    window.matkakirjaPollo?.sulje?.();
  });
  await s.waitForTimeout(1200);
  return pallo;
}

const avaaLinssi = async (s) => {
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
  });
  await s.waitForFunction(() => Boolean(window.matkakirja.ui.pallolinssi?.kahva), null, { timeout: 30000 }).catch(() => {});
  return s.evaluate(() => {
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    return { avattu: Boolean(kahva), tervetulo: Boolean(kahva?.tervetulo), taulu: Boolean(kahva?.taulu) };
  });
};

/**
 * Taulun tila, paneelin mitat ja peitto sivulta. Ensin odotetaan, että
 * avoimen paneelin häivytys on perillä (enintään 8 s): raskaalla
 * ohjelmistorenderöinnillä (swiftshader, iPad 2×) CSS-siirtymän kello
 * käynnistyy vasta seuraavasta esitetystä kehyksestä.
 */
const taulunTila = async (s) => {
  await s.waitForFunction(() => {
    const p = document.querySelector('.astro-paneeli');
    return !p || !p.classList.contains('astro-paneeli-auki') || Number(getComputedStyle(p).opacity) > 0.99;
  }, null, { timeout: 8000, polling: 50 }).catch(() => {});
  return taulunTilaNyt(s);
};
const taulunTilaNyt = (s) => s.evaluate(async () => {
  const { pulunLaatikko } = await import('/js/linssit/pulu-taulu.js');
  const kahva = window.matkakirja.ui.pallolinssi?.kahva;
  const p = document.querySelector('.astro-paneeli');
  const b = p?.getBoundingClientRect();
  const nakyy = Boolean(p && !p.hidden && getComputedStyle(p).opacity > 0.5 && b.width > 0);
  const t = kahva?.taulu?.tila?.();
  return {
    t,
    nakyy,
    laatikko: b ? [b.left, b.top, b.right, b.bottom].map(Math.round) : null,
    peitto: b && nakyy ? (b.width * b.height) / (innerWidth * innerHeight) : 0,
    rivit: p ? [...p.querySelectorAll('.astro-paneeli-rivi')].map((r) => ({
      tunnus: r.dataset.tunnus, valittu: r.classList.contains('astro-valittu'),
    })) : [],
    kesto: p ? getComputedStyle(p).transitionDuration : null,
    pulu: (() => { const r = pulunLaatikko(document, { eleenVara: false }); return r ? [r.left, r.top, r.right, r.bottom].map(Math.round) : null; })(),
    sulku: (() => {
      const x = p?.querySelector('.astro-sulku');
      if (!x) return null;
      const b = x.getBoundingClientRect();
      const e = getComputedStyle(x, '::before');
      return { w: Math.round(b.width), h: Math.round(b.height), ympyraW: e.width, ympyraH: e.height, sade: e.borderRadius };
    })(),
    opacity: p ? getComputedStyle(p).opacity : null,
    anim: p ? p.getAnimations().map((a) => `${a.playState}:${Math.round(a.currentTime ?? -1)}`) : [],
    luokat: p?.className ?? null,
    kuplia: document.querySelectorAll('.pulu-iss-kupla').length,
    ohita: [...document.querySelectorAll('button')].filter((b) => b.textContent.trim() === 'Ohita' && b.getBoundingClientRect().width)
      .map((b) => `${b.className}|${b.parentElement?.className}`),
    chatti: Boolean(document.querySelector('.pollo-paneeli:not([hidden])')),
    kyyti: kahva?.avaruus?.kyytiMoodi?.() ?? null,
    kuva: document.body.classList.contains('satelliitti-kuva-auki'),
    liviaAani: Boolean(window.matkakirja.ui.liviaAani && !window.matkakirja.ui.liviaAani.paused),
    tervetulo: kahva?.tervetulo?.tila?.()?.vaihe ?? null,
  };
});

/** Oikea napautus Pulun nappiin (hiiri sen keskelle, kuten pelaaja). */
const napautaPulua = async (s, { vainJosOsuu = false } = {}) => {
  /*
   * Pulun vanhat kuplat häipyvät 220 ms:ssa taulun auetessa (js/pollo.js
   * poistaKuplat), ja pinon kehys voi olla sen hetken napin päällä: odotetaan
   * enintään 1,5 s, että piste osuu Puluun. Jos ei osu, väite kertoo peittäjän.
   */
  const alkuTila = await s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi');
    const c = n ? getComputedStyle(n) : null;
    return n ? `${n.className}|${c.visibility}|${c.pointerEvents}|${c.opacity}|${c.zIndex}|${n.hidden}` : null;
  });
  const t0 = Date.now();
  await s.waitForFunction(() => {
    const b = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
    return b?.width && document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)?.closest?.('.pollo-nappi');
  }, null, { timeout: 8000, polling: 50 }).catch(() => {});
  const odotus = Date.now() - t0;
  if (odotus > 300) console.log(`INFO  Pulun nappi osui vasta ${odotus} ms:n päästä; alussa ${alkuTila}`);
  const r = await s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi');
    const b = n?.getBoundingClientRect();
    if (!b || !b.width) return null;
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    // Mikä elementti on pisteessä päällimmäisenä (kyydin kerros ei saa peittää).
    const paalla = document.elementFromPoint(x, y);
    const osuu = Boolean(paalla?.closest?.('.pollo-nappi'));
    return { x, y, osuu, ...(osuu ? {} : { paalla: `${paalla?.tagName}.${String(paalla?.className).slice(0, 60)}` }) };
  });
  if (!r) return { ok: false };
  if (vainJosOsuu && !r.osuu) return { ok: false, osuu: false, paalla: r.paalla };
  await s.mouse.click(r.x, r.y);
  await s.waitForTimeout(350);
  return { ok: true, osuu: r.osuu, ...(r.paalla ? { paalla: r.paalla } : {}) };
};

const valitseRivi = async (s, tunnus) => {
  const r = await s.evaluate((t) => {
    const b = document.querySelector(`.astro-paneeli-rivi[data-tunnus="${t}"]`)?.getBoundingClientRect();
    return b && b.width ? { x: b.left + b.width / 2, y: b.top + b.height / 2 } : null;
  }, tunnus);
  if (!r) return false;
  await s.mouse.click(r.x, r.y);
  return true;
};

const odota = (s, ehto, arg, ms) => s.waitForFunction(ehto, arg, { timeout: ms, polling: 150 }).then(() => true).catch(() => false);

const kuva = async (s, nimi) => {
  if (!ULOS) return;
  /*
   * SAVUKKEEN ARTEFAKTI POIS KUVASTA: avaaPeli pakottaa saapumisen
   * Ateenaan pelilogiikalla, ja saapumiskuvan Ohita-nappi (.stage-lapsi,
   * js/fokusvirta.js) syntyy uudelleen linssin alle. Pelaajan polulla
   * saapumiskuva on jo ohi, kun linssi avataan.
   */
  await s.evaluate(() => { for (const el of document.querySelectorAll('.fokusvirta-ohitanappi, .fokusvirta-isokuva')) el.remove(); });
  await s.screenshot({ path: join(ULOS, `${nimi}.png`), timeout: 90000 });
};

/* ════════════════ LAITEAJOT ════════════════ */
for (const laite of ['iphone', 'ipad']) {
  if (VAIN && VAIN !== laite) continue;
  const n = (t) => `${laite}: ${t}`;
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[laite], virheet);
  vaadi(n('pallolauta avautuu'), await avaaPeli(s));
  const avaus = await avaaLinssi(s);
  vaadi(n('1. ensimmäinen avaus: tervetulo alkaa ja taulu on kytketty'), avaus.tervetulo && avaus.taulu, JSON.stringify(avaus));

  /* Tervetulon ajan: taulu ei saa näkyä. */
  const jakso = await s.evaluate(async () => {
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    const alku = performance.now();
    let nakyiPuheenAikana = false;
    let loppui = null;
    let taulunHetki = null;
    for (;;) {
      const v = kahva?.tervetulo?.tila?.()?.vaihe;
      const auki = Boolean(kahva?.taulu?.tila?.()?.auki);
      if ((v === 'odottaa' || v === 'puhuu') && auki) nakyiPuheenAikana = true;
      if (loppui === null && !['odottaa', 'puhuu'].includes(v)) loppui = performance.now();
      if (loppui !== null && auki) { taulunHetki = performance.now(); break; }
      if (performance.now() - alku > 150000) break;
      if (loppui !== null && performance.now() - loppui > 5000) break;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => { setTimeout(r, 100); });
    }
    return {
      vaihe: kahva?.tervetulo?.tila?.()?.vaihe,
      nakyiPuheenAikana,
      viiveMs: loppui !== null && taulunHetki !== null ? Math.round(taulunHetki - loppui) : null,
      kestoMs: Math.round(performance.now() - alku),
    };
  });
  vaadi(n('1. taulu ei näy tervetulon aikana'), !jakso.nakyiPuheenAikana && jakso.vaihe === 'valmis', JSON.stringify(jakso));
  vaadi(n('1. taulu tulee ≤ 2 s tervetulon jälkeen'), jakso.viiveMs !== null && jakso.viiveMs <= 2000, `${jakso.viiveMs} ms`);
  await s.waitForTimeout(400);
  let t = await taulunTila(s);
  vaadi(n('1. taulu näkyy, Maapallo valittuna, neljä moodiriviä'),
    t.nakyy && t.rivit.map((r) => r.tunnus).join() === 'pallo,iss-rinnalla,iss-sisalle,kuvat'
      && t.rivit.find((r) => r.valittu)?.tunnus === 'pallo',
    JSON.stringify({ rivit: t.rivit, opacity: t.opacity, kuplia: t.kuplia, anim: t.anim, luokat: t.luokat, ohita: t.ohita }));
  vaadi(n('1. tervetulon kuplat eivät jää taulun alle'), t.kuplia === 0, `${t.kuplia}`);
  const leikkaa = (a, b) => Boolean(a && b && a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3]);
  vaadi(n('2. taulu ei peitä Pulua (suorakulmiot eivät leikkaa, rako ≥ 8 px)'),
    t.pulu && !leikkaa(t.laatikko, t.pulu) && t.pulu[1] - t.laatikko[3] >= 8,
    `taulu ${JSON.stringify(t.laatikko)} pulu ${JSON.stringify(t.pulu)}`);
  vaadi(n('2. ✕ on ehjä ympyrä, osuma-ala ≥ 44 px'),
    t.sulku?.w >= 44 && t.sulku?.h >= 44 && t.sulku.ympyraW === t.sulku.ympyraH && t.sulku.sade === '50%',
    JSON.stringify(t.sulku));
  vaadi(n('2. peitto ≤ 45 % ruudusta'), t.peitto > 0 && t.peitto <= 0.45, `${(t.peitto * 100).toFixed(1)} % ${JSON.stringify(t.laatikko)}`);
  const kestoMs = parseFloat(t.kesto) * (String(t.kesto).includes('ms') ? 1 : 1000);
  vaadi(n('2. häivytys ≤ 250 ms'), kestoMs > 0 && kestoMs <= 250, t.kesto);
  await kuva(s, `astro-taulu-${laite}-1-tervetulon-jalkeen`);

  /* Pulun napautus: kiinni ja auki. */
  const n1 = await napautaPulua(s);
  t = await taulunTila(s);
  const kiinni = !t.nakyy && t.t?.auki === false;
  const n2 = await napautaPulua(s);
  await s.waitForTimeout(250);
  t = await taulunTila(s);
  vaadi(n('3. Pulun napautus sulkee ja avaa taulun'), n1.ok && n2.ok && n1.osuu && kiinni && t.nakyy, JSON.stringify({ n1, n2, kiinni, nakyy: t.nakyy }));
  vaadi(n('3. pelin chatti ei aukea linssissä'), !t.chatti);
  vaadi(n('3. napautuksen jälkeen taulu ei peitä Pulua'), t.pulu && !leikkaa(t.laatikko, t.pulu),
    `taulu ${JSON.stringify(t.laatikko)} pulu ${JSON.stringify(t.pulu)}`);
  await kuva(s, `astro-taulu-${laite}-2-pulun-napautus`);

  /* ISS:n sisälle. */
  await valitseRivi(s, 'iss-sisalle');
  const ikkunaan = await odota(s, () => {
    const m = window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.kyytiMoodi?.();
    return m?.tila === 'ikkuna' && !m.siirtyy;
  }, null, 25000);
  t = await taulunTila(s);
  vaadi(n('4. ISS:n sisälle → Cupola (kyyti ikkunassa)'), ikkunaan && !t.nakyy, JSON.stringify(t.kyyti));
  // Cupolan kuvat latautuvat ämpäristä.
  await odota(s, () => Boolean(document.querySelector('.iss-kyyti-kehys[data-ladattu="1"]')), null, 8000);
  await s.waitForTimeout(700);
  await kuva(s, `astro-taulu-${laite}-3-iss-sisalla`);
  const n3 = await napautaPulua(s);
  await s.waitForTimeout(250);
  t = await taulunTila(s);
  vaadi(n('4. kyydissä Pulun napautus osuu Puluun ja avaa taulun, ISS:n sisälle valittuna'),
    n3.osuu && t.nakyy && t.rivit.find((r) => r.valittu)?.tunnus === 'iss-sisalle' && t.kyyti?.tila === 'ikkuna',
    JSON.stringify({ n3, valittu: t.rivit.find((r) => r.valittu)?.tunnus, kyyti: t.kyyti }));
  vaadi(n('4. kyydissä taulu ei peitä Pulua'), t.pulu && !leikkaa(t.laatikko, t.pulu),
    `taulu ${JSON.stringify(t.laatikko)} pulu ${JSON.stringify(t.pulu)}`);
  await kuva(s, `astro-taulu-${laite}-4-taulu-kyydissa`);

  /* ISS:n rinnalla → seuranta. */
  await valitseRivi(s, 'iss-rinnalla');
  const seurantaan = await odota(s, () => {
    const m = window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.kyytiMoodi?.();
    return m?.tila === 'seuranta' && !m.siirtyy;
  }, null, 8000);
  vaadi(n('5. ISS:n rinnalla → seuranta'), seurantaan);

  /* Astronauttien kuvat → pois kyydistä ja kuva auki. */
  await napautaPulua(s);
  await s.waitForTimeout(250);
  await valitseRivi(s, 'kuvat');
  const kuviin = await odota(s, () => document.body.classList.contains('satelliitti-kuva-auki')
    && !window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.kyydissa?.(), null, 10000);
  t = await taulunTila(s);
  vaadi(n('5. Astronauttien kuvat → kyydistä pois ja kuva auki'), kuviin, JSON.stringify({ kyyti: t.kyyti, kuva: t.kuva }));
  if (kuviin) { await s.waitForTimeout(2000); await kuva(s, `astro-taulu-${laite}-5-kuvat`); }

  /* Maapallo → kuva kiinni (taulu kahvan kautta: kuvanäkymässä Pulu on minipulu). */
  const pulunKuvassa = await s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi');
    const b = n?.getBoundingClientRect();
    if (!b?.width) return 'piilossa';
    return document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)?.closest?.('.pollo-nappi') ? 'osuu' : 'peitossa';
  });
  /* 8. Valokuvan minipulu avaa taulun; "Kysy Pululta" → chatti auki, taulu kiinni. */
  const napautaMinipulua = async () => {
    const r = await s.evaluate(() => {
      const b = document.querySelector('.satelliitti-pulunappi')?.getBoundingClientRect();
      return b?.width ? { x: b.left + b.width / 2, y: b.top + b.height / 2 } : null;
    });
    if (r) { await s.mouse.click(r.x, r.y); await s.waitForTimeout(300); }
    return Boolean(r);
  };
  const chattiAuki = () => s.evaluate(() => {
    const k = document.querySelector('.satelliitti-pulukortti');
    return Boolean(k && !k.hidden && k.getBoundingClientRect().height > 0);
  });
  const m1 = await napautaMinipulua();
  t = await taulunTila(s);
  vaadi(n('8. valokuvan minipulu avaa taulun (ei chattia)'), m1 && t.nakyy && t.kuva && !(await chattiAuki()),
    JSON.stringify({ m1, nakyy: t.nakyy, valittu: t.rivit.find((r) => r.valittu)?.tunnus }));
  vaadi(n('8. kuvanäkymässä taulu ei peitä minipulua'),
    t.pulu && !leikkaa(t.laatikko, t.pulu) && t.pulu[1] - t.laatikko[3] >= 8,
    `taulu ${JSON.stringify(t.laatikko)} minipulu ${JSON.stringify(t.pulu)}`);
  const linkki = await s.evaluate(() => {
    const b = document.querySelector('.astro-paneeli-linkki')?.getBoundingClientRect();
    const rivi = document.querySelector('.astro-paneeli-rivi')?.getBoundingClientRect();
    return b ? { w: Math.round(b.width), h: Math.round(b.height), rivi: Math.round(rivi?.height ?? 0), teksti: document.querySelector('.astro-paneeli-linkki').textContent } : null;
  });
  vaadi(n('8. "Kysy Pululta" -linkki: osuma-ala ≥ 44 px, ei riviä korkeampi'),
    linkki?.teksti === 'Kysy Pululta' && linkki.h >= 44 && linkki.h <= linkki.rivi, JSON.stringify(linkki));
  await kuva(s, `astro-taulu-${laite}-6-kuva-minipulu-taulu`);
  await s.evaluate(() => document.querySelector('.astro-paneeli-linkki')?.scrollIntoView?.({ block: 'nearest' }));
  const lb = await s.evaluate(() => { const b = document.querySelector('.astro-paneeli-linkki').getBoundingClientRect(); return { x: b.left + 40, y: b.top + b.height / 2 }; });
  await s.mouse.click(lb.x, lb.y);
  await s.waitForTimeout(500);
  t = await taulunTila(s);
  vaadi(n('8. "Kysy Pululta" → chatti auki ja taulu kiinni'), (await chattiAuki()) && !t.nakyy && t.t?.auki === false,
    JSON.stringify({ nakyy: t.nakyy, loki: t.t?.loki?.slice(-3) }));
  const m2 = await napautaMinipulua();
  t = await taulunTila(s);
  vaadi(n('8. minipulu chatin päältä: taulu auki, chatti kiinni'), m2 && t.nakyy && !(await chattiAuki()));
  await valitseRivi(s, 'pallo');
  await s.waitForTimeout(600);
  t = await taulunTila(s);
  vaadi(n('5. Maapallo → kuva kiinni, kaukonäkymä'), !t.kuva && (t.kyyti?.tila ?? 'kauko') === 'kauko', `${JSON.stringify(t.kyyti)} pulu kuvassa: ${pulunKuvassa}`);

  /* Toinen avaus: taulu heti ilman tervetuloa. */
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1500);
  const toinen = await avaaLinssi(s);
  const heti = await s.evaluate(async () => {
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    const alku = performance.now();
    let paljastui = null;
    for (;;) {
      if (paljastui === null && kahva?.avaruus?.paljastettu?.()) paljastui = performance.now();
      if (kahva?.taulu?.tila?.()?.auki) {
        const a = window.matkakirja.ui.liviaAani;
        return {
          viiveMs: paljastui === null ? null : Math.round(performance.now() - paljastui),
          liviaAani: Boolean(a && !a.paused && !a.ended),
          aani: a ? String(a.currentSrc || a.src || '').split('/').pop() : null,
        };
      }
      if (performance.now() - alku > 30000) return { viiveMs: null };
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => { setTimeout(r, 100); });
    }
  });
  vaadi(n('6. toinen avaus: ei tervetuloa, taulu ≤ 2 s paljastuksesta ilman puhetta'),
    toinen.avattu && !toinen.tervetulo && heti.viiveMs !== null && heti.viiveMs <= 2000 && !heti.liviaAani,
    JSON.stringify({ ...toinen, ...heti }));
  /* 9. Ilman Liviaa: Näkymät-nappi Pulun paikalla avaa taulun; Pulun palatessa nappi katoaa. */
  vaadi(n('9. Pulun kanssa Näkymät-nappia ei näy'), await s.evaluate(() => {
    const b = document.querySelector('.astro-nakymat-nappi');
    return Boolean(b) && (b.hidden || !b.getBoundingClientRect().width);
  }));
  await s.evaluate(() => {
    window.matkakirja.ui.pallolinssi.kahva.taulu.sulje();
    window.matkakirja.game.polloLoydetty = false;
    window.matkakirjaPollo?.paivitaNakyvyys?.();
    // Pakotetun Ateena-saapumisen kuva palaa pelin tilasta: savukkeen artefakti.
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .fokusvirta-ohitanappi')) el.remove();
  });
  const nakymat = await odota(s, () => {
    const b = document.querySelector('.astro-nakymat-nappi')?.getBoundingClientRect();
    return Boolean(b?.width);
  }, null, 5000);
  const puluPoissa = await s.evaluate(async () => !(await import('/js/linssit/pulu-taulu.js')).pulunPaikalla(document));
  const nb = await s.evaluate(() => { const b = document.querySelector('.astro-nakymat-nappi')?.getBoundingClientRect(); return b?.width ? { x: b.left + b.width / 2, y: b.top + b.height / 2, w: Math.round(b.width), h: Math.round(b.height) } : null; });
  if (nb) await s.mouse.click(nb.x, nb.y);
  await s.waitForTimeout(300);
  t = await taulunTila(s);
  vaadi(n('9. ilman Liviaa Näkymät-nappi avaa taulun (osuma ≥ 44 px)'),
    nakymat && puluPoissa && t.nakyy && nb?.h >= 44 && nb?.w >= 44, JSON.stringify({ nakymat, puluPoissa, nb, nakyy: t.nakyy }));
  vaadi(n('9. taulu Näkymät-napin yllä ≥ 8 px'), t.pulu && !leikkaa(t.laatikko, t.pulu) && t.pulu[1] - t.laatikko[3] >= 8,
    `taulu ${JSON.stringify(t.laatikko)} nappi ${JSON.stringify(t.pulu)}`);
  await kuva(s, `astro-taulu-${laite}-7-nakymat-nappi`);
  await s.evaluate(() => {
    window.matkakirja.game.polloLoydetty = true;
    window.matkakirjaPollo?.paivitaNakyvyys?.();
  });
  const katosi = await odota(s, () => {
    const b = document.querySelector('.astro-nakymat-nappi');
    return b && (b.hidden || !b.getBoundingClientRect().width);
  }, null, 5000);
  vaadi(n('9. Pulun palatessa Näkymät-nappi katoaa'), katosi);
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(800);
  const jaljella = await s.evaluate(() => document.querySelectorAll('.astro-paneeli, .astro-nakymat-nappi').length);
  vaadi(n('linssin sulku purkaa taulun'), jaljella === 0, `${jaljella}`);
  vaadi(n('7. ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

/* ════════════════ PUHE: napautus kesken tervetulon ════════════════ */
if (!VAIN || VAIN === 'puhe') {
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT.puhe, virheet);
  await avaaPeli(s);
  const avaus = await avaaLinssi(s);
  const alkoi = await odota(s, () => {
    const a = window.matkakirja.ui.liviaAani;
    return (window.matkakirja.ui.pallolinssi?.kahva?.tervetulo?.tila?.().sanotut?.length ?? 0) >= 1 && a && !a.paused;
  }, null, 30000);
  await s.waitForTimeout(1500);
  const ennen = await taulunTila(s);
  /*
   * Pulu voi olla puheen ajan väistynyt oman kuplansa alta piiloon
   * (js/pulu-paneelin-ylla.js); silloin pelaaja ei voi napauttaa sitä, ja
   * sama polku ajetaan taulun kahvalla (napautaPulua = dokumentin kuuntelija).
   */
  let napautus = await napautaPulua(s, { vainJosOsuu: true });
  if (!napautus.osuu) {
    console.log(`INFO  puhe: Pulu piilossa kuplan alla (${napautus.paalla}), napautus kahvalla`);
    await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.taulu.napautaPulua());
    napautus = { ok: true, kahvalla: true };
  }
  const jalkeen = await taulunTila(s);
  vaadi('puhe: tervetulo soi ennen napautusta, taulu kiinni', avaus.tervetulo && alkoi && ennen.liviaAani && !ennen.nakyy,
    JSON.stringify({ tervetulo: ennen.tervetulo, liviaAani: ennen.liviaAani, nakyy: ennen.nakyy }));
  vaadi('puhe: Pulun napautus vaientaa Livian ja avaa taulun', napautus.ok && jalkeen.nakyy && !jalkeen.liviaAani
    && jalkeen.tervetulo === 'ohitettu', JSON.stringify({ nakyy: jalkeen.nakyy, liviaAani: jalkeen.liviaAani, tervetulo: jalkeen.tervetulo }));
  await s.waitForTimeout(8000);
  const myohemmin = await taulunTila(s);
  vaadi('puhe: taulun aikana ei uutta puhetta', !myohemmin.liviaAani && myohemmin.t?.avauksia === 1,
    JSON.stringify({ liviaAani: myohemmin.liviaAani, avauksia: myohemmin.t?.avauksia }));
  vaadi('puhe: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const lapi = tulokset.filter((x) => x.ok).length;
console.log(`\nSavuke astro-taulu: ${lapi}/${tulokset.length} läpi.`);
process.exit(lapi === tulokset.length ? 0 : 1);
