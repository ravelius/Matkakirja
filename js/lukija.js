/*
 * LUKIJA — sivun teksti ääneen laitteen omalla puheäänellä.
 *
 * Peli on tehty kuunneltavaksi, mutta valmiita luenta-äänitteitä on
 * vain matkakirjamerkinnöille: lehtien sivut, maalehden aihesivut ja
 * pitkät artikkelit ovat pelkkää luettavaa. Tämä moduuli antaa niille
 * pienen kaiuttimen, joka lukee sivun ääneen ilman että yhtään
 * mp3-tiedostoa tarvitsee generoida.
 *
 * KOLME TAUSTAJÄRJESTELMÄÄ, TÄRKEYSJÄRJESTYKSESSÄ
 *
 *   1. Lennossa generoitu lukijaääni (js/puhe.js — OpenAI:n
 *      puhesynteesi pöllön välityspalvelimen kautta, omistajan päätös
 *      14.8.2026). Vaatii verkon ja workerin, jolla on avain; jos
 *      jompikumpi puuttuu, tästä ei jää jälkeä vaan pudotaan alas.
 *   2. window.matkakirjaNatiivi.luenta (iOS-kuori,
 *      ios/Matkakirja/Selain/natiivi-silta.js). Kuori valitsee
 *      parhaan suomenkielisen äänen itse, joten pelin ei tarvitse
 *      tuntea ääniluetteloa. Luennan loppu kuullaan sillan
 *      'luenta-loppui'-tapahtumasta.
 *   3. window.speechSynthesis fi-FI-äänellä (Safari, Chrome, työpöytä).
 *   4. Ei mitään näistä → nappia ei näytetä lainkaan. Piilotettu nappi
 *      on parempi kuin nappi, joka tuottaa hiljaisuuden.
 *
 * MITÄ LUETAAN — JA MITÄ EI
 *
 * Teksti kootaan sivun DOMista valinnalla, joka OHITTAA kolme asiaa:
 *
 *   a) lähdemerkinnät (.lahde, .kuvalahde, .nahtavyys-lahderivi …).
 *      Ne ovat lisenssin ehto ruudulla, mutta ääneen luettuna
 *      "Kuva: Wellcome Collection, CC BY 4.0" katkaisee jutun.
 *   b) kuvatekstit ja selitteet (figcaption, .kuvateksti, .selite …).
 *      Ne kuuluvat kuvaan, jota kuuntelija ei näe.
 *   c) VISAT JA TEHTÄVÄT vaihtoehtoineen. Tämä on spoilerisuoja, sama
 *      periaate kuin pöllöllä (js/pollo.js SPOILERI_LOHKOT): lukija ei
 *      saa lausua oikeaa vastausta ennen kuin pelaaja on vastannut.
 *
 * Piilotetut lohkot jäävät pois itsestään, koska [hidden]-elementit
 * ohitetaan — lehden kaikki sivut asuvat samassa dialogissa ja vain
 * avoinna oleva on näkyvissä. Sama valinta kelpaa siis sellaisenaan
 * jokaiselle sivulle eikä sivutyyppejä tarvitse tuntea.
 *
 * Vain yksi luenta kerrallaan: uusi aloitus, sivunvaihto ja dialogin
 * sulkeutuminen pysäyttävät edellisen.
 */

import { luoPuheSoitin, puheTuettu } from './puhe.js';

/** Luennan kieli. Sama luku laitteen omilla taustajärjestelmillä. */
export const LUENNAN_KIELI = 'fi-FI';

/**
 * Luettavan tekstin katto merkkeinä.
 *
 * Pitkä artikkeli voi olla kymmeniä tuhansia merkkejä, eikä kukaan
 * kuuntele sitä loppuun. Katkaisu tehdään virkkeen rajalta, jottei
 * luenta lopu kesken sanan.
 */
export const LUETTAVAN_KATTO = 12000;

/**
 * Kuinka pitkä sivun on oltava, ennen kuin kaiutin ilmestyy.
 *
 * Kaiutin lupaa luettavaa sisältöä. Otsikko ja "Haetaan…" eivät ole
 * sitä: verkkohakua odottava "Lue lisää" -ikkuna näyttäisi napin,
 * jonka koko anti olisi kaksi sanaa. Raja on tarkoituksella matala —
 * lyhinkin aihesivu ylittää sen moninkertaisesti.
 */
export const LUETTAVAN_VAHIMMAIS = 80;

/**
 * MITÄ JÄTETÄÄN LUKEMATTA.
 *
 * Kolme ryhmää: lähdemerkinnät, kuvatekstit ja pelin tehtävät. Jos
 * peliin tulee uusi lähde- tai selite-luokka, se lisätään tähän — tai
 * elementille annetaan attribuutti data-lukija="ei", joka toimii ilman
 * koodimuutosta.
 */
export const LUKIJAN_OHITETTAVAT = [
  '[data-lukija="ei"]',

  // Lehden nimi mastossa (omistajan toive 14.8.2026: "lehden nimeä ei
  // tarvitse lukea") — se on taittoa, ei juttua. Sama koskee maston
  // kaupunkinimeä: ilman tätä se kulutti ensimmäisen otsikon
  // ohituksen, ja varsinainen sivuotsikko luettiin silti (omistajan
  // havainto 14.8.2026 illalla kaupunki- ja maalehdillä).
  '#arrival-lehti-yla',
  '.lehti-ylarivi',
  '#arrival-city',

  // Lähdemerkinnät ja krediitit.
  '.lahde',
  '.kuvalahde',
  '.lehti-kuvalahde',
  '.kulttuuri-lahde',
  '.vinkki-lahde',
  '.nahtavyys-lahde',
  '.nahtavyys-lahderivi',
  '.nahtavyys-lainaus-lahde',
  '.lightbox-lahde',
  '.maakayra-lahde',
  '.linssi-lahde',
  '.linssi-selite-lahde',
  '.wiki-source',
  '.source-line',
  '.quiz-kuvalahteet',

  /*
   * MAALEHDEN TILASTOLOHKO (omistajan havainto 13.8.2026).
   *
   * Maalehden alussa on symbolirivit — väkiluku, pinta-ala, V-Dem,
   * $/v — ja niiden alla tervehdykset kielineen ja puhujaosuuksineen
   * (js/ui.js naytaMaaTunnusluvut). Ruudulla ne ovat yhdellä
   * silmäyksellä luettavia, mutta ääneen luettuna niistä tulee
   * minuutin mittainen numerolitania ennen kuin juttu edes alkaa:
   * "44 miljoonaa 34 603 700 neliökilometriä 25 0,34 V-Dem 128…".
   * Luennan kuuluu alkaa leipätekstistä ("Ukraina on suurin…").
   */
  '#arrival-maa-tunnusluvut',
  '#arrival-maa-tervehdykset',
  '.maa-tunnusrivi',
  '.tervehdys',

  /*
   * KOHDEKARTAN KARTTAOSAT, EI ESITTELYÄ (omistajan tarkennus
   * 13.8.2026 iltapäivällä). Ensin ohitettiin koko .kaupunkikartta,
   * mutta silloin luenta loppui Venetsiassa ensimmäiseen kappaleeseen:
   * "Kaupunki kartalla" -otsikko ja esittelykappaleet OVAT juttua ja
   * ne luetaan. Vain itse kartta pisteineen, selitteineen ja
   * mittajanoineen on silmälle eikä korvalle.
   */
  '.maakartta-kotelo',
  '.maakartta-piste',
  '.kartta-mittajana',

  // Lehden päivämäärä on taittoa, ei juttua (omistajan toive).
  '#arrival-lehti-pvm',

  // "Uutisissa tänään (lähde)" -nimiö samoin (omistajan toive) —
  // uutisotsikot itse ovat nappeja ja jäävät pois jo tagilistalla.
  '.uutiset-nimio',

  // Kuvatekstit, selitteet ja karttojen numeroselitykset.
  '.kuvateksti',
  '.nahtavyys-kuvateksti',
  '.wiki-kuvateksti',
  '.selite',
  '.nahtavyys-selite',
  '.vinkki-hero-selite',
  '.vinkki-hero-teksti',
  '.kartta-selite',
  '.kartta-selite-numero',
  '.lightbox-caption',
  '.reveal-caption',
  '.paivan-kuva-selite',
  '.linssi-selite',
  '.quiz-selite',
  '.arrival-kuva-laskuri',

  /*
   * SPOILERISUOJA: tehtävät vaihtoehtoineen. Sama lista kuin pöllöllä
   * (js/pollo.js), koska riski on sama: kuultu oikea vastaus on yhtä
   * paha kuin luettu.
   */
  '[data-pollo="ei"]',
  '.minitehtava',
  '#arrival-kulttuuri',
  '#arrival-kulttuuri-visa',
  '#arrival-kulttuuri-kysymys',
  '#arrival-kulttuuri-vaihtoehdot',
  '.kulttuuri-vaihtoehdot',
  '.quiz-question',
  '.quiz-options',
  '.quiz-option',
  '.quiz-hint-text',
  '.quiz-result',

  // Lukija itse ei kuulu luettavaan.
  '.lukija-nappi',
];

/**
 * Tagit, joita ei lueta lainkaan.
 *
 * Napit ovat käyttöliittymää ("Lue lisää aiheesta", "Poistu lehdestä",
 * sivunuolet), eivät juttua. Navigaatio, lomakkeet ja upotukset samoin.
 */
const OHITETTAVAT_TAGIT = new Set([
  'SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'NAV', 'SELECT', 'INPUT',
  'TEXTAREA', 'AUDIO', 'VIDEO', 'IFRAME', 'CANVAS', 'IMG', 'NOSCRIPT',
]);

/**
 * Lohkotason tagit: näiden rajalla teksti katkaistaan omaksi
 * palakseen, jotta otsikko ja kappale eivät liimaudu yhteen sanaksi.
 */
const LOHKOTAGIT = new Set([
  'P', 'DIV', 'SECTION', 'ARTICLE', 'ASIDE', 'HEADER', 'FOOTER',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'UL', 'OL', 'LI', 'DL', 'DT', 'DD',
  'BLOCKQUOTE', 'FIGURE', 'FIGCAPTION', 'TABLE', 'TR', 'TD', 'TH',
  'BR', 'HR', 'PRE',
]);

/** Rivinvaihdot ja tuplavälit pois. */
function siisti(teksti) {
  return String(teksti ?? '').replace(/\s+/g, ' ').trim();
}

/**
 * Ohitetaanko tämä elementti?
 *
 * Piilotettu elementti ohitetaan aina: lehden sivut asuvat samassa
 * dialogissa, ja ilman tätä lukija lukisi koko lehden yhdellä
 * napautuksella.
 */
function ohitetaanko(el, ohita) {
  const tagi = String(el.nodeName ?? el.tagName ?? '').toUpperCase();
  if (OHITETTAVAT_TAGIT.has(tagi)) return true;
  if (el.hidden === true) return true;
  if (el.getAttribute?.('aria-hidden') === 'true') return true;
  for (const valitsin of ohita) {
    if (el.matches?.(valitsin)) return true;
  }
  return false;
}

/** Piste palan perään, jotta puhesyntetisaattori pitää tauon. */
function paate(teksti) {
  return /[.!?:;…]$/.test(teksti) ? teksti : `${teksti}.`;
}

/** Otsikkotagit ensimmäisen otsikon ohitusta varten. */
const OTSIKKOTAGIT = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

/**
 * Kokoaa luettavan tekstin elementin sisältä.
 *
 * Palauttaa palat rivinvaihdoilla eroteltuina: otsikko, kappale,
 * kappale. Rivinvaihto on molemmille taustajärjestelmille se merkki,
 * josta ne pitävät tauon.
 *
 * LUENTA ALKAA AINA LEIPÄTEKSTISTÄ (omistajan tarkennus 14.8.2026:
 * "aloita aina vain leipätekstistä"). KAIKKI otsikot ennen
 * ensimmäistä leipätekstipalaa ohitetaan — masto, sivuotsikko ja
 * mahdollinen alaotsikko ovat samaa taittoa, jonka lukija juuri näki
 * avatessaan sivun. Kun leipäteksti on alkanut, väliotsikot luetaan —
 * ne jäsentävät kuunneltavaa.
 *
 * @param {Element} juuri elementti, jonka sisältö luetaan
 * @param {{ ohita?: string[], katto?: number, ohitaEkaOtsikko?: boolean }} asetukset
 * @returns {string} luettava teksti tai tyhjä merkkijono
 */
export function kokoaLuettavaTeksti(juuri, {
  ohita = LUKIJAN_OHITETTAVAT, katto = LUETTAVAN_KATTO, ohitaEkaOtsikko = true,
} = {}) {
  if (!juuri) return '';
  const palat = [];
  let kertyma = [];
  // "Leipäteksti on alkanut" — sitä ennen jokainen otsikko ohitetaan.
  let leipaAlkoi = !ohitaEkaOtsikko;
  const katkaise = () => {
    const teksti = siisti(kertyma.join(' '));
    if (teksti) {
      palat.push(paate(teksti));
      leipaAlkoi = true;
    }
    kertyma = [];
  };
  const kavele = (solmu) => {
    if (solmu.nodeType === 3) {
      kertyma.push(solmu.data ?? solmu.textContent ?? '');
      return;
    }
    if (solmu.nodeType !== 1) return;
    if (ohitetaanko(solmu, ohita)) return;
    const tagi = String(solmu.nodeName ?? solmu.tagName ?? '').toUpperCase();
    if (!leipaAlkoi && OTSIKKOTAGIT.has(tagi)) return;
    const lohko = LOHKOTAGIT.has(tagi);
    if (lohko) katkaise();
    for (const lapsi of solmu.childNodes ?? []) kavele(lapsi);
    if (lohko) katkaise();
  };
  kavele(juuri);
  katkaise();
  const kaikki = palat.join('\n');
  if (kaikki.length <= katto) return kaikki;
  // Katkaisu virkkeen rajalta: kesken sanaa loppuva luenta kuulostaa
  // rikkinäiseltä, vaikka syy olisikin vain pituus.
  const leikattu = kaikki.slice(0, katto);
  const raja = Math.max(leikattu.lastIndexOf('.'), leikattu.lastIndexOf('\n'));
  return (raja > katto * 0.5 ? leikattu.slice(0, raja + 1) : leikattu).trim();
}

/* ------------------------------------------------------------------ */
/* Taustajärjestelmät                                                  */
/* ------------------------------------------------------------------ */

/** iOS-kuoren luentarajapinta, tai null selaimessa. */
function natiiviLuenta() {
  if (typeof window === 'undefined') return null;
  const natiivi = window.matkakirjaNatiivi;
  if (!natiivi?.onkoNatiivi) return null;
  if (typeof natiivi.luenta?.puhu !== 'function') return null;
  /*
   * Ominaisuuslippu ratkaisee: vanha kuori voi tarjota rajapinnan
   * ilman toimivaa luentaa. Tiedot luetaan myös suoraan
   * __matkakirjaNatiiviTiedot-oliosta siltä varalta, että pelin koodi
   * ehtii kysyä ennen kuin silta on ehtinyt sulattaa sen.
   */
  const lippu = natiivi.ominaisuudet?.luenta
    ?? window.__matkakirjaNatiiviTiedot?.ominaisuudet?.luenta;
  return lippu ? natiivi : null;
}

/** Selaimen puhesyntetisaattori, tai null jos sitä ei ole. */
function selainPuhe() {
  if (typeof window === 'undefined') return null;
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') return null;
  return synth;
}

/** Paras suomenkielinen ääni, jos selain tarjoaa sellaisen. */
function suomiAani(synth) {
  let aanet = [];
  try {
    aanet = synth.getVoices?.() ?? [];
  } catch {
    return null;
  }
  const suomi = [...aanet].filter((a) => /^fi([-_]|$)/i.test(String(a?.lang ?? '')));
  if (!suomi.length) return null;
  // Laitteen oma ääni ennen verkkoääntä: se toimii myös lentokoneessa.
  return suomi.find((a) => a.localService) ?? suomi[0];
}

/** Onko luenta ylipäätään mahdollista tällä laitteella? */
export function lukijaTuettu() {
  return Boolean(puheTuettu() || natiiviLuenta() || selainPuhe());
}

/**
 * Puhesyntetisaattorin palakoko.
 *
 * Chrome katkaisee pitkän lausuman noin viidentoista sekunnin
 * kohdalla. Teksti pilkotaan siksi virkkeen mittaisiksi paloiksi ja
 * jonotetaan: tauot osuvat luonnollisiin kohtiin eikä luenta katkea.
 */
const PALAN_KATTO = 220;

/*
 * Nimi on lukijan oma (lukijaPaloittele eikä paloittele): yhden
 * tiedoston koonti (tools/build-standalone.mjs) on yhtä
 * näkyvyysaluetta, ja js/uutiset.js julistaa oman paloittele-funktionsa
 * eri palakoolla. Samanniminen jälkimmäinen voitti hiljaa, jolloin
 * uutisten palat pilkkoutuivat dist-versiossa lukijan mitalla.
 */
function lukijaPaloittele(teksti, katto = PALAN_KATTO) {
  const palat = [];
  for (const rivi of String(teksti).split('\n')) {
    const siistitty = rivi.trim();
    if (!siistitty) continue;
    if (siistitty.length <= katto) {
      palat.push(siistitty);
      continue;
    }
    let jaljella = siistitty;
    while (jaljella.length > katto) {
      const pala = jaljella.slice(0, katto);
      // Virkkeen raja on paras katkaisukohta, välilyönti toiseksi paras.
      let raja = Math.max(pala.lastIndexOf('. '), pala.lastIndexOf('! '), pala.lastIndexOf('? '));
      if (raja < katto * 0.4) raja = pala.lastIndexOf(' ');
      if (raja <= 0) raja = katto - 1;
      palat.push(jaljella.slice(0, raja + 1).trim());
      jaljella = jaljella.slice(raja + 1).trim();
    }
    if (jaljella) palat.push(jaljella);
  }
  return palat;
}

/**
 * VAIENTAA SELAIMEN PUHESYNTETISAATTORIN HETI.
 *
 * synth.cancel() riittää määritelmän mukaan, mutta ei käytännössä:
 * WebKitissä (Safari ja iOS-kuoren WKWebView) tauolle jäänyt jono ei
 * tyhjene ennen kuin se on herätetty, ja juuri aloitettu lausuma jatkuu
 * toisinaan ensimmäisestä perumisesta huolimatta. Siksi tässä tehdään
 * kolme asiaa: herätys, peruminen ja varmistus seuraavalla vuorolla.
 *
 * Tämä on se puolisko, jonka pöllön kaiutinvipu tarvitsee: vipu pois →
 * ääni loppuu kesken lauseen, ei lauseen tai jonon loputtua (omistajan
 * havainto 13.8.2026).
 */
let vaimennusVuoro = 0;

function vaimennaSynth(synth, varmista = false) {
  if (!synth) return;
  // Vuoronumero mitätöi vanhat varmistukset: jos uusi luenta (tai uusi
  // pysäytys) ehtii väliin, viivästetty peruminen ei saa katkaista sitä.
  const vuoro = (vaimennusVuoro += 1);
  const yrita = () => {
    try {
      if (synth.paused && typeof synth.resume === 'function') synth.resume();
      synth.cancel();
    } catch {
      /* selain oli jo hiljaa */
    }
  };
  yrita();
  if (!varmista || typeof setTimeout !== 'function') return;
  setTimeout(() => {
    if (vuoro !== vaimennusVuoro) return;
    try {
      if (synth.speaking || synth.pending) yrita();
    } catch {
      /* syntetisaattori katosi kesken kaiken */
    }
  }, 0);
}

/* ------------------------------------------------------------------ */
/* Luennan tila — vain yksi kerrallaan                                 */
/* ------------------------------------------------------------------ */

/** Käynnissä oleva luenta: { nappi, merkki, lopeta } tai null. */
let ajossa = null;

/**
 * Lukeeko lukija juuri nyt?
 *
 * @param {Element|null} nappi jos annettu, kysytään juuri tätä nappia
 */
export function lukijaLukee(nappi = null) {
  if (!ajossa) return false;
  return nappi ? ajossa.nappi === nappi : true;
}

/** Pysäyttää luennan. Turvallista kutsua vaikka mitään ei olisi käynnissä. */
export function pysaytaLukija() {
  const nyt = ajossa;
  if (!nyt) return;
  ajossa = null;
  try {
    nyt.lopeta();
  } catch {
    /* taustajärjestelmä oli jo hiljaa */
  }
  merkitseTila(nyt.nappi, false);
  suljeOhjain();
  // Loppukoukku myös pysäytettäessä: kutsuja (esim. taustamusiikin
  // vaimennus) tarvitsee signaalin JOKAISESTA loppupolusta.
  nyt.kunLoppuu?.();
}

/** Kääre, joka takaa että loppukoukku laukeaa korkeintaan kerran. */
function kerran(fn) {
  if (typeof fn !== 'function') return null;
  let tehty = false;
  return () => {
    if (tehty) return;
    tehty = true;
    try {
      fn();
    } catch {
      /* koukun virhe ei saa kaataa luentaa */
    }
  };
}

/**
 * Aloittaa luennan. Edellinen luenta pysähtyy aina ensin.
 *
 * Lukijaäänen `sailio` on pysyvän äänisäilön lohko (js/puhe.js):
 * oletuksena persoonan oma, paitsi pöllöllä ei mitään — pöllön
 * vastaukset ovat kertakäyttöisiä. Matkakirjan merkinnät annetaan
 * omassa lohkossaan ('merkinnat'), jotta ne voi tuhota erikseen, kun
 * tekstit kirjoitetaan uusiksi.
 *
 * `onLoppu` kutsutaan täsmälleen kerran, kun luenta päättyy — myös
 * pysäytettynä tai virheeseen. Kutsuja voi nojata siihen esim.
 * taustamusiikin vaimennuksen vapautuksessa.
 *
 * @param {string} teksti luettava teksti
 * @param {Element|null} nappi nappi, jonka tila seuraa luentaa
 * @param {{ persoona?: string, sailio?: string|null, onLoppu?: () => void }} asetukset
 * @returns {boolean} lähtikö luenta käyntiin
 */
export function lueAaneen(teksti, nappi = null, { persoona = 'kertoja', sailio, onLoppu } = {}) {
  pysaytaLukija();
  const puhuttava = String(teksti ?? '').trim();
  if (!puhuttava) return false;
  const lohko = sailio !== undefined ? sailio : (persoona === 'pollo' ? null : persoona);
  const kunLoppuu = kerran(onLoppu);
  if (aloitaPuheLuenta(puhuttava, nappi, persoona, lohko, kunLoppuu)) return true;
  return lueLaitteella(puhuttava, nappi, kunLoppuu);
}

/**
 * Lennossa generoitu lukijaääni (js/puhe.js). Palauttaa false, jos
 * puhe ei ole käytössä — silloin kutsuja jatkaa laitteen omaan ääneen.
 *
 * Ensimmäisen palan virhe pudottaa laitteen omalle äänelle KOKO
 * tekstillä: mitään ei ole vielä kuultu, joten alusta aloittaminen on
 * oikein. Myöhempi virhe päättää luennan siististi (teksti on ruudulla,
 * ja seuraava painallus yrittää uudestaan).
 */
function aloitaPuheLuenta(puhuttava, nappi, persoona, sailio = null, kunLoppuu = null) {
  if (!puheTuettu()) return false;
  const merkki = {};
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
    suljeOhjain();
    kunLoppuu?.();
  };
  const soitin = luoPuheSoitin({
    persoona,
    sailio,
    onLoppu: loppui,
    onTila: (t) => paivitaOhjain(merkki, t),
    onVirhe: (vaihe) => {
      if (ajossa?.merkki !== merkki) return;
      ajossa = null;
      merkitseTila(nappi, false);
      suljeOhjain();
      if (vaihe === 'alku' && lueLaitteella(puhuttava, nappi, kunLoppuu)) return;
      kunLoppuu?.();
    },
  });
  if (!soitin) return false;
  ajossa = {
    nappi, merkki, kunLoppuu, soitin, lopeta: () => soitin.pysayta(),
  };
  soitin.lisaa(puhuttava);
  soitin.paata();
  merkitseTila(nappi, true);
  return true;
}

/**
 * Luenta laitteen omalla äänellä (iOS-kuoren silta tai selaimen
 * puhesyntetisaattori). Tämä oli lueAaneen-funktion koko runko ennen
 * lukijaääntä; sisältö on ennallaan.
 */
function lueLaitteella(puhuttava, nappi = null, kunLoppuu = null) {
  const merkki = {};
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
    kunLoppuu?.();
  };

  const natiivi = natiiviLuenta();
  if (natiivi) {
    /*
     * Napin tila palautuu sillan 'luenta-loppui'-tapahtumasta. Lupaus
     * kelpaa toiseksi merkiksi, mutta vain jos se palauttaa oikean
     * tulosolion: osa kuorista ratkaisee postMessagen heti, ja silloin
     * lupaus kertoisi vain että viesti lähti perille.
     */
    let irrota = null;
    ajossa = {
      nappi,
      merkki,
      kunLoppuu,
      lopeta: () => {
        irrota?.();
        try {
          natiivi.luenta.pysayta()?.catch?.(() => {});
        } catch {
          /* kuori oli jo hiljaa */
        }
      },
    };
    irrota = natiivi.kuuntele?.('luenta-loppui', () => loppui()) ?? null;
    try {
      Promise.resolve(natiivi.luenta.puhu(puhuttava, LUENNAN_KIELI)).then((tulos) => {
        if (tulos && typeof tulos === 'object' && 'tila' in tulos) loppui();
      }, () => loppui());
    } catch {
      loppui();
      return false;
    }
    merkitseTila(nappi, true);
    return true;
  }

  const synth = selainPuhe();
  if (!synth) return false;
  vaimennaSynth(synth);
  const palat = lukijaPaloittele(puhuttava);
  if (!palat.length) return false;
  const aani = suomiAani(synth);

  /*
   * PALAT JONOTETAAN YKSI KERRALLAAN, EI KAIKKI KERRALLA.
   *
   * Ennen koko teksti työnnettiin syntetisaattorin jonoon heti, jolloin
   * pysäytys oli sen varassa, että selain tyhjentää jonon oikein — ja
   * juuri sitä WebKit ei tee luotettavasti: peruttu luenta jatkui
   * seuraavasta palasta. Nyt jonossa on korkeintaan yksi lausuma ja
   * seuraava lähtee vasta edellisen päätyttyä, joten peruminen lopettaa
   * luennan lopullisesti — ja `peruttu` estää jo lähteneen päätöksen
   * käynnistämästä uutta palaa.
   */
  const tila = { peruttu: false, lausuma: null };
  let seuraava = 0;
  const puhuPala = () => {
    if (tila.peruttu) return;
    if (seuraava >= palat.length) {
      loppui();
      return;
    }
    const lausuma = new window.SpeechSynthesisUtterance(palat[seuraava]);
    seuraava += 1;
    lausuma.lang = LUENNAN_KIELI;
    if (aani) lausuma.voice = aani;
    const valmis = () => {
      if (tila.peruttu) return;
      puhuPala();
    };
    lausuma.onend = valmis;
    lausuma.onerror = valmis;
    tila.lausuma = lausuma;
    synth.speak(lausuma);
  };

  ajossa = {
    nappi,
    merkki,
    kunLoppuu,
    lopeta: () => {
      tila.peruttu = true;
      // Kuulijat irti ensin: peruminen laukaisee onend/onerror, eikä se
      // saa käynnistää seuraavaa palaa.
      if (tila.lausuma) {
        tila.lausuma.onend = null;
        tila.lausuma.onerror = null;
      }
      // Varmistus päälle vain pysäytettäessä: WebKitissä juuri alkanut
      // lausuma jää toisinaan käyntiin ensimmäisestä perumisesta.
      vaimennaSynth(synth, true);
    },
  };
  puhuPala();
  merkitseTila(nappi, true);
  return true;
}

/**
 * VIRTALUENTA: teksti saapuu palasina, luenta alkaa ensimmäisestä
 * virkkeestä (omistajan tilaus 13.8.2026: *"voiko ääni alkaa lukea
 * tekstiä jo striimauksen aikana?"*).
 *
 * Ero lueAaneeniin on jono, joka voi kasvaa kesken luennan. lueAaneen
 * saa koko tekstin kerralla ja tietää heti, montako palaa on tulossa;
 * tässä puhuPala jää lepäämään tyhjän jonon päälle ja herää, kun
 * lisää() tuo uutta. paata() kertoo, ettei enempää tule — vasta sen
 * jälkeen tyhjä jono päättää luennan.
 *
 * KUTSUJAN VASTUULLA on antaa VALMIITA virkkeitä: tämä ei arvaile,
 * mihin lause loppuu, koska kutsuja tietää sen paremmin (js/pollo.js
 * puskuroi striimin ja leikkaa virkkeen rajalta, ettei kesken jäänyt
 * sana tai puolikas käsitemerkintä päädy puheeksi).
 *
 * NATIIVISILLALLA EI VIRTALUENTAA. Sillan luenta.puhu ottaa vastaan
 * yhden kokonaisen tekstin, eikä sillä ole jonoa johon lisätä — peräkkäiset
 * kutsut keskeyttäisivät toisensa. Tällöin palautuu null, ja kutsuja
 * lukee valmiin vastauksen entiseen tapaan.
 *
 * LUKIJAÄÄNI ENSIN: puhesoitin (js/puhe.js) on itsessään jono, joten se
 * sopii virtaluentaan suoraan — ja koska se soittaa tavallista ääntä
 * eikä puhesyntetisaattoria, virtaluenta toimii sen kautta MYÖS
 * iOS-kuoressa, jossa selainlukijaa ei ole.
 *
 * @returns {{lisaa(teksti: string): void, paata(): void}|null}
 */
export function lueVirtana(nappi = null, { persoona = 'kertoja' } = {}) {
  pysaytaLukija();
  const puhe = puheVirtana(nappi, persoona);
  if (puhe) return puhe;
  if (natiiviLuenta()) return null;
  const synth = selainPuhe();
  if (!synth) return null;
  vaimennaSynth(synth);
  const aani = suomiAani(synth);

  const merkki = {};
  const palat = [];
  const tila = { peruttu: false, lausuma: null, lepaa: true, paatetty: false };
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
  };

  const puhuPala = () => {
    if (tila.peruttu) return;
    if (!palat.length) {
      // Jono tyhjeni: joko odotetaan lisää tai luenta on valmis.
      tila.lepaa = true;
      if (tila.paatetty) loppui();
      return;
    }
    tila.lepaa = false;
    const lausuma = new window.SpeechSynthesisUtterance(palat.shift());
    lausuma.lang = LUENNAN_KIELI;
    if (aani) lausuma.voice = aani;
    const valmis = () => {
      if (tila.peruttu) return;
      puhuPala();
    };
    lausuma.onend = valmis;
    lausuma.onerror = valmis;
    tila.lausuma = lausuma;
    synth.speak(lausuma);
  };

  ajossa = {
    nappi,
    merkki,
    lopeta: () => {
      tila.peruttu = true;
      // Jono tyhjäksi, jottei peruttu luenta jatku seuraavasta palasta.
      palat.length = 0;
      if (tila.lausuma) {
        tila.lausuma.onend = null;
        tila.lausuma.onerror = null;
      }
      vaimennaSynth(synth, true);
    },
  };
  merkitseTila(nappi, true);

  return {
    lisaa(teksti) {
      if (tila.peruttu || tila.paatetty) return;
      // Sama palakatto kuin valmiilla tekstillä: Chrome katkaisee liian
      // pitkän lausuman kesken.
      for (const pala of lukijaPaloittele(teksti)) palat.push(pala);
      if (tila.lepaa) puhuPala();
    },
    paata() {
      if (tila.peruttu || tila.paatetty) return;
      tila.paatetty = true;
      // Jos jono ehti tyhjentyä ennen päätöstä, luenta loppuu tästä.
      if (tila.lepaa) loppui();
    },
  };
}

/**
 * Virtaluenta lukijaäänellä. Palauttaa null, jos puhe ei ole käytössä.
 *
 * Virhe kesken virran päättää luennan siististi ilman varapolkua:
 * striimattua tekstiä ei puskuroida uudelleen luettavaksi, koska
 * vastaus on joka tapauksessa ruudulla ja valmiin vastauksen voi
 * kuunnella kaiuttimesta uudestaan (se polku kulkee lueAaneen kautta
 * varapolkuineen).
 */
function puheVirtana(nappi, persoona) {
  if (!puheTuettu()) return null;
  const merkki = {};
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
  };
  const soitin = luoPuheSoitin({
    persoona,
    // Virtaluenta on aina kertakäyttöistä (pöllön striimi) — ei säilöä.
    sailio: null,
    onLoppu: loppui,
    onVirhe: () => loppui(),
  });
  if (!soitin) return null;
  ajossa = { nappi, merkki, lopeta: () => soitin.pysayta() };
  merkitseTila(nappi, true);
  return {
    lisaa(teksti) {
      soitin.lisaa(teksti);
    },
    paata() {
      soitin.paata();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Kaiutinnappi                                                        */
/* ------------------------------------------------------------------ */

/*
 * Sama kaiutin kuin aloitussivun ääniviihjeessä (js/ui.js
 * VIIVA_IKONIT.kaiutin): pelkkä ääriviiva kartan musteella, ei emojia.
 * Piirto on toistettu tässä tarkoituksella — lukija ei saa riippua
 * ui.js:stä, koska ui.js tuo lukijan.
 */
const KAIUTIN_PIIRTO = '<path d="M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z"/>'
  + '<path d="M14.8 9.4a3.7 3.7 0 0 1 0 5.2"/>'
  + '<path d="M17.4 6.9a7.3 7.3 0 0 1 0 10.2"/>';

const KAIUTIN_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
  + ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round"'
  + ' stroke-linejoin="round">' + KAIUTIN_PIIRTO + '</svg>';

const LUE_OTSIKKO = 'Kuuntele sivu';
const SEIS_OTSIKKO = 'Lopeta kuuntelu';

/* ------------------------------------------------------------------ */
/* Lukijan ohjauspaneeli (omistajan tilaus 14.8.2026)                  */
/* ------------------------------------------------------------------ */

/*
 * Kaiutinnapin painallus avaa lukijaäänellä pienen ohjauspaneelin
 * napin alle: tauko/jatka, kappale taakse ja eteen, kappalelaskuri ja
 * lopetus. Paneeli elää vain luennan ajan — se sulkeutuu, kun luenta
 * päättyy, pysäytetään tai dialogi sulkeutuu. Laitteen oman äänen
 * varapolulla paneelia ei ole (sillä ei ole taukoa eikä kappaleita) —
 * nappi toimii silloin entiseen tapaan kytkimenä.
 */
const OHJAIN_PIIRROT = {
  tauko: '<path d="M8.6 6.4v11.2"/><path d="M15.4 6.4v11.2"/>',
  jatka: '<path d="M8.6 6.2 17.2 12l-8.6 5.8z"/>',
  edellinen: '<path d="M7.4 6.6v10.8"/><path d="M17 6.8 10.2 12l6.8 5.2z"/>',
  seuraava: '<path d="M16.6 6.6v10.8"/><path d="M7 6.8l6.8 5.2L7 17.2z"/>',
  sulje: '<path d="M7.2 7.2l9.6 9.6"/><path d="M16.8 7.2 7.2 16.8"/>',
};

function ohjainIkoni(nimi) {
  return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
    + ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round"'
    + ` stroke-linejoin="round">${OHJAIN_PIIRROT[nimi]}</svg>`;
}

/** Avoin paneeli: { elementti, merkki, taukoNappi, kappaleRivi, … } tai null. */
let ohjain = null;

function suljeOhjain() {
  if (!ohjain) return;
  ohjain.elementti.remove();
  ohjain = null;
}

/** Paneelin tila soittimen ilmoituksesta (tauko/jatka, kappalelaskuri). */
function paivitaOhjain(merkki, t) {
  if (!ohjain || ohjain.merkki !== merkki) return;
  const nimi = t.tauolla ? 'Jatka kuuntelua' : 'Tauko';
  ohjain.taukoNappi.innerHTML = '<span class="icon-glyph viiva-ikoni">'
    + `${ohjainIkoni(t.tauolla ? 'jatka' : 'tauko')}</span>`;
  ohjain.taukoNappi.title = nimi;
  ohjain.taukoNappi.setAttribute('aria-label', nimi);
  // Kappalehypyt ja laskuri vain, kun kappaleita on useampi — yhden
  // kappaleen merkinnällä nuolet olisivat kuollutta pintaa.
  const monta = t.kappaleita > 1;
  ohjain.edellinen.hidden = !monta;
  ohjain.seuraava.hidden = !monta;
  ohjain.kappaleRivi.hidden = !monta;
  if (monta) ohjain.kappaleRivi.textContent = `${t.kappale + 1}/${t.kappaleita}`;
}

/**
 * Avaa ohjauspaneelin napin viereen. Tekee jotain vain, jos juuri
 * käynnistetty luenta kulkee lukijaäänellä (ajossa.soitin on olemassa
 * ja kuuluu tälle napille).
 */
function avaaOhjain(isanta, nappi) {
  const nyt = ajossa;
  if (!nyt?.soitin || nyt.nappi !== nappi) return;
  suljeOhjain();
  const doc = isanta.ownerDocument;
  const paneeli = doc.createElement('div');
  paneeli.className = 'lukija-paneeli';
  // Paneelin napautus ei saa valua taustalle (dialogin sulkijat ym.).
  paneeli.addEventListener('click', (e) => e.stopPropagation());
  const tee = (nimi, otsikko, toiminto) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.className = 'lukija-paneeli-nappi';
    b.title = otsikko;
    b.setAttribute('aria-label', otsikko);
    b.innerHTML = `<span class="icon-glyph viiva-ikoni">${ohjainIkoni(nimi)}</span>`;
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      toiminto();
    });
    paneeli.appendChild(b);
    return b;
  };
  // Toiminnot lukevat soittimen ajosta joka painalluksella: paneeli ei
  // saa ohjata jo vaihtunutta luentaa.
  const oma = () => (ajossa?.merkki === nyt.merkki ? ajossa.soitin : null);
  const edellinen = tee('edellinen', 'Edellinen kappale', () => oma()?.siirryKappale(-1));
  const taukoNappi = tee('tauko', 'Tauko', () => {
    const soitin = oma();
    if (!soitin) return;
    if (soitin.tauolla()) soitin.jatka();
    else soitin.tauko();
  });
  const seuraava = tee('seuraava', 'Seuraava kappale', () => oma()?.siirryKappale(1));
  const kappaleRivi = doc.createElement('span');
  kappaleRivi.className = 'lukija-kappalerivi';
  kappaleRivi.hidden = true;
  paneeli.appendChild(kappaleRivi);
  tee('sulje', SEIS_OTSIKKO, () => pysaytaLukija());
  isanta.appendChild(paneeli);
  ohjain = {
    elementti: paneeli, merkki: nyt.merkki, taukoNappi, kappaleRivi, edellinen, seuraava,
  };
  // Ensipiirto heti: soittimen oma ilmoitus ehti jo mennä ohi ennen
  // paneelin syntyä, ja seuraava tulisi vasta palan vaihtuessa.
  const alku = nyt.soitin.tilanne?.();
  if (alku) paivitaOhjain(nyt.merkki, alku);
}

/** Napin ulkoasu ja saavutettava nimi seuraavat luennan tilaa. */
function merkitseTila(nappi, lukee) {
  if (!nappi) return;
  nappi.classList?.toggle('lukee', Boolean(lukee));
  const nimi = lukee ? SEIS_OTSIKKO : (nappi.dataset?.lukijaNimi || LUE_OTSIKKO);
  nappi.setAttribute?.('aria-pressed', lukee ? 'true' : 'false');
  nappi.setAttribute?.('aria-label', nimi);
  if ('title' in nappi) nappi.title = nimi;
}

/** Napin luettava teksti: lähde voi olla elementti, funktio tai teksti. */
function napinTeksti(nappi) {
  const lahde = nappi?.__lukijaLahde;
  const kohde = typeof lahde === 'function' ? lahde() : lahde;
  if (!kohde) return '';
  if (typeof kohde === 'string') return kohde.trim();
  return kokoaLuettavaTeksti(kohde);
}

/**
 * Kiinnittää kaiutinnapin sivun ylälaitaan.
 *
 * Nappi on isännän (yleensä <dialog>) suora lapsi eikä vierivän kortin
 * sisällä — sama ratkaisu kuin lehden sivunumeropillerillä: kortti
 * vierii, ja kortin sisällä nappi katoaisi heti kun tekstiä lukee.
 *
 * Kutsu on idempotentti: sama isäntä saa yhden napin, ja uusi kutsu
 * vain päivittää sen lähteen. Jos laitteella ei ole kumpaakaan
 * taustajärjestelmää, nappia ei luoda lainkaan ja paluuarvo on null.
 *
 * `seuraa` kytkee tarkkailijan: sivu, jonka teksti valmistuu vasta
 * verkkohaun jälkeen ("Lue lisää"), saa kaiuttimensa näkyviin heti kun
 * artikkeli laskeutuu ruudulle.
 *
 * @param {Element} isanta elementti, johon nappi lisätään
 * @param {Element|(() => Element|string)|string} lahde luettava sisältö
 * @param {{ luokka?: string, nimi?: string, seuraa?: boolean }} asetukset
 * @returns {Element|null} nappi
 */
export function liitaLukija(isanta, lahde, { luokka = '', nimi = LUE_OTSIKKO, seuraa = false } = {}) {
  if (!isanta || !lukijaTuettu()) return null;
  let nappi = isanta.querySelector?.(':scope > .lukija-nappi') ?? null;
  if (!nappi) {
    nappi = isanta.ownerDocument.createElement('button');
    nappi.type = 'button';
    nappi.className = `lukija-nappi${luokka ? ` ${luokka}` : ''}`;
    nappi.innerHTML = `<span class="icon-glyph viiva-ikoni">${KAIUTIN_IKONI}</span>`;
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (lukijaLukee(nappi)) {
        pysaytaLukija();
        return;
      }
      const teksti = napinTeksti(nappi);
      if (!teksti) return;
      lueAaneen(teksti, nappi);
      // Lukijaäänellä nappi avaa myös ohjauspaneelin (tauko ja
      // kappalehypyt); laitteen omalla äänellä paneelia ei tule.
      avaaOhjain(isanta, nappi);
    });
    isanta.appendChild(nappi);
    /*
     * Pelitilaan poistuminen pysäyttää: dialogin sulkeutuminen on se
     * hetki, jolloin pelaaja palaa kartalle. Kuuntelija kytketään
     * kerran napin luonnin yhteydessä.
     */
    if (typeof isanta.addEventListener === 'function' && isanta.tagName === 'DIALOG') {
      isanta.addEventListener('close', () => {
        if (lukijaLukee(nappi)) pysaytaLukija();
      });
    }
  }
  nappi.__lukijaLahde = lahde;
  nappi.dataset.lukijaNimi = nimi;
  merkitseTila(nappi, lukijaLukee(nappi));
  if (seuraa && !nappi.__lukijaVahti && typeof MutationObserver === 'function') {
    // Yksi päivitys per kehys riittää: artikkeli voi laskeutua ruudulle
    // kymmenenä muutoksena peräkkäin, eikä tekstiä kannata koota joka
    // kerta uudestaan.
    let odottaa = false;
    nappi.__lukijaVahti = new MutationObserver(() => {
      if (odottaa) return;
      odottaa = true;
      const aja = () => {
        odottaa = false;
        if (!lukijaLukee(nappi)) paivitaLukija(nappi);
      };
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(aja);
      else setTimeout(aja, 0);
    });
    nappi.__lukijaVahti.observe(isanta, { childList: true, subtree: true, characterData: true });
  }
  return nappi;
}

/**
 * Päivittää napin näkyvyyden sivunvaihdon jälkeen.
 *
 * Sivu, jolla ei ole luettavaa tekstiä (pelkkä kartta tai kuvasivu),
 * ei saa tarjota kaiutinta — se tuottaisi hiljaisuuden.
 */
export function paivitaLukija(nappi, { vahimmais = LUETTAVAN_VAHIMMAIS } = {}) {
  if (!nappi) return;
  const teksti = napinTeksti(nappi);
  const riittaa = teksti.length >= vahimmais;
  nappi.hidden = !riittaa;
  if (!riittaa && lukijaLukee(nappi)) pysaytaLukija();
}
