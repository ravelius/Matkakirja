/*
 * Savuke: AVAUKSEN ÄÄNI — mitä portin painalluksesta kuuluu.
 *
 * OMISTAJAN TILAUS 7.9.2026, sanatarkasti: *"Pelin aloitussivulla, heti
 * kun pelaaja on painanut "aloita seikkailu" nappia, niin musiikki
 * saisi hiljentyä hieman ja mukaan saisi tulla se terminaalin
 * äänimaisema voimakkaasti mukaan ja siitä lähtisi omalla ajallaan
 * kertojan luenta myös käyntiin."*
 *
 * Yksikkötesti (tests/ambienssi.test.mjs) mittaa tasot tynkäselaimessa;
 * tämä mittaa saman OIKEASSA selaimessa oikeine mediaelementteineen,
 * oikeine ajastimineen ja oikeassa järjestyksessä — juuri se järjestys
 * on tilauksen ydin.
 *
 * MITÄ MITATAAN
 *  1. Ennen painallusta molemmat soivat omalla tasollaan.
 *  2. Painalluksesta MUSIIKKI LASKEE ja TERMINAALI NOUSEE — eri
 *     suuntiin, samasta eleestä.
 *  3. Lasku on LIUKU EIKÄ HYPPY: kesken liu'un mitattu taso on
 *     lähtötason ja lopputason välissä.
 *  4. Musiikki ei vaikene: se hiljenee "hieman", ei pois.
 *  5. KERTOJAN LUENTA ALKAA VASTA VIIVEEN JÄLKEEN (js/ui.js
 *     AVAUS_KERTOMUS_MS 2850 ms) eli vasta äänimaiseman noustua.
 *  6. TERMINAALI SOI KOKO LUENNAN AJAN — nauha etenee ja taso pysyy
 *     yli tavallisen. Tämä on omistajan vika 7.9.2026 illalla
 *     (*"Lentoterminaalin ääni ei kuulu etusivulla, vaikka
 *     pitäisi."*): avauksen nosto kerrottiin ennen kertojan väistön
 *     PÄÄLLE, ja koska avauksen ainoa puhuja on avaustekstin kertoja
 *     itse, nosto hukkui väistöön 2,85 sekunnin kohdalla ja
 *     terminaali jäi loppuluennan ajaksi 64 % oman tasonsa alle.
 *  7. Luennan päätyttyä sekoitus palaa pelin tavalliseen käytäntöön.
 *  8. AVAUSLENNON KABIINI SOI. Sama ajo jatkaa kartalle ja lähtee
 *     Ateenaan: matkustamon äänimaisema ('lentomatka') on soiva ja
 *     kuuluva, eikä avauksen lippu jää nostamaan sitä (nosto koskee
 *     vain etusivua).
 *  9. Taustaäänten ollessa pois avauksen kutsut eivät tee eivätkä
 *     riko mitään (äänivalikon asetuksia kunnioitetaan).
 * 10. MUSIIKKI POIS → ÄÄNIMAISEMA SOI SILTI. Omistajan toinen vika
 *     samana iltana (*"striimilukija ei mene päälle, jos taustamusiikki
 *     on kytketty pois. Ne ovat kaksia irrallista asiaa"*): valikon
 *     Musiikki-kytkin vaientaa vain raidat, ja äänimaiseman nauha
 *     etenee yhä. Kytkin takaisin päälle palauttaa raidan.
 *
 *   node tools/savukkeet/savuke-etusivun-aani.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/** Hiljainen 8-bittinen wav (8 kHz) — dekoodautuu oikeasti selaimessa. */
function hiljainenWav(sekunnit) {
  const taajuus = 8000;
  const naytteita = Math.round(taajuus * sekunnit);
  const tavut = Buffer.alloc(44 + naytteita, 128);
  tavut.write('RIFF', 0, 'ascii');
  tavut.writeUInt32LE(36 + naytteita, 4);
  tavut.write('WAVEfmt ', 8, 'ascii');
  tavut.writeUInt32LE(16, 16);
  tavut.writeUInt16LE(1, 20);
  tavut.writeUInt16LE(1, 22);
  tavut.writeUInt32LE(taajuus, 24);
  tavut.writeUInt32LE(taajuus, 28);
  tavut.writeUInt16LE(1, 32);
  tavut.writeUInt16LE(8, 34);
  tavut.write('data', 36, 'ascii');
  tavut.writeUInt32LE(naytteita, 40);
  return tavut;
}

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/*
 * Tarkkailu ennen sivun skriptejä: jokainen soitin talteen ja jokaisen
 * ensimmäinen play() aikaleimattuna. Luennan alkuhetki on koko
 * tilauksen kolmas kohta ("siitä lähtisi omalla ajallaan kertojan
 * luenta"), eikä sitä voi lukea mistään muualta.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  const tieto = { el, soitettu: null };
  window.__aanet.push(tieto);
  const play = el.play.bind(el);
  el.play = function (...p) {
    if (tieto.soitettu === null) tieto.soitettu = performance.now();
    return play(...p);
  };
  return el;
};
/*
 * Kuuluva taso kummallakin polulla: reititetty soitin (kompressori +
 * vahvistin) kertoo tasonsa gain-solmussa, reitittämätön elementin
 * omassa volumessa. Vertailut tehdään aina saman soittimen sisällä,
 * joten polkujen välistä kerrointa (VOLUME_POLUN_KORVAUS) ei tarvitse
 * purkaa.
 */
window.__taso = (el) => (el?.aaniVahvistin ? el.aaniVahvistin.gain.value : (el?.volume ?? 0));
window.__soitin = (osuma) => window.__aanet.find(
  (t) => osuma.test(String(t.el.currentSrc || t.el.src || '')),
) ?? null;
/** Etusivun äänimaisema: ei musiikki, ei luenta, ei tehoste. */
window.__maisema = () => window.__aanet.find((t) => {
  const src = String(t.el.currentSrc || t.el.src || '');
  return src && !/musa-|intro-puhe|efekti-|data:/.test(src);
}) ?? null;
window.__tasot = () => ({
  musa: window.__taso(window.__soitin(/musa-/)?.el),
  maisema: window.__taso(window.__maisema()?.el),
  maisemaSoi: window.__maisema()?.el?.paused === false,
  maisemaNauha: window.__maisema()?.el?.currentTime ?? null,
  musaSoi: window.__soitin(/musa-/)?.el?.paused === false,
});
/*
 * Uusin äänimaisema (etusivun terminaali ennen lähtöä, matkustamo
 * lennon aikana). Maisemasoittimia syntyy lisää paikan vaihtuessa,
 * joten kabiini haetaan listan lopusta eikä alusta.
 */
window.__uusinMaisema = () => {
  const kelpaa = window.__aanet.filter((t) => {
    const src = String(t.el.currentSrc || t.el.src || '');
    return src && !/musa-|intro-puhe|puhe-|efekti-|data:/.test(src);
  });
  return kelpaa[kelpaa.length - 1] ?? null;
};
window.__kabiini = () => {
  const t = window.__uusinMaisema();
  return t ? {
    soi: t.el.paused === false, nauha: t.el.currentTime,
    taso: window.__taso(t.el), src: String(t.el.currentSrc || t.el.src).slice(-40),
  } : null;
};
`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// serviceWorkers: 'block' — muuten sw sieppaa pyynnöt ja ajo mittaa välimuistia.
const ctx = await selain.newContext({ viewport: { width: 1024, height: 768 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
await sivu.addInitScript(TARKKAILU);
// Ulkomaailma poikki: ajo ei saa riippua verkosta.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (reitti) => reitti.abort());
/*
 * Äänitteet mockataan hiljaisuudella — myös ämpäriin osoittavat, koska
 * ne ovat ulkomaailmaa. Reitit rekisteröidään katkaisun JÄLKEEN
 * (Playwright kokeilee käänteisessä järjestyksessä).
 *
 * LUENTA ON LYHYT (2 s) TARKOITUKSELLA: savukkeen on ehdittävä nähdä
 * myös se, mitä luennan PÄÄTYTTYÄ tapahtuu.
 */
const aani = (sekunnit) => ({
  status: 200,
  contentType: 'audio/wav',
  headers: { 'access-control-allow-origin': '*' },
  body: hiljainenWav(sekunnit),
});
await sivu.route(/\.(mp3|wav)(\?|$)/i, (reitti) => reitti.fulfill(
  /intro-puhe/.test(reitti.request().url()) ? aani(2) : aani(60),
));
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForSelector('.start-btn', { timeout: 15000 });
await sivu.waitForTimeout(1200);

vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

/*
 * ENSIMMÄINEN ELE PORTIN SISÄLLÄ, EI NAPPIA. Selain sallii äänet vasta
 * eleestä, ja tämä savuke haluaa mitata NAPIN vaikutuksen — siis
 * tilanteen, jossa musiikki ja maisema jo soivat omalla tasollaan.
 * Napautus osuu portin ääniviihjeeseen ("Laita äänet päälle"), joka ei
 * tee mitään muuta.
 */
await sivu.click('.start-aanet');
await sivu.evaluate(() => window.matkakirja?.ui?.syncAmbience?.());
// Pohjavireen oma nousu on 4 s (POHJA_NOUSU_MS) — odotetaan se loppuun.
await sivu.waitForTimeout(5200);

/*
 * LÄHTÖTASO LUETAAN VASTA KUN SE ON PAIKALLAAN. Portin ääniviihjeen
 * napautus voi olla se ele, jolla soitin vihdoin pääsee alkuun, ja
 * silloin nousu jatkuu vielä kiinteän odotuksen jälkeen. Kesken
 * nousua luettu lähtötaso teki vertailuista arpaa (mitattu 7.9.2026:
 * musiikki 0,0408 nousun keskeltä, paikallaan 0,0684), joten
 * odotetaan kaksi peräkkäistä samaa näytettä.
 */
const vakiintunut = async () => {
  let edellinen = await sivu.evaluate(() => window.__tasot());
  for (let i = 0; i < 25; i += 1) {
    await sivu.waitForTimeout(400);
    const nyt = await sivu.evaluate(() => window.__tasot());
    if (Math.abs(nyt.musa - edellinen.musa) < 1e-6
      && Math.abs(nyt.maisema - edellinen.maisema) < 1e-6) return nyt;
    edellinen = nyt;
  }
  return edellinen;
};
const ennen = await vakiintunut();
vaadi('ennen painallusta musiikki soi', ennen.musaSoi === true && ennen.musa > 0,
  JSON.stringify(ennen));
vaadi('ennen painallusta terminaalin äänimaisema soi',
  ennen.maisemaSoi === true && ennen.maisema > 0, JSON.stringify(ennen));

// --- PAINALLUS ---------------------------------------------------------------
/*
 * Kello nollataan kaappausvaiheen kuuntelijassa, joka ehtii ennen napin
 * omaa käsittelijää: näin luennan viive mitataan juuri painalluksesta.
 */
await sivu.evaluate(() => {
  window.__t0 = null;
  document.querySelector('.start-btn').addEventListener('click', () => {
    window.__t0 = performance.now();
  }, true);
});
await sivu.click('.start-btn');

// Kesken liukua (liuku on 1,3 s): tason pitää olla matkalla, ei perillä.
await sivu.waitForTimeout(350);
const kesken = await sivu.evaluate(() => window.__tasot());
// Liu'un jälkeen: sekoitus on paikallaan.
await sivu.waitForTimeout(1250);
const avaus = await sivu.evaluate(() => window.__tasot());

vaadi('painalluksesta MUSIIKKI LASKEE', avaus.musa < ennen.musa * 0.9,
  JSON.stringify({ ennen, avaus }));
vaadi('musiikki hiljenee mutta EI VAIKENE', avaus.musa > 0, JSON.stringify(avaus));
vaadi('painalluksesta TERMINAALIN ÄÄNIMAISEMA NOUSEE', avaus.maisema > ennen.maisema * 1.1,
  JSON.stringify({ ennen, avaus }));
vaadi('maisema soi yhä painalluksen jälkeen', avaus.maisemaSoi === true, JSON.stringify(avaus));
vaadi('lasku on LIUKU eikä hyppy (kesken liu\'un välissä)',
  kesken.musa < ennen.musa && kesken.musa > avaus.musa,
  JSON.stringify({ ennen: ennen.musa, kesken: kesken.musa, avaus: avaus.musa }));

// --- LUENTA ALKAA VASTA VIIVEEN JÄLKEEN --------------------------------------
const luenta = await sivu.waitForFunction(() => {
  const t = window.__aanet.find(
    (a) => /intro-puhe/.test(String(a.el.currentSrc || a.el.src || '')) && a.soitettu !== null,
  );
  return t ? { alkoi: t.soitettu - window.__t0 } : null;
}, null, { timeout: 20000 }).then((k) => k.jsonValue()).catch(() => null);

vaadi('kertojan luenta lähti käyntiin', luenta !== null, 'luentaa ei alkanut');
vaadi('LUENTA ALKAA VASTA VIIVEEN JÄLKEEN (≥ 2850 ms painalluksesta)',
  luenta !== null && luenta.alkoi >= 2850, JSON.stringify(luenta));
vaadi('luenta alkaa vasta äänimaiseman nousun jälkeen (nousu mitattu 1,6 s kohdalla)',
  luenta !== null && luenta.alkoi > 1600, JSON.stringify(luenta));

// --- TERMINAALI SOI KOKO LUENNAN AJAN ----------------------------------------
/*
 * OMISTAJAN VIKA 7.9.2026 ILLALLA: *"Lentoterminaalin ääni ei kuulu
 * etusivulla, vaikka pitäisi."* Avauksen nosto (1,45) kerrottiin
 * kertojan väistön (0,25) päälle, ja avauksen ainoa puhuja on
 * avaustekstin kertoja itse — joten nosto hukkui heti luennan
 * alkaessa ja terminaali putosi 64 % kalibroidun tasonsa alle koko
 * loppuluennan ajaksi (mitattu Chromiumilla: 0,1728 → 0,0432, kun
 * tavallinen taso on 0,1192).
 *
 * Näyte otetaan vasta kun luentaa on takana 800 ms: väistön liuku on
 * 650 ms, joten siihen mennessä mahdollinen pudotus on jo tapahtunut.
 */
await sivu.waitForFunction(() => {
  const t = window.__aanet.find(
    (a) => /intro-puhe/.test(String(a.el.currentSrc || a.el.src || '')),
  );
  return !!t && t.el.currentTime >= 0.8;
}, null, { timeout: 20000 }).catch(() => null);
const luennanAikana = await sivu.evaluate(() => window.__tasot());
await sivu.waitForTimeout(300);
const luennanAikana2 = await sivu.evaluate(() => window.__tasot());

vaadi('TERMINAALIN NAUHA ETENEE luennan aikana',
  luennanAikana.maisemaSoi === true
    && luennanAikana2.maisemaNauha > luennanAikana.maisemaNauha,
  JSON.stringify({ luennanAikana, luennanAikana2 }));
vaadi('TERMINAALI PYSYY AVAUKSEN TASOSSA myös kertojan alla',
  luennanAikana.maisema > ennen.maisema,
  JSON.stringify({ ennen: ennen.maisema, luennanAikana: luennanAikana.maisema }));

// --- LUENNAN JÄLKEEN SEKOITUS PALAA ------------------------------------------
/*
 * Mockattu luenta kestää 2 s, ja sen päätyttyä purkautuu sekä puheen
 * väistö että avauksen oma nosto. Odotetaan kummankin liuku loppuun.
 */
await sivu.waitForFunction(() => {
  const t = window.__aanet.find(
    (a) => /intro-puhe/.test(String(a.el.currentSrc || a.el.src || '')),
  );
  return !!t && t.el.paused;
}, null, { timeout: 20000 }).catch(() => null);
await sivu.waitForTimeout(2600);
const jalkeen = await sivu.evaluate(() => window.__tasot());
const lahella = (a, b) => Math.abs(a - b) <= Math.max(b * 0.08, 0.002);
vaadi('luennan jälkeen musiikki palaa entiseen tasoonsa', lahella(jalkeen.musa, ennen.musa),
  JSON.stringify({ ennen: ennen.musa, jalkeen: jalkeen.musa }));
vaadi('luennan jälkeen maisema palaa entiseen tasoonsa', lahella(jalkeen.maisema, ennen.maisema),
  JSON.stringify({ ennen: ennen.maisema, jalkeen: jalkeen.maisema }));

// --- AVAUSLENNON KABIINI SOI -------------------------------------------------
/*
 * Sama ajo jatkaa kartalle ja lähtee Ateenaan. Matkustamon äänimaisema
 * ('lentomatka') on avauksen toinen ääni, ja tämä vartioi että se
 * SOI — nauha etenee ja taso on kuuluva. Avauksen nosto koskee vain
 * etusivua, joten kabiini soi omalla kalibroidulla tasollaan
 * (LENNON_VOIMA) silloinkin, jos lippu ehtii jäädä hetkeksi päälle.
 */
await sivu.evaluate(() => { window.matkakirja.ui.aloitaKartalta(); });
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.doPickStart(window.matkakirja.game.board.cityById.get('ateena'));
});
const kabiini = await sivu.waitForFunction(() => {
  if (!document.body.classList.contains('flight-active')
    && !window.matkakirja.ui.lennonAmbienssi) return null;
  const k = window.__kabiini();
  return k && k.soi && k.nauha > 0 ? k : null;
}, null, { timeout: 30000 }).then((k) => k.jsonValue()).catch(() => null);
await sivu.waitForTimeout(600);
const kabiini2 = await sivu.evaluate(() => window.__kabiini());

vaadi('AVAUSLENNON KABIINI SOI', kabiini !== null, 'matkustamon ääntä ei alkanut');
vaadi('kabiinin nauha etenee', kabiini !== null && kabiini2.nauha > kabiini.nauha,
  JSON.stringify({ kabiini, kabiini2 }));
vaadi('kabiini on kuuluvalla tasolla', kabiini !== null && kabiini2.taso > 0.02,
  JSON.stringify(kabiini2));

// --- MUSIIKKI POIS: ÄÄNIMAISEMA SOI SILTI ------------------------------------
/*
 * OMISTAJAN VIKA 7.9.2026 ILLALLA, sanatarkasti: *"striimilukija ei
 * mene päälle, jos taustamusiikki on kytketty pois. Ne ovat kaksia
 * irrallista asiaa, joten striimi-ääni pitäisi kuulua, vaikka
 * taustamusiikki on kytketty pois."* (Raamattu, VIAT v1672.)
 *
 * Kytkin käännetään valikon omasta napista (js/main.js kaannaMusiikki),
 * jotta mitattu polku on se, jota pelaaja painaa. Ehto: musiikki
 * vaikenee, ÄÄNIMAISEMA JATKAA — nauha etenee ja taso pysyy yli nollan.
 */
const maisemaPois = await sivu.evaluate(async () => {
  const musaKuuluu = () => window.__aanet.some((a) => /musa-/.test(String(a.el.currentSrc || a.el.src || ''))
    && a.el.paused === false && window.__taso(a.el) > 0.0005);
  document.querySelector('[data-kytkin="musiikki"]').click();
  /*
   * VAIMENEMISTA ODOTETAAN, EI KELLOTETA. Raita häivytetään
   * rAF-silmukalla (js/ambience-stream.js haivyta), joten kuormitetulla
   * koneella se vie enemmän seinäkelloa kuin nimellinen häivytys —
   * kiinteä odotus teki vartiosta arvan. Ehto on se, mitä omistaja
   * kuulee: musiikki ei enää kuulu.
   */
  for (let i = 0; i < 60 && musaKuuluu(); i += 1) {
    await new Promise((r) => setTimeout(r, 250));
  }
  const t = window.__uusinMaisema();
  const soivaMusa = musaKuuluu();
  const nauha1 = t?.el?.currentTime ?? null;
  await new Promise((r) => setTimeout(r, 600));
  return {
    muisti: localStorage.getItem('matkakirja-musiikki'),
    soivaMusa,
    maisemaSoi: t?.el?.paused === false,
    taso: window.__taso(t?.el),
    nauha1,
    nauha2: t?.el?.currentTime ?? null,
  };
});
vaadi('musiikin kytkin pois jää laitteen muistiin', maisemaPois.muisti === 'off',
  JSON.stringify(maisemaPois));
vaadi('MUSIIKKI VAIKENEE omasta kytkimestään (ei kuulu enää)',
  maisemaPois.soivaMusa === false, JSON.stringify(maisemaPois));
vaadi('ÄÄNIMAISEMA SOI YHÄ musiikin ollessa pois (nauha etenee, taso > 0)',
  maisemaPois.maisemaSoi === true && maisemaPois.taso > 0
    && maisemaPois.nauha2 > maisemaPois.nauha1,
  JSON.stringify(maisemaPois));

/* Kytkin takaisin päälle: musiikki palaa samaan paikkaan. */
const musaPalasi = await sivu.evaluate(async () => {
  document.querySelector('[data-kytkin="musiikki"]').click();
  for (let i = 0; i < 60; i += 1) {
    const soi = window.__aanet.some(
      (a) => /musa-/.test(String(a.el.currentSrc || a.el.src || '')) && a.el.paused === false,
    );
    if (soi) return { soi: true, muisti: localStorage.getItem('matkakirja-musiikki') };
    await new Promise((r) => setTimeout(r, 250));
  }
  return { soi: false, muisti: localStorage.getItem('matkakirja-musiikki') };
});
vaadi('musiikin kytkin takaisin päälle palauttaa raidan',
  musaPalasi.soi === true && musaPalasi.muisti === 'on', JSON.stringify(musaPalasi));

// --- ÄÄNIVALIKON ASETUKSIA KUNNIOITETAAN -------------------------------------
/*
 * Taustaäänet pois: avauksen kutsuilla ei ole mitään nostettavaa eikä
 * hiljennettävää, eivätkä ne saa heittää. Sama koskee kertojaa: ilman
 * luentaa nosto purkautuu vasta pelaajan edetessä, eikä mikään jää
 * roikkumaan.
 */
const kytkin = await sivu.evaluate(async () => {
  const virta = await import('/js/ambience-stream.js');
  const { sfx } = await import('/js/sound.js');
  const oli = sfx.enabled;
  sfx.enabled = false;
  virta.stopPlaceStream();
  virta.stopPohjaMusiikki();
  let heitti = false;
  try {
    virta.aloitaAvauksenAani();
    virta.lopetaAvauksenAani();
  } catch (e) {
    heitti = String(e);
  }
  sfx.enabled = oli;
  return { heitti, paalla: virta.avauksenAaniPaalla() };
});
vaadi('taustaäänten ollessa pois avaus ei heitä', kytkin.heitti === false, String(kytkin.heitti));
vaadi('avauksen lippu ei jää päälle', kytkin.paalla === false, JSON.stringify(kytkin));

vaadi('sivu ei kaatunut ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

// Mitatut tasot näkyviin: sekoituksen hienosäätö on kuulokokeen nuppi,
// ja seuraava säätäjä näkee tästä, mistä mihin luvut liikkuivat.
console.log('\nmitatut tasot (musiikki / maisema):');
for (const [nimi, t] of [['ennen', ennen], ['kesken', kesken], ['avaus', avaus],
  ['luenta', luennanAikana], ['jälkeen', jalkeen]]) {
  console.log(`  ${nimi.padEnd(7)} ${t.musa.toFixed(4)} / ${t.maisema.toFixed(4)}`);
}
if (luenta) console.log(`  luenta alkoi ${Math.round(luenta.alkoi)} ms painalluksesta`);
if (kabiini2) console.log(`  kabiini ${kabiini2.taso.toFixed(4)} (${kabiini2.src})`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
