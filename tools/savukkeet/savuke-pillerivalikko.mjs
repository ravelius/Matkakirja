/*
 * SELAINSAVUKE: PILLERIVALIKKO (omistaja 29.9.2026, pillerivalikkouudistus).
 *
 * Yksikkötestit (tests/aanisaatimet.test.mjs, tests/matkalaukun-linssit.test.mjs,
 * tests/kokoelmanakyma.test.mjs) näkevät DOM-tyngällä sen, MITÄ ui.js
 * rakentaa. Tämä savuke mittaa, miltä se OIKEASTI näyttää ja toimiiko
 * se oikeassa selaimessa: asettelun mitat, avausjärjestys ja
 * kaksivaiheinen napautus sekä iPhonella että iPadilla.
 *
 * VÄITTEET:
 *   1. Logo näkyy vasemmalla, pilleri oikealla; hampurilainen ei näy
 *      iPhonella (≤560 px) mutta näkyy iPadilla.
 *   2. Pilleri avaa valikon, jonka osat ovat oikeassa järjestyksessä:
 *      Äänet, Kartta, uusi peli/ehdota, Linssit›/Aarteet›, pillerin
 *      tiedot, versio.
 *   3. Linssit›: näkymä vaihtuu, 1. napautus näyttää esikatselun
 *      vasemmalla ja rivi muuttuu Aktivoi-napiksi, 2. napautus
 *      aktivoi linssin ja sulkee valikon.
 *   4. Aarteet: otsikot (N/kaikki), 1. napautus näyttää esikatselun ja
 *      "Näytä", 2. napautus avaa kohteen koko ruudulle (tai julisteen
 *      galleriaan).
 *   5. Logo avaa tekijätiedot, joissa on tilannesivunappi.
 *   6. Valikko ja esikatselu mahtuvat ruudulle (ei ylivuotoa oikealle
 *      eikä vasemmalle).
 *   7. Ei sivuvirheitä.
 *
 *   node tools/savukkeet/savuke-pillerivalikko.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Avaa pelin annetussa ruutukoossa, käynnistää kehittäjätilan (jotta
 * linssejä ja aarteita on valmiiksi omistuksessa) ja väkisin siirtää
 * pelaajan toimintavaiheeseen omistuksin — sama kaava kuin
 * tools/savuke-mannerlento.mjs. Ulkopuolinen liikenne (ämpäri, kuvat)
 * katkaistaan: savuke mittaa asettelua ja vuorovaikutusta, ei
 * kuvasisältöä, eikä sen pidä riippua verkosta.
 */
async function avaaPeli(leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, serviceWorkers: 'block',
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem('matkakirja-kehittaja', '1'); } catch { /* yksityinen selaus */ }
  });
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForSelector('.start-btn', { timeout: 15000 });
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1200);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /valitse aloituskaupunki/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(800);
  // Pelitila suoraan toimintavaiheeseen, linssit ja julisteet omistukseen,
  // jotta Linssit- ja Aarteet-näkymissä on oikeasti rivejä mitattavaksi.
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const g = ui.game;
    const p = g.player;
    const kaupunkiId = g.pack.cities?.[0]?.id;
    if (kaupunkiId) {
      p.pos = { type: 'city', city: kaupunkiId };
      g.world.visited.add(kaupunkiId);
    }
    p.money = 2000;
    p.linssit = ['satelliitti', 'ihmisen-matka', 'radio', 'topografia', 'vesistot'];
    p.finds = ['star'];
    const mannerTypes = g.pack?.tokens?.mannerTypes;
    p.findManner = [mannerTypes ? Object.keys(mannerTypes)[0] : null];
    if (p.pos?.city) g.world.tokens.set(p.pos.city, 'star');
    const { JULISTEET } = await import('./js/packs/julisteet.js');
    g.julisteet = new Set(Object.keys(JULISTEET).slice(0, 2));
    g.phase = 'action';
    ui.render();
    // Saapumis- ja maalehtikortit pois tieltä: ne eivät kuulu tähän savukkeeseen.
    document.querySelectorAll('dialog[open]').forEach((d) => d.close());
    document.querySelectorAll('.postikortti, .kulttuuri-suurennos').forEach((e) => e.remove?.());
  });
  await sivu.waitForTimeout(400);
  return { ctx, sivu, virheet };
}

/** Elementin näkyvyys ja mitat yhdellä lukemalla. */
const mitat = (sivu, valitsin) => sivu.evaluate((v) => {
  const el = document.querySelector(v);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const t = getComputedStyle(el);
  return {
    nakyy: t.display !== 'none' && t.visibility !== 'hidden' && r.width > 0 && r.height > 0,
    x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
  };
}, valitsin);

/* ══════════════════════════════════════════════════════════════════ */
/* 1–2 ja 6–7: LOGO/PILLERI, VALIKON JÄRJESTYS, EI YLIVUOTOA, EI VIRHEITÄ */
/* ══════════════════════════════════════════════════════════════════ */
async function testaaAsetteluJaAvaus(nimi, leveys, korkeus, { hampurilainenNakyy }) {
  const { ctx, sivu, virheet } = await avaaPeli(leveys, korkeus);

  const logo = await mitat(sivu, '#brand-btn');
  const pilleri = await mitat(sivu, '#turn-pill');
  const hampurilainen = await mitat(sivu, '.valikko-kotelo');
  vaadi(`${nimi}: logo näkyy vasemmalla`, logo?.nakyy && logo.x < leveys / 2,
    JSON.stringify(logo));
  /*
   * PILLERIN PAIKKA RIIPPUU LEVEYDESTÄ (omistaja 29.9.2026): puhelimella
   * (≤560px) pilleri on ylärivin AINOA nappi ja siis oikeassa laidassa;
   * iPadilla "nykyinen palkki säilyy näköjään ennallaan" — pilleri jää
   * logon ja hampurilaisen VÄLIIN, ei ruudun oikeaan laitaan (hampurilainen
   * ja mahdollinen kehittäjän ratas ovat sen oikealla puolella).
   */
  vaadi(`${nimi}: pilleri näkyy logon jälkeen`,
    pilleri?.nakyy && logo?.nakyy && pilleri.x >= logo.x + logo.w - 2,
    JSON.stringify({ logo, pilleri }));
  if (leveys <= 560) {
    vaadi(`${nimi}: pilleri on ylärivin oikeassa laidassa (kapea ruutu)`,
      pilleri.x + pilleri.w > leveys / 2, JSON.stringify(pilleri));
  } else {
    vaadi(`${nimi}: pilleri jää logon ja hampurilaisen väliin (leveä ruutu)`,
      hampurilainen?.nakyy && pilleri.x + pilleri.w <= hampurilainen.x,
      JSON.stringify({ pilleri, hampurilainen }));
  }
  vaadi(`${nimi}: hampurilainen ${hampurilainenNakyy ? 'näkyy' : 'on piilossa'}`,
    Boolean(hampurilainen?.nakyy) === hampurilainenNakyy, JSON.stringify(hampurilainen));

  await sivu.click('#turn-pill');
  await sivu.waitForTimeout(350);
  const jarjestys = await sivu.evaluate(() => {
    const pv = document.getElementById('paavalikko');
    const paa = document.getElementById('pilleri-paanakyma');
    const osat = [...paa.children].map((el) => el.className || el.tagName);
    return { hidden: pv.hidden, osat, rect: pv.getBoundingClientRect() };
  });
  vaadi(`${nimi}: pilleri avaa valikon`, jarjestys.hidden === false, JSON.stringify(jarjestys));
  const idx = (osa) => jarjestys.osat.findIndex((o) => o.includes(osa));
  const jAanet = idx('kertoja-kotelo');
  const jKartta = idx('kartta-kotelo');
  const jAlarivi = idx('valikko-alarivi') === -1
    ? jarjestys.osat.findIndex((o) => o === 'valikko-alarivi') : idx('valikko-alarivi');
  const jPikanapit = idx('pilleri-pikanapit');
  const jTiedot = idx('pilleri-tiedot');
  const jPohja = idx('valikko-pohjarivi');
  vaadi(`${nimi}: valikon osat oikeassa järjestyksessä (Äänet, Kartta, …, Linssit/Aarteet, tiedot, versio)`,
    jAanet >= 0 && jAanet < jKartta && jKartta < jAlarivi && jAlarivi < jPikanapit
      && jPikanapit < jTiedot && jTiedot < jPohja,
    JSON.stringify(jarjestys.osat));
  vaadi(`${nimi}: valikko mahtuu ruudulle (ei ylivuotoa)`,
    jarjestys.rect.left >= 0 && jarjestys.rect.right <= leveys + 0.5,
    JSON.stringify(jarjestys.rect));

  vaadi(`${nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await testaaAsetteluJaAvaus('iPhone 393×852', 393, 852, { hampurilainenNakyy: false });
await testaaAsetteluJaAvaus('iPad 834×1194', 834, 1194, { hampurilainenNakyy: true });

/* ══════════════════════════════════════════════════════════════════ */
/* 3: LINSSIT — KAKSIVAIHEINEN NAPAUTUS                                */
/* ══════════════════════════════════════════════════════════════════ */
{
  const { ctx, sivu, virheet } = await avaaPeli(393, 852);
  await sivu.click('#turn-pill');
  await sivu.waitForTimeout(300);
  await sivu.click('#pilleri-linssit-btn');
  await sivu.waitForTimeout(300);

  // Toinen rivi eikä ensimmäinen: ensimmäinen on aina "Ei linssiä"
  // (data-id="null"), ja aktivointi sillä palauttaisi paljaan kartan
  // — tosi mutta ei osoita, että OIKEA linssi kytkeytyy.
  const RIVI = '#linssi-valikko .kokoelma-rivi:nth-of-type(2)';
  const ekaRivi = await sivu.evaluate((v) => {
    const rivi = document.querySelector(v);
    return rivi ? { id: rivi.dataset.id, teksti: rivi.textContent.trim() } : null;
  }, RIVI);
  vaadi('Linssit: listassa on vähintään kaksi riviä (Ei linssiä + yksi linssi)',
    Boolean(ekaRivi?.id), JSON.stringify(ekaRivi));

  await sivu.click(RIVI);
  await sivu.waitForTimeout(250);
  const ekaNapautus = await sivu.evaluate((v) => {
    const kortti = document.querySelector('#linssi-valikko .kokoelma-esikatselu');
    const rivi = document.querySelector(v);
    const r = kortti?.getBoundingClientRect();
    const rivinR = rivi?.getBoundingClientRect();
    return {
      esikatseluNakyy: Boolean(kortti) && !kortti.hidden,
      esikatseluVasemmalla: r ? r.x < window.innerWidth / 2 : null,
      onToiminto: /Aktivoi|Ota pois/.test(rivi?.textContent ?? ''),
      paavalikonSisalla: rivinR ? rivinR.x >= 0 : null,
    };
  }, RIVI);
  vaadi('Linssit: 1. napautus näyttää esikatselun vasemmalla',
    ekaNapautus.esikatseluNakyy && ekaNapautus.esikatseluVasemmalla, JSON.stringify(ekaNapautus));
  vaadi('Linssit: rivi muuttuu Aktivoi/Ota pois -napiksi', ekaNapautus.onToiminto,
    JSON.stringify(ekaNapautus));

  await sivu.click(RIVI);
  await sivu.waitForTimeout(350);
  const tokaNapautus = await sivu.evaluate(() => ({
    linssiValittu: window.matkakirja.ui.linssiValittu,
    valikkoKiinni: document.getElementById('paavalikko').hidden,
  }));
  vaadi('Linssit: 2. napautus aktivoi linssin', Boolean(tokaNapautus.linssiValittu),
    JSON.stringify(tokaNapautus));
  vaadi('Linssit: 2. napautus sulkee valikon', tokaNapautus.valikkoKiinni,
    JSON.stringify(tokaNapautus));

  vaadi('Linssit: ei sivuvirheitä', virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ══════════════════════════════════════════════════════════════════ */
/* 4: AARTEET — OTSIKOT, "NÄYTÄ" JA KOKO RUUTU                         */
/* ══════════════════════════════════════════════════════════════════ */
{
  const { ctx, sivu, virheet } = await avaaPeli(393, 852);
  await sivu.click('#turn-pill');
  await sivu.waitForTimeout(300);
  await sivu.click('#pilleri-aarteet-btn');
  await sivu.waitForTimeout(300);

  const otsikot = await sivu.evaluate(() => [...document.querySelectorAll(
    '#pilleri-aarteet-lista .kokoelma-otsikko',
  )].map((o) => o.textContent.trim()));
  vaadi('Aarteet: vähintään yksi otsikko N/kaikki-lukemalla',
    otsikot.length > 0 && otsikot.every((t) => /\d+\s*\/\s*\d+/.test(t)),
    JSON.stringify(otsikot));

  await sivu.click('#pilleri-aarteet-lista .kokoelma-rivi');
  await sivu.waitForTimeout(250);
  const ekaNapautus = await sivu.evaluate(() => {
    const kortti = document.querySelector('#pilleri-aarteet-lista .kokoelma-esikatselu');
    const rivi = document.querySelector('#pilleri-aarteet-lista .kokoelma-rivi');
    return {
      esikatseluNakyy: Boolean(kortti) && !kortti.hidden,
      naytaTeksti: /Näytä/.test(rivi?.textContent ?? ''),
    };
  });
  vaadi('Aarteet: 1. napautus näyttää esikatselun', ekaNapautus.esikatseluNakyy,
    JSON.stringify(ekaNapautus));
  vaadi('Aarteet: rivi muuttuu Näytä-napiksi', ekaNapautus.naytaTeksti, JSON.stringify(ekaNapautus));

  await sivu.click('#pilleri-aarteet-lista .kokoelma-rivi');
  await sivu.waitForTimeout(350);
  const kokoRuutu = await sivu.evaluate(() => ({
    aarreSuurennos: Boolean(document.querySelector('.aarre-suurennos')),
    julistegalleria: Boolean(document.querySelector('.julistegalleria')),
  }));
  vaadi('Aarteet: 2. napautus avaa kohteen koko ruudulle (aarre/tavara) tai galleriaan (juliste)',
    kokoRuutu.aarreSuurennos || kokoRuutu.julistegalleria, JSON.stringify(kokoRuutu));

  vaadi('Aarteet: ei sivuvirheitä', virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ══════════════════════════════════════════════════════════════════ */
/* 5: LOGO → TEKIJÄTIEDOT + TILANNESIVUNAPPI                           */
/* ══════════════════════════════════════════════════════════════════ */
{
  const { ctx, sivu, virheet } = await avaaPeli(393, 852);
  await sivu.click('#brand-btn');
  await sivu.waitForTimeout(250);
  const lahteet = await sivu.evaluate(() => {
    const d = document.getElementById('lahteet-dialog');
    const linkki = document.getElementById('lahteet-tilannesivu');
    return {
      auki: Boolean(d?.open),
      linkkiEnnenOtsikkoa: d && linkki
        ? [...d.querySelectorAll('a, h2')].indexOf(linkki)
          < [...d.querySelectorAll('a, h2')].indexOf(document.getElementById('lahteet-otsikko'))
        : false,
      href: linkki?.getAttribute('href'),
      target: linkki?.target,
    };
  });
  vaadi('Logo: tekijätiedot avautuvat', lahteet.auki, JSON.stringify(lahteet));
  vaadi('Logo: tilannesivunappi on ennen otsikkoa (yläreunassa)', lahteet.linkkiEnnenOtsikkoa,
    JSON.stringify(lahteet));
  vaadi('Logo: tilannesivunappi osoittaa projekti.html:ään uuteen välilehteen',
    lahteet.href === 'projekti.html' && lahteet.target === '_blank', JSON.stringify(lahteet));

  vaadi('Logo: ei sivuvirheitä', virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
