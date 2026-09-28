#!/usr/bin/env node
/*
 * SELAINSAVUKE: LUKIJAN VALIKKO KAIKISSA LUENTAKOHDISSA (28.9.2026).
 *
 *   PLAYWRIGHT_JS=…/node_modules/playwright/index.js \
 *     node tools/savukkeet/savuke-lukijan-valikko-kohdat.mjs [--kuvat <kansio>]
 *
 * Pohja: savuke-lukijan-valikko.mjs (WebKit, iPhone 393 × 852 ja iPad
 * 834 × 1194, puhe-workerin tynkä, media välitetään Noden kautta).
 *
 * Kohdat: nähtävyysikkuna, tiedeliite (+ 2 sivunvaihtoa), eläinkortti,
 * historian hetki, fokusvirran kohtaaminen (FOKUSVIRTA_KORTIT on pois,
 * joten lippu käännetään VAIN palvellussa tiedostossa), syvennys,
 * fokusnosto ja skandaali.
 *
 * VÄITTEET per kohta: kaiutin ja valikkonappi näkyvät (ei peitossa),
 * samassa vanhemmassa, pystykeskiero ≤ 2 px, oikea puoli (nähtävyys:
 * perässä; muut: vasemmalla), ei päällekkäin muiden nappien kanssa,
 * täsmälleen yksi valikkonappi per kaiutin (ei orpoja), valikko avautuu
 * napista ja pysyy näkyvän alueen sisällä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const JUURI = resolve(valitsin('juuri', join(dirname(fileURLToPath(import.meta.url)), '..', '..')));
const ULOS = valitsin('kuvat', '/Users/Shared/Claude/proto-3d/lokit/lukijan-valikko');
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = createServer((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(0, r));
const PORTTI = palvelin.address().port;

const savel = (() => {
  const n = 32000;
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8);
  b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i += 1) b.writeInt16LE(Math.round(9000 * Math.sin((2 * Math.PI * 440 * i) / 8000)), 44 + i * 2);
  return b;
})();

const VALIMUISTI = new Map();
const ulkohaku = (url) => {
  if (!VALIMUISTI.has(url)) {
    VALIMUISTI.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  }
  return VALIMUISTI.get(url);
};

const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const selain = await paketti.webkit.launch();
const NAKYMAT = {
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
};
const tulokset = [];
const taulu = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push(ok);
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 });
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await siivoa(s);
}

/** Kaikki kortit ja dialogit kiinni kohtien välissä. */
async function siivoa(s) {
  await s.evaluate(async () => {
    const ui = window.matkakirja.ui;
    const tuo = async (p) => import(p).catch(() => ({}));
    const [fv, td, hh, sk, sy, fn, et] = await Promise.all([
      tuo('/js/fokusvirta.js'), tuo('/js/tiedeliite.js'), tuo('/js/historian-hetket.js'), tuo('/js/skandaalit.js'),
      tuo('/js/syvennys.js'), tuo('/js/fokusnosto.js'), tuo('/js/elaintaky.js')]);
    for (const f of [fv.suljeFokusvirta, td.suljeTiedeliite, hh.suljeHetki, sk.suljeSkandaali, sy.suljeSyvennys, fn.suljeNostonKortti, et.suljeElaintaky]) {
      try { f?.(ui); } catch { /* ohi */ }
    }
    for (const d of document.querySelectorAll('dialog[open]')) d.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri, .tiedeliite-kerros, .hetki-kerros, .skandaali-kerros, .syvennys-kerros, .fokusnosto-kerros, .elaintaky-kerros, .fokuskohde-popup')) el.remove();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva-ruutu, .fokusvirta-isokuva-ohita')) el.style.display = 'none';
  });
  await s.waitForTimeout(700);
}

const piilotaIsokuvat = (s) => s.evaluate(() => {
  for (const el of document.querySelectorAll('.fokusvirta-isokuva, .fokusvirta-isokuva-ruutu, .fokusvirta-isokuva-ohita')) el.style.display = 'none';
});

/** Klikkaa "Lisää" jos kaksivaiheinen kortti on kuvavaiheessa. */
const lisaa = async (s, kerros) => {
  await s.evaluate((k) => document.querySelector(`${k} .nostokuva-lisaa`)?.click(), kerros);
  await s.waitForTimeout(1500);
};

/**
 * Mittaus: kaikki kaiuttimet säiliössä ja niiden valikkonapit.
 * `perassa` = nähtävyysikkunan rivimalli (valikko kaiuttimen oikealla).
 */
const mittaa = (s, sailio, perassa) => s.evaluate(([sel, perassa]) => {
  const juuri = document.querySelector(sel);
  const vw = innerWidth; const vh = innerHeight;
  const r = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.left * 10) / 10, y: Math.round(b.top * 10) / 10, w: Math.round(b.width * 10) / 10, h: Math.round(b.height * 10) / 10, l: b.left, t: b.top, ri: b.right, bo: b.bottom }; };
  const nakyy = (e) => {
    if (!e || !e.isConnected || e.hidden) return false;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
    const b = e.getBoundingClientRect();
    return b.width > 0 && b.height > 0;
  };
  const kuvaa = (e) => (e ? `${e.tagName.toLowerCase()}${e.id ? `#${e.id}` : ''}${e.className && typeof e.className === 'string' ? `.${e.className.trim().split(/\s+/).join('.')}` : ''}` : null);
  const peitto = (e) => {
    const b = e.getBoundingClientRect();
    const x = b.left + b.width / 2; const y = b.top + b.height / 2;
    if (x < 0 || y < 0 || x > vw || y > vh) return 'ruudun ulkona';
    const p = document.elementFromPoint(x, y);
    return p && (p === e || e.contains(p)) ? null : kuvaa(p);
  };
  const kaikkiValikkonapit = [...document.querySelectorAll('.lukija-valikkonappi')];
  const kaikkiKaiuttimet = [...document.querySelectorAll('.lukija-nappi')];
  const omistetut = new Set(kaikkiKaiuttimet.map((k) => k.__lukijaValikko).filter(Boolean));
  const orvot = kaikkiValikkonapit.filter((v) => !omistetut.has(v)).map(kuvaa);
  if (!juuri) return { juuri: false, orvot, valikkonappejaDom: kaikkiValikkonapit.length, kaiuttimiaDom: kaikkiKaiuttimet.length };
  const kaiuttimet = [...juuri.querySelectorAll('.lukija-nappi')];
  const valikkonapit = [...juuri.querySelectorAll('.lukija-valikkonappi')];
  const napit = kaiuttimet.map((k) => {
    const v = k.__lukijaValikko ?? null;
    const a = r(k); const b = v ? r(v) : null;
    const muut = [...juuri.querySelectorAll('button')].filter((x) => x !== k && x !== v && !x.closest('.lukija-valikko') && !x.classList.contains('lukija-valikkonappi') && !x.classList.contains('lukija-nappi') && nakyy(x));
    const paalla = [];
    for (const [nimi, el, ra] of [['kaiutin', k, a], ['valikko', v, b]]) {
      if (!el || !ra || !nakyy(el)) continue;
      for (const m of muut) {
        const rm = m.getBoundingClientRect();
        const lx = Math.min(ra.ri, rm.right) - Math.max(ra.l, rm.left);
        const ly = Math.min(ra.bo, rm.bottom) - Math.max(ra.t, rm.top);
        if (lx > 0.5 && ly > 0.5) paalla.push({ nappi: nimi, muu: kuvaa(m), leikkaus: `${Math.round(lx)}×${Math.round(ly)}`, muuRect: [Math.round(rm.left), Math.round(rm.top), Math.round(rm.width), Math.round(rm.height)] });
      }
    }
    const kaiutinVsValikko = a && b ? (Math.min(a.ri, b.ri) - Math.max(a.l, b.l) > 0.5 && Math.min(a.bo, b.bo) - Math.max(a.t, b.t) > 0.5) : false;
    return {
      kaiutinNakyy: nakyy(k), valikkoNakyy: nakyy(v),
      kaiutinPeitossa: nakyy(k) ? peitto(k) : '-', valikkoPeitossa: nakyy(v) ? peitto(v) : '-',
      samaVanhempi: Boolean(v) && v.parentElement === k.parentElement,
      irti: Boolean(v?.classList.contains('irti')), kaiutinPos: getComputedStyle(k).position,
      tyylit: ['aikajana-tyyli', 'fokusnosto-tyyli'].filter((t) => document.getElementById(t)),
      vanhempi: kuvaa(k.parentElement), valikonVanhempi: v ? kuvaa(v.parentElement) : null,
      keskiero: a && b ? Math.round(Math.abs((a.t + a.h / 2) - (b.t + b.h / 2)) * 10) / 10 : null,
      puoli: a && b ? (b.l >= a.ri - 2 ? 'perassa' : (b.ri <= a.l + 2 ? 'vasemmalla' : 'paallekkain')) : null,
      oikeaPuoli: a && b ? (perassa ? b.l >= a.ri - 2 : b.ri <= a.l + 2) : false,
      rako: a && b ? Math.round((perassa ? b.l - a.ri : a.l - b.ri) * 10) / 10 : null,
      kaiutinVsValikko,
      paalla,
      kaiutin: [a.x, a.y, a.w, a.h], valikko: b ? [b.x, b.y, b.w, b.h] : null,
      ruudulla: [a, b].every((q) => q && q.l >= -0.5 && q.t >= -0.5 && q.ri <= vw + 0.5 && q.bo <= vh + 0.5),
    };
  });
  const kortti = kaiuttimet[0]?.closest('.tiedeliite-kortti, .fokusnosto-kortti, .elaintaky-kortti, .hetki-kortti, .syvennys-kortti, .skandaali-kortti, .fokusvirta-kortti, dialog') ?? juuri;
  const kr = kortti.getBoundingClientRect();
  return {
    juuri: true, orvot, valikkonappejaDom: kaikkiValikkonapit.length, kaiuttimiaDom: kaikkiKaiuttimet.length,
    kaiuttimia: kaiuttimet.length, valikkonappeja: valikkonapit.length, napit,
    kortti: { sel: kuvaa(kortti), x: kr.left, y: kr.top, w: kr.width, h: kr.height },
  };
}, [sailio, perassa]);

/** Valikon avaus napista ja sen laatikko. */
async function avaaValikkoJaMittaa(s, sailio) {
  const kahva = await s.evaluateHandle((sel) => {
    const k = [...document.querySelectorAll(`${sel} .lukija-nappi`)].find((x) => x.__lukijaValikko && !x.__lukijaValikko.hidden);
    return k?.__lukijaValikko ?? null;
  }, sailio);
  const el = kahva.asElement();
  if (!el) return { avattu: false, syy: 'ei näkyvää valikkonappia' };
  let tapa = 'playwright-klikkaus';
  try {
    await el.click({ timeout: 3000 });
  } catch (e) {
    tapa = `DOM-klikkaus (Playwright: ${String(e.message).split('\n')[0].slice(0, 120)})`;
    await el.evaluate((b) => b.click());
  }
  await s.waitForTimeout(500);
  const tila = await s.evaluate((sel) => {
    const v = document.querySelector('.lukija-valikko');
    if (!v) return { auki: false };
    const b = v.getBoundingClientRect();
    const nappi = [...document.querySelectorAll(`${sel} .lukija-valikkonappi`)].find((x) => x.getAttribute('aria-expanded') === 'true');
    const nb = nappi?.getBoundingClientRect();
    const kortti = v.closest('.tiedeliite-kortti, .fokusnosto-kortti, .elaintaky-kortti, .hetki-kortti, .syvennys-kortti, .skandaali-kortti, .fokusvirta-kortti, dialog');
    const kb = kortti?.getBoundingClientRect();
    return {
      auki: true,
      rect: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)],
      ruudulla: b.left >= -0.5 && b.top >= -0.5 && b.right <= innerWidth + 0.5 && b.bottom <= innerHeight + 0.5,
      korttiSisalla: kb ? b.left >= kb.left - 0.5 && b.right <= kb.right + 0.5 : null,
      napinAlla: nb ? b.top >= nb.bottom - 2 : null,
      ariaExpanded: Boolean(nappi),
      sisalla: Boolean(v.closest(sel)),
      kappaleita: [...v.querySelectorAll('.lukija-kappale')].filter((x) => !x.parentElement.hidden).length,
    };
  }, sailio);
  return { avattu: tila.auki, tapa, ...tila, kahva: el };
}

async function kuvaa(s, nimi, laite, kohta, { valikko = false } = {}) {
  const alue = await s.evaluate(() => {
    const vw = innerWidth; const vh = innerHeight;
    const k = document.querySelector('.lukija-nappi[aria-label]');
    const nappi = [...document.querySelectorAll('.lukija-nappi')].find((x) => x.getBoundingClientRect().width > 0) ?? k;
    const kortti = nappi?.closest('.tiedeliite-kortti, .fokusnosto-kortti, .elaintaky-kortti, .hetki-kortti, .syvennys-kortti, .skandaali-kortti, .fokusvirta-kortti, dialog');
    const kb = kortti?.getBoundingClientRect() ?? { left: 0, top: 0, width: vw, height: vh, bottom: vh };
    const v = document.querySelector('.lukija-valikko')?.getBoundingClientRect();
    const nb = nappi?.getBoundingClientRect();
    let x = Math.max(0, kb.left); let w = Math.min(vw - x, kb.width);
    if (w < 300) { x = Math.max(0, Math.min(x, vw - 300)); w = Math.min(vw, 300); }
    const y = Math.max(0, Math.min(kb.top, (nb?.top ?? kb.top) - 60));
    let ala = Math.max((nb?.bottom ?? y) + 180, y + 320);
    if (v) ala = Math.max(ala, v.bottom + 12);
    ala = Math.min(vh, ala);
    return { x, y, width: w, height: Math.max(40, ala - y) };
  });
  const polku = join(ULOS, `lukijan-valikko-kohdat-${laite}-${kohta}${valikko ? '-valikko' : ''}.png`);
  await s.screenshot({ path: polku, clip: alue }).catch((e) => console.log('kuvavirhe', polku, e.message));
  return polku;
}

/** Yhden kohdan mittaus, kuvat ja väitteet. */
async function tarkistaKohta(s, laite, kohta, sailio, { perassa = false, avaa }) {
  const n = (t) => `${kohta} · ${laite} · ${t}`;
  await siivoa(s);
  let avautui;
  try {
    avautui = await avaa();
  } catch (e) {
    avautui = `virhe: ${e.message}`;
  }
  await piilotaIsokuvat(s);
  await s.waitForTimeout(300);
  const m = await mittaa(s, sailio, perassa);
  if (!m.juuri || !m.kaiuttimia) {
    vaadi(n('kohta aukesi ja kaiutin löytyi'), false, JSON.stringify({ avautui, ...m }));
    taulu.push({ kohta, laite, tila: 'EI AUENNUT', lisa: JSON.stringify({ avautui, juuri: m.juuri, kaiuttimia: m.kaiuttimia }) });
    return null;
  }
  const polku = await kuvaa(s, null, laite, kohta);
  const ongelmat = [];
  if (m.kaiuttimia !== 1) ongelmat.push(`kaiuttimia ${m.kaiuttimia}`);
  if (m.valikkonappeja !== m.kaiuttimia) ongelmat.push(`valikkonappeja ${m.valikkonappeja} / kaiuttimia ${m.kaiuttimia}`);
  if (m.orvot.length) ongelmat.push(`orpoja ${m.orvot.length}: ${m.orvot.join(', ')}`);
  for (const q of m.napit) {
    if (!q.kaiutinNakyy) ongelmat.push('kaiutin ei näy');
    if (!q.valikkoNakyy) ongelmat.push('valikkonappi ei näy');
    if (q.kaiutinPeitossa) ongelmat.push(`kaiutin peitossa: ${q.kaiutinPeitossa}`);
    if (q.valikkoPeitossa) ongelmat.push(`valikkonappi peitossa: ${q.valikkoPeitossa}`);
    if (!q.samaVanhempi) ongelmat.push(`eri vanhempi: ${q.vanhempi} vs ${q.valikonVanhempi}`);
    if (q.keskiero == null || q.keskiero > 2) ongelmat.push(`keskiero ${q.keskiero}`);
    if (!q.oikeaPuoli) ongelmat.push(`väärä puoli: ${q.puoli}`);
    if (q.paalla.length) ongelmat.push(`päällekkäin: ${JSON.stringify(q.paalla)}`);
    if (!q.ruudulla) ongelmat.push('napit ruudun ulkona');
  }
  const va = await avaaValikkoJaMittaa(s, sailio);
  let kuvaV = null;
  if (va.avattu) {
    kuvaV = await kuvaa(s, null, laite, kohta, { valikko: true });
    if (!va.ruudulla) ongelmat.push(`valikko ruudun ulkona ${JSON.stringify(va.rect)}`);
    if (!/^playwright/.test(va.tapa)) ongelmat.push(`valikkonappi ei klikattavissa: ${va.tapa}`);
    // Sulje napista (vaihtokytkin).
    await va.kahva.evaluate((b) => b.click());
    await s.waitForTimeout(300);
    const kiinni = await s.evaluate(() => !document.querySelector('.lukija-valikko'));
    if (!kiinni) ongelmat.push('valikko ei sulkeutunut napista');
  } else ongelmat.push(`valikko ei auennut (${va.syy ?? va.tapa})`);
  const q = m.napit[0];
  const mitat = `irti=${q.irti} kaiutinPos=${q.kaiutinPos} tyylit=${q.tyylit.join('+')}; keskiero ${q.keskiero} px, ${q.puoli}, rako ${q.rako} px, kaiutin ${q.kaiutin.join('/')}, valikkonappi ${q.valikko?.join('/')}, vanhempi ${q.vanhempi}; valikko ${va.avattu ? `${va.rect.join('/')} ruudulla=${va.ruudulla} korttiSisalla=${va.korttiSisalla} kappaleita=${va.kappaleita}` : 'ei auennut'}`;
  vaadi(n('kaksi nappia oikein, valikko avautuu ruudun sisään'), ongelmat.length === 0, ongelmat.length ? `${ongelmat.join(' | ')} || ${mitat}` : mitat);
  taulu.push({ kohta, laite, tila: ongelmat.length ? 'VIKA' : 'OK', lisa: ongelmat.length ? `${ongelmat.join(' | ')} || ${mitat}` : mitat, kuvat: [polku, kuvaV].filter(Boolean) });
  return m;
}

async function reititys(s) {
  await s.route((u) => !/127\.0\.0\.1/.test(u.href), async (r) => {
    const url = r.request().url();
    if (/workers\.dev/.test(url)) {
      if (r.request().method() === 'OPTIONS') { r.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: '' }); return; }
      r.fulfill({ status: 200, contentType: 'audio/wav', body: savel, headers: { 'access-control-allow-origin': '*' } });
      return;
    }
    if (/media\.matkakirja\.app|r2\.dev|wikimedia/.test(url)) {
      const v = await ulkohaku(url);
      if (v) { r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); return; }
    }
    r.abort();
  });
}

async function ajaNakyma(laite, { fvKortit = false } = {}) {
  const virheet = [];
  const ctx = await selain.newContext({ ...NAKYMAT[laite], serviceWorkers: 'block' });
  const s = await ctx.newPage();
  await reititys(s);
  if (fvKortit) {
    // Kohtaamiskortti on lipun takana (FOKUSVIRTA_KORTIT = false): lippu käännetään vain palvellussa tiedostossa.
    await s.route('**/js/fokusvirta.js', (r) => {
      const koodi = readFileSync(join(JUURI, 'js/fokusvirta.js'), 'utf8').replace('export const FOKUSVIRTA_KORTIT = false;', 'export const FOKUSVIRTA_KORTIT = true;');
      r.fulfill({ status: 200, contentType: 'text/javascript', body: koodi });
    });
  }
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);

  if (fvKortit) {
    await tarkistaKohta(s, laite, '5-fokusvirta', '.fokusvirta-kortti', {
      avaa: () => s.evaluate(async () => {
        const fv = await import('/js/fokusvirta.js');
        const { ui } = window.matkakirja;
        const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
        const ehdokkaat = ['ateena', ...Object.keys(FOKUSVIRRAT)];
        for (const id of ehdokkaat) {
          const city = ui.game.board.cityById.get(id);
          const data = city && fv.fokusvirtaSisalto(ui, city);
          if (!data || data.sahketehtava || !data.kohtaaminen) continue;
          fv.asetaFokusvirtaTila(ui.game, city, { vaihe: 'kohtaaminen' });
          const ok = fv.avaaFokusvirta(ui, city);
          return { id, ok, lippu: fv.FOKUSVIRTA_KORTIT };
        }
        return { ok: false, lippu: fv.FOKUSVIRTA_KORTIT };
      }).then(async (x) => { await s.waitForTimeout(1500); return x; }),
    });
    vaadi(`5-fokusvirta · ${laite} · ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' / '));
    await ctx.close();
    return;
  }

  /* 1. Nähtävyysikkuna (Lontoo, ensimmäinen kohde) */
  await tarkistaKohta(s, laite, '1-nahtavyys', '#nahtavyys-dialog', {
    perassa: true,
    avaa: async () => {
      await s.evaluate(() => {
        const { ui } = window.matkakirja;
        ui.game.tokens?.delete('lontoo');
        ui.openArrival(ui.game.board.cityById.get('lontoo'));
      });
      await s.waitForTimeout(2500);
      const r = await s.evaluate(async () => {
        const { ui } = window.matkakirja;
        const { nahtavyysKohteet, avaaNahtavyys } = await import('/js/nahtavyydet.js');
        const kohteet = nahtavyysKohteet(ui);
        if (!kohteet.length) return { kohteita: 0, kaupunki: ui.lehtitila.arrivalShownFor };
        avaaNahtavyys(ui, kohteet[0].k, kohteet[0].numero);
        return { kohteita: kohteet.length, nimi: kohteet[0].k.nimi };
      });
      await s.waitForTimeout(2500);
      return r;
    },
  });

  /* 1-koe: nähtävyyden napit samalle riville nowrap-kääreellä (vain testisivun DOM:ssa) */
  {
    const koe = await s.evaluate(() => {
      const k = document.querySelector('#nahtavyys-otsikko .lukija-nappi');
      const v = k?.__lukijaValikko;
      if (!k || !v) return null;
      const ennen = { rivit: Math.round(document.getElementById('nahtavyys-otsikko').getBoundingClientRect().height) };
      // Koko otsikko nowrap: mittaa parin keskiero, kun valikkonappi EI rivity (kääre rikkoisi '> button' -valitsimet).
      document.getElementById('nahtavyys-otsikko').style.whiteSpace = 'nowrap';
      const a = k.getBoundingClientRect(); const b = v.getBoundingClientRect();
      const h = document.getElementById('nahtavyys-valikko-nappi')?.getBoundingClientRect();
      const lei = (x, y) => (y ? Math.max(0, Math.min(x.right, y.right) - Math.max(x.left, y.left)) * Math.max(0, Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top)) : 0);
      return {
        otsikonKorkeusEnnen: ennen.rivit, otsikonKorkeusNyt: Math.round(document.getElementById('nahtavyys-otsikko').getBoundingClientRect().height),
        keskiero: Math.round(Math.abs((a.top + a.height / 2) - (b.top + b.height / 2)) * 10) / 10,
        rako: Math.round((b.left - a.right) * 10) / 10,
        valikkoOikeaReuna: Math.round(b.right), dialoginOikea: Math.round(document.querySelector('#nahtavyys-dialog').getBoundingClientRect().right),
        kaiutinVsHampurilainen: Math.round(lei(a, h)), valikkoVsHampurilainen: Math.round(lei(b, h)),
        kaiutin: [a.left, a.top, a.width, a.height].map(Math.round), valikko: [b.left, b.top, b.width, b.height].map(Math.round),
        hampurilainen: h ? [h.left, h.top, h.width, h.height].map(Math.round) : null,
      };
    });
    await s.waitForTimeout(300);
    await kuvaa(s, null, laite, '1-nahtavyys-nowrap-koe');
    console.log(`INFO  1-nahtavyys · ${laite} · nowrap-koe: ${JSON.stringify(koe)}`);
    taulu.push({ kohta: '1-nahtavyys-nowrap-koe', laite, tila: 'INFO', lisa: JSON.stringify(koe) });
  }

  /* 2. Tiedeliite + kaksi sivunvaihtoa */
  const tdAvaa = async () => {
    const r = await s.evaluate(async () => {
      const { KEKSINNOT } = await import('/js/linssit/keksinnot.js');
      const { avaaTiedeliite, onTiedeliitteenSivu } = await import('/js/tiedeliite.js');
      const i = KEKSINNOT.findIndex(onTiedeliitteenSivu);
      const ohjain = avaaTiedeliite(window.matkakirja.ui, KEKSINNOT, i, { lahdeVara: 'Wikipedia' });
      return { i, ok: Boolean(ohjain) };
    });
    await s.waitForTimeout(2000);
    return r;
  };
  await tarkistaKohta(s, laite, '2-tiedeliite', '.tiedeliite-kortti', { avaa: tdAvaa });
  // Sivunvaihdot ‹ ›: sama kortti auki (tarkistaKohta siivoaa alussa, joten avataan uudelleen).
  for (const [j, suunta] of [[1, 'seuraava'], [2, 'seuraava']]) {
    // eslint-disable-next-line no-await-in-loop
    await tarkistaKohta(s, laite, `2-tiedeliite-sivu${j}`, '.tiedeliite-kortti', {
      avaa: async () => {
        await tdAvaa();
        for (let k = 0; k < j; k += 1) {
          // eslint-disable-next-line no-await-in-loop
          await s.click(`.tiedeliite-navinappi.${suunta}`, { timeout: 3000 }).catch(() => s.evaluate((q) => document.querySelector(`.tiedeliite-navinappi.${q}`)?.click(), suunta));
          // eslint-disable-next-line no-await-in-loop
          await s.waitForTimeout(1400);
        }
        return { vaihdot: j };
      },
    });
  }
  // Orpotarkistus myös ilman siivousta: 4 vaihtoa edestakaisin samassa kortissa.
  await siivoa(s);
  await tdAvaa();
  for (const q of ['seuraava', 'seuraava', 'edellinen', 'seuraava']) {
    // eslint-disable-next-line no-await-in-loop
    await s.evaluate((x) => document.querySelector(`.tiedeliite-navinappi.${x}`)?.click(), q);
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(900);
  }
  const vaihdot = await mittaa(s, '.tiedeliite-kortti', false);
  vaadi(`2-tiedeliite · ${laite} · 4 sivunvaihdon jälkeen 1 kaiutin + 1 valikkonappi, ei orpoja`,
    vaihdot.kaiuttimia === 1 && vaihdot.valikkonappeja === 1 && vaihdot.orvot.length === 0,
    JSON.stringify({ kaiuttimia: vaihdot.kaiuttimia, valikkonappeja: vaihdot.valikkonappeja, orvot: vaihdot.orvot, dom: [vaihdot.kaiuttimiaDom, vaihdot.valikkonappejaDom] }));
  taulu.push({ kohta: '2-tiedeliite-4vaihtoa', laite, tila: vaihdot.kaiuttimia === 1 && vaihdot.valikkonappeja === 1 && !vaihdot.orvot.length ? 'OK' : 'VIKA', lisa: `kaiuttimia ${vaihdot.kaiuttimia}, valikkonappeja ${vaihdot.valikkonappeja}, orpoja ${vaihdot.orvot.length}, DOM ${vaihdot.kaiuttimiaDom}/${vaihdot.valikkonappejaDom}` });

  /* 3. Eläinkortti */
  await tarkistaKohta(s, laite, '3-elainkortti', '.elaintaky-kerros', {
    avaa: async () => {
      await s.evaluate(async () => {
        const { avaaElaintaky } = await import('/js/elaintaky.js');
        avaaElaintaky(window.matkakirja.ui, 'BIH');
      });
      await s.waitForTimeout(1200);
      await lisaa(s, '.elaintaky-kerros');
      return true;
    },
  });

  /* 4. Historian hetki */
  await tarkistaKohta(s, laite, '4-historian-hetki', '.hetki-kerros', {
    avaa: async () => {
      await s.evaluate(async () => {
        const { HISTORIAN_HETKET } = await import('/js/packs/historian-hetket.js');
        const { avaaHetki } = await import('/js/historian-hetket.js');
        const h0 = HISTORIAN_HETKET[0];
        avaaHetki(window.matkakirja.ui, h0.iso ?? h0.maa ?? null, h0);
      });
      await s.waitForTimeout(1200);
      await lisaa(s, '.hetki-kerros');
      return true;
    },
  });

  /* 6. Syvennys / tarina */
  await tarkistaKohta(s, laite, '6-syvennys', '.syvennys-kerros', {
    avaa: async () => {
      const r = await s.evaluate(async () => {
        const { avaaSyvennys } = await import('/js/syvennys.js');
        const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
        for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
          const taky = (virta.takyt ?? [])[0];
          if (!taky) continue;
          avaaSyvennys(window.matkakirja.ui, cityId, taky, virta);
          return { cityId, id: taky.id };
        }
        return null;
      });
      await s.waitForTimeout(1200);
      await lisaa(s, '.syvennys-kerros');
      return r;
    },
  });

  /* 7a. Fokusnosto */
  await tarkistaKohta(s, laite, '7a-fokusnosto', '.fokusnosto-kerros', {
    avaa: async () => {
      const r = await s.evaluate(async () => {
        const { avaaNostonTunnuksella, nostoKaupunginPooli, NOSTO_MAAT } = await import('/js/fokusnosto.js');
        const { ui } = window.matkakirja;
        const city = ui.game.cityOf();
        // Pooli on pelaajan kaupungin maan pooli (nostoPooli): kokeillaan sen tunnuksia.
        for (const iso of Object.keys(NOSTO_MAAT)) {
          for (const n of nostoKaupunginPooli(iso, city.id).slice(0, 40)) {
            if (avaaNostonTunnuksella(ui, n.id)) return { iso, id: n.id, city: city.id };
          }
        }
        return false;
      });
      await s.waitForTimeout(1200);
      await lisaa(s, '.fokusnosto-kerros');
      return r;
    },
  });

  /* 7b. Skandaali */
  await tarkistaKohta(s, laite, '7b-skandaali', '.skandaali-kerros', {
    avaa: async () => {
      await s.evaluate(async () => {
        const { SKANDAALIT } = await import('/js/packs/skandaalit.js');
        const { avaaSkandaali } = await import('/js/skandaalit.js');
        const iso = Object.keys(SKANDAALIT).find((k) => SKANDAALIT[k].length);
        avaaSkandaali(window.matkakirja.ui, iso, SKANDAALIT[iso][0]);
      });
      await s.waitForTimeout(1200);
      await lisaa(s, '.skandaali-kerros');
      return true;
    },
  });

  vaadi(`${laite} · ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' / '));
  await ctx.close();
}


/** Tiedeliitteen kylmä avaus tuoreella sivulla: ilman ja aikajana.css:n kanssa. */
async function tiedeliiteKylma(laite, { esilataa }) {
  const ctx = await selain.newContext({ ...NAKYMAT[laite], serviceWorkers: 'block' });
  const s = await ctx.newPage();
  await reititys(s);
  await avaaPeli(s);
  if (esilataa) {
    await s.evaluate(() => {
      const perus = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
      for (const [id, f] of [['aikajana-tyyli', 'aikajana.css'], ['fokusnosto-tyyli', 'fokusnosto.css']]) {
        if (document.getElementById(id)) continue;
        const l = document.createElement('link'); l.id = id; l.rel = 'stylesheet'; l.href = new URL(f, perus.href).href; document.head.appendChild(l);
      }
    });
    await s.waitForTimeout(1500);
  }
  const ennen = await s.evaluate(() => ['aikajana-tyyli', 'fokusnosto-tyyli'].filter((t) => document.getElementById(t)));
  await s.evaluate(async () => {
    const { KEKSINNOT } = await import('/js/linssit/keksinnot.js');
    const { avaaTiedeliite, onTiedeliitteenSivu } = await import('/js/tiedeliite.js');
    avaaTiedeliite(window.matkakirja.ui, KEKSINNOT, KEKSINNOT.findIndex(onTiedeliitteenSivu), { lahdeVara: 'Wikipedia' });
  });
  await s.waitForTimeout(2000);
  const m1 = (await mittaa(s, '.tiedeliite-kortti', false)).napit[0];
  // Mikä tahansa lapsimuutos ylänapeissa ajaa kohdistuksen uudelleen (MutationObserver).
  await s.evaluate(() => { const r = document.querySelector('.tiedeliite-ylanapit'); const x = document.createElement('span'); r.appendChild(x); x.remove(); });
  await s.waitForTimeout(400);
  const m2 = (await mittaa(s, '.tiedeliite-kortti', false)).napit[0];
  const tiivis = (q) => q && ({ irti: q.irti, kaiutinPos: q.kaiutinPos, keskiero: q.keskiero, puoli: q.puoli, rako: q.rako, kaiutin: q.kaiutin, valikko: q.valikko });
  const ok = m1 && m1.puoli === 'vasemmalla' && m1.keskiero <= 2;
  vaadi(`2-tiedeliite-kylma(${esilataa ? 'aikajana.css valmiina' : 'ei tyylejä'}) · ${laite} · napit oikein ensimmäisellä avauksella`, ok,
    JSON.stringify({ tyylitEnnen: ennen, ensin: tiivis(m1), mutaationJalkeen: tiivis(m2) }));
  taulu.push({ kohta: `2-tiedeliite-kylma-${esilataa ? 'tyylit' : 'ilman'}`, laite, tila: ok ? 'OK' : 'VIKA', lisa: JSON.stringify({ tyylitEnnen: ennen, ensin: tiivis(m1), mutaationJalkeen: tiivis(m2) }) });
  await ctx.close();
}

console.log(`Lukijan valikko, kohdat — juuri ${JUURI}`);
const laitteet = process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : Object.keys(NAKYMAT);
for (const laite of laitteet) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(laite);
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(laite, { fvKortit: true });
  // eslint-disable-next-line no-await-in-loop
  await tiedeliiteKylma(laite, { esilataa: false });
  // eslint-disable-next-line no-await-in-loop
  await tiedeliiteKylma(laite, { esilataa: true });
}
await selain.close();
palvelin.close();
console.log('\nTAULUKKO');
for (const t of taulu) console.log(`${t.kohta.padEnd(24)} ${t.laite.padEnd(7)} ${t.tila.padEnd(10)} ${t.lisa}`);
const hylatyt = tulokset.filter((x) => !x).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(hylatyt ? 1 : 0);
