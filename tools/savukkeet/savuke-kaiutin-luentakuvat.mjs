/*
 * Savuke: KAIUTIN VU-MITTARIKSI SAMALLE RIVILLE, LUENTAKUVAT PAKAKSI.
 *
 * Omistaja 15.9.2026 klo 05.10 UTC, iPhone-kuva Dubrovnikin
 * saapumisluennasta, sanatarkasti:
 *   *"Tasaa kaiutin symboli tekstin kanssa samalle riville. Ja onko
 *   mahdollista animoida kaiuttimen kolmea kaarta elamaan Vu mittarin
 *   tapaan ja ottaa feidaus animaatio siita pois? Ota isoisan ja pulun
 *   valokuvista haivytykset pois ja lado ne hieman vinottain toistensa
 *   paalle vuorotellen vasemmalle ja oikealle kallistettuina. Pida
 *   kartta pehmennettyna ja tummennettuna."*
 *
 * VARTIOT:
 *   1. SAMA RIVI: kaiutinkuvakkeen keskilinja = otsikon ensimmäisen
 *      rivin keskilinja ±1 px, molemmilla ruuduilla.
 *   2. VU-MITTARI SEURAA PUHETTA (tiukennettu 15.9.2026, omistaja:
 *      *"Kajutin kuvake elaa, mutta se ei ela puheen tahdissa."*):
 *      kolme kaarta ovat omia polkujaan, luenta on reititetty Web
 *      Audioon (luennanVahvistin + aaniMittari) ja mittarin lähde on
 *      `mitattu` — EI ajastettu kuvio. Pelkkä "tila vaihtuu" ei enää
 *      riitä: ajastettu kuvio läpäisi sen, ja juuri se oli vika.
 *   3. KOKO KUVAKKEEN SYKE ON POISSA: napilla ei ole animaatiota.
 *   4. HÄIVYTYS POIS: isojen luentakuvien mask-image on `none`.
 *   5. PAKKA VINOON: kortteja on useampi yhtä aikaa ruudulla ja
 *      niiden kiertokulmat vuorottelevat eri etumerkillä.
 *   6. KARTTA ENNALLAAN: luennan hunnun sumennus ja peite mitataan ja
 *      raportoidaan (linjaus ei muutu).
 *
 * TEKSTIT PIILOON KAIKILLA LAITTEILLA (omistaja 15.9.2026, lisätty
 * tähän savukkeeseen samana päivänä): vartiot 7–12 ja oma vastakokeensa
 * mittaavat luennan aikaisen tekstipiilon kolmella ruudulla (390 × 844,
 * 1024 × 1366 iPad, 1400 × 900) — ks. osio alempana.
 *
 *   13. KAARET SEURAAVAT AMPLITUDIVERHOKÄYRÄÄ (eristetty mittaus,
 *       oma osionsa alempana): kaarien tilasarja 50 ms:n välein vs.
 *       saman äänitiedoston RMS-verhokäyrä → Pearson-korrelaatio yli
 *       0,6, ja jokainen yli 150 ms:n tauko näkyy kaaret sammuksissa
 *       (100 ms:n armonaika taukojakson alussa, release-vakio).
 *
 * VASTAKOKEET:
 *   – mittari pysäytetään pakolla → kaarien tila ei enää vaihdu →
 *     vartio 2 kääntyy punaiseksi;
 *   – ajastettu kuvio pakotetaan päälle → korrelaatio romahtaa ~0:aan
 *     ja tauot palavat → vartio 13 kääntyisi punaiseksi;
 *   – gain nollaan → kaikki kaaret sammuvat koko ajaksi.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kaiutin-luentakuvat.mjs [kuvakansio]
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

// Omistajan kuva on Dubrovnikista; sillä on isoisän kaksi luentakuvaa
// ja pulun omat kuvat, eli koko pakka.
const KAUPUNKI = 'dubrovnik';
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

/* Ensimmäisen luennan osoite talteen eristettyä mittausta varten. */
let AANIOSOITE = null;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  // Ilman tätä Chromium ei päästä <audio>-elementtiä soimaan ilman
  // elettä, eikä analysaattorilla olisi mitään mitattavaa.
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const virheet = [];

/** Avaa pelin ja saapuu koekaupunkiin. */
async function avaaAjo(viewport) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const cdp = await ctx.newCDPSession(sivu);
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(4000);
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
  }, KAUPUNKI);
  return { ctx, sivu, cdp };
}

/** Kaarien tila merkkijonona, esim. "110" = kaksi alinta palaa. */
const KAARINAYTE = `(() => {
  const kaaret = [...document.querySelectorAll('#fact-kuuntele .kaiutin-kaari')];
  return {
    tila: kaaret.map((k) => (k.classList.contains('palaa') ? '1' : '0')).join(''),
    opacity: kaaret.map((k) => getComputedStyle(k).opacity).join('/'),
    maara: kaaret.length,
  };
})()`;

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${ruutu.nimi} ${ruutu.width}x${ruutu.height} ===`);
  const { ctx, sivu, cdp } = await avaaAjo({ width: ruutu.width, height: ruutu.height });

  // 1–3. KAIUTIN: sama rivi ja VU-mittari. Odotetaan kertojan vuoroa.
  const kertoja = await sivu.waitForFunction(
    () => document.body.classList.contains('kertoja-aanessa'), null, { timeout: 60000 },
  ).then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: isoisän luenta alkaa (kertoja-aanessa)`, kertoja);

  const rivi = await sivu.evaluate(() => {
    const h2 = document.querySelector('.fact-card h2');
    const svg = document.querySelector('#fact-kuuntele svg');
    if (!h2 || !svg) return null;
    const alue = document.createRange();
    alue.selectNodeContents(h2);
    const rivit = [...alue.getClientRects()].filter((r) => r.height > 1);
    if (!rivit.length) return null;
    const eka = rivit[0];
    const kuva = svg.getBoundingClientRect();
    return {
      teksti: h2.textContent.trim(),
      tekstiKeski: eka.top + eka.height / 2,
      kuvakeKeski: kuva.top + kuva.height / 2,
      rivienMaara: rivit.length,
      napinNakyy: !document.getElementById('fact-kuuntele').hidden,
    };
  });
  tieto(`${ruutu.nimi} otsikkorivi`, JSON.stringify(rivi));
  const ero = rivi ? Math.abs(rivi.tekstiKeski - rivi.kuvakeKeski) : 999;
  vaadi(`${ruutu.nimi}: kuvakkeen ja tekstin keskilinjat ±1 px`,
    Boolean(rivi) && rivi.napinNakyy && ero <= 1, `ero ${ero.toFixed(2)} px`);

  /*
   * NÄYTTEITÄ USEAMPI KUIN KOLME. Mittari seuraa nyt oikeaa puhetta,
   * ja isoisällä on lauseiden välissä useamman sekunnin taukoja —
   * kolme näytettä 320 ms:n välein voisi osua kokonaan tauon sisään ja
   * antaa perusteettoman punaisen. Kolme sekuntia kattaa varmasti
   * sekä puhetta että taukoa.
   */
  const naytteet = [];
  for (let i = 0; i < 12; i += 1) {
    naytteet.push(await sivu.evaluate(KAARINAYTE));
    if (i < 11) await sivu.waitForTimeout(250);
  }
  const tilat = naytteet.map((n) => n.tila);
  tieto(`${ruutu.nimi} kaarien tilat (12 hetkeä, 250 ms välein)`,
    `${tilat.join(' → ')}  opacity ${naytteet.at(-1).opacity}`);
  vaadi(`${ruutu.nimi}: kaaria on kolme omana polkunaan`, naytteet[0].maara === 3,
    `kaaria ${naytteet[0].maara}`);
  vaadi(`${ruutu.nimi}: VU-mittari elää (vähintään kaksi eri tilaa)`,
    new Set(tilat).size >= 2, tilat.join(' → '));

  /*
   * TIUKENNUS 15.9.2026. Edellinen ehto ("vähintään kaksi eri tilaa")
   * oli väljä: ajastettu kuvio läpäisi sen, ja juuri sen omistaja näki
   * iPhonella. Nyt vaaditaan, että luenta on REITITETTY Web Audioon ja
   * että mittarin lähde on `mitattu`.
   */
  const reitti = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const s = await import('/js/sound.js');
    const m = await import('/js/kaiutinmittari.js');
    const a = ui.diaryVoice;
    return {
      ctx: s.sfx?.ctx?.state ?? 'ei kontekstia',
      crossOrigin: a?.crossOrigin ?? null,
      vahvistin: Boolean(a?.luennanVahvistin),
      gain: a?.luennanVahvistin?.gain?.value ?? null,
      mittari: Boolean(a?.aaniMittari),
      lahde: m.kaiutinmittarinLahde(),
      src: a?.src ?? null,
    };
  });
  if (!AANIOSOITE && reitti.src) AANIOSOITE = reitti.src;
  tieto(`${ruutu.nimi} luennan äänireitti`, JSON.stringify({ ...reitti, src: undefined }));
  vaadi(`${ruutu.nimi}: luenta kulkee Web Audion läpi (vahvistin + analysaattori)`,
    reitti.vahvistin && reitti.mittari && reitti.crossOrigin === 'anonymous',
    JSON.stringify(reitti));
  vaadi(`${ruutu.nimi}: mittarin lähde on MITATTU, ei ajastettu kuvio`,
    reitti.lahde === 'mitattu', String(reitti.lahde));

  const syke = await sivu.evaluate(() => {
    const nappi = document.getElementById('fact-kuuntele');
    const t = getComputedStyle(nappi);
    return { animation: t.animationName, transform: t.transform, opacity: t.opacity };
  });
  tieto(`${ruutu.nimi} napin oma animaatio`, JSON.stringify(syke));
  vaadi(`${ruutu.nimi}: koko kuvakkeen syke on poissa`,
    syke.animation === 'none', syke.animation);

  // 4–6. LUENTAKUVAT: häivytys pois, pakka vinoon, kartta ennallaan.
  /*
   * Kolmas kortti on ensimmäinen PuluCam-kuva: vasta sillä nähdään,
   * että kallistus vuorottelee myös isoisän kahden kuvan jälkeen. Sitä
   * ei kuitenkaan VAADITA — kolmas kortti tulee vasta noin 31 s
   * kohdalla, ja kuormitetulla koneella luennan kellot venyvät
   * (mitattu: rinnakkainen savukeajo jätti työpöytäruudulle yhden
   * kortin 90 sekunnissa). Vartio tarkistaa vuorottelun sillä määrällä,
   * joka ehti ruudulle, ja kaksi korttia riittää.
   */
  await sivu.waitForFunction(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length >= 3,
    null, { timeout: 120000 },
  ).catch(() => {});
  const kuvat = await sivu.evaluate(() => {
    const ruudut = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')];
    const kulma = (el) => {
      const arvo = el.style.getPropertyValue('--pakka-kallistus').trim();
      return arvo ? Number.parseFloat(arvo) : 0;
    };
    const img = document.querySelector('.fokusvirta-isokuva-kuva');
    const tyyli = img ? getComputedStyle(img) : null;
    const kartta = document.querySelector('.map-pane');
    const huntu = kartta ? getComputedStyle(kartta, '::after') : null;
    return {
      ruutuja: ruudut.length,
      kulmat: ruudut.map(kulma),
      matriisit: ruudut.map((r) => getComputedStyle(r).transform),
      tekstit: ruudut.map((r) => Boolean(r.querySelector('.fokusvirta-isokuva-teksti'))),
      maski: tyyli ? `${tyyli.maskImage} | ${tyyli.webkitMaskImage}` : null,
      reuna: tyyli ? `${tyyli.borderTopWidth} ${tyyli.borderTopColor}` : null,
      huntuPaalla: document.body.classList.contains('luenta-huntu'),
      huntuSuodatin: huntu ? (huntu.backdropFilter ?? huntu.webkitBackdropFilter) : null,
      huntuPeite: huntu ? huntu.backgroundColor : null,
    };
  });
  tieto(`${ruutu.nimi} luentakuvat`, JSON.stringify(kuvat));
  vaadi(`${ruutu.nimi}: kuvia on pakassa useampi yhtä aikaa`, kuvat.ruutuja >= 2,
    `ruutuja ${kuvat.ruutuja}`);
  vaadi(`${ruutu.nimi}: reunahäivytys (mask) on poissa`,
    Boolean(kuvat.maski) && !/gradient/.test(kuvat.maski), String(kuvat.maski));
  const vuorottelee = kuvat.kulmat.length >= 2
    && kuvat.kulmat.every((k, i) => (i % 2 === 0 ? k < 0 : k > 0));
  vaadi(`${ruutu.nimi}: kallistukset vuorottelevat eri etumerkillä`,
    vuorottelee, JSON.stringify(kuvat.kulmat));
  vaadi(`${ruutu.nimi}: jokaisella kortilla on oma kuvateksti`,
    kuvat.tekstit.every(Boolean), JSON.stringify(kuvat.tekstit));
  tieto(`${ruutu.nimi} kartan huntu`,
    `paalla=${kuvat.huntuPaalla} suodatin=${kuvat.huntuSuodatin} peite=${kuvat.huntuPeite}`);

  if (KUVAKANSIO) {
    // Kaappaus otetaan HETI kolmen kortin mittauksen jälkeen: sarja
    // purkautuu pieneksi pakaksi noin 44 s kohdalla, ja neljättä korttia
    // odotellessa kaappaus osui jo purkautuneeseen näkymään (mitattu
    // 1400 × 900).
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
    writeFileSync(join(KUVAKANSIO, `kaiutin-luentakuvat-${ruutu.width}-20260915.jpg`),
      Buffer.from(data, 'base64'));
  }
  await ctx.close();
}


/* ================================================================
   TEKSTIT PIILOON KAIKILLA LAITTEILLA (omistaja 15.9.2026)
   ================================================================

   Raamattu "TEKSTIT PIILOON KAIKILLA LAITTEILLA": luennan aikana
   isoisän matkakirjamerkinnän teksti (saapumiskortin lappu) ja pulun
   puhekupla piilotetaan KAIKILLA laitteilla. Näkyviin jää kuva ja
   kuvateksti; merkinnän saa esiin lappua napauttamalla ja pulun
   repliikin pluskuplasta.

   VARTIOT (kolmella ruudulla, myös iPadilla, jossa kumpikaan
   puhelinraja ei osu):
     7.  Luennan aikana kortti on lappu ja merkinnän teksti mitaton.
     8.  Kuva ja kuvateksti näkyvät samaan aikaan.
     9.  Lapun napautus avaa merkinnän kesken luennan.
     10. Pulun uusi repliikki ei jää ruudulle vaan pluskuplaan.
     11. Pluskuplan napautus palauttaa repliikin.
     12. Luennan jälkeen (1400 px) kortti on auki ja teksti näkyy.

   VASTAKOE: piilotus otetaan pois (luokka pois bodystä ja kortti
   auki) → 1400 px näyttää tekstit luennan aikana → vartio 7 kääntyy
   punaiseksi. Näin tiedetään, että vartio mittaa piilotusta eikä
   ruudun kokoa. */
const TEKSTIRUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'ipad', width: 1024, height: 1366 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

/* Yksi näyte lapun, merkinnän ja kuvatekstin tilasta. */
const TEKSTINAYTE = `(() => {
  const mitta = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const t = getComputedStyle(el);
    return {
      w: Math.round(r.width), h: Math.round(r.height),
      display: t.display, visibility: t.visibility, opacity: t.opacity,
    };
  };
  const kortti = document.querySelector('.fact-card');
  return {
    piilo: document.body.classList.contains('luenta-tekstit-piiloon'),
    kertoja: document.body.classList.contains('kertoja-aanessa'),
    lappu: Boolean(kortti && kortti.classList.contains('pieni')),
    kortti: mitta(kortti),
    rivi: mitta(document.querySelector('.fact-teksti-rivi')),
    teksti: mitta(document.getElementById('fact-text')),
    tekstinPituus: (document.getElementById('fact-text')?.textContent ?? '').trim().length,
    kuvateksti: mitta(document.querySelector('.fokusvirta-isokuva-teksti')),
    kuva: mitta(document.querySelector('.fokusvirta-isokuva-kuva')),
    kuplia: document.querySelectorAll('.pollo-kuplapino .pollo-vihje').length,
    pluskupla: mitta(document.querySelector('.pollo-kuplapalautus')),
    kuplateksti: (document.querySelector('.pollo-kuplapino .pollo-vihje')?.textContent ?? '').trim(),
  };
})()`;

const KUPLAN_TEKSTI = 'Savukkeen koerepliikki pluskuplasta.';

/*
 * NAPAUTUS CDP:N KAUTTA, EI page.click.
 *
 * Playwrightin oma napautus jäi aikakatkaisuun sekä pluskuplalla että
 * lapulla iPadilla ja työpöydällä (mitattu 15.9.2026: "page.click:
 * Timeout 5000ms exceeded", myös `force: true`). Syy on siinä, että
 * molemmat elementit elävät omissa siirtymissään koko luennan ajan.
 * CDP:n hiiritapahtuma on silti aitoa syötettä — sama, jonka selain
 * antaa sormelle — ja osuu mitattuun keskipisteeseen (elementFromPoint
 * varmistaa, että kohde on päällimmäisenä).
 */
async function napauta(sivu, cdp, valitsin) {
  const kohde = await sivu.evaluate((v) => {
    const el = document.querySelector(v);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const paalla = document.elementFromPoint(x, y);
    return { x, y, paalla: paalla ? `${paalla.tagName}.${paalla.className}` : 'null' };
  }, valitsin);
  if (!kohde) return 'ei elementtiä';
  for (const type of ['mousePressed', 'mouseReleased']) {
    await cdp.send('Input.dispatchMouseEvent', {
      type, x: kohde.x, y: kohde.y, button: 'left', clickCount: 1, buttons: type === 'mousePressed' ? 1 : 0,
    });
  }
  return `ok (${Math.round(kohde.x)},${Math.round(kohde.y)} → ${kohde.paalla})`;
}

for (const ruutu of TEKSTIRUUDUT) {
  console.log(`\n=== TEKSTIT PIILOON: ${ruutu.nimi} ${ruutu.width}x${ruutu.height} ===`);
  const { ctx, sivu, cdp } = await avaaAjo({ width: ruutu.width, height: ruutu.height });
  await sivu.waitForFunction(() => document.body.classList.contains('luenta-tekstit-piiloon'),
    null, { timeout: 60000 }).catch(() => {});
  // Kuva ja kuvateksti ruudulle ennen mittausta.
  await sivu.waitForFunction(() => document.querySelector('.fokusvirta-isokuva-teksti'),
    null, { timeout: 60000 }).catch(() => {});

  // 7–8. LAPPU JA KUVATEKSTI.
  const luennassa = await sivu.evaluate(TEKSTINAYTE);
  tieto(`${ruutu.nimi} luennan aikana`, JSON.stringify(luennassa));
  vaadi(`${ruutu.nimi}: luennan tekstipiilo on päällä`, luennassa.piilo);
  vaadi(`${ruutu.nimi}: merkintä on lappuna ja sen teksti mitaton`,
    luennassa.lappu && (luennassa.rivi?.w ?? 99) <= 1 && (luennassa.teksti?.w ?? 99) <= 1,
    `lappu=${luennassa.lappu} rivi=${JSON.stringify(luennassa.rivi)}`);
  vaadi(`${ruutu.nimi}: kuva ja kuvateksti näkyvät`,
    (luennassa.kuvateksti?.h ?? 0) > 4 && luennassa.kuvateksti?.display !== 'none'
      && (luennassa.kuva?.w ?? 0) > 20,
    JSON.stringify({ kuvateksti: luennassa.kuvateksti, kuva: luennassa.kuva }));

  if (KUVAKANSIO && ruutu.width === 1400) {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 62 });
    writeFileSync(join(KUVAKANSIO, 'tekstit-piiloon-1400-20260915.jpg'), Buffer.from(data, 'base64'));
  }

  // 9. LAPUN NAPAUTUS AVAA MERKINNÄN KESKEN LUENNAN.
  const lappuKlikki = await napauta(sivu, cdp, '.fact-card');
  await sivu.waitForTimeout(400);
  const lappuAuki = await sivu.evaluate(TEKSTINAYTE);
  tieto(`${ruutu.nimi} lapun napautuksen jälkeen`, JSON.stringify({
    klikki: lappuKlikki, lappu: lappuAuki.lappu, rivi: lappuAuki.rivi, piilo: lappuAuki.piilo,
  }));
  vaadi(`${ruutu.nimi}: lapun napautus näyttää merkinnän kesken luennan`,
    lappuAuki.piilo && !lappuAuki.lappu && (lappuAuki.rivi?.w ?? 0) > 40
      && lappuAuki.tekstinPituus > 10,
    JSON.stringify({ klikki: lappuKlikki, piilo: lappuAuki.piilo, rivi: lappuAuki.rivi }));

  // 10–11. PULU: uusi repliikki imeytyy pluskuplaan, napautus palauttaa.
  await sivu.evaluate(async (teksti) => {
    const m = await import('/js/pollo.js');
    m.polloSaapumiskupla(teksti, { linssinOma: true });
  }, KUPLAN_TEKSTI);
  await sivu.waitForTimeout(400);
  const kuplaKiinni = await sivu.evaluate(TEKSTINAYTE);
  tieto(`${ruutu.nimi} pulun kupla luennan aikana`,
    `piilo=${kuplaKiinni.piilo} kuplia=${kuplaKiinni.kuplia} pluskupla=${JSON.stringify(kuplaKiinni.pluskupla)}`);
  vaadi(`${ruutu.nimi}: pulun repliikki ei jää ruudulle vaan pluskuplaan`,
    kuplaKiinni.piilo && kuplaKiinni.kuplia === 0 && (kuplaKiinni.pluskupla?.w ?? 0) > 4,
    JSON.stringify({ piilo: kuplaKiinni.piilo, kuplia: kuplaKiinni.kuplia, plus: kuplaKiinni.pluskupla }));
  const plusKlikki = await napauta(sivu, cdp, '.pollo-kuplapalautus');
  await sivu.waitForTimeout(500);
  const kuplaAuki = await sivu.evaluate(TEKSTINAYTE);
  vaadi(`${ruutu.nimi}: pluskuplan napautus näyttää repliikin`,
    kuplaAuki.kuplia >= 1 && kuplaAuki.kuplateksti.includes('koerepliikki'),
    JSON.stringify({ klikki: plusKlikki, kuplia: kuplaAuki.kuplia, teksti: kuplaAuki.kuplateksti }));

  await ctx.close();
}

/* 12. LUENNAN JÄLKEEN TYÖPÖYTÄ ON ENNALLAAN. Luenta katkaistaan
   lukijasta (sama tila kuin luennan loppuessa itsestään), ja kortin
   pitää palata auki ilman napautuksia. */
console.log('\n=== TEKSTIT PIILOON: luennan jälkeen 1400x900 ===');
{
  const { ctx, sivu } = await avaaAjo({ width: 1400, height: 900 });
  await sivu.waitForFunction(() => document.body.classList.contains('luenta-tekstit-piiloon'),
    null, { timeout: 60000 }).catch(() => {});
  const luennassa = await sivu.evaluate(TEKSTINAYTE);
  vaadi('tyopoyta: kortti on lappuna ennen luennan loppua', luennassa.lappu,
    JSON.stringify(luennassa.kortti));
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    /*
     * LUENTA POIKKI KUTEN SEN LOPPUESSA: jokainen soiva luenta
     * pysäytetään ja merkitään puheenvuoronsa päättyneeksi
     * (js/luenta.js puhujaAanessa lukee juuri tämän lipun), ja
     * laitteen oma lukija vaiennetaan. Vahtiin ei kosketa — juuri sen
     * pitää havaita loppu ja palauttaa kortti.
     */
    const aanet = [ui.diaryVoice, ...(ui.luennat ?? []), ...document.querySelectorAll('audio')];
    for (const a of aanet) {
      if (!a) continue;
      try { a.pause(); } catch { /* selain voi kieltää */ }
      a.puhevuoroPaattyi = true;
    }
    globalThis.speechSynthesis?.cancel?.();
    const lukija = await import('/js/lukija.js').catch(() => null);
    lukija?.pysaytaLukija?.();
  });
  const palasi = await sivu.waitForFunction(
    () => !document.body.classList.contains('luenta-tekstit-piiloon')
      && !document.querySelector('.fact-card').classList.contains('pieni'),
    null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  const jalkeen = await sivu.evaluate(TEKSTINAYTE);
  tieto('tyopoyta luennan jälkeen', JSON.stringify(jalkeen));
  vaadi('tyopoyta: luennan jälkeen tekstit näkyvät kuten ennen',
    palasi && !jalkeen.lappu && (jalkeen.rivi?.w ?? 0) > 40,
    JSON.stringify({ palasi, lappu: jalkeen.lappu, rivi: jalkeen.rivi }));
  await ctx.close();
}

/* VASTAKOE: piilotus pois → 1400 px näyttää tekstit luennan aikana. */
console.log('\n=== VASTAKOE: tekstipiilo pois päältä 1400x900 ===');
{
  const { ctx, sivu } = await avaaAjo({ width: 1400, height: 900 });
  await sivu.waitForFunction(() => document.body.classList.contains('luenta-tekstit-piiloon'),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    // Vahti pois ja piilotus perumaan: luenta jatkuu, mutta tekstit
    // jäävät ruudulle kuten ennen tätä muutosta.
    clearInterval(ui.luentavahti);
    ui.luentavahti = null;
    document.body.classList.remove('luenta-tekstit-piiloon');
    ui.asetaPaivakirjanKoko(false);
  });
  await sivu.waitForTimeout(600);
  const ilman = await sivu.evaluate(TEKSTINAYTE);
  tieto('vastakoe ilman piilotusta', JSON.stringify({
    piilo: ilman.piilo, lappu: ilman.lappu, rivi: ilman.rivi, kertoja: ilman.kertoja,
  }));
  vaadi('VASTAKOE: ilman piilotusta 1400 px EI läpäise tekstipiilovartiota',
    !(ilman.piilo && ilman.lappu && (ilman.rivi?.w ?? 99) <= 1),
    JSON.stringify(ilman.rivi));
  await ctx.close();
}

/* ================================================================
   VASTAKOE: mittari pakolla seis → kaaret staattiset → vartio punainen
   ================================================================ */
console.log('\n=== VASTAKOE: mittari pysäytettynä ===');
{
  const { ctx, sivu } = await avaaAjo({ width: 1400, height: 900 });
  await sivu.waitForFunction(() => document.body.classList.contains('kertoja-aanessa'),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    /*
     * ANIMAATIO POIS KAHDELLA KÄDELLÄ: luentavahti pysäytetään (se
     * käynnistäisi mittarin 200 ms:n välein uudestaan) ja mittari
     * sammutetaan. Luennan merkki jätetään päälle, jotta vartio mittaa
     * nimenomaan animaatiota eikä luennan olemassaoloa.
     */
    clearInterval(ui.luentavahti);
    ui.luentavahti = null;
    const m = await import('/js/kaiutinmittari.js');
    m.pysaytaKaiutinmittari();
    document.body.classList.add('kertoja-aanessa');
  });
  const tilat = [];
  for (let i = 0; i < 3; i += 1) {
    tilat.push((await sivu.evaluate(KAARINAYTE)).tila);
    await sivu.waitForTimeout(320);
  }
  tieto('vastakokeen tilat', tilat.join(' → '));
  vaadi('VASTAKOE: pysäytetty mittari EI läpäise elävyysvartiota',
    new Set(tilat).size < 2, tilat.join(' → '));
  await ctx.close();
}


/* ================================================================
   13. KAARET SEURAAVAT AMPLITUDIVERHOKÄYRÄÄ (eristetty mittaus)
   ================================================================

   MIKSI ERISTETTY SIVU EIKÄ PELI. Mittaus tarvitsee 50 ms:n
   näytevälin. Pelisivulla kartan piirto varaa pääsäikeen niin, että
   `setTimeout(50)` venyy mitattuna 600 ms:iin ja näytteitä kertyy 25
   sekunnista noin 30 — liian harva sarja korrelaatioon. Sama
   js/kaiutinmittari.js, sama äänitiedosto ja sama äänigraafi kuin
   js/musiikkivahvistin.js rakentaa (lähde → gain → analyser → ulos),
   mutta tyhjällä sivulla.

   VERTAILUKOHTA ON RIIPPUMATON: äänitiedosto puretaan erikseen
   OfflineAudioContextissa ja siitä lasketaan 50 ms:n RMS-verhokäyrä.
   Kaarien tilaa verrataan siihen soittimen `currentTime`-kohdalla,
   eli mittarin omaa lukemaa ei käytetä missään.
*/
console.log('\n=== 13. kaaret vs. amplitudiverhokäyrä (eristetty) ===');
if (!AANIOSOITE) {
  vaadi('eristetty mittaus: luennan ääniosoite saatiin', false, 'ei osoitetta');
} else {
  const aani = await ampariHaku(AANIOSOITE);
  const KOESIVU = `<!doctype html><meta charset="utf-8"><body>
<button id="nappi"><svg viewBox="0 0 24 24">
<path class="kaiutin-kaari" d="M1 1"/><path class="kaiutin-kaari" d="M2 2"/><path class="kaiutin-kaari" d="M3 3"/>
</svg></button>
<script type="module">
import { kaynnistaKaiutinmittari } from '/js/kaiutinmittari.js';
window.koe = async (url, asetukset) => {
  const ctx = new AudioContext();
  await ctx.resume();
  const audio = new Audio();
  audio.crossOrigin = 'anonymous';
  audio.src = url;
  const lahde = ctx.createMediaElementSource(audio);
  const gain = ctx.createGain();
  gain.gain.value = asetukset.mykka ? 0 : 0.9;
  const an = ctx.createAnalyser();
  an.fftSize = 256;
  lahde.connect(gain).connect(an).connect(ctx.destination);
  window.__audio = audio;
  kaynnistaKaiutinmittari(document.getElementById('nappi'), () => an,
    { pakotaKuvio: Boolean(asetukset.pakotaKuvio), haeVahvistus: () => gain.gain.value });
  await audio.play();
};
window.naytteista = async (kesto) => {
  const audio = window.__audio;
  const kaaret = [...document.querySelectorAll('#nappi .kaiutin-kaari')];
  const out = [];
  const alku = performance.now();
  while (performance.now() - alku < kesto && !audio.ended) {
    out.push({ t: audio.currentTime, n: kaaret.filter((k) => k.classList.contains('palaa')).length });
    await new Promise((r) => setTimeout(r, 50));
  }
  return out;
};
window.verhokayra = async (url) => {
  const buf = await (await fetch(url)).arrayBuffer();
  const oc = new OfflineAudioContext(1, 44100, 44100);
  const dek = await oc.decodeAudioData(buf);
  const d = dek.getChannelData(0);
  const ikkuna = Math.round(dek.sampleRate * 0.05);
  const v = [];
  for (let i = 0; i + ikkuna <= d.length; i += ikkuna) {
    let s = 0;
    for (let j = i; j < i + ikkuna; j += 1) s += d[j] * d[j];
    v.push(Math.sqrt(s / ikkuna));
  }
  return v;
};
window.valmis = true;
<\/script></body>`;

  const KOEOSOITE = `${osoite.split('?')[0].replace(/\/$/, '')}/__vu-koe.html`;
  const HILJAISUUSRAJA = 0.015;

  /** Pearsonin korrelaatio pareille [x, y]. */
  const korrelaatio = (parit) => {
    const n = parit.length;
    if (n < 30) return NaN;
    const mx = parit.reduce((a, b) => a + b[0], 0) / n;
    const my = parit.reduce((a, b) => a + b[1], 0) / n;
    let sxy = 0; let sxx = 0; let syy = 0;
    for (const [x, y] of parit) {
      sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2;
    }
    return sxy / Math.sqrt(sxx * syy);
  };

  async function mittaa(asetukset) {
    const kctx = await selain.newContext();
    const ksivu = await kctx.newPage();
    ksivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
    await ksivu.route(KOEOSOITE, (r) => r.fulfill({
      status: 200, contentType: 'text/html', body: KOESIVU,
    }));
    await ksivu.route(/media\.matkakirja\.app|r2\.dev\//, (r) => r.fulfill({
      status: 200, contentType: aani.tyyppi ?? 'audio/mpeg', body: aani.body,
      headers: { 'access-control-allow-origin': '*' },
    }));
    await ksivu.goto(KOEOSOITE);
    await ksivu.waitForFunction(() => window.valmis === true, null, { timeout: 30000 });
    await ksivu.evaluate(([u, a]) => window.koe(u, a), [AANIOSOITE, asetukset]);
    const naytteet = (await ksivu.evaluate(() => window.naytteista(22000)))
      .filter((x) => x.t > 0.1);
    const verho = await ksivu.evaluate((u) => window.verhokayra(u), AANIOSOITE);
    await kctx.close();
    const sarja = naytteet.map((x) => ({
      t: x.t, n: x.n, v: verho[Math.min(verho.length - 1, Math.floor(x.t / 0.05))],
    })).filter((x) => Number.isFinite(x.v));
    // Taukojaksot: yli 150 ms hiljaisuutta. Jakson alusta annetaan
    // 100 ms armonaikaa (release-vakio 120 ms), sen jälkeen kaarien on
    // oltava sammuksissa loppuun asti.
    let jaksoja = 0; let rikki = 0;
    for (let i = 0; i < sarja.length;) {
      if (sarja[i].v >= HILJAISUUSRAJA) { i += 1; continue; }
      let j = i;
      while (j < sarja.length && sarja[j].v < HILJAISUUSRAJA) j += 1;
      if ((sarja[j - 1].t - sarja[i].t) >= 0.15) {
        jaksoja += 1;
        if (sarja.slice(i, j).some((x) => x.t - sarja[i].t > 0.1 && x.n > 0)) rikki += 1;
      }
      i = j;
    }
    const jakauma = sarja.reduce((a, x) => { a[x.n] = (a[x.n] ?? 0) + 1; return a; }, {});
    return {
      r: korrelaatio(sarja.map((x) => [x.n, x.v])),
      jaksoja,
      rikki,
      jakauma,
      naytteita: sarja.length,
      palavia: sarja.filter((x) => x.n > 0).length,
    };
  }

  const a = await mittaa({});
  tieto('mitattu lähde: korrelaatio ja tauot', JSON.stringify(a));
  vaadi('13a: kaarien tilasarja korreloi amplitudiverhokäyrän kanssa (r > 0,6)',
    Number.isFinite(a.r) && a.r > 0.6, `r = ${Number(a.r).toFixed(3)}, n = ${a.naytteita}`);
  vaadi('13b: jokainen yli 150 ms:n tauko näkyy kaaret sammuksissa (±100 ms)',
    a.jaksoja >= 3 && a.rikki === 0, `${a.rikki}/${a.jaksoja} taukojaksoa palaa`);

  const b = await mittaa({ pakotaKuvio: true });
  tieto('VASTAKOE ajastettu kuvio', JSON.stringify(b));
  vaadi('VASTAKOE: pakotettu ajastettu kuvio EI läpäise korrelaatiovartiota',
    !(Number.isFinite(b.r) && b.r > 0.6) || b.rikki > 0,
    `r = ${Number(b.r).toFixed(3)}, tauot rikki ${b.rikki}/${b.jaksoja}`);

  const c = await mittaa({ mykka: true });
  tieto('VASTAKOE hiljaisuus (gain 0)', JSON.stringify(c));
  vaadi('VASTAKOE: hiljainen signaali sammuttaa kaikki kaaret',
    c.naytteita > 100 && c.palavia === 0, `palavia näytteitä ${c.palavia}`);
}

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
