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
 *   2. pöllön puhekupla (.fokusvirta-kupla) — pöllön huomio
 *   3. annostelukortti (.fokusvirta-kortti) — oppitunti ja kohtaaminen.
 * Kartan kuvavinjetit (.fokuskuva-pinni) OLIVAT neljäs pinta; viuhka
 * purettiin 30.8.2026 (omistajan bugiraportti: sisältökuvat kuuluvat
 * kortteihin, eivät kartalle) ja savuke vartioi nyt, ettei yhtäkään
 * pinniä ilmesty.
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
 *   4. Kuplan Jatka vie SUORAAN oppituntiin eikä Pulu kysy mitään:
 *      valintakupla vaiheineen on purettu (Raamattu, SYVENNYSTARINAT
 *      KARTALLE — syvennystarinat avautuvat kartan merkeistä,
 *      js/syvennys.js, katettu savuke-selitevalikossa).
 *   5. Oppitunti on KORTTI: iso kuva heti kortin yläosassa. Kortti on
 *      VAALEAA PAPERIA eikä tumma massa (omistajan pelitestipalaute
 *      24.8.2026: *"Liian raskaan oloinen visuaalisesti. Kuva saisi
 *      tässä näkyä heti isolla."*), ja se saa kasvaa kuvan takia
 *      ylävasemman matkakirjakortin päälle — mutta ei koko ruudun
 *      modaaliksi.
 *   6. Leipäteksti on lukukirjasimella, ei kirjoituskoneella
 *      (omistajan palaute: *"fontti saisi olla luettavampi"*).
 *   7. Kartalle EI ilmesty kuvavinjettejä missään virran vaiheessa
 *      eikä zoomin asettuessa (viuhka purettu 30.8.2026).
 *   8. KUVAN SUURENNOS (omistajan tilaus 24.8.2026): napautus KASVATTAA
 *      kuvan kortin kuvaviitteestä suureksi kartan päälle — ei koko ruudun
 *      katselinta, ei täyttä pimennystä, kartta näkyy yhä taustalla.
 *      Pelitestin jälkeen kolme lisävaatimusta: kuva täyttää ruudun
 *      selvästi, selite ja lähde ovat PAPERIKEHYKSEN sisällä kuvan
 *      levyisenä palkkina (ennen ne valuivat irtotekstinä kartan
 *      päälle), ja pöllön kupla häviää suurennoksen ajaksi.
 *   9. Tila säilyy: pinnan sulku ja uusi avaus jatkavat samasta
 *      vaiheesta eivätkä ala alusta.
 *  10. Saapuminen avaa virran itsestään (ANNOSTELU-poikkeus "mikään ei
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
 * mittaa korttiannostelua ja lehtinakymaa, jotka olivat kokeilun ajan
 * lipun takana (js/fokusvirta.js FOKUSVIRTA_KORTIT). Lipun ollessa pois
 * savuke ohitetaan; kun vanha virta palautetaan, vahti paastaa
 * savukkeen ajoon sellaisenaan. Kokeilutilan oma kattavuus:
 * tools/savuke-fokusvirta.mjs ja tools/savuke-fokuskartta.mjs.
 *
 * OMISTAJAN PAATOS 29.8.2026 ("Paalle - koko kulku testiin"): lippu on
 * nyt paalla, joten tama savuke ajaa taas. Vahti lukee EXPORT-RIVIN eika
 * pelkkaa mainintaa — moduulin historiakommentti riitti aiemmin
 * ohittamaan savukkeen vaikka lippu oli paalla (havaittu 29.8.2026).
 */
/*
 * VALINTAKUPLA ON PURETTU (Raamattu, SYVENNYSTARINAT KARTALLE:
 * valintakupla ja tilakoneen valintavaiheet purettiin, kun merkkireitti
 * tuli tuotantoon v1348-v1349). Savukkeen valinta-, taky- ja
 * kohdenosto-osiot poistettiin purun mukana; kulku on nyt aina
 * kupla -> Jatka -> oppitunti. Syvennystarinoiden kartta- ja
 * korttireitin kattaa savuke-selitevalikko.
 */
(() => {
  // readFileSync tulee alempaa staattisesta tuonnista: ES-moduulin
  // tuonnit nostetaan tiedoston alkuun, joten se on jo käytettävissä.
  const virta = readFileSync(new URL('../../js/fokusvirta.js', import.meta.url), 'utf8');
  const maaritys = virta.match(/^export const FOKUSVIRTA_KORTIT = (\w+);$/m);
  if (!maaritys) throw new Error('FOKUSVIRTA_KORTIT-lipun maaritysta ei loydy');
  if (maaritys[1] === 'false') {
    console.log('OHITETTU: kevyt kulku -kokeilu paalla (FOKUSVIRTA_KORTIT=false)');
    process.exit(0);
  }
})();
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

/* Valmis peli: Fogg seisoo Ateenassa, laatta kääntämättä. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
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
    vaihe: window.matkakirja.game.fokusvirrat['maailmankartta:ateena']?.vaihe ?? null,
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
 * Sivu on parametri, jotta kosketusosio (osio 11) voi ajaa saman virran
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

/* --- 1: kaupungin napautus avaa AINA kaupunkilehden (omistaja
 * 2.9.2026 ilta: "Kohdekaupunki avaa aina kaupunkilehden ei mitään
 * muuta") — lehtilukko on purettu, virran kortti ei kaappaa avausta. --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(500);
const lehtiAuki = await sivu.evaluate(() => document.getElementById('arrival-dialog').open);
vaadi('kaupungin napautus avaa kaupunkilehden, ei virran korttia', lehtiAuki
  && await sivu.evaluate(() => !document.querySelector('.fokusvirta-kortti')));
await sivu.evaluate(() => document.getElementById('arrival-dialog').close());
await sivu.waitForTimeout(300);

/** Virran kortti avataan savukkeessa suoraan moduulista, ei lehden kautta. */
const avaaVirta = (kohde = sivu) => kohde.evaluate(async () => {
  const { avaaFokusvirta } = await import('/js/fokusvirta.js');
  const ui = window.matkakirja.ui;
  avaaFokusvirta(ui, ui.game.cityOf());
});

/* --- 2: vaihe 1 on ylävasen matkakirjakortti, ei virran oma kortti --- */
// Tutki kuittasi merkinnän jo luetuksi, joten tila palautetaan alkuun.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  delete ui.game.fokusvirrat['maailmankartta:ateena'];
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  ui.factKey = null;
  ui.render();
});
await sivu.waitForTimeout(500);
let kirja = await matkakirja();
let tila = await kortti();
/*
 * OTSAKE LYHENI (v1119): äänilähteen nimilappu on nyt pelkkä
 * "Matkapäiväkirja" (js/ui.js factVoiceEl), ei "Matkapäiväkirjasta".
 * Savuke nukkui lipun takana 24.8.2026 alkaen eikä nähnyt muutosta;
 * väite päivitettiin kortit päälle -päätöksen yhteydessä 29.8.2026.
 */
vaadi('vaihe 1: merkintä on ylävasemmassa matkakirjakortissa',
  kirja?.nurkka === 'tl' && kirja.aani.includes('Matkapäiväkirja')
  && kirja.paikka.includes('1873') && kirja.teksti.includes('Troijan kullan'),
  JSON.stringify(kirja));
vaadi('vaihe 1: vanha valokuva on kortin kyljessä',
  kirja?.kuvaNakyy === true && /sophia[-_ ]schliemann/i.test(kirja.kuvaOsoite),
  JSON.stringify(kirja?.kuvaOsoite));
/*
 * KAIUTIN NÄKYY, KOSKA MERKINNÄLLÄ ON ÄÄNITE. Väite luki ennen, että
 * saapumisluenta on vaiennettu ja kuuntelunappi piilossa. Ateenan
 * matkakirjamerkinnälle äänitettiin sittemmin puhe
 * (assets/audio/puhe-fokus-matkakirja-ateena.mp3), joten nappi on
 * paikallaan — päivitetty 29.8.2026 kortit päälle -päätöksen yhteydessä.
 */
vaadi('vaihe 1: kaiutin näkyy, koska merkinnällä on äänite',
  kirja?.kuunteluPiilossa === false, JSON.stringify(kirja?.kuunteluPiilossa));
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
 * lukee "Viisas Pöllö Pulu" nimi yli vedettynä. textContent näkee
 * kaikki sanat, joten tarkistetaan korvaava sana — se on se, joka jää.
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
/*
 * LAINAUKSET PUHEKIELISTYIVÄT savukkeen nukkuessa: "miten kullan kävi"
 * → "miten sen kullan kävi", "tuonne ylös" → "tonne ylös"
 * (js/packs/fokusvirta-ateena.js). Pituusraja pysyy ennallaan;
 * päivitetty 29.8.2026 kortit päälle -päätöksen yhteydessä.
 */
vaadi('pöllön teksti on lyhennetty päätoimittajan versioon',
  tila?.teksti.includes('Isoisäsi ei koskaan saanut tietää, miten sen kullan kävi.')
  && tila.teksti.includes('Katso ensin tonne ylös.') && tila.teksti.length < 560,
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
vaadi('kuplassa ei ole isoa kuvaa — herokuva on kaupunkilehdessä',
  tila?.kuvia === 0, JSON.stringify(tila?.kuvia));
vaadi('leipäteksti on lukukirjasimella eikä kirjoituskoneella',
  /Iowan|Charter|Palatino|Georgia|Times|serif/i.test(tila?.leipafontti ?? '')
  && !/Typewriter|Courier/i.test(tila?.leipafontti ?? '') && tila.leipakoko >= 15,
  JSON.stringify({ fontti: tila?.leipafontti, koko: tila?.leipakoko }));
vaadi('matkakirjakortti pysyy ylävasemmalla kuplan aikana',
  (await matkakirja())?.nurkka === 'tl');

/* --- 4: kartalla EI ole kuvavinjettejä ---
 *
 * Viuhka on purettu (omistajan bugiraportti 30.8.2026, Sofian
 * kuvakaappaus: polaroidit leijuivat kartalla — sisältökuvat kuuluvat
 * kortteihin, ks. js/fokusvirta.js KUVAT KARTALLA — PURETTU). Vartio
 * kääntyi ympäri: yhtään .fokuskuva-pinniä ei saa ilmestyä missään
 * virran vaiheessa.
 */
let kuvat = await vinjetit();
vaadi('kartalle ei ilmesty kuvavinjettejä pöllön vaiheessa',
  kuvat.maara === 0, JSON.stringify(kuvat));

/* --- 5: Livian kuplan "Jatka" vie suoraan oppituntiin --- */
await paina('Jatka');
tila = await kortti();
/*
 * Valintakupla on purettu: Pulu ei kysy painikkeilla mitään, vaan
 * kuplan Jatka avaa suoraan oppituntikortin, eikä ruudulla ole
 * yhtäkään täky- tai kohdenostonappia.
 */
vaadi('kuplan Jatka vie suoraan oppituntiin',
  tila?.vaihe === 'oppitunti' && tila.kupla === false,
  JSON.stringify({ vaihe: tila?.vaihe, kupla: tila?.kupla }));
vaadi('Pulu ei kysy täkyjä eikä kohdenostoja',
  Boolean(tila) && !tila.napit.some((n) => /Filosofi|Kanava, jota ei vielä ollut/.test(n.teksti)),
  JSON.stringify(tila?.napit));
vaadi('oppitunnin kuva ei mene kartalle (viuhka on purettu)',
  (await vinjetit()).maara === 0, JSON.stringify(await vinjetit()));
/*
 * Kortin ulkoasuvartiot (omistajan pelitestipalaute 24.8.2026: *"Liian
 * raskaan oloinen visuaalisesti. Kuva saisi tässä näkyä heti isolla."*)
 * ajetaan oppituntikortilla — sama kehys, sama iso kuva ja sama
 * paperipohja kuin kaikilla piirraKehyksen korteilla.
 */
kirja = await matkakirja();
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

/* --- 7: kartta pysyy kuvattomana myös zoomatessa --- */
// Entinen vartio mittasi vinjetin kiinteää ruutukokoa; viuhkan purun
// jälkeen zoomin asettuminen (sama piirtokohta, ui.paivitaMaastonimet)
// ei saa herättää yhtäkään pinniä henkiin.
const skaalaEnnen = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(1);
});
// Zoomiliuku on animaatio; merkkikerrokset lasketaan vasta kun näkymä
// on asettunut, joten odotetaan loppuun.
await sivu.waitForTimeout(3000);
const skaalaNyt = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
kuvat = await vinjetit();
vaadi('zoomi todella muuttui', Math.abs(skaalaNyt - skaalaEnnen) > 0.01,
  JSON.stringify({ ennen: skaalaEnnen, nyt: skaalaNyt }));
vaadi('kartalle ei ilmesty kuvia zoomin asettuessa',
  kuvat.maara === 0 && kuvat.koot.length === 0, JSON.stringify(kuvat));

/* --- 8: kortin kuvaviitteen napautus KASVATTAA kuvan kartan päälle ---
 *
 * Suurennos avattiin ennen kartan vinjetistä; viuhkan purun jälkeen
 * sama suurennos elää korttien kuvaviitteissä (js/fokusvirta.js
 * piirraKuva → avaaSuurennos). Ruudulla on oppituntikortti, jonka
 * pääkuva on koko kortin levyinen nappi.
 */
const viitteenKoko = await sivu.evaluate(() => {
  const r = document.querySelector('.fokusvirta-kortti .fokusvirta-kuva')
    ?.getBoundingClientRect();
  return r ? { w: Math.round(r.width), h: Math.round(r.height) } : null;
});
await sivu.evaluate(() => document.querySelector('.fokusvirta-kortti .fokusvirta-kuva')
  ?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
await sivu.waitForTimeout(700);
let zoom = await suurennos();
vaadi('kuvaviitteen napautus avaa oman suurennoksen, ei lehtien katselinta',
  Boolean(zoom) && zoom.lehtikatselin === false, JSON.stringify(zoom));
/*
 * KUVA ISOMMAKSI (omistajan pelitestipalaute 24.8.2026, iPad: *"KUVA
 * ISOMMAKSI … kasvata niin että kuva täyttää ruudun selvästi"*):
 * vähintään 0,82 ruudun pienemmästä sivusta, mutta kartta jää yhä
 * joka reunalta näkyviin (kehys ei täytä ruutua kokonaan).
 */
vaadi('kuva kasvoi suureksi ja täyttää ruudun selvästi',
  Boolean(zoom?.kuva) && Boolean(viitteenKoko)
  && zoom.kuva.w >= Math.min(zoom.ikkuna.w, zoom.ikkuna.h) * 0.82
  && zoom.kuva.w <= Math.min(zoom.ikkuna.w, zoom.ikkuna.h),
  JSON.stringify({ viite: viitteenKoko, suuri: zoom?.kuva, ikkuna: zoom?.ikkuna }));
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
// Kortin kuvaviite avaa yhden kuvan listan: laskuria ei näytetä
// (avaaSuurennos piirtää laskurin vain monikuvaiselle listalle).
vaadi('yhden kuvan suurennoksessa ei ole selauslaskuria',
  zoom?.laskuri === '', JSON.stringify(zoom?.laskuri));

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

/* --- 9: pinnan napautus sulkee, tila säilyy ---
 *
 * Ruudulla on oppituntikortti, joten sulku tehdään kortin rastista ja
 * odotettu vaihe on 'oppitunti': suljettu pinta palaa samaan
 * vaiheeseen. */
const ODOTETTU_VAIHE = 'oppitunti';
await sivu.evaluate(() => {
  const kupla = document.querySelector('.fokusvirta-kupla');
  if (kupla) {
    kupla.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    return;
  }
  document.querySelector('.fokusvirta-kortti .fokusvirta-sulje')?.click();
});
await sivu.waitForTimeout(300);
vaadi('napautus pintaan sulkee sen', (await kortti()) === null);
await avaaVirta();
await sivu.waitForTimeout(400);
tila = await kortti();
vaadi('uusi avaus jatkaa samasta vaiheesta, ei alusta',
  tila?.vaihe === ODOTETTU_VAIHE, JSON.stringify(tila));

/* --- 10: saapuminen avaa virran itsestään --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  // Saapumisen merkki on sama kuin Tutki-napin sykkeellä; istunnon
  // avausmuisti nollataan, jotta laukaisin saa toimia uudestaan.
  ui.fokusvirtaAvattu = new Set();
  ui.lehtitila.tutkiSyke = 'maailmankartta:ateena';
  ui.render();
});
await sivu.waitForTimeout(600);
tila = await kortti();
vaadi('saapuminen avaa virran ilman nappia', Boolean(tila), JSON.stringify(tila));

/* --- oppitunti ja kohtaaminen: luovutus laattamekaniikalle --- */
// Oppitunnilla ollaan jo: kuplan Jatka toi tänne.
tila = await kortti();
vaadi('oppituntikortti pohjustaa laattakysymystä',
  tila?.vaihe === 'oppitunti' && tila.kupla === false && tila.teksti.includes('demokratia'),
  JSON.stringify(tila?.vaihe));
// Viuhka on purettu kokonaan (30.8.2026): kartalla ei ole kuvia
// tässäkään vaiheessa.
vaadi('kartalla ei ole kuvavinjettejä oppitunnilla',
  (await vinjetit()).maara === 0, JSON.stringify(await vinjetit()));

await paina('Nikos');
tila = await kortti();
vaadi('kohtaaminen esittelee paikallisen',
  tila?.vaihe === 'kohtaaminen' && tila.otsikko.includes('Nikos'), JSON.stringify(tila?.vaihe));

/*
 * KOHTAAMISEEN TULI KYLLÄ/EI-VARMISTUS 26.8.2026 (js/fokusvirta.js,
 * "KYLLÄ JA EI OVAT OIKEITA NAPPEJA"): "Tapaa Nikos" avaa varmistuksen,
 * ja luovutus laattamekaniikalle tapahtuu vasta Kyllä-napista. Väite
 * päivitettiin 29.8.2026 kortit päälle -päätöksen yhteydessä.
 */
await paina('Kyllä', '.fokusvirta-varmistusnapit');
await sivu.waitForTimeout(900);
const luovutus = await sivu.evaluate(() => ({
  kortti: Boolean(document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla')),
  vaihe: window.matkakirja.game.phase,
  visa: Boolean(window.matkakirja.game.quiz),
  virranVaihe: window.matkakirja.game.fokusvirrat['maailmankartta:ateena']?.vaihe ?? null,
}));
vaadi('virta luovuttaa nykyiselle laattamekaniikalle',
  luovutus.vaihe === 'quiz' && luovutus.visa && !luovutus.kortti
  && luovutus.virranVaihe === 'valmis', JSON.stringify(luovutus));

/* --- 11: KORTIN VIERITYS EI PANOROI KARTTAA (puhelin, kosketus) ------
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
/*
 * SORMEN SÄDE ON OSA ELETTÄ, EI KOSMETIIKKAA: Chromium kohdistaa
 * kosketuksen sen sisällä lähimpään napautettavaan elementtiin (ks.
 * kartanKohta osiossa 11c). Piste ja säde kuuluvat siksi yhteen.
 */
const KOSKETUS_SADE = 6;
const kosketa = (tyyppi, x, y) => cdp.send('Input.dispatchTouchEvent', {
  type: tyyppi,
  touchPoints: tyyppi === 'touchEnd'
    ? []
    : [{
      x, y, radiusX: KOSKETUS_SADE, radiusY: KOSKETUS_SADE, force: 1, id: 1,
    }],
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
  delete ui.game.fokusvirrat['maailmankartta:ateena'];
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  ui.factKey = null;
  ui.render();
});
await puhelin.waitForTimeout(MERKINNAN_TAUKO_MS + 1400);

/*
 * VARA MITATAAN SIITÄ RAJAAJASTA, JONKA LÄPI SORMI KULKEE.
 *
 * `panVara`/`panVaraY` ovat laudan oman jaksomallin lukuja eivätkä
 * tiedä mitään fokuskuvan rajauksesta (js/kartta.js rajaaKasinPan →
 * rajaaFokusPan, sääntö 2: *"REUNAT, EI KESKIPISTE … akseli lukitaan
 * kuvan keskelle"* silloin kun ruutu on kuvaa isompi). Ne siis lupaavat
 * varaa, jota käsieleellä ei ole. Mitattuna 31.8.2026 (Chromium,
 * 390×844, Ateena) yhden zoomiportaan jälkeen panVara oli 1440 ja
 * panVaraY 1163, mutta rajaaKasinPan palautti joka suuntaan täsmälleen
 * saman panin: kartta oli LUKOSSA molemmilla akseleilla, koska koko
 * sallittu fokusalue mahtui jo ruudulle. Vanha porrastussilmukka
 * katkesi juuri siihen ensimmäiseen portaaseen (1440 > 120 ja
 * 1163 > 120) — ja sen jälkeen 11c kaatui, koska panoroitavaa ei ollut,
 * eivätkä 11a/11b enää todistaneet mitään: kartta ei olisi liikkunut
 * niissäkään millään koodilla.
 *
 * Vara luetaan siksi rajaajasta itsestään: paljonko panX/panY oikeasti
 * muuttuu, kun sitä pyytää siirtymään `matka` pikseliä kuhunkin
 * suuntaan. Koetin on tarkoituksella lyhyt — kiertävällä laudalla pitkä
 * X-koetin kääriytyisi laudan leveyden yli eikä kertoisi paikallisesta
 * varasta mitään.
 */
const kasinVara = (matka) => puhelin.evaluate((m) => {
  const ui = window.matkakirja.ui;
  const k = ui.kartta;
  const px = ui.panX ?? 0;
  const py = ui.panY ?? 0;
  return {
    oikea: Math.round(k.rajaaKasinPan(px + m, py).x - px),
    vasen: Math.round(px - k.rajaaKasinPan(px - m, py).x),
    alas: Math.round(k.rajaaKasinPan(px, py + m).y - py),
    ylos: Math.round(py - k.rajaaKasinPan(px, py - m).y),
  };
}, matka);

/* Pisin tässä osiossa vedettävä matka: varaa on oltava vähintään tämä. */
const VETO_MATKA = 150;

/*
 * KARTTA KESKELLE VARAANSA ENNEN JOKAISTA VETOA. Lähikuva asettuu
 * tyypillisesti laitaan, ja laidassa rajaaKasinPan syö siirron pois —
 * väärään suuntaan vedetty ele jättäisi kartan paikalleen, ja vartio
 * läpäisisi myös rikkinäisellä koodilla (mitattu: näin kävi, kun
 * suoja poistettiin kokeeksi). Keskeltä liike näkyy joka suuntaan.
 *
 * Keskitys tehdään SAMAN rajaajan kautta kuin varan mittaus: laudan
 * jaksomallin puolikas (entinen -panVara/2) ei ole fokuskuvan
 * rajaaman näkymän keskikohta.
 */
const KESKITYS_KOETIN = 400;
const keskita = async () => {
  await puhelin.evaluate((m) => {
    const ui = window.matkakirja.ui;
    const k = ui.kartta;
    const px = ui.panX ?? 0;
    const py = ui.panY ?? 0;
    k.asetaPan(
      (k.rajaaKasinPan(px - m, py).x + k.rajaaKasinPan(px + m, py).x) / 2,
      (k.rajaaKasinPan(px, py - m).y + k.rajaaKasinPan(px, py + m).y) / 2,
    );
  }, KESKITYS_KOETIN);
  await puhelin.waitForTimeout(200);
};

// Lähikuva päälle, jotta kartalla on oikeasti panorointivaraa: ilman
// varaa mikä tahansa veto jättäisi kartan paikalleen ja vartio olisi
// tyhjä. Maailmankartalla (erillislauta poistui, Raamattu 30.8.2026)
// yksi porras ei anna varaa kumpaankaan suuntaan, joten porrastetaan
// kunnes vetomatka mahtuu joka suuntaan. Mitattu 31.8.2026: vaakavara
// aukeaa portaalla 2 ja pystyvara vasta portaalla 5.
for (let porras = 0; porras < 8; porras += 1) {
  await puhelin.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
  await puhelin.waitForTimeout(1200);
  await keskita();
  const vara = await kasinVara(VETO_MATKA + 20);
  if (vara.vasen >= VETO_MATKA && vara.oikea >= VETO_MATKA
    && vara.ylos >= VETO_MATKA && vara.alas >= VETO_MATKA) break;
}
await puhelin.waitForTimeout(1300);
await keskita();
const alkuTila = await kartanTila();
const alkuVara = await kasinVara(VETO_MATKA + 20);
vaadi('kosketusvartio: kartalla on käsipanorointivaraa joka suuntaan',
  alkuTila.lahikuva && alkuVara.vasen >= VETO_MATKA && alkuVara.oikea >= VETO_MATKA
  && alkuVara.ylos >= VETO_MATKA && alkuVara.alas >= VETO_MATKA,
  JSON.stringify({ tila: alkuTila, vara: alkuVara }));

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

/* 11a: pöllön kupla — veto tekstin päällä ei liikuta karttaa. */
let kohta = await pinnanKohta();
await keskita();
let ennen = await kartanTila();
if (kohta) await veto(kohta.x, kohta.y, 0, -140);
vaadi('kuplan tekstin veto ei panoroi karttaa',
  Boolean(kohta?.kupla) && samaKartta(ennen, await kartanTila()),
  JSON.stringify({ kohta, ennen, jalkeen: await kartanTila() }));

/*
 * 11b: annostelukortti — pysty- ja vaakaveto jäävät kortin sisään.
 *
 * Mitattava kortti on lipun ollessa PÄÄLLÄ täkykortti ja POIS
 * oppituntikortti: sama kehys, sama vieritettävä sisus (piirraKehys),
 * joten vartio ei riipu siitä kummasta vaiheesta kortti tulee.
 */
await avaaVirta(puhelin);
await puhelin.waitForTimeout(500);
await paina('Jatka', '.fokusvirta-napit', puhelin);
await puhelin.waitForTimeout(400);
kohta = await pinnanKohta();
const kortinPinta = await puhelin.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti');
  return Boolean(el) && Boolean(el.closest('.map-pane'));
});
vaadi('annostelukortti on kartan päällä ja sen sisältö on vieritettävä',
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

/* 11c: kartan oma panorointi toimii yhä — kortin ULKOPUOLELTA.
 *
 * Matkakirjakortti kutistetaan ensin yhden rivin lapuksi (sama kuin
 * kartan napautus tekee), muuten se ja täkykortti peittävät puhelimen
 * kapean kartan kokonaan eikä vapaata kohtaa ole. */
await puhelin.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(true));
await puhelin.waitForTimeout(500);
/*
 * VAPAA KOHTA TARVITSEE SORMEN LEVEYDEN VERRAN TILAA.
 *
 * Chromium kohdistaa kosketuksen sormen SÄTEEN sisällä lähimpään
 * napautettavaan elementtiin (touch adjustment), eikä pelkkä
 * elementFromPoint-osuma siksi riitä. Mitattu 31.8.2026: haku palautti
 * pisteen (207, 88), joka oli kuusi pikseliä matkakirjakortin oikeasta
 * reunasta (kortti [14, 70]–[201, 94]) — elementFromPoint näki siinä
 * kartan, mutta CDP:n kosketus säteellä 6 ohjautui KORTTIIN, ja kartta
 * jäi ilman koko elettä. Kohdaksi kelpaa siksi vain piste, jonka
 * ympäriltä sormen levyinen alue on kokonaan karttaa.
 */
const kartanKohta = await puhelin.evaluate((sade) => {
  const pane = document.querySelector('.map-pane')?.getBoundingClientRect();
  if (!pane) return null;
  const paalla = '.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom, .fact-card';
  const kartalla = (x, y) => {
    const el = document.elementFromPoint(x, y);
    return Boolean(el?.closest('svg')) && !el.closest(paalla);
  };
  const reuna = sade * 2;
  for (let y = pane.top + 24; y < pane.bottom - 24; y += 8) {
    for (let x = pane.left + 40; x < pane.right - 40; x += 16) {
      if (kartalla(x, y) && kartalla(x - reuna, y) && kartalla(x + reuna, y)
        && kartalla(x, y - reuna) && kartalla(x, y + reuna)) {
        return { x: Math.round(x), y: Math.round(y) };
      }
    }
  }
  return null;
}, KOSKETUS_SADE);
await keskita();
ennen = await kartanTila();
/*
 * VINOVETO TODISTAA MOLEMMAT AKSELIT KERRALLA. Suuntaa ei tarvitse
 * enää arvailla: osion alussa on mitattu ja vaadittu, että
 * rajaaKasinPan päästää kartan liikkumaan vähintään VETO_MATKAn verran
 * joka suuntaan (ks. kasinVara).
 */
if (kartanKohta) await veto(kartanKohta.x, kartanKohta.y, -140, -140);
jalkeen = await kartanTila();
vaadi('kartan oma panorointi toimii yhä kortin ulkopuolelta',
  Boolean(kartanKohta) && !samaKartta(ennen, jalkeen)
  && jalkeen.panX !== ennen.panX && jalkeen.panY !== ennen.panY,
  JSON.stringify({ kohta: kartanKohta, ennen, jalkeen }));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
