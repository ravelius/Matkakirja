/*
 * Savuke: KAUPUNKILEHTIEN SIVUT OVAT KARTALLA KLIKATTAVINA.
 *
 * Yleistys savuke-pariisin-nostot.mjs:stä (erä 5) koko erän 10
 * kaupunkilistalle: Lontoo, Rooma, Berliini, Madrid, Wien ja Amsterdam.
 * Sama jako, samat vartiot, yksi ajo. Kaupunkilista annetaan
 * parametrina, joten seuraava erä lisää siihen rivin eikä tiedostoa.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   0. MERKKIMÄÄRÄT PYSYVÄT RAJOISSA. Pääkartalla maata kohti ≤ 21 ja
 *      kohdekartalla ≤ 24 (ks. TEHTÄVÄNANNON RAJAT alla). Maat, jotka olivat
 *      pääkartan rajan yli JO ENNEN tätä erää (Saksa, Espanja, Italia),
 *      mitataan sillä, ettei luku kasva — erä ei vie yhtään merkkiä
 *      pääkartalle, ja vanha ylitys on oma, tätä erää edeltävä asiansa.
 *   1. JOKAISELLA UUDELLA NOSTOLLA ON KOHDEKARTTAPISTE eikä yksikään
 *      ole pääkartalla (omistajan sääntö 2.9.2026).
 *   2. KIINTIÖ: minikysymys joka kolmannessa kaupungin nostossa.
 *   3. VASTAKOE (väite): kun yhden uuden noston kohdekarttapiste
 *      poistetaan ajossa, nosto menettää karttapaikkansa ja vartio 1
 *      kaatuisi. Jos näin ei käy, savuke ei mittaa sitä, mitä väittää.
 *   4. JOKAINEN UUSI NOSTO AVAUTUU KORTIKSI pallon päällä, ja kortin
 *      leipäteksti on SANATARKASTI noston oma `lunastus`.
 *   5. KAUPUNKILEHTI AVAUTUU YHÄ ja sen kohdekartta piirtää pisteensä.
 *   6. MINIKYSYMYKSEN VASTAUS ON SAMAN KORTIN TEKSTISSÄ sanatarkasti.
 *   7. GALLERIA ON KORTIN OMA: `galleria`-kenttäinen nosto saa
 *      selailunuolet ja laskurin, ja nuoli vaihtaa kuvan selitteineen.
 *   8. MUSIIKKI JA ÄÄNI OVAT KORTIN OMIA: mediakenttäinen nosto saa
 *      mediarivin samoilla napeilla kuin lehden sivu.
 *   9. VASTAKOE (väite): kun `galleria`- ja mediakentät poistetaan
 *      ajossa, nuolet, laskuri ja mediarivi katoavat kortilta —
 *      vartiot 7–8 mittaavat siis juuri niitä kenttiä.
 *
 * Vartiot 0–3 ja 6 ajetaan Nodessa pelin omilla funktioilla
 * (tools/tarkista-nostopaikat.mjs), vartiot 4–5 selaimessa pallolaudalla.
 *
 * MIKÄ ON "UUSI NOSTO": nosto, jonka `lahde`-rivi kertoo sen siirtyneen
 * karttauudistuksen erässä 10. Lista ei siis ole käsin ylläpidettävä
 * kopio datasta, joka voisi ajautua siitä erilleen.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kaupunkien-nostot.mjs [kuvakansio] [kaupunki,...]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRRAT } from '../../js/packs/fokusvirrat.js';
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { paakartanNostot, kohdekarttojenNostot } from '../tarkista-nostopaikat.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/*
 * TEHTÄVÄNANNON RAJAT. Kohdekartan katto nousi 17 → 24 14.9.2026: luku
 * 17 oli tämän savukkeen oma vakio (erän 5 suunnitelman valmiusehto),
 * ei asettelun mitta, eikä se edes koske yhtä karttaa vaan MAAN
 * nostojen summaa kaikilta sen kohdekaupungeilta (Italian 17 = Rooma
 * 11 + Firenze 3 + Venetsia 3). Asettelun mitta on kartan pistemäärä,
 * ja sen mitattu yläraja on Pariisin 31 pistettä. Perustelu ja
 * puhelinkuvat: tools/savukkeet/savuke-merkkirajat.mjs ja
 * docs/raportit/viesti-fable-merkkirajat-20260914.md.
 */
const PAAKARTAN_KATTO = 21;
const KOHDEKARTAN_KATTO = 24;
/** Erän 10 kaupungit, maa ja pallon katselupiste. */
const KAIKKI_KAUPUNGIT = [
  { id: 'lontoo', iso: 'GBR', nakyma: { lat: 51.5074, lng: -0.1278, alt: 0.09 } },
  { id: 'rooma', iso: 'ITA', nakyma: { lat: 41.9028, lng: 12.4964, alt: 0.09 } },
  { id: 'berliini', iso: 'DEU', nakyma: { lat: 52.52, lng: 13.405, alt: 0.09 } },
  { id: 'madrid', iso: 'ESP', nakyma: { lat: 40.4168, lng: -3.7038, alt: 0.09 } },
  { id: 'wien', iso: 'AUT', nakyma: { lat: 48.2082, lng: 16.3738, alt: 0.09 } },
  { id: 'amsterdam', iso: 'NLD', nakyma: { lat: 52.3676, lng: 4.9041, alt: 0.09 } },
];
const valinta = process.argv[3] ? new Set(process.argv[3].split(',')) : null;
const KAUPUNGIT = valinta ? KAIKKI_KAUPUNGIT.filter((k) => valinta.has(k.id)) : KAIKKI_KAUPUNGIT;

/*
 * PÄÄKARTAN LÄHTÖTASO 13.9.2026 (node tools/laske-karttanostot.mjs,
 * origin/main v1851). Saksa, Espanja ja Italia olivat jo ennen tätä
 * erää yli tehtävänannon 21 merkin rajan; niille vartio 0a on "ei
 * kasva". Muille se on "≤ 21".
 */
const PAAKARTAN_LAHTOTASO = {
  GBR: 20, ITA: 22, DEU: 28, ESP: 25, AUT: 20, NLD: 20,
};

/**
 * Kortin mediakentät (js/ui.js lisaaNostonNapit). `musiikkiNimi` ja
 * `musiikkiNayteNimi` ovat selitteitä eivätkä yksin tuota nappia.
 */
const MEDIAKENTAT = ['aani', 'musiikki', 'musiikkiNayte', 'esikuuntelu'];
/**
 * Nostot, joista otetaan kuvakaappaus docs/raportit/kuvat/nostot-*.png:
 * kuusikuvainen galleria ja kortti, jolla on sekä galleria että musiikki.
 */
const KUVANOSTOT = new Set(['gaertnerin-berliini', 'goyan-kansankuvat',
  'taikahuilu-wiedenissa', 'marlene-dietrich']);

/** Erässä 10 siirretyt nostot: tunnus luetaan lähderiviltä. */
const ERAN_MERKKI = 'karttauudistuksen erässä 10';
const uudetKaupungissa = (id) => (FOKUSVIRRAT[id]?.takynostot ?? [])
  .filter((n) => typeof n.lahde === 'string' && n.lahde.includes(ERAN_MERKKI));

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ==================== VARTIOT 0–3 JA 6: NODE ==================== */

/** Maan merkkimäärät pelin omalla passilla. */
function maanLuvut(iso) {
  const { kaikki: rivit, kartalla } = paakartanNostot(MAAILMANKARTTA);
  const linkit = kohdekarttojenNostot();
  const maanRivit = rivit.filter((r) => r.iso === iso);
  return {
    paakartalla: maanRivit.filter((r) => kartalla.has(r.id)).length,
    kohdekartalla: maanRivit.filter((r) => !kartalla.has(r.id) && linkit.has(r.id)).length,
    kartalla,
    linkit,
  };
}

for (const { id, iso } of KAUPUNGIT) {
  const uudet = uudetKaupungissa(id);
  const nostot = FOKUSVIRRAT[id]?.takynostot ?? [];
  const luvut = maanLuvut(iso);
  const lahto = PAAKARTAN_LAHTOTASO[iso];
  tieto(`${id} (${iso}) pääkartalla / kohdekartalla`,
    `${luvut.paakartalla} / ${luvut.kohdekartalla} (lähtötaso pää ${lahto})`);
  if (lahto > PAAKARTAN_KATTO) {
    vaadi(`0a. ${iso}: pääkartan merkkimäärä ei kasva (lähtötaso ${lahto} > ${PAAKARTAN_KATTO})`,
      luvut.paakartalla <= lahto, `${luvut.paakartalla} > ${lahto}`);
  } else {
    vaadi(`0a. ${iso}: pääkartan merkkejä ≤ ${PAAKARTAN_KATTO}`,
      luvut.paakartalla <= PAAKARTAN_KATTO, `${luvut.paakartalla}`);
  }
  vaadi(`0b. ${iso}: kohdekartan merkkejä ≤ ${KOHDEKARTAN_KATTO}`,
    luvut.kohdekartalla <= KOHDEKARTAN_KATTO, `${luvut.kohdekartalla}`);

  const ilmanPistetta = uudet.filter((n) => !luvut.linkit.has(`nosto-${n.id}`));
  const paakartalla = uudet.filter((n) => luvut.kartalla.has(`nosto-${n.id}`));
  tieto(`${id}: uusia nostoja`, `${uudet.length} (${uudet.map((n) => n.id).join(', ') || '–'})`);
  vaadi(`1. ${id}: jokaisella uudella nostolla on kohdekarttapiste`,
    uudet.length > 0 && ilmanPistetta.length === 0,
    ilmanPistetta.map((n) => n.id).join(', ') || 'ei yhtään uutta nostoa');
  vaadi(`1b. ${id}: yksikään uusi nosto ei ole pääkartalla`,
    paakartalla.length === 0, paakartalla.map((n) => n.id).join(', '));

  const visallisia = nostot.filter((n) => n.visa).length;
  const kiintio = Math.floor(nostot.length / 3);
  tieto(`${id}: nostot / minikysymykset`, `${nostot.length} / ${visallisia} (kiintiö ${kiintio})`);
  vaadi(`2. ${id}: minikysymys joka kolmannessa nostossa`,
    visallisia >= kiintio, `${visallisia} < ${kiintio}`);

  /*
   * VARTIO 6. Minivisan vastaus on saman kortin tekstissä sanatarkasti.
   * Ilman tätä kysymyksen voisi kirjoittaa mistä tahansa — ja pelaaja
   * lukisi kortin, jossa vastausta ei ole.
   */
  for (const nosto of uudet.filter((n) => n.visa)) {
    const teksti = nosto.lunastus.join('\n\n');
    const oikea = nosto.visa.vaihtoehdot[nosto.visa.oikea];
    vaadi(`6. ${nosto.id}: minivisan faktarivi on kortin tekstissä sanatarkasti`,
      teksti.includes(nosto.visa.fakta), nosto.visa.fakta.slice(0, 50));
    vaadi(`6b. ${nosto.id}: oikea vaihtoehto ei ole tyhjä eikä kaksoiskappale`,
      Boolean(oikea) && new Set(nosto.visa.vaihtoehdot).size === nosto.visa.vaihtoehdot.length);
  }

  /* VASTAKOE: poistetaan ensimmäisen uuden noston kohdekarttapiste. */
  const koeNosto = uudet[0];
  if (koeNosto) {
    const kohteet = KAUPUNKIKARTAT[id].kohteet;
    const irti = kohteet.findIndex((k) => k.nosto === `nosto-${koeNosto.id}`);
    const poistettu = kohteet.splice(irti, 1)[0];
    const koe = maanLuvut(iso);
    kohteet.splice(irti, 0, poistettu);
    tieto(`${id}: vastakoe ilman pistettä pää / kohde`,
      `${koe.paakartalla} / ${koe.kohdekartalla}`);
    vaadi(`3. ${id}: VASTAKOE — kohdekarttapisteen poisto vie nostolta karttapaikan`,
      !koe.linkit.has(`nosto-${koeNosto.id}`) && koe.kohdekartalla === luvut.kohdekartalla - 1,
      `kohdekartalla ${koe.kohdekartalla}, odotettu ${luvut.kohdekartalla - 1}`);
    vaadi(`3b. ${id}: piste palautui ajon jälkeen`,
      maanLuvut(iso).kohdekartalla === luvut.kohdekartalla);
  }
}

/* ==================== VARTIOT 4–5: SELAIN ==================== */

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
}

const tallenne = (aloitus) => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: aloitus }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(aloitus);
  return JSON.stringify(peli.toJSON());
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

for (const { id, nakyma } of KAUPUNGIT) {
  const uudet = uudetKaupungissa(id);
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(id));
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(`${id}: ${String(e.message ?? e)}`));
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
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${id}: pallolauta aukesi`, auki);
  if (auki) await sivu.waitForTimeout(3500);

  const osumat = await sivu.evaluate(async (n) => {
    const l = window.matkakirja.ui.pallolauta;
    l.pallo.pointOfView({ lat: n.lat, lng: n.lng, altitude: n.alt }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 500));
    return l.nostot.osumat().map((o) => o.id);
  }, nakyma);
  tieto(`${id}: pallon osumat kaupungin päällä`, osumat.join(', ') || '(ei yhtään)');
  vaadi(`1c. ${id}: yksikään uusi nosto ei ole pallon osumissa`,
    uudet.every((n) => !osumat.includes(`nosto-${n.id}`)), osumat.join(', '));

  /**
   * Kortti auki tunnuksesta.
   *
   * `riisu: true` poistaa nostolta `galleria`- ja mediakentät VAIN
   * tämän avauksen ajaksi ja palauttaa ne heti perään — se on vartioiden
   * 7–8 vastakoe (ks. vartio 9).
   */
  const avaaKortti = (nostoId, riisu = false) => sivu.evaluate(async ([tunnus, riisuKentat]) => {
    const MEDIA = ['aani', 'musiikki', 'musiikkiNimi', 'musiikkiNayte',
      'musiikkiNayteNimi', 'esikuuntelu'];
    for (const el of document.querySelectorAll('.fokusnosto-kerros')) el.remove();
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
    let talteen = null;
    let kohde = null;
    if (riisuKentat) {
      for (const virta of Object.values(FOKUSVIRRAT)) {
        kohde = (virta?.takynostot ?? []).find((n) => n.id === tunnus) ?? kohde;
        if (kohde) break;
      }
      if (kohde) {
        talteen = {};
        for (const kentta of ['galleria', ...MEDIA]) {
          if (kohde[kentta] === undefined) continue;
          talteen[kentta] = kohde[kentta];
          delete kohde[kentta];
        }
      }
    }
    const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, tunnus);
    await new Promise((v) => setTimeout(v, 400));
    const lisaa = document.querySelector('.fokusnosto-kortti .nostokuva-lisaa');
    if (lisaa) { lisaa.click(); await new Promise((v) => setTimeout(v, 500)); }
    const kortti = document.querySelector('.fokusnosto-kortti');
    const kappaleet = [...(kortti?.querySelectorAll('.fokusnosto-teksti p') ?? [])]
      .map((p) => p.textContent.trim());
    const laskuri = kortti?.querySelector('.nostosarja-kuvalaskuri');
    const selite = () => (kortti?.querySelector('.nostokuva-teksti')
      ?? kortti?.querySelector('.fokusnosto-kuvaselite'))?.textContent?.trim() ?? '';
    const ennen = { laskuri: laskuri?.textContent?.trim() ?? '', selite: selite() };
    // Selailu: seuraava-nuoli vaihtaa kuvan, laskurin ja selitteen.
    const seuraava = kortti?.querySelector('.nostosarja-kuvanuoli.seuraava');
    if (seuraava) { seuraava.click(); await new Promise((v) => setTimeout(v, 300)); }
    const jalkeen = { laskuri: laskuri?.textContent?.trim() ?? '', selite: selite() };
    const media = kortti?.querySelector('.fokusnosto-media');
    const tulos = {
      loytyi,
      otsikko: kortti?.querySelector('.fokusnosto-kortti-otsikko')?.textContent?.trim() ?? '',
      kappaleet,
      visa: Boolean(kortti?.querySelector('.fokusnosto-visa')),
      nuolia: kortti?.querySelectorAll('.nostosarja-kuvanuoli').length ?? 0,
      ennen,
      jalkeen,
      media: Boolean(media),
      mediaNappeja: media?.querySelectorAll('.kulttuuri-kuuntele').length ?? 0,
      mediaLinkkeja: media?.querySelectorAll('.kulttuuri-musiikkilinkki').length ?? 0,
    };
    if (talteen && kohde) Object.assign(kohde, talteen);
    return tulos;
  }, [nostoId, riisu]);

  for (const nosto of uudet) {
    const kortti = await avaaKortti(nosto.id);
    /*
     * KORTTI JAKAA PITKÄN KAPPALEEN LUETTAVIIN PALOIHIN
     * (js/fokusnosto.js), joten kappalemäärä ei ole sama kuin datassa.
     * Vertailu tehdään koko leipätekstistä, välit yhdenmukaistettuina —
     * merkki merkiltä, ei sisältövertailuna.
     */
    const siisti = (t) => t.replace(/\s+/gu, ' ').trim();
    const odotettu = siisti(nosto.lunastus.join(' '));
    const saatu = siisti(kortti.kappaleet.join(' '));
    const tasmaa = saatu === odotettu;
    tieto(`${nosto.id}`, `kappaleita ${kortti.kappaleet.length}, merkkejä ${saatu.length}/${odotettu.length}, visa ${kortti.visa ? 'on' : 'ei'}`);
    vaadi(`4. ${nosto.id}: kortti aukeaa`, kortti.loytyi && kortti.kappaleet.length > 0,
      JSON.stringify({ loytyi: kortti.loytyi, kappaleita: kortti.kappaleet.length }));
    vaadi(`4b. ${nosto.id}: kortin teksti täsmää lähteeseen sanatarkasti`, tasmaa,
      tasmaa ? '' : `ero kohdassa ${[...saatu].findIndex((c, i) => c !== odotettu[i])}`);
  }

  /* ========== VARTIOT 7–9: GALLERIA JA MUSIIKKI KORTILLA ========== */

  const kaupunginNostot = FOKUSVIRRAT[id]?.takynostot ?? [];
  const galleriset = kaupunginNostot.filter((n) => n.galleria?.length);
  const mediaiset = kaupunginNostot.filter((n) => MEDIAKENTAT.some((k) => n[k]));
  tieto(`${id}: gallerianostoja / mediaanostoja`,
    `${galleriset.length} / ${mediaiset.length}`);
  /*
   * KENTTIEN ON OLTAVA DATASSA. Ilman tätä vartiot 7–9 katoaisivat
   * hiljaa, jos `galleria`- ja mediakentät poistuisivat paketeista:
   * tyhjä silmukka ei väitä mitään.
   */
  vaadi(`7c. ${id}: kaupungissa on galleria- tai mediakenttäisiä nostoja`,
    galleriset.length + mediaiset.length > 0,
    `galleriset ${galleriset.length}, mediaiset ${mediaiset.length}`);

  for (const nosto of galleriset) {
    const kortti = await avaaKortti(nosto.id);
    const odotettuKuvia = 1 + nosto.galleria.length;
    tieto(`${nosto.id}: galleria`,
      `nuolia ${kortti.nuolia}, laskuri ${kortti.ennen.laskuri} → ${kortti.jalkeen.laskuri}`);
    vaadi(`7. ${nosto.id}: gallerian selailunuolet ja laskuri ovat kortilla`,
      kortti.nuolia === 2 && kortti.ennen.laskuri === `1 / ${odotettuKuvia}`,
      `nuolia ${kortti.nuolia}, laskuri "${kortti.ennen.laskuri}"`);
    vaadi(`7b. ${nosto.id}: nuoli vaihtaa kuvaa ja selitettä`,
      kortti.jalkeen.laskuri === `2 / ${odotettuKuvia}`
        && kortti.jalkeen.selite !== kortti.ennen.selite,
      JSON.stringify({ ennen: kortti.ennen, jalkeen: kortti.jalkeen }));
    if (KUVAKANSIO && KUVANOSTOT.has(nosto.id)) {
      await sivu.locator('.fokusnosto-kortti').screenshot({
        path: join(KUVAKANSIO, `nostot-galleria-${nosto.id}.png`), scale: 'css',
      });
    }
  }

  for (const nosto of mediaiset) {
    const kortti = await avaaKortti(nosto.id);
    const linkkeja = nosto.musiikki ? 1 : 0;
    tieto(`${nosto.id}: mediarivi`,
      `nappeja ${kortti.mediaNappeja}, linkkejä ${kortti.mediaLinkkeja}`);
    vaadi(`8. ${nosto.id}: musiikki- ja äänikentät ovat kortin mediarivillä`,
      kortti.media && kortti.mediaNappeja + kortti.mediaLinkkeja > 0
        && kortti.mediaLinkkeja === linkkeja,
      JSON.stringify({
        rivi: kortti.media, nappeja: kortti.mediaNappeja, linkkeja: kortti.mediaLinkkeja,
      }));
    if (KUVAKANSIO && KUVANOSTOT.has(nosto.id)) {
      await sivu.locator('.fokusnosto-kortti').screenshot({
        path: join(KUVAKANSIO, `nostot-media-${nosto.id}.png`), scale: 'css',
      });
    }
  }

  /*
   * VASTAKOE. Sama kortti ilman `galleria`- ja mediakenttiä: nuolten,
   * laskurin ja mediarivin on KADOTTAVA. Jos ne jäisivät, vartiot 7–8
   * eivät mittaisi kenttiä vaan jotain muuta.
   */
  const koekohde = galleriset.find((n) => MEDIAKENTAT.some((k) => n[k]))
    ?? galleriset[0] ?? mediaiset[0];
  if (koekohde) {
    const riisuttu = await avaaKortti(koekohde.id, true);
    const takaisin = await avaaKortti(koekohde.id);
    tieto(`${id}: vastakoe ${koekohde.id}`,
      `riisuttuna nuolia ${riisuttu.nuolia}, mediarivi ${riisuttu.media}`);
    vaadi(`9. ${id}: VASTAKOE — kenttien poisto vie nuolet ja mediarivin`,
      riisuttu.loytyi && riisuttu.nuolia === 0 && riisuttu.media === false
        && riisuttu.kappaleet.length > 0,
      JSON.stringify({ nuolia: riisuttu.nuolia, media: riisuttu.media }));
    vaadi(`9b. ${id}: kentät palautuivat vastakokeen jälkeen`,
      takaisin.nuolia === (koekohde.galleria?.length ? 2 : 0)
        && takaisin.media === MEDIAKENTAT.some((k) => koekohde[k]),
      JSON.stringify({ nuolia: takaisin.nuolia, media: takaisin.media }));
  }

  const lehti = await sivu.evaluate(async () => {
    for (const el of document.querySelectorAll('.fokusnosto-kerros')) el.remove();
    const { ui, game } = window.matkakirja;
    ui.avaaTutkinta(game.cityOf());
    await new Promise((v) => setTimeout(v, 2600));
    return {
      auki: Boolean(document.querySelector('.kartta-kehys')),
      pisteita: document.querySelectorAll('.kartta-kehys .maakartta-piste').length,
      selitteita: document.querySelectorAll('.kartta-selite').length,
    };
  });
  tieto(`${id}: kaupunkilehden kohdekartta`, `pisteitä ${lehti.pisteita}, selitteitä ${lehti.selitteita}`);
  vaadi(`5. ${id}: kaupunkilehti avautuu ja kohdekartta piirtää pisteensä`,
    lehti.auki && lehti.pisteita > 0, JSON.stringify(lehti));
  if (KUVAKANSIO && lehti.auki) {
    await sivu.locator('.kartta-kehys').first().screenshot({
      path: join(KUVAKANSIO, `karttauudistus-10-${id}.png`), scale: 'css',
    });
  }
  await ctx.close();
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
