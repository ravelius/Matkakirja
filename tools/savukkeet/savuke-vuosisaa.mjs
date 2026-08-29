/*
 * Savuke: elävöitetty vuosisäägraafi.
 *  1. Kortti aukeaa säärivistä ja vihjeessä lukee "vuosiennuste".
 *  2. Graafissa on pehmeä käyräpolku, alue, palkit, ääripäiden lukemat
 *     ja kuluvan kuukauden korostus.
 *  3. Vaihteluvyöhyke (omistajan toive 18.8.2026) on käyrän takana ja
 *     asteikko venyy sen mukaan.
 *  4. Kuvakaappaukset silmätarkistukseen useasta ilmastosta.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 834, height: 1194 } });
const sivu = await ctx.newPage();
/*
 * Pöllöpalvelin katkaistaan: saapuminen esihakee lukijaäänen
 * ensimmäisen palan (js/ui.js esilataaLehdet), eikä savuke saa
 * kuluttaa generointikiintiötä. Katkaisu näyttää pelille tavalliselta
 * verkkovirheeltä, jonka puskuri nielee hiljaa.
 */
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (v) => virheet.push(String(v)));
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

/*
 * Yhden kaupungin kortti auki ja mitat talteen. Sama funktio ajetaan
 * usealle kaupungille: Lontoo on varsinainen koekappale, muut ovat
 * ääri-ilmastoja, joissa kaista venyttää asteikkoa eniten.
 */
async function avaaKortti(id) {
  return sivu.evaluate(async (kaupunki) => {
    const ui = window.matkakirja.ui;
    ui.suljeKulttuuriKuva();
    const kohde = ui.game.board.cityById.get(kaupunki);
    if (!kohde) return null;
    /*
     * LEHTILUKKO AUKI ENNEN AVAUSTA (v1323-linjaus, 29.8.2026 —
     * "Fokusvirran kortit pelaajan polkuun", FOKUSVIRTA_KORTIT = true).
     * Fokusvirtakaupungissa (Lontoo on aallon 2 sellainen) lehtilukko
     * (js/fokusvirta.js fokusvirtaOhittaaLehden) ottaa lehden paikan
     * niin kauan kuin laatta on kääntämättä, jolloin openArrival palaa
     * heti eikä #arrival-dialogia avata lainkaan — säärivi jää
     * syntymättä ja koko savuke mittasi mainissa tyhjää. Laatta
     * poistetaan siis ennen avausta: se on täsmälleen se tila, jossa
     * pelaaja lehden oikeasti avaa. Mitattava asia on vuosisääkortti,
     * ei se kumpi pinta saapumisen omistaa.
     */
    ui.game.tokens?.delete(kohde.id);
    ui.openArrival(kohde);
    await new Promise((r) => setTimeout(r, 500));
    const lehtiAuki = Boolean(document.getElementById('arrival-dialog')?.open);
    const rivi = document.querySelector('.lehti-saa');
    const vihje = rivi?.querySelector('.saa-vihje')?.textContent ?? '';
    /*
     * Odotus kattaa kaikki kortin animaatiot varmuusvaralla: käyrän
     * piirto on 150 + 1100 ms ja ääripäiden lukemat 1100 + 400 ms.
     * Aiempi 1600 ms jätti niin ohuen marginaalin, että kuormitettu
     * kone ehti jäädä kesken piirron.
     */
    ui.naytaVuosiSaa();
    await new Promise((r) => setTimeout(r, 2400));
    const svg = document.querySelector('.vuosisaa');
    const luku = (s) => [...(svg?.querySelectorAll(s) ?? [])].map((e) => e.textContent);
    /*
     * Kaistan pitää OIKEASTI ympäröidä käyrä eikä vain olla olemassa.
     * Mitta otetaan poluista itsestään: kaistan rajauslaatikon on
     * katettava käyrän rajauslaatikko pystysuunnassa. Tämä paljastaa
     * sekä väärin päin lasketun kaistan että asteikon, joka ei venynyt
     * kaistan mukana.
     */
    const kaistaEl = svg?.querySelector('path.saa-kaista');
    const viivaEl = svg?.querySelector('path.saa-viiva');
    const kaistaBox = kaistaEl?.getBBox?.();
    const viivaBox = viivaEl?.getBBox?.();
    return {
      lehtiAuki,
      vihje,
      kortti: Boolean(document.querySelector('.vuosisaa-kortti')),
      kayra: Boolean(viivaEl),
      alue: Boolean(svg?.querySelector('path.saa-alue')),
      palkkeja: svg?.querySelectorAll('.saa-palkki').length ?? 0,
      arvoja: svg?.querySelectorAll('.saa-arvo').length ?? 0,
      kaista: Boolean(svg?.querySelector('.saa-kuluva-kaista')),
      kuluva: Boolean(svg?.querySelector('.saa-kuluva')),
      liuku: Boolean(svg?.querySelector('#vuosisaa-liuku')),
      vyohyke: Boolean(kaistaEl),
      // Sietovara on pehmeän käyrän ylityksille: Catmull–Rom kaartaa
      // jyrkän ääripään ohi hiukan, eikä pikselin heitto ole vika.
      vyohykeYmparoi: Boolean(kaistaBox && viivaBox
        && kaistaBox.y <= viivaBox.y + 1.5
        && kaistaBox.y + kaistaBox.height >= viivaBox.y + viivaBox.height - 1.5),
      vyohykeOpacity: kaistaEl ? getComputedStyle(kaistaEl).opacity : '',
      asteikko: luku('.saa-akseli').filter((t) => t.endsWith('°')),
      selite: document.querySelector('.vuosisaa-kortti .kuvalahde')?.textContent ?? '',
      aria: svg?.getAttribute('aria-label') ?? '',
      viivaOffset: viivaEl ? getComputedStyle(viivaEl).strokeDashoffset : '',
    };
  }, id);
}

const tulos = await avaaKortti('lontoo');
// Vartio vartioille: ilman auki olevaa lehteä säärivi ei ole olemassa
// eikä yksikään alla oleva väite mittaa mitään.
vaadi('lehti on auki mittaushetkellä (lehtilukko ei ohita)', tulos?.lehtiAuki === true);
vaadi('säärivin vihjeessä lukee vuosiennuste', /vuosiennuste/i.test(tulos.vihje), tulos.vihje);
vaadi('vuosisääkortti aukeaa', tulos.kortti);
vaadi('käyrä on pehmeä polku ja sen alla on liukuvärialue',
  tulos.kayra && tulos.alue && tulos.liuku, JSON.stringify(tulos));
vaadi('sadepalkkeja on 12', tulos.palkkeja === 12, String(tulos.palkkeja));
vaadi('ääripäiden lukemia on 2–3', tulos.arvoja >= 2 && tulos.arvoja <= 3, String(tulos.arvoja));
vaadi('kuluva kuukausi korostuu kaistalla ja kirjaimella',
  tulos.kaista && tulos.kuluva, JSON.stringify(tulos));
vaadi('käyrän piirto on valmis (dashoffset 0)',
  parseFloat(tulos.viivaOffset) === 0, tulos.viivaOffset);
vaadi('vaihteluvyöhyke on piirretty', tulos.vyohyke);
vaadi('vyöhyke ympäröi keskilämpökäyrän', tulos.vyohykeYmparoi, JSON.stringify(tulos));
vaadi('vyöhykkeen häivytys on valmis', parseFloat(tulos.vyohykeOpacity) === 1, tulos.vyohykeOpacity);
vaadi('lähderivi kertoo kaistasta', /kaista tyypillinen vaihteluväli/.test(tulos.selite), tulos.selite);
vaadi('aria-label kertoo vaihteluvälistä', /vaihteluväli/.test(tulos.aria), tulos.aria);
vaadi('lämpöasteikossa on nollaviiva', tulos.asteikko.includes('0°'), tulos.asteikko.join(' '));
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await sivu.locator('.vuosisaa-kortti').screenshot({ path: `${ULOS}/vuosisaa.png` });

/*
 * Silmätarkistuksen kaappaukset aloituslaudan kaupungeista: Kairon
 * aavikkovuorokausi repii kaistan leveäksi, Moskovan talvi vie sen
 * pakkasen puolelle ja Tokio jää siltä väliltä. Kaupunki, jota tämän
 * pelin laudalla ei ole, ohitetaan hiljaa — savuke ei saa kaatua
 * laudan kokoonpanoon.
 */
for (const id of ['kairo', 'moskova', 'tokio', 'ateena']) {
  const otos = await avaaKortti(id);
  // Kaupunki puuttuu laudalta = hiljainen ohitus. Kaupunki on laudalla
  // mutta lehti ei auennut = savukkeen oma vika, ja se sanotaan ääneen.
  if (otos && !otos.lehtiAuki) { vaadi(`lehti aukeaa myös kaupungissa ${id}`, false); continue; }
  if (!otos?.kortti) { console.log(`ohi   ${id} — ei tällä laudalla`); continue; }
  await sivu.locator('.vuosisaa-kortti').screenshot({ path: `${ULOS}/vuosisaa-${id}.png` });
  console.log(`kuva  ${id}: asteikko ${otos.asteikko.join(' ')}`
    + `${otos.vyohyke ? '' : '  (EI KAISTAA)'}`);
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
