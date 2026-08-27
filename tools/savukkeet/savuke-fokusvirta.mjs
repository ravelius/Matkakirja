/*
 * Savuke: fokusmoodin annosteluvirta Ateenassa (js/fokusvirta.js).
 *
 * Yksikkötestit (tests/fokusvirta.test.mjs) vahtivat tilakoneen, mutta
 * eivät sitä, että virta oikeasti piirtyy selaimessa oikeille pinnoille
 * ja vie pelaajan vaiheesta toiseen. Juuri se on tämän paketin riski:
 * virta piirtyy kolmelle eri pinnalle oman moduulinsa kautta eikä
 * ui.js:n renderin läpi.
 *
 * KOLME PINTAA (omistajan tarkennukset 24.8.2026, ks. js/fokusvirta.js
 * "KOLME PINTAA, EI YHTÄ"):
 *   1. ylävasen matkakirjakortti (.fact-card) — isoisän merkintä
 *   2. pöllön puhekupla (.fokusvirta-kupla) — pöllön huomio ja valinta
 *   3. annostelukortti (.fokusvirta-kortti) — syvennys ja oppitunti
 * ja niiden lisäksi kartan kuvavinjetit (.fokuskuva-pinni).
 *
 * Vartiot:
 *   1. LEHTILUKKO — Tutki-nappi ei avaa saapumiskorttia niin kauan kuin
 *      laatta on kääntämättä.
 *   2. VAIHE 1 EI OLE OMA KORTTINSA: merkintä on ylävasemmassa
 *      matkakirjakortissa vanhoine valokuvineen, kuuntelunappi on
 *      piilossa (luennat tehdään erikseen), eikä virran omaa pintaa ole.
 *   3. Merkinnän jälkeen pöllö puhuu KUPLASTA, joka on ankkuroitu
 *      kelluvaan pöllönappiin: kuplan kärki osoittaa nappiin, kupla on
 *      napin yläpuolella eikä valu ruudun ulkopuolelle.
 *   4. Valintavaihe on samassa kuplassa painikkeineen; portti on kiinni
 *      ennen ensimmäistä täkyä ja aukeaa sen jälkeen (Raamattu,
 *      ETENEMINEN).
 *   5. Täky on KORTTI: iso kuva heti kortin yläosassa, minivisa ja raha
 *      oikeasta vastauksesta. Kortti on VAALEAA PAPERIA eikä tumma
 *      massa (omistajan pelitestipalaute 24.8.2026: *"Liian raskaan
 *      oloinen visuaalisesti. Kuva saisi tässä näkyä heti isolla."*),
 *      ja se saa kasvaa kuvan takia ylävasemman matkakirjakortin
 *      päälle — mutta ei koko ruudun modaaliksi.
 *   6. Leipäteksti on lukukirjasimella, ei kirjoituskoneella
 *      (omistajan palaute: *"fontti saisi olla luettavampi"*).
 *   7. Kartan kuvavinjetit ilmestyvät Ateenan ylle, kertyvät virran
 *      mukana ja pysyvät samankokoisina zoomista riippumatta.
 *   8. KUVAN SUURENNOS (omistajan tilaus 24.8.2026): napautus KASVATTAA
 *      kuvan vinjetin paikalta suureksi kartan päälle — ei koko ruudun
 *      katselinta, ei täyttä pimennystä, kartta näkyy yhä taustalla.
 *      Pelitestin jälkeen kolme lisävaatimusta: kuva täyttää ruudun
 *      selvästi, selite ja lähde ovat PAPERIKEHYKSEN sisällä kuvan
 *      levyisenä palkkina (ennen ne valuivat irtotekstinä kartan
 *      päälle), ja pöllön kupla häviää suurennoksen ajaksi.
 *   9. KOHDENOSTO (omistajan tilaus 24.8.2026): valintakuplan neljäs
 *      valinta kertoo MUUSTA paikasta kuin pelikaupungista — kupla
 *      ilman visaa, ja vinjetti kartalle KOHTEEN OMAAN sijaintiin eikä
 *      kaupungin viuhkaan. Portti ei aukea siitä.
 *  10. Tila säilyy: kuplan sulku napautuksella ja uusi avaus jatkavat
 *      samasta vaiheesta eivätkä ala alusta.
 *  11. Saapuminen avaa virran itsestään (ANNOSTELU-poikkeus "mikään ei
 *      ponnahda" -sääntöön).
 *
 * Peli istutetaan valmiiksi Ateenaan pelitallenteen kautta: Ateena on
 * Euroopan laudalla, eikä savuke voi lentää sinne maailmankartalta.
 *
 * LIIKE VÄHENNETTYNÄ (reducedMotion): kirjoituskone kirjoittaa
 * merkinnän kerralla, joten vaiheen 1 automaattinen kuittaus tapahtuu
 * tunnetussa ajassa eikä savuke joudu arvaamaan konekirjoituksen
 * kestoa.
 */
/*
 * KEVYT KULKU -KOKEILUN OHITUSVAHTI (Fable 24.8.2026): tama savuke
 * mittaa korttiannostelua ja lehtinakymaa, jotka ovat kokeilun ajan
 * lipun takana (js/fokusvirta.js FOKUSVIRTA_KORTIT = false). Lipun
 * ollessa pois savuke ohitetaan; kun vanha virta palautetaan, vahti
 * paastaa savukkeen ajoon sellaisenaan. Kokeilutilan oma kattavuus:
 * tools/savuke-fokusvirta.mjs ja tools/savuke-fokuskartta.mjs.
 */
{
  const { readFileSync } = await import('node:fs');
  const virta = readFileSync(new URL('../../js/fokusvirta.js', import.meta.url), 'utf8');
  if (/FOKUSVIRTA_KORTIT\s*=\s*false/.test(virta)) {
    console.log('OHITETTU: kevyt kulku -kokeilu paalla (FOKUSVIRTA_KORTIT=false)');
    process.exit(0);
  }
}
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MERKINNAN_TAUKO_MS } from '../../js/fokusvirta.js';

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

/**
 * Onko `rgb(...)`-väri vaaleaa paperia?
 *
 * Kortin ja suurennoksen kuvatekstipalkin on oltava pergamenttia eikä
 * tummaa massaa (omistajan pelitestipalaute 24.8.2026). Raja on karkea
 * kirkkaus: pelin pergamentit ovat yli 200, entinen tumma kortti oli
 * alle 50.
 */
const vaalea = (vari) => {
  const osat = String(vari ?? '').match(/[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 3) return false;
  // Läpinäkyvä tausta ei ole paperia.
  if (osat.length > 3 && osat[3] < 0.5) return false;
  return (osat[0] * 0.299 + osat[1] * 0.587 + osat[2] * 0.114) > 190;
};

/* Valmis peli: Herra Fogg seisoo Ateenassa, laatta kääntämättä. */
const peli = new Game({
  players: [{ name: 'Herra Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('europe'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Sama alkutila joka kontekstiin: peli tallenteesta, fokusmoodi päällä. */
const istuta = (data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Fokusmoodi on oletuksena päällä; varmistetaan silti, ettei
    // kehittäjän kytkin ole jäänyt profiiliin pois päältä.
    localStorage.removeItem('matkakirja-fokusmoodi');
  } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
};

/*
 * KUVAPALVELIN KORVATAAN PIKSELILLÄ. Kontin selain ei pääse ämpäriin
 * eikä Commonsiin, ja fokusvirta poistaa kartalta vinjetin, jonka kuvaa
 * ei saada (tyhjä kehys olisi pahempi kuin ei kehystä lainkaan). Ilman
 * korvausta savuke mittaisi verkkoyhteyttä eikä virtaa. Osoitteet
 * tarkistetaan erikseen (tools/tarkista-kuvatiedostot.mjs).
 */
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/** Uusi sivu samalla alkutilalla ja samoilla verkkokatkoilla. */
const avaaSivu = async (asetukset) => {
  const konteksti = await selain.newContext({ reducedMotion: 'reduce', ...asetukset });
  await konteksti.addInitScript(istuta, tallenne);
  const uusi = await konteksti.newPage();
  await uusi.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await uusi.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await uusi.goto(osoite, { waitUntil: 'load' });
  await uusi.waitForTimeout(2500);
  return { konteksti, sivu: uusi };
};

const { sivu } = await avaaSivu({ viewport: { width: 834, height: 1112 } });

/** Virran näkyvä pinta: kortti tai kupla, kumpi niistä on ruudulla. */
const kortti = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
  if (!el) return null;
  const laatikko = el.getBoundingClientRect();
  const leipa = el.querySelector('.fokusvirta-teksti p');
  return {
    kupla: el.classList.contains('fokusvirta-kupla'),
    ylarivi: el.querySelector('.fokusvirta-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokusvirta-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokusvirta-teksti')?.textContent ?? '',
    leipafontti: leipa ? getComputedStyle(leipa).fontFamily : '',
    leipakoko: leipa ? parseFloat(getComputedStyle(leipa).fontSize) : 0,
    kuvia: el.querySelectorAll('.fokusvirta-kuva img').length,
    /*
     * Kortin pinta ja kuvan leveys (omistajan pelitestipalaute
     * 24.8.2026): kortti on vaaleaa paperia, ei tummaa massaa, ja kuva
     * näkyy heti isona koko kortin levyisenä.
     */
    pohja: getComputedStyle(el).backgroundColor,
    kuvanLeveys: Math.round(
      el.querySelector('.fokusvirta-kuva img')?.getBoundingClientRect().width ?? 0,
    ),
    kuvanKorkeus: Math.round(
      el.querySelector('.fokusvirta-kuva img')?.getBoundingClientRect().height ?? 0,
    ),
    // Onko kuva kortin ENSIMMÄINEN asia — ylempänä kuin leipäteksti?
    kuvaEnsin: (() => {
      const kuva = el.querySelector('.fokusvirta-viite');
      return Boolean(kuva && leipa
        && kuva.getBoundingClientRect().top < leipa.getBoundingClientRect().top);
    })(),
    sisus: Math.round(el.querySelector('.fokusvirta-sisalto')?.getBoundingClientRect().width ?? 0),
    napit: [...el.querySelectorAll('.fokusvirta-napit button')]
      .map((b) => ({ teksti: b.textContent, pois: b.disabled })),
    vaihtoehdot: [...el.querySelectorAll('.fokusvirta-vaihtoehdot button')]
      .map((b) => b.textContent),
    tulos: el.querySelector('.fokusvirta-visa-tulos')?.textContent ?? '',
    karttapinnassa: Boolean(el.closest('.map-pane')),
    dialogissa: Boolean(el.closest('dialog')),
    laatikko: {
      ylin: Math.round(laatikko.top),
      alin: Math.round(laatikko.bottom),
      vasen: Math.round(laatikko.left),
      oikea: Math.round(laatikko.right),
    },
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
    vaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
    rahat: window.matkakirja.game.player.money,
  };
});

/** Ylävasemman matkakirjakortin tilanne. */
const matkakirja = () => sivu.evaluate(() => {
  const kortti = document.querySelector('.fact-card');
  if (!kortti || kortti.hidden) return null;
  const kuva = document.getElementById('fact-valokuva');
  return {
    nurkka: kortti.dataset.corner ?? '',
    aani: document.getElementById('fact-voice')?.textContent ?? '',
    paikka: document.getElementById('fact-place')?.textContent ?? '',
    teksti: document.getElementById('fact-text')?.textContent ?? '',
    kuvaNakyy: Boolean(kuva && !kuva.hidden),
    kuvaOsoite: document.getElementById('fact-valokuva-kuva')?.src ?? '',
    kuunteluPiilossa: document.getElementById('fact-kuuntele')?.hidden ?? null,
    ylin: Math.round(kortti.getBoundingClientRect().top),
    alin: Math.round(kortti.getBoundingClientRect().bottom),
  };
});

/** Kartan kuvavinjetit: määrä, koko ruudulla ja paikka laattaan nähden. */
const vinjetit = () => sivu.evaluate(() => {
  const pinnit = [...document.querySelectorAll('.fokuskuva-pinni')];
  const ryhmat = [...document.querySelectorAll('.fokuskuva-ryhma')];
  return {
    maara: pinnit.length,
    suodattimia: pinnit.filter((p) => p.querySelector('[filter]') || p.getAttribute('filter')).length,
    // Kiinteä ruutukoko tehdään ankkuriryhmän muunnoksella; kohdenosto
    // saa oman ryhmänsä omaan laudan pisteeseensä.
    ryhmat: ryhmat.map((g) => g.getAttribute('transform') ?? ''),
    kerroksenMuunnos: ryhmat[0]?.getAttribute('transform') ?? '',
    koot: pinnit.map((p) => {
      const r = p.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.bottom) };
    }),
  };
});

/** Suurennoksen tilanne: kuva, sen mitat, teksti ja taustan tummuus. */
const suurennos = () => sivu.evaluate(() => {
  const kerros = document.querySelector('.fokuszoom');
  if (!kerros) return null;
  const img = kerros.querySelector('.fokuszoom-kuva');
  const teksti = kerros.querySelector('.fokuszoom-teksti');
  const tyyli = getComputedStyle(kerros);
  const alfa = (tyyli.backgroundColor.match(/rgba?\([^)]*?([\d.]+)\)$/) ?? [])[1];
  const kehys = kerros.querySelector('.fokuszoom-kehys');
  const k = img?.getBoundingClientRect();
  const t = teksti?.getBoundingClientRect();
  const ke = kehys?.getBoundingClientRect();
  // Kupla ja kortti häivytetään suurennoksen ajaksi (ne jäivät ennen
  // kuvan viereen ja kuvateksti valui niiden päälle).
  const pinta = document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti');
  return {
    kuva: k ? { w: Math.round(k.width), h: Math.round(k.height), ylin: Math.round(k.top), alin: Math.round(k.bottom) } : null,
    kehys: ke ? { w: Math.round(ke.width), h: Math.round(ke.height), alin: Math.round(ke.bottom) } : null,
    tekstinYlin: t ? Math.round(t.top) : null,
    tekstinLeveys: t ? Math.round(t.width) : 0,
    // Kuvatekstipalkin oma pinta: paperia kehyksen sisällä, ei
    // irtotekstiä kartan päällä (peritty tausta luetaan kehykseltä).
    tekstipalkki: kehys ? getComputedStyle(kehys).backgroundColor : '',
    tekstivari: teksti ? getComputedStyle(teksti).color : '',
    tekstiKehyksessa: Boolean(t && ke && t.bottom <= ke.bottom + 1 && t.top >= ke.top),
    selite: kerros.querySelector('.fokuszoom-selite')?.textContent ?? '',
    lahde: kerros.querySelector('.fokuszoom-lahde')?.textContent ?? '',
    laskuri: kerros.querySelector('.fokuszoom-laskuri')?.textContent ?? '',
    taustanAlfa: alfa === undefined ? 1 : Number(alfa),
    sumennus: `${tyyli.backdropFilter ?? ''}${tyyli.webkitBackdropFilter ?? ''}`,
    kuplaNakyy: pinta ? Number(getComputedStyle(pinta).opacity) > 0.05 : false,
    lehtikatselin: Boolean(document.querySelector('.lightbox')),
    kartta: Boolean(document.querySelector('.map-pane svg')),
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
  };
});

/**
 * Painaa virran pinnalta napin, jonka teksti täsmää.
 *
 * Sivu on parametri, jotta kosketusosio (osio 12) voi ajaa saman virran
 * omassa puhelinkontekstissaan ilman toista kopiota tästä.
 */
const paina = async (osuma, mista = '.fokusvirta-napit', kohde = sivu) => {
  await kohde.evaluate(([teksti, valitsin]) => {
    const juuri = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
    const napit = [...(juuri?.querySelectorAll(`${valitsin} button`) ?? [])];
    napit.find((b) => b.textContent.includes(teksti))?.click();
  }, [osuma, mista]);
  await kohde.waitForTimeout(350);
};

/* --- 1: Tutki avaa virran, ei saapumiskorttia --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(500);
const lehtiAuki = await sivu.evaluate(() => document.getElementById('arrival-dialog').open);
vaadi('lehtilukko: saapumiskortti pysyy kiinni', !lehtiAuki);

/* --- 2: vaihe 1 on ylävasen matkakirjakortti, ei virran oma kortti --- */
// Tutki kuittasi merkinnän jo luetuksi, joten tila palautetaan alkuun.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  delete ui.game.fokusvirrat['europe:ateena'];
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  ui.factKey = null;
  ui.render();
});
await sivu.waitForTimeout(500);
let kirja = await matkakirja();
let tila = await kortti();
vaadi('vaihe 1: merkintä on ylävasemmassa matkakirjakortissa',
  kirja?.nurkka === 'tl' && kirja.aani.includes('Matkapäiväkirjasta')
  && kirja.paikka.includes('1873') && kirja.teksti.includes('Troijan kullan'),
  JSON.stringify(kirja));
vaadi('vaihe 1: vanha valokuva on kortin kyljessä',
  kirja?.kuvaNakyy === true && /sophia[-_ ]schliemann/i.test(kirja.kuvaOsoite),
  JSON.stringify(kirja?.kuvaOsoite));
vaadi('vaihe 1: saapumisluenta on vaiennettu (kuuntelunappi piilossa)',
  kirja?.kuunteluPiilossa === true, JSON.stringify(kirja?.kuunteluPiilossa));
vaadi('vaihe 1: virralla ei ole omaa korttia — vain yksi matkakirja',
  tila === null, JSON.stringify(tila));

/* --- 3: merkinnän jälkeen pöllö puhuu kuplasta --- */
await sivu.waitForTimeout(MERKINNAN_TAUKO_MS + 900);
tila = await kortti();
const pollonappi = await sivu.evaluate(() => {
  const r = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
  return r ? { ylin: Math.round(r.top), keski: Math.round(r.left + r.width / 2) } : null;
});
const karki = await sivu.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kupla');
  if (!el) return null;
  const arvo = getComputedStyle(el).getPropertyValue('--kupla-karki');
  return { arvo, vasen: el.getBoundingClientRect().left };
});
/*
 * YLÄRIVI ON NIMILAPPU, EI NIMI (omistajan tilaus 27.8.2026): siinä
 * lukee "Pöllö Pulu" pöllö yli vedettynä. textContent näkee molemmat
 * sanat, joten tarkistetaan korvaava sana — se on se, joka jää.
 */
vaadi('vaihe 2 on pöllön huomio KUPLASSA, ei kortissa',
  tila?.vaihe === 'pollo' && tila.kupla === true && tila.ylarivi.includes('Pulu'),
  JSON.stringify(tila));
/*
 * KUPLASSA ON KAKSI KAPPALETTA (Fablen kaanon 27.8.2026): Livian
 * maadoitus isoisän merkinnän perään ja sen jälkeen vaiheen oma
 * nykypäivän huomio, joka on entisellään sanasta sanaan.
 */
vaadi('vaihe 2 alkaa Livian maadoituksella isoisän merkintään',
  tila?.teksti.startsWith('"Molemmat puolet saattavat olla oikeassa yhtä aikaa."')
  && tila.teksti.includes('Hän osui, ja se harmittaa minua'),
  JSON.stringify(tila?.teksti));
vaadi('pöllön teksti on lyhennetty päätoimittajan versioon',
  tila?.teksti.includes('Isoisäsi ei koskaan saanut tietää, miten kullan kävi.')
  && tila.teksti.includes('Katso ensin tuonne ylös.') && tila.teksti.length < 560,
  JSON.stringify(tila?.teksti));
vaadi('kupla on pöllönapin yläpuolella eikä peitä sitä',
  Boolean(pollonappi) && tila?.laatikko.alin <= pollonappi.ylin,
  JSON.stringify({ kupla: tila?.laatikko, nappi: pollonappi }));
vaadi('kupla pysyy ruudun sisällä',
  tila?.laatikko.vasen >= 0 && tila.laatikko.oikea <= tila.ikkuna.w
  && tila.laatikko.ylin >= 0, JSON.stringify(tila?.laatikko));
vaadi('kuplan kärki osoittaa pöllönappiin',
  Boolean(karki) && Math.abs((karki.vasen + parseFloat(karki.arvo)) - pollonappi.keski) <= 3,
  JSON.stringify({ karki, nappi: pollonappi }));
vaadi('kuplassa ei ole isoa kuvaa — herokuva on kartalla',
  tila?.kuvia === 0, JSON.stringify(tila?.kuvia));
vaadi('leipäteksti on lukukirjasimella eikä kirjoituskoneella',
  /Iowan|Charter|Palatino|Georgia|Times|serif/i.test(tila?.leipafontti ?? '')
  && !/Typewriter|Courier/i.test(tila?.leipafontti ?? '') && tila.leipakoko >= 15,
  JSON.stringify({ fontti: tila?.leipafontti, koko: tila?.leipakoko }));
vaadi('matkakirjakortti pysyy ylävasemmalla kuplan aikana',
  (await matkakirja())?.nurkka === 'tl');

/* --- 4: kartan kuvavinjetit --- */
let kuvat = await vinjetit();
vaadi('herokuva ilmestyy vinjettinä kartalle',
  kuvat.maara === 1 && kuvat.kerroksenMuunnos.includes('scale'), JSON.stringify(kuvat));
vaadi('vinjetissä ei ole suodattimia (iOS-sääntö)', kuvat.suodattimia === 0);

/* --- 5: valintavaihe samassa kuplassa + portti --- */
await paina('Jatka');
tila = await kortti();
const aarreNappi = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('vaihe 3 on valintakupla: kolme täkyä, kohdenosto ja aarrenappi',
  tila?.vaihe === 'valinta' && tila.kupla === true && tila.napit.length === 5,
  JSON.stringify(tila));
vaadi('kohdenosto on tarjolla valintakuplassa',
  tila?.napit.some((n) => n.teksti.includes('Kanava, jota ei vielä ollut')),
  JSON.stringify(tila?.napit));
vaadi('portti kiinni: aarteelle ei pääse ilman täkyä',
  aarreNappi?.pois === true, JSON.stringify(tila?.napit));

/* --- 6: täky on kortti kuvaviitteineen ja minivisoineen --- */
const rahatEnnen = tila.rahat;
await paina('Filosofi');
tila = await kortti();
kirja = await matkakirja();
vaadi('vaihe 4 on KORTTI kuvineen ja minivisoineen',
  tila?.vaihe === 'taky' && tila.kupla === false && tila.karttapinnassa === true
  && tila.dialogissa === false && tila.kuvia === 1 && tila.vaihtoehdot.length === 3,
  JSON.stringify(tila));
/*
 * OMISTAJAN PELITESTIPALAUTE 24.8.2026 (iPad): *"Liian raskaan oloinen
 * visuaalisesti. Kuva saisi tässä näkyä heti isolla."* Kaksi väitettä
 * korvaa entisen "kuvaviite"-väitteen:
 *   - kuva on kortin ensimmäinen asia ja lähes kortin sisuksen levyinen
 *     (ennen 5,6 rem pikkuviite tekstin vieressä),
 *   - kortin pinta on vaaleaa paperia eikä tummaa massaa.
 */
vaadi('kortin kuva näkyy heti isona, koko kortin levyisenä',
  tila?.kuvaEnsin === true && tila.kuvanLeveys >= tila.sisus * 0.9
  && tila.kuvanKorkeus >= 90,
  JSON.stringify({
    ensin: tila?.kuvaEnsin, leveys: tila?.kuvanLeveys,
    korkeus: tila?.kuvanKorkeus, sisus: tila?.sisus,
  }));
vaadi('kortti on vaalealla paperipohjalla, ei tummalla massalla',
  vaalea(tila?.pohja), JSON.stringify(tila?.pohja));
/*
 * ENTINEN VÄITE "kortti ei peitä ylävasenta matkakirjakorttia" ON
 * POISTETTU. Omistaja päinvastoin sallii peiton: *"Kortin korkeus saa
 * kasvaa kuvan takia … matkakirjakortti ylävasemmalla saa jäädä kortin
 * alle tässä vaiheessa jos tila ei muuten riitä (kuva on nyt pääasia)"*.
 * Tilalle jää fokusmoodin oma perussääntö: kortti EI ole koko ruudun
 * modaali, vaan kartta näkyy sen ylälaidan yli.
 */
vaadi('kortti ei ole koko ruudun modaali: kartta näkyy sen yli',
  Boolean(kirja) && tila?.laatikko.ylin > tila.ikkuna.h * 0.1,
  JSON.stringify({ kortti: tila?.laatikko, ikkuna: tila?.ikkuna }));
vaadi('täyn kuva liittyi kartan viuhkaan', (await vinjetit()).maara === 2);

await paina('lyhty', '.fokusvirta-vaihtoehdot');
tila = await kortti();
vaadi('oikea vastaus palkitaan rahalla',
  tila?.tulos.startsWith('Oikein!') && tila.rahat > rahatEnnen,
  JSON.stringify({ tulos: tila?.tulos, ennen: rahatEnnen, nyt: tila?.rahat }));

/* --- 7: vinjetti pysyy samankokoisena zoomatessa --- */
// Vertailukoko otetaan VASTA TÄSSÄ: viuhkassa on nyt kaksi kallistettua
// pinniä, ja kallistus kasvattaa ympäröivää laatikkoa. Sama viuhka
// molemmilla puolilla, tai mitattaisiin kallistusta eikä zoomia.
const kokoEnnenZoomia = (await vinjetit()).koot[0];
const skaalaEnnen = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(1);
});
// Zoomiliuku on animaatio; vinjettien mittakaava lasketaan vasta kun
// näkymä on asettunut (ui.paivitaMaastonimet), joten odotetaan loppuun.
await sivu.waitForTimeout(3000);
const skaalaNyt = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
kuvat = await vinjetit();
vaadi('zoomi todella muuttui', Math.abs(skaalaNyt - skaalaEnnen) > 0.01,
  JSON.stringify({ ennen: skaalaEnnen, nyt: skaalaNyt }));
vaadi('vinjetti on kiinteän kokoinen ruudulla zoomista riippumatta',
  kuvat.koot.length > 0 && kokoEnnenZoomia
  && Math.abs(kuvat.koot[0].w - kokoEnnenZoomia.w) <= 2,
  JSON.stringify({ ennen: kokoEnnenZoomia, nyt: kuvat.koot[0] }));

/* --- 8: vinjetin napautus KASVATTAA kuvan kartan päälle --- */
const vinjetinKoko = (await vinjetit()).koot[0];
await sivu.evaluate(() => document.querySelector('.fokuskuva-pinni')?.dispatchEvent(
  new MouseEvent('click', { bubbles: true }),
));
await sivu.waitForTimeout(700);
let zoom = await suurennos();
vaadi('vinjetin napautus avaa oman suurennoksen, ei lehtien katselinta',
  Boolean(zoom) && zoom.lehtikatselin === false, JSON.stringify(zoom));
/*
 * KUVA ISOMMAKSI (omistajan pelitestipalaute 24.8.2026, iPad: *"KUVA
 * ISOMMAKSI … kasvata niin että kuva täyttää ruudun selvästi"*). Entinen
 * mitta oli ~0,82 ruudun pienemmästä sivusta; nyt vaaditaan vähintään
 * 0,82 mutta kartta jää yhä joka reunalta näkyviin (kehys ei täytä
 * ruutua kokonaan).
 */
vaadi('kuva kasvoi vinjetistä suureksi ja täyttää ruudun selvästi',
  Boolean(zoom?.kuva) && zoom.kuva.w > vinjetinKoko.w * 3
  && zoom.kuva.w >= Math.min(zoom.ikkuna.w, zoom.ikkuna.h) * 0.82
  && zoom.kuva.w <= Math.min(zoom.ikkuna.w, zoom.ikkuna.h),
  JSON.stringify({ vinjetti: vinjetinKoko, suuri: zoom?.kuva, ikkuna: zoom?.ikkuna }));
vaadi('kartta näkyy yhä taustalla: kevyt himmennys, ei sumennusta',
  zoom?.kartta === true && zoom.taustanAlfa <= 0.6 && !/blur/.test(zoom.sumennus),
  JSON.stringify({ alfa: zoom?.taustanAlfa, sumennus: zoom?.sumennus }));
vaadi('kehys mahtuu ruutuun eikä kartta katoa kokonaan',
  Boolean(zoom?.kehys) && zoom.kehys.w <= zoom.ikkuna.w
  && zoom.kehys.h <= zoom.ikkuna.h,
  JSON.stringify({ kehys: zoom?.kehys, ikkuna: zoom?.ikkuna }));
vaadi('selite ja lähde ovat kuvan ALLA (CC BY vaatii tekijän)',
  zoom?.selite.length > 10 && zoom.lahde.length > 10
  && zoom.tekstinYlin >= zoom.kuva.alin,
  JSON.stringify({ selite: zoom?.selite, lahde: zoom?.lahde }));
/*
 * KUVATEKSTI PALKKIIN, EI IRTOTEKSTIKSI (omistajan pelitestipalaute
 * 24.8.2026: *"selite + lähderivi valuvat irtotekstinä kartan ja pöllön
 * kuplan päälle (lukukelvoton)"*). Kolme väitettä:
 *   - teksti on paperikehyksen SISÄLLÄ eikä sen alapuolella kartan
 *     päällä,
 *   - kehyksellä on vaalea paperitausta (atlas-/postikorttikehys),
 *   - palkki on täsmälleen kuvan levyinen.
 */
vaadi('kuvateksti on paperikehyksen sisällä, ei kartan päällä irrallaan',
  zoom?.tekstiKehyksessa === true, JSON.stringify({
    teksti: zoom?.tekstinYlin, kehys: zoom?.kehys,
  }));
vaadi('suurennoksella on vaalea paperikehys (atlas/postikortti)',
  vaalea(zoom?.tekstipalkki), JSON.stringify(zoom?.tekstipalkki));
vaadi('kuvatekstipalkki on kuvan levyinen',
  Math.abs((zoom?.tekstinLeveys ?? 0) - (zoom?.kuva?.w ?? 0)) <= 4,
  JSON.stringify({ palkki: zoom?.tekstinLeveys, kuva: zoom?.kuva?.w }));
vaadi('pöllön kupla ja kortti häviävät suurennoksen ajaksi',
  zoom?.kuplaNakyy === false, JSON.stringify(zoom?.kuplaNakyy));
vaadi('viuhkaa voi selata suurennoksessa', zoom?.laskuri.includes('/'),
  JSON.stringify(zoom?.laskuri));

// Napautus mihin tahansa — myös kuvaan — kutistaa takaisin vinjettiin.
await sivu.evaluate(() => document.querySelector('.fokuszoom-kuva')?.dispatchEvent(
  new MouseEvent('click', { bubbles: true }),
));
await sivu.waitForTimeout(700);
vaadi('napautus kuvaan sulkee suurennoksen', (await suurennos()) === null);
vaadi('kortti palaa näkyviin suurennoksen sulkeuduttua',
  await sivu.evaluate(() => {
    const pinta = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
    return Boolean(pinta) && Number(getComputedStyle(pinta).opacity) > 0.9
      && !document.body.classList.contains('fokuszoom-paalla');
  }));

/* --- 9: portti aukeaa --- */
await paina('Takaisin');
tila = await kortti();
const aarreNyt = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('portti aukeaa yhdestä täystä', aarreNyt?.pois === false, JSON.stringify(tila?.napit));
vaadi('tehtyä täkyä ei tarjota uudelleen',
  !tila?.napit.some((n) => n.teksti.includes('Filosofi')), JSON.stringify(tila?.napit));

/* --- 9b: KOHDENOSTO — huomio muualle kuin pelikaupunkiin --- */
const ryhmatEnnen = (await vinjetit()).ryhmat.length;
await paina('Kanava, jota ei vielä ollut');
tila = await kortti();
kuvat = await vinjetit();
// Korintin kanava Euroopan laudalla: x = (22,98389 + 11) × 19,2 ja
// y = (72 − 37,93472) × 26,3 (js/packs/fokuskohteet-grc.js).
const kanavaRyhma = kuvat.ryhmat.find((m) => /translate\(652\.5\s+895\.9\)/.test(m));
vaadi('kohdenosto on pöllön KUPLA ilman minivisaa',
  tila?.vaihe === 'kohde' && tila.kupla === true && tila.vaihtoehdot.length === 0
  && tila.napit.length === 1, JSON.stringify(tila));
vaadi('kupla kertoo kohteesta 1873-kulmasta',
  tila?.otsikko.includes('Korintin kanava')
  && tila.teksti.includes('Periandros') && tila.teksti.includes('1881'),
  JSON.stringify(tila?.teksti));
vaadi('kartalle tuli oma ryhmä KOHTEEN sijaintiin, ei kaupungin viuhkaan',
  kuvat.ryhmat.length === ryhmatEnnen + 1 && Boolean(kanavaRyhma),
  JSON.stringify(kuvat.ryhmat));
vaadi('kohteen vinjetti on kiinteän kokoinen kuten muutkin',
  /scale\(/.test(kanavaRyhma ?? ''), JSON.stringify(kanavaRyhma));

await paina('Takaisin');
tila = await kortti();
kuvat = await vinjetit();
vaadi('kohteesta palataan valintaan eikä kohdetta tarjota uudelleen',
  tila?.vaihe === 'valinta'
  && !tila.napit.some((n) => n.teksti.includes('Kanava, jota ei vielä ollut')),
  JSON.stringify(tila?.napit));
vaadi('kohteen vinjetti jää kartalle muistoksi',
  kuvat.ryhmat.some((m) => /translate\(652\.5\s+895\.9\)/.test(m)),
  JSON.stringify(kuvat.ryhmat));

/* --- 10: kuplan napautus sulkee, tila säilyy --- */
await sivu.evaluate(() => {
  const kupla = document.querySelector('.fokusvirta-kupla');
  kupla?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await sivu.waitForTimeout(300);
vaadi('napautus kuplaan sulkee sen', (await kortti()) === null);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(400);
tila = await kortti();
vaadi('uusi avaus jatkaa samasta vaiheesta, ei alusta',
  tila?.vaihe === 'valinta', JSON.stringify(tila));

/* --- 11: saapuminen avaa virran itsestään --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  // Saapumisen merkki on sama kuin Tutki-napin sykkeellä; istunnon
  // avausmuisti nollataan, jotta laukaisin saa toimia uudestaan.
  ui.fokusvirtaAvattu = new Set();
  ui.lehtitila.tutkiSyke = 'europe:ateena';
  ui.render();
});
await sivu.waitForTimeout(600);
tila = await kortti();
vaadi('saapuminen avaa virran ilman nappia', Boolean(tila), JSON.stringify(tila));

/* --- vaiheet 5–6 ja luovutus laattamekaniikalle --- */
await paina('aarteelle');
tila = await kortti();
vaadi('vaihe 5 on oppituntikortti, joka pohjustaa laattakysymystä',
  tila?.vaihe === 'oppitunti' && tila.kupla === false && tila.teksti.includes('demokratia'),
  JSON.stringify(tila?.vaihe));
// Kartalla on nyt neljä kuvaa: herokuva, täky, kohdenosto ja oppitunti
// — kolme Ateenan viuhkassa ja yksi Korintin kannaksella.
vaadi('oppitunnin kuva liittyi kartan viuhkaan', (await vinjetit()).maara === 4);

await paina('Nikos');
tila = await kortti();
vaadi('vaihe 6 esittelee paikallisen',
  tila?.vaihe === 'kohtaaminen' && tila.otsikko.includes('Nikos'), JSON.stringify(tila?.vaihe));

await paina('Tapaa Nikos');
await sivu.waitForTimeout(900);
const luovutus = await sivu.evaluate(() => ({
  kortti: Boolean(document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla')),
  vaihe: window.matkakirja.game.phase,
  visa: Boolean(window.matkakirja.game.quiz),
  virranVaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
}));
vaadi('virta luovuttaa nykyiselle laattamekaniikalle',
  luovutus.vaihe === 'quiz' && luovutus.visa && !luovutus.kortti
  && luovutus.virranVaihe === 'valmis', JSON.stringify(luovutus));

/* --- 12: KORTIN VIERITYS EI PANOROI KARTTAA (puhelin, kosketus) ------
 *
 * Omistajan pelitestipalaute 24.8.2026 (v1098, puhelin): *"Kartta
 * liikkuu kun Pöllön tekstiä vierittää."* Fokusvirran kortti on
 * .map-panen lapsi, joten sen kosketustapahtumat kuplivat kartan
 * panorointikäsittelijöille — tekstin vieritys raahasi karttaa.
 *
 * Vartio vaatii OIKEAT kosketustapahtumat: JS:llä lähetetty TouchEvent
 * ei synnytä osoitintapahtumia lainkaan, joten se ei koskisi
 * panorointia eikä todistaisi mitään. Siksi oma konteksti
 * (hasTouch) ja CDP:n Input.dispatchTouchEvent.
 */
const { sivu: puhelin } = await avaaSivu({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
});
const cdp = await puhelin.context().newCDPSession(puhelin);
const kosketa = (tyyppi, x, y) => cdp.send('Input.dispatchTouchEvent', {
  type: tyyppi,
  touchPoints: tyyppi === 'touchEnd'
    ? []
    : [{ x, y, radiusX: 6, radiusY: 6, force: 1, id: 1 }],
});
/** Yhden sormen veto: aloitus, portaittainen liike, irrotus. */
const veto = async (x, y, dx, dy, askelia = 10) => {
  await kosketa('touchStart', x, y);
  for (let i = 1; i <= askelia; i += 1) {
    await kosketa('touchMove', x + (dx * i) / askelia, y + (dy * i) / askelia);
    await puhelin.waitForTimeout(20);
  }
  await kosketa('touchEnd', x + dx, y + dy);
  // reducedMotion sammuttaa liu'un, joten asento on heti lopullinen.
  await puhelin.waitForTimeout(300);
};
/** Kartan siirtotila: pan-luvut, muunnos ja viewBox yhtenä sormenjälkenä. */
const kartanTila = () => puhelin.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    panX: Math.round((ui.panX ?? 0) * 10) / 10,
    panY: Math.round((ui.panY ?? 0) * 10) / 10,
    // Siirto asuu kartan kuoressa (wrapper-siirto 26.8.2026), ei
    // enää svg-juuressa.
    muunnos: (ui.karttaKuori ?? ui.svg).style.transform,
    viewBox: ui.svg.getAttribute('viewBox'),
    vara: Math.round(ui.panVara ?? 0),
    varaY: Math.round(ui.panVaraY ?? 0),
    lahikuva: Boolean(ui.mannerZoom || ui.aloitusZoom),
  };
});
const samaKartta = (a, b) => Boolean(a) && Boolean(b)
  && a.panX === b.panX && a.panY === b.panY
  && a.muunnos === b.muunnos && a.viewBox === b.viewBox;

// Virta samaan vaiheeseen kuin osiossa 2: merkintä ensin, sitten pöllö.
await puhelin.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await puhelin.waitForTimeout(500);
await puhelin.evaluate(() => {
  const ui = window.matkakirja.ui;
  delete ui.game.fokusvirrat['europe:ateena'];
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  ui.factKey = null;
  ui.render();
});
await puhelin.waitForTimeout(MERKINNAN_TAUKO_MS + 1400);

// Lähikuva päälle, jotta kartalla on oikeasti panorointivaraa: ilman
// varaa mikä tahansa veto jättäisi kartan paikalleen ja vartio olisi
// tyhjä.
await puhelin.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
await puhelin.waitForTimeout(2500);
/*
 * KARTTA KESKELLE VARAANSA ENNEN JOKAISTA VETOA. Lähikuva asettuu
 * tyypillisesti laitaan, ja laidassa asetaPan rajaa siirron pois —
 * väärään suuntaan vedetty ele jättäisi kartan paikalleen, ja vartio
 * läpäisisi myös rikkinäisellä koodilla (mitattu: näin kävi, kun
 * suoja poistettiin kokeeksi). Keskeltä liike näkyy joka suuntaan.
 */
const keskita = async () => {
  await puhelin.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.kartta.asetaPan(-(ui.panVara ?? 0) / 2, -(ui.panVaraY ?? 0) / 2);
  });
  await puhelin.waitForTimeout(200);
};
await keskita();
const alkuTila = await kartanTila();
vaadi('kosketusvartio: kartalla on panorointivaraa joka suuntaan',
  alkuTila.lahikuva && alkuTila.vara > 60 && alkuTila.varaY > 60
  && alkuTila.panX < -20 && alkuTila.panX > -alkuTila.vara + 20
  && alkuTila.panY < -20 && alkuTila.panY > -alkuTila.varaY + 20,
  JSON.stringify(alkuTila));

/** Pinnan (kortti tai kupla) sisuksen keskikohta ruudulla. */
const pinnanKohta = () => puhelin.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
  const sisus = el?.querySelector('.fokusvirta-sisalto');
  if (!sisus) return null;
  const r = sisus.getBoundingClientRect();
  return {
    x: Math.round(r.left + r.width / 2),
    y: Math.round(r.top + r.height / 2),
    kupla: el.classList.contains('fokusvirta-kupla'),
    vieritettava: sisus.scrollHeight > sisus.clientHeight + 2,
    vieritys: Math.round(sisus.scrollTop),
  };
});

/* 12a: pöllön kupla — veto tekstin päällä ei liikuta karttaa. */
let kohta = await pinnanKohta();
await keskita();
let ennen = await kartanTila();
if (kohta) await veto(kohta.x, kohta.y, 0, -140);
vaadi('kuplan tekstin veto ei panoroi karttaa',
  Boolean(kohta?.kupla) && samaKartta(ennen, await kartanTila()),
  JSON.stringify({ kohta, ennen, jalkeen: await kartanTila() }));

/* 12b: täkykortti — pysty- ja vaakaveto jäävät kortin sisään. */
await puhelin.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await puhelin.waitForTimeout(500);
await paina('Jatka', '.fokusvirta-napit', puhelin);
await paina('Filosofi', '.fokusvirta-napit', puhelin);
await puhelin.waitForTimeout(400);
kohta = await pinnanKohta();
const kortinPinta = await puhelin.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti');
  return Boolean(el) && Boolean(el.closest('.map-pane'));
});
vaadi('täkykortti on kartan päällä ja sen sisältö on vieritettävä',
  kortinPinta && kohta?.kupla === false && kohta.vieritettava === true,
  JSON.stringify({ kortinPinta, kohta }));

await keskita();
ennen = await kartanTila();
await veto(kohta.x, kohta.y, 0, -150);
let jalkeen = await kartanTila();
const vierityksenJalkeen = (await pinnanKohta())?.vieritys ?? 0;
vaadi('kortin tekstin pystyveto EI panoroi karttaa',
  samaKartta(ennen, jalkeen), JSON.stringify({ ennen, jalkeen }));
vaadi('kortin tekstin pystyveto vierittää KORTTIA',
  vierityksenJalkeen > 0, JSON.stringify({ vieritys: vierityksenJalkeen }));

await keskita();
ennen = await kartanTila();
await veto(kohta.x, kohta.y, -150, 0);
jalkeen = await kartanTila();
vaadi('kortin vaakaveto EI panoroi karttaa',
  samaKartta(ennen, jalkeen), JSON.stringify({ ennen, jalkeen }));

/* 12c: kartan oma panorointi toimii yhä — kortin ULKOPUOLELTA.
 *
 * Matkakirjakortti kutistetaan ensin yhden rivin lapuksi (sama kuin
 * kartan napautus tekee), muuten se ja täkykortti peittävät puhelimen
 * kapean kartan kokonaan eikä vapaata kohtaa ole. */
await puhelin.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(true));
await puhelin.waitForTimeout(500);
const kartanKohta = await puhelin.evaluate(() => {
  const pane = document.querySelector('.map-pane')?.getBoundingClientRect();
  if (!pane) return null;
  const paalla = '.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom, .fact-card';
  for (let y = pane.top + 24; y < pane.bottom - 24; y += 8) {
    for (let x = pane.left + 40; x < pane.right - 40; x += 16) {
      const el = document.elementFromPoint(x, y);
      if (el?.closest('svg') && !el.closest(paalla)) {
        return { x: Math.round(x), y: Math.round(y) };
      }
    }
  }
  return null;
});
await keskita();
ennen = await kartanTila();
if (kartanKohta) {
  /*
   * Suunta valitaan sen mukaan, kummalla puolella on vielä varaa:
   * panX/panY ovat välillä [-vara, 0], ja tässä kohtaa lähikuva on
   * usein jo laidassa. Väärään suuntaan vedetty ele ei liikuttaisi
   * karttaa lainkaan — eikä vartio erottaisi sitä viasta.
   */
  const vaakaan = ennen.vara >= ennen.varaY;
  const paikka = vaakaan ? ennen.panX : ennen.panY;
  const varaa = vaakaan ? ennen.vara : ennen.varaY;
  // Kohti nollaa, jos sinne on matkaa; muuten kohti alarajaa.
  const matka = -paikka > varaa / 2 ? 140 : -140;
  await veto(kartanKohta.x, kartanKohta.y,
    vaakaan ? matka : 0, vaakaan ? 0 : matka);
}
jalkeen = await kartanTila();
vaadi('kartan oma panorointi toimii yhä kortin ulkopuolelta',
  Boolean(kartanKohta) && !samaKartta(ennen, jalkeen),
  JSON.stringify({ kohta: kartanKohta, ennen, jalkeen }));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
