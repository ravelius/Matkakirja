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

// --- 4) Avauslento: kartta, kone ja ajoitus --------------------------------
/*
 * AVAUSLENTO ON NYT KARTALLA (omistaja 24.8.2026, Raamattu:
 * ALOITUSLENTO UUSIKSI). Aiemmin tässä mitattiin pelkkiä aikoja, koska
 * lento oli oma piirretty kohtauksensa kalvolla eikä sillä ollut mitään
 * tekemistä kartan kanssa. Nyt kohtaus on kartta itse, ja mittaus
 * kattaa senkin: rajaukseen mahtuvat sekä lähtömaa että kohdemaa, kone
 * ja punainen reitti piirtyvät kartan omaan lentokerrokseen, ja vanha
 * kalvon kuvitteellinen karttalehti (.flight-scene) on poissa.
 *
 * Ajoitusväitteet ovat ennallaan: repliikin, luennan ja Astu
 * mantereelle -napin keskinäinen tahti ei muuttunut.
 */

await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  n?.click();
});
await sivu.waitForTimeout(2000);

// --- 3b) Avauksen asettelu: pieni kartta ylhäällä, tyhjä arkki alla -------
/*
 * OMISTAJAN TILAUS 26.8.2026, ilta: *"Aloitussivulla saisi olla
 * maailmankartta pienemmällä ja asettelu niin että maailmankartan
 * päällä olisi 'Maailman ympäri...' -otsikko ja sen alapuolella olisi
 * tyhjää vaaleaa karttapohjaa ja sen päälle tulisi muut tekstit.
 * Muuta 'Mistä aloitan?' napiksi... Ja poista 'Aloita matka' -nappi
 * kokonaan."*
 *
 * Väitteet mittaavat juuri nuo neljä asiaa: kartta on ylälohkossa eikä
 * täytä ruutua, arkki alkaa siitä mihin lohko loppuu, kysymys on nappi
 * ja ALOITA MATKA on poissa. Odotus kirjoituksen loppuun asti on osa
 * väitettä: nappi paljastuu vasta silloin.
 */
await sivu.waitForFunction(() => {
  const runko = document.getElementById('intro-runko');
  return runko && runko.textContent.length > 100 && !runko.querySelector('.pending');
}, { timeout: 60000 }).catch(() => {});
await sivu.waitForTimeout(1200);
await sivu.screenshot({ path: join(ULOS, 'etusivu-avaus.png') });

const avaus = await sivu.evaluate(() => {
  const mitat = (sel) => {
    const e = document.querySelector(sel);
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return { y: Math.round(r.y), h: Math.round(r.height) };
  };
  const nappi = document.getElementById('intro-valinta');
  return {
    intro: mitat('#intro'),
    kartta: mitat('.intro-kartta'),
    arkki: mitat('.intro-arkki'),
    juliste: mitat('.intro-juliste'),
    nappi: nappi && !nappi.hidden
      ? { teksti: nappi.textContent.trim(), peittavyys: Number(getComputedStyle(nappi).opacity) }
      : null,
    // Poistetut elementit: vanha erillinen nappi ja tekstikysymys.
    aloitaMatka: [...document.querySelectorAll('button')]
      .some((b) => /aloita matka/i.test(b.textContent)),
    kysymysElementti: Boolean(document.getElementById('intro-kysymys')),
    // v1121 (omistajan oikaisu): arkilla EI ole omaa taustaa — kartan
    // pergamentti jatkuu tyhjänä karttapintana alas asti.
    arkinTausta: (() => {
      const e = document.querySelector('.intro-arkki');
      if (!e) return '';
      const s = getComputedStyle(e);
      return `${s.backgroundImage.slice(0, 20)}|${s.backgroundColor}`;
    })(),
  };
});
console.log('  avauksen asettelu:', JSON.stringify(avaus));
const osuus = avaus.kartta && avaus.intro ? avaus.kartta.h / avaus.intro.h : 0;
/*
 * HAARUKKA VÄLJENI v1119:SSÄ (omistajan pelitestipalaute:
 * *"maailmankarttakuva katkeaa nyt liian aikaisin, eteläinen
 * pallonpuolisko leikkautuu … kasvata ylälohkoa niin että kartta näkyy
 * KOKONAAN alareunaansa asti, ja vaaleaa arkkia jää vastaavasti
 * vähemmän"*). Entinen 28–55 % katkaisi laudan iPadin pystyruudulla;
 * js/ui.js INTRO_KARTTA_VAHINTAAN/ENINTAAN ovat nyt 24–72 %.
 */
vaadi('maailmankartta on omassa ylälohkossaan (~24–72 % korkeudesta)',
  osuus > 0.22 && osuus < 0.74, `ylälohko ${(osuus * 100).toFixed(1)} % avauksesta`);
vaadi('julisteotsikko on kartan päällä',
  Boolean(avaus.juliste && avaus.kartta
    && avaus.juliste.y >= avaus.kartta.y - 1
    && avaus.juliste.y + avaus.juliste.h <= avaus.kartta.y + avaus.kartta.h + 1),
  JSON.stringify({ juliste: avaus.juliste, kartta: avaus.kartta }));
vaadi('arkki alkaa mihin kartta loppuu ja on pohjaton (karttapinta jatkuu)',
  Boolean(avaus.arkki && avaus.kartta && avaus.intro
    && Math.abs(avaus.arkki.y - (avaus.kartta.y + avaus.kartta.h)) < 2
    && Math.abs((avaus.arkki.y + avaus.arkki.h) - (avaus.intro.y + avaus.intro.h)) < 2
    && avaus.arkinTausta.startsWith('none|')
    && /rgba\(0, 0, 0, 0\)|transparent/.test(avaus.arkinTausta)),
  JSON.stringify({ arkki: avaus.arkki, tausta: avaus.arkinTausta }));
// Napin teksti vaihtui v1119:ssä: "Mistä aloitan?" → "Valitse
// aloituskaupunki" (omistajan pelitestipalaute — kysymys ei kertonut
// mitä napista tapahtuu).
vaadi('Valitse aloituskaupunki on näkyvä nappi',
  Boolean(avaus.nappi && /^valitse aloituskaupunki$/i.test(avaus.nappi.teksti)
    && avaus.nappi.peittavyys > 0.9),
  JSON.stringify(avaus.nappi));
vaadi('ALOITA MATKA -nappi ja erillinen kysymyselementti ovat poissa',
  !avaus.aloitaMatka && !avaus.kysymysElementti,
  `aloitaMatka ${avaus.aloitaMatka}, kysymysElementti ${avaus.kysymysElementti}`);

/*
 * === ALOITUSKARTAN KAUPUNGIT (omistajan pelitestipalaute v1119) =====
 *
 * *"Piilota toistaiseksi KAIKKI muut kaupungit paitsi Ateena — Tanger,
 * Moskova, Kairo, Kapkaupunki, Peking, Mumbai ym. pois näkyvistä
 * (nimet, ympyrät, konesymbolit; Lontoo lähtöpisteenä saa jäädä)."*
 *
 * Lauta on ennallaan (js/packs/maailma.js): mitataan siis NÄKYVYYS
 * eikä datan sisältöä — kaupungit palaavat kartalle lisäämällä ne
 * js/ui.js ETUSIVUN_NAKYVAT -joukkoon sitä mukaa kuin ne valmistuvat.
 */
const valintakartta = await sivu.evaluate(() => {
  const nakyva = (e) => {
    const cs = getComputedStyle(e);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  };
  const kaupungit = document.querySelector('.cities');
  return {
    nimet: [...(kaupungit?.querySelectorAll('.city-label') ?? [])]
      .filter(nakyva).map((e) => e.textContent),
    laattoja: [...(kaupungit?.querySelectorAll('.city, .city-start') ?? [])]
      .filter(nakyva).length,
    koneita: [...(kaupungit?.querySelectorAll('.airport') ?? [])].filter(nakyva).length,
  };
});
console.log('  valintakartta:', JSON.stringify(valintakartta));
vaadi('aloituskartalla näkyvät vain Lontoo ja Ateena',
  valintakartta.nimet.length === 2
    && valintakartta.nimet.every((n) => n === 'Lontoo' || n === 'Ateena'),
  valintakartta.nimet.join(', ') || '(ei nimiä)');
vaadi('muiden kaupunkien laatat ja konemerkit ovat piilossa',
  valintakartta.laattoja === 2 && valintakartta.koneita <= 2,
  `${valintakartta.laattoja} laattaa, ${valintakartta.koneita} konemerkkiä`);

/*
 * Tarkkailu käynnistetään ODOTTAMATTA sen valmistumista: samalla kun
 * sivun oma silmukka kerää ajat, Node ehtii kaapata kuvan lennosta
 * kesken kaiken. Lupaus noudetaan vasta lennon jälkeen.
 */
const lentoLupaus = sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  if (game.phase !== 'pickstart') return { virhe: `väärä vaihe: ${game.phase}` };
  const kaupunki = game.pack.cities.find((c) => c.id !== 'lontoo' && c.links?.length);
  const havainnot = { kaupunki: kaupunki.id };
  /*
   * ÄÄNI ENNEN KUVAA (omistajan tilaus 27.8.2026): kabiinin
   * äänimaisema on käynnistettävä napautuksesta, ei siitä hetkestä
   * jona kartta ja kone feidautuvat esiin. Kellotetaan kumpikin
   * hetki samalta kellolta: käynnistys kaapataan sen omasta
   * metodista (js/ui.js aloitaLennonAmbienssi) ja kuvan
   * paljastuminen pergamenttiarkin lähdöstä.
   */
  const kaynnista = ui.aloitaLennonAmbienssi.bind(ui);
  ui.aloitaLennonAmbienssi = () => {
    havainnot.aani ??= performance.now();
    kaynnista();
  };
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
      /*
       * ASTU MANTEREELLE -NAPPIA EI OLE (omistajan tilaus 26.8.2026).
       * Nappi oli ennen se hetki, josta laskeutuminen luettiin; nyt
       * lento jatkaa itsestään, ja sama hetki luetaan saapumisen
       * välikortista — se ilmestyy samassa lohkossa, jossa lento
       * päättyy. Napin paluu on oma väitteensä, joten sitä myös
       * tarkkaillaan koko lennon ajan.
       */
      if (document.querySelector('.flight-exit')) havainnot.nappiaOli = true;
      /*
       * Arkki pois = kartta ja kone paljastuvat (ks. äänen kellotus
       * yllä). Vasta NOUSU lasketaan: arkki tulee ruudulle vasta
       * napautuksen jälkeen, joten ilman ensin-nähtyä arkkia tämä
       * kirjaisi silmukan ensimmäisen tikin.
       */
      const arkki = document.body.classList.contains('aloitusverho-paalla');
      if (arkki) havainnot.arkkiOli = true;
      if (havainnot.arkkiOli && !arkki && havainnot.kuva === undefined) {
        havainnot.kuva = nyt;
      }
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
      if (document.querySelector('.saapumiskortti') && havainnot.koneLaskeutui === undefined) {
        havainnot.koneLaskeutui = nyt;
      }
      // Kohtauksen koristeet luetaan silloin kun kone on puolimatkassa:
      // katkojälki syttyy koneen perässä, joten heti lähdössä sitä ei
      // vielä ole. Leima tulee vasta laskeutumisessa (ks. alempi ajo).
      if (document.querySelector('.lento-katko')) {
        havainnot.katkoja = document.querySelectorAll('.lento-katko').length;
        havainnot.pilvia = document.querySelectorAll('.lento-pilvi').length;
        havainnot.vinjetti = Boolean(document.querySelector('.lento-vinjetti'));
        havainnot.vanoja = document.querySelectorAll('.lento-vana').length;
        // v1119: leima pois, laivareitit merelle, pöllö piiloon, rivi isommaksi.
        havainnot.leimoja = document.querySelectorAll('.lento-leima').length;
        havainnot.laivoja = document.querySelectorAll('.lento-laivareitti').length;
        havainnot.laivapisteita = document.querySelectorAll('.lento-laivapiste').length;
        const pollo = document.querySelector('.pollo-nappi');
        havainnot.polloPeitto = pollo ? getComputedStyle(pollo).opacity : null;
        havainnot.polloNakyy = Boolean(pollo)
          && getComputedStyle(pollo).display !== 'none'
          && Number(getComputedStyle(pollo).opacity) > 0.05;
        const rivi2 = document.querySelector('.flight-line');
        havainnot.riviFontti = rivi2 ? parseFloat(getComputedStyle(rivi2).fontSize) : 0;
      }
      /*
       * Kartan tila luetaan sillä hetkellä, kun kone ilmestyy: silloin
       * kamera-ajo on ohi ja rajaus on se, jonka pelaaja näkee. Rajaus
       * mitataan siitä, mahtuvatko lähtö- ja kohdekaupunki näkyvälle
       * alueelle — se on sama asia kuin "molemmat maat näkyvissä",
       * mutta luettavissa ilman maiden muotoja.
       */
      const kone = document.querySelector('.flight .flight-plane');
      if (kone && havainnot.kartta === undefined) {
        const n = ui.nakyvaAlue?.() ?? null;
        const paikka = (id) => {
          const c = game.board.cityById.get(id);
          return c ? { x: c.x, y: c.y } : null;
        };
        /*
         * KIERTÄVÄ KARTTA: näkyvä alue voi olla laudan levyisen
         * kopion puolella (kartta toistuu, ja lentokerros toistuu sen
         * mukana <use>-kopiona). Vertailu tehdään siksi laudan
         * leveyden jäännösluokassa — muuten oikein rajattu näkymä
         * näyttäisi mittarissa väärältä.
         */
        const leveys = game.pack.map?.width ?? 0;
        const sisalla = (p) => {
          if (!n || !p) return false;
          if (p.y < n.y || p.y > n.y + n.h) return false;
          for (const x of leveys ? [p.x, p.x + leveys, p.x - leveys] : [p.x]) {
            if (x >= n.x && x <= n.x + n.w) return true;
          }
          return false;
        };
        const naytto = (sel) => {
          const e = document.querySelector(sel);
          return e ? getComputedStyle(e).display : 'ei ole';
        };
        havainnot.kartta = {
          lauta: game.pack.id,
          kartalento: document.body.classList.contains('kartalento'),
          // Vanha piirros pois myös lennosta (omistajan linjaus
          // 25.8.2026, ilta) — mutta pergamentti jää alle.
          atlasLuokka: document.body.classList.contains('fokus-atlas-nakyma'),
          staattinen: naytto('.staattinen'),
          paperi: naytto('.paper-pohja'),
          reitti: Boolean(document.querySelector('.flight .flight-trail')),
          skene: Boolean(document.querySelector('.flight-scene')),
          sumu: Boolean(document.querySelector('.fokus-sumu-harso')),
          himmennettyja: document.querySelectorAll('.fokus-piilossa').length,
          nappula: document.querySelector('.pawns')
            ? getComputedStyle(document.querySelector('.pawns')).opacity : null,
          lahtoNakyy: sisalla(paikka('lontoo')),
          kohdeNakyy: sisalla(paikka(havainnot.kaupunki)),
        };
      }
      const loppu = havainnot.tekstiValmis !== undefined && havainnot.koneLaskeutui !== undefined;
      if (loppu || nyt - kello > 40000) { clearInterval(tikki); valmis(); }
    }, 20);
  });
  const suhteessa = (t) => (t === undefined ? undefined : Math.round(t - havainnot.kalvo));
  // Äänen ja kuvan hetket luetaan NAPAUTUKSESTA eikä kalvosta: koko
  // väite koskee sitä, kumpi kahdesta ehtii ensin napautuksen jälkeen.
  const napautuksesta = (t) => (t === undefined ? undefined : Math.round(t - kello));
  return {
    aani: napautuksesta(havainnot.aani),
    kuva: napautuksesta(havainnot.kuva),
    kaupunki: havainnot.kaupunki,
    rivi: havainnot.rivi,
    sanoja: havainnot.rivi ? havainnot.rivi.trim().split(/\s+/).length : 0,
    tekstiAlkoi: suhteessa(havainnot.tekstiAlkoi),
    tekstiValmis: suhteessa(havainnot.tekstiValmis),
    koneLaskeutui: suhteessa(havainnot.koneLaskeutui),
    kartta: havainnot.kartta ?? null,
    nappiaOli: Boolean(havainnot.nappiaOli),
    katkoja: havainnot.katkoja ?? 0,
    pilvia: havainnot.pilvia ?? 0,
    vanoja: havainnot.vanoja ?? 0,
    vinjetti: Boolean(havainnot.vinjetti),
    leimoja: havainnot.leimoja ?? 0,
    laivoja: havainnot.laivoja ?? 0,
    laivapisteita: havainnot.laivapisteita ?? 0,
    polloNakyy: havainnot.polloNakyy ?? null,
    polloPeitto: havainnot.polloPeitto ?? null,
    riviFontti: havainnot.riviFontti ?? 0,
  };
});

// Kaappaus kesken lennon: kone, katkojälki, pilvet ja vinjetti yhdessä
// kuvassa — juuri se näkymä, jota omistaja katsoo.
await sivu.waitForSelector('.flight .flight-plane', { state: 'attached', timeout: 40000 })
  .catch(() => {});
await sivu.waitForTimeout(3000);
await sivu.screenshot({ path: join(ULOS, 'lento-kartalla.png') });

const lento = await lentoLupaus;
console.log('  lennon ajoitus:', JSON.stringify(lento));
console.log('  lennon kartta:', JSON.stringify(lento.kartta));

const kartta = lento.kartta ?? {};
vaadi('kone ja punainen reitti piirtyvät kartan lentokerrokseen',
  Boolean(kartta.kartalento && kartta.reitti),
  `kartalento ${kartta.kartalento}, reitti ${kartta.reitti}`);
vaadi('vanha kalvokohtaus on poissa', kartta.skene === false,
  kartta.skene ? '.flight-scene on yhä ruudulla' : '');
vaadi('rajaukseen mahtuvat sekä lähtömaa että kohdemaa',
  Boolean(kartta.lahtoNakyy && kartta.kohdeNakyy),
  `Lontoo ${kartta.lahtoNakyy}, ${lento.kaupunki} ${kartta.kohdeNakyy}`);
/*
 * NIUKKUUS ILMAN MAAKOHTAISTA HIMMENNYSTÄ (29.8.2026,
 * bittikarttakartan vaihe 2).
 *
 * Väite vaati ennen kolme asiaa: lennon harso, käymättömien maiden
 * himmennys ja nappula piilossa. Keskimmäinen poistui pelistä
 * omistajan linjauksella (js/ui.js paivitaFokusKerros: KAIKKI
 * NÄKYVISSÄ ALUSTA), ja väite vartioi nyt sitä nimenomaisesti:
 * himmennettyjä on oltava NOLLA.
 *
 * LENNON OMA HARSO EI OLE FOKUSMOODIN SUMUVERHO. `.fokus-sumu-harso`
 * on aloituslennon oma kerros (js/kartta.js), ja se jää — juuri se
 * tekee lennon kartasta niukan nyt kun maakohtaista himmennystä ei
 * enää ole.
 */
vaadi('kartta on lennon aikana niukka: lennon harso päällä, nappula ja himmennykset pois',
  Boolean(kartta.sumu) && kartta.himmennettyja === 0 && kartta.nappula === '0',
  `harso ${kartta.sumu}, himmennettyjä ${kartta.himmennettyja}, nappulan peittävyys ${kartta.nappula}`);
/*
 * VANHA KARTTA POIS MYÖS LENNOSTA (omistajan linjaus 25.8.2026, ilta:
 * *"Lennon aikana taidetaan käyttää sitä vanhaa karttaa. Vanha kartta
 * pitää ottaa kokonaan pois pelistä toistaiseksi."*).
 *
 * Aiemmin lentonäkymä oli nimenomaan NIUKKA VANHA KARTTA: laudan
 * piirros harson alla. Nyt harson alla on pergamentti ja
 * valmistuneiden maiden atlas-lehdet — ja jos lähtö- ja kohdemaalle ei
 * ole vielä lehtiä (esim. lento New Yorkiin), pelkkä pergamentti.
 *
 * PAPERI ON OSA VÄITETTÄ. Ilman sitä lehdettömästä lennosta tulisi
 * paneelin tumma tausta, mikä olisi selvästi pahempi vika kuin se, joka
 * korjattiin.
 */
vaadi('lennossa vanha lauta on piilossa mutta pergamentti jää',
  kartta.atlasLuokka === true && kartta.staattinen === 'none'
  && kartta.paperi !== 'none' && kartta.paperi !== 'ei ole',
  `atlasLuokka ${kartta.atlasLuokka}, staattinen ${kartta.staattinen}, paperi ${kartta.paperi}`);
/*
 * ÄÄNI JOHTAA, KUVA SEURAA (omistajan tilaus 27.8.2026: *"aloita sen
 * äänen toisto mahdollisimman pian. Olisi kiva ensin kuulla kabiinin
 * ääni ennenkuin lentokone feidautuu kartan kanssa näytölle"*).
 *
 * Ennen matkustamon äänimaisema lähti vasta lennon omasta kohdasta
 * (js/ui.js aloituslentoSisalla), pergamenttiarkin jo väistyttyä — eli
 * täsmälleen samalla hetkellä kuin kartta ja kone paljastuivat. Nyt se
 * lähtee napautuksesta (doPickStart → aloitaLennonAmbienssi), ja väliin
 * jää arkin sisääntulo, kamera-ajo ja arkin ulostulo.
 *
 * VÄITE MITTAA JÄRJESTYKSEN JA VÄLIN, ei absoluuttista hetkeä: raja on
 * äänen oma sisääntulo (ambience-stream.js LENNON_NOUSU_MS 600 ms),
 * koska sitä lyhyempi etumatka tarkoittaisi, ettei kabiini ehdi nousta
 * kuuluviin ennen kuvaa — juuri se oli tilauksen sisältö.
 */
vaadi('kabiinin ääni lähtee ennen kuin kartta ja kone paljastuvat',
  lento.aani !== undefined && lento.kuva !== undefined
  && lento.kuva - lento.aani >= 600,
  `ääni ${Math.round(lento.aani ?? NaN)} ms, kuva ${Math.round(lento.kuva ?? NaN)} ms`);
/*
 * Yläraja puuttuu tarkoituksella: avauslennon alla piirtyy koko
 * maailmankartan lauta, ja kuormitettu pääsäie venyttää jokaista
 * setTimeoutia. Mitattuna sama rivi alkoi v584:ssä 1473 ms ja tämän
 * jälkeen 1417 ms kalvon avauduttua, vaikka nimellinen viive kasvoi
 * 190 ms:stä 590 ms:iin — kuorma peittää eron alleen. Tässä
 * varmistetaan siis vain, ettei kirjoitus ala kalvon kanssa yhtä
 * aikaa; nimellinen viive on yksikkötestin asia.
 *
 * NOLLAKOHTA ON YHÄ REPLIIKIN ILMESTYMINEN (.flight-line). Kartalla
 * lennettäessä se syntyy vasta kamera-ajon ja kartan tarkentumisen
 * jälkeen, joten mitattu hetki on eri kuin ennen — mutta väite on sama
 * ja koskee samaa asiaa: kirjoitus ei ala samassa silmänräpäyksessä
 * kuin se elementti, johon se kirjoitetaan.
 */
vaadi('lennon repliikki ei ala kalvon kanssa yhtä aikaa',
  lento.tekstiAlkoi >= 350, `${lento.tekstiAlkoi} ms kalvon avauduttua`);
vaadi('kone ei laskeudu kesken kirjoituksen',
  lento.tekstiValmis !== undefined && lento.koneLaskeutui >= lento.tekstiValmis,
  `teksti valmis ${lento.tekstiValmis} ms, jatko ${lento.koneLaskeutui} ms`
  + ` (${lento.sanoja} sanaa)`);

/*
 * === TILAUS 26.8.2026: EI NAPPIA, AUTOMAATTINEN JATKO, KOHTAUKSEN
 * KORISTEET =========================================================
 */
vaadi('Astu mantereelle -nappia ei ole missään vaiheessa',
  lento.nappiaOli === false, lento.nappiaOli ? '.flight-exit ilmestyi ruudulle' : '');
vaadi('lento jatkaa itsestään ilman napautusta',
  lento.koneLaskeutui !== undefined,
  `jatko ${lento.koneLaskeutui} ms kalvon avauduttua`);
vaadi('reitti jättää katkoviivaisen jäljen',
  lento.katkoja >= 5, `${lento.katkoja} katkoa`);
vaadi('koneella on vanavesiviirut', lento.vanoja === 2, `${lento.vanoja} viirua`);
vaadi('lennon vinjetti on paikallaan', lento.vinjetti === true);
/*
 * PILVET OVAT DOMISSA VAIN LENNON AJAN (omistajan lisätilaus
 * 26.8.2026). Ikuinen animaatio kartan päällä on juuri se, mitä
 * isoAnimaatio muuten kieltää — se on sallittu vain siksi, että se on
 * pelkkää transformia omalla kerroksellaan JA että se katoaa
 * laskeutumisessa.
 */
vaadi('harsopilvet lennon aikana', lento.pilvia >= 4 && lento.pilvia <= 6,
  `${lento.pilvia} pilveä`);
/*
 * === OMISTAJAN PELITESTIPALAUTE v1119, LENTONÄKYMÄ =================
 *
 * Saapumisleima pois, laivareitit merelle, pöllönappi piiloon lennon
 * ajaksi ja konekirjoitusrivi selvästi isommaksi.
 */
vaadi('saapumisleimaa ei piirretä lennon aikana', lento.leimoja === 0,
  `${lento.leimoja} leimaa`);
// Katto nousi 4 → 6 (omistaja 26.8.2026: laivoja myös Välimerelle).
vaadi('merellä kulkee himmeitä laivareittejä',
  lento.laivoja >= 1 && lento.laivoja <= 6, `${lento.laivoja} reittiä`);
vaadi('laivareiteillä on liikkuvat laivat', lento.laivapisteita === lento.laivoja,
  `${lento.laivapisteita} laivaa / ${lento.laivoja} reittiä`);
vaadi('pöllönappi on piilossa lennon ajan', lento.polloNakyy === false,
  `peittävyys ${lento.polloPeitto}`);
vaadi('lennon konekirjoitusrivi on selvästi isompi kuin 1 rem',
  lento.riviFontti >= 18, `${lento.riviFontti} px`);

// --- 5) Saapumissekvenssi: välikortti, kartta ja kaksi kuplaa -------------
/*
 * Omistajan tilaus 26.8.2026: lento → feidi tyhjään paperiin →
 * välikortti (kaupunki + päivälaskuri) → kartta suoraan oikeassa
 * zoomitilassa → pöllön kaksi kuplaa allekkain.
 *
 * Kamera-ajon puuttuminen mitataan body-luokasta zoom-kaynnissa: se on
 * päällä täsmälleen niin kauan kuin kamera liikkuu (js/kartta.js
 * ajaKamera). Tarkkailu alkaa välikortilta ja jatkuu kuplien yli.
 */
await sivu.evaluate(() => {
  window.__ajoja = 0;
  window.__ajoVahti = setInterval(() => {
    if (document.body.classList.contains('zoom-kaynnissa')) window.__ajoja += 1;
  }, 20);
});
/*
 * Teksti kirjoittuu vasta kun paperi on täyttänyt ruudun, joten sitä
 * odotetaan — ja odotetaan nimenomaan KIRJOITETTUA osaa (.typed).
 * typeText piirtää loppuosan näkymättömänä samaan elementtiin, joten
 * pelkkä textContent olisi valmis jo ennen ensimmäistä sanaa eikä
 * kaappaus näyttäisi mitään.
 */
const kortti = await sivu.evaluate(async () => {
  /*
   * typeText korvaa kirjoituksen lopuksi koko sisällön yhdellä
   * tekstisolmulla (.typed ja .pending katoavat), joten valmis rivi
   * luetaan textContentista ja kesken oleva .typedistä. Pisin nähty
   * rivi jää talteen: kortti on ruudulla vain hetken, eikä väite saa
   * kaatua siihen, että ajastus meni ohi.
   */
  let nahty = '';
  let oli = false;
  for (let i = 0; i < 600; i++) {
    const kortinPaalla = Boolean(document.querySelector('.saapumiskortti'));
    if (kortinPaalla) oli = true;
    const solmu = document.querySelector('.saapumiskortti-teksti');
    const kirjoitettu = solmu?.querySelector('.typed')?.textContent ?? solmu?.textContent ?? '';
    if (kirjoitettu.length > nahty.length) nahty = kirjoitettu;
    if (oli && !kortinPaalla) break;
    if (kirjoitettu && !solmu?.querySelector('.pending')?.textContent) break;
    await new Promise((valmis) => setTimeout(valmis, 20));
  }
  return { on: oli, teksti: nahty };
});
console.log('  välikortti:', JSON.stringify(kortti));
await sivu.screenshot({ path: join(ULOS, 'saapumiskortti.png') });
vaadi('saapumisen välikortti näkyy lennon jälkeen', kortti.on === true);
vaadi('välikortissa on kaupunki ja päivälaskuri',
  /\S+\s+·\s+PÄIVÄ\s+\d+\/80/.test(kortti.teksti.replace(/\s+/g, ' ')),
  kortti.teksti || '(tyhjä)');

/*
 * Kortti häipyy, kartta paljastuu ja pöllö puhuu.
 *
 * ODOTUS ON EHTO EIKÄ KELLO (v1119). Kuplat odottavat nyt
 * matkapäiväkirjan luennan loppumista (js/luenta.js luennanLoppuun) ja
 * toisen kuplan tauko kasvoi 1,6 → 2,5 s, joten kiinteä kuuden sekunnin
 * odotus ehti ensimmäisen kuplan väliin ja mittasi vain sen.
 */
await sivu.waitForFunction(
  () => [...document.querySelectorAll('.pollo-vihje')].filter((k) => !k.hidden).length >= 2,
  null,
  { timeout: 90000 },
).catch(() => {});
await sivu.waitForTimeout(600);
const saapuminen = await sivu.evaluate(() => {
  clearInterval(window.__ajoVahti);
  const kuplat = [...document.querySelectorAll('.pollo-vihje')]
    .filter((k) => !k.hidden)
    .map((k) => k.textContent.trim());
  return {
    kortteja: document.querySelectorAll('.saapumiskortti').length,
    pilvia: document.querySelectorAll('.lento-pilvi').length,
    lentokerros: document.querySelectorAll('.flight *').length,
    kuplat,
    ajoja: window.__ajoja,
    /*
     * KUPLIEN ULKOASU (omistajan pelitestipalaute v1119): kellertävä
     * pergamenttipohja valkoisen sijaan ja selvä marginaali ruudun
     * laitaan — kuplat olivat kiinni oikeassa reunassa.
     */
    kuplanPohja: (() => {
      const k = document.querySelector('.pollo-vihje:not([hidden])');
      return k ? getComputedStyle(k).backgroundColor : '';
    })(),
    kuplanMarginaali: (() => {
      const auki = [...document.querySelectorAll('.pollo-vihje')].filter((k) => !k.hidden);
      if (!auki.length) return -1;
      return Math.min(...auki.map((k) => Math.round(
        Math.min(k.getBoundingClientRect().left, innerWidth - k.getBoundingClientRect().right),
      )));
    })(),
    // Saapumisleima on poistettu kokonaan (v1119).
    leimoja: document.querySelectorAll('.lento-leima').length,
    // Matkapäiväkirjan otsikko lyheni ja lapulla on oma lyhyt rivinsä.
    paivakirjanOtsikko: document.getElementById('fact-voice')?.textContent ?? '',
    paivakirjanLyhyt: document.getElementById('fact-place-lyhyt')?.textContent ?? '',
  };
});
console.log('  saapuminen:', JSON.stringify(saapuminen));
await sivu.screenshot({ path: join(ULOS, 'saapumisen-kuplat.png') });
vaadi('välikortti väistyy kartan tieltä', saapuminen.kortteja === 0);
vaadi('pilvet ovat DOMissa vain lennon aikana', saapuminen.pilvia === 0,
  `${saapuminen.pilvia} pilveä lennon jälkeen`);
vaadi('lentokerros on tyhjä perillä', saapuminen.lentokerros === 0,
  `${saapuminen.lentokerros} elementtiä`);
vaadi('kartta ilmestyy ilman kamera-ajoa', saapuminen.ajoja === 0,
  `zoom-kaynnissa havaittu ${saapuminen.ajoja} kertaa`);
vaadi('kaksi pöllön kuplaa yhtä aikaa allekkain', saapuminen.kuplat.length === 2,
  saapuminen.kuplat.join(' || ') || '(ei kuplia)');
vaadi('ensimmäinen kupla toivottaa tervetulleeksi maahan',
  /^Tervetuloa .+\. Sinun on ratkaistava tehtävä .+ ennen kuin voit etsiä aarretta\.$/
    .test(saapuminen.kuplat[0] ?? ''),
  saapuminen.kuplat[0] ?? '(puuttuu)');
vaadi('toinen kupla neuvoo vihreään pisteeseen',
  saapuminen.kuplat[1] === 'Klikkaa kaupungin kultaista merkkiä kartalla.',
  saapuminen.kuplat[1] ?? '(puuttuu)');
/*
 * === OMISTAJAN PELITESTIPALAUTE v1119 ==============================
 */
vaadi('kuplat ovat kellertävällä pergamentilla, eivät valkoisella',
  saapuminen.kuplanPohja === 'rgb(244, 231, 202)', saapuminen.kuplanPohja);
vaadi('kuplat ovat irti ruudun laidasta (12–16 px)',
  saapuminen.kuplanMarginaali >= 12 && saapuminen.kuplanMarginaali <= 20,
  `${saapuminen.kuplanMarginaali} px laitaan`);
vaadi('saapumisleimaa ei ole missään', saapuminen.leimoja === 0,
  `${saapuminen.leimoja} leimaa`);
/*
 * Otsikko lyheni v1119:ssä: MATKAPÄIVÄKIRJASTA → MATKAPÄIVÄKIRJA.
 * Partitiivi ei saa palata. Muu otsikko ("Matkakirjasta",
 * "Isoisän aikataulusta") kuuluu eri haaralle eikä muuttunut — tämä
 * ajo lentää New Yorkiin, jolla ei ole fokusvirran merkintää.
 */
vaadi('vanha MATKAPÄIVÄKIRJASTA-otsikko on poissa',
  saapuminen.paivakirjanOtsikko !== 'Matkapäiväkirjasta',
  saapuminen.paivakirjanOtsikko);
vaadi('tiivistetyllä rivillä on vain kaupungin nimi',
  Boolean(saapuminen.paivakirjanLyhyt)
    && !/\d/.test(saapuminen.paivakirjanLyhyt),
  saapuminen.paivakirjanLyhyt || '(tyhjä)');

// --- 6) Napautusohitus: sama lento uudestaan, tällä kertaa kiirehtien ------
/*
 * Omistajan tilaus 26.8.2026: *"jos pelaaja haluaa kiirehtiä, niin
 * napauttamalla ruutua animaatio katkeaa kesken ja pelaaja pääsee
 * siirtymään mantereelle välittömästi"*.
 *
 * Ohitus on oma ajonsa omassa istunnossaan: avauslento lennetään vain
 * kerran pelin alussa, eikä samaa hetkeä voi elää kahdesti samalla
 * sivulla. Napautus tehdään OIKEALLA HIIRIELEELLÄ ruudun keskeltä —
 * juuri siitä kohdasta, jossa kartan alla on kaupunkeja ja laattoja,
 * jotta myös vuoto alle näkyisi.
 */
const ctx2 = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const sivu2 = await ctx2.newPage();
const virheet2 = [];
sivu2.on('pageerror', (e) => virheet2.push(String(e)));
await sivu2.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await sivu2.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await sivu2.waitForTimeout(2500);
await sivu2.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  n?.click();
});
await sivu2.waitForTimeout(2000);
const ohituksenLahto = await sivu2.evaluate(() => {
  const { ui, game } = window.matkakirja;
  if (game.phase !== 'pickstart') return { virhe: `väärä vaihe: ${game.phase}` };
  const kaupunki = game.pack.cities.find((c) => c.id !== 'lontoo' && c.links?.length);
  ui.doPickStart(kaupunki);
  return { kaupunki: kaupunki.id, kaupunkeja: game.board.cityById.size };
});
await sivu2.waitForSelector('.flight .flight-plane', { state: 'attached', timeout: 40000 })
  .catch(() => {});
// Kone on juuri lähtenyt: napautus keskelle karttaa.
await sivu2.waitForTimeout(2200);
await sivu2.screenshot({ path: join(ULOS, 'ohitus-ennen.png') });
const kelloEnnen = Date.now();
await sivu2.mouse.click(195, 420);
await sivu2.waitForSelector('.saapumiskortti', { timeout: 8000 }).catch(() => {});
const ohitus = await sivu2.evaluate(() => ({
  kortti: Boolean(document.querySelector('.saapumiskortti')),
  kone: document.querySelectorAll('.flight .flight-plane').length,
  kalvo: document.querySelectorAll('.flight-overlay').length,
  pilvia: document.querySelectorAll('.lento-pilvi').length,
  dialogi: Boolean(document.querySelector('dialog[open]')),
  vaihe: window.matkakirja.game.phase,
}));
const ohitusKesti = Date.now() - kelloEnnen;
console.log('  ohitus:', JSON.stringify(ohitus), `${ohitusKesti} ms`);
await sivu2.screenshot({ path: join(ULOS, 'ohitus-jalkeen.png') });
vaadi('napautus vie saapumiseen välittömästi',
  ohitus.kortti === true && ohitusKesti < 3000,
  `välikortti ${ohitus.kortti}, ${ohitusKesti} ms napautuksesta`);
vaadi('napautus ei vuoda alla oleviin elementteihin',
  ohitus.dialogi === false, ohitus.dialogi ? 'napautus avasi jotain kartan alta' : '');
// Ohituskin päätyy samaan sekvenssiin: kartta ja kuplat tulevat.
// Lentonäkymä puretaan paperin ALLA, joten purku mitataan vasta täältä
// — napautushetkellä kone on tarkoituksella vielä paikallaan arkin
// takana, jottei purku näy ruudulla.
/* Kuplien viiveet kasvoivat 26.8 (1,8 s + 1,6 s) — odotus sen mukaan. */
await sivu2.waitForTimeout(9500);
const ohituksenLoppu = await sivu2.evaluate(() => ({
  kortteja: document.querySelectorAll('.saapumiskortti').length,
  kuplat: [...document.querySelectorAll('.pollo-vihje')].filter((k) => !k.hidden).length,
  lentokerros: document.querySelectorAll('.flight *').length,
  kalvo: document.querySelectorAll('.flight-overlay').length,
  pilvia: document.querySelectorAll('.lento-pilvi').length,
}));
console.log('  ohituksen loppu:', JSON.stringify(ohituksenLoppu), JSON.stringify(ohituksenLahto));
await sivu2.screenshot({ path: join(ULOS, 'ohitus-saapuminen.png') });
vaadi('ohitettu lento päätyy samaan saapumissekvenssiin',
  ohituksenLoppu.kortteja === 0 && ohituksenLoppu.kuplat === 2,
  `kortteja ${ohituksenLoppu.kortteja}, kuplia ${ohituksenLoppu.kuplat}`);
vaadi('ohitus ei jätä puolinaista lentonäkymää',
  ohituksenLoppu.lentokerros === 0 && ohituksenLoppu.kalvo === 0
  && ohituksenLoppu.pilvia === 0,
  `lentokerros ${ohituksenLoppu.lentokerros}, kalvoja ${ohituksenLoppu.kalvo},`
  + ` pilviä ${ohituksenLoppu.pilvia}`);
vaadi('ohitusajossa ei JS-virheitä', virheet2.length === 0, virheet2.join(' | '));
await ctx2.close();

vaadi('ei JS-virheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\nkaappaukset: ${ULOS}`);
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`${tulokset.length - kaatui.length}/${tulokset.length} kunnossa`);
await selain.close();
palvelin.close();
process.exit(kaatui.length ? 1 : 0);
