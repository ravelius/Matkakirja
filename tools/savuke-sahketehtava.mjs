/*
 * SELAINSAVUKE: PÖLLÖN SÄHKETEHTÄVÄ (pilotit Tukholmassa ja Sofiassa).
 *
 *   node tools/savuke-sahketehtava.mjs
 *
 * Raamattu, PÖLLÖN SÄHKETEHTÄVÄ (omistaja 29.8.2026): kaupungissa voi
 * kohtaamisen SIJASTA olla sähketehtävä, jonka vastaus kaivetaan maan
 * omista peliaineistoista. Yksikkötestit (tests/fokusvirta.test.mjs)
 * näkevät datan ja palkkiokaavan, mutta EIVÄT sitä, piirtyykö lomake,
 * kertooko pöllö kumpi aukko on pielessä, lähteekö Livia lennolle ja
 * aukeaako aarre sen palattua. Juuri ne mitataan tässä.
 *
 * KAKSI KAUPUNKIA, SAMA VÄITEJOUKKO. Sofia on omistajan lisätilaus
 * (29.8.2026): hänen vakiotestipolkunsa on Ateena → Sofia, ja pilotti
 * haluttiin sinne, missä se tulee pelatuksi useimmin. Väitteet ajetaan
 * silmukassa molemmille, jotta kolmas pilotti on yhden taulukkorivin
 * työ eikä uusi savuke.
 *
 * VÄITTEET (kummallekin kaupungille erikseen):
 *   1. Kaupunkiin saavuttaessa vihreää pistettä EI ole ennen kuin
 *      lehden AARTEEN AVAUS -tehtävä on ratkaistu oikein.
 *   2. Oikea vastaus sytyttää pisteen, ja pisteen ruudunlukijalappu
 *      kertoo SÄHKEESTÄ eikä paikallisen tapaamisesta.
 *   3. Pisteen napautus avaa sähkekortin: pöllön sähke STOP-riveineen,
 *      Livian saate ja kahden aukon lomake (valintalista + numerokenttä).
 *   4. Valintalista on KOKO MAAN SISÄLTÖHAKEMISTO — kymmeniä rivejä
 *      aakkosjärjestyksessä, ei neljää kuratoitua vaihtoehtoa.
 *   5. VÄÄRÄ VUOSI: pöllö sähköttää takaisin ja nimeää nimenomaan
 *      VUOSILUVUN, aarre ei lukitu, ja palkkio pienenee 200 → 150.
 *   6. VÄÄRÄ KOHDE: paluusähke nimeää KOHTEEN.
 *   7. KAHDEN OHILYÖNNIN JÄLKEEN Livia vinkkaa tarkan lähteen.
 *   8. OIKEA VASTAUS: kortti vaihtuu kuittaukseksi, Livia lähtee
 *      lennolle, peli EI lukitu ja laatta on yhä kääntämättä.
 *   9. LIVIA PALAA: kupla ilmestyy, laatta kääntyy ja isoisän
 *      aarremerkintä aukeaa matkakirjakorttiin.
 *  10. Ei sivuvirheitä koko kulun aikana.
 *
 * VAPAA VASTAUS (vaihe 2, omistaja 29.8.2026: *"Tee 2, haluan nähdä
 * miten toimii"*) lisää neljä väitettä, ja ne ajetaan MOCK-WORKERIA
 * vasten: oikeaa Anthropicin rajapintaa vasten ei voi testata, koska
 * avain elää vain tuotannossa.
 *
 *  11. Lomakkeen rinnalla on vapaa tekstikenttä ja sille oma nappi.
 *  12. SOTKU: pöllö tulkitsee eikä hyväksy → tavallinen EI TÄSMÄÄ,
 *      lomake jää auki, aarre ei lukitu, palkkio pienenee kuten
 *      lomakkeellakin.
 *  13. AIKAKATKAISU: kun pöllö ei vastaa, kortti ohjaa lomakkeeseen
 *      EIKÄ laske ohilyöntiä — peli ei jää jumiin missään kohtaa.
 *  14. OIKEA VASTAUS OMIN SANOIN kelpaa: Tukholmassa aarre avataan
 *      vapaalla tekstillä (tulkinta mock-workerilta), Sofiassa
 *      lomakkeella kuten ennenkin, jotta kumpikin tie pysyy mitattuna.
 *
 * KIRJOITTUVAT RIVIT JA PULLA (omistaja 3.9.2026, v1496) lisäävät
 * kuusi väitettä:
 *
 *  15. SÄHKE KIRJOITTUU RIVI KERRALLAAN: 300 ms kortin avauksesta osa
 *      riveistä on yhä tyhjiä ja sähkeellä on luokka `kirjoittaa`.
 *  16. NAPAUTUS HYPPÄÄ LOPPUUN: kaikki rivit heti, luokka pois.
 *  17. LIVIAN SAATE ON KUPLASSA EIKÄ KORTILLA (omistajan tilaus).
 *  18. KORTILLA ON KAKSI PULLANAPPIA: 50 £ vinkki ja 25 £ suora linkki.
 *  19. OSTETTU PULLA JÄTTÄÄ KUITTAUKSEN napin tilalle ja veloittaa
 *      kassasta oikean summan.
 *  20. PUOLIKAS PULLA AVAA OIKEAN PINNAN: Sofiassa kartan kohdekortin,
 *      Tukholmassa kaupunkilehden sivun, jolta vastaus luetaan.
 *
 * SOFIALLA ON YKSI VÄITE LISÄÄ: Nadian kohtaaminen on yhä datassa,
 * vaikka sähke voittaa sen kortilla. Se on omistajan pilottiehto —
 * palautus on yksi rivi vain, jos data on tallessa.
 *
 * Lento on tarkoituksella hidas pelissä (SAHKE_LENTO_MS), joten savuke
 * lyhentää sen palvelimella samalla korvauskaavalla kuin
 * tools/savuke-fokusvirta.mjs kääntää liput: jos rivi ei enää täsmää,
 * ajo kaatuu eikä vaikene.
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
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

function korvaa(lahde, etsi, tilalle) {
  if (!lahde.includes(etsi)) throw new Error(`Riviä ei löydy lähteestä: ${etsi}`);
  return lahde.replace(etsi, tilalle);
}

/*
 * VAIN REITTI LUETAAN LIPUSTA, EI TEHTÄVÄ.
 *
 * Sähketehtävä itse on sama molemmilla virroilla: sama kortti, sama
 * lomake, sama lento ja sama aarremerkintä. Eroa on vain siinä, MITÄ
 * KAUTTA kortille tullaan. Kevyessä kulussa reitti on kartan vihreä
 * piste (js/fokuspiste.js), joka syttyy lehden AARTEEN AVAUS
 * -tehtävästä. Korttiannostelussa (omistajan päätös 29.8.2026, "Päälle
 * — koko kulku testiin") pistettä ei ole lainkaan: pelaaja tulee
 * sähkeelle oppitunnin jatkonapista.
 *
 * Savuke lukee EXPORT-RIVIN eikä pelkkää mainintaa — moduulien
 * historiakommentit puhuvat lipusta molemmilla arvoilla.
 */
const LIPPURIVI = readFileSync(join(JUURI, 'js/fokusvirta.js'), 'utf8')
  .match(/^export const FOKUSVIRTA_KORTIT = (\w+);$/m);
if (!LIPPURIVI) throw new Error('FOKUSVIRTA_KORTIT-lipun määritystä ei löydy');
const KORTIT = LIPPURIVI[1] === 'true';
console.log(`Reitti aarrevaiheeseen: ${KORTIT ? 'oppitunnin jatkonappi (kortit)' : 'kartan vihreä piste (kevyt kulku)'}`);

/*
 * MOCK-WORKER (vaihe 2). Peli osoitetaan tähän ajon alussa
 * (js/fokusvirta.js asetaSahkepalvelin), koska oikea worker vaatii
 * Anthropicin avaimen eikä sitä ole kehityskontissa.
 *
 * Mock jäljittelee VAIN vastausmuotoa ja karkeaa semantiikkaa: se ei
 * ole malli eikä yritä olla. Sillä on kolme tehtävää — kertoa
 * hyväksytystä vastauksesta, hylätä sotku ja HILJETÄ kokonaan, kun
 * pyynnössä on sana "hidas", jotta aikakatkaisupolun voi mitata.
 *
 * Oikeat vastaukset ovat mockissa samasta syystä kuin oikeassa
 * workerissa: ne eivät kuulu selaimeen.
 */
const MOCK_SAANNOT = {
  'tukholma-vasa': { kohde: /vasa|wasa|sotalaiva|laiva/i, vuosi: /\b1961\b/ },
  'sofia-varna': { kohde: /varna|nekropoli|vanhin kulta/i, vuosi: /\b1974\b/ },
};
let mockPyyntoja = 0;

function mockPollo(req, res) {
  let runko = '';
  req.on('data', (pala) => { runko += pala; });
  req.on('end', () => {
    mockPyyntoja += 1;
    let data = {};
    try { data = JSON.parse(runko); } catch { data = {}; }
    const saanto = MOCK_SAANNOT[data.id];
    const teksti = String(data.vastaus ?? '');
    const vastaa = (koodi, sisalto) => {
      res.writeHead(koodi, { 'content-type': 'application/json' });
      res.end(JSON.stringify(sisalto));
    };
    if (!saanto) { vastaa(400, { virhe: 'kysely', viesti: 'Tuntematon tehtävä.' }); return; }
    // "hidas" = pöllö ei vastaa ajoissa. Vastaus tulee vasta pelin
    // aikakatkaisun jälkeen, eikä sitä siis kuunnella enää. Viive on
    // reilusti savukkeen aikakatkaisua pidempi, koska Playwrightin
    // reitityskuuntelija hidastaa jokaista pyyntöä sekunneilla (ks.
    // SAHKE_TULKINTA_MS-korvaus alempana).
    const viive = /hidas/i.test(teksti) ? 12000 : 0;
    setTimeout(() => vastaa(200, {
      tulkittu: true,
      kohde: saanto.kohde.test(teksti),
      vuosi: saanto.vuosi.test(teksti),
    }), viive);
  });
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  if (suhteellinen === 'mock-pollo') { mockPollo(req, res); return; }
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  let sisalto = readFileSync(polku);
  if (suhteellinen === 'js/fokusvirta.js') {
    // Lento ja paluutauko lyhennetään, jotta savuke ei odota kymmentä
    // sekuntia kummankin kaupungin kohdalla. Pelin omat luvut jäävät
    // koskematta.
    let teksti = String(sisalto);
    teksti = korvaa(teksti, 'const SAHKE_LENTO_MS = 6500;', 'const SAHKE_LENTO_MS = 900;');
    teksti = korvaa(teksti, 'const SAHKE_PALUU_MS = 3200;', 'const SAHKE_PALUU_MS = 600;');
    /*
     * Aikakatkaisu lyhenee, muttei paljon: Playwrightin
     * reitityskuuntelija (sivu.route alempana) vie JOKAISELTA
     * pyynnöltä Node-kierroksen, ja ensimmäinen mock-pyyntö on
     * mitattu pariksi sekunniksi. Liian lyhyt katkaisu mittaisi
     * silloin testivälineistöä eikä peliä — kaikista vastauksista
     * tulisi aikakatkaisuja.
     */
    teksti = korvaa(teksti, 'const SAHKE_TULKINTA_MS = 10000;', 'const SAHKE_TULKINTA_MS = 4000;');
    sisalto = teksti;
  }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
await new Promise((r) => palvelin.listen(8741, r));

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
sivu.on('pageerror', (e) => {
  // Tulostetaan heti eikä vasta lopussa: sivuvirhe kaataa yleensä myös
  // seuraavan väitteen, ja ilman tätä riviä syy jää arvattavaksi.
  console.log(`PAGEERROR: ${String(e).slice(0, 300)}`);
  virheet.push(String(e));
});

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/*
 * KAUPUNKIKOHTAINEN AINEISTO. `aarreVastaus` on lehden sivun 2
 * AARTEEN AVAUS -tehtävän oikean vaihtoehdon teksti, `kohde` ja `vuosi`
 * sähkelomakkeen oikea pari, `vaaraKohde` jokin muu rivi saman maan
 * hakemistosta ja `vinkkiSana` se, minkä Livian on sanottava kahden
 * ohilyönnin jälkeen. `merkinta` on isoisän aarremerkinnän tunnussana.
 */
const KAUPUNGIT = [
  {
    id: 'tukholma',
    nimi: 'Tukholma',
    aarreVastaus: /83-vuotias/i,
    piste: /Skeppsbronin laituri/i,
    kohde: 'Laiva, joka upposi ja nousi',
    vuosi: 1961,
    vaaraKohde: 'Kanelipullalla on oma päivänsä',
    vinkkiSana: /ensimmäisellä sivulla/i,
    // Livian saate siirtyi kortilta kuplapinoon (3.9.2026).
    saateSana: /löytänyt paikan/i,
    // Puolikas pulla avaa kaupunkilehden sivun 1 (Vasa-juttu).
    linkkiPinta: { valitsin: '#arrival-dialog[open]', teksti: /upposi ja nousi/i },
    pullaNimi: 'kanelbulle',
    merkinta: /kalastaja|kronan/i,
    /*
     * TUKHOLMA AVAA AARTEEN OMIN SANOIN. Teksti on tarkoituksella
     * sellainen, jota PAIKALLINEN normalisointi ei tunnista (ei sanaa
     * Vasa), joten se lentää mock-workerin tulkittavaksi — juuri se
     * polku on tämän vaiheen uusi osa. Sofia avaa aarteen lomakkeella
     * kuten ennenkin, jotta vanha tie pysyy mitattuna.
     */
    vapaaOikein: 'se sotalaiva joka nostettiin merestä vuonna 1961',
  },
  {
    id: 'sofia',
    nimi: 'Sofia',
    aarreVastaus: /tulevasta vuodesta/i,
    piste: /Vasil Levskin muistomerkki/i,
    kohde: 'Varna',
    vuosi: 1974,
    vaaraKohde: 'Musala',
    // Vinkki on Fablen 3.9.2026 kirjoittama uusi teksti: sama kenttä
    // palvelee nyt kahden ohilyönnin vihjettä JA pullalla ostettua.
    vinkkiSana: /maailman vanhimmasta kullasta/i,
    saateSana: /kuopassa/i,
    // Puolikas pulla avaa Varnan kohdekortin kartalta.
    linkkiPinta: { valitsin: '.fokuskohde-popup', teksti: /Varna/i },
    pullaNimi: 'kozunak',
    merkinta: /konakin varjossa|lapion/i,
    // Omistajan pilottiehto: Nadian kohtaaminen jää dataan.
    kohtaaminenTallessa: 'Lähteenvartija Nadia',
  },
];

/* ==================== peli käyntiin ==================== */

await sivu.goto('http://127.0.0.1:8741/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const { game } = window.matkakirja;
  if (game.phase === 'pickstart') {
    game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  }
});

// Vapaan vastauksen välityspalvelin osoitetaan mockiin. Ilman tätä
// pyyntö lähtisi oikealle workerille, joka ei vastaa kehityskontista —
// ja koko vapaa polku mittaisi vain aikakatkaisua.
await sivu.evaluate(async () => {
  const fv = await import('/js/fokusvirta.js');
  fv.asetaSahkepalvelin('http://127.0.0.1:8741/mock-pollo');
});

for (const kaupunki of KAUPUNGIT) {
  console.log(`\n===== ${kaupunki.nimi}`);

  const alku = await sivu.evaluate(async (id) => {
    const { game, ui } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.phase = 'action';
    // Laatta kääntämättä = aarre on yhä edessä. Tyyppi on tarkoituksella
    // paikallisaarre eikä ryöstäjä: kaksintaistelu on oma polkunsa.
    game.world.tokens.set(id, 'pieniAarre');
    const c = game.cityOf();
    ui.lehtitila.tutkiSyke = ui.kaupunkiAvain(c);
    ui.render();
    await new Promise((r) => setTimeout(r, 1200));
    // Edellisen kaupungin kuplat pois tieltä.
    window.matkakirjaPollo?.tyhjennaPino();
    return {
      kaupunki: c?.id,
      laatta: game.tokens.has(id),
      pisteita: document.querySelectorAll('.fokuspiste').length,
    };
  }, kaupunki.id);
  vaadi(`${kaupunki.nimi}: nappula paikallaan ja laatta kääntämättä`,
    alku.kaupunki === kaupunki.id && alku.laatta === true, JSON.stringify(alku));
  vaadi(`${kaupunki.nimi}: vihreää pistettä ei ole ennen aarteen avausta`,
    alku.pisteita === 0, String(alku.pisteita));

  /* ---------- reitti aarrevaiheeseen ---------- */

  if (KORTIT) {
    /*
     * KORTTIANNOSTELU: virta ajetaan oppituntiin asti tilan kautta ja
     * oppitunnin jatkonappi painetaan. Tila kirjoitetaan suoraan, koska
     * savukkeen mittauskohde on aarrevaihe eikä alkupään läpiklikkaus.
     *
     * Nappi on kortin VIIMEINEN: oppituntikortilla se on ainoa, ja
     * kortin muut linkit ovat sen edellä. Sen tekstin on luvattava
     * sähke eikä tapaamista — Sofiassa datassa on omistajan
     * pilottiehdon takia MOLEMMAT (Nadian kohtaaminen ja pöllön sähke),
     * ja sähke voittaa (js/fokusvirta.js aarrevaiheenNappi).
     */
    const portti = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const fv = await import('/js/fokusvirta.js');
      const city = game.cityOf();
      fv.asetaFokusvirtaTila(game, city, { vaihe: 'oppitunti' });
      fv.avaaFokusvirta(ui, city);
      await new Promise((r) => setTimeout(r, 500));
      const napit = [...document.querySelectorAll('.fokusvirta-kortti .fokusvirta-napit button')];
      const viimeinen = napit[napit.length - 1];
      const teksti = viimeinen?.textContent ?? '';
      viimeinen?.click();
      await new Promise((r) => setTimeout(r, 700));
      return {
        teksti,
        vaihe: fv.fokusvirtaTila(game, city).vaihe,
        pisteita: document.querySelectorAll('.fokuspiste').length,
      };
    });
    vaadi(`${kaupunki.nimi}: oppitunnin nappi lupaa sähkeen eikä tapaamista`,
      /sähke/i.test(portti.teksti) && !/tapaa/i.test(portti.teksti), portti.teksti);
    vaadi(`${kaupunki.nimi}: virta siirtyi aarrevaiheeseen`,
      portti.vaihe === 'kohtaaminen', JSON.stringify(portti));
  } else {
    const aarre = await sivu.evaluate(async (vastaus) => {
      const { ui, game } = window.matkakirja;
      ui.avaaTutkinta(game.cityOf());
      await new Promise((r) => setTimeout(r, 900));
      ui.naytaTutkiSivu(2, { heti: true });
      await new Promise((r) => setTimeout(r, 600));
      const napit = [...document.querySelectorAll('#arrival-dialog .kulttuuri-vaihtoehdot button')];
      const oikea = napit.find((b) => new RegExp(vastaus, 'i').test(b.textContent));
      if (!oikea) return { virhe: napit.map((b) => b.textContent) };
      oikea.click();
      await new Promise((r) => setTimeout(r, 700));
      document.getElementById('arrival-dialog')?.close();
      ui.render();
      await new Promise((r) => setTimeout(r, 700));
      const piste = document.querySelector('.fokuspiste');
      return {
        pisteita: document.querySelectorAll('.fokuspiste').length,
        nimi: piste?.getAttribute('aria-label') ?? '',
      };
    }, kaupunki.aarreVastaus.source);
    vaadi(`${kaupunki.nimi}: AARTEEN AVAUS sytyttää vihreän pisteen`,
      aarre.pisteita >= 1, JSON.stringify(aarre));
    vaadi(`${kaupunki.nimi}: pisteen lappu kertoo sähkeestä eikä tapaamisesta`,
      kaupunki.piste.test(aarre.nimi) && /sähke/i.test(aarre.nimi)
        && !/tapaa paikallinen/i.test(aarre.nimi),
      aarre.nimi);
  }

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-piste.png`) });

  /*
   * LIVIAN KUITTAUSKUPLA ODOTETAAN POIS ENNEN KUIN PISTETTÄ NAPAUTETAAN.
   *
   * Lehden oikea vastaus laukaisee pöllön kuittauskuplan 2,5 sekunnin
   * viiveellä (js/fokusvirta.js fokusvirtaKuittaus), ja kupla sulkee
   * kaikki muut virran pinnat — myös juuri avatun sähkekortin. Näin peli
   * käyttäytyy myös kohtaamiskortilla, joten kyse ei ole tämän pilotin
   * viasta vaan ajoituksesta: savukkeen on annettava kuplan tulla ja
   * mennä, tai se mittaisi vain sen.
   */
  await sivu.waitForTimeout(3200);
  await sivu.evaluate(() => {
    document.querySelector('.fokusvirta-kupla, .fokusvirta-vinkki')?.remove();
  });

  /* ---------- sähkekortti ja lomake ---------- */

  /*
   * KORTTI AUKI OMANA ASKELEENAAN. Avaus on erotettu mittauksesta,
   * koska sähke KIRJOITTUU riveittäin (3.9.2026) ja juuri se
   * välitila halutaan nähdä: jos avaus ja mittaus olisivat samassa
   * evaluatessa, savuke joko odottaisi animaation ohi tai mittaisi
   * tyhjää korttia.
   */
  await sivu.evaluate((kortit) => {
    window.matkakirja.ui.busy = false;
    // Korttiannostelussa sähkekortti on jo auki (oppitunnin jatkonappi
    // avasi sen); kevyessä kulussa se avataan kartan pisteestä.
    if (!kortit) {
      document.querySelector('.fokuspiste')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }, KORTIT);

  /** Sähkeen rivit ja kirjoitustila juuri nyt. */
  const lueSahke = () => sivu.evaluate(() => {
    const s = document.querySelector('.fokusvirta-kortti .fokusvirta-sahke');
    const rivit = [...(s?.querySelectorAll('.fokusvirta-sahkerivi') ?? [])]
      .map((riv) => riv.textContent ?? '');
    return {
      kirjoittaa: Boolean(s?.classList.contains('kirjoittaa')),
      rivit: rivit.length,
      tyhjia: rivit.filter((t) => !t.trim()).length,
      merkkeja: rivit.join('').length,
    };
  });

  if (KORTIT) {
    // Korttikulussa kortti avattiin jo oppitunnin napista sekunteja
    // sitten, joten välitilaa ei ole enää nähtävissä.
    await sivu.waitForTimeout(600);
  } else {
    await sivu.waitForTimeout(300);
    const kesken = await lueSahke();
    vaadi(`${kaupunki.nimi}: sähke kirjoittuu rivi kerrallaan`,
      kesken.kirjoittaa && kesken.tyhjia >= 1 && kesken.merkkeja > 0,
      JSON.stringify(kesken));
    await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-kirjoittuu.png`) });

    await sivu.evaluate(() => {
      document.querySelector('.fokusvirta-sahke')
        ?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    });
    await sivu.waitForTimeout(120);
    const hyppy = await lueSahke();
    vaadi(`${kaupunki.nimi}: napautus sähkeeseen hyppää loppuun`,
      !hyppy.kirjoittaa && hyppy.tyhjia === 0 && hyppy.rivit >= 5,
      JSON.stringify(hyppy));
  }

  /*
   * LIVIAN SAATE ON KUPLASSA EIKÄ KORTILLA (omistaja 3.9.2026: *"nuo
   * pulun kommentit voisi siirtää pulun puhekuplaan"*). Kupla tulee
   * pienen viiveen päästä kortin avauksesta, joten sitä odotetaan.
   */
  const saate = await sivu.evaluate(async () => {
    for (let i = 0; i < 30; i += 1) {
      const kuplat = [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
        .map((k) => k.textContent ?? '').join(' ');
      if (kuplat.trim()) {
        return {
          kuplat: kuplat.slice(0, 200),
          kortilla: document.querySelectorAll(
            '.fokusvirta-kortti .fokusvirta-livian-saate',
          ).length,
        };
      }
      await new Promise((r) => setTimeout(r, 200));
    }
    return { kuplat: '', kortilla: -1 };
  });
  vaadi(`${kaupunki.nimi}: Livian saate tulee kuplaan eikä kortille`,
    kaupunki.saateSana.test(saate.kuplat) && saate.kortilla === 0,
    JSON.stringify(saate));

  const kortti = await sivu.evaluate(async () => {
    const k = document.querySelector('.fokusvirta-kortti');
    const valinta = k?.querySelector('.fokusvirta-sahkevalinta');
    const optiot = [...(valinta?.options ?? [])].map((o) => o.value).filter(Boolean);
    return {
      kortti: Boolean(k),
      // Ylärivi kertoo pinnan lajin ("Sähke"), otsikko puhujan
      // ("Pöllöltä, meren yli") — sama pari kuin kohtaamiskortilla.
      ylarivi: k?.querySelector('.fokusvirta-ylarivi')?.textContent ?? '',
      otsikko: k?.querySelector('.fokusvirta-otsikko')?.textContent ?? '',
      sahkerivit: [...(k?.querySelectorAll('.fokusvirta-sahkerivi') ?? [])]
        .map((p) => p.textContent),
      aukkoja: k?.querySelectorAll('.fokusvirta-sahkeaukko').length ?? 0,
      lukukenttia: k?.querySelectorAll('.fokusvirta-sahkeluku').length ?? 0,
      valintoja: optiot.length,
      aakkosissa: optiot.every((v, i) => i === 0 || optiot[i - 1].localeCompare(v, 'fi') <= 0),
      palkkiorivi: k?.querySelector('.fokusvirta-varoitus')?.textContent ?? '',
      // Vaihe 2: vapaa kenttä ja sen oma nappi lomakkeen RINNALLA.
      vapaakenttia: k?.querySelectorAll('.fokusvirta-sahkevapaakentta').length ?? 0,
      vapaaNappi: [...(k?.querySelectorAll('button') ?? [])]
        .map((b) => b.textContent.trim()).find((t) => /omin sanoin/i.test(t)) ?? '',
      // Pullakauppa lomakkeen alla (3.9.2026).
      pullanapit: [...(k?.querySelectorAll('.fokusvirta-sahkepullat .fokus-pulla-nappi') ?? [])]
        .map((b) => b.textContent.trim()),
    };
  });
  vaadi(`${kaupunki.nimi}: reitti aarrevaiheeseen avaa sähkekortin`,
    kortti.kortti && /sähke/i.test(kortti.ylarivi) && /pöllö/i.test(kortti.otsikko),
    JSON.stringify([kortti.ylarivi, kortti.otsikko]));
  vaadi(`${kaupunki.nimi}: sähke on sähketyylinen (STOP-rivit)`,
    kortti.sahkerivit.length >= 5 && kortti.sahkerivit.every((r) => /STOP/i.test(r)),
    `${kortti.sahkerivit.length} riviä`);
  vaadi(`${kaupunki.nimi}: lomakkeessa valintalista ja numerokenttä`,
    kortti.aukkoja === 2 && kortti.lukukenttia === 1,
    JSON.stringify({ a: kortti.aukkoja, l: kortti.lukukenttia }));
  vaadi(`${kaupunki.nimi}: valintalista on maan sisältöhakemisto aakkosissa`,
    kortti.valintoja >= 20 && kortti.aakkosissa, `${kortti.valintoja} riviä`);
  vaadi(`${kaupunki.nimi}: kortti kertoo palkkion nykyisen suuruuden`,
    /200 puntaa/.test(kortti.palkkiorivi), kortti.palkkiorivi);
  vaadi(`${kaupunki.nimi}: lomakkeen rinnalla on vapaa tekstikenttä ja oma nappi`,
    kortti.vapaakenttia === 1 && /omin sanoin/i.test(kortti.vapaaNappi),
    JSON.stringify({ kenttia: kortti.vapaakenttia, nappi: kortti.vapaaNappi }));

  vaadi(`${kaupunki.nimi}: kortilla on kaksi pullanappia (50 £ vinkki, 25 £ linkki)`,
    kortti.pullanapit.length === 2
      && /50 £/.test(kortti.pullanapit[0]) && /vinkki/i.test(kortti.pullanapit[0])
      && /25 £/.test(kortti.pullanapit[1]) && /linkki/i.test(kortti.pullanapit[1])
      && kortti.pullanapit.every((t) => t.includes(kaupunki.pullaNimi)),
    JSON.stringify(kortti.pullanapit));

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-lomake.png`) });

  /* ---------- pulla Livialle: vinkki ja suora linkki ---------- */

  /**
   * Ostaa yhden pullan: kaksi napautusta samaan nappiin (ensimmäinen
   * varmistaa, toinen maksaa) — sama kaava kuin lehden aarretehtävässä.
   *
   * @param {number} indeksi 0 = kokonainen pulla, 1 = puolikas
   */
  const ostaPulla = async (indeksi) => sivu.evaluate(async (i) => {
    const napit = () => [...document.querySelectorAll(
      '.fokusvirta-sahkepullat .fokus-pulla-nappi',
    )];
    const rahaEnnen = window.matkakirja.game.player.money;
    napit()[i]?.click();
    await new Promise((r) => setTimeout(r, 120));
    const varmistus = napit()[i]?.textContent?.trim() ?? '';
    napit()[i]?.click();
    await new Promise((r) => setTimeout(r, 250));
    const kotelo = document.querySelector('.fokusvirta-sahkepullat');
    return {
      varmistus,
      kuittaukset: [...(kotelo?.querySelectorAll('.fokus-pulla-tehty') ?? [])]
        .map((el) => el.textContent.trim()),
      jaljella: napit().length,
      maksoi: rahaEnnen - window.matkakirja.game.player.money,
      linkkinappi: [...(kotelo?.querySelectorAll('button') ?? [])]
        .map((b) => b.textContent.trim()).find((t) => /Livian linkki/i.test(t)) ?? '',
      kuplat: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
        .map((k) => k.textContent ?? '').join(' ').slice(-400),
      lomakeYha: Boolean(document.querySelector('.fokusvirta-sahkelomake')),
    };
  }, indeksi);

  const kokoPulla = await ostaPulla(0);
  vaadi(`${kaupunki.nimi}: kokonainen pulla maksaa 50 £ ja jättää kuittauksen`,
    kokoPulla.maksoi === 50 && kokoPulla.kuittaukset.length === 1
      && /Varmista/i.test(kokoPulla.varmistus) && kokoPulla.lomakeYha === true,
    JSON.stringify(kokoPulla).slice(0, 220));

  /*
   * VINKKI TULEE KUPLAPINOON OSISSA (js/pollo.js naytaPuheenvuoro):
   * ensin huudahdus, sitten jatko. Se osa, jossa lähde mainitaan, ei
   * ole ensimmäinen — joten sitä odotetaan eikä lueta kertalukemalla.
   */
  const vinkkikupla = await sivu.evaluate(async (sana) => {
    const ehto = new RegExp(sana, 'i');
    let kaikki = '';
    for (let i = 0; i < 40; i += 1) {
      kaikki = [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
        .map((k) => k.textContent ?? '').join(' ');
      if (ehto.test(kaikki)) break;
      await new Promise((r) => setTimeout(r, 250));
    }
    return kaikki.slice(-400);
  }, kaupunki.vinkkiSana.source);
  vaadi(`${kaupunki.nimi}: Livia sanoo vinkin kuplassa`,
    kaupunki.vinkkiSana.test(vinkkikupla), vinkkikupla.slice(-120));

  const puolikas = await ostaPulla(0);
  vaadi(`${kaupunki.nimi}: puolikas pulla maksaa 25 £ ja tuo linkkinapin`,
    puolikas.maksoi === 25 && puolikas.kuittaukset.length === 2
      && /Livian linkki/i.test(puolikas.linkkinappi),
    JSON.stringify(puolikas).slice(0, 220));

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-pullat.png`) });

  /*
   * LINKKI AVAA OIKEAN PINNAN. Sofiassa se on kartan kohdekortti
   * (Varna), Tukholmassa kaupunkilehden sivu, jolla Vasa-juttu on.
   * Pinta suljetaan heti perään ja sähkekortti avataan uudelleen —
   * loput väitteet mittaavat vastaamista, eivät linkkiä.
   */
  const linkki = await sivu.evaluate(async ([valitsin, kortit]) => {
    const nappi = [...document.querySelectorAll('.fokusvirta-sahkepullat button')]
      .find((b) => /Livian linkki/i.test(b.textContent));
    nappi?.click();
    await new Promise((r) => setTimeout(r, 900));
    const pinta = document.querySelector(valitsin);
    /*
     * KOKO TEKSTI, EI ALKUA. Kaupunkilehden dialogissa ensimmäiset
     * sadat merkit ovat nimiötä, päiväystä ja säärivä — juttu itse on
     * vasta niiden jälkeen, ja alkupätkän lukeminen mittasi pelkkää
     * ylätunnistetta.
     */
    const teksti = pinta?.textContent ?? '';
    // Pinta kiinni ja sähke takaisin ruudulle.
    document.querySelector(`${valitsin} .fokuskohde-sulje`)?.click();
    document.getElementById('arrival-dialog')?.close();
    window.matkakirja.ui.render();
    await new Promise((r) => setTimeout(r, 500));
    if (!kortit) {
      document.querySelector('.fokuspiste')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    } else {
      const fv = await import('/js/fokusvirta.js');
      fv.avaaFokusvirta(window.matkakirja.ui, window.matkakirja.game.cityOf());
    }
    await new Promise((r) => setTimeout(r, 600));
    return {
      aukesi: Boolean(pinta),
      teksti,
      kortti: Boolean(document.querySelector('.fokusvirta-sahkelomake')),
    };
  }, [kaupunki.linkkiPinta.valitsin, KORTIT]);
  vaadi(`${kaupunki.nimi}: puolikkaan pullan linkki avaa vastauksen lähteen`,
    linkki.aukesi && kaupunki.linkkiPinta.teksti.test(linkki.teksti),
    `${linkki.aukesi} · ${linkki.teksti.length} merkkiä`);
  vaadi(`${kaupunki.nimi}: sähkekortti palaa linkin jälkeen`, linkki.kortti === true,
    String(linkki.kortti));

  /** Täyttää lomakkeen ja painaa lähetysnapin. */
  const laheta = async (kohde, vuosi) => sivu.evaluate(async ([k, v]) => {
    const kortti2 = document.querySelector('.fokusvirta-kortti');
    kortti2.querySelector('.fokusvirta-sahkevalinta').value = k;
    kortti2.querySelector('.fokusvirta-sahkeluku').value = String(v);
    [...kortti2.querySelectorAll('button')]
      .find((b) => /lähetä sähke/i.test(b.textContent))?.click();
    await new Promise((r) => setTimeout(r, 500));
    /*
     * PALUUSÄHKE KIRJOITTUU (3.9.2026), joten se viedään loppuun ennen
     * lukemista — muuten savuke lukisi puolikkaan rivin. Napautus on
     * sama kuin pelaajan: hyppy loppuun.
     */
    document.querySelector('.fokusvirta-sahke')
      ?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 80));
    const uusi = document.querySelector('.fokusvirta-kortti');
    return {
      tulos: uusi?.querySelector('.fokusvirta-visa-tulos')?.textContent ?? '',
      palkkiorivi: uusi?.querySelector('.fokusvirta-varoitus')?.textContent ?? '',
      vinkki: uusi?.querySelector('.fokusvirta-varmistus')?.textContent ?? '',
      lomakeYha: Boolean(uusi?.querySelector('.fokusvirta-sahkelomake')),
      kuittaus: [...(uusi?.querySelectorAll('.fokusvirta-sahkerivi') ?? [])]
        .map((p) => p.textContent).join(' '),
      nappi: [...(uusi?.querySelectorAll('button') ?? [])]
        .map((b) => b.textContent.trim()).find((t) => /livian/i.test(t)) ?? '',
      laatta: window.matkakirja.game.tokens.has(window.matkakirja.game.cityOf().id),
      busy: Boolean(window.matkakirja.ui.busy),
    };
  }, [kohde, vuosi]);

  /**
   * Kirjoittaa vapaan vastauksen ja painaa sen oman napin.
   *
   * ODOTETAAN TULOSTA, EI KELLOA. Kiinteä odotus ei kelpaa tässä:
   * hyväksytty vastaus vie Livian heti lennolle, ja savukkeessa
   * lyhennetty lento (0,9 s) ehtisi kiinteän odotuksen aikana viedä
   * kuittauskortin jo pois ruudulta. Silmukka lopettaa heti kun kortti
   * on päätynyt johonkin: kuittaukseen, paluusähkeeseen tai
   * lomakevihjeeseen. Odotusrivi (fokusvirta-sahkeodotus) ei kelpaa
   * lopputulokseksi — se on juuri se hetki, jota odotetaan.
   */
  const lahetaVapaa = async (teksti) => {
    await sivu.evaluate((t) => {
      const kortti2 = document.querySelector('.fokusvirta-kortti');
      kortti2.querySelector('.fokusvirta-sahkevapaakentta').value = t;
      [...kortti2.querySelectorAll('button')]
        .find((b) => /omin sanoin/i.test(b.textContent))?.click();
    }, teksti);
    /*
     * ODOTUS AJETAAN NODESTA, EI SIVULTA. Pitkä `evaluate` pitää
     * Playwrightin reitityskuuntelijan varattuna, jolloin sivun oma
     * verkkopyyntö EI etene ennen kuin evaluate on palannut — mitattu:
     * mock-worker sai pyynnön vasta silmukan päätyttyä, ja jokainen
     * vapaa vastaus näytti aikakatkaisulta. Lyhyet kyselyt Nodesta
     * jättävät kuuntelijalle tilaa.
     */
    for (let i = 0; i < 150; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const valmis = await sivu.evaluate(() => {
        const k = document.querySelector('.fokusvirta-kortti');
        if (!k) return false;
        /*
         * HYVÄKSYTTY VASTAUS TUNNISTETAAN LOMAKKEEN KATOAMISESTA, EI
         * SANASTA. Kuittauskortilla ei ole lomaketta. Sanaan
         * "TUNNUSSANA" ei voi nojata: Tukholman oma sähke sanoo
         * "VIERAASI VASTATKOON TUNNUSSANALLA", joten silmukka
         * lopettaisi heti ensimmäisellä kierroksella.
         */
        if (!k.querySelector('.fokusvirta-sahkelomake')) return true;
        const rivi = k.querySelector('.fokusvirta-visa-tulos');
        return Boolean(rivi && rivi.textContent.trim()
          && !rivi.classList.contains('fokusvirta-sahkeodotus'));
      });
      if (valmis) break;
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(100);
    }
    return sivu.evaluate(async () => {
      // Sama hyppy loppuun kuin lomakkeella (ks. laheta).
      document.querySelector('.fokusvirta-sahke')
        ?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 80));
      const uusi = document.querySelector('.fokusvirta-kortti');
      return {
        tulos: uusi?.querySelector('.fokusvirta-visa-tulos')?.textContent ?? '',
        palkkiorivi: uusi?.querySelector('.fokusvirta-varoitus')?.textContent ?? '',
        lomakeYha: Boolean(uusi?.querySelector('.fokusvirta-sahkelomake')),
        vapaaYha: Boolean(uusi?.querySelector('.fokusvirta-sahkevapaakentta')),
        kuittaus: [...(uusi?.querySelectorAll('.fokusvirta-sahkerivi') ?? [])]
          .map((p) => p.textContent).join(' '),
        nappi: [...(uusi?.querySelectorAll('button') ?? [])]
          .map((b) => b.textContent.trim()).find((t2) => /livian/i.test(t2)) ?? '',
        napitAuki: [...(uusi?.querySelectorAll('button') ?? [])].every((b) => !b.disabled),
        laatta: window.matkakirja.game.tokens.has(window.matkakirja.game.cityOf().id),
        busy: Boolean(window.matkakirja.ui.busy),
      };
    });
  };

  const vaaraVuosi = await laheta(kaupunki.kohde, kaupunki.vuosi + 1);
  vaadi(`${kaupunki.nimi}: väärä vuosi — pöllö nimeää vuosiluvun`,
    /VUOSILUKU/.test(vaaraVuosi.tulos) && !/KOHDE/.test(vaaraVuosi.tulos), vaaraVuosi.tulos);
  vaadi(`${kaupunki.nimi}: väärä vastaus ei lukitse aarretta eikä sulje lomaketta`,
    vaaraVuosi.laatta === true && vaaraVuosi.lomakeYha === true,
    JSON.stringify({ laatta: vaaraVuosi.laatta, lomake: vaaraVuosi.lomakeYha }));
  vaadi(`${kaupunki.nimi}: palkkio pieneni neljänneksen (200 → 150)`,
    /150 puntaa/.test(vaaraVuosi.palkkiorivi), vaaraVuosi.palkkiorivi);

  const vaaraKohde = await laheta(kaupunki.vaaraKohde, kaupunki.vuosi);
  vaadi(`${kaupunki.nimi}: väärä kohde — pöllö nimeää kohteen`,
    /KOHDE/.test(vaaraKohde.tulos) && !/VUOSILUKU/.test(vaaraKohde.tulos), vaaraKohde.tulos);
  vaadi(`${kaupunki.nimi}: kahden ohilyönnin jälkeen Livia vinkkaa lähteen`,
    kaupunki.vinkkiSana.test(vaaraKohde.vinkki), vaaraKohde.vinkki.slice(0, 90));
  vaadi(`${kaupunki.nimi}: palkkio pieneni toisen kerran (150 → 100)`,
    /100 puntaa/.test(vaaraKohde.palkkiorivi), vaaraKohde.palkkiorivi);

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-ohilyonti.png`) });

  /* ---------- vapaa vastaus: sotku ja aikakatkaisu ---------- */

  const pyyntojaEnnen = mockPyyntoja;
  const sotku = await lahetaVapaa('en tiedä yhtään, joku vene varmaan');
  vaadi(`${kaupunki.nimi}: sotku omin sanoin — pöllö sähköttää EI TÄSMÄÄ`,
    /EI TÄSMÄÄ/i.test(sotku.tulos), sotku.tulos);
  vaadi(`${kaupunki.nimi}: sotku ei lukitse aarretta eikä vie lomaketta`,
    sotku.laatta === true && sotku.lomakeYha === true && sotku.vapaaYha === true,
    JSON.stringify({ laatta: sotku.laatta, lomake: sotku.lomakeYha, vapaa: sotku.vapaaYha }));
  // Vähennys on neljännes POHJASTA eikä jäljellä olevasta, joten
  // kolmas ohilyönti vie sadasta viiteenkymmeneen (js/fokusvirta.js
  // sahkePalkkio) — sama kaava kummallakin vastaustavalla.
  vaadi(`${kaupunki.nimi}: sotku syö palkkiota kuten lomakkeen ohilyönti (100 → 50)`,
    /50 puntaa/.test(sotku.palkkiorivi), sotku.palkkiorivi);
  vaadi(`${kaupunki.nimi}: vapaa vastaus kävi pöllöllä asti`,
    mockPyyntoja === pyyntojaEnnen + 1, `${mockPyyntoja - pyyntojaEnnen} pyyntöä`);

  const hidas = await lahetaVapaa('hidas vastaus jota ei kuulu');
  vaadi(`${kaupunki.nimi}: aikakatkaisu ohjaa lomakkeeseen eikä jätä jumiin`,
    /Pöllö ei vastannut\. Kokeile lomaketta\./.test(hidas.tulos)
      && hidas.lomakeYha === true && hidas.napitAuki === true && hidas.busy === false,
    JSON.stringify({ tulos: hidas.tulos, napit: hidas.napitAuki, busy: hidas.busy }));
  vaadi(`${kaupunki.nimi}: aikakatkaisu ei laske ohilyöntiä (palkkio yhä 50)`,
    /50 puntaa/.test(hidas.palkkiorivi), hidas.palkkiorivi);

  // Kortti vieritetään pohjaan ennen kaappausta: vapaa kenttä on
  // lomakkeen alla, eikä se muuten näy kuvassa lainkaan — ja kuvat on
  // tarkoitettu katsottaviksi.
  await sivu.evaluate(() => {
    const sisalto = document.querySelector('.fokusvirta-kortti .fokusvirta-sisalto');
    if (sisalto) sisalto.scrollTop = sisalto.scrollHeight;
  });
  await sivu.waitForTimeout(300);
  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-vapaa.png`) });

  /* ---------- oikea vastaus: Livia lentää ---------- */

  /*
   * Tukholma avaa aarteen VAPAALLA TEKSTILLÄ (tulkinta mock-workerilta),
   * Sofia lomakkeella — kumpikin tie on siis mitattu, ja loppuosa
   * (lento, paluu, aarre) on sama molemmille.
   */
  const oikein = kaupunki.vapaaOikein
    ? await lahetaVapaa(kaupunki.vapaaOikein)
    : await laheta(kaupunki.kohde, kaupunki.vuosi);
  if (kaupunki.vapaaOikein) {
    vaadi(`${kaupunki.nimi}: oikea vastaus omin sanoin kelpaa pöllölle`,
      /TUNNUSSANA TÄSMÄÄ/i.test(oikein.kuittaus), oikein.kuittaus);
  }
  vaadi(`${kaupunki.nimi}: oikea vastaus vaihtaa kortin kuittaukseksi`,
    /TUNNUSSANA TÄSMÄÄ/i.test(oikein.kuittaus) && /Livian/i.test(oikein.nappi),
    JSON.stringify({ k: oikein.kuittaus, n: oikein.nappi }));
  vaadi(`${kaupunki.nimi}: lento ei lukitse peliä eikä käännä laattaa vielä`,
    oikein.laatta === true && oikein.busy === false,
    JSON.stringify({ laatta: oikein.laatta, busy: oikein.busy }));

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-oikein.png`) });

  /* ---------- Livia palaa ja aarre aukeaa ---------- */

  const paluu = await sivu.evaluate(async (id) => {
    // Kortti kiinni napista, kuten pelaaja tekisi.
    [...document.querySelectorAll('.fokusvirta-kortti button')]
      .find((b) => /livian/i.test(b.textContent))?.click();
    /*
     * PALUUKUPLA ON VIRRAN OMA (.fokusvirta-vinkki), ei pöllön
     * saapumiskupla (.pollo-vihje) — saapumiskupla voi olla yhä
     * ruudulla tästä käynnistä, ja ilman tätä rajausta savuke lukisi
     * sen.
     */
    let kupla = '';
    // Odotus 16 s: äänitetyssä kaupungissa lento odottaa kuittauksen
    // puheen loppuun (js/fokusvirta.js aloitaSahkelento).
    for (let i = 0; i < 80; i += 1) {
      const k = document.querySelector('.fokusvirta-vinkki');
      if (k && !k.hidden) { kupla = k.textContent ?? ''; break; }
      await new Promise((r) => setTimeout(r, 200));
    }
    for (let i = 0; i < 60; i += 1) {
      if (!window.matkakirja.game.tokens.has(id)) break;
      await new Promise((r) => setTimeout(r, 250));
    }
    return {
      kupla: kupla.slice(0, 120),
      laatta: window.matkakirja.game.tokens.has(id),
      rahaa: window.matkakirja.game.player.money,
    };
  }, kaupunki.id);
  vaadi(`${kaupunki.nimi}: Livia palaa kuplalla`, /perillä/i.test(paluu.kupla), paluu.kupla);
  vaadi(`${kaupunki.nimi}: paluu kääntää laatan eli avaa aarteen`,
    paluu.laatta === false, JSON.stringify(paluu));

  // Aarteen lappu suljetaan, jotta matkakirjakortti pääsee näkyviin.
  const merkinta = await sivu.evaluate(async (tunnus) => {
    for (let i = 0; i < 20; i += 1) {
      const jatka = [...document.querySelectorAll('.reveal-jatka, dialog[open] button')]
        .find((b) => /jatka matkaa/i.test(b.textContent));
      if (jatka) { jatka.click(); break; }
      await new Promise((r) => setTimeout(r, 300));
    }
    document.querySelector('.reveal-overlay')?.remove();
    window.matkakirja.ui.render();
    for (let i = 0; i < 40; i += 1) {
      const t = document.getElementById('fact-text')?.textContent ?? '';
      if (new RegExp(tunnus, 'i').test(t)) return t.slice(0, 80);
      await new Promise((r) => setTimeout(r, 300));
    }
    return (document.getElementById('fact-text')?.textContent ?? '').slice(0, 80);
  }, kaupunki.merkinta.source);
  vaadi(`${kaupunki.nimi}: isoisän aarremerkintä aukeaa matkakirjakorttiin`,
    kaupunki.merkinta.test(merkinta), merkinta);

  await sivu.screenshot({ path: join(ULOS, `savuke-sahke-${kaupunki.id}-aarre.png`) });

}

/*
 * PILOTIN PALAUTUS ON YKSI RIVI (omistajan ehto 29.8.2026): Sofian
 * oman kohtaamisen on oltava yhä datassa, vaikka sähke voittaa sen
 * kortilla. Sitä vartioi yksikkötesti (tests/fokusvirta.test.mjs,
 * "Sofian pelitestattu sisältö on ennallaan sähkepilotin jälkeen"),
 * koska kyse on datasta eikä ruudusta — tässä savukkeessa se olisi
 * kierrettävä ikkunamuuttujien kautta eikä mittaisi mitään uutta.
 */

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
