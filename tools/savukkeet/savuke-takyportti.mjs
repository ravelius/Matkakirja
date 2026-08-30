/*
 * Savuke: TÄKYNOSTOT KOHDEMALLIN MERKKEINÄ kaupungissa, jolla EI ole
 * fokusvirtaa (maapooli NOSTO_MAAT, js/fokusnosto.js nostoLisakohteet →
 * js/fokuskohteet.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA (v1298, muoto v1348). Maapoolin
 * (NOSTO_MAAT) täkynostot näkyivät alun perin vain kaupungeissa, joilla
 * on fokusvirtarivi, ja vika jäi kaikilta porteilta huomaamatta, koska
 * yksikkötestit lukevat dataa ja muut savukkeet ajoivat Kreikassa.
 * Tämä savuke vartioi yhä sitä polkua, jota mikään muu koe ei aja —
 * MAAPOOLI ILMAN FOKUSVIRTAA — Tromssassa ja Marseillessa: saman maan
 * kaupungeissa, joilla ei ole omaa fokusvirtaa.
 *
 * YHTENÄINEN KOHDEMALLI (Raamattu 29.8.2026) muutti esitystavan, ja
 * savuke mittaa nyt sen: tuikkiva keltainen piste ja nostopoolin
 * vuorottelu on PURETTU, ja nostot ovat kartan tavallisia
 * kohdemerkkejä kohteiden kerroksessa aihevaloineen. Kortti on sama
 * lunastuskortti kuin ennenkin, ja se aukeaa aina uudelleen.
 *
 * VARTIOT:
 *   1. MERKIT KARTALLA. Tromssassa (maailmankartta, ei fokusvirtaa)
 *      Norjan poolin molemmat nostot ovat kohdemerkkeinä
 *      (data-kohde="nosto-*"), jokaisella ≥44 px osuma ja aihevalo —
 *      ja tuikemekaniikan jäänteitä ei ole DOM:ssa lainkaan.
 *   2. KORTTI AUKEAA MERKISTÄ: lunastus (monikappaleinen teksti),
 *      pöllön kysymysnapit ja kohdemallin ylärivi aihesymboleineen.
 *   3. KORTTI AUKEAA UUDELLEEN sulkemisen jälkeen — luettu nosto ei
 *      katoa kartalta eikä vaihda paikkaa.
 *   4. LÄHEKKÄISET MERKIT EIVÄT JÄÄ PÄÄLLEKKÄIN. Ranskan molempien
 *      nostojen oma paikka on Pariisissa runsaan lautayksikön päässä
 *      toisistaan; kohdekerroksen erottelupassi (js/fokuskohteet.js
 *      eritteleKohdeRyhmat) pitää merkit erillään.
 *   5. BOTTI EI SAA TÄKYJÄ: fokusmoodi pois ⇒ ei yhtäkään nostomerkkiä.
 *   6. ISOISÄN KARTTALIITE Wienin maailmannäyttelytäyssä: liitearkki,
 *      lähderivi ja suurennos toimivat merkkireitin kautta.
 *
 * Peli istutetaan kaupunkiin pelitallenteen kautta, kuten muissakin
 * savukkeissa: lentoa ei voi odottaa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
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

/*
 * Pelitallenne: Fogg seisoo annetussa kaupungissa MAAILMANKARTALLA.
 *
 * Lauta vaihtui v1348:ssa europe → maailmankartta: kohdemallin merkit
 * elävät fokuslehden päällä (js/fokuskohteet.js nykyisenMaanKohteet),
 * ja maiden lehdet on rajattu maailmankartalle (js/packs/fokus-grc.js
 * FOKUS_POHJAT `lauta`). Euroopan erillislaudalla lehteä ei ole, joten
 * siellä ei ole kohdemerkkejäkään — nostot mukaan lukien.
 */
function tallenneKaupunkiin(id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  // Laatta käännetty: sama pelitilanne kuin ennenkin — kohdemallissa
  // merkit tosin näkyvät aarteesta riippumatta.
  peli.tokens.set(id, 'topaz');
  peli.revealed.delete(id);
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi sivu valmiiksi ladattuna annettuun kaupunkiin. */
async function avaaSivu(kaupunki, fokus = true) {
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript(([data, paalla]) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      // Lähtötila on pelaaja, joka ei ole vielä katsonut yhtään täkyä.
      localStorage.removeItem('matkakirja-takynostot-luetut');
      if (paalla) localStorage.removeItem('matkakirja-fokusmoodi');
      else localStorage.setItem('matkakirja-fokusmoodi', '0');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, [tallenneKaupunkiin(kaupunki), fokus]);
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ: kontin selain ei pääse ämpäriin
   * eikä Commonsiin, eikä savuke saa mitata verkkoyhteyttä.
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

/**
 * Kamera maan lehden ikkunaan ja odotus, kunnes lehti on purettu.
 *
 * Sivun lataus kesken pelin ei aja kameraa, joten kartta on latauksen
 * jälkeen YLEISKUVASSA eikä maalehteä (fokusPohjaBbox) ole — ja
 * kohdemallin merkit elävät lehden päällä. Sama temppu ja sama syy
 * kuin savuke-fokuskohteilla (ajaLehdelle): ensimmäisellä ajolla
 * rajaus tulee datasta (FOKUS_POHJAT), koska pelin oma rajaus on
 * yleiskuvassa tyhjä.
 */
async function ajaLehdelle(sivu, iso) {
  await sivu.evaluate((varakohde) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({
      bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? varakohde, marginaali: 0,
    });
  }, FOKUS_POHJAT[iso].rajaus);
  await sivu.waitForTimeout(4200);
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 30000 }).catch(() => {});
  await sivu.waitForTimeout(900);
}

/**
 * Kartan nostomerkit kohdekerroksesta: tunnus, nimi, valo ja
 * ruutupaikka. Kiertävällä laudalla sama merkki on kahdessa
 * kiertokohdassa; lista on TUNNUKSITTAIN ja kummastakin kopiosta
 * valitaan se, joka on ruudulla.
 */
const nostomerkit = (sivu) => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const keskipiste = (el) => {
    const r = el?.getBoundingClientRect?.();
    return r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
  };
  const ruudulla = (p) => p && p.x > 0 && p.y > 0
    && p.x < window.innerWidth && p.y < window.innerHeight;
  const merkit = new Map();
  for (const r of ui.fokuskohdeRyhmat ?? []) {
    if (!String(r.id ?? '').startsWith('nosto-')) continue;
    const g = r.g.querySelector('.fokuskohde');
    const rivi = {
      id: r.id,
      nimi: r.nimi ?? '',
      nimioNakyy: r.nimioNakyy !== false,
      valo: g?.querySelector('.karttavalo')?.getAttribute('data-aihe') ?? null,
      keski: keskipiste(g?.querySelector('.fokuskohde-osuma')),
      lapimitta: g?.querySelector('.fokuskohde-osuma')?.getBoundingClientRect().width ?? 0,
    };
    const vanha = merkit.get(r.id);
    if (!vanha || (!ruudulla(vanha.keski) && ruudulla(rivi.keski))) merkit.set(r.id, rivi);
  }
  return [...merkit.values()];
});

/** Tuikemekaniikan jäänteet DOM:ssa — kohdemallin jälkeen aina nollia. */
const tuikeJaanteet = (sivu) => sivu.evaluate(() => ({
  kerros: document.querySelectorAll('.fokusnosto-symbolit').length,
  osumat: document.querySelectorAll('.nostosym-tuike-osuma').length,
  tuikkeet: document.querySelectorAll('.nostosym-tuike-paalla').length,
  liuskat: document.querySelectorAll('.fokusnosto').length,
}));

/** Auki olevan lunastuskortin sisältö, tai null. */
const kortti = (sivu) => sivu.evaluate(() => {
  const k = document.querySelector('.fokusnosto-kortti');
  if (!k) return null;
  return {
    otsikko: k.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    ylariviSymboli: Boolean(k.querySelector('.fokusnosto-ylarivi .nostosym-ylarivi-symboli')),
    kappaleita: [...k.querySelectorAll('.fokusnosto-teksti p')]
      .filter((p) => (p.textContent ?? '').trim().length > 60).length,
    kysymyksia: k.querySelectorAll('.fokusnosto-kysymykset button').length,
    // Isoisän karttaliite: onko arkkia, ja onko sillä otsake, kuva ja
    // lähderivi. Kortti ilman `kartta`-kenttää palauttaa liite: false.
    liite: Boolean(k.querySelector('.fokusnosto-liite')),
    liiteOtsake: k.querySelector('.fokusnosto-liite-otsake')?.textContent ?? '',
    liiteLahde: k.querySelector('.fokusnosto-liite .fokusnosto-kuvalahde')?.textContent ?? '',
    liiteKuva: k.querySelector('.fokusnosto-liitekuva')?.getAttribute('src') ?? '',
  };
});

/* --- 1: merkit kartalla Tromssassa (Norja, ei fokusvirtaa) --- */

/*
 * KAUPUNKI VAIHTUI TAAS (v1348): Sevilla ja koko Espanja saivat omat
 * fokusvirtansa aalloissa 3–4C, joten "maapooli ilman fokusvirtaa"
 * mitataan nyt TROMSSASSA — Norjan poolin kirjoitti Bergen
 * (js/packs/fokusvirta-bergen.js, kaksi nostoa), eikä Tromssalla ole
 * omaa riviä js/packs/fokusvirrat.js:ssä.
 */
const madrid = await avaaSivu('tromssa');
await ajaLehdelle(madrid, 'NOR');
const espanja = await nostomerkit(madrid);
vaadi('maapoolin nostot ovat kartalla kohdemerkkeinä ilman fokusvirtaa',
  espanja.length === 2 && espanja.every((p) => p.keski),
  `${espanja.length} merkkiä: ${JSON.stringify(espanja.map((p) => p.id))}`);
vaadi('jokaisella nostomerkillä on kartan nimi',
  espanja.length > 0 && espanja.every((p) => p.nimi.length > 0),
  JSON.stringify(espanja.map((p) => p.nimi)));
vaadi('jokaisella nostomerkillä on aihevalo selitevalikkoa varten',
  espanja.every((p) => p.valo),
  JSON.stringify(espanja.map((p) => ({ id: p.id, valo: p.valo }))));
vaadi('osuma-alue on sormen mitta (≥44 px)',
  espanja.every((p) => p.lapimitta >= 43.5),
  JSON.stringify(espanja.map((p) => Math.round(p.lapimitta))));
const jaanteet = await tuikeJaanteet(madrid);
vaadi('tuikkiva piste ja liuska on purettu (ei jäänteitä DOM:ssa)',
  Object.values(jaanteet).every((n) => n === 0), JSON.stringify(jaanteet));

/* --- 2: kortti aukeaa merkistä, lunastus ja kysymysnapit --- */

const eka = espanja.find((p) => p.keski) ?? espanja[0];
await madrid.mouse.click(Math.round(eka.keski.x), Math.round(eka.keski.y));
await madrid.waitForTimeout(700);
const avattu = await kortti(madrid);
vaadi('nostomerkin napautus avaa lunastuskortin',
  Boolean(avattu?.otsikko?.length),
  JSON.stringify(avattu));
vaadi('kortin ylärivi on kohdemallin yhteinen (aihesymboli)',
  avattu?.ylariviSymboli === true, JSON.stringify(avattu));
vaadi('kortissa on lunastusteksti eikä pelkkä otsikko',
  (avattu?.kappaleita ?? 0) >= 2, `${avattu?.kappaleita} kappaletta`);
vaadi('kortissa on pöllön kysymysnapit',
  (avattu?.kysymyksia ?? 0) === 3, `${avattu?.kysymyksia} nappia`);
// Karttaliite on valinnainen kenttä: ilman sitä kortti latoutuu kuten
// ennenkin eikä arkkia synny tyhjänä (ks. vartio 6).
vaadi('täky ilman karttaliitettä latoo kortin ilman liitearkkia',
  avattu?.liite === false, JSON.stringify(avattu));

/* --- 3: merkki pysyy ja kortti aukeaa uudelleen --- */

await madrid.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await madrid.waitForTimeout(800);
const luennanJalkeen = await nostomerkit(madrid);
const sama = luennanJalkeen.find((p) => p.id === eka.id);
vaadi('luettu nosto pysyy kartalla samassa paikassa',
  Boolean(sama?.keski) && Math.hypot(sama.keski.x - eka.keski.x, sama.keski.y - eka.keski.y) < 2,
  JSON.stringify({ ennen: eka.keski, jalkeen: sama?.keski }));
if (sama?.keski) {
  await madrid.mouse.click(Math.round(sama.keski.x), Math.round(sama.keski.y));
  await madrid.waitForTimeout(700);
}
const uudelleen = await kortti(madrid);
vaadi('luetun noston napautus avaa kortin uudelleen',
  Boolean(uudelleen?.otsikko?.length), JSON.stringify(uudelleen));
await madrid.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await madrid.context().close();

/* --- 4: kaksi lähekkäistä nostoa eivät jää päällekkäin (Marseille) --- */

const pariisi = await avaaSivu('marseille');
await ajaLehdelle(pariisi, 'FRA');
const ranska = await nostomerkit(pariisi);
vaadi('Ranskan molemmat nostot ovat kartalla',
  ranska.length === 2 && ranska.every((p) => p.keski),
  JSON.stringify(ranska.map((p) => p.id)));
const etaisyys = ranska.length === 2 && ranska[0].keski && ranska[1].keski
  ? Math.hypot(ranska[0].keski.x - ranska[1].keski.x, ranska[0].keski.y - ranska[1].keski.y)
  : 0;
// Erottelupassin minimi on merkin oma mitta (js/fokuskohteet.js
// KOHDE_ERO_MIN ≈ 10 yksikköä perustasolla) — ei sormialue: napautukset
// ratkoo lähin keskipiste, joten sormialueet saavat limittyä.
vaadi('erottelupassi pitää merkit erillään',
  etaisyys >= 8,
  `etäisyys ${Math.round(etaisyys)} px`);
await pariisi.context().close();

/* --- 5: portin toinen puoli — fokusmoodi pois, ei merkkejä --- */

try {
  const pois = await avaaSivu('tromssa', false);
  const ilmanFokusta = await nostomerkit(pois);
  vaadi('fokusmoodi pois: ei nostomerkkejä',
    ilmanFokusta.length === 0, `${ilmanFokusta.length} merkkiä`);
  await pois.context().close();
} catch (virhe) {
  // Kontissa fokusmoodi pois + tallenne kaataa Chromiumin rendererin
  // (todettu 30.8.2026 myös mainin koodilla) — kirjataan FAIL eikä
  // kaadeta koko savuketta, jotta loput vartiot ajetaan.
  vaadi('fokusmoodi pois: ei nostomerkkejä', false, `sivu ei auennut: ${virhe}`);
}

/* --- 6: isoisän karttaliite Wienin maailmannäyttelytäyssä --- */

/*
 * KOLMAS KUVA, JOTA LUETAAN. Raamatun linjaus 29.8.2026 antaa
 * kaiverretulle aikalaiskartalle oman roolinsa (paikka sellaisena kuin
 * isoisä sen tunsi), ja pilotti on Wienin maailmannäyttely 1873. Liite
 * on repon oma tiedosto ilman Commons-varareittiä, ja sen suurennos
 * kulkee kartan kohteiden mekanismilla (js/fokuskohteet.js
 * avaaKohdeSuurennos) — kumpikaan ei näy yhdessäkään datatestissä.
 */
const wien = await avaaSivu('wien');
await ajaLehdelle(wien, 'AUT');
/*
 * WIENILLÄ ON OMA FOKUSVIRTA, ja saapuminen avaa Livian kuplan tai
 * kortin kartan päälle. Suljetaan kelluvat pinnat ennen merkin
 * napautusta, jottei napautus osu niihin — pelaaja tekisi saman.
 */
await wien.keyboard.press('Escape');
await wien.waitForTimeout(300);
await wien.evaluate(() => {
  document.querySelector('.fokusvirta-kupla')?.remove();
  document.querySelector('.fokusvirta-kortti')?.remove();
});
const itavalta = await nostomerkit(wien);
const nayttely = itavalta.find((p) => p.id === 'nosto-maailmannayttely-1873');
vaadi('Wienin maailmannäyttelytäky on kartalla',
  Boolean(nayttely?.keski), JSON.stringify(itavalta.map((p) => p.id)));
if (nayttely?.keski) {
  await wien.mouse.click(Math.round(nayttely.keski.x), Math.round(nayttely.keski.y));
  await wien.waitForTimeout(900);
}
const liitekortti = await kortti(wien);
vaadi('kortissa on isoisän karttaliite otsakkeineen',
  Boolean(liitekortti?.liite) && /liite/i.test(liitekortti?.liiteOtsake ?? ''),
  JSON.stringify(liitekortti));
vaadi('karttaliitteen kuva on repon oma tiedosto',
  (liitekortti?.liiteKuva ?? '').includes('karttaliitteet/'),
  liitekortti?.liiteKuva ?? '(ei kuvaa)');
vaadi('karttaliitteessä on lähderivi lisensseineen',
  /public domain|CC /i.test(liitekortti?.liiteLahde ?? ''),
  liitekortti?.liiteLahde ?? '(ei lähdettä)');

await wien.evaluate(() => document.querySelector('.fokusnosto-liitenappi')?.click());
await wien.waitForTimeout(900);
const suurennettu = await wien.evaluate(() => ({
  zoom: Boolean(document.querySelector('.fokuskohde-zoom')),
  kuva: document.querySelector('.fokuskohde-zoom img')?.getAttribute('src') ?? '',
  kortti: Boolean(document.querySelector('.fokusnosto-kortti')),
}));
vaadi('liitteen napautus avaa kartan suurennoksen',
  suurennettu.zoom && suurennettu.kuva.includes('karttaliitteet/'),
  JSON.stringify(suurennettu));
vaadi('kortti jää suurennoksen taakse auki', suurennettu.kortti, JSON.stringify(suurennettu));

// Escape sulkee ENSIN suurennoksen — ei koko korttia sen alta.
await wien.keyboard.press('Escape');
await wien.waitForTimeout(700);
const escin_jalkeen = await wien.evaluate(() => ({
  zoom: Boolean(document.querySelector('.fokuskohde-zoom')),
  kortti: Boolean(document.querySelector('.fokusnosto-kortti')),
}));
vaadi('Esc sulkee suurennoksen mutta jättää kortin auki',
  !escin_jalkeen.zoom && escin_jalkeen.kortti, JSON.stringify(escin_jalkeen));
await wien.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
