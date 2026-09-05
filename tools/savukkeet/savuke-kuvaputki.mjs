/*
 * Savuke: kuvien syöttöputki ja havainnekuvan selite selaimessa
 * (omistajan tilaukset 1.9.2026).
 *
 * Worker-testit (tests/kuvavinkki-worker.test.mjs) vartioivat reittiä
 * Nodessa. Tämä savuke vartioi sitä, mitä ne eivät näe: että pelin
 * pinnat oikeasti syntyvät ja toimivat selaimessa mock-Workeria vasten.
 *
 *   1. PISTEVIIVA OIKEISSA RIVEISSÄ. "Matkakirjan havainnekuva"
 *      -lähderivi saa painettavan selitteen; Commons-lähderivi EI saa.
 *      Väärä puoli tästä rajasta on se vika, joka näkyisi ruudulla vain
 *      hiuksenhienona viivana väärän tekstin alla — eli ei näkyisi.
 *   2. POPUP AUKEAA JA SULKEUTUU, ja sisältö on omistajan hyväksymä
 *      teksti (otsikko + kolme kappaletta + palautenappi).
 *   3. KAKSI VARIANTTIA. Ihmekortin lähderivi avaa ihmetekstin ("Mihin
 *      ihmeen kuva perustuu?"), tavallinen havainnekuvarivi tavallisen
 *      ("Miksi Matkakirjassa on havainnekuvia?"). Variantti tulee
 *      datasta (`ihmekuva`-lippu) ja varalta lähderivin sanoista.
 *   4. LOMAKE VAATII OIKEUSVAKUUTUKSEN. Kuva valittuna mutta rasti
 *      pois → lähetys ei lähde ja syy näkyy. Sama käyttöluvalle.
 *   5. WORKER-VIRHE (offline) antaa siistin ilmoituksen eikä jätä
 *      nappia jumiin.
 *
 * Worker ei ole pystyssä eikä sitä tarvita: kaikki pyynnöt
 * EHDOTUS_OSOITE-isännälle siepataan.
 *
 *   node tools/savukkeet/savuke-kuvaputki.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUSPOLKU
  ?? join(JUURI, 'tools/savukkeet/kaappaukset');
mkdirSync(KAAPPAUKSET, { recursive: true });

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

/** Kun tosi, /kuvavinkki katkeaa — savukkeen offline-väite. */
let verkkoPoikki = false;
const kutsutut = [];

async function mockWorker(sivu) {
  await sivu.route((url) => !['localhost', '127.0.0.1'].includes(url.hostname), async (reitti) => {
    const url = new URL(reitti.request().url());
    const polku = url.pathname;
    kutsutut.push(`${reitti.request().method()} ${polku}`);
    const jsonVastaus = (data, status = 200) => reitti.fulfill({
      status, contentType: 'application/json; charset=utf-8', body: JSON.stringify(data),
    });
    if (polku === '/kuvavinkki') {
      if (verkkoPoikki) return reitti.abort();
      return jsonVastaus({ ok: true, kansio: 'ehdotukset/2026-09-01-abc123', laji: 'kuvavinkki' });
    }
    // Pro-tarkistus: laitteella ei ole tunnusta, mutta reitti vastaa
    // siltä varalta että joku testi tallettaa sellaisen.
    if (polku === '/pro-tarkista') return jsonVastaus({ virhe: 'ei tunnusta' }, 401);
    return reitti.abort();
  });
}

/* ---------- ajo ---------- */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Rakentaa lähderivit sivulle ja palauttaa niiden tilan.
 *
 * Kutsuu peliä samalla tavalla kuin peli itse: `taytaLahderivi` on se
 * yksi apuri, jonka kautta jokainen lähderivi kulkee.
 */
const RAKENNA = async (sivu) => sivu.evaluate(async () => {
  const { taytaLahderivi } = await import('/js/tekijakortti.js');
  const vanha = document.getElementById('savuke-lahderivit');
  vanha?.remove();
  const sailio = document.createElement('div');
  sailio.id = 'savuke-lahderivit';
  sailio.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#f4ece0;'
    + 'padding:1rem;font:14px/1.5 system-ui;overflow:auto;';
  document.body.appendChild(sailio);

  const rivi = (nimi, lahde, kohde) => {
    const kehys = document.createElement('figure');
    kehys.style.margin = '0 0 1rem';
    const otsikko = document.createElement('div');
    otsikko.textContent = nimi;
    otsikko.style.cssText = 'font-weight:700;font-size:12px;opacity:.6';
    const kuva = document.createElement('img');
    kuva.src = 'assets/kartat/nostot/ei-tata-ole.webp';
    kuva.style.display = 'none';
    const el = document.createElement('span');
    el.className = 'nahtavyys-lahde';
    el.dataset.savuke = nimi;
    kehys.append(otsikko, kuva, taytaLahderivi(el, lahde, kohde));
    sailio.appendChild(kehys);
    return el;
  };

  // 1. Tavallinen havainnekuva (425 esiintymää pakoissa).
  rivi('havainnekuva', 'Matkakirjan havainnekuva',
    { osoite: 'assets/kartat/nostot/nosto-esimerkki.webp' });
  // 2. Kadonneen ihmeen rekonstruktio: lippu DATASSA (kohteenIhmekuva).
  rivi('ihme-lippu', 'Matkakirjan havainnekuva: kohteen loistoaika',
    { osoite: 'assets/kartat/ihmeet/ihme-kolossi.webp', ihmekuva: true });
  // 3. Loistoaikanosto: ei lippua, tunnistus lähderivin sanoista.
  rivi('ihme-teksti', 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
    { osoite: 'assets/kartat/nostot/nosto-kastrin-kyla-loistoaika.webp' });
  // 4. Commons-valokuva: EI saa saada selitettä.
  rivi('commons', 'Marsyas, Wikimedia Commons (CC BY 2.5)',
    { tiedosto: 'Antikythera_mechanism.jpg' });
  // 5. Tyhjä lähde: ei kaadu eikä keksi selitettä.
  rivi('tyhja', '', {});

  const napit = (nimi) => sailio.querySelector(`[data-savuke="${nimi}"] .havainnekuva-selite`);
  const tyyli = (nimi) => {
    const n = napit(nimi);
    if (!n) return null;
    const t = getComputedStyle(n);
    return { alaviiva: t.borderBottomStyle, leveys: t.borderBottomWidth, kursori: t.cursor };
  };
  return {
    havainnekuva: Boolean(napit('havainnekuva')),
    ihmeLippu: Boolean(napit('ihme-lippu')),
    ihmeTeksti: Boolean(napit('ihme-teksti')),
    commons: Boolean(napit('commons')),
    tyhja: Boolean(napit('tyhja')),
    napinTeksti: napit('havainnekuva')?.textContent ?? '',
    // Commons-rivin koko teksti on yhä paikallaan, mitään ei kadonnut.
    commonsTeksti: sailio.querySelector('[data-savuke="commons"]')?.textContent ?? '',
    tyyli: tyyli('havainnekuva'),
  };
});

/** Avaa selitteen ja lukee popupin sisällön. */
const AVAA = async (sivu, nimi) => sivu.evaluate((n) => {
  document.querySelector('.minipopup')?.remove();
  document.querySelector(`[data-savuke="${n}"] .havainnekuva-selite`).click();
  const popup = document.querySelector('.minipopup');
  if (!popup) return { auki: false };
  return {
    auki: true,
    otsikko: popup.querySelector('.minipopup-otsikko')?.textContent ?? '',
    kappaleita: popup.querySelectorAll('.minipopup-teksti').length,
    teksti: popup.textContent,
    nappi: popup.querySelector('.havainnekuva-palautenappi')?.textContent ?? '',
    luokka: popup.querySelector('.minipopup-kortti')?.className ?? '',
  };
}, nimi);

async function ajo(nimiLaite, viewport) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  const sivu = await ctx.newPage();
  await mockWorker(sivu);
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForFunction(() => window.matkakirja, null, { timeout: 30000 });

  /* --- 1. Pisteviiva oikeissa riveissä --- */
  const rivit = await RAKENNA(sivu);
  vaadi(`${nimiLaite}: havainnekuvarivi saa selitteen`, rivit.havainnekuva);
  vaadi(`${nimiLaite}: Commons-rivi EI saa selitettä`, !rivit.commons,
    'Commons-lähde sai havainnekuvaselitteen');
  vaadi(`${nimiLaite}: tyhjä lähde ei saa selitettä`, !rivit.tyhja);
  vaadi(`${nimiLaite}: napin teksti on lähderivin oma sanapari`,
    rivit.napinTeksti === 'Matkakirjan havainnekuva', rivit.napinTeksti);
  vaadi(`${nimiLaite}: Commons-rivin teksti säilyy kokonaan`,
    rivit.commonsTeksti.includes('Marsyas') && rivit.commonsTeksti.includes('CC BY 2.5'));
  vaadi(`${nimiLaite}: alleviivaus on pisteviiva`,
    rivit.tyyli?.alaviiva === 'dotted' && rivit.tyyli?.leveys === '1px',
    JSON.stringify(rivit.tyyli));
  vaadi(`${nimiLaite}: selite on napautettava (cursor)`,
    rivit.tyyli?.kursori === 'pointer', JSON.stringify(rivit.tyyli));

  /* --- 1b. Kohtaamiskortin KIINTEÄ lähderivi (v1413, index.html) --- *
   *
   * Tämä on talon ainoa lähderivi, joka ei kulje taytaLahderivin kautta:
   * se on kirjoitettu suoraan HTML:ään. Ilman omaa väitettä se olisi
   * juuri se rivi, joka unohtuisi.
   */
  const kohtaaminen = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.naytaKohtaamiskuva({
      osoite: 'assets/kohtaamiskuvat/ei-tata-ole.webp',
      kuvateksti: 'Aarre löytyi kujan päästä.',
      alt: 'Kohtaaminen',
      valokuva: true,
    });
    const rivi = document.querySelector('#quiz-kohtaaminen-kuvateksti .kuvalahde');
    return {
      loytyi: Boolean(rivi),
      nappi: Boolean(rivi?.querySelector('.havainnekuva-selite')),
      teksti: rivi?.textContent ?? '',
    };
  });
  vaadi(`${nimiLaite}: kohtaamiskortin "Matkakirjan kuvitus" saa selitteen`,
    kohtaaminen.loytyi && kohtaaminen.nappi, JSON.stringify(kohtaaminen));
  vaadi(`${nimiLaite}: kohtaamiskortin lähderivin teksti säilyy`,
    kohtaaminen.teksti === 'Matkakirjan kuvitus', kohtaaminen.teksti);

  /* --- 2–3. Popup, sen sisältö ja kaksi varianttia --- */
  const tavallinen = await AVAA(sivu, 'havainnekuva');
  vaadi(`${nimiLaite}: popup aukeaa`, tavallinen.auki);
  vaadi(`${nimiLaite}: tavallinen variantti — otsikko`,
    tavallinen.otsikko === 'Miksi Matkakirjassa on havainnekuvia?', tavallinen.otsikko);
  vaadi(`${nimiLaite}: tavallinen variantti — kolme kappaletta`,
    tavallinen.kappaleita === 3, `${tavallinen.kappaleita}`);
  vaadi(`${nimiLaite}: tavallinen variantti — hyväksytty aloitus`,
    tavallinen.teksti.includes('Vapaasti käytettäviä valokuvia on maailman kohteista vain'));
  vaadi(`${nimiLaite}: palautenapin teksti`,
    tavallinen.nappi === 'Lähetä palautetta tästä kuvasta', tavallinen.nappi);

  await sivu.screenshot({
    path: join(KAAPPAUKSET, `kuvaputki-${nimiLaite}-popup-havainnekuva.png`),
  });

  const ihme = await AVAA(sivu, 'ihme-lippu');
  vaadi(`${nimiLaite}: ihmekortin rivi avaa IHMEVARIANTIN`,
    ihme.otsikko === 'Mihin ihmeen kuva perustuu?', ihme.otsikko);
  vaadi(`${nimiLaite}: ihmevariantti — hyväksytty aloitus`,
    ihme.teksti.includes('Kadonneesta ihmeestä ei ole valokuvaa'));
  vaadi(`${nimiLaite}: ihmevariantti — kolme kappaletta`, ihme.kappaleita === 3);
  vaadi(`${nimiLaite}: ihmevariantin luokka erottuu`, ihme.luokka.includes('havainnekuva-ihme'));

  await sivu.screenshot({
    path: join(KAAPPAUKSET, `kuvaputki-${nimiLaite}-popup-ihme.png`),
  });

  const ihmeTeksti = await AVAA(sivu, 'ihme-teksti');
  vaadi(`${nimiLaite}: "loistoaikansa asussa" avaa myös ihmevariantin`,
    ihmeTeksti.otsikko === 'Mihin ihmeen kuva perustuu?', ihmeTeksti.otsikko);

  // Sulkeutuminen: ruksi vie ikkunan pois DOMista.
  const suljettu = await sivu.evaluate(async () => {
    document.querySelector('.minipopup .minipopup-sulje').click();
    await new Promise((ok) => setTimeout(ok, 120));
    return !document.querySelector('.minipopup');
  });
  vaadi(`${nimiLaite}: popup sulkeutuu ruksista`, suljettu);

  /* --- 4. Lomake vaatii oikeusvakuutuksen --- */
  const lomake = await sivu.evaluate(async () => {
    const odota = (nimi, ehto, ms = 4000) => new Promise((valmis, virhe) => {
      const takaraja = Date.now() + ms;
      const kierros = () => {
        if (ehto()) return valmis(true);
        if (Date.now() > takaraja) return virhe(new Error(`aikakatkaisu: ${nimi}`));
        return setTimeout(kierros, 40);
      };
      kierros();
    });
    document.querySelector('.minipopup')?.remove();
    document.querySelector('[data-savuke="havainnekuva"] .havainnekuva-selite').click();
    document.querySelector('.havainnekuva-palautenappi').click();
    await odota('lomake popupissa', () => document.querySelector('.kuvavinkki'));

    const lohko = document.querySelector('.kuvavinkki');
    const nappi = lohko.querySelector('.kuvavinkki-laheta');
    const huomio = lohko.querySelector('.kuvavinkki-huomio');
    const oikeudet = lohko.querySelector('.kuvavinkki-oikeudet');
    const rasti = lohko.querySelector('.kuvavinkki-omakuva');
    const lupa = lohko.querySelector('.kuvavinkki-kayttolupa');
    const teksti = lohko.querySelector('.kuvavinkki-teksti');

    const kohderivi = lohko.querySelector('.kuvavinkki-kohde')?.textContent ?? '';
    const oikeudetPiilossaAluksi = oikeudet.hidden;

    // Ilman kuvaa ja ilman tekstiä: ei lähde.
    nappi.click();
    await odota('tyhjän lomakkeen huomio', () => huomio.textContent.length > 0);
    const tyhjaViesti = huomio.textContent;

    /*
     * KUVA VALITUKSI OIKEASTI: DataTransfer antaa input[type=file]:lle
     * aidon FileListin, joten change-käsittelijä (skaalaus, oikeuslohkon
     * paljastus) ajetaan samalla koodilla kuin pelaajalla.
     */
    const kentta = lohko.querySelector('.kuvavinkki-kuvat');
    // 2×2 punainen png.
    const tavut = Uint8Array.from(atob(
      'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVR42mP8z8BQz0AEYBxVSF'
      + '+FABJADveWkH6oAAAAAElFTkSuQmCC',
    ), (c) => c.charCodeAt(0));
    const dt = new DataTransfer();
    dt.items.add(new File([tavut], 'laatta.png', { type: 'image/png' }));
    kentta.files = dt.files;
    kentta.dispatchEvent(new Event('change'));
    await odota('kuva valmistui', () => (lohko.querySelector('.kuvavinkki-tieto')?.textContent ?? '')
      .includes('valmiina'));
    const oikeudetNakyvat = !oikeudet.hidden;

    // Kuva valittuna, rasti pois: lähetys ei lähde.
    rasti.checked = false;
    huomio.textContent = '';
    nappi.click();
    await odota('oikeusvakuutuksen vaatimus', () => huomio.textContent.length > 0);
    const ilmanRastia = huomio.textContent;

    // Rasti päälle mutta lupa valitsematta: ei vieläkään.
    rasti.checked = true;
    lupa.value = '';
    huomio.textContent = '';
    nappi.click();
    await odota('käyttöluvan vaatimus', () => huomio.textContent.length > 0);
    const ilmanLupaa = huomio.textContent;

    // Lomake jätetään tähän täytettynä kuvakaappausta varten: juuri
    // tässä tilassa oikeuslohko on näkyvissä ja molemmat pakolliset
    // valinnat ovat ruudulla.
    lupa.value = 'sellaisenaan';
    teksti.value = 'Torni oli kuvassa väärällä puolella.';
    lohko.scrollIntoView({ block: 'start' });

    return {
      kohderivi,
      oikeudetPiilossaAluksi,
      oikeudetNakyvat,
      tyhjaViesti,
      ilmanRastia,
      ilmanLupaa,
      lupavaihtoehdot: [...lupa.options].map((o) => o.value),
    };
  });

  await sivu.screenshot({
    path: join(KAAPPAUKSET, `kuvaputki-${nimiLaite}-lomake.png`),
  });

  // Vasta nyt lähetys: kuvakaappaus on otettu täytetystä lomakkeesta.
  const laheta = await sivu.evaluate(async () => {
    const odota = (ehto, ms = 6000) => new Promise((valmis, virhe) => {
      const takaraja = Date.now() + ms;
      const kierros = () => {
        if (ehto()) return valmis(true);
        if (Date.now() > takaraja) return virhe(new Error('aikakatkaisu'));
        return setTimeout(kierros, 40);
      };
      kierros();
    });
    const lohko = document.querySelector('.kuvavinkki');
    const nappi = lohko.querySelector('.kuvavinkki-laheta');
    const huomio = lohko.querySelector('.kuvavinkki-huomio');
    nappi.click();
    await odota(() => huomio.textContent.includes('Kiitos'));
    return { kuittaus: huomio.textContent, napinTeksti: nappi.textContent };
  });

  vaadi(`${nimiLaite}: palautelomake tietää mistä kuvasta on kyse`,
    lomake.kohderivi.includes('Matkakirjan havainnekuva'), lomake.kohderivi);
  vaadi(`${nimiLaite}: oikeuslohko on piilossa ennen kuvaa`, lomake.oikeudetPiilossaAluksi);
  vaadi(`${nimiLaite}: oikeuslohko paljastuu kuvan myötä`, lomake.oikeudetNakyvat);
  vaadi(`${nimiLaite}: tyhjä palaute torjutaan`,
    /Kirjoita palaute tai liitä kuva/.test(lomake.tyhjaViesti), lomake.tyhjaViesti);
  vaadi(`${nimiLaite}: LÄHETYS VAATII OIKEUSVAKUUTUKSEN`,
    /itse ottamasi/i.test(lomake.ilmanRastia), lomake.ilmanRastia);
  vaadi(`${nimiLaite}: LÄHETYS VAATII KÄYTTÖLUVAN`,
    /käyttö|taustatie/i.test(lomake.ilmanLupaa), lomake.ilmanLupaa);
  vaadi(`${nimiLaite}: käyttölupavalikko on suljettu lista + tyhjä`,
    lomake.lupavaihtoehdot.join(',') === ',sellaisenaan,taustatieto',
    lomake.lupavaihtoehdot.join(','));
  vaadi(`${nimiLaite}: onnistunut lähetys kuittaa pelaajalle`,
    laheta.kuittaus.includes('Kiitos'), laheta.kuittaus);
  vaadi(`${nimiLaite}: nappi kertoo lähetyksen menneen`,
    laheta.napinTeksti === 'Lähetetty', laheta.napinTeksti);
  vaadi(`${nimiLaite}: /kuvavinkki-reittiä kutsuttiin`,
    kutsutut.includes('POST /kuvavinkki'), kutsutut.join(' | '));

  /* --- 5. Worker-virhe: siisti ilmoitus, nappi ei jää jumiin --- */
  verkkoPoikki = true;
  const offline = await sivu.evaluate(async () => {
    const odota = (ehto, ms = 8000) => new Promise((valmis, virhe) => {
      const takaraja = Date.now() + ms;
      const kierros = () => {
        if (ehto()) return valmis(true);
        if (Date.now() > takaraja) return virhe(new Error('aikakatkaisu'));
        return setTimeout(kierros, 40);
      };
      kierros();
    });
    document.querySelector('.minipopup')?.remove();
    document.querySelector('[data-savuke="havainnekuva"] .havainnekuva-selite').click();
    document.querySelector('.havainnekuva-palautenappi').click();
    await odota(() => document.querySelector('.kuvavinkki'));
    const lohko = document.querySelector('.kuvavinkki');
    const nappi = lohko.querySelector('.kuvavinkki-laheta');
    const huomio = lohko.querySelector('.kuvavinkki-huomio');
    lohko.querySelector('.kuvavinkki-teksti').value = 'Kuva on väärin.';
    nappi.click();
    await odota(() => huomio.textContent.includes('ei onnistunut'));
    return { viesti: huomio.textContent, nappiKaytossa: !nappi.disabled };
  });
  verkkoPoikki = false;

  vaadi(`${nimiLaite}: worker-virhe antaa siistin ilmoituksen`,
    offline.viesti.includes('Lähetys ei onnistunut')
      && offline.viesti.includes('Kokeile hetken päästä uudelleen'), offline.viesti);
  vaadi(`${nimiLaite}: nappi ei jää jumiin virheen jälkeen`, offline.nappiKaytossa);
  // Verkkokatko on selaimen englanninkielinen "Failed to fetch"; pelaaja
  // saa sen sijaan suomenkielisen syyn.
  vaadi(`${nimiLaite}: virheilmoitus on suomeksi eikä paljasta selaimen sisuksia`,
    /yhteyttä ei saatu/.test(offline.viesti)
      && !/TypeError|Failed to fetch|NetworkError/.test(offline.viesti), offline.viesti);

  await sivu.screenshot({
    path: join(KAAPPAUKSET, `kuvaputki-${nimiLaite}-virhe.png`),
  });

  /* --- Valikon sisäänkäynti: "Vinkkaa paikasta kuvalla" --- */
  const valikko = await sivu.evaluate(async () => {
    document.querySelector('.minipopup')?.remove();
    document.getElementById('savuke-lahderivit')?.remove();
    const lohko = window.matkakirja.ui.periaatePalaute();
    /*
     * Aloitusruudun peite on koko pelin päällä, ja valikon lomake
     * jäisi sen alle — väitteet menisivät silti läpi, mutta
     * kuvakaappaus olisi pelkkä sumea kansikuva. Nostetaan lohko
     * omaksi kerroksekseen, jotta kaappaus näyttää sen mitä se väittää.
     */
    lohko.style.cssText = 'position:fixed;inset:0;z-index:99999;overflow:auto;'
      + 'background:#f4ece0;padding:1rem;';
    document.body.appendChild(lohko);
    const osio = lohko.querySelector('.periaate-kuvavinkki');
    if (!osio) return { osioLoytyi: false };
    const otsikko = osio.querySelector('summary')?.textContent ?? '';
    osio.open = true;
    osio.dispatchEvent(new Event('toggle'));
    await new Promise((ok) => setTimeout(ok, 150));
    const lomake = osio.querySelector('.kuvavinkki');
    osio.scrollIntoView({ block: 'start' });
    return {
      osioLoytyi: true,
      otsikko,
      lomakeSyntyi: Boolean(lomake),
      paikkaPakollinen: Boolean(lomake?.querySelector('.kuvavinkki-paikka')),
      oikeuslohko: Boolean(lomake?.querySelector('.kuvavinkki-oikeudet')),
      // Valikon vinkissä oikeudet näkyvät heti: kuva on lomakkeen ydin.
      oikeudetNakyvissa: !lomake?.querySelector('.kuvavinkki-oikeudet')?.hidden,
    };
  });
  vaadi(`${nimiLaite}: valikossa on "Vinkkaa paikasta kuvalla"`,
    valikko.osioLoytyi && valikko.otsikko.includes('Vinkkaa paikasta kuvalla'),
    JSON.stringify(valikko));
  vaadi(`${nimiLaite}: valikon lomake syntyy avattaessa`, valikko.lomakeSyntyi);
  vaadi(`${nimiLaite}: valikon lomakkeessa on paikka ja oikeuslohko`,
    valikko.paikkaPakollinen && valikko.oikeuslohko);

  await sivu.screenshot({
    path: join(KAAPPAUKSET, `kuvaputki-${nimiLaite}-valikko.png`), fullPage: false,
  });

  await ctx.close();
}

await ajo('iphone', { width: 390, height: 844 });
await ajo('ipad', { width: 820, height: 1180 });

await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
console.log(`kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
