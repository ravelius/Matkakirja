/*
 * SELAINSAVUKE: Viisas Pöllö ja uusi alanappirivi.
 *
 * Yksikkötestit näkevät kontekstinkeruun ja haun, mutta eivät sitä mitä
 * oikea selain oikeasta DOMista lähettää. Tämä ajaa koko ketjun läpi:
 *
 *   1. alanappirivi: KAKSI paikkaa (Liiku ja Tutki; pöllö kelluu
 *      omistajan linjauksen 24.8.2026 mukaan aina sivussa),
 *      monitoiminapin liuku auki/kiinni,
 *      liu'ussa kolme nappia (jalan, laiva, lento) jotka peittävät koko
 *      rivin, laiva- ja lentovalikon suodatus, estotilat, kartan
 *      napautus sulkee
 *   2. pöllö kartalla ja lehdessä, paneelin avaus ja sulku (ulkopuolinen
 *      napautus ja Esc — rastia ei enää ole), paperinvaalea ulkoasu ja
 *      matala alanappirivi (näppäimistö | kaiutin | mikrofoni)
 *   3. ehdotukset ja kysymys → vastaus (rajapinta mockattu route-fulfillillä)
 *   4. SPOILERISUOJA oikeasta pyyntörungosta: avoinna olevan lehden
 *      minitehtävä ei ole kontekstissa, jutun teksti on
 *   5. pelinsisäinen linkki vastauksen alla avaa oikean lehden sivun
 *   6. sanelu: mockattu SpeechRecognition, nappi → transkripti → lähetys,
 *      ja tila jossa tunnistusta ei ole lainkaan
 *   7. "Pöllö ei ole vielä hereillä" ilman asetettua osoitetta
 *   8. SANELU NATIIVISILLALTA: valesillalla (window.matkakirjaNatiivi)
 *      pöllö kutsuu sanelu.luvat/aloita eikä koske SpeechRecognitioniin
 *      — ja lehden kaiutinnappi lukee sivun sillan luenta.puhulla
 *
 * TOISEN ERÄN LISÄYKSET (13.8.2026)
 *   9. KAIUTINVIPU: päällä ollessaan uusi vastaus luetaan ääneen, eikä
 *      luentaan päädy kysymyksiä, ehdotuksia eikä jatkokysymyksiä
 *  10. JATKOKYSYMYKSET vastauksen alla ja niiden napautus
 *  11. ALLEVIIVATTU LINKKI keskellä vastausta → avaa pelin oman jutun
 *  12. KEHITTÄJÄOTSAKE lähtee vain kun koodi on talletettu
 *  13. PÄIVITYSRUUTU latauksen ajan
 *  14. NÄKYMÄN ELVYTYS: kutistunut ja palautunut näkymä ei jätä lehteä
 *      puhelinlevyiseksi
 *
 * KOLMANNEN ERÄN LISÄYKSET (13.8.2026)
 *  15. KARTAN SUMENNUS: suljettuna ruudulla ei ole yhtään sumentavaa
 *      kerrosta, dialogin avaus sumentaa ja sulku poistaa, pöllöpaneeli
 *      ei sumenna eikä jätä jälkeä — ja ladatun pelin bittikartta on
 *      näkymän tarkkuudessa
 *  16. ALANAPPIRIVI on puhelimella kapea ja keskitetty, ja pöllönappi
 *      palaa riviin myös ladatussa pelissä
 *  17. LATAUSRUUTU näkyy myös kylmäkäynnistyksessä ja väistyy vasta kun
 *      pelinäkymä on rakennettu ja maalattu (osio 11)
 *
 * NELJÄNNEN ERÄN LISÄYKSET — iOS-AALTO B (13.8.2026)
 *  23. ILMAN NATIIVISILTAA peli on täsmälleen ennallaan: siltaa ei ole,
 *      jakonappi pysyy piilossa, pilvi-ikkuna ei aukea, tallennus toimii
 *      ja konsoli pysyy puhtaana
 *  24. KUOREN KYTKENNÄT valesillalla: noppa tärähtää kahdesti, Game
 *      Centeriin kirjaudutaan kerran, widget saa pelin tilan, tallennus
 *      lähtee pilveen aikaleimoineen ja voittoruudussa on jakonappi
 *
 *   node tools/savuke-pollo.mjs
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// Striimikokeen palvelin käyttää workerin OMIA suodattimia, jottei se
// mittaisi savukkeen jäljitelmää vaan sitä koodia, joka on tuotannossa.
import { luoJatkoSuodatin, poimiJatkot } from './pollo/rajat.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/** Mockatun välityspalvelimen osoite. Ei koskaan oikeaa palvelinta. */
const POLLO_URL = 'https://pollo.testi.invalid';

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

/*
 * Pöllön osoite luetaan js/packs/pollo-asetukset.js:stä, ja repossa se on
 * tyhjä (omistaja täyttää sen käyttöönotossa). Savuke tarvitsee molemmat
 * tilat, joten palvelin korvaa tiedoston sisällön lennossa: polloPaalla
 * ratkaisee, saako sivu osoitteen vai tyhjän merkkijonon.
 */
/*
 * STRIIMIKOKEEN VASTAUS.
 *
 * Sama pitkä teksti kuin vieritystestissä, mutta perässä ne kolme asiaa,
 * jotka eivät saa vilahtaa ruudulla: kaksi [[käsitemerkintää]] ja
 * JATKOT-lohko. Teksti ajetaan workerin oman suodattimen läpi (rajat.js
 * luoJatkoSuodatin) täsmälleen kuten tuotannossa.
 *
 * TOINEN MERKINTÄ ON MONISANAINEN TARKOITUKSELLA: sen keskelle
 * pakotetaan palaraja (ks. striimiPalat). Juuri se aukko piti v613:n
 * striimitarkistukset vihreinä, vaikka aidolla laitteella vastauksessa
 * ei näkynyt yhtään pöllölinkkiä.
 */
const STRIIMI_KATKO = 'Amadeus';
const STRIIMI_VASTAUS = () => `${PITKA_VASTAUS} Satamassa purettiin `
  + '[[hiililastit]] käsipelillä aamusta iltaan. '
  + `Samaan aikaan sävelsi [[Wolfgang ${STRIIMI_KATKO} Mozart]] kuolemaansa asti.`;
/*
 * LYHYT VASTAUS. Kaksi virkettä, jotka eivät täytä paneelia: sillä
 * mitataan, ettei loppurenderöinti rullaa näkymää ylöspäin edellisen
 * vastauksen päälle (omistajan havainto 13.8.2026).
 */
const LYHYT_VASTAUS = 'Metro avattiin vuonna 1863. '
  + 'Ensimmäinen linja kulki [[Paddingtonin asema]] ja Farringdonin väliä.';
const STRIIMI_JATKOT = 'JATKOT:\nMiten tunnelit kaivettiin?\nKuka maksoi rakentamisen?\n';
const STRIIMI_RAAKA = (lyhyt) => `${lyhyt ? LYHYT_VASTAUS : STRIIMI_VASTAUS()}\n${STRIIMI_JATKOT}`;

/**
 * Virran palat.
 *
 * Perusmitta on 24 merkkiä, mutta yksi raja PAKOTETAAN keskelle
 * käsitemerkintää: aidossa virrassa malli kirjoittaa "[[Wolfgang " ja
 * "Amadeus Mozart]]" eri paloihin, eikä katkennutta merkintää voi
 * jäsentää linkiksi. Siksi lopullinen sisältö on rakennettava
 * loppu-tapahtuman tekstistä, ja juuri sitä tämä mittaa.
 */
function striimiPalat(raaka, katkoKohta) {
  const palat = [];
  for (let i = 0; i < raaka.length;) {
    let loppu = Math.min(i + 24, raaka.length);
    if (katkoKohta > i && katkoKohta < loppu) loppu = katkoKohta;
    palat.push(raaka.slice(i, loppu));
    i = loppu;
  }
  return palat;
}

/** Savukkeen oma pikku-worker: sama SSE-muoto kuin tools/pollo/worker.js. */
function striimiPalvelin(req, res) {
  let runko = '';
  req.on('data', (pala) => { runko += pala; });
  req.on('end', async () => {
    let pyynto = {};
    try { pyynto = JSON.parse(runko || '{}'); } catch { pyynto = {}; }
    const lyhyt = /lyhyt/i.test(String(pyynto?.kysymys ?? ''));
    if (pyynto.tehtava === 'ehdotukset' || !pyynto.striimi) {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ehdotukset: [], vastaus: STRIIMI_VASTAUS(), jatkot: [] }));
      return;
    }
    res.writeHead(200, {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store',
    });
    const laheta = (laji, data) => res.write(`event: ${laji}\ndata: ${JSON.stringify(data)}\n\n`);
    const suodatin = luoJatkoSuodatin();
    const raaka = STRIIMI_RAAKA(lyhyt);
    // Palat ovat pieniä ja hitaita, jotta kirjoittuminen näkyy oikeasti.
    for (const pala of striimiPalat(raaka, raaka.indexOf(STRIIMI_KATKO))) {
      const nakyva = suodatin.lisaa(pala);
      if (nakyva) laheta('pala', { teksti: nakyva });
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 18));
    }
    const { hanta } = suodatin.loppu();
    if (hanta) laheta('pala', { teksti: hanta });
    // Jatkokysymykset lähtevät VAIN lopputapahtumassa, kuten
    // tuotannossa: pala-tapahtumista suodatin pidättää ne kokonaan.
    const { vastaus, jatkot } = poimiJatkot(raaka);
    laheta('loppu', { vastaus, jatkot });
    res.end();
  });
}

let polloPaalla = true;
/*
 * Mihin osoitteeseen peli puhuu. Tavallisesti mockattu .invalid-osoite
 * (route-fulfill), mutta striimikokeessa savukkeen OMA palvelin: sen
 * kautta vastaus tulee oikeana SSE-virtana pala kerrallaan, jolloin
 * myös vieritys ja suodatus mitataan aidosti. route.fulfill lähettäisi
 * koko rungon kerralla eikä striimiä syntyisi lainkaan.
 */
let polloOsoite = POLLO_URL;
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (req.url.startsWith('/pollo-striimi')) { striimiPalvelin(req, res); return; }
  if (polku.endsWith('js/packs/pollo-asetukset.js')) {
    const arvo = polloPaalla ? polloOsoite : '';
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(`export const POLLOPALVELIN = '${arvo}';\n`);
    return;
  }
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8734, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/*
 * VALE-NATIIVISILTA (ios/Matkakirja/Selain/natiivi-silta.js).
 *
 * WKWebView:ssä ei ole SpeechRecognitionia, joten pöllön sanelu kulkee
 * iOS-kuoressa sillan kautta. Kuorta ei voi ajaa täällä, joten sillasta
 * tehdään vale, joka kirjaa kutsut ja lähettää samat tapahtumat kuin
 * oikea: luvat → aloita → osittainen → valmis. Sama vale palvelee
 * lukijaa (js/lukija.js): luenta.puhu kirjautuu samaan listaan.
 */
const SILTA_MOCK = `
(function () {
  var kuulijat = {};
  var silta = {
    onkoNatiivi: true,
    alusta: 'ios',
    versio: 'testi',
    ominaisuudet: { luenta: true, sanelu: true },
    __kutsut: [],
    kuuntele: function (laji, kuulija) {
      (kuulijat[laji] = kuulijat[laji] || []).push(kuulija);
      return function () {
        var lista = kuulijat[laji] || [];
        var i = lista.indexOf(kuulija);
        if (i >= 0) lista.splice(i, 1);
      };
    },
    alaKuuntele: function () {},
    _tapahtuma: function (tieto) {
      for (var kuulija of (kuulijat[tieto.laji] || []).slice()) kuulija(tieto);
    }
  };
  function kirjaa(nimi, data) { silta.__kutsut.push(nimi); return data; }
  silta.luenta = {
    puhu: function (teksti) {
      window.__luettuTeksti = teksti;
      return Promise.resolve(kirjaa('luenta.puhu', {}));
    },
    pysayta: function () { return Promise.resolve(kirjaa('luenta.pysayta', { tila: 'pysaytetty' })); },
    aanet: function () { return Promise.resolve({ aanet: [] }); },
    puhuuko: function () { return Promise.resolve({ puhuu: false }); }
  };
  silta.sanelu = {
    luvat: function () {
      return Promise.resolve(kirjaa('sanelu.luvat',
        { mikrofoni: true, puheentunnistus: true, kunnossa: true }));
    },
    aloita: function () {
      kirjaa('sanelu.aloita');
      setTimeout(function () {
        silta._tapahtuma({ laji: 'sanelu-osittainen', teksti: window.__saneluTeksti || '' });
        setTimeout(function () {
          silta._tapahtuma({ laji: 'sanelu-valmis', teksti: window.__saneluTeksti || '' });
        }, 150);
      }, 150);
      return Promise.resolve({ tila: 'kuuntelee', kieli: 'fi-FI' });
    },
    lopeta: function () {
      return Promise.resolve(kirjaa('sanelu.lopeta',
        { tila: 'lopetettu', teksti: window.__saneluTeksti || '' }));
    },
    kuunteleeko: function () { return Promise.resolve({ kuuntelee: false }); }
  };
  /*
   * AALTO B: haptiikka, tallennussynkka, widget, jako ja Game Center.
   * Nämä ovat samassa valesillassa kuin sanelu, koska oikeassa kuoressa
   * ne ovat samassa oliossa: puuttuva metodi ei kaataisi peliä (kaikki
   * kutsut ovat vartioituja), mutta se peittäisi juuri sen virheen,
   * jota tässä etsitään — kytkennän puuttumisen.
   */
  silta.haptiikka = {
    nayta: function (laji) {
      (window.__tarinat = window.__tarinat || []).push(laji);
      return Promise.resolve(kirjaa('haptiikka.nayta', { tila: 'ok', laji: laji }));
    }
  };
  silta.talle = {
    // Valevarasto elää sivun ajan; oikea on iCloudin avain–arvo-varasto.
    __varasto: {},
    vie: function (avain, arvo, aika) {
      var leima = typeof aika === 'number' ? aika : Date.now();
      silta.talle.__varasto[avain] = { arvo: String(arvo), aika: leima };
      (window.__viedyt = window.__viedyt || []).push({ avain: avain, aika: leima });
      return Promise.resolve(kirjaa('talle.vie', { avain: avain, aika: leima, pilvi: true }));
    },
    tuo: function (avain) {
      var kuori = silta.talle.__varasto[avain];
      kirjaa('talle.tuo');
      return Promise.resolve(kuori
        ? { avain: avain, loytyi: true, arvo: kuori.arvo, aika: kuori.aika, pilvi: true }
        : { avain: avain, loytyi: false, arvo: null, aika: 0, pilvi: true });
    },
    poista: function (avain) {
      delete silta.talle.__varasto[avain];
      return Promise.resolve(kirjaa('talle.poista', { avain: avain, tila: 'poistettu' }));
    },
    avaimet: function () { return Promise.resolve({ avaimet: [], pilvi: true }); }
  };
  silta.widget = {
    paivita: function (tila) {
      window.__widget = tila;
      return Promise.resolve(kirjaa('widget.paivita', { tila: 'paivitetty' }));
    },
    tyhjenna: function () { return Promise.resolve(kirjaa('widget.tyhjenna', { tila: 'tyhjennetty' })); },
    lue: function () { return Promise.resolve({ asetettu: Boolean(window.__widget) }); }
  };
  silta.jaa = {
    teksti: function (sisalto) {
      window.__jaettu = sisalto;
      return Promise.resolve(kirjaa('jaa.teksti', { tila: 'jaettu', kohde: 'testi' }));
    },
    kuva: function () { return Promise.resolve(kirjaa('jaa.kuva', { tila: 'peruttu' })); }
  };
  silta.pelikeskus = {
    kirjaudu: function () {
      return Promise.resolve(kirjaa('pelikeskus.kirjaudu',
        { kirjautunut: true, nimi: 'Testaaja', tunnus: 'T1', syy: '' }));
    },
    saavutus: function (tunnus, osuus) {
      (window.__saavutukset = window.__saavutukset || []).push(tunnus);
      return Promise.resolve(kirjaa('pelikeskus.saavutus',
        { tila: 'kirjattu', tunnus: tunnus, osuus: osuus }));
    },
    nayta: function () { return Promise.resolve(kirjaa('pelikeskus.nayta', { tila: 'avattu' })); }
  };
  silta.ominaisuudet.haptiikka = true;
  silta.ominaisuudet.talle = true;
  silta.ominaisuudet.talleSynkka = true;
  silta.ominaisuudet.widget = true;
  silta.ominaisuudet.jako = true;
  silta.ominaisuudet.pelikeskus = true;
  window.matkakirjaNatiivi = silta;
}());
`;

/**
 * Mockattu puhesyntetisaattori (js/lukija.js selainPuhe).
 *
 * Headless-Chromiumissa speechSynthesis on olemassa mutta ei puhu, eikä
 * siitä saa selville MITÄ luettiin. Kaiutinvivun koko idea on juuri se,
 * että luettavaksi menee vain vastausteksti — ei kysymyksiä, ei
 * ehdotuksia — joten mock kirjaa jokaisen lausuman talteen.
 */
const PUHE_MOCK = `
window.__puhutut = [];
window.__peruutuksia = 0;
/*
 * HIDAS TILA. Tavallisesti lausuma päättyy 10 ms:ssä, jolloin luenta
 * valuu läpi eikä pysäytystä voi mitata. Hitaassa tilassa lausuma jää
 * "puhumaan" kunnes se perutaan — juuri sillä mitataan, katkeaako
 * kaiutinvivun pysäytys kesken lauseen.
 */
window.__puheHidas = false;
class TestiLausuma {
  constructor(teksti) { this.text = teksti; this.lang = ''; this.voice = null; }
}
window.SpeechSynthesisUtterance = TestiLausuma;
const __synth = {
  jono: [],
  paused: false,
  get speaking() { return __synth.jono.length > 0; },
  get pending() { return __synth.jono.length > 1; },
  getVoices: () => [],
  pause() { __synth.paused = true; },
  resume() { __synth.paused = false; },
  cancel() {
    window.__peruutuksia += 1;
    __synth.jono = [];
  },
  speak(lausuma) {
    window.__puhutut.push(lausuma.text);
    __synth.jono.push(lausuma);
    if (window.__puheHidas) return;
    setTimeout(() => {
      const i = __synth.jono.indexOf(lausuma);
      // Peruttu lausuma on jo poissa jonosta: se ei saa päättyä.
      if (i < 0) return;
      __synth.jono.splice(i, 1);
      lausuma.onend?.();
    }, 10);
  },
};
window.__puheJono = () => __synth.jono.length;
// speechSynthesis on selaimessa vain luettava getteri, joten sijoitus
// ei riitä — se on määriteltävä uudelleen.
Object.defineProperty(window, 'speechSynthesis', {
  configurable: true,
  get: () => __synth,
});
`;

/**
 * Mockattu SpeechRecognition. Headless-selaimessa ei ole mikrofonia.
 *
 * HIDAS TILA (window.__saneluHidas) jättää tunnistuksen päälle: vain
 * silloin mikkinapin sanelutilan ehtii mitata ja kuvata. Tavallisesti
 * tunnistus päättyy 30 ms:ssä, jolloin nappi on jo palannut lepoon.
 */
const SANELU_MOCK = `
window.__saneluAloituksia = 0;
window.__saneluHidas = false;
class TestiTunnistus {
  constructor() { this.lang = ''; this.interimResults = false; this.continuous = false; }
  start() {
    window.__saneluAloituksia += 1;
    window.__sanelu = this;
    // Kaappaus "alkaa" hetken päästä kuten oikeassakin rajapinnassa:
    // tilarivi näyttää ensin "Käynnistän mikrofonia…" ja vasta tästä
    // eteenpäin "Kuuntelen…".
    setTimeout(() => { this.onaudiostart?.(); }, 10);
    setTimeout(() => {
      this.onresult?.({ results: [[{ transcript: window.__saneluTeksti ?? '' }]] });
      if (!window.__saneluHidas) this.onend?.();
    }, 30);
  }
  stop() { this.onend?.(); }
  abort() { this.onend?.(); }
}
window.SpeechRecognition = TestiTunnistus;
`;

/*
 * PITKÄ VASTAUS. Vierityssääntö (vastaus alkaa näkymän yläreunasta) voi
 * näkyä vain vastauksesta, joka ei mahdu paneeliin kerralla. Teksti on
 * savukkeen omaa täytettä; ensimmäinen lause on tunnistettava, koska
 * juuri sen pitää olla näkyvissä.
 */
const PITKA_VASTAUS = 'Ensimmäinen rivi alkaa tästä. '
  + Array.from({ length: 12 }, (_, i) =>
    `Thamesin varrella riitti ${i + 1}. vuosikymmenellä satamatyötä, `
    + 'ja jokilaivat toivat hiiltä, viljaa ja teetä kaupungin varastoihin '
    + 'aamusta iltaan.').join(' ');

/*
 * KOESANAT. Mock valitsee vastauksen kysymyksen perusteella, jotta yksi
 * ajo voi mitata monta eri sääntöä. Sanat eivät ole pelin sanastoa vaan
 * savukkeen omia kahvoja.
 */
/*
 * Kuusi merkintää, koska asiakkaan katto nousi kolmesta kahteentoista
 * (omistaja 13.8.2026: "kaikki paikat ja erisnimet, kuten Beethoven,
 * olisi kiva saada jatkokysymyspainikkeeksi tekstiin"). Vanhalla
 * katolla puolet näistä olisi purkautunut tavalliseksi tekstiksi.
 */
const KASITEVASTAUS = 'Lontoon [[höyryveturit]] vetivät junia, ja '
  + '[[Thames]] kuljetti hiilen satamiin. [[Paddington]], [[Euston]], '
  + '[[Waterloo]] ja [[Beethoven]] mainitaan samassa lauseessa.';
const NAHTAVYYSVASTAUS = 'Tower Bridge avattiin vuonna 1894, ja sen '
  + 'maalattu teräsrunko piiloutuu kivikuoren sisään.';
/*
 * YLEISSANAVASTAUS (omistaja 13.8.2026: *"Alleviivaukset outoja."*).
 * Vastauksessa ei ole yhtään erottuvaa nimeä — pelkkiä yleissanoja,
 * jotka ennen nappasivat artikkelilinkin keskelle lausetta. Nyt linkin
 * pitää jäädä kokonaan pois.
 */
const YLEISSANAVASTAUS = 'Kaupungissa asui paljon ihmisiä, ja historia '
  + 'näkyi kaduilla. Alue rakennettiin vaiheittain vuosien kuluessa.';

function vastausTekstiin(kysymys) {
  // "yleissana": vastaus, jossa on vain yleissanoja — ei ankkuria.
  if (/yleissana/i.test(kysymys)) return YLEISSANAVASTAUS;
  // "varapolku": vastauksessa ei ole yhtään pelin indeksin sanaa, joten
  // linkille ei löydy ankkuria tekstistä.
  if (/varapolku/i.test(kysymys)) {
    return 'Tästä ei ole pelissä juttua, mutta yleisesti ottaen kyse on vanhasta ilmiöstä.';
  }
  // "pitkä": vastaus ei mahdu paneeliin kerralla (vierityssääntö, 3f).
  if (/pitkä/i.test(kysymys)) return PITKA_VASTAUS;
  // "käsite": pöllölinkit eli [[avainkäsitteet]] keskellä vastausta.
  if (/käsite/i.test(kysymys)) return KASITEVASTAUS;
  // "Tower": nähtävyysjuttu, jolla on kuva → kevyt kuvapopup.
  if (/tower/i.test(kysymys)) return NAHTAVYYSVASTAUS;
  return 'Lontoon metro avattiin vuonna 1863 ja se oli maailman ensimmäinen.';
}

/**
 * Rajapinnan mock: ehdotukset ja vastaus. Pyyntörungot jäävät talteen.
 *
 * Vastaus jäljittelee oikeaa workeria (tools/pollo/worker.js), joka
 * erottaa jatkokysymykset omaan kenttäänsä — peli ei siis koskaan näe
 * "JATKOT:"-merkintää, ja mockin on oltava samaa mieltä.
 */
async function kytkeRajapinta(sivu, rungot) {
  await sivu.route(`${POLLO_URL}/**`, async (route) => {
    const runko = JSON.parse(route.request().postData() ?? '{}');
    // Otsakkeet talteen: kehittäjäkoodi kulkee niissä.
    runko.__otsakkeet = route.request().headers();
    rungot.push(runko);
    const data = runko.tehtava === 'ehdotukset'
      ? {
        ehdotukset: [
          'Miksi Lontoon metro rakennettiin?',
          'Mitä Thamesilla kuljetettiin?',
          'Millainen kaupunki Lontoo oli 1873?',
        ],
      }
      : {
        /*
         * "varapolku" on savukkeen oma koesana: se antaa vastauksen,
         * jossa EI ole yhtään pelin indeksin sanaa, jolloin linkille ei
         * löydy ankkuria tekstistä ja sen pitää ilmestyä napiksi
         * vastauksen alle.
         */
        vastaus: vastausTekstiin(runko.kysymys ?? ''),
        jatkot: [
          'Miten tunnelit kaivettiin?',
          'Kuka maksoi rakentamisen?',
        ],
      };
    await route.fulfill({
      status: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify(data),
    });
  });
  // Osoite on .invalid, mutta route on rekisteröity myös ilman polkua.
  await sivu.route(POLLO_URL, (route) => route.fallback());
}

/*
 * LUKIJAÄÄNI POIS (js/puhe.js puheTuettu).
 *
 * Lennossa generoitu lukijaääni on luennan ensisijainen polku, mutta se
 * hakee jokaisen palan verkosta ja soittaa sen Web Audiolla — headless-
 * selaimessa siitä ei näe MITÄ luettiin, ja se ohittaisi savukkeen
 * puhesyntetisaattorimockin kokonaan. `navigator.onLine = false` on
 * pelin oma, dokumentoitu portti samaan asiaan ("lentokoneessa ei
 * yritetä"): laite putoaa laitteen omaan ääneen, jonka mock kirjaa.
 * Näin mitataan täsmälleen se varapolku, joka oikeallakin laitteella on
 * käytössä ilman verkkoa.
 */
const OFFLINE_MOCK = `
Object.defineProperty(window.navigator, 'onLine', { configurable: true, get: () => false });
`;

/** Avaa pelin, käynnistää sen ja vie pelaajan Lontooseen. */
async function avaaPeli(ctx, { sanelu = true, silta = false, lukijaAani = true } = {}) {
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  /*
   * Ulkoiset osoitteet katkaistaan tarkoituksella (route.abort), ja
   * selain kirjaa jokaisesta "Failed to load resource". Se on savukkeen
   * oma jälki eikä pelin virhe, joten se suodatetaan pois — muut
   * konsolivirheet kaatavat ajon kuten pitääkin.
   */
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    virheet.push(`konsoli: ${m.text()}`);
  });
  /*
   * Chromiumissa on oma webkitSpeechRecognition, joten "ei tuettu"
   * -tilaa ei synny pelkästään jättämällä mock pois — molemmat nimet on
   * poistettava erikseen.
   */
  await sivu.addInitScript(sanelu ? SANELU_MOCK
    : 'delete window.SpeechRecognition; delete window.webkitSpeechRecognition;');
  /*
   * Puhesyntetisaattori mockataan aina paitsi natiivisiltakokeessa:
   * siellä luennan pitää mennä sillan kautta, ja mock veisi siltä
   * ensisijaisuuden todistusvoiman.
   */
  if (!silta) await sivu.addInitScript(PUHE_MOCK);
  // Natiivisilta ruiskutetaan ennen pelin skriptejä, kuten oikea kuorikin.
  if (silta) await sivu.addInitScript(SILTA_MOCK);
  if (!lukijaAani) await sivu.addInitScript(OFFLINE_MOCK);
  await sivu.route((url) => !/127\.0\.0\.1|localhost|pollo\.testi\.invalid/.test(url.href),
    (route) => route.abort());
  await sivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
  await sivu.waitForTimeout(2200);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('lontoo', null);
    g.player.money = 2000;
    /*
     * PÖLLÖ ON AARRE (omistajan tilaus 18.8.2026): uudessa pelissä
     * nappi on piilossa, kunnes ensimmäinen laatta on käännetty. Tämä
     * savuke tutkii pöllön TOIMINTAA, ei sen löytymistä, joten löytö
     * kuitataan tässä suoraan — muuten jokainen osio joutuisi ensin
     * pelaamaan visan läpi.
     */
    g.polloLoydetty = true;
    window.matkakirja.ui.render();
    window.matkakirjaPollo?.paivitaNakyvyys?.();
  });
  await sivu.waitForTimeout(900);
  return { sivu, virheet };
}

/* ================================================================== */
/* 1) Alanappirivi ja liuku                                            */
/* ================================================================== */

const ctx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const rungot = [];
const { sivu, virheet } = await avaaPeli(ctx);
await kytkeRajapinta(sivu, rungot);

const rivi = await sivu.evaluate(() => {
  const perus = document.querySelector('.toimintorivi-perus');
  if (!perus) return { virhe: 'alanappiriviä ei löydy' };
  return {
    paikkoja: perus.children.length,
    yksiRivi: Boolean(document.querySelector('.toimintorivi')?.classList
      .contains('rivi-yksi')),
    monitoimi: Boolean(perus.querySelector('.monitoimi-nappi')),
    liiku: perus.querySelector('.monitoimi-nappi')?.getAttribute('aria-label') ?? '',
    // Pöllö EI ole enää rivissä (omistaja 24.8.2026): se kelluu
    // sivuelementtinä myös pelinäkymässä.
    polloRivissa: Boolean(perus.querySelector('.pollo-paikka, .pollo-nappi')),
    polloKelluu: document.querySelector('.pollo-nappi')?.classList
      .contains('pollo-kelluu-kartalla') ?? false,
    tutki: perus.lastElementChild?.getAttribute('aria-label') ?? '',
    liukuNapit: document.querySelectorAll('.toimintorivi-liuku button').length,
  };
});
/*
 * ALANAPPIRIVI FOKUSNÄKYMÄSSÄ: VAIN LIIKU (omistajan pelitestitilaus
 * 24.8.2026). Tutki-napin toiminto siirtyi kaupungin laatan
 * napautukseen (js/ui.js fokusLaattaTutkii, paivitaFokusLaatta), ja
 * rivi on siksi yhden keskitetyn napin levyinen. Fokusmoodi on
 * oletuksena päällä, joten tämä on se rivi, jonka pelaaja näkee —
 * kytkimen takainen vanha kahden napin rivi mitataan heti alla.
 */
/*
 * LIIKU ODOTTAA AARRETTA (omistajan tarkennus 25.8.2026): pelin alussa
 * fokusrivi on TYHJÄ — nappi ilmestyy vasta kun kaupungin laatta on
 * käännetty. Tyhjä rivi on tarkoitus, ei virhe (js/ui.js
 * liikuNappiNakyy). Napin ilmestyminen käännön jälkeen mitataan alla
 * liukukokeessa, joka kääntää laatan kirjanpidosta.
 */
vaadi('fokusnäkymässä rivi on alussa tyhjä (Liiku odottaa aarretta)',
  rivi.paikkoja === 0 && rivi.yksiRivi === true && rivi.monitoimi === false,
  JSON.stringify(rivi));
vaadi('pöllö ei ole alanappirivissä', rivi.polloRivissa === false, JSON.stringify(rivi));
vaadi('pöllö kelluu myös pelinäkymässä', rivi.polloKelluu === true, JSON.stringify(rivi));
vaadi('matkustusnapit ovat liu\'ussa', rivi.liukuNapit >= 1, `${rivi.liukuNapit} kpl`);

/*
 * FOKUSMOODIN OLLESSA POIS RIVI ON ENTISENSÄ: kaksi paikkaa ja oikealla
 * suurennuslasi. Kytkin luetaan levyltä (js/ui-apurit.js), joten koe on
 * sama kuin kehittäjätilan napilla — ja tila palautetaan heti, ettei
 * loppu savukkeesta aja poikkeustilassa.
 */
const ilmanFokusta = await sivu.evaluate(async () => {
  const { asetaFokusmoodi } = await import('/js/ui-apurit.js');
  const ui = window.matkakirja.ui;
  asetaFokusmoodi(false);
  ui.paivitaFokusmoodi();
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
  const perus = document.querySelector('.toimintorivi-perus');
  const tulos = {
    paikkoja: perus?.children.length ?? -1,
    tutki: perus?.lastElementChild?.getAttribute('aria-label') ?? '',
  };
  asetaFokusmoodi(true);
  ui.paivitaFokusmoodi();
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
  return tulos;
});
vaadi('fokusmoodin ollessa pois rivi on entisensä (Liiku · Tutki)',
  ilmanFokusta.paikkoja === 2 && /tutki/i.test(ilmanFokusta.tutki),
  JSON.stringify(ilmanFokusta));

await sivu.screenshot({ path: join(ULOS, 'pollo-rivi-kiinni-390.png') });

const auki = await sivu.evaluate(async () => {
  /*
   * LIIKU ODOTTAA AARRETTA (omistaja 25.8.2026): fokusmoodissa nappia
   * ei ole ennen kuin kaupungin laatta on käännetty. Liu'un koe
   * kääntää laatan kirjanpidosta, jotta nappi on olemassa — itse
   * ilmestymissääntö vartioidaan js/ui.js:n liikuNappiNakyy-kokeissa.
   */
  const ui = window.matkakirja.ui;
  const city = ui.game.cityOf?.();
  if (city && ui.game.tokens?.has(city.id)) {
    ui.game.tokens.delete(city.id);
    ui.render();
    await new Promise((r) => setTimeout(r, 300));
  }
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 350));
  const rivi = document.querySelector('.toimintorivi');
  const liuku = document.querySelector('.toimintorivi-liuku');
  return {
    luokka: rivi.classList.contains('liuku-auki'),
    aria: document.querySelector('.monitoimi-nappi').getAttribute('aria-expanded'),
    napit: [...liuku.querySelectorAll('button')].map((b) => b.getAttribute('aria-label')),
    // Liuku peittää KOKO rivin: myös monitoiminapin, joka sen avasi.
    peittaaRivin: Math.abs(liuku.getBoundingClientRect().left
      - document.querySelector('.toimintorivi-perus').getBoundingClientRect().left) < 2,
    // Perusnapit väistyvät kaikki, jotta rivissä näkyy vain kolme nappia.
    perusPiilossa: [...document.querySelectorAll('.toimintorivi-perus > *')]
      .every((el) => getComputedStyle(el).visibility === 'hidden'
        || getComputedStyle(el).opacity === '0'),
  };
});
vaadi('monitoiminappi avaa liu\'un', auki.luokka === true && auki.aria === 'true',
  JSON.stringify(auki));
vaadi('liuku peittää koko rivin', auki.peittaaRivin === true, JSON.stringify(auki));
vaadi('monitoiminappi väistyy liu\'un tieltä', auki.perusPiilossa === true,
  JSON.stringify(auki));
vaadi('liu\'ussa on matkustusnapit', auki.napit.length >= 1, auki.napit.join(' | '));

/*
 * KOLME NAPPIA: jalan, laiva ja lento erikseen (omistajan linjaus
 * 12.8.2026). Nimet luetaan aria-labelista, koska napit ovat liu'ussa
 * pelkkiä ikoneita. Estetyllä napilla nimen perässä on syy, joten
 * vertailu tehdään alkuosalla.
 */
vaadi('liu\'ussa on kolme matkustusnappia', auki.napit.length === 3, auki.napit.join(' | '));
vaadi('napit ovat jalan, laiva ja lento',
  /^Jalan/.test(auki.napit[0] ?? '') && /^Laivalla/.test(auki.napit[1] ?? '')
  && /^Lentäen/.test(auki.napit[2] ?? ''), auki.napit.join(' | '));

// Kolme nappia ei saa ahtautua kapealla ruudulla.
const leveydet = await sivu.evaluate(() => [...document.querySelectorAll('.toimintorivi-liuku button')]
  .map((b) => Math.round(b.getBoundingClientRect().width)));
vaadi('liu\'un napit eivät ahtaudu 390 pikselissä', leveydet.every((w) => w >= 44),
  leveydet.join(' / '));

await sivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-390.png') });

/*
 * SUODATUS: laivanappi näyttää vain laivat, lentonappi vain lennot ja
 * portit. Säännöt eivät muutu — vain se, mitä listassa näkyy.
 */
const suodatus = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const lista = () => [...document.querySelectorAll('.actions .ikoni-teksti')]
    .map((b) => b.textContent.trim());
  const avaa = async (nimi) => {
    const ui = window.matkakirja.ui;
    ui.suljeMatkavalikko();
    ui.render();
    await odota(200);
    document.querySelector('.monitoimi-nappi').click();
    await odota(250);
    const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
      .find((b) => new RegExp(`^${nimi}`).test(b.getAttribute('aria-label') ?? ''));
    if (!nappi || nappi.disabled) return { estetty: true, vihje: nappi?.title ?? '' };
    nappi.click();
    await odota(400);
    return { estetty: false, lista: lista(), suodatin: window.matkakirja.ui.travelSuodatin };
  };
  const laiva = await avaa('Laivalla');
  const lento = await avaa('Lentäen');
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
  await odota(200);
  return { laiva, lento };
});
vaadi('laivanappi avaa vain laivavaihtoehdot',
  suodatus.laiva.estetty === false && suodatus.laiva.suodatin === 'sea'
  && suodatus.laiva.lista.length > 0 && suodatus.laiva.lista.every((t) => /^Laivalla/.test(t)),
  JSON.stringify(suodatus.laiva));
vaadi('lentonappi ei näytä laivoja',
  suodatus.lento.estetty === false && suodatus.lento.suodatin === 'air'
  && suodatus.lento.lista.length > 0 && suodatus.lento.lista.every((t) => !/^Laivalla/.test(t)),
  JSON.stringify(suodatus.lento));

// Kaappaus suodatetusta laivavalikosta kapealla ruudulla.
await sivu.evaluate(async () => {
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  if (nappi && !nappi.disabled) nappi.click();
  await new Promise((r) => setTimeout(r, 500));
});
await sivu.screenshot({ path: join(ULOS, 'pollo-laivavalikko-390.png') });
await sivu.evaluate(async () => {
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 250));
});

/*
 * Estotila: ilman laivayhteyksiä laivanappi on harmaana ja kertoo syyn.
 * Lennot pidetään tarjolla, jotta rivi ei ole kokonaan estetty.
 */
const laivaEsto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  const alku = g.travelModes.bind(g);
  g.travelModes = () => ['land'];
  ui.suljeMatkavalikko();
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const napit = [...document.querySelectorAll('.toimintorivi-liuku button')];
  const laiva = napit.find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  const lento = napit.find((b) => /^Lentäen/.test(b.getAttribute('aria-label') ?? ''));
  const tila = {
    laivaEstetty: laiva?.disabled ?? null,
    vihje: laiva?.title ?? '',
    lentoAuki: lento ? !lento.disabled : null,
    monitoimi: document.querySelector('.monitoimi-nappi').disabled,
  };
  g.travelModes = alku;
  ui.render();
  await new Promise((r) => setTimeout(r, 200));
  return tila;
});
vaadi('ilman laivayhteyksiä laivanappi on harmaana', laivaEsto.laivaEstetty === true,
  JSON.stringify(laivaEsto));
vaadi('estetty laivanappi kertoo syyn', /laiva/i.test(laivaEsto.vihje), laivaEsto.vihje);
vaadi('estetty laiva ei estä lentoa eikä koko riviä',
  laivaEsto.lentoAuki === true && laivaEsto.monitoimi === false, JSON.stringify(laivaEsto));

const karttaSulkee = await sivu.evaluate(async () => {
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await new Promise((r) => setTimeout(r, 300));
  return document.querySelector('.toimintorivi').classList.contains('liuku-auki');
});
vaadi('kartan napautus sulkee liu\'un', karttaSulkee === false);

/*
 * Matkustusnappi toimii liu'usta täsmälleen kuten ennen.
 *
 * Klikataan sitä nappia, joka riviltä oikeasti löytyy: tarjolla olevat
 * matkustustavat riippuvat kaupungista ja rahoista, eikä savuke saa
 * olettaa juuri tiettyä nappia. Toiminto on onnistunut, jos vaihe
 * vaihtui TAI matkavalikko siirtyi vaiheeseen B — kummassakin
 * tapauksessa nappi teki sen mitä ennenkin.
 */
const matkusti = await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  const ui = window.matkakirja.ui;
  const ennen = { vaihe: g.phase, laajennettu: ui.travelExpanded };
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => !b.disabled);
  if (!nappi) return { virhe: 'liuku on tyhjä' };
  const nimi = nappi.getAttribute('aria-label');
  nappi.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    nimi,
    ennen,
    jalkeen: { vaihe: g.phase, laajennettu: ui.travelExpanded },
    liukuAuki: Boolean(document.querySelector('.toimintorivi')?.classList.contains('liuku-auki')),
  };
});
vaadi('matkustusnappi toimii liu\'usta',
  Boolean(matkusti.jalkeen) && (matkusti.jalkeen.vaihe !== matkusti.ennen.vaihe
    || matkusti.jalkeen.laajennettu !== matkusti.ennen.laajennettu),
  JSON.stringify(matkusti));

vaadi('liuku ei jää auki toiminnon jälkeen', matkusti.liukuAuki === false,
  JSON.stringify(matkusti));

// Nopanheitto on liu'ussa roll-vaiheessa.
const noppa = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  ui.travelExpanded = false;
  g.phase = 'roll';
  g.travelMode = 'land';
  g.autoTravel = false;
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  return {
    napit: [...document.querySelectorAll('.toimintorivi-liuku button')]
      .map((b) => b.getAttribute('aria-label')),
  };
});
vaadi('nopanheitto löytyy liu\'usta', noppa.napit.some((n) => /noppa/i.test(n ?? '')),
  noppa.napit.join(' | '));

// Estetila: ilman matkustusvaihtoehtoja monitoiminappi on harmaana.
const esto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = window.matkakirja.game;
  g.phase = 'action';
  g.travelMode = null;
  const alkuperainen = g.travelModes.bind(g);
  g.travelModes = () => [];
  g.airportDestinations = () => [];
  g.gatewayOptions = () => [];
  g.countryGateOptions = () => [];
  g.mannerLennot = () => [];
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  const nappi = document.querySelector('.monitoimi-nappi');
  const tila = { estetty: nappi.disabled, rivi: Boolean(document.querySelector('.toimintorivi')) };
  g.travelModes = alkuperainen;
  return tila;
});
vaadi('monitoiminappi harmaantuu ilman vaihtoehtoja', esto.estetty === true && esto.rivi === true,
  JSON.stringify(esto));

/* ================================================================== */
/* 2-3) Pöllön paneeli, ehdotukset ja vastaus                          */
/* ================================================================== */

await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  g.phase = 'action';
  delete g.travelModes;
  delete g.airportDestinations;
  delete g.gatewayOptions;
  delete g.countryGateOptions;
  delete g.mannerLennot;
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 250));
});

const avaus = await sivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  const paneeli = document.querySelector('.pollo-paneeli');
  return {
    nakyy: !paneeli.hidden,
    ehdotuksia: paneeli.querySelectorAll('.pollo-ehdotus').length,
    valmiita: paneeli.querySelectorAll('.pollo-valmiit .pollo-valmis').length,
    tervehdys: Boolean(paneeli.querySelector('.pollo-pollo')),
    mikki: Boolean(paneeli.querySelector('.pollo-mikki')),
    // Näppäimistö ei saa avautua itsestään: kenttä on piilossa saneltaessa.
    kenttaPiilossa: paneeli.querySelector('.pollo-rivi').hidden,
  };
});
vaadi('paneeli aukeaa napautuksesta', avaus.nakyy === true);
/*
 * VALMISKYSYMYKSET OVAT TOISTAISEKSI POIS (omistajan pelitestitilaus
 * 24.8.2026: *"pöllön valmiskysymykset hetkeksi pois"*).
 *
 * VÄITE KÄÄNTYI, EI KADONNUT. Ennen tässä vaadittiin, että avaus latoo
 * pinnaan käsin kirjoitetun pakan (js/packs/pollo-kysymykset.js) viisi
 * kuplaa. Nyt vaaditaan päinvastoin: kuplia EI ole yhtään, koska
 * js/pollo.js VALMISKYSYMYKSET_KAYTOSSA on alhaalla. Väite mittaa siis
 * lipun tilaa — kun se joskus nostetaan, tämä kaatuu ja muistuttaa
 * palauttamaan vanhan luvun (5).
 *
 * TILALLE TULEVAT PALVELIMEN EHDOTUKSET. Ilman valmiita avaus hakee
 * dynaamiset ehdotukset kuten kaupungeissa, joille valmiita ei ole
 * kirjoitettu; mock antaa kolme ja js/pollo.js naytaEhdotukset näyttää
 * niistä kaksi. Se on juuri se "chat toimii muuten ennallaan", joka
 * tilauksessa vaadittiin.
 */
vaadi('valmiskysymykset ovat lipun takana (VALMISKYSYMYKSET_KAYTOSSA=false)',
  avaus.valmiita === 0, `valmiita ${avaus.valmiita}`);
vaadi('avaus tarjoaa palvelimen ehdotukset valmiiden tilalla',
  avaus.ehdotuksia === 2, `${avaus.ehdotuksia} kpl`);
vaadi('sanelunappi on ensisijainen syöte', avaus.mikki === true && avaus.kenttaPiilossa === true,
  JSON.stringify(avaus));

/*
 * PAPERIPANEELI ILMAN YLÄPALKKIA (omistajan linjaus 12.8.2026).
 *
 * Otsikko ja ×-nappi ovat poissa, pohja on lehden painopaperia ja muste
 * tummaa. Kontrasti mitataan suoraan lasketuista väreistä: leipätekstin
 * pitää erottua pohjasta selvästi, koska juuri sen luettavuudesta
 * omistaja huomautti (v589, iPhone).
 */
const ulkoasu = await sivu.evaluate(() => {
  const paneeli = document.querySelector('.pollo-paneeli');
  const luminanssi = (vari) => {
    const [r, g, b] = vari.match(/[\d.]+/g).slice(0, 3).map(Number);
    const k = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b);
  };
  const cs = getComputedStyle(paneeli);
  const teksti = paneeli.querySelector('.pollo-pollo') ?? paneeli;
  const tekstiCs = getComputedStyle(teksti);
  const a = luminanssi(cs.backgroundColor);
  const b = luminanssi(tekstiCs.color);
  return {
    otsikoita: paneeli.querySelectorAll('.pollo-otsikko, .pollo-yla').length,
    sulkeita: paneeli.querySelectorAll('.pollo-sulje').length,
    pohja: cs.backgroundColor,
    muste: tekstiCs.color,
    varjo: tekstiCs.textShadow,
    kirjasin: tekstiCs.fontFamily,
    koko: parseFloat(tekstiCs.fontSize),
    pohjaKirkkaus: a,
    kontrasti: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
  };
});
vaadi('paneelissa ei ole otsikkoa eikä ×-nappia',
  ulkoasu.otsikoita === 0 && ulkoasu.sulkeita === 0, JSON.stringify(ulkoasu));
vaadi('paneelin pohja on vaalea paperi', ulkoasu.pohjaKirkkaus > 0.6,
  `${ulkoasu.pohja} (${ulkoasu.pohjaKirkkaus.toFixed(2)})`);
vaadi('leipätekstissä ei ole hehkuvarjoa', ulkoasu.varjo === 'none', ulkoasu.varjo);
vaadi('leipäteksti on lukukirjasimella', /Iowan|Charter|Palatino|serif/i.test(ulkoasu.kirjasin),
  ulkoasu.kirjasin);
vaadi('leipäteksti on vähintään 14 px', ulkoasu.koko >= 14, `${ulkoasu.koko} px`);
vaadi('kontrasti riittää (WCAG AA, 4.5:1)', ulkoasu.kontrasti >= 4.5,
  `${ulkoasu.kontrasti.toFixed(1)}:1`);

await sivu.screenshot({ path: join(ULOS, 'pollo-paneeli-390.png') });

/*
 * Sulkeminen ilman rastia: napautus paneelin ulkopuolelle ja Esc.
 * Tämä on nyt ainoa tapa sulkea chat pöllön napin lisäksi, joten se
 * mitataan erikseen molemmilla tavoilla.
 */
const sulkeminen = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const auki = () => !document.querySelector('.pollo-paneeli').hidden;
  const avaa = async () => {
    if (!auki()) document.querySelector('.pollo-nappi').click();
    await odota(400);
  };
  await avaa();
  // Napautus paneelin sisällä ei saa sulkea.
  document.querySelector('.pollo-virta').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await odota(150);
  const sisalta = auki();
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await odota(200);
  const ulkoa = auki();
  await avaa();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await odota(200);
  const escilla = auki();
  await avaa();
  return { sisalta, ulkoa, escilla, lopuksiAuki: auki() };
});
vaadi('napautus paneelin sisällä ei sulje', sulkeminen.sisalta === true,
  JSON.stringify(sulkeminen));
vaadi('napautus paneelin ulkopuolelle sulkee', sulkeminen.ulkoa === false,
  JSON.stringify(sulkeminen));
vaadi('Esc sulkee paneelin', sulkeminen.escilla === false, JSON.stringify(sulkeminen));

/*
 * ALARIVI: yksi matala nappirivi koko leveydeltä — näppäimistö,
 * kaiutin ja mikrofoni (omistajan tilaus 13.8.2026). Mikrofoni on yhä
 * levein. Selitetekstit poistuivat, joten aria-labelit ovat pakolliset.
 */
const alarivi = await sivu.evaluate(() => {
  const syote = document.querySelector('.pollo-syote');
  const rivi = document.querySelector('.pollo-sanelu');
  const kirjoita = document.querySelector('.pollo-kirjoita');
  const kaiutin = document.querySelector('.pollo-kaiutin');
  const mikki = document.querySelector('.pollo-mikki');
  const r = rivi.getBoundingClientRect();
  const k = kirjoita.getBoundingClientRect();
  const a = kaiutin.getBoundingClientRect();
  const m = mikki.getBoundingClientRect();
  return {
    pohjalla: syote.lastElementChild === rivi,
    korkeus: Math.round(r.height),
    jarjestys: [...rivi.children].map((el) => el.className.replace('pollo-nappula ', '')),
    osuusKirjoita: k.width / r.width,
    osuusKaiutin: a.width / r.width,
    osuusMikki: m.width / r.width,
    leveysSuhde: r.width / syote.getBoundingClientRect().width,
    kirjoitaLabel: kirjoita.getAttribute('aria-label') ?? '',
    kaiutinLabel: kaiutin.getAttribute('aria-label') ?? '',
    kaiutinPainettu: kaiutin.getAttribute('aria-pressed'),
    mikkiLabel: mikki.getAttribute('aria-label') ?? '',
    // Selitetekstit poistuivat: jäljellä on vain tyhjä tilarivi.
    selitteet: [...syote.querySelectorAll('p, .pollo-vaihda')]
      .map((e) => e.textContent.trim()).filter(Boolean).join(' '),
  };
});
vaadi('nappirivi on paneelin pohjalla', alarivi.pohjalla === true, JSON.stringify(alarivi));
vaadi('nappirivi on matala (alle 42 px)', alarivi.korkeus <= 42, `${alarivi.korkeus} px`);
vaadi('rivillä on kolme nappia järjestyksessä näppäimistö, kaiutin, mikrofoni',
  alarivi.jarjestys.join(' ') === 'pollo-kirjoita pollo-kaiutin pollo-mikki',
  alarivi.jarjestys.join(' '));
vaadi('mikrofoni on yhä levein, näppäimistö ja kaiutin yhtä leveät',
  Math.abs(alarivi.osuusKirjoita - alarivi.osuusKaiutin) < 0.02
  && alarivi.osuusMikki > alarivi.osuusKirjoita * 1.7,
  `${alarivi.osuusKirjoita.toFixed(2)} / ${alarivi.osuusKaiutin.toFixed(2)} / ${alarivi.osuusMikki.toFixed(2)}`);
vaadi('rivi on koko paneelin levyinen', alarivi.leveysSuhde > 0.9,
  alarivi.leveysSuhde.toFixed(2));
vaadi('kuvakkeilla on aria-labelit',
  /kirjoita/i.test(alarivi.kirjoitaLabel) && /ääneen/i.test(alarivi.mikkiLabel)
  && /lue|luenta/i.test(alarivi.kaiutinLabel),
  `${alarivi.kirjoitaLabel} | ${alarivi.kaiutinLabel} | ${alarivi.mikkiLabel}`);
vaadi('kaiutin on vipu (aria-pressed) ja aluksi pois päältä',
  alarivi.kaiutinPainettu === 'false', String(alarivi.kaiutinPainettu));
vaadi('mikin alta poistuivat tekstiselitteet', alarivi.selitteet === '',
  alarivi.selitteet.slice(0, 60));

await sivu.screenshot({ path: join(ULOS, 'pollo-paneeli-390.png') });

// Näppäimistönappi avaa kentän nappirivin YLÄPUOLELLE: mikrofoni pysyy
// näkyvissä, joten saneluun palataan yhdellä napautuksella.
const kirjoitustila = await sivu.evaluate(async () => {
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 250));
  const kentta = document.querySelector('.pollo-rivi');
  const rivi = document.querySelector('.pollo-sanelu');
  return {
    kenttaNakyy: !kentta.hidden,
    riviNakyy: !rivi.hidden,
    kenttaYlla: kentta.getBoundingClientRect().top < rivi.getBoundingClientRect().top,
  };
});
vaadi('näppäimistönappi avaa kirjoituskentän',
  kirjoitustila.kenttaNakyy === true && kirjoitustila.kenttaYlla === true,
  JSON.stringify(kirjoitustila));
vaadi('nappirivi pysyy näkyvissä kirjoitettaessa', kirjoitustila.riviNakyy === true);
await sivu.screenshot({ path: join(ULOS, 'pollo-kirjoitus-390.png') });

const kysymys = await sivu.evaluate(async () => {
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 150));
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Milloin Lontoon metro avattiin?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 800));
  const viestit = [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent);
  return { viestit, odottaa: document.querySelectorAll('.pollo-odottaa').length };
});
vaadi('kysymys näkyy keskustelussa',
  kysymys.viestit.some((v) => /Milloin Lontoon metro/.test(v)), JSON.stringify(kysymys.viestit));
vaadi('vastaus näkyy keskustelussa',
  kysymys.viestit.some((v) => /maailman ensimmäinen/.test(v)));
vaadi('odotusviesti poistuu vastauksen tullessa', kysymys.odottaa === 0);

/* ================================================================== */
/* 3b) Jatkokysymykset ja alleviivattu linkki                          */
/* ================================================================== */

/*
 * JATKOKYSYMYKSET tulevat workerilta omana kenttänään, ja peli näyttää
 * ne nappeina vastauksen alla. Raaka "JATKOT:"-merkintä ei saa näkyä
 * missään — jäsennys tehdään palvelimella.
 */
const jatkot = await sivu.evaluate(() => {
  // Virrassa on aiempienkin vastausten ryhmiä: mitataan viimeisin.
  const ryhma = [...document.querySelectorAll('.pollo-jatkot')].at(-1);
  const napit = [...(ryhma?.querySelectorAll('.pollo-jatko') ?? [])];
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  return {
    maara: napit.length,
    tekstit: napit.map((n) => n.textContent),
    jarjestys: vastaus ? Boolean(vastaus.compareDocumentPosition(napit[0]?.parentElement ?? vastaus)
      & Node.DOCUMENT_POSITION_FOLLOWING) : false,
    raakaaMerkintaa: /JATKOT/i.test(document.querySelector('.pollo-virta').textContent),
    // Alleviivattu linkki keskellä vastausta: teksti puhuu Lontoon
    // metrosta, ja pelin oma juttu löytyy indeksistä.
    linkkeja: vastaus?.querySelectorAll('a.pollo-tekstilinkki').length ?? 0,
    linkinTeksti: vastaus?.querySelector('a.pollo-tekstilinkki')?.textContent ?? '',
    napitAlla: [...document.querySelectorAll('.pollo-linkit')].at(-1)
      ?.querySelectorAll('.pollo-linkki').length ?? 0,
  };
});
vaadi('vastauksen alle tulee jatkokysymysnapit', jatkot.maara === 2,
  `${jatkot.maara} kpl: ${jatkot.tekstit.join(' | ')}`);
vaadi('jatkokysymykset ovat vastauksen alla', jatkot.jarjestys === true);
vaadi('raaka JATKOT-merkintä ei näy pelaajalle', jatkot.raakaaMerkintaa === false);
vaadi('vastaustekstissä on alleviivattu pelinsisäinen linkki', jatkot.linkkeja >= 1,
  `${jatkot.linkkeja} kpl (${jatkot.linkinTeksti})`);
vaadi('erillisiä Lue-nappeja ei synny (13.8.2026)', jatkot.napitAlla === 0,
  `${jatkot.napitAlla} kpl`);

await sivu.screenshot({ path: join(ULOS, 'pollo-jatkot-390.png') });

// Alleviivatun linkin napautus avaa pelin oman jutun samalla
// mekanismilla kuin vanhat "Lue:"-napit.
const tekstilinkki = await sivu.evaluate(async () => {
  const linkki = [...document.querySelectorAll('.pollo-pollo a.pollo-tekstilinkki')].at(-1);
  if (!linkki) return { onLinkkia: false };
  const ui = window.matkakirja.ui;
  linkki.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    onLinkkia: true,
    lehtiAuki: document.getElementById('arrival-dialog').open,
    maalehti: Boolean(ui.lehtitila.tutkiMaaLehti),
    chatKiinni: document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('alleviivattu linkki avaa pelin oman jutun',
  tekstilinkki.onLinkkia === true && tekstilinkki.lehtiAuki === true
  && tekstilinkki.chatKiinni === true, JSON.stringify(tekstilinkki));
await sivu.evaluate(async () => {
  document.getElementById('arrival-dialog').close();
  await new Promise((r) => setTimeout(r, 400));
});

/* ------------------------------------------------------------------ */
/* 3c) Ankkuri ei tartu yhdentekevään sanaan                           */
/* ------------------------------------------------------------------ */

/*
 * OMISTAJAN HAVAINTO 13.8.2026: *"Alleviivaukset outoja."* Wienin
 * kuuluisuuksista kertovassa vastauksessa artikkelilinkit olivat
 * sanoissa "kaupungissa" ja "syntyi". Sääntö on nyt: mieluummin ei
 * linkkiä kuin outo linkki (js/pollo-haku.js YLEISSANOJEN_RUNGOT).
 */
const ankkurit = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const kysy = async (teksti) => {
    document.querySelector('.pollo-nappi').click();
    await odota(400);
    document.querySelector('.pollo-kirjoita').click();
    await odota(120);
    document.querySelector('.pollo-kentta').value = teksti;
    document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
    await odota(900);
    const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
    return [...vastaus.querySelectorAll('a.pollo-tekstilinkki')].map((a) => a.textContent);
  };
  const yleissanat = await kysy('Kerro yleissana-vastaus tästä paikasta');
  const erisnimi = await kysy('Mitä Tower Bridgestä tiedetään?');
  return { yleissanat, erisnimi };
});
vaadi('pelkkä yleissana ei saa artikkelilinkkiä',
  ankkurit.yleissanat.length === 0, ankkurit.yleissanat.join(' | '));
vaadi('erisnimi saa linkin omaan kohtaansa',
  ankkurit.erisnimi.length >= 1 && /Tower/i.test(ankkurit.erisnimi[0] ?? ''),
  ankkurit.erisnimi.join(' | '));

/* ================================================================== */
/* 3e) Mikään paneelin osa ei kiinnity keskustelun päälle               */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026 (kuvakaappaus): kolme kysymysnappia
 * leijui paneelin yläreunassa vastaustekstin päällä kuin ne olisi
 * lukittu siihen. Syy oli asettelussa: ehdotuslaatikko oli paneelin oma
 * ylin osa virran ULKOPUOLELLA, joten se jäi paikalleen kun keskustelu
 * vieri sen alta. Nyt sekä ehdotukset että jatkokysymykset asuvat
 * virrassa, eikä kummallakaan ole kiinteää asemointia.
 */
const asemointi = await sivu.evaluate(() => {
  const virta = document.querySelector('.pollo-virta');
  const ryhma = [...document.querySelectorAll('.pollo-jatkot')].at(-1);
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  const ehdotukset = document.querySelector('.pollo-ehdotukset');
  const asema = (el) => (el ? getComputedStyle(el).position : 'puuttuu');
  return {
    jatkotVirrassa: Boolean(virta?.contains(ryhma)),
    jatkotVastauksenJalkeen: Boolean(vastaus && ryhma
      && (vastaus.compareDocumentPosition(ryhma) & Node.DOCUMENT_POSITION_FOLLOWING)),
    jatkojenAsema: asema(ryhma),
    ehdotuksetVirrassa: Boolean(virta?.contains(ehdotukset)),
    ehdotustenAsema: asema(ehdotukset),
    // Paneelin suorat lapset: virta ja syöte, ei erillistä yläosaa.
    paneelinLapset: [...document.querySelector('.pollo-paneeli').children]
      .map((el) => el.className),
  };
});
vaadi('jatkokysymykset ovat keskusteluvirrassa vastauksen jäljessä',
  asemointi.jatkotVirrassa === true && asemointi.jatkotVastauksenJalkeen === true,
  JSON.stringify(asemointi));
vaadi('jatkokysymyksiä ei ole naulattu paikalleen',
  asemointi.jatkojenAsema === 'static', asemointi.jatkojenAsema);
vaadi('ehdotukset ovat virrassa eivätkä paneelin yläreunassa',
  asemointi.ehdotuksetVirrassa === true && asemointi.ehdotustenAsema === 'static',
  JSON.stringify(asemointi));
vaadi('paneelissa ei ole omaa yläosaa ehdotuksille',
  !asemointi.paneelinLapset.some((n) => /pollo-ehdotukset/.test(n)),
  asemointi.paneelinLapset.join(' | '));

/* ================================================================== */
/* 3f) Pitkä vastaus: kysymys yläreunaan, loppu piiloon alas            */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026: pitkän vastauksen jälkeen virta kelasi
 * pohjaan, joten lukeminen olisi pitänyt aloittaa kelaamalla ylös.
 *
 * Sääntö tarkentui samana päivänä (osa 1): näkymä ankkuroidaan
 * KYSYMYKSEEN, ja sen alle varataan paneelin korkeuden verran tyhjää.
 * Vastaus kirjoittuu tyhjään eikä vierityskohta liiku. Varapolku
 * (ei-striimattu vastaus) noudattaa samaa sääntöä kuin suoratoisto,
 * joten kysymys on yläreunassa myös täällä ja vastauksen alku heti sen
 * alla.
 */
const vieritys = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  // Edellinen osio avasi lehden linkistä, joten paneeli on kiinni:
  // vieritystä ei voi mitata piilotetusta paneelista.
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(700);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Kerro pitkä tarina Thamesista';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const virta = document.querySelector('.pollo-virta');
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  const kysymys = [...document.querySelectorAll('.pollo-kayttaja')].at(-1);
  const v = virta.getBoundingClientRect();
  const k = vastaus.getBoundingClientRect();
  return {
    kysymysYlhaalla: kysymys.getBoundingClientRect().top - v.top,
    alkuNakyvissa: k.top - v.top,
    ensimmainenLause: vastaus.textContent.slice(0, 28),
    vastauksenKorkeus: k.height,
    virranKorkeus: v.height,
    scrollTop: virta.scrollTop,
    pohja: virta.scrollHeight - virta.clientHeight,
  };
});
vaadi('koevastaus on paneelia korkeampi (muuten vieritystä ei mitata)',
  vieritys.vastauksenKorkeus > vieritys.virranKorkeus, JSON.stringify(vieritys));
vaadi('kysymys on näkymän yläreunassa myös varapolussa',
  vieritys.kysymysYlhaalla >= -2 && vieritys.kysymysYlhaalla <= 30,
  JSON.stringify(vieritys));
vaadi('vastauksen ensimmäinen rivi on heti kysymyksen alla',
  vieritys.alkuNakyvissa > vieritys.kysymysYlhaalla
  && vieritys.alkuNakyvissa < vieritys.virranKorkeus / 2
  && /Ensimmäinen rivi alkaa/.test(vieritys.ensimmainenLause), JSON.stringify(vieritys));
vaadi('virta ei kelaa pohjaan vastauksen tullessa',
  vieritys.pohja - vieritys.scrollTop > 20, JSON.stringify(vieritys));

await sivu.screenshot({ path: join(ULOS, 'pollo-pitka-vastaus-390.png') });

/* ================================================================== */
/* 3c) Kaiutinvipu                                                     */
/* ================================================================== */

/*
 * KAIUTIN ON VIPU. Päällä ollessaan jokainen uusi vastaus luetaan heti
 * ääneen — mutta VAIN vastaus. Kysymys, ehdotukset ja jatkokysymykset
 * eivät ole pöllön puhetta, eivätkä ne saa päätyä luentaan.
 */
const kaiutinTila = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  window.__puhutut = [];
  const kaiutin = document.querySelector('.pollo-kaiutin');
  kaiutin.click();
  await odota(120);
  const paallaHeti = {
    luokka: kaiutin.classList.contains('paalla'),
    aria: kaiutin.getAttribute('aria-pressed'),
    talletettu: localStorage.getItem('matkakirja-pollo-aani'),
    puhuttuaEnnenVastausta: window.__puhutut.length,
  };
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Milloin Lontoon metro avattiin?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  return {
    ...paallaHeti,
    puhutut: window.__puhutut.slice(),
    jatkoja: document.querySelectorAll('.pollo-jatkot .pollo-jatko').length,
  };
});
vaadi('kaiutin merkitään päälle näkyvästi ja saavutettavasti',
  kaiutinTila.luokka === true && kaiutinTila.aria === 'true', JSON.stringify(kaiutinTila));
vaadi('vipu muistetaan laitteella', kaiutinTila.talletettu === '1',
  String(kaiutinTila.talletettu));
/*
 * Jälkikäteisluenta (omistaja 13.8.2026): vipu päälle valmiin
 * vastauksen JÄLKEEN lukee viimeisimmän vastauksen — ennen se ei
 * lukenut mitään ennen seuraavaa kysymystä. Edellisen osion pitkä
 * koevastaus on juuri annettu, joten sen kuuluu alkaa puhua heti.
 */
vaadi('vipu päälle lukee viimeisimmän vastauksen jälkikäteen',
  kaiutinTila.puhuttuaEnnenVastausta > 0
  && /Ensimmäinen rivi alkaa/.test(kaiutinTila.puhutut[0] ?? ''),
  JSON.stringify(kaiutinTila.puhutut[0]));
vaadi('uusi vastaus luetaan ääneen',
  kaiutinTila.puhutut.join(' ').includes('Lontoon metro avattiin'),
  JSON.stringify(kaiutinTila.puhutut));
vaadi('kysymystä ei lueta ääneen',
  !kaiutinTila.puhutut.some((t) => /Milloin Lontoon metro avattiin\?/.test(t)),
  JSON.stringify(kaiutinTila.puhutut));
vaadi('jatkokysymyksiä ei lueta ääneen',
  kaiutinTila.jatkoja > 0
  && !kaiutinTila.puhutut.some((t) => /Miten tunnelit kaivettiin/.test(t)),
  JSON.stringify(kaiutinTila.puhutut));

await sivu.screenshot({ path: join(ULOS, 'pollo-kaiutin-390.png') });

// Jatkokysymyksen napautus lähettää sen kysymyksenä.
const jatkoKlikki = await sivu.evaluate(async () => {
  const nappi = document.querySelector('.pollo-jatkot .pollo-jatko');
  const teksti = nappi?.textContent ?? '';
  nappi?.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    teksti,
    kysytty: [...document.querySelectorAll('.pollo-kayttaja')].some((v) => v.textContent === teksti),
  };
});
vaadi('jatkokysymyksen napautus lähettää sen', jatkoKlikki.kysytty === true,
  JSON.stringify(jatkoKlikki));

/*
 * KEHYSMALLIN SIGNAALI OIKEASSA PYYNTÖRUNGOSSA (Raamattu v1265).
 *
 * Kaksi edellistä pyyntöä ovat samasta keskustelusta: ensin
 * kirjoitettu kysymys (uusi aihe), sitten jatkokysymysnapin napautus
 * (sama aihe). Vain jälkimmäinen saa olla 'jatko' — jos merkintä
 * lipsuisi kirjoitettuun kysymykseen, Livian oma ääni katoaisi
 * pelistä kokonaan eikä se näkyisi missään muualla kuin vastauksissa.
 */
const kehysRungot = rungot.filter((r) => r.tehtava === 'vastaus').slice(-2);
vaadi('kirjoitettu kysymys menee uutena aiheena',
  kehysRungot[0]?.kehys === 'aloitus', JSON.stringify(kehysRungot[0]?.kehys));
vaadi('jatkokysymysnapin kysymys menee jatkona',
  kehysRungot[1]?.kehys === 'jatko', JSON.stringify(kehysRungot[1]?.kehys));

// Vipu pois: luenta lakkaa ja tila unohtuu talletuksesta.
const kaiutinPois = await sivu.evaluate(async () => {
  const kaiutin = document.querySelector('.pollo-kaiutin');
  kaiutin.click();
  await new Promise((r) => setTimeout(r, 100));
  window.__puhutut = [];
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 120));
  document.querySelector('.pollo-kentta').value = 'Entä Thames?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 900));
  return {
    aria: kaiutin.getAttribute('aria-pressed'),
    talletettu: localStorage.getItem('matkakirja-pollo-aani'),
    puhutut: window.__puhutut.length,
  };
});
vaadi('vipu pois: vastausta ei enää lueta',
  kaiutinPois.aria === 'false' && kaiutinPois.puhutut === 0, JSON.stringify(kaiutinPois));
vaadi('pois kytketty vipu ei jää talletukseen', !kaiutinPois.talletettu,
  String(kaiutinPois.talletettu));

/* ================================================================== */
/* 3g) Vipu pois KESKEN LUENNAN pysäyttää heti                          */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026: kaiuttimen kytkeminen pois ei
 * hiljentänyt käynnissä olevaa luentaa, vaan ääni jatkui loppuun asti.
 * Mock on hitaassa tilassa, jolloin lausuma jää puhumaan kunnes se
 * perutaan — näin nähdään pysähtyykö puhe kesken lauseen ja tyhjeneekö
 * paloitellun luennan jono.
 */
const pysaytys = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const kaiutin = document.querySelector('.pollo-kaiutin');
  if (kaiutin.getAttribute('aria-pressed') !== 'true') {
    kaiutin.click();
    await odota(120);
  }
  window.__puheHidas = true;
  window.__puhutut = [];
  window.__peruutuksia = 0;
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Kerro pitkä tarina Lontoon satamasta';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const kesken = { jonossa: window.__puheJono(), puhuttuja: window.__puhutut.length };
  // Vipu pois kesken luennan.
  kaiutin.click();
  await odota(120);
  const jalkeen = {
    jonossa: window.__puheJono(),
    puhuttuja: window.__puhutut.length,
    peruutuksia: window.__peruutuksia,
    aria: kaiutin.getAttribute('aria-pressed'),
  };
  // Jäikö jokin pala lähtemään pysäytyksen jälkeen?
  await odota(300);
  const myohemmin = { jonossa: window.__puheJono(), puhuttuja: window.__puhutut.length };
  window.__puheHidas = false;
  localStorage.removeItem('matkakirja-pollo-aani');
  return { kesken, jalkeen, myohemmin };
});
vaadi('pitkä vastaus on luennassa kun vipu kytketään pois',
  pysaytys.kesken.jonossa >= 1 && pysaytys.kesken.puhuttuja >= 1,
  JSON.stringify(pysaytys.kesken));
vaadi('vipu pois pysäyttää luennan välittömästi',
  pysaytys.jalkeen.jonossa === 0 && pysaytys.jalkeen.peruutuksia >= 1
  && pysaytys.jalkeen.aria === 'false', JSON.stringify(pysaytys.jalkeen));
vaadi('paloitellun luennan jonoon ei jää palasia',
  pysaytys.myohemmin.jonossa === 0
  && pysaytys.myohemmin.puhuttuja === pysaytys.jalkeen.puhuttuja,
  JSON.stringify(pysaytys.myohemmin));

/* ================================================================== */
/* 3d) Kehittäjäkoodi otsakkeessa                                      */
/* ================================================================== */

/*
 * Otsake lähtee VAIN jos koodi on talletettu laitteelle. Ilman koodia
 * pyynnössä ei saa olla mitään jälkeä kehittäjätilasta.
 */
const ilmanKoodia = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('ilman koodia kehittäjäotsaketta ei lähetetä',
  !('x-pollo-kehittaja' in (ilmanKoodia.__otsakkeet ?? {})),
  JSON.stringify(Object.keys(ilmanKoodia.__otsakkeet ?? {})));

const koodilla = await sivu.evaluate(async () => {
  localStorage.setItem('matkakirja-pollo-kehittajakoodi', 'testikoodi-123');
  document.querySelector('.pollo-kirjoita').click();
  await new Promise((r) => setTimeout(r, 120));
  document.querySelector('.pollo-kentta').value = 'Kuka rakensi metron?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 900));
  localStorage.removeItem('matkakirja-pollo-kehittajakoodi');
  return true;
});
const koodillinen = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('talletettu koodi lähtee otsakkeessa',
  koodilla === true
  && (koodillinen.__otsakkeet ?? {})['x-pollo-kehittaja'] === 'testikoodi-123',
  JSON.stringify((koodillinen.__otsakkeet ?? {})['x-pollo-kehittaja']));

/*
 * Erillistä koodikenttää ei enää ole (13.8.2026): koodi talletetaan
 * kehittäjätilan kytkennässä (js/main.js). Paneelissa ei saa olla
 * kenttää lainkaan.
 */
const koodikentta = await sivu.evaluate(() => ({
  kenttia: document.querySelectorAll('.pollo-kehittaja, .pollo-kehittaja-kentta').length,
}));
vaadi('erillistä kehittäjäkoodikenttää ei ole paneelissa',
  koodikentta.kenttia === 0, JSON.stringify(koodikentta));

/* ================================================================== */
/* 4) Spoilerisuoja ja paikallinen aineisto oikeasta pyyntörungosta     */
/* ================================================================== */

const vastausRunko = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
vaadi('konteksti mahtuu kattoon', (vastausRunko.konteksti ?? '').length <= 5000,
  `${(vastausRunko.konteksti ?? '').length} merkkiä`);
vaadi('konteksti kertoo kaupungin', /Lontoo/.test(vastausRunko.konteksti ?? ''));
vaadi('pelin oma aineisto on mukana',
  /PELIN TARKISTETTUA AINEISTOA/.test(vastausRunko.konteksti ?? ''),
  (vastausRunko.konteksti ?? '').slice(0, 120));

/* ================================================================== */
/* 4c) SIJAINTIKONTEKSTIN EHEYS: kaupunki ratkaisee maan                */
/* ================================================================== */

/*
 * OMISTAJAN PELISESSIO 13.8.2026. Pelaaja oli Sofiassa — kartan
 * maakyltissä luki BULGARIA — mutta pöllö ehdotti kysymystä "Mikä on
 * Sofian rooli Kreikassa tänä päivänä?" ja vahvisti sen. Konteksti luki
 * maan ui.arrivalMaaTiedoista, joka osoittaa VIIMEKSI AVATTUUN
 * maalehteen: Maiden tiedot -varusteella selattu Kreikka jäi siihen
 * roikkumaan.
 *
 * Tämä ajo tekee saman virheen tahallaan oikeaa tietä (avaa Kreikan
 * maalehden Sofiassa) ja vaatii, että sekä avausehdotusten että
 * kysymyksen konteksti kertovat Bulgarian — saman maan kuin kartan
 * kyltti. Lopuksi pelaaja palautetaan Lontooseen, jotta myöhemmät osiot
 * mittaavat sitä mitä ennenkin.
 */
/*
 * OSA 1: OIKEA PYYNTÖ. Elävään UI-olioon istutetaan sama vanhentunut
 * kenttä, jonka Maiden tiedot -varuste jättäisi jälkeensä. Sen ei saa
 * näkyä pyynnön kontekstissa millään rivillä — ei ehdotuksissa eikä
 * kysymyksessä.
 */
const vanhentunut = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const ui = window.matkakirja.ui;
  ui.lehtitila.arrivalMaaTiedot = { nimi: 'Kreikka' };
  if (!document.querySelector('.pollo-paneeli').hidden) {
    document.getElementById('board').dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true }),
    );
    await odota(300);
  }
  // Avaus hakee ehdotukset uudelleen samalla kontekstilla.
  document.querySelector('.pollo-nappi').click();
  await odota(900);
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Missä maassa tämä kaupunki on?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  ui.lehtitila.arrivalMaaTiedot = null;
  return true;
});
const ehdotusRunko = rungot.filter((r) => r.tehtava === 'ehdotukset').at(-1) ?? {};
const kysymysRunko = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
for (const [nimi, runko] of [['ehdotusten', ehdotusRunko], ['kysymyksen', kysymysRunko]]) {
  const teksti = runko.konteksti ?? '';
  vaadi(`${nimi} kontekstiin ei vuoda vanhentunutta maalehtikenttää`,
    vanhentunut === true && !/Kreikka/.test(teksti), teksti.slice(0, 200));
}

/*
 * OSA 2: SOFIA JA BULGARIA pelin OMALLA aineistolla. Magellanin
 * kompassi -laudalla ei ole kaupunki→maa-kytkentää, joten koe tehdään
 * Euroopan laudan oikealla datalla ja pelin omalla moduulilla — samalla
 * koodilla, jota pöllö ajaa. Vanhentunut kenttä osoittaa Kreikkaan
 * täsmälleen kuten omistajan pelisessiossa.
 */
const sofia = await sivu.evaluate(async () => {
  const { lueNakyma } = await import('/js/pollo.js');
  const { EUROPE } = await import('/js/packs/europe.js');
  const teeGame = (cityId, pack = EUROPE) => ({
    pack,
    player: { pos: { city: cityId } },
    board: { cityById: new Map(pack.cities.map((c) => [c.id, c])) },
    dayCount: () => 12,
  });
  const vanhaUi = { lehtitila: { arrivalMaaTiedot: { nimi: 'Kreikka' }, tutkiMaaLehti: 'GRC' } };
  // Sama lähde kuin kartan maakyltillä (ui.js drawCountryBorders).
  const kyltinMaa = EUROPE.map.countryShapes[EUROPE.map.cityCountry.sofia]?.nimi ?? '';
  // Lauta, jolla kaupungin maalle ei ole muotoa: maan pitää jäädä pois.
  const nimeton = {
    ...EUROPE,
    map: { ...EUROPE.map, cityCountry: { ...EUROPE.map.cityCountry, sofia: 'ZZZ' } },
  };
  return {
    kyltinMaa,
    sofia: lueNakyma({ game: teeGame('sofia'), ui: vanhaUi, doc: document }),
    ilmanMuotoa: lueNakyma({ game: teeGame('sofia', nimeton), ui: vanhaUi, doc: document }),
  };
});
vaadi('Sofian maa johdetaan kaupungista: Bulgaria, ei Kreikka',
  /Kaupunki, jossa pelaaja on: Sofia/.test(sofia.sofia)
  && /Maa, jossa pelaaja on: Bulgaria/.test(sofia.sofia)
  && !/Kreikka/.test(sofia.sofia), sofia.sofia.slice(0, 200));
vaadi('pöllön maa on sama kuin kartan maakyltin',
  sofia.kyltinMaa === 'Bulgaria'
  && sofia.sofia.includes(`Maa, jossa pelaaja on: ${sofia.kyltinMaa}`), sofia.kyltinMaa);
vaadi('ilman maan muotoa maa jätetään kokonaan pois',
  !/Maa, jossa pelaaja on/.test(sofia.ilmanMuotoa)
  && !/ZZZ|Kreikka/.test(sofia.ilmanMuotoa), sofia.ilmanMuotoa.slice(0, 200));

/* ================================================================== */
/* 5) Lehtinäkymä: pöllö siirtyy lehteen, minitehtävä ei vuoda          */
/* ================================================================== */

const lehdessa = await sivu.evaluate(async () => {
  // Paneelissa ei ole enää ×-nappia: sulku tulee ulkopuolelta.
  document.getElementById('board').dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true }),
  );
  await new Promise((r) => setTimeout(r, 200));
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  // Selataan aihesivulle, jolla on minitehtävä.
  const sivu = (ui.lehtitila.tutkiSivut ?? []).findIndex((s) => s?.tehtava);
  if (sivu >= 0) ui.naytaTutkiSivu(sivu + 1, { heti: true });
  await new Promise((r) => setTimeout(r, 700));
  const lehti = document.getElementById('arrival-dialog');
  const nappi = document.querySelector('.pollo-nappi');
  return {
    lehtiAuki: lehti.open,
    polloLehdessa: lehti.contains(nappi),
    kelluu: nappi.classList.contains('pollo-kelluu'),
    tehtavia: document.querySelectorAll('#arrival-kategoria .minitehtava').length,
    tehtavanKysymys: document.querySelector('.minitehtava-kysymys')?.textContent ?? '',
  };
});
vaadi('pöllö siirtyy lehden sisään', lehdessa.polloLehdessa === true && lehdessa.kelluu === true,
  JSON.stringify(lehdessa));

const lehtiKysely = await sivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  document.querySelector('.pollo-kirjoita')?.click();
  await new Promise((r) => setTimeout(r, 150));
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Mitä tällä sivulla kerrotaan?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 800));
  return true;
});
vaadi('lehdestä voi kysyä', lehtiKysely === true);

/* ================================================================== */
/* 4b) Linkkisuositusten osuvuus (omistajan havainto 12.8.2026)         */
/* ================================================================== */

/*
 * Kynnys mitataan pelin OMASTA hausta oikealla aineistolla ja oikealla
 * sijainnilla — sama koodi, jota pöllö ajaa ennen jokaista kysymystä.
 * Kaksi tapausta: sijaintiin liittyvä kysymys (oman maan pitää tulla
 * ensin) ja yleiskysymys, johon aineistossa ei ole vastausta (silloin
 * ei yhtään linkkiä).
 */
const osuvuus = await sivu.evaluate(async () => {
  const { haeKatkelmat } = await import('/js/pollo-haku.js');
  const pollo = window.matkakirjaPollo;
  const indeksi = pollo.varmistaIndeksi();
  const game = window.matkakirja.game;
  const cityId = game.player?.pos?.city ?? null;
  const sijainti = {
    kaupunki: cityId,
    maa: cityId ? game.pack?.map?.cityCountry?.[cityId] ?? null : null,
  };
  const aja = (kysymys) => haeKatkelmat(indeksi, kysymys, { maara: 4, sijainti })
    .katkelmat.map((k) => ({ leima: k.leima, oma: k.oma }));
  return {
    sijainti,
    paikallinen: aja('Milloin Lontoon metro avattiin?'),
    yleinen: aja('Kuka oli Napoleon?'),
    hatara: aja('Kuinka vanha ihmiskunta on?'),
  };
});
vaadi('sijaintiin liittyvä kysymys nostaa oman maan ensimmäiseksi',
  osuvuus.paikallinen.length > 0 && osuvuus.paikallinen[0].oma === true,
  JSON.stringify(osuvuus.paikallinen));
vaadi('yleiskysymys ilman hyviä osumia ei tuota yhtään linkkiä',
  osuvuus.yleinen.length === 0 && osuvuus.hatara.length === 0,
  `${JSON.stringify(osuvuus.yleinen)} / ${JSON.stringify(osuvuus.hatara)}`);
vaadi('linkkejä on enintään kaksi', osuvuus.paikallinen.length <= 4
  && osuvuus.paikallinen.slice(0, 2).length <= 2, JSON.stringify(osuvuus.paikallinen));

await sivu.screenshot({ path: join(ULOS, 'pollo-lehdessa-390.png') });

const lehtiRunko = rungot.filter((r) => r.tehtava === 'vastaus').at(-1) ?? {};
const konteksti = lehtiRunko.konteksti ?? '';
vaadi('lehden näkymä on kontekstissa', /lehti auki/.test(konteksti), konteksti.slice(0, 90));
if (lehdessa.tehtavanKysymys) {
  vaadi('SPOILERISUOJA: minitehtävän kysymys ei ole kontekstissa',
    !konteksti.includes(lehdessa.tehtavanKysymys.trim()),
    lehdessa.tehtavanKysymys.slice(0, 60));
} else {
  vaadi('SPOILERISUOJA: sivulla ei ollut minitehtävää testattavaksi', false,
    'tarkista, avautuiko aihesivu');
}

/* ================================================================== */
/* 6) Varapolku: linkki napiksi, kun ankkuria ei löydy tekstistä        */
/* ================================================================== */

/*
 * Ensisijainen muoto on alleviivattu linkki keskellä vastausta (osio
 * 3b). Jos vastauksessa ei ole yhtään kohtaa, joka puhuisi samasta
 * asiasta, linkin on ilmestyttävä entiseen tapaan napiksi vastauksen
 * alle — ei kadottava.
 */
const linkki = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.getElementById('arrival-dialog').close();
  await odota(400);
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Kerro Lontoon metrosta varapolku';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const viesti = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  // Erillisiä Lue-nappeja ei enää ole (13.8.2026): ankkuriton vastaus
  // jää kokonaan ilman linkkiä, ja avaus testataan tekstilinkillä
  // edellisestä vastauksesta.
  const nappiryhmia = document.querySelectorAll('.pollo-linkit').length;
  const tekstilinkki = [...document.querySelectorAll('a.pollo-tekstilinkki')].at(-1);
  if (!tekstilinkki) {
    return { nappiryhmia, tekstilinkkeja: viesti?.querySelectorAll('a').length ?? 0 };
  }
  tekstilinkki.click();
  await odota(900);
  return {
    nappiryhmia,
    tekstilinkkeja: viesti?.querySelectorAll('a').length ?? 0,
    // Reitti voi olla lehti tai kohdekartan juttu — kumpikin on pelin
    // oma näkymä, ja kumpikin avautuu samalla mekanismilla.
    avautui: Boolean(document.querySelector('#arrival-dialog[open], #nahtavyys-dialog[open]')),
    chatKiinni: document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('ankkuriton vastaus jää ilman irrallisia nappeja', linkki.nappiryhmia === 0
  && linkki.tekstilinkkeja === 0, JSON.stringify(linkki));
vaadi('tekstilinkki avaa pelin oman näkymän', linkki.avautui === true, JSON.stringify(linkki));
vaadi('linkki sulkee chatin (paluu yhdellä napautuksella)', linkki.chatKiinni === true);

await sivu.screenshot({ path: join(ULOS, 'pollo-linkki-avattu-390.png') });

/* ================================================================== */
/* 7) Sanelu                                                           */
/* ================================================================== */

const sanelu = await sivu.evaluate(async () => {
  document.getElementById('arrival-dialog').close();
  await new Promise((r) => setTimeout(r, 500));
  window.__saneluTeksti = 'Kerro Thamesin silloista';
  const pollo = window.matkakirjaPollo;
  pollo.historia = [];
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  /*
   * Alanappirivi on aina esillä, joten mikistä pääsee saneluun myös
   * kirjoitustilasta — erillistä "Sanele sen sijaan" -linkkiä ei ole.
   */
  await new Promise((r) => setTimeout(r, 150));
  const mikki = document.querySelector('.pollo-mikki');
  const nakyy = !document.querySelector('.pollo-sanelu').hidden;
  mikki.click();
  await new Promise((r) => setTimeout(r, 900));
  const viestit = [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent);
  return { nakyy, aloituksia: window.__saneluAloituksia, viestit };
});
vaadi('sanelunappi näkyy kun tunnistus on tuettu', sanelu.nakyy === true);
vaadi('mikin napautus käynnistää tunnistuksen', sanelu.aloituksia >= 1,
  String(sanelu.aloituksia));
vaadi('puheesta tulee kysymys keskusteluun',
  sanelu.viestit.some((v) => /Kerro Thamesin silloista/.test(v)),
  JSON.stringify(sanelu.viestit.slice(-3)));

await sivu.screenshot({ path: join(ULOS, 'pollo-sanelu-390.png') });

/* ================================================================== */
/* 18) Sanelutila näkyy napissa                                        */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026: sanelun aikana mikkinappi oli täysin
 * tyhjä, ja ainoa merkki kuuntelusta oli tilarivin "Kuuntelen…". Nyt
 * napissa on pysäytysneliö ja sana "Lopeta", ja se sykkii kevyesti.
 * Hidas mock pitää tunnistuksen päällä niin kauan, että tilan ehtii
 * mitata ja kuvata.
 */
const sanelutila = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  window.__saneluHidas = true;
  window.__saneluTeksti = '';
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  const mikki = document.querySelector('.pollo-mikki');
  const lepo = {
    teksti: mikki.textContent.trim(),
    label: mikki.getAttribute('aria-label') ?? '',
    neliota: mikki.querySelectorAll('rect').length,
  };
  mikki.click();
  await odota(250);
  const sykeNimi = getComputedStyle(mikki).animationName;
  return {
    lepo,
    sanelussa: {
      teksti: mikki.textContent.trim(),
      label: mikki.getAttribute('aria-label') ?? '',
      painettu: mikki.getAttribute('aria-pressed'),
      // Mikrofonikuvake on <rect>-runkoinen, joten pelkkä neliöiden
      // määrä ei riitä: pysäytysneliö on täytetty (.taytto).
      taytettyja: mikki.querySelectorAll('.viiva-ikoni .taytto').length,
      polkuja: mikki.querySelectorAll('.viiva-ikoni path').length,
      syke: sykeNimi,
      tilarivi: document.querySelector('.pollo-sanelu-tila').textContent.trim(),
    },
  };
});
vaadi('lepotilassa mikissä ei ole tekstiä eikä pysäytysneliötä',
  sanelutila.lepo.teksti === '' && /ääneen/i.test(sanelutila.lepo.label),
  JSON.stringify(sanelutila.lepo));
vaadi('sanelun aikana napissa lukee Lopeta',
  /lopeta/i.test(sanelutila.sanelussa.teksti), JSON.stringify(sanelutila.sanelussa));
vaadi('sanelun aikana napissa on täytetty pysäytysneliö',
  sanelutila.sanelussa.taytettyja === 1 && sanelutila.sanelussa.polkuja === 0,
  JSON.stringify(sanelutila.sanelussa));
vaadi('sanelunapin aria-label kertoo lopettamisesta',
  /lopeta/i.test(sanelutila.sanelussa.label) && sanelutila.sanelussa.painettu === 'true',
  JSON.stringify(sanelutila.sanelussa));
vaadi('sanelunappi sykkii kuunnellessaan',
  sanelutila.sanelussa.syke === 'pollo-syke', String(sanelutila.sanelussa.syke));
vaadi('tilarivi kertoo yhä kuuntelusta',
  /kuuntelen/i.test(sanelutila.sanelussa.tilarivi), sanelutila.sanelussa.tilarivi);

await sivu.screenshot({ path: join(ULOS, 'pollo-sanelutila-390.png') });

// Sanelu kiinni ja mock takaisin nopeaksi: seuraavat osiot kysyvät
// kirjoittamalla.
await sivu.evaluate(async () => {
  document.querySelector('.pollo-mikki').click();
  window.__saneluHidas = false;
  await new Promise((r) => setTimeout(r, 300));
});

/* ================================================================== */
/* 19) Pöllölinkit: [[avainkäsitteet]] vastauksen sisällä              */
/* ================================================================== */

/*
 * Toinen linkkilaji (omistajan tilaus 13.8.2026). Malli merkitsee 1–3
 * käsitettä muodossa [[käsite]], palvelin jättää merkinnät tekstiin ja
 * peli jäsentää ne linkeiksi. Hakasulkeet eivät saa näkyä missään, ja
 * napautus lähettää kysymyksen "Kerro lisää: X".
 */
const kasitelinkit = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Kerro käsite Lontoon liikenteestä';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  const kasitteet = [...(vastaus?.querySelectorAll('a.pollo-kasitelinkki') ?? [])];
  const tyyli = kasitteet[0] ? getComputedStyle(kasitteet[0]) : null;
  const artikkeli = vastaus?.querySelector('a.pollo-tekstilinkki');
  return {
    maara: kasitteet.length,
    tekstit: kasitteet.map((k) => k.textContent),
    sulkeita: /\[\[|\]\]/.test(document.querySelector('.pollo-virta').textContent),
    koko: vastaus?.textContent ?? '',
    tyyli: tyyli ? tyyli.textDecorationStyle : '',
    tyyliVari: tyyli ? tyyli.color : '',
    artikkelinTyyli: artikkeli ? getComputedStyle(artikkeli).textDecorationStyle : '',
    artikkelinVari: artikkeli ? getComputedStyle(artikkeli).color : '',
  };
});
/*
 * ASIAKAS EI LEIKKAA PALVELIMEN LINKKEJÄ (omistaja 13.8.2026).
 * Kolmen katto jätti pitkän vastauksen lopun linkittömäksi; nyt kaikki
 * kuusi merkintää muuttuvat napautettaviksi.
 */
vaadi('jokainen käsitemerkintä muuttuu pöllölinkiksi',
  kasitelinkit.maara === 6,
  `${kasitelinkit.maara} kpl: ${kasitelinkit.tekstit.join(' | ')}`);
vaadi('myös vastauksen viimeinen merkintä linkittyy',
  kasitelinkit.tekstit.includes('Beethoven'), kasitelinkit.tekstit.join(' | '));
vaadi('hakasulkeet eivät näy pelaajalle', kasitelinkit.sulkeita === false,
  kasitelinkit.koko.slice(0, 80));
vaadi('käsite näkyy tekstissä ilman merkintää',
  /höyryveturit vetivät junia/.test(kasitelinkit.koko), kasitelinkit.koko.slice(0, 80));
vaadi('pöllölinkki on pisteviiva', kasitelinkit.tyyli === 'dotted', kasitelinkit.tyyli);

const pollolinkki = await sivu.evaluate(async () => {
  const linkki = [...document.querySelectorAll('a.pollo-kasitelinkki')].at(-1);
  const kasite = linkki?.textContent ?? '';
  linkki?.click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    kasite,
    kysytty: [...document.querySelectorAll('.pollo-kayttaja')]
      .some((v) => v.textContent === `Kerro lisää: ${kasite}`),
    viimeisin: [...document.querySelectorAll('.pollo-kayttaja')].at(-1)?.textContent ?? '',
  };
});
vaadi('pöllölinkin napautus kysyy lisää samasta käsitteestä',
  pollolinkki.kysytty === true, JSON.stringify(pollolinkki));

await sivu.screenshot({ path: join(ULOS, 'pollo-pollolinkki-390.png') });

/* ================================================================== */
/* 20) Kuvapopup nähtävyyslinkin päällä                                */
/* ================================================================== */

/*
 * Nähtävyysjutun linkki avaa ensin kevyen kortin: kuva, jutun oma
 * kuvateksti ja "Avaa juttu" -nappi. Kortti sulkeutuu napauttamalla
 * ulkopuolelle, eikä se sulje chattia allaan.
 *
 * Commonsin kuvat on katkaistu koko ajosta (verkkoriippumattomuus),
 * joten niiden tilalle tarjoillaan paikallinen paikanpitäjä. Kuvateksti
 * on jutun oikea teksti.
 */
const PAIKANPITAJA = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3" width="640" '
  + 'height="480"><rect width="4" height="3" fill="#cbbb95"/>'
  + '<text x="2" y="1.7" font-size="0.4" text-anchor="middle" fill="#6b5a45">kuva</text></svg>';
await sivu.route(/Special:FilePath/, (route) => route.fulfill({
  status: 200, contentType: 'image/svg+xml', body: PAIKANPITAJA,
}));

const kuvapopup = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  document.querySelector('.pollo-kentta').value = 'Mikä on Tower Bridge?';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  await odota(900);
  const linkki = [...document.querySelectorAll('.pollo-pollo a.pollo-tekstilinkki')].at(-1);
  if (!linkki) return { linkkia: false };
  linkki.click();
  await odota(600);
  const popup = document.querySelector('.pollo-kuvatausta');
  return {
    linkkia: true,
    auki: Boolean(popup),
    kuvia: popup?.querySelectorAll('img.pollo-kuva').length ?? 0,
    kuvateksti: popup?.querySelector('.pollo-kuvateksti')?.textContent ?? '',
    nappi: popup?.querySelector('.pollo-kuvanappi')?.textContent ?? '',
    // Kevyt popup EI vie koko juttuun eikä sulje chattia allaan.
    juttuAuki: Boolean(document.querySelector('#nahtavyys-dialog[open]')),
    chatAuki: !document.querySelector('.pollo-paneeli').hidden,
  };
});
vaadi('nähtävyyslinkki löytyi vastauksesta', kuvapopup.linkkia === true);
vaadi('nähtävyyslinkki avaa kevyen kuvapopupin',
  kuvapopup.auki === true && kuvapopup.kuvia === 1, JSON.stringify(kuvapopup));
vaadi('popupissa on jutun oma kuvateksti', kuvapopup.kuvateksti.length > 20,
  kuvapopup.kuvateksti.slice(0, 60));
vaadi('popupissa on Avaa juttu -nappi', /avaa juttu/i.test(kuvapopup.nappi), kuvapopup.nappi);
vaadi('popup ei vielä avaa koko juttua eikä sulje chattia',
  kuvapopup.juttuAuki === false && kuvapopup.chatAuki === true, JSON.stringify(kuvapopup));

await sivu.screenshot({ path: join(ULOS, 'pollo-kuvapopup-390.png') });

const popupSulku = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const tausta = document.querySelector('.pollo-kuvatausta');
  // Napautus kortin ulkopuolelle: kohteena tausta itse.
  tausta.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  tausta.click();
  await odota(300);
  const sulkeutui = !document.querySelector('.pollo-kuvatausta');
  const chatAuki = !document.querySelector('.pollo-paneeli').hidden;
  // Uudelleen auki ja tällä kertaa napista koko juttuun.
  [...document.querySelectorAll('.pollo-pollo a.pollo-tekstilinkki')].at(-1)?.click();
  await odota(500);
  document.querySelector('.pollo-kuvanappi')?.click();
  await odota(800);
  return {
    sulkeutui,
    chatAuki,
    popupPois: !document.querySelector('.pollo-kuvatausta'),
    juttuAuki: Boolean(document.querySelector('#nahtavyys-dialog[open]')),
    otsikko: document.getElementById('nahtavyys-otsikko')?.textContent ?? '',
  };
});
vaadi('napautus popupin ulkopuolelle sulkee sen',
  popupSulku.sulkeutui === true, JSON.stringify(popupSulku));
vaadi('popupin sulku jättää chatin auki', popupSulku.chatAuki === true);
vaadi('Avaa juttu vie nähtävyysjuttuun',
  popupSulku.popupPois === true && popupSulku.juttuAuki === true
  && /tower bridge/i.test(popupSulku.otsikko), JSON.stringify(popupSulku));

await sivu.evaluate(async () => {
  document.getElementById('nahtavyys-dialog')?.close();
  await new Promise((r) => setTimeout(r, 300));
});

/* ================================================================== */
/* 3i) Vastauksen kuva kuplan kulmassa (omistajan tilaus 15.8.2026)    */
/* ================================================================== */

/*
 * "Olisiko pöllön mahdollista hakea aina yksi kuva per vastaus, joka
 * näkyisi ensin suhteellisen pienenä oikeassa yläreunassa ja jonka
 * voisi klikata sitten auki isommaksi?"
 *
 * Kaksi polkua: paikallinen nähtävyyskuva (Tower-vastaus yllä sai
 * sellaisen) ja Wikipedian pääkuva, jonka summary-rajapinta mockataan.
 */
const pikkukuvaOma = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  // Nappi lisätään kuplaan vasta img:n load-tapahtumassa (omistaja
  // 19.8.2026), joten sitä odotetaan kyselysilmukalla eikä kiinteällä
  // viiveellä.
  let vastaus = null; let nappi = null;
  for (let kierros = 0; kierros < 30 && !nappi; kierros += 1) {
    vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
    nappi = vastaus?.querySelector('.pollo-vastauskuva');
    if (!nappi) await odota(150);
  }
  if (!nappi) return { loytyi: false };
  const kuva = nappi.getBoundingClientRect();
  const kupla = vastaus.getBoundingClientRect();
  return {
    loytyi: true,
    pieni: kuva.width <= 120 && kuva.height <= 120,
    oikealla: Math.abs(kuva.right - kupla.right) < 48,
    ylhaalla: kuva.top - kupla.top < 48,
  };
});
vaadi('paikallinen pikkukuva on vastauskuplan oikeassa yläkulmassa',
  pikkukuvaOma.loytyi === true && pikkukuvaOma.pieni === true
  && pikkukuvaOma.oikealla === true && pikkukuvaOma.ylhaalla === true,
  JSON.stringify(pikkukuvaOma));

// Wikipedia-polku: kuvattomaan vastaukseen haetaan artikkelin pääkuva.
await sivu.route('**wikipedia.org/api/rest_v1/page/summary/**', (route) => route.fulfill({
  status: 200,
  contentType: 'application/json; charset=utf-8',
  body: JSON.stringify({
    title: 'Koekuva',
    extract: 'K'.repeat(220),
    // Tiedostonimi ei saa osua BAD_IMAGE-suodattimeen (logo, icon, …).
    thumbnail: { source: 'http://127.0.0.1:8734/assets/kohtaamiset/kohtaaminen-ateena.jpg' },
    content_urls: { desktop: { page: 'https://fi.wikipedia.org/wiki/Koekuva' } },
  }),
}));
/*
 * KUVA MATKALLA -IKKUNA (omistaja 19.8.2026: "älä piirrä sille
 * etukäteen paikkaa"). Viivästetään koekuvan tavut kahdella
 * sekunnilla, jotta vastausteksti ehtii valmistua kuvan ollessa
 * vielä matkalla. Juuri siinä ikkunassa kuplassa EI saa olla
 * .pollo-vastauskuva-elementtiä — ei tyhjää kehystä, ei paikanpitäjää.
 */
await sivu.route('**/assets/kohtaamiset/kohtaaminen-ateena.jpg', async (route) => {
  await new Promise((r) => setTimeout(r, 2000));
  await route.continue();
});
const pikkukuvaWiki = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  if (document.querySelector('.pollo-paneeli').hidden) {
    document.querySelector('.pollo-nappi').click();
    await odota(600);
  }
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  // "varapolku": vastauksessa ei ole pelin indeksin sanoja eikä kuvaa.
  document.querySelector('.pollo-kentta').value = 'Kerro varapolku höpöhöpö kummallisuudesta';
  const kuplia = document.querySelectorAll('.pollo-pollo').length;
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  /*
   * KUVALLE EI SAA VARATA PAIKKAA ETUKÄTEEN (omistaja 19.8.2026).
   * Odotetaan uusi vastauskupla ja seurataan sitä koko sen ajan, kun
   * koekuva on viivästettynä matkalla: siinä ikkunassa kuplassa ei saa
   * olla yhtään .pollo-vastauskuva-elementtiä. Vanhoja kuplia ei
   * lasketa — niillä on jo omat kuvansa.
   */
  let vastaus = null;
  for (let kierros = 0; kierros < 40 && !vastaus; kierros += 1) {
    const kaikki = document.querySelectorAll('.pollo-pollo');
    if (kaikki.length > kuplia) vastaus = kaikki[kaikki.length - 1];
    else await odota(100);
  }
  if (!vastaus) return { loytyi: false, varattuKesken: null };
  // Teksti valmistuu ~1 s:ssä, kuva vasta 2 s:n kuluttua: mitataan
  // väliltä, ettei kupla varaa kuvalle tilaa etukäteen.
  let varattuKesken = 0;
  for (let kierros = 0; kierros < 12; kierros += 1) {
    await odota(120);
    varattuKesken = Math.max(varattuKesken,
      vastaus.querySelectorAll('.pollo-vastauskuva').length);
    if (vastaus.querySelector('img')) break;
  }
  let nappi = null;
  for (let kierros = 0; kierros < 40 && !nappi; kierros += 1) {
    nappi = vastaus.querySelector('.pollo-vastauskuva');
    if (!nappi) await odota(150);
  }
  if (!nappi) return { loytyi: false, varattuKesken };
  nappi.click();
  await odota(500);
  const popup = document.querySelector('.pollo-kuvatausta');
  const tulos = {
    loytyi: true,
    varattuKesken,
    isoAuki: Boolean(popup),
    lahde: popup?.querySelector('.pollo-kuvalahde')?.textContent ?? '',
    linkki: popup?.querySelector('.pollo-kuvalahde')?.getAttribute('href') ?? '',
  };
  // Napautus kortin ulkopuolelle sulkee ison kuvan.
  popup?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  popup?.click();
  await odota(300);
  tulos.sulkeutui = !document.querySelector('.pollo-kuvatausta');
  return tulos;
});
vaadi('Wikipedian pikkukuva ilmestyy kuvattomaan vastaukseen',
  pikkukuvaWiki.loytyi === true, JSON.stringify(pikkukuvaWiki));
vaadi('kuvalle ei varata paikkaa etukäteen (omistaja 19.8.2026)',
  pikkukuvaWiki.varattuKesken === 0, JSON.stringify(pikkukuvaWiki));
vaadi('napautus avaa ison kuvan Wikipedia-lähdelinkillä',
  pikkukuvaWiki.isoAuki === true && /Wikipedia/.test(pikkukuvaWiki.lahde)
  && /wikipedia\.org/.test(pikkukuvaWiki.linkki), JSON.stringify(pikkukuvaWiki));
vaadi('napautus ulkopuolelle sulkee ison kuvan', pikkukuvaWiki.sulkeutui === true,
  JSON.stringify(pikkukuvaWiki));
await sivu.screenshot({ path: join(ULOS, 'pollo-vastauskuva-390.png') });
await sivu.unroute('**wikipedia.org/api/rest_v1/page/summary/**');
await sivu.unroute(/Special:FilePath/);

/* Leveä ruutu: samat kaappaukset 900 pikselillä. */
const leveaCtx = await selain.newContext({ viewport: { width: 900, height: 900 }, serviceWorkers: 'block' });
const { sivu: leveaSivu } = await avaaPeli(leveaCtx);
await kytkeRajapinta(leveaSivu, []);
const leveaNapit = await leveaSivu.evaluate(async () => {
  // LIIKU odottaa aarretta (25.8.2026) — sama laatankääntö kuin
  // kapean ruudun liukukokeessa yllä.
  const ui = window.matkakirja.ui;
  const city = ui.game.cityOf?.();
  if (city && ui.game.tokens?.has(city.id)) {
    ui.game.tokens.delete(city.id);
    ui.render();
    await new Promise((r) => setTimeout(r, 300));
  }
  document.querySelector('.monitoimi-nappi').click();
  await new Promise((r) => setTimeout(r, 350));
  return [...document.querySelectorAll('.toimintorivi-liuku button')]
    .map((b) => Math.round(b.getBoundingClientRect().width));
});
vaadi('liu\'un napit eivät ahtaudu 900 pikselissä',
  leveaNapit.length === 3 && leveaNapit.every((w) => w >= 44), leveaNapit.join(' / '));
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-rivi-auki-900.png') });

// Suodatettu laivavalikko myös leveällä ruudulla.
await leveaSivu.evaluate(async () => {
  const nappi = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .find((b) => /^Laivalla/.test(b.getAttribute('aria-label') ?? ''));
  if (nappi && !nappi.disabled) nappi.click();
  await new Promise((r) => setTimeout(r, 500));
});
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-laivavalikko-900.png') });

await leveaSivu.evaluate(async () => {
  window.matkakirja.ui.suljeMatkavalikko();
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 250));
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 800));
});
await leveaSivu.screenshot({ path: join(ULOS, 'pollo-paneeli-900.png') });
await leveaCtx.close();

/* ================================================================== */
/* 8) Ilman puheentunnistusta: kirjoituskenttä suoraan esillä           */
/* ================================================================== */

const ilmanCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: ilmanSivu, virheet: ilmanVirheet } = await avaaPeli(ilmanCtx, { sanelu: false });
await kytkeRajapinta(ilmanSivu, []);
const ilmanSanelua = await ilmanSivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 700));
  return {
    // Rivi jää esiin kaiuttimen takia: laite osaa lukea, vaikkei sanella.
    riviNakyy: !document.querySelector('.pollo-sanelu').hidden,
    kenttaNakyy: !document.querySelector('.pollo-rivi').hidden,
    mikkiaEiNayteta: document.querySelector('.pollo-mikki').offsetParent === null,
    kaiutinNakyy: document.querySelector('.pollo-kaiutin').offsetParent !== null,
    kaiuttimenOsuus: document.querySelector('.pollo-kaiutin').getBoundingClientRect().width
      / document.querySelector('.pollo-sanelu').getBoundingClientRect().width,
  };
});
vaadi('ilman puheentunnistusta kenttä on suoraan esillä',
  ilmanSanelua.kenttaNakyy === true, JSON.stringify(ilmanSanelua));
vaadi('ilman puheentunnistusta ei tarjota sanelua', ilmanSanelua.mikkiaEiNayteta === true);
vaadi('kaiutin jää riville, vaikka mikrofonia ei ole',
  ilmanSanelua.riviNakyy === true && ilmanSanelua.kaiutinNakyy === true,
  JSON.stringify(ilmanSanelua));
vaadi('jäljelle jäävät napit jakavat rivin (ei tyhjää saraketta)',
  ilmanSanelua.kaiuttimenOsuus > 0.4, ilmanSanelua.kaiuttimenOsuus.toFixed(2));
vaadi('ei konsolivirheitä ilman puheentunnistusta', ilmanVirheet.length === 0,
  ilmanVirheet.join(' | '));
await ilmanSivu.screenshot({ path: join(ULOS, 'pollo-ilman-sanelua-390.png') });
await ilmanCtx.close();

/* ================================================================== */
/* 9) Ilman asetettua osoitetta: "Pöllö ei ole vielä hereillä"          */
/* ================================================================== */

polloPaalla = false;
const nukkuvaCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: nukkuvaSivu, virheet: nukkuvaVirheet } = await avaaPeli(nukkuvaCtx);
const nukkuu = await nukkuvaSivu.evaluate(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  return {
    nappiNakyy: !document.querySelector('.pollo-nappi').hidden,
    teksti: document.querySelector('.pollo-nukkuu-otsikko')?.textContent ?? '',
    syotePiilossa: document.querySelector('.pollo-syote').hidden,
  };
});
vaadi('pöllönappi näkyy silti', nukkuu.nappiNakyy === true);
vaadi('napautus näyttää hereillä-tilan', /ei ole vielä hereillä/.test(nukkuu.teksti), nukkuu.teksti);
vaadi('syöttöalue on piilossa nukkuvana', nukkuu.syotePiilossa === true);
vaadi('hereillä-tila ei kirjoita konsoliin', nukkuvaVirheet.length === 0,
  nukkuvaVirheet.join(' | '));
await nukkuvaSivu.screenshot({ path: join(ULOS, 'pollo-ei-hereilla-390.png') });
await nukkuvaCtx.close();

/* ================================================================== */
/* 10) Sanelu natiivisillan kautta (iOS-kuori)                         */
/* ================================================================== */

/*
 * TÄMÄ ON KOKO NATIIVISANELUN VARTIOTESTI.
 *
 * WKWebView ei tarjoa SpeechRecognitionia, joten iOS-kuoressa pöllön
 * mikrofoni toimii vain jos peli osaa käyttää siltaa. Vika ei näkyisi
 * selaimessa mitenkään — siellä SpeechRecognition on olemassa ja
 * kaikki näyttää toimivan. Siksi ajo tehdään molemmilla tavoilla:
 * sillan kanssa sillan pitää olla se, jota kutsutaan, ja ilman siltaa
 * SpeechRecognitionin (osio 7 yllä).
 *
 * Chromiumissa on oma webkitSpeechRecognition, joten mock jätetään
 * paikalleen tarkoituksella: jos peli valitsisi sen sillan sijaan,
 * __saneluAloituksia kasvaisi ja testi kaatuisi.
 */
polloPaalla = true;
const siltaCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: siltaSivu, virheet: siltaVirheet } = await avaaPeli(siltaCtx, { silta: true });
await kytkeRajapinta(siltaSivu, []);
const siltaTulos = await siltaSivu.evaluate(async () => {
  window.__saneluTeksti = 'Mitä Thamesilla kuljetettiin';
  window.matkakirjaPollo.historia = [];
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 600));
  const mikki = document.querySelector('.pollo-mikki');
  const nakyy = !document.querySelector('.pollo-sanelu').hidden;
  mikki.click();
  // Vale-silta lähettää osittaisen tuloksen vasta 150 ms:n päästä, joten
  // tässä välissä sanelu on varmasti vielä kesken.
  await new Promise((r) => setTimeout(r, 90));
  const kuunteleeKesken = mikki.classList.contains('kuuntelee');
  await new Promise((r) => setTimeout(r, 1200));
  return {
    nakyy,
    kuunteleeKesken,
    kutsut: window.matkakirjaNatiivi.__kutsut.slice(),
    selainSanelua: window.__saneluAloituksia,
    lepaa: !mikki.classList.contains('kuuntelee'),
    viestit: [...document.querySelectorAll('.pollo-viesti')].map((v) => v.textContent),
  };
});
vaadi('sanelunappi näkyy myös natiivikuoressa', siltaTulos.nakyy === true);
vaadi('sanelu kysyy luvat sillalta', siltaTulos.kutsut.includes('sanelu.luvat'),
  siltaTulos.kutsut.join(' | '));
vaadi('sanelu käynnistetään sillalta', siltaTulos.kutsut.includes('sanelu.aloita'),
  siltaTulos.kutsut.join(' | '));
vaadi('SpeechRecognitionia ei käytetä kun silta on paikalla',
  siltaTulos.selainSanelua === 0, String(siltaTulos.selainSanelua));
vaadi('mikki näyttää kuuntelevaa sanelun aikana', siltaTulos.kuunteleeKesken === true);
vaadi('mikki palaa lepoon kun sanelu valmistuu', siltaTulos.lepaa === true);
vaadi('sillan puhe päätyy kysymykseksi',
  siltaTulos.viestit.some((v) => /Mitä Thamesilla kuljetettiin/.test(v)),
  JSON.stringify(siltaTulos.viestit.slice(-3)));
vaadi('natiivisanelu ei kirjoita konsoliin', siltaVirheet.length === 0,
  siltaVirheet.join(' | '));
await siltaSivu.screenshot({ path: join(ULOS, 'pollo-natiivisanelu-390.png') });

/*
 * Sama sivu todistaa vielä lukijan: kaiutinnappi lukee lehden sivun
 * sillan kautta eikä selaimen puhesyntetisaattorilla.
 *
 * NAPIN PAIKKA EI OLE DIALOGIN SUORA LAPSI. liitaLukija luo napin
 * dialogiin, mutta lehti siirtää sen sivukohtaiseen tarttuvaan
 * otsikkoon (js/lehti.js sijoitaLehtiKaiutin: etusivulla #arrival-city,
 * muilla sivuilla .aihe-nimi), jotta kaiutin ei vieri tekstin mukana
 * pois ruudulta. Siksi valinta on koko dialogin puusta — suora-lapsi-
 * haku löysi napin vain ennen tuota siirtoa.
 */
const lukija = await siltaSivu.evaluate(async () => {
  window.matkakirjaPollo.sulje();
  const ui = window.matkakirja.ui;
  ui.openArrival(window.matkakirja.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
  ui.naytaTutkiSivu(1);
  await new Promise((r) => setTimeout(r, 400));
  const nappi = document.querySelector('#arrival-dialog .lukija-nappi');
  if (!nappi) return { onNappi: false };
  const piilossa = nappi.hidden;
  /*
   * Aiemmat osiot ovat jo lukeneet sillan kautta, joten sekä
   * __luettuTeksti että __kutsut on nollattava — muuten tämä mittaus
   * lukisi edellisen luennan jäljen ja menisi läpi vaikka nappi ei
   * tekisi mitään.
   */
  window.__luettuTeksti = '';
  window.matkakirjaNatiivi.__kutsut.length = 0;
  nappi.click();
  /*
   * Luenta yrittää ensin lukijaääntä (js/puhe.js): pyyntö menee
   * mockattuun rajapintaan, jonka vastaus ei ole ääntä, ja vasta
   * ensimmäisen palan virheen jälkeen luenta putoaa laitteen omalle
   * äänelle eli natiivisillalle (js/lukija.js aloitaPuheLuenta →
   * lueLaitteella). Odotus on siksi reilu: mitattava asia on
   * lopputulos, ei nopeus.
   */
  for (let i = 0; i < 40 && !window.__luettuTeksti; i += 1) {
    await new Promise((r) => setTimeout(r, 100));
  }
  const teksti = window.__luettuTeksti ?? '';
  return {
    onNappi: true,
    piilossa,
    lukee: nappi.classList.contains('lukee'),
    pituus: teksti.length,
    lahteita: /Kuva:|CC BY|Wikimedia/.test(teksti),
    kutsut: window.matkakirjaNatiivi.__kutsut.slice(),
  };
});
vaadi('lehtisivulla on kaiutinnappi', lukija.onNappi === true && lukija.piilossa === false,
  JSON.stringify(lukija));
vaadi('kaiutin lukee sivun natiivisillan kautta',
  (lukija.kutsut ?? []).includes('luenta.puhu'), (lukija.kutsut ?? []).join(' | '));
vaadi('luettavaa kertyi koko sivun verran', (lukija.pituus ?? 0) > 200, String(lukija.pituus));
vaadi('lähdemerkinnät eivät päädy luentaan', lukija.lahteita === false);
vaadi('nappi näyttää luennan olevan käynnissä', lukija.lukee === true);
await siltaCtx.close();

/* ================================================================== */
/* 11) Päivitysruutu                                                   */
/* ================================================================== */

/*
 * Päivityksen jälkeisen latauksen ajan ruudulla on tumma pohja, logo ja
 * yksi rivi tekstiä — ei tyhjiä kehyksiä. Lippu on sessionStoragessa
 * (js/main.js merkitsePaivitys), ja index.html:n pikkuskripti näyttää
 * ruudun heti ensimmäisellä maalauksella.
 *
 * js/main.js viivästetään puolellatoista sekunnilla, jotta ruutu ehtii
 * kaappaukseen: oikeassa käytössä sama tila kestää yhtä kauan kuin
 * pelin rakentuminen.
 */
const paivitysCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const paivitysSivu = await paivitysCtx.newPage();
await paivitysSivu.addInitScript("try { sessionStorage.setItem('matkakirja-paivittyy', '1'); } catch (e) {}");
await paivitysSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
/*
 * js/main.js korvataan tyhjällä: näin sivu latautuu loppuun mutta peli
 * ei rakennu, eli ruudulla on täsmälleen se tila, joka päivityksen
 * aikana näkyy. Viivästäminen ei kelpaa — Playwrightin screenshot
 * odottaa sivun latautumista, joten kaappaus osuisi aina vasta pelin
 * käynnistymisen jälkeen.
 */
await paivitysSivu.route(/js\/main\.js$/, (route) => route.fulfill({
  status: 200, contentType: 'text/javascript', body: '',
}));
await paivitysSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await paivitysSivu.waitForTimeout(300);
await paivitysSivu.screenshot({ path: join(ULOS, 'paivitysruutu-390.png') });
const paivitysruutu = await paivitysSivu.evaluate(() => {
  const ruutu = document.getElementById('paivitysruutu');
  const cs = getComputedStyle(ruutu);
  const luminanssi = (vari) => {
    const [r, g, b] = vari.match(/[\d.]+/g).slice(0, 3).map(Number);
    const k = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b);
  };
  return {
    nakyy: !ruutu.hidden && cs.display !== 'none',
    peittaa: ruutu.getBoundingClientRect().height >= window.innerHeight - 1,
    tumma: luminanssi(cs.backgroundColor) < 0.05,
    logo: Boolean(ruutu.querySelector('img')),
    teksti: ruutu.querySelector('.paivitysruutu-teksti')?.textContent ?? '',
    peliPiilossa: getComputedStyle(document.querySelector('.app')).visibility === 'hidden',
  };
});
vaadi('päivitysruutu näkyy latauksen ajan', paivitysruutu.nakyy === true,
  JSON.stringify(paivitysruutu));
vaadi('päivitysruutu peittää koko ruudun tummana', paivitysruutu.peittaa === true
  && paivitysruutu.tumma === true, JSON.stringify(paivitysruutu));
vaadi('päivitysruudussa on logo ja odotusteksti', paivitysruutu.logo === true
  && /Päivitetään, odota hetki/.test(paivitysruutu.teksti), paivitysruutu.teksti);
vaadi('rakentumaton peli ei näy ruudun alta', paivitysruutu.peliPiilossa === true);
await paivitysCtx.close();

/*
 * Sama lippu oikealla latauksella: kun peli on rakennettu, ruudun on
 * väistyttävä ja lipun siivouduttava — muuten ruutu jäisi päälle myös
 * seuraavalla avauksella.
 */
const paivitysLoppuCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const paivitysLoppuSivu = await paivitysLoppuCtx.newPage();
await paivitysLoppuSivu.addInitScript("try { sessionStorage.setItem('matkakirja-paivittyy', '1'); } catch (e) {}");
await paivitysLoppuSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await paivitysLoppuSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await paivitysLoppuSivu.waitForTimeout(2500);
const paivitysLoppu = await paivitysLoppuSivu.evaluate(() => ({
  ruutuPiilossa: document.getElementById('paivitysruutu').hidden,
  luokkaPois: !document.body.classList.contains('paivittyy'),
  lippuPois: (() => {
    try { return sessionStorage.getItem('matkakirja-paivittyy') === null; } catch { return true; }
  })(),
  peliNakyy: getComputedStyle(document.querySelector('.app')).visibility !== 'hidden',
}));
vaadi('päivitysruutu väistyy kun peli on rakennettu',
  paivitysLoppu.ruutuPiilossa === true && paivitysLoppu.luokkaPois === true
  && paivitysLoppu.peliNakyy === true, JSON.stringify(paivitysLoppu));
vaadi('päivityslippu siivotaan latauksen jälkeen', paivitysLoppu.lippuPois === true);
await paivitysLoppuCtx.close();

/*
 * KYLMÄKÄYNNISTYS: sama ruutu ilman päivityslippua, ja se väistyy vasta
 * kun peli on rakennettu.
 *
 * Omistajan havainto 13.8.2026 (iPhone): natiivikuoren "Avataan
 * matkakirjaa…" väistyi, ja sen JÄLKEEN vilahti vielä pelin
 * rakentumaton runko. Ruutu näytettiin vain päivityslatauksessa, ja
 * silloinkin se piilotettiin samassa synkronisessa lohkossa, jossa peli
 * rakennettiin — eli ennen ensimmäistä maalausta.
 *
 * Jälki kerätään ennen sivun skriptejä: joka kerta kun ruudun hidden
 * tai class muuttuu, kirjataan mitä ruudun alla sillä hetkellä on.
 * Näin nähdään SE hetki, jona ruutu alkaa väistyä, eikä vain
 * lopputulos.
 */
const LATAUSJALKI = `
window.__latausJalki = [];
(function () {
  var seurattu = null;
  function kirjaa(ruutu) {
    var app = document.querySelector('.app');
    window.__latausJalki.push({
      piilossa: ruutu.hidden,
      haipyy: ruutu.classList.contains('latausruutu-haipyy'),
      peli: Boolean(window.matkakirja),
      kartta: Boolean(document.querySelector('.map-pane svg')),
      appNakyy: Boolean(app) && getComputedStyle(app).visibility !== 'hidden',
    });
  }
  function tartu() {
    var ruutu = document.getElementById('paivitysruutu');
    if (!ruutu) return false;
    if (seurattu === ruutu) return true;
    seurattu = ruutu;
    new MutationObserver(function () { kirjaa(ruutu); }).observe(ruutu, {
      attributes: true, attributeFilter: ['hidden', 'class'],
    });
    kirjaa(ruutu);
    return true;
  }
  /*
   * Elementtiin tartutaan sillä hetkellä kun se ilmestyy jäsennykseen.
   * Ennen tässä oli requestAnimationFrame-kysely, ja kuormitetulla
   * koneella se ehti myöhästyä: ruutu oli jo piilotettu, jälki alkoi
   * väärästä hetkestä ja ajo hälytti turhaan (ajoittainen väärä
   * hälytys 13.8.2026). Dokumenttitason vahti ei voi myöhästyä, koska
   * se herää samasta lisäyksestä.
   */
  if (!tartu()) {
    var vahti = new MutationObserver(function () { if (tartu()) vahti.disconnect(); });
    vahti.observe(document, { childList: true, subtree: true });
  }
}());
`;

/*
 * Ensin itse ruutu ilman päivityslippua. js/main.js korvataan tyhjällä
 * samalla tavalla kuin päivitysruudun kaappauksessa yllä: paikallinen
 * palvelin rakentaa pelin muuten nopeammin kuin kaappaus ehtii, ja
 * mitattavana on nimenomaan se tila, jonka pelaaja näkee ennen kuin
 * moduuli on ajettu.
 */
const kylmaKaappausCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const kylmaKaappausSivu = await kylmaKaappausCtx.newPage();
await kylmaKaappausSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await kylmaKaappausSivu.route(/js\/main\.js$/, (route) => route.fulfill({
  status: 200, contentType: 'text/javascript', body: '',
}));
await kylmaKaappausSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await kylmaKaappausSivu.waitForTimeout(300);
await kylmaKaappausSivu.screenshot({ path: join(ULOS, 'latausruutu-kylma-390.png') });
const kylmaKesken = await kylmaKaappausSivu.evaluate(() => ({
  ruutuNakyy: !document.getElementById('paivitysruutu').hidden,
  peliPiilossa: getComputedStyle(document.querySelector('.app')).visibility === 'hidden',
  teksti: document.querySelector('.paivitysruutu-teksti')?.textContent ?? '',
}));
vaadi('kylmäkäynnistyksessä ruutu peittää rakentumattoman rungon',
  kylmaKesken.ruutuNakyy === true && kylmaKesken.peliPiilossa === true,
  JSON.stringify(kylmaKesken));
vaadi('teksti on sama kuin natiivikuoren latausnäkymässä',
  /Avataan matkakirjaa/.test(kylmaKesken.teksti), kylmaKesken.teksti);
await kylmaKaappausCtx.close();

// Sitten oikea lataus: milloin ruutu väistyy ja mitä sen alla on.
const kylmaCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const kylmaSivu = await kylmaCtx.newPage();
await kylmaSivu.addInitScript(LATAUSJALKI);
await kylmaSivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await kylmaSivu.goto('http://127.0.0.1:8734/index.html', { waitUntil: 'load' });
await kylmaSivu.waitForTimeout(3500);
const kylma = await kylmaSivu.evaluate(() => ({
  jalki: window.__latausJalki,
  ruutuPiilossa: document.getElementById('paivitysruutu').hidden,
  peliNakyy: getComputedStyle(document.querySelector('.app')).visibility !== 'hidden',
  kartta: Boolean(document.querySelector('.map-pane svg')),
}));
/*
 * Jälki alkaa nyt sivun omasta lähtötilasta: index.html:ssä ruutu on
 * `hidden`, ja sivun oma inline-skripti näyttää sen. Ensimmäinen
 * kirjaus on siis "vielä piilossa", eikä se ole se hetki, jota tässä
 * mitataan — haettava kohta on ensimmäinen kirjaus, jossa ruutu on
 * NÄKYVISSÄ, ja väistyminen vasta sen jälkeen. Näin mittaus ei riipu
 * siitä, minä hetkenä vahti ehti kiinnittyä.
 */
const alkuKohta = kylma.jalki.findIndex((v) => v.piilossa === false);
const alku = kylma.jalki[alkuKohta] ?? {};
// Ensimmäinen kirjaus näkymisen JÄLKEEN, jossa ruutu alkaa väistyä.
const vaistyy = kylma.jalki.slice(alkuKohta + 1).find((v) => v.haipyy || v.piilossa) ?? {};
vaadi('latausruutu näkyy myös ilman päivityslippua',
  alku.piilossa === false && alku.peli === false && alku.appNakyy === false,
  JSON.stringify(alku));
vaadi('latausruutu väistyy vasta kun pelinäkymä on rakennettu',
  vaistyy.peli === true && vaistyy.kartta === true && vaistyy.appNakyy === true,
  JSON.stringify(vaistyy));
vaadi('latausruutu väistyy häivyttäen eikä nytkähtäen', vaistyy.haipyy === true,
  JSON.stringify(vaistyy));
vaadi('latausruutu on lopulta poissa ja peli näkyvissä',
  kylma.ruutuPiilossa === true && kylma.peliNakyy === true && kylma.kartta === true,
  JSON.stringify({ ruutuPiilossa: kylma.ruutuPiilossa, peliNakyy: kylma.peliNakyy }));
await kylmaSivu.screenshot({ path: join(ULOS, 'latausruutu-jalkeen-390.png') });
await kylmaCtx.close();

/* ================================================================== */
/* 12) Näkymän elvytys taustalta palatessa                             */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026 (iPad, TestFlight): sama maalehti oli
 * ensin leveä ja monipalstainen, ja toisessa apissa käynnin jälkeen se
 * avautui kapeana yksipalstaisena. WKWebView ilmoittaa taustalta
 * palatessa hetkeksi väärän näkymäkoon, ja jos asettelu lasketaan
 * silloin, lehti jää puhelinlevyiseksi.
 *
 * Tässä sama tilanne rakennetaan käsin: lehti auki leveällä ruudulla,
 * näkymä kutistuu dokumentin ollessa piilossa, ja palaa sitten
 * esiin oikean kokoisena. Arkin pitää olla taas leveä ilman että
 * pelaaja sulkee ja avaa lehden.
 */
const elvytysCtx = await selain.newContext({ viewport: { width: 900, height: 900 }, serviceWorkers: 'block' });
const { sivu: elvytysSivu, virheet: elvytysVirheet } = await avaaPeli(elvytysCtx);
await kytkeRajapinta(elvytysSivu, []);
await elvytysSivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 900));
});
const arkinLeveys = () => elvytysSivu.evaluate(() => Math.round(
  document.querySelector('#arrival-dialog .dialog-card').getBoundingClientRect().width,
));
const leveaEnnen = await arkinLeveys();

// Dokumentti "piiloon" ja näkymä kapeaksi: tällä mitalla ei saa sivuttaa.
await elvytysSivu.evaluate(() => {
  Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
  Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
  document.dispatchEvent(new Event('visibilitychange'));
});
await elvytysSivu.setViewportSize({ width: 320, height: 900 });
await elvytysSivu.waitForTimeout(400);
const piilossa = await elvytysSivu.evaluate(() => ({
  epavarma: window.matkakirja.ui.nakymaEpavarma === true,
  elvytyksia: window.matkakirja.ui.nakymaElvytyksia,
  muistettuLeveys: window.matkakirja.ui.nakymanLeveys,
}));
vaadi('piilossa kutistunut näkymä ei laukaise sivutusta',
  piilossa.epavarma === true && piilossa.elvytyksia === 0 && piilossa.muistettuLeveys >= 700,
  JSON.stringify(piilossa));

// Näkymä palaa esiin oikean kokoisena.
await elvytysSivu.setViewportSize({ width: 900, height: 900 });
await elvytysSivu.evaluate(() => {
  Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
  Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
  document.dispatchEvent(new Event('visibilitychange'));
});
await elvytysSivu.waitForTimeout(700);
const leveaJalkeen = await arkinLeveys();
const elvytys = await elvytysSivu.evaluate(() => ({
  elvytyksia: window.matkakirja.ui.nakymaElvytyksia,
  lehtiAuki: document.getElementById('arrival-dialog').open,
}));
vaadi('arkki palaa leveäksi ilman lehden sulkemista',
  leveaJalkeen >= leveaEnnen - 2 && elvytys.lehtiAuki === true,
  `${leveaEnnen} → ${leveaJalkeen} px`);
vaadi('elvytys ajettiin kerran, kun koko palautui', elvytys.elvytyksia >= 1,
  String(elvytys.elvytyksia));
vaadi('näkymän elvytys ei kirjoita konsoliin', elvytysVirheet.length === 0,
  elvytysVirheet.join(' | '));
await elvytysCtx.close();

/* ================================================================== */
/* 13) Kartan sumennus ja alanappirivin leveys                         */
/* ================================================================== */

/*
 * OMISTAJAN HAVAINTO 13.8.2026 (iPhone ja työpöytä): kartta oli
 * kauttaaltaan sumea, vaikka yhtään ikkunaa ei ollut auki, ja
 * alanappirivin kolme nappia venyivät lähes ruudun levyisiksi.
 *
 * Sumeus on kahden lajin asia, ja molemmat tarkistetaan tässä:
 *
 *   a) SUMENNUSKERROS. Ainoa koko kartan peittävä sumennus on lennon
 *      kalvo (.flight-overlay), ja se on sidottu css:ssä lennon
 *      todelliseen tilaan — kun mitään ei ole auki, ruudulla ei saa
 *      olla yhtään sumentavaa kerrosta. Dialogin oma huntu (::backdrop)
 *      sen sijaan sumentaa avattaessa ja katoaa suljettaessa.
 *   b) RASTEROINNIN TARKKUUS. Kartta piirretään bittikartaksi sillä
 *      mittakaavalla, joka näkymällä oli rasterointihetkellä. Jos
 *      mittakaava ehtii muuttua (mount rasteroi ennen kuin
 *      ResizeObserverin toinen fitViewBox asettaa lopullisen koon),
 *      kuva venyy — juuri se näkyi omistajalle sumeana karttana
 *      jokaisen latauksen jälkeen. js/ui.js tarkistaTarkkuus korjaa
 *      sen, ja tässä mitataan lopputulos.
 */

/** Näkyvät, riittävän isot sumentavat kerrokset ruudulla. */
const SUMENNUSKERROKSET = `(() => {
  const osumat = [];
  for (const el of document.querySelectorAll('*')) {
    const s = getComputedStyle(el);
    const bf = s.backdropFilter || s.webkitBackdropFilter || '';
    const sumea = (bf && bf !== 'none' && /blur/.test(bf))
      || (s.filter && s.filter !== 'none' && /blur/.test(s.filter));
    if (!sumea) continue;
    if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 200 || r.height < 200) continue;
    osumat.push(el.className || el.tagName);
  }
  return osumat;
})()`;

const sumennusCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: sumennusSivu, virheet: sumennusVirheet } = await avaaPeli(sumennusCtx);

const suljettuna = await sumennusSivu.evaluate(`({
  kerrokset: ${SUMENNUSKERROKSET},
  dialogeja: document.querySelectorAll('dialog[open]').length,
})`);
vaadi('kartalla ei ole sumennusta kun mikään ei ole auki',
  suljettuna.kerrokset.length === 0 && suljettuna.dialogeja === 0,
  suljettuna.kerrokset.join(' | '));

// Dialogi: avaus sumentaa taustan, sulku poistaa sumennuksen.
const dialoginSumennus = await sumennusSivu.evaluate(`(async () => {
  const d = document.getElementById('nahtavyys-dialog');
  d.showModal();
  await new Promise((r) => setTimeout(r, 250));
  const huntu = getComputedStyle(d, '::backdrop');
  const auki = huntu.backdropFilter || huntu.webkitBackdropFilter || '';
  d.close();
  await new Promise((r) => setTimeout(r, 250));
  return { auki, kiinniKerroksia: ${SUMENNUSKERROKSET}.length,
    dialogejaAuki: document.querySelectorAll('dialog[open]').length };
})()`);
vaadi('dialogin avaus sumentaa kartan', /blur/.test(dialoginSumennus.auki),
  dialoginSumennus.auki || '(ei sumennusta)');
vaadi('dialogin sulku poistaa sumennuksen',
  dialoginSumennus.kiinniKerroksia === 0 && dialoginSumennus.dialogejaAuki === 0,
  JSON.stringify(dialoginSumennus));

// Pöllöpaneeli on dialogi vain roolinsa puolesta: se ei sumenna karttaa
// avattunakaan, eikä siis voi jättää sumennusta jälkeensä.
const polloSumennus = await sumennusSivu.evaluate(`(async () => {
  document.querySelector('.pollo-nappi').click();
  await new Promise((r) => setTimeout(r, 250));
  const auki = { nakyy: !document.querySelector('.pollo-paneeli').hidden,
    kerroksia: ${SUMENNUSKERROKSET}.length };
  document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 250));
  return { auki, kiinni: { piilossa: document.querySelector('.pollo-paneeli').hidden,
    kerroksia: ${SUMENNUSKERROKSET}.length } };
})()`);
vaadi('pöllöpaneeli aukeaa eikä sumenna karttaa',
  polloSumennus.auki.nakyy === true && polloSumennus.auki.kerroksia === 0,
  JSON.stringify(polloSumennus.auki));
vaadi('pöllöpaneelin sulku ei jätä sumennusta',
  polloSumennus.kiinni.piilossa === true && polloSumennus.kiinni.kerroksia === 0,
  JSON.stringify(polloSumennus.kiinni));

/*
 * ALANAPPIRIVI EI VIE KOKO LEVEYTTÄ (omistajan toive 13.8.2026).
 * Rivi kavennetaan puhelimella, ja liuku on rivin lapsi, joten
 * matkanappien on yhä osuttava täsmälleen peruspaikkojen päälle.
 */
const rivinLeveys = await sumennusSivu.evaluate(() => {
  const rivi = document.querySelector('.toimintorivi');
  const perus = document.querySelector('.toimintorivi-perus');
  const liuku = document.querySelector('.toimintorivi-liuku');
  const r = rivi.getBoundingClientRect();
  return {
    ruutu: window.innerWidth,
    rivi: Math.round(r.width),
    // Kolme paikkaa, ei paikkojen sisältöä: pöllön paneeli asuu
    // keskimmäisessä paikassa eikä ole rivin nappi.
    napit: [...perus.children].map((b) => Math.round(b.getBoundingClientRect().width)),
    keskitetty: Math.abs((r.left + r.right) / 2 - window.innerWidth / 2) < 2,
    liukuSamalla: Math.abs(liuku.getBoundingClientRect().width - r.width) < 2,
  };
});
vaadi('alanappirivi on kapea puhelimella', rivinLeveys.rivi <= rivinLeveys.ruutu * 0.7,
  `${rivinLeveys.rivi} / ${rivinLeveys.ruutu} px`);
vaadi('alanappirivi on keskitetty', rivinLeveys.keskitetty === true, JSON.stringify(rivinLeveys));
vaadi('alanapit ovat yhä sormen mittaisia', rivinLeveys.napit.every((w) => w >= 44),
  rivinLeveys.napit.join(' / '));
vaadi('liuku seuraa kavennettua riviä', rivinLeveys.liukuSamalla === true,
  JSON.stringify(rivinLeveys));
await sumennusSivu.screenshot({ path: join(ULOS, 'alanapit-kapeat-390.png') });

/*
 * LADATTU PELI: kartta ei jää sumeaksi ja pöllö on oikeassa paikassa.
 *
 * Kesken jäänyt peli palautetaan ennen kuin pöllö asennetaan, ja ennen
 * omistajan 24.8.2026 linjausta se tarkoitti napin jäämistä väärään
 * kohtaan ruutua (korjautui vasta kaupunginvaihdossa). Nyt kellunta on
 * oikea lopputulos kaikissa tiloissa, ja tarkistettava asia on se, että
 * nappi saa myös PELINÄKYMÄN sijainnin (.pollo-kelluu-kartalla) eikä
 * jää lehtinäkymän kulmaan alanappien päälle.
 * Samalla latauksella mitataan rasteroinnin tarkkuus.
 */
await sumennusSivu.evaluate(() => {
  localStorage.setItem('matkakirja-save-v1', JSON.stringify(window.matkakirja.game.toJSON()));
  localStorage.setItem('matkakirja-nahty-versio', 'vanha');
  try { sessionStorage.setItem('matkakirja-paivittyy', '1'); } catch { /* ei ruutua */ }
});
await sumennusSivu.reload({ waitUntil: 'load' });
await sumennusSivu.waitForTimeout(3000);
const palautettu = await sumennusSivu.evaluate(`(() => {
  const ui = window.matkakirja?.ui;
  const nakyva = ui?.nakyvaAlue?.();
  const nappi = document.querySelector('.pollo-nappi');
  return {
    kerroksia: ${SUMENNUSKERROKSET}.length,
    kartalla: nappi?.classList.contains('pollo-kelluu-kartalla') ?? false,
    kelluu: nappi?.classList.contains('pollo-kelluu') ?? null,
    suhde: nakyva && ui?.taideSkaala ? nakyva.skaala / ui.taideSkaala : null,
  };
})()`);
vaadi('päivityksen jälkeen kartalla ei ole sumennusta', palautettu.kerroksia === 0,
  JSON.stringify(palautettu));
vaadi('kartan bittikartta on näkymän tarkkuudessa',
  palautettu.suhde !== null && Math.abs(palautettu.suhde - 1) <= 0.02,
  String(palautettu.suhde));
vaadi('pöllönappi kelluu kartalla myös ladatussa pelissä',
  palautettu.kelluu === true && palautettu.kartalla === true, JSON.stringify(palautettu));
vaadi('sumennuskoe ei kirjoita konsoliin', sumennusVirheet.length === 0,
  sumennusVirheet.slice(0, 3).join(' | '));
await sumennusCtx.close();

/* ================================================================== */
/* 21) Suoratoisto: teksti kirjoittuu, näkymä pysyy paikallaan          */
/* ================================================================== */

/*
 * OMISTAJAN TILAUS 13.8.2026. Vastaus striimataan, mutta reunaehdot
 * ovat ehdottomia:
 *   a) näkymä ankkuroituu kysymykseen eikä rullaa itsestään —
 *      teksti kirjoittuu alas piiloon,
 *   b) JATKOT-lohko ei vilahda kertaakaan,
 *   c) [[merkinnät]] suodattuvat lennossa eivätkä näy koskaan,
 *   d) valmis vastaus saa lopulliset linkit ja jatkokysymykset,
 *   e) vastausteksti EI ole kursiivia missään vaiheessa,
 *   f) kirjoituskone naputtaa striimin ajan ja vaikenee sen päättyessä,
 *      jolloin soi rivinvaihtokello.
 *
 * Vastaus tulee savukkeen omalta palvelimelta oikeana SSE-virtana ja
 * kulkee workerin oman suodattimen läpi (rajat.js), joten tämä mittaa
 * samaa koodia, joka on tuotannossa. Yksi käsitemerkintä katkeaa
 * palarajalle täsmälleen kuten aidossa virrassa.
 */
polloOsoite = 'http://127.0.0.1:8734/pollo-striimi';
const striimiCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: striimiSivu, virheet: striimiVirheet } = await avaaPeli(striimiCtx);

/**
 * Vakoilee tehosteäänet: jokainen sfx.play kirjautuu nimineen,
 * aikaleimoineen ja voimakerroin talteen. Kääre asetetaan vasta pelin
 * latauduttua, koska SoundKit syntyy moduulin latautuessa (js/sound.js).
 *
 * VOIMA EROTTAA PÖLLÖN NAPUTUKSEN ETUSIVUN KIRJOITUSKONEESTA. Molemmat
 * soittavat samaa 'pen'-ääntä, ja avaustekstin kirjoittuminen voi jatkua
 * taustalla vielä kartallakin — ilman erottelua mittaus laski sen
 * lyönnit pöllön naputukseksi. Pöllö antaa aina oman kertoimensa
 * (js/pollo.js NAPUTUS_VOIMA), ui.js ei anna mitään.
 */
async function vakoileAanet(sivu) {
  await sivu.evaluate(() => {
    const sfx = window.matkakirja?.sfx;
    if (!sfx || sfx.__vakoiltu) return;
    sfx.__vakoiltu = true;
    window.__aanet = [];
    // Pöllön oma taustanaputus: 'pen' voimakertoimen kanssa.
    window.__naputukset = () => window.__aanet
      .filter((a) => a.nimi === 'pen' && a.voima != null);
    const alkuperainen = sfx.play.bind(sfx);
    sfx.play = (nimi, asetukset) => {
      window.__aanet.push({ nimi, hetki: performance.now(), voima: asetukset?.voima ?? null });
      return alkuperainen(nimi, asetukset);
    };
  });
}

await vakoileAanet(striimiSivu);

const striimi = await striimiSivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  window.__aanet.length = 0;
  document.querySelector('.pollo-nappi').click();
  await odota(700);
  // Pöllön huhuilu kuuluu paneelin avautuessa (omistajan tilaus).
  const huhuiluAvatessa = window.__aanet.filter((a) => a.nimi === 'owl').length;
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  const virta = document.querySelector('.pollo-virta');
  window.__aanet.length = 0;
  document.querySelector('.pollo-kentta').value = 'Kerro Thamesin satamasta';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));

  // Naputus ja kursiivi mitataan KESKEN striimin, ei vasta lopussa.
  let naputuksiaKesken = 0;
  let kursiiviaKesken = false;

  let sulkeita = false;
  let jatkoja = false;
  let kasvuja = 0;
  let edellinen = -1;
  let pohjassa = 0;
  let mittauksia = 0;
  let suurinScroll = 0;
  /*
   * ANKKUROINNIN JÄLKEEN VIERITYSKOHTA EI MUUTU (omistajan tilaus,
   * osa 1). Ensimmäinen näyte otetaan heti kun vastauskupla on
   * syntynyt; sen jälkeen jokainen poikkeama siitä on ruudun hyppy.
   */
  let ankkuri = null;
  let poikkeamia = 0;
  let suurinPoikkeama = 0;
  for (let i = 0; i < 160; i += 1) {
    await odota(40);
    const kaikki = virta.textContent;
    if (/\[\[|\]\]/.test(kaikki)) sulkeita = true;
    if (/JATKOT/i.test(kaikki)) jatkoja = true;
    const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
    const pituus = vastaus?.textContent.length ?? 0;
    if (pituus > 0) {
      if (edellinen >= 0 && pituus > edellinen) kasvuja += 1;
      edellinen = pituus;
      // Striimattu ja valmis vastaus näyttävät samalta: kumpikaan ei ole
      // kursiivia (omistaja: "saisiko strimitekstin ilman kursiivia").
      if (getComputedStyle(vastaus).fontStyle !== 'normal') kursiiviaKesken = true;
      naputuksiaKesken = window.__naputukset().length;
      if (ankkuri === null) ankkuri = virta.scrollTop;
      const poikkeama = Math.abs(virta.scrollTop - ankkuri);
      if (poikkeama > 1) poikkeamia += 1;
      suurinPoikkeama = Math.max(suurinPoikkeama, poikkeama);
      suurinScroll = Math.max(suurinScroll, virta.scrollTop);
      /*
       * Pohjaan kelaaminen mitataan vasta kun kelattavaa on selvästi.
       * Aivan ensimmäisillä paloilla vastaus on vielä lyhyt, ja näkymä
       * on pohjassa siksi, että kysymys juuri lisättiin virtaan — se on
       * ankkurointi, ei tekstin perässä juoksemista.
       */
      const pohja = virta.scrollHeight - virta.clientHeight;
      if (pohja > 150) {
        mittauksia += 1;
        if (pohja - virta.scrollTop < 4) pohjassa += 1;
      }
    }
    if (document.querySelector('.pollo-jatkot')) break;
  }
  const kysymys = [...document.querySelectorAll('.pollo-kayttaja')].at(-1);
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  const v = virta.getBoundingClientRect();
  /*
   * Äänet vastauksen valmistuttua: naputus on loppunut ja kello soinut.
   * Odotetaan hetki, jotta mahdollinen jäljelle jäänyt ajastin ehtisi
   * paljastua — juuri sitä tässä mitataan.
   */
  const kelloHetki = window.__aanet.find((a) => a.nimi === 'typeBell')?.hetki ?? null;
  const naputuksiaKellonAikaan = window.__naputukset().length;
  await odota(700);
  const naputuksiaJalkeen = window.__naputukset().length;
  const viimeinenNaputus = window.__naputukset().at(-1)?.hetki ?? null;
  return {
    kasvuja,
    sulkeita,
    jatkoja,
    huhuiluAvatessa,
    kursiiviaKesken,
    naputuksiaKesken,
    naputuksiaKellonAikaan,
    naputuksiaJalkeen,
    // Positiivinen luku: naputus vaikeni ENNEN kelloa.
    kelloNaputuksenJalkeen: kelloHetki !== null && viimeinenNaputus !== null
      ? Math.round(kelloHetki - viimeinenNaputus) : null,
    kelloja: window.__aanet.filter((a) => a.nimi === 'typeBell').length,
    vastauksenKursiivi: getComputedStyle(vastaus).fontStyle,
    pohjassa,
    mittauksia,
    suurinScroll,
    poikkeamia,
    suurinPoikkeama,
    tyhjaaAlla: Number.parseFloat(getComputedStyle(virta).paddingBottom) || 0,
    kysymysYlhaalla: kysymys.getBoundingClientRect().top - v.top,
    vastauksenKorkeus: vastaus.getBoundingClientRect().height,
    virranKorkeus: v.height,
    scrollTop: virta.scrollTop,
    pohja: virta.scrollHeight - virta.clientHeight,
    kasitteita: vastaus.querySelectorAll('a.pollo-kasitelinkki').length,
    kasitteet: [...vastaus.querySelectorAll('a.pollo-kasitelinkki')].map((a) => a.textContent),
    kasite: vastaus.querySelector('a.pollo-kasitelinkki')?.textContent ?? '',
    jatkonappeja: document.querySelectorAll('.pollo-jatkot .pollo-jatko').length,
    loppuu: vastaus.textContent.slice(-40),
    virrassaSulkeita: /\[\[|\]\]/.test(virta.textContent),
  };
});
vaadi('vastaus kirjoittuu useassa palassa', striimi.kasvuja >= 3,
  `${striimi.kasvuja} kasvua`);
vaadi('koevastaus on paneelia korkeampi (muuten vieritystä ei mitata)',
  striimi.vastauksenKorkeus > striimi.virranKorkeus, JSON.stringify(striimi));
vaadi('striimi ei rullaa näkymää pohjaan', striimi.mittauksia > 3 && striimi.pohjassa === 0,
  `${striimi.pohjassa}/${striimi.mittauksia} näytettä pohjassa`);
vaadi('näkymä ei liiku ankkurin jälkeen',
  striimi.suurinScroll <= striimi.scrollTop + 2,
  `suurin ${striimi.suurinScroll}, lopussa ${striimi.scrollTop}`);
vaadi('vierityskohta pysyy täsmälleen paikallaan koko striimin ajan',
  striimi.poikkeamia === 0 && striimi.suurinPoikkeama <= 1,
  `${striimi.poikkeamia} poikkeamaa, suurin ${striimi.suurinPoikkeama} px`);
vaadi('näkymä ankkuroituu kysymykseen',
  striimi.kysymysYlhaalla >= -2 && striimi.kysymysYlhaalla <= 30,
  String(striimi.kysymysYlhaalla));
vaadi('teksti kirjoittuu alas piiloon (loppu jää näkymän alle)',
  striimi.pohja - striimi.scrollTop > 20, JSON.stringify(striimi));
vaadi('JATKOT-lohko ei vilahda ruudulla kertaakaan', striimi.jatkoja === false);
vaadi('hakasulkeet eivät vilahda striimin aikana',
  striimi.sulkeita === false && striimi.virrassaSulkeita === false);
vaadi('käsitemerkinnästä tulee pöllölinkki vasta valmiiseen vastaukseen',
  striimi.kasitteita === 2 && /hiililastit/.test(striimi.kasite), JSON.stringify(striimi));
/*
 * TÄMÄ ON SE AUKKO, JOKA PÄÄSTI v613:N LÄPI. Aiemmin koevirran ainoa
 * merkintä oli yksisanainen eikä osunut palarajalle, joten lopullinen
 * teksti olisi voitu rakentaa yhtä hyvin paloista — ja aidolla
 * laitteella juuri se jätti vastauksen linkittömäksi.
 */
vaadi('palarajalle katkennut merkintä linkittyy silti',
  striimi.kasitteet.some((t) => /Wolfgang Amadeus Mozart/.test(t)),
  JSON.stringify(striimi.kasitteet));
vaadi('jatkokysymykset tulevat lopputapahtumasta', striimi.jatkonappeja === 2,
  `${striimi.jatkonappeja} kpl`);
vaadi('vastausteksti ei ole kursiivia missään vaiheessa',
  striimi.kursiiviaKesken === false && striimi.vastauksenKursiivi === 'normal',
  JSON.stringify({ kesken: striimi.kursiiviaKesken, lopussa: striimi.vastauksenKursiivi }));
vaadi('pöllö huhuilee kerran, kun paneeli avataan',
  striimi.huhuiluAvatessa === 1, `${striimi.huhuiluAvatessa} kpl`);
vaadi('kirjoituskone naputtaa striimin ajan',
  striimi.naputuksiaKesken >= 3, `${striimi.naputuksiaKesken} lyöntiä`);
vaadi('naputus pysähtyy heti kun vastaus valmistuu',
  striimi.naputuksiaJalkeen === striimi.naputuksiaKellonAikaan,
  `${striimi.naputuksiaKellonAikaan} → ${striimi.naputuksiaJalkeen}`);
vaadi('rivinvaihtokello soi kerran, naputuksen jälkeen',
  striimi.kelloja === 1 && striimi.kelloNaputuksenJalkeen > 0,
  JSON.stringify({ kelloja: striimi.kelloja, ero: striimi.kelloNaputuksenJalkeen }));
vaadi('striimikoe ei kirjoita konsoliin', striimiVirheet.length === 0,
  striimiVirheet.slice(0, 3).join(' | '));

await striimiSivu.screenshot({ path: join(ULOS, 'pollo-striimi-390.png') });

/* ------------------------------------------------------------------ */
/* 21b) Lyhyt vastaus ei rullaa näkymää edellisen päälle               */
/* ------------------------------------------------------------------ */

/*
 * OMISTAJAN HAVAINTO 13.8.2026: *"kun vastaus on valmis ja tekstiin
 * päivittyy linkit, niin teksti saattaa vierittyä niin että yläreunassa
 * näkyykin vielä edellistä vastausta. — silloin pöllö voisi jättää
 * alareunaan vain tyhjää eikä rullata näkymää ylöspäin täyttääkseen
 * koko ruudun."*
 *
 * Sama sivu, toinen kysymys: nyt keskustelussa on jo edellinen vastaus,
 * jonka päälle näkymä voisi valua. Vastaus on kaksi virkettä eikä täytä
 * paneelia, joten varatun tyhjän on kannettava kysymys yläreunassa.
 */
const lyhyt = await striimiSivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const virta = document.querySelector('.pollo-virta');
  const edellinen = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  document.querySelector('.pollo-kentta').value = 'Kerro lyhyt vastaus metrosta';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));

  // Vierityskohta talteen heti kun vastauskupla on syntynyt.
  let ennenLoppua = null;
  for (let i = 0; i < 160; i += 1) {
    await odota(40);
    const uusi = [...document.querySelectorAll('.pollo-pollo')].at(-1);
    if (uusi !== edellinen && uusi.textContent.length > 0 && ennenLoppua === null) {
      ennenLoppua = virta.scrollTop;
    }
    if (document.querySelector('.pollo-jatkot')) break;
  }
  await odota(400);
  const kysymys = [...document.querySelectorAll('.pollo-kayttaja')].at(-1);
  const vastaus = [...document.querySelectorAll('.pollo-pollo')].at(-1);
  const v = virta.getBoundingClientRect();
  const e = edellinen.getBoundingClientRect();
  return {
    ennenLoppua,
    jalkeen: virta.scrollTop,
    kysymysYlhaalla: Math.round(kysymys.getBoundingClientRect().top - v.top),
    // Positiivinen: edellinen vastaus on kokonaan näkymän yläpuolella.
    edellinenYlapuolella: Math.round(v.top - e.bottom),
    tyhjaaAlla: Math.round(document.querySelector('.pollo-tyhja').getBoundingClientRect().height),
    vastauksenKorkeus: Math.round(vastaus.getBoundingClientRect().height),
    virranKorkeus: Math.round(v.height),
    kasitteita: vastaus.querySelectorAll('a.pollo-kasitelinkki').length,
    jatkonappeja: document.querySelectorAll('.pollo-jatkot .pollo-jatko').length,
  };
});
vaadi('koevastaus on paneelia lyhyempi (muuten mittaus ei kerro mitään)',
  lyhyt.vastauksenKorkeus < lyhyt.virranKorkeus, JSON.stringify(lyhyt));
vaadi('lyhyen vastauksen loppurenderöinti ei liikuta näkymää',
  Math.abs(lyhyt.jalkeen - lyhyt.ennenLoppua) <= 1, JSON.stringify(lyhyt));
vaadi('kysymys pysyy paneelin yläreunassa myös lyhyellä vastauksella',
  lyhyt.kysymysYlhaalla >= -2 && lyhyt.kysymysYlhaalla <= 30, JSON.stringify(lyhyt));
vaadi('edellinen vastaus ei palaa näkyviin uuden alle',
  lyhyt.edellinenYlapuolella >= 0, JSON.stringify(lyhyt));
vaadi('lyhyen vastauksen alle jää varattua tyhjää',
  lyhyt.tyhjaaAlla > 20, JSON.stringify(lyhyt));
vaadi('lyhytkin vastaus saa linkit ja täsmälleen kaksi jatkokysymystä',
  lyhyt.kasitteita === 1 && lyhyt.jatkonappeja === 2, JSON.stringify(lyhyt));

await striimiCtx.close();

/* ------------------------------------------------------------------ */
/* 21c) Luenta alkaa jo striimin aikana                                */
/* ------------------------------------------------------------------ */

/*
 * OMISTAJAN TILAUS 13.8.2026: *"voiko ääni alkaa lukea tekstiä jo
 * striimauksen aikana?"*
 *
 * Mitattavat asiat: ensimmäinen lausuma on jonossa ENNEN kuin vastaus on
 * valmis, luettavassa ei ole koskaan hakasulkeita eikä JATKOT-lohkoa,
 * ja kaiuttimen sammutus tyhjentää jonon kesken kaiken. Naputus ei soi
 * puheen päällä.
 *
 * SIVU AVATAAN ILMAN LUKIJAÄÄNTÄ (lukijaAani: false). Virtaluenta
 * valitsee ensin lennossa generoidun lukijaäänen (js/lukija.js
 * puheVirtana) ja vasta sen puuttuessa selaimen puhesyntetisaattorin —
 * ja vain jälkimmäisestä näkee headless-selaimessa, mitä luettavaksi
 * meni. Mitattava ketju (paloittelu virkkeiksi, hakasulkeiden siivous,
 * jonon tyhjennys kaiuttimen sammuessa) on molemmilla polulla sama
 * js/pollo.js:n koodi, joten mittaus ei menetä mitään.
 */
const luentaCtx = await selain.newContext({
  viewport: { width: 390, height: 900 }, serviceWorkers: 'block',
});
const { sivu: luentaSivu, virheet: luentaVirheet } = await avaaPeli(luentaCtx,
  { lukijaAani: false });
await vakoileAanet(luentaSivu);

const luenta = await luentaSivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelector('.pollo-nappi').click();
  await odota(700);
  // Kaiutinvipu päälle — se on myös se käyttäjän ele, jonka iOS vaatii.
  document.querySelector('.pollo-kaiutin').click();
  document.querySelector('.pollo-kirjoita').click();
  await odota(150);
  window.__puhutut.length = 0;
  window.__aanet.length = 0;
  document.querySelector('.pollo-kentta').value = 'Kerro Thamesin satamasta';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));

  let puheAlkoiKesken = 0;
  let naputuksiaPuheenAikana = 0;
  let vaimeitaPuheenAikana = 0;
  let kovinPuheenAikana = 0;
  let virtaKesken = false;
  for (let i = 0; i < 200; i += 1) {
    await odota(40);
    if (document.querySelector('.pollo-jatkot')) break;
    // Vastaus on vielä kesken: mitataan, alkoiko puhe jo.
    puheAlkoiKesken = Math.max(puheAlkoiKesken, window.__puhutut.length);
    // Mockin puhe alkaa heti ensimmäisestä palasta, joten kaikkien
    // striimin lyöntien kuuluu olla vaimeita.
    const lyonnit = window.__naputukset();
    naputuksiaPuheenAikana = lyonnit.length;
    vaimeitaPuheenAikana = lyonnit.filter((l) => l.voima < 0.3).length;
    kovinPuheenAikana = lyonnit.reduce((m, l) => Math.max(m, l.voima), 0);
    if (window.matkakirjaPollo?.luentaVirta) virtaKesken = true;
  }
  await odota(600);
  const lausumat = [...window.__puhutut];
  return {
    puheAlkoiKesken,
    naputuksiaPuheenAikana,
    vaimeitaPuheenAikana,
    kovinPuheenAikana,
    virtaKesken,
    aaniPaalla: Boolean(window.matkakirjaPollo?.aaniPaalla),
    lausumia: lausumat.length,
    ekaLausuma: lausumat[0] ?? '',
    sulkeitaLuennassa: lausumat.some((t) => /\[|\]/.test(t)),
    jatkojaLuennassa: lausumat.some((t) => /JATKOT|Miten tunnelit|Kuka maksoi/i.test(t)),
  };
});
vaadi('luenta alkaa jo ennen kuin vastaus on valmis',
  luenta.puheAlkoiKesken >= 1, JSON.stringify(luenta));
vaadi('ensimmäinen lausuma on kokonainen virke',
  /[.!?…]\s*$/.test(luenta.ekaLausuma), JSON.stringify(luenta.ekaLausuma));
vaadi('luenta jonottaa vastauksen useana lausumana',
  luenta.lausumia >= 2, `${luenta.lausumia} lausumaa`);
vaadi('hakasulkeet eivät koskaan päädy luettavaan',
  luenta.sulkeitaLuennassa === false, JSON.stringify(luenta));
vaadi('jatkokysymyksiä ei lueta ääneen',
  luenta.jatkojaLuennassa === false, JSON.stringify(luenta));
// Omistajan tarkennus 13.8.2026 ilta: "pöllön kirjoituskone ei kuulu"
// — puheen alla naputus SOI vaimeana, ei vaikene (aiempi linja kumottu).
vaadi('naputus jatkuu puheen alla',
  luenta.naputuksiaPuheenAikana >= 1, `${luenta.naputuksiaPuheenAikana} lyöntiä`);
vaadi('puheen alla naputus on vaimeaa (voima < 0.3)',
  luenta.vaimeitaPuheenAikana >= 1 && luenta.kovinPuheenAikana < 0.3,
  JSON.stringify({ vaimeita: luenta.vaimeitaPuheenAikana, kovin: luenta.kovinPuheenAikana }));

/*
 * SAMMUTUS KESKEN LUENNAN. Hidas tila jättää lausuman "puhumaan",
 * jolloin jonoon ehtii kertyä virkkeitä — juuri niiden pitää kadota,
 * kun vipu käännetään pois.
 */
const sammutus = await luentaSivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  window.__puheHidas = true;
  window.__puhutut.length = 0;
  document.querySelector('.pollo-kentta').value = 'Kerro Thamesin satamasta uudelleen';
  document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
  // Odotetaan, että ensimmäinen lausuma on puhumassa ja jonoa on kertynyt.
  for (let i = 0; i < 200 && window.__puhutut.length < 1; i += 1) await odota(40);
  await odota(600);
  const ennen = window.__puhutut.length;
  document.querySelector('.pollo-kaiutin').click();
  await odota(600);
  return {
    ennen,
    jononPituus: window.__puheJono(),
    lisaa: window.__puhutut.length - ennen,
    peruutuksia: window.__peruutuksia,
  };
});
vaadi('kaiuttimen sammutus tyhjentää luentajonon heti',
  sammutus.ennen >= 1 && sammutus.jononPituus === 0 && sammutus.lisaa === 0,
  JSON.stringify(sammutus));
vaadi('luentakoe ei kirjoita konsoliin', luentaVirheet.length === 0,
  luentaVirheet.slice(0, 3).join(' | '));
await luentaCtx.close();
polloOsoite = POLLO_URL;

/* ================================================================== */
/* 22) Paneelin mitat: puhelin ja tabletti                             */
/* ================================================================== */

/*
 * OMISTAJAN TILAUS 13.8.2026 iPhone-testauksesta:
 *
 *   *"Pöllö voisi iPhonessa ainakin tulla tai alkaa alanappien päältä
 *   peittäen ne. Ja koko pop-up-ikkuna voisi olla korkeampi. — iPadilla
 *   pöllönäkymä voisi olla myös korkeampi ja hieman leveämpi, mutta sen
 *   ei tarvitse peittää alanappeja. Lisäksi pöllönäkymä voisi heti aueta
 *   täyteen korkeuteensa, kun ensimmäinen kysymys tulee. Se nimittäin
 *   myös häiritsee, kun korkeus pikkuhiljalleen kasvaa."*
 *
 * Tarkennus samana päivänä kaappauksien jälkeen: *"iPhonen
 * kuvakaappauksessa näyttää, että pöllöikkuna on hassusti vasemmassa
 * reunassa"*, *"eikä napit peity kokonaan alhaalla"* ja *"kartta saa
 * jäädä näkyviin hieman alhaalla ja sivuilla, mutta alanapit pitää
 * peittyä kokonaan ja sitten vähän enemmän ylhäälle voi jäädä tilaa."*
 *
 * Mitattavat asiat: korkeus ei kasva vastauksen mukana, puhelimella
 * reunavälit ovat symmetriset ja yläreunaan jää selvästi tilaa,
 * alanappirivi on piilossa keskustelun ajan ja palaa sulkiessa,
 * tabletilla napit näkyvät koko ajan, ja paneelin oma syöterivi mahtuu
 * kokonaan paneelin sisään (kiinteä korkeus + iso varattu tyhjä
 * leikkasi sen kerran puoliksi).
 *
 * MISTÄ TÄYSI KORKEUS ALKAA (omistajan tilaus 18.8.2026, css
 * .pollo-paneeli.pollo-alku): tuore keskustelu aukeaa SISÄLLÖN
 * korkuisena, jotta alkutekstin ja valmiskysymysten alle ei jäisi isoa
 * tyhjää paperia. Kiinteä täysi korkeus astuu voimaan ensimmäisestä
 * kysymyksestä, kerralla eikä vähitellen — omistajan lause kuuluikin
 * "heti aueta täyteen korkeuteensa, KUN ENSIMMÄINEN KYSYMYS TULEE".
 * Siksi vertailupari on kysymyshetki ja vastauksen loppu, ei avaus ja
 * vastauksen loppu.
 */
async function paneelinMitat(leveys, korkeus) {
  const oma = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, serviceWorkers: 'block',
  });
  const { sivu: s, virheet: v } = await avaaPeli(oma);
  await kytkeRajapinta(s, []);
  const tulos = await s.evaluate(async () => {
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));
    const kortti = document.querySelector('.turn-card');
    const nakyyko = () => getComputedStyle(kortti).visibility === 'visible';
    const napitEnnen = nakyyko();
    document.querySelector('.pollo-nappi').click();
    await odota(800);
    const paneeli = document.querySelector('.pollo-paneeli');
    const avattuna = paneeli.getBoundingClientRect().height;
    const napitAuki = nakyyko();
    document.querySelector('.pollo-kirjoita').click();
    await odota(150);
    document.querySelector('.pollo-kentta').value = 'Kerro pitkä tarina Thamesista';
    document.querySelector('.pollo-rivi').dispatchEvent(new Event('submit', { cancelable: true }));
    /*
     * Korkeus HETI kysymyksen jälkeen, ennen kuin vastauksesta on
     * ruudulla riviäkään: js/pollo.js kysy poistaa .pollo-alku-luokan
     * yhtenä liikkeenä, joten paneelin on oltava tässä jo täydessä
     * mitassaan. Kaikki myöhempi kasvu olisi juuri sitä vähittäistä
     * venymistä, jonka omistaja kielsi 13.8.2026.
     */
    const kysyttaessa = paneeli.getBoundingClientRect().height;
    await odota(900);
    const p = paneeli.getBoundingClientRect();
    const syote = document.querySelector('.pollo-syote').getBoundingClientRect();
    const mitat = {
      avattuna: Math.round(avattuna),
      kysyttaessa: Math.round(kysyttaessa),
      vastauksessa: Math.round(p.height),
      leveys: Math.round(p.width),
      // Reunavälit ruudusta, eivät esivanhemmasta: juuri tämä paljasti
      // .turn-cardin transformin, joka vei fixed-ankkurin ruudulta.
      vasen: Math.round(p.left),
      oikea: Math.round(window.innerWidth - p.right),
      yla: Math.round(p.top),
      ala: Math.round(window.innerHeight - p.bottom),
      napitEnnen,
      napitAuki,
      // Positiivinen luku tarkoittaa, että syöterivi jää paneelin sisään.
      syoteMahtuu: Math.round(p.bottom - syote.bottom),
      /*
       * Yksikään esivanhempi ei saa luoda containing blockia: transform,
       * filter, backdrop-filter, perspective, will-change ja contain
       * kaappaavat `position: fixed`in itselleen, ja juuri siihen paneeli
       * kompastui (.turn-card translateX(-50%)). Lista kertoo syyllisen
       * nimeltä, jos ansa palaa.
       */
      ankkurit: (() => {
        const nimet = [];
        for (let el = paneeli.parentElement; el; el = el.parentElement) {
          const st = getComputedStyle(el);
          const syy = [
            st.transform !== 'none' && 'transform',
            st.filter !== 'none' && 'filter',
            st.backdropFilter && st.backdropFilter !== 'none' && 'backdrop-filter',
            st.perspective !== 'none' && 'perspective',
            st.willChange !== 'auto' && `will-change: ${st.willChange}`,
            !/^(none|style)$/.test(st.contain) && `contain: ${st.contain}`,
          ].filter(Boolean);
          if (syy.length) nimet.push(`${el.className || el.tagName} (${syy.join(', ')})`);
        }
        return nimet;
      })(),
    };
    // Sulku palauttaa napit: piilotus ei saa jäädä päälle.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await odota(300);
    mitat.napitSulun = nakyyko();
    return mitat;
  });
  await oma.close();
  return { tulos, virheet: v };
}

const puhelin = await paneelinMitat(390, 844);
vaadi('puhelimen paneeli on koko korkeutensa jo ensimmäisestä kysymyksestä',
  puhelin.tulos.kysyttaessa === puhelin.tulos.vastauksessa
  && puhelin.tulos.avattuna < puhelin.tulos.vastauksessa,
  JSON.stringify(puhelin.tulos));
vaadi('puhelimen paneeli on selvästi entistä korkeampi (yli 500 px)',
  puhelin.tulos.vastauksessa > 500, JSON.stringify(puhelin.tulos));
vaadi('puhelimen paneeli on keskellä: reunavälit yhtä suuret',
  Math.abs(puhelin.tulos.vasen - puhelin.tulos.oikea) <= 2
  && puhelin.tulos.vasen > 0, JSON.stringify(puhelin.tulos));
// JUURISYYN VARTIO: paneelin fixed-asemoinnin on ankkuroiduttava ruutuun.
vaadi('yksikään esivanhempi ei kaappaa paneelin fixed-ankkuria',
  puhelin.tulos.ankkurit.length === 0, puhelin.tulos.ankkurit.join(' | '));
vaadi('kartta näkyy paneelin alta ja sivuilta',
  puhelin.tulos.ala > 0 && puhelin.tulos.ala < 30, JSON.stringify(puhelin.tulos));
vaadi('yläreunaan jää tilaa kartalle ja matkakirjan kaistaleelle',
  puhelin.tulos.yla > 180, JSON.stringify(puhelin.tulos));
vaadi('alanappirivi on piilossa keskustelun ajan',
  puhelin.tulos.napitEnnen === true && puhelin.tulos.napitAuki === false,
  JSON.stringify(puhelin.tulos));
vaadi('alanappirivi palaa näkyviin paneelin sulkeuduttua',
  puhelin.tulos.napitSulun === true, JSON.stringify(puhelin.tulos));
vaadi('paneelin syöterivi mahtuu paneelin sisään puhelimella',
  puhelin.tulos.syoteMahtuu >= 0 && puhelin.tulos.syoteMahtuu < 8,
  JSON.stringify(puhelin.tulos));
vaadi('puhelinmittaus ei kirjoita konsoliin', puhelin.virheet.length === 0,
  puhelin.virheet.slice(0, 3).join(' | '));

const tabletti = await paneelinMitat(834, 1194);
vaadi('tabletin paneeli on koko korkeutensa jo ensimmäisestä kysymyksestä',
  tabletti.tulos.kysyttaessa === tabletti.tulos.vastauksessa
  && tabletti.tulos.avattuna < tabletti.tulos.vastauksessa,
  JSON.stringify(tabletti.tulos));
vaadi('tabletin paneeli on korkeampi ja leveämpi kuin ennen (432 × 336)',
  tabletti.tulos.vastauksessa > 432 && tabletti.tulos.leveys > 336,
  JSON.stringify(tabletti.tulos));
// Omistaja 13.8.2026 ilta: "Pöllö saisi olla hieman irti reunasta"
// — reunaväli on nyt 1.5 rem (24 px), ei enää kiinni laidassa.
vaadi('tabletin paneeli on hieman irti oikeasta reunasta',
  tabletti.tulos.oikea >= 16 && tabletti.tulos.oikea < 48
  && tabletti.tulos.vasen > tabletti.tulos.oikea, JSON.stringify(tabletti.tulos));
vaadi('tabletilla alanapit näkyvät koko ajan',
  tabletti.tulos.napitEnnen === true && tabletti.tulos.napitAuki === true
  && tabletti.tulos.napitSulun === true, JSON.stringify(tabletti.tulos));
vaadi('paneelin syöterivi mahtuu paneelin sisään tabletilla',
  tabletti.tulos.syoteMahtuu >= 0 && tabletti.tulos.syoteMahtuu < 8,
  JSON.stringify(tabletti.tulos));
vaadi('tablettimittaus ei kirjoita konsoliin', tabletti.virheet.length === 0,
  tabletti.virheet.slice(0, 3).join(' | '));

/* ================================================================== */
/* 18) Kartan päällä ei ole ohjetekstiä — ja pöllö vinkkaa hiljaisuudessa */
/* ================================================================== */

/*
 * Omistaja 13.8.2026: *"'valitse kohta kartalta' näkyy edelleen kartan
 * päällä. tämä teksti piti hävittää kokonaan kaikkialta."* ja *"Pöllö
 * voi tarpeen mukaan vinkata, jos pelaaja ei osaa painaa mitään
 * nappia."*
 *
 * Oma konteksti, jottei nopanheitto sotke edellisten osioiden tilaa.
 * Vihjeen viive luetaan ja lyhennetään: savukkeen ei tarvitse odottaa
 * viittätoista sekuntia todistaakseen ketjun toimivaksi, mutta oletus
 * tarkistetaan silti.
 */
const vihjeCtx = await selain.newContext({
  viewport: { width: 390, height: 844 }, hasTouch: true, serviceWorkers: 'block',
});
const { sivu: vihjeSivu, virheet: vihjeVirheet } = await avaaPeli(vihjeCtx);

const ohje = await vihjeSivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  const tavat = game.travelModes();
  game.actionTravel(tavat.includes('land') ? 'land' : 'sea');
  game.actionRoll();
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
  return {
    vaihe: game.phase,
    /*
     * KOHDEMERKKI ON KAHTA KIELTÄ (omistajan pelitestitilaus 26.8.2026).
     * Laudan yleiskuvassa se on punainen katkoviivarengas (.target-ring),
     * fokusnäkymässä pieni pyöreä laatta (.target-piste, js/ui.js
     * fokusKohdeMerkki). Väite koskee sitä, että valittavat kohteet
     * NÄKYVÄT kartalla — ei sitä, kumpi merkki niistä piirtyy.
     */
    kohteita: document.querySelectorAll('.targets .target-ring, .targets .target-piste').length,
    tilarivi: Boolean(document.getElementById('turn-status')),
    ohjerivi: Boolean(document.getElementById('board-hint')),
    // Poistetut kehotukset kokonaisuudessaan: yksikin osuma tarkoittaa,
    // että teksti on palannut jonnekin ruudulle.
    osuma: /valitse kohde kartalta|Heitit \d|Noppa pyörii|heitä noppa|Minne lennetään/i
      .test(document.body.innerText),
    kortti: document.querySelector('.turn-card')?.innerText.trim() ?? null,
  };
});
vaadi('nopanheitto vie siirtovaiheeseen', ohje.vaihe === 'move', JSON.stringify(ohje));
vaadi('valittavat kohteet korostuvat kartalla', ohje.kohteita > 0, JSON.stringify(ohje));
vaadi('kartan ohjerivi (#board-hint) on poistettu', ohje.ohjerivi === false);
vaadi('vuorolaatikon tilarivi (#turn-status) on poistettu', ohje.tilarivi === false);
vaadi('yhtään poistettua ohjetekstiä ei ole ruudulla', ohje.osuma === false,
  JSON.stringify(ohje));
vaadi('vuorolaatikossa on vain napit', (ohje.kortti ?? '') === '', String(ohje.kortti));

const kupla = await vihjeSivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const oletusViive = ui.valintavihjeViive;
  ui.valintavihjeViive = 400;
  ui.valintavihjeVaihe = false;
  ui.paivitaValintavihje();
  // Ennen viiveen umpeutumista kuplaa ei ole.
  await new Promise((r) => setTimeout(r, 150));
  const ennenAikojaan = Boolean(document.querySelector('.pollo-vihje:not([hidden])'));
  await new Promise((r) => setTimeout(r, 700));
  const vihje = document.querySelector('.pollo-vihje');
  const nappi = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
  const laatikko = vihje?.getBoundingClientRect();
  return {
    oletusViive,
    ennenAikojaan,
    nakyy: Boolean(vihje) && !vihje.hidden,
    teksti: vihje?.textContent ?? '',
    // Kupla istuu napin yläpuolella eikä valu ruudun ulkopuolelle.
    valiNappiin: laatikko && nappi ? Math.round(nappi.top - laatikko.bottom) : null,
    ruudulla: Boolean(laatikko) && laatikko.left >= 0 && laatikko.right <= window.innerWidth,
  };
});
vaadi('vihjeen oletusviive on 15 sekuntia', kupla.oletusViive === 15000,
  `${kupla.oletusViive} ms`);
vaadi('vihje ei ilmesty ennen viiveen umpeutumista', kupla.ennenAikojaan === false);
vaadi('vihjekupla ilmestyy hiljaisuuden jälkeen', kupla.nakyy === true, JSON.stringify(kupla));
vaadi('vihje kehottaa napauttamaan korostettua kohdetta',
  /napauta korostettua kohdetta/i.test(kupla.teksti), kupla.teksti);
vaadi('kupla on pöllönapin yläpuolella',
  kupla.valiNappiin !== null && kupla.valiNappiin >= 0 && kupla.valiNappiin < 40,
  JSON.stringify(kupla));
vaadi('kupla pysyy ruudun sisällä', kupla.ruudulla === true, JSON.stringify(kupla));

await vihjeSivu.screenshot({ path: join(ULOS, 'pollo-vihjekupla-390.png') });

/*
 * KUPLA OTTAA NAPAUTUKSEN JA HÄIPYY (omistaja 18.8.2026: "Pöllön
 * puhekuplia pitää häipyä jos sitä koskettaa").
 *
 * Aiemmin kuplalla oli `pointer-events: none`, jolloin kosketus meni
 * sen läpi kartalle — mutta silloin kuplaa ei saanut pois tieltä.
 * Nyt kupla itse on napautettava (css .pollo-vihje cursor: pointer,
 * js/pollo.js sidoKuplanNapautus pointerdown → piilotaVihje).
 *
 * Napautus ei nollaa vuoron vihjelippua, joten kupla ei palaa itsestään
 * — se viritetään tässä uudelleen, jotta seuraava mittaus (kartan
 * kosketus vie kuplan) pääsee alkamaan samasta tilanteesta.
 */
const kuplanNapautus = await vihjeSivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const vihje = document.querySelector('.pollo-vihje');
  const osoitin = getComputedStyle(vihje).pointerEvents;
  vihje.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 9 }));
  await new Promise((r) => setTimeout(r, 120));
  const haipyi = Boolean(document.querySelector('.pollo-vihje')?.hidden);
  // Sama vuoro alusta: kupla takaisin kartan kosketuskoetta varten.
  ui.valintavihjeVaihe = false;
  ui.paivitaValintavihje();
  await new Promise((r) => setTimeout(r, 700));
  return {
    osoitin,
    haipyi,
    uudestaan: Boolean(document.querySelector('.pollo-vihje:not([hidden])')),
  };
});
vaadi('napautus häivyttää kuplan tieltä',
  kuplanNapautus.osoitin !== 'none' && kuplanNapautus.haipyi === true
  && kuplanNapautus.uudestaan === true, JSON.stringify(kuplanNapautus));

/*
 * SULKEVA NAPAUTUS EI VUODA KUPLAN ALLE (omistajan iPad-havainto
 * 27.8.2026: *"sama klikkaus menee helposti LÄPI kuplan alla olevaan
 * karttaan ja avaa kohteen popupin"*).
 *
 * Kupla katoaa pointerdownissa, mutta selain etsii saman napautuksen
 * click-kohteen vasta sormen noustessa — ennen korjausta osuma meni
 * kartalle ja VALITSI matkakohteen kuplan takaa (vaihe move → roll).
 * Tässä mitataan oikealla kosketuksella, ei dispatchEventilla: vain
 * aito napautus tuottaa sen synteettisen clickin, joka vuoti.
 *
 * Kupla siirretään esteettömän kohdemerkin päälle, koska kartan
 * kohteet eivät kaikissa vuoroissa satu kuplan alle — vuoto ei silti
 * riipu paikasta, vaan tapahtumien järjestyksestä.
 */
const kohdistus = await vihjeSivu.evaluate(() => {
  const vihje = document.querySelector('.pollo-vihje');
  if (!vihje || vihje.hidden) return { virhe: 'kuplaa ei ole' };
  const merkit = [...document.querySelectorAll(
    '.targets .target-hit, .targets .target-ring, .targets .target-piste',
  )];
  vihje.hidden = true;
  const kohde = merkit.map((m) => {
    const laatikko = m.getBoundingClientRect();
    const x = Math.round(laatikko.left + laatikko.width / 2);
    const y = Math.round(laatikko.top + laatikko.height / 2);
    return { x, y, kelpaa: Boolean(document.elementFromPoint(x, y)?.closest?.('.targets')) };
  }).find((m) => m.kelpaa);
  vihje.hidden = false;
  if (!kohde) return { virhe: 'esteetöntä kohdemerkkiä ei löytynyt' };
  const laatikko = vihje.getBoundingClientRect();
  vihje.style.bottom = 'auto';
  vihje.style.top = `${Math.round(kohde.y - laatikko.height / 2)}px`;
  vihje.style.left = `${Math.round(kohde.x - laatikko.width / 2)}px`;
  // Mittari: pääseekö napautus kuplan ohi dokumenttiin asti.
  window.__kuplanOhi = 0;
  document.addEventListener('click', () => { window.__kuplanOhi += 1; });
  return { x: kohde.x, y: kohde.y, vaihe: window.matkakirja.game.phase };
});
if (kohdistus.virhe) {
  vaadi('kuplan alle löytyy kohdemerkki', false, kohdistus.virhe);
} else {
  await vihjeSivu.touchscreen.tap(kohdistus.x, kohdistus.y);
  await vihjeSivu.waitForTimeout(400);
  const vuoto = await vihjeSivu.evaluate(async () => {
    const ui = window.matkakirja.ui;
    const tulos = {
      ohi: window.__kuplanOhi,
      haipyi: Boolean(document.querySelector('.pollo-vihje')?.hidden),
      vaihe: window.matkakirja.game.phase,
    };
    // Sama vuoro alusta seuraavaa mittausta varten.
    ui.valintavihjeVaihe = false;
    ui.paivitaValintavihje();
    await new Promise((r) => setTimeout(r, 700));
    return tulos;
  });
  vaadi('kuplan napautus ei vuoda kartalle',
    vuoto.ohi === 0 && vuoto.haipyi === true && vuoto.vaihe === kohdistus.vaihe,
    JSON.stringify({ ...vuoto, alku: kohdistus.vaihe }));
}

const kuplanKato = await vihjeSivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  document.querySelector('.map-pane')
    .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 7 }));
  await new Promise((r) => setTimeout(r, 120));
  const heti = Boolean(document.querySelector('.pollo-vihje:not([hidden])'));
  // Samassa vuorossa vihje ei enää palaa, vaikka piirto uusittaisiin.
  ui.render();
  await new Promise((r) => setTimeout(r, 800));
  const palasi = Boolean(document.querySelector('.pollo-vihje:not([hidden])'));
  return { heti, palasi };
});
vaadi('kartan kosketus vie kuplan heti', kuplanKato.heti === false, JSON.stringify(kuplanKato));
vaadi('kupla ei palaa samassa vuorossa', kuplanKato.palasi === false,
  JSON.stringify(kuplanKato));
vaadi('vihjekoe ei kirjoita konsoliin', vihjeVirheet.length === 0,
  vihjeVirheet.slice(0, 3).join(' | '));
await vihjeCtx.close();

/* ================================================================== */
/* 19) Tutki-arkki iPadilla: leveys ja sisällön mittainen korkeus       */
/* ================================================================== */

/*
 * Omistajan iPad-kaappaus 13.8.2026: *"Lehti näkyy vieläkin liian
 * kapeana iPadilla."* Kaappauksessa lehdettömän kaupungin Tutki-kortti
 * oli kapea palsta keskellä isoa ruutua, ja kortin alaosa oli pelkkää
 * tyhjää pergamenttia.
 *
 * Kaksi vartiota:
 *   a) arkki käyttää iPadin leveyden (vähintään 85 % ruudusta) — juuri
 *      sen menettäisi, jos arkin mittasääntö kaatuisi ja kortti putoaisi
 *      .dialogin 620 pikselin oletukseen
 *   b) lehdettömän kaupungin kortti on sisältönsä mittainen: alle
 *      ruudun korkuinen eikä alla ole kuin pehmuste
 *
 * Puhelin mitataan samalla: siellä arkki on omistajan tilauksesta koko
 * ruutu, eikä tämä korjaus saa muuttaa sitä.
 */
async function tutkiArkinMitat(leveys, korkeus) {
  const oma = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, serviceWorkers: 'block',
  });
  const { sivu: s, virheet: v } = await avaaPeli(oma);
  const tulos = await s.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    /*
     * Etsitään lehdetön kaupunki: sen kortilla on vain otsikko, esittely
     * ja napit — juuri se kortti, joka jätti iPadille tyhjän hännän.
     * Lehtikaupungin sivu on aina ruutua pidempi eikä kerro tästä mitään.
     */
    let lehdeton = null;
    for (const c of game.board.cities) {
      game.actionKehittajaSiirto(c.id);
      ui.openArrival(game.cityOf());
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 200));
      if (!document.getElementById('arrival-dialog').classList.contains('lehti')) {
        lehdeton = c.id;
        break;
      }
      ui.closeArrival();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 80));
    }
    // Kortin avausanimaatio kutistaa sitä hetkeksi: mitataan vasta sen jälkeen.
    await new Promise((r) => setTimeout(r, 900));
    const dialogi = document.getElementById('arrival-dialog');
    const kortti = dialogi.querySelector('.dialog-card');
    const k = kortti.getBoundingClientRect();
    const nakyva = (el) => el && !el.hidden && el.getBoundingClientRect().height > 0;
    const pohja = [...kortti.querySelectorAll('*')].filter(nakyva)
      .reduce((m, el) => Math.max(m, el.getBoundingClientRect().bottom), 0);
    return {
      ruutu: window.innerWidth,
      korkeusRuutu: window.innerHeight,
      lehti: dialogi.classList.contains('lehti'),
      kaupunki: lehdeton,
      leveys: Math.round(k.width),
      korkeus: Math.round(k.height),
      // Tyhjä paperi sisällön alla: pelkkä pehmuste on hyväksyttävä.
      hanta: Math.round(k.bottom - pohja),
      ylaVara: Math.round(k.top),
      alaVara: Math.round(window.innerHeight - k.bottom),
    };
  });
  await oma.close();
  return { tulos, virheet: v };
}

const ipad = await tutkiArkinMitat(1024, 1366);
vaadi('iPadilla Tutki-kortti käyttää ruudun leveyden',
  ipad.tulos.leveys >= ipad.tulos.ruutu * 0.85, JSON.stringify(ipad.tulos));
vaadi('lehdettömän kaupungin kortti on sisältönsä mittainen',
  ipad.tulos.lehti === false && ipad.tulos.korkeus < ipad.tulos.korkeusRuutu * 0.8,
  JSON.stringify(ipad.tulos));
vaadi('kortin alle ei jää tyhjää pergamenttia',
  ipad.tulos.hanta < 80, JSON.stringify(ipad.tulos));
vaadi('lyhyt kortti on pystysuunnassa keskellä',
  Math.abs(ipad.tulos.ylaVara - ipad.tulos.alaVara) < 40, JSON.stringify(ipad.tulos));
vaadi('iPad-mittaus ei kirjoita konsoliin', ipad.virheet.length === 0,
  ipad.virheet.slice(0, 3).join(' | '));

const ipadPieni = await tutkiArkinMitat(834, 1194);
vaadi('pienemmällä iPadilla kortti käyttää ruudun leveyden',
  ipadPieni.tulos.leveys >= ipadPieni.tulos.ruutu * 0.85, JSON.stringify(ipadPieni.tulos));
vaadi('pienemmällä iPadilla kortti on sisältönsä mittainen',
  ipadPieni.tulos.korkeus < ipadPieni.tulos.korkeusRuutu * 0.8
  && ipadPieni.tulos.hanta < 80, JSON.stringify(ipadPieni.tulos));

const puhelinArkki = await tutkiArkinMitat(390, 844);
vaadi('puhelimella arkki on yhä koko ruutu',
  puhelinArkki.tulos.leveys === puhelinArkki.tulos.ruutu
  && puhelinArkki.tulos.korkeus === puhelinArkki.tulos.korkeusRuutu,
  JSON.stringify(puhelinArkki.tulos));

/* ================================================================== */
/* 23) ILMAN NATIIVISILTAA peli on täsmälleen ennallaan                */
/* ================================================================== */

/*
 * TÄMÄ ON AALTO B:N TÄRKEIN VARTIOTESTI.
 *
 * Kuoren kytkennät (haptiikka, iCloud-synkka, widget, jako, Game
 * Center) saavat näkyä vain kuoressa. Selain on pelin koti, ja siellä
 * window.matkakirjaNatiivi puuttuu kokonaan: yhdenkään kytkennän ei
 * pidä heittää, kirjoittaa konsoliin eikä lisätä ruudulle nappia,
 * jonka takana ei ole mitään.
 *
 * Ajo käy läpi ne kohdat, joihin kytkentä tehtiin ja jotka näkyvät
 * ruudulla: nopanheitto, tallennus ja voittoruutu. Vastauksen tärähdys
 * ja putkilaskuri ovat yksikkötesteissä (tests/natiivi.test.mjs).
 */
const siltatonCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: siltatonSivu, virheet: siltatonVirheet } = await avaaPeli(siltatonCtx);
const ilman = await siltatonSivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  await ui.animateDie(4);
  // Voittoruutu ilman oikeaa voittoa: nappirivi on se, mitä mitataan.
  game.winner = game.player;
  ui.showWinner();
  await new Promise((r) => setTimeout(r, 300));
  const jaa = document.getElementById('winner-jaa');
  const tulos = {
    silta: typeof window.matkakirjaNatiivi,
    jakonappiOlemassa: Boolean(jaa),
    jakonappiNakyy: Boolean(jaa && !jaa.hidden && jaa.getBoundingClientRect().height > 0),
    pilviIkkunaAuki: document.getElementById('pilvi-dialog').open,
    // Tallennus kulkee samaa polkua kuin kuoressa — pilveen vain ei mene mitään.
    tallennus: Boolean(localStorage.getItem('matkakirja-save-v1')),
    synkkaLeimoja: localStorage.getItem('matkakirja-synkka-ajat-v1'),
  };
  document.getElementById('winner-dialog').close();
  return tulos;
});
vaadi('selaimessa ei ole natiivisiltaa', ilman.silta === 'undefined', ilman.silta);
vaadi('jakonappi on merkinnässä mutta piilossa ilman siltaa',
  ilman.jakonappiOlemassa === true && ilman.jakonappiNakyy === false, JSON.stringify(ilman));
vaadi('pilvitallennusta ei tarjota ilman siltaa', ilman.pilviIkkunaAuki === false);
vaadi('tallennus toimii ennallaan ilman siltaa', ilman.tallennus === true);
vaadi('synkan aikaleimoja ei kirjoiteta ilman siltaa',
  ilman.synkkaLeimoja === null, String(ilman.synkkaLeimoja));
vaadi('ilman siltaa ei tule yhtään konsolivirhettä', siltatonVirheet.length === 0,
  siltatonVirheet.slice(0, 3).join(' | '));
await siltatonCtx.close();

/* ================================================================== */
/* 24) Kuoren kytkennät: haptiikka, synkka, widget, jako, saavutukset  */
/* ================================================================== */

/*
 * Sama peli valesillan kanssa. Tässä mitataan, että kytkentä on
 * oikeassa kohdassa eikä vain olemassa: tärähdys tulee nopasta ja
 * vastauksesta, widget saa kaupungin, tallennus lähtee pilveen
 * aikaleiman kanssa ja voittoruudussa on jakonappi.
 */
const kuoriCtx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const { sivu: kuoriSivu, virheet: kuoriVirheet } = await avaaPeli(kuoriCtx, { silta: true });
const kuori = await kuoriSivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  window.__tarinat = [];
  await ui.animateDie(3);
  const nopanTarinat = window.__tarinat.slice();

  game.winner = game.player;
  ui.showWinner();
  await new Promise((r) => setTimeout(r, 300));
  const jaa = document.getElementById('winner-jaa');
  const jakoNakyy = Boolean(jaa && !jaa.hidden);
  jaa?.click();
  await new Promise((r) => setTimeout(r, 200));
  document.getElementById('winner-dialog').close();
  return {
    nopanTarinat,
    jakoNakyy,
    jaettu: window.__jaettu ?? '',
    widget: window.__widget ?? null,
    viedyt: (window.__viedyt ?? []).map((v) => v.avain),
    aikaleimat: (window.__viedyt ?? []).every((v) => typeof v.aika === 'number' && v.aika > 0),
    saavutukset: window.__saavutukset ?? [],
    kutsut: window.matkakirjaNatiivi.__kutsut.slice(),
  };
});
vaadi('nopanheitto tärähtää kahdesti (lähtö ja pysähdys)',
  kuori.nopanTarinat.length === 2 && kuori.nopanTarinat[0] === 'kevyt'
  && kuori.nopanTarinat[1] === 'keskitaso', JSON.stringify(kuori.nopanTarinat));
vaadi('kuoressa kirjaudutaan Game Centeriin kerran',
  kuori.kutsut.filter((k) => k === 'pelikeskus.kirjaudu').length === 1,
  kuori.kutsut.join(' | '));
vaadi('widget saa kaupungin, maan, päivän ja kassan',
  Boolean(kuori.widget?.kaupunki) && typeof kuori.widget?.paiva === 'number'
  && /^£/.test(String(kuori.widget?.raha ?? '')), JSON.stringify(kuori.widget));
vaadi('pelitallennus viedään pilveen', kuori.viedyt.includes('matkakirja-save-v1'),
  kuori.viedyt.join(' | '));
vaadi('jokaisen viennin mukana kulkee aikaleima', kuori.aikaleimat === true);
vaadi('läpipeluu kirjaa saavutuksen',
  kuori.saavutukset.includes('fi.matkakirja.peli.saavutus.lapipeluu'),
  kuori.saavutukset.join(' | '));
vaadi('voittoruudussa on jakonappi kuoressa', kuori.jakoNakyy === true);
vaadi('jaettu teksti on matkan yhteenveto',
  /^Matkakirja: \d+ päivä/.test(kuori.jaettu), kuori.jaettu);
vaadi('kuoren kytkennät eivät kirjoita konsoliin', kuoriVirheet.length === 0,
  kuoriVirheet.slice(0, 3).join(' | '));
await kuoriCtx.close();

vaadi('ei sivuvirheitä pääajossa', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
