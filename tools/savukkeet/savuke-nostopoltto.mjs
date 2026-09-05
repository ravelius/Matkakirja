/*
 * Savuke: POLTETTU LADONTA JA ELÄVÄ OSUMAMUOTO OVAT SAMASTA PISTEESTÄ.
 *
 * Raamattu (omistaja 31.8.2026, KARTTANOSTOT POLTETAAN LAATTOIHIN):
 * *"Poltetun ladonnan ja selaimen osumamuotojen on tultava SAMASTA
 * lähteestä, ettei kahta ladontaa pääse eriytymään."* Tämä savuke on
 * se mitta, joka kertoo, pitääkö väite paikkansa — ja se on tarpeen
 * juuri siksi, että väitettä ei voi todistaa lukemalla: ladonta on
 * kolmen passin ketju, ja ero syntyisi pyöristyksestä tai yhdestä
 * ruudusta luetusta luvusta.
 *
 * KOE: sama maa ladotaan kahdesti — kerran Nodessa ilman DOMia
 * (js/nostoladonta.js, se laskenta jonka laattageneraattori polttaa) ja
 * kerran oikeassa pelissä oikeassa selaimessa. Merkkien LAUDAN
 * KOORDINAATIT luetaan pelin DOMista (ankkuriryhmän `transform`) ja
 * verrataan Nodeen merkki merkiltä.
 *
 * VARTIOT:
 *   1. SAMAT MERKIT. Kummallakin puolella sama joukko tunnuksia.
 *   2. SAMA PAIKKA. Suurin ero laudan yksiköissä on nolla (tai
 *      pyöristyksen verran): poltettu merkki ja sen näkymätön
 *      osumamuoto osuvat samaan pisteeseen.
 *   3. SAMA NIMIÖ JA SEN PUOLI. Väistön päätös on sama molemmilla.
 *   4. SAMA TIIVISTE. Pelin laskema tiiviste täsmää luettelon kanssa,
 *      eli peli osaa vaieta juuri niistä merkeistä, jotka on poltettu.
 *   5. LUETTELO EI TUNNE ELÄVIÄ. Estetyn maan merkki ei ole
 *      luettelossa, joten peli piirtää sen elävänä.
 *
 * MITTAUS TEHDÄÄN KAHDELLA RUUDULLA (iPad ja iPhone): jos ladonta
 * riippuisi vielä jostakin ruudun mitasta, ero näkyisi juuri niiden
 * välillä.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { keraaNostot, nostojenYhteenveto } from '../fokuskartta/nostot.mjs';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ---------------------------------------------- Node: poltettava erä */

const poltto = keraaNostot(MAAILMANKARTTA);
console.log(nostojenYhteenveto(poltto.tilasto));
/*
 * KAKSI PERHETTÄ, KAKSI VERTAILUA (2.9.2026). Nostot ovat kohdekerroksen
 * ladontaa (ui.fokuskohdeRyhmat) ja eläintäyt oma kerroksensa
 * (ui.elaintakyRyhmat, js/elaintaky.js) — molemmat poltetaan, mutta
 * niitä ei voi verrata samaan DOM-listaan. Ilman jakoa maan
 * merkkijoukko olisi eri kummallakin puolella eikä vartio 1 kertoisi
 * enää mitään ladonnasta.
 */
const nodeMaittain = new Map();
for (const merkki of poltto.merkit.filter((m) => m.perhe !== 'elaintaky')) {
  if (!nodeMaittain.has(merkki.iso)) nodeMaittain.set(merkki.iso, new Map());
  nodeMaittain.get(merkki.iso).set(merkki.tunnus, merkki);
}
const nodeElaimet = new Map(
  poltto.merkit.filter((m) => m.perhe === 'elaintaky').map((m) => [m.iso, m]),
);

/* ------------------------------------------------------ selainpuoli */

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Peli auki annetussa kaupungissa annetulla ruudulla; palauttaa
 * merkkien LAUDAN koordinaatit ja nimiöpäätökset.
 */
async function pelinMerkit(kaupunki, ruutu) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());
  const ctx = await selain.newContext({ viewport: ruutu, reducedMotion: 'reduce' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(2500);
  /*
   * PAIKKA LUETAAN DOMista, EI ui-oliosta. Juuri se on se piste, johon
   * näkymätön osumamuoto piirtyy — jos tietue ja solmu eroaisivat,
   * mittaus jäisi huomaamatta.
   *
   * KOE TEHDÄÄN LEHTINÄKYMÄSSÄ, JA SE ON EHTO (2.9.2026). Ruutukatto
   * kutistaa syvässä zoomissa koko noston piirroksen ankkurinsa ympäri
   * (js/nostoladonta.js nostoladontaKattoSuhde), jolloin DOMin muunnos
   * EI enää ole ladottu paikka vaan piirretty. Lehtinäkymässä katto ei
   * pure (mittakaava ~1,9 < kynnys ~2,5), joten muunnos on ladonta
   * sellaisenaan — juuri se, mitä tämä koe vertaa Nodeen. Jos koe
   * joskus siirretään syvempään zoomiin, paikka on luettava tietueesta
   * (r.nippu) eikä solmusta.
   */
  const tulos = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const rivit = [];
    const nahty = new Set();
    for (const r of ui.fokuskohdeRyhmat ?? []) {
      if (nahty.has(r.id)) continue;
      nahty.add(r.id);
      const m = /translate\(([-\d.]+) ([-\d.]+)\) scale\(([\d.]+)\)/
        .exec(r.g?.getAttribute('transform') ?? '');
      rivit.push({
        id: r.id,
        x: m ? Number(m[1]) : null,
        y: m ? Number(m[2]) : null,
        skaala: m ? Number(m[3]) : null,
        nimi: r.nimi ?? '',
        nimioNakyy: Boolean(r.nimi) && r.nimioNakyy !== false,
        nimioPuoli: r.nimioPuoli ?? 'oikea',
        osat: (ui.fokuskohdeTiedot?.get(r.id)?.osat ?? []).map((o) => o.id),
        symboli: r.symboli ?? null,
        laji: r.laji ?? null,
      });
    }
    /*
     * ELÄINTÄYT OMASTA KERROKSESTAAN. Kiertävä lauta piirtää saman
     * eläimen kahteen kohtaan, joten sama maatunnus voi esiintyä
     * kahdesti — vertailu tehdään laudan ympäryksen modulossa.
     */
    const elaimet = [];
    for (const r of ui.elaintakyRyhmat ?? []) {
      const merkki = r.g?.querySelector?.('.elaintaky-merkki');
      const kuva = r.g?.querySelector?.('.nostosym-rasteri');
      const m = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(r.g?.getAttribute('transform') ?? '');
      elaimet.push({
        iso: merkki?.dataset?.elaintaky ?? null,
        x: m ? Number(m[1]) : null,
        y: m ? Number(m[2]) : null,
        nimio: kuva?.dataset?.nimio ?? null,
      });
    }
    return { rivit, elaimet, s: ui.fokusMerkkiSkaalaPohja() };
  });
  await sivu.close();
  await ctx.close();
  return tulos;
}

const RUUDUT = {
  iPad: { width: 834, height: 1112 },
  iPhone: { width: 390, height: 844 },
};

/*
 * KREIKKA ON KOE, koska se on ainoa kuratoitu lehti ja sen Ateena on
 * kartan tihein rypäs: kymmenen nostoa laatan päällä, jotka ladotaan
 * kaupungin molemmin puolin (js/fokusniput.js). Kroatia on
 * vertailukohta: kolme merkkiä väljässä.
 */
const KOKEET = [
  { nimi: 'Ateena', kaupunki: 'ateena', iso: 'GRC', poltettava: true },
  { nimi: 'Dubrovnik', kaupunki: 'dubrovnik', iso: 'HRV', poltettava: true },
  /*
   * MADRID ON ESTETYSSÄ MAASSA (tools/fokuskartta/nostot.mjs: Espanjan
   * täkypooli vaihtuu kaupungeittain — Sevillalla on oma lista — joten
   * kartalla oleva täkyjoukko riippuu siitä, missä pelaaja seisoo).
   * Sen merkkijoukko EROAA Nodesta tarkoituksella, ja koe vaatii vain,
   * ettei yksikään Espanjan merkki ole luettelossa.
   *
   * ESIMERKKIMAA VAIHTUI 31.8.2026: Italia oli tässä siihen asti, kun
   * `kissat`-täky sai omat koordinaattinsa (v1391) ja maa vapautui
   * poltettavaksi — väite jäi punaiseksi, koska se väitti Italian
   * olevan yhä estetty. Kaksi maata on yhä estettynä (ESP, GBR).
   */
  { nimi: 'Madrid', kaupunki: 'madrid', iso: 'ESP', poltettava: false },
];

const raportti = [];
for (const koe of KOKEET) {
  const node = nodeMaittain.get(koe.iso) ?? new Map();
  const mitat = {};
  for (const [ruudunNimi, ruutu] of Object.entries(RUUDUT)) {
    // eslint-disable-next-line no-await-in-loop
    const peli = await pelinMerkit(koe.kaupunki, ruutu);
    const pelinTunnukset = new Set(peli.rivit.map((r) => r.id));
    const nodeTunnukset = new Set(node.keys());
    const puuttuu = [...nodeTunnukset].filter((t) => !pelinTunnukset.has(t));
    const yli = [...pelinTunnukset].filter((t) => !nodeTunnukset.has(t));
    let pahin = 0;
    let pahinTunnus = null;
    let tekstiEroja = 0;
    for (const rivi of peli.rivit) {
      const m = node.get(rivi.id);
      if (!m) continue;
      const ero = Math.hypot(rivi.x - m.x, rivi.y - m.y);
      if (ero > pahin) { pahin = ero; pahinTunnus = rivi.id; }
      if (rivi.nimi !== m.nimio) tekstiEroja += 1;
    }
    mitat[ruudunNimi] = {
      merkkeja: peli.rivit.length,
      s: peli.s,
      puuttuu,
      yli,
      pahin,
      pahinTunnus,
      tekstiEroja,
    };
    if (!koe.poltettava) continue;
    vaadi(`${koe.nimi} ${ruudunNimi}: sama merkkijoukko kuin Nodessa`,
      puuttuu.length === 0 && yli.length === 0,
      `Nodessa vain: ${puuttuu.join(',')} · pelissä vain: ${yli.join(',')}`);
    /*
     * RAJA ON PIIRTOTARKKUUS. Peli kirjoittaa muunnoksen kahdella
     * desimaalilla (`toFixed(2)`), joten sadasosa on se, mitä DOMista
     * voi enintään lukea — ei ladonnan ero.
     */
    vaadi(`${koe.nimi} ${ruudunNimi}: sama paikka (< 0,01 lautayksikköä)`,
      pahin < 0.01, `pahin ero ${pahin.toFixed(4)} (${pahinTunnus})`);
    /*
     * NIMIÖTEKSTI on tiivisteen syötettä ja siksi vartioitava; nimiön
     * NÄKYMINEN ja PUOLI eivät ole (ks. js/nostoladonta.js
     * nostoladontaTiiviste): pyramidilaudalla peli luovuttaa elävät
     * nimet nimikerrokselle (js/karttanimet.js), joka päättää ne
     * ruutuavaruudessa, kun taas poltettu nimiö on kartan mitassa.
     */
    vaadi(`${koe.nimi} ${ruudunNimi}: sama nimiöteksti`,
      tekstiEroja === 0, `${tekstiEroja} merkillä eri nimiöteksti`);
    /*
     * ELÄINTÄKY ON POLTETTAVA MERKKI SIINÄ MISSÄ NOSTO (omistaja
     * 2.9.2026: *"Esim. Kreikassa Merikilpikonna on vielä
     * polttamatta"*), ja sen paikka ja nimiö on saatava samasta
     * lähteestä kuin elävän. Vertailu tehdään laudan ympäryksen
     * modulossa, koska kiertävä lauta piirtää saman eläimen kahdesti.
     */
    const nodeElain = nodeElaimet.get(koe.iso);
    const elavaElain = (peli.elaimet ?? []).find((e) => e.iso === koe.iso);
    vaadi(`${koe.nimi} ${ruudunNimi}: eläintäky sekä laatassa että kartalla`,
      Boolean(nodeElain) === Boolean(elavaElain),
      `Node ${nodeElain ? 'kyllä' : 'ei'} · peli ${elavaElain ? 'kyllä' : 'ei'}`);
    if (nodeElain && elavaElain) {
      const dx = Math.abs(((elavaElain.x - nodeElain.x) % 12000 + 12000) % 12000);
      const elainEro = Math.hypot(Math.min(dx, 12000 - dx), elavaElain.y - nodeElain.y);
      vaadi(`${koe.nimi} ${ruudunNimi}: eläintäky samassa pisteessä`,
        elainEro < 0.01, `ero ${elainEro.toFixed(4)}`);
      vaadi(`${koe.nimi} ${ruudunNimi}: eläintäyn nimiö on sama`,
        elavaElain.nimio === nodeElain.nimio,
        `peli "${elavaElain.nimio}" · Node "${nodeElain.nimio}"`);
    }
  }
  vaadi(`${koe.nimi}: iPad ja iPhone antavat saman skaalan`,
    mitat.iPad.s === mitat.iPhone.s,
    `${mitat.iPad.s} vs ${mitat.iPhone.s}`);
  raportti.push({ koe: koe.nimi, iso: koe.iso, mitat });
}

/* -------------------------------------------- luettelo ja tiivisteet */

const gr = nodeMaittain.get('GRC') ?? new Map();
/*
 * LUETTELO JA PIIRRETTÄVÄT OVAT SAMA JOUKKO. Jos merkki piirtyisi
 * laattaan mutta jäisi luettelosta pois, peli piirtäisi sen elävänä sen
 * päälle — ja toisin päin peli vaikenisi merkistä, jota laatassa ei ole.
 */
vaadi('luettelo ja poltettavat merkit ovat sama joukko',
  poltto.merkit.every((m) => (poltto.luettelo[m.tunnus] === m.tiiviste) === m.poltettava)
    && Object.keys(poltto.luettelo).length === poltto.merkit.filter((m) => m.poltettava).length,
  `luettelossa ${Object.keys(poltto.luettelo).length}, `
  + `poltettavia ${poltto.merkit.filter((m) => m.poltettava).length}`);
vaadi('Kreikan poltettavat merkit ovat luettelossa tiivisteineen',
  [...gr.values()].filter((m) => m.poltettava).length > 20
    && [...gr.values()].filter((m) => m.poltettava)
      .every((m) => poltto.luettelo[m.tunnus] === m.tiiviste),
  'tiiviste puuttuu tai eroaa');
/*
 * MONEN MAAN MERKKI JÄÄ ELÄVÄKSI (maastokohteet: sama joki tai meri on
 * usean maan listalla ja latoutuu joka maassa eri mittatikulla).
 */
vaadi('Kreikan ja Kyproksen yhteinen olympos ei ole luettelossa',
  poltto.luettelo.olympos === undefined,
  'monen maan merkki päätyi luetteloon');

const esp = nodeMaittain.get('ESP') ?? new Map();
vaadi('estetyn maan (Espanja) merkit EIVÄT ole luettelossa',
  esp.size > 0 && [...esp.values()].every((m) => !m.poltettava
    && poltto.luettelo[m.tunnus] === undefined),
  `${[...esp.values()].filter((m) => poltto.luettelo[m.tunnus]).length} merkkiä luettelossa`);

/*
 * TIIVISTE HUOMAA MUUTOKSEN. Muutetaan yhtä kenttää kerrallaan ja
 * vaaditaan, että tiiviste eroaa — muuten vanhentunut poltto jäisi
 * kartalle.
 */
const { nostoladontaTiiviste } = await import('../../js/nostoladonta.js');
/*
 * Mallimerkki on ryppään ensimmäinen. Tässä haettiin 31.8.2026 asti
 * yhdistettyä merkkiä (`osat.length > 1`), koska sellaisella oli
 * jäsenlista; yhdistely purettiin, joten `osat` on aina tyhjä ja
 * jäsenkoe tehdään lisäämällä siihen yksi tunnus.
 */
const malli = [...gr.values()][0];
const perus = nostoladontaTiiviste(malli);
const muunna = (muutos) => nostoladontaTiiviste({ ...malli, ...muutos });
vaadi('tiiviste muuttuu, kun nimiö muuttuu', muunna({ nimio: `${malli.nimio}!` }) !== perus);
vaadi('tiiviste muuttuu, kun symboli muuttuu', muunna({ symboli: 'muu' }) !== perus);
vaadi('tiiviste muuttuu, kun jäsenet muuttuvat',
  muunna({ osat: [...malli.osat, 'uusi'] }) !== perus);
vaadi('tiiviste muuttuu, kun merkki siirtyy', muunna({ x: malli.x + 0.01 }) !== perus);
/*
 * VÄISTÖN PÄÄTÖS EI OLE TIIVISTEESSÄ (js/nostoladonta.js): se on
 * funktio merkkijoukosta, paikoista ja nimiöteksteistä, jotka kaikki
 * ovat. Tämä koe pitää sen tarkoituksena eikä unohduksena.
 */
vaadi('tiiviste EI muutu väistön päätöksestä',
  muunna({ nimioNakyy: !malli.nimioNakyy, nimioPuoli: 'ala' }) === perus);
vaadi('tiiviste ei muutu ilman muutosta', muunna({}) === perus);

console.log('');
for (const r of raportti) {
  for (const [ruutu, m] of Object.entries(r.mitat)) {
    console.log(`  ${r.koe} ${ruutu}: ${m.merkkeja} merkkiä · s ${m.s.toFixed(6)} `
      + `· pahin paikkaero ${m.pahin.toFixed(4)} lautayksikköä · nimiöeroja ${m.tekstiEroja}`);
  }
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
