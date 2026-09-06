/*
 * PULU NÄYTTÄÄ PAIKAN KARTALLA — kamera-ajo, väliaikainen merkki ja
 * Palaa-nappi.
 *
 * OMISTAJAN TILAUS 6.9.2026 (ilta, iPad, keskustelu jossa pelaaja
 * kirjoitti pululle *"Missä Sparta on?"*, sanatarkasti): *"Olisiko
 * pulun mahdollista näyttää joku kohta kartalla kysyttäessä, niin että
 * kamera lentäisi sinne? Sitten jonnekin tulisi palaa nappi jolla
 * pääsisi lähtöpaikkaan takaisin."*
 *
 * Raamattu, KAMERA PELIN KÄSISSÄ: *"peli siirtää karttaa itse pelin
 * edetessä (kamera-ajot), mutta käsin liikuttelu SALLITAAN
 * VALLOITETULLA ALUEELLA JA SEN LÄHEISYYDESSÄ"*. Näyttö on PELIN OMA
 * AJO eikä käsin liikuttelua, joten se saa viedä kameran valloitetun
 * alueen ulkopuolelle — täsmälleen kuten aloituslento ja kohdesovitus
 * vievät. Käsin liikuttelun rajaan ei kosketa: js/kartta.js
 * rajaaKasinPan ajetaan yhä jokaisella sormieleellä, joten ajon jälkeen
 * ensimmäinen veto palauttaa pelaajan sallitulle alueelle. Palaa-nappi
 * on olemassa juuri siksi, ettei paluu jäisi sen varaan.
 *
 * ── KOLME OSAA ────────────────────────────────────────────────────
 *
 *  1. PAIKAN TUNNISTUS. Kohde ratkaistaan ENSIN pelin omista
 *     aineistoista (kaupungit, karttanimet, maastokohteet,
 *     fokuskohteet, kohdekarttojen kohteet) ja VASTA SITTEN workerin
 *     antamista koordinaateista. Järjestys on tarkoituksellinen: pelin
 *     oma piste osuu laudalle täsmälleen, ja se on tarkistettua
 *     aineistoa — mallin antama koordinaatti on arvio, ja arvio saa
 *     olla vain siellä, missä omaa tietoa ei ole (Sparta, Troija,
 *     Babylon ja muut, joita laudalla ei ole).
 *
 *  2. KAMERA-AJO KULKEE KAHDEN LAUDASTA RIIPPUMATTOMAN KAHVAN LÄPI, ja
 *     ne ovat pelissä ennestään:
 *
 *       ui.kamera().ajaKamera(...)  laudan valitsema kameradelegaatti
 *                                   (tasokartalla js/kartta.js, pallolla
 *                                   js/pallolauta/kamera.js)
 *       ui.nakyvaAlue()             näkyvä alue laudan yksiköissä; js/ui.js
 *                                   delegoi sen pallolle, kun pallo on
 *                                   hereillä
 *
 *     Siksi TÄSSÄ TIEDOSTOSSA EI OLE LAUTAHAARAA — sama apuri palvelee
 *     kumpaakin lautaa, ja se on testattu asia
 *     (tests/pollo-paikka.test.mjs).
 *
 *  3. MERKKI JA PALAA-NAPPI. Merkki on pulun sulka nimilapun kanssa,
 *     ja se elää karttaruudun päällä HTML-kerroksena — ei SVG-solmuna
 *     eikä pallon pintamerkkinä, koska sama koodi on saatava
 *     molemmille laudoille. Paikka lasketaan joka kehyksellä näkyvästä
 *     alueesta:
 *
 *         ruutuX = paneW/2 + (kohde.x - keskus.x) * skaala
 *
 *     Tasokartalla tämä on TARKKA: ui.nakyvaAlue lukee näkymän
 *     RUUDULTA, joten siinä on mukana myös kesken olevan ajon ja
 *     panoroinnin CSS-muunnos. Pallolla se on tarkka näkymän keskellä
 *     ja likimääräinen reunoilla (pallon pinta kaartuu); koska ajo VIE
 *     kohteen keskelle, virhe on nolla juuri silloin kun merkki
 *     näytetään. Kun merkki ajautuu ruudun ulkopuolelle — pelaaja on
 *     itse liikuttanut karttaa — se häivytetään pois sen sijaan että
 *     se valehtelisi.
 */

import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';
import { MAASTOKOHTEET } from './packs/maastokohteet.js';
import { MAAKARTAT, KAUPUNKIKARTAT } from './packs/maakartat.js';
import { KOHDE_MAAT } from './fokuskohteet.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { html } from './ui-apurit.js';
import { asetaPaikkanaytto } from './pollo.js';

/* ================================================================
 * VAKIOT
 * ================================================================ */

/** Kamera-ajon kesto. Sama luokka kuin kohdesovituksella. */
export const PAIKKA_AJO_MS = 1500;
/** Paluuajo on hitusen ripeämpi: pelaaja tietää jo mihin ollaan menossa. */
export const PALUU_AJO_MS = 1200;
/** Merkki häipyy itsestään, jos pelaaja unohtaa Palaa-napin. */
export const MERKIN_IKA_MS = 60000;

/**
 * NÄKYVÄ LEVEYS KOHTEEN TYYPIN MUKAAN (lautayksikköä ruudun leveydellä;
 * maailmankartta on 12000 yksikköä = 360°).
 *
 * Kaupunki saa saapumisnäkymän luokkaa olevan lähikuvan — sen mitä
 * pelaaja näkee laskeutuessaan kaupunkiin (js/pallolauta/kamera.js
 * PALLOLAUDAN_SAAPUMISLEVEYS 240). Vuori, joki ja meri ovat isoja
 * muotoja: niistä ei näe mitään, jos kamera menee kaupungin
 * korkeuteen, joten ne saavat oman väljemmän portaansa.
 */
export const PAIKAN_LEVEYDET = {
  kaupunki: 260,
  kohde: 320,
  vuori: 700,
  jarvi: 700,
  alue: 1200,
  joki: 1800,
  meri: 1800,
  vuoristo: 1800,
  maa: 2600,
};
/** Tuntematon tyyppi: kaupungin ja alueen väliltä. */
export const PAIKAN_OLETUSLEVEYS = 600;

/* ================================================================
 * 1. NIMIHAKU — PUHTAAT FUNKTIOT
 * ================================================================ */

/**
 * Nimi vertailumuotoon: pienet kirjaimet, diakriitit pois, väliviivat
 * ja välimerkit väleiksi.
 *
 * DIAKRIITIT POIS, MYÖS Ä JA Ö. Pelin aineistossa on `Taÿ́getos`,
 * `Ólympos`, `Náfplio` ja `Píndos`; pelaaja kirjoittaa ne ilman
 * aksentteja. Suomen ä ja ö menevät samalla a:ksi ja o:ksi — se on
 * suomen kannalta karkeaa mutta haussa harmitonta, koska molemmat
 * puolet normalisoidaan samalla kaavalla eikä vertailussa ole muita
 * ehdokkaita erottamassa.
 */
export function normalisoiPaikannimi(teksti) {
  return String(teksti ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/*
 * TAIVUTUS: YKSINKERTAINEN KANTASANAHAKU RIITTÄÄ.
 *
 * "Spartan", "Spartaan", "Spartassa" ja "Spartasta" alkavat kaikki
 * kannalla "sparta", ja pääte on 1–4 kirjainta suomen sijapäätteiden
 * joukosta. Tämä ei ole morfologinen jäsennin eikä yritä olla:
 * astevaihtelu (Tampere → Tampereen) ja vokaalin muutos (Rooma →
 * Roomaan on kunnossa, mutta Ateena → Ateenaan myös) hoituvat
 * prefiksisäännöllä, ja loput jäävät löytymättä. Väärä osuma on
 * pahempi kuin löytymättä jäänyt: siksi pääte on rajattu listaan eikä
 * mihin tahansa neljään kirjaimeen.
 */
const SIJAPAATTEET = [
  '', 'n', 'a', 'aa', 'an', 'en', 'in', 'on', 'un', 'na', 'ta', 'ssa', 'sta',
  'lla', 'lta', 'lle', 'ksi', 'tta', 'ita', 'seen', 'han', 'hen', 'hin',
  'hon', 'hun', 'sa', 'ien', 'ja', 'lda',
];
const PAATE_JOUKKO = new Set(SIJAPAATTEET);

/**
 * Vastaako haettu sana (mahdollisesti taivutettuna) nimeä?
 *
 * @param {string} haku pelaajan kirjoittama sana, normalisoituna
 * @param {string} nimi aineiston nimi, normalisoituna
 */
export function nimiOsuu(haku, nimi) {
  if (!haku || !nimi) return false;
  if (haku === nimi) return true;
  if (!haku.startsWith(nimi)) return false;
  const hanta = haku.slice(nimi.length);
  if (hanta.length > 4) return false;
  return PAATE_JOUKKO.has(hanta);
}

/**
 * Onko kysymys sijaintia koskeva?
 *
 * Pulu ei lennätä kameraa joka vastauksella — se olisi sietämätöntä.
 * Näyttö laukeaa vain kysymyksestä, joka oikeasti kysyy paikkaa
 * ("Missä Sparta on?", "Näytä Kreeta kartalla", "Missä päin Nilus
 * virtaa?"), tai siitä että worker itse merkitsi vastaukseensa
 * paikkakentän.
 */
export function onPaikkakysymys(teksti) {
  const t = normalisoiPaikannimi(teksti);
  if (!t) return false;
  if (/(^| )(missa|mihin|mista|minne)( |$)/.test(t)) return true;
  if (/(kartalla|kartalle|kartalta)/.test(t)) return true;
  return /(sijaits|sijainti|paikanna)/.test(t);
}

/*
 * KYSYMYSSANAT JA MUUT TAVALLISET SANAT EIVÄT OLE PAIKKOJA.
 *
 * Ilman tätä "Missä Nilus on?" voisi osua kaupunkiin nimeltä "On"
 * (ei ole) tai maastokohteeseen "Missa" (ei ole) — mutta ennen
 * kaikkea lyhyet aineistonimet ("Po", "Ur") osuisivat mihin tahansa.
 * Kaksi vahtia: sanaston estolista ja kolmen merkin vähimmäispituus
 * sille, mikä ylipäätään kelpaa hauksi.
 */
const PAIKAN_OHITETTAVAT = new Set(normalisoiPaikannimi(
  'missa mihin mista minne mika mita miksi milloin kuka kuinka onko '
  + 'kartalla kartalle kartalta kartta naytatko nayta kerro sijaitsee '
  + 'sijainti paikanna ja tai mutta kun jos siis niin sen se ne tuo '
  + 'tama nyt myos oli olen ollut ovat kaupunki maa joki vuori jarvi '
  + 'meri saari maailma taalla siella',
).split(' '));

/** Lyhin sana, joka kelpaa paikannimen hauksi. */
const HAUN_VAHIN_PITUUS = 3;

/**
 * Etsii tekstistä paikan hakemistosta.
 *
 * PISIN OSUMA VOITTAA. "Missä Iso Orjajärvi on?" osuu sekä nimeen
 * "Iso Orjajärvi" että (jos sellainen olisi) nimeen "Orjajärvi";
 * pidempi nimi on aina tarkempi vastaus. Tasapelissä hakemiston
 * järjestys ratkaisee, ja hakemisto on koottu tarkin lähde ensin.
 *
 * @param {string} teksti pelaajan kysymys tai pulun vastaus
 * @param {Array<{nimi: string, x: number, y: number}>} hakemisto
 * @returns {object|null} hakemiston rivi sellaisenaan
 */
export function etsiPaikka(teksti, hakemisto) {
  const sanat = normalisoiPaikannimi(teksti).split(' ').filter(Boolean);
  if (!sanat.length || !Array.isArray(hakemisto)) return null;
  let paras = null;
  let parasPituus = 0;
  for (const kohta of hakemisto) {
    const nimi = kohta?.avain;
    if (!nimi || nimi.length < HAUN_VAHIN_PITUUS) continue;
    if (nimi.length <= parasPituus) continue;
    const osat = nimi.split(' ');
    // Yksisanainen nimi, joka on tavallista sanastoa, ei ole paikka.
    if (osat.length === 1 && PAIKAN_OHITETTAVAT.has(nimi)) continue;
    if (osat.length > sanat.length) continue;
    for (let i = 0; i + osat.length <= sanat.length; i += 1) {
      // Nimen kaikki sanat paitsi viimeinen täsmäävät sellaisenaan;
      // viimeinen saa olla taivutettu ("Egeanmeren", "Spartaan").
      let osuu = true;
      for (let k = 0; k < osat.length - 1 && osuu; k += 1) {
        if (sanat[i + k] !== osat[k]) osuu = false;
      }
      if (osuu && !nimiOsuu(sanat[i + osat.length - 1], osat[osat.length - 1])) osuu = false;
      if (osuu) {
        paras = kohta;
        parasPituus = nimi.length;
        break;
      }
    }
  }
  return paras;
}

/**
 * Kelpaavatko workerin antamat asteet?
 *
 * Malli voi hallusinoida koordinaatin, unohtaa kentän tai kirjoittaa
 * sen väärin päin. Kolme vahtia: luvun pitää olla äärellinen, mahtua
 * asteikolleen, eikä se saa olla täsmälleen nolla-nolla — Guineanlahden
 * "Null Island" on tyhjän kentän tavallisin oletusarvo, ei paikka josta
 * kukaan kysyy.
 */
export function kelpaakoAsteet(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return false;
  return !(lat === 0 && lon === 0);
}

/** Näkyvä leveys kohteen tyypin mukaan. */
export function paikanLeveys(tyyppi) {
  return PAIKAN_LEVEYDET[String(tyyppi ?? '').toLowerCase()] ?? PAIKAN_OLETUSLEVEYS;
}

/* ================================================================
 * 2. LÄHTÖNÄKYMÄN TALTEENOTTO — PUHTAAT FUNKTIOT
 * ================================================================ */

/**
 * Näkymä laudan yksiköissä: keskipiste, näkyvä leveys ja mittakaava.
 *
 * LUKU TULEE `ui.nakyvaAlue()`:STA, joka on jo valmiiksi laudasta
 * riippumaton (js/ui.js: pallolaudalla se delegoi pallon kameralle).
 * Sama luku kelpaa sekä lähtönäkymän talteenottoon että sen
 * tarkistamiseen, palasiko pelaaja takaisin — siksi tässä on yksi
 * funktio eikä kahta.
 *
 * Leveys eikä zoomikerroin, koska leveys on se, minkä MOLEMMAT laudat
 * ymmärtävät samalla tavalla (ajaKamera { x, y, leveys }). Kerroin on
 * tasokartan sisäinen käsite eikä tarkoita pallolla mitään.
 *
 * @param {object} ui pelin käyttöliittymä
 * @returns {{x: number, y: number, leveys: number, skaala: number}|null}
 */
export function lahtonakyma(ui) {
  const alue = ui?.nakyvaAlue?.();
  if (!alue || !(alue.w > 0) || !Number.isFinite(alue.x) || !Number.isFinite(alue.y)) return null;
  return {
    x: alue.x + alue.w / 2, y: alue.y + alue.h / 2, leveys: alue.w, skaala: alue.skaala,
  };
}

/**
 * Onko näkymä palannut lähtöpaikkansa lähelle?
 *
 * Palaa-nappi katoaa myös silloin, kun pelaaja itse vetää kartan
 * takaisin — nappi, joka ei enää tee mitään, on pelkkää kalustetta.
 * Sieto on suhteellinen: kymmenesosa näkyvästä leveydestä sivuun ja
 * runsas neljännes zoomia (log 0,25 ≈ kerroin 1,28).
 */
export function nakymaPalasi(tila, alku) {
  if (!tila || !alku || !(alku.leveys > 0) || !(tila.leveys > 0)) return false;
  const matka = Math.hypot(tila.x - alku.x, tila.y - alku.y);
  if (matka > alku.leveys * 0.1) return false;
  return Math.abs(Math.log(tila.leveys / alku.leveys)) < 0.25;
}

/**
 * Paluuajo tallennettuun lähtönäkymään.
 *
 * Sama kutsu kummallakin laudalla — tämä on se apuri, jonka
 * molemmat laudat jakavat (tests/pollo-paikka.test.mjs vartioi, ettei
 * tiedostoon ilmesty lautahaaraa).
 */
export function paluuAjo(kamera, alku, { kesto = PALUU_AJO_MS } = {}) {
  if (!kamera?.ajaKamera || !alku || !(alku.leveys > 0)) return Promise.resolve(false);
  return kamera.ajaKamera({ x: alku.x, y: alku.y, leveys: alku.leveys }, { kesto, sovita: true });
}

/* ================================================================
 * 3. HAKEMISTO PELIN OMISTA AINEISTOISTA
 * ================================================================ */

/** Yksi hakemistorivi. `avain` on normalisoitu nimi, `nimi` näytettävä. */
function paikkarivi(nimi, x, y, tyyppi, lahde) {
  if (!nimi || !Number.isFinite(x) || !Number.isFinite(y)) return null;
  const avain = normalisoiPaikannimi(nimi);
  if (!avain || avain.length < HAUN_VAHIN_PITUUS) return null;
  return { avain, nimi: String(nimi), x, y, tyyppi, lahde };
}

/** Joen keskikohta: pisteiden keskimmäinen. Nimi on siinä kartallakin. */
function joenKeskus(pisteet) {
  if (!Array.isArray(pisteet) || !pisteet.length) return null;
  const p = pisteet[Math.floor(pisteet.length / 2)];
  return Array.isArray(p) ? { x: p[0], y: p[1] } : null;
}

/**
 * Kokoaa hakemiston laudan omista aineistoista.
 *
 * JÄRJESTYS ON TARKKUUSJÄRJESTYS (etsiPaikka: tasapelissä ensimmäinen
 * voittaa): laudan kaupungit ensin, sitten maan omat kohteet, sitten
 * maailmanlaajuiset karttanimet ja viimeisenä kohdekarttojen pisteet.
 *
 * PIENI JA LAISKA. Hakemisto rakennetaan vasta ensimmäisellä
 * kysymyksellä ja pidetään muistissa laudan tunnuksella — maastokohteet
 * ja fokuskohteet ovat yhteensä tuhansia rivejä, eikä niitä käydä läpi
 * jokaisella vastauksella.
 */
const HAKEMISTOT = new Map();

export function kokoaHakemisto(ui) {
  const lauta = ui?.game?.pack?.id;
  if (!lauta) return [];
  if (HAKEMISTOT.has(lauta)) return HAKEMISTOT.get(lauta);
  const ulos = [];
  const lisaa = (r) => { if (r) ulos.push(r); };

  // 1. Laudan kaupungit — pelin tarkin ja tutuin aineisto.
  for (const kaupunki of ui.game?.board?.cities ?? ui.game?.pack?.cities ?? []) {
    lisaa(paikkarivi(kaupunki?.name, kaupunki?.x, kaupunki?.y, 'kaupunki', 'kaupunki'));
  }

  // 2. Maiden kohteet ja maastokohteet (js/fokuskohteet.js KOHDE_MAAT,
  //    js/packs/maastokohteet.js) — kummankin paikka on laudoittain.
  for (const taulu of [KOHDE_MAAT, MAASTOKOHTEET]) {
    for (const kohteet of Object.values(taulu ?? {})) {
      for (const kohde of kohteet ?? []) {
        const paikka = kohde?.laudat?.[lauta];
        lisaa(paikkarivi(kohde?.nimi, paikka?.x, paikka?.y, kohde?.tyyppi ?? 'kohde', 'kohde'));
      }
    }
  }

  // 3. Maailmankartan omat nimet: joet, järvet ja vuoristot. Ne ovat
  //    laudan koordinaateissa vain maailmankartalla (tiedoston oma
  //    projektio), joten muilla laudoilla ne jätetään pois.
  if (lauta === 'maailmankartta') {
    for (const joki of MAAILMANKARTAN_NIMET.joet ?? []) {
      const keskus = joenKeskus(joki?.pisteet);
      lisaa(paikkarivi(joki?.nimi, keskus?.x, keskus?.y, 'joki', 'karttanimi'));
    }
    for (const jarvi of MAAILMANKARTAN_NIMET.jarvet ?? []) {
      lisaa(paikkarivi(jarvi?.nimi, jarvi?.x, jarvi?.y, 'jarvi', 'karttanimi'));
    }
    for (const vuori of MAAILMANKARTAN_NIMET.vuoret ?? []) {
      lisaa(paikkarivi(vuori?.nimi, vuori?.x, vuori?.y, 'vuoristo', 'karttanimi'));
    }
  }

  // 4. Kohdekarttojen pisteet (maakartat ja kaupunkikartat): asteina,
  //    joten ne projisoidaan laudalle samalla kaavalla kuin kaikki muu.
  for (const kartta of Object.values(MAAKARTAT ?? {})) {
    for (const kaupunki of kartta?.kaupungit ?? []) {
      const kohta = asteetLaudalle(lauta, kaupunki?.lat, kaupunki?.lon);
      lisaa(paikkarivi(kaupunki?.nimi, kohta?.x, kohta?.y, 'kaupunki', 'kohdekartta'));
    }
  }
  for (const kartta of Object.values(KAUPUNKIKARTAT ?? {})) {
    for (const kohde of kartta?.kohteet ?? []) {
      const kohta = asteetLaudalle(lauta, kohde?.lat, kohde?.lon);
      lisaa(paikkarivi(kohde?.nimi, kohta?.x, kohta?.y, 'kohde', 'kohdekartta'));
    }
  }

  HAKEMISTOT.set(lauta, ulos);
  return ulos;
}

/** Asteet laudan koordinaateiksi; null jos laudalla ei ole projektiota. */
export function asteetLaudalle(lauta, lat, lon) {
  if (!kelpaakoAsteet(lat, lon)) return null;
  return projisoiLaudalle(lauta, lon, lat) ?? null;
}

/* ================================================================
 * 4. PAIKAN RATKAISU
 * ================================================================ */

/**
 * Mihin kamera lennätetään?
 *
 * @param {object} p
 * @param {object} p.ui pelin käyttöliittymä
 * @param {string} p.kysymys pelaajan kysymys
 * @param {string} p.vastaus pulun vastaus (tyhjä, jos ei vielä ole)
 * @param {object|null} p.paikka workerin valinnainen kenttä
 *   `{ nimi, lat, lon, tarkkuus }`
 * @returns {{nimi: string, x: number, y: number, tyyppi: string,
 *   lahde: string}|null}
 */
export function ratkaisePaikka({
  ui = null, kysymys = '', vastaus = '', paikka = null,
} = {}) {
  if (!ui?.game?.pack?.id) return null;
  const kysytty = onPaikkakysymys(kysymys);
  const workerinNimi = typeof paikka?.nimi === 'string' ? paikka.nimi : '';
  // Ilman kysymystä ja ilman workerin kenttää ei ole aihetta lentää.
  if (!kysytty && !workerinNimi) return null;
  const hakemisto = kokoaHakemisto(ui);

  /*
   * OMA AINEISTO ENSIN. Haku tehdään kolmesta tekstistä
   * tärkeysjärjestyksessä: workerin nimeämä paikka, pelaajan kysymys ja
   * vasta viimeisenä vastausteksti. Vastaus on viimeisenä, koska siinä
   * vilahtaa nimiä, joita kukaan ei kysynyt ("Sparta oli Ateenan
   * kilpailija") — sitä käytetään vain, kun kysymys oli selvästi
   * paikkakysymys eikä kysymyksestä löytynyt mitään.
   */
  for (const teksti of [workerinNimi, kysymys, kysytty ? vastaus : '']) {
    if (!teksti) continue;
    const osuma = etsiPaikka(teksti, hakemisto);
    if (osuma) {
      return {
        nimi: osuma.nimi, x: osuma.x, y: osuma.y, tyyppi: osuma.tyyppi, lahde: osuma.lahde,
      };
    }
  }

  /*
   * VASTA SITTEN WORKERIN KOORDINAATIT. Kenttä on valinnainen ja
   * vanha worker ei lähetä sitä lainkaan — silloin tähän ei tulla,
   * ja peli toimii kuten ennenkin.
   */
  const kohta = asteetLaudalle(ui.game.pack.id, Number(paikka?.lat), Number(paikka?.lon));
  if (!kohta) return null;
  return {
    nimi: workerinNimi || String(paikka?.nimi ?? '').trim() || 'Tämä paikka',
    x: kohta.x,
    y: kohta.y,
    tyyppi: String(paikka?.tarkkuus ?? 'kaupunki'),
    lahde: 'worker',
  };
}

/* ================================================================
 * 5. NÄYTTÖ: KAMERA, MERKKI, PALAA-NAPPI
 * ================================================================ */

/** Pulun sulka viivapiirroksena, samalla kynällä kuin muut kuvakkeet. */
const SULKA_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" '
  + 'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" '
  + 'stroke-linejoin="round">'
  + '<path d="M18.4 4.6c1.4 3.6.6 7.6-2.2 10.4-2.3 2.3-5.3 3-8 2.3"/>'
  + '<path d="M18.4 4.6C14.6 4 10.7 5 8 7.7c-2.8 2.8-3.6 6.8-2.2 10.4"/>'
  + '<path d="M5.8 18.1 4 21"/>'
  + '<path d="M15.6 7.4 8.3 14.7"/>'
  + '</svg>';

/** Palaa-napin nuoli: sama viivakynä kuin muissa kartan napeissa. */
const PALUU_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" '
  + 'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
  + 'stroke-linejoin="round">'
  + '<path d="M10 6 4.6 11.4 10 16.8"/>'
  + '<path d="M4.6 11.4h9.2a5.6 5.6 0 0 1 0 11.2h-1.4"/>'
  + '</svg>';

/**
 * KAMERA IRTI MAAN IKKUNASTA AJON AJAKSI.
 *
 * Fokusmoodissa tasokartan kamera on lukittu maan fokuskuvan ikkunaan
 * (js/kartta.js asetaPan: *"FOKUSIKKUNA RAJAA MYÖS PELIN OMAN
 * NÄKYMÄN"*), ja lukko koskee myös pelin omia ajoja. Pulun näyttö osuu
 * usein toiseen maahan — Babylon, Kartago, Sparta pelaajan ollessa
 * muualla — joten ajon ajaksi käytetään SAMAA lippua kuin
 * aikajanalinssi (js/aikajana.js vapautaKamera): `ui.kameraVapaa`.
 *
 * LIPPU LASKETAAN, KUN NÄYTTÖ ON OHI TAI PELAAJA TARTTUU KARTTAAN.
 *
 * Ensimmäinen yritys laski sen heti perillä, mutta silloin seuraava
 * piirto rajasi kameran takaisin maan ikkunaan ja kartta liukui pois
 * juuri näytetyn paikan päältä (mitattu 6.9.2026, savuke-pulu-paikka:
 * Lontoo-näyttö valui Marseillen kohdalle). Lippu pidetään siis
 * päällä niin kauan kuin merkki on ruudulla — ja lasketaan
 *
 *   1. kun näyttö puretaan (Palaa, paluu omin käsin, aikakatkaisu), tai
 *   2. heti kun pelaaja koskee karttaan (pointerdown karttaruutuun).
 *
 * Kohta 2 on omistajan reunaehto sanatarkasti: KÄSIN LIIKUTTELUN RAJAT
 * PYSYVÄT ENNALLAAN. Pelin oma ajo saa ohittaa rajan kerran; sillä
 * hetkellä kun sormi tarttuu karttaan, pelaajan omat rajat ovat taas
 * voimassa (js/kartta.js rajaaKasinPan).
 *
 * tarkistaFokusZoomia EI kutsuta lipun laskiessa (toisin kuin
 * aikajanalinssissä): se ajaisi kameran takaisin maan ikkunaan juuri
 * silloin, kun pulu on lentänyt sen tarkoituksella muualle.
 *
 * Pallolaudalla lippua ei lue kukaan — pallon kamera on aina vapaa —
 * joten haaraa ei tarvita.
 */
function kameraVapaaksi(ui, vapaa) {
  if (!ui || Boolean(ui.kameraVapaa) === vapaa) return;
  ui.kameraVapaa = vapaa;
  // Rajaus ja zoomin pohja lasketaan lipun vaihtuessa uudelleen.
  ui.fokusAvain = null;
  ui.paivitaMaailmanRajaus?.();
}

/** Sormi karttaan → pelaajan omat rajat takaisin (ks. kameraVapaaksi). */
function palautaRajatKosketuksesta(naytto) {
  const pane = naytto.ui?.mapPane;
  if (!pane) return;
  const kasi = () => {
    naytto.kasiIrti = null;
    kameraVapaaksi(naytto.ui, false);
  };
  pane.addEventListener('pointerdown', kasi, { capture: true, once: true });
  naytto.kasiIrti = () => pane.removeEventListener('pointerdown', kasi, { capture: true });
}

/** Ainoa käynnissä oleva näyttö kerrallaan. */
let nykyinenNaytto = null;

/** Häivytyksen kesto: sama kuin css:n .pulu-paikkamerkki-siirtymä. */
const PAIKAN_HAIVYTYS_MS = 420;

/** Purkaa näytön: merkki, nappi, ajastimet ja kehyssilmukka. */
function pura(naytto, { heti = false, kameraJaaVapaaksi = false } = {}) {
  if (!naytto || nykyinenNaytto !== naytto) return;
  nykyinenNaytto = null;
  cancelAnimationFrame(naytto.kehys);
  clearTimeout(naytto.ajastin);
  naytto.kasiIrti?.();
  naytto.kasiIrti = null;
  // Paluuajo tarvitsee lipun vielä itse; se laskee sen perillä.
  if (!kameraJaaVapaaksi) kameraVapaaksi(naytto.ui, false);
  naytto.merkki?.classList.remove('esilla');
  naytto.nappi?.classList.remove('esilla');
  const poista = () => {
    naytto.merkki?.remove();
    naytto.nappi?.remove();
  };
  // Häivytys loppuun ennen poistoa: myös lopetus on liikettä, ja
  // kaikki liike animoidaan pehmeästi.
  if (heti || naytto.ui?.reducedMotion) poista();
  else setTimeout(poista, PAIKAN_HAIVYTYS_MS);
}

/**
 * Merkin paikka ruudulla.
 *
 * Ruudun mitat luetaan VÄLIMUISTISTA eikä joka kehyksellä: tämä ajetaan
 * requestAnimationFramessa, ja clientWidth pakottaisi tyylinlaskennan
 * (sama asettelupiiska kuin js/ui.js nakyvaAlue kuvaa).
 */
function paivitaMerkki(naytto) {
  const { ui, kohde } = naytto;
  const tila = lahtonakyma(ui);
  if (!tila || !(tila.skaala > 0)) return;
  const mitat = naytto.mitat;
  if (!mitat.w || !mitat.h) return;
  /*
   * KIERTÄVÄ LAUTA: maailmankartta toistuu laudan leveyden välein, ja
   * merkki piirretään siihen kopioon, joka on lähinnä näkymän
   * keskipistettä. Ilman tätä päivämäärärajan yli lennetty kohde
   * asettuisi ruudun ulkopuolelle vaikka se on juuri keskellä.
   */
  const jakso = ui.contentBox?.w ?? 0;
  let dx = kohde.x - tila.x;
  if (jakso > 0) dx -= Math.round(dx / jakso) * jakso;
  const x = mitat.w / 2 + dx * tila.skaala;
  const y = mitat.h / 2 + (kohde.y - tila.y) * tila.skaala;
  naytto.merkki.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  // Ruudun ulkopuolella merkki ei näyttäisi mitään, ja pallolla se on
  // kaukana keskeltä myös epätarkka: silloin se häivytetään pois sen
  // sijaan että se valehtelisi paikan.
  const hukassa = x < 0 || y < 0 || x > mitat.w || y > mitat.h;
  naytto.merkki.classList.toggle('haipyva', hukassa || naytto.vanhentunut);
}

/**
 * Kehyssilmukka: merkki seuraa karttaa, ja nappi katoaa kun pelaaja on
 * itse vetänyt näkymän takaisin lähtöpaikkansa lähelle.
 */
function seuraa(naytto) {
  let laskuri = 0;
  const askel = () => {
    if (nykyinenNaytto !== naytto) return;
    // Ruudun mitat kuudennen kehyksen välein: ikkunan koko voi muuttua,
    // mutta ei kolmeakymmentä kertaa sekunnissa.
    if (laskuri % 6 === 0) {
      const pane = naytto.ui?.mapPane;
      naytto.mitat = { w: pane?.clientWidth ?? 0, h: pane?.clientHeight ?? 0 };
    }
    paivitaMerkki(naytto);
    if (naytto.poistui && laskuri % 6 === 0) {
      const nyt = lahtonakyma(naytto.ui);
      if (nyt && nakymaPalasi(nyt, naytto.alku)) {
        pura(naytto);
        return;
      }
    }
    laskuri += 1;
    naytto.kehys = requestAnimationFrame(askel);
  };
  naytto.kehys = requestAnimationFrame(askel);
}

/** Palaa-nappi karttaruudun oikeaan ylälaitaan, karttaselitteen viereen. */
function teePalaaNappi(naytto) {
  const nappi = html('button', 'pulu-palaa');
  nappi.type = 'button';
  nappi.title = 'Palaa siihen näkymään, josta pulu lähti';
  nappi.setAttribute('aria-label', 'Palaa edelliseen karttanäkymään');
  const ikoni = html('span', 'pulu-palaa-ikoni');
  ikoni.setAttribute('aria-hidden', 'true');
  ikoni.innerHTML = PALUU_IKONI;
  nappi.appendChild(ikoni);
  nappi.appendChild(html('span', 'pulu-palaa-teksti', 'Palaa'));
  nappi.addEventListener('click', () => {
    const { ui } = naytto;
    kameraVapaaksi(ui, true);
    void paluuAjo(ui?.kamera?.(), naytto.alku).then(() => kameraVapaaksi(ui, false));
    pura(naytto, { kameraJaaVapaaksi: true });
  });
  return nappi;
}

/**
 * Väliaikainen merkki: piste kohdassa ja sen YLÄPUOLELLA VASEMMALLA
 * laatta, jossa on pulun sulka ja kohteen nimi.
 *
 * SUUNTA ON VASEN, EI OIKEA. Pulun paneeli on ruudun oikeassa
 * alanurkassa ja kamera keskittää kohteen ruudun keskelle, joten
 * oikealle kasvava nimilappu jäisi juuri keskustelun alle. Laatta
 * asemoidaan siksi nollan kokoiseen ankkuriin right/bottom-arvoilla:
 * ankkuri istuu kohdassa, ja laatta kasvaa siitä ylös vasemmalle
 * riippumatta nimen pituudesta.
 */
function teeMerkki(nimi) {
  const merkki = html('div', 'pulu-paikkamerkki');
  merkki.setAttribute('aria-hidden', 'true');
  merkki.appendChild(html('span', 'pulu-paikkapiste'));
  const laatta = html('span', 'pulu-paikkalaatta');
  const sulka = html('span', 'pulu-sulka');
  sulka.innerHTML = SULKA_IKONI;
  laatta.appendChild(sulka);
  laatta.appendChild(html('span', 'pulu-paikkalappu', nimi));
  merkki.appendChild(laatta);
  return merkki;
}

/**
 * Näyttää paikan: kamera-ajo, merkki ja Palaa-nappi.
 *
 * @returns {{nimi: string}|null} näytetty paikka, tai null jos näyttöä
 *   ei tehty (kohdetta ei ratkennut, karttaa ei ole)
 */
export function naytaPaikka({
  ui = null, kysymys = '', vastaus = '', paikka = null,
} = {}) {
  const kohde = ratkaisePaikka({
    ui, kysymys, vastaus, paikka,
  });
  if (!kohde) return null;
  const pane = ui?.mapPane;
  const kamera = ui?.kamera?.();
  if (!pane || !kamera?.ajaKamera) return null;
  const alku = lahtonakyma(ui);
  if (!alku) return null;

  /*
   * LÄHTÖNÄKYMÄ ON SE, JOSTA PULU LÄHTI — EI EDELLISEN NÄYTÖN MAALI.
   * Toinen paikkakysymys peräkkäin perii ensimmäisen lähtönäkymän,
   * jotta Palaa vie yhä sinne, missä pelaaja oli ennen kuin pulu alkoi
   * lennättää kameraa.
   */
  const peritty = nykyinenNaytto?.alku ?? null;
  pura(nykyinenNaytto, { heti: true });

  const naytto = {
    ui,
    kohde,
    alku: peritty ?? alku,
    merkki: teeMerkki(kohde.nimi),
    nappi: null,
    mitat: { w: pane.clientWidth, h: pane.clientHeight },
    kehys: 0,
    ajastin: 0,
    kasiIrti: null,
    poistui: false,
    vanhentunut: false,
  };
  naytto.nappi = teePalaaNappi(naytto);
  pane.appendChild(naytto.merkki);
  pane.appendChild(naytto.nappi);
  nykyinenNaytto = naytto;
  paivitaMerkki(naytto);
  seuraa(naytto);

  /*
   * AJO ON PELIN OMA (Raamattu, KAMERA PELIN KÄSISSÄ). Kohde voi olla
   * valloitetun alueen ulkopuolella — Sparta on Kreikassa, mutta
   * Babylon voi olla maassa, jossa pelaaja ei ole käynyt. Ajo ei kysy
   * sitä keneltäkään, koska KÄSIN liikuttelun raja (js/kartta.js
   * rajaaKasinPan) on voimassa ennallaan heti seuraavasta sormieleestä
   * — ajo ei muuta rajaa, se vain ohittaa sen kerran.
   */
  kameraVapaaksi(ui, true);
  void kamera.ajaKamera(
    { x: kohde.x, y: kohde.y, leveys: paikanLeveys(kohde.tyyppi) },
    { kesto: PAIKKA_AJO_MS, sovita: true },
  ).then(() => {
    if (nykyinenNaytto !== naytto) return;
    // Lukko takaisin heti, kun pelaaja tarttuu karttaan (ks. kameraVapaaksi).
    palautaRajatKosketuksesta(naytto);
    // Merkki nousee esiin vasta perillä: kesken lennon ruudulla on
    // pelkkä liike, kuten muissakin kamera-ajoissa.
    naytto.merkki.classList.add('esilla');
    const nyt = lahtonakyma(ui);
    /*
     * PALAA-NAPPI VAIN JOS ON MIHIN PALATA. Jos kohde oli jo ruudulla
     * samassa mittakaavassa, kamera ei liikkunut minnekään — nappi
     * olisi silloin pelkkä kaluste, joka ei tee mitään.
     */
    if (nyt && nakymaPalasi(nyt, naytto.alku)) {
      naytto.nappi.remove();
      naytto.nappi = null;
      return;
    }
    naytto.poistui = true;
    naytto.nappi.classList.add('esilla');
  });

  /*
   * MERKKI ON VÄLIAIKAINEN (omistajan tilaus: häipyy Palaa-napista tai
   * minuutin kuluttua). Nappi jää, kunnes paluu on tehty — se on
   * pelaajan tie takaisin eikä saa kadota alta.
   */
  naytto.ajastin = setTimeout(() => {
    if (nykyinenNaytto !== naytto) return;
    naytto.vanhentunut = true;
    naytto.merkki.classList.add('haipyva');
    if (!naytto.nappi) pura(naytto);
  }, MERKIN_IKA_MS);

  return { nimi: kohde.nimi };
}

/** Onko näyttö juuri nyt päällä? (savukkeet ja vartijat) */
export function paikkanayttoPaalla() {
  return Boolean(nykyinenNaytto);
}

/**
 * Kytkee pulun paikannuksen: js/pollo.js kutsuu tätä jokaisen
 * kysymyksen ja vastauksen kohdalla eikä tiedä laudasta mitään.
 *
 * Kytkentä on js/main.js:ssä samalla kaavalla kuin kohdekerroksen
 * lisälähteet (kytkeFokusnosto, kytkeSyvennys): pöllö ei saa tuoda
 * karttaa eikä kohdekerrosta, joten riippuvuus kulkee toisin päin.
 */
export function kytkePulunPaikannus() {
  asetaPaikkanaytto(naytaPaikka);
}
