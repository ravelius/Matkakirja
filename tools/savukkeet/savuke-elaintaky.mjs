/*
 * Savuke: ELÄINTÄKY — maan eläin kartalla, kortti ja löytöpalkkio
 * (js/elaintaky.js, js/packs/elaintakyt.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA. Eläintäky on kolmas täkykoneisto eikä
 * kumpikaan vanhoista testeistä osu siihen: fokusvirran savuke ajaa
 * kaupungin annostelukulkua ja täkyportin savuke maapoolin pisteitä,
 * kun taas eläintäky on kartan oma kerros, joka ei tunne kaupunkia
 * lainkaan. Datatesti (tests/elaintakyt.test.mjs) vartioi paikat ja
 * kuvat, mutta ei sitä, syntyykö merkki ruudulle tai maksetaanko
 * palkkio kahdesti — ja juuri palkkion tuplaus olisi vika, jota kukaan
 * ei huomaa ennen kuin punnat eivät täsmää.
 *
 * VARTIOT:
 *   1. MERKIT KARTALLA. Katselutilan Euroopan laudalla kaikki maan
 *      tunnistavat eläintäyt ovat kartan omassa kerroksessa, ja
 *      jokaisen osuma-alue on sormen mitta (≥ 44 px).
 *   2. KORTTI AUKEAA MERKISTÄ, ja siinä on kaanoniteksti, otsikko ja
 *      eläinkuva — kuvan osoite on repon oma assets/elaimet/-tiedosto,
 *      jota EI ole palvelutyöntekijän esilatauksessa.
 *   3. PALKKIO KIRJAUTUU KERRAN. Ensimmäinen avaus kasvattaa
 *      matkakassaa 20 punnalla; toinen avaus ei kasvata sitä
 *      pennilläkään, ja kortti kertoo eläimen jo löytyneen. Merkki jää
 *      kartalle vaimeana.
 *   4. YLEISKUVA ON TYHJÄ. Maailmankartan yleiskuvassa kerros on
 *      piilossa (29 merkkiä peukalonkynnen kokoisessa Euroopassa olisi
 *      ryteikkö) ja lähennettäessä merkit palaavat.
 *   5. KAKSI KUVAA SAMASTA AIHEESTA ON KARUSELLI (omistajan päätös
 *      5.9.2026): kuvia on kaksi, pisteet kertovat määrän, pyyhkäisy
 *      vaihtaa kuvan kumpaankin suuntaan, kuvateksti ja lähderivi
 *      vaihtuvat kuvan mukana, kynnyksen alle jäävä veto ei vaihda
 *      mitään ja suurennos näyttää NYKYISEN kuvan. Yhden kuvan kortti
 *      (osio 2) ei saa karusellia lainkaan.
 *
 * Peli istutetaan kaupunkiin pelitallenteen kautta, kuten muissakin
 * savukkeissa: lentoa ei voi odottaa.
 */
import http from 'node:http';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ELAINTAKY_PALKKIO } from '../../js/elaintaky.js';
import { ELAINTAKY_MAAT } from '../../js/packs/elaintakyt.js';

// Kiertävä lauta piirtää joka merkin kahteen kiertokohtaan. Maiden määrä
// luetaan aineistosta (53 maata 5.9.2026 alkaen: Euroopan ulkopuolinen
// erä toi 24 uutta maata, ks. js/packs/elaintakyt.js).
const SOLMUJA = ELAINTAKY_MAAT.length * 2;

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset/elaintakyt';
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

mkdirSync(KAAPPAUKSET, { recursive: true });

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/** Pelitallenne: Fogg seisoo annetun laudan annetussa kaupungissa. */
function tallenneKaupunkiin(lauta, id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: packById(lauta),
    seed: 11,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi sivu valmiiksi ladattuna annettuun kaupunkiin. */
async function avaaSivu(lauta, kaupunki, { liike = false } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: 1100, height: 900 },
    // Karusellin osio ajetaan liike päällä: 250 ms:n liuku on osa
    // väitettä. Muut osiot mittaavat paikkoja, joille animaatio on
    // pelkkää odotusta.
    reducedMotion: liike ? 'no-preference' : 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, tallenneKaupunkiin(lauta, kaupunki));
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ: kontin selain ei pääse ämpäriin
   * eikä Commonsiin. Eläinkuvat tulevat repon omasta kansiosta eivätkä
   * kulje tämän kautta — juuri se on kuvien koe.
   */
  const PIKSELI = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  return sivu;
}

/** Kartan eläinmerkit: maa, vaimennus, ruutupaikka ja osuma-alueen koko. */
const merkit = (sivu) => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kerros = ui.elaintakyKerros;
  const piilossa = Boolean(kerros?.classList.contains('elaintakyt-piilossa'));
  const ruutu = { w: window.innerWidth, h: window.innerHeight };
  const rivit = [...(kerros?.querySelectorAll('.elaintaky-merkki') ?? [])].map((g) => {
    const osuma = g.querySelector('.elaintaky-osuma');
    const r = osuma?.getBoundingClientRect();
    /*
     * MERKKILINJA (v1353): merkki on kohdemallin viivamerkki nimiöineen
     * (js/fokusnosto-symbolit.js piirraNostosymKartalle) — rasteri
     * kantaa kategorian ja nimiön datamääreissään, ja symboliryhmän
     * ruutumitta kertoo, ettei kartalla ole enää isoa glyyfiä.
     */
    const rasteri = g.querySelector('.elaintaky-symboli image.nostosym-rasteri');
    const symboliRect = g.querySelector('.elaintaky-symboli')?.getBoundingClientRect();
    return {
      nimi: g.getAttribute('aria-label') ?? '',
      lunastettu: g.classList.contains('lunastettu'),
      symboleita: g.querySelectorAll('.elaintaky-symboli image, .elaintaky-symboli path').length,
      viivamerkki: rasteri
        ? { symboli: rasteri.dataset.symboli, nimio: rasteri.dataset.nimio }
        : null,
      symbolinKorkeus: symboliRect?.height ?? 0,
      lapimitta: r?.width ?? 0,
      keski: r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null,
      ruudulla: Boolean(r && r.width > 0 && r.left > 40 && r.top > 40
        && r.right < ruutu.w - 40 && r.bottom < ruutu.h - 40),
    };
  });
  return { piilossa, rivit };
});

/** Auki olevan eläinkortin sisältö, tai null. */
const kortti = (sivu) => sivu.evaluate(() => {
  const k = document.querySelector('.elaintaky-kortti');
  if (!k) return null;
  return {
    ylarivi: k.querySelector('.fokusnosto-ylarivi')?.textContent ?? '',
    otsikko: k.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    teksti: [...k.querySelectorAll('.fokusnosto-teksti p')]
      .map((p) => (p.textContent ?? '').trim()).join(' '),
    kuva: k.querySelector('.elaintaky-kuva img')?.getAttribute('src') ?? '',
    lahde: k.querySelector('.fokusnosto-kuvalahde')?.textContent ?? '',
    kuvaLatautui: Boolean(k.querySelector('.elaintaky-kuva img')?.naturalWidth),
    kuvaPiilossa: Boolean(k.querySelector('.elaintaky-kuva')?.hidden),
    palkkio: k.querySelector('.elaintaky-palkkio')?.textContent ?? '',
    vanha: Boolean(k.querySelector('.elaintaky-palkkio-vanha')),
    karusellia: Boolean(k.querySelector('.elaintaky-karuselli')),
  };
});

const rahat = (sivu) => sivu.evaluate(() => window.matkakirja.ui.game.player.money);

/* --- 1: merkit kartalla (maailmankartta, saapumisen lähikuva) --- */
/*
 * Erän v1348 asti tämä osa ajettiin Euroopan erillislaudalla, jossa
 * koko lauta oli kerralla näkyvissä. Lauta poistui (Raamattu 30.8.2026,
 * "erillislaudasta luovutaan"), joten sama koe tehdään pelin oikealla
 * laudalla: maailmankartta on kiertävä, joten jokainen merkki piirtyy
 * kahteen kiertokohtaan — SOLMUJA solmua (2 × maat). Kaikki mahtuvat
 * laudalle, myös Islanti (lon −19,4), joka
 * vanhalta laudalta jäi pois.
 */
const eu = await avaaSivu('maailmankartta', 'helsinki');
/*
 * KAMERA LEHDEN PERUSTASOLLE, EI NELJÄÄ NAPINPAINALLUSTA
 * (korjattu 31.8.2026).
 *
 * MIKÄ MUUTTUI: v1366 (30.8.2026, "Purun jäänteet korjattu") palautti
 * ui.fokusPohjaBbox/-Rajauksen FOKUS_POHJAT-taulusta, ja sen mukana
 * merkit alkoivat elää KARTAN MITTAKAAVASSA — commit mittasi sen itse:
 * *"skaala x2,837 -> merkki x2,837"*. Sitä ennen eläinmerkki oli
 * ruutumitassa eli yhtä iso joka zoomilla, ja mikä tahansa
 * lähennysporras kelpasi sormenmitan mittapaikaksi.
 *
 * Nyt sormenmitta on luku, joka on tosi YHDESSÄ määrätyssä näkymässä:
 * merkin peruskoko on ankkuroitu maan fokusikkunaan (js/ui.js
 * fokusMerkkiSkaala), ja juuri siihen ikkunaan pelin oma saapumisajo
 * päätyy. Kamera ajetaan siis samaan paikkaan ja samalla tavalla kuin
 * savuke-fokuskohteessa (ajaLehdelle) — sitä lukua vasten 44 px on
 * väite eikä sattuma. Neljä painallusta yleiskuvasta jäi kaksi
 * porrasta perustasoa laajemmalle (mitattu: osuma 27,8 px), eli koe
 * mittasi eri asiaa kuin väite lupasi.
 *
 * Merkkien näkyminen ja piiloutuminen zoomin mukana on osion 4 työ, ja
 * se ajaa portaat painikkeella edelleen.
 */
await eu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.ajaKamera({ bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox, marginaali: 0 });
});
await eu.waitForTimeout(4200);
const kartalla = await merkit(eu);
vaadi('eläinmerkit ovat kartan omassa kerroksessa',
  kartalla.rivit.length === SOLMUJA && !kartalla.piilossa,
  `${kartalla.rivit.length} merkkiä, piilossa=${kartalla.piilossa}`);
vaadi('myös vanhan laudan ulkopuoliset täyt piirtyvät',
  // Turkin täky (Vanjärvi) poistui 1.9.2026 kaksoiskappaleena; Islanti
  // on jäljellä oleva vanhan Euroopan laudan ulkopuolinen merkki.
  kartalla.rivit.some((m) => /Islanti/.test(m.nimi)),
  JSON.stringify([...new Set(kartalla.rivit.map((m) => m.nimi))].slice(0, 6)));
vaadi('jokaisella merkillä on kaiverrettu eläinsymboli',
  kartalla.rivit.every((m) => m.symboleita > 0),
  JSON.stringify(kartalla.rivit.filter((m) => !m.symboleita).map((m) => m.nimi)));
// MERKKILINJA (v1353, omistaja 30.8.2026: pöllöt olivat "aivan liian
// isoja"): merkki on kohdemallin viivamerkki nimiöineen, sama kirjasto
// ja mittakaava kuin muilla kohdemerkeillä (js/fokuskohteet.js).
vaadi('merkki on kohdemallin viivamerkki ja kantaa eläimen nimiön',
  kartalla.rivit.every((m) => m.viivamerkki?.symboli === 'elain'
    && (m.viivamerkki?.nimio ?? '').length > 0),
  JSON.stringify(kartalla.rivit.filter((m) => m.viivamerkki?.symboli !== 'elain'
    || !m.viivamerkki?.nimio).map((m) => m.nimi).slice(0, 5)));
vaadi('merkki on kohdemerkin mittaluokkaa eikä iso glyyfi',
  kartalla.rivit.every((m) => m.symbolinKorkeus > 0
    && m.symbolinKorkeus < m.lapimitta * 0.35),
  JSON.stringify(kartalla.rivit.slice(0, 5)
    .map((m) => `${Math.round(m.symbolinKorkeus)}/${Math.round(m.lapimitta)}`)));
vaadi('jokaisella merkillä on maan ja eläimen nimilappu',
  kartalla.rivit.every((m) => /.+: .+/.test(m.nimi)),
  JSON.stringify(kartalla.rivit.slice(0, 3).map((m) => m.nimi)));
// Sormenmitta LEHDEN PERUSTASOLLA — sama väite ja sama mittapaikka
// kuin savuke-fokuskohteessa ("osuma-alue on lehden perustasolla
// vähintään 44 px"): merkit ovat kartan mittakaavassa (v1366), joten
// lähennettäessä osuma vain kasvaa tästä.
vaadi('osuma-alue on sormen mitta (≥44 px) lehden perustasolla',
  kartalla.rivit.every((m) => m.lapimitta >= 43.5),
  JSON.stringify(kartalla.rivit.map((m) => Math.round(m.lapimitta)).slice(0, 6)));
vaadi('yksikään merkki ei ole vielä lunastettu',
  kartalla.rivit.every((m) => !m.lunastettu), 'uusi peli');

/* --- 2: kortti aukeaa merkistä, kuvineen ja kaanonteksteineen --- */

const kohde = kartalla.rivit.find((m) => m.ruudulla && m.keski);
vaadi('ainakin yksi merkki on ruudulla napautettavissa',
  Boolean(kohde), JSON.stringify(kartalla.rivit.map((m) => m.ruudulla)));
const rahatEnnen = await rahat(eu);
await eu.mouse.click(Math.round(kohde.keski.x), Math.round(kohde.keski.y));
await eu.waitForTimeout(900);
const avattu = await kortti(eu);
vaadi('merkin napautus avaa eläinkortin',
  Boolean(avattu?.otsikko?.length), JSON.stringify(avattu));
vaadi('kortissa on kaanonteksti eikä pelkkä otsikko',
  (avattu?.teksti?.length ?? 0) > 150, `${avattu?.teksti?.length ?? 0} merkkiä`);
// Kohdemallin yhteinen ylärivi (v1348): aihesymboli ja luokan nimi —
// sama rivi kuin kartan kohdekortissa ja täkynostolla.
vaadi('kortin ylärivi on kohdemallin yhteinen (Eläimet)',
  avattu?.ylarivi === 'Eläimet', avattu?.ylarivi);
// v1464: eläinkuvat luetaan ämpäristä (R2_ASSETIT.elaimet), joten kelpaa
// joko repon polku tai ämpärin kohtaamiset/elaimet/-polku — mutta vain
// pelin oma nimeäminen elain-<maa>.jpg, ei Commons-lähdettä. Kuvaputken
// 5.9.2026 toimitus asuu samassa ämpärissä polussa kohtaamiset/
// kuvajono/ ja kantaa oman tunnuksensa (elain-bih-tornjakpentu-vlasic-v2)
// — sekin on pelin oma kuva, joten se kelpaa tässä.
vaadi('kortissa on pelin oma eläinkuva (repo tai ämpäri) ja se latautui',
  (/(^assets\/elaimet\/|\/kohtaamiset\/elaimet\/)elain-[a-z]{3}\.jpg$/
    .test(avattu?.kuva ?? '')
    || /\/kohtaamiset\/kuvajono\/elain-[a-z0-9-]+\.jpg$/.test(avattu?.kuva ?? ''))
  && avattu?.kuvaLatautui && !avattu?.kuvaPiilossa,
  `${avattu?.kuva} latautui=${avattu?.kuvaLatautui}`);
// LÄHDERIVI (v1353, omistaja 30.8.2026: "Kilpikonnilta puuttuu
// lähde"): eläinkuvat ovat pelin omia generoituja kuvia, ja rivi
// kertoo sen samalla sanamuodolla kuin muutkin pelin omat kuvat.
vaadi('kortin kuvalla on näkyvä lähderivi',
  (avattu?.lahde ?? '').length > 5, avattu?.lahde);
// YKSI KUVA EI OLE KARUSELLI (omistajan päätös 5.9.2026): karuselli
// syntyy vasta toisesta kuvasta, ja yhden kuvan kortti on entinen.
vaadi('yhden kuvan kortissa ei ole karusellia',
  avattu?.karusellia === false, JSON.stringify(avattu?.karusellia));

await eu.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-kortti.png') });

/* --- 3: palkkio kirjautuu kerran --- */

const rahatJalkeen = await rahat(eu);
vaadi(`ensimmäinen avaus maksaa ${ELAINTAKY_PALKKIO} puntaa`,
  rahatJalkeen === rahatEnnen + ELAINTAKY_PALKKIO,
  `${rahatEnnen} → ${rahatJalkeen}`);
vaadi('kortti kertoo löytöpalkkion',
  (avattu?.palkkio ?? '').includes(String(ELAINTAKY_PALKKIO)) && !avattu?.vanha,
  avattu?.palkkio);
// Rivi sanoo rahan TULLEEN, ei lupaa etsittävää (omistaja 30.8.2026:
// "löytöpalkkio on epäselvä, että pitääkö vielä etsiä vai tuliko
// palkkio jo") — ja raha on tullut, vartio yllä mittasi kukkaron.
vaadi('palkkiorivi kertoo rahan jo tulleen kukkaroon',
  (avattu?.palkkio ?? '').includes('lisätty kukkaroon'), avattu?.palkkio);

await eu.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await eu.waitForTimeout(600);
const lunastuksenJalkeen = await merkit(eu);
const sama = lunastuksenJalkeen.rivit.find((m) => m.nimi === kohde.nimi);
vaadi('lunastettu merkki jää kartalle vaimeana',
  Boolean(sama?.lunastettu), JSON.stringify(sama));

await eu.mouse.click(Math.round(kohde.keski.x), Math.round(kohde.keski.y));
await eu.waitForTimeout(900);
const uudelleen = await kortti(eu);
vaadi('toinen napautus avaa saman kortin uudelleen',
  uudelleen?.otsikko === avattu?.otsikko, `${uudelleen?.otsikko} vs ${avattu?.otsikko}`);
vaadi('toinen napautus ei tuplaa palkkiota',
  (await rahat(eu)) === rahatJalkeen, `${rahatJalkeen} → ${await rahat(eu)}`);
vaadi('kortti kertoo eläimen jo löytyneen',
  Boolean(uudelleen?.vanha), uudelleen?.palkkio);
await eu.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await eu.context().close();

/* --- 4: maailmankartan yleiskuvassa merkit ovat piilossa --- */

const maailma = await avaaSivu('maailmankartta', 'helsinki');
await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(-1));
await maailma.waitForTimeout(400);
await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(-1));
await maailma.waitForTimeout(1200);
const yleiskuva = await merkit(maailma);
vaadi('maailmankartan yleiskuvassa eläinmerkit ovat piilossa',
  yleiskuva.piilossa, `piilossa=${yleiskuva.piilossa}`);
for (let i = 0; i < 4; i += 1) {
  await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
  await maailma.waitForTimeout(400);
}
await maailma.waitForTimeout(900);
const lahikuva = await merkit(maailma);
/*
 * Maailmankartta on KIERTÄVÄ lauta, joten jokainen merkki piirretään
 * kahteen kiertokohtaan (ui.kiertoKohdat) — SOLMUJA solmua (2 × maat).
 * Kaikki mahtuvat laudalle, myös Islanti.
 */
vaadi('lähennettäessä merkit palaavat kartalle',
  !lahikuva.piilossa && lahikuva.rivit.length === SOLMUJA,
  `piilossa=${lahikuva.piilossa}, ${lahikuva.rivit.length} merkkiä`);
await maailma.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-kartta.png') });
await maailma.context().close();


/* --- 5: kaksi kuvaa samasta aiheesta on karuselli --- */

/*
 * OMISTAJAN PÄÄTÖS 5.9.2026 (Raamattu, "ELAINKUVIIN TARINAA, KAKSI
 * KUVAA SAMASTA AIHEESTA"), sanatarkasti: *"samasta eläinaiheesta voi
 * olla kaksi erilaista hyväksyttyä kuvaa, ja kortilla ne näytetään
 * KARUSELLINA (kuva vaihtuu pyyhkäisyllä kuten lehden alarivin
 * karuselli, pisteet kertovat määrän, kummallakin kuvalla oma
 * kuvateksti)"*.
 *
 * TESTIDATA ELÄÄ VAIN TÄSSÄ SAVUKKEESSA. Kuvaputki ei ole vielä
 * toimittanut yhtään paria, joten toinen kuva tehdään selaimessa
 * samasta repon kuvasta: sivun oma moduuli haetaan dynaamisella
 * tuonnilla (sama moduuli-instanssi kuin pelillä) ja sen tietueeseen
 * kirjoitetaan `kuvat`-lista. Repon data ei muutu tavuakaan.
 *
 * KORTTI AVATAAN avaaElaintaky-funktiolla eikä merkkiä napauttamalla:
 * se on täsmälleen sama sisäänkäynti, jota kartan merkki (osio 2) ja
 * pallolaudan eläintäky (js/pallolauta/nostot.js) käyttävät, ja
 * mittaus kohdistuu näin varmasti siihen maahan, jolle testikuvat
 * pantiin.
 *
 * LIIKE ON PÄÄLLÄ tässä osiossa (muut osiot ajavat reduced motionilla):
 * karusellin liuku on 250 ms, ja väite "kuva vaihtuu pyyhkäisyllä" on
 * tosi vasta kun siirtymä on ehtinyt loppuun.
 */
const KARUSELLIN_MAA = 'FIN';
const kaksikuvainen = await avaaSivu('maailmankartta', 'helsinki', { liike: true });
/*
 * OIKEAT ELÄINKUVAT RUUDULLE TÄSSÄ OSIOSSA. Eläinkuvat luetaan
 * ämpäristä (js/media.js R2_ASSETIT.elaimet), jonne kontti ei pääse,
 * ja avaaSivun yleinen reititys korvaisi ne yhden pikselin kuvalla.
 * Karusellin kaappaus on omistajalle näyte kortista, joten ämpärin
 * osoite tarjoillaan repon omasta tiedostosta — sama kuva, oikea
 * mittasuhde (960 x 640).
 */
await kaksikuvainen.route(/\/kohtaamiset\/elaimet\/elain-[a-z]{3}\.jpg/, (route, pyynto) => {
  const nimi = pyynto.url().match(/elain-[a-z]{3}\.jpg/)[0];
  route.fulfill({
    status: 200,
    contentType: 'image/jpeg',
    body: readFileSync(join(JUURI, 'assets/elaimet', nimi)),
  });
});
await kaksikuvainen.evaluate(async (iso) => {
  const { ELAINTAKYT } = await import('/js/packs/elaintakyt.js');
  ELAINTAKYT[iso].kuvat = [
    {
      tiedosto: ELAINTAKYT[iso].kuva,
      kuvateksti: 'Ensimmäinen testikuva',
      lahde: 'Matkakirjan havainnekuva',
    },
    {
      tiedosto: ELAINTAKYT[iso].kuva,
      kuvateksti: 'Toinen testikuva',
      lahde: 'Matkakirjan havainnekuva',
    },
  ];
}, KARUSELLIN_MAA);
await kaksikuvainen.evaluate(async (iso) => {
  const { avaaElaintaky } = await import('/js/elaintaky.js');
  avaaElaintaky(window.matkakirja.ui, iso);
}, KARUSELLIN_MAA);
await kaksikuvainen.waitForTimeout(700);

/** Karusellin tila kortissa: ruudut, pisteet, kuvateksti ja raidan paikka. */
const karuselli = (sivu) => sivu.evaluate(() => {
  const kehys = document.querySelector('.elaintaky-karuselli');
  if (!kehys) return null;
  const ikkuna = kehys.querySelector('.elaintaky-karuselli-ikkuna');
  const r = ikkuna?.getBoundingClientRect();
  const pisteet = [...kehys.querySelectorAll('.elaintaky-karuselli-piste')];
  const ruudut = [...kehys.querySelectorAll('.elaintaky-karuselli-ruutu')];
  return {
    maara: kehys.dataset.maara ?? '',
    ruutuja: ruudut.length,
    kuvia: ruudut.filter((n) => n.querySelector('img')?.naturalWidth > 0).length,
    pisteita: pisteet.length,
    nykyinen: pisteet.findIndex((p) => p.classList.contains('nykyinen')),
    selite: kehys.querySelector('.fokusnosto-kuvaselite')?.textContent ?? '',
    lahde: kehys.querySelector('.fokusnosto-kuvalahde')?.textContent ?? '',
    // Raidan siirto prosentteina: 0 = ensimmäinen kuva, -100 = toinen.
    siirto: (() => {
      const raita = kehys.querySelector('.elaintaky-karuselli-raita');
      const m = getComputedStyle(raita).transform;
      if (!m || m === 'none') return 0;
      const x = Number(m.slice(m.indexOf('(') + 1, -1).split(',')[4]);
      return r?.width ? Math.round((x / r.width) * 100) : 0;
    })(),
    keski: r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null,
    leveys: r?.width ?? 0,
  };
});

const eka = await karuselli(kaksikuvainen);
vaadi('kaksi kuvaa avaa karusellin, ei kahta kuvaa allekkain',
  eka?.ruutuja === 2 && eka?.maara === '2', JSON.stringify(eka));
vaadi('pisteet kertovat kuvien määrän ja ensimmäinen on nykyinen',
  eka?.pisteita === 2 && eka?.nykyinen === 0, JSON.stringify(eka));
vaadi('ensimmäisen kuvan oma kuvateksti ja lähderivi ovat näkyvissä',
  eka?.selite === 'Ensimmäinen testikuva' && (eka?.lahde ?? '').includes('havainnekuva'),
  `${eka?.selite} · ${eka?.lahde}`);
vaadi('molemmat kuvat latautuivat raitaan',
  eka?.kuvia === 2, `${eka?.kuvia}/2 kuvaa`);

await kaksikuvainen.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-karuselli-1.png') });

/** Vaakapyyhkäisy karusellin ikkunan yli (hiiri = sama osoitinele kuin sormi). */
async function pyyhkaise(sivu, keski, matka) {
  await sivu.mouse.move(Math.round(keski.x), Math.round(keski.y));
  await sivu.mouse.down();
  for (const osa of [0.2, 0.5, 0.8, 1]) {
    await sivu.mouse.move(Math.round(keski.x + matka * osa), Math.round(keski.y));
  }
  await sivu.mouse.up();
  // Liuku on 250 ms; odotetaan sen yli ennen mittausta.
  await sivu.waitForTimeout(600);
}

await pyyhkaise(kaksikuvainen, eka.keski, -Math.round(eka.leveys * 0.4));
const toka = await karuselli(kaksikuvainen);
vaadi('pyyhkäisy vasemmalle vaihtaa toiseen kuvaan',
  toka?.nykyinen === 1 && toka?.siirto === -100, JSON.stringify(toka));
vaadi('kuvateksti ja lähderivi vaihtuvat kuvan mukana',
  toka?.selite === 'Toinen testikuva' && (toka?.lahde ?? '').includes('havainnekuva'),
  `${toka?.selite} · ${toka?.lahde}`);

await kaksikuvainen.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-karuselli-2.png') });

await pyyhkaise(kaksikuvainen, toka.keski, Math.round(toka.leveys * 0.4));
const takaisin = await karuselli(kaksikuvainen);
vaadi('pyyhkäisy oikealle palaa ensimmäiseen kuvaan',
  takaisin?.nykyinen === 0 && takaisin?.siirto === 0
  && takaisin?.selite === 'Ensimmäinen testikuva', JSON.stringify(takaisin));

// Lyhyt veto ei ole pyyhkäisy (kynnys 30 px): kuva jää paikalleen.
await pyyhkaise(kaksikuvainen, takaisin.keski, -12);
const kynnyksenAlla = await karuselli(kaksikuvainen);
vaadi('kynnyksen alle jäävä veto ei vaihda kuvaa',
  kynnyksenAlla?.nykyinen === 0 && kynnyksenAlla?.siirto === 0,
  JSON.stringify(kynnyksenAlla));

// Piste on toinen tie samaan: napautus vie suoraan kuvaan.
await kaksikuvainen.evaluate(() => {
  document.querySelectorAll('.elaintaky-karuselli-piste')[1]?.click();
});
await kaksikuvainen.waitForTimeout(600);
const pisteesta = await karuselli(kaksikuvainen);
vaadi('pisteen napautus vie samaan kuvaan kuin pyyhkäisy',
  pisteesta?.nykyinen === 1 && pisteesta?.selite === 'Toinen testikuva',
  JSON.stringify(pisteesta));

// Suurennos näyttää NYKYISEN kuvan eikä aina ensimmäistä. Napautus on
// oikea hiiren napautus eikä ohjelmallinen click: pyyhkäisyn ja
// napautuksen ero ratkeaa osoitineleessä (js/elaintaky.js estaNapautus).
await kaksikuvainen.mouse.click(
  Math.round(pisteesta.keski.x), Math.round(pisteesta.keski.y),
);
await kaksikuvainen.waitForTimeout(700);
const suurennos = await kaksikuvainen.evaluate(() => {
  const kuva = document.querySelector('.fokuskohde-zoom .fokuskohde-zoomkuva');
  const selite = document.querySelector('.fokuskohde-zoomselite')?.textContent ?? '';
  return { auki: Boolean(kuva), src: kuva?.getAttribute('src') ?? '', selite };
});
vaadi('kortin kuvan napautus avaa suurennoksen nykyisestä kuvasta',
  suurennos.auki && /elain-fin\.jpg/.test(suurennos.src)
  && suurennos.selite === 'Toinen testikuva', JSON.stringify(suurennos));

await kaksikuvainen.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
