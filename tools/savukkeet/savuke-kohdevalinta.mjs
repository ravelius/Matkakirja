/*
 * Savuke: SIIRTOVAIHEESSA KOHDEKAUPUNGIN NAPAUTUS VALITSEE KOHTEEN,
 * EI AVAA LIUSKAA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 42).
 *
 * OMISTAJA 18.9.2026 klo 22.41 Suomen aikaa (puhelintestin v1945
 * löydös 6, iPad-kuva Lontoosta nopanheiton jälkeen: Pariisi
 * kohdemerkkinä punaisella katkorenkaalla ja sen vieressä avoin
 * liuska), sanatarkasti: *"Liftauksessa jos painaa kohdekaupunkia,
 * aukeaa viuhka vaikka pitaisi valita kohde liikkeelle"*.
 *
 * ── MIKSI SAVUKE EIKÄ YKSIKKÖTESTI ────────────────────────────────
 *
 * Vika ei ollut sääntökoodissa vaan SIINÄ, KUMPI NAPAUTUSPOLKU VOITTI.
 * Kohdemerkki teki jo oikein (`napautaKohde` → `doMove`), mutta
 * kaupungin oma piste on kirjaston pistekerroksen olio, jolla on oma
 * click (`reititaPallopisteenNapautus` → `napautaKaupunki`) — se
 * ohittaa `napautaPintaan`in kohdetestin kokonaan. Kumpi polku
 * ottaa sormen, ratkeaa vasta oikealla pallolla oikeassa
 * ruutupisteessä: kohdemerkin ja kaupunkimerkin ruutupiste on SAMA,
 * eikä lähdekoodista näe, kumpi ehtii ensin. Siksi tämän savukkeen
 * napautukset ovat aitoja hiiren napautuksia siihen ruutupisteeseen,
 * johon merkki projisoituu (`pallo.getScreenCoords`), eikä savuke
 * kutsu `napautaKaupunki`a tai `doMove`a suoraan.
 *
 * ── VARTIOT (390 × 844 ja 1400 × 900, dpr 2, Lontoo) ──────────────
 *
 *   1. ILMAN NOPPAA NÄKYVÄ KAUPUNKI AVAA LIUSKAN (päätöksen kohta 4:
 *      *"siirtovaiheen ulkopuolella kaikki kuten ennen"*). Kohdemaan
 *      kaupungin merkki toimintavaiheessa → liuska auki. (Pariisia ei
 *      enää voi napauttaa tässä: PAATOKSET 43 kohta 8 piilottaa muiden
 *      maiden kaupungit siirtovaiheen ulkopuolella.)
 *   2. EI-KOHDEKAUPUNKI AVAA LIUSKAN SIIRTOVAIHEESSAKIN (kohta 2).
 *      Nopanheiton jälkeen napautetaan KOHDEMAAN kaupunkia, joka EI ole
 *      moveOptionsissa → liuska auki.
 *   3. PELAAJAN OMA KAUPUNKI AVAA YHÄ LIUSKAN (kohta 3), myös
 *      siirtovaiheessa.
 *   4. KOHDEKAUPUNGIN NAPAUTUS ALOITTAA SIIRRON (kohta 1). Pariisin
 *      merkki nopanheiton jälkeen → `ui.siirtoKaynnissa` tai liikkuva
 *      nappula (.pawn-moving) ilmestyy.
 *   5. EIKÄ AVAA LIUSKAA: koko siirron alun ajan `liuskaAuki()` on
 *      null JA `.pallolauta-liuska-rivi` -rivejä on DOMissa 0.
 *   6. KAMERA-AJO EI OLE LIUSKAN AJO (kohta 10 koskee vain liuskan
 *      avausta): kohdevalinnasta ei lähde LIUSKAN_AJO_MS-mittaista
 *      ajoa ennen siirtoa — siirron oma ennakkozoomi saa kameran
 *      koskemattomana.
 *   7. EI SIVUVIRHEITÄ.
 *
 * Kaappaus (vain 390 px): kohde napautettu, nappula liikkeellä, ei
 * liuskaa → tools/savukkeet/kaappaukset/kohdevalinta/kohdevalinta-390.png.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja: NODE_USE_ENV_PROXY=1 PORTTI=8831 \
 *      node tools/savukkeet/savuke-kohdevalinta.mjs
 *      (SAVUKE_RUUTU=390 tai 1400 rajaa yhteen ruutuun.)
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { LIUSKAN_AJO_MS } from '../../js/pallolauta/kamera.js';

const JUURI = new URL('../..', import.meta.url).pathname;
// Julkaisusarjassa kaappauskansio tulee ajurilta (tools/savukkeet/
// aja-sarja.mjs asettaa KAAPPAUKSET), paikallisesti oma kansio.
const KAAPPAUKSET = process.env.KAAPPAUKSET
  || join(JUURI, 'tools/savukkeet/kaappaukset/kohdevalinta');
mkdirSync(KAAPPAUKSET, { recursive: true });

/**
 * LONTOO, MAAREITTI, SILMÄLUKU 4 — omistajan iPad-kuvan tilanne.
 * Tällä heitolla Pariisi on kohdekaupunki (findMoves: c:pariisi) ja
 * samalla laudalla on kaupunkeja, jotka EIVÄT ole kohteita (vartio 2).
 */
const LAHTO = 'lontoo';
const KOHDE = 'pariisi';
const SILMA = 4;

/*
 * ── MUIDEN MAIDEN KAUPUNGIT OVAT PIILOSSA (PAATOKSET 43 kohta 8) ───
 *
 * v1947 piilottaa pelinäkymässä kohdemaan ULKOPUOLISET kaupungit,
 * kun siirtovaihe ei ole päällä (js/pallolauta/lauta.js
 * `pelinKaupunkirajaus` = kohdemaa + oma kaupunki + tarjolla olevat
 * kohteet). Tämä savuke napautti aiemmin Pariisia ilman noppaa
 * (vartio 1) ja Amsterdamia/Alppeja ei-kohteena (vartio 2) — ne ovat
 * nyt oikein piilossa, joten napautus meni paljaaseen CANVASiin ja
 * kumpikin vartio oli punainen syystä, joka EI ollut PAATOKSET 42:n
 * väite. Napautettavat kaupungit valitaan siksi samasta lähteestä
 * kuin rajaus itse: KOHDEMAAN kaupungeista (`pack.map.cityCountry`).
 *
 *   vartio 1 (ilman noppaa): kohdemaan kaupunki, joka ei ole oma
 *     (Lontoosta Edinburgh) — ja jos pallon laudalla ei ole yhdelläkään
 *     niistä pistettä, varalla on OMA kaupunki, joka on aina näkyvissä
 *     ja avaa liuskan siirtovaiheen ulkopuolella (kohta 4). Valinta
 *     kirjataan lokiin, jotta vihreästä näkee, kumpi mitattiin.
 *   vartio 2 (siirtovaiheessa): kohdemaan kaupunki, joka EI ole
 *     nopanheiton kohde eikä oma (Lontoosta silmällä 4: Bermuda tai
 *     Falkland — Edinburgh ja Pariisi ovat kohteita).
 *
 * Väite säilyy sanasta sanaan: kohdekaupungin napautus valitsee
 * siirron (vartiot 4–6), muu kaupunki avaa liuskan (1–3).
 */
const KARTTA = packById('maailmankartta');
const MAATAULU = KARTTA?.map?.cityCountry ?? {};
const KOHDEMAA = MAATAULU[LAHTO] ?? null;
const KOHDEMAAN_KAUPUNGIT = Object.keys(MAATAULU).filter((id) => MAATAULU[id] === KOHDEMAA);
/** Kuinka kauan liuskan avautumista odotetaan (kamera-ajo 1400 ms + ladonta). */
const LIUSKAN_ODOTUS_MS = 3500;
/** Kuinka kauan siirron alkua odotetaan napautuksen jälkeen. */
const SIIRRON_ODOTUS_MS = 6000;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); return; }
  console.log(`FAIL  ${nimi} — ${lisa}`);
  console.log(`::warning::${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
  .catch(() => null);
const chromium = paketti?.chromium ?? paketti?.default?.chromium ?? null;
const lopeta = (koodi) => {
  console.log(`\n${lapi}/${kaikki} vartiota läpi`);
  process.exit(koodi);
};
if (!chromium) {
  console.log('OHITUS  playwright puuttuu — savuke ohitetaan');
  lopeta(0);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata');
  palvelin.close();
  lopeta(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: LAHTO }],
  pack: KARTTA,
  seed: 5,
});
peli.phase = 'action';
const TALLENNE = JSON.stringify(peli.toJSON());

const konttiSelain = '/opt/pw-browsers/chromium';
const selainPolku = process.env.CHROMIUM
  ?? (existsSync(konttiSelain) ? konttiSelain : chromium.executablePath());
const selain = await chromium.launch({ executablePath: selainPolku });

/**
 * Kaupungin ruutupiste LUETAAN AINA TUOREENA (sama syy kuin
 * savuke-kaupunkipopupissa): liuskan avaus ajaa kameran, joten vanha
 * piste osoittaa seuraavalla napautuksella väärään paikkaan.
 */
const kaupunkiPiste = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const k = l.kaupunki(tunnus);
  if (!k) return null;
  const p = l.pallo.getScreenCoords(k.lat, k.lon, 0);
  const r = l.kotelo.getBoundingClientRect();
  return p ? { x: r.left + p.x, y: r.top + p.y } : null;
}, id);

/**
 * KAMERA LÄHDÖN JA KOHTEEN VÄLIIN, annetulla näkyvällä leveydellä.
 *
 * `saavu` rajaa PELAAJAN MAAHAN (mitattu: Britannia, 200 lautayksikköä),
 * jolloin Pariisi jäi ruudun ulkopuolelle eikä napautettavaa ollut.
 * Rajaus tehdään siksi kahden kaupungin välistä. `kerroin` avaa
 * näkymän laajemmalle silloin, kun mittaus tarvitsee muitakin
 * kaupunkeja kuin heiton kohteet (vartio 2).
 */
const rajaa = (sivu, kerroin) => sivu.evaluate(async ({ lahto, kohde, k }) => {
  const { ui, game: g } = window.matkakirja;
  const a = g.board.cityById.get(lahto);
  const b = g.board.cityById.get(kohde);
  const matka = Math.hypot(b.x - a.x, b.y - a.y);
  await ui.kamera().ajaKamera(
    { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, leveys: Math.max(matka * k, 150) },
    { kesto: 0 },
  );
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 1400));
}, { lahto: LAHTO, kohde: KOHDE, k: kerroin });

/**
 * KAMERA KAUPUNGIN PÄÄLLE ENNEN NAPAUTUSTA.
 *
 * Ruudun laidoilla on kalusteita, jotka OTTAVAT NAPAUTUKSEN: mitattu
 * 390 px:llä (Amsterdam kuplapinon P.fact-textin alla) ja 1400 px:llä
 * (Pariisi jäi rajauksessa kaluste-elementin alle, eikä napautus
 * päässyt pallon pinnalle — `viimeinenNapautus` jäi nulliksi eikä
 * yhtään kamera-ajoa lähtenyt). Ruudun keskusta on vapaa kaikilla
 * ruuduilla, joten mittaus vie merkin sinne. Tämä ei ole osa väitettä
 * — väite on se, mitä NAPAUTUS merkkiin tekee.
 */
const keskita = (sivu, id) => sivu.evaluate(async (tunnus) => {
  const { ui, game: g } = window.matkakirja;
  const c = g.board.cityById.get(tunnus);
  await ui.kamera().ajaKamera({ x: c.x, y: c.y, leveys: 200 }, { kesto: 0 });
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 1400));
}, id);

/**
 * ENSIMMÄINEN EHDOKAS, JOLLA ON OIKEASTI PISTE PALLOLLA.
 *
 * Pisteetöntä kaupunkia ei voi napauttaa (js/pallolauta/lauta.js
 * `pisteNakyy`), ja PAATOKSET 43 kohta 8:n rajauksen jälkeen piste on
 * vain kohdemaalla, omalla kaupungilla ja heiton kohteilla — lisäksi
 * nimikerros karsii kaukaiset. Kamera viedään siksi kunkin ehdokkaan
 * päälle ja piste luetaan laudan omasta pistekerroksesta, samasta
 * lähteestä kuin peli piirtää. Palauttaa valitun tunnuksen tai null.
 */
async function valitseNakyva(sivu, ehdokkaat) {
  const katsotut = [];
  for (const id of ehdokkaat) {
    /* eslint-disable no-await-in-loop */
    await keskita(sivu, id);
    const on = await sivu.evaluate((tunnus) => {
      const l = window.matkakirja.ui.pallolauta;
      return (l.pallo.pointsData() ?? []).some((d) => d?.id === tunnus);
    }, id);
    katsotut.push(`${id}:${on ? 'piste' : 'ei pistettä'}`);
    if (on) return { id, katsotut };
    /* eslint-enable no-await-in-loop */
  }
  return { id: null, katsotut };
}

/** Liuskan tila yhtenä lukemana: kerroksen lippu ja DOMin rivit. */
const liuskanTila = (sivu) => sivu.evaluate(() => ({
  auki: window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
  rivit: document.querySelectorAll('.pallolauta-liuska-rivi').length,
}));

/** Sulkee liuskan kerroksesta (ei kartan napautuksella: `korttiOliAuki`). */
const suljeLiuska = (sivu) => sivu.evaluate(() => {
  window.matkakirja.ui.pallolauta.nostot.suljeLiuska?.();
});

/** Nopanheitto ilman noppa-animaatiota: sama tila kuin heiton jälkeen. */
const heitaNoppa = (sivu, silma) => sivu.evaluate(async ({ s, lahto }) => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  g.player.pos = { type: 'city', city: lahto };
  g.phase = 'action';
  g.autoTravel = false;
  if (!g.actionTravel('land').ok) return { ok: false, syy: 'ei maareittiä' };
  g.die = s;
  g.phase = 'move';
  g.moves = findMoves(g.board, g.player.pos, s, { mode: 'land' });
  ui.render();
  await new Promise((r) => setTimeout(r, 800));
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 800));
  return {
    ok: true,
    kohteet: (g.moves ? [...g.moves.keys()] : []),
    merkkeja: ui.pallolauta.merkit.kohteet().length,
  };
}, { s: silma, lahto: LAHTO });

/**
 * Yksi ruutukoko: kolme napautusta ja niiden seuraukset.
 *
 * Järjestys on tarkka. Vartio 1 mitataan ENNEN noppaa (sen jälkeen
 * Pariisi on kohde), vartio 2 heiton jälkeen ei-kohteeseen ja vartiot
 * 3–5 vasta viimeisenä, koska siirto muuttaa pelaajan paikan.
 */
async function mittaa(ruutu) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
    isMobile: ruutu.w < 700,
    hasTouch: ruutu.w < 700,
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(e.message));
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(6000);
  await sivu.evaluate(async ({ lahto }) => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: lahto };
    g.world.visited.add(lahto);
    g.phase = 'action';
    g.autoTravel = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1600));
  }, { lahto: LAHTO, kohde: KOHDE });
  // Omistajan iPad-kuvan näkymä: Lontoo ja Pariisi samalla ruudulla.
  await rajaa(sivu, 3);

  const tulos = { virheet };
  // Lähtötila lokiin: ilman tätä punainen vartio ei kerro, oliko syy
  // napautuksessa vai siinä, ettei kaupunki ollut ruudulla.
  tulos.alkutila = await sivu.evaluate((tunnukset) => {
    const { ui, game: g } = window.matkakirja;
    const l = ui.pallolauta;
    const r = l.kotelo.getBoundingClientRect();
    const piste = (id) => {
      const k = l.kaupunki(id);
      if (!k) return 'ei kaupunkia';
      const p = l.pallo.getScreenCoords(k.lat, k.lon, 0);
      return p ? { x: Math.round(p.x), y: Math.round(p.y) } : 'ei ruutupistetta';
    };
    return {
      vaihe: g.phase,
      lauta: l.paalla?.() ?? null,
      kotelo: { w: Math.round(r.width), h: Math.round(r.height) },
      kamera: ui.kamera()?.kameranTila?.() ?? null,
      pisteet: Object.fromEntries(tunnukset.map((id) => [id, piste(id)])),
    };
  }, [LAHTO, KOHDE]);

  /*
   * ── vartio 1: ILMAN NOPPAA NÄKYVÄ KAUPUNKI AVAA LIUSKAN ─────────
   * Kohta 4: *"siirtovaiheen ulkopuolella kaikki kuten ennen"*.
   * Napautettava kaupunki on kohdemaan oma (PAATOKSET 43 kohta 8),
   * ensisijaisesti muu kuin pelaajan kaupunki; varalla oma kaupunki.
   */
  const ykkonen = await valitseNakyva(sivu, [
    ...KOHDEMAAN_KAUPUNGIT.filter((id) => id !== LAHTO), LAHTO,
  ]);
  tulos.ilmanNoppaaValinta = { maa: KOHDEMAA, ...ykkonen, omaVara: ykkonen.id === LAHTO };
  tulos.ilmanNoppaa = ykkonen.id
    ? await napautaJaOdotaLiuska(sivu, ykkonen.id)
    : { auki: null, syy: 'kohdemaassa ei pisteellistä kaupunkia' };
  await suljeLiuska(sivu);
  await sivu.waitForTimeout(400);
  // Takaisin omistajan iPad-kuvan rajaukseen ennen noppaa.
  await rajaa(sivu, 3);

  /* ── nopanheitto: Pariisi on nyt kohde ─────────────────────────── */
  const heitto = await heitaNoppa(sivu, SILMA);
  tulos.heitto = heitto;
  if (!heitto.ok) { return { ctx, sivu, tulos }; }

  /*
   * ── vartio 2: EI-KOHDEKAUPUNKI AVAA LIUSKAN SIIRTOVAIHEESSA ─────
   *
   * KAMERA AJETAAN VALITUN KAUPUNGIN PÄÄLLE ENNEN NAPAUTUSTA.
   * Lontoon ja Pariisin rajauksessa pallolla on piste vain viidellä
   * kaupungilla, ja ainoa ei-kohde ruudulla (Amsterdam) jäi
   * kuplapinon tekstikappaleen (P.fact-text) alle — napautus ei
   * päässyt pallon pinnalle asti (`viimeinenNapautus` jäi nulliksi).
   * Ruudun keskusta on vapaa, joten valinta tehdään ensin laudan
   * omista pisteistä ja kamera viedään sen päälle; vartiot 3–5
   * ajetaan taas omistajan omassa rajauksessa.
   */
  const eiKohde = await (async () => {
    const tila = await sivu.evaluate((idt) => {
      const { game: g } = window.matkakirja;
      const kohteina = new Set((g.moveOptions?.() ?? [])
        .map((o) => o.city?.id).filter(Boolean));
      const oma = g.player.pos?.city ?? null;
      return {
        kohteet: [...kohteina],
        oma,
        ehdokkaat: idt.filter((id) => !kohteina.has(id) && id !== oma),
      };
    }, KOHDEMAAN_KAUPUNGIT);
    const valinta = await valitseNakyva(sivu, tila.ehdokkaat);
    return { maa: KOHDEMAA, ...tila, ...valinta };
  })();
  tulos.eiKohde = eiKohde;
  if (eiKohde?.id) {
    await keskita(sivu, eiKohde.id);
    tulos.eiKohteenLiuska = await napautaJaOdotaLiuska(sivu, eiKohde.id);
    await suljeLiuska(sivu);
    await sivu.waitForTimeout(400);
  }

  /*
   * ── vartio 3: PELAAJAN OMA KAUPUNKI AVAA YHÄ LIUSKAN (kohta 3) ──
   * Oma kaupunki ei ole nopanheiton kohde, joten sen merkki kuuluu
   * yhä liuskalle myös siirtovaiheessa. Kamera viedään sen päälle
   * samasta syystä kuin ei-kohteella (kuplapino).
   */
  await keskita(sivu, LAHTO);
  tulos.omaKaupunki = await napautaJaOdotaLiuska(sivu, LAHTO);
  await suljeLiuska(sivu);
  await sivu.waitForTimeout(400);
  await keskita(sivu, KOHDE);

  /* ── vartiot 4–6: KOHDEKAUPUNGIN NAPAUTUS ALOITTAA SIIRRON ─────── */
  // Kamera-ajot talteen: kohdevalinnasta ei saa lähteä liuskan ajoa.
  await sivu.evaluate(() => {
    const kam = window.matkakirja.ui.kamera();
    window.__ajot = [];
    const alkuperainen = kam.ajaKamera.bind(kam);
    kam.ajaKamera = (kohde, valinnat) => {
      window.__ajot.push({ t: performance.now(), kesto: valinnat?.kesto ?? null });
      return alkuperainen(kohde, valinnat);
    };
  });
  const piste = await kaupunkiPiste(sivu, KOHDE);
  tulos.kohdePiste = piste;
  if (!piste) return { ctx, sivu, tulos };
  await sivu.evaluate(() => { window.__t0 = performance.now(); });
  await sivu.mouse.click(piste.x, piste.y);

  // Näyte joka 50 ms: alkoiko siirto, ja näkyikö liuska yhtenäkään hetkenä.
  const seuranta = { siirto: false, liuskaNakyi: false, riveja: 0, hetki: null };
  for (let i = 0; i < SIIRRON_ODOTUS_MS / 50; i += 1) {
    /* eslint-disable no-await-in-loop */
    const n = await sivu.evaluate(() => ({
      siirto: Boolean(window.matkakirja.ui.siirtoKaynnissa)
        || window.matkakirja.ui.movingPlayerId != null
        || Boolean(document.querySelector('.pawn-moving')),
      auki: window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
      rivit: document.querySelectorAll('.pallolauta-liuska-rivi').length,
      t: performance.now() - (window.__t0 ?? 0),
    }));
    if (n.auki || n.rivit > 0) {
      seuranta.liuskaNakyi = true;
      seuranta.riveja = Math.max(seuranta.riveja, n.rivit);
    }
    if (n.siirto && !seuranta.siirto) { seuranta.siirto = true; seuranta.hetki = Math.round(n.t); }
    // Kaappaus puhelinruudulla juuri kun nappula on liikkeellä.
    if (n.siirto && ruutu.nimi === '390' && !seuranta.kaappaus
      && await sivu.evaluate(() => Boolean(document.querySelector('.pawn-moving')))) {
      seuranta.kaappaus = true;
      await sivu.screenshot({ path: join(KAAPPAUKSET, 'kohdevalinta-390.png') });
    }
    if (seuranta.siirto && seuranta.kaappaus) break;
    if (seuranta.siirto && ruutu.nimi !== '390') break;
    await sivu.waitForTimeout(50);
    /* eslint-enable no-await-in-loop */
  }
  tulos.seuranta = seuranta;
  tulos.ajot = await sivu.evaluate(() => (window.__ajot ?? [])
    .map((a) => ({ t: Math.round(a.t - (window.__t0 ?? 0)), kesto: a.kesto })));
  return { ctx, sivu, tulos };
}

/**
 * Napauttaa kaupunkia ja odottaa liuskan avautumista.
 *
 * KAKSI YRITYSTÄ, JA SE ON MITATTU SYY (ks. savuke-kaupunkipopup):
 * juuri suljetun kortin jälkeen pelin oma portti (`korttiOliAuki`)
 * nielaisee seuraavan napautuksen. Väite on, että liuska aukeaa — ei
 * se, monennellako sormella. Piste luetaan tuoreena joka yrityksellä,
 * koska liuskan kamera-ajo siirtää merkkiä ruudulla.
 */
async function napautaJaOdotaLiuska(sivu, id) {
  let viimeinen = null;
  for (let yritys = 0; yritys < 2; yritys += 1) {
    /* eslint-disable no-await-in-loop */
    const p = await kaupunkiPiste(sivu, id);
    viimeinen = p;
    if (!p) return { id, piste: null, auki: null, rivit: 0, syy: 'ei ruutupistettä' };
    await sivu.mouse.click(p.x, p.y);
    for (let i = 0; i < LIUSKAN_ODOTUS_MS / 50; i += 1) {
      const tila = await liuskanTila(sivu);
      if (tila.auki) return { id, piste: p, yritys, ...tila };
      await sivu.waitForTimeout(50);
    }
    /* eslint-enable no-await-in-loop */
  }
  const lopullinen = await liuskanTila(sivu);
  // Punaisen vartion syy näkyviin: minkä laudan osumatesti valitsi.
  const osuma = await sivu.evaluate((kohta) => {
    const l = window.matkakirja.ui.pallolauta;
    const e = kohta ? document.elementFromPoint(kohta.x, kohta.y) : null;
    return {
      napautus: l.viimeinenNapautus?.() ?? null,
      paalla: e ? `${e.tagName}.${e.getAttribute('class') ?? ''}` : null,
    };
  }, viimeinen);
  return {
    id, piste: viimeinen, osuma, ...lopullinen,
  };
}

const RUUDUT = [
  { nimi: '390', w: 390, h: 844 },
  { nimi: '1400', w: 1400, h: 900 },
];
const VAIN = process.env.SAVUKE_RUUTU ?? '';

for (const ruutu of RUUDUT.filter((r) => !VAIN || r.nimi === VAIN)) {
  const { ctx, tulos } = await mittaa(ruutu);
  const t = ruutu.nimi;

  tieto(`${t} lähtötila`, JSON.stringify(tulos.alkutila ?? null));
  tieto(`${t} ilman noppaa napautettu`, JSON.stringify(tulos.ilmanNoppaaValinta ?? null));
  vaadi(`1 ${t}: ilman noppaa näkyvä kaupunki (${tulos.ilmanNoppaaValinta?.id ?? '—'}`
    + `${tulos.ilmanNoppaaValinta?.omaVara ? ', oma varalla' : ''}) avaa liuskan`,
    Boolean(tulos.ilmanNoppaa?.auki),
    JSON.stringify({ valinta: tulos.ilmanNoppaaValinta, tulos: tulos.ilmanNoppaa ?? null }));

  tieto(`${t} nopanheitto`, JSON.stringify(tulos.heitto ?? null));
  tieto(`${t} ei-kohdekaupunki`, JSON.stringify(tulos.eiKohde ?? null));
  vaadi(`2 ${t}: ei-kohdekaupunki (${tulos.eiKohde?.id ?? '—'}) avaa liuskan siirtovaiheessa`,
    Boolean(tulos.eiKohteenLiuska?.auki),
    JSON.stringify({ valittu: tulos.eiKohde, tulos: tulos.eiKohteenLiuska ?? null }));

  vaadi(`3 ${t}: pelaajan oma kaupunki avaa yhä liuskan siirtovaiheessa`,
    Boolean(tulos.omaKaupunki?.auki),
    JSON.stringify(tulos.omaKaupunki ?? null));

  const s = tulos.seuranta ?? {};
  tieto(`${t} kohteen napautus`, JSON.stringify({ piste: tulos.kohdePiste, ...s }));
  tieto(`${t} kamera-ajot napautuksen jälkeen`, JSON.stringify(tulos.ajot ?? []));
  vaadi(`4 ${t}: kohdekaupungin napautus aloittaa siirron (${s.hetki ?? '—'} ms)`,
    Boolean(s.siirto),
    JSON.stringify({ piste: tulos.kohdePiste, seuranta: s }));
  vaadi(`5 ${t}: liuskaa ei avattu (rivejä DOMissa ${s.riveja ?? 0})`,
    s.liuskaNakyi === false,
    JSON.stringify(s));
  /*
   * 6. KAMERA-AJO EI OLE LIUSKAN AJO. Liuskan avausajo on
   * LIUSKAN_AJO_MS (js/pallolauta/lauta.js) ja se lähtee heti
   * napautuksesta; siirron ennakkozoomilla on oma kestonsa
   * (js/siirtokoreografia.js). Vartio mittaa siis sen, ettei ensimmäinen
   * ajo napautuksen jälkeen ole liuskan mittainen.
   */
  const liuskanAjo = (tulos.ajot ?? []).find((a) => a.kesto === LIUSKAN_AJO_MS);
  vaadi(`6 ${t}: kohdevalinta ei aja liuskan kameraa`,
    !liuskanAjo,
    JSON.stringify(tulos.ajot ?? []));
  vaadi(`7 ${t}: ei sivuvirheitä`, (tulos.virheet ?? []).length === 0,
    (tulos.virheet ?? []).join(' | '));
  if (t === '390' && s.kaappaus) {
    tieto(`${t} kaappaus`, join(KAAPPAUKSET, 'kohdevalinta-390.png'));
  }
  await ctx.close();
}

await selain.close();
palvelin.close();
lopeta(lapi === kaikki ? 0 : 1);
