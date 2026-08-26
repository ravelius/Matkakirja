/*
 * Savuke: fokuslehden klikattavat karttakohteet (js/fokuskohteet.js).
 *
 * Omistajan tilaus 24.8.2026: *"Tee kartalla näkyvistä kohteista
 * klikattava pop up infoja"*. Raamatun osio "Fokusmoodi", kohdat
 * ETENEMINEN (*"kartan erityiskohteista … aukeaa pienet
 * pop-up-tietoruudut"*) ja KOHDEKOROSTUS.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: kohteiden data on tarkistettavissa
 * ilman selainta (tests/fokusvirta.test.mjs vahtii rakenteen), mutta
 * koko paketin idea on geometriaa ja osumia — merkin on oltava
 * NAPAUTETTAVISSA lehden päällä, oikean kokoinen suhteessa karttaan, ja
 * pop-upin on pysyttävä ruudun sisällä alanappeja peittämättä. Sitä ei
 * voi mitata ilman oikeaa asettelua.
 *
 * VARTIOT:
 *   1. LEHTI TUO MERKIT. Kun Kreikan fokuslehti on kartalla, jokainen
 *      maan kohde saa merkin — ja kiertävällä laudalla merkit ovat
 *      MOLEMMISSA kohdissa, koska <use>-kopiosta ei voi napauttaa
 *      mitään. Päällekkäin osuvat merkit (Delfoi ja Parnassos)
 *      työnnetään erilleen ESITYKSESSÄ, ei datassa.
 *   2. EI SUODATTIMIA (tests/rules.test.mjs:n sääntö kartan kerroksille).
 *   3. OSUMA-ALUE ON LEHDEN PERUSTASOLLA ≥44 px, JA MERKKI ELÄÄ KARTAN
 *      MUKANA — lähennettäessä isompi, loitonnettaessa pienempi (ks.
 *      osio 2: omistajan LOPULLINEN linjaus 26.8.2026).
 *   4. NAPAUTUS AVAA POP-UPIN: nimi, teksti ja lähderivi, ja merkki
 *      korostuu (KOHDEKOROSTUS).
 *   5. POP-UP PYSYY RUUDULLA eikä peitä vuorolaatikon nappeja — ja
 *      jää selvästi irti ylä- ja alalaidasta.
 *   6. VAIN YKSI KERRALLAAN: toisen merkin napautus vaihtaa kohdetta.
 *   7. SULKU: rasti, Esc ja napautus kortin päälle.
 *   8. FOKUSVIRTA VOITTAA: kortin tai kuplan ilmestyminen sulkee
 *      tietoruudun.
 *   9. EI LEHTEÄ, EI MERKKEJÄ — kumpikaan suunta ei jää päälle.
 *
 * Peli istutetaan Ateenaan MAAILMANKARTALLE, koska Kreikan fokuslehti
 * on tehty sille laudalle (js/packs/fokus-grc.js FOKUS_POHJAT.lauta) —
 * Euroopan laudalla peli hylkää pohjan tarkoituksella.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSKOHTEET_GRC } from '../../js/packs/fokuskohteet-grc.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

/* Valmis peli: Herra Fogg seisoo Ateenassa maailmankartalla. */
const peli = new Game({
  players: [{ name: 'Herra Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Yksi sivu valmiiksi ladattuna. `fokus` false sammuttaa fokusmoodin,
 * jolloin lehteä — eikä siis merkkejäkään — ei pitäisi olla.
 */
async function avaaSivu(fokus = true) {
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript(([data, paalla]) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      if (paalla) localStorage.removeItem('matkakirja-fokusmoodi');
      else localStorage.setItem('matkakirja-fokusmoodi', '0');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, [tallenne, fokus]);
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ. Kontin selain ei pääse ämpäriin
   * eikä Commonsiin; ilman korvausta savuke mittaisi verkkoyhteyttä.
   * Fokuslehti EI piirry lainkaan ilman latautuvaa kuvaa
   * (js/fokuskartta.js lataaKuva), joten tämä on paketin ehto eikä
   * mukavuus. Osoitteiden oikeellisuus tarkistetaan erikseen.
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
  /*
   * `domcontentloaded` eikä `load`: maailmankartta lataa taustalla
   * kuvia ja ääniä, joista osa jää korvatun reitin varaan, eikä
   * ikkunan load-tapahtuma ole luotettava merkki siitä että peli on
   * pystyssä. Peli odotetaan siitä, mikä oikeasti kertoo sen — laudan
   * SVG ja fokuslehden rajaus.
   */
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  if (fokus) {
    await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
      null, { timeout: 60000 }).catch(() => {});
  }
  await sivu.waitForTimeout(2500);
  return sivu;
}

const sivu = await avaaSivu(true);

/** Kartan kohdemerkit: määrä, koko ruudulla ja korostus. */
const merkit = () => sivu.evaluate(() => {
  const kaikki = [...document.querySelectorAll('.fokuskohde')];
  const osumat = kaikki.map((g) => {
    const r = g.querySelector('.fokuskohde-osuma').getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  return {
    maara: kaikki.length,
    tunnukset: [...new Set(kaikki.map((g) => g.dataset.kohde))],
    // Kerros on juuriryhmän ULKOPUOLELLA, kuten maastonimet ja vinjetit.
    juuressa: kaikki.some((g) => g.closest('.board-root')),
    suodattimia: kaikki.filter((g) => g.getAttribute('filter')
      || g.querySelector('[filter]')).length,
    osumat,
    auki: kaikki.filter((g) => g.classList.contains('auki')).map((g) => g.dataset.kohde),
    ryhmat: [...document.querySelectorAll('.fokuskohde-ryhma')]
      .map((g) => g.getAttribute('transform') ?? ''),
  };
});

/** Auki olevan tietoruudun sisältö ja paikka. */
const popup = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokuskohde-popup');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const pane = document.querySelector('.map-pane')?.getBoundingClientRect();
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  return {
    ylarivi: el.querySelector('.fokuskohde-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokuskohde-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokuskohde-teksti')?.textContent ?? '',
    lahde: el.querySelector('.fokuskohde-lahde')?.textContent ?? '',
    kuvia: el.querySelectorAll('.fokuskohde-kuva img').length,
    kuvalahde: el.querySelector('.fokuskohde-kuvalahde')?.textContent ?? '',
    pohja: getComputedStyle(el).backgroundColor,
    karttapinnassa: Boolean(el.closest('.map-pane')),
    laatikko: {
      ylin: Math.round(r.top),
      alin: Math.round(r.bottom),
      vasen: Math.round(r.left),
      oikea: Math.round(r.right),
    },
    pane: pane ? {
      ylin: Math.round(pane.top),
      alin: Math.round(pane.bottom),
      vasen: Math.round(pane.left),
      oikea: Math.round(pane.right),
    } : null,
    nappienYlin: napit && napit.height > 0 ? Math.round(napit.top) : null,
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
  };
});

/**
 * Napauttaa kohteen merkkiä OIKEALLA HIIRELLÄ sen ruutupaikkaan.
 *
 * Ei `locator.click()`: kiertävällä laudalla samasta kohteesta on kaksi
 * merkkiä, joista toinen on aina ruudun ulkopuolella (sauman takana),
 * ja valitsimen ensimmäinen osuma voi olla juuri se. Paikka etsitään
 * siksi ruudulta ja napautus tehdään koordinaatteihin — silloin koe
 * mittaa myös sen, ettei merkin päällä ole mitään muuta.
 */
async function napauta(tunnus) {
  const kohta = await sivu.evaluate((id) => {
    for (const g of document.querySelectorAll(`.fokuskohde[data-kohde="${id}"]`)) {
      const r = g.querySelector('.fokuskohde-osuma').getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight) {
        return { x: Math.round(x), y: Math.round(y) };
      }
    }
    return null;
  }, tunnus);
  if (!kohta) throw new Error(`merkki ${tunnus} ei ole ruudulla`);
  await sivu.mouse.click(kohta.x, kohta.y);
  await sivu.waitForTimeout(400);
}

/*
 * Onko `rgb(...)`-väri vaaleaa paperia? Sama raja ja sama syy kuin
 * fokusvirran savukkeella: kortin on oltava pergamenttia eikä tummaa
 * massaa (omistajan pelitestipalaute 24.8.2026).
 */
const vaalea = (vari) => {
  const osat = String(vari ?? '').match(/[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 3) return false;
  if (osat.length > 3 && osat[3] < 0.5) return false;
  return (osat[0] * 0.299 + osat[1] * 0.587 + osat[2] * 0.114) > 190;
};

/**
 * Kamera lehden PERUSTASOLLE ja odotus, kunnes ajo on ohi (ZOOM_MS 3,4 s).
 *
 * AJO ON IKKUNAAN (fokusPohjaRajaus) EIKÄ KUVAAN (fokusPohjaBbox), koska
 * juuri siihen pelin oma saapumisajo päätyy (js/fokuskartta.js
 * maanNakyma) ja juuri se on merkkien peruskoon ankkuri (js/ui.js
 * fokusMerkkiSkaala). Kuva on ikkunaa 30 % laajempi, ja siihen ajaminen
 * jäisi kameran oman alarajan (js/kartta.js fokusZoomMinimi) alapuolelle:
 * näkymä nousisi silti ikkunaan, mutta zoomitilaan jäisi rajan alittava
 * kerroin, jolloin lähennysnappi kieltäytyisi liikkumasta ja koe 2
 * mittaisi kahdesti saman näkymän.
 */
async function ajaLehdelle() {
  /*
   * ENSIMMÄISELLÄ AJOLLA RAJAUS TULEE DATASTA (FOKUS_POHJAT.GRC):
   * yleislehtipohjan aikakaudella (Raamattu, "YLEISLEHTI ON KARTAN
   * POHJA") maalehteä EI piirretä kaukozoomissa, joten heti latauksen
   * jälkeen ui.fokusPohjaRajaus on tyhjä eikä kameralla olisi
   * kohdetta. Lähizoomiin ajaminen tuo maalehden takaisin
   * (js/fokuskartta.js palautaMaalehti), ja siitä eteenpäin ajot
   * käyttävät pelin omaa rajausta kuten ennenkin.
   */
  await sivu.evaluate((varakohde) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({ bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? varakohde, marginaali: 0 });
  }, FOKUS_POHJAT.GRC.rajaus);
  await sivu.waitForTimeout(4200);
}

/* --- 1: lehti tuo merkit --- */

/*
 * YLEISKUVASSA EI MERKKEJÄ — EIKÄ MAALEHTEÄKÄÄN. Sivun lataus kesken
 * pelin ei aja kameraa (js/fokuskartta.js: ensimmäinen piirto jättää
 * ajon väliin), joten kartta on tässä vaiheessa yleiskuvassa: pohjana
 * on yleislehti, maalehti odottaa lähizoomia (fokusPohjaBbox on
 * tyhjä), ja kaikkien kohteiden osuma-alueet olisivat samassa
 * läiskässä Ateenan laatan päällä. Merkit saavat syttyä vasta kun
 * lehti on lähikuvassa.
 */
const yleiskuvassa = await sivu.evaluate(() => {
  const kerros = document.querySelector('.fokuskohteet');
  const merkki = document.querySelector('.fokuskohde-osuma');
  return {
    piilossa: !kerros || kerros.classList.contains('fokuskohteet-piilossa'),
    /*
     * Näkyvyys mitataan GEOMETRIASTA eikä `display`-arvosta: kerroksen
     * `display: none` ei periydy lapsen laskettuun arvoon, mutta
     * piilotetun alipuun osuma-alueella ei ole mittoja lainkaan.
     */
    kerroksenTyyli: kerros ? getComputedStyle(kerros).display : '',
    nakyy: merkki ? merkki.getBoundingClientRect().width > 0 : false,
    osuus: (() => {
      const ui = window.matkakirja.ui;
      const n = ui.nakyvaAlue?.();
      return n?.w && ui.fokusPohjaBbox
        ? Number((ui.fokusPohjaBbox.w / n.w).toFixed(3)) : null;
    })(),
  };
});
vaadi('yleiskuvassa merkit ovat piilossa eivätkä syö napautuksia',
  yleiskuvassa.piilossa === true && yleiskuvassa.nakyy === false,
  JSON.stringify(yleiskuvassa));

await ajaLehdelle();
// Maalehti puretaan ja piirretään vasta lähizoomissa: odotus koskee
// nimenomaan lehteä, kamera on jo perillä.
await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
  null, { timeout: 30000 }).catch(() => {});
await sivu.waitForTimeout(900);

const lehtiNakyy = await sivu.evaluate(() => Boolean(window.matkakirja.ui.fokusPohjaBbox));
vaadi('Kreikan fokuslehti on kartalla', lehtiNakyy === true, 'lehteä ei piirretty');

let m = await merkit();
vaadi('jokainen maan kohde sai merkin',
  m.tunnukset.length === FOKUSKOHTEET_GRC.length,
  `${m.tunnukset.length}/${FOKUSKOHTEET_GRC.length}: ${m.tunnukset.join(',')}`);
vaadi('kiertävällä laudalla merkit ovat molemmissa kohdissa',
  m.maara === m.tunnukset.length * 2, `${m.maara} merkkiä`);
vaadi('kerros on juuriryhmän ulkopuolella (<use>-kopio ei syö napautusta)',
  m.juuressa === false);
vaadi('ei suodattimia kartan kerroksessa', m.suodattimia === 0);
vaadi('osuma-alue on lehden perustasolla vähintään 44 px',
  m.osumat.length > 0 && m.osumat.every((o) => o.w >= 44 && o.h >= 44),
  JSON.stringify(m.osumat.slice(0, 3)));

/* --- 1a: kohdemerkit kertovat kategoriansa symbolilla ---
 *
 * Raamattu, SYMBOLITAKSONOMIA (omistaja 26.8.2026 ilta): tyyppijohto
 * antaa vuorille/merille/saarille/jokille luontosymbolin ja
 * multimedialle silmän; kaupungit ja muut JÄÄVÄT vanhoiksi pisteiksi.
 * Symbolit piirtää sama kirjasto kuin täkysymbolit (yhteiset
 * nostosym-luokat, js/fokusnosto-symbolit.js).
 */
const taksonomia = await sivu.evaluate(() => {
  const luokat = (id) => {
    const g = document.querySelector(`.fokuskohde[data-kohde="${id}"]`);
    // v1162: glyyfi on generoitu kuva (image href sym-<tunnus>.webp);
    // koodipiirto on varapolku, joten luokkia ei enää odoteta.
    const kuva = g?.querySelector('image');
    const href = kuva?.getAttribute('href') ?? '';
    return g ? {
      luonto: href.endsWith('sym-luonto.webp'),
      silma: href.endsWith('sym-silma.webp'),
      piste: Boolean(g.querySelector('.fokuskohde-piste')),
      laatta: Boolean(g.querySelector('.nostosym-laatta')),
    } : null;
  };
  return {
    vuori: luokat('olympos'),
    meri: luokat('egeanmeri') ?? luokat('santorini'),
    kaupunki: luokat('patras') ?? luokat('thessaloniki'),
  };
});
vaadi('vuorikohde sai luontosymbolin (sym-luonto-kuva laatalla)',
  taksonomia.vuori?.luonto === true && taksonomia.vuori?.laatta === true
  && taksonomia.vuori?.piste === false,
  JSON.stringify(taksonomia.vuori));
vaadi('kaupunkikohde jäi vanhaksi pisteeksi',
  taksonomia.kaupunki?.piste === true && taksonomia.kaupunki?.laatta === false,
  JSON.stringify(taksonomia.kaupunki));
/*
 * Silmäsymboleita EI enää odoteta (26.8.2026: Akropolis-museon
 * GA&C-kierrokset poistettiin, koska upotus ei latautunut iPadilla —
 * Kreikassa ei ole tällä hetkellä yhtään kierroskohdetta). Vartija
 * kääntyi: silmän saa vain kohde, jolla on OIKEASTI kierroksia, eikä
 * sellaisia nyt ole.
 */
const silmia = await sivu.evaluate(
  () => new Set([...document.querySelectorAll('.fokuskohde image')]
    .filter((k) => (k.getAttribute('href') ?? '').endsWith('sym-silma.webp'))
    .map((k) => k.closest('.fokuskohde').dataset.kohde)).size,
);
vaadi('silmäsymboli vain kierroskohteilla (nyt 0)', silmia === 0, `${silmia} silmää`);

/* --- 1b: päällekkäiset merkit erkanevat (esitys, ei data) ---
 *
 * Omistajan pelitestitilaus 26.8.2026 (iPhone, Parnassoksen seutu):
 * *"Tuossa menee kaksi pistettä päällekkäin. Niitä voisi keinotekoisesti
 * siirtää poispäin toisistaan."* Delfoi on vuoren rinteellä ja siis
 * laudalla vain viiden yksikön päässä siitä, joten juuri tämä pari
 * mittaa erottelupassin (js/fokuskohteet.js eritteleKohdeRyhmat).
 *
 * KAKSI VÄITETTÄ, KOSKA LUPAUS ON KAKSIOSAINEN: kehät eivät mene
 * limittäin RUUDULLA, ja siirto näkyy vain piirtopaikassa — ryhmien
 * ankkurit ovat yhä täsmälleen datan koordinaateissa.
 */
const erottelu = await sivu.evaluate(() => {
  // Näkyvin osa on symbolikohteessa aluslaatta, pistekohteessa halo.
  const merkit = [...document.querySelectorAll('.fokuskohde')].map((g) => {
    const r = g.querySelector('.nostosym-laatta, .fokuskohde-halo').getBoundingClientRect();
    return { id: g.dataset.kohde, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
  }).filter((merkki) => merkki.w > 0);
  const limittain = [];
  for (let i = 0; i < merkit.length; i += 1) {
    for (let j = i + 1; j < merkit.length; j += 1) {
      const a = merkit[i]; const b = merkit[j];
      const etaisyys = Math.hypot(a.x - b.x, a.y - b.y);
      const vahin = (a.w + b.w) / 2;
      // Pyöristysvara 1 px: kehät saavat sipaista toisiaan.
      if (etaisyys < vahin - 1) {
        limittain.push(`${a.id}+${b.id} ${Math.round(etaisyys)}<${Math.round(vahin)}`);
      }
    }
  }
  const ryhmat = window.matkakirja.ui.fokuskohdeRyhmat ?? [];
  return {
    limittain,
    siirretyt: ryhmat.filter((r) => Math.abs(r.sx ?? 0) > 0.01 || Math.abs(r.sy ?? 0) > 0.01).length,
    ankkurit: ryhmat.map((r) => `${r.x}:${r.y}`),
  };
});
vaadi('päällekkäiset merkit on siirretty erilleen',
  erottelu.limittain.length === 0, erottelu.limittain.join(', '));
vaadi('erottelu siirsi ainakin yhtä paria (Delfoi ja Parnassos)',
  erottelu.siirretyt >= 2, `${erottelu.siirretyt} siirrettyä ryhmää`);
const datanPaikat = new Set(FOKUSKOHTEET_GRC
  .map((kohde) => kohde.laudat?.maailmankartta)
  .filter(Boolean)
  .map((paikka) => `${paikka.x}:${paikka.y}`));
vaadi('siirto koskee vain piirtopaikkaa: ankkurit ovat yhä datan koordinaateissa',
  erottelu.ankkurit.length > 0
  && erottelu.ankkurit.some((avain) => datanPaikat.has(avain))
  && [...datanPaikat].every((avain) => erottelu.ankkurit.includes(avain)),
  JSON.stringify(erottelu.ankkurit.slice(0, 4)));

/* --- 2: merkki elää kartan mukana --- */

/*
 * SOPIMUS VAIHTUI: MERKKI EI OLE ENÄÄ KIINTEÄN KOKOINEN RUUDULLA.
 *
 * Omistajan LOPULLINEN linjaus 26.8.2026 (Raamattu, kumoaa 25.8. kirjatun
 * kiinteän ruutukoon): *"pisteiden pitäisi suurentua samalla kun karttaa
 * suurentaa ja pienentyä karttaa zoomatessa ulospäin. Eli niiden koko
 * pitäisi olla koko ajan sama suhteessa kartan muihin elementteihin."*
 * Vanha vartio mittasi juuri päinvastaista.
 *
 * MITTA ON SUHDE EIKÄ PIKSELIMÄÄRÄ: merkin ruutukoon on kasvettava
 * samassa suhteessa kuin kartan mittakaavan (ui.nakyvaAlue().skaala).
 * Suhteessa on 4 %:n vara — merkin laatikko luetaan kokonaislukuina.
 *
 * Osuma-alue saa kasvaa ja kutistua mukana: merkit syttyvät muutenkin
 * vasta lähikuvassa (js/fokuskohteet.js LEHDEN_VAHIN_OSUUS), eli siinä
 * zoomissa, jossa sormi niitä oikeasti etsii.
 */
const ennenZoomia = m.osumat[0];
const skaalaEnnen = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
// Zoomiajo kestää ZOOM_MS (3,4 s): mitta otetaan vasta kun kartta on
// asettunut, tai se mittaisi liikkeen keskikohtaa.
await sivu.waitForTimeout(4200);
m = await merkit();
const skaalaJalkeen = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
const kartanKasvu = skaalaJalkeen / skaalaEnnen;
const merkinKasvu = m.osumat[0] ? m.osumat[0].w / ennenZoomia.w : 0;
console.log(`      (kartta ${skaalaEnnen.toFixed(3)} → ${skaalaJalkeen.toFixed(3)} `
  + `= ${kartanKasvu.toFixed(3)}×, merkki ${ennenZoomia.w} → ${m.osumat[0]?.w} px `
  + `= ${merkinKasvu.toFixed(3)}×)`);
vaadi('lähennys oikeasti muutti kartan mittakaavaa', kartanKasvu > 1.05,
  `${skaalaEnnen} → ${skaalaJalkeen}`);
vaadi('merkki suurenee kartan mukana (sama koko suhteessa karttaan)',
  Math.abs(merkinKasvu - kartanKasvu) <= kartanKasvu * 0.04,
  `kartta ${kartanKasvu.toFixed(3)}× vs. merkki ${merkinKasvu.toFixed(3)}×`);

/* --- 3: napautus avaa tietoruudun --- */

// Näkymä takaisin lehden rajaukseen: lähikuvassa osa kohteista on
// ruudun ulkopuolella, eikä tässä ole tarkoitus mitata panorointia.
await ajaLehdelle();

await napauta('olympos');
let p = await popup();
m = await merkit();
vaadi('napautus avaa tietoruudun', p !== null, 'pop-up ei auennut');
// Ylärivi on v1132:sta alkaen kategorian symboli ja LUOKAN nimi
// (js/fokuskohteet.js piirraKohdeYlarivi): vuori kuuluu luontoon.
vaadi('tietoruudussa on nimi, luokka, teksti ja lähde',
  p?.otsikko === 'Ólympos' && /luonto/i.test(p.ylarivi)
  && p.teksti.includes('jumalten koti') && p.lahde.includes('Wikipedia'),
  JSON.stringify(p));
vaadi('tietoruudussa on kuva ja sen lähderivi',
  p?.kuvia === 1 && p.kuvalahde.includes('CC BY'), JSON.stringify(p?.kuvalahde));
vaadi('tietoruutu on vaaleaa paperia', vaalea(p?.pohja), p?.pohja);
vaadi('KOHDEKOROSTUS: auki oleva merkki korostuu',
  m.auki.length > 0 && m.auki.every((id) => id === 'olympos'), JSON.stringify(m.auki));

/* --- 4: tietoruutu pysyy ruudulla eikä peitä alanappeja --- */

vaadi('tietoruutu asuu karttapinnassa', p?.karttapinnassa === true);
vaadi('tietoruutu ei valu ruudun ulkopuolelle',
  p && p.laatikko.vasen >= p.pane.vasen && p.laatikko.oikea <= p.pane.oikea
  && p.laatikko.ylin >= p.pane.ylin && p.laatikko.alin <= p.pane.alin,
  JSON.stringify(p?.laatikko));
vaadi('tietoruutu ei peitä alanappeja',
  p && (p.nappienYlin === null || p.laatikko.alin <= p.nappienYlin),
  `kortin alin ${p?.laatikko.alin}, nappien ylin ${p?.nappienYlin}`);

/*
 * KORTTI IRTI YLÄ- JA ALALAIDASTA (omistajan pelitestitilaus 26.8.2026:
 * *"Pop-up-ikkunat avautuvat nyt joko ylä- tai alalaitaan. Ne voisivat
 * olla hieman enemmän irti laidoista, kun aukeavat, vähän lähempänä
 * keskustaa."*). Ennen korjausta kortti pysähtyi kahdeksan pikselin
 * päähän laidasta; nyt vara on osuus karttapinnan korkeudesta
 * (js/fokuskohteet.js KOHDE_LAITAVARA_OSUUS). Mitta on tässä väljempi
 * kuin sääntö (5 % vs. 10 %), jotta koe kertoo vaatimuksen — kortti on
 * SELVÄSTI irti laidasta — eikä toista vakiota.
 */
const paneKorkeus = p ? p.pane.alin - p.pane.ylin : 0;
const ylavara = p ? p.laatikko.ylin - p.pane.ylin : 0;
const alavara = p ? p.pane.alin - p.laatikko.alin : 0;
vaadi('tietoruutu jää selvästi irti ylä- ja alalaidasta',
  paneKorkeus > 0 && ylavara >= paneKorkeus * 0.05 && alavara >= paneKorkeus * 0.05,
  `ylävara ${ylavara}, alavara ${alavara}, pane ${paneKorkeus}`);

/* --- 5: vain yksi kerrallaan --- */

await napauta('delfoi');
p = await popup();
m = await merkit();
const montako = await sivu.evaluate(() => document.querySelectorAll('.fokuskohde-popup').length);
vaadi('toisen merkin napautus vaihtaa kohdetta',
  p?.otsikko === 'Delfoi' && montako === 1, `${p?.otsikko}, ${montako} korttia`);
vaadi('edellinen korostus purkautui',
  m.auki.every((id) => id === 'delfoi'), JSON.stringify(m.auki));

/* --- 6: sulku kolmella tavalla --- */

await sivu.locator('.fokuskohde-sulje').click();
await sivu.waitForTimeout(250);
vaadi('rasti sulkee tietoruudun', (await popup()) === null);
vaadi('sulku purkaa myös korostuksen', (await merkit()).auki.length === 0);

await napauta('delfoi');
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(250);
vaadi('Esc sulkee tietoruudun', (await popup()) === null);

await napauta('delfoi');
await sivu.locator('.fokuskohde-popup .fokuskohde-teksti').click();
await sivu.waitForTimeout(250);
vaadi('napautus kortin päälle sulkee sen', (await popup()) === null);

/* --- 7: saman merkin toinen napautus sulkee --- */

await napauta('santorini');
vaadi('kolmas kohde aukeaa', (await popup())?.otsikko === 'Santoríni');
await napauta('santorini');
vaadi('saman merkin napautus uudestaan sulkee', (await popup()) === null);

/* --- 8: fokusvirran pinta sulkee tietoruudun --- */

await napauta('thessaloniki');
vaadi('neljäs kohde aukeaa ennen virtakoetta', (await popup()) !== null);
/*
 * Kupla luodaan tässä KÄSIN eikä virran kautta: vahti on
 * MutationObserver, joka katsoo vain luokkaa (js/fokuskohteet.js
 * kuunteleKohdetta), eikä tämä paketti saanut koskea js/fokusvirta.js:ään.
 * Koe mittaa juuri sen sopimuksen, joka koodissa on.
 */
await sivu.evaluate(() => {
  const kupla = document.createElement('div');
  kupla.className = 'fokusvirta-kupla';
  document.body.appendChild(kupla);
});
await sivu.waitForTimeout(250);
vaadi('fokusvirran kuplan avautuminen sulkee tietoruudun', (await popup()) === null);

/* --- 9: pöllö ja tietoruutu ovat rinnakkain --- */

/*
 * Omistajan pelitesti 25.8.2026: *"kohteen pop-up katoaa, kun painaa
 * pöllönappia"*. Juurisyy oli kortin sulkusopimuksessa (napautus kortin
 * ULKOPUOLELLE sulkee), ja korjaus on poikkeus siihen — siksi koe on
 * täällä eikä yksikkötestissä: se mittaa oikeaa napautusta oikealla
 * asettelulla, myös sen, ettei paneeli peitä korttia.
 *
 * Kupla pois kohdan 8 jäljiltä: uusi kortti avataan puhtaalle pöydälle.
 */
await sivu.evaluate(() => document.querySelector('.fokusvirta-kupla')?.remove());
await napauta('delfoi');
vaadi('kortti aukeaa pöllökoetta varten', (await popup()) !== null);

await sivu.locator('.pollo-nappi').click();
await sivu.waitForTimeout(700);
const rinnakkain = await sivu.evaluate(() => {
  const kortti = document.querySelector('.fokuskohde-popup');
  const paneeli = document.querySelector('.pollo-paneeli');
  if (!paneeli) return null;
  if (!kortti) return { kortti: false, chatAuki: !paneeli.hidden, osuus: 1 };
  const k = kortti.getBoundingClientRect();
  const p = paneeli.getBoundingClientRect();
  const leveys = Math.max(0, Math.min(k.right, p.right) - Math.max(k.left, p.left));
  const korkeus = Math.max(0, Math.min(k.bottom, p.bottom) - Math.max(k.top, p.top));
  const ala = k.width * k.height;
  return {
    kortti: true,
    chatAuki: !paneeli.hidden,
    osuus: ala > 0 ? Number(((leveys * korkeus) / ala).toFixed(2)) : 1,
  };
});
vaadi('pöllönappi ei sulje tietoruutua',
  rinnakkain?.kortti === true && rinnakkain.chatAuki === true, JSON.stringify(rinnakkain));
vaadi('pöllöpaneeli ei peitä tietoruutua',
  rinnakkain?.osuus < 0.5, JSON.stringify(rinnakkain));

const konteksti = await sivu.evaluate(() => window.matkakirjaPollo.konteksti(''));
vaadi('pöllön konteksti tuntee auki olevan kohteen',
  /Kartalla auki oleva kohdetietoruutu: Delfoi/.test(konteksti)
  && konteksti.includes('Omfalos'),
  konteksti.slice(0, 240));

/* --- 10: valmiit kysymykset ja alleviivatut sanat --- */

const kysymysnapit = await sivu.evaluate(
  () => [...document.querySelectorAll('.fokuskohde-kysymys')].map((n) => n.textContent),
);
vaadi('kortin lopussa on kaksi valmista kysymystä',
  kysymysnapit.length === 2, JSON.stringify(kysymysnapit));

/** Chatin tila: onko paneeli auki, mitä pelaaja on kysynyt, onko kortti yhä. */
const chatTila = () => sivu.evaluate(() => ({
  auki: !document.querySelector('.pollo-paneeli')?.hidden,
  kysytyt: [...document.querySelectorAll('.pollo-viesti.pollo-kayttaja')]
    .map((v) => v.textContent),
  kortti: Boolean(document.querySelector('.fokuskohde-popup')),
}));

await sivu.locator('.fokuskohde-kysymys').first().click();
await sivu.waitForTimeout(1200);
let chat = await chatTila();
vaadi('valmis kysymys lähtee chattiin ja kortti jää auki',
  chat.auki && chat.kortti && chat.kysytyt.includes(kysymysnapit[0]),
  JSON.stringify(chat));

const sanat = await sivu.evaluate(() => {
  const napit = [...document.querySelectorAll('.fokuskohde-teksti .fokuskohde-sana')];
  const tyyli = napit[0] ? getComputedStyle(napit[0]) : null;
  return {
    tekstit: napit.map((n) => n.textContent),
    leipatekstissa: napit.every((n) => Boolean(n.closest('.fokuskohde-teksti p'))),
    viiva: tyyli?.textDecorationLine ?? '',
    tyyli: tyyli?.textDecorationStyle ?? '',
  };
});
vaadi('alleviivatut sanat ovat leipätekstin sisällä pisteviivalla',
  sanat.tekstit.length >= 1 && sanat.leipatekstissa
  && sanat.viiva.includes('underline') && sanat.tyyli === 'dotted',
  JSON.stringify(sanat));

await sivu.locator('.fokuskohde-teksti .fokuskohde-sana').first().click();
await sivu.waitForTimeout(1200);
chat = await chatTila();
vaadi('alleviivattu sana kysyy pöllöltä lisää kortin sulkeutumatta',
  chat.auki && chat.kortti
  && chat.kysytyt.some((k) => k === 'Kerro lisää: omfalos (kohteessa Delfoi)'),
  JSON.stringify(chat));

// Chat kiinni ennen viimeisiä kokeita: paneeli ei saa jäädä mittaamaan
// seuraavien kohtien geometriaa.
await sivu.evaluate(() => window.matkakirjaPollo.sulje());
await sivu.waitForTimeout(300);

/* --- 11: ilman lehteä ei merkkejä --- */

await sivu.evaluate(() => window.matkakirja.ui.paivitaFokusPohja(null));
await sivu.waitForTimeout(300);
vaadi('lehden lähtiessä merkit katoavat', (await merkit()).maara === 0);

await sivu.context().close();

const pois = await avaaSivu(false);
const merkkejaIlmanFokusta = await pois.evaluate(
  () => document.querySelectorAll('.fokuskohde').length,
);
const lehtiIlmanFokusta = await pois.evaluate(
  () => Boolean(window.matkakirja.ui.fokusPohjaBbox),
);
vaadi('fokusmoodi pois: ei lehteä eikä merkkejä',
  merkkejaIlmanFokusta === 0 && lehtiIlmanFokusta === false,
  `${merkkejaIlmanFokusta} merkkiä, lehti ${lehtiIlmanFokusta}`);
await pois.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
