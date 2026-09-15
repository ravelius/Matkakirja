/*
 * Savuke: puhelimen tekstipiilotus, Liiku-neliö ja luennan huntu.
 *
 * Omistajan tilaukset (Raamattu "IPHONE: ISOISAN JA PULUN TEKSTIT
 * PIILOON" ja tarkennukset 14.9.2026), sanatarkasti:
 *
 *   *"Iphonella voisi piilottaa isoisan ja pulun tekstit. Lisaksi
 *   piilota tuo liiku nappi luennan ajaksi. Se voisi olla lisaksi
 *   vahan huomaamattomampi nakyessaan."*
 *
 *   *"Liiku nappi voisi siirtya vas. alareunaan nelion muotoiseksi
 *   symboliksi ilman varikorostusta. Kun aarre on loytynyt nappi
 *   voisin laajentua liiku napiksi … Nappi voisi kutistua jonkin ajan
 *   kuluttua sitten takaisin pelkaksi nelio symbooli napiksi."*
 *
 *   *"Luennan aikana kun kuvat nakyvat, kartta tausta voisi olla
 *   tummempi ja vahan blurri. Myos kaupunki esittelyssa taustaa voisi
 *   pehmentaa mutta vaalentaa hieman samaan savyyn kuin nyt tulevassa
 *   Luennan taustassa."*
 *
 *   *"Luennan aikana matkakirjan ylarivin reunassa voisi sykkia
 *   kevyesti kaiuttimen kuva merkiksi etta luenta on kaynnissa. Pulun
 *   luennassa riittaa pulun elehtiminen ajamaan saman asian."*
 *
 * VARTIOT (jokaisella VASTAKOE — sääntö on turha, jos se pätee myös
 * silloin kun sen ei pitäisi):
 *   1. Puhelimella matkakirja on lappu eikä merkinnän teksti näy;
 *      TYÖPÖYDÄLLÄ kortti on auki ja teksti näkyy (vastakoe) — paitsi
 *      LUENNAN AIKANA, jolloin tekstipiilo koskee kaikkia laitteita
 *      (omistaja 15.9.2026, ks. työpöytäosion loppu). Epäonnistunut
 *      play() ei kuitenkaan piilota mitään: merkit seuraavat KUULUVAA
 *      ääntä, eivät varattua puheenvuoroa (vastakoe samassa osiossa).
 *   2. Lapun napautus avaa merkinnän — teksti ei ole peruuttamattomasti
 *      poissa. Kaiutin (mykistys ja luennan merkki) jää lapulle.
 *   3. Kuva ja kuvateksti näkyvät puhelimella molemmissa suunnissa.
 *   4. Liiku on 44 × 44 neliö ruudun vasemmassa alanurkassa, ei
 *      kullattu, symboli näkyy ja sana on piilossa.
 *   5. Liiku ei osu pulun nappiin.
 *   6. Luennan ajan Liiku on display:none (ei pelkkä opacity);
 *      luennan jälkeen se palaa (vastakoe). Mykistettynä nappi näkyy
 *      heti, koska kukaan ei ole äänessä.
 *   7. Aarteen löytyessä nappi laajenee ja sana tulee näkyviin;
 *      LIIKU_LAAJENNUS_MS:n jälkeen se kutistuu takaisin (vastakoe).
 *   8. Luennan huntu on kartalla kertojan puhuessa ja poissa sen
 *      jälkeen (vastakoe); huntu on kuvan ALLA (z-index < kuvan 5).
 *   9. Kaupunkietusivun huntu on VAALEAMPI kuin luennan huntu
 *      (pikselivertailu) ja sumennus on sama luokka.
 *  10. Kaiuttimen VU-mittari elää kertojan luennassa ja sammuu sen
 *      jälkeen (merkki vaihtui sykkeestä mittariksi 15.9.2026, #2504)
 *      (vastakoe); pulun repliikki ei sytytä sykettä.
 *
 * Peli istutetaan Ateenaan pelitallenteen kautta samalla tavalla kuin
 * savuke-fokusvirta.mjs:ssä. Äänitteet eivät lataudu kontissa, joten
 * puhuja merkitään suoraan luennan omalla rajapinnalla
 * (merkitsePuhuja / vapautaPuhuja) — luentalogiikkaa ei muuteta,
 * savuke vain käyttää sitä.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { LIIKU_LAAJENNUS_MS } from '../../js/ui.js';

/*
 * EI ?lauta=kartta. Vanha kartta on pois käytöstä (omistaja 7.9.2026),
 * ja nämä vartiot koskevat nykyistä lautaa: mitattavat pinnat ovat
 * matkakirjakortti, toimintorivin Liiku ja kartan huntu, jotka ovat
 * samat lautavalinnasta riippumatta.
 */

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
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

/*
 * KUINKA KAUAN VAHDIN VAPAUTUSTA ODOTETAAN.
 *
 * js/ui.js:n luentavahti päästää napin esiin vasta VÄLIRAUHAN jälkeen
 * (LUENNAN_VALIRAUHA_MS = 1300 ms) ja kysyy tilaa 200 ms:n välein, eli
 * vapautus näkyy noin 1,5 sekunnissa. Odotus oli 2500 ms, ja se oli
 * liian tiukka: kun kontissa ajoi rinnakkain muita raskaita prosesseja,
 * kysely myöhästyi ja kaksi vartiota kaatui ilman että pelissä oli
 * mitään vikaa (mitattu 14.9.2026 — vahti itse vapautti napin 1,5
 * sekunnissa samassa kontissa). Neljä sekuntia on yhä murto-osa
 * varaventtiilistä (30 s), joten aito jumi kaatuisi vartion silti.
 */
const LUENNAN_VAPAUTUKSEN_ODOTUS_MS = 4000;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

/*
 * Kuvapalvelin korvataan pikselillä ja luentapalvelin katkaistaan:
 * savuke mittaa asettelua, ei verkkoa (sama sopimus kuin muissa
 * savukkeissa).
 */
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const avaa = async (asetukset) => {
  const konteksti = await selain.newContext(asetukset);
  await konteksti.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await konteksti.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (r) => r.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  // Kontti ei pääse ulkoverkkoon: muu ulkoinen liikenne katkaistaan,
  // jottei sivun latausvahti jää odottamaan aikakatkaisua.
  await sivu.route('**/*', (r) => (r.request().url().startsWith('http://localhost')
    ? r.continue() : r.abort()));
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForTimeout(3000);
  // Saapuminen Ateenaan: merkintä korttiin ja isoisän kuva kartalle.
  await sivu.evaluate(async () => {
    const { avaaFokusvirta, naytaLuentakuva } = await import('/js/fokusvirta.js');
    const ui = window.matkakirja.ui;
    delete ui.game.fokusvirrat['maailmankartta:ateena'];
    ui.fokusvirtaKortti?.remove();
    ui.fokusvirtaKortti = null;
    ui.factKey = null;
    ui.render();
    avaaFokusvirta(ui, ui.game.cityOf());
    naytaLuentakuva(ui, ui.game.cityOf());
  });
  await sivu.waitForTimeout(2500);
  return { konteksti, sivu };
};

/*
 * Kertoja ääneen / vaikenemaan luennan omalla rajapinnalla.
 *
 * ÄÄNEN PITÄÄ MYÖS KUULUA (15.9.2026). Pelkkä merkitsePuhuja varaa
 * vain puheenVUORON, eivätkä luennan näkyvät merkit enää seuraa sitä —
 * ne seuraavat kuuluvaa ääntä (js/luenta.js soivaPuhuja/aaniKuuluu).
 * Savuke simuloi siis onnistuneen toiston samoilla merkeillä, jotka
 * selain antaa: `paused` epätodeksi ja 'playing'-tapahtuma. Ilman tätä
 * savuke mittaisi tilaa, jota pelissä ei ole.
 */
const puhu = (sivu, rooli = 'kertoja') => sivu.evaluate(async (r) => {
  const L = await import('/js/luenta.js');
  const audio = new Audio();
  window.__savukkeenPuhe = audio;
  L.merkitsePuhuja(window.matkakirja.ui, audio, r);
  Object.defineProperty(audio, 'paused', { value: false, configurable: true });
  audio.dispatchEvent(new Event('playing'));
}, rooli);
const vaikene = (sivu) => sivu.evaluate(async () => {
  const L = await import('/js/luenta.js');
  L.vapautaPuhuja(window.matkakirja.ui, window.__savukkeenPuhe);
});

/** Yksi mittaus: kortti, kuva, nappi, huntu ja kaiutin. */
const mittaa = () => {
  const laatikko = (q) => {
    const r = document.querySelector(q)?.getBoundingClientRect();
    return r ? {
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
    } : null;
  };
  const nappi = document.querySelector('.monitoimi-nappi');
  const tyyli = nappi ? getComputedStyle(nappi) : null;
  const nb = laatikko('.monitoimi-nappi');
  const pb = laatikko('.pollo-nappi');
  const osuu = Boolean(nb && pb && nb.x < pb.x + pb.w && pb.x < nb.x + nb.w
    && nb.y < pb.y + pb.h && pb.y < nb.y + nb.h);
  const kartta = document.querySelector('.map-pane');
  const huntu = kartta ? getComputedStyle(kartta, '::after') : null;
  const kaiutin = document.getElementById('fact-kuuntele');
  const kr = kaiutin?.getBoundingClientRect();
  return {
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
    factPieni: Boolean(document.querySelector('.fact-card')?.classList.contains('pieni')),
    factTekstiNakyy: (() => {
      const r = document.getElementById('fact-text')?.getBoundingClientRect();
      return Boolean(r && r.width > 4 && r.height > 4);
    })(),
    kaiutinNakyy: Boolean(kr && kr.width > 2 && kr.height > 2),
    kaiutinSyke: kaiutin ? getComputedStyle(kaiutin).animationName : null,
    /*
     * LUENNAN MERKKI ON NYT VU-MITTARI, EI KOKO KUVAKKEEN SYKE
     * (omistaja 15.9.2026, js/kaiutinmittari.js; PR #2504 poisti
     * `fact-kaiutin-syke` -animaation kokonaan). Merkki luetaan siis
     * kaarien tilasta: luennan aikana niistä palaa ainakin yksi,
     * hiljaisuudessa ei yksikään.
     */
    kaiutinKaaret: [...document.querySelectorAll('#fact-kuuntele .kaiutin-kaari')]
      .map((k) => (k.classList.contains('palaa') ? '1' : '0')).join(''),
    kuvaNakyy: Boolean(document.querySelector('.fokusvirta-luentakuva')),
    kuvatekstiNakyy: (() => {
      const e = document.querySelector('.fokusvirta-luentateksti');
      return Boolean(e && getComputedStyle(e).display !== 'none');
    })(),
    kuplapino: (() => {
      const e = document.querySelector('.pollo-kuplapino-kehys');
      return e ? getComputedStyle(e).display : 'ei-elementtia';
    })(),
    liiku: nappi ? {
      laatikko: nb,
      display: tyyli.display,
      tausta: tyyli.backgroundImage === 'none' ? tyyli.backgroundColor : tyyli.backgroundImage,
      sana: getComputedStyle(nappi.querySelector('.icon-label')).display,
      ikoni: getComputedStyle(nappi.querySelector('.viiva-ikoni')).display,
    } : null,
    liikuOsuuPuluun: osuu,
    huntu: huntu ? {
      content: huntu.content,
      bg: huntu.backgroundColor,
      blur: huntu.backdropFilter || huntu.webkitBackdropFilter,
      z: huntu.zIndex,
    } : null,
  };
};

/* --- PUHELIN PYSTY --- */
{
  const { konteksti, sivu } = await avaa({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  });
  const perus = await sivu.evaluate(mittaa);
  vaadi('puhelin pysty: matkakirja on lappu eikä merkinnän teksti näy',
    perus.factPieni === true && perus.factTekstiNakyy === false, JSON.stringify(perus.factPieni));
  vaadi('puhelin pysty: kaiutin jää lapulle (mykistys ja luennan merkki)',
    perus.kaiutinNakyy === true);
  vaadi('puhelin pysty: kuva ja kuvateksti näkyvät',
    perus.kuvaNakyy === true && perus.kuvatekstiNakyy === true);
  vaadi('puhelin pysty: pulun kuplapino on piilossa',
    perus.kuplapino === 'none' || perus.kuplapino === 'ei-elementtia', perus.kuplapino);
  vaadi('puhelin pysty: Liiku on 44 × 44 neliö vasemmassa alanurkassa',
    perus.liiku?.laatikko?.w === 44 && perus.liiku.laatikko.h === 44
    && perus.liiku.laatikko.x < 40
    && perus.liiku.laatikko.y > perus.ikkuna.h * 0.7, JSON.stringify(perus.liiku?.laatikko));
  vaadi('puhelin pysty: nappi ei ole kullattu — ei liukuväriä',
    !String(perus.liiku?.tausta).includes('gradient'), String(perus.liiku?.tausta));
  vaadi('puhelin pysty: symboli näkyy, sana on piilossa',
    perus.liiku?.ikoni !== 'none' && perus.liiku?.sana === 'none', JSON.stringify(perus.liiku));
  vaadi('puhelin pysty: Liiku ei osu pulun nappiin', perus.liikuOsuuPuluun === false);
  vaadi('puhelin pysty: huntua ei ole ennen luentaa (vastakoe)',
    perus.huntu?.content === 'none', JSON.stringify(perus.huntu));

  // Lapun napautus avaa merkinnän: teksti on saatavilla.
  await sivu.evaluate(() => document.querySelector('.fact-card').click());
  await sivu.waitForTimeout(400);
  const avattu = await sivu.evaluate(mittaa);
  vaadi('puhelin pysty: lapun napautus avaa merkinnän tekstin',
    avattu.factPieni === false && avattu.factTekstiNakyy === true, JSON.stringify(avattu.factPieni));

  /* Luenta käyntiin: nappi piiloon, huntu kartalle, kaiutin sykkimään. */
  await puhu(sivu);
  await sivu.waitForTimeout(700);
  const luennassa = await sivu.evaluate(mittaa);
  vaadi('luennan aikana Liiku on display:none, ei pelkkä opacity',
    luennassa.liiku?.display === 'none', JSON.stringify(luennassa.liiku?.display));
  vaadi('luennan aikana kartalla on tummentava ja sumentava huntu',
    luennassa.huntu?.content === '""' && /blur\(/.test(String(luennassa.huntu?.blur))
    && /rgba\(30, 22, 12/.test(String(luennassa.huntu?.bg)), JSON.stringify(luennassa.huntu));
  vaadi('huntu jää isoisän kuvan ALLE (z-index pienempi kuin kuvan 5)',
    Number(luennassa.huntu?.z) < 5, String(luennassa.huntu?.z));
  vaadi('kaiuttimen VU-mittari elää kertojan luennassa',
    luennassa.kaiutinKaaret.includes('1') && luennassa.kaiutinSyke === 'none',
    `kaaret=${luennassa.kaiutinKaaret} animaatio=${luennassa.kaiutinSyke}`);

  /* VASTAKOE: luennan jälkeen kaikki kolme palaavat ennalleen. */
  await vaikene(sivu);
  await sivu.waitForTimeout(LUENNAN_VAPAUTUKSEN_ODOTUS_MS);
  const jalkeen = await sivu.evaluate(mittaa);
  vaadi('luennan jälkeen Liiku palaa näkyviin (vastakoe)',
    jalkeen.liiku?.display !== 'none', JSON.stringify(jalkeen.liiku?.display));
  vaadi('luennan jälkeen huntu on poissa (vastakoe)',
    jalkeen.huntu?.content === 'none', JSON.stringify(jalkeen.huntu));
  vaadi('luennan jälkeen kaiuttimen kaaret ovat sammuksissa (vastakoe)',
    !jalkeen.kaiutinKaaret.includes('1') && jalkeen.kaiutinSyke === 'none',
    `kaaret=${jalkeen.kaiutinKaaret} animaatio=${jalkeen.kaiutinSyke}`);

  /* PULUN REPLIIKKI EI SYTYTÄ KAIUTINTA (omistaja: pulun elehtiminen riittää). */
  await puhu(sivu, 'pulu');
  await sivu.waitForTimeout(600);
  const pulupuhe = await sivu.evaluate(mittaa);
  vaadi('pulun repliikki ei sytytä kaiuttimen mittaria',
    !pulupuhe.kaiutinKaaret.includes('1') && pulupuhe.kaiutinSyke === 'none',
    `kaaret=${pulupuhe.kaiutinKaaret} animaatio=${pulupuhe.kaiutinSyke}`);
  vaadi('pulun repliikin ajan Liiku on silti piilossa',
    pulupuhe.liiku?.display === 'none', String(pulupuhe.liiku?.display));
  await vaikene(sivu);
  await sivu.waitForTimeout(LUENNAN_VAPAUTUKSEN_ODOTUS_MS);

  /* AARRE LÖYTYI: nappi laajenee ja kutistuu takaisin. */
  await sivu.evaluate(() => window.matkakirja.ui.laajennaLiiku());
  await sivu.waitForTimeout(500);
  const laaja = await sivu.evaluate(mittaa);
  vaadi('aarteen löytyessä nappi laajenee ja sana tulee näkyviin',
    laaja.liiku.laatikko.w > 60 && laaja.liiku.sana !== 'none', JSON.stringify(laaja.liiku));
  vaadi('laajennettuna symboli jää vasempaan reunaan (nappi kasvaa oikealle)',
    laaja.liiku.laatikko.x === perus.liiku.laatikko.x,
    `${laaja.liiku.laatikko.x} vs ${perus.liiku.laatikko.x}`);
  await sivu.waitForTimeout(LIIKU_LAAJENNUS_MS);
  const kutistunut = await sivu.evaluate(mittaa);
  vaadi('nappi kutistuu takaisin neliöksi laajennusajan jälkeen (vastakoe)',
    kutistunut.liiku.laatikko.w === 44 && kutistunut.liiku.sana === 'none',
    JSON.stringify(kutistunut.liiku));

  /* MYKISTETTY ÄÄNI: kukaan ei ole äänessä, joten nappi näkyy heti. */
  const mykka = await sivu.evaluate(async () => {
    const L = await import('/js/luenta.js');
    L.asetaLuentaKytkin(false);
    return {
      puhuja: L.puhujaAanessa(),
      liiku: getComputedStyle(document.querySelector('.monitoimi-nappi')).display,
    };
  });
  vaadi('mykistettynä Liiku näkyy heti', mykka.puhuja === null && mykka.liiku !== 'none',
    JSON.stringify(mykka));
  await konteksti.close();
}

/* --- PUHELIN VAAKA: sama sääntö, toinen suunta --- */
{
  const { konteksti, sivu } = await avaa({
    viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  });
  const m = await sivu.evaluate(mittaa);
  vaadi('puhelin vaaka: matkakirja on lappu eikä merkinnän teksti näy',
    m.factPieni === true && m.factTekstiNakyy === false, JSON.stringify(m.factPieni));
  vaadi('puhelin vaaka: kuva ja kuvateksti näkyvät',
    m.kuvaNakyy === true && m.kuvatekstiNakyy === true);
  vaadi('puhelin vaaka: Liiku on 44 × 44 neliö vasemmassa alanurkassa',
    m.liiku?.laatikko?.w === 44 && m.liiku.laatikko.h === 44 && m.liiku.laatikko.x < 40
    && m.liiku.laatikko.y > m.ikkuna.h * 0.7, JSON.stringify(m.liiku?.laatikko));
  vaadi('puhelin vaaka: Liiku ei osu pulun nappiin', m.liikuOsuuPuluun === false);
  await konteksti.close();
}

/* --- TYÖPÖYTÄ: VASTAKOE. Tekstit ovat ennallaan näkyvissä. --- */
{
  const { konteksti, sivu } = await avaa({ viewport: { width: 1400, height: 900 } });
  const m = await sivu.evaluate(mittaa);
  vaadi('työpöytä (vastakoe): matkakirjan kortti on auki ja teksti näkyy',
    m.factPieni === false && m.factTekstiNakyy === true, JSON.stringify(m));
  vaadi('työpöytä (vastakoe): pulun kuplapinoa ei ole piilotettu',
    m.kuplapino !== 'none', m.kuplapino);
  vaadi('työpöytä: Liiku on sama neliö vasemmassa alanurkassa',
    m.liiku?.laatikko?.w === 44 && m.liiku.laatikko.x < 40);

  /*
   * LUENNAN AIKANA TYÖPÖYTÄKIN PIILOTTAA TEKSTIT (omistaja 15.9.2026,
   * Raamattu "TEKSTIT PIILOON KAIKILLA LAITTEILLA").
   *
   * Yllä oleva vastakoe mittaa luennan ULKOPUOLISEN työpöydän — se
   * pysyi ennallaan. Tässä sama ruutu luennan AIKANA: kortti kutistuu
   * lapuksi ja merkinnän teksti katoaa mitasta, ja luennan jälkeen
   * molemmat palaavat (oma vastakokeensa). Laajemmat mittaukset
   * kolmella ruudulla ovat savuke-kaiutin-luentakuvat.mjs:ssä.
   */
  await puhu(sivu);
  await sivu.waitForTimeout(700);
  const tyoLuennassa = await sivu.evaluate(mittaa);
  vaadi('työpöytä: luennan aikana matkakirja on lappu eikä teksti näy',
    tyoLuennassa.factPieni === true && tyoLuennassa.factTekstiNakyy === false,
    JSON.stringify({ pieni: tyoLuennassa.factPieni, teksti: tyoLuennassa.factTekstiNakyy }));
  vaadi('työpöytä: luennan aikana kaiutin on lapulla näkyvissä',
    tyoLuennassa.kaiutinNakyy === true, JSON.stringify(tyoLuennassa.kaiutinNakyy));
  await vaikene(sivu);
  await sivu.waitForTimeout(LUENNAN_VAPAUTUKSEN_ODOTUS_MS);
  const tyoJalkeen = await sivu.evaluate(mittaa);
  vaadi('työpöytä (vastakoe): luennan jälkeen kortti on taas auki ja teksti näkyy',
    tyoJalkeen.factPieni === false && tyoJalkeen.factTekstiNakyy === true,
    JSON.stringify({ pieni: tyoJalkeen.factPieni, teksti: tyoJalkeen.factTekstiNakyy }));

  /*
   * VASTAKOE JUURISYYLLE: EPÄONNISTUNUT play() EI SAA PIILOTTAA MITÄÄN
   * (julkaisuagentin havainto 15.9.2026).
   *
   * Vuoro varataan ennen play()-kutsua, ja jos play() hylkääntyy
   * (headless-selain, offline, rikkinäinen tiedosto), ruudulla ehti
   * ennen tätä korjausta välähtää koko luennan asu: tekstit piiloon ja
   * Liiku pois, vaikka mitään ei kuulu. Tässä ajetaan pelin OMA
   * luentareitti tiedostolla, jota ei ole: kortin pitää pysyä auki koko
   * yrityksen ajan, ja luennan luokkien pitää pysyä poissa.
   */
  const epaonnistunut = await sivu.evaluate(async () => {
    const L = await import('/js/luenta.js');
    L.playDiaryVoice(window.matkakirja.ui, '/ei-ole-olemassa-savuke.mp3');
    const naytteet = [];
    for (let i = 0; i < 12; i += 1) {
      naytteet.push({
        pieni: document.querySelector('.fact-card')?.classList.contains('pieni') === true,
        piilo: document.body.classList.contains('luenta-tekstit-piiloon'),
        aanessa: document.body.classList.contains('luenta-aanessa'),
      });
      await new Promise((ok) => { setTimeout(ok, 150); });
    }
    return {
      kutistui: naytteet.some((n) => n.pieni),
      piilo: naytteet.some((n) => n.piilo),
      aanessa: naytteet.some((n) => n.aanessa),
    };
  });
  vaadi('työpöytä: epäonnistunut play() ei kutista korttia eikä piilota tekstejä',
    epaonnistunut.kutistui === false && epaonnistunut.piilo === false,
    JSON.stringify(epaonnistunut));
  vaadi('työpöytä: epäonnistunut play() ei piilota Liiku-nappia (luenta-aanessa)',
    epaonnistunut.aanessa === false, JSON.stringify(epaonnistunut));

  /* Kaupunkietusivun huntu: sama sumennus, vaaleampi peite. */
  const hunnut = await sivu.evaluate(() => {
    const lue = (luokka) => {
      const d = document.createElement('dialog');
      d.className = luokka;
      document.body.appendChild(d);
      d.showModal();
      const st = getComputedStyle(d, '::backdrop');
      const tulos = { bg: st.backgroundColor, blur: st.backdropFilter || st.webkitBackdropFilter };
      d.close();
      d.remove();
      return tulos;
    };
    return { arkki: lue('dialog lehti arkki tiivis-lehtiarkki'), tavallinen: lue('dialog') };
  });
  const kirkkaus = (vari) => {
    const o = String(vari).match(/[\d.]+/g)?.map(Number) ?? [];
    return o.length >= 3 ? o[0] * 0.299 + o[1] * 0.587 + o[2] * 0.114 : 0;
  };
  vaadi('kaupunkietusivun huntu on VAALEAMPI kuin luennan huntu (rgb 30,22,12)',
    kirkkaus(hunnut.arkki.bg) > kirkkaus('rgb(30, 22, 12)'),
    JSON.stringify(hunnut.arkki));
  vaadi('kaupunkietusivun huntu on vaaleampi kuin tavallinen dialogipeite',
    kirkkaus(hunnut.arkki.bg) > kirkkaus(hunnut.tavallinen.bg), JSON.stringify(hunnut));
  vaadi('kaupunkietusivun huntu sumentaa taustan',
    /blur\(/.test(String(hunnut.arkki.blur)), String(hunnut.arkki.blur));
  await konteksti.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
