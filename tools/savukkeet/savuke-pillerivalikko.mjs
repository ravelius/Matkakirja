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
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
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

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: (process.env.SAVUKE_CHROMIUM_LIPUT ?? '').split(' ').filter(Boolean),
});

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
  /*
   * ÄMPÄRIN KUVAOSOITTEET (media.matkakirja.app) TÄYTETÄÄN PAIKALLISELLA
   * TESTIKUVALLA sen sijaan että ne katkaistaisiin muun ulkopuolisen
   * liikenteen mukana (korjaus 29.9.2026 illalla, item 1: img.complete/
   * naturalWidth-väitteet vaativat OIKEAN kuvanlatauksen läpi asetaKuva-
   * putken). Rekisteröity abort-säännön JÄLKEEN, joten Playwright
   * kokeilee tätä tarkempaa sääntöä ensin eikä savuke silti riipu
   * oikeasta verkosta. Sama reitti kelpaa mille tahansa ämpärikuvalle,
   * koska testi ei väitä mitään KUVAN SISÄLLÖSTÄ, vain siitä että
   * <img> latautuu onnistuneesti eikä jää rikki.
   */
  const testikuva = readFileSync(join(JUURI, 'assets/aarteet/aarre-europe-star.jpg'));
  await sivu.route('https://media.matkakirja.app/**', (r) => r.fulfill({
    status: 200, contentType: 'image/jpeg', body: testikuva,
  }));
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
    const kaupungit = g.pack.cities ?? [];
    const kaupunkiId = kaupungit[0]?.id;
    if (kaupunkiId) {
      p.pos = { type: 'city', city: kaupunkiId };
      g.world.visited.add(kaupunkiId);
    }
    p.money = 2000;
    p.linssit = ['satelliitti', 'ihmisen-matka', 'radio', 'topografia', 'vesistot'];
    /*
     * AARTEET PELIN OMILLA API:LLA, EI KÄSIN TÄYTETTYINÄ TAULUKKOINA
     * (omistajan tilaus 29.9.2026: "Aarteisiin oikeaa sisältöä pelin
     * omien API:en kautta: ... game.world.starsFound oikein täytettynä
     * ... p.finds + findManner/findMaa"). g.revealToken(cityId) hoitaa
     * kaikki kirjaukset kerralla (p.finds, findManner, findMaa,
     * starsFound) — sama kutsu kuin tools/savuke-mannerlento.mjs
     * käyttää. Kaksi ERI kaupunkia: yksi tähtilaatta (Aarnin luettelo)
     * ja yksi tavallinen aarre (Tavarat).
     *
     * g.pack ON TÄSSÄ VAIHEESSA VIELÄ 'maailma' (lähtökaupunkilauta,
     * ks. js/packs/maailma.js: "tällä laudalla ei pelata") EIKÄ
     * oikea mannerkartta (maailmankartta.js) — kirjaaLoytopaikka ei
     * siis löydä cityManner/cityCountry-tietoa näille kaupungeille
     * (findManner/findMaa jäävät nulliksi). Tähtilaatta saa silti
     * OIKEAN paikallisen kuvan, koska 'maailma'-laudalla on oma
     * star-kuva (aarre-maailma-star.jpg). Tavaralla ei ole vastaavaa
     * yleiskuvaa (js/tokens.js TOKEN_TYPES.pieniAarre ei sisällä
     * kuva-kenttää), joten sille asetetaan jälkikäteen oikea
     * ISO3-maakoodi (FIN) — game.aarreMantereella yhdistää silloin
     * paikallisaarteen (js/packs/paikallisaarteet.js) kuvan riippumatta
     * laudasta, aivan kuten oikeassa pelissä sen jälkeen kun pelaaja on
     * siirtynyt Suomeen. Yhä sama pelin oma API (revealToken), vain
     * kirjattu maa korjattu vastaamaan sitä mitä oikea peluu antaisi.
     */
    const tahtiKaupunki = kaupungit[0]?.id;
    const tavaraKaupunki = kaupungit.find((k) => k.id !== tahtiKaupunki)?.id;
    if (tahtiKaupunki) {
      g.world.tokens.set(tahtiKaupunki, 'star');
      g.revealToken(tahtiKaupunki);
    }
    if (tavaraKaupunki) {
      g.world.tokens.set(tavaraKaupunki, 'pieniAarre');
      g.revealToken(tavaraKaupunki);
      p.findMaa[p.findMaa.length - 1] = 'FIN';
    }
    /*
     * RAHASUMMA UUDELLEEN KIINTEÄKSI revealToken-KUTSUJEN JÄLKEEN.
     * revealToken palkitsee löydöistä satunnaisen summan (p.money +=
     * STAR_PRIZE / arvo, js/game.js), joka ylikirjoittaa yllä asetetun
     * 2000:n — ilman tätä pillerin teksti ("N £ · Päivä 1, aamu") ja
     * siis LEVEYS vaihtelisi ajosta toiseen, ja "pilleri mahtuu
     * ruudulle" -väite olisi satunnaisesti läppäilevä (havaittu
     * koordinaattorin toisella kierroksella 29.9.2026: sama pilleri
     * näytti kolmella ajolla kolme eri leveyttä, 179–189 px).
     */
    p.money = 2000;
    const { JULISTEET } = await import('./js/packs/julisteet.js');
    g.julisteet = new Set(Object.keys(JULISTEET).slice(0, 2));
    g.phase = 'action';
    ui.render();
    // Saapumis- ja maalehtikortit pois tieltä: ne eivät kuulu tähän savukkeeseen.
    document.querySelectorAll('dialog[open]').forEach((d) => d.close());
    document.querySelectorAll('.postikortti, .kulttuuri-suurennos').forEach((e) => e.remove?.());
  });
  await sivu.waitForTimeout(400);
  /*
   * FONTIT VALMIIKSI ENNEN MITTAUSTA. Ilman tätä pillerin (ja logon)
   * teksti saattoi mitata hetkellisesti varafontilla (selaimen oma,
   * ennen @font-face-latauksen valmistumista) — leveys vaihteli
   * ajosta toiseen (havaittu koordinaattorin toisella kierroksella
   * 29.9.2026, "pilleri mahtuu ruudulle" läppäili 191/186/179/189 px
   * VAIKKA rahasumma oli jo kiinnitetty). document.fonts.ready
   * poistaa tämän: mittaus tapahtuu aina lopullisella fontilla.
   */
  await sivu.evaluate(() => document.fonts.ready);
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

/*
 * NAHKAINEN YLÄPALKKI (omistaja 29.9.2026: "Hyväksyn, madalletaan").
 * Apurit tälle savukkeelle: taustakuvan osoite, kuvien lataus (fetch
 * 200), keskivyöhykkeen ylivuoto ja pillerin tekstin kontrasti
 * OIKEASTI MITATTUNA renderöidystä pikselistä (ei vain CSS:n
 * väriarvoista laskettuna) — border-image-9-slice ei näy DOMissa
 * yksikkötestille, joten tämä on ainoa paikka, jossa se todella
 * todennetaan.
 */

/** WCAG-kontrastisuhde kahden {r,g,b}-värin välillä (0-255). */
function kontrastisuhde(a, b) {
  const lum = ({ r, g, b: bl }) => {
    const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Pillerin TAUSTAN keskimääräinen väri renderöidystä ruudusta, teksti
 * ja kuvake väliaikaisesti piilotettuina (muuten näyte sekoittaisi
 * tekstin ja taustan pikselit). Näyte otetaan pillerin keskialueelta
 * (25-75 % leveydestä, 35-65 % korkeudesta) — pyöreät päät ja
 * kohokuvan reunavalo/-varjo jäävät ulos, koska juuri siihen tekstit
 * oikeasti piirtyvät.
 */
async function pillerinTaustaVari(sivu) {
  const piilotetut = await sivu.evaluate(() => {
    const pilleri = document.getElementById('turn-pill');
    const lapset = [...pilleri.children];
    const vanhat = lapset.map((el) => el.style.visibility);
    lapset.forEach((el) => { el.style.visibility = 'hidden'; });
    return vanhat.length;
  });
  const kuva = await sivu.locator('#turn-pill').screenshot();
  await sivu.evaluate(() => {
    document.getElementById('turn-pill').querySelectorAll(':scope > *')
      .forEach((el) => { el.style.visibility = ''; });
  });
  const b64 = kuva.toString('base64');
  const vari = await sivu.evaluate(async (data) => {
    const img = new Image();
    img.src = `data:image/png;base64,${data}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const x0 = Math.round(c.width * 0.25); const x1 = Math.max(x0 + 1, Math.round(c.width * 0.75));
    const y0 = Math.round(c.height * 0.35); const y1 = Math.max(y0 + 1, Math.round(c.height * 0.65));
    const id = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
    let r = 0; let g = 0; let b = 0; let n = 0;
    for (let i = 0; i < id.length; i += 4) { r += id[i]; g += id[i + 1]; b += id[i + 2]; n += 1; }
    return { r: r / n, g: g / n, b: b / n };
  }, b64);
  return { vari, piilotettuja: piilotetut };
}

/** Tekstin väri CSS:stä (rgb(...) → {r,g,b}). */
const tekstinVari = (sivu, valitsin) => sivu.evaluate((v) => {
  const el = document.querySelector(v);
  if (!el) return null;
  const m = getComputedStyle(el).color.match(/[\d.]+/g);
  return m ? { r: Number(m[0]), g: Number(m[1]), b: Number(m[2]) } : null;
}, valitsin);

/** Elementin haetun kuvan/taustan HTTP-tila (fetch, sama origin). */
const kuvaLataantuu = (sivu, osoite) => sivu.evaluate(async (u) => {
  try { const r = await fetch(u); return r.status; } catch { return 0; }
}, osoite);

/* ══════════════════════════════════════════════════════════════════ */
/* 1–2 ja 6–7: LOGO/PILLERI, VALIKON JÄRJESTYS, EI YLIVUOTOA, EI VIRHEITÄ */
/* ══════════════════════════════════════════════════════════════════ */
async function testaaAsetteluJaAvaus(nimi, leveys, korkeus, { hampurilainenNakyy, onNahka = false }) {
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

  /*
   * NAHKAINEN YLÄPALKKI, VAIN PUHELIMELLA (omistaja 29.9.2026: "Hyväksyn,
   * madalletaan" — Codexin matkalaukkunahka-kooste). iPadilla palkki
   * pysyy ennallaan (ei nahkaa, css/styles.css @media max-width:560px);
   * sama savuke todentaa molemmat puolet omalla `onNahka`-lipullaan.
   */
  const topbarTausta = await sivu.evaluate(
    () => getComputedStyle(document.querySelector('.topbar')).backgroundImage,
  );
  if (onNahka) {
    vaadi(`${nimi}: yläpalkin tausta on nahkakuva`,
      topbarTausta.includes('assets/ylapalkki/nahka.jpg'), topbarTausta);

    // KUVAT LATAUTUVAT (fetch 200) — nahka, keskitummennus, logon ja
    // pillerin kohopainatukset. content:url()-vaihdon ja border-imagen
    // takia naturalWidth ei luotettavasti näytä UUTTA kuvaa, joten
    // testi hakee osoitteet itse samalta palvelimelta.
    const [nahkaTila, varjoTila, logoTila, pilleriTila] = await Promise.all([
      kuvaLataantuu(sivu, '/assets/ylapalkki/nahka.jpg'),
      kuvaLataantuu(sivu, '/assets/ylapalkki/keski-varjo.png'),
      kuvaLataantuu(sivu, '/assets/ylapalkki/logo-emboss.png'),
      kuvaLataantuu(sivu, '/assets/ylapalkki/pilleri-emboss.png'),
    ]);
    vaadi(`${nimi}: nahka.jpg latautuu (200)`, nahkaTila === 200, String(nahkaTila));
    vaadi(`${nimi}: keski-varjo.png latautuu (200)`, varjoTila === 200, String(varjoTila));
    const logoSisalto = await sivu.evaluate(
      () => getComputedStyle(document.querySelector('.brand-kuva')).content,
    );
    vaadi(`${nimi}: logon kohokuva on käytössä (CSS content)`,
      logoSisalto.includes('assets/ylapalkki/logo-emboss.png'), logoSisalto);
    vaadi(`${nimi}: logo-emboss.png latautuu (200)`, logoTila === 200, String(logoTila));
    vaadi(`${nimi}: pilleri-emboss.png latautuu (200)`, pilleriTila === 200, String(pilleriTila));

    /*
     * KESKIVYÖHYKE EI KOSKE WEBIÄ (koordinaattori 29.9.2026, korjaus
     * ensimmäisen kierroksen jälkeen): Codexin manifest.json:n
     * centerSafeArea (385-905/1290) on mitoitettu NATIIVIN Dynamic
     * Island -saarelle, joka nousee palkin PÄÄLLE. Webin PWA-palkki
     * alkaa vasta saaren ALAPUOLELTA — juuren padding-top on
     * env(safe-area-inset-top), joten .topbar ei koskaan mene saaren
     * kohdalle eikä keskivyöhykkeellä ole webissä samaa merkitystä.
     * Aiempi versio vaati pillerin pysyvän vyöhykkeen ulkopuolella,
     * mikä EI koskaan toteudu pillerin nykyisellä sisällöllä (kuvake +
     * rahat + "Päivä N, vuorokaudenaika" — sovittu natiivin kanssa,
     * ei lyhennetä). Tilalla kolme oikeaa web-vaatimusta: logo ja
     * pilleri eivät mene päällekkäin, väliä on vähintään 8 px, ja
     * molemmat mahtuvat ruudulle (ei ylivuotoa vasemmalle eikä
     * oikealle) — testattu sekä 393 että 360 px:llä.
     */
    const vali = pilleri.x - (logo.x + logo.w);
    vaadi(`${nimi}: logo ja pilleri eivät mene päällekkäin`,
      vali >= 0, `logon oikea reuna ${logo.x + logo.w}, pillerin vasen reuna ${pilleri.x}`);
    vaadi(`${nimi}: logon ja pillerin väli on vähintään 8 px`,
      vali >= 8, `väli ${vali.toFixed(1)} px`);
    vaadi(`${nimi}: logo mahtuu ruudulle`,
      logo.x >= 0 && logo.x + logo.w <= leveys, JSON.stringify(logo));
    vaadi(`${nimi}: pilleri mahtuu ruudulle`,
      pilleri.x >= 0 && pilleri.x + pilleri.w <= leveys, JSON.stringify(pilleri));

    /*
     * PALKIN KORKEUS EI KASVA (omistajan ehto: "käytä nykyistä palkin
     * korkeutta"). Perusarvo mitattu origin/pelikoodari-pillerivalikko-
     * haarasta ENNEN nahkaa (sama Chromium-ajuri, sama leveys, sama
     * pelitila kuin tässä savukkeessa — pilleri täytettynä oikeilla
     * teksteillä, EI tyhjä aloitusruutu, joka näyttäisi virheellisesti
     * pienemmän luvun): 53 px sekä 393 että 360 px:n leveydellä,
     * 29.9.2026. Sieto ±1 px pyöristyksille.
     */
    const topbarMitat = await mitat(sivu, '.topbar');
    vaadi(`${nimi}: palkin korkeus ei kasva (perusarvo 53 px)`,
      topbarMitat?.h != null && Math.abs(topbarMitat.h - 53) <= 1,
      JSON.stringify(topbarMitat));

    /*
     * PILLERIN TEKSTIN KONTRASTI ≥ 4.5:1 (WCAG AA), mitattuna OIKEASTA
     * renderöidystä pikselistä (pillerinTaustaVari yllä) eikä vain
     * CSS-muuttujista laskettuna — border-image-9-slice ei näy DOMin
     * väriarvoissa.
     */
    const [tausta, teksti] = await Promise.all([
      pillerinTaustaVari(sivu),
      tekstinVari(sivu, '.turn-pill .kassa'),
    ]);
    const kontrasti = teksti ? kontrastisuhde(tausta.vari, teksti) : 0;
    vaadi(`${nimi}: pillerin tekstin kontrasti ≥ 4.5:1`,
      kontrasti >= 4.5,
      `kontrasti ${kontrasti.toFixed(2)} (tausta ${JSON.stringify(tausta.vari)}, teksti ${JSON.stringify(teksti)})`);
  } else {
    vaadi(`${nimi}: yläpalkissa EI ole nahkaa (iPad ennallaan)`,
      !topbarTausta.includes('assets/ylapalkki'), topbarTausta);
  }

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

  /*
   * "LAUKKU HERÄÄ ELOON" -ANIMAATIO EI SAA MENNÄ LOGON PÄÄLLE EIKÄ
   * RUUDUN YLÄREUNAN YLI (omistaja 29.9.2026, kolmas kierros: FAIL
   * "pilleri x137 y-11 w245 h78" iPadilla — EI kaksirivinen sisältö
   * (.turn-pill on aina white-space: nowrap), vaan .laukku-elo-
   * animaation (css/styles.css, rotate+scale) bounding box kesken
   * heilahduksen: rotate(±7deg)+scale(1.14) keskipivotilla työnsi
   * vasenta reunaa n. 17 px logon alueelle ja yläreunaa n. 11 px
   * topbarin/ruudun yli. Suljetaan valikko ensin (pilleri jäisi sen
   * taakse), käynnistetään animaatio OIKEALLA pelin metodilla
   * (ui.elavoitaLaukku) ja mitataan koko 0,9 s:n kesto tiheästi — yksi
   * satunnainen hetki ei riitä, koska pahin arvo osuu vain murto-
   * osaan animaatiosta.
   */
  await sivu.click('#turn-pill');
  await sivu.waitForTimeout(300);
  await sivu.evaluate(() => window.matkakirja.ui.elavoitaLaukku());
  let pahinVasen = -Infinity;
  let pahinYlos = -Infinity;
  for (let i = 0; i < 36; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(25);
    // eslint-disable-next-line no-await-in-loop
    const m = await sivu.evaluate(() => {
      const l = document.getElementById('brand-btn').getBoundingClientRect();
      const p = document.getElementById('turn-pill').getBoundingClientRect();
      return { vasen: l.x + l.width - p.x, ylos: -p.y };
    });
    pahinVasen = Math.max(pahinVasen, m.vasen);
    pahinYlos = Math.max(pahinYlos, m.ylos);
  }
  vaadi(`${nimi}: laukku-elo-animaatio ei mene logon päälle (koko 0,9 s tiheästi mitattuna)`,
    pahinVasen < 0, `pahin päällekkäisyys ${pahinVasen.toFixed(1)} px`);
  vaadi(`${nimi}: laukku-elo-animaatio ei mene ruudun yläreunan yli`,
    pahinYlos <= 2, `pahin ylitys ${pahinYlos.toFixed(1)} px`);

  vaadi(`${nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await testaaAsetteluJaAvaus('iPhone 393×852', 393, 852, { hampurilainenNakyy: false, onNahka: true });
await testaaAsetteluJaAvaus('iPad 834×1194', 834, 1194, { hampurilainenNakyy: true, onNahka: false });
await testaaAsetteluJaAvaus('Kapein 360×740', 360, 740, { hampurilainenNakyy: false, onNahka: true });

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

  /*
   * NIMI EI KATKEA VAAKASUUNNASSA (omistajan korjauspyyntö 29.9.2026,
   * toinen kierros: "Vertailulinssi (ke…" katkesi, vaikka paneelin
   * oikea puoli oli tyhjä — rivi oli vain n. 150 px leveä, koska
   * ruudukko varasi tilan esikatselulle vaikka sitä ei näytetty).
   * `scrollWidth > clientWidth` paljastaisi vaakaylivuodon (rivi
   * yrittää olla oikeaa leveämpi); `-webkit-line-clamp: 2` sallii
   * pystysuuntaisen kahden rivin rivityksen sen sijaan.
   */
  const linssiNimetEivatKatkea = await sivu.evaluate(() => [
    ...document.querySelectorAll('#linssi-valikko .kokoelma-rivi-nimi'),
  ].every((el) => el.scrollWidth <= el.clientWidth + 1));
  vaadi('Linssit: rivin nimi ei katkea vaakasuunnassa (scrollWidth ≤ clientWidth)',
    linssiNimetEivatKatkea, String(linssiNimetEivatKatkea));

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

  /*
   * OTSIKON LUKEMA: Aarnin luettelo ja Julisteet näyttävät "N / kaikki"
   * (kiinteä kokonaismäärä), mutta Tavaroilla ei ole ylärajaa — sen
   * otsikko on aina pelkkä lukumäärä (js/ui.js renderPilleriAarteet:
   * `luku: \`${tavaraRivit.length}\``). Nimi ja luku luetaan erikseen
   * DOMista (.kokoelma-otsikko-nimi/-luku), koska pelkkä textContent
   * liittäisi ne yhteen ilman välilyöntiä ("Tavarat1").
   */
  const otsikot = await sivu.evaluate(() => [...document.querySelectorAll(
    '#pilleri-aarteet-lista .kokoelma-otsikko',
  )].map((o) => ({
    nimi: o.querySelector('.kokoelma-otsikko-nimi')?.textContent.trim() ?? '',
    luku: o.querySelector('.kokoelma-otsikko-luku')?.textContent.trim() ?? '',
  })));
  vaadi('Aarteet: otsikoissa on lukema (Aarnin luettelo/Julisteet N/kaikki, Tavarat pelkkä N)',
    otsikot.length > 0 && otsikot.every((o) => (o.nimi === 'Tavarat'
      ? /^\d+$/.test(o.luku) : /\d+\s*\/\s*\d+/.test(o.luku))),
    JSON.stringify(otsikot));

  /*
   * OTSIKKO YHDELLÄ RIVILLÄ (omistajan korjauspyyntö 29.9.2026, toinen
   * kierros: "AARNIN LUETTELO 1 / 8" rivittyi kahdelle riville kapeassa
   * sarakkeessa). Otsikkorivin korkeus on yhden rivin korkuinen, jos se
   * ei ole rivittynyt — mitataan lukemalla laatikon korkeus ja
   * vertaamalla fontin riviväliin (rivitys näkyisi selvästi yli
   * kaksinkertaisena korkeutena).
   */
  const otsikkoYhdellaRivilla = await sivu.evaluate(() => {
    const el = document.querySelector('#pilleri-aarteet-lista .kokoelma-otsikko');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const rivikorkeus = parseFloat(getComputedStyle(el).fontSize) * 1.6;
    return { korkeus: r.height, rivikorkeus, yhdellaRivilla: r.height <= rivikorkeus * 1.5 };
  });
  vaadi('Aarteet: otsikko ("N / kaikki") pysyy yhdellä rivillä',
    Boolean(otsikkoYhdellaRivilla?.yhdellaRivilla), JSON.stringify(otsikkoYhdellaRivilla));

  /*
   * NIMI EI KATKEA VAAKASUUNNASSA, ei myöskään Aarteet-listassa (sama
   * korjaus kuin Linsseissä yllä — molemmat käyttävät samaa
   * js/kokoelmanakyma.js-piirrintä).
   */
  const aarreNimetEivatKatkea = await sivu.evaluate(() => [
    ...document.querySelectorAll('#pilleri-aarteet-lista .kokoelma-rivi-nimi'),
  ].every((el) => el.scrollWidth <= el.clientWidth + 1));
  vaadi('Aarteet: rivin nimi ei katkea vaakasuunnassa (scrollWidth ≤ clientWidth)',
    aarreNimetEivatKatkea, String(aarreNimetEivatKatkea));

  /*
   * KUVIEN EHJYYS RIVEILLÄ JA ESIKATSELUSSA (omistajan korjauspyyntö
   * 29.9.2026 illalla, kuva pillerivalikko-d: Julisteiden pikkukuvat
   * ja esikatselu näkyivät rikkinäisinä). Käydään läpi kaikki kolme
   * ryhmää (Aarnin luettelo, Tavarat, Julisteet): rivin OMA <img> ja
   * 1. napautuksen jälkeen esikatselun <img> molemmat todella
   * latautuivat (img.complete && naturalWidth > 0), ei vain että
   * elementti on olemassa.
   */
  const ryhmat = [
    ['aarre:', 'Aarnin luettelo'],
    ['tavara:', 'Tavarat'],
    ['juliste:', 'Julisteet'],
  ];
  for (const [etuliite, nimi] of ryhmat) {
    const rivi = `#pilleri-aarteet-lista .kokoelma-rivi[data-id^="${etuliite}"]`;
    const onRivi = await sivu.evaluate((v) => Boolean(document.querySelector(v)), rivi);
    if (!onRivi) {
      vaadi(`Aarteet ${nimi}: rivi löytyy testattavaksi`, false, 'ei rivejä — aineisto puuttuu avaaPeli-tilasta');
      continue;
    }
    await sivu.waitForTimeout(300); // rivikuvien lataus (asetaKuva)
    const rivinKuva = await sivu.evaluate((v) => {
      const img = document.querySelector(`${v} img`);
      return img
        ? { onImg: true, complete: img.complete, naturalWidth: img.naturalWidth, src: img.src }
        : { onImg: false };
    }, rivi);
    vaadi(`Aarteet ${nimi}: rivin pikkukuva latautuu (ei rikkinäinen)`,
      rivinKuva.onImg && rivinKuva.complete && rivinKuva.naturalWidth > 0, JSON.stringify(rivinKuva));

    await sivu.click(rivi);
    await sivu.waitForTimeout(300);
    const esikatselunKuva = await sivu.evaluate(() => {
      const img = document.querySelector('#pilleri-aarteet-lista .kokoelma-esikatselu img');
      return img
        ? { onImg: true, complete: img.complete, naturalWidth: img.naturalWidth, src: img.src }
        : { onImg: false };
    });
    vaadi(`Aarteet ${nimi}: esikatselun kuva latautuu (ei rikkinäinen)`,
      esikatselunKuva.onImg && esikatselunKuva.complete && esikatselunKuva.naturalWidth > 0,
      JSON.stringify(esikatselunKuva));
  }

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
