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
 *      työnnetään erilleen ESITYKSESSÄ, ei datassa. Ahtaassa
 *      ryppäässä myös NIMIÖ väistyy: symboli näkyy aina, mutta
 *      naapurin päälle osuva nimi jää pois (27.8.2026).
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
  /*
   * TÄKYNOSTOT MERKITÄÄN KATSOTUIKSI (28.8.2026 ilta).
   *
   * Omistajan linjauksen jälkeen maan täkypisteet ovat kartalla heti
   * eivätkä vasta aarteen jälkeen (js/fokusnosto.js), ja piste
   * RATSASTAA oman kohteensa merkin päällä ja vie sen napautuksen
   * (js/fokusnosto-symbolit.js, osio PISTE AINA SYMBOLIN PÄÄLLE). Tämä
   * savuke mittaa KOHDEMERKKEJÄ, ja napautus tehdään merkin
   * ruutupaikkaan juuri siksi, ettei sen päällä saa olla mitään muuta —
   * täky peittäisi Delfoin ja Olympoksen ja koe mittaisi väärää asiaa.
   * Katsotut täyt eivät nouse kartalle (localStorage, sama avain kuin
   * js/fokusnosto.js NOSTO_AVAIN), joten kokeen kohde eristetään
   * merkitsemällä Kreikan pooli luetuksi.
   */
  const TAYT_LUETUT = ['sofia-korut', 'kastrin-kyla', 'olympoksen-huippu'];
  await ctx.addInitScript(([data, paalla, tayt]) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-takynostot-luetut', JSON.stringify(tayt));
      if (paalla) localStorage.removeItem('matkakirja-fokusmoodi');
      else localStorage.setItem('matkakirja-fokusmoodi', '0');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, [tallenne, fokus, TAYT_LUETUT]);
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

/* --- 1a: kohdemerkit kertovat kategoriansa symbolilla ja nimiöllä ---
 *
 * Raamattu, SYMBOLITAKSONOMIA (omistaja 26.8.2026 ilta): tyyppijohto
 * antaa vuorille/merille/saarille/jokille luontosymbolin ja
 * multimedialle silmän; kaupungit ja muut JÄÄVÄT vanhoiksi pisteiksi.
 * Symbolit piirtää sama kirjasto kuin täkysymbolit (yhteiset
 * nostosym-luokat, js/fokusnosto-symbolit.js).
 *
 * LÄPINÄKYVÄ MUSTETYYLI (omistajan valinta 27.8.2026, montaasin C):
 * merkin alta katosi paperinvaalea laatta ja kehysympyrä — glyyfi on
 * suoraan pergamentilla — ja tilalle tuli merkin PERÄÄN ladottu nimiö.
 * Vartija kääntyi siis toisin päin: ennen vaadittiin laattaa, nyt
 * vaaditaan ettei sitä ole ja että nimiö on.
 *
 * MERKKI LUETAAN RASTERIN DATA-MÄÄREISTÄ (omistajan lisätilaus
 * 27.8.2026): merkki ja nimiö piirretään yhdeksi kuvaksi canvasilla, ja
 * <image href> on siksi data-URL. Piirtäjä merkitsee kuvaan
 * `data-symboli` ja `data-nimio`, ja niistä lukemalla vartija tietää
 * yhä, minkä merkin ja minkä nimen kohde sai.
 *
 * VIIVAMERKKI (27.8.2026 ilta, omistajan palaute laitteelta v1211: generoidut
 * mustepiirrokset ovat *"aivan liian raskaita"*): kartalla merkki on
 * nyt viivoja poltetun vuorikolmion mitassa ja musteessa
 * (js/fokusnosto-symbolit.js NOSTOSYM_MINI), eikä kartalle ladata
 * enää yhtään sym-*.webp-kuvaa — ne jäivät kortin ylärivin
 * luokkatunnuksiksi. Vartijan väitteet lukevat data-määreitä, joten ne
 * eivät muuttuneet.
 */
const taksonomia = await sivu.evaluate(() => {
  const luokat = (id) => {
    const g = document.querySelector(`.fokuskohde[data-kohde="${id}"]`);
    const kuva = g?.querySelector('.nostosym-rasteri');
    const tunnus = kuva?.dataset.symboli ?? '';
    return g ? {
      luonto: tunnus === 'luonto',
      silma: tunnus === 'silma',
      piste: Boolean(g.querySelector('.fokuskohde-piste')),
      laatta: Boolean(g.querySelector('.nostosym-laatta, .nostosym-kehys')),
      nimio: kuva?.dataset.nimio ?? g.querySelector('.nostosym-nimio')?.textContent ?? '',
      rasteri: (kuva?.getAttribute('href') ?? '').startsWith('data:image/'),
      // Koodipiirto on varapolku, jos rasteria ei saatu.
      portti: tunnus === 'kaupunki' || Boolean(g.querySelector('.nostosym-kaupunki')),
    } : null;
  };
  return {
    vuori: luokat('olympos'),
    meri: luokat('egeanmeri') ?? luokat('santorini'),
    kaupunki: luokat('patras') ?? luokat('thessaloniki'),
  };
});
vaadi('merkki on rasteroitu yhdeksi kuvaksi (ei elävää tekstiä kartalla)',
  taksonomia.vuori?.rasteri === true, JSON.stringify(taksonomia.vuori));
vaadi('vuorikohde sai luontosymbolin ilman laattaa',
  taksonomia.vuori?.luonto === true && taksonomia.vuori?.laatta === false
  && taksonomia.vuori?.piste === false,
  JSON.stringify(taksonomia.vuori));
// v1165: kaupunkikin avaa kortin, joten sekin sai merkin (porttitorni,
// koodipiirto kunnes generoitu kuva on hyväksytty).
vaadi('kaupunkikohde sai porttitornisymbolin ilman laattaa',
  taksonomia.kaupunki?.portti === true && taksonomia.kaupunki?.laatta === false
  && taksonomia.kaupunki?.piste === false,
  JSON.stringify(taksonomia.kaupunki));
/*
 * NIMIÖ ON MERKIN PERÄSSÄ (27.8.2026). Neljä väitettä: teksti on
 * olemassa, se on kohteen oma nimi eikä kategoria, se on lyhennetty
 * kartan mittaan (enintään 18 merkkiä, js/fokusnosto-symbolit.js
 * NOSTOSYM_NIMIO_MERKKEJA) eikä se ota napautuksia vastaan.
 *
 * LEHDEN OMA PAINOJÄLKI ON RAJATTU ULOS (js/fokuskohteet.js
 * kohteenNimio): kun lehti on polttanut kaupungin nimen kuvaan, nimiö
 * olisi sama nimi kahdesti saman pisteen vieressä. Ehto on v1218:sta
 * alkaen DATA eikä tyyppi — nimeämätön kaupunki saa nimiönsä pelistä
 * (kokeet 1a4). Tämä väitejoukko rajaa kaupunkiluokan ulos vain
 * yksinkertaisuuden takia.
 */
const nimiot = await sivu.evaluate(() => [...document.querySelectorAll('.fokuskohde')]
  .filter((g) => g.querySelector('.fokuskohde-symboli')
    && !g.classList.contains('fokuskohde-kaupunki'))
  .map((g) => {
    // Rasteri kantaa nimen data-määreessä; varapolulla se on <text>.
    const r = g.querySelector('.nostosym-rasteri');
    const t = g.querySelector('.nostosym-nimio');
    const kantaja = r ?? t;
    return {
      id: g.dataset.kohde,
      teksti: r ? r.dataset.nimio : (t?.textContent ?? ''),
      // Nimiö EI saa ottaa napautuksia: se on merkkiä leveämpi ja
      // peittäisi naapurin osuma-alueen.
      osoitin: kantaja ? getComputedStyle(kantaja).pointerEvents : '',
    };
  }));
const nimiollisia = nimiot.filter((n) => n.teksti.length > 0);
const vaienneet = nimiot.filter((n) => !n.teksti.length);
/*
 * VÄITE KÄÄNTYI OSITTAIN (omistajan siistintätilaus 27.8.2026): ennen
 * vaadittiin nimiötä JOKAISELLE symbolimerkille, nyt valtaosalle.
 * Ahtaassa ryppäässä nimiö saa jäädä pois (js/fokuskohteet.js
 * paivitaKohdeNimiot), ja seuraava väite mittaa sen, ettei jäljelle
 * jäänyt yksikään limittäinen nimiö. Kumpikin luku on tarpeen: pelkkä
 * limityskoe menisi läpi myös silloin, jos kaikki nimiöt katoaisivat.
 */
vaadi('valtaosa symbolimerkeistä sai nimiön',
  nimiollisia.length > 0 && nimiollisia.length > vaienneet.length * 2,
  `${nimiollisia.length} nimiöllistä, ${vaienneet.length} vaiennutta: `
  + JSON.stringify(vaienneet.map((n) => n.id)));
vaadi('nimiö on kartan mittaan lyhennetty (<= 18 merkkiä)',
  nimiollisia.every((n) => n.teksti.length <= 18),
  JSON.stringify(nimiollisia.filter((n) => n.teksti.length > 18).slice(0, 3)));
vaadi('nimiö ei ota napautuksia vastaan',
  nimiot.every((n) => n.osoitin === 'none'),
  JSON.stringify(nimiot.slice(0, 2)));
/*
 * KIERTÄVÄN LAUDAN KOPIOT PÄÄTTÄVÄT SAMOIN. Väistö tehdään kohteelle,
 * ei kopiolle — muuten sauman kahta puolta olisivat saman kohteen
 * erinäköiset merkit.
 */
const kopioEro = [...new Set(nimiot.map((n) => n.id))]
  .filter((id) => new Set(nimiot.filter((n) => n.id === id)
    .map((n) => n.teksti)).size > 1);
vaadi('saman kohteen molemmat kopiot ovat samanlaisia',
  kopioEro.length === 0, kopioEro.join(', '));
vaadi('Olympoksen nimiö on kohteen oma nimi',
  taksonomia.vuori?.nimio === 'Ólympos', JSON.stringify(taksonomia.vuori?.nimio));
vaadi('kaupunkimerkki jättää nimiön lehden painojäljelle',
  taksonomia.kaupunki?.nimio === '', JSON.stringify(taksonomia.kaupunki?.nimio));

/* --- 1a2: nimiöt eivät limity naapureihin (omistajan siistintätilaus)
 *
 * *"Tiheissä kohderyppäissä nimiöt limittyvät toistensa ja
 * naapurisymbolien päälle"* (27.8.2026, Ateenan seutu). Väistö
 * (js/fokuskohteet.js paivitaKohdeNimiot) laskee törmäykset laudan
 * koordinaateissa; tämä koe mittaa lopputuloksen RUUDULTA, jolloin
 * mukana on koko ketju — nipun sarake, erottelusiirrot ja merkin
 * mittakaava.
 *
 * LAATIKOT LUETAAN RASTERISTA. Merkin kuva on korkeutensa levyinen
 * neliö (glyyfi) ja sen kyljessä nimiön kaista; kun nimiö on
 * vaiennut, kuva on pelkkä neliö. Symbolit saavat sipaista toisiaan
 * (erottelupassin lupaus), joten koe koskee vain KAISTOJA: kaista ei
 * saa mennä toisen merkin neliön eikä toisen kaistan päälle.
 *
 * KAISTA VOI OLLA KUMMALLA PUOLELLA TAHANSA (v1218): väistö kääntää
 * nimiön merkin vasemmalle, jos oikea kylki on tukossa. Neliön paikka
 * luetaan siksi merkin OMASTA keskipisteestä (osuma-ympyrä) eikä
 * kuvan vasemmasta reunasta — muuten koe mittaisi peilatulla merkillä
 * nimiökaistan tilalla symbolia ja päinvastoin.
 */
const nimioLimitys = await sivu.evaluate(() => {
  const merkit = [...document.querySelectorAll('.fokuskohde')].map((g) => {
    const r = g.querySelector('.fokuskohde-glyyfi')?.getBoundingClientRect();
    const o = g.querySelector('.fokuskohde-osuma')?.getBoundingClientRect();
    if (!r || !(r.height > 0) || !o) return null;
    const keski = o.left + o.width / 2;
    const puolikas = r.height / 2;
    const sym = {
      x1: keski - puolikas, x2: keski + puolikas, y1: r.top, y2: r.bottom,
    };
    // Neliön ulkopuolelle jäävä osa on nimiön kaista, kummalla puolella
    // tahansa; ilman nimiötä sitä ei ole.
    const vasen = sym.x1 - r.left > 0.5;
    const oikea = r.right - sym.x2 > 0.5;
    return {
      id: g.dataset.kohde,
      sym,
      kaista: vasen || oikea ? {
        x1: vasen ? r.left : sym.x2,
        x2: vasen ? sym.x1 : r.right,
        y1: r.top,
        y2: r.bottom,
      } : null,
    };
  }).filter(Boolean);
  // Puolen pikselin vara: pyöristys ei saa tehdä kosketuksesta osumaa.
  const yli = (a, b) => a.x1 < b.x2 - 0.5 && b.x1 < a.x2 - 0.5
    && a.y1 < b.y2 - 0.5 && b.y1 < a.y2 - 0.5;
  const osumat = [];
  for (let i = 0; i < merkit.length; i += 1) {
    if (!merkit[i].kaista) continue;
    for (let j = 0; j < merkit.length; j += 1) {
      if (i === j) continue;
      if (yli(merkit[i].kaista, merkit[j].sym)) {
        osumat.push(`${merkit[i].id} nimiö × ${merkit[j].id} symboli`);
      }
      if (j > i && merkit[j].kaista && yli(merkit[i].kaista, merkit[j].kaista)) {
        osumat.push(`${merkit[i].id} nimiö × ${merkit[j].id} nimiö`);
      }
    }
  }
  return { osumat: [...new Set(osumat)], kaistoja: merkit.filter((m) => m.kaista).length };
});
vaadi('ladottu nimiö ei mene naapurin symbolin eikä nimiön päälle',
  nimioLimitys.kaistoja > 0 && nimioLimitys.osumat.length === 0,
  nimioLimitys.osumat.join(', '));

/* --- 1a3: VÄLJÄLLÄ EI VAIETA (v1218) -------------------------------
 *
 * Omistajan kaappaus v1217:stä: Kreikan lehdellä oli työpöytäkoossa
 * merkkejä ilman yhtään nimeä siellä missä tilaa oli yllin kyllin.
 * Väistö on tarkoitettu vain AHTAALLE (1a2), ja siksi tässä on sen
 * vastapari: jos merkin lähin naapuri on kauempana kuin yksikään nimiö
 * voi ulottua, nimiön ON oltava paikallaan.
 *
 * RAJA ON RUUDULLA JA REILU. Pisin nimiö on lehdellä noin 70 px lehden
 * perustasolla; VALJA_PX on selvästi sen yli, joten rajan takana ei ole
 * mitään mihin törmätä — kummallakaan puolella merkkiä. Näin väite
 * pysyy totena, vaikka nimet vaihtuisivat.
 *
 * Ilman tätä koetta 1a2 menisi läpi myös kartalla, jolta nimiöt ovat
 * kadonneet: limityksiä ei ole, kun mitään ei ole ladottu.
 */
const valjyys = await sivu.evaluate(() => {
  const VALJA_PX = 110;
  const merkit = [...document.querySelectorAll('.fokuskohde')].map((g) => {
    const o = g.querySelector('.fokuskohde-osuma')?.getBoundingClientRect();
    const kuva = g.querySelector('.nostosym-rasteri');
    if (!o || !kuva) return null;
    return {
      id: g.dataset.kohde,
      kaupunki: g.classList.contains('fokuskohde-kaupunki'),
      nimio: kuva.dataset.nimio ?? '',
      x: o.left + o.width / 2,
      y: o.top + o.height / 2,
    };
  }).filter(Boolean);
  const mykat = [];
  let valjia = 0;
  for (const m of merkit) {
    // Naapuri on toinen KOHDE: kiertävän laudan oma kopio ei ahdista.
    const lahin = merkit.reduce((paras, b) => (b.id === m.id ? paras
      : Math.min(paras, Math.hypot(b.x - m.x, b.y - m.y))), Infinity);
    if (!(lahin > VALJA_PX)) continue;
    valjia += 1;
    if (!m.nimio) mykat.push(`${m.id} (lähin ${Math.round(lahin)} px)`);
  }
  return { valjia, mykat: [...new Set(mykat)] };
});
vaadi('väljällä alueella jokainen merkki saa nimiön',
  valjyys.valjia > 0 && valjyys.mykat.length === 0,
  `${valjyys.valjia} väljää, mykkiä: ${valjyys.mykat.join(', ')}`);

/* --- 1a4: NIMIÖ JÄÄ POIS VAIN SILLE, JONKA LEHTI ON POLTTANUT ------
 *
 * Omistajan kaappaus v1217:stä, jatko. Ennen nimiö vaiennettiin
 * kaikilta `tyyppi: 'kaupunki'` -kohteilta, mutta perustelu — lehti
 * painaa nimen itse — pätee vain niihin neljään, jotka Kreikan lehteen
 * on poltettu (tools/fokuskartta/maat.mjs GRC.kaupungit). Marathon,
 * Kalamata, Ermoupoli ja Iraklion olivat kartalla merkkejä ilman
 * yhtään sanaa. Ehto on nyt data (js/fokuskohteet.js kohteenNimio),
 * ja tämä koe pitää molemmat suunnat kiinni.
 */
const nimioLahteet = await sivu.evaluate(() => {
  const lue = (id) => {
    const g = document.querySelector(`.fokuskohde[data-kohde="${id}"]`);
    return g?.querySelector('.nostosym-rasteri')?.dataset.nimio ?? null;
  };
  return {
    poltetut: ['thessaloniki', 'patras', 'ioannina', 'nafplio'].map(lue),
    pelilta: ['marathon', 'kalamata', 'ermoupoli', 'iraklion'].map(lue),
  };
});
vaadi('lehteen poltettu kaupunki jättää nimiön painojäljelle',
  nimioLahteet.poltetut.every((t) => t === ''),
  JSON.stringify(nimioLahteet.poltetut));
vaadi('nimeämätön kaupunki saa nimiönsä pelistä',
  nimioLahteet.pelilta.every((t) => t && t.length > 0),
  JSON.stringify(nimioLahteet.pelilta));
/*
 * Silmäsymboleita EI enää odoteta (26.8.2026: Akropolis-museon
 * GA&C-kierrokset poistettiin, koska upotus ei latautunut iPadilla —
 * Kreikassa ei ole tällä hetkellä yhtään kierroskohdetta). Vartija
 * kääntyi: silmän saa vain kohde, jolla on OIKEASTI kierroksia, eikä
 * sellaisia nyt ole.
 *
 * TUNNUS LUETAAN RASTERIN MÄÄREESTÄ eikä kuvan osoitteesta (27.8.2026):
 * kartalla ei ole enää webp-glyyfejä, joten `href`iin katsova koe
 * olisi tyhjä lupaus — se menisi läpi vaikka jokainen merkki olisi
 * silmä.
 */
const silmia = await sivu.evaluate(
  () => new Set([...document.querySelectorAll('.fokuskohde .nostosym-rasteri')]
    .filter((k) => k.dataset.symboli === 'silma')
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
  /*
   * Näkyvin osa on symbolikohteessa glyyfi, pistekohteessa halo.
   *
   * LEVEYS LUETAAN KORKEUDESTA. Symbolimerkin kuvassa on 27.8.2026
   * alkaen glyyfin lisäksi nimiö, joka jatkuu merkin oikealle
   * puolelle: laatikon leveys on siis nimen mittainen, korkeus taas
   * täsmälleen merkin oma ruutu (NOSTOSYM_MINI_RUUTU * 2 kohdemerkin
   * mittakaavassa) — sama luku, jolla erottelupassi
   * (eritteleKohdeRyhmat) laskee. Pistekohteen halo on ympyrä, joten
   * sillä korkeus ja leveys ovat sama asia.
   *
   * KESKIPISTE OTETAAN VASEMMASTA LAIDASTA + puolet KORKEUDESTA
   * samasta syystä: laatikon vaakakeskiö olisi nimiön verran oikealla.
   */
  const merkit = [...document.querySelectorAll('.fokuskohde')].map((g) => {
    const r = g.querySelector('.fokuskohde-glyyfi, .fokuskohde-halo').getBoundingClientRect();
    return {
      id: g.dataset.kohde,
      x: r.left + r.height / 2,
      y: r.top + r.height / 2,
      w: r.height,
    };
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

/* --- 1b2: LÄHIN VOITTAA LIMITTYVÄT OSUMA-ALUEET (v1218) -----------
 *
 * Omistaja v1217: *"Parnassósta ei voi klikata — napautus vuoren
 * päältä avaa aina Delfoin."* Osuma-alue on SORMEN mitta (44 px) eikä
 * merkin, joten naapureiden alueet menevät päällekkäin väistämättä:
 * Delfoi on Parnassóksen rinteellä. Selain antoi napautuksen
 * piirtojärjestyksen päällimmäiselle, ja alla oleva merkki oli kuollut.
 * Nyt voittaa se, jonka osumamuodon KESKIPISTE on lähinnä
 * (js/fokuskohteet.js lahinKohde).
 *
 * Koe napauttaa kummankin merkin OMAAN keskipisteeseen ja vaatii, että
 * kummastakin aukeaa oma kortti. Pari on juuri se, jonka omistaja
 * löysi, ja erottelupassin jäljiltä merkit ovat yhä lähempänä toisiaan
 * kuin osuma-alueen säde.
 */
const parnassosSuljettu = async () => {
  await sivu.keyboard.press('Escape');
  await sivu.waitForTimeout(300);
};
await parnassosSuljettu();
await napauta('parnassos');
vaadi('napautus Parnassóksen keskelle avaa Parnassóksen',
  (await popup())?.otsikko === 'Parnassós', JSON.stringify((await popup())?.otsikko));
await parnassosSuljettu();
await napauta('delfoi');
vaadi('napautus Delfoin keskelle avaa Delfoin',
  (await popup())?.otsikko === 'Delfoi', JSON.stringify((await popup())?.otsikko));
await parnassosSuljettu();

/* --- 1b3: POLTETTU KAUPUNGINNIMI ON NAPAUTETTAVA (v1218) ----------
 *
 * Omistaja v1217: kaupunkikohteesta sai kortin auki vain pikkuruisesta
 * porttitornista, vaikka kartalla iso kohde on kaupungin NIMI. Nimi on
 * poltettu lehden kuvaan, joten peli laskee sen laatikon lehden omista
 * mitoista (js/fokuskohteet.js kaupunginNimiLaatikko) ja panee siihen
 * näkymättömän osuma-alueen. Koe napauttaa nimen KESKELLE — ei siis
 * merkin viereen — ja vaatii kaupungin kortin auki.
 */
const nimiOsuma = await sivu.evaluate(() => {
  const g = document.querySelector('.fokuskohde[data-kohde="thessaloniki"] .fokuskohde-nimiosuma');
  const merkki = document.querySelector('.fokuskohde[data-kohde="thessaloniki"] .fokuskohde-osuma');
  if (!g || !merkki) return null;
  const r = g.getBoundingClientRect();
  const m = merkki.getBoundingClientRect();
  return {
    x: Math.round(r.left + r.width / 2),
    y: Math.round(r.top + r.height / 2),
    w: Math.round(r.width),
    h: Math.round(r.height),
    // Nimi on merkin VIERESSÄ: laatikko ei saa olla sama kuin merkki.
    irti: r.left > m.left + m.width / 2,
    ruudulla: r.left > 0 && r.top > 0 && r.right < innerWidth && r.bottom < innerHeight,
  };
});
vaadi('poltetulle kaupunginnimelle syntyi oma osuma-alue merkin viereen',
  nimiOsuma?.w > 20 && nimiOsuma?.h > 8 && nimiOsuma?.irti === true,
  JSON.stringify(nimiOsuma));
if (nimiOsuma?.ruudulla) {
  await sivu.mouse.click(nimiOsuma.x, nimiOsuma.y);
  await sivu.waitForTimeout(400);
  vaadi('napautus poltetun kaupunginnimen keskelle avaa kaupungin kortin',
    (await popup())?.otsikko === 'Thessaloniki', JSON.stringify((await popup())?.otsikko));
  await parnassosSuljettu();
}

/* --- 1c: nipun yhdysviivat kaupunkiin (omistajan pelitesti 27.8.2026)
 *
 * *"ateenan lisäpisteisiin sen oikealla puolella saisi tulla pienet
 * vaaleat katkoviivat, jotta tajuaa niiden olevan oikeasti ateenassa"*.
 * Kaupungin päälle osuvat merkit siirretään sarakkeeseen kaupungin
 * oikealle puolelle (js/fokusniput.js) — sarake yksin ei kertonut
 * kuuluvansa kaupunkiin, ja viiva kertoo.
 *
 * VÄITE MITTAA KOLME LUPAUSTA, koska viivan koko olemassaolon ehto on
 * se, ettei se saa maksaa mitään muuta:
 *   1. viivoja on tasan yhtä monta kuin nipussa on merkkejä;
 *   2. kerros on LAATTOJEN ALLA eikä ota napautuksia vastaan (nippu on
 *      alun perin tehty suojaamaan kaupungin sormialuetta — viiva ei
 *      saa viedä sitä takaisin);
 *   3. viiva ei ala laatan alta eikä pääty merkin alle, vaan jää
 *      molemmista päistä irti (katkoviiva, ei nuoli).
 */
const viivat = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const kerros = document.querySelector('.nippuviivat');
  const laatat = ui.tokenLayer;
  const city = ui.game?.cityOf?.();
  const rivit = [...(kerros?.querySelectorAll('line.nippuviiva') ?? [])].map((l) => {
    const lue = (n) => Number(l.getAttribute(n));
    const x1 = lue('x1'); const y1 = lue('y1'); const x2 = lue('x2'); const y2 = lue('y2');
    return {
      // Etäisyys kaupungin keskustasta kumpaankin päähän laudan mitassa.
      alku: city ? Math.hypot(x1 - city.x, y1 - city.y) : null,
      loppu: city ? Math.hypot(x2 - city.x, y2 - city.y) : null,
      leveys: lue('stroke-width'),
      katko: l.getAttribute('stroke-dasharray'),
      himmeys: Number(l.getAttribute('opacity')),
    };
  });
  return {
    rivit,
    nipussa: [...(ui.fokuskohdeRyhmat ?? []), ...(ui.nostosymRyhmat ?? [])]
      .filter((r) => r.nippu && r.g?.parentNode
        && !r.g.parentNode.classList.contains('fokuskohteet-piilossa')).length,
    // Kerros ennen laattoja samassa vanhemmassa = piirtyy niiden alle.
    laattojenAlla: Boolean(kerros && laatat && kerros.parentNode === laatat.parentNode
      && (kerros.compareDocumentPosition(laatat) & Node.DOCUMENT_POSITION_FOLLOWING)),
    lapaisee: kerros ? getComputedStyle(kerros).pointerEvents === 'none' : null,
  };
});
vaadi('nipun merkeillä on yhdysviiva kaupunkiin (yksi kutakin kohti)',
  viivat.nipussa > 0 && viivat.rivit.length === viivat.nipussa,
  JSON.stringify({ nipussa: viivat.nipussa, viivoja: viivat.rivit.length }));
vaadi('viivakerros on laattojen alla eikä ota napautuksia vastaan',
  viivat.laattojenAlla === true && viivat.lapaisee === true,
  JSON.stringify({ laattojenAlla: viivat.laattojenAlla, lapaisee: viivat.lapaisee }));
vaadi('viiva on katkonainen, ohut ja irti kummastakin päästä',
  viivat.rivit.length > 0 && viivat.rivit.every((r) => r.alku > 1 && r.loppu > r.alku
    && r.leveys > 0 && r.leveys < 4 && r.katko && r.himmeys > 0 && r.himmeys < 1),
  JSON.stringify(viivat.rivit.slice(0, 3)));

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

/* --- 10b: MATKAKIRJAN IHME — kuva, nappi kuvan alla ja kulmanauha ---
 *
 * Omistajan tilaus 27.8.2026 ilta (Akropoliin kortti iPhonella). Kolme
 * asiaa, jotka näkyvät VAIN oikeassa asettelussa:
 *
 *   a) OLEMASSA OLEVAN KOHTEEN JÄRJESTYS on otsikko → nykytilan
 *      VALOKUVA → "Koe ihme" -nappi → leipäteksti. Nappi seisoo siinä
 *      kohdassa, jossa poistettu loistoaikarekonstruktio ennen oli, eikä
 *      kortissa saa olla enää kahta kuvaa.
 *   b) NAUHA ON DIAGONAALINEN JA KÄÄRIYTYY KUVAN YMPÄRI: kaista on
 *      käännetty 45 astetta ja sen laatikko jatkuu kuvan ylä- ja
 *      vasemman reunan YLI. Rajoja on kolme ja jokainen mitataan
 *      erikseen (nauhanRajat), koska ne kaatuvat eri virheistä:
 *      leikkaamaton nauha leijui paperikehyksen päällä (v1195),
 *      pelkkä lyhennetty kaista näyttäisi lipukkeelta joka loppuu
 *      kesken kuvan, ja tarkalleen kuvan reunaan leikattu nauha
 *      lopullinen malli on pelin MATKAOPAS-nauhan kaltainen tasainen
 *      kaista, joka leikkautuu kuvan reunaan (omistajan tarkennus
 *      27.8.2026 ilta: ei taitekappaleita, ei jatkoa valkoiselle) —
 *      päiden varjostus on kaistan omassa pinnassa.
 *   c) NAUHA EI OTA NAPAUTUKSIA: kortissa se on suurennosnapin päällä.
 *   d) TEKSTI MAHTUU LEIKKAUKSEN SISÄÄN — eikä vain kaistan laatikkoon
 *      — ja taitejuova osuu leikkausviivaan (nauhanSovitus). Omistajan
 *      iPad-kaappaus 27.8.2026 illalla näytti "MATKAKIRJAN IHME":n
 *      leikkautuvan molemmista päistä, vaikka vanha väite
 *      (`scrollWidth <= clientWidth`) meni läpi: se mittasi väärää
 *      laatikkoa, eikä kontin kapea Courier paljastanut eroa.
 *
 * Kohteet: Olympia (olemassa, oma valokuva stadionista) ja Rodoksen
 * kolossi (kadonnut, ihmekuva kortin ainoana kuvana). Olympia eikä
 * Akropolis, koska Akropolis, sen museo ja antiikin agora ovat samassa
 * ryppäässä: erotellut osuma-alueet koskettavat toisiaan, ja napautus
 * voisi osua naapuriin. Olympia seisoo yksin.
 */

/*
 * NAUHAN SOVITUS: mahtuuko teksti LEIKKAUKSEN sisään, ja osuuko taite
 * leikkausviivaan. Molemmat mitataan samasta funktiosta, koska kortti
 * ja suurennos ovat sama komponentti eri luvuilla.
 *
 * MIKSI EI `scrollWidth <= clientWidth`: se kysyy, mahtuuko teksti
 * KAISTAN laatikkoon — ja mahtui, vaikka omistajan iPadilla
 * "MATKAKIRJAN IHME" leikkautui molemmista päistä (27.8.2026 ilta).
 * Kaistaa ei näy koko pituudeltaan: kääre leikkaa siitä puolitasoihin
 * x ≥ 0 ja y ≥ 0 palan pois kummastakin päästä, ja leikkaus on kaistan
 * omassa koordinaatistossa VINO. Siksi tekstin nurkat lasketaan
 * kaistan kierron läpi kääreen koordinaatistoon ja katsotaan, jääkö
 * yksikään nurkka negatiiviselle puolelle.
 *
 * KIRJASINTA EI VOI OLETTAA. Peli ei tuo omaa fonttia, joten kontin
 * Chromium latoo Courierille ja iPad American Typewriterille, joka on
 * ~14 % leveämpi. Pelkkä "mahtuu tässä selaimessa" ei siis riitä
 * vartioksi: mitataan myös TÄYTTÖASTE (ladonta / näkyvä matka) ja
 * vaaditaan sille varaa.
 */
const nauhanSovitus = (isantaValitsin) => sivu.evaluate((sel) => {
  const isanta = document.querySelector(sel);
  const nauha = isanta?.querySelector('.fokuskohde-ihmenauha');
  const kaista = nauha?.querySelector('.fokuskohde-ihmekaista');
  if (!kaista) return null;
  const ks = getComputedStyle(kaista);

  // Tekstin ladontaleveys ilman kaistan leveysrajoitusta.
  const klooni = kaista.cloneNode(true);
  Object.assign(klooni.style, {
    position: 'absolute', transform: 'none', width: 'auto',
    left: '-9999px', top: '0', overflow: 'visible',
    font: `${ks.fontStyle} ${ks.fontWeight} ${ks.fontSize}/${ks.lineHeight} ${ks.fontFamily}`,
    letterSpacing: ks.letterSpacing, textTransform: ks.textTransform,
  });
  document.body.appendChild(klooni);
  const ladonta = klooni.getBoundingClientRect().width;
  klooni.remove();

  // Musteen todellinen korkeus (ei riviväli): versaali-J laskeutuu
  // monessa antiikvassa perusviivan alle, ja juuri musteen NURKKA on
  // se, joka osuu vinoon leikkaukseen ensin.
  const c2 = document.createElement('canvas').getContext('2d');
  c2.font = `${ks.fontStyle} ${ks.fontWeight} ${ks.fontSize} ${ks.fontFamily}`;
  try { c2.letterSpacing = ks.letterSpacing; } catch { /* vanha selain */ }
  const tm = c2.measureText(kaista.textContent.toUpperCase());
  const musteKorkeus = tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent;

  // Tekstin nurkat kaistan kierron läpi kääreen koordinaatistoon.
  const m = new DOMMatrix(ks.transform);
  const cx = kaista.offsetLeft + kaista.offsetWidth / 2;
  const cy = kaista.offsetTop + kaista.offsetHeight / 2;
  const nurkat = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => {
    const dx = sx * ladonta / 2; const dy = sy * musteKorkeus / 2;
    return [cx + m.a * dx + m.c * dy, cy + m.b * dx + m.d * dy];
  });
  const vara = Math.min(...nurkat.map((p) => Math.min(p[0], p[1])));

  // Näkyvä ladontamatka: teksti plus se, mitä kummastakin päästä jäi
  // vielä leikkaukseen (maailman vara × √2 = matka kaistan akselilla).
  const nakyva = ladonta + 2 * vara * Math.SQRT2;

  return {
    ladonta: Math.round(ladonta * 10) / 10,
    nakyva: Math.round(nakyva * 10) / 10,
    vara: Math.round(vara * 10) / 10,
    tayttoaste: Math.round((ladonta / nakyva) * 100) / 100,
  };
}, isantaValitsin);

/** Kortin rakenne ihmeen kannalta: kuvat, nappi ja niiden järjestys. */
const ihmekortti = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokuskohde-popup');
  if (!el) return null;
  const sisalto = el.querySelector('.fokuskohde-sisalto');
  const jarjestys = [...sisalto.children].map((n) => n.className.split(' ')[0]);
  const nauha = el.querySelector('.fokuskohde-kuva .fokuskohde-ihmenauha');
  const kuva = el.querySelector('.fokuskohde-kuva img');
  const kaista = nauha?.querySelector('.fokuskohde-ihmekaista');
  const k = kaista?.getBoundingClientRect();
  const i = kuva?.getBoundingClientRect();
  return {
    otsikko: el.querySelector('.fokuskohde-otsikko')?.textContent ?? '',
    jarjestys,
    kuvia: el.querySelectorAll('.fokuskohde-kuva img').length,
    kuvalahde: el.querySelector('.fokuskohde-kuvalahde')?.textContent ?? '',
    nappeja: el.querySelectorAll('.fokuskohde-ihmenappi').length,
    // Nauha kortin kuvassa: vain kadonneella, jonka ainoa kuva on ihme.
    nauhaKuvassa: Boolean(nauha),
    muunnos: kaista ? getComputedStyle(kaista).transform : '',
    osoitin: nauha ? getComputedStyle(nauha).pointerEvents : '',
    yli: k && i ? { ylos: Math.round(i.top - k.top), vasen: Math.round(i.left - k.left) } : null,
    leikkaus: nauha ? getComputedStyle(nauha).overflow : '',
  };
});

/*
 * NAUHAN RAJAT (omistajan tarkennus 27.8.2026 ilta: nauha loppuu
 * kuvan reunaan eikä jatku valkoiselle). Yksi mittaus, kaksi lukua:
 *
 *   • ALKU ~0: kääre alkaa täsmälleen kuvan nurkasta ja leikkaa
 *     kaiken kuvan reunaan (overflow: hidden) — nauha ei koske
 *     paperiin eikä leiju sen päällä (v1195).
 *   • KAISTA KULKEE KULMAN YLI: kaistan leikkaamaton laatikko jatkuu
 *     kuvan reunan yli molemmilla akseleilla — muuten kaista olisi
 *     lipuke kuvan sisällä eikä kulman yli kulkeva nauha.
 */
const nauhanRajat = (isantaSel, kuvaSel) => sivu.evaluate(([hs, ks]) => {
  const isanta = document.querySelector(hs);
  const nauha = isanta?.querySelector('.fokuskohde-ihmenauha');
  const kuva = isanta?.querySelector(ks);
  if (!nauha || !kuva) return null;
  const n = nauha.getBoundingClientRect();
  const i = kuva.getBoundingClientRect();
  const h = isanta.getBoundingClientRect();
  const ht = getComputedStyle(isanta);
  const kaista = nauha.querySelector('.fokuskohde-ihmekaista');
  const k = kaista?.getBoundingClientRect();
  const p1 = (x) => Math.round(x * 10) / 10;
  return {
    // Marginaali = matka isännän pehmustelaatikon nurkasta kuvan nurkkaan.
    marginaali: {
      ylos: p1(i.top - h.top - parseFloat(ht.borderTopWidth)),
      vasen: p1(i.left - h.left - parseFloat(ht.borderLeftWidth)),
    },
    // Kääre alkaa täsmälleen kuvan nurkasta: alku = kuvan reuna
    // miinus kääreen reuna, jonka on oltava ~0 molemmilla akseleilla.
    alku: { ylos: p1(i.top - n.top), vasen: p1(i.left - n.left) },
    leikkaus: getComputedStyle(nauha).overflow,
    // Kaistan leikkaamaton laatikko jatkuu kuvan reunan yli — kääre
    // leikkaa sen, mutta laatikon ylitys todistaa että kaista oikeasti
    // kulkee kulman yli eikä ole lipuke kuvan sisällä.
    kaistaYli: {
      ylos: k ? p1(i.top - k.top) : null,
      vasen: k ? p1(i.left - k.left) : null,
    },
  };
}, [isantaSel, kuvaSel]);

/** Suurennoksen nauha: sama komponentti, isommat mitat. */
const ihmezoom = () => sivu.evaluate(() => {
  const kehys = document.querySelector('.fokuskohde-zoomkehys');
  if (!kehys) return null;
  const nauha = kehys.querySelector('.fokuskohde-ihmenauha');
  const kaista = nauha?.querySelector('.fokuskohde-ihmekaista');
  const kuva = kehys.querySelector('.fokuskohde-zoomkuva');
  const k = kaista?.getBoundingClientRect();
  const i = kuva?.getBoundingClientRect();
  return {
    nauha: Boolean(nauha),
    muunnos: kaista ? getComputedStyle(kaista).transform : '',
    osoitin: nauha ? getComputedStyle(nauha).pointerEvents : '',
    teksti: kaista?.textContent ?? '',
    yli: k && i ? { ylos: Math.round(i.top - k.top), vasen: Math.round(i.left - k.left) } : null,
    leikkaus: nauha ? getComputedStyle(nauha).overflow : '',
    lahde: kehys.querySelector('.fokuskohde-zoomlahde')?.textContent ?? '',
  };
});

/*
 * 45 asteen kierto matriisina: rotate(-45deg) on
 * matrix(0.7071, -0.7071, 0.7071, 0.7071, 0, 0). Vaakalaatikolla a
 * olisi 1 ja b 0, joten tämä erottaa tilatun nauhan vanhasta.
 */
const vino = (muunnos) => {
  const osat = String(muunnos ?? '').match(/-?[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 4) return false;
  return Math.abs(osat[0] - 0.7071) < 0.02 && Math.abs(osat[1] + 0.7071) < 0.02;
};

// Edellinen kortti kiinni ja kamera takaisin lehden perustasolle:
// avoin kortti peittäisi juuri sen kohdan, johon napautus osuu.
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(300);
await ajaLehdelle();

await napauta('olympia');
let ihme = await ihmekortti();
vaadi('olemassa olevan ihmekohteen kortti aukesi',
  ihme?.otsikko === 'Olympia', JSON.stringify(ihme?.otsikko));
vaadi('olemassa olevan ihmekohteen kortissa on yksi kuva: nykytilan valokuva',
  ihme?.kuvia === 1 && /CC BY/.test(ihme.kuvalahde), JSON.stringify(ihme?.kuvalahde));
vaadi('"Koe ihme" -nappi on kuvan ALLA eikä otsikon alla',
  ihme?.nappeja === 1
  && ihme.jarjestys.indexOf('fokuskohde-ihmenappi')
     > ihme.jarjestys.indexOf('fokuskohde-kuva')
  && ihme.jarjestys.indexOf('fokuskohde-ihmenappi')
     < ihme.jarjestys.indexOf('fokuskohde-teksti'),
  JSON.stringify(ihme?.jarjestys));
vaadi('olemassa olevan kortissa ei ole nauhaa: ihmekuva aukeaa vasta napista',
  ihme?.nauhaKuvassa === false);

// Napin puuttuminen on jo raportoitu edellä: älä jää odottamaan sitä
// 30 sekuntia, vaan anna loppujen väitteiden kertoa oma tuloksensa.
if (ihme?.nappeja) await sivu.locator('.fokuskohde-ihmenappi').click();
await sivu.waitForTimeout(600);
let zoom = await ihmezoom();
vaadi('"Koe ihme" avaa suurennoksen, jossa on ihmenauha ja havainnekuvamerkintä',
  zoom?.nauha === true && /Unohdettu aarre/i.test(zoom.teksti)
  && /Matkakirjan havainnekuva/.test(zoom.lahde), JSON.stringify(zoom?.teksti));
vaadi('suurennoksen nauha on 45 asteen kulmanauha, ei vaakalaatikko',
  vino(zoom?.muunnos), zoom?.muunnos);
vaadi('suurennoksen nauha kulkee kulman yli: laatikko kuvan reunojen yli',
  zoom?.yli && zoom.yli.ylos > 0 && zoom.yli.vasen > 0,
  JSON.stringify(zoom?.yli));
let rajat = await nauhanRajat('.fokuskohde-zoomkehys', '.fokuskohde-zoomkuva');
// Toleranssi 1,5 px: suurennoksen kuvalla on 1 px mustereunus, ja
// kääre alkaa kuvan PINNASTA reunuksen sisäpuolelta.
vaadi('suurennoksen nauhan kääre alkaa täsmälleen kuvan reunasta',
  rajat != null && Math.abs(rajat.alku.ylos) <= 1.5
  && Math.abs(rajat.alku.vasen) <= 1.5 && rajat.leikkaus === 'hidden',
  JSON.stringify({ alku: rajat?.alku, leikkaus: rajat?.leikkaus }));
vaadi('suurennoksen kaista kulkee kulman yli ja leikkautuu kuvan reunaan',
  rajat?.kaistaYli.ylos > 0.5 && rajat.kaistaYli.vasen > 0.5,
  JSON.stringify(rajat?.kaistaYli));
/*
 * TEKSTI MAHTUU LEIKKAUKSEN SISÄÄN, EI VAIN KAISTAN LAATIKKOON, ja
 * jäljelle jää varaa leveämmälle kirjasimelle (ks. nauhanSovitus).
 * Täyttöasteen katto 0,85 vastaa noin 18 %:n varaa: iPadin American
 * Typewriter on kontin Courieria ~14 % leveämpi.
 */
let sovitus = await nauhanSovitus('.fokuskohde-zoomkehys');
vaadi('suurennoksen nauhan teksti mahtuu leikkauksen sisään kokonaan',
  sovitus?.vara > 0.5, JSON.stringify(sovitus));
vaadi('suurennoksen tekstille jää varaa leveämmälle kirjasimelle',
  sovitus?.tayttoaste <= 0.85, `täyttöaste ${sovitus?.tayttoaste}`);
vaadi('nauha ei nappaa napautuksia', zoom?.osoitin === 'none', zoom?.osoitin);

await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(500);

/*
 * KADONNUT KOHDE: ihmekuva on kortin ainoa kuva ja se kantaa nauhan
 * itse — välinappia ei ole, koska napautus vie suoraan siihen, mitä
 * paikalla ei enää ole.
 */
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(300);
await napauta('rodoksen-kolossi');
ihme = await ihmekortti();
vaadi('kadonneen kohteen kortti aukesi',
  ihme?.otsikko === 'Rodoksen kolossi', JSON.stringify(ihme?.otsikko));
vaadi('kadonneen kohteen ainoa kuva on ihmekuva, ja siinä on nauha',
  ihme?.kuvia === 1 && ihme.nauhaKuvassa === true && ihme.nappeja === 0,
  JSON.stringify({ kuvia: ihme?.kuvia, nauha: ihme?.nauhaKuvassa, napit: ihme?.nappeja }));
vaadi('kortin nauha on sekin 45 asteen kulmanauha',
  vino(ihme?.muunnos), ihme?.muunnos);
vaadi('kortin nauha jatkuu kuvan ylä- ja vasemman reunan yli',
  ihme?.yli && ihme.yli.ylos > 0 && ihme.yli.vasen > 0, JSON.stringify(ihme?.yli));
rajat = await nauhanRajat('.fokuskohde-popup .fokuskohde-kuvanappi',
  '.fokuskohde-kuva img');
vaadi('kortin nauhan kääre alkaa täsmälleen kuvan reunasta',
  rajat != null && Math.abs(rajat.alku.ylos) <= 1.5
  && Math.abs(rajat.alku.vasen) <= 1.5 && rajat.leikkaus === 'hidden',
  JSON.stringify({ alku: rajat?.alku, leikkaus: rajat?.leikkaus }));
vaadi('kortin kaista kulkee kulman yli ja leikkautuu kuvan reunaan',
  rajat?.kaistaYli.ylos > 0.5 && rajat.kaistaYli.vasen > 0.5,
  JSON.stringify(rajat?.kaistaYli));
// Sama sovitusmittaus kortille: se oli suurennosta ahtaammalla, vaikka
// omistaja näki leikkautumisen suurennoksesta (27.8.2026 ilta).
sovitus = await nauhanSovitus('.fokuskohde-popup .fokuskohde-kuva');
vaadi('kortin nauhan teksti mahtuu leikkauksen sisään kokonaan',
  sovitus?.vara > 0.5, JSON.stringify(sovitus));
vaadi('kortin tekstille jää varaa leveämmälle kirjasimelle',
  sovitus?.tayttoaste <= 0.85, `täyttöaste ${sovitus?.tayttoaste}`);
vaadi('kortin nauha ei nappaa napautuksia', ihme?.osoitin === 'none', ihme?.osoitin);

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
