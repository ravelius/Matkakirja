/*
 * Savuke: MATKUSTAMISEN KAMERA (js/ui.js sovitaKohteetNakyviin,
 * sovitaSiirtokohteet, sovitaLentokohteet, vaihdaLiuku, doRoll).
 *
 * OMISTAJAN TILAUS 2.9.2026, sanatarkasti:
 *   *"Kun pelaaja painaa Matkusta, niin kartta voisi pysyä paikallaan.
 *   Vasta sen jälkeen kun kulkumuoto on valittu ja noppaa heitetty
 *   (paitsi ei lennossa), niin vasta sen jälkeen kartta zoomautuisi
 *   sen verran ulospäin, jotta kaikki vaihtoehdot tulevat mukavasti
 *   näkyville ja reunoille jää vielä vähän lisää tilaa. Ja lennossa
 *   taas kartta zoomautuisi jo heti kun lentomuoto on valittu, niin
 *   paljon, että jokainen kohdekaupunki, mihin lento olisi
 *   mahdollinen, tulee näkyviin."*
 *
 * Ennen tätä Matkusta-nappi ajoi kameran naapureiden rajaukseen heti
 * painalluksesta (v1119) eikä heiton jälkeen tapahtunut mitään.
 *
 * VARTIOT:
 *   1. MATKUSTA EI LIIKUTA KAMERAA. Napin painallus (ja liu'un sulku)
 *      jättää näkyvän alueen pikselilleen ennalleen.
 *   2. KULKUMUODON VALINTA EI VIELÄ LIIKUTA. Laivan valinta vie
 *      heittovaiheeseen kamera paikallaan.
 *   3. HEITON JÄLKEEN KAIKKI KOHTEET RUUDULLA MARGINAALILLA. Lähikuvasta
 *      heitetty noppa sovittaa kameran niin, että jokaisen valittavan
 *      kohteen merkki JA nimi ovat kokonaan ruudulla, eikä yksikään
 *      kohde ole reunaa lähempänä kuin sovituksen marginaali sallii.
 *   4. EI ZOOMATA ULOS TURHAAN. Kun kaikki mahtuu jo, sovitus palauttaa
 *      false eikä kamera liiku pikseliäkään.
 *   5. LENTO SOVITTAA HETI. Lentolistan avaus (ilman nopanheittoa) tuo
 *      jokaisen mahdollisen lentokohteen ruudulle samalla marginaalilla.
 *   6. EI SIVUVIRHEITÄ.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: kysymys on RUUDUN pikseleistä —
 * mahtuuko merkki reunojen väliin ja jäikö reunalle tilaa. Sitä ei näe
 * lähdekoodista, ja juuri se on tilauksen sisältö.
 *
 * Peli istutetaan Ateenaan MAAILMANKARTALLE, kuten
 * savuke-siirtokohteet.mjs ja savuke-jalkamatka.mjs.
 */
import http from 'node:http';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUSKANSIO ?? join(JUURI, 'tools/savukkeet/kaappaukset');
mkdirSync(KAAPPAUKSET, { recursive: true });

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
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
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(e.message));
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);

/** Näkyvä alue pyöristettynä: kameran liikkeen mitta. */
const NAKYMA = () => {
  const n = window.matkakirja.ui.nakyvaAlue?.();
  return n ? {
    x: +n.x.toFixed(1), y: +n.y.toFixed(1), w: +n.w.toFixed(1), skaala: +n.skaala.toFixed(4),
  } : null;
};

/**
 * Kohdemerkkien paikat RUUDULLA: jokaisen kohteen keskipiste, merkin ja
 * nimen laatikot sekä kartan paneelin mitat. Marginaali lasketaan
 * keskipisteestä, koska sovitus sovittaa keskipisteiden laatikon.
 */
const MERKIT = () => {
  const pane = window.matkakirja.ui.mapPane.getBoundingClientRect();
  const leveys = window.matkakirja.game.pack.map.width || 1;
  const ryhmat = [...document.querySelectorAll('.targets g.target')];
  const kohteet = [];
  for (const g of ryhmat) {
    const piste = g.querySelector('.target-piste');
    if (!piste) continue;
    const pr = piste.getBoundingClientRect();
    const nimi = g.querySelector('.target-nimi');
    const nr = nimi?.getBoundingClientRect() ?? null;
    const halo = g.querySelector('.target-halo');
    const hr = halo?.getBoundingClientRect() ?? null;
    // Laatikot yhdessä: merkki, halo ja nimi ovat sama korostus.
    const laatikot = [pr, hr, nr].filter(Boolean);
    kohteet.push({
      /*
       * KIERTÄVÄLLÄ LAUDALLA JOKAINEN KOHDE PIIRTYY KAHDESTI (js/ui.js
       * kiertoKohdat): alkuperäinen ja laudan leveyden verran sivussa
       * oleva kopio. Vain toisen kuuluu olla ruudulla — sauman takainen
       * kopio on aina jossain kaukana — joten väitteet ryhmitellään
       * laudan koordinaatilla ja vaaditaan, että YKSI kopio täyttää
       * ehdon.
       */
      avain: `${Math.round(Number(piste.getAttribute('cy')))}`
        + `|${Math.round(Number(piste.getAttribute('cx')) % leveys)}`,
      nimi: nimi?.textContent ?? null,
      kx: +(pr.left + pr.width / 2).toFixed(1),
      ky: +(pr.top + pr.height / 2).toFixed(1),
      vasen: +Math.min(...laatikot.map((r) => r.left)).toFixed(1),
      oikea: +Math.max(...laatikot.map((r) => r.right)).toFixed(1),
      yla: +Math.min(...laatikot.map((r) => r.top)).toFixed(1),
      ala: +Math.max(...laatikot.map((r) => r.bottom)).toFixed(1),
    });
  }
  return {
    pane: {
      left: +pane.left.toFixed(1),
      top: +pane.top.toFixed(1),
      right: +pane.right.toFixed(1),
      bottom: +pane.bottom.toFixed(1),
      w: +pane.width.toFixed(1),
      h: +pane.height.toFixed(1),
    },
    kohteet,
  };
};

/**
 * Ovatko kaikki kohteet ruudulla ja keskipisteet marginaalin sisällä?
 *
 * Kopiot niputetaan avaimella (ks. MERKIT): kohde on kunnossa, jos
 * JOKIN sen kopioista täyttää ehdon.
 */
function tarkista(mitat, marginaali) {
  const { pane, kohteet } = mitat;
  const varaX = pane.w * marginaali;
  const varaY = pane.h * marginaali;
  const sisalla = (k) => k.vasen >= pane.left && k.oikea <= pane.right
    && k.yla >= pane.top && k.ala <= pane.bottom;
  const marginaalissa = (k) => k.kx >= pane.left + varaX && k.kx <= pane.right - varaX
    && k.ky >= pane.top + varaY && k.ky <= pane.bottom - varaY;
  const niput = new Map();
  for (const k of kohteet) {
    const lista = niput.get(k.avain) ?? [];
    lista.push(k);
    niput.set(k.avain, lista);
  }
  const ulkona = [];
  const reunalla = [];
  for (const lista of niput.values()) {
    if (!lista.some(sisalla)) ulkona.push(lista[0]);
    else if (!lista.some((k) => sisalla(k) && marginaalissa(k))) reunalla.push(lista[0]);
  }
  return { ulkona, reunalla, kohteita: niput.size };
}

/* --- peli Ateenaan ja kartta lähikuvaan --------------------------- */

const alku = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') {
    game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  }
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.player.money = 2000;
  /*
   * Laatta pois: fokusnäkymässä Matkusta-nappi ilmestyy vasta kun
   * kaupungin laatta on käännetty (js/ui.js liikuNappiNakyy), ja väite
   * 1 painaa juuri sitä nappia.
   */
  game.tokens.delete('ateena');
  game.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 2200));
  return { kaupunki: game.cityOf()?.id, fokus: ui.fokusmoodi === true, vaihe: game.phase };
});
vaadi('0 peli on Ateenassa fokusnäkymässä',
  alku.kaupunki === 'ateena' && alku.fokus && alku.vaihe === 'action', JSON.stringify(alku));

/*
 * 0b MAATUMMENNUS ON POIS MYÖS PELAAJALTA (omistaja 2.9.2026:
 * *"Tummennuksen voisi ottaa pois myös normaalista pelitilasta.
 * Jätetään pelkkä vahvistettu kartan ääriviiva jäljelle."*).
 *
 * Väite asuu tässä savukkeessa, koska tässä on auki juuri PELAAJAN
 * näkymä (ei kehittäjätilaa) samassa Kreikan lähikuvassa, jossa
 * omistaja vian näki; kehittäjätilan puolen vartioi
 * savuke-maailmanakyma (2b) ja lähdepään tests/rules.test.mjs.
 */
const varjo = await sivu.evaluate(() => {
  const kerros = window.matkakirja.ui.svg.querySelector('.maatummennus');
  const lapset = [...(kerros?.children ?? [])];
  return {
    luokat: lapset.map((o) => o.getAttribute('class')),
    tayttoja: lapset.filter((o) => {
      const f = getComputedStyle(o).fill;
      return f && f !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(f);
    }).length,
  };
});
console.log(`      mitattu: kerroksessa ${JSON.stringify(varjo.luokat)},`
  + ` täyttöjä ${varjo.tayttoja}`);
vaadi('0b pelitilassa on vain maan ääriviiva, ei naapurien varjoa',
  varjo.luokat.length === 1 && varjo.luokat[0] === 'maatummennus-viiva'
    && varjo.tayttoja === 0, JSON.stringify(varjo));

/**
 * Kamera lähikuvaan Ateenan päälle: sovituksen on oikeasti tehtävä työtä.
 * Ilman tätä maan yleiskuvassa kaikki kohteet mahtuisivat jo ruudulle,
 * ja väitteet 3 ja 5 menisivät läpi liikkumatta.
 */
const lahikuvaan = async () => {
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    const kaupunki = game.board.cityById.get('ateena');
    await ui.kartta.ajaKamera({ x: kaupunki.x, y: kaupunki.y, leveys: 150 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 400));
  });
  await sivu.waitForTimeout(400);
};
await lahikuvaan();

/* --- 1. Matkusta ei liikuta kameraa -------------------------------- */

const matkusta = await sivu.evaluate(async (koodi) => {
  const lue = new Function(`return (${koodi})()`);
  const ennen = lue();
  document.querySelector('.toimintorivi .monitoimi-nappi')?.click();
  await new Promise((r) => setTimeout(r, 1200));
  const auki = lue();
  const liukuAuki = Boolean(document.querySelector('.toimintorivi.liuku-auki'));
  document.querySelector('.toimintorivi .monitoimi-nappi')?.click();
  await new Promise((r) => setTimeout(r, 1200));
  return { ennen, auki, kiinni: lue(), liukuAuki };
}, NAKYMA.toString());
console.log(`      mitattu: ennen ${JSON.stringify(matkusta.ennen)}`);
console.log(`      mitattu: liuku auki ${JSON.stringify(matkusta.auki)}`);
vaadi('1a Matkusta-nappi avaa liu\'un', matkusta.liukuAuki === true,
  JSON.stringify(matkusta));
vaadi('1b Matkusta ei liikuta kameraa',
  JSON.stringify(matkusta.ennen) === JSON.stringify(matkusta.auki),
  `${JSON.stringify(matkusta.ennen)} -> ${JSON.stringify(matkusta.auki)}`);
vaadi('1c liu\'un sulku ei liikuta kameraa',
  JSON.stringify(matkusta.ennen) === JSON.stringify(matkusta.kiinni),
  `${JSON.stringify(matkusta.ennen)} -> ${JSON.stringify(matkusta.kiinni)}`);

/* --- 2. kulkumuodon valinta ei vielä liikuta ----------------------- */

const kulkumuoto = await sivu.evaluate(async (koodi) => {
  const lue = new Function(`return (${koodi})()`);
  const { game, ui } = window.matkakirja;
  const ennen = lue();
  game.rollDie = () => 3;
  game.actionTravel('sea');
  ui.render();
  await new Promise((r) => setTimeout(r, 1200));
  return { ennen, jalkeen: lue(), vaihe: game.phase };
}, NAKYMA.toString());
vaadi('2 kulkumuodon valinta ei liikuta kameraa',
  kulkumuoto.vaihe === 'roll'
    && JSON.stringify(kulkumuoto.ennen) === JSON.stringify(kulkumuoto.jalkeen),
  `${JSON.stringify(kulkumuoto.ennen)} -> ${JSON.stringify(kulkumuoto.jalkeen)}`);

const ennenHeittoa = join(KAAPPAUKSET, 'kamera-ateena-ennen-heittoa.png');
await sivu.screenshot({ path: ennenHeittoa });

/* --- 3. heiton jälkeen kaikki kohteet ruudulla --------------------- */

const heitto = await sivu.evaluate(async (koodi) => {
  const lue = new Function(`return (${koodi})()`);
  const { ui } = window.matkakirja;
  const ennen = lue();
  ui.doRoll();
  // Nopan animaatio (~1,3 s) ja sen perään sovituksen ajo (720 ms).
  await new Promise((r) => setTimeout(r, 3600));
  return { ennen, jalkeen: lue(), vaihe: window.matkakirja.game.phase };
}, NAKYMA.toString());
console.log(`      mitattu: heiton jälkeen ${JSON.stringify(heitto.ennen)}`
  + ` -> ${JSON.stringify(heitto.jalkeen)}`);
vaadi('3a heitto vie siirtovaiheeseen', heitto.vaihe === 'move', JSON.stringify(heitto));
vaadi('3b heiton jälkeen kamera zoomasi ulos',
  heitto.jalkeen.skaala < heitto.ennen.skaala,
  `${heitto.ennen.skaala} -> ${heitto.jalkeen.skaala}`);

const heitonMitat = await sivu.evaluate(MERKIT);
const heitonTulos = tarkista(heitonMitat, 0.10);
console.log(`      mitattu: ${heitonTulos.kohteita} kohdetta`
  + ` (${heitonMitat.kohteet.length} merkkiä kopioineen),`
  + ` ulkona ${heitonTulos.ulkona.length}, reunalla ${heitonTulos.reunalla.length}`);
vaadi('3c kohteita on kartalla', heitonTulos.kohteita > 1,
  JSON.stringify(heitonMitat.kohteet.map((k) => k.nimi)));
vaadi('3d jokainen kohde merkkeineen ja nimineen on kokonaan ruudulla',
  heitonTulos.ulkona.length === 0, JSON.stringify(heitonTulos.ulkona));
/*
 * Marginaaliväite on 10 % vaikka sovitus käyttää 14 %: sovitus rajaa
 * KESKIPISTEIDEN laatikon, ja kamera-ajon lopullinen mittakaava kulkee
 * vielä portaikon rajojen läpi (kartta.js kameranKohde rajaa). Väite
 * kaatuu, jos marginaali katoaa kokonaan, muttei siitä että raja
 * kilpistyy zoomirajaan.
 */
vaadi('3e reunoille jäi tilaa (yksikään kohde ei ole 10 % lähempänä laitaa)',
  heitonTulos.reunalla.length === 0, JSON.stringify(heitonTulos.reunalla));

const heitonJalkeen = join(KAAPPAUKSET, 'kamera-ateena-heiton-jalkeen.png');
await sivu.screenshot({ path: heitonJalkeen });

/* --- 4. ei zoomata ulos turhaan ----------------------------------- */

const turha = await sivu.evaluate(async (koodi) => {
  const lue = new Function(`return (${koodi})()`);
  const { ui } = window.matkakirja;
  // Kaikki kohteet mahtuvat nyt ruudulle: toinen sovitus ei saa liikkua.
  const ennen = lue();
  const lahti = ui.sovitaSiirtokohteet();
  await new Promise((r) => setTimeout(r, 1000));
  return { ennen, jalkeen: lue(), lahti };
}, NAKYMA.toString());
vaadi('4 mahtuvia kohteita ei soviteta uudelleen',
  turha.lahti === false && JSON.stringify(turha.ennen) === JSON.stringify(turha.jalkeen),
  JSON.stringify(turha));

/* --- 5. lento sovittaa heti --------------------------------------- */

const lento = await sivu.evaluate(async (koodi) => {
  const lue = new Function(`return (${koodi})()`);
  const { game, ui } = window.matkakirja;
  // Takaisin toimintavaiheeseen Ateenaan ja kartta lähikuvaan.
  game.moves = null;
  game.die = null;
  game.travelMode = null;
  game.phase = 'action';
  game.player.pos = { type: 'city', city: 'ateena' };
  const kaupunki = game.board.cityById.get('ateena');
  ui.render();
  await ui.kartta.ajaKamera({ x: kaupunki.x, y: kaupunki.y, leveys: 150 }, { kesto: 0 });
  await new Promise((r) => setTimeout(r, 800));
  const ennen = lue();
  const kohteita = game.airportDestinations().length;
  ui.avaaMatkavalikko('air');
  await new Promise((r) => setTimeout(r, 1600));
  return { ennen, jalkeen: lue(), kohteita };
}, NAKYMA.toString());
console.log(`      mitattu: lentokohteita ${lento.kohteita},`
  + ` ${JSON.stringify(lento.ennen)} -> ${JSON.stringify(lento.jalkeen)}`);
vaadi('5a lentokohteita on', lento.kohteita > 0, JSON.stringify(lento));
vaadi('5b lentolistan avaus zoomaa ulos ilman nopanheittoa',
  lento.jalkeen.skaala < lento.ennen.skaala,
  `${lento.ennen.skaala} -> ${lento.jalkeen.skaala}`);

const lennonMitat = await sivu.evaluate(MERKIT);
const lennonTulos = tarkista(lennonMitat, 0.10);
console.log(`      mitattu: ${lennonTulos.kohteita} lentokohdetta ruudulla,`
  + ` ulkona ${lennonTulos.ulkona.length}, reunalla ${lennonTulos.reunalla.length}`);
vaadi('5c jokainen lentokohde on merkkeineen kokonaan ruudulla',
  lennonTulos.kohteita === lento.kohteita && lennonTulos.ulkona.length === 0,
  JSON.stringify({ kohteet: lennonTulos.kohteita, ulkona: lennonTulos.ulkona }));
vaadi('5d lentokohteiden reunoille jäi tilaa',
  lennonTulos.reunalla.length === 0, JSON.stringify(lennonTulos.reunalla));

const lentoKaappaus = join(KAAPPAUKSET, 'kamera-lento-valittu.png');
await sivu.screenshot({ path: lentoKaappaus });

vaadi('6 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${ennenHeittoa}, ${heitonJalkeen}, ${lentoKaappaus}`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
