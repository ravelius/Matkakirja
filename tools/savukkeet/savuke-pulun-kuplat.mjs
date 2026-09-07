/*
 * Savuke: PULUN KUPLAT — VAIN VIIMEISIN, HISTORIA KELATTAVISSA.
 *
 * Omistajan linjaus 7.9.2026 (Raamattu, "PULUN KUPLAT: VAIN VIIMEISIN,
 * HISTORIA CHATISSA"), sanatarkasti: *"ruudulla näkyvät kuplat voisi
 * vaihtaa niin, että siinä näkyisi kerrallaan vain viimeisin kupla.
 * Mutta jos käyttäjä menee scrollaamaan viestejä niin näkymä laajenee
 * ylöspäin 10 riiviin. Mutta sitten kun käyttäjä liikuttaa karttaa niin
 * näkymä palaa taas siihen yhteen kuplaan. Nämä kaikki pehmeästi
 * animoiden."* — ja *"sen pulun chattiruudun avauksen tekstin voisi
 * lyhentää … siinä voisi boldata sen, että kysy mitä vain … ne pulun
 * omat esikirjoitetut kommentit voisi näkyä … puhekupliksi … Olisi kiva
 * että puhekupla ja chattihistoria tallentuisi ja olisi kelattavissa
 * taaksepäin."*
 *
 * VARTIOT (puhelinkoko 390 × 844):
 *   1. Kaksi peräkkäistä kuplaa: molemmat ovat pinossa, mutta ruudulla
 *      näkyy vain viimeisin — ja sen yläpuolella edellisen kuplan
 *      ALAOSA noin 2.2 rem:n verran, yläreunasta häivyttäen (omistaja
 *      7.9.2026 ilta). Yhden kuplan pinossa ei lisäkorkeutta.
 *   2. Rullaus kuplan päällä laajentaa: näkyvä korkeus kasvaa, useampi
 *      kupla näkyy, eikä katto ylitä 45 % ruudun korkeudesta.
 *   3. Kartan kosketus (pointerdown kartalla) supistaa takaisin yhteen.
 *   4. Chat auki: tervehdys on lyhyt ja sen ydin lihavoitu, ja pulun
 *      omat repliikit näkyvät .pollo-kuplaviesti-kuplina (oma pohja ja
 *      kärki, ei tavallisen rivin taustaa).
 *   5. Sivun uudelleenlataus: kuplat ovat yhä luettavissa chatissa
 *      (laitteen loki 'matkakirja-livia-loki').
 *   6. Laajennettu pino nostaa saman lokin aiemmat puheenvuorot kartan
 *      päälle kelattaviksi.
 *
 * Aja:  node tools/savukkeet/savuke-pulun-kuplat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUTU = { width: 390, height: 844 };

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
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Tallenne: Fogg Ateenassa, ensimmäinen laatta käännetty (pöllö löytyi). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: RUUTU, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Livian omat kertasarjat on jo nähty: tämä savuke mittaa kuplien
    // NÄKYMÄÄ eikä niiden ajoitusta (js/livia.js).
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);

const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
// Pöllöpalvelimeen ei mennä: generointikiintiötä ei kuluteta.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (route) => route.abort());

await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirjaPollo), null, { timeout: 60000 });
await sivu.waitForTimeout(2500);

/** Kuplapinon mitat: montako kuplaa, paljonko näkyy, mitkä näkyvät. */
const lueP1no = () => sivu.evaluate(() => {
  const kehys = document.querySelector('.pollo-kuplapino-kehys');
  const pino = document.querySelector('.pollo-kuplapino');
  if (!pino) return null;
  const laatikko = pino.getBoundingClientRect();
  const kuplat = [...pino.children];
  /*
   * "Näkyy" = kupla on KOKONAAN pinon näkyvän alueen sisällä. Mitta on
   * tiukka tarkoituksella (7.9.2026 ilta): supistetussa pinossa
   * edellisestä kuplasta pilkottaa alaosa, joten "puolet näkyvissä"
   * -mitalla kaksi kuplaa laskisi kahdeksi näkyväksi vaikka omistajan
   * sääntö on yhä "ruudulla on vain viimeisin kupla, ja sen yllä siivu".
   */
  const nakyvia = kuplat.filter((k) => {
    const r = k.getBoundingClientRect();
    return r.top >= laatikko.top - 1 && r.bottom <= laatikko.bottom + 1;
  }).length;
  // Kurkistus: edellisen kuplan alaosa pinon näkyvän alueen sisällä.
  const edellinen = kuplat.at(-2) ?? null;
  const e = edellinen?.getBoundingClientRect() ?? null;
  const tyyli = getComputedStyle(pino);
  return {
    piilossa: Boolean(kehys?.hidden),
    kuplia: kuplat.length,
    nakyvia,
    korkeus: Math.round(laatikko.height),
    laaja: Boolean(pino.classList.contains('pollo-kuplapino-laaja')),
    viimeisenKorkeus: Math.round(kuplat.at(-1)?.getBoundingClientRect().height ?? 0),
    kurkistus: pino.classList.contains('pollo-kuplapino-kurkistus'),
    haive: tyyli.getPropertyValue('--kuplapino-haive').trim(),
    maski: (tyyli.maskImage || tyyli.webkitMaskImage || 'none'),
    rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
    // Edellisestä kuplasta näkyvä siivu: alareuna pinon sisällä,
    // yläreuna sen ulkopuolella (siis vain alaosa pilkottaa).
    edellisenSiivu: e ? Math.round(Math.min(e.bottom, laatikko.bottom) - laatikko.top) : 0,
    edellisenYlaOhi: e ? e.top < laatikko.top - 1 : false,
  };
});

/** Häivytyksen mitta pikseleinä (rekisteröity muuttuja antaa px:n). */
const haivePx = (arvo, rem) => {
  const osa = String(arvo).trim().match(/^([\d.]+)(px|rem)$/);
  return osa ? Number(osa[1]) * (osa[2] === 'rem' ? rem : 1) : 0;
};

/** Kupla pinoon pelin omalla kutsulla (js/pollo.js naytaSaapumiskupla). */
const puhu = async (teksti) => {
  await sivu.evaluate((t) => { window.matkakirjaPollo?.naytaSaapumiskupla(t); }, teksti);
  await sivu.waitForTimeout(700);
};

const KUPLA_1 = 'Kaak. Ateena on vanha kaupunki, ja isoisäsi käveli täällä '
  + 'kesäkuussa 1873 aivan liian ohuissa kengissä.';
const KUPLA_2 = 'Ja sitten: torilla myytiin jäätä, jota oli kannettu vuorilta. '
  + 'Sitä minä en olisi uskonut.';

await puhu(KUPLA_1);

/*
 * 0. YKSI KUPLA: ei kurkistusta eikä häivytystä (omistaja 7.9.2026
 * ilta — ainoan kuplan yläreunaa ei syödä).
 */
const yksin = await lueP1no();
tieto('pino yhdellä kuplalla', JSON.stringify(yksin));
vaadi('yhden kuplan pinossa ei ole lisäkorkeutta',
  Boolean(yksin) && yksin.kuplia === 1
  && Math.abs(yksin.korkeus - yksin.viimeisenKorkeus) <= 26, JSON.stringify(yksin));
vaadi('yhden kuplan pinoa ei häivytetä',
  yksin?.kurkistus === false && haivePx(yksin?.haive, yksin?.rem ?? 16) === 0,
  `${yksin?.kurkistus} / ${yksin?.haive}`);

await puhu(KUPLA_2);

const supistettu = await lueP1no();
tieto('pino supistettuna', JSON.stringify(supistettu));
vaadi('molemmat kuplat ovat pinossa', supistettu?.kuplia === 2, JSON.stringify(supistettu));
vaadi('ruudulla näkyy kokonaan vain viimeisin kupla', supistettu?.nakyvia === 1,
  JSON.stringify(supistettu));
/*
 * KURKISTUS (omistaja 7.9.2026 ilta): *"pulun kuplassa saisi
 * yläpuolella näkyä vähän sitä aiempaa kuplaa … kuplan alaosa näkyy ja
 * sitten se feidautuu läpinäkyväksi."* Katto on viimeisin kupla + noin
 * 2.2 rem (js/pollo.js PINON_KURKISTUS_REM), edellisen kuplan alaosa
 * jää pinon sisään ja yläreunan maski häivyttää sen.
 */
const kurkistusPx = (supistettu?.rem ?? 16) * 2.2;
vaadi('pinon korkeus on viimeisin kupla + kurkistus',
  Boolean(supistettu)
  && Math.abs(supistettu.korkeus - (supistettu.viimeisenKorkeus + kurkistusPx)) <= 26,
  `${supistettu?.korkeus} vs ${supistettu?.viimeisenKorkeus} + ${Math.round(kurkistusPx)}`);
vaadi('edellisen kuplan alaosa näkyy pinon sisällä',
  Boolean(supistettu) && supistettu.edellisenSiivu > 8
  && supistettu.edellisenSiivu < supistettu.viimeisenKorkeus
  && supistettu.edellisenYlaOhi,
  JSON.stringify(supistettu));
vaadi('pinon yläreunan häivytys on päällä',
  supistettu?.kurkistus === true
  && haivePx(supistettu?.haive, supistettu?.rem ?? 16) > 8
  && /linear-gradient/.test(supistettu?.maski ?? ''),
  `${supistettu?.kurkistus} / ${supistettu?.haive} / ${supistettu?.maski}`);
vaadi('häipyvä sliveri ei ota napautusta vastaan',
  await sivu.evaluate(() => {
    const kupla = [...document.querySelectorAll('.pollo-kuplapino > *')].at(-2);
    return kupla ? getComputedStyle(kupla).pointerEvents === 'none' : false;
  }), 'edellinen kupla on napautettavissa supistetussa pinossa');
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '1-supistettu.png') });

/* 2. Rullaus kuplan päällä laajentaa näkymän. */
const kohta = await sivu.evaluate(() => {
  const r = document.querySelector('.pollo-kuplapino')?.getBoundingClientRect();
  return r ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) } : null;
});
await sivu.mouse.move(kohta.x, kohta.y);
await sivu.mouse.wheel(0, -120);
await sivu.waitForTimeout(700);

const laaja = await lueP1no();
tieto('pino laajennettuna', JSON.stringify(laaja));
vaadi('rullaus laajentaa pinon', Boolean(laaja?.laaja), JSON.stringify(laaja));
vaadi('laajennettuna korkeus kasvaa', Boolean(laaja) && laaja.korkeus > supistettu.korkeus + 20,
  `${supistettu?.korkeus} → ${laaja?.korkeus}`);
vaadi('laajennettuna näkyy useampi kupla', Boolean(laaja) && laaja.nakyvia >= 2,
  JSON.stringify(laaja));
vaadi('laajennettu pino ei ylitä 45 % ruudun korkeudesta',
  Boolean(laaja) && laaja.korkeus <= RUUTU.height * 0.45,
  `${laaja?.korkeus} px / ${RUUTU.height} px`);
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '2-laajennettu.png') });

/* 3. Kartan kosketus supistaa takaisin yhteen kuplaan. */
await sivu.mouse.move(Math.round(RUUTU.width / 2), Math.round(RUUTU.height / 3));
await sivu.mouse.down();
await sivu.mouse.move(Math.round(RUUTU.width / 2) + 30, Math.round(RUUTU.height / 3) + 20);
await sivu.mouse.up();
await sivu.waitForTimeout(700);

const uudelleen = await lueP1no();
tieto('pino kartan vedon jälkeen', JSON.stringify(uudelleen));
vaadi('kartan liike supistaa pinon', uudelleen?.laaja === false, JSON.stringify(uudelleen));
vaadi('supistuttuaan näkyy kokonaan taas vain viimeisin', uudelleen?.nakyvia === 1,
  JSON.stringify(uudelleen));
/*
 * Supistuksen jälkeen pohja on POHJA: liu'un aikana pino pidetään
 * pohjassa (js/pollo.js pidaPinoPohjassa), joten ruudulle jää uusin
 * kupla ja sen yllä edellisen ALAOSA — ei koko edellistä kuplaa.
 */
vaadi('supistuttuaan edellinen kupla pilkottaa taas',
  uudelleen?.kurkistus === true && uudelleen.edellisenSiivu > 8
  && uudelleen.edellisenYlaOhi
  && uudelleen.edellisenSiivu <= supistettu.edellisenSiivu + 2
  && haivePx(uudelleen?.haive, uudelleen?.rem ?? 16) > 8, JSON.stringify(uudelleen));

/* 4. Chat: lyhyt tervehdys lihavoidulla ytimellä ja kupla-viestit. */
await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await sivu.waitForTimeout(900);

const chat = await sivu.evaluate(() => {
  const tervehdys = document.querySelector('.pollo-tervehdys');
  const kuplat = [...document.querySelectorAll('.pollo-kuplaviesti')];
  const tavallinen = document.querySelector('.pollo-viesti.pollo-pollo:not(.pollo-kuplaviesti)');
  const tyyli = kuplat[0] ? getComputedStyle(kuplat[0]) : null;
  const karki = kuplat[0] ? getComputedStyle(kuplat[0], '::after') : null;
  return {
    tervehdys: tervehdys?.textContent ?? '',
    lihavoitu: tervehdys?.querySelector('b')?.textContent ?? '',
    kuplia: kuplat.length,
    kuplienTekstit: kuplat.map((k) => k.textContent),
    kuplanTausta: tyyli?.backgroundColor ?? '',
    kuplanReuna: tyyli?.borderTopWidth ?? '',
    kuplanVarjo: tyyli?.boxShadow ?? '',
    karjenSisalto: karki?.content ?? '',
    tavallisenTausta: tavallinen ? getComputedStyle(tavallinen).backgroundColor : '',
  };
});
tieto('tervehdyksen pituus', `${chat.tervehdys.length} merkkiä`);
vaadi('tervehdys on lyhyt (alle 200 merkkiä)', chat.tervehdys.length > 0 && chat.tervehdys.length < 200,
  `${chat.tervehdys.length}: ${chat.tervehdys}`);
vaadi('tervehdyksen ydin on lihavoitu', /Kysy mitä vain/.test(chat.lihavoitu), chat.lihavoitu);
vaadi('pulun repliikit ovat chatissa kuplaviesteinä', chat.kuplia === 2,
  JSON.stringify(chat.kuplienTekstit));
vaadi('kuplaviestillä on oma pohja ja ohut reuna',
  chat.kuplanTausta !== 'rgba(0, 0, 0, 0)' && chat.kuplanTausta !== chat.tavallisenTausta
  && parseFloat(chat.kuplanReuna) > 0,
  `${chat.kuplanTausta} / reuna ${chat.kuplanReuna} / tavallinen ${chat.tavallisenTausta}`);
vaadi('kupla on kevyt: ei varjoa', chat.kuplanVarjo === 'none' || chat.kuplanVarjo === '',
  chat.kuplanVarjo);
vaadi('kuplalla on kärki (::after)', chat.karjenSisalto === '""' || chat.karjenSisalto === 'none' ? chat.karjenSisalto === '""' : false,
  chat.karjenSisalto);
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '3-chat.png') });

/* 5. Uudelleenlataus: historia palaa laitteen lokista. */
const loki = await sivu.evaluate(() => {
  try { return JSON.parse(localStorage.getItem('matkakirja-livia-loki') ?? '[]'); } catch { return []; }
});
vaadi('kuplat tallentuivat laitteen lokiin',
  loki.filter((m) => m.r === 'kupla').length >= 2, JSON.stringify(loki.map((m) => m.r)));

await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirjaPollo), null, { timeout: 60000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await sivu.waitForTimeout(900);

const paluu = await sivu.evaluate(() => {
  const rivit = [...document.querySelectorAll('.pollo-historiaviesti')];
  return {
    rivit: rivit.length,
    kuplina: rivit.filter((r) => r.classList.contains('pollo-kuplaviesti')).length,
    teksti: rivit.map((r) => r.textContent).join(' | '),
    tervehdys: Boolean(document.querySelector('.pollo-tervehdys')),
  };
});
tieto('historiarivit uudelleenlatauksen jälkeen', paluu.rivit);
vaadi('kuplat ovat luettavissa uudelleenlatauksen jälkeen',
  paluu.rivit >= 2 && paluu.teksti.includes('kesäkuussa 1873')
  && paluu.teksti.includes('torilla myytiin jäätä'), paluu.teksti.slice(0, 200));
vaadi('ladatut rivit näkyvät kuplina', paluu.kuplina >= 2, String(paluu.kuplina));
vaadi('tervehdys tulee silti', paluu.tervehdys, 'tervehdys puuttuu historian alta');
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '4-historia.png') });

/* 6. Laajennettu pino hakee saman lokin aiemmat puheenvuorot esiin. */
await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await sivu.waitForTimeout(600);
await puhu('Kuule, minä muistan tämän kadun. Tai luin siitä.');
const ennenKelausta = await lueP1no();
const kohta2 = await sivu.evaluate(() => {
  const r = document.querySelector('.pollo-kuplapino')?.getBoundingClientRect();
  return r ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) } : null;
});
await sivu.mouse.move(kohta2.x, kohta2.y);
await sivu.mouse.wheel(0, -120);
await sivu.waitForTimeout(700);
const historiaPinossa = await sivu.evaluate(() => ({
  kuplia: document.querySelectorAll('.pollo-kuplapino > *').length,
  vanhoja: document.querySelectorAll('.pollo-vihje-vanha').length,
  teksti: [...document.querySelectorAll('.pollo-vihje-vanha')].map((k) => k.textContent).join(' | '),
}));
tieto('pino laajennettuna lokin kanssa', JSON.stringify(historiaPinossa));
vaadi('laajennus nostaa lokin vanhat kuplat pinoon',
  ennenKelausta?.kuplia === 1 && historiaPinossa.vanhoja >= 2,
  `${ennenKelausta?.kuplia} → ${historiaPinossa.kuplia}`);
vaadi('vanhat kuplat ovat samaa lokia kuin chatissa',
  historiaPinossa.teksti.includes('kesäkuussa 1873'), historiaPinossa.teksti.slice(0, 160));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '5-pinon-historia.png') });

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
