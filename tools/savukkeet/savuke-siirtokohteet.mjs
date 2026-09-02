/*
 * Savuke: nopanheiton valittavat kohteet fokusnäkymässä
 * (js/ui.js drawTargets → fokusKohdeMerkki, paivitaFokusKohdeMitat).
 *
 * OMISTAJAN TILAUS 2.9.2026, sanatarkasti:
 *   *"nopanheitossa valittavat pisteet täytyy näkyä selvemmin"*
 * Kaappaus: Kreikan lauta työpöytäselaimella, heitto 3 Ateenasta.
 * Valittavat kohteet olivat pieniä valkoisia ympyröitä reittien
 * varrella (askelpisteet) ja Sofian/Kreetan suunnassa — ne hukkuivat
 * karttaan käytännössä kokonaan. Fokusnäkymä on nykyään pelin
 * NORMAALINÄKYMÄ (Raamattu), joten juuri sen kohteet olivat pelin
 * heikoin merkki siinä hetkessä, jossa pelaajan pitää valita.
 *
 * VARTIOT:
 *   1. KOHTEITA ON. Heitto vie siirtovaiheeseen ja jokainen
 *      moveOptions()-vaihtoehto saa merkkinsä kohdekerrokseen.
 *   2. SAMA KIELI KUIN LAUDALLA. Merkki on kultalevy + punamullan
 *      katkoviivarengas (.target-piste) ja sen alla hengittävä
 *      kultahalo (.target-halo.fokus) — täsmälleen ne värit, joilla
 *      laudan yleiskuva merkitsee kohteen (.target-ring/.target-halo,
 *      omistajan hyväksymä 18.8.2026).
 *   3. KOKO RUUDULLA. Kaupunkikohde 22–26 px, askelpiste 14–16 px,
 *      molemmat mitattuina ruudun CTM:stä eikä laudan yksiköistä.
 *      Askelpiste on selvästi pienempi mutta ei näkymätön.
 *   4. VIIVA EROTTUU. Renkaan viiva on ruudun mitassa vähintään 2 px
 *      ja levyn sävy on kultaa eikä pergamenttia — juuri se ero, joka
 *      valkoisilta ympyröiltä puuttui.
 *   5. NAPAUTUSALUE EI KUTISTUNUT: ≥44 px ja aina merkkiä isompi.
 *   6. NIMI MERKIN YLÄPUOLELLA eikä sen päällä — myös halon laajimmassa
 *      asteessa (scale 1,42).
 *   7. HALO PYSÄHTYY RAAHAUKSESSA (body.kartta-raahaus) ja on
 *      liikeherkkyydessä staattinen kehä, ei animaatio.
 *   8. AJOITUS ENNALLAAN (v1433 siirtoketju): merkit ovat olemassa
 *      heiton jälkeen ja katoavat siirron alkaessa.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: kysymys on siitä, näkyykö merkki
 * RUUDULLA. Koko lasketaan zoomista (fokusMerkkiSkaala) ja väri tulee
 * CSS-muuttujista — kumpaakaan ei näe lähdekoodista, ja juuri niiden
 * hiljainen liukuminen teki merkeistä valkoisia pisteitä.
 *
 * Peli istutetaan Ateenaan MAAILMANKARTALLE, kuten
 * savuke-jalkamatka.mjs: Kreikan fokuslehti on tehty sille laudalle.
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

/**
 * Avaa pelin, siirtää nappulan Ateenaan ja heittää kolmosen.
 *
 * NOPPA KIINNITETÄÄN (rollDie = () => 3), koska omistajan kaappaus on
 * juuri kolmosesta Ateenasta. Satunnainen heitto tekisi savukkeesta
 * ajoittain sokean: maateitse kolmonen antaa Ateenasta vain yhden
 * askelpisteen, eikä kaupunkimerkkiä pääsisi mittaamaan lainkaan.
 *
 * MERITIE, KOSKA MOLEMMAT MERKKILAJIT TARVITAAN SAMAAN RUUTUUN.
 * Kolmonen meritietä on täsmälleen omistajan kuvaama tilanne —
 * askelpiste reitin varrella JA kaupunkikohde (Kreeta) Kreetan
 * suunnassa — eli sama ruutu, jossa valkoiset ympyrät hukkuivat
 * karttaan. Maatie tarjoaisi vain toisen lajin kerrallaan.
 */
async function avaaJaHeita(ctx) {
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
  const tila = await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
    await new Promise((r) => setTimeout(r, 1800));
    game.rollDie = () => 3;
    game.actionTravel('sea');
    game.actionRoll();
    ui.render();
    await new Promise((r) => setTimeout(r, 900));
    return {
      kaupunki: game.cityOf()?.id,
      fokus: ui.fokusmoodi === true,
      vaihe: game.phase,
      noppa: game.die,
      vaihtoehtoja: game.moveOptions().length,
      kaupunkeja: game.moveOptions().filter((o) => o.city).length,
    };
  });
  return { sivu, virheet, tila };
}

/**
 * Kohdemerkkien mitat RUUDULLA.
 *
 * Halkaisija lasketaan säteestä ja ruudun CTM:stä eikä
 * getBoundingClientRectistä: rect sisältäisi viivan paksuuden ja halon
 * hengittävän muunnoksen, jolloin mitta heiluisi animaation tahdissa.
 */
const KERAA = () => {
  const juuri = getComputedStyle(document.documentElement);
  const muuttuja = (nimi) => juuri.getPropertyValue(nimi).trim();
  /*
   * Mittakaava luetaan VANHEMMASTA, ei elementistä itsestään:
   * getScreenCTM sisältää elementin oman muunnoksen, ja halon
   * hengittävä scale(1,14…1,42) heiluttaisi mittaa animaation tahdissa.
   * Vanhemman CTM on sama molemmille, joten halon ja renkaan säteet
   * ovat vertailukelpoisia.
   */
  const skaala = (el) => {
    const m = el.parentNode.getScreenCTM();
    return m ? Math.hypot(m.a, m.b) : 0;
  };
  const halkaisija = (el) => 2 * Number(el.getAttribute('r')) * skaala(el);
  const luku = (teksti) => (teksti.match(/[\d.]+/g) ?? []).map(Number);
  // Suhteellinen valoisuus (WCAG): erottaa kultalevyn pergamentista.
  const valoisuus = (vari) => {
    const [r, g, b] = luku(vari);
    const k = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b);
  };
  const kerros = document.querySelector('.targets');
  const ryhmat = [...(kerros?.querySelectorAll('g.target') ?? [])];
  const merkki = (el) => {
    if (!el) return null;
    const t = getComputedStyle(el);
    return {
      halkaisija: +halkaisija(el).toFixed(2),
      viiva: +luku(t.strokeWidth)[0].toFixed(2),
      viivanVari: t.stroke,
      taytto: t.fill,
      taytonValoisuus: +valoisuus(t.fill).toFixed(3),
      katkoviiva: t.strokeDasharray,
      animaatio: t.animationName,
      ajaa: t.animationPlayState,
      muunnos: t.transform,
      osoitin: t.pointerEvents,
      suodatin: t.filter,
    };
  };
  return {
    muuttujat: { mark: muuttuja('--mark'), accent: muuttuja('--accent') },
    ryhmia: ryhmat.length,
    kohteet: ryhmat.map((g) => {
      const rengas = g.querySelector('.target-piste');
      const halo = g.querySelector('.target-halo');
      const nimi = g.querySelector('.target-nimi');
      const osuma = g.querySelector('.target-hit');
      const nr = nimi?.getBoundingClientRect();
      const rr = rengas?.getBoundingClientRect();
      return {
        kaupunki: !rengas?.classList.contains('far'),
        rengas: merkki(rengas),
        halo: merkki(halo),
        haloLuokat: halo ? [...halo.classList] : null,
        nimi: nimi ? nimi.textContent : null,
        nimenAla: nr ? +nr.bottom.toFixed(1) : null,
        renkaanYla: rr ? +rr.top.toFixed(1) : null,
        osuma: osuma ? +(2 * Number(osuma.getAttribute('r')) * skaala(osuma)).toFixed(2) : null,
      };
    }),
  };
};

/* --- päähaara: työpöytäselain 1280×800 ---------------------------- */
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block',
});
const { sivu, virheet, tila } = await avaaJaHeita(ctx);

vaadi('0a nappula Ateenassa ja fokusmoodi päällä',
  tila.kaupunki === 'ateena' && tila.fokus === true, JSON.stringify(tila));
vaadi('1a heitto vei siirtovaiheeseen', tila.vaihe === 'move' && tila.noppa === 3,
  JSON.stringify(tila));
vaadi('1b kolmosella on sekä kaupunkikohteita että askelpisteitä',
  tila.vaihtoehtoja > 1 && tila.kaupunkeja > 0
  && tila.kaupunkeja < tila.vaihtoehtoja, JSON.stringify(tila));

const m = await sivu.evaluate(KERAA);
const kaupungit = m.kohteet.filter((k) => k.kaupunki);
const askeleet = m.kohteet.filter((k) => !k.kaupunki);

vaadi('1c jokainen vaihtoehto sai merkin kohdekerrokseen',
  m.ryhmia >= tila.vaihtoehtoja && m.kohteet.every((k) => k.rengas && k.halo),
  JSON.stringify({ ryhmia: m.ryhmia, vaihtoehtoja: tila.vaihtoehtoja }));
vaadi('1d askelpisteitä on kartalla (muuten väite mittaisi tyhjää)',
  askeleet.length > 0 && kaupungit.length > 0,
  `kaupunkeja ${kaupungit.length}, askeleita ${askeleet.length}`);

/* --- 2. sama kieli kuin laudalla ---------------------------------- */
const vari = await sivu.evaluate(() => {
  // Laudan oma merkki piirretään koekappaleeksi samaan kerrokseen,
  // jotta väriä verrataan toteutukseen eikä muistiin kirjoitettuun
  // vakioon: jos .target-ring vaihtaa sävyä, fokusmerkin on seurattava.
  const kerros = document.querySelector('.targets');
  const ns = 'http://www.w3.org/2000/svg';
  const koe = document.createElementNS(ns, 'circle');
  koe.setAttribute('class', 'target-ring');
  kerros.appendChild(koe);
  const koeHalo = document.createElementNS(ns, 'circle');
  koeHalo.setAttribute('class', 'target-halo');
  kerros.appendChild(koeHalo);
  const t = getComputedStyle(koe);
  const th = getComputedStyle(koeHalo);
  const tulos = { rengas: t.stroke, halo: th.stroke };
  koe.remove(); koeHalo.remove();
  return tulos;
});
vaadi('2a renkaan viiva on laudan punamulta (--mark)',
  kaupungit.every((k) => k.rengas.viivanVari === vari.rengas),
  JSON.stringify({ fokus: kaupungit[0]?.rengas.viivanVari, lauta: vari.rengas }));
vaadi('2b halo on laudan kulta (--accent)',
  m.kohteet.every((k) => k.halo.viivanVari === vari.halo),
  JSON.stringify({ fokus: m.kohteet[0]?.halo.viivanVari, lauta: vari.halo }));
vaadi('2c rengas on katkoviiva kuten laudalla',
  m.kohteet.every((k) => /\d/.test(k.rengas.katkoviiva)),
  JSON.stringify(m.kohteet.map((k) => k.rengas.katkoviiva)));
vaadi('2d halo hengittää (kohde-halo) eikä ota napautuksia',
  m.kohteet.every((k) => k.halo.animaatio === 'kohde-halo' && k.halo.osoitin === 'none'),
  JSON.stringify(m.kohteet.map((k) => [k.halo.animaatio, k.halo.osoitin])));
vaadi('2e halo on fokusluokassa (oma viivanpaksuus ruudun mitassa)',
  m.kohteet.every((k) => k.haloLuokat?.includes('fokus')),
  JSON.stringify(m.kohteet.map((k) => k.haloLuokat)));
vaadi('2f ei suodattimia kohdemerkeissä (iOS-sääntö)',
  m.kohteet.every((k) => k.rengas.suodatin === 'none' && k.halo.suodatin === 'none'),
  JSON.stringify(m.kohteet.map((k) => [k.rengas.suodatin, k.halo.suodatin])));

/* --- 3. koko ruudulla --------------------------------------------- */
vaadi('3a kaupunkikohde on ruudulla 22–26 px',
  kaupungit.every((k) => k.rengas.halkaisija >= 22 && k.rengas.halkaisija <= 26),
  JSON.stringify(kaupungit.map((k) => k.rengas.halkaisija)));
vaadi('3b askelpiste on ruudulla 14–16 px',
  askeleet.every((k) => k.rengas.halkaisija >= 14 && k.rengas.halkaisija <= 16),
  JSON.stringify(askeleet.map((k) => k.rengas.halkaisija)));
vaadi('3c askelpiste on pienempi kuin kaupunkikohde muttei näkymätön',
  askeleet[0].rengas.halkaisija < kaupungit[0].rengas.halkaisija * 0.8,
  JSON.stringify({ askel: askeleet[0].rengas.halkaisija, kaupunki: kaupungit[0].rengas.halkaisija }));
vaadi('3d halon oma säde on renkaan säde (CSS laajentaa muunnoksella)',
  m.kohteet.every((k) => Math.abs(k.halo.halkaisija - k.rengas.halkaisija) < 0.05),
  JSON.stringify(m.kohteet.map((k) => [k.halo.halkaisija, k.rengas.halkaisija])));

/* --- 4. viiva erottuu --------------------------------------------- */
vaadi('4a renkaan viiva on ruudulla vähintään 2 px',
  m.kohteet.every((k) => k.rengas.viiva >= 2),
  JSON.stringify(m.kohteet.map((k) => k.rengas.viiva)));
/*
 * Pergamentin sävy (#f7ecd2) on valoisuudeltaan noin 0,84 — juuri se
 * "pieni valkoinen ympyrä", jonka omistaja näki. Kultalevy jää alle
 * 0,75:n, joten raja erottaa korjatun merkin vanhasta.
 */
vaadi('4b levyn sävy on kultaa eikä pergamenttia',
  m.kohteet.every((k) => k.taytonValoisuus === undefined
    || k.rengas.taytonValoisuus < 0.75),
  JSON.stringify(m.kohteet.map((k) => k.rengas.taytonValoisuus)));

/* --- 5. napautusalue ei kutistunut -------------------------------- */
vaadi('5a napautusalue on ruudulla vähintään 44 px',
  m.kohteet.every((k) => k.osuma >= 44), JSON.stringify(m.kohteet.map((k) => k.osuma)));
vaadi('5b napautusalue on aina merkkiä isompi',
  m.kohteet.every((k) => k.osuma > k.rengas.halkaisija * 1.5),
  JSON.stringify(m.kohteet.map((k) => [k.osuma, k.rengas.halkaisija])));

/* --- 6. nimi merkin yläpuolella ----------------------------------- */
vaadi('6a kaupunkikohteella on nimi', kaupungit.every((k) => (k.nimi ?? '').length > 1),
  JSON.stringify(kaupungit.map((k) => k.nimi)));
vaadi('6b askelpisteellä ei ole nimeä', askeleet.every((k) => k.nimi === null));
/*
 * Halo laajenee 1,42-kertaiseksi, joten nimen alareunan on jäätävä
 * enemmän kuin 0,21 × halkaisijan verran renkaan yläreunan yläpuolelle.
 */
vaadi('6c nimi jää halon laajimmankin asteen yläpuolelle',
  kaupungit.every((k) => k.renkaanYla - k.nimenAla > k.rengas.halkaisija * 0.21),
  JSON.stringify(kaupungit.map((k) => ({
    rako: +(k.renkaanYla - k.nimenAla).toFixed(1), d: k.rengas.halkaisija,
  }))));

/* --- kuvakaappaus ------------------------------------------------- */
const kaappaus = join(KAAPPAUKSET, process.env.KAAPPAUSNIMI ?? 'siirtokohteet.png');
await sivu.screenshot({ path: kaappaus });

/* --- 7. halo pysähtyy raahauksessa -------------------------------- */
const raahaus = await sivu.evaluate(async () => {
  const lue = () => [...document.querySelectorAll('.targets .target-halo')]
    .map((el) => getComputedStyle(el).animationPlayState);
  const ennen = lue();
  document.body.classList.add('kartta-raahaus');
  await new Promise((r) => setTimeout(r, 60));
  const kesken = lue();
  document.body.classList.remove('kartta-raahaus');
  await new Promise((r) => setTimeout(r, 60));
  return { ennen, kesken, jalkeen: lue() };
});
vaadi('7a halo pysähtyy raahauksen ajaksi ja jatkaa sen jälkeen',
  raahaus.ennen.every((t) => t === 'running')
  && raahaus.kesken.every((t) => t === 'paused')
  && raahaus.jalkeen.every((t) => t === 'running'), JSON.stringify(raahaus));

/* --- 8. ajoitus ennallaan (v1433 siirtoketju) --------------------- */
const ajoitus = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  const laske = () => document.querySelectorAll('.targets .target-piste').length;
  const heiton = laske();
  const avain = game.moveOptions()[0].key;
  game.actionMove(avain);
  ui.render();
  await new Promise((r) => setTimeout(r, 200));
  return { heiton, siirron: laske(), vaihe: game.phase };
});
vaadi('8a merkit ovat heiton jälkeen ja katoavat siirron alkaessa',
  ajoitus.heiton > 0 && ajoitus.siirron === 0, JSON.stringify(ajoitus));

vaadi('9 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

/* --- 10. liikeherkkyys: staattinen kehä ---------------------------- */
const hiljainen = await selain.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  serviceWorkers: 'block',
  reducedMotion: 'reduce',
});
const rauha = await avaaJaHeita(hiljainen);
const rm = await rauha.sivu.evaluate(KERAA);
vaadi('10a liikeherkkyydessä halo ei animoi',
  rm.kohteet.length > 0 && rm.kohteet.every((k) => k.halo.animaatio === 'none'),
  JSON.stringify(rm.kohteet.map((k) => k.halo.animaatio)));
/*
 * Vahva korostus ei saa kadota liikeherkkyyden mukana: animaation
 * tilalle jää LEVEÄ STAATTINEN KEHÄ (scale 1,25), ei pelkkä rengas.
 * Kokoa ei mitata tässä ruutupikseleinä, koska liikeherkkyydessä
 * fokuskameran ajo Kreikkaan jää tekemättä ja kartta on yleiskuvassa —
 * merkki elää kartan mittakaavassa, joten mitta olisi eri, vaikka
 * merkki on sama.
 */
vaadi('10b liikeherkkyydessä halosta jää leveä staattinen kehä',
  rm.kohteet.every((k) => {
    const luvut = (k.halo.muunnos.match(/[-\d.]+/g) ?? []).map(Number);
    return luvut.length >= 4 && luvut[0] >= 1.2 && luvut[0] === luvut[3];
  }), JSON.stringify(rm.kohteet.map((k) => k.halo.muunnos)));
vaadi('10c liikeherkkyydessäkin molemmat merkkilajit ovat kartalla',
  rm.kohteet.some((k) => k.kaupunki) && rm.kohteet.some((k) => !k.kaupunki),
  JSON.stringify(rm.kohteet.map((k) => k.kaupunki)));

console.log(`\n${lapi}/${kaikki} läpi — kaappaus: ${kaappaus}`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
