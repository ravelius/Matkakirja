/*
 * Savuke: LAATTAPYRAMIDI (js/laattapyramidi.js) — pelin ainoa karttapohja.
 *
 *   node tools/savukkeet/savuke-laattapyramidi.mjs [--laatat <kansio>]
 *
 * Omistajan päälinjaus 30.8.2026 (Raamattu, "YKSI MAAILMANBITTIKARTTA -
 * MAALEHDISTA LUOVUTAAN"): koko maailma on yksi laatasto, josta
 * ladataan vain näkyvä pala.
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 *   P2  Laatat ilmestyvät kerrokseen eikä yhtäkään maalehteä haeta
 *       (ei lehtivalintaa, ei saumoja) — vartio siitä, ettei purettu
 *       lehtijärjestelmä palaa.
 *   P3  Vain näkyvä pala ladataan — laattojen määrä on kymmeniä, ei
 *       tuhansia, ja se pysyy samassa suuruusluokassa zoomatessa.
 *   P4  Puuttuvaa laattaa EI pyydetä: luettelon laatasto-bittikartta
 *       kertoo mitkä ovat olemassa (harva pyramidi).
 *   P5  Kierto: päivämääränrajan yli panoroitaessa laatat asettuvat
 *       jatkuvasti eikä väliin jää rakoa. Tason leveys ei ole
 *       laattakoon monikerta, joten tämä on se kohta, jossa naiivi
 *       modulo menisi 128 pikseliä väärään paikkaan.
 *
 * === MITÄ TÄMÄ MITTAA ===============================================
 *
 * Suunnitelma (docs/moduulit/laattapyramidi.md luku 6) vaatii pilotilta
 * oikeat luvut: laattojen määrä näkymässä, latausaika, purettu muisti
 * ja kehysaika panoroinnissa. Ne luetaan pelin omasta kahvasta
 * `__pyramidinMittarit()` ja tulostetaan MITAT-osioon.
 *
 * VERKKOON EI MENNÄ: laatat tulevat testin omasta reitityksestä
 * paikallisesta pilottikansiosta (oletus: kontin scratchpad).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const LAATAT = valitsin('laatat', process.env.PYRAMIDI_LAATAT ?? '');

if (!LAATAT || !existsSync(join(LAATAT, 'pyramidi.json'))) {
  console.error('Pilottilaattoja ei löydy. Aja ensin '
    + 'tools/generoi-laattapyramidi.mjs ja anna kansio: '
    + '--laatat <kansio> (tai PYRAMIDI_LAATAT).');
  process.exit(2);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/** Laattavastausten viive millisekunteina (P7e asettaa, muut eivät). */
let laattaViive = 0;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Avaa pelin ja ajaa sen Ateenaan. Palauttaa sivun ja pyyntölokin.
 *
 * Laattapyyntöjä EI päästetä verkkoon: ne palvellaan pilottikansiosta,
 * ja puuttuva laatta saa 404:n — juuri se, mitä P4 mittaa.
 *
 * KEHITTÄJÄN MAAILMANAPPI omana istuntonaan (`kehittaja: true`). Se
 * vapauttaa panoroinnin fokusikkunasta (js/kartta.js fokusRajaukset),
 * ja vain siten kamera pääsee Tyynenmeren yli — juuri siinä tilassa
 * omistaja pelitestaa ja juuri siellä kierron vika näkyy (P5). Kytkin
 * ei kuulu muihin väitteisiin, joten se ei ole oletus: se muuttaisi
 * fokusmoodin ja siten koko piirron.
 */
async function avaaPeli({ kehittaja = false } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    serviceWorkers: 'block',
  });
  if (kehittaja) {
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem('matkakirja-kehittaja', '1');
        localStorage.setItem('matkakirja-kehittaja-maailma', '1');
      } catch { /* yksityinen selaus: kytkin jää pois, väite kaatuu näkyvästi */ }
    });
  }
  const sivu = await ctx.newPage();
  const pyynnot = [];
  const lehtipyynnot = [];
  /*
   * REITTIEN JÄRJESTYS ON MERKITSEVÄ. Playwright kokeilee reittejä
   * KÄÄNTEISESSÄ rekisteröintijärjestyksessä, joten yleinen "kaikki
   * ämpäriin menevä poikki" on rekisteröitävä ENSIN ja tarkemmat
   * poikkeukset sen jälkeen — muuten ne jäävät sen alle eikä yksikään
   * laatta koskaan päädy testin omaan käsittelyyn.
   */
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route('**r2.dev/**', (route) => route.abort());
  // Lehtipyynnöt kirjataan mutta katkaistaan: verkkoon ei mennä.
  await sivu.route('**/julisteet/fokus/**', (route) => {
    lehtipyynnot.push(route.request().url());
    route.abort();
  });
  await sivu.route('**/julisteet/pyramidi/**', async (route) => {
    const url = new URL(route.request().url());
    const osa = url.pathname.split('/julisteet/pyramidi/')[1];
    pyynnot.push(osa);
    /*
     * Laatan osoitteessa on VERSIO polun osana
     * (julisteet/pyramidi/<versio>/z7/...), mutta pilottikansiossa
     * laatat ovat suoraan z-kansioissa. Kokeillaan siis molempia:
     * ensin sellaisenaan, sitten versio-osa kuorittuna.
     */
    let tiedosto = join(LAATAT, osa);
    if (!existsSync(tiedosto) && osa.includes('/')) {
      tiedosto = join(LAATAT, osa.slice(osa.indexOf('/') + 1));
    }
    if (!existsSync(tiedosto)) { route.fulfill({ status: 404, body: 'ei' }); return; }
    /*
     * SÄÄDETTÄVÄ VIIVE. Vika, jota P7e vartioi, näkyy vain kun laatat
     * eivät ehdi perille ennen seuraavaa zoomiporrasta — puhelimen
     * yhteydellä siis aina, paikallisesta kansiosta ei koskaan. Viive
     * on testin oma kuristin, eikä sitä tarvita muissa väitteissä.
     */
    if (laattaViive) await new Promise((valmis) => { setTimeout(valmis, laattaViive); });
    route.fulfill({
      status: 200,
      contentType: osa.endsWith('.json') ? 'application/json' : 'image/webp',
      body: readFileSync(tiedosto),
    });
  });
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1500);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') { g.actionPickStart('ateena', 0); window.matkakirja.ui.render(); }
  });
  await sivu.waitForTimeout(7000);
  return { sivu, ctx, pyynnot, lehtipyynnot };
}

const laattojaKerroksessa = (sivu) => sivu.evaluate(
  () => window.matkakirja.ui.pyramidiKerros?.querySelectorAll('image.pyramidi-laatta').length ?? -1,
);
const mittarit = (sivu) => sivu.evaluate(() => globalThis.__pyramidinMittarit?.() ?? null);

/* ============ P2-P5 =================================================
 *
 * KYTKINTÄ EI ENÄÄ OLE (lehtipurku 30.8.2026). Entinen P1 mittasi
 * "lippu pois = vanha lehtijärjestelmä ennallaan"; sitä ei voi enää
 * mitata eikä pidäkään, koska omistaja poisti koko vaihtoehdon:
 * *"Ei kun poista kaikki muut vaihtoehdot käytöstä ja kytke peliin vain
 * tämä uusi kartta, ei mitään muuta."* Lehtipyyntöjen puuttuminen
 * (P2b) on nyt pysyvä vartio: se kaatuu, jos lehtijärjestelmä palaa.
 */

console.log('--- P2-P5 ---');
const { sivu, ctx, pyynnot, lehtipyynnot } = await avaaPeli();

const laattoja = await laattojaKerroksessa(sivu);
vaadi('P2a laattoja on kerroksessa', laattoja > 0, `laattoja ${laattoja}`);
vaadi('P2b maalehtiä ei haeta lainkaan', lehtipyynnot.length === 0,
  `lehtipyyntöjä ${lehtipyynnot.length}: ${lehtipyynnot.slice(0, 4).join(' ')}`);
vaadi('P2c luettelo haettiin kerran',
  pyynnot.filter((p) => p === 'pyramidi.json').length === 1,
  `${pyynnot.filter((p) => p === 'pyramidi.json').length} kertaa`);

const m1 = await mittarit(sivu);
vaadi('P3a näkyvässä palassa on kymmeniä laattoja, ei tuhansia',
  m1.nakymassa > 0 && m1.nakymassa < 200, `nakymassa ${m1.nakymassa}`);
vaadi('P4a puuttuvia laattoja ei pyydetä (laatasto-bittikartta)',
  m1.epaonnistui === 0, `404 ${m1.epaonnistui} kpl`);

// Zoomataan lähemmäs: tason on vaihduttava ja laattamäärän pysyttävä maltillisena.
for (let z = 0; z < 3; z += 1) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(1200);
}
await sivu.waitForTimeout(2500);
const m2 = await mittarit(sivu);
vaadi('P3b zoomatessa taso vaihtuu', m2.taso !== m1.taso, `${m1.taso} → ${m2.taso}`);
vaadi('P3c laattamäärä pysyy maltillisena myös lähikuvassa',
  m2.nakymassa > 0 && m2.nakymassa < 200, `nakymassa ${m2.nakymassa}`);
vaadi('P4b lähikuvassakaan ei tule 404:iä', m2.epaonnistui === 0, `404 ${m2.epaonnistui} kpl`);

/* ============ P5: KIERTO — NÄKYMÄ LAUDAN SAUMAN YLI =================
 *
 * === MIKSI TÄMÄ AJETAAN OMASSA ISTUNNOSSAAN JA OMASSA PAIKASSAAN ====
 *
 * Vanha P5 luki laatat siitä, mihin peli sattui olemaan (Ateena) ja
 * mittasi vierekkäisten laattojen välin. Otsikko lupasi "panoroidaan
 * laudan sauman yli", mutta yksikään rivi ei siirtänyt kameraa — väite
 * ei koskaan käynyt saumalla, eikä se siksi voinut nähdä mitään.
 *
 * JA JUURI SAUMASTA VIKA LÖYTYI (omistajan kuvakaappaus 31.8.2026,
 * näkymä Kamtšatkan yllä, mittakaava 1000 km): kartta piirtyi vain
 * ruudun vasempaan puolikkaaseen ja oikealla oli tyhjää pergamenttia,
 * rajana terävä pystysauma. Laatat OLIVAT puussa, ladattuina ja
 * oikeilla paikoillaan — mutta arkin oikealla puolella, jonne laudan
 * <use>-kopio maalaa oman läpinäkymättömän paperinsa (js/ui.js
 * laudanKierto). Mitattuna 12 laattaa 30:stä oli arkin ulkopuolella.
 *
 * SIKSI VÄITE ON NYT PAIKASTA, EI VÄLEISTÄ. Rakoa mittaava väite oli
 * tosi koko vian ajan; se, mikä oli epätosi, on "laatta on arkilla".
 *
 * Kamera viedään sauman molemmin puolin. Panorointi on fokusikkunassa
 * kiinni, joten istunto avataan kehittäjän maailmanapin kanssa — se on
 * myös se tila, jossa omistaja vian näki.
 */
console.log('\n--- P5 kierto ---');
const LUETTELO = JSON.parse(readFileSync(join(LAATAT, 'pyramidi.json'), 'utf8'));
const ARKKI = LUETTELO.arkki;
const kiertoPeli = await avaaPeli({ kehittaja: true });

/** Laatat ja näkymä yhdestä kamerapaikasta. */
const saumanLaatat = async (x) => {
  await kiertoPeli.sivu.evaluate(({ kx, ky, leveys }) => {
    window.matkakirja.ui.kartta.ajaKamera({ x: kx, y: ky, leveys },
      { kesto: 0, pakota: true });
  }, { kx: x, ky: ARKKI.y + ARKKI.h * 0.3, leveys: ARKKI.w / 6 });
  await kiertoPeli.sivu.waitForTimeout(2500);
  return kiertoPeli.sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const z = String(globalThis.__pyramidinMittarit().taso);
    return {
      nakyva: ui.nakyvaAlue(),
      laatat: [...ui.pyramidiKerros.querySelectorAll('image.pyramidi-laatta')]
        .filter((k) => k.dataset.taso === z)
        .map((k) => ({
          x: parseFloat(k.getAttribute('x')),
          y: parseFloat(k.getAttribute('y')),
          w: parseFloat(k.getAttribute('width')),
          h: parseFloat(k.getAttribute('height')),
        })),
    };
  });
};

/*
 * PEITTO MITATAAN KIERTÄEN. Laatta on arkilla kerran, ja sauman takana
 * sen näyttää laudan kopio — sama laatta on siis ruudulla myös yhden
 * arkinleveyden päässä omasta paikastaan.
 */
const saumaPeitto = ({ nakyva, laatat }) => {
  const y = nakyva.y + nakyva.h / 2;
  const N = 200;
  let osuu = 0;
  for (let i = 0; i < N; i += 1) {
    const x = nakyva.x + ((i + 0.5) / N) * nakyva.w;
    if (laatat.some((l) => l.y <= y && l.y + l.h >= y
      && [-1, 0, 1].some((k) => {
        const lx = l.x + k * ARKKI.w;
        return lx <= x && lx + l.w >= x;
      }))) osuu += 1;
  }
  return osuu / N;
};

for (const [nimi, x] of [['sauman vasemmalla', ARKKI.x + ARKKI.w - ARKKI.w / 24],
  ['sauman päällä', ARKKI.x + ARKKI.w], ['sauman oikealla', ARKKI.x + ARKKI.w / 24]]) {
  const tila = await saumanLaatat(x);
  /*
   * P5a ON SE VÄITE, JOKA OLISI NÄHNYT VIAN. Arkin ulkopuolelle
   * piirretty laatta jää laudan <use>-kopion paperin alle: se on
   * puussa, se on ladattu, eikä sitä näy.
   */
  const ulkona = tila.laatat.filter((l) => l.x < ARKKI.x - 0.01
    || l.x + l.w > ARKKI.x + ARKKI.w + 0.01);
  vaadi(`P5a laatat pysyvät arkilla (${nimi})`, ulkona.length === 0,
    `${ulkona.length}/${tila.laatat.length} arkin ulkopuolella, `
    + `x ${[...new Set(ulkona.map((l) => Math.round(l.x)))].join(' ')}`);
  /*
   * P5b: EIKÄ MITÄÄN JÄÄNYT PUUTTUMAAN. Pelkkä "arkilla" täyttyisi
   * myös poistamalla sauman takaiset laatat kokonaan; tämä sanoo, että
   * ruutu on yhä kokonaan katettu. Se vartioi samalla vanhaa vaaraa:
   * tason leveys ei ole laattakoon monikerta, joten "sarake modulo
   * sarakkeiden määrä" veisi laatan 128 pikseliä väärään kohtaan ja
   * jättäisi raon juuri tähän.
   */
  const peittoSauma = saumaPeitto(tila);
  vaadi(`P5b ruutu on kokonaan laattojen peitossa (${nimi})`, peittoSauma > 0.999,
    `peitto ${(peittoSauma * 100).toFixed(1)} %, laattoja ${tila.laatat.length}`);
}
await kiertoPeli.ctx.close();


/* ============ P6: PAIKANNIMI KARTALLA TÄSMÄLLEEN KERRAN =============
 *
 * Omistajan päätös 30.8.2026: nimiöt poistuvat laatoista ja peli latoo
 * ne ruutuavaruudessa (js/karttanimet.js), koska poltettu nimi on
 * laitepikseleissä ja siksi tiheällä näytöllä kolmasosan kokoinen.
 *
 * VAARA ON KUMPIKIN SUUNTA. v1366 korjasi kaksoisnimen vaientamalla
 * elävän kerroksen; jos nyt vaikenevat molemmat, kartalta katoavat
 * kaikki nimet. Päätöksen tekee LUETTELO (`nimiot`), koska laatat ja
 * koodi julkaistaan eri aikaan — ja juuri sitä nämä väitteet mittaavat
 * molemmilla luetteloilla, samasta pelistä ja samasta zoomista.
 *
 * P6c mittaa myös nimen KOON RUUDULLA: se on koko korjauksen ydin.
 * Poltettu nimi oli tässä profiilissa (dpr 3) noin 3,5 CSS-pikseliä;
 * ladotun on oltava 10 ... 13 riippumatta pikselitiheydestä.
 */
/* ============ P7: ESILATAUS JA KARKEA POHJA =========================
 *
 * Omistajan iPad-havainto 30.8.2026: panoroinnin jälkeen ruudun
 * yläosassa näkyi TYHJÄ KARTTAPOHJA, ja *"miksi zoomatessa uusi kartta
 * latautuu hitaasti?"*. Molemmat korjattiin samalla kahtiajaolla:
 * NOUDETAAN laajalti (verkko ja välimuisti ovat halpoja), KIINNITETÄÄN
 * kapeasti (purettu bittikartta on kallis), ja kaiken alla on karkea
 * pohja, joka ei koskaan tyhjene.
 *
 * Nämä väitteet vartioivat sitä, ettei kumpikaan puoli katoa
 * myöhemmässä siivouksessa — ja P7c nimenomaan sitä, ettei ruudulla ole
 * missään vaiheessa TYHJÄÄ, mikä on koko korjauksen tarkoitus.
 */
console.log('\n--- P7 esilataus ja karkea pohja ---');

/** Kuinka suuri osa karttaruudusta on LADATTUJEN laattojen peitossa. */
const peitto = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const r = ui.mapPane.getBoundingClientRect();
  const laatikot = [...ui.pyramidiKerros.querySelectorAll('image.pyramidi-laatta')]
    .filter((k) => k.dataset.ladattu === '1')
    .map((k) => k.getBoundingClientRect());
  const N = 24;
  let osuu = 0;
  for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
      const x = r.left + ((i + 0.5) / N) * r.width;
      const y = r.top + ((j + 0.5) / N) * r.height;
      if (laatikot.some((b) => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom)) osuu += 1;
    }
  }
  return osuu / (N * N);
});

const m7 = await mittarit(sivu);
vaadi('P7a karkea pohjataso on kartan alla',
  m7.karkeita > 0, `karkeita ${m7.karkeita}`);
vaadi('P7b esilataus noutaa laattoja näkymän ulkopuolelta',
  m7.esiladattu + m7.esijonossa > 0,
  `esiladattu ${m7.esiladattu}, jonossa ${m7.esijonossa}`);
vaadi('P7c kiinnitettyjä on enemmän kuin ruudulla mutta muisti pysyy maltillisena',
  m7.nakymassa > m7.ruudulla && m7.muistiMt < 60,
  `kiinnitetty ${m7.nakymassa}, ruudulla ${m7.ruudulla}, muisti ${m7.muistiMt} Mt`);

/*
 * P7d: ZOOMATESSA EI TYHJÄÄ. Sääntö 2 (vanha taso jää alle) ja sääntö
 * 2b (karkea pohja) tarkoittavat yhdessä, ettei ruudulle voi jäädä
 * paljasta pergamenttia hetkeksikään. Mitataan heti zoomiportaan
 * jälkeen, kun uuden tason laatat ovat vielä matkalla.
 */
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(-1); });
let pieninPeitto = 1;
for (let i = 0; i < 12; i += 1) {
  pieninPeitto = Math.min(pieninPeitto, await peitto());
  await sivu.waitForTimeout(40);
}
vaadi('P7d zoomatessa kartta ei näytä tyhjää missään vaiheessa',
  pieninPeitto > 0.98, `pienin peitto ${(pieninPeitto * 100).toFixed(1)} %`);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(1500);

/* ============ P7e: NOPEA ZOOMISARJA HITAALLA YHTEYDELLÄ =============
 *
 * Omistajan iPhone-havainto 31.8.2026: *"Ja välillä kartta ei piirry
 * ollenkaan."* Ruudulla oli pelkkä pergamentti ja sen päällä elävä
 * kerros — nimet, pisteet ja viivaimen asteluvut ilman yhtäkään
 * laattaa.
 *
 * VIKA PÄÄSI LÄPI, KOSKA TÄLLAISTA VÄITETTÄ EI OLLUT. P7d mittaa
 * yhden zoomiportaan nopealla (paikallisella) yhteydellä, eikä se voi
 * nähdä vikaa: se syntyy vasta kun taso vaihtuu KAHDESTI ennen kuin
 * edellisen tason laatat ovat ehtineet perille. Siksi tässä on kaksi
 * asiaa yhtä aikaa: viive laattavastauksissa ja porras 150 ms:n välein.
 *
 * Näytteenotto on SELAIMEN SISÄLLÄ laudan koordinaateissa, koska
 * getBoundingClientRect pakottaisi asettelun kolmenkymmenen
 * millisekunnin välein ja hidastaisi juuri sitä, mitä mitataan.
 */
console.log('\n--- P7e nopea zoomisarja ---');
const epaonnistuiEnnenP7e = (await mittarit(sivu)).epaonnistui;
laattaViive = 500;
await sivu.evaluate(() => {
  window.__peitot = [];
  window.__vahti = setInterval(() => {
    const ui = window.matkakirja.ui;
    const n = ui.nakyvaAlue?.();
    if (!n?.w) return;
    const laatat = [...(ui.pyramidiKerros?.querySelectorAll('image.pyramidi-laatta') ?? [])]
      .filter((k) => k.dataset.ladattu === '1')
      .map((k) => ({
        x: parseFloat(k.getAttribute('x')),
        y: parseFloat(k.getAttribute('y')),
        w: parseFloat(k.getAttribute('width')),
        h: parseFloat(k.getAttribute('height')),
      }));
    const N = 12;
    let osuu = 0;
    for (let i = 0; i < N; i += 1) {
      for (let j = 0; j < N; j += 1) {
        const x = n.x + ((i + 0.5) / N) * n.w;
        const y = n.y + ((j + 0.5) / N) * n.h;
        if (laatat.some((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h)) osuu += 1;
      }
    }
    window.__peitot.push(osuu / (N * N));
  }, 30);
});
/*
 * SARJA KULKEE MOLEMPIIN SUUNTIIN JA YLI POHJAKERROKSEN RAJAN.
 * Pohja on naulattu tasolle z3 (js/laattapyramidi.js pohjanTaso), joten
 * juuri rajan z3 ↔ z4 ylitys on se kohta, jossa pohja lakkaa olemasta
 * ja tarkasta kerroksesta tulee alin. Pelkkä yhteen suuntaan kulkeva
 * sarja ei kävisi sitä läpi.
 */
for (const suunta of [-1, -1, -1, -1, 1, -1, 1, 1]) {
  await sivu.evaluate((s) => { window.matkakirja.ui.kartta.zoomaaPainikkeella(s); }, suunta);
  await sivu.waitForTimeout(150);
}
await sivu.waitForTimeout(4000);
const peitot = await sivu.evaluate(() => {
  clearInterval(window.__vahti);
  return window.__peitot;
});
laattaViive = 0;
const pieninSarjassa = Math.min(...peitot);
const tyhjia = peitot.filter((p) => p === 0).length;
vaadi('P7e nopea zoomisarja ei jätä karttaa tyhjäksi',
  tyhjia === 0 && pieninSarjassa > 0.5,
  `pienin peitto ${(pieninSarjassa * 100).toFixed(1)} %, tyhjiä näytteitä `
  + `${tyhjia}/${peitot.length}`);
const p7eVirheet = (await mittarit(sivu)).epaonnistui - epaonnistuiEnnenP7e;
console.log(`      mitattu: ${peitot.length} näytettä, pienin peitto `
  + `${(pieninSarjassa * 100).toFixed(1)} %`
  + (p7eVirheet ? ` · sarja kävi ${p7eVirheet} laatassa, joita EI OLE `
    + 'pilottikansiossa (404 kuuluu tähän: kansio kattaa vain osan maailmasta, '
    + 'ja MITAT-osion epäonnistumisluku on siksi tämän verran suurempi)' : ''));
for (let i = 0; i < 4; i += 1) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(600);
}
await sivu.waitForTimeout(2500);

console.log('\n--- P6 paikannimet ---');
const nimitila = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kerros = ui.karttanimiKerros;
  const laput = kerros ? [...kerros.querySelectorAll('text.karttanimi')] : [];
  const korkeus = laput.length
    ? Math.round(laput[0].getBoundingClientRect().height / window.devicePixelRatio * 10) / 10
    : 0;
  const cssKorkeus = laput.length
    ? Math.round(laput[0].getBoundingClientRect().height * 10) / 10
    : 0;
  return {
    nimia: laput.length,
    merkkeja: kerros ? kerros.querySelectorAll('.karttamerkki').length : 0,
    // Vanhat kerrokset eivät saa palata: niissä nimi on laudan
    // yksiköissä ja kasvaa zoomin mukana.
    cityLabel: ui.svg.querySelectorAll('text.city-label').length,
    maastonimi: ui.svg.querySelectorAll('.maastonimi').length,
    // getBoundingClientRect on CSS-pikseleitä; se on juuri se mitta,
    // jonka pitää olla sama joka laitteella.
    cssKorkeus,
    korkeus,
    tuplia: (() => {
      const nahty = new Map();
      for (const l of laput) nahty.set(l.textContent, (nahty.get(l.textContent) ?? 0) + 1);
      return [...nahty.values()].filter((n) => n > 1).length;
    })(),
  };
});
const nimet = await nimitila();
const luetteloNimiot = await sivu.evaluate(async () => {
  const v = await fetch('/julisteet/pyramidi/pyramidi.json').then((r) => r.json()).catch(() => null);
  return v?.nimiot;
});
console.log(`      mitattu: luettelon nimiot=${luetteloNimiot}, `
  + `ladottuja nimiä ${nimet.nimia}, merkkejä ${nimet.merkkeja}, `
  + `nimen korkeus ${nimet.cssKorkeus} CSS-px`);
if (luetteloNimiot === false) {
  vaadi('P6a nimettömien laattojen päälle peli latoo nimet',
    nimet.nimia > 0, `ladottuja ${nimet.nimia}`);
  vaadi('P6b sama nimi vain kerran kerroksessa',
    nimet.tuplia === 0, `tuplia ${nimet.tuplia}`);
  vaadi('P6c nimi on CSS-pikseleissä eikä laitepikseleissä',
    nimet.cssKorkeus >= 9 && nimet.cssKorkeus <= 20,
    `korkeus ${nimet.cssKorkeus} CSS-px`);
} else {
  vaadi('P6a vanhojen laattojen päällä peli ei lado yhtään nimeä',
    nimet.nimia === 0, `ladottuja ${nimet.nimia}`);
}
vaadi('P6d laudan vanhat nimikerrokset pysyvät tyhjinä',
  nimet.cityLabel === 0 && nimet.maastonimi === 0,
  `city-label ${nimet.cityLabel}, maastonimi ${nimet.maastonimi}`);

/* ============ MITAT ================================================= */

/*
 * KEHYSAIKA PANOROINNISSA. Mitataan requestAnimationFramen väleistä
 * samalla kun karttaa raahataan — sama suure kuin karttamittarilla.
 *
 * TÄMÄ ON EMULAATTORILUKU. Raamattu ("BITTIKARTTA VAIHEET 2-3,
 * MITATUT RAJAT") vaatii, että kehysaika mitataan OIKEALLA
 * iOS-LAITTEELLA — emulaattorin perustaso oli harhaanjohtava. Luku on
 * tässä suuntaa antavana, ei päätöksen perustana.
 */
await sivu.evaluate(() => {
  window.__kehykset = [];
  let edellinen = performance.now();
  const askel = () => {
    const nyt = performance.now();
    window.__kehykset.push(nyt - edellinen);
    edellinen = nyt;
    if (window.__kehykset.length < 240) requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);
});
const laatikko = await sivu.evaluate(() => {
  const r = window.matkakirja.ui.mapPane.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await sivu.touchscreen.tap(laatikko.x, laatikko.y).catch(() => {});
for (let i = 0; i < 3; i += 1) {
  await sivu.mouse.move(laatikko.x + 120, laatikko.y);
  await sivu.mouse.down();
  for (let s = 0; s < 12; s += 1) {
    await sivu.mouse.move(laatikko.x + 120 - s * 20, laatikko.y + s * 4);
    await sivu.waitForTimeout(16);
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(400);
}
const kehykset = await sivu.evaluate(() => window.__kehykset ?? []);
const lajiteltu = [...kehykset].sort((a, b) => a - b);
const p50 = lajiteltu[Math.floor(lajiteltu.length * 0.5)] ?? 0;
const p95 = lajiteltu[Math.floor(lajiteltu.length * 0.95)] ?? 0;
const m3 = await mittarit(sivu);

console.log('\nMITAT (emulaattori, iPhone-profiili 390x844 dpr 3)');
console.log(`  taso näkymässä      z${m3.taso}`);
console.log(`  laattoja kiinnitetty ${m3.nakymassa} (karkeaa pohjaa ${m3.karkeita})`);
console.log(`  niistä ruudulla     ${m3.ruudulla}`);
// Ruudun ulkopuolista laattaa selain ei pura ennen kuin se maalataan,
// joten arvio lasketaan ruudulla olevista; vanha kaava on yläraja.
console.log(`  purettu muisti      ${m3.muistiMt} Mt (ruudulla olevat × 512² × 4 tavua`
  + ` · yläraja kaikille kiinnitetyille ${m3.muistiKattoMt} Mt)`);
console.log(`  esiladattu          ${m3.esiladattu} laattaa · jonossa ${m3.esijonossa}`);
console.log(`  laattoja ladattu    ${m3.ladattu} · epäonnistui ${m3.epaonnistui}`);
console.log(`  latausaika          keski ${m3.keskiMs} ms · hitain ${m3.hitainMs} ms`);
console.log(`  päivityksiä         ${m3.paivityksia} · viimeisin ${m3.viimeisinPaivitysMs} ms`);
console.log(`  kehysaika panoroinnissa  p50 ${p50.toFixed(1)} ms · p95 ${p95.toFixed(1)} ms`
  + `  (${kehykset.length} kehystä)`);
console.log(`  pyramidipyyntöjä    ${pyynnot.length}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
