/*
 * SELAINSAVUKE: JATKUVA ATLAS JA KEHITTÄJÄN YLÄRIVIN NAPPI
 *
 *   node tools/savuke-atlas.mjs
 *
 * Omistajan tilaus 25.8.2026: fokuskarttapiirros piirretään koko ajan
 * niin, että valmistuneiden maiden lehdet näkyvät kartalla
 * samanaikaisesti — mutta laiskasti näkymän mukaan, koska 39 lehteä on
 * purettuna noin 3,7 gigatavua.
 *
 * Omistajan tilaus 27.8.2026: kehittäjätilan yläpalkissa on VAIN YKSI
 * nappi, "maailma". Se näyttää koko maailmanlaudan ja kohdekaupunkien
 * laatat (ei lento- eikä maareittejä) sekä poistaa sumennuksen ja
 * kartan vieritysrajoitteen. Se korvasi ylärivin "rajat"- ja
 * "pisteet"-napit sekä hampurilaisvalikon fokusmoodi- ja
 * sumennuskytkimet — ja käänsi oletuksen: kehittäjätila on nyt
 * lähtökohtaisesti pelaajan näkymä.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI. Atlaksen valinta lasketaan NÄKYVÄSTÄ
 * ALUEESTA (ui.nakyvaAlue), joka on olemassa vasta kun kartalla on
 * viewBox, zoomi ja paneelin mitat. Sama koskee LRU-vapautusta: se
 * mitataan DOMista, koska juuri DOMista irrottaminen vapauttaa puretun
 * kuvan.
 *
 * LEHDET VÄÄRENNETÄÄN. Ämpärin oikeat webpit ovat 1–2 Mt kappale, eikä
 * savuke saa riippua verkosta. Jokainen fokuslehtipyyntö vastataan
 * samalla pikkuruisella PNG:llä: peli ei katso kuvan sisältöä, vaan
 * kaikki testattava (valinta, laiskuus, vapautus) tapahtuu ennen kuin
 * yhtäkään pikseliä piirretään. Pyynnöt lasketaan, ja juuri niiden
 * määrä on väite: 39:stä lehdestä haetaan vain kourallinen.
 *
 * HUOM VÄÄRENNÖKSEN SIVUVAIKUTUS: koska valelehti on yhden pikselin
 * kokoinen, atlaksen MEGAPIKSELIKATTO (js/fokuskartta.js
 * ATLAS_MEGAPIKSELIA) ei täyty koskaan, ja valinta ottaa enemmän
 * lehtiä kuin oikeilla kuvilla. Savuke todistaa siis valinnan,
 * laiskuuden ja vapautuksen — ei muistibudjetin osumaa. Budjetti on
 * mitattu erikseen (ks. moduulin johdanto: 25,6 Mp ≈ 102 Mt lehti).
 *
 * VÄITTEET:
 *   1. Kohdemaan lehti on kartalla ja saa oman ryhmänsä (.fokus-lehti).
 *   2. Lähikuvassa naapureita ei ladata turhaan.
 *   3. Loitonnettaessa naapurilehdet piirtyvät atlakseen (.fokus-atlas).
 *   4. Laiska lataus: haettujen lehtien määrä on murto-osa kaikista.
 *   5. Näkymästä poistuneet lehdet vapautetaan (LRU).
 *   5b. Vanhaa lautaa ei piirretä lehtien alla — EIKÄ yleiskuvassa;
 *       se palaa vasta kun fokusmoodi sammutetaan (omistajan linjaus
 *       25.8.2026, ilta: vanha kartta kokonaan pois pelin ajaksi).
 *   6. Ylärivissä on VAIN maailmanappi, eikä valikossa ole enää
 *      fokusmoodi- tai sumennuskytkintä.
 *   7. Kehittäjätila on OLETUKSENA pelaajan näkymä: sumu päällä,
 *      liikkuvuusrajoite päällä, käymättömien maiden data piilossa.
 *   8. "maailma" avaa laudan: kaupunkien laatat näkyviin, sumu ja
 *      rajoite pois — mutta reitit pysyvät piilossa (laudan rasteroitu
 *      taide jää atlaksen alle display:none-tilaan).
 *   9. Kaupungin napautus hyppää sinne kehittäjätilassa.
 *  10. Lehti pienenee myös silloin, kun canvas ei osaa kirjoittaa
 *      webpiä (WebKit) — pakkaus menee JPEGille.
 *  11. Häivytetty vuotoreuna latistuu pergamenttiin eikä mustaan:
 *      juuri musta tuotti omistajan iPhonella mustat vaakakaistat
 *      lehtien väliin (26.8.2026).
 *  12. Laudan oma jokiverkko (g.maasto) ei piirry atlasnäkymässä.
 *  13. Kaukozoomissa kartalla on yleislehti eikä yhtäkään maalehteä
 *      (omistajan tilaus 26.8.2026: uloszoomattu kartta näytti
 *      tilkkutäkiltä, koska jokainen maalehti korostaa omaa maataan).
 *  14. Yleislehti myös HAETAAN kaukozoomissa (MAAILMA.webp).
 *  15. Lähizoomiin palatessa maalehdet palaavat — ja yleislehti JÄÄ
 *      pohjakerrokseksi niiden alle (omistajan työpöytäkaappaukset
 *      v1118: lataamattomien maiden kohdalla oli pergamenttia ja
 *      naapurilehtien vuotoa, ei karttaa).
 *  16. Turvatilassa yleislehteä ei haeta eikä piirretä — ei kaukaa
 *      eikä pohjakerroksena.
 *  17. Puuttuva yleislehti palauttaa maalehtien atlaksen — kaukozoom ei
 *      jää tyhjäksi pergamentiksi, jos kuvaa ei ole ämpärissä.
 *  18. Pohjakerros on lähizoomissa DOMissa ja nimenomaan atlaslehtien
 *      ALLA: maalehden on peitettävä pohja omalla alueellaan.
 *  19. Reunaviivaimet päivittyvät panoroinnin aikana lukematta
 *      asettelua.
 *  20. Pelaajan näkymässä pikkulehtiä ei ole lainkaan.
 *  21. Maailmanäkymässä koko lauta ruudulla piirtää KAIKKI valtiot
 *      pikkulehtinä (omistajan tilaus 27.8.2026) — kymmenkertaisesti
 *      enemmän kuin atlaksen säännöt antaisivat — omassa ryhmässään
 *      pohjan päällä ja tarkkojen lehtien alla.
 *  22. Napin sammutus vie pikkulehdet DOMista: juuri irrotus vapauttaa
 *      puretut kuvat.
 */

import { createServer } from 'node:http';
import { deflateSync } from 'node:zlib';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8752, r));

/* Yksivärinen 1 x 1 PNG: kelvollinen kuva, jonka purku ei maksa mitään. */
const PIKKUKUVA = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
);

/*
 * === HÄIVYTETTY VALELEHTI (väitteet 10–11) ===========================
 *
 * Oikeassa lehdessä on häivytetty vuotoreuna: alfa laskee 255:stä
 * nollaan uloimmalla kaistalla, ja juuri se sulattaa lehden reunan
 * pergamenttiin. Yhden pikselin valelehdessä sellaista ei ole, joten
 * viimeiset väitteet tarvitsevat oman kuvansa — ja kuvan on oltava
 * pitkää sivua (3200 px) leveämpi, jotta pienennys ylipäätään lähtee
 * käyntiin (js/fokuskartta.js pienennysMitat).
 *
 * Matala: kaksi riviä riittää todistamaan reunan, eikä 3600 x 8
 * kuormita mitään.
 */
const HAIVE_LEVEYS = 3600;
const HAIVE_KORKEUS = 8;
/** Lehden oma paperinsävy — sama vaalea sävy kuin oikeissa lehdissä. */
const HAIVE_VARI = [231, 217, 185];

/** Pienin mahdollinen PNG-kirjoitin: RGBA, suodatin 0, yksi IDAT. */
function teePng(leveys, korkeus, pikselit) {
  const crcTaulu = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crcTaulu[n] = c;
  }
  const crc = (buf) => {
    let c = -1;
    for (const tavu of buf) c = crcTaulu[(c ^ tavu) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
  const lohko = (tyyppi, data) => {
    const pituus = Buffer.alloc(4);
    pituus.writeUInt32BE(data.length);
    const runko = Buffer.concat([Buffer.from(tyyppi, 'latin1'), data]);
    const summa = Buffer.alloc(4);
    summa.writeUInt32BE(crc(runko));
    return Buffer.concat([pituus, runko, summa]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; // bittisyvyys
  ihdr[9] = 6; // RGBA
  const raaka = Buffer.alloc(korkeus * (1 + leveys * 4));
  for (let y = 0; y < korkeus; y += 1) {
    pikselit.copy(raaka, y * (1 + leveys * 4) + 1, y * leveys * 4, (y + 1) * leveys * 4);
  }
  return Buffer.concat([
    Buffer.from('89504e470d0a1a0a', 'hex'),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka)),
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/** Vaalea lehti, jonka vasen ja oikea reuna häivytetään läpinäkyväksi. */
const HAIVELEHTI = (() => {
  const pikselit = Buffer.alloc(HAIVE_LEVEYS * HAIVE_KORKEUS * 4);
  const haive = 300;
  for (let y = 0; y < HAIVE_KORKEUS; y += 1) {
    for (let x = 0; x < HAIVE_LEVEYS; x += 1) {
      const i = (y * HAIVE_LEVEYS + x) * 4;
      const reunalle = Math.min(x, HAIVE_LEVEYS - 1 - x);
      pikselit[i] = HAIVE_VARI[0];
      pikselit[i + 1] = HAIVE_VARI[1];
      pikselit[i + 2] = HAIVE_VARI[2];
      pikselit[i + 3] = Math.round(255 * Math.min(1, reunalle / haive));
    }
  }
  return teePng(HAIVE_LEVEYS, HAIVE_KORKEUS, pikselit);
})();

/** Kumpi valelehti tarjoillaan; vaihdetaan viimeisiä väitteitä varten. */
let valelehti = PIKKUKUVA;
/*
 * Katkaisin yleislehdelle: kun tämä on päällä, MAAILMA.webp ei vastaa
 * lainkaan. Sillä todistetaan varareitti — puuttuva yleislehti ei saa
 * jättää kaukozoomia tyhjäksi pergamentiksi (väite 17).
 */
let yleislehtiPois = false;

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();

const pyynnot = [];
await sivu.route((url) => /julisteet\/fokus\/.*\.webp(\?|$)/.test(url.href), (route) => {
  /*
   * OSOITTEESSA ON VUOSIKERTA (js/media.js fokuskarttaUrl `?v=`), joten
   * kysely on katkaistava ennen nimeä — muuten pyyntölistaan kertyisi
   * "MAAILMA?v=6" eikä yksikään nimivertailu osuisi. Samasta syystä
   * yllä olevan reitin kuvio ei voi päättyä `.webp$`:ään: juuri se
   * jätti kaikki lehtipyynnöt ulkomaailman katkaisulle, ja savuke
   * kaatui heti ensimmäiseen väitteeseen (mitattu 30.8.2026).
   */
  const nimi = route.request().url().split('/').pop().split('?')[0]
    .replace('.webp', '');
  pyynnot.push(nimi);
  if (nimi === 'MAAILMA' && yleislehtiPois) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: 'image/png',
    // CORS kuten oikeassa ämpärissä: ilman otsaketta lehden tavuja ei
    // saa fetchillä eikä pienennyspolku käynnisty lainkaan
    // (js/fokuskartta.js haeTavut).
    headers: { 'access-control-allow-origin': '*' },
    body: valelehti,
  });
});
// Muu ulkomaailma katkaistaan — mutta EI fokuslehtiä, jotka yllä oleva
// reitti vastaa itse. Playwrightissa myöhemmin rekisteröity reitti
// voittaa, joten poikkeus on kirjoitettava tähän ehtoon.
await sivu.route(
  (url) => !/127\.0\.0\.1|localhost/.test(url.href)
    && !/julisteet\/fokus\/.*\.webp(\?|$)/.test(url.href),
  (route) => route.abort(),
);

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Aloittaa pelin ja siirtää nappulan Ateenaan. */
async function ateenaan() {
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
    await new Promise((r) => setTimeout(r, 2500));
  });
  await sivu.waitForTimeout(1500);
}

await sivu.goto('http://127.0.0.1:8752/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();

const tila = () => sivu.evaluate(() => ({
  oma: window.matkakirja.ui.fokuskarttaAvain,
  lehti: document.querySelectorAll('.fokus-lehti image').length,
  atlas: [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])],
  kuvia: document.querySelectorAll('.fokus-atlas image').length,
}));

const a = await tila();
vaadi('kohdemaan lehti on omassa ryhmässään kartalla',
  a.oma === 'GRC' && a.lehti === 1, JSON.stringify(a));
/*
 * RAJA NOUSI KAHDESTA KOLMEEN v1110:SSÄ, JA SYY ON MITTAUSYMPÄRISTÖSSÄ.
 *
 * Naapureiden määrän ratkaisee megapikselibudjetti, josta nykyisen maan
 * oma lehti syö osansa (js/fokuskartta.js atlasOmaMp). Ennen tätä
 * versiota Kreikan lehteä ei ollut vielä haettu siinä kohtaa, jossa
 * valinta tehtiin, joten budjetista vähennettiin ATLAS_OLETUS_MP eli
 * ARVIO — ja arviolla naapureita mahtui kaksi.
 *
 * Nyt avausruutu esilämmittää kohdemaan pohjan alkukertomuksen aikana
 * (js/ui.js esilammitaAvaus, omistajan tilaus 25.8.2026), joten valinta
 * saa käyttöönsä lehden TODELLISEN koon. Tässä savukkeessa lehti on
 * paikallinen tynkä eli käytännössä nollan megapikselin kokoinen, ja
 * budjettiin mahtuu silloin yksi lisää.
 *
 * OIKEASSA PELISSÄ tilanne on päinvastainen eikä muuttunut lainkaan:
 * mitattuna Kreikan lehti on 25,6 megapikseliä, ja avauslennon jälkeen
 * atlaksessa on nolla naapuria sekä esilämmityksen kanssa että ilman —
 * lento hakee pohjan joka tapauksessa ennen laskeutumista
 * (paivitaFokuskartta). Raja on siis tynkäympäristön luku, ei
 * muistibudjetin löystyminen: budjettia itseään ei ole koskettu.
 */
/*
 * Raja nousi kolmesta viiteen v1116:ssa: maailmassa on nyt 132
 * lehteä, ja Pohjois-Afrikan (DZA, LBY) ja Grönlannin leveät kuvat
 * ulottuvat aidosti Kreikan näkymän ylle. Tynkälehdet ovat ~0 Mp,
 * joten budjetti päästää ne kaikki — oikeassa pelissä megapikseli-
 * budjetti karsii samat lehdet ensimmäisenä.
 */
vaadi('lähikuvassa naapureita ei ladata turhaan',
  a.atlas.length <= 5, `atlas=${a.atlas}`);

/*
 * Kehittäjätila JA MAAILMANÄKYMÄ päälle, jotta kamera pääsee lehden
 * ikkunan ulkopuolelle.
 *
 * PELKKÄ KEHITTÄJÄTILA EI ENÄÄ RIITÄ (omistajan tilaus 27.8.2026).
 * Kehittäjätila oli 25.–27.8. oletuksena vapaa ja "rajat"-nappi pyysi
 * pelaajan rajoitteen takaisin; nyt oletus on pelaajan näkymä ja
 * ylärivin ainoa nappi (maailmanäkymä) pyytää vapauden. Ilman tätä
 * riviä kaukozoomin väitteet mittaisivat 470 yksikön näkymää: kameran
 * uloszoomauksen pohja on maan fokusikkuna (js/kartta.js
 * fokusRajaukset).
 */
/*
 * LAISKUUSLASKURI TALTEEN ENNEN MAAILMANÄKYMÄÄ. Kehittäjän
 * maailmanäkymä hakee tarkoituksella KAIKKI 134 lehteä pikkukuvina
 * (js/fokuskartta.js "MAAILMANÄKYMÄN PIKKULEHDET", oma väitteensä
 * alempana), joten sen jälkeen pyyntölaskuri ei enää mittaa pelaajan
 * polun laiskuutta. Tähän mennessä on ehditty avauslento, saapuminen
 * Ateenaan ja ensimmäinen atlaksen täyttö — juuri se, mitä väite
 * koskee.
 */
const pelaajanPyynnot = [...new Set(pyynnot)];
await sivu.evaluate(() => {
  localStorage.setItem('matkakirja-kehittaja', '1');
  localStorage.setItem('matkakirja-kehittaja-maailma', '1');
  window.matkakirja.ui.paivitaKehittajaTila();
  window.matkakirja.ui.paivitaKehittajaMaailma();
});
await sivu.waitForTimeout(1200);

/** Ajaa kameran kohdemaan ikkunaan kerrottuna ja odottaa asettumista. */
async function loitonna(kerroin) {
  await sivu.evaluate(async (k) => {
    const { ui } = window.matkakirja;
    const p = ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox;
    await ui.kartta.ajaKamera({
      bbox: {
        x: p.x - (p.w * (k - 1)) / 2,
        y: p.y - (p.h * (k - 1)) / 2,
        w: p.w * k,
        h: p.h * k,
      },
      marginaali: 0,
    }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 300));
    ui.paivitaMaastonimet();
  }, kerroin);
  await sivu.waitForTimeout(3000);
}

await loitonna(3);
const b = await tila();
vaadi('loitonnettaessa naapurilehdet piirtyvät atlakseen',
  b.atlas.length >= 1 && b.kuvia === b.atlas.length, `atlas=${b.atlas}`);

/*
 * PYYNNÖT LASKETAAN SIVUN LATAUKSESTA ASTI EIKÄ VAIN TÄSTÄ ELEESTÄ.
 * Väite on laiskuus — 132 lehdestä haetaan vain kourallinen — ja se on
 * totta koko istunnosta. Ennen v1119:ää laskuri nollattiin juuri ennen
 * loitonnusta, jolloin väite riippui siitä, sattuiko jokin lehti
 * saapumaan vasta tässä eleessä: pohjakerroksen myötä purkujono
 * (js/fokuskartta.js jonossa) hakee saman joukon hieman eri
 * järjestyksessä, ja ele saattaa olla kokonaan uusia pyyntöjä vailla.
 */
const haetut = pelaajanPyynnot;
vaadi('laiska lataus: 134 lehdestä haettiin vain näkymän lehdet',
  haetut.length > 0 && haetut.length <= 8, `haetut=${haetut.join(',')}`);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-loitonnettu.png') });

/* --- LRU: näkymästä poistuneet vapautetaan ---
 *
 * NÄKYMÄ PIDETÄÄN KAUKOZOOMIN KYNNYKSEN ALAPUOLELLA (1400 lautayksikköä
 * < 2600, js/fokuskartta.js KAUKOZOOMIN_RAJA). Ajo oli ennen
 * `kerroin: 3`, mikä tällä ruudulla on noin 4000 yksikköä leveä näkymä
 * — sieltä maalehdet purettaisiin kokonaan pois yleislehden tieltä, ja
 * LRU:n väite muuttuisi tyhjäksi (nolla lehteä, nolla ulkopuolella).
 * Kaukozoomi on oma väitteensä alempana.
 */
const c = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const pohjat = (await import('./js/packs/fokus-grc.js')).FOKUS_POHJAT;
  await ui.kartta.ajaKamera({
    bbox: {
      x: 4600, y: 700, w: 1400, h: 900,
    },
    marginaali: 0,
  }, { kesto: 0 });
  await new Promise((r) => setTimeout(r, 600));
  ui.paivitaMaastonimet();
  await new Promise((r) => setTimeout(r, 1500));
  const n = ui.nakyvaAlue();
  // Vara on 30 % näkymän mitasta kumpaankin suuntaan (ATLAS_VARA).
  const vara = {
    x: n.x - n.w * 0.3, y: n.y - n.h * 0.3, w: n.w * 1.6, h: n.h * 1.6,
  };
  const leikkaa = (t) => t.x < vara.x + vara.w && t.x + t.w > vara.x
    && t.y < vara.y + vara.h && t.y + t.h > vara.y;
  const atlas = [...(ui.atlasLehdet?.keys() ?? [])];
  return {
    atlas,
    ulkopuolella: atlas.filter((iso) => !leikkaa(pohjat[iso].bbox)),
    kuvia: document.querySelectorAll('.fokus-atlas image').length,
  };
});
vaadi('LRU vapauttaa näkymästä poistuneet lehdet',
  c.ulkopuolella.length === 0 && c.kuvia === c.atlas.length,
  `atlas=${c.atlas} ulkopuolella=${c.ulkopuolella}`);

/* ===================================================================
 * 13–15. KAUKOZOOMIN YLEISLEHTI (omistajan tilaus 26.8.2026)
 * ===================================================================
 *
 * *"Uloszoomattu maailmankartta näyttää tilkkutäkiltä."* Kaukaa
 * katsottuna kartalla on yksi koko laudan kattava lehti ilman
 * maakorostuksia (tools/tee-yleislehti.mjs), ja maalehdet puretaan
 * siksi aikaa pois — sekä naapurien (.fokus-atlas) että nykyisen maan
 * oma (.fokus-lehti). Juuri purku on palkinto: kaukozoomissa oli ennen
 * neljä tai viisi purettua lehteä, joista yksikään ei näyttänyt
 * yhtään luettavaa yksityiskohtaa.
 *
 * VÄITE MITATAAN DOMISTA, koska DOMista irrottaminen on se, mikä
 * vapauttaa puretun kuvan (sama oppi kuin LRU:lla yllä).
 */
async function nakymaan(bbox) {
  await sivu.evaluate(async (b) => {
    const { ui } = window.matkakirja;
    await ui.kartta.ajaKamera({ bbox: b, marginaali: 0 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 300));
    ui.paivitaMaastonimet();
  }, bbox);
  await sivu.waitForTimeout(3000);
}

const lehtitila = () => sivu.evaluate(() => {
  const kerros = window.matkakirja.ui.fokuskarttaKerros;
  const lapset = [...(kerros?.children ?? [])].map((e) => e.getAttribute('class'));
  return {
    leveys: Math.round(window.matkakirja.ui.nakyvaAlue()?.w ?? 0),
    paalla: Boolean(window.matkakirja.ui.yleislehtiPaalla),
    pohja: Boolean(window.matkakirja.ui.yleislehtiPohja),
    yleis: document.querySelectorAll('.fokus-yleislehti image').length,
    atlas: document.querySelectorAll('.fokus-atlas image').length,
    oma: document.querySelectorAll('.fokus-lehti image').length,
    kirjanpito: window.matkakirja.ui.atlasLehdet?.size ?? 0,
    maa: window.matkakirja.ui.fokuskarttaAvain,
    // Kerrosjärjestys: pohja ennen atlasta ennen omaa lehteä.
    jarjestys: lapset.join('|'),
  };
});

pyynnot.length = 0;
await nakymaan({
  x: 3000, y: 1000, w: 4200, h: 2600,
});
const kauko = await lehtitila();
vaadi('kaukozoomissa yleislehti on kartalla eikä maalehtiä ole DOMissa',
  kauko.leveys > 2860 && kauko.paalla && kauko.yleis === 1
  && kauko.atlas === 0 && kauko.oma === 0 && kauko.kirjanpito === 0,
  JSON.stringify(kauko));
vaadi('kaukozoomissa haetaan yleislehti',
  pyynnot.includes('MAAILMA'), `pyynnot=${[...new Set(pyynnot)].join(',')}`);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-yleislehti.png') });

/*
 * Takaisin lähelle: nykyisen maan lehti palaa kartalle ilman että maa
 * on vaihtunut (js/fokuskartta.js palautaMaalehti). Ikkuna on Kreikan
 * oma rajaus kolminkertaisena eli noin 1400 yksikköä — selvästi
 * kynnyksen alapuolella.
 *
 * YLEISLEHTI EI ENÄÄ POISTU (omistajan työpöytäkaappaukset v1118): se
 * jää POHJAKERROKSEKSI maalehtien alle, jotta lataamattomien maiden
 * kohdalla on oikea maailmankartta eikä pergamenttia ja naapurilehtien
 * vuotoa. Kaukozoomin oma lippu (yleislehtiPaalla) sen sijaan sammuu,
 * koska maalehdet palaavat.
 */
await nakymaan({
  x: 6000, y: 1550, w: 1400, h: 900,
});
const lahi = await lehtitila();
vaadi('lähizoomiin palatessa maalehdet palaavat ja yleislehti jää pohjaksi',
  lahi.leveys < 2340 && !lahi.paalla && lahi.pohja && lahi.yleis === 1
  && lahi.oma === 1 && lahi.maa === 'GRC',
  JSON.stringify(lahi));
/*
 * JÄRJESTYS EIKÄ VIERUSTA (28.8.2026). Väite luki ennen kolme luokkaa
 * peräkkäin samasta merkkijonosta, mutta kerroksessa voi nyt olla
 * niiden VÄLISSÄ kehittäjän maailmanäkymän pikkulehdet
 * (.fokus-maailma, js/fokuskartta.js "MAAILMANÄKYMÄN PIKKULEHDET") —
 * ne ovat pohjan päällä ja tarkkojen lehtien alla. Väitteen sisältö on
 * yhä sama: pohja ennen atlasta ennen omaa lehteä.
 */
const paikka = (luokka) => lahi.jarjestys.split('|').indexOf(luokka);
vaadi('pohjakerros on atlaslehtien ja oman lehden ALLA',
  paikka('fokus-yleislehti') >= 0
  && paikka('fokus-yleislehti') < paikka('fokus-atlas')
  && paikka('fokus-atlas') < paikka('fokus-lehti'),
  lahi.jarjestys);

/* --- 18. ERIKOISPIIRIT (omistaja + päätoimittaja 28.8.2026) ---------
 *
 * Päiväntasaaja, kääntöpiirit, pohjoinen napapiiri ja Greenwichin
 * meridiaani himmeänä kerroksena atlaslehtien päällä
 * (js/fokuskartta.js paivitaErikoispiirit).
 *
 * KOLME VÄITETTÄ:
 *   a) kerros on DOMissa atlasnäkymässä, viisi piiriä nimineen ja
 *      lehtien PÄÄLLÄ (viimeisenä fokuskerroksessa);
 *   b) etelänapapiiri ei ole mukana — se jää laudan ulkopuolelle;
 *   c) kaukozoomissa päiväntasaaja ja Greenwich jäävät yleislehden
 *      poltetun asteverkon varaan, jottei sama viiva piirry kahdesti.
 */
const piirit = () => sivu.evaluate(() => {
  const kerros = document.querySelector('.fokuskartta');
  const g = kerros?.querySelector('.fokus-piirit');
  if (!g) return { on: false };
  const osat = [...g.querySelectorAll('.fokus-piiri')].map((o) => ({
    luokka: [...o.classList].find((c) => c.startsWith('fokus-piiri-')) ?? '',
    piilossa: o.hasAttribute('hidden'),
    nimi: o.querySelector('.fokus-piiri-nimi')?.textContent ?? '',
    viiva: o.querySelector('.fokus-piiri-viiva')?.getAttribute('d') ?? '',
    viivaNakyy: o.querySelector('.fokus-piiri-viiva')?.style.display !== 'none',
  }));
  return {
    on: true,
    viimeisena: kerros.lastElementChild === g,
    lapinakyvyys: Number(getComputedStyle(g).opacity),
    osat,
  };
});
const piiritLahella = await piirit();
const nimet = piiritLahella.osat?.map((o) => o.nimi) ?? [];
vaadi('erikoispiirikerros on atlasnäkymässä lehtien päällä',
  piiritLahella.on && piiritLahella.viimeisena
  && piiritLahella.lapinakyvyys > 0.2 && piiritLahella.lapinakyvyys < 0.5
  && nimet.includes('Päiväntasaaja') && nimet.includes('Kravun kääntöpiiri')
  && nimet.includes('Kauriin kääntöpiiri') && nimet.includes('Pohjoinen napapiiri')
  && nimet.includes('Greenwichin meridiaani'),
  JSON.stringify(piiritLahella));
vaadi('etelänapapiiriä ei piirretä — se jää laudan ulkopuolelle',
  nimet.filter((n) => /napapiiri/.test(n)).length === 1
  && (piiritLahella.osat ?? []).every((o) => !o.piilossa || o.viiva === ''),
  nimet.join(' | '));
vaadi('lähizoomissa päiväntasaajan viiva on kartalla',
  (piiritLahella.osat ?? []).some((o) => o.luokka === 'fokus-piiri-paivantasaaja'
    && o.viivaNakyy && /^M0,/.test(o.viiva)),
  JSON.stringify(piiritLahella.osat?.[0] ?? null));
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-piirit-lahi.png') });

await nakymaan({
  x: 3000, y: 1000, w: 4200, h: 2600,
});
const piiritKaukana = await piirit();
const kaukoOsat = piiritKaukana.osat ?? [];
const etsi = (luokka) => kaukoOsat.find((o) => o.luokka === `fokus-piiri-${luokka}`);
vaadi('kaukozoomissa piirit ovat yhä kartalla mutta tupla jää pois',
  piiritKaukana.on
  && etsi('paivantasaaja')?.viivaNakyy === false
  && etsi('greenwich')?.viivaNakyy === false
  && etsi('kravun')?.viivaNakyy === true
  && etsi('napapiiri')?.viivaNakyy === true,
  JSON.stringify(kaukoOsat.map((o) => [o.luokka, o.viivaNakyy])));
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-piirit-kauko.png') });

/*
 * ETUSIVULLA EI PIIREJÄ. Kerros on atlaksen kerros ja katoaa sen
 * mukana: aloitusruudun taustakartta on maailma sellaisenaan, ei
 * atlas (js/fokuskartta.js atlasPaalla: pickstart-vaihe).
 *
 * TALLENNUS POIS eikä vain käynnistyslaskuri: tallennettu peli
 * palauttaisi latauksen suoraan action-vaiheeseen, eikä etusivua
 * pääsisi katsomaan lainkaan (mitattu: vaihe oli 'action'). Muut
 * avaimet jäävät — kehittäjätilan kytkin on niiden joukossa, ja sitä
 * tarvitaan tämän jälkeen tulevissa väitteissä.
 */
await sivu.evaluate(() => {
  localStorage.removeItem('matkakirja-save-v1');
  localStorage.removeItem('matkakirja-kaynnistykset');
  localStorage.removeItem('matkakirja-atlas-turvatila');
});
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
const etusivulla = await sivu.evaluate(() => ({
  vaihe: window.matkakirja.game.phase,
  piireja: document.querySelectorAll('.fokus-piirit').length,
}));
vaadi('etusivun taustakartalla ei ole erikoispiirejä',
  etusivulla.vaihe === 'pickstart' && etusivulla.piireja === 0,
  JSON.stringify(etusivulla));
await ateenaan();
await nakymaan({
  x: 6000, y: 1550, w: 1400, h: 900,
});

/* --- 19. REUNAVIIVAIMET PÄIVITTYVÄT REAALIAJASSA -------------------
 *
 * Omistajan tilaus 28.8.2026: lukemien on muututtava kesken
 * panoroinnin — eikä silmukka saa lukea asettelua (v1115:n oppi).
 * Väite on tässä savukkeessa eikä fokuskartan omassa, koska viivaimet
 * näkyvät vain fokuspohjan päällä ja vain tämä savuke tarjoilee
 * lehden (valelehti).
 *
 * KAKSI PUOLTA, SAMA VETO:
 *   1. ARVO MUUTTUU. Yläviivaimen merkkien lukemat ja paikat kirjataan
 *      jokaisesta kehyksestä eleen aikana; jos ne laskettaisiin vasta
 *      liikkeen jälkeen, kaikki kehykset olisivat samanlaisia.
 *   2. EI ASETTELUNLUKUJA. getBoundingClientRect kääritään laskuriin
 *      eleen ajaksi. Kartta itse mittaa paneelinsa eleen alussa, joten
 *      raja ei ole nolla vaan kourallinen — viivaimet eivät saa
 *      kasvattaa lukua kehyksissä (30 kehystä × 4 nauhaa olisi satoja).
 *
 * PAIKKA LUETAAN NAUHAN JA MERKIN MUUNNOKSISTA YHDESSÄ (28.8.2026:
 * nauha liukuu kokonaisena, js/fokusmitat.js paivitaNauha). Merkin oma
 * muunnos on sen paikka nauhassa ja nauhan muunnos on koko nauhan
 * liuku; pelaajan näkemä paikka on niiden summa, ja juuri se on tässä
 * väitteen kohde. Pelkkä merkin muunnos mittaisi nykyään ladonnan
 * tiheyttä eikä sitä, seuraako viivain karttaa.
 */
const viivaimet = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const sailio = ui.fokusViivaimet;
  if (!sailio || sailio.hidden) return { nakyy: false };
  const nauha = sailio.querySelector('.fokus-viivain-yla');
  const lue = () => `${nauha.style.transform}|${[...nauha.querySelectorAll('.fokus-viivain-merkki')]
    .filter((m) => m.style.display !== 'none')
    .map((m) => `${m.querySelector('.fokus-viivain-luku').textContent}@${m.style.transform}`)
    .join(',')}`;

  const laskuri = { rect: 0 };
  const alkuRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function kaare(...a) {
    laskuri.rect += 1;
    return alkuRect.apply(this, a);
  };

  const kuvat = [];
  let kaynnissa = true;
  const kehys = () => {
    if (!kaynnissa) return;
    kuvat.push(lue());
    requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);

  const pane = ui.mapPane;
  const r = alkuRect.call(pane);
  const x0 = r.x + r.width / 2;
  const y0 = r.y + r.height / 2;
  const tapahtuma = (laji, x, y) => pane.dispatchEvent(new PointerEvent(laji, {
    bubbles: true, clientX: x, clientY: y, pointerId: 11, buttons: 1,
  }));
  tapahtuma('pointerdown', x0, y0);
  for (let i = 1; i <= 30; i += 1) {
    tapahtuma('pointermove', x0 - i * 7, y0);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((valmis) => requestAnimationFrame(valmis));
  }
  tapahtuma('pointerup', x0 - 210, y0);
  await new Promise((valmis) => setTimeout(valmis, 120));
  kaynnissa = false;
  Element.prototype.getBoundingClientRect = alkuRect;

  const kelvot = kuvat.filter(Boolean);
  return {
    nakyy: true,
    kehyksia: kelvot.length,
    erilaisia: new Set(kelvot).size,
    rect: laskuri.rect,
    ensin: kelvot[0] ?? '',
    lopuksi: kelvot.at(-1) ?? '',
  };
});
vaadi('reunalukemat päivittyvät panoroinnin aikana',
  viivaimet.nakyy && viivaimet.kehyksia > 8 && viivaimet.erilaisia > 5
  && viivaimet.ensin !== viivaimet.lopuksi,
  JSON.stringify({ kehyksia: viivaimet.kehyksia, erilaisia: viivaimet.erilaisia }));
vaadi('viivainsilmukka ei lue asettelua',
  viivaimet.nakyy && viivaimet.rect < 40,
  `getBoundingClientRect ${viivaimet.rect} kertaa ${viivaimet.kehyksia} kehyksellä`);

/* --- vanha lauta pois atlaksen alta (omistajan linjaus 25.8.2026) ---
 *
 * Opaakit lehdet peittävät alueensa kokonaan, mutta laudan oma
 * bittikartta jäi niiden alle piirtymään: karkea pohjataso ja tarkkojen
 * ruutujen sarja. Se maksoi panoroinnissa jokaisesta paljastuvasta
 * kaistaleesta ilman että yksikään pikseli näkyi (mitattu Chromiumissa:
 * pudonneita kehyksiä 10,0 % → 6,1 %).
 *
 * VÄITE ON KAKSIOSAINEN: piirto on pois atlasnäkymässä JA se palaa heti
 * kun näkymä ei enää ole atlas. Pergamentin pohja EI ole piilotettujen
 * joukossa — muuten lehtien ulkopuolelle jäisi paneelin tumma tausta.
 */
const piilotus = await sivu.evaluate(() => {
  const nayta = (sel) => {
    const e = document.querySelector(sel);
    return e ? getComputedStyle(e).display : 'ei ole';
  };
  return {
    luokka: document.body.classList.contains('fokus-atlas-nakyma'),
    staattinen: nayta('.staattinen'),
    pohja: nayta('.taide-pohja'),
    paperi: nayta('.paper-pohja'),
  };
});
vaadi('fokusnäkymässä vanhaa lautaa ei piirretä lehtien alla',
  piilotus.luokka && piilotus.staattinen === 'none'
  && piilotus.paperi !== 'none' && piilotus.paperi !== 'ei ole',
  JSON.stringify(piilotus));

/*
 * YLEISKUVA EI OLE ENÄÄ PALUU VANHAAN LAUTAAN (omistajan linjaus
 * 25.8.2026, ilta: *"Lennon aikana taidetaan käyttää sitä vanhaa
 * karttaa. Vanha kartta pitää ottaa kokonaan pois pelistä
 * toistaiseksi."*).
 *
 * Väite oli tässä päinvastainen: uloszoomatussa yleiskuvassa piilotus
 * väistyi ja lauta piirtyi taas. Juuri se oli omistajan näkemä vika —
 * vanha piirros vilahti pelin aikana. Uusi sopimus: pelilaudalla
 * piilotus on päällä myös yleiskuvassa, ja vanha lauta palaa vasta kun
 * peliä ei enää pelata fokusmoodissa (kytkin pois, aloitusruutu,
 * katselutila, turvatila).
 *
 * KAKSI VÄITETTÄ, KOSKA PIILOTUS ILMAN PALUUTA OLISI YHTÄ PAHA VIKA:
 * kytkimen napautus ei saa jättää ruudulle tyhjää pergamenttia.
 */
const yleiskuva = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.mannerZoom = false;
  document.body.classList.remove('manner-zoom');
  ui.kartta.nollaaAloitusZoom();
  ui.kartta.fitViewBox();
  ui.paivitaMaastonimet();
  await new Promise((r) => setTimeout(r, 300));
  return {
    luokka: document.body.classList.contains('fokus-atlas-nakyma'),
    staattinen: getComputedStyle(document.querySelector('.staattinen')).display,
    paperi: getComputedStyle(document.querySelector('.paper-pohja')).display,
  };
});
vaadi('yleiskuvassakaan vanha lauta ei piirry — pergamentti jää',
  yleiskuva.luokka && yleiskuva.staattinen === 'none' && yleiskuva.paperi !== 'none',
  JSON.stringify(yleiskuva));

const paluu = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  // Fokusmoodin kytkin on atlaksen ensimmäinen ehto (atlasPaalla).
  ui.fokusmoodi = false;
  ui.fokusAvain = null;
  ui.paivitaFokusKerros();
  await new Promise((r) => setTimeout(r, 300));
  return {
    luokka: document.body.classList.contains('fokus-atlas-nakyma'),
    staattinen: getComputedStyle(document.querySelector('.staattinen')).display,
  };
});
vaadi('fokusmoodin sammuttaminen tuo vanhan laudan takaisin',
  !paluu.luokka && paluu.staattinen !== 'none', JSON.stringify(paluu));

/*
 * --- KEHITTÄJÄN HAMMASRATASVALIKKO (omistaja 29.8.2026) -------------
 *
 * Väite oli 25.–27.8.2026 tässä toisin: ylärivissä oli kaksi nappia
 * ("rajat", "pisteet") ja hampurilaisvalikossa kaksi vertailukytkintä
 * (#fokus-btn, #fokus-sumennus-btn), ja kehittäjätila oli OLETUKSENA
 * vapaa — "rajat" pyysi pelaajan rajoitteen takaisin. Omistajan tilaus
 * 27.8. käänsi molemmat: yläpalkissa *"saa olla vain YKSI nappi"*,
 * valikon kytkimet poistuivat, ja oletus on pelaajan näkymä. Nappi on
 * se, joka PYYTÄÄ maailmanäkymän.
 *
 * 29.8.2026 maailmakytkin muutti ylärivin irtonapista kehittäjän omaan
 * hammasratasvalikkoon (#kehittaja-valikko-kotelo). Ylärivissä on yhä
 * yksi kuvake, ja tunniste #kehittaja-maailma-btn on entinen — kytkin
 * vain asuu nyt pudotusvalikossa mittarikytkimen ja pöllön
 * generointinapin seurassa.
 *
 * Sivu uusiksi, jotta main.js näyttää kotelon — ja maailmanäkymä pois
 * levyltä, koska aiemmat väitteet kytkivät sen päälle kameran
 * vapauttamiseksi. Oletustilan mittaaminen on tämän osion ensimmäinen
 * väite, eikä sitä saa mitata edellisen osion jäljiltä.
 */
await sivu.evaluate(() => localStorage.removeItem('matkakirja-kehittaja-maailma'));
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();

const napit = await sivu.evaluate(() => ({
  kotelo: !document.getElementById('kehittaja-valikko-kotelo').hidden,
  ylarivi: document.querySelectorAll('#kehittaja-valikko-kotelo > button').length,
  valikossa: document.querySelectorAll('#kehittaja-valikko .kehittaja-kytkin').length,
  teksti: document.querySelector('#kehittaja-maailma-btn .kehittaja-kytkin-nimi')
    ?.textContent,
  vanhat: Boolean(document.getElementById('fokus-btn')
    || document.getElementById('fokus-sumennus-btn')
    || document.getElementById('fokus-kytkimet')),
}));
vaadi('ylärivissä yksi hammasratas, sen valikossa kolme kehittäjäkytkintä',
  napit.kotelo && napit.ylarivi === 1 && napit.valikossa === 3
  && napit.teksti === 'maailma' && !napit.vanhat,
  JSON.stringify(napit));

/*
 * NELJÄ ASIAA YHDESTÄ NAPISTA: sumennus pois, vieritysrajoite pois,
 * kohdekaupunkien laatat näkyviin — ja reitit EIVÄT tule mukaan.
 * Reittiväite mitataan laudan omasta piilotuksesta: lento- ja
 * maareitit asuvat rasteroidussa taiteessa (.staattinen), joka pysyy
 * atlaksen alla display:none-tilassa myös maailmanäkymässä.
 */
const maailma = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const lue = () => ({
    alue: Boolean(ui.kartta.valloitettuAlue()),
    sumu: ui.fokusSumuPaalla(),
    piilossa: document.querySelectorAll('[data-fokus-maa].fokus-piilossa').length,
    lehdenAlla: document.querySelectorAll('.cities .fokus-lehden-alla').length,
    reitit: getComputedStyle(document.querySelector('.staattinen')).display,
    /*
     * Lehtien reunahäivytys (ks. väite alla). Maskeja on KAKSI ja ne
     * erotetaan tunnisteesta, koska pelkkä olemassaolo ei enää kerro
     * mitään: perillä maalehdillä on vuotomaski aina.
     */
    kuvia: document.querySelectorAll('.fokuskartta-kuva').length,
    maskattu: [...document.querySelectorAll('.fokuskartta-kuva')]
      .filter((k) => k.getAttribute('mask')).length,
    lennonMaski: [...document.querySelectorAll('.fokuskartta-kuva')]
      .filter((k) => k.getAttribute('mask') === 'url(#lento-lehden-haivytys)').length,
    vuodonMaski: [...document.querySelectorAll('.fokuskartta-kuva')]
      .filter((k) => k.getAttribute('mask') === 'url(#lehden-vuotohaivytys)').length,
    // Maalehdet = oman maan lehti ja atlaksen naapurit; yleislehti ja
    // maailmanäkymän pikkulehdet ovat pohjaa (js/fokuskartta.js
    // maalehdenKuva).
    maalehtia: document.querySelectorAll(
      '.fokus-lehti .fokuskartta-kuva, .fokus-atlas .fokuskartta-kuva',
    ).length,
  });
  const ennen = lue();
  document.getElementById('kehittaja-maailma-btn').click();
  return {
    ennen,
    jalkeen: lue(),
    tallessa: localStorage.getItem('matkakirja-kehittaja-maailma'),
    painettu: document.getElementById('kehittaja-maailma-btn').getAttribute('aria-pressed'),
  };
});
/*
 * MAAILMANAPPI OHJAA ENÄÄ KAMERAA (29.8.2026, bittikarttakartan
 * vaihe 2).
 *
 * Väite kuului ennen: pelaajan näkymässä on sumu, kamerarajoite ja
 * käymättömien maiden piilotus; nappi poistaa kaikki kolme. Kaksi
 * niistä poistui pelistä kokonaan omistajan linjauksella:
 * sumennuksesta luovuttiin (js/ui.js fokusSumuPaalla) ja kaikki on
 * näkyvissä alusta (paivitaFokusKerros). Jäljelle jäi KAMERAN RAJAUS
 * — ja se on nyt napin koko merkitys.
 */
vaadi('oletuksena kamera on rajattu fokusikkunaan, sumua ja piilotuksia ei ole',
  maailma.ennen.alue && !maailma.ennen.sumu && maailma.ennen.piilossa === 0,
  JSON.stringify(maailma.ennen));
vaadi('"maailma" vapauttaa kameran ja avaa lehden päältä pelimerkit',
  !maailma.jalkeen.alue && !maailma.jalkeen.sumu && maailma.jalkeen.piilossa === 0
  && maailma.jalkeen.lehdenAlla === 0 && maailma.jalkeen.reitit === 'none'
  && maailma.tallessa === '1' && maailma.painettu === 'true',
  JSON.stringify(maailma));
/*
 * MAAILMANÄKYMÄSSÄ LEHTIEN REUNAT HÄIVYTETÄÄN (omistajan havainto
 * 27.8.2026: maalehden reuna katkeaa kovana yleiskarttaan).
 *
 * Pelaajan fokusnäkymässä maalehti täyttää ruudun eikä sen reunaa ole
 * katsomassa; maailmanäkymässä kamera on kaukana, ja lehden
 * suorakulmainen reuna näkyy kokonaan kerralla tarkkana laikkuna
 * karkean yleiskartan päällä. Sama maski kuin avauslennolla korjaa
 * saman vian (js/fokuskartta.js paivitaLennonLehdet,
 * LENNON_HAIVYTYS_ID).
 *
 * MASKEJA ON KAKSI, JOTEN VÄITE LUKEE TUNNISTEEN (v1263, 28.8.2026:
 * "Lehtisauma pois"). Ennen sitä maski purettiin perillä kokonaan ja
 * tämä väite mittasi pelkkää olemassaoloa (`maskattu === 0`) — nyt
 * lennon leveän häivytyksen tilalle tulee maalehdille VUOTOKAISTAN
 * kapea häivytys, jottei lehti katkea terävään viivaan naapurilehden
 * päälle, ja `maskattu` on perillä 3/4 eikä nolla. Peli on siis oikein;
 * väite oli jäänyt jälkeen. Mitattava ero on maskin LAATU: pelaajan
 * näkymässä ei ole yhtäkään lennon maskia mutta jokaisella maalehdellä
 * on vuotomaski, maailmanäkymässä lennon maski on jokaisella kuvalla
 * (myös pohjalehdillä).
 */
vaadi('maailmanäkymä häivyttää lehtien reunat lennon maskilla, pelaajan näkymässä vain vuotomaski',
  maailma.ennen.kuvia > 0 && maailma.ennen.maalehtia > 0
  && maailma.ennen.lennonMaski === 0
  && maailma.ennen.vuodonMaski === maailma.ennen.maalehtia
  && maailma.ennen.maskattu === maailma.ennen.maalehtia
  && maailma.jalkeen.lennonMaski === maailma.jalkeen.kuvia,
  JSON.stringify({ ennen: maailma.ennen, jalkeen: maailma.jalkeen }));
await sivu.waitForTimeout(600);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-maailma.png') });

const hyppy = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const ennen = game.cityOf()?.id;
  const kohde = game.board.cities.find((c) => c.id === 'sofia') ?? game.board.cities[3];
  const osuma = [...ui.targetLayer.querySelectorAll('.target-hit')]
    .find((o) => Math.abs(Number(o.getAttribute('cx')) - kohde.x) < 1
      && Math.abs(Number(o.getAttribute('cy')) - kohde.y) < 1);
  osuma?.parentElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 2500));
  return { ennen, kohde: kohde.id, jalkeen: game.cityOf()?.id };
});
vaadi('kaupungin napautus hyppää sinne kehittäjätilassa',
  hyppy.jalkeen === hyppy.kohde, JSON.stringify(hyppy));

/* ===================================================================
 * 20–22. MAAILMANÄKYMÄSSÄ KAIKKI VALTIOT PIIRTYVÄT
 * ===================================================================
 *
 * Omistajan iPad-kaappaus 27.8.2026: maailmannapin ollessa päällä
 * kartalla oli maastoineen vain kourallinen valtioita (Ruotsi, Italia,
 * Turkki) ja muu maailma oli pergamenttia. Syy oli se, että
 * maailmanäkymä käytti yhä pelaajan atlaksen valintaa, jonka jokainen
 * sääntö karsii nimenomaan kaukaa katsottaessa — ja koko lauta
 * ruudulla on kaukozoomia, jossa maalehdet puretaan kokonaan pois.
 *
 * Korjaus on oma kerros omalla tarkkuudellaan (js/fokuskartta.js
 * "MAAILMANÄKYMÄN PIKKULEHDET"): kaikki 134 lehteä pikkukuvina
 * pohjan päälle ja tarkkojen lehtien alle.
 *
 * KOLME VÄITETTÄ:
 *   20. Koko lauta ruudulla EI näytä pelaajan näkymässä yhtäkään
 *       maalehteä (kaukozoomi purkaa ne — ennallaan).
 *   21. Sama näkymä maailmannappi päällä piirtää maalehtiä
 *       KYMMENKERTAISESTI enemmän, ja ne ovat omassa ryhmässään
 *       pohjan päällä.
 *   22. Napin sammutus vie ryhmän DOMista — juuri se vapauttaa
 *       puretut kuvat.
 *
 * KOKO LAUTA on 12000 x 5399 yksikköä (js/packs/maailmankartta.js).
 */
const KOKO_LAUTA = {
  x: 0, y: 0, w: 12000, h: 5399,
};

/** Odottaa, että pikkulehtien jono on lakannut kasvamasta. */
async function odotaPikkulehdet(enintaanMs = 60000) {
  const alku = Date.now();
  let edellinen = -1;
  let vakaita = 0;
  while (Date.now() - alku < enintaanMs) {
    // eslint-disable-next-line no-await-in-loop
    const n = await sivu.evaluate(
      () => document.querySelectorAll('.fokus-maailma image').length,
    );
    if (n === edellinen) vakaita += 1;
    else { vakaita = 0; edellinen = n; }
    if (vakaita >= 3 && n > 0) return n;
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(700);
  }
  return edellinen;
}

const maailmanLehdet = () => sivu.evaluate(() => {
  const kerros = document.querySelector('.fokuskartta');
  const luokat = [...(kerros?.children ?? [])].map((e) => e.getAttribute('class'));
  return {
    leveys: Math.round(window.matkakirja.ui.nakyvaAlue()?.w ?? 0),
    pikku: document.querySelectorAll('.fokus-maailma image').length,
    maita: new Set([...document.querySelectorAll('.fokus-maailma image')]
      .map((k) => k.getAttribute('data-maailma-maa'))).size,
    tarkat: document.querySelectorAll('.fokus-atlas image, .fokus-lehti image').length,
    yleis: document.querySelectorAll('.fokus-yleislehti image').length,
    jarjestys: luokat.join('|'),
  };
});

/*
 * PELAAJAN LUKEMA MITATAAN SIELLÄ, MISSÄ PELAAJA VOI OLLA. Kameran
 * uloszoomauksen pohja on maan fokusikkuna (js/kartta.js
 * tarkistaFokusZoom), joten koko lautaa ei pelaajan säännöillä pääse
 * katsomaan lainkaan — napin sammutus vetäisi kameran takaisin maahan
 * kesken mittauksen. Vertailuluku on siis se, mitä kartalla on silloin
 * kun peliä pelataan: nykyisen maan lehti ja atlaksen naapurit.
 */
await sivu.evaluate(() => {
  localStorage.removeItem('matkakirja-kehittaja-maailma');
  window.matkakirja.ui.paivitaKehittajaMaailma();
});
await sivu.waitForTimeout(2500);
const pelaajanKoko = await maailmanLehdet();
vaadi('pelaajan näkymässä pikkulehtiä ei ole lainkaan',
  pelaajanKoko.pikku === 0 && pelaajanKoko.tarkat > 0,
  JSON.stringify(pelaajanKoko));

await sivu.evaluate(() => {
  localStorage.setItem('matkakirja-kehittaja-maailma', '1');
  window.matkakirja.ui.paivitaKehittajaMaailma();
});
await sivu.waitForTimeout(500);
await nakymaan(KOKO_LAUTA);
const piirretty = await odotaPikkulehdet();
const maailmanKoko = await maailmanLehdet();
vaadi('maailmanäkymässä piirtyy maalehtiä enemmän kuin normaalitilassa',
  maailmanKoko.leveys > 8000
  && maailmanKoko.pikku > pelaajanKoko.pikku + pelaajanKoko.tarkat
  && maailmanKoko.pikku >= 100 && maailmanKoko.maita === maailmanKoko.pikku,
  `pelaajalla ${pelaajanKoko.pikku + pelaajanKoko.tarkat}, maailmanäkymässä ${piirretty}`);
vaadi('pikkulehdet ovat omassa ryhmässään pohjan päällä ja tarkkojen alla',
  maailmanKoko.jarjestys.split('|').indexOf('fokus-yleislehti')
    < maailmanKoko.jarjestys.split('|').indexOf('fokus-maailma')
  && maailmanKoko.jarjestys.split('|').indexOf('fokus-maailma')
    < maailmanKoko.jarjestys.split('|').indexOf('fokus-atlas'),
  maailmanKoko.jarjestys);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-maailmanlehdet.png') });

const sammutus = await sivu.evaluate(async () => {
  document.getElementById('kehittaja-maailma-btn').click();
  await new Promise((r) => setTimeout(r, 600));
  return {
    ryhmia: document.querySelectorAll('.fokus-maailma').length,
    pikku: document.querySelectorAll('.fokus-maailma image').length,
    // Lennon maskin on lähdettävä näkymän mukana (ks. maskiväite yllä).
    lennonMaski: [...document.querySelectorAll('.fokuskartta-kuva')]
      .filter((k) => k.getAttribute('mask') === 'url(#lento-lehden-haivytys)').length,
  };
});
vaadi('napin sammutus vie pikkulehdet DOMista (purettu kuva vapautuu) ja purkaa lennon maskin',
  sammutus.ryhmia === 0 && sammutus.pikku === 0 && sammutus.lennonMaski === 0,
  JSON.stringify(sammutus));

/* ===================================================================
 * 10–11. ALFATON PAKKAUS EI SAA JÄTTÄÄ MUSTAA (omistajan pelitesti
 *        26.8.2026, iPhone v1116)
 * ===================================================================
 *
 * Puhelimessa lehti pienennetään canvasille, ja WebKit ei kirjoita
 * canvasista webpiä — pakkaus menee JPEGille, jossa ei ole alfaa.
 * HTML:n spesifikaatio latoo alfattoman kuvan MUSTAA vasten, joten
 * lehden häivytetty vuotoreuna muuttui mustaksi: ruudulle tuli mustia
 * vaakakaistoja lehtien väliin ja lennolla lehti loppui terävään
 * suorakulmaan. Korjaus pohjustaa canvasin pergamentin sävyllä ennen
 * piirtoa (js/fokuskartta.js canvasille, js/mapart.js paperinSavy).
 *
 * VÄITE MITATAAN PIKSELEISTÄ eikä ulkoasusta: kartalle päätynyt
 * blob-osoite luetaan takaisin canvasille ja katsotaan, mitä lehden
 * uloimmassa pikselissä on. Ennen korjausta siellä oli musta.
 *
 * Sivu ladataan uudelleen, koska sekä webp-tuki että lehtivarasto ovat
 * moduulitason muistia — ne nollautuvat vain uuden dokumentin myötä.
 */
valelehti = HAIVELEHTI;
await sivu.addInitScript(() => {
  // iOS:n jäljitelmä: canvas ei osaa kirjoittaa webpiä.
  const alkuUrl = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function (tyyppi, ...loput) {
    if (String(tyyppi).includes('webp')) return alkuUrl.call(this, 'image/png');
    return alkuUrl.call(this, tyyppi, ...loput);
  };
  if (typeof OffscreenCanvas === 'function') {
    const alkuBlob = OffscreenCanvas.prototype.convertToBlob;
    OffscreenCanvas.prototype.convertToBlob = function (asetukset = {}) {
      if (String(asetukset.type).includes('webp')) {
        return Promise.reject(new Error('ei webpiä'));
      }
      return alkuBlob.call(this, asetukset);
    };
  }
});
/*
 * KÄYNNISTYSLASKURI NOLLAAN ENNEN KOLMATTA LATAUSTA. Peli sytyttää
 * atlaksen turvatilan, jos sivu käynnistyy kolmesti neljässä
 * minuutissa (js/main.js kirjaaKaynnistys) — savukkeen omat lataukset
 * täyttäisivät ehdon, ja turvatilassa atlasta ei ole testattavaksi.
 */
await sivu.evaluate(() => {
  localStorage.removeItem('matkakirja-kaynnistykset');
  localStorage.removeItem('matkakirja-atlas-turvatila');
});
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();
await sivu.waitForTimeout(3000);

const reuna = await sivu.evaluate(async () => {
  const kuva = document.querySelector('.fokus-lehti image, .fokus-atlas image');
  const osoite = kuva?.getAttribute('href') ?? '';
  if (!osoite.startsWith('blob:')) return { blob: false, osoite: osoite.slice(0, 40) };
  const lehti = new Image();
  lehti.src = osoite;
  await lehti.decode();
  const canvas = document.createElement('canvas');
  canvas.width = lehti.naturalWidth;
  canvas.height = lehti.naturalHeight;
  const ctx2 = canvas.getContext('2d');
  ctx2.drawImage(lehti, 0, 0);
  const nappaa = (x) => [...ctx2.getImageData(x, 0, 1, 1).data].slice(0, 3);
  return {
    blob: true,
    leveys: canvas.width,
    vasen: nappaa(0),
    oikea: nappaa(canvas.width - 1),
    keski: nappaa(Math.floor(canvas.width / 2)),
  };
});
const vaalea = (v) => Array.isArray(v) && v.every((k) => k > 140);
vaadi('pienennetty lehti syntyy myös ilman webp-tukea',
  reuna.blob === true && reuna.leveys > 0, JSON.stringify(reuna));
vaadi('häivytetty reuna latistuu pergamenttiin — ei mustaa kaistaa',
  vaalea(reuna.vasen) && vaalea(reuna.oikea) && vaalea(reuna.keski),
  JSON.stringify(reuna));

/*
 * 12. VANHAN LAUDAN JOKIVERKKO EI PIIRRY ATLAKSEN ALLA.
 *
 * Omistaja epäili mustien kaistojen seurassa näkyvää ohutta jokiverkkoa
 * vanhan laudan jäänteeksi (joet ovat laudalla g.maasto → g.iso-joet,
 * js/mapart.js drawMaasto). Väite pitää tuon epäilyn koneellisesti
 * poissa: atlasnäkymässä yksikään laudan piirroskerros ei saa olla
 * ruudulla. Ruudulla näkyvä jokiverkko on lehtien omaa vuotoaluetta.
 */
const jokikerros = await sivu.evaluate(() => {
  const kerrokset = ['.iso-joet', '.maasto', '.landmass', '.waves', '.graticule'];
  const nakyvat = [];
  for (const valitsin of kerrokset) {
    for (const e of document.querySelectorAll(valitsin)) {
      const laatikko = e.getBoundingClientRect();
      if (laatikko.width > 0 || laatikko.height > 0) nakyvat.push(valitsin);
    }
  }
  return { luokka: document.body.classList.contains('fokus-atlas-nakyma'), nakyvat };
});
vaadi('atlasnäkymässä laudan jokiverkko ei piirry',
  jokikerros.luokka && jokikerros.nakyvat.length === 0, JSON.stringify(jokikerros));

/*
 * 17. PUUTTUVA YLEISLEHTI PALAUTTAA MAALEHTIEN ATLAKSEN.
 *
 * Sääntö 1 (js/fokuskartta.js): puuttuva kuva ei riko mitään. Jos
 * MAAILMA.webp ei ole ämpärissä — uusi versio ennen kuvan vientiä,
 * katkaisija pois päältä, verkko poikki — kaukozoom EI saa jäädä
 * tyhjäksi pergamentiksi, vaan sen on palattava maalehtiin kuten ennen
 * tätä pakettia. Varasto on moduulitason muistia, joten puute luetaan
 * uudelleen vasta uudessa dokumentissa: sivu ladataan uusiksi.
 */
valelehti = PIKKUKUVA;
yleislehtiPois = true;
await sivu.evaluate(() => {
  localStorage.removeItem('matkakirja-kaynnistykset');
  localStorage.removeItem('matkakirja-atlas-turvatila');
  /*
   * MAAILMANÄKYMÄ TAKAISIN PÄÄLLE KAMERAA VARTEN. Väite mitataan 4200
   * yksikön näkymässä, ja pelaajan säännöillä uloszoomauksen pohja on
   * maan fokusikkuna (js/kartta.js tarkistaFokusZoom): ilman tätä
   * riviä nakymaan() jäisi 470 yksikköön eikä kaukozoomia edes
   * saavutettaisi. Nappi sammutettiin edellisessä osiossa
   * (pikkulehtien vapautusväite).
   */
  localStorage.setItem('matkakirja-kehittaja-maailma', '1');
});
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();
await nakymaan({
  x: 3000, y: 1000, w: 4200, h: 2600,
});
await sivu.waitForTimeout(2000);
const varareitti = await lehtitila();
vaadi('puuttuva yleislehti palauttaa maalehtien atlaksen',
  varareitti.leveys > 2860 && varareitti.yleis === 0 && varareitti.atlas > 0,
  JSON.stringify(varareitti));

/*
 * === 23.–25. JÄTTILÄISLEHTI VÄISTÄÄ — MUTTA VAIN SUURENNETTUNA ======
 *
 * js/fokuskartta.js "SAMA JÄTTILÄINEN OMANA LEHTENÄ". Mitattu
 * 30.8.2026 oikeilla ämpärin lehdillä: Moskovassa seisovan pelaajan
 * atlaksessa oli NOLLA lehteä, koska Venäjän 7504 yksikön levyinen
 * oma lehti varasi ahneelta valinnalta jokaisen peittoruudun — ja
 * ruudulla oli sen 0,85 kuvapikseliä yksikköä kohti, kun Ukrainan
 * lehti antaa 6,0 ja Valko-Venäjän 10,1.
 *
 * Väisto on kaksiehtoinen, ja juuri se on tässä mitattava: karkea
 * lehti EI väistä silloin, kun näkymä on sitä kauempana — silloin se
 * on ruutua tarkempi ja piirtää oman maastonsa ja omat nimensä.
 *
 * Ruutu on 430 px leveä, joten Venäjän lehden oma tarkkuus vastaa noin
 * 504 lautayksikön näkymää: 400 suurentaa, 2000 ei.
 */
yleislehtiPois = false;
await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'moskova' };
  game.world.visited.add('moskova');
  game.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 1500));
});
await sivu.waitForTimeout(1500);

const kerrostila = () => sivu.evaluate(() => {
  const kerros = window.matkakirja.ui.fokuskarttaKerros;
  const luokat = [...(kerros?.children ?? [])].map((e) => e.getAttribute('class') ?? '');
  return {
    oma: window.matkakirja.ui.fokuskarttaAvain,
    vaisto: Boolean(window.matkakirja.ui.omaLehtiVaistaa),
    skaala: Number((window.matkakirja.ui.nakyvaAlue()?.skaala ?? 0).toFixed(3)),
    atlasIndeksi: luokat.indexOf('fokus-atlas'),
    lehtiIndeksi: luokat.indexOf('fokus-lehti'),
    atlas: [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])],
  };
});

await nakymaan({
  x: 6900, y: 1050, w: 400, h: 860,
});
const lahella = await kerrostila();
vaadi('Venäjän lehti väistää suurennettuna ja päästää naapurit atlakseen',
  lahella.oma === 'RUS' && lahella.vaisto && lahella.atlas.length > 0
  && lahella.atlasIndeksi > lahella.lehtiIndeksi, JSON.stringify(lahella));

await nakymaan({
  x: 6100, y: 700, w: 2000, h: 1240,
});
const kaukana = await kerrostila();
vaadi('...mutta ei väistä silloin kun se on ruutua tarkempi',
  kaukana.oma === 'RUS' && !kaukana.vaisto
  && kaukana.lehtiIndeksi > kaukana.atlasIndeksi, JSON.stringify(kaukana));

await ateenaan();
await nakymaan({
  x: 6500, y: 1780, w: 400, h: 860,
});
const kreikka = await kerrostila();
vaadi('tavallinen lehti on yhä atlaksen päällä myös lähikuvassa',
  kreikka.oma === 'GRC' && !kreikka.vaisto
  && kreikka.lehtiIndeksi > kreikka.atlasIndeksi, JSON.stringify(kreikka));

/*
 * 16. TURVATILASSA EI HAETA YLEISLEHTEÄKÄÄN.
 *
 * Turvatila on vakuutus muistikuolemaa vastaan (js/fokuskartta.js
 * atlasTurvatila): kun sivu on käynnistynyt monta kertaa parissa
 * minuutissa, yhtäkään isoa kuvaa ei pureta ja peli näyttää laudan
 * oman pergamentin. Yleislehti on niistä kuvista suurin — 6400 x 2879
 * — joten sen on jäätävä pois nimenomaan siellä. Turvatila on
 * moduulitason muistia, joten se luetaan vain uuden dokumentin
 * yhteydessä: siksi sivu ladataan uudelleen lippu päällä.
 */
await sivu.evaluate(() => {
  localStorage.setItem('matkakirja-atlas-turvatila', String(Date.now()));
});
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();
pyynnot.length = 0;
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  await ui.kartta.ajaKamera({
    bbox: {
      x: 3000, y: 1000, w: 4200, h: 2600,
    },
    marginaali: 0,
  }, { kesto: 0 });
  await new Promise((r) => setTimeout(r, 300));
  ui.paivitaMaastonimet();
});
await sivu.waitForTimeout(3000);
const turva = await sivu.evaluate(() => ({
  turvatila: Boolean(localStorage.getItem('matkakirja-atlas-turvatila')),
  yleis: document.querySelectorAll('.fokus-yleislehti image').length,
  lehtia: document.querySelectorAll('.fokus-atlas image, .fokus-lehti image').length,
  lauta: getComputedStyle(document.querySelector('.staattinen')).display,
}));
vaadi('turvatilassa yleislehteä ei haeta eikä piirretä',
  turva.turvatila && turva.yleis === 0 && turva.lehtia === 0
  && !pyynnot.includes('MAAILMA') && turva.lauta !== 'none',
  `${JSON.stringify(turva)} pyynnot=${[...new Set(pyynnot)].join(',')}`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
