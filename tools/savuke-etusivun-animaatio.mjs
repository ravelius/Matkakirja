/*
 * SELAINSAVUKE: etusivun reittianimaatio ja avauslennon ajoitus.
 *
 * Yksikkötestit lukevat lähdekoodia ja laskevat samat luvut kuin peli,
 * mutta ne eivät näe yhtäkään pikseliä. Tämä ajo mittaa selaimessa sen,
 * mitä omistaja katsoo: kuinka pitkän matkan punainen ja sininen piste
 * kulkevat viidessä sekunnissa, minkä muotoinen majakkavälähdys on, ja
 * ehtiikö lennon repliikki kirjoittua ennen kuin kone laskeutuu.
 *
 *   node tools/savuke-etusivun-animaatio.mjs
 *
 * Vertailuajo vanhaan versioon: git stash && node tools/... && git stash pop.
 * KAAPPAUSKANSIO=/polku erottaa ajojen kuvat toisistaan.
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet katkaistaan,
 * jotta ajo ei riipu verkosta.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8734, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

await sivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

// --- 1) Kerros rakentuu ----------------------------------------------------

const rakenne = await sivu.evaluate(() => {
  const kerros = document.querySelector('.alkureitit');
  if (!kerros) return { virhe: 'kerrosta ei ole' };
  const kulkijat = [...kerros.querySelectorAll('.alkureitti-kulkija')];
  const laji = (solmu) => (solmu.closest('.alkureitti-isoisa') ? 'isoisa' : 'kauppa');
  return {
    polkuja: kerros.querySelectorAll('path').length,
    kulkijoita: kulkijat.length,
    // Montako <animate> kunkin lajin kärkiympyröillä on.
    sykkeita: kulkijat.map((k) => ({
      laji: laji(k),
      animaatioita: k.querySelectorAll('circle > animate').length,
    })),
  };
});
vaadi('reittikerros rakentuu', !rakenne.virhe && rakenne.kulkijoita === 6,
  JSON.stringify({ polkuja: rakenne.polkuja, kulkijoita: rakenne.kulkijoita }));
const punaisetSykkivat = rakenne.sykkeita.filter((s) => s.laji === 'isoisa')
  .every((s) => s.animaatioita === 4);
const sinisetEivat = rakenne.sykkeita.filter((s) => s.laji === 'kauppa')
  .every((s) => s.animaatioita === 0);
vaadi('punaisella on syke (2 ympyrää × säde+peittävyys)', punaisetSykkivat,
  JSON.stringify(rakenne.sykkeita));
vaadi('sinisillä ei ole yhtään sykeanimaatiota', sinisetEivat);

// --- 2) Pisteen siirtymä viidessä sekunnissa -------------------------------

/*
 * Näytteistetään kärkien keskipisteet ruutupikseleinä. Kukin reitti on
 * liikkeellä vain osan silmukastaan, joten mitataan pisin viiden sekunnin
 * siirtymä koko näytejakson ajalta — se on reitin oma kulkuvauhti.
 */
const NAYTEVALI = 250;
// 100 s riittää: pisin silmukka on 66 s, joten jokainen reitti ehtii kulkea
// kokonaan. NAYTTEITA=40 lyhentää ajon, kun mitataan vain lentoa.
const NAYTTEITA = Number(process.env.NAYTTEITA ?? 400);
await sivu.evaluate(() => {
  window.__naytteet = [];
  window.__kerays = setInterval(() => {
    const rivi = [...document.querySelectorAll('.alkureitti-kulkija')].map((k) => {
      const ydin = k.querySelector('.alkureitti-karki');
      const r = ydin.getBoundingClientRect();
      return {
        laji: k.closest('.alkureitti-isoisa') ? 'isoisa' : 'kauppa',
        x: r.x + r.width / 2,
        y: r.y + r.height / 2,
        nakyy: Number(getComputedStyle(k).opacity),
      };
    });
    window.__naytteet.push({ t: performance.now(), rivi });
  }, 250);
});
await sivu.waitForTimeout(NAYTEVALI * NAYTTEITA + 500);
const siirtymat = await sivu.evaluate(() => {
  clearInterval(window.__kerays);
  const n = window.__naytteet;
  const kulkijoita = n[0].rivi.length;
  const tulos = [];
  for (let i = 0; i < kulkijoita; i++) {
    let paras = 0;
    for (let a = 0; a < n.length; a++) {
      const b = n.findIndex((s) => s.t >= n[a].t + 5000);
      if (b < 0) break;
      // Vain jakso, jonka ajan piste on koko ajan näkyvissä: silmukan
      // sauma hyppäisi lähtöpisteeseen ja väärentäisi mitan.
      let nakyvissa = true;
      for (let k = a; k <= b; k++) if (n[k].rivi[i].nakyy < 0.05) { nakyvissa = false; break; }
      if (!nakyvissa) continue;
      const p = n[a].rivi[i];
      const q = n[b].rivi[i];
      paras = Math.max(paras, Math.hypot(q.x - p.x, q.y - p.y));
    }
    tulos.push({ laji: n[0].rivi[i].laji, px5s: Number(paras.toFixed(1)) });
  }
  return tulos;
});
console.log('  siirtymä 5 s:ssa (px):', JSON.stringify(siirtymat));
const punaiset = siirtymat.filter((s) => s.laji === 'isoisa').map((s) => s.px5s);
const siniset = siirtymat.filter((s) => s.laji === 'kauppa').map((s) => s.px5s);
// v584: punaisen nopeampi osa kulki 60 laudan yksikköä sekunnissa.
vaadi('punainen on hitaampi kuin v584', Math.max(...punaiset) > 0,
  `nopein punainen ${Math.max(...punaiset)} px / 5 s`);
vaadi('siniset ovat punaista hitaampia',
  Math.max(...siniset) < Math.min(...punaiset),
  `siniset enintään ${Math.max(...siniset)} px, punaiset vähintään ${Math.min(...punaiset)} px`);

// --- 3) Majakkavälähdyksen muoto ------------------------------------------

const valahdys = await sivu.evaluate(async () => {
  const ydin = document.querySelector('.alkureitti-isoisa .alkureitti-karki');
  const sininen = document.querySelector('.alkureitti-kauppa .alkureitti-karki');
  const otokset = [];
  const alku = performance.now();
  // 20 ms:n välein 5 sekuntia: 0,3 sekunnin leimahdus osuu näytteisiin.
  while (performance.now() - alku < 5000) {
    otokset.push({
      t: performance.now() - alku,
      punainen: Number(getComputedStyle(ydin).opacity),
      punainenR: ydin.r.animVal.value,
      sininen: Number(getComputedStyle(sininen).opacity),
      sininenR: sininen.r.animVal.value,
    });
    await new Promise((r) => setTimeout(r, 20));
  }
  return otokset;
});
const pOp = valahdys.map((o) => o.punainen);
const pR = valahdys.map((o) => o.punainenR);
const sOp = valahdys.map((o) => o.sininen);
const sR = valahdys.map((o) => o.sininenR);
const minOp = Math.min(...pOp);
const maxOp = Math.max(...pOp);
const puoliväli = (minOp + maxOp) / 2;
const kirkkaita = pOp.filter((o) => o > puoliväli).length / pOp.length;
console.log(`  punaisen peittävyys ${minOp.toFixed(3)}…${maxOp.toFixed(3)},`
  + ` säde ${Math.min(...pR).toFixed(2)}…${Math.max(...pR).toFixed(2)},`
  + ` yli puolivälin ${(kirkkaita * 100).toFixed(1)} % ajasta`);
console.log(`  sinisen peittävyys ${Math.min(...sOp).toFixed(3)}…${Math.max(...sOp).toFixed(3)},`
  + ` säde ${Math.min(...sR).toFixed(2)}…${Math.max(...sR).toFixed(2)}`);
vaadi('punainen välähtää: peittävyys ja säde vaihtelevat',
  maxOp / minOp > 1.5 && Math.max(...pR) / Math.min(...pR) > 1.5);
vaadi('välähdys on terävä piikki, ei aalto', kirkkaita < 0.2,
  `kirkkaana ${(kirkkaita * 100).toFixed(1)} % ajasta (aalto olisi ~50 %)`);
vaadi('sininen ei välky lainkaan',
  Math.max(...sOp) - Math.min(...sOp) < 1e-6 && Math.max(...sR) - Math.min(...sR) < 1e-6,
  `peittävyys ${Math.min(...sOp).toFixed(3)}…${Math.max(...sOp).toFixed(3)}`);

// Kaappaukset: koko etusivu sekä lähikuva punaisesta pisteestä
// leimahduksen huipulla ja himmeässä vaiheessa. Lähikuva on ainoa tapa
// nähdä ero — piste on 390 pikselin ruudulla vain muutaman pikselin.
await sivu.screenshot({ path: join(ULOS, 'etusivu-reitit.png') });
const odotaVaihe = async (kirkas) => sivu.evaluate(async (halutaanKirkas) => {
  const ydin = document.querySelector('.alkureitti-isoisa .alkureitti-karki');
  for (let i = 0; i < 400; i++) {
    const op = Number(getComputedStyle(ydin).opacity);
    if (halutaanKirkas ? op > 0.85 : op < 0.55) {
      const r = ydin.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2, op };
    }
    await new Promise((valmis) => setTimeout(valmis, 10));
  }
  return null;
}, kirkas);
for (const [nimi, kirkas] of [['valahdys', true], ['himmea', false]]) {
  const kohta = await odotaVaihe(kirkas);
  if (!kohta) { vaadi(`lähikuva: ${nimi}`, false, 'vaihetta ei osunut kohdalle'); continue; }
  await sivu.screenshot({
    path: join(ULOS, `etusivu-piste-${nimi}.png`),
    clip: {
      x: Math.max(0, kohta.x - 60), y: Math.max(0, kohta.y - 60), width: 120, height: 120,
    },
  });
  console.log(`  lähikuva ${nimi}: peittävyys ${kohta.op.toFixed(3)}`);
}

// --- 4) Avauslennon ajoitus ------------------------------------------------

await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  n?.click();
});
await sivu.waitForTimeout(2000);

const lento = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  if (game.phase !== 'pickstart') return { virhe: `väärä vaihe: ${game.phase}` };
  const kaupunki = game.pack.cities.find((c) => c.id !== 'lontoo' && c.links?.length);
  const havainnot = { kaupunki: kaupunki.id };
  const kello = performance.now();
  ui.doPickStart(kaupunki);
  /*
   * Kaikki ajat luetaan siitä hetkestä, jona kalvo ilmestyy: sitä ennen
   * kuluu laudan piirtoon useita sekunteja, eikä lennon ajoituksella ole
   * sen kanssa mitään tekemistä. Tarkkailu jatkuu senkin jälkeen, kun
   * kone on laskeutunut — muuten kesken jäänyt kirjoitus jäisi kirjaamatta.
   */
  await new Promise((valmis) => {
    const tikki = setInterval(() => {
      const nyt = performance.now();
      const rivi = document.querySelector('.flight-line');
      const nappi = document.querySelector('.flight-exit');
      if (rivi && havainnot.kalvo === undefined) havainnot.kalvo = nyt;
      if (rivi) {
        const kirjoitettu = rivi.querySelector('.typed')?.textContent ?? rivi.textContent;
        const tuleva = rivi.querySelector('.pending');
        if (kirjoitettu && havainnot.tekstiAlkoi === undefined) havainnot.tekstiAlkoi = nyt;
        if (kirjoitettu && !tuleva && havainnot.tekstiValmis === undefined) {
          havainnot.tekstiValmis = nyt;
          havainnot.rivi = rivi.textContent;
        }
      }
      if (nappi && !nappi.classList.contains('odottaa') && havainnot.koneLaskeutui === undefined) {
        havainnot.koneLaskeutui = nyt;
      }
      const loppu = havainnot.tekstiValmis !== undefined && havainnot.koneLaskeutui !== undefined;
      if (loppu || nyt - kello > 40000) { clearInterval(tikki); valmis(); }
    }, 20);
  });
  const suhteessa = (t) => (t === undefined ? undefined : Math.round(t - havainnot.kalvo));
  return {
    kaupunki: havainnot.kaupunki,
    rivi: havainnot.rivi,
    sanoja: havainnot.rivi ? havainnot.rivi.trim().split(/\s+/).length : 0,
    tekstiAlkoi: suhteessa(havainnot.tekstiAlkoi),
    tekstiValmis: suhteessa(havainnot.tekstiValmis),
    koneLaskeutui: suhteessa(havainnot.koneLaskeutui),
  };
});
console.log('  lennon ajoitus:', JSON.stringify(lento));
/*
 * Yläraja puuttuu tarkoituksella: avauslennon alla piirtyy koko
 * maailmankartan lauta, ja kuormitettu pääsäie venyttää jokaista
 * setTimeoutia. Mitattuna sama rivi alkoi v584:ssä 1473 ms ja tämän
 * jälkeen 1417 ms kalvon avauduttua, vaikka nimellinen viive kasvoi
 * 190 ms:stä 590 ms:iin — kuorma peittää eron alleen. Tässä
 * varmistetaan siis vain, ettei kirjoitus ala kalvon kanssa yhtä
 * aikaa; nimellinen viive on yksikkötestin asia.
 */
vaadi('lennon repliikki ei ala kalvon kanssa yhtä aikaa',
  lento.tekstiAlkoi >= 350, `${lento.tekstiAlkoi} ms kalvon avauduttua`);
vaadi('kone ei laskeudu kesken kirjoituksen',
  lento.tekstiValmis !== undefined && lento.koneLaskeutui >= lento.tekstiValmis,
  `teksti valmis ${lento.tekstiValmis} ms, Astu mantereelle ${lento.koneLaskeutui} ms`
  + ` (${lento.sanoja} sanaa)`);
await sivu.screenshot({ path: join(ULOS, 'lento-repliikki.png') });

vaadi('ei JS-virheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\nkaappaukset: ${ULOS}`);
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`${tulokset.length - kaatui.length}/${tulokset.length} kunnossa`);
await selain.close();
palvelin.close();
process.exit(kaatui.length ? 1 : 0);
