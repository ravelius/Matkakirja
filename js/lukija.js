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

import {
  esihaePala, luoPuheSoitin, paloitteleVirkkeiksi, puheTuettu,
} from './puhe.js';
/*
 * Taustaäänen väistö luennan ajaksi (omistajan tilaus 15.8.2026:
 * "Hiljennä taustaääntä hieman lukijan ajaksi. Pehmeä feidi").
 * Väistö tehdään TÄSSÄ eikä kutsujissa, jotta jokainen luentapolku —
 * kaiuttimen sivuluenta, virtaluenta ja laitteen oma ääni — väistää
 * samalla tavalla. Laskuri (puhujia) sietää sisäkkäiset kutsut, joten
 * ui.js:n kertojaluentojen oma väistöpari ei mene tämän kanssa
 * ristiin.
 */
import { puheAlkoi, puheLoppui } from './ambience-stream.js';

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

  // Noston aikamerkki otsikon oikeassa reunassa ("1973", "Aamuisin")
  // on taittoa sekin — otsikon perään luettuna se kuulostaa virheeltä
  // (omistajan toive 15.8.2026: "Jätä tällaiset vuosilukumerkinnät
  // lukematta").
  '.nosto-aika',

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
 * Kerää luettavat kohdat elementin sisältä lohkoelementteineen.
 *
 * Kohta = {teksti, osat, otsikko}, jossa osat kertovat mistä
 * lohkoelementeistä teksti tuli ja millä merkkiväleillä — sillä
 * lukija maalaa kuuluvat virkkeet ruudulle ja vierittää sivua
 * luennan perässä (omistajan tilaukset 14.8.2026).
 *
 * LUENTA ALKAA AINA LEIPÄTEKSTISTÄ (omistajan tarkennus 14.8.2026:
 * "aloita aina vain leipätekstistä"). KAIKKI otsikot ennen
 * ensimmäistä leipätekstipalaa ohitetaan — masto, sivuotsikko ja
 * mahdollinen alaotsikko ovat samaa taittoa, jonka lukija juuri näki
 * avatessaan sivun.
 */
function keraaKohdat(juuri, { ohita, ohitaEkaOtsikko }) {
  const kohdat = [];
  let kertyma = [];
  let kertymaLohko = null;
  // "Leipäteksti on alkanut" — sitä ennen jokainen otsikko ohitetaan.
  let leipaAlkoi = !ohitaEkaOtsikko;
  const katkaise = () => {
    const teksti = siisti(kertyma.join(' '));
    const lohko = kertymaLohko;
    kertyma = [];
    kertymaLohko = null;
    if (!teksti) return;
    const tagi = String(lohko?.nodeName ?? lohko?.tagName ?? '').toUpperCase();
    kohdat.push({
      teksti: paate(teksti),
      osat: [{ solmu: lohko, alku: 0, pituus: teksti.length }],
      otsikko: OTSIKKOTAGIT.has(tagi),
    });
    leipaAlkoi = true;
  };
  const kavele = (solmu, lohkoEl) => {
    if (solmu.nodeType === 3) {
      kertyma.push(solmu.data ?? solmu.textContent ?? '');
      kertymaLohko = kertymaLohko ?? lohkoEl;
      return;
    }
    if (solmu.nodeType !== 1) return;
    if (ohitetaanko(solmu, ohita)) return;
    const tagi = String(solmu.nodeName ?? solmu.tagName ?? '').toUpperCase();
    if (!leipaAlkoi && OTSIKKOTAGIT.has(tagi)) return;
    const lohko = LOHKOTAGIT.has(tagi);
    if (lohko) katkaise();
    for (const lapsi of solmu.childNodes ?? []) kavele(lapsi, lohko ? solmu : lohkoEl);
    if (lohko) katkaise();
  };
  kavele(juuri, juuri);
  katkaise();
  return kohdat;
}

/**
 * VÄLIOTSIKKO LIITETÄÄN SEURAAVAAN LEIPÄTEKSTIIN (omistajan tilaus
 * 14.8.2026: "Yhdistä väliotsikko sitä seuraavaan leipätekstiin
 * lukijassa — siis siihen kun lukijan säätimellä hypitään kohtien
 * välissä"). Otsikko ei ole oma pysähdyspaikkansa vaan kohdan
 * esirivi: hyppy laskeutuu otsikkoon ja jatkaa suoraan kappaleeseen.
 * Peräkkäiset otsikot (osasto + alaotsikko) liitetään samaan kohtaan.
 * Hännäksi jäänyt otsikko ilman leipätekstiä jää omaksi kohdakseen.
 */
function niputaOtsikot(kohdat) {
  const tulos = [];
  let odottavat = [];
  for (const kohta of kohdat) {
    if (kohta.otsikko) {
      odottavat.push(kohta);
      continue;
    }
    if (!odottavat.length) {
      tulos.push(kohta);
      continue;
    }
    let teksti = '';
    const osat = [];
    for (const osa of [...odottavat, kohta]) {
      const siirto = teksti ? teksti.length + 1 : 0;
      teksti = teksti ? `${teksti} ${osa.teksti}` : osa.teksti;
      for (const pala of osa.osat) osat.push({ ...pala, alku: pala.alku + siirto });
    }
    // otsikollinen-lippu säilyttää tiedon otsikosta niputuksen yli:
    // soitin pitää tällaisen kohdan edellä pidemmän tauon (omistajan
    // tilaus 15.8.2026 — "pieni tauko ennen kun tulee uusi otsikko").
    tulos.push({ teksti, osat, otsikko: false, otsikollinen: true });
    odottavat = [];
  }
  tulos.push(...odottavat);
  return tulos;
}

/** Kokonaispituuden katto: leikkaus virkkeen rajalta kuten ennenkin. */
function rajaaKattoon(kohdat, katto) {
  const tulos = [];
  let pituus = 0;
  for (const kohta of kohdat) {
    const lisays = (tulos.length ? 1 : 0) + kohta.teksti.length;
    if (pituus + lisays <= katto) {
      tulos.push(kohta);
      pituus += lisays;
      continue;
    }
    // Katkaisu virkkeen rajalta: kesken sanaa loppuva luenta
    // kuulostaa rikkinäiseltä, vaikka syy olisikin vain pituus.
    const tilaa = katto - pituus - (tulos.length ? 1 : 0);
    if (tilaa > 40) {
      const leikattu = kohta.teksti.slice(0, tilaa);
      const raja = leikattu.lastIndexOf('.');
      if (raja > tilaa * 0.5) {
        tulos.push({ ...kohta, teksti: leikattu.slice(0, raja + 1).trim() });
      }
    }
    break;
  }
  return tulos;
}

/**
 * Kokoaa luettavat kohdat elementin sisältä.
 *
 * @param {Element} juuri elementti, jonka sisältö luetaan
 * @param {{ ohita?: string[], katto?: number, ohitaEkaOtsikko?: boolean }} asetukset
 * @returns {{teksti: string, osat: {solmu: Element, alku: number, pituus: number}[]}[]}
 */
export function kokoaLuettavatKohdat(juuri, {
  ohita = LUKIJAN_OHITETTAVAT, katto = LUETTAVAN_KATTO, ohitaEkaOtsikko = true,
} = {}) {
  if (!juuri) return [];
  return rajaaKattoon(niputaOtsikot(keraaKohdat(juuri, { ohita, ohitaEkaOtsikko })), katto);
}

/**
 * Kokoaa luettavan tekstin elementin sisältä.
 *
 * Palauttaa kohdat rivinvaihdoilla eroteltuina: rivinvaihto on
 * molemmille taustajärjestelmille se merkki, josta ne pitävät tauon,
 * ja lukijaäänelle kappaleen (hyppy-yksikön) raja.
 *
 * @param {Element} juuri elementti, jonka sisältö luetaan
 * @param {{ ohita?: string[], katto?: number, ohitaEkaOtsikko?: boolean }} asetukset
 * @returns {string} luettava teksti tai tyhjä merkkijono
 */
export function kokoaLuettavaTeksti(juuri, asetukset = {}) {
  return kokoaLuettavatKohdat(juuri, asetukset).map((k) => k.teksti).join('\n');
}

/**
 * LUENNAN ENSIMMÄINEN PALA VALMIIKSI (omistajan tilaus 15.8.2026,
 * docs/periaatteet.md "Etukäteispuskurin periaate"): hakee sivun
 * luennan ensimmäisen palan välimuistiin, jotta kaiuttimen painallus
 * aloittaa äänen ilman generointiviivettä.
 *
 * Mitään ei soi eikä käyttäjän elettä tarvita — pelkkä haku.
 *
 * MIKSI TÄSSÄ EIKÄ KUTSUJASSA: puskuri hyödyttää vain, jos se osuu
 * samaan välimuistiavaimeen kuin luenta. Avain on `persoona|säädöt|
 * teksti`, joten teksti on johdettava täsmälleen samalla ketjulla:
 *
 *   1. kokoaLuettavatKohdat — sama valinta kuin kaynnistaLuenta tekee
 *      (samat ohitukset, sama ohitaEkaOtsikko)
 *   2. kohdat[0] on ensimmäinen kappale; sivu avataan aina ylhäältä,
 *      joten luenta alkaa siitä (nakyvaKohta palauttaa 0)
 *   3. puheen pilkonta antaa koko jonon ENSIMMÄISEN VIRKKEEN omana
 *      palanaan (js/puhe.js pilkoPaloiksi), jotta luenta alkaa heti —
 *      juuri se virke haetaan tässä
 *
 * Persoona ja säilölohko ratkaistaan samalla säännöllä kuin
 * lueAaneen, ja nopeusasetus tulee mukaan avaimeen puhe.js:ssä.
 *
 * @param {Element} juuri sivun juuri (voi olla irrallinen elementti)
 * @returns {string|null} esihaettu pala, tai null jos ei haettu
 */
export function esipuskuroiLuenta(juuri, {
  persoona = 'kertoja', sailio, vahimmais = LUETTAVAN_VAHIMMAIS,
} = {}) {
  if (!juuri || !puheTuettu()) return null;
  const kohdat = kokoaLuettavatKohdat(juuri);
  if (!kohdat.length) return null;
  /*
   * Sama raja kuin kaiuttimen näkyvyydellä (paivitaLukija): sivu, jolla
   * ei ole tarpeeksi luettavaa, ei saa kaiutinta eikä siis tarvitse
   * puskuriakaan. Pituus lasketaan kuten kokoaLuettavaTeksti liittää
   * kohdat — rivinvaihto kohtien väliin.
   */
  const pituus = kohdat.reduce((summa, k) => summa + k.teksti.length, kohdat.length - 1);
  if (pituus < vahimmais) return null;
  const eka = paloitteleVirkkeiksi(kohdat[0].teksti)[0];
  if (!eka) return null;
  const lohko = sailio !== undefined ? sailio : (persoona === 'pollo' ? null : persoona);
  esihaePala(eka, persoona, lohko);
  return eka;
}

/* ------------------------------------------------------------------ */
/* Luennan seuranta ruudulla: maalaus ja vieritys                      */
/* ------------------------------------------------------------------ */

/** Liikkeen välttäjälle vieritys hyppää, muille liukuu. */
function vahennettyLiike() {
  try {
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  } catch {
    return false;
  }
}

/** Solmun lähin vierivä esivanhempi (lehdessä .dialog-card). */
function vieritysKontti(solmu) {
  for (let el = solmu?.parentElement; el; el = el.parentElement) {
    if (el.scrollHeight > el.clientHeight + 4) {
      const tyyli = el.ownerDocument?.defaultView?.getComputedStyle?.(el);
      const ylivuoto = tyyli?.overflowY;
      if (!ylivuoto || ylivuoto === 'auto' || ylivuoto === 'scroll') return el;
    }
  }
  return solmu?.ownerDocument?.scrollingElement ?? null;
}

/*
 * PEHMEÄ VIERITYS OMALLA KÄYRÄLLÄ (omistajan tilaus 15.8.2026:
 * "Saisiko lehden siirtymät siirtymään pehmeästi scrollaten. Ease in
 * ja out."). Selaimen behavior:'smooth' ei lupaa mitään käyrästä —
 * Chromessa liike on kärkeen painottuva ja loppuu töksähtäen, ja
 * eräissä ympäristöissä syötteen perään käynnistetty pehmeä vieritys
 * peruuntuu kokonaan (mitattu headless-Chromiumissa; ui.js:ssä oli
 * tälle erillinen hyppyvarmistus). Oma rAF-ajuri kirjoittaa
 * scrollTopia suoraan, joten liike lähtee aina ja käyrä on omissa
 * käsissä: kuutiollinen ease-in-out kiihtyy rauhassa ja pehmenee
 * perille.
 *
 * Käyttäjän oma ele (rulla, kosketus, näppäin) katkaisee animaation
 * heti — kone ei saa kiskoa näkymää takaisin, kun lukija tarttuu
 * sivuun itse. Liikkeen välttäjälle hypätään suoraan perille.
 */
export function vieritaPehmeasti(kontti, kohde, { kesto = null } = {}) {
  if (!kontti) return;
  const doc = kontti.ownerDocument ?? (typeof document !== 'undefined' ? document : null);
  const win = doc?.defaultView ?? (typeof window !== 'undefined' ? window : null);
  const ylaraja = Math.max(0, kontti.scrollHeight - kontti.clientHeight);
  const maali = Math.max(0, Math.min(kohde, ylaraja));
  const alku = kontti.scrollTop;
  const matka = maali - alku;
  if (!matka) return;
  if (vahennettyLiike() || typeof win?.requestAnimationFrame !== 'function') {
    kontti.scrollTop = maali;
    return;
  }
  // Kesto matkasta: lyhyt liu'ahdus ei saa madella eikä koko sivun
  // mitta viedä sekuntikaupalla.
  const ms = kesto ?? Math.min(900, Math.max(320, Math.abs(matka) * 0.55));
  const alkoi = win.performance?.now?.() ?? Date.now();
  const tila = { peruttu: false };
  const eleet = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  const peru = () => {
    tila.peruttu = true;
    for (const nimi of eleet) kontti.removeEventListener(nimi, peru);
  };
  for (const nimi of eleet) kontti.addEventListener(nimi, peru, { passive: true });
  const kayra = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
  const askel = (nyt) => {
    if (tila.peruttu) return;
    const osuus = Math.min(1, ((nyt ?? Date.now()) - alkoi) / ms);
    kontti.scrollTop = alku + matka * kayra(osuus);
    if (osuus < 1) win.requestAnimationFrame(askel);
    else peru();
  };
  win.requestAnimationFrame(askel);
}

/**
 * Kartta normalisoidun tekstin merkeistä DOM-tekstisolmujen kohtiin.
 *
 * Kerääjä liittää tekstisolmut välilyönnillä ja siisti() luhistaa
 * tyhjätilan — kartta toistaa täsmälleen saman kävelyn ja kirjaa
 * jokaiselle normalisoidulle merkille lähdesolmun ja -kohdan. Sillä
 * soivan palan merkkiväli osoitetaan takaisin ruudun tekstiin.
 * Sisäkkäiset lohkot ohitetaan: niiden teksti on omissa kohdissaan.
 */
function kartoitaOsa(osa, ohita) {
  const paikat = [];
  let valiEdella = true;
  let liimavali = false;
  const tekstisolmu = (solmu) => {
    const data = solmu.data ?? '';
    for (let i = 0; i < data.length; i += 1) {
      const merkki = data[i];
      if (/\s/.test(merkki)) {
        if (!valiEdella) {
          paikat.push({ solmu, kohta: i, vali: true });
          valiEdella = true;
        }
      } else {
        if (liimavali && !valiEdella) {
          paikat.push({ solmu, kohta: i, vali: true });
        }
        liimavali = false;
        paikat.push({ solmu, kohta: i });
        valiEdella = false;
      }
    }
    liimavali = true;
  };
  const kavele = (el) => {
    for (const lapsi of el.childNodes ?? []) {
      if (lapsi.nodeType === 3) {
        tekstisolmu(lapsi);
        continue;
      }
      if (lapsi.nodeType !== 1) continue;
      if (ohitetaanko(lapsi, ohita)) continue;
      const tagi = String(lapsi.nodeName ?? lapsi.tagName ?? '').toUpperCase();
      if (LOHKOTAGIT.has(tagi)) continue;
      kavele(lapsi);
    }
  };
  if (osa.solmu?.childNodes) kavele(osa.solmu);
  while (paikat.length && paikat[paikat.length - 1].vali) paikat.pop();
  return paikat;
}

/**
 * Soivan palan merkkiväli [alku, loppu) kohdan tekstissä → DOM-alueet.
 * Väli voi ulottua usean osan yli (väliotsikko + kappale samassa
 * kohdassa), joten tulos on lista alueita. Kerääjän lisäämä
 * päätepiste (paate) ei ole DOM:issa — indeksit puristetaan kartan
 * mittaan.
 */
function osoitaAlueet(kohta, alku, loppu, ohita) {
  const alueet = [];
  for (const osa of kohta.osat ?? []) {
    const osaAlku = Math.max(alku, osa.alku);
    const osaLoppu = Math.min(loppu, osa.alku + osa.pituus);
    if (osaLoppu <= osaAlku || !osa.solmu) continue;
    if (!osa.kartta) osa.kartta = kartoitaOsa(osa, ohita);
    if (!osa.kartta.length) continue;
    const a = Math.min(osaAlku - osa.alku, osa.kartta.length - 1);
    const b = Math.min(osaLoppu - osa.alku, osa.kartta.length) - 1;
    const eka = osa.kartta[a];
    const vika = osa.kartta[b];
    if (!eka || !vika) continue;
    try {
      const alue = osa.solmu.ownerDocument.createRange();
      alue.setStart(eka.solmu, eka.kohta);
      alue.setEnd(vika.solmu, vika.kohta + 1);
      alueet.push(alue);
    } catch { /* solmu ehti irrota — maalaus vain jää väliin */ }
  }
  return alueet;
}

/**
 * LUENNAN SEURANTA (omistajan tilaukset 14.8.2026): sivu vierii
 * automaattisesti lukijan perässä kun kohta vaihtuu, ja kuuluvat
 * virkkeet maalataan kevyesti CSS Highlight -rajapinnalla. Ilman
 * rajapintaa (vanhempi selain) koko kohta saa kevyen korostusluokan.
 */
function luoLuennanSeuranta(kohdat, ohita = LUKIJAN_OHITETTAVAT) {
  const eka = kohdat.find((k) => k.osat?.[0]?.solmu)?.osat[0].solmu;
  const doc = eka?.ownerDocument ?? (typeof document !== 'undefined' ? document : null);
  const win = doc?.defaultView ?? (typeof window !== 'undefined' ? window : null);
  const maalaus = Boolean(win && typeof win.Highlight === 'function' && win.CSS?.highlights);
  let kohdalla = -1;
  let vieritysAjastin = null;
  const luokitellut = new Set();
  const puraLuokat = () => {
    for (const el of luokitellut) {
      el.classList?.remove('lukija-kohdalla', 'lukija-korostus', 'lukija-eka-kirjain');
    }
    luokitellut.clear();
  };
  /*
   * Vieritys vain tarpeeseen ja äänen alun ohi (omistajan havainto
   * 15.8.2026: "vielä tökkii alussa sekä kun uusi värillä korostettu
   * kappale vaihtuu"). Rullaus osui täsmälleen samaan hetkeen kuin
   * uuden kappaleen äänen aloitus, ja iPadilla raskas vieritys + äänen
   * käynnistys yhdessä nyki. Nyt: jos kohdan alku on jo mukavasti
   * näkyvissä (ruudun yläpuoliskolla), ei vieritetä lainkaan — luennan
   * alussa se on aina, koska luenta alkaa näytöllä olevasta kohdasta.
   * Kun vieritystä tarvitaan, se tehdään vasta ~350 ms äänen alun
   * jälkeen, jolloin toisto on jo tasaisessa vauhdissa.
   */
  const vierita = (solmu) => {
    if (!solmu?.getBoundingClientRect) return;
    const rect = solmu.getBoundingClientRect();
    const korkeus = win?.innerHeight || 0;
    if (rect && korkeus && rect.top >= -4 && rect.top <= korkeus * 0.55) return;
    clearTimeout(vieritysAjastin);
    vieritysAjastin = setTimeout(() => {
      const kontti = vieritysKontti(solmu);
      if (!kontti) return;
      // scrollIntoView'n scroll-margin luetaan itse: oma ajuri (ease
      // in/out, ks. vieritaPehmeasti) ei tunne CSS:n marginaalia.
      const r = solmu.getBoundingClientRect();
      const k = kontti.getBoundingClientRect?.() ?? { top: 0 };
      const marginaali = parseFloat(win?.getComputedStyle?.(solmu)?.scrollMarginTop) || 0;
      vieritaPehmeasti(kontti, kontti.scrollTop + (r.top - (k.top ?? 0)) - marginaali);
    }, 350);
  };
  /*
   * ALOITUSRAUHA (omistajan tilaus 15.8.2026: "Jos lehti on
   * yläreunassa ja kuuntelu alkaa, niin ruudun pitäisi pysyä
   * paikoillaan seuraavaan kappaleeseen asti"). Luenta alkaa aina
   * näytöllä olevasta kohdasta, joten käynnistyksen vieritys vain
   * nykäisi näkymän pois siitä, mitä lukija juuri katsoi — sivun
   * ylälaidassa se pyyhkäisi nimiön ja kannen kuvat ohi ennen kuin
   * niitä ehti nähdä. Ensimmäinen kuuluva kohta ei siksi vieritä
   * koskaan; seuranta tarttuu ruoriin vasta toisesta kohdasta.
   */
  let alkurauha = true;
  const paivita = (t) => {
    const kohta = kohdat[t.kappale];
    if (!kohta) return;
    if (t.kappale !== kohdalla) {
      kohdalla = t.kappale;
      puraLuokat();
      for (const osa of kohta.osat ?? []) {
        if (!osa.solmu?.classList) continue;
        osa.solmu.classList.add('lukija-kohdalla');
        if (!maalaus) osa.solmu.classList.add('lukija-korostus');
        luokitellut.add(osa.solmu);
      }
      // Kohdan alku näkyviin: scroll-margin (CSS) pitää tarttuvan
      // otsikkorivin poissa päältä.
      if (alkurauha) alkurauha = false;
      else vierita(kohta.osat?.[0]?.solmu);
    }
    if (maalaus && t.teksti) {
      const alueet = osoitaAlueet(kohta, t.alku, t.alku + t.teksti.length, ohita);
      try {
        win.CSS.highlights.set('lukija-luenta', new win.Highlight(...alueet));
      } catch { /* maalaus on koriste — luenta jatkuu ilman */ }
      /*
       * Anfangi maalataan erikseen (omistajan havainto 15.8.2026:
       * "korostus hyppää ensimmäisen kirjaimen yli"): ::first-letter
       * piirtyy omana fragmenttinaan, johon ::highlight ei osu, joten
       * iso alkukirjain jäi maalaamatta. Kun soiva pala kattaa kohdan
       * alun, ensimmäinen lohko saa luokan, jonka ::first-letter-
       * sääntö maalaa samalla värillä — tavallisessa kappaleessa
       * kaksinkertainen maalaus samalla värillä ei näy.
       */
      const eka = kohta.osat?.[0]?.solmu;
      if (eka?.classList) {
        eka.classList.toggle('lukija-eka-kirjain', t.alku === 0);
        luokitellut.add(eka);
      }
    }
  };
  const pura = () => {
    clearTimeout(vieritysAjastin);
    puraLuokat();
    if (maalaus) {
      try {
        win.CSS.highlights.delete('lukija-luenta');
      } catch { /* ei maalattua */ }
    }
  };
  return { paivita, pura };
}

/**
 * Ensimmäinen kohta, joka on näytöllä: luenta alkaa siitä (omistajan
 * tilaus 14.8.2026: "Lukija saisi aloittaa sen kohdan alusta joka on
 * näytöllä"). Yläraja jättää tarttuvan otsikkorivin huomiotta.
 */
function nakyvaKohta(kohdat) {
  if (typeof window === 'undefined') return 0;
  const ylaraja = Math.max(90, (window.innerHeight || 0) * 0.12);
  for (let i = 0; i < kohdat.length; i += 1) {
    const rect = kohdat[i].osat?.[0]?.solmu?.getBoundingClientRect?.();
    if (rect && rect.bottom > ylaraja + 1) return i;
  }
  return 0;
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
  nyt.seuranta?.pura();
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
 * `kohdat` ja `aloitusKappale` kytkevät luennan seurannan (lukijaääni):
 * kuuluvat virkkeet maalataan, sivu vierii luennan perässä ja luenta
 * alkaa näytöllä olevasta kohdasta. Laitteen oma ääni lukee ilman
 * seurantaa — sillä ei ole palatarkkaa tilaa.
 *
 * @param {string} teksti luettava teksti
 * @param {Element|null} nappi nappi, jonka tila seuraa luentaa
 * @param {{ persoona?: string, sailio?: string|null, onLoppu?: () => void,
 *   kohdat?: object[]|null, aloitusKappale?: number }} asetukset
 * @returns {boolean} lähtikö luenta käyntiin
 */
export function lueAaneen(teksti, nappi = null, {
  persoona = 'kertoja', sailio, onLoppu, kohdat = null, aloitusKappale = 0, jatko = null,
} = {}) {
  pysaytaLukija();
  const puhuttava = String(teksti ?? '').trim();
  if (!puhuttava) return false;
  const lohko = sailio !== undefined ? sailio : (persoona === 'pollo' ? null : persoona);
  /*
   * Tausta väistyy pehmeällä feidillä luennan ajaksi; vapautus on
   * omassa kerran-kääreessään, koska siihen johtaa kaksi eri polkua:
   * loppukoukku (luonnollinen loppu, pysäytys, virhe) ja alla oleva
   * käynnistyksen epäonnistuminen. Laitepolun poikkeushaara ehtii
   * kutsua loppukoukun ENNEN kuin palauttaa false — ilman käärettä
   * väistö vapautuisi silloin kahdesti ja veisi laskurin muiden
   * puhujien alta.
   */
  const vapautaVaisto = kerran(puheLoppui);
  const kunLoppuu = kerran(() => {
    vapautaVaisto();
    if (typeof onLoppu === 'function') onLoppu();
  });
  puheAlkoi();
  if (aloitaPuheLuenta(puhuttava, nappi, persoona, lohko, kunLoppuu, {
    kohdat, aloitusKappale, jatko,
  })) return true;
  if (lueLaitteella(puhuttava, nappi, kunLoppuu)) return true;
  // Mikään taustajärjestelmä ei ottanut luentaa — väistö heti pois.
  vapautaVaisto();
  return false;
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
function aloitaPuheLuenta(puhuttava, nappi, persoona, sailio = null, kunLoppuu = null, {
  kohdat = null, aloitusKappale = 0, jatko = null,
} = {}) {
  if (!puheTuettu()) return false;
  const merkki = {};
  const seuranta = kohdat?.length ? luoLuennanSeuranta(kohdat) : null;
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    seuranta?.pura();
    merkitseTila(nappi, false);
    suljeOhjain();
    kunLoppuu?.();
    /*
     * JATKUVA LUENTA: vain luonnollinen loppu jatkaa — pysäytys ja
     * virhe kulkevat omia polkujaan eivätkä koskaan käänna sivua.
     * Pieni hengähdys ennen käännöstä erottaa sivut toisistaan
     * korvakuulolta, ja vartija varmistaa, ettei väliin ehtinyt uusi
     * luenta (esim. pelaajan oma painallus) jää käännöksen alle.
     */
    if (jatko && autoLuenta()) {
      setTimeout(() => {
        if (!ajossa) jatko();
      }, 650);
    }
  };
  const soitin = luoPuheSoitin({
    persoona,
    sailio,
    aloitusKappale,
    // Otsikolla alkavien kohtien edellä pidetään pidempi tauko
    // (omistajan tilaus 15.8.2026). Häntään jäänyt paljas otsikko
    // (kohta ilman leipätekstiä) lasketaan samaan joukkoon.
    otsikkoKappaleet: kohdat?.length
      ? kohdat.flatMap((k, i) => (k.otsikollinen || k.otsikko ? [i] : []))
      : null,
    onLoppu: loppui,
    onTila: (t) => {
      paivitaOhjain(merkki, t);
      seuranta?.paivita(t);
    },
    onVirhe: (vaihe) => {
      if (ajossa?.merkki !== merkki) return;
      ajossa = null;
      seuranta?.pura();
      merkitseTila(nappi, false);
      suljeOhjain();
      if (vaihe === 'alku' && lueLaitteella(puhuttava, nappi, kunLoppuu)) return;
      kunLoppuu?.();
    },
  });
  if (!soitin) return false;
  ajossa = {
    nappi, merkki, kunLoppuu, soitin, seuranta, jatko, lopeta: () => soitin.pysayta(),
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
  // Sama pehmeä taustan väistö kuin valmiin tekstin luennassa
  // (lueAaneen) — kerran-kääre kattaa kaikki loppupolut.
  const vapautaVaisto = kerran(puheLoppui);
  puheAlkoi();
  const puhe = puheVirtana(nappi, persoona, vapautaVaisto);
  if (puhe) return puhe;
  const eiVirtaa = () => {
    vapautaVaisto();
    return null;
  };
  if (natiiviLuenta()) return eiVirtaa();
  const synth = selainPuhe();
  if (!synth) return eiVirtaa();
  vaimennaSynth(synth);
  const aani = suomiAani(synth);

  const merkki = {};
  const palat = [];
  const tila = { peruttu: false, lausuma: null, lepaa: true, paatetty: false };
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
    vapautaVaisto();
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
    // Väistön vapautus myös pysäytettäessä (pysaytaLukija kutsuu tämän).
    kunLoppuu: vapautaVaisto,
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
function puheVirtana(nappi, persoona, vapautaVaisto = null) {
  if (!puheTuettu()) return null;
  const merkki = {};
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
    vapautaVaisto?.();
  };
  const soitin = luoPuheSoitin({
    persoona,
    // Virtaluenta on aina kertakäyttöistä (pöllön striimi) — ei säilöä.
    sailio: null,
    onLoppu: loppui,
    onVirhe: () => loppui(),
  });
  if (!soitin) return null;
  ajossa = {
    nappi, merkki, kunLoppuu: vapautaVaisto, lopeta: () => soitin.pysayta(),
  };
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
const OHJAIN_OTSIKKO = 'Luentasoitin';

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
  // Kiertävät nuolet: luenta jatkuu sivulta toiselle itsestään.
  auto: '<path d="M6.6 13.5a5.6 5.6 0 0 1 9.3-5.4"/><path d="M16.2 4.6v3.6h-3.6"/>'
    + '<path d="M17.4 10.5a5.6 5.6 0 0 1-9.3 5.4"/><path d="M7.8 19.4v-3.6h3.6"/>',
};

/*
 * JATKUVA LUENTA (omistajan tilaus 15.8.2026: "Lisää kuuntelijaan
 * auto moodi toggle, joka vaihtaa lehden sivua eteenpäin
 * automaattisesti ja jatkaa lukemista"). Valinta on laitekohtainen ja
 * säilyy luentojen yli — kytkin asuu ohjauspaneelissa ja näkyy vain,
 * kun luettavalla sivulla on jatko (lehden sivut; yksittäisillä
 * jutuilla ei ole minne jatkaa).
 */
const AUTO_AVAIN = 'matkakirja-lukija-auto';
const AUTO_OTSIKKO = 'Jatkuva luenta — lehti kääntää sivua itse';

function autoLuenta() {
  try {
    return window.localStorage?.getItem(AUTO_AVAIN) === '1';
  } catch {
    return false;
  }
}

function asetaAutoLuenta(paalla) {
  try {
    if (paalla) window.localStorage?.setItem(AUTO_AVAIN, '1');
    else window.localStorage?.removeItem(AUTO_AVAIN);
  } catch {
    /* yksityistila: valinta elää vain luennan ajan */
  }
}

function ohjainIkoni(nimi) {
  return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
    + ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round"'
    + ` stroke-linejoin="round">${OHJAIN_PIIRROT[nimi]}</svg>`;
}

/** Avoin paneeli: { elementti, merkki, taukoNappi, kappaleRivi, … } tai null. */
let ohjain = null;

function suljeOhjain() {
  if (!ohjain) return;
  clearTimeout(ohjain.ajastin);
  ohjain.elementti.remove();
  ohjain = null;
}

/*
 * AUTOMAATTINEN PIILOUTUMINEN (omistajan tilaus 15.8.2026:
 * "Luentasoitin voisi piiloutua automaattisesti ja sen saisi samasta
 * napista näkyviin ja pois ilman että luenta katkeaa"). Paneeli
 * piiloutuu muutaman sekunnin käyttämättömyyden jälkeen; kaiutin
 * vipuaa sen näkyviin ja piiloon luentaa katkaisematta. Tauolla
 * paneeli ei piiloudu — pysäytetty luenta ilman näkyvää säädintä
 * näyttäisi loppuneelta.
 */
const OHJAIMEN_PIILOAIKA = 4000;

function ajastaOhjaimenPiilotus() {
  if (!ohjain) return;
  clearTimeout(ohjain.ajastin);
  ohjain.ajastin = setTimeout(() => {
    if (!ohjain) return;
    if (ajossa?.soitin?.tauolla?.()) {
      ajastaOhjaimenPiilotus();
      return;
    }
    ohjain.elementti.hidden = true;
  }, OHJAIMEN_PIILOAIKA);
}

function vipuaOhjain() {
  if (!ohjain) return;
  if (ohjain.elementti.hidden) {
    ohjain.elementti.hidden = false;
    ajastaOhjaimenPiilotus();
  } else {
    clearTimeout(ohjain.ajastin);
    ohjain.elementti.hidden = true;
  }
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
  // Käyttö pitää paneelin näkyvissä — piiloutumislaskuri alkaa alusta
  // jokaisesta kosketuksesta.
  paneeli.addEventListener('pointerdown', () => ajastaOhjaimenPiilotus());
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
  // Jatkuvan luennan kytkin vain, kun luennalla on minne jatkaa
  // (lehden sivut) — yksittäisessä jutussa se olisi kuollutta pintaa.
  if (nyt.jatko) {
    const autoNappi = tee('auto', AUTO_OTSIKKO, () => {
      asetaAutoLuenta(!autoLuenta());
      autoNappi.classList.toggle('aktiivinen', autoLuenta());
      autoNappi.setAttribute('aria-pressed', autoLuenta() ? 'true' : 'false');
    });
    autoNappi.classList.add('lukija-auto-nappi');
    autoNappi.classList.toggle('aktiivinen', autoLuenta());
    autoNappi.setAttribute('aria-pressed', autoLuenta() ? 'true' : 'false');
  }
  tee('sulje', SEIS_OTSIKKO, () => pysaytaLukija());
  isanta.appendChild(paneeli);
  ohjain = {
    elementti: paneeli, merkki: nyt.merkki, taukoNappi, kappaleRivi, edellinen, seuraava,
    ajastin: null,
  };
  ajastaOhjaimenPiilotus();
  // Ensipiirto heti: soittimen oma ilmoitus ehti jo mennä ohi ennen
  // paneelin syntyä, ja seuraava tulisi vasta palan vaihtuessa.
  const alku = nyt.soitin.tilanne?.();
  if (alku) paivitaOhjain(nyt.merkki, alku);
}

/** Napin ulkoasu ja saavutettava nimi seuraavat luennan tilaa. */
function merkitseTila(nappi, lukee) {
  if (!nappi) return;
  nappi.classList?.toggle('lukee', Boolean(lukee));
  // Lukijaäänellä nappi vipuaa soittimen (pysäytys on paneelissa);
  // laitteen omalla äänellä se pysäyttää.
  const soittimella = lukee && Boolean(ajossa?.soitin) && ajossa?.nappi === nappi;
  const nimi = lukee
    ? (soittimella ? OHJAIN_OTSIKKO : SEIS_OTSIKKO)
    : (nappi.dataset?.lukijaNimi || LUE_OTSIKKO);
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
 * Käynnistää napin luennan (kaiuttimen painalluksen luentahaara).
 *
 * Elementtilähteestä kootaan kohdat lohkoelementteineen: niillä
 * luenta alkaa näytöllä olevasta kohdasta, sivu vierii luennan
 * perässä ja kuuluvat virkkeet maalataan (omistajan tilaukset
 * 14.8.2026). Merkkijonolähde luetaan entiseen tapaan.
 */
function kaynnistaLuenta(nappi, isanta, { lueOtsikko = false } = {}) {
  const lahdeNyt = nappi.__lukijaLahde;
  const kohde = typeof lahdeNyt === 'function' ? lahdeNyt() : lahdeNyt;
  let kohdat = null;
  let teksti = '';
  if (kohde && typeof kohde !== 'string' && kohde.nodeType === 1) {
    /*
     * Painalluksesta luenta alkaa leipätekstistä (omistajan tarkennus
     * 14.8.2026), mutta jatkuvan luennan sivunvaihdon jälkeen sivun
     * yläotsikko LUETAAN (omistajan tilaus 15.8.2026: "Lue yläotsikko
     * sivun vaihdon jälkeen") — kuulija ei nähnyt uutta sivua, joten
     * otsikko on hänelle uutinen eikä taittoa. Masto ja lehden nimi
     * pysyvät ohituslistalla kummassakin tapauksessa.
     */
    kohdat = kokoaLuettavatKohdat(kohde, { ohitaEkaOtsikko: !lueOtsikko });
    teksti = kohdat.map((k) => k.teksti).join('\n');
  } else {
    teksti = napinTeksti(nappi);
  }
  if (!teksti) return false;
  const alkoi = lueAaneen(teksti, nappi, {
    kohdat,
    aloitusKappale: kohdat ? nakyvaKohta(kohdat) : 0,
    jatko: nappi.__lukijaJatko ?? null,
  });
  // Lukijaäänellä nappi avaa myös ohjauspaneelin (tauko ja
  // kappalehypyt); laitteen omalla äänellä paneelia ei tule.
  if (alkoi) avaaOhjain(isanta, nappi);
  return alkoi;
}

/**
 * Jatkuvan luennan käsi ulospäin: käynnistää napin luennan ilman
 * painallusta. Kutsuja (ui.js) kääntää lehden sivun ensin ja antaa
 * tämän lukea uuden sivun alusta — sama polku kuin painalluksessa,
 * joten seuranta, paneeli ja varapolut tulevat mukana.
 */
export function kaynnistaLukija(nappi, { lueOtsikko = false } = {}) {
  if (!nappi || nappi.hidden || lukijaLukee()) return false;
  return kaynnistaLuenta(nappi, nappi.__lukijaIsanta ?? nappi.parentElement, { lueOtsikko });
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
 * `jatko` on jatkuvan luennan koukku (omistajan tilaus 15.8.2026):
 * kun luenta päättyy omia aikojaan ja automoodi on päällä, se
 * kutsutaan — lehdessä se kääntää sivun ja käynnistää luennan
 * uudelleen (ui.js). Ilman koukkua paneeliin ei tule kytkintä.
 *
 * @param {Element} isanta elementti, johon nappi lisätään
 * @param {Element|(() => Element|string)|string} lahde luettava sisältö
 * @param {{ luokka?: string, nimi?: string, seuraa?: boolean,
 *   jatko?: (() => boolean)|null }} asetukset
 * @returns {Element|null} nappi
 */
export function liitaLukija(isanta, lahde, {
  luokka = '', nimi = LUE_OTSIKKO, seuraa = false, jatko = null,
} = {}) {
  if (!isanta || !lukijaTuettu()) return null;
  // Haku ulottuu isännän koko puuhun, ei vain suoriin lapsiin: lehdessä
  // nappi siirretään tarttuvan otsikkorivin sisään (ui.js
  // sijoitaLehtiKaiutin), ja suora-lapsi-haku loisi silloin kaksosen.
  let nappi = isanta.querySelector?.('.lukija-nappi') ?? null;
  if (!nappi) {
    nappi = isanta.ownerDocument.createElement('button');
    nappi.type = 'button';
    nappi.className = `lukija-nappi${luokka ? ` ${luokka}` : ''}`;
    nappi.innerHTML = `<span class="icon-glyph viiva-ikoni">${KAIUTIN_IKONI}</span>`;
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (lukijaLukee(nappi)) {
        /*
         * Lukijaäänellä nappi VIPUAA soittimen näkyviin ja piiloon
         * luentaa katkaisematta (omistajan tilaus 15.8.2026) —
         * pysäytys tapahtuu paneelin rastista. Laitteen omalla
         * äänellä paneelia ei ole, joten nappi pysäyttää kuten ennen.
         */
        if (ajossa?.soitin && ohjain?.merkki === ajossa.merkki) {
          vipuaOhjain();
          return;
        }
        if (ajossa?.soitin) {
          avaaOhjain(isanta, nappi);
          return;
        }
        pysaytaLukija();
        return;
      }
      kaynnistaLuenta(nappi, isanta);
    });
    isanta.appendChild(nappi);
    /*
     * Pelitilaan poistuminen pysäyttää: dialogin sulkeutuminen on se
     * hetki, jolloin pelaaja palaa kartalle. Kuuntelija kytketään
     * kerran ISÄNTÄÄ kohti eikä nappia: lehden sivunpiirto pyyhkii
     * otsikkoriviin siirretyn napin ja luo uuden, eikä jokainen
     * sivunäyttö saa kasata dialogiin uutta kuuntelijaa. Nappi
     * haetaan sulkemishetkellä, jotta kuuntelija ohjaa aina sitä
     * nappia, joka dialogissa silloin on.
     */
    if (typeof isanta.addEventListener === 'function' && isanta.tagName === 'DIALOG'
      && !isanta.__lukijaSulkija) {
      isanta.__lukijaSulkija = true;
      isanta.addEventListener('close', () => {
        const nykyinen = isanta.querySelector?.('.lukija-nappi');
        if (nykyinen && lukijaLukee(nykyinen)) pysaytaLukija();
      });
    }
  }
  nappi.__lukijaLahde = lahde;
  nappi.__lukijaJatko = jatko;
  nappi.__lukijaIsanta = isanta;
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
