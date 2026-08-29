/*
 * Savuke: KARTTASELITEVALIKKO JA AIHEVALOT
 * (js/karttaselite.js, js/karttavalot.js, css/styles.css).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA. Valikko on kytkin, jonka koko arvo on
 * siinä, että kytketty tila NÄKYY kahdessa paikassa yhtä aikaa —
 * kartalla ja valikon rivillä — ja säilyy laitteella. Yksikään
 * yksikkötesti ei näe kumpaakaan: valo on CSS-sääntö bodyn luokan
 * takana, ja kappalemäärät luetaan oikeasti piirretyistä
 * merkkikerroksista. Ne on siis mitattava selaimessa.
 *
 * VARTIOT:
 *   1. NAPPI JA LEVY. Kartan oikeassa yläkulmassa on nappi, valikko on
 *      aluksi kiinni (visibility: hidden) ja napista se aukeaa. Rivejä
 *      on omistajan kahdeksan pääkategoriaa, ja jokaisella on symboli,
 *      suomenkielinen selite ja kappalemäärä.
 *   2. KAPPALEMÄÄRÄ ON TOSI (omistajan lisätilaus 29.8.2026). Rivin
 *      luku vastaa täsmälleen sitä, montako sen aiheen merkkiä kartalle
 *      on piirretty — kiertävällä laudalla kappaleina eikä solmuina,
 *      koska sama merkki piirretään kahteen kiertokohtaan.
 *   3. LUKU ELÄÄ NÄKYMÄN MUKANA. Yleiskuvassa kartalla on vain maiden
 *      eläintäyt; kun kamera ajaa maalehdelle, maan omat kohdemerkit
 *      ilmestyvät ja rivien luvut kasvavat niiden mukana. Juuri tämä on
 *      omistajan *"kappalemäärä kyseisen maan kohdalla"*.
 *   4. YKSI PALLO SYTYTTÄÄ KOKO SUKUKUNNAN. Pääkategoria on ryhmä
 *      symboleja (js/fokusnosto-symbolit.js NOSTOSYM_PAAKATEGORIAT),
 *      ja painallus sytyttää kartalta ryhmän KAIKKIEN alalajien merkit
 *      — ei vain sen, jonka kuva on rivillä — JA rivin oman pallon.
 *      Toinen painallus sammuttaa molemmat, eivätkä muut aiheet syty
 *      mukana.
 *   5. OFF JA ALL. Yksi painallus sytyttää tai sammuttaa kaikki.
 *   6. KARTTAKLIKKAUS PIILOTTAA VALIKON MUTTA EI VALOJA (omistaja:
 *      *"Popup LIUKUU YLÖS PIILOON kun karttaa klikataan; valot jäävät
 *      päälle"*).
 *   7. TILA SÄILYY RELOADISSA — valo on laitteen muistia.
 *
 * Peli istutetaan kaupunkiin pelitallenteen kautta, kuten muissakin
 * savukkeissa: lentoa ei voi odottaa. Lauta on MAAILMANKARTTA, koska se
 * on kiertävä: juuri siinä kappalemäärän ja solmumäärän ero on
 * mitattavissa.
 *
 * KAMERA ON AJETTAVA LEHDELLE KÄSIN. Kesken pelin ladattu sivu jää
 * yleiskuvaan, eikä maalehteä silloin piirretä lainkaan
 * (js/fokuskartta.js: ensimmäinen piirto jättää ajon väliin; sama
 * lähtötilanne kuin savuke-fokuskohteet.mjs:llä). Ilman ajoa kartalla
 * olisi vain eläintäkyjä, ja kohdemerkkien ja kohtaamispisteen valot
 * jäisivät kokonaan mittaamatta.
 */
import http from 'node:http';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { KARTTAVALO_AIHEET } from '../../js/karttavalot.js';
import { NOSTOSYM_PAAKATEGORIAT } from '../../js/fokusnosto-symbolit.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset/selitevalikko';
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
const osoite = `http://localhost:${palvelin.address().port}/`;

mkdirSync(KAAPPAUKSET, { recursive: true });

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* Valmis peli: Fogg seisoo Ateenassa maailmankartalla. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
/*
 * ATEENAN VIRTA ON JO KÄYTY. Maalehdelle saavuttaessa fokusvirta avaa
 * muuten pöllön saapumiskuplan, joka peittää ruudun oikean laidan —
 * siis juuri sen nurkan, jossa selitevalikko on. Kupla ei liity
 * valikkoon mitenkään, mutta se peittäisi puolet mitattavasta
 * pinnasta ja kaikki kaappaukset. Valmis virta on sama tilanne kuin
 * pelaajalla, joka on kaupungin jo kuunnellut.
 */
peli.fokusvirrat = {
  ...peli.fokusvirrat,
  [`${peli.pack.id}:ateena`]: { vaihe: 'valmis', taky: null, tehdyt: [], kohde: null, kohteet: [] },
};
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 1100, height: 900 },
  reducedMotion: 'reduce',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-fokusmoodi');
    /*
     * VALOT SAMMUKSISTA — MUTTA VAIN ENSIMMÄISELLÄ LATAUKSELLA.
     * Alustusskripti ajetaan uudelleen jokaisessa navigoinnissa, joten
     * ehdoton nollaus pyyhkisi juuri sen tilan, jonka vartio 6 mittaa.
     * Sessiomuisti säilyy saman välilehden reloadin yli ja erottaa
     * ensilatauksen jatkosta.
     */
    if (!sessionStorage.getItem('savuke-valot-alustettu')) {
      sessionStorage.setItem('savuke-valot-alustettu', '1');
      localStorage.removeItem('matkakirja-karttavalot');
    }
  } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
}, tallenne);

/*
 * KUVAPALVELIN KORVATAAN PIKSELILLÄ: kontin selain ei pääse ämpäriin
 * eikä Commonsiin, eikä fokuslehti piirry lainkaan ilman latautuvaa
 * kuvaa (js/fokuskartta.js lataaKuva).
 */
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/** Sivu pystyyn — myös reloadin jälkeen (vartio 6 avaa saman sivun uudelleen). */
async function avaaSivu(sivu) {
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(2500);
  return sivu;
}

const sivu = await avaaSivu(await ctx.newPage());

/**
 * Onko `rgb(...)`-väri vaaleaa paperia? Sama mitta kuin muissa
 * savukkeissa: valikko on pergamenttia, ja rivin tumma teksti vaatii
 * vaalean taustan pysyäkseen luettavana.
 */
const vaalea = (vari) => {
  const osat = String(vari ?? '').match(/[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 3) return false;
  if (osat.length > 3 && osat[3] < 0.5) return true; // läpinäkyvä = levyn oma paperi
  return (osat[0] * 0.299 + osat[1] * 0.587 + osat[2] * 0.114) > 170;
};

/** Valikon tila: nappi, levy ja rivit lukuineen. */
const valikko = () => sivu.evaluate(() => {
  const nappi = document.querySelector('.karttaselite-nappi');
  const levy = document.querySelector('.karttaselite-levy');
  const napinTila = nappi?.getBoundingClientRect();
  const rivit = [...document.querySelectorAll('.karttaselite-rivi')].map((r) => ({
    aihe: r.dataset.aihe,
    nimi: r.querySelector('.karttaselite-nimi')?.textContent ?? '',
    luku: r.querySelector('.karttaselite-luku')?.textContent ?? '',
    paalla: r.getAttribute('aria-pressed') === 'true',
    // Symboli on joko kirjaston kaiverruskuva tai koodilla piirretyt
    // muodot — kumpi tahansa kelpaa, tyhjä ruutu ei.
    symboleita: r.querySelectorAll('.karttaselite-symboli image, .karttaselite-symboli path, '
      + '.karttaselite-symboli circle').length,
    pallonVari: getComputedStyle(r.querySelector('.karttaselite-pallo')).backgroundColor,
    // Rivin oma tausta ja teksti: sormen alla oleva rivi ei saa maalautua
    // pelin yleisellä button:hover-mustella tummaksi (teksti katoaisi).
    tausta: getComputedStyle(r).backgroundColor,
    tekstinVari: getComputedStyle(r).color,
  }));
  return {
    nappiOlemassa: Boolean(nappi),
    // Oikea yläkulma: nappi on karttaruudun oikeassa laidassa ja ylhäällä.
    oikeassaYlakulmassa: Boolean(napinTila && napinTila.width >= 39
      && napinTila.right > window.innerWidth * 0.8 && napinTila.top < 200),
    auki: Boolean(levy?.classList.contains('auki')),
    nakyvyys: levy ? getComputedStyle(levy).visibility : '',
    laajennettu: nappi?.getAttribute('aria-expanded') ?? '',
    rivit,
  };
});

/** Kartan valotäplät aiheittain: solmut, kappaleet ja näkyvyys. */
const valot = () => sivu.evaluate(() => {
  const svg = window.matkakirja.ui.svg;
  const tulos = {};
  for (const valo of svg.querySelectorAll('.karttavalo')) {
    const aihe = valo.getAttribute('data-aihe');
    const rivi = tulos[aihe] ??= {
      solmuja: 0, avaimet: new Set(), nakyvia: 0, alalajit: new Set(), nakyvatAlalajit: new Set(),
    };
    rivi.solmuja += 1;
    rivi.avaimet.add(valo.getAttribute('data-avain'));
    rivi.alalajit.add(valo.getAttribute('data-ala'));
    if (getComputedStyle(valo).display !== 'none') {
      rivi.nakyvia += 1;
      rivi.nakyvatAlalajit.add(valo.getAttribute('data-ala'));
    }
  }
  return Object.fromEntries(Object.entries(tulos).map(([aihe, r]) => [aihe, {
    solmuja: r.solmuja,
    kappaleita: r.avaimet.size,
    nakyvia: r.nakyvia,
    alalajit: [...r.alalajit].sort(),
    nakyvatAlalajit: [...r.nakyvatAlalajit].sort(),
  }]));
});

/** Bodyn valoluokat — tila, jonka CSS lukee. */
const luokat = () => sivu.evaluate(() => [...document.body.classList]
  .filter((l) => l.startsWith('valot-')).sort());

const klikkaa = async (valitsin) => {
  await sivu.click(valitsin);
  await sivu.waitForTimeout(350);
};

/**
 * Kamera Kreikan lehden perustasolle ja odotus, kunnes ajo on ohi.
 *
 * Sama ajo ja sama perustelu kuin savuke-fokuskohteet.mjs:llä: kesken
 * pelin ladattu sivu jää yleiskuvaan eikä maalehteä silloin piirretä
 * lainkaan, joten kohdemerkkejä — ja siis useimpia aiheita — ei olisi
 * kartalla ollenkaan. Ensimmäisellä ajolla rajaus tulee datasta, koska
 * ui.fokusPohjaRajaus on yleiskuvassa vielä tyhjä.
 */
async function ajaLehdelle() {
  await sivu.evaluate((varakohde) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({
      bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? varakohde, marginaali: 0,
    });
  }, FOKUS_POHJAT.GRC.rajaus);
  await sivu.waitForTimeout(4200);
}

/* --- 1: nappi kartalla, valikko aukeaa napista --- */

const kiinni = await valikko();
vaadi('karttaselitenappi on kartan oikeassa yläkulmassa',
  kiinni.nappiOlemassa && kiinni.oikeassaYlakulmassa, JSON.stringify(kiinni.oikeassaYlakulmassa));
vaadi('valikko on aluksi kiinni eikä ota napautuksia',
  !kiinni.auki && kiinni.nakyvyys === 'hidden' && kiinni.laajennettu === 'false',
  `auki=${kiinni.auki} nakyvyys=${kiinni.nakyvyys}`);

await klikkaa('.karttaselite-nappi');
const auki = await valikko();
vaadi('napin painallus avaa valikon',
  auki.auki && auki.nakyvyys === 'visible' && auki.laajennettu === 'true',
  `auki=${auki.auki} nakyvyys=${auki.nakyvyys}`);
vaadi(`selitelistalla on kaikki ${KARTTAVALO_AIHEET.length} aihetta`,
  auki.rivit.length === KARTTAVALO_AIHEET.length
  && auki.rivit.every((r, i) => r.aihe === KARTTAVALO_AIHEET[i].aihe),
  `${auki.rivit.length} riviä`);
vaadi('jokaisella rivillä on symboli ja suomenkielinen selite',
  auki.rivit.every((r) => r.symboleita > 0 && r.nimi.length > 3),
  JSON.stringify(auki.rivit.filter((r) => !r.symboleita || r.nimi.length <= 3)));
vaadi('sammuneen rivin pallo on väritön ääriviiva',
  auki.rivit.every((r) => /rgba\(0, 0, 0, 0\)|transparent/.test(r.pallonVari)),
  JSON.stringify(auki.rivit.slice(0, 3).map((r) => r.pallonVari)));

/* --- 2: kappalemäärä vastaa kartalle piirrettyjä merkkejä --- */

const kartalla = await valot();
console.log(`      kartan merkit: ${JSON.stringify(kartalla)}`);
const luvut = Object.fromEntries(auki.rivit.map((r) => [r.aihe, r.luku]));
const vaarat = Object.entries(kartalla)
  .filter(([aihe, tieto]) => luvut[aihe] !== String(tieto.kappaleita));
vaadi('jokaisen rivin luku on kartalle piirrettyjen merkkien kappalemäärä',
  vaarat.length === 0,
  JSON.stringify(vaarat.map(([a, t]) => `${a}: rivi ${luvut[a]} vs kartta ${t.kappaleita}`)));
vaadi('aihe, jota kartalla ei ole, näkyy viivana eikä nollana',
  auki.rivit.filter((r) => !kartalla[r.aihe]).every((r) => r.luku === '–'),
  JSON.stringify(auki.rivit.filter((r) => !kartalla[r.aihe]).map((r) => `${r.aihe}=${r.luku}`)));
/*
 * KIERTÄVÄ LAUTA TODISTAA, ETTÄ LUKU ON KAPPALEITA EIKÄ SOLMUJA:
 * maailmankartalla jokainen merkki on piirretty kahteen kiertokohtaan,
 * joten solmuja on enemmän kuin kappaleita. Ilman tätä vartiota
 * naiivi solmulaskuri läpäisisi kokeen 1 ja valehtelisi pelaajalle
 * kaksinkertaisen luvun.
 */
const kiertavat = Object.values(kartalla).filter((t) => t.solmuja > t.kappaleita);
vaadi('kiertävän laudan kaksoiskappaleet eivät tuplaa lukua',
  kiertavat.length > 0, JSON.stringify(kartalla));

/* --- 3: maalehti tuo maan omat kohteet, ja luvut kasvavat --- */

await ajaLehdelle();
const lehdella = await valot();
const lehdenValikko = await valikko();
console.log(`      lehden merkit: ${JSON.stringify(lehdella)}`);
vaadi('maalehdellä kartalla on useamman aiheen merkkejä kuin yleiskuvassa',
  Object.keys(lehdella).length > Object.keys(kartalla).length,
  `${Object.keys(kartalla).length} -> ${Object.keys(lehdella).length}`);
const lehdenLuvut = Object.fromEntries(lehdenValikko.rivit.map((r) => [r.aihe, r.luku]));
const lehdenVaarat = Object.entries(lehdella)
  .filter(([aihe, tieto]) => lehdenLuvut[aihe] !== String(tieto.kappaleita));
vaadi('luvut päivittyvät maalehdelle ajettaessa ilman valikon sulkemista',
  lehdenVaarat.length === 0,
  JSON.stringify(lehdenVaarat.map(([a, t]) => `${a}: rivi ${lehdenLuvut[a]} vs kartta ${t.kappaleita}`)));

await sivu.screenshot({ path: join(KAAPPAUKSET, 'selitevalikko-auki.png') });

/*
 * OMISTAJAN KAAPPAUS ELÄIMISTÄ on LEHDEN mittakaavasta eikä
 * yleiskuvasta: maailmankartalla merkkikerrokset ovat zoomportin
 * takana (js/ui.js fokusMerkkiSkaala), joten täplät ovat siellä DOM:ssa
 * ja päällä mutta silmälle liian pieniä. Lähikuvassa valo on juuri se,
 * mitä omistaja tilasi — pieni staattinen täplä merkin alla.
 */
await klikkaa('.karttaselite-rivi[data-aihe="elaimet"]');
const elainkuva = await valot();
vaadi('eläinvalot palavat kartalla',
  elainkuva.elaimet?.nakyvia === elainkuva.elaimet?.solmuja && elainkuva.elaimet?.nakyvia > 0,
  JSON.stringify(elainkuva.elaimet));
await sivu.screenshot({ path: join(KAAPPAUKSET, 'selitevalikko-valot-elaimet.png') });
await klikkaa('.karttaselite-kaikki:first-of-type');

/* --- 4: väripallo sytyttää koko sukukunnan ja oman pallonsa --- */

/*
 * KOEAIHEEKSI SE, JOSSA ON ENITEN ALALAJEJA. Pääkategoria on ryhmä
 * symboleja, ja juuri ryhmittely on se, mitä tämä savuke vartioi: yhden
 * pallon on sytytettävä myös ne merkit, joiden oma symboli EI ole
 * rivillä näkyvä kärkimerkki (esim. Kulttuurin malja ja seppele).
 */
const koeaihe = Object.entries(lehdella)
  .sort((a, b) => b[1].alalajit.length - a[1].alalajit.length
    || b[1].kappaleita - a[1].kappaleita)[0]?.[0];
vaadi('kartalla on ainakin yksi aihe, jonka valot voi sytyttää',
  Boolean(koeaihe), JSON.stringify(Object.keys(lehdella)));
vaadi('koeaiheessa on useampi kuin yksi symboli — ryhmittely on oikeasti mitattavissa',
  lehdella[koeaihe].alalajit.length > 1,
  `${koeaihe}: ${JSON.stringify(lehdella[koeaihe].alalajit)}`);

await klikkaa(`.karttaselite-rivi[data-aihe="${koeaihe}"]`);
const sytytetty = await valot();
const sytytettyValikko = await valikko();
vaadi(`väripallon painallus sytyttää aiheen (${koeaihe}) valot kartalle`,
  sytytetty[koeaihe].nakyvia === sytytetty[koeaihe].solmuja
  && sytytetty[koeaihe].nakyvia > 0,
  JSON.stringify(sytytetty[koeaihe]));
vaadi('yksi pallo sytyttää pääkategorian KAIKKIEN alalajien merkit',
  sytytetty[koeaihe].nakyvatAlalajit.join() === sytytetty[koeaihe].alalajit.join(),
  `${JSON.stringify(sytytetty[koeaihe].nakyvatAlalajit)} vs `
  + `${JSON.stringify(sytytetty[koeaihe].alalajit)}`);
vaadi('sytytetyt alalajit kuuluvat kaikki tähän pääkategoriaan',
  sytytetty[koeaihe].alalajit.every((ala) => NOSTOSYM_PAAKATEGORIAT[ala] === koeaihe),
  JSON.stringify(sytytetty[koeaihe].alalajit));
vaadi('muiden aiheiden valot eivät syty mukana',
  Object.entries(sytytetty).every(([aihe, t]) => aihe === koeaihe || t.nakyvia === 0),
  JSON.stringify(Object.entries(sytytetty).filter(([a, t]) => a !== koeaihe && t.nakyvia)));
vaadi('rivin oma väripallo syttyy valikossa',
  sytytettyValikko.rivit.find((r) => r.aihe === koeaihe)?.paalla === true
  && sytytettyValikko.rivit.filter((r) => r.paalla).length === 1,
  JSON.stringify(sytytettyValikko.rivit.filter((r) => r.paalla).map((r) => r.aihe)));
/*
 * SYTYTETTY RIVI PYSYY LUETTAVANA. Pelin yleissääntö
 * `button:hover:not(:disabled)` maalaa napit tummalla musteella, ja se
 * voitti aluksi rivin oman hover-värin: juuri painettu rivi — jonka
 * päällä sormi tai osoitin vielä on — muuttui tummaksi palkiksi, jossa
 * tumma teksti ja luku katosivat kokonaan. Vartio mittaa juuri sen
 * hetken, koska klikkauksen jälkeen osoitin on rivin päällä.
 */
const painettu = sytytettyValikko.rivit.find((r) => r.aihe === koeaihe);
vaadi('sytytetty rivi pysyy vaaleana ja luettavana myös osoittimen alla',
  vaalea(painettu?.tausta) && !vaalea(painettu?.tekstinVari),
  `tausta=${painettu?.tausta} teksti=${painettu?.tekstinVari}`);
vaadi('syttynyt pallo saa aiheen oman värin',
  !/rgba\(0, 0, 0, 0\)/.test(
    sytytettyValikko.rivit.find((r) => r.aihe === koeaihe)?.pallonVari ?? '',
  ),
  sytytettyValikko.rivit.find((r) => r.aihe === koeaihe)?.pallonVari);

await sivu.screenshot({ path: join(KAAPPAUKSET, 'selitevalikko-valot-paalla.png') });

await klikkaa(`.karttaselite-rivi[data-aihe="${koeaihe}"]`);
const sammutettu = await valot();
vaadi('toinen painallus sammuttaa saman aiheen valot',
  sammutettu[koeaihe].nakyvia === 0 && (await luokat()).length === 0,
  JSON.stringify(sammutettu[koeaihe]));

/* --- 5: OFF ja ALL --- */

await klikkaa('.karttaselite-kaikki:last-of-type');
const kaikkiPaalla = await valot();
const kaikkiLuokat = await luokat();
vaadi('ALL sytyttää kaikki aiheet yhdellä painalluksella',
  kaikkiLuokat.length === KARTTAVALO_AIHEET.length
  && Object.values(kaikkiPaalla).every((t) => t.nakyvia === t.solmuja),
  `${kaikkiLuokat.length} luokkaa`);
vaadi('ALL sytyttää myös jokaisen rivin pallon',
  (await valikko()).rivit.every((r) => r.paalla), 'rivit');

await sivu.screenshot({ path: join(KAAPPAUKSET, 'selitevalikko-kaikki-valot.png') });

await klikkaa('.karttaselite-kaikki:first-of-type');
vaadi('OFF sammuttaa kaikki yhdellä painalluksella',
  (await luokat()).length === 0
  && Object.values(await valot()).every((t) => t.nakyvia === 0),
  JSON.stringify(await luokat()));

/* --- 6: karttaklikkaus piilottaa valikon, valot jäävät --- */

await klikkaa(`.karttaselite-rivi[data-aihe="${koeaihe}"]`);
await sivu.mouse.click(120, 700);
await sivu.waitForTimeout(450);
const kartanJalkeen = await valikko();
const valotKartanJalkeen = await valot();
vaadi('kartan napautus liu\'uttaa valikon piiloon',
  !kartanJalkeen.auki && kartanJalkeen.nakyvyys === 'hidden'
  && kartanJalkeen.laajennettu === 'false',
  `auki=${kartanJalkeen.auki} nakyvyys=${kartanJalkeen.nakyvyys}`);
vaadi('valot jäävät kartalle valikon sulkeuduttua',
  valotKartanJalkeen[koeaihe].nakyvia > 0
  && (await luokat()).join() === `valot-${koeaihe}`,
  JSON.stringify(valotKartanJalkeen[koeaihe]));

await sivu.screenshot({ path: join(KAAPPAUKSET, 'selitevalikko-piilossa-valot-paalla.png') });

/* --- 7: tila säilyy reloadissa --- */

await avaaSivu(sivu);
await ajaLehdelle();
const reloadinJalkeen = await valot();
const reloadinLuokat = await luokat();
vaadi('valotila säilyy sivunlatauksen yli (laitteen muisti)',
  reloadinLuokat.join() === `valot-${koeaihe}`
  && reloadinJalkeen[koeaihe]?.nakyvia > 0,
  `${reloadinLuokat.join()} / ${JSON.stringify(reloadinJalkeen[koeaihe])}`);
await klikkaa('.karttaselite-nappi');
vaadi('valikko avautuu reloadin jälkeen ja näyttää saman tilan',
  (await valikko()).rivit.find((r) => r.aihe === koeaihe)?.paalla === true,
  JSON.stringify((await valikko()).rivit.filter((r) => r.paalla).map((r) => r.aihe)));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
