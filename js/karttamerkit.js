/*
 * ===== MERKKIKERROKSEN RASTERI ELEEN AJAKSI ==========================
 *
 * === MITÄ TÄMÄ KORVAA ================================================
 *
 * v1280 vei merkkikerrokset (kohdemerkit, nimilaput, valotäplät,
 * nippuviivat) `display: none`-tyylillä pois maalikierroksesta koko
 * eleen ajaksi. Se oli mitattu oikeaksi suorituskyvyn kannalta —
 * kartan CSS-muunnos pakottaa selaimen pilkkomaan SVG:n uudestaan
 * maalipaloihin joka kehyksellä, ja kymmenet pienet merkkiryhmät ovat
 * siinä kalleimmat — mutta se maksoi sen, mitä pelaaja katsoo:
 *
 *     OMISTAJA 29.8.2026 ilta: *"Kaikki kohteet saisi siirtyä
 *     kartalla yhtäaikaa niin että mitään ei katoaisi näkyvistä
 *     siirron aikana... kone jaksaa piirtää kahta kerrosta yhtäaikaa
 *     ja sen toisen kerroksen voi varmaan myös rasteroida."*
 *
 * Tämä moduuli tekee juuri sen. Merkkikerrokset paistetaan yhdeksi
 * bittikartaksi, joka pidetään lämpimänä, ja eleen alkaessa elävä svg
 * vaihdetaan siihen. Eleen lopussa svg palaa — klikattavuuden ja
 * terävyyden takia. Merkit eivät siis enää katoa mihinkään; ne vain
 * lakkaavat olemasta vektoreita niiksi sekunneiksi, joina kukaan ei
 * niitä napauta.
 *
 * === MIKSI TÄMÄ ON ILMAISTA ==========================================
 *
 * Rasteri asuu KARTTAKUORESSA, samassa kuin pohjacanvas ja svg. Kuoren
 * oma `translate3d`/`scale` (js/kartta.js asetaPan, paivitaNipistys) on
 * kompositorin SIIRTO eikä maalausta: se liikuttaa kaikkia lapsiaan
 * yhtä aikaa ilman että yhtäkään pikseliä kirjoitetaan uusiksi. Pohja
 * ja merkit liikkuvat siis saman muunnoksen alla YHTENÄ, kuten
 * omistaja pyysi.
 *
 * Sama syy kääntyy myös kielloksi: ruutuavaruudessa elävää canvasta EI
 * tehdä. Se rakennettiin ja mitattiin 29.8.2026 ja se on kahdeksan
 * kertaa hitaampi (WebKit p50 16 → 131 ms), koska kuoren ulkopuolinen
 * canvas ei voi siirtyä kompositorilla vaan sen sisältö on
 * kirjoitettava uusiksi joka kehyksellä. Luvut ja ablaatio ovat
 * js/karttapohja.js:n johdannossa.
 *
 * === PAISTO ON SAMA PUTKI KUIN LAUDAN TAITEELLA ======================
 *
 * Merkkikerroksista otetaan tyylitelty klooni (js/mapart.js
 * tyylitSisaan), se sarjallistetaan yhdeksi <svg>-blobiksi ja
 * piirretään canvakselle. Sama reitti kuin laudan taiteella
 * (js/mapart.js avaaTaidelahde) ja samasta syystä: irrallinen SVG ei
 * peri sivun tyylitiedostoa, joten säännöt on kirjoitettava
 * elementteihin — muuten merkeistä tulisi mustia palloja.
 *
 * KOLME ASIAA, JOTKA IRRALLINEN SVG EI OSAA, ja mitä niille tehdään:
 *
 *   1. ULKOISET KUVAT. Selain ei lataa <img>-kontekstissa olevaan
 *      SVG:hen mitään ulkoa — ei verkosta, ei blobista. Eläintäkyjen
 *      symboli (assets/kartat/symbolit/sym-elain.webp) jäisi tyhjäksi.
 *      Jokainen <image> muunnetaan siksi data-URLiksi ja tulos
 *      välimuistitetaan osoitteen mukaan: eri merkkejä on 58, eri
 *      kuvia yksi.
 *   2. PIILOTETUT SOLMUT. tyylitSisaan kopioi värit ja kirjasimet muttei
 *      `display`-määrettä, joten sammunut valotäplä syttyisi rasterissa.
 *      Klooni karsitaan siksi elävän puun lasketun tyylin mukaan.
 *   3. OMA MUUNNOS. Kerros voi asua ryhmän sisällä, jolla on oma
 *      siirto (nippuviivat ovat board-rootissa). Kerroksen ja svg-juuren
 *      CTM:ien erotus antaa muunnoksen juuren koordinaatistoon
 *      riippumatta siitä, montako siirtoa välissä on — sama temppu kuin
 *      js/mapart.js laatikkoJuuressa.
 *
 * Kirjasimista ei tarvitse huolehtia: pelissä ei ole yhtään
 * @font-face-sääntöä, joten kaikki merkkien kirjasimet ovat
 * järjestelmän omia ja piirtyvät blobissa samannäköisinä.
 *
 * === YKSI PUSKURI, EI KAHTA ==========================================
 *
 * Pohjacanvas tarvitsee atomiseen vaihtoonsa kaksi puskuria, koska se
 * on ruudulla KOKO AJAN: uutta koostetta rakennettaessa vanhan on
 * jäätävä näkyviin. Merkkirasteri on päinvastainen: se on ruudulla
 * VAIN eleen ajan, eikä sitä paisteta koskaan kesken eleen. Ne kaksi
 * ehtoa yhdessä takaavat, ettei puoliksi piirretty rasteri voi olla
 * ruudulla — ja silloin yksi puskuri riittää. Puhelimessa se on koko
 * ero 32 ja 64 megatavun välillä, ja pohja käyttää oman budjettinsa jo.
 *
 * ATOMISUUS SÄILYY SILTI. Vaihto molempiin suuntiin tehdään yhdessä
 * synkronisessa lohkossa (naytaRasteri, piilotaRasteri): ruudulla ei
 * ole yhtään kehystä, jossa merkit puuttuisivat kokonaan. Ja jos rasteri
 * ei ole valmis tai ei peitä näkymää, elävä svg JÄÄ paikalleen — ele on
 * silloin hitaampi mutta mikään ei katoa. Se on tämän moduulin
 * ainoa sallittu epäonnistumistapa.
 *
 * === PUOLIKAS TARKKUUSBUDJETTI =======================================
 *
 * Rasteri mitoitetaan puoleen pohjacanvaksen megapikselibudjetista
 * (MERKKIRASTERI_KATTO_OSUUS). Syy on sekä muisti että se, mitä
 * rasterista näkee: se on ruudulla vain liikkeen ajan ja svg palaa
 * 320 ms:n päästä (js/kartta.js MERKKIEN_PALUU_MS), joten pehmeys ei
 * ehdi lukea kuvaksi. Omistajan linjaus samasta asiasta:
 * *"tökkiminen on paljon pahempi kuin hieman pehmeä kuva"*.
 *
 * === NIMET ON PREFIKSOITU ============================================
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten top-level-nimet alkavat
 * MERKKIRASTERI-etuliitteellä.
 */
import { tyylitSisaan } from './mapart.js';
import { KARTTAPOHJAN_PROFIILIT, valitseKarttapohjanProfiili } from './karttapohja.js';

/** Runkoluokka, jonka voimassa ollessa rasteri on ruudulla svg:n sijaan. */
const MERKKIRASTERI_LUOKKA = 'karttamerkit-rasteri';

/**
 * PAISTETTAVAT KERROKSET — sama joukko kuin css/styles.css piilottaa
 * luokalla `kartta-merkit-piilossa`. Kaksi listaa samasta asiasta on
 * aina yksi liikaa, mutta CSS ei voi lukea JS-vakiota: jos tähän
 * lisätään kerros, sama rivi on lisättävä sinne — ja päinvastoin.
 * Valinta tehdään yhdellä querySelectorAll:lla, jotta kerrokset tulevat
 * DOKUMENTTIJÄRJESTYKSESSÄ eli samassa maalausjärjestyksessä kuin
 * ruudulla.
 */
const MERKKIRASTERI_VALITSIN = '.fokuskohteet, .fokuspisteet, '
  + '.fokusnosto-symbolit, .elaintakyt, .nippuviivat';

/** Osuus pohjacanvaksen megapikselibudjetista (ks. johdanto). */
const MERKKIRASTERI_KATTO_OSUUS = 0.5;

/** Sivun katto: sama raja kuin pohjalla, jokainen alusta tekee tämän. */
const MERKKIRASTERI_SIVU_KATTO = 4096;

/** Alin sallittu tarkkuus: tätä pehmeämpi rasteri ei enää kelpaa kuvaksi. */
const MERKKIRASTERI_ALIN_KERROIN = 0.4;

/** Näin kauan rauhaa merkkien muuttumisen jälkeen ennen uutta paistoa. */
const MERKKIRASTERI_RAUHA_MS = 420;

/** Ele on ollut käynnissä, jos siitä on alle tämän — sama luku kuin pohjalla. */
const MERKKIRASTERI_ELE_MS = 200;

/**
 * Ulkoiset kuvat data-URLeina, osoitteen mukaan.
 *
 * Välimuisti on MODUULIN tasolla eikä olion: symbolitiedostot ovat
 * samat laudasta ja pelistä toiseen, eikä niitä kannata hakea uudestaan
 * laudan vaihtuessa. Arvo on lupaus, jotta 58 samanaikaista kysyjää
 * jakaa yhden haun.
 */
const MERKKIRASTERI_KUVAT = new Map();

/** Kuvavälimuistin katto: symbolikirjasto on pieni, vuoto ei ole. */
const MERKKIRASTERI_KUVAKATTO = 64;

/**
 * Ulkoinen kuva data-URLiksi.
 *
 * Palauttaa null, jos haku ei onnistu — silloin se yksi merkki jää
 * rasterista pois, mutta muut piirtyvät. Kokonaan epäonnistunut paisto
 * olisi huonompi lopputulos kuin yksi puuttuva symboli.
 */
function merkkirasteriKuvaksi(osoite) {
  if (!osoite || osoite.startsWith('data:')) return Promise.resolve(osoite || null);
  if (MERKKIRASTERI_KUVAT.has(osoite)) return MERKKIRASTERI_KUVAT.get(osoite);
  const tyo = (async () => {
    try {
      const vastaus = await fetch(osoite);
      if (!vastaus.ok) return null;
      const blob = await vastaus.blob();
      return await new Promise((valmis) => {
        const lukija = new FileReader();
        lukija.onload = () => valmis(typeof lukija.result === 'string' ? lukija.result : null);
        lukija.onerror = () => valmis(null);
        lukija.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  })();
  if (MERKKIRASTERI_KUVAT.size >= MERKKIRASTERI_KUVAKATTO) {
    MERKKIRASTERI_KUVAT.delete(MERKKIRASTERI_KUVAT.keys().next().value);
  }
  MERKKIRASTERI_KUVAT.set(osoite, tyo);
  return tyo;
}

/** Vain testejä ja laudan vaihtoa varten: kuvavälimuisti nollaan. */
export function nollaaMerkkirasterinKuvat() {
  MERKKIRASTERI_KUVAT.clear();
}

/**
 * Rasterin mitoitus: kerroin (laitepikseliä css-pikseliä kohti) ja
 * canvaksen sivut.
 *
 * Pohjan profiilikerroin on lähtökohta — se on mitattu lehden
 * lähdetarkkuudesta (js/karttapohja.js KARTTAPOHJAN_PROFIILIT) — ja
 * siitä leikataan alaspäin kahdesta syystä: puolikas megapikselibudjetti
 * ja 4096 pikselin sivukatto.
 */
export function mitoitaMerkkirasteri({ leveysCss = 0, korkeusCss = 0, profiili = 'kapea' } = {}) {
  const p = KARTTAPOHJAN_PROFIILIT[profiili] ?? KARTTAPOHJAN_PROFIILIT.kapea;
  const ala = Math.max(1, leveysCss * korkeusCss);
  const kattoPx = p.kattoMp * MERKKIRASTERI_KATTO_OSUUS * 1e6;
  let kerroin = Math.min(p.kerroin, Math.sqrt(kattoPx / ala));
  if (leveysCss > 0) kerroin = Math.min(kerroin, MERKKIRASTERI_SIVU_KATTO / leveysCss);
  if (korkeusCss > 0) kerroin = Math.min(kerroin, MERKKIRASTERI_SIVU_KATTO / korkeusCss);
  kerroin = Math.max(MERKKIRASTERI_ALIN_KERROIN, kerroin);
  const leveysPx = Math.max(1, Math.round(leveysCss * kerroin));
  const korkeusPx = Math.max(1, Math.round(korkeusCss * kerroin));
  return {
    kerroin,
    leveysPx,
    korkeusPx,
    tavut: leveysPx * korkeusPx * 4,
    budjettiTavut: kattoPx * 4,
  };
}

/**
 * Merkkikerroksen rasteri.
 *
 * Yksi olio laudan elinkaaren yli; laudan vaihtuessa kutsutaan pura().
 */
export class Karttamerkit {
  constructor(ui) {
    this.ui = ui;
    this.canvas = null;
    this.ctx = null;
    /** Valmiin rasterin lavatila (paikoitus ja peittävyys luetaan tästä). */
    this.tila = null;
    /** Vastaako rasteri niitä merkkejä, jotka svg:ssä juuri nyt ovat? */
    this.tuore = false;
    /** Paisto on asynkroninen: kesken olevaa ei näytetä eikä uusita. */
    this.paistoKesken = false;
    this.uusiPyynto = false;
    /** Onko rasteri juuri nyt ruudulla svg:n sijaan? */
    this.rasteriNakyy = false;
    this.ajastin = 0;
    /** Vahdittu kerros → sen mutaatiotarkkailija (ks. varmistaVahdit). */
    this.vahdit = new Map();
    /** Sarjallistettu <defs> ja sen tunnus (ks. kokoaDefs). */
    this.defsXml = '';
    this.defsAvain = '';
    /** Mittarit savukkeelle ja kehittäjätyökaluille. */
    this.paistoja = 0;
    this.vaihtoja = 0;
    this.ohitukset = 0;
    this.hylkyja = 0;
    this.viimeisinKesto = 0;
    this.viimeisinSyy = '';
  }

  get tilasto() {
    return {
      paistoja: this.paistoja,
      vaihtoja: this.vaihtoja,
      ohitukset: this.ohitukset,
      hylkyja: this.hylkyja,
      tuore: this.tuore,
      nakyy: this.rasteriNakyy,
      paistoKesken: this.paistoKesken,
      viimeisinKesto: Math.round(this.viimeisinKesto * 10) / 10,
      viimeisinSyy: this.viimeisinSyy,
      canvas: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : null,
      kerroin: this.tila?.kerroin ?? null,
      kerroksia: this.tila?.kerroksia ?? 0,
      merkkeja: this.tila?.merkkeja ?? 0,
      avain: this.tila?.avain ?? '',
      /*
       * Tyhjä muunnos tarkoittaa, että rasteri vastaa lavaa
       * pikselilleen; muunnos päällä tarkoittaa, että lava on
       * vaihtunut paiston jälkeen ja rasteri venyy sen mukana
       * (ks. paikoitaCanvas).
       */
      muunnos: this.canvas?.style?.transform || '',
    };
  }

  /* --- julkinen rajapinta ------------------------------------------- */

  /**
   * Rasteri ajan tasalle. Kutsutaan samasta kohdasta kuin
   * pohjacanvaksen paivita (js/ui.js taydennaTaide) eli silloin, kun
   * näkymä on ASETTUNUT.
   *
   * EI KOSKAAN KESKEN ELEEN: paisto lukee lasketut tyylit ja
   * sarjallistaa satoja solmuja, ja se on täsmälleen se työ, jota
   * sormen alla ei saa tehdä (js/ui.js taydennaTaide sääntö 1).
   */
  paivita(syy = '') {
    if (this.ui?.dead) return false;
    this.varmistaVahdit();
    if (this.eleKaynnissa()) { this.ajastaUusiYritys(); return false; }
    const tavoite = this.laskeTila();
    /*
     * "EI NYT" EI OLE "TYHJENNÄ" — sama sääntö kuin pohjacanvaksella.
     * Kartalla voi olla hetki (lento, kamera-ajo, lehti vaihtumassa),
     * jolloin tilaa ei voi laskea; rasterin sisältö kelpaa yhä, ja
     * seuraava ele saa sen käyttöönsä jos se sattuu peittämään näkymän.
     */
    if (!tavoite) return false;
    if (this.tila && this.tuore && this.samaTila(this.tila, tavoite)) {
      this.ohitukset += 1;
      return false;
    }
    if (this.paistoKesken) { this.uusiPyynto = true; return false; }
    void this.paista(tavoite, syy);
    return true;
  }

  /**
   * Lavan geometria vaihtui (js/kartta.js sovitaMannerZoom).
   *
   * Rasteri on paistettu OMASSA lavassaan, ja sovitus voi vaihtaa lavan
   * kesken sen, kun rasteri on ruudulla — nipistys päättyy portaikon
   * tasoon, ja se napsahdus tapahtuu ennen kuin merkit palaavat
   * (MERKKIEN_PALUU_MS). Silloin rasteri venytetään CSS-muunnoksella
   * uuteen mittakaavaan täsmälleen kuten pohjacanvas: kaksi
   * tyylikirjoitusta, ei yhtään asettelunlukua.
   */
  paikoita() {
    this.paikoitaCanvas();
  }

  /**
   * ELE ALKAA: rasteri ruudulle, elävä svg pois.
   *
   * Palauttaa true vain, jos vaihto oikeasti tehtiin. Kutsuja
   * (js/kartta.js piilotaMerkit) EI saa piilottaa svg:n kerroksia
   * muuten — ilman rasteria merkit jäävät eläviksi, ja ele on
   * hitaampi mutta mikään ei katoa. Se on omistajan linjauksen ydin.
   *
   * VAIHTO ON YKSI SYNKRONINEN LOHKO. Paikoitus, näkyvyys ja svg:n
   * piilotus tapahtuvat samassa tehtävässä, joten seuraava kehys näkee
   * lopputilan — ei koskaan välitilaa, jossa kumpikaan ei ole ruudulla.
   */
  naytaRasteri() {
    const body = globalThis.document?.body;
    if (!body || this.rasteriNakyy) return this.rasteriNakyy;
    // Kesken oleva paisto kirjoittaa juuri nyt tähän canvakseen.
    if (!this.canvas || !this.tila || !this.tuore || this.paistoKesken) return false;
    if (!this.peittaaNakyvan(this.tila)) return false;
    this.paikoitaCanvas();
    body.classList.add(MERKKIRASTERI_LUOKKA);
    this.rasteriNakyy = true;
    this.vaihtoja += 1;
    return true;
  }

  /**
   * ELE OHI: rasteri pois. Kutsuja palauttaa svg:n kerrokset SAMASSA
   * lohkossa (js/kartta.js paljastaMerkit), joten välitilaa ei synny.
   */
  piilotaRasteri() {
    const body = globalThis.document?.body;
    if (body?.classList.contains(MERKKIRASTERI_LUOKKA)) {
      body.classList.remove(MERKKIRASTERI_LUOKKA);
    }
    this.rasteriNakyy = false;
  }

  /** Canvas pois ja vahdit irti (laudan vaihto, purku). */
  pura() {
    this.piilotaRasteri();
    clearTimeout(this.ajastin);
    this.ajastin = 0;
    for (const vahti of this.vahdit.values()) vahti.disconnect();
    this.vahdit.clear();
    if (this.canvas) {
      // Nollamitta kertoo selaimelle heti, ettei puskuria enää tarvita.
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.canvas.parentNode?.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
    this.tila = null;
    this.tuore = false;
    this.defsXml = '';
    this.defsAvain = '';
  }

  /* --- tilan laskenta ------------------------------------------------ */

  /** Onko kartalla juuri nyt ele käynnissä (raahaus, liuku, nipistys, rulla)? */
  eleKaynnissa() {
    const ui = this.ui;
    if (!ui || ui.dead) return false;
    if (ui.kartanRaahaus) return true;
    const hetki = ui.kartanEleHetki;
    return Number.isFinite(hetki) && performance.now() - hetki < MERKKIRASTERI_ELE_MS;
  }

  /**
   * Paistettavat kerrokset dokumenttijärjestyksessä.
   *
   * Piilossa oleva kerros jätetään pois: yleiskuvassa kohdemerkit ovat
   * `display: none` omasta syystään (js/fokuskohteet.js
   * .fokuskohteet-piilossa), eikä rasteri saa tuoda niitä takaisin.
   * Tyhjä kerros jätetään pois turhana.
   */
  keraaKerrokset() {
    const svg = this.ui?.svg;
    if (!svg?.querySelectorAll) return [];
    const ulos = [];
    for (const g of svg.querySelectorAll(MERKKIRASTERI_VALITSIN)) {
      if (!g.firstElementChild) continue;
      const laskettu = globalThis.getComputedStyle?.(g);
      if (laskettu && (laskettu.display === 'none' || laskettu.visibility === 'hidden')) continue;
      ulos.push(g);
    }
    return ulos;
  }

  /**
   * Onko rasterin paisto juuri nyt mahdollinen — ja millaisena?
   *
   * Null tarkoittaa "ei nyt": elävä svg jää eleen ajaksi paikalleen ja
   * kaikki toimii kuten ennen tätä moduulia, vain hitaammin.
   */
  laskeTila() {
    const ui = this.ui;
    const doc = globalThis.document;
    if (!ui || !doc || !ui.svg) return null;
    const ikkuna = ui.lavaIkkunaTila;
    if (!ikkuna || !(ikkuna.w > 0) || !(ikkuna.h > 0)) return null;
    // Kamera-ajon ja lennon aikana merkit liikkuvat itsestään: rasteri
    // jäätyisi väärään kohtaan. Ajo on lyhyt eikä siinä panoroida.
    if (ui.aloituslentoKesken) return null;
    if (doc.body?.classList?.contains('kartalento')) return null;
    const svg = ui.svg;
    const leveysCss = parseFloat(svg.style?.width ?? '');
    const korkeusCss = parseFloat(svg.style?.height ?? '');
    if (!(leveysCss > 0) || !(korkeusCss > 0)) return null;
    const kerrokset = this.keraaKerrokset();
    /*
     * EI MERKKEJÄ, EI RASTERIA. Silloin eleen aikana ei myöskään ole
     * mitään, mikä voisi kadota — kutsuja saa epätoden ja jättää svg:n
     * rauhaan, mikä on tässä tapauksessa myös halvin vaihtoehto.
     */
    if (!kerrokset.length) return null;
    const mitoitus = mitoitaMerkkirasteri({
      leveysCss,
      korkeusCss,
      profiili: valitseKarttapohjanProfiili({
        leveys: globalThis.innerWidth ?? leveysCss,
        korkeus: globalThis.innerHeight ?? korkeusCss,
        kosketus: (globalThis.navigator?.maxTouchPoints ?? 0) > 0,
      }),
    });
    // Lavan pikselit yksikköä kohti luetaan lavan omista mitoista eikä
    // zoomSkaalasta, jotta pyöristys on täsmälleen sama kuin svg:llä.
    const pxPerYks = leveysCss / ikkuna.w;
    let merkkeja = 0;
    for (const g of kerrokset) merkkeja += g.childElementCount;
    return {
      x: ikkuna.x,
      y: ikkuna.y,
      w: ikkuna.w,
      h: ikkuna.h,
      leveysCss,
      korkeusCss,
      pxPerYks,
      kerroin: mitoitus.kerroin,
      leveysPx: mitoitus.leveysPx,
      korkeusPx: mitoitus.korkeusPx,
      kerrokset,
      kerroksia: kerrokset.length,
      merkkeja,
      avain: this.merkkiAvain(kerrokset),
    };
  }

  /**
   * Merkkijoukon halpa tunnus.
   *
   * Kerroksen luokka kantaa tilan (`auki`, `fokuskohteet-piilossa`) ja
   * lapsimäärä merkkien määrän — ne kaksi kattavat kaikki
   * uudelleenrakennukset. Hienojakoiset muutokset (yksi merkki vaihtoi
   * symbolia) jäävät tästä ohi, ja ne poimii mutaatiovahti alla.
   */
  merkkiAvain(kerrokset) {
    return kerrokset.map((g) => `${g.getAttribute('class') ?? ''}:${g.childElementCount}`).join('|');
  }

  samaTila(a, b) {
    return a.x === b.x && a.y === b.y
      && a.leveysPx === b.leveysPx && a.korkeusPx === b.korkeusPx
      && a.kerroin === b.kerroin && a.pxPerYks === b.pxPerYks
      && a.avain === b.avain;
  }

  /**
   * Peittääkö rasteri sen, mitä ruudulla juuri nyt on?
   *
   * Sama kysymys ja sama laskenta kuin pohjacanvaksella
   * (js/karttapohja.js peittaaNakyvan) — ja tässä se on vieläkin
   * tärkeämpi: vajaa pohja näkyy pehmeänä reunana, mutta vajaa
   * merkkirasteri näkyy PUUTTUVINA MERKKEINÄ, eli täsmälleen sinä
   * vikana, jonka takia tämä moduuli on olemassa. Jos rasteri ei peitä,
   * elävä svg jää paikalleen.
   */
  peittaaNakyvan(t) {
    const ui = this.ui;
    const skaala = ui?.zoomSkaala;
    const mitat = ui?.paneKoko;
    if (!t || !(skaala > 0) || !(mitat?.w > 0) || !(mitat?.h > 0)) return false;
    if (!Number.isFinite(ui.zoomVasenReuna) || !Number.isFinite(ui.zoomYlaReuna)) return false;
    const x0 = ui.zoomVasenReuna - (ui.panX ?? 0) / skaala;
    const y0 = ui.zoomYlaReuna - (ui.panY ?? 0) / skaala;
    const x1 = x0 + mitat.w / skaala;
    const y1 = y0 + mitat.h / skaala;
    const vara = 0.5 / Math.max(1e-6, t.pxPerYks);
    return x0 >= t.x - vara && y0 >= t.y - vara
      && x1 <= t.x + t.w + vara && y1 <= t.y + t.h + vara;
  }

  /* --- näkyvä rasteri ------------------------------------------------ */

  /**
   * Rasteri paikalleen — myös silloin, kun lava on sen jälkeen
   * vaihtunut. Täsmälleen sama laskenta kuin js/karttapohja.js
   * paikoitaCanvas, ja samasta syystä: muunnos on kompositorin työtä
   * eikä maalausta, joten venytetty rasteri on ilmainen ja OIKEASSA
   * KOHDASSA.
   */
  paikoitaCanvas() {
    const c = this.canvas;
    const t = this.tila;
    if (!c || !t) return;
    const leveys = `${t.leveysCss}px`;
    const korkeus = `${t.korkeusCss}px`;
    if (c.style.width !== leveys) c.style.width = leveys;
    if (c.style.height !== korkeus) c.style.height = korkeus;
    const ui = this.ui;
    const skaala = ui?.zoomSkaala;
    const vasen = ui?.zoomVasenReuna;
    const yla = ui?.zoomYlaReuna;
    let muunnos = '';
    if (skaala > 0 && t.pxPerYks > 0 && Number.isFinite(vasen) && Number.isFinite(yla)) {
      const k = skaala / t.pxPerYks;
      const tx = (t.x - vasen) * skaala;
      const ty = (t.y - yla) * skaala;
      if (Math.abs(k - 1) > 1e-4 || Math.abs(tx) > 0.01 || Math.abs(ty) > 0.01) {
        muunnos = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${k.toFixed(4)})`;
      }
    }
    if (c.style.transform !== muunnos) c.style.transform = muunnos;
  }

  /**
   * Canvas karttakuoreen svg:n PÄÄLLE.
   *
   * Pohjacanvas on kuoren ensimmäinen lapsi ja `z-index: -1`, koska se
   * on lavan varjo; merkkirasteri on päinvastainen — se on lavan
   * päällyste, ja sen on peitettävä pohja täsmälleen kuten svg:n merkit
   * peittävät. Siksi se menee viimeiseksi lapseksi, ja css antaa sille
   * kuoren omassa pinossa tason svg:n yläpuolelta mutta nopan alta.
   *
   * `willReadFrequently` on POIS: tuotantopolulla ei ole yhtään
   * getImageData-luentaa.
   */
  varmistaCanvas(tavoite) {
    const doc = globalThis.document;
    const kuori = this.ui?.karttaKuori;
    if (!doc || !kuori) return null;
    if (!this.canvas) {
      const c = doc.createElement('canvas');
      c.className = 'karttamerkit';
      c.setAttribute('aria-hidden', 'true');
      kuori.appendChild(c);
      this.canvas = c;
      this.ctx = c.getContext('2d', { alpha: true });
      if (this.ctx) this.ctx.imageSmoothingQuality = 'high';
    }
    const c = this.canvas;
    if (c.width !== tavoite.leveysPx || c.height !== tavoite.korkeusPx) {
      c.width = tavoite.leveysPx;
      c.height = tavoite.korkeusPx;
      if (this.ctx) this.ctx.imageSmoothingQuality = 'high';
    }
    return c;
  }

  /* --- paisto -------------------------------------------------------- */

  async paista(tavoite, syy) {
    this.paistoKesken = true;
    this.uusiPyynto = false;
    const alku = performance.now();
    try {
      const xml = await this.kokoaXml(tavoite);
      if (!xml) { this.hylkyja += 1; return; }
      const kuva = await this.lataaKuva(xml);
      if (!kuva) { this.hylkyja += 1; return; }
      /*
       * VIIMEINEN TARKISTUS ENNEN PIIRTOA. Odotusten aikana on voinut
       * alkaa ele, lauta vaihtua tai merkit rakentua uusiksi. Piirto
       * ELÄVÄÄN canvakseen olisi silloin juuri se puoliksi valmis
       * rasteri, jota tämän moduulin ainoa puskuri ei kestäisi — ja
       * tarkistuksen ja piirron välissä ei voi tapahtua mitään, koska
       * ne ovat samaa synkronista lohkoa.
       */
      if (this.ui?.dead || this.rasteriNakyy || this.eleKaynnissa()) {
        this.hylkyja += 1;
        this.uusiPyynto = true;
        return;
      }
      const canvas = this.varmistaCanvas(tavoite);
      const ctx = this.ctx;
      if (!canvas || !ctx) { this.hylkyja += 1; return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(kuva, 0, 0, canvas.width, canvas.height);
      this.tila = tavoite;
      this.tuore = true;
      this.paistoja += 1;
      this.viimeisinKesto = performance.now() - alku;
      this.viimeisinSyy = syy;
      this.paikoitaCanvas();
    } catch {
      // Epäonnistunut paisto ei saa rikkoa karttaa: rasteri jää
      // vanhentuneeksi ja ele kulkee elävällä svg:llä kuten ennen.
      this.hylkyja += 1;
    } finally {
      this.paistoKesken = false;
      if (this.uusiPyynto && !this.ui?.dead) {
        this.uusiPyynto = false;
        this.ajastaUusiYritys();
      }
    }
  }

  /**
   * Kerrokset yhdeksi irralliseksi SVG-dokumentiksi.
   *
   * Ikkuna on LAVAN ikkuna ja mitat lavan css-mitat, joten piirretty
   * kuva osuu canvakselle pikselilleen samaan kohtaan kuin svg on
   * ruudulla — sama lupaus kuin pohjacanvaksella.
   */
  async kokoaXml(tavoite) {
    const svg = this.ui?.svg;
    if (!svg || typeof XMLSerializer === 'undefined') return null;
    const juuri = svg.getScreenCTM?.();
    if (!juuri) return null;
    const kaanteinen = juuri.inverse();
    const sarjallistin = new XMLSerializer();
    const osat = [];
    for (const g of tavoite.kerrokset) {
      const klooni = this.merkkiKlooni(g);
      if (!klooni?.firstElementChild) continue;
      await this.upotaKuvat(klooni);
      /*
       * KERROKSEN OMA PAIKKA MUKAAN. Nippuviivat asuvat board-rootissa
       * ja muut svg:n juuressa; ryhmän ja juuren CTM:ien erotus antaa
       * muunnoksen juuren koordinaatistoon riippumatta siitä, montako
       * siirtoa välissä on (sama temppu kuin js/mapart.js
       * laatikkoJuuressa). Kloonin OMA transform on poistettu
       * merkkiKloonissa, koska getScreenCTM sisältää sen jo — muuten se
       * sovellettaisiin kahdesti.
       */
      const m = kaanteinen.multiply(g.getScreenCTM());
      const matriisi = `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`;
      osat.push(`<g transform="${matriisi}">${sarjallistin.serializeToString(klooni)}</g>`);
    }
    if (!osat.length) return null;
    const defs = this.kokoaDefs(sarjallistin);
    return '<svg xmlns="http://www.w3.org/2000/svg"'
      + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
      + ` viewBox="${tavoite.x} ${tavoite.y} ${tavoite.w} ${tavoite.h}"`
      + ` width="${tavoite.leveysCss}" height="${tavoite.korkeusCss}">`
      + `${defs}${osat.join('')}</svg>`;
  }

  /**
   * Laudan <defs> mukaan, sarjallistettuna KERRAN.
   *
   * Merkkien tyylit tulevat elementteihin (tyylitSisaan), mutta arvo voi
   * silti olla viittaus — `fill: url(#jokin)` — eikä irrallisessa
   * SVG:ssä ole mitään, mihin viitata. Määrittelyt eivät vaihdu kuin
   * laudan mukana, joten ne sarjallistetaan vain kun niiden lapsimäärä
   * tai viimeinen tunnus muuttuu; ilman tätä sama iso lohko
   * kirjoitettaisiin uusiksi joka paistolla.
   */
  kokoaDefs(sarjallistin) {
    const defs = this.ui?.svg?.querySelector?.('defs');
    if (!defs) return '';
    const avain = `${defs.childElementCount}|${defs.lastElementChild?.id ?? ''}`;
    if (avain !== this.defsAvain) {
      this.defsAvain = avain;
      this.defsXml = sarjallistin.serializeToString(defs);
    }
    return this.defsXml;
  }

  /**
   * Tyylitelty klooni, josta piilotetut solmut on karsittu.
   *
   * tyylitSisaan kopioi värit, viivat ja kirjasimet — muttei
   * `display`-määrettä, koska laudan taiteessa sellaisia ei ole.
   * Merkkikerroksissa on: sammuneet valotäplät (js/karttavalot.js),
   * korostukset ja osumaympyrät ovat päällä tai pois luokan mukaan.
   * Ilman karsintaa rasteri sytyttäisi ne kaikki.
   */
  merkkiKlooni(g) {
    let klooni;
    try { klooni = tyylitSisaan(g); } catch { return null; }
    if (!klooni) return null;
    // getScreenCTM sisältää ryhmän oman siirron; kääre soveltaa sen.
    klooni.removeAttribute('transform');
    const elavat = [g, ...g.querySelectorAll('*')];
    const kloonit = [klooni, ...klooni.querySelectorAll('*')];
    // Rakenne-ero on mahdollinen vain, jos tyylitSisaan on palauttanut
    // kloonin koskemattomana; silloin karsintaakaan ei voi kohdistaa.
    if (elavat.length !== kloonit.length) return klooni;
    const poistettavat = [];
    for (let i = 1; i < elavat.length; i++) {
      const laskettu = globalThis.getComputedStyle?.(elavat[i]);
      if (!laskettu) continue;
      if (laskettu.display === 'none' || laskettu.visibility === 'hidden') {
        poistettavat.push(kloonit[i]);
      }
    }
    for (const solmu of poistettavat) solmu.remove();
    return klooni;
  }

  /**
   * Ulkoiset <image>-viittaukset data-URLeiksi.
   *
   * Selain ei lataa <img>-kontekstissa olevaan SVG:hen mitään ulkoa,
   * joten eläintäkyjen symboli jäisi tyhjäksi. Osoitteita on
   * käytännössä yksi ja kuvia 58, joten haut kootaan joukoksi ja
   * odotetaan kerralla.
   */
  async upotaKuvat(klooni) {
    const kuvat = [...klooni.querySelectorAll('image')];
    if (!kuvat.length) return;
    const osoitteet = new Set();
    for (const kuva of kuvat) {
      const h = kuva.getAttribute('href') || kuva.getAttribute('xlink:href') || '';
      if (h && !h.startsWith('data:')) osoitteet.add(h);
    }
    const taulu = new Map();
    await Promise.all([...osoitteet].map(async (osoite) => {
      taulu.set(osoite, await merkkirasteriKuvaksi(osoite));
    }));
    for (const kuva of kuvat) {
      const h = kuva.getAttribute('href') || kuva.getAttribute('xlink:href') || '';
      const uusi = h.startsWith('data:') ? h : taulu.get(h);
      // Kuva, jota ei saatu: pois kokonaan. Rikkinäinen viittaus
      // kaataisi koko blobin latauksen, ja yksi puuttuva symboli on
      // pienempi vahinko kuin rasteri, jota ei ole.
      if (!uusi) { kuva.remove(); continue; }
      kuva.removeAttribute('xlink:href');
      kuva.setAttribute('href', uusi);
    }
  }

  /**
   * XML kuvaksi blobin kautta — sama reitti kuin laudan taiteella
   * (js/mapart.js avaaTaidelahde). Osoite vapautetaan heti latauksen
   * jälkeen: dokumentti on silloin jo jäsennetty, ja piirto tapahtuu
   * siitä eikä osoitteesta.
   */
  async lataaKuva(xml) {
    if (typeof Blob !== 'function' || typeof URL?.createObjectURL !== 'function') return null;
    const osoite = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    try {
      return await new Promise((valmis, virhe) => {
        const k = new Image();
        k.onload = () => valmis(k);
        k.onerror = () => virhe(new Error('merkkirasteri ei latautunut'));
        k.src = osoite;
      });
    } finally {
      URL.revokeObjectURL(osoite);
    }
  }

  /* --- vahdit ja ajastus --------------------------------------------- */

  ajastaUusiYritys() {
    if (this.ajastin) return;
    this.ajastin = setTimeout(() => {
      this.ajastin = 0;
      this.paivita('vahti');
    }, MERKKIRASTERI_RAUHA_MS);
  }

  /**
   * MERKKIVAHTI. Merkit rakentuvat uusiksi monesta kohdasta — maan
   * vaihto, zoomin rasteriporras, avattu kohde, sytytetty aihevalo — ja
   * jokaisen kutsupaikan kytkeminen tähän moduuliin olisi neljä
   * tiedostoa lisää muutettavaksi joka kerta kun kerroksia tulee uusi.
   * Mutaatiovahti huomaa ne kaikki yhdestä paikasta ja merkitsee
   * rasterin vanhentuneeksi.
   *
   * VANHENTUNUT EI OLE HYLÄTTY. Rasteri jää canvakselle: jos ele alkaa
   * ennen kuin uusi ehtii paistua, vanha kelpaa yhä — merkit ovat
   * ruudulla, ja niiden pieni jälkeenjääneisyys on kertaluokkaa
   * pienempi vika kuin merkitön kartta.
   */
  varmistaVahdit() {
    if (typeof MutationObserver !== 'function') return;
    /*
     * Irronneet kerrokset pois ENSIN: js/fokuskohteet.js
     * varmistaKohdekerros luo ryhmän uudestaan, jos vanha on irronnut
     * svg:stä, ja kuollutta solmua vahtiva tarkkailija jäisi
     * roikkumaan istunnon loppuun.
     */
    for (const [g, vahti] of this.vahdit) {
      if (g.isConnected) continue;
      vahti.disconnect();
      this.vahdit.delete(g);
    }
    for (const g of this.keraaKerrokset()) {
      if (this.vahdit.has(g)) continue;
      const vahti = new MutationObserver(() => {
        this.tuore = false;
        this.ajastaUusiYritys();
      });
      vahti.observe(g, { childList: true, subtree: true, attributes: true });
      this.vahdit.set(g, vahti);
    }
  }
}
