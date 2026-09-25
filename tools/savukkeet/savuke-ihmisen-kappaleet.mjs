/*
 * SELAINSAVUKE: IHMISEN MATKA — PULU POIS, LYHYET KAPPALEET, HITAAMPI
 * MAAPALLON ZOOM.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-ihmisen-kappaleet.mjs
 *
 * OMISTAJA 16.9.2026 klo 15.40 UTC (kaksi iPhone-kuvaa avaruusvaiheen
 * jälkeen, 95 521 ja 81 675 v. sitten), sanatarkasti: *"Ota pulu pois
 * näkyvistä ja ota simpukka kommentti pois kokonaan. Pulu näkyviin
 * vasta kun linssin animaatio on ohi. Tee tekstityksestä lyhyempiä
 * kappaleita, että ei mene niin paljon kartan päälle."*
 *
 * JATKO 3 TARKENNUS 2 (omistaja 16.9.2026 klo 18.50 UTC, iPhone-kuva
 * v1924: 300 000 v. sitten, kartta zoomattuna Guineanlahdelle liian
 * lähelle, sanatarkasti): *"Uusi zoomaus-animaatio Zoomaan jostain
 * syysta nain lahelle, ja alkuzoomaus on edelleen liian kiireinen. Tee
 * vain se 5sek hitaampi sisaan zoomaus, ja aloita siten vasta
 * liikuttamaan kohti Marokkoa. Ei haittaa, vaikka Marokon teksti alkaa
 * tulla ennen kuin kartta on zoomautunut sinne asti. Kokoon on."* Tämä
 * KUMOAA saman päivän klo 17.15 päätöksen (*"Zoomin jatko 2–3 s"*):
 * jatko on viisi sekuntia, ja Marokon ajo pitää entisen pituutensa, eli
 * SAAPUMINEN SIIRTYY.
 *
 * MIKSI OMA SAVUKE. savuke-ihmisen-kehys.mjs mittaa kehyksen paluun
 * avaruusvaiheessa (0–20 s). Tässä katsotaan koko esityksen mittaa:
 * pulun näkyvyys, tekstilaatikon korkeus JOKAISESSA näytetyssä osassa
 * ja kameran korkeuden aikasarja.
 *
 * VÄITTEET (390 × 844 ja 1400 × 900):
 *   1. PULU EI NÄY ESITYKSEN AIKANA. Sarjassa (3 s:n välein mustasta
 *      kartta-animaatioon) jokainen näyte kertoo pulun napin,
 *      paneelin ja kasvokankaan olevan `visibility: hidden` ja
 *      body-luokan `aikajana-pulu-piilossa` olevan päällä. Näytteitä
 *      vähintään viisi.
 *   1b. PULU TULEE LOPUSSA. Aikaselaimesta hypätään viimeiseen
 *      jaksoon; kun esitys päättyy, pulu kävelee ruudulle ja on
 *      mitattavissa näkyvänä.
 *   1c. VASTAKOE: kun piiloluokka otetaan käsin pois kesken esityksen,
 *      pulu on heti näkyvissä — eli mitta osoittaa oikeaa asiaa.
 *   1d. POISTETTU v1944:ssä: pluskupla (.pollo-kuplapalautus) oli
 *      `position: fixed` -nappi BODYN suorana lapsena ja jäi omistajan
 *      puhelimella kellumaan esityksen päälle. Elementtiä ei enää
 *      luoda (Raamattu, PAATOKSET 34 kohta 20); paluureitti kupliin on
 *      chatin ylärivin painike paneelin sisällä, ja vartio 1 mittaa jo
 *      paneelin piilotuksen.
 *   2. PULUN SIMPUKKAKOMMENTTI EI OLE DOMISSA missään esityksen
 *      kohdassa (omistajan KORJAUS 17.9.2026 klo 03.40 UTC: *"Se
 *      simpukka tarkoitti pulun simpukka kommenttia. Ei kertojan."*).
 *      Pulun kupla (.aikajana-kertomus-pulu) ei sisällä sanaa
 *      "Simpukoita" eikä repliikki ole missään DOMissa.
 *   2b. KERTOJAN SIMPUKKAVIRKE ON RUUDULLA 'arabia'-jaksossa: teksti
 *      "okraa punaiseksi ... simpukankuoria helmiksi" ladotaan
 *      laatikkoon kuten ennen v1926:ta. VASTAKOE: v1926:n lyhennetty
 *      kappale ei sisällä sitä, ja sen virkemäärä (5) ei osu ämpärin
 *      kuuteen lauseleimaan.
 *   3. LAATIKKO ON MATALA. Jokaisen kaanonin osan teksti ladotaan
 *      oikeaan laatikkoon oikealla ruudulla, ja mitattu korkeus on
 *      enintään 30 % kartan korkeudesta. 390 px on se mitta, jonka
 *      omistaja näki (kuvissa laatikko vei ~45 %).
 *   3b. VASTAKOE: koko kappale yhtenä laatikkona (vanha käytös) on
 *      selvästi korkeampi — pisin kappale ylittää rajan.
 *   4. ZOOMI KESTÄÄ PIDEMPÄÄN. Esityksen omista mittareista luettu
 *      `avauksenVaiheet` kertoo `zoomKesto`n olevan vanha
 *      (`zoomPerus`) + ZOOMIN_JATKO_MS (4 000 ms, JATKO 4; ennen 5 000),
 *      sallittu heitto 1 ms — luku tulee samasta puhtaasta funktiosta.
 *   4b. KOKO AFRIKKA RUUDULLA AVAUKSEN LOPUSSA (TARKENNUS 2 kohta 3).
 *      Esitys pysäytetään sillä silmänräpäyksellä, jolla zoomi on
 *      perillä (`kohdeajoOdottaa`), ja Afrikan neljä kärkeä mitataan
 *      laudan omalla `ruudulla`-projektiolla. VASTAKOE: sama laatikko
 *      ilman `kokonaan`-lippua — laudan saapumissääntö
 *      (korkeuteenSovitus) vie kameran lähemmäs ja siirtää
 *      X-keskipisteen pelaajan kaupungin pituusasteelle, jolloin itä-
 *      ja länsikärki jäävät ruudun ulkopuolelle.
 *   4c. ZOOMIKATTO EI PALAA MAAHAN KESKEN ESITYKSEN. OrbitControlsin
 *      `maxDistance` korkeutena on avaruusvaiheessa AVARUUDEN_KORKEUS
 *      ja sen jälkeen PALLO_KORKEUS_MAX — ei koskaan pelaajan maan
 *      uloszoomausesto (Ateenassa 0,1431), joka puristi kameran
 *      1,1734 → 0,1431 juuri valojen syttyessä.
 *   5. KAMERAN KÄYRÄ (vain 390 px, ks. KAMERASARJA_LEVEYDET). Zoomin
 *      aikasarjassa korkeus laskee monotonisesti eikä siinä ole
 *      tasannetta; tasanne on vain zoomin jälkeisessä tauossa, jonka
 *      esitys kertoo lipulla `kohdeajoOdottaa`. Marokon ajon
 *      ensimmäisellä kolmanneksella kuljetaan alle neljännes matkasta
 *      — ja aina eteenpäin.
 *   6. MAROKON AJO ALKAA VASTA ZOOMIN JÄLKEEN JA PITÄÄ ENTISEN
 *      PITUUTENSA (TARKENNUS 2 kohta 2): ajo ei ole käynnissä ennen
 *      kuin zoomi on perillä, ja esityksen oma mittari
 *      `kohdeajonMyohassa` (ajon kesto miinus jäljellä oleva aika
 *      jaksoon) on tasan ZOOMIN_JATKO_MS — eli kamera on perillä vasta
 *      jakson alettua. Luku luetaan MALLISTA eikä seinäkellosta:
 *      savukkeen väärennetty äänite ei kulje kaanonin varakestojen
 *      tahtia, joten jakson vaihtuminen ruudulla ei kerro, missä
 *      kohtaa malli luulee jakson alkavan. Kertomuksen ajoitus ei
 *      muutu: avauksen `musta`, `piste`, `zoomAlku` ja `afrikka` ovat
 *      samat kuin ilman jatkoa.
 *   7. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio):
 *   savuke-ihmisen-kappaleet-<leveys>.jpg       Arabia-kohta, ei pulua
 *   savuke-ihmisen-kappaleet-vastakoe-<leveys>.png  koko kappale kerralla
 *   savuke-ihmisen-kappaleet-<leveys>.json      sarjat ja mitat
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const JUURI = join(import.meta.dirname, '..', '..');
const PORTTI = 8766;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/** Hiljaisuus WAV:na — ämpärissä ei ole kertomusluentoja (ks. esityssavuke). */
function hiljaisuusWav(sekunteja = 3, hz = 8000) {
  const tavuja = hz * sekunteja * 2;
  const p = Buffer.alloc(44 + tavuja);
  p.write('RIFF', 0); p.writeUInt32LE(36 + tavuja, 4); p.write('WAVE', 8); p.write('fmt ', 12);
  p.writeUInt32LE(16, 16); p.writeUInt16LE(1, 20); p.writeUInt16LE(1, 22);
  p.writeUInt32LE(hz, 24); p.writeUInt32LE(hz * 2, 28); p.writeUInt16LE(2, 32);
  p.writeUInt16LE(16, 34); p.write('data', 36); p.writeUInt32LE(tavuja, 40);
  return p;
}
const HILJAISUUS = hiljaisuusWav(3);
const HILJAISUUS_AVAUS = hiljaisuusWav(18);

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const virheet = [];
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* Kaanoni ja jakofunktio suoraan lähteestä: savuke mittaa sitä, mitä peli näyttää. */
const { IHMISEN_MATKA_KERTOMUS } = await import(join(JUURI, 'js/linssit/ihmisen-matka-kertomus.js'));
const {
  jaaOsiin, OSAN_MERKIT, ZOOMIN_JATKO_MS, AVARUUDEN_KORKEUS, avauksenVaiheet,
} = await import(join(JUURI, 'js/linssit/ihmisen-matka-esitys.js'));
const { PALLO_KORKEUS_MAX } = await import(join(JUURI, 'js/pallolauta/kamera.js'));
/**
 * AFRIKAN NELJÄ KÄRKEÄ (ESITYKSEN_ALUEET afrikka: lat −35…37, lon
 * −18…52). Nämä pisteet omistaja näkee tai ei näe puhelimellaan.
 */
const AFRIKAN_KARJET = {
  pohjoinen: [37.3, 9.9], etela: [-34.8, 20.0], lansi: [14.7, -17.5], ita: [10.4, 51.4],
};
const KAIKKI_OSAT = IHMISEN_MATKA_KERTOMUS.flatMap((j) => jaaOsiin(j.teksti)
  .map((o, i) => ({ jakso: j.id, osa: i, teksti: o.teksti })));
/** Kertojan virke, joka PALAUTETTIIN 17.9.2026 (sen pitää näkyä). */
const KERTOJAN_SIMPUKKA = /simpukanku|okraa punaiseksi|helmiksi/i;
/** Pulun poistettu repliikki (sitä EI saa näkyä missään). */
const PULUN_SIMPUKKA = /Simpukoita\. Hyvä alku/;
/** Ruudut, joilla kameran aikasarja on tarpeeksi tiheä mitattavaksi. */
const KAMERASARJA_LEVEYDET = [390];
/*
 * VASTAKOKEEN VERTAILUKOHTA: 'arabia'-kappale YHDESSÄ LAATIKOSSA, kuten
 * ennen 16.9.2026. Juuri tämä näkyi omistajan iPhone-kuvassa. Teksti on
 * sama kuin kaanonissa (kertojan virke palautettiin 17.9.2026), joten
 * vastakoe mittaa nyt pelkkää kappalejakoa — sitä varten se on.
 */
const ARABIA_ENNEN = {
  id: 'arabia (ennen 16.9.)',
  teksti: 'Sitten kului taas pitkä aika. Etelän rannikolla ehdittiin hioa okraa '
    + 'punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin ylitys Arabian '
    + 'niemimaalle onnistui. Silloin Arabia oli vihreä: autiomaan paikalla oli '
    + 'järviä ja ruohoa. Yhden järven rannalta on löydetty yksi ainoa sormiluu. '
    + 'Se riittää todisteeksi. Tästä ihmiset lähtivät kohti Aasiaa, eivätkä enää '
    + 'palanneet.',
};

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

/** Sivu pystyyn yhdelle näkymälle: samat reitit kuin kehyssavukkeella. */
async function avaaSivu(leveys, korkeus) {
  const konteksti = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(`${leveys}px: ${e}`));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await s.route(/\/puhe\/|\/aanet\//, (route) => route.fulfill({
    status: 200,
    contentType: 'audio/wav',
    body: /kertomus-(avaus|afrikka|jebel-irhoud)\./.test(route.request().url()) ? HILJAISUUS_AVAUS : HILJAISUUS,
    headers: { 'access-control-allow-origin': '*' },
  }));
  return { s, konteksti };
}

/** Peli auki, pelaaja Ateenaan, pallolauta pystyyn ja linssi laukusta. */
async function avaaLinssi(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForTimeout(1200);
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  const lahto = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) { if (ui.aikajana) break; await new Promise((r) => setTimeout(r, 25)); }
    const ajo = ui.aikajana;
    if (!ajo?.virrat) return { ok: false };
    await ajo.virrat.valmis;
    return { ok: true, vanoja: ajo.virrat.tila().vanoja };
  });
  return { pallo, lahto };
}

/** Yksi näyte: pulun näkyvyys, teksti ruudulla, kameran korkeus. */
const NAYTE = () => {
  const juuri = document.querySelector('.aikajana');
  const nappi = document.querySelector('.pollo-nappi');
  const paneeli = document.querySelector('.pollo-paneeli');
  const kasvot = document.querySelector('.livia-kasvot-pinta');
  const laatikko = juuri?.querySelector('.aikajana-kertomusteksti-sisus');
  const rivi = juuri?.querySelector('.aikajana-kertomusteksti');
  const nakyy = (el) => (el ? getComputedStyle(el).visibility !== 'hidden' : null);
  const laatikonRuutu = laatikko?.getBoundingClientRect();
  const karttaRuutu = juuri?.getBoundingClientRect();
  const t = window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? {};
  const pov = window.matkakirja.ui.pallolauta?.pallo?.pointOfView?.() ?? null;
  // Zoomikatto korkeutena: laudan maakohtainen esto näkyisi tässä.
  const ohj = window.matkakirja.ui.pallonInstanssi?.controls?.() ?? null;
  const sade = window.matkakirja.ui.pallonInstanssi?.getGlobeRadius?.() ?? 0;
  return {
    katto: ohj && sade > 0 ? +(ohj.maxDistance / sade - 1).toFixed(4) : null,
    piiloluokka: document.body.classList.contains('aikajana-pulu-piilossa'),
    puluNappi: nakyy(nappi),
    puluPaneeli: nakyy(paneeli),
    puluKasvot: nakyy(kasvot),
    // Pulu on NÄKYVISSÄ vain, jos nappi on olemassa eikä ole piilotettu.
    puluNakyy: Boolean(nappi) && nakyy(nappi) === true,
    teksti: laatikko?.textContent ?? '',
    // Pulun välihuomiokupla (js/linssit/ihmisen-matka-esitys.js luokka)
    // ja koko sivun teksti: poistettu repliikki ei saa näkyä kummassakaan.
    puluKuplaTeksti: [...document.querySelectorAll('.aikajana-kertomus-pulu, .pollo-kupla')]
      .map((el) => el.textContent ?? '').join(' '),
    sivunTeksti: document.body?.textContent ?? '',
    tekstiNakyy: Boolean(laatikko && Number(getComputedStyle(laatikko).opacity) > 0.05
      && Number(getComputedStyle(rivi).opacity) > 0.05),
    laatikko: laatikonRuutu ? Math.round(laatikonRuutu.height) : 0,
    kartta: karttaRuutu ? Math.round(karttaRuutu.height) : 0,
    jakso: t.jakso ?? null,
    vaihe: t.vaihe ?? null,
    paattynyt: Boolean(t.paattynyt),
    puluPiilossa: Boolean(t.puluPiilossa),
    puluTullut: Boolean(t.puluTullut),
    kohdeajoOdottaa: Boolean(t.kohdeajoOdottaa),
    kohdeajo: t.kohdeajo ?? null,
    vaiheet: t.avauksenVaiheet ?? null,
    alt: pov ? +pov.altitude.toFixed(4) : null,
    lat: pov ? +pov.lat.toFixed(3) : null,
    lng: pov ? +pov.lng.toFixed(3) : null,
  };
};

async function mittaa(leveys, korkeus) {
  const { s, konteksti } = await avaaSivu(leveys, korkeus);
  const { pallo, lahto } = await avaaLinssi(s);
  vaadi(`${leveys}px: linssi laukusta, vanat valmiina`, pallo && lahto.ok && lahto.vanoja >= 15, JSON.stringify(lahto));
  if (!pallo || !lahto.ok) { await konteksti.close(); return null; }

  /*
   * KAMERAN AIKASARJA SIVUN SISÄLLÄ. Jokainen evaluate maksaa kontissa
   * oman aikansa, joten 250 ms:n näytteenotto ei onnistuisi
   * evaluate-silmukalla: sarja kerätään sivulla omalla ajastimellaan ja
   * luetaan kerralla ulos.
   */
  await s.evaluate((karjet) => {
    window.__kamerasarja = [];
    /*
     * AVAUKSEN LOPPUASENTO TALTEEN SIVUN SISÄLLÄ (väite 4b). Kontissa
     * yksi evaluate maksaa satoja millisekunteja, joten ulkopuolinen
     * silmukka ei osuisi zoomin ja Marokon ajon väliseen 1,2 sekunnin
     * taukoon lainkaan — mitattu 16.9.2026: ensimmäinen osuma oli jo
     * keskellä Marokon ajoa.
     */
    window.__avausLoppu = null;
    const t0 = performance.now();
    window.__kameravahti = setInterval(() => {
      const ui = window.matkakirja.ui;
      const lauta = ui.pallolauta;
      const pov = lauta?.pallo?.pointOfView?.();
      const t = ui.aikajana?.esitys?.tila?.() ?? {};
      if (!pov) return;
      const ohj = ui.pallonInstanssi?.controls?.();
      const sade = ui.pallonInstanssi?.getGlobeRadius?.() ?? 0;
      const nayte = {
        ms: Math.round(performance.now() - t0),
        alt: +pov.altitude.toFixed(4),
        lat: +pov.lat.toFixed(3),
        lng: +pov.lng.toFixed(3),
        katto: ohj && sade > 0 ? +(ohj.maxDistance / sade - 1).toFixed(4) : null,
        jakso: t.jakso ?? null,
        odottaa: Boolean(t.kohdeajoOdottaa),
        vaiheet: t.avauksenVaiheet ?? null,
        kohdeajo: t.kohdeajo ?? null,
        myohassa: t.kohdeajonMyohassa ?? null,
      };
      window.__kamerasarja.push(nayte);
      if (nayte.odottaa && !window.__avausLoppu) {
        const ruudulla = {};
        for (const [nimi, [lat, lng]] of Object.entries(karjet)) {
          ruudulla[nimi] = Boolean(lauta.ruudulla?.(lat, lng, 0));
        }
        window.__avausLoppu = {
          ...nayte,
          kotelo: { w: lauta.kotelo.clientWidth, h: lauta.kotelo.clientHeight },
          karjet: ruudulla,
        };
      }
    }, 250);
  }, AFRIKAN_KARJET);

  /* Käynnistä-nappi: musta ruutu, avausluenta, avaruusvaihe. */
  await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());

  /* --- 1. PULU POISSA: näytteet 3 s:n välein koko alkuesityksen ajan --- */
  const sarja = [];
  for (let n = 0; n < 12; n += 1) {
    sarja.push(await s.evaluate(NAYTE));
    if (sarja[sarja.length - 1].paattynyt) break;
    await s.waitForTimeout(3000);
  }
  const { kamerasarja, avausLoppu } = await s.evaluate(() => {
    clearInterval(window.__kameravahti);
    return { kamerasarja: window.__kamerasarja, avausLoppu: window.__avausLoppu };
  });

  const esityksessa = sarja.filter((r) => !r.paattynyt);
  const vuotaa = esityksessa.filter((r) => r.puluNakyy || !r.piiloluokka
    || r.puluPiilossa !== true);
  vaadi(`${leveys}px: pulu ei näy kertaakaan esityksen aikana (${esityksessa.length} näytettä)`,
    esityksessa.length >= 5 && vuotaa.length === 0,
    JSON.stringify({ naytteita: esityksessa.length, vuotoja: vuotaa.length, vuoto: vuotaa.slice(0, 2) }));

  /*
   * 1d. PLUSKUPLAVARTIO POISTETTU (v1944, Raamattu PAATOKSET 34 kohta
   * 20). Tässä mitattiin 16.–18.9.2026, että `.pollo-kuplapalautus` on
   * piilossa esityksen ajan — ja koska nappi syntyi vasta suljetusta
   * kuplasta, savuke joutui tekemään koekappaleen käsin. Elementtiä ei
   * enää luoda missään: kuplat palautetaan chatin ylärivin
   * `.pollo-naytakuplat`-painikkeesta `.pollo-paneeli`n sisällä, ja
   * paneelin piilotusta vartioi jo vartio 1. Koekappaleen mittaaminen
   * olisi siis vain oman elementin mittaamista.
   */

  /* --- 2. PULUN SIMPUKKAKOMMENTTI EI OLE DOMISSA --- */
  const pulunSimpukka = sarja.filter((r) => PULUN_SIMPUKKA.test(r.puluKuplaTeksti ?? '')
    || PULUN_SIMPUKKA.test(r.sivunTeksti ?? ''));
  vaadi(`${leveys}px: pulun repliikki "Simpukoita. Hyvä alku." ei ole DOMissa missään näytteessä`,
    pulunSimpukka.length === 0,
    JSON.stringify(pulunSimpukka.map((r) => (r.puluKuplaTeksti || r.sivunTeksti).slice(0, 80))));
  // VASTAKOE: mitta osuu oikeaan asiaan — sama säännöllinen lauseke
  // löytää repliikin, jos se kirjoitetaan näytteeseen käsin.
  const vertailu = `${sarja[0]?.sivunTeksti ?? ''} Simpukoita. Hyvä alku.`;
  vaadi(`${leveys}px: vastakoe — sama mitta löytää repliikin, kun se lisätään näytteeseen`,
    PULUN_SIMPUKKA.test(vertailu) && !PULUN_SIMPUKKA.test(sarja[0]?.sivunTeksti ?? ''),
    `mitta ei erota tiloja (näytteitä ${sarja.length})`);

  /* --- 4–6. KAMERA: zoomin kesto, tasainen lasku, saapumishetki --- */
  const vaiheet = kamerasarja.map((r) => r.vaiheet).find(Boolean) ?? null;
  vaadi(`${leveys}px: zoomi kestää ${ZOOMIN_JATKO_MS} ms entistä pidempään`,
    Boolean(vaiheet) && Math.abs(vaiheet.zoomKesto - (vaiheet.zoomPerus + ZOOMIN_JATKO_MS)) < 1
      // JATKO 4 kohta 2 (omistaja 18.9.2026): jatko lyheni 5 s → 4 s.
      && ZOOMIN_JATKO_MS === 4000,
    JSON.stringify(vaiheet));

  /*
   * KERTOMUKSEN AJOITUS EI MUUTU (TARKENNUS 2: *"kertomus ja luenta
   * ETENEVAT ENNALLAAN"*). Avauksen muut hetket lasketaan samasta
   * puhtaasta funktiosta samoilla luvuilla ilman jatkoa: mustan,
   * pisteen, zoomin LÄHDÖN ja Afrikka-hetken on oltava samat. Vain
   * `zoomKesto`/`zoomLoppu` saa liikkua.
   */
  if (vaiheet) {
    const ilmanJatkoa = avauksenVaiheet({
      lauseet: [0, vaiheet.musta], sana: vaiheet.afrikka - 700, kesto: vaiheet.afrikka + 1,
    });
    const sama = ['musta', 'piste', 'zoomAlku', 'afrikka']
      .every((k) => Math.abs(ilmanJatkoa[k] - vaiheet[k]) <= 1);
    vaadi(`${leveys}px: kertomuksen ajoitus ennallaan (musta, piste, zoomin lähtö, Afrikka-hetki)`,
      sama && Math.abs(vaiheet.zoomLoppu - (vaiheet.afrikka + ZOOMIN_JATKO_MS)) < 1,
      JSON.stringify({
        musta: vaiheet.musta, piste: Math.round(vaiheet.piste), zoomAlku: Math.round(vaiheet.zoomAlku),
        afrikka: Math.round(vaiheet.afrikka), zoomLoppu: Math.round(vaiheet.zoomLoppu),
      }));
  }

  /*
   * 4b. KOKO AFRIKKA RUUDULLA AVAUKSEN LOPUSSA (TARKENNUS 2 kohta 3,
   * iPhone-kuva v1924: kartta oli zoomattu Guineanlahdelle).
   */
  /*
   * KORKEUS RIIPPUU RUUDUSTA (puhelimella 2,5, työpöydällä 1,17), joten
   * väite ei lukitse sitä — se vaatii vain, ettei kamera ole missään
   * lähellä pelaajan maan estoa (0,1431) ja että KESKIPISTE on
   * laatikon oma (lon 17) eikä pelaajan kaupungin pituusaste (23,74),
   * mikä oli juurisyyn toinen puoli.
   */
  vaadi(`${leveys}px: avauksen loppuasennossa koko Afrikka on ruudulla`,
    Boolean(avausLoppu) && Object.values(avausLoppu.karjet ?? {}).every(Boolean)
      && avausLoppu.alt > 0.5 && Math.abs(avausLoppu.lng - 17) < 2,
    JSON.stringify(avausLoppu && {
      alt: avausLoppu.alt, lat: avausLoppu.lat, lng: avausLoppu.lng,
      kotelo: avausLoppu.kotelo, karjet: avausLoppu.karjet,
    }));

  /*
   * 4c. ZOOMIKATTO EI PALAA PELAAJAN MAAHAN KESKEN ESITYKSEN. Juurisyy
   * mitattiin 16.9.2026: katto putosi 300 → 0,1431 (Ateenan
   * uloszoomausesto) samalla kehyksellä, jolla valot syttyivät, ja
   * OrbitControls puristi kameran 1,1734 → 0,1431.
   */
  const katot = kamerasarja.map((r) => r.katto).filter((k) => Number.isFinite(k));
  const matalatKatot = katot.filter((k) => k < PALLO_KORKEUS_MAX - 1e-3);
  vaadi(`${leveys}px: zoomikatto on linssin oma koko esityksen ajan (ei maan estoa)`,
    katot.length >= 5 && matalatKatot.length === 0
      && katot.every((k) => k <= AVARUUDEN_KORKEUS + 1e-3),
    JSON.stringify({ naytteita: katot.length, matalin: Math.min(...katot), korkein: Math.max(...katot) }));

  /*
   * KAMERAN AIKASARJA KOLMEEN OSAAN. Marokon ajo alkaa siitä
   * näytteestä, jossa `kohdeajo` (ajon kesto) ilmestyy mittareihin;
   * sitä ennen on zoomi ja sen jälkeinen pieni tauko, jonka esitys
   * kertoo lipulla `kohdeajoOdottaa`.
   *
   * KORKEUS ON LOGARITMINEN SUURE: pallo lähtee lukemasta 300
   * (AVARUUDEN_KORKEUS) ja päätyy noin 0,14:ään. Siksi vertailut ovat
   * SUHTEELLISIA — absoluuttinen 0,02:n toleranssi olisi lähdössä
   * olematon ja lopussa valtava.
   */
  const lasku = kamerasarja.filter((r) => Number.isFinite(r.alt));
  const ajonAlku = lasku.findIndex((r) => Number.isFinite(r.kohdeajo) && r.kohdeajo > 0);
  const ennenAjoa = ajonAlku > 0 ? lasku.slice(0, ajonAlku) : lasku;
  const ajossa = ajonAlku > 0 ? lasku.slice(ajonAlku) : [];

  /*
   * AIKASARJAN MITTAUS VAIN KAPEALLA RUUDULLA. 1400 px:n
   * ohjelmisto-WebGL vie kontin pääsäikeen niin tiukasti, että 250 ms:n
   * näytteenotto venyy 2–3 sekuntiin: mitattuna zoomista saatiin neljä
   * näytettä ja 1,2 sekunnin tauosta ei yhtäkään, eikä Marokon ajo
   * ehtinyt sarjaan lainkaan. Leveällä ruudulla mitataan siis mallin
   * luvut (zoomin kesto yllä), pulu ja laatikoiden korkeudet — kameran
   * KÄYRÄ mitataan siellä, missä omistajakin sen näki.
   */
  if (!KAMERASARJA_LEVEYDET.includes(leveys)) {
    console.log(`      (kameran aikasarja mitataan vain ${KAMERASARJA_LEVEYDET.join(', ')} px:llä — `
      + `tässä ${lasku.length} näytettä ${Math.round((lasku.at(-1)?.ms ?? 0) / 1000)} sekunnissa)`);
  } else {
  /*
   * ZOOMI LASKEE TASAISESTI. Zoomin katsotaan alkaneen siitä
   * näytteestä, jossa korkeus on ensi kertaa alle lähtökorkeuden: sitä
   * ennen ruutu on musta ja tähtitaivas, ja pallo seisoo paikallaan
   * täysin oikeutetusti.
   */
  const alkuKorkeus = lasku[0]?.alt ?? 0;
  const zoomAlkoi = ennenAjoa.findIndex((r) => r.alt < alkuKorkeus * 0.999);
  const zoomissa = zoomAlkoi >= 0 ? ennenAjoa.slice(zoomAlkoi) : [];
  const nousut = zoomissa.filter((r, i) => i > 0 && r.alt > zoomissa[i - 1].alt * 1.01);
  /*
   * VERTAILU ON LÄHTÖKORKEUS, EI ENSIMMÄINEN NÄYTE. Zoomi laskee
   * AVARUUDEN_KORKEUDESTA (300) esityksen kattoon (PALLO_KORKEUS_MAX
   * 2,5), eli yli satakertaisesti. Ensimmäinen zoomin aikainen näyte
   * osuu jo laskun puolelle (mitattu 227…290 kontin kehystahdista
   * riippuen), joten sen käyttäminen vertailuna teki väitteestä
   * kolikonheiton.
   */
  vaadi(`${leveys}px: maapallon zoomi laskee tasaisesti, ei nousuja (${zoomissa.length} näytettä)`,
    zoomissa.length >= 4 && nousut.length === 0
      && alkuKorkeus > zoomissa.at(-1).alt * 100
      && zoomissa.at(-1).alt <= PALLO_KORKEUS_MAX + 1e-3,
    JSON.stringify({
      naytteita: zoomissa.length, nousuja: nousut.length,
      lahto: alkuKorkeus, alku: zoomissa[0]?.alt ?? null, loppu: zoomissa.at(-1)?.alt ?? null,
      kestoMs: zoomissa.length ? zoomissa.at(-1).ms - zoomissa[0].ms : null,
    }));

  /*
   * ZOOMIN AIKANA EI OLE TASANNETTA, TAUON AIKANA ON. Tauko luetaan
   * esityksen omasta lipusta (`kohdeajoOdottaa`), joten mitta ei nojaa
   * kontin kehystahtiin. Zoomin aikana korkeus muuttuu joka
   * näytteessä — ei kolmea peräkkäistä samaa lukemaa.
   */
  const taukoNaytteet = lasku.filter((r) => r.odottaa === true);
  const seisoo = zoomissa.filter((r, i) => i >= 2 && !r.odottaa
    && Math.abs(r.alt - zoomissa[i - 1].alt) < zoomissa[i - 1].alt * 0.001
    && Math.abs(r.alt - zoomissa[i - 2].alt) < zoomissa[i - 2].alt * 0.001);
  vaadi(`${leveys}px: zoomin jälkeen on pieni tauko eikä zoomin aikana tasannetta`,
    taukoNaytteet.length >= 1 && taukoNaytteet.length <= 12 && seisoo.length === 0,
    JSON.stringify({ taukoNaytteita: taukoNaytteet.length, tasanteita: seisoo.length }));

  /*
   * ESIVAIHE ON HYVIN HIDAS (marokonKaari). Etenemistä EI mitata
   * korkeudesta vaan matkasta: kamera kiertää pallon pintaa pitkin
   * (leveys- ja pituuspiiri), ja korkeus nousee kaarella matkan puolessa
   * välissä — juuri niin kuin pallolaudan oma ajo on aina tehnyt.
   * Ajon ensimmäisellä kolmanneksella on kuljettava selvästi alle
   * kolmannes matkasta, mutta koko ajan eteenpäin.
   */
  const matka = (a, b2) => Math.hypot(b2.lat - a.lat, b2.lng - a.lng);
  const perillaNayte = ajossa.length ? ajossa.at(-1) : null;
  // Ajon loppu = se näyte, jossa kohde on saavutettu (matka ei enää muutu).
  const maali = ajossa.reduce((a, r) => (matka(ajossa[0], r) > matka(ajossa[0], a) ? r : a),
    ajossa[0] ?? { lat: 0, lng: 0 });
  const koko = ajossa.length ? matka(ajossa[0], maali) : 0;
  const kolmannes = ajossa.slice(0, Math.max(2, Math.ceil(ajossa.findIndex((r) => r === maali) / 3)));
  const esiMatka = kolmannes.length >= 2 ? matka(ajossa[0], kolmannes.at(-1)) : 0;
  const taaksepain = kolmannes.filter((r, i) => i > 0
    && matka(ajossa[0], r) < matka(ajossa[0], kolmannes[i - 1]) - 0.05);
  vaadi(`${leveys}px: Marokon ajon esivaihe etenee hitaasti, muttei peruuta`,
    kolmannes.length >= 2 && koko > 5 && esiMatka > 0
      && esiMatka < koko * 0.25 && taaksepain.length === 0,
    JSON.stringify({
      naytteita: kolmannes.length,
      esivaihe: +esiMatka.toFixed(2),
      koko: +koko.toFixed(2),
      osuus: `${Math.round((esiMatka / koko) * 100)} %`,
      taaksepain: taaksepain.length,
    }));

  /*
   * 6. AJO ALKAA VASTA ZOOMIN JÄLKEEN JA PITÄÄ ENTISEN PITUUTENSA
   * (TARKENNUS 2 kohta 2, omistaja 16.9.2026 klo 18.50 UTC: *"aloita
   * siten vasta liikuttamaan kohti Marokkoa. Ei haittaa, vaikka Marokon
   * teksti alkaa tulla ennen kuin kartta on zoomautunut sinne asti."*).
   *
   * MITATAAN KAKSI ASIAA. 1) Ajo ei ole käynnissä ennen zoomin
   * perilletuloa: ensimmäinen `kohdeajo`-näyte tulee tauon JÄLKEEN.
   * 2) Kamera on maalissa vasta kun 'jebel-irhoud' on jo alkanut — eli
   * saapuminen SIIRTYI, kuten omistaja salli. Entinen väite oli
   * päinvastainen ("viimeistään kun jakso alkaa"), ja se on nyt
   * kumottu.
   */
  const jaksoVaihtui = lasku.find((r) => r.jakso === 'jebel-irhoud');
  const maalissa = ajossa.find((r) => matka(r, maali) < 0.5);
  vaadi(`${leveys}px: Marokon ajo alkaa vasta zoomin jälkeen`,
    ajonAlku > 0 && lasku[ajonAlku].ms > (taukoNaytteet[0]?.ms ?? Infinity)
      && (lasku[ajonAlku - 1]?.kohdeajo ?? null) === null,
    JSON.stringify({
      taukoAlkoiMs: taukoNaytteet[0]?.ms ?? null,
      ajonAlkuMs: lasku[ajonAlku]?.ms ?? null,
      mallinKestoMs: lasku[ajonAlku]?.kohdeajo ?? null,
    }));
  /*
   * SAAPUMINEN SIIRTYY TASAN ZOOMIN JATKON VERRAN. Luku luetaan
   * ESITYKSEN OMASTA MITTARISTA (`kohdeajonMyohassa` = ajon kesto
   * miinus jäljellä oleva aika jaksoon), koska savukkeen väärennetty
   * äänite (18 s hiljaisuutta avausjaksoille) ei kulje samaa tahtia
   * kuin kaanonin varakestot: seinäkellosta mitattu jakson vaihtuminen
   * ei kerro, missä kohtaa MALLI luulee jakson alkavan. Kamera-ajon
   * oma mitta (kesto ja maaliin tulo) mitataan erikseen aikasarjasta.
   */
  const myohassa = lasku.map((r) => r.myohassa).find((v) => Number.isFinite(v)) ?? null;
  const ajonKesto = maalissa && ajonAlku > 0 ? maalissa.ms - lasku[ajonAlku].ms : null;
  vaadi(`${leveys}px: saapuminen siirtyy tasan ZOOMIN_JATKO_MS (${ZOOMIN_JATKO_MS} ms) jakson alun yli`,
    myohassa !== null && Math.abs(myohassa - ZOOMIN_JATKO_MS) <= 1
      && Boolean(maalissa) && maalissa.ms > (taukoNaytteet.at(-1)?.ms ?? 0)
      && Number.isFinite(ajonKesto)
      && Math.abs(ajonKesto - (lasku[ajonAlku]?.kohdeajo ?? 0)) < 2000,
    JSON.stringify({
      myohassaMs: myohassa,
      mallinKestoMs: lasku[ajonAlku]?.kohdeajo ?? null,
      mitattuKestoMs: ajonKesto,
      maalissaMs: maalissa?.ms ?? null,
      jaksoMs: jaksoVaihtui?.ms ?? null,
      perilla: perillaNayte ? { lat: perillaNayte.lat, lng: perillaNayte.lng } : null,
    }));

  }

  /* --- 3. LAATIKON KORKEUS: kaanonin JOKAINEN osa oikeassa laatikossa --- */
  const mitat = await s.evaluate((osat) => {
    const juuri = document.querySelector('.aikajana');
    const rivi = juuri.querySelector('.aikajana-kertomusteksti');
    const laatikko = rivi.querySelector('.aikajana-kertomusteksti-sisus');
    // Alalaidan asu (ei keskitystä): juuri se, jossa kappale näytetään.
    rivi.classList.remove('keskella');
    rivi.classList.add('esilla');
    laatikko.classList.add('nakyy');
    const vanha = laatikko.textContent;
    const kartta = Math.round(juuri.getBoundingClientRect().height);
    const ulos = osat.map((o) => {
      laatikko.textContent = o.teksti;
      return { ...o, korkeus: Math.round(laatikko.getBoundingClientRect().height) };
    });
    laatikko.textContent = vanha;
    return { kartta, ulos };
  }, KAIKKI_OSAT);
  const raja = mitat.kartta * 0.3;
  const liianKorkeat = mitat.ulos.filter((o) => o.korkeus > raja);
  const korkein = mitat.ulos.reduce((a, b) => (b.korkeus > a.korkeus ? b : a), mitat.ulos[0]);
  vaadi(`${leveys}px: jokainen osa mahtuu 30 %:iin kartasta (${mitat.kartta} px → raja ${Math.round(raja)} px)`,
    mitat.ulos.length >= 25 && liianKorkeat.length === 0,
    JSON.stringify({
      osia: mitat.ulos.length,
      korkein: `${korkein.jakso}#${korkein.osa} ${korkein.korkeus} px `
        + `(${Math.round((korkein.korkeus / mitat.kartta) * 100)} %)`,
      ylitti: liianKorkeat.slice(0, 3),
    }));

  /* 3b. VASTAKOE: koko kappale yhtenä laatikkona (vanha käytös). */
  const vastakoe = await s.evaluate((jaksot) => {
    const juuri = document.querySelector('.aikajana');
    const rivi = juuri.querySelector('.aikajana-kertomusteksti');
    const laatikko = rivi.querySelector('.aikajana-kertomusteksti-sisus');
    const vanha = laatikko.textContent;
    const kartta = Math.round(juuri.getBoundingClientRect().height);
    const ulos = jaksot.map((j) => {
      laatikko.textContent = j.teksti;
      return { id: j.id, korkeus: Math.round(laatikko.getBoundingClientRect().height) };
    });
    laatikko.textContent = vanha;
    return { kartta, ulos };
  }, [...IHMISEN_MATKA_KERTOMUS.map((j) => ({ id: j.id, teksti: j.teksti })), ARABIA_ENNEN]);
  const vanhaKorkein = vastakoe.ulos.reduce((a, b) => (b.korkeus > a.korkeus ? b : a), vastakoe.ulos[0]);
  vaadi(`${leveys}px: VASTAKOE — koko kappale yhtenä laatikkona on korkeampi kuin osissa`,
    vanhaKorkein.korkeus > korkein.korkeus,
    JSON.stringify({
      vanha: `${vanhaKorkein.id} ${vanhaKorkein.korkeus} px `
        + `(${Math.round((vanhaKorkein.korkeus / vastakoe.kartta) * 100)} %)`,
      uusi: `${korkein.korkeus} px`,
    }));

  /* --- KUVA: Arabia-kohta, lyhyt laatikko, ei pulua --- */
  await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.valitse('arabia'));
  /*
   * JAKSO PYSÄYTETÄÄN KUVAA VARTEN. Savukkeen väärennetty äänite on
   * kolme sekuntia pitkä, joten ilman taukoa esitys ehtii seuraavaan
   * jaksoon ennen kuin kaappaus valmistuu — ensimmäinen versio kuvasta
   * näytti 'intian-rannat'-kappaleen.
   */
  await s.waitForTimeout(1500);
  await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tauko());
  await s.waitForTimeout(600);
  const arabia = await s.evaluate(NAYTE);
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kappaleet-${leveys}.jpg`), type: 'jpeg', quality: 72 });
  /*
   * 2b KERTOJAN VIRKE ON RUUDULLA. Arabia-kappale jakautuu kolmeen
   * laatikkoon, ja simpukkavirke on niistä ENSIMMÄISESSÄ (osa 0), joten
   * se mitataan kaanonin osista eikä pysäytyshetkeen osuneesta
   * laatikosta — pysäytys voi osua mihin tahansa kolmesta.
   */
  const arabianOsat = KAIKKI_OSAT.filter((o) => o.jakso === 'arabia');
  vaadi(`${leveys}px: kertojan simpukkavirke on Arabia-jakson tekstissä`,
    arabianOsat.some((o) => KERTOJAN_SIMPUKKA.test(o.teksti)),
    JSON.stringify(arabianOsat.map((o) => o.teksti.slice(0, 50))));
  vaadi(`${leveys}px: Arabia-jaksossa laatikko on matala eikä pulu näy`,
    arabia.jakso === 'arabia' && !PULUN_SIMPUKKA.test(arabia.sivunTeksti ?? '')
      && arabia.laatikko <= arabia.kartta * 0.3 && arabia.puluNakyy === false,
    JSON.stringify({
      teksti: arabia.teksti.slice(0, 60), laatikko: arabia.laatikko, kartta: arabia.kartta,
      osuus: `${Math.round((arabia.laatikko / arabia.kartta) * 100)} %`, pulu: arabia.puluNakyy,
    }));

  /*
   * 4b VASTAKOE: SAMA LAATIKKO ILMAN `kokonaan`-LIPPUA. Kamera ajetaan
   * käsin Afrikan laatikkoon molemmilla lipuilla ja verrataan. Ilman
   * lippua laudan saapumissääntö (js/pallolauta/kamera.js
   * korkeuteenSovitus, PÄÄTÖKSET 17) sovittaa kuvan pelkkään korkeuteen
   * ja siirtää X-keskipisteen pelaajan kaupungin pituusasteelle —
   * juuri se vei omistajan kartan Guineanlahdelle.
   */
  let vastakoeRajaus = null;
  if (KAMERASARJA_LEVEYDET.includes(leveys)) {
    vastakoeRajaus = await s.evaluate(async (karjet) => {
      const lauta = window.matkakirja.ui.pallolauta;
      const mod = await import('/js/linssit/ihmisen-matka-esitys.js');
      const bbox = mod.alueenLaatikko('afrikka');
      const lue = () => {
        const pov = lauta.pallo.pointOfView();
        const ulos = {};
        for (const [nimi, [lat, lng]] of Object.entries(karjet)) {
          ulos[nimi] = Boolean(lauta.ruudulla?.(lat, lng, 0));
        }
        return {
          alt: +pov.altitude.toFixed(4), lat: +pov.lat.toFixed(3), lng: +pov.lng.toFixed(3), karjet: ulos,
        };
      };
      const aja = async (kohde) => {
        await lauta.kamera.ajaKamera(kohde, { kesto: 0 });
        await new Promise((r) => setTimeout(r, 600));
        return lue();
      };
      const ilman = await aja({ bbox, marginaali: 0.04 });
      const kanssa = await aja({ bbox, marginaali: 0.04, kokonaan: true });
      return { ilman, kanssa };
    }, AFRIKAN_KARJET);
    const puuttuu = Object.values(vastakoeRajaus.ilman.karjet).filter((v) => !v).length;
    vaadi(`${leveys}px: VASTAKOE — ilman kokonaan-lippua Afrikan kärkiä jää ruudun ulkopuolelle`,
      puuttuu >= 1 && Object.values(vastakoeRajaus.kanssa.karjet).every(Boolean)
        && vastakoeRajaus.ilman.alt < vastakoeRajaus.kanssa.alt,
      JSON.stringify(vastakoeRajaus));
  }

  /* 1c. VASTAKOE: ilman piiloluokkaa pulu on heti näkyvissä. */
  await s.evaluate(() => document.body.classList.remove('aikajana-pulu-piilossa'));
  await s.waitForTimeout(400);
  const paljas = await s.evaluate(NAYTE);
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kappaleet-vastakoe-${leveys}.png`) });
  await s.evaluate(() => document.body.classList.add('aikajana-pulu-piilossa'));
  vaadi(`${leveys}px: VASTAKOE — ilman piiloluokkaa pulu on näkyvissä kesken esityksen`,
    paljas.puluNakyy === true, JSON.stringify({ nappi: paljas.puluNappi, kasvot: paljas.puluKasvot }));

  /* --- 1b. PULU TULEE, KUN ESITYS PÄÄTTYY --- */
  await s.evaluate(() => {
    const e = window.matkakirja.ui.aikajana.esitys;
    const viimeinen = window.matkakirja.ui.aikajana.kaari.kertomus.at(-1).id;
    e.valitse(viimeinen);
  });
  const loppui = await s.waitForFunction(
    () => window.matkakirja.ui.aikajana?.esitys?.tila?.()?.paattynyt === true,
    null, { timeout: 60000, polling: 250 },
  ).then(() => true).catch(() => false);
  // Sisääntulo: PULUN_SISAANTULO_MS (2 s) + kävelyele (2,2 s).
  await s.waitForTimeout(5000);
  const lopussa = await s.evaluate(NAYTE);
  vaadi(`${leveys}px: pulu on ruudulla, kun esitys on päättynyt`,
    loppui && lopussa.paattynyt === true && lopussa.puluPiilossa === false
      && lopussa.piiloluokka === false && lopussa.puluNakyy === true,
    JSON.stringify({
      loppui, paattynyt: lopussa.paattynyt, piilossa: lopussa.puluPiilossa,
      luokka: lopussa.piiloluokka, nakyy: lopussa.puluNakyy, tullut: lopussa.puluTullut,
    }));

  /*
   * --- 1e. PULU EI PEITÄ JAKSON TEKSTIÄ (omistaja 19.9.2026 klo 18.01,
   * Siperia-kortti; Raamattu PAATOKSET 50, js/pulu-paneelin-ylla.js).
   * Pulun laatikon yhdeksästä pisteestä luetaan, mitä pulun ALLA on:
   * yksikään elementti, jolla on oma tekstisolmu, ei saa olla siellä.
   */
  /*
   * KASVOKANGAS SEURAA NAPPIA (Fable 19.9.2026 klo 21.36): näkyvä lintu
   * on .livia-kasvot-pinta (js/livia-eleet.js). Sen siirtymä napista
   * mitataan ennen Siperia-korttia ja kortin jälkeen (pulu nostettu):
   * siirtymän on oltava sama, muuten lintu jäi vanhaan paikkaan.
   */
  const kangas = () => s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi.pollo-kelluu');
    const pinta = document.querySelector('.livia-kasvot-pinta');
    if (!n || !pinta || pinta.hidden || !pinta.getClientRects().length) return null;
    const a = n.getBoundingClientRect();
    const b = pinta.getBoundingClientRect();
    return {
      dx: Math.round((b.left + b.width / 2) - (a.left + a.width / 2)),
      dy: Math.round((b.top + b.height / 2) - (a.top + a.height / 2)),
      napinAla: Math.round(a.bottom),
      ylla: n.classList.contains('pulu-paneelin-ylla'),
    };
  });
  const kangasEnnen = await kangas();
  // Sib.-välilehti avaa Siperia-kortin (omistajan kuva 19.9.2026 klo 18.01).
  const sib = s.getByText('Sib.', { exact: true }).first();
  const siperia = await sib.click({ timeout: 5000 }).then(() => 'Sib.').catch((e) => `ei: ${String(e).slice(0, 60)}`);
  await s.waitForTimeout(4000);
  const peitto = await s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi.pollo-kelluu');
    if (!n || Number(getComputedStyle(n).opacity) === 0 || getComputedStyle(n).visibility === 'hidden') {
      return { pulu: false };
    }
    const r = n.getBoundingClientRect();
    const tekstit = new Set();
    for (const fx of [0.15, 0.5, 0.85]) {
      for (const fy of [0.15, 0.5, 0.85]) {
        for (const e of document.elementsFromPoint(r.left + r.width * fx, r.top + r.height * fy)) {
          if (n.contains(e) || e === document.body || e === document.documentElement) continue;
          const oma = [...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim().length > 2);
          if (oma) tekstit.add(`${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`);
        }
      }
    }
    return {
      pulu: true, tekstit: [...tekstit], ylla: n.classList.contains('pulu-paneelin-ylla'),
      piilossa: n.classList.contains('pulu-paneelin-alla-piilossa'),
      pulunAla: Math.round(r.bottom),
    };
  });
  vaadi(`${leveys}px: pulu ei peitä jakson tekstiä esityksen jälkeen`,
    peitto.pulu && peitto.tekstit.length === 0, JSON.stringify({ siperia, ...peitto }));
  const kangasJalkeen = await kangas();
  vaadi(`${leveys}px: Livian kasvokangas seuraa pulua Siperia-kortilla (siirtymä napista ±3 px)`,
    Boolean(kangasEnnen && kangasJalkeen)
      && Math.abs(kangasJalkeen.dx - kangasEnnen.dx) <= 3 && Math.abs(kangasJalkeen.dy - kangasEnnen.dy) <= 3,
    JSON.stringify({ kangasEnnen, kangasJalkeen }));
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-pulu-siperia-${leveys}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});

  writeFileSync(join(ULOS, `savuke-ihmisen-kappaleet-${leveys}.json`), JSON.stringify({
    sarja, kamerasarja, avausLoppu, vastakoeRajaus, mitat, vastakoe, arabia, lopussa,
  }, null, 1));
  await konteksti.close();
  return {
    kamerasarja, avausLoppu, vastakoeRajaus, mitat, korkein, vanhaKorkein, vaiheet,
  };
}

/* KOOT=390 ajaa vain kapean ruudun (nopeampi silmukka työn aikana). */
const KOOT = (process.env.KOOT ? process.env.KOOT.split(',').map(Number) : [390, 1400])
  .map((w) => (w === 390 ? [390, 844] : [w, 900]));
const yhteenveto = [];
for (const [leveys, korkeus] of KOOT) yhteenveto.push([leveys, await mittaa(leveys, korkeus)]);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
vaadi('jakofunktio pitää 240 merkin rajan', KAIKKI_OSAT.every((o) => o.teksti.length <= OSAN_MERKIT),
  `pisin ${Math.max(...KAIKKI_OSAT.map((o) => o.teksti.length))} merkkiä`);

for (const [leveys, tulos] of yhteenveto) {
  if (!tulos) continue;
  console.log(`\n── ${leveys} px ──`);
  console.log(`   kartta ${tulos.mitat.kartta} px, korkein osa ${tulos.korkein.korkeus} px `
    + `(${Math.round((tulos.korkein.korkeus / tulos.mitat.kartta) * 100)} %), `
    + `vanha käytös ${tulos.vanhaKorkein.korkeus} px `
    + `(${Math.round((tulos.vanhaKorkein.korkeus / tulos.mitat.kartta) * 100)} %)`);
  if (tulos.vaiheet) {
    console.log(`   zoomi ${Math.round(tulos.vaiheet.zoomPerus)} → `
      + `${Math.round(tulos.vaiheet.zoomKesto)} ms (+${Math.round(tulos.vaiheet.zoomKesto - tulos.vaiheet.zoomPerus)}), `
      + `Afrikka-hetki ${Math.round(tulos.vaiheet.afrikka)} ms, zoomi perillä `
      + `${Math.round(tulos.vaiheet.zoomLoppu)} ms`);
  }
  if (tulos.avausLoppu) {
    console.log(`   avauksen loppuasento: korkeus ${tulos.avausLoppu.alt}, keskipiste `
      + `${tulos.avausLoppu.lat} / ${tulos.avausLoppu.lng}, kärjet ruudulla `
      + `${Object.entries(tulos.avausLoppu.karjet).map(([k, v]) => `${k}:${v ? 'on' : 'EI'}`).join(' ')}`);
  }
}

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi. Kuvat: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
