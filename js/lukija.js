/*
 * LUKIJA — sivun teksti ääneen laitteen omalla puheäänellä.
 *
 * Peli on tehty kuunneltavaksi, mutta valmiita luenta-äänitteitä on
 * vain matkakirjamerkinnöille: lehtien sivut, maalehden aihesivut ja
 * pitkät artikkelit ovat pelkkää luettavaa. Tämä moduuli antaa niille
 * pienen kaiuttimen, joka lukee sivun ääneen ilman että yhtään
 * mp3-tiedostoa tarvitsee generoida.
 *
 * KAKSI TAUSTAJÄRJESTELMÄÄ, TÄRKEYSJÄRJESTYKSESSÄ
 *
 *   1. window.matkakirjaNatiivi.luenta (iOS-kuori,
 *      ios/Matkakirja/Selain/natiivi-silta.js). Kuori valitsee
 *      parhaan suomenkielisen äänen itse, joten pelin ei tarvitse
 *      tuntea ääniluetteloa. Luennan loppu kuullaan sillan
 *      'luenta-loppui'-tapahtumasta.
 *   2. window.speechSynthesis fi-FI-äänellä (Safari, Chrome, työpöytä).
 *   3. Ei kumpaakaan → nappia ei näytetä lainkaan. Piilotettu nappi on
 *      parempi kuin nappi, joka tuottaa hiljaisuuden.
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

/** Luennan kieli. Sama luku molemmilla taustajärjestelmillä. */
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

/**
 * Kokoaa luettavan tekstin elementin sisältä.
 *
 * Palauttaa palat rivinvaihdoilla eroteltuina: otsikko, kappale,
 * kappale. Rivinvaihto on molemmille taustajärjestelmille se merkki,
 * josta ne pitävät tauon.
 *
 * @param {Element} juuri elementti, jonka sisältö luetaan
 * @param {{ ohita?: string[], katto?: number }} asetukset
 * @returns {string} luettava teksti tai tyhjä merkkijono
 */
export function kokoaLuettavaTeksti(juuri, { ohita = LUKIJAN_OHITETTAVAT, katto = LUETTAVAN_KATTO } = {}) {
  if (!juuri) return '';
  const palat = [];
  let kertyma = [];
  const katkaise = () => {
    const teksti = siisti(kertyma.join(' '));
    if (teksti) palat.push(paate(teksti));
    kertyma = [];
  };
  const kavele = (solmu) => {
    if (solmu.nodeType === 3) {
      kertyma.push(solmu.data ?? solmu.textContent ?? '');
      return;
    }
    if (solmu.nodeType !== 1) return;
    if (ohitetaanko(solmu, ohita)) return;
    const lohko = LOHKOTAGIT.has(String(solmu.nodeName ?? solmu.tagName ?? '').toUpperCase());
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
  return Boolean(natiiviLuenta() || selainPuhe());
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
}

/**
 * Aloittaa luennan. Edellinen luenta pysähtyy aina ensin.
 *
 * @param {string} teksti luettava teksti
 * @param {Element|null} nappi nappi, jonka tila seuraa luentaa
 * @returns {boolean} lähtikö luenta käyntiin
 */
export function lueAaneen(teksti, nappi = null) {
  pysaytaLukija();
  const puhuttava = String(teksti ?? '').trim();
  if (!puhuttava) return false;

  const merkki = {};
  const loppui = () => {
    if (ajossa?.merkki !== merkki) return;
    ajossa = null;
    merkitseTila(nappi, false);
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
  try {
    synth.cancel();
  } catch {
    /* ei mitään peruttavaa */
  }
  const palat = lukijaPaloittele(puhuttava);
  if (!palat.length) return false;
  let jaljella = palat.length;
  ajossa = {
    nappi,
    merkki,
    lopeta: () => {
      try {
        synth.cancel();
      } catch {
        /* selain oli jo hiljaa */
      }
    },
  };
  const aani = suomiAani(synth);
  for (const pala of palat) {
    const lausuma = new window.SpeechSynthesisUtterance(pala);
    lausuma.lang = LUENNAN_KIELI;
    if (aani) lausuma.voice = aani;
    const valmis = () => {
      jaljella -= 1;
      if (jaljella <= 0) loppui();
    };
    lausuma.onend = valmis;
    lausuma.onerror = valmis;
    synth.speak(lausuma);
  }
  merkitseTila(nappi, true);
  return true;
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
      if (teksti) lueAaneen(teksti, nappi);
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
