/*
 * SELAINSAVUKE: FOKUSMOODIN KEVYT KULKU (kokeilu, omistaja 24.8.2026).
 *
 *   node tools/savuke-fokusvirta.mjs
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU. Kokeilun
 * kulku on: kaupunkilehti aukeaa suoraan → lehden nimetyt minitehtävät
 * → vihreä piste kartalle → kohtaaminen → aarre. Yksikkötestit näkevät
 * tilakoneen ja datan, mutta EIVÄT sitä, avautuuko lehti, syttyykö piste
 * ja aukeaako kohtaaminen oikeasta DOMista. Juuri ne mitataan tässä.
 *
 * VÄITTEET (kokeilutila):
 *   1. Ateenaan saavuttaessa pöllön KUPLA EI AUKEA eikä korttia tule:
 *      korttiannostelu on lipun takana (FOKUSVIRTA_KORTIT = false).
 *   2. Isoisän merkintä on silti ylävasemmassa matkakirjakortissa —
 *      se on kirjaa eikä korttiannostelua, ja se jäi kokeiluun.
 *   3. Tutki (kaupungin laatta) avaa KAUPUNKILEHDEN SUORAAN, vaikka
 *      laatta on kääntämättä: lehtilukko on auki.
 *   4. Pöllö vinkkaa lehden avautuessa lyhyesti, ja vinkissä on ruksi
 *      "Älä näytä jatkossa" — ruksi jää laitteen muistiin.
 *   5. Sivulla 2 on nimilaatta AARTEEN AVAUS ja sivulla 3 JULISTE.
 *   6. AARTEEN AVAUS -tehtävän OIKEA vastaus sytyttää kartalle vihreän
 *      pisteen; ennen sitä pistettä ei ole.
 *   7. Pisteen napautus avaa kohtaamisen (Vartija Nikos) ja sen nappi
 *      vie samaan laattakysymykseen kuin ennenkin.
 *   8. JULISTE-tehtävän oikea vastaus myöntää Ateenan julisteen ja
 *      tarjoaa Lunasta juliste -napin.
 *   9. Laatan ratkettua matkakirjakortti EI palaa vanhaan
 *      saapumistekstiin — ei heti (aarteen jälkisana) eikä kaupunkiin
 *      palatessa (fokusvirran oma saapumismerkintä). Omistajan bugi
 *      27.8.2026; ks. väitteiden kohdat alempana.
 *  10. ATEENASSA EI maadoituskuplaa: aloituskaupungin kaksi ohjekuplaa
 *      saavat tilan (omistajan päätös 27.8.2026).
 *  11. SOFIASSA isoisän maadoitus tulee Livian saapumiskuplaan heti
 *      matkakirjaluennan päätyttyä, nimilappuineen — ja kuplassa on
 *      säikähdyksen JÄLKEEN aikasiirtymän konteksti (pariperiaate,
 *      Raamattu v1262). Väite EI ole FOKUSVIRTA_KORTIT-kytkimen
 *      takana — se on kevyen kulun oma.
 *  12. VENETSIASSA sama kupla kertoo kaupungin oman saapumisrepliikin:
 *      fokusvirrattomassa kaupungissa puheenvuoro tulee tavallisen
 *      saapumismerkinnän perästä (omistajan laajennus 28.8.2026).
 *
 * LIPPUTESTI (vanha virta palaa): palvelin kääntää lennossa molemmat
 * liput päinvastoin (FOKUSVIRTA_KORTIT = true, FOKUS_LEHTITEHTAVAT =
 * false), sivu ladataan uudestaan ja mitataan, että Tutki avaa taas
 * PÖLLÖN KUPLAN eikä lehteä. Näin kokeilun voi perua yhdellä rivillä,
 * ja savuke todistaa sen — muuten "helppo palauttaa" olisi lupaus,
 * jota kukaan ei ole kokeillut.
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

/*
 * KORTTIANNOSTELUN OHITUSVAHTI — TARKKA PEILIKUVA raskaan virran
 * savukkeelle (tools/savukkeet/savuke-fokusvirta.mjs). Tämä savuke
 * mittaa juuri niitä pintoja, jotka kortit sammuttavat: lehti aukeaa
 * suoraan, lehdessä on nimetyt tehtävät, kartalle syttyy vihreä piste.
 * Kortit päälle -päätöksen (omistaja 29.8.2026, "Päälle — koko kulku
 * testiin") jälkeen yksikään niistä ei ole olemassa, joten savuke
 * nukkuu.
 *
 * Kumpikin savuke nukkuu siis silloin, kun sen mittaama virta on pois,
 * ja herää itsestään lipun kääntyessä — kumpaakaan ei tarvitse muistaa
 * poistaa eikä palauttaa käsin. Vahti lukee EXPORT-RIVIN eikä pelkkää
 * mainintaa: moduulin historiakommentit puhuvat lipusta molemmilla
 * arvoilla, ja pelkkä maininta nukutti raskaan savukkeen väärin
 * (havaittu 29.8.2026).
 */
{
  const lahde = readFileSync(join(JUURI, 'js/fokusvirta.js'), 'utf8');
  const maaritys = lahde.match(/^export const FOKUSVIRTA_KORTIT = (\w+);$/m);
  if (!maaritys) throw new Error('FOKUSVIRTA_KORTIT-lipun määritystä ei löydy');
  if (maaritys[1] === 'true') {
    console.log('OHITETTU: korttiannostelu päällä (FOKUSVIRTA_KORTIT=true) — '
      + 'kevyen kulun pintoja ei ole. Kattavuus: tools/savukkeet/savuke-fokusvirta.mjs.');
    process.exit(0);
  }
}

const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

/*
 * LIPUT KÄÄNNETÄÄN PALVELIMELLA, EI TIEDOSTOSSA. Savuke ei saa muokata
 * repoa, ja liput ovat tavallisia moduulivakioita — ainoa tapa nähdä
 * molemmat tilat samassa ajossa on tarjoilla lähdetiedosto kahdesti eri
 * arvolla. Korvaus on täsmällinen: jos rivi ei enää täsmää, ajo kaatuu
 * eikä vaikene (ks. korvaaLippu).
 */
let vanhaVirta = false;

function korvaaLippu(lahde, etsi, tilalle) {
  if (!lahde.includes(etsi)) {
    throw new Error(`Lippuriviä ei löydy lähteestä: ${etsi}`);
  }
  return lahde.replace(etsi, tilalle);
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  let sisalto = readFileSync(polku);
  if (vanhaVirta && suhteellinen === 'js/fokusvirta.js') {
    sisalto = korvaaLippu(String(sisalto),
      'export const FOKUSVIRTA_KORTIT = false;',
      'export const FOKUSVIRTA_KORTIT = true;');
  }
  if (vanhaVirta && suhteellinen === 'js/fokustehtavat.js') {
    sisalto = korvaaLippu(String(sisalto),
      'export const FOKUS_LEHTITEHTAVAT = true;',
      'export const FOKUS_LEHTITEHTAVAT = false;');
  }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
await new Promise((r) => palvelin.listen(8739, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Peli käyntiin ja nappula Ateenaan, laatta kääntämättä. */
async function ateenaan() {
  await sivu.goto('http://127.0.0.1:8739/index.html', { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  const tila = await sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    // Laatta kääntämättä = kohtaaminen on yhä edessä.
    if (!game.tokens.has('ateena')) game.world.tokens.set('ateena', 'coin');
    const kaupunki = game.cityOf();
    // Saapumisen merkki, jolla fokusvirta avaisi korttinsa vanhassa
    // virrassa: kokeilussa sen EI pidä avata mitään.
    ui.lehtitila.tutkiSyke = ui.kaupunkiAvain(kaupunki);
    ui.render();
    return { kaupunki: kaupunki?.id, laatta: game.tokens.has('ateena'), lauta: game.pack.id };
  });
  await sivu.waitForTimeout(1500);
  return tila;
}

/* ==================== 1. KOKEILUTILA ==================== */

const alku = await ateenaan();
vaadi('nappula on Ateenassa ja laatta kääntämättä',
  alku.kaupunki === 'ateena' && alku.laatta === true, JSON.stringify(alku));

const saapuminen = await sivu.evaluate(() => ({
  kupla: document.querySelectorAll('.fokusvirta-kupla').length,
  kortti: document.querySelectorAll('.fokusvirta-kortti').length,
  merkinta: document.querySelector('.fact-card')?.hidden === false
    ? (document.getElementById('fact-text')?.textContent ?? '').slice(0, 40)
    : '(kortti piilossa)',
}));
vaadi('saapuminen ei avaa kuplaa eikä korttia',
  saapuminen.kupla === 0 && saapuminen.kortti === 0, JSON.stringify(saapuminen));
vaadi('isoisän merkintä on matkakirjakortissa',
  /torilla/i.test(saapuminen.merkinta), saapuminen.merkinta);

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-saapuminen.png') });

/* ---------- isoisän maadoitus kevyen kulun saapumiskuplassa ---------- */

/*
 * VÄITE 10–11 (omistajan päätös 27.8.2026). Maadoituskommentit
 * (packs/fokusvirta-*.js, pollo.maadoitus) kirjoitettiin v1225:ssä
 * mutta piirtyivät vain fokusvirran kuplissa — kevyellä kululla niitä
 * ei nähnyt kukaan. Nyt ne tulevat kevyen kulun omaan
 * saapumiskuplaan (js/fokusvirta.js fokusvirtaSaapumiskupla).
 *
 * TÄMÄ VÄITE EI OLE KYTKIMEN TAKANA: se mitataan nimenomaan
 * kokeilutilassa (FOKUSVIRTA_KORTIT = false), jossa muu
 * korttiannostelu vaikenee.
 *
 * ATEENA VAIKENEE: aloituskaupungin kaksi ohjekuplaa opettavat pelin,
 * eikä kolmas mahdu väliin. Ateenan maadoitusteksti jää odottamaan
 * fokusvirran kytkintä.
 */
const ateenanKupla = await sivu.evaluate(() => {
  const k = document.querySelector('.pollo-vihje');
  return {
    maadoitus: Boolean(k && !k.hidden && k.classList.contains('pollo-vihje-maadoitus')),
    muisti: [...(window.matkakirja.ui.saapumiskuplaNaytetty ?? [])],
  };
});
vaadi('Ateenassa ei maadoituskuplaa (aloituskaupungin ohjekuplat saavat tilan)',
  ateenanKupla.maadoitus === false && ateenanKupla.muisti.length === 0,
  JSON.stringify(ateenanKupla));

/*
 * Sofia on lähin kaupunki, jossa maadoitus kuuluu näkyä. Luenta
 * pysäytetään heti soiton alettua: kupla odottaa luennan loppua
 * (js/luenta.js luennanLoppuun), ja koko äänitteen kuunteleminen
 * venyttäisi savukkeen parillakymmenellä sekunnilla ilman että se
 * mittaisi mitään uutta.
 */
const sofianKupla = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'sofia' };
  game.world.visited.add('sofia');
  if (!game.tokens.has('sofia')) game.world.tokens.set('sofia', 'coin');
  ui.render();
  /*
   * Luenta kiinni heti kun se on OIKEASTI alkanut. Pysäytys ennen
   * ensimmäistä sekuntia ei kelpaa: luennan loppuvahti tunnistaa
   * lauserajahäivytyksen ehdosta "pysähtynyt JA jo soinut"
   * (js/luenta.js luennanLoppuun), ja nollasta pysäytetty äänite vain
   * jatkaisi hetken päästä alusta.
   */
  for (let i = 0; i < 60; i += 1) {
    if (ui.diaryVoice && ui.diaryVoice.currentTime > 0.2) break;
    await new Promise((r) => setTimeout(r, 250));
  }
  ui.diaryVoice?.pause();
  for (let i = 0; i < 40; i += 1) {
    const k = document.querySelector('.pollo-vihje');
    if (k && !k.hidden && k.classList.contains('pollo-vihje-maadoitus')) {
      return {
        nimilappu: k.querySelector('.pollo-vihje-nimilappu')?.textContent ?? '',
        yliviivaus: Boolean(k.querySelector('.pollo-vihje-nimilappu .pollo-yliviivattu')),
        teksti: [...k.querySelectorAll('.pollo-vihje-lause')]
          .map((p) => p.textContent).join(' '),
      };
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return { teksti: '', nimilappu: '', yliviivaus: false };
});
/*
 * VÄITE MITTAA PARIPERIAATTEEN (Raamattu v1262): Sofian merkintä on
 * laudan synkin, joten kuplassa pitää näkyä KAKSI asiaa peräkkäin —
 * säikähdysavaus ja sen jälkeen aikasiirtymän välitys eli konkreettinen
 * historiakonteksti. Toinen ehto tarkistaa siksi, että kuplassa on
 * vuosiluku 1873 ja etäisyys nykyhetkeen ("sataviisikymmentä vuotta").
 * Jos joku kirjoittaa kontekstin pois ja jättää pelkän säikähdyksen,
 * savuke kaatuu tähän.
 *
 * MUOTO ON PUHEKIELINEN, PAINO REUNOILLA (Raamattu v1270 "LIVIAN
 * PUHEKIELI", sääntö 1): tämä kupla on omistajan hyväksymä
 * malliesimerkki koko säännöstä, joten väite mittaa MOLEMMAT reunat
 * ja keskikohdan kerralla. Alku on Livian omaa ääntä ("Kääk", "hurja
 * juttu"), KESKELLÄ luku on auki kirjoitettuna ("sataviisikymmentä
 * vuotta") ja LOPUSSA lyhentymä palaa ("Mut kyllä sen kestää lukea").
 * Kirjakielelle palauttaminen kaataa lopun ehdon, ja lyhentymien
 * valuttaminen takaisin keskelle (sataviiskyt) kaataa keskiehdon.
 */
vaadi('Sofiassa isoisän maadoitus tulee Livian saapumiskuplaan',
  /^Kääk\./.test(sofianKupla.teksti)
    && /hurja juttu/.test(sofianKupla.teksti)
    && /1873/.test(sofianKupla.teksti)
    && /sataviisikymmentä vuotta/.test(sofianKupla.teksti)
    && /Mut kyllä sen kestää lukea/.test(sofianKupla.teksti)
    && sofianKupla.yliviivaus === true && /Pulu/.test(sofianKupla.nimilappu),
  JSON.stringify(sofianKupla).slice(0, 200));

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-maadoituskupla.png') });

/*
 * VÄITE 12 (omistajan laajennus 28.8.2026): sama saapumiskupla toimii
 * myös kaupungissa, jolla EI ole fokusvirtaa — silloin siinä on
 * Livian oma saapumisrepliikki (js/fokusvirta.js LIVIAN_SAAPUMISET).
 * Venetsia on lähin sellainen, ja sen repliikki alkaa kaupungin
 * nimellä. Kytkentäkohta on eri kuin Sofialla (js/ui.js renderFactin
 * tavallinen saapumismerkintä), joten se on mitattava erikseen.
 *
 * ── SOFIAN KUPLA PYYHITÄÄN ENSIN (korjaus 29.8.2026) ────────────────
 *
 * YKSI KUPLA PER SAAPUMINEN (omistajan päätös 27.8.2026) tarkoittaa
 * myös yhtä ELEMENTTIÄ: maadoitus ja saapumisrepliikki ovat sama
 * puheenvuoro eri sisällöllä, ja pollo.js varmistaKupla palauttaa
 * niille saman .pollo-vihje-solmun. Kuplalla ei ole omaa
 * aikakatkaisua — se jää ruudulle, kunnes pelaaja napauttaa sen pois
 * tai seuraava puheenvuoro korvaa sen sisällön. Sofian kupla oli siis
 * yhä näkyvissä, kun tämä väite alkoi lukea samaa solmua, ja
 * hakusilmukka osui siihen ensimmäisellä kierroksella — ENNEN kuin
 * Venetsian oma kupla ehti korvata sen (kupla odottaa luennan loppua
 * ja SAAPUMISKUPLAN_TAUKO_MS:n, js/fokusvirta.js).
 *
 * MIKSI VÄITE OLI SILTI VIHREÄ v1250:stä v1298:aan: Venetsialla ei
 * ollut matkakirjaluentaa, joten ui.diaryVoice jäi nulliksi ja alla
 * oleva ääniodotus paloi täydet 40 × 250 ms. Sofian kupla ehti niiden
 * kymmenen sekunnin sisällä väistyä Venetsian kuplan tieltä, ja väite
 * mittasi oikean tekstin vahingossa. v1299 (#1722, "Uudet luennat:
 * avaus, lento, Venetsia ja Edinburgh") toi Venetsialle äänitteen —
 * ääniodotus katkeaa nyt ~1,5 sekunnissa, eikä vanha kupla ehdi
 * väistyä. Peli ei siis rikkoutunut: Venetsian repliikki tulee
 * ruudulle täsmälleen kuten ennenkin, mutta savuke luki väärää
 * puheenvuoroa.
 *
 * Vanha kupla pannaan siksi piiloon ennen mittausta (piilotaVihje on
 * sama kutsu kuin pelaajan napautus tekee). Silloin väite mittaa sen,
 * mitä se lupaa: että Venetsiaan saavuttaessa kupla NOUSEE UUDESTAAN
 * ja siinä on kaupungin oma repliikki.
 */
const venetsianKupla = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  // Sofian puheenvuoro pois samasta solmusta (ks. yllä).
  window.matkakirjaPollo?.piilotaVihje();
  game.player.pos = { type: 'city', city: 'venetsia' };
  game.world.visited.add('venetsia');
  game.arrivalFact = { packId: game.pack.id, cityId: 'venetsia' };
  ui.render();
  // Sama luennan pysäytys kuin Sofiassa: kupla odottaa luennan loppua.
  for (let i = 0; i < 40; i += 1) {
    if (ui.diaryVoice && ui.diaryVoice.currentTime > 0.2) break;
    await new Promise((r) => setTimeout(r, 250));
  }
  ui.diaryVoice?.pause();
  for (let i = 0; i < 40; i += 1) {
    const k = document.querySelector('.pollo-vihje');
    if (k && !k.hidden && k.classList.contains('pollo-vihje-maadoitus')) {
      return {
        teksti: [...k.querySelectorAll('.pollo-vihje-lause')]
          .map((p) => p.textContent).join(' '),
        nimilappu: k.querySelector('.pollo-vihje-nimilappu')?.textContent ?? '',
      };
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return { teksti: '', nimilappu: '' };
});
vaadi('Venetsiassa Livia kertoo kaupungin oman saapumisrepliikin',
  /^Venetsia\./.test(venetsianKupla.teksti)
    && /Pulu/.test(venetsianKupla.nimilappu),
  JSON.stringify(venetsianKupla).slice(0, 200));

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-saapumisrepliikki.png') });

// Puhtaalta pöydältä takaisin Ateenaan: loput väitteet mittaavat
// aloituskaupunkia, eikä Sofian käynti saa jäädä niiden alle.
await ateenaan();

// Tutki avaa lehden suoraan (lehtilukko auki).
const lehti = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  ui.avaaTutkinta(game.cityOf());
  await new Promise((r) => setTimeout(r, 700));
  const dialogi = document.getElementById('arrival-dialog');
  return {
    auki: Boolean(dialogi?.open),
    lehti: Boolean(dialogi?.classList.contains('lehti')),
    kupla: document.querySelectorAll('.fokusvirta-kupla').length,
    otsikko: document.getElementById('arrival-city')?.textContent ?? '',
  };
});
vaadi('kaupunkilehti aukeaa suoraan fokusmoodissa',
  lehti.auki && lehti.lehti && /ateena/i.test(lehti.otsikko), JSON.stringify(lehti));

// Lehden ALIN KOHTA — "Tapaa Nikos" — on poissa: kohtaaminen tavataan
// kartalta (Raamattu, KEVYT KULKU -KOKEILU).
const alanappi = await sivu.evaluate(() => {
  const nappi = document.getElementById('arrival-yes');
  return { piilossa: Boolean(nappi?.hidden), teksti: nappi?.textContent ?? '' };
});
vaadi('lehden alin "tapaa henkilö" -kohta on poissa',
  alanappi.piilossa, JSON.stringify(alanappi));

// Pöllön vinkki lehden päällä + ruksi. Kupla tulee tarkoituksella
// vasta ~1,4 s hengähdyksen jälkeen (omistaja 26.8.2026).
await sivu.waitForTimeout(2200);
const vinkki = await sivu.evaluate(() => {
  const kupla = document.querySelector('.fokusvirta-vinkki');
  return {
    teksti: kupla?.querySelector('.fokusvirta-vinkkiteksti')?.textContent ?? '',
    ruksi: Boolean(kupla?.querySelector('.fokusvirta-vinkkiruksi input')),
  };
});
vaadi('pöllö vinkkaa lyhyesti lehden avautuessa',
  vinkki.teksti.length > 0 && vinkki.teksti.length <= 90 && /minitehtäv/i.test(vinkki.teksti),
  `${vinkki.teksti.length} mrk: ${vinkki.teksti}`);
vaadi('vinkissä on "Älä näytä jatkossa" -ruksi', vinkki.ruksi);

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-lehtivinkki.png') });

const ruksittu = await sivu.evaluate(() => {
  document.querySelector('.fokusvirta-vinkkiruksi input')?.click();
  return {
    muistissa: localStorage.getItem('matkakirja-lehtivinkki-pois'),
    kuplia: document.querySelectorAll('.fokusvirta-vinkki').length,
  };
});
vaadi('ruksi kirjoittaa laitteen muistiin ja sulkee vinkin',
  ruksittu.muistissa === '1' && ruksittu.kuplia === 0, JSON.stringify(ruksittu));

/* ---------- nimetyt minitehtävät sivuilla 2 ja 3 ---------- */

/** Sivun nimilaatta ja tehtävän kysymys. */
async function sivunTehtava(numero) {
  return sivu.evaluate(async (n) => {
    window.matkakirja.ui.naytaTutkiSivu(n, { heti: true });
    await new Promise((r) => setTimeout(r, 500));
    const laatikko = document.querySelector('#arrival-dialog .minitehtava');
    return {
      sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
      otsake: laatikko?.querySelector('.minitehtava-otsikko')?.textContent ?? '',
      kysymys: laatikko?.querySelector('.minitehtava-kysymys')?.textContent ?? '',
      vaihtoehtoja: laatikko?.querySelectorAll('.kulttuuri-vaihtoehdot button').length ?? 0,
      laatikoita: document.querySelectorAll('#arrival-dialog .minitehtava').length,
    };
  }, numero);
}

const sivu2 = await sivunTehtava(2);
vaadi('sivulla 2 on AARTEEN AVAUS -nimilaatta',
  sivu2.otsake === 'AARTEEN AVAUS' && sivu2.vaihtoehtoja >= 2, JSON.stringify(sivu2));
vaadi('sivulla 2 on täsmälleen yksi minitehtävä', sivu2.laatikoita === 1, String(sivu2.laatikoita));

const sivu3 = await sivunTehtava(3);
vaadi('sivulla 3 on JULISTE-nimilaatta',
  sivu3.otsake === 'JULISTE' && sivu3.vaihtoehtoja >= 2, JSON.stringify(sivu3));
vaadi('sivulla 3 on täsmälleen yksi minitehtävä', sivu3.laatikoita === 1, String(sivu3.laatikoita));

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-juliste-tehtava.png') });

// JULISTE: oikea vastaus myöntää julisteen ja tarjoaa lunastusnapin.
const juliste = await sivu.evaluate(async () => {
  const napit = [...document.querySelectorAll('#arrival-dialog .kulttuuri-vaihtoehdot button')];
  const oikea = napit.find((b) => /ei voisi koskaan lentää pois/i.test(b.textContent));
  if (!oikea) return { virhe: napit.map((b) => b.textContent) };
  oikea.click();
  await new Promise((r) => setTimeout(r, 400));
  return {
    tulos: document.querySelector('#arrival-dialog .kulttuuri-tulos')?.textContent ?? '',
    lunasta: Boolean([...document.querySelectorAll('#arrival-dialog button')]
      .find((b) => /lunasta juliste/i.test(b.textContent))),
    // v1120: tehtävä kantaa oman juliste-avaimen (tehtava.juliste =
    // 'ateena-nike'), joka voittaa kaupungin oletusavaimen.
    kokoelmassa: window.matkakirja.game.julisteet?.has('ateena-nike') ?? false,
  };
});
vaadi('JULISTE-tehtävästä saa julisteen ja Lunasta-napin',
  juliste.kokoelmassa === true && juliste.lunasta === true && /oikein/i.test(juliste.tulos),
  JSON.stringify(juliste));

// Ennen aarteen avausta pistettä EI ole.
const ennenPistetta = await sivu.evaluate(() => document.querySelectorAll('.fokuspiste').length);
vaadi('vihreää pistettä ei ole ennen aarteen avausta', ennenPistetta === 0, String(ennenPistetta));

// AARTEEN AVAUS: oikea vastaus sytyttää pisteen.
const aarre = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.naytaTutkiSivu(2, { heti: true });
  await new Promise((r) => setTimeout(r, 500));
  const napit = [...document.querySelectorAll('#arrival-dialog .kulttuuri-vaihtoehdot button')];
  const oikea = napit.find((b) => /kuka tahansa vapaa kansalainen/i.test(b.textContent));
  if (!oikea) return { virhe: napit.map((b) => b.textContent) };
  oikea.click();
  await new Promise((r) => setTimeout(r, 500));
  return {
    tulos: document.querySelector('#arrival-dialog .kulttuuri-tulos')?.textContent ?? '',
    pisteita: document.querySelectorAll('.fokuspiste').length,
  };
});
vaadi('AARTEEN AVAUS sytyttää vihreän pisteen kartalle',
  /oikein/i.test(aarre.tulos) && aarre.pisteita >= 1, JSON.stringify(aarre));

// Lehti kiinni, piste jää palamaan kartalle.
const kartalla = await sivu.evaluate(async () => {
  document.getElementById('arrival-dialog')?.close();
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 700));
  const piste = document.querySelector('.fokuspiste');
  const osuma = piste?.querySelector('.fokuspiste-osuma');
  return {
    pisteita: document.querySelectorAll('.fokuspiste').length,
    osumasade: Number(osuma?.getAttribute('r')),
    nimi: piste?.getAttribute('aria-label') ?? '',
  };
});
vaadi('piste on kartalla sormenkokoisella osuma-alueella',
  kartalla.pisteita >= 1 && kartalla.osumasade >= 22 && /akropolis/i.test(kartalla.nimi),
  JSON.stringify(kartalla));

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-vihrea-piste.png') });

// Pisteen napautus avaa kohtaamisen.
const kohtaaminen = await sivu.evaluate(async () => {
  window.matkakirja.ui.busy = false;
  document.querySelector('.fokuspiste')
    ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 500));
  const kortti = document.querySelector('.fokusvirta-kortti');
  return {
    kortti: Boolean(kortti),
    otsikko: kortti?.querySelector('.fokusvirta-otsikko')?.textContent ?? '',
    // v1120: suora Tapaa-nappi korvattiin varmistuksella (Kyllä/Ei)
    // ja kahden yrityksen pränttivaroituksella.
    varmistus: kortti?.querySelector('.fokusvirta-varmistus')?.textContent ?? '',
    varoitus: kortti?.querySelector('.fokusvirta-varoitus')?.textContent ?? '',
    napit: [...(kortti?.querySelectorAll('button') ?? [])]
      .map((b) => b.textContent.trim()).filter((t) => /^(kyllä|ei)$/i.test(t)),
  };
});
vaadi('pisteen napautus avaa Vartija Nikoksen kohtaamisen',
  kohtaaminen.kortti && /nikos/i.test(kohtaaminen.otsikko)
    && /haluatko varmasti tavata/i.test(kohtaaminen.varmistus)
    && /kaksi yritystä/i.test(kohtaaminen.varoitus)
    && kohtaaminen.napit.length === 2,
  JSON.stringify(kohtaaminen));

await sivu.screenshot({ path: join(ULOS, 'savuke-kevyt-kohtaaminen.png') });

// Kohtaamisen Kyllä vie laattakysymykseen (sama actionQuiz kuin ennen).
const kysymys = await sivu.evaluate(async () => {
  const { game } = window.matkakirja;
  game.phase = 'action';
  [...document.querySelectorAll('.fokusvirta-kortti button')]
    .find((b) => /^kyllä$/i.test(b.textContent.trim()))?.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    kortti: document.querySelectorAll('.fokusvirta-kortti').length,
    vaihe: game.phase,
    kysymys: Boolean(game.quiz),
  };
});
vaadi('Kyllä avaa laattakysymyksen ja sulkee kortin',
  kysymys.kortti === 0 && (kysymys.kysymys || kysymys.vaihe === 'quiz'), JSON.stringify(kysymys));

/*
 * LAATAN RATKETTUA MERKINTÄ EI VAIHDU (omistajan bugi 27.8.2026).
 * Ateenan pulman ratkettua matkakirjakorttiin ilmestyi VANHA
 * saapumisteksti ("Torin kauppias antoi minun maistaa oliiveja
 * kolmesta ruukusta", js/packs/europe-saapumiset.js) fokusvirran oman
 * merkinnän tilalle. Yksikkötesti vartioi fokusvirtaMatkakirjaa
 * (tests/fokusvirta.test.mjs); tämä vartioi sitä, mitä KORTISSA
 * oikeasti lukee — sinne vika ruudulla ilmestyi.
 *
 * Tila rakennetaan kuten js/game.js revealToken sen jättää: laatta pois
 * ja kaupunki löydettyjen joukkoon.
 */
const ratkaistu = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  document.getElementById('quiz-dialog')?.close?.();
  game.quiz = null;
  game.phase = 'action';
  game.tokens.delete('ateena');
  game.revealed.set('ateena', 'coin');
  ui.render();
  await new Promise((r) => setTimeout(r, 1800));
  return {
    piilossa: document.querySelector('.fact-card')?.hidden !== false,
    teksti: (document.getElementById('fact-text')?.textContent ?? '').slice(0, 60),
  };
});
vaadi('laatan ratkettua kortissa on yhä isoisän fokusmerkintä',
  !ratkaistu.piilossa
    // Joko saapumismerkintä ("Torilla…") tai aarteen jälkisana
    // ("Seisoin samalla kalliolla…") — kumpikin on fokusvirran omaa.
    && /torilla|kalliolla/i.test(ratkaistu.teksti)
    // Vanhan saapumistekstin tunnussanat EIVÄT saa palata korttiin.
    && !/kauppias|ruuku/i.test(ratkaistu.teksti),
  JSON.stringify(ratkaistu));

/*
 * SAMA RATKAISTUSSA KAUPUNGISSA ILMAN AARREMERKINNÄN LIPPUA. Aarteen
 * jälkisana on kertakäyttöinen: se katoaa, kun pelaaja poistuu
 * kaupungista (js/fokusvirta.js aarreLoytyi nollaa lipun). Juuri
 * silloin vika näkyi — kortti putosi vanhaan saapumistekstiin. Käydään
 * siis muualla ja palataan Ateenaan.
 */
const paluu = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const muu = game.pack.cities.find((c) => c.id !== 'ateena');
  game.player.pos = { type: 'city', city: muu.id };
  ui.render();
  await new Promise((r) => setTimeout(r, 400));
  game.player.pos = { type: 'city', city: 'ateena' };
  ui.render();
  await new Promise((r) => setTimeout(r, 2500));
  return {
    lippu: Boolean(ui.fokusaarreMerkinta),
    piilossa: document.querySelector('.fact-card')?.hidden !== false,
    teksti: (document.getElementById('fact-text')?.textContent ?? '').slice(0, 60),
  };
});
vaadi('ratkaistuun kaupunkiin palatessa kortissa on fokusvirran merkintä',
  !paluu.piilossa && paluu.lippu === false
    && /torilla/i.test(paluu.teksti) && !/kauppias|ruuku/i.test(paluu.teksti),
  JSON.stringify(paluu));

vaadi('ei sivuvirheitä kokeilutilassa', virheet.length === 0, virheet.join(' | '));

/* ==================== 2. LIPPUTESTI: VANHA VIRTA ==================== */

vanhaVirta = true;
virheet.length = 0;
await sivu.evaluate(() => localStorage.clear());
const vanha = await ateenaan();
vaadi('vanha virta: nappula Ateenassa', vanha.kaupunki === 'ateena', JSON.stringify(vanha));

const vanhaTutki = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  ui.avaaTutkinta(game.cityOf());
  await new Promise((r) => setTimeout(r, 900));
  const dialogi = document.getElementById('arrival-dialog');
  const pinta = document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti');
  return {
    lehtiAuki: Boolean(dialogi?.open),
    virranPinta: Boolean(pinta),
    teksti: (pinta?.textContent ?? '').slice(0, 60),
  };
});
vaadi('lippu palauttaa korttiannostelun: Tutki avaa virran, ei lehteä',
  vanhaTutki.virranPinta && !vanhaTutki.lehtiAuki, JSON.stringify(vanhaTutki));

await sivu.screenshot({ path: join(ULOS, 'savuke-vanha-virta.png') });
vaadi('ei sivuvirheitä vanhassa virrassa', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
