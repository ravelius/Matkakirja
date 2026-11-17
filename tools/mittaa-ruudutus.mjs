/*
 * Mittaa kartan ruudutuksen: kauanko näkyvä alue on sumea zoomauksen
 * jälkeen, kauanko koko puskuri valmistuu ja kuinka pitkiä tukoksia
 * pääsäie saa vierityksen aikana.
 *
 *   node tools/mittaa-ruudutus.mjs europe vanhamaailma
 *
 * Tämä on olemassa siksi, ettei vierityksen tökkimistä korjattaisi
 * arvaamalla. tools/mittaa-kartta.mjs mittaa kartan raskauden
 * (elementit, panorointikehys); tämä mittaa sen työn, joka tehdään
 * rasteroinnissa — eli juuri sen, mistä omistajan havainto kertoo:
 * *"tökkii lähinnä kun joutuu lataamaan zoomauksen jälkeen uutta
 * karttamateriaalia scrollattaessa."*
 *
 * Kolme lukua per lauta:
 *
 *   nakyvaValmis  ms zoomauksesta siihen, kun näkyvä alue on
 *                 kokonaan katettu oikean mittakaavan ruuduilla.
 *                 Tämä on se aika, jonka pelaaja katsoo sumeaa.
 *   puskuriValmis ms zoomauksesta siihen, kun myös puskurirengas on
 *                 valmis eikä taidePiirtyy ole enää päällä.
 *   tukokset      pisin ja yhteenlaskettu pääsäikeen tukos (longtask)
 *                 vierityksen aikana heti zoomauksen jälkeen. Tämä on
 *                 se, minkä sormi tuntee nykäyksenä.
 *
 * Ruutujen peitto lasketaan samalla kaavalla kuin ui.js:n täydennys
 * (avain "sarake,rivi"), jotta luku kertoo kartan tilasta eikä
 * mittarin omasta tulkinnasta.
 */
import { avaaSelain } from './mittaa-selaimessa.mjs';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const laudat = process.argv.slice(2);
if (!laudat.length) laudat.push('europe', 'vanhamaailma');

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
};

const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'pelaa.html');
  if (!existsSync(polku) || !polku.startsWith(JUURI)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'text/plain' });
  res.end(readFileSync(polku));
});
await new Promise((valmis) => palvelin.listen(0, valmis));
const osoite = `http://127.0.0.1:${palvelin.address().port}`;

const { sivu, sulje } = await avaaSelain();
await sivu.setViewportSize({ width: 420, height: 860 });

for (const lauta of laudat) {
  // Katselutila (?lauta=) avaa kartan suoraan ja tarjoaa window.matkakirjan.
  await sivu.goto(`${osoite}/?lauta=${lauta}`, { waitUntil: 'load' });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.taideRuudut, null, { timeout: 15000 });
  // Ensimmäinen sarja rauhoittuu ennen mittausta.
  await sivu.waitForFunction(() => window.matkakirja.ui.taidePiirtyy === false, null, { timeout: 30000 })
    .catch(() => {});
  await sivu.waitForTimeout(500);

  const tulos = await sivu.evaluate(async () => {
    const ui = window.matkakirja.ui;
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));

    /*
     * Onko alue katettu nykyisen mittakaavan ruuduilla?
     *
     * puskuri = 0 kysyy pelkkää näkyvää aluetta, puskuri = 1 samaa
     * ruudullisella joka suuntaan — eli sitä, mitä ui.js lupaa
     * puskuroida. Jälkimmäinen on tärkeä: jos joutohetkinä täydentyvä
     * rengas jäisi kesken, vieritys paljastaisi tyhjää pergamenttia.
     */
    const katettu = (puskuri = 0) => {
      const nakyva = ui.nakyvaAlue();
      const koko = ui.taideRuutu;
      if (!nakyva || !koko) return false;
      const kiertava = ui.kiertava();
      const W = ui.game.pack.map.width;
      const sarakkeita = kiertava ? Math.max(1, Math.round(W / koko)) : 0;
      const x0 = nakyva.x - nakyva.w * puskuri;
      const y0 = nakyva.y - nakyva.h * puskuri;
      const x1 = nakyva.x + nakyva.w * (1 + puskuri);
      const y1 = nakyva.y + nakyva.h * (1 + puskuri);
      for (let ry = Math.floor(y0 / koko); ry <= Math.floor((y1 - 0.001) / koko); ry++) {
        for (let rx = Math.floor(x0 / koko); rx <= Math.floor((x1 - 0.001) / koko); rx++) {
          const sarake = kiertava ? ((rx % sarakkeita) + sarakkeita) % sarakkeita : rx;
          const avain = `${sarake},${ry}`;
          if (!ui.taideRuudut.has(avain) && !ui.taideTyhjat.has(avain)) return false;
        }
      }
      return true;
    };
    const nakyvaKatettu = () => katettu(0);

    /*
     * Zoomataan sisään OIKEASTI: yleiskuvassa ruutuja on neljä ja koko
     * puskuri valmistuu hetkessä, joten se ei kerro mitään omistajan
     * havainnosta. Lähikuvassa ruudukko on tiheä ja puskurirengas iso —
     * juuri se tilanne, jossa vierityksen aikana joudutaan lataamaan.
     */
    const vb = ui.svg.viewBox.baseVal;
    const kx = vb.x + vb.width / 2;
    const ky = vb.y + vb.height / 2;
    vb.width /= 6;
    vb.height /= 6;
    vb.x = kx - vb.width / 2;
    vb.y = ky - vb.height / 2;
    await new Promise((r) => requestAnimationFrame(r));

    // Mittakaava vaihtui, joten koko ruutusarja on uusi.
    const alku = performance.now();
    ui.taideSkaala = 0;
    ui.taideRuudut = new Map();
    ui.taideTyhjat = new Set();
    ui.taydennaTaide({ heti: true });

    /*
     * Vieritetään SAMAAN AIKAAN kuin ruudut piirtyvät.
     *
     * Tämä on omistajan tilanne sanasta sanaan: *"tökkii lähinnä kun
     * joutuu lataamaan zoomauksen jälkeen uutta karttamateriaalia
     * scrollattaessa."* Jos vieritys mitataan vasta sarjan valmistuttua,
     * mittari näyttää siistiä 17 ms:ää eikä kerro mistään.
     *
     * SORMI MERKITÄÄN ALAS (kartanRaahaus). Ilman sitä mittari valehtelee
     * kahteen suuntaan: pelissä eleen aikana ei rasteroida lainkaan, ja
     * ilman lippua mittari näyttäisi työtä, jota ei ole — ja samalla
     * peittäisi sen, kuinka hyvin ele väistyy.
     *
     * Kolme vetoa peräkkäin lyhyin tauoin: ensimmäinen osuu kesken
     * zoomauksen jälkeistä sarjaa, seuraavat sen jälkeen. Kehysväli
     * mitataan VAIN sormi alhaalla — se on se, mitä sormi tuntee.
     */
    let nakyvaValmis = null;
    const kehykset = [];
    // Sormi lähtee liikkeelle kesken sarjan, kuten pelissä.
    const alkuun = performance.now() + 150;
    while (performance.now() < alkuun) {
      if (nakyvaValmis === null && nakyvaKatettu()) nakyvaValmis = performance.now() - alku;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => requestAnimationFrame(r));
    }

    /*
     * Kaksi lukua erikseen, koska ne kertovat eri asiasta:
     *
     *   aloitusNykaisy  ensimmäinen kehysväli sormen laskun jälkeen.
     *                   Sarja katkeaa vasta ruudun VÄLISSÄ, joten
     *                   kesken oleva ruutu ehtii viedä oman aikansa.
     *                   Tämä on se nykäisy, joka tuntuu vedon alussa.
     *   purskeKesto     kauanko sarja jyskyttää sormen nousun jälkeen.
     *                   Mitä lyhyempi, sitä epätodennäköisemmin
     *                   seuraava veto osuu keskelle sitä.
     */
    const aloitusNykaisyt = [];
    const purskeet = [];
    for (let veto = 0; veto < 4; veto++) {
      ui.kartanRaahaus = true;
      let edellinen = performance.now();
      for (let i = 0; i < 25; i++) {
        vb.x += vb.width / 50;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => requestAnimationFrame(r));
        const nyt = performance.now();
        const vali = nyt - edellinen;
        kehykset.push(vali);
        if (i === 0) aloitusNykaisyt.push(vali);
        edellinen = nyt;
        if (nakyvaValmis === null && nakyvaKatettu()) nakyvaValmis = performance.now() - alku;
      }
      // Sormi nousee: täydennys pääsee alkuun.
      ui.kartanRaahaus = false;
      const nousu = performance.now();
      ui.taydennaTaide({ heti: true });
      // Sormi palaa nopeasti alas, kuten peräkkäisissä vedoissa.
      await odota(150);
      let purske = performance.now() - nousu;
      while (ui.taidePiirtyy && performance.now() - nousu < 10000) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => requestAnimationFrame(r));
        purske = performance.now() - nousu;
      }
      purskeet.push(Math.round(purske));
    }

    // Kauanko koko puskuri kestää valmistua vetojen jälkeen?
    const puskuriAlku = performance.now();
    while (performance.now() - puskuriAlku < 20000) {
      if (!ui.taidePiirtyy && !ui.taideOdottaa && !ui.taideRengas) break;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 50));
    }
    const puskuriValmis = Math.round(performance.now() - puskuriAlku);

    kehykset.sort((a, b) => a - b);
    return {
      nakyvaValmis: nakyvaValmis === null ? null : Math.round(nakyvaValmis),
      puskuriValmis,
      ruutuja: ui.taideRuudut.size + ui.taideTyhjat.size,
      // Lupaus, jota ei saa rikkoa: puskuri on lopuksi kokonaan katettu.
      puskuriKatettu: katettu(1),
      kehysMediaani: Math.round(kehykset[Math.floor(kehykset.length / 2)]),
      kehysPahin: Math.round(kehykset[kehykset.length - 1]),
      nykaisyja: kehykset.filter((ms) => ms > 32).length,
      aloitusNykaisyt: aloitusNykaisyt.map((ms) => Math.round(ms)),
      purskeet,
    };
  });

  console.log(`\n=== ${lauta} ===`);
  console.log(tulos);
}

await sulje();
palvelin.close();
