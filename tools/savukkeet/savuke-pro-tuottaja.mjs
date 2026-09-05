/*
 * Savuke: pro-sisällöntuottajan palikka selaimessa (omistajan tilaus
 * 18.8.2026 "toteuta pro-palikka").
 *
 * Worker-testit (tests/pro-worker.test.mjs) vartioivat reittejä
 * Nodessa. Tämä savuke vartioi sitä, mitä testit eivät näe: että
 * pelin kolme pintaa oikeasti syntyvät ja toimivat selaimessa
 * mock-Workeria vasten.
 *
 *   1. KIRJAUTUMINEN. Palautelomakkeen osio "Olen pro-sisällöntuottaja"
 *      ottaa sähköpostin ja koodin, kutsuu /pro-tarkista ja vaihtaa
 *      näkymän pro-näkymäksi. Väärä pari antaa selkeän virheviestin
 *      eikä jää laitteen muistiin.
 *   2. PRO-NÄKYMÄ. Kaksi lomaketta: materiaalilohko (.pro-materiaali)
 *      ensin, tekijäsivu (.pro-profiililohko) väkäsen takana. Materiaali
 *      lähtee /laheta-reitille, esittely ja linkit /pro-profiili-reitille,
 *      ja vastauksen viesti näkyy pelaajalle. Kentät haetaan AINA oikean
 *      lohkon sisältä — näkymän ensimmäinen textarea, url-kenttä ja
 *      lähetysnappi kuuluvat materiaalilohkolle.
 *   3. TEKIJÄKORTTI. Lähderivi, jolla on `tekijaId`, tekee nimestä
 *      painikkeen; painike avaa kortin, jossa on kuva, esittely ja
 *      ulkoiset linkit uuteen välilehteen. Verkotta kortti kertoo
 *      siististi, ettei sivu ole saatavilla.
 *   4. TYÖHUONE. Lukijoilta-lehden perässä on pro-osio: yhteenveto,
 *      tuottajan sivu koodeineen ja päätösnapit.
 *
 * Worker ei ole pystyssä eikä sitä tarvita: kaikki pyynnöt
 * EHDOTUS_OSOITE-isännälle siepataan ja vastataan mock-datalla.
 *
 *   node tools/savukkeet/savuke-pro-tuottaja.mjs
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
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ---------- mock-Worker ---------- */

const KOODI = 'AB3DEF4H';
const POSTI = 'aino@example.com';
const TEKIJA_ID = 'k7m2p9xr4t';

// 1×1 png, jotta kuvaelementti latautuu oikeasti.
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmM'
  + 'IQAAAABJRU5ErkJggg==', 'base64',
);

const TUOTTAJA = {
  versio: 1,
  luotu: '2026-08-18T09:00:00.000Z',
  sahkoposti: POSTI,
  nimi: 'Aino Valokuvaaja',
  koodi: KOODI,
  tekijaId: TEKIJA_ID,
  tila: 'odottaa',
  kommentti: '',
  profiili: {
    esittely: 'Dokumenttivalokuvaaja Tampereelta.',
    linkit: [{ nimi: 'esimerkki.fi', url: 'https://www.esimerkki.fi/galleria' }],
    kuva: { tiedosto: `${TEKIJA_ID}.png`, tyyppi: 'image/png', koko: 68 },
    paivitetty: '2026-08-18T10:00:00.000Z',
  },
  julkaistu: '',
};

const JULKINEN = {
  id: TEKIJA_ID,
  nimi: 'Aino Valokuvaaja',
  esittely: 'Dokumenttivalokuvaaja Tampereelta.\n\nKuvannut satamia 20 vuotta.',
  linkit: [{ nimi: 'esimerkki.fi', url: 'https://www.esimerkki.fi/galleria' }],
  kuva: `/tekija/${TEKIJA_ID}/kuva`,
  julkaistu: '2026-08-18T11:00:00.000Z',
};

/** Muuttuva lippu: kun tosi, tekijäsivun haku epäonnistuu (verkotta). */
let verkkoPoikki = false;
const kutsutut = [];

/**
 * Sieppaa kaikki muut kuin paikallispalvelimen pyynnöt ja vastaa
 * pro-reiteille mock-datalla. Muu ulkomaailma torjutaan, jottei
 * savuke riipu verkosta.
 */
async function mockWorker(sivu) {
  await sivu.route((url) => !['localhost', '127.0.0.1'].includes(url.hostname), async (reitti) => {
    const url = new URL(reitti.request().url());
    const polku = url.pathname;
    kutsutut.push(`${reitti.request().method()} ${polku}`);
    const jsonVastaus = (data, status = 200) => reitti.fulfill({
      status, contentType: 'application/json; charset=utf-8', body: JSON.stringify(data),
    });

    if (polku === '/pro-tarkista') {
      const runko = JSON.parse(reitti.request().postData() ?? '{}');
      if (String(runko.koodi ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '') !== KOODI
        || String(runko.sahkoposti ?? '').toLowerCase() !== POSTI) {
        return jsonVastaus({ virhe: 'Sähköposti ja koodi eivät täsmää.' }, 401);
      }
      return jsonVastaus({
        ok: true,
        nimi: TUOTTAJA.nimi,
        tekijaId: TEKIJA_ID,
        tila: 'kutsuttu',
        kommentti: '',
        profiili: null,
      });
    }
    if (polku === '/laheta') {
      return jsonVastaus({ ok: true });
    }
    if (polku === '/pro-profiili') {
      return jsonVastaus({
        ok: true, tila: 'odottaa', tekijaId: TEKIJA_ID,
        viesti: 'Profiili odottaa julkaisua — saat krediitin kun ensimmäinen '
          + 'kuvasi julkaistaan lehdessä.',
      });
    }
    if (polku === `/tekija/${TEKIJA_ID}`) {
      if (verkkoPoikki) return reitti.abort();
      return jsonVastaus({ tekija: JULKINEN });
    }
    if (polku === `/tekija/${TEKIJA_ID}/kuva` || polku.startsWith('/pro-kuva/')) {
      return reitti.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
    }
    if (polku === '/lista') return jsonVastaus({ ehdotukset: [] });
    if (polku === '/pro-lista') return jsonVastaus({ tuottajat: [TUOTTAJA] });
    return reitti.abort();
  });
}

/* ---------- ajo ---------- */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 900, height: 1000 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await mockWorker(sivu);
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForFunction(() => window.matkakirja, null, { timeout: 30000 });

/* 1–2. Kirjautuminen ja pro-näkymä palautelomakkeessa. */
const lomake = await sivu.evaluate(async ({ posti, koodi }) => {
  // Nimi mukaan: aikakatkaisu kertoo MIKÄ väite jäi toteutumatta.
  const odota = (nimi, ehto, ms = 5000) => new Promise((valmis, virhe) => {
    const takaraja = Date.now() + ms;
    const kierros = () => {
      if (ehto()) return valmis(true);
      if (Date.now() > takaraja) return virhe(new Error(`aikakatkaisu: ${nimi}`));
      return setTimeout(kierros, 50);
    };
    kierros();
  });
  const lohko = window.matkakirja.ui.periaatePalaute();
  document.body.appendChild(lohko);
  const osio = lohko.querySelector('.periaate-pro');
  if (!osio) return { osioLoytyi: false };
  osio.open = true;

  const kentat = () => [...osio.querySelectorAll('.pro-kirjautuminen .periaate-kentta')];
  const nappi = () => osio.querySelector('.pro-kirjautuminen .periaate-laheta');

  // Ensin VÄÄRÄ koodi: virheviesti näkyy eikä näkymä vaihdu.
  kentat()[0].value = posti;
  kentat()[1].value = 'ZZZZZZZZ';
  nappi().click();
  await odota('kirjautumisen virheviesti', () => (osio.querySelector('.pro-kirjautuminen .periaate-huomio')?.textContent ?? '')
    .includes('täsmää'));
  const virheviesti = osio.querySelector('.pro-kirjautuminen .periaate-huomio').textContent;
  const muistissaVaaranJalkeen = localStorage.getItem('matkakirja-pro-tunnus');

  // Sitten oikea pari.
  kentat()[1].value = koodi.toLowerCase();
  nappi().click();
  await odota('pro-näkymä avautuu', () => osio.querySelector('.pro-nakyma'));
  const nakyma = osio.querySelector('.pro-nakyma');
  const muistissa = JSON.parse(localStorage.getItem('matkakirja-pro-tunnus') ?? 'null');

  /*
   * Näkymässä on KAKSI lomaketta: materiaalilohko ensin, tekijäsivu
   * väkäsen takana (omistaja 25.8.2026). Kentät ja napit haetaan aina
   * oikean lohkon SISÄLTÄ — näkymän ensimmäinen textarea, url-kenttä
   * ja lähetysnappi kuuluvat materiaalilohkolle, eivät profiilille.
   */
  const materiaali = nakyma.querySelector('.pro-materiaali');
  const profiili = nakyma.querySelector('.pro-profiililohko');
  if (!materiaali || !profiili) return { osioLoytyi: true, lohkotLoytyi: false };
  const tila = (lohko) => [...lohko.querySelectorAll('.periaate-huomio')].at(-1)?.textContent ?? '';

  // Materiaalilomake: vajaa lähetys torjutaan tässä, ilman verkkopyyntöä.
  materiaali.querySelector('.periaate-laheta').click();
  await odota('materiaalin puutehuomio', () => /Valitse kuva tai anna videon osoite/.test(tila(materiaali)));
  const materiaaliVajaa = tila(materiaali);

  // Materiaalilomake: täytettynä lähtee ja kiittää.
  materiaali.querySelector('.pro-materiaali-video').value = 'https://www.esimerkki.fi/video';
  materiaali.querySelector('.pro-materiaali-paikka').value = 'Tampere, Näsijärvi';
  materiaali.querySelector('.pro-materiaali-aihe').value = 'Kuikka';
  materiaali.querySelector('.pro-materiaali-fakta').value = 'Kuikka sukeltaa syvälle.';
  materiaali.querySelector('.pro-materiaali-oikeudet').checked = true;
  const nimeamisrivi = materiaali.querySelector('.pro-materiaali-nimeaminen').value;
  materiaali.querySelector('.periaate-laheta').click();
  await odota('materiaalin kiitosviesti', () => /Kiitos/.test(tila(materiaali)));
  const materiaaliKiitos = tila(materiaali);

  // Profiilin lähetys omasta väkäsestään.
  profiili.open = true;
  const esittely = profiili.querySelector('textarea');
  esittely.value = 'Dokumenttivalokuvaaja Tampereelta.';
  const linkit = [...profiili.querySelectorAll('input[type="url"]')];
  linkit[0].value = 'https://www.esimerkki.fi/galleria';
  profiili.querySelector('.periaate-laheta').click();
  await odota('profiilin vastausviesti', () => tila(profiili).includes('odottaa julkaisua'));

  return {
    osioLoytyi: true,
    lohkotLoytyi: true,
    virheviesti,
    muistissaVaaranJalkeen,
    tunnusMuistissa: muistissa?.sahkoposti === posti && muistissa?.koodi === koodi.toLowerCase(),
    kenttia: { esittely: Boolean(esittely), linkkeja: linkit.length },
    materiaaliVajaa,
    materiaaliKiitos,
    nimeamisrivi,
    lopputila: [...profiili.querySelectorAll('.periaate-huomio')].map((p) => p.textContent).join(' | '),
  };
}, { posti: POSTI, koodi: KOODI });

vaadi('palautelomakkeessa on pro-osio', lomake.osioLoytyi === true);
vaadi('pro-näkymässä on sekä materiaalilohko että tekijäsivun väkänen',
  lomake.lohkotLoytyi === true);
vaadi('väärä pari antaa selkeän virheen eikä jää muistiin',
  /täsmää/.test(lomake.virheviesti ?? '') && lomake.muistissaVaaranJalkeen === null,
  JSON.stringify({ virhe: lomake.virheviesti, muisti: lomake.muistissaVaaranJalkeen }));
vaadi('oikea pari avaa pro-näkymän ja jää laitteen muistiin',
  lomake.tunnusMuistissa === true);
vaadi('tekijäsivun väkäsessä on esittely ja kolme linkkikenttää',
  lomake.kenttia?.esittely === true && lomake.kenttia?.linkkeja === 3,
  JSON.stringify(lomake.kenttia));
vaadi('materiaalilomake torjuu vajaan lähetyksen ilman verkkopyyntöä',
  /Valitse kuva tai anna videon osoite/.test(lomake.materiaaliVajaa ?? '')
    && kutsutut.filter((k) => k === 'POST /laheta').length === 1,
  JSON.stringify({ vajaa: lomake.materiaaliVajaa, lahetyksia: kutsutut.filter((k) => k === 'POST /laheta').length }));
vaadi('täytetty materiaali lähtee /laheta-reitille ja kiittää',
  /Kiitos/.test(lomake.materiaaliKiitos ?? '') && kutsutut.includes('POST /laheta'),
  JSON.stringify({ kiitos: lomake.materiaaliKiitos }));
vaadi('nimeämisrivi on valmiiksi tuottajan nimellä',
  lomake.nimeamisrivi === 'Kuva: Aino Valokuvaaja', JSON.stringify(lomake.nimeamisrivi));
vaadi('profiilin lähetys kertoo että se odottaa julkaisua',
  /odottaa julkaisua/.test(lomake.lopputila ?? ''), lomake.lopputila);
vaadi('lähetys kulki /pro-tarkista- ja /pro-profiili-reittien kautta',
  kutsutut.includes('POST /pro-tarkista') && kutsutut.includes('POST /pro-profiili'),
  kutsutut.join(', '));

/* 3. Tekijäkortti mock-datalla. */
const kortti = await sivu.evaluate(async (id) => {
  // Nimi mukaan: aikakatkaisu kertoo MIKÄ väite jäi toteutumatta.
  const odota = (nimi, ehto, ms = 5000) => new Promise((valmis, virhe) => {
    const takaraja = Date.now() + ms;
    const kierros = () => {
      if (ehto()) return valmis(true);
      if (Date.now() > takaraja) return virhe(new Error(`aikakatkaisu: ${nimi}`));
      return setTimeout(kierros, 50);
    };
    kierros();
  });
  const moduuli = await import('./js/tekijakortti.js');
  moduuli.nollaaTekijaValimuisti();

  // Lähderivi ILMAN tekijaId:tä pysyy tavallisena tekstinä.
  const tavallinen = document.createElement('p');
  moduuli.taytaLahderivi(tavallinen, 'Wikimedia Commons (CC BY 4.0)', {});
  const tavallinenNappeja = tavallinen.querySelectorAll('button').length;

  // Lähderivi tekijaId:llä tekee nimestä painikkeen.
  const rivi = document.createElement('p');
  document.body.appendChild(rivi);
  moduuli.taytaLahderivi(rivi, 'Aino Valokuvaaja (julkaistu tekijän luvalla)', {
    tekija: 'Aino Valokuvaaja', tekijaId: id,
  });
  const nappi = rivi.querySelector('.tekija-nappi');
  const riviTeksti = rivi.textContent;

  nappi.click();
  await odota('tekijäkortin esittely', () => document.querySelector('.tekija-kortti .tekija-esittely'));
  const ikkuna = document.querySelector('.tekija-ikkuna');
  const kuva = ikkuna.querySelector('.tekija-kuva');
  await odota('tekijäkortin kuva latautuu', () => !kuva || kuva.complete);
  const linkit = [...ikkuna.querySelectorAll('.tekija-linkki')];
  const tulos = {
    tavallinenNappeja,
    nappiTeksti: nappi.textContent,
    riviTeksti,
    otsikko: ikkuna.querySelector('.tekija-otsikko').textContent,
    kappaleita: ikkuna.querySelectorAll('.tekija-esittely').length,
    kuvaLatautui: Boolean(kuva && kuva.naturalWidth > 0),
    linkit: linkit.map((a) => ({
      teksti: a.textContent, href: a.href, target: a.target, rel: a.rel,
      merkinta: getComputedStyle(a, '::after').content,
    })),
  };
  ikkuna.remove();
  rivi.remove();
  return tulos;
}, TEKIJA_ID);

vaadi('lähderivi ilman tekijaId:tä pysyy tavallisena tekstinä',
  kortti.tavallinenNappeja === 0);
vaadi('tekijaId tekee tekijän nimestä painikkeen lähderiville',
  kortti.nappiTeksti === 'Aino Valokuvaaja'
    && kortti.riviTeksti === 'Aino Valokuvaaja (julkaistu tekijän luvalla)',
  JSON.stringify({ nappi: kortti.nappiTeksti, rivi: kortti.riviTeksti }));
vaadi('kortti näyttää nimen, kuvan ja esittelyn kappaleina',
  kortti.otsikko === 'Aino Valokuvaaja' && kortti.kappaleita === 2 && kortti.kuvaLatautui === true,
  JSON.stringify(kortti));
vaadi('linkit avautuvat uuteen välilehteen ja kantavat ulkoisen merkinnän',
  kortti.linkit.length === 1
    && kortti.linkit[0].target === '_blank'
    && /noopener/.test(kortti.linkit[0].rel)
    && kortti.linkit[0].merkinta.includes('↗'),
  JSON.stringify(kortti.linkit));

/* 3b. Verkotta kortti kertoo siististi eikä jää lataamaan. */
verkkoPoikki = true;
const verkotta = await sivu.evaluate(async (id) => {
  // Nimi mukaan: aikakatkaisu kertoo MIKÄ väite jäi toteutumatta.
  const odota = (nimi, ehto, ms = 8000) => new Promise((valmis, virhe) => {
    const takaraja = Date.now() + ms;
    const kierros = () => {
      if (ehto()) return valmis(true);
      if (Date.now() > takaraja) return virhe(new Error(`aikakatkaisu: ${nimi}`));
      return setTimeout(kierros, 50);
    };
    kierros();
  });
  const moduuli = await import('./js/tekijakortti.js');
  moduuli.nollaaTekijaValimuisti();
  moduuli.avaaTekijaKortti(id, 'Aino Valokuvaaja');
  await odota('verkottoman kortin tilarivi', () => /saatavilla|ei löytynyt/
    .test(document.querySelector('.tekija-tila')?.textContent ?? ''));
  const teksti = document.querySelector('.tekija-tila').textContent;
  document.querySelector('.tekija-ikkuna')?.remove();
  return teksti;
}, TEKIJA_ID);
verkkoPoikki = false;

vaadi('verkotta kortti kertoo siististi ettei sivu ole saatavilla',
  /ei ole saatavilla juuri nyt/.test(verkotta), verkotta);

/* 4. Työhuoneen Lukijoilta-lehden pro-osio. */
const tyohuone = await sivu.evaluate(async () => {
  // Nimi mukaan: aikakatkaisu kertoo MIKÄ väite jäi toteutumatta.
  const odota = (nimi, ehto, ms = 8000) => new Promise((valmis, virhe) => {
    const takaraja = Date.now() + ms;
    const kierros = () => {
      if (ehto()) return valmis(true);
      if (Date.now() > takaraja) return virhe(new Error(`aikakatkaisu: ${nimi}`));
      return setTimeout(kierros, 50);
    };
    kierros();
  });
  localStorage.setItem('matkakirja-kehittaja', '1');
  localStorage.setItem('matkakirja-ehdotus-avain', 'savuke-avain');
  const ui = window.matkakirja.ui;
  /*
   * Kehittäjäkytkin on muistissa (js/ui-apurit.js, 28.8.2026): sivun
   * sisällä tehty localStorage-kirjoitus ei laukaise storage-tapahtumaa
   * omassa dokumentissaan, joten muisti on unohdettava erikseen. Sama
   * kaava kuin muissa savukevartijoissa.
   */
  ui.paivitaKehittajaTila();
  await ui.avaaLukijoiltaLehti();
  await odota('Lukijoilta-lehden pro-sivut', () => (ui.lehtitila.tutkiSivut ?? [])
    .some((s) => String(s.id).startsWith('lukijoilta-pro')));
  const sivut = ui.lehtitila.tutkiSivut ?? [];
  const yhteenveto = sivut.find((s) => s.id === 'lukijoilta-pro');
  const tuottajaSivu = sivut.find((s) => s.id === 'lukijoilta-pro-0');
  const nosto = tuottajaSivu?.nostot?.[0] ?? {};
  return {
    sivuja: sivut.length,
    yhteenvedonNapit: (yhteenveto?.nostot?.[0]?.toiminnot ?? []).map((t) => t.nimi),
    tuottajanNimi: tuottajaSivu?.nimi ?? '',
    tuottajanNapit: (nosto.toiminnot ?? []).map((t) => t.nimi),
    koodiNakyy: String(nosto.teksti ?? '').includes('AB3DEF4H'),
    tunnusNakyy: String(nosto.teksti ?? '').includes('k7m2p9xr4t'),
    kuvasivu: Boolean(tuottajaSivu?.nostot?.[1]?.kuvaUrl),
  };
});

vaadi('Lukijoilta-lehden perässä on pro-osio omalla sivullaan',
  tyohuone.yhteenvedonNapit.includes('Lisää pro-tuottaja'), JSON.stringify(tyohuone));
vaadi('tuottajan sivulla näkyvät koodi ja tekijätunnus',
  tyohuone.koodiNakyy === true && tyohuone.tunnusNakyy === true, JSON.stringify(tyohuone));
vaadi('odottavalla profiililla on Julkaise- ja Hylkää-napit',
  tyohuone.tuottajanNapit.includes('Julkaise') && tyohuone.tuottajanNapit.includes('Hylkää'),
  JSON.stringify(tyohuone.tuottajanNapit));
vaadi('odottavan profiilin kuva haetaan avaimellisesta osoitteesta',
  tyohuone.kuvasivu === true && kutsutut.some((k) => k.startsWith('GET /pro-lista')),
  JSON.stringify({ kuvasivu: tyohuone.kuvasivu, kutsutut }));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
